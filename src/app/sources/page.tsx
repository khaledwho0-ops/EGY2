"use client";

import { SourceRegistry } from "@/components/sources/source-registry";
import { BookOpen, ExternalLink, Shield, Brain, Heart, Microscope, BookMarked } from "lucide-react";
import { TRUSTED_SOURCES } from "@/data/sources/trusted-sources";
import type { SourceEntry } from "@/types";
import { EvidenceSearch } from "@/components/shared/evidence-search";
import { SupportDirectoryPanel } from "@/components/research/support-directory-panel";
import { useRTL } from "@/components/shared/rtl-provider";
import { SRC, s } from "@/data/i18n/site-strings";
import { ComprehensiveResourceDirectory } from "@/components/sources/comprehensive-resource-directory";
import { PageNavigation } from "@/components/shared/page-navigation";
import { PageAIChatbot } from "@/components/shared/page-ai-chatbot";
import ToolGuide from "@/components/ToolGuide";
import React, { useState } from "react";

const sources = TRUSTED_SOURCES as unknown as SourceEntry[];

const FULL_SOURCE_MAP = [
  { category: "Cognitive Science & Psychology", categoryAr: "علم الإدراك وعلم النفس", icon: "🧠", sources: [
    { name: "Kahneman, D. (2011). Thinking, Fast and Slow", where: "Bias Detector, Fallacy Engine, 300 Fallacies, Cognitive Lab", how: "Dual-process theory (System 1/System 2) underpins all bias detection. Anchoring, availability, representativeness heuristics.", whereAr: "كاشف التحيز، محرك المغالطات، المعمل المعرفي", howAr: "نظرية العمليات المزدوجة (نظام 1 ونظام 2) كأساس لكشف التحيزات" },
    { name: "Van der Linden, S. (2023). Foolproof: Why Misinformation Infects Our Minds", where: "Inoculation Passport, Bad News Game, COM-B Tracker", how: "Cognitive inoculation theory — weakened doses of misinformation build immunity. Pre-bunking over debunking.", whereAr: "جواز التلقيح، لعبة الأخبار السيئة، متتبع COM-B", howAr: "نظرية التلقيح المعرفي — جرعات ضعيفة من المعلومات المضللة تبني المناعة" },
    { name: "Roozenbeek, J. & van der Linden, S. (2019). Fake news game confers psychological resistance", where: "Bad News Game, Inoculation Passport", how: "Validated game-based inoculation. Players who play Bad News become 21% better at spotting manipulation.", whereAr: "لعبة الأخبار السيئة، جواز التلقيح", howAr: "التلقيح القائم على الألعاب — اللاعبون يتحسنون بنسبة 21% في كشف التلاعب" },
    { name: "Lewandowsky, S. et al. (2020). The Debunking Handbook", where: "Angry Debunkers, Manipulation Cards, Fallacy Engine", how: "Best practices for debunking: fact sandwich, addressing the gap, avoiding repetition of myths.", whereAr: "المفندون الغاضبون، بطاقات التلاعب، محرك المغالطات", howAr: "أفضل ممارسات التفنيد: ساندويتش الحقائق، سد الفجوة، تجنب تكرار الخرافات" },
    { name: "Pennycook, G. & Rand, D. (2021). MIST-20 Scale", where: "Assessment, Phase 0, Baseline Test, Self-Test Protocol", how: "20-item validated scale measuring misinformation susceptibility. Pre/post assessment tool.", whereAr: "التقييم، المرحلة 0، اختبار خط الأساس", howAr: "مقياس 20 عنصر معتمد لقياس القابلية للمعلومات المضللة" },
    { name: "Beck, A.T. (1979). Cognitive Therapy of Depression", where: "Depression Program, Mental Health Hub, Men's Shield", how: "CBT cognitive restructuring techniques. Automatic thought identification. PHQ-9 basis.", whereAr: "برنامج الاكتئاب، مركز الصحة النفسية، درع الرجل", howAr: "تقنيات إعادة الهيكلة المعرفية CBT. تحديد الأفكار التلقائية" },
    { name: "Kroenke, K. et al. (2001). PHQ-9 Scale", where: "Depression Program, Mental Health Assessment", how: "9-item validated depression screening tool. Severity scoring: 0-4 minimal, 5-9 mild, 10-14 moderate, 15-19 moderately severe, 20-27 severe.", whereAr: "برنامج الاكتئاب، تقييم الصحة النفسية", howAr: "مقياس فحص اكتئاب معتمد من 9 عناصر" },
    { name: "Michie, S. et al. (2011). COM-B Model of Behaviour Change", where: "COM-B Tracker, Behavioral Change Dashboard", how: "Capability + Opportunity + Motivation = Behavior. Framework for measuring real behavioral change, not just knowledge.", whereAr: "متتبع COM-B، لوحة تغيير السلوك", howAr: "القدرة + الفرصة + الدافع = السلوك. إطار لقياس التغيير السلوكي الحقيقي" },
    { name: "Addis, M.E. & Mahalik, J.R. (2003). Men, Masculinity, and Contexts of Help Seeking", where: "Men's Shield", how: "Male masked depression patterns: anger, substance abuse, risk-taking. Help-seeking barriers.", whereAr: "درع الرجل", howAr: "أنماط الاكتئاب المقنع عند الرجال: غضب، تعاطي مواد، مجازفة" },
    { name: "Gross, J.J. & Levenson, R.W. (1997). Hiding Feelings", where: "Men's Shield", how: "Emotional suppression increases cortisol by 40% and cardiovascular risk.", whereAr: "درع الرجل", howAr: "كبت المشاعر يزيد الكورتيزول 40% وخطر أمراض القلب" },
  ]},
  { category: "Islamic Scholarly Sources", categoryAr: "المصادر الإسلامية العلمية", icon: "🕌", sources: [
    { name: "Sahih al-Bukhari (d. 870 CE)", where: "Religion Hub, Hadith Checker, Islamic Shield, Men's Shield", how: "Primary hadith authentication reference. Cross-referenced for isnad verification. Contains 7,275 hadith.", whereAr: "المركز الإسلامي، مدقق الأحاديث، الدرع الإسلامي", howAr: "مرجع أساسي لتوثيق الأحاديث. مراجعة السند. يحتوي 7,275 حديث" },
    { name: "Sahih Muslim (d. 875 CE)", where: "Religion Hub, Hadith Checker", how: "Second most authentic hadith collection. 7,563 hadith used for cross-verification.", whereAr: "المركز الإسلامي، مدقق الأحاديث", howAr: "ثاني أصح مجموعة أحاديث. 7,563 حديث للمراجعة المتقاطعة" },
    { name: "Al-Shatibi (d. 1388). Al-Muwafaqat (Maqasid al-Shariah)", where: "Maqasid Dashboard, Fatwa Context Analyzer", how: "Five objectives framework: preservation of religion, life, intellect, lineage, wealth. Used to evaluate fatwa legitimacy.", whereAr: "لوحة المقاصد، محلل سياق الفتوى", howAr: "إطار المقاصد الخمسة: حفظ الدين والنفس والعقل والنسل والمال" },
    { name: "Ibn Khaldun (d. 1406). Al-Muqaddimah", where: "Islamic Shield, Epistemology Dashboard", how: "Historical criticism methodology. Distinguishing fabricated from authentic historical claims.", whereAr: "الدرع الإسلامي، لوحة نظرية المعرفة", howAr: "منهجية النقد التاريخي. التمييز بين الادعاءات المزيفة والأصيلة" },
    { name: "Dar al-Ifta al-Misriyyah (Egyptian Fatwa House)", where: "Fatwa Context, Religion Hub, Islamic Shield", how: "Official Egyptian fatwas used as reference for legitimate Islamic rulings vs extremist misinterpretation.", whereAr: "سياق الفتوى، المركز الإسلامي", howAr: "الفتاوى الرسمية المصرية كمرجع للأحكام الشرعية مقابل التطرف" },
    { name: "Pargament, K.I. (2007). Brief-RCOPE Scale", where: "Religion Hub, Islamic Coping Assessment", how: "Validated scale for measuring positive/negative religious coping in mental health contexts.", whereAr: "المركز الإسلامي، تقييم التأقلم الديني", howAr: "مقياس معتمد لقياس التأقلم الديني الإيجابي/السلبي في سياقات الصحة النفسية" },
  ]},
  { category: "Egyptian Data & Statistics", categoryAr: "البيانات والإحصائيات المصرية", icon: "🇪🇬", sources: [
    { name: "CAPMAS (Central Agency for Public Mobilization and Statistics)", where: "Men's Shield, Mental Health, Statistics across platform", how: "Official Egyptian statistics: suicide rates, population data, education metrics.", whereAr: "درع الرجل، الصحة النفسية", howAr: "إحصائيات مصرية رسمية: معدلات الانتحار، بيانات السكان" },
    { name: "WHO EMRO (Eastern Mediterranean Regional Office)", where: "Men's Shield, Mental Health, Depression Program", how: "Regional health data: 75% of Egyptian suicides are male, mental health access statistics.", whereAr: "درع الرجل، الصحة النفسية، برنامج الاكتئاب", howAr: "بيانات صحية إقليمية: 75% من حالات الانتحار في مصر ذكور" },
    { name: "Egyptian Drug Authority (EDA/CAPA)", where: "Drug Checker, Medical Tools", how: "Egyptian drug registry. Local drug names (Panadol, Brufen, Antinal) cross-referenced.", whereAr: "مدقق الأدوية", howAr: "سجل الأدوية المصرية. أسماء أدوية محلية" },
    { name: "UNODC (2023). World Drug Report — Egypt Chapter", where: "Men's Shield", how: "3.5x higher substance abuse in Egyptian males vs females.", whereAr: "درع الرجل", howAr: "تعاطي المواد عند الرجال المصريين 3.5 ضعف مقارنة بالنساء" },
    { name: "ILO (2023). Decent Work Country Profile — Egypt", where: "Men's Shield", how: "67% of Egyptian men report 'work is my only identity'. Burnout risk factor.", whereAr: "درع الرجل", howAr: "67% من الرجال المصريين يعتبرون الشغل هويتهم الوحيدة" },
  ]},
  { category: "Verification & Fact-Checking", categoryAr: "التحقق وتدقيق الحقائق", icon: "🔍", sources: [
    { name: "Google Fact Check API (ClaimReview)", where: "Trend Hunter, Fact-Check Integration", how: "Real-time fact-check search across 100+ verified publishers (Reuters, AFP, Misbar, etc.)", whereAr: "صياد التريندات", howAr: "بحث تدقيق حقائق فوري عبر 100+ ناشر معتمد" },
    { name: "C2PA (Coalition for Content Provenance and Authenticity)", where: "Forensic C2PA page", how: "Digital provenance standard for verifying image/video origin and editing history.", whereAr: "صفحة C2PA الجنائية", howAr: "معيار المصدر الرقمي للتحقق من أصل الصور/الفيديو" },
    { name: "SIFT Method (Mike Caulfield, 2019)", where: "Phase 0 Day 11, Lateral Reading exercises", how: "Stop → Investigate → Find → Trace. 4-step verification methodology for online claims.", whereAr: "المرحلة 0 يوم 11، تمارين القراءة الجانبية", howAr: "توقف ← تحقق ← ابحث ← تتبع. منهجية تحقق من 4 خطوات" },
    { name: "CRAAP Test (Blakeslee, 2004)", where: "Source Hierarchy, Critical Thinking", how: "Currency, Relevance, Authority, Accuracy, Purpose — 5 criteria for source evaluation.", whereAr: "تسلسل المصادر، التفكير النقدي", howAr: "5 معايير لتقييم المصادر: الحداثة، الصلة، السلطة، الدقة، الغرض" },
  ]},
  { category: "AI & Technology APIs", categoryAr: "الذكاء الاصطناعي والتكنولوجيا", icon: "🤖", sources: [
    { name: "NVIDIA NIM API (LLM Inference)", where: "AI Editor, Chatbot, Prompt Lab, NVIDIA Hub", how: "Powers AI chat interfaces. Models: Llama 3.1-70B, Mistral. Used for real-time claim analysis.", whereAr: "محرر الذكاء الاصطناعي، الدردشة، معمل البرومبت", howAr: "تشغيل واجهات دردشة الذكاء الاصطناعي. تحليل الادعاءات الفوري" },
    { name: "Gemini API (Google)", where: "AI Editor, Fallacy Detection, Islamic Context", how: "Multi-modal analysis. Fallacy detection engine. Arabic natural language understanding.", whereAr: "محرر الذكاء الاصطناعي، كشف المغالطات", howAr: "تحليل متعدد الوسائط. محرك كشف المغالطات. فهم اللغة العربية" },
    { name: "FDA/DailyMed/RxNorm (via OpenFDA API)", where: "Drug Checker, Drug Interaction Analysis", how: "Drug interaction databases. FDA adverse events. Egyptian drug name mapping.", whereAr: "مدقق الأدوية", howAr: "قواعد بيانات تفاعلات الأدوية. أحداث FDA الضارة" },
    { name: "SUS (System Usability Scale, Brooke 1996)", where: "UX Science, Platform Evaluation", how: "10-item usability questionnaire. Score > 68 = above average. Used for platform quality metrics.", whereAr: "علم تجربة المستخدم، تقييم المنصة", howAr: "استبيان قابلية الاستخدام من 10 عناصر" },
  ]},
  { category: "Medical & Mental Health", categoryAr: "الطب والصحة النفسية", icon: "🏥", sources: [
    { name: "DSM-5-TR (APA, 2022)", where: "Depression Program, Mental Health Hub", how: "Diagnostic criteria for Major Depressive Disorder, anxiety disorders. Classification reference.", whereAr: "برنامج الاكتئاب، مركز الصحة النفسية", howAr: "معايير تشخيص اضطراب الاكتئاب الرئيسي" },
    { name: "GHSQ (General Help-Seeking Questionnaire)", where: "Men's Shield, Women's Shield", how: "Measures willingness to seek professional help. 83% of Egyptian men score low.", whereAr: "درع الرجل، درع المرأة", howAr: "يقيس الاستعداد لطلب المساعدة المهنية. 83% من الرجال المصريين يسجلون منخفض" },
    { name: "Ain Shams University — Psychiatry Department", where: "Men's Shield, Depression Program", how: "Egyptian clinical data on male depression recovery rates with early treatment.", whereAr: "درع الرجل، برنامج الاكتئاب", howAr: "بيانات سريرية مصرية عن معدلات تعافي الرجال من الاكتئاب" },
    { name: "Egyptian Ministry of Health — Hotline 15335", where: "Men's Shield, Women's Shield, Mental Health", how: "National mental health support line. Listed as crisis resource on all mental health pages.", whereAr: "درع الرجل، درع المرأة، الصحة النفسية", howAr: "خط المساندة الوطني للصحة النفسية" },
  ]},
];

export default function SourcesPage() {
  const { isRTL, t } = useRTL();
  const a = isRTL;
  const ff = a ? "'Noto Kufi Arabic', sans-serif" : "inherit";
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  return (
    <>
    <div style={{ paddingTop: "var(--navbar-height)", direction: a ? "rtl" : "ltr" }}>
      <div className="container" style={{ padding: "var(--space-xl) var(--space-lg)" }}>
        <div className="flex items-center gap-3 mb-2">
          <BookOpen size={28} style={{ color: "var(--accent-cta)" }} />
          <h1 style={{ fontSize: "var(--font-h2)" }}>
            <span className="text-gradient">{s(SRC.title, a)}</span>
          </h1>
        </div>
        <p style={{ color: "var(--text-muted)", marginBottom: "var(--space-md)", maxWidth: 700, fontFamily: ff, lineHeight: 1.7 }}>
          {t({ en: `${sources.length} verified sources powering every claim, tool, and assessment on this platform. Below you can see exactly WHERE each source is used and HOW.`, ar: `${sources.length} مصدر موثق يدعم كل ادعاء وأداة وتقييم على هذه المنصة. أدناه يمكنك رؤية أين يُستخدم كل مصدر وكيف بالتحديد.` })}
        </p>

        {/* Source Freshness Health Summary */}
        {(() => {
          const now = Date.now();
          let fresh = 0, aging = 0, stale = 0, critical = 0;
          for (const src of sources) {
            if (!src.lastVerified) { critical++; continue; }
            const days = Math.floor((now - new Date(src.lastVerified).getTime()) / 86400000);
            if (days <= 90) fresh++;
            else if (days <= 180) aging++;
            else if (days <= 365) stale++;
            else critical++;
          }
          return (
            <div className="glass-card mb-6" style={{ padding: "var(--space-md) var(--space-lg)", display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
              <span style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-secondary)", fontFamily: ff }}>{t({ en: "Source Freshness:", ar: "حداثة المصادر:", arEG: "حداثة المصادر:" })}</span>
              <span className="badge" style={{ background: "rgba(16,185,129,0.1)", color: "#10b981", border: "1px solid rgba(16,185,129,0.2)" }}>✓ {fresh} {t({ en: "fresh", ar: "محدّث", arEG: "محدّث" })}</span>
              {aging > 0 && <span className="badge" style={{ background: "rgba(245,158,11,0.1)", color: "#f59e0b", border: "1px solid rgba(245,158,11,0.2)" }}>⏳ {aging} {t({ en: "aging", ar: "قديم", arEG: "قديم" })}</span>}
              {stale > 0 && <span className="badge" style={{ background: "rgba(239,68,68,0.1)", color: "#ef4444", border: "1px solid rgba(239,68,68,0.2)" }}>⚠ {stale} {t({ en: "stale", ar: "تحذير", arEG: "تحذير" })}</span>}
              {critical > 0 && <span className="badge" style={{ background: "rgba(220,38,38,0.1)", color: "#dc2626", border: "1px solid rgba(220,38,38,0.2)" }}>🚨 {critical} {t({ en: "critical", ar: "حرج", arEG: "حرج" })}</span>}
            </div>
          );
        })()}

        {/* HOW TO USE THIS BIBLIOGRAPHY — reusable ToolGuide */}
        <ToolGuide
          titleEn="How to use this bibliography"
          titleAr="كيفية استخدام قائمة المصادر"
          whoBenefits={{
            en: "Anyone in Egypt who gets a WhatsApp forward, a fatwa screenshot, or a 'doctor said' voice note and wants to check whether a REAL, named source backs it — or debunks it — before sharing.",
            ar: "أي حد في مصر بيوصله فورورد واتساب أو سكرين شوت فتوى أو فويس نوت «الدكتور قال» وعايز يتأكد إن فيه مصدر حقيقي ومُسمَّى بيأكد الكلام أو بيكذّبه قبل ما يعمل شير.",
          }}
          steps={[
            { en: "Pick the topic of the claim (health, religion, an Egyptian statistic, fact-checking). Open the matching category in the Complete Source Map below.", ar: "اختر موضوع الادعاء (صحة، دين، إحصائية مصرية، تدقيق حقائق)، وافتح التصنيف المناسب في خريطة المصادر بالأسفل." },
            { en: "Read the source NAME and the 'HOW USED' note — that is the named, resolvable source. If a claim has no source like these, treat it as unverified.", ar: "اقرأ اسم المصدر وملاحظة «كيف يُستخدم» — ده المصدر المُسمَّى القابل للتتبع. لو الادعاء مالوش مصدر زي دول، اعتبره غير موثَّق." },
            { en: "Check the TIER: ask the page chatbot below to rate any source (Tier 1 Gold / Tier 2 Silver / Tier 3 Check / Red Flag) so you know how much weight it carries.", ar: "اتأكد من المستوى: اسأل شات بوت الصفحة بالأسفل يصنّف أي مصدر (المستوى 1 ذهبي / 2 فضي / 3 راجِع / علم أحمر) عشان تعرف وزنه." },
            { en: "To cite a source, copy its full name (author, year, title) exactly as written, plus where it is used on this platform.", ar: "لو عايز توثّق مصدر، انسخ اسمه الكامل (المؤلف، السنة، العنوان) زي ما هو بالظبط، مع مكان استخدامه في المنصة." },
            { en: "Use the Egyptian fact-checkers and official bodies (Dar al-Ifta, CAPMAS) listed here to verify before you forward anything.", ar: "استخدم مدققي الحقائق المصريين والجهات الرسمية (دار الإفتاء، الجهاز المركزي للإحصاء) المذكورين هنا للتحقق قبل أي إعادة إرسال." },
          ]}
          scenarios={[
            { label: "‘Garlic / lemon cures cancer’ forward", labelAr: "فورورد «الثوم/الليمون بيعالج السرطان»", input: "Medical & Mental Health", tag: "health" },
            { label: "‘A fatwa screenshot, no chain’", labelAr: "«سكرين شوت فتوى من غير سند»", input: "Islamic Scholarly Sources", tag: "religion" },
            { label: "‘Suicide is rare in Egypt’ claim", labelAr: "ادعاء «الانتحار نادر في مصر»", input: "Egyptian Data & Statistics", tag: "stats" },
            { label: "‘This viral image is real’ doubt", labelAr: "شك «الصورة المنتشرة دي حقيقية»", input: "Verification & Fact-Checking", tag: "verify" },
          ]}
          onTry={(category) => {
            setExpandedCategory(category);
            if (typeof document !== "undefined") {
              document.getElementById("source-map")?.scrollIntoView({ behavior: "smooth", block: "start" });
            }
          }}
          lang={a ? "ar" : "en"}
          accent="#6366f1"
        />

        {/* COMPREHENSIVE SOURCE MAP — WHERE & HOW EACH SOURCE IS USED */}
        <div id="source-map" style={{ marginBottom: 32, scrollMarginTop: "calc(var(--navbar-height) + 16px)" }}>
          <h2 style={{ fontSize: "1.5rem", marginBottom: 16, fontFamily: ff }}>
            {t({ en: "Complete Source Map — Where & How Every Source Is Used", ar: "خريطة المصادر الشاملة — أين وكيف يُستخدم كل مصدر" })}
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {FULL_SOURCE_MAP.map((cat) => (
              <div key={cat.category} className="glass-card" style={{ overflow: "hidden" }}>
                <button
                  onClick={() => setExpandedCategory(expandedCategory === cat.category ? null : cat.category)}
                  style={{
                    width: "100%", padding: "16px 24px", border: "none", background: "transparent",
                    display: "flex", alignItems: "center", gap: 12, cursor: "pointer", color: "var(--text-base)",
                    fontSize: "1.1rem", fontWeight: 700, fontFamily: ff, textAlign: a ? "right" : "left",
                  }}
                >
                  <span style={{ fontSize: 24 }}>{cat.icon}</span>
                  <span>{a ? cat.categoryAr : cat.category}</span>
                  <span style={{ marginLeft: "auto", fontSize: 13, color: "var(--text-muted)", fontWeight: 400 }}>
                    {cat.sources.length} {t({ en: "sources", ar: "مصادر" })}
                  </span>
                  <span style={{ fontSize: 16, transition: "transform 0.2s", transform: expandedCategory === cat.category ? "rotate(180deg)" : "rotate(0)" }}>▼</span>
                </button>
                {expandedCategory === cat.category && (
                  <div style={{ padding: "0 24px 20px", display: "flex", flexDirection: "column", gap: 12 }}>
                    {cat.sources.map((src, i) => (
                      <div key={i} style={{ padding: 16, backgroundColor: "var(--bg-base)", borderRadius: 8, border: "1px solid var(--border)", borderLeft: "3px solid var(--accent-primary)" }}>
                        <div style={{ fontWeight: 700, fontSize: "0.95rem", marginBottom: 8, color: "var(--text-base)" }}>📚 {src.name}</div>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, fontSize: "0.85rem" }}>
                          <div>
                            <div style={{ fontWeight: 600, color: "var(--accent-primary)", marginBottom: 4, fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: 1 }}>
                              {t({ en: "📍 WHERE USED", ar: "📍 أين يُستخدم" })}
                            </div>
                            <div style={{ color: "var(--text-secondary)", lineHeight: 1.6 }}>{a ? src.whereAr : src.where}</div>
                          </div>
                          <div>
                            <div style={{ fontWeight: 600, color: "#10B981", marginBottom: 4, fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: 1 }}>
                              {t({ en: "⚙️ HOW USED", ar: "⚙️ كيف يُستخدم" })}
                            </div>
                            <div style={{ color: "var(--text-secondary)", lineHeight: 1.6 }}>{a ? src.howAr : src.how}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <EvidenceSearch />

        <ComprehensiveResourceDirectory />

        <div style={{ marginTop: "var(--space-2xl)" }}>
          <SupportDirectoryPanel title={s(SRC.supportTitle, a)} />
        </div>
        
        <div style={{ marginTop: "var(--space-2xl)" }}>
          <SourceRegistry sources={sources} />
        </div>

        <PageNavigation currentPath="/sources" />
      </div>
    </div>

    <PageAIChatbot
      pageTitle="Source Registry — سجل المصادر"
      pageContext="Egyptian Awareness Library - Source Registry: Curated database of trusted sources across science, Islamic scholarship, Egyptian law, and mental health. Includes credibility ratings, bias indicators, and verification methodology."
      systemPrompt={`You are the EAL Source Credibility AI. You help users identify and evaluate trustworthy sources.

SOURCE TIERS:
Tier 1 (Gold): WHO, Lancet, NEJM, Nature, Cochrane Reviews, PubMed, Al-Azhar Fatwa Council, Egyptian Dar al-Ifta, CAPMAS
Tier 2 (Silver): CDC, NHS, BBC Arabic, Reuters Arabic, AFP Arabic, Al-Ahram (established content)
Tier 3 (Check): Social media accounts, blogs, WhatsApp forwards, YouTube channels
Red Flag: Anonymous sources, no date, no author, privacy-protected domain, <30 day old website

EGYPTIAN FACT-CHECKERS:
- Matsda2sh: matsda2sh.com (Egyptian Arabic)
- Misbar: misbar.com/ar (Arabic)
- AFP Arabic: factcheck.afp.com/list/ar
- Google Fact Check Explorer: toolbox.google.com/factcheck
- Snopes (English): snopes.com

ISLAMIC SOURCE CREDIBILITY:
- Al-Azhar Al-Sharif: azhar.eg (official)
- Dar al-Ifta Al-Misriyya: dar-alifta.org (official Egyptian)
- Islam QA: islamqa.info (Saudi, conservative Hanbali)
- Islamweb: islamweb.net (Qatar, diverse madhabs)
- AVOID: Anonymous 'Islamic' Facebook pages, unattributed fatwa screenshots

TEACH users how to WHOIS a domain, check Alexa rank, find author credentials.`}
      suggestedQuestions={[
        'ما هي أفضل مواقع التحقق باللغة العربية؟',
        'كيف أعرف إذا كان موقع أخباري موثوقاًبه؟',
        'How do I verify if an Al-Azhar fatwa is authentic?',
        'What makes a scientific source credible?',
      ]}
      accentColor="#6366f1"
      accentColorRgb="99,102,241"
    />
    </>
  );
}
