# FEATURE CATALOG — comp-4
## Strategy: UI Components
## Slice: items 154..205 (effective 154–205, 52 files)
## Generated: 2026-06-26

---

## GROUP A — Sources Components
*`src/components/sources/`*

---

### 154 · ComprehensiveResourceDirectory
- **NAME:** ComprehensiveResourceDirectory
- **EXPLANATION:** Renders `COMPREHENSIVE_RESOURCE_CATEGORIES` (a large multi-category array) as scrollable categorized cards with in-page anchor navigation. `useRTL` drives bilingual EN/AR layout including RTL text alignment.
- **USE CASE:** Full resource-directory page section; reader can jump to a category (academic, fact-check, crisis, etc.) by clicking anchor links in the sidebar.
- **PATH:** `src/components/sources/comprehensive-resource-directory.tsx`

---

### 155 · MegaMenu
- **NAME:** MegaMenu
- **EXPLANATION:** A searchable, multi-column overlay menu listing ~22 top sources grouped by category (fact_check / health / religion / academic / crisis). Each source card displays a trust-band badge (A/B/C), an icon, and a short description. Keyboard accessible: Escape closes, click-outside closes. Companion export `TrustedQuickAccess` is a navbar pill that toggles the MegaMenu overlay.
- **USE CASE:** Site-wide "Trusted Sources" quick-access panel reachable from the top navigation bar.
- **PATH:** `src/components/sources/mega-menu.tsx`

#### Sub-feature: TrustedQuickAccess
- **NAME:** TrustedQuickAccess
- **EXPLANATION:** Small navbar pill button that opens/closes MegaMenu. Shows trust-band color badge.
- **USE CASE:** Persistent top-nav affordance for the sources mega-menu.
- **PATH:** `src/components/sources/mega-menu.tsx`

---

### 156 · SourceRegistry
- **NAME:** SourceRegistry
- **EXPLANATION:** Full source-registry viewer with a sticky search bar, MVP-filter dropdown, and trust-band filter dropdown. Renders expandable source cards showing: freshness badge (fresh/aging/stale/expired via `checkFreshness()`), "why trusted" narrative, source role, evidence level, jurisdiction, and last-verified date. One-Law compliant — no unsourced claims.
- **USE CASE:** `/sources` registry page; researchers verify which sources EAL treats as authoritative and why.
- **PATH:** `src/components/sources/source-registry.tsx`

---

## GROUP B — The Descent: Top-Level Sections
*`src/components/the-descent/` (non-nested .tsx files)*

---

### 157 · BlastRadiusSection
- **NAME:** BlastRadiusSection
- **EXPLANATION:** Scene M10 "THE BLAST RADIUS". Renders a central YOU-avatar surrounded by 5 domain-node rings (medical/religious/economic/political/social). Node size is proportional to headline statistic magnitude. Domain filter chips recolor an `EgyptChoropleth` map and show a sourced-stat detail panel via `<Sourced>`. `TierLegend` included. `useReveal` for entrance animations.
- **USE CASE:** Visualizes the multi-domain blast radius of health misinformation on Egyptian society, tied to scroll-step domain switching.
- **PATH:** `src/components/the-descent/BlastRadiusSection.tsx`

---

### 158 · ClimbTurnSection
- **NAME:** ClimbTurnSection
- **EXPLANATION:** Scene M12 "THE FLIP" — the palette pivot from descent (arterial-red) to climb (cyan). Uses `useReveal` to latch `.is-in`, then pure CSS cross-fades the background, swaps FALL→RISE headlines, and drains the depth gauge. Sets `localStorage['eal-descent-seen']='1'` on first entry to enable skip-on-return. Defense-technique marquee tape anchors the base.
- **USE CASE:** Narrative turning point in the scroll story; shifts the entire DW color system from dark/red to cyan/hopeful.
- **PATH:** `src/components/the-descent/ClimbTurnSection.tsx`

---

### 159 · CognitionShaft
- **NAME:** CognitionShaft
- **EXPLANATION:** Scene M14 "COGNITION" — a scroll-driven ladder where a `useEffect` scroll listener drives a `fill` state (0-8) revealing how many deception rungs have been "overwritten" by defense knowledge. Each rung shows: struck deception name → overwritten-by defense technique → cognition sentence → citation. Hosts a `@nivo/radar` chart of defense efficacy, an inoculation arsenal list, and an honest caveat. EN⇄AR toggle.
- **USE CASE:** Progressive cognitive inoculation sequence; reader sees each deception layer explicitly replaced by a defense technique as they scroll.
- **PATH:** `src/components/the-descent/CognitionShaft.tsx`

---

### 160 · DepthRail
- **NAME:** DepthRail
- **EXPLANATION:** Fixed side-navigation gauge showing depth scale −8 to +8. `IntersectionObserver` tracks the active section from `DEPTH_RAIL_STOPS`. Animated fill gauge grows from bottom as descent depth increases. Compact mode for viewports <768px shows only the spine (no labels). Accent color adapts per active zone via `theme(zone)`. Stop ticks are clickable and smooth-scroll to their sections.
- **USE CASE:** Persistent side-rail orientation aid telling the reader how deep they are in the deception layers and allowing direct navigation.
- **PATH:** `src/components/the-descent/DepthRail.tsx`

---

### 161 · DescentExperience
- **NAME:** DescentExperience
- **EXPLANATION:** Main orchestrator for the entire `/the-descent` page. Wraps all content in `.dw-root`. Manages: returning-visitor fast-path via localStorage skip flag, native-scroll→ScrollContext (progress/velocity), zone-palette swap via IntersectionObserver on `[data-descent-section]` elements, and mouse-position tracking. Renders all 20 scenes in document order. Hosts fixed Skip button, `GrainOverlay`, `GradientGrade`, `OrbField`, `DepthRail`.
- **USE CASE:** Single root component imported by the `/the-descent` Next.js page; owns all shared scroll and visual state.
- **PATH:** `src/components/the-descent/DescentExperience.tsx`

---

### 162 · DescentLayer
- **NAME:** DescentLayer
- **EXPLANATION:** Data-driven component for a single deception rung, driven by prop `n` (1-8). Renders: giant ghost numeral `−{n}`, `AccentLayerTag`, second-person "you" beat, `CaseCard` (ESC-dismissible modal), per-layer `LayerViz` micro-visualization (dispatched by layer number), EN⇄AR toggle, depth gauge bar, `DuotoneFrame` figure, ambient glow, depth vignette, grain.
- **USE CASE:** Each of the 8 deception-layer sections in the descent narrative; single component parameterized by layer index.
- **PATH:** `src/components/the-descent/DescentLayer.tsx`

#### Sub-feature: LayerViz (internal dispatcher)
- **NAME:** LayerViz
- **EXPLANATION:** Internal switch dispatching per-layer micro-visualizations: L1=SVG citation chain, L2=split-bar chart, L3=quote restoration clip-path wipe, L4=SVG timeline, L5=Flatline ECG SVG, L6=backfire SVG, L7=FlowMap, L8=confidence-band chart. L5 Flatline animates stroke-dashoffset on an SVG path showing insulin death case.
- **USE CASE:** Inline visualization unique to each deception layer's data story.
- **PATH:** `src/components/the-descent/DescentLayer.tsx`

---

### 163 · FloorSection
- **NAME:** FloorSection
- **EXPLANATION:** Scene M11 "THE FLOOR" — deepest, stillest section. Near-black background, single red orb, one slow arterial CSS-keyframe drip animation. Named death-case cards (`the-kill` + `dajjal-marg`) rendered via `<Sourced>`. A pulsing dot reads "…and the lie is still being forwarded."
- **USE CASE:** Emotional nadir of the descent narrative; the moment the fatal consequence is stated with maximum stillness.
- **PATH:** `src/components/the-descent/FloorSection.tsx`

---

### 164 · GatewayDoor
- **NAME:** GatewayDoor
- **EXPLANATION:** Scene M16 "THE DOOR" — gold enterprise-zone finale. CSS stroke-draw SVG door aperture with two leaves that slide apart on `.is-open`. 26 deterministic SSR-safe dust motes with seeded positions. Final lines reveal via clip-path. CTAs: `href="/six-layers"` + home link. "Next · Welcome" cinematic nav below.
- **USE CASE:** Exit portal of the descent; transitions reader toward the next chapter (`/six-layers`) in the platform.
- **PATH:** `src/components/the-descent/GatewayDoor.tsx`

---

### 165 · ProblemSection
- **NAME:** ProblemSection
- **EXPLANATION:** Scene M1.5 "THE GAP" — three knowledge-gap cards (reach / verify / apply) with icons. Danger escalation chips cycle: Real → Harmful → Dangerous → "Single most dangerous thing." Pulsing "killed" word animation. EN⇄AR toggle.
- **USE CASE:** Early-descent framing of why misinformation gaps are lethal, before the 8 layers are introduced.
- **PATH:** `src/components/the-descent/ProblemSection.tsx`

---

### 166 · ThreadSection
- **NAME:** ThreadSection
- **EXPLANATION:** Scene M0 "THE THREAD" — cold-open WhatsApp simulation. GlassPanel chat bubble with WhatsApp green (#1FA855). "Sick" desaturation effect tied to scroll progress (green drains as user scrolls away). Magnetic `ForwardButton` using `useSpring/useMotionValue` (pointer-fine only, idle pulse). `KineticMarquee` of lie-phrases at base. `<Sourced>` for Al-Awadi insulin claim. `DisplayType` ghost backdrop.
- **USE CASE:** Entry hook; recreates the WhatsApp forward that began a real fatal misinformation chain.
- **PATH:** `src/components/the-descent/ThreadSection.tsx`

---

### 167 · ToolsFilmstrip
- **NAME:** ToolsFilmstrip
- **EXPLANATION:** Scene M13 "THE VERIFICATION ARSENAL" — collapsible instrument rows. Internal `useEvidenceCount` hook calls `/api/search/evidence` live with `AbortController` + 6 s timeout to display real source-count badges. 5-step verification pipeline diagram. Each tool row: name, strength preview, expandable detail with benchmark, honest caveat, live count, `layerGuarded` badges. EN⇄AR toggle.
- **USE CASE:** Shows the reader which verification tools exist for each deception type and fetches live evidence counts from the evidence aggregator API.
- **PATH:** `src/components/the-descent/ToolsFilmstrip.tsx`

#### Sub-feature: useEvidenceCount (hook)
- **NAME:** useEvidenceCount
- **EXPLANATION:** Internal custom hook. Calls `/api/search/evidence` with AbortController and 6 s timeout; returns `{count, loading, error}` for live source counts.
- **USE CASE:** Real-time badge showing how many sources back each verification tool claim.
- **PATH:** `src/components/the-descent/ToolsFilmstrip.tsx`

---

## GROUP C — The Descent: DW Hero + Persistent UI
*`src/components/the-descent/dw/`*

---

### 168 · Hero (DW)
- **NAME:** Hero
- **EXPLANATION:** Cinematic hero for the descent page. Giant bilingual wordmark «النزول» / «THE DESCENT» with ghost-stroke offset layers (`-webkit-text-stroke`). Parallax driven by rAF + CSS var `--dw-px`. Duotone SVG figure (hunched person over phone). Slow wireframe globe SVG. Diagonal lie-phrase marquee tape (struck-through, ≥18px). Bottom-right: death case box «الحِمية اللي قتلت» + CTA pill.
- **USE CASE:** Above-the-fold opener for `/the-descent`; sets the cinematic tone before the scroll story begins.
- **PATH:** `src/components/the-descent/dw/Hero.tsx`

---

### 169 · LayerLegend
- **NAME:** LayerLegend
- **EXPLANATION:** Persistent 8-layer color key. Maps L1–L8 to their fixed accent hex colors and bilingual layer names from `LAYER_DEFENSE_MAP`. Highlights the active layer. Compact mode (swatch + number only) for narrow contexts. RTL-aware.
- **USE CASE:** Sidebar or inline color key showing which deception layer is active; reused across DescentLayer, CognitionShaft, BlastRadiusSection.
- **PATH:** `src/components/the-descent/dw/LayerLegend.tsx`

---

### 170 · TierLegend / TierBadge / TierKeyToggle
- **NAME:** TierBadge
- **EXPLANATION:** Colored evidence-tier badge (S/A/B/C/CONTESTED/UNVERIFIED) with tooltip showing tier title. Optional link to the legend anchor. `resolveTierKey()` function maps `{tier, contested, source}` to the correct `TierKey` enum value.
- **USE CASE:** Inline trust badge on any `<Sourced>` claim or source card.
- **PATH:** `src/components/the-descent/dw/TierLegend.tsx`

#### Sub-feature: TierLegend (compact key)
- **NAME:** TierLegend
- **EXPLANATION:** Compact horizontal key listing all tier badges with labels. Used in BlastRadiusSection and EgyptChoropleth.
- **USE CASE:** Legend strip explaining the evidence tier scale.
- **PATH:** `src/components/the-descent/dw/TierLegend.tsx`

#### Sub-feature: TierKeyToggle
- **NAME:** TierKeyToggle
- **EXPLANATION:** Fixed floating affordance that expands/collapses the full TierLegend overlay.
- **USE CASE:** Persistent page-level shortcut to the tier legend without disrupting scroll.
- **PATH:** `src/components/the-descent/dw/TierLegend.tsx`

#### Sub-feature: resolveTierKey
- **NAME:** resolveTierKey
- **EXPLANATION:** Pure function: maps `{tier, contested, source}` → `TierKey`. Escalates to UNVERIFIED when source is empty.
- **USE CASE:** Centralized logic to decide which tier badge to render, used by both TierBadge and Sourced.
- **PATH:** `src/components/the-descent/dw/TierLegend.tsx`

---

## GROUP D — The Descent: DW Layer Scenes
*`src/components/the-descent/dw/scenes/`*

---

### 171 · ArchitectsSection
- **NAME:** ArchitectsSection
- **EXPLANATION:** Layer 7 "THE ARCHITECTS." SVG constellation graph with 7 nodes; the YOU node (index 2) is wired in red. Two example cards (worldwide + Egypt). Sources `STATS.hoggPoolOfficial`. Animated CSS perspective-grid net background. EN⇄AR toggle.
- **USE CASE:** Layer 7 scene visualizing institutional/systemic actors amplifying misinformation through a network metaphor.
- **PATH:** `src/components/the-descent/dw/scenes/ArchitectsSection.tsx`

---

### 172 · BiasedLensScene
- **NAME:** BiasedLensScene
- **EXPLANATION:** Layer 2 "BIASED LENS." Iceberg SVG where the bright tip represents testimonials (what is shown) and the vast dark underwater mass represents omitted deaths (what is hidden). 5 floating orange bubbles animate upward. `<Sourced>` for the case. EN⇄AR toggle.
- **USE CASE:** Cinematic Layer 2 scene illustrating selection bias through the iceberg metaphor.
- **PATH:** `src/components/the-descent/dw/scenes/BiasedLensScene.tsx`

---

### 173 · DecontextScene
- **NAME:** DecontextScene
- **EXPLANATION:** Layer 3 cinematic version. Renders fragment «الطيّب/الخبيث» isolated, then a restoration line draws across it and context is restored via clip-path wipe. Never splits Arabic scripture. Purple accent.
- **USE CASE:** Dramatic Layer 3 scene showing decontextualized religious text then restoring the full verse.
- **PATH:** `src/components/the-descent/dw/scenes/DecontextScene.tsx`

---

### 174 · DecontextSection
- **NAME:** DecontextSection
- **EXPLANATION:** Layer 3 detailed magazine-style version. Shows Darwin's "eye seems absurd" quote. Red fragment (what they show) vs. gold full answer (what they delete). "AHA" explanation panel. Uses `<Sourced>` for Darwin 1859. EN⇄AR toggle.
- **USE CASE:** Longer Layer 3 section showing a scientific decontextualization example alongside the religious example.
- **PATH:** `src/components/the-descent/dw/scenes/DecontextSection.tsx`

---

### 175 · FabricationScene
- **NAME:** FabricationScene
- **EXPLANATION:** Layer 1 "ABSOLUTE FABRICATION." SVG citation-chain diagram: 3 real nodes → void/X node. Rising ember particles. Stats: 8,045 seized drug packages + 183+ corpus fraud cases — all rendered via `<Sourced>` inline. EN⇄AR toggle.
- **USE CASE:** Layer 1 scene visualizing the fabrication chain from false claim to citation loop.
- **PATH:** `src/components/the-descent/dw/scenes/FabricationScene.tsx`

---

### 176 · ImmunitySection
- **NAME:** ImmunitySection
- **EXPLANATION:** "COGNITIVE IMMUNITY" philosophy section. Maximalist design: orbiting antibody-shield rings, lie-spore particles bouncing off, halftone background, mandala rings. 3-step vaccine mechanism (DOSE→RESPONSE→IMMUNE). Multi-accent. Renders `INOCULATION_CAVEAT`.
- **USE CASE:** Transition scene between descent and climb; explains the inoculation metaphor before the defense section.
- **PATH:** `src/components/the-descent/dw/scenes/ImmunitySection.tsx`

---

### 177 · KillSection
- **NAME:** KillSection
- **EXPLANATION:** Layer 5 "THE KILL" (narrative peak). Letterbox cinema bars. Full-width SVG heart-monitor ECG line that flatlines via CSS stroke-dashoffset animation. BPM counter animates to 0. `<Sourced>` for the 53.9% self-medication stat. Bold Arabic headline "سمع إن الأنسولين «كذبة»، فوقّفه."
- **USE CASE:** Emotional apex of the descent — the moment a death is rendered explicitly with medical evidence.
- **PATH:** `src/components/the-descent/dw/scenes/KillSection.tsx`

---

### 178 · MatrixSection
- **NAME:** MatrixSection
- **EXPLANATION:** Layer 6 "THE MATRIX" (PEAK). Concentric ring visual with "You're inside" centered. Two case examples (worldwide + Egypt). Dust motes. EN⇄AR toggle.
- **USE CASE:** Layer 6 scene visualizing the information-environment matrix where the reader is already embedded.
- **PATH:** `src/components/the-descent/dw/scenes/MatrixSection.tsx`

---

### 179 · SpreadSection
- **NAME:** SpreadSection
- **EXPLANATION:** "THE SPREAD" section. 5 platform tiles (Facebook/TikTok/X/YouTube/WhatsApp), each distinctly colored. `<Sourced>` for spread-rate statistic. EN⇄AR toggle.
- **USE CASE:** Shows the platform distribution of misinformation propagation, sourced numerically.
- **PATH:** `src/components/the-descent/dw/scenes/SpreadSection.tsx`

---

### 180 · StandardSection
- **NAME:** StandardSection
- **EXPLANATION:** "THE ONE LAW" gate visualization. Two parallel lanes: (claim + source → "موثّق ✓") vs (claim alone → "غير مُتحقَّق ✕"). Cyan glow. Quote from `SECTION_COPY.standard`.
- **USE CASE:** Visual explanation of the One-Law anti-fabrication standard as an in-scroll narrative gate.
- **PATH:** `src/components/the-descent/dw/scenes/StandardSection.tsx`

---

### 181 · TimingScene
- **NAME:** TimingScene
- **EXPLANATION:** Layer 4 "WEAPONIZED TIMING." SVG timeline with a natural-death pin followed by a delayed "I was killed" video-release pin drawn in via CSS `dwt-draw` stroke animation. EN⇄AR toggle.
- **USE CASE:** Layer 4 scene showing the timeline gap between real event and coordinated false-narrative release.
- **PATH:** `src/components/the-descent/dw/scenes/TimingScene.tsx`

---

### 182 · UnknownScene
- **NAME:** UnknownScene
- **EXPLANATION:** Layer 8 "THE UNKNOWN." Animated fog blobs. Confidence-band visual that refuses to resolve to 0% or 100%. Calibrated uncertainty framing. `<Sourced>` for contested case. EN⇄AR toggle.
- **USE CASE:** Layer 8 scene teaching calibrated epistemic humility — the honest acknowledgment of remaining unknowns.
- **PATH:** `src/components/the-descent/dw/scenes/UnknownScene.tsx`

---

## GROUP E — The Descent: Shared Primitives
*`src/components/the-descent/shared/`*

---

### 183 · DefenseChip
- **NAME:** DefenseChip
- **EXPLANATION:** Small bilingual chip showing the defense technique for deception layer `n`. Compact mode: EN + AR labels only. Full mode adds cognition sentence + citation source. Cyan climb accent. Renders a `⚠` warning if the layer index is not found in `LAYER_DEFENSE_MAP`.
- **USE CASE:** Reusable badge summarizing a cognitive defense technique; used in CognitionShaft and DepthRail labels.
- **PATH:** `src/components/the-descent/shared/DefenseChip.tsx`

---

### 184 · FailLoud
- **NAME:** FailLoud
- **EXPLANATION:** Visible red "UNVERIFIED — DATA UNAVAILABLE" error card with `role="alert"`. Displayed by EgyptChoropleth when GeoJSON is missing, by live API calls when they fail, etc. Never fabricates fill — always fails honestly and visibly.
- **USE CASE:** One-Law-compliant error state for data-dependent visualizations; ensures the user sees a clear failure rather than a silent empty or fabricated fallback.
- **PATH:** `src/components/the-descent/shared/FailLoud.tsx`

---

### 185 · LayerTag
- **NAME:** LayerTag
- **EXPLANATION:** Colored pill badge showing `L{n}` index + English layer name + optional Arabic name. Per-layer accent color from `DESCENT_LAYER_COLORS`. Shows `⚠ UNKNOWN` if layer index is not in the map. `small` prop for compact mode.
- **USE CASE:** Inline label tagging content with its deception layer; used across DescentLayer, CognitionShaft, DefenseChip.
- **PATH:** `src/components/the-descent/shared/LayerTag.tsx`

---

### 186 · Sourced
- **NAME:** Sourced
- **EXPLANATION:** The ONE LAW enforcer. Required props: `value` (the claim text), `tier` (Tier enum), `source` (non-empty string). Runtime guard: empty source or tier → renders red `⚠ UNVERIFIED` badge. `contested` prop → violet `CONTESTED` badge. `corpusCount` prop → "corpus count" label. `inline` prop switches between in-text and block display. Source text shown as truncated monospace label with full text in `title` attribute.
- **USE CASE:** Every numeric or factual claim throughout the platform must wrap in `<Sourced>` — this is the single enforcement point for the One-Law anti-fabrication standard.
- **PATH:** `src/components/the-descent/shared/Sourced.tsx`

---

## GROUP F — The Descent: Visual Primitives
*`src/components/the-descent/visual/`*

---

### 187 · DisplayType
- **NAME:** DisplayType
- **EXPLANATION:** Giant layered headline primitive. EN + AR lines with ghost-stroke offset layers (`-webkit-text-stroke`) behind fill text. `fill='gradient'` uses `background-clip:text` with zone-accent gradient. Size presets sm/md/lg/xl → `clamp()` values. Ghost layers suppressed under `prefers-reduced-motion` and on mobile.
- **USE CASE:** Large section headline for descent hero, layer openings, and any cinematic text moment. Zone-aware accent colors.
- **PATH:** `src/components/the-descent/visual/DisplayType.tsx`

---

### 188 · DuotoneFrame
- **NAME:** DuotoneFrame
- **EXPLANATION:** SVG `feColorMatrix` duotone effect applied to images or abstract SVG motifs (`silhouette` / `delta`). Never uses real face imagery. Shadow→highlight color ramp sourced from zone accents. `hexToUnit()` helper converts hex to 0..1 for `feFuncX tableValues`. Two built-in shapes: human silhouette path, Nile-delta branching paths.
- **USE CASE:** Cinematic duotone figure used in descent hero and each layer opening — visually links the human figure to the zone's color palette.
- **PATH:** `src/components/the-descent/visual/DuotoneFrame.tsx`

#### Sub-feature: hexToUnit
- **NAME:** hexToUnit
- **EXPLANATION:** Converts a CSS hex color string to 0..1 float range values for SVG `feFuncX tableValues` in feColorMatrix filters.
- **USE CASE:** Internal utility enabling arbitrary hex-defined duotone color ramps in SVG filters.
- **PATH:** `src/components/the-descent/visual/DuotoneFrame.tsx`

---

### 189 · GlassPanel
- **NAME:** GlassPanel
- **EXPLANATION:** Glassmorphism card using the `.td-glass` CSS class. Publishes `--td-accent-a-rgb` and `--td-accent-b-rgb` CSS variables. `glow` prop adds a zone-accent box-shadow. `pad` prop: none/sm/md/lg. Polymorphic `as` prop (div/article/section/li). Zone-aware accent colors.
- **USE CASE:** General-purpose glass card container used for CaseCards, chat bubbles (ThreadSection), and any frosted-glass panel throughout the descent experience.
- **PATH:** `src/components/the-descent/visual/GlassPanel.tsx`

---

### 190 · GradientGrade
- **NAME:** GradientGrade
- **EXPLANATION:** Fixed, `pointer-events:none` full-page gradient wash layer. Renders a 135° accentA→accentB wash with a vignette (dark edges). Reads scroll velocity from `ScrollContext.stateRef` via rAF and applies a clamped `hue-rotate()` CSS filter — no React re-renders. Auto cross-fades when zone palette swaps (M12/M15 flip). Reduced-motion/<768px: static wash, rAF never runs.
- **USE CASE:** Ambient page-level toning layer that reacts to scroll speed; reinforces the zone palette across all sections without owning any content.
- **PATH:** `src/components/the-descent/visual/GradientGrade.tsx`

---

### 191 · GrainOverlay
- **NAME:** GrainOverlay
- **EXPLANATION:** Fixed, `pointer-events:none` film-grain + photocopy-scanline layer. SVG `feTurbulence fractalNoise` grain with per-zone base opacity (descent: 0.06, climb: 0.035, enterprise: 0.04). Grain opacity also reads `--td-grain-opacity` CSS var so it tweens during the M12 palette flip. A companion `td-scanline` div adds subtle scanlines at a lower opacity.
- **USE CASE:** Cinematic texture layer over the entire descent page giving a film/documentary aesthetic; the grain intensity changes between dark and light zones.
- **PATH:** `src/components/the-descent/visual/GrainOverlay.tsx`

---

### 192 · HighlightBox
- **NAME:** HighlightBox
- **EXPLANATION:** Thin accent-border + faint-fill + CSS corner-tick highlight box for a key term (victim's condition, layer name, critical stat). Static — no animation — so intrinsically reduced-motion safe. Reads zone accent via inline CSS vars so `.td-hbox` pseudo-element corner ticks auto-pick the right color. `alt` prop switches to accentB. `pad` prop: sm/md/lg.
- **USE CASE:** Inline emphasis box for key terms like "ENTERPRISE AWARENESS" or "53.9%" without requiring motion.
- **PATH:** `src/components/the-descent/visual/HighlightBox.tsx`

---

### 193 · KineticMarquee
- **NAME:** KineticMarquee
- **EXPLANATION:** Diagonal scrolling tape using CSS `@keyframes translate` on a duplicated track for seamless looping. DESCENT tone (`'lie'`) carries Arabic lie-phrases in blood-red struck-through hazard tape; CLIMB tone (`'defense'`) carries defense techniques. `DESCENT_LIE_PHRASES` and `CLIMB_DEFENSE_PHRASES` are exported constants. Reduced-motion/<768px: static angled strip, no animation. Direction (`reverse`), speed, and angle are configurable.
- **USE CASE:** Atmospheric scrolling hazard tape used in Hero (descent), ClimbTurnSection (defense), and ThreadSection; never asserts lie-phrases as true (museum framing).
- **PATH:** `src/components/the-descent/visual/KineticMarquee.tsx`

#### Sub-feature: DESCENT_LIE_PHRASES
- **NAME:** DESCENT_LIE_PHRASES
- **EXPLANATION:** Exported constant array of Arabic lie-phrases used as the descent hazard tape (struck-through).
- **USE CASE:** Canonical list of misinformation phrases shown as museum artifacts, not assertions.
- **PATH:** `src/components/the-descent/visual/KineticMarquee.tsx`

#### Sub-feature: CLIMB_DEFENSE_PHRASES
- **NAME:** CLIMB_DEFENSE_PHRASES
- **EXPLANATION:** Exported constant array of Arabic defense-technique phrases used as the climb marquee tape.
- **USE CASE:** Positive cognitive-defense tape displayed in the climb zone.
- **PATH:** `src/components/the-descent/visual/KineticMarquee.tsx`

---

### 194 · NeonStat
- **NAME:** NeonStat
- **EXPLANATION:** Accent-glow chip wrapping `<Sourced>` for benchmark statistics. Zone-accent border + faint background + `glow()` box-shadow. Supports a `children` slot for animated counter values (e.g. `AnimatedCounter`) while still routing the source badge through `<Sourced>` for One-Law compliance. Tabular mono numerals via Clash Display font.
- **USE CASE:** Highlighted stat chip with neon glow used in CognitionShaft and BlastRadiusSection for key numerical claims.
- **PATH:** `src/components/the-descent/visual/NeonStat.tsx`

---

### 195 · OrbField
- **NAME:** OrbField
- **EXPLANATION:** Absolutely-positioned field of radial-gradient "sphere" orbs with slow CSS drift (`td-orb` keyframes) and optional scroll-parallax via rAF (`--td-parallax-y` CSS var). Uses a deterministic fixed bank of 6 orb positions (SSR-safe, no `Math.random`). `count` prop controls how many from the bank are shown. Does not open a WebGL context. Reduced-motion/<768px: static orbs.
- **USE CASE:** Background depth effect used in DescentExperience and section backdrops; creates a sense of three-dimensional space without Three.js overhead.
- **PATH:** `src/components/the-descent/visual/OrbField.tsx`

---

### 196 · ParallaxLayer
- **NAME:** ParallaxLayer
- **EXPLANATION:** Generic scroll-parallax wrapper that reads `ScrollContext.stateRef.progress` (0..1 page progress) via rAF and applies a clamped Y `translate3d` transform to its children. `speed` prop: positive lags (moves slower than scroll), negative leads. `max` prop clamps travel in px. Reduced-motion/<768px: children rendered with no transform.
- **USE CASE:** Used to add depth to background elements like globe SVGs, type layers, and figures in Hero and layer sections.
- **PATH:** `src/components/the-descent/visual/ParallaxLayer.tsx`

---

### 197 · ScrollReveal
- **NAME:** ScrollReveal
- **EXPLANATION:** Bulletproof entrance reveal component. Uses Framer Motion `motion[as]` for the animation (opacity 0→1, Y offset, clip-path inset wipe) but has three redundant reveal triggers: (1) immediate reveal if element is already in/above viewport on mount, (2) `IntersectionObserver` with near-zero threshold, (3) passive scroll listener failsafe for fast flings/programmatic jumps. Once shown, stays shown. Reduced-motion: renders fully visible without animation.
- **USE CASE:** Drop-in wrapper for any content that should animate in on scroll; the three-gate design prevents the "blank page" failure where content stays invisible after a fast skip.
- **PATH:** `src/components/the-descent/visual/ScrollReveal.tsx`

---

### 198 · SectionKicker
- **NAME:** SectionKicker
- **EXPLANATION:** Vertical (`writing-mode: vertical-rl`) side label with optional index and bilingual EN/AR text, e.g. "00 — THE THREAD". Pure CSS writing-mode; no motion; intrinsically reduced-motion safe. On <768px folds to a small horizontal kicker. `side` prop: left/right. Zone-accent colors.
- **USE CASE:** Section index/label pinned vertically to the side of each descent scene for magazine-style orientation.
- **PATH:** `src/components/the-descent/visual/SectionKicker.tsx`

---

## GROUP G — The Descent: Data Visualizations
*`src/components/the-descent/viz/`*

---

### 199 · EgyptChoropleth
- **NAME:** EgyptChoropleth
- **EXPLANATION:** Egypt 27-governorate choropleth map using d3-geo `geoMercator().fitSize` over `src/data/egypt-governorates.geojson`. Each governorate is an opaque filled `<path>` with a bright dividing stroke (no flat-color block). Fill uses a stepped magnitude ramp (dark→accent) keyed to a `domainId` prop and a deterministic `nameHash()` function (reproducible modeled distribution, explicitly labeled "modeled, not measured"). Domain filter chips let the reader switch the active domain. `FailLoud` displayed when GeoJSON is absent. Always renders an accessible `<table>` twin. `TierLegend` and `<Sourced>` included.
- **USE CASE:** M10 BlastRadiusSection map; shows which domain's misinformation burden is heaviest per governorate, with explicit honesty labeling.
- **PATH:** `src/components/the-descent/viz/EgyptChoropleth.tsx`

#### Sub-feature: nameHash
- **NAME:** nameHash
- **EXPLANATION:** Deterministic FNV-style hash of a governorate name string producing a 0..1 float. Gives modeled distribution a stable cosmetic spread — never measured data.
- **USE CASE:** SSR-safe deterministic fill variance across governorates without `Math.random`.
- **PATH:** `src/components/the-descent/viz/EgyptChoropleth.tsx`

---

### 200 · FlowMap
- **NAME:** FlowMap
- **EXPLANATION:** M8 "Architects" governorate propagation flow-map. Renders real Egypt geometry (d3-geo over the same GeoJSON), then draws bezier propagation arcs from a Cairo origin hub to every other governorate. Arc brightness and width scale with modeled distance-decay weight. Cairo hub node is visibly larger. CSS `stroke-dashoffset` transition keyed to `useReveal()` for arc draw-in animation. Particle riders animate along arcs (≥768px, not reduced-motion). Honesty gate: arc weights labeled as modeled distance-decay. Geometry gate: if GeoJSON absent, falls back to a labeled abstract node-arc diagram with an honesty note. All anchoring figures via `<Sourced>` + `TierBadge`. Uses layer-7 steel accent `#AEB9C7`.
- **USE CASE:** Layer 7 ArchitectsSection visualization showing Cairo as the propagation hub across Egypt's governorate network.
- **PATH:** `src/components/the-descent/viz/FlowMap.tsx`

---

### 201 · ScrubLineChart
- **NAME:** ScrubLineChart
- **EXPLANATION:** recharts micro-visualization with two presets. `'split-bar'`: a bar chart where the SHOWN half is fully painted and the OMITTED half is masked (CSS `scaleX 0→1` draw-in on `useReveal`), visualizing the biased-lens "you only see testimonials, not deaths" concept. `'confidence-band'`: recharts `<Area>` band that refuses to resolve to 0% or 100% — a needle settles inside the band to illustrate calibrated uncertainty. Entrance/draw gated on `useReveal()`; reduced-motion/<768px shows final state with no animation. recharts `ResponsiveContainer` works to 320px.
- **USE CASE:** Inline data visualization used in DescentLayer for L2 (split-bar) and L8 (confidence-band) micro-stories.
- **PATH:** `src/components/the-descent/viz/ScrubLineChart.tsx`

---

## GROUP H — UI Components
*`src/components/ui/`*

---

### 202 · CalmReveal
- **NAME:** CalmReveal
- **EXPLANATION:** Wrapper that gates high-emotional-intent content behind `TimeFrictionGate`. If `eisScore > 0.7` (or no score provided), the `TimeFrictionGate` runs before content is revealed. Once the gate completes, children appear with `animate-fadeIn` CSS transition. If `eisScore <= 0.7`, children render immediately without gating.
- **USE CASE:** Applied over AI-generated responses or sensitive mental-health content to enforce a mandatory cognitive-pacing delay, reducing impulsive reaction to emotionally charged information.
- **PATH:** `src/components/ui/CalmReveal.tsx`

---

### 203 · MegaNav
- **NAME:** MegaNav
- **EXPLANATION:** Site-wide mega-nav dropdown component with 5 top-level categories (Intelligence / Defense / Curriculum / Human / Platform). Each category has 6 sub-items with icon, bilingual EN/AR title and description, and an `href`. Animated floating hover-pill slides between nav items. Dropdown panel (620px wide) centers below the active item, clamped to viewport. RTL-aware (`useRTL`). Mouse-enter/leave with 200 ms debounce timeout prevents flickering.
- **USE CASE:** Primary site navigation bar; renders in the root layout header with hover-to-reveal multi-column dropdowns for all 30 navigation destinations.
- **PATH:** `src/components/ui/mega-nav.tsx`

---

### 204 · PremiumCharts
- **NAME:** PremiumCharts
- **EXPLANATION:** Simple CSS-only responsive bar chart component. Receives `dataPoints`, `labels`, `color`, and `title` props. Bars are CSS `height` percentage of the max value with a 500 ms ease-in-out transition. Hover tooltip shows the raw value above each bar. Rotated labels at 45°.
- **USE CASE:** Lightweight bar chart for admin dashboards or simple data displays where recharts or Nivo overhead is not needed.
- **PATH:** `src/components/ui/premium-charts.tsx`

---

### 205 · TimeFrictionGate
- **NAME:** TimeFrictionGate
- **EXPLANATION:** Mandatory cognitive-pacing delay component. Displays a breathing-ring animation (outer emerald ring oscillates via `sin` of progress) and a large percentage counter while a timer ticks from 0→100% over `durationMs` ms (default 5 s). Calls `onComplete` callback when complete. The breathing ring is explicitly designed to lower sympathetic nervous system arousal.
- **USE CASE:** Anti-impulsivity gate injected by `CalmReveal` in front of emotionally charged content; also usable standalone before AI responses that scored high on the Emotional Intensity Scale.
- **PATH:** `src/components/ui/time-friction-gate.tsx`

---

## FEATURE SUMMARY

| Category | Files | Features |
|---|---|---|
| A — Sources Components | 3 | 4 |
| B — Descent Top-Level Sections | 11 | 15 |
| C — DW Hero + Persistent UI | 3 | 8 |
| D — DW Layer Scenes | 12 | 12 |
| E — Descent Shared Primitives | 4 | 4 |
| F — Visual Primitives | 12 | 17 |
| G — Data Visualizations | 3 | 5 |
| H — UI Components | 4 | 4 |
| **TOTAL** | **52** | **69** |

---

## NOTABLE FEATURES (ordered by architectural significance)

1. **DescentExperience** — root orchestrator for the entire /the-descent scrollytelling page
2. **Sourced** — One-Law enforcer; every factual claim platform-wide must pass through it
3. **DescentLayer** — single parameterized component for all 8 deception-layer rungs including LayerViz dispatch
4. **EgyptChoropleth** — d3-geo choropleth of Egypt's 27 governorates with domain-switched fills and accessibility table twin
5. **FlowMap** — Cairo-origin propagation arc map with CSS stroke-draw animation and geometry fallback
6. **ScrollReveal** — bulletproof three-gate entrance reveal (mount-check + IntersectionObserver + scroll failsafe)
7. **MegaNav** — 5-category, 30-destination site navigation with animated pill and RTL support
8. **CognitionShaft** — scroll-driven deception-overwrite ladder with @nivo/radar defense chart
9. **ToolsFilmstrip** — live evidence-count API integration with useEvidenceCount hook and AbortController
10. **GradientGrade** — zero-re-render rAF hue-rotate ambient layer responding to scroll velocity
11. **CalmReveal + TimeFrictionGate** — EIS-gated cognitive pacing system with breathing-ring animation
12. **KineticMarquee** — dual-tone (lie/defense) diagonal scrolling tape with reduced-motion static fallback
13. **GatewayDoor** — CSS stroke-draw SVG door aperture with SSR-safe deterministic dust motes
14. **TierBadge / resolveTierKey** — evidence tier badge system (S/A/B/C/CONTESTED/UNVERIFIED)
15. **SourceRegistry** — full trust-band + freshness-badge source browser with search and MVP filter
