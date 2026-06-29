"use client";
/* Cohort Dashboard (Gap 4 surface) — the fundable number, visualized.
 * Reads /api/efficacy and shows the pre→post MIST-20 delta, effect size,
 * CI, and the honest distrust-drift flag. Theme-aware, bilingual, like /passport. */
import { useEffect, useState } from "react";
import { useRTL } from "@/components/shared/rtl-provider";

interface Efficacy {
  n: number;
  headline: string;
  veracityDiscernment: { meanPre: number; meanPost: number; meanDelta: number; sdDelta: number; cohensDz: number | null; ci95: [number, number] | null } | null;
  fakeNewsAcceptMeanDelta: number | null;
  distrustDrift: { meanRealNewsBiasDelta: number | null; flagged: boolean; note: string };
  caveats: string[];
}

export default function CohortDashboard() {
  const { isRTL } = useRTL();
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
    <main style={S.page} dir={isRTL ? "rtl" : "ltr"}>
      <div style={S.wrap}>
        <header style={{ textAlign: isRTL ? "right" : "left" }}>
          <h1 style={S.h1}>{isRTL ? "الفعالية الجماعية" : "Cohort Efficacy"}</h1>
          <p style={S.sub}>{isRTL ? "هل تخلّي EAL الناس أصعب في الخداع — بشكل مقيس؟ الادعاء الوحيد اللي نقدر نستشهد بيه." : "Does EAL make people measurably harder to fool? The one citable claim."}</p>
        </header>

        {loading ? (
          <p style={S.muted}>{isRTL ? "جارٍ التحميل…" : "Loading…"}</p>
        ) : !has ? (
          <div style={S.card}>
            <p style={S.muted}>{isRTL ? `لسه مفيش بيانات MIST-20 قبلي/بعدي متطابقة (N=${eff?.n ?? 0}). المحرك شغّال — الرقم بيظهر لما المشاركين يكمّلوا الاختبار القبلي والبعدي.` : `No paired pre/post MIST-20 data yet (N=${eff?.n ?? 0}). The engine is live — the number appears as participants complete the pre and post test.`}</p>
          </div>
        ) : (
          <>
            <section style={S.heroCard}>
              <p style={S.headline}>{eff!.headline}</p>
              <div style={{ ...S.deltaRow, flexDirection: isRTL ? "row-reverse" : "row" }}>
                <Big label={isRTL ? "قبلي" : "Pre"} value={v!.meanPre} />
                <span style={S.arrow}>{isRTL ? "←" : "→"}</span>
                <Big label={isRTL ? "بعدي" : "Post"} value={v!.meanPost} accent />
                <div style={{ ...S.deltaChip, marginLeft: isRTL ? 0 : "auto", marginRight: isRTL ? "auto" : 0 }}>Δ {v!.meanDelta >= 0 ? "+" : ""}{v!.meanDelta} / 20</div>
              </div>
              <div style={S.statline}>
                <span>N = <b>{eff!.n}</b></span>
                <span>{isRTL ? "حجم الأثر" : "effect size"} dz = <b>{v!.cohensDz ?? "—"}</b></span>
                <span>{isRTL ? "فاصل ثقة 95%" : "95% CI"} = <b>{v!.ci95 ? `[${v!.ci95[0]}, ${v!.ci95[1]}]` : "—"}</b></span>
                <span>{isRTL ? "تغيّر السذاجة" : "gullibility"} Δ = <b style={{ color: (eff!.fakeNewsAcceptMeanDelta ?? 0) < 0 ? "var(--accent-emerald)" : "var(--accent-red)" }}>{eff!.fakeNewsAcceptMeanDelta ?? "—"}</b></span>
              </div>
            </section>

            <section style={{ ...S.card, borderColor: eff!.distrustDrift.flagged ? "var(--accent-red)" : "var(--accent-emerald)" }}>
              <h3 style={S.h3}>{isRTL ? "حارس الأمانة — انحراف الريبة" : "Honesty guard — distrust drift"}</h3>
              <p style={{ color: eff!.distrustDrift.flagged ? "var(--accent-red)" : "var(--accent-emerald)", fontSize: 14, margin: 0 }}>{eff!.distrustDrift.note}</p>
            </section>

            <section style={S.card}>
              <h3 style={S.h3}>{isRTL ? "اللي بيشوفه المموّلون" : "What funders see"}</h3>
              <p style={S.muted}>{isRTL ? "أداة قياس قبلي←بعدي منشورة وقابلة لإعادة الإنتاج — وهو الشيء اللي بيغيب عن أغلب أدوات التكنولوجيا المدنية. بنبلّغ عن الأثر داخل-المجموعة (dz، مش d بين المجموعات) وبنرفع علم انحراف الريبة بدل المبالغة. الأمانة هي أصل المصداقية." : "A deployed, reproducible pre→post instrument — the thing most civic-tech tools lack. We report the within-subjects effect (dz, not between-groups d) and flag distrust-drift rather than overclaim. Honesty is the credibility asset."}</p>
              <ul style={{ ...S.caveats, paddingLeft: isRTL ? 0 : 18, paddingRight: isRTL ? 18 : 0 }}>
                {eff!.caveats?.map((c, i) => <li key={i}>{c}</li>)}
              </ul>
            </section>
          </>
        )}
      </div>
    </main>
  );
}

function Big({ label, value, accent }: { label: string; value: number; accent?: boolean }) {
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: 44, fontWeight: 800, color: accent ? "var(--accent-deepreal)" : "var(--text-primary)", lineHeight: 1 }}>{value}</div>
      <div style={{ fontSize: 12, color: "var(--text-muted)" }}>{label}</div>
    </div>
  );
}

const S: Record<string, React.CSSProperties> = {
  page: { minHeight: "100vh", background: "var(--bg-page)", color: "var(--text-primary)", fontFamily: "var(--font-body,'Inter',system-ui,sans-serif)", padding: "clamp(20px,5vw,56px)" },
  wrap: { maxWidth: 760, margin: "0 auto", display: "flex", flexDirection: "column", gap: 20 },
  h1: { margin: 0, fontSize: "clamp(22px,3.5vw,30px)", fontWeight: 800 },
  h3: { margin: "0 0 10px", fontSize: 15, fontWeight: 700, color: "var(--text-secondary)" },
  sub: { margin: "6px 0 0", color: "var(--text-muted)", fontSize: 14 },
  muted: { color: "var(--text-muted)", fontSize: 13, margin: 0, lineHeight: 1.6 },
  heroCard: { background: "linear-gradient(160deg,var(--accent-mentalhealth-surface),var(--accent-deepreal-surface))", border: "1px solid var(--border-primary)", borderRadius: 20, padding: 26 },
  headline: { fontSize: 17, fontWeight: 600, color: "var(--text-primary)", lineHeight: 1.5, margin: "0 0 18px" },
  deltaRow: { display: "flex", alignItems: "center", gap: 18, flexWrap: "wrap" },
  arrow: { fontSize: 28, color: "var(--text-muted)" },
  deltaChip: { marginLeft: "auto", fontSize: 18, fontWeight: 800, color: "var(--accent-deepreal)", background: "var(--accent-deepreal-surface)", padding: "8px 16px", borderRadius: 12 },
  statline: { display: "flex", gap: 20, flexWrap: "wrap", marginTop: 18, paddingTop: 16, borderTop: "1px solid var(--border-subtle)", fontSize: 13, color: "var(--text-secondary)" },
  card: { background: "var(--bg-card)", border: "1px solid var(--border-primary)", borderRadius: 16, padding: 22 },
  caveats: { margin: "10px 0 0", paddingLeft: 18, color: "var(--text-muted)", fontSize: 12.5, lineHeight: 1.7 },
};
