"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRTL } from "@/components/shared/rtl-provider";
import { PageNavigation } from '@/components/shared/page-navigation';

const MAP = [
  { category: "🔍 Verification & Forensics", categoryAr: "🔍 التحقق والطب الشرعي الرقمي", color: "#3B82F6", tools: [
    { name: "Angry Debunkers", nameAr: "المفندون الغاضبون", href: "/angry-debunkers", desc: "7 aggressive AI personas challenge your claims" },
    { name: "GOD System", nameAr: "نظام GOD", href: "/god-system", desc: "8-layer analysis engine" },
    { name: "SOVO Orchestrator", nameAr: "منسق SOVO", href: "/sovo", desc: "6-engine scientific verification" },
    { name: "Paper Auditor", nameAr: "مدقق الأبحاث", href: "/paper-auditor", desc: "Academic paper integrity scanner" },
    { name: "Evidence Pyramid", nameAr: "هرم الأدلة", href: "/evidence", desc: "Evidence hierarchy navigator" },
    { name: "Source Registry", nameAr: "سجل المصادر", href: "/sources", desc: "100+ verified source database" },
  ]},
  { category: "🛡️ DeepReal & Media", categoryAr: "🛡️ ديب ريل والإعلام", color: "#EF4444", tools: [
    { name: "DeepReal Dashboard", nameAr: "لوحة ديب ريل", href: "/deepreal", desc: "Multimedia verification command center" },
    { name: "Image Forensics", nameAr: "طب شرعي للصور", href: "/forensic-image", desc: "AI-generated image detection" },
    { name: "C2PA Provenance", nameAr: "مصدر C2PA", href: "/forensic-c2pa", desc: "Content authenticity verification" },
    { name: "OSINT Investigator", nameAr: "محقق OSINT", href: "/osint-investigator", desc: "Open-source intelligence tools" },
    { name: "Blackbox Audit", nameAr: "تدقيق الصندوق الأسود", href: "/blackbox", desc: "Anonymous forensic analysis" },
  ]},
  { category: "🧠 Cognitive Training", categoryAr: "🧠 التدريب المعرفي", color: "#8B5CF6", tools: [
    { name: "Fallacy Engine", nameAr: "محرك المغالطات", href: "/fallacy-engine", desc: "300 fallacies (100 logical + 100 scientific + 100 Islamic)" },
    { name: "Debate Simulator", nameAr: "محاكي المناظرة", href: "/debate-sim", desc: "Socratic debate practice" },
    { name: "Swarm Debate", nameAr: "مناظرة السرب", href: "/swarm-debate", desc: "5 AI opponents simultaneously" },
    { name: "Bias Detector", nameAr: "كاشف التحيز", href: "/bias-detector", desc: "6 cognitive bias identification" },
    { name: "Cognitive Lab", nameAr: "المعمل المعرفي", href: "/cognitive-lab", desc: "Interactive cognitive experiments" },
    { name: "Critical Thinking", nameAr: "التفكير النقدي", href: "/critical-thinking", desc: "30 critical-thinking heuristics" },
    { name: "Reaction Test", nameAr: "اختبار ردة الفعل", href: "/reaction-test", desc: "Claim evaluation speed training" },
  ]},
  { category: "🕌 Islamic Defense", categoryAr: "🕌 الدفاع الإسلامي", color: "#F59E0B", tools: [
    { name: "Hadith Checker", nameAr: "مدقق الأحاديث", href: "/religion-hub/tools/hadith-check", desc: "8-collection hadith verification" },
    { name: "Fatwa Context", nameAr: "سياق الفتوى", href: "/religion-hub/tools/fatwa-context", desc: "Dar Al-Ifta cross-reference" },
    { name: "Sectarian Detector", nameAr: "كاشف الطائفية", href: "/religion-hub/tools/sectarian-detector", desc: "Takfir and manipulation detection" },
    { name: "Quran Context", nameAr: "سياق القرآن", href: "/religion-hub/tools/quran-context", desc: "Tafsir and asbab al-nuzul" },
    { name: "Maqasid Check", nameAr: "فحص المقاصد", href: "/religion-hub/maqasid", desc: "5 essential objectives test" },
    { name: "WhatsApp Checker", nameAr: "فاحص واتساب", href: "/religion-hub/whatsapp", desc: "Islamic message verification" },
  ]},
  { category: "💚 Mental Health", categoryAr: "💚 الصحة النفسية", color: "#10B981", tools: [
    { name: "Mental Health Hub", nameAr: "مركز الصحة النفسية", href: "/mental-health", desc: "14-day wellness program" },
    { name: "Depression Support", nameAr: "دعم الاكتئاب", href: "/mental-health/depression", desc: "Myth-busting and help-seeking" },
    { name: "Drug Checker", nameAr: "مدقق الأدوية", href: "/drug-checker", desc: "Medication information lookup" },
    { name: "Women's Shield", nameAr: "درع المرأة", href: "/womens-shield", desc: "Gender-specific misinformation defense" },
  ]},
  { category: "📊 Intelligence & Monitoring", categoryAr: "📊 الاستخبارات والمراقبة", color: "#06B6D4", tools: [
    { name: "Threat Map", nameAr: "خريطة التهديدات", href: "/threat-map", desc: "Epidemiological misinformation map" },
    { name: "Rumor Heatmap", nameAr: "خريطة حرارة الشائعات", href: "/rumor-heatmap", desc: "Geo-spatial rumor visualization" },
    { name: "Trend Hunter", nameAr: "صياد الاتجاهات", href: "/trend-hunter", desc: "Real-time misinformation tracking" },
    { name: "Kill List", nameAr: "قائمة التصفية", href: "/kill-list", desc: "Most dangerous active claims" },
    { name: "Knowledge Graph", nameAr: "رسم المعرفة", href: "/knowledge-graph", desc: "Misinformation relationship mapping" },
  ]},
];

export default function DefenseMapPage() {
  const { isRTL: a, t } = useRTL();
  const ff = a ? "'Noto Kufi Arabic', sans-serif" : "inherit";
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const totalTools = MAP.reduce((sum, c) => sum + c.tools.length, 0);

  return (
    <div style={{ paddingTop: "var(--navbar-height)", minHeight: "100vh", direction: a ? "rtl" : "ltr" }}>
      <div className="container" style={{ padding: "var(--space-xl) var(--space-lg)", maxWidth: 1100 }}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <h1 style={{ fontSize: 28, marginBottom: 8, fontFamily: ff }}>
            🗺️ {t({ en: "Defense Pages Map", ar: "خريطة صفحات الدفاع", arEG: "خريطة صفحات الدفاع" })}
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: 14, fontFamily: ff }}>
            {t({ en: `${totalTools} defense tools organized by category`, ar: `${totalTools} أداة دفاع منظمة حسب الفئة`, arEG: `${totalTools} أداة دفاع منظمة حسب الفئة` })}
          </p>
        </div>

        {MAP.map((category) => (
          <div key={category.category} style={{ marginBottom: 28 }}>
            <h2 style={{ fontSize: 17, marginBottom: 12, fontFamily: ff, color: category.color, display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ width: 4, height: 24, background: category.color, borderRadius: 2, display: "inline-block" }} />
              {a ? category.categoryAr : category.category}
              <span style={{ fontSize: 12, color: "var(--text-muted)", fontWeight: 400 }}>({category.tools.length})</span>
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: 10 }}>
              {category.tools.map((tool) => (
                <Link key={tool.href} href={tool.href} className="glass-card no-underline" style={{ padding: "12px 16px", color: "inherit", display: "flex", alignItems: "center", gap: 10, transition: "all 0.2s", borderLeft: `3px solid ${category.color}` }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 13, fontFamily: ff }}>{a ? tool.nameAr : tool.name}</div>
                    <div style={{ fontSize: 11, color: "var(--text-muted)" }}>{tool.desc}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}

        <PageNavigation currentPath="/defense-pages-map" />
      </div>
    </div>
  );
}
