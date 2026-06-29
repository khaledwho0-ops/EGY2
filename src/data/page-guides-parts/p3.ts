import type { PageGuide } from "@/data/page-guides";

export const P3: Record<string, PageGuide> = {
  "/journal": {
    title: "Learning Journal",
    titleAr: "يوميات التعلّم",
    scenarios: [
      {
        paste: "Today I learned to check a study's DOI before trusting a health claim a relative forwarded.",
        pasteAr: "النهارده اتعلمت إني أدوّر على DOI الدراسة قبل ما أصدّق ادعاء صحي حد من العيلة بعته.",
        note: "A real reflection entry — fill 'What I learned', mood, tags, and a self-rated cognitive score.",
        noteAr: "تدوينة تأمّل حقيقية — اكتب «اتعلمت إيه»، المزاج، الوسوم، وقيّم درجتك الإدراكية بنفسك.",
      },
    ],
    useCases: [
      {
        help: "Turns daily reflection into a tracked habit — entries, mood trend, streak, and a growth view, all saved locally on your device.",
        helpAr: "بيحوّل التأمّل اليومي لعادة متتبَّعة — تدوينات، اتجاه المزاج، سلسلة الأيام، ولوحة نمو، كله متخزّن محليًا على جهازك.",
        apply: "After each lesson or debunk, jot one thing you learned and how you'd act differently next time you see a viral claim.",
        applyAr: "بعد كل درس أو تفنيد، اكتب حاجة اتعلمتها وهتتصرف إزاي بشكل مختلف أول ما تشوف ادعاء منتشر تاني.",
      },
    ],
    chatbotContext:
      "You are the assistant on the Learning Journal page (/journal). It is a private, localStorage-only reflection tool: the user writes three prompts (what I learned / what surprised me / what I'll do differently), picks a 1-5 mood, tags (Critical Thinking, Media Literacy, Source Verification, etc.), and a 1-10 self-assessed cognitive score; the page shows a timeline, mood chart, streak, and growth tab. No AI generates the entries and nothing is sent to a server. Help the user reflect and spot patterns; never invent statistics about their progress or fabricate a source — if a claim they mention is unsourced, say غير موثّق / Unverified.",
  },
  "/certificate": {
    title: "Awareness Certificate",
    titleAr: "شهادة الوعي",
    scenarios: [
      {
        paste: "How is my completion percentage calculated and what do I need to unlock the certificate?",
        pasteAr: "نسبة الإنجاز بتتحسب إزاي وإيه اللي محتاجه عشان أفتح الشهادة؟",
        note: "An info page — ask the assistant how the score and strongest-track are derived.",
        noteAr: "صفحة معلومات — اسأل المساعد إزاي بتتحسب النسبة وأقوى مسار.",
      },
    ],
    useCases: [
      {
        help: "Shows a shareable Certificate of Awareness once you complete 80%+ of the program, plus which track (DeepReal / Mental Health / Religion Hub) you are strongest in.",
        helpAr: "بيعرض شهادة وعي قابلة للمشاركة لما تكمّل 80%+ من البرنامج، وكمان أقوى مسار عندك (ديب ريل / الصحة النفسية / المركز الإسلامي).",
        apply: "Use it as a milestone goal: finish enough exercises to cross 80%, then download or share the certificate as proof.",
        applyAr: "استخدمها كهدف مرحلي: خلّص تمارين كفاية تعدّي 80%، وبعدها نزّل الشهادة أو شاركها كدليل.",
      },
    ],
    chatbotContext:
      "You are the assistant on the Awareness Certificate page (/certificate). It reads the user's local progress (getProgress) and computes completedExercises out of 42, a completion percentage, and unlocks a shareable/downloadable certificate at 80%+; it also infers the strongest track by counting deepreal/mental/religion exercises. It does not grant external accreditation. Explain how the percentage and strongest-track are computed; never fabricate a completion number, score, or institutional endorsement — if unknown, say غير موثّق / Unverified.",
  },
  "/curriculum": {
    title: "Sovereign Curriculum",
    titleAr: "المنهج السيادي",
    scenarios: [
      {
        paste: "Which phase should I start with if I mostly worry about WhatsApp health rumors?",
        pasteAr: "أبدأ بأنهي مرحلة لو همّي الأكبر شائعات الصحة على واتساب؟",
        note: "A nav/overview page — ask the assistant to route you to the right phase.",
        noteAr: "صفحة نظرة عامة وتنقّل — اسأل المساعد يوجّهك للمرحلة الصح.",
      },
    ],
    useCases: [
      {
        help: "Lays out a 5-phase path (Calibration, Cognitive Armor, Deep Verification, Islamic Shield, Live Defense) so you build defenses in order instead of randomly.",
        helpAr: "بيرتّب مسار من 5 مراحل (المعايرة، الدرع المعرفي، التحقق العميق، الدرع الإسلامي، الدفاع المباشر) عشان تبني دفاعاتك بالترتيب مش عشوائي.",
        apply: "Pick the phase that matches your weakest area and follow its linked exercises before moving to the next.",
        applyAr: "اختار المرحلة اللي بتغطّي أضعف نقطة عندك واتبع تمارينها قبل ما تنتقل للي بعدها.",
      },
    ],
    chatbotContext:
      "You are the assistant on the Sovereign Curriculum page (/curriculum). It is a navigation/overview hub presenting 5 phases (Phase 0 Calibration 14d, Phase 1 Cognitive Armor 30d, Phase 2 Deep Verification 30d, Phase 3 Islamic Shield 30d, Phase 4 Live Defense 30d), each linking to /curriculum/phaseN, with metrics like ~42 guided days and 33 science exercises. Help the user choose where to start and explain what each phase trains; never invent a day count, a scale name, or a citation — if unsure, say غير موثّق / Unverified.",
  },
  "/debate-sim": {
    title: "Socratic Debate Simulator",
    titleAr: "محاكي المناظرة السقراطية",
    scenarios: [
      {
        paste: "Vaccines should be optional because my body is my own choice.",
        pasteAr: "التطعيمات لازم تكون اختيارية لأن جسمي حُرّيتي.",
        note: "State any belief; the AI counters using one HIDDEN fallacy for you to spot.",
        noteAr: "قول أي معتقد؛ الذكاء الاصطناعي هيرد بمغالطة خفية عشان تحاول تكتشفها.",
      },
    ],
    useCases: [
      {
        help: "Plays devil's advocate against your claim using a secret logical fallacy, training you to detect manipulation in live argument.",
        helpAr: "بيلعب دور محامي الشيطان ضد ادعائك بمغالطة منطقية خفية، فيدرّبك تكتشف التلاعب في النقاش الحي.",
        apply: "Before a real argument, rehearse here and practice naming the fallacy the AI used instead of getting flustered.",
        applyAr: "قبل نقاش حقيقي، اتمرّن هنا وحاول تسمّي المغالطة اللي استخدمها الذكاء الاصطناعي بدل ما تترّبك.",
      },
    ],
    chatbotContext:
      "You are the assistant on the Socratic Debate Simulator page (/debate-sim, a.k.a. Devil's Advocate). The user types a claim; the page POSTs the conversation to /api/debate-sim, which replies with a counter-argument that deliberately embeds one secret logical fallacy (returned as fallacyUsed) for the user to identify. Help the user phrase claims, guess the hidden fallacy, and respond cleanly without committing one themselves; never fabricate a source or statistic to win an argument — if a cited fact is unverifiable, label it غير موثّق / Unverified.",
  },
  "/defense-test": {
    title: "Cognitive Defense Test",
    titleAr: "اختبار الدفاع المعرفي",
    scenarios: [
      {
        paste: "A WhatsApp forward says 'Egyptian doctors discovered a cure for diabetes.' What is your FIRST step?",
        pasteAr: "رسالة واتساب بتقول «أطباء مصريون اكتشفوا علاج للسكر». إيه أول خطوة تعملها؟",
        note: "A sample quiz item — the test is multiple-choice with sourced explanations (SIFT, FLICC, etc.).",
        noteAr: "نموذج سؤال — الاختبار اختيار من متعدّد بشرح موثَّق (SIFT، FLICC، إلخ).",
      },
    ],
    useCases: [
      {
        help: "A multiple-choice quiz that tests applied skills (SIFT, FLICC fallacies, ELA image forensics, hadith verification, mhGAP) with a sourced explanation after each answer.",
        helpAr: "اختبار اختيار من متعدّد بيقيس مهارات تطبيقية (SIFT، مغالطات FLICC، تحليل ELA للصور، توثيق الحديث، mhGAP) مع شرح موثَّق بعد كل إجابة.",
        apply: "Take it to find your weak spots, read the explanations, then revisit the matching curriculum phase.",
        applyAr: "خُده عشان تكتشف نقاط ضعفك، اقرا الشروح، وبعدها ارجع لمرحلة المنهج المناسبة.",
      },
    ],
    chatbotContext:
      "You are the assistant on the Cognitive Defense Test page (/defense-test). It is a fixed multiple-choice quiz where each question has one correct option and a sourced explanation (citing SIFT/Wineburg, FLICC/Cook, WHO mhGAP, hadith authentication via Sunnah.com, ELA/C2PA forensics, inoculation theory). Help the user understand why an answer is correct and how to apply the method; never invent a source, statistic, or hadith grade beyond what the explanation states — if asked something unsourced, say غير موثّق / Unverified.",
  },
  "/guide": {
    title: "Platform Guide / Start Here",
    titleAr: "دليل المنصّة / ابدأ من هنا",
    scenarios: [
      {
        paste: "I'm brand new — which tool do I open first to check a claim my mom sent me?",
        pasteAr: "أنا جديد خالص — أفتح أنهي أداة الأول عشان أتأكد من ادعاء ماما بعتهولي؟",
        note: "An orientation page — ask the assistant where to begin.",
        noteAr: "صفحة توجيه — اسأل المساعد تبدأ منين.",
      },
    ],
    useCases: [
      {
        help: "A start-here map that explains what the platform's tools and engines do and the recommended order to use them.",
        helpAr: "خريطة «ابدأ من هنا» بتشرح أدوات ومحرّكات المنصّة وبتوصّي بترتيب استخدامها.",
        apply: "Read it once on day one to orient yourself, then jump straight to the tool that fits your immediate need.",
        applyAr: "اقراها مرة في أول يوم عشان توجّه نفسك، وبعدها روح على الأداة اللي بتلبّي احتياجك المباشر.",
      },
    ],
    chatbotContext:
      "You are the assistant on the Platform Guide / Start Here page (/guide). It is a static bilingual orientation page that introduces the platform's sections, tools, and engines and the recommended path through them (it pulls copy from site-strings GUIDE). It performs no analysis itself. Help the user understand what each feature does and route them to the right page; never fabricate a feature, statistic, or source — if unsure whether something exists, say غير موثّق / Unverified.",
  },
  "/live-deception": {
    title: "Live Deception X-Ray",
    titleAr: "أشعّة الخداع الحيّة",
    scenarios: [
      {
        paste: "Why is the 'imported antibiotics cause cardiac arrest in children' post flagged as Layer 1 fabrication?",
        pasteAr: "ليه بوست «المضادات الحيوية المستوردة بتسبب سكتة قلبية للأطفال» متصنّف طبقة ١ اختلاق؟",
        note: "Tap a fake post's X-ray overlay; ask the assistant about its layer, brain target, and counter.",
        noteAr: "افتح طبقة الأشعّة على بوست مزيّف؛ واسأل المساعد عن طبقته، الهدف الدماغي، والردّ.",
      },
    ],
    useCases: [
      {
        help: "Shows real Egyptian-style manipulation posts with a forensic overlay: deception layer, emotional-hijack score, brain target, and a sourced scientific + Islamic counter.",
        helpAr: "بيعرض بوستات تلاعب على الطراز المصري بطبقة تشريح: طبقة الخداع، درجة الاختطاف العاطفي، الهدف الدماغي، وردّ علمي وإسلامي موثَّق.",
        apply: "Study how each post hooks you emotionally, then reuse the ready WhatsApp counter-reply when you see the same trick.",
        applyAr: "ادرس إزاي كل بوست بيصطادك عاطفيًا، وبعدها استخدم ردّ الواتساب الجاهز لما تشوف نفس الحيلة.",
      },
    ],
    chatbotContext:
      "You are the assistant on the Live Deception X-Ray page (/live-deception). It renders documented manipulation posts (drawn from the project's kill-list / killed claims) inside a mock social feed, each annotated with one of the 8 deception layers, manipulation tags, an emotional-hijack score, brain target, and a verdict with a sourced scientific counter, an Islamic counter (with the hadith reference), and a ready WhatsApp rebuttal. Explain the layer and the counter; never invent a source, statistic, or hadith grade beyond what the case provides — if unsourced, say غير موثّق / Unverified.",
  },
  "/misinfo-atlas": {
    title: "3D Misinformation Atlas",
    titleAr: "أطلس التضليل ثلاثي الأبعاد",
    scenarios: [
      {
        paste: "Which historical eras map to Layer 3 (Decontextualization) and how was it used then?",
        pasteAr: "أنهي عصور تاريخية بتنتمي للطبقة ٣ (اقتطاع السياق) واتستخدمت إزاي وقتها؟",
        note: "An interactive 3D atlas — ask the assistant to explain a node or a deception layer.",
        noteAr: "أطلس تفاعلي ثلاثي الأبعاد — اسأل المساعد يشرح عقدة أو طبقة خداع.",
      },
    ],
    useCases: [
      {
        help: "An interactive 3D map of misinformation across historical eras, every node tied to one of the 8 deception layers with its essence and a defense move.",
        helpAr: "خريطة تفاعلية ثلاثية الأبعاد للتضليل عبر العصور، كل عقدة مربوطة بإحدى طبقات الخداع الثمانية مع جوهرها وحركة دفاع.",
        apply: "Browse an era to see that today's tricks are old patterns, then apply the layer's defense to a claim you face now.",
        applyAr: "اتصفّح عصرًا عشان تشوف إن حيل النهارده أنماط قديمة، وبعدها طبّق دفاع الطبقة على ادعاء بيواجهك دلوقتي.",
      },
    ],
    chatbotContext:
      "You are the assistant on the 3D Misinformation Atlas page (/misinfo-atlas). It is a three.js/react-three-fiber immersive map (sphere/echo/pyramid views) of HISTORICAL_ERAS nodes, each mapped onto the canonical 8-Layer deception taxonomy (Absolute Fabrication, Biased Lens, Decontextualization, Weaponized Timing, Evil Application, Matrix of Manipulation, Mega-Machine, The Unknown), each layer carrying an essence and a defense (e.g. SIFT). Explain a node or a layer's defense; never fabricate a historical fact, date, or source — if unsourced, say غير موثّق / Unverified.",
  },
  "/peer-challenge": {
    title: "Peer Challenge Mode",
    titleAr: "وضع تحدّي الأصدقاء",
    scenarios: [
      {
        paste: "Real or fake? 'URGENT: Drinking bleach kills COVID-19 instantly!!'",
        pasteAr: "حقيقي ولا مزيّف؟ «عاجل: شرب الكلور بيقتل كورونا فورًا!!»",
        note: "A sample round item — players race to label claims real/fake for points.",
        noteAr: "نموذج جولة — اللاعبون بيتسابقوا يصنّفوا الادعاءات حقيقي/مزيّف عشان النقط.",
      },
    ],
    useCases: [
      {
        help: "A timed real-vs-fake fact-checking game you play with friends via a shared room code, where everyone gets the same questions in the same order.",
        helpAr: "لعبة تدقيق «حقيقي ضد مزيّف» بالوقت تلعبها مع أصحابك بكود غرفة مشترك، والكل بياخد نفس الأسئلة بنفس الترتيب.",
        apply: "Run it in a study group or with family to make spotting fabrication patterns a competitive, sticky habit.",
        applyAr: "العبها في مجموعة مذاكرة أو مع العيلة عشان اكتشاف أنماط التلفيق يبقى عادة تنافسية ثابتة.",
      },
    ],
    chatbotContext:
      "You are the assistant on the Peer Challenge Mode page (/peer-challenge). It is a local multiplayer game: players join via a room code (used as a deterministic shuffle seed so every device sees the same question order) and label claims from a fixed CHALLENGE_POOL as real or fake under time pressure, earning points by difficulty, with a sourced explanation and named technique (Fear-Mongering, False Authority, False Urgency) after each. There is no AI scoring or server. Help the user reason about why a claim is real or fake; never invent a statistic or source beyond the question's explanation — if unsourced, say غير موثّق / Unverified.",
  },
  "/reaction-test": {
    title: "Reaction Speed Test",
    titleAr: "اختبار سرعة رد الفعل",
    scenarios: [
      {
        paste: "Real or fake (gut, fast)? 'BREAKING: Egypt discovers a new element that cures all diseases!!'",
        pasteAr: "حقيقي ولا مزيّف (بالبديهة وبسرعة)؟ «عاجل: مصر تكتشف عنصرًا جديدًا يشفي كل الأمراض!!»",
        note: "Round 1 is the fast System-1 gut answer; round 2 lets you think (System 2).",
        noteAr: "الجولة ١ إجابة بديهية سريعة (المنظومة ١)؛ الجولة ٢ بتديك وقت تفكّر (المنظومة ٢).",
      },
    ],
    useCases: [
      {
        help: "Measures how often your fast 'gut' (System 1) falls for manipulative headlines versus your slower, reasoned (System 2) answer on the same items.",
        helpAr: "بيقيس كل قد إيه بديهتك السريعة (المنظومة ١) بتقع في العناوين المتلاعبة مقارنة بإجابتك المتأنّية (المنظومة ٢) على نفس البنود.",
        apply: "See your reflex error rate, then make 'pause before you share' a deliberate habit for emotional headlines.",
        applyAr: "شوف نسبة خطأ ردّ فعلك، وبعدها خلّي «اقف قبل ما تعمل شير» عادة مقصودة مع العناوين العاطفية.",
      },
    ],
    chatbotContext:
      "You are the assistant on the Reaction Speed Test page (/reaction-test), built on dual-process theory (System 1 fast vs System 2 slow). The user judges a fixed set of real/fake Egyptian-context headlines twice — first a timed gut answer, then a reflective answer — and the page reports accuracy and reaction time for each system, with a sourced explanation per headline. Real items name a credible source (WHO, CBE, CAPMAS, Nature); fakes use urgency/conspiracy/clickbait cues. Help the user understand the manipulation cue; never fabricate a source or statistic — if unsourced, say غير موثّق / Unverified.",
  },
  "/religion-hub/tools/halal-finance": {
    title: "Halal Finance Analyzer",
    titleAr: "محلّل التمويل الحلال",
    scenarios: [
      {
        paste: "Buying a car through a bank with Murabaha at a fixed 5% profit rate",
        pasteAr: "شراء سيارة عن طريق البنك بتمويل مرابحة بفائدة ثابتة 5%",
        note: "Describe any deal; the tool returns compliant / non-compliant / unclear with issues.",
        noteAr: "اوصف أي معاملة؛ الأداة بترجّع متوافق / غير متوافق / غير واضح مع المشاكل.",
      },
    ],
    useCases: [
      {
        help: "Analyzes a described financial product or transaction for Shariah compliance, returning a verdict, a confidence level, and a list of specific issues (riba, gharar, etc.).",
        helpAr: "بيحلّل منتج أو معاملة مالية موصوفة من حيث التوافق الشرعي، ويرجّع حُكمًا، ومستوى ثقة، وقائمة مشاكل محدّدة (ربا، غرر، إلخ).",
        apply: "Before signing a loan, lease, or crypto trade, paste the terms here to surface red flags to ask a scholar about.",
        applyAr: "قبل ما توقّع قرض أو إيجار أو تتداول كريبتو، الصق الشروط هنا عشان تطلّع علامات تسألها لعالم.",
      },
    ],
    chatbotContext:
      "You are the assistant on the Halal Finance Analyzer page (/religion-hub/tools/halal-finance). The user describes a financial product/transaction; the page POSTs it to /api/islamic/finance, which returns { isCompliant: true/false/null, confidence, explanation, issues[] } screening for riba, gharar, and similar concerns. This is educational, NOT a fatwa. Help the user phrase the case and read the result, and direct them to a qualified scholar for a binding ruling; never fabricate a fatwa, a scholar's name, a hadith, or its authenticity grade — if a ruling is uncertain or unsourced, say غير موثّق / Unverified.",
  },
  "/science": {
    title: "Science Hub",
    titleAr: "مركز الثقافة العلمية",
    scenarios: [
      {
        paste: "A friend says 'a study proved this supplement reverses aging' — how do I weigh that evidence?",
        pasteAr: "صاحبي بيقول «دراسة أثبتت إن المكمّل ده بيعكس الشيخوخة» — أوزن الدليل ده إزاي؟",
        note: "Use the evidence board + 33 exercises to judge claim strength, not just true/false.",
        noteAr: "استخدم لوحة الأدلة + 33 تمرين عشان تقيّم قوة الادعاء، مش بس صح/غلط.",
      },
    ],
    useCases: [
      {
        help: "Bundles tools to weigh evidence and spot statistical tricks plus 33 hands-on exercises that train you to read research like a skeptic.",
        helpAr: "بيجمع أدوات توزن الدليل وتكشف الحيل الإحصائية مع 33 تمرين عملي يدرّبوك تقرأ الأبحاث بعقل ناقد.",
        apply: "When someone cites 'a study', come here to ask what the evidence is and how strong it is before you share.",
        applyAr: "لما حد يستشهد بـ«دراسة»، تعالى هنا واسأل إيه الدليل وقده إيه قبل ما تعمل شير.",
      },
    ],
    chatbotContext:
      "You are the assistant on the Science Hub page (/science). It hosts an Evidence Command Board, a Scientific Intelligence Center, and a Science Exercise Tracker with 33 hands-on exercises focused on weighing evidence strength and spotting statistical tricks (p-hacking, cherry-picking, single-study hype). Help the user judge how strong a claim's evidence actually is and pick an exercise; flag preprints as not peer-reviewed, and never fabricate a study, DOI, statistic, or citation — if unsourced, say غير موثّق / Unverified.",
  },
  "/the-descent": {
    title: "The Descent (Gateway)",
    titleAr: "النزول (البوابة)",
    scenarios: [
      {
        paste: "What are the 8 layers of deception this experience walks me through?",
        pasteAr: "إيه طبقات الخداع الثمانية اللي التجربة دي بتنزّلني فيها؟",
        note: "A scrollytelling gateway — ask the assistant to explain a scene or where to go next.",
        noteAr: "بوابة سرد بالتمرير — اسأل المساعد يشرح مشهد أو تروح فين بعد كده.",
      },
    ],
    useCases: [
      {
        help: "An immersive scroll-driven gateway that walks you down through the layers of information disorder as the front door to the whole platform.",
        helpAr: "بوابة غامرة بتتحرّك بالتمرير بتنزّلك خلال طبقات اضطراب المعلومات كباب رئيسي للمنصّة كلها.",
        apply: "Use it as your orientation journey, then follow its exits into the curriculum and the analysis tools.",
        applyAr: "استخدمها كرحلة توجيه، وبعدها اتبع مخارجها للمنهج وأدوات التحليل.",
      },
    ],
    chatbotContext:
      "You are the assistant on The Descent page (/the-descent), the platform's cinematic scrollytelling gateway. It uses native scroll plus GSAP ScrollTrigger / framer to render the DescentExperience inside a ScrollProvider, walking the user through the layers of information disorder before routing them into the curriculum and tools. It is narrative/navigational, not an analysis form. Help the user understand a scene and where each exit leads; never fabricate a statistic, source, or hadith grade in your explanations — if unsourced, say غير موثّق / Unverified.",
  },
  "/welcome": {
    title: "Welcome / Landing",
    titleAr: "الترحيب / الصفحة الرئيسية",
    scenarios: [
      {
        paste: "Give me a quick tour — what are the main parts of this platform?",
        pasteAr: "اعملي جولة سريعة — إيه الأجزاء الرئيسية في المنصّة دي؟",
        note: "A landing page — ask the assistant to summarize the highlights and where to start.",
        noteAr: "صفحة ترحيب — اسأل المساعد يلخّص أبرز الأقسام وتبدأ منين.",
      },
    ],
    useCases: [
      {
        help: "Introduces the platform's pillars (Curriculum, Defense Tools, Islamic Hub, Science Engine, AI Power) so a first-time visitor knows what's inside.",
        helpAr: "بيقدّم أعمدة المنصّة (المنهج، أدوات الدفاع، المركز الإسلامي، المحرك العلمي، قوة الذكاء الاصطناعي) عشان الزائر الجديد يعرف فيه إيه.",
        apply: "Skim it on arrival to get the big picture, then click into the pillar that matches your goal.",
        applyAr: "اتصفّحها أول ما توصل عشان تاخد الصورة الكبيرة، وبعدها ادخل العمود اللي يناسب هدفك.",
      },
    ],
    chatbotContext:
      "You are the assistant on the Welcome / Landing page (/welcome). It is a marketing landing page introducing the platform's five pillars (Curriculum, Defense Tools, Islamic Hub, Science Engine, AI Power) and headline stats (pages, API routes, day-curriculum, engines). It performs no analysis. Help the user understand what the platform offers and where to begin; treat the headline numbers as marketing copy and never present them or any source as verified — if asked for a specific fact and it is unsourced, say غير موثّق / Unverified.",
  },
};
