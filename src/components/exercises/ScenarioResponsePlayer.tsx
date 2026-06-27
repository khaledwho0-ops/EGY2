"use client";
/* ═══════════════════════════════════════════════════════════════
 * ScenarioResponsePlayer — the missing renderer for `scenario-response`
 * exercises (Stigma Scenarios, Grief-vs-Depression, etc.).
 *
 * These exercises have no single MCQ answer by design — the learner reads a
 * real-life scenario, drafts how THEY would respond, then reveals the expert
 * model response to compare against. This is a sound reveal/retrieval loop
 * (active recall before feedback), and it gives these rich, sourced exercises
 * an actual way to be "answered" — fixing the "no way to answer correct" gap.
 *
 * One-Law: every scenario block carries the dataset `source` line, shown in-UI.
 * ═══════════════════════════════════════════════════════════════ */
import { useState } from "react";

export interface ScenarioExercise {
  id?: string;
  scenario?: string;
  scenarioAr?: string;
  barriers_present?: string[];
  correct_response?: { response_en?: string; response_ar?: string };
  what_not_to_do?: string[];
  what_not_to_do_ar?: string[];
  key_insight?: string;
  key_insight_ar?: string;
}

export default function ScenarioResponsePlayer({
  title,
  titleAr,
  source,
  safetyNote,
  safetyNoteAr,
  exercises,
  lang = "en",
  onComplete,
}: {
  title?: string;
  titleAr?: string;
  source?: string;
  safetyNote?: string;
  safetyNoteAr?: string;
  exercises: ScenarioExercise[];
  lang?: "en" | "ar";
  onComplete?: () => void;
}) {
  const [idx, setIdx] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [draft, setDraft] = useState("");
  const rtl = lang === "ar";
  const ex = exercises?.[idx];
  if (!ex) return null;
  const isLast = idx === exercises.length - 1;
  const pct = Math.round(((idx + (revealed ? 1 : 0)) / exercises.length) * 100);

  const scenario = (rtl ? ex.scenarioAr : ex.scenario) || ex.scenario || "";
  const response = (rtl ? ex.correct_response?.response_ar : ex.correct_response?.response_en) || ex.correct_response?.response_en || "";
  const notToDo = (rtl ? ex.what_not_to_do_ar : ex.what_not_to_do) || ex.what_not_to_do || [];
  const insight = (rtl ? ex.key_insight_ar : ex.key_insight) || ex.key_insight || "";

  function next() {
    if (isLast) { onComplete?.(); return; }
    setIdx((i) => i + 1);
    setRevealed(false);
    setDraft("");
  }

  const T = {
    of: rtl ? "من" : "of",
    barriers: rtl ? "الحواجز في هذا الموقف" : "Barriers in this scenario",
    yourTurn: rtl ? "كيف كنت سترُدّ؟ اكتب ردّك أولًا، ثم قارنه بردّ الخبير." : "How would you respond? Draft your answer first, then compare it to the expert response.",
    placeholder: rtl ? "اكتب ردّك هنا (لنفسك — لن يُقيَّم آليًا)…" : "Write your response here (for yourself — not auto-graded)…",
    reveal: rtl ? "اكشف ردّ الخبير ⟶" : "Reveal the expert response ⟶",
    expert: rtl ? "ردّ الخبير المبني على الأدلة" : "Evidence-based expert response",
    avoid: rtl ? "ما يجب تجنّبه" : "What NOT to do",
    insight: rtl ? "الخلاصة الجوهرية" : "Key insight",
    next: isLast ? (rtl ? "إنهاء ✓" : "Finish ✓") : (rtl ? "السيناريو التالي ⟶" : "Next scenario ⟶"),
    yourDraft: rtl ? "ردّك" : "Your draft",
  };

  return (
    <div dir={rtl ? "rtl" : "ltr"} style={S.wrap}>
      {/* header + progress */}
      <div style={S.head}>
        <div style={{ flex: 1 }}>
          {(rtl ? titleAr : title) && <div style={S.title}>{rtl ? titleAr : title}</div>}
          <div style={S.counter}>{idx + 1} {T.of} {exercises.length}</div>
        </div>
        <div style={S.pct}>{pct}%</div>
      </div>
      <div style={S.track}><div style={{ ...S.fill, width: `${pct}%` }} /></div>

      {/* scenario */}
      <p style={S.scenario}>{scenario}</p>

      {/* barriers */}
      {ex.barriers_present && ex.barriers_present.length > 0 && (
        <div style={{ marginBottom: 14 }}>
          <div style={S.label}>{T.barriers}</div>
          <div style={S.chips}>
            {ex.barriers_present.map((b, i) => <span key={i} style={S.chip}>{b}</span>)}
          </div>
        </div>
      )}

      {!revealed ? (
        <>
          <div style={S.prompt}>{T.yourTurn}</div>
          <textarea value={draft} onChange={(e) => setDraft(e.target.value)} placeholder={T.placeholder} style={S.textarea} dir={rtl ? "rtl" : "ltr"} />
          <button onClick={() => setRevealed(true)} style={S.revealBtn}>{T.reveal}</button>
        </>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {draft.trim() && (
            <div style={S.draftBox}>
              <div style={S.label}>{T.yourDraft}</div>
              <p style={S.draftText}>{draft}</p>
            </div>
          )}
          <div style={S.expertBox}>
            <div style={{ ...S.label, color: "#3fcb6b" }}>✓ {T.expert}</div>
            <p style={S.bodyText}>{response}</p>
          </div>
          {notToDo.length > 0 && (
            <div style={S.avoidBox}>
              <div style={{ ...S.label, color: "#ff7a7a" }}>✕ {T.avoid}</div>
              <ul style={S.list}>{notToDo.map((x, i) => <li key={i} style={S.li}>{x}</li>)}</ul>
            </div>
          )}
          {insight && (
            <div style={S.insightBox}>
              <div style={{ ...S.label, color: "#f0c030" }}>★ {T.insight}</div>
              <p style={S.bodyText}>{insight}</p>
            </div>
          )}
          <button onClick={next} style={S.nextBtn}>{T.next}</button>
        </div>
      )}

      {(safetyNote || source) && (
        <div style={S.foot}>
          {(rtl ? safetyNoteAr : safetyNote) && <div style={S.safety}>⚠ {rtl ? safetyNoteAr : safetyNote}</div>}
          {source && <div style={S.source}>{rtl ? "المصدر" : "Source"}: {source}</div>}
        </div>
      )}
    </div>
  );
}

const S: Record<string, React.CSSProperties> = {
  wrap: { background: "rgba(10,12,24,0.6)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: 20, fontFamily: "var(--font-body,'Inter',system-ui,sans-serif)", color: "#e8edf2", maxWidth: 720 },
  head: { display: "flex", alignItems: "center", gap: 10, marginBottom: 8 },
  title: { fontSize: 15, fontWeight: 800, color: "#fff" },
  counter: { fontSize: 11, color: "#64748b", fontFamily: "var(--font-mono,monospace)" },
  pct: { fontSize: 12, fontWeight: 700, color: "#22d3ee", fontFamily: "var(--font-mono,monospace)" },
  track: { height: 5, background: "rgba(255,255,255,0.07)", borderRadius: 99, overflow: "hidden", marginBottom: 16 },
  fill: { height: "100%", background: "linear-gradient(90deg,#22d3ee,#3fcb6b)", borderRadius: 99, transition: "width .4s ease" },
  scenario: { fontSize: 15, lineHeight: 1.7, color: "#e8edf2", margin: "0 0 14px" },
  label: { fontSize: 11, textTransform: "uppercase", letterSpacing: "0.07em", color: "#64748b", marginBottom: 6, fontWeight: 700 },
  chips: { display: "flex", flexWrap: "wrap", gap: 6 },
  chip: { fontSize: 11.5, background: "rgba(255,159,67,0.1)", color: "#ffb877", border: "1px solid rgba(255,159,67,0.25)", borderRadius: 8, padding: "3px 9px" },
  prompt: { fontSize: 13.5, color: "#cbd5e1", margin: "4px 0 8px", fontWeight: 600 },
  textarea: { width: "100%", minHeight: 90, background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, padding: 12, color: "#e8edf2", fontSize: 13.5, lineHeight: 1.6, resize: "vertical", fontFamily: "inherit", boxSizing: "border-box" },
  revealBtn: { marginTop: 12, width: "100%", padding: "12px", borderRadius: 10, border: "none", background: "linear-gradient(135deg,#22d3ee,#0ea5e9)", color: "#001016", fontWeight: 800, fontSize: 14, cursor: "pointer" },
  draftBox: { background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 10, padding: 12 },
  draftText: { margin: 0, fontSize: 13, color: "#94a3b8", lineHeight: 1.6, whiteSpace: "pre-wrap" },
  expertBox: { background: "rgba(63,203,107,0.06)", border: "1px solid rgba(63,203,107,0.25)", borderRadius: 10, padding: 14 },
  avoidBox: { background: "rgba(255,90,90,0.05)", border: "1px solid rgba(255,90,90,0.2)", borderRadius: 10, padding: 14 },
  insightBox: { background: "rgba(240,192,48,0.06)", border: "1px solid rgba(240,192,48,0.25)", borderRadius: 10, padding: 14 },
  bodyText: { margin: 0, fontSize: 13.5, lineHeight: 1.7, color: "#e2e8f0" },
  list: { margin: 0, paddingInlineStart: 18 },
  li: { fontSize: 13, lineHeight: 1.65, color: "#e2e8f0", marginBottom: 4 },
  nextBtn: { marginTop: 4, width: "100%", padding: "12px", borderRadius: 10, border: "none", background: "linear-gradient(135deg,#3fcb6b,#16a34a)", color: "#00140a", fontWeight: 800, fontSize: 14, cursor: "pointer" },
  foot: { marginTop: 16, paddingTop: 12, borderTop: "1px solid rgba(255,255,255,0.07)", display: "flex", flexDirection: "column", gap: 6 },
  safety: { fontSize: 11.5, color: "#fbbf24", lineHeight: 1.5 },
  source: { fontSize: 11, color: "#64748b", fontFamily: "var(--font-mono,monospace)" },
};
