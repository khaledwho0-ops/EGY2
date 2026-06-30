import { Domain, Fallacy, DetectedFallacy, SCIENTIFIC_FALLACIES, ISLAMIC_FALLACIES, ALL_FALLACIES } from './fallacies-data';

// ═══════════════════════════════════════════════════════════════════
//  TIER 1 — REGEX RULE ENGINE (instant, bilingual EN+AR patterns)
// ═══════════════════════════════════════════════════════════════════

interface FallacyPattern {
  id: string;
  patterns: RegExp[];
}

const FALLACY_PATTERNS: FallacyPattern[] = [
  // ── SCIENTIFIC FALLACIES ──
  { id: "F1", patterns: [
    /after\s+(?:that|this|which)\s*,?\s*(?:therefore|so|thus|hence|means?)/i,
    /because\s+.*(?:happened?\s+(?:before|first|then))/i,
    /since\s+i\s+(?:started|began|took|used).*(?:then|so|therefore|it\s+must)/i,
    /بعد\s*(?:ما|م)\s*.*(?:يبقى|يعني|اذن|إذن|فـ?بالتالي)/i,
    /عشان\s*.*(?:بعدها|بعد\s*كده|حصل)/i,
  ]},
  { id: "F2", patterns: [
    /(?:only|just|ignore|ignoring|overlooking)\s+(?:the\s+)?(?:studies?|data|evidence|research)\s+(?:that|which)/i,
    /cherry[\s-]?pick/i,
    /(?:\d+)\s+studies?\s+(?:say|show|prove|confirm).*(?:ignor|hid|without\s+mention)/i,
    /بس\s*(?:الدراسات?|الأبحاث)\s*(?:اللي|دي)/i,
    /اختار.*(?:اللي\s*يعجبه|يناسبه|على\s*مزاجه)/i,
  ]},
  { id: "F3", patterns: [
    /natural\s*(?:is|means?|=)?\s*(?:better|safe[r]?|good|healthy|pure)/i,
    /because\s+(?:it(?:'?s)?|they(?:'?re)?)\s+natural/i,
    /chemical[\s-]?free\s+(?:is|means?)\s*(?:better|safe)/i,
    /طبيعي\s*(?:أحسن|آمن|أفضل|مفيد|صحي)/i,
    /عشان\s*(?:هو|هي)?\s*طبيعي/i,
  ]},
  { id: "F4", patterns: [
    /(?:dr|prof|professor|doctor)\.?\s+\w+\s+(?:said|says|confirms?|proved?|stated)/i,
    /(?:expert|specialist|authority)\s+(?:said|says|confirms?)/i,
    /has\s+(?:a\s+)?(?:phd|doctorate|degree)\s+(?:so|therefore|which\s+means?)/i,
    /الدكتور\s*\w*\s*(?:قال|أكد|أثبت|بيقول)/i,
    /الشيخ\s*\w*\s*(?:قال|أفتى|أكد|بيقول)/i,
  ]},
  { id: "F5", patterns: [
    /p[\s-]?(?:value|hacking|hack)/i,
    /statistic(?:al)?(?:ly)?\s+significant\s+(?:at|with)\s+(?:p\s*[<=]\s*0\.0[45])/i,
    /data\s+dredg/i,
    /قيمة\s*(?:ال)?p/i,
    /تلاعب\s*(?:بـ?ال)?(?:إحصا|احصا)/i,
  ]},
  { id: "F6", patterns: [
    /(?:look\s+at|consider)\s+(?:all\s+)?(?:the\s+)?(?:successful|rich|famous)\s+(?:people|ones)/i,
    /survivorship\s+bias/i,
    /dropped?\s+out\s+(?:and|but)\s+(?:succeeded|made\s+it|became)/i,
    /بص\s*(?:على|ع)\s*(?:الناجحين|اللي\s*نجحوا)/i,
    /سابو?\s*(?:الدراسة|التعليم|الجامعة)\s*و\s*(?:نجحو|عملو)/i,
  ]},
  { id: "F7", patterns: [
    /(?:country|nation|group)\s+.*(?:average|statistics?)\s*.*(?:therefore|so)\s+(?:every|each|this)\s+(?:person|individual)/i,
    /ecological\s+fallacy/i,
    /(?:all|every)\s+\w+\s+(?:from|in)\s+\w+\s+(?:are|is)\s+\w+\s+because.*(?:average|statistics?)/i,
    /(?:البلد|الدولة|المجموعة)\s*(?:دي|دول)\s*.*(?:يبقى|معناه)\s*(?:كل|أي)\s*(?:واحد|فرد|شخص)/i,
    /إحصائيات?\s*(?:ال)?(?:مجموعة|بلد)\s*.*(?:على\s*الفرد)/i,
  ]},
  { id: "F8", patterns: [
    /simpson(?:'?s)?\s+paradox/i,
    /(?:works?|effective)\s+(?:in|for)\s+(?:both|each|men|women)\s+(?:but|yet)\s+(?:fails?|reverse|opposite)\s+(?:when|overall|combined)/i,
    /مفارقة\s*سيمبسون/i,
    /(?:بينجح|بيشتغل)\s*(?:في|مع)\s*(?:كل|الاتنين)\s*بس\s*(?:لما\s*ن)?(?:جمع|جمّع)/i,
  ]},
  { id: "F9", patterns: [
    /base\s*rate\s*(?:neglect|fallacy|ignore)/i,
    /(?:99|98|95)\s*%?\s+accurate\s+(?:test|screening)\s+.*(?:rare|uncommon|prevalence)/i,
    /(?:false\s+positive|false\s+negative)\s*.*(?:rare|base\s*rate|prevalence)/i,
    /(?:تحليل|اختبار)\s*(?:دقته?|نسبت)\s*(?:\d+%?).*(?:نادر|انتشار)/i,
    /إهمال\s*(?:ال)?(?:نسبة\s*ال)?(?:أساسية|قاعدية)/i,
  ]},
  { id: "F10", patterns: [
    /(?:both|two)\s+sides?\s+(?:are|deserve)\s+equal/i,
    /false\s+equivalen/i,
    /(?:teach|present|give)\s+(?:both|equal)\s+(?:sides?|views?|perspectives?)/i,
    /(?:الرأي\s*و\s*الرأي\s*الآخر|الطرفين\s*متساويين)/i,
    /(?:نفس\s*ال)?(?:وزن|قيمة|مصداقية)\s*.*(?:لكل|للطرفين)/i,
  ]},
  { id: "F11", patterns: [
    /(?:not|isn't|aren't)\s+(?:100\s*%|perfect|completely)\s+(?:effective|safe|reliable)\s*,?\s+(?:so|therefore|then|why)/i,
    /nirvana\s+fallacy/i,
    /(?:if|since)\s+(?:it|they)\s+(?:can't|cannot|don't|doesn't)\s+(?:guarantee|ensure)\s+100/i,
    /مش\s*(?:100%?|مية\s*بالمية|كامل|مثالي)\s*(?:يبقى|فـ?\s*خلاص|فـ?\s*ملهاش\s*لازمة)/i,
    /طالما\s*مش\s*(?:كامل|مضمون|أكيد)/i,
  ]},
  { id: "F12", patterns: [
    /(?:since|when|after)\s+(?:i|we)\s+(?:started|began).*(?:therefore|so|means?|coincidence)/i,
    /correlation\s*.*(?:causation|cause)/i,
    /(?:correlat|ice\s*cream.*(?:drown|murder|crime))/i,
    /(?:من\s*(?:ساعة|يوم|لما)\s*.*(?:يبقى|معناه)\s*(?:بسبب|عشان))/i,
    /(?:ارتباط|علاقة)\s*.*(?:مش|لا)\s*(?:يعني|معناه)\s*(?:سبب|تسبب)/i,
  ]},
  { id: "F13", patterns: [
    /regression\s+to\s+(?:the\s+)?mean/i,
    /(?:felt|was)\s+(?:terrible|worst|awful|sick).*(?:tried|took|used).*(?:now|then)\s+(?:feel|felt)\s+(?:better|normal|fine)/i,
    /(?:would\s+have|gonna|going\s+to)\s+(?:get\s+better|improve|recover)\s+anyway/i,
    /كان\s*(?:وحش|تعبان|سيء).*(?:جرب|خد|أخد).*(?:اتحسن|رجع\s*طبيعي)/i,
    /ارتداد\s*(?:إلى|للـ?|نحو)\s*(?:ال)?متوسط/i,
  ]},
  { id: "F14", patterns: [
    /publication\s+bias/i,
    /file\s+drawer\s+(?:problem|effect)/i,
    /(?:only|just)\s+publish\s+(?:positive|successful|significant)\s+result/i,
    /(?:نشر\s*(?:بس|فقط)\s*(?:ال)?(?:نتائج\s*ال)?(?:إيجابية|الناجحة))/i,
    /(?:تحيز|انحياز)\s*(?:ال)?نشر/i,
  ]},
  { id: "F15", patterns: [
    /(?:comes?\s+from|made\s+in|origin(?:ates?)?)\s+\w+\s+(?:so|therefore|thus|hence)\s+(?:it(?:'?s)?|must\s+be)\s+(?:fake|bad|wrong|untrust)/i,
    /genetic\s+fallacy/i,
    /(?:don't|can't|never)\s+trust\s+(?:anything|research|studies?)\s+from\s+\w+/i,
    /(?:جاي|جاية?|طالع)\s*من\s*\w+\s*(?:يبقى|فـ?\s*أكيد)\s*(?:غلط|مزيف|كداب)/i,
    /(?:ما\s*ت)?(?:صدق|ثق)\s*(?:ش|شي)?\s*(?:حاجة\s*)?(?:من|طالعة?\s*من)\s*\w+/i,
  ]},
  { id: "F16", patterns: [
    /(?:new|latest|newest|modern|recent)\s*(?:is|=|means?)?\s*(?:better|superior|improved|best)/i,
    /appeal\s+to\s+novelty/i,
    /(?:breakthrough|revolutionary|cutting[\s-]?edge)\s+(?:supplement|product|treatment|cure)/i,
    /(?:جديد|أحدث|أخر)\s*(?:يبقى|معناه|=)?\s*(?:أحسن|أفضل)/i,
    /(?:اكتشاف|ثورة|طفرة)\s*(?:جديد[ة]?)\s*(?:في|بتاع[ة]?)/i,
  ]},
  { id: "F17", patterns: [
    /(?:i(?:'ve|'m|have)?\s+(?:already|been)\s+(?:invest|spend|spent|paid|doing|taking))/i,
    /sunk\s+cost/i,
    /(?:can't|cannot|shouldn't)\s+stop\s+(?:now|after)\s+(?:all\s+)?(?:this|that|so\s+much)/i,
    /(?:أنا\s*)?(?:بقالي|خلاص\s*أنا)\s*(?:سنين|كتير|فترة)\s*(?:باخد|بعمل|بادفع)/i,
    /(?:مقدر|مينفع)ش?\s*(?:أبطل|أوقف|أسيب)\s*(?:دلوقتي|بعد\s*كل\s*ده)/i,
  ]},
  { id: "F18", patterns: [
    /dunning[\s-]?kruger/i,
    /(?:facebook|twitter|youtube|tiktok|social\s+media)\s+(?:user|guy|person|post).*(?:debunk|disprove|refute).*(?:peer[\s-]?review|stud(?:y|ies)|expert)/i,
    /(?:do\s+your\s+own)\s+research/i,
    /(?:واحد\s*(?:ع\s*ال)?(?:فيسبوك|فيس|تويتر|يوتيوب))\s*(?:بيفند|بيكذب|رد\s*على)\s*(?:دراس|دكتور|بحث|عالم)/i,
    /ابحث\s*(?:بنفسك|أنت|إنت|لوحدك)/i,
  ]},
  { id: "F19", patterns: [
    /(?:my|his|her|their)\s+(?:uncle|aunt|grand(?:father|mother|pa|ma)|neighbor|friend|cousin).*(?:smoked?|drank?|ate?|didn't\s+vaccinate)/i,
    /(?:anecdot(?:e|al)|personal\s+stor(?:y|ies)|one\s+case)/i,
    /(?:i\s+know\s+(?:a\s+)?(?:guy|someone|person)\s+who)/i,
    /(?:خالي|عمي|جدي|جارنا|واحد\s*أعرفه)\s*(?:كان\s*)?(?:بيدخن|مبيروحش|ماخد|عمره?\s*ما)/i,
    /(?:أنا\s*)?(?:أعرف\s*واحد|شفت\s*حد)\s*(?:عمل|جرب|خد)/i,
  ]},
  { id: "F20", patterns: [
    /(?:ok|okay|fine|alright)\s*,?\s*(?:but|however|what\s+about)/i,
    /mov(?:e|ing)\s+(?:the\s+)?goalpost/i,
    /(?:that\s+)?(?:doesn't\s+matter|is\s+irrelevant).*(?:what\s+about|but\s+then)/i,
    /(?:طيب|ماشي|أوكي)\s*(?:بس|لكن)\s*(?:إيه|ايه)\s*(?:رأيك|بتاع)/i,
    /نقل\s*(?:ال)?(?:هدف|مرمى)/i,
  ]},
  { id: "F21", patterns: [
    /(?:if\s+we\s+(?:allow|accept|permit|let)).*(?:(?:will|gonna|going\s+to)\s+(?:lead|end\s+up|result|collapse|destroy|ruin))/i,
    /slippery\s+slope/i,
    /(?:where\s+(?:does|will)\s+it\s+(?:end|stop)|opens?\s+the\s+(?:door|floodgates?))/i,
    /(?:لو\s+(?:سمحنا|خلينا|وافقنا)).*(?:هـ?(?:ي|ن)?(?:وصل|وقع|ينهار|يخرب))/i,
    /(?:المنحدر\s*ال)?(?:زلق|منزلق)/i,
  ]},
  { id: "F22", patterns: [
    /(?:so\s+you(?:'re)?\s+saying|what\s+you(?:'re)?\s+really\s+(?:saying|mean))/i,
    /straw\s*man/i,
    /(?:scientists?\s+(?:say|claim|think|believe)\s+.*(?:(?:came?\s+from|evolved?\s+from)\s+monkey))/i,
    /(?:يعني\s*(?:أنت|إنت)\s*(?:بتقول|عايز\s*تقول|قصدك))/i,
    /(?:رجل\s*(?:ال)?قش|حجة?\s*(?:ال)?قش)/i,
  ]},
  { id: "F23", patterns: [
    /(?:he|she|they)(?:'s|'re|\s+is|\s+are)\s+(?:funded|paid|sponsored|biased|corrupt|overweight|fat|stupid|ignorant|uneducated|crazy|a\s+hypocrite|just\s+a)/i,
    /(?:can(?:'?t|not)\s+trust|don'?t\s+trust|why\s+(?:listen\s+to|believe))\s+(?:that|this|the|him|her|them)?\s*\w*\s*(?:about|on|when)?\s*\w*[\s,—-]+(?:he|she|they|because\s+(?:he|she|they))/i,
    /ad\s+hominem/i,
    /(?:attack(?:ing)?)\s+(?:the\s+)?(?:person|character|source)\s+(?:instead|rather\s+than|not)\s+(?:the\s+)?(?:argument|evidence|data|point)/i,
    /(?:هو|هي|هم|دول)\s*(?:بيتدفعلهم|ماخدين\s*فلوس|بتوع\s*شركات|تخين|سمين|غبي|جاهل|بيكذب)/i,
    /(?:اهاجم|بيهاجم|هاجم)\s*(?:ال)?(?:شخص|واحد)\s*(?:مش|ولا)\s*(?:ال)?(?:حجة?|كلام|رأي)/i,
    /(?:ما\s*ت)?صدق(?:ش)?\s*(?:ال)?(?:دكتور|راجل|واحد).*(?:عشان|لأن)\s*(?:هو)/i,
  ]},
  { id: "F24", patterns: [
    /(?:millions?|everyone|everybody|most\s+people|so\s+many)\s+(?:use|believe|do|take|trust|support|follow)/i,
    /bandwagon/i,
    /(?:can't|cannot)\s+(?:all\s+)?(?:be\s+wrong|millions?\s+be\s+wrong)/i,
    /(?:ملايين|كل\s*الناس|ناس\s*كتير)\s*(?:بي|بت)?(?:ستخدم|عمل|صدق|اخد)/i,
    /(?:مش\s*(?:ممكن|معقول)\s*(?:كلهم|الكل)\s*(?:غلط|غلطانين))/i,
  ]},
  { id: "F25", patterns: [
    /(?:either|it(?:'?s)?\s+either)\s+.*\s+or\s+/i,
    /false\s+(?:dilemma|dichotomy)/i,
    /(?:only|just)\s+(?:two|2)\s+(?:options?|choices?|ways?)/i,
    /(?:يا\s*.*\s*يا\s*)/i,
    /(?:إما|اما)\s+.*\s+(?:أو|او)\s+/i,
    /(?:مفيش|ما\s*في|مافيش)\s*(?:غير|إلا)?\s*(?:حل|اختيار|طريق|بديل)\s*(?:واحد|اتنين|تاني|آخر)/i,
  ]},

  // ── ISLAMIC FALLACIES ──
  { id: "IF1", patterns: [
    /(?:(?:actually|really)\s+mean|true\s+meaning\s+(?:of|is))\s+.*(?:quran|arabic|ayah|verse)/i,
    /(?:redefin|twist|distort).*(?:meaning|word|term)\s+(?:in|of|from)\s+(?:the\s+)?(?:quran|arabic|shariah)/i,
    /tahrif/i,
    /تحريف\s*(?:ال)?(?:معنى|لفظ|كلمة|آية)/i,
    /(?:ال)?(?:كلمة|لفظة?|آية)\s*(?:دي|هنا)\s*(?:معناها\s*(?:الحقيقي|في\s*الأصل))/i,
  ]},
  { id: "IF2", patterns: [
    /(?:verse|ayah|surah)\s+(?:says?|states?|mentions?).*(?:without|ignoring|regardless\s+of)\s+(?:context|asbab|revelation)/i,
    /(?:out\s+of\s+context|context[\s-]?strip|decontextualiz)/i,
    /asbab\s*(?:al[\s-]?)?nuzul/i,
    /(?:آية|سورة)\s*.*(?:من\s*غير|بدون)\s*(?:سياق|سبب\s*(?:ال)?نزول)/i,
    /(?:اقتطع|قطع|نزع)\s*(?:ال)?(?:آية|نص)\s*(?:من|عن)\s*(?:ال)?(?:سياق)/i,
  ]},
  { id: "IF3", patterns: [
    /(?:kafir|kaffir|kaafir|infidel|disbeliever)\b/i,
    /(?:you(?:'re|\s+are)\s+(?:no\s+longer|not|not\s+a)\s+muslim)/i,
    /(?:takfir|excommunicat)/i,
    /كافر|مرتد|خارج\s*(?:عن|من)?\s*(?:ال)?(?:ملة|إسلام|دين)/i,
    /(?:مش|لا|ما\s*عاد)\s*مسلم/i,
  ]},
  { id: "IF4", patterns: [
    /(?:madhab|madhhab|school\s+of\s+(?:thought|jurisprudence))[\s-]?(?:shopping|hopping|mixing)/i,
    /talfiq/i,
    /(?:(?:pick|choose|take)\s+(?:the\s+)?(?:strictest|loosest|easiest|harshest)\s+(?:opinion|view|ruling)\s+from\s+(?:different|each|another))/i,
    /تلفيق|(?:ياخد|ياخذ|بياخد)\s*(?:من\s*)?(?:كل\s*)?مذهب/i,
    /(?:أشد|أسهل|أخف)\s*(?:رأي|حكم|فتوى)\s*(?:من\s*)?(?:كل\s*)?مذهب/i,
  ]},
  { id: "IF5", patterns: [
    /(?:abrogat|nasikh|mansukh)/i,
    /(?:cancel|abrogat|supersed).*(?:rul(?:e|ing)|vers|ayah|law)/i,
    /(?:still\s+applies?|binding)\s+.*(?:abrogat|cancel|overrid)/i,
    /(?:ناسخ|منسوخ)\s*.*(?:حكم|آية|حديث)/i,
    /(?:حكم|آية)\s*(?:ملغ[يا]ة?|منسوخ[ة]?)\s*(?:لسه|بيستخدمو|بيحتجو)/i,
  ]},
  { id: "IF6", patterns: [
    /(?:fabricat|mawdu|mawdoo|forged)\s*(?:'|ʿ)?\s*(?:hadith|narration)/i,
    /(?:hadith|narration)\s+(?:is\s+)?(?:fabricated|mawdu|mawdoo|forged)/i,
    /حديث\s*(?:موضوع|مكذوب|مفبرك|مصنوع)/i,
    /(?:موضوع|مكذوب)\s*(?:بيقولوا?|بيستشهدو|بينسبو)\s*(?:للنبي|للرسول)/i,
    /(?:قال\s*(?:ال)?(?:نبي|رسول)).*(?:موضوع|مكذوب|لا\s*(?:أصل|سند)\s*له)/i,
  ]},
  { id: "IF7", patterns: [
    /(?:da'?i?f|weak|daif)\s+(?:hadith|narration)\s*.*(?:obligat|binding|legislation|law|ruling|fard|wajib)/i,
    /(?:hadith|narration)\s+(?:is\s+)?(?:weak|da'?i?f|daif)\s*.*(?:us(?:e|ing)\s+(?:it\s+)?(?:as|for)\s+(?:evidence|proof|ruling))/i,
    /حديث\s*ضعيف\s*.*(?:حكم|تشريع|فرض|واجب|إلزام|حلال|حرام)/i,
    /(?:استدل|احتج|بيحتجو)\s*بـ?(?:حديث\s*)?ضعيف/i,
  ]},
  { id: "IF8", patterns: [
    /(?:youtube[r]?|tiktoker|blogger|influencer|facebook\s+(?:page|user))\s*.*(?:fatwa|fatwas|ruling|halal|haram|islamic\s+ruling)/i,
    /(?:without|no)\s+(?:ijaz|qualif|authority|credentials?)\s*.*(?:fatwa|ruling|islamic)/i,
    /scholarly\s+cosplay/i,
    /(?:يوتيوبر|تيكتوكر|فيسبوك)\s*.*(?:فتوى|فتاوي|حكم\s*شرعي)/i,
    /(?:من\s*غير|بدون)\s*(?:إجازة|تأهيل|علم\s*شرعي)\s*.*(?:بيفتي|يحلل|يحرم)/i,
  ]},
  { id: "IF9", patterns: [
    /(?:cultur|tradition|custom)\s*.*(?:(?:disguise|present|call|label|mask)\s*(?:as|it)\s*(?:islam|shariah|shari'ah|deen|religion))/i,
    /(?:(?:islam|shariah)\s+(?:says?|requires?|demands?|teaches?)).*(?:cultur|tradition|custom)/i,
    /urf/i,
    /(?:عادات?|تقاليد|عرف)\s*.*(?:ملهاش|مش|لا)\s*(?:علاقة\s*بـ?ال)?(?:دين|إسلام|شرع)/i,
    /(?:ثقافة|عادة)\s*(?:مش|لا)\s*(?:دين|شرع|إسلام)\s*/i,
  ]},
  { id: "IF10", patterns: [
    /(?:islam\s+(?:is\s+)?peace|religion\s+of\s+peace)\s*.*(?:but|while|yet|however)\s*.*(?:kill|murder|honor|honour|violen)/i,
    /selective\s+compassion/i,
    /(?:mercy|compassion|peace)\s+(?:in\s+)?(?:one|some).*(?:brutal|harsh|violent|cruel)\s+(?:in\s+)?(?:other|another)/i,
    /(?:إسلام\s*(?:ال)?سلام|دين\s*(?:ال)?رحمة)\s*.*(?:بس|لكن|ومع\s*ذلك).*(?:قتل|عنف|ضرب|جريمة\s*شرف)/i,
    /(?:رحمة|سماحة)\s*(?:في|مع)\s*.*(?:قسوة|عنف|وحشية)\s*(?:في|مع)/i,
  ]},
  { id: "IF11", patterns: [
    /(?:7th|seventh)\s+centur.*(?:appl|relevant|valid|binding)\s+(?:today|now|modern)/i,
    /historical\s+anachronism/i,
    /(?:at\s+(?:the\s+)?time\s+of\s+(?:the\s+)?prophet|in\s+(?:the\s+)?prophet(?:'s)?\s+(?:time|era)).*(?:therefore|so|thus|still\s+applies?)/i,
    /(?:حكم|فتوى)\s*(?:في\s*)?(?:عصر|زمن|وقت)\s*(?:ال)?(?:نبي|رسول|صحابة).*(?:لسه|يطبق|ينفع\s*دلوقتي)/i,
    /(?:قديم|تاريخي|من\s*\d+\s*سنة)\s*(?:ولسه|و\s*بيطبقو)/i,
  ]},
  { id: "IF12", patterns: [
    /(?:quran|qur'?an)\s*.*(?:predict|describ|mention|discover|prove).*(?:scien|big\s+bang|embryo|atom|black\s+hole|speed\s+of\s+light)/i,
    /(?:scien|modern)\s*.*(?:confirm|prove|discover)\s*.*(?:quran|qur'?an)/i,
    /concordism/i,
    /القرآن\s*(?:أثبت|وصف|ذكر|اكتشف|سبق)\s*(?:ال)?(?:علم|علماء)/i,
    /(?:ال)?(?:إعجاز\s*العلمي|إعجاز\s*(?:ال)?قرآن)/i,
  ]},
  { id: "IF13", patterns: [
    /(?:just|only)?\s*(?:pray|read\s+quran|dhikr|make\s+du'?a)\s*(?:more|harder|enough)?\s*.*(?:depress|anxi|mental|therapy|psycholog|OCD|PTSD|bipolar)/i,
    /(?:depress|anxi|mental\s+(?:health|illness)|therapy)\s*.*(?:just|only)\s*(?:pray|faith|trust\s+(?:in\s+)?(?:god|allah))/i,
    /spiritual\s+gaslighting/i,
    /(?:صلي|ادعي|اقر[اأ]\s*قرآن|أذكار)\s*(?:و\s*)?(?:هتتحسن|هتخف|مش\s*محتاج\s*(?:دكتور|علاج))/i,
    /(?:اكتئاب|قلق|نفسي|وسواس)\s*(?:ده|دا)?\s*(?:بس|فقط)?\s*(?:صلي|ادعي|قلة\s*إيمان|ضعف\s*إيمان)/i,
  ]},
  { id: "IF14", patterns: [
    /(?:obey|obedien|honor|honour)\s+(?:your\s+)?parent.*(?:abus|steal|control|salary|money|beat|hit)/i,
    /(?:birr|birr\s+al[\s-]?walidayn)\s*.*(?:weapon|abus|manipulat)/i,
    /بر\s*(?:ال)?(?:والدين|الأهل|الوالد[ة]?).*(?:فلوس|مرتب|ضرب|إساءة|أذى|سيطرة)/i,
    /(?:الأهل|أبوك|أمك)\s*.*(?:لازم\s*(?:تطيع|تسمع|تدي))\s*.*(?:فلوس|مرتب|كل\s*حاجة)/i,
    /(?:عقوق|عاق)\s*.*(?:عشان\s*(?:رفض|مش\s*عايز))/i,
  ]},
  { id: "IF15", patterns: [
    /(?:hell|hellfire|jahannam|naar|fire)\s*.*(?:(?:if|unless)\s+you\s+(?:don't|do\s+not)\s+(?:obey|listen|follow))/i,
    /(?:(?:obey|listen|follow)\s+(?:me|us))\s*.*(?:hell|hellfire|jahannam|naar|punishment)/i,
    /(?:جهنم|النار|عذاب)\s*.*(?:لو\s*(?:ما|م)?\s*(?:سمعت|طعت|عملت))/i,
    /(?:لو\s*مـ?(?:ا\s*)?(?:سمعتش?|طعتش?|عملتش?))\s*.*(?:جهنم|النار|ربنا\s*(?:هي|ها)?(?:عاقبك|يعذبك))/i,
    /(?:ابتزاز|تهديد)\s*(?:بـ?ال)?(?:آخرة|نار|عذاب)/i,
  ]},
  { id: "IF16", patterns: [
    /(?:all\s+scholars?|scholarly\s+consensus|unanimous|ijma)\s+(?:agree|says?|confirm)/i,
    /(?:there\s+is\s+)?(?:no\s+)?(?:difference|disagreement|khilaf|ikhtilaf)\s+(?:on|about|regarding)\s+this/i,
    /ijma\s*(?:fraud|false|fake|fabricat)/i,
    /(?:إجماع|كل\s*العلماء|العلماء\s*(?:كلهم|أجمعو))\s*(?:على|اتفقو)/i,
    /(?:مفيش|لا\s*يوجد)\s*(?:خلاف|اختلاف)\s*(?:في|على|بين\s*العلماء)/i,
  ]},
  { id: "IF17", patterns: [
    /(?:qiyas|analogy|analogical)\s*.*(?:corrupt|invalid|false|wrong|fallac)/i,
    /(?:false|bad|invalid|wrong)\s+(?:qiyas|analogy|analogical\s+reason)/i,
    /(?:compar|equat|same\s+as)\s*.*(?:completely\s+different|unrelated|not\s+(?:the\s+)?same)/i,
    /قياس\s*(?:فاسد|باطل|خاطئ|غلط|مع\s*الفارق)/i,
    /(?:يقيس|قاس|شبّه)\s*.*(?:مختلف|ملوش\s*علاقة|فرق\s*كبير)/i,
  ]},
  { id: "IF18", patterns: [
    /(?:maqasid|objective|purpose)\s+(?:of\s+)?(?:shariah|shari'ah|islam)\s*.*(?:justify|used?\s+to|excuse)\s*.*(?:opposite|destroy|violat|harm|kill)/i,
    /maqasid\s+inversion/i,
    /(?:preserv|protect)\s+(?:religion|life|intellect|lineage|property)\s*.*(?:destroy|harm|kill|suppress|oppress)/i,
    /(?:مقاصد\s*(?:ال)?شريعة)\s*.*(?:عكس|ضد|تبرير\s*(?:ال)?(?:قتل|أذى|ظلم))/i,
    /(?:حفظ\s*(?:ال)?(?:دين|نفس|عقل|نسل|مال))\s*.*(?:(?:ي|ت|ن)دمر|(?:ي|ت|ن)قتل|(?:ي|ت|ن)أذي)/i,
  ]},
  { id: "IF19", patterns: [
    /(?:are\s+you\s+saying|do\s+you\s+think|you\s+know\s+better\s+than)\s*.*(?:allah|god|prophet|quran)/i,
    /(?:who\s+are\s+you\s+to)\s*(?:question|challenge|disagree\s+with)/i,
    /takfir\s+by\s+implication/i,
    /(?:أنت|إنت)\s*(?:بتقول\s*إنك?\s*)?(?:أعلم|أحسن|أفهم)\s*(?:من\s*)?(?:ربنا|الله|النبي|القرآن)/i,
    /(?:أنت|إنت)\s*(?:مين|هتعترض|هتناقش)\s*(?:على|في)\s*(?:كلام\s*)?(?:ربنا|الله)/i,
  ]},
  { id: "IF20", patterns: [
    /(?:historical|classical|medieval|old)\s+(?:consensus|ijma|agreement)\s*.*(?:without|ignor|regardless).*(?:changed?|modern|new|current|conditions?)/i,
    /decontextualized?\s+ijma/i,
    /(?:medieval|ancient|classical)\s+(?:rul(?:e|ing)|market|law)\s*.*(?:appl(?:y|ied))\s+(?:to\s+)?(?:modern|today|current|21st)/i,
    /(?:إجماع\s*(?:قديم|تاريخي|كلاسيكي))\s*.*(?:بدون|من\s*غير)\s*(?:مراعاة\s*)?(?:التغيير|الظروف|العصر)/i,
    /(?:حكم|فتوى)\s*(?:من\s*)?(?:العصور\s*الوسطى|القديم)\s*.*(?:على\s*)?(?:الحديث|المعاصر|اليوم)/i,
  ]},
  { id: "IF21", patterns: [
    /bid'?ah\s*.*(?:haram|forbidden|prohibited|heresy|innovation)/i,
    /(?:haram|forbidden|prohibited)\s*.*(?:bid'?ah|innovation)/i,
    /(?:birthday|mawlid|celebration|national\s+day)\s*.*(?:bid'?ah|haram|forbidden)/i,
    /بدعة\s*.*(?:حرام|محرم|ممنوع|ضلالة)/i,
    /(?:أعياد?\s*(?:ال)?ميلاد|المولد|الاحتفال)\s*(?:ده?|دي|كلو?)\s*بدعة/i,
  ]},
  { id: "IF22", patterns: [
    /(?:women?|wife|wives?)\s*.*(?:(?:property|inferior|subordinate|obey|subservient|owned)\s*.*(?:islam|quran|religion|god|allah|4[\s:.]34))/i,
    /(?:quran\s*4[\s:.]34|qawwamun)\s*.*(?:wife|women?|beat|hit|strike|obey)/i,
    /gender\s+weapon/i,
    /(?:المرأة?|الست|الزوجة?)\s*(?:ملك|تبع|لازم\s*تطيع|مملوكة)/i,
    /(?:قوامة|٤[\s:.]٣٤|النساء\s*٣٤)\s*.*(?:ضرب|طاعة|ملك)/i,
  ]},
  { id: "IF23", patterns: [
    /(?:all|every|any)\s+(?:bank|banking|finance|insurance|mortgage|interest|loan)\s*.*(?:riba|haram|forbidden|prohibited)/i,
    /(?:riba|ربا)\s*.*(?:all|every|any|كل|أي)\s*(?:bank|banking|بنك|بنوك)/i,
    /economic\s+(?:isolation|paralysis)/i,
    /(?:كل\s*ال)?(?:بنوك|البنوك|التأمين|القروض|الفوايد)\s*(?:ربا|حرام|كلها?\s*حرام)/i,
    /(?:ربا|حرام)\s*(?:و\s*)?(?:مفيش|ملناش|مقدرش)\s*(?:بديل|حل)/i,
  ]},
  { id: "IF24", patterns: [
    /(?:only\s+(?:our|my|this)\s+(?:group|sect|jama'ah|path|way))\s*.*(?:saved?|correct|right|heaven|jannah)/i,
    /(?:all\s+other|the\s+rest|everyone\s+else)\s*.*(?:deviant|wrong|hell|astray|misguided)/i,
    /sectarian\s+other/i,
    /(?:الفرقة?\s*(?:ال)?ناجية?\s*(?:بس|فقط|هي))/i,
    /(?:كل\s*ال)?(?:باقي|تاني|غيرنا)\s*(?:ضالين|منحرفين|مبتدعة|في\s*النار)/i,
  ]},
  { id: "IF25", patterns: [
    /(?:(?:the\s+)?sheikh\s+said|(?:the\s+)?imam\s+said|scholar\s+said)\s*.*(?:=|means?|equals?|same\s+as|is)\s*.*(?:god|allah)\s+said/i,
    /(?:god|allah)\s+said\s*.*(?:actually|really|but)\s*.*(?:sheikh|imam|scholar)\s*(?:'s)?\s+(?:opinion|view|interpretation)/i,
    /authority\s+transfer/i,
    /(?:الشيخ\s*قال|قال\s*الشيخ)\s*(?:=|يعني|معناه)\s*(?:ربنا\s*قال|الله\s*قال|كلام\s*ربنا)/i,
    /(?:رأي\s*(?:ال)?شيخ|كلام\s*(?:ال)?شيخ)\s*(?:=|هو\s*هو|نفسه?)\s*(?:كلام\s*)?(?:ال)?(?:دين|ربنا|الله)/i,
  ]},
];

function runTier1Regex(text: string, domainFallacies: Fallacy[]): DetectedFallacy[] {
  const results: DetectedFallacy[] = [];
  const activeIds = new Set(domainFallacies.map(f => f.id));

  for (const fp of FALLACY_PATTERNS) {
    if (!activeIds.has(fp.id)) continue;
    const fallacy = domainFallacies.find(f => f.id === fp.id);
    if (!fallacy) continue;

    for (const pattern of fp.patterns) {
      const match = text.match(pattern);
      if (match) {
        // Confidence based on how specific the match is
        const matchLen = match[0].length;
        const confidence = Math.min(0.95, 0.6 + (matchLen / text.length) * 2);
        results.push({
          fallacy,
          confidence: Math.round(confidence * 100) / 100,
          matchedPattern: match[0].substring(0, 120),
          tier: 'regex',
        });
        break; // one match per fallacy is enough
      }
    }
  }
  return results;
}

// ═══════════════════════════════════════════════════════════════════
//  TIER 2 — TF-IDF SIMILARITY (fast, ~5ms)
// ═══════════════════════════════════════════════════════════════════

function runTier2TfIdf(text: string, domainFallacies: Fallacy[], alreadyFoundIds: Set<string>): DetectedFallacy[] {
  const results: DetectedFallacy[] = [];

  try {
    // Dynamic import to avoid issues if natural isn't available at compile time
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const natural = require('natural');
    const TfIdf = natural.TfIdf;
    const tfidf = new TfIdf();

    // Add input text as the first document (index 0)
    tfidf.addDocument(text.toLowerCase());

    // Add each fallacy's combined text as subsequent documents
    const fallacyDocs: Fallacy[] = [];
    for (const f of domainFallacies) {
      if (alreadyFoundIds.has(f.id)) continue;
      const docText = `${f.name} ${f.description} ${f.example}`.toLowerCase();
      tfidf.addDocument(docText);
      fallacyDocs.push(f);
    }

    // For each fallacy document, compute term overlap score with the input
    for (let i = 0; i < fallacyDocs.length; i++) {
      const fallacy = fallacyDocs[i];
      const docIndex = i + 1; // +1 because input text is at index 0

      // Get terms from the fallacy document and check how they score in the input
      let score = 0;
      let termCount = 0;
      const fallacyTerms = `${fallacy.name} ${fallacy.description} ${fallacy.example}`.toLowerCase().split(/\s+/);
      const uniqueTerms = [...new Set(fallacyTerms.filter(t => t.length > 3))];

      for (const term of uniqueTerms) {
        // tfidf.tfidf(term, documentIndex) returns the TF-IDF measure of term in doc
        const inputScore = tfidf.tfidf(term, 0) as number;
        const fallacyScore = tfidf.tfidf(term, docIndex) as number;
        if (inputScore > 0 && fallacyScore > 0) {
          score += Math.min(inputScore, fallacyScore);
          termCount++;
        }
      }

      // Normalize score
      const normalizedScore = termCount > 0 ? Math.min(1, score / (uniqueTerms.length * 0.8)) : 0;

      if (normalizedScore > 0.3 && termCount >= 2) {
        results.push({
          fallacy,
          confidence: Math.round(Math.min(0.85, normalizedScore) * 100) / 100,
          matchedPattern: `TF-IDF similarity: ${normalizedScore.toFixed(3)} (${termCount} matching terms)`,
          tier: 'tfidf',
        });
      }
    }
  } catch (err) {
    console.warn('[FallacyEngine] TF-IDF tier failed, skipping:', (err as Error).message);
  }

  return results;
}

// ═══════════════════════════════════════════════════════════════════
//  TIER 3 — GEMINI FALLBACK (only when T1+T2 empty & text > 80 chars)
// ═══════════════════════════════════════════════════════════════════

import { z } from 'zod';
import { rotatingGenerateObject } from '@/lib/debunking/gemini-rotator';

const GeminiFallacySchema = z.object({
  detected: z.array(z.object({
    fallacy_id: z.string().describe('The fallacy ID, e.g. F1, F19, IF3, IF12'),
    confidence: z.number().min(0).max(1).describe('Detection confidence 0-1'),
    explanation: z.string().describe('Brief explanation of why this fallacy was detected'),
  })).describe('Array of detected fallacies from the provided list'),
});

async function runTier3Gemini(text: string, domainFallacies: Fallacy[]): Promise<DetectedFallacy[]> {
  const results: DetectedFallacy[] = [];

  try {
    const fallacyList = domainFallacies.map(f => `${f.id}: ${f.name} — ${f.description}`).join('\n');

    const { object } = await rotatingGenerateObject({
      schema: GeminiFallacySchema,
      prompt: `Analyze this text for logical fallacies. Only identify fallacies from this specific list:

${fallacyList}

TEXT TO ANALYZE:
"${text}"

Identify ALL fallacies present in the text. Be precise — only flag a fallacy if there is clear evidence of it in the text. Return an empty array if no fallacies are present.`,
      system: 'You are a logical fallacy detection engine for the Egyptian Awareness Library. You detect both scientific and Islamic logical fallacies in English and Arabic (including Egyptian dialect). Be thorough but precise — avoid false positives.',
    });

    if (object?.detected && Array.isArray(object.detected)) {
      for (const d of object.detected) {
        const fallacy = domainFallacies.find(f => f.id === d.fallacy_id);
        if (fallacy) {
          results.push({
            fallacy,
            confidence: Math.round(Math.min(0.9, d.confidence) * 100) / 100,
            matchedPattern: d.explanation.substring(0, 150),
            tier: 'gemini',
          });
        }
      }
    }
  } catch (err) {
    console.warn('[FallacyEngine] Gemini tier failed, returning T1+T2 results only:', (err as Error).message);
  }

  return results;
}

// ═══════════════════════════════════════════════════════════════════
//  MAIN DETECTION — 3-TIER HYBRID PIPELINE
// ═══════════════════════════════════════════════════════════════════

export async function detectFallacies(text: string, domain: Domain = 'both'): Promise<DetectedFallacy[]> {
  if (!text || text.trim().length < 5) return [];

  // Filter fallacies by domain
  const domainFallacies = domain === 'both'
    ? ALL_FALLACIES
    : ALL_FALLACIES.filter(f => f.domain === domain || f.domain === 'both');

  // ── Tier 1: Regex (instant) ──
  const tier1 = runTier1Regex(text, domainFallacies);

  // ── Tier 2: TF-IDF (fast) ──
  const foundIds = new Set(tier1.map(r => r.fallacy.id));
  const tier2 = runTier2TfIdf(text, domainFallacies, foundIds);

  // Merge T1 + T2
  let merged = [...tier1, ...tier2];

  // ── Tier 3: Gemini (only if T1+T2 found nothing AND text is substantial) ──
  if (merged.length === 0 && text.length > 80) {
    const tier3 = await runTier3Gemini(text, domainFallacies);
    merged = [...merged, ...tier3];
  }

  // ── Deduplicate by fallacy ID, keeping highest confidence ──
  const deduped = new Map<string, DetectedFallacy>();
  for (const r of merged) {
    const existing = deduped.get(r.fallacy.id);
    if (!existing || r.confidence > existing.confidence) {
      deduped.set(r.fallacy.id, r);
    }
  }

  // Sort by confidence descending
  return [...deduped.values()].sort((a, b) => b.confidence - a.confidence);
}
