'use client';
/* ═══════════════════════════════════════════════════════════════
 * DescentLayer.tsx — M2–M9 · THE EIGHT-LAYER SHAFT (data-driven).
 *
 * One <DescentLayer n={k}/> per rung of the fall. Re-skinned to the
 * DESIGN WAVE (dw) system: giant ghost layer numeral, dw-glass case
 * card, magenta/violet glow, the M6 flatline. Fully driven by
 * descent-data (DESCENT_CASES, LAYER_DEFENSE_MAP, DESCENT_LAYER_COLORS).
 *
 * Each rung renders, in order:
 *   • giant ghost layer numeral −{n}            (dw ghost-stroke text)
 *   • <LayerTag>  L{n} · AR+EN layer name       (deception named)
 *   • the second-person "you" beat (EN+AR)       (atoms #5,#6 wording)
 *   • one real Egyptian case → dw-glass CaseCard + ESC modal (#14,#41)
 *   • one scrubbed micro-viz keyed to the layer  (atoms #49,#50)
 *   • a per-layer accent stroke (CSS draw, useReveal-gated)
 *   • a local depth-gauge tie-in (−{n}/−8) mirroring the rail
 *   • bg darkens one notch toward the layer's arterial bg
 *
 * THE FLATLINE lives on M6 (L5 · Evil Application): an ECG/insulin
 * line draws across the rung and FLATLINES on the death sentence;
 * the rung's bg snaps to arterial #2A0608 and a 53.9% counter holds.
 *
 * THE ONE LAW: every claim renders through <Sourced>; the case's
 * source/tier comes straight from descent-data — nothing hardcoded.
 *
 * MOTION CONTRACT (per the DW foundation): NO gsap / ScrollTrigger /
 * DrawSVG, NO R3F, NO Lenis, NO framer `whileInView` / `useInView`.
 * Every entrance reveal is driven by the shared useReveal() hook (a
 * bulletproof IntersectionObserver that latches `.is-in`). CSS-keyframe
 * draws + transitions gated on the reveal boolean.
 *
 * Reduced-motion + <768px: draws/ECG/counter render their FINAL state,
 * no scrub — full information, no motion. Arabic: dir="rtl" +
 * var(--font-heading-ar); never SplitText on scripture (L3 = clip-path
 * wipe). Arabic-Indic digits via Intl.NumberFormat('ar-EG').
 * ═══════════════════════════════════════════════════════════════ */

import { useEffect, useId, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

type Lang = 'en' | 'ar';

import {
  DESCENT_CASES,
  DESCENT_LAYER_COLORS,
  LAYER_DEFENSE_MAP,
  STATS,
  type DescentCase,
  type DescentColor,
} from './descent-data';
import { Sourced } from './shared/Sourced';
import { ScrubLineChart } from './viz/ScrubLineChart';
import { FlowMap } from './viz/FlowMap';
import { useReveal } from './dw/useReveal';
/* §G6 — the 8 FIXED per-layer accents (supersedes DESCENT_LAYER_COLORS for
 * chrome). The SAME hex paints this layer's numeral, card border, tag, rail
 * tick, viz marks + the .dw-panel frame (via the --td-layer-* CSS vars). */
import { layerAccent, layerCssVars } from './descent-theme';

/* §1 ZONE_THEME tokens (single source of accents) + the R3F-free type
 * primitives. M2–M9 live in the DESCENT zone; the DW skin paints the
 * chrome in magenta/violet via the dw-* classes, while the per-layer
 * accent (DESCENT_LAYER_COLORS) still tints each rung's data marks. */
import { DuotoneFrame, dropGlow, type Zone } from './visual';

const ZONE: Zone = 'descent';

export interface DescentLayerProps {
  /** Layer number 1–8. */
  n: number;
}

/* ── Arabic-Indic digit formatter (ar-EG) ────────────────────── */
const arDigits = (v: number, opts?: Intl.NumberFormatOptions) =>
  new Intl.NumberFormat('ar-EG', opts).format(v);

/* §G6 — a per-layer-accent deception tag (L{n} · EN + AR name). Built
 * locally so the pill border / text / AR all carry THIS layer's fixed
 * LAYER_ACCENTS color (the shared <LayerTag> reads the old palette).
 * Bilingual-equal: EN + AR at the same weight (§G3). */
function AccentLayerTag({ n, small = false }: { n: number; small?: boolean }) {
  const acc = layerAccent(n).hex;
  const entry = LAYER_DEFENSE_MAP.find((l) => l.n === n);
  if (!entry) return null;
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border ${small ? 'px-2.5 py-1' : 'px-3.5 py-1.5'}`}
      style={{
        borderColor: `${acc}66`,
        background: `${acc}1a`,
        color: acc,
        boxShadow: `0 0 22px -8px ${acc}`,
      }}
      data-layer-tag={n}
    >
      <span
        className={`font-bold tabular-nums ${small ? 'text-[13px]' : 'text-[15px]'}`}
        style={{ fontFamily: "'Clash Display', var(--font-heading-en), sans-serif" }}
      >
        L{n}
      </span>
      <span className={`uppercase tracking-wider font-mono ${small ? 'text-[11px]' : 'text-[12px]'}`}>
        {entry.layer.en}
      </span>
      <span
        className={`${small ? 'text-[12px]' : 'text-[14px]'} dw-ar`}
        dir="rtl"
        style={{ fontFamily: 'var(--font-heading-ar), sans-serif', color: acc }}
      >
        {entry.layer.ar}
      </span>
    </span>
  );
}

/* §G8 — write the layer accent onto a .dw-panel so its frame/glow/chip and
 * the ≥11px text-floor all key off THIS layer's color (belt-and-braces with
 * the section-level vars). */
function panelVars(accentHex: string): React.CSSProperties {
  // derive an "r, g, b" triplet from the #rrggbb accent for rgba() panels.
  const h = accentHex.replace('#', '');
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return {
    ['--td-layer-accent' as string]: accentHex,
    ['--td-layer-accent-rgb' as string]: `${r}, ${g}, ${b}`,
  } as React.CSSProperties;
}

/* §G8 — a panel title row (mono label + the layer's color chip). Used at
 * the head of every right-side .dw-panel so the diagram reads as a titled,
 * legible hero rather than a tooltip. */
function PanelHead({ en, ar }: { en: string; ar: string }) {
  return (
    <div className="dw-panel__head" style={{ justifyContent: 'space-between' }}>
      <span className="inline-flex items-center gap-2">
        <span className="dw-panel__chip" aria-hidden />
        <span className="dw-panel__title">{en}</span>
      </span>
      <span
        className="dw-ar"
        dir="rtl"
        style={{
          fontSize: 'var(--dw-t-secondary)',
          color: 'var(--dw-bone-dim)',
          fontFamily: 'var(--font-heading-ar), sans-serif',
        }}
      >
        {ar}
      </span>
    </div>
  );
}

/* ── A small reveal-triggered count-up (useReveal, not framer) ── */
function CountUp({
  target,
  accent,
  decimals = 0,
  duration = 1800,
}: {
  target: number;
  accent: string;
  decimals?: number;
  duration?: number;
}) {
  const reduce = useReducedMotion();
  const [ref, shown] = useReveal<HTMLSpanElement>({ amount: 0.2 });
  const [value, setValue] = useState(reduce ? target : 0);
  const started = useRef(false);

  useEffect(() => {
    if (reduce) {
      setValue(target);
      return;
    }
    if (!shown || started.current) return;
    started.current = true;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(target * eased);
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [shown, target, duration, reduce]);

  const fixed = decimals > 0 ? Number(value.toFixed(decimals)) : Math.round(value);
  return (
    <span
      ref={ref}
      className="tabular-nums font-bold"
      style={{
        color: accent,
        fontFamily: "'Clash Display', var(--font-heading-en), sans-serif",
        textShadow: `0 0 18px ${accent}55`,
      }}
    >
      {fixed.toLocaleString('en-US', { maximumFractionDigits: decimals })}
    </span>
  );
}

/* ═══════════════════════════════════════════════════════════════
 * CaseCard + ESC modal — dw-glass skin, descent-data fed.
 * Bilingual via the section-level EN⇄ع toggle (no line-by-line stack).
 * ═══════════════════════════════════════════════════════════════ */
function CaseCard({ c, lang }: { c: DescentCase; lang: Lang }) {
  const rtl = lang === 'ar';
  const pick = (b: { en: string; ar: string }) => (lang === 'en' ? b.en : b.ar);
  const [open, setOpen] = useState(false);
  const [ref, shown] = useReveal<HTMLButtonElement>({ amount: 0.05 });
  // §G6: the case keeps THIS layer's fixed accent (its lowest layer id).
  const accent = layerAccent(Math.min(...c.layers)).hex;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  const badgeValue = c.unverified
    ? 'UNVERIFIED'
    : c.contested
      ? 'CONTESTED'
      : `Tier ${c.tier}`;

  return (
    <>
      <button
        ref={ref}
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        className={`dw-glass dw-glass--lit dw-reveal ${shown ? 'is-in' : ''} group relative block w-full text-left overflow-hidden cursor-pointer transition-transform duration-500 hover:-translate-y-[2px] focus:outline-none focus-visible:ring-2`}
        style={{
          // dw-glass chrome (magenta/violet), but the case keeps its
          // per-layer accent (DESCENT_LAYER_COLORS) over the dw glow.
          borderRadius: 18,
        }}
      >
        {/* neon top hairline tinted to the layer's own accent */}
        <div
          className="h-[3px] w-full"
          style={{
            background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
            boxShadow: '0 0 12px var(--dw-glow-magenta)',
          }}
        />
        <div className="p-6">
          <div className="flex items-center gap-2 mb-3">
            <AccentLayerTag n={Math.min(...c.layers)} small />
          </div>
          {/* one language at a time — eliminates the EN/AR line-height
              rhythm break flagged on L4. */}
          <h4
            className="font-bold leading-snug"
            dir={rtl ? 'rtl' : 'ltr'}
            style={{
              fontSize: 'var(--dw-t-case-name)',
              color: 'var(--dw-bone)',
              fontFamily: rtl
                ? 'var(--font-heading-ar), sans-serif'
                : "'Clash Display', var(--font-heading-en), sans-serif",
            }}
          >
            {pick(c.title)}
          </h4>

          <p
            className="mt-4"
            dir={rtl ? 'rtl' : 'ltr'}
            style={{
              fontSize: 'var(--dw-t-body)',
              color: 'var(--dw-bone-dim)',
              fontFamily: rtl ? 'var(--font-body-ar), var(--font-heading-ar), sans-serif' : undefined,
              lineHeight: 1.65,
            }}
          >
            {pick(c.line)}
          </p>

          <div className="mt-4 inline-flex">
            <Sourced
              value={badgeValue}
              tier={c.tier}
              source={c.source}
              accent={accent}
              contested={c.contested}
              inline
            />
          </div>

          <div
            className="mt-4 inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 transition-colors group-hover:brightness-125"
            style={{
              color: accent,
              borderColor: `${accent}55`,
              background: `${accent}12`,
              fontSize: 'var(--dw-t-secondary)',
              fontWeight: 600,
            }}
          >
            ↗ {lang === 'en' ? 'open the file' : 'افتح الملف'}
          </div>
        </div>
      </button>

      {open && (
        <div
          className="dw-modal-overlay fixed inset-0 z-[9999] flex items-center justify-center p-4"
          style={{ background: 'rgba(3,2,8,0.85)', backdropFilter: 'blur(12px)' }}
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label={c.title.en}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="dw-modal-card relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-2xl"
            style={{
              background: 'var(--dw-canvas-2)',
              border: '1px solid var(--dw-glass-border-lit)',
              boxShadow: '0 20px 70px var(--dw-glow-violet), 0 0 0 1px var(--dw-glass-border-lit)',
            }}
          >
            <div
              className="h-[3px] w-full sticky top-0"
              style={{
                background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
                boxShadow: '0 0 14px var(--dw-glow-magenta)',
              }}
            />
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="absolute top-4 right-4 w-8 h-8 rounded-lg flex items-center justify-center transition-all z-10"
              style={{ color: 'var(--dw-bone-dim)' }}
            >
              ✕
            </button>

            <div className="p-8">
              <div className="mb-4">
                <AccentLayerTag n={Math.min(...c.layers)} />
              </div>
              <h3
                className="mb-6 font-bold"
                dir={rtl ? 'rtl' : 'ltr'}
                style={{
                  fontSize: 'var(--dw-t-h2)',
                  color: 'var(--dw-bone)',
                  fontFamily: rtl
                    ? 'var(--font-heading-ar), sans-serif'
                    : "'Clash Display', var(--font-heading-en), sans-serif",
                }}
              >
                {pick(c.title)}
              </h3>

              <div className="rounded-xl p-5 mb-6" style={{ border: `1px solid ${accent}3a`, background: `${accent}12` }}>
                <div className="flex items-center gap-2 mb-3">
                  <span style={{ color: accent }}>⚠</span>
                  <span className="dw-mono-label">{lang === 'en' ? 'What happened' : 'ماذا حدث'}</span>
                </div>
                <p
                  dir={rtl ? 'rtl' : 'ltr'}
                  style={{
                    fontSize: 'var(--dw-t-body)',
                    color: 'var(--dw-bone)',
                    fontFamily: rtl ? 'var(--font-body-ar), var(--font-heading-ar), sans-serif' : undefined,
                    lineHeight: 1.65,
                  }}
                >
                  {pick(c.line)}
                </p>
              </div>

              {(c.unverified || c.contested) && (
                <div
                  className="rounded-xl p-4 mb-6"
                  style={{
                    border: `1px solid ${c.contested ? 'var(--dw-glass-border-lit)' : 'rgba(255,46,154,0.4)'}`,
                    background: c.contested ? 'rgba(124,58,237,0.07)' : 'rgba(255,46,154,0.06)',
                  }}
                >
                  <p
                    dir={rtl ? 'rtl' : 'ltr'}
                    style={{
                      fontSize: 'var(--dw-t-body)',
                      color: 'var(--dw-bone-dim)',
                      fontFamily: rtl ? 'var(--font-body-ar), var(--font-heading-ar), sans-serif' : undefined,
                      lineHeight: 1.65,
                    }}
                  >
                    {c.contested
                      ? (lang === 'en'
                          ? 'A figure inside this case is contested across outlets — shown, but not adopted.'
                          : 'رقم داخل هذه الحالة متنازَع عليه بين المصادر — يُعرض ولا يُعتمد.')
                      : (lang === 'en'
                          ? 'Part of this case is unverified — held as calibrated uncertainty, neither asserted nor denied.'
                          : 'جزء من هذه الحالة غير مُتحقَّق — يُمسَك كشكٍّ مُعايَر، لا يُؤكَّد ولا يُنفى.')}
                  </p>
                </div>
              )}

              <div className="rounded-xl p-5" style={{ border: '1px solid var(--dw-glass-border)', background: 'var(--dw-glass-fill)' }}>
                <span className="dw-mono-label">{lang === 'en' ? 'Source' : 'المصدر'}</span>
                <div className="mt-3">
                  <Sourced
                    value={badgeValue}
                    tier={c.tier}
                    source={c.source}
                    accent={accent}
                    contested={c.contested}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* scoped reveal/scale for the modal (no framer AnimatePresence) */}
      <style>{`
        .dw-modal-overlay { animation: dw-modal-fade .2s ease both; }
        .dw-modal-card { animation: dw-modal-pop .3s cubic-bezier(.16,1,.3,1) both; }
        @keyframes dw-modal-fade { from { opacity: 0 } to { opacity: 1 } }
        @keyframes dw-modal-pop { from { opacity: 0; transform: translateY(16px) scale(.92) } to { opacity: 1; transform: none } }
        @media (prefers-reduced-motion: reduce) {
          .dw-modal-overlay, .dw-modal-card { animation: none !important; }
        }
      `}</style>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════
 * THE FLATLINE (M6 · L5) — ECG/insulin line draws, then flatlines on
 * the death sentence. SVG path + CSS stroke-dash draw, useReveal-gated.
 * Reduced-motion: drawn in its final (already-flatlined) state.
 * ═══════════════════════════════════════════════════════════════ */
function Flatline({ accent }: { accent: string }) {
  const reduce = useReducedMotion();
  const [ref, shown] = useReveal<HTMLDivElement>({ amount: 0.15 });
  const draw = reduce || shown;
  const uid = useId().replace(/[:]/g, '');

  // A few live ECG beats, then a hard flatline to the right edge.
  const beats =
    'M0,40 L40,40 L48,40 L54,12 L60,68 L66,40 L96,40 ' +
    'L104,40 L110,16 L116,64 L122,40 L150,40 ' +
    'L158,40 L164,20 L170,60 L176,40 L200,40 ' +
    'L320,40'; // the long flat dead segment

  // Path length is roughly the sum of segments; over-estimate so the
  // dash fully clears. We animate stroke-dashoffset length→0 via CSS.
  const LEN = 760;

  return (
    <div
      ref={ref}
      data-flatline
      className="relative rounded-xl p-4 overflow-hidden"
      style={{
        border: '1px solid var(--dw-magenta-core)',
        background: `${accent}0d`,
        // M6 max magenta glow — the deepest, loudest moment of the shaft.
        boxShadow: `0 0 60px -8px var(--dw-glow-magenta), inset 0 0 60px -30px var(--dw-glow-magenta)`,
      }}
    >
      {/* grain spike — a louder local grain over the death rung only */}
      <div className="absolute inset-0 pointer-events-none mix-blend-overlay" style={{ opacity: 0.12 }} aria-hidden>
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <filter id={`flatline-grain-${uid}`}>
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter={`url(#flatline-grain-${uid})`} />
        </svg>
      </div>

      <div className="relative flex items-center justify-between mb-3 gap-3">
        <span
          className="font-mono uppercase tracking-widest"
          style={{ fontSize: 'var(--dw-t-mono)', color: accent, textShadow: `0 0 14px ${accent}88` }}
        >
          insulin stopped · the line goes flat
        </span>
        <span
          className="dw-ar--body"
          dir="rtl"
          style={{ fontSize: 'var(--dw-t-mono)', color: 'var(--dw-bone-dim)', fontFamily: 'var(--font-body-ar), sans-serif' }}
        >
          الأنسولين توقّف — الخط استوى
        </span>
      </div>

      {/* taller trace + thicker stroke so the flatline reads as the payoff */}
      <svg viewBox="0 0 320 80" className="relative w-full h-[clamp(110px,18vh,160px)]" preserveAspectRatio="none" aria-hidden>
        {/* baseline ghost */}
        <line x1="0" y1="40" x2="320" y2="40" stroke="rgba(236,233,226,0.1)" strokeWidth="1" />
        <path
          d={beats}
          fill="none"
          stroke={accent}
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            filter: `drop-shadow(0 0 12px ${accent}cc)`,
            strokeDasharray: LEN,
            strokeDashoffset: draw ? 0 : LEN,
            transition: reduce ? 'none' : `stroke-dashoffset 2.4s ease-in-out`,
          }}
        />
        {/* the terminal flat-end marker */}
        <circle
          cx="320"
          cy="40"
          r="4.5"
          fill={accent}
          style={{
            opacity: draw ? 1 : 0,
            transition: reduce ? 'none' : 'opacity .4s ease 2.3s',
          }}
        />
      </svg>

      <p className="relative mt-2 leading-snug" style={{ fontSize: 'var(--dw-t-secondary)', color: 'var(--dw-bone-dim)' }}>
        A man with diabetes stopped his insulin and was dead within a week. The line does not come back.
      </p>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
 * Per-layer micro-viz dispatcher. Each returns a self-contained,
 * reduced-motion-safe block. L2/L8 reuse the shared ScrubLineChart.
 * All draws gated on useReveal (no framer whileInView / useInView).
 * ═══════════════════════════════════════════════════════════════ */
function LayerViz({ n, accent }: { n: number; accent: string }) {
  const reduce = useReducedMotion();
  const [ref, shown] = useReveal<HTMLDivElement>({ amount: 0.1 });
  const draw = reduce || shown;
  const uid = useId().replace(/[:]/g, '');

  switch (n) {
    /* L1 · count-up 8,045 + 183+ frauds, citation chain → dead end */
    case 1:
      return (
        <div ref={ref} className="dw-panel" style={panelVars(accent)}>
          <PanelHead en="citation chain · dead end" ar="سلسلة الإسناد — طريق مسدود" />
          <div className="grid grid-cols-2 gap-5 mb-6">
            <div>
              <div className="dw-data-value">
                <CountUp target={8045} accent={accent} />
              </div>
              <div className="dw-data-label mt-2">unregistered packages seized</div>
              <div
                className="mt-1 dw-ar--body"
                dir="rtl"
                style={{ fontSize: 'var(--dw-t-secondary)', color: 'var(--dw-bone-dim)', fontFamily: 'var(--font-body-ar), sans-serif' }}
              >
                {arDigits(8045)} عبوة غير مسجّلة
              </div>
            </div>
            <div>
              <div className="dw-data-value flex items-baseline gap-1">
                <CountUp target={183} accent={accent} />
                <span style={{ color: accent }}>+</span>
              </div>
              <div className="flex items-center gap-1.5 mt-2 flex-wrap">
                <span className="dw-data-label">documented frauds</span>
                <span
                  className="font-mono uppercase tracking-wider px-1.5 py-0.5 rounded-sm"
                  style={{ fontSize: 'var(--dw-t-mono-min)', border: `1px solid ${accent}40`, color: 'var(--dw-bone-dim)' }}
                >
                  corpus count
                </span>
              </div>
            </div>
          </div>
          {/* citation chain that ends at a dead-end node (CSS-drawn) — 2× height, legible nodes */}
          <svg viewBox="0 0 320 64" className="w-full h-[64px]" aria-hidden>
            {[0, 1, 2].map((i) => (
              <g key={i}>
                <line
                  x1={28 + i * 88}
                  y1={32}
                  x2={88 + i * 88}
                  y2={32}
                  stroke={accent}
                  strokeWidth="3"
                  strokeDasharray="5 4"
                  style={{
                    opacity: draw ? 0.85 : 0,
                    transition: reduce ? 'none' : `opacity .5s ease ${i * 0.3}s`,
                  }}
                />
                <circle cx={28 + i * 88} cy={32} r={10} fill="none" stroke={accent} strokeWidth="2" />
                <text x={28 + i * 88} y={36} fill="var(--dw-bone-dim)" fontSize="11" textAnchor="middle">{i + 1}</text>
              </g>
            ))}
            {/* dead-end node */}
            <g style={{ opacity: draw ? 1 : 0, transition: reduce ? 'none' : 'opacity .4s ease 1.1s' }}>
              <circle cx={296} cy={32} r={13} fill="none" stroke={accent} strokeWidth="3" />
              <line x1={289} y1={25} x2={303} y2={39} stroke={accent} strokeWidth="3" />
              <line x1={303} y1={25} x2={289} y2={39} stroke={accent} strokeWidth="3" />
            </g>
          </svg>
          <p className="mt-3 dw-secondary">The citation chain ends at a source that was never there.</p>
          {/* THE ONE LAW: the two figures above, sourced inline. */}
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
            <Sourced
              value={STATS.curcuminPackages.value}
              tier={STATS.curcuminPackages.tier}
              source={STATS.curcuminPackages.source}
              accent={accent}
              inline
            />
            <Sourced
              value={STATS.corpusFrauds.value}
              tier={STATS.corpusFrauds.tier}
              source={STATS.corpusFrauds.source}
              corpusCount={STATS.corpusFrauds.corpusCount}
              accent={accent}
              inline
            />
          </div>
        </div>
      );

    /* L2 · shown-vs-omitted split bar (ScrubLineChart owns the .dw-panel) */
    case 2:
      return (
        <div ref={ref} style={panelVars(accent)}>
          <ScrubLineChart variant="split-bar" accent={accent} />
        </div>
      );

    /* L3 · quote-in-context restorer — §3 spec: this is the HERO of the
       section, not a side tooltip. A large bilingual-equal restoration:
       the stripped fragment, then the surrounding moral context wiped
       back in via clip-path (NOT SplitText). */
    case 3:
      return (
        <div ref={ref} className="dw-panel flex flex-col justify-center" style={panelVars(accent)}>
          <PanelHead en="context restored" ar="إعادة السياق" />

          {/* the stripped fragment — the words the deceiver isolates */}
          <div className="mb-5">
            <div className="dw-mono-label mb-2" style={{ color: accent }}>the fragment they show you · الشظية المقتطعة</div>
            <p
              className="font-bold leading-tight dw-ar"
              dir="rtl"
              style={{ fontSize: 'var(--dw-t-data-sm)', color: 'var(--dw-bone)', fontFamily: 'var(--font-heading-ar), sans-serif' }}
            >
              «الطيّبات / الخبائث»
            </p>
          </div>

          {/* a divider that draws in as the context returns */}
          <div className="relative h-[2px] mb-5 rounded-full overflow-hidden" style={{ background: 'var(--dw-glass-border)' }}>
            <div
              className="absolute inset-y-0 left-0 rounded-full"
              style={{
                background: `linear-gradient(90deg, ${accent}, transparent)`,
                width: '100%',
                transformOrigin: 'left',
                transform: draw ? 'scaleX(1)' : 'scaleX(0)',
                transition: reduce ? 'none' : 'transform 1.1s cubic-bezier(.16,1,.3,1)',
              }}
            />
          </div>

          {/* THE RESTORATION — the surrounding moral context, the hero line */}
          <div className="dw-mono-label mb-2" style={{ color: 'var(--dw-bone-dim)' }}>restored to its verse · مردودة إلى آيتها</div>
          <p
            className="leading-relaxed dw-ar"
            dir="rtl"
            style={{
              fontSize: 'var(--dw-t-lead)',
              color: 'var(--dw-bone)',
              fontFamily: 'var(--font-heading-ar), sans-serif',
              clipPath: draw ? 'inset(0 0% 0 0)' : 'inset(0 100% 0 0)',
              transition: reduce ? 'none' : 'clip-path 1.2s cubic-bezier(.16,1,.3,1)',
            }}
          >
            مفردات أخلاقية في القرآن — لا حِمية تمنع الفاكهة والسمك.
          </p>
          <p
            className="mt-3 leading-relaxed"
            style={{
              fontSize: 'var(--dw-t-body)',
              color: 'var(--dw-bone-dim)',
              clipPath: draw ? 'inset(0 0% 0 0)' : 'inset(0 100% 0 0)',
              transition: reduce ? 'none' : 'clip-path 1.2s cubic-bezier(.16,1,.3,1) .2s',
            }}
          >
            Moral vocabulary — not a diet. The word is restored to the verse that surrounds it.
          </p>
        </div>
      );

    /* L4 · timeline scrub: event vs release — "Why now? Who benefits?" */
    case 4:
      return (
        <div ref={ref} className="dw-panel flex flex-col justify-center" style={panelVars(accent)}>
          <PanelHead en="timing · event vs release" ar="التوقيت — الحدث مقابل النشر" />
          {/* 2× height; ≥12px labels (fontSize 12/13). */}
          <svg viewBox="0 0 320 150" className="w-full h-[clamp(150px,26vh,220px)]" aria-hidden preserveAspectRatio="xMidYMid meet">
            <line x1="14" y1="86" x2="306" y2="86" stroke="rgba(236,233,226,0.18)" strokeWidth="1.5" />
            <line
              x1="14"
              y1="86"
              x2="306"
              y2="86"
              stroke={accent}
              strokeWidth="3"
              style={{
                strokeDasharray: 292,
                strokeDashoffset: draw ? 0 : 292,
                transition: reduce ? 'none' : 'stroke-dashoffset 1.4s ease-in-out',
              }}
            />
            {/* event pin */}
            <g>
              <circle cx="110" cy="86" r="6" fill="var(--dw-bone)" />
              <line x1="110" y1="86" x2="110" y2="44" stroke="var(--dw-bone)" strokeWidth="1.5" opacity="0.45" />
              <text x="110" y="36" fill="var(--dw-bone)" fontSize="13" fontWeight="600" textAnchor="middle">death (natural)</text>
              <text x="110" y="22" fill="var(--dw-bone-dim)" fontSize="12" textAnchor="middle">وفاة طبيعية</text>
            </g>
            {/* release pin — pre-recorded video drops */}
            <g style={{ opacity: draw ? 1 : 0, transition: reduce ? 'none' : 'opacity .5s ease 1s' }}>
              <circle cx="214" cy="86" r="7" fill={accent} />
              <line x1="214" y1="86" x2="214" y2="124" stroke={accent} strokeWidth="1.5" opacity="0.6" />
              <text x="214" y="138" fill={accent} fontSize="13" fontWeight="600" textAnchor="middle">“I was killed” drops</text>
            </g>
          </svg>
          <div className="flex items-center justify-between mt-3">
            <p style={{ fontSize: 'var(--dw-t-body)', color: 'var(--dw-bone)' }}>Why now? Who benefits?</p>
            <p
              className="dw-ar--body"
              dir="rtl"
              style={{ fontSize: 'var(--dw-t-body)', color: 'var(--dw-bone-dim)', fontFamily: 'var(--font-body-ar), sans-serif' }}
            >
              ليه دلوقتي؟ مين المستفيد؟
            </p>
          </div>
        </div>
      );

    /* L5 · THE FLATLINE + the 53.9% counter — the best viz; thick line,
       legible label, .dw-panel framing. */
    case 5:
      return (
        <div ref={ref} className="dw-panel flex flex-col justify-center gap-5" style={panelVars(accent)}>
          <PanelHead en="the line goes flat" ar="الخط يستوي" />
          <Flatline accent={accent} />
          <div className="rounded-xl p-5 flex items-center justify-between" style={{ border: `1px solid ${accent}33`, background: `${accent}12` }}>
            <div>
              <div className="dw-data-value flex items-baseline gap-1">
                <CountUp target={53.9} accent={accent} decimals={1} />
                <span style={{ color: accent }}>%</span>
              </div>
              <div className="dw-data-label mt-2 max-w-[28ch]">
                self-medicate with antibiotics without a prescription
              </div>
            </div>
            <div
              className="text-right max-w-[18ch] dw-ar--body"
              dir="rtl"
              style={{ fontSize: 'var(--dw-t-secondary)', color: 'var(--dw-bone-dim)', fontFamily: 'var(--font-body-ar), sans-serif' }}
            >
              {arDigits(53.9, { minimumFractionDigits: 1 })}٪ يتداوون ذاتيًا بلا وصفة
            </div>
          </div>
          {/* THE ONE LAW: the 53.9% figure, sourced inline (Mostafa 2021, Tier S). */}
          <div className="flex">
            <Sourced
              value={STATS.selfMedicate.value}
              tier={STATS.selfMedicate.tier}
              source={STATS.selfMedicate.source}
              accent={accent}
              inline
            />
          </div>
        </div>
      );

    /* L6 · backfire: a fact arrow bounces off belief; belief grows */
    case 6:
      return (
        <div ref={ref} className="dw-panel flex flex-col justify-center" style={panelVars(accent)}>
          <PanelHead en="backfire · the fact bounces off" ar="الارتداد — الحقيقة ترتدّ" />
          <svg viewBox="0 0 320 170" className="w-full h-[clamp(150px,26vh,230px)]" aria-hidden preserveAspectRatio="xMidYMid meet">
            {/* belief core — grows */}
            <circle
              cx="240"
              cy="90"
              fill={`${accent}26`}
              stroke={accent}
              strokeWidth="2.5"
              style={{
                // animate r via a CSS transition on the SVG geometry attr
                r: draw ? 60 : 40,
                transition: reduce ? 'none' : 'r 1.2s ease-out .8s',
              } as React.CSSProperties}
            />
            <text x="240" y="88" fill="var(--dw-bone)" fontSize="14" fontWeight="600" textAnchor="middle">belief</text>
            <text x="240" y="106" fill="var(--dw-bone-dim)" fontSize="12" textAnchor="middle">المعتقد</text>
            {/* fact arrow — approaches, then deflects up and away */}
            <path
              d="M24,90 L150,90"
              fill="none"
              stroke="var(--dw-bone)"
              strokeOpacity="0.6"
              strokeWidth="3"
              style={{
                strokeDasharray: 126,
                strokeDashoffset: draw ? 0 : 126,
                transition: reduce ? 'none' : 'stroke-dashoffset .8s ease',
              }}
            />
            <path
              d="M150,90 Q196,90 202,24"
              fill="none"
              stroke="var(--dw-bone)"
              strokeOpacity="0.45"
              strokeWidth="3"
              strokeDasharray="6 4"
              style={{
                opacity: draw ? 1 : 0,
                transition: reduce ? 'none' : 'opacity .6s ease .8s',
              }}
            />
            <text x="60" y="74" fill="var(--dw-bone-dim)" fontSize="13" fontWeight="600">fact · حقيقة</text>
          </svg>
          <p className="mt-3" style={{ fontSize: 'var(--dw-t-body)', color: 'var(--dw-bone)' }}>You argue facts. The belief only grows.</p>
        </div>
      );

    /* L7 · The Architects — the flagship Egypt governorate propagation
       flow-map (atom #39). FlowMap fails loud to a labeled abstract
       diagram if the geojson is absent. */
    case 7:
      return (
        <div ref={ref} className="dw-panel dw-panel--full" style={panelVars(accent)}>
          <PanelHead en="propagation flow · governorates" ar="مسار الانتشار — المحافظات" />
          <FlowMap />
        </div>
      );

    /* L8 · confidence band that never resolves to 0/100% (chart owns the panel) */
    case 8:
      return (
        <div ref={ref} style={panelVars(accent)}>
          <ScrubLineChart variant="confidence-band" accent={accent} />
        </div>
      );

    default:
      return null;
  }
}

/* ═══════════════════════════════════════════════════════════════
 * The rung.
 * ═══════════════════════════════════════════════════════════════ */
export function DescentLayer({ n }: DescentLayerProps) {
  const reduce = useReducedMotion();
  const [lang, setLang] = useState<Lang>('en');
  const rtl = lang === 'ar';
  const pick = <T extends { en: string; ar: string }>(b: T) => (lang === 'en' ? b.en : b.ar);

  const color =
    (DESCENT_LAYER_COLORS as Record<number, DescentColor>)[n] ??
    DESCENT_LAYER_COLORS[8];
  const accent = layerAccent(n).hex;
  const layerVars = layerCssVars(n) as React.CSSProperties;
  const entry = LAYER_DEFENSE_MAP.find((l) => l.n === n);
  const c = DESCENT_CASES.find((cs) => cs.layers.includes(n));

  const [headRef, headShown] = useReveal<HTMLDivElement>({ amount: 0.05 });
  const [vizRef, vizShown] = useReveal<HTMLDivElement>({ amount: 0.05 });
  const draw = reduce || headShown;

  const isFlatline = n === 5; // (dead in practice — L5 is KillSection)
  // The descent visibly INTENSIFIES with depth: deeper rungs are darker,
  // the lit pocket tightens and rises, grain/vignette close in, and the
  // composition flips side to side — so each of the layers reads as its
  // own heavier beat instead of one template recoloured.
  const depthT = (n - 1) / 7; // 0 at L1 (highest) → 1 at L8 (deepest)
  const bg = `radial-gradient(${(130 - depthT * 38).toFixed(0)}% ${(96 - depthT * 30).toFixed(0)}% at 50% ${(42 - depthT * 14).toFixed(0)}%, ${color.bg}cc 0%, rgba(2,1,4,${(0.5 + depthT * 0.42).toFixed(2)}) ${(66 - depthT * 24).toFixed(0)}%, #000 100%)`;

  return (
    <section
      id={`layer-${n}`}
      data-descent-section={`layer-${n}`}
      data-layer={n}
      className="relative min-h-screen flex items-center px-6 py-24 overflow-hidden"
      // §G6: publish the layer accent so every child + the .dw-panel frame
      // reads var(--td-layer-accent) without prop-drilling.
      style={{ background: bg, ...layerVars }}
    >
      {/* per-layer EN⇄ع toggle (top-right). One language at a time —
          eliminates the line-by-line bilingual interleave. */}
      <div
        className="absolute z-30 inline-flex overflow-hidden rounded-full border"
        style={{
          top: 'clamp(20px, 3vh, 32px)',
          left: 'clamp(16px, 4vw, 40px)',
          borderColor: `${accent}66`,
          background: 'rgba(0,0,0,0.45)',
          backdropFilter: 'blur(6px)',
        }}
        role="group"
        aria-label="Language"
      >
        <button
          type="button"
          onClick={() => setLang('en')}
          style={{
            fontFamily: "var(--font-mono,'Space Mono',monospace)",
            fontSize: 12,
            padding: '5px 13px',
            color: lang === 'en' ? '#0b0c10' : `${accent}cc`,
            background: lang === 'en' ? accent : 'transparent',
            border: 0,
            cursor: 'pointer',
            fontWeight: lang === 'en' ? 700 : 400,
          }}
        >
          EN
        </button>
        <button
          type="button"
          onClick={() => setLang('ar')}
          style={{
            fontFamily: "var(--font-mono,'Space Mono',monospace)",
            fontSize: 12,
            padding: '5px 13px',
            color: lang === 'ar' ? '#0b0c10' : `${accent}cc`,
            background: lang === 'ar' ? accent : 'transparent',
            border: 0,
            cursor: 'pointer',
            fontWeight: lang === 'ar' ? 700 : 400,
          }}
        >
          ع
        </button>
      </div>

      {/* GIANT GHOST LAYER NUMERAL −{n} — §G6/§G7: the oversized depth
          numeral that makes each of the 8 layers a DISTINCT full-viewport
          break, painted in THIS layer's fixed accent (not the shared
          magenta), with a same-accent stroke-ghost echo. Brighter than the
          old 0.1 so the numeral actually reads as the section marker. */}
      <div
        className="dw-layer absolute select-none pointer-events-none"
        style={{ top: '2%', right: '2%', opacity: 0.15 + depthT * 0.22, lineHeight: 0.8 }}
        aria-hidden
      >
        <span
          className="dw-ghost"
          style={{
            fontFamily: "'Clash Display', var(--font-heading-en), sans-serif",
            fontWeight: 800,
            fontSize: 'clamp(10rem,32vw,26rem)',
            WebkitTextStroke: `1.5px ${accent}`,
          }}
        >
          −{n}
        </span>
        <span
          className="dw-fill"
          style={{
            fontFamily: "'Clash Display', var(--font-heading-en), sans-serif",
            fontWeight: 800,
            fontSize: 'clamp(10rem,32vw,26rem)',
            color: accent,
            filter: `drop-shadow(0 0 40px ${accent}66)`,
          }}
        >
          −{n}
        </span>
      </div>

      {/* DuotoneFrame silhouette — the "you"/victim figure fused behind the
          rung (abstract, never a real face). One per layer. R3F-free. */}
      <div
        className="absolute pointer-events-none hidden md:block"
        style={{
          top: 0,
          bottom: 0,
          left: n % 2 === 0 ? 'auto' : '2%',
          right: n % 2 === 0 ? '6%' : 'auto',
          width: 'min(34vw, 360px)',
          opacity: isFlatline ? 0.4 : 0.26,
          maskImage: 'linear-gradient(180deg, transparent, #000 22%, #000 78%, transparent)',
          WebkitMaskImage: 'linear-gradient(180deg, transparent, #000 22%, #000 78%, transparent)',
        }}
        aria-hidden
      >
        <DuotoneFrame
          shape={n === 7 ? 'delta' : 'silhouette'}
          zone={ZONE}
          opacity={isFlatline ? 0.6 : 0.42}
          className="h-full"
        />
      </div>

      {/* ambient magenta glow — radial wash (pure CSS, looped only when
          motion is allowed). M6 spikes the wash. */}
      <div
        className="absolute inset-0 pointer-events-none mix-blend-screen"
        style={{
          background: `radial-gradient(circle at 30% 40%, var(--dw-glow-magenta-soft) 0%, transparent 60%)`,
          opacity: isFlatline ? 0.6 : 0.4,
          animation: reduce ? 'none' : `dw-glow-pulse ${isFlatline ? 5 : 8}s ease-in-out infinite`,
        }}
        aria-hidden
      />

      {/* depth vignette — closes in as you sink so deeper rungs feel heavier */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 6,
          boxShadow: `inset 0 0 ${(90 + depthT * 230).toFixed(0)}px ${(10 + depthT * 80).toFixed(0)}px rgba(0,0,0,${(0.4 + depthT * 0.5).toFixed(2)})`,
        }}
        aria-hidden
      />

      {/* per-rung grain (local, on top of the global overlay) — denser with depth */}
      <div
        className="absolute inset-0 pointer-events-none mix-blend-overlay"
        style={{ opacity: 0.035 + depthT * 0.09 }}
        aria-hidden
      >
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <filter id={`grain-${n}`}>
            <feTurbulence
              type="fractalNoise"
              baseFrequency={isFlatline ? 0.95 : 0.85}
              numOctaves="2"
              stitchTiles="stitch"
            />
          </filter>
          <rect width="100%" height="100%" filter={`url(#grain-${n})`} />
        </svg>
      </div>

      <div className={`dl-grid ${n % 2 === 0 ? 'dl-alt' : ''} relative z-10 w-full max-w-5xl mx-auto grid lg:grid-cols-2 gap-10 items-center`}>
        {/* ── identity + the "you" beat (alternates side by depth parity) ── */}
        <div className="dl-text">
          {/* continuous depth-gauge — reads "DEPTH n / 8", fills cyan→accent */}
          <div className="flex items-center gap-3 mb-5">
            <span
              className="text-[11px] font-mono uppercase tracking-widest tabular-nums"
              style={{ color: accent, letterSpacing: '0.22em' }}
            >
              {lang === 'en' ? 'DEPTH' : 'العُمق'} <b style={{ fontFamily: "'Anton', sans-serif", fontSize: 14 }}>{n}</b>
              <span style={{ opacity: 0.5 }}> / 8</span>
            </span>
            <div className="flex-1 h-[3px] rounded-full overflow-hidden" style={{ background: 'var(--dw-glass-border)' }}>
              <div
                className="h-full rounded-full"
                style={{
                  background: `linear-gradient(90deg, var(--dw-violet), ${accent})`,
                  boxShadow: '0 0 10px var(--dw-glow-magenta)',
                  transformOrigin: 'left',
                  transform: draw ? `scaleX(${n / 8})` : 'scaleX(0)',
                  transition: reduce ? 'none' : 'transform .9s cubic-bezier(.16,1,.3,1)',
                }}
              />
            </div>
          </div>

          <div
            ref={headRef}
            className={`dw-reveal ${headShown ? 'is-in' : ''}`}
          >
            {/* §G6 per-layer-accent deception tag */}
            <AccentLayerTag n={n} />

            {entry && (
              <>
                {/* the layer's name — one language at a time, tinted to its accent */}
                <h2
                  className="mt-5 font-bold leading-tight"
                  dir={rtl ? 'rtl' : 'ltr'}
                  style={{
                    fontSize: 'var(--dw-t-h2)',
                    fontFamily: rtl
                      ? 'var(--font-heading-ar), sans-serif'
                      : "'Clash Display', var(--font-heading-en), sans-serif",
                    color: 'var(--dw-bone)',
                    letterSpacing: rtl ? undefined : '-0.01em',
                  }}
                >
                  {pick(entry.layer)}
                </h2>
                {/* short opposite-language strap (the layer name only) */}
                <p
                  className="mt-2 font-mono uppercase"
                  dir={rtl ? 'ltr' : 'rtl'}
                  style={{
                    fontSize: 'var(--dw-t-mono)',
                    letterSpacing: '0.22em',
                    color: `${accent}cc`,
                    fontFamily: rtl ? undefined : 'var(--font-heading-ar), sans-serif',
                  }}
                >
                  L{n} · {rtl ? entry.layer.en : entry.layer.ar}
                </p>

                {/* the second-person beat — one language, calm rhythm */}
                <p
                  className="mt-6"
                  dir={rtl ? 'rtl' : 'ltr'}
                  style={{
                    fontSize: 'var(--dw-t-lead)',
                    color: 'var(--dw-bone)',
                    fontFamily: rtl ? 'var(--font-body-ar), var(--font-heading-ar), sans-serif' : undefined,
                    lineHeight: 1.6,
                  }}
                >
                  {pick(entry.youBeat)}
                </p>
              </>
            )}

            {/* accent stroke under the beat (CSS dash-draw) */}
            <svg viewBox="0 0 200 8" className="w-40 h-2 mt-5" aria-hidden>
              <line
                x1="0"
                y1="4"
                x2="200"
                y2="4"
                stroke={accent}
                strokeWidth="2"
                strokeLinecap="round"
                style={{
                  filter: dropGlow(ZONE, 0.65),
                  strokeDasharray: 200,
                  strokeDashoffset: draw ? 0 : 200,
                  transition: reduce ? 'none' : 'stroke-dashoffset 1.1s ease-in-out',
                }}
              />
            </svg>
          </div>

          {/* the real case (dw-glass CaseCard + ESC modal) */}
          {c && (
            <div className="mt-8">
              <CaseCard c={c} lang={lang} />
            </div>
          )}
        </div>

        {/* ── the per-layer micro-viz (alternates side by depth parity) ── */}
        <div
          ref={vizRef}
          className={`dl-viz dw-reveal ${vizShown ? 'is-in' : ''}`}
          style={{ transitionDelay: reduce ? undefined : '0.15s' }}
        >
          <LayerViz n={n} accent={accent} />
        </div>
      </div>

      {/* rung separator — a thin glowing thread continuing the fall */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
        <div
          className="w-[1px] h-16"
          style={{
            background: `linear-gradient(180deg, ${accent}88, transparent)`,
            boxShadow: '0 0 8px var(--dw-glow-magenta)',
          }}
        />
      </div>

      {/* scoped glow-pulse keyframe (dw magenta ambient) + depth-parity flip */}
      <style>{`
        /* even-numbered rungs mirror the layout so the descent never reads
           as the same template four times in a row. Mobile keeps text-first. */
        @media (min-width: 1024px) {
          .dl-alt .dl-text { order: 2; }
          .dl-alt .dl-viz { order: 1; }
        }
        @keyframes dw-glow-pulse {
          0%, 100% { opacity: ${isFlatline ? 0.4 : 0.25}; }
          50% { opacity: ${isFlatline ? 0.75 : 0.5}; }
        }
        @media (prefers-reduced-motion: reduce) {
          [data-layer="${n}"] [style*="dw-glow-pulse"] { animation: none !important; }
        }
      `}</style>
    </section>
  );
}

export default DescentLayer;
