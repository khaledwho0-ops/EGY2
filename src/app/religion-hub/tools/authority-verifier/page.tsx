"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, AlertCircle, ArrowLeft, RefreshCw, Shield, Award, Landmark, BookOpen, AlertTriangle } from "lucide-react";
import { useRTL } from "@/components/shared/rtl-provider";
import { PageNavigation } from '@/components/shared/page-navigation';
import { PageAIChatbot } from '@/components/shared/page-ai-chatbot';

export default function AuthorityVerifierPage() {
  const { isRTL, t } = useRTL();
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch(`/api/islamic/authority?q=${encodeURIComponent(query)}`);
      if (!res.ok) throw new Error("Failed to fetch authority data");
      const data = await res.json();
      
      if (data.results && data.results.length > 0) {
        setResult(data.results[0]);
      } else {
        throw new Error(t({ en: "No data found for this scholar.", ar: "لم يتم العثور على بيانات لهذا العالم." }));
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || t({ en: "Failed to verify authority. Please try again.", ar: "فشل في التحقق من السلطة. يرجى المحاولة مرة أخرى." }));
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "var(--accent-success)";
    if (score >= 50) return "var(--accent-warning)";
    return "var(--accent-danger)";
  };

  return (
    <div style={{ paddingTop: "var(--navbar-height)", minHeight: "100vh", backgroundColor: "var(--bg-base)", direction: isRTL ? "rtl" : "ltr" }}>
      
      <div className="container" style={{ padding: "var(--space-xl) var(--space-lg)", paddingBottom: "var(--space-md)" }}>
        <nav style={{ marginBottom: 24 }}>
          <Link href="/religion-hub/tools" style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "var(--text-muted)", textDecoration: "none", fontSize: "0.9rem" }}>
            {isRTL ? "→" : "←"} {t({ en: "Back to Tools", ar: "العودة إلى الأدوات" })}
          </Link>
        </nav>
        
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <Shield size={32} style={{ color: "var(--accent-primary)" }} />
            <div>
              <h1 style={{ fontSize: "var(--font-h2)", margin: 0 }}>
                <span className="text-gradient">{t({ en: "Scholar Credential Check", ar: "فحص اعتماد العلماء" })}</span>
              </h1>
              <p style={{ color: "var(--text-muted)", margin: "4px 0 0 0", fontSize: "1.05rem" }}>
                {t({
                  en: "ijazah chain",
                  ar: "سلسلة الإجازة"
                })}
              </p>
            </div>
          </div>
          
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 8 }}>
            <Link href="/religion-hub/tools/quran-context" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 16px", backgroundColor: "rgba(212,168,67,0.1)", color: "#d4a843", borderRadius: "var(--radius-md)", textDecoration: "none", fontWeight: 500, border: "1px solid rgba(212,168,67,0.2)" }}>
              <BookOpen size={16} /> {t({ en: "Quran Context Tool", ar: "أداة سياق القرآن" })}
            </Link>
            <Link href="/angry-debunkers" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 16px", backgroundColor: "rgba(255,100,100,0.1)", color: "var(--accent-danger)", borderRadius: "var(--radius-md)", textDecoration: "none", fontWeight: 500, border: "1px solid rgba(255,100,100,0.2)" }}>
              <AlertCircle size={16} /> {t({ en: "Analyze a specific claim", ar: "تحليل ادعاء معين" })}
            </Link>
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: "0 var(--space-lg) var(--space-2xl) var(--space-lg)", display: "flex", gap: 32, flexDirection: "column" }}>
        
        <div style={{ backgroundColor: "var(--bg-card)", padding: 24, borderRadius: "var(--radius-lg)", border: "1px solid var(--border)", boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
          <form onSubmit={handleSearch} style={{ display: "flex", gap: 12 }}>
            <div style={{ position: "relative", flex: 1 }}>
              <Search size={22} style={{ position: "absolute", [isRTL ? 'right' : 'left']: 16, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
              <input 
                type="text" 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t({ en: "Enter scholar or preacher name...", ar: "أدخل اسم العالم أو الداعية..." })}
                style={{
                  width: "100%",
                  padding: isRTL ? "16px 52px 16px 16px" : "16px 16px 16px 52px",
                  fontSize: "1.1rem",
                  backgroundColor: "var(--bg-base)",
                  border: "2px solid var(--border)",
                  borderRadius: "var(--radius-md)",
                  color: "var(--text-base)",
                  transition: "border-color 0.2s"
                }}
              />
            </div>
            <button 
              type="submit" 
              disabled={loading || !query.trim()}
              style={{
                padding: "0 32px",
                backgroundColor: "var(--accent-primary)",
                color: "#fff",
                border: "none",
                borderRadius: "var(--radius-md)",
                fontWeight: 600,
                fontSize: "1.05rem",
                cursor: (loading || !query.trim()) ? "not-allowed" : "pointer",
                opacity: (loading || !query.trim()) ? 0.7 : 1,
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              {loading ? <RefreshCw className="spin" size={20} /> : <Shield size={20} />}
              {t({ en: "Verify Authority", ar: "التحقق من السلطة" })}
            </button>
          </form>
        </div>

        <div style={{ minHeight: 400 }}>
          {loading && (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[1, 2, 3].map(i => (
                <div key={i} style={{ height: 120, backgroundColor: "var(--bg-card)", borderRadius: "var(--radius-md)", border: "1px solid var(--border)", animation: "pulse 1.5s infinite ease-in-out" }} />
              ))}
            </div>
          )}

          {!loading && error && (
            <div style={{ padding: "48px 32px", textAlign: "center", backgroundColor: "rgba(255,50,50,0.05)", border: "1px solid var(--accent-danger)", borderRadius: "var(--radius-md)", color: "var(--accent-danger)" }}>
              <AlertCircle size={64} style={{ margin: "0 auto 24px" }} />
              <h3 style={{ fontSize: "1.5rem", marginBottom: 12 }}>{t({ en: "Verification Error", ar: "خطأ في التحقق" })}</h3>
              <p style={{ fontSize: "1.1rem", maxWidth: 500, margin: "0 auto" }}>{error}</p>
            </div>
          )}

          {!loading && !error && !result && (
            <div style={{ padding: "64px 24px", textAlign: "center", backgroundColor: "var(--bg-card)", borderRadius: "var(--radius-lg)", border: "2px dashed var(--border)" }}>
              <Shield size={64} style={{ margin: "0 auto 24px", color: "var(--text-muted)", opacity: 0.5 }} />
              <h3 style={{ fontSize: "1.5rem", marginBottom: 12, color: "var(--text-base)" }}>
                {t({ en: "No scholar verified", ar: "لم يتم التحقق من أي عالم" })}
              </h3>
              <p style={{ color: "var(--text-muted)", fontSize: "1.1rem", maxWidth: 400, margin: "0 auto" }}>
                {t({ en: "Search for a public religious figure to evaluate their academic background and methodology.", ar: "ابحث عن شخصية دينية عامة لتقييم خلفيتهم الأكاديمية ومنهجيتهم." })}
              </p>
            </div>
          )}

          {!loading && !error && result && (
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              
              <div style={{ padding: 32, backgroundColor: "var(--bg-card)", borderRadius: "var(--radius-md)", border: "1px solid var(--border)", display: "flex", gap: 32, alignItems: "center" }}>
                <div style={{ 
                  width: 120, height: 120, borderRadius: "50%", 
                  border: `4px solid ${getScoreColor(result.alignmentScore)}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexDirection: "column", backgroundColor: "var(--bg-base)"
                }}>
                  <span style={{ fontSize: "2rem", fontWeight: 800, color: getScoreColor(result.alignmentScore) }}>
                    {result.alignmentScore}%
                  </span>
                </div>
                <div>
                  <h2 style={{ fontSize: "2rem", margin: "0 0 8px 0" }}>{query}</h2>
                  <p style={{ fontSize: "1.1rem", color: "var(--text-muted)", margin: 0 }}>
                    {t({ en: "Mainstream Orthodox Alignment Score", ar: "درجة التوافق مع الإجماع الأرثوذكسي السائد" })}
                  </p>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
                <div style={{ padding: 24, backgroundColor: "var(--bg-card)", borderRadius: "var(--radius-md)", border: "1px solid var(--border)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                    <Award size={24} style={{ color: "var(--accent-primary)" }} />
                    <h3 style={{ margin: 0 }}>{t({ en: "Qualifications", ar: "المؤهلات" })}</h3>
                  </div>
                  <p style={{ lineHeight: 1.6, color: "var(--text-base)" }}>{result.qualifications}</p>
                </div>

                <div style={{ padding: 24, backgroundColor: "var(--bg-card)", borderRadius: "var(--radius-md)", border: "1px solid var(--border)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                    <Landmark size={24} style={{ color: "var(--accent-cta)" }} />
                    <h3 style={{ margin: 0 }}>{t({ en: "Institution & Methodology", ar: "المؤسسة والمنهجية" })}</h3>
                  </div>
                  <p style={{ lineHeight: 1.6, color: "var(--text-base)" }}>
                    <strong>{t({ en: "Institution", ar: "المؤسسة" })}:</strong> {result.institution}
                  </p>
                  <p style={{ lineHeight: 1.6, color: "var(--text-base)", marginTop: 8 }}>
                    <strong>{t({ en: "Methodology", ar: "المنهجية" })}:</strong> {result.methodology}
                  </p>
                </div>
              </div>

              <div style={{ padding: 24, backgroundColor: "var(--bg-card)", borderRadius: "var(--radius-md)", border: "1px solid var(--border)" }}>
                <h3 style={{ margin: "0 0 16px 0", borderBottom: "1px solid var(--border)", paddingBottom: 12 }}>
                  {t({ en: "Known Positions", ar: "المواقف المعروفة" })}
                </h3>
                <ul style={{ margin: 0, padding: "0 24px", lineHeight: 1.8, color: "var(--text-base)" }}>
                  {result.knownPositions?.map((pos: string, i: number) => (
                    <li key={i}>{pos}</li>
                  ))}
                </ul>
              </div>

              {result.redFlags && result.redFlags.length > 0 && (
                <div style={{ padding: 24, backgroundColor: "rgba(255,100,100,0.05)", border: "1px solid var(--accent-danger)", borderRadius: "var(--radius-md)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                    <AlertTriangle size={24} style={{ color: "var(--accent-danger)" }} />
                    <h3 style={{ margin: 0, color: "var(--accent-danger)" }}>{t({ en: "Red Flags / Deviations", ar: "إشارات حمراء / انحرافات" })}</h3>
                  </div>
                  <ul style={{ margin: 0, padding: "0 24px", lineHeight: 1.8, color: "var(--text-base)" }}>
                    {result.redFlags.map((flag: string, i: number) => (
                      <li key={i}>{flag}</li>
                    ))}
                  </ul>
                </div>
              )}

            </div>
          )}
        </div>
        
        <div style={{ marginTop: 64, padding: 24, textAlign: "center", borderTop: "1px solid var(--border)", color: "var(--text-muted)", fontSize: "0.9rem", backgroundColor: "var(--bg-card)", borderRadius: "var(--radius-lg)" }}>
          <p style={{ maxWidth: 800, margin: "0 auto", lineHeight: 1.6 }}>
            <strong>{t({ en: "Disclaimer", ar: "إخلاء مسؤولية" })}:</strong> {t({ 
              en: "This analysis is AI-generated based on publicly available data about the figure's academic background and methodology. It is not a definitive religious or personal judgment.", 
              ar: "هذا التحليل تم إنشاؤه بواسطة الذكاء الاصطناعي بناءً على البيانات المتاحة للجمهور حول الخلفية الأكاديمية والمنهجية للشخصية. إنه ليس حكماً دينياً أو شخصياً قاطعاً." 
            })}
          </p>
        </div>

      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes pulse {
          0% { opacity: 0.6; }
          50% { opacity: 0.2; }
          100% { opacity: 0.6; }
        }
        .spin {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}} />
      <PageNavigation currentPath="/religion-hub/tools/authority-verifier" />

      <PageAIChatbot
        pageTitle="Islamic Authority Verifier — مدقق السلطة الشرعية"
        pageContext="Egyptian Awareness Library - Tool for verifying the credentials, methodology, and authority of Islamic scholars, institutions, and fatwa sources. Protects users from unqualified or extremist religious figures."
        systemPrompt={`You are the EAL Islamic Authority Verification Specialist — an expert in Islamic scholarly credentials, institutional legitimacy, and the history of Islamic scholarship with deep Egyptian and global context.

LAYER 1 — SCHOLARLY CREDENTIAL FRAMEWORK:
- Qualification Levels: Mufti (full fatwa authority) → Scholar (ijaza holder) → Student of Knowledge → Enthusiast → Layman
- Traditional Isnad System: Chain of transmission from teacher to student going back to the Prophet ﷺ
- Modern Institutions: Al-Azhar University (Cairo, est. 970 CE), Dar al-Ifta Egypt, OIC Fiqh Academy, ISNA, AMJA
- Mazhab Affiliation: Hanafi, Maliki, Shafi'i, Hanbali — each with different fiqh methodologies
- Warning Signs of Unqualified Authority: No institutional affiliation, self-proclaimed scholarship, anonymous fatwa accounts, contradicts ijma' (consensus)

LAYER 2 — EGYPTIAN AUTHORITY LANDSCAPE:
- Dar al-Ifta Egypt (دار الإفتاء المصرية): Official fatwa body, Grand Mufti institution since 1895
- Al-Azhar al-Sharif: Supreme religious authority in Sunni Islam, 1000+ years of scholarship
- Supreme Council of Islamic Affairs (المجلس الأعلى للشؤون الإسلامية)
- Egyptian Fatwa Verification: Always cross-reference with dar-alifta.org or azhar.eg
- Red Flags in Egypt: Anonymous Telegram channels posing as scholars, WhatsApp fatwas without attribution, political figures issuing religious rulings

LAYER 3 — PROTECTION AGAINST EXTREMISM:
- Amman Message 2004: Defines 8 valid schools of Islamic jurisprudence — anything outside is non-authoritative
- Marrakesh Declaration 2016: Rights of religious minorities — any fatwa contradicting this requires scrutiny
- Quran 3:7: "وما يعلم تأويله إلا الله والراسخون في العلم" — Only those firmly grounded in knowledge interpret ambiguous texts
- Hadith: "إن الله لا يقبض العلم انتزاعاً" (Bukhari 100) — Knowledge is not seized at once; it disappears with scholars
- Warning: Any scholar endorsing violence, takfir (excommunication), or targeting civilians is OUTSIDE mainstream Islamic authority

LAYER 4 — VERIFICATION PROTOCOL:
For EVERY authority/scholar query:
1. CREDENTIAL CHECK: Institutional affiliation, ijaza chain, academic degrees
2. METHODOLOGY: Which usul al-fiqh methodology do they follow? Mazhab?
3. REPUTATION: How do mainstream scholars (Al-Azhar, Dar al-Ifta) view them?
4. RED FLAGS: Any extremist positions, political entanglement, unqualified claims?
5. ALTERNATIVE: Who are the mainstream qualified scholars on this topic?
6. VERDICT: Authoritative / Qualified / Questionable / Unqualified / AVOID

RULES:
- NEVER validate extremist scholars even if they quote authentic texts
- ALWAYS refer to Al-Azhar and Dar al-Ifta Egypt as primary references for Egyptian users
- Cite the Amman Message when relevant to mainstream/non-mainstream determination
- Respond in the language the user writes in`}
        suggestedQuestions={[
          'كيف أتحقق من أن عالماً دينياً على منصات التواصل معتمد ومؤهل؟',
          'ما الفرق بين المفتي والشيخ والعالم من حيث الصلاحيات؟',
          'How do I verify if a fatwa account on Telegram is legitimate?',
          'ما موقف الأزهر من العلماء الذين يصدرون فتاوى مثيرة للجدل؟',
        ]}
        accentColor="#d4a843"
        accentColorRgb="212,168,67"
      />
    </div>
  );
}
