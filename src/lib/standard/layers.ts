/* ═══════════════════════════════════════════════════════════════
 * EAL STANDARD — THE 8-LAYER DECEPTION TAXONOMY (canonical)
 * Single source of truth for layer classification + defense protocols.
 * Mirrors src/components/six-layers/data.ts but lightweight & server-safe
 * (no case-study payload). Governed by HI CLAUDE/00_THE_SCIENTIFIC_STANDARD.md §5.
 * ═══════════════════════════════════════════════════════════════ */

export interface DeceptionLayer {
  number: number;
  name: string;
  nameAr: string;
  definition: string;
  defense: string;
  defenseAr: string;
}

export const DECEPTION_LAYERS: DeceptionLayer[] = [
  {
    number: 1,
    name: 'THE ABSOLUTE FABRICATION',
    nameAr: 'الكذب المطلق',
    definition:
      'No source, no reality — invented from nothing by a known liar, hostile state, or AI. Preys on confirmation bias.',
    defense: 'SIFT — Stop, Investigate the source, Find better coverage, Trace to the original.',
    defenseAr: 'توقف، حقق في المصدر، ابحث عن تغطية أفضل، تتبّع الأصل',
  },
  {
    number: 2,
    name: 'THE BIASED LENS',
    nameAr: 'العدسة المنحازة',
    definition:
      'The event is real and verifiable, but information is heavily filtered: selective omission, cherry-picking, loaded language. Passes fact-checks.',
    defense: 'Ask: "What are they NOT showing?" Seek the omitted half of the story.',
    defenseAr: 'اسأل: "ما الذي لا يُظهرونه؟" وابحث عن النصف المحذوف',
  },
  {
    number: 3,
    name: 'DECONTEXTUALIZATION',
    nameAr: 'اقتطاع السياق',
    definition:
      'Credible source, accurate quote, real data — surgically removed from context so the meaning is inverted.',
    defense: 'Always read the FULL source. Restore the sentence before and after the quote.',
    defenseAr: 'اقرأ المصدر الكامل دائماً، واسترجع ما قبل الاقتباس وما بعده',
  },
  {
    number: 4,
    name: 'WEAPONIZED TIMING',
    nameAr: 'التوقيت المسلّح',
    definition:
      'Elite source, accurate info, context intact — but released at a calculated moment for maximum destruction.',
    defense: 'Ask: "Why NOW? Who benefits from this timing?"',
    defenseAr: 'اسأل: "لماذا الآن؟ ومن المستفيد من هذا التوقيت؟"',
  },
  {
    number: 5,
    name: 'THE EVIL APPLICATION',
    nameAr: 'التطبيق الشرير',
    definition:
      'Source, information, and context are all perfect — true knowledge applied to an oppressive or destructive end.',
    defense: 'Demand ethical oversight. Separate the truth from its weaponized use.',
    defenseAr: 'طالِب برقابة أخلاقية، وافصل الحقيقة عن استخدامها المُسلَّح',
  },
  {
    number: 6,
    name: 'THE MATRIX OF MANIPULATION',
    nameAr: 'مصفوفة التلاعب',
    definition:
      'Aggregates all layers. Uses real doctors, real orgs, real podcasts. Attacks vulnerability — trauma, parenthood, despair, spiritual hunger. Showing facts pushes victims deeper.',
    defense: 'Build diverse info networks; ask HOW, not WHAT. Break isolation before presenting facts.',
    defenseAr: 'ابنِ شبكات معلومات متنوعة، واسأل "كيف" لا "ماذا"، واكسر العزلة أولاً',
  },
  {
    number: 7,
    name: 'THE MEGA-MACHINE (THE ARCHITECTS)',
    nameAr: 'المهندسون (الخطة صفر حرية)',
    definition:
      'The invisible designers of the Matrix who own society’s algorithmic rails and treat humans as livestock in a predictive-behavior market.',
    defense: 'Total systemic disconnect — refuse the rails. Own your information diet.',
    defenseAr: 'انفصال نظامي كامل: ارفض المسارات، وتحكّم في غذائك المعلوماتي',
  },
  {
    number: 8,
    name: 'THE UNKNOWN',
    nameAr: 'المجهول',
    definition:
      'The genuinely unexplained — AI black boxes, mass psychogenic anomalies, cosmic/epistemic horror. No clean answer exists.',
    defense:
      'No defense protocol by definition — respond with calibrated uncertainty; never manufacture false closure.',
    defenseAr: 'لا دفاع نهائي — أجب بيقين معاير، ولا تصطنع حسماً زائفاً',
  },
];

export function getLayer(n: number | null | undefined): DeceptionLayer | null {
  if (!n) return null;
  return DECEPTION_LAYERS.find((l) => l.number === n) ?? null;
}

/** Compact block for embedding inside LLM system/user prompts. */
export const CANONICAL_LAYERS_PROMPT_BLOCK = DECEPTION_LAYERS.map(
  (l) => `Layer ${l.number}: ${l.name} (${l.nameAr}) — ${l.definition} DEFENSE: ${l.defense}`,
).join('\n');
