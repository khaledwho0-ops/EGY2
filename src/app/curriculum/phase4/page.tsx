"use client";

import Link from "next/link";
import { useState } from "react";
import { PageNavigation } from '@/components/shared/page-navigation';

export const dynamic = "force-dynamic";

const CAPSTONE_CHALLENGES = [
  {
    week: 21,
    title: "The Sovereign Boss-Fight",
    titleAr: "معركة السيادة النهائية",
    icon: "⚔️",
    description: "Face an AI-assisted live defense drill that throws real Egyptian misinformation at you across all 5 domains simultaneously. Prove you're Sovereign.",
    color: "#ef4444",
    challenge: "A 60-minute timed challenge: debunk 20 real claims (5 science, 5 Islamic, 5 health, 5 political) using only the platform's tools. Minimum passing score: 80%.",
    tools: ["/angry-debunkers", "/swarm-debate", "/sovo"],
    toolNames: ["Angry Debunkers", "Swarm Debate", "SOVO Nexus"],
    milestone: "Unlock: 'Fact Warrior' badge + Phase 4 access",
    difficulty: "Expert",
  },
  {
    week: 22,
    title: "Threat Map Operations",
    titleAr: "عمليات خريطة التهديدات",
    icon: "🌐",
    description: "Use the live Threat Map to track a real misinformation campaign. Identify Patient Zero, map the spread, and issue counter-narratives.",
    color: "#f59e0b",
    challenge: "Select a current Egyptian misinformation trend from the Threat Map. Complete a full OSINT investigation report: origin → spread → counter-narrative. Submit your report.",
    tools: ["/threat-map", "/osint-investigator", "/deepreal-forensics"],
    toolNames: ["Threat Map", "OSINT Investigator", "DeepReal"],
    milestone: "Unlock: 'Intelligence Analyst' badge",
    difficulty: "Expert",
  },
  {
    week: 23,
    title: "Community Defense Mission",
    titleAr: "مهمة الدفاع المجتمعي",
    icon: "🌍",
    description: "Apply your skills to protect someone real. Help a family member or friend identify misinformation using the Family Kit. Document the interaction.",
    color: "#8b5cf6",
    challenge: "Use the Family Kit to conduct a 'Media Literacy Session' with at least one family member. Record their before/after MIST-20 scores. Submit proof of completion.",
    tools: ["/family-kit", "/assessment", "/whatsapp-analyzer"],
    toolNames: ["Family Kit", "Assessment", "WhatsApp Analyzer"],
    milestone: "Unlock: 'Sovereign Protector' badge",
    difficulty: "Advanced",
  },
  {
    week: 24,
    title: "Sovereign Certification",
    titleAr: "شهادة السيادة المعرفية",
    icon: "🏆",
    description: "Final assessment: complete the MIST-20, SUS, and GHSQ instruments. Receive your Cognitive Immunity Certificate. You are now Sovereign.",
    color: "#fbbf24",
    challenge: "Complete all 3 psychometric instruments. Achieve minimum cognitive immunity score of 75/100. Your certificate is then generated with a unique verifiable ID.",
    tools: ["/assessment", "/certificate", "/inoculation-passport"],
    toolNames: ["Final Assessment", "Certificate", "Immunity Passport"],
    milestone: "🏆 SOVEREIGN CERTIFICATE UNLOCKED",
    difficulty: "Expert",
  },
];

// Counts verified against the codebase (src/app): 85 api route.ts, 131 page.tsx.
// Qualitative labels are used where an exact integer cannot be honestly verified.
const PLATFORM_STATS = [
  { value: "131", label: "Platform Pages", labelAr: "صفحة", icon: "📄", color: "#10b981" },
  { value: "85", label: "API Routes", labelAr: "مسار API", icon: "🔌", color: "#3b82f6" },
  { value: "4", label: "Curriculum Phases", labelAr: "مراحل المنهج", icon: "🎓", color: "#8b5cf6" },
  { value: "5", label: "Defense Domains", labelAr: "مجالات الدفاع", icon: "🛡️", color: "#ef4444" },
  { value: "AI", label: "Model Cascade", labelAr: "تعاقب النماذج", icon: "🤖", color: "#06b6d4" },
  { value: "Multi", label: "AI Model Cascade", labelAr: "تعاقب نماذج الذكاء", icon: "⚡", color: "#f59e0b" },
];

export default function Phase4Page() {
  const [expandedWeek, setExpandedWeek] = useState<number | null>(21);

  return (
    <div style={{ minHeight: "100vh", background: "#020617", color: "#e2e8f0", fontFamily: "system-ui, sans-serif" }}>
      {/* Hero — Epic Capstone Theme */}
      <div style={{ background: "linear-gradient(135deg, #1a0a00 0%, #3d1a00 30%, #020617 70%)", padding: "80px 40px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "20px", left: "50%", transform: "translateX(-50%)", width: "600px", height: "300px", background: "radial-gradient(ellipse, rgba(251,191,36,0.15), transparent)", borderRadius: "50%", pointerEvents: "none" }} />
        <div style={{ display: "inline-block", background: "rgba(251,191,36,0.15)", border: "1px solid rgba(251,191,36,0.3)", borderRadius: "999px", padding: "6px 20px", fontSize: "12px", color: "#fbbf24", marginBottom: "20px" }}>
          🏆 Weeks 21-24 • FINAL PHASE
        </div>
        <h1 style={{ fontSize: "clamp(36px,6vw,72px)", fontWeight: 900, marginBottom: "16px", background: "linear-gradient(135deg, #fbbf24, #f59e0b, #ef4444)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          Phase 4: Capstone
        </h1>
        <p style={{ fontSize: "28px", color: "#fbbf24", fontFamily: "Cairo, sans-serif", marginBottom: "8px" }}>المرحلة الرابعة: مشروع التخرج والسيادة</p>
        <p style={{ fontSize: "18px", color: "#94a3b8", maxWidth: "700px", margin: "0 auto", lineHeight: 1.7 }}>
          You've built the knowledge. Now prove the mastery.
          Face the Sovereign Boss-Fight, conduct live operations, defend your community,
          and earn your Cognitive Immunity Certificate.
        </p>
        <div style={{ marginTop: "40px", display: "flex", justifyContent: "center" }}>
          <Link href="/competition-demo" style={{ display: "inline-flex", alignItems: "center", gap: "12px", background: "linear-gradient(135deg, #fbbf24, #f59e0b)", borderRadius: "999px", padding: "16px 40px", color: "#020617", fontWeight: 800, fontSize: "18px", textDecoration: "none" }}>
            ⚡ See Live Platform Demo
          </Link>
        </div>
      </div>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "60px 24px" }}>

        {/* Phase Overview — Why This Phase Matters */}
        <div style={{ background: "rgba(251,191,36,0.06)", border: "1px solid rgba(251,191,36,0.2)", borderRadius: "16px", padding: "32px", marginBottom: "60px" }}>
          <h2 style={{ color: "#fbbf24", marginBottom: "16px", fontSize: "22px" }}>🎯 Why This Phase Matters</h2>
          <p style={{ color: "#94a3b8", lineHeight: 1.8, marginBottom: "16px" }}>
            Phases 1 through 3 taught you the tools and the methods. Phase 4 is where you stop studying and start defending.
            Knowledge that is never applied fades; skills that are tested under pressure stay. The four capstone challenges
            below move you from learner to operator: a timed adversarial test, a live OSINT investigation, a real
            community-defense mission, and a final psychometric assessment.
          </p>
          <p style={{ color: "#fbbf24", fontFamily: "Cairo, sans-serif", fontSize: "16px", lineHeight: 1.9, direction: "rtl", textAlign: "right" }}>
            المرحلة الرابعة هي مرحلة التطبيق. تعلّمت الأدوات والمناهج في المراحل السابقة، والآن تُثبت إتقانك عبر أربعة تحديات
            نهائية: اختبار مُوقَّت ضد ذكاء اصطناعي خصمي، تحقيق استخباراتي مفتوح المصدر، مهمة دفاع مجتمعي حقيقية، ثم التقييم
            النفسي النهائي للحصول على شهادة المناعة المعرفية.
          </p>
        </div>

        {/* Platform Stats — What You've Learned To Use */}
        <div style={{ marginBottom: "60px" }}>
          <h2 style={{ fontSize: "28px", fontWeight: 800, marginBottom: "12px", color: "#f1f5f9" }}>🏗️ The Arsenal You've Built</h2>
          <p style={{ color: "#64748b", marginBottom: "32px" }}>By Phase 4 you can operate every tool in the platform — the full civic-defense toolkit, end to end.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: "16px" }}>
            {PLATFORM_STATS.map((stat) => (
              <div key={stat.label} style={{ background: `${stat.color}11`, border: `1px solid ${stat.color}33`, borderRadius: "16px", padding: "24px", textAlign: "center" }}>
                <div style={{ fontSize: "32px", marginBottom: "8px" }}>{stat.icon}</div>
                <div style={{ fontSize: "36px", fontWeight: 900, color: stat.color, marginBottom: "4px" }}>{stat.value}</div>
                <div style={{ fontSize: "13px", color: "#94a3b8" }}>{stat.label}</div>
                <div style={{ fontSize: "12px", color: stat.color, fontFamily: "Cairo, sans-serif" }}>{stat.labelAr}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Capstone Challenges */}
        <h2 style={{ fontSize: "28px", fontWeight: 800, marginBottom: "32px", color: "#f1f5f9" }}>⚔️ The 4 Capstone Challenges</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "60px" }}>
          {CAPSTONE_CHALLENGES.map((challenge) => (
            <div key={challenge.week} style={{ background: "rgba(15,23,42,0.8)", border: `1px solid ${expandedWeek === challenge.week ? challenge.color : "rgba(148,163,184,0.1)"}`, borderRadius: "16px", overflow: "hidden", transition: "border-color 0.3s" }}>
              <button
                onClick={() => setExpandedWeek(expandedWeek === challenge.week ? null : challenge.week)}
                style={{ width: "100%", background: "none", border: "none", padding: "24px", cursor: "pointer", display: "flex", alignItems: "center", gap: "20px", textAlign: "left" }}
              >
                <div style={{ background: `${challenge.color}22`, border: `1px solid ${challenge.color}44`, borderRadius: "12px", padding: "12px", fontSize: "28px" }}>{challenge.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "4px" }}>
                    <span style={{ background: `${challenge.color}22`, color: challenge.color, borderRadius: "999px", padding: "2px 12px", fontSize: "12px", fontWeight: 700 }}>Week {challenge.week}</span>
                    <span style={{ background: "rgba(239,68,68,0.15)", color: "#ef4444", borderRadius: "999px", padding: "2px 10px", fontSize: "11px" }}>{challenge.difficulty}</span>
                  </div>
                  <h3 style={{ color: "#f1f5f9", fontSize: "18px", fontWeight: 700, marginBottom: "2px" }}>{challenge.title}</h3>
                  <p style={{ color: challenge.color, fontSize: "14px", fontFamily: "Cairo, sans-serif" }}>{challenge.titleAr}</p>
                </div>
                <div style={{ background: `${challenge.color}22`, borderRadius: "999px", padding: "6px 16px", color: challenge.color, fontSize: "12px", fontWeight: 700 }}>
                  {expandedWeek === challenge.week ? "▲" : "▼"}
                </div>
              </button>

              {expandedWeek === challenge.week && (
                <div style={{ padding: "0 24px 24px" }}>
                  <p style={{ color: "#94a3b8", marginBottom: "16px", lineHeight: 1.7 }}>{challenge.description}</p>
                  <div style={{ background: `${challenge.color}11`, border: `1px solid ${challenge.color}22`, borderRadius: "12px", padding: "20px", marginBottom: "20px" }}>
                    <h4 style={{ color: challenge.color, marginBottom: "8px", fontSize: "14px" }}>📋 The Challenge:</h4>
                    <p style={{ color: "#e2e8f0", fontSize: "14px", lineHeight: 1.7 }}>{challenge.challenge}</p>
                  </div>
                  <div style={{ background: "rgba(251,191,36,0.05)", border: "1px solid rgba(251,191,36,0.2)", borderRadius: "12px", padding: "16px", marginBottom: "20px" }}>
                    <span style={{ color: "#fbbf24", fontWeight: 700, fontSize: "14px" }}>🏅 Milestone: </span>
                    <span style={{ color: "#fbbf24", fontSize: "14px" }}>{challenge.milestone}</span>
                  </div>
                  <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                    {challenge.tools.map((path, idx) => (
                      <Link key={path} href={path} style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: `${challenge.color}22`, border: `1px solid ${challenge.color}44`, borderRadius: "999px", padding: "8px 20px", color: challenge.color, textDecoration: "none", fontSize: "14px", fontWeight: 600 }}>
                        🔗 {challenge.toolNames[idx]}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Final Certificate CTA */}
        <div style={{ background: "linear-gradient(135deg, rgba(251,191,36,0.1), rgba(239,68,68,0.05))", border: "2px solid rgba(251,191,36,0.3)", borderRadius: "24px", padding: "60px 40px", textAlign: "center", marginBottom: "60px" }}>
          <div style={{ fontSize: "64px", marginBottom: "20px" }}>🏆</div>
          <h2 style={{ fontSize: "36px", fontWeight: 900, color: "#fbbf24", marginBottom: "12px" }}>The Sovereign Certificate</h2>
          <p style={{ color: "#f1f5f9", fontFamily: "Cairo, sans-serif", fontSize: "22px", marginBottom: "16px" }}>شهادة الإنسان السيادي</p>
          <p style={{ color: "#94a3b8", maxWidth: "600px", margin: "0 auto 40px", lineHeight: 1.8 }}>
            Completing all 4 phases generates a verifiable certificate that records your progress through the program.
            It includes your MIST-20 assessment score, your completion record, and the specialization badges you unlocked.
          </p>
          <p style={{ color: "#94a3b8", fontFamily: "Cairo, sans-serif", fontSize: "16px", maxWidth: "600px", margin: "0 auto 40px", lineHeight: 1.9, direction: "rtl", textAlign: "center" }}>
            بإتمام المراحل الأربع تحصل على شهادة قابلة للتحقق تسجّل تقدّمك في البرنامج، وتشمل درجتك في اختبار MIST-20 وسجلّ
            إكمالك وشارات التخصص التي فتحتها.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: "20px", flexWrap: "wrap" }}>
            <Link href="/certificate" style={{ display: "inline-flex", alignItems: "center", gap: "12px", background: "linear-gradient(135deg, #fbbf24, #f59e0b)", borderRadius: "999px", padding: "16px 40px", color: "#020617", fontWeight: 800, fontSize: "18px", textDecoration: "none" }}>
              🏆 View Certificate
            </Link>
            <Link href="/assessment" style={{ display: "inline-flex", alignItems: "center", gap: "12px", background: "rgba(251,191,36,0.1)", border: "2px solid rgba(251,191,36,0.3)", borderRadius: "999px", padding: "16px 40px", color: "#fbbf24", fontWeight: 700, fontSize: "18px", textDecoration: "none" }}>
              📝 Take Final Assessment
            </Link>
          </div>
        </div>

        {/* Navigation */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "32px", background: "rgba(15,23,42,0.6)", borderRadius: "16px", border: "1px solid rgba(148,163,184,0.1)" }}>
          <Link href="/curriculum/phase3" style={{ display: "flex", alignItems: "center", gap: "12px", color: "#94a3b8", textDecoration: "none", fontSize: "16px" }}>
            ← Phase 3: Islamic Defense
          </Link>
          <Link href="/curriculum/phase0" style={{ color: "#fbbf24", textDecoration: "none", fontSize: "14px" }}>
            📍 Back to Phase 0
          </Link>
          <Link href="/explore" style={{ display: "flex", alignItems: "center", gap: "12px", color: "#fbbf24", textDecoration: "none", fontSize: "16px", fontWeight: 700 }}>
            🌐 Explore All Pages →
          </Link>
        </div>
      </div>
      <PageNavigation currentPath="/curriculum/phase4" />
    </div>
  );
}
