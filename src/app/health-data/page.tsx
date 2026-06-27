"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, AlertCircle, RefreshCw, Activity, ArrowRight, HeartPulse, ShieldAlert, BarChart } from "lucide-react";
import { useRTL } from "@/components/shared/rtl-provider";
import { PageNavigation } from '@/components/shared/page-navigation';

export default function HealthDataPage() {
  const { isRTL, t } = useRTL();
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [indicators, setIndicators] = useState<any[]>([]);
  const [selectedIndicator, setSelectedIndicator] = useState<any>(null);
  const [indicatorData, setIndicatorData] = useState<any[]>([]);
  const [loadingData, setLoadingData] = useState(false);

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    setLoading(true);
    setError(null);
    setIndicators([]);
    setSelectedIndicator(null);
    setIndicatorData([]);

    try {
      const q = encodeURIComponent(query);
      const res = await fetch(`/api/medical/who?type=indicators&q=${q}`);

      if (!res.ok) throw new Error("Failed to fetch WHO indicators");
      const data = await res.json();
      
      setIndicators(data.results || []);

      if (!data.results?.length) {
        setError(t({ 
          en: "No indicators found. Try broad terms like 'mortality', 'life expectancy', or leave blank for top indicators.", 
          ar: "لم يتم العثور على مؤشرات. جرب مصطلحات عامة مثل 'وفيات'، 'العمر المتوقع'، أو اتركها فارغة لأهم المؤشرات." 
        }));
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || t({ en: "Failed to search WHO database.", ar: "فشل البحث في قاعدة بيانات منظمة الصحة العالمية." }));
    } finally {
      setLoading(false);
    }
  };

  const fetchIndicatorData = async (indicatorCode: string, indicatorName: string) => {
    setLoadingData(true);
    setError(null);
    setSelectedIndicator({ code: indicatorCode, name: indicatorName });
    
    try {
      const res = await fetch(`/api/medical/who?type=data&q=${encodeURIComponent(indicatorCode)}`);
      if (!res.ok) throw new Error("Failed to fetch indicator data");
      const data = await res.json();
      
      setIndicatorData(data.results || []);
    } catch (err: any) {
      console.error(err);
      setError(err.message || t({ en: "Failed to fetch data for this indicator.", ar: "فشل في جلب البيانات لهذا المؤشر." }));
    } finally {
      setLoadingData(false);
    }
  };

  return (
    <div style={{ paddingTop: "var(--navbar-height)", minHeight: "100vh", backgroundColor: "var(--bg-base)", direction: isRTL ? "rtl" : "ltr" }}>
      
      <div className="container" style={{ padding: "var(--space-xl) var(--space-lg)", paddingBottom: "var(--space-md)" }}>
        <nav style={{ marginBottom: 24 }}>
          <Link href="/science" style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "var(--text-muted)", textDecoration: "none", fontSize: "0.9rem" }}>
            {isRTL ? "→" : "←"} {t({ en: "Back to Science", ar: "العودة إلى العلوم" })}
          </Link>
        </nav>
        
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <Activity size={32} style={{ color: "var(--accent-primary)" }} />
            <div>
              <h1 style={{ fontSize: "var(--font-h2)", margin: 0 }}>
                <span className="text-gradient">WHO Global Health Observatory</span>
              </h1>
              <p style={{ color: "var(--text-muted)", margin: "4px 0 0 0", fontSize: "1.05rem" }}>
                {t({ 
                  en: "Access verified macroeconomic and public health indicators directly from the World Health Organization.", 
                  ar: "الوصول إلى مؤشرات الاقتصاد الكلي والصحة العامة المعتمدة مباشرة من منظمة الصحة العالمية." 
                })}
              </p>
            </div>
          </div>
          
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 8 }}>
            <Link href="/drug-checker" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 16px", backgroundColor: "rgba(100,200,255,0.1)", color: "var(--accent-primary)", borderRadius: "var(--radius-md)", textDecoration: "none", fontWeight: 500, border: "1px solid rgba(100,200,255,0.2)" }}>
              <HeartPulse size={16} /> {t({ en: "Drug Safety Checker", ar: "فحص سلامة الأدوية" })}
            </Link>
            <Link href="/angry-debunkers" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 16px", backgroundColor: "rgba(255,100,100,0.1)", color: "var(--accent-danger)", borderRadius: "var(--radius-md)", textDecoration: "none", fontWeight: 500, border: "1px solid rgba(255,100,100,0.2)" }}>
              <ShieldAlert size={16} /> {t({ en: "Verify a claim", ar: "التحقق من ادعاء" })}
            </Link>
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: "0 var(--space-lg) var(--space-2xl) var(--space-lg)", display: "flex", gap: 32, flexDirection: "column" }}>
        
        {/* Search Bar */}
        <div style={{ backgroundColor: "var(--bg-card)", padding: 24, borderRadius: "var(--radius-lg)", border: "1px solid var(--border)", boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
          <form onSubmit={handleSearch} style={{ display: "flex", gap: 12 }}>
            <div style={{ position: "relative", flex: 1 }}>
              <Search size={22} style={{ position: "absolute", [isRTL ? 'right' : 'left']: 16, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
              <input 
                type="text" 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t({ en: "Search indicators (e.g., mortality, birth rate, HIV)...", ar: "ابحث عن المؤشرات (مثل الوفيات، معدل المواليد، فيروس نقص المناعة البشرية)..." })}
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
              disabled={loading}
              style={{
                padding: "0 32px",
                backgroundColor: "var(--accent-primary)",
                color: "#fff",
                border: "none",
                borderRadius: "var(--radius-md)",
                fontWeight: 600,
                fontSize: "1.05rem",
                cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.7 : 1,
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              {loading ? <RefreshCw className="spin" size={20} /> : <Search size={20} />}
              {t({ en: "Search Indicators", ar: "البحث في المؤشرات" })}
            </button>
          </form>
        </div>

        <div style={{ minHeight: 400 }}>
          {error && (
            <div style={{ padding: "24px", marginBottom: 24, textAlign: "center", backgroundColor: "rgba(255,50,50,0.05)", border: "1px solid var(--accent-danger)", borderRadius: "var(--radius-md)", color: "var(--accent-danger)" }}>
              <p style={{ margin: 0, fontSize: "1.1rem" }}>{error}</p>
            </div>
          )}

          <div style={{ display: "grid", gridTemplateColumns: selectedIndicator ? "1fr 2fr" : "1fr", gap: 32, alignItems: "start" }}>
            
            {/* Indicators List */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {indicators.length > 0 && (
                <h3 style={{ margin: "0 0 8px 0", color: "var(--text-muted)", fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: 1 }}>
                  {t({ en: "Indicators Found", ar: "المؤشرات الموجودة" })} ({indicators.length})
                </h3>
              )}
              
              {loading && !selectedIndicator && (
                [1, 2, 3, 4, 5].map(i => (
                  <div key={i} style={{ height: 64, backgroundColor: "var(--bg-card)", borderRadius: "var(--radius-md)", border: "1px solid var(--border)", animation: "pulse 1.5s infinite ease-in-out" }} />
                ))
              )}

              {!loading && indicators.length === 0 && !error && (
                <div style={{ padding: "48px 24px", textAlign: "center", backgroundColor: "var(--bg-card)", borderRadius: "var(--radius-lg)", border: "2px dashed var(--border)" }}>
                  <Activity size={48} style={{ margin: "0 auto 16px", color: "var(--text-muted)", opacity: 0.5 }} />
                  <p style={{ color: "var(--text-muted)", fontSize: "1.05rem", margin: 0 }}>
                    {t({ en: "Search for a health indicator to view global data.", ar: "ابحث عن مؤشر صحي لعرض البيانات العالمية." })}
                  </p>
                </div>
              )}

              {indicators.map((ind: any, idx: number) => (
                <button
                  key={idx}
                  onClick={() => fetchIndicatorData(ind.IndicatorCode, ind.IndicatorName)}
                  style={{
                    textAlign: isRTL ? "right" : "left",
                    padding: "16px",
                    backgroundColor: selectedIndicator?.code === ind.IndicatorCode ? "var(--accent-primary)" : "var(--bg-card)",
                    color: selectedIndicator?.code === ind.IndicatorCode ? "#fff" : "var(--text-base)",
                    border: "1px solid",
                    borderColor: selectedIndicator?.code === ind.IndicatorCode ? "var(--accent-primary)" : "var(--border)",
                    borderRadius: "var(--radius-md)",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 16
                  }}
                >
                  <span style={{ fontWeight: selectedIndicator?.code === ind.IndicatorCode ? 700 : 500, lineHeight: 1.4 }}>
                    {ind.IndicatorName}
                  </span>
                  <ArrowRight size={18} style={{ opacity: selectedIndicator?.code === ind.IndicatorCode ? 1 : 0.4 }} />
                </button>
              ))}
            </div>

            {/* Indicator Data Display */}
            {selectedIndicator && (
              <div style={{ backgroundColor: "var(--bg-card)", borderRadius: "var(--radius-lg)", border: "1px solid var(--border)", overflow: "hidden" }}>
                <div style={{ padding: 24, borderBottom: "1px solid var(--border)", backgroundColor: "rgba(0,0,0,0.2)" }}>
                  <h2 style={{ margin: "0 0 8px 0", fontSize: "1.5rem" }}>{selectedIndicator.name}</h2>
                  <span style={{ padding: "4px 10px", backgroundColor: "rgba(100,200,255,0.1)", color: "var(--accent-primary)", borderRadius: 20, fontSize: "0.85rem", fontWeight: 600 }}>
                    Code: {selectedIndicator.code}
                  </span>
                </div>

                <div style={{ padding: 24 }}>
                  {loadingData ? (
                    <div style={{ textAlign: "center", padding: "64px 0" }}>
                      <RefreshCw size={32} className="spin" style={{ color: "var(--accent-primary)", margin: "0 auto 16px" }} />
                      <p style={{ color: "var(--text-muted)" }}>{t({ en: "Loading WHO dataset...", ar: "جاري تحميل مجموعة بيانات WHO..." })}</p>
                    </div>
                  ) : indicatorData.length > 0 ? (
                    <div style={{ overflowX: "auto" }}>
                      <table style={{ width: "100%", borderCollapse: "collapse", textAlign: isRTL ? "right" : "left" }}>
                        <thead>
                          <tr style={{ borderBottom: "2px solid var(--border)" }}>
                            <th style={{ padding: "12px 16px", color: "var(--text-muted)", fontWeight: 600 }}>{t({ en: "Year", ar: "السنة" })}</th>
                            <th style={{ padding: "12px 16px", color: "var(--text-muted)", fontWeight: 600 }}>{t({ en: "Region/Country", ar: "المنطقة/البلد" })}</th>
                            <th style={{ padding: "12px 16px", color: "var(--text-muted)", fontWeight: 600 }}>{t({ en: "Sex", ar: "الجنس" })}</th>
                            <th style={{ padding: "12px 16px", color: "var(--text-muted)", fontWeight: 600 }}>{t({ en: "Value", ar: "القيمة" })}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {indicatorData.map((row: any, i: number) => (
                            <tr key={i} style={{ borderBottom: "1px solid var(--border)" }}>
                              <td style={{ padding: "12px 16px" }}>{row.TimeDim}</td>
                              <td style={{ padding: "12px 16px" }}>{row.SpatialDim || "Global"}</td>
                              <td style={{ padding: "12px 16px" }}>{row.Dim1 || "Both sexes"}</td>
                              <td style={{ padding: "12px 16px", fontWeight: 600, color: "var(--accent-primary)" }}>{row.NumericValue || row.Value}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div style={{ textAlign: "center", padding: "48px 0", color: "var(--text-muted)" }}>
                      <BarChart size={48} style={{ margin: "0 auto 16px", opacity: 0.5 }} />
                      <p>{t({ en: "No dataset available for this indicator.", ar: "لا توجد مجموعة بيانات متاحة لهذا المؤشر." })}</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* DISCLAIMER */}
        <div style={{ marginTop: 64, padding: 24, textAlign: "center", borderTop: "1px solid var(--border)", color: "var(--text-muted)", fontSize: "0.9rem", backgroundColor: "var(--bg-card)", borderRadius: "var(--radius-lg)" }}>
          <p style={{ maxWidth: 800, margin: "0 auto", lineHeight: 1.6 }}>
            <strong>{t({ en: "Data Disclaimer", ar: "إخلاء مسؤولية البيانات" })}:</strong> {t({ 
              en: "This data is fetched directly from the World Health Organization (WHO) Global Health Observatory API. It is provided for demographic, macroeconomic, and epidemiological awareness. It is not intended for diagnosing individual health conditions.", 
              ar: "يتم جلب هذه البيانات مباشرة من واجهة برمجة تطبيقات المرصد الصحي العالمي التابع لمنظمة الصحة العالمية (WHO). يتم توفيرها للوعي الديموغرافي والاقتصاد الكلي والوبائي. ليس المقصود منها تشخيص الحالات الصحية الفردية." 
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
      <PageNavigation currentPath="/health-data" />
    </div>
  );
}
