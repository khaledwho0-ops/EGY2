import type { PageGuide } from "@/data/page-guides";

export const P6: Record<string, PageGuide> = {
  "/methodology": {
    title: "Platform Methodology",
    titleAr: "منهجية المنصة",
    scenarios: [
      {
        paste: "What scientific theories is this whole platform built on?",
        pasteAr: "المنصة دي كلها مبنية على أنهي نظريات علمية؟",
        note: "This is an info page — ask the assistant to summarise its three pillars.",
        noteAr: "دي صفحة شرح — اسأل المساعد يلخّص الأعمدة التلاتة بتاعتها.",
      },
    ],
    useCases: [
      {
        help: "Explains the science behind the platform: inoculation theory, the continued-influence effect, and the source pyramid — so you trust the method, not just the verdicts.",
        helpAr: "بتشرح العلم ورا المنصة: نظرية التلقيح، أثر التأثير المستمر، وهرم المصادر — عشان تثق في المنهج مش بس في الأحكام.",
        apply: "Before relying on any tool here, read this page to understand why pre-bunking beats debunking and how sources are ranked.",
        applyAr: "قبل ما تعتمد على أي أداة هنا، اقرأ الصفحة دي عشان تفهم ليه الوقاية أقوى من التفنيد وإزاي المصادر بتترتّب.",
      },
    ],
    chatbotContext:
      "You are the assistant on the Methodology page (/methodology). It is a static explainer of the platform's scientific foundation: the three pillars of cognition-first defense (Inoculation Theory / pre-bunking, the Continued Influence Effect, and the Source Pyramid), rendered with a SourcePyramid component. It has no input field. Explain these concepts and how the platform applies them. Never invent a citation, statistic, or study name; if a claim is unsourced say 'غير موثّق / Unverified'.",
  },
  "/bad-news": {
    title: "Bad News Game",
    titleAr: "لعبة الأخبار السيئة",
    scenarios: [
      {
        paste: "How does playing a misinformation game make me better at spotting it?",
        pasteAr: "إزاي لعبة بنشر تضليل بتخليني أحسن في كشفه؟",
        note: "This page is an interactive game, not a text tool — ask how inoculation works.",
        noteAr: "الصفحة دي لعبة تفاعلية مش أداة نص — اسأل التلقيح بيشتغل إزاي.",
      },
    ],
    useCases: [
      {
        help: "Puts you in the shoes of a misinformation spreader across Egyptian scenarios (fake artifact photo, WhatsApp panic voice note, deepfake video) so you learn the manipulation techniques from the inside.",
        helpAr: "بيحطّك في دور ناشر التضليل في مواقف مصرية (صورة أثر مزيّفة، فويس نوت رعب على واتساب، فيديو ديب فيك) عشان تتعلّم تقنيات التلاعب من جوه.",
        apply: "Play through the rounds once; afterward you will recognise fear-mongering and outrage-baiting when a real forward hits your phone.",
        applyAr: "العب الجولات مرة؛ بعدها هتعرف تكشف بثّ الخوف واستفزاز الغضب لما يوصلك فوروورد حقيقي على موبايلك.",
      },
    ],
    chatbotContext:
      "You are the assistant on the Bad News Game page (/bad-news). It is a client-side inoculation game (no API call): the player chooses between spreading misinformation or fact-checking across 3 Egyptian scenarios, watching followers/credibility scores shift to feel how manipulation goes viral. Explain the game and the inoculation principle behind it. Do not fabricate sources or stats; mark anything unsourced as 'غير موثّق / Unverified'.",
  },
  "/cognitive-lab": {
    title: "Cognitive Bias Lab",
    titleAr: "مختبر الانحياز المعرفي",
    scenarios: [
      {
        paste: "الدكتور الفلاني قال إن العسل بيشفي الكورونا، وهو خبير كبير يبقى أكيد صح.",
        pasteAr: "الدكتور الفلاني قال إن العسل بيشفي الكورونا، وهو خبير كبير يبقى أكيد صح.",
        note: "Paste a real WhatsApp-style claim to see which cognitive biases it exploits.",
        noteAr: "الصق ادعاء حقيقي بأسلوب واتساب عشان تشوف بيستغل أنهي انحيازات معرفية.",
      },
    ],
    useCases: [
      {
        help: "Detects which cognitive biases a claim exploits (authority bias, confirmation bias, etc.) and shows how that bias hijacks both scientific and religious reasoning.",
        helpAr: "بيكشف أنهي انحيازات معرفية بيستغلها الادعاء (انحياز السلطة، انحياز التأكيد، إلخ) ويوضّح إزاي الانحياز ده بيختطف التفكير العلمي والديني.",
        apply: "Before resharing a 'tip' that feels obviously true, paste it here — the gut feeling of certainty is often the bias firing.",
        applyAr: "قبل ما تعيد نشر 'نصيحة' حاسس إنها أكيد صح، الصقها هنا — الإحساس بالتأكد ده غالبًا هو الانحياز نفسه.",
      },
    ],
    chatbotContext:
      "You are the assistant on the Cognitive Bias Lab page (/cognitive-lab). It browses a library of cognitive biases (COGNITIVE_BIASES data) and has a 'Run Experiment' box that POSTs pasted text to /api/bias-detect, returning which biases fired with a confidence level and how to neutralise each. Help the user phrase a claim and read the detection results. Never invent a source, statistic, or confidence figure beyond what the tool returns; flag unsourced content as 'غير موثّق / Unverified'.",
  },
  "/curriculum/phase2": {
    title: "Curriculum Phase 2 — Science & Statistics",
    titleAr: "المنهج المرحلة 2 — العلوم والإحصاء",
    scenarios: [
      {
        paste: "Start an intermediate exercise on understanding p-values.",
        pasteAr: "ابدأ تمرين متوسط عن فهم قيمة p.",
        note: "Pick exercises by difficulty (beginner/intermediate/advanced) and work the statistical concept.",
        noteAr: "اختار التمارين حسب الصعوبة (مبتدئ/متوسط/متقدم) واشتغل على المفهوم الإحصائي.",
      },
    ],
    useCases: [
      {
        help: "A filterable set of science-literacy exercises that teach the statistical concepts (p-values, sample size, effect size, correlation vs causation) that pseudoscience abuses.",
        helpAr: "مجموعة تمارين محو الأمية العلمية قابلة للفلترة، بتعلّمك المفاهيم الإحصائية (قيمة p، حجم العينة، حجم الأثر، الارتباط مقابل السببية) اللي العلم الزائف بيستغلها.",
        apply: "Do an exercise that matches your level; next time a headline says 'a study proves…', you will know which statistical question to ask first.",
        applyAr: "اعمل تمرين على مستواك؛ المرة الجاية لما عنوان يقول 'دراسة تثبت…'، هتعرف أنهي سؤال إحصائي تسأله الأول.",
      },
    ],
    chatbotContext:
      "You are the assistant on the Curriculum Phase 2 page (/curriculum/phase2). It lists SCIENCE_EXERCISES filterable by difficulty (beginner/intermediate/advanced); each exercise has a statistical concept plus multiple-choice items with explanations, played in an inline SciencePlayer. Help the user pick an exercise and understand a statistical concept. Never fabricate a study, statistic, or source; if something is unsourced say 'غير موثّق / Unverified'.",
  },
  "/deepreal-upload": {
    title: "DeepReal — Media Forensics Upload",
    titleAr: "ديب-ريل — رفع وسائط للتحليل الجنائي",
    scenarios: [
      {
        paste: "I have a screenshot that looks edited — what does the analysis tell me?",
        pasteAr: "عندي سكرين شوت شكله متعدّل — التحليل بيقول لي إيه؟",
        note: "Drag a JPG/PNG/MP4/WAV/PDF onto the dropzone; the file is sent for forensic analysis.",
        noteAr: "اسحب ملف JPG/PNG/MP4/WAV/PDF على منطقة الرفع؛ الملف بيتبعت للتحليل الجنائي.",
      },
    ],
    useCases: [
      {
        help: "Uploads an image/media file and runs forensic analysis (Error Level Analysis) to flag manipulation, returning a verdict (Authentic / Suspicious / Manipulated) with a confidence score.",
        helpAr: "بترفع صورة/ملف وسائط وتشغّل تحليل جنائي (تحليل مستوى الخطأ) عشان يكشف التلاعب، وبيرجّع حُكم (أصلي / مشبوه / متلاعَب فيه) مع درجة ثقة.",
        apply: "Before believing a viral 'leaked photo', upload it here and read the manipulation verdict instead of trusting your eyes.",
        applyAr: "قبل ما تصدّق 'صورة مسرّبة' منتشرة، ارفعها هنا واقرأ حُكم التلاعب بدل ما تثق في عينك.",
      },
    ],
    chatbotContext:
      "You are the assistant on the DeepReal Upload page (/deepreal-upload). It is a drag-and-drop forensic uploader supporting JPG/PNG/MP4/WAV/PDF; it POSTs the file to /api/forensic/image and returns isManipulated plus a confidence score, mapped to Authentic / Suspicious / Manipulated. Explain what forensic analysis can and cannot prove (it indicates editing likelihood, not who/why). Never overstate certainty or invent a stat; mark unsupported claims 'غير موثّق / Unverified'.",
  },
  "/effect-dashboard": {
    title: "Live Effect Size Dashboard",
    titleAr: "لوحة حجم الأثر المباشرة",
    scenarios: [
      {
        paste: "What is Cohen's d and why are these numbers 'targets' not results?",
        pasteAr: "إيه هو معامل كوهين d وليه الأرقام دي 'أهداف' مش نتائج؟",
        note: "This dashboard shows literature-based design targets, not collected measurements.",
        noteAr: "اللوحة دي بتعرض أهداف تصميم مبنية على الأدبيات، مش قياسات مجمّعة.",
      },
    ],
    useCases: [
      {
        help: "Shows the research design behind the platform: a forest plot of the literature-based target effect sizes (MIST-20, MHLS, Brief RCOPE, etc.) the N=84 pre/post study is built to detect — honestly labelled as hypotheses, not findings.",
        helpAr: "بتعرض تصميم البحث ورا المنصة: مخطط غابة لأحجام الأثر المستهدفة المبنية على الأدبيات (MIST-20، MHLS، Brief RCOPE، إلخ) اللي دراسة الـ N=84 قبل/بعد مصمّمة تكتشفها — معلّمة بأمانة كفرضيات مش نتائج.",
        apply: "Read this to understand how a real before/after study is designed and why honest dashboards say 'no data yet' instead of faking results.",
        applyAr: "اقراها عشان تفهم إزاي بتتصمّم دراسة قبل/بعد حقيقية وليه اللوحات الأمينة بتقول 'مفيش بيانات لسه' بدل ما تزيّف نتائج.",
      },
    ],
    chatbotContext:
      "You are the assistant on the Effect Size Dashboard page (/effect-dashboard, admin-oriented). It renders a forest plot of literature-based DESIGN TARGETS (Cohen's d with CIs) for validated instruments (MIST-20, MHLS, Brief RCOPE, etc.) that the planned N=84 pre/post quasi-experiment aims to detect. These are HYPOTHESES, not collected measurements — real mode only activates with cohort data from /api/assessment. Never present a target as a measured finding and never fabricate a p-value or sample; if no data exists say 'غير موثّق / Unverified'.",
  },
  "/fight-back": {
    title: "Counter-Narrative Toolkit",
    titleAr: "عُدّة السرديات المضادة",
    scenarios: [
      {
        paste: "Show me how to respond to someone using an appeal to authority.",
        pasteAr: "ورّيني أرد إزاي على حد بيستخدم الاحتكام للسلطة.",
        note: "Search the library of fallacies, biases, and religious-manipulation patterns by name.",
        noteAr: "ابحث في مكتبة المغالطات والانحيازات وأنماط التلاعب الديني بالاسم.",
      },
    ],
    useCases: [
      {
        help: "A searchable reference of logical fallacies, cognitive biases, and religious-manipulation tactics — each entry answers: what is it, why it works, how to spot it, how to defend — with Egyptian-context examples.",
        helpAr: "مرجع قابل للبحث للمغالطات المنطقية والانحيازات المعرفية وتكتيكات التلاعب الديني — كل إدخال بيجاوب: إيه هو، ليه بيشتغل، إزاي تكتشفه، إزاي تدافع — بأمثلة من السياق المصري.",
        apply: "When someone corners you in a debate, find the exact tactic here and use the ready 'how to defend' line.",
        applyAr: "لما حد يحاصرك في نقاش، لاقي التكتيك بالظبط هنا واستخدم جملة 'إزاي تدافع' الجاهزة.",
      },
    ],
    chatbotContext:
      "You are the assistant on the Counter-Narrative Toolkit page (/fight-back). It is a searchable, tab-filtered reference (FALLACIES, BIASES, RELIGIOUS_BIASES from fight-back-data) — no API call; each entry gives what/why/spot/defend with Egyptian examples in EN/AR/Egyptian-Arabic. Help the user find the right tactic and craft a non-fallacious rebuttal. Never invent an entry, source, or hadith grade not in the data; mark unsupported claims 'غير موثّق / Unverified'.",
  },
  "/inoculation-passport": {
    title: "Inoculation Passport",
    titleAr: "جواز التلقيح",
    scenarios: [
      {
        paste: "Which exercises do I need to finish to 'immunise' against deepfakes?",
        pasteAr: "أنهي تمارين لازم أخلّصها عشان 'أتطعّم' ضد الديب فيك؟",
        note: "The passport tracks your completed exercises and the decay of each immunity over time.",
        noteAr: "الجواز بيتابع التمارين اللي خلّصتها وتلاشي كل مناعة مع الوقت.",
      },
    ],
    useCases: [
      {
        help: "A 'vaccine card for your mind': tracks 12 manipulation techniques (fear-mongering, false authority, deepfakes, etc.), unlocking each as you complete the required exercises and showing immunity decay if you stop practising.",
        helpAr: "'كارت تطعيم لعقلك': بيتابع 12 تقنية تلاعب (بثّ الخوف، السلطة الزائفة، الديب فيك، إلخ)، وبيفتح كل واحدة لما تخلّص التمارين المطلوبة وبيعرض تلاشي المناعة لو بطّلت تمرين.",
        apply: "Check which techniques are still 'unprotected' and do those exercises; revisit when an immunity decays to keep your defenses fresh.",
        applyAr: "شوف أنهي تقنيات لسه 'غير محمية' واعمل تمارينها؛ ارجع لما مناعة تتلاشى عشان تحافظ على دفاعاتك.",
      },
    ],
    chatbotContext:
      "You are the assistant on the Inoculation Passport page (/inoculation-passport). It reads your local progress (getProgress + localStorage exercise keys) and shows 12 manipulation techniques as 'immunities', each unlocked by required exercises across tracks (deepreal/mental-health/religion-hub), with a weekly decay rate. Explain how to unlock and maintain each immunity. Never fabricate a stat or source about inoculation efficacy; flag unsourced claims as 'غير موثّق / Unverified'.",
  },
  "/media-library": {
    title: "Media Accuracy Library",
    titleAr: "مكتبة دقّة الأعمال الفنية",
    scenarios: [
      {
        paste: "Was 'The Mummy' accurate about ancient Egypt, or is it all Hollywood?",
        pasteAr: "فيلم 'المومياء' كان دقيق عن مصر القديمة ولا كله هوليوود؟",
        note: "Browse movies/shows/documentaries and read the claim-by-claim true/false breakdown.",
        noteAr: "تصفّح الأفلام والمسلسلات والوثائقيات واقرأ تفنيد الادعاءات صح/غلط واحد واحد.",
      },
    ],
    useCases: [
      {
        help: "Rates films, shows, and documentaries on historical/factual accuracy about Egypt and breaks down each on-screen claim as true or false with a short explanation.",
        helpAr: "بتقيّم الأفلام والمسلسلات والوثائقيات على دقّتها التاريخية/الواقعية عن مصر وبتفكّك كل ادعاء على الشاشة صح ولا غلط مع شرح قصير.",
        apply: "Before quoting a movie 'fact' about pharaohs or Egyptian gods, check it here so you don't repeat a Hollywood myth.",
        applyAr: "قبل ما تنقل 'معلومة' من فيلم عن الفراعنة أو الآلهة المصرية، اتأكد منها هنا عشان متكرّرش خرافة هوليوود.",
      },
    ],
    chatbotContext:
      "You are the assistant on the Media Accuracy Library page (/media-library). It is a curated, client-side catalogue (no API) of movies, shows, and documentaries rated high/mixed/low for accuracy about Egypt, each with a claim-by-claim true/false truthAnalysis. Help the user navigate entries and understand a verdict. Do not invent ratings, claims, or historical sources beyond the catalogue; mark anything unsupported as 'غير موثّق / Unverified'.",
  },
  "/open-source": {
    title: "Technical Architecture & Open Source Portal",
    titleAr: "بوابة البنية التقنية والمصدر المفتوح",
    scenarios: [
      {
        paste: "How does the Gemini key rotator actually work, and how does ELA detect fakes?",
        pasteAr: "خوارزمية تدوير مفاتيح Gemini بتشتغل إزاي، وإزاي ELA بيكشف التزييف؟",
        note: "An info portal — ask the assistant to explain any of the four technical tabs.",
        noteAr: "بوابة شرح — اسأل المساعد يشرح أي من التبويبات التقنية الأربعة.",
      },
    ],
    useCases: [
      {
        help: "Opens up the platform's verification internals across four tabs: system overview, the Gemini API rotator, the forensic ELA math, and parallel federated search routing.",
        helpAr: "بتفتح دواخل أنظمة التحقق في المنصة عبر أربعة تبويبات: نظرة عامة، مدوّر مفاتيح Gemini، رياضيات ELA الجنائية، وتوجيه البحث المتوازي الموزّع.",
        apply: "Use this for transparency: when you want to know HOW a verdict was produced, read the relevant engine here instead of taking it on faith.",
        applyAr: "استخدمها للشفافية: لما تحب تعرف إزاي اتعمل الحُكم، اقرأ المحرك المناسب هنا بدل ما تاخده على عماه.",
      },
    ],
    chatbotContext:
      "You are the assistant on the Open Source / Technical Architecture page (/open-source). It is a static, tabbed explainer (System Overview, Gemini Rotator API, Forensic ELA Math, Parallel Federated Routing) of how the platform's verification engines work; it has no input field. Explain these systems plainly. Never invent benchmarks, source citations, or accuracy figures not shown; if a figure is unsourced say 'غير موثّق / Unverified'.",
  },
  "/presentation": {
    title: "Presentation Decks",
    titleAr: "عروض المنصة التقديمية",
    scenarios: [
      {
        paste: "Which deck explains the scientific foundation, and what does it cover?",
        pasteAr: "أنهي عرض بيشرح الأساس العلمي، وبيغطّي إيه؟",
        note: "A download hub of decks (pitch, architecture, science, Islamic tools, impact).",
        noteAr: "مركز تنزيل عروض (المسابقة، البنية، العلم، الأدوات الإسلامية، الأثر).",
      },
    ],
    useCases: [
      {
        help: "A library of downloadable presentation decks covering the platform vision, technical architecture, scientific foundation, Islamic tools, and impact report.",
        helpAr: "مكتبة عروض تقديمية قابلة للتنزيل بتغطّي رؤية المنصة، البنية التقنية، الأساس العلمي، الأدوات الإسلامية، وتقرير الأثر.",
        apply: "Pick the deck that matches your audience (judges, engineers, scholars) and download the PDF/PPTX to present the platform.",
        applyAr: "اختار العرض اللي يناسب جمهورك (محكّمين، مهندسين، علماء) ونزّل الـ PDF/PPTX عشان تعرض المنصة.",
      },
    ],
    chatbotContext:
      "You are the assistant on the Presentation page (/presentation). It is a download hub listing five decks (Competition Pitch, Technical Architecture, Scientific Foundation, Islamic Tools, Impact Report) with topic lists, slide counts, and PDF/PPTX formats. Help the user choose the right deck. The deck descriptions name frameworks (SIFT, FLICC, WHO mhGAP, COM-B) — if asked to verify a specific stat or claim inside a deck and it is not sourced on-page, say 'غير موثّق / Unverified' rather than inventing one.",
  },
  "/religion-hub/quran": {
    title: "Quran Browser",
    titleAr: "متصفّح القرآن",
    scenarios: [
      {
        paste: "Open Surah Al-Baqarah and show me the verses.",
        pasteAr: "افتح سورة البقرة وورّيني الآيات.",
        note: "Browse all 114 surahs and read the Uthmani text of any chapter.",
        noteAr: "تصفّح الـ 114 سورة واقرأ النص العثماني لأي سورة.",
      },
    ],
    useCases: [
      {
        help: "Browses the full Quran (all 114 surahs with name, verse count, revelation place) and loads the authentic Uthmani text of any surah you pick.",
        helpAr: "بيتصفّح القرآن كامل (الـ 114 سورة بالاسم وعدد الآيات ومكان النزول) وبيحمّل النص العثماني الموثّق لأي سورة تختارها.",
        apply: "Use it to read a verse in its exact wording before quoting it, instead of relying on a half-remembered or paraphrased version.",
        applyAr: "استخدمه عشان تقرأ الآية بنصّها بالظبط قبل ما تنقلها، بدل ما تعتمد على نسخة محفوظة بالغلط أو مُعاد صياغتها.",
      },
    ],
    chatbotContext:
      "You are the assistant on the Quran Browser page (/religion-hub/quran). It fetches the surah list and Uthmani verse text live from the official quran.com API (api.quran.com/api/v4). It is a reading/reference tool, not a tafsir or fatwa engine. Help the user find and read surahs/verses. Never invent a verse, a tafsir, or a hadith grade; if asked for interpretation beyond the displayed Arabic text, point to qualified scholarship and mark unverified claims 'غير موثّق / Unverified'.",
  },
  "/religion-hub/tools/sectarian-detector": {
    title: "Sectarian Bias Detector",
    titleAr: "كاشف التحيز الطائفي",
    scenarios: [
      {
        paste: "كل اللي على المذهب التاني كفّار ومش مسلمين أصلاً ولازم نقاطعهم.",
        pasteAr: "كل اللي على المذهب التاني كفّار ومش مسلمين أصلاً ولازم نقاطعهم.",
        note: "Paste religious-discourse text to get a sectarian-incitement risk level.",
        noteAr: "الصق نص خطاب ديني عشان تطلع مستوى خطر التحريض الطائفي.",
      },
    ],
    useCases: [
      {
        help: "Analyses a piece of religious text for sectarian incitement and othering, returning a risk level (low/medium/high/critical) so divisive framing is flagged.",
        helpAr: "بيحلّل نص ديني بحثًا عن التحريض الطائفي والإقصاء، وبيرجّع مستوى خطر (منخفض/متوسط/مرتفع/حرج) عشان يفضح التأطير المُفرّق.",
        apply: "When a forwarded religious post feels like it's pitting groups against each other, paste it here before sharing to see how inflammatory it really is.",
        applyAr: "لما منشور ديني مُعاد توجيهه يبان إنه بيألّب الناس على بعض، الصقه هنا قبل ما تنشره عشان تشوف هو فعلاً تحريضي قد إيه.",
      },
    ],
    chatbotContext:
      "You are the assistant on the Sectarian Bias Detector page (/religion-hub/tools/sectarian-detector). It POSTs pasted text to /api/islamic/sectarian and returns an analysis with a risk level (low/medium/high/critical) flagging sectarian incitement and othering. It assesses tone/framing, not theological truth. Help the user interpret the level and de-escalate. Never fabricate a fatwa, hadith grade, or scholarly source; if a religious claim is unsupported say 'غير موثّق / Unverified'.",
  },
  "/sources": {
    title: "Sources & Trusted Registry",
    titleAr: "المصادر والسجل الموثوق",
    scenarios: [
      {
        paste: "What source does the platform use for the MIST-20 misinformation scale?",
        pasteAr: "المنصة بتستخدم أنهي مصدر لمقياس MIST-20 للتضليل؟",
        note: "Browse the full source map: which study powers which tool, by category.",
        noteAr: "تصفّح خريطة المصادر الكاملة: أنهي دراسة بتشغّل أنهي أداة، حسب التصنيف.",
      },
    ],
    useCases: [
      {
        help: "The platform's transparency registry: lists every trusted source (cognitive science, Islamic scholarship, Egyptian statistics, fact-checking, medical) and exactly which tool each one powers — plus an embedded evidence search and support directory.",
        helpAr: "سجل الشفافية للمنصة: بيسرد كل مصدر موثوق (علم الإدراك، العلوم الإسلامية، الإحصاءات المصرية، تدقيق الحقائق، الطب) وبالظبط أنهي أداة بيشغّلها كل واحد — بالإضافة لبحث أدلة مدمج ودليل دعم.",
        apply: "When you doubt where a verdict came from, look up the underlying source here to confirm the platform isn't inventing authority.",
        applyAr: "لما تشكّ في مصدر حُكم معيّن، دوّر على المصدر الأساسي هنا عشان تتأكد إن المنصة مش بتخترع مرجعية.",
      },
    ],
    chatbotContext:
      "You are the assistant on the Sources page (/sources). It renders the platform's trusted-source registry (TRUSTED_SOURCES + a FULL_SOURCE_MAP grouped by category) mapping each citation to the tool it powers, alongside an embedded EvidenceSearch and a support directory. Help the user trace which source backs which feature. Only cite sources that actually appear in this registry; never invent a study, statistic, or hadith grade — if something isn't in the registry say 'غير موثّق / Unverified'.",
  },
  "/tools-download": {
    title: "Offline Verification Tools",
    titleAr: "أدوات التحقق دون اتصال",
    scenarios: [
      {
        paste: "Which script detects if an image was edited, and what does it need to run?",
        pasteAr: "أنهي سكربت بيكشف لو الصورة متعدّلة، وبيحتاج إيه عشان يشتغل؟",
        note: "Download real Python scripts (bot hunter, ELA analyzer, PDF metadata) to run locally.",
        noteAr: "نزّل سكربتات بايثون حقيقية (صيّاد البوتات، محلّل ELA، بيانات PDF) عشان تشغّلها محليًا.",
      },
    ],
    useCases: [
      {
        help: "Lets you download real, runnable Python forensic scripts (bot_hunter, ela_analyzer, pdf_metadata) so you can verify images, bots, and document metadata on your own machine without trusting any server.",
        helpAr: "بيخلّيك تنزّل سكربتات بايثون جنائية حقيقية وقابلة للتشغيل (bot_hunter، ela_analyzer، pdf_metadata) عشان تتحقّق من الصور والبوتات وبيانات المستندات على جهازك من غير ما تثق في أي خادم.",
        apply: "Run ela_analyzer.py on a suspicious image offline — the result doesn't depend on this site staying online or honest.",
        applyAr: "شغّل ela_analyzer.py على صورة مشبوهة أوفلاين — النتيجة مش معتمدة على إن الموقع ده يفضل شغّال أو أمين.",
      },
    ],
    chatbotContext:
      "You are the assistant on the Offline Tools Download page (/tools-download). It serves three real Python scripts from /scripts/ (bot_hunter.py, ela_analyzer.py, pdf_metadata.py) for local image/bot/PDF forensics — a true file download, no server analysis. Explain what each script does and how to run it (Python + dependencies like Pillow). Never overstate what a script proves or invent a benchmark; if effectiveness is unsupported say 'غير موثّق / Unverified'.",
  },
  "/womens-shield": {
    title: "Women's Shield — Manipulation Detector",
    titleAr: "درع المرأة — كاشف التلاعب",
    scenarios: [
      {
        paste: "انتِ بتتهيّئي وبتبالغي، أنا عمري ما قلت كده، وأهلك بيخرّبوا دماغك.",
        pasteAr: "انتِ بتتهيّئي وبتبالغي، أنا عمري ما قلت كده، وأهلك بيخرّبوا دماغك.",
        note: "Paste a message to scan for gaslighting, guilt-tripping, isolation, or coercion.",
        noteAr: "الصق رسالة عشان تتفحص لكشف الغازلايتنغ والابتزاز بالذنب والعزل والإكراه.",
      },
    ],
    useCases: [
      {
        help: "Scans a message for emotional-abuse patterns (gaslighting, guilt-tripping, isolation attempts, intimidation/coercion) in Arabic and English, names each tactic with a severity level, and lists Egyptian support hotlines.",
        helpAr: "بيفحص رسالة بحثًا عن أنماط الإساءة العاطفية (غازلايتنغ، ابتزاز بالذنب، محاولات عزل، ترهيب/إكراه) بالعربي والإنجليزي، بيسمّي كل تكتيك بمستوى خطورته، وبيعرض خطوط مساندة مصرية.",
        apply: "If a partner's messages keep making you doubt yourself, paste one here to see the named pattern — and reach the listed crisis line when needed.",
        applyAr: "لو رسائل شريك بتخلّيكِ تشكّي في نفسك على طول، الصقي واحدة هنا عشان تشوفي النمط مُسمّى — واتواصلي مع خط الأزمات المذكور وقت الحاجة.",
      },
    ],
    chatbotContext:
      "You are the assistant on the Women's Shield page (/womens-shield). It runs a client-side keyword/pattern matcher (MANIPULATION_RULES) over pasted text to flag gaslighting, guilt-tripping, isolation, and intimidation/coercion with a High/Medium severity, and lists Egyptian support resources (e.g. mental-health hotline 15335). It is awareness support, not a diagnosis or legal advice; in danger, urge contacting the listed hotline or authorities. Never fabricate a statistic, source, or hotline; if a number or claim isn't shown on-page say 'غير موثّق / Unverified'.",
  },
};
