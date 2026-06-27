'use client';
/* ═══════════════════════════════════════════════════════════════
 * ClimbTurnSection.tsx — M12 · `climb-turn` — THE FLIP  (DESIGN WAVE)
 * THE PAGE'S CENTRAL WOW — the palette pivot DESCENT → CLIMB.
 *
 * DW REBUILD (atoms #30, #1, #2 preserved):
 *   The FLIP is now a PURE-CSS palette shift, driven by useReveal():
 *   when the stage enters the viewport, `.is-in` toggles and the whole
 *   `.dw-flip` block cross-fades arterial-red FALL → cyan RISE:
 *     • bg #050304 → climb canvas #06121A           (.dw-flip__bg)
 *     • vignette: dark edges → cold cyan glow        (.dw-flip__vignette)
 *     • the FALL headline fades/rises out, the RISE headline rises in
 *       (.dw-flip-face--fall / --rise)
 *     • the depth gauge drains full → empty          (.dw-flip__gauge-fill)
 *     • the climb orbs + defense marquee surface     (.dw-flip__rise-decor)
 *   NO GSAP ScrollTrigger / pin / scrub / SplitText. NO R3F particle
 *   field. NO ScrollContext writes. Native scroll only. The decorative
 *   layers use the .dw-climb cyan token rebind (magenta → cyan) so the
 *   page palette has visibly flipped by the time the reader leaves M12.
 *
 *   Reduced-motion / <768px: the dw CSS disables the cross-fade
 *   transitions; useReveal still adds `.is-in` immediately when in view,
 *   so the section renders directly in its risen (legible) state — a
 *   clean hard-cut, no motion.
 *
 * Sets localStorage 'eal-descent-seen'='1' on entry (skip-on-return).
 *
 * THE ONE LAW: pure narrative hinge — asserts no number. Copy is only
 * SECTION_COPY.flip / SECTION_COPY.floor. Nothing fabricated.
 * ═══════════════════════════════════════════════════════════════ */

import { useEffect } from 'react';
import { SECTION_COPY, SKIP_FLAG_KEY } from './descent-data';
import { useReveal } from './dw/useReveal';

export function ClimbTurnSection() {
  const c = SECTION_COPY.flip;
  const floor = SECTION_COPY.floor;

  // useReveal toggles `.is-in` → the CSS palette FLIP runs. One observer,
  // no GSAP. rootMargin pulls the trigger a touch early so the flip lands
  // as the stage centres.
  const [stageRef, flipped] = useReveal<HTMLDivElement>({
    rootMargin: '0px 0px -22% 0px',
  });

  /* ── Skip-on-return: the FLIP is where the gateway marks itself seen ── */
  useEffect(() => {
    try {
      localStorage.setItem(SKIP_FLAG_KEY, '1');
    } catch {
      /* storage blocked — ignore */
    }
  }, []);

  return (
    <section id={c.anchor} data-descent-section="M12" className="relative">
      <div
        ref={stageRef}
        className={`dw-climb dw-flip ${flipped ? 'is-in' : ''}`}
        style={{
          position: 'relative',
          minHeight: '100vh',
          width: '100%',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '6rem 1.5rem',
        }}
      >
        {/* bg cross-fade plate (red floor → cyan dawn) */}
        <div className="dw-flip__bg" aria-hidden />
        {/* inverting vignette */}
        <div className="dw-flip__vignette" aria-hidden />

        {/* CLIMB-palette orbs surfacing with the flip (cyan, drift via CSS) */}
        <div
          className="dw-flip__rise-decor"
          aria-hidden
          style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none' }}
        >
          <div className="dw-orb dw-orb--3" style={{ top: '12%', left: '14%' }} />
          <div className="dw-orb dw-orb--2" style={{ bottom: '18%', right: '8%' }} />
        </div>

        {/* vertical side label — the DW rail */}
        <div
          className="dw-side-label"
          style={{ left: 'clamp(12px, 3vw, 40px)', zIndex: 6 }}
        >
          The Flip · الانقلاب — 12
        </div>

        {/* draining depth gauge (right rail): full at fall → empty at rise */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            right: 'clamp(16px, 4vw, 40px)',
            top: '50%',
            transform: 'translateY(-50%)',
            height: '52vh',
            width: 4,
            zIndex: 5,
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: 999,
              background: 'rgba(255,255,255,0.06)',
            }}
          />
          <div
            className="dw-flip__gauge-fill"
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              borderRadius: 999,
              background: 'linear-gradient(to top, #ff2e3e, var(--dw-cyan))',
              boxShadow: '0 0 12px var(--dw-glow-cyan)',
            }}
          />
          <span
            style={{
              position: 'absolute',
              left: -24,
              top: 0,
              fontSize: 11,
              fontFamily: "'Space Mono', monospace",
              color: 'var(--dw-cyan)',
            }}
          >
            +8
          </span>
          <span
            style={{
              position: 'absolute',
              left: -24,
              bottom: 0,
              fontSize: 11,
              fontFamily: "'Space Mono', monospace",
              color: 'rgba(255,46,62,0.9)',
            }}
          >
            −8
          </span>
        </div>

        {/* ── content stack: the two headline faces, stacked + cross-faded ── */}
        <div
          style={{
            position: 'relative',
            zIndex: 2,
            maxWidth: '52rem',
            margin: '0 auto',
            textAlign: 'center',
            display: 'grid',
          }}
        >
          <p
            className="dw-eyebrow"
            style={{
              gridArea: '1 / 1',
              marginBottom: '2rem',
              color: 'var(--dw-cyan)',
              alignSelf: 'start',
              justifySelf: 'center',
            }}
          >
            The Flip · الانقلاب
          </p>

          {/* FALL face — arterial, fades up and out */}
          <div
            className="dw-flip-face dw-flip-face--fall"
            style={{ gridArea: '1 / 1', alignSelf: 'center', marginTop: '3.5rem' }}
            aria-hidden={flipped}
          >
            <h2
              style={{
                fontSize: 'clamp(1.6rem, 4.4vw, 2.8rem)',
                fontWeight: 800,
                lineHeight: 1.1,
                color: '#ff2e3e',
              }}
            >
              {floor.headline.en}
            </h2>
            <p
              dir="rtl"
              style={{
                marginTop: '0.75rem',
                fontSize: 'clamp(1.25rem, 3.4vw, 2.1rem)',
                lineHeight: 1.2,
                fontWeight: 800,
                color: 'rgba(236,233,226,0.92)',
                fontFamily: 'var(--font-heading-ar), sans-serif',
              }}
            >
              {floor.headline.ar}
            </p>
          </div>

          {/* RISE face — cyan turn line, rises in */}
          <div
            className="dw-flip-face dw-flip-face--rise"
            style={{ gridArea: '1 / 1', alignSelf: 'center', marginTop: '3.5rem' }}
            aria-hidden={!flipped}
          >
            <h2
              style={{
                fontSize: 'clamp(1.7rem, 4.6vw, 3rem)',
                fontWeight: 800,
                lineHeight: 1.1,
                color: 'var(--dw-cyan)',
                textShadow: '0 0 28px var(--dw-glow-cyan)',
              }}
            >
              {c.headline.en}
            </h2>
            <span
              dir="rtl"
              style={{
                display: 'block',
                marginTop: '0.75rem',
                fontSize: 'clamp(1.4rem, 3.6vw, 2.3rem)',
                fontWeight: 800,
                lineHeight: 1.15,
                fontFamily: 'var(--font-heading-ar), sans-serif',
                color: 'var(--dw-cyan)',
                textShadow: '0 0 24px var(--dw-glow-cyan)',
              }}
            >
              {c.headline.ar}
            </span>

            {c.sub && (
              <p
                style={{
                  marginTop: '2rem',
                  fontSize: 'clamp(1rem, 1.6vw, 1.125rem)',
                  color: 'rgba(240,192,48,0.85)',
                }}
              >
                {c.sub.en}
                <span
                  dir="rtl"
                  style={{
                    display: 'block',
                    marginTop: '0.5rem',
                    fontSize: '0.875rem',
                    color: 'rgba(236,233,226,0.55)',
                    fontFamily: 'var(--font-heading-ar), sans-serif',
                  }}
                >
                  {c.sub.ar}
                </span>
              </p>
            )}

            {/* fall → rise whisper bar */}
            <div
              aria-hidden
              style={{
                marginTop: '2.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.75rem',
              }}
            >
              <span
                style={{ fontSize: 11, fontFamily: "'Space Mono', monospace", color: '#ff2e3e', letterSpacing: '0.15em' }}
              >
                FALL
              </span>
              <span
                style={{
                  position: 'relative',
                  height: 1,
                  width: '10rem',
                  overflow: 'hidden',
                  background: 'rgba(255,255,255,0.12)',
                }}
              >
                <span
                  style={{
                    position: 'absolute',
                    inset: '0 0 0 0',
                    background:
                      'linear-gradient(to right, #ff2e3e, var(--dw-cyan), #f0c030)',
                  }}
                />
              </span>
              <span
                style={{ fontSize: 11, fontFamily: "'Space Mono', monospace", color: '#f0c030', letterSpacing: '0.15em' }}
              >
                RISE
              </span>
            </div>
          </div>
        </div>

        {/* CLIMB defense marquee at the base — surfaces with the flip.
         * The inverse of the descent lie-tape: methods that pull you up. */}
        <div
          className="dw-flip__rise-decor"
          aria-hidden
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: '6%',
            zIndex: 3,
            pointerEvents: 'none',
          }}
        >
          <div className="dw-marquee">
            <div className="dw-marquee__track dw-marquee__track--rev">
              {RISE_PHRASES.map((p, i) => (
                <span key={i}>
                  {p}
                  <span style={{ margin: '0 0.6rem', opacity: 0.6 }}>·</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* Defense techniques tape (CLIMB) — the inverse of the descent lie-tape.
 * Static copy, no fabricated claim; these are method names, not assertions. */
const RISE_PHRASES = [
  'تحقّق متقاطع',
  'استشهاد بالمصدر',
  'نقد منهجي',
  'لقاح إدراكي',
  'cross-verify',
  'cite the source',
  'systematic critique',
] as const;

export default ClimbTurnSection;
