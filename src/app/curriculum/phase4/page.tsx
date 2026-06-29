"use client";

import Link from "next/link";
import { useState } from "react";
import { PageNavigation } from '@/components/shared/page-navigation';
import { useRTL } from "@/components/shared/rtl-provider";

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
  const { isRTL } = useRTL();
  const [expandedWeek, setExpandedWeek] = useState<number | null>(21);

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-page)", color: "var(--text-primary)", fontFamily: "system-ui, sans-serif" }}>
      {/* Hero — Epic Capstone Theme */}
      <div style={{ background: "linear-gradient(135deg, #1a0a00 0%, #3d1a00 30%, var(--bg-page) 70%)", padding: "80px 40px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "20px", left: "50%", transform: "translateX(-50%)", width: "600px", height: "300px", background: "radial-gradient(ellipse, rgba(251,191,36,0.15), transparent)", borderRadius: "50%", pointerEvents: "none" }} />
        <div style={{ display: "inline-block", background: "rgba(251,191,36,0.15)", border: "1px solid rgba(251,191,36,0.3)", borderRadius: "999px", padding: "6px 20px", fontSize: "12px", color: "var(--accent-amber)", marginBottom: "20px" }}>
          {isRTL ? "🏆 الأسابيع ٢١-٢٤ • المرحلة الأخيرة" : "🏆 Weeks 21-24 • FINAL PHASE"}
        </div>
        <h1 style={{ fontSize: "clamp(36px,6vw,72px)", fontWeight: 900, marginBottom: "16px", background: "linear-gradient(135deg, #fbbf24, #f59e0b, #ef4444)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          {isRTL ? "المرحلة الرابعة: مشروع التخرج" : "Phase 4: Capstone"}
        </h1>
        <p style={{ fontSize: "28px", color: "var(--accent-amber)", fontFamily: "Cairo, sans-serif", marginBottom: "8px" }}>المرحلة الرابعة: مشروع التخرج والسيادة</p>
        <p style={{ fontSize: "18px", color: "var(--text-muted)", maxWidth: "700px", margin: "0 auto", lineHeight: 1.7, direction: isRTL ? "rtl" : "ltr" }}>
          {isRTL
            ? "بنيت المعرفة، دلوقتي أثبت الإتقان. واجه معركة السيادة، نفّذ عمليات حيّة، دافع عن مجتمعك، واكسب شهادة المناعة المعرفية."
            : "You've built the knowledge. Now prove the mastery. Face the Sovereign Boss-Fight, conduct live operations, defend your community, and earn your Cognitive Immunity Certificate."}
        </p>
        <div style={{ marginTop: "40px", display: "flex", justifyContent: "center" }}>
          <Link href="/competition-demo" style={{ display: "inline-flex", alignItems: "center", gap: "12px", background: "linear-gradient(135deg, #fbbf24, #f59e0b)", borderRadius: "999px", padding: "16px 40px", color: "var(--text-inverse)", fontWeight: 800, fontSize: "18px", textDecoration: "none" }}>
            {isRTL ? "⚡ شوف العرض الحيّ للمنصة" : "⚡ See Live Platform Demo"}
          </Link>
        </div>
      </div>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "60px 24px" }}>

        {/* Phase Overview — Why This Phase Matters */}
        <div style={{ background: "rgba(251,191,36,0.06)", border: "1px solid rgba(251,191,36,0.2)", borderRadius: "16px", padding: "32px", marginBottom: "60px" }}>
          <h2 style={{ color: "var(--accent-amber)", marginBottom: "16px", fontSize: "22px", direction: isRTL ? "rtl" : "ltr" }}>
            {isRTL ? "🎯 ليه المرحلة دي مهمة" : "🎯 Why This Phase Matters"}
          </h2>
          <p style={{ color: "var(--text-muted)", lineHeight: 1.8, marginBottom: "16px", direction: isRTL ? "rtl" : "ltr", textAlign: isRTL ? "right" : "left" }}>
            {isRTL
              ? "المراحل من الأولى للتالتة علّمتك الأدوات والمناهج. المرحلة الرابعة هي اللي بتبطّل فيها الدراسة وتبدأ الدفاع. المعرفة اللي ما بتتطبّقش بتضيع، والمهارات اللي بتتختبر تحت ضغط بتفضل. التحديات الأربعة تحت بتنقلك من متعلّم لمشغّل ميداني: اختبار مُوقَّت ضد ذكاء خصمي، تحقيق استخباراتي حيّ، مهمة دفاع مجتمعي حقيقية، وتقييم نفسي نهائي."
              : "Phases 1 through 3 taught you the tools and the methods. Phase 4 is where you stop studying and start defending. Knowledge that is never applied fades; skills that are tested under pressure stay. The four capstone challenges below move you from learner to operator: a timed adversarial test, a live OSINT investigation, a real community-defense mission, and a final psychometric assessment."}
          </p>
          <p style={{ color: "var(--accent-amber)", fontFamily: "Cairo, sans-serif", fontSize: "16px", lineHeight: 1.9, direction: "rtl", textAlign: "right" }}>
            المرحلة الرابعة هي مرحلة التطبيق. تعلّمت الأدوات والمناهج في المراحل السابقة، والآن تُثبت إتقانك عبر أربعة تحديات
            نهائية: اختبار مُوقَّت ضد ذكاء اصطناعي خصمي، تحقيق استخباراتي مفتوح المصدر، مهمة دفاع مجتمعي حقيقية، ثم التقييم
            النفسي النهائي للحصول على شهادة المناعة المعرفية.
          </p>
        </div>

        {/* Platform Stats — What You've Learned To Use */}
        <div style={{ marginBottom: "60px" }}>
          <h2 style={{ fontSize: "28px", fontWeight: 800, marginBottom: "12px", color: "var(--text-primary)", direction: isRTL ? "rtl" : "ltr" }}>
            {isRTL ? "🏗️ الترسانة اللي بنيتها" : "🏗️ The Arsenal You've Built"}
          </h2>
          <p style={{ color: "var(--text-caption)", marginBottom: "32px", direction: isRTL ? "rtl" : "ltr", textAlign: isRTL ? "right" : "left" }}>
            {isRTL
              ? "مع المرحلة الرابعة بتقدر تشغّل كل أداة في المنصة — مجموعة الدفاع المدني كاملة من الأول للآخر."
              : "By Phase 4 you can operate every tool in the platform — the full civic-defense toolkit, end to end."}
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: "16px" }}>
            {PLATFORM_STATS.map((stat) => (
              <div key={stat.label} style={{ background: `${stat.color}11`, border: `1px solid ${stat.color}33`, borderRadius: "16px", padding: "24px", textAlign: "center" }}>
                <div style={{ fontSize: "32px", marginBottom: "8px" }}>{stat.icon}</div>
                <div style={{ fontSize: "36px", fontWeight: 900, color: stat.color, marginBottom: "4px" }}>{stat.value}</div>
                <div style={{ fontSize: "13px", color: "var(--text-muted)" }}>{isRTL ? stat.labelAr : stat.label}</div>
                <div style={{ fontSize: "12px", color: stat.color, fontFamily: "Cairo, sans-serif" }}>{stat.labelAr}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Capstone Challenges */}
        <h2 style={{ fontSize: "28px", fontWeight: 800, marginBottom: "32px", color: "var(--text-primary)", direction: isRTL ? "rtl" : "ltr" }}>
          {isRTL ? "⚔️ التحديات الأربعة النهائية" : "⚔️ The 4 Capstone Challenges"}
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "60px" }}>
          {CAPSTONE_CHALLENGES.map((challenge) => (
            <div key={challenge.week} style={{ background: "var(--bg-card)", border: `1px solid ${expandedWeek === challenge.week ? challenge.color : "var(--border-primary)"}`, borderRadius: "16px", overflow: "hidden", transition: "border-color 0.3s" }}>
              <button
                onClick={() => setExpandedWeek(expandedWeek === challenge.week ? null : challenge.week)}
                style={{ width: "100%", background: "none", border: "none", padding: "24px", cursor: "pointer", display: "flex", alignItems: "center", gap: "20px", textAlign: isRTL ? "right" : "left", flexDirection: isRTL ? "row-reverse" : "row" }}
              >
                <div style={{ background: `${challenge.color}22`, border: `1px solid ${challenge.color}44`, borderRadius: "12px", padding: "12px", fontSize: "28px" }}>{challenge.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "4px", flexDirection: isRTL ? "row-reverse" : "row" }}>
                    <span style={{ background: `${challenge.color}22`, color: challenge.color, borderRadius: "999px", padding: "2px 12px", fontSize: "12px", fontWeight: 700 }}>{isRTL ? `أسبوع ${challenge.week}` : `Week ${challenge.week}`}</span>
                    <span style={{ background: "rgba(239,68,68,0.15)", color: "var(--accent-red)", borderRadius: "999px", padding: "2px 10px", fontSize: "11px" }}>{isRTL ? (challenge.difficulty === "Expert" ? "خبير" : "متقدّم") : challenge.difficulty}</span>
                  </div>
                  <h3 style={{ color: "var(--text-primary)", fontSize: "18px", fontWeight: 700, marginBottom: "2px" }}>{isRTL ? challenge.titleAr : challenge.title}</h3>
                  <p style={{ color: challenge.color, fontSize: "14px", fontFamily: "Cairo, sans-serif" }}>{challenge.titleAr}</p>
                </div>
                <div style={{ background: `${challenge.color}22`, borderRadius: "999px", padding: "6px 16px", color: challenge.color, fontSize: "12px", fontWeight: 700 }}>
                  {expandedWeek === challenge.week ? "▲" : "▼"}
                </div>
              </button>

              {expandedWeek === challenge.week && (
                <div style={{ padding: "0 24px 24px", direction: isRTL ? "rtl" : "ltr" }}>
                  <p style={{ color: "var(--text-muted)", marginBottom: "16px", lineHeight: 1.7, textAlign: isRTL ? "right" : "left" }}>{challenge.description}</p>
                  <div style={{ background: `${challenge.color}11`, border: `1px solid ${challenge.color}22`, borderRadius: "12px", padding: "20px", marginBottom: "20px" }}>
                    <h4 style={{ color: challenge.color, marginBottom: "8px", fontSize: "14px" }}>{isRTL ? "📋 التحدي:" : "📋 The Challenge:"}</h4>
                    <p style={{ color: "var(--text-primary)", fontSize: "14px", lineHeight: 1.7, textAlign: isRTL ? "right" : "left" }}>{challenge.challenge}</p>
                  </div>
                  <div style={{ background: "rgba(251,191,36,0.05)", border: "1px solid rgba(251,191,36,0.2)", borderRadius: "12px", padding: "16px", marginBottom: "20px" }}>
                    <span style={{ color: "var(--accent-amber)", fontWeight: 700, fontSize: "14px" }}>{isRTL ? "🏅 المحطة: " : "🏅 Milestone: "}</span>
                    <span style={{ color: "var(--accent-amber)", fontSize: "14px" }}>{challenge.milestone}</span>
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
          <h2 style={{ fontSize: "36px", fontWeight: 900, color: "var(--accent-amber)", marginBottom: "12px" }}>
            {isRTL ? "شهادة الإنسان السيادي" : "The Sovereign Certificate"}
          </h2>
          <p style={{ color: "var(--text-primary)", fontFamily: "Cairo, sans-serif", fontSize: "22px", marginBottom: "16px" }}>شهادة الإنسان السيادي</p>
          <p style={{ color: "var(--text-muted)", maxWidth: "600px", margin: "0 auto 40px", lineHeight: 1.8, direction: isRTL ? "rtl" : "ltr" }}>
            {isRTL
              ? "بإتمام المراحل الأربع بتتولّد شهادة قابلة للتحقق بتسجّل تقدّمك في البرنامج. بتشمل درجتك في اختبار MIST-20، وسجلّ إكمالك، وشارات التخصص اللي فتحتها."
              : "Completing all 4 phases generates a verifiable certificate that records your progress through the program. It includes your MIST-20 assessment score, your completion record, and the specialization badges you unlocked."}
          </p>
          <p style={{ color: "var(--text-muted)", fontFamily: "Cairo, sans-serif", fontSize: "16px", maxWidth: "600px", margin: "0 auto 40px", lineHeight: 1.9, direction: "rtl", textAlign: "center" }}>
            بإتمام المراحل الأربع تحصل على شهادة قابلة للتحقق تسجّل تقدّمك في البرنامج، وتشمل درجتك في اختبار MIST-20 وسجلّ
            إكمالك وشارات التخصص التي فتحتها.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: "20px", flexWrap: "wrap" }}>
            <Link href="/certificate" style={{ display: "inline-flex", alignItems: "center", gap: "12px", background: "linear-gradient(135deg, #fbbf24, #f59e0b)", borderRadius: "999px", padding: "16px 40px", color: "var(--text-inverse)", fontWeight: 800, fontSize: "18px", textDecoration: "none" }}>
              {isRTL ? "🏆 اعرض الشهادة" : "🏆 View Certificate"}
            </Link>
            <Link href="/assessment" style={{ display: "inline-flex", alignItems: "center", gap: "12px", background: "rgba(251,191,36,0.1)", border: "2px solid rgba(251,191,36,0.3)", borderRadius: "999px", padding: "16px 40px", color: "var(--accent-amber)", fontWeight: 700, fontSize: "18px", textDecoration: "none" }}>
              {isRTL ? "📝 ابدأ التقييم النهائي" : "📝 Take Final Assessment"}
            </Link>
          </div>
        </div>

        {/* Navigation */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "32px", background: "var(--bg-card)", borderRadius: "16px", border: "1px solid var(--border-primary)", flexDirection: isRTL ? "row-reverse" : "row" }}>
          <Link href="/curriculum/phase3" style={{ display: "flex", alignItems: "center", gap: "12px", color: "var(--text-muted)", textDecoration: "none", fontSize: "16px" }}>
            {isRTL ? "→ المرحلة 3: الدفاع الإسلامي" : "← Phase 3: Islamic Defense"}
          </Link>
          <Link href="/curriculum/phase0" style={{ color: "var(--accent-amber)", textDecoration: "none", fontSize: "14px" }}>
            {isRTL ? "📍 رجوع للمرحلة 0" : "📍 Back to Phase 0"}
          </Link>
          <Link href="/explore" style={{ display: "flex", alignItems: "center", gap: "12px", color: "var(--accent-amber)", textDecoration: "none", fontSize: "16px", fontWeight: 700 }}>
            {isRTL ? "🌐 استكشف كل الصفحات ←" : "🌐 Explore All Pages →"}
          </Link>
        </div>
      </div>
      <PageNavigation currentPath="/curriculum/phase4" />
    </div>
  );
}
