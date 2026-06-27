'use client';
/* ═══════════════════════════════════════════════════════════════
 * GatewayDoor.tsx — M16 · #gateway-door · THE DOOR (the dignified close)
 *
 * The particle field coalesces from chaos into a calm, slow UPWARD drift
 * (the payoff of M1/M11/M12), an SVG door aperture DRAWS OPEN, and the
 * final line resolves. Confetti is WITHHELD here on purpose — the close
 * is calm, not celebratory.
 *
 * DESIGN WAVE rewrite: every animation here is now PURE CSS, sequenced off
 * a single `.is-open` class toggled by the shared useReveal() IO hook —
 * NO gsap, NO ScrollTrigger / DrawSVG / SplitText, NO framer whileInView.
 *
 * v2 §4 M16 directive, applied:
 *   • DisplayType final line — a layered ghost-stroke headline (the live,
 *     intact heading sits in front; a stroke-ghost DisplayType sits behind
 *     for depth). The live line is real DOM text, never split.
 *   • door aperture with accent glow — the aperture frame/leaves carry the
 *     ENTERPRISE-zone gold dropGlow; warm light spills through on open.
 *   • calm orb drift — the local upward dust motes PLUS a low-opacity
 *     OrbField (enterprise gold/cyan, calm parallax) behind the door.
 *   • Real <PageNavigation currentPath="/the-descent" /> (category nav).
 *
 * All accents read from ZONE_THEME['enterprise'] — NO hardcoded accents.
 *  • Warm gold dawn (#0B0A06 → bone), grain feel toward ~0.
 *  • CSS stroke-dasharray door aperture: two leaves + frame stroke draw in.
 *  • The final EN line reveals via clip-path/rise (intact text — selectable
 *    and accessible). The Arabic line uses a clip-path reveal too.
 *  • CTA → /six-layers (primary "Enter →") and / (home).
 *
 * Atoms satisfied: #4 (the project's gateway/portal door), #30-resolve
 * (the horror→hope arc lands), plus craft atoms #5–#11, #49–#50.
 *
 * Reduced-motion + <768px: the door is shown in its FINAL open state
 * immediately, the lines render in full, the drift overlay is hidden,
 * grain static. Nothing animates; the meaning is preserved.
 * ═══════════════════════════════════════════════════════════════ */

import { useMemo } from 'react';
import Link from 'next/link';

import { SECTION_COPY } from './descent-data';
import { OrbField, theme, dropGlow } from './visual';
import { useReveal } from './dw/useReveal';
import './dw/design-wave.css';

/* ── ENTERPRISE zone is the single source of accents (v2 §1) ── */
const ZONE = 'enterprise' as const;
const T = theme(ZONE);
const GOLD = T.accentA; // '#F0C030'
const GOLD_RGB = T.accentARGB; // '240, 192, 48'
const NEAR_BLACK = T.canvas; // '#0B0A06'
const BONE = '#E8E2D6';

/** Deterministic calm-drift dust motes (seeded, no layout thrash).
 *
 * SSR-SAFE PRECISION: every emitted value is rounded to a FIXED number of
 * decimals and pre-formatted into the exact string React will write to the
 * inline `style`. React's server renderer and the client serialize raw
 * high-precision floats (and unit-less numeric `width`/`height`) slightly
 * differently — e.g. server `2.18762px` vs client `2.187620355036779` —
 * which tripped the "tree hydrated but some attributes … didn't match"
 * warning (the leaking "1 error" toast). Rounding + explicit `px`/`s`
 * string units makes the two sides byte-identical, so hydration is silent.
 * The seed is unchanged, so the visual layout is identical to before. */
function useMotes(count: number) {
  return useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const r = (seed: number) => {
          const x = Math.sin(seed * 999.1 + i * 17.3) * 43758.5453;
          return x - Math.floor(x);
        };
        const size = 1 + r(2) * 2.4; // px
        return {
          id: i,
          left: `${(r(1) * 100).toFixed(3)}%`, // vw %
          size: `${size.toFixed(3)}px`, // explicit px string (no auto-px)
          glow: `${(size * 3).toFixed(3)}px`, // box-shadow blur radius
          delay: `${(r(3) * 8).toFixed(3)}s`,
          dur: `${(10 + r(4) * 12).toFixed(3)}s`, // slow
          drift: `${((r(5) - 0.5) * 6).toFixed(3)}vw`, // horizontal sway
          opacity: Number((0.15 + r(6) * 0.4).toFixed(3)),
        };
      }),
    [count]
  );
}

export function GatewayDoor() {
  const c = SECTION_COPY.door;
  const motes = useMotes(26);

  /* ── Door open + line reveal — driven by the shared useReveal() IO
   * hook (replaces GSAP ScrollTrigger/DrawSVG/SplitText). When `open`
   * latches true we add `.is-open` to the root; pure CSS keyframes below
   * draw the aperture stroke, split the leaves apart, spill the warm
   * light, and resolve the final line. No gsap, no whileInView. ── */
  // Observe the DOOR BOX (not the whole tall section) so the closed→open
  // draw fires only once the door is actually on screen — otherwise it
  // animated while still below the fold and was finished before you saw it.
  const [doorRef, open] = useReveal<HTMLDivElement>({ rootMargin: '0px 0px -18% 0px', amount: 0.35 });

  return (
    <section
      id={c.anchor}
      data-descent-section="M16"
      className={`gd-root dw-root relative min-h-screen flex flex-col items-center justify-center px-5 sm:px-6 py-16 sm:py-20 overflow-hidden ${open ? 'is-open' : ''}`}
      style={{
        background: `radial-gradient(ellipse 80% 70% at 50% 42%, #1d160c 0%, ${NEAR_BLACK} 60%, #0c0a06 100%)`,
      }}
    >
      {/* calm orb drift — low-opacity enterprise gold/cyan orbs behind the door */}
      <OrbField zone={ZONE} count={3} parallax={0.22} opacity={0.32} />

      {/* calm upward drift — local dust motes (hidden on reduced-motion via CSS) */}
      <div className="gd-drift pointer-events-none absolute inset-0" aria-hidden>
        {motes.map((m) => (
          <span
            key={m.id}
            className="gd-mote absolute rounded-full"
            style={{
              left: m.left,
              bottom: '-6%',
              width: m.size,
              height: m.size,
              background: GOLD,
              opacity: m.opacity,
              boxShadow: `0 0 ${m.glow} rgba(${GOLD_RGB},0.7)`,
              // CSS custom props consumed by the keyframes below
              ['--gd-dur' as string]: m.dur,
              ['--gd-delay' as string]: m.delay,
              ['--gd-drift' as string]: m.drift,
            }}
          />
        ))}
      </div>

      <div className="relative max-w-3xl mx-auto w-full text-center flex flex-col items-center" style={{ zIndex: 1 }}>
        {/* ── THE DOOR APERTURE (SVG · CSS stroke-draw · accent glow) ── */}
        <div ref={doorRef} className="relative mx-auto mb-12 w-[180px] h-[240px] sm:w-[220px] sm:h-[300px]">
          {/* warm light behind the aperture (revealed as it opens) */}
          <div
            data-door-glow
            className="gd-glow pointer-events-none absolute inset-0"
            style={{
              background: `radial-gradient(ellipse 55% 70% at 50% 50%, rgba(${GOLD_RGB},0.55), rgba(${GOLD_RGB},0.08) 55%, transparent 72%)`,
              filter: 'blur(6px)',
            }}
            aria-hidden
          />
          <svg
            viewBox="0 0 220 300"
            className="gd-door relative w-full h-full"
            fill="none"
            role="img"
            aria-label="A doorway opening to the Library"
            style={{ filter: dropGlow(ZONE, 0.45, 'A') }}
          >
            {/* outer frame (drawn) */}
            <path
              data-door-draw
              d="M20 290 L20 60 Q20 12 110 12 Q200 12 200 60 L200 290"
              stroke={GOLD}
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <line
              data-door-draw
              x1="14"
              y1="290"
              x2="206"
              y2="290"
              stroke={GOLD}
              strokeWidth="2.5"
              strokeLinecap="round"
            />

            {/* LEFT leaf (frame stroke + handle) — slides left on open */}
            <g className="gd-leaf gd-leaf-left">
              <path
                data-door-draw
                d="M26 286 L26 64 Q26 20 110 20 L110 286 Z"
                stroke={`rgba(${GOLD_RGB},0.8)`}
                strokeWidth="1.6"
                fill={`rgba(${GOLD_RGB},0.05)`}
              />
              <line
                data-door-draw
                x1="98"
                y1="150"
                x2="98"
                y2="172"
                stroke={GOLD}
                strokeWidth="3"
                strokeLinecap="round"
              />
            </g>

            {/* RIGHT leaf — slides right on open */}
            <g className="gd-leaf gd-leaf-right">
              <path
                data-door-draw
                d="M194 286 L194 64 Q194 20 110 20 L110 286 Z"
                stroke={`rgba(${GOLD_RGB},0.8)`}
                strokeWidth="1.6"
                fill={`rgba(${GOLD_RGB},0.05)`}
              />
              <line
                data-door-draw
                x1="122"
                y1="150"
                x2="122"
                y2="172"
                stroke={GOLD}
                strokeWidth="3"
                strokeLinecap="round"
              />
            </g>
          </svg>
        </div>

        {/* ── FINAL LINE — clean, intact clip-reveal. The decorative
              stroke-ghost layer was REMOVED: it rendered the same line a
              few px behind the live text and read as a smudged double
              exposure, hurting legibility. ──────────────────────────── */}
        <h2
          className="gd-line-reveal relative mx-auto max-w-2xl text-[clamp(1.4rem,3.6vw,2.4rem)] font-bold leading-[1.25]"
          style={{ color: BONE }}
        >
          {c.headline.en}
        </h2>

        {/* AR line — clip-path reveal (never split on script) */}
        <p
          className="gd-ar-reveal mt-4 mx-auto max-w-2xl text-[clamp(1.2rem,3vw,2rem)] leading-[1.5]"
          dir="rtl"
          style={{ fontFamily: 'var(--font-heading-ar), sans-serif', color: GOLD }}
        >
          {c.headline.ar}
        </p>

        {/* ── PROMISE — the sentence lives ABOVE the button now, instead
            of being crammed inside it. The button is a short action
            phrase only (the user's note: a button is an action, not a
            manifesto). ──────────────────────────────────────────────── */}
        <p
          className="gd-cta-promise mt-8 mx-auto max-w-xl text-[clamp(0.95rem,1.8vw,1.12rem)] leading-relaxed"
          style={{ color: 'rgba(232,226,214,0.82)' }}
        >
          You walk out immune to the next lie.
          <span
            className="mt-1 block"
            dir="rtl"
            style={{ fontFamily: 'var(--font-heading-ar), sans-serif', color: 'rgba(232,226,214,0.6)' }}
          >
            بتخرج محصّن ضدّ الكذبة الجاية.
          </span>
        </p>

        {/* ── CTA — one dominant action button; "Home" is grouped quietly
            BELOW it (centered), no longer orphaned beside it. Confetti is
            deliberately WITHHELD — the close is calm. ────────────────── */}
        <div className="mt-6 flex flex-col items-center gap-4">
          <a
            href="/six-layers"
            className="btn-primary inline-flex items-center gap-2.5 px-10 py-4 rounded-xl text-lg font-bold"
            style={{ background: GOLD, color: NEAR_BLACK, boxShadow: `0 0 56px -8px rgba(${GOLD_RGB},0.7)` }}
          >
            <span>Enter the Library</span>
            <span className="opacity-45" aria-hidden>·</span>
            <span dir="rtl" style={{ fontFamily: 'var(--font-heading-ar), sans-serif' }}>
              ادخل المكتبة
            </span>
            <span className="ml-0.5" aria-hidden>→</span>
          </a>
          <Link
            href="/"
            className="group inline-flex items-center gap-1.5 text-[13px] font-medium text-white/45 transition-colors hover:text-white/75"
          >
            <span>Home</span>
            <span className="opacity-40" aria-hidden>·</span>
            <span dir="rtl" style={{ fontFamily: 'var(--font-heading-ar), sans-serif' }}>
              الرئيسية
            </span>
          </Link>
        </div>

        {/* ── Continue cue — cinematic, on-tone replacement for the flat
              indigo "ONBOARDING · 1/5" PageNavigation, which clashed with
              the gold close (§3: restyle OR hide on this gateway). The
              real category nav is suppressed here; a single gold-toned
              "next in Onboarding" thread keeps the journey forward. ── */}
        <div data-descent-nav className="mt-12 flex flex-col items-center">
          <div
            className="mx-auto h-px w-24"
            style={{ background: `linear-gradient(90deg, transparent, rgba(${GOLD_RGB},0.5), transparent)` }}
            aria-hidden
          />
          <a
            href="/welcome"
            className="mt-5 inline-flex flex-col items-center gap-0.5 text-[12px] font-mono uppercase tracking-[0.25em] transition-colors"
            style={{ color: `rgba(${GOLD_RGB},0.7)` }}
          >
            <span>Next · Welcome →</span>
            <span
              className="text-[12px] tracking-normal"
              dir="rtl"
              style={{ fontFamily: 'var(--font-heading-ar), sans-serif', color: 'rgba(255,255,255,0.45)' }}
            >
              التالي · مرحبًا
            </span>
          </a>
        </div>
      </div>

      {/* Scoped styles: calm upward drift + AR clip reveal + reduced-motion gate */}
      <style>{`
        /* calm upward dust motes (CSS only, infinite) */
        @keyframes gd-rise {
          0%   { transform: translateY(0) translateX(0); opacity: 0; }
          12%  { opacity: var(--gd-mote-op, 0.4); }
          88%  { opacity: var(--gd-mote-op, 0.4); }
          100% { transform: translateY(-118vh) translateX(var(--gd-drift, 0)); opacity: 0; }
        }
        .gd-mote {
          animation: gd-rise var(--gd-dur, 14s) linear var(--gd-delay, 0s) infinite;
          will-change: transform, opacity;
        }

        /* ── DOOR APERTURE: stroke-draw, leaf-split, glow ──
           CSS replacement for GSAP DrawSVG/ScrollTrigger. Closed by
           default; the .is-open class (set by useReveal) plays them. */
        .gd-door [data-door-draw] {
          stroke-dasharray: 760;
          stroke-dashoffset: 760;
          transition: stroke-dashoffset 1.6s cubic-bezier(0.65, 0, 0.35, 1);
        }
        .gd-root.is-open .gd-door [data-door-draw] { stroke-dashoffset: 0; }

        .gd-leaf {
          transition: transform 1.3s cubic-bezier(0.65, 0, 0.35, 1) 0.9s;
          transform-box: fill-box;
          transform-origin: center;
        }
        .gd-root.is-open .gd-leaf-left  { transform: translateX(-42%); }
        .gd-root.is-open .gd-leaf-right { transform: translateX(42%); }

        .gd-glow {
          opacity: 0;
          transition: opacity 1.4s ease-out 1.4s;
        }
        .gd-root.is-open .gd-glow { opacity: 1; }

        /* ── FINAL LINE: clip + rise reveal (intact DOM text) ── */
        .gd-line-reveal {
          opacity: 0;
          clip-path: inset(0 0 110% 0);
          transform: translateY(0.4em);
          transition:
            opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1) 1.6s,
            clip-path 0.8s cubic-bezier(0.16, 1, 0.3, 1) 1.6s,
            transform 0.8s cubic-bezier(0.16, 1, 0.3, 1) 1.6s;
        }
        .gd-root.is-open .gd-line-reveal {
          opacity: 1;
          clip-path: inset(0 0 0 0);
          transform: none;
        }

        /* ── ARABIC LINE: clip reveal (never split on script) ── */
        .gd-ar-reveal {
          opacity: 0;
          clip-path: inset(0 100% 0 0);
          transition:
            opacity 1s ease-out 1.9s,
            clip-path 1s ease-out 1.9s;
        }
        .gd-root.is-open .gd-ar-reveal {
          opacity: 1;
          clip-path: inset(0 0 0 0);
        }

        @media (prefers-reduced-motion: reduce) {
          .gd-drift { display: none; }
          .gd-mote { animation: none; }
          /* final OPEN state immediately — no animation, meaning preserved */
          .gd-door [data-door-draw] { transition: none; stroke-dashoffset: 0; }
          .gd-leaf { transition: none; }
          .gd-root.is-open .gd-leaf-left  { transform: translateX(-42%); }
          .gd-root.is-open .gd-leaf-right { transform: translateX(42%); }
          .gd-glow { transition: none; }
          .gd-line-reveal,
          .gd-ar-reveal {
            transition: none;
            opacity: 1;
            clip-path: none;
            transform: none;
          }
        }
      `}</style>
    </section>
  );
}

export default GatewayDoor;
