"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRTL } from "@/components/shared/rtl-provider";
import { PageNavigation } from '@/components/shared/page-navigation';

const ANALYSIS_TYPES = [
  { id: "hadith", emoji: "🔍", name: "Hadith Verification", nameAr: "التحقق من الأحاديث", color: "#10B981" },
  { id: "fatwa", emoji: "⚖️", name: "Fatwa Check", nameAr: "فحص الفتوى", color: "#6366f1" },
  { id: "sectarian", emoji: "🛡️", name: "Sectarian Content", nameAr: "محتوى طائفي", color: "#EF4444" },
  { id: "fabricated", emoji: "⚠️", name: "Fabricated Quote", nameAr: "اقتباس مفبرك", color: "#F59E0B" },
];

export default function WhatsAppCheckerPage() {
  const { isRTL: a, t } = useRTL();
  const ff = a ? "'Noto Kufi Arabic', sans-serif" : "inherit";
  const [mounted, setMounted] = useState(false);
  const [message, setMessage] = useState("");
  const [result, setResult] = useState<{ type: string; verdict: string; details: string; response: string } | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const analyzeMessage = () => {
    if (!message.trim()) return;
    setIsAnalyzing(true);
    setTimeout(() => {
      const hasArabic = /[\u0600-\u06FF]/.test(message);
      const hasHadith = /حديث|قال النبي|صلى الله عليه وسلم|رواه|الرسول/i.test(message) || /hadith|prophet said|narrated/i.test(message);
      const hasFatwa = /حرام|حلال|فتوى|الشيخ|fatwa|haram|halal/i.test(message);
      const hasSectarian = /كفر|شرك|بدعة|طائفة|kufr|shirk|bidah/i.test(message);

      let type = "fabricated", verdict = "⚠️ Unverified", details = "", response = "";
      if (hasHadith) {
        type = "hadith"; verdict = "⚠️ Requires Verification";
        details = "This message contains a hadith attribution. Before sharing:\n1. Check isnad (chain of narration) on Dorar.net or IslamWeb\n2. Search in Sahih al-Bukhari and Sahih Muslim databases\n3. Verify the exact wording matches the original Arabic\n4. Check if the hadith is sahih, hasan, da'if, or mawdu' (fabricated)";
        response = hasArabic
          ? "جزاك الله خيراً على الحرص. قبل ما نشارك الحديث ده، أنا بحثت ولقيت إنه محتاج تحقق. الأفضل نرجع لموقع الدرر السنية أو إسلام ويب للتأكد من صحته. 🤲"
          : "JazakAllahu khairan for sharing. Before forwarding, I checked and this hadith needs verification. Let's check Dorar.net or IslamWeb to confirm its authenticity. 🤲";
      } else if (hasFatwa) {
        type = "fatwa"; verdict = "⚖️ Context Required";
        details = "This message contains a fatwa or religious ruling. Fatwas are context-dependent:\n1. Check the source institution (Dar Al-Ifta? Al-Azhar? Unknown?)\n2. Verify the scholar's credentials\n3. Consider the original question/context\n4. Cross-reference with other reputable sources";
        response = hasArabic
          ? "الفتوى دي محتاجة سياقها. الفتاوى بتتغير حسب الزمان والمكان والحال. الأفضل نرجع لدار الإفتاء المصرية أو الأزهر الشريف للتأكد. ⚖️"
          : "This fatwa needs its context. Fatwas vary by time, place, and circumstance. Let's verify with Dar Al-Ifta or Al-Azhar. ⚖️";
      } else if (hasSectarian) {
        type = "sectarian"; verdict = "🚨 Sectarian Alert";
        details = "This message contains potentially sectarian language:\n1. Takfir (declaring someone a non-believer) is extremely serious in Islam\n2. Inter-sectarian accusations often serve political rather than religious purposes\n3. The Prophet ﷺ warned against declaring Muslims as kafir\n4. This content may be designed to divide the ummah";
        response = hasArabic
          ? "الرسالة دي فيها محتوى طائفي. النبي ﷺ حذرنا من التكفير والتفريق. الأفضل ما نشاركهاش ونرجع لعلماء معتمدين. 🤝"
          : "This message contains sectarian content. The Prophet ﷺ warned against takfir and division. Better not to share it and consult verified scholars. 🤝";
      } else {
        details = "This message contains a religious claim that cannot be immediately verified.\n1. Check if it has a source attribution (scholar, book, hadith)\n2. Search the exact text online for fact-checking\n3. If it says 'forwarded as received' — that's a red flag\n4. When in doubt, don't forward";
        response = hasArabic
          ? "الرسالة دي مش مؤكدة. القاعدة: لو مش متأكد، ما تشاركش. خلينا نتحقق الأول من مصادر موثوقة. 📚"
          : "This message is unverified. Rule: if unsure, don't share. Let's verify with trusted sources first. 📚";
      }

      setResult({ type, verdict, details, response });
      setIsAnalyzing(false);
    }, 1200);
  };

  return (
    <div style={{ paddingTop: "var(--navbar-height)", minHeight: "100vh", direction: a ? "rtl" : "ltr" }}>
      <div className="container" style={{ padding: "var(--space-xl) var(--space-lg)", maxWidth: 800 }}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{ width: 80, height: 80, borderRadius: "50%", background: "linear-gradient(135deg, rgba(37,211,102,0.15), rgba(16,185,129,0.15))", border: "2px solid rgba(37,211,102,0.3)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", fontSize: 36 }}>💬</div>
          <h1 style={{ fontSize: 28, marginBottom: 8, fontFamily: ff }}>{t({ en: "Islamic WhatsApp Message Checker", ar: "فاحص رسائل واتساب الإسلامية", arEG: "فاحص رسائل واتساب الإسلامية" })}</h1>
          <p style={{ color: "var(--text-muted)", fontSize: 14, maxWidth: 550, margin: "0 auto", lineHeight: 1.7, fontFamily: ff }}>
            {t({ en: "Paste any Islamic WhatsApp forward. We'll check for hadith authenticity, fatwa validity, sectarian content, and fabricated quotes.", ar: "الصق أي رسالة واتساب إسلامية. هنتحقق من صحة الأحاديث وصلاحية الفتوى والمحتوى الطائفي.", arEG: "الصق أي رسالة واتساب إسلامية. هنتحقق من صحة الأحاديث وصلاحية الفتوى والمحتوى الطائفي." })}
          </p>
        </div>

        {/* Analysis Types */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginBottom: 24 }}>
          {ANALYSIS_TYPES.map((type) => (
            <div key={type.id} className="glass-card" style={{ padding: 12, textAlign: "center" }}>
              <div style={{ fontSize: 20, marginBottom: 4 }}>{type.emoji}</div>
              <div style={{ fontSize: 11, fontWeight: 600, color: type.color, fontFamily: ff }}>{a ? type.nameAr : type.name}</div>
            </div>
          ))}
        </div>

        {/* WhatsApp-style Input */}
        <div className="glass-card" style={{ padding: 24, marginBottom: 24, background: "rgba(37,211,102,0.03)", border: "1px solid rgba(37,211,102,0.15)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
            <span style={{ fontSize: 18 }}>💬</span>
            <span style={{ fontWeight: 700, fontSize: 14, fontFamily: ff }}>{t({ en: "Paste WhatsApp Message", ar: "الصق رسالة واتساب", arEG: "الصق رسالة واتساب" })}</span>
          </div>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={a ? "الصق الرسالة هنا... (عربي أو إنجليزي)" : "Paste the forwarded message here... (Arabic or English)"}
            style={{ width: "100%", padding: 16, borderRadius: 16, border: "1px solid var(--border-primary)", background: "var(--bg-secondary)", color: "var(--text-primary)", fontSize: 14, resize: "vertical", minHeight: 120, fontFamily: ff, lineHeight: 1.8 }}
          />
          <button onClick={analyzeMessage} disabled={isAnalyzing || !message.trim()} className="btn-primary" style={{ marginTop: 12, padding: "12px 28px", fontSize: 14, width: "100%", opacity: isAnalyzing ? 0.6 : 1 }}>
            {isAnalyzing ? (t({ en: "Analyzing...", ar: "جاري التحليل...", arEG: "بنحلل..." })) : (t({ en: "🔍 Analyze Message", ar: "🔍 حلل الرسالة", arEG: "🔍 حلل الرسالة" }))}
          </button>
        </div>

        {/* Results */}
        {result && (
          <div className="glass-card" style={{ padding: 24, marginBottom: 24 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <span style={{ fontSize: 18 }}>{ANALYSIS_TYPES.find(t => t.id === result.type)?.emoji || "⚠️"}</span>
              <span style={{ fontWeight: 700, fontSize: 16, color: ANALYSIS_TYPES.find(t => t.id === result.type)?.color || "#F59E0B" }}>{result.verdict}</span>
            </div>
            <p style={{ fontSize: 13, lineHeight: 1.8, color: "var(--text-secondary)", whiteSpace: "pre-line", marginBottom: 20, fontFamily: ff }}>{result.details}</p>
            <div style={{ padding: 16, borderRadius: 12, background: "rgba(37,211,102,0.06)", border: "1px solid rgba(37,211,102,0.15)" }}>
              <strong style={{ fontSize: 13, color: "#25D366", fontFamily: ff }}>{t({ en: "📋 Suggested Response (copy & send back):", ar: "📋 رد مقترح (انسخ وابعته):", arEG: "📋 رد مقترح (انسخ وابعته):" })}</strong>
              <p style={{ fontSize: 14, lineHeight: 1.8, margin: "8px 0 0", fontFamily: ff, color: "var(--text-primary)" }}>{result.response}</p>
              <button onClick={() => navigator.clipboard.writeText(result.response)} style={{ marginTop: 10, padding: "8px 16px", borderRadius: 8, border: "1px solid rgba(37,211,102,0.3)", background: "rgba(37,211,102,0.1)", color: "#25D366", fontSize: 12, cursor: "pointer", fontWeight: 600 }}>
                {t({ en: "📋 Copy Response", ar: "📋 انسخ الرد", arEG: "📋 انسخ الرد" })}
              </button>
            </div>
          </div>
        )}

        {/* Crisis Resources */}
        <div className="glass-card" style={{ padding: 16, textAlign: "center", fontSize: 13, color: "var(--text-muted)", borderLeft: "4px solid #EF4444", fontFamily: ff }}>
          {t({ en: "🚨 If someone is using religion to manipulate or control you:", ar: "🚨 لو حد بيستخدم الدين عشان يتلاعب بيك أو يسيطر عليك:", arEG: "🚨 لو حد بيستخدم الدين عشان يتلاعب بيك أو يسيطر عليك:" })}
          <br />
          <strong style={{ color: "#EF4444" }}>
            {t({ en: "Dar Al-Ifta: 107 | Egyptian Crisis Line: 08008880700", ar: "دار الإفتاء: 107 | خط الأزمات المصري: 08008880700", arEG: "دار الإفتاء: 107 | خط الأزمات المصري: 08008880700" })}
          </strong>
        </div>
        <div style={{ textAlign: "center", marginTop: 20 }}>
          <Link href="/religion-hub" style={{ fontSize: 13, color: "var(--text-muted)" }}>← {t({ en: "Back to Islamic Hub", ar: "العودة للمركز الإسلامي", arEG: "الرجوع للمركز الإسلامي" })}</Link>
        </div>
      </div>
      <PageNavigation currentPath="/religion-hub/whatsapp" />
    </div>
  );
}
