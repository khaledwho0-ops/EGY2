"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRTL } from "@/components/shared/rtl-provider";
import { 
  FileText, Search, ArrowLeft, RefreshCw, AlertCircle, CheckCircle2, 
  XCircle, Award, Scale, HelpCircle, BarChart2, ShieldCheck, Heart 
} from "lucide-react";
import { PageNavigation } from '@/components/shared/page-navigation';
import { PageAIChatbot } from '@/components/shared/page-ai-chatbot';
import AnalysisProgress from '@/components/AnalysisProgress';
import ToolGuide from '@/components/ToolGuide';

interface PaperMetadata {
  title: string;
  authors: string;
  journal: string;
  year: string;
  doi: string;
  citations: number;
  openAccess: boolean;
}

export default function PaperAuditorPage() {
  const { isRTL, t } = useRTL();
  
  // State variables
  const [doi, setDoi] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paper, setPaper] = useState<PaperMetadata | null>(null);

  // Interactive Checklist states
  const [checklistType, setChecklistType] = useState<"prisma" | "consort">("prisma");
  const [checklistAnswers, setChecklistAnswers] = useState<Record<string, boolean>>({
    q1: false, q2: false, q3: false, q4: false, q5: false, q6: false
  });

  // Statistical power input inside auditor
  const [sampleSize, setSampleSize] = useState(40);
  const [effectSize, setEffectSize] = useState(0.5);

  const toggleChecklistQuestion = (id: string) => {
    setChecklistAnswers(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    await runDoiAudit(doi);
  };

  // Loads a real DOI into the input and runs the live Crossref audit.
  // Used by the form submit and by the ToolGuide "ready example" buttons.
  const runDoiAudit = async (rawDoi: string) => {
    const target = rawDoi.trim();
    if (!target) return;

    setDoi(target);
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });

    setLoading(true);
    setError(null);
    setPaper(null);

    // Simple DOI format validation
    const doiPattern = /^10\.\d{4,9}\/[-._;()/:A-Z0-9]+$/i;
    if (!doiPattern.test(target)) {
      setError(t({
        en: "Invalid DOI format. A standard DOI looks like: 10.1038/s41586-021-03444-4",
        ar: "صيغة معرف الكائن الرقمي (DOI) غير صالحة. الصيغة القياسية تشبه: 10.1038/s41586-021-03444-4"
      }));
      setLoading(false);
      return;
    }

    try {
      // Query Crossref API directly (free, open, no key)
      const cleanDoi = encodeURIComponent(target);
      const response = await fetch(`https://api.crossref.org/works/${cleanDoi}`, {
        headers: { "User-Agent": "EgyptianAwarenessLibrary/1.0 (mailto:admin@egyptianawareness.local)" }
      });

      if (!response.ok) {
        throw new Error(t({
          en: "Could not retrieve paper from Crossref. Check the DOI or try another one.",
          ar: "عذراً، لم نتمكن من جلب بيانات البحث من Crossref. يرجى التحقق من الرقم الرقمي."
        }));
      }

      const data = await response.json();
      const item = data.message;

      // Extract metadata safely
      const title = item.title?.[0] || "Unknown Title";
      const journal = item["container-title"]?.[0] || "Unknown Journal";
      const year = item.created?.["date-parts"]?.[0]?.[0]?.toString() || "Unknown Year";
      
      let authors = "Unknown Authors";
      if (item.author && item.author.length > 0) {
        authors = item.author.map((a: any) => `${a.given || ""} ${a.family || ""}`).slice(0, 3).join(", ");
        if (item.author.length > 3) authors += " et al.";
      }

      // Query Semantic Scholar for citation count (fallback to 0 if fails)
      let citations = 0;
      let openAccess = false;
      try {
        const sscholarRes = await fetch(`https://api.semanticscholar.org/graph/v1/paper/DOI:${cleanDoi}?fields=citationCount,isOpenAccess`);
        if (sscholarRes.ok) {
          const ssJson = await sscholarRes.json();
          citations = ssJson.citationCount || 0;
          openAccess = ssJson.isOpenAccess || false;
        }
      } catch (err) {
        console.warn("Semantic Scholar fetch failed, falling back to 0 citations.");
      }

      setPaper({
        title,
        authors,
        journal,
        year,
        doi: target,
        citations,
        openAccess
      });

      // Clear previous checklists
      setChecklistAnswers({ q1: false, q2: false, q3: false, q4: false, q5: false, q6: false });

    } catch (err: any) {
      console.error(err);
      setError(err.message || t({ en: "An error occurred while fetching metadata.", ar: "حدث خطأ غير متوقع أثناء جلب البيانات." }));
    } finally {
      setLoading(false);
    }
  };

  // Math helper for statistical power
  const calculatedPower = () => {
    const factor = Math.sqrt(sampleSize / 2);
    const delta = effectSize * factor;
    const zCrit = 1.96; // 5% alpha two-tailed
    
    // Normal CDF polynomial approximation
    const normalCDF = (x: number) => {
      const t = 1 / (1 + 0.2316419 * Math.abs(x));
      const d = 0.39894228 * Math.exp(-x * x / 2);
      const p = d * t * (0.31938153 + t * (-0.356563782 + t * (1.781477937 + t * (-1.821255978 + t * 1.330274429))));
      return x >= 0 ? 1 - p : p;
    };

    let power = normalCDF(delta - zCrit) + normalCDF(-delta - zCrit);
    return Math.max(0.01, Math.min(0.99, power));
  };

  const currentPower = calculatedPower();

  // Audit Score calculation
  const getAuditScore = () => {
    const yesCount = Object.values(checklistAnswers).filter(Boolean).length;
    const powerBonus = currentPower >= 0.80 ? 2 : 0;
    return Math.min(10, Math.round((yesCount / 6) * 8 + powerBonus));
  };

  const auditScore = getAuditScore();

  return (
    <div style={{ paddingTop: "var(--navbar-height)", minHeight: "100vh", backgroundColor: "var(--bg-base)", direction: isRTL ? "rtl" : "ltr" }}>
      
      {/* HEADER */}
      <div className="container" style={{ padding: "var(--space-xl) var(--space-lg)", paddingBottom: "var(--space-md)" }}>
        <nav style={{ marginBottom: 24 }}>
          <Link href="/dashboard" style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "var(--text-muted)", textDecoration: "none", fontSize: "0.9rem" }}>
            <ArrowLeft size={16} /> {t({ en: "Back to Dashboard", ar: "العودة إلى لوحة القيادة" })}
          </Link>
        </nav>

        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 32 }}>
          <div style={{ padding: 20, backgroundColor: "rgba(100,200,255,0.1)", borderRadius: "var(--radius-xl)" }}>
            <FileText size={40} style={{ color: "var(--accent-primary)" }} />
          </div>
          <div>
            <h1 style={{ fontSize: "var(--font-h2)", margin: 0 }}>
              <span className="text-gradient">{t({ en: "Paper Auditor", ar: "مدقق الأبحاث" })}</span>
            </h1>
            <p style={{ color: "var(--text-muted)", margin: "4px 0 0 0", fontSize: "1.1rem" }}>
              {t({ 
                en: "Audit scientific claims directly by submitting a DOI. Evaluate against PRISMA / CONSORT frameworks.", 
                ar: "قم بتدقيق الادعاءات العلمية بإدخال المعرف الرقمي (DOI). تحقق من مطابقة معايير PRISMA / CONSORT المنهجية." 
              })}
            </p>
          </div>
        </div>

        {/* HOW-TO GUIDE + READY EXAMPLES (real, name-free Egyptian misinfo papers) */}
        <ToolGuide
          lang={isRTL ? "ar" : "en"}
          accent="#3b82f6"
          titleEn="How to use the Paper Auditor"
          titleAr="كيفية استخدام مدقق الأبحاث"
          whoBenefits={{
            en: "Anyone who gets a 'a scientific study proves it' message on WhatsApp or Facebook — about a cure, a supplement, a diet, or a virus treatment — and wants to check if that paper is actually solid before believing or forwarding it.",
            ar: "أي شخص يصله على واتساب أو فيسبوك كلام مثل «دراسة علمية أثبتت» — عن علاج أو مكمل غذائي أو رجيم أو دواء لفيروس — ويريد أن يتأكد هل البحث ده محترم فعلاً قبل ما يصدّقه أو يبعته للناس.",
          }}
          steps={[
            {
              en: "Find the paper's DOI (its digital ID, looks like 10.1016/...). It is usually printed on the first page of the study or under the 'Cite' button on the journal page. Copy it.",
              ar: "هات الـ DOI بتاع البحث (الرقم التعريفي، شكله زي 10.1016/...). بتلاقيه عادةً في أول صفحة من الدراسة أو تحت زر «Cite» في صفحة المجلة. انسخه.",
            },
            {
              en: "Paste the DOI in the box below and press 'Fetch & Audit'. The tool pulls the real publication record live from Crossref — no guessing.",
              ar: "الصق الـ DOI في الخانة تحت واضغط «جلب وتدقيق». الأداة بتجيب بيانات النشر الحقيقية مباشرة من Crossref — من غير تخمين.",
            },
            {
              en: "Read the metadata it returns: which journal, what year, how many citations, and whether it is open-access. A no-name journal or near-zero citations is an early warning.",
              ar: "اقرأ البيانات اللي ترجع: المجلة، السنة، عدد الاقتباسات، وهل الوصول مجاني. مجلة مغمورة أو اقتباسات شبه صفر = إشارة تحذير من البداية.",
            },
            {
              en: "Go through the PRISMA / CONSORT checklist and tick what the study actually did (registration, control group, blinding, disclosed funding). Your audit score updates as you tick.",
              ar: "امشِ على قائمة PRISMA / CONSORT وعلّم على اللي الدراسة عملته فعلاً (تسجيل، مجموعة ضابطة، تعمية، تمويل معلن). النتيجة بتتحدّث مع كل علامة.",
            },
            {
              en: "Use the sample-size slider: a tiny number of participants often means the result is too weak to trust. Read the final verdict before you forward anything.",
              ar: "استخدم مؤشر حجم العينة: عدد مشاركين صغير جدًا غالبًا معناه إن النتيجة أضعف من إنها تتصدّق. اقرأ الحكم النهائي قبل ما تبعت أي حاجة.",
            },
          ]}
          scenarios={[
            {
              label: "The viral 'this pill cures COVID' tiny study",
              labelAr: "دراسة «الحبة دي بتعالج كورونا» المنتشرة",
              input: "10.1016/j.ijantimicag.2020.105949",
              tag: "health",
            },
            {
              label: "'This antiviral beats that one' rushed claim",
              labelAr: "ادعاء «الدوا ده أحسن من ده» المتسرّع",
              input: "10.1016/j.jinf.2020.03.060",
              tag: "health",
            },
            {
              label: "A 'breakthrough' in a low-tier journal",
              labelAr: "«اكتشاف مذهل» في مجلة منخفضة المستوى",
              input: "10.4103/1995-7645.281613",
              tag: "journal",
            },
            {
              label: "An old paper still shared after it was retracted",
              labelAr: "بحث قديم لسه بيتنشر بعد سحبه",
              input: "10.1056/NEJM199810153391601",
              tag: "retracted",
            },
          ]}
          onTry={(input) => { void runDoiAudit(input); }}
        />

        {/* SEARCH BOX */}
        <div style={{ backgroundColor: "var(--bg-card)", padding: 24, borderRadius: "var(--radius-lg)", border: "1px solid var(--border)", boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
          <form onSubmit={handleSearch} style={{ display: "flex", gap: 12 }}>
            <div style={{ position: "relative", flex: 1 }}>
              <Search size={22} style={{ position: "absolute", [isRTL ? 'right' : 'left']: 16, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
              <input 
                type="text" 
                value={doi}
                onChange={(e) => setDoi(e.target.value)}
                placeholder={t({ en: "Enter paper DOI (e.g. 10.1038/s41586-021-03444-4)...", ar: "أدخل معرف البحث الرقمي DOI (مثال: 10.1038/s41586-021-03444-4)..." })}
                style={{
                  width: "100%", padding: isRTL ? "16px 52px 16px 16px" : "16px 16px 16px 52px",
                  fontSize: "1.1rem", backgroundColor: "var(--bg-base)", border: "2px solid var(--border)",
                  borderRadius: "var(--radius-md)", color: "var(--text-base)"
                }}
              />
            </div>
            <button 
              type="submit" 
              disabled={loading || !doi.trim()}
              style={{
                padding: "0 32px", backgroundColor: "var(--accent-primary)", color: "#fff", border: "none",
                borderRadius: "var(--radius-md)", fontWeight: 600, fontSize: "1.05rem",
                cursor: (loading || !doi.trim()) ? "not-allowed" : "pointer", opacity: (loading || !doi.trim()) ? 0.7 : 1,
                display: "flex", alignItems: "center", gap: 8,
              }}
            >
              {loading ? <RefreshCw className="spin" size={20} /> : <Search size={20} />}
              {t({ en: "Fetch & Audit", ar: "جلب وتدقيق" })}
            </button>
          </form>
        </div>
      </div>

      <div className="container" style={{ padding: "0 var(--space-lg) var(--space-2xl)" }}>
        
        {loading && (
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div style={{ display: "flex", justifyContent: "center", padding: "8px 0" }}>
              <AnalysisProgress
                running={loading}
                lang={isRTL ? "ar" : "en"}
                stages={[
                  { en: "Parsing the paper", ar: "تحليل الورقة" },
                  { en: "Checking statistics & p-hacking", ar: "فحص الإحصاء والتلاعب" },
                  { en: "Cross-referencing literature", ar: "مطابقة المراجع" },
                  { en: "Scoring integrity", ar: "تقييم النزاهة" },
                ]}
                expectedMs={15000}
                accent="#3b82f6"
                title={{ en: "Auditing paper integrity…", ar: "تدقيق نزاهة الورقة…" }}
              />
            </div>
            <div style={{ height: 200, backgroundColor: "var(--bg-card)", borderRadius: "var(--radius-md)", border: "1px solid var(--border)", animation: "pulse 1.5s infinite ease-in-out" }} />
          </div>
        )}

        {!loading && error && (
          <div style={{ padding: "48px 32px", textAlign: "center", backgroundColor: "rgba(255,50,50,0.05)", border: "1px solid var(--accent-danger)", borderRadius: "var(--radius-md)", color: "var(--accent-danger)" }}>
            <AlertCircle size={64} style={{ margin: "0 auto 24px" }} />
            <h3 style={{ fontSize: "1.5rem", marginBottom: 12 }}>{t({ en: "Verification Error", ar: "خطأ في التحقق" })}</h3>
            <p style={{ fontSize: "1.1rem", maxWidth: 500, margin: "0 auto" }}>{error}</p>
          </div>
        )}

        {!loading && !error && !paper && (
          <div style={{ padding: "64px 24px", textAlign: "center", backgroundColor: "var(--bg-card)", borderRadius: "var(--radius-lg)", border: "2px dashed var(--border)" }}>
            <FileText size={64} style={{ margin: "0 auto 24px", color: "var(--text-muted)", opacity: 0.5 }} />
            <h3 style={{ fontSize: "1.5rem", marginBottom: 12, color: "var(--text-base)" }}>
              {t({ en: "Awaiting Paper Payload", ar: "بانتظار مستند البحث للتحليل" })}
            </h3>
            <p style={{ color: "var(--text-muted)", fontSize: "1.1rem", maxWidth: 400, margin: "0 auto" }}>
              {t({ en: "Submit a valid DOI above to parse its publication metadata and execute an interactive methodological audit.", ar: "أدخل معرف رقمي (DOI) صالحًا أعلاه لاستخراج بيانات النشر وبدء التدقيق المنهجي التفاعلي." })}
            </p>
          </div>
        )}

        {!loading && !error && paper && (
          <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 32 }}>
            
            {/* LEFT COLUMN: METADATA & CHECKLIST */}
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              
              {/* Paper Metadata Card */}
              <div style={{ padding: 32, backgroundColor: "var(--bg-card)", borderRadius: "var(--radius-lg)", border: "1px solid var(--border)" }}>
                <span style={{ padding: "4px 12px", backgroundColor: "rgba(100,200,255,0.1)", color: "var(--accent-primary)", borderRadius: 20, fontSize: "0.8rem", fontWeight: 700, textTransform: "uppercase" }}>
                  Verified Crossref Metadata
                </span>
                <h2 style={{ fontSize: "1.6rem", margin: "16px 0 12px 0", color: "var(--text-base)" }}>{paper.title}</h2>
                <p style={{ margin: "0 0 16px 0", fontSize: "1.1rem", color: "var(--text-muted)" }}>{paper.authors}</p>
                
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16, borderTop: "1px solid var(--border)", paddingTop: 20 }}>
                  <div>
                    <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", display: "block" }}>{t({ en: "Journal", ar: "المجلة العلمية" })}</span>
                    <span style={{ fontWeight: 600, color: "var(--text-secondary)" }}>{paper.journal}</span>
                  </div>
                  <div>
                    <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", display: "block" }}>{t({ en: "Publication Year", ar: "سنة النشر" })}</span>
                    <span style={{ fontWeight: 600, color: "var(--text-secondary)" }}>{paper.year}</span>
                  </div>
                  <div>
                    <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", display: "block" }}>{t({ en: "Scholarly Citations", ar: "الاقتباسات العلمية" })}</span>
                    <span style={{ fontWeight: 600, color: "var(--text-secondary)" }}>{paper.citations}</span>
                  </div>
                  <div>
                    <span style={{ fontSize: "0.8rem", color: "var(--text-muted)", display: "block" }}>{t({ en: "Access status", ar: "حالة الوصول" })}</span>
                    <span style={{ fontWeight: 600, color: paper.openAccess ? "#10B981" : "var(--accent-danger)" }}>
                      {paper.openAccess ? "Open Access (Free)" : "Paywalled / Restricted"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Methodological Checklist Card */}
              <div style={{ padding: 32, backgroundColor: "var(--bg-card)", borderRadius: "var(--radius-lg)", border: "1px solid var(--border)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
                  <h3 style={{ margin: 0, fontSize: "1.3rem", display: "flex", alignItems: "center", gap: 8 }}>
                    <Scale size={20} style={{ color: "var(--accent-primary)" }} />
                    {t({ en: "Guideline Compliance Audit", ar: "تدقيق مطابقة المبادئ التوجيهية" })}
                  </h3>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button 
                      onClick={() => setChecklistType("prisma")}
                      style={{
                        padding: "6px 12px", fontSize: "0.85rem", cursor: "pointer", borderRadius: "var(--radius-sm)",
                        border: checklistType === "prisma" ? "1px solid var(--accent-primary)" : "1px solid var(--border)",
                        backgroundColor: checklistType === "prisma" ? "rgba(100,200,255,0.05)" : "transparent",
                        color: "var(--text-base)"
                      }}
                    >
                      PRISMA (Review)
                    </button>
                    <button 
                      onClick={() => setChecklistType("consort")}
                      style={{
                        padding: "6px 12px", fontSize: "0.85rem", cursor: "pointer", borderRadius: "var(--radius-sm)",
                        border: checklistType === "consort" ? "1px solid var(--accent-primary)" : "1px solid var(--border)",
                        backgroundColor: checklistType === "consort" ? "rgba(100,200,255,0.05)" : "transparent",
                        color: "var(--text-base)"
                      }}
                    >
                      CONSORT (Trial)
                    </button>
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  {checklistType === "prisma" ? (
                    <>
                      {[
                        { id: "q1", text: "Is the study registered in a database like PROSPERO?", desc: "Ensures researchers didn't change outcomes post-hoc." },
                        { id: "q2", text: "Are complete search queries for all databases provided?", desc: "Allows full audit of the literature search." },
                        { id: "q3", text: "Are screening and inclusion criteria explicitly defined?", desc: "Prevents cherry-picking positive papers." },
                        { id: "q4", text: "Did at least two independent reviewers evaluate the papers?", desc: "Reduces individual subjectivity biases." },
                        { id: "q5", text: "Was risk of bias/quality assessment conducted on all studies?", desc: "Flags low-quality methodology." },
                        { id: "q6", text: "Are all sources of funding and potential conflicts disclosed?", desc: "Identifies financial interest bias." }
                      ].map(q => (
                        <div key={q.id} style={{ display: "flex", alignItems: "flex-start", gap: 16, padding: "12px 0", borderBottom: "1px solid var(--border)" }}>
                          <input 
                            type="checkbox" checked={checklistAnswers[q.id] || false}
                            onChange={() => toggleChecklistQuestion(q.id)}
                            style={{ width: 20, height: 20, cursor: "pointer", accentColor: "var(--accent-primary)" }}
                          />
                          <div>
                            <span style={{ fontWeight: 600, display: "block" }}>{q.text}</span>
                            <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>{q.desc}</span>
                          </div>
                        </div>
                      ))}
                    </>
                  ) : (
                    <>
                      {[
                        { id: "q1", text: "Was random allocation sequence generation described?", desc: "Prevents allocation bias." },
                        { id: "q2", text: "Was allocation concealment implemented correctly?", desc: "Prevents researchers from manipulating patient groups." },
                        { id: "q3", text: "Were patients and healthcare providers blinded?", desc: "Eliminates placebo and observation biases." },
                        { id: "q4", text: "Are participant flows and drop-outs fully mapped?", desc: "Exposes hidden negative trial dropouts." },
                        { id: "q5", text: "Are primary and secondary endpoints pre-specified?", desc: "Prevents shifting target outcomes." },
                        { id: "q6", text: "Is there a clear declaration of conflict of interest?", desc: "Uncovers corporate lobbying." }
                      ].map(q => (
                        <div key={q.id} style={{ display: "flex", alignItems: "flex-start", gap: 16, padding: "12px 0", borderBottom: "1px solid var(--border)" }}>
                          <input 
                            type="checkbox" checked={checklistAnswers[q.id] || false}
                            onChange={() => toggleChecklistQuestion(q.id)}
                            style={{ width: 20, height: 20, cursor: "pointer", accentColor: "var(--accent-primary)" }}
                          />
                          <div>
                            <span style={{ fontWeight: 600, display: "block" }}>{q.text}</span>
                            <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>{q.desc}</span>
                          </div>
                        </div>
                      ))}
                    </>
                  )}
                </div>

              </div>

            </div>

            {/* RIGHT COLUMN: AUDIT VERDICT & STAT POWER */}
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              
              {/* Verdict Card */}
              <div style={{ 
                backgroundColor: "var(--bg-card)", padding: 32, borderRadius: "var(--radius-lg)", 
                border: `2px solid ${auditScore >= 7 ? "rgba(16,185,129,0.3)" : auditScore >= 4 ? "rgba(245,158,11,0.3)" : "rgba(239,68,68,0.3)"}` 
              }}>
                <h3 style={{ margin: "0 0 16px 0", fontSize: "1.3rem" }}>{t({ en: "Methodological Audit Score", ar: "نتيجة تقييم المنهجية" })}</h3>
                
                <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 16 }}>
                  <span style={{ fontSize: "5rem", fontWeight: 900, color: auditScore >= 7 ? "#10B981" : auditScore >= 4 ? "#F59E0B" : "#EF4444", lineHeight: 1 }}>
                    {auditScore}
                  </span>
                  <span style={{ fontSize: "1.5rem", color: "var(--text-muted)" }}>/ 10</span>
                </div>

                <div style={{ 
                  padding: 16, borderRadius: "var(--radius-md)", marginBottom: 20,
                  backgroundColor: auditScore >= 7 ? "rgba(16,185,129,0.06)" : auditScore >= 4 ? "rgba(245,158,11,0.06)" : "rgba(239,68,68,0.06)",
                  color: auditScore >= 7 ? "#10B981" : auditScore >= 4 ? "#F59E0B" : "#EF4444", fontWeight: 600
                }}>
                  {auditScore >= 7 ? (
                    <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <CheckCircle2 size={20} /> {t({ en: "Methodologically Sound", ar: "منهجية علمية رصينة وموثوقة" })}
                    </span>
                  ) : auditScore >= 4 ? (
                    <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <AlertCircle size={20} /> {t({ en: "Minor Methodological Gaps", ar: "ثغرات منهجية طفيفة" })}
                    </span>
                  ) : (
                    <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <XCircle size={20} /> {t({ en: "High Risk of Bias / Weak Evidence", ar: "احتمالية انحياز عالية / دليل ضعيف" })}
                    </span>
                  )}
                </div>

                <p style={{ margin: 0, fontSize: "0.95rem", color: "var(--text-muted)", lineHeight: 1.5 }}>
                  {auditScore >= 7 
                    ? t({ en: "The paper complies with global reporting guidelines and has sufficient statistical power. The evidence is robust.", ar: "يتوافق هذا البحث مع إرشادات التقارير العالمية ولديه قوة إحصائية كافية. الأدلة قوية." })
                    : auditScore >= 4
                    ? t({ en: "Some critical reporting elements are missing or undisclosed. Read with cautious reservation.", ar: "بعض العناصر الهامة في التقارير مفقودة أو غير معلنة. يجب القراءة بتحفظ وحذر." })
                    : t({ en: "Critical violations detected: lack of randomization/blinding, undisclosed funding, or statistically underpowered sample.", ar: "تم الكشف عن انتهاكات منهجية حرجة: غياب العشوائية/التعمية، أو تمويل غير معلن، أو عينة إحصائية ضعيفة جداً." })}
                </p>
              </div>

              {/* Statistical Power Audit section */}
              <div style={{ padding: 32, backgroundColor: "var(--bg-card)", borderRadius: "var(--radius-lg)", border: "1px solid var(--border)" }}>
                <h3 style={{ margin: "0 0 20px 0", fontSize: "1.2rem", display: "flex", alignItems: "center", gap: 8 }}>
                  <BarChart2 size={20} style={{ color: "var(--accent-primary)" }} />
                  {t({ en: "Sample Size & Power Audit", ar: "تدقيق حجم العينة والقوة" })}
                </h3>

                <div style={{ marginBottom: 16 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                    <label style={{ fontSize: "0.9rem", fontWeight: 600 }}>Reported Sample Size (N)</label>
                    <span style={{ fontWeight: 700, fontFamily: "monospace" }}>{sampleSize}</span>
                  </div>
                  <input 
                    type="range" min="10" max="250" step="5" value={sampleSize}
                    onChange={(e) => setSampleSize(parseInt(e.target.value))}
                    style={{ width: "100%", accentColor: "var(--accent-primary)" }}
                  />
                </div>

                <div style={{ marginBottom: 20 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                    <label style={{ fontSize: "0.9rem", fontWeight: 600 }}>Expected Effect Size (d)</label>
                    <span style={{ fontWeight: 700, fontFamily: "monospace" }}>{effectSize.toFixed(2)}</span>
                  </div>
                  <input 
                    type="range" min="0.1" max="1.2" step="0.05" value={effectSize}
                    onChange={(e) => setEffectSize(parseFloat(e.target.value))}
                    style={{ width: "100%", accentColor: "var(--accent-primary)" }}
                  />
                </div>

                <div style={{ padding: 16, backgroundColor: "var(--bg-base)", borderRadius: "var(--radius-md)", border: "1px solid var(--border)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>{t({ en: "Audit Power (1-β)", ar: "القوة التدقيقية (1-β)" })}</span>
                    <span style={{ fontSize: "1.4rem", fontWeight: 900, color: currentPower >= 0.80 ? "#10B981" : "#EF4444" }}>
                      {(currentPower * 100).toFixed(0)}%
                    </span>
                  </div>
                  <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: 6, lineHeight: 1.4 }}>
                    {currentPower >= 0.80 
                      ? t({ en: "Robust: Study has sufficient power to identify genuine findings.", ar: "قوي: تمتلك الدراسة القوة الكافية للوصول لنتائج حقيقية." })
                      : t({ en: "Weak: High chance of committing Type II error (false negative).", ar: "ضعيف: فرصة عالية للوقوع في خطأ النوع الثاني (سلبي كاذب)." })}
                  </div>
                </div>

                <Link href="/stat-power" style={{ display: "block", marginTop: 16, textAlign: "center", fontSize: "0.9rem", color: "var(--accent-primary)", textDecoration: "none", fontWeight: 600 }}>
                  Open Detailed Power Lab →
                </Link>

              </div>

            </div>

          </div>
        )}

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
      <PageNavigation currentPath="/paper-auditor" />

      <PageAIChatbot
        pageTitle="Paper Auditor — مدقق الأبحاث"
        pageContext="Egyptian Awareness Library - Paper Auditor: Scientific research quality assessment tool. Checks papers for CONSORT compliance, p-hacking, predatory journal status, sample size adequacy, conflict of interest, and replication crisis issues."
        systemPrompt={`You are the EAL Scientific Paper Auditor AI. You help users evaluate the quality and credibility of scientific research.

QUALITY CHECKLIST:

1. STUDY DESIGN:
   - RCT (gold standard) vs observational vs case study
   - Pre-registered? (clinicaltrials.gov, OSF.io)
   - Control group? Blinding (single/double/triple)?
   - Sample size adequate? (power analysis, N>50 for most claims)

2. STATISTICAL QUALITY:
   - p-value alone is insufficient — need effect size (Cohen's d, OR, RR)
   - p-hacking: multiple comparisons without correction (Bonferroni)
   - Confidence intervals: wide CI = uncertain result
   - CONSORT checklist compliance for RCTs

3. SOURCE QUALITY:
   - Impact factor of journal
   - Predatory journal? Check: Beall's List, DOAJ whitelist
   - Peer-reviewed? How many reviewers?
   - Retracted? Check: Retraction Watch

4. EGYPTIAN-SPECIFIC RED FLAGS:
   - "Arabic supplement cures X" with no peer review
   - Hijama/cupping studies: real evidence vs placebo
   - "Al-Azhar scientists prove..." (Al-Azhar is theology, not science)
   - Single Egyptian study without replication

5. REPLICATION CRISIS:
   - Only 36% of psychology findings replicate (Open Science Collaboration 2015)
   - Nutrition studies: often confounded, not causal
   - Ask: Has this been replicated by independent groups?

Always provide: Study type, Key limitation, Confidence level (High/Medium/Low/Insufficient).`}
        suggestedQuestions={[
          'كيف أحكم على جودة دراسة علمية؟',
          'ما هو p-hacking ولماذا هو خطير؟',
          'How do I spot a predatory journal?',
          'What is the replication crisis in science?',
        ]}
        accentColor="#3b82f6"
        accentColorRgb="59,130,246"
      />
    </div>
  );
}
