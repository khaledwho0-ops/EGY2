"use client";

import { useState } from "react";

/* ═══════════════════════════════════════════════════════════════
 * <QuickGuide /> — the standard "how to use this page" block.
 * Every page mounts one (EAL Standard §7). Numbered steps + a real
 * scenario, bilingual, theme-reactive (var(--…)), collapsible.
 * ═══════════════════════════════════════════════════════════════ */

export interface QuickGuideProps {
  title?: string;
  titleAr?: string;
  steps: string[];
  stepsAr?: string[];
  scenario?: string;
  scenarioAr?: string;
  /** Render Arabic (RTL) variant. If omitted, shows English with Arabic title. */
  rtl?: boolean;
  defaultOpen?: boolean;
}

export function QuickGuide({
  title = "How to use this page",
  titleAr = "كيف تستخدم هذه الصفحة",
  steps,
  stepsAr,
  scenario,
  scenarioAr,
  rtl = false,
  defaultOpen = true,
}: QuickGuideProps) {
  const [open, setOpen] = useState(defaultOpen);
  const useSteps = rtl && stepsAr?.length ? stepsAr : steps;
  const useScenario = rtl && scenarioAr ? scenarioAr : scenario;

  return (
    <div
      dir={rtl ? "rtl" : "ltr"}
      style={{ borderRadius: 16, background: "var(--bg-card)", border: "1px solid var(--border-primary)", borderInlineStart: "4px solid var(--accent-cta)", overflow: "hidden" }}
    >
      <button
        onClick={() => setOpen((o) => !o)}
        style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, padding: "14px 18px", background: "transparent", border: "none", cursor: "pointer", textAlign: rtl ? "right" : "left" }}
      >
        <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 800, color: "var(--accent-cta)" }}>
          <span aria-hidden>🧭</span> {rtl ? titleAr : title} <span style={{ color: "var(--text-muted)", fontWeight: 500 }}>· {rtl ? title : titleAr}</span>
        </span>
        <span style={{ color: "var(--text-muted)", fontSize: 14, transform: open ? "rotate(180deg)" : "none", transition: "transform .2s" }}>▾</span>
      </button>

      {open && (
        <div style={{ padding: "0 18px 18px" }}>
          <ol style={{ margin: 0, paddingInlineStart: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
            {useSteps.map((s, i) => (
              <li key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <span style={{ flexShrink: 0, width: 22, height: 22, borderRadius: "50%", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, background: "color-mix(in srgb, var(--accent-cta) 16%, transparent)", color: "var(--accent-cta)", border: "1px solid color-mix(in srgb, var(--accent-cta) 40%, transparent)" }}>{i + 1}</span>
                <span style={{ fontSize: 13.5, lineHeight: 1.7, color: "var(--text-secondary)" }}>{s}</span>
              </li>
            ))}
          </ol>

          {useScenario && (
            <div style={{ marginTop: 14, padding: 12, borderRadius: 12, background: "var(--bg-secondary)", border: "1px solid var(--border-primary)" }}>
              <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--text-muted)" }}>{rtl ? "سيناريو حقيقي" : "Real scenario"}</span>
              <p style={{ margin: "6px 0 0", fontSize: 13, lineHeight: 1.75, color: "var(--text-secondary)" }}>{useScenario}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default QuickGuide;
