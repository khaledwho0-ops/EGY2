/**
 * PAGE GUIDES — per-route help surfaced site-wide (TASK.txt requirement).
 *
 * For every page the user wants: (1) ready copy-paste example scenarios,
 * (2) "how it helps you / how to apply in real life" use-cases, and (3) a
 * page-aware chatbot context (system prompt + the page's exact data/purpose).
 *
 * This is PURE DATA keyed by route. The <PageGuide> component reads
 * usePathname() and renders the matching entry — so adding help to a page is a
 * data edit here, NOT a change to 135 page files. The registry is filled by a
 * workflow (Opus designs the template per category, Sonnet authors each route).
 *
 * Bilingual: every user-facing string has an Arabic (Egyptian) twin.
 */

export interface GuideScenario {
  /** A ready-to-paste example input for this page's tool. */
  paste: string;
  pasteAr?: string;
  /** One line on what this example demonstrates. */
  note?: string;
  noteAr?: string;
}

export interface GuideUseCase {
  /** How this page helps the user. */
  help: string;
  helpAr: string;
  /** How to apply it in real life. */
  apply: string;
  applyAr: string;
}

export interface PageGuide {
  title?: string;
  titleAr?: string;
  /** Copy-paste-ready example scenarios. */
  scenarios: GuideScenario[];
  /** How it helps / how to apply. */
  useCases: GuideUseCase[];
  /** System-prompt context for the page-aware chatbot (the page's exact data + purpose). */
  chatbotContext?: string;
}

export const PAGE_GUIDES: Record<string, PageGuide> = {
  '/angry-debunkers': {
    title: 'Claim Debunker',
    titleAr: 'مفنّد الادعاءات',
    scenarios: [
      { paste: 'Drinking lemon water on an empty stomach cures cancer.', pasteAr: 'شرب الليمون على الريق بيشفي السرطان.', note: 'A classic cure-all health myth — watch the verdict cite real sources.', noteAr: 'خرافة «يشفي كل حاجة» كلاسيكية — لاحظ الحُكم بيستشهد بمصادر حقيقية.' },
      { paste: 'A new study proves coffee causes cancer.', pasteAr: 'دراسة جديدة تثبت إن القهوة بتسبب السرطان.', note: 'Tests how the engine handles a "scary headline" single study.', noteAr: 'بيختبر إزاي المحرك بيتعامل مع «عنوان مخيف» لدراسة واحدة.' },
    ],
    useCases: [
      { help: 'Turns a viral claim into a sourced, structured verdict (truth-sandwich) instead of a yes/no.', helpAr: 'بيحوّل الادعاء المنتشر لحُكم موثَّق ومنظَّم (شطيرة الحقيقة) بدل نعم/لأ.', apply: 'Before forwarding a WhatsApp health claim, paste it here and read the cited verdict first.', applyAr: 'قبل ما تبعت ادعاء صحي على واتساب، الصقه هنا واقرأ الحُكم الموثَّق الأول.' },
    ],
    chatbotContext: 'You are the assistant on the Claim Debunker page. It accepts a viral claim and returns a verdict (DEBUNKED/MISLEADING/UNVERIFIED/TRUE), a confidence score, an 8-layer deception tag, and cited sources. Never fabricate a source; if unsourced, say UNVERIFIED. Help the user phrase a claim and interpret the verdict + sources.',
  },
  '/evidence-search': {
    title: 'Evidence Aggregator',
    titleAr: 'مُجمِّع الأدلة',
    scenarios: [
      { paste: 'intermittent fasting type 2 diabetes', pasteAr: 'الصيام المتقطع السكري النوع الثاني', note: 'See peer-reviewed evidence ranked, not blog posts.', noteAr: 'شوف أدلة محكَّمة مرتّبة، مش مدوّنات.' },
      { paste: 'vitamin D respiratory infection prevention', pasteAr: 'فيتامين د والوقاية من عدوى الجهاز التنفسي', note: 'Compare strong vs weak evidence on a popular supplement.', noteAr: 'قارن الأدلة القوية والضعيفة على مكمّل شائع.' },
    ],
    useCases: [
      { help: 'Searches 7 scientific databases at once and reranks by relevance, so you read evidence not opinion.', helpAr: 'بيبحث في 7 قواعد علمية مرة واحدة ويعيد الترتيب بالصلة، فتقرأ أدلة مش آراء.', apply: 'When someone says "studies show…", search the topic here and check whether strong studies actually agree.', applyAr: 'لما حد يقول «الدراسات بتقول…»، ابحث الموضوع هنا وشوف هل الدراسات القوية فعلاً متفقة.' },
    ],
    chatbotContext: 'You are the assistant on the Evidence Aggregator page. It queries OpenAlex, Semantic Scholar, Crossref, EuropePMC, DOAJ and reranks results. Explain how to read an abstract, citation count, and evidence level. Never overstate a single preprint; flag preprints as not peer-reviewed.',
  },
  '/fallacy-engine': {
    title: 'Fallacy Detector',
    titleAr: 'كاشف المغالطات',
    scenarios: [
      { paste: 'You can\'t trust that doctor about diet — he\'s overweight himself.', pasteAr: 'مش هتثق في الدكتور ده في الأكل — هو نفسه تخين.', note: 'Ad hominem: attacking the person, not the argument.', noteAr: 'مغالطة شخصنة: مهاجمة الشخص مش الحُجّة.' },
      { paste: 'Either we ban all processed food, or we accept mass disease. There\'s no middle ground.', pasteAr: 'يا نمنع كل الأكل المصنّع يا نقبل الأمراض الجماعية. مفيش حل وسط.', note: 'False dichotomy: a fake either/or.', noteAr: 'ثنائية زائفة: إمّا/أو مفبركة.' },
    ],
    useCases: [
      { help: 'Names the exact logical fallacy in an argument and shows the FLICC family it belongs to.', helpAr: 'بيسمّي المغالطة المنطقية بالظبط في الحُجّة وبيوضّح عيلة FLICC اللي بتنتمي لها.', apply: 'In a heated debate, paste the other side\'s sentence to see precisely which move they used.', applyAr: 'في نقاش حامي، الصق جملة الطرف التاني عشان تشوف بالظبط أنهي حركة استخدمها.' },
    ],
    chatbotContext: 'You are the assistant on the Fallacy Detector page. It classifies arguments by the FLICC taxonomy (Fake experts, Logical fallacies, Impossible expectations, Cherry-picking, Conspiracy). Help the user identify the fallacy and how to respond without committing one themselves.',
  },
  '/cognition-curriculum': {
    title: 'Cognition Curriculum',
    titleAr: 'منهج الإدراك',
    scenarios: [
      { paste: 'Start Day 51 — The Need for Closure', pasteAr: 'ابدأ يوم 51 — الحاجة للإغلاق', note: 'Try a full v2 day: calibrate, self-explain, build a manipulation, map an argument.', noteAr: 'جرّب يوم v2 كامل: معايرة، شرح ذاتي، بناء تلاعب، تفكيك حُجّة.' },
    ],
    useCases: [
      { help: 'A 140-day course that builds the mental defenses pseudoscience exploits — not a quiz, but trained reflexes.', helpAr: 'دورة 140 يوم بتبني الدفاعات الذهنية اللي العلم الزائف بيستغلّها — مش اختبار، لكن ردود فعل مدرَّبة.', apply: 'Do one short day daily; by the end you pause, ask for the source, and tolerate "I don\'t know" by reflex.', applyAr: 'اعمل يوم قصير كل يوم؛ في الآخر هتقف، تطلب المصدر، وتتحمّل «مش عارف» بالعادة.' },
    ],
    chatbotContext: 'You are the assistant on the Cognition Curriculum page. It is a 140-day bilingual course across 4 phases using 8 evidence-based mechanics (recognize, calibrate, self-explain, consider-the-opposite, inoculate, decompose, retrieve, transfer). Help the user pick where to start and explain a mechanic.',
  },
};

/** Lookup that tolerates trailing slashes. */
export function getPageGuide(pathname: string): PageGuide | undefined {
  if (!pathname) return undefined;
  const clean = pathname.length > 1 && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
  return PAGE_GUIDES[clean];
}
