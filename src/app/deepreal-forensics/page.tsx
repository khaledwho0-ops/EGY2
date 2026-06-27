"use client";

import { useState, useRef } from "react";
import { PageNavigation } from "@/components/shared/page-navigation";
import { PageAIChatbot } from "@/components/shared/page-ai-chatbot";
import { ScientificShield } from "@/components/shared/scientific-shield";
import { buildSystemPrompt } from "@/lib/standard";

/* ══════════════════════════════════════════════════════════
   DeepReal Forensics — REAL image authentication.
   Real EXIF (exifr, always) + Sightengine deepfake signal (weak) +
   honest interpretation. No mock data. EAL Standard §0/§13.
   ══════════════════════════════════════════════════════════ */

type Result = {
  success: boolean;
  deepfakeAvailable: boolean;
  metadata: { hasExif: boolean; make?: string | null; model?: string | null; software?: string | null; dateTimeOriginal?: string | null; gps?: { lat: number; lon: number } | null };
  metadataSignals: string[];
  detection?: Record<string, number> | null;
  aiIntelligence?: { verdict?: string; verdictAr?: string; confidence?: number; explanation_en?: string; explanation_ar?: string; actionItems?: string[]; riskLevel?: string } | null;
  note?: string;
};

const verdictColor = (v?: string) =>
  v === "AUTHENTIC" ? "var(--accent-emerald)"
    : v === "LIKELY_FAKE" ? "var(--accent-red)"
    : v === "SUSPICIOUS" ? "var(--accent-amber)"
    : "var(--accent-blue)"; // INCONCLUSIVE / unknown

export default function DeepRealForensicsPage() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const onPick = (f: File | null) => {
    setResult(null); setError(null);
    if (!f) { setFile(null); setPreview(null); return; }
    if (!f.type.startsWith("image/")) { setError("Please choose an image (JPEG/PNG/WebP)."); return; }
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const analyze = async () => {
    if (!file) return;
    setAnalyzing(true); setError(null); setResult(null);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/defense/deepreal/analyze", { method: "POST", body: fd });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || "Analysis failed");
      setResult(json as Result);
    } catch (e: any) {
      setError(e?.message || "Analysis failed — please try another image.");
    } finally {
      setAnalyzing(false);
    }
  };

  const ai = result?.aiIntelligence;
  const det = result?.detection;

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-page)", color: "var(--text-primary)", paddingTop: "var(--navbar-height, 64px)" }}>
      <div style={{ maxWidth: 920, margin: "0 auto", padding: "32px 20px 120px" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 22 }}>
          <h1 style={{ fontSize: "clamp(26px,4vw,40px)", fontWeight: 800, margin: 0, letterSpacing: "-0.02em" }}>
            Media Forensics Suite <span style={{ color: "var(--accent-cta)" }}>·</span> منظومة الطب الشرعي للوسائط
          </h1>
          <p style={{ fontSize: 14, color: "var(--text-secondary)", maxWidth: 600, margin: "10px auto 0", lineHeight: 1.7 }}>
            Real image authentication — EXIF metadata + provenance + a deepfake signal. We extract what the file
            actually contains; we never fabricate a verdict.
          </p>
        </div>

        {/* Explainer */}
        <div style={{ padding: 16, borderRadius: 14, background: "var(--bg-card)", border: "1px solid var(--border-primary)", borderInlineStart: "4px solid var(--accent-cta)", marginBottom: 22 }}>
          <strong style={{ fontSize: 13, color: "var(--accent-cta)" }}>How to use · كيف تستخدمها</strong>
          <p style={{ fontSize: 13, lineHeight: 1.75, color: "var(--text-secondary)", margin: "8px 0 0" }}>
            Upload an image → we read its <b>real EXIF</b> (camera, editing software, GPS, timestamp) and run a
            deepfake/AI-generation check, then explain it honestly. Real scenario: a viral &quot;photo&quot; of a flood in
            Cairo — if EXIF shows <i>Software: Midjourney</i> or there&apos;s no camera data and the AI score is high,
            that&apos;s a manipulation signal. Absence of metadata is <b>not</b> proof of fakery — only a lead.
          </p>
        </div>

        {/* Upload zone */}
        <div
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => { e.preventDefault(); onPick(e.dataTransfer.files?.[0] || null); }}
          style={{ cursor: "pointer", borderRadius: 18, border: "2px dashed var(--border-secondary)", background: "var(--bg-secondary)", padding: 28, textAlign: "center", marginBottom: 16 }}
        >
          <input ref={inputRef} type="file" accept="image/*" hidden onChange={(e) => onPick(e.target.files?.[0] || null)} />
          {preview ? (
            <img src={preview} alt="preview" style={{ maxHeight: 260, maxWidth: "100%", borderRadius: 12, objectFit: "contain" }} />
          ) : (
            <div style={{ color: "var(--text-muted)" }}>
              <div style={{ fontSize: 34, marginBottom: 8 }}>🖼️</div>
              <div style={{ fontWeight: 700, color: "var(--text-secondary)" }}>Drop an image or click to upload</div>
              <div style={{ fontSize: 12, marginTop: 4 }}>JPEG · PNG · WebP — up to 10MB</div>
            </div>
          )}
        </div>

        <div style={{ display: "flex", gap: 10, justifyContent: "center", marginBottom: 24 }}>
          <button onClick={analyze} disabled={!file || analyzing}
            style={{ padding: "12px 28px", borderRadius: 12, border: "none", cursor: !file || analyzing ? "default" : "pointer", opacity: !file || analyzing ? 0.5 : 1, background: "var(--accent-cta)", color: "#fff", fontWeight: 800, fontSize: 14 }}>
            {analyzing ? "Analyzing…" : "🔬 Analyze (real forensics)"}
          </button>
          {file && <button onClick={() => onPick(null)} style={{ padding: "12px 18px", borderRadius: 12, border: "1px solid var(--border-primary)", background: "var(--bg-secondary)", color: "var(--text-secondary)", cursor: "pointer", fontSize: 13 }}>Clear</button>}
        </div>

        {error && (
          <div style={{ padding: 16, borderRadius: 12, background: "color-mix(in srgb, var(--accent-red) 10%, transparent)", border: "1px solid color-mix(in srgb, var(--accent-red) 35%, transparent)", color: "var(--accent-red)", marginBottom: 20, textAlign: "center", fontSize: 14 }}>
            ⚠ {error}
          </div>
        )}

        {/* Results */}
        {result && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {/* Verdict */}
            {ai?.verdict && (
              <div style={{ padding: 22, borderRadius: 16, textAlign: "center", background: `color-mix(in srgb, ${verdictColor(ai.verdict)} 10%, transparent)`, border: `2px solid color-mix(in srgb, ${verdictColor(ai.verdict)} 35%, transparent)` }}>
                <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--text-muted)" }}>Verdict · الحكم</div>
                <div style={{ fontSize: 26, fontWeight: 900, color: verdictColor(ai.verdict), margin: "4px 0" }}>{ai.verdict}{ai.verdictAr ? ` · ${ai.verdictAr}` : ""}</div>
                {ai.explanation_en && <p style={{ fontSize: 13.5, lineHeight: 1.7, color: "var(--text-secondary)", margin: "8px 0 0" }}>{ai.explanation_en}</p>}
                {ai.explanation_ar && <p dir="rtl" style={{ fontSize: 13.5, lineHeight: 1.8, color: "var(--text-muted)", margin: "6px 0 0" }}>{ai.explanation_ar}</p>}
              </div>
            )}

            {/* Real EXIF metadata */}
            <div style={{ padding: 20, borderRadius: 16, background: "var(--bg-card)", border: "1px solid var(--border-primary)" }}>
              <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 12 }}>📋 Real EXIF metadata (exifr)</div>
              {result.metadata.hasExif ? (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 10 }}>
                  {[["Camera", [result.metadata.make, result.metadata.model].filter(Boolean).join(" ") || "—"],
                    ["Software", result.metadata.software || "—"],
                    ["Captured", result.metadata.dateTimeOriginal || "—"],
                    ["GPS", result.metadata.gps ? `${result.metadata.gps.lat?.toFixed(4)}, ${result.metadata.gps.lon?.toFixed(4)}` : "—"]].map(([k, v]) => (
                    <div key={k as string} style={{ padding: 12, borderRadius: 10, background: "var(--bg-secondary)", border: "1px solid var(--border-primary)" }}>
                      <div style={{ fontSize: 10, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-muted)" }}>{k}</div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)", marginTop: 3, wordBreak: "break-word" }}>{v}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <p style={{ fontSize: 13, color: "var(--text-secondary)", margin: 0 }}>No EXIF metadata in this file — stripped by a platform, a screenshot, or AI-generated. <b>Neutral</b>, not proof of fakery.</p>
              )}
              {result.metadataSignals?.length > 0 && (
                <ul style={{ margin: "12px 0 0", paddingInlineStart: 18, fontSize: 12.5, lineHeight: 1.7, color: "var(--text-secondary)" }}>
                  {result.metadataSignals.map((s, i) => <li key={i}>{s}</li>)}
                </ul>
              )}
            </div>

            {/* Deepfake signal (honest) */}
            <div style={{ padding: 20, borderRadius: 16, background: "var(--bg-card)", border: "1px solid var(--border-primary)" }}>
              <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 12 }}>🤖 AI / deepfake signal</div>
              {result.deepfakeAvailable && det ? (
                <>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: 10 }}>
                    {Object.entries(det).slice(0, 6).map(([k, v]) => (
                      <div key={k} style={{ padding: 12, borderRadius: 10, background: "var(--bg-secondary)", border: "1px solid var(--border-primary)" }}>
                        <div style={{ fontSize: 10, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-muted)" }}>{k.replace(/_/g, " ")}</div>
                        <div style={{ fontSize: 18, fontWeight: 900, color: (v as number) > 0.6 ? "var(--accent-red)" : (v as number) > 0.3 ? "var(--accent-amber)" : "var(--accent-emerald)", marginTop: 2 }}>{((v as number) * 100).toFixed(0)}%</div>
                      </div>
                    ))}
                  </div>
                  <p style={{ fontSize: 11.5, lineHeight: 1.6, color: "var(--text-muted)", margin: "12px 0 0", fontStyle: "italic" }}>
                    ⚠ Deepfake detectors are a <b>weak signal</b> — independent benchmarks (Deepfake-Eval-2024) show ~61–69% accuracy on real-world compressed media, with high false positives. Use this alongside the metadata and a reverse-image search, never as proof.
                  </p>
                </>
              ) : (
                <p style={{ fontSize: 13, color: "var(--text-secondary)", margin: 0 }}>{result.note || "AI/deepfake detection is offline. The EXIF analysis above is real; absence of detection is inconclusive, never proof of authenticity."}</p>
              )}
            </div>

            {/* Scientific Shield */}
            <ScientificShield
              title="Forensic method & provenance"
              confidenceLabel={ai?.verdict === "AUTHENTIC" ? "MEDIUM" : ai?.verdict === "LIKELY_FAKE" ? "MEDIUM" : "UNVERIFIED"}
              confidenceScore={typeof ai?.confidence === "number" ? Math.round(ai.confidence * 100) : undefined}
              layer={{ number: 1, name: "THE ABSOLUTE FABRICATION", nameAr: "الكذب المطلق", defense: "SIFT — verify the source exists, reverse-image search, and check C2PA Content Credentials at contentcredentials.org/verify." }}
              methodologyNote="EXIF via exifr (real, deterministic). Deepfake/AI detection via Sightengine — a weak signal per Deepfake-Eval-2024 (~61–69% real-world accuracy). Provenance: C2PA Content Credentials when present."
              sources={[
                { title: "exifr — EXIF/GPS/XMP extraction", url: "https://github.com/MikeKovarik/exifr", tier: "A" },
                { title: "Sightengine deepfake detection API", url: "https://sightengine.com/", tier: "B" },
                { title: "C2PA Content Credentials — verify", url: "https://contentcredentials.org/verify", tier: "A" },
                { title: "Deepfake-Eval-2024 (detector reliability)", url: "https://arxiv.org/abs/2503.02857", tier: "S" },
              ]}
            />
          </div>
        )}
      </div>

      <PageAIChatbot
        pageTitle="DeepReal Forensics — الطب الشرعي للصور"
        pageContext="Real image authentication: EXIF metadata (exifr), Sightengine deepfake signal (weak), C2PA provenance. Honest interpretation, no fabricated verdicts."
        systemPrompt={buildSystemPrompt({
          role: "You are a media-forensics analyst for the Egyptian Awareness Library. You interpret EXIF metadata, deepfake-detection scores, and C2PA provenance — honestly and without overclaiming.",
          roleAr: "محلل الطب الشرعي للوسائط",
          sourcePreferences: ["EXIF (exifr)", "C2PA Content Credentials", "InVID/WeVerify", "reverse image (Google Lens/TinEye)", "Sightengine"],
          extraRules: [
            "Deepfake detectors are a WEAK signal (~61–69% real-world accuracy). Never assert an image is fake from a detector score alone.",
            "Absence of EXIF is neutral, not proof of fakery. Editing software in metadata is a signal, not a verdict.",
            "Always recommend the strongest real check: C2PA verification + reverse-image search + read the source laterally (SIFT).",
          ],
        })}
        suggestedQuestions={[
          "إيه معنى إن الصورة مفيهاش EXIF؟",
          "Is a high deepfake score proof it's fake?",
          "How do I check C2PA Content Credentials?",
          "إزاي أعمل بحث صورة عكسي؟",
        ]}
        accentColor="#19aaff"
        accentColorRgb="25,170,255"
      />
      <PageNavigation currentPath="/deepreal-forensics" />
    </div>
  );
}
