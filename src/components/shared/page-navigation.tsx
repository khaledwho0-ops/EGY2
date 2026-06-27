"use client";
import Link from "next/link";
import { useRTL } from "@/components/shared/rtl-provider";

/* ══════════════════════════════════════════════════════
   PAGE NAVIGATION — Category-Based Previous/Next
   Pages navigate WITHIN their category first.
   Shows category badge so user knows where they are.
   ══════════════════════════════════════════════════════ */

interface PageEntry {
  path: string;
  name: string;
  nameAr: string;
  category: string;
  categoryAr: string;
}

const PAGE_ORDER: PageEntry[] = [
  // ─── ONBOARDING ───
  { path: "/the-descent", name: "The Descent (Gateway)", nameAr: "النزول (البوابة)", category: "Onboarding", categoryAr: "البداية" },
  { path: "/welcome", name: "Welcome", nameAr: "مرحباً", category: "Onboarding", categoryAr: "البداية" },
  { path: "/platform-guide", name: "Platform Guide", nameAr: "دليل المنصة", category: "Onboarding", categoryAr: "البداية" },
  { path: "/curriculum", name: "Curriculum", nameAr: "المنهج", category: "Onboarding", categoryAr: "البداية" },
  { path: "/curriculum/phase0", name: "Phase 0: Calibration", nameAr: "المرحلة 0: المعايرة", category: "Onboarding", categoryAr: "البداية" },

  // ─── ASSESSMENT & TRACKING ───
  { path: "/assessment", name: "Assessment Center", nameAr: "مركز التقييم", category: "Assessment", categoryAr: "التقييم" },
  { path: "/transformation", name: "Transformation Tracker", nameAr: "متتبع التحول", category: "Assessment", categoryAr: "التقييم" },
  { path: "/comb-tracker", name: "COM-B Tracker", nameAr: "متتبع التغير السلوكي", category: "Assessment", categoryAr: "التقييم" },
  { path: "/dashboard", name: "Your Dashboard", nameAr: "لوحة التحكم", category: "Assessment", categoryAr: "التقييم" },
  { path: "/certificate", name: "Awareness Certificate", nameAr: "شهادة الوعي", category: "Assessment", categoryAr: "التقييم" },

  // ─── COGNITIVE TRAINING ───
  { path: "/fallacy-engine", name: "Fallacy Engine (300+)", nameAr: "محرك المغالطات", category: "Cognitive Training", categoryAr: "التدريب المعرفي" },
  { path: "/critical-thinking", name: "Critical Thinking Ladder", nameAr: "سلم التفكير النقدي", category: "Cognitive Training", categoryAr: "التدريب المعرفي" },
  { path: "/bias-detector", name: "Bias Detector", nameAr: "كاشف التحيز", category: "Cognitive Training", categoryAr: "التدريب المعرفي" },
  { path: "/bias-fingerprint", name: "Cognitive Bias Fingerprint", nameAr: "بصمة التحيز المعرفي", category: "Cognitive Training", categoryAr: "التدريب المعرفي" },
  { path: "/debate-sim", name: "Socratic Debate Simulator", nameAr: "محاكي المناظرة السقراطية", category: "Cognitive Training", categoryAr: "التدريب المعرفي" },
  { path: "/reaction-test", name: "Reaction Speed Test", nameAr: "اختبار سرعة ردة الفعل", category: "Cognitive Training", categoryAr: "التدريب المعرفي" },
  { path: "/cognitive-lab", name: "Cognitive Lab", nameAr: "المعمل المعرفي", category: "Cognitive Training", categoryAr: "التدريب المعرفي" },
  { path: "/swarm-debate", name: "Swarm Debate", nameAr: "مناظرة السرب", category: "Cognitive Training", categoryAr: "التدريب المعرفي" },

  // ─── VERIFICATION & FORENSICS ───
  { path: "/god-system", name: "GOD System", nameAr: "نظام التحقق الشامل", category: "Verification", categoryAr: "التحقق والطب الشرعي" },
  { path: "/sovo", name: "SOVO Orchestrator", nameAr: "منسق SOVO", category: "Verification", categoryAr: "التحقق والطب الشرعي" },
  { path: "/deepreal", name: "DeepReal Dashboard", nameAr: "لوحة ديب ريل", category: "Verification", categoryAr: "التحقق والطب الشرعي" },
  { path: "/deepreal/game", name: "DeepReal Game Arena", nameAr: "ساحة لعبة ديب ريل", category: "Verification", categoryAr: "التحقق والطب الشرعي" },
  { path: "/forensic-image", name: "Forensic Image Analysis", nameAr: "تحليل الصور الجنائي", category: "Verification", categoryAr: "التحقق والطب الشرعي" },
  { path: "/forensic-c2pa", name: "C2PA Provenance Check", nameAr: "فحص مصدر C2PA", category: "Verification", categoryAr: "التحقق والطب الشرعي" },
  { path: "/blackbox", name: "Black Box Audit", nameAr: "التدقيق الجنائي للصندوق الأسود", category: "Verification", categoryAr: "التحقق والطب الشرعي" },
  { path: "/osint-investigator", name: "OSINT Investigator", nameAr: "محقق OSINT", category: "Verification", categoryAr: "التحقق والطب الشرعي" },
  { path: "/paper-auditor", name: "Paper Auditor", nameAr: "مدقق الأبحاث", category: "Verification", categoryAr: "التحقق والطب الشرعي" },
  { path: "/six-layers", name: "Six Layers Defense", nameAr: "الطبقات الست للدفاع", category: "Verification", categoryAr: "التحقق والطب الشرعي" },

  // ─── EVIDENCE & SOURCES ───
  { path: "/evidence", name: "Evidence Pyramid", nameAr: "هرم الأدلة", category: "Evidence", categoryAr: "الأدلة والمصادر" },
  { path: "/sources", name: "Source Registry", nameAr: "سجل المصادر", category: "Evidence", categoryAr: "الأدلة والمصادر" },
  { path: "/stat-power", name: "Statistical Power Lab", nameAr: "مختبر القوة الإحصائية", category: "Evidence", categoryAr: "الأدلة والمصادر" },
  { path: "/angry-debunkers", name: "Angry Debunkers", nameAr: "المفندون الغاضبون", category: "Evidence", categoryAr: "الأدلة والمصادر" },
  { path: "/epistemology", name: "Epistemology Dashboard", nameAr: "لوحة نظرية المعرفة", category: "Evidence", categoryAr: "الأدلة والمصادر" },

  // ─── LIVE INTELLIGENCE ───
  { path: "/trend-hunter", name: "Trend Hunter", nameAr: "صياد الاتجاهات", category: "Live Intelligence", categoryAr: "الاستخبارات المباشرة" },
  { path: "/live-deception", name: "Live Deception Tracker", nameAr: "متتبع الخداع المباشر", category: "Live Intelligence", categoryAr: "الاستخبارات المباشرة" },
  { path: "/misinfo-atlas", name: "Misinfo Atlas", nameAr: "أطلس المعلومات المضللة", category: "Live Intelligence", categoryAr: "الاستخبارات المباشرة" },
  { path: "/threat-map", name: "Threat Map", nameAr: "خريطة التهديدات", category: "Live Intelligence", categoryAr: "الاستخبارات المباشرة" },
  { path: "/rumor-heatmap", name: "Rumor Heatmap", nameAr: "خريطة الشائعات الحرارية", category: "Live Intelligence", categoryAr: "الاستخبارات المباشرة" },
  { path: "/threat-briefing", name: "Daily Threat Briefing", nameAr: "إحاطة التهديدات اليومية", category: "Live Intelligence", categoryAr: "الاستخبارات المباشرة" },
  { path: "/knowledge-graph", name: "Knowledge Graph", nameAr: "رسم المعرفة", category: "Live Intelligence", categoryAr: "الاستخبارات المباشرة" },

  // ─── MENTAL HEALTH ───
  { path: "/mental-health", name: "Mental Health Hub", nameAr: "مركز الصحة النفسية", category: "Mental Health", categoryAr: "الصحة النفسية" },
  { path: "/mental-health/depression", name: "Depression Program", nameAr: "برنامج الاكتئاب", category: "Mental Health", categoryAr: "الصحة النفسية" },
  { path: "/drug-checker", name: "Drug Interaction Checker", nameAr: "فاحص تفاعل الأدوية", category: "Mental Health", categoryAr: "الصحة النفسية" },
  { path: "/womens-shield", name: "Women's Psychographic Shield", nameAr: "الدرع النفسي للمرأة", category: "Mental Health", categoryAr: "الصحة النفسية" },
  { path: "/mens-shield", name: "Men's Crisis Shield", nameAr: "درع الأزمات للرجل", category: "Mental Health", categoryAr: "الصحة النفسية" },

  // ─── ISLAMIC HUB ───
  { path: "/religion-hub", name: "Islamic Hub", nameAr: "المركز الإسلامي", category: "Islamic Hub", categoryAr: "المركز الإسلامي" },
  { path: "/religion-hub/quran", name: "Quran Study", nameAr: "دراسة القرآن", category: "Islamic Hub", categoryAr: "المركز الإسلامي" },
  { path: "/religion-hub/tools", name: "Islamic Tools", nameAr: "الأدوات الإسلامية", category: "Islamic Hub", categoryAr: "المركز الإسلامي" },
  { path: "/religion-hub/tools/hadith-check", name: "Hadith Checker", nameAr: "مدقق الأحاديث", category: "Islamic Hub", categoryAr: "المركز الإسلامي" },
  { path: "/religion-hub/tools/fatwa-context", name: "Fatwa Context", nameAr: "سياق الفتوى", category: "Islamic Hub", categoryAr: "المركز الإسلامي" },
  { path: "/religion-hub/tools/sectarian-detector", name: "Sectarian Detector", nameAr: "كاشف الطائفية", category: "Islamic Hub", categoryAr: "المركز الإسلامي" },
  { path: "/religion-hub/maqasid", name: "Maqasid Check", nameAr: "فحص المقاصد", category: "Islamic Hub", categoryAr: "المركز الإسلامي" },
  { path: "/religion-hub/whatsapp", name: "WhatsApp Checker", nameAr: "فاحص واتساب الديني", category: "Islamic Hub", categoryAr: "المركز الإسلامي" },
  { path: "/religion-hub/tools/mawarith", name: "Mawarith Calculator", nameAr: "حاسبة المواريث", category: "Islamic Hub", categoryAr: "المركز الإسلامي" },
  { path: "/religion-hub/tools/halal-finance", name: "Halal Finance", nameAr: "التمويل الحلال", category: "Islamic Hub", categoryAr: "المركز الإسلامي" },

  // ─── DEFENSE & GAMES ───
  { path: "/bad-news", name: "Bad News Game", nameAr: "لعبة الأخبار السيئة", category: "Defense Games", categoryAr: "ألعاب الدفاع" },
  { path: "/inoculation-passport", name: "Inoculation Passport", nameAr: "جواز التلقيح", category: "Defense Games", categoryAr: "ألعاب الدفاع" },
  { path: "/manipulation-cards", name: "Manipulation Cards", nameAr: "بطاقات التلاعب", category: "Defense Games", categoryAr: "ألعاب الدفاع" },
  { path: "/peer-challenge", name: "Peer Challenge", nameAr: "تحدي الأقران", category: "Defense Games", categoryAr: "ألعاب الدفاع" },

  // ─── PLATFORM ADMIN ───
  { path: "/supervisor", name: "Supervisor Dashboard", nameAr: "لوحة المشرف", category: "Platform", categoryAr: "المنصة" },
  { path: "/ai-editor", name: "AI Editor", nameAr: "محرر الذكاء الاصطناعي", category: "Platform", categoryAr: "المنصة" },
  { path: "/methodology", name: "Methodology", nameAr: "المنهجية", category: "Platform", categoryAr: "المنصة" },
  { path: "/defense-pages-map", name: "Defense Map", nameAr: "خريطة الدفاع", category: "Platform", categoryAr: "المنصة" },
  { path: "/explore", name: "Explore All", nameAr: "استكشف الكل", category: "Platform", categoryAr: "المنصة" },
  { path: "/why-us", name: "Why Us", nameAr: "لماذا نحن", category: "Platform", categoryAr: "المنصة" },
];

interface Props {
  currentPath: string;
}

export function PageNavigation({ currentPath }: Props) {
  const { isRTL: a } = useRTL();
  const ff = a ? "'Noto Kufi Arabic', sans-serif" : "inherit";

  const currentIndex = PAGE_ORDER.findIndex((p) => p.path === currentPath);
  if (currentIndex === -1) return null;

  const current = PAGE_ORDER[currentIndex];
  const currentCat = current.category;

  // ──────────────────────────────────────────────────────
  // STRICT CATEGORY NAVIGATION — NEVER cross categories
  // ──────────────────────────────────────────────────────
  const categoryPages = PAGE_ORDER.filter((p) => p.category === currentCat);
  const catIndex = categoryPages.findIndex((p) => p.path === currentPath);

  // Only navigate within the SAME category — no cross-category fallback
  const prev = catIndex > 0 ? categoryPages[catIndex - 1] : null;
  const next = catIndex < categoryPages.length - 1 ? categoryPages[catIndex + 1] : null;

  return (
    <div style={{ marginTop: 32, paddingTop: 20, borderTop: "1px solid var(--border-primary, rgba(255,255,255,0.08))" }}>
      {/* Category Badge */}
      <div style={{ textAlign: "center", marginBottom: 16 }}>
        <span style={{
          display: "inline-block", padding: "4px 14px", borderRadius: 20, fontSize: 11,
          fontWeight: 700, letterSpacing: "0.5px", textTransform: "uppercase",
          background: "rgba(99,102,241,0.12)", color: "#818cf8",
          border: "1px solid rgba(99,102,241,0.2)", fontFamily: ff,
        }}>
          {a ? current.categoryAr : current.category}
          <span style={{ margin: "0 6px", opacity: 0.4 }}>•</span>
          {catIndex + 1}/{categoryPages.length}
        </span>
      </div>

      {/* Navigation Links — STRICTLY within same category */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "stretch", gap: 12 }}>
        {prev ? (
          <Link href={prev.path} style={{
            flex: 1, padding: "14px 18px", borderRadius: 14, textDecoration: "none",
            color: "inherit", display: "flex", flexDirection: "column", justifyContent: "center",
            background: "rgba(15,23,42,0.6)", border: "1px solid rgba(255,255,255,0.06)",
            transition: "all 0.2s",
          }}>
            <div style={{ fontSize: 11, color: "#64748b", marginBottom: 4, fontFamily: ff }}>
              {a ? "← السابق" : "← Previous"}
            </div>
            <div style={{ fontSize: 13, fontWeight: 600, fontFamily: ff, color: "#cbd5e1" }}>
              {a ? prev.nameAr : prev.name}
            </div>
          </Link>
        ) : (
          <div style={{
            flex: 1, padding: "14px 18px", borderRadius: 14,
            background: "rgba(15,23,42,0.3)", border: "1px solid rgba(255,255,255,0.03)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <span style={{ fontSize: 11, color: "rgba(255,255,255,0.15)", fontFamily: ff }}>
              {a ? "⏮ بداية الفئة" : "⏮ Start of category"}
            </span>
          </div>
        )}

        {next ? (
          <Link href={next.path} style={{
            flex: 1, padding: "14px 18px", borderRadius: 14, textDecoration: "none",
            color: "inherit", display: "flex", flexDirection: "column", alignItems: "flex-end",
            justifyContent: "center", textAlign: "right",
            background: "rgba(15,23,42,0.6)", border: "1px solid rgba(255,255,255,0.06)",
            transition: "all 0.2s",
          }}>
            <div style={{ fontSize: 11, color: "#64748b", marginBottom: 4, fontFamily: ff }}>
              {a ? "التالي →" : "Next →"}
            </div>
            <div style={{ fontSize: 13, fontWeight: 600, fontFamily: ff, color: "#6366f1" }}>
              {a ? next.nameAr : next.name}
            </div>
          </Link>
        ) : (
          <div style={{
            flex: 1, padding: "14px 18px", borderRadius: 14,
            background: "rgba(15,23,42,0.3)", border: "1px solid rgba(255,255,255,0.03)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <span style={{ fontSize: 11, color: "rgba(255,255,255,0.15)", fontFamily: ff }}>
              {a ? "نهاية الفئة ⏭" : "End of category ⏭"}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export { PAGE_ORDER };
