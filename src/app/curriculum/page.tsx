"use client";
import { PageNavigation } from '@/components/shared/page-navigation';
import Link from "next/link";
import { useRTL } from "@/components/shared/rtl-provider";

const PHASES = [
  { id: 0, path: "/curriculum/phase0", emoji: "🔧", name: "Calibration", nameAr: "المعايرة", desc: "14-day baseline assessment: MIST-20, Bias Fingerprinting, PHQ-9, Source Hierarchy Drills. Establishes cognitive immunity baseline.", descAr: "تقييم خط الأساس 14 يوم: MIST-20، بصمة التحيز، PHQ-9، تدريبات تسلسل المصادر.", color: "#14b8a6", days: "14 days" },
  { id: 1, path: "/curriculum/phase1", emoji: "🧠", name: "Cognitive Armor", nameAr: "الدرع المعرفي", desc: "Mental-health myth cards (4 active exercises), fallacy-engine tool, 6-layer verification, Cognitive Behavioral Inoculation (CBI), GOD System training.", descAr: "بطاقات أساطير الصحة النفسية (4 تمارين نشطة)، محرك المغالطات، التحقق من 6 طبقات، التلقيح المعرفي السلوكي، تدريب نظام GOD.", color: "#6366f1", days: "30 days" },
  { id: 2, path: "/curriculum/phase2", emoji: "🔬", name: "Deep Verification", nameAr: "التحقق العميق", desc: "DeepReal forensics, OSINT investigation, Paper Auditor, C2PA provenance, Statistical Power Lab.", descAr: "الطب الشرعي ديب ريل، تحقيق OSINT، مدقق الأبحاث، مصدر C2PA، مختبر القوة الإحصائية.", color: "#f59e0b", days: "30 days" },
  { id: 3, path: "/curriculum/phase3", emoji: "🕌", name: "Islamic Shield", nameAr: "الدرع الإسلامي", desc: "Hadith authentication, Fatwa context analysis, Sectarian detection, Maqasid al-Shariah framework, WhatsApp Islamic fact-checking.", descAr: "توثيق الأحاديث، تحليل سياق الفتوى، كشف الطائفية، إطار مقاصد الشريعة، تدقيق حقائق واتساب الإسلامية.", color: "#ec4899", days: "30 days" },
  { id: 4, path: "/curriculum/phase4", emoji: "⚔️", name: "Live Defense", nameAr: "الدفاع المباشر", desc: "Socratic Swarm Debate, Bad News Game, Inoculation Passport, Threat Map monitoring, Real-time deception detection.", descAr: "مناظرة السرب السقراطي، لعبة الأخبار السيئة، جواز التلقيح، مراقبة خريطة التهديدات.", color: "#ef4444", days: "30 days" },
];

export default function CurriculumPage() {
  const { isRTL: a, t } = useRTL();
  const ff = a ? "'Noto Kufi Arabic', sans-serif" : "inherit";

  return (
    <div style={{ paddingTop: "var(--navbar-height)", minHeight: "100vh", direction: a ? "rtl" : "ltr" }}>
      <div className="container" style={{ padding: "var(--space-xl) var(--space-lg)", maxWidth: 1000 }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ width: 80, height: 80, borderRadius: "50%", background: "linear-gradient(135deg, rgba(99,102,241,0.15), rgba(20,184,166,0.15))", border: "2px solid rgba(99,102,241,0.3)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", fontSize: 36 }}>📚</div>
          <h1 style={{ fontSize: 28, marginBottom: 8, fontFamily: ff }}>
            {t({ en: "Sovereign Curriculum — 5 Phases, Cognitive Sovereignty", ar: "المنهج السيادي — 5 مراحل للسيادة المعرفية", arEG: "المنهج السيادي — 5 مراحل للسيادة المعرفية" })}
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: 14, maxWidth: 600, margin: "0 auto", lineHeight: 1.7, fontFamily: ff }}>
            {t({ en: "5 phases. Built on Kahneman, Van der Linden, Roozenbeek, Lewandowsky, and Pargament. Each phase builds cognitive defenses systematically.", ar: "5 مراحل. مبني على كانمان وفان دير ليندن وروزنبيك ولواندوفسكي وبارغامينت. كل مرحلة تبني الدفاعات المعرفية بشكل منهجي.", arEG: "5 مراحل. كل مرحلة بتبني الدفاعات المعرفية بشكل منهجي." })}
          </p>
        </div>

        {/* Phase Timeline */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {PHASES.map((p, i) => (
            <Link href={p.path} key={p.id} className="glass-card" style={{ padding: 24, textDecoration: "none", color: "inherit", display: "grid", gridTemplateColumns: "60px 1fr auto", gap: 16, alignItems: "center", borderLeft: `4px solid ${p.color}`, transition: "all 0.2s" }}>
              <div style={{ width: 52, height: 52, borderRadius: 12, background: `${p.color}15`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28 }}>
                {p.emoji}
              </div>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: p.color, textTransform: "uppercase", letterSpacing: 1 }}>
                  {t({ en: `Phase ${p.id}`, ar: `المرحلة ${p.id}`, arEG: `المرحلة ${p.id}` })} • {p.days}
                </div>
                <div style={{ fontSize: 17, fontWeight: 700, marginBottom: 4, fontFamily: ff }}>{a ? p.nameAr : p.name}</div>
                <div style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.6, fontFamily: ff }}>{a ? p.descAr : p.desc}</div>
              </div>
              <div style={{ fontSize: 18, color: "var(--text-muted)", opacity: 0.5 }}>{a ? "←" : "→"}</div>
            </Link>
          ))}
        </div>

        {/* Key Metrics */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginTop: 24 }}>
          {[
            { n: "~42", l: "Guided Days", lAr: "يوم موجَّه", c: "#6366f1" },
            { n: "33", l: "Science Exercises", lAr: "تمرين علمي", c: "#14b8a6" },
            { n: "5", l: "Phases", lAr: "مرحلة", c: "#f59e0b" },
            { n: "5", l: "Validated Scales", lAr: "مقاييس معتمدة", c: "#ec4899" },
          ].map((m, i) => (
            <div key={i} className="glass-card" style={{ padding: 16, textAlign: "center" }}>
              <div style={{ fontSize: 24, fontWeight: 900, color: m.c }}>{m.n}</div>
              <div style={{ fontSize: 11, color: "var(--text-muted)", fontFamily: ff }}>{a ? m.lAr : m.l}</div>
            </div>
          ))}
        </div>

        <PageNavigation currentPath="/curriculum" />
      </div>
    </div>
  );
}
