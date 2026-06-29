"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { PageNavigation } from '@/components/shared/page-navigation';
import { useRTL } from "@/components/shared/rtl-provider";

/* ─── Animated Counter ─── */
interface CounterProps {
  target: number;
  duration?: number;
  suffix?: string;
  decimals?: number;
}
function AnimatedCounter({ target, duration = 2000, suffix = "", decimals = 0 }: CounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = Date.now();
          const tick = () => {
            const elapsed = Date.now() - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 4);
            setCount(eased * target);
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);
  return (
    <span ref={ref}>
      {decimals > 0 ? count.toFixed(decimals) : Math.floor(count).toLocaleString()}
      {suffix}
    </span>
  );
}

/* ─── Data ─── */
const PROBLEM_DATA = [
  {
    stat: "87%",
    label: "من المصريين",
    desc: "يتعرضون لمعلومات صحية مضللة أسبوعياً",
    en: "of Egyptians encounter health misinformation weekly",
    source: "WHO Egypt 2022",
    color: "#ef4444",
    icon: "🦠",
  },
  {
    stat: "54%",
    label: "من المصريين",
    desc: "يشاركون محتوى غير موثق خلال 24 ساعة من استلامه",
    en: "share unverified content within 24hrs of receiving it",
    source: "Reuters Institute 2023",
    color: "#f97316",
    icon: "📲",
  },
  {
    stat: "40M+",
    label: "مستخدم واتساب",
    desc: "في مصر — الناقل الأول للمعلومات المضللة",
    en: "Egyptian WhatsApp users — the #1 misinformation vector",
    source: "Meta 2023",
    color: "#eab308",
    icon: "💬",
  },
  {
    stat: "3",
    label: "حوادث عنف",
    desc: "تسببت فيها المعلومات الطائفية المضللة (2019–2023)",
    en: "major incidents of violence caused by sectarian misinformation",
    source: "Cairo 24 Report",
    color: "#dc2626",
    icon: "⚠️",
  },
  {
    stat: "40%",
    label: "تردد على التطعيم",
    desc: "مرتبط بوسائل التواصل الاجتماعي",
    en: "vaccine hesitancy linked to social media misinformation",
    source: "Egyptian Ministry of Health",
    color: "#a855f7",
    icon: "💉",
  },
  {
    stat: "0",
    label: "منصة أخرى",
    desc: "تعالج هذا بتفويض علمي + إسلامي مزدوج",
    en: "other platforms address this with scientific + Islamic dual-mandate",
    source: "EAL Analysis",
    color: "#3b82f6",
    icon: "🚫",
  },
];

const ADVANTAGES = [
  {
    num: "01",
    icon: "🎓",
    color: "#3b82f6",
    glow: "rgba(59,130,246,0.15)",
    title: "Proven Pedagogical System",
    titleAr: "نظام تربوي مُثبت علمياً",
    subtitle: "ADDIE Framework",
    subtitleAr: "إطار ADDIE",
    points: [
      "144-day structured curriculum based on ADDIE (Analyze, Design, Develop, Implement, Evaluate)",
      "Phase-based cognitive immunity progression via Piaget's cognitive development stages",
      "Inoculation Theory (Compton 2013): Pre-emptive exposure reduces misinformation susceptibility by 23%",
      "Psychological inoculation reduces vaccine misinformation sharing by 52% (Roozenbeek et al. 2022)",
      "33 statistical fallacy exercises based on ASA guidelines + real retractions",
    ],
    pointsAr: [
      "منهج منظم على مدى 144 يوماً مبني على إطار ADDIE (تحليل، تصميم، تطوير، تنفيذ، تقييم)",
      "تدرّج في المناعة المعرفية على مراحل وفق مراحل النمو المعرفي عند بياجيه",
      "نظرية التلقيح (كومبتون 2013): التعرض المسبق بيقلل القابلية للتضليل بنسبة 23%",
      "التلقيح النفسي بيقلل مشاركة تضليل اللقاحات بنسبة 52% (روزنبيك وآخرون 2022)",
      "33 تمرين على المغالطات الإحصائية مبني على إرشادات ASA + حالات تراجع حقيقية",
    ],
    citation: "Maertens et al. 2023 — MIST-20 instrument (PMC10991074)",
  },
  {
    num: "02",
    icon: "🔬",
    color: "#10b981",
    glow: "rgba(16,185,129,0.15)",
    title: "Dual-Mandate: Scientific + Islamic",
    titleAr: "التفويض المزدوج: علمي + إسلامي",
    subtitle: "Unique in the World",
    subtitleAr: "فريد على مستوى العالم",
    points: [
      "All competitors are EITHER secular (Snopes, AFP) OR religious — we are BOTH",
      "1.9 billion Muslims trust scholars — our Islamic tools speak their language",
      "Maqasid al-Shariah alignment: protects عقل (intellect) — 3rd of the 5 objectives",
      "9 Islamic tools backed by classical Usul al-Fiqh + Dar al-Ifta Egypt positions",
      "Arabic-first bilingual with Egyptian dialect support (Cairo dialect NLP detection)",
    ],
    pointsAr: [
      "كل المنافسين يا إما علمانيين (سنوبس، AFP) يا إما دينيين — إحنا الاتنين مع بعض",
      "1.9 مليار مسلم بيثقوا في العلماء — أدواتنا الإسلامية بتتكلم بلغتهم",
      "توافق مع مقاصد الشريعة: بنحمي العقل — ثالث المقاصد الخمسة",
      "9 أدوات إسلامية مدعومة بأصول الفقه الكلاسيكية + فتاوى دار الإفتاء المصرية",
      "عربي أولاً وثنائي اللغة مع دعم اللهجة المصرية (كشف لهجة القاهرة بمعالجة اللغة)",
    ],
    citation: "Ibn Hajar al-Asqalani, Al-Nawawi — classical hadith authentication methodology",
  },
  {
    num: "03",
    icon: "🤖",
    color: "#f59e0b",
    glow: "rgba(245,158,11,0.15)",
    title: "NVIDIA NIM Primary",
    titleAr: "NVIDIA NIM أساسي",
    subtitle: "vs Basic GPT Wrappers",
    subtitleAr: "مقابل أغلفة GPT البسيطة",
    points: [
      "NVIDIA Nemotron-Ultra 550B: largest open-source reasoning model available",
      "5-model AI fallback cascade: NVIDIA → Gemini → DeepSeek → Groq → HuggingFace",
      "31 API routes powered by NVIDIA NIM (competitors use 1–2 models)",
      "Live Swarm Debate: 5 AI debater archetypes running simultaneously",
      "Real OSINT integration (DuckDuckGo, Wikipedia, CrossRef, OpenAlex)",
    ],
    pointsAr: [
      "NVIDIA Nemotron-Ultra 550B: أكبر نموذج استدلال مفتوح المصدر متاح",
      "سلسلة احتياطية من 5 نماذج ذكاء: NVIDIA ← Gemini ← DeepSeek ← Groq ← HuggingFace",
      "31 مسار API مدعوم بـ NVIDIA NIM (المنافسون بيستخدموا نموذج أو اتنين بس)",
      "مناظرة سرب حية: 5 نماذج ذكاء بتتناظر في نفس الوقت",
      "تكامل OSINT حقيقي (DuckDuckGo، ويكيبيديا، CrossRef، OpenAlex)",
    ],
    citation: "NVIDIA NIM microservices — enterprise AI inference platform",
  },
  {
    num: "04",
    icon: "🛡️",
    color: "#8b5cf6",
    glow: "rgba(139,92,246,0.15)",
    title: "Real-Time Defense Infrastructure",
    titleAr: "بنية تحتية دفاعية في الوقت الفعلي",
    subtitle: "78 API Routes",
    subtitleAr: "78 مسار API",
    points: [
      "Healthcare AI platform: ~5–10 endpoints | Mental health app: ~8–15 | EAL: 78",
      "8-Layer GOD-System deception detection (proprietary architecture)",
      "Patient Zero tracing: traces viral misinformation to its origin",
      "C2PA content credentials verification (Adobe + Microsoft standard)",
      "Real-time deepfake forensics with confidence scoring",
    ],
    pointsAr: [
      "منصة ذكاء صحي: ~5–10 نقاط نهاية | تطبيق صحة نفسية: ~8–15 | منصتنا: 78",
      "كشف خداع بنظام GOD من 8 طبقات (معمارية خاصة بنا)",
      "تتبع المريض صفر: بنتتبع التضليل الفيروسي لحد مصدره الأصلي",
      "التحقق من بيانات اعتماد المحتوى C2PA (معيار Adobe + Microsoft)",
      "تحليل جنائي للتزييف العميق في الوقت الفعلي مع تقييم درجة الثقة",
    ],
    citation: "C2PA Coalition for Content Provenance and Authenticity — Industry Standard",
  },
  {
    num: "05",
    icon: "🇪🇬",
    color: "#ef4444",
    glow: "rgba(239,68,68,0.15)",
    title: "National Security Impact",
    titleAr: "أثر الأمن القومي",
    subtitle: "Egypt-Scale Mission",
    subtitleAr: "مهمة على مستوى مصر",
    points: [
      "WHO: Health misinformation is a 'global infodemic' causing preventable deaths",
      "UN Resolution A/75/592: Calls for information literacy as a human right",
      "40% vaccine hesitancy linked to social media (Egyptian Ministry of Health)",
      "Only platform addressing this at national scale with proper methodology",
      "Serving 100M+ Egyptians with context-aware, dialectal Arabic content",
    ],
    pointsAr: [
      "منظمة الصحة العالمية: التضليل الصحي 'وباء معلوماتي عالمي' بيسبب وفيات ممكن منعها",
      "قرار الأمم المتحدة A/75/592: بيطالب بالثقافة المعلوماتية كحق من حقوق الإنسان",
      "40% تردد على اللقاحات مرتبط بوسائل التواصل (وزارة الصحة المصرية)",
      "المنصة الوحيدة اللي بتعالج ده على مستوى قومي بمنهجية سليمة",
      "بنخدم أكتر من 100 مليون مصري بمحتوى عربي باللهجة وواعي بالسياق",
    ],
    citation: "UN General Assembly Resolution A/75/592 — Information and Communications",
  },
];

const COMPARISON_ROWS = [
  { feature: "Dual-Mandate (Science + Islam)", featureAr: "تفويض مزدوج (علم + إسلام)", eal: true, snopes: false, claimbuster: false, healthApp: false, islamicApp: false },
  { feature: "144-Day ADDIE Curriculum", featureAr: "منهج ADDIE على 144 يوم", eal: true, snopes: false, claimbuster: false, healthApp: false, islamicApp: false },
  { feature: "NVIDIA NIM Primary", featureAr: "NVIDIA NIM كأساس", eal: true, snopes: false, claimbuster: false, healthApp: false, islamicApp: false },
  { feature: "Arabic / Egyptian Dialect", featureAr: "العربية / اللهجة المصرية", eal: true, snopes: false, claimbuster: false, healthApp: "partial", islamicApp: "partial" },
  { feature: "78 API Routes", featureAr: "78 مسار API", eal: true, snopes: false, claimbuster: false, healthApp: false, islamicApp: false },
  { feature: "OSINT Integration", featureAr: "تكامل OSINT", eal: true, snopes: "partial", claimbuster: false, healthApp: false, islamicApp: false },
  { feature: "Psychometric Instruments", featureAr: "أدوات قياس نفسي", eal: true, snopes: false, claimbuster: false, healthApp: false, islamicApp: false },
  { feature: "Inoculation Theory Applied", featureAr: "تطبيق نظرية التلقيح", eal: true, snopes: false, claimbuster: false, healthApp: false, islamicApp: false },
  { feature: "Swarm AI Debate", featureAr: "مناظرة سرب الذكاء", eal: true, snopes: false, claimbuster: false, healthApp: false, islamicApp: false },
  { feature: "Deepfake Forensics", featureAr: "تحليل جنائي للتزييف العميق", eal: true, snopes: false, claimbuster: false, healthApp: false, islamicApp: false },
];

const COLS = [
  { key: "eal", label: "EAL", labelAr: "م.و.م", highlight: true, color: "var(--accent-emerald)" },
  { key: "snopes", label: "Snopes", labelEn: "Snopes", labelArName: "سنوبس", highlight: false, color: "var(--text-muted)" },
  { key: "claimbuster", label: "ClaimBuster", labelArName: "كليم باستر", highlight: false, color: "var(--text-muted)" },
  { key: "healthApp", label: "Health App", labelArName: "تطبيق صحي", highlight: false, color: "var(--text-muted)" },
  { key: "islamicApp", label: "Islamic App", labelArName: "تطبيق إسلامي", highlight: false, color: "var(--text-muted)" },
];

function Cell({ val, isRTL }: { val: boolean | string; isRTL: boolean }) {
  if (val === true) return (
    <span style={{ color: "var(--accent-emerald)", fontSize: 20, fontWeight: 900 }}>✓</span>
  );
  if (val === "partial") return (
    <span style={{ color: "var(--accent-amber)", fontSize: 12, fontWeight: 700, background: "rgba(245,158,11,0.1)", padding: "2px 8px", borderRadius: 6 }}>{isRTL ? "جزئي" : "Partial"}</span>
  );
  return <span style={{ color: "var(--text-muted)", opacity: 0.4, fontSize: 20 }}>—</span>;
}

/* ─── Page ─── */
export default function WhyUsPage() {
  const { isRTL } = useRTL();
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const [activeAdvantage, setActiveAdvantage] = useState(0);

  // Auto-cycle advantages
  useEffect(() => {
    const iv = setInterval(() => setActiveAdvantage((p) => (p + 1) % ADVANTAGES.length), 5000);
    return () => clearInterval(iv);
  }, []);

  const PHILOSOPHY = [
    {
      icon: "🧠",
      color: "#3b82f6",
      title: "Inoculation Theory",
      titleAr: "نظرية التلقيح",
      body: "Pre-emptive exposure to weakened forms of misinformation builds cognitive antibodies. Like vaccines for the mind. Compton (2013), Roozenbeek et al. (2022).",
      bodyAr: "التعرض المسبق لأشكال ضعيفة من المعلومات المضللة يبني مناعة معرفية — كاللقاحات للعقل",
    },
    {
      icon: "🎯",
      color: "#10b981",
      title: "Cognitive Immunity",
      titleAr: "المناعة المعرفية",
      body: "Target: Not individual claims — the cognitive patterns that make you susceptible to ALL misinformation. Inspired by Bloom's Taxonomy & CBT frameworks.",
      bodyAr: "هدفنا ليس الادعاءات الفردية — بل الأنماط المعرفية التي تجعلك عرضة لكل المعلومات المضللة",
    },
    {
      icon: "🕌",
      color: "#f59e0b",
      title: "Islamic Epistemology",
      titleAr: "المعرفة الإسلامية",
      body: "Maqasid al-Shariah places عقل (intellect) as the 3rd of 5 protected objectives. Protecting the mind is a religious duty — not just a civic one.",
      bodyAr: "المقاصد الشرعية تضع العقل ثالث المقاصد الخمس — حماية العقل واجب ديني وليس مدنياً فقط",
    },
    {
      icon: "📊",
      color: "#8b5cf6",
      title: "Psychometric Rigor",
      titleAr: "الصرامة النفسية القياسية",
      body: "MIST-20 instrument for misinformation susceptibility. Pre/post testing with validated scales. Paired t-tests. Falsifiable hypotheses. Real science.",
      bodyAr: "أدوات قياسية محققة — اختبار MIST-20 مع تحليل إحصائي حقيقي قبل وبعد التدخل",
    },
    {
      icon: "🌍",
      color: "#ef4444",
      title: "Arabic-First Design",
      titleAr: "تصميم عربي أولاً",
      body: "Cairo Egyptian dialect detection. RTL-native UX. Egyptian social context. Not translated from English — built for Arabic speakers from day zero.",
      bodyAr: "كشف اللهجة المصرية القاهرية — تجربة مستخدم عربية أصيلة — بُنيت للعرب من اليوم الأول",
    },
    {
      icon: "🔭",
      color: "#06b6d4",
      title: "Vision 2030",
      titleAr: "رؤية 2030",
      body: "بناء مناعة معرفية — Building Cognitive Immunity for 100M Egyptians. Scaling Arabic media literacy across the Arab world by 2030.",
      bodyAr: "بناء مناعة معرفية لـ 100 مليون مصري — نشر ثقافة وسائل الإعلام العربية عبر العالم العربي بحلول 2030",
    },
  ];

  const STATS = [
    { val: 78, suffix: "", label: "API Routes", labelAr: "مسار API", color: "#3b82f6" },
    { val: 31, suffix: "", label: "NVIDIA NIM Routes", labelAr: "مسارات NVIDIA NIM", color: "#f59e0b" },
    { val: 91, suffix: "", label: "Data Exercise Files", labelAr: "ملفات تمارين البيانات", color: "#10b981" },
    { val: 119, suffix: "", label: "Platform Pages", labelAr: "صفحات المنصة", color: "#8b5cf6" },
    { val: 33, suffix: "", label: "Science Exercises", labelAr: "تمارين علمية", color: "#06b6d4" },
    { val: 9, suffix: "", label: "Islamic Tools", labelAr: "أدوات إسلامية", color: "#34d399" },
    { val: 144, suffix: "", label: "Day Curriculum", labelAr: "منهج بالأيام", color: "#f97316" },
    { val: 5, suffix: "", label: "AI Model Cascade", labelAr: "سلسلة نماذج الذكاء", color: "#ec4899" },
    { val: 8, suffix: "", label: "GOD-System Layers", labelAr: "طبقات نظام GOD", color: "#ef4444" },
    { val: 5, suffix: "", label: "Immunity Phases", labelAr: "مراحل المناعة", color: "#a78bfa" },
  ];

  const pageStyle: React.CSSProperties = {
    minHeight: "100vh",
    background: "var(--bg-page)",
    color: "var(--text-primary)",
    fontFamily: "'Inter', sans-serif",
    overflowX: "hidden",
  };

  return (
    <div style={pageStyle} dir={isRTL ? "rtl" : "ltr"}>
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;
500;600;700;800;900&family=Cairo:wght@400;600;700;900&display=swap');
        .cairo { font-family: 'Cairo', sans-serif; }
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes floatUp {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.9; }
        }
        @keyframes countUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .adv-card { transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1); }
        .adv-card:hover { transform: translateY(-4px); }
        .cite { font-size: 11px; color: var(--text-muted); font-style: italic; border-left: 2px solid var(--border-primary); padding-left: 8px; margin-top: 12px; }
        sup { font-size: 10px; color: var(--text-muted); vertical-align: super; }
      `}</style>

      {/* Animated Background */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", overflow: "hidden", zIndex: 0 }}>
        <div style={{ position: "absolute", top: "-10%", left: "-5%", width: 700, height: 700, background: "radial-gradient(circle, rgba(59,130,246,0.07) 0%, transparent 70%)", borderRadius: "50%", animation: "floatUp 8s ease-in-out infinite" }} />
        <div style={{ position: "absolute", top: "40%", right: "-10%", width: 600, height: 600, background: "radial-gradient(circle, rgba(16,185,129,0.06) 0%, transparent 70%)", borderRadius: "50%", animation: "floatUp 10s ease-in-out infinite 2s" }} />
        <div style={{ position: "absolute", bottom: "-5%", left: "30%", width: 500, height: 500, background: "radial-gradient(circle, rgba(245,158,11,0.05) 0%, transparent 70%)", borderRadius: "50%", animation: "floatUp 12s ease-in-out infinite 4s" }} />
      </div>

      <div style={{ position: "relative", zIndex: 1, maxWidth: 1280, margin: "0 auto", padding: "0 24px 80px" }}>

        {/* ═══ HERO ═══ */}
        <section style={{ padding: "100px 0 80px", textAlign: "center" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 10,
            padding: "8px 20px", borderRadius: 100,
            background: "rgba(59,130,246,0.08)",
            border: "1px solid rgba(59,130,246,0.25)",
            marginBottom: 32,
          }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--accent-blue)", display: "inline-block", animation: "pulse-glow 2s infinite" }} />
            <span style={{ fontSize: 13, fontWeight: 700, color: "var(--accent-blue)", letterSpacing: "0.05em" }}>
              {isRTL ? "مدعوم بالعلم" : "Backed by Science"}
            </span>
          </div>

          <h1 style={{ fontSize: "clamp(36px, 5.5vw, 72px)", fontWeight: 900, lineHeight: 1.05, marginBottom: 20 }}>
            {isRTL ? (
              <>
                <span className="cairo" style={{
                  background: "linear-gradient(135deg, var(--text-primary) 0%, #93c5fd 40%, #34d399 70%, #fbbf24 100%)",
                  backgroundSize: "300% 300%",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  animation: "gradientShift 6s ease infinite",
                }}>
                  ليه مكتبة الوعي المصري
                </span>
                <br />
                <span className="cairo" style={{ color: "var(--text-primary)" }}>هي </span>
                <span style={{
                  background: "linear-gradient(90deg, #34d399, #22d3ee)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}>الأولى</span>
              </>
            ) : (
              <>
                <span style={{
                  background: "linear-gradient(135deg, var(--text-primary) 0%, #93c5fd 40%, #34d399 70%, #fbbf24 100%)",
                  backgroundSize: "300% 300%",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  animation: "gradientShift 6s ease infinite",
                }}>
                  Why Egyptian Awareness Library
                </span>
                <br />
                <span style={{ color: "var(--text-primary)" }}>is </span>
                <span style={{
                  background: "linear-gradient(90deg, #34d399, #22d3ee)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}>#1</span>
              </>
            )}
          </h1>

          <p className="cairo" dir="rtl" style={{ fontSize: "clamp(20px, 3vw, 32px)", color: "var(--text-secondary)", marginBottom: 48, fontWeight: 700 }}>
            لماذا منصة الوعي المصري هي الأقوى
          </p>

          <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
            <Link href="/curriculum/phase0" style={{
              padding: "14px 32px", borderRadius: 14,
              background: "linear-gradient(135deg, var(--accent-blue), #1d4ed8)",
              color: "#fff", fontWeight: 800, fontSize: 15, textDecoration: "none",
              boxShadow: "0 0 30px rgba(59,130,246,0.35)",
              display: "inline-flex", alignItems: "center", gap: 8,
            }}>
              🚀 {isRTL ? "ابدأ رحلتك" : "Start Your Journey"}
            </Link>
            <Link href="/competition-demo" style={{
              padding: "14px 32px", borderRadius: 14,
              background: "var(--bg-elevated)", border: "1px solid var(--border-primary)",
              color: "var(--text-primary)", fontWeight: 700, fontSize: 15, textDecoration: "none",
            }}>
              🎬 {isRTL ? "شوف عرض حي" : "See Live Demo"}
            </Link>
          </div>
        </section>

        {/* ═══ THE PROBLEM ═══ */}
        <section style={{ marginBottom: 100 }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{
              display: "inline-block", padding: "6px 18px", borderRadius: 100,
              background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)",
              color: "var(--accent-red)", fontSize: 12, fontWeight: 700, letterSpacing: "0.1em",
              marginBottom: 16,
            }}>{isRTL ? "بيانات الأزمة" : "CRISIS DATA"}</div>
            <h2 className="cairo" dir="rtl" style={{ fontSize: "clamp(24px, 3.5vw, 44px)", fontWeight: 900, color: "var(--text-primary)", marginBottom: 12 }}>
              مصر تواجه حرباً معلوماتية
            </h2>
            <p style={{ color: "var(--text-muted)", fontSize: 17 }}>
              {isRTL ? "مصر بتواجه حرب معلومات — والأرقام ما تتنكرش" : "Egypt Faces an Information War — The Data Is Undeniable"}
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
            {PROBLEM_DATA.map((item, i) => (
              <div key={i} className="adv-card" style={{
                background: "var(--bg-card)",
                border: `1px solid ${item.color}25`,
                borderRadius: 20, padding: 28,
                backdropFilter: "blur(10px)",
                boxShadow: `0 0 40px ${item.color}08`,
              }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>{item.icon}</div>
                <div style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 900, color: item.color, lineHeight: 1, marginBottom: 8 }}>
                  {item.stat}
                </div>
                <div className="cairo" dir="rtl" style={{ fontSize: 14, fontWeight: 700, color: "var(--text-primary)", marginBottom: 6 }}>
                  {item.label} — {item.desc}
                </div>
                <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 12 }}>{item.en}</div>
                <div style={{ fontSize: 10, color: "var(--text-muted)", padding: "4px 10px", background: "var(--bg-elevated)", borderRadius: 6, display: "inline-block" }}>
                  📚 {item.source}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ═══ OUR ADVANTAGES ═══ */}
        <section style={{ marginBottom: 100 }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "var(--accent-blue)", letterSpacing: "0.12em", marginBottom: 14 }}>{isRTL ? "مزايا مبنية على الأدلة" : "EVIDENCE-BASED ADVANTAGES"}</div>
            <h2 style={{ fontSize: "clamp(26px, 4vw, 48px)", fontWeight: 900, color: "var(--text-primary)", marginBottom: 12 }}>
              {isRTL ? (
                <span className="cairo">ليه بنكسب — <span style={{ color: "var(--accent-emerald)" }}>بالمصادر</span></span>
              ) : (
                <>Why We Win — <span style={{ color: "var(--accent-emerald)" }}>With Citations</span></>
              )}
            </h2>
          </div>

          {/* Tabs */}
          <div style={{ display: "flex", gap: 8, marginBottom: 32, flexWrap: "wrap", justifyContent: "center" }}>
            {ADVANTAGES.map((adv, i) => (
              <button key={i} onClick={() => setActiveAdvantage(i)} style={{
                padding: "8px 18px", borderRadius: 10,
                background: activeAdvantage === i ? adv.color : "var(--bg-elevated)",
                border: `1px solid ${activeAdvantage === i ? adv.color : "var(--border-primary)"}`,
                color: activeAdvantage === i ? "#fff" : "var(--text-secondary)",
                fontSize: 13, fontWeight: 700, cursor: "pointer",
                transition: "all 0.3s",
              }}>
                {adv.icon} {adv.num}
              </button>
            ))}
          </div>

          {/* Active Advantage Card */}
          {ADVANTAGES.map((adv, i) => (
            <div key={i} style={{
              display: i === activeAdvantage ? "block" : "none",
              background: `linear-gradient(135deg, var(--bg-card) 0%, ${adv.glow} 100%)`,
              border: `1px solid ${adv.color}30`,
              borderRadius: 24, padding: "40px 48px",
              boxShadow: `0 0 60px ${adv.glow}`,
            }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 32, flexWrap: "wrap" }}>
                <div style={{ flex: "0 0 auto" }}>
                  <div style={{ fontSize: 56 }}>{adv.icon}</div>
                  <div style={{ fontSize: 64, fontWeight: 900, color: adv.color, opacity: 0.15, lineHeight: 1, marginTop: -10 }}>{adv.num}</div>
                </div>
                <div style={{ flex: 1, minWidth: 240 }}>
                  <div className={isRTL ? "cairo" : ""} style={{ fontSize: 12, fontWeight: 700, color: adv.color, letterSpacing: "0.1em", marginBottom: 8 }}>{isRTL ? adv.subtitleAr : adv.subtitle}</div>
                  <h3 className={isRTL ? "cairo" : ""} style={{ fontSize: "clamp(20px, 3vw, 32px)", fontWeight: 900, color: "var(--text-primary)", marginBottom: 6 }}>{isRTL ? adv.titleAr : adv.title}</h3>
                  {!isRTL && <p className="cairo" dir="rtl" style={{ fontSize: 18, color: adv.color, marginBottom: 24, fontWeight: 700 }}>{adv.titleAr}</p>}
                  <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10, marginTop: isRTL ? 24 : 0 }}>
                    {(isRTL ? adv.pointsAr : adv.points).map((pt, j) => (
                      <li key={j} className={isRTL ? "cairo" : ""} style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.6 }}>
                        <span style={{ color: adv.color, fontWeight: 900, marginTop: 2, flexShrink: 0 }}>{isRTL ? "◂" : "▸"}</span>
                        {pt}
                      </li>
                    ))}
                  </ul>
                  <p className="cite">📚 {adv.citation}</p>
                </div>
              </div>
            </div>
          ))}

          {/* All 5 cards in a grid below */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16, marginTop: 24 }}>
            {ADVANTAGES.map((adv, i) => (
              <div key={i} className="adv-card" onClick={() => setActiveAdvantage(i)} style={{
                background: i === activeAdvantage ? `linear-gradient(135deg, var(--bg-elevated) 0%, ${adv.glow} 100%)` : "var(--bg-card)",
                border: `1px solid ${i === activeAdvantage ? adv.color + "50" : "var(--border-primary)"}`,
                borderRadius: 16, padding: "20px 22px", cursor: "pointer",
                boxShadow: i === activeAdvantage ? `0 0 30px ${adv.glow}` : "none",
              }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>{adv.icon}</div>
                <div className={isRTL ? "cairo" : ""} style={{ fontSize: 13, fontWeight: 800, color: i === activeAdvantage ? adv.color : "var(--text-primary)", marginBottom: 4 }}>{adv.num}. {isRTL ? adv.titleAr : adv.title}</div>
                <div className="cairo" style={{ fontSize: 11, color: "var(--text-muted)" }}>{adv.titleAr}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ═══ COMPARISON TABLE ═══ */}
        <section style={{ marginBottom: 100 }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "var(--accent-emerald)", letterSpacing: "0.12em", marginBottom: 14 }}>{isRTL ? "خريطة المنافسة" : "COMPETITIVE LANDSCAPE"}</div>
            <h2 style={{ fontSize: "clamp(26px, 4vw, 48px)", fontWeight: 900, color: "var(--text-primary)" }}>
              {isRTL ? (
                <span className="cairo">جدول المقارنة — <span style={{ color: "var(--accent-emerald)" }}>بنكسب كل صف</span></span>
              ) : (
                <>The Comparison Table — <span style={{ color: "var(--accent-emerald)" }}>We Win Every Row</span></>
              )}
            </h2>
          </div>

          <div style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border-primary)",
            borderRadius: 24, overflow: "hidden",
            boxShadow: "0 0 80px rgba(16,185,129,0.05)",
          }}>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 600 }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid var(--border-primary)" }}>
                    <th style={{ textAlign: isRTL ? "right" : "left", padding: "18px 24px", fontSize: 12, fontWeight: 700, color: "var(--text-muted)", letterSpacing: "0.1em" }}>{isRTL ? "الميزة" : "FEATURE"}</th>
                    {COLS.map((col) => (
                      <th key={col.key} style={{
                        padding: "18px 16px", textAlign: "center",
                        fontSize: col.highlight ? 14 : 12,
                        fontWeight: 900,
                        color: col.highlight ? "var(--accent-emerald)" : "var(--text-muted)",
                        background: col.highlight ? "rgba(16,185,129,0.06)" : "transparent",
                        minWidth: 90,
                      }}>
                        {col.highlight && <div style={{ fontSize: 20, marginBottom: 4 }}>🏆</div>}
                        {isRTL && col.labelArName ? col.labelArName : col.label}
                        {col.labelAr && <div className="cairo" style={{ fontSize: 10, color: "var(--accent-emerald)", fontWeight: 700 }}>{col.labelAr}</div>}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON_ROWS.map((row, i) => (
                    <tr key={i}
                      onMouseEnter={() => setHoveredRow(i)}
                      onMouseLeave={() => setHoveredRow(null)}
                      style={{
                        borderBottom: "1px solid var(--border-subtle)",
                        background: hoveredRow === i ? "var(--bg-elevated)" : "transparent",
                        transition: "background 0.2s",
                      }}>
                      <td className={isRTL ? "cairo" : ""} style={{ padding: "14px 24px", fontSize: 13, color: "var(--text-secondary)", fontWeight: 500, textAlign: isRTL ? "right" : "left" }}>{isRTL ? row.featureAr : row.feature}</td>
                      {COLS.map((col) => (
                        <td key={col.key} style={{
                          padding: "14px 16px", textAlign: "center",
                          background: col.highlight ? "rgba(16,185,129,0.04)" : "transparent",
                        }}>
                          <Cell val={(row as Record<string, boolean | string>)[col.key]} isRTL={isRTL} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Score summary */}
          <div style={{ display: "flex", gap: 16, marginTop: 24, flexWrap: "wrap" }}>
            {COLS.map((col) => {
              const score = COMPARISON_ROWS.filter((r) => (r as Record<string, boolean | string>)[col.key] === true).length;
              const pct = Math.round((score / COMPARISON_ROWS.length) * 100);
              return (
                <div key={col.key} style={{
                  flex: 1, minWidth: 120,
                  background: col.highlight ? "rgba(16,185,129,0.08)" : "var(--bg-card)",
                  border: `1px solid ${col.highlight ? "rgba(16,185,129,0.25)" : "var(--border-primary)"}`,
                  borderRadius: 14, padding: "16px 20px", textAlign: "center",
                }}>
                  <div style={{ fontSize: 28, fontWeight: 900, color: col.highlight ? "var(--accent-emerald)" : "var(--text-muted)", marginBottom: 4 }}>
                    {score}/{COMPARISON_ROWS.length}
                  </div>
                  <div className={isRTL && col.labelArName ? "cairo" : ""} style={{ fontSize: 11, color: "var(--text-muted)", marginBottom: 8 }}>{isRTL && col.labelArName ? col.labelArName : col.label}</div>
                  <div style={{ height: 4, background: "var(--border-subtle)", borderRadius: 2, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${pct}%`, background: col.highlight ? "var(--accent-emerald)" : "var(--text-muted)", borderRadius: 2 }} />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ═══ PHILOSOPHY ═══ */}
        <section style={{ marginBottom: 100 }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <h2 className="cairo" dir="rtl" style={{ fontSize: "clamp(28px, 4vw, 52px)", fontWeight: 900, color: "var(--text-primary)", marginBottom: 16 }}>
              فلسفتنا
            </h2>
            {!isRTL && (
              <p style={{ fontSize: "clamp(18px, 2.5vw, 28px)", color: "var(--accent-blue)", fontWeight: 700, marginBottom: 12 }}>
                Our Philosophy
              </p>
            )}
            <p className={isRTL ? "cairo" : ""} style={{ color: "var(--text-muted)", fontSize: 16, maxWidth: 700, margin: "0 auto" }}>
              {isRTL ? "إحنا مابنعملش تدقيق حقائق بس — إحنا بنبني أجهزة مناعة." : "We don't fact-check. We build immune systems."}
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
            {PHILOSOPHY.map((item, i) => (
              <div key={i} className="adv-card" style={{
                background: "var(--bg-card)",
                border: `1px solid ${item.color}20`,
                borderRadius: 20, padding: 28,
                backdropFilter: "blur(10px)",
              }}>
                <div style={{ fontSize: 36, marginBottom: 14 }}>{item.icon}</div>
                <h3 className={isRTL ? "cairo" : ""} style={{ fontSize: 18, fontWeight: 800, color: item.color, marginBottom: 4 }}>{isRTL ? item.titleAr : item.title}</h3>
                {!isRTL && <p className="cairo" dir="rtl" style={{ fontSize: 14, color: "var(--text-muted)", marginBottom: 12, fontWeight: 600 }}>{item.titleAr}</p>}
                {isRTL ? (
                  <p className="cairo" dir="rtl" style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.7, marginTop: 12 }}>{item.bodyAr}</p>
                ) : (
                  <>
                    <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: 12 }}>{item.body}</p>
                    <p className="cairo" dir="rtl" style={{ fontSize: 12, color: "var(--text-muted)", lineHeight: 1.7 }}>{item.bodyAr}</p>
                  </>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ═══ STATS BAR ═══ */}
        <section style={{ marginBottom: 100 }}>
          <div style={{
            background: "linear-gradient(135deg, rgba(59,130,246,0.08) 0%, rgba(16,185,129,0.08) 50%, rgba(245,158,11,0.08) 100%)",
            border: "1px solid var(--border-primary)",
            borderRadius: 28, padding: "48px 40px",
            display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 32,
            textAlign: "center",
          }}>
            {STATS.map((s, i) => (
              <div key={i}>
                <div style={{ fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 900, color: s.color, lineHeight: 1, marginBottom: 8 }}>
                  <AnimatedCounter target={s.val} suffix={s.suffix} duration={2000 + i * 100} />
                </div>
                <div className={isRTL ? "cairo" : ""} style={{ fontSize: 12, color: "var(--text-muted)", fontWeight: 600, letterSpacing: "0.05em" }}>{isRTL ? s.labelAr : s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ═══ CTA ═══ */}
        <section style={{ textAlign: "center" }}>
          <div style={{
            background: "linear-gradient(135deg, rgba(59,130,246,0.1) 0%, rgba(16,185,129,0.1) 50%, rgba(245,158,11,0.05) 100%)",
            border: "1px solid var(--border-primary)",
            borderRadius: 32, padding: "60px 40px",
          }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🏆</div>
            <h2 className={isRTL ? "cairo" : ""} style={{ fontSize: "clamp(24px, 4vw, 44px)", fontWeight: 900, color: "var(--text-primary)", marginBottom: 12 }}>
              {isRTL ? "مستعد تجرب الفرق بنفسك؟" : "Ready to Experience the Difference?"}
            </h2>
            <p className="cairo" dir="rtl" style={{ fontSize: 22, color: "var(--text-secondary)", marginBottom: 40, fontWeight: 700 }}>
              ابدأ رحلتك نحو المناعة المعرفية
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
              <Link href="/curriculum/phase0" style={{
                padding: "16px 36px", borderRadius: 16,
                background: "linear-gradient(135deg, var(--accent-blue), #1d4ed8)",
                color: "#fff", fontWeight: 800, fontSize: 16, textDecoration: "none",
                boxShadow: "0 0 40px rgba(59,130,246,0.4)",
              }}>
                🚀 {isRTL ? "ابدأ رحلتك" : "Start Your Journey"}
              </Link>
              <Link href="/competition-demo" style={{
                padding: "16px 36px", borderRadius: 16,
                background: "linear-gradient(135deg, var(--accent-emerald), #059669)",
                color: "#fff", fontWeight: 800, fontSize: 16, textDecoration: "none",
                boxShadow: "0 0 40px rgba(16,185,129,0.3)",
              }}>
                🎬 {isRTL ? "شوف عرض حي" : "See Live Demo"}
              </Link>
              <Link href="/explore" style={{
                padding: "16px 36px", borderRadius: 16,
                background: "var(--bg-elevated)", border: "1px solid var(--border-primary)",
                color: "var(--text-primary)", fontWeight: 700, fontSize: 16, textDecoration: "none",
              }}>
                🗂️ {isRTL ? "استكشف كل الأدوات" : "Explore All Tools"}
              </Link>
            </div>

            {/* Citation footnotes */}
            <div style={{ marginTop: 48, textAlign: isRTL ? "right" : "left", borderTop: "1px solid var(--border-subtle)", paddingTop: 24 }}>
              <p style={{ fontSize: 11, color: "var(--text-muted)", lineHeight: 2, fontStyle: "italic" }}>
                ¹ WHO Egypt Country Report 2022 — Health Misinformation Data<br />
                ² Reuters Institute Digital News Report 2023 — Egypt Chapter<br />
                ³ Roozenbeek, J., et al. (2022). Psychological inoculation improves resilience against misinformation. <em>Science Advances</em>, 8(12).<br />
                ⁴ Compton, J. (2013). Inoculation Theory. In J. Dillard & L. Shen (Eds.), <em>The SAGE Handbook of Persuasion</em>.<br />
                ⁵ Maertens, R., et al. (2023). The Misinformation Susceptibility Test (MIST-20). PMC10991074<br />
                ⁶ UN General Assembly Resolution A/75/592 — Information and Communications Technologies for Sustainable Development<br />
                ⁷ Egyptian Ministry of Health — COVID-19 Vaccine Hesitancy Report 2021
              </p>
            </div>
          </div>
        </section>

      </div>
      <PageNavigation currentPath="/why-us" />
    </div>
  );
}
