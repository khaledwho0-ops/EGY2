"use client";
import { useState } from "react";
import { useRTL } from "@/components/shared/rtl-provider";

/* ══════════════════════════════════════════════════════
   CONCEPT EXPLAINER — Small button that explains
   scientific/Islamic concepts when pressed.
   Use: <ConceptExplainer term="CBT" explanation="..." />
   ══════════════════════════════════════════════════════ */

interface Props {
  term: string;
  termAr?: string;
  explanation: string;
  explanationAr?: string;
  source?: string;
  type?: "scientific" | "islamic" | "psychological" | "statistical";
}

export function ConceptExplainer({ term, termAr, explanation, explanationAr, source, type = "scientific" }: Props) {
  const { isRTL: a } = useRTL();
  const ff = a ? "'Noto Kufi Arabic', sans-serif" : "inherit";
  const [open, setOpen] = useState(false);

  const colors: Record<string, { bg: string; border: string; text: string; icon: string }> = {
    scientific: { bg: "rgba(99,102,241,0.08)", border: "rgba(99,102,241,0.2)", text: "#818cf8", icon: "🔬" },
    islamic: { bg: "rgba(245,158,11,0.08)", border: "rgba(245,158,11,0.2)", text: "#fbbf24", icon: "🕌" },
    psychological: { bg: "rgba(20,184,166,0.08)", border: "rgba(20,184,166,0.2)", text: "#2dd4bf", icon: "🧠" },
    statistical: { bg: "rgba(236,72,153,0.08)", border: "rgba(236,72,153,0.2)", text: "#f472b6", icon: "📊" },
  };

  const c = colors[type];

  return (
    <span style={{ position: "relative", display: "inline-block" }}>
      <button
        onClick={() => setOpen(!open)}
        aria-label={`Explain: ${term}`}
        style={{
          display: "inline-flex", alignItems: "center", gap: 3,
          padding: "2px 8px", borderRadius: 6,
          border: `1px solid ${c.border}`, background: c.bg,
          color: c.text, fontSize: 11, fontWeight: 600,
          cursor: "pointer", fontFamily: ff,
          transition: "all 0.2s",
          verticalAlign: "middle",
          marginInline: 4,
        }}
      >
        <span style={{ fontSize: 10 }}>{c.icon}</span>
        {a && termAr ? termAr : term}
        <span style={{ fontSize: 9, opacity: 0.7 }}>ⓘ</span>
      </button>

      {open && (
        <div style={{
          position: "absolute", bottom: "calc(100% + 8px)",
          [a ? "right" : "left"]: 0,
          width: 320, maxWidth: "90vw",
          padding: 16, borderRadius: 12,
          background: "var(--bg-secondary, #1e293b)",
          border: `1px solid ${c.border}`,
          boxShadow: "0 12px 40px rgba(0,0,0,0.4)",
          zIndex: 1000,
          animation: "fadeIn 0.15s ease",
          fontFamily: ff,
        }}>
          {/* Close button */}
          <button onClick={() => setOpen(false)} style={{
            position: "absolute", top: 8, [a ? "left" : "right"]: 8,
            width: 20, height: 20, borderRadius: "50%",
            border: "1px solid var(--border-primary)", background: "transparent",
            color: "var(--text-muted)", fontSize: 11, cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>✕</button>

          {/* Title */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
            <span style={{ fontSize: 16 }}>{c.icon}</span>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: c.text }}>{a && termAr ? termAr : term}</div>
              {a && termAr && <div style={{ fontSize: 11, color: "var(--text-muted)" }}>{term}</div>}
            </div>
          </div>

          {/* Explanation */}
          <p style={{ fontSize: 12, lineHeight: 1.8, color: "var(--text-secondary, #94a3b8)", margin: "0 0 8px" }}>
            {a && explanationAr ? explanationAr : explanation}
          </p>

          {/* Source */}
          {source && (
            <div style={{ fontSize: 10, color: "var(--text-muted, #64748b)", padding: "6px 8px", borderRadius: 6, background: "rgba(100,116,139,0.1)" }}>
              📚 {source}
            </div>
          )}
        </div>
      )}
    </span>
  );
}
