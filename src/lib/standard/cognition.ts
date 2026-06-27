/* ═══════════════════════════════════════════════════════════════
 * EAL STANDARD — THE COGNITION BUILDER + SCIENTIFIC SHIELD
 * Governed by HI CLAUDE/00_THE_SCIENTIFIC_STANDARD.md §12 + §13.
 *
 * "Apply critical thinking" is generic and forbidden. For EACH deception
 * layer this module names the EXACT technique, the SPECIFIC bias it counters,
 * WHY that technique fits that layer, the precise STEPS, and the real SHIELD
 * tools that power it. Pages import this so the defense is concrete, not vibes.
 * ═══════════════════════════════════════════════════════════════ */

export interface CognitiveDefense {
  layer: number;          // 1–8, maps to DECEPTION_LAYERS
  technique: string;      // the named, established critical-thinking method
  techniqueAr: string;
  biasCountered: string;  // the specific cognitive bias / failure mode it targets
  why: string;            // why THIS technique is the right counter for THIS layer
  steps: string[];        // the exact procedure a user (or the engine) runs
  shieldTools: string[];  // the real tools/datasets that power the shield for this layer
  source: string;         // the literature the technique comes from
}

export const COGNITION_BUILDER: CognitiveDefense[] = [
  {
    layer: 1,
    technique: 'Lateral Reading + SIFT',
    techniqueAr: 'القراءة الجانبية + سِفت',
    biasCountered: 'Confirmation bias & source neglect — accepting a claim because it fits, without checking the source exists.',
    why: 'A pure fabrication has no verifiable origin. You expose it not by analyzing the artifact but by LEAVING it and checking whether the source, study, or person exists at all.',
    steps: [
      'STOP — notice the emotional pull before reacting.',
      'Open new tabs; search the source/author/study name itself (lateral, not vertical).',
      'Confirm the source EXISTS in a real index (OpenAlex/Crossref) or registry — not just that it sounds real.',
      'Trace to the original. If no origin exists, it is Layer 1: fabricated.',
    ],
    shieldTools: ['OpenAlex existence check', 'Crossref DOI lookup', 'reverse-image (InVID/WeVerify)', 'ClaimBuster claim spotting'],
    source: 'Caulfield (2019) SIFT · Wineburg & McGrew (2017) lateral reading',
  },
  {
    layer: 2,
    technique: 'Omission Audit + Steelmanning',
    techniqueAr: 'تدقيق الحذف + تقوية حجة الخصم',
    biasCountered: 'Framing effect & WYSIATI ("what you see is all there is") — judging on the shown slice as if it were the whole.',
    why: 'The event is true and passes fact-checks; the manipulation is entirely in what was left out. You counter it by reconstructing the omitted half.',
    steps: [
      'List exactly what IS shown and what is implied.',
      'Ask: "What would the strongest opposing brief show here?"',
      'Retrieve the omitted data (the other study, the base rate, the denominator).',
      'Re-judge against the FULL picture, not the curated slice.',
    ],
    shieldTools: ['Evidence Aggregator (both sides)', 'base-rate retrieval', 'publication-bias check (trial registries)'],
    source: 'Kahneman (2011) WYSIATI · Galef (2021) steelmanning',
  },
  {
    layer: 3,
    technique: 'Upstream Reading + Toulmin Warrant Analysis',
    techniqueAr: 'القراءة للمصدر الأصلي + تحليل تولمِن',
    biasCountered: 'Illusory truth & quote-mining susceptibility — a real quote feels true even when its meaning was inverted.',
    why: 'Source and quote are accurate; meaning lives in the surrounding context and the implicit warrant. Restore both and the inversion collapses.',
    steps: [
      'Find the PRIMARY source of the quote/clip (go upstream, use archives).',
      'Read the sentence immediately before and after.',
      'Map it as Claim → Data → Warrant (Toulmin). Identify the hidden warrant.',
      'Test whether the warrant survives in full context. If not, it is Layer 3.',
    ],
    shieldTools: ['primary-source fetch', 'Wayback/archive snapshot', 'quote-locator', 'C2PA/Content Credentials'],
    source: 'Toulmin (1958) The Uses of Argument · Caulfield "read upstream"',
  },
  {
    layer: 4,
    technique: 'Cui Bono + Temporal Forensics',
    techniqueAr: 'مَن المُستفيد + الطب الشرعي الزمني',
    biasCountered: 'Recency/availability + emotional reasoning — reacting to the WHEN as if it changed the WHAT.',
    why: 'The information is true and in context; the weapon is the timing. You neutralize it by analyzing motive and the release moment, not the content.',
    steps: [
      'Plot the release timestamp against the surrounding events.',
      'Ask the three questions: "Why NOW? Who benefits? What does this distract from?"',
      'Separate the (valid) information from the (engineered) timing.',
      'Judge the information on its merits, stripped of the timed pressure.',
    ],
    shieldTools: ['threat-map / timeline', 'fact-check feed timestamps', 'event-correlation'],
    source: 'Cui bono (classical) · disaster-capitalism / "shock doctrine" timing analysis',
  },
  {
    layer: 5,
    technique: 'Is–Ought Separation + Dual-Use Ethics',
    techniqueAr: 'الفصل بين الحقيقة والتطبيق + أخلاقيات الاستخدام المزدوج',
    biasCountered: 'Halo effect / authority transfer — assuming that because the knowledge is true, its use is good.',
    why: 'Source, info, and context are perfect; the wrong is the APPLICATION. You separate the verified fact from its deployment and name the harm.',
    steps: [
      'Confirm the underlying knowledge is genuinely valid.',
      'Separate the fact (is) from how it is being used (ought).',
      'Name the specific harm and who bears it.',
      'Demand ethical oversight / consent — judge the application, not the truth.',
    ],
    shieldTools: ['dual-use ethics checklist', 'consent/intent provenance', 'harm-mapping'],
    source: 'Hume (is–ought) · dual-use research-of-concern frameworks',
  },
  {
    layer: 6,
    technique: 'Inoculation / Prebunking + Bubble-Exit',
    techniqueAr: 'التلقيح المعرفي / الدحض الاستباقي + كسر الفقاعة',
    biasCountered: 'Identity-protective cognition & the backfire effect — facts push the victim DEEPER because belief is fused to identity.',
    why: 'This is the Matrix: showing facts strengthens the trap. You do not argue facts first — you restore exit ramps and build resistance BEFORE exposure.',
    steps: [
      'Do NOT lead with the counter-fact; acknowledge the emotion/need first.',
      'Introduce a WEAKENED version of the manipulation + how it works (prebunk).',
      'Name the technique being used on them (technique-spotting > fact-correction).',
      'Rebuild a diverse information network so the bubble has exits.',
    ],
    shieldTools: ['inoculation modules (Bad News / GoViral-style)', 'technique-spotting trainer', 'network-diversity prompts'],
    source: 'McGuire (1964) · van der Linden & Roozenbeek (2017–2022) inoculation theory',
  },
  {
    layer: 7,
    technique: 'Systems & Incentive Mapping',
    techniqueAr: 'رسم خرائط الأنظمة والحوافز',
    biasCountered: 'System justification & proportionality bias — assuming no single actor could own the whole channel.',
    why: 'Layer 7 is structural: the manipulation is in who owns the algorithmic rails. You counter it by mapping incentives and ownership, not by debating any one message.',
    steps: [
      'Map the platform/channel incentives (what is being optimized — attention, outrage, time).',
      'Trace ownership and funding of the channel.',
      'Identify the behavioral nudge embedded in the design (the rail).',
      'Refuse the rail — change the information diet, not just the belief.',
    ],
    shieldTools: ['structural/ownership map', 'funding datasets', 'recommender-incentive analysis'],
    source: 'Zuboff (2019) surveillance capitalism · Meadows systems thinking',
  },
  {
    layer: 8,
    technique: 'Bayesian Calibration + Steelman the Null',
    techniqueAr: 'المعايرة الاحتمالية + تقوية فرضية العدم',
    biasCountered: 'Need for closure & overconfidence — manufacturing certainty to make the unknown feel resolved.',
    why: 'Layer 8 is genuinely unexplained. The honest defense is probability, not a verdict. Manufacturing certainty here is itself the failure.',
    steps: [
      'Assign a probability / confidence band, not a binary verdict.',
      'State the strongest honest "we do not know" (steelman the null).',
      'Specify exactly what evidence would update the estimate.',
      'Hold the label at UNVERIFIED until that evidence arrives.',
    ],
    shieldTools: ['confidence calibration', 'explicit UNVERIFIED state', 'pre-registered update criteria'],
    source: 'Bayesian epistemology · Tetlock (2015) calibrated forecasting',
  },
];

export function getDefense(layer: number | null | undefined): CognitiveDefense | null {
  if (!layer) return null;
  return COGNITION_BUILDER.find((d) => d.layer === layer) ?? null;
}

/** Compact block for embedding the full shield in an LLM system/user prompt. */
export const COGNITION_PROMPT_BLOCK = COGNITION_BUILDER.map(
  (d) =>
    `Layer ${d.layer} → TECHNIQUE: ${d.technique}. COUNTERS: ${d.biasCountered} WHY: ${d.why} STEPS: ${d.steps.join(' → ')}`,
).join('\n');

/* ── The Inoculation Technique Taxonomy (EAL Standard §17.3) ──────────────
 * The manipulation techniques cognition-builder pages inoculate users against.
 * Sourced from FLICC (Cook/Lewandowsky), Bad News & GoViral (Cambridge SDM Lab),
 * and the Jigsaw "transferable techniques" field study (Science Advances 2022).
 * Each carries the one-line PREBUNK: warn → weakened example → refute. */
export interface ManipulationTechnique {
  id: string;
  name: string;
  nameAr: string;
  family: 'FLICC' | 'BadNews' | 'Jigsaw' | 'Amplification' | 'Context';
  prebunk: string; // how to inoculate against it
}

export const INOCULATION_TECHNIQUES: ManipulationTechnique[] = [
  { id: 'emotion', name: 'Emotional Manipulation', nameAr: 'التلاعب العاطفي', family: 'Jigsaw', prebunk: 'Fear/outrage bait bypasses reason. Notice the spike, then ask what the content actually claims.' },
  { id: 'fake-expert', name: 'Fake Experts / Impersonation', nameAr: 'خبراء زائفون / انتحال', family: 'FLICC', prebunk: 'A lab coat or a cloned logo is not a credential. Verify the person and institution exist (lateral reading).' },
  { id: 'conspiracy', name: 'Conspiratorial Reasoning', nameAr: 'التفكير التآمري', family: 'FLICC', prebunk: 'Unfalsifiable "secret coordination" narratives reinterpret all evidence as proof. Ask what would disprove it.' },
  { id: 'false-dichotomy', name: 'False Dichotomy', nameAr: 'الثنائية الزائفة', family: 'Jigsaw', prebunk: 'Only two options offered where more exist. Name the missing third option.' },
  { id: 'scapegoating', name: 'Scapegoating', nameAr: 'كبش الفداء', family: 'Jigsaw', prebunk: 'Blaming one group for a complex problem. Ask about the other real causes being hidden.' },
  { id: 'ad-hominem', name: 'Ad Hominem / Trolling / Discrediting', nameAr: 'مهاجمة الشخص / التصيّد', family: 'Jigsaw', prebunk: 'Attacking the messenger dodges the argument. Separate who said it from whether it is true.' },
  { id: 'incoherence', name: 'Incoherence', nameAr: 'التناقض الذاتي', family: 'Jigsaw', prebunk: 'Self-contradictory claims (it is harmless AND a deadly weapon). Hold the two statements side by side.' },
  { id: 'polarization', name: 'Polarization & Artificial Amplification', nameAr: 'الاستقطاب والتضخيم المصطنع', family: 'Amplification', prebunk: 'Bots, fake followers, astroturf manufacture a fake "consensus." Check whether the agreement is real people.' },
  { id: 'decontextualization', name: 'Decontextualization', nameAr: 'اقتطاع السياق', family: 'Context', prebunk: 'Real media, false context (old clip, wrong place). Reverse-search and find the original (SIFT).' },
  { id: 'cherry-picking', name: 'Cherry Picking', nameAr: 'انتقاء الكرز', family: 'FLICC', prebunk: 'A true data point chosen to mislead. Ask for the full dataset and the base rate.' },
  { id: 'impossible-expectations', name: 'Impossible Expectations', nameAr: 'توقعات مستحيلة', family: 'FLICC', prebunk: 'Demanding unattainable certainty to dismiss real evidence (no study is "100%"). Judge on the weight of evidence.' },
  { id: 'logical-fallacy', name: 'Logical Fallacies', nameAr: 'المغالطات المنطقية', family: 'FLICC', prebunk: 'Faulty reasoning links (slippery slope, strawman). Map the argument to expose the broken step.' },
];

export function getTechnique(id: string): ManipulationTechnique | null {
  return INOCULATION_TECHNIQUES.find((t) => t.id === id) ?? null;
}
