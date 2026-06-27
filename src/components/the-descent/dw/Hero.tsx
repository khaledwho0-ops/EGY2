'use client';
/* ═══════════════════════════════════════════════════════════════
 * Hero.tsx — «النزول / THE DESCENT» — the DESIGN WAVE showpiece.
 *
 * Cinematic build of the DESIGN WAVE hero, Egyptianised:
 *   • GIANT layered magenta-gradient wordmark (Arabic «النزول» over
 *     Latin «THE DESCENT»), each with a strong offset stroke-ghost
 *     echo for depth,
 *   • a SYMMETRIC duotone SVG figure of a person hunched over a
 *     glowing phone, fused between the two type layers — head still
 *     in the bright promise, body swallowed by the lower word; the
 *     phone screen is the ONLY cold (cyan) light: the lure,
 *   • drifting CSS orbs + scattered sparkles + grain,
 *   • a deliberate, bright vertical left side-label,
 *   • right-side social + scroll-cue,
 *   • a LOW diagonal lie-phrase marquee tape (bone/white, ≥18px,
 *     high-contrast ribbon) with clearance so the wordmark is never
 *     clipped and the Enter pill is never crowded,
 *   • a bottom-right small line + finished BOXED «نظام الطيبات» +
 *     a violet "Enter the Library / ادخل المكتبة" pill that smooth-
 *     scrolls to the next section.
 *
 * Motion: framer-motion `animate` (mount-driven intro) + a native,
 * rAF-throttled scroll listener that writes CSS vars for parallax
 * depth. NO whileInView, NO ScrollTrigger, NO Lenis, NO R3F. Pure
 * CSS for every loop. SSR-safe; renders with zero JS errors. Honours
 * prefers-reduced-motion.
 * ═══════════════════════════════════════════════════════════════ */

import { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export interface HeroProps {
  /** DOM id of the section to scroll to when the CTA is clicked.
   *  Default 'descent-thread' (the first section after the hero). */
  scrollTargetId?: string;
  /** Override the diagonal marquee lie-phrases (Arabic). */
  liePhrases?: readonly string[];
}

const DEFAULT_LIES = [
  'الأنسولين كذبة',
  'الدوا مالوش لزمة',
  'الأكل هو العلاج',
  'سيبك من الدكاترة',
] as const;

const SPARKS = [
  { left: '12%', top: '22%', size: '1.2rem', delay: '0s' },
  { left: '84%', top: '30%', size: '0.9rem', delay: '0.8s' },
  { left: '22%', top: '70%', size: '1rem', delay: '1.4s' },
  { left: '70%', top: '64%', size: '1.3rem', delay: '0.4s' },
  { left: '48%', top: '14%', size: '0.85rem', delay: '2s' },
  { left: '60%', top: '82%', size: '1.05rem', delay: '1.1s' },
] as const;

export function Hero({
  scrollTargetId = 'thread',
  liePhrases = DEFAULT_LIES,
}: HeroProps) {
  const reduce = useReducedMotion();
  const track = [...liePhrases, ...liePhrases];

  /** Section ref — the parallax driver writes CSS vars onto it so the
   *  ghost layers, figure and orbs drift at different rates as the hero
   *  scrolls away. Pure native scroll + rAF; SSR-safe; reduced-motion
   *  opts out entirely. No whileInView / ScrollTrigger / Lenis. */
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (reduce) return;
    const el = heroRef.current;
    if (!el) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const vh = window.innerHeight || 1;
      const top = el.getBoundingClientRect().top;
      // 0 at rest (hero pinned at top) → 1 when scrolled one viewport up.
      const p = Math.min(Math.max(-top / vh, 0), 1);
      el.style.setProperty('--dw-px', p.toFixed(4));
    };
    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      if (raf) window.cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [reduce]);

  const goNext = () => {
    const el =
      document.getElementById(scrollTargetId) ??
      document.querySelector<HTMLElement>('[data-descent-section]');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // mount-driven intro variants (NOT whileInView)
  const rise = (delay: number) =>
    reduce
      ? { initial: false as const }
      : {
          initial: { opacity: 0, y: 36 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] as const },
        };

  return (
    <section
      ref={heroRef}
      id="hero"
      className="dw-hero"
      data-descent-section="hero"
      aria-label="النزول — THE DESCENT"
      style={{
        // CSS custom property for the parallax driver (default at rest)
        ['--dw-px' as string]: 0,
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        // a touch of self-parallax + fade as the hero leaves
        opacity: 'calc(1 - var(--dw-px) * 0.45)',
      }}
    >
      {/* z1 — drifting orbs (parallax: drift up faster than the page) */}
      <div
        className="dw-orb dw-orb--1"
        aria-hidden
        style={{ transform: 'translateY(calc(var(--dw-px) * -120px))' }}
      />
      <div
        className="dw-orb dw-orb--2"
        aria-hidden
        style={{ transform: 'translateY(calc(var(--dw-px) * 90px))' }}
      />
      <div
        className="dw-orb dw-orb--3"
        aria-hidden
        style={{ transform: 'translateY(calc(var(--dw-px) * -60px))' }}
      />

      {/* z1 — slow wireframe globe, bottom-left */}
      <svg
        aria-hidden
        viewBox="0 0 200 200"
        style={{
          position: 'absolute',
          bottom: '-60px',
          left: '-40px',
          width: 'clamp(220px, 26vw, 420px)',
          height: 'auto',
          opacity: 0.35,
          zIndex: 1,
          animation: reduce ? 'none' : 'dw-globe-spin 60s linear infinite',
        }}
      >
        <g fill="none" stroke="var(--dw-ink-line)" strokeWidth="0.8">
          <circle cx="100" cy="100" r="80" />
          <ellipse cx="100" cy="100" rx="80" ry="28" />
          <ellipse cx="100" cy="100" rx="80" ry="54" />
          <ellipse cx="100" cy="100" rx="28" ry="80" />
          <ellipse cx="100" cy="100" rx="54" ry="80" />
          <line x1="20" y1="100" x2="180" y2="100" />
          <line x1="100" y1="20" x2="100" y2="180" />
        </g>
      </svg>

      {/* ── side label (left gutter, vertical) — DELIBERATE: brighter,
           larger, bilingual; not invisible atmosphere. ── */}
      <div
        className="dw-side-label dw-hero-sidelabel"
        style={{ left: 'clamp(12px, 3vw, 40px)', zIndex: 6 }}
      >
        <span className="dw-hero-sidelabel__en">A FORWARDED MESSAGE · ENDS IN A GRAVE</span>
        <span className="dw-hero-sidelabel__dot" aria-hidden>—</span>
        <span className="dw-hero-sidelabel__ar" dir="rtl">رسالة تتبعت… وتنتهي في قبر</span>
      </div>

      {/* ── social icons + scroll-cue (right gutter) ── */}
      <div
        style={{
          position: 'absolute',
          right: 'clamp(12px, 3vw, 40px)',
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 6,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '18px',
        }}
        aria-hidden
      >
        {['✦', '◇', '⬡'].map((g, i) => (
          <span key={i} className="dw-social-ico" style={{ fontSize: '0.95rem' }}>
            {g}
          </span>
        ))}
      </div>
      <button
        type="button"
        onClick={goNext}
        aria-label="Scroll down to begin the descent · انزل والرحلة تبدأ"
        className="dw-scrollcue"
        style={{
          position: 'absolute',
          right: 'clamp(12px, 3vw, 44px)',
          bottom: '4%',
          zIndex: 6,
          background: 'transparent',
          border: 0,
          color: 'var(--dw-bone)',
          fontSize: '1.5rem',
          cursor: 'pointer',
          lineHeight: 1,
        }}
      >
        ↓
      </button>

      {/* ── CENTER STACK: wordmark L1 / figure / wordmark L2 ──
           Pushed up off the bottom band so the LOW marquee + Enter pill
           have clearance and «THE DESCENT» is never clipped. */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          width: '100%',
          maxWidth: '1200px',
          padding: '0 clamp(24px, 6vw, 96px)',
          paddingBottom: 'clamp(7rem, 16vh, 11rem)',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          // gentle scroll-parallax lift on the whole wordmark stack
          transform: 'translateY(calc(var(--dw-px) * -40px))',
        }}
      >
        {/* z2 — wordmark line 1 «النزول» (behind head) */}
        <motion.div
          className="dw-layer dw-hero-word"
          {...rise(0.05)}
          style={{
            zIndex: 2,
            // ghost echo parallax handled per-span via CSS var below
            ['--dw-ghost-shift' as string]: 'calc(10px + var(--dw-px) * 26px)',
          }}
        >
          <span className="dw-word dw-word--ar dw-ghost" dir="rtl" aria-hidden>
            النزول
          </span>
          <span className="dw-word dw-word--ar dw-fill dw-gradient-text" dir="rtl">
            النزول
          </span>
        </motion.div>

        {/* z3 — duotone phone-gazer figure, fused between the words.
             SYMMETRIC silhouette: head bowed, both forearms raised to
             cradle the phone at the chest. The phone screen is the only
             cold cyan light. NO stray diamond. */}
        <motion.div
          {...rise(0.25)}
          aria-hidden
          style={{
            zIndex: 3,
            marginTop: 'clamp(-3.2rem, -6vw, -5rem)',
            marginBottom: 'clamp(-3.2rem, -6vw, -5rem)',
            width: 'clamp(220px, 28vw, 460px)',
            filter: 'drop-shadow(0 24px 60px rgba(0,0,0,0.6))',
            transform: 'translateY(calc(var(--dw-px) * -16px))',
          }}
        >
          <svg
            viewBox="0 0 280 360"
            width="100%"
            height="auto"
            role="img"
            aria-label="A person hunched over a glowing phone, sinking"
          >
            <defs>
              {/* duotone: dark silhouette → magenta-violet body ramp */}
              <linearGradient id="dw-figbody" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#caa6c8" />
                <stop offset="48%" stopColor="#8a5a8e" />
                <stop offset="100%" stopColor="#3a2150" />
              </linearGradient>
              <radialGradient id="dw-phoneglow" cx="50%" cy="42%" r="62%">
                <stop offset="0%" stopColor="var(--dw-cyan)" stopOpacity="0.95" />
                <stop offset="55%" stopColor="var(--dw-cyan)" stopOpacity="0.35" />
                <stop offset="100%" stopColor="var(--dw-cyan)" stopOpacity="0" />
              </radialGradient>
              {/* cyan rim-light that the phone throws up onto the face */}
              <radialGradient id="dw-facelight" cx="50%" cy="78%" r="60%">
                <stop offset="0%" stopColor="var(--dw-cyan)" stopOpacity="0.55" />
                <stop offset="100%" stopColor="var(--dw-cyan)" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* ── SYMMETRIC silhouette, centred on x=140 ── */}
            <g fill="url(#dw-figbody)">
              {/* head, bowed slightly forward */}
              <ellipse cx="140" cy="74" rx="40" ry="46" />
              {/* neck */}
              <path d="M126 112 H154 L150 138 H130 Z" />
              {/* shoulders + torso, sinking — symmetric trapezoid sweep */}
              <path
                d="M140 132
                   C 96 132 78 158 70 196
                   L 56 360
                   L 224 360
                   L 210 196
                   C 202 158 184 132 140 132 Z"
              />
              {/* left upper arm + forearm raised to centre (mirror) */}
              <path d="M92 176 C 78 196 86 214 108 222 L 120 206 C 104 200 98 188 104 174 Z" />
              {/* right upper arm + forearm raised to centre (mirror) */}
              <path d="M188 176 C 202 196 194 214 172 222 L 160 206 C 176 200 182 188 176 174 Z" />
              {/* two hands meeting at centre, cradling the device */}
              <ellipse cx="124" cy="214" rx="13" ry="11" />
              <ellipse cx="156" cy="214" rx="13" ry="11" />
            </g>

            {/* cyan glow the screen throws up onto the bowed face */}
            <ellipse cx="140" cy="120" rx="46" ry="40" fill="url(#dw-facelight)" />

            {/* the LURE: cold cyan phone, centred, held flat between the hands */}
            <g style={{ filter: 'drop-shadow(0 0 16px var(--dw-glow-cyan))' }}>
              {/* bloom */}
              <ellipse cx="140" cy="200" rx="66" ry="50" fill="url(#dw-phoneglow)" />
              {/* the device — upright, centred, symmetric */}
              <rect
                x="126"
                y="180"
                width="28"
                height="44"
                rx="5"
                fill="#0a1416"
                stroke="var(--dw-cyan)"
                strokeWidth="1.5"
              />
              {/* the glowing screen */}
              <rect x="130" y="185" width="20" height="34" rx="2.5" fill="var(--dw-cyan)" opacity="0.92" />
            </g>
          </svg>
        </motion.div>

        {/* z4 — wordmark line 2 «THE DESCENT» (over the torso) */}
        <motion.div
          className="dw-layer dw-hero-word"
          {...rise(0.4)}
          style={{
            zIndex: 4,
            ['--dw-ghost-shift' as string]: 'calc(10px + var(--dw-px) * 26px)',
          }}
        >
          <span className="dw-word dw-ghost" aria-hidden>
            THE&nbsp;DESCENT
          </span>
          <span className="dw-word dw-fill dw-gradient-text">THE&nbsp;DESCENT</span>
        </motion.div>
      </div>

      {/* z5 — LOW diagonal lie-phrase marquee tape (bottom band).
           Sits below the wordmark with clearance; bone/white ≥18px,
           high-contrast ribbon; struck-through lies. */}
      <div
        className="dw-hero-tape"
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 'clamp(1rem, 3vh, 2.25rem)',
          zIndex: 5,
          pointerEvents: 'none',
        }}
        aria-hidden
      >
        <div className="dw-marquee">
          <div className="dw-marquee__track">
            {track.map((p, i) => (
              <span
                key={i}
                dir="rtl"
                style={{
                  textDecoration: 'line-through',
                  textDecorationColor: 'rgba(255,46,154,0.9)',
                  textDecorationThickness: '2px',
                }}
              >
                {p}
                <span style={{ margin: '0 0.7rem', opacity: 0.65 }}>·</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* z6 — bottom-right: case line + finished boxed name + CTA pill.
           Lifted clear above the tape band. */}
      <motion.div
        {...rise(0.6)}
        style={{
          position: 'absolute',
          right: 'clamp(20px, 6vw, 96px)',
          bottom: 'clamp(4.5rem, 12vh, 7.5rem)',
          zIndex: 7,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: '0.9rem',
          textAlign: 'right',
          maxWidth: 'min(90vw, 360px)',
        }}
      >
        <span className="dw-eyebrow" dir="rtl">
          الملف الأول — Case File 01
        </span>
        <span className="dw-box dw-hero-box" dir="rtl">
          الحِمية اللي قتلت
        </span>
        <button type="button" className="dw-pill" onClick={goNext}>
          <span dir="rtl" style={{ fontFamily: 'var(--font-heading-ar), sans-serif' }}>
            ادخل المكتبة
          </span>
          <span style={{ opacity: 0.85 }}>· Enter the Library</span>
          <span aria-hidden>▸</span>
        </button>
      </motion.div>

      {/* z6 — scattered sparkles */}
      {SPARKS.map((s, i) => (
        <span
          key={i}
          className="dw-spark"
          aria-hidden
          style={{ left: s.left, top: s.top, fontSize: s.size, animationDelay: s.delay, zIndex: 6 }}
        >
          ✦
        </span>
      ))}

      {/* local keyframes + hero-scoped polish (no global leak) */}
      <style>{`
        @keyframes dw-globe-spin{from{transform:rotate(0)}to{transform:rotate(360deg)}}

        /* stronger ghost echo, driven by the parallax var */
        .dw-hero-word .dw-ghost{
          -webkit-text-stroke: 2px rgba(255,46,154,0.32);
          transform: translate(var(--dw-ghost-shift, 10px), 14px) scale(1.025);
          filter: blur(0.4px);
        }

        /* DELIBERATE bilingual side-label — brighter + larger than the
           default mono kicker, with a glow so it reads as atmosphere. */
        .dw-hero-sidelabel{
          display:flex; align-items:center; gap:1rem;
          font-size: 0.8125rem;
          letter-spacing: 0.26em;
          color: var(--dw-bone-dim);
          text-shadow: 0 0 18px rgba(255,46,154,0.28);
        }
        .dw-hero-sidelabel__en{ color: var(--dw-bone); }
        .dw-hero-sidelabel__dot{ color: var(--dw-magenta-b); opacity:0.9; }
        .dw-hero-sidelabel__ar{
          font-family: var(--font-body-ar), 'Tajawal','Cairo',sans-serif;
          font-weight: 600;
          letter-spacing: 0;
          color: var(--dw-bone-dim);
        }

        /* tape ribbon — bone/white, ≥18px, high-contrast */
        .dw-hero-tape .dw-marquee{
          background: linear-gradient(90deg, #1a0e2e, var(--dw-violet-deep) 50%, #1a0e2e);
          box-shadow: 0 10px 40px var(--dw-glow-violet), 0 0 0 1px rgba(168,85,247,0.4) inset;
          padding: 0.7rem 0;
        }
        .dw-hero-tape .dw-marquee__track{
          color: #ffffff;
          font-size: clamp(1.15rem, 2.4vw, 1.6rem); /* ≥18px floor */
          font-weight: 800;
          letter-spacing: 0.01em;
          text-shadow: 0 1px 10px rgba(0,0,0,0.55);
        }
        .dw-hero-tape .dw-marquee__track > span{ opacity: 1; }

        /* finished case box — solid plate, intentional corner ticks */
        .dw-hero-box{
          background: linear-gradient(180deg, rgba(255,31,143,0.22), rgba(124,58,237,0.16));
          border: 2px solid var(--dw-magenta-core);
          padding: 0.5rem 1rem;
          font-weight: 800;
          box-shadow:
            0 0 0 1px rgba(255,31,143,0.35),
            0 10px 30px rgba(255,46,154,0.22),
            0 0 36px -8px var(--dw-glow-magenta);
        }
        .dw-hero-box::before,
        .dw-hero-box::after{
          width: 13px; height: 13px;
          border-width: 2.5px;
          border-color: var(--dw-magenta-a);
        }
        .dw-hero-box::before{ top:-5px; left:-5px; }
        .dw-hero-box::after{ bottom:-5px; right:-5px; }

        @media (prefers-reduced-motion: reduce){
          .dw-hero-word .dw-ghost{ transform: translate(10px,14px) scale(1.025); }
        }
      `}</style>
    </section>
  );
}

export default Hero;
