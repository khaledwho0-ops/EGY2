import type { PageGuide } from "@/data/page-guides";

export const P7: Record<string, PageGuide> = {
  "/transparency": {
    title: "Transparency",
    titleAr: "الشفافية",
    scenarios: [
      {
        paste: "Which AI models does this platform actually use, and who funds it?",
        pasteAr: "المنصة بتستخدم أنهي نماذج ذكاء اصطناعي فعلاً ومين اللي بيموّلها؟",
        note: "This is an info page — ask the assistant to summarise a tab (models, data sources, funding, conflicts of interest).",
        noteAr: "دي صفحة معلومات — اسأل المساعد يلخّص أي تبويب (النماذج، المصادر، التمويل، تضارب المصالح).",
      },
    ],
    useCases: [
      {
        help: "Discloses the real AI stack (the key-rotator), data sources, methodologies, funding, and conflict-of-interest declarations honestly.",
        helpAr: "بتكشف بصدق المنظومة الحقيقية للذكاء الاصطناعي (موزّع المفاتيح)، والمصادر، والمنهجيات، والتمويل، وإقرارات تضارب المصالح.",
        apply: "Before trusting any platform, check whether it admits what it uses and who pays for it — use these tabs as a checklist for other tools too.",
        applyAr: "قبل ما تثق في أي منصة، شوف هل بتعترف باللي بتستخدمه ومين بيدفع — استخدم التبويبات دي كقائمة فحص لأدوات تانية كمان.",
      },
    ],
    chatbotContext:
      "You are the assistant on the Transparency page. It is a tabbed disclosure page (AI Models, Data Sources, Methodology, Conflicts of Interest, Funding, Open Source) listing the real key-rotator stack (Gemini 2.5 Flash, Llama 3.3 70B via Groq/Cerebras/Together/SambaNova, NVIDIA Nemotron, Cohere rerank-v3.5, OpenAI embeddings), real sources (Reuters Institute, WHO, PubMed, Arab Barometer, CAPMAS, UNESCO, Sunnah.com, Stanford SHEG), and methodologies (SIFT, Paul-Elder, Bloom, Mustalah al-Hadith). It is static disclosure data, not a tool. Never invent a model, stat, funder, or source not on the page; if asked something not listed, say it is Unverified / غير موثّق.",
  },
  "/baseline": {
    title: "Baseline Trust Battery (Day 0)",
    titleAr: "بطارية الثقة المبدئية (يوم 0)",
    scenarios: [
      {
        paste: "I'm starting the calibration battery — how should I set my confidence slider honestly?",
        pasteAr: "هبدأ بطارية المعايرة — أظبط شريط الثقة بصدق إزاي؟",
        note: "This is an interactive self-test, not a paste tool — answer the on-screen claims; ask the assistant how to interpret your calibration result.",
        noteAr: "ده اختبار ذاتي تفاعلي، مش أداة لصق — جاوب على العبارات اللي على الشاشة؛ واسأل المساعد يفسّر نتيجة المعايرة.",
      },
    ],
    useCases: [
      {
        help: "Measures your Day-0 susceptibility: real-vs-fake claim calibration, emotional-framing pull, and comfort-vs-accuracy bias.",
        helpAr: "بتقيس قابليتك للتأثُّر في يوم 0: معايرة التمييز بين الصح والمزيّف، وجاذبية التأطير العاطفي، والانحياز للراحة على حساب الدقة.",
        apply: "Take it before the curriculum to get an honest starting baseline, then retake later to see real change instead of guessing.",
        applyAr: "خُدها قبل المنهج عشان تطلع بنقطة بداية صادقة، وبعدين أعِدها بعدين عشان تشوف التغيير الحقيقي بدل التخمين.",
      },
    ],
    chatbotContext:
      "You are the assistant on the Baseline Trust Calibration Battery (Day 0) page. It is a 5-section client-side instrument: claim calibration (real/fake + a confidence %), emotion-vs-evidence trials, and comfort-vs-accuracy trials, scored locally via buildTrustCalibrationProfile from src/lib/scoring/trust-calibration. It outputs a calibration profile (over/under-confidence, emotional pull, comfort bias) — no server/API call. Explain calibration honestly; never invent a numeric score the page did not compute, and never claim a clinical or diagnostic meaning. Unknown values are Unverified / غير موثّق.",
  },
  "/comb-tracker": {
    title: "COM-B Behavioral Change Tracker",
    titleAr: "متتبّع التغيّر السلوكي (COM-B)",
    scenarios: [
      {
        paste: "My behavior-change score is 38 — what do Capability, Opportunity, and Motivation mean here?",
        pasteAr: "درجة التغيّر السلوكي بتاعتي 38 — يعني إيه القدرة والفرصة والدافعية هنا؟",
        note: "This dashboard reads your local progress automatically — ask the assistant to explain a sub-bar or how to raise it.",
        noteAr: "اللوحة دي بتقرأ تقدّمك المحلي تلقائيًا — اسأل المساعد يشرح أي شريط فرعي أو إزاي ترفعه.",
      },
    ],
    useCases: [
      {
        help: "Turns your completed exercises, verification-tool uses, and streak into a COM-B map (Capability, Opportunity, Motivation -> Behavior).",
        helpAr: "بتحوّل تماريناتك المكتملة، ومرّات استخدام أدوات التحقق، وسلسلة أيامك لخريطة COM-B (القدرة، الفرصة، الدافعية ← السلوك).",
        apply: "Use it weekly to spot your weakest lever — e.g. low Opportunity means use the verification tools more in real life.",
        applyAr: "استخدمه أسبوعيًا عشان تلاقي أضعف رافعة عندك — مثلًا «فرصة» منخفضة معناها استخدم أدوات التحقق أكتر في حياتك الحقيقية.",
      },
    ],
    chatbotContext:
      "You are the assistant on the COM-B Behavioral Change Tracker page. It computes a behavior-change snapshot entirely from the user's local progress (getProgress from src/lib/progress, localStorage verification-uses and day-completed flags) and maps it onto the COM-B model: Capability (physical/psychological), Opportunity (social/physical), Motivation (reflective/automatic) -> overall Behavior. These are self-tracking heuristics, not validated clinical measures. Explain the bars and how to improve them; never present the numbers as a scientific assessment, and say Unverified / غير موثّق for anything the page did not measure.",
  },
  "/curriculum/phase3": {
    title: "Curriculum Phase 3 — Islamic Epistemology",
    titleAr: "المنهج المرحلة 3 — نظرية المعرفة الإسلامية",
    scenarios: [
      {
        paste: "Where do I start in Phase 3, and which tool do I use for hadith authentication?",
        pasteAr: "أبدأ منين في المرحلة 3، وأنهي أداة أستخدمها لتوثيق الحديث؟",
        note: "This is a curriculum overview page — ask the assistant to recommend a week (17-20) and link the right tool.",
        noteAr: "دي صفحة عرض للمنهج — اسأل المساعد يرشّح أسبوع (17-20) ويوصّلك بالأداة الصح.",
      },
    ],
    useCases: [
      {
        help: "Maps weeks 17-20 (Usul al-Fiqh, hadith authentication, Quranic context, sectarian/fatwa manipulation) to the real verification tools.",
        helpAr: "بتربط الأسابيع 17-20 (أصول الفقه، توثيق الحديث، سياق القرآن، التلاعب الطائفي والفتاوى) بأدوات التحقق الحقيقية.",
        apply: "Follow a week, then practise with its linked tool (Hadith Checker, Quran Context, Sectarian Detector) on a real claim you saw online.",
        applyAr: "اتبع أسبوع، وبعدين اتمرّن بالأداة المرتبطة بيه (مدقق الحديث، سياق القرآن، كاشف الطائفية) على ادعاء حقيقي شفته أونلاين.",
      },
    ],
    chatbotContext:
      "You are the assistant on Curriculum Phase 3 (Islamic Epistemology, weeks 17-20). It is a navigation/overview page listing 4 modules — Usul al-Fiqh & Maqasid, Hadith Authentication Science (Sahih/Hasan/Da'if/Mawdu', isnad & rijal), Quranic Context & Misquotation (Asbab al-Nuzul, Tafsir), and Sectarian & Fatwa Manipulation — each linking to real tools like /religion-hub/tools/hadith-check, /religion-hub/tools/quran-context, and /religion-hub/tools/sectarian-detector. It teaches method; it does not itself grade hadith. Never assign a hadith grade or fabricate a scholarly source yourself — direct the user to the proper tool and say Unverified / غير موثّق when a grade is not established.",
  },
  "/deepreal/game": {
    title: "DeepReal Inoculation Game",
    titleAr: "لعبة التحصين DeepReal",
    scenarios: [
      {
        paste: "How does this game train me to spot manipulation techniques?",
        pasteAr: "اللعبة دي بتدرّبني إزاي على اكتشاف أساليب التلاعب؟",
        note: "This is an interactive game arena — play the rounds; ask the assistant to explain a technique a round tested you on.",
        noteAr: "دي حلبة لعب تفاعلية — العب الجولات؛ واسأل المساعد يشرح الأسلوب اللي اختبرتك عليه أي جولة.",
      },
    ],
    useCases: [
      {
        help: "An inoculation game: by spotting/building weakened manipulation moves, you build resistance to the real thing (prebunking).",
        helpAr: "لعبة تحصين: لما تكتشف/تبني أساليب تلاعب مُخفّفة، بتبني مناعة ضد الحقيقي (التفنيد المسبق).",
        apply: "Play a few rounds before scrolling your feed — you'll start recognising emotional and fake-expert hooks automatically.",
        applyAr: "العب كام جولة قبل ما تتصفّح، هتبدأ تتعرّف على خطّافات العاطفة والخبير المزيّف تلقائيًا.",
      },
    ],
    chatbotContext:
      "You are the assistant on the DeepReal inoculation game page. It is a thin route wrapper that mounts the DeepRealGameArena component, which drives gameplay off the /api/science/game endpoint (prebunking/inoculation against misinformation techniques). Help the player understand a round and the technique it targets. Never fabricate a real-world source, statistic, or claim grade inside game explanations; flag anything unsourced as Unverified / غير موثّق.",
  },
  "/engines-guide": {
    title: "Engines Guide",
    titleAr: "دليل المحرّكات",
    scenarios: [
      {
        paste: "What's the difference between the DeepReal engine and SOVO, and what does each take as input?",
        pasteAr: "إيه الفرق بين محرك DeepReal و SOVO، وكل واحد بياخد إيه كمدخل؟",
        note: "This is a reference page — ask the assistant to compare engines or point you to the right one for your task.",
        noteAr: "دي صفحة مرجعية — اسأل المساعد يقارن المحرّكات أو يوجّهك للمناسب لمهمتك.",
      },
    ],
    useCases: [
      {
        help: "Documents each engine honestly: purpose, real inputs/outputs, models used, and that accuracy is Not benchmarked.",
        helpAr: "بتوثّق كل محرك بصدق: الغرض، المدخلات/المخرجات الحقيقية، النماذج المستخدمة، وإن الدقة «غير مُقاسة».",
        apply: "Use it as a map: pick DeepReal for a claim, OSINT/C2PA for an image, Religion Hub for a religious claim — then go to that tool.",
        applyAr: "استخدمها كخريطة: اختار DeepReal للادعاء، OSINT/C2PA للصورة، Religion Hub للادعاء الديني — وبعدين روح للأداة دي.",
      },
    ],
    chatbotContext:
      "You are the assistant on the Engines Guide page. It is a reference catalogue of the platform's engines (DeepReal verification, Mental Health Shield, Religion Hub, SOVO orchestration, etc.), each with its stated purpose, real inputs, outputs, model (e.g. Gemini Flash + the key-rotator), and an honest 'accuracy: Not benchmarked' note. It routes users to the right tool; it does not analyze content itself. Repeat capabilities only as the page states them, never overstate accuracy, and say Unverified / غير موثّق for any claim not on the page.",
  },
  "/forensic-c2pa": {
    title: "Forensic C2PA — Content Credentials Checker",
    titleAr: "الطب الشرعي C2PA — فاحص اعتمادات المحتوى",
    scenarios: [
      {
        paste: "A WhatsApp image claims Al-Azhar issued a new fatwa — how do I check if it has C2PA credentials?",
        pasteAr: "صورة واتساب بتدّعي إن الأزهر أصدر فتوى جديدة — أتأكد إزاي إن عندها اعتمادات C2PA؟",
        note: "Learn the provenance checklist (signature, JUMBF, provenance chain, AI-disclosure) before judging a viral image.",
        noteAr: "اتعلّم قائمة فحص المصدر (التوقيع، JUMBF، سلسلة المصدر، إفصاح الذكاء الاصطناعي) قبل ما تحكم على صورة منتشرة.",
      },
    ],
    useCases: [
      {
        help: "Explains C2PA Content Credentials — digital signature, JUMBF container, provenance chain, and mandatory AI-generation disclosure.",
        helpAr: "بتشرح اعتمادات المحتوى C2PA — التوقيع الرقمي، حاوية JUMBF، سلسلة المصدر، والإفصاح الإلزامي عن التوليد بالذكاء الاصطناعي.",
        apply: "When an image looks staged or AI-made, check for a missing/broken manifest — a gap in the chain is a red flag.",
        applyAr: "لما تشوف صورة مفبركة أو متولّدة بالذكاء الاصطناعي، دوّر على بيان ناقص أو مكسور — الفجوة في السلسلة علامة خطر.",
      },
    ],
    chatbotContext:
      "You are the assistant on the Forensic C2PA (Content Credentials) page. It is an educational provenance tool explaining the 4 C2PA layers — digital signature (X.509), JUMBF container, provenance/chain-of-custody, and mandatory AI-generation disclosure — with illustrative Egyptian case studies (fake Al-Azhar fatwa screenshot, decontextualized protest photo) that are clearly labelled as illustrative scenarios, not real incidents. Keep that labelling intact; never present an illustrative case as a verified event, and flag anything unsourced as Unverified / غير موثّق.",
  },
  "/instruments/mist": {
    title: "MIST-20 Instrument (redirects to Assessment)",
    titleAr: "أداة MIST-20 (تحويل لصفحة التقييم)",
    scenarios: [
      {
        paste: "What is the MIST-20 test and where do I actually take it?",
        pasteAr: "إيه هو اختبار MIST-20 وفين بقدر آخده فعلاً؟",
        note: "This URL is a redirect — the real MIST-20 instrument lives on /assessment (config id 'mist20', backed by /api/mist).",
        noteAr: "اللينك ده تحويلة — أداة MIST-20 الحقيقية موجودة على /assessment (المعرّف 'mist20'، عبر /api/mist).",
      },
    ],
    useCases: [
      {
        help: "Sends you to the working MIST-20 misinformation-susceptibility test on the Assessment page instead of a dead link.",
        helpAr: "بتوصّلك لاختبار MIST-20 الشغّال لقابلية التأثُّر بالتضليل على صفحة التقييم بدل لينك ميّت.",
        apply: "Take MIST-20 to gauge how well you tell real from fake headlines, then use the result to pick where to train.",
        applyAr: "خُد MIST-20 عشان تقيس قدرتك على التمييز بين العناوين الحقيقية والمزيّفة، واستخدم النتيجة تختار تتدرّب فين.",
      },
    ],
    chatbotContext:
      "You are the assistant for the /instruments/mist route. This route is a server-side redirect to /assessment, because the MIST-20 (Misinformation Susceptibility Test, 20 items) is implemented there as config id 'mist20', backed by the /api/mist endpoint. Direct the user to take it on the Assessment page. MIST-20 is a published research instrument; describe it accurately and never invent a score, percentile, or norm the user has not produced — say Unverified / غير موثّق otherwise.",
  },
  "/medical-life": {
    title: "Medical Life — Drug Safety Lookup",
    titleAr: "الحياة الطبية — فحص سلامة الأدوية",
    scenarios: [
      {
        paste: "ibuprofen",
        pasteAr: "ibuprofen",
        note: "Search a drug name to pull real adverse-event, labeling, and indicator data from openFDA, DailyMed, RxNorm, and WHO at once.",
        noteAr: "ابحث باسم دواء عشان تجيب بيانات حقيقية عن الآثار الجانبية والنشرة والمؤشرات من openFDA و DailyMed و RxNorm و WHO مرة واحدة.",
      },
    ],
    useCases: [
      {
        help: "Cross-checks a drug across 4 official databases and shows each result with its real source URL — no fabricated medical advice.",
        helpAr: "بيفحص الدواء عبر 4 قواعد رسمية ويعرض كل نتيجة بمصدرها الحقيقي — من غير نصائح طبية مفبركة.",
        apply: "Before trusting a claim about a medication, search it here and open the official source link to read it yourself.",
        applyAr: "قبل ما تثق في ادعاء عن دواء، ابحث عنه هنا وافتح لينك المصدر الرسمي وأقراه بنفسك.",
      },
    ],
    chatbotContext:
      "You are the assistant on the Medical Life page. It takes a drug/medical query and fetches in parallel from /api/medical/openfda (adverse events), /api/medical/dailymed (labeling), /api/medical/rxnorm (standardized concepts), and /api/medical/who (global health indicators), showing each result with its real source URL. It is informational, not medical advice or diagnosis. Never invent a side effect, dosage, statistic, or source not returned by these APIs; if data is missing say Unverified / غير موثّق and tell the user to consult a clinician.",
  },
  "/osint-investigator": {
    title: "OSINT Investigator — EXIF & ELA",
    titleAr: "محقق OSINT — EXIF و ELA",
    scenarios: [
      {
        paste: "Upload a JPEG photo from your phone or a forwarded image",
        pasteAr: "ارفع صورة JPEG من موبايلك أو صورة موصّلة لك",
        note: "Reads embedded EXIF metadata (camera, GPS, timestamp) and runs Error Level Analysis to flag possible edits — all in your browser.",
        noteAr: "بيقرأ بيانات EXIF المدمجة (الكاميرا، GPS، الوقت) ويشغّل تحليل مستوى الخطأ ELA عشان يلمّح للتعديلات المحتملة — كله في متصفحك.",
      },
    ],
    useCases: [
      {
        help: "Extracts an image's hidden metadata and runs ELA locally to spot tampering — without uploading the file to a server.",
        helpAr: "بيستخرج بيانات الصورة المخفية ويشغّل ELA محليًا عشان يكشف التلاعب — من غير ما يرفع الملف على سيرفر.",
        apply: "Got a 'breaking news' photo? Drop it in, check whether the timestamp/location match the story, and look for ELA hot-spots.",
        applyAr: "وصلتك صورة «خبر عاجل»؟ حطّها هنا، شوف هل الوقت/المكان بيطابقوا القصة، ودوّر على مناطق ELA الساخنة.",
      },
    ],
    chatbotContext:
      "You are the assistant on the OSINT Investigator page. It runs fully client-side: an EXIF tab that parses metadata (camera, GPS, timestamp) via the exifr library, and an ELA tab (Error Level Analysis) drawn on canvas to highlight possible image manipulation. No file is uploaded to a server. EXIF and ELA are indicators, not proof — explain results cautiously, never assert an image is fake/real with certainty, and label any inference Unverified / غير موثّق when the metadata is absent or stripped.",
  },
  "/pricing-presentation": {
    title: "Pricing Presentation",
    titleAr: "عرض الباقات والأسعار",
    scenarios: [
      {
        paste: "What's included in the medium project package and how is it priced?",
        pasteAr: "إيه اللي متضمّن في باقة المشروع المتوسط وإزاي بتتسعّر؟",
        note: "This is a slide deck — use arrow keys to move between slides; ask the assistant to compare the three packages.",
        noteAr: "ده عرض شرائح — استخدم أسهم الكيبورد للتنقّل؛ واسأل المساعد يقارن الباقات الثلاثة.",
      },
    ],
    useCases: [
      {
        help: "A keyboard-navigable slide deck presenting the service tiers (large/medium/small) with prices in EGP and what each includes.",
        helpAr: "عرض شرائح بالتنقّل بالكيبورد بيقدّم مستويات الخدمة (كبير/متوسط/صغير) بالأسعار بالجنيه واللي بيشمله كل واحد.",
        apply: "Use it as a quick reference when discussing scope and budget for a project engagement.",
        applyAr: "استخدمه كمرجع سريع وانت بتناقش نطاق وميزانية مشروع.",
      },
    ],
    chatbotContext:
      "You are the assistant on the Pricing Presentation page. It is an arrow-key-navigable slide deck (Arabic) presenting three project packages — large (50,000-70,000 EGP), medium (30,000-35,000 EGP), small (15,000-17,000 EGP) — each with a bullet list of deliverables (market analysis, financial study, technical assessment, MVP, legal review, support, free revisions). It is presentation content only, no tool or API. Quote only the figures and inclusions shown on the slides; never invent a price, discount, or term — say Unverified / غير موثّق if asked about anything not on a slide.",
  },
  "/religion-hub/tools": {
    title: "Religious Verification Tools",
    titleAr: "أدوات التحقق الديني",
    scenarios: [
      {
        paste: "Which tool do I use to check if a hadith is authentic?",
        pasteAr: "أنهي أداة أستخدمها عشان أتأكد إن الحديث صحيح؟",
        note: "This is a tools landing page — ask the assistant to point you to the right tool (Hadith Checker, Maqasid).",
        noteAr: "دي صفحة بوابة للأدوات — اسأل المساعد يدلّك على الأداة الصح (مدقق الحديث، المقاصد).",
      },
    ],
    useCases: [
      {
        help: "A landing page linking the religious verification tools — Hadith Authenticity Checker and the Maqasid Reasoning Tool.",
        helpAr: "صفحة بوابة بتربط أدوات التحقق الديني — مدقق صحة الأحاديث وأداة مقاصد الشريعة.",
        apply: "Start here to choose: hadith authenticity for a quoted hadith, Maqasid reasoning to test if a practice is exploitative.",
        applyAr: "ابدأ من هنا عشان تختار: صحة الحديث لحديث مقتبس، أو مقاصد الشريعة عشان تختبر هل ممارسة استغلالية.",
      },
    ],
    chatbotContext:
      "You are the assistant on the Religious Verification Tools landing page. It showcases and links the active tools: the Hadith Authenticity Checker (/religion-hub/tools/hadith-check — narrator-chain analysis, classification Sahih/Hasan/Da'if/Mawdu') and the Maqasid Reasoning Tool (/religion-hub/maqasid). This page only navigates; it does not grade hadith or issue rulings. Per the Islamic Authenticity Protocol, never assign a hadith grade, fabricate a chain, or issue a fatwa yourself — route the user to the tool and say Unverified / غير موثّق when authenticity is not established.",
  },
  "/religion-hub/tools/zakat-calculator": {
    title: "Zakat Calculator",
    titleAr: "حاسبة الزكاة",
    scenarios: [
      {
        paste: "Cash: 200000 EGP; Gold: 50 grams at 21K; today's 24K gram price: 3600 EGP",
        pasteAr: "نقد: 200000 جنيه؛ ذهب: 50 جرام عيار 21؛ سعر جرام الذهب 24 النهارده: 3600 جنيه",
        note: "Enter today's gram price yourself (no auto-fetch) so nisab and the 2.5% are computed on real, current values.",
        noteAr: "اكتب سعر الجرام النهارده بنفسك (مفيش جلب تلقائي) عشان النصاب والـ2.5% يتحسبوا على قيم حقيقية حالية.",
      },
    ],
    useCases: [
      {
        help: "Computes zakat (2.5%) on cash, gold, silver, and business assets using AAOIFI nisab — but only once you enter today's metal prices.",
        helpAr: "بتحسب الزكاة (2.5%) على النقد والذهب والفضة وأصول التجارة بنصاب AAOIFI — بس بعد ما تدخل أسعار المعادن النهارده.",
        apply: "At your zakat anniversary, enter today's gold/silver gram price and your holdings to get an honest, current zakat figure.",
        applyAr: "في حول زكاتك، اكتب سعر جرام الذهب/الفضة النهارده وممتلكاتك عشان تطلع رقم زكاة صادق وحالي.",
      },
    ],
    chatbotContext:
      "You are the assistant on the Zakat Calculator page. It computes zakat at 2.5% on cash, gold (24/21/18K converted to 24K), silver, and business assets (inventory + cash - debts), using AAOIFI nisab thresholds (85g gold; cash nisab = 595g x the silver price, the conservative silver standard). Crucially it does NOT auto-fetch prices: the user must enter today's gold/silver gram price in EGP, and zakat is disabled until a price is entered — no stale hardcoded constants. Never invent a current metal price or nisab value; if prices are missing, say computation is disabled and the value is Unverified / غير موثّق, and note jurisprudence can differ by madhhab.",
  },
  "/sovo": {
    title: "SOVO Nexus — Multi-Engine Analysis",
    titleAr: "SOVO نِكسوس — تحليل متعدّد المحرّكات",
    scenarios: [
      {
        paste: "Garlic boiled with lemon cures high blood pressure within a week.",
        pasteAr: "الثوم المغلي بالليمون بيعالج الضغط العالي في أسبوع.",
        note: "Runs the claim through the SOVO orchestrator and returns one synthesized verdict with an Arabic explanation.",
        noteAr: "بيمرّر الادعاء على منسّق SOVO ويرجّع حُكم واحد مُجمَّع مع شرح بالعربي.",
      },
    ],
    useCases: [
      {
        help: "Sends one claim to /api/sovo/analyze, which orchestrates the specialist engines and returns a single synthesized verdict.",
        helpAr: "بيبعت ادعاء واحد لـ /api/sovo/analyze، اللي بينسّق المحرّكات المتخصّصة ويرجّع حُكم واحد مُجمَّع.",
        apply: "For a claim you can't classify yourself, run it through SOVO and read the verdict + Arabic explanation before sharing it.",
        applyAr: "لو ادعاء مش قادر تصنّفه بنفسك، مرّره على SOVO واقرأ الحُكم والشرح بالعربي قبل ما تشاركه.",
      },
    ],
    chatbotContext:
      "You are the assistant on the SOVO Nexus page. The user pastes a claim; the page POSTs it to /api/sovo/analyze, which orchestrates specialist engines (sentiment/AraBERT framing, FLICC fallacy, bias scanner, multi-source verifier, OSINT, digital forensics) and returns ONE synthesized verdict with an Arabic explanation. Important: the route does NOT return per-engine confidence scores, so the page deliberately shows none rather than fabricating numbers. Do the same — never invent a confidence percentage, source, or grade; report only what the API returned and say Unverified / غير موثّق otherwise.",
  },
  "/trailer": {
    title: "Trailer Prompt Center",
    titleAr: "مركز التريلر السينمائي",
    scenarios: [
      {
        paste: "Show me the positive and negative prompts for the first trailer scene.",
        pasteAr: "وريني البرومبتات الإيجابية والسلبية لأول مشهد في التريلر.",
        note: "This is a prompt-library page — ask the assistant to walk you through a scene's visual, sound, and prompt blocks.",
        noteAr: "دي صفحة مكتبة برومبتات — اسأل المساعد يشرح لك كتل المشهد (الصورة، الصوت، البرومبت).",
      },
    ],
    useCases: [
      {
        help: "A reference library of five cinematic trailer scenes with visual language, sound design, positive prompts, and a negative-prompt bank.",
        helpAr: "مكتبة مرجعية لخمس مشاهد تريلر سينمائية مع اللغة البصرية وتصميم الصوت والبرومبتات الإيجابية وبنك البرومبت السلبي.",
        apply: "Copy a scene's prompts into your video-generation tool to produce on-brand trailer footage consistently.",
        applyAr: "انسخ برومبتات أي مشهد في أداة توليد الفيديو عشان تطلّع لقطات تريلر متّسقة مع هوية المشروع.",
      },
    ],
    chatbotContext:
      "You are the assistant on the Trailer Prompt Center page. It is a static prompt library (data from src/data/trailer/trailer-scenes) presenting five trailer scenes — each with setting, dialogue, cinematography, sound design, positive prompts — plus a shared master negative-prompt bank, in English and Arabic. It is production/creative reference content, not an analysis tool or API. Help the user read and adapt the prompts; do not invent scenes, prompts, or claims beyond what the data contains, and label anything outside it Unverified / غير موثّق.",
  },
};
