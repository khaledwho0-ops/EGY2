'use client';
/* ═══════════════════════════════════════════════════════════════
 * useReveal — ONE shared entrance-reveal hook for the DW gateway.
 *
 * This REPLACES framer-motion `whileInView` everywhere on this page.
 * `whileInView` did not fire reliably on /the-descent (frozen smooth-
 * scroll layer + fast flings left sections stuck at opacity:0). This
 * hook is bulletproof:
 *
 *   • an immediate in-viewport check on mount (covers reload-at-
 *     position, content already visible, and reduced-motion),
 *   • a zero-threshold IntersectionObserver (rootMargin
 *     '0px 0px -8% 0px') that latches `true` on the first intersection,
 *   • a passive window-scroll failsafe that re-checks bounds and
 *     reveals anything the observer missed during a fast scroll/jump.
 *
 * Once shown it STAYS shown. SSR-safe: returns `false` on the server,
 * resolves on mount. Consumers toggle the `.is-in` class on the
 * `.dw-reveal` element using the returned boolean.
 *
 * Usage:
 *   const [ref, shown] = useReveal<HTMLDivElement>();
 *   <div ref={ref} className={`dw-reveal ${shown ? 'is-in' : ''}`} />
 * ═══════════════════════════════════════════════════════════════ */

import { useEffect, useRef, useState, type RefObject } from 'react';

export interface UseRevealOptions {
  /** rootMargin for the observer. Default '0px 0px -8% 0px'. */
  rootMargin?: string;
  /** Fraction (0..1) of the element that must be in view for the
   * mount/scroll bounds check. Default 0.01 (the slightest entry). */
  amount?: number;
}

export function useReveal<T extends HTMLElement = HTMLDivElement>(
  options: UseRevealOptions = {}
): [RefObject<T | null>, boolean] {
  const { rootMargin = '0px 0px -8% 0px', amount = 0.01 } = options;
  const ref = useRef<T>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (shown) return;
    const el = ref.current;
    if (!el) return;

    let done = false;
    // `io` is declared up-front (and `onScroll` is a hoisted function) so the
    // immediate-reveal path below can safely call them BEFORE the observer is
    // created. Previously `reveal()` touched `const io`/`const onScroll` while
    // they were still in the temporal dead zone — "Cannot access 'io' before
    // initialization" — which crashed the whole page whenever an element was
    // already in view on mount (e.g. reload mid-scroll).
    let io: IntersectionObserver | null = null;

    const inView = () => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      // visible if its top has entered above the bottom edge (minus the
      // amount margin) AND its bottom is still below the top edge.
      return r.top < vh * (1 - Math.min(amount, 0.5)) && r.bottom > 0;
    };

    function onScroll() {
      if (inView()) reveal();
    }

    const reveal = () => {
      if (done) return;
      done = true;
      setShown(true);
      io?.disconnect();
      window.removeEventListener('scroll', onScroll);
    };

    // 1) immediate check — already in (or above) the viewport on mount.
    if (inView()) {
      reveal();
      return;
    }

    // 2) IntersectionObserver — fires on the slightest entry.
    io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) reveal();
      },
      { rootMargin, threshold: 0 }
    );
    io.observe(el);

    // 3) passive scroll failsafe — outruns a fast fling / jump.
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      io?.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, [shown, rootMargin, amount]);

  return [ref, shown];
}

export default useReveal;
