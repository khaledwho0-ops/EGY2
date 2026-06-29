import type { PageGuide } from "@/data/page-guides";

export const P1: Record<string, PageGuide> = {
  "/": {
    title: "Home — Egyptian Awareness Library",
    titleAr: "الرئيسية — مكتبة الوعي المصري",
    scenarios: [
      {
        paste: "What can this platform actually do, and where should I start?",
        pasteAr: "إيه اللي المنصة دي بتعمله بالظبط، وأبدأ منين؟",
        note: "A first-visit orientation question — the home page is the front door to all tools.",
        noteAr: "سؤال توجيه لأول زيارة — الصفحة الرئيسية هي الباب لكل الأدوات.",
      },
    ],
    useCases: [
      {
        help: "Introduces the three core defenses (DeepReal media verification, Mental Health, Religion Hub) and links every tool from one place.",
        helpAr: "بتعرّفك بالدفاعات التلاتة الأساسية (ديب ريل للتحقق من الإعلام، الصحة النفسية، مركز الدين) وبتوصّلك لكل أداة من مكان واحد.",
        apply: "Land here first to understand the platform, then jump to the tool that fits your problem.",
        applyAr: "ابدأ من هنا عشان تفهم المنصة، وبعدين انتقل للأداة اللي تناسب مشكلتك.",
      },
    ],
    chatbotContext:
      "You are the assistant on the Home (landing) page of the Egyptian Awareness Library (موثوق). The page presents the three core MVPs (DeepReal media verification, Mental Health, Religion Hub), evidence features, methodology, and links to every tool. Help users find the right page for their need and explain what the platform does. One-Law: never fabricate a statistic, source, or hadith-grade; if something is unsourced, say \"غير موثّق / Unverified\".",
  },
  "/ai-agents": {
    title: "AI Agents Investigation",
    titleAr: "تحقيق وكلاء الذكاء الاصطناعي",
    scenarios: [
      {
        paste: "Egyptian onions cure the new flu strain spreading this winter.",
        pasteAr: "البصل المصري بيشفي سلالة الإنفلونزا الجديدة المنتشرة الشتا ده.",
        note: "Watch five agents (source-hunter, bias-detector, arabic-linguist, timeline-builder, counter-narrative) investigate one claim.",
        noteAr: "شوف خمس وكلاء (صائد المصادر، كاشف التحيز، اللغوي العربي، باني الخط الزمني، السردية المضادة) بيحققوا في ادعاء واحد.",
      },
    ],
    useCases: [
      {
        help: "Runs a multi-agent investigation on a claim and returns a structured report with a verdict and each agent's findings.",
        helpAr: "بيشغّل تحقيق متعدد الوكلاء على ادعاء وبيرجّع تقرير منظّم بحُكم ونتائج كل وكيل.",
        apply: "Paste a viral claim you can't easily check yourself and read the combined report before resharing.",
        applyAr: "الصق ادعاء منتشر صعب تتأكد منه بنفسك واقرأ التقرير المجمّع قبل ما تعيد نشره.",
      },
    ],
    chatbotContext:
      "You are the assistant on the AI Agents Investigation page. It accepts a claim and calls /api/agents/investigate, where five specialist agents (source-hunter, bias-detector, arabic-linguist, timeline-builder, counter-narrative) produce an InvestigationReport with a verdict (TRUE/FALSE/MISLEADING/UNVERIFIED/PARTIALLY_TRUE), confidence, and per-agent findings. Help the user phrase a claim and read the report. One-Law: never invent a source or score; if unsourced, the verdict is UNVERIFIED / غير موثّق.",
  },
  "/bias-fingerprint": {
    title: "Cognitive Bias Fingerprint",
    titleAr: "بصمة الانحياز المعرفي",
    scenarios: [
      {
        paste: "When I see a claim that matches what I already believe, I tend to accept it without checking the source.",
        pasteAr: "لما أشوف ادعاء بيتفق مع اللي أنا مصدقه أصلاً، بميل أصدقه من غير ما أتأكد من المصدر.",
        note: "Rate each behavioural scenario honestly (0–4); your answers compute a real vulnerability % per bias.",
        noteAr: "قيّم كل موقف سلوكي بصدق (0–4)؛ إجاباتك بتحسب نسبة هشاشة حقيقية لكل انحياز.",
      },
    ],
    useCases: [
      {
        help: "Builds a personal map of which cognitive biases you are most vulnerable to, computed from your own self-assessment answers.",
        helpAr: "بيبني خريطة شخصية للانحيازات المعرفية اللي إنت أكتر عرضة لها، محسوبة من إجاباتك في التقييم الذاتي.",
        apply: "Answer honestly, then watch out for your top biases when you read news or argue online.",
        applyAr: "جاوب بصدق، وبعدين خد بالك من أعلى انحيازاتك وإنت بتقرأ أخبار أو بتتناقش أونلاين.",
      },
    ],
    chatbotContext:
      "You are the assistant on the Cognitive Bias Fingerprint page. Users rate name-free behavioural scenarios on a 0–4 Likert scale (one per bias: confirmation, anchoring, authority, emotional, etc.); answers persist in localStorage and map deterministically to a 0–100% vulnerability score per bias — there are NO hardcoded percentages. Help the user interpret their scores and apply the tip/exercises. One-Law: never invent a study or stat behind a bias; mark anything unsourced as غير موثّق / Unverified.",
  },
  "/connect": {
    title: "EAL Network",
    titleAr: "شبكة EAL",
    scenarios: [
      {
        paste: "How do XP and levels work, and how do I create a peer challenge?",
        pasteAr: "نقاط الخبرة (XP) والمستويات بتشتغل إزاي، وأعمل تحدي للأقران إزاي؟",
        note: "A navigation question — this is the gamified community page, not an analysis tool.",
        noteAr: "سؤال تنقّل — دي صفحة المجتمع المحفّزة باللعب، مش أداة تحليل.",
      },
    ],
    useCases: [
      {
        help: "Shows your XP, rank/level, and peer-challenge activity so progress feels like a shared mission.",
        helpAr: "بتعرض نقاط خبرتك ومرتبتك ونشاط تحديات الأقران عشان التقدم يبقى مهمة مشتركة.",
        apply: "Track your level here and create a challenge to push friends to verify claims together.",
        applyAr: "تابع مستواك هنا واعمل تحدي يخلّي أصحابك يتحققوا من الادعاءات مع بعض.",
      },
    ],
    chatbotContext:
      "You are the assistant on the EAL Network (/connect) page. It is a gamified community hub: it reads the signed-in user's XP from their profile (level = floor(xp/1000)+1) and shows peer challenges and leaderboards. Note that the displayed challenge cards are clearly labelled illustrative sample data, not live community activity, and creating a challenge links to /peer-challenge. One-Law: do not present sample/illustrative numbers as real stats; if a figure is not from a real source, say غير موثّق / Unverified.",
  },
  "/dashboard": {
    title: "My Dashboard",
    titleAr: "لوحتي",
    scenarios: [
      {
        paste: "What does my confidence-shift number mean, and how do I export my data?",
        pasteAr: "رقم تحوّل الثقة بتاعي معناه إيه، وأصدّر بياناتي إزاي؟",
        note: "An orientation question — the dashboard summarizes your personal training progress and stats.",
        noteAr: "سؤال توجيه — اللوحة بتلخّص تقدمك الشخصي في التدريب وإحصائياتك.",
      },
    ],
    useCases: [
      {
        help: "Brings your curriculum progress, streaks, confidence shift, source-click and verification stats, and exportable reports into one view.",
        helpAr: "بتجمّع تقدمك في المنهج، والمواظبة، وتحوّل الثقة، وإحصائيات الضغط على المصادر والتحقق، وتقارير قابلة للتصدير في مكان واحد.",
        apply: "Check it weekly to see whether your verification habits are actually improving, and export a report when you need proof.",
        applyAr: "افتحها أسبوعياً عشان تشوف هل عادات التحقق بتاعتك بتتحسّن فعلاً، وصدّر تقرير لما تحتاج إثبات.",
      },
    ],
    chatbotContext:
      "You are the assistant on the personal Dashboard (/dashboard) page. It reads the user's local progress data (completed days, current day, streak, time-on-task, confidence shift, source-click and verification stats, COM-B profile) and can build/print/share an awareness report and export research CSV/JSON. Everything shown is the user's own tracked activity, not external claims. One-Law: never fabricate a metric the tracker didn't record; if data is missing, say so rather than inventing it (غير موثّق / Unverified).",
  },
  "/defense-pages-map": {
    title: "Defense Pages Map",
    titleAr: "خريطة صفحات الدفاع",
    scenarios: [
      {
        paste: "I want to check a hadith and also audit a research paper — which tools do I use?",
        pasteAr: "عايز أتحقق من حديث وكمان أدقّق ورقة بحثية — أستخدم أنهي أدوات؟",
        note: "A wayfinding question — this page is the categorized directory of every tool.",
        noteAr: "سؤال إرشاد — الصفحة دي دليل مصنّف لكل الأدوات.",
      },
    ],
    useCases: [
      {
        help: "Lays out every tool grouped by category (Verification, DeepReal & Media, Cognitive Training, Islamic Defense, Mental Health, Intelligence) with a one-line description and link.",
        helpAr: "بتعرض كل الأدوات مجمّعة بالفئة (التحقق، ديب ريل والإعلام، التدريب المعرفي، الدفاع الإسلامي، الصحة النفسية، الاستخبارات) مع وصف سطر ورابط.",
        apply: "Use it as the table of contents — find the category that matches your problem and click straight to the tool.",
        applyAr: "استخدمها كفهرس — لاقي الفئة اللي تناسب مشكلتك واضغط على الأداة مباشرةً.",
      },
    ],
    chatbotContext:
      "You are the assistant on the Defense Pages Map (/defense-pages-map). It is a static navigational directory grouping all platform tools into six categories with names, short descriptions, and links (e.g. /angry-debunkers, /paper-auditor, /religion-hub/tools/hadith-check, /trend-hunter). It performs no analysis itself. Help the user pick the right destination tool. One-Law: descriptions here are navigation aids, not verified claims; never invent a tool or capability that isn't listed.",
  },
  "/evidence": {
    title: "Evidence Aggregator",
    titleAr: "مُجمِّع الأدلة",
    scenarios: [
      {
        paste: "intermittent fasting type 2 diabetes",
        pasteAr: "الصيام المتقطع السكري النوع الثاني",
        note: "Search 7 scholarly databases at once and rank real peer-reviewed evidence, not blog posts.",
        noteAr: "ابحث في 7 قواعد علمية مرة واحدة ورتّب أدلة محكّمة حقيقية، مش مدوّنات.",
      },
    ],
    useCases: [
      {
        help: "Queries OpenAlex, Semantic Scholar, Europe PMC, DOAJ, Crossref, arXiv and CORE together, with filters for open access and sort by year/relevance.",
        helpAr: "بيستعلم من OpenAlex وSemantic Scholar وEurope PMC وDOAJ وCrossref وarXiv وCORE مع بعض، بفلاتر للوصول المفتوح وترتيب بالسنة/الصلة.",
        apply: "When someone says \"studies show…\", search the topic here and check whether strong sources actually agree.",
        applyAr: "لما حد يقول «الدراسات بتقول…»، ابحث الموضوع هنا وشوف هل المصادر القوية فعلاً متفقة.",
      },
    ],
    chatbotContext:
      "You are the assistant on the Evidence Aggregator (/evidence) page. It sends the user's query to /api/search/evidence, which aggregates OpenAlex, Semantic Scholar, Europe PMC, DOAJ, Crossref, arXiv and CORE, then lets the user filter by source/open-access and sort by relevance or year. Explain how to read titles, citation counts, and access status. One-Law: never overstate a single preprint — flag preprints as not peer-reviewed; if no source supports a claim, say غير موثّق / Unverified.",
  },
  "/global-alliance": {
    title: "Global Alliance Directory",
    titleAr: "دليل التحالف العالمي",
    scenarios: [
      {
        paste: "Which fact-checking organizations operate in the Middle East?",
        pasteAr: "أنهي منظمات تدقيق المعلومات بتشتغل في الشرق الأوسط؟",
        note: "Filter the directory by category and region to find a real organization to consult.",
        noteAr: "فلتر الدليل بالفئة والمنطقة عشان تلاقي منظمة حقيقية تستشيرها.",
      },
    ],
    useCases: [
      {
        help: "A searchable directory of real anti-misinformation organizations grouped by category (fact-checking, media literacy, AI ethics, digital rights, etc.) and region.",
        helpAr: "دليل قابل للبحث لمنظمات حقيقية بتحارب التضليل، مجمّعة بالفئة (تدقيق المعلومات، الثقافة الإعلامية، أخلاقيات الذكاء الاصطناعي، الحقوق الرقمية...) وبالمنطقة.",
        apply: "When you need an authoritative external body to verify with or report to, find one here by region and topic.",
        applyAr: "لما تحتاج جهة خارجية موثوقة تتأكد معاها أو تبلّغها، لاقي واحدة هنا بالمنطقة والموضوع.",
      },
    ],
    chatbotContext:
      "You are the assistant on the Global Alliance Directory (/global-alliance). It renders a searchable, filterable list of real misinformation-fighting organizations from the local organizations dataset, grouped by category and region with links. It performs no claim analysis. Help users filter and pick an organization. One-Law: only reference organizations actually in the directory; never invent an org, an endorsement, or a statistic about one — if unknown, say غير موثّق / Unverified.",
  },
  "/knowledge-graph": {
    title: "Knowledge Graph",
    titleAr: "رسم المعرفة",
    scenarios: [
      {
        paste: "Show me how vaccine-related topics connect under the DeepReal hub.",
        pasteAr: "ورّيني إزاي مواضيع اللقاحات بتترابط تحت محور ديب ريل.",
        note: "Use the search/filter to explore how documented KEYHUNTER topics cluster around the three MVP hubs.",
        noteAr: "استخدم البحث/الفلتر عشان تستكشف إزاي مواضيع KEYHUNTER الموثّقة بتتجمّع حوالين المحاور التلاتة.",
      },
    ],
    useCases: [
      {
        help: "Visualizes the KEYHUNTER knowledge base as an interactive D3 network linking each documented topic to its MVP hub (DeepReal, Mental Health, Religion Hub).",
        helpAr: "بيتخيّل قاعدة معرفة KEYHUNTER كشبكة D3 تفاعلية بتربط كل موضوع موثّق بمحوره (ديب ريل، الصحة النفسية، مركز الدين).",
        apply: "Explore the graph to see which misinformation topics belong to which domain and how they relate.",
        applyAr: "استكشف الرسم عشان تشوف أنهي مواضيع تضليل بتتبع أنهي مجال وإزاي مترابطين.",
      },
    ],
    chatbotContext:
      "You are the assistant on the Knowledge Graph (/knowledge-graph) page. It builds an interactive D3 force-directed graph from the local ALL_KEYHUNTER_ENTRIES dataset: a root node, three MVP hub nodes (deepreal, mental-health, religion-hub), and one node per documented topic linked to its hub, with search and type filters. Help the user navigate nodes and understand the structure. One-Law: nodes reflect only the existing dataset — never invent a topic, link, or status; unsourced items are غير موثّق / Unverified.",
  },
  "/mental-health": {
    title: "Mental Health Hub",
    titleAr: "مركز الصحة النفسية",
    scenarios: [
      {
        paste: "I've felt down and lost interest in things for two weeks — what does this program suggest?",
        pasteAr: "بقالي أسبوعين حاسس بإحباط وفقدت اهتمامي بالحاجات — البرنامج ده بيقترح إيه؟",
        note: "Try the short PHQ self-check, then follow the 14-day evidence-based timeline. Crisis hotlines are listed at the top.",
        noteAr: "جرّب فحص PHQ القصير، وبعدين اتبع الخط الزمني 14 يوم المبني على الأدلة. خطوط الأزمات موجودة فوق.",
      },
    ],
    useCases: [
      {
        help: "Offers a brief PHQ-style self-assessment, a 14-day wellness program built on CBT/MBSR/behavioral-activation techniques, and Egyptian crisis hotlines.",
        helpAr: "بيقدّم تقييم ذاتي قصير على نمط PHQ، وبرنامج عافية 14 يوم مبني على تقنيات CBT وMBSR والتنشيط السلوكي، وخطوط أزمات مصرية.",
        apply: "Use the self-check to gauge where you are and follow a day at a time; if your score is severe or you're in crisis, call the listed hotline immediately.",
        applyAr: "استخدم الفحص الذاتي عشان تعرف إنت فين واتبع يوم في كل مرة؛ لو نتيجتك شديدة أو في أزمة، اتصل بالخط الموجود فوراً.",
      },
    ],
    chatbotContext:
      "You are the assistant on the Mental Health Hub (/mental-health) page. It provides a short PHQ-style self-assessment that scores Minimal/Mild/Moderate/Severe, a 14-day evidence-based wellness timeline (CBT, MBSR, behavioral activation, etc.), and real Egyptian crisis hotlines (e.g. MoHP 08008880700). This is psychoeducation, not a diagnosis or therapy. Always surface the crisis hotlines for severe distress and urge professional help. One-Law: never fabricate a study, statistic, or clinical claim; if a figure lacks a cited source, say غير موثّق / Unverified.",
  },
  "/paper-auditor": {
    title: "Paper Auditor",
    titleAr: "مدقق الأبحاث",
    scenarios: [
      {
        paste: "10.1038/s41586-021-03444-4",
        pasteAr: "10.1038/s41586-021-03444-4",
        note: "Paste a real DOI to pull live Crossref metadata, then work the PRISMA/CONSORT checklist and power calculator.",
        noteAr: "الصق DOI حقيقي عشان تجيب بيانات Crossref المباشرة، وبعدين اشتغل قائمة PRISMA/CONSORT وحاسبة القوة الإحصائية.",
      },
    ],
    useCases: [
      {
        help: "Looks up a paper by DOI via the live Crossref API and gives you reporting checklists (PRISMA/CONSORT) plus a statistical-power input to gauge study quality.",
        helpAr: "بيبحث الورقة بالـDOI عبر واجهة Crossref المباشرة وبيديك قوائم تقارير (PRISMA/CONSORT) مع مدخل قوة إحصائية لتقييم جودة الدراسة.",
        apply: "Before citing or trusting a study, audit its DOI here and check whether it meets basic reporting and sample-size standards.",
        applyAr: "قبل ما تستشهد بدراسة أو تثق فيها، دقّق الـDOI بتاعها هنا وشوف هل مستوفية معايير التقرير وحجم العيّنة الأساسية.",
      },
    ],
    chatbotContext:
      "You are the assistant on the Paper Auditor (/paper-auditor) page. The user pastes a DOI; it validates the format and queries the live Crossref API (https://api.crossref.org/works/{doi}) for real metadata (title, authors, journal, year, citations, open-access), then offers interactive PRISMA/CONSORT checklists and a statistical-power input. Help the user read the metadata and apply the checklists. One-Law: report only what Crossref actually returns; never invent metadata, a citation count, or a quality verdict — unknown fields are غير موثّق / Unverified.",
  },
  "/prompt-lab": {
    title: "Prompt Lab",
    titleAr: "مختبر البرومبت",
    scenarios: [
      {
        paste: "Search: deepfake",
        pasteAr: "ابحث: ديب فيك",
        note: "Filter by category/tag and copy a ready verification prompt (e.g. the Deepfake Detection Pass) to use in any AI tool.",
        noteAr: "فلتر بالفئة/الوسم وانسخ برومبت تحقّق جاهز (زي فحص كشف الديب فيك) تستخدمه في أي أداة ذكاء اصطناعي.",
      },
    ],
    useCases: [
      {
        help: "A curated library of copy-paste prompts for fact-checking, OSINT, analysis and debunking, filterable by category and KEYHUNTER tags.",
        helpAr: "مكتبة منتقاة من برومبتات جاهزة للنسخ لتدقيق المعلومات وOSINT والتحليل والتفنيد، قابلة للفلترة بالفئة ووسوم KEYHUNTER.",
        apply: "Copy the prompt that matches your task and paste it into your AI assistant to run a structured verification.",
        applyAr: "انسخ البرومبت اللي يناسب مهمتك والصقه في مساعدك الذكي عشان تعمل تحقّق منظّم.",
      },
    ],
    chatbotContext:
      "You are the assistant on the Prompt Lab (/prompt-lab) page. It is a static, searchable/filterable library of ready-made verification prompts (image-context check, deepfake detection, source-credibility, reverse-search dorks, fallacy breakdown) categorized as Fact-Checking/OSINT/Analysis/Debunking with copy buttons. It does not run the prompts itself. Help the user choose and adapt a prompt. One-Law: prompts are tools, not facts — never claim a prompt guarantees a verdict, and never fabricate sources within a prompt's output.",
  },
  "/reverse": {
    title: "Manipulation Reverse-Engineering",
    titleAr: "الهندسة العكسية للتلاعب",
    scenarios: [
      {
        paste: "Reverse engineer how a fake health-cure campaign spreads on Egyptian Facebook.",
        pasteAr: "افكّك إزاي حملة علاج وهمي بتنتشر على فيسبوك المصري.",
        note: "Break a manipulation into its tactic chain across truth, mental-health, and religious-coercion domains.",
        noteAr: "فكّك أي تلاعب لسلسلة تكتيكاته عبر مجالات الحقيقة والصحة النفسية والإكراه الديني.",
      },
    ],
    useCases: [
      {
        help: "Deconstructs how a manipulation campaign is built — input, amplification, emotional hook, call to action — across DeepReal, Mental Health, and Religion Hub domains, with a branching visual.",
        helpAr: "بيفكّك إزاي حملة التلاعب بتتبني — مدخل، تضخيم، خطّاف عاطفي، دعوة لفعل — عبر مجالات ديب ريل والصحة النفسية ومركز الدين، بتجربة بصرية متفرّعة.",
        apply: "When a message feels engineered to push you, map its tactic chain here so you can see the manipulation before it lands.",
        applyAr: "لما رسالة تحس إنها مصمّمة تدفعك، ارسم سلسلة تكتيكاتها هنا عشان تشوف التلاعب قبل ما يأثر فيك.",
      },
    ],
    chatbotContext:
      "You are the EAL Reverse Engineering assistant on /reverse. The page deconstructs manipulation mechanics across three domains (DeepReal/truth distortion, Mental Health exploitation, Religious coercion) using tactic-chain analysis (input → amplification → emotional hook → call to action), a BranchingVisualExperience, and per-module command centers. Help the user break down a manipulation and spot the emotional-exploitation vector. One-Law: explain mechanics generally; never fabricate a named campaign, source, or statistic — if unverified, say غير موثّق / Unverified.",
  },
  "/supervisor": {
    title: "Supervisor Dashboard",
    titleAr: "لوحة تحكم المشرف",
    scenarios: [
      {
        paste: "Which students are at risk and how is cohort completion trending?",
        pasteAr: "أنهي طلاب معرّضين للخطر وإزاي معدل إتمام المجموعة ماشي؟",
        note: "An orientation question — this is an institutional cohort-monitoring view (currently illustrative sample data).",
        noteAr: "سؤال توجيه — دي شاشة مراقبة مجموعة مؤسسية (حالياً ببيانات تجريبية توضيحية).",
      },
    ],
    useCases: [
      {
        help: "Gives an institution/teacher view of learner progress: scores, completion rate, at-risk flags, streaks, SCORM/xAPI metrics, with date-range filtering and export.",
        helpAr: "بيدّي للمؤسسة/المعلّم رؤية لتقدم المتعلمين: الدرجات، معدل الإتمام، تنبيهات الخطر، المواظبة، مقاييس SCORM/xAPI، مع فلترة بالمدى الزمني وتصدير.",
        apply: "Use it to spot struggling learners early and decide who needs follow-up.",
        applyAr: "استخدمها عشان تكتشف المتعلمين المتعثّرين بدري وتقرر مين محتاج متابعة.",
      },
    ],
    chatbotContext:
      "You are the assistant on the Supervisor Dashboard (/supervisor). It is an institutional/teacher cohort-monitoring view showing per-student progress, score, at-risk flag, module/day, streak, plus aggregate metrics (average score, completion rate, SCORM/xAPI) with date-range filters and export. The current student rows and metrics are illustrative sample data, not a live roster. One-Law: do not present these sample figures as real performance data; never fabricate a learner record or statistic — label illustrative data as such (غير موثّق / Unverified).",
  },
  "/trend-hunter": {
    title: "Trend Hunter",
    titleAr: "صياد الاتجاهات",
    scenarios: [
      {
        paste: "What's trending in Egypt right now, and which trends overlap with documented misinformation?",
        pasteAr: "إيه التريند في مصر دلوقتي، وأنهي تريندات بتتقاطع مع تضليل موثّق؟",
        note: "Compare live Google Trends (Egypt) against the dated kill-list archive of documented debunks.",
        noteAr: "قارن تريندات جوجل المباشرة (مصر) بأرشيف قائمة التصفية المؤرّخ للتفنيدات الموثّقة.",
      },
    ],
    useCases: [
      {
        help: "Pulls live Google Trends for Egypt and pairs them with a documented, dated archive of debunked claims (the kill-list) so you can watch what's spreading.",
        helpAr: "بيجيب تريندات جوجل المباشرة لمصر وبيقرنها بأرشيف موثّق ومؤرّخ من الادعاءات المفنَّدة (قائمة التصفية) عشان تتابع اللي بينتشر.",
        apply: "Check it before a topic blows up locally to see if a related rumor is already documented and debunked.",
        applyAr: "افتحها قبل ما موضوع ينفجر محلياً عشان تشوف لو شائعة مرتبطة بيه متوثّقة ومفنَّدة بالفعل.",
      },
    ],
    chatbotContext:
      "You are the assistant on the Trend Hunter (/trend-hunter) page. It calls /api/hunter/trends?geo=EG (live Google Trends RSS for Egypt: title, traffic, pubDate) and /api/kill-list (a dated archive of documented debunked claims with threat levels). Help the user read live trends and cross-reference the kill-list. One-Law: a trending topic is NOT a verified claim — never assert a trend is true or false without a sourced debunk; if undocumented, say غير موثّق / Unverified.",
  },
  "/religion-hub/tools/fatwa-context": {
    title: "Fatwa Context",
    titleAr: "سياق الفتوى",
    scenarios: [
      {
        paste: "Paste the text of a fatwa you received on WhatsApp to see its usul al-fiqh and madhhab context.",
        pasteAr: "الصق نص فتوى وصلتك على واتساب عشان تشوف سياقها الأصولي والمذهبي.",
        note: "The tool analyzes the fatwa text for jurisprudential context across the schools, not a yes/no ruling.",
        noteAr: "الأداة بتحلّل نص الفتوى لسياقها الفقهي عبر المذاهب، مش حُكم بنعم/لأ.",
      },
    ],
    useCases: [
      {
        help: "Analyzes a fatwa's text for usul al-fiqh and multi-madhhab context so you can see the reasoning and scope, not just a verdict.",
        helpAr: "بتحلّل نص الفتوى لسياقها الأصولي ومتعدد المذاهب عشان تشوف الاستدلال والنطاق، مش بس الحُكم.",
        apply: "Before acting on a forwarded fatwa, paste it here to understand its basis and check it against authoritative scholarship.",
        applyAr: "قبل ما تتصرف بناءً على فتوى موجّهة لك، الصقها هنا عشان تفهم أساسها وتراجعها على العلم المعتبر.",
      },
    ],
    chatbotContext:
      "You are the assistant on the Fatwa Context tool (/religion-hub/tools/fatwa-context). The user pastes a fatwa text; the page POSTs it to /api/islamic/fatwa-context and shows usul al-fiqh / multi-madhhab context for the ruling. It provides context, not a new fatwa. One-Law and the Islamic Authenticity Protocol are strict here: NEVER fabricate a hadith, a hadith authenticity grade, a Quran reference, a scholar's name, or a Dar al-Ifta ruling. If a source or grade is not verified, say صراحةً غير موثّق / Unverified and direct the user to a qualified scholar or Dar al-Ifta.",
  },
};
