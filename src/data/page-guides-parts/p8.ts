import type { PageGuide } from "@/data/page-guides";

export const P8: Record<string, PageGuide> = {
  "/about": {
    title: "About the Project",
    titleAr: "عن المشروع",
    scenarios: [
      {
        paste: "Who built the Egyptian Awareness Library and how is it different from the Bad News game?",
        pasteAr: "مين اللي عمل مكتبة الوعي المصرية وإيه الفرق بينها وبين لعبة Bad News؟",
        note: "An identity/positioning question the About page answers in its Team and Competitive tabs.",
        noteAr: "سؤال عن الهوية والتموضع بترد عليه صفحة «عن المشروع» في تبويبَي الفريق والمقارنة.",
      },
    ],
    useCases: [
      {
        help: "Explains the project's mission, team, institution, original contributions, and how it compares to competitors.",
        helpAr: "بتشرح رسالة المشروع والفريق والمؤسسة والإسهامات الأصلية وإزاي بيتقارن بالمنافسين.",
        apply: "Use it to understand the platform's scope and academic grounding before relying on its tools.",
        applyAr: "استخدمها عشان تفهم نطاق المنصة وأساسها الأكاديمي قبل ما تعتمد على أدواتها.",
      },
    ],
    chatbotContext:
      "You are the assistant on the About page of the Egyptian Awareness Library. It is an informational page with tabs (Mission, Team & Institution, Competitive analysis, Evidence types, Original contributions, Defense, Framework) describing the project built at the Higher Technology Institute in New Heliopolis, its three MVP engines (DeepReal, Mental Health, Religion Hub), and the KeyHunter system. It has no analysis input. Answer from the page's stated facts only; never invent team members, awards, dates, or stats — if a detail is not shown, say it is Unverified / غير موثّق.",
  },
  "/bias-detector": {
    title: "Bias Detector",
    titleAr: "كاشف التحيز",
    scenarios: [
      {
        paste: "Everyone knows natural remedies are always better than medicine — my grandmother lived to 90 without ever seeing a doctor!",
        pasteAr: "الكل يعرف إن العلاجات الطبيعية أحسن من الأدوية — جدتي عاشت 90 سنة من غير ما تروح دكتور!",
        note: "Triggers bandwagon + anecdotal + availability bias detection.",
        noteAr: "بيشغّل كشف تأثير العربة + الدليل القصصي + استدلال التوافر.",
      },
    ],
    useCases: [
      {
        help: "Scans a statement and names the cognitive biases (confirmation, anchoring, authority, etc.) shaping it.",
        helpAr: "بيفحص العبارة ويسمّي التحيزات المعرفية (التأكيد، الإرساء، السلطة، إلخ) اللي بتشكّلها.",
        apply: "Before sharing a confident-sounding post, paste it here to see which mental shortcuts it exploits.",
        applyAr: "قبل ما تشارك منشور واثق، الصقه هنا عشان تشوف أنهي اختصارات ذهنية بيستغلّها.",
      },
    ],
    chatbotContext:
      "You are the assistant on the Bias Detector page. It sends the user's text to /api/bias-detect and returns the cognitive biases present (confirmation, anchoring, availability, Dunning-Kruger, bandwagon, framing, authority and 20+ more), each with an academic citation and an Egyptian example. Help the user phrase input and interpret which biases were flagged. Never fabricate a study, statistic, or citation; if a claim is unsourced say Unverified / غير موثّق.",
  },
  "/competition-demo": {
    title: "Competition Demo",
    titleAr: "العرض التنافسي",
    scenarios: [
      {
        paste: "Run the full demo and tell me what each of the 5 engines proves.",
        pasteAr: "شغّل العرض الكامل وقول لي كل محرك من الـ5 بيثبت إيه.",
        note: "The page auto-runs GOD-System, Fallacy, Bias, Islamic and Arabic-NLP engines in sequence.",
        noteAr: "الصفحة بتشغّل تلقائياً محركات GOD وكشف المغالطات والتحيز والتحليل الإسلامي والـNLP العربي بالترتيب.",
      },
    ],
    useCases: [
      {
        help: "Auto-runs the platform's main engines back-to-back so you can see every capability in under a minute.",
        helpAr: "بيشغّل محركات المنصة الرئيسية ورا بعض عشان تشوف كل القدرات في أقل من دقيقة.",
        apply: "Use it as a live walkthrough when demonstrating the platform or deciding which tool fits your need.",
        applyAr: "استخدمه كجولة حيّة وأنت بتعرض المنصة أو بتقرر أنهي أداة تناسب احتياجك.",
      },
    ],
    chatbotContext:
      "You are the assistant on the Competition Demo page. It is an auto-running showcase that calls real endpoints in sequence: /api/god-system (8-layer analysis), /api/fallacy-detect, /api/bias-detect, /api/islamic/tafsir, and /api/nlp/arabic, timing each step. Explain what each engine does and where the deeper tool lives. Report only what the live endpoints return; never invent a result, score, or source — unsourced output is Unverified / غير موثّق.",
  },
  "/curriculum/phase4": {
    title: "Curriculum — Phase 4 (Sovereignty)",
    titleAr: "المنهج — المرحلة الرابعة (السيادة)",
    scenarios: [
      {
        paste: "What do I have to complete in Phase 4 to earn the Sovereign Certification?",
        pasteAr: "إيه اللي لازم أكمّله في المرحلة الرابعة عشان أحصل على شهادة السيادة؟",
        note: "Phase 4 is the final boss-fight phase with threat-map ops and a community mission.",
        noteAr: "المرحلة الرابعة هي مرحلة المعركة النهائية بعمليات خريطة التهديدات ومهمة مجتمعية.",
      },
    ],
    useCases: [
      {
        help: "Lays out the final curriculum phase: the sovereign boss-fight, threat-map operations, a community defense mission, and certification.",
        helpAr: "بتعرض المرحلة الأخيرة من المنهج: معركة السيادة، عمليات خريطة التهديدات، مهمة دفاع مجتمعي، والشهادة.",
        apply: "Use it as a checklist to finish the program and apply your defenses on real community misinformation.",
        applyAr: "استخدمها كقائمة مراجعة عشان تخلّص البرنامج وتطبّق دفاعاتك على تضليل حقيقي في مجتمعك.",
      },
    ],
    chatbotContext:
      "You are the assistant on the Curriculum Phase 4 page (the final 'Sovereignty' phase). It is an informational roadmap of weekly challenges — the Sovereign Boss-Fight, Threat Map Operations, a Community Defense Mission (linking /family-kit, /assessment, /whatsapp-analyzer), and Sovereign Certification. Help the user understand and sequence these. Describe only the challenges shown; do not invent requirements, dates, or scores — say Unverified / غير موثّق if unstated.",
  },
  "/defense-main-plan": {
    title: "Defense Main Plan",
    titleAr: "خطة الدفاع الرئيسية",
    scenarios: [
      {
        paste: "Give me a 30-second defense script if a judge attacks the platform during the demo.",
        pasteAr: "اديني سكريبت دفاع 30 ثانية لو حكم هاجم المنصة أثناء العرض.",
        note: "The page collects timed scripts and doctor-attack scenarios for the live presentation.",
        noteAr: "الصفحة بتجمّع سكريبتات موقوتة وسيناريوهات هجوم الدكاترة للعرض الحيّ.",
      },
    ],
    useCases: [
      {
        help: "An internal presentation playbook: certified demo pages, stress tests, 35 attack scenarios with timed answers, and emergency scripts.",
        helpAr: "دليل عرض داخلي: صفحات عرض معتمدة، اختبارات إجهاد، 35 سيناريو هجوم بإجابات موقوتة، وسكريبتات طوارئ.",
        apply: "Use it to rehearse the demo and prepare calm, sourced answers to tough questions.",
        applyAr: "استخدمها للبروفة وتحضير إجابات هادئة وموثّقة للأسئلة الصعبة.",
      },
    ],
    chatbotContext:
      "You are the assistant on the Defense Main Plan page. It is an informational presentation playbook organized in parts: the must-show demo pages, stress-test results, 35 doctor-attack scenarios with 5s/15s/30s scripts, the 5-minute timing strip, emergency compression scripts, failure-recovery lines, and never-say lists. Help the user find and rehearse the right script. Repeat only the page's stated content; never invent stats, test results, or claims — unsupported figures are Unverified / غير موثّق.",
  },
  "/epistemology": {
    title: "Epistemology Dashboard",
    titleAr: "لوحة نظرية المعرفة",
    scenarios: [
      {
        paste: "How does the scientific method verify a claim versus the Islamic usul approach?",
        pasteAr: "إزاي المنهج العلمي بيتحقق من ادعاء مقابل منهج أصول الفقه والحديث؟",
        note: "The page compares three verification methodologies side by side via tabs.",
        noteAr: "الصفحة بتقارن ثلاث منهجيات تحقق جنباً إلى جنب عبر التبويبات.",
      },
    ],
    useCases: [
      {
        help: "Explains how truth is verified across three lenses: the scientific method, Islamic usul (fiqh/hadith), and logical proof.",
        helpAr: "بتشرح إزاي يتم التحقق من الحقيقة عبر ثلاث عدسات: المنهج العلمي، أصول الفقه والحديث، والبرهان المنطقي.",
        apply: "Use it to learn what 'evidence' means in each domain so you ask for the right kind of proof.",
        applyAr: "استخدمها عشان تتعلم معنى «الدليل» في كل مجال فتطلب النوع الصح من البرهان.",
      },
    ],
    chatbotContext:
      "You are the assistant on the Epistemology Dashboard page. It is an informational comparison with three tabs — Scientific Method, Islamic Usul (fiqh/hadith), and Logical Proof — showing how each methodology establishes that something is true. It has no analysis input. Explain the methodologies as presented; never fabricate a hadith grade, fatwa, citation, or study — flag anything unsourced as Unverified / غير موثّق.",
  },
  "/forensic-image": {
    title: "Forensic Image Analysis",
    titleAr: "التحليل الجنائي للصور",
    scenarios: [
      {
        paste: "https://example.com/viral-ministry-warning.jpg",
        pasteAr: "https://example.com/viral-ministry-warning.jpg",
        note: "Paste an image URL to run EXIF, ELA, clone-detection and reverse-search checks.",
        noteAr: "الصق رابط صورة عشان تشغّل فحوصات EXIF و ELA وكشف النسخ والبحث العكسي.",
      },
    ],
    useCases: [
      {
        help: "Analyzes a suspect image for manipulation: EXIF metadata, error-level analysis, clone/copy-paste detection, and a verification protocol.",
        helpAr: "بيحلل صورة مشبوهة بحثاً عن تلاعب: بيانات EXIF، تحليل مستوى الخطأ، كشف النسخ واللصق، وبروتوكول تحقق.",
        apply: "Before believing a viral 'official document' image, run it here to spot Photoshop edits or fake crowds.",
        applyAr: "قبل ما تصدّق صورة «وثيقة رسمية» منتشرة، شغّلها هنا عشان تكشف تعديلات الفوتوشوب أو الحشود المفبركة.",
      },
    ],
    chatbotContext:
      "You are the assistant on the Forensic Image Analysis page. It accepts an image URL, posts it to /api/forensic/image, and returns forensic signals (EXIF metadata, ELA, clone/SIFT detection, DPI/font checks, reverse-search hints) plus a step-by-step verification protocol and worked Egyptian case studies. Note that social platforms strip EXIF, so missing metadata is suspicious but not conclusive. Report only what the tool returns; never claim an image is fake or authentic without the evidence — say Unverified / غير موثّق when inconclusive.",
  },
  "/kill-list": {
    title: "Kill List (Debunked Claims Database)",
    titleAr: "قائمة الإعدام (قاعدة الادعاءات المفنّدة)",
    scenarios: [
      {
        paste: "vaccines cause autism",
        pasteAr: "اللقاحات بتسبب التوحد",
        note: "Search the database of permanently debunked claims for a known falsehood.",
        noteAr: "ابحث في قاعدة الادعاءات المفنّدة نهائياً عن أكذوبة معروفة.",
      },
    ],
    useCases: [
      {
        help: "A searchable database of permanently debunked claims and persistent falsehoods, each with its refutation.",
        helpAr: "قاعدة بيانات قابلة للبحث للادعاءات المفنّدة نهائياً والأكاذيب المستمرة، كل واحدة مع تفنيدها.",
        apply: "When a recycled rumor reappears, search here to find the settled refutation instead of arguing from scratch.",
        applyAr: "لما تظهر إشاعة قديمة من تاني، ابحث هنا عن التفنيد الجاهز بدل ما تتناقش من الصفر.",
      },
    ],
    chatbotContext:
      "You are the assistant on the Kill List page. It loads a verified database of permanently debunked claims from /api/kill-list and lets the user search and expand each entry to read its refutation and sources. Help the user search and interpret entries. Only relay refutations that the database provides with sources; never invent a debunk, study, or verdict — unsourced material is Unverified / غير موثّق.",
  },
  "/mens-shield": {
    title: "Men's Mental Health Shield",
    titleAr: "درع الصحة النفسية للرجال",
    scenarios: [
      {
        paste: "Work stress 5, isolation 4, emotional strain 4, sleep 2, fatigue 4 — what does my score mean?",
        pasteAr: "ضغط الشغل 5، العزلة 4، الإجهاد العاطفي 4، النوم 2، الإرهاق 4 — يعني إيه السكور بتاعي؟",
        note: "Set the five 1-5 sliders to get a strain score and reframing tools.",
        noteAr: "حرّك الخمس مؤشرات (1-5) عشان تطلّع سكور الإجهاد وأدوات إعادة الصياغة.",
      },
    ],
    useCases: [
      {
        help: "Dismantles toxic-masculinity myths and computes a strain score from five sliders, offering CBT-style reframing and Islamic/scientific evidence.",
        helpAr: "بيفكك خرافات الرجولة السامة ويحسب سكور إجهاد من خمس مؤشرات، مع إعادة صياغة بأسلوب CBT وأدلة إسلامية وعلمية.",
        apply: "Use it to check your own stress signals and challenge the belief that men shouldn't express emotion.",
        applyAr: "استخدمه عشان تفحص إشارات التوتر عندك وتتحدّى فكرة إن الراجل مايعبّرش عن مشاعره.",
      },
    ],
    chatbotContext:
      "You are the assistant on the Men's Mental Health Shield page. It computes a strain score from five 1-5 self-rating sliders (work stress, isolation, emotional strain, sleep quality, physical fatigue) and offers CBT-style cognitive reframing plus Islamic and scientific evidence (WHO, CAPMAS, PHQ-9 context). It is educational, not a diagnosis — recommend professional help and PHQ-9 screening but never diagnose. Never fabricate a hadith, statistic, or clinical claim; say Unverified / غير موثّق when unsourced.",
  },
  "/others-search": {
    title: "Multi-Source Search",
    titleAr: "البحث متعدد المصادر",
    scenarios: [
      {
        paste: "Did the Ministry of Health ban a popular painkiller this week?",
        pasteAr: "هل وزارة الصحة منعت مسكّن شهير الأسبوع ده؟",
        note: "Query several verified databases at once (fact-check, evidence, OpenAlex, archive, etc.).",
        noteAr: "استعلم من عدة قواعد موثقة مرة واحدة (تحقق الحقائق، الأدلة، OpenAlex، الأرشيف، إلخ).",
      },
    ],
    useCases: [
      {
        help: "Searches multiple verified sources simultaneously — fact-check, scientific evidence, OpenAlex, NCBI, ClaimBuster, MediaWiki, web archive.",
        helpAr: "بيبحث في عدة مصادر موثقة في وقت واحد — تحقق الحقائق، الأدلة العلمية، OpenAlex، NCBI، ClaimBuster، ويكي، أرشيف الويب.",
        apply: "When you need a fast cross-check of a claim, run it across all sources here rather than one site at a time.",
        applyAr: "لما تحتاج تحقق سريع متقاطع لادعاء، شغّله على كل المصادر هنا بدل موقع واحد ورا التاني.",
      },
    ],
    chatbotContext:
      "You are the assistant on the Multi-Source Search page. It runs the user's query in parallel across selectable verified sources via /api/search/* endpoints (factcheck, evidence, openalex, ncbi, claimbuster, mediawiki, archive) and aggregates the hits. Help the user pick sources and read results. Present only what the sources return with their links; never fabricate a result, source, or verdict — label unsourced material Unverified / غير موثّق.",
  },
  "/project-vision": {
    title: "Project Vision & Cognition Framework",
    titleAr: "رؤية المشروع وإطار الإدراك",
    scenarios: [
      {
        paste: "Which Egyptian misinformation patterns does the platform target, and how does its design respond?",
        pasteAr: "أنهي أنماط تضليل مصرية بتستهدفها المنصة، وإزاي تصميمها بيستجيب لها؟",
        note: "The page maps biases to Egyptian patterns to design responses, with verified expert quotes.",
        noteAr: "الصفحة بتربط التحيزات بالأنماط المصرية باستجابات التصميم، مع اقتباسات خبراء موثّقة.",
      },
    ],
    useCases: [
      {
        help: "Turns the project vision into a cognitive-defense map: targeted biases, Egyptian misinformation patterns, and the product's design responses.",
        helpAr: "بتحوّل رؤية المشروع لخريطة دفاع معرفي: التحيزات المستهدَفة، أنماط التضليل المصرية، واستجابات تصميم المنتج.",
        apply: "Use it to understand why each tool exists and which real-world manipulation it counters.",
        applyAr: "استخدمها عشان تفهم ليه كل أداة موجودة وأنهي تلاعب واقعي بتتصدى له.",
      },
    ],
    chatbotContext:
      "You are the assistant on the Project Vision & Cognition Awareness Framework page. It is an informational page mapping the cognitive biases the platform targets, the Egyptian misinformation patterns that activate them, the design-response layers, and verified expert quotes. It has no analysis input. Explain the vision and mappings as shown; never invent an expert quote, statistic, or source — flag anything unsupported as Unverified / غير موثّق.",
  },
  "/religion-hub/tools/authority-verifier": {
    title: "Religious Authority Verifier",
    titleAr: "مُحقّق السلطة الدينية",
    scenarios: [
      {
        paste: "محمد متولي الشعراوي",
        pasteAr: "محمد متولي الشعراوي",
        note: "Enter a scholar or preacher's name to verify credentials and methodology.",
        noteAr: "أدخل اسم عالم أو داعية عشان تتحقق من المؤهلات والمنهج.",
      },
    ],
    useCases: [
      {
        help: "Checks the credentials, training, and methodology of an Islamic scholar, institution, or fatwa source.",
        helpAr: "بيفحص مؤهلات وتدريب ومنهج عالم إسلامي أو مؤسسة أو مصدر فتوى.",
        apply: "Before trusting a viral fatwa or 'sheikh,' verify here whether the figure is actually qualified.",
        applyAr: "قبل ما تثق في فتوى منتشرة أو «شيخ»، تحقق هنا إذا كان الشخص مؤهّل فعلاً.",
      },
    ],
    chatbotContext:
      "You are the assistant on the Religious Authority Verifier page (Religion Hub). It sends a scholar/preacher/institution name to /api/islamic/authority and returns what is known about their credentials, training, and methodology to protect users from unqualified or extremist figures. Help the user phrase a query and read the result. Never fabricate a scholar's credentials, a fatwa, a hadith grade, or an affiliation; if the source does not establish it, say Unverified / غير موثّق.",
  },
  "/religion-hub/whatsapp": {
    title: "Islamic WhatsApp Message Checker",
    titleAr: "فاحص رسائل واتساب الإسلامية",
    scenarios: [
      {
        paste: "انشر هذا الحديث ولك بكل حرف حسنة: من قرأ هذا الدعاء دخل الجنة بغير حساب",
        pasteAr: "انشر هذا الحديث ولك بكل حرف حسنة: من قرأ هذا الدعاء دخل الجنة بغير حساب",
        note: "Paste a forwarded 'reward-for-sharing' message to check the hadith's authenticity.",
        noteAr: "الصق رسالة منتشرة من نوع «انشر ولك أجر» عشان تتحقق من صحة الحديث.",
      },
    ],
    useCases: [
      {
        help: "Checks a forwarded Islamic WhatsApp message for fabricated or weak hadith and chain-letter manipulation.",
        helpAr: "بيفحص رسالة واتساب إسلامية منتشرة بحثاً عن حديث موضوع أو ضعيف وتلاعب رسائل السلسلة.",
        apply: "Before forwarding a religious message that promises reward for sharing, paste it here first.",
        applyAr: "قبل ما تبعت رسالة دينية بتوعد بأجر على النشر، الصقها هنا الأول.",
      },
    ],
    chatbotContext:
      "You are the assistant on the Islamic WhatsApp Message Checker page (Religion Hub). It posts a pasted forwarded message to /api/defense/hadith-check and returns a verdict on the hadith/claim plus links to deeper tools. Help the user paste a message and read the verdict. Never assign a hadith authenticity grade, attribute a quote to the Prophet, or cite a scholar that the tool did not return — if unverified, say Unverified / غير موثّق.",
  },
  "/stat-power": {
    title: "Statistical Power Lab",
    titleAr: "مختبر القوة الإحصائية",
    scenarios: [
      {
        paste: "Independent t-test, effect size d=0.5, N=50 per group, alpha=0.05, two-tailed — is this study powered?",
        pasteAr: "اختبار t مستقل، حجم الأثر d=0.5، N=50 لكل مجموعة، ألفا=0.05، ذيلين — هل الدراسة دي قوية كفاية؟",
        note: "Set test type, effect size, N, alpha and tails to compute statistical power.",
        noteAr: "حدّد نوع الاختبار وحجم الأثر وN وألفا والذيول عشان تحسب القوة الإحصائية.",
      },
    ],
    useCases: [
      {
        help: "An interactive calculator for statistical power, sample size, effect size, and Type I/II error rates.",
        helpAr: "حاسبة تفاعلية للقوة الإحصائية وحجم العينة وحجم الأثر ومعدلات الخطأ من النوع الأول والثاني.",
        apply: "When a study claims a finding, check here whether its sample was large enough to detect a real effect.",
        applyAr: "لما دراسة تدّعي نتيجة، اتأكد هنا إذا كانت عينتها كبيرة كفاية عشان تكتشف أثر حقيقي.",
      },
    ],
    chatbotContext:
      "You are the assistant on the Statistical Power Lab page. It is a client-side interactive calculator (inputs: test type independent/paired, Cohen's d effect size, sample size N per group, alpha, one/two-tailed) that computes statistical power and Type I/II error context — no external API. Explain the inputs and what the resulting power means for trusting a study. Do not invent study results or claim a real paper's power; describe only the user's own computed values, and flag any cited figure that lacks a source as Unverified / غير موثّق.",
  },
  "/transformation": {
    title: "Before → After Transformation",
    titleAr: "قبل ← بعد: التحوّل",
    scenarios: [
      {
        paste: "Show me how someone's thinking changes from Day 1 to Day 14 of the program.",
        pasteAr: "ورّيني إزاي تفكير حد بيتغير من اليوم الأول للـ14 في البرنامج.",
        note: "Browse before/after scenario tabs showing real behavioral change.",
        noteAr: "تصفّح تبويبات سيناريوهات «قبل/بعد» اللي بتوضّح تغيير سلوكي حقيقي.",
      },
    ],
    useCases: [
      {
        help: "Shows concrete before/after scenarios illustrating how the 14-day program changes how you react to misinformation.",
        helpAr: "بتعرض سيناريوهات «قبل/بعد» ملموسة بتوضّح إزاي برنامج الـ14 يوم بيغيّر طريقة تعاملك مع التضليل.",
        apply: "Use it to set expectations and see the specific reflexes you'll gain by finishing the program.",
        applyAr: "استخدمها عشان تحدد توقعاتك وتشوف ردود الفعل اللي هتكسبها لما تخلّص البرنامج.",
      },
    ],
    chatbotContext:
      "You are the assistant on the Before → After Transformation page. It is an informational page with tabbed scenarios contrasting how a person reacts to misinformation before versus after the 14-day program. It has no analysis input. Explain the scenarios as shown and point the user to the curriculum; never overstate guaranteed outcomes or invent statistics — say Unverified / غير موثّق for any unsourced claim.",
  },
};
