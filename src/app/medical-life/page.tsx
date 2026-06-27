"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRTL } from "@/components/shared/rtl-provider";
import { Stethoscope, Search, ShieldAlert, Activity, AlertTriangle } from "lucide-react";
import { PageNavigation } from '@/components/shared/page-navigation';

export default function MedicalLifePage() {
  const { isRTL, t } = useRTL();
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<any[]>([]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;
    setIsSearching(true);
    setResults([]);
    
    try {
      const q = encodeURIComponent(query);
      const [fdaRes, dailyMedRes, rxnormRes, whoRes] = await Promise.allSettled([
        fetch(`/api/medical/openfda?q=${q}`).then(res => res.json()),
        fetch(`/api/medical/dailymed?q=${q}`).then(res => res.json()),
        fetch(`/api/medical/rxnorm?q=${q}`).then(res => res.json()),
        fetch(`/api/medical/who?q=${q}`).then(res => res.json())
      ]);

      const newResults = [];

      if (fdaRes.status === "fulfilled" && !fdaRes.value.error && fdaRes.value.results) {
        newResults.push({
          id: 1,
          source: "openFDA",
          title: `Adverse Events Found: ${fdaRes.value.results.length}`,
          severity: fdaRes.value.results.length > 5 ? "High" : "Medium",
          matched: true,
          details: `Found ${fdaRes.value.results.length} reported events. Reactions include: ${fdaRes.value.results[0]?.reactions?.slice(0,3).join(", ") || "Unknown"}`,
          sourceUrl: `https://api.fda.gov/drug/event.json?search=${encodeURIComponent(query)}&limit=10`,
        });
      }

      if (dailyMedRes.status === "fulfilled" && !dailyMedRes.value.error && dailyMedRes.value.results) {
        newResults.push({
          id: 2,
          source: "DailyMed",
          title: "Active Labeling Found",
          severity: "Info",
          matched: true,
          details: `Found ${dailyMedRes.value.results.length} active labels. Latest: ${dailyMedRes.value.results[0]?.title || ""}`,
          sourceUrl: `https://dailymed.nlm.nih.gov/dailymed/search.cfm?query=${encodeURIComponent(query)}`,
        });
      }

      if (rxnormRes.status === "fulfilled" && !rxnormRes.value.error && rxnormRes.value.results) {
        newResults.push({
          id: 3,
          source: "RxNorm",
          title: "Standardized Medical Concept",
          severity: "Info",
          matched: true,
          details: `Found ${rxnormRes.value.results.length} related drug concepts.`,
          sourceUrl: `https://rxnav.nlm.nih.gov/REST/drugs.json?name=${encodeURIComponent(query)}`,
        });
      }

      if (whoRes.status === "fulfilled" && !whoRes.value.error && whoRes.value.results) {
        newResults.push({
          id: 4,
          source: "WHO GHO",
          title: "Global Health Indicators",
          severity: "Medium",
          matched: true,
          details: `Matched WHO data with ${whoRes.value.results.length} indicator data points.`,
          sourceUrl: `https://www.who.int/health-topics/`,
        });
      }

      setResults(newResults);
    } catch (e) {
      console.error(e);
    }
    
    setIsSearching(false);
  };

  return (
    <div style={{ paddingTop: "var(--navbar-height)", minHeight: "100vh", backgroundColor: "var(--bg-base)", direction: isRTL ? "rtl" : "ltr" }}>
      
      {/* Header */}
      <div style={{ backgroundColor: "var(--bg-card)", borderBottom: "1px solid var(--border)", padding: "var(--space-2xl) 0" }}>
        <div className="container" style={{ padding: "0 var(--space-lg)" }}>
          <nav style={{ marginBottom: 24 }}>
            <Link href="/dashboard" style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "var(--text-muted)", textDecoration: "none", fontSize: "0.9rem" }}>
              {isRTL ? "→" : "←"} {t({ en: "Back to Dashboard", ar: "العودة إلى لوحة القيادة" })}
            </Link>
          </nav>
          
          <div style={{ display: "flex", alignItems: "center", gap: 24, marginBottom: 32 }}>
            <div style={{ padding: 20, backgroundColor: "rgba(100,200,255,0.1)", borderRadius: "var(--radius-xl)" }}>
              <Stethoscope size={48} style={{ color: "var(--accent-primary)" }} />
            </div>
            <div>
              <h1 style={{ fontSize: "3rem", margin: 0, lineHeight: 1.1 }}>
                <span className="text-gradient">{t({ en: "Medical Life Engine", ar: "محرك الحياة الطبية" })}</span>
              </h1>
              <p style={{ color: "var(--text-muted)", margin: "12px 0 0 0", fontSize: "1.2rem", maxWidth: 700 }}>
                {t({ 
                  en: "Cross-reference claims across openFDA, DailyMed, RxNorm, and WHO Global Health Observatory. Detect medical misinformation in real-time.", 
                  ar: "قم بمطابقة الادعاءات عبر openFDA، DailyMed، RxNorm، ومرصد الصحة العالمي لمنظمة الصحة العالمية. اكتشف المعلومات الطبية المضللة في الوقت الفعلي." 
                })}
              </p>
            </div>
          </div>

          <form onSubmit={handleSearch} style={{ display: "flex", gap: 16, maxWidth: 800 }}>
            <div style={{ position: "relative", flex: 1 }}>
              <Search size={20} style={{ position: "absolute", left: isRTL ? "auto" : 20, right: isRTL ? 20 : "auto", top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
              <input 
                type="text" 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t({ en: "Search for a drug, disease, or medical claim...", ar: "ابحث عن دواء، مرض، أو ادعاء طبي..." })}
                style={{ 
                  width: "100%", padding: isRTL ? "16px 56px 16px 20px" : "16px 20px 16px 56px",
                  backgroundColor: "var(--bg-base)", border: "2px solid var(--border)", 
                  borderRadius: "var(--radius-full)", color: "var(--text-base)", fontSize: "1.1rem"
                }}
              />
            </div>
            <button 
              type="submit" 
              disabled={isSearching || !query}
              style={{ 
                padding: "0 32px", backgroundColor: "var(--accent-primary)", border: "none", 
                borderRadius: "var(--radius-full)", color: "var(--bg-base)", fontWeight: 700,
                fontSize: "1.1rem", cursor: "pointer", opacity: (isSearching || !query) ? 0.7 : 1,
                display: "flex", alignItems: "center", gap: 8
              }}
            >
              {isSearching ? <Activity className="spin" size={20} style={{ animation: "spin 2s linear infinite" }}/> : <ShieldAlert size={20} />}
              {t({ en: "Analyze", ar: "تحليل" })}
            </button>
          </form>
        </div>
      </div>

      <div className="container" style={{ padding: "var(--space-xl) var(--space-lg)" }}>
        
        {results.length === 0 && !isSearching && (
          <div style={{ textAlign: "center", padding: "80px 0", color: "var(--text-muted)" }}>
            <Stethoscope size={64} style={{ opacity: 0.2, margin: "0 auto 24px" }} />
            <h2 style={{ fontSize: "1.5rem", marginBottom: 8 }}>{t({ en: "Medical Forensics Standby", ar: "الطب الشرعي الطبي في وضع الاستعداد" })}</h2>
            <p style={{ maxWidth: 400, margin: "0 auto" }}>
              {t({ en: "Enter a query above to scan the world's most trusted medical databases simultaneously.", ar: "أدخل استعلامًا أعلاه للبحث في أكثر قواعد البيانات الطبية الموثوقة في العالم في وقت واحد." })}
            </p>
          </div>
        )}

        {isSearching && (
          <div style={{ textAlign: "center", padding: "80px 0", color: "var(--text-muted)" }}>
            <Activity size={48} className="spin" style={{ animation: "spin 2s linear infinite", color: "var(--accent-primary)", margin: "0 auto 24px" }} />
            <h2 style={{ fontSize: "1.5rem" }}>{t({ en: "Querying FDA & WHO...", ar: "جاري الاستعلام من إدارة الغذاء والدواء ومنظمة الصحة العالمية..." })}</h2>
          </div>
        )}

        {results.length > 0 && !isSearching && (
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 32 }}>
              <h2 style={{ fontSize: "1.8rem", margin: 0 }}>{t({ en: "Verification Results", ar: "نتائج التحقق" })}</h2>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))", gap: 24 }}>
              {results.map((res) => (
                <div key={res.id} style={{ padding: 24, backgroundColor: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                    <span style={{ padding: "4px 12px", backgroundColor: "rgba(100,200,255,0.1)", color: "var(--accent-primary)", borderRadius: 20, fontSize: "0.8rem", fontWeight: 700 }}>
                      {res.source}
                    </span>
                    {res.severity === "High" && <AlertTriangle size={20} style={{ color: "var(--accent-warning)" }} />}
                  </div>
                  <h3 style={{ fontSize: "1.3rem", margin: "0 0 12px 0" }}>{res.title}</h3>
                  <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", lineHeight: 1.5, margin: 0 }}>
                    {res.details}
                  </p>
                  <div style={{ marginTop: 24, paddingTop: 16, borderTop: "1px solid var(--border)", display: "flex", justifyContent: "flex-end" }}>
                    {res.sourceUrl ? (
                      <a href={res.sourceUrl} target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent-primary)", textDecoration: "none", fontSize: "0.9rem", fontWeight: 600 }}>
                        {t({ en: "View Raw Data →", ar: "عرض البيانات الخام ←" })}
                      </a>
                    ) : (
                      <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>{t({ en: "Source unavailable", ar: "المصدر غير متاح" })}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <PageNavigation currentPath="/medical-life" />
    </div>
  );
}
