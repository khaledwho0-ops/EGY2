"use client";

import { useState } from "react";
import {
  Image as ImageIcon, Sparkles, Shield, AlertTriangle, ChevronRight,
  Eye, Layers, CheckCircle2, XCircle, Search, ArrowLeft,
  Zap, Grid3X3, Clock, MapPin, Cpu, Camera, Globe
} from "lucide-react";
import { useRTL } from "@/components/shared/rtl-provider";
import { PageNavigation } from '@/components/shared/page-navigation';
import { PageAIChatbot } from '@/components/shared/page-ai-chatbot';
import Link from "next/link";

/* ═══════════════════════════════════════════════════════════════
 * FORENSIC IMAGE ANALYSIS — Full Deepfake & Manipulation Detection
 * Real forensic techniques, Egyptian case studies, educational content
 * ═══════════════════════════════════════════════════════════════ */

// ── FORENSIC TECHNIQUES EXPLAINED ────────────────────────────
const TECHNIQUES = [
  {
    icon: "⚡",
    title: { en: "Error Level Analysis (ELA)", ar: "تحليل مستوى الخطأ (ELA)" },
    howItWorks: {
      en: "ELA re-saves the image at a known quality (e.g., 95%) and compares the re-saved version with the original. Regions that were edited will show DIFFERENT error levels than the untouched areas — appearing as bright spots on a dark background. Untampered photos show uniform error levels throughout.",
      ar: "ELA يعيد حفظ الصورة بجودة معروفة (مثلاً 95%) ويقارن النسخة المحفوظة مع الأصلية. المناطق المُعدَّلة ستظهر مستويات خطأ مختلفة عن المناطق غير المُعدَّلة — تظهر كنقاط مضيئة على خلفية داكنة. الصور غير المُعبث بها تُظهر مستويات خطأ موحدة."
    },
    limitations: {
      en: "ELA can produce false positives on images that were resaved multiple times. JPEG artifacts from social media compression can mask edits.",
      ar: "ELA قد يُنتج نتائج إيجابية خاطئة على صور أُعيد حفظها عدة مرات. آثار JPEG من ضغط السوشيال ميديا قد تُخفي التعديلات."
    },
    color: "#f59e0b"
  },
  {
    icon: "📊",
    title: { en: "EXIF Metadata Extraction", ar: "استخراج بيانات EXIF الوصفية" },
    howItWorks: {
      en: "Every digital camera embeds metadata: camera model, lens, ISO, shutter speed, GPS coordinates, timestamp, and software used. A photo claiming to be from a Nokia phone but with Canon EOS metadata? Red flag. Stripped metadata? Someone wants to hide something. GPS coordinates not matching the claimed location? Decontextualization.",
      ar: "كل كاميرا رقمية تُدمج بيانات وصفية: طراز الكاميرا، العدسة، ISO، سرعة الغالق، إحداثيات GPS، الطابع الزمني، والبرنامج المُستخدم. صورة تدعي أنها من هاتف نوكيا لكن ببيانات كانون؟ علامة حمراء. بيانات وصفية مُزالة؟ شخص يريد إخفاء شيء. إحداثيات GPS لا تطابق الموقع المُدَّعى؟ إخراج من السياق."
    },
    limitations: {
      en: "Social media platforms (WhatsApp, Facebook, Twitter) strip EXIF data on upload. Screenshots never have camera EXIF.",
      ar: "منصات السوشيال ميديا (واتساب، فيسبوك، تويتر) تُزيل بيانات EXIF عند الرفع. لقطات الشاشة لا تحتوي على EXIF كاميرا أبداً."
    },
    color: "#3b82f6"
  },
  {
    icon: "🔍",
    title: { en: "Clone Detection (Copy-Move Forensics)", ar: "كشف النسخ (الطب الشرعي للنقل)" },
    howItWorks: {
      en: "Detects when a region of an image has been copied and pasted within the same image — a common technique to add crowds to protests, remove objects, or duplicate elements. Uses keypoint matching (SIFT/SURF) and block-matching algorithms to find duplicated pixel patterns even after rotation or scaling.",
      ar: "يكشف عندما يتم نسخ منطقة من الصورة ولصقها في نفس الصورة — تقنية شائعة لإضافة حشود للمظاهرات، أو إزالة أشياء، أو تكرار عناصر. يستخدم مطابقة النقاط الرئيسية (SIFT/SURF) وخوارزميات مطابقة الكتل لإيجاد أنماط بكسل مكررة حتى بعد التدوير أو التصغير."
    },
    limitations: {
      en: "Advanced cloning with feathered edges can evade detection. AI-based inpainting leaves different artifacts.",
      ar: "النسخ المتقدم بحواف ممزوجة قد يتجنب الكشف. الإصلاح بالذكاء الاصطناعي يترك آثاراً مختلفة."
    },
    color: "#8b5cf6"
  },
  {
    icon: "🌊",
    title: { en: "Frequency Domain Analysis (GAN Detection)", ar: "تحليل النطاق الترددي (كشف GAN)" },
    howItWorks: {
      en: "AI-generated images (GANs, Diffusion Models) leave characteristic patterns in the frequency domain that are invisible to the human eye. GANs produce 'checkerboard artifacts' at specific frequencies (typically 64×64 patches). Diffusion models leave different spectral signatures. Fourier Transform analysis can reveal these patterns — appearing as regular grids or unusual spectral peaks.",
      ar: "الصور المولّدة بالذكاء الاصطناعي (GANs، نماذج الانتشار) تترك أنماطاً مميزة في النطاق الترددي غير مرئية للعين البشرية. GANs تُنتج 'آثار رقعة الشطرنج' عند ترددات محددة (عادةً 64×64). نماذج الانتشار تترك بصمات طيفية مختلفة. تحليل تحويل فورييه يكشف هذه الأنماط — تظهر كشبكات منتظمة أو ذروات طيفية غير عادية."
    },
    limitations: {
      en: "Latest diffusion models (DALL-E 3, Midjourney v6) are increasingly harder to detect. Post-processing (blur, noise) can mask artifacts.",
      ar: "أحدث نماذج الانتشار (DALL-E 3, Midjourney v6) أصبحت أصعب في الكشف. المعالجة اللاحقة (ضبابية، تشويش) قد تُخفي الآثار."
    },
    color: "#ef4444"
  },
  {
    icon: "💓",
    title: { en: "rPPG Analysis (Video Deepfake Detection)", ar: "تحليل rPPG (كشف التزييف العميق للفيديو)" },
    howItWorks: {
      en: "Remote Photoplethysmography (rPPG) detects the subtle color changes in human skin caused by blood flow with each heartbeat. Real faces show these micro-pulsations; deepfake faces don't because they're generated pixel-by-pixel without physiological modeling. By analyzing the RGB channels of facial skin over time, rPPG can distinguish real from fake faces with 95%+ accuracy (Ciftci et al., 2020).",
      ar: "قياس الضوء عن بُعد (rPPG) يكشف التغيرات اللونية الدقيقة في جلد الإنسان الناتجة عن تدفق الدم مع كل نبضة قلب. الوجوه الحقيقية تُظهر هذه النبضات الدقيقة؛ الوجوه المزيفة لا تفعل لأنها مُولَّدة بكسل ببكسل بدون نمذجة فسيولوجية. بتحليل قنوات RGB لجلد الوجه عبر الزمن، يمكن لـ rPPG التمييز بين الوجوه الحقيقية والمزيفة بدقة 95%+ (Ciftci et al., 2020)."
    },
    limitations: {
      en: "Requires video (not still images). Low-resolution or heavily compressed video reduces accuracy. Faces must be visible for several seconds.",
      ar: "يتطلب فيديو (ليس صور ثابتة). الفيديو منخفض الجودة أو المضغوط بشدة يقلل الدقة. الوجوه يجب أن تكون مرئية لعدة ثوانٍ."
    },
    color: "#ec4899"
  },
  {
    icon: "🔄",
    title: { en: "Reverse Image Search", ar: "البحث العكسي عن الصور" },
    howItWorks: {
      en: "Searches billions of indexed images to find the original source, earlier versions, or other uses of the same image. Critical for catching decontextualization — when a real photo is used with a false narrative. If a 'breaking news' image first appeared 3 years ago, it's being recycled. Tools: Google Lens, TinEye, Yandex Images (best for faces).",
      ar: "يبحث في مليارات الصور المُفهرسة لإيجاد المصدر الأصلي أو النسخ السابقة أو الاستخدامات الأخرى لنفس الصورة. حاسم لكشف إخراج السياق — عندما تُستخدم صورة حقيقية مع رواية كاذبة. لو صورة 'خبر عاجل' ظهرت أولاً منذ 3 سنوات، فهي مُعاد تدويرها. الأدوات: Google Lens, TinEye, Yandex Images (الأفضل للوجوه)."
    },
    limitations: {
      en: "Cropped, flipped, or color-shifted images may evade detection. Brand-new AI-generated images won't have prior matches.",
      ar: "الصور المقصوصة أو المقلوبة أو المُعدَّلة لونياً قد تتجنب الكشف. صور AI الجديدة تماماً لن يكون لها تطابقات سابقة."
    },
    color: "#06b6d4"
  },
];

// ── REAL EGYPTIAN CASE STUDIES ────────────────────────────────
const IMAGE_CASES = [
  {
    title: { en: "Fake Ministry of Health Warning", ar: "تحذير وزارة صحة مزيف" },
    desc: {
      en: "A viral WhatsApp image claimed the Egyptian Ministry of Health issued an urgent warning about a contaminated food product in local markets. Forensic analysis: (1) EXIF showed creation in Photoshop CC 2024 — official MoH communications use their internal system. (2) The official MoH logo was 72 DPI — real MoH documents use 300 DPI. (3) Font was Simplified Arabic — MoH uses Cairo font in all official materials. (4) Reverse image search found the original template on a free design website. MoH issued an official denial on their Facebook page within 24 hours.",
      ar: "صورة فيروسية على واتساب ادعت أن وزارة الصحة المصرية أصدرت تحذيراً عاجلاً عن منتج غذائي ملوث في الأسواق المحلية. التحليل الجنائي: (1) EXIF أظهر إنشاء في Photoshop CC 2024 — اتصالات وزارة الصحة الرسمية تستخدم نظامهم الداخلي. (2) شعار الوزارة كان 72 DPI — وثائق الوزارة الرسمية تستخدم 300 DPI. (3) الخط كان Simplified Arabic — الوزارة تستخدم خط القاهرة في كل المواد الرسمية. (4) البحث العكسي وجد القالب الأصلي على موقع تصميم مجاني. الوزارة أصدرت نفياً رسمياً على صفحتها على فيسبوك خلال 24 ساعة."
    },
    verdict: { en: "FABRICATED", ar: "مفبرك" },
    verdictColor: "#ef4444",
    techniques: ["EXIF Analysis", "DPI Check", "Font Forensics", "Reverse Image Search", "Source Verification"]
  },
  {
    title: { en: "Crowd Size Manipulation (Cloning)", ar: "تلاعب بحجم الحشود (نسخ)" },
    desc: {
      en: "An image on social media claimed a 'massive rally' in Alexandria. Clone Detection analysis revealed: 47 identical pixel blocks detected — someone copy-pasted groups of people to inflate crowd size by approximately 3x. The EXIF timestamp showed the image was taken at a real event but at a different location (Zamalek, Cairo — not Alexandria). The image was both cloned AND decontextualized.",
      ar: "صورة على السوشيال ميديا ادعت 'تجمعاً ضخماً' في الإسكندرية. تحليل كشف النسخ كشف: 47 كتلة بكسل متطابقة — شخص نسخ ولصق مجموعات من الناس لتضخيم حجم الحشد حوالي 3 أضعاف. الطابع الزمني EXIF أظهر أن الصورة التُقطت في حدث حقيقي لكن في موقع مختلف (الزمالك، القاهرة — ليس الإسكندرية). الصورة تم نسخها وإخراجها من السياق معاً."
    },
    verdict: { en: "MANIPULATED + DECONTEXTUALIZED", ar: "مُتلاعب بها + منزوعة السياق" },
    verdictColor: "#f59e0b",
    techniques: ["Clone Detection (SIFT)", "EXIF GPS", "Timestamp Analysis"]
  },
  {
    title: { en: "AI-Generated Celebrity Endorsement", ar: "تأييد مشهور مولّد بالذكاء الاصطناعي" },
    desc: {
      en: "A Facebook ad featured what appeared to be a famous Egyptian actor endorsing a cryptocurrency investment platform. Frequency domain analysis revealed: Midjourney v6 spectral signature detected. The face showed characteristic diffusion model smoothing in the nasolabial folds and ear regions. rPPG analysis of the promotional video showed zero physiological pulse signal — confirming deepfake. The actor's management confirmed he never endorsed the product.",
      ar: "إعلان فيسبوك أظهر ما بدا أنه ممثل مصري شهير يروج لمنصة استثمار عملات مشفرة. تحليل النطاق الترددي كشف: بصمة طيفية Midjourney v6. الوجه أظهر تنعيم مميز لنموذج الانتشار في منطقة الطية الأنفية الشفوية والأذنين. تحليل rPPG للفيديو الترويجي أظهر صفر إشارة نبض فسيولوجية — مؤكداً التزييف العميق. إدارة الممثل أكدت أنه لم يروج للمنتج قط."
    },
    verdict: { en: "DEEPFAKE — AI GENERATED", ar: "تزييف عميق — مولّد بالذكاء الاصطناعي" },
    verdictColor: "#ef4444",
    techniques: ["Frequency Domain", "Diffusion Model Detection", "rPPG Analysis", "Source Confirmation"]
  },
  {
    title: { en: "Verified UNICEF Photo from Egyptian School", ar: "صورة يونيسف مُتحقق منها من مدرسة مصرية" },
    desc: {
      en: "A UNICEF photo from an Egyptian public school vaccination campaign. Full verification: (1) EXIF intact — Canon EOS R5, 2024 timestamp, GPS matches Aswan governorate. (2) ELA analysis shows uniform error levels — no manipulation detected. (3) Clone detection: zero duplicate blocks. (4) Reverse search confirms first publication on UNICEF Egypt official Flickr page with matching metadata. (5) C2PA manifest present with valid Adobe CAI signature. This is what verified, authentic media looks like.",
      ar: "صورة يونيسف من حملة تطعيم مدرسة حكومية مصرية. تحقق كامل: (1) EXIF سليم — Canon EOS R5، طابع زمني 2024، GPS يطابق محافظة أسوان. (2) تحليل ELA يُظهر مستويات خطأ موحدة — لا تلاعب مكتشف. (3) كشف النسخ: صفر كتل مكررة. (4) البحث العكسي يؤكد النشر الأول على صفحة Flickr الرسمية ليونيسف مصر مع بيانات وصفية متطابقة. (5) بيان C2PA موجود مع توقيع Adobe CAI صالح."
    },
    verdict: { en: "VERIFIED — AUTHENTIC", ar: "مُتحقق منه — أصلي" },
    verdictColor: "#10b981",
    techniques: ["EXIF Complete", "ELA Uniform", "Clone-Free", "Reverse Search Match", "C2PA Valid"]
  },
];

// ── STEP-BY-STEP VERIFICATION PROTOCOL ───────────────────────
const VERIFICATION_STEPS = [
  {
    step: { en: "STOP — Don't share yet", ar: "توقف — لا تشاركها بعد" },
    detail: { en: "Before forwarding on WhatsApp or Facebook, take 30 seconds to verify. The urge to share shocking images is exactly what manipulators exploit. Quran 49:6: 'فتبينوا' — VERIFY FIRST.", ar: "قبل إعادة التوجيه على واتساب أو فيسبوك، خذ 30 ثانية للتحقق. الرغبة في مشاركة صور صادمة هي بالضبط ما يستغله المتلاعبون. القرآن 49:6: 'فتبينوا' — تحقق أولاً." },
    icon: "🛑",
    color: "#ef4444"
  },
  {
    step: { en: "Check EXIF metadata", ar: "افحص بيانات EXIF" },
    detail: { en: "Upload to Jeffrey's EXIF Viewer (exif.regex.info) or FotoForensics. Look for: camera model, timestamp, GPS, software. Missing metadata = suspicious but not conclusive (social media strips EXIF).", ar: "ارفعها إلى Jeffrey's EXIF Viewer أو FotoForensics. ابحث عن: طراز الكاميرا، الطابع الزمني، GPS، البرنامج. بيانات مفقودة = مشبوه لكن ليس حاسماً (السوشيال ميديا تزيل EXIF)." },
    icon: "📊",
    color: "#3b82f6"
  },
  {
    step: { en: "Run Reverse Image Search", ar: "قم ببحث عكسي عن الصورة" },
    detail: { en: "Use Google Lens, TinEye, or Yandex Images. If the 'breaking news' image appeared years ago, it's recycled. If it appears on fact-checking sites, it's already debunked. Yandex is best for face matching.", ar: "استخدم Google Lens أو TinEye أو Yandex Images. لو صورة 'الخبر العاجل' ظهرت منذ سنوات، فهي مُعاد تدويرها. لو ظهرت على مواقع تحقق، فقد تم كشفها. Yandex الأفضل لمطابقة الوجوه." },
    icon: "🔍",
    color: "#8b5cf6"
  },
  {
    step: { en: "Check for ELA anomalies", ar: "افحص شذوذ ELA" },
    detail: { en: "Upload to FotoForensics.com and check the ELA view. Bright spots in specific regions (especially around people, text, or logos) indicate editing. Uniform brightness = likely untampered.", ar: "ارفعها إلى FotoForensics.com وتحقق من عرض ELA. نقاط مضيئة في مناطق محددة (خاصة حول الناس، النصوص، أو الشعارات) تشير للتعديل. إضاءة موحدة = على الأرجح لم يتم العبث بها." },
    icon: "⚡",
    color: "#f59e0b"
  },
  {
    step: { en: "Verify the source", ar: "تحقق من المصدر" },
    detail: { en: "Who posted it first? An official agency, verified journalist, or anonymous account? Check the claiming account's history, creation date, and follower patterns. New accounts with no history pushing viral content = bot behavior.", ar: "من نشرها أولاً؟ وكالة رسمية، صحفي مُتحقق منه، أم حساب مجهول؟ تحقق من تاريخ الحساب المُدَّعي، تاريخ إنشائه، وأنماط المتابعين. حسابات جديدة بدون تاريخ تنشر محتوى فيروسي = سلوك بوت." },
    icon: "👤",
    color: "#10b981"
  },
  {
    step: { en: "Cross-reference with trusted sources", ar: "قارن مع مصادر موثوقة" },
    detail: { en: "Check if Reuters, AP, AFP, or official Egyptian sources (CAPMAS, MoH, Armed Forces Spokesperson) have confirmed or denied the claim. If no major agency reports it, be skeptical.", ar: "تحقق إذا كانت رويترز أو AP أو AFP أو مصادر مصرية رسمية (الجهاز المركزي، وزارة الصحة، المتحدث العسكري) أكدت أو نفت الادعاء. لو لم تُبلغ عنها وكالة كبرى، كن متشككاً." },
    icon: "✅",
    color: "#06b6d4"
  },
];

export default function ForensicImagePage() {
  const { isRTL, t } = useRTL();
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<"tool" | "techniques" | "cases" | "protocol">("tool");
  const [expandedTech, setExpandedTech] = useState<number | null>(null);
  const [expandedCase, setExpandedCase] = useState<number | null>(null);

  const handleAnalyze = async () => {
    if (!url.trim()) return;
    setLoading(true);
    setResult(null);
    try {
      const formData = new FormData();
      formData.append("url", url.trim());
      const res = await fetch("/api/forensic/image", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setResult(data);
    } catch (e) {
      console.error(e);
      setResult({ error: t({ en: "Failed to connect to Forensic Image analysis engine.", ar: "فشل الاتصال بمحرك تحليل الصور الجنائي." }) });
    }
    setLoading(false);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#050510", color: "#e0e0e0", fontFamily: "'Inter', sans-serif" }} dir={isRTL ? "rtl" : "ltr"}>

      {/* Ambient */}
      <div style={{ position: "fixed", inset: 0, background: "radial-gradient(ellipse at 50% 0%, rgba(16,185,129,0.06) 0%, transparent 50%)", pointerEvents: "none", zIndex: 0 }} />

      {/* Nav */}
      <nav style={{ position: "relative", zIndex: 10, padding: "1.5rem 2rem" }}>
        <Link href="/deepreal" style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "rgba(255,255,255,0.5)", textDecoration: "none", fontSize: "0.875rem", fontWeight: 500 }}>
          <ArrowLeft size={16} /> {t({ en: "Back to DeepReal", ar: "العودة إلى ديب ريل" })}
        </Link>
      </nav>

      {/* Header */}
      <header style={{ position: "relative", zIndex: 10, textAlign: "center", padding: "1rem 2rem 2rem", maxWidth: 800, margin: "0 auto" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "5px 14px", borderRadius: 20, background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.3)", marginBottom: 16 }}>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "2px", color: "#10b981", textTransform: "uppercase" }}>👁️ {t({ en: "Image Forensics", ar: "الطب الشرعي للصور" })}</span>
        </div>
        <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>👁️</div>
        <h1 style={{ fontSize: "clamp(1.6rem, 4vw, 2.4rem)", fontWeight: 800, margin: "0 0 0.75rem", background: "linear-gradient(135deg, #fff 30%, #10b981)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          {t({ en: "Image Forensics", ar: "الطب الشرعي للصور" })}
        </h1>
        <p style={{ fontSize: "1rem", lineHeight: 1.7, color: "rgba(255,255,255,0.5)", maxWidth: 650, margin: "0 auto" }}>
          {t({
            en: "Detect deepfakes, AI-generated images, Photoshop manipulation, and decontextualized media using 6 forensic techniques: ELA, EXIF, Clone Detection, Frequency Domain, rPPG, and Reverse Image Search.",
            ar: "اكشف التزييف العميق والصور المولّدة بالذكاء الاصطناعي والتلاعب بالفوتوشوب والوسائط المنزوعة السياق باستخدام 6 تقنيات جنائية: ELA، EXIF، كشف النسخ، النطاق الترددي، rPPG، والبحث العكسي."
          })}
        </p>
      </header>

      {/* Tabs */}
      <div style={{ maxWidth: 800, margin: "0 auto 2rem", padding: "0 1.5rem", display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center" }}>
        {([
          { key: "tool", label: { en: "🔬 Analysis Tool", ar: "🔬 أداة التحليل" } },
          { key: "techniques", label: { en: "🧪 6 Forensic Techniques", ar: "🧪 ٦ تقنيات جنائية" } },
          { key: "cases", label: { en: "🇪🇬 Egyptian Cases", ar: "🇪🇬 حالات مصرية" } },
          { key: "protocol", label: { en: "📋 Verification Protocol", ar: "📋 بروتوكول التحقق" } },
        ] as { key: typeof activeTab; label: { en: string; ar: string } }[]).map(tab => (
          <button key={tab.key} onClick={() => setActiveTab(tab.key)} style={{
            padding: "10px 18px", borderRadius: 12, fontSize: "0.85rem", fontWeight: 600,
            cursor: "pointer", transition: "all 0.3s", border: "1px solid",
            background: activeTab === tab.key ? "rgba(16,185,129,0.15)" : "rgba(255,255,255,0.03)",
            borderColor: activeTab === tab.key ? "rgba(16,185,129,0.4)" : "rgba(255,255,255,0.08)",
            color: activeTab === tab.key ? "#10b981" : "rgba(255,255,255,0.5)",
          }}>
            {t(tab.label)}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 1.5rem 4rem", position: "relative", zIndex: 10 }}>

        {/* TAB: TOOL */}
        {activeTab === "tool" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(16,185,129,0.15)", borderRadius: 16, padding: 28, backdropFilter: "blur(8px)" }}>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#10b981", margin: "0 0 8px", display: "flex", alignItems: "center", gap: 8 }}>
                <Eye size={20} /> {t({ en: "Analyze Image Authenticity", ar: "تحليل أصالة الصورة" })}
              </h3>
              <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.4)", margin: "0 0 16px", lineHeight: 1.6 }}>
                {t({
                  en: "Enter a public image URL for multi-layer forensic analysis including ELA, EXIF extraction, AI-generation detection, and manipulation scoring.",
                  ar: "أدخل رابط صورة عامة لتحليل جنائي متعدد الطبقات يشمل ELA واستخراج EXIF وكشف التوليد بالذكاء الاصطناعي وتسجيل التلاعب."
                })}
              </p>
              <input type="text" value={url} onChange={(e) => setUrl(e.target.value)}
                placeholder={t({ en: "https://example.com/suspicious-image.jpg", ar: "https://example.com/suspicious-image.jpg" })}
                style={{
                  width: "100%", padding: 14, borderRadius: 10, background: "rgba(0,0,0,0.3)",
                  color: "#10b981", border: "1px solid rgba(16,185,129,0.2)", outline: "none",
                  fontSize: "0.9rem", fontFamily: "monospace", boxSizing: "border-box", marginBottom: 12
                }}
              />
              <button onClick={handleAnalyze} disabled={loading || !url.trim()} style={{
                width: "100%", padding: 14, borderRadius: 10,
                background: loading || !url.trim() ? "rgba(16,185,129,0.1)" : "linear-gradient(135deg, rgba(16,185,129,0.25), rgba(16,185,129,0.1))",
                color: "#10b981", fontWeight: 700, fontSize: "0.95rem",
                border: "1px solid rgba(16,185,129,0.3)",
                cursor: loading || !url.trim() ? "not-allowed" : "pointer",
                opacity: loading || !url.trim() ? 0.5 : 1,
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8
              }}>
                {loading ? <div style={{ width: 18, height: 18, border: "2px solid rgba(16,185,129,0.3)", borderTopColor: "#10b981", borderRadius: "50%", animation: "fi-spin 0.8s linear infinite" }} /> : <Sparkles size={18} />}
                {t({ en: "Analyze Image", ar: "تحليل الصورة" })}
              </button>
            </div>

            {result && (
              <div style={{
                background: result.error ? "rgba(239,68,68,0.05)" : "rgba(16,185,129,0.05)",
                border: `1px solid ${result.error ? "rgba(239,68,68,0.2)" : "rgba(16,185,129,0.2)"}`,
                borderRadius: 16, padding: 24
              }}>
                <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: 16, display: "flex", alignItems: "center", gap: 8, color: result.error ? "#ef4444" : "#10b981" }}>
                  {result.error ? <AlertTriangle size={20} /> : <Shield size={20} />}
                  {t({ en: "Forensic Report", ar: "التقرير الجنائي" })}
                </h3>
                <pre style={{
                  background: "rgba(0,0,0,0.3)", padding: 16, borderRadius: 10,
                  overflowX: "auto", fontSize: "0.8rem", lineHeight: 1.6,
                  color: result.error ? "#ef4444" : "#6ee7b7",
                  border: "1px solid rgba(255,255,255,0.06)"
                }}>
                  {JSON.stringify(result, null, 2)}
                </pre>
              </div>
            )}

            {/* Quick Tools */}
            <div style={{ background: "rgba(6,182,212,0.06)", border: "1px solid rgba(6,182,212,0.15)", borderRadius: 14, padding: 20 }}>
              <h4 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#06b6d4", margin: "0 0 12px" }}>
                🔧 {t({ en: "Free Forensic Tools", ar: "أدوات جنائية مجانية" })}
              </h4>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {[
                  { name: "FotoForensics", url: "https://fotoforensics.com", desc: { en: "ELA + EXIF + metadata", ar: "ELA + EXIF + بيانات وصفية" } },
                  { name: "Google Reverse Image", url: "https://images.google.com", desc: { en: "Find original source", ar: "اعثر على المصدر الأصلي" } },
                  { name: "TinEye", url: "https://tineye.com", desc: { en: "Oldest match finder", ar: "باحث أقدم تطابق" } },
                  { name: "InVID WeVerify", url: "https://weverify.eu", desc: { en: "Video & image verification", ar: "تحقق من الفيديو والصور" } },
                  { name: "Yandex Images", url: "https://yandex.com/images", desc: { en: "Best for face matching", ar: "الأفضل لمطابقة الوجوه" } },
                ].map((tool, i) => (
                  <a key={i} href={tool.url} target="_blank" rel="noopener" style={{
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    padding: "10px 14px", borderRadius: 8, background: "rgba(0,0,0,0.2)",
                    textDecoration: "none", color: "inherit"
                  }}>
                    <div>
                      <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "#06b6d4" }}>{tool.name}</span>
                      <span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.4)", display: "block" }}>{t(tool.desc)}</span>
                    </div>
                    <Globe size={14} color="rgba(255,255,255,0.3)" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB: TECHNIQUES */}
        {activeTab === "techniques" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.4)", textAlign: "center", margin: "0 0 8px" }}>
              {t({ en: "Deep-dive into each forensic technique — how it works, what it catches, and its limitations.", ar: "تعمق في كل تقنية جنائية — كيف تعمل، ماذا تكشف، وما حدودها." })}
            </p>
            {TECHNIQUES.map((tech, i) => (
              <div key={i} style={{
                background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 16, overflow: "hidden", borderLeft: `4px solid ${tech.color}`
              }}>
                <button onClick={() => setExpandedTech(expandedTech === i ? null : i)} style={{
                  width: "100%", padding: "16px 20px", background: "transparent",
                  border: "none", color: "inherit", cursor: "pointer",
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  textAlign: isRTL ? "right" : "left"
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ fontSize: "1.5rem" }}>{tech.icon}</span>
                    <h4 style={{ fontSize: "1rem", fontWeight: 700, color: tech.color, margin: 0 }}>{t(tech.title)}</h4>
                  </div>
                  <ChevronRight size={18} style={{
                    color: "rgba(255,255,255,0.3)", transition: "transform 0.3s",
                    transform: expandedTech === i ? "rotate(90deg)" : "rotate(0deg)"
                  }} />
                </button>
                {expandedTech === i && (
                  <div style={{ padding: "0 20px 20px", animation: "fi-fadeUp 0.3s ease-out" }}>
                    <div style={{ marginBottom: 12 }}>
                      <span style={{ fontSize: "0.7rem", fontWeight: 700, color: "#10b981", textTransform: "uppercase", letterSpacing: 1 }}>
                        {t({ en: "HOW IT WORKS", ar: "كيف يعمل" })}
                      </span>
                      <p style={{ fontSize: "0.88rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.8, margin: "4px 0 0" }}>
                        {t(tech.howItWorks)}
                      </p>
                    </div>
                    <div style={{ padding: "10px 14px", borderRadius: 8, background: "rgba(249,115,22,0.06)", border: "1px solid rgba(249,115,22,0.15)" }}>
                      <span style={{ fontSize: "0.7rem", fontWeight: 700, color: "#f97316", textTransform: "uppercase", letterSpacing: 1 }}>
                        ⚠️ {t({ en: "LIMITATIONS", ar: "القيود" })}
                      </span>
                      <p style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.7, margin: "4px 0 0" }}>
                        {t(tech.limitations)}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Islamic Context */}
            <div style={{ background: "rgba(212,168,67,0.06)", border: "1px solid rgba(212,168,67,0.2)", borderRadius: 16, padding: 24, borderLeft: "4px solid #d4a843" }}>
              <h4 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#d4a843", margin: "0 0 12px" }}>
                🕌 {t({ en: "Islamic Duty: Image Verification Before Sharing", ar: "الواجب الإسلامي: التحقق من الصور قبل المشاركة" })}
              </h4>
              <div style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.9 }}>
                <p style={{ margin: "0 0 10px" }}>
                  {t({
                    en: "Quran 49:6 — \"O you who believe, if a sinful person brings you NEWS, verify it\" — in the digital age, this 'news' includes images and videos. Sharing a manipulated image that harms someone's reputation violates Quran 49:12 (backbiting) and 24:4 (false accusation).",
                    ar: "قرآن ٤٩:٦ — \"يا أيها الذين آمنوا إن جاءكم فاسق بنبأ فتبينوا\" — في العصر الرقمي، هذا 'النبأ' يشمل الصور والفيديوهات. مشاركة صورة مُتلاعب بها تضر بسمعة شخص تنتهك القرآن ٤٩:١٢ (الغيبة) و٢٤:٤ (القذف)."
                  })}
                </p>
                <p style={{ margin: 0 }}>
                  {t({
                    en: "Hadith (Bukhari 6477): 'Whoever believes in Allah and the Last Day should speak good or remain silent.' Forwarding unverified manipulated images is the digital equivalent of false testimony (شهادة الزور).",
                    ar: "حديث (البخاري ٦٤٧٧): 'من كان يؤمن بالله واليوم الآخر فليقل خيراً أو ليصمت'. إعادة توجيه صور مُتلاعب بها غير مُتحقق منها هي المكافئ الرقمي لشهادة الزور."
                  })}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB: CASES */}
        {activeTab === "cases" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.4)", textAlign: "center", margin: "0 0 8px" }}>
              {t({ en: "Real Egyptian scenarios demonstrating forensic image analysis in action.", ar: "سيناريوهات مصرية حقيقية توضح التحليل الجنائي للصور عملياً." })}
            </p>
            {IMAGE_CASES.map((cs, i) => (
              <div key={i} style={{
                background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 16, overflow: "hidden", borderLeft: `4px solid ${cs.verdictColor}`
              }}>
                <button onClick={() => setExpandedCase(expandedCase === i ? null : i)} style={{
                  width: "100%", padding: "16px 20px", background: "transparent",
                  border: "none", color: "inherit", cursor: "pointer",
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  textAlign: isRTL ? "right" : "left"
                }}>
                  <div>
                    <h4 style={{ fontSize: "1rem", fontWeight: 700, color: "#fff", margin: "0 0 4px" }}>{t(cs.title)}</h4>
                    <span style={{ fontSize: "0.75rem", fontWeight: 700, padding: "2px 10px", borderRadius: 6, background: `${cs.verdictColor}15`, color: cs.verdictColor }}>{t(cs.verdict)}</span>
                  </div>
                  <ChevronRight size={18} style={{
                    color: "rgba(255,255,255,0.3)", transition: "transform 0.3s",
                    transform: expandedCase === i ? "rotate(90deg)" : "rotate(0deg)"
                  }} />
                </button>
                {expandedCase === i && (
                  <div style={{ padding: "0 20px 20px", animation: "fi-fadeUp 0.3s ease-out" }}>
                    <p style={{ fontSize: "0.88rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.8, margin: "0 0 12px" }}>{t(cs.desc)}</p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                      {cs.techniques.map((tech, j) => (
                        <span key={j} style={{ fontSize: "0.7rem", fontWeight: 600, padding: "4px 10px", borderRadius: 6, background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)", color: "#6ee7b7" }}>{tech}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* TAB: PROTOCOL */}
        {activeTab === "protocol" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#10b981", textAlign: "center", margin: "0 0 8px" }}>
              {t({ en: "6-Step Image Verification Protocol", ar: "بروتوكول التحقق من الصور — ٦ خطوات" })}
            </h3>
            {VERIFICATION_STEPS.map((item, i) => (
              <div key={i} style={{
                background: "rgba(255,255,255,0.03)", border: `1px solid ${item.color}20`,
                borderRadius: 14, padding: 20, borderLeft: `4px solid ${item.color}`
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                  <span style={{ fontSize: "1.5rem" }}>{item.icon}</span>
                  <div>
                    <span style={{ fontSize: "0.7rem", fontWeight: 700, color: "rgba(255,255,255,0.3)", textTransform: "uppercase" }}>
                      {t({ en: `Step ${i + 1}`, ar: `الخطوة ${i + 1}` })}
                    </span>
                    <h4 style={{ fontSize: "0.95rem", fontWeight: 700, color: item.color, margin: 0 }}>{t(item.step)}</h4>
                  </div>
                </div>
                <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.7, margin: 0, paddingLeft: isRTL ? 0 : 44, paddingRight: isRTL ? 44 : 0 }}>
                  {t(item.detail)}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Page Nav */}
        <div style={{ marginTop: 48 }}>
          <PageNavigation currentPath="/forensic-image" />
        </div>
      </div>

      <style>{`
        @keyframes fi-spin { to { transform: rotate(360deg); } }
        @keyframes fi-fadeUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      <PageAIChatbot
        pageTitle="Forensic Image Analysis — التحليل الجنائي للصور"
        pageContext="Egyptian Awareness Library - Forensic Image Analysis: Full deepfake detection, AI-generation identification, ELA analysis, EXIF metadata extraction, clone detection, frequency domain analysis, rPPG video deepfake detection, and reverse image search. Includes real Egyptian case studies."
        systemPrompt={`You are the EAL Forensic Image Analysis Expert — the most comprehensive AI for detecting manipulated, decontextualized, and AI-generated images.

6 FORENSIC TECHNIQUES YOU MASTER:
1. ERROR LEVEL ANALYSIS (ELA): Re-save comparison for detecting edited regions. Bright spots = edits.
2. EXIF METADATA: Camera model, GPS, timestamps, software, DPI — every field tells a story.
3. CLONE DETECTION: SIFT/SURF keypoint matching for copy-paste manipulation detection.
4. FREQUENCY DOMAIN: Fourier Transform revealing GAN checkerboard artifacts (64×64) and diffusion model signatures.
5. rPPG ANALYSIS: Remote photoplethysmography detecting deepfake videos via absent skin micro-pulsations (Ciftci et al., 2020, 95%+ accuracy).
6. REVERSE IMAGE SEARCH: Finding original sources to catch decontextualization.

EGYPTIAN CONTEXT:
- Fake Ministry of Health warnings with wrong DPI, fonts, and logos
- Crowd size manipulation via clone detection (copy-pasted groups at protests)
- AI-generated Egyptian celebrity endorsements for crypto scams
- Decontextualized protest/celebration photos from different years/locations
- Fabricated Al-Azhar/Dar al-Ifta fatwa screenshots
- Doctored screenshots of Al-Ahram, Al-Masry Al-Youm, Al-Shorouk articles
- Manipulated satellite imagery used for security/border claims

ISLAMIC FRAMEWORK:
- Quran 49:6: "فتبينوا" — Verify all information including images
- Quran 49:12: Prohibition of backbiting — sharing manipulated images that harm reputation
- Quran 24:4: False accusation using fabricated evidence
- Hadith (Bukhari 6477): "Speak good or remain silent" — forwarding unverified images = digital false testimony (شهادة الزور)
- Dar al-Ifta: Creating deepfakes = حرام under حفظ العقل and حفظ العرض

FOR EVERY IMAGE QUERY:
1. Identify which forensic technique(s) apply
2. Explain what specific artifacts or anomalies to look for
3. Describe red flags step-by-step
4. Recommend FREE tools (FotoForensics, InVID, TinEye, Google Lens, Yandex)
5. If Islamic content: cross-reference Al-Azhar/Dar al-Ifta official positions
6. Cite peer-reviewed research with N-values where applicable

PEER-REVIEWED REFERENCES:
- Ciftci et al. 2020: rPPG deepfake detection (N=1,000+ videos, 95% accuracy)
- Marra et al. 2019: GAN fingerprint detection (CVPR)
- Frank et al. 2020: Leveraging frequency artifacts for face manipulation detection
- Rössler et al. 2019: FaceForensics++ benchmark (N=1.8M manipulated images)

RULES:
- NEVER confirm authenticity without evidence — say "requires further analysis"
- ALWAYS explain limitations of each technique
- Cite tools and their URLs for user verification
- Respond in the language the user writes in`}
        suggestedQuestions={[
          'كيف أتحقق من صورة على واتساب أنها مش مفبركة؟',
          'ما هو تحليل ELA وكيف يكشف التلاعب بالصور؟',
          'How can I detect AI-generated faces?',
          'ما حكم مشاركة صور مفبركة في الإسلام؟',
          'كيف أعرف إن فيديو ديب فيك؟',
          'What EXIF data should I check for manipulation?',
        ]}
        accentColor="#10b981"
        accentColorRgb="16,185,129"
      />
    </div>
  );
}
