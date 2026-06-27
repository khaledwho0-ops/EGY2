/* ═══════════════════════════════════════════════════════════════
 * visual/index.ts — the premium primitive barrel for «THE DESCENT» v2.
 *
 * Importing this barrel pulls in the scoped descent-visual.css (the
 * @keyframes + .td-* utilities). The 6 restyle agents import primitives
 * from here; they NEVER hardcode accents — every primitive reads
 * ZONE_THEME via the `zone` prop.
 * ═══════════════════════════════════════════════════════════════ */

import './descent-visual.css';

export { DisplayType, type DisplayTypeProps } from './DisplayType';
export {
  KineticMarquee,
  type KineticMarqueeProps,
  DESCENT_LIE_PHRASES,
  CLIMB_DEFENSE_PHRASES,
} from './KineticMarquee';
export { DuotoneFrame, type DuotoneFrameProps } from './DuotoneFrame';
export { GlassPanel, type GlassPanelProps } from './GlassPanel';
export { OrbField, type OrbFieldProps } from './OrbField';
export { HighlightBox, type HighlightBoxProps } from './HighlightBox';
export { SectionKicker, type SectionKickerProps } from './SectionKicker';
export { ScrollReveal, type ScrollRevealProps } from './ScrollReveal';
export { ParallaxLayer, type ParallaxLayerProps } from './ParallaxLayer';
export { NeonStat, type NeonStatProps } from './NeonStat';
export { GrainOverlay, type GrainOverlayProps } from './GrainOverlay';
export { GradientGrade, type GradientGradeProps } from './GradientGrade';

export { useVisualEnv, type VisualEnv } from './use-visual-env';

// Theme re-exports for convenience (single source of accents).
export {
  ZONE_THEME,
  ZONES,
  theme,
  glow,
  dropGlow,
  gradient,
  textGradient,
  alpha,
  zoneCssVars,
  type Zone,
  type ZoneTheme,
} from '../descent-theme';
