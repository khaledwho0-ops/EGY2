"use client";

import Link from "next/link";
import { useState } from "react";
import { PageNavigation } from '@/components/shared/page-navigation';
import { useRTL } from "@/components/shared/rtl-provider";

export const dynamic = "force-dynamic";

const PHASE3_MODULES = [
  {
    week: 17,
    title: "Foundations of Islamic Epistemology",
    titleAr: "أسس نظرية المعرفة الإسلامية",
    icon: "📚",
    description: "Usul al-Fiqh, Maqasid al-Shariah, and how Islamic methodology guards against misinformation",
    tools: ["/religion-hub/tools/hadith-check", "/religion-hub/tools/authority-verifier"],
    toolNames: ["Hadith Checker", "Authority Verifier"],
    color: "#10b981",
    exercises: 25,
    concepts: ["Usul al-Fiqh", "Maqasid al-Shariah", "تواتر (Tawatur)", "'Ilm al-Rijal"],
    islamicRef: "Al-Shafi'i's Risala: The first systematic treatise on Islamic legal methodology",
    difficulty: "Intermediate",
  },
  {
    week: 18,
    title: "Hadith Authentication Science",
    titleAr: "علم توثيق الحديث",
    icon: "📜",
    description: "Master the science of hadith grading: Sahih, Hasan, Da'if, and Mawdu'. Learn to spot fabrications.",
    tools: ["/religion-hub/tools/hadith-check", "/religion-hub/tools/quran-context"],
    toolNames: ["Hadith Checker", "Quran Context"],
    color: "#f59e0b",
    exercises: 25,
    concepts: ["Isnad Analysis", "Narrator Grading (Rijal)", "Matn Criticism", "Takhrij"],
    islamicRef: "Ibn Hajar al-Asqalani's Taqrib al-Tahdhib: 8,800 narrator biographies",
    difficulty: "Advanced",
  },
  {
    week: 19,
    title: "Quranic Context & Misquotation",
    titleAr: "سياق القرآن والاقتباس المشوّه",
    icon: "📖",
    description: "Detect when Quranic verses are taken out of context. Understand Asbab al-Nuzul and Tafsir methodology.",
    tools: ["/religion-hub/tools/quran-context", "/sovo"],
    toolNames: ["Quran Context Checker", "SOVO Nexus"],
    color: "#3b82f6",
    exercises: 25,
    concepts: ["Asbab al-Nuzul", "Nasikh wa Mansukh", "Mutashabihat", "Muhkam"],
    islamicRef: "Ibn Kathir's Tafsir al-Quran al-Azim: The gold standard of classical Tafsir",
    difficulty: "Advanced",
  },
  {
    week: 20,
    title: "Sectarian & Fatwa Manipulation",
    titleAr: "التلاعب الطائفي والفتاوى المزيفة",
    icon: "⚖️",
    description: "Identify sectarian division tactics and manipulated fatwas. Learn Dar al-Ifta Egypt's methodology.",
    tools: ["/religion-hub/tools/sectarian-detector", "/religion-hub/tools/fatwa-context"],
    toolNames: ["Sectarian Detector", "Fatwa Context"],
    color: "#ef4444",
    exercises: 25,
    concepts: ["Takfir manipulation", "False Sheikh phenomenon", "Fatwa shopping", "Darura principle"],
    islamicRef: "Dar al-Ifta al-Misriyyah: Egypt's official Islamic authority since 1895",
    difficulty: "Advanced",
  },
];

const ISLAMIC_TOOLS = [
  { name: "Hadith Checker", nameAr: "مدقق الحديث", path: "/religion-hub/tools/hadith-check", icon: "📜", desc: "Verify hadith authenticity with scholarly grading", descAr: "تحقق من صحة الحديث بالتدريج العلمي" },
  { name: "Quran Context", nameAr: "سياق القرآن", path: "/religion-hub/tools/quran-context", icon: "📖", desc: "Check if verses are quoted in proper context", descAr: "اتأكد إن الآيات مقتبسة في سياقها الصح" },
  { name: "Fatwa Analyzer", nameAr: "محلل الفتوى", path: "/religion-hub/tools/fatwa-context", icon: "⚖️", desc: "Analyze fatwa credibility and scholarly backing", descAr: "حلّل مصداقية الفتوى وسندها العلمي" },
  { name: "Sectarian Detector", nameAr: "كاشف الطائفية", path: "/religion-hub/tools/sectarian-detector", icon: "🕊️", desc: "Detect sectarian division manipulation", descAr: "اكشف التلاعب اللي بيزرع الفتنة الطائفية" },
  { name: "Authority Verifier", nameAr: "التحقق من الشيخ", path: "/religion-hub/tools/authority-verifier", icon: "🎓", desc: "Verify Islamic scholar credentials", descAr: "تحقق من مؤهلات العالِم الإسلامي" },
  { name: "Halal Finance", nameAr: "المالية الحلال", path: "/religion-hub/tools/halal-finance", icon: "💰", desc: "Check Islamic finance compliance", descAr: "اتأكد من التزام المعاملة المالية بالشريعة" },
  { name: "Zakat Calculator", nameAr: "حاسبة الزكاة", path: "/religion-hub/tools/zakat-calculator", icon: "🌙", desc: "Calculate Zakat correctly", descAr: "احسب الزكاة بطريقة صحيحة" },
  { name: "Mawarith Calculator", nameAr: "حاسبة المواريث", path: "/religion-hub/tools/mawarith", icon: "🧮", desc: "Compute Islamic inheritance shares per Quranic rules", descAr: "احسب أنصبة الميراث حسب أحكام القرآن" },
  { name: "SOVO Nexus", nameAr: "نظام SOVO", path: "/sovo", icon: "⚡", desc: "Dual-mandate AI: Islamic + Scientific synthesis", descAr: "ذكاء ثنائي المهمة: تكامل إسلامي + علمي" },
  { name: "Islamic Hub", nameAr: "مركز إسلامي", path: "/religion-hub", icon: "🕌", desc: "All Islamic defense tools in one place", descAr: "كل أدوات الدفاع الإسلامي في مكان واحد" },
];

export default function Phase3Page() {
  const { isRTL } = useRTL();
  const [expandedWeek, setExpandedWeek] = useState<number | null>(17);

  return (
    <div dir={isRTL ? "rtl" : "ltr"} style={{ minHeight: "100vh", background: "var(--bg-page)", color: "var(--text-primary)", fontFamily: "system-ui, sans-serif" }}>
      {/* Hero */}
      <div style={{ background: "linear-gradient(135deg, var(--accent-mentalhealth-surface) 0%, var(--bg-page) 60%)", padding: "60px 40px", textAlign: "center" }}>
        <div style={{ display: "inline-block", background: "var(--accent-mentalhealth-surface)", border: "1px solid var(--border-secondary)", borderRadius: "999px", padding: "6px 20px", fontSize: "12px", color: "var(--accent-mentalhealth)", marginBottom: "20px" }}>
          📅 {isRTL ? "الأسابيع ١٧-٢٠ • المرحلة ٣ من ٥" : "Weeks 17-20 • Phase 3 of 5"}
        </div>
        <h1 style={{ fontSize: "clamp(36px,5vw,64px)", fontWeight: 900, marginBottom: "16px", background: "linear-gradient(135deg, var(--accent-emerald), var(--accent-amber))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          {isRTL ? "المرحلة ٣: الدفاع الإسلامي" : "Phase 3: Islamic Defense"}
        </h1>
        <p style={{ fontSize: "24px", color: "var(--accent-mentalhealth)", fontFamily: "Cairo, sans-serif", marginBottom: "8px" }}>المرحلة الثالثة: الدفاع الإسلامي</p>
        <p style={{ fontSize: "18px", color: "var(--text-secondary)", maxWidth: "700px", margin: "0 auto", lineHeight: 1.7 }}>
          {isRTL
            ? "اتقن نظرية المعرفة الإسلامية عشان تدافع ضد التضليل الديني. اتعلم علوم الحديث، وسياق القرآن، وإزاي تكشف التلاعب الطائفي — مستند لعلم الأزهر."
            : "Master Islamic epistemology to defend against religious misinformation. Learn hadith sciences, Quranic context, and how to detect sectarian manipulation — backed by Al-Azhar scholarship."}
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: "24px", marginTop: "40px", flexWrap: "wrap" }}>
          {[
            { label: isRTL ? "٤ أسابيع" : "4 Weeks", icon: "⏱️" },
            { label: isRTL ? "٤ وحدات" : "4 Modules", icon: "📝" },
            { label: isRTL ? "١٠ أدوات إسلامية" : "10 Islamic Tools", icon: "🕌" },
            { label: isRTL ? "مستند للأزهر" : "Al-Azhar Grounded", icon: "🕌" },
          ].map((stat) => (
            <div key={stat.label} style={{ background: "var(--accent-mentalhealth-surface)", border: "1px solid var(--border-secondary)", borderRadius: "12px", padding: "16px 24px", textAlign: "center" }}>
              <div style={{ fontSize: "24px", marginBottom: "4px" }}>{stat.icon}</div>
              <div style={{ fontSize: "14px", color: "var(--accent-mentalhealth)", fontWeight: 700 }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "60px 24px" }}>

        {/* Phase Overview */}
        <div style={{ background: "var(--accent-mentalhealth-surface)", border: "1px solid var(--border-secondary)", borderRadius: "16px", padding: "32px", marginBottom: "60px" }}>
          <h2 style={{ color: "var(--accent-mentalhealth)", marginBottom: "16px", fontSize: "22px" }}>🎯 {isRTL ? "ليه المرحلة دي مهمة" : "Why This Phase Matters"}</h2>
          <p style={{ color: "var(--text-secondary)", lineHeight: 1.8, marginBottom: "16px" }}>
            {isRTL
              ? "التضليل الديني هو أخطر أنواع المحتوى الكاذب في مصر. القرآن (٤٩:٦) بيأمر: "
              : "Religious misinformation is Egypt's most dangerous category of false content. The Quran (49:6) commands: "}
            <strong style={{ color: "var(--accent-amber)" }}> "O you who have believed, if there comes to you a disobedient one with information, investigate."</strong>
          </p>
          <p style={{ color: "var(--text-secondary)", lineHeight: 1.8 }}>
            {isRTL
              ? "العلم الإسلامي الكلاسيكي طوّر أدق نظام للتحقق من المعلومات في التاريخ — علم الرجال (علم سِيَر الرواة). إحنا بنوظّف المنهجية دي للحرب المعلوماتية الحديثة. بنهاية المرحلة ٣ هتقدر تتحقق من أي حديث، وتكشف الشيوخ المزيفين، وتقاوم التلاعب الطائفي بنفس الدقة اللي بيستعملها مفتي الأزهر."
              : "Classical Islamic scholarship developed the most rigorous information verification system in history — 'Ilm al-Rijal (narrator biography science). We weaponize this methodology for the modern information war. By the end of Phase 3, you will be able to fact-check any hadith, detect false scholars, and resist sectarian manipulation with the same precision used by Al-Azhar's Grand Mufti."}
          </p>
        </div>

        {/* Weekly Modules */}
        <h2 style={{ fontSize: "28px", fontWeight: 800, marginBottom: "32px", color: "var(--text-primary)" }}>📅 {isRTL ? "خطة الوحدات على ٤ أسابيع" : "4-Week Module Plan"}</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "60px" }}>
          {PHASE3_MODULES.map((module) => (
            <div key={module.week} style={{ background: "var(--bg-card)", border: `1px solid ${expandedWeek === module.week ? module.color : "var(--border-primary)"}`, borderRadius: "16px", overflow: "hidden", transition: "border-color 0.3s" }}>
              <button
                onClick={() => setExpandedWeek(expandedWeek === module.week ? null : module.week)}
                style={{ width: "100%", background: "none", border: "none", padding: "24px", cursor: "pointer", display: "flex", alignItems: "center", gap: "20px", textAlign: isRTL ? "right" : "left" }}
              >
                <div style={{ background: `${module.color}22`, border: `1px solid ${module.color}44`, borderRadius: "12px", padding: "12px", fontSize: "28px" }}>{module.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "4px" }}>
                    <span style={{ background: `${module.color}22`, color: module.color, borderRadius: "999px", padding: "2px 12px", fontSize: "12px", fontWeight: 700 }}>{isRTL ? `الأسبوع ${module.week}` : `Week ${module.week}`}</span>
<span style={{ background: module.difficulty === "Advanced" ? "rgba(239,68,68,0.15)" : "rgba(251,191,36,0.15)", color: module.difficulty === "Advanced" ? "var(--accent-red)" : "var(--accent-amber)", borderRadius: "999px", padding: "2px 10px", fontSize: "11px" }}>{module.difficulty === "Advanced" ? (isRTL ? "متقدّم" : "Advanced") : (isRTL ? "متوسط" : "Intermediate")}</span>
                  </div>
                  <h3 style={{ color: "var(--text-primary)", fontSize: "18px", fontWeight: 700, marginBottom: "2px" }}>{isRTL ? module.titleAr : module.title}</h3>
                  <p style={{ color: "var(--accent-mentalhealth)", fontSize: "14px", fontFamily: "Cairo, sans-serif" }}>{module.titleAr}</p>
                </div>
                <span style={{ color: module.color, fontSize: "20px" }}>{expandedWeek === module.week ? "▲" : "▼"}</span>
              </button>

              {expandedWeek === module.week && (
                <div style={{ padding: "0 24px 24px" }}>
                  <p style={{ color: "var(--text-secondary)", marginBottom: "20px", lineHeight: 1.7 }}>{module.description}</p>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "20px" }}>
                    <div style={{ background: "var(--bg-elevated)", borderRadius: "12px", padding: "16px" }}>
                      <h4 style={{ color: "var(--text-muted)", fontSize: "12px", marginBottom: "12px", textTransform: "uppercase" }}>{isRTL ? "المفاهيم الأساسية" : "Key Concepts"}</h4>
                      {module.concepts.map((c) => (
                        <div key={c} style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                          <span style={{ color: module.color }}>▸</span>
                          <span style={{ color: "var(--text-primary)", fontSize: "14px" }}>{c}</span>
                        </div>
                      ))}
                    </div>
                    <div style={{ background: "var(--bg-elevated)", borderRadius: "12px", padding: "16px" }}>
                      <h4 style={{ color: "var(--text-muted)", fontSize: "12px", marginBottom: "12px", textTransform: "uppercase" }}>{isRTL ? "المرجع الإسلامي" : "Islamic Reference"}</h4>
                      <p style={{ color: "var(--accent-amber)", fontSize: "13px", lineHeight: 1.6 }}>📚 {module.islamicRef}</p>
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                    {module.tools.map((path, idx) => (
                      <Link key={path} href={path} style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: `${module.color}22`, border: `1px solid ${module.color}44`, borderRadius: "999px", padding: "8px 20px", color: module.color, textDecoration: "none", fontSize: "14px", fontWeight: 600 }}>
                        🔗 {module.toolNames[idx]}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Islamic Tools Grid */}
        <h2 style={{ fontSize: "28px", fontWeight: 800, marginBottom: "32px", color: "var(--text-primary)" }}>🕌 {isRTL ? "١٠ أدوات للدفاع الإسلامي" : "10 Islamic Defense Tools"}</h2>
        <p style={{ color: "var(--text-secondary)", marginBottom: "32px" }}>{isRTL ? "كل الأدوات مستندة لعلم إسلامي كلاسيكي ومواقف الأزهر / دار الإفتاء المصرية المعاصرة." : "All tools backed by classical Islamic scholarship and contemporary Al-Azhar / Dar al-Ifta Egypt positions."}</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "16px", marginBottom: "60px" }}>
          {ISLAMIC_TOOLS.map((tool) => (
            <Link key={tool.path} href={tool.path} style={{ textDecoration: "none", display: "block", background: "var(--bg-card)", border: "1px solid var(--border-primary)", borderRadius: "16px", padding: "24px", transition: "all 0.3s" }}>
              <div style={{ fontSize: "32px", marginBottom: "12px" }}>{tool.icon}</div>
              <h3 style={{ color: "var(--text-primary)", fontSize: "16px", fontWeight: 700, marginBottom: "4px" }}>{isRTL ? tool.nameAr : tool.name}</h3>
              <p style={{ color: "var(--accent-mentalhealth)", fontSize: "13px", fontFamily: "Cairo, sans-serif", marginBottom: "8px" }}>{tool.nameAr}</p>
              <p style={{ color: "var(--text-muted)", fontSize: "13px", lineHeight: 1.5 }}>{isRTL ? tool.descAr : tool.desc}</p>
            </Link>
          ))}
        </div>

        {/* Navigation */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "32px", background: "var(--bg-card)", borderRadius: "16px", border: "1px solid var(--border-primary)" }}>
          <Link href="/curriculum/phase2" style={{ display: "flex", alignItems: "center", gap: "12px", color: "var(--text-secondary)", textDecoration: "none", fontSize: "16px" }}>
            {isRTL ? "← المرحلة ٢: الثقافة العلمية" : "← Phase 2: Scientific Literacy"}
          </Link>
          <Link href="/curriculum/phase0" style={{ color: "var(--accent-mentalhealth)", textDecoration: "none", fontSize: "14px" }}>
            📍 {isRTL ? "ارجع للبداية" : "Back to Start"}
          </Link>
          <Link href="/curriculum/phase4" style={{ display: "flex", alignItems: "center", gap: "12px", color: "var(--accent-mentalhealth)", textDecoration: "none", fontSize: "16px", fontWeight: 700 }}>
            {isRTL ? "المرحلة ٤: المشروع الختامي →" : "Phase 4: Capstone →"}
          </Link>
        </div>
      </div>
      <PageNavigation currentPath="/curriculum/phase3" />
    </div>
  );
}
