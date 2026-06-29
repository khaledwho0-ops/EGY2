"use client";
/* Check-a-Screenshot — the flagship OCR feature, user-facing.
 * Upload a viral image → Tesseract reads the text → the One-Law pipeline
 * returns a real cited verdict (or UNVERIFIED). Theme-aware, bilingual. */
import { useState } from "react";
import { useRTL } from "@/components/shared/rtl-provider";

interface OcrResult {
  ok?: boolean;
  text?: string;
  note?: string;
  enforcement?: { status: string; tier: string; admissibleSources: number };
  sources?: { url: string; tier: string; title?: string }[];
  error?: string;
}

export default function CheckImagePage() {
  const { isRTL } = useRTL();
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<OcrResult | null>(null);
  const [loading, setLoading] = useState(false);

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
    setResult(null);
    setLoading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const r = await fetch("/api/forensic/ocr", { method: "POST", body: fd });
      setResult(await r.json());
    } catch {
      setResult({ error: isRTL ? "تعذّر الوصول إلى خدمة قراءة النص." : "Could not reach the OCR service." });
    } finally {
      setLoading(false);
    }
  }

  const verified = result?.enforcement?.status === "verified";

  return (
    <main dir={isRTL ? "rtl" : "ltr"} style={S.page}>
      <div style={S.wrap}>
        <header style={{ textAlign: isRTL ? "right" : "left" }}>
          <h1 style={S.h1}>{isRTL ? "افحص لقطة شاشة" : "Check a screenshot"}</h1>
          <p style={S.sub}>
            {isRTL
              ? "أكثر الأكاذيب انتشارًا في مصر بتيجي على شكل صور. ارفع واحدة — بنقرأ النص ونمرّر الادعاء على القانون الواحد: مصادر حقيقية موثّقة، أو تحذير صريح: غير مُتحقَّق."
              : "Egypt's most viral lies travel as images. Drop one in — we read the text and run the claim through the One Law: real cited sources, or a loud UNVERIFIED."}
          </p>
        </header>

        <label style={S.drop}>
          <input type="file" accept="image/*" onChange={onFile} style={{ display: "none" }} />
          <div style={{ fontSize: 15, fontWeight: 600 }}>
            {preview
              ? (isRTL ? "اختر صورة أخرى" : "Choose another image")
              : (isRTL ? "📷 ارفع لقطة شاشة" : "📷 Upload a screenshot")}
          </div>
          <div style={S.muted}>{isRTL ? "PNG / JPG / WebP — حتى ١٠ ميجابايت" : "PNG / JPG / WebP — up to 10MB"}</div>
        </label>

        {preview && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={preview} alt={isRTL ? "الصورة المرفوعة" : "uploaded"} style={S.img} />
        )}

        {loading && <p style={S.muted}>{isRTL ? "جارٍ قراءة الصورة والتحقّق من الادعاء…" : "Reading the image & checking the claim…"}</p>}

        {result && !loading && (
          <section style={S.card}>
            {result.error ? (
              <p style={{ color: "var(--accent-red)" }}>{result.error}</p>
            ) : !result.text ? (
              <p style={S.muted}>{result.note || (isRTL ? "لم يتم العثور على نص مقروء." : "No readable text detected.")}</p>
            ) : (
              <>
                <div style={S.label}>{isRTL ? "النص المُستخرَج" : "Extracted text"}</div>
                <p style={S.extracted}>“{result.text}”</p>
                {result.enforcement && (
                  <div style={{ ...S.badge, color: verified ? "var(--accent-emerald)" : "var(--accent-amber)", borderColor: verified ? "var(--accent-mentalhealth-glow)" : "var(--accent-deepreal-glow)" }}>
                    {verified
                      ? (isRTL ? `✅ مُتحقَّق · المستوى ${result.enforcement.tier}` : `✅ VERIFIED · Tier ${result.enforcement.tier}`)
                      : (isRTL ? "⚠ غير مُتحقَّق" : "⚠ UNVERIFIED")}
                    <span style={S.muted}>
                      {isRTL
                        ? ` · ${result.enforcement.admissibleSources} مصدر مقبول`
                        : ` · ${result.enforcement.admissibleSources} admissible source(s)`}
                    </span>
                  </div>
                )}
                {result.sources && result.sources.length > 0 && (
                  <div style={{ marginTop: 12 }}>
                    <div style={S.label}>{isRTL ? "المصادر" : "Sources"}</div>
                    {result.sources.map((s, i) => (
                      <a key={i} href={s.url} target="_blank" rel="noopener noreferrer" style={S.source}>
                        <span style={S.tier}>{s.tier}</span> {s.url}
                      </a>
                    ))}
                  </div>
                )}
              </>
            )}
          </section>
        )}
      </div>
    </main>
  );
}

const S: Record<string, React.CSSProperties> = {
  page: { minHeight: "100vh", background: "var(--bg-page)", color: "var(--text-primary)", fontFamily: "var(--font-body,'Inter',system-ui,sans-serif)", padding: "clamp(20px,5vw,56px)" },
  wrap: { maxWidth: 640, margin: "0 auto", display: "flex", flexDirection: "column", gap: 18 },
  h1: { margin: 0, fontSize: "clamp(22px,3.5vw,30px)", fontWeight: 800 },
  sub: { margin: "8px 0 0", color: "var(--text-secondary)", fontSize: 14, lineHeight: 1.6 },
  muted: { color: "var(--text-muted)", fontSize: 13 },
  drop: { display: "flex", flexDirection: "column", gap: 4, alignItems: "center", justifyContent: "center", padding: "30px 20px", border: "1.5px dashed var(--accent-amber)", borderRadius: 16, background: "var(--accent-deepreal-surface)", cursor: "pointer", textAlign: "center" },
  img: { maxWidth: "100%", maxHeight: 280, borderRadius: 12, border: "1px solid var(--border-primary)", objectFit: "contain" },
  card: { background: "var(--bg-card)", border: "1px solid var(--border-primary)", borderRadius: 16, padding: 20 },
  label: { fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-caption)", marginBottom: 4 },
  extracted: { fontSize: 16, color: "var(--text-primary)", margin: "0 0 14px", lineHeight: 1.5 },
  badge: { display: "inline-flex", alignItems: "center", gap: 4, fontWeight: 700, fontSize: 14, border: "1px solid", borderRadius: 10, padding: "8px 14px" },
  source: { display: "block", color: "var(--accent-blue)", fontSize: 12, marginTop: 5, wordBreak: "break-all" },
  tier: { display: "inline-block", background: "var(--accent-religionhub-surface)", color: "var(--accent-blue)", padding: "1px 7px", borderRadius: 6, fontWeight: 700, marginRight: 6 },
};
