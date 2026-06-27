'use client';
/* ═══════════════════════════════════════════════════════════════
 * DescentExperience.tsx — orchestrator for «THE DESCENT» (DW gateway).
 *
 * REBUILT for the DESIGN WAVE gateway. Everything that caused the
 * blank-page / crash failures has been ripped out of the critical path:
 *   ✗ R3F <Scene/> particle field   → replaced by a pure-CSS .dw-bgfield
 *                                       gradient + drifting orbs.
 *   ✗ lenis / ReactLenis            → NATIVE window scroll only.
 *   ✗ gsap ScrollTrigger in here     → removed; sections self-manage
 *                                       their own (matchMedia-gated) gsap.
 *   ✗ framer whileInView            → useReveal() / mount-driven animate.
 *
 * Responsibilities now:
 *   • wrap the whole page in <div className="dw-root"> (scopes the DW
 *     tokens + imports design-wave.css once),
 *   • paint the static CSS background field at z0,
 *   • render <Hero/> first, then the existing sections M0→M16 in order,
 *   • keep a cheap native-scroll listener that feeds progress / velocity
 *     / mouse into ScrollContext (ref-only, zero re-renders) — still read
 *     by ClimbTurnSection's stateRef,
 *   • drive the per-zone palette swap (descent→climb→enterprise) via two
 *     IntersectionObservers, publishing zone CSS vars on the root.
 *
 * The R3F Scene and the gsap ScrollTrigger bridge are gone. Smooth
 * scroll relies solely on html{scroll-behavior:smooth}.
 * ═══════════════════════════════════════════════════════════════ */

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useScrollContext } from '@/components/six-layers/ScrollContext';

import './dw/design-wave.css';
import { SKIP_FLAG_KEY } from './descent-data';
import { zoneCssVars, type Zone } from './descent-theme';
import { OrbField, GrainOverlay, GradientGrade } from './visual';
import { Hero } from './dw/Hero';
import { DepthRail } from './DepthRail';
import { ThreadSection } from './ThreadSection';
import { SpreadSection } from './dw/scenes/SpreadSection';
import { ProblemSection } from './ProblemSection';
import { FabricationScene } from './dw/scenes/FabricationScene';
import { BiasedLensScene } from './dw/scenes/BiasedLensScene';
import { DecontextSection } from './dw/scenes/DecontextSection';
import { TimingScene } from './dw/scenes/TimingScene';
import { UnknownScene } from './dw/scenes/UnknownScene';
import { KillSection } from './dw/scenes/KillSection';
import { MatrixSection } from './dw/scenes/MatrixSection';
import { ArchitectsSection } from './dw/scenes/ArchitectsSection';
import { BlastRadiusSection } from './BlastRadiusSection';
import { FloorSection } from './FloorSection';
import { ClimbTurnSection } from './ClimbTurnSection';
import { StandardSection } from './dw/scenes/StandardSection';
import { ToolsFilmstrip } from './ToolsFilmstrip';
import { ImmunitySection } from './dw/scenes/ImmunitySection';
import { CognitionShaft } from './CognitionShaft';
import { GatewayDoor } from './GatewayDoor';

export function DescentExperience() {
  const { setProgress, setVelocity, setMouse } = useScrollContext();
  const rootRef = useRef<HTMLDivElement>(null);

  /* ── Atom #1: skippable gateway (returning-visitor fast-path). ── */
  const [returning, setReturning] = useState(false);
  /* Current palette zone — drives OrbField/Grain/Grade + published vars. */
  const [zone, setZone] = useState<Zone>('descent');

  useEffect(() => {
    try {
      setReturning(localStorage.getItem(SKIP_FLAG_KEY) === '1');
    } catch {
      /* storage blocked — treat as first visit */
    }
  }, []);

  const skipToDoor = () => {
    const door = document.getElementById('door');
    if (door) door.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  /* ── Native scroll → ScrollContext (progress + velocity). Ref-only
   * (no re-renders); still read by ClimbTurnSection via stateRef. ── */
  useEffect(() => {
    let lastY = window.scrollY;
    let lastT = performance.now();
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const y = window.scrollY;
      setProgress(max > 0 ? Math.min(Math.max(y / max, 0), 1) : 0);
      const now = performance.now();
      const dt = now - lastT;
      if (dt > 0) setVelocity((y - lastY) / dt);
      lastY = y;
      lastT = now;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [setProgress, setVelocity]);

  /* ── Zone palette swap keyed off the scene ANCHOR id:
   *   descent (red)  → hero · thread · spread · problem · layer-1..8 ·
   *                    radius · floor
   *   climb   (cyan) → flip · standard · tools · immunity · cognition
   *   reveal  (gold) → door            (the 'enterprise' theme = gold)
   * ── */
  useEffect(() => {
    /** Scenes painted in the CLIMB (cyan) palette. */
    const CLIMB = new Set(['flip', 'standard', 'tools', 'immunity', 'cognition']);

    const zoneFor = (anchor: string): Zone => {
      if (anchor === 'door') return 'enterprise'; // gold reveal
      if (CLIMB.has(anchor)) return 'climb';
      return 'descent'; // hero · thread · spread · problem · layer-* · radius · floor
    };

    const sections = Array.from(
      document.querySelectorAll<HTMLElement>('[data-descent-section]')
    );
    if (!sections.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        // Prefer the scene anchor (the section's id); fall back to the
        // data-descent-section token for any legacy section.
        const anchor =
          visible.target.id ||
          visible.target.getAttribute('data-descent-section') ||
          'hero';
        setZone((prev) => {
          const next = zoneFor(anchor);
          return next === prev ? prev : next;
        });
      },
      { threshold: [0.4, 0.7], rootMargin: '-25% 0px -25% 0px' }
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  /* Publish the active zone's accent vars onto the root node so the
   * whole page (every primitive + the scoped CSS) shifts palette. */
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const vars = zoneCssVars(zone);
    Object.entries(vars).forEach(([k, v]) => root.style.setProperty(k, v));
  }, [zone]);

  /* ── Mouse → ScrollContext (normalized −1..1), pointer-fine only ── */
  useEffect(() => {
    const fine = window.matchMedia('(hover:hover) and (pointer:fine)');
    if (!fine.matches) return;
    const onMove = (e: MouseEvent) => {
      setMouse(
        (e.clientX / window.innerWidth) * 2 - 1,
        -((e.clientY / window.innerHeight) * 2 - 1)
      );
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, [setMouse]);

  return (
    <div
      ref={rootRef}
      className="dw-root relative"
      style={{ background: 'var(--td-canvas, #07070b)', ...zoneCssVars('descent') }}
    >
      {/* z0 — pure-CSS background field (replaces the R3F <Scene/>) */}
      <div className="dw-bgfield" aria-hidden />

      {/* Global drifting OrbField behind all content (per-zone palette) */}
      <div className="fixed inset-0" style={{ zIndex: 1 }} aria-hidden>
        <OrbField zone={zone} count={4} parallax={0.4} opacity={0.55} />
      </div>

      {/* Left depth gauge −8 … +8 */}
      <DepthRail zone={zone} />

      {/* ── Atom #1: always-visible Skip control (top-right) ── */}
      <button
        type="button"
        onClick={skipToDoor}
        className="fixed top-4 right-4 z-[70] rounded-full border px-4 py-2 text-xs font-mono uppercase tracking-widest transition-colors"
        style={{
          borderColor: 'rgba(255,255,255,0.18)',
          background: 'rgba(7,7,11,0.55)',
          color: 'rgba(255,255,255,0.7)',
          backdropFilter: 'blur(6px)',
        }}
        aria-label="Skip the descent and go straight to the Library door"
      >
        Skip ↓{' '}
        <span dir="rtl" style={{ fontFamily: 'var(--font-heading-ar), sans-serif' }}>
          تخطٍّ
        </span>
      </button>

      {/* ── Atom #1: returning-visitor fast-path banner (only on return) ── */}
      {returning && (
        <div
          className="fixed top-16 right-4 z-[70] max-w-[18rem] rounded-xl border p-3"
          style={{
            borderColor: 'rgba(168,85,247,0.35)',
            background: 'rgba(11,11,18,0.85)',
            backdropFilter: 'blur(6px)',
          }}
          role="status"
        >
          <p className="text-[11px] leading-snug text-white/70">
            You&apos;ve walked the descent before.
          </p>
          <p
            className="text-[11px] leading-snug text-white/45"
            dir="rtl"
            style={{ fontFamily: 'var(--font-heading-ar), sans-serif' }}
          >
            إنت نزلت قبل كده.
          </p>
          <div className="mt-2 flex gap-2">
            <Link
              href="/"
              className="rounded-md px-2.5 py-1 text-[11px] font-semibold"
              style={{ background: '#a855f7', color: '#0b0b12' }}
            >
              Home · الرئيسية
            </Link>
            <button
              type="button"
              onClick={() => setReturning(false)}
              className="rounded-md border px-2.5 py-1 text-[11px] text-white/60"
              style={{ borderColor: 'rgba(255,255,255,0.18)' }}
            >
              Replay · إعادة
            </button>
          </div>
        </div>
      )}

      {/* ── Fixed pointer-events-none grading overlays (per-zone) ── */}
      <GrainOverlay zone={zone} position="fixed" z={40} />
      <GradientGrade zone={zone} position="fixed" z={42} />

      {/* ── HERO then the 20 approved scenes, in manifest order ──
       *  anchors: hero · thread · spread · problem · layer-1..8 ·
       *           radius · floor · flip · standard · tools · immunity ·
       *           cognition · door
       *  DESCENT (red): hero→floor · CLIMB (cyan): flip→cognition ·
       *  REVEAL (gold): door */}
      <main className="relative" style={{ zIndex: 10 }}>
        <Hero scrollTargetId="thread" /> {/* 1 · hero */}
        <ThreadSection /> {/* 2 · thread */}
        <SpreadSection /> {/* 3 · spread */}
        <ProblemSection /> {/* 4 · problem */}
        <FabricationScene /> {/* 5 · layer-1 — Absolute Fabrication */}
        <BiasedLensScene /> {/* 6 · layer-2 — Biased Lens */}
        <DecontextSection /> {/* 7 · layer-3 — Decontextualization (cinematic) */}
        <TimingScene /> {/* 8 · layer-4 — Weaponized Timing */}
        <KillSection /> {/* 9 · layer-5 — PEAK · The Kill */}
        <MatrixSection /> {/* 10 · layer-6 — PEAK · The Matrix */}
        <ArchitectsSection /> {/* 11 · layer-7 — PEAK · The Architects */}
        <UnknownScene /> {/* 12 · layer-8 — The Unknown */}
        <BlastRadiusSection /> {/* 13 · radius */}
        <FloorSection /> {/* 14 · floor — PEAK-quiet */}
        <ClimbTurnSection /> {/* 15 · flip — PEAK */}
        <StandardSection /> {/* 16 · standard — THE ONE LAW */}
        <ToolsFilmstrip /> {/* 17 · tools */}
        <ImmunitySection /> {/* 18 · immunity */}
        <CognitionShaft /> {/* 19 · cognition */}
        <GatewayDoor /> {/* 20 · door — gold reveal */}
      </main>
    </div>
  );
}

export default DescentExperience;
