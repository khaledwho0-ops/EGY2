"use client";

import React, { useState } from "react";
import Link from "next/link";
import { BookOpen, Search, AlertCircle, ArrowLeft, RefreshCw, FileText, CheckCircle, ShieldAlert } from "lucide-react";
import { useRTL } from "@/components/shared/rtl-provider";
import { checkAbrogation } from "@/data/islamic/nasikh-mansukh";
import { PageNavigation } from '@/components/shared/page-navigation';

export default function QuranContextPage() {
  const { isRTL, t } = useRTL();
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<any>(null);

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    setResults(null);

    try {
      // Expecting format like "2:255" or just numbers
      const match = query.match(/(\d+)[\s:]+(\d+)/);
      if (!match) {
        throw new Error(t({ en: "Please enter a valid Surah:Ayah reference (e.g., 2:255).", ar: "يرجى إدخال مرجع سورة:آية صالح (مثل 2:255)." }));
      }
      
      const surah = match[1];
      const ayah = match[2];

      // Fetch from our new Quran API route (Tafsir mode, which also fetches the Ayah text + translation)
      // We added `?type=tafsir&q=surah:ayah` to `api/islamic/quran/route.ts` which fetches Tafsir 16 (Ibn Kathir English) by default.
      // But we can also call our new `api/islamic/tafsir/route.ts` for Arabic Tafsir.
      
      const [ayahRes, tafsirJalalaynRes] = await Promise.all([
        fetch(`/api/islamic/quran?type=ayah&q=${surah}:${ayah}`),
        fetch(`/api/islamic/tafsir?surah=${surah}&ayah=${ayah}&tafsir=2`) // 2 = Al-Jalalayn
      ]);

      if (!ayahRes.ok) throw new Error("Ayah API error");
      const ayahData = await ayahRes.json();
      
      const jalalaynData = tafsirJalalaynRes.ok ? await tafsirJalalaynRes.json() : null;

      // We need to parse the response
      const editions = ayahData.results?.editions || [];
      const arabicAyah = editions.find((e: any) => e.language === "ar")?.text || "Arabic text not found";
      const englishTranslation = editions.find((e: any) => e.language === "en")?.text || "Translation not found";
      const surahInfo = editions[0]?.surah;

      const surahNum = parseInt(surah, 10);
      const ayahNum = parseInt(ayah, 10);
      const abrogationInfo = checkAbrogation(surahNum, ayahNum);

      setResults({
        surah,
        ayah,
        surahName: surahInfo?.englishName || `Surah ${surah}`,
        arabicName: surahInfo?.arabicName || `سورة ${surah}`,
        arabicAyah,
        englishTranslation,
        tafsirJalalayn: jalalaynData?.results?.[0]?.text || "Tafsir not available.",
        abrogationInfo,
      });

    } catch (err: any) {
      console.error(err);
      setError(err.message || t({ en: "Failed to fetch context. Please try again.", ar: "فشل في جلب السياق. يرجى المحاولة مرة أخرى." }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ paddingTop: "var(--navbar-height)", minHeight: "100vh", backgroundColor: "var(--bg-base)", direction: isRTL ? "rtl" : "ltr" }}>
      
      {/* HEADER SECTION */}
      <div className="container" style={{ padding: "var(--space-xl) var(--space-lg)", paddingBottom: "var(--space-md)" }}>
        <nav style={{ marginBottom: 24 }}>
          <Link href="/religion-hub/tools" style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "var(--text-muted)", textDecoration: "none", fontSize: "0.9rem" }}>
            {isRTL ? "→" : "←"} {t({ en: "Back to Tools", ar: "العودة إلى الأدوات" })}
          </Link>
        </nav>
        
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <BookOpen size={32} style={{ color: "var(--accent-primary)" }} />
            <div>
              <h1 style={{ fontSize: "var(--font-h2)", margin: 0 }}>
                <span className="text-gradient">{t({ en: "Quran Context Check", ar: "فحص سياق القرآن" })}</span>
              </h1>
              <p style={{ color: "var(--text-muted)", margin: "4px 0 0 0", fontSize: "1.05rem" }}>
                {t({
                  en: "Asbab al-Nuzul + tafsir",
                  ar: "أسباب النزول والتفسير"
                })}
              </p>
            </div>
          </div>
          
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 8 }}>
            <Link href="/religion-hub/tools/hadith-check" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 16px", backgroundColor: "rgba(212,168,67,0.1)", color: "#d4a843", borderRadius: "var(--radius-md)", textDecoration: "none", fontWeight: 500, border: "1px solid rgba(212,168,67,0.2)" }}>
              <ShieldAlert size={16} /> {t({ en: "Verify a Hadith", ar: "التحقق من حديث" })}
            </Link>
            <Link href="/angry-debunkers" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 16px", backgroundColor: "rgba(255,100,100,0.1)", color: "var(--accent-danger)", borderRadius: "var(--radius-md)", textDecoration: "none", fontWeight: 500, border: "1px solid rgba(255,100,100,0.2)" }}>
              <AlertCircle size={16} /> {t({ en: "Analyze a specific claim", ar: "تحليل ادعاء معين" })}
            </Link>
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: "0 var(--space-lg) var(--space-2xl) var(--space-lg)", display: "flex", gap: 32, flexDirection: "column" }}>
        
        {/* SEARCH SECTION */}
        <div style={{ backgroundColor: "var(--bg-card)", padding: 24, borderRadius: "var(--radius-lg)", border: "1px solid var(--border)", boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
          <form onSubmit={handleSearch} style={{ display: "flex", gap: 12 }}>
            <div style={{ position: "relative", flex: 1 }}>
              <Search size={22} style={{ position: "absolute", [isRTL ? 'right' : 'left']: 16, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
              <input 
                type="text" 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t({ en: "Enter Surah:Ayah (e.g. 2:255 or 109:1)...", ar: "أدخل رقم السورة:الآية (مثل 2:255 أو 109:1)..." })}
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
              {t({ en: "Restore Context", ar: "استعادة السياق" })}
            </button>
          </form>
        </div>

        {/* CONTENT AREA */}
        <div style={{ minHeight: 400 }}>
          {loading && (
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[1, 2].map(i => (
                <div key={i} style={{ height: 180, backgroundColor: "var(--bg-card)", borderRadius: "var(--radius-md)", border: "1px solid var(--border)", animation: "pulse 1.5s infinite ease-in-out" }} />
              ))}
            </div>
          )}

          {!loading && error && (
            <div style={{ padding: "48px 32px", textAlign: "center", backgroundColor: "rgba(255,50,50,0.05)", border: "1px solid var(--accent-danger)", borderRadius: "var(--radius-md)", color: "var(--accent-danger)" }}>
              <AlertCircle size={64} style={{ margin: "0 auto 24px" }} />
              <h3 style={{ fontSize: "1.5rem", marginBottom: 12 }}>{t({ en: "Search Error", ar: "خطأ في البحث" })}</h3>
              <p style={{ fontSize: "1.1rem", maxWidth: 500, margin: "0 auto" }}>{error}</p>
            </div>
          )}

          {!loading && !error && !results && (
            <div style={{ padding: "64px 24px", textAlign: "center", backgroundColor: "var(--bg-card)", borderRadius: "var(--radius-lg)", border: "2px dashed var(--border)" }}>
              <BookOpen size={64} style={{ margin: "0 auto 24px", color: "var(--text-muted)", opacity: 0.5 }} />
              <h3 style={{ fontSize: "1.5rem", marginBottom: 12, color: "var(--text-base)" }}>
                {t({ en: "No context requested", ar: "لم يتم طلب سياق" })}
              </h3>
              <p style={{ color: "var(--text-muted)", fontSize: "1.1rem", maxWidth: 400, margin: "0 auto" }}>
                {t({ en: "Enter a verse reference to retrieve its scholarly context and protect against manipulation.", ar: "أدخل مرجع آية لاسترداد سياقها العلمي والحماية من التلاعب." })}
              </p>
            </div>
          )}

          {!loading && !error && results && (
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              
              <div style={{ padding: 32, backgroundColor: "var(--bg-card)", borderRadius: "var(--radius-md)", border: "1px solid var(--border)", boxShadow: "0 2px 10px rgba(0,0,0,0.02)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, borderBottom: "1px solid var(--border)", paddingBottom: 16 }}>
                  <h2 style={{ margin: 0, color: "var(--accent-primary)", fontSize: "1.5rem" }}>
                    {results.surahName} - Ayah {results.ayah}
                  </h2>
                  <span style={{ fontSize: "1.5rem", color: "var(--text-base)", fontFamily: "serif" }}>
                    {results.arabicName}
                  </span>
                </div>

                <div style={{ marginBottom: 32, textAlign: "center" }}>
                  <p style={{ fontSize: "2rem", lineHeight: 2, fontFamily: "serif", color: "var(--text-base)", margin: 0, direction: "rtl" }}>
                    {results.arabicAyah}
                  </p>
                </div>

                <div style={{ padding: 24, backgroundColor: "rgba(100,200,255,0.05)", borderLeft: isRTL ? "none" : "4px solid var(--accent-primary)", borderRight: isRTL ? "4px solid var(--accent-primary)" : "none", borderRadius: "var(--radius-sm)" }}>
                  <h4 style={{ margin: "0 0 12px 0", color: "var(--text-muted)", textTransform: "uppercase", fontSize: "0.85rem", letterSpacing: 1 }}>
                    {t({ en: "Translation (Asad)", ar: "الترجمة (أسد)" })}
                  </h4>
                  <p style={{ fontSize: "1.1rem", lineHeight: 1.6, margin: 0, color: "var(--text-base)" }}>
                    {results.englishTranslation}
                  </p>
                </div>
              </div>

              <div style={{ padding: 32, backgroundColor: "var(--bg-card)", borderRadius: "var(--radius-md)", border: "1px solid var(--border)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24, borderBottom: "1px solid var(--border)", paddingBottom: 16 }}>
                  <FileText size={24} style={{ color: "var(--accent-cta)" }} />
                  <h3 style={{ margin: 0, fontSize: "1.3rem" }}>
                    {t({ en: "Scholarly Context & Tafsir", ar: "السياق العلمي والتفسير" })}
                  </h3>
                  <span style={{ marginLeft: "auto", padding: "4px 10px", backgroundColor: "rgba(100,200,100,0.1)", color: "var(--accent-success)", borderRadius: 20, fontSize: "0.8rem", fontWeight: 600 }}>
                    <CheckCircle size={14} style={{ display: "inline", verticalAlign: "middle", marginRight: 4 }} />
                    {t({ en: "Verified Source: Tafsir Al-Jalalayn", ar: "مصدر موثوق: تفسير الجلالين" })}
                  </span>
                </div>

                <div style={{ direction: "rtl", textAlign: "right" }}>
                  <p style={{ fontSize: "1.2rem", lineHeight: 2, color: "var(--text-base)", fontFamily: "serif" }}>
                    {results.tafsirJalalayn}
                  </p>
                </div>
              </div>

              <div style={{ padding: 24, backgroundColor: results.abrogationInfo ? "rgba(239, 68, 68, 0.08)" : "rgba(255,150,50,0.05)", border: results.abrogationInfo ? "1px solid rgba(239, 68, 68, 0.3)" : "1px solid rgba(255,150,50,0.2)", borderRadius: "var(--radius-md)" }}>
                <h4 style={{ display: "flex", alignItems: "center", gap: 8, margin: "0 0 12px 0", color: results.abrogationInfo ? "#EF4444" : "#d4a843", fontSize: "1.1rem" }}>
                  <ShieldAlert size={20} /> {t({ en: "Abrogation (Nasikh & Mansukh) Status", ar: "حالة النسخ (الناسخ والمنسوخ)" })}
                </h4>
                {results.abrogationInfo ? (
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    <div style={{ fontSize: "1rem", fontWeight: 700, color: "var(--text-base)" }}>
                      {t({ en: `⚠️ ABROGATED (Mansukh) BY VERSE ${results.abrogationInfo.abrogatedBy}`, ar: `⚠️ حكم منسوخ بالآية الكريمة ${results.abrogationInfo.abrogatedBy}` })}
                    </div>
                    <div style={{ fontSize: "0.95rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>
                      <strong>{t({ en: "Abrogation Type: ", ar: "نوع النسخ: " })}</strong>
                      {results.abrogationInfo.type === "ruling_only" ? t({ en: "Ruling Abrogated, Recitation Remaining", ar: "نسخ الحكم وبقاء التلاوة" }) : t({ en: "Ruling and Recitation Abrogated", ar: "نسخ الحكم والتلاوة معاً" })}
                    </div>
                    <div style={{ fontSize: "0.95rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>
                      <strong>{t({ en: "Historical Context: ", ar: "السياق التاريخي: " })}</strong>
                      {t(results.abrogationInfo.context)}
                    </div>
                    <div style={{ fontSize: "0.95rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>
                      <strong>{t({ en: "Scholarly Explanation: ", ar: "الشرح والبيان: " })}</strong>
                      {t(results.abrogationInfo.explanation)}
                    </div>
                    <div style={{ fontSize: "0.85rem", color: "var(--text-muted)", fontStyle: "italic", borderTop: "1px solid var(--border)", paddingTop: 8 }}>
                      {t({ en: "Source Reference: ", ar: "مرجع المصدر: " })} {results.abrogationInfo.reference}
                    </div>
                  </div>
                ) : (
                  <p style={{ margin: 0, fontSize: "1rem", color: "var(--text-base)", lineHeight: 1.5 }}>
                    {t({
                      en: "No classical abrogation (Naskh) recorded for this verse. It is classified as Muhkam (decisive/applicable). Extracted from scholarly context. The above Tafsir text contains the historical reason for revelation if applicable.",
                      ar: "لا يوجد نسخ مسجل لهذه الآية في المصنفات المعتمدة. وهي من الآيات المحكمة المعمول بها. مستخرج من السياق العلمي، ويحتوي التفسير أعلاه على سبب النزول التاريخي إن وجد."
                    })}
                  </p>
                )}
              </div>

            </div>
          )}
        </div>
        
        {/* DISCLAIMER */}
        <div style={{ marginTop: 64, padding: 24, textAlign: "center", borderTop: "1px solid var(--border)", color: "var(--text-muted)", fontSize: "0.9rem", backgroundColor: "var(--bg-card)", borderRadius: "var(--radius-lg)" }}>
          <p style={{ maxWidth: 800, margin: "0 auto", lineHeight: 1.6 }}>
            <strong>{t({ en: "Disclaimer", ar: "إخلاء مسؤولية" })}:</strong> {t({ 
              en: "Quranic text and translations are provided via AlQuran.cloud and Tafsir via quran-tafseer.com APIs. For scholarly interpretation, consult qualified scholars. This platform does not issue religious rulings.", 
              ar: "يتم توفير النص القرآني والترجمات عبر AlQuran.cloud والتفسير عبر quran-tafseer.com. للتفسير العلمي، استشر العلماء المؤهلين. هذه المنصة لا تصدر فتاوى دينية." 
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
      <PageNavigation currentPath="/religion-hub/tools/quran-context" />
    </div>
  );
}
