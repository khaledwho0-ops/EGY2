"use client";
/* ═══════════════════════════════════════════════════════════════
 * INOCULATION PASSPORT — the user-facing surface for the keystones.
 * Bootstraps a Cognitive Passport, then shows the Defense Ledger's
 * Cognitive Immunity Score, the immunity meters, the 8-layer coverage,
 * and the cohort efficacy headline. Reads the verified APIs:
 *   /api/auth/passport · /api/ledger · /api/efficacy
 * ═══════════════════════════════════════════════════════════════ */
import { useEffect, useState } from "react";

interface Meters {
  total: number;
  caught: number;
  missed: number;
  reviewed: number;
  accuracy: number | null;
  byLayer: Record<number, number>;
  layerCoverage: number;
  currentStreak: number;
  cognitiveImmunityScore: number;
}
interface Efficacy {
  n: number;
  headline: string;
  veracityDiscernment: { meanPre: number; meanPost: number; meanDelta: number; cohensDz: number | null } | null;
  distrustDrift: { flagged: boolean; note: string };
}

const LAYERS = [
  { n: 1, en: "Fabrication", ar: "التلفيق" },
  { n: 2, en: "Biased Lens", ar: "العدسة المنحازة" },
  { n: 3, en: "Decontext", ar: "نزع السياق" },
  { n: 4, en: "Timing", ar: "التوقيت" },
  { n: 5, en: "The Kill", ar: "القتل" },
  { n: 6, en: "The Matrix", ar: "المصفوفة" },
  { n: 7, en: "Architects", ar: "المهندسون" },
  { n: 8, en: "The Unknown", ar: "المجهول" },
];

export default function PassportPage() {
  const [userId, setUserId] = useState<string | null>(null);
  const [recoveryKey, setRecoveryKey] = useState<string | null>(null);
  const [meters, setMeters] = useState<Meters | null>(null);
  const [efficacy, setEfficacy] = useState<Efficacy | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        let me = await fetch("/api/auth/passport").then((r) => r.json());
        if (!me?.authenticated) {
          const created = await fetch("/api/auth/passport", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: "{}",
          }).then((r) => r.json());
          me = { userId: created.userId };
          setRecoveryKey(created.recoveryKey ?? null);
        }
        setUserId(me.userId ?? null);
        const [led, eff] = await Promise.all([
          fetch("/api/ledger").then((r) => r.json()).catch(() => null),
          fetch("/api/efficacy").then((r) => r.json()).catch(() => null),
        ]);
        setMeters(led?.meters ?? null);
        setEfficacy(eff ?? null);
      } catch {
        /* ignore — render the empty state */
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const cis = meters?.cognitiveImmunityScore ?? 0;
  const ringPct = Math.max(0, Math.min(100, cis));
  const circumference = 2 * Math.PI * 86;

  return (
    <main style={S.page}>
      <div style={S.wrap}>
        <header style={S.header}>
          <div>
            <h1 style={S.h1}>
              Inoculation Passport <span style={S.ar}>· جواز المناعة المعرفية</span>
            </h1>
            <p style={S.sub}>
              Your measured cognitive immunity — not asserted, recorded.{" "}
              <span style={S.ar}>مناعتك المقيسة — لا مُدّعاة، بل مُسجّلة.</span>
            </p>
          </div>
          {userId && <code style={S.uid}>passport · {userId.slice(0, 8)}…</code>}
        </header>

        {loading ? (
          <p style={S.muted}>Loading your passport… · جارٍ التحميل…</p>
        ) : (
          <>
            {recoveryKey && (
              <div style={S.recovery}>
                <strong style={{ color: "#f0c030" }}>⚠ Save your recovery key — shown once.</strong>{" "}
                <span style={S.ar}>احفظ مفتاح الاستعادة — يظهر مرة واحدة.</span>
                <div style={S.recoveryKey}>{recoveryKey}</div>
                <span style={S.muted}>It restores this passport on another device. No email, no password — privacy by design.</span>
              </div>
            )}

            {/* CIS hero */}
            <section style={S.hero}>
              <div style={{ position: "relative", width: 200, height: 200, flexShrink: 0 }}>
                <svg width="200" height="200" viewBox="0 0 200 200">
                  <circle cx="100" cy="100" r="86" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="12" />
                  <circle
                    cx="100" cy="100" r="86" fill="none" stroke="url(#cisGrad)" strokeWidth="12" strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={circumference * (1 - ringPct / 100)}
                    transform="rotate(-90 100 100)"
                    style={{ transition: "stroke-dashoffset 1s cubic-bezier(.16,1,.3,1)" }}
                  />
                  <defs>
                    <linearGradient id="cisGrad" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#22d3ee" />
                      <stop offset="100%" stopColor="#f0c030" />
                    </linearGradient>
                  </defs>
                </svg>
                <div style={S.cisCenter}>
                  <div style={S.cisNum}>{cis}</div>
                  <div style={S.cisLabel}>/ 100</div>
                </div>
              </div>
              <div>
                <h2 style={S.h2}>Cognitive Immunity Score</h2>
                <p style={S.ar} dir="rtl">درجة المناعة المعرفية</p>
                <p style={S.heroNote}>
                  A composite of your accuracy, the breadth of layers you've practiced, your volume of defenses,
                  and your streak. It grows only when you actually defend.
                </p>
              </div>
            </section>

            {/* meters */}
            <section style={S.grid}>
              <Stat label="Defenses logged" ar="دفاعات مُسجّلة" value={meters?.total ?? 0} />
              <Stat label="Accuracy" ar="الدقة" value={meters?.accuracy != null ? `${Math.round(meters.accuracy * 100)}%` : "—"} />
              <Stat label="Day streak" ar="سلسلة الأيام" value={meters?.currentStreak ?? 0} />
              <Stat label="Layers practiced" ar="طبقات مُتدرَّبة" value={`${Object.keys(meters?.byLayer ?? {}).length} / 8`} />
            </section>

            {/* 8-layer coverage */}
            <section style={S.card}>
              <h3 style={S.h3}>The 8 layers of deception — your coverage <span style={S.ar}>· تغطيتك للطبقات الثماني</span></h3>
              <div style={S.layers}>
                {LAYERS.map((L) => {
                  const count = meters?.byLayer?.[L.n] ?? 0;
                  const active = count > 0;
                  return (
                    <div key={L.n} style={{ ...S.layer, ...(active ? S.layerActive : {}) }} title={`${count} defense(s)`}>
                      <span style={S.layerNum}>{L.n}</span>
                      <span style={S.layerName}>{L.en}</span>
                      <span style={{ ...S.ar, fontSize: 11 }}>{L.ar}</span>
                      {active && <span style={S.layerCount}>{count}</span>}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* efficacy */}
            <section style={S.card}>
              <h3 style={S.h3}>Does it work? — the cohort proof <span style={S.ar}>· هل ينجح؟ الدليل الجماعي</span></h3>
              {efficacy && efficacy.n > 0 ? (
                <>
                  <p style={S.efficacyHeadline}>{efficacy.headline}</p>
                  {efficacy.distrustDrift?.flagged && (
                    <p style={{ color: "#ff7a7a", fontSize: 13 }}>{efficacy.distrustDrift.note}</p>
                  )}
                  <p style={S.muted}>
                    Pre→post MIST-20 across {efficacy.n} participant(s). We report the honest within-subjects effect
                    and flag distrust-drift rather than overclaim.
                  </p>
                </>
              ) : (
                <p style={S.muted}>No paired pre/post assessments yet — take the MIST-20 to start your delta.</p>
              )}
            </section>
          </>
        )}
      </div>
    </main>
  );
}

function Stat({ label, ar, value }: { label: string; ar: string; value: string | number }) {
  return (
    <div style={S.statCard}>
      <div style={S.statValue}>{value}</div>
      <div style={S.statLabel}>{label}</div>
      <div style={{ ...S.ar, fontSize: 11 }} dir="rtl">{ar}</div>
    </div>
  );
}

const S: Record<string, React.CSSProperties> = {
  page: { minHeight: "100vh", background: "#07070b", color: "#e8e2d6", fontFamily: "var(--font-body,'Inter',system-ui,sans-serif)", padding: "clamp(20px,5vw,56px)" },
  wrap: { maxWidth: 880, margin: "0 auto", display: "flex", flexDirection: "column", gap: 22 },
  header: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16, flexWrap: "wrap" },
  h1: { margin: 0, fontSize: "clamp(22px,3.5vw,32px)", fontWeight: 800 },
  h2: { margin: "0 0 2px", fontSize: 22, fontWeight: 800 },
  h3: { margin: "0 0 14px", fontSize: 16, fontWeight: 700, color: "#cfd2d6" },
  sub: { margin: "6px 0 0", color: "#9aa0a6", fontSize: 14 },
  ar: { fontFamily: "var(--font-heading-ar),'Tajawal',sans-serif", color: "#9aa0a6" },
  uid: { fontFamily: "var(--font-mono,'Space Mono',monospace)", fontSize: 12, color: "#7a808a", background: "rgba(255,255,255,0.04)", padding: "6px 10px", borderRadius: 8 },
  muted: { color: "#8a909a", fontSize: 13, margin: "8px 0 0" },
  recovery: { border: "1px solid rgba(240,192,48,0.35)", background: "rgba(240,192,48,0.06)", borderRadius: 14, padding: 16 },
  recoveryKey: { fontFamily: "var(--font-mono,'Space Mono',monospace)", fontSize: 18, letterSpacing: 1, color: "#f0c030", margin: "10px 0", userSelect: "all" },
  hero: { display: "flex", gap: 28, alignItems: "center", flexWrap: "wrap", background: "linear-gradient(160deg,rgba(34,211,238,0.06),rgba(240,192,48,0.04))", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, padding: 24 },
  cisCenter: { position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" },
  cisNum: { fontSize: 56, fontWeight: 800, lineHeight: 1, color: "#fff" },
  cisLabel: { fontSize: 13, color: "#8a909a" },
  heroNote: { color: "#aab0b6", fontSize: 14, maxWidth: 420, marginTop: 10, lineHeight: 1.5 },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: 14 },
  statCard: { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: "16px 18px" },
  statValue: { fontSize: 30, fontWeight: 800, color: "#fff" },
  statLabel: { fontSize: 13, color: "#aab0b6", marginTop: 2 },
  card: { background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: 22 },
  layers: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(96px,1fr))", gap: 10 },
  layer: { position: "relative", borderRadius: 12, padding: "12px 10px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", display: "flex", flexDirection: "column", gap: 3, opacity: 0.55 },
  layerActive: { opacity: 1, borderColor: "rgba(34,211,238,0.5)", background: "rgba(34,211,238,0.08)" },
  layerNum: { fontFamily: "var(--font-mono,'Space Mono',monospace)", fontSize: 12, color: "#22d3ee", fontWeight: 700 },
  layerName: { fontSize: 13, fontWeight: 600, color: "#e8e2d6" },
  layerCount: { position: "absolute", top: 8, right: 10, fontSize: 12, fontWeight: 700, color: "#f0c030" },
  efficacyHeadline: { fontSize: 16, fontWeight: 600, color: "#fff", lineHeight: 1.5, margin: 0 },
};
