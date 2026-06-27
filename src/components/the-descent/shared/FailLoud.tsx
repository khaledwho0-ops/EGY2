'use client';
/* ═══════════════════════════════════════════════════════════════
 * FailLoud.tsx — the visible "we don't have this" card.
 *
 * When real data/geometry/an API result is missing, we NEVER
 * fabricate a fill. We render this loud red card so the gap is
 * honest and obvious. Used by EgyptChoropleth (no geojson), live API
 * cards (no result), and any block whose source is absent.
 * ═══════════════════════════════════════════════════════════════ */

import type { ReactNode } from 'react';

export interface FailLoudProps {
  /** What is missing (EN). */
  reasonEn: string;
  /** What is missing (AR). */
  reasonAr: string;
  /** Optional accessible fallback content (e.g. an a11y <table>). */
  children?: ReactNode;
}

export function FailLoud({ reasonEn, reasonAr, children }: FailLoudProps) {
  return (
    <div
      role="alert"
      className="rounded-2xl border-2 p-6 my-4"
      style={{ borderColor: '#ef4444', background: 'rgba(239,68,68,0.06)' }}
      data-fail-loud
    >
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xl" aria-hidden>
          ⚠
        </span>
        <span
          className="text-xs font-mono uppercase tracking-widest font-bold"
          style={{ color: '#ef4444' }}
        >
          UNVERIFIED — DATA UNAVAILABLE
        </span>
      </div>
      <p className="text-sm text-white/75 leading-relaxed">{reasonEn}</p>
      <p
        className="text-sm text-white/50 leading-relaxed mt-1.5"
        dir="rtl"
        style={{ fontFamily: 'var(--font-heading-ar), sans-serif' }}
      >
        {reasonAr}
      </p>
      {children && <div className="mt-4">{children}</div>}
    </div>
  );
}

export default FailLoud;
