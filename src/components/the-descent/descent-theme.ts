/* ═══════════════════════════════════════════════════════════════
 * descent-theme.ts — THE SINGLE SOURCE OF ACCENTS for «THE DESCENT» v2.
 *
 * v2 §1 ZONE PALETTES. Every premium primitive in visual/* reads
 * ZONE_THEME[zone] — sections MUST NOT hardcode accents. The M12 FLIP
 * swaps the page-level CSS custom properties DESCENT→CLIMB, and M15
 * swaps CLIMB→ENTERPRISE, so the whole page shifts palette by editing
 * one token set rather than every section.
 *
 * Mapping (v2 §1):
 *   DESCENT   M0–M11  blood #E2342F  + toxic amber #E6B400  (canvas #08080A)
 *   CLIMB     M12–M14 cyan  #19E0C8  + violet     #8B5CF6   (canvas #06121A)
 *   ENTERPRISE M15–M16 gold #F0C030  + cyan       #19E0C8   (canvas #0B0A06)
 *
 * Pure data + pure string helpers — no React, no DOM, no side effects.
 * Safe to import from client and server components alike.
 * ═══════════════════════════════════════════════════════════════ */

export type Zone = 'descent' | 'climb' | 'enterprise';

export interface ZoneTheme {
  /** Near-black canvas for the zone. */
  canvas: string;
  /** Primary glow accent (hex). */
  accentA: string;
  /** Secondary accent (hex). */
  accentB: string;
  /** `r, g, b` triplet for accentA — for rgba() composition. */
  accentARGB: string;
  /** `r, g, b` triplet for accentB. */
  accentBRGB: string;
  /** 4-stop tonal ramp top→bottom (the master canvas gradient stops). */
  ramp: [string, string, string, string];
}

/* ── §1 palette table, verbatim ── */
export const ZONE_THEME: Record<Zone, ZoneTheme> = {
  descent: {
    canvas: '#08080A',
    accentA: '#E2342F', // blood
    accentB: '#E6B400', // toxic amber
    accentARGB: '226, 52, 47',
    accentBRGB: '230, 180, 0',
    ramp: ['#0B0E0C', '#1A0F06', '#2A0608', '#050304'],
  },
  climb: {
    canvas: '#06121A',
    accentA: '#19E0C8', // electric cyan
    accentB: '#8B5CF6', // violet
    accentARGB: '25, 224, 200',
    accentBRGB: '139, 92, 246',
    ramp: ['#06121A', '#0A1A18', '#0E1C18', '#081410'],
  },
  enterprise: {
    canvas: '#0B0A06',
    accentA: '#F0C030', // gold
    accentB: '#19E0C8', // cyan
    accentARGB: '240, 192, 48',
    accentBRGB: '25, 224, 200',
    ramp: ['#0B0A06', '#141008', '#100E08', '#070602'],
  },
};

/* ════════════════════════ HELPERS ════════════════════════ */

/** Resolve a zone (defaults to descent) → its theme. */
export function theme(zone: Zone = 'descent'): ZoneTheme {
  return ZONE_THEME[zone] ?? ZONE_THEME.descent;
}

/**
 * glow(zone, opts) → a `box-shadow` string per v2 §1
 * (`0 0 40px -8px <accent>` + a tighter inner ring). Use on accents,
 * stats, glass panels, orbs, CTAs.
 */
export function glow(
  zone: Zone = 'descent',
  opts: { radius?: number; strength?: number; which?: 'A' | 'B' } = {}
): string {
  const t = theme(zone);
  const { radius = 40, strength = 0.55, which = 'A' } = opts;
  const rgb = which === 'B' ? t.accentBRGB : t.accentARGB;
  return `0 0 ${radius}px -8px rgba(${rgb}, ${strength}), 0 0 ${Math.round(
    radius / 3
  )}px -10px rgba(${rgb}, ${Math.min(1, strength + 0.2)})`;
}

/** A matching CSS `filter: drop-shadow(...)` for SVG / text accents. */
export function dropGlow(zone: Zone = 'descent', strength = 0.5, which: 'A' | 'B' = 'A'): string {
  const t = theme(zone);
  const rgb = which === 'B' ? t.accentBRGB : t.accentARGB;
  return `drop-shadow(0 0 14px rgba(${rgb}, ${strength}))`;
}

/**
 * gradient(zone, opts) → a 135deg accentA→accentB gradient at low alpha
 * (v2 §1). Use for glass washes, panel borders, GradientGrade, tape.
 */
export function gradient(
  zone: Zone = 'descent',
  opts: { angle?: number; aFrom?: number; bTo?: number } = {}
): string {
  const t = theme(zone);
  const { angle = 135, aFrom = 0.14, bTo = 0.1 } = opts;
  return `linear-gradient(${angle}deg, rgba(${t.accentARGB}, ${aFrom}) 0%, rgba(${t.accentBRGB}, ${bTo}) 100%)`;
}

/** A solid-stop version of the zone gradient for text background-clip. */
export function textGradient(zone: Zone = 'descent', angle = 120): string {
  const t = theme(zone);
  return `linear-gradient(${angle}deg, ${t.accentA} 0%, ${t.accentB} 100%)`;
}

/** rgba() of an accent at a given alpha. */
export function alpha(zone: Zone = 'descent', a = 1, which: 'A' | 'B' = 'A'): string {
  const t = theme(zone);
  return `rgba(${which === 'B' ? t.accentBRGB : t.accentARGB}, ${a})`;
}

/**
 * The CSS custom-property set a zone publishes to the page root. The
 * DescentExperience writes these on the scroll boundary so every
 * primitive that reads `var(--td-accent-a)` shifts palette in lockstep
 * with the M12 / M15 transitions.
 */
export function zoneCssVars(zone: Zone): Record<string, string> {
  const t = theme(zone);
  return {
    '--td-zone': zone,
    '--td-canvas': t.canvas,
    '--td-accent-a': t.accentA,
    '--td-accent-b': t.accentB,
    '--td-accent-a-rgb': t.accentARGB,
    '--td-accent-b-rgb': t.accentBRGB,
    '--td-glow': glow(zone),
    '--td-gradient': gradient(zone),
  };
}

export const ZONES: Zone[] = ['descent', 'climb', 'enterprise'];

/* ═══════════════════════════════════════════════════════════════
 * §G6 — 8 FIXED LAYER ACCENTS (the polish spec's color-per-layer law)
 *
 * One color per deception layer, fixed forever. The SAME accent paints
 * that layer's giant numeral, card border, tag, rail tick, and panel.
 * Mandated mapping (gateway_polish_spec.md §G6):
 *   L1 red · L2 amber · L3 violet · L4 cyan-blue · L5 green ·
 *   L6 magenta · L7 steel · L8 pale
 *
 * NOTE: this intentionally SUPERSEDES the older DESCENT_LAYER_COLORS
 * keys 5/7 (which were arterial-red / ember) so all 8 are visually
 * distinct and never blend into a neighbour. Sections should read
 * LAYER_ACCENTS for per-layer chrome; ZONE_THEME still drives the
 * three zone moods (canvas / glow wash / gradient).
 * ═══════════════════════════════════════════════════════════════ */

export type LayerId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export interface LayerAccent {
  /** The fixed hex accent for this layer. */
  hex: string;
  /** `r, g, b` triplet for rgba() composition. */
  rgb: string;
  /** Short English token (for legend + aria). */
  label: string;
}

export const LAYER_ACCENTS: Record<LayerId, LayerAccent> = {
  1: { hex: '#FF4D4D', rgb: '255, 77, 77', label: 'red' }, // Absolute Fabrication
  2: { hex: '#F5A623', rgb: '245, 166, 35', label: 'amber' }, // Biased Lens
  3: { hex: '#A855F7', rgb: '168, 85, 247', label: 'violet' }, // Decontextualization
  4: { hex: '#2EA8FF', rgb: '46, 168, 255', label: 'cyan-blue' }, // Weaponized Timing
  5: { hex: '#3FCB6B', rgb: '63, 203, 107', label: 'green' }, // Evil Application
  6: { hex: '#FF49D8', rgb: '255, 73, 216', label: 'magenta' }, // The Matrix
  7: { hex: '#AEB9C7', rgb: '174, 185, 199', label: 'steel' }, // The Architects
  8: { hex: '#DAD6CC', rgb: '218, 214, 204', label: 'pale' }, // The Unknown
};

/** Resolve a layer number (1..8) → its fixed accent (clamped, defaults L1). */
export function layerAccent(n: number): LayerAccent {
  const id = Math.min(8, Math.max(1, Math.round(n))) as LayerId;
  return LAYER_ACCENTS[id] ?? LAYER_ACCENTS[1];
}

/** Box-shadow glow string for a layer accent (numeral, border, tick). */
export function layerGlow(n: number, radius = 32, strength = 0.5): string {
  const { rgb } = layerAccent(n);
  return `0 0 ${radius}px -8px rgba(${rgb}, ${strength}), 0 0 ${Math.round(
    radius / 3
  )}px -10px rgba(${rgb}, ${Math.min(1, strength + 0.2)})`;
}

/** drop-shadow filter for SVG / text on a layer accent. */
export function layerDropGlow(n: number, strength = 0.5): string {
  const { rgb } = layerAccent(n);
  return `drop-shadow(0 0 12px rgba(${rgb}, ${strength}))`;
}

/** rgba() of a layer accent at a given alpha. */
export function layerAlpha(n: number, a = 1): string {
  const { rgb } = layerAccent(n);
  return `rgba(${rgb}, ${a})`;
}

/**
 * The CSS custom-property set a layer publishes. A DescentLayer wrapper
 * writes these so every child (numeral, card border, tag, tick, panel)
 * can read `var(--td-layer-accent)` without prop-drilling the hex.
 */
export function layerCssVars(n: number): Record<string, string> {
  const { hex, rgb } = layerAccent(n);
  return {
    '--td-layer-accent': hex,
    '--td-layer-accent-rgb': rgb,
    '--td-layer-glow': layerGlow(n),
  };
}

/* ── §G5 — Evidence-tier vocabulary (single source for TierLegend/Badge) ── */

export type TierKey = 'S' | 'A' | 'B' | 'C' | 'CONTESTED' | 'UNVERIFIED';

export interface TierMeta {
  key: TierKey;
  /** Fixed hex for the badge chrome. */
  hex: string;
  rgb: string;
  /** One-line meaning, bilingual. */
  meaning: { en: string; ar: string };
}

export const TIER_META: Record<TierKey, TierMeta> = {
  S: {
    key: 'S',
    hex: '#3FCB6B',
    rgb: '63, 203, 107',
    meaning: {
      en: 'Tier S — systematic review, RCT, or official registry. Strongest.',
      ar: 'الفئة S — مراجعة منهجية أو تجربة معشّاة أو سجل رسمي. الأقوى.',
    },
  },
  A: {
    key: 'A',
    hex: '#2EA8FF',
    rgb: '46, 168, 255',
    meaning: {
      en: 'Tier A — peer-reviewed study, named institution, or court record.',
      ar: 'الفئة A — دراسة محكّمة أو مؤسسة مُسمّاة أو سجل قضائي.',
    },
  },
  B: {
    key: 'B',
    hex: '#F5A623',
    rgb: '245, 166, 35',
    meaning: {
      en: 'Tier B — credible reporting or corpus count; corroborated.',
      ar: 'الفئة B — تقرير موثوق أو عدّ من المتن؛ مؤيَّد.',
    },
  },
  C: {
    key: 'C',
    hex: '#C98A3A',
    rgb: '201, 138, 58',
    meaning: {
      en: 'Tier C — single secondary source; weakest admissible.',
      ar: 'الفئة C — مصدر ثانوي واحد؛ الأضعف المقبول.',
    },
  },
  CONTESTED: {
    key: 'CONTESTED',
    hex: '#A368F0',
    rgb: '163, 104, 240',
    meaning: {
      en: 'Contested — figure disputed across outlets; shown, not asserted.',
      ar: 'متنازَع عليه — رقم مختلف عليه بين المصادر؛ يُعرض ولا يُجزم به.',
    },
  },
  UNVERIFIED: {
    key: 'UNVERIFIED',
    hex: '#FF4D4D',
    rgb: '255, 77, 77',
    meaning: {
      en: 'Unverified — no resolvable source. Fails the One-Law; never trust.',
      ar: 'غير مُتحقَّق — لا مصدر يمكن الرجوع إليه. يخالف القانون الأوحد؛ لا تثق.',
    },
  },
};

export const TIER_ORDER: TierKey[] = ['S', 'A', 'B', 'C', 'CONTESTED', 'UNVERIFIED'];

export function tierMeta(key: TierKey): TierMeta {
  return TIER_META[key] ?? TIER_META.UNVERIFIED;
}
