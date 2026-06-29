/**
 * CMQ — Conspiracy Mentality Questionnaire (5-item short form)
 * Framework: §3.2 (instrument battery) · BRAINS research Layer A
 *
 * Bruder, M., Haffke, P., Neave, N., Nouripanah, N., & Imhoff, R. (2013).
 * "Measuring Individual Differences in Generic Beliefs in Conspiracy Theories
 *  Across Cultures: Conspiracy Mentality Questionnaire."
 * Frontiers in Psychology, 4, 225.
 * DOI: 10.3389/fpsyg.2013.00225 · PMID: 23641227 · PMCID: PMC3639408
 * Open access: https://www.frontiersin.org/articles/10.3389/fpsyg.2013.00225/full
 *
 * WHY THIS INSTRUMENT (BRAINS): the CMQ measures *conspiracy mentality* — the
 * generic disposition to explain events through conspiracies — independently of
 * any single theory. It is the conspiracy-belief instrument whose measurement
 * equivalence was demonstrated across cultures (English, German, Turkish;
 * validation sample N = 7,766), which makes it the most defensible generic
 * conspiracy measure for a non-Western audience. It operationalises the BRAINS
 * "psychology of belief" layer: the demand for a hidden, ordering explanation.
 *
 * SCALE: 5 items, each rated on an 11-point probability scale from
 *   0 = 0% (certainly not) to 10 = 100% (certain), in 10% increments.
 * SCORE: the mean across the 5 items (Bruder et al. 2013). Higher = stronger
 *   conspiracy mentality. The CMQ is a *continuous* individual-difference
 *   measure; it has NO clinical cut-off and no diagnostic threshold — so we
 *   report the mean + percent and describe it relative to the scale midpoint
 *   only, never as a diagnosis.
 */

import type { AssessmentConfig, AssessmentQuestion } from "@/components/assessment/assessment-engine";

// ─────────────────────────────────────────────────────────────────────────────
// ARABIC ADAPTATION STATUS (One-Law compliance — mirrors the MIST-20 precedent)
//
// No PEER-REVIEWED Arabic validation of the CMQ exists at time of writing
// (validated language versions: English, German, Turkish; a Persian translation
// exists). UNLIKE the MIST (whose items are culture-bound news headlines), the
// CMQ items are generic attitude statements, so an Arabic translation is a
// meaningful *comprehension aid*. We therefore DO provide textAr — but we must
// NOT present it as a validated Arabic instrument. The renderer should surface
// CMQ_ARABIC_NOTICE so the user knows the Arabic is a translation for
// understanding and the psychometrics derive from the validated language
// versions.
//
// TO RESOLVE: cite a peer-reviewed Arabic validation, then set
// CMQ_ARABIC_ADAPTATION_PENDING = false.
// ─────────────────────────────────────────────────────────────────────────────

/** True while no peer-reviewed Arabic validation of the CMQ exists. */
export const CMQ_ARABIC_ADAPTATION_PENDING = true as const;

/** Bilingual notice shown alongside the Arabic items (honest provenance). */
export const CMQ_ARABIC_NOTICE = {
  ar: "النص العربي ترجمة للفهم فقط — التحقّق النفسي القياسي للمقياس تم بالإنجليزية والألمانية والتركية، ولسه مفيش نسخة عربية مُعايَرة.",
  en: "Arabic text is a comprehension translation only; the instrument is psychometrically validated in English, German and Turkish — no validated Arabic version exists yet.",
} as const;

/**
 * 11-point probability response scale (Bruder et al. 2013).
 * value 0..10 ⇒ 0%..100% certainty, anchored "certainly not" → "certain".
 */
const CMQ_OPTIONS: { value: number; label: string; labelAr?: string }[] = Array.from({ length: 11 }, (_, i) => {
  const pct = i * 10;
  const label = pct === 0 ? "0% — certainly not" : pct === 100 ? "100% — certain" : `${pct}%`;
  const labelAr = pct === 0 ? "٠٪ — مستحيل" : pct === 100 ? "١٠٠٪ — أكيد" : `${pct}٪`;
  return { value: i, label, labelAr };
});

const CMQ_QUESTIONS: AssessmentQuestion[] = [
  {
    id: "cmq-1",
    text: "I think that many very important things happen in the world, which the public is never informed about.",
    textAr: "أعتقد أن أشياء مهمة جدًا كتير بتحصل في العالم، والناس مش بيتعرفوا عنها أبدًا.",
    type: "likert",
    options: CMQ_OPTIONS,
    subscale: "conspiracy_mentality",
  },
  {
    id: "cmq-2",
    text: "I think that politicians usually do not tell us the true motives for their decisions.",
    textAr: "أعتقد أن السياسيين عادةً مش بيقولولنا الدوافع الحقيقية وراء قراراتهم.",
    type: "likert",
    options: CMQ_OPTIONS,
    subscale: "conspiracy_mentality",
  },
  {
    id: "cmq-3",
    text: "I think that government agencies closely monitor all citizens.",
    textAr: "أعتقد أن الأجهزة الحكومية بتراقب كل المواطنين عن قرب.",
    type: "likert",
    options: CMQ_OPTIONS,
    subscale: "conspiracy_mentality",
  },
  {
    id: "cmq-4",
    text: "I think that events which superficially seem to lack a connection are often the result of secret activities.",
    textAr: "أعتقد أن الأحداث اللي ظاهرها إنها مالهاش علاقة ببعض، غالبًا بتكون نتيجة أنشطة سرية.",
    type: "likert",
    options: CMQ_OPTIONS,
    subscale: "conspiracy_mentality",
  },
  {
    id: "cmq-5",
    text: "I think that there are secret organizations that greatly influence political decisions.",
    textAr: "أعتقد أن في منظمات سرية بتأثّر بشكل كبير على القرارات السياسية.",
    type: "likert",
    options: CMQ_OPTIONS,
    subscale: "conspiracy_mentality",
  },
];

/**
 * CMQ scoring (Bruder et al. 2013): the mean across the 5 items.
 * Returns the raw mean (0–10), the equivalent percent (0–100), the count of
 * answered items, and a NON-diagnostic descriptive band relative to the scale
 * midpoint. There is no clinical cut-off; the band is a reading aid only.
 */
function scoreCMQ(answers: Record<string, number>): Record<string, number> {
  const values = CMQ_QUESTIONS.map((q) => answers[q.id]).filter((v): v is number => typeof v === "number");
  const answered = values.length;
  if (answered === 0) {
    return { item_mean: 0, percent_mentality: 0, items_answered: 0, band_code: -1 };
  }
  const mean = values.reduce((a, b) => a + b, 0) / answered; // 0..10
  const percent = Math.round((mean / 10) * 100);
  // band_code is DESCRIPTIVE only, relative to the 50% scale midpoint — NOT a
  // clinical cut-off or diagnosis. -1 incomplete · 0 below · 1 around · 2 above.
  const band_code = percent < 40 ? 0 : percent <= 60 ? 1 : 2;
  return {
    item_mean: Math.round(mean * 100) / 100,
    percent_mentality: percent,
    items_answered: answered,
    band_code,
  };
}

/** Bilingual reading of a band_code (UI helper — descriptive, non-diagnostic). */
export const CMQ_BAND_LABEL: Record<number, { en: string; ar: string }> = {
  [-1]: { en: "Incomplete", ar: "غير مكتمل" },
  0: { en: "Below the scale midpoint", ar: "أقل من منتصف المقياس" },
  1: { en: "Around the scale midpoint", ar: "حوالي منتصف المقياس" },
  2: { en: "Above the scale midpoint", ar: "أعلى من منتصف المقياس" },
};

export function createCMQConfig(phase: "pre" | "post"): AssessmentConfig {
  return {
    id: `cmq-${phase}`,
    name: "Conspiracy Mentality Questionnaire (CMQ)",
    shortName: "CMQ-5",
    description:
      "For each statement, mark how likely you think it is true — from 0% (certainly not) to 100% (certain). There are no right or wrong answers; this measures a general way of seeing the world, not knowledge.",
    phase,
    questions: CMQ_QUESTIONS,
    scoring: scoreCMQ,
  };
}
