"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRTL } from "@/components/shared/rtl-provider";
import { PageNavigation } from '@/components/shared/page-navigation';

const MAQASID = [
  { id: "din", emoji: "🕌", name: "Hifz al-Din", nameAr: "حفظ الدين", full: "Preservation of Religion", fullAr: "حفظ الدين", desc: "Protecting the integrity of faith from distortion, coercion, extremism, and exploitation. Ensuring religious practice is informed, voluntary, and authenticated.", descAr: "حماية سلامة الإيمان من التشويه والإكراه والتطرف والاستغلال.", color: "#F59E0B", examples: ["Is this fatwa protecting or distorting religion?", "Does this ruling serve genuine faith or political control?"] },
  { id: "nafs", emoji: "❤️", name: "Hifz al-Nafs", nameAr: "حفظ النفس", full: "Preservation of Life", fullAr: "حفظ النفس", desc: "Safeguarding human life, physical and mental health. Any ruling that endangers life (e.g., anti-vaccine fatwas) violates this foundational objective.", descAr: "حماية الحياة البشرية والصحة الجسدية والنفسية.", color: "#EF4444", examples: ["Does refusing medical treatment serve this maqsad?", "Is this health claim compatible with preserving life?"] },
  { id: "aql", emoji: "🧠", name: "Hifz al-'Aql", nameAr: "حفظ العقل", full: "Preservation of Intellect", fullAr: "حفظ العقل", desc: "Protecting the capacity for rational thought. Misinformation, intellectual manipulation, and blind following all violate this objective.", descAr: "حماية القدرة على التفكير العقلاني. المعلومات المضللة والتلاعب الفكري يخالفان هذا المقصد.", color: "#6366f1", examples: ["Does spreading this unverified claim protect or harm intellect?", "Is blind taqlid without understanding compatible with hifz al-'aql?"] },
  { id: "nasl", emoji: "👨‍👩‍👧‍👦", name: "Hifz al-Nasl", nameAr: "حفظ النسل", full: "Preservation of Lineage", fullAr: "حفظ النسل", desc: "Protecting family structure, lineage, and progeny. Includes marriage rights, inheritance accuracy, and protection from exploitation.", descAr: "حماية بنية الأسرة والنسل والذرية.", color: "#EC4899", examples: ["Does this inheritance calculation follow Quran 4:11-12?", "Is this marriage ruling protecting or exploiting family rights?"] },
  { id: "mal", emoji: "💰", name: "Hifz al-Mal", nameAr: "حفظ المال", full: "Preservation of Property", fullAr: "حفظ المال", desc: "Protecting wealth from fraud, riba, gharar, and exploitation. Every financial product must be scrutinized against Shariah principles.", descAr: "حماية المال من الاحتيال والربا والغرر والاستغلال.", color: "#10B981", examples: ["Is this 'Islamic' investment truly free from riba?", "Does this cryptocurrency ruling account for gharar and maysir?"] },
];

export default function MaqasidPage() {
  const { isRTL: a, t } = useRTL();
  const ff = a ? "'Noto Kufi Arabic', sans-serif" : "inherit";
  const [mounted, setMounted] = useState(false);
  const [activeMaqsad, setActiveMaqsad] = useState(0);
  const [testClaim, setTestClaim] = useState("");
  const [analysis, setAnalysis] = useState<{ verdict: string; verdictAr: string; reasoning: string; reasoningAr: string; caveats: string[] } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const runAnalysis = async () => {
    if (!testClaim.trim()) return;
    setLoading(true);
    setError(null);
    setAnalysis(null);
    try {
      const res = await fetch("/api/islamic/maqasid", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ claim: testClaim, maqsadId: MAQASID[activeMaqsad].id }),
      });
      const json = await res.json();
      const r = json?.results?.[0];
      if (!res.ok || !r) {
        setError(json?.error || t({ en: "Reasoning unavailable right now. Please try again.", ar: "الاستدلال غير متاح حاليًا. حاول مرة أخرى." }));
        return;
      }
      setAnalysis({
        verdict: r.verdict ?? "Inconclusive",
        verdictAr: r.verdictAr ?? "غير حاسم",
        reasoning: r.reasoning ?? "",
        reasoningAr: r.reasoningAr ?? "",
        caveats: Array.isArray(r.caveats) ? r.caveats : [],
      });
    } catch {
      setError(t({ en: "Network error. Please try again.", ar: "خطأ في الاتصال. حاول مرة أخرى." }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ paddingTop: "var(--navbar-height)", minHeight: "100vh", direction: a ? "rtl" : "ltr" }}>
      <div className="container" style={{ padding: "var(--space-xl) var(--space-lg)", maxWidth: 1000 }}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{ width: 80, height: 80, borderRadius: "50%", background: "linear-gradient(135deg, rgba(245,158,11,0.15), rgba(99,102,241,0.15))", border: "2px solid rgba(245,158,11,0.3)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", fontSize: 36 }}>🎯</div>
          <h1 style={{ fontSize: 28, marginBottom: 8, fontFamily: ff }}>{t({ en: "Maqasid al-Shariah Reasoning", ar: "استدلال مقاصد الشريعة", arEG: "استدلال مقاصد الشريعة" })}</h1>
          <p style={{ color: "var(--text-muted)", fontSize: 14, maxWidth: 600, margin: "0 auto", lineHeight: 1.7, fontFamily: ff }}>
            {t({ en: "The five essential objectives of Islamic law — the ultimate test for any ruling or claim. Based on Al-Shatibi's Al-Muwafaqat and Al-Ghazali's Al-Mustasfa.", ar: "المقاصد الخمسة الأساسية للشريعة الإسلامية — الاختبار النهائي لأي حكم أو ادعاء. مبني على الموافقات للشاطبي والمستصفى للغزالي.", arEG: "المقاصد الخمسة الأساسية للشريعة — الاختبار النهائي لأي حكم أو ادعاء." })}
          </p>
        </div>

        {/* 5 Maqasid Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 12, marginBottom: 32 }}>
          {MAQASID.map((m, i) => (
            <button key={m.id} onClick={() => setActiveMaqsad(i)} className="glass-card" style={{
              padding: 16, textAlign: "center", cursor: "pointer", transition: "all 0.2s",
              border: activeMaqsad === i ? `2px solid ${m.color}` : "1px solid var(--border-primary)",
              background: activeMaqsad === i ? `${m.color}10` : "var(--bg-secondary)",
            }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{m.emoji}</div>
              <div style={{ fontSize: 12, fontWeight: 700, color: activeMaqsad === i ? m.color : "var(--text-secondary)", fontFamily: ff }}>{a ? m.nameAr : m.name}</div>
            </button>
          ))}
        </div>

        {/* Active Maqsad Detail */}
        {(() => {
          const m = MAQASID[activeMaqsad];
          return (
            <div className="glass-card" style={{ padding: 24, marginBottom: 24, borderLeft: `4px solid ${m.color}` }}>
              <h2 style={{ fontSize: 20, marginBottom: 8, fontFamily: ff, color: m.color }}>
                {m.emoji} {a ? m.fullAr : m.full}
              </h2>
              <p style={{ fontSize: 14, lineHeight: 1.8, color: "var(--text-secondary)", marginBottom: 16, fontFamily: ff }}>{a ? m.descAr : m.desc}</p>
              <div>
                <strong style={{ fontSize: 13, fontFamily: ff }}>{t({ en: "Test Questions:", ar: "أسئلة اختبارية:", arEG: "أسئلة اختبارية:" })}</strong>
                <ul style={{ margin: "8px 0 0", paddingInlineStart: 20, fontSize: 13, color: "var(--text-muted)", lineHeight: 2 }}>
                  {m.examples.map((ex, i) => <li key={i}>{ex}</li>)}
                </ul>
              </div>
            </div>
          );
        })()}

        {/* Claim Analysis Input */}
        <div className="glass-card" style={{ padding: 24, marginBottom: 24 }}>
          <h3 style={{ fontSize: 16, marginBottom: 12, fontFamily: ff }}>{t({ en: "🧪 Test a Claim Against Maqasid", ar: "🧪 اختبر ادعاء ضد المقاصد", arEG: "🧪 اختبر ادعاء ضد المقاصد" })}</h3>
          <textarea
            value={testClaim}
            onChange={(e) => setTestClaim(e.target.value)}
            placeholder={a ? "اكتب الادعاء أو الحكم هنا..." : "Enter a claim or ruling to test..."}
            style={{ width: "100%", padding: 14, borderRadius: 12, border: "1px solid var(--border-primary)", background: "var(--bg-secondary)", color: "var(--text-primary)", fontSize: 14, resize: "vertical", minHeight: 80, fontFamily: ff }}
          />
          <button onClick={runAnalysis} disabled={loading || !testClaim.trim()} className="btn-primary" style={{ marginTop: 12, padding: "10px 24px", fontSize: 14, opacity: loading || !testClaim.trim() ? 0.6 : 1 }}>
            {loading ? t({ en: "Reasoning...", ar: "جاري الاستدلال...", arEG: "بنحلل..." }) : t({ en: `Analyze against ${MAQASID[activeMaqsad].name}`, ar: `حلل ضد ${MAQASID[activeMaqsad].nameAr}`, arEG: `حلل ضد ${MAQASID[activeMaqsad].nameAr}` })}
          </button>
          {error && (
            <div style={{ marginTop: 16, padding: 16, borderRadius: 12, background: "rgba(239,68,68,0.06)", border: "1px solid rgba(239,68,68,0.2)", fontSize: 13, color: "#EF4444", fontFamily: ff }}>{error}</div>
          )}
          {analysis && (
            <div style={{ marginTop: 16, padding: 16, borderRadius: 12, background: "rgba(99,102,241,0.05)", border: "1px solid rgba(99,102,241,0.15)", fontSize: 13, lineHeight: 1.8, color: "var(--text-secondary)", fontFamily: ff }}>
              <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 8, color: "var(--text-primary)" }}>
                {t({ en: "Verdict", ar: "الحكم", arEG: "الحكم" })}: {a ? analysis.verdictAr : analysis.verdict}
              </div>
              <p style={{ margin: "0 0 12px" }}>{a ? (analysis.reasoningAr || analysis.reasoning) : analysis.reasoning}</p>
              {analysis.caveats.length > 0 && (
                <ul style={{ margin: "0 0 12px", paddingInlineStart: 20 }}>
                  {analysis.caveats.map((c, i) => <li key={i}>{c}</li>)}
                </ul>
              )}
              <div style={{ marginTop: 8, paddingTop: 8, borderTop: "1px solid var(--border-primary)", fontSize: 12, color: "var(--text-muted)", fontStyle: "italic" }}>
                {t({ en: "⚖️ AI reasoning, not a fatwa. For official rulings consult Dar Al-Ifta or Al-Azhar.", ar: "⚖️ اجتهاد بالذكاء وليس فتوى. للأحكام الرسمية راجع دار الإفتاء أو الأزهر.", arEG: "⚖️ اجتهاد بالذكاء مش فتوى. للأحكام الرسمية ارجع لدار الإفتاء أو الأزهر." })}
              </div>
            </div>
          )}
        </div>

        <div style={{ textAlign: "center" }}>
          <Link href="/religion-hub" className="glass-card no-underline" style={{ padding: "12px 28px", fontSize: 14, fontFamily: ff, color: "inherit", display: "inline-block" }}>
            {t({ en: "← Back to Islamic Hub", ar: "← العودة للمركز الإسلامي", arEG: "← الرجوع للمركز الإسلامي" })}
          </Link>
        </div>
      </div>
      <PageNavigation currentPath="/religion-hub/maqasid" />
    </div>
  );
}
