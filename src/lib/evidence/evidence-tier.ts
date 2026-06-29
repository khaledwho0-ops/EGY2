/**
 * EVIDENCE TIER — heuristic study-design + CEBM-level detector.
 * BRAINS research, Layer C (evidence hierarchy).
 *
 * Maps an academic result's title/abstract to a likely study design and its
 * place on the Oxford CEBM 2011 Levels of Evidence
 * (https://www.cebm.ox.ac.uk/resources/levels-of-evidence/ocebm-levels-of-evidence).
 *
 * ONE-LAW POSTURE: this is a TRANSPARENT KEYWORD HEURISTIC read off the
 * title/abstract — NOT a formal critical appraisal (which would require reading
 * the full method, randomisation, blinding, risk-of-bias, GRADE downgrades).
 * The UI must label it as an auto-detected hint and cite CEBM. When no design
 * is detected we return cebmLevel:null and say so, rather than guessing a level.
 *
 * CEBM 2011 levels used:
 *   1 = Systematic review / meta-analysis of RCTs
 *   2 = Randomised controlled trial
 *   3 = Non-randomised cohort / follow-up study
 *   4 = Case-series, case-control, cross-sectional
 *   5 = Mechanism-based / preclinical reasoning
 */

export interface EvidenceTier {
  /** Oxford CEBM 2011 level (1 strongest … 5 weakest), or null if undetected. */
  cebmLevel: number | null;
  design: string;
  designAr: string;
}

const RULES: { re: RegExp; level: number | null; en: string; ar: string }[] = [
  { re: /\bmeta-?analy|systematic review|cochrane review|pooled analysis\b/i, level: 1, en: "Systematic review / meta-analysis", ar: "مراجعة منهجية / تحليل بَعدي" },
  { re: /\brandomi[sz]ed controlled trial|randomi[sz]ed trial|\bRCTs?\b|double-?blind|placebo-?controlled|clinical trial\b/i, level: 2, en: "Randomised controlled trial", ar: "تجربة معشّاة محكومة" },
  { re: /\bcohort study|prospective cohort|longitudinal study|prospective study|follow-?up study\b/i, level: 3, en: "Cohort study", ar: "دراسة أتراب" },
  { re: /\bcase-?control\b/i, level: 4, en: "Case-control study", ar: "دراسة حالات وشواهد" },
  { re: /\bcross-?sectional|prevalence study|questionnaire survey|\bsurvey\b/i, level: 4, en: "Cross-sectional study", ar: "دراسة مقطعية" },
  { re: /\bcase report|case series\b/i, level: 4, en: "Case report / series", ar: "تقرير / سلسلة حالات" },
  { re: /\bin[- ]?vitro|animal model|murine|\bmice\b|\bmouse\b|\brats?\b|preclinical|mechanis(m|tic)\b/i, level: 5, en: "Preclinical / mechanistic", ar: "ما قبل سريري / آلية" },
  { re: /\bnarrative review|editorial|commentary|opinion piece|perspective|viewpoint\b/i, level: null, en: "Narrative review / opinion", ar: "مراجعة سردية / رأي" },
];

/**
 * Detect the likely design + CEBM level from a title + abstract/summary.
 * First matching rule wins (rules are ordered strongest → weakest).
 */
export function classifyEvidenceTier(title: string, summary: string): EvidenceTier {
  const hay = `${title || ""} ${summary || ""}`;
  for (const r of RULES) {
    if (r.re.test(hay)) return { cebmLevel: r.level, design: r.en, designAr: r.ar };
  }
  return { cebmLevel: null, design: "Design not detected", designAr: "التصميم غير محدد" };
}
