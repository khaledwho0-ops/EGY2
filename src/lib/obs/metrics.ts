/* ═══════════════════════════════════════════════════════════════
 * IN-HOUSE OBSERVABILITY (Gap 8) — no Sentry/PostHog deps, privacy-first.
 * We count THAT a defensive event happened, never WHAT the user read —
 * honoring the BLACKBOX ethos. kvStore-backed (KV in prod, local-FS in dev).
 * Never throws: observability must never break a request.
 * ═══════════════════════════════════════════════════════════════ */
import { kvStore } from "@/lib/db/kv-store";

const KEY = "metrics:counts";

export async function incr(event: string, by = 1): Promise<void> {
  try {
    const counts = (await kvStore.get<Record<string, number>>(KEY)) || {};
    counts[event] = (counts[event] || 0) + by;
    await kvStore.set(KEY, counts);
  } catch {
    /* swallow — a metric must never take down the route */
  }
}

export async function getCounts(): Promise<Record<string, number>> {
  try {
    return (await kvStore.get<Record<string, number>>(KEY)) || {};
  } catch {
    return {};
  }
}
