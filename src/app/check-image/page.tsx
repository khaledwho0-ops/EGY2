"use client";
/* Check-a-Screenshot — the flagship OCR feature, user-facing.
 * Upload a viral image → Tesseract reads the text → the One-Law pipeline
 * returns a real cited verdict (or UNVERIFIED). Dark, bilingual. */
import { useState } from "react";

interface OcrResult {
  ok?: boolean;
  text?: string;
  note?: string;
  enforcement?: { status: string; tier: string; admissibleSources: number };
  sources?: { url: string; tier: string; title?: string }[];
  error?: string;
}

export default function CheckImagePage() {
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
      setResult({ error: "Could not reach the OCR service." });
    } finally {
      setLoading(false);
    }
  }

  const verified = result?.enforcement?.status === "verified";

  return (
    <main style={S.page}>
      <div style={S.wrap}>
        <header>
          <h1 style={S.h1}>Check a screenshot <span style={S.ar}>· افحص لقطة شاشة</span></h1>
          <p style={S.sub}>
            Egypt&apos;s most viral lies travel as images. Drop one in — we read the text and run the claim
            through the One Law: real cited sources, or a loud UNVERIFIED.
            <span style={S.ar}> أكثر الأكاذيب انتشارًا تأتي كصور. ارفع واحدة — نقرأ النص ونتحقّق منه.</span>
          </p>
        </header>

        <label style={S.drop}>
          <input type="file" accept="image/*" onChange={onFile} style={{ display: "none" }} />
          <div style={{ fontSize: 15, fontWeight: 600 }}>{preview ? "Choose another image" : "📷 Upload a screenshot · ارفع صورة"}</div>
          <div style={S.muted}>PNG / JPG / WebP — up to 10MB</div>
        </label>

        {preview && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={preview} alt="uploaded" style={S.img} />
        )}

        {loading && <p style={S.muted}>Reading the image &amp; checking the claim… · جارٍ القراءة والتحقّق…</p>}

        {result && !loading && (
          <section style={S.card}>
            {result.error ? (
              <p style={{ color: "#ff7a7a" }}>{result.error}</p>
            ) : !result.text ? (
              <p style={S.muted}>{result.note || "No readable text detected."}</p>
            ) : (
              <>
                <div style={S.label}>Extracted text · النص المُستخرَج</div>
                <p style={S.extracted}>“{result.text}”</p>
                {result.enforcement && (
                  <div style={{ ...S.badge, color: verified ? "#3fcb6b" : "#ff9f43", borderColor: verified ? "rgba(63,203,107,.4)" : "rgba(255,159,67,.4)" }}>
                    {verified ? `✅ VERIFIED · Tier ${result.enforcement.tier}` : "⚠ UNVERIFIED"}
                    <span style={S.muted}> · {result.enforcement.admissibleSources} admissible source(s)</span>
                  </div>
                )}
                {result.sources && result.sources.length > 0 && (
                  <div style={{ marginTop: 12 }}>
                    <div style={S.label}>Sources · المصادر</div>
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
  page: { minHeight: "100vh", background: "#07070b", color: "#e8e2d6", fontFamily: "var(--font-body,'Inter',system-ui,sans-serif)", padding: "clamp(20px,5vw,56px)" },
  wrap: { maxWidth: 640, margin: "0 auto", display: "flex", flexDirection: "column", gap: 18 },
  h1: { margin: 0, fontSize: "clamp(22px,3.5vw,30px)", fontWeight: 800 },
  sub: { margin: "8px 0 0", color: "#9aa0a6", fontSize: 14, lineHeight: 1.6 },
  ar: { fontFamily: "var(--font-heading-ar),'Tajawal',sans-serif", color: "#9aa0a6" },
  muted: { color: "#8a909a", fontSize: 13 },
  drop: { display: "flex", flexDirection: "column", gap: 4, alignItems: "center", justifyContent: "center", padding: "30px 20px", border: "1.5px dashed rgba(240,192,48,0.4)", borderRadius: 16, background: "rgba(240,192,48,0.04)", cursor: "pointer", textAlign: "center" },
  img: { maxWidth: "100%", maxHeight: 280, borderRadius: 12, border: "1px solid rgba(255,255,255,0.08)", objectFit: "contain" },
  card: { background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: 20 },
  label: { fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", color: "#64748b", marginBottom: 4 },
  extracted: { fontSize: 16, color: "#fff", margin: "0 0 14px", lineHeight: 1.5 },
  badge: { display: "inline-flex", alignItems: "center", gap: 4, fontWeight: 700, fontSize: 14, border: "1px solid", borderRadius: 10, padding: "8px 14px" },
  source: { display: "block", color: "#22d3ee", fontSize: 12, marginTop: 5, wordBreak: "break-all" },
  tier: { display: "inline-block", background: "rgba(34,211,238,0.12)", color: "#67e8f9", padding: "1px 7px", borderRadius: 6, fontWeight: 700, marginRight: 6 },
};
