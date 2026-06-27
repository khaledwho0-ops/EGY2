"use client";

import Link from "next/link";
import { useState } from "react";
import { PageNavigation } from '@/components/shared/page-navigation';

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
  { name: "Hadith Checker", nameAr: "مدقق الحديث", path: "/religion-hub/tools/hadith-check", icon: "📜", desc: "Verify hadith authenticity with scholarly grading" },
  { name: "Quran Context", nameAr: "سياق القرآن", path: "/religion-hub/tools/quran-context", icon: "📖", desc: "Check if verses are quoted in proper context" },
  { name: "Fatwa Analyzer", nameAr: "محلل الفتوى", path: "/religion-hub/tools/fatwa-context", icon: "⚖️", desc: "Analyze fatwa credibility and scholarly backing" },
  { name: "Sectarian Detector", nameAr: "كاشف الطائفية", path: "/religion-hub/tools/sectarian-detector", icon: "🕊️", desc: "Detect sectarian division manipulation" },
  { name: "Authority Verifier", nameAr: "التحقق من الشيخ", path: "/religion-hub/tools/authority-verifier", icon: "🎓", desc: "Verify Islamic scholar credentials" },
  { name: "Halal Finance", nameAr: "المالية الحلال", path: "/religion-hub/tools/halal-finance", icon: "💰", desc: "Check Islamic finance compliance" },
  { name: "Zakat Calculator", nameAr: "حاسبة الزكاة", path: "/religion-hub/tools/zakat-calculator", icon: "🌙", desc: "Calculate Zakat correctly" },
  { name: "Mawarith Calculator", nameAr: "حاسبة المواريث", path: "/religion-hub/tools/mawarith", icon: "🧮", desc: "Compute Islamic inheritance shares per Quranic rules" },
  { name: "SOVO Nexus", nameAr: "نظام SOVO", path: "/sovo", icon: "⚡", desc: "Dual-mandate AI: Islamic + Scientific synthesis" },
  { name: "Islamic Hub", nameAr: "مركز إسلامي", path: "/religion-hub", icon: "🕌", desc: "All Islamic defense tools in one place" },
];

export default function Phase3Page() {
  const [expandedWeek, setExpandedWeek] = useState<number | null>(17);

  return (
    <div style={{ minHeight: "100vh", background: "#020617", color: "#e2e8f0", fontFamily: "system-ui, sans-serif" }}>
      {/* Hero */}
      <div style={{ background: "linear-gradient(135deg, #064e3b 0%, #020617 60%)", padding: "60px 40px", textAlign: "center" }}>
        <div style={{ display: "inline-block", background: "rgba(16,185,129,0.15)", border: "1px solid rgba(16,185,129,0.3)", borderRadius: "999px", padding: "6px 20px", fontSize: "12px", color: "#10b981", marginBottom: "20px" }}>
          📅 Weeks 17-20 • Phase 3 of 5
        </div>
        <h1 style={{ fontSize: "clamp(36px,5vw,64px)", fontWeight: 900, marginBottom: "16px", background: "linear-gradient(135deg, #10b981, #fbbf24)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          Phase 3: Islamic Defense
        </h1>
        <p style={{ fontSize: "24px", color: "#10b981", fontFamily: "Cairo, sans-serif", marginBottom: "8px" }}>المرحلة الثالثة: الدفاع الإسلامي</p>
        <p style={{ fontSize: "18px", color: "#94a3b8", maxWidth: "700px", margin: "0 auto", lineHeight: 1.7 }}>
          Master Islamic epistemology to defend against religious misinformation. Learn hadith sciences,
          Quranic context, and how to detect sectarian manipulation — backed by Al-Azhar scholarship.
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: "24px", marginTop: "40px", flexWrap: "wrap" }}>
          {[
            { label: "4 Weeks", icon: "⏱️" },
            { label: "4 Modules", icon: "📝" },
            { label: "10 Islamic Tools", icon: "🕌" },
            { label: "Al-Azhar Grounded", icon: "🕌" },
          ].map((stat) => (
            <div key={stat.label} style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)", borderRadius: "12px", padding: "16px 24px", textAlign: "center" }}>
              <div style={{ fontSize: "24px", marginBottom: "4px" }}>{stat.icon}</div>
              <div style={{ fontSize: "14px", color: "#10b981", fontWeight: 700 }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "60px 24px" }}>

        {/* Phase Overview */}
        <div style={{ background: "rgba(16,185,129,0.06)", border: "1px solid rgba(16,185,129,0.2)", borderRadius: "16px", padding: "32px", marginBottom: "60px" }}>
          <h2 style={{ color: "#10b981", marginBottom: "16px", fontSize: "22px" }}>🎯 Why This Phase Matters</h2>
          <p style={{ color: "#94a3b8", lineHeight: 1.8, marginBottom: "16px" }}>
            Religious misinformation is Egypt's most dangerous category of false content. The Quran (49:6) commands: 
            <strong style={{ color: "#fbbf24" }}> "O you who have believed, if there comes to you a disobedient one with information, investigate."</strong>
          </p>
          <p style={{ color: "#94a3b8", lineHeight: 1.8 }}>
            Classical Islamic scholarship developed the most rigorous information verification system in history — 'Ilm al-Rijal (narrator biography science). 
            We weaponize this methodology for the modern information war. By the end of Phase 3, you will be able to fact-check any hadith, detect 
            false scholars, and resist sectarian manipulation with the same precision used by Al-Azhar's Grand Mufti.
          </p>
        </div>

        {/* Weekly Modules */}
        <h2 style={{ fontSize: "28px", fontWeight: 800, marginBottom: "32px", color: "#f1f5f9" }}>📅 4-Week Module Plan</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "60px" }}>
          {PHASE3_MODULES.map((module) => (
            <div key={module.week} style={{ background: "rgba(15,23,42,0.8)", border: `1px solid ${expandedWeek === module.week ? module.color : "rgba(148,163,184,0.1)"}`, borderRadius: "16px", overflow: "hidden", transition: "border-color 0.3s" }}>
              <button
                onClick={() => setExpandedWeek(expandedWeek === module.week ? null : module.week)}
                style={{ width: "100%", background: "none", border: "none", padding: "24px", cursor: "pointer", display: "flex", alignItems: "center", gap: "20px", textAlign: "left" }}
              >
                <div style={{ background: `${module.color}22`, border: `1px solid ${module.color}44`, borderRadius: "12px", padding: "12px", fontSize: "28px" }}>{module.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "4px" }}>
                    <span style={{ background: `${module.color}22`, color: module.color, borderRadius: "999px", padding: "2px 12px", fontSize: "12px", fontWeight: 700 }}>Week {module.week}</span>
<span style={{ background: module.difficulty === "Advanced" ? "rgba(239,68,68,0.15)" : "rgba(251,191,36,0.15)", color: module.difficulty === "Advanced" ? "#ef4444" : "#fbbf24", borderRadius: "999px", padding: "2px 10px", fontSize: "11px" }}>{module.difficulty}</span>
                  </div>
                  <h3 style={{ color: "#f1f5f9", fontSize: "18px", fontWeight: 700, marginBottom: "2px" }}>{module.title}</h3>
                  <p style={{ color: "#10b981", fontSize: "14px", fontFamily: "Cairo, sans-serif" }}>{module.titleAr}</p>
                </div>
                <span style={{ color: module.color, fontSize: "20px" }}>{expandedWeek === module.week ? "▲" : "▼"}</span>
              </button>

              {expandedWeek === module.week && (
                <div style={{ padding: "0 24px 24px" }}>
                  <p style={{ color: "#94a3b8", marginBottom: "20px", lineHeight: 1.7 }}>{module.description}</p>

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "20px" }}>
                    <div style={{ background: "rgba(0,0,0,0.3)", borderRadius: "12px", padding: "16px" }}>
                      <h4 style={{ color: "#94a3b8", fontSize: "12px", marginBottom: "12px", textTransform: "uppercase" }}>Key Concepts</h4>
                      {module.concepts.map((c) => (
                        <div key={c} style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                          <span style={{ color: module.color }}>▸</span>
                          <span style={{ color: "#e2e8f0", fontSize: "14px" }}>{c}</span>
                        </div>
                      ))}
                    </div>
                    <div style={{ background: "rgba(0,0,0,0.3)", borderRadius: "12px", padding: "16px" }}>
                      <h4 style={{ color: "#94a3b8", fontSize: "12px", marginBottom: "12px", textTransform: "uppercase" }}>Islamic Reference</h4>
                      <p style={{ color: "#fbbf24", fontSize: "13px", lineHeight: 1.6 }}>📚 {module.islamicRef}</p>
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
        <h2 style={{ fontSize: "28px", fontWeight: 800, marginBottom: "32px", color: "#f1f5f9" }}>🕌 10 Islamic Defense Tools</h2>
        <p style={{ color: "#94a3b8", marginBottom: "32px" }}>All tools backed by classical Islamic scholarship and contemporary Al-Azhar / Dar al-Ifta Egypt positions.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "16px", marginBottom: "60px" }}>
          {ISLAMIC_TOOLS.map((tool) => (
            <Link key={tool.path} href={tool.path} style={{ textDecoration: "none", display: "block", background: "rgba(16,185,129,0.05)", border: "1px solid rgba(16,185,129,0.15)", borderRadius: "16px", padding: "24px", transition: "all 0.3s" }}>
              <div style={{ fontSize: "32px", marginBottom: "12px" }}>{tool.icon}</div>
              <h3 style={{ color: "#f1f5f9", fontSize: "16px", fontWeight: 700, marginBottom: "4px" }}>{tool.name}</h3>
              <p style={{ color: "#10b981", fontSize: "13px", fontFamily: "Cairo, sans-serif", marginBottom: "8px" }}>{tool.nameAr}</p>
              <p style={{ color: "#64748b", fontSize: "13px", lineHeight: 1.5 }}>{tool.desc}</p>
            </Link>
          ))}
        </div>

        {/* Navigation */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "32px", background: "rgba(15,23,42,0.6)", borderRadius: "16px", border: "1px solid rgba(148,163,184,0.1)" }}>
          <Link href="/curriculum/phase2" style={{ display: "flex", alignItems: "center", gap: "12px", color: "#94a3b8", textDecoration: "none", fontSize: "16px" }}>
            ← Phase 2: Scientific Literacy
          </Link>
          <Link href="/curriculum/phase0" style={{ color: "#10b981", textDecoration: "none", fontSize: "14px" }}>
            📍 Back to Start
          </Link>
          <Link href="/curriculum/phase4" style={{ display: "flex", alignItems: "center", gap: "12px", color: "#10b981", textDecoration: "none", fontSize: "16px", fontWeight: 700 }}>
            Phase 4: Capstone →
          </Link>
        </div>
      </div>
      <PageNavigation currentPath="/curriculum/phase3" />
    </div>
  );
}
