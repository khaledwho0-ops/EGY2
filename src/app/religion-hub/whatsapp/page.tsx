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
  const [result, setResult] = useState<{ type: string; verdict: string; details: string; tools?: { label: string; labelAr: string; href: string }[] } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const dedicatedTools = [
    { label: "Fatwa Context tool", labelAr: "أداة سياق الفتوى", href: "/religion-hub/tools/fatwa-context" },
    { label: "Sectarian Detector tool", labelAr: "أداة كاشف الطائفية", href: "/religion-hub/tools/sectarian-detector" },
    { label: "Quran Context tool", labelAr: "أداة سياق القرآن", href: "/religion-hub/tools/quran-context" },
  ];

  const analyzeMessage = async () => {
    if (!message.trim()) return;
    setIsAnalyzing(true);
    setError(null);
    setResult(null);

    const hasHadith = /حديث|قال النبي|صلى الله عليه وسلم|رواه|الرسول/i.test(message) || /hadith|prophet said|narrated/i.test(message);

    try {
      if (hasHadith) {
        const res = await fetch("/api/defense/hadith-check", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ hadithText: message }),
        });
        const json = await res.json();
        if (!res.ok || !json?.analysis) {
          setError(json?.error || t({ en: "Verification unavailable right now. Please try again.", ar: "التحقق غير متاح حاليًا. حاول مرة أخرى." }));
          return;
        }
        const an = json.analysis;
        const grade = an.classification ?? "UNVERIFIABLE";
        const arGrade = an.arabicClassification ?? "";
        const detailParts = [
          a ? (an.arabicExplanation || an.textAnalysis || "") : (an.textAnalysis || an.explanation || ""),
          an.sourceBook ? `${a ? "المصدر: " : "Source: "}${an.sourceBook}${an.hadithNumber && an.hadithNumber !== "Unknown" ? ` (${an.hadithNumber})` : ""}` : "",
          an.recommendation ? `${a ? "التوصية: " : "Recommendation: "}${an.recommendation}` : "",
        ].filter(Boolean);
        setResult({
          type: "hadith",
          verdict: `${grade}${arGrade ? ` / ${arGrade}` : ""}`,
          details: detailParts.join("\n\n") || (a ? "تعذّر التحقق من هذا النص." : "Could not verify this text."),
        });
        return;
      }

      // Non-hadith content: never fabricate a verdict — route to dedicated tools.
      setResult({
        type: "other",
        verdict: a ? "استخدم الأداة المخصّصة" : "Use the dedicated tool",
        details: a
          ? "لا نُصدر حكمًا تلقائيًا على الفتاوى أو المحتوى الطائفي هنا حتى لا نختلق نتيجة. استخدم الأداة المخصّصة بمصدرها الموثّق:"
          : "We don't auto-judge fatwas or sectarian content here, to avoid fabricating a result. Use the dedicated, source-backed tool:",
        tools: dedicatedTools,
      });
    } catch {
      setError(t({ en: "Network error. Please try again.", ar: "خطأ في الاتصال. حاول مرة أخرى." }));
    } finally {
      setIsAnalyzing(false);
    }
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

        {/* Error */}
        {error && (
          <div className="glass-card" style={{ padding: 16, marginBottom: 24, borderLeft: "4px solid #EF4444", fontSize: 13, color: "#EF4444", fontFamily: ff }}>{error}</div>
        )}

        {/* Results */}
        {result && (
          <div className="glass-card" style={{ padding: 24, marginBottom: 24 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <span style={{ fontSize: 18 }}>{ANALYSIS_TYPES.find(t => t.id === result.type)?.emoji || "⚠️"}</span>
              <span style={{ fontWeight: 700, fontSize: 16, color: ANALYSIS_TYPES.find(t => t.id === result.type)?.color || "#F59E0B" }}>{result.verdict}</span>
            </div>
            <p style={{ fontSize: 13, lineHeight: 1.8, color: "var(--text-secondary)", whiteSpace: "pre-line", marginBottom: result.tools ? 16 : 0, fontFamily: ff }}>{result.details}</p>
            {result.tools && (
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {result.tools.map((tool) => (
                  <Link key={tool.href} href={tool.href} className="glass-card no-underline" style={{ padding: "10px 14px", fontSize: 13, fontWeight: 600, color: "var(--text-primary)", fontFamily: ff }}>
                    → {a ? tool.labelAr : tool.label}
                  </Link>
                ))}
              </div>
            )}
            {result.type === "hadith" && (
              <div style={{ marginTop: 16, paddingTop: 12, borderTop: "1px solid var(--border-primary)", fontSize: 12, color: "var(--text-muted)", fontStyle: "italic", fontFamily: ff }}>
                {t({ en: "Source: AI hadith-check engine (Al-Azhar/Dar al-Ifta-aligned). Verify critical rulings with certified scholars.", ar: "المصدر: محرك تدقيق الأحاديث بالذكاء (متوافق مع الأزهر/دار الإفتاء). تحقق من الأحكام المهمة مع علماء معتمدين." })}
              </div>
            )}
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
