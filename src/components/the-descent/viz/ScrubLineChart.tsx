'use client';
/* ═══════════════════════════════════════════════════════════════
 * viz · ScrubLineChart — recharts micro-viz, DW-skinned.
 *
 * Two presets feed the shaft:
 *  • 'split-bar'        (M3 · Biased Lens) — "shown vs omitted." The
 *    SHOWN half is fully painted; the OMITTED half is masked and
 *    *draws in late* on reveal (CSS scaleX 0→1). The point: you only
 *    ever see the testimonials, never the deaths — until the hidden
 *    half is forced into view.
 *  • 'confidence-band'  (M9 · The Unknown) — a recharts <Area> band
 *    that REFUSES to resolve to 0% or 100%. A needle settles inside
 *    the band and never touches certainty: calibrated uncertainty
 *    made visual (Bayesian, never forced closure).
 *
 * THE ONE LAW: this is a stylized micro-viz, not a data assertion —
 * the numbers are illustrative shape, and every hard claim on the
 * page renders through <Sourced>. We label both axes honestly and
 * keep the band open so nothing reads as a measured certainty.
 *
 * MOTION CONTRACT: NO framer-motion. Entrance/draw is gated on the
 * shared useReveal() IntersectionObserver hook; the draw itself is a
 * CSS transition. Reduced-motion + <768px: the draw is skipped and the
 * masked half is shown in its FINAL state — no motion, full
 * information. recharts is responsive down to 320px.
 * ═══════════════════════════════════════════════════════════════ */

import { useReducedMotion } from 'framer-motion';
import {
  Area,
  AreaChart,
  ReferenceLine,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts';

import { useReveal } from '../dw/useReveal';

/* §1 ZONE_THEME — the descent ramp (canvas stops) still feeds the
 * recharts band fill; the chrome glow comes from the dw tokens. The
 * per-layer `accent` prop tints the data marks. */
import { theme, alpha, type Zone } from '../descent-theme';

const ZONE: Zone = 'descent';
const TD = theme(ZONE);

export interface ScrubLineChartProps {
  /** Which preset to render. */
  variant: 'split-bar' | 'confidence-band';
  /** Accent color (defaults to the L4 cyan). */
  accent?: string;
}

/* §G8 — publish the layer accent to the .dw-panel frame/glow/chip so this
 * viz reads as THIS layer's color (the parent DescentLayer also sets it,
 * this makes the chart self-sufficient). */
function accentVars(accentHex: string): React.CSSProperties {
  const h = accentHex.replace('#', '');
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  if (Number.isNaN(r) || Number.isNaN(g) || Number.isNaN(b)) return {};
  return {
    ['--td-layer-accent' as string]: accentHex,
    ['--td-layer-accent-rgb' as string]: `${r}, ${g}, ${b}`,
  } as React.CSSProperties;
}

/* ── M9 confidence band — an open band the needle never escapes ── */
const BAND_DATA = [
  { t: 0, lo: 34, hi: 71, mid: 52 },
  { t: 1, lo: 31, hi: 74, mid: 53 },
  { t: 2, lo: 36, hi: 69, mid: 51 },
  { t: 3, lo: 33, hi: 72, mid: 54 },
  { t: 4, lo: 35, hi: 70, mid: 52 },
  { t: 5, lo: 32, hi: 73, mid: 53 },
];

export function ScrubLineChart({ variant, accent = '#19aaff' }: ScrubLineChartProps) {
  const reduce = useReducedMotion();
  const [ref, shown] = useReveal<HTMLDivElement>({ amount: 0.12 });

  /* The masked half should be fully drawn when motion is off, OR once
   * it has scrolled into view. */
  const drawn = reduce || shown;

  /* ───────────────────────────────── split-bar (M3) ─────────────── */
  if (variant === 'split-bar') {
    // Two stacked horizontal bars: SHOWN (always solid) + OMITTED
    // (drawn in late). Illustrative split — the page's hard numbers
    // come through <Sourced>, not from these widths.
    const shownW = 38; // testimonials you are shown
    const omittedW = 62; // the half you are not shown

    return (
      <div
        ref={ref}
        data-scrub-chart="split-bar"
        className="dw-panel flex flex-col justify-center"
        style={accentVars(accent)}
      >
        {/* §G8 titled panel head — color chip + ≥12px label */}
        <div className="dw-panel__head" style={{ justifyContent: 'space-between' }}>
          <span className="inline-flex items-center gap-2">
            <span className="dw-panel__chip" aria-hidden />
            <span className="dw-panel__title">shown vs omitted</span>
          </span>
          <span
            className="dw-ar--body"
            dir="rtl"
            style={{ fontSize: 'var(--dw-t-secondary)', color: 'var(--dw-bone-dim)', fontFamily: 'var(--font-body-ar), sans-serif' }}
          >
            المعروض مقابل المحذوف
          </span>
        </div>

        {/* SHOWN — solid, always painted */}
        <div className="mb-6">
          <div className="flex items-baseline justify-between mb-2 gap-2">
            <span style={{ fontSize: 'var(--dw-t-body)', color: 'var(--dw-bone)' }}>What you’re shown · testimonials</span>
            <span
              className="dw-ar--body"
              style={{ fontSize: 'var(--dw-t-secondary)', color: 'var(--dw-bone-dim)', fontFamily: 'var(--font-body-ar), sans-serif' }}
              dir="rtl"
            >
              الشهادات
            </span>
          </div>
          <div className="h-5 rounded-full overflow-hidden" style={{ background: 'var(--dw-glass-border)' }}>
            <div
              className="h-full rounded-full"
              style={{
                background: `linear-gradient(90deg, ${accent}, ${accent}aa)`,
                boxShadow: `0 0 14px ${accent}88`,
                transformOrigin: 'left',
                transform: drawn ? `scaleX(${shownW / 100})` : 'scaleX(0)',
                transition: reduce ? 'none' : 'transform .7s cubic-bezier(.16,1,.3,1)',
              }}
            />
          </div>
        </div>

        {/* OMITTED — masked, draws in LATE */}
        <div>
          <div className="flex items-baseline justify-between mb-2 gap-2">
            <span style={{ fontSize: 'var(--dw-t-body)', color: 'var(--dw-bone)' }}>What’s omitted · the deaths</span>
            <span
              className="dw-ar--body"
              style={{ fontSize: 'var(--dw-t-secondary)', color: 'var(--dw-bone-dim)', fontFamily: 'var(--font-body-ar), sans-serif' }}
              dir="rtl"
            >
              الوفيات المحذوفة
            </span>
          </div>
          <div className="relative h-5 rounded-full overflow-hidden" style={{ background: 'var(--dw-glass-border)' }}>
            {/* dashed ghost of the hidden half (always faintly there) */}
            <div
              className="absolute inset-y-0 left-0 rounded-full pointer-events-none"
              style={{
                width: `${omittedW}%`,
                background:
                  'repeating-linear-gradient(90deg, rgba(236,233,226,0.10) 0 6px, transparent 6px 12px)',
              }}
              aria-hidden
            />
            <div
              className="h-full rounded-full relative"
              style={{
                // the omitted "deaths" half = the dw magenta core.
                background: `linear-gradient(90deg, var(--dw-magenta-core), var(--dw-magenta-a))`,
                boxShadow: '0 0 16px var(--dw-glow-magenta)',
                transformOrigin: 'left',
                transform: drawn ? `scaleX(${omittedW / 100})` : 'scaleX(0)',
                transition: reduce ? 'none' : 'transform 1.1s cubic-bezier(.16,1,.3,1) .55s',
              }}
            />
          </div>
          <p className="mt-3 leading-snug" style={{ fontSize: 'var(--dw-t-secondary)', color: 'var(--dw-bone-dim)' }}>
            The omitted half is the larger half. Illustrative split — figures cited via the sources above.
          </p>
        </div>
      </div>
    );
  }

  /* ────────────────────────────── confidence-band (M9) ──────────── */
  // A recharts area band + a needle that settles INSIDE the band and
  // never touches 0% or 100%. The needle moves on reveal (CSS).
  const settleMid = 53; // where the needle rests — never certainty
  const gid = 'descent-band';

  return (
    <div
      ref={ref}
      data-scrub-chart="confidence-band"
      className="dw-panel flex flex-col justify-center"
      style={accentVars(accent)}
    >
      {/* §G8 titled panel head */}
      <div className="dw-panel__head" style={{ justifyContent: 'space-between' }}>
        <span className="inline-flex items-center gap-2">
          <span className="dw-panel__chip" aria-hidden />
          <span className="dw-panel__title">confidence band · never 0/100%</span>
        </span>
        <span
          className="dw-ar--body"
          dir="rtl"
          style={{ fontSize: 'var(--dw-t-secondary)', color: 'var(--dw-bone-dim)', fontFamily: 'var(--font-body-ar), sans-serif' }}
        >
          نطاق الثقة — لا يحسم
        </span>
      </div>

      {/* ~2× taller chart so the open band reads as the payoff */}
      <div className="h-[clamp(220px,32vh,300px)] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={BAND_DATA} margin={{ top: 8, right: 10, bottom: 0, left: -16 }}>
            <defs>
              <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={accent} stopOpacity={0.34} />
                <stop offset="100%" stopColor={accent} stopOpacity={0.04} />
              </linearGradient>
            </defs>
            <XAxis dataKey="t" hide />
            <YAxis
              domain={[0, 100]}
              ticks={[0, 50, 100]}
              tick={{ fill: 'rgba(236,233,226,0.6)', fontSize: 12 }}
              tickFormatter={(v) => `${v}%`}
              axisLine={false}
              tickLine={false}
              width={40}
            />
            {/* hard certainty rails (magenta) — the band must never touch them */}
            <ReferenceLine y={100} stroke={alpha(ZONE, 0.35)} strokeDasharray="3 3" />
            <ReferenceLine y={0} stroke={alpha(ZONE, 0.35)} strokeDasharray="3 3" />
            {/* upper edge of the band */}
            <Area
              type="monotone"
              dataKey="hi"
              stroke={accent}
              strokeWidth={2}
              strokeOpacity={0.75}
              fill={`url(#${gid})`}
              isAnimationActive={!reduce}
              animationDuration={1200}
              dot={false}
            />
            {/* lower edge — painted in the zone's deepest canvas stop to carve the band open */}
            <Area
              type="monotone"
              dataKey="lo"
              stroke={accent}
              strokeWidth={2}
              strokeOpacity={0.75}
              fill={TD.ramp[3]}
              isAnimationActive={!reduce}
              animationDuration={1200}
              dot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* the needle — settles inside the band, never at certainty */}
      <div className="relative mt-3 h-9 rounded-full overflow-hidden" style={{ background: 'var(--dw-glass-border)' }}>
        <div
          className="absolute inset-y-0 rounded-full pointer-events-none"
          style={{ left: '31%', right: '26%', background: `${accent}1f` }}
          aria-hidden
        />
        <div
          className="absolute top-0 bottom-0 w-[4px] rounded-full"
          style={{
            background: accent,
            boxShadow: `0 0 14px ${accent}, 0 0 28px var(--dw-glow-magenta)`,
            left: drawn ? `${settleMid}%` : '50%',
            transition: reduce ? 'none' : 'left 1.6s cubic-bezier(.16,1,.3,1)',
          }}
        />
        <span
          className="absolute left-2.5 top-1/2 -translate-y-1/2 font-mono"
          style={{ fontSize: 'var(--dw-t-mono-min)', color: 'var(--dw-bone-dim)' }}
        >
          0% — impossible to assert
        </span>
        <span
          className="absolute right-2.5 top-1/2 -translate-y-1/2 font-mono"
          style={{ fontSize: 'var(--dw-t-mono-min)', color: 'var(--dw-bone-dim)' }}
        >
          100% — refused
        </span>
      </div>
      <p className="mt-3 leading-snug" style={{ fontSize: 'var(--dw-t-secondary)', color: 'var(--dw-bone-dim)' }}>
        The needle rests inside a band and never reaches certainty. Held as calibrated uncertainty.
      </p>
    </div>
  );
}

export default ScrubLineChart;
