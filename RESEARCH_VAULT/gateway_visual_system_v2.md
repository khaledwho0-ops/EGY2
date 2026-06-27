# GATEWAY VISUAL SYSTEM v2 — "REFERENCE-GRADE" elevation of «THE DESCENT»
## Brief: lift /the-descent to the visual caliber of HydraDB.com + the DESIGN WAVE hero, while preserving the GOD prompt (gateway_god_prompt.md), all 56 atoms (gateway_prompt_atoms.md), every source, the 8-layer narrative, and bilingual RTL.

> This is a SKIN over the already-verified structure. Do NOT remove sources, copy, layers, or the `<Sourced>`/`<LayerTag>`/`<DefenseChip>` discipline. Only elevate the visual layer. Centralize all design tokens so palette is cheap to change.

## 0. Reference distillation (both sources → one kit)
- **HydraDB:** near-black canvas; electric-cyan/blue + violet/magenta neon gradients & glow; bold geometric sans, extreme size contrast, oversized kinetic headings; scroll-reveals; parallax layered hero; animated benchmark data-viz; glassmorphism cards + soft shadow; 3D orbs/blobs; minimal grain. Mood: premium, AI-native, enterprise.
- **DESIGN WAVE:** near-black; HUGE overlapping hot-magenta display type; duotone grayscale portrait fused *into* the type (depth); diagonal kinetic marquee tape (`#DESIGNWAVE`); purple gradient glow; dark 3D spheres; wireframe globe; vertical side label; **boxed highlighted name** ("Anna Davies"); social rail; scroll cue. Mood: bold, kinetic, high-contrast.
- **The shared kit (13 techniques):** (1) near-black canvas, (2) 1–2 neon accents as glow+gradient, (3) massive layered display type (fill + stroke-ghost), (4) duotone imagery fused with type, (5) diagonal kinetic marquee, (6) glowing 3D orbs, (7) glassmorphism, (8) grain, (9) scroll-reveal + parallax, (10) animated data-viz, (11) neon glow on accents, (12) boxed highlight on key terms, (13) vertical side kickers + scroll cue.

## 1. ZONE PALETTES (tonal mapping — NOT literal pink)
Centralize in `src/components/the-descent/descent-theme.ts` (`ZONE_THEME`), consumed by every primitive.

| Zone | Sections | Canvas | Accent A (glow) | Accent B | Mood |
|---|---|---|---|---|---|
| **DESCENT** | M0–M11 | `#08080A` / ramp `#0B0E0C→#1A0F06→#2A0608→#050304` | blood `#E2342F` | toxic amber `#E6B400` | infected, dangerous, DESIGN-WAVE energy |
| **CLIMB** | M12–M14 | `#06121A` | electric cyan `#19E0C8` | violet `#8B5CF6` / emerald `#10B981` | clarity, method, HydraDB-premium |
| **ENTERPRISE** | M15–M16 | `#0B0A06` | gold `#F0C030` | cyan `#19E0C8` | executive, the most polished moment |

Glow = `box-shadow: 0 0 40px -8px <accent>` + `filter: drop-shadow`. Gradients = 135deg accentA→accentB at low alpha. The M12 FLIP cross-fades DESCENT→CLIMB palette (already wired — now also swap accent vars).

## 2. NEW PREMIUM PRIMITIVES (build once, reuse everywhere) — `src/components/the-descent/visual/`
All accept a `zone` prop (descent|climb|enterprise) → pull tokens from `ZONE_THEME`. All have reduced-motion + <768px fallbacks.
1. **`DisplayType`** `{ en, ar, size?, stroke?, clip? }` — massive layered headline: a filled layer + 1–2 offset stroke-outline "ghost" layers (`-webkit-text-stroke`), optional `background-clip:text` gradient, optional image-clip. Arabic uses `var(--font-heading-ar)`, never splits glyphs. THE biggest hook (M0/M16 «النزول» / THE DESCENT, M14 climb title).
2. **`KineticMarquee`** `{ items, angle?, speed?, zone, tone? }` — diagonal scrolling tape (CSS `@keyframes` translate, duplicated track for seamless loop). DESCENT tape = real Arabic lie-phrases (الأنسولين كذبة · الدوا ثانوي · مصر اكتشفت العلاج · حقنة بتجيب الشفا) in blood-red tape with hazard stripes; CLIMB tape = the defense techniques. Reduced-motion = static angled strip.
3. **`DuotoneFrame`** `{ src?|shape, from, to, zone }` — grayscale→accent duotone (SVG `feColorMatrix` or CSS `filter: grayscale() ` + blend), for a figure/silhouette ("you"/victim) fused behind/in front of `DisplayType`. If no real asset, use an abstract SVG silhouette/Nile-delta motif — NEVER a stock face implying a real victim.
4. **`GlassPanel`** `{ zone, glow?, children }` — `backdrop-filter: blur(20px) saturate(160%)`, hairline gradient border (`mask` trick), inner top highlight, accent glow shadow. Replaces the plain `.glass-card` for case cards, tool cards, enterprise card.
5. **`OrbField`** `{ zone, count?, parallax? }` — absolutely-positioned radial-gradient spheres, slow drift + scroll parallax (transform only), behind content, `pointer-events:none`. Complements the existing R3F particle field. Reduced-motion = static.
6. **`HighlightBox`** `{ children, zone }` — the "Anna Davies" boxed term: thin accent border + faint fill + corner ticks, for key terms (a victim's condition, a layer name, "ENTERPRISE AWARENESS", a death stat).
7. **`SectionKicker`** `{ en, ar, zone }` — vertical (writing-mode) side label + index (e.g. "01 — THE THREAD"), like DESIGN WAVE's side text.
8. **`ScrollReveal`** `{ children, y?, delay? }` — framer `whileInView` mask/translate reveal (lines, cards). 
9. **`ParallaxLayer`** `{ speed, children }` — scroll-velocity depth (reads ScrollContext, transform only).
10. **`NeonStat`** — wraps `<Sourced>`/`AnimatedCounter` with accent glow + mono tabular figures (Arabic-Indic), benchmark-chip styling.
11. **`GrainOverlay`** (enhance existing) — feTurbulence grain + scanline, per-zone opacity.
12. **`GradientGrade`** (enhance existing) — per-zone 135deg gradient wash + clamped velocity hue-rotate.

## 3. GLOBAL CSS ADDITIONS (scoped, in a `the-descent` style block or globals additive section)
`@keyframes marquee-x`, `@keyframes orb-drift`, `@keyframes glow-pulse`, `.td-glass` mask-border util, `.td-display-stroke` (`-webkit-text-stroke`), grain/scanline layers. Keep additive; do not edit unrelated globals.

## 4. PER-SECTION RESTYLE DIRECTIVES (apply the kit; keep all content/sources)
- **M0 thread:** WhatsApp bubble inside a `GlassPanel`; behind it a giant ghost `DisplayType` «النزول/THE DESCENT» + `OrbField` (red) + DESCENT `KineticMarquee` of lie-phrases at the base; `SectionKicker` "00". The Forward button keeps magnetic pulse but now a hazard-red glow.
- **M1 pull / M1.5 problem:** `DisplayType` headline; `NeonStat` count-ups (14.5% etc.) as glowing benchmark chips; the three gaps as `HighlightBox` chips; `ScrollReveal` lines.
- **M2–M9 shaft (`DescentLayer`):** each rung = `GlassPanel` case card over a giant ghost layer numeral via `DisplayType`(stroke-only `−n`); accent glow from `ZONE_THEME`; `DuotoneFrame` silhouette per layer; the **FLATLINE (M6)** gets max red glow + grain spike. `LayerTag`/`DefenseChip` keep their data role but restyled neon.
- **M10 blast-radius:** the Egypt choropleth gets a **wireframe-glow** skin (thin glowing governorate strokes, accent fill on active domain) — this is the "wireframe globe" mapping; petals as `GlassPanel`s; keep the "modeled distribution" label + a11y table.
- **M11 floor:** near-black, single red orb, grain max, one `DisplayType` line.
- **M12 FLIP:** unchanged mechanic, but now also swaps accent CSS vars DESCENT→CLIMB and the `KineticMarquee`/`OrbField` palette.
- **M13 tools:** filmstrip cards → `GlassPanel` with cyan glow + a mini animated pipeline; each tool strength as a `NeonStat`/benchmark chip (HydraDB benchmark vibe).
- **M14 cognition:** `DisplayType` climb title; the `@nivo/radar` restyled neon (cyan grid, glow fill); per-rung `HighlightBox` technique names.
- **M15 enterprise:** the showpiece — a large `GlassPanel` "enterprise" card, gold+cyan `GradientGrade`, `DisplayType` "ENTERPRISE AWARENESS", `HighlightBox` on the tier name, dashboard mock with neon `recharts`/`@nivo`; magnetic CTA with gold glow.
- **M16 door:** `DisplayType` final line, door aperture with accent glow, calm orb drift.

## 5. CONSTRAINTS (unchanged from the GOD prompt)
Installed libs only (framer-motion, gsap, lenis, three/r3f/drei, d3, recharts, @nivo/radar, canvas-confetti). No new deps. Animate transform/opacity/filter only. Every animated block: `prefers-reduced-motion` + `min-width:768px` fallback. RTL + Arabic-Indic digits; SplitText lines/words only, never scripture. One-Law: every claim still through `<Sourced>`. No `smooth-scroll.tsx`. Keep `/the-descent` in PAGE_ORDER. tsc must stay clean for the page. Coherence: every primitive reads `ZONE_THEME` — do not hardcode accents in sections.
