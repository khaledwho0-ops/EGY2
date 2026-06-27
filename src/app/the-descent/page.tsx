'use client';
/* ═══════════════════════════════════════════════════════════════
 * /the-descent page — the gateway entry point.
 *
 * Native document scroll (NOT Lenis). An earlier build wrapped this in
 * <ReactLenis root autoRaf:false> bridged to gsap.ticker — but the
 * bridge never drove Lenis (useLenis() timing), leaving a FROZEN smooth-
 * scroll layer that hijacked the wheel, pinned scrollTop at 0, and
 * stopped every IntersectionObserver / framer whileInView from firing
 * (the "blank page" failure). Native scroll lets the viewport observers
 * AND GSAP ScrollTrigger self-manage correctly. Smooth scroll can be
 * re-introduced later with a verified Lenis↔ScrollTrigger bridge.
 * ═══════════════════════════════════════════════════════════════ */

import { ScrollProvider } from '@/components/six-layers/ScrollContext';
import { DescentExperience } from '@/components/the-descent/DescentExperience';

export default function TheDescentPage() {
  return (
    <ScrollProvider>
      <DescentExperience />
    </ScrollProvider>
  );
}
