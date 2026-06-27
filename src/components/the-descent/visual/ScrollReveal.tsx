'use client';
/* ═══════════════════════════════════════════════════════════════
 * ScrollReveal — BULLETPROOF entrance reveal (v2 §2.8, hardened).
 *
 * The earlier version used framer `whileInView` with a high `amount`
 * threshold. On a fast scroll — or the Skip-to-door jump — a section
 * could sail past without ever meeting the threshold and stay frozen
 * at `opacity:0` FOREVER (the "blank page" failure). This version can
 * never leave content hidden:
 *   • reveals immediately if the element is already in / above the
 *     viewport on mount (covers reload-at-position + reduced cases),
 *   • a tiny-threshold IntersectionObserver fires on the slightest
 *     entry,
 *   • a passive scroll listener re-checks as a final failsafe and
 *     reveals anything the observer missed during a fling/jump.
 * Once shown, it stays shown. Reduced-motion → rendered fully visible.
 * ═══════════════════════════════════════════════════════════════ */

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export interface ScrollRevealProps {
  children: ReactNode;
  /** Initial Y offset in px. Default 28. */
  y?: number;
  /** Stagger/entry delay in seconds. */
  delay?: number;
  /** Duration override. Default 0.6. */
  duration?: number;
  /** Fraction of the element that must enter before revealing. Default 0.01. */
  amount?: number;
  /** Reveal only once (kept for API compatibility; reveal is always latched). */
  once?: boolean;
  className?: string;
  as?: 'div' | 'li' | 'section' | 'span';
}

export function ScrollReveal({
  children,
  y = 28,
  delay = 0,
  duration = 0.6,
  amount = 0.01,
  className = '',
  as = 'div',
}: ScrollRevealProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (shown) return;
    const el = ref.current;
    if (!el) return;

    // Reveal if the element is already within (or above) the viewport.
    const inView = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      return r.top < vh * (1 - Math.min(amount, 0.5)) && r.bottom > 0;
    };

    if (inView()) {
      setShown(true);
      return;
    }

    let done = false;
    const reveal = () => {
      if (done) return;
      done = true;
      setShown(true);
      io.disconnect();
      window.removeEventListener('scroll', onScroll);
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) reveal();
      },
      { rootMargin: '0px 0px -5% 0px', threshold: 0 }
    );
    io.observe(el);

    // Failsafe: a fast fling / programmatic jump can outrun the observer.
    const onScroll = () => {
      if (inView()) reveal();
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      io.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, [amount, shown]);

  if (reduce) {
    const Tag = as;
    return (
      <Tag ref={ref as never} className={className}>
        {children}
      </Tag>
    );
  }

  const MotionTag = motion[as];
  return (
    <MotionTag
      ref={ref as never}
      className={className}
      initial={{ opacity: 0, y, clipPath: 'inset(0 0 100% 0)' }}
      animate={shown ? { opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)' } : undefined}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </MotionTag>
  );
}

export default ScrollReveal;
