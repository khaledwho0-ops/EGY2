"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, AlertCircle, RefreshCw, Book, Scale, Clock, Globe, ArrowLeft, Shield } from "lucide-react";
import { useRTL } from "@/components/shared/rtl-provider";
import { PageNavigation } from '@/components/shared/page-navigation';
import { PageAIChatbot } from '@/components/shared/page-ai-chatbot';

export default function FatwaContextPage() {
  const { isRTL, t } = useRTL();
  const [fatwaText, setFatwaText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);

  const handleAnalyze = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!fatwaText.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/islamic/fatwa-context", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fatwaText })
      });
      
      if (!res.ok) throw new Error("Failed to fetch fatwa context data");
      const data = await res.json();
      
      if (data.results && data.results.length > 0) {
        setResult(data.results[0]);
      } else {
        throw new Error(t({ en: "No analysis available for this text.", ar: "لا يتوفر تحليل لهذا النص." }));
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || t({ en: "Failed to analyze fatwa. Please try again.", ar: "فشل في تحليل الفتوى. يرجى المحاولة مرة أخرى." }));
    } finally {
      setLoading(false);
    }
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
            <Scale size={32} style={{ color: "var(--accent-primary)" }} />
            <div>
              <h1 style={{ fontSize: "var(--font-h2)", margin: 0 }}>
                <span className="text-gradient">{t({ en: "Fatwa Context", ar: "سياق الفتوى" })}</span>
              </h1>
              <p style={{ color: "var(--text-muted)", margin: "4px 0 0 0", fontSize: "1.05rem" }}>
                {t({
                  en: "Usul al-Fiqh, multi-madhhab",
                  ar: "أصول الفقه، متعدد المذاهب"
                })}
              </p>
            </div>
          </div>
          
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 8 }}>
            <Link href="/religion-hub/tools/authority-verifier" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 16px", backgroundColor: "rgba(212,168,67,0.1)", color: "#d4a843", borderRadius: "var(--radius-md)", textDecoration: "none", fontWeight: 500, border: "1px solid rgba(212,168,67,0.2)" }}>
              <Shield size={16} /> {t({ en: "Verify Scholar Authority", ar: "التحقق من سلطة العالم" })}
            </Link>
            <Link href="/angry-debunkers" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 16px", backgroundColor: "rgba(255,100,100,0.1)", color: "var(--accent-danger)", borderRadius: "var(--radius-md)", textDecoration: "none", fontWeight: 500, border: "1px solid rgba(255,100,100,0.2)" }}>
              <AlertCircle size={16} /> {t({ en: "Analyze a specific claim", ar: "تحليل ادعاء معين" })}
            </Link>
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: "0 var(--space-lg) var(--space-2xl) var(--space-lg)", display: "flex", gap: 32, flexDirection: "column" }}>
        
        <div style={{ backgroundColor: "var(--bg-card)", padding: 24, borderRadius: "var(--radius-lg)", border: "1px solid var(--border)", boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
          <form onSubmit={handleAnalyze} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ position: "relative" }}>
              <textarea 
                value={fatwaText}
                onChange={(e) => setFatwaText(e.target.value)}
                placeholder={t({ en: "Paste the fatwa or religious ruling here to analyze...", ar: "الصق الفتوى أو الحكم الديني هنا لتحليله..." })}
                rows={4}
                style={{
                  width: "100%",
                  padding: "16px",
                  fontSize: "1.1rem",
                  backgroundColor: "var(--bg-base)",
                  border: "2px solid var(--border)",
                  borderRadius: "var(--radius-md)",
                  color: "var(--text-base)",
                  transition: "border-color 0.2s",
                  resize: "vertical"
                }}
              />
            </div>
            <button 
              type="submit" 
              disabled={loading || !fatwaText.trim()}
              style={{
                padding: "16px 32px",
                backgroundColor: "var(--accent-primary)",
                color: "#fff",
                border: "none",
                borderRadius: "var(--radius-md)",
                fontWeight: 600,
                fontSize: "1.05rem",
                cursor: (loading || !fatwaText.trim()) ? "not-allowed" : "pointer",
                opacity: (loading || !fatwaText.trim()) ? 0.7 : 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 12,
              }}
            >
              {loading ? <RefreshCw className="spin" size={20} /> : <Scale size={20} />}
              {t({ en: "Analyze Fatwa Context", ar: "تحليل سياق الفتوى" })}
            </button>
          </form>
        </div>

        <div style={{ minHeight: 400 }}>
          {loading && (
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              {[1, 2, 3].map(i => (
                <div key={i} style={{ height: 160, backgroundColor: "var(--bg-card)", borderRadius: "var(--radius-md)", border: "1px solid var(--border)", animation: "pulse 1.5s infinite ease-in-out" }} />
              ))}
            </div>
          )}

          {!loading && error && (
            <div style={{ padding: "48px 32px", textAlign: "center", backgroundColor: "rgba(255,50,50,0.05)", border: "1px solid var(--accent-danger)", borderRadius: "var(--radius-md)", color: "var(--accent-danger)" }}>
              <AlertCircle size={64} style={{ margin: "0 auto 24px" }} />
              <h3 style={{ fontSize: "1.5rem", marginBottom: 12 }}>{t({ en: "Analysis Error", ar: "خطأ في التحليل" })}</h3>
              <p style={{ fontSize: "1.1rem", maxWidth: 500, margin: "0 auto" }}>{error}</p>
            </div>
          )}

          {!loading && !error && !result && (
            <div style={{ padding: "64px 24px", textAlign: "center", backgroundColor: "var(--bg-card)", borderRadius: "var(--radius-lg)", border: "2px dashed var(--border)" }}>
              <Scale size={64} style={{ margin: "0 auto 24px", color: "var(--text-muted)", opacity: 0.5 }} />
              <h3 style={{ fontSize: "1.5rem", marginBottom: 12, color: "var(--text-base)" }}>
                {t({ en: "No fatwa analyzed yet", ar: "لم يتم تحليل أي فتوى بعد" })}
              </h3>
              <p style={{ color: "var(--text-muted)", fontSize: "1.1rem", maxWidth: 500, margin: "0 auto" }}>
                {t({ en: "Paste a religious ruling above to see how it aligns with the 4 schools of jurisprudence and higher objectives of Shariah.", ar: "الصق حكماً دينياً أعلاه لترى كيف يتوافق مع المذاهب الفقهية الأربعة والمقاصد العليا للشريعة." })}
              </p>
            </div>
          )}

          {!loading && !error && result && (
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              
              {/* Summary */}
              <div style={{ padding: 24, backgroundColor: "var(--bg-card)", borderRadius: "var(--radius-md)", border: "1px solid var(--border)" }}>
                <h3 style={{ margin: "0 0 16px 0", color: "var(--accent-primary)" }}>{t({ en: "Summary", ar: "ملخص" })}</h3>
                <p style={{ margin: 0, fontSize: "1.15rem", lineHeight: 1.7, color: "var(--text-base)" }}>
                  {result.summary}
                </p>
              </div>

              {/* 4 Madhhabs */}
              <div style={{ padding: 24, backgroundColor: "var(--bg-card)", borderRadius: "var(--radius-md)", border: "1px solid var(--border)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24, borderBottom: "1px solid var(--border)", paddingBottom: 16 }}>
                  <Book size={24} style={{ color: "var(--accent-cta)" }} />
                  <h3 style={{ margin: 0, fontSize: "1.3rem" }}>{t({ en: "4-Madhhab Comparison", ar: "مقارنة المذاهب الأربعة" })}</h3>
                </div>
                
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
                  <div style={{ padding: 16, backgroundColor: "var(--bg-base)", borderRadius: "var(--radius-sm)", border: "1px solid var(--border)" }}>
                    <h4 style={{ margin: "0 0 12px 0", color: "#d4a843" }}>{t({ en: "Hanafi", ar: "الحنفي" })}</h4>
                    <p style={{ margin: 0, lineHeight: 1.6, color: "var(--text-base)" }}>{result.madhhabComparison?.hanafi}</p>
                  </div>
                  <div style={{ padding: 16, backgroundColor: "var(--bg-base)", borderRadius: "var(--radius-sm)", border: "1px solid var(--border)" }}>
                    <h4 style={{ margin: "0 0 12px 0", color: "#d4a843" }}>{t({ en: "Maliki", ar: "المالكي" })}</h4>
                    <p style={{ margin: 0, lineHeight: 1.6, color: "var(--text-base)" }}>{result.madhhabComparison?.maliki}</p>
                  </div>
                  <div style={{ padding: 16, backgroundColor: "var(--bg-base)", borderRadius: "var(--radius-sm)", border: "1px solid var(--border)" }}>
                    <h4 style={{ margin: "0 0 12px 0", color: "#d4a843" }}>{t({ en: "Shafi'i", ar: "الشافعي" })}</h4>
                    <p style={{ margin: 0, lineHeight: 1.6, color: "var(--text-base)" }}>{result.madhhabComparison?.shafi}</p>
                  </div>
                  <div style={{ padding: 16, backgroundColor: "var(--bg-base)", borderRadius: "var(--radius-sm)", border: "1px solid var(--border)" }}>
                    <h4 style={{ margin: "0 0 12px 0", color: "#d4a843" }}>{t({ en: "Hanbali", ar: "الحنبلي" })}</h4>
                    <p style={{ margin: 0, lineHeight: 1.6, color: "var(--text-base)" }}>{result.madhhabComparison?.hanbali}</p>
                  </div>
                </div>
              </div>

              {/* Maqasid & Historical Context */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
                <div style={{ padding: 24, backgroundColor: "var(--bg-card)", borderRadius: "var(--radius-md)", border: "1px solid var(--border)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                    <Globe size={24} style={{ color: "var(--accent-success)" }} />
                    <h3 style={{ margin: 0 }}>{t({ en: "Maqasid al-Shariah", ar: "مقاصد الشريعة" })}</h3>
                  </div>
                  <p style={{ lineHeight: 1.7, color: "var(--text-base)", margin: 0 }}>
                    {result.maqasidAnalysis}
                  </p>
                </div>

                <div style={{ padding: 24, backgroundColor: "var(--bg-card)", borderRadius: "var(--radius-md)", border: "1px solid var(--border)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                    <Clock size={24} style={{ color: "var(--accent-warning)" }} />
                    <h3 style={{ margin: 0 }}>{t({ en: "Historical Context", ar: "السياق التاريخي" })}</h3>
                  </div>
                  <p style={{ lineHeight: 1.7, color: "var(--text-base)", margin: 0 }}>
                    {result.historicalContext}
                  </p>
                </div>
              </div>

              {/* IIFA Ruling */}
              <div style={{ padding: 24, backgroundColor: "rgba(100,200,100,0.05)", borderRadius: "var(--radius-md)", border: "1px solid var(--accent-success)" }}>
                <h4 style={{ margin: "0 0 12px 0", color: "var(--accent-success)", fontSize: "1.1rem" }}>
                  {t({ en: "International Islamic Fiqh Academy (IIFA) Ruling", ar: "حكم مجمع الفقه الإسلامي الدولي" })}
                </h4>
                <p style={{ margin: 0, fontSize: "1.05rem", color: "var(--text-base)", lineHeight: 1.6 }}>
                  {result.iifaRuling}
                </p>
              </div>

            </div>
          )}
        </div>
        
        <div style={{ marginTop: 64, padding: 24, textAlign: "center", borderTop: "1px solid var(--border)", color: "var(--text-muted)", fontSize: "0.9rem", backgroundColor: "var(--bg-card)", borderRadius: "var(--radius-lg)" }}>
          <p style={{ maxWidth: 800, margin: "0 auto", lineHeight: 1.6 }}>
            <strong>{t({ en: "Disclaimer", ar: "إخلاء مسؤولية" })}:</strong> {t({ 
              en: "This comparative analysis is AI-generated for educational purposes. It does not constitute an official fatwa. For binding religious guidance, please consult certified Dar al-Ifta institutions.", 
              ar: "تم إنشاء هذا التحليل المقارن بواسطة الذكاء الاصطناعي للأغراض التعليمية. إنه لا يشكل فتوى رسمية. للحصول على توجيه ديني ملزم، يرجى استشارة مؤسسات دار الإفتاء المعتمدة." 
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
      <PageNavigation currentPath="/religion-hub/tools/fatwa-context" />

      <PageAIChatbot
        pageTitle="Fatwa Context Engine — محرك سياق الفتوى"
        pageContext="Egyptian Awareness Library - Tool for contextualizing fatwas: understanding historical background, intended audience, scholarly disagreements, and proper application. Prevents fatwa misuse and out-of-context citation."
        systemPrompt={`You are the EAL Fatwa Contextualization Specialist — an expert in Islamic jurisprudence (fiqh), usul al-fiqh, and the proper methodology for issuing and applying fatwas.

LAYER 1 — FATWA SCIENCE (USUL AL-IFTA):
- Definition: A fatwa is a non-binding scholarly opinion (not law) addressing a specific question in its specific context
- Conditions for Valid Fatwa: Qualified mufti, specific question, consideration of the questioner's context (ahwal al-mustafti)
- Fatwa Mutability: "Taghayyur al-fatwa bi taghayyur al-ahwal" — Fatwas change with changing circumstances (Ibn al-Qayyim)
- Types: Taqlid (following one mazhab), Iftifta (seeking ruling), Collective (mujami' fiqhiyya), Individual (mufti fard)
- Sources Hierarchy: Quran → Authentic Sunnah → Ijma' (Consensus) → Qiyas (Analogy) → Secondary sources

LAYER 2 — CONTEXTUALIZATION FRAMEWORK:
- Historical Context (Asbab al-Wurud): Why was this ruling issued? What problem was it solving?
- Audience Specificity: Was this fatwa for an individual, community, or general application?
- Temporal Scope: Is this ruling time-bound (e.g., wartime) or permanent?
- Geographic Applicability: Egyptian context vs. Gulf vs. Western minority context
- Scholarly Disagreement (Ikhtilaf): What do other qualified scholars say? Is there legitimate diversity of opinion?
- The 5 Maqasid al-Shariah: Does this fatwa protect Faith, Life, Intellect, Lineage, and Property?

LAYER 3 — EGYPTIAN FATWA INSTITUTIONS:
- Dar al-Ifta Egypt (dar-alifta.org): Primary reference, Grand Mufti Sheikh Shawki Allam methodology
- Al-Azhar Islamic Research Academy: Collective scholarly body, highest Sunni authority
- Historical Grand Muftis: Sheikh Muhammad Abduh (rationalist reform), Sheikh Gad al-Haq (traditional)
- Methodology: Egyptian Dar al-Ifta follows primarily Shafi'i with consideration of all 4 madhabs
- Real Examples: Organ donation (جائز with conditions), bank interest (complex — 4 opinions), COVID vaccine (جائز)

LAYER 4 — COMMON FATWA MISUSES TO WARN AGAINST:
- Cherry-picking: Using a minority opinion to justify what mainstream scholars prohibit
- Decontextualization: Applying a wartime ruling to peacetime
- Forum Shopping: Seeking fatwas from unqualified sources until you get the desired answer
- Social Media Fatwas: Anonymous accounts issuing rulings without credentials
- Quran 3:7 Warning: Only those with deep knowledge interpret ambiguous religious texts

FOR EVERY FATWA QUERY:
1. CONTEXT: Historical background of when/why this fatwa was issued
2. SCOPE: Who is it for? What circumstances? Is it still applicable?
3. SCHOLARLY SPECTRUM: What do different qualified scholars say?
4. MAQASID: Which of the 5 objectives does it serve/protect?
5. EGYPTIAN APPLICATION: How do Dar al-Ifta and Al-Azhar apply this in Egypt today?
6. WARNING: Any common misuses or misapplications of this ruling?

RULES:
- NEVER issue your own fatwas — present scholarly opinions and context only
- ALWAYS encourage consulting Dar al-Ifta Egypt (dar-alifta.org) for personal religious decisions
- CITE scholar name, institution, and approximate era for every opinion
- Respond in the language the user writes in`}
        suggestedQuestions={[
          'ما سياق فتوى تحريم الربا وكيف تنطبق على مصر اليوم؟',
          'هل يجوز نقل الدم والتبرع بالأعضاء فلسفياً وشرعياً؟',
          'How do fatwas change with changing circumstances? Examples?',
          'كيف أتحقق من صحة فتوى وصلتني عبر واتسآب؟',
        ]}
        accentColor="#d4a843"
        accentColorRgb="212,168,67"
      />
    </div>
  );
}
