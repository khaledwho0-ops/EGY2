"use client";
/* ═══════════════════════════════════════════════════════════════
 * AnalysisProgress — a staged, bilingual "the engine is really working"
 * progress bar for the platform's long AI calls (11–25s deep analysis).
 *
 * Per the hardening decision: we keep the engines STRICT Gemini-first for
 * quality and MASK the latency so the wait reads as intentional, not broken.
 *
 * It is honest: the bar is tied to the REAL request lifecycle — it fills
 * asymptotically toward 93% while `running` is true and only completes when
 * the parent flips `running` to false (i.e. the real response arrived). The
 * stage LABELS reflect what the backend actually does, advancing on a schedule
 * calibrated to the expected duration. No fake "done in 800ms" timer.
 * ═══════════════════════════════════════════════════════════════ */
import { useEffect, useRef, useState } from "react";

export interface ProgressStage {
  en: string;
  ar: string;
}

/** Ready-made stage sets for the common engines. */
export const STAGE_SETS: Record<string, ProgressStage[]> = {
  debunk: [
    { en: "Reading the claim", ar: "قراءة الادّعاء" },
    { en: "Searching academic evidence", ar: "البحث في الأدلة العلمية" },
    { en: "Cross-checking trusted sources", ar: "مطابقة المصادر الموثوقة" },
    { en: "Running the One-Law check", ar: "تطبيق القانون الأوحد" },
    { en: "Composing the verdict", ar: "صياغة الحكم النهائي" },
  ],
  whatsapp: [
    { en: "Parsing the message", ar: "تحليل الرسالة" },
    { en: "Detecting bot & chain patterns", ar: "كشف أنماط البوت والسلاسل" },
    { en: "Scoring emotional manipulation", ar: "قياس التلاعب العاطفي" },
    { en: "Writing the ready-to-paste rebuttal", ar: "كتابة الردّ الجاهز" },
  ],
  fallacy: [
    { en: "Scanning for fallacy patterns", ar: "فحص أنماط المغالطات" },
    { en: "Running AI deep analysis", ar: "تحليل ذكاء اصطناعي عميق" },
    { en: "Mapping rhetorical devices", ar: "رسم الأساليب البلاغية" },
    { en: "Building the deconstruction guide", ar: "بناء دليل التفكيك" },
  ],
  forensic: [
    { en: "Reading the file", ar: "قراءة الملف" },
    { en: "Inspecting metadata & provenance", ar: "فحص البيانات الوصفية والمصدر" },
    { en: "Running forensic models", ar: "تشغيل نماذج التحليل الجنائي" },
    { en: "Scoring authenticity", ar: "تقييم الأصالة" },
  ],
  swarm: [
    { en: "OSINT threat hunting (live web)", ar: "تتبّع التهديد عبر الويب الحيّ" },
    { en: "Red-team psychological analysis", ar: "تحليل نفسي هجومي" },
    { en: "Composing the counter-narrative", ar: "صياغة السردية المضادة" },
  ],
};

export default function AnalysisProgress({
  running,
  stages = STAGE_SETS.debunk,
  expectedMs = 14000,
  lang = "en",
  accent = "#f0c030",
  title,
}: {
  running: boolean;
  stages?: ProgressStage[];
  expectedMs?: number;
  lang?: "en" | "ar";
  accent?: string;
  title?: ProgressStage;
}) {
  const [pct, setPct] = useState(0);
  const [stageIdx, setStageIdx] = useState(0);
  const startRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);
  const stoppedRef = useRef(false);

  useEffect(() => {
    if (running) {
      stoppedRef.current = false;
      startRef.current = performance.now();
      setPct(3);
      setStageIdx(0);
      const tick = () => {
        if (stoppedRef.current) return;
        const elapsed = performance.now() - (startRef.current ?? 0);
        // Asymptotic fill toward 93% — never "completes" before the data arrives.
        const p = 93 * (1 - Math.exp(-elapsed / (expectedMs / 2.4)));
        setPct(Math.max(3, Math.min(93, p)));
        setStageIdx(Math.min(stages.length - 1, Math.floor((elapsed / expectedMs) * stages.length)));
        rafRef.current = requestAnimationFrame(tick);
      };
      rafRef.current = requestAnimationFrame(tick);
      return () => {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
      };
    }
    // Request finished → snap to 100% on the real completion.
    stoppedRef.current = true;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    if (startRef.current !== null) {
      setStageIdx(stages.length - 1);
      setPct(100);
    }
  }, [running, expectedMs, stages.length]);

  if (!running && pct === 0) return null; // never started
  const rtl = lang === "ar";
  const stage = stages[stageIdx] ?? stages[0];
  const stageLabel = rtl ? stage.ar : stage.en;
  const heading = title ? (rtl ? title.ar : title.en) : rtl ? "جارٍ التحليل العميق…" : "Deep analysis in progress…";
  const complete = pct >= 100;

  return (
    <div dir={rtl ? "rtl" : "ltr"} style={S.wrap} role="status" aria-live="polite">
      <div style={S.head}>
        <span style={{ ...S.dot, background: accent, boxShadow: `0 0 10px ${accent}`, animation: complete ? "none" : "ap-pulse 1.1s ease-in-out infinite" }} />
        <span style={S.heading}>{complete ? (rtl ? "اكتمل ✓" : "Complete ✓") : heading}</span>
        <span style={{ ...S.pct, color: accent }}>{Math.round(pct)}%</span>
      </div>

      <div style={S.track}>
        <div style={{ ...S.fill, width: `${pct}%`, background: `linear-gradient(90deg, ${accent}99, ${accent})` }}>
          {!complete && <span style={S.shimmer} />}
        </div>
      </div>

      <div style={S.stageRow}>
        {stages.map((s, i) => (
          <span
            key={i}
            style={{
              ...S.stageLabel,
              color: i < stageIdx ? "#7c8794" : i === stageIdx ? accent : "#4a5560",
              fontWeight: i === stageIdx ? 700 : 500,
            }}
          >
            {i < stageIdx ? "✓ " : i === stageIdx ? "▸ " : "○ "}
            {rtl ? s.ar : s.en}
          </span>
        ))}
      </div>
      <div style={S.current}>{complete ? (rtl ? "تمّ — جارٍ عرض النتيجة" : "Done — rendering result") : stageLabel + "…"}</div>

      <style>{`@keyframes ap-pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.45;transform:scale(.82)}}
        @keyframes ap-shimmer{to{transform:translateX(320%)}}`}</style>
    </div>
  );
}

const S: Record<string, React.CSSProperties> = {
  wrap: { width: "100%", maxWidth: 520, margin: "0 auto", padding: "18px 20px", borderRadius: 16, border: "1px solid rgba(255,255,255,0.08)", background: "linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.015))", backdropFilter: "blur(8px)", fontFamily: "var(--font-body,'Inter',system-ui,sans-serif)" },
  head: { display: "flex", alignItems: "center", gap: 10, marginBottom: 12 },
  dot: { width: 9, height: 9, borderRadius: "50%", flexShrink: 0 },
  heading: { flex: 1, fontSize: 14, fontWeight: 700, color: "#e8edf2" },
  pct: { fontFamily: "var(--font-mono,'Space Mono',monospace)", fontSize: 13, fontWeight: 700 },
  track: { width: "100%", height: 7, borderRadius: 99, background: "rgba(255,255,255,0.07)", overflow: "hidden" },
  fill: { height: "100%", borderRadius: 99, position: "relative", overflow: "hidden", transition: "width .5s cubic-bezier(.22,1,.36,1)" },
  shimmer: { position: "absolute", top: 0, left: "-40%", width: "40%", height: "100%", background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.55),transparent)", animation: "ap-shimmer 1.3s linear infinite" },
  stageRow: { display: "flex", flexWrap: "wrap", gap: "6px 14px", marginTop: 14 },
  stageLabel: { fontSize: 11.5, transition: "color .3s ease" },
  current: { marginTop: 10, fontSize: 12.5, color: "#9aa4af", fontStyle: "italic" },
};
