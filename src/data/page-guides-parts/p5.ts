import type { PageGuide } from "@/data/page-guides";

export const P5: Record<string, PageGuide> = {
  "/corrections": {
    title: "Corrections Log",
    titleAr: "سجل التصحيحات",
    scenarios: [
      {
        paste: "Which stat did you correct on the Media Literacy module, and what is the new source?",
        pasteAr: "أنهي إحصائية عدّلتوها في وحدة الثقافة الإعلامية، وإيه المصدر الجديد؟",
        note: "Ask the assistant to look up a specific public correction entry (ID, old vs new text, source).",
        noteAr: "اسأل المساعد يدوّر على تصحيح معيّن (الرقم، النص القديم والجديد، المصدر).",
      },
    ],
    useCases: [
      {
        help: "A public, versioned log of every factual, statistical, citation, language, or methodology correction the platform made — with the old text, corrected text, reason, source, and reviewer.",
        helpAr: "سجل عام ومُرقّم لكل تصحيح وقائعي أو إحصائي أو مرجعي أو لغوي أو منهجي عملته المنصة — بالنص القديم والمصحَّح والسبب والمصدر والمراجِع.",
        apply: "When you cite a number from this site, check here first to confirm it wasn't superseded by a later correction.",
        applyAr: "لما تقتبس رقم من الموقع، اتأكد هنا الأول إنه مش اتعدّل في تصحيح أحدث.",
      },
    ],
    chatbotContext: "You are the assistant on the Corrections Log page (/corrections). It is a transparency ledger listing past corrections, each with an ID, date, affected page, type (factual/statistical/citation/language/methodology), severity, original vs corrected text, reason, source citation, reviewer, and version bump. You answer only from the entries shown on the page; never invent a correction, source, or reviewer. If a correction or its source is not present, say it is Unverified / غير موثّق.",
  },
  "/assessment": {
    title: "Validated Assessments",
    titleAr: "المقاييس المُحكَّمة",
    scenarios: [
      {
        paste: "What does the MIST-20 actually measure, and is my score reliable?",
        pasteAr: "الـ MIST-20 بيقيس إيه بالظبط، ودرجتي موثوقة؟",
        note: "Ask the assistant to explain a specific instrument (here the 20-headline misinformation test).",
        noteAr: "اسأل المساعد يشرح مقياس معيّن (هنا اختبار الـ 20 عنوان للتضليل).",
      },
    ],
    useCases: [
      {
        help: "Runs peer-reviewed psychometric instruments (MIST-20, MHLS, Brief RCOPE, SUS, GHSQ, MC-SDS) with real citations and reliability (alpha), then scores you and lets you compare pre vs post.",
        helpAr: "بيشغّل مقاييس نفسية محكَّمة (MIST-20، MHLS، Brief RCOPE، SUS، GHSQ، MC-SDS) بمراجع حقيقية ومعامل ثبات (ألفا)، وبيحسب درجتك ويقارن قبل وبعد.",
        apply: "Take a baseline before starting the curriculum, then retake after to see if your misinformation discernment improved.",
        applyAr: "خُد قياس مبدئي قبل ما تبدأ المنهج، وأعد الاختبار بعدها عشان تشوف هل قدرتك على تمييز التضليل اتحسّنت.",
      },
    ],
    chatbotContext: "You are the assistant on the Validated Assessments page (/assessment). It offers selectable peer-reviewed instruments rendered by AssessmentEngine: MIST-20 (Maertens et al. 2024), MHLS (O'Connor & Casey 2015), Brief RCOPE, SUS, GHSQ, MC-SDS — each with item count, time, Cronbach alpha, and pre/post phases; results are scored locally and saved to progress. Explain what an instrument measures and how to read scores, but cite only the references the page shows; never fabricate a citation, alpha value, or norm. If a figure isn't given, say Unverified / غير موثّق.",
  },
  "/curriculum/phase1": {
    title: "Curriculum — Phase 1 (Mental Health Literacy)",
    titleAr: "المنهج — المرحلة 1 (الوعي بالصحة النفسية)",
    scenarios: [
      {
        paste: "Start the Grief vs. Depression day — how do I tell the two apart?",
        pasteAr: "ابدأ يوم الحزن مقابل الاكتئاب — أفرّق بينهم إزاي؟",
        note: "Pick a specific day card and work its scenario-response exercises.",
        noteAr: "اختار كارت يوم معيّن واشتغل على تمارين الاستجابة للسيناريو.",
      },
    ],
    useCases: [
      {
        help: "A day-by-day mental-health literacy track (depression/anxiety myths, stigma scenarios, grief vs depression) delivered as scenario-response exercises with sources and safety notes.",
        helpAr: "مسار يومي للوعي بالصحة النفسية (خرافات الاكتئاب والقلق، سيناريوهات الوصمة، الحزن مقابل الاكتئاب) على شكل تمارين استجابة لسيناريو بمصادر وملاحظات أمان.",
        apply: "When a relative dismisses depression as 'just sadness,' use the grief-vs-depression differentiators you trained on to respond with care.",
        applyAr: "لما قريب يقلّل من الاكتئاب ويقول «ده مجرد زعل»، استخدم فروق الحزن والاكتئاب اللي اتدرّبت عليها وردّ بحنية.",
      },
    ],
    chatbotContext: "You are the assistant on Curriculum Phase 1 (/curriculum/phase1), the Mental Health Literacy phase. It loads JSON day-cards (e.g. depression_myths_day1, anxiety_myths_day2, stigma_scenarios_day3, grief_vs_depression_day4) and plays them through ScenarioResponsePlayer; each item carries claim/myth, options, explanation, references, and a safetyNote. This is education, not diagnosis or treatment. Use only the references in the loaded card; never invent a study, statistic, or clinical claim, and for anything unsourced say Unverified / غير موثّق. For crisis or self-harm content, advise contacting a professional.",
  },
  "/deepreal-forensics": {
    title: "Media Forensics Suite",
    titleAr: "منظومة الطب الشرعي للوسائط",
    scenarios: [
      {
        paste: "A viral photo of a Cairo flood has no camera data and software shows 'Midjourney' — is it fake?",
        pasteAr: "صورة منتشرة لفيضان في القاهرة مفيهاش بيانات كاميرا والسوفتوير مكتوب 'Midjourney' — هل دي مزيّفة؟",
        note: "Upload the image on the page; here you ask the assistant how to read the EXIF + deepfake signals.",
        noteAr: "ارفع الصورة في الصفحة؛ وهنا تسأل المساعد يقرألك إشارات الـ EXIF والديب فيك.",
      },
    ],
    useCases: [
      {
        help: "Extracts an image's real EXIF metadata (camera, editing software, GPS, timestamp) and runs a deepfake/AI-generation signal, then explains it honestly without inventing a verdict.",
        helpAr: "بيستخرج بيانات EXIF الحقيقية للصورة (الكاميرا، برنامج التعديل، GPS، التوقيت) ويشغّل إشارة ديب فيك/توليد بالذكاء الاصطناعي، ويشرحها بأمانة من غير ما يفبرك حُكم.",
        apply: "Before resharing a shocking image, upload it here; if metadata shows an AI tool or the timestamp contradicts the story, hold off.",
        applyAr: "قبل ما تعيد نشر صورة صادمة، ارفعها هنا؛ لو البيانات بتقول أداة ذكاء اصطناعي أو التوقيت بيناقض القصة، استنّى.",
      },
    ],
    chatbotContext: "You are the assistant on the Media Forensics Suite page (/deepreal-forensics). The user uploads an image; the page POSTs it to /api/defense/deepreal/analyze, which returns real EXIF metadata, metadata signals, an optional Sightengine deepfake detection score, and an honest AI verdict (AUTHENTIC / SUSPICIOUS / LIKELY_FAKE / INCONCLUSIVE) with explanation. Stress that absence of metadata is a lead, not proof of fakery, and the deepfake signal is weak. Never fabricate a verdict, score, or EXIF field; if a signal is missing, say Unverified / غير موثّق.",
  },
  "/drug-checker": {
    title: "Medical Drug Checker",
    titleAr: "فاحص الأدوية الطبي",
    scenarios: [
      {
        paste: "ibuprofen",
        pasteAr: "ibuprofen",
        note: "Search a drug to pull official FDA adverse events, DailyMed labels, and RxNorm clinical data side by side.",
        noteAr: "ابحث عن دواء عشان تجيب الأحداث السلبية من FDA وملصقات DailyMed وبيانات RxNorm جنب بعض.",
      },
    ],
    useCases: [
      {
        help: "Cross-references a medication across three official sources (openFDA adverse events, DailyMed labels, RxNorm) so you see regulator-grade data, not blog claims.",
        helpAr: "بيتحقق من الدواء عبر 3 مصادر رسمية (الأحداث السلبية في openFDA، ملصقات DailyMed، RxNorm) عشان تشوف بيانات رسمية مش كلام مدوّنات.",
        apply: "When you hear a scary drug claim, search the drug name and read the actual label and reported reactions before believing or forwarding it.",
        applyAr: "لما تسمع ادعاء مخيف عن دواء، ابحث باسمه واقرأ الملصق الرسمي والأعراض المُبلَّغ عنها قبل ما تصدّق أو تبعت.",
      },
    ],
    chatbotContext: "You are the assistant on the Medical Drug Checker page (/drug-checker). The user types a medication name; the page fetches /api/medical/openfda, /api/medical/dailymed, and /api/medical/rxnorm in parallel and shows the results from each. You help phrase the search and read official labels and adverse-event data. This is informational, not medical advice — defer dosing and treatment decisions to a clinician. Never invent a side effect, interaction, or label fact; if a source returns nothing, say Unverified / غير موثّق.",
  },
  "/features": {
    title: "Features Directory",
    titleAr: "دليل المزايا",
    scenarios: [
      {
        paste: "I want to fact-check a viral claim — which feature should I open?",
        pasteAr: "عايز أتحقق من ادعاء منتشر — أفتح أنهي ميزة؟",
        note: "Ask the assistant to route you to the right tool from the full catalog.",
        noteAr: "اسأل المساعد يوجّهك للأداة الصح من الكتالوج الكامل.",
      },
    ],
    useCases: [
      {
        help: "A categorized map of every tool on the platform (Defense Arsenal, science, religion, cognition, etc.) with a one-line description and link for each.",
        helpAr: "خريطة مصنّفة لكل أدوات المنصة (ترسانة الدفاع، العلوم، الدين، الإدراك...) بوصف سطر واحد ورابط لكل أداة.",
        apply: "New here and unsure where to start? Browse the categories to find the exact tool for your problem instead of guessing routes.",
        applyAr: "جديد ومش عارف تبدأ منين؟ تصفّح التصنيفات وتلاقي الأداة المظبوطة لمشكلتك بدل ما تخمّن الروابط.",
      },
    ],
    chatbotContext: "You are the assistant on the Features Directory page (/features). It is a navigation catalog grouping every tool into categories (e.g. Defense Arsenal) with each feature's title, short description, and href. Your job is to point users to the right route for their goal. Describe only features actually listed on the page; do not promise capabilities a tool doesn't have, and never fabricate a feature, stat, or source.",
  },
  "/impact": {
    title: "Impact Dashboard",
    titleAr: "لوحة الأثر",
    scenarios: [
      {
        paste: "Where do the numbers on this impact page come from?",
        pasteAr: "الأرقام اللي في صفحة الأثر دي جاية منين؟",
        note: "Ask the assistant to explain which metrics are live/operational vs illustrative.",
        noteAr: "اسأل المساعد يوضّح أنهي مقاييس حيّة/تشغيلية وأنهي توضيحية.",
      },
    ],
    useCases: [
      {
        help: "An animated metrics dashboard summarizing the platform's operational footprint (tools, databases queried, coverage) at a glance.",
        helpAr: "لوحة مقاييس متحركة بتلخّص البصمة التشغيلية للمنصة (الأدوات، قواعد البيانات المُستعلَمة، التغطية) بنظرة واحدة.",
        apply: "Use it to brief someone quickly on what the platform does and its scale before they dive into a specific tool.",
        applyAr: "استخدمها عشان تشرح بسرعة لحد بيعمل إيه المنصة وحجمها قبل ما يدخل على أداة معيّنة.",
      },
    ],
    chatbotContext: "You are the assistant on the Impact Dashboard page (/impact). It renders animated counters of operational metrics (e.g. tools, queried databases, coverage figures) defined in the page's metric data. Be honest that these are platform/operational figures, not independently audited outcome claims. Never present a counter as a peer-reviewed statistic, and never invent a number not shown on the page; if a value's basis is unclear, say Unverified / غير موثّق.",
  },
  "/master-roadmap": {
    title: "The Global Roadmap",
    titleAr: "خارطة الطريق الشاملة",
    scenarios: [
      {
        paste: "Which node should I deploy first, and what does it depend on?",
        pasteAr: "أنهي عقدة أنفّذها الأول، وبتعتمد على إيه؟",
        note: "Ask the assistant to walk the ordered node sequence and its categories.",
        noteAr: "اسأل المساعد يمشّيك على تسلسل العقد المرتّب وتصنيفاتها.",
      },
    ],
    useCases: [
      {
        help: "A structured, step-by-step roadmap of 136 forensic nodes grouped by category, each with copyable detail, taking you from core deployment to full orchestration.",
        helpAr: "خارطة طريق منهجية ومرتّبة من 136 عقدة تحليلية مجمّعة بالتصنيف، كل عقدة بتفاصيل قابلة للنسخ، بتنقلك من التأسيس للقيادة الشاملة.",
        apply: "Use it as a build/learning checklist — expand a category, copy a node's spec, and track what to tackle next.",
        applyAr: "استخدمها كقائمة بناء/تعلّم — افتح تصنيف، انسخ مواصفات العقدة، وتابع اللي بعده.",
      },
    ],
    chatbotContext: "You are the assistant on The Global Roadmap page (/master-roadmap). It renders ROADMAP_DATA: a sequence of 136 forensic nodes organized into collapsible categories, each node copyable to clipboard. Help the user navigate categories, understand a node's place in the sequence, and decide order. Describe only nodes present in the page data; never fabricate a node, dependency, or metric, and flag anything unsupported as Unverified / غير موثّق.",
  },
  "/onboarding": {
    title: "Onboarding Tour",
    titleAr: "جولة التعريف",
    scenarios: [
      {
        paste: "I just arrived — what is this platform and what should I do first?",
        pasteAr: "لسه داخل — إيه المنصة دي وإيه أول حاجة أعملها؟",
        note: "Ask the assistant to summarize the tour steps and point to a first action.",
        noteAr: "اسأل المساعد يلخّص خطوات الجولة ويوجّهك لأول خطوة.",
      },
    ],
    useCases: [
      {
        help: "A short multi-step intro that frames the misinformation crisis and walks you through the platform's engines and how to begin.",
        helpAr: "مقدمة قصيرة متعددة الخطوات بتأطّر أزمة التضليل وبتمشّيك على محركات المنصة وإزاي تبدأ.",
        apply: "Run it once on your first visit so the rest of the site makes sense, then jump to the assessment or curriculum.",
        applyAr: "شغّلها مرة في أول زيارة عشان باقي الموقع يبقى واضح، وبعدها انتقل للتقييم أو المنهج.",
      },
    ],
    chatbotContext: "You are the assistant on the Onboarding Tour page (/onboarding). It is a stepped intro (crisis framing, the engines overview, getting started) using strings from site-strings, ending by pointing users toward the assessment and curriculum. Help orient newcomers and suggest a sensible first step. Describe only what the tour and platform actually offer; never fabricate a feature, statistic, or source, and say Unverified / غير موثّق when unsure.",
  },
  "/platform-guide": {
    title: "Platform Guide",
    titleAr: "دليل المنصة",
    scenarios: [
      {
        paste: "How do I get started in the first 5 minutes?",
        pasteAr: "أبدأ إزاي في أول 5 دقايق؟",
        note: "Ask the assistant to walk the 'Getting Started' section steps and their links.",
        noteAr: "اسأل المساعد يمشّيك على خطوات قسم «البداية الصحيحة» وروابطه.",
      },
    ],
    useCases: [
      {
        help: "A searchable, tagged how-to guide that breaks the platform into sections (Getting Started, etc.) with concrete steps, time estimates, links, and pro tips.",
        helpAr: "دليل استخدام قابل للبحث ومُوسَّم بيقسّم المنصة لأقسام (البداية الصحيحة...) بخطوات محددة وتقديرات وقت وروابط ونصايح.",
        apply: "Stuck on what a tool does or how to chain features? Search the guide for the task and follow the numbered steps.",
        applyAr: "محتار في وظيفة أداة أو إزاي تربط مزايا؟ ابحث في الدليل عن المهمة واتبع الخطوات المرقّمة.",
      },
    ],
    chatbotContext: "You are the assistant on the Platform Guide page (/platform-guide). It is a sectioned, tag-searchable usage manual; each section has an emoji, title, time estimate, ordered steps (some with links like /assessment or /curriculum/phase0), a pro tip, and tags. Help users find the right section and follow its steps. Reference only sections and links present in the guide; never invent a step, route, or claim, and mark anything unverified as Unverified / غير موثّق.",
  },
  "/religion-hub/maqasid": {
    title: "Maqasid al-Shariah Reasoning",
    titleAr: "استدلال مقاصد الشريعة",
    scenarios: [
      {
        paste: "Does a fatwa banning a life-saving vaccine serve Hifz al-Nafs (preservation of life)?",
        pasteAr: "هل فتوى بتمنع لقاح منقذ للحياة بتخدم مقصد حفظ النفس؟",
        note: "Pick the relevant maqsad (here Hifz al-Nafs), paste the claim, and read the reasoned verdict + caveats.",
        noteAr: "اختار المقصد المناسب (هنا حفظ النفس)، الصق الادعاء، واقرأ الحُكم المُستدَل وملاحظاته.",
      },
    ],
    useCases: [
      {
        help: "Tests a ruling or claim against the five higher objectives of Shariah (religion, life, intellect, lineage, property) and returns reasoning with caveats — grounded in classical usul (Al-Shatibi, Al-Ghazali).",
        helpAr: "بيختبر حكمًا أو ادعاءً مقابل مقاصد الشريعة الخمسة (الدين، النفس، العقل، النسل، المال) ويرجّع استدلالًا بملاحظات — مبني على الأصول الكلاسيكية (الشاطبي، الغزالي).",
        apply: "When a ruling 'feels off,' check whether it actually protects or harms one of the five objectives before accepting it.",
        applyAr: "لما حكم يبان «مش مظبوط»، اتأكد هل بيحمي ولا بيضر واحد من المقاصد الخمسة قبل ما تقبله.",
      },
    ],
    chatbotContext: "You are the assistant on the Maqasid al-Shariah Reasoning page (/religion-hub/maqasid). The user selects one of the five maqasid (Hifz al-Din, al-Nafs, al-'Aql, al-Nasl, al-Mal) and submits a claim; the page POSTs to /api/islamic/maqasid and shows a verdict, bilingual reasoning, and caveats, framed by Al-Shatibi's Al-Muwafaqat and Al-Ghazali's Al-Mustasfa. This is structured reasoning, not a binding fatwa — direct rulings to a qualified scholar. Never fabricate a Quran/hadith citation, a hadith grade, or a fatwa; if a source isn't established, say Unverified / غير موثّق.",
  },
  "/religion-hub/tools/quran-context": {
    title: "Quran Context & Tafsir",
    titleAr: "سياق القرآن والتفسير",
    scenarios: [
      {
        paste: "2:255",
        pasteAr: "2:255",
        note: "Enter a Surah:Ayah reference to pull the Arabic text, English translation, Tafsir al-Jalalayn, and any abrogation note.",
        noteAr: "اكتب مرجع سورة:آية عشان تجيب النص العربي والترجمة وتفسير الجلالين وأي ملاحظة نسخ.",
      },
    ],
    useCases: [
      {
        help: "Looks up any ayah by reference and returns its verified text, translation, classical tafsir, and a nasikh-mansukh (abrogation) check — so a verse isn't quoted out of context.",
        helpAr: "بيدوّر على أي آية بالمرجع ويرجّع نصها الموثّق وترجمتها والتفسير الكلاسيكي وفحص الناسخ والمنسوخ — عشان الآية متتقالش خارج سياقها.",
        apply: "Before someone weaponizes a half-verse, look it up here to read the full ayah, its tafsir, and whether it was abrogated.",
        applyAr: "قبل ما حد يستخدم نص آية كسلاح، دوّر عليها هنا واقرأ الآية كاملة وتفسيرها وهل اتنسخت.",
      },
    ],
    chatbotContext: "You are the assistant on the Quran Context & Tafsir page (/religion-hub/tools/quran-context). The user enters a Surah:Ayah reference (e.g. 2:255); the page calls /api/islamic/quran (ayah text + translation) and /api/islamic/tafsir (Al-Jalalayn) and runs a local nasikh-mansukh abrogation check. Help interpret the verse in context. Quote only the text, translation, tafsir, and abrogation status the tool returns; never fabricate an ayah, a tafsir attribution, or an abrogation claim, and say Unverified / غير موثّق when a source is absent.",
  },
  "/six-layers": {
    title: "The 6 Layers of Deception",
    titleAr: "طبقات الخداع الست",
    scenarios: [
      {
        paste: "Walk me through the 6 layers of deception — what does each one mean?",
        pasteAr: "اشرحلي طبقات الخداع الست — كل واحدة معناها إيه؟",
        note: "Ask the assistant to explain each layer and the matching defense as you scroll the experience.",
        noteAr: "اسأل المساعد يشرح كل طبقة والدفاع المقابل ليها وأنت بتتصفّح التجربة.",
      },
    ],
    useCases: [
      {
        help: "An immersive 3D scrollytelling explainer of the platform's 6-layer deception model and the defense for each layer.",
        helpAr: "شرح تفاعلي ثلاثي الأبعاد بأسلوب القصة المتمرّرة لنموذج طبقات الخداع الست والدفاع المقابل لكل طبقة.",
        apply: "Use it as a mental checklist: when you spot a manipulative message, ask which layer it's exploiting and apply that layer's defense.",
        applyAr: "استخدمها كقائمة ذهنية: لما تشوف رسالة مخادعة، اسأل نفسك بتستغل أنهي طبقة وطبّق دفاع الطبقة دي.",
      },
    ],
    chatbotContext: "You are the assistant on The 6 Layers of Deception page (/six-layers). It is a 3D scroll-driven experience (Scene + LayerSection + DefenseSection) presenting the LAYERS data: each deception layer with its description and a matching defense. Help users understand each layer and how to counter it. Explain only the layers and defenses defined on the page; never invent a layer, statistic, or source, and say Unverified / غير موثّق for anything unsupported.",
  },
  "/threat-map": {
    title: "Patient Zero Threat Map",
    titleAr: "خريطة المصدر الأول للتهديد",
    scenarios: [
      {
        paste: "How does a single misinformation 'patient zero' spread across a network?",
        pasteAr: "إزاي «مصدر أول» واحد للتضليل بينتشر عبر الشبكة؟",
        note: "Ask the assistant to read the network graph and explain how nodes connect.",
        noteAr: "اسأل المساعد يقرأ رسم الشبكة ويشرح إزاي العُقد بتترابط.",
      },
    ],
    useCases: [
      {
        help: "A network-graph visualization that maps how misinformation propagates from an origin node ('patient zero') through connected accounts and sources.",
        helpAr: "تصوّر برسم شبكي بيرسم إزاي التضليل بينتشر من عقدة المصدر («المريض صفر») عبر الحسابات والمصادر المترابطة.",
        apply: "Use it to grasp why debunking the source matters more than chasing every reshare downstream.",
        applyAr: "استخدمها عشان تفهم ليه تفنيد المصدر أهم من ملاحقة كل إعادة نشر بعديه.",
      },
    ],
    chatbotContext: "You are the assistant on the Patient Zero Threat Map page (/threat-map). It renders the ThreatMap network-graph component visualizing misinformation spread from an origin node across linked nodes. Help users read the graph and understand propagation dynamics. Describe only what the graph component shows; treat it as an illustrative network model, not audited surveillance data, and never fabricate a node, edge, or statistic — say Unverified / غير موثّق when unclear.",
  },
  "/why-us": {
    title: "Why Our Platform",
    titleAr: "لماذا منصتنا",
    scenarios: [
      {
        paste: "What makes this platform different from a regular fact-checking site?",
        pasteAr: "إيه اللي بيخلّي المنصة دي مختلفة عن أي موقع تحقق عادي؟",
        note: "Ask the assistant to summarize the differentiators and the sources behind the headline stats.",
        noteAr: "اسأل المساعد يلخّص نقاط التميّز والمصادر ورا الإحصائيات الرئيسية.",
      },
    ],
    useCases: [
      {
        help: "Lays out the problem (Egyptian misinformation exposure) with cited stats and explains the platform's differentiators and approach.",
        helpAr: "بيعرض المشكلة (تعرّض المصريين للتضليل) بإحصائيات موثّقة ويشرح نقاط تميّز المنصة ومنهجها.",
        apply: "Use it when explaining to a friend or judge why a sourced, multi-engine approach beats ad-hoc fact-checking.",
        applyAr: "استخدمها لما تشرح لصاحب أو مُحكّم ليه المنهج الموثّق متعدد المحركات أحسن من التحقق العشوائي.",
      },
    ],
    chatbotContext: "You are the assistant on the Why Our Platform page (/why-us). It is a marketing/positioning page presenting the misinformation problem with cited stats (e.g. WHO Egypt) and the platform's differentiators via animated counters. Help users understand the value proposition. Cite a statistic only with the source the page attributes to it (e.g. 'WHO Egypt 2022'); never invent a statistic or source, and mark unattributed figures as Unverified / غير موثّق.",
  },
};
