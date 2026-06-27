/* ═══════════════════════════════════════════════════════════════
 * ENGINE COMBAT LENSES — Deep, Applied 7-Layer Defense Data
 * Each engine has a FULLY WRITTEN cognitive protocol for every layer.
 * Case study IDs reference src/components/six-layers/data.ts
 * ═══════════════════════════════════════════════════════════════ */

export interface LayerCombat {
  layerNumber: number;
  weaponNameEn: string;
  weaponNameAr: string;
  methodologyTagEn: string;
  methodologyTagAr: string;
  /** Deep, applied explanation of HOW this engine fights this layer */
  cognitiveProtocolEn: string;
  cognitiveProtocolAr: string;
  /** The specific cognitive rewrite the user internalizes */
  rewriteRuleEn: string;
  rewriteRuleAr: string;
  /** IDs from data.ts that this engine highlights for this layer */
  egyptianCaseIds: number[];
}

export interface EngineCombatLens {
  engineId: string;
  engineNameEn: string;
  engineNameAr: string;
  accentColor: string;
  layers: LayerCombat[];
}

// ═══════════════════════════════════════════════════════════════
// ENGINE 1: MENTAL HEALTH COGNITION (محرك الفهم)
// ═══════════════════════════════════════════════════════════════
const mentalHealthLens: EngineCombatLens = {
  engineId: "mental-health",
  engineNameEn: "Mental Health Cognition Engine",
  engineNameAr: "محرك الفهم — الصحة النفسية",
  accentColor: "#10B981",
  layers: [
    {
      layerNumber: 1,
      weaponNameEn: "The Amygdala Firewall",
      weaponNameAr: "جدار حماية اللوزة الدماغية",
      methodologyTagEn: "DSM-5-TR + Somatic Awareness",
      methodologyTagAr: "DSM-5-TR + الوعي الجسدي",
      cognitiveProtocolEn: "When a user encounters an Absolute Fabrication — a fake Sheikh threatening hellfire for a cultural infraction, or a TikTok 'doctor' claiming ginger cures kidney failure — the Amygdala hijacks the brain. The cortisol spike shuts down the Prefrontal Cortex. The user stops thinking and starts obeying. This engine trains the user to recognize the PHYSICAL sensation of the cortisol spike: the tightening chest, the racing heart, the tunnel vision. The moment they feel it, they execute a manual cognitive override: 'My body is reacting to a threat signal. I will breathe, identify the biological state, and re-engage my Prefrontal Cortex before I accept or reject this claim.' DSM-5-TR clinically differentiates between a panic response (biological) and a spiritual event. The fabrication CANNOT survive a calm Prefrontal Cortex.",
      cognitiveProtocolAr: "عندما يصادف المستخدم كذبة مطلقة — شيخ مزيف يهدد بنار جهنم بسبب مخالفة ثقافية، أو 'دكتور' تيكتوك يدعي أن الزنجبيل يعالج الفشل الكلوي — تختطف اللوزة الدماغية العقل. ارتفاع الكورتيزول يغلق القشرة الجبهية. المستخدم يتوقف عن التفكير ويبدأ بالطاعة. هذا المحرك يدرب المستخدم على التعرف على الإحساس الجسدي لارتفاع الكورتيزول: ضيق الصدر، تسارع القلب، الرؤية النفقية. لحظة شعوره بذلك، ينفذ تجاوزاً معرفياً يدوياً: 'جسدي يتفاعل مع إشارة تهديد. سأتنفس، أحدد الحالة البيولوجية، وأعيد تشغيل القشرة الجبهية قبل أن أقبل أو أرفض هذا الادعاء.' DSM-5-TR يفرق سريرياً بين استجابة الذعر (بيولوجية) والحدث الروحي. الكذبة لا تصمد أمام قشرة جبهية هادئة.",
      rewriteRuleEn: "A physical sensation is a DATA POINT, not a divine judgment. If my chest tightens, it is cortisol — not God punishing me.",
      rewriteRuleAr: "الإحساس الجسدي هو نقطة بيانات، وليس حكماً إلهياً. إذا ضاق صدري، فهذا كورتيزول — وليس عقاباً من الله.",
      egyptianCaseIds: [42, 48, 55, 40],
    },
    {
      layerNumber: 2,
      weaponNameEn: "The Cultural Firewall (Surgical Extraction of 'Urf)",
      weaponNameAr: "جدار الحماية الثقافي (الاستئصال الجراحي للعُرف)",
      methodologyTagEn: "Cultural Firewall + 'Ilm al-Nafs",
      methodologyTagAr: "جدار الحماية الثقافي + علم النفس",
      cognitiveProtocolEn: "The Biased Lens is the deadliest layer because it passes fact-checks. In Egypt, this layer is weaponized through the fusion of 'Ayb (cultural shame) with Haram (divine prohibition). A family member says 'a woman who works outside is shameless' — the core event (a woman working) is real, but the cultural lens distorts it into a religious sin. The engine trains the user to perform SURGICAL EXTRACTION: every time they feel societal pressure, their cognition forces the question: 'Is this pressure coming from the Quran and Sunnah, or from the blind traditions of my forefathers?' This is the deconstruction of Taqleed a'ma. When a manipulator says 'This is how we found our fathers doing it,' the rebuilt mind recognizes this as the EXACT argument the polytheists used against the Prophets (Quran 2:170). The biased lens shatters when you separate the cultural filter from the divine source.",
      cognitiveProtocolAr: "العدسة المنحازة هي أخطر طبقة لأنها تجتاز فحص الحقائق. في مصر، هذه الطبقة تُسلح من خلال دمج 'العيب' (العار الثقافي) بـ'الحرام' (التحريم الإلهي). فرد من العائلة يقول 'المرأة اللي بتشتغل بره عيب' — الحدث الأساسي (امرأة تعمل) حقيقي، لكن العدسة الثقافية تحوله إلى ذنب ديني. المحرك يدرب المستخدم على الاستئصال الجراحي: كل ما يحس بضغط مجتمعي، إدراكه يفرض السؤال: 'هل هذا الضغط مصدره القرآن والسنة، ولا من عادات أجدادي العمياء؟' هذا هو تفكيك التقليد الأعمى. عندما يقول المتلاعب 'هكذا وجدنا آباءنا'، العقل المُعاد برمجته يتعرف على أن هذه هي نفس حجة المشركين ضد الأنبياء (البقرة ١٧٠). العدسة المنحازة تتحطم عندما تفصل المرشح الثقافي عن المصدر الإلهي.",
      rewriteRuleEn: "If someone cannot cite a specific Quran verse or authenticated Hadith for their claim, it is 'URF (culture), not DEEN (religion). I am not obligated.",
      rewriteRuleAr: "إذا لم يستطع أحد أن يستشهد بآية قرآنية أو حديث صحيح لادعائه، فهو عُرف وليس دين. لست ملزماً.",
      egyptianCaseIds: [41, 50, 52, 54, 58],
    },
    {
      layerNumber: 3,
      weaponNameEn: "The Ego-Decoupling Protocol",
      weaponNameAr: "بروتوكول فصل الأنا",
      methodologyTagEn: "Tazkiyat al-Nafs + Epistemic Humility",
      methodologyTagAr: "تزكية النفس + التواضع المعرفي",
      cognitiveProtocolEn: "Decontextualization succeeds because the target's ego is glued to their opinion. When they see Quran 2:191 stripped of context by an Islamophobe, their ego flares — they scream, attack, share without reading 2:190 and 2:192. When an extremist strips the same verse, the ego-attached mind joins the violence because 'my religion is under attack.' The Engine 1 protocol decouples the ego entirely. The user's internal monologue shifts from 'I am right' to 'I am seeking the truth.' When a decontextualized claim appears, the decoupled mind does NOT react emotionally. It clinically asks: 'What is the FULL context? What comes before and after? Who removed the context, and what do they gain from my reaction?' The ego is no longer the target. The manipulator fires into empty space.",
      cognitiveProtocolAr: "اقتطاع السياق ينجح لأن الأنا ملتصقة بالرأي. عندما يرى المستخدم آية البقرة ١٩١ مقتطعة من سياقها بواسطة معادٍ للإسلام، أناه تشتعل — يصرخ، يهاجم، يشارك بدون قراءة ١٩٠ و١٩٢. وعندما يقتطعها متطرف، العقل الملتصق بالأنا ينضم للعنف لأن 'ديني تحت الهجوم.' بروتوكول المحرك الأول يفصل الأنا تماماً. المونولوج الداخلي يتحول من 'أنا صح' إلى 'أنا أبحث عن الحقيقة.' عندما يظهر ادعاء مقتطع من سياقه، العقل المنفصل لا يتفاعل عاطفياً. يسأل سريرياً: 'ما هو السياق الكامل؟ ماذا قبلها وبعدها؟ من حذف السياق، وماذا يكسب من ردة فعلي؟' الأنا لم تعد هدفاً. المتلاعب يطلق النار في الفراغ.",
      rewriteRuleEn: "My identity is NOT my opinion. If someone challenges my view, they are challenging a THOUGHT, not my existence. I observe. I verify. I do not react.",
      rewriteRuleAr: "هويتي ليست رأيي. إذا تحدى أحد وجهة نظري، فهو يتحدى فكرة، وليس وجودي. أراقب. أتحقق. لا أتفاعل.",
      egyptianCaseIds: [9, 42],
    },
    {
      layerNumber: 4,
      weaponNameEn: "The Cortisol Timing Detector",
      weaponNameAr: "كاشف توقيت الكورتيزول",
      methodologyTagEn: "WHO mhGAP + Neurochemical Awareness",
      methodologyTagAr: "منظمة الصحة العالمية mhGAP + الوعي الكيميائي العصبي",
      cognitiveProtocolEn: "Weaponized Timing exploits the fact that fear and panic are BIOLOGICAL states with a half-life. The January 2011 internet blackout hit during peak cortisol — people couldn't verify anything, so they obeyed or panicked. Pre-float rumors in 2024 exploited the SAME neurochemistry: release the panic at 11 PM when people are neurologically exhausted, and their Prefrontal Cortex is weakest. Engine 1 installs a TIME-AWARENESS protocol: 'Am I reading this at 2 AM when my cortisol is peaking and my willpower is depleted? Am I seeing this DURING a crisis when my biology is in survival mode?' The WHO mhGAP framework recognizes that crisis timing amplifies psychological vulnerability. The user learns to DELAY their response by 24 hours when they detect high-stress timing. Every manipulator's timing weapon has a biological expiry date.",
      cognitiveProtocolAr: "التوقيت المسلح يستغل حقيقة أن الخوف والذعر حالات بيولوجية لها عمر نصفي. قطع الإنترنت في يناير ٢٠١١ جاء أثناء ذروة الكورتيزول — الناس لم تستطع التحقق فأطاعت أو ذعرت. شائعات ما قبل التعويم في ٢٠٢٤ استغلت نفس الكيمياء العصبية: أطلق الذعر الساعة ١١ مساءً عندما يكون الناس مرهقين عصبياً وقشرتهم الجبهية في أضعف حالاتها. المحرك الأول يُثبت بروتوكول الوعي الزمني: 'هل أقرأ هذا الساعة ٢ صباحاً وكورتيزولي في ذروته وإرادتي منهكة؟ هل أرى هذا أثناء أزمة وبيولوجيتي في وضع البقاء؟' إطار mhGAP يعترف بأن توقيت الأزمة يضخم الهشاشة النفسية. المستخدم يتعلم تأجيل استجابته ٢٤ ساعة عندما يكتشف توقيتاً عالي الضغط.",
      rewriteRuleEn: "If a message arrives at peak panic — late at night, during a crisis — I DELAY my reaction by 24 hours. The manipulator's timing weapon has a biological expiry date.",
      rewriteRuleAr: "إذا وصلت رسالة في ذروة الذعر — في وقت متأخر من الليل أو أثناء أزمة — أؤجل ردة فعلي ٢٤ ساعة. سلاح التوقيت له تاريخ انتهاء بيولوجي.",
      egyptianCaseIds: [48, 57],
    },
    {
      layerNumber: 5,
      weaponNameEn: "The Amanah Protocol (Body as Sacred Trust)",
      weaponNameAr: "بروتوكول الأمانة (الجسد كأمانة مقدسة)",
      methodologyTagEn: "Islamic Bioethics + DSM-5-TR",
      methodologyTagAr: "الأخلاقيات الحيوية الإسلامية + DSM-5-TR",
      cognitiveProtocolEn: "The Evil Application layer uses PERFECT knowledge for destructive ends. In Egypt, this manifests as exploitative Ruqyah: practitioners who know genuine Islamic healing prayers but APPLY them through beating, burning, and confining mentally ill patients — a woman was beaten to death in 2015. The pharmacist who knowingly dispenses antibiotics without prescriptions. The engine installs the Amanah Protocol: the body is a trust from God. Treating clinical depression is not weakness — it is worship (Ibadah). Ignoring a neurochemical imbalance is a VIOLATION of that trust. When a fake guru says 'just pray and it will go away,' the Engine 1 mind responds: 'Prayer AND medicine are both commanded. Refusing medical treatment for a brain chemistry disorder is abandoning the Amanah. This person is using the truth of prayer to achieve the evil of medical neglect.'",
      cognitiveProtocolAr: "طبقة التطبيق الشرير تستخدم معرفة مثالية لأغراض مدمرة. في مصر، هذا يتجلى في الرقية الاستغلالية: ممارسون يعرفون الأدعية الإسلامية الحقيقية لكنهم يطبقونها من خلال الضرب والحرق وحبس المرضى النفسيين — امرأة ضُربت حتى الموت في ٢٠١٥. والصيدلي الذي يصرف المضادات الحيوية عن عمد بدون وصفة. المحرك يثبت بروتوكول الأمانة: الجسد أمانة من الله. علاج الاكتئاب السريري ليس ضعفاً — إنه عبادة. تجاهل الخلل الكيميائي العصبي هو خيانة لهذه الأمانة. عندما يقول المدّعي 'ادعي ربنا وهيبقى كويس'، عقل المحرك الأول يرد: 'الدعاء والدواء كلاهما مأمور بهما. رفض العلاج الطبي لاضطراب كيمياء الدماغ هو التخلي عن الأمانة. هذا الشخص يستخدم حقيقة الدعاء لتحقيق شر الإهمال الطبي.'",
      rewriteRuleEn: "Treating my brain's chemistry IS an act of worship. The person who tells me to 'just pray' instead of seeking medical help is violating the Amanah, not protecting it.",
      rewriteRuleAr: "علاج كيمياء دماغي هو عبادة. الشخص الذي يقول لي 'ادعي ربنا بس' بدلاً من طلب المساعدة الطبية هو من يخون الأمانة، وليس من يحميها.",
      egyptianCaseIds: [40, 55],
    },
    {
      layerNumber: 6,
      weaponNameEn: "The Cognitive Stability Equation",
      weaponNameAr: "معادلة الاستقرار المعرفي",
      methodologyTagEn: "E = f(T) × (B+C) / Awareness",
      methodologyTagAr: "E = f(T) × (B+C) / الوعي",
      cognitiveProtocolEn: "The Matrix of Manipulation aggregates ALL layers. The WhatsApp family group delivers a fabricated voice note (Layer 1) wrapped in cultural authority (Layer 2) stripped of medical context (Layer 3) timed during a health panic (Layer 4) from a trusted family vector (Layer 6). The Engine 1 defense is the EQUATION itself. The 'below zero' mind believes E = T (the manipulator IS the cause of 100% of my pain). The rebuilt mind calculates: E = f(T) × (B + C) / Awareness. The user identifies: 'My Biology is exhausted (B is high). My cultural conditioning accepts family authority without question (C is high). But I can INCREASE my Awareness. I can divide the manipulator's power by questioning my biological state AND my cultural programming simultaneously.' The matrix cannot hold a mind that calculates its own vulnerability in real-time.",
      cognitiveProtocolAr: "مصفوفة التلاعب تجمع كل الطبقات. مجموعة واتساب العائلة توصل رسالة صوتية ملفقة (طبقة ١) مغلفة بسلطة ثقافية (طبقة ٢) مقتطعة من السياق الطبي (طبقة ٣) موقتة أثناء ذعر صحي (طبقة ٤) من ناقل عائلي موثوق (طبقة ٦). دفاع المحرك الأول هو المعادلة نفسها. العقل 'تحت الصفر' يظن E = T (المتلاعب هو سبب ١٠٠٪ من ألمي). العقل المعاد بناؤه يحسب: E = f(T) × (B + C) / الوعي. المستخدم يحدد: 'بيولوجيتي منهكة (B مرتفع). تكييفي الثقافي يقبل سلطة العائلة بدون سؤال (C مرتفع). لكنني أستطيع زيادة وعيي. أستطيع قسمة قوة المتلاعب بالتشكيك في حالتي البيولوجية وبرمجتي الثقافية في وقت واحد.' المصفوفة لا تستطيع احتجاز عقل يحسب هشاشته في الوقت الفعلي.",
      rewriteRuleEn: "E = f(T) × (B+C) / Awareness. I mathematically reduce the manipulator's power to near zero by increasing my awareness of my own biology and cultural conditioning.",
      rewriteRuleAr: "E = f(T) × (B+C) / الوعي. أقلل رياضياً قوة المتلاعب إلى ما يقرب من الصفر من خلال زيادة وعيي ببيولوجيتي وتكييفي الثقافي.",
      egyptianCaseIds: [42, 48, 50, 40, 55],
    },
    {
      layerNumber: 7,
      weaponNameEn: "The Prefrontal Cortex Sovereignty Protocol",
      weaponNameAr: "بروتوكول سيادة القشرة الجبهية",
      methodologyTagEn: "Full Cognitive Architecture Integration",
      methodologyTagAr: "تكامل البنية المعرفية الكاملة",
      cognitiveProtocolEn: "The Mega-Machine — the Architects — designed the intermittent variable reward system (the infinite scroll, the pull-to-refresh) after casino slot machines. They bypass the Prefrontal Cortex entirely, hijacking the dopamine baseline. The Engine 1 sovereign defense: the user recognizes that every time they compulsively check their phone, their dopamine system is being EXTERNALLY CONTROLLED. The cognitive rewrite: 'I am biologically addicted to my own control mechanism. My scrolling is not a free choice — it is a conditioned reflex designed by behavioral psychologists who modeled my feed after a slot machine.' The moment this awareness fires, the Prefrontal Cortex reclaims sovereignty. The Architects lose their grip because the user's brain is no longer a passive receiver — it is an active auditor of its own neurochemistry.",
      cognitiveProtocolAr: "الآلة الكبرى — المهندسون — صمموا نظام المكافأة المتغيرة المتقطعة (التمرير اللانهائي، السحب للتحديث) على غرار ماكينات القمار. يتجاوزون القشرة الجبهية بالكامل، مختطفين خط الدوبامين الأساسي. الدفاع السيادي للمحرك الأول: المستخدم يدرك أنه في كل مرة يتفقد هاتفه بشكل قهري، نظام الدوبامين يتم التحكم فيه خارجياً. إعادة البرمجة: 'أنا مدمن بيولوجياً على آلية السيطرة الخاصة بي. تصفحي ليس اختياراً حراً — إنه رد فعل مشروط صممه علماء نفس سلوكيون على غرار ماكينة قمار.' لحظة إطلاق هذا الوعي، القشرة الجبهية تستعيد سيادتها. المهندسون يفقدون قبضتهم لأن دماغ المستخدم لم يعد متلقياً سلبياً — بل أصبح مدققاً نشطاً لكيميائه العصبية.",
      rewriteRuleEn: "My scrolling is not freedom. It is a conditioned reflex modeled after a slot machine. I reclaim sovereignty over my own dopamine system.",
      rewriteRuleAr: "تصفحي ليس حرية. إنه رد فعل مشروط مصمم على غرار ماكينة قمار. أستعيد السيادة على نظام الدوبامين الخاص بي.",
      egyptianCaseIds: [42],
    },
  ],
};

// ═══════════════════════════════════════════════════════════════
// ENGINE 2: DEEPREAL SCIENTIFIC (محرك التحقق)
// ═══════════════════════════════════════════════════════════════
const deeprealLens: EngineCombatLens = {
  engineId: "deepreal",
  engineNameEn: "DeepReal Scientific Verification Engine",
  engineNameAr: "محرك التحقق العلمي — ديب ريل",
  accentColor: "#F59E0B",
  layers: [
    {
      layerNumber: 1,
      weaponNameEn: "COPE Source Annihilation Protocol",
      weaponNameAr: "بروتوكول إبادة المصدر — COPE",
      methodologyTagEn: "COPE (Committee on Publication Ethics)",
      methodologyTagAr: "لجنة أخلاقيات النشر العلمي COPE",
      cognitiveProtocolEn: "An Absolute Fabrication has ZERO legitimate source. The COPE protocol is the global standard for tracing scientific integrity. When a 'miracle cure' appears on TikTok, DeepReal executes the COPE annihilation: (1) Does this claim have a DOI (Digital Object Identifier) linking to a peer-reviewed journal? If NO — it is Layer 1, terminate immediately. (2) Does the 'doctor' citing the claim have verifiable credentials in the relevant field? The Egyptian TikTok Health Hakeems wear lab coats but have ZERO verifiable medical degrees. COPE flags this as scientific impersonation. (3) Does the claim exist in ANY recognized database (PubMed, Cochrane, WHO)? The 'Egypt Found a Cure' COVID claim existed in NONE. Piltdown Man survived 41 years because COPE-level scrutiny didn't exist yet. Wakefield's fraud was exposed PRECISELY because COPE standards forced the retraction. Every Layer 1 fabrication dies on first contact with a DOI verification.",
      cognitiveProtocolAr: "الكذبة المطلقة ليس لها مصدر شرعي. بروتوكول COPE هو المعيار العالمي لتتبع النزاهة العلمية. عندما يظهر 'علاج معجزة' على تيكتوك، ديب ريل ينفذ بروتوكول الإبادة: (١) هل هذا الادعاء له DOI يربطه بمجلة محكمة؟ إذا لا — فهو طبقة ١، أنهِ فوراً. (٢) هل 'الدكتور' الذي يستشهد بالادعاء له مؤهلات قابلة للتحقق في المجال المعني؟ حكماء تيكتوك المصريون يرتدون المعطف الأبيض لكن ليس لديهم شهادات طبية. COPE يصنف هذا كانتحال علمي. (٣) هل الادعاء موجود في أي قاعدة بيانات معترف بها (PubMed, Cochrane, WHO)؟ ادعاء 'مصر اكتشفت العلاج' لكوفيد لم يكن موجوداً في أي منها. إنسان بلتداون نجا ٤١ سنة لأن تدقيق بمستوى COPE لم يكن موجوداً. تزوير ويكفيلد كُشف بالتحديد لأن معايير COPE فرضت السحب.",
      rewriteRuleEn: "No DOI = No reality. If it doesn't exist in a peer-reviewed database, it doesn't exist in science. Period.",
      rewriteRuleAr: "بدون DOI = بدون واقع. إذا لم يكن موجوداً في قاعدة بيانات محكمة، فهو غير موجود في العلم. نقطة.",
      egyptianCaseIds: [42, 48, 55, 60, 1, 2, 3],
    },
    {
      layerNumber: 2,
      weaponNameEn: "Follow-the-Money Forensics",
      weaponNameAr: "الطب الشرعي المالي — تتبع المال",
      methodologyTagEn: "COPE Conflict-of-Interest Scan",
      methodologyTagAr: "فحص تعارض المصالح — COPE",
      cognitiveProtocolEn: "The Biased Lens passes fact-checks because the DATA is real — only the FUNDING is corrupt. The Sugar Industry bribed Harvard scientists with real money to publish real data that SELECTIVELY highlighted fat and hid sugar's role in heart disease. The Tobacco Industry's motto was 'Doubt is our product.' DeepReal's weapon: the COPE Conflict-of-Interest Scan. For EVERY study, the engine asks: (1) WHO funded this research? If a nutrition paper was funded by a fast-food corporation, FLAG. (2) What data was OMITTED? Pharma Publication Bias hides 50% of clinical trials — the 8 that failed, not the 2 that succeeded. (3) WHO profits from this conclusion? Fossil fuel companies spent $3.6B on lobbying while their own scientists knew the truth since 1977. The biased lens cannot survive a forensic financial audit.",
      cognitiveProtocolAr: "العدسة المنحازة تجتاز فحص الحقائق لأن البيانات حقيقية — فقط التمويل فاسد. صناعة السكر رشت علماء هارفارد بأموال حقيقية لنشر بيانات حقيقية سلطت الضوء بشكل انتقائي على الدهون وأخفت دور السكر في أمراض القلب. شعار صناعة التبغ كان 'الشك هو منتجنا.' سلاح ديب ريل: فحص تعارض المصالح COPE. لكل دراسة، المحرك يسأل: (١) من موّل هذا البحث؟ إذا كانت ورقة تغذية ممولة من شركة وجبات سريعة، علّم. (٢) ما البيانات المحذوفة؟ تحيز النشر الدوائي يخفي ٥٠٪ من التجارب — الـ ٨ التي فشلت وليس الـ ٢ التي نجحت. (٣) من يربح من هذا الاستنتاج؟ شركات الوقود أنفقت ٣.٦ مليار على الضغط بينما علماؤها عرفوا الحقيقة منذ ١٩٧٧.",
      rewriteRuleEn: "Before I trust ANY study: WHO paid for it? What data is MISSING? Who PROFITS from this conclusion?",
      rewriteRuleAr: "قبل أن أثق بأي دراسة: مَن دفع ثمنها؟ ما البيانات المفقودة؟ من يربح من هذا الاستنتاج؟",
      egyptianCaseIds: [20, 21, 23, 24, 41],
    },
    {
      layerNumber: 3,
      weaponNameEn: "PRISMA Full-Context Recovery",
      weaponNameAr: "استعادة السياق الكامل — PRISMA",
      methodologyTagEn: "PRISMA (Systematic Reviews & Meta-Analyses)",
      methodologyTagAr: "PRISMA — المراجعات المنهجية والتحليلات التلوية",
      cognitiveProtocolEn: "Decontextualization strips a real quote from its surrounding truth. VAERS data is REAL, but anti-vaxxers strip it from the context that VAERS is a passive reporting system where ANYONE can submit an entry — correlation is not causation. In-Vitro cancer 'cures' are REAL lab results, but stripped from the context that killing cells in a dish is trivially different from curing a human body. PRISMA is the gold standard for PREVENTING cherry-picking. It forces: (1) A SYSTEMATIC search of ALL available evidence, not just the one study that supports your bias. (2) A transparent FLOWCHART showing how many studies were found, screened, and excluded — and WHY. (3) A META-ANALYSIS that aggregates data from thousands of patients, making isolated 'miracle' results statistically irrelevant. DeepReal discards single studies and only trusts systematic reviews.",
      cognitiveProtocolAr: "اقتطاع السياق يقتلع اقتباساً حقيقياً من الحقيقة المحيطة به. بيانات VAERS حقيقية، لكن مناهضي اللقاحات يقتلعونها من سياق أن VAERS نظام إبلاغ سلبي يمكن لأي شخص التقديم فيه — الارتباط ليس سببية. 'علاجات' السرطان في المختبر نتائج حقيقية، لكنها مقتلعة من سياق أن قتل خلايا في طبق يختلف جذرياً عن علاج جسم بشري. PRISMA هو المعيار الذهبي لمنع انتقاء الكرز. يفرض: (١) بحث منهجي في كل الأدلة المتاحة، وليس الدراسة الواحدة التي تدعم تحيزك. (٢) مخطط تدفق شفاف يوضح عدد الدراسات التي وُجدت وفُحصت واستُبعدت — ولماذا. (٣) تحليل تلوي يجمع بيانات من آلاف المرضى، مما يجعل النتائج الفردية 'المعجزة' غير ذات صلة إحصائياً.",
      rewriteRuleEn: "One study proves NOTHING. Only a systematic review of ALL available evidence can approach truth. I demand the meta-analysis.",
      rewriteRuleAr: "دراسة واحدة لا تثبت شيئاً. فقط مراجعة منهجية لكل الأدلة المتاحة يمكنها الاقتراب من الحقيقة. أطالب بالتحليل التلوي.",
      egyptianCaseIds: [9, 50],
    },
    {
      layerNumber: 4,
      weaponNameEn: "CONSORT Temporal Forensics",
      weaponNameAr: "الطب الشرعي الزمني — CONSORT",
      methodologyTagEn: "CONSORT (Clinical Trial Standards)",
      methodologyTagAr: "CONSORT — معايير التجارب السريرية",
      cognitiveProtocolEn: "Weaponized Timing in science means releasing a flawed study at the EXACT moment of maximum public vulnerability. The Comey Letter dropped 11 days before the election. The WikiLeaks DNC dump was timed for the convention. In Egypt, pre-float panic rumors were released WEEKS before the official devaluation. CONSORT fights this by demanding: (1) PRE-REGISTRATION of clinical trials BEFORE results are known — this prevents researchers from timing their publications for maximum market manipulation. (2) Complete REPORTING of follow-up periods — if 45 out of 800 patients disappeared from the trial, WHERE are they? Were they removed because they had bad outcomes? (3) ITT (Intention-To-Treat) analysis — you must count EVERY enrolled patient, even the ones who dropped out. You cannot hide bad results behind 'lost to follow-up.' DeepReal timestamps every claim and cross-references it against crisis timelines.",
      cognitiveProtocolAr: "التوقيت المسلح في العلم يعني نشر دراسة معيبة في اللحظة المحددة من أقصى هشاشة عامة. خطاب كومي سقط قبل ١١ يوماً من الانتخابات. تسريب ويكيليكس وُقت للمؤتمر. في مصر، شائعات الذعر قبل التعويم أُطلقت أسابيع قبل التخفيض الرسمي. CONSORT يحارب هذا بالمطالبة بـ: (١) تسجيل التجارب السريرية مسبقاً قبل معرفة النتائج. (٢) إبلاغ كامل عن فترات المتابعة — إذا اختفى ٤٥ من ٨٠٠ مريض، أين هم؟ (٣) تحليل ITT — يجب حساب كل مريض مسجل حتى المنسحبين. لا يمكنك إخفاء النتائج السيئة خلف 'فُقد من المتابعة.'",
      rewriteRuleEn: "WHY is this being released NOW? Was this study pre-registered? Where are the patients who dropped out? Timing is never accidental.",
      rewriteRuleAr: "لماذا يُنشر هذا الآن؟ هل سُجلت الدراسة مسبقاً؟ أين المرضى المنسحبون؟ التوقيت ليس صدفة أبداً.",
      egyptianCaseIds: [57, 48],
    },
    {
      layerNumber: 5,
      weaponNameEn: "The Institutional Ethics Audit",
      weaponNameAr: "تدقيق الأخلاقيات المؤسسية",
      methodologyTagEn: "COPE + Institutional Review Board (IRB)",
      methodologyTagAr: "COPE + مجلس المراجعة المؤسسية",
      cognitiveProtocolEn: "The Evil Application layer is where REAL science is weaponized. Tuskegee: real doctors conducted a real syphilis study on 399 Black men — but deliberately withheld treatment to observe death. MKUltra: real CIA psychologists used real LSD on real human subjects — 80+ institutions, mind control experiments. Cambridge Analytica: real OCEAN psychometric models harvested 87 million real profiles to hack democracy. DeepReal's weapon is the INSTITUTIONAL ETHICS AUDIT: (1) Did this research pass an IRB (Institutional Review Board)? Tuskegee had NO ethical review. (2) Were subjects given INFORMED CONSENT? MKUltra subjects did NOT consent. (3) Is the APPLICATION of this knowledge consistent with its STATED PURPOSE? Pegasus was sold as 'counter-terrorism' but used to spy on journalists. Every evil application has a gap between stated purpose and actual deployment.",
      cognitiveProtocolAr: "طبقة التطبيق الشرير هي حيث يُسلح العلم الحقيقي. توسكيجي: أطباء حقيقيون أجروا دراسة حقيقية على ٣٩٩ رجلاً أسود — لكنهم حجبوا العلاج عمداً لمراقبة الموت. MKUltra: علماء نفس حقيقيون في CIA استخدموا LSD حقيقي على بشر حقيقيين. كامبريدج أناليتيكا: نماذج OCEAN حقيقية حصدت ٨٧ مليون ملف شخصي حقيقي لاختراق الديمقراطية. سلاح ديب ريل: تدقيق الأخلاقيات المؤسسية: (١) هل مر هذا البحث على مجلس مراجعة أخلاقية؟ توسكيجي لم يكن لها مراجعة. (٢) هل أُعطي المشاركون موافقة مستنيرة؟ (٣) هل تطبيق المعرفة متسق مع غرضها المعلن؟ بيغاسوس بيع كـ'مكافحة إرهاب' لكنه استُخدم للتجسس على صحفيين.",
      rewriteRuleEn: "Was there ethical review? Was there informed consent? Is the APPLICATION consistent with the STATED PURPOSE? If any answer is NO, this is Layer 5.",
      rewriteRuleAr: "هل كانت هناك مراجعة أخلاقية؟ هل كانت هناك موافقة مستنيرة؟ هل التطبيق متسق مع الغرض المعلن؟ إذا كان أي جواب لا، فهذه طبقة ٥.",
      egyptianCaseIds: [40, 55],
    },
    {
      layerNumber: 6,
      weaponNameEn: "Full Pipeline Decomposition",
      weaponNameAr: "تفكيك خط الأنابيب الكامل",
      methodologyTagEn: "COPE + PRISMA + CONSORT Combined",
      methodologyTagAr: "COPE + PRISMA + CONSORT مجتمعين",
      cognitiveProtocolEn: "The Matrix aggregates all layers. QAnon used real government documents (Layer 2) stripped of context (Layer 3) timed for maximum outrage (Layer 4) delivered through trusted community vectors (Layer 6). The ISIS 7-stage pipeline used real theological texts (Layer 2) to achieve mass radicalization. DeepReal's weapon against the Matrix is FULL PIPELINE DECOMPOSITION: break the compound attack into its individual layers. Run COPE on the source. Run PRISMA on the evidence quality. Run CONSORT on the trial methodology. A Matrix-level attack is designed to overwhelm cognition by firing all layers simultaneously. The defense is to slow down and process ONE layer at a time. The Matrix is invincible when consumed whole. It disintegrates when dissected layer by layer.",
      cognitiveProtocolAr: "المصفوفة تجمع كل الطبقات. كيو أنون استخدم وثائق حكومية حقيقية (طبقة ٢) مقتطعة من السياق (طبقة ٣) موقتة لأقصى غضب (طبقة ٤) موصلة عبر ناقلات مجتمعية موثوقة (طبقة ٦). خط أنابيب داعش ذو السبع مراحل استخدم نصوصاً لاهوتية حقيقية (طبقة ٢) لتحقيق تطرف جماعي. سلاح ديب ريل ضد المصفوفة: تفكيك خط الأنابيب الكامل. فكك الهجوم المركب إلى طبقاته الفردية. شغل COPE على المصدر. شغل PRISMA على جودة الأدلة. شغل CONSORT على منهجية التجربة. هجوم بمستوى المصفوفة مصمم لإرباك الإدراك بإطلاق كل الطبقات في وقت واحد. الدفاع: أبطئ وعالج طبقة واحدة في كل مرة.",
      rewriteRuleEn: "A Matrix attack fires all layers simultaneously to overwhelm me. I slow down. I dissect ONE layer at a time. The Matrix disintegrates under decomposition.",
      rewriteRuleAr: "هجوم المصفوفة يطلق كل الطبقات في وقت واحد لإرباكي. أبطئ. أفكك طبقة واحدة في كل مرة. المصفوفة تتفكك تحت التشريح.",
      egyptianCaseIds: [42, 50, 48],
    },
    {
      layerNumber: 7,
      weaponNameEn: "OSINT Algorithmic Forensics",
      weaponNameAr: "الطب الشرعي الخوارزمي — OSINT",
      methodologyTagEn: "Open Source Intelligence + Network Analysis",
      methodologyTagAr: "استخبارات المصادر المفتوحة + تحليل الشبكات",
      cognitiveProtocolEn: "The Architects — the Mega-Machine — operate above all other layers. They OWN the algorithmic rails. Facebook's emotional contagion experiment proved they can alter human moods without consent. The OCEAN psychometrics mapped 87 million voter vulnerabilities. The intermittent variable reward system biologically addicts users to their own control mechanism. DeepReal's OSINT forensic response: (1) MAP the network. Who owns this platform? Who funds this 'independent' influencer? Follow the money to the Architect. (2) EXPOSE the algorithm. The Rabbit-Hole Engine auto-radicalizes users by recommending increasingly extreme content. Document the recommendation chain. (3) REVERSE-ENGINEER the incentive structure. If a platform profits from engagement and outrage drives engagement, the platform is ARCHITECTURALLY INCENTIVIZED to radicalize its users. This is not a bug — it is the business model.",
      cognitiveProtocolAr: "المهندسون — الآلة الكبرى — يعملون فوق كل الطبقات الأخرى. يمتلكون المسارات الخوارزمية. تجربة العدوى العاطفية لفيسبوك أثبتت قدرتهم على تغيير مزاج البشر بدون موافقة. مقاييس OCEAN رسمت خريطة لهشاشة ٨٧ مليون ناخب. نظام المكافأة المتغيرة يدمن المستخدمين بيولوجياً. استجابة ديب ريل الجنائية: (١) ارسم خريطة الشبكة. من يملك هذه المنصة؟ من يموّل هذا المؤثر 'المستقل'؟ تتبع المال إلى المهندس. (٢) اكشف الخوارزمية. محرك جحر الأرنب يطرف المستخدمين تلقائياً بتوصية محتوى متطرف بشكل متزايد. وثّق سلسلة التوصيات. (٣) عكس-هندسة هيكل الحوافز. إذا كانت المنصة تربح من التفاعل والغضب يدفع التفاعل، فالمنصة محفزة معمارياً لتطريف مستخدميها.",
      rewriteRuleEn: "The platform is not broken. Radicalization IS the business model. Outrage drives engagement. Engagement drives profit. I am the product.",
      rewriteRuleAr: "المنصة ليست معطلة. التطريف هو نموذج العمل. الغضب يدفع التفاعل. التفاعل يدفع الربح. أنا المنتج.",
      egyptianCaseIds: [7],
    },
  ],
};

// ═══════════════════════════════════════════════════════════════
// ENGINE 3: RELIGION HUB (المحور الديني)
// ═══════════════════════════════════════════════════════════════
const religionHubLens: EngineCombatLens = {
  engineId: "religion-hub",
  engineNameEn: "Religion Hub — Theological Defense Engine",
  engineNameAr: "المحور الديني — محرك الدفاع اللاهوتي",
  accentColor: "#8B5CF6",
  layers: [
    {
      layerNumber: 1,
      weaponNameEn: "The Isnad Annihilation Protocol",
      weaponNameAr: "بروتوكول إبادة الإسناد",
      methodologyTagEn: "Al-Azhar Hadith Verification Science",
      methodologyTagAr: "علم مصطلح الحديث — منهجية الأزهر",
      cognitiveProtocolEn: "For over a thousand years, Islamic scholars built the most rigorous source-verification system in pre-modern history: 'Ilm al-Hadith (the Science of Hadith). Every statement attributed to the Prophet Muhammad was traced through an ISNAD — a complete, unbroken chain of human transmission, where every individual narrator was independently investigated for memory, character, and potential bias. Fabricated Hadiths (الأحاديث الموضوعة) are identified when a link in the chain is a known liar, or the chain simply doesn't exist. This is the ORIGINAL anti-Layer-1 weapon. When a manipulator quotes a 'Hadith' to justify forced marriage, financial exploitation, or silencing women, the Religion Hub executes the Isnad Protocol: 'Cite your chain. Which collection? Which narrator? What is the grading by Al-Albani, Ibn Hajar, or Al-Nawawi?' A fabrication has NO chain. It evaporates under Isnad scrutiny.",
      cognitiveProtocolAr: "لأكثر من ألف عام، بنى العلماء المسلمون أدق نظام تحقق من المصادر في تاريخ ما قبل الحداثة: علم الحديث. كل قول نُسب للنبي محمد (ص) تُتبع عبر إسناد — سلسلة نقل بشرية كاملة غير منقطعة، حيث يُحقق في كل راوٍ على حدة من حيث الذاكرة والأخلاق والتحيز المحتمل. الأحاديث الموضوعة تُكشف عندما تكون حلقة في السلسلة كذاباً معروفاً، أو السلسلة ببساطة غير موجودة. هذا هو السلاح الأصلي ضد الطبقة الأولى. عندما يقتبس متلاعب 'حديثاً' لتبرير الزواج القسري أو استغلال مالي أو إسكات النساء، المحور الديني ينفذ بروتوكول الإسناد: 'اذكر سلسلتك. في أي مجموعة؟ من الراوي؟ ما تصنيف الألباني أو ابن حجر أو النووي؟' الاختلاق ليس له سلسلة. يتبخر تحت تدقيق الإسناد.",
      rewriteRuleEn: "No Isnad = No authority. If you cannot cite a verified chain of transmission with graded narrators, your 'Hadith' does not exist.",
      rewriteRuleAr: "بدون إسناد = بدون حجة. إذا لم تستطع ذكر سلسلة نقل موثقة مع رواة مصنفين، فـ'حديثك' غير موجود.",
      egyptianCaseIds: [9],
    },
    {
      layerNumber: 2,
      weaponNameEn: "Maqasid al-Shariah (Objectives of Divine Law)",
      weaponNameAr: "مقاصد الشريعة",
      methodologyTagEn: "Al-Azhar + Four Schools of Fiqh",
      methodologyTagAr: "الأزهر + المذاهب الأربعة",
      cognitiveProtocolEn: "The Biased Lens in religion takes a REAL verse or Hadith and filters it through a narrow, self-serving interpretation while hiding the broader Maqasid (Objectives). Al Jazeera vs Al Arabiya show the same protest through two lenses. Similarly, a manipulator shows ONE Hadith about wifely obedience while hiding the DOZENS of Hadiths about mutual respect, consultation (Shura), and the Prophet's own domestic kindness. The Maqasid al-Shariah framework identifies 5 universal objectives that ALL Islamic rulings must serve: preservation of (1) Life, (2) Intellect, (3) Religion, (4) Lineage, (5) Property. Any interpretation that DESTROYS one of these five — e.g., telling a clinically depressed woman to 'just be patient' until she self-harms — FAILS the Maqasid test, regardless of which isolated text is cited. The biased lens cracks when confronted with the FULL objectives.",
      cognitiveProtocolAr: "العدسة المنحازة في الدين تأخذ آية أو حديثاً حقيقياً وتفلتره عبر تفسير ضيق يخدم المصلحة الشخصية مع إخفاء المقاصد الأوسع. كما تُظهر الجزيرة والعربية نفس الاحتجاج بعدستين مختلفتين، المتلاعب يعرض حديثاً واحداً عن طاعة الزوجة بينما يخفي عشرات الأحاديث عن الاحترام المتبادل والشورى ولطف النبي المنزلي. إطار مقاصد الشريعة يحدد ٥ أهداف كونية يجب أن تخدمها كل الأحكام: حفظ (١) النفس، (٢) العقل، (٣) الدين، (٤) النسل، (٥) المال. أي تفسير يدمر أحد هذه الخمسة — مثل إخبار امرأة مكتئبة سريرياً بـ'اصبري' حتى تؤذي نفسها — يفشل في اختبار المقاصد، بغض النظر عن النص المعزول المستشهد به.",
      rewriteRuleEn: "Does this interpretation serve or DESTROY the 5 Maqasid (Life, Intellect, Religion, Lineage, Property)? If it destroys any, the interpretation is corrupt — not the religion.",
      rewriteRuleAr: "هل هذا التفسير يخدم أم يدمر المقاصد الخمس (النفس، العقل، الدين، النسل، المال)؟ إذا دمر أياً منها، فالتفسير فاسد — وليس الدين.",
      egyptianCaseIds: [41, 52, 54],
    },
    {
      layerNumber: 3,
      weaponNameEn: "Asbab al-Nuzul (Context of Revelation)",
      weaponNameAr: "أسباب النزول (سياق الوحي)",
      methodologyTagEn: "Classical Tafsir + Full Surah Context",
      methodologyTagAr: "التفسير الكلاسيكي + سياق السورة الكامل",
      cognitiveProtocolEn: "Quran 2:191 is the most decontextualized verse in Islamic history. Islamophobes strip it: 'Kill them wherever you find them.' Extremists strip the same verse to recruit fighters. BOTH sides commit Layer 3. The Religion Hub's weapon is Asbab al-Nuzul — the science of WHY a verse was revealed and WHAT surrounded it. Quran 2:190 (the verse BEFORE) says: 'Fight in the way of God those who fight you, but do not transgress.' Quran 2:192: 'But if they cease, then God is Forgiving and Merciful.' Quran 2:193: 'And fight them until there is no more persecution.' The full context reveals DEFENSIVE rules of engagement with strict limits — not carte-blanche violence. Al-Azhar's methodology demands that NO verse be interpreted without its Asbab, its surrounding verses, and its place within the Makki/Madani chronology. The decontextualized weapon disintegrates when the full Surah is read.",
      cognitiveProtocolAr: "آية البقرة ١٩١ هي أكثر آية مقتطعة من سياقها في التاريخ الإسلامي. المعادون للإسلام يقتطعونها: 'واقتلوهم حيث ثقفتموهم.' والمتطرفون يقتطعون نفس الآية لتجنيد مقاتلين. كلا الطرفين يرتكب الطبقة ٣. سلاح المحور الديني: أسباب النزول — علم لماذا نزلت الآية وما أحاط بها. البقرة ١٩٠ (الآية قبلها): 'وقاتلوا في سبيل الله الذين يقاتلونكم ولا تعتدوا.' البقرة ١٩٢: 'فإن انتهوا فإن الله غفور رحيم.' البقرة ١٩٣: 'وقاتلوهم حتى لا تكون فتنة.' السياق الكامل يكشف قواعد اشتباك دفاعية بحدود صارمة. منهجية الأزهر تطالب بألا تُفسر أي آية بدون أسبابها والآيات المحيطة وموقعها في الترتيب المكي/المدني.",
      rewriteRuleEn: "NEVER accept a single verse without reading the verses BEFORE and AFTER it. The Asbab al-Nuzul is the kill-switch against decontextualization.",
      rewriteRuleAr: "لا تقبل أبداً آية واحدة بدون قراءة الآيات قبلها وبعدها. أسباب النزول هي مفتاح القفل ضد اقتطاع السياق.",
      egyptianCaseIds: [9],
    },
    {
      layerNumber: 4,
      weaponNameEn: "The Fitna Timing Shield",
      weaponNameAr: "درع توقيت الفتنة",
      methodologyTagEn: "Amman Message 2004 + Historical Siyaq",
      methodologyTagAr: "رسالة عمّان ٢٠٠٤ + السياق التاريخي",
      cognitiveProtocolEn: "The Danish Cartoons crisis is the textbook case of Weaponized Timing in religion. The cartoons were published in September 2005. There was almost NO reaction for MONTHS. Then, in January 2006, ORGANIZED groups deliberately circulated even MORE offensive (fabricated) images that were NOT in the original publication, timed precisely to coincide with the Hajj season when Muslim emotions peak. The MONTHS-DELAYED organized rage was a Layer 4 operation. The Amman Message of 2004 provides the shield: it is a historic global consensus signed by 200+ scholars from 50 countries, forbidding the exploitation of religious emotions for political violence. When a manipulator TIME-RELEASES a religious provocation during Ramadan, during political crisis, or during a funeral, the rebuilt mind asks: 'Why NOW? Who benefits from my rage at THIS specific moment? Is this genuine religious concern or manufactured Fitna?'",
      cognitiveProtocolAr: "أزمة الرسوم الدنماركية هي الحالة النموذجية للتوقيت المسلح في الدين. نُشرت الرسوم في سبتمبر ٢٠٠٥. لم يكن هناك أي رد فعل تقريباً لأشهر. ثم في يناير ٢٠٠٦، وزعت مجموعات منظمة عمداً صوراً أكثر إساءة (ملفقة) لم تكن في المنشور الأصلي، موقتة بالتحديد لتتزامن مع موسم الحج عندما تبلغ مشاعر المسلمين ذروتها. الغضب المنظم المتأخر بأشهر كان عملية طبقة ٤. رسالة عمّان ٢٠٠٤ توفر الدرع: إجماع عالمي تاريخي وقعه ٢٠٠+ عالم من ٥٠ دولة، يحظر استغلال المشاعر الدينية للعنف السياسي. عندما يُطلق متلاعب استفزازاً دينياً أثناء رمضان أو أزمة سياسية، العقل المعاد بناؤه يسأل: 'لماذا الآن؟ من يستفيد من غضبي في هذه اللحظة بالذات؟'",
      rewriteRuleEn: "If a religious provocation appears during a crisis, during Ramadan, or during a politically charged moment — ASK: Why NOW? Who benefits from my rage at THIS moment?",
      rewriteRuleAr: "إذا ظهر استفزاز ديني أثناء أزمة أو رمضان أو لحظة سياسية مشحونة — اسأل: لماذا الآن؟ من يستفيد من غضبي في هذه اللحظة؟",
      egyptianCaseIds: [52],
    },
    {
      layerNumber: 5,
      weaponNameEn: "The Anti-Takfir Kill-Switch",
      weaponNameAr: "مفتاح القفل ضد التكفير",
      methodologyTagEn: "Amman Message + IIFA (International Islamic Fiqh Academy)",
      methodologyTagAr: "رسالة عمّان + مجمع الفقه الإسلامي الدولي",
      cognitiveProtocolEn: "The Evil Application in religion is Takfir — using REAL Islamic texts to excommunicate, persecute, and kill other Muslims. ISIS used REAL Quranic verses and REAL scholarly citations to justify beheading fellow Muslims as apostates. The knowledge was real; the application was evil. The Amman Message is the HARD KILL-SWITCH: it is a binding consensus forbidding Takfir based on the methodology of the 8 recognized schools of Islamic jurisprudence. No individual, no group, no state has the authority to declare a Muslim an apostate if they follow any of these schools. The IIFA extends this to modern bioethics: when extremists declare IVF or organ donation 'Haram,' the IIFA's vetted global consensus of 57 member states provides the definitive ruling. Evil application of theology is neutralized by the COLLECTIVE weight of institutional scholarship, not individual opinion.",
      cognitiveProtocolAr: "التطبيق الشرير في الدين هو التكفير — استخدام نصوص إسلامية حقيقية لتكفير واضطهاد وقتل مسلمين آخرين. داعش استخدم آيات قرآنية حقيقية واستشهادات علمية حقيقية لتبرير ذبح مسلمين كمرتدين. المعرفة كانت حقيقية؛ التطبيق كان شريراً. رسالة عمّان هي مفتاح القفل الصلب: إجماع ملزم يحظر التكفير بناءً على منهجية المذاهب الثمانية المعترف بها. لا فرد ولا جماعة ولا دولة لها سلطة تكفير مسلم يتبع أياً من هذه المذاهب. مجمع الفقه الدولي يمدد هذا للأخلاقيات الحيوية الحديثة: عندما يعلن متطرفون أن أطفال الأنابيب أو التبرع بالأعضاء 'حرام'، إجماع المجمع المكون من ٥٧ دولة يوفر الحكم القاطع.",
      rewriteRuleEn: "No human being has the authority to excommunicate another Muslim who follows any of the 8 recognized schools. The Amman Message is the kill-switch. Full stop.",
      rewriteRuleAr: "لا يملك أي إنسان سلطة تكفير مسلم آخر يتبع أياً من المذاهب الثمانية المعترف بها. رسالة عمّان هي مفتاح القفل. انتهى.",
      egyptianCaseIds: [9],
    },
    {
      layerNumber: 6,
      weaponNameEn: "Taqleed A'ma Detection (Blind Following Scanner)",
      weaponNameAr: "كاشف التقليد الأعمى",
      methodologyTagEn: "Quranic Anti-Blind-Following Framework",
      methodologyTagAr: "الإطار القرآني لمناهضة التقليد الأعمى",
      cognitiveProtocolEn: "The Matrix of Manipulation in Egypt's religious context is the fusion of ALL layers through the family WhatsApp group. A fabricated voice note from 'a doctor at Qasr Al-Ainy' (Layer 1) filtered through cultural authority (Layer 2), stripped of medical context (Layer 3), timed during COVID peak panic (Layer 4), delivered through the most trusted vector: family (Layer 6). The Religion Hub's weapon is the Quranic condemnation of Taqleed a'ma itself. Quran 2:170: 'When it is said to them, Follow what God has revealed, they say, No, we follow what we found our fathers doing.' Quran 31:21 repeats the same condemnation. The rebuilt mind recognizes that blind obedience to cultural-religious authority WITHOUT verification is the EXACT sin the Quran condemns in the polytheists. The Matrix breaks when the user realizes that questioning authority is not blasphemy — it is a Quranic command.",
      cognitiveProtocolAr: "مصفوفة التلاعب في السياق الديني المصري هي دمج كل الطبقات عبر مجموعة واتساب العائلة. رسالة صوتية ملفقة من 'دكتور في قصر العيني' (طبقة ١) مفلترة بسلطة ثقافية (طبقة ٢) مقتطعة من السياق الطبي (طبقة ٣) موقتة أثناء ذروة ذعر كورونا (طبقة ٤) موصلة عبر أكثر ناقل موثوق: العائلة (طبقة ٦). سلاح المحور الديني: الإدانة القرآنية للتقليد الأعمى نفسه. البقرة ١٧٠: 'وإذا قيل لهم اتبعوا ما أنزل الله قالوا بل نتبع ما ألفينا عليه آباءنا.' لقمان ٢١ يكرر نفس الإدانة. العقل المعاد بناؤه يدرك أن الطاعة العمياء للسلطة الثقافية-الدينية بدون تحقق هي بالضبط الذنب الذي يدينه القرآن في المشركين.",
      rewriteRuleEn: "Blind following of cultural-religious authority WITHOUT verification is the EXACT sin the Quran condemns in the polytheists (2:170). Questioning is not blasphemy — it is obedience.",
      rewriteRuleAr: "الاتباع الأعمى للسلطة الثقافية-الدينية بدون تحقق هو بالضبط الذنب الذي يدينه القرآن في المشركين (٢:١٧٠). التساؤل ليس كفراً — بل هو طاعة.",
      egyptianCaseIds: [50, 42],
    },
    {
      layerNumber: 7,
      weaponNameEn: "Al-Haqq Sovereignty (Allegiance to Absolute Truth)",
      weaponNameAr: "سيادة الحق (الولاء للحقيقة المطلقة)",
      methodologyTagEn: "Ash'ari/Maturidi Theology + Tazkiyat al-Nafs",
      methodologyTagAr: "لاهوت الأشاعرة/الماتريدية + تزكية النفس",
      cognitiveProtocolEn: "The Mega-Machine operates by making every human allegiance CONDITIONAL — loyal to tribe, nation, political party, sect. The Ash'ari and Maturidi theological tradition, upheld by Al-Azhar, offers the ultimate defense: the concept of Al-Haqq (The Absolute Truth) as one of the 99 Names of God. If God IS Truth, then seeking truth is the highest form of worship. No tribe, no algorithm, no Architect can claim higher allegiance. The user's identity is decoupled from every earthly loyalty and anchored ONLY to Al-Haqq. When the Architect's algorithm tries to polarize the user into a sect, a political camp, or an ideological tribe, the sovereign mind responds: 'My allegiance is to Al-Haqq alone. If the evidence shows my tribe is wrong, I follow the evidence. If the evidence shows my enemy is right, I acknowledge it. No algorithm can override my allegiance to God-as-Truth.'",
      cognitiveProtocolAr: "الآلة الكبرى تعمل بجعل كل ولاء بشري مشروطاً — الولاء للقبيلة، الوطن، الحزب السياسي، الطائفة. التقليد اللاهوتي الأشعري والماتريدي الذي يتبناه الأزهر يقدم الدفاع النهائي: مفهوم الحق كأحد أسماء الله الحسنى. إذا كان الله هو الحق، فإن البحث عن الحقيقة هو أعلى أشكال العبادة. لا قبيلة، ولا خوارزمية، ولا مهندس يمكنه ادعاء ولاء أعلى. هوية المستخدم تُفصل عن كل ولاء أرضي وتُرسى فقط على الحق. عندما تحاول خوارزمية المهندس استقطاب المستخدم إلى طائفة أو معسكر سياسي أو قبيلة أيديولوجية، العقل السيادي يرد: 'ولائي للحق وحده. إذا أظهرت الأدلة أن قبيلتي مخطئة، أتبع الأدلة. إذا أظهرت الأدلة أن عدوي محق، أعترف بذلك.'",
      rewriteRuleEn: "My allegiance is to Al-Haqq (God-as-Truth) alone. No tribe, no algorithm, no Architect can override this. If the evidence contradicts my tribe, I follow the evidence.",
      rewriteRuleAr: "ولائي للحق وحده. لا قبيلة، لا خوارزمية، لا مهندس يمكنه تجاوز هذا. إذا تناقضت الأدلة مع قبيلتي، أتبع الأدلة.",
      egyptianCaseIds: [7],
    },
  ],
};

// ═══════════════════════════════════════════════════════════════
// EXPORT ALL LENSES
// ═══════════════════════════════════════════════════════════════
export const ENGINE_COMBAT_LENSES: Record<string, EngineCombatLens> = {
  "mental-health": mentalHealthLens,
  "deepreal": deeprealLens,
  "religion-hub": religionHubLens,
};
