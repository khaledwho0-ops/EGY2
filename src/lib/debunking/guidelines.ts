export type Domain = 'scientific' | 'islamic' | 'both';
export type KillStatus = 'PASS' | 'FLAG' | 'FAIL';

export interface GuidelineRule {
  id: string;
  domain: Domain;
  name: string;
  description: string;
  killCode: string;
  enforcementLevel: 'strict' | 'moderate' | 'loose';
}

export const LOGICAL_GUIDELINES: GuidelineRule[] = [
  {
    id: "L_G1",
    domain: "both",
    name: "Principle of Non-Contradiction",
    description: "A statement cannot be both true and false at the same time and in the same sense.",
    killCode: "LOGIC_FAIL_CONTRADICTION",
    enforcementLevel: "strict"
  },
  {
    id: "L_G2",
    domain: "both",
    name: "Burden of Proof",
    description: "The burden of proof lies with the person making the claim, not the one questioning it.",
    killCode: "LOGIC_FAIL_BURDEN",
    enforcementLevel: "strict"
  },
  {
    id: "L_G3",
    domain: "both",
    name: "Law of Excluded Middle",
    description: "For any proposition, either that proposition is true or its negation is true.",
    killCode: "LOGIC_FAIL_EXCLUDED_MIDDLE",
    enforcementLevel: "moderate"
  },
  {
    id: "L_G4",
    domain: "both",
    name: "Occam's Razor",
    description: "When presented with competing hypotheses, the one with the fewest assumptions should be selected.",
    killCode: "LOGIC_FAIL_OCCAM",
    enforcementLevel: "moderate"
  },
  {
    id: "L_G5",
    domain: "both",
    name: "Sufficient Reason",
    description: "Everything must have a reason or a cause.",
    killCode: "LOGIC_FAIL_SUFFICIENT_REASON",
    enforcementLevel: "strict"
  }
];

export const SCIENTIFIC_GUIDELINES: GuidelineRule[] = [
  {
    id: "S_G1",
    domain: "scientific",
    name: "PRISMA Compliance",
    description: "Every systematic review must follow Preferred Reporting Items. Non-PRISMA studies cited as absolute truth must be flagged as empirically unsound.",
    killCode: "SYSTEM_FAIL_NO_PRISMA",
    enforcementLevel: "strict"
  },
  {
    id: "S_G2",
    domain: "scientific",
    name: "CONSORT Compliance",
    description: "Medical trials must show patient flow, blinding, and drop-outs. Hidden data triggers a fraud alert.",
    killCode: "SYSTEM_FAIL_CONSORT_VIOLATION",
    enforcementLevel: "strict"
  },
  {
    id: "S_G3",
    domain: "scientific",
    name: "COPE Integrity",
    description: "Papers must be checked for conflict of interest. Corporate-funded papers without disclosure are flagged immediately.",
    killCode: "SYSTEM_FAIL_UNDISCLOSED_COI",
    enforcementLevel: "strict"
  },
  {
    id: "S_G4",
    domain: "scientific",
    name: "FAIR Data Standard",
    description: "Data must be Findable, Accessible, Interoperable, Reusable. Black-box unverified claims are rejected.",
    killCode: "SYSTEM_FAIL_UNFAIR_DATA",
    enforcementLevel: "strict"
  },
  {
    id: "S_G5",
    domain: "scientific",
    name: "Statistical Power Threshold",
    description: "Studies with statistical power < 0.80 or n < 30 are flagged as underpowered.",
    killCode: "SYSTEM_FAIL_LOW_POWER",
    enforcementLevel: "moderate"
  },
  {
    id: "S_G6",
    domain: "scientific",
    name: "P-Value Integrity",
    description: "Clusters of p-values near 0.05 without justification are flagged for potential p-hacking.",
    killCode: "SYSTEM_FAIL_P_HACKING",
    enforcementLevel: "moderate"
  }
];

export const ISLAMIC_GUIDELINES: GuidelineRule[] = [
  {
    id: "I_G1",
    domain: "islamic",
    name: "Amman Message (2004)",
    description: "Defines valid Muslim identity across 8 Mathhabs. Outlaws arbitrary Takfir. Any Takfir attempt is immediately blocked.",
    killCode: "SYSTEM_FAIL_TAKFIR",
    enforcementLevel: "strict"
  },
  {
    id: "I_G2",
    domain: "islamic",
    name: "Makkah Declaration (2019)",
    description: "Mandates religious diversity and dialogue. Exclusivist, supremacist, or isolationist rhetoric is flagged.",
    killCode: "SYSTEM_FAIL_EXCLUSIVISM",
    enforcementLevel: "strict"
  },
  {
    id: "I_G3",
    domain: "islamic",
    name: "IIFA Resolutions",
    description: "OIC scholarly council rulings on modern issues. Intersection of science and Islam must pull IIFA consensus first.",
    killCode: "SYSTEM_FAIL_NO_IIFA",
    enforcementLevel: "moderate"
  },
  {
    id: "I_G4",
    domain: "islamic",
    name: "AAOIFI Standards",
    description: "Islamic finance rules. Any financial ruling must be checked against AAOIFI. Zero Riba, zero Gharar.",
    killCode: "SYSTEM_FAIL_RIBA",
    enforcementLevel: "strict"
  },
  {
    id: "I_G5",
    domain: "islamic",
    name: "Wathiqat Al-Azhar",
    description: "Al-Azhar methodology asserting a civic state, minority rights, and absolute scientific freedom.",
    killCode: "SYSTEM_FAIL_AZHAR_DEVIATION",
    enforcementLevel: "strict"
  },
  {
    id: "I_G6",
    domain: "islamic",
    name: "Usul al-Fiqh Integrity",
    description: "Enforces rules of General/Specific and Nasikh/Mansukh. Citing an abrogated verse as current law is blocked.",
    killCode: "SYSTEM_FAIL_ABROGATED_CITATION",
    enforcementLevel: "strict"
  },
  {
    id: "I_G7",
    domain: "islamic",
    name: "Maqasid al-Shariah",
    description: "Preservation of Religion, Life, Intellect, Lineage, Property. Rulings contradicting these 5 objectives are blocked.",
    killCode: "SYSTEM_FAIL_MAQASID_VIOLATION",
    enforcementLevel: "strict"
  }
];

export const AI_ETHICS_GUIDELINES: GuidelineRule[] = [
  {
    id: "E_G1",
    domain: "both",
    name: "Algorithmic Transparency",
    description: "AI never answers without citing exact steps. No dopamine hijacking or black-box reasoning.",
    killCode: "SYSTEM_FAIL_BLACKBOX_AI",
    enforcementLevel: "strict"
  },
  {
    id: "E_G2",
    domain: "both",
    name: "Anti-Concordism",
    description: "AI NEVER forces science to prove the Quran, nor forces the Quran to validate science. They must be presented side-by-side only.",
    killCode: "SYSTEM_FAIL_CONCORDISM",
    enforcementLevel: "strict"
  }
];

// ---------------------------------------------------------------------------
// Validation Rule Engine Types
// ---------------------------------------------------------------------------

export interface GuidelineViolation {
  ruleId: string;
  killCode: string;
  name: string;
  severity: 'critical' | 'warning' | 'info';
  matchedText: string;
  explanation: string;
  explanationAr: string;
}

interface ValidationRule {
  guidelineId: string;
  domain: Domain;
  killCode: string;
  name: string;
  triggerPatterns: RegExp[];
  coOccurrence?: [RegExp, RegExp][];
  coOccurrenceAbsence?: [RegExp, RegExp[]][];   // [trigger, must-have-at-least-one]
  exclusionPatterns?: RegExp[];
  weight: number;   // 0-1 importance
  severity: 'critical' | 'warning' | 'info';
  explanation: string;
  explanationAr: string;
}

// ---------------------------------------------------------------------------
// Helper: first match text from a list of regexes
// ---------------------------------------------------------------------------

function firstMatch(text: string, patterns: RegExp[]): string | null {
  for (const p of patterns) {
    const m = text.match(p);
    if (m) return m[0];
  }
  return null;
}

function anyMatch(text: string, patterns: RegExp[]): boolean {
  return patterns.some(p => p.test(text));
}

// ---------------------------------------------------------------------------
// Validation Rules — one per guideline (15 total)
// ---------------------------------------------------------------------------

const VALIDATION_RULES: ValidationRule[] = [
  // ===== SCIENTIFIC (6) =====

  // S_G1 — PRISMA: systematic review without PRISMA methodology
  {
    guidelineId: "S_G1",
    domain: "scientific",
    killCode: "SYSTEM_FAIL_NO_PRISMA",
    name: "PRISMA Compliance",
    triggerPatterns: [
      /\bsystematic\s+review\b/i,
      /\bliterature\s+review\b/i,
      /\bmeta[\s-]?analysis\b/i,
      /مراجعة\s*منهجية/i,
      /تحليل\s*تلوي/i,
    ],
    coOccurrenceAbsence: [
      [
        /\b(?:systematic\s+review|literature\s+review|meta[\s-]?analysis)\b|مراجعة\s*منهجية|تحليل\s*تلوي/i,
        [/\bPRISMA\b/i, /\bprotocol\b/i, /\bregistered\b/i, /\bPROSPERO\b/i, /\bCochrane\b/i],
      ],
    ],
    exclusionPatterns: [
      /\bPRISMA\s+compliant\b/i,
      /\bfollowed\s+PRISMA\b/i,
      /\bPRISMA\s+guidelines\b/i,
    ],
    weight: 0.9,
    severity: "critical",
    explanation: "A systematic review or meta-analysis was mentioned without evidence of PRISMA protocol, registration, or Cochrane methodology. Non-PRISMA reviews risk selection bias.",
    explanationAr: "تم ذكر مراجعة منهجية أو تحليل تلوي بدون دليل على بروتوكول PRISMA أو التسجيل أو منهجية كوكرين. المراجعات بدون PRISMA معرضة لتحيز الاختيار.",
  },

  // S_G2 — CONSORT: trial claims without methodology
  {
    guidelineId: "S_G2",
    domain: "scientific",
    killCode: "SYSTEM_FAIL_CONSORT_VIOLATION",
    name: "CONSORT Compliance",
    triggerPatterns: [
      /\bclinical\s+trial\b/i,
      /\brandomized\s+trial\b/i,
      /\bcontrolled\s+trial\b/i,
      /\bRCT\b/,
      /\bdrug\s+trial\b/i,
      /تجربة\s*سريرية/i,
      /تجربة\s*عشوائية/i,
    ],
    coOccurrenceAbsence: [
      [
        /\b(?:clinical|randomized|controlled|drug)\s+trial\b|\bRCT\b|تجربة\s*(?:سريرية|عشوائية)/i,
        [
          /\bblind(?:ing|ed)\b/i, /\bdouble[\s-]?blind\b/i, /\bplacebo\b/i,
          /\bcontrol\s+group\b/i, /\brandomiz(?:ed|ation)\b/i, /\bCONSORT\b/i,
          /\bdrop[\s-]?out\b/i, /\battrition\b/i, /\bintention[\s-]?to[\s-]?treat\b/i,
        ],
      ],
    ],
    exclusionPatterns: [
      /\bCONSORT\s+compliant\b/i,
      /\bfollowed\s+CONSORT\b/i,
    ],
    weight: 0.9,
    severity: "critical",
    explanation: "A clinical trial claim was detected without mention of blinding, randomization, placebo, control group, or CONSORT compliance — key methodological safeguards.",
    explanationAr: "تم اكتشاف ادعاء تجربة سريرية بدون ذكر التعمية أو العشوائية أو الدواء الوهمي أو مجموعة التحكم أو امتثال CONSORT — وهي ضمانات منهجية أساسية.",
  },

  // S_G3 — COPE: undisclosed conflicts of interest
  {
    guidelineId: "S_G3",
    domain: "scientific",
    killCode: "SYSTEM_FAIL_UNDISCLOSED_COI",
    name: "COPE Integrity",
    triggerPatterns: [
      /\bfunded\s+by\b/i,
      /\bsponsored\s+by\b/i,
      /\bgrant\s+from\b/i,
      /\bcorporate[\s-]?funded\b/i,
      /\bindustry[\s-]?funded\b/i,
      /ممول\s*من/i,
      /برعاية/i,
    ],
    coOccurrenceAbsence: [
      [
        /\b(?:funded|sponsored)\s+by\b|\bgrant\s+from\b|\b(?:corporate|industry)[\s-]?funded\b|ممول\s*من|برعاية/i,
        [
          /\bconflict\s+of\s+interest\b/i, /\bdisclosure\b/i, /\bdeclare[ds]?\b/i,
          /\bCOPE\b/, /\btransparency\b/i, /تضارب\s*مصالح/i, /إفصاح/i,
        ],
      ],
    ],
    exclusionPatterns: [
      /\bno\s+conflict\s+of\s+interest\b/i,
      /\bconflicts?\s+(?:of\s+interest\s+)?disclosed\b/i,
    ],
    weight: 0.95,
    severity: "critical",
    explanation: "Funding or sponsorship was mentioned without any conflict-of-interest disclosure. COPE guidelines require transparent declarations for research integrity.",
    explanationAr: "تم ذكر تمويل أو رعاية بدون أي إفصاح عن تضارب المصالح. تتطلب إرشادات COPE إعلانات شفافة لنزاهة البحث.",
  },

  // S_G4 — FAIR: black-box unverifiable claims
  {
    guidelineId: "S_G4",
    domain: "scientific",
    killCode: "SYSTEM_FAIL_UNFAIR_DATA",
    name: "FAIR Data Standard",
    triggerPatterns: [
      /\bscientifically\s+proven\b/i,
      /\bdefinitively\s+confirmed\b/i,
      /\bundeniable\s+(?:evidence|proof|fact)\b/i,
      /\birrefutable\b/i,
      /\b100%\s+(?:proven|confirmed|effective)\b/i,
      /مثبت\s*علمي[اً]?/i,
      /حقيقة\s*لا\s*(?:تقبل|تحتمل)\s*الشك/i,
    ],
    coOccurrenceAbsence: [
      [
        /\b(?:scientifically\s+proven|definitively\s+confirmed|irrefutable)\b|\bundeniable\s+(?:evidence|proof|fact)\b|مثبت\s*علمي/i,
        [
          /\bdata\s+availab(?:le|ility)\b/i, /\breproducib(?:le|ility)\b/i,
          /\bmethodology\b/i, /\bpeer[\s-]?review(?:ed)?\b/i, /\bsource\s+code\b/i,
          /\bopen\s+(?:access|data)\b/i, /\bFAIR\b/,
        ],
      ],
    ],
    weight: 0.85,
    severity: "warning",
    explanation: "Absolute certainty language ('proven', 'irrefutable') was used without citing reproducible methodology, data availability, or peer review — violating FAIR principles.",
    explanationAr: "تم استخدام لغة اليقين المطلق ('مثبت'، 'لا يقبل الشك') بدون ذكر منهجية قابلة للتكرار أو توفر البيانات أو مراجعة الأقران — مما ينتهك مبادئ FAIR.",
  },

  // S_G5 — Statistical Power: underpowered studies
  {
    guidelineId: "S_G5",
    domain: "scientific",
    killCode: "SYSTEM_FAIL_LOW_POWER",
    name: "Statistical Power Threshold",
    triggerPatterns: [
      // n=<number> where number < 30
      /\bn\s*=\s*(?:[12]?\d)\b/i,
      /\bsample\s+(?:size|of)\s*(?:=|:)?\s*(?:[12]?\d)\b/i,
      /\bsmall\s+(?:sample|study|cohort|group)\b/i,
      /\bunderpowered\b/i,
      /\bpilot\s+study\b/i,
      /\bcase\s+(?:report|series)\b/i,
      /عينة\s*صغيرة/i,
      /دراسة\s*(?:تجريبية|أولية)/i,
    ],
    exclusionPatterns: [
      // Don't flag if they acknowledge limitation
      /\blimitation\b/i,
      /\bpreliminary\b/i,
      /\bexploratory\b/i,
      /\bneed(?:s|ed)?\s+(?:further|larger|more)\b/i,
      // n >= 30 is fine; exclude common false positives
      /\bn\s*=\s*(?:[3-9]\d{1,}|\d{3,})\b/i,
    ],
    weight: 0.7,
    severity: "warning",
    explanation: "The study appears underpowered (sample size < 30 or described as 'small'/'pilot') without acknowledging this limitation. Results may not be generalizable.",
    explanationAr: "تبدو الدراسة ناقصة القوة الإحصائية (حجم العينة أقل من 30 أو وصفت بأنها 'صغيرة'/'تجريبية') بدون الاعتراف بهذا القيد. قد لا تكون النتائج قابلة للتعميم.",
  },

  // S_G6 — P-Hacking: suspicious p-values near 0.05
  {
    guidelineId: "S_G6",
    domain: "scientific",
    killCode: "SYSTEM_FAIL_P_HACKING",
    name: "P-Value Integrity",
    triggerPatterns: [
      // p-values suspiciously close to 0.05: p = 0.04x or p = 0.05x
      /p\s*[=<]\s*0\.0[45]\d*/i,
      // "barely significant"
      /\bbarely\s+significant\b/i,
      /\bmarginally\s+significant\b/i,
      /\bborderline\s+significan(?:t|ce)\b/i,
      /\btrending?\s+toward(?:s)?\s+significan(?:t|ce)\b/i,
    ],
    exclusionPatterns: [
      /\bcorrected\b/i,
      /\bBonferroni\b/i,
      /\bFDR\b/,
      /\badjusted\s+p\b/i,
      /\bmultiple\s+(?:comparison|testing)\s+correction\b/i,
      /\bHolm\b/i,
    ],
    weight: 0.75,
    severity: "warning",
    explanation: "P-values near the 0.05 threshold or 'borderline significance' language detected without mention of correction for multiple comparisons — a hallmark of p-hacking.",
    explanationAr: "تم اكتشاف قيم p قريبة من عتبة 0.05 أو لغة 'أهمية حدية' بدون ذكر تصحيح المقارنات المتعددة — وهي علامة مميزة للتلاعب بقيم p.",
  },

  // ===== ISLAMIC (7) =====

  // I_G1 — Amman Message / Takfir detection
  {
    guidelineId: "I_G1",
    domain: "islamic",
    killCode: "SYSTEM_FAIL_TAKFIR",
    name: "Amman Message (2004)",
    triggerPatterns: [
      /\bkafir\b/i,
      /\bkaffir\b/i,
      /\bkuffar\b/i,
      /\bapostate\b/i,
      /\bdisbeliever\b/i,
      /\bmurtad\b/i,
      /\btakfir\b/i,
      /كافر/,
      /كفار/,
      /مرتد/,
      /خارج\s*(?:عن|من)?\s*(?:ال)?ملة/,
      /خارج\s*(?:عن|من)?\s*(?:ال)?إسلام/,
      /ليس\s*مسلم/,
      /\bnot\s+(?:a\s+)?(?:real\s+)?muslim\b/i,
      /\bhe\s+is\s+(?:a\s+)?kafir\b/i,
      /\bshe\s+is\s+(?:a\s+)?kafir\b/i,
      /\bthey\s+are\s+(?:all\s+)?kuffar\b/i,
    ],
    exclusionPatterns: [
      // Negation contexts — warning against takfir
      /\bdon'?t\s+call\s+(?:anyone|him|her|them)\s+kafir\b/i,
      /\bshould\s+not\s+(?:call|label|declare)\b.*\bkafir\b/i,
      /\bforbidden\s+to\s+(?:call|declare)\b.*\bkafir\b/i,
      /\bis\s+NOT\s+a\s+kafir\b/i,
      /\bno\s+one\s+should\s+be\s+called\s+kafir\b/i,
      /لا\s*تكفر/,
      /لا\s*يجوز\s*التكفير/,
      /حرام\s*التكفير/,
      /نهى\s*عن\s*التكفير/,
      // Academic discussion
      /\bAmman\s+Message\b/i,
      /\bhistory\s+of\s+takfir\b/i,
      /رسالة\s*عمان/,
    ],
    weight: 1.0,
    severity: "critical",
    explanation: "Takfir (declaring someone a disbeliever) detected. The Amman Message (2004) signed by 200+ scholars explicitly forbids arbitrary takfir across all 8 recognized Islamic schools.",
    explanationAr: "تم اكتشاف تكفير (إعلان شخص كافرًا). رسالة عمان (2004) الموقعة من أكثر من 200 عالم تحظر صراحة التكفير التعسفي عبر جميع المذاهب الإسلامية الثمانية المعترف بها.",
  },

  // I_G2 — Makkah Declaration / Exclusivism
  {
    guidelineId: "I_G2",
    domain: "islamic",
    killCode: "SYSTEM_FAIL_EXCLUSIVISM",
    name: "Makkah Declaration (2019)",
    triggerPatterns: [
      /\bonly\s+true\s+islam\b/i,
      /\bonly\s+(?:the\s+)?saved\s+sect\b/i,
      /\bonly\s+(?:we|our\s+group)\s+(?:are|is)\s+(?:right|correct|saved)\b/i,
      /\bother\s+sects?\s+(?:are|is)\s+(?:deviant|wrong|astray|misguided)\b/i,
      /\ball\s+other\s+(?:muslims?|sects?|groups?)\s+(?:are|is)\s+(?:wrong|deviant|lost)\b/i,
      /الفرقة\s*الناجية\s*بس/,
      /إحنا\s*بس\s*صح/,
      /إحنا\s*بس\s*(?:ال)?مسلمين/,
      /كل\s*(?:ال)?فرق\s*(?:ال)?أخرى\s*(?:ضالة|خاطئة|منحرفة)/,
      /\binfidel\s+(?:nation|country|people)\b/i,
      /\bkill\s+(?:the\s+)?(?:infidels?|disbelievers?|mushrik(?:een|in)?)\b/i,
    ],
    exclusionPatterns: [
      /\bMakkah\s+Declaration\b/i,
      /\binterfaith\s+dialogue\b/i,
      /\breligious\s+pluralism\b/i,
      /إعلان\s*مكة/,
      /حوار\s*(?:ال)?أديان/,
    ],
    weight: 1.0,
    severity: "critical",
    explanation: "Exclusivist or supremacist rhetoric detected ('only true Islam', 'all other sects are deviant'). The Makkah Declaration (2019) mandates religious diversity and inter-civilizational dialogue.",
    explanationAr: "تم اكتشاف خطاب إقصائي أو تفوقي ('الإسلام الوحيد الصحيح'، 'كل الفرق الأخرى ضالة'). إعلان مكة (2019) يفرض التنوع الديني والحوار بين الحضارات.",
  },

  // I_G3 — IIFA: science + Islam intersection without scholarly reference
  {
    guidelineId: "I_G3",
    domain: "islamic",
    killCode: "SYSTEM_FAIL_NO_IIFA",
    name: "IIFA Resolutions",
    triggerPatterns: [
      /\bislam(?:ic)?\s+(?:ruling|verdict|fatwa)\s+(?:on|about|regarding)\s+(?:cloning|ivf|organ|stem\s+cell|euthanasia|brain\s+death|genetic|surrogacy|transplant)/i,
      /\bharam\s+(?:to|because)\b.*\b(?:scien(?:ce|tific)|medic(?:al|ine)|technolog)/i,
      /\bhalal\s+(?:to|because)\b.*\b(?:scien(?:ce|tific)|medic(?:al|ine)|technolog)/i,
      /حكم\s*(?:ال)?(?:استنساخ|أطفال\s*الأنابيب|نقل\s*الأعضاء|الخلايا\s*الجذعية|القتل\s*الرحيم)/,
      /فتوى\s*(?:ال)?(?:استنساخ|تلقيح|زراعة)/,
    ],
    coOccurrenceAbsence: [
      [
        /\bislam(?:ic)?\s+(?:ruling|verdict|fatwa)\b|حكم|فتوى/i,
        [
          /\bIIFA\b/, /\bOIC\b/, /\bFiqh\s+Academy\b/i, /\bscholar(?:s|ly)\b/i,
          /\bconsensus\b/i, /\bijma\b/i, /مجمع\s*الفقه/i, /إجماع/,
          /منظمة\s*(?:ال)?تعاون\s*الإسلامي/,
        ],
      ],
    ],
    weight: 0.7,
    severity: "warning",
    explanation: "An Islamic ruling on a modern science/medical issue was made without referencing IIFA (International Islamic Fiqh Academy), OIC, or established scholarly consensus.",
    explanationAr: "تم إصدار حكم إسلامي في قضية علمية/طبية حديثة بدون الإشارة إلى مجمع الفقه الإسلامي الدولي أو منظمة التعاون الإسلامي أو إجماع العلماء المعتبر.",
  },

  // I_G4 — AAOIFI / Riba
  {
    guidelineId: "I_G4",
    domain: "islamic",
    killCode: "SYSTEM_FAIL_RIBA",
    name: "AAOIFI Standards",
    triggerPatterns: [
      /\binterest\s+(?:is\s+)?halal\b/i,
      /\bhalal\s+interest\b/i,
      /\briba\s+(?:is\s+)?(?:allowed|permissible|halal|ok|okay|fine|acceptable)\b/i,
      /\bbank\s+interest\s+(?:is\s+)?(?:not\s+)?(?:haram|riba)\b/i,
      /الفايدة\s*حلال/,
      /الفائدة\s*حلال/,
      /ربا\s*(?:جايز|حلال|مباح)/,
      /الربا\s*مش\s*حرام/,
      /\busury\s+(?:is\s+)?(?:acceptable|fine|okay|permitted)\b/i,
      /\bgharar\s+(?:is\s+)?(?:acceptable|fine|okay|permitted|halal)\b/i,
      /غرر\s*(?:جايز|حلال|مباح)/,
    ],
    exclusionPatterns: [
      /\bAAOIFI\b/i,
      /\bIslamic\s+finance\b/i,
      /\bshariah[\s-]?compliant\b/i,
      /هيئة\s*المحاسبة/,
      /تمويل\s*إسلامي/,
    ],
    weight: 1.0,
    severity: "critical",
    explanation: "Permitting riba (usury/interest) or gharar (excessive uncertainty) detected. AAOIFI Standards and unanimous scholarly consensus categorically prohibit riba in all forms.",
    explanationAr: "تم اكتشاف تجويز الربا أو الغرر المفرط. معايير هيئة المحاسبة والمراجعة (AAOIFI) وإجماع العلماء يحرمان الربا بجميع أشكاله قطعيًا.",
  },

  // I_G5 — Wathiqat Al-Azhar: anti-Azhar extremism
  {
    guidelineId: "I_G5",
    domain: "islamic",
    killCode: "SYSTEM_FAIL_AZHAR_DEVIATION",
    name: "Wathiqat Al-Azhar",
    triggerPatterns: [
      /\bAl[\s-]?Azhar\s+(?:is\s+)?(?:corrupt|deviant|heretic|sold[\s-]?out|government\s+tool|puppet)\b/i,
      /\bAzhar\s+(?:scholars?\s+)?(?:are\s+)?(?:wrong|misguided|deviant|fake|sell[\s-]?out)\b/i,
      /\bdon'?t\s+(?:trust|follow|listen\s+to)\s+(?:Al[\s-]?)?Azhar\b/i,
      /الأزهر\s*(?:فاسد|منحرف|تابع|عميل|باع)/,
      /علماء\s*الأزهر\s*(?:ضالين|فاسدين|منحرفين)/,
      /\bno\s+(?:civic|civil|secular)\s+state\b/i,
      /\bdemocracy\s+(?:is\s+)?(?:kufr|haram|shirk|forbidden)\b/i,
      /الديمقراطية\s*(?:كفر|حرام|شرك)/,
      /\bminority\s+rights?\s+(?:are\s+)?(?:un[\s-]?islamic|haram|against\s+islam)\b/i,
      /حقوق\s*(?:ال)?أقليات\s*(?:حرام|ضد\s*الإسلام)/,
    ],
    exclusionPatterns: [
      /\bconstructive\s+criticism\b/i,
      /\breform(?:ing)?\s+(?:Al[\s-]?)?Azhar\b/i,
      /نقد\s*بناء/,
    ],
    weight: 0.9,
    severity: "critical",
    explanation: "Anti-Azhar extremism or rejection of civic state principles detected. Wathiqat Al-Azhar affirms a civic state, minority rights, and full academic/scientific freedom.",
    explanationAr: "تم اكتشاف تطرف ضد الأزهر أو رفض مبادئ الدولة المدنية. وثيقة الأزهر تؤكد الدولة المدنية وحقوق الأقليات والحرية الأكاديمية والعلمية الكاملة.",
  },

  // I_G6 — Usul al-Fiqh / Abrogation: citing abrogated verses as current law
  {
    guidelineId: "I_G6",
    domain: "islamic",
    killCode: "SYSTEM_FAIL_ABROGATED_CITATION",
    name: "Usul al-Fiqh Integrity",
    triggerPatterns: [
      // Known commonly discussed abrogated references used as final rulings
      /\babrogated\s+(?:verse|ayah|ruling)\b.*\b(?:still\s+)?(?:applies|valid|binding|current)\b/i,
      /\bthis\s+verse\s+(?:still\s+)?(?:overrides|supersedes|cancels)\b/i,
      /\bno\s+(?:such\s+thing\s+as\s+)?abrogation\b/i,
      /\bNasikh.*(?:is\s+a\s+)?(?:lie|myth|fabricat|invent)\b/i,
      /النسخ\s*(?:كذب|خرافة|اختراع|بدعة)/,
      /الآية\s*(?:ال)?منسوخة\s*(?:لسه|مازالت|ما\s*زالت)\s*سارية/,
      /لا\s*(?:يوجد|فيه)\s*نسخ\s*(?:في|ب)\s*(?:ال)?قرآن/,
    ],
    exclusionPatterns: [
      /\bacademic\s+(?:discussion|debate|study)\b/i,
      /\busul\s+al[\s-]?fiqh\b/i,
      /أصول\s*الفقه/,
      /\bscholarly\s+(?:discussion|debate)\b/i,
    ],
    weight: 0.85,
    severity: "critical",
    explanation: "Denial of abrogation (nasikh/mansukh) or citation of a known abrogated ruling as current law. Usul al-Fiqh methodology requires proper application of general/specific and abrogation principles.",
    explanationAr: "تم اكتشاف إنكار النسخ (الناسخ والمنسوخ) أو الاستشهاد بحكم منسوخ معروف كقانون ساري. منهجية أصول الفقه تتطلب التطبيق الصحيح لقواعد العام والخاص والناسخ والمنسوخ.",
  },

  // I_G7 — Maqasid al-Shariah: rulings contradicting the 5 objectives
  {
    guidelineId: "I_G7",
    domain: "islamic",
    killCode: "SYSTEM_FAIL_MAQASID_VIOLATION",
    name: "Maqasid al-Shariah",
    triggerPatterns: [
      // Contra Life preservation
      /\bhonor\s+kill(?:ing)?\s+(?:is\s+)?(?:halal|permissible|allowed|islamic|justified)\b/i,
      /\bsuicide\s+(?:bombing\s+)?(?:is\s+)?(?:halal|martyrdom|jihad|permissible)\b/i,
      /قتل\s*(?:ال)?شرف\s*(?:حلال|جايز|مباح)/,
      /(?:ال)?انتحار(?:ي)?\s*(?:حلال|جهاد|استشهاد|جايز)/,
      // Contra Intellect preservation
      /\beducation\s+(?:for\s+(?:women|girls)\s+)?(?:is\s+)?(?:haram|forbidden|un[\s-]?islamic)\b/i,
      /تعليم\s*(?:ال)?(?:بنات|نساء|مرأة)\s*(?:حرام|ممنوع)/,
      // Contra Property preservation
      /\btheft\s+(?:is\s+)?(?:halal|permissible|justified)\b/i,
      /\bstealing\s+from\s+(?:non[\s-]?muslims?|kuffar|infidels?)\s+(?:is\s+)?(?:halal|permissible)\b/i,
      /سرقة\s*(?:ال)?(?:كفار|غير\s*(?:ال)?مسلمين)\s*(?:حلال|جايز)/,
      // Contra Lineage/dignity preservation
      /\bforced\s+marriage\s+(?:is\s+)?(?:halal|permissible|allowed|sunnah)\b/i,
      /الزواج\s*(?:ال)?قسري\s*(?:حلال|جايز|سنة)/,
    ],
    exclusionPatterns: [
      /\bMaqasid\b/i,
      /مقاصد\s*الشريعة/,
      /\bforbidden\s+in\s+Islam\b/i,
      /\bIslam\s+(?:forbids?|prohibits?|condemns?)\b/i,
      /الإسلام\s*(?:يحرم|يمنع|ينهى)/,
    ],
    weight: 1.0,
    severity: "critical",
    explanation: "A ruling that directly contradicts one of the 5 Maqasid al-Shariah objectives (preservation of Religion, Life, Intellect, Lineage, Property) was detected.",
    explanationAr: "تم اكتشاف حكم يتناقض مباشرة مع أحد مقاصد الشريعة الخمسة (حفظ الدين والنفس والعقل والنسل والمال).",
  },

  // ===== AI ETHICS (2) =====

  // E_G1 — Algorithmic Transparency
  {
    guidelineId: "E_G1",
    domain: "both",
    killCode: "SYSTEM_FAIL_BLACKBOX_AI",
    name: "Algorithmic Transparency",
    triggerPatterns: [
      /\bAI\s+(?:has\s+)?(?:determined|decided|concluded|proven|confirmed)\b/i,
      /\bthe\s+algorithm\s+(?:says?|determined|confirmed|proved)\b/i,
      /\bour\s+(?:AI|model|system)\s+(?:says?|confirms?|proves?)\b/i,
      /\btrust\s+(?:the\s+)?(?:AI|algorithm|model)\b/i,
      /\bAI\s+(?:is\s+)?(?:always|never\s+wrong|infallible)\b/i,
      /الذكاء\s*الاصطناعي\s*(?:أثبت|أكد|قرر|حسم)/,
      /ثق\s*(?:في|ب)\s*(?:ال)?(?:ذكاء\s*الاصطناعي|خوارزمية)/,
    ],
    coOccurrenceAbsence: [
      [
        /\b(?:AI|algorithm|model)\s+(?:determined|decided|concluded|proven|confirmed|says?)\b|الذكاء\s*الاصطناعي\s*(?:أثبت|أكد)/i,
        [
          /\bbecause\b/i, /\bbased\s+on\b/i, /\bstep(?:s)?\b/i,
          /\breason(?:ing|s)?\b/i, /\bexplain(?:s|ed|able|ability)?\b/i,
          /\btransparent\b/i, /\bauditab(?:le|ility)\b/i,
          /لأن/, /بناء\s*على/, /خطوات/,
        ],
      ],
    ],
    weight: 0.8,
    severity: "warning",
    explanation: "AI/algorithm cited as authority without explaining reasoning steps or methodology. Algorithmic transparency requires explainable, auditable decision-making.",
    explanationAr: "تم الاستشهاد بالذكاء الاصطناعي/الخوارزمية كسلطة بدون شرح خطوات التفكير أو المنهجية. الشفافية الخوارزمية تتطلب صنع قرار قابل للتفسير والتدقيق.",
  },

  // E_G2 — Anti-Concordism
  {
    guidelineId: "E_G2",
    domain: "both",
    killCode: "SYSTEM_FAIL_CONCORDISM",
    name: "Anti-Concordism",
    triggerPatterns: [
      /\bquran\s+prov(?:es?|ed|ing)\b/i,
      /\bscience\s+confirm(?:s|ed)?\s+(?:the\s+)?quran\b/i,
      /\bquran\s+(?:predicted|foresaw|foretold)\s+(?:modern\s+)?science\b/i,
      /\bscientific\s+miracles?\s+(?:of|in)\s+(?:the\s+)?quran\b/i,
      /\bquran\s+(?:contains?|has)\s+(?:all\s+)?(?:the\s+)?(?:science|scientific\s+(?:knowledge|facts?))\b/i,
      /القرآن\s*أثبت/,
      /العلم\s*أكد\s*القرآن/,
      /القرآن\s*(?:سبق|تنبأ\s*ب)\s*(?:ال)?علم/,
      /(?:ال)?إعجاز\s*العلمي\s*(?:في|ب)\s*(?:ال)?قرآن/,
      /\bquran\s+already\s+(?:said|mentioned|told\s+us)\b/i,
      /\bmodern\s+science\s+(?:just\s+)?(?:discovered|found)\s+what\s+(?:the\s+)?quran\b/i,
    ],
    exclusionPatterns: [
      /\bside[\s-]?by[\s-]?side\b/i,
      /\bcompar(?:e|ing|ison)\b/i,
      /\bindependent(?:ly)?\b/i,
      /\bnot\s+(?:try(?:ing)?|meant)\s+to\s+prove\b/i,
      /\bconcordism\b/i,
      /\bshould\s+not\s+(?:be\s+)?(?:used\s+to\s+)?prove\b/i,
      /جنب\s*(?:إلى|ل)\s*جنب/,
      /مقارنة/,
    ],
    weight: 1.0,
    severity: "critical",
    explanation: "Concordism detected — forcing science to prove the Quran or vice versa. The Quran and science must be presented as independent, side-by-side domains, never as validation tools for each other.",
    explanationAr: "تم اكتشاف توفيقية (كونكورديزم) — إجبار العلم على إثبات القرآن أو العكس. يجب تقديم القرآن والعلم كمجالين مستقلين جنبًا إلى جنب، وليس كأدوات تحقق لبعضهما البعض.",
  },
];

// ---------------------------------------------------------------------------
// Core Validation Engine
// ---------------------------------------------------------------------------

function evaluateRule(rule: ValidationRule, text: string): GuidelineViolation | null {
  // Step 1: Check exclusion patterns first — if ANY exclusion matches, skip rule
  if (rule.exclusionPatterns && anyMatch(text, rule.exclusionPatterns)) {
    return null;
  }

  // Step 2: Check direct trigger patterns
  const directMatch = firstMatch(text, rule.triggerPatterns);
  if (!directMatch) {
    return null;
  }

  // Step 3: If there are co-occurrence absence rules, verify them
  // Pattern: trigger is present BUT required companions are ALL absent → violation
  if (rule.coOccurrenceAbsence) {
    let coOccAbsenceTriggered = false;
    for (const [trigger, requiredCompanions] of rule.coOccurrenceAbsence) {
      if (trigger.test(text)) {
        const hasAnyCompanion = requiredCompanions.some(r => r.test(text));
        if (!hasAnyCompanion) {
          coOccAbsenceTriggered = true;
          break;
        }
      }
    }
    // If the rule has coOccurrenceAbsence but none triggered, it means
    // either the trigger wasn't present or companions were found — no violation
    if (!coOccAbsenceTriggered) {
      return null;
    }
  }

  return {
    ruleId: rule.guidelineId,
    killCode: rule.killCode,
    name: rule.name,
    severity: rule.severity,
    matchedText: directMatch.substring(0, 120),
    explanation: rule.explanation,
    explanationAr: rule.explanationAr,
  };
}

export function validateAgainstGuidelines(
  text: string,
  domain: Domain
): { status: KillStatus; violations: GuidelineViolation[] } {
  if (!text || text.trim().length === 0) {
    return { status: "PASS", violations: [] };
  }

  const violations: GuidelineViolation[] = [];
  const seenRuleIds = new Set<string>();

  for (const rule of VALIDATION_RULES) {
    // Domain filtering: 'both' rules always run;
    // otherwise only run if rule.domain matches requested domain, or domain is 'both'
    const domainMatch =
      rule.domain === "both" ||
      domain === "both" ||
      rule.domain === domain;

    if (!domainMatch) continue;

    const violation = evaluateRule(rule, text);
    if (violation && !seenRuleIds.has(violation.ruleId)) {
      seenRuleIds.add(violation.ruleId);
      violations.push(violation);
    }
  }

  // Determine overall status
  let status: KillStatus = "PASS";
  if (violations.length > 0) {
    const hasCritical = violations.some(v => v.severity === "critical");
    status = hasCritical ? "FAIL" : "FLAG";
  }

  return { status, violations };
}
