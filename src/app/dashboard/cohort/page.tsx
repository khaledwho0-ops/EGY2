"use client";
/* Cohort Dashboard (Gap 4 surface) — the fundable number, visualized.
 * Reads /api/efficacy and shows the pre→post MIST-20 delta, effect size,
 * CI, and the honest distrust-drift flag. Dark, bilingual, like /passport. */
import { useEffect, useState } from "react";

interface Efficacy {
  n: number;
  headline: string;
  veracityDiscernment: { meanPre: number; meanPost: number; meanDelta: number; sdDelta: number; cohensDz: number | null; ci95: [number, number] | null } | null;
  fakeNewsAcceptMeanDelta: number | null;
  distrustDrift: { meanRealNewsBiasDelta: number | null; flagged: boolean; note: string };
  caveats: string[];
}

export default function CohortDashboard() {
  const [eff, setEff] = useState<Efficacy | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/efficacy")
      .then((r) => r.json())
      .then((j) => setEff(j))
      .catch(() => setEff(null))
      .finally(() => setLoading(false));
  }, []);

  const v = eff?.veracityDiscernment;
  const has = Boolean(eff && eff.n > 0 && v);

  return (
    <main style={S.page}>
      <div style={S.wrap}>
        <header>
          <h1 style={S.h1}>Cohort Efficacy <span style={S.ar}>· الفعالية الجماعية</span></h1>
          <p style={S.sub}>Does EAL make people measurably harder to fool? The one citable claim. <span style={S.ar}>هل تجعل EAL الناس أصعب في الخداع — بشكل مقيس؟</span></p>
        </header>

        {loading ? (
          <p style={S.muted}>Loading… · جارٍ التحميل…</p>
        ) : !has ? (
          <div style={S.card}>
            <p style={S.muted}>No paired pre/post MIST-20 data yet (N={eff?.n ?? 0}). The engine is live — the number appears as participants complete the pre and post test.</p>
          </div>
        ) : (
          <>
            <section style={S.heroCard}>
              <p style={S.headline}>{eff!.headline}</p>
              <div style={S.deltaRow}>
                <Big label="Pre" ar="قبلي" value={v!.meanPre} />
                <span style={S.arrow}>→</span>
                <Big label="Post" ar="بعدي" value={v!.meanPost} accent />
                <div style={S.deltaChip}>Δ {v!.meanDelta >= 0 ? "+" : ""}{v!.meanDelta} / 20</div>
              </div>
              <div style={S.statline}>
                <span>N = <b>{eff!.n}</b></span>
                <span>effect size dz = <b>{v!.cohensDz ?? "—"}</b></span>
                <span>95% CI = <b>{v!.ci95 ? `[${v!.ci95[0]}, ${v!.ci95[1]}]` : "—"}</b></span>
                <span>gullibility Δ = <b style={{ color: (eff!.fakeNewsAcceptMeanDelta ?? 0) < 0 ? "#3fcb6b" : "#ff7a7a" }}>{eff!.fakeNewsAcceptMeanDelta ?? "—"}</b></span>
              </div>
            </section>

            <section style={{ ...S.card, borderColor: eff!.distrustDrift.flagged ? "rgba(255,122,122,0.5)" : "rgba(63,203,107,0.4)" }}>
              <h3 style={S.h3}>Honesty guard — distrust drift <span style={S.ar}>· انحراف الريبة</span></h3>
              <p style={{ color: eff!.distrustDrift.flagged ? "#ff7a7a" : "#3fcb6b", fontSize: 14, margin: 0 }}>{eff!.distrustDrift.note}</p>
            </section>

            <section style={S.card}>
              <h3 style={S.h3}>What funders see</h3>
              <p style={S.muted}>A deployed, reproducible pre→post instrument — the thing most civic-tech tools lack. We report the within-subjects effect (dz, not between-groups d) and flag distrust-drift rather than overclaim. Honesty is the credibility asset.</p>
              <ul style={S.caveats}>
                {eff!.caveats?.map((c, i) => <li key={i}>{c}</li>)}
              </ul>
            </section>
          </>
        )}
      </div>
    </main>
  );
}

function Big({ label, ar, value, accent }: { label: string; ar: string; value: number; accent?: boolean }) {
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: 44, fontWeight: 800, color: accent ? "#f0c030" : "#fff", lineHeight: 1 }}>{value}</div>
      <div style={{ fontSize: 12, color: "#8a909a" }}>{label} <span style={S.ar}>{ar}</span></div>
    </div>
  );
}

const S: Record<string, React.CSSProperties> = {
  page: { minHeight: "100vh", background: "#07070b", color: "#e8e2d6", fontFamily: "var(--font-body,'Inter',system-ui,sans-serif)", padding: "clamp(20px,5vw,56px)" },
  wrap: { maxWidth: 760, margin: "0 auto", display: "flex", flexDirection: "column", gap: 20 },
  h1: { margin: 0, fontSize: "clamp(22px,3.5vw,30px)", fontWeight: 800 },
  h3: { margin: "0 0 10px", fontSize: 15, fontWeight: 700, color: "#cfd2d6" },
  sub: { margin: "6px 0 0", color: "#9aa0a6", fontSize: 14 },
  ar: { fontFamily: "var(--font-heading-ar),'Tajawal',sans-serif", color: "#9aa0a6" },
  muted: { color: "#8a909a", fontSize: 13, margin: 0, lineHeight: 1.6 },
  heroCard: { background: "linear-gradient(160deg,rgba(34,211,238,0.07),rgba(240,192,48,0.05))", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 20, padding: 26 },
  headline: { fontSize: 17, fontWeight: 600, color: "#fff", lineHeight: 1.5, margin: "0 0 18px" },
  deltaRow: { display: "flex", alignItems: "center", gap: 18, flexWrap: "wrap" },
  arrow: { fontSize: 28, color: "#8a909a" },
  deltaChip: { marginLeft: "auto", fontSize: 18, fontWeight: 800, color: "#f0c030", background: "rgba(240,192,48,0.12)", padding: "8px 16px", borderRadius: 12 },
  statline: { display: "flex", gap: 20, flexWrap: "wrap", marginTop: 18, paddingTop: 16, borderTop: "1px solid rgba(255,255,255,0.08)", fontSize: 13, color: "#aab0b6" },
  card: { background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: 22 },
  caveats: { margin: "10px 0 0", paddingLeft: 18, color: "#8a909a", fontSize: 12.5, lineHeight: 1.7 },
};
