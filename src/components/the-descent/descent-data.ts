/* ═══════════════════════════════════════════════════════════════
 * descent-data.ts — THE SINGLE SOURCE OF TRUTH for «THE DESCENT»
 * Route: /the-descent
 *
 * Every copy beat (EN + AR), every stat with {source, tier}, every
 * real Egyptian case, the 8 layer↔defense↔cognition map, the M13
 * verification-tool list, the per-domain blast-radius stat sets, and
 * the DESCENT_LAYER_COLORS palette (extends six-layers keys with 7,8).
 *
 * THE ONE LAW: no claim reaches the user without a real, resolvable
 * source. Numbers and sources below are reproduced VERBATIM from
 * RESEARCH_VAULT/total_convergence_findings.md, study_the_problem.md
 * §1, and six-layers/data.ts counters. Nothing is paraphrased.
 *
 * Section builders import from here and NEVER hardcode a stat.
 * ═══════════════════════════════════════════════════════════════ */

/* ───────────────────────────────────────────────────────────────
 * CORE TYPES
 * ─────────────────────────────────────────────────────────────── */

/** Source-quality tier per the EAL governing standard whitelist. */
export type Tier = 'S' | 'A' | 'B' | 'C';

/** A paired bilingual string. Egyptian-aware Arabic where it matters. */
export interface Bilingual {
  en: string;
  ar: string;
}

/**
 * A sourced statistic. The `<Sourced>` primitive REQUIRES non-empty
 * `source` + `tier`. `contested` renders violet [CONTESTED]; an
 * empty/absent source renders red [UNVERIFIED]; `corpusCount` marks a
 * corpus-only tally that must show a [corpus count] label, never a
 * primary tier assertion.
 */
export interface Stat {
  /** Stable key for React + cross-referencing. */
  id: string;
  /** English label / phrasing for the figure. */
  en: string;
  /** Arabic label / phrasing for the figure. */
  ar: string;
  /** The display value EXACTLY as cited (e.g. "14.5%", "8,045", "1,650→3,175"). */
  value: string;
  /** Source-quality tier. Empty string ⇒ FailLoud / [UNVERIFIED]. */
  tier: Tier;
  /** Resolvable, human-readable source string. Empty ⇒ [UNVERIFIED]. */
  source: string;
  /** Which deception layers (1–8) this stat illuminates. */
  layers: number[];
  /** When true: figure is disputed across outlets ⇒ violet [CONTESTED]. */
  contested?: boolean;
  /** When true: corpus-only count ⇒ [corpus count] label, no primary tier claim. */
  corpusCount?: boolean;
}

/**
 * A real, grounded Egyptian case. One-liner EN + AR pulled VERBATIM
 * from total_convergence_findings.md, with the layers it spans and a
 * single canonical source + tier.
 */
export interface DescentCase {
  id: string;
  /** Short title. */
  title: Bilingual;
  /** The one-liner beat — verbatim from the findings. */
  line: Bilingual;
  /** Deception layers (1–8) the case converges on. */
  layers: number[];
  /** Canonical source string. */
  source: string;
  /** Source tier. */
  tier: Tier;
  /** Held as calibrated uncertainty (Layer-8): neither asserted nor denied. */
  unverified?: boolean;
  /** Disputed figure inside the case (e.g. HoggPool 6B vs ≥19M). */
  contested?: boolean;
}

/**
 * One rung of the mirrored shaft: the deception layer, the defense
 * chip shown on the climb, and the named cognition technique(s) that
 * counter that exact bias 1:1 (M2–M9 fall ↔ M14 climb).
 */
export interface LayerDefenseMap {
  /** Layer number 1–8. */
  n: number;
  /** Layer name (the deception). */
  layer: Bilingual;
  /** The descent "you" beat for this rung (M2–M9). */
  youBeat: Bilingual;
  /** The defense chip technique label (short). */
  defense: Bilingual;
  /** The full cognition technique name + scholarly anchor (M14). */
  cognition: Bilingual;
  /** Scholarly citation(s) backing the technique. */
  cognitionSource: string;
}

/**
 * A verification tool (M13). Name + how strong it is + the honest
 * caveat that keeps it from over-claiming + the layer(s) it guards.
 */
export interface VerificationTool {
  id: string;
  name: Bilingual;
  /** What makes it strong. */
  strength: Bilingual;
  /** The honest limit — never hidden. */
  caveat: Bilingual;
  /** Layers (1–8) this tool guards/anchors. */
  layerGuarded: number[];
  /** True ⇒ this card deep-links a LIVE API (≥2-live-API rule). */
  live?: boolean;
}

/** A blast-radius domain (M10): a personal axis of damage + its stats. */
export interface BlastDomain {
  id: string;
  domain: Bilingual;
  /** Accent color key into DESCENT_LAYER_COLORS-adjacent palette. */
  accent: string;
  /** The sourced stats that quantify the damage in this domain. */
  stats: Stat[];
}

/* ───────────────────────────────────────────────────────────────
 * PALETTE — DESCENT_LAYER_COLORS
 * Does NOT modify six-layers/data.ts. Mirrors the master ramp and
 * ADDS keys 7 & 8 (the six-layers store only goes to 6 + defense).
 * Master ramp: #0B0E0C → #1A0F06 → #2A0608 → #050304 → [FLIP] →
 *              #0A1620 → #0E1C18 → #141008
 * ─────────────────────────────────────────────────────────────── */

export interface DescentColor {
  accent: string;
  accentRGB: string;
  bg: string;
  glassTint: string;
}

export const DESCENT_LAYER_COLORS: Record<
  'zone' | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 'flip' | 'climb' | 'gold',
  DescentColor
> & {
  ramp: string[];
} = {
  /** Opening warm-bone zone (M0/M1). */
  zone: { accent: '#E8E2D6', accentRGB: '232, 226, 214', bg: '#0B0E0C', glassTint: 'rgba(232,226,214,0.04)' },
  1: { accent: '#e63939', accentRGB: '230, 57, 57', bg: '#1a0c0c', glassTint: 'rgba(255,50,50,0.05)' },
  2: { accent: '#e6b400', accentRGB: '230, 180, 0', bg: '#171410', glassTint: 'rgba(255,200,0,0.05)' },
  3: { accent: '#8c3ce6', accentRGB: '140, 60, 230', bg: '#0e0714', glassTint: 'rgba(120,50,255,0.05)' },
  4: { accent: '#19aaff', accentRGB: '25, 170, 255', bg: '#050a11', glassTint: 'rgba(0,150,255,0.05)' },
  5: { accent: '#ff2e3e', accentRGB: '255, 46, 62', bg: '#2A0608', glassTint: 'rgba(255,46,62,0.06)' }, // arterial — THE KILL
  6: { accent: '#ff00ff', accentRGB: '255, 0, 255', bg: '#120410', glassTint: 'rgba(255,0,255,0.05)' },
  7: { accent: '#ff6a3d', accentRGB: '255, 106, 61', bg: '#0a0604', glassTint: 'rgba(255,106,61,0.05)' }, // architects — ember
  8: { accent: '#6b7b8c', accentRGB: '107, 123, 140', bg: '#050304', glassTint: 'rgba(107,123,140,0.06)' }, // the unknown — cold slate
  /** The floor / flip pivot. */
  flip: { accent: '#14b8a6', accentRGB: '20, 184, 166', bg: '#050304', glassTint: 'rgba(20,184,166,0.05)' },
  /** Cold-dawn climb zone (M13/M14). */
  climb: { accent: '#10B981', accentRGB: '16, 185, 129', bg: '#0A1620', glassTint: 'rgba(16,185,129,0.05)' },
  /** Gold resolution (M15/M16). */
  gold: { accent: '#f0c030', accentRGB: '240, 192, 48', bg: '#141008', glassTint: 'rgba(240,192,48,0.06)' },
  ramp: ['#0B0E0C', '#1A0F06', '#2A0608', '#050304', '#0A1620', '#0E1C18', '#141008'],
};

/* ───────────────────────────────────────────────────────────────
 * SECTION COPY BEATS (M0 → M16) — EN + AR, verbatim from blueprint
 * ─────────────────────────────────────────────────────────────── */

export interface SectionCopy {
  id: string;
  /** The route anchor id (e.g. "descent-thread"). */
  anchor: string;
  /** Eyebrow / kicker. */
  kicker?: Bilingual;
  /** Primary headline beat. */
  headline: Bilingual;
  /** Supporting line(s). */
  sub?: Bilingual;
}

export const SECTION_COPY: Record<
  | 'thread' | 'spread' | 'problem' | 'radius' | 'floor' | 'flip'
  | 'standard' | 'tools' | 'immunity' | 'cognition' | 'door',
  SectionCopy
> = {
  // 2 · thread — the forwarded-message cold open
  thread: {
    id: 'thread',
    anchor: 'thread',
    kicker: { en: 'Forwarded many times', ar: 'مُعاد توجيهه مرات كتير' },
    headline: {
      en: 'The message reaches you — and anyone could believe it.',
      ar: 'الرسالة وصلت — وأي حد ممكن يصدّقها.',
    },
    sub: {
      en: 'Insulin is a lie. Medicine is beside the point — food is the cure.',
      ar: 'الأنسولين كذبة. الدوا ثانوي — والأكل هو العلاج.',
    },
  },
  // 3 · spread — every feed, every platform
  spread: {
    id: 'spread',
    anchor: 'spread',
    kicker: { en: 'Across every platform', ar: 'على كل منصّة' },
    headline: {
      en: 'The lie slipped into every feed, on every platform.',
      ar: 'الكذبة خشّت كل فيد، على كل منصّة.',
    },
    sub: {
      en: 'It isn’t stupidity — it’s design.',
      ar: 'مش غباء — ده تصميم.',
    },
  },
  // 4 · problem — the three things nobody taught you
  problem: {
    id: 'problem',
    anchor: 'problem',
    headline: {
      en: 'Nobody taught you three things.',
      ar: 'محدش علّمك ٣ حاجات.',
    },
    sub: {
      en: 'How to reach a source you trust · how to confirm it’s real · how to put it to work in your life. This isn’t just information — and it has already killed.',
      ar: 'إزاي توصل لمصدر تثق فيه · إزاي تتأكد إنه حقيقي · إزاي تطبّقه في حياتك. دي مش مجرد معلومات… وقتلت بالفعل.',
    },
  },
  // 13 · radius — the blast radius
  radius: {
    id: 'radius',
    anchor: 'radius',
    kicker: { en: 'The blast radius', ar: 'نطاق الانفجار' },
    headline: {
      en: 'It didn’t stop at you.',
      ar: 'ماوقفش عندك.',
    },
    sub: {
      en: 'It ran through your body, your faith, your wallet, your vote — and the country.',
      ar: 'سرى في جسمك، وإيمانك، وجيبك، وصوتك — والوطن.',
    },
  },
  // 14 · floor — rock bottom
  floor: {
    id: 'floor',
    anchor: 'floor',
    headline: {
      en: 'This is the floor. People have died — and the lie is still being forwarded.',
      ar: 'دي القاع. ناس ماتت — والكذبة لسه بتتبعت.',
    },
  },
  // 15 · flip — you can climb, with method
  flip: {
    id: 'flip',
    anchor: 'flip',
    headline: {
      en: 'You can climb out. Not on willpower — on method.',
      ar: 'تقدر تطلع. مش بالنية — بالمنهج.',
    },
    sub: {
      en: 'Everything below was the fall. Everything above is how you rise.',
      ar: 'كل اللي تحت كان النزول. وكل اللي فوق هو الطلوع.',
    },
  },
  // 16 · standard — THE ONE LAW
  standard: {
    id: 'standard',
    anchor: 'standard',
    kicker: { en: 'The One Law', ar: 'القانون الواحد' },
    headline: {
      en: 'No claim passes without a real source.',
      ar: 'ولا معلومة بتعدّي من غير مصدر حقيقي.',
    },
    sub: {
      en: 'A claim that carries its source passes — stamped «verified». A bare claim is stamped «unverified».',
      ar: 'الادعاء اللي معاه مصدره بيعدّي — مختوم «موثّق». والادعاء العاري بيتختم «غير مُتحقَّق».',
    },
  },
  // 17 · tools — the instruments that let you check
  tools: {
    id: 'tools',
    anchor: 'tools',
    kicker: { en: 'Movement One — the instruments', ar: 'الحركة الأولى — الأدوات' },
    headline: {
      en: 'The tools that let you make sure.',
      ar: 'الأدوات اللي بتخليك تتأكد.',
    },
    sub: {
      en: 'They don’t ask you to believe — they let you check for yourself.',
      ar: 'مابتطلبش منك تصدّق — بتخليك تتأكد بنفسك.',
    },
  },
  // 18 · immunity — cognitive immunity
  immunity: {
    id: 'immunity',
    anchor: 'immunity',
    kicker: { en: 'Cognitive immunity', ar: 'المناعة المعرفية' },
    headline: {
      en: 'We don’t delete the lie — we vaccinate you against it.',
      ar: 'مابنمسحش الكذبة — بنطعّمك ضدّها.',
    },
    sub: {
      en: 'A dose of weakened deception, so the real thing bounces off.',
      ar: 'جرعة من الكذب المُضعَّف، علشان الحقيقي يرتدّ.',
    },
  },
  // 19 · cognition — the deeper part
  cognition: {
    id: 'cognition',
    anchor: 'cognition',
    kicker: { en: 'Movement Two — the deeper part', ar: 'الحركة الثانية — الجزء الأعمق' },
    headline: {
      en: 'The tools test the claim. Thinking changes the person.',
      ar: 'الأدوات بتفحص الخبر. التفكير بيغيّر الإنسان.',
    },
  },
  // 20 · door — the marketing finale
  door: {
    id: 'door',
    anchor: 'door',
    headline: {
      en: 'We don’t take the bad content down — we make you immune to it.',
      ar: 'إحنا مابنشيلش المحتوى الوحش — بنحصّنك ضدّه.',
    },
    sub: {
      en: 'You walk out immune to the next lie. Enter the Library.',
      ar: 'بتخرج محصّن ضدّ الكذبة الجاية. ادخل المكتبة.',
    },
  },
};

/* ───────────────────────────────────────────────────────────────
 * THE THREAD SOURCE (M0) — the Al-Awadi "insulin is a lie" thesis
 * ─────────────────────────────────────────────────────────────── */

export const THREAD_SOURCE = {
  source:
    'Al-Masry Al-Youm #4249980 (verbatim video); Egyptian Medical Syndicate strike-off 17 Feb 2026',
  tier: 'A' as Tier,
  whatsappGreen: '#25D366',
  timestamp: { en: 'Forwarded many times', ar: 'مُعاد توجيهه مرات كتير' },
};

/* ───────────────────────────────────────────────────────────────
 * HEADLINE STATS — used across M1, M6, M10 etc.
 * Reproduced EXACTLY. Tier S/A/B per findings.
 * ─────────────────────────────────────────────────────────────── */

export const STATS: Record<string, Stat> = {
  misinfo2025: {
    id: 'misinfo2025',
    en: 'of everything Egyptians read in 2025 was false',
    ar: 'من كل ما قرأه المصريون في ٢٠٢٥ كان كاذبًا',
    value: '14.5%',
    tier: 'A',
    source: 'Egyptian Cabinet Media Centre 2025 (study_the_problem §1.1)',
    layers: [1],
  },
  misinfo2024: {
    id: 'misinfo2024',
    en: 'the prior-year rate of false information it rose from',
    ar: 'نسبة العام السابق التي ارتفعت عنها',
    value: '13.8%',
    tier: 'A',
    source: 'Egyptian Cabinet Media Centre (study_the_problem §1.1)',
    layers: [1],
  },
  vosoughi: {
    id: 'vosoughi',
    en: 'false news spreads faster than the truth',
    ar: 'الأخبار الكاذبة تنتشر أسرع من الحقيقة بـ',
    value: '6×',
    tier: 'A',
    source: 'Vosoughi, Roy & Aral, Science 2018',
    layers: [1, 6],
  },
  curcuminPackages: {
    id: 'curcuminPackages',
    en: 'unregistered drug and cosmetic packages seized from one self-styled “healer”',
    ar: 'عبوة دواء ومستحضر غير مسجّلة ضُبطت بحوزة «مُعالِج» واحد',
    value: '8,045',
    tier: 'B',
    source: 'Al-Masry Al-Youm #2530265; Youm7 (2022-02-20)',
    layers: [1],
  },
  corpusFrauds: {
    id: 'corpusFrauds',
    en: 'documented cases of scientific fraud in the corpus',
    ar: 'حالة تزوير علمي موثَّقة في الأرشيف',
    value: '183+',
    tier: 'A',
    source: 'EAL six-layers corpus (data.ts counter)',
    layers: [1],
    corpusCount: true,
  },
  corpusRetractions: {
    id: 'corpusRetractions',
    en: 'retracted scientific papers in the corpus',
    ar: 'ورقة بحثية مسحوبة من النشر في الأرشيف',
    value: '10,000+',
    tier: 'A',
    source: 'EAL six-layers corpus (data.ts counter)',
    layers: [1],
    corpusCount: true,
  },
  selfMedicate: {
    id: 'selfMedicate',
    en: 'of Egyptians take antibiotics on their own, without a prescription',
    ar: 'من المصريين يتناولون المضادات الحيوية من تلقاء أنفسهم بلا وصفة طبية',
    value: '53.9%',
    tier: 'S',
    source: 'Mostafa et al. 2021',
    layers: [5],
  },
  pharmacySource: {
    id: 'pharmacySource',
    en: 'of those antibiotics came straight from the pharmacy counter',
    ar: 'من تلك المضادات صُرفت مباشرةً من الصيدلية',
    value: '91.7%',
    tier: 'S',
    source: 'Elden et al. 2020',
    layers: [5],
  },
  unictamEvents: {
    id: 'unictamEvents',
    en: 'adverse-event reports across 12 governorates from a single counterfeit medicine',
    ar: 'بلاغ أعراض جانبية في ١٢ محافظة بسبب دواء واحد مغشوش',
    value: '48',
    tier: 'A',
    source: 'EDA Circular No. 9/2022; Uppsala Reports / WHO PIDM',
    layers: [1, 3, 5, 7],
  },
  ocdJinn: {
    id: 'ocdJinn',
    en: 'of Egyptian OCD patients attribute their symptoms to the jinn rather than to illness',
    ar: 'من مرضى الوسواس القهري في مصر يَعزون أعراضهم إلى الجن لا إلى المرض',
    value: '78.4%',
    tier: 'S',
    source: 'PMC 2019',
    layers: [3, 6],
  },
  nonDoctorFirst: {
    id: 'nonDoctorFirst',
    en: 'turn first to a non-physician — a healer or a sheikh — before seeking medical care',
    ar: 'يلجؤون أولًا إلى غير الطبيب — مُعالِج أو شيخ — قبل طلب العلاج الطبي',
    value: '67%',
    tier: 'A',
    source: 'Okasha (study_the_problem §1)',
    layers: [6],
  },
  psychiatrists: {
    id: 'psychiatrists',
    en: 'psychiatrists for every 100,000 people in Egypt',
    ar: 'طبيب نفسي واحد لكل ١٠٠٬٠٠٠ نسمة في مصر',
    value: '1.44',
    tier: 'A',
    source: 'WHO-AIMS',
    layers: [5, 6],
  },
  internetUsers: {
    id: 'internetUsers',
    en: 'Egyptian internet users — the rails the lie travels on',
    ar: 'مستخدم إنترنت في مصر — القضبان التي تسير عليها الكذبة',
    value: '82M',
    tier: 'A',
    source: 'Freedom House',
    layers: [7],
  },
  hoggPoolOfficial: {
    id: 'hoggPoolOfficial',
    en: 'official losses from one investment-app fraud ring (≥19M EGP / ~$615k)',
    ar: 'خسائر رسمية من شبكة احتيال استثماري واحدة (≥١٩ مليون جنيه / ~٦١٥ ألف دولار)',
    value: '≥19M EGP',
    tier: 'A',
    source: 'CBS News; Al Jazeera; Library of Congress GLM',
    layers: [1, 5, 6, 7],
  },
  hoggPoolContested: {
    id: 'hoggPoolContested',
    en: "the victims' lawyer's disputed claim — NOT adopted here",
    ar: 'ادّعاء محامي الضحايا المتنازَع عليه — لم نأخذ به',
    value: '6B EGP / ~800,000 victims',
    tier: 'C',
    source: "Victims' lawyer allegation (via EgyptToday) — disputed",
    layers: [7],
    contested: true,
  },
  hoggPoolSims: {
    id: 'hoggPoolSims',
    en: 'SIM cards seized; 29 arrested (13 foreigners), 95 phones, ~$194,000',
    ar: 'شريحة هاتف مضبوطة؛ و٢٩ موقوفًا (منهم ١٣ أجنبيًا)، و٩٥ هاتفًا، و~١٩٤٬٠٠٠ دولار',
    value: '3,367',
    tier: 'A',
    source: 'Egyptian Interior Ministry (via CBS News, Al Jazeera) 4 Mar 2023',
    layers: [7],
  },
  inflation: {
    id: 'inflation',
    en: 'peak inflation, July 2023',
    ar: 'ذروة معدّل التضخم، يوليو ٢٠٢٣',
    value: '36.5%',
    tier: 'A',
    source: 'The National (2023-12-27); §5 findings',
    layers: [4],
  },
  gold: {
    id: 'gold',
    en: 'price of 21-carat gold per gram across 2023 (the flight into gold)',
    ar: 'سعر جرام الذهب عيار ٢١ خلال ٢٠٢٣ (الهروب نحو الذهب)',
    value: '1,650→3,175 EGP',
    tier: 'B',
    source: '§5 findings (EgyptToday / Dostor)',
    layers: [4],
  },
  egpFloat: {
    id: 'egpFloat',
    en: 'fall in the pound at the March 2024 float',
    ar: 'هبوط الجنيه عند تعويم مارس ٢٠٢٤',
    value: '~38%',
    tier: 'A',
    source: 'The National (2023-12-27); §5 findings',
    layers: [4],
  },
  stateProject: {
    id: 'stateProject',
    en: 'of misinformation about national projects was political in nature',
    ar: 'من التضليل حول المشروعات القومية كان ذا طابع سياسي',
    value: '45.7%',
    tier: 'A',
    source: 'Egyptian Cabinet Media Centre',
    layers: [4],
  },
};

/* ───────────────────────────────────────────────────────────────
 * THE EIGHT-LAYER SHAFT (M2–M9) — one real case per rung
 * Lines are VERBATIM "you" beats; cases verbatim from findings.
 * ─────────────────────────────────────────────────────────────── */

export const DESCENT_CASES: DescentCase[] = [
  // layer-1 · L1 · Absolute Fabrication — a fabricated "cure" (name-free)
  {
    id: 'curcumin',
    title: { en: 'A cure conjured from nothing', ar: 'علاج من العدم' },
    line: {
      en: 'You believe the cure is real because no one ever shows you it isn’t — a pharmacist, not a doctor, sold a spice as a cure-all, thousands of unregistered packages went out, and a man with diabetes died.',
      ar: 'بتصدّق إن العلاج موجود علشان محدّش وراك إنه مش موجود — صيدلي، مش دكتور، باع توابل على إنها بتشفي كل حاجة، اتصرفت آلاف العبوات من غير تسجيل، ومريض سكر راح ضحيتها.',
    },
    layers: [1],
    source: 'Al-Masry Al-Youm #2530265; Youm7',
    tier: 'B',
  },
  // layer-2 · L2 · Biased Lens — a "clean-eating" system (name-free)
  {
    id: 'tayyibat-lens',
    title: { en: 'Only the testimonials', ar: 'قصص النجاح بس' },
    line: {
      en: 'You only ever see the testimonials, never the deaths — a so-called “clean-eating” system that forbids fruit and fish yet permits sugar and chocolate spread.',
      ar: 'بتشوف قصص النجاح بس، وعمرك ما بتشوف اللي ماتوا — نظام «أكل صحي» بيحرّم الفاكهة والسمك، ويسمح بالسكر والشوكولاتة.',
    },
    layers: [2],
    source: 'Egyptian Medical Syndicate; Al Jazeera',
    tier: 'A',
  },
  // layer-3 · L3 · Decontextualization — a scripture word turned against the body
  {
    id: 'tayyibat-context',
    title: { en: 'A word turned against the body', ar: 'كلمة وُجِّهت ضد الجسد' },
    line: {
      en: 'A word from scripture is turned against your own body — a moral vocabulary of the wholesome and the foul, recoded into a diet that forbids food.',
      ar: 'كلمة من النص الديني تُوجَّه ضد جسدك — مفردات أخلاقية عن الطيّب والخبيث، يُعاد توظيفها في حِمية تُحرّم الأكل.',
    },
    layers: [3],
    source: 'Egyptian Medical Syndicate',
    tier: 'A',
  },
  // M5 · L4 · Weaponized Timing — "I was killed" video + EGP-float rumor day
  {
    id: 'martyr-video',
    title: { en: '“If I Die, I Was Killed”', ar: '«لو مُتّ يبقى اتقتلت»' },
    line: {
      en: 'The “if I die, I was killed — it was never suicide” video surfaces the moment doubt starts to rise, timed to recast a natural death as martyrdom.',
      ar: 'فيديو «لو مُتّ يبقى اتقتلت… مش انتحار» بيظهر بالظبط لما الشك يبدأ يطفو، مظبوط توقيته علشان يحوّل موتًا طبيعيًا إلى استشهاد.',
    },
    layers: [4],
    source: 'Al-Masry Al-Youm #4249980',
    tier: 'A',
  },
  // M6 · L5 · Evil Application — THE KILL
  {
    id: 'the-kill',
    title: { en: 'The Kill', ar: 'القتل' },
    line: {
      en: 'Real knowledge, turned into a weapon against your own veins — a man with diabetes stopped his insulin and slipped into a fatal coma within a week; a woman with lupus came off her steroids and died in intensive care.',
      ar: 'معرفة حقيقية، اتحوّلت لسلاح ضد عروقك أنت — مريض سكر وقف الأنسولين فدخل في غيبوبة وراح خلال أسبوع؛ ومريضة ذئبة حُمراء وقّفت الكورتيزون فماتت في العناية المركزة.',
    },
    layers: [5],
    source: 'Al Majalla (named deaths); Masrawy — Qasr El-Aini',
    tier: 'A',
  },
  // layer-6 · L6 · The Matrix — a false "healer" (name-free)
  {
    id: 'dajjal-marg',
    title: { en: 'The false healer', ar: 'الدجّال' },
    line: {
      en: 'When a relative tries to warn you, you defend the deceiver instead — a man of 30 was beaten to death under the claim of “driving the jinn out,” and his own family took part.',
      ar: 'لما حد من أهلك يحاول يحذّرك، بتلاقي نفسك بتدافع عن النصّاب — شاب في الثلاثين اتضرب لحد الموت تحت دعوى «إخراج الجن»، وأهله نفسهم شاركوا.',
    },
    layers: [6],
    source: 'Al-Masry Al-Youm #2775504; RT Arabic #1420033',
    tier: 'B',
    unverified: true, // court verdict UNVERIFIED — coverage stops at arrest/referral
  },
  // layer-7 · L7 · The Architects — an investment-app fraud ring (name-free)
  {
    id: 'hoggpool',
    title: { en: 'Inside a machine', ar: 'جوّه ماكينة' },
    line: {
      en: 'You were never one man’s target — you’re inside a machine: 9,000+ e-wallets, 3,367 SIM cards, 29 arrests, and the dollar crisis itself turned into a weapon.',
      ar: 'إنت ما كنتش هدف راجل واحد — إنت جوّه ماكينة كاملة: أكتر من ٩٠٠٠ محفظة إلكترونية، و٣٬٣٦٧ شريحة، و٢٩ موقوفًا، وأزمة الدولار نفسها اتحوّلت لسلاح.',
    },
    layers: [7],
    source: 'CBS News; Al Jazeera; Library of Congress GLM',
    tier: 'A',
    contested: true, // the 6B EGP / 800,000-victim figure is CONTESTED, not adopted
  },
  // M9 · L8 · The Unknown — Al-Awadi autopsy
  {
    id: 'autopsy',
    title: { en: 'The Unknown', ar: 'المجهول' },
    line: {
      en: 'Some of it, in all honesty, we simply do not know — the official ruling is natural cardiac death, a second autopsy was demanded and has never been published. We hold it as calibrated uncertainty.',
      ar: 'وفيه جزء، بكل أمانة، إحنا مش عارفينه — التقرير الرسمي بيقول وفاة طبيعية بجلطة في القلب، واتطلب تشريح تاني لسه ما اتنشرش. بنتعامل معاه كشكٍّ مضبوط مُعايَر، لا بنأكده ولا بننفيه.',
    },
    layers: [8],
    source: 'Ahram; Youm7; New Lines',
    tier: 'A',
    unverified: true, // the "assassination" — neither asserted nor denied
  },
];

/* ───────────────────────────────────────────────────────────────
 * LAYER ↔ DEFENSE ↔ COGNITION MAP (8 rungs, 1:1)
 * The descent drops you down 1→8; the climb (M14) ascends 8→1, each
 * technique Flip-overwriting the deception that dropped you.
 * Techniques + scholarly anchors per blueprint M14.
 * ─────────────────────────────────────────────────────────────── */

export const LAYER_DEFENSE_MAP: LayerDefenseMap[] = [
  {
    n: 1,
    layer: { en: 'Absolute Fabrication', ar: 'الكذب المُطلَق' },
    youBeat: {
      en: 'You believe the cure is real because no one ever shows you it isn’t.',
      ar: 'بتصدّق إن العلاج موجود علشان محدّش وراك إنه مش موجود.',
    },
    defense: { en: 'Lateral Reading + SIFT', ar: 'القراءة الجانبية + SIFT' },
    cognition: {
      en: 'Lateral Reading + SIFT: leave the page and find out who is really speaking before you weigh a word they say.',
      ar: 'القراءة الجانبية ومنهج SIFT: اخرج من الصفحة واعرف مَن يتكلّم فعلًا قبل أن تزن كلمة مما يقول.',
    },
    cognitionSource: 'Caulfield (SIFT); Wineburg & McGrew 2017',
  },
  {
    n: 2,
    layer: { en: 'Biased Lens', ar: 'العدسة المنحازة' },
    youBeat: {
      en: 'You only ever see the testimonials, never the deaths.',
      ar: 'بتشوف قصص النجاح بس، وعمرك ما بتشوف اللي ماتوا.',
    },
    defense: { en: 'Omission Audit + Steelmanning', ar: 'تدقيق المحذوف + تقوية حُجّة الخصم' },
    cognition: {
      en: 'Omission Audit + Steelmanning: ask what was deliberately left out, then state the opposing case at its very strongest.',
      ar: 'تدقيق المحذوف وتقوية حُجّة الخصم: اسأل عمّا حُذف عمدًا، ثم اعرض الرأي المقابل في أقوى صوره لا أضعفها.',
    },
    cognitionSource: 'Standard critical-appraisal practice',
  },
  {
    n: 3,
    layer: { en: 'Decontextualization', ar: 'اقتطاع السياق' },
    youBeat: {
      en: 'A word from the Qur’an is turned against your own body.',
      ar: 'كلمة من القرآن تُوجَّه ضد جسدك أنت.',
    },
    defense: { en: 'Upstream Reading + Toulmin Warrant', ar: 'العودة إلى المنبع + ضمانة تولمِن' },
    cognition: {
      en: 'Upstream Reading + Toulmin Warrant: trace the claim back to its source, then test the hidden assumption that links the evidence to the conclusion.',
      ar: 'العودة إلى المنبع وضمانة تولمِن: تتبّع الادعاء حتى مصدره الأصلي، ثم اختبر الافتراض الخفي الذي يربط الدليل بالنتيجة.',
    },
    cognitionSource: 'Toulmin, The Uses of Argument',
  },
  {
    n: 4,
    layer: { en: 'Weaponized Timing', ar: 'التوقيت المُسلَّح' },
    youBeat: {
      en: 'The “if I die, I was killed” video surfaces the very moment doubt begins to rise.',
      ar: 'فيديو «لو مُتّ يبقى اتقتلت» بيظهر بالظبط في اللحظة اللي الشك يبدأ يطفو فيها.',
    },
    defense: { en: 'Cui Bono + Temporal Forensics', ar: 'مَن المستفيد؟ + تحليل التوقيت' },
    cognition: {
      en: 'Cui Bono + Temporal Forensics: ask “Why now, and who benefits?” and line the release up against the event it answers.',
      ar: 'مَن المستفيد؟ وتحليل التوقيت: اسأل «ليه دلوقتي بالذات؟ ومين المستفيد؟» وقارن لحظة النشر بالحدث الذي جاءت ردًّا عليه.',
    },
    cognitionSource: 'Classic incentive analysis; OSINT temporal method',
  },
  {
    n: 5,
    layer: { en: 'Evil Application', ar: 'التطبيق الخبيث' },
    youBeat: {
      en: 'Real knowledge, turned into a weapon against your own veins.',
      ar: 'معرفة حقيقية، اتحوّلت لسلاح ضد عروقك أنت.',
    },
    defense: { en: 'Is–Ought Separation + Dual-Use Ethics', ar: 'الفصل بين الواقع والواجب + أخلاقيات الاستخدام المزدوج' },
    cognition: {
      en: 'Is–Ought Separation + Dual-Use Ethics: sound health advice never demands that you abandon a prescribed medication that keeps you alive.',
      ar: 'الفصل بين الواقع والواجب وأخلاقيات الاستخدام المزدوج: النصيحة الصحية الصادقة لا تطلب منك أبدًا أن تترك دواءً موصوفًا يُبقيك على قيد الحياة.',
    },
    cognitionSource: 'Hume (is–ought); dual-use ethics',
  },
  {
    n: 6,
    layer: { en: 'The Matrix', ar: 'مصفوفة التلاعب' },
    youBeat: {
      en: 'When a relative warns you, you defend the liar instead — the more facts they bring, the deeper you sink.',
      ar: 'لما حد من أهلك يحذّرك، بتدافع عن الكذّاب — وكل ما يجيبوا حقائق أكتر بتغوص أعمق.',
    },
    defense: { en: 'Inoculation / Prebunking + Bubble-Exit', ar: 'التلقيح المعرفي / الدحض الاستباقي + الخروج من الفقاعة' },
    cognition: {
      en: 'Inoculation / Prebunking + Bubble-Exit: learn the manipulation’s tell in advance, then reconnect with real expertise before you ever argue the facts.',
      ar: 'التلقيح المعرفي / الدحض الاستباقي والخروج من الفقاعة: تعرَّف على حيلة التلاعب مُقدَّمًا، ثم أعد الوصل بخبرة حقيقية قبل أن تدخل في جدال بالحقائق.',
    },
    cognitionSource: 'McGuire 1964; van der Linden & Roozenbeek',
  },
  {
    n: 7,
    layer: { en: 'The Architects', ar: 'المهندسون' },
    youBeat: {
      en: 'You were never one man’s target — you’re inside a machine.',
      ar: 'إنت ما كنتش هدف راجل واحد — إنت جوّه ماكينة كاملة.',
    },
    defense: { en: 'Systems & Incentive Mapping', ar: 'رسم المنظومة وخريطة الحوافز' },
    cognition: {
      en: 'Systems & Incentive Mapping: chart the rails, the wallets, and the incentives — go after the machine, not the man.',
      ar: 'رسم المنظومة وخريطة الحوافز: ارسم القضبان والمحافظ والحوافز كلها — لاحِق الماكينة، مش الراجل.',
    },
    cognitionSource: 'Zuboff 2019, The Age of Surveillance Capitalism',
  },
  {
    n: 8,
    layer: { en: 'The Unknown', ar: 'المجهول' },
    youBeat: {
      en: 'Some of it, in all honesty, we don’t know — and the liar exploits exactly that gap.',
      ar: 'وفيه جزء، بكل أمانة، إحنا مش عارفينه — والكذّاب بيستغل الفراغ ده بالظبط.',
    },
    defense: { en: 'Bayesian Calibration + Steelman the Null', ar: 'المعايرة البايزية + تقوية الفرض الصفري' },
    cognition: {
      en: 'Bayesian Calibration + Steelman the Null: hold a band of confidence, refuse to be forced into certainty, and give the null hypothesis its strongest possible case.',
      ar: 'المعايرة البايزية وتقوية الفرض الصفري: تمسّك بنطاق ثقة مفتوح، وارفض أن تُجبَر على يقين قاطع، وأعطِ احتمال «لم يحدث شيء» أقوى حُجّة ممكنة.',
    },
    cognitionSource: 'Tetlock 2015, Superforecasting',
  },
];

/* ───────────────────────────────────────────────────────────────
 * INOCULATION ARSENAL (M14) — named, cited prebunk games
 * ─────────────────────────────────────────────────────────────── */

export interface Inoculation {
  id: string;
  name: Bilingual;
  effect: Bilingual;
  source: string;
}

export const INOCULATIONS: Inoculation[] = [
  {
    id: 'jigsaw',
    name: { en: 'Jigsaw prebunks', ar: 'فيديوهات الدحض الاستباقي من Jigsaw' },
    effect: { en: 'recognition up to 2.1×', ar: 'تحسُّن في التمييز حتى ٢٫١ ضعف' },
    source: 'Science Advances 2022',
  },
  {
    id: 'badnews',
    name: { en: 'Bad News', ar: 'لعبة Bad News' },
    effect: { en: 'd ≈ 0.36–0.41', ar: 'حجم الأثر ≈ ٠٫٣٦–٠٫٤١' },
    source: 'Roozenbeek & van der Linden',
  },
  {
    id: 'harmony',
    name: { en: 'Harmony Square', ar: 'لعبة Harmony Square' },
    effect: { en: 'd = 0.54', ar: 'حجم الأثر = ٠٫٥٤' },
    source: 'Roozenbeek et al.',
  },
  {
    id: 'goviral',
    name: { en: 'GoViral!', ar: 'لعبة ‎!GoViral' },
    effect: { en: 'd ≈ 0.52–0.56', ar: 'حجم الأثر ≈ ٠٫٥٢–٠٫٥٦' },
    source: 'van der Linden et al.',
  },
  {
    id: 'mist20',
    name: { en: 'MIST-20 + Arabic headline bank', ar: 'مقياس MIST-20 + بنك عناوين عربية' },
    effect: { en: 'validated, N = 8,504', ar: 'مُتحقَّق من صدقه على عيّنة قدرها ٨٬٥٠٤' },
    source: 'Maertens et al. 2023',
  },
];

/** Honest caveat on inoculation, never hidden. */
export const INOCULATION_CAVEAT: Bilingual = {
  en: 'A caveat we keep in view: a single play may not protect you for long — the effect needs spaced booster rounds to last.',
  ar: 'تنبيه لا نُخفيه: اللعب مرة واحدة قد لا يحميك طويلًا — الأثر يحتاج جرعات تذكيرية متباعدة حتى يدوم.',
};

/* ───────────────────────────────────────────────────────────────
 * M13 VERIFICATION TOOLS (8) — name · strength · caveat · layerGuarded
 * Cards 1 & 3 are LIVE (≥2-live-API rule).
 * ─────────────────────────────────────────────────────────────── */

export const VERIFICATION_TOOLS: VerificationTool[] = [
  {
    id: 'evidence-aggregator',
    name: { en: 'Evidence Aggregator', ar: 'مُجمِّع الأدلة' },
    strength: {
      en: 'OpenAlex, Semantic Scholar, Crossref, Europe PMC and DOAJ — every answer grounded in retrieved sources.',
      ar: 'يجمع OpenAlex وSemantic Scholar وCrossref وEurope PMC وDOAJ، وكل إجابة مسنودة بمصادر مُسترجَعة.',
    },
    caveat: {
      en: 'Nothing retrieved ⇒ it returns “insufficient evidence,” and never a guess.',
      ar: 'لو لم يُسترجَع شيء ⇒ يقول «أدلة غير كافية»، ولا يُخمِّن أبدًا.',
    },
    layerGuarded: [1],
    live: true,
  },
  {
    id: 'relevance-logic',
    name: { en: 'Relevance Logic Layer', ar: 'طبقة منطق الصلة' },
    strength: {
      en: 'Weighs each source on the strength of its abstract (zod schema, 0.5 threshold).',
      ar: 'تزِن كل مصدر بناءً على مُلخّصه (مخطط zod، عتبة ٠٫٥).',
    },
    caveat: {
      en: 'It judges relevance, not truth — a source can be on-topic and still be wrong.',
      ar: 'تحكم على الصلة لا على الصحة — قد يكون المصدر في صميم الموضوع ويظل خاطئًا.',
    },
    layerGuarded: [2, 3],
  },
  {
    id: 'claim-match',
    name: { en: 'Fact-Check + Claim-Matching Index', ar: 'فحص الحقائق + فهرس مطابقة الادعاءات' },
    strength: {
      en: 'Google Fact Check / ClaimReview with BGE-M3/E5 and BM25 — “has this been debunked before?”, with strong Arabic coverage.',
      ar: 'يعتمد Google Fact Check / ClaimReview مع BGE-M3/E5 وBM25 — «هل سبق تفنيد ده؟»، مع تغطية قوية للعربية.',
    },
    caveat: {
      en: 'The absence of an earlier debunk is not proof that a claim is true.',
      ar: 'غياب تفنيد سابق ليس دليلًا على صدق الادعاء.',
    },
    layerGuarded: [1, 6],
    live: true,
  },
  {
    id: 'media-forensics',
    name: { en: 'Media Forensics Row', ar: 'صف التحليل الجنائي للوسائط' },
    strength: {
      en: 'C2PA, exifr, ELA (sharp), reverse-image search (InVID) and a deepfake score.',
      ar: 'يجمع C2PA وexifr وELA (sharp) والبحث العكسي بالصورة (InVID) ودرجة لكشف التزييف العميق.',
    },
    caveat: {
      en: 'These models are only 61–69% accurate — we report calibrated uncertainty, never an automatic “fake” verdict.',
      ar: 'دقة هذه النماذج بين ٦١٪ و٦٩٪ فقط — نعرض شكًّا مُعايَرًا، ولا نُطلق وسم «مزيّف» تلقائيًا.',
    },
    layerGuarded: [3, 4, 1],
  },
  {
    id: 'cross-model',
    name: { en: 'Cross-Model Consensus', ar: 'إجماع النماذج المتعددة' },
    strength: {
      en: 'Gemini Mega-Rotator and the God-System across two or more providers; when they agree, confidence is HIGH.',
      ar: 'يجمع Gemini Mega-Rotator ونظام God-System عبر مزوّدَين أو أكثر؛ فإذا اتفقوا ⇒ الثقة عالية.',
    },
    caveat: {
      en: 'When they disagree ⇒ CONTESTED — we do not settle it by majority vote.',
      ar: 'وإذا اختلفوا ⇒ متنازَع عليه — ولا نحسمه بأغلبية الأصوات.',
    },
    layerGuarded: [8],
  },
  {
    id: 'provenance',
    name: { en: 'Provenance + Adversarial Self-Critique', ar: 'إثبات المصدر + نقد ذاتي خصومي' },
    strength: {
      en: 'A required zod sources[] field plus a genuine critique pass run against every output.',
      ar: 'حقل مصادر إلزامي (zod sources[]) مع تمريرة نقد حقيقية على كل ناتج.',
    },
    caveat: {
      en: 'No sources ⇒ UNVERIFIED, and the output is held back rather than shown.',
      ar: 'بلا مصادر ⇒ غير مُتحقَّق، ويُحجَب الناتج بدل أن يُعرَض.',
    },
    layerGuarded: [2, 8],
  },
  {
    id: 'whitelist',
    name: { en: 'Tiered Whitelist + Retraction-Watch', ar: 'قائمة مصادر مُعتمَدة مُدرَّجة + مراقبة السحب' },
    strength: {
      en: 'Source tiers S → A → B → C, each one checked against the Retraction Watch database.',
      ar: 'مستويات للمصادر من S إلى A إلى B إلى C، كل منها مُراجَع أمام قاعدة بيانات Retraction Watch.',
    },
    caveat: {
      en: 'A tier is a starting probability, not a verdict — even an A-tier source can be wrong on a given claim.',
      ar: 'المستوى احتمال مبدئي لا حكمٌ نهائي — حتى مصدر من فئة A قد يُخطئ في ادعاء بعينه.',
    },
    layerGuarded: [1, 2],
  },
  {
    id: 'hadith-quran',
    name: { en: 'HadithAPI + Qur’an / Tafsir / Fatwa', ar: 'HadithAPI + القرآن / التفسير / الفتوى' },
    strength: {
      en: 'Authenticity-graded hadith alongside Dar al-Iftaa and Al-Azhar — never a narration cited without its grade.',
      ar: 'أحاديث مُخرَّجة بدرجة صحّتها، إلى جانب دار الإفتاء والأزهر — ولا رواية تُذكَر بلا بيان درجتها.',
    },
    caveat: {
      en: 'Every verse is cited with its surah and ayah and its tafsir; no interpretation is asserted without a source.',
      ar: 'كل آية تُذكَر بسورتها ورقمها ومعها تفسيرها؛ ولا يُجزَم بتفسير من غير مصدر.',
    },
    layerGuarded: [1, 3, 5],
  },
];

/* ───────────────────────────────────────────────────────────────
 * M10 BLAST RADIUS — per-domain sourced stat sets (5 petals)
 * Medical · Religious/Mental · Economic · Political · Social
 * ─────────────────────────────────────────────────────────────── */

export const BLAST_DOMAINS: BlastDomain[] = [
  {
    id: 'medical',
    domain: { en: 'Medical', ar: 'الطبي' },
    accent: DESCENT_LAYER_COLORS[1].accent,
    stats: [STATS.selfMedicate, STATS.pharmacySource],
  },
  {
    id: 'religious',
    domain: { en: 'Religious / Mental', ar: 'الديني والنفسي' },
    accent: DESCENT_LAYER_COLORS[3].accent,
    stats: [STATS.ocdJinn, STATS.nonDoctorFirst, STATS.psychiatrists],
  },
  {
    id: 'economic',
    domain: { en: 'Economic', ar: 'الاقتصادي' },
    accent: DESCENT_LAYER_COLORS[2].accent,
    stats: [STATS.egpFloat, STATS.inflation, STATS.gold],
  },
  {
    id: 'political',
    domain: { en: 'Political', ar: 'السياسي' },
    accent: DESCENT_LAYER_COLORS[4].accent,
    stats: [STATS.stateProject],
  },
  {
    id: 'social',
    domain: { en: 'Social', ar: 'الاجتماعي' },
    accent: DESCENT_LAYER_COLORS[6].accent,
    // Social anchor: دجال المرج family complicity (§4) — represented via the matrix stats
    stats: [STATS.nonDoctorFirst, STATS.internetUsers],
  },
];

/** Second-ring ripple: family → friends → community (atoms #43–45). */
export const RIPPLE_RINGS: Bilingual[] = [
  { en: 'You', ar: 'إنت' },
  { en: 'Family', ar: 'العيلة' },
  { en: 'Friends', ar: 'الصحاب' },
  { en: 'Community', ar: 'المجتمع' },
];

/* ───────────────────────────────────────────────────────────────
 * M10 CHOROPLETH — honesty gate metadata
 * The map is a MODELED DISTRIBUTION keyed off national sector shares,
 * NEVER asserted as measured per-governorate data.
 * ─────────────────────────────────────────────────────────────── */

export const CHOROPLETH_META = {
  geojsonPath: '/src/data/egypt-governorates.geojson',
  label: { en: 'Modeled distribution', ar: 'توزيع مُنمذَج' },
  honesty: {
    en: 'A modeled distribution derived from national sector shares — not measured, governorate-by-governorate data.',
    ar: 'توزيع مُنمذَج مُشتقّ من الحصص القطاعية على المستوى القومي — وليس بيانات مقيسة لكل محافظة على حدة.',
  },
  source: 'Egyptian Cabinet Media Centre 2025; sector stats above',
  tier: 'A' as Tier,
};

/* ───────────────────────────────────────────────────────────────
 * M15 ENTERPRISE AWARENESS — copy + 3 columns
 * ─────────────────────────────────────────────────────────────── */

export const ENTERPRISE = {
  ctaPrimary: { en: 'Request Enterprise Access', ar: 'اطلب وصولًا للمؤسسات' },
  ctaSecondary: { en: 'Enter the Library', ar: 'ادخل المكتبة' },
  columns: [
    {
      id: 'what',
      title: { en: 'What you get', ar: 'اللي بتاخده' },
      body: {
        en: 'The complete toolset, Cross-Model Consensus, a curated S/A-tier corpus, and training for your whole team.',
        ar: 'مجموعة الأدوات بالكامل، وإجماع النماذج المتعددة، وأرشيف مُنتقى من فئتَي S وA، وتدريب لفريقك كله.',
      },
    },
    {
      id: 'who',
      title: { en: 'Who it’s for', ar: 'لمين' },
      body: {
        en: 'Investors and organisations whose high-stakes decisions have to hold up.',
        ar: 'المستثمرون والمؤسسات اللي قراراتهم المصيرية لازم تصمد.',
      },
    },
    {
      id: 'outcome',
      title: { en: 'The outcome', ar: 'النتيجة' },
      body: {
        en: 'Where one person climbs out, an organisation builds the ladder for thousands.',
        ar: 'اللي بيطلعه الفرد لوحده، المؤسسة بتبني بيه سُلّمًا لآلاف غيره.',
      },
    },
  ],
};

/* ───────────────────────────────────────────────────────────────
 * SECTION ORDER + DEPTH RAIL stops (−8…+8)
 * Used by DepthRail (M-rail) + DescentExperience ordering.
 * ─────────────────────────────────────────────────────────────── */

export interface RailStop {
  /** Section anchor id. */
  anchor: string;
  /** Signed depth: negative = descent, 0 = floor/flip, positive = climb. */
  depth: number;
  /** Short rail label. */
  label: Bilingual;
}

export const DEPTH_RAIL_STOPS: RailStop[] = [
  { anchor: 'hero', depth: 0, label: { en: 'The Descent', ar: 'النزول' } },
  { anchor: 'thread', depth: 0, label: { en: 'Thread', ar: 'الرسالة' } },
  { anchor: 'spread', depth: 0, label: { en: 'Spread', ar: 'الانتشار' } },
  { anchor: 'problem', depth: 0, label: { en: 'The Gap', ar: 'الفجوة' } },
  { anchor: 'layer-1', depth: -1, label: { en: 'L1 Fabrication', ar: 'الكذب المُطلَق' } },
  { anchor: 'layer-2', depth: -2, label: { en: 'L2 Biased Lens', ar: 'العدسة المنحازة' } },
  { anchor: 'layer-3', depth: -3, label: { en: 'L3 Decontext', ar: 'اقتطاع السياق' } },
  { anchor: 'layer-4', depth: -4, label: { en: 'L4 Timing', ar: 'التوقيت المُسلَّح' } },
  { anchor: 'layer-5', depth: -5, label: { en: 'L5 The Kill', ar: 'التطبيق الشرير' } },
  { anchor: 'layer-6', depth: -6, label: { en: 'L6 Matrix', ar: 'مصفوفة التلاعب' } },
  { anchor: 'layer-7', depth: -7, label: { en: 'L7 Architects', ar: 'المهندسون' } },
  { anchor: 'layer-8', depth: -8, label: { en: 'L8 Unknown', ar: 'المجهول' } },
  { anchor: 'radius', depth: -8, label: { en: 'Blast Radius', ar: 'نطاق الانفجار' } },
  { anchor: 'floor', depth: -8, label: { en: 'The Floor', ar: 'القاع' } },
  { anchor: 'flip', depth: 0, label: { en: 'The Flip', ar: 'الانقلاب' } },
  { anchor: 'standard', depth: 1, label: { en: 'The One Law', ar: 'القانون الواحد' } },
  { anchor: 'tools', depth: 2, label: { en: 'Tools', ar: 'الأدوات' } },
  { anchor: 'immunity', depth: 4, label: { en: 'Immunity', ar: 'المناعة' } },
  { anchor: 'cognition', depth: 8, label: { en: 'Cognition', ar: 'الإدراك' } },
  { anchor: 'door', depth: 8, label: { en: 'The Door', ar: 'الباب' } },
];

/** localStorage flag set at M12 (FLIP) — skip-on-return (atom #1, #30). */
export const SKIP_FLAG_KEY = 'eal-descent-seen';

/** Route constant. */
export const DESCENT_ROUTE = '/the-descent';
