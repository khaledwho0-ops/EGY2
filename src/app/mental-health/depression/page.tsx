"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRTL } from "@/components/shared/rtl-provider";
import { PageNavigation } from '@/components/shared/page-navigation';
import { PageAIChatbot } from '@/components/shared/page-ai-chatbot';
import { buildSystemPrompt } from '@/lib/standard';
import { ScientificShield } from '@/components/shared/scientific-shield';

/* ══════════════════════════════════════════════════════
   DEPRESSION SUPPORT PROGRAM — CBT-Based 14-Day
   Sources: WHO Egypt 2023, CAPMAS, Aaron Beck CBT,
   Kroenke PHQ-9, Seligman Positive Psychology
   ══════════════════════════════════════════════════════ */

const MYTHS = [
  { myth: "Depression is just laziness", mythAr: "الاكتئاب مجرد كسل", truth: "Depression involves measurable changes in brain chemistry — reduced serotonin, norepinephrine, and dopamine. fMRI studies show decreased prefrontal cortex activity. It is classified as a medical disorder (ICD-11: 6A70) by the WHO.", truthAr: "الاكتئاب يتضمن تغييرات قابلة للقياس في كيمياء المخ — انخفاض السيروتونين والنورإبينفرين والدوبامين. هو اضطراب طبي مصنف (ICD-11: 6A70).", source: "WHO ICD-11; Malhi & Mann, Lancet 2018", fallacy: "False cause (#59) + Hasty generalization (#53)" },
  { myth: "Strong faith prevents depression", mythAr: "الإيمان القوي يمنع الاكتئاب", truth: "Prophet Yaqub (عليه السلام) experienced profound grief (Quran 12:84). Prophet Muhammad ﷺ experienced 'عام الحزن' (Year of Sorrow). Depression affects believers and non-believers — it is a medical condition, not a spiritual failure.", truthAr: "النبي يعقوب عليه السلام عانى من حزن شديد (يوسف:84). النبي محمد ﷺ عاش 'عام الحزن'. الاكتئاب حالة طبية وليس فشل روحي.", source: "Quran 12:84; Pargament Brief-RCOPE 2011", fallacy: "Appeal to tradition (#28) + False dilemma (#50)" },
  { myth: "Just think positive and it goes away", mythAr: "فكر إيجابي وهيروح", truth: "Toxic positivity invalidates real suffering. CBT (Aaron Beck, 1960s) teaches cognitive restructuring — not denial. Meta-analysis of 106 RCTs shows CBT effect size d=0.71 for depression (Cuijpers et al., 2019).", truthAr: "الإيجابية السامة تبطل المعاناة الحقيقية. العلاج المعرفي السلوكي يعلم إعادة الهيكلة المعرفية — وليس الإنكار.", source: "Cuijpers et al., World Psychiatry 2019; Beck 1967", fallacy: "Oversimplification + Survivorship bias (#62)" },
  { myth: "Medication changes your personality", mythAr: "الأدوية بتغير شخصيتك", truth: "SSRIs restore neurotransmitter balance — they don't create artificial emotions. Side effects exist but are manageable. WHO lists fluoxetine and amitriptyline as Essential Medicines. Egypt's CAPA approves 15+ antidepressants.", truthAr: "مثبطات استرداد السيروتونين تعيد التوازن الكيميائي — لا تخلق مشاعر مصطنعة. منظمة الصحة العالمية تدرج الفلوكسيتين كدواء أساسي.", source: "WHO Essential Medicines 2023; Egyptian CAPA", fallacy: "Appeal to fear (#32) + Anecdotal evidence (#78)" },
  { myth: "Children don't get depressed", mythAr: "الأطفال ما بيكتئبوش", truth: "WHO estimates 1.1% of 10-14 year-olds and 2.8% of 15-19 year-olds globally experience depression. In Egypt, child psychiatry services at Ain Shams and Cairo University treat hundreds of cases annually.", truthAr: "منظمة الصحة العالمية تقدر أن 1.1% من الأطفال 10-14 سنة و2.8% من المراهقين 15-19 سنة يعانون من الاكتئاب عالمياً.", source: "WHO Adolescent Health 2023; Ain Shams Psychiatry", fallacy: "Hasty generalization (#53) + Appeal to nature (#30)" },
  { myth: "Talking about suicide makes it more likely", mythAr: "الكلام عن الانتحار بيزوّد احتماله", truth: "The opposite is true. Systematic reviews find that asking directly about suicidal thoughts does NOT induce or increase them — it reduces distress and opens the door to help. Silence is the real danger.", truthAr: "العكس صحيح. المراجعات المنهجية تؤكد أن السؤال المباشر عن أفكار الانتحار لا يزيدها — بل يقلل الضيق ويفتح باب المساعدة. الصمت هو الخطر الحقيقي.", source: "Dazzi et al. (2014), Psychological Medicine; WHO LIVE LIFE 2021", fallacy: "Appeal to fear (#32)" },
  { myth: "Antidepressants are addictive like drugs", mythAr: "أدوية الاكتئاب بتسبب إدمان زي المخدرات", truth: "SSRIs are not addictive — there is no craving or dose-escalation. Discontinuation symptoms can occur if stopped abruptly, but that is not addiction. They should be tapered under medical supervision.", truthAr: "مثبطات السيروتونين لا تسبب إدماناً — لا اشتهاء ولا زيادة جرعة. قد تظهر أعراض انسحاب عند التوقف المفاجئ، لكن هذا ليس إدماناً. يجب تقليلها تدريجياً بإشراف طبي.", source: "WHO Essential Medicines; NICE NG222 (2022)", fallacy: "False equivalence (#51)" },
  { myth: "Just be strong and snap out of it", mythAr: "كن قوياً وطلّعها من دماغك", truth: "Depression is a neurobiological disorder, not a willpower failure. Telling someone to 'snap out of it' is like telling a diabetic to will their insulin. Evidence-based treatment (CBT, medication) — not willpower — produces recovery.", truthAr: "الاكتئاب اضطراب عصبي بيولوجي وليس فشلاً في الإرادة. العلاج المبني على الأدلة — لا الإرادة — هو ما يحقق التعافي.", source: "NICE NG222; Beck (1967) Cognitive Theory", fallacy: "Oversimplification + False cause (#59)" },
  { myth: "If your life is good, you can't be depressed", mythAr: "لو حياتك حلوة يبقى مستحيل تكون مكتئب", truth: "Depression is not only caused by circumstances — genetics, neurochemistry, and inflammation play major roles. People with loving families and success still develop it. 'High-functioning' depression hides behind a normal life.", truthAr: "الاكتئاب لا تسببه الظروف فقط — للجينات وكيمياء المخ والالتهاب أدوار كبرى. الاكتئاب 'عالي الأداء' يختبئ خلف حياة طبيعية.", source: "Malhi & Mann, Lancet 2018; WHO ICD-11 6A70", fallacy: "False cause (#59)" },
  { myth: "Depression is just sadness — everyone feels it", mythAr: "الاكتئاب مجرد حزن — كله بيحس بيه", truth: "Clinical depression is not ordinary sadness. It is a persistent disorder (≥2 weeks) affecting sleep, appetite, concentration, energy, and the will to live — measurable on the PHQ-9. Conflating the two delays real treatment.", truthAr: "الاكتئاب الإكلينيكي ليس حزناً عادياً. هو اضطراب مستمر (أسبوعان فأكثر) يؤثر على النوم والشهية والتركيز والطاقة والرغبة في الحياة — يُقاس بـ PHQ-9.", source: "APA DSM-5-TR; Kroenke PHQ-9 (2001)", fallacy: "Equivocation (#48) + Oversimplification" },
];

const DAYS = [
  { day: 1, title: "PHQ-9 Baseline Assessment", titleAr: "تقييم PHQ-9 الأساسي", type: "Assessment", desc: "Complete the full Patient Health Questionnaire-9 (Kroenke, Spitzer & Williams, 2001). This establishes your depression severity baseline: minimal (0-4), mild (5-9), moderate (10-14), moderately severe (15-19), severe (20-27).", descAr: "أكمل استبيان صحة المريض PHQ-9 الكامل. هذا يحدد خط الأساس لشدة الاكتئاب.", exercise: "Answer all 9 questions honestly about the last 2 weeks. Record your total score.", exerciseAr: "أجب على الـ 9 أسئلة بصدق عن آخر أسبوعين. سجل درجتك الإجمالية." },
  { day: 2, title: "Sleep Hygiene Protocol", titleAr: "بروتوكول نظافة النوم", type: "Behavioral", desc: "Insomnia and hypersomnia are PHQ-9 criteria. Implement stimulus control therapy (Bootzin, 1972): bed for sleep only, consistent wake time, no screens 1hr before bed, room temp 18-20°C.", descAr: "الأرق وفرط النوم من معايير PHQ-9. طبق علاج التحكم بالمحفزات: السرير للنوم فقط، وقت استيقاظ ثابت، بدون شاشات قبل النوم بساعة.", exercise: "Set a fixed wake time for the next 7 days. Remove phone from bedroom. Track sleep duration.", exerciseAr: "حدد وقت استيقاظ ثابت لمدة 7 أيام. أبعد الموبايل من غرفة النوم. تابع مدة النوم." },
  { day: 3, title: "Automatic Negative Thoughts (ANTs)", titleAr: "الأفكار السلبية التلقائية", type: "Cognitive", desc: "Aaron Beck's Cognitive Triad (1967): negative views of self, world, and future. Learn to identify 10 cognitive distortions: all-or-nothing thinking, overgeneralization, mental filter, disqualifying positives, jumping to conclusions, magnification, emotional reasoning, should statements, labeling, personalization.", descAr: "ثالوث بيك المعرفي (1967): نظرة سلبية للذات والعالم والمستقبل. تعلم تحديد 10 تشوهات معرفية.", exercise: "Keep a thought record today: Situation → Automatic Thought → Emotion → Evidence For → Evidence Against → Balanced Thought", exerciseAr: "احتفظ بسجل أفكار اليوم: الموقف ← الفكرة التلقائية ← العاطفة ← دليل مع ← دليل ضد ← فكرة متوازنة" },
  { day: 4, title: "Behavioral Activation", titleAr: "التنشيط السلوكي", type: "Behavioral", desc: "Martell's Behavioral Activation (2010): depression reduces activity → reduced reinforcement → more depression. Break the cycle by scheduling pleasurable and mastery activities. Evidence: d=0.74 effect size (Ekers et al., 2014).", descAr: "التنشيط السلوكي لمارتل (2010): الاكتئاب يقلل النشاط ← تعزيز أقل ← اكتئاب أكثر. اكسر الدورة بجدولة أنشطة ممتعة وإنجازية.", exercise: "List 5 activities that used to bring joy. Schedule one for today, even for 15 minutes. Rate mood before/after (1-10).", exerciseAr: "اكتب 5 أنشطة كانت تسعدك. جدول واحدة منها اليوم ولو 15 دقيقة. قيّم مزاجك قبل وبعد (1-10)." },
  { day: 5, title: "Exercise & Serotonin Science", titleAr: "الرياضة وعلم السيروتونين", type: "Physical", desc: "30 min moderate exercise increases serotonin synthesis by 25% and BDNF by 30% (Craft & Perna, 2004). Walking, swimming, or cycling — any rhythmic activity. Meta-analysis: exercise has d=0.62 effect size for depression (Schuch et al., 2016).", descAr: "30 دقيقة تمرين معتدل تزيد تخليق السيروتونين 25% وBDNF بنسبة 30%. المشي أو السباحة أو ركوب الدراجة.", exercise: "Walk for 30 minutes today. Track your route. Note energy level before (1-10) and after (1-10).", exerciseAr: "امشي 30 دقيقة اليوم. تابع مسارك. سجل مستوى الطاقة قبل (1-10) وبعد (1-10)." },
  { day: 6, title: "Social Connection Mapping", titleAr: "خريطة التواصل الاجتماعي", type: "Social", desc: "Social isolation is both symptom and maintainer of depression. Holt-Lunstad (2015) meta-analysis: social isolation increases mortality risk by 29%. Map your support network: professionals, family, friends, community.", descAr: "العزلة الاجتماعية هي عرض ومحافظ على الاكتئاب. العزلة تزيد خطر الوفاة 29% (هولت-لونستاد 2015).", exercise: "Draw your support map. Identify 3 people you trust. Send one message today to check in.", exerciseAr: "ارسم خريطة دعمك. حدد 3 أشخاص تثق بهم. ابعت رسالة لواحد منهم اليوم." },
  { day: 7, title: "Mindfulness Body Scan", titleAr: "فحص الجسم الواعي", type: "Mindfulness", desc: "MBSR (Kabat-Zinn, 1990): 8-week programs show d=0.59 for depression. Body scan meditation teaches non-judgmental awareness of physical sensations, breaking the rumination cycle.", descAr: "برنامج تقليل الإجهاد القائم على اليقظة (كابات-زين 1990): برامج 8 أسابيع تظهر d=0.59 للاكتئاب.", exercise: "10-minute guided body scan: start from toes, move up slowly. Notice sensations without judging. Breathe into tension.", exerciseAr: "فحص جسم موجه 10 دقائق: ابدأ من أصابع القدم واصعد ببطء. لاحظ الأحاسيس بدون حكم." },
  { day: 8, title: "Cognitive Restructuring", titleAr: "إعادة الهيكلة المعرفية", type: "Cognitive", desc: "Beck's Cognitive Restructuring: challenge distorted thoughts with Socratic questioning. 'What evidence supports this thought? What evidence contradicts it? What would I tell a friend thinking this?'", descAr: "إعادة الهيكلة المعرفية لبيك: تحدى الأفكار المشوهة بالأسئلة السقراطية. 'ما الدليل على هذه الفكرة؟ ما الدليل ضدها؟'", exercise: "Pick your strongest negative thought from Day 3. Apply the 3-column technique: thought → distortion type → rational alternative.", exerciseAr: "اختر أقوى فكرة سلبية من اليوم 3. طبق تقنية الأعمدة الثلاثة: الفكرة ← نوع التشوه ← البديل العقلاني." },
  { day: 9, title: "Gratitude Science", titleAr: "علم الامتنان", type: "Positive Psychology", desc: "Seligman's Three Good Things (2005): writing 3 positive events nightly for 1 week increases happiness and decreases depression for up to 6 months. Emmons & McCullough (2003) confirmed with RCTs.", descAr: "تمرين 'ثلاثة أشياء جيدة' لسيليجمان (2005): كتابة 3 أحداث إيجابية ليلاً لمدة أسبوع تزيد السعادة وتقلل الاكتئاب حتى 6 أشهر.", exercise: "Tonight, write 3 good things that happened today. For each, explain WHY it happened. Do this for 7 consecutive nights.", exerciseAr: "الليلة اكتب 3 أشياء جيدة حصلت اليوم. لكل واحدة اشرح ليه حصلت. كرر 7 ليالي متتالية." },
  { day: 10, title: "Nutrition & Mood Link", titleAr: "التغذية والمزاج", type: "Physical", desc: "Mediterranean diet reduces depression risk by 33% (Lassale et al., Molecular Psychiatry 2019). Gut-brain axis: 95% of serotonin produced in GI tract. Omega-3, folate, zinc, and vitamin D are evidence-based mood nutrients.", descAr: "النظام الغذائي المتوسطي يقلل خطر الاكتئاب 33%. 95% من السيروتونين يُنتج في الجهاز الهضمي.", exercise: "Track everything you eat today. Identify 3 mood-supporting foods (fish, leafy greens, nuts) and 3 mood-harming patterns (excess sugar, processed food, caffeine after 2pm).", exerciseAr: "تابع كل ما تأكله اليوم. حدد 3 أطعمة تدعم المزاج و3 أنماط تضر المزاج." },
  { day: 11, title: "Boundaries & Self-Care", titleAr: "الحدود والعناية بالذات", type: "Social", desc: "Setting boundaries is not selfishness — it is self-preservation. Cloud & Townsend (1992): healthy boundaries prevent emotional burnout. In Egyptian culture, saying 'لأ' (no) can feel culturally difficult but is medically necessary.", descAr: "وضع الحدود ليس أنانية — هو حماية للذات. في الثقافة المصرية قول 'لأ' ممكن يكون صعب لكنه ضروري طبياً.", exercise: "Identify one situation where you need to set a boundary. Write the exact words you would use. Practice saying them aloud.", exerciseAr: "حدد موقف واحد محتاج تحط فيه حدود. اكتب الكلمات بالظبط اللي هتستخدمها. تدرب تقولها بصوت عالي." },
  { day: 12, title: "WRAP Trigger Management", titleAr: "إدارة المحفزات WRAP", type: "Prevention", desc: "Wellness Recovery Action Plan (Copeland, 1997): identify triggers, early warning signs, and action plans. Create a personal crisis prevention protocol BEFORE a crisis happens.", descAr: "خطة عمل التعافي والعافية (كوبلاند 1997): حدد المحفزات وعلامات الإنذار المبكرة وخطط العمل.", exercise: "List your top 5 triggers. For each, write: what happens → early warning sign → action I will take → person I will contact.", exerciseAr: "اكتب أعلى 5 محفزات. لكل واحد اكتب: ما يحدث ← علامة إنذار مبكرة ← الإجراء ← الشخص اللي هتتواصل معاه." },
  { day: 13, title: "PHQ-9 Mid-Point Retake", titleAr: "إعادة PHQ-9 منتصف البرنامج", type: "Assessment", desc: "Retake the PHQ-9 to measure progress. Compare with Day 1 baseline. Clinically meaningful improvement is ≥5-point decrease (Kroenke, 2001). If score increased or remained severe, consult a professional.", descAr: "أعد اختبار PHQ-9 لقياس التقدم. قارن مع خط الأساس في اليوم 1. التحسن المعنوي سريرياً هو ≥5 نقاط انخفاض.", exercise: "Take PHQ-9 again. Calculate: Day 1 score - Day 13 score = improvement. If ≥5 points: clinically meaningful. If worsened: call 08008880700.", exerciseAr: "أعد PHQ-9. احسب: درجة اليوم 1 - درجة اليوم 13 = التحسن. لو ≥5 نقاط: تحسن معنوي. لو ساء: اتصل 08008880700." },
  { day: 14, title: "Sustainability & Relapse Prevention", titleAr: "الاستدامة ومنع الانتكاس", type: "Integration", desc: "Create a personalized maintenance plan combining all 13 days of techniques. Relapse prevention: identify high-risk situations, create if-then plans, schedule monthly check-ins. Remember: seeking help is strength.", descAr: "أنشئ خطة صيانة شخصية تجمع كل تقنيات الـ 13 يوم. منع الانتكاس: حدد المواقف عالية الخطورة وأنشئ خطط.", exercise: "Write your personal Depression Defense Plan: 3 daily habits + 3 weekly practices + 3 emergency contacts + 1 professional. Share with a trusted person.", exerciseAr: "اكتب خطة دفاع الاكتئاب الشخصية: 3 عادات يومية + 3 ممارسات أسبوعية + 3 جهات اتصال طوارئ + 1 متخصص." },
];

const PHQ9 = [
  { q: "Little interest or pleasure in doing things", qAr: "قلة الاهتمام أو المتعة في فعل الأشياء" },
  { q: "Feeling down, depressed, or hopeless", qAr: "الشعور بالإحباط أو الاكتئاب أو اليأس" },
  { q: "Trouble falling/staying asleep, or sleeping too much", qAr: "صعوبة في النوم أو الاستمرار فيه أو النوم كثيراً" },
  { q: "Feeling tired or having little energy", qAr: "الشعور بالتعب أو قلة الطاقة" },
  { q: "Poor appetite or overeating", qAr: "ضعف الشهية أو الأكل الزائد" },
  { q: "Feeling bad about yourself — or that you are a failure", qAr: "الشعور بالسوء تجاه نفسك — أو أنك فاشل" },
  { q: "Trouble concentrating on things", qAr: "صعوبة في التركيز على الأشياء" },
  { q: "Moving or speaking slowly, or being fidgety/restless", qAr: "الحركة أو الكلام ببطء، أو التململ" },
  { q: "Thoughts that you would be better off dead, or of hurting yourself", qAr: "أفكار بأنك أفضل ميتاً أو إيذاء نفسك" },
];

const OPTS = [
  { v: 0, l: "Not at all", lAr: "أبداً" },
  { v: 1, l: "Several days", lAr: "عدة أيام" },
  { v: 2, l: "More than half the days", lAr: "أكثر من نصف الأيام" },
  { v: 3, l: "Nearly every day", lAr: "تقريباً كل يوم" },
];

/* Verified Egyptian crisis resources (web-verified June 2026). NOTE: several commonly
   cited lines — incl. the old Befrienders Cairo numbers — are dead; these are the
   working ones. Availability can still vary, so we list several + emergency services. */
const CRISIS = [
  { label: "MoHP Mental Health & Addiction Hotline", labelAr: "خط الصحة النفسية والإدمان (وزارة الصحة)", tel: "08008880700", note: "Free", noteAr: "مجاني" },
  { label: "MoHP — routes you to the nearest facility", labelAr: "وزارة الصحة — يوجّهك لأقرب منشأة", tel: "0220816831", note: "More reliable", noteAr: "أكثر موثوقية" },
  { label: "Abbasseya Mental Health Hospital (direct)", labelAr: "مستشفى العباسية للصحة النفسية (مباشر)", tel: "01154898506", note: "", noteAr: "" },
  { label: "Emergency / Ambulance", labelAr: "الطوارئ / الإسعاف", tel: "123", note: "24/7", noteAr: "٢٤/٧" },
];

/* Real interactive CBT worksheet fields per day (idx 0–13). Saved to localStorage — genuine exercises, not a no-op button. */
const EXERCISE_FIELDS: { label: string; labelAr: string; long?: boolean }[][] = [
  [ { label: "My PHQ-9 total (0–27)", labelAr: "مجموع PHQ-9 (٠–٢٧)" }, { label: "Severity band", labelAr: "درجة الشدة" } ],
  [ { label: "Fixed wake time I'll keep", labelAr: "وقت استيقاظ ثابت سألتزم به" }, { label: "Phone removed from bedroom? (yes/no)", labelAr: "أبعدت الموبايل عن غرفة النوم؟" }, { label: "Sleep duration last night", labelAr: "مدة نومي الليلة الماضية" } ],
  [ { label: "Situation", labelAr: "الموقف", long: true }, { label: "Automatic thought", labelAr: "الفكرة التلقائية", long: true }, { label: "Emotion (intensity 0–100)", labelAr: "العاطفة (الشدة ٠–١٠٠)" }, { label: "Evidence FOR the thought", labelAr: "دليل يؤيد الفكرة", long: true }, { label: "Evidence AGAINST", labelAr: "دليل يعارض الفكرة", long: true }, { label: "Balanced thought", labelAr: "الفكرة المتوازنة", long: true } ],
  [ { label: "Activity I scheduled", labelAr: "النشاط الذي جدولته" }, { label: "Mood before (1–10)", labelAr: "المزاج قبل (١–١٠)" }, { label: "Mood after (1–10)", labelAr: "المزاج بعد (١–١٠)" } ],
  [ { label: "Activity + route", labelAr: "النشاط + المسار" }, { label: "Energy before (1–10)", labelAr: "الطاقة قبل (١–١٠)" }, { label: "Energy after (1–10)", labelAr: "الطاقة بعد (١–١٠)" } ],
  [ { label: "3 people I trust", labelAr: "٣ أشخاص أثق بهم", long: true }, { label: "Who I messaged today", labelAr: "من راسلت اليوم" } ],
  [ { label: "What I noticed in the 10-min body scan", labelAr: "ما لاحظته خلال فحص الجسم ١٠ دقائق", long: true }, { label: "Where I held tension", labelAr: "أين شعرت بالتوتر" } ],
  [ { label: "My strongest negative thought", labelAr: "أقوى فكرة سلبية لدي", long: true }, { label: "Distortion type", labelAr: "نوع التشوه المعرفي" }, { label: "Rational alternative", labelAr: "البديل العقلاني", long: true } ],
  [ { label: "Good thing 1 (and why it happened)", labelAr: "شيء جيد ١ (ولماذا حدث)", long: true }, { label: "Good thing 2 (and why)", labelAr: "شيء جيد ٢ (ولماذا)", long: true }, { label: "Good thing 3 (and why)", labelAr: "شيء جيد ٣ (ولماذا)", long: true } ],
  [ { label: "What I ate today", labelAr: "ما أكلته اليوم", long: true }, { label: "3 mood-supporting foods", labelAr: "٣ أطعمة تدعم المزاج" }, { label: "3 mood-harming patterns", labelAr: "٣ أنماط تضر المزاج" } ],
  [ { label: "Situation needing a boundary", labelAr: "موقف يحتاج لوضع حد", long: true }, { label: "Exact words I'll use", labelAr: "الكلمات التي سأستخدمها بالضبط", long: true } ],
  [ { label: "Top trigger", labelAr: "أهم محفز" }, { label: "Early warning sign", labelAr: "علامة إنذار مبكرة" }, { label: "Action I'll take", labelAr: "الإجراء الذي سأتخذه" }, { label: "Person I'll contact", labelAr: "الشخص الذي سأتواصل معه" } ],
  [ { label: "Day 13 PHQ-9 total", labelAr: "مجموع PHQ-9 اليوم ١٣" }, { label: "Change vs Day 1 (Day1 − Day13)", labelAr: "التغير مقابل اليوم ١" } ],
  [ { label: "3 daily habits", labelAr: "٣ عادات يومية", long: true }, { label: "3 weekly practices", labelAr: "٣ ممارسات أسبوعية", long: true }, { label: "3 emergency contacts", labelAr: "٣ جهات اتصال طوارئ" }, { label: "1 professional", labelAr: "متخصص واحد" } ],
];

export default function DepressionProgramPage() {
  const { isRTL: a, t } = useRTL();
  const ff = a ? "'Noto Kufi Arabic', sans-serif" : "inherit";
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<"program" | "myths" | "assessment">("program");
  const [activeDay, setActiveDay] = useState(0);
  const [exerciseStarted, setExerciseStarted] = useState<Record<number, boolean>>({});
  const [phqAnswers, setPhqAnswers] = useState<number[]>(new Array(9).fill(-1));
  const [phqDone, setPhqDone] = useState(false);
  const [expandedMyth, setExpandedMyth] = useState<number | null>(null);
  const [exerciseData, setExerciseData] = useState<Record<number, Record<number, string>>>({});

  useEffect(() => {
    setMounted(true);
    try {
      const raw = localStorage.getItem("eal-depression-exercises");
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed?.data) setExerciseData(parsed.data);
        if (parsed?.done) setExerciseStarted(parsed.done);
      }
    } catch { /* */ }
  }, []);
  if (!mounted) return null;

  const phqScore = phqAnswers.every(a => a >= 0) ? phqAnswers.reduce((s, v) => s + v, 0) : null;
  // PHQ-9 item 9 (thoughts of self-harm): ANY positive answer triggers the crisis protocol,
  // regardless of total score (Kroenke 2001 + standard suicide-risk practice).
  const item9 = phqAnswers[8];
  const crisisFlag = item9 >= 1;

  const updateField = (day: number, fi: number, val: string) =>
    setExerciseData((prev) => ({ ...prev, [day]: { ...(prev[day] || {}), [fi]: val } }));
  const dayFilled = (day: number) => Object.values(exerciseData[day] || {}).some((v) => v && v.trim());
  const saveExercise = (day: number) => {
    if (!dayFilled(day)) return;
    const nextDone = { ...exerciseStarted, [day]: true };
    setExerciseStarted(nextDone);
    try { localStorage.setItem("eal-depression-exercises", JSON.stringify({ data: exerciseData, done: nextDone })); } catch { /* */ }
  };
  const getSeverity = (s: number) => {
    if (s <= 4) return { label: "Minimal", labelAr: "طفيف", color: "#10B981", action: "Self-monitoring recommended", actionAr: "المراقبة الذاتية مستحسنة" };
    if (s <= 9) return { label: "Mild", labelAr: "خفيف", color: "#F59E0B", action: "Watchful waiting, consider counseling", actionAr: "مراقبة، فكر في الاستشارة" };
    if (s <= 14) return { label: "Moderate", labelAr: "متوسط", color: "#F97316", action: "Treatment plan recommended — CBT or medication", actionAr: "خطة علاج مستحسنة — علاج معرفي سلوكي أو أدوية" };
    if (s <= 19) return { label: "Moderately Severe", labelAr: "متوسط الشدة", color: "#EF4444", action: "Active treatment required — CBT + medication", actionAr: "علاج فعال مطلوب — علاج معرفي سلوكي + أدوية" };
    return { label: "Severe", labelAr: "شديد", color: "#DC2626", action: "Immediate professional help — call 08008880700", actionAr: "مساعدة متخصصة فورية — اتصل 08008880700" };
  };

  return (
    <div style={{ paddingTop: "var(--navbar-height)", minHeight: "100vh", direction: a ? "rtl" : "ltr" }}>
      <div className="container" style={{ padding: "var(--space-xl) var(--space-lg)", maxWidth: 1000 }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ width: 80, height: 80, borderRadius: "50%", background: "linear-gradient(135deg, color-mix(in srgb, var(--accent-cta) 15%, transparent), color-mix(in srgb, var(--accent-mentalhealth) 15%, transparent))", border: "2px solid color-mix(in srgb, var(--accent-cta) 30%, transparent)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", fontSize: 36 }}>🌧️</div>
          <h1 style={{ fontSize: 28, marginBottom: 8, fontFamily: ff }}>
            {t({ en: "Depression Support Program", ar: "برنامج دعم الاكتئاب", arEG: "برنامج دعم الاكتئاب" })}
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: 14, maxWidth: 600, margin: "0 auto", lineHeight: 1.7, fontFamily: ff }}>
            {t({ en: "14-day evidence-based CBT program. WHO estimates 4.4% of Egyptians experience depression (17 million affected). This is a medical condition — not weakness.", ar: "برنامج 14 يوم مبني على الأدلة. منظمة الصحة العالمية تقدر أن 4.4% من المصريين يعانون من الاكتئاب (17 مليون متأثر). هذه حالة طبية — وليست ضعف.", arEG: "برنامج 14 يوم مبني على الأدلة. منظمة الصحة العالمية بتقدر إن 4.4% من المصريين بيعانوا من الاكتئاب. دي حالة طبية — مش ضعف." })}
          </p>
        </div>

        {/* Crisis Banner */}
        <div style={{ padding: 16, borderRadius: 12, background: "color-mix(in srgb, var(--accent-red) 8%, transparent)", border: "1px solid color-mix(in srgb, var(--accent-red) 20%, transparent)", marginBottom: 24, display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
          <span style={{ fontSize: 20 }}>🆘</span>
          <span style={{ fontSize: 13, fontFamily: ff, color: "var(--text-secondary)" }}>
            {t({ en: "Crisis? Call Egyptian Mental Health Hotline:", ar: "أزمة؟ اتصل بخط الصحة النفسية:", arEG: "في أزمة؟ اتصل بخط الصحة النفسية:" })}
          </span>
          <a href="tel:08008880700" style={{ fontWeight: 900, color: "var(--accent-red)", fontSize: 18, fontFamily: "monospace" }}>📞 08008880700</a>
          <span style={{ fontSize: 11, color: "var(--text-muted)" }}>{t({ en: "(Free, 24/7)", ar: "(مجاني، 24/7)", arEG: "(مجاني، 24 ساعة)" })}</span>
        </div>

        {/* Quick-start explainer (EAL Standard §7) */}
        <div className="glass-card" style={{ padding: 18, marginBottom: 24, borderInlineStart: "4px solid var(--accent-cta)" }}>
          <strong style={{ fontSize: 13, color: "var(--accent-cta)", fontFamily: ff }}>
            {t({ en: "How to use this page", ar: "كيف تستخدم هذه الصفحة", arEG: "إزاي تستخدم الصفحة دي" })}
          </strong>
          <p style={{ fontSize: 13, lineHeight: 1.8, color: "var(--text-secondary)", margin: "8px 0 0", fontFamily: ff }}>
            {t({
              en: "1) Take the 2-minute PHQ-9 — a validated screening (not a diagnosis) scoring depression severity 0–27. 2) Work the 14-day CBT program one day at a time. 3) Read the myth-busting to separate medicine from stigma. Real scenario: \"I've felt down for 3 weeks — maybe I'm just weak.\" → The PHQ-9 measures it objectively; if moderate+ the page routes you to real help, and the myth-buster shows depression is a medical condition (ICD-11 6A70), not weakness or weak faith.",
              ar: "١) خذ اختبار PHQ-9 في دقيقتين — فحص معتمد (وليس تشخيصاً) يقيس شدة الاكتئاب من ٠ إلى ٢٧. ٢) اعمل برنامج الـ١٤ يوم خطوة بخطوة. ٣) اقرأ تفنيد الخرافات. سيناريو حقيقي: \"حاسس بإحباط من ٣ أسابيع — يمكن أنا ضعيف\" ← الاختبار يقيسها بموضوعية، ولو متوسطة فأعلى توجّهك الصفحة لمساعدة حقيقية، وتفنيد الخرافات يوضح أن الاكتئاب حالة طبية (ICD-11 6A70) وليس ضعفاً.",
              arEG: "١) خد اختبار PHQ-9 في دقيقتين — فحص معتمد (مش تشخيص) بيقيس شدة الاكتئاب من ٠ لـ٢٧. ٢) اعمل برنامج الـ١٤ يوم يوم بيوم. ٣) اقرا تفنيد الخرافات. سيناريو حقيقي: \"حاسس بإحباط من ٣ أسابيع — يمكن أنا ضعيف\" ← الاختبار بيقيسها بموضوعية، ولو متوسطة فأعلى الصفحة بتوجهك لمساعدة حقيقية، وتفنيد الخرافات بيوضح إن الاكتئاب حالة طبية مش ضعف.",
            })}
          </p>
        </div>

        {/* Scientific Shield — method + evidence (EAL Standard §13) */}
        <div style={{ marginBottom: 24 }}>
          <ScientificShield
            title="Method & Evidence · المنهج والأدلة"
            methodologyNote="PHQ-9 (Kroenke, Spitzer & Williams, 2001) — a validated 9-item depression screening scored 0–27. This is a screening tool, not a diagnosis. CBT effect size d=0.71 (Cuijpers, World Psychiatry 2019); exercise d=0.62 (Schuch 2016)."
            sources={[
              { title: 'PHQ-9 — Kroenke, Spitzer & Williams (2001), J Gen Intern Med', url: 'https://doi.org/10.1046/j.1525-1497.2001.016009606.x', tier: 'A' },
              { title: 'CBT for depression — Cuijpers et al. (2019), World Psychiatry', url: 'https://doi.org/10.1002/wps.20701', tier: 'A' },
              { title: 'WHO ICD-11 6A70 — Depressive disorders', url: 'https://icd.who.int/', tier: 'A' },
            ]}
          />
        </div>

        {/* Tab Navigation */}
        <div style={{ display: "flex", gap: 8, marginBottom: 24, justifyContent: "center" }}>
          {([["program", "📅 14-Day Program", "📅 برنامج 14 يوم"], ["myths", "🔬 Myth Busting", "🔬 تفنيد الخرافات"], ["assessment", "📋 PHQ-9 Assessment", "📋 تقييم PHQ-9"]] as const).map(([id, en, ar]) => (
            <button key={id} onClick={() => setActiveTab(id)} className="glass-card" style={{ padding: "10px 20px", fontSize: 13, cursor: "pointer", border: activeTab === id ? "2px solid var(--accent-cta)" : "1px solid var(--border-primary)", background: activeTab === id ? "color-mix(in srgb, var(--accent-cta) 8%, transparent)" : "var(--bg-secondary)", color: activeTab === id ? "var(--accent-cta)" : "var(--text-secondary)", fontWeight: activeTab === id ? 700 : 400, fontFamily: ff }}>
              {a ? ar : en}
            </button>
          ))}
        </div>

        {/* TAB: 14-Day Program */}
        {activeTab === "program" && (
          <div>
            {/* Day Selector Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 8, marginBottom: 24 }}>
              {DAYS.map((d, i) => (
                <button key={i} onClick={() => { setActiveDay(i); setExerciseStarted(prev => ({ ...prev })); }} className="glass-card" style={{ padding: "10px 4px", textAlign: "center", cursor: "pointer", border: activeDay === i ? "2px solid var(--accent-cta)" : "1px solid var(--border-primary)", background: exerciseStarted[i] ? "color-mix(in srgb, var(--accent-cta) 10%, transparent)" : activeDay === i ? "color-mix(in srgb, var(--accent-cta) 5%, transparent)" : "var(--bg-secondary)" }}>
                  <div style={{ fontSize: 16, fontWeight: 900, color: exerciseStarted[i] ? "var(--accent-emerald)" : activeDay === i ? "var(--accent-cta)" : "var(--text-muted)" }}>{exerciseStarted[i] ? "✓" : d.day}</div>
                  <div style={{ fontSize: 9, color: "var(--text-muted)", marginTop: 2, fontFamily: ff }}>{a ? d.titleAr.slice(0, 15) : d.title.slice(0, 12)}</div>
                </button>
              ))}
            </div>

            {/* Active Day Detail */}
            {(() => {
              const d = DAYS[activeDay];
              return (
                <div className="glass-card" style={{ padding: 24, borderLeft: "4px solid var(--accent-cta)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                    <div style={{ width: 48, height: 48, borderRadius: 12, background: "color-mix(in srgb, var(--accent-cta) 10%, transparent)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <span style={{ fontSize: 11, fontWeight: 700, color: "var(--accent-cta)", textTransform: "uppercase" }}>{d.type}</span>
                    </div>
                    <div>
                      <div style={{ fontSize: 12, color: "var(--accent-cta)", fontWeight: 600 }}>{t({ en: `Day ${d.day} of 14`, ar: `اليوم ${d.day} من 14`, arEG: `اليوم ${d.day} من 14` })}</div>
                      <div style={{ fontSize: 18, fontWeight: 700, fontFamily: ff }}>{a ? d.titleAr : d.title}</div>
                    </div>
                  </div>
                  <p style={{ fontSize: 14, lineHeight: 1.8, color: "var(--text-secondary)", marginBottom: 16, fontFamily: ff }}>{a ? d.descAr : d.desc}</p>

                  {/* Exercise Section — REAL interactive CBT worksheet, saved to your device */}
                  <div style={{ padding: 16, borderRadius: 12, background: "color-mix(in srgb, var(--accent-cta) 6%, transparent)", border: "1px solid color-mix(in srgb, var(--accent-cta) 18%, transparent)" }}>
                    <strong style={{ fontSize: 13, color: "var(--accent-cta)", fontFamily: ff }}>
                      {t({ en: "📝 Today's Exercise — fill it in:", ar: "📝 تمرين اليوم — املأه:", arEG: "📝 تمرين النهاردة — املاه:" })}
                    </strong>
                    <p style={{ fontSize: 13, lineHeight: 1.8, margin: "8px 0 14px", color: "var(--text-secondary)", fontFamily: ff }}>{a ? d.exerciseAr : d.exercise}</p>

                    {(EXERCISE_FIELDS[activeDay] || []).map((f, fi) => (
                      <div key={fi} style={{ marginBottom: 10 }}>
                        <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "var(--text-secondary)", marginBottom: 4, fontFamily: ff }}>{a ? f.labelAr : f.label}</label>
                        {f.long ? (
                          <textarea aria-label={a ? f.labelAr : f.label} value={exerciseData[activeDay]?.[fi] || ""} onChange={(e) => updateField(activeDay, fi, e.target.value)} rows={2}
                            style={{ width: "100%", padding: "8px 10px", borderRadius: 8, border: "1px solid var(--border-primary)", background: "var(--bg-card)", color: "var(--text-primary)", fontSize: 13, fontFamily: ff, resize: "vertical", boxSizing: "border-box" }} />
                        ) : (
                          <input type="text" aria-label={a ? f.labelAr : f.label} value={exerciseData[activeDay]?.[fi] || ""} onChange={(e) => updateField(activeDay, fi, e.target.value)}
                            style={{ width: "100%", padding: "8px 10px", borderRadius: 8, border: "1px solid var(--border-primary)", background: "var(--bg-card)", color: "var(--text-primary)", fontSize: 13, fontFamily: ff, boxSizing: "border-box" }} />
                        )}
                      </div>
                    ))}

                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 8, flexWrap: "wrap" }}>
                      <button
                        onClick={() => saveExercise(activeDay)}
                        disabled={!dayFilled(activeDay)}
                        style={{ padding: "10px 24px", borderRadius: 10, border: "none", cursor: dayFilled(activeDay) ? "pointer" : "default", opacity: dayFilled(activeDay) ? 1 : 0.5, background: "var(--accent-cta)", color: "#fff", fontSize: 14, fontWeight: 700, fontFamily: ff }}
                      >
                        {exerciseStarted[activeDay]
                          ? t({ en: "✓ Saved — update", ar: "✓ محفوظ — تحديث", arEG: "✓ اتحفظ — حدّث" })
                          : t({ en: "💾 Save & complete", ar: "💾 احفظ وأكمل", arEG: "💾 احفظ وكمّل" })}
                      </button>
                      {exerciseStarted[activeDay] && <span style={{ fontSize: 12, color: "var(--accent-emerald)", fontFamily: ff }}>{t({ en: "Saved on this device", ar: "محفوظ على جهازك", arEG: "محفوظ على جهازك" })}</span>}
                    </div>
                  </div>

                  {/* Day Navigation */}
                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: 16 }}>
                    <button onClick={() => setActiveDay(Math.max(0, activeDay - 1))} disabled={activeDay === 0} style={{ padding: "8px 16px", borderRadius: 8, border: "1px solid var(--border-primary)", background: "var(--bg-secondary)", color: "var(--text-secondary)", fontSize: 13, cursor: activeDay === 0 ? "default" : "pointer", opacity: activeDay === 0 ? 0.4 : 1, fontFamily: ff }}>
                      {t({ en: "← Previous Day", ar: "← اليوم السابق", arEG: "← اليوم اللي فات" })}
                    </button>
                    <button onClick={() => setActiveDay(Math.min(13, activeDay + 1))} disabled={activeDay === 13} style={{ padding: "8px 16px", borderRadius: 8, border: "none", background: "color-mix(in srgb, var(--accent-cta) 15%, transparent)", color: "var(--accent-cta)", fontSize: 13, cursor: activeDay === 13 ? "default" : "pointer", opacity: activeDay === 13 ? 0.4 : 1, fontWeight: 600, fontFamily: ff }}>
                      {t({ en: "Next Day →", ar: "اليوم التالي →", arEG: "اليوم الجاي →" })}
                    </button>
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* TAB: Myth Busting */}
        {activeTab === "myths" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <h2 style={{ fontSize: 18, marginBottom: 8, fontFamily: ff }}>{t({ en: "🔬 5 Egyptian Depression Myths — Scientifically Destroyed", ar: "🔬 5 خرافات مصرية عن الاكتئاب — مدمرة علمياً", arEG: "🔬 5 خرافات مصرية عن الاكتئاب — متفندة علمياً" })}</h2>
            {MYTHS.map((m, i) => (
              <div key={i} className="glass-card" style={{ padding: 0, overflow: "hidden", cursor: "pointer", borderLeft: "4px solid var(--accent-red)" }} onClick={() => setExpandedMyth(expandedMyth === i ? null : i)}>
                <div style={{ padding: "16px 20px", display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ fontSize: 20 }}>❌</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, fontSize: 15, fontFamily: ff, color: "var(--accent-red)" }}>{a ? m.mythAr : m.myth}</div>
                  </div>
                  <span style={{ fontSize: 16, transition: "transform 0.2s", transform: expandedMyth === i ? "rotate(180deg)" : "none", color: "var(--text-muted)" }}>▼</span>
                </div>
                {expandedMyth === i && (
                  <div style={{ padding: "0 20px 20px", borderTop: "1px solid var(--border-primary)" }}>
                    <div style={{ paddingTop: 16 }}>
                      <div style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 12 }}>
                        <span style={{ fontSize: 16 }}>✅</span>
                        <p style={{ fontSize: 14, lineHeight: 1.8, margin: 0, fontFamily: ff, color: "var(--text-secondary)" }}>{a ? m.truthAr : m.truth}</p>
                      </div>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, fontSize: 12 }}>
                        <div style={{ padding: 10, borderRadius: 8, background: "color-mix(in srgb, var(--accent-indigo) 6%, transparent)", border: "1px solid color-mix(in srgb, var(--accent-indigo) 15%, transparent)" }}>
                          <strong style={{ color: "var(--accent-indigo)" }}>📚 {t({ en: "Source:", ar: "المصدر:", arEG: "المصدر:" })}</strong>
                          <div style={{ color: "var(--text-muted)", marginTop: 4 }}>{m.source}</div>
                        </div>
                        <div style={{ padding: 10, borderRadius: 8, background: "color-mix(in srgb, var(--accent-amber) 6%, transparent)", border: "1px solid color-mix(in srgb, var(--accent-amber) 15%, transparent)" }}>
                          <strong style={{ color: "var(--accent-amber)" }}>🎯 {t({ en: "Fallacy Detected:", ar: "المغالطة:", arEG: "المغالطة:" })}</strong>
                          <div style={{ color: "var(--text-muted)", marginTop: 4 }}>{m.fallacy}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* TAB: PHQ-9 Assessment */}
        {activeTab === "assessment" && (
          <div className="glass-card" style={{ padding: 24 }}>
            <h2 style={{ fontSize: 18, marginBottom: 8, fontFamily: ff }}>{t({ en: "📋 PHQ-9 Depression Screening", ar: "📋 فحص الاكتئاب PHQ-9", arEG: "📋 فحص الاكتئاب PHQ-9" })}</h2>
            <p style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 20, fontFamily: ff }}>
              {t({ en: "Validated instrument: Kroenke, Spitzer & Williams (2001). JAMA Internal Medicine. This is a screening tool — not a diagnosis.", ar: "أداة معتمدة: كرونكي وسبيتزر ووليامز (2001). هذه أداة فحص — وليست تشخيص.", arEG: "أداة معتمدة: كرونكي وسبيتزر ووليامز (2001). دي أداة فحص — مش تشخيص." })}
            </p>
            <p style={{ fontSize: 13, marginBottom: 20, fontFamily: ff }}>
              {t({ en: "Over the last 2 weeks, how often have you been bothered by:", ar: "خلال آخر أسبوعين، كم مرة أزعجك:", arEG: "خلال آخر أسبوعين، كام مرة ضايقك:" })}
            </p>
            {PHQ9.map((q, qi) => (
              <div key={qi} style={{ marginBottom: 16, padding: 16, borderRadius: 10, background: phqAnswers[qi] >= 0 ? "color-mix(in srgb, var(--accent-cta) 4%, transparent)" : "var(--bg-secondary)", border: `1px solid ${phqAnswers[qi] >= 0 ? "color-mix(in srgb, var(--accent-cta) 15%, transparent)" : "var(--border-primary)"}` }}>
                <div style={{ fontSize: 14, marginBottom: 10, fontFamily: ff, color: qi === 8 ? "var(--accent-red)" : "var(--text-primary)" }}>
                  {qi + 1}. {a ? q.qAr : q.q}
                  {qi === 8 && <span style={{ fontSize: 11, marginInlineStart: 8, color: "var(--accent-red)" }}>⚠️</span>}
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 6 }}>
                  {OPTS.map(opt => (
                    <button key={opt.v} onClick={() => { const n = [...phqAnswers]; n[qi] = opt.v; setPhqAnswers(n); if (n.every(a => a >= 0)) setPhqDone(true); }} style={{ padding: "8px 4px", borderRadius: 8, border: `1px solid ${phqAnswers[qi] === opt.v ? "var(--accent-cta)" : "var(--border-primary)"}`, background: phqAnswers[qi] === opt.v ? "color-mix(in srgb, var(--accent-cta) 12%, transparent)" : "transparent", color: phqAnswers[qi] === opt.v ? "var(--accent-cta)" : "var(--text-muted)", fontSize: 11, cursor: "pointer", fontFamily: ff, transition: "all 0.2s" }}>
                      {a ? opt.lAr : opt.l}
                    </button>
                  ))}
                </div>
              </div>
            ))}
            {/* ⛑ Item-9 crisis safety gate — fires on ANY self-harm answer, regardless of total score */}
            {crisisFlag && (
              <div style={{ padding: 20, borderRadius: 16, background: "color-mix(in srgb, var(--accent-red) 10%, transparent)", border: "2px solid color-mix(in srgb, var(--accent-red) 45%, transparent)", marginTop: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                  <span style={{ fontSize: 24 }}>🆘</span>
                  <strong style={{ fontSize: 16, color: "var(--accent-red)", fontFamily: ff }}>
                    {t({ en: "You're not alone — please reach out today", ar: "لست وحدك — تواصل اليوم من فضلك", arEG: "إنت مش لوحدك — اتواصل النهاردة من فضلك" })}
                  </strong>
                </div>
                <p style={{ fontSize: 13, lineHeight: 1.8, color: "var(--text-secondary)", fontFamily: ff, margin: "0 0 14px" }}>
                  {t({ en: "You indicated thoughts that you'd be better off dead or of hurting yourself. This matters more than any score — please talk to a real person now. This tool is not a substitute for help.", ar: "أشرت إلى أفكار بأنك أفضل ميتاً أو إيذاء نفسك. هذا أهم من أي درجة — تحدّث مع شخص حقيقي الآن. هذه الأداة ليست بديلاً عن المساعدة.", arEG: "إنت أشرت لأفكار بإيذاء نفسك. ده أهم من أي درجة — اتكلم مع حد حقيقي دلوقتي. الأداة دي مش بديل عن المساعدة." })}
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {CRISIS.map((c) => (
                    <a key={c.tel} href={`tel:${c.tel}`} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, padding: "10px 14px", borderRadius: 10, background: "var(--bg-secondary)", border: "1px solid color-mix(in srgb, var(--accent-red) 25%, transparent)", textDecoration: "none", flexWrap: "wrap" }}>
                      <span style={{ fontSize: 12.5, color: "var(--text-secondary)", fontFamily: ff }}>{a ? c.labelAr : c.label}{c.note ? ` · ${a ? c.noteAr : c.note}` : ""}</span>
                      <span style={{ fontWeight: 900, color: "var(--accent-red)", fontFamily: "monospace", fontSize: 16 }}>📞 {c.tel}</span>
                    </a>
                  ))}
                </div>
              </div>
            )}
            {phqScore !== null && (() => {
              const s = getSeverity(phqScore);
              return (
                <div style={{ padding: 24, borderRadius: 16, background: `${s.color}10`, border: `2px solid ${s.color}30`, textAlign: "center", marginTop: 16 }}>
                  <div style={{ fontSize: 48, fontWeight: 900, color: s.color }}>{phqScore}/27</div>
                  <div style={{ fontSize: 20, fontWeight: 700, color: s.color, fontFamily: ff }}>{a ? s.labelAr : s.label}</div>
                  <p style={{ fontSize: 14, color: "var(--text-secondary)", marginTop: 8, fontFamily: ff }}>{a ? s.actionAr : s.action}</p>
                  {phqScore >= 10 && (
                    <a href="tel:08008880700" style={{ display: "inline-block", marginTop: 12, padding: "12px 24px", borderRadius: 10, background: "var(--accent-red)", color: "#fff", fontWeight: 700, fontSize: 14, textDecoration: "none" }}>
                      📞 {t({ en: "Call Helpline Now", ar: "اتصل بخط المساعدة الآن", arEG: "اتصل بخط المساعدة دلوقتي" })}
                    </a>
                  )}
                  <p style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 12, fontFamily: ff }}>
                    {t({ en: "Source: Kroenke K, Spitzer RL, Williams JB. The PHQ-9. J Gen Intern Med. 2001;16(9):606-13.", ar: "المصدر: كرونكي وسبيتزر ووليامز. PHQ-9. مجلة الطب الباطني العام 2001.", arEG: "المصدر: كرونكي وسبيتزر ووليامز. PHQ-9. مجلة الطب الباطني العام 2001." })}
                  </p>
                </div>
              );
            })()}
          </div>
        )}

        {/* Navigation */}
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 24 }}>
          <Link href="/mental-health" style={{ fontSize: 13, color: "var(--text-muted)", fontFamily: ff }}>← {t({ en: "Mental Health Hub", ar: "مركز الصحة النفسية", arEG: "مركز الصحة النفسية" })}</Link>
          <Link href="/drug-checker" style={{ fontSize: 13, color: "var(--accent-cta)", fontWeight: 600, fontFamily: ff }}>{t({ en: "Drug Checker →", ar: "فاحص الأدوية →", arEG: "فاحص الأدوية →" })}</Link>
        </div>
      </div>
      <PageAIChatbot
        pageTitle="Mental Health Literacy — الصحة النفسية"
        pageContext="Depression support: PHQ-9 screening, 14-day CBT program, myth-busting, Egyptian crisis resources."
        systemPrompt={buildSystemPrompt({
          role: 'You are a compassionate mental-health LITERACY guide for the Egyptian Awareness Library. You explain depression, CBT, and the PHQ-9 in plain Egyptian Arabic. You do NOT diagnose, prescribe, or replace a clinician.',
          roleAr: 'مرشد توعية بالصحة النفسية',
          sourcePreferences: ['WHO mhGAP', 'PHQ-9 (Kroenke 2001)', 'Cochrane', 'Beck CBT', 'Egyptian MoHP'],
          islamic: true,
          extraRules: [
            'NEVER diagnose or prescribe medication. You provide education and route to qualified help.',
            'On ANY sign of self-harm or crisis, lead with the Egyptian crisis numbers (MoHP 08008880700 / 0220816831, Abbasseya 01154898506, emergency 123) and urge contacting a real person now.',
            'Frame depression as a medical condition (ICD-11 6A70) — never weakness or weak faith. Cite effect sizes when relevant (CBT d=0.71, exercise d=0.62).',
          ],
        })}
        suggestedQuestions={[
          'إيه الفرق بين الحزن والاكتئاب؟',
          'What does my PHQ-9 score mean?',
          'هل الاكتئاب ضعف إيمان؟',
          'How does CBT actually work?',
        ]}
        accentColor="#10b981"
        accentColorRgb="16,185,129"
      />
      <PageNavigation currentPath="/mental-health/depression" />
    </div>
  );
}
