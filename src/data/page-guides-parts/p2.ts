import type { PageGuide } from "@/data/page-guides";

export const P2: Record<string, PageGuide> = {
  "/audit": {
    title: "Research Governance Audit",
    titleAr: "تدقيق حوكمة البحث",
    scenarios: [
      {
        paste: "How does this platform protect my personal data?",
        pasteAr: "إزاي المنصة دي بتحمي بياناتي الشخصية؟",
        note: "This is an info page — ask the assistant about a specific compliance item shown.",
        noteAr: "دي صفحة معلومات — اسأل المساعد عن بند امتثال معيّن معروض.",
      },
    ],
    useCases: [
      {
        help: "Shows the platform's IRB, data-privacy, informed-consent and ethics commitments in one transparent checklist.",
        helpAr: "بتعرض التزامات المنصة في أخلاقيات البحث والخصوصية والموافقة المستنيرة في قائمة شفافة واحدة.",
        apply: "Before trusting any tool here, read this page to see exactly how your data and consent are handled.",
        applyAr: "قبل ما تثق في أي أداة هنا، اقرأ الصفحة دي عشان تشوف بالظبط بياناتك وموافقتك بتتعامل إزاي.",
      },
    ],
    chatbotContext:
      "You are the assistant on the Research Governance Audit page (/audit). It is a static transparency checklist of compliance items (IRB considerations, data privacy under Egypt Law 151/2020 and GDPR, informed consent, age guidance) plus six ethical principles, each with a status (compliant/review). It calls no API and stores no user data; user progress is local-only. One-Law: never invent a regulation, audit result, or status — if a detail is not on the page, say it is Unverified / غير موثّق.",
  },
  "/ai-editor": {
    title: "AI Live Editor",
    titleAr: "المحرر المباشر بالذكاء الاصطناعي",
    scenarios: [
      {
        paste: "Build a claim-verification card that shows a verdict badge, confidence score, and a list of cited sources.",
        pasteAr: "اعمل بطاقة تحقق من ادعاء فيها شارة الحُكم ودرجة الثقة وقائمة المصادر الموثَّقة.",
        note: "Generates a live UI component from a plain-language prompt; you can also start from a template.",
        noteAr: "بيولّد مكوّن واجهة حي من وصف بلغة عادية؛ وتقدر تبدأ من قالب جاهز.",
      },
    ],
    useCases: [
      {
        help: "Turns a natural-language description into a working UI component, with ready Logic-Scenario templates for defense, Islamic, science and cognitive tools.",
        helpAr: "بيحوّل وصف بلغة عادية لمكوّن واجهة شغّال، مع قوالب سيناريوهات جاهزة لأدوات الدفاع والديني والعلمي والمعرفي.",
        apply: "Prototype a fact-check or quiz card in seconds instead of coding it, then iterate on the result.",
        applyAr: "اعمل نموذج أولي لبطاقة تحقق أو اختبار في ثواني بدل ما تبرمجها، وبعدين طوّر الناتج.",
      },
    ],
    chatbotContext:
      "You are the assistant on the AI Live Editor page (/ai-editor). It generates UI components from a natural-language prompt (or a pre-built Logic-Scenario template across Defense, Islamic, Science, Cognitive, Dashboard, Social and Game categories) using an AI model (NVIDIA Nemotron). Inputs are the prompt/template; output is generated component code/preview. Help the user phrase prompts and pick templates. One-Law: any source, stat, or hadith-grade shown inside generated content must be real — if not verifiable, label it Unverified / غير موثّق.",
  },
  "/blackbox": {
    title: "Claim Audit (BLACKBOX)",
    titleAr: "تدقيق الادعاء (الصندوق الأسود)",
    scenarios: [
      {
        paste: "Eating garlic on an empty stomach kills 99% of cancer cells, doctors are hiding it.",
        pasteAr: "أكل الثوم على الريق بيقتل 99% من خلايا السرطان، والدكاترة بيخبّوا الكلام ده.",
        note: "Runs a multi-dimension audit: source credibility, logic, emotional manipulation and more.",
        noteAr: "بيشغّل تدقيق متعدد الأبعاد: مصداقية المصدر، المنطق، التلاعب العاطفي وغيرها.",
      },
    ],
    useCases: [
      {
        help: "Scores a claim across several dimensions at once (credibility, logical consistency, emotional manipulation) so you see WHY it is weak, not just yes/no.",
        helpAr: "بيقيّم الادعاء عبر أبعاد متعددة مرة واحدة (المصداقية، الاتساق المنطقي، التلاعب العاطفي) فتشوف ليه هو ضعيف، مش بس نعم/لأ.",
        apply: "Paste a suspicious viral post and read the per-dimension breakdown before sharing or replying.",
        applyAr: "الصق بوست مشبوه منتشر واقرأ التحليل لكل بُعد قبل ما تشاركه أو ترد عليه.",
      },
    ],
    chatbotContext:
      "You are the assistant on the Claim Audit / BLACKBOX page (/blackbox). It sends a claim to /api/blackbox and returns a multi-dimension analysis (Source Credibility cross-checked via the evidence aggregator: OpenAlex, Semantic Scholar, PubMed, WHO; Logical Consistency; Emotional Manipulation; and more) with scores. Help the user phrase a claim and read each dimension. One-Law: never fabricate a source, score, or fatwa/hadith-grade; when a claim is unsupported say Unverified / غير موثّق.",
  },
  "/critical-thinking": {
    title: "Critical Thinking Ladder",
    titleAr: "سلم التفكير النقدي",
    scenarios: [
      {
        paste: "A famous sheikh on TV said this herbal mix cures diabetes — thousands swear by it.",
        pasteAr: "شيخ مشهور في التلفزيون قال إن الخلطة دي بتشفي السكري — آلاف بيأكّدوا عليها.",
        note: "Walk it up the 6 rungs: Claim, Source, Methodology, Data, Logic, Conclusion.",
        noteAr: "صعّده على الـ6 درجات: الادعاء، المصدر، المنهجية، البيانات، المنطق، الاستنتاج.",
      },
    ],
    useCases: [
      {
        help: "A 6-step ladder (Claim → Source → Methodology → Data → Logic → Conclusion) that teaches you to interrogate any claim, scientific or religious, with the right questions at each rung.",
        helpAr: "سلم من 6 خطوات (الادعاء ← المصدر ← المنهجية ← البيانات ← المنطق ← الاستنتاج) بيعلّمك تستجوب أي ادعاء، علمي أو ديني، بالأسئلة الصح في كل درجة.",
        apply: "Run a claim through all 6 questions before you believe it — by the end you know its real strength.",
        applyAr: "مرّر أي ادعاء على الـ6 أسئلة قبل ما تصدّقه — في الآخر هتعرف قوّته الحقيقية.",
      },
    ],
    chatbotContext:
      "You are the assistant on the Critical Thinking Ladder page (/critical-thinking). It is a guided 6-rung framework (The Claim, The Source, The Methodology, The Data, The Logic, The Conclusion) with prompting questions at each step, and it can run a claim through /api/god-system for analysis. Help the user move rung by rung and ask the right question. One-Law: never invent evidence, an isnad grade, or a study result; if unknown, say Unverified / غير موثّق.",
  },
  "/dashboard/cohort": {
    title: "Cohort Efficacy Dashboard",
    titleAr: "لوحة الفعالية الجماعية",
    scenarios: [
      {
        paste: "What does the pre/post MIST-20 delta on this dashboard actually mean?",
        pasteAr: "إيه معنى فرق MIST-20 قبل وبعد اللي على اللوحة دي بالظبط؟",
        note: "Read-only dashboard — ask the assistant to interpret the effect size and CI.",
        noteAr: "لوحة للعرض فقط — اطلب من المساعد يفسّر حجم الأثر وفترة الثقة.",
      },
    ],
    useCases: [
      {
        help: "Shows the platform's one honest efficacy claim: the pre→post MIST-20 improvement, effect size (Cohen's dz), 95% CI, and a flag if real-news distrust drifted.",
        helpAr: "بتعرض ادعاء الفعالية الأمين الوحيد: تحسّن MIST-20 قبل وبعد، حجم الأثر (Cohen's dz)، فترة الثقة 95%، وتنبيه لو ارتفع الشك في الأخبار الحقيقية.",
        apply: "Use it to judge whether the training genuinely makes people harder to fool, with the honest caveats shown.",
        applyAr: "استخدمها عشان تحكم هل التدريب فعلاً بيصعّب خداع الناس، مع التحفظات الأمينة المعروضة.",
      },
    ],
    chatbotContext:
      "You are the assistant on the Cohort Efficacy Dashboard (/dashboard/cohort). It reads /api/efficacy and visualizes paired pre→post MIST-20 veracity-discernment delta, effect size (Cohen's dz), 95% CI, fake-news-acceptance change, and an honest distrust-drift flag and caveats; if N=0 it shows no number yet. Read-only, no user input. Help interpret these statistics honestly. One-Law: never invent an N, delta, or significance; if the data is absent, say Unverified / غير موثّق.",
  },
  "/defense-qa": {
    title: "Project Defense Guide",
    titleAr: "دليل دفاع المشروع",
    scenarios: [
      {
        paste: "What are the eight deception theories and how do I explain them in the presentation?",
        pasteAr: "إيه نظريات الخداع الثمانية وإزاي أشرحها في العرض؟",
        note: "A reference/Q&A page — ask the assistant about a specific question, the script, or a theory.",
        noteAr: "صفحة مرجعية/أسئلة — اسأل المساعد عن سؤال معيّن أو السكريبت أو نظرية.",
      },
    ],
    useCases: [
      {
        help: "A complete defense kit for presenting the project: expected Q&A, a full presentation script, the eight theories, and a visual demo map.",
        helpAr: "طقم دفاع كامل لتقديم المشروع: الأسئلة والإجابات المتوقعة، سكريبت العرض الكامل، النظريات الثمانية، وخريطة العرض المرئي.",
        apply: "Rehearse with the Q&A and script so you can defend the project confidently in front of a committee.",
        applyAr: "اتمرّن بالأسئلة والسكريبت عشان تقدر تدافع عن المشروع بثقة قدام لجنة.",
      },
    ],
    chatbotContext:
      "You are the assistant on the Project Defense Guide page (/defense-qa). It is a static reference with four tabs: Q&A (anticipated questions), presentation script, the eight deception theories, and a visual-demo map, describing the platform's engines (DeepReal, Mental Health, Religion Hub) and tools. It calls no API. Help the user find an answer or rehearse. One-Law: stick to what the page states; never invent a statistic or source — if unsure, say Unverified / غير موثّق.",
  },
  "/explore": {
    title: "Platform Map (Explore)",
    titleAr: "خريطة المنصّة (استكشف)",
    scenarios: [
      {
        paste: "Which tool should I use to check if a viral health claim is true?",
        pasteAr: "أنهي أداة أستخدمها عشان أتأكد إن ادعاء صحي منتشر صح؟",
        note: "A navigation hub — ask the assistant to point you to the right page for your goal.",
        noteAr: "مركز تنقّل — اطلب من المساعد يوجّهك للصفحة الصح حسب هدفك.",
      },
    ],
    useCases: [
      {
        help: "Maps every tool and page on the platform by category, each named for what it does and the scientific method behind it.",
        helpAr: "بتخرّط كل أداة وصفحة على المنصّة حسب الفئة، كل واحدة باسم يوضّح وظيفتها والمنهج العلمي وراها.",
        apply: "Lost about where to start? Browse the categories here to find the exact tool for your problem.",
        applyAr: "تايه ومش عارف تبدأ منين؟ تصفّح الفئات هنا عشان تلاقي الأداة المظبوطة لمشكلتك.",
      },
    ],
    chatbotContext:
      "You are the assistant on the Platform Map / Explore page (/explore). It is a navigation directory grouping all tools and pages into categories (e.g. Cognitive Immunity Curriculum and more), each entry showing a plain name, a method tag, a description, and a link. It calls no API. Help the user pick the right destination for their goal. One-Law: describe only pages that exist on this map; never invent a tool or claim — if unsure, say Unverified / غير موثّق.",
  },
  "/god-system": {
    title: "The God System",
    titleAr: "النظام الشامل (God System)",
    scenarios: [
      {
        paste: "Bill Gates put microchips in vaccines to track people through 5G.",
        pasteAr: "بيل جيتس حطّ شرائح في اللقاحات عشان يتبع الناس عن طريق الـ5G.",
        note: "Runs every engine at once: fallacy, bias, sentiment, OSINT and dialect analysis.",
        noteAr: "بيشغّل كل المحركات مرة واحدة: المغالطات، التحيّز، المشاعر، OSINT وتحليل اللهجة.",
      },
    ],
    useCases: [
      {
        help: "Orchestrates all the platform's analysis engines simultaneously on one claim and returns a unified verdict with explanation.",
        helpAr: "بينسّق كل محركات التحليل في المنصّة مرة واحدة على ادعاء واحد ويرجّع حُكم موحّد مع شرح.",
        apply: "Use it for a deep, all-in-one breakdown of a complex or coordinated claim before you trust it.",
        applyAr: "استخدمه لتحليل عميق شامل لادعاء معقّد أو منسّق قبل ما تثق فيه.",
      },
    ],
    chatbotContext:
      "You are the assistant on The God System page (/god-system). It POSTs a claim to /api/god-system, which runs a 7-layer pipeline orchestrating multiple engines (fallacy detection, bias, sentiment, OSINT, Arabic-dialect analysis) and returns a verdict with bilingual verdictExplanation and supporting analysis. Help the user phrase a claim and read the layered output. One-Law: never fabricate a source, score, hadith-grade, or fatwa; when unsupported, say Unverified / غير موثّق.",
  },
  "/language-select": {
    title: "Language Selection",
    titleAr: "اختيار اللغة",
    scenarios: [
      {
        paste: "What is the difference between the Arabic and Egyptian-dialect options?",
        pasteAr: "إيه الفرق بين خيار العربية وخيار اللهجة المصرية؟",
        note: "A one-time setup screen — ask the assistant about the language options.",
        noteAr: "شاشة إعداد لمرة واحدة — اسأل المساعد عن خيارات اللغة.",
      },
    ],
    useCases: [
      {
        help: "Lets you choose the interface language (Arabic, English, or Egyptian dialect) and sets RTL/LTR direction for the whole site.",
        helpAr: "بتخلّيك تختار لغة الواجهة (عربية، إنجليزية، أو لهجة مصرية) وتضبط اتجاه RTL/LTR للموقع كله.",
        apply: "Pick the language you read most comfortably so every page and tool speaks to you correctly.",
        applyAr: "اختار اللغة اللي بتقراها بأريحية عشان كل صفحة وأداة تكلّمك صح.",
      },
    ],
    chatbotContext:
      "You are the assistant on the Language Selection page (/language-select). It lets the user choose ar, en, or ar-EG, toggles RTL/LTR, and saves the choice to localStorage (eal-language); no auto-redirect and no API call. Help the user understand the options and switch language. One-Law: this page makes no factual claims, so simply explain the choice; never invent platform behavior.",
  },
  "/mental-health/depression": {
    title: "Depression Support Program (14-Day CBT)",
    titleAr: "برنامج دعم الاكتئاب (14 يوم CBT)",
    scenarios: [
      {
        paste: "I have felt empty and exhausted for two weeks and can't enjoy anything — where do I start?",
        pasteAr: "بقالي أسبوعين حاسس بالفراغ والإرهاق ومش قادر أستمتع بأي حاجة — أبدأ منين؟",
        note: "Day 1 starts with the PHQ-9 baseline; this is educational support, not a diagnosis.",
        noteAr: "اليوم 1 بيبدأ بتقييم PHQ-9 الأساسي؛ ده دعم تعليمي مش تشخيص.",
      },
    ],
    useCases: [
      {
        help: "A 14-day CBT-based program (PHQ-9 baseline, sleep, ANTs, behavioral activation, cognitive restructuring, gratitude and more) grounded in named clinical sources.",
        helpAr: "برنامج 14 يوم قائم على العلاج المعرفي السلوكي (تقييم PHQ-9، النوم، الأفكار السلبية، التنشيط السلوكي، إعادة الهيكلة المعرفية، الامتنان وغيرها) مبني على مصادر سريرية معروفة.",
        apply: "Do one structured day at a time to build evidence-based habits — and seek a clinician for severe symptoms.",
        applyAr: "اعمل يوم منظّم في المرة عشان تبني عادات مبنية على الدليل — واطلب طبيب لو الأعراض شديدة.",
      },
    ],
    chatbotContext:
      "You are the assistant on the Depression Support Program page (/mental-health/depression). It is a 14-day educational CBT program (Day 1 PHQ-9 baseline, then sleep hygiene, automatic negative thoughts, behavioral activation, exercise, cognitive restructuring, gratitude, etc.) citing sources like WHO, Beck, Kroenke PHQ-9 and Seligman; it is NOT a diagnosis or treatment. The Egypt crisis helpline is 08008880700. One-Law: never invent a study, effect size, or clinical fact; for severe/suicidal signs urge professional help, and label anything unsourced as Unverified / غير موثّق.",
  },
  "/passport": {
    title: "Inoculation Passport",
    titleAr: "جواز المناعة المعرفية",
    scenarios: [
      {
        paste: "How is my Cognitive Immunity Score calculated and what counts as a 'caught' deception?",
        pasteAr: "إزاي بتتحسب درجة مناعتي المعرفية وإيه اللي بيتحسب «خداع اتمسك»؟",
        note: "A personal dashboard — ask the assistant to explain your meters and 8-layer coverage.",
        noteAr: "لوحة شخصية — اطلب من المساعد يشرح عدّاداتك وتغطية الـ8 طبقات.",
      },
    ],
    useCases: [
      {
        help: "Bootstraps your Cognitive Passport and shows your measured Cognitive Immunity Score, immunity meters, 8-layer deception coverage, and the cohort efficacy headline.",
        helpAr: "بيؤسّس جوازك المعرفي ويعرض درجة مناعتك المقيسة، عدّادات المناعة، تغطية الخداع بالـ8 طبقات، وعنوان الفعالية الجماعية.",
        apply: "Track real progress over time — your immunity is recorded from your activity, not self-asserted.",
        applyAr: "تابع تقدّمك الحقيقي مع الوقت — مناعتك مُسجَّلة من نشاطك، مش مُدّعاة.",
      },
    ],
    chatbotContext:
      "You are the assistant on the Inoculation Passport page (/passport). It bootstraps a Cognitive Passport via /api/auth/passport and reads /api/ledger and /api/efficacy to show the Cognitive Immunity Score, immunity meters (caught/missed/reviewed, accuracy, streak), 8-layer deception coverage, and the cohort efficacy headline. Help the user read these recorded metrics. One-Law: never invent a score or deception count; if a value is absent, say Unverified / غير موثّق.",
  },
  "/publishing-plan": {
    title: "Publishing & Launch Plan",
    titleAr: "خطة النشر والإطلاق",
    scenarios: [
      {
        paste: "What are the launch phases and the guardrails before going public?",
        pasteAr: "إيه مراحل الإطلاق والضوابط قبل النشر للعامة؟",
        note: "A roadmap page — ask the assistant about a specific phase or guardrail.",
        noteAr: "صفحة خريطة طريق — اسأل المساعد عن مرحلة أو ضابط معيّن.",
      },
    ],
    useCases: [
      {
        help: "Lays out the project's publishing roadmap in phases plus the bilingual launch guardrails that must hold before release.",
        helpAr: "بتعرض خريطة طريق النشر للمشروع على مراحل، مع ضوابط الإطلاق ثنائية اللغة اللازم تتحقق قبل الإصدار.",
        apply: "Use it to understand what ships when and which safety rules gate each launch step.",
        applyAr: "استخدمها عشان تفهم إيه اللي بينزل إمتى وأنهي قواعد أمان بتحكم كل خطوة إطلاق.",
      },
    ],
    chatbotContext:
      "You are the assistant on the Publishing & Launch Plan page (/publishing-plan). It is a static roadmap built from PUBLISHING_PHASES and bilingual PUBLISHING_GUARDRAILS data, showing launch phases and the guardrails required before going public. It calls no API. Help the user navigate phases and guardrails. One-Law: describe only what the page lists; never invent a date, metric, or commitment — if unsure, say Unverified / غير موثّق.",
  },
  "/religion-hub/tools/hadith-check": {
    title: "Hadith Authenticity Checker",
    titleAr: "أداة التحقق من صحة الحديث",
    scenarios: [
      {
        paste: "Whoever seeks knowledge, paradise seeks him.",
        pasteAr: "مَن طلب العلم طلبه الجنة.",
        note: "Returns a classification (Sahih/Hasan/Da'if/Mawdu'), source book, and narrator-chain analysis.",
        noteAr: "بيرجّع تصنيف (صحيح/حسن/ضعيف/موضوع)، الكتاب المصدر، وتحليل سلسلة الرواة.",
      },
    ],
    useCases: [
      {
        help: "Checks a hadith's authenticity grade, its source book and number, narrator-chain (isnad) analysis, and scholar opinions before you share it.",
        helpAr: "بيفحص درجة صحة الحديث، الكتاب ورقم الحديث، تحليل سلسلة الرواة (الإسناد)، وأقوال العلماء قبل ما تنشره.",
        apply: "Before forwarding a hadith you saw online, verify its grade here so you don't spread a weak or fabricated one.",
        applyAr: "قبل ما تبعت حديث شُفته أونلاين، تأكّد من درجته هنا عشان ما تنشرش ضعيف أو موضوع.",
      },
    ],
    chatbotContext:
      "You are the assistant on the Hadith Authenticity Checker page (/religion-hub/tools/hadith-check). It POSTs hadith text to /api/defense/hadith-check and returns a classification (Sahih, Hasan, Da'if, Mawdu'), a confidence percent, the source book and number, narrator-chain (isnad) analysis with weak links, and scholar opinions. One-Law (Islamic Authenticity Protocol is strict): NEVER fabricate a hadith grade, isnad, source-book reference, or scholar opinion; if the grade is not verifiable, say Unverified / غير موثّق and advise consulting a qualified scholar.",
  },
  "/rumor-heatmap": {
    title: "Rumor Epidemiology Simulator",
    titleAr: "محاكي وبائيات الشائعات",
    scenarios: [
      {
        paste: "Population 1,000,000 · R0 = 3 · belief lasts 5 days · 10 initial believers · 30% pre-bunked.",
        pasteAr: "تعداد 1,000,000 · R0 = 3 · التصديق بيدوم 5 أيام · 10 مصدّقين في البداية · 30% اتطعّموا مسبقًا.",
        note: "An interactive SIR model — change the inoculated fraction and watch the peak drop.",
        noteAr: "نموذج SIR تفاعلي — غيّر نسبة المُطعَّمين وشوف الذروة بتنزل.",
      },
    ],
    useCases: [
      {
        help: "Simulates how a rumor spreads like a contagion (SIR model) and shows how prebunking a fraction of people creates herd immunity that flattens the peak.",
        helpAr: "بيحاكي إزاي الشائعة بتنتشر زي العدوى (نموذج SIR) ويوضّح إزاي تطعيم نسبة من الناس بيخلق مناعة قطيع بتفلطح الذروة.",
        apply: "See concretely why prebunking matters — small inoculation can stop a rumor from reaching everyone.",
        applyAr: "شوف بشكل ملموس ليه التطعيم المسبق مهم — تطعيم بسيط ممكن يمنع الشائعة من إنها توصل للكل.",
      },
    ],
    chatbotContext:
      "You are the assistant on the Rumor Epidemiology Simulator page (/rumor-heatmap). It runs a client-side SIR (Susceptible–Infected–Recovered) model (beta = R0*gamma, gamma = 1/belief-duration) where inoculation removes a fraction from the susceptible pool; inputs are population, R0, belief duration, initial believers, and inoculated fraction, outputs are the S/I/R curves, peak size and peak day. It cites Kermack & McKendrick (1927), Daley & Kendall (1964) and Vosoughi et al. (2018). One-Law: the numbers are model outputs, not measured real-world data — never present them as observed facts; if asked for real figures, say Unverified / غير موثّق.",
  },
  "/swarm-debate": {
    title: "AI Debate Panel",
    titleAr: "لجنة المناظرة بالذكاء الاصطناعي",
    scenarios: [
      {
        paste: "Vaccines are dangerous because my cousin got sick right after his shot.",
        pasteAr: "اللقاحات خطيرة لأن ابن عمي مرض على طول بعد ما اتطعّم.",
        note: "Pick an adversary archetype, then write a rebuttal that names the fallacy it used.",
        noteAr: "اختار شخصية خصم، وبعدين اكتب رد يسمّي المغالطة اللي استخدمها.",
      },
    ],
    useCases: [
      {
        help: "Trains your rebuttal skills against 5 adversary archetypes, each using a different manipulation tactic; after you reply it reveals the fallacy and whether you named it.",
        helpAr: "بيدرّب مهارات الرد عندك ضد 5 شخصيات خصم، كل واحدة بتستخدم تكتيك تلاعب مختلف؛ بعد ما ترد بيكشف المغالطة وهل سمّيتها.",
        apply: "Practice real arguments in a safe arena so you can spot and name manipulation tactics in actual debates.",
        applyAr: "اتمرّن على نقاشات حقيقية في ساحة آمنة عشان تقدر تكشف وتسمّي تكتيكات التلاعب في المناظرات الفعلية.",
      },
    ],
    chatbotContext:
      "You are the assistant on the AI Debate Panel page (/swarm-debate). It POSTs to /api/debate-sim: you choose one of 5 adversary archetypes (e.g. Ad-Hominem Attacker), the AI makes a manipulative counter-argument each round, you write a rebuttal, and it reveals which fallacy the AI used and whether your rebuttal named it. Help the user craft evidence-based rebuttals and identify fallacies. One-Law: never invent a real study or source to win a round; if a fact is unverified, say Unverified / غير موثّق.",
  },
  "/ux-science": {
    title: "Behavioral Hooks Explained",
    titleAr: "الخدع السلوكية مشروحة",
    scenarios: [
      {
        paste: "Why do I keep coming back to protect my streak — is that manipulating me?",
        pasteAr: "ليه برجع كل يوم أحمي تسلسلي — هو ده تلاعب فيا؟",
        note: "A transparency page — ask the assistant to explain any one of the behavioral hooks shown.",
        noteAr: "صفحة شفافية — اطلب من المساعد يشرح أي خدعة سلوكية من المعروضة.",
      },
    ],
    useCases: [
      {
        help: "Exposes and explains every psychological technique (variable reward, streaks, social proof, loss aversion, etc.) the site uses on you — the same hooks Instagram, TikTok and Duolingo deploy.",
        helpAr: "بيكشف ويشرح كل تقنية نفسية (المكافأة المتغيرة، التسلسل، الدليل الاجتماعي، نفور الخسارة، إلخ) الموقع بيستخدمها معاك — نفس الخدع اللي Instagram وTikTok وDuolingo بيشتغلوا بيها.",
        apply: "Learn to recognize these hooks here so you spot the same manipulation in the apps you use every day.",
        applyAr: "اتعلّم تتعرّف على الخدع دي هنا عشان تكشف نفس التلاعب في التطبيقات اللي بتستخدمها كل يوم.",
      },
    ],
    chatbotContext:
      "You are the assistant on the Behavioral Hooks Explained page (/ux-science). It is a static transparency catalog of ~30 behavioral/persuasion hooks the platform itself uses (variable reward, streak maintenance, social proof, loss aversion, etc.), each with a name and explanation, framed so users can recognize the same tactics in other apps. It calls no API. Help the user understand each hook. One-Law: describe only the hooks listed; never invent a psychological 'law' or statistic — if unsure, say Unverified / غير موثّق.",
  },
};
