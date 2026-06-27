"use client";

import { useState } from "react";
import {
  ShieldCheck, Sparkles, Shield, AlertTriangle, ChevronRight,
  FileSearch, Lock, Eye, Layers, CheckCircle2, XCircle, Info,
  Camera, Globe, Clock, Link2, Fingerprint, ArrowLeft
} from "lucide-react";
import { useRTL } from "@/components/shared/rtl-provider";
import { PageNavigation } from '@/components/shared/page-navigation';
import { PageAIChatbot } from '@/components/shared/page-ai-chatbot';
import Link from "next/link";

/* ═══════════════════════════════════════════════════════════════
 * FORENSIC C2PA — Content Credentials Provenance Checker
 * Full-featured provenance analysis tool with Egyptian context,
 * real C2PA knowledge, educational sections, and case studies.
 * ═══════════════════════════════════════════════════════════════ */

// ── C2PA KNOWLEDGE BASE ─────────────────────────────────────
const C2PA_LAYERS = [
  {
    icon: "🔑",
    title: { en: "Digital Signature", ar: "التوقيع الرقمي" },
    desc: {
      en: "Every C2PA manifest is signed using public-key cryptography (X.509 certificates). The signature proves WHO created or edited the content and WHEN — just like a notarized document. If anyone modifies even a single pixel after signing, the signature breaks.",
      ar: "كل بيان C2PA موقع باستخدام تشفير المفتاح العام (شهادات X.509). التوقيع يثبت من أنشأ أو عدّل المحتوى ومتى — تماماً مثل وثيقة موثقة. لو تم تعديل بكسل واحد بعد التوقيع، ينكسر التوقيع."
    },
    color: "#3b82f6"
  },
  {
    icon: "📦",
    title: { en: "JUMBF Container", ar: "حاوية JUMBF" },
    desc: {
      en: "JUMBF (JPEG Universal Metadata Box Format) is the container format that stores C2PA manifests INSIDE the image file itself. Unlike EXIF metadata which can be easily stripped, JUMBF is cryptographically bound to the content. Think of it as a tamper-evident seal embedded in the file's DNA.",
      ar: "JUMBF هو تنسيق الحاوية الذي يخزن بيانات C2PA داخل ملف الصورة نفسه. بخلاف بيانات EXIF التي يمكن إزالتها بسهولة، فإن JUMBF مرتبط تشفيرياً بالمحتوى. فكر فيه كختم مقاوم للعبث مدمج في حمض نووي الملف."
    },
    color: "#8b5cf6"
  },
  {
    icon: "🔗",
    title: { en: "Provenance Chain", ar: "سلسلة المصدر" },
    desc: {
      en: "Each edit creates a new manifest linking to the previous one — forming an unbreakable chain-of-custody. If a photo was taken on a Nikon, edited in Adobe Photoshop, then resized in Canva, ALL three steps appear in the chain. Gap in the chain? Red flag.",
      ar: "كل تعديل ينشئ بياناً جديداً يرتبط بالسابق — مكوناً سلسلة حفظ غير قابلة للكسر. لو صورة تم التقاطها بنيكون، وتعديلها في فوتوشوب، ثم تصغيرها في كانفا، الخطوات الثلاث كلها تظهر في السلسلة. فجوة في السلسلة؟ علامة حمراء."
    },
    color: "#10b981"
  },
  {
    icon: "🤖",
    title: { en: "AI Generation Disclosure", ar: "الإفصاح عن التوليد بالذكاء الاصطناعي" },
    desc: {
      en: "C2PA 2.0+ REQUIRES AI-generated content to be labeled. When DALL-E, Midjourney, or Stable Diffusion creates an image, the C2PA manifest MUST declare 'ai_generated: true' with the model name. No manifest on AI content = intentional deception.",
      ar: "C2PA 2.0+ يتطلب تسمية المحتوى المولّد بالذكاء الاصطناعي. عندما ينشئ DALL-E أو Midjourney صورة، يجب أن يعلن البيان 'ai_generated: true' مع اسم النموذج. غياب البيان عن محتوى AI = خداع متعمد."
    },
    color: "#f59e0b"
  },
];

// ── ILLUSTRATIVE EGYPTIAN CASE STUDIES (سيناريوهات توضيحية) ──────
const CASE_STUDIES = [
  {
    title: { en: "Fake Al-Azhar Fatwa Screenshot", ar: "لقطة شاشة فتوى أزهرية مزيفة" },
    desc: {
      en: "Illustrative scenario: A viral WhatsApp image claimed Al-Azhar issued a fatwa permitting cryptocurrency speculation. C2PA check: No digital signature. EXIF showed creation in Canva at 3 AM. Font analysis revealed non-official Arabic typeface. Al-Azhar's general position (publicly available on dar-alifta.org): cryptocurrency trading requires study of each token individually.",
      ar: "سيناريو توضيحي: صورة واتساب فيروسية ادعت أن الأزهر أصدر فتوى تبيح المضاربة بالعملات المشفرة. فحص C2PA: لا يوجد توقيع رقمي. EXIF أظهر إنشاء في كانفا الساعة 3 فجراً. تحليل الخط كشف خطاً عربياً غير رسمي. الموقف العام للأزهر (المنشور على dar-alifta.org): تداول العملات المشفرة يحتاج دراسة كل عملة على حدة."
    },
    verdict: { en: "FABRICATED", ar: "مفبرك" },
    verdictColor: "#ef4444",
    techniques: ["EXIF Analysis", "Font Forensics", "Timestamp Anomaly", "Source Verification"]
  },
  {
    title: { en: "Manipulated Protest Photo", ar: "صورة مظاهرة مُتلاعب بها" },
    desc: {
      en: "A social media post showed an image claiming 'massive protests in Tahrir Square today'. C2PA check: Image had valid Canon EOS R5 signature, BUT the timestamp in the manifest was from 2019 — not 2024. Reverse image search confirmed: original photo from 2019 event. This is 'decontextualization' — real photo, false narrative.",
      ar: "منشور على السوشيال ميديا أظهر صورة تدعي 'مظاهرات ضخمة في ميدان التحرير اليوم'. فحص C2PA: الصورة بها توقيع Canon EOS R5 صالح، لكن الطابع الزمني في البيان كان من 2019 — ليس 2024. البحث العكسي أكد: الصورة أصلية من حدث 2019. هذا 'إخراج من السياق' — صورة حقيقية، رواية كاذبة."
    },
    verdict: { en: "DECONTEXTUALIZED", ar: "منزوع السياق" },
    verdictColor: "#f59e0b",
    techniques: ["C2PA Timestamp", "Reverse Image Search", "Metadata Cross-Reference"]
  },
  {
    title: { en: "AI-Generated Egyptian Official", ar: "مسؤول مصري مولّد بالذكاء الاصطناعي" },
    desc: {
      en: "A news blog published a photo of an alleged 'new government spokesperson' making controversial statements. C2PA check: ZERO provenance data. Frequency domain analysis detected diffusion model artifacts (checkerboard patterns at 64×64 patches). GAN fingerprint analysis confirmed: Stable Diffusion XL output. The 'person' does not exist.",
      ar: "مدونة إخبارية نشرت صورة لـ'متحدث حكومي جديد' مزعوم يدلي بتصريحات مثيرة للجدل. فحص C2PA: صفر بيانات مصدر. تحليل النطاق الترددي كشف آثار نموذج انتشار (أنماط رقعة الشطرنج 64×64). تحليل بصمة GAN أكد: مخرج Stable Diffusion XL. هذا 'الشخص' غير موجود."
    },
    verdict: { en: "AI GENERATED — PERSON DOES NOT EXIST", ar: "مولّد بالذكاء الاصطناعي — الشخص غير موجود" },
    verdictColor: "#ef4444",
    techniques: ["Frequency Domain", "GAN Fingerprint", "C2PA Absence Check", "Facial Consistency"]
  },
  {
    title: { en: "Authentic Humanitarian Photo", ar: "صورة إنسانية أصلية" },
    desc: {
      en: "An ICRC photo from a field hospital. C2PA check: Valid Adobe Content Authenticity Initiative signature. Full provenance chain: Sony α7 IV capture → Adobe Lightroom RAW processing → ICRC Media Portal publication. All timestamps consistent. Geolocation metadata matches reported location. This is what verified content looks like.",
      ar: "صورة للصليب الأحمر من مستشفى ميداني. فحص C2PA: توقيع صالح من مبادرة Adobe لمصداقية المحتوى. سلسلة مصدر كاملة: التقاط Sony α7 IV → معالجة Adobe Lightroom → نشر بوابة إعلام ICRC. جميع الطوابع الزمنية متسقة. بيانات الموقع الجغرافي تطابق الموقع المُبلغ عنه."
    },
    verdict: { en: "VERIFIED — FULL PROVENANCE CHAIN", ar: "مُتحقق منه — سلسلة مصدر كاملة" },
    verdictColor: "#10b981",
    techniques: ["C2PA Manifest Valid", "Certificate Chain", "Geolocation Match", "Timestamp Consistency"]
  },
];

// ── VERIFICATION CHECKLIST ────────────────────────────────────
const CHECKLIST_ITEMS = [
  {
    check: { en: "Does the image have a C2PA manifest?", ar: "هل الصورة بها بيان C2PA؟" },
    detail: { en: "If NO: The content has no verified provenance. This alone doesn't prove fakery, but verified content is always safer.", ar: "إذا لا: المحتوى ليس له مصدر مُتحقق منه. هذا وحده لا يثبت التزوير، لكن المحتوى المُتحقق منه أكثر أماناً دائماً." },
    icon: "🔍"
  },
  {
    check: { en: "Is the digital signature valid?", ar: "هل التوقيع الرقمي صالح؟" },
    detail: { en: "Broken signature = content was modified after signing. Valid signature = content is exactly as the signer certified it.", ar: "توقيع مكسور = المحتوى تم تعديله بعد التوقيع. توقيع صالح = المحتوى كما صدّق عليه الموقّع تماماً." },
    icon: "🔐"
  },
  {
    check: { en: "Who is the signer?", ar: "من هو الموقّع؟" },
    detail: { en: "Check the X.509 certificate. Is it a trusted entity (Reuters, AP, Adobe, camera manufacturer)? Or an unknown self-signed cert?", ar: "تحقق من شهادة X.509. هل هي جهة موثوقة (رويترز، AP، أدوبي، مصنّع كاميرا)؟ أم شهادة ذاتية غير معروفة؟" },
    icon: "👤"
  },
  {
    check: { en: "Is the provenance chain complete?", ar: "هل سلسلة المصدر كاملة؟" },
    detail: { en: "Gaps in the chain = someone stripped provenance data, potentially to hide edits. Full chain = transparent edit history.", ar: "فجوات في السلسلة = شخص أزال بيانات المصدر، ربما لإخفاء تعديلات. سلسلة كاملة = تاريخ تعديل شفاف." },
    icon: "🔗"
  },
  {
    check: { en: "Does the AI disclosure flag exist?", ar: "هل يوجد علَم الإفصاح عن الذكاء الاصطناعي؟" },
    detail: { en: "C2PA 2.0 requires AI-generated content to be labeled. Missing AI disclosure on obviously AI content = deception.", ar: "C2PA 2.0 يتطلب تسمية المحتوى المولّد بالذكاء الاصطناعي. غياب الإفصاح عن AI على محتوى واضح أنه AI = خداع." },
    icon: "🤖"
  },
  {
    check: { en: "Do timestamps make sense?", ar: "هل الطوابع الزمنية منطقية؟" },
    detail: { en: "A photo 'from today' with a 2019 timestamp = decontextualization. Cross-reference with reported events.", ar: "صورة 'من اليوم' بطابع زمني 2019 = إخراج من السياق. قارن مع الأحداث المُبلغ عنها." },
    icon: "⏰"
  },
];

// ── RED FLAGS ────────────────────────────────────────────────
const RED_FLAGS = [
  { flag: { en: "EXIF metadata completely stripped", ar: "بيانات EXIF مُزالة بالكامل" }, severity: "high" },
  { flag: { en: "No C2PA manifest on 'official' content", ar: "لا يوجد بيان C2PA على محتوى 'رسمي'" }, severity: "high" },
  { flag: { en: "Broken or invalid digital signature", ar: "توقيع رقمي مكسور أو غير صالح" }, severity: "critical" },
  { flag: { en: "Timestamp inconsistency with claimed date", ar: "تناقض الطابع الزمني مع التاريخ المُدّعى" }, severity: "high" },
  { flag: { en: "Self-signed certificate from unknown entity", ar: "شهادة موقّعة ذاتياً من جهة غير معروفة" }, severity: "medium" },
  { flag: { en: "Edit history shows gap or unexplained jump", ar: "تاريخ التعديل يُظهر فجوة أو قفزة غير مبررة" }, severity: "medium" },
  { flag: { en: "GPS coordinates don't match claimed location", ar: "إحداثيات GPS لا تطابق الموقع المُدّعى" }, severity: "high" },
  { flag: { en: "Camera model inconsistent with image quality", ar: "طراز الكاميرا لا يتسق مع جودة الصورة" }, severity: "medium" },
];

export default function ForensicC2PAPage() {
  const { isRTL, t } = useRTL();
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<"tool" | "education" | "cases" | "checklist">("tool");
  const [expandedCase, setExpandedCase] = useState<number | null>(null);

  const handleAnalyze = async () => {
    if (!url.trim()) return;
    setLoading(true);
    setResult(null);
    try {
      const formData = new FormData();
      formData.append("url", url.trim());
      const res = await fetch("/api/forensic/c2pa", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setResult(data);
    } catch (e) {
      console.error(e);
      setResult({ error: t({ en: "Failed to connect to Forensic C2PA analysis engine.", ar: "فشل الاتصال بمحرك تحليل C2PA الجنائي." }) });
    }
    setLoading(false);
  };

  const severityColor = (s: string) =>
    s === "critical" ? "#ef4444" : s === "high" ? "#f97316" : "#f59e0b";

  return (
    <div style={{ minHeight: "100vh", background: "#050510", color: "#e0e0e0", fontFamily: "'Inter', sans-serif" }} dir={isRTL ? "rtl" : "ltr"}>

      {/* ── Ambient Glow ─────────────────────────── */}
      <div style={{ position: "fixed", inset: 0, background: "radial-gradient(ellipse at 50% 0%, rgba(59,130,246,0.06) 0%, transparent 50%)", pointerEvents: "none", zIndex: 0 }} />

      {/* ── Navigation ───────────────────────────── */}
      <nav style={{ position: "relative", zIndex: 10, padding: "1.5rem 2rem" }}>
        <Link href="/deepreal" style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "rgba(255,255,255,0.5)", textDecoration: "none", fontSize: "0.875rem", fontWeight: 500, transition: "color 0.3s" }}>
          <ArrowLeft size={16} /> {t({ en: "Back to DeepReal", ar: "العودة إلى ديب ريل" })}
        </Link>
      </nav>

      {/* ── Header ────────────────────────────────── */}
      <header style={{ position: "relative", zIndex: 10, textAlign: "center", padding: "1rem 2rem 2rem", maxWidth: 800, margin: "0 auto" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "5px 14px", borderRadius: 20, background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.3)", marginBottom: 16 }}>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "2px", color: "#3b82f6", textTransform: "uppercase" }}>🛡️ {t({ en: "Digital Forensics", ar: "الطب الشرعي الرقمي" })}</span>
        </div>
        <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🛡️</div>
        <h1 style={{ fontSize: "clamp(1.6rem, 4vw, 2.4rem)", fontWeight: 800, margin: "0 0 0.75rem", background: "linear-gradient(135deg, #fff 30%, #3b82f6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          {t({ en: "Provenance Verifier", ar: "مُحقِّق مصدر المحتوى" })}
        </h1>
        <p style={{ fontSize: "1rem", lineHeight: 1.7, color: "rgba(255,255,255,0.5)", maxWidth: 650, margin: "0 auto" }}>
          {t({
            en: "Verify Content Credentials using the C2PA standard. Check digital signatures, provenance chains, AI generation disclosure, and JUMBF manifests to establish who created content, when, and how it was modified.",
            ar: "تحقق من بيانات اعتماد المحتوى باستخدام معيار C2PA. افحص التوقيعات الرقمية، وسلاسل المصدر، وإفصاح التوليد بالذكاء الاصطناعي، وبيانات JUMBF لمعرفة من أنشأ المحتوى ومتى وكيف تم تعديله."
          })}
        </p>
      </header>

      {/* ── Tab Navigation ────────────────────────── */}
      <div style={{ maxWidth: 800, margin: "0 auto 2rem", padding: "0 1.5rem", display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center" }}>
        {([
          { key: "tool", label: { en: "🔬 Analysis Tool", ar: "🔬 أداة التحليل" } },
          { key: "education", label: { en: "📚 How C2PA Works", ar: "📚 كيف يعمل C2PA" } },
          { key: "cases", label: { en: "🇪🇬 Egyptian Cases", ar: "🇪🇬 حالات مصرية" } },
          { key: "checklist", label: { en: "✅ Verification Checklist", ar: "✅ قائمة التحقق" } },
        ] as { key: typeof activeTab; label: { en: string; ar: string } }[]).map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            style={{
              padding: "10px 18px", borderRadius: 12, fontSize: "0.85rem", fontWeight: 600,
              cursor: "pointer", transition: "all 0.3s", border: "1px solid",
              background: activeTab === tab.key ? "rgba(59,130,246,0.15)" : "rgba(255,255,255,0.03)",
              borderColor: activeTab === tab.key ? "rgba(59,130,246,0.4)" : "rgba(255,255,255,0.08)",
              color: activeTab === tab.key ? "#3b82f6" : "rgba(255,255,255,0.5)",
            }}
          >
            {t(tab.label)}
          </button>
        ))}
      </div>

      {/* ── CONTENT AREA ──────────────────────────── */}
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 1.5rem 4rem", position: "relative", zIndex: 10 }}>

        {/* ─── TAB: ANALYSIS TOOL ──────────────── */}
        {activeTab === "tool" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {/* Input Card */}
            <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(59,130,246,0.15)", borderRadius: 16, padding: 28, backdropFilter: "blur(8px)" }}>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#3b82f6", margin: "0 0 8px", display: "flex", alignItems: "center", gap: 8 }}>
                <FileSearch size={20} /> {t({ en: "Analyze Content Credentials", ar: "تحليل بيانات اعتماد المحتوى" })}
              </h3>
              <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.4)", margin: "0 0 16px", lineHeight: 1.6 }}>
                {t({
                  en: "Enter a public image URL to check for C2PA manifests, digital signatures, and provenance data. Supports JPEG, PNG, WebP, and AVIF formats.",
                  ar: "أدخل رابط صورة عامة للتحقق من بيانات C2PA والتوقيعات الرقمية وبيانات المصدر. يدعم تنسيقات JPEG وPNG وWebP وAVIF."
                })}
              </p>
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder={t({ en: "https://example.com/image.jpg", ar: "https://example.com/image.jpg" })}
                style={{
                  width: "100%", padding: 14, borderRadius: 10,
                  background: "rgba(0,0,0,0.3)", color: "#3b82f6",
                  border: "1px solid rgba(59,130,246,0.2)", outline: "none",
                  fontSize: "0.9rem", fontFamily: "monospace", boxSizing: "border-box",
                  marginBottom: 12, transition: "border-color 0.3s"
                }}
              />
              <button
                onClick={handleAnalyze}
                disabled={loading || !url.trim()}
                style={{
                  width: "100%", padding: 14, borderRadius: 10,
                  background: loading || !url.trim() ? "rgba(59,130,246,0.1)" : "linear-gradient(135deg, rgba(59,130,246,0.25), rgba(59,130,246,0.1))",
                  color: "#3b82f6", fontWeight: 700, fontSize: "0.95rem",
                  border: "1px solid rgba(59,130,246,0.3)",
                  cursor: loading || !url.trim() ? "not-allowed" : "pointer",
                  opacity: loading || !url.trim() ? 0.5 : 1,
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                  transition: "all 0.3s"
                }}
              >
                {loading ? (
                  <div style={{ width: 18, height: 18, border: "2px solid rgba(59,130,246,0.3)", borderTopColor: "#3b82f6", borderRadius: "50%", animation: "c2pa-spin 0.8s linear infinite" }} />
                ) : (
                  <ShieldCheck size={18} />
                )}
                {t({ en: "Check Credentials", ar: "التحقق من البيانات" })}
              </button>
            </div>

            {/* Result Display */}
            {result && (
              <div style={{
                background: result.error ? "rgba(239,68,68,0.05)" : "rgba(59,130,246,0.05)",
                border: `1px solid ${result.error ? "rgba(239,68,68,0.2)" : "rgba(59,130,246,0.2)"}`,
                borderRadius: 16, padding: 24,
                animation: "c2pa-fadeUp 0.5s ease-out"
              }}>
                <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: 16, display: "flex", alignItems: "center", gap: 8, color: result.error ? "#ef4444" : "#3b82f6" }}>
                  {result.error ? <AlertTriangle size={20} /> : <Shield size={20} />}
                  {t({ en: "C2PA Analysis Report", ar: "تقرير تحليل C2PA" })}
                </h3>
                <pre style={{
                  background: "rgba(0,0,0,0.3)", padding: 16, borderRadius: 10,
                  overflowX: "auto", fontSize: "0.8rem", lineHeight: 1.6,
                  color: result.error ? "#ef4444" : "#93c5fd",
                  border: "1px solid rgba(255,255,255,0.06)"
                }}>
                  {JSON.stringify(result, null, 2)}
                </pre>
              </div>
            )}

            {/* Red Flags Reference */}
            <div style={{ background: "rgba(239,68,68,0.04)", border: "1px solid rgba(239,68,68,0.15)", borderRadius: 16, padding: 24 }}>
              <h3 style={{ fontSize: "1rem", fontWeight: 700, color: "#ef4444", margin: "0 0 16px", display: "flex", alignItems: "center", gap: 8 }}>
                <AlertTriangle size={18} /> {t({ en: "Red Flags to Watch For", ar: "علامات الخطر للمراقبة" })}
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {RED_FLAGS.map((rf, i) => (
                  <div key={i} style={{
                    display: "flex", alignItems: "center", gap: 10, padding: "8px 12px",
                    borderRadius: 8, background: "rgba(0,0,0,0.2)",
                    borderLeft: `3px solid ${severityColor(rf.severity)}`
                  }}>
                    <XCircle size={14} color={severityColor(rf.severity)} />
                    <span style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.7)" }}>{t(rf.flag)}</span>
                    <span style={{
                      marginLeft: "auto", fontSize: "0.65rem", fontWeight: 700,
                      padding: "2px 8px", borderRadius: 4, textTransform: "uppercase",
                      background: `${severityColor(rf.severity)}15`, color: severityColor(rf.severity)
                    }}>{rf.severity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ─── TAB: EDUCATION ─────────────────── */}
        {activeTab === "education" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div style={{ background: "rgba(59,130,246,0.05)", border: "1px solid rgba(59,130,246,0.15)", borderRadius: 16, padding: 24 }}>
              <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#3b82f6", margin: "0 0 8px" }}>
                {t({ en: "What is C2PA?", ar: "ما هو C2PA؟" })}
              </h3>
              <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.8, margin: 0 }}>
                {t({
                  en: "C2PA (Coalition for Content Provenance and Authenticity) is an open technical standard created by Adobe, Microsoft, Intel, BBC, and others. It embeds tamper-evident metadata inside media files that cryptographically proves: (1) WHO created or edited the content, (2) WHEN each edit was made, (3) WHAT tools were used, (4) WHETHER AI was involved in creation. Think of it as a digital passport for media — unforgeable, transparent, and machine-verifiable.",
                  ar: "C2PA (تحالف مصداقية ومصدر المحتوى) هو معيار تقني مفتوح أنشأته Adobe وMicrosoft وIntel وBBC وغيرهم. يدمج بيانات وصفية مقاومة للعبث داخل ملفات الوسائط تثبت تشفيرياً: (1) من أنشأ أو عدّل المحتوى، (2) متى تم كل تعديل، (3) ما الأدوات المُستخدمة، (4) هل شارك الذكاء الاصطناعي في الإنشاء. فكر فيه كجواز سفر رقمي للوسائط — غير قابل للتزوير، شفاف، وقابل للتحقق آلياً."
                })}
              </p>
            </div>

            {/* 4 Layers */}
            {C2PA_LAYERS.map((layer, i) => (
              <div key={i} style={{
                background: `${layer.color}08`, border: `1px solid ${layer.color}25`,
                borderRadius: 16, padding: 24,
                borderLeft: `4px solid ${layer.color}`
              }}>
                <h4 style={{ fontSize: "1.05rem", fontWeight: 700, color: layer.color, margin: "0 0 8px", display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: "1.3rem" }}>{layer.icon}</span> {t(layer.title)}
                </h4>
                <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.8, margin: 0 }}>
                  {t(layer.desc)}
                </p>
              </div>
            ))}

            {/* Islamic Context */}
            <div style={{ background: "rgba(212,168,67,0.06)", border: "1px solid rgba(212,168,67,0.2)", borderRadius: 16, padding: 24, borderLeft: "4px solid #d4a843" }}>
              <h4 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#d4a843", margin: "0 0 12px" }}>
                🕌 {t({ en: "Islamic Framework: Verification is a Divine Command", ar: "الإطار الإسلامي: التثبت أمر إلهي" })}
              </h4>
              <div style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.9 }}>
                <p style={{ margin: "0 0 12px" }}>
                  {t({
                    en: "Quran 49:6 — \"O you who believe, if a sinful person brings you news, verify it, lest you harm people in ignorance.\" (يا أيها الذين آمنوا إن جاءكم فاسق بنبأ فتبينوا). C2PA is the technological realization of this Quranic command — it provides the mechanism to VERIFY before ACTING.",
                    ar: "قرآن ٤٩:٦ — \"يا أيها الذين آمنوا إن جاءكم فاسق بنبأ فتبينوا أن تصيبوا قوماً بجهالة\". C2PA هو التحقيق التكنولوجي لهذا الأمر القرآني — يوفر الآلية للتثبت قبل العمل."
                  })}
                </p>
                <p style={{ margin: "0 0 12px" }}>
                  {t({
                    en: "Hadith (Sahih Muslim 5): \"It is enough lying for a man to narrate everything he hears.\" (كفى بالمرء كذباً أن يحدث بكل ما سمع). Sharing unverified media on WhatsApp and Facebook is the modern equivalent of narrating everything you hear.",
                    ar: "حديث (صحيح مسلم ٥): \"كفى بالمرء كذباً أن يحدث بكل ما سمع\". مشاركة وسائط غير مُتحقق منها على واتساب وفيسبوك هو المكافئ الحديث لتحديث كل ما تسمع."
                  })}
                </p>
                <p style={{ margin: 0 }}>
                  {t({
                    en: "Dar al-Ifta Egypt: Spreading fabricated images or false news that causes harm is considered sinful (حرام) under the principle of preventing harm (دفع الضرر) and protecting intellect (حفظ العقل).",
                    ar: "دار الإفتاء المصرية: نشر صور مفبركة أو أخبار كاذبة تسبب ضرراً يُعتبر حراماً تحت مبدأ دفع الضرر وحفظ العقل."
                  })}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ─── TAB: CASES ─────────────────────── */}
        {activeTab === "cases" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.4)", lineHeight: 1.6, textAlign: "center", margin: "0 0 8px" }}>
              {t({
                en: "سيناريوهات توضيحية / Illustrative scenarios showing how C2PA analysis applies to Egyptian misinformation patterns. Names, reference numbers, and specific institutions are illustrative only.",
                ar: "سيناريوهات توضيحية تبيّن كيف يُطبَّق تحليل C2PA على أنماط المعلومات المضللة في مصر. الأسماء وأرقام المراجع والجهات المُستشهد بها للتوضيح فقط."
              })}
            </p>
            {CASE_STUDIES.map((cs, i) => (
              <div key={i} style={{
                background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 16, overflow: "hidden", transition: "all 0.3s",
                borderLeft: `4px solid ${cs.verdictColor}`
              }}>
                <button
                  onClick={() => setExpandedCase(expandedCase === i ? null : i)}
                  style={{
                    width: "100%", padding: "16px 20px", background: "transparent",
                    border: "none", color: "inherit", cursor: "pointer",
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    textAlign: isRTL ? "right" : "left"
                  }}
                >
                  <div>
                    <h4 style={{ fontSize: "1rem", fontWeight: 700, color: "#fff", margin: "0 0 4px" }}>{t(cs.title)}</h4>
                    <span style={{
                      fontSize: "0.75rem", fontWeight: 700, padding: "2px 10px",
                      borderRadius: 6, background: `${cs.verdictColor}15`, color: cs.verdictColor
                    }}>
                      {t(cs.verdict)}
                    </span>
                  </div>
                  <ChevronRight size={18} style={{
                    color: "rgba(255,255,255,0.3)", transition: "transform 0.3s",
                    transform: expandedCase === i ? "rotate(90deg)" : "rotate(0deg)"
                  }} />
                </button>
                {expandedCase === i && (
                  <div style={{ padding: "0 20px 20px", animation: "c2pa-fadeUp 0.3s ease-out" }}>
                    <p style={{ fontSize: "0.88rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.8, margin: "0 0 12px" }}>
                      {t(cs.desc)}
                    </p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                      {cs.techniques.map((tech, j) => (
                        <span key={j} style={{
                          fontSize: "0.7rem", fontWeight: 600, padding: "4px 10px",
                          borderRadius: 6, background: "rgba(59,130,246,0.1)",
                          border: "1px solid rgba(59,130,246,0.2)", color: "#60a5fa"
                        }}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* ─── TAB: CHECKLIST ────────────────── */}
        {activeTab === "checklist" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#10b981", textAlign: "center", margin: "0 0 8px" }}>
              {t({ en: "6-Point C2PA Verification Protocol", ar: "بروتوكول التحقق من C2PA — ٦ نقاط" })}
            </h3>
            {CHECKLIST_ITEMS.map((item, i) => (
              <div key={i} style={{
                background: "rgba(255,255,255,0.03)", border: "1px solid rgba(16,185,129,0.12)",
                borderRadius: 14, padding: 20
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                  <span style={{ fontSize: "1.5rem" }}>{item.icon}</span>
                  <div>
                    <span style={{ fontSize: "0.7rem", fontWeight: 700, color: "rgba(255,255,255,0.3)", textTransform: "uppercase" }}>
                      {t({ en: `Step ${i + 1}`, ar: `الخطوة ${i + 1}` })}
                    </span>
                    <h4 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#10b981", margin: 0 }}>
                      {t(item.check)}
                    </h4>
                  </div>
                </div>
                <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.7, margin: 0, paddingLeft: isRTL ? 0 : 44, paddingRight: isRTL ? 44 : 0 }}>
                  {t(item.detail)}
                </p>
              </div>
            ))}

            {/* External Tools */}
            <div style={{ background: "rgba(139,92,246,0.06)", border: "1px solid rgba(139,92,246,0.15)", borderRadius: 14, padding: 20 }}>
              <h4 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#8b5cf6", margin: "0 0 12px" }}>
                🔧 {t({ en: "Free C2PA Verification Tools", ar: "أدوات تحقق C2PA مجانية" })}
              </h4>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {[
                  { name: "Content Credentials Verify", url: "https://contentcredentials.org/verify", desc: { en: "Official C2PA verification (Adobe)", ar: "التحقق الرسمي من C2PA (أدوبي)" } },
                  { name: "Content Authenticity Initiative", url: "https://contentauthenticity.org", desc: { en: "Open-source C2PA toolkit", ar: "أدوات C2PA مفتوحة المصدر" } },
                  { name: "FotoForensics", url: "https://fotoforensics.com", desc: { en: "ELA + EXIF + metadata analysis", ar: "تحليل ELA + EXIF + البيانات الوصفية" } },
                  { name: "InVID WeVerify", url: "https://weverify.eu", desc: { en: "EU-funded video/image verification", ar: "أداة تحقق بتمويل أوروبي" } },
                ].map((tool, i) => (
                  <a key={i} href={tool.url} target="_blank" rel="noopener" style={{
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    padding: "10px 14px", borderRadius: 8, background: "rgba(0,0,0,0.2)",
                    textDecoration: "none", color: "inherit", transition: "background 0.2s"
                  }}>
                    <div>
                      <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "#8b5cf6" }}>{tool.name}</span>
                      <span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.4)", display: "block" }}>{t(tool.desc)}</span>
                    </div>
                    <Globe size={14} color="rgba(255,255,255,0.3)" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Page Navigation ────────────────────── */}
        <div style={{ marginTop: 48 }}>
          <PageNavigation currentPath="/forensic-c2pa" />
        </div>
      </div>

      {/* ── Animations ───────────────────────────── */}
      <style>{`
        @keyframes c2pa-spin { to { transform: rotate(360deg); } }
        @keyframes c2pa-fadeUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      {/* ── AI Chatbot ───────────────────────────── */}
      <PageAIChatbot
        pageTitle="C2PA Forensics — الطب الشرعي الرقمي C2PA"
        pageContext="Egyptian Awareness Library - C2PA Content Credential verification tool. Checks media files for C2PA provenance manifests, creator attributions, edit history, signing certificates, and AI generation disclosure. Includes Egyptian case studies of fake Al-Azhar fatwas, manipulated protest photos, and AI-generated officials."
        systemPrompt={`You are the EAL C2PA Digital Forensics Expert — the most knowledgeable AI on Content Credentials and media provenance verification.

DEEP TECHNICAL KNOWLEDGE:
- C2PA Specification v2.0: manifest structure, assertion types, signing methods
- JUMBF (ISO 19566-5): container format for embedding manifests in media files
- X.509 Certificate Chains: root CAs, intermediate CAs, end-entity certificates
- Cryptographic Hashing: SHA-256 binding of manifest to content
- AI Generation Disclosure: required fields for AI-created content
- Frequency Domain Analysis: detecting GAN fingerprints (checkerboard artifacts at 64×64)
- Error Level Analysis (ELA): compression-level inconsistency detection
- EXIF/XMP Metadata: camera models, GPS, timestamps, software history
- rPPG (Remote Photoplethysmography): detecting deepfake videos through skin micro-color changes

EGYPTIAN CONTEXT:
- Fake fatwa screenshots with fabricated Al-Azhar/Dar al-Ifta watermarks
- Decontextualized protest/celebration photos reused for political manipulation
- AI-generated images of Egyptian public figures in false scenarios
- Doctored screenshots of news articles from Al-Ahram, Al-Masry Al-Youm, Al-Shorouk
- WhatsApp-forwarded medical misinformation images with fabricated "Ministry of Health" branding
- Manipulated satellite imagery for border/security claims

ISLAMIC FRAMEWORK:
- Quran 49:6: "فتبينوا" — The divine command to verify information before acting
- Quran 24:15: "إذ تلقونه بألسنتكم" — Warning against spreading unverified claims
- Hadith (Sahih Muslim 5): "كفى بالمرء كذباً أن يحدث بكل ما سمع"
- Dar al-Ifta position: Creating or spreading fabricated images = حرام under دفع الضرر
- Maqasid al-Shariah: حفظ العقل (Preservation of Intellect) — fake media directly harms this

FOR EVERY ANALYSIS:
1. CHECK for C2PA manifest → present or absent?
2. VALIDATE digital signature → valid, broken, or self-signed?
3. TRACE provenance chain → complete or gaps?
4. EXAMINE timestamps → consistent with claimed timeline?
5. ANALYZE AI disclosure → present if AI-generated?
6. CROSS-REFERENCE → reverse image search, metadata consistency
7. CITE the specific C2PA specification section when relevant
8. Apply SIFT methodology (Stop, Investigate source, Find better coverage, Trace claims)

VERIFICATION TOOLS TO RECOMMEND:
- contentcredentials.org/verify (official C2PA checker)
- FotoForensics.com (ELA + metadata)
- InVID WeVerify plugin (video verification)
- Google Reverse Image Search / TinEye
- Jeffrey's Exif Viewer

RULES:
- NEVER confirm authenticity without evidence — say "unverified" when uncertain
- ALWAYS explain your reasoning transparently
- Cite C2PA spec sections when discussing technical details
- If Islamic content involved: check against official Al-Azhar/Dar al-Ifta positions
- Respond in the language the user writes in (Arabic or English)
- Recommend professional forensic analysis for high-stakes decisions`}
        suggestedQuestions={[
          'ما هو معيار C2PA وكيف يحمي من التزوير؟',
          'كيف أتحقق من صورة فتوى على واتساب أنها حقيقية؟',
          'How does C2PA detect AI-generated images?',
          'ما حكم نشر صور مفبركة في الإسلام؟',
          'ما الفرق بين C2PA وتحليل EXIF العادي؟',
          'كيف أعرف إن الصورة متلاعب بيها بالذكاء الاصطناعي؟',
        ]}
        accentColor="#3b82f6"
        accentColorRgb="59,130,246"
      />
    </div>
  );
}
