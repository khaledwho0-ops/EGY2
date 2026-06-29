import type { PageGuide } from "@/data/page-guides";

export const P4: Record<string, PageGuide> = {
  "/skills": {
    title: "Skills Self-Assessment",
    titleAr: "تقييم المهارات الذاتي",
    scenarios: [
      {
        paste: "I rate my source-verification at 2/5 — how do I level up?",
        pasteAr: "أنا مقيّم نفسي 2 من 5 في التحقق من المصادر — أرفع المستوى إزاي؟",
        note: "Ask the assistant to turn a low skill score into a practice plan.",
        noteAr: "اطلب من المساعد يحوّل الدرجة المنخفضة لخطة تمرين.",
      },
    ],
    useCases: [
      {
        help: "Lets you self-rate 8 cognitive-defense skills (Critical Thinking, Statistical Literacy, SIFT source verification, Emotional Regulation, Islamic Literacy, OSINT, Debate, Media Literacy) on a 1-5 radar and saves it locally.",
        helpAr: "بيخليك تقيّم نفسك في 8 مهارات للدفاع المعرفي (التفكير النقدي، الإلمام الإحصائي، التحقق من المصادر SIFT، التنظيم العاطفي، الثقافة الإسلامية، OSINT، المناظرة، الثقافة الإعلامية) على رادار من 1 لـ5 ويحفظها محليًا.",
        apply: "Score yourself honestly, find your weakest spokes, then drill them with the matching exercises before believing or sharing claims.",
        applyAr: "قيّم نفسك بصراحة، لاقي أضعف نقاطك، ودرّبها بالتمارين المناسبة قبل ما تصدّق أو تشارك أي ادعاء.",
      },
    ],
    chatbotContext:
      "You are the assistant on the Skills Self-Assessment page (/skills). It is a client-side radar where the user rates 8 cognitive-defense skills (Critical Thinking, Statistical Literacy, Source Verification/SIFT, Emotional Regulation, Islamic Literacy, OSINT, Debate, Media Literacy) from 1-5 (saved to localStorage); each skill cites a real framework (Paul-Elder, Gigerenzer, Caulfield/SIFT, Gross, Toulmin). It is self-report, not a graded test, so never present a score as an objective measurement. Help the user interpret their radar and pick drills; if you lack a sourced fact, say غير موثّق / Unverified.",
  },
  "/arabic-shield": {
    title: "Arabic Manipulation Shield",
    titleAr: "درع التلاعب العربي",
    scenarios: [
      {
        paste: "عاجل وخطير جداً! أكد خبراء أمريكان إن المياه بتسبب السرطان — انشر قبل فوات الأوان!",
        pasteAr: "عاجل وخطير جداً! أكد خبراء أمريكان إن المياه بتسبب السرطان — انشر قبل فوات الأوان!",
        note: "Packs fear, false authority and urgency into one line — watch the technique badges light up.",
        noteAr: "بيجمع خوف وسلطة زائفة واستعجال في سطر واحد — شوف شارات الأساليب بتولّع.",
      },
    ],
    useCases: [
      {
        help: "Paste any Arabic text and it instantly scores manipulation, naming the techniques (fear-mongering, emotional manipulation, false authority, false urgency) and flagging the exact trigger words.",
        helpAr: "الصق أي نص عربي وبيقيّم التلاعب فورًا، ويسمّي الأساليب (بث الخوف، التلاعب العاطفي، السلطة الزائفة، الاستعجال الزائف) ويعلّم الكلمات المحفّزة بالظبط.",
        apply: "Before forwarding a dramatic WhatsApp/Facebook post, run it here; if it scores high on urgency + authority, pause and verify the source first.",
        applyAr: "قبل ما تعيد توجيه بوست درامي على واتساب/فيسبوك، شغّله هنا؛ لو طلع عالي في الاستعجال + السلطة، استنى وتحقق من المصدر الأول.",
      },
    ],
    chatbotContext:
      "You are the assistant on the Arabic Manipulation Shield page (/arabic-shield). It runs a client-side Arabic keyword analyzer that scores a pasted text for manipulation and labels techniques (fear-mongering, emotional manipulation, authority appeal, false urgency) with the trigger words it matched, plus a suggested calm response. It detects rhetorical patterns, not factual truth, so a low score does not prove a claim is true. Never invent a source, statistic, or hadith grade; when a claim is unsourced say غير موثّق / Unverified.",
  },
  "/check-image": {
    title: "Check a Screenshot (OCR)",
    titleAr: "افحص لقطة شاشة (OCR)",
    scenarios: [
      {
        paste: "[Upload a screenshot of a viral WhatsApp health warning]",
        pasteAr: "[ارفع لقطة شاشة لتحذير صحي منتشر على واتساب]",
        note: "The page reads the text from the image, then runs the claim through the One-Law source check.",
        noteAr: "الصفحة بتقرأ النص من الصورة، وبعدين بتفحص الادعاء حسب قانون المصدر الواحد.",
      },
    ],
    useCases: [
      {
        help: "Upload a viral image (PNG/JPG/WebP); OCR extracts its text and the One-Law pipeline returns a verdict with real cited sources — or a loud UNVERIFIED if none exist.",
        helpAr: "ارفع صورة منتشرة (PNG/JPG/WebP)؛ الـOCR بيستخرج نصها وخط المعالجة بيرجّع حُكم بمصادر حقيقية موثّقة — أو UNVERIFIED واضح لو مفيش مصادر.",
        apply: "When someone sends a screenshot 'proving' something, upload it here and share the cited verdict back instead of the screenshot.",
        applyAr: "لما حد يبعتلك سكرين شوت 'بيثبت' حاجة، ارفعها هنا وابعت الحُكم الموثّق بدل الصورة.",
      },
    ],
    chatbotContext:
      "You are the assistant on the Check-a-Screenshot page (/check-image). The user uploads an image; it POSTs to /api/forensic/ocr, which runs OCR to read the text and then runs the One-Law enforcement pipeline, returning an enforcement status (verified/unverified), a source tier, and a list of admissible cited sources. OCR text can be imperfect, and an unverified result means no admissible source was found — not that the claim is false. Never fabricate a source or grade; if unsourced, report غير موثّق / Unverified.",
  },
  "/curriculum/phase0": {
    title: "Phase 0: Psychological Calibration",
    titleAr: "المرحلة 0: المعايرة النفسية",
    scenarios: [
      {
        paste: "What does Day 11 'Lateral Reading (SIFT)' actually train?",
        pasteAr: "اليوم 11 'القراءة الجانبية SIFT' بيدرّب على إيه بالظبط؟",
        note: "Ask the assistant to explain any of the 28 days before you start it.",
        noteAr: "اسأل المساعد يشرح أي يوم من الـ28 قبل ما تبدأه.",
      },
    ],
    useCases: [
      {
        help: "A 28-day calibration track (14 days active) covering MIST-20 baseline, bias fingerprinting, the SIFT method, base-rate neglect, and cognitive-immunity scoring, with local progress tracking.",
        helpAr: "مسار معايرة 28 يوم (14 يوم نشط) بيغطي خط أساس MIST-20، بصمة التحيز، طريقة SIFT، إهمال المعدل الأساسي، ودرجة المناعة المعرفية، مع تتبع تقدم محلي.",
        apply: "Do one short day at a time; your weakest results here tell you which tools (DeepReal, Evidence Search, Religion Hub) to lean on most.",
        applyAr: "اعمل يوم قصير في المرة؛ أضعف نتائجك هنا بتقولك تعتمد أكتر على أنهي أدوات (ديب ريل، بحث الأدلة، مركز الدين).",
      },
    ],
    chatbotContext:
      "You are the assistant on the Phase 0: Psychological Calibration page (/curriculum/phase0). It lists a 28-day inoculation/calibration program (Days 1-14 active, 15-28 'coming soon') — baseline assessments (MIST-20, GHSQ), bias drills, SIFT lateral reading, statistics, and a Level-1 'passport' — reading completion from local progress storage. It is an educational schedule, not a clinical diagnosis. Help the user understand each day and what to practice; never fabricate research citations or scores — if unsourced, say غير موثّق / Unverified.",
  },
  "/deepreal": {
    title: "DeepReal Forensics Hub",
    titleAr: "مركز ديب ريل للتحليل الجنائي",
    scenarios: [
      {
        paste: "Which DeepReal tool should I use for a suspicious voice note?",
        pasteAr: "أنهي أداة في ديب ريل أستخدمها لرسالة صوتية مشبوهة؟",
        note: "The hub routes you to the right forensic tool (image, video, audio, C2PA).",
        noteAr: "المركز بيوجّهك للأداة الجنائية الصح (صورة، فيديو، صوت، C2PA).",
      },
    ],
    useCases: [
      {
        help: "A landing hub for the media-forensics suite: Image Forensics (ELA/noise/clone), Video deepfake analysis, Audio voice-clone detection, and C2PA Content Credentials verification.",
        helpAr: "مركز بوابة لمجموعة تحليل الوسائط الجنائي: تحليل الصور (ELA/تشويش/استنساخ)، كشف تزييف الفيديو، كشف استنساخ الصوت، والتحقق من C2PA.",
        apply: "Got a suspicious image, clip, or voice note? Start here and the hub sends you to the matching forensic tool.",
        applyAr: "عندك صورة أو مقطع أو رسالة صوتية مشبوهة؟ ابدأ من هنا والمركز هيبعتك للأداة المناسبة.",
      },
    ],
    chatbotContext:
      "You are the assistant on the DeepReal Forensics Hub page (/deepreal). It is a navigation hub, not an analyzer: it links out to four forensic tools — Image Forensics (/forensic-image), Video Analysis (/deepreal-forensics), Audio Check (/deepreal-upload), and C2PA Verification (/forensic-c2pa) — and has a drag-drop area that only lists filenames. Forensic signals are probabilistic, not proof. Direct the user to the right tool and explain what each checks; never assert a media file is fake/real without the tool's evidence, and if unsourced say غير موثّق / Unverified.",
  },
  "/demo": {
    title: "Cognitive Fortress Dashboard (Demo)",
    titleAr: "لوحة الحصن المعرفي (عرض)",
    scenarios: [
      {
        paste: "Explain the Maqasid impact list shown on this demo (NAFS, MAL, DIN).",
        pasteAr: "اشرح قائمة تأثير المقاصد المعروضة في العرض ده (النفس، المال، الدين).",
        note: "Ask the assistant to walk through the demo's example case.",
        noteAr: "اطلب من المساعد يشرح القضية المثال في العرض.",
      },
    ],
    useCases: [
      {
        help: "A guided demo dashboard showcasing the platform's architecture: a 3D Source Pyramid, a Maqasid reasoning check, and a worked example mapping a harmful practice to its harms on religion, life, and property.",
        helpAr: "لوحة عرض إرشادية بتعرض بنية المنصة: هرم مصادر ثلاثي الأبعاد، فحص استدلال المقاصد، ومثال محلول بيربط ممارسة ضارة بأضرارها على الدين والنفس والمال.",
        apply: "Use it as a quick tour to understand how EAL grades sources and reasons about harm before diving into the real tools.",
        applyAr: "استخدمها كجولة سريعة تفهم بيها إزاي المنصة بتقيّم المصادر وبتحلل الضرر قبل ما تدخل الأدوات الحقيقية.",
      },
    ],
    chatbotContext:
      "You are the assistant on the Cognitive Fortress demo dashboard (/demo). It is a showcase/tour page presenting the platform's defense architecture — an interactive 3D Source Pyramid, a Maqasid al-Shariah reasoning check, and a sample case showing how a harmful practice maps to harms (NAFS/life, MAL/property, DIN/religion). The case content is illustrative. Help the user understand the concepts; never present demo examples as verified rulings or facts, and where a source is missing say غير موثّق / Unverified.",
  },
  "/family-kit": {
    title: "Family Protection Kit",
    titleAr: "حقيبة حماية العائلة",
    scenarios: [
      {
        paste: "My mom keeps forwarding health 'cures' — give me a kind reply to send her.",
        pasteAr: "أمي بتبعت 'علاجات' صحية على طول — ادّيني رد لطيف أبعتهولها.",
        note: "Ask for the gentle WhatsApp template that fits your situation.",
        noteAr: "اطلب قالب واتساب اللطيف اللي يناسب موقفك.",
      },
    ],
    useCases: [
      {
        help: "Gives you ready bilingual WhatsApp reply templates (health, political, religious misinformation) plus a 5-question quick-check card to gently correct family without a fight.",
        helpAr: "بيديك قوالب ردود واتساب جاهزة بلغتين (صحة، سياسة، دين) وكارت 5 أسئلة فحص سريع عشان تصحّح للعيلة بلطف من غير خناق.",
        apply: "When a relative shares something false, copy the matching template, add the official source link, and send it warmly instead of arguing.",
        applyAr: "لما قريب يشارك حاجة غلط، انسخ القالب المناسب، حط لينك المصدر الرسمي، وابعته بدفء بدل ما تتخانق.",
      },
    ],
    chatbotContext:
      "You are the assistant on the Family Protection Kit page (/family-kit). It is a content/template page (no analysis API): bilingual copy-paste WhatsApp scripts for replying to health, political, and misattributed-religious misinformation, plus a 5-question 'quick check' card (original source? date/author? Googled it? makes you angry/scared? would you bet money?). Templates leave a [link] placeholder for the user to fill with a real official source. Help the user pick and personalize a template; never invent the official source or a hadith grade — if unknown, say غير موثّق / Unverified.",
  },
  "/health-data": {
    title: "WHO Health Data Explorer",
    titleAr: "مستكشف بيانات الصحة (WHO)",
    scenarios: [
      {
        paste: "life expectancy",
        pasteAr: "العمر المتوقع",
        note: "Search a WHO indicator, then click it to pull the real country time-series.",
        noteAr: "ابحث عن مؤشر WHO، وبعدين دوس عليه تجيب السلسلة الزمنية الحقيقية للدول.",
      },
    ],
    useCases: [
      {
        help: "Searches the official WHO Global Health Observatory for indicators (mortality, life expectancy, immunization…) and charts the real underlying data, so health claims can be checked against the source.",
        helpAr: "بيبحث في مرصد الصحة العالمي الرسمي (WHO) عن المؤشرات (الوفيات، العمر المتوقع، التطعيم…) ويرسم البيانات الحقيقية، عشان تتحقق من الادعاءات الصحية من المصدر.",
        apply: "When a post throws a scary health statistic, search the indicator here and compare it to the actual WHO numbers.",
        applyAr: "لما بوست يرمي إحصائية صحية مخيفة، ابحث عن المؤشر هنا وقارنه بأرقام WHO الفعلية.",
      },
    ],
    chatbotContext:
      "You are the assistant on the WHO Health Data Explorer page (/health-data). The user types a query that hits /api/medical/who?type=indicators; selecting an indicator fetches its time-series via type=data and charts it. All numbers come from the WHO Global Health Observatory — cite WHO as the source and never invent figures, country values, or trends not returned by the API. If a number is not in the data, say غير موثّق / Unverified rather than guessing.",
  },
  "/manipulation-cards": {
    title: "Manipulation Techniques Deck",
    titleAr: "أوراق أساليب التلاعب",
    scenarios: [
      {
        paste: "Show me the counter to 'Appeal to False Authority'.",
        pasteAr: "وريني الرد على 'الاحتكام لسلطة زائفة'.",
        note: "Ask for any card's defense move and a real Egyptian example.",
        noteAr: "اطلب حركة الدفاع لأي ورقة ومثال مصري حقيقي.",
      },
    ],
    useCases: [
      {
        help: "A browsable deck of manipulation techniques, each tagged by FLICC category (Fake experts, Logical fallacy, Impossible expectations, Cherry-picking, Conspiracy) with how it works, a name-free Egyptian example, and a counter.",
        helpAr: "مجموعة أوراق قابلة للتصفّح لأساليب التلاعب، كل ورقة متصنّفة بفئة FLICC (خبراء زائفون، مغالطة منطقية، توقعات مستحيلة، انتقاء الأدلة، مؤامرة) مع طريقة عملها ومثال مصري بدون أسماء والرد عليها.",
        apply: "Learn one card a day; when you spot a real post using that move, deploy the listed counter calmly.",
        applyAr: "اتعلم ورقة في اليوم؛ ولما تشوف بوست حقيقي بيستخدم الحركة دي، طبّق الرد المذكور بهدوء.",
      },
    ],
    chatbotContext:
      "You are the assistant on the Manipulation Techniques Deck page (/manipulation-cards). It renders a self-contained set of cards drawn from the platform's FLICC taxonomy (John Cook) and the scientific/Islamic fallacy datasets; each card has a bilingual name, the psychological mechanism, a deliberately name-free Egyptian example, a counter, and a real source where one applies. It teaches recognition, not verdicts on specific claims. Stay faithful to the card content; never fabricate a source or hadith grade — if unsourced, say غير موثّق / Unverified.",
  },
  "/nvidia-hub": {
    title: "NVIDIA AI Stack (Honesty Hub)",
    titleAr: "حزمة NVIDIA للذكاء الاصطناعي",
    scenarios: [
      {
        paste: "Does NVIDIA Nemotron 550B power all the tools on this site?",
        pasteAr: "هل NVIDIA Nemotron 550B هو اللي بيشغّل كل أدوات الموقع؟",
        note: "The honest answer: no — it is the slow last-resort slot in the rotator.",
        noteAr: "الإجابة الصادقة: لأ — ده الخيار البطيء الأخير في المُدوِّر.",
      },
    ],
    useCases: [
      {
        help: "Explains, honestly, where NVIDIA models actually fit on EAL: Nemotron 550B is the slow last-resort rotator slot, while the real NVIDIA-specific roles are Content Safety and the deepfake/synthetic-video showcase.",
        helpAr: "بيشرح بصدق فين نماذج NVIDIA بتشتغل فعلًا في المنصة: Nemotron 550B هو خانة الملاذ الأخير البطيئة، بينما الأدوار الفعلية لـNVIDIA هي أمان المحتوى وعرض كشف التزييف العميق.",
        apply: "Read it to understand which AI does what here, so you do not over-trust any single 'big model' label.",
        applyAr: "اقرأها عشان تفهم أنهي ذكاء بيعمل إيه هنا، فمتثقش زيادة في أي اسم 'موديل ضخم'.",
      },
    ],
    chatbotContext:
      "You are the assistant on the NVIDIA AI Stack page (/nvidia-hub). It is an informational/transparency page describing how NVIDIA models fit into EAL's Gemini-first MegaRotator (Gemini → Groq → OpenRouter → Cerebras → Together → SambaNova → NVIDIA last); Nemotron 550B is the slow last-resort slot, and the genuine NVIDIA-specific roles are Content Safety and the deepfake/synthetic-video showcase. Keep this honesty framing — do not overstate that NVIDIA 'powers' the tools. Never invent benchmarks or specs; if a figure is unsourced, say غير موثّق / Unverified.",
  },
  "/philosophy": {
    title: "Philosophy & Method",
    titleAr: "الفلسفة والمنهج",
    scenarios: [
      {
        paste: "What is the 'backfire effect' and why does this platform avoid pure fact-checking?",
        pasteAr: "إيه هو 'تأثير النتيجة العكسية' وليه المنصة بتتجنب التحقق من الحقائق وحده؟",
        note: "Ask the assistant to summarize the page's inoculation-theory argument with its citations.",
        noteAr: "اطلب من المساعد يلخّص حجة نظرية التلقيح في الصفحة بمصادرها.",
      },
    ],
    useCases: [
      {
        help: "Lays out EAL's method: why reactive fact-checking alone fails, and how inoculation theory (prebunking) builds cognitive immunity — each claim backed by real academic citations.",
        helpAr: "بتعرض منهج المنصة: ليه التحقق من الحقائق وحده بيفشل، وإزاي نظرية التلقيح (التحصين المسبق) بتبني مناعة معرفية — كل ادعاء مدعوم بمصادر أكاديمية حقيقية.",
        apply: "Read it to understand WHY the tools are built this way, then commit to the curriculum instead of just debunking single posts.",
        applyAr: "اقرأها عشان تفهم ليه الأدوات مبنية كده، وبعدين التزم بالمنهج بدل ما تفنّد بوستات فردية بس.",
      },
    ],
    chatbotContext:
      "You are the assistant on the Philosophy & Method page (/philosophy). It is a manifesto explaining EAL's approach — the limits of reactive fact-checking, the backfire effect, and inoculation theory (McGuire, Compton, Roozenbeek, van der Linden, Cook, Lewandowsky) underpinning the curriculum — each section carrying a real citation and an 8-layer deception reference. Quote only the citations actually shown on the page; never invent a study, author, or stat. If asked about a source not present, say غير موثّق / Unverified.",
  },
  "/religion-hub": {
    title: "Islamic Verification Hub",
    titleAr: "مركز التحقق الإسلامي",
    scenarios: [
      {
        paste: "Which tool checks if a hadith is authentic, and which collections does it use?",
        pasteAr: "أنهي أداة بتتحقق إن الحديث صحيح، وبتستخدم أنهي مجموعات؟",
        note: "Ask the hub to route you to the right Islamic tool.",
        noteAr: "اطلب من المركز يوجّهك للأداة الإسلامية الصح.",
      },
    ],
    useCases: [
      {
        help: "A hub linking 9 Islamic-verification tools: Hadith Checker, Fatwa Context, Quran Context, Sectarian Detector, Authority Verifier, Zakat Calculator, Mawarith, Halal Finance, and Maqasid Check.",
        helpAr: "مركز بيربط 9 أدوات تحقق إسلامية: مدقق الأحاديث، سياق الفتوى، سياق القرآن، كاشف الطائفية، محقق السلطة، حاسبة الزكاة، المواريث، التمويل الحلال، وفحص المقاصد.",
        apply: "Before believing a forwarded 'hadith' or sheikh clip, open the matching tool here and check it against real collections and Dar Al-Ifta.",
        applyAr: "قبل ما تصدّق 'حديث' أو مقطع شيخ متبعت لك، افتح الأداة المناسبة هنا وتحقق من المجموعات الحقيقية ودار الإفتاء.",
      },
    ],
    chatbotContext:
      "You are the assistant on the Islamic Verification Hub page (/religion-hub). It is a navigation hub linking 9 tools (Hadith Checker via the Fawazahmed0 API across Bukhari/Muslim/Tirmidhi and more, Fatwa Context vs Dar Al-Ifta, Quran Context, Sectarian Detector, Authority Verifier, Zakat Calculator, Mawarith, Halal Finance, Maqasid Check). This is the most sensitive One-Law domain: NEVER state or invent a hadith grade (sahih/da'if), a fatwa, or a scholarly ruling yourself — route the user to the proper tool, and if authenticity is unconfirmed say غير موثّق / Unverified.",
  },
  "/religion-hub/tools/mawarith": {
    title: "Mawarith (Inheritance) Calculator",
    titleAr: "حاسبة المواريث",
    scenarios: [
      {
        paste: "Estate 1,200,000 EGP, deceased male, 1 wife, 2 sons, 1 daughter, mother alive.",
        pasteAr: "التركة 1,200,000 جنيه، المتوفى ذكر، زوجة واحدة، ولدين وبنت، الأم على قيد الحياة.",
        note: "Enter the heirs and estate value to see each Quranic share computed.",
        noteAr: "أدخل الورثة وقيمة التركة عشان تشوف نصيب كل وارث محسوب حسب القرآن.",
      },
    ],
    useCases: [
      {
        help: "Computes Islamic inheritance shares from the estate value and heirs (spouse, sons, daughters, father, mother) using the Quranic fractions (e.g. wife 1/8 with children, husband 1/4 with children, parents 1/6).",
        helpAr: "بتحسب أنصبة الميراث من قيمة التركة والورثة (الزوج/ة، الأبناء، البنات، الأب، الأم) بالكسور القرآنية (مثلًا الزوجة 1/8 مع الأولاد، الزوج 1/4 مع الأولاد، الوالدين 1/6).",
        apply: "Use it for a first estimate of shares, then confirm complex cases ('awl, radd, blocked heirs) with a qualified scholar.",
        applyAr: "استخدمها لتقدير مبدئي للأنصبة، وبعدين أكّد الحالات المعقدة (العول، الرد، الحجب) مع عالم مؤهل.",
      },
    ],
    chatbotContext:
      "You are the assistant on the Mawarith Inheritance Calculator page (/religion-hub/tools/mawarith). It takes the estate value, the deceased's gender, and heir counts (spouse, sons, daughters, father, mother) and applies Quranic fixed shares (Quran 4:11-12). The on-page logic is simplified and does NOT handle every edge case ('awl, radd, hajb, grandparents, siblings, residuary distribution), so present results as estimates and direct complex estates to a qualified scholar or Dar Al-Ifta. Never invent a ruling for an uncovered case — say غير موثّق / Unverified and refer out.",
  },
  "/self-test-protocol": {
    title: "Self-Test Research Protocol",
    titleAr: "بروتوكول الاختبار الذاتي البحثي",
    scenarios: [
      {
        paste: "What are the falsifiable hypotheses and success criteria in this protocol?",
        pasteAr: "إيه الفرضيات القابلة للتفنيد ومعايير النجاح في البروتوكول ده؟",
        note: "Ask the assistant to summarize the protocol's instruments and measurement schedule.",
        noteAr: "اطلب من المساعد يلخّص أدوات البروتوكول وجدول القياس.",
      },
    ],
    useCases: [
      {
        help: "Documents EAL's research methodology: validated instruments and their readiness, falsifiable hypotheses, sampling strategy, measurement schedule, and pre-registered success criteria.",
        helpAr: "بيوثّق منهجية البحث في المنصة: الأدوات المُحقَّقة وجاهزيتها، الفرضيات القابلة للتفنيد، استراتيجية العينة، جدول القياس، ومعايير النجاح المُسجَّلة مسبقًا.",
        apply: "Read it to judge whether the platform's effectiveness claims are testable and honestly measured before trusting them.",
        applyAr: "اقرأه عشان تحكم هل ادعاءات فعالية المنصة قابلة للاختبار ومقاسة بصدق قبل ما تثق فيها.",
      },
    ],
    chatbotContext:
      "You are the assistant on the Self-Test Research Protocol page (/self-test-protocol). It is a static methodology page rendering data on instrument readiness, the research/evaluation protocol, falsifiable hypotheses, sampling strategy, measurement schedule, and success criteria, with readiness badges (ready/blocked/pending). It describes how EAL plans to measure itself, not user-specific results. Report only what the page's data states; never invent a metric, p-value, or readiness status — if not present, say غير موثّق / Unverified.",
  },
  "/threat-briefing": {
    title: "Daily Threat Briefing",
    titleAr: "إحاطة التهديد اليومية",
    scenarios: [
      {
        paste: "What's today's top misinformation threat in Egypt and what should I practice?",
        pasteAr: "إيه أكبر تهديد تضليل النهارده في مصر وأدرّب على إيه؟",
        note: "The briefing pulls live fact-check threats and ties each to a curriculum exercise.",
        noteAr: "الإحاطة بتجيب تهديدات التحقق الحية وبتربط كل واحد بتمرين من المنهج.",
      },
    ],
    useCases: [
      {
        help: "Shows a live daily misinformation threat level for Egypt across Health, Economy, Politics, Religion, Science, and Food Safety, with today's focus topic linked to a curriculum exercise.",
        helpAr: "بتعرض مستوى تهديد التضليل اليومي الحي لمصر عبر الصحة والاقتصاد والسياسة والدين والعلم وسلامة الغذاء، مع موضوع اليوم مربوط بتمرين من المنهج.",
        apply: "Check it each morning to know which kind of fake content is circulating now, then do the linked drill.",
        applyAr: "بصّ عليها كل صباح تعرف نوع المحتوى المزيّف اللي بينتشر دلوقتي، وبعدين اعمل التمرين المربوط.",
      },
    ],
    chatbotContext:
      "You are the assistant on the Daily Threat Briefing page (/threat-briefing). It queries live sources (Google Fact Check API plus sentiment/ClaimBuster-style scoring) across Egypt-relevant topics (health, economy, politics, religion, science, food safety), assigns an overall threat level (high/medium/low), and pairs the day's focus with a specific curriculum exercise/track. Treat each listed item as a flagged claim to verify, not a confirmed fact. Never invent threats, ratings, or sources; if an item is unsourced, say غير موثّق / Unverified.",
  },
  "/whatsapp-analyzer": {
    title: "WhatsApp Forward Analyzer",
    titleAr: "محلل رسائل واتساب",
    scenarios: [
      {
        paste: "رسالة مهمة جداً!! ابعتها لـ 10 أشخاص حالاً وإلا هيحصل لك مصيبة — دولة بتخبي عليك الحقيقة!",
        pasteAr: "رسالة مهمة جداً!! ابعتها لـ 10 أشخاص حالاً وإلا هيحصل لك مصيبة — دولة بتخبي عليك الحقيقة!",
        note: "A classic chain message — watch the bot/urgency/emotional-framing flags fire.",
        noteAr: "رسالة سلسلة كلاسيكية — شوف مؤشرات الروبوت/الاستعجال/التأطير العاطفي بتشتغل.",
      },
    ],
    useCases: [
      {
        help: "Paste a forwarded WhatsApp message and it scores manipulation probability, flagging bot patterns, emotional framing, and urgency/coordination indicators.",
        helpAr: "الصق رسالة واتساب متبعتة وبيقيّم احتمالية التلاعب، وبيعلّم أنماط الروبوتات والتأطير العاطفي ومؤشرات الاستعجال/التنسيق.",
        apply: "Before forwarding a chain message, run it here; high bot + urgency scores are your signal to stop and not pass it on.",
        applyAr: "قبل ما تعيد توجيه رسالة سلسلة، شغّلها هنا؛ درجات الروبوت + الاستعجال العالية إشارة إنك توقف وما تبعتهاش.",
      },
    ],
    chatbotContext:
      "You are the assistant on the WhatsApp Forward Analyzer page (/whatsapp-analyzer). The user pastes a forwarded message; it POSTs to /api/whatsapp-analyzer (with a client heuristic fallback) and returns a manipulation-probability score plus lists of detected bot patterns, emotional framing, and urgency indicators. It analyzes linguistic/coordination signals, not factual truth, so a high score flags manipulation risk — it does not prove the content false. Never fabricate a source or statistic; when a claim is unsourced, say غير موثّق / Unverified.",
  },
};
