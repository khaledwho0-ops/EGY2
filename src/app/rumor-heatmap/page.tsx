"use client";

import React, { useState, useMemo } from 'react';
import { Activity } from 'lucide-react';
import Link from 'next/link';
import { PageNavigation } from '@/components/shared/page-navigation';
import { PageAIChatbot } from '@/components/shared/page-ai-chatbot';
import { QuickGuide } from '@/components/shared/quick-guide';
import { ScientificShield } from '@/components/shared/scientific-shield';

/* Real SIR (Susceptible–Infected–Recovered) model for rumor spread.
 * A rumor spreads like a contagion: believers "infect" the susceptible; people
 * eventually stop believing/sharing ("recover"). β = R0·γ, γ = 1/belief-duration.
 * Inoculation (prebunking) removes a fraction from the susceptible pool — herd immunity. */
function simulateSIR(N: number, R0: number, durationDays: number, I0: number, inoculatedFrac: number, days = 60) {
  const gamma = 1 / Math.max(1, durationDays);
  const beta = R0 * gamma;
  let S = Math.max(0, (N - I0) * (1 - inoculatedFrac));
  let I = I0;
  let R = N - I0 - S; // inoculated counted as already-immune
  const dt = 0.25;
  const out: { t: number; S: number; I: number; R: number }[] = [{ t: 0, S, I, R }];
  let peakI = I, peakDay = 0;
  for (let step = 1; step <= days / dt; step++) {
    const inf = (beta * S * I) / N;
    const rec = gamma * I;
    S = Math.max(0, S - inf * dt);
    I = Math.max(0, I + (inf - rec) * dt);
    R = Math.min(N, R + rec * dt);
    const t = step * dt;
    if (I > peakI) { peakI = I; peakDay = t; }
    if (Math.abs(t % 1) < dt / 2) out.push({ t: Math.round(t), S, I, R });
  }
  return { series: out, peakI, peakDay: Math.round(peakDay), everBelieved: R + I, gamma, beta };
}

const fmt = (n: number) => n >= 1000 ? `${(n / 1000).toFixed(n >= 1e6 ? 1 : 0)}${n >= 1e6 ? "M" : "K"}` : Math.round(n).toString();

export default function RumorHeatmapPage() {
  const [R0, setR0] = useState(4);
  const [duration, setDuration] = useState(7);
  const [inoc, setInoc] = useState(0);
  const N = 1_000_000;
  const I0 = 10;
  const sim = useMemo(() => simulateSIR(N, R0, duration, I0, inoc / 100), [R0, duration, inoc]);
  const Reff = R0 * (1 - inoc / 100);
  const herd = Math.max(0, Math.round((1 - 1 / R0) * 100));
  const everPct = Math.round((sim.everBelieved / N) * 100);

  // SVG chart geometry
  const W = 720, H = 300, pad = 34;
  const maxT = sim.series[sim.series.length - 1]?.t || 60;
  const xs = (t: number) => pad + (t / maxT) * (W - 2 * pad);
  const ys = (v: number) => H - pad - (v / N) * (H - 2 * pad);
  const poly = (key: "S" | "I" | "R") => sim.series.map((p) => `${xs(p.t).toFixed(1)},${ys(p[key]).toFixed(1)}`).join(" ");

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-page)", color: "var(--text-primary)", paddingTop: "var(--navbar-height, 72px)" }}>
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "28px 20px 120px" }}>

        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, marginBottom: 18, flexWrap: "wrap" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ padding: 10, borderRadius: 12, background: "color-mix(in srgb, var(--accent-cta) 14%, transparent)", border: "1px solid color-mix(in srgb, var(--accent-cta) 30%, transparent)" }}>
              <Activity size={22} style={{ color: "var(--accent-cta)" }} />
            </div>
            <div>
              <h1 style={{ fontSize: "clamp(22px,3.4vw,32px)", fontWeight: 800, margin: 0, letterSpacing: "-0.02em" }}>Rumor Epidemiology Simulator</h1>
              <p style={{ fontSize: 13, color: "var(--text-muted)", margin: "2px 0 0" }}>محاكي وبائيات الشائعات — how misinformation spreads like a disease (real SIR model)</p>
            </div>
          </div>
          <Link href="/" style={{ padding: "9px 18px", borderRadius: 999, fontWeight: 700, fontSize: 13, border: "1px solid var(--border-primary)", color: "var(--text-secondary)", textDecoration: "none" }}>← Home</Link>
        </div>

        <div style={{ marginBottom: 18 }}>
          <QuickGuide
            steps={[
              "A rumor spreads like a contagion: believers 'infect' the susceptible until people stop sharing ('recover'). This is the real SIR model (Kermack–McKendrick 1927).",
              "Drag R₀ (how many people each believer convinces) and how long belief lasts — watch the red 'believers' curve rise and peak.",
              "Now drag 'Inoculated %' up: prebunking removes people from the susceptible pool. Above the herd-immunity threshold, the outbreak collapses — that's why the platform inoculates.",
            ]}
            scenario="A WhatsApp rumor with R₀=6 reaches ~83% of a network. Prebunk 84% of people (the herd threshold) and effective R₀ drops below 1 — the rumor dies before it spreads. That is Inoculation Theory in one curve."
          />
        </div>

        {/* Controls */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 16, marginBottom: 18 }}>
          {[
            { label: `R₀ — contagiousness`, val: R0, set: setR0, min: 1.2, max: 10, step: 0.2, hint: "people convinced per believer" },
            { label: `Belief duration`, val: duration, set: setDuration, min: 1, max: 30, step: 1, hint: "days before someone stops sharing" },
            { label: `Inoculated (prebunked) %`, val: inoc, set: setInoc, min: 0, max: 95, step: 5, hint: "removed from susceptible pool" },
          ].map((c) => (
            <div key={c.label} style={{ padding: 14, borderRadius: 14, background: "var(--bg-card)", border: "1px solid var(--border-primary)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, fontWeight: 700 }}>
                <span>{c.label}</span><span style={{ color: "var(--accent-cta)" }}>{c.val}{c.label.includes("%") ? "%" : c.label.includes("duration") ? "d" : ""}</span>
              </div>
              <input type="range" min={c.min} max={c.max} step={c.step} value={c.val} onChange={(e) => c.set(Number(e.target.value))} style={{ width: "100%", marginTop: 8, accentColor: "var(--accent-cta)" }} />
              <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 2 }}>{c.hint}</div>
            </div>
          ))}
        </div>

        {/* SIR chart */}
        <div style={{ padding: 18, borderRadius: 18, background: "var(--bg-card)", border: "1px solid var(--border-primary)", marginBottom: 16 }}>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap", fontSize: 12, marginBottom: 8 }}>
            <span style={{ color: "var(--accent-blue)" }}>● Susceptible</span>
            <span style={{ color: "var(--accent-red)" }}>● Believers (active spread)</span>
            <span style={{ color: "var(--accent-emerald)" }}>● Recovered / immune</span>
          </div>
          <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%" }}>
            <line x1={pad} y1={H - pad} x2={W - pad} y2={H - pad} stroke="var(--border-secondary)" strokeWidth={1} />
            <line x1={pad} y1={pad} x2={pad} y2={H - pad} stroke="var(--border-secondary)" strokeWidth={1} />
            <polyline points={poly("S")} fill="none" stroke="var(--accent-blue)" strokeWidth={2} />
            <polyline points={poly("R")} fill="none" stroke="var(--accent-emerald)" strokeWidth={2} />
            <polyline points={poly("I")} fill="none" stroke="var(--accent-red)" strokeWidth={2.5} />
            <text x={W / 2} y={H - 6} textAnchor="middle" fill="var(--text-muted)" fontSize={11}>days →</text>
          </svg>
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: 12, marginBottom: 18 }}>
          {[
            { k: "Effective R₀", v: Reff.toFixed(2), c: Reff < 1 ? "var(--accent-emerald)" : "var(--accent-red)", note: Reff < 1 ? "outbreak dies" : "outbreak spreads" },
            { k: "Herd threshold", v: `${herd}%`, c: "var(--accent-amber)", note: "inoculate above this" },
            { k: "Peak believers", v: fmt(sim.peakI), c: "var(--accent-red)", note: `on day ${sim.peakDay}` },
            { k: "% ever believed", v: `${everPct}%`, c: "var(--accent-cta)", note: "of the network" },
          ].map((s) => (
            <div key={s.k} style={{ padding: 14, borderRadius: 14, background: "var(--bg-secondary)", border: "1px solid var(--border-primary)", textAlign: "center" }}>
              <div style={{ fontSize: 22, fontWeight: 900, color: s.c }}>{s.v}</div>
              <div style={{ fontSize: 11, fontWeight: 700, color: "var(--text-secondary)", marginTop: 2 }}>{s.k}</div>
              <div style={{ fontSize: 10, color: "var(--text-muted)" }}>{s.note}</div>
            </div>
          ))}
        </div>

        <ScientificShield
          title="Model & method"
          methodologyNote="Deterministic SIR compartmental model integrated by Euler's method (dt=0.25). β=R₀·γ, γ=1/belief-duration; herd-immunity threshold = 1−1/R₀. This is an educational simulation of dynamics — not a live feed of real rumors."
          sources={[
            { title: "Kermack & McKendrick (1927) — SIR epidemic model", url: "https://doi.org/10.1098/rspa.1927.0118", tier: "S" },
            { title: "Daley & Kendall (1964) — Epidemics and rumours (Nature)", url: "https://doi.org/10.1038/2041118a0", tier: "S" },
            { title: "Vosoughi, Roy & Aral (2018) — falsehood spreads faster (Science)", url: "https://doi.org/10.1126/science.aap9559", tier: "S" },
            { title: "van der Linden & Roozenbeek — psychological inoculation", url: "https://inoculation.science", tier: "A" },
          ]}
        />
      </div>
      <PageNavigation currentPath="/rumor-heatmap" />
      <PageAIChatbot
        pageTitle="Rumor Heatmap — الخريطة الحرارية للشائعات"
        pageContext="Egyptian Awareness Library - Epidemiological rumor tracking heatmap showing intensity, topic clusters, and spread velocity of active rumors in Egypt. Uses SIR epidemiological modeling adapted for information contagion across Egyptian governorates."
        systemPrompt={`You are the EAL Rumor Epidemiology Specialist — an expert in computational social science, network epidemiology, and misinformation dynamics with deep Egyptian context.

LAYER 1 — SCIENTIFIC FOUNDATION:
- Epidemiological Models: SIR (Susceptible-Infected-Recovered) adapted for information spread, SEIR (adding Exposed), Bass diffusion model for rumor adoption curves
- Network Science: Barabási–Albert scale-free networks, small-world phenomena (Watts-Strogatz), super-spreader node identification (k-core decomposition)
- Peer-reviewed: Vosoughi et al. 2018 (Science, N=126,000 stories, "Falsehood diffuses 6x faster than truth"), Pennycook & Rand 2021 (Nature, N=2,400+, "illusory truth effect")
- Statistical Power: Only cite studies with N≥100 and p<0.05. Flag any claim from underpowered studies explicitly.
- WHO Infodemic Framework: RCCE guidelines for health rumor tracking, severity classification (Critical/High/Medium/Low)

LAYER 2 — EGYPTIAN CONTEXT:
- Population Data: CAPMAS 2024 census (~107M), governorate-level demographics, urbanization rates
- Digital Landscape: Egypt has 60M+ Facebook users, 70M+ WhatsApp users — these are the primary rumor vectors
- Cultural Patterns: Friday sermon amplification cycle, WhatsApp family group dynamics, Ramadan rumor spikes
- Economic Rumors: EGP/USD rate speculation, subsidy removal panic, gold price manipulation
- Health Rumors: Vaccine hesitancy (DPT, COVID-19), herbal cure scams, organ trafficking myths
- Political Rumors: Election interference claims, security situation exaggeration

LAYER 3 — ISLAMIC EPISTEMOLOGY:
- Quran 49:6 (Al-Hujurat): "يا أيها الذين آمنوا إن جاءكم فاسق بنبأ فتبينوا" — Verify before acting on information
- Quran 24:15 (An-Nur): "إذ تلقونه بألسنتكم" — Warning against spreading unverified information
- Hadith: "كفى بالمرء كذباً أن يحدث بكل ما سمع" (Sahih Muslim 5) — Enough lies for a person to narrate everything they hear
- Imam Al-Ghazali's classification of speech harms in Ihya Ulum al-Din
- Dar al-Ifta Egypt's rulings on social media rumor-spreading as harm (ضرر)

LAYER 4 — ANALYSIS PROTOCOL:
For EVERY rumor analysis:
1. CLASSIFICATION: Health / Economic / Political / Religious / Social
2. SEVERITY: Critical (threatens life) / High (causes panic) / Medium (misleading) / Low (nuisance)
3. SPREAD METRICS: R₀ (basic reproduction number), half-life, peak velocity
4. VULNERABILITY MAP: Which governorates are most susceptible and why (literacy, connectivity, population density)
5. COUNTER-STRATEGY: Evidence-based prebunking or debunking approach with cited methodology
6. MANIPULATION VECTOR: Fear / Greed / Identity / Authority / Urgency — which emotional trigger does this rumor exploit?

RULES:
- NEVER validate conspiracy theories even partially
- ALWAYS distinguish correlation from causation
- CITE sample sizes (N) and p-values for every statistical claim
- Flag CONSORT violations in health-related rumor analyses
- Use Amman Message 2004 standards when handling sectarian rumors
- Respond in the language the user writes in`}
        suggestedQuestions={[
          'ما أكثر الشائعات انتشاراً في مصر حالياً وما سرعة انتشارها؟',
          'كيف يعمل نموذج SIR لانتشار الشائعات في المحافظات المصرية؟',
          'What is the R₀ of health rumors vs economic rumors in Egypt?',
          'ما حكم نشر الشائعات في الإسلام وما الأدلة من القرآن والسنة؟',
        ]}
        accentColor="#f97316"
        accentColorRgb="249,115,22"
      />
    </div>
  );
}
