/**
 * CASE STUDY #001 — نظام دايت (The "Taybat" Diet System)
 * ───────────────────────────────────────────────────────────────────────────
 * Canonical, sourced data module for the EAL Cognition curriculum.
 *
 * WHY THIS FILE EXISTS
 * This Egyptian public-health misinformation event (2023–2026) is the single
 * best teaching case the platform has: one real story that simultaneously
 * demonstrates the evidence hierarchy, the 12 red flags of pseudo-medicine,
 * 16 cognitive biases, the religious-vocabulary exploit, and conspiracy
 * structure. The case's own "Project Integration Guide" (INT-01…INT-08) maps
 * each layer to a curriculum deliverable; this module is that data layer.
 *
 * ONE-LAW COMPLIANCE
 * Every factual claim here is graded (A = officially confirmed, B = verified
 * multi-source journalism, C = single-source/aggregate estimate) and tied to
 * a real source in `BIBLIOGRAPHY`. Nothing is fabricated. Where the public
 * record has a gap (e.g. no official death count), we say so loudly.
 *
 * NAME POLICY (platform UI rule — legal safety)
 * Learner-facing display strings refer to the SYSTEM ("نظام دايت", already
 * public and banned) and to its originator only by role ("a board-certified
 * anaesthesiologist"), never by personal name. The originator's identity is
 * fully documented in the public sources cited in `BIBLIOGRAPHY`; we simply do
 * not surface a private individual's name in interactive content. To show the
 * name in-app, set `ORIGINATOR.namePublic` and flip `SHOW_ORIGINATOR_NAME`.
 *
 * Source: user research artifact `altaybat_research_v2` (EAL Case Study No. 001),
 * synthesised from the verified public sources listed in BIBLIOGRAPHY.
 */

export type Lang = 'en' | 'ar';
export type Bilingual = { en: string; ar: string };

/** Evidence-grade of an individual claim within the case. */
export type EvidenceCategory =
  | 'A' // officially confirmed by an institutional body
  | 'B' // reported by >=2 independent named-source outlets
  | 'C'; // single source / aggregated estimate — indicative only

export interface SourceRef {
  id: string;
  citation: string;
  type: 'OFFICIAL' | 'MEDIA' | 'ACADEMIC';
  date?: string;
  /** Public, resolvable where one exists; many institutional communiqués are offline-of-record. */
  url?: string;
}

// ── Display / name policy ──────────────────────────────────────────────────
export const SHOW_ORIGINATOR_NAME = false;
export const ORIGINATOR = {
  /** Role descriptor used in all learner-facing copy. */
  role: {
    en: 'a board-certified Egyptian anaesthesiologist (intensive care & pain management)',
    ar: 'طبيب تخدير وعناية مركزة مصري معتمد',
  } as Bilingual,
  /** Set only if the team decides to surface the name in-app. */
  namePublic: null as string | null,
  /** The authority paradox: real credentials, wrong domain. */
  authorityNote: {
    en: 'His medical credentials were real but in anaesthesia — not in clinical nutrition, endocrinology, or oncology, the fields his system actually touched.',
    ar: 'شهادته الطبية حقيقية لكن في التخدير — لا في التغذية الإكلينيكية ولا الغدد ولا الأورام، وهي المجالات التي مسّها نظامه فعلياً.',
  } as Bilingual,
};

export const CASE_META = {
  id: 'case-001-eltaybat',
  systemName: { en: 'The "Taybat" Diet System', ar: 'نظام دايت' } as Bilingual,
  oneLineEn:
    'How pseudoscience, a fabricated religious shield, conspiracy framing, and 16 cognitive biases combined to produce documented deaths — and a community that defended the disaster.',
  oneLineAr:
    'كيف اجتمع العلم الزائف، ودرعٌ ديني مُلفَّق، وإطار المؤامرة، و16 انحيازاً معرفياً لينتج عنه وفيات موثَّقة — ومجتمعٌ يدافع عن الكارثة.',
  timeScope: '2023 – June 2026 (ongoing at compilation)',
  geoScope: { en: 'Egypt (primary); Saudi Arabia, Morocco, wider Arab world', ar: 'مصر (أساسي)؛ السعودية والمغرب والعالم العربي' } as Bilingual,
  // Quantified harm — graded. The death/injury figure is a LOWER BOUND, not official.
  stats: [
    { value: '230+', label: { en: 'Reported victims (deaths, disability, ICU) by early May 2026', ar: 'ضحايا مُبلَّغ عنهم (وفيات، إعاقة، عناية مركزة) حتى أوائل مايو 2026' }, grade: 'C' as EvidenceCategory },
    { value: '3', label: { en: 'Jurisdictions issuing official warnings', ar: 'جهات أصدرت تحذيرات رسمية' }, grade: 'A' as EvidenceCategory },
    { value: '3.7M', label: { en: 'Views on one TV interview before regulatory action', ar: 'مشاهدات مقابلة تلفزيونية واحدة قبل أي إجراء تنظيمي' }, grade: 'C' as EvidenceCategory },
  ],
  honestyNote: {
    en: 'There is NO official Egyptian registry linking deaths to dietary/pseudomedical interventions. The "230+" is media-aggregated. The true number is unknown and almost certainly higher.',
    ar: 'لا يوجد سجل مصري رسمي يربط الوفيات بالتدخلات الغذائية/شبه-الطبية. رقم «+230» مُجمَّع من الإعلام. العدد الحقيقي مجهول وأكبر على الأرجح.',
  } as Bilingual,
} as const;

// ── INT-05: The Evidence Hierarchy (the platform's first lesson) ────────────
export interface EvidenceLevel {
  rank: number; // 1 = weakest, 8 = strongest
  name: Bilingual;
  meaning: Bilingual;
  taybatPlacement?: boolean; // where the system's "evidence" actually lived
}
export const EVIDENCE_HIERARCHY: EvidenceLevel[] = [
  { rank: 1, name: { en: '“Trust me, it worked for someone I know”', ar: '«صدّقني، نفعت مع حد أعرفه»' }, meaning: { en: 'Zero evidence. Indistinguishable from coincidence.', ar: 'صفر دليل. لا يُميَّز عن الصدفة.' }, taybatPlacement: true },
  { rank: 2, name: { en: 'Anecdote / testimonial / social-media video', ar: 'حكاية / شهادة / فيديو سوشيال ميديا' }, meaning: { en: 'A single story. Cannot separate treatment from placebo or natural course.', ar: 'قصة واحدة. لا تفصل العلاج عن الوهمي أو المسار الطبيعي للمرض.' }, taybatPlacement: true },
  { rank: 3, name: { en: 'Expert opinion / editorial / “my patients”', ar: 'رأي خبير / افتتاحية / «مرضايا»' }, meaning: { en: 'Informed but unsystematic. Opinion is not data.', ar: 'مُطّلع لكن غير منهجي. الرأي ليس بيانات.' } },
  { rank: 4, name: { en: 'Case report & case series', ar: 'تقرير حالة وسلسلة حالات' }, meaning: { en: 'Documents something new; cannot prove cause.', ar: 'يوثّق شيئاً جديداً؛ لا يُثبت السببية.' } },
  { rank: 5, name: { en: 'Cross-sectional & observational', ar: 'مقطعية ورصدية' }, meaning: { en: 'A snapshot of prevalence; vulnerable to bias and confounders.', ar: 'لقطة لانتشار المرض؛ عرضة للانحياز والعوامل المربكة.' } },
  { rank: 6, name: { en: 'Cohort & case-control', ar: 'أتراب وحالات-شواهد' }, meaning: { en: 'Follows groups over time; stronger but recall/selection bias apply.', ar: 'تتابع مجموعات عبر الزمن؛ أقوى لكن يطالها انحياز التذكّر/الاختيار.' } },
  { rank: 7, name: { en: 'Randomized controlled trial (RCT)', ar: 'تجربة عشوائية مُحكَمة' }, meaning: { en: 'Randomization + blinding remove most bias and placebo.', ar: 'العشوائية + التعمية تزيلان معظم الانحياز والتأثير الوهمي.' } },
  { rank: 8, name: { en: 'Systematic review & meta-analysis', ar: 'مراجعة منهجية وتحليل بَعدي' }, meaning: { en: 'Combines many strong studies. Highest confidence.', ar: 'يجمع دراسات قوية كثيرة. أعلى ثقة.' } },
];

// ── INT-02: The 12 Universal Red Flags of Pseudo-medical Claims ─────────────
export interface RedFlag {
  n: number;
  title: Bilingual;
  why: Bilingual;
  taybatExample: Bilingual;
}
export const RED_FLAGS: RedFlag[] = [
  { n: 1, title: { en: '“It Cures Everything”', ar: '«يشفي كل شيء»' }, why: { en: 'Mechanistically unrelated diseases cannot share one cure. Cancer alone is 200+ diseases.', ar: 'أمراض غير مرتبطة آلياً لا تتشارك علاجاً واحداً. السرطان وحده +200 مرض.' }, taybatExample: { en: 'One diet claimed to cure cancer, T1 & T2 diabetes, lupus, IBS, hypertension, and renal disease at once.', ar: 'نظام واحد ادّعى شفاء السرطان والسكري بنوعيه والذئبة والقولون والضغط والكلى معاً.' } },
  { n: 2, title: { en: 'No Indexed Publications', ar: 'لا منشورات مُفهرسة' }, why: { en: '“It will be proven in the future” is a cheque that never clears.', ar: '«الحقيقة هتثبت في المستقبل» شيكٌ لا يُصرف أبداً.' }, taybatExample: { en: 'Asked for evidence, the originator answered: “The truth of what I present will be proven in the future.”', ar: 'عند طلب الدليل، كان الردّ: «صحة ما أقدّمه ستثبت مستقبلاً».' } },
  { n: 3, title: { en: 'Testimonials as Proof', ar: 'الشهادات كدليل' }, why: { en: '“My patient improved” cannot separate treatment from placebo or natural recovery.', ar: '«مريضي تحسّن» لا يفصل العلاج عن الوهمي أو الشفاء الطبيعي.' }, taybatExample: { en: 'The entire evidence base was follower testimonials — “my patients are my research.”', ar: 'كل قاعدة الأدلة كانت شهادات أتباع — «مرضايا هم بحثي».' } },
  { n: 4, title: { en: 'Unfalsifiable (“you did it wrong”)', ar: 'غير قابل للتفنيد («إنت غلطت»)' }, why: { en: 'When failure is always blamed on the patient, the claim has exited science.', ar: 'حين يُعلَّق الفشل دائماً على المريض، يكون الادّعاء قد خرج من العلم.' }, taybatExample: { en: 'Deterioration was attributed to imperfect adherence, never to the system.', ar: 'التدهور كان يُنسب لعدم الالتزام، لا للنظام أبداً.' } },
  { n: 5, title: { en: '“Big Pharma is hiding it”', ar: '«شركات الدوا بتخفيه»' }, why: { en: 'Conspiracy framing pre-emptively discredits all critique. Real pharma problems ≠ this claim is true.', ar: 'إطار المؤامرة يُسقِط كل نقد مسبقاً. مشاكل صناعة الدواء الحقيقية لا تُثبت صحة هذا الادّعاء.' }, taybatExample: { en: 'Every refutation was pre-answered with “the industry profits from your sickness.”', ar: 'كل تفنيد كان مُجاباً مسبقاً بـ«الصناعة بتكسب من مرضك».' } },
  { n: 6, title: { en: 'Moral/Religious Words for Food', ar: 'ألفاظ أخلاقية/دينية للطعام' }, why: { en: 'Words like pure/toxic/halal/blessed trigger identity, blocking rational evaluation. Foods are not moral agents.', ar: 'كلمات مثل طاهر/سام/حلال/مبارك تُشعِل الهوية وتُعطِّل التقييم العقلي. الطعام ليس فاعلاً أخلاقياً.' }, taybatExample: { en: 'Foods were split into «طيبات» (pure) and «خبائث» (foul) — Quranic vocabulary imported into nutrition.', ar: 'قُسِّم الطعام إلى «طيبات» و«خبائث» — مفردات قرآنية مستوردة إلى التغذية.' } },
  { n: 7, title: { en: 'Authority Outside Specialty', ar: 'سلطة خارج التخصص' }, why: { en: 'Credentials are domain-specific. An anaesthesiologist prescribing oncology nutrition is off his evidence base.', ar: 'الشهادات خاصة بالمجال. طبيب تخدير يصف تغذية للأورام خارج قاعدة أدلته.' }, taybatExample: { en: 'An anaesthesia consultant designed diabetes and cancer dietary protocols.', ar: 'استشاري تخدير صمّم بروتوكولات غذائية للسكري والسرطان.' } },
  { n: 8, title: { en: 'Tells You to Stop Your Medicine', ar: 'يأمرك بإيقاف دوائك' }, why: { en: 'The single most dangerous signal. No diet is a validated replacement for tested pharmacology in chronic disease.', ar: 'أخطر إشارة على الإطلاق. لا حِمية تُعدّ بديلاً مُثبتاً لعلاج دوائي مُختبَر في الأمراض المزمنة.' }, taybatExample: { en: 'Followers stopped insulin, corticosteroids, and cancer therapy.', ar: 'أوقف الأتباع الأنسولين والكورتيزون وعلاج السرطان.' } },
  { n: 9, title: { en: 'Binary “Pure vs Poison”', ar: 'ثنائية «طاهر ضد سام»' }, why: { en: 'Nutrition is dose, context, and individual biology — never absolutes.', ar: 'التغذية جرعة وسياق وبيولوجيا فردية — لا مُطلقات.' }, taybatExample: { en: 'Chicken, milk, eggs, and raw vegetables were declared categorically “toxic.”', ar: 'الفراخ واللبن والبيض والخضار النيئة أُعلِنت «سامة» بإطلاق.' } },
  { n: 10, title: { en: '“Detox” Without Chemistry', ar: '«ديتوكس» بلا كيمياء' }, why: { en: 'What toxin? What pathway removes it? What assay measures it? No answers = not biomedicine.', ar: 'أي سُمّ؟ أي مسار يُزيله؟ أي تحليل يقيسه؟ لا إجابات = ليس طبّاً.' }, taybatExample: { en: 'Foods were said to “leave minimal waste” with no defined toxin or mechanism.', ar: 'قيل إن الأطعمة «تترك فضلات أقل» دون سُمٍّ أو آليةٍ مُحددة.' } },
  { n: 11, title: { en: 'Questions = Betrayal', ar: 'السؤال = خيانة' }, why: { en: 'When “where is the evidence?” is treated as enemy behaviour, it is a belief movement, not a health practice.', ar: 'حين يُعامَل «فين الدليل؟» كسلوك عدوّ، يكون حركة عقائدية لا ممارسة صحية.' }, taybatExample: { en: 'Members who asked for proof were framed as agents of the establishment.', ar: 'مَن طلب الدليل صُوِّر كعميلٍ للمؤسسة.' } },
  { n: 12, title: { en: 'Undisclosed Financial Interest', ar: 'مصلحة مالية غير مُعلَنة' }, why: { en: 'Paid consults, clinic revenue, product sales, and monetised content create a direct interest in adoption.', ar: 'استشارات مدفوعة ودخل عيادة وبيع منتجات ومحتوى مُربِح تخلق مصلحة مباشرة في التبنّي.' }, taybatExample: { en: 'A private clinic charged for access to the system; later, branded restaurants opened.', ar: 'عيادة خاصة تتقاضى مقابل الوصول للنظام؛ لاحقاً فُتِحت مطاعم بالعلامة نفسها.' } },
];

// ── INT-03: The 16 Cognitive Biases (the curriculum's intellectual core) ────
// Pedagogy per the case: define → show in Taybat → show a 2nd transfer example
// → give a practice scenario. Each card carries all four.
export interface BiasCard {
  id: string;
  name: Bilingual;
  definition: Bilingual;
  taybatMechanism: Bilingual;
  transfer: Bilingual; // a second, unrelated example for transferability
}
export const BIAS_CARDS: BiasCard[] = [
  { id: 'confirmation', name: { en: 'Confirmation Bias', ar: 'انحياز التأكيد' }, definition: { en: 'Seeking and remembering only what confirms an existing belief.', ar: 'البحث عن وتذكُّر ما يؤكّد المعتقد القائم فقط.' }, taybatMechanism: { en: 'Followers shared “success” stories; failures went unreported or were explained away.', ar: 'تبادل الأتباع قصص «النجاح»؛ والإخفاقات لم تُذكَر أو فُسِّرت بعيداً.' }, transfer: { en: 'A driver sure their lane is fastest only notices the times it was.', ar: 'سائق متأكد أن حارته الأسرع لا يلاحظ إلا المرّات التي كانت فيها كذلك.' } },
  { id: 'survivorship', name: { en: 'Survivorship Bias', ar: 'انحياز الناجين' }, definition: { en: 'Judging by visible survivors while the non-survivors are silent.', ar: 'الحكم بالناجين الظاهرين بينما غير الناجين صامتون.' }, taybatMechanism: { en: 'The improved posted online; the dead and the ICU patients could not.', ar: 'مَن تحسّن نشر؛ والمتوفّون ومرضى العناية المركزة لم يستطيعوا.' }, transfer: { en: '“Successful dropouts” are loud; the many who failed after dropping out are invisible.', ar: '«المتسرّبون الناجحون» أصواتهم عالية؛ والكُثُر الذين فشلوا غير مرئيين.' } },
  { id: 'authority', name: { en: 'Authority Bias', ar: 'انحياز السلطة' }, definition: { en: 'Over-trusting an authority figure even outside their domain.', ar: 'الإفراط في الثقة بشخصية ذات سلطة حتى خارج مجالها.' }, taybatMechanism: { en: '“He is a doctor” overrode every cardiologist, endocrinologist, and dietitian.', ar: '«هو دكتور» تغلّب على كل أطباء القلب والغدد والتغذية.' }, transfer: { en: 'A famous actor endorsing a supplement feels like proof; it is not.', ar: 'ترويج ممثل شهير لمكمّل يبدو دليلاً؛ وليس كذلك.' } },
  { id: 'availability', name: { en: 'Availability Heuristic', ar: 'إتاحة الذاكرة' }, definition: { en: 'Overweighting vivid, easily-recalled stories over statistics.', ar: 'إعطاء وزن أكبر للقصص الحيّة سهلة التذكّر على حساب الإحصاء.' }, taybatMechanism: { en: 'A neighbour who “cured his diabetes” beat any clinical trial in the mind.', ar: 'جار «شَفى سكّره» تغلّب في الذهن على أي تجربة سريرية.' }, transfer: { en: 'After a plane crash on the news, flying feels riskier than driving — it is not.', ar: 'بعد خبر تحطّم طائرة، يبدو الطيران أخطر من القيادة — وليس كذلك.' } },
  { id: 'appeal-to-nature', name: { en: 'Appeal to Nature', ar: 'مغالطة الطبيعة' }, definition: { en: '“Natural = good, chemical = bad,” with no evidence for either.', ar: '«طبيعي = جيّد، كيميائي = سيّئ» دون دليل على أيٍّ منهما.' }, taybatMechanism: { en: 'Insulin — a natural human hormone — was branded “artificial” and feared more than high blood sugar.', ar: 'الأنسولين — هرمون بشري طبيعي — وُصِم بـ«الصناعي» وخُيف منه أكثر من ارتفاع السكر.' }, transfer: { en: '“Herbal” is sold as safe; foxglove and hemlock are natural and lethal.', ar: '«عشبي» يُباع كآمن؛ والديجيتال والشوكران طبيعيان وقاتلان.' } },
  { id: 'anecdotal', name: { en: 'Anecdotal Reasoning', ar: 'الاستدلال الحكائي' }, definition: { en: 'Treating one personal story as statistically meaningful.', ar: 'معاملة قصة فردية كدليل إحصائي ذي معنى.' }, taybatMechanism: { en: '“My patients are my research” — testimonials offered instead of documentation.', ar: '«مرضايا هم بحثي» — شهادات بدل التوثيق.' }, transfer: { en: '“My grandfather smoked and lived to 90” vs. decades of lung-cancer data.', ar: '«جدي دخّن وعاش 90» مقابل عقود من بيانات سرطان الرئة.' } },
  { id: 'dunning-kruger', name: { en: 'Dunning–Kruger Effect', ar: 'تأثير دانينغ-كروغر' }, definition: { en: 'Low knowledge breeds high confidence.', ar: 'قلّة المعرفة تُولّد ثقة عالية.' }, taybatMechanism: { en: '“I did my research (watched the videos)” let followers correct endocrinologists.', ar: '«أنا عملت بحثي (اتفرّجت على الفيديوهات)» جعل الأتباع يصحّحون لأطباء الغدد.' }, transfer: { en: 'A week of reading makes someone “expert” enough to dismiss a structural engineer.', ar: 'أسبوع قراءة يجعل أحدهم «خبيراً» بما يكفي ليتجاهل مهندساً إنشائياً.' } },
  { id: 'motivated', name: { en: 'Motivated Reasoning', ar: 'الاستدلال المدفوع' }, definition: { en: 'Reasoning toward a desired conclusion, not toward the truth.', ar: 'التفكير نحو نتيجة مرغوبة لا نحو الحقيقة.' }, taybatMechanism: { en: 'Patients exhausted by costly chronic medication wanted an easy cure to be real.', ar: 'مرضى أنهكهم دواء مزمن مكلِّف أرادوا أن يكون العلاج السهل حقيقياً.' }, transfer: { en: 'We scrutinise a bad medical result and accept a good one without question.', ar: 'نُدقّق في نتيجة طبية سيّئة ونقبل الجيّدة دون سؤال.' } },
  { id: 'sunk-cost', name: { en: 'Sunk-Cost Fallacy', ar: 'مغالطة التكلفة الغارقة' }, definition: { en: 'Continuing because of past investment, not future value.', ar: 'الاستمرار بسبب استثمار سابق لا قيمة مستقبلية.' }, taybatMechanism: { en: 'After weeks off medication and a rebuilt identity, admitting error felt impossible.', ar: 'بعد أسابيع بلا دواء وهويةٍ أُعيد بناؤها، صار الاعتراف بالخطأ مستحيلاً.' }, transfer: { en: 'Sitting through a bad film “because we paid for the ticket.”', ar: 'إكمال فيلم سيّئ «لأننا دفعنا ثمن التذكرة».' } },
  { id: 'splitting', name: { en: 'Black-and-White Thinking', ar: 'التفكير الثنائي' }, definition: { en: 'Forcing complex reality into two extremes.', ar: 'حشر الواقع المعقّد في طرفين.' }, taybatMechanism: { en: 'The whole system is «طيبات» vs «خبائث» — no spectrum, no dose, no individual biology.', ar: 'النظام كله «طيبات» ضد «خبائث» — لا تدرّج ولا جرعة ولا بيولوجيا فردية.' }, transfer: { en: '“You’re either with us or against us” erases every middle position.', ar: '«إمّا معنا أو ضدنا» يمحو كل موقفٍ وسط.' } },
  { id: 'ingroup', name: { en: 'In-group / Out-group', ar: 'الداخل/الخارج' }, definition: { en: 'Trusting “us” and dismissing “them” regardless of evidence.', ar: 'الثقة بـ«نحن» ورفض «هم» بغضّ النظر عن الدليل.' }, taybatMechanism: { en: 'Syndicate critique = “enemy attack by the pharma lobby”; follower testimony = sacred.', ar: 'نقد النقابة = «هجوم أعداء لوبي الدواء»؛ وشهادة الأتباع = مقدّسة.' }, transfer: { en: 'A fact is “fake news” from the other side and “proof” from ours.', ar: 'الخبر «مُفبرك» من الطرف الآخر و«دليل» من طرفنا.' } },
  { id: 'illusory-correlation', name: { en: 'Illusory Correlation', ar: 'الترابط الوهمي' }, definition: { en: 'Seeing a link where there is little or none.', ar: 'رؤية علاقة حيث لا توجد أو تكاد.' }, taybatMechanism: { en: '“I stopped chicken and felt better” ignored sleep, stress, placebo, disease variation.', ar: '«بطّلت فراخ وحسّيت أحسن» تجاهل النوم والتوتر والوهمي وتقلّب المرض.' }, transfer: { en: '“I wore my lucky shirt and we won” — coincidence, not cause.', ar: '«لبست قميص الحظ فكسبنا» — صدفة لا سبب.' } },
  { id: 'proportionality', name: { en: 'Proportionality Bias', ar: 'انحياز التناسب' }, definition: { en: 'Assuming big effects need big causes.', ar: 'افتراض أن الآثار الكبيرة تحتاج أسباباً كبيرة.' }, taybatMechanism: { en: '“Ten-year IBS gone” felt too big to be placebo or regression — “it must be the system.”', ar: '«قولون 10 سنين راح» بدا أكبر من أن يكون وهمياً أو ارتداداً — «لازم النظام».' }, transfer: { en: 'A huge event “must” have a huge hidden plan behind it.', ar: 'حدثٌ ضخم «لا بدّ» أن خلفه خطّة ضخمة خفيّة.' } },
  { id: 'anchoring', name: { en: 'Anchoring Bias', ar: 'انحياز التثبيت' }, definition: { en: 'Over-relying on the first piece of information met.', ar: 'الإفراط في الاعتماد على أول معلومة تُقابَل.' }, taybatMechanism: { en: 'The word «الطيبات», first heard in a sacred context, framed every later food judgement.', ar: 'كلمة «الطيبات»، سُمِعت أولاً في سياق مقدّس، أطّرت كل حُكمٍ غذائي لاحق.' }, transfer: { en: 'A “was 2000 EGP” tag makes 1200 feel cheap, whatever it is worth.', ar: 'لافتة «كان 2000 جنيه» تجعل 1200 تبدو رخيصة مهما كانت قيمته.' } },
  { id: 'bandwagon', name: { en: 'Bandwagon Effect', ar: 'أثر العربة' }, definition: { en: 'Believing because many others appear to.', ar: 'التصديق لأن كثيرين يبدون مصدّقين.' }, taybatMechanism: { en: 'Millions of views felt like millions of validations; popularity ≠ consensus.', ar: 'ملايين المشاهدات بدت ملايين التزكيات؛ الرواج ليس إجماعاً.' }, transfer: { en: 'A long queue makes a restaurant feel good before you taste anything.', ar: 'طابور طويل يجعل المطعم يبدو جيّداً قبل أن تتذوّق.' } },
  { id: 'belief-perseverance', name: { en: 'Belief Perseverance', ar: 'إصرار المعتقد' }, definition: { en: 'Holding a belief even after it is contradicted — especially when identity-linked.', ar: 'التمسّك بمعتقد حتى بعد تفنيده — خاصة حين يرتبط بالهوية.' }, taybatMechanism: { en: 'After the expulsion, the deaths, and the ban, the community doubled down; the death “proved” martyrdom.', ar: 'بعد الشطب والوفيات والحظر، تشبّث المجتمع أكثر؛ والوفاة «أثبتت» الشهادة.' }, transfer: { en: 'A failed end-of-world prophecy is re-dated rather than abandoned.', ar: 'نبوءة نهاية عالم فشلت يُعاد تأريخها بدل التخلّي عنها.' } },
];

// ── INT-04: The Religious-Vocabulary Shield (the highest-priority module) ────
// Framing: NOT a critique of Islam — a defence of Islam from those who weaponise it.
export const RELIGIOUS_SHIELD = {
  thesis: {
    en: 'The load-bearing trick was importing Quranic words — «الطيبات» (the good/pure) and «الخبائث» (the foul) — into a diet, so that disagreeing with a food list felt like disagreeing with the Quran.',
    ar: 'الحيلة الحاملة كانت استيراد ألفاظ قرآنية — «الطيبات» و«الخبائث» — إلى حِمية، فيصير الاعتراض على قائمة طعام كأنه اعتراض على القرآن.',
  } as Bilingual,
  // Two verses that, read carefully, REFUTE the system from within the tradition.
  refutingVerses: [
    {
      arabic: 'يَا أَيُّهَا الَّذِينَ آمَنُوا لَا تُحَرِّمُوا طَيِّبَاتِ مَا أَحَلَّ اللَّهُ لَكُمْ',
      ref: { en: 'Al-Mā’idah 5:87', ar: 'المائدة ٥:٨٧' } as Bilingual,
      translation: { en: '“O you who believe, do not prohibit the good things which Allah has made lawful to you.”', ar: '«يا أيها الذين آمنوا لا تحرّموا طيّبات ما أحلّ الله لكم».' } as Bilingual,
      refutes: { en: 'The system declares lawful foods (chicken, milk) forbidden — exactly what this verse prohibits.', ar: 'النظام يُحرّم أطعمة حلالاً (الفراخ، اللبن) — وهو عين ما تنهى عنه الآية.' } as Bilingual,
    },
    {
      arabic: 'وَلَا تَقُولُوا لِمَا تَصِفُ أَلْسِنَتُكُمُ الْكَذِبَ هَٰذَا حَلَالٌ وَهَٰذَا حَرَامٌ لِتَفْتَرُوا عَلَى اللَّهِ الْكَذِبَ',
      ref: { en: 'Al-Naḥl 16:116', ar: 'النحل ١٦:١١٦' } as Bilingual,
      translation: { en: '“And do not say of what your tongues assert of falsehood, ‘This is lawful and this is unlawful,’ inventing lies about Allah.”', ar: '«ولا تقولوا لما تصف ألسنتكم الكذب هذا حلال وهذا حرام لتفتروا على الله الكذب».' } as Bilingual,
      refutes: { en: 'Personal opinion was used to issue halal/haram food rulings — precisely the act this verse forbids.', ar: 'استُخدم الرأي الشخصي لإصدار أحكام حلال/حرام على الطعام — وهو بالضبط ما تنهى عنه الآية.' } as Bilingual,
    },
  ],
  prophetDietFabrication: {
    en: 'The claim that chicken and milk were absent from the Prophet’s ﷺ diet is refuted by authenticated hadith in the Six Books (e.g. Sunan Abī Dāwūd, Sunan Ibn Mājah) documenting both.',
    ar: 'ادّعاء غياب الفراخ واللبن عن طعام النبي ﷺ يردّه حديثٌ صحيح في الكتب الستة (مثل سنن أبي داود وسنن ابن ماجه) يوثّق كليهما.',
  } as Bilingual,
  popperPrinciple: {
    en: 'Karl Popper: that which is made sacred cannot be tested. Dressing a medical claim in religious vocabulary makes it immune to falsification — and a religious fraud is harder to debunk than a secular one because data must first get past identity.',
    ar: 'كارل بوبر: ما يُجعَل مقدّساً لا يُختبَر. إلباس ادّعاء طبي ثوباً دينياً يجعله محصّناً ضد التفنيد — والاحتيال الديني أصعب تفنيداً من العلماني لأن البيانات يجب أن تتجاوز الهوية أولاً.',
  } as Bilingual,
};

// ── INT-08 / Layer 7: Conspiracy claim → fact pairs ─────────────────────────
export interface ConspiracyPair { claim: Bilingual; fact: Bilingual; }
export const CONSPIRACY_PAIRS: ConspiracyPair[] = [
  { claim: { en: '“Pharma hides the cure because disease is profitable.”', ar: '«شركات الدواء بتخفي العلاج لأن المرض مربح».' }, fact: { en: 'Real industry problems do not validate an unrelated diet. “Medicine has flaws → therefore this works” is a non-sequitur.', ar: 'مشاكل الصناعة الحقيقية لا تُصحِّح حِمية لا صلة لها. «الطب فيه عيوب ← إذن هذا ينفع» استنتاج فاسد.' } },
  { claim: { en: '“Doctors defend the system because they profit from the sick.”', ar: '«الأطباء بيدافعوا عن النظام لأنهم بيكسبوا من المرضى».' }, fact: { en: 'The Syndicate review was by university specialists with no stake; Saudi warnings followed their own ICU admissions.', ar: 'مراجعة النقابة تمّت بأساتذة جامعات بلا مصلحة؛ وتحذيرات السعودية تبعت دخول مرضى للعناية لديهم.' } },
  { claim: { en: '“He was poisoned / assassinated by the industry.”', ar: '«اتسمّم / اتقتل من الصناعة».' }, fact: { en: 'The Egyptian Foreign Ministry confirmed a cardiac death, no criminal indication — at age 47, after a diet excluding cardio-protective foods.', ar: 'أكّدت الخارجية المصرية وفاة قلبية دون شبهة جنائية — في الـ47، بعد حِمية تستبعد أطعمة واقية للقلب.' } },
  { claim: { en: '“Banning it proves they fear the truth.”', ar: '«حظره يثبت إنهم خايفين من الحقيقة».' }, fact: { en: 'Textbook unfalsifiable structure: accepted = true, banned = also true. No evidence can refute it — which is the hallmark of conspiracy, not skepticism.', ar: 'بنية غير قابلة للتفنيد بامتياز: القبول = صحيح، والحظر = صحيح أيضاً. لا دليل يفنّده — وهذه علامة المؤامرة لا الشكّ.' } },
];

// ── Layer 1: Timeline (graded) ──────────────────────────────────────────────
export const TIMELINE = [
  { when: 'Pre-2024', what: { en: 'Audience built on YouTube/Facebook/TikTok; real nutrition mixed with unfounded cure claims.', ar: 'بناء جمهور على يوتيوب/فيسبوك/تيك توك؛ خلط تغذية حقيقية بادّعاءات شفاء بلا أساس.' }, grade: 'B' as EvidenceCategory },
  { when: '2024–25', what: { en: 'A TV interview reaches 3.7M views with no medical counter-panel.', ar: 'مقابلة تلفزيونية تبلغ 3.7 مليون مشاهدة دون لجنة طبية مقابلة.' }, grade: 'C' as EvidenceCategory },
  { when: 'Early 2026', what: { en: 'Medical Syndicate opens a multi-month investigation; requests 3 documented cases with before/after labs — receives none.', ar: 'نقابة الأطباء تفتح تحقيقاً متعدد الأشهر؛ تطلب 3 حالات موثّقة بتحاليل قبل/بعد — فلا تتلقّى شيئاً.' }, grade: 'A' as EvidenceCategory },
  { when: 'Mar 2026', what: { en: 'Syndicate expels the originator, revokes the license, closes the clinic.', ar: 'النقابة تشطب صاحب النظام، تُلغي الترخيص، تُغلق العيادة.' }, grade: 'A' as EvidenceCategory },
  { when: 'Apr 19 2026', what: { en: 'Originator dies of a cardiac event (Foreign Ministry confirms, no criminal element). Martyr narrative begins.', ar: 'وفاة صاحب النظام بحدثٍ قلبي (تؤكّد الخارجية، لا شبهة جنائية). تبدأ رواية الشهادة.' }, grade: 'A' as EvidenceCategory },
  { when: 'May 2026', what: { en: 'Supreme Council for Media Regulation bans all related content — triggering the Streisand effect.', ar: 'المجلس الأعلى لتنظيم الإعلام يحظر كل المحتوى المرتبط — مُطلِقاً أثر سترايسند.' }, grade: 'A' as EvidenceCategory },
  { when: 'Jun 2026', what: { en: 'Saudi MoH warns after ICU admissions; Egyptian parliament probes “Taybat” restaurants. The system is still expanding.', ar: 'وزارة الصحة السعودية تحذّر بعد دخول عناية مركزة؛ والبرلمان المصري يحقّق في مطاعم «الطيبات». والنظام ما زال يتمدّد.' }, grade: 'A' as EvidenceCategory },
];

// ── Layer 11: Structural factors (the “why Egypt” / mission justification) ───
export const STRUCTURAL_FACTORS: Bilingual[] = [
  { en: 'Health-literacy gap — schooling that rewards memorisation over evaluation.', ar: 'فجوة الثقافة الصحية — تعليمٌ يكافئ الحفظ على التقييم.' },
  { en: 'Economic barriers — specialist fees and medication costs; a video is free.', ar: 'حواجز اقتصادية — أتعاب المتخصّصين وتكاليف الدواء؛ والفيديو مجاني.' },
  { en: 'Institutional trust deficit — real historical grievances make official voices least persuasive to those who most need them.', ar: 'عجز ثقة مؤسسي — مظالم تاريخية حقيقية تجعل الأصوات الرسمية أقل إقناعاً لمن يحتاجها أكثر.' },
  { en: 'Media reach without media literacy — health entertainment mistaken for health journalism.', ar: 'انتشار إعلامي بلا ثقافة إعلامية — تسلية صحية تُحسب صحافة صحية.' },
  { en: 'The “sheikh-healer” authority archetype — charisma + religious framing carries deep cultural trust.', ar: 'نمط سلطة «الشيخ-المُعالِج» — الكاريزما + التأطير الديني يحملان ثقة ثقافية عميقة.' },
  { en: 'Medication-distrust culture — «الدواء سُم» as folk belief reframes chronic control as “addiction.”', ar: 'ثقافة عدم الثقة بالدواء — «الدواء سُم» كاعتقاد شعبي يعيد تأطير التحكّم المزمن كـ«إدمان».' },
];

// ── Bibliography (real, public sources — the One-Law backing) ────────────────
export const BIBLIOGRAPHY: SourceRef[] = [
  { id: 'ems-2026-03', type: 'OFFICIAL', date: '2026-03', citation: 'Egyptian Medical Syndicate — Official statement on expulsion and licence revocation (March 2026).' },
  { id: 'moh-eg-2026-05', type: 'OFFICIAL', date: '2026-05', citation: 'Egyptian Ministry of Health (spokesperson H. Abd al-Ghaffar) — Health-risk confirmation & clinic closure; reported by Al-Masry Al-Youm and Al-Sharq al-Awsat.' },
  { id: 'scmr-2026-05-03', type: 'OFFICIAL', date: '2026-05-03', citation: 'Egyptian Supreme Council for Media Regulation — Decision prohibiting publication/distribution of related content (3 May 2026).' },
  { id: 'mfa-eg-2026-04', type: 'OFFICIAL', date: '2026-04', citation: 'Egyptian Foreign Ministry — Statement confirming natural (cardiac) death in the UAE; no criminal element.' },
  { id: 'moh-sa-2026-06-08', type: 'OFFICIAL', date: '2026-06-08', citation: 'Saudi Ministry of Health — Warning against the “Taybat” diet after ICU admissions; reported by CNN Arabic (8 June 2026).' },
  { id: 'masrawy-2026-04-30', type: 'MEDIA', date: '2026-04-30', citation: 'Masrawy — On-record clinical testimony (Dr. Abd al-Qawi Maghazi) on a fatal lupus case (30 April 2026).' },
  { id: 'okaz-2026-05-10', type: 'MEDIA', date: '2026-05-10', citation: 'Okaz / Saudi Gazette — Death of a young Egyptian after stopping diabetes treatment (10 May 2026).' },
  { id: 'aljazeera-2026-04-28', type: 'MEDIA', date: '2026-04-28', citation: 'Al-Jazeera Arabic — “What does science say about the Taybat diet?” (28 April 2026).' },
  { id: 'alain-2026-04-28', type: 'MEDIA', date: '2026-04-28', citation: 'Al-Ain News — “Did the Prophet eat chicken?” on the hadith fabrication (28 April 2026).' },
  { id: 'almasry-2026-05-05', type: 'MEDIA', date: '2026-05-05', citation: 'Al-Masry Al-Youm — Syndicate council statement (Dr. Ayman Salem) (5 May 2026).' },
  { id: 'yin-2018', type: 'ACADEMIC', date: '2018', citation: 'Yin, R.K. (2018). Case Study Research and Applications (6th ed.). SAGE.' },
  { id: 'kahneman-2011', type: 'ACADEMIC', date: '2011', citation: 'Kahneman, D. (2011). Thinking, Fast and Slow. FSG. [Dual-process framing.]' },
  { id: 'popper-1959', type: 'ACADEMIC', date: '1959', citation: 'Popper, K.R. (1959). The Logic of Scientific Discovery. Hutchinson. [Falsifiability.]' },
  { id: 'who-infodemic-2021', type: 'OFFICIAL', date: '2021', citation: 'WHO (2021). Infodemic Management framework.' },
];

export const ELTAYBAT_CASE = {
  meta: CASE_META,
  originator: ORIGINATOR,
  evidenceHierarchy: EVIDENCE_HIERARCHY,
  redFlags: RED_FLAGS,
  biases: BIAS_CARDS,
  religiousShield: RELIGIOUS_SHIELD,
  conspiracyPairs: CONSPIRACY_PAIRS,
  timeline: TIMELINE,
  structuralFactors: STRUCTURAL_FACTORS,
  bibliography: BIBLIOGRAPHY,
} as const;

export default ELTAYBAT_CASE;
