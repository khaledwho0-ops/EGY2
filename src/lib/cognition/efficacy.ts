/* ═══════════════════════════════════════════════════════════════
 * EFFICACY ENGINE — the fundable number (Keystone 4).
 *
 * Aggregates pre/post MIST-20 across the whole cohort into EAL's one citable
 * claim: "people measurably get harder to fool." Built on the existing
 * /api/assessment store (which already keeps per-person pre/post). Adds the
 * cohort mean Δ, within-subjects effect size (dz), a 95% CI — AND an honest
 * DISTRUST-DRIFT guard: if veracity gains come from rejecting REAL news
 * (cynicism, realNewsBias drifting negative) rather than catching fakes, we
 * flag it instead of claiming a win. Honesty is itself the credibility asset.
 * ═══════════════════════════════════════════════════════════════ */

import { kvStore } from "@/lib/db/kv-store";

interface AssessmentRecordLite {
  instrumentId: string;
  phase: "pre" | "post";
  scores: Record<string, number>;
}
interface ParticipantFileLite {
  participantHash: string;
  records: AssessmentRecordLite[];
}

function mean(xs: number[]): number {
  return xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : 0;
}
function sampleSd(xs: number[], m: number): number {
  if (xs.length < 2) return 0;
  return Math.sqrt(xs.reduce((a, b) => a + (b - m) ** 2, 0) / (xs.length - 1));
}
function r2(x: number): number {
  return Number(x.toFixed(2));
}

export interface CohortEfficacy {
  instrument: string;
  n: number;
  veracityDiscernment: {
    meanPre: number;
    meanPost: number;
    meanDelta: number;
    sdDelta: number;
    cohensDz: number | null;
    ci95: [number, number] | null;
  } | null;
  fakeNewsAcceptMeanDelta: number | null; // negative = less gullible (good)
  distrustDrift: { meanRealNewsBiasDelta: number | null; flagged: boolean; note: string };
  headline: string;
  caveats: string[];
}

export function computeCohortEfficacy(files: ParticipantFileLite[], instrument = "mist20"): CohortEfficacy {
  const pairs: { pre: Record<string, number>; post: Record<string, number> }[] = [];
  for (const f of files) {
    const pre = f.records?.find((r) => r.instrumentId === instrument && r.phase === "pre");
    const post = f.records?.find((r) => r.instrumentId === instrument && r.phase === "post");
    if (pre && post) pairs.push({ pre: pre.scores, post: post.scores });
  }
  const n = pairs.length;

  const dV = pairs.map((p) => (p.post.veracityDiscernment ?? 0) - (p.pre.veracityDiscernment ?? 0));
  const dFake = pairs.map((p) => (p.post.fakeNewsAccept ?? 0) - (p.pre.fakeNewsAccept ?? 0));
  const dBias = pairs.map((p) => (p.post.realNewsBias ?? 0) - (p.pre.realNewsBias ?? 0));

  let veracityDiscernment: CohortEfficacy["veracityDiscernment"] = null;
  if (n > 0) {
    const meanDelta = mean(dV);
    const s = sampleSd(dV, meanDelta);
    const cohensDz = s > 0 ? meanDelta / s : null;
    const ci95: [number, number] | null =
      n > 1 && s > 0 ? [meanDelta - (1.96 * s) / Math.sqrt(n), meanDelta + (1.96 * s) / Math.sqrt(n)] : null;
    veracityDiscernment = {
      meanPre: r2(mean(pairs.map((p) => p.pre.veracityDiscernment ?? 0))),
      meanPost: r2(mean(pairs.map((p) => p.post.veracityDiscernment ?? 0))),
      meanDelta: r2(meanDelta),
      sdDelta: r2(s),
      cohensDz: cohensDz == null ? null : r2(cohensDz),
      ci95: ci95 ? [r2(ci95[0]), r2(ci95[1])] : null,
    };
  }

  const fakeNewsAcceptMeanDelta = n ? r2(mean(dFake)) : null;
  const meanBiasDelta = n ? mean(dBias) : null;
  const flagged = meanBiasDelta != null && meanBiasDelta < -0.1;
  const distrustDrift = {
    meanRealNewsBiasDelta: meanBiasDelta == null ? null : r2(meanBiasDelta),
    flagged,
    note: flagged
      ? "⚠ realNewsBias drifted toward distrust — some veracity gain may be cynicism (rejecting REAL news), not true discernment. Investigate before publishing."
      : "No significant distrust drift — veracity gains appear to be genuine discernment, not cynicism.",
  };

  const v = veracityDiscernment;
  const headline =
    v && n > 0
      ? `Across N=${n}, MIST-20 veracity discernment ${v.meanPre} → ${v.meanPost} (Δ=${v.meanDelta >= 0 ? "+" : ""}${v.meanDelta}/20${v.cohensDz != null ? `, dz=${v.cohensDz}` : ""})${flagged ? " — but DISTRUST-DRIFT flagged" : ""}.`
      : `No paired pre/post ${instrument} data yet (N=${n}).`;

  return {
    instrument,
    n,
    veracityDiscernment,
    fakeNewsAcceptMeanDelta,
    distrustDrift,
    headline,
    caveats: [
      "Within-subjects pre/post (no control group) — effect size reported is dz, not a between-groups d.",
      "Self-administered and unblinded; treat as a deployment signal, not a controlled trial.",
      n < 20
        ? `Small N (${n}); the CI is wide — directional only, not yet publication-grade.`
        : "N is sufficient for a directional estimate.",
    ],
  };
}

/** Load every participant's assessment file via the index the assessment route maintains. */
export async function loadAllParticipantFiles(): Promise<ParticipantFileLite[]> {
  const index = (await kvStore.get<string[]>("assessment:participants")) || [];
  const files: ParticipantFileLite[] = [];
  for (const hash of index) {
    const f = await kvStore.get<ParticipantFileLite>(`assessment:${hash}`);
    if (f && Array.isArray(f.records)) files.push(f);
  }
  return files;
}
