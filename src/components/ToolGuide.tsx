"use client";
/* ═══════════════════════════════════════════════════════════════
 * ToolGuide — the reusable "how to use + who benefits + ready scenarios"
 * block the user asked for across many tools (paper-auditor, stat-power,
 * bias-detector, cognitive-lab, god-system, sources, evidence, swarm…).
 *
 * Goal: a zero-knowledge user instantly understands (a) what this tool is for,
 * (b) who it helps & how, and (c) can press ONE button to load a REAL, name-free
 * Egyptian example into the tool and see it work. No mockups — the scenarios are
 * real claims/inputs wired to the page's own run handler.
 * ═══════════════════════════════════════════════════════════════ */
import { useState } from "react";

export interface GuideScenario {
  label: string;        // short button label (EN)
  labelAr?: string;     // short button label (AR)
  input: string;        // the actual input loaded into the tool
  tag?: string;         // optional tag, e.g. "health" / "religion" / "finance"
}

export default function ToolGuide({
  titleEn = "How to use this",
  titleAr = "كيفية الاستخدام",
  whoBenefits,
  steps,
  scenarios = [],
  onTry,
  lang = "en",
  accent = "#f0c030",
  defaultOpen = true,
}: {
  titleEn?: string;
  titleAr?: string;
  whoBenefits?: { en: string; ar: string };
  steps: { en: string; ar: string }[];
  scenarios?: GuideScenario[];
  onTry?: (input: string) => void;
  lang?: "en" | "ar";
  accent?: string;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const rtl = lang === "ar";
  const tx = (en: string, ar: string) => (rtl ? ar : en);

  return (
    <section dir={rtl ? "rtl" : "ltr"} style={{ ...S.wrap, borderColor: `${accent}40` }}>
      <button onClick={() => setOpen((o) => !o)} style={S.head} aria-expanded={open}>
        <span style={{ ...S.badge, background: `${accent}22`, color: accent }}>?</span>
        <span style={S.title}>{rtl ? titleAr : titleEn}</span>
        <span style={{ ...S.chev, transform: open ? "rotate(90deg)" : "none" }}>›</span>
      </button>

      {open && (
        <div style={S.body}>
          {whoBenefits && (
            <p style={S.who}>
              <span style={{ color: accent, fontWeight: 700 }}>{tx("Who it's for:", "لمن هذه الأداة:")} </span>
              {rtl ? whoBenefits.ar : whoBenefits.en}
            </p>
          )}

          <ol style={S.steps}>
            {steps.map((s, i) => (
              <li key={i} style={S.step}>
                <span style={{ ...S.num, background: `${accent}1e`, color: accent }}>{i + 1}</span>
                <span>{rtl ? s.ar : s.en}</span>
              </li>
            ))}
          </ol>

          {scenarios.length > 0 && (
            <div style={{ marginTop: 14 }}>
              <div style={S.scLabel}>{tx("▶ Try a ready example (real, name-free)", "▶ جرّب مثالًا جاهزًا (حقيقي وبدون أسماء)")}</div>
              <div style={S.scRow}>
                {scenarios.map((sc, i) => (
                  <button
                    key={i}
                    onClick={() => onTry?.(sc.input)}
                    disabled={!onTry}
                    title={sc.input}
                    style={{ ...S.scBtn, borderColor: `${accent}55`, cursor: onTry ? "pointer" : "default" }}
                  >
                    {sc.tag && <span style={{ ...S.tag, background: `${accent}22`, color: accent }}>{sc.tag}</span>}
                    {rtl ? sc.labelAr ?? sc.label : sc.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
}

const S: Record<string, React.CSSProperties> = {
  wrap: { width: "100%", border: "1px solid", borderRadius: 14, background: "rgba(255,255,255,0.025)", margin: "0 0 18px", overflow: "hidden", fontFamily: "var(--font-body,'Inter',system-ui,sans-serif)" },
  head: { display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "12px 16px", background: "transparent", border: "none", cursor: "pointer", textAlign: "start", color: "inherit" },
  badge: { width: 22, height: 22, borderRadius: "50%", display: "inline-flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 13, flexShrink: 0 },
  title: { flex: 1, fontSize: 14, fontWeight: 700, color: "#e8edf2" },
  chev: { fontSize: 20, color: "#64748b", transition: "transform .2s", lineHeight: 1 },
  body: { padding: "4px 16px 16px" },
  who: { margin: "0 0 12px", fontSize: 13, lineHeight: 1.6, color: "#aab4c0" },
  steps: { listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 8 },
  step: { display: "flex", gap: 10, alignItems: "flex-start", fontSize: 13, lineHeight: 1.55, color: "#cbd5e1" },
  num: { width: 20, height: 20, borderRadius: 6, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 11.5, fontWeight: 800, flexShrink: 0, marginTop: 1 },
  scLabel: { fontSize: 12, fontWeight: 700, color: "#94a3b8", marginBottom: 8 },
  scRow: { display: "flex", flexWrap: "wrap", gap: 8 },
  scBtn: { display: "inline-flex", alignItems: "center", gap: 6, padding: "7px 12px", borderRadius: 9, border: "1px solid", background: "rgba(255,255,255,0.03)", color: "#e8edf2", fontSize: 12.5, fontWeight: 600 },
  tag: { fontSize: 9.5, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.05em", padding: "1px 6px", borderRadius: 5 },
};
