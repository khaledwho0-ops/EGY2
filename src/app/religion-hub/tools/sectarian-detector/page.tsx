"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, AlertCircle, RefreshCw, AlertTriangle, ShieldCheck, FileWarning, ArrowLeft, HeartHandshake } from "lucide-react";
import { useRTL } from "@/components/shared/rtl-provider";
import { PageNavigation } from '@/components/shared/page-navigation';

export default function SectarianDetectorPage() {
  const { isRTL, t } = useRTL();
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);

  const handleAnalyze = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!text.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/islamic/sectarian", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text })
      });
      
      if (!res.ok) throw new Error("Failed to fetch sectarian analysis");
      const data = await res.json();
      
      if (data.results && data.results.length > 0) {
        setResult(data.results[0]);
      } else {
        throw new Error(t({ en: "No analysis available for this text.", ar: "لا يتوفر تحليل لهذا النص." }));
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || t({ en: "Failed to analyze text. Please try again.", ar: "فشل في تحليل النص. يرجى المحاولة مرة أخرى." }));
    } finally {
      setLoading(false);
    }
  };

  const getLevelColor = (level: string) => {
    switch (level?.toLowerCase()) {
      case "low": return "var(--accent-success)";
      case "medium": return "var(--accent-warning)";
      case "high": return "var(--accent-danger)";
      case "critical": return "#800000"; // Dark red
      default: return "var(--text-muted)";
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
            <FileWarning size={32} style={{ color: "var(--accent-danger)" }} />
            <div>
              <h1 style={{ fontSize: "var(--font-h2)", margin: 0 }}>
                <span className="text-gradient" style={{ backgroundImage: "linear-gradient(135deg, #fff 30%, var(--accent-danger))" }}>
                  {t({ en: "Sectarian Bias Detector", ar: "كاشف التحيز الطائفي" })}
                </span>
              </h1>
              <p style={{ color: "var(--text-muted)", margin: "4px 0 0 0", fontSize: "1.05rem" }}>
                {t({
                  en: "taassub detection",
                  ar: "كشف التعصّب"
                })}
              </p>
            </div>
          </div>
          
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 8 }}>
            <Link href="/religion-hub/tools/authority-verifier" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 16px", backgroundColor: "rgba(212,168,67,0.1)", color: "#d4a843", borderRadius: "var(--radius-md)", textDecoration: "none", fontWeight: 500, border: "1px solid rgba(212,168,67,0.2)" }}>
              <ShieldCheck size={16} /> {t({ en: "Verify Scholar Authority", ar: "التحقق من سلطة العالم" })}
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
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder={t({ en: "Paste the text, sermon snippet, or post to analyze...", ar: "الصق النص أو مقتطف الخطبة أو المنشور لتحليله..." })}
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
              disabled={loading || !text.trim()}
              style={{
                padding: "16px 32px",
                backgroundColor: "var(--accent-danger)",
                color: "#fff",
                border: "none",
                borderRadius: "var(--radius-md)",
                fontWeight: 600,
                fontSize: "1.05rem",
                cursor: (loading || !text.trim()) ? "not-allowed" : "pointer",
                opacity: (loading || !text.trim()) ? 0.7 : 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 12,
              }}
            >
              {loading ? <RefreshCw className="spin" size={20} /> : <AlertTriangle size={20} />}
              {t({ en: "Scan for Sectarianism", ar: "فحص الطائفية" })}
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
              <FileWarning size={64} style={{ margin: "0 auto 24px", color: "var(--text-muted)", opacity: 0.5 }} />
              <h3 style={{ fontSize: "1.5rem", marginBottom: 12, color: "var(--text-base)" }}>
                {t({ en: "No text scanned", ar: "لم يتم فحص أي نص" })}
              </h3>
              <p style={{ color: "var(--text-muted)", fontSize: "1.1rem", maxWidth: 500, margin: "0 auto" }}>
                {t({ en: "Paste a text snippet above to check it against the Amman Message consensus and identify exclusionary rhetoric.", ar: "الصق مقتطف نص أعلاه للتحقق منه مقابل إجماع رسالة عمان وتحديد الخطاب الإقصائي." })}
              </p>
            </div>
          )}

          {!loading && !error && result && (
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
                {/* Takfir Detection */}
                <div style={{ padding: 24, backgroundColor: result.takfirDetection?.detected ? "rgba(255,50,50,0.05)" : "rgba(100,200,100,0.05)", borderRadius: "var(--radius-md)", border: `1px solid ${result.takfirDetection?.detected ? 'var(--accent-danger)' : 'var(--accent-success)'}` }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                    {result.takfirDetection?.detected ? (
                      <AlertTriangle size={28} style={{ color: "var(--accent-danger)" }} />
                    ) : (
                      <ShieldCheck size={28} style={{ color: "var(--accent-success)" }} />
                    )}
                    <h3 style={{ margin: 0, color: result.takfirDetection?.detected ? "var(--accent-danger)" : "var(--accent-success)" }}>
                      {t({ en: "Takfir Detection", ar: "اكتشاف التكفير" })}
                    </h3>
                  </div>
                  <p style={{ fontSize: "1.1rem", lineHeight: 1.6, margin: 0, color: "var(--text-base)" }}>
                    {result.takfirDetection?.explanation}
                  </p>
                </div>

                {/* Amman Message Compliance */}
                <div style={{ padding: 24, backgroundColor: "var(--bg-card)", borderRadius: "var(--radius-md)", border: "1px solid var(--border)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                    <BookOpen size={28} style={{ color: "var(--accent-primary)" }} />
                    <h3 style={{ margin: 0 }}>{t({ en: "Amman Message Compliance", ar: "التوافق مع رسالة عمان" })}</h3>
                    <span style={{ marginLeft: "auto", padding: "4px 12px", borderRadius: 20, fontSize: "0.85rem", fontWeight: 700, backgroundColor: result.ammanMessageCompliance?.compliant ? "rgba(100,200,100,0.1)" : "rgba(255,50,50,0.1)", color: result.ammanMessageCompliance?.compliant ? "var(--accent-success)" : "var(--accent-danger)" }}>
                      {result.ammanMessageCompliance?.compliant ? t({ en: "COMPLIANT", ar: "متوافق" }) : t({ en: "VIOLATION", ar: "مخالفة" })}
                    </span>
                  </div>
                  {!result.ammanMessageCompliance?.compliant && result.ammanMessageCompliance?.violations?.length > 0 ? (
                    <ul style={{ margin: 0, padding: "0 24px", lineHeight: 1.6, color: "var(--text-base)" }}>
                      {result.ammanMessageCompliance.violations.map((v: string, i: number) => <li key={i}>{v}</li>)}
                    </ul>
                  ) : (
                    <p style={{ margin: 0, color: "var(--text-muted)" }}>{t({ en: "No violations of the Amman Message consensus detected.", ar: "لم يتم اكتشاف أي انتهاكات لإجماع رسالة عمان." })}</p>
                  )}
                </div>
              </div>

              {/* Extremism Indicators */}
              <div style={{ padding: 24, backgroundColor: "var(--bg-card)", borderRadius: "var(--radius-md)", border: "1px solid var(--border)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16, borderBottom: "1px solid var(--border)", paddingBottom: 16 }}>
                  <AlertCircle size={24} style={{ color: getLevelColor(result.extremismIndicators?.level) }} />
                  <h3 style={{ margin: 0 }}>{t({ en: "Extremism Indicators", ar: "مؤشرات التطرف" })}</h3>
                  <span style={{ marginLeft: "auto", padding: "6px 16px", borderRadius: 20, fontSize: "0.9rem", fontWeight: 700, backgroundColor: `rgba(${result.extremismIndicators?.level === 'Low' ? '100,200,100' : '255,100,100'}, 0.1)`, color: getLevelColor(result.extremismIndicators?.level) }}>
                    {result.extremismIndicators?.level?.toUpperCase()} RISK
                  </span>
                </div>
                
                {result.extremismIndicators?.indicators?.length > 0 ? (
                  <ul style={{ margin: 0, padding: "0 24px", lineHeight: 1.8, color: "var(--text-base)" }}>
                    {result.extremismIndicators.indicators.map((ind: string, i: number) => (
                      <li key={i}>{ind}</li>
                    ))}
                  </ul>
                ) : (
                  <p style={{ margin: 0, color: "var(--text-muted)" }}>{t({ en: "No specific indicators of psychological or linguistic extremism found.", ar: "لم يتم العثور على مؤشرات محددة للتطرف النفسي أو اللغوي." })}</p>
                )}
              </div>

              {/* Deradicalization Resources */}
              <div style={{ padding: 24, backgroundColor: "rgba(100,200,255,0.05)", borderRadius: "var(--radius-md)", border: "1px solid var(--accent-cta)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                  <HeartHandshake size={24} style={{ color: "var(--accent-cta)" }} />
                  <h3 style={{ margin: 0, color: "var(--accent-cta)" }}>{t({ en: "Grounding & Orthodoxy", ar: "الترسيخ والأرثوذكسية" })}</h3>
                </div>
                <ul style={{ margin: 0, padding: "0 24px", lineHeight: 1.8, color: "var(--text-base)" }}>
                  {result.deradicalizationResources?.map((res: string, i: number) => (
                    <li key={i}>{res}</li>
                  ))}
                </ul>
              </div>

            </div>
          )}
        </div>
        
        <div style={{ marginTop: 64, padding: 24, textAlign: "center", borderTop: "1px solid var(--border)", color: "var(--text-muted)", fontSize: "0.9rem", backgroundColor: "var(--bg-card)", borderRadius: "var(--radius-lg)" }}>
          <p style={{ maxWidth: 800, margin: "0 auto", lineHeight: 1.6 }}>
            <strong>{t({ en: "Disclaimer", ar: "إخلاء مسؤولية" })}:</strong> {t({ 
              en: "This tool uses AI to detect linguistic markers of sectarianism and Takfir based on the 2005 Amman Message consensus. It is for educational awareness. If you suspect imminent danger or terrorism, please contact local authorities immediately.", 
              ar: "تستخدم هذه الأداة الذكاء الاصطناعي لاكتشاف العلامات اللغوية للطائفية والتكفير بناءً على إجماع رسالة عمان لعام 2005. إنها للتوعية التعليمية. إذا كنت تشتبه في وجود خطر وشيك أو إرهاب، يرجى الاتصال بالسلطات المحلية على الفور." 
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
      <PageNavigation currentPath="/religion-hub/tools/sectarian-detector" />
    </div>
  );
}

function BookOpen(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  );
}
