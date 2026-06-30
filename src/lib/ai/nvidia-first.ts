/**
 * Text-generation helper — NOW ROTATOR-BACKED (MegaRotator v8).
 * ════════════════════════════════════════════════════════════
 * Delegates to the MegaRotator: Gemini → Groq → OpenRouter → Cerebras →
 * Together → SambaNova → NVIDIA (LAST). This replaces the old NVIDIA-first /
 * single-Gemini-fallback path that timed out (550B ~22s) and ignored the
 * 12+ healthy keys. The export names are unchanged for caller compatibility
 * (chat, debunker via nvidiaFirstGenerateJSON, etc.).
 *
 * Real multi-key failover — no mock, no single-key fallback.
 */

import { rotatingGenerateText } from "@/lib/debunking/gemini-rotator";

interface NvidiaFirstResult {
  text: string;
  provider: string; // actual rotator slot that answered: "Gemini" | "Groq" | ... | "none"
  model: string;
}

/**
 * Generate text via the rotator (Gemini-first, NVIDIA-last). Never throws —
 * returns provider:"none" with empty text only if EVERY slot failed, so callers
 * can decide their own fallback.
 */
export async function nvidiaFirstGenerate(
  prompt: string,
  options: {
    systemPrompt?: string;
    nvidiaModel?: string; // ignored — rotator picks the model
    geminiModel?: string; // ignored — rotator picks the model
    maxTokens?: number;
    temperature?: number;
  } = {},
): Promise<NvidiaFirstResult> {
  try {
    const { text, provider, model } = await rotatingGenerateText({
      prompt,
      system: options.systemPrompt,
      temperature: options.temperature ?? 0.3,
      // Default 1500 (> rotator's internal 1200) so bilingual Arabic+English JSON
      // doesn't truncate; truncation → JSON.parse fails → null data → empty/fallback.
      maxTokens: options.maxTokens ?? 1500,
    });
    return { text, provider, model };
  } catch (e) {
    console.warn("[nvidiaFirstGenerate] rotator exhausted all slots:", e);
    return { text: "", provider: "none", model: "none" };
  }
}

/**
 * JSON generation via the rotator. Attempts to parse the response as JSON.
 */
export async function nvidiaFirstGenerateJSON<T = unknown>(
  prompt: string,
  options: Parameters<typeof nvidiaFirstGenerate>[1] = {},
): Promise<{ data: T | null; provider: string; raw: string }> {
  const result = await nvidiaFirstGenerate(prompt, {
    ...options,
    temperature: options?.temperature ?? 0.3,
  });

  try {
    const cleaned = result.text.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
    const data = JSON.parse(cleaned) as T;
    return { data, provider: result.provider, raw: result.text };
  } catch {
    return { data: null, provider: result.provider, raw: result.text };
  }
}
