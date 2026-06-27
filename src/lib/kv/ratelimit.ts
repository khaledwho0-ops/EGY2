import { kv } from "@vercel/kv";
import { Ratelimit } from "@upstash/ratelimit";

/* ═══════════════════════════════════════════════════════════════
 * Sliding-window rate limits — protect AI endpoints from prompt-injection
 * & abuse. Per the Layer-7 awareness: WE must not become an attention-economy
 * actor, so limits are TIGHTER than commercial defaults.
 *
 * RESILIENCE (fixed 2026-06-24): the KV-backed limiter previously THREW
 * "@vercel/kv: Missing required environment variables" whenever KV wasn't
 * configured — which 500'd EVERY /api/ai/* route in dev / any non-KV deploy.
 * Now: use KV only when it's actually configured; otherwise fall back to an
 * in-memory sliding window (per-instance), and fail-OPEN on any KV error so
 * the limiter can never take the AI surface down. Configure KV for multi-
 * instance production sharing.
 * ═══════════════════════════════════════════════════════════════ */

const KV_READY = Boolean(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);

if (!KV_READY && process.env.NODE_ENV !== "production") {
  console.warn("[ratelimit] KV not configured → in-memory rate limiting (per-instance). Set KV_REST_API_URL/TOKEN for shared prod limits.");
}

export interface RateRule {
  points: number;
  window: string; // upstash Duration, e.g. "60 s"
  windowMs: number;
  prefix: string;
  ratelimit?: Ratelimit; // KV-backed; undefined when KV isn't configured
}

function buildKv(points: number, window: string, prefix: string): Ratelimit | undefined {
  if (!KV_READY) return undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return new Ratelimit({ redis: kv, limiter: Ratelimit.slidingWindow(points, window as any), prefix });
}

export const limits: Record<"chat" | "debunker" | "mist", RateRule> = {
  // 8 chat msgs / 60s per user — slows reflexive Layer-1 spam
  chat: { points: 8, window: "60 s", windowMs: 60_000, prefix: "rl:chat", ratelimit: buildKv(8, "60 s", "rl:chat") },
  // 4 OSINT debunker runs / hour — expensive, fights frivolous use
  debunker: { points: 4, window: "1 h", windowMs: 3_600_000, prefix: "rl:dbk", ratelimit: buildKv(4, "1 h", "rl:dbk") },
  // 1 MIST attempt / 24h — the test must mean something
  mist: { points: 1, window: "24 h", windowMs: 86_400_000, prefix: "rl:mist", ratelimit: buildKv(1, "24 h", "rl:mist") },
  // Crisis: NO rate limit. Ever. (See B.3)
};

// ── In-memory sliding window fallback (per-instance) ──
const memStore = new Map<string, number[]>();
function memEnforce(rule: RateRule, id: string): { ok: boolean; remaining: number; reset: number } {
  const now = Date.now();
  const key = `${rule.prefix}:${id}`;
  const hits = (memStore.get(key) || []).filter((t) => now - t < rule.windowMs);
  const ok = hits.length < rule.points;
  if (ok) hits.push(now);
  memStore.set(key, hits);
  const reset = (hits.length ? hits[0] : now) + rule.windowMs;
  return { ok, remaining: Math.max(0, rule.points - hits.length), reset };
}

/** Enforce a rule for an identifier. KV-backed when configured; in-memory
 *  otherwise; fail-OPEN to in-memory if the KV call errors. Never throws. */
export async function enforce(
  rule: RateRule,
  identifier: string,
): Promise<{ ok: boolean; remaining: number; reset: number }> {
  if (rule.ratelimit) {
    try {
      const r = await rule.ratelimit.limit(identifier);
      return { ok: r.success, remaining: r.remaining, reset: r.reset };
    } catch {
      // KV unreachable/misconfigured → fail open to in-memory, never 500 the route
      return memEnforce(rule, identifier);
    }
  }
  return memEnforce(rule, identifier);
}
