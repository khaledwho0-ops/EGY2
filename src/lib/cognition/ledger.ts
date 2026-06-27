/* ═══════════════════════════════════════════════════════════════
 * DEFENSE LEDGER — the measurement substrate (Keystone 1).
 *
 * One append-only event per defensive act a user performs (caught/missed a
 * manipulation, reviewed a card). From this we derive the immunity meters and
 * the Cognitive Immunity Score — the spine the whole product theory needs:
 * the philosophy says EAL builds NAMED, MEASURED defenses, the business plan's
 * North-Star is "Verified Defenses Delivered", and efficacy needs a per-user
 * event log. Nothing measured anything before this existed.
 *
 * Storage via kvStore (KV in prod, local-FS in dev), keyed by the passport userId.
 * ═══════════════════════════════════════════════════════════════ */

import { kvStore } from "@/lib/db/kv-store";

export type DefenseOutcome = "caught" | "missed" | "reviewed";

export interface DefenseEvent {
  ts: string; // ISO
  surface: string; // 'descent' | 'chat' | 'debunker' | 'exercise' | 'extension' | ...
  layer: number; // 1-8 deception-taxonomy layer
  technique?: string; // the specific manipulation technique
  outcome: DefenseOutcome;
  confidenceBefore?: number; // 0-1
  confidenceAfter?: number; // 0-1
  sources?: string[];
}

const ledgerKey = (userId: string) => `ledger:${userId}`;
const MAX_EVENTS = 5000; // bound per-user storage

export async function appendDefense(
  userId: string,
  ev: Omit<DefenseEvent, "ts"> & { ts?: string },
): Promise<DefenseEvent> {
  const event: DefenseEvent = { ...ev, ts: ev.ts || new Date().toISOString() };
  const events = (await kvStore.get<DefenseEvent[]>(ledgerKey(userId))) || [];
  events.push(event);
  await kvStore.set(ledgerKey(userId), events.slice(-MAX_EVENTS));
  return event;
}

export async function getLedger(userId: string): Promise<DefenseEvent[]> {
  return (await kvStore.get<DefenseEvent[]>(ledgerKey(userId))) || [];
}

export interface ImmunityMeters {
  total: number;
  caught: number;
  missed: number;
  reviewed: number;
  accuracy: number | null; // caught / (caught + missed)
  byLayer: Record<number, number>; // defenses per layer 1-8
  layerCoverage: number; // distinct layers practiced / 8
  activeDays: number;
  currentStreak: number; // consecutive active days ending today/yesterday
  lastActiveAt: string | null;
  avgConfidenceShift: number | null; // avg(after - before)
  cognitiveImmunityScore: number; // 0-100 composite (CIS)
}

function dayOf(iso: string): string {
  return iso.slice(0, 10);
}

export function deriveMeters(events: DefenseEvent[]): ImmunityMeters {
  let caught = 0;
  let missed = 0;
  let reviewed = 0;
  const byLayer: Record<number, number> = {};
  const days = new Set<string>();
  let shiftSum = 0;
  let shiftN = 0;

  for (const e of events) {
    if (e.outcome === "caught") caught++;
    else if (e.outcome === "missed") missed++;
    else reviewed++;
    if (e.layer >= 1 && e.layer <= 8) byLayer[e.layer] = (byLayer[e.layer] || 0) + 1;
    if (e.ts) days.add(dayOf(e.ts));
    if (typeof e.confidenceBefore === "number" && typeof e.confidenceAfter === "number") {
      shiftSum += e.confidenceAfter - e.confidenceBefore;
      shiftN++;
    }
  }

  const total = events.length;
  const accuracy = caught + missed > 0 ? caught / (caught + missed) : null;
  const layerCoverage = Object.keys(byLayer).length / 8;

  // current streak: consecutive active days ending today (or yesterday).
  let currentStreak = 0;
  if (days.size) {
    const today = new Date().toISOString().slice(0, 10);
    let cursorMs = days.has(today) ? Date.now() : Date.now() - 86400000;
    for (;;) {
      const ds = new Date(cursorMs).toISOString().slice(0, 10);
      if (days.has(ds)) {
        currentStreak++;
        cursorMs -= 86400000;
      } else break;
    }
  }

  const lastActiveAt = total ? events[total - 1].ts : null;
  const avgConfidenceShift = shiftN ? shiftSum / shiftN : null;

  const accScore = accuracy ?? 0;
  const volumeScore = Math.min(1, total / 50);
  const streakScore = Math.min(1, currentStreak / 14);
  const cognitiveImmunityScore = Math.round(
    100 * (0.4 * accScore + 0.25 * layerCoverage + 0.2 * volumeScore + 0.15 * streakScore),
  );

  return {
    total,
    caught,
    missed,
    reviewed,
    accuracy,
    byLayer,
    layerCoverage,
    activeDays: days.size,
    currentStreak,
    lastActiveAt,
    avgConfidenceShift,
    cognitiveImmunityScore,
  };
}
