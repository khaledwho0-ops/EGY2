'use client';
/* ═══════════════════════════════════════════════════════════════
 * M0 · descent-thread — THE THREAD (WhatsApp cold-open)
 *
 * The seductive forwarded family-group message — "anyone can believe
 * it." A WhatsApp chat bubble drops in; a magnetically pulsing
 * Forward button (useSpring, POINTER-ONLY); the #25D366 green that
 * sickens as you scroll on (a desaturating overlay tied to scroll
 * progress); Scene particles already seeded with a slight −y velocity
 * by ParticleField — here we just present the message and its source.
 *
 * v2 §4 M0 elevation: a GIANT ghost DisplayType «النزول / THE DESCENT»
 * + a red OrbField sit behind the bubble (the page's first hook); the
 * bubble is now a GlassPanel carrying a hazard-red glow; the Forward
 * button keeps its magnetic pulse but glows hazard-red; a descent
 * KineticMarquee of the real lie-phrases rakes across the base; a
 * vertical SectionKicker "00 — THE THREAD" pins the left edge. All
 * accents resolve from ZONE_THEME (descent) — nothing hardcoded.
 *
 * THE ONE LAW: the Al-Awadi "insulin is a lie" thesis renders through
 * <Sourced> (Al-Masry Al-Youm #4249980 / Syndicate strike-off — Tier A).
 *
 * Reduced-motion / <768px: static bubble, no pulse, single card; the
 * ghost type, orbs and marquee all collapse to calm static states via
 * their own primitive fallbacks.
 * Atoms satisfied: #51 (attention — the cold-open hook), #17 (anyone
 * can believe it), #21 (not just information — a real forwarded lie).
 * ═══════════════════════════════════════════════════════════════ */

import { useEffect, useRef, useState } from 'react';
import {
  motion,
  useReducedMotion,
  useSpring,
  useMotionValue,
  useTransform,
} from 'framer-motion';
import { Check, Forward, MessageCircle } from 'lucide-react';
import { SECTION_COPY, THREAD_SOURCE } from './descent-data';
import { Sourced } from './shared/Sourced';
import { TierBadge, resolveTierKey } from './dw/TierLegend';
import {
  DisplayType,
  OrbField,
  KineticMarquee,
  GlassPanel,
  SectionKicker,
  theme,
} from './visual';

const BONE = '#F1EFE9'; // §G4 primary bone (was #E8E2D6) — clears AA on near-black
/* §3 Thread: the WhatsApp green is kept as DELIBERATE sickly contrast but
 * toned away from the raw brand #25D366 toward a duller, less candy hue so
 * it reads as "off" rather than cheerful. */
const GREEN = '#1FA855'; // toned WhatsApp green (deliberate sickly contrast)
const GREEN_RGB = '31, 168, 85';
const ZONE = 'descent' as const;

export function ThreadSection() {
  const c = SECTION_COPY.thread;
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const t = theme(ZONE);

  /* ── The sickening green: 0 (healthy) → 1 (drained/grey) tied to how
   * far the section has scrolled past. transform/filter only. ── */
  const [sick, setSick] = useState(0);
  useEffect(() => {
    if (reduce) return;
    const el = sectionRef.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        // progress as the section leaves the viewport upward
        const p = Math.min(1, Math.max(0, -r.top / Math.max(1, r.height)));
        setSick(p);
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, [reduce]);

  // The bubble accent desaturates + dims as `sick` climbs.
  const greenSaturation = reduce ? 1 : 1 - sick * 0.85;
  const greenBrightness = reduce ? 1 : 1 - sick * 0.35;

  return (
    <section
      ref={sectionRef}
      id={c.anchor}
      data-descent-section="M0"
      className="relative min-h-screen flex items-center justify-center px-6 py-24 overflow-hidden"
    >
      {/* ── BACKDROP: the giant ghost «النزول / THE DESCENT» + red orbs.
       * The page's first hook (DESIGN-WAVE oversized display type). It
       * sits behind the bubble, faded, so the message reads on top. ── */}
      <div
        aria-hidden
        className="absolute inset-0 flex items-center justify-center"
        style={{ zIndex: 0 }}
      >
        <OrbField zone={ZONE} count={4} parallax={0.45} opacity={0.55} />
        {/* §3 Thread: the watermark is now DELIBERATE texture — raised from a
         * faint 0.13 ghost to a readable 0.2 with the gradient fill, so it
         * reads as intentional oversized display type, not a leftover. */}
        <DisplayType
          ar="النزول"
          en="THE DESCENT"
          lead="ar"
          size="xl"
          fill="gradient"
          zone={ZONE}
          className="opacity-20 mix-blend-screen select-none px-4"
        />
      </div>

      {/* vertical side label — DESIGN-WAVE side text */}
      <SectionKicker
        en="THE THREAD"
        ar="الخيط"
        index="00"
        zone={ZONE}
        side="left"
        className="z-10"
      />

      <div className="relative w-full max-w-xl mx-auto" style={{ zIndex: 2 }}>
        {/* §3 Thread: a FOCAL anchor that fills the top void above the card —
         * a glowing "incoming message" chat glyph that gives the eye a place
         * to land and visually seats the bubble below it. */}
        <motion.div
          aria-hidden
          initial={reduce ? false : { opacity: 0, y: -12, scale: 0.9 }}
          animate={reduce ? undefined : { opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl"
          style={{
            background: `rgba(${GREEN_RGB}, ${0.1 * greenSaturation + 0.04})`,
            border: `1px solid rgba(${GREEN_RGB}, ${0.4 * greenSaturation + 0.12})`,
            boxShadow: `0 0 28px -6px rgba(${GREEN_RGB}, ${0.45 * greenSaturation + 0.1})`,
            color: GREEN,
            filter: `saturate(${greenSaturation})`,
          }}
        >
          <MessageCircle size={26} aria-hidden />
        </motion.div>

        {/* eyebrow — "Forwarded many times" in the toned green.
         * §G2: raised 11px → 13px (--dw-t-eyebrow floor). */}
        <motion.p
          initial={reduce ? false : { opacity: 0, y: -8 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center font-mono uppercase tracking-[0.22em] flex items-center justify-center gap-2"
          style={{ color: GREEN, filter: `saturate(${greenSaturation})`, fontSize: 'var(--dw-t-eyebrow)' }}
        >
          <Forward size={14} aria-hidden />
          {c.kicker?.en}
          <span
            dir="rtl"
            className="dw-ar"
            style={{ fontFamily: 'var(--font-heading-ar), sans-serif' }}
          >
            · {c.kicker?.ar}
          </span>
        </motion.p>

        {/* ── The WhatsApp chat bubble, now seated in a GlassPanel with a
         * hazard-red glow (v2 §4 M0). The seductive green tint drains on
         * scroll exactly as before; the GlassPanel supplies the premium
         * mask-border + the danger glow underneath. ── */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 28, scale: 0.96 }}
          animate={reduce ? undefined : { opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ type: 'spring', stiffness: 120, damping: 16 }}
          className="mt-8 mx-auto"
          style={{ maxWidth: '34rem' }}
        >
          <GlassPanel zone={ZONE} pad="sm" glow className="rounded-2xl">
            <div
              className="relative rounded-2xl rounded-tl-sm px-5 py-4"
              style={{
                // the seductive incoming-message tint — toned green, drains on scroll
                background: `linear-gradient(180deg, rgba(${GREEN_RGB},${0.16 *
                  greenSaturation}) 0%, rgba(${GREEN_RGB},${0.08 *
                  greenSaturation}) 100%)`,
                border: `1px solid rgba(${GREEN_RGB},${0.4 * greenSaturation})`,
                filter: `saturate(${greenSaturation}) brightness(${greenBrightness})`,
              }}
            >
              {/* forwarded label inside the bubble — §G2 raised to ≥11px mono floor */}
              <div
                className="flex items-center gap-1.5 italic mb-2"
                style={{ color: 'rgba(241,239,233,0.6)', fontSize: 'var(--dw-t-mono-min)' }}
              >
                <Forward size={12} aria-hidden />
                <span>Forwarded many times</span>
                <span dir="rtl" className="dw-ar--body" style={{ fontFamily: 'var(--font-body-ar), sans-serif' }}>
                  · أُعيد توجيهه كثيرًا
                </span>
              </div>

              {/* the message — EN + AR at EQUAL weight (§G3 bilingual equality) */}
              <p
                className="text-[clamp(1.2rem,3.4vw,1.7rem)] font-semibold leading-snug"
                style={{ color: BONE }}
              >
                {c.headline.en}
              </p>
              <p
                className="mt-2 text-[clamp(1.2rem,3.6vw,1.8rem)] leading-snug dw-ar"
                dir="rtl"
                style={{ fontFamily: 'var(--font-heading-ar), sans-serif', color: BONE }}
              >
                {c.headline.ar}
              </p>

              {/* timestamp + read ticks (the trust theater) — §G2 ≥11px */}
              <div
                className="mt-2 flex items-center justify-end gap-1"
                style={{ color: `rgba(${GREEN_RGB},${0.9 * greenSaturation})`, fontSize: 'var(--dw-t-mono-min)' }}
              >
                <span className="tabular-nums" style={{ color: 'rgba(241,239,233,0.55)' }}>
                  21:47
                </span>
                <Check size={13} aria-hidden style={{ marginLeft: 2, marginRight: -8 }} />
                <Check size={13} aria-hidden />
              </div>
            </div>
          </GlassPanel>

          {/* the sub-line — "anyone could believe it". §G4: brightened from
           * white/60–45 (failed AA) to the bone tokens; §G3 equal weight. */}
          <p
            className="mt-5 text-center"
            style={{ fontSize: 'var(--dw-t-body)', lineHeight: 'var(--dw-lh-body)', color: 'var(--dw-bone)' }}
          >
            {c.sub?.en}
          </p>
          <p
            className="mt-1 text-center dw-ar--body"
            dir="rtl"
            style={{ fontSize: 'var(--dw-t-body)', lineHeight: 'var(--dw-lh-body)', color: 'var(--dw-bone-dim)', fontFamily: 'var(--font-body-ar), sans-serif' }}
          >
            {c.sub?.ar}
          </p>
        </motion.div>

        {/* ── The magnetically pulsing Forward button (pointer-only) ── */}
        <div className="mt-8 flex justify-center">
          <ForwardButton sick={greenSaturation} reduce={!!reduce} hazardRGB={t.accentARGB} />
        </div>

        {/* ── THE ONE LAW — the thesis source, with a legible tier badge
         * linked to the evidence key (§G5). ── */}
        <div className="mt-10 flex flex-col items-center gap-3">
          <TierBadge tier={resolveTierKey({ tier: THREAD_SOURCE.tier, source: THREAD_SOURCE.source })} />
          <Sourced
            value="Tier A"
            tier={THREAD_SOURCE.tier}
            source={THREAD_SOURCE.source}
            labelEn={'the viral “insulin is a lie” claim'}
            labelAr={'ادّعاء «الأنسولين كذبة» اللي بقى ترند'}
            accent={GREEN}
          />
        </div>
      </div>

      {/* ── The descent lie-tape rakes across the base of the section.
       * The phrases render struck-through in hazard red — a museum of
       * the message that kills, never asserted as fact (no <Sourced>
       * needed: nothing here is a truth claim). ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-10"
        style={{ zIndex: 1 }}
      >
        <KineticMarquee zone={ZONE} tone="lie" angle={-4} speed={30} />
      </div>
    </section>
  );
}

/* ───────────────────────────────────────────────────────────────
 * The Forward button. On a fine pointer it pulses and lerps toward
 * the cursor (useSpring) — the seduction to pass the lie on. On
 * touch / reduced-motion it is a static, non-magnetic control.
 * It performs NO forwarding — it is a narrative prop only.
 *
 * v2 §4 M0: the magnetic pulse stays, but the seductive WhatsApp-green
 * fill now sits over a HAZARD-RED glow (the zone accent), so the
 * impulse to forward is visually marked as dangerous.
 * ─────────────────────────────────────────────────────────────── */
function ForwardButton({
  sick,
  reduce,
  hazardRGB,
}: {
  sick: number;
  reduce: boolean;
  hazardRGB: string;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const [fine, setFine] = useState(false);

  // magnetic offset (spring-smoothed)
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 150, damping: 12, mass: 0.4 });
  const sy = useSpring(my, { stiffness: 150, damping: 12, mass: 0.4 });
  // gentle idle pulse scale
  const pulse = useMotionValue(1);
  const scale = useTransform(pulse, (v) => v);

  useEffect(() => {
    if (reduce) return;
    const m = window.matchMedia('(hover:hover) and (pointer:fine)');
    setFine(m.matches);
    const onChange = () => setFine(m.matches);
    m.addEventListener?.('change', onChange);
    return () => m.removeEventListener?.('change', onChange);
  }, [reduce]);

  // idle pulse loop (pointer-only)
  useEffect(() => {
    if (reduce || !fine) return;
    let raf = 0;
    let t = 0;
    const loop = () => {
      t += 0.04;
      pulse.set(1 + Math.sin(t) * 0.05);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [reduce, fine, pulse]);

  const onMove = (e: React.MouseEvent) => {
    if (!fine || reduce) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    mx.set((e.clientX - cx) * 0.4);
    my.set((e.clientY - cy) * 0.4);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  // Hazard-red glow (zone accent A) under the seductive green fill.
  const hazardGlow =
    fine && !reduce
      ? `0 0 26px rgba(${hazardRGB},${0.45 * sick + 0.15}), 0 0 12px rgba(${GREEN_RGB},${0.3 * sick})`
      : `0 0 18px rgba(${hazardRGB},${0.18 * sick})`;

  return (
    <motion.button
      ref={ref}
      type="button"
      aria-label="Forward (a narrative prop — does nothing)"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      onClick={(e) => e.preventDefault()}
      style={{
        x: fine && !reduce ? sx : 0,
        y: fine && !reduce ? sy : 0,
        scale: fine && !reduce ? scale : 1,
        background: `rgba(${GREEN_RGB},${0.14 * sick + 0.05})`,
        border: `1px solid rgba(${hazardRGB},${0.5 * sick + 0.25})`,
        color: GREEN,
        filter: `saturate(${sick})`,
        boxShadow: hazardGlow,
      }}
      className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-semibold select-none"
    >
      <Forward size={16} aria-hidden />
      <span style={{ fontSize: 'var(--dw-t-cta)' }}>Forward</span>
      <span dir="rtl" className="dw-ar--body" style={{ fontSize: 'var(--dw-t-cta)', fontFamily: 'var(--font-body-ar), sans-serif' }}>
        توجيه
      </span>
    </motion.button>
  );
}

export default ThreadSection;
