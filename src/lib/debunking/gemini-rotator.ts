import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { createGroq } from "@ai-sdk/groq";
import { createOpenAICompatible } from "@ai-sdk/openai-compatible";
import { generateObject, generateText } from "ai";

/**
 * ██████╗  MEGA-ROTATOR v8 — GEMINI-FIRST ██████╗
 *
 * Priority order (fast & reliable first, slow last) — per the directive
 * "Gemini, then Groq, and NVIDIA is the last":
 *   ① Gemini   (up to 7 keys) — fast, best structured output
 *   ② Groq     (up to 5 keys) — very fast, good JSON
 *   ③ OpenRouter (2) · ④ Cerebras (2) · ⑤ Together (1) · ⑥ SambaNova (1)
 *   ⑦ NVIDIA NIM (LAST)       — Nemotron-3 550B is strongest but SLOW (~20s+),
 *                               so it is the last-resort slot, never the lead.
 *
 * Powers BOTH rotatingGenerateObject (structured) AND rotatingGenerateText
 * (plain text → every chatbot, via nvidiaFirstGenerate). Real multi-key
 * failover with cooldowns — no mock, no single-key fallback.
 */

interface ProviderSlot {
  provider: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  build: () => any;
}

function env(name: string): string | undefined {
  const val = process.env[name];
  return val && val.trim().length > 0 ? val.trim() : undefined;
}

function buildSlots(): ProviderSlot[] {
  const slots: ProviderSlot[] = [];

  // ① GEMINI — lead priority (fast + best structured output)
  const gemKeys = [
    env("GEMINI_API_KEY"), env("GEMINI_API_KEY_2"), env("GEMINI_API_KEY_3"),
    env("GEMINI_API_KEY_4"), env("GEMINI_API_KEY_5"), env("GEMINI_API_KEY_6"),
    env("GEMINI_API_KEY_7"),
  ].filter(Boolean) as string[];
  for (const key of gemKeys) {
    slots.push({ provider: "Gemini", build: () => createGoogleGenerativeAI({ apiKey: key })("gemini-2.5-flash") });
  }

  // ② GROQ — very fast, good JSON
  const groqKeys = [
    env("GROQ_API_KEY"), env("GROQ_API_KEY_2"), env("GROQ_API_KEY_3"),
    env("GROQ_API_KEY_4"), env("GROQ_API_KEY_5"),
  ].filter(Boolean) as string[];
  for (const key of groqKeys) {
    slots.push({ provider: "Groq", build: () => createGroq({ apiKey: key })("llama-3.3-70b-versatile") });
  }

  // KIMI (Moonshot) — DISABLED 2026-06-24: key suspended (insufficient balance).
  // Re-enable when the account is funded:
  // const kimiKey = env("MOONSHOT_API_KEY") || env("KIMI_API_KEY");
  // if (kimiKey) slots.push({ provider: "Kimi", build: () => createOpenAICompatible({ name: "moonshot", baseURL: "https://api.moonshot.ai/v1", headers: { Authorization: `Bearer ${kimiKey}` } })("kimi-k2-0905-preview") });

  // ③ OPENROUTER — free models
  const orKeys = [env("OPENROUTER_API_KEY"), env("OPENROUTER_API_KEY_2")].filter(Boolean) as string[];
  for (const key of orKeys) {
    slots.push({ provider: "OpenRouter", build: () => createOpenAICompatible({ name: "openrouter", baseURL: "https://openrouter.ai/api/v1", headers: { Authorization: `Bearer ${key}` } })("meta-llama/llama-3.3-70b-instruct:free") });
  }

  // ④ CEREBRAS
  const cereKeys = [env("CEREBRAS_API_KEY"), env("CEREBRAS_API_KEY_2")].filter(Boolean) as string[];
  for (const key of cereKeys) {
    slots.push({ provider: "Cerebras", build: () => createOpenAICompatible({ name: "cerebras", baseURL: "https://api.cerebras.ai/v1", headers: { Authorization: `Bearer ${key}` } })("llama-3.3-70b") });
  }

  // ⑤ TOGETHER
  const togKey = env("TOGETHER_API_KEY");
  if (togKey) slots.push({ provider: "Together", build: () => createOpenAICompatible({ name: "together", baseURL: "https://api.together.xyz/v1", headers: { Authorization: `Bearer ${togKey}` } })("meta-llama/Llama-3.3-70B-Instruct-Turbo") });

  // ⑥ SAMBANOVA
  const samKey = env("SAMBANOVA_API_KEY");
  if (samKey) slots.push({ provider: "SambaNova", build: () => createOpenAICompatible({ name: "sambanova", baseURL: "https://api.sambanova.ai/v1", headers: { Authorization: `Bearer ${samKey}` } })("Meta-Llama-3.3-70B-Instruct") });

  // ⑦ NVIDIA NIM — LAST (Nemotron 550B is slow; only used if everything else fails)
  const nvidiaKeys = [
    env("NVIDIA_API_KEY"), env("NVIDIA_API_KEY_2"), env("NVIDIA_API_KEY_3"),
    env("NVIDIA_API_KEY_4"), env("NVIDIA_API_KEY_5"),
  ].filter(Boolean) as string[];
  for (const key of nvidiaKeys) {
    slots.push({ provider: "NVIDIA", build: () => createOpenAICompatible({ name: "nvidia-nim", baseURL: "https://integrate.api.nvidia.com/v1", headers: { Authorization: `Bearer ${key}` } })("nvidia/nemotron-3-ultra-550b-a55b") });
  }

  return slots;
}

const SLOTS = buildSlots();

if (SLOTS.length === 0) {
  throw new Error("[MegaRotator] No API keys found in .env.local!");
}

console.log(`[MegaRotator v8] ✅ ${SLOTS.length} slots (Gemini-first, NVIDIA-last): ${SLOTS.map((s) => s.provider).join(", ")}`);

// ── STATE ──
const cooldowns: Map<number, number> = new Map();
let activeSlot = 0;

function isRetryable(err: unknown): boolean {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const msg = String((err as any)?.message ?? "") + JSON.stringify((err as any)?.data ?? "");
  return /429|503|RESOURCE_EXHAUSTED|quota|rate.limit|too many|high demand|try again|overloaded|capacity|exceeded|fetch failed|ECONNREF|timeout|unavailable/i.test(msg);
}

function extractWaitMs(err: unknown): number {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const msg = String((err as any)?.message ?? "");
  const m = msg.match(/retry in ([\d.]+)s/i);
  if (m) return Math.ceil(parseFloat(m[1])) * 1000 + 1500;
  const h = msg.match(/retry-after:\s*(\d+)/i);
  if (h) return parseInt(h[1]) * 1000 + 1000;
  return 22_000;
}

function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

function isAvailable(idx: number): boolean {
  return Date.now() >= (cooldowns.get(idx) ?? 0);
}

function setCooldown(idx: number, ms: number) {
  cooldowns.set(idx, Date.now() + ms);
}

// ── GENERIC ROTATION CORE — shared by object + text generation ──
// Per-attempt hard ceiling: abandon a single stalled slot instead of letting it
// hang the whole call. Generous (28s) so legitimate slow Gemini big-JSON answers
// survive (the platform stays Gemini-first for quality), but a truly-stuck slot —
// e.g. the NVIDIA-550B last resort or a network stall — is dropped so the rotator
// advances to the next slot rather than hanging 30s+.
const ATTEMPT_TIMEOUT_MS = 28_000;

async function rotate<T>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  run: (model: any, slot: ProviderSlot) => Promise<T>,
  isUnsupported: (msg: string) => boolean = () => false,
): Promise<{ value: T; provider: string }> {
  const errors: string[] = [];
  let attempts = 0;
  const maxAttempts = SLOTS.length * 2;

  while (attempts < maxAttempts) {
    attempts++;
    let nextIdx = -1;
    let shortestWait = Infinity;

    for (let i = 0; i < SLOTS.length; i++) {
      const idx = (activeSlot + i) % SLOTS.length;
      const remaining = (cooldowns.get(idx) ?? 0) - Date.now();
      if (remaining <= 0) { nextIdx = idx; shortestWait = 0; break; }
      if (remaining < shortestWait) { shortestWait = remaining; nextIdx = idx; }
    }

    if (nextIdx === -1) throw new Error("[MegaRotator] No slots available.");

    if (shortestWait > 0) {
      if (shortestWait > 65_000) {
        throw new Error(`[MegaRotator] All slots cooling down >65s. Errors: ${errors.join(" | ").slice(0, 500)}`);
      }
      console.warn(`[MegaRotator] 🔄 waiting ${Math.ceil(shortestWait / 1000)}s for ${SLOTS[nextIdx].provider}...`);
      await sleep(shortestWait);
    }

    const slot = SLOTS[nextIdx];
    try {
      console.log(`[MegaRotator] → ${slot.provider} #${nextIdx + 1}/${SLOTS.length}`);
      const value = await run(slot.build(), slot);
      activeSlot = nextIdx;
      cooldowns.delete(nextIdx);
      console.log(`[MegaRotator] ✅ ${slot.provider} #${nextIdx + 1}`);
      return { value, provider: slot.provider };
    } catch (err: unknown) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const msg = String((err as any)?.message ?? "").slice(0, 200);
      errors.push(`${slot.provider}#${nextIdx + 1}: ${msg}`);
      if (isRetryable(err)) {
        setCooldown(nextIdx, extractWaitMs(err));
        console.warn(`[MegaRotator] ⚠️ ${slot.provider} #${nextIdx + 1} rate-limited`);
      } else if (isUnsupported(msg)) {
        setCooldown(nextIdx, 600_000);
        console.warn(`[MegaRotator] ⛔ ${slot.provider} #${nextIdx + 1} unsupported → 10min`);
      } else {
        setCooldown(nextIdx, 30_000);
        console.error(`[MegaRotator] ❌ ${slot.provider} #${nextIdx + 1}: ${msg}`);
      }
    }
  }

  throw new Error(`[MegaRotator] All ${SLOTS.length} slots failed. Errors: ${errors.join(" | ").slice(0, 500)}`);
}

// ── STRUCTURED OUTPUT (debunking classifier, etc.) ──
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function rotatingGenerateObject(args: Record<string, any>): Promise<any> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { modelName, ...rest } = args;
  const { value } = await rotate(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (model) => (generateObject as any)({ ...rest, model, maxRetries: 0, abortSignal: AbortSignal.timeout(ATTEMPT_TIMEOUT_MS) }),
    (msg) => /not support|json_schema|response_format|Unsupported|structured|tool_use|function|no object generated|did not match|match schema|invalid.*json/i.test(msg),
  );
  return value;
}

// ── PLAIN TEXT (powers every chatbot via nvidiaFirstGenerate) ──
export async function rotatingGenerateText(
  args: { prompt: string; system?: string; temperature?: number },
): Promise<{ text: string; provider: string; model: string }> {
  const { prompt, system, temperature } = args;
  const { value, provider } = await rotate(async (model) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { text } = await (generateText as any)({ model, prompt, system, temperature: temperature ?? 0.4, maxRetries: 0, abortSignal: AbortSignal.timeout(ATTEMPT_TIMEOUT_MS) });
    if (!text || !String(text).trim()) throw new Error("empty completion");
    return String(text);
  });
  return { text: value, provider, model: "rotator" };
}

// ── STREAMING MODEL (Gemini) ──
export function getActiveGeminiModel(modelName = "gemini-2.5-flash") {
  for (let i = 0; i < SLOTS.length; i++) {
    const idx = (activeSlot + i) % SLOTS.length;
    if (isAvailable(idx) && SLOTS[idx].provider === "Gemini") {
      try { return SLOTS[idx].build(); } catch { continue; }
    }
  }
  const geminiSlot = SLOTS.find((s) => s.provider === "Gemini") || SLOTS[0];
  return geminiSlot.build();
}

export const TOTAL_KEY_COUNT = SLOTS.length;

// ── NVIDIA DIRECT STREAMING MODEL (only for routes that explicitly want 550B) ──
export function getActiveNvidiaModel(modelId = "nvidia/nemotron-3-ultra-550b-a55b") {
  for (let i = 0; i < SLOTS.length; i++) {
    const idx = (activeSlot + i) % SLOTS.length;
    if (isAvailable(idx) && SLOTS[idx].provider === "NVIDIA") {
      try {
        return createOpenAICompatible({
          name: "nvidia-nim",
          baseURL: "https://integrate.api.nvidia.com/v1",
          headers: { Authorization: `Bearer ${nvidiaKeysRuntime()[0]}` },
        })(modelId);
      } catch { continue; }
    }
  }
  return getActiveGeminiModel();
}

function nvidiaKeysRuntime(): string[] {
  return [
    env("NVIDIA_API_KEY"), env("NVIDIA_API_KEY_2"), env("NVIDIA_API_KEY_3"),
    env("NVIDIA_API_KEY_4"), env("NVIDIA_API_KEY_5"),
  ].filter(Boolean) as string[];
}

// ── NVIDIA CONTENT SAFETY MODEL ──
export function getNvidiaContentSafetyModel() {
  const key = env("NVIDIA_API_KEY");
  if (!key) return null;
  return createOpenAICompatible({
    name: "nvidia-safety",
    baseURL: "https://integrate.api.nvidia.com/v1",
    headers: { Authorization: `Bearer ${key}` },
  })("nvidia/nemotron-3.5-content-safety");
}

// ── NVIDIA DEEPSEEK V4 FLASH (fast inference) ──
export function getNvidiaFastModel() {
  const key = env("NVIDIA_API_KEY");
  if (!key) return null;
  return createOpenAICompatible({
    name: "nvidia-fast",
    baseURL: "https://integrate.api.nvidia.com/v1",
    headers: { Authorization: `Bearer ${key}` },
  })("deepseek-ai/deepseek-v4-flash");
}
