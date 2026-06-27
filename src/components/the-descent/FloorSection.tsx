'use client';
/* ═══════════════════════════════════════════════════════════════
 * FloorSection.tsx — M11 · `descent-floor` — THE FLOOR (atom #26)  (DESIGN WAVE)
 *
 * EN "This is the bottom. People are dead, and the lie is still being
 *     forwarded."  ·  AR «دي القاع. ناس ماتوا، والكذبة لسه بتتبعت.»
 *
 * The deepest, stillest beat on the page: the climax of the descent.
 * Palette near-black (#050304) · grain MAX · ONE slow red drip · fade-
 * only reveal — nothing else moves.
 *
 * Converted to the clean DESIGN WAVE system:
 *   • NO R3F / ScrollContext velocity coupling (the field it fed is
 *     gone). NO framer whileInView. Reveal = a single useReveal() fade.
 *   • Drip + grain + pulse are pure CSS keyframes (calmed under
 *     reduced-motion). dw orb + dw-glass case cards.
 *
 * THE ONE LAW kept: "people are dead" is the SUM of the named, sourced
 * deaths from the shaft (M6 'the-kill', M7 'dajjal-marg'), surfaced
 * through <Sourced> — never a new, unsourced number.
 * ═══════════════════════════════════════════════════════════════ */

import { useReducedMotion } from 'framer-motion';
import { SECTION_COPY, DESCENT_CASES, DESCENT_LAYER_COLORS } from './descent-data';
import { Sourced } from './shared/Sourced';
import { useReveal } from './dw/useReveal';

/** The two named-death cases that make "people are dead" a sourced claim. */
const THE_KILL = DESCENT_CASES.find((d) => d.id === 'the-kill')!;
const DAJJAL = DESCENT_CASES.find((d) => d.id === 'dajjal-marg')!;

const ARTERIAL = DESCENT_LAYER_COLORS[5].accent; // #ff2e3e — THE KILL red
const FLOOR_BG = DESCENT_LAYER_COLORS[8].bg; // #050304

export function FloorSection() {
  const c = SECTION_COPY.floor;
  const reduce = useReducedMotion();
  const [ref, shown] = useReveal<HTMLDivElement>();

  return (
    <section
      id={c.anchor}
      data-descent-section="M11"
      className="dw-section"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: FLOOR_BG,
      }}
    >
      {/* ── ONE single red orb, barely breathing in the dark ── */}
      <div className="dw-orb dw-orb--1" style={{ opacity: 0.32 }} aria-hidden />

      {/* ── Deepening vignette: the bottom of the shaft ── */}
      <div
        style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse at 50% 38%, transparent 30%, rgba(0,0,0,0.92) 100%)' }}
        aria-hidden
      />

      {/* ── MAX local grain veil (darker than the global overlay) ── */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', mixBlendMode: 'overlay', opacity: 0.16 }} aria-hidden>
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <filter id="floor-grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.95" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#floor-grain)" />
        </svg>
      </div>

      {/* ── vertical side index ── */}
      <div className="dw-side-label" style={{ right: 'clamp(12px,3vw,40px)', left: 'auto', transform: 'translateY(-50%) rotate(0deg)' }} aria-hidden>
        11 · THE FLOOR · القاع
      </div>

      {/* ── ONE slow red drip (vertical track + falling bead) ── */}
      <FloorDrip reduce={!!reduce} />

      {/* ── Content (fade only — nothing slides or scales) ── */}
      <div
        ref={ref}
        style={{
          position: 'relative',
          zIndex: 4,
          maxWidth: '48rem',
          margin: '0 auto',
          textAlign: 'center',
          opacity: reduce || shown ? 1 : 0,
          transition: 'opacity 1.6s ease',
        }}
      >
        <p
          className="dw-mono"
          style={{
            fontSize: 'max(var(--dw-t-mono, 12px), 11px)',
            letterSpacing: '0.35em',
            marginBottom: '2.25rem',
            color: ARTERIAL,
            fontWeight: 700,
          }}
        >
          −8 · The Floor · القاع
        </p>

        {/* the ONE display line — the climax of the descent */}
        <h2
          style={{
            margin: 0,
            fontFamily: "'Clash Display', var(--font-heading-en), sans-serif",
            fontWeight: 800,
            lineHeight: 1.15,
            fontSize: 'clamp(1.4rem, 3.6vw, 2.2rem)',
            color: 'var(--dw-bone)',
          }}
        >
          {c.headline.en}
        </h2>
        <p
          dir="rtl"
          className="dw-ar"
          style={{
            marginTop: '0.75rem',
            fontFamily: 'var(--font-heading-ar), sans-serif',
            fontWeight: 800,
            lineHeight: 1.25,
            fontSize: 'clamp(1.5rem, 3.6vw, 2.2rem)',
            color: 'var(--dw-bone)',
          }}
        >
          {c.headline.ar}
        </p>

        {/* "People are dead" = the named, sourced deaths from the shaft. */}
        <div style={{ marginTop: '3rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.75rem' }}>
          <p
            className="dw-mono"
            style={{ fontSize: 'max(var(--dw-t-mono, 12px), 11px)', color: 'var(--dw-bone-dim, #c9c5bd)' }}
          >
            The dead are named above · الموتى مذكورون بالاسم في الأعلى
          </p>

          <div style={{ display: 'grid', gap: '1.5rem', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', width: '100%', maxWidth: '36rem', textAlign: 'left' }}>
            <FloorCaseCard
              titleEn={THE_KILL.title.en}
              titleAr={THE_KILL.title.ar}
              source={THE_KILL.source}
              tier={THE_KILL.tier}
            />
            <FloorCaseCard
              titleEn={DAJJAL.title.en}
              titleAr={DAJJAL.title.ar}
              source={DAJJAL.source}
              tier={DAJJAL.tier}
              unverifiedNote
            />
          </div>

          {/* ── The still-forwarding line: the lie outlives the dead ── */}
          <div
            style={{
              marginTop: '0.75rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
            }}
          >
            <span
              style={{
                display: 'inline-block',
                height: 8,
                width: 8,
                borderRadius: '50%',
                background: ARTERIAL,
                boxShadow: `0 0 10px ${ARTERIAL}`,
                animation: reduce ? 'none' : 'floorPulse 2.6s ease-in-out infinite',
              }}
              aria-hidden
            />
            <span style={{ fontSize: 'var(--dw-t-secondary, 13px)', color: 'var(--dw-bone-dim, #c9c5bd)' }}>…and the lie is still being forwarded.</span>
            <span dir="rtl" style={{ fontSize: 'var(--dw-t-secondary, 13px)', color: 'var(--dw-bone-dim, #c9c5bd)', fontFamily: 'var(--font-heading-ar), sans-serif' }}>
              …والكذبة لسه بتتبعت.
            </span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes floorPulse {
          0%, 100% { opacity: 0.35; transform: scale(1); }
          50%      { opacity: 1;    transform: scale(1.25); }
        }
        @keyframes floorDrip {
          0%   { transform: translateY(-12vh); opacity: 0; }
          12%  { opacity: 1; }
          88%  { opacity: 1; }
          100% { transform: translateY(58vh); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          [data-descent-section="M11"] .dw-orb { animation: none !important; }
        }
      `}</style>
    </section>
  );
}

/* ── The one slow arterial drip ──────────────────────────────────
 * A thin vein down the center; a single bead descends slowly. On
 * reduced-motion it is a static, motionless streak (a stain). */
function FloorDrip({ reduce }: { reduce: boolean }) {
  return (
    <div
      style={{ position: 'absolute', left: '50%', top: 0, transform: 'translateX(-50%)', pointerEvents: 'none', zIndex: 2, height: '46vh', width: 3 }}
      aria-hidden
    >
      {/* the vein / track */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          width: 1.5,
          left: '50%',
          transform: 'translateX(-50%)',
          background: `linear-gradient(to bottom, transparent, ${ARTERIAL}33 18%, ${ARTERIAL}55 60%, transparent)`,
        }}
      />
      {/* the bead */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: 0,
          width: 7,
          height: 11,
          marginLeft: -3.5,
          borderRadius: '50% 50% 50% 50% / 35% 35% 65% 65%',
          background: `radial-gradient(circle at 50% 35%, #ff6b6b, ${ARTERIAL} 60%, #7a0512)`,
          boxShadow: `0 0 12px ${ARTERIAL}cc`,
          animation: reduce ? 'none' : 'floorDrip 7.5s cubic-bezier(0.55,0,0.9,0.3) infinite',
          transform: reduce ? 'translateY(8vh)' : undefined,
          opacity: reduce ? 0.75 : undefined,
        }}
      />
    </div>
  );
}

function FloorCaseCard({
  titleEn,
  titleAr,
  source,
  tier,
  unverifiedNote,
}: {
  titleEn: string;
  titleAr: string;
  source: string;
  tier: 'S' | 'A' | 'B' | 'C';
  unverifiedNote?: boolean;
}) {
  return (
    <div className="dw-glass" style={{ padding: '1.1rem', borderColor: `${ARTERIAL}33`, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
      <p style={{ fontSize: 'var(--dw-t-case-name, 17px)', fontWeight: 700, color: 'var(--dw-bone)', lineHeight: 1.25 }}>{titleEn}</p>
      <p
        dir="rtl"
        className="dw-ar--body"
        style={{ fontSize: 'var(--dw-t-case-name, 17px)', fontWeight: 600, color: 'var(--dw-bone-dim, #c9c5bd)', marginBottom: '0.5rem', lineHeight: 1.3, fontFamily: 'var(--font-heading-ar), sans-serif' }}
      >
        {titleAr}
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.5rem' }}>
        <Sourced value="death" tier={tier} source={source} accent={ARTERIAL} inline />
      </div>
      {unverifiedNote && (
        <p className="dw-mono" style={{ marginTop: '0.5rem', fontSize: 'max(var(--dw-t-mono, 12px), 11px)', color: 'var(--dw-muted-strong, #b4b0bd)' }}>
          court verdict held as calibrated uncertainty · الحكم القضائي يُمسك كشكٍّ مُعايَر
        </p>
      )}
    </div>
  );
}

export default FloorSection;
