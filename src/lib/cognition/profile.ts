/**
 * Cognition Profile — the measurement layer for the curriculum.
 *
 * Two evidence-based metrics, accumulated across days in localStorage:
 *  1. ACCURACY — correct / answered on gradeable items.
 *  2. CALIBRATION — how well confidence matches correctness (Kelly 2024): the gap
 *     between "how sure you felt" and "whether you were right". Biases are bipolar,
 *     so we flag BOTH over- and under-confidence.
 *
 * DISTRUST-DRIFT GUARD (signal-detection): if items are labelled `manipulation` vs
 * `legitimate`, we also track the false-alarm rate — wrongly flagging legitimate
 * content as manipulation. A good cognition build raises discrimination WITHOUT
 * raising false alarms: discerning, not cynical (SDT meta-analysis, N=37,025).
 */

export interface CalibSample { conf: number; correct: boolean }
export interface DiscSample { manipulation: boolean; flagged: boolean } // flagged = learner judged it manipulative
export interface DayResult { dayId: string; answered: number; correct: number; calib: CalibSample[]; disc: DiscSample[] }
export interface Profile { days: string[]; answered: number; correct: number; calib: CalibSample[]; disc: DiscSample[]; updatedAt: number }

const KEY = 'eal_cognition_profile_v1';
const EMPTY: Profile = { days: [], answered: 0, correct: 0, calib: [], disc: [], updatedAt: 0 };

export function readProfile(): Profile {
  if (typeof window === 'undefined') return EMPTY;
  try { const raw = window.localStorage.getItem(KEY); return raw ? { ...EMPTY, ...JSON.parse(raw) } : EMPTY; } catch { return EMPTY; }
}

export function recordDay(r: DayResult, now: number): Profile {
  const p = readProfile();
  const days = p.days.includes(r.dayId) ? p.days : [...p.days, r.dayId];
  const next: Profile = {
    days,
    answered: p.answered + r.answered,
    correct: p.correct + r.correct,
    calib: [...p.calib, ...r.calib].slice(-300),
    disc: [...p.disc, ...r.disc].slice(-300),
    updatedAt: now,
  };
  if (typeof window !== 'undefined') { try { window.localStorage.setItem(KEY, JSON.stringify(next)); } catch { /* ignore quota */ } }
  return next;
}

export function accuracyPct(p: Profile): number { return p.answered ? Math.round((p.correct / p.answered) * 100) : 0; }

export function calibration(calib: CalibSample[]): { label: string; labelAr: string; errorPct: number; direction: 'over' | 'under' | 'ok' } {
  if (!calib.length) return { label: '—', labelAr: '—', errorPct: 0, direction: 'ok' };
  const err = calib.reduce((s, c) => s + Math.abs(c.conf / 100 - (c.correct ? 1 : 0)), 0) / calib.length;
  const wrong = calib.filter((c) => !c.correct);
  const right = calib.filter((c) => c.correct);
  const meanWrongConf = wrong.length ? wrong.reduce((s, c) => s + c.conf, 0) / wrong.length : 0;
  const meanRightConf = right.length ? right.reduce((s, c) => s + c.conf, 0) / right.length : 100;
  const errorPct = Math.round(err * 100);
  let direction: 'over' | 'under' | 'ok' = 'ok';
  if (meanWrongConf >= 65) direction = 'over';
  else if (meanRightConf <= 45) direction = 'under';
  let label = 'Well calibrated', labelAr = 'معايرة جيدة';
  if (direction === 'over') { label = 'Overconfident'; labelAr = 'ثقة زائدة'; }
  else if (direction === 'under') { label = 'Under-confident'; labelAr = 'ثقة أقل من اللازم'; }
  else if (err > 0.35) { label = 'Improving'; labelAr = 'بتتحسّن'; }
  return { label, labelAr, errorPct, direction };
}

/** Distrust-drift guard: false-alarm rate = legitimate items wrongly flagged as manipulation. */
export function discrimination(disc: DiscSample[]): { hitRate: number; falseAlarmRate: number; cynicism: boolean; samples: number } {
  const sig = disc.filter((d) => d.manipulation);
  const noise = disc.filter((d) => !d.manipulation);
  const hitRate = sig.length ? sig.filter((d) => d.flagged).length / sig.length : 0;
  const falseAlarmRate = noise.length ? noise.filter((d) => d.flagged).length / noise.length : 0;
  return { hitRate, falseAlarmRate, cynicism: noise.length >= 4 && falseAlarmRate > 0.4, samples: disc.length };
}
