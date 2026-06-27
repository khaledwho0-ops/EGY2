"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, AlertCircle, RefreshCw, Activity, AlertTriangle, FileText, Pill, ArrowRight, Info } from "lucide-react";
import { useRTL } from "@/components/shared/rtl-provider";
import { PageNavigation } from '@/components/shared/page-navigation';
import { PageAIChatbot } from '@/components/shared/page-ai-chatbot';

export default function DrugCheckerPage() {
  const { isRTL, t } = useRTL();
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [openFdaData, setOpenFdaData] = useState<any[]>([]);
  const [dailyMedData, setDailyMedData] = useState<any[]>([]);
  const [rxNormData, setRxNormData] = useState<any[]>([]);

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    setOpenFdaData([]);
    setDailyMedData([]);
    setRxNormData([]);

    try {
      const q = encodeURIComponent(query);
      // Fetch all three sources in parallel
      const [fdaRes, dailyRes, rxRes] = await Promise.all([
        fetch(`/api/medical/openfda?q=${q}`),
        fetch(`/api/medical/dailymed?q=${q}`),
        fetch(`/api/medical/rxnorm?q=${q}`)
      ]);

      const [fdaJson, dailyJson, rxJson] = await Promise.all([
        fdaRes.json(),
        dailyRes.json(),
        rxRes.json()
      ]);

      // openFDA could be empty array if 404 (handled in API)
      setOpenFdaData(fdaJson.results || []);
      setDailyMedData(dailyJson.results || []);
      setRxNormData(rxJson.results || []);

      if (!fdaJson.results?.length && !dailyJson.results?.length && !rxJson.results?.length) {
        setError(t({ 
          en: "No data found for this medication across FDA, DailyMed, and RxNorm. Check spelling.", 
          ar: "لم يتم العثور على بيانات لهذا الدواء في FDA و DailyMed و RxNorm. تحقق من الإملاء." 
        }));
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || t({ en: "Failed to search medical databases.", ar: "فشل البحث في قواعد البيانات الطبية." }));
    } finally {
      setLoading(false);
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
            <Pill size={32} style={{ color: "var(--accent-primary)" }} />
            <div>
              <h1 style={{ fontSize: "var(--font-h2)", margin: 0 }}>
                <span className="text-gradient">Medical Drug Checker</span>
              </h1>
              <p style={{ color: "var(--text-muted)", margin: "4px 0 0 0", fontSize: "1.05rem" }}>
                {t({ 
                  en: "Cross-reference medications across official FDA adverse events, DailyMed labels, and RxNorm clinical data.", 
                  ar: "تحقق من الأدوية عبر الأحداث السلبية الرسمية لـ FDA وملصقات DailyMed والبيانات السريرية لـ RxNorm." 
                })}
              </p>
            </div>
          </div>
          
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 8 }}>
            <Link href="/evidence" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 16px", backgroundColor: "rgba(100,200,255,0.1)", color: "var(--accent-primary)", borderRadius: "var(--radius-md)", textDecoration: "none", fontWeight: 500, border: "1px solid rgba(100,200,255,0.2)" }}>
              <FileText size={16} /> {t({ en: "Search Clinical Studies", ar: "البحث في الدراسات السريرية" })}
            </Link>
            <Link href="/health-data" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 16px", backgroundColor: "rgba(212,168,67,0.1)", color: "#d4a843", borderRadius: "var(--radius-md)", textDecoration: "none", fontWeight: 500, border: "1px solid rgba(212,168,67,0.2)" }}>
              <Activity size={16} /> {t({ en: "WHO Health Data", ar: "بيانات الصحة العالمية (WHO)" })}
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
                placeholder={t({ en: "Enter drug name (e.g. Aspirin, Ibuprofen)...", ar: "أدخل اسم الدواء (مثل الأسبرين، الإيبوبروفين)..." })}
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
              {loading ? <RefreshCw className="spin" size={20} /> : <Search size={20} />}
              {t({ en: "Check Drug", ar: "فحص الدواء" })}
            </button>
          </form>
        </div>

        {/* Results Area */}
        <div style={{ minHeight: 400 }}>
          {loading && (
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              {[1, 2, 3].map(i => (
                <div key={i} style={{ height: 180, backgroundColor: "var(--bg-card)", borderRadius: "var(--radius-md)", border: "1px solid var(--border)", animation: "pulse 1.5s infinite ease-in-out" }} />
              ))}
            </div>
          )}

          {!loading && error && (
            <div style={{ padding: "48px 32px", textAlign: "center", backgroundColor: "rgba(255,50,50,0.05)", border: "1px solid var(--accent-danger)", borderRadius: "var(--radius-md)", color: "var(--accent-danger)" }}>
              <AlertCircle size={64} style={{ margin: "0 auto 24px" }} />
              <h3 style={{ fontSize: "1.5rem", marginBottom: 12 }}>{t({ en: "Data Not Found", ar: "لم يتم العثور على بيانات" })}</h3>
              <p style={{ fontSize: "1.1rem", maxWidth: 500, margin: "0 auto" }}>{error}</p>
            </div>
          )}

          {!loading && !error && !openFdaData.length && !dailyMedData.length && !rxNormData.length && (
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              <div style={{ padding: "32px 24px", textAlign: "center", backgroundColor: "var(--bg-card)", borderRadius: "var(--radius-lg)", border: "2px dashed var(--border)" }}>
                <Pill size={48} style={{ margin: "0 auto 16px", color: "var(--text-muted)", opacity: 0.5 }} />
                <h3 style={{ fontSize: "1.3rem", marginBottom: 8, color: "var(--text-base)" }}>
                  {t({ en: "Search Any Medication", ar: "ابحث عن أي دواء" })}
                </h3>
                <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", maxWidth: 500, margin: "0 auto 16px" }}>
                  {t({ en: "Cross-references 3 official databases: FDA adverse events, DailyMed labels, and RxNorm clinical nomenclature.", ar: "مرجعية مع 3 قواعد بيانات رسمية: أحداث FDA السلبية وملصقات DailyMed والتسمية السريرية RxNorm." })}
                </p>
                {/* Quick Search Buttons — Common Egyptian drugs */}
                <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: 12, fontWeight: 600 }}>
                  {t({ en: "🇪🇬 Common Egyptian medications — try one:", ar: "🇪🇬 أدوية مصرية شائعة — جرب واحد:" })}
                </p>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center" }}>
                  {[
                    { en: "Paracetamol", ar: "باراسيتامول", note: "Adol / Panadol" },
                    { en: "Ibuprofen", ar: "إيبوبروفين", note: "Brufen" },
                    { en: "Amoxicillin", ar: "أموكسيسيلين", note: "Amoxil" },
                    { en: "Metformin", ar: "ميتفورمين", note: "Glucophage" },
                    { en: "Omeprazole", ar: "أوميبرازول", note: "Losec / Omez" },
                    { en: "Fluoxetine", ar: "فلوكسيتين", note: "Prozac" },
                    { en: "Sertraline", ar: "سيرترالين", note: "Zoloft / Lustral" },
                    { en: "Tramadol", ar: "ترامادول", note: "⚠️ Controlled" },
                  ].map(drug => (
                    <button
                      key={drug.en}
                      onClick={() => { setQuery(drug.en); setTimeout(() => handleSearch(), 100); }}
                      style={{
                        padding: "8px 14px", borderRadius: 8,
                        border: "1px solid var(--border)", background: "var(--bg-base)",
                        color: "var(--text-base)", fontSize: "0.85rem", cursor: "pointer",
                        transition: "all 0.2s", display: "flex", flexDirection: "column", alignItems: "center",
                      }}
                    >
                      <span style={{ fontWeight: 600 }}>{isRTL ? drug.ar : drug.en}</span>
                      <span style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>{drug.note}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Egyptian Pharmaceutical Context */}
              <div style={{ padding: 20, backgroundColor: "var(--bg-card)", borderRadius: "var(--radius-lg)", border: "1px solid var(--border)", borderLeft: "4px solid #F59E0B" }}>
                <h4 style={{ margin: "0 0 8px", fontSize: "0.95rem", color: "#F59E0B" }}>
                  ⚠️ {t({ en: "Why This Matters in Egypt", ar: "ليه ده مهم في مصر" })}
                </h4>
                <ul style={{ margin: 0, paddingInlineStart: 20, fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: 1.9 }}>
                  <li>{t({ en: "Egypt has 120,000+ pharmacies — many sell prescription drugs without prescription (WHO Egypt 2022)", ar: "مصر فيها 120,000+ صيدلية — كتير بيبيعوا أدوية بدون وصفة (منظمة الصحة العالمية 2022)" })}</li>
                  <li>{t({ en: "Tramadol misuse is a national crisis — CAPA classified it as Schedule II controlled substance", ar: "سوء استخدام الترامادول أزمة وطنية — الهيئة صنفته كمادة مضبوطة الجدول الثاني" })}</li>
                  <li>{t({ en: "WhatsApp 'pharmacy groups' spread unverified drug interactions — always verify here first", ar: "مجموعات واتساب بتنشر تفاعلات أدوية غير موثقة — اتحقق هنا الأول دايماً" })}</li>
                  <li>{t({ en: "Self-medication with antibiotics drives antibiotic resistance — Egypt ranks 3rd in MENA region (WHO 2023)", ar: "التداوي الذاتي بالمضادات الحيوية بيزود مقاومة المضادات — مصر الثالثة في الشرق الأوسط (WHO 2023)" })}</li>
                </ul>
              </div>
            </div>
          )}

          {!loading && !error && (openFdaData.length > 0 || dailyMedData.length > 0 || rxNormData.length > 0) && (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 24 }}>
              
              {/* DailyMed Labels */}
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 16px", backgroundColor: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)" }}>
                  <FileText size={20} style={{ color: "var(--accent-primary)" }} />
                  <h3 style={{ margin: 0, fontSize: "1.1rem" }}>{t({ en: "DailyMed Official Labels", ar: "ملصقات DailyMed الرسمية" })}</h3>
                  <span style={{ marginLeft: "auto", fontSize: "0.85rem", color: "var(--text-muted)" }}>{dailyMedData.length} {t({ en: "results", ar: "نتائج" })}</span>
                </div>
                
                {dailyMedData.length > 0 ? dailyMedData.map((label, idx) => (
                  <div key={idx} style={{ padding: 16, backgroundColor: "var(--bg-card)", borderRadius: "var(--radius-md)", border: "1px solid var(--border)", display: "flex", flexDirection: "column", gap: 8 }}>
                    <h4 style={{ margin: 0, color: "var(--text-base)", fontSize: "1.05rem", lineHeight: 1.4 }}>{label.title}</h4>
                    <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>{label.publishedDate}</span>
                    <a href={label.link} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 4, marginTop: 8, color: "var(--accent-primary)", textDecoration: "none", fontSize: "0.9rem", fontWeight: 600 }}>
                      {t({ en: "View full label", ar: "عرض الملصق الكامل" })} <ArrowRight size={14} />
                    </a>
                  </div>
                )) : (
                  <div style={{ padding: 24, textAlign: "center", backgroundColor: "var(--bg-card)", borderRadius: "var(--radius-md)", border: "1px solid var(--border)", color: "var(--text-muted)" }}>
                    {t({ en: "No label data found.", ar: "لم يتم العثور على بيانات الملصق." })}
                  </div>
                )}
              </div>

              {/* openFDA Adverse Events */}
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 16px", backgroundColor: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)" }}>
                  <AlertTriangle size={20} style={{ color: "var(--accent-danger)" }} />
                  <h3 style={{ margin: 0, fontSize: "1.1rem" }}>{t({ en: "FDA Adverse Events", ar: "أحداث FDA السلبية" })}</h3>
                  <span style={{ marginLeft: "auto", fontSize: "0.85rem", color: "var(--text-muted)" }}>{openFdaData.length} {t({ en: "results", ar: "نتائج" })}</span>
                </div>
                
                {openFdaData.length > 0 ? openFdaData.map((event, idx) => (
                  <div key={idx} style={{ padding: 16, backgroundColor: "var(--bg-card)", borderRadius: "var(--radius-md)", border: "1px solid var(--border)", borderLeft: event.serious === "1" ? "4px solid var(--accent-danger)" : "4px solid var(--accent-warning)", display: "flex", flexDirection: "column", gap: 12 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <span style={{ padding: "4px 8px", borderRadius: 4, fontSize: "0.75rem", fontWeight: 700, backgroundColor: event.serious === "1" ? "rgba(255,50,50,0.1)" : "rgba(212,168,67,0.1)", color: event.serious === "1" ? "var(--accent-danger)" : "var(--accent-warning)" }}>
                        {event.serious === "1" ? t({ en: "SERIOUS", ar: "خطير" }) : t({ en: "NON-SERIOUS", ar: "غير خطير" })}
                      </span>
                      <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
                        {event.patientSex} • {event.patientAge ? `${event.patientAge} yrs` : "Age unknown"}
                      </span>
                    </div>
                    <div>
                      <h4 style={{ margin: "0 0 8px 0", fontSize: "0.9rem", color: "var(--text-muted)", textTransform: "uppercase" }}>{t({ en: "Reported Reactions", ar: "ردود الفعل المبلغ عنها" })}</h4>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                        {event.reactions?.map((r: string, rIdx: number) => (
                          <span key={rIdx} style={{ padding: "2px 8px", backgroundColor: "var(--bg-base)", border: "1px solid var(--border)", borderRadius: 12, fontSize: "0.85rem" }}>
                            {r}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )) : (
                  <div style={{ padding: 24, textAlign: "center", backgroundColor: "var(--bg-card)", borderRadius: "var(--radius-md)", border: "1px solid var(--border)", color: "var(--text-muted)" }}>
                    {t({ en: "No adverse events found.", ar: "لم يتم العثور على أحداث سلبية." })}
                  </div>
                )}
              </div>

              {/* RxNorm Concepts */}
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 16px", backgroundColor: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)" }}>
                  <Info size={20} style={{ color: "var(--accent-success)" }} />
                  <h3 style={{ margin: 0, fontSize: "1.1rem" }}>{t({ en: "RxNorm Clinical Names", ar: "الأسماء السريرية RxNorm" })}</h3>
                  <span style={{ marginLeft: "auto", fontSize: "0.85rem", color: "var(--text-muted)" }}>{rxNormData.length} {t({ en: "results", ar: "نتائج" })}</span>
                </div>
                
                {rxNormData.length > 0 ? (
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {rxNormData.map((drug, idx) => (
                      <div key={idx} style={{ padding: 12, backgroundColor: "var(--bg-card)", borderRadius: "var(--radius-md)", border: "1px solid var(--border)" }}>
                        <p style={{ margin: 0, color: "var(--text-base)", fontWeight: 500 }}>{drug.name}</p>
                        {drug.synonym && <p style={{ margin: "4px 0 0 0", color: "var(--text-muted)", fontSize: "0.85rem" }}>{t({ en: "Synonym:", ar: "مرادف:" })} {drug.synonym}</p>}
                        <div style={{ marginTop: 8, display: "flex", gap: 8 }}>
                          <span style={{ padding: "2px 6px", backgroundColor: "rgba(100,200,100,0.1)", color: "var(--accent-success)", borderRadius: 4, fontSize: "0.75rem", fontWeight: 600 }}>
                            RXCUI: {drug.rxcui}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div style={{ padding: 24, textAlign: "center", backgroundColor: "var(--bg-card)", borderRadius: "var(--radius-md)", border: "1px solid var(--border)", color: "var(--text-muted)" }}>
                    {t({ en: "No RxNorm variants found.", ar: "لم يتم العثور على متغيرات RxNorm." })}
                  </div>
                )}
              </div>

            </div>
          )}
        </div>
        
        {/* DISCLAIMER */}
        <div style={{ marginTop: 64, padding: 24, textAlign: "center", borderTop: "1px solid var(--border)", color: "var(--text-muted)", fontSize: "0.9rem", backgroundColor: "var(--bg-card)", borderRadius: "var(--radius-lg)" }}>
          <p style={{ maxWidth: 800, margin: "0 auto", lineHeight: 1.6 }}>
            <strong>{t({ en: "Medical Disclaimer", ar: "إخلاء المسؤولية الطبية" })}:</strong> {t({ 
              en: "Data is aggregated directly from official U.S. government APIs (FDA, NLM, NIH) for educational and verification purposes. This tool does not provide medical advice, diagnosis, or treatment. Adverse event reports do not prove causality. Always consult a qualified healthcare provider before altering any medication regimen.", 
              ar: "يتم تجميع البيانات مباشرة من واجهات برمجة تطبيقات حكومة الولايات المتحدة الرسمية (FDA، NLM، NIH) للأغراض التعليمية والتحقق. لا توفر هذه الأداة استشارة طبية أو تشخيصاً أو علاجاً. تقارير الأحداث السلبية لا تثبت السببية. استشر دائماً مقدم رعاية صحية مؤهل قبل تغيير أي نظام دوائي." 
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
      <PageNavigation currentPath="/drug-checker" />

      <PageAIChatbot
        pageTitle="Drug Interaction Checker — فاحص تفاعل الأدوية"
        pageContext="Egyptian Awareness Library - Drug Interaction Checker: Verifies drug combinations, identifies dangerous interactions, checks against Egyptian Pharmacopoeia and EDA approvals. Flags common misinformation about herbal remedies vs prescribed medication."
        systemPrompt={`You are the EAL Drug Safety AI. You provide evidence-based drug information and debunk pharmaceutical misinformation.

IMPORTANT DISCLAIMER: Always recommend consulting a licensed pharmacist or doctor. This tool is for education and awareness only.

COMMON EGYPTIAN DRUG MYTHS YOU ADDRESS:
1. "Antibiotics cure viral infections" — antibiotics ONLY work on bacteria. Taking them for flu is harmful and causes resistance.
2. "Herbal supplements are always safe" — many interact with medications (e.g., St John's Wort + SSRIs = serotonin syndrome)
3. "Stopping antibiotics early if feeling better" — creates antibiotic resistance, incomplete treatment
4. "Aspirin is safe for children" — causes Reye's syndrome in children
5. "Cortisone cures everything" — widespread Egyptian misuse, causes serious side effects

EGYPTIAN CONTEXT:
- Egyptian Drug Authority (EDA): eda.mohealth.gov.eg
- Egyptian Pharmacopoeia (registered drugs)
- Common OTC misuse in Egypt: cortisone creams, antibiotics without prescription
- Herbal medicine popular in Egypt: black seed (Nigella sativa), honey — evidence assessment

ISLAMIC MEDICINE CONTEXT:
- Black seed (Nigella sativa): real anti-inflammatory evidence, but NOT a cure-all
- Honey: real wound-healing evidence (Manuka grade), not a cure for all diseases
- "لا تداووا بالحرام" — impermissible ingredients in medications (gelatin, alcohol as carrier)
- Ruqyah vs medical treatment: complementary, not replacement

For every drug query: mechanism of action, evidence quality, Egyptian availability, interaction risks.`}
        suggestedQuestions={[
          'ما أخطار تناول المضادات الحيوية بدون وصفة؟',
          'هل حبة البركة تعالج كل شيء؟',
          'What are dangerous drug combinations to avoid?',
          'How do I check if a drug is approved in Egypt?',
        ]}
        accentColor="#ef4444"
        accentColorRgb="239,68,68"
      />
    </div>
  );
}
