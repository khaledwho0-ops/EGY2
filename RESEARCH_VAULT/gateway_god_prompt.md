# THE GOD PROMPT — «THE DESCENT / النزول» (EAL project gateway page)
## Generic prompt → multi-layered GOD prompt. All 12 strengthening layers applied. Zero atoms dropped.

> Companion files the implementer MUST read: `gateway_master_blueprint.md` (the M0–M16 section spec), `gateway_prompt_atoms.md` (the 56-atom coverage contract), `total_convergence_findings.md` (the grounded cases), `study_the_problem.md` §1 (sourced Egypt stats), `00_THE_SCIENTIFIC_STANDARD.md` (the constitution).
> The 12 strengthening layers are labelled ⟦L1⟧…⟦L12⟧ inline so the technique is visible. Positive spine = ⟦L1–L9,L11⟧; negative guardrail = ⟦L10⟧; self-correction = ⟦L11–L12⟧.

---

## ⟦L1⟧ ROLE & AUTHORITY STACK
You are, simultaneously: **(a)** a world-class creative director for award-winning immersive web (Awwwards/FWA caliber); **(b)** a senior Next.js 15.0.3 / React 19 / TypeScript / Tailwind-v4 front-end architect working inside an existing production codebase; **(c)** an Egyptian misinformation & cognition analyst who obeys the EAL governing standard. You ship sourced, bilingual EN/AR-RTL, accessible (320px + reduced-motion), high-craft scrollytelling. You reuse existing components and never invent libraries or facts.

## ⟦L2⟧ MISSION & SUCCESS CRITERIA
Build ONE immersive gateway page at route **`/the-descent`** — *«THE DESCENT — How a Message Becomes a Coffin, and How You Climb Back» / «النزول»*. It is the **strongest, most important page in the project — its front door** (atom #4). A second-person ("you"/"انت") cinematic FALL through the 8-layer deception taxonomy that **kills** an Egyptian, then a mirrored CLIMB back out — verification tools first, then cognition — ending at the Library door. **Done = (a) all 56 atoms in `gateway_prompt_atoms.md` are satisfied and tagged; (b) the page compiles (`npx tsc --noEmit` clean for the new files); (c) the §“COMPLIANCE GATE” checklist all-green.** A stranger must finish feeling the danger personally, then holding the method to survive it.

## ⟦L3⟧ SOURCE GROUNDING (the One Law)
Every numeric or factual claim renders through a `<Sourced value tier source>` component whose TypeScript type **requires** a non-empty `source` + `tier`; missing ⇒ visible red `[⚠ UNVERIFIED]`. Pull every stat/case verbatim from `total_convergence_findings.md` + `study_the_problem.md` §1 + the `six-layers/data.ts` counters — **reproduce numbers and sources exactly; never paraphrase a number or invent a citation.** CONTESTED figures render in `--contested-violet #8B5CF6` with a `[CONTESTED]` stamp (e.g. HoggPool 6B EGP vs official ≥19M). Corpus-only counts (`183+ frauds`, `10,000+ retractions`) carry a `[corpus count]` label, never a primary tier. Missing data ⇒ `<FailLoud>` card, never a fabricated fill. Honor every `gaps[]`: Unictam deaths excluded (tabloid-only); GLP-1 not promoted; court verdicts (دجال المرج, Ezzat) UNVERIFIED; Al-Awadi "assassination" held as Layer-8 calibrated uncertainty.

## ⟦L4⟧ HARD CONSTRAINTS — THE MUSTs (positive)
1. **8 layers explicit** (atom #41): all 8 deception layers appear with AR+EN names as `<LayerTag n>`; each defense shows a `<DefenseChip technique>` in the climb.
2. **Data-analysis maps** (atom #39): Egypt 27-governorate choropleth (M10) + propagation flow-map (M8).
3. **Real strong scientific use cases** (atom #40): the grounded Egyptian cases only.
4. **Cross-domain in detail** (atom #42): medical, religious, economic, political, social — each sourced; then **family (#43) → friends (#44) → community (#45)** ripple.
5. **Two-movement philosophy, ordered** (atoms #30–38): collapse → platform's role → **Movement 1: name the verification tools + their strength (#32–34)** → **Movement 2 (the deepest part): human awareness + cognition + how thinking is built (#35–37)**. Tools FIRST, cognition SECOND (#38).
6. **Enterprise Awareness tier** (atoms #53–56): paid "form your awareness" feature named **ENTERPRISE AWARENESS**, for the **investor**, using the strongest tools + learning from the strongest sources.
7. **Skippable gateway** (atom #1): first visit plays full; a visible **Skip** control always; on return (`localStorage 'eal-descent-seen'`) auto-offer skip / fast-path to `/`. Flag set at M12.
8. **Installed libs ONLY** (atom #52 already-researched): framer-motion ^12.40, gsap ^3.15 (ScrollTrigger, DrawSVGPlugin, SplitText, Flip, Observer — **MorphSVG is NOT in dist; use Flip**), lenis ^1.3 (`lenis/react`), three ^0.184 / @react-three/fiber ^9.6 / drei ^10.7 / postprocessing ^3.0, d3 ^7.9 (d3-geo, d3-scale-chromatic), recharts ^3.8, @nivo/radar, canvas-confetti, lucide-react. The ONLY new asset is `src/data/egypt-governorates.geojson` (GADM ADM1 → simplified <100KB, plain GeoJSON, no runtime topojson dep).
9. **Scroll engine:** `<ReactLenis root>` bridged to GSAP (`lenis.on('scroll', ScrollTrigger.update)`; `gsap.ticker.add(t=>lenis.raf(t*1000))`). Register GSAP plugins inside `useEffect`/`useLayoutEffect` only; clean up via `gsap.context()`.
10. **Bilingual RTL** (atoms #5,#6): self-contained paired `en`/`ar` fields; inline `dir="rtl"` on Arabic nodes; inline `style={{fontFamily:"var(--font-heading-ar)"}}`. Arabic-Indic digits via `Intl.NumberFormat('ar-EG')`.
11. **≥2 live APIs** (project rule): wire real `/api/search/evidence` + `src/lib/debunking/` into the M13 tool cards (live counts) and the M10 map metric.
12. **Immersive layout:** copy the six-layers `layout.tsx` chrome-hiding `<style>` trick; `layout.tsx` is a Server Component exporting bilingual `metadata` (no `'use client'`).

## ⟦L10⟧ NEGATIVE PROMPT — THE MUST-NOTs (the guardrail)
- ❌ **No mock/placeholder/dummy data, no hardcoded credibility scores, no `// TODO` in the data layer.** Every stat/source is real or the block FailLouds.
- ❌ **No fabricated facts or citations.** Unsure ⇒ UNVERIFIED/CONTESTED, never confident prose.
- ❌ **No `src/lib/scroll/smooth-scroll.tsx`** (its wheel `preventDefault` kills pin/sticky — fatal for the shaft & filmstrips).
- ❌ **No `font-cairo`/`font-amiri` class reliance** — they are no-ops here; set Arabic font via the `--font-heading-ar` var.
- ❌ **No SplitText on Arabic chars** (ligature break) — lines/words only; **never** SplitText on scripture (use clip-path).
- ❌ **No MorphSVG / no new heavy deps.** No second WebGL context in one viewport.
- ❌ **No animation of layout-thrashing props** — transform/opacity/filter only. No motion that ignores `prefers-reduced-motion`. No magnetic cursor / confetti on touch or reduced-motion.
- ❌ **No generic "use critical thinking"** — name the exact per-layer technique (M14). No AI-slop clichés ("in today's fast-paced world", "unleash", "game-changer"), no lorem, no emoji-as-decoration, no stock-gradient blandness.
- ❌ **No hiding the page from nav** — add `/the-descent` to `PAGE_ORDER`. No generic page name.

## ⟦L5⟧ DECOMPOSITION — SECTION SPEC (build in this exact order)
Build M0→M16 **each from the same-named section in `gateway_master_blueprint.md`**, honoring its purpose, EN+AR copy beats, palette+texture+grade, the named-lib animation, the data-viz/map + source, the layer(s) surfaced, the real case/stat + source+tier, and the cognition technique. Summary spine (full detail in the blueprint):
`M0 thread (WhatsApp cold-open)` · `M1 pull (14.5%↑13.8%)` · `M1.5 problem (reach/verify/apply + "most dangerous thing")` · `M2–M9 the 8-layer shaft descending (Curcumin Dr · Tayyibat · الطيبات/الخبائث · "I was killed" video · THE FLATLINE deaths+Unictam+53.9% · دجال المرج+78.4% · HoggPool+[CONTESTED]6B+82M · Al-Awadi autopsy UNVERIFIED)` · `M10 blast-radius (5 domains + family→friends→community + Egypt choropleth)` · `M11 floor` · `M12 THE FLIP (pinned scrub, velocity reverses, set skip-flag)` · `M13 verification arsenal (8 tools + strength + live API)` · `M14 cognition climb (mirrored shaft +8…+1, 8 techniques 1:1, @nivo radar)` · `M15 ENTERPRISE AWARENESS` · `M16 the door`.

## ⟦L9⟧ AESTHETIC & VOICE DIRECTION (atoms #5–#11, #46–#50)
- **Voice:** spare, exact, second-person, never preachy. Every word and sentence earns its place (atoms #5,#6). Arabic is Egyptian-aware and dignified, not MSA-stiff.
- **Color (#7) + concentration (#10) + grading (#11):** master ramp `#0B0E0C → #1A0F06 → #2A0608 → #050304 → [FLIP] → #0A1620 → #0E1C18 → #141008`; saturation rises toward the kill (M6 arterial) and cools on the climb; three fixed grading overlays (grain, scanline, per-zone hue-rotate via clamped `useVelocity`).
- **Typography (#8):** `--font-heading-en` (Clash Display) / `--font-heading-ar` (Noto Kufi Arabic), body Satoshi / Noto Naskh; fluid type to 320px.
- **Ratio (#9):** hold a deliberate vertical rhythm — full-viewport sections, golden-ratio (≈1.618) content/whitespace split, consistent max-measure for text, 4/8px spacing scale; the depth gauge and section heights keep a constant proportional cadence down the shaft and up the climb.
- **Texture (#48):** SVG `feTurbulence` grain + photocopy scanline, low-opacity, blend-overlay.
- **Motion (#49,#50):** abundant but disciplined — scroll-scrubbed draws, pinned filmstrips, particle velocity flips, Flip overwrites, count-ups, magnetic CTA — every one with a reduced-motion fallback.
- **Attention (#51):** the M0 WhatsApp cold-open + M6 flatline + M12 flip are the three hooks.

## ⟦L6⟧ EXEMPLARS / ANTI-EXEMPLARS
- **Copy — good:** *"Anyone can believe it. That's not stupidity — it's design."* **Bad:** *"Misinformation is a growing problem in today's world."*
- **Stat — good:** `<Sourced value="14.5%" tier="A" source="Egyptian Cabinet Media Centre 2025"/>`. **Bad:** `<span>about 15% (roughly)</span>`.
- **Motion — good:** ECG line `DrawSVG` flatlines exactly on "dead within a week," with a hard-cut poster under reduced-motion. **Bad:** a looping autoplay video with no reduced-motion path.
- **Layer-8 — good:** confidence band that never resolves to 0/100%. **Bad:** "He was definitely assassinated."

## ⟦L7⟧ REASONING SCAFFOLD
Before writing any section: (1) build `descent-data.ts` first as the single source of truth (all copy + stats + `{source,tier}` + layer↔defense map + tool list); (2) wire Lenis+GSAP+Scene in `DescentExperience`; (3) build sections M0→M16 against the data module; (4) self-critique each section against its atoms before moving on; (5) run the compliance gate last. Plan the section graph, then build, then verify — do not free-write.

## ⟦L8⟧ OUTPUT CONTRACT
Produce the full file tree (see blueprint "FILE / BUILD PLAN"): `src/app/the-descent/{layout,page}.tsx`, `src/components/the-descent/*` (DescentExperience + 16 section files + DepthRail + `viz/*` + `shared/*` + `descent-data.ts`), `src/data/egypt-governorates.geojson`, and the one-line `PAGE_ORDER` patch in `page-navigation.tsx`. Every file: complete, compiling TSX, **no placeholders in the data layer**. Reuse (do not rebuild): `ScrollProvider`/`useScrollContext`, `Scene`/`ParticleField`, `LayerSection` (fork base), `LAYER_COLORS` (extend keys 7–8), `.glass-card`/`.btn-primary`, `useRTL`, `PageNavigation`. Provide a short build-order README and flag the two blockers at top (add the geojson; never import `smooth-scroll.tsx`).

## ⟦L12⟧ CALIBRATION & FALLBACK HOOKS
One `gsap.matchMedia('(prefers-reduced-motion: no-preference)')` + framer `useReducedMotion()`. Every pinned/horizontal/WebGL block has an explicit `matchMedia('(min-width:768px)')` branch that stacks/cross-fades. Confidence levels on outputs (HIGH/MEDIUM/CONTESTED/UNVERIFIED). If the geojson can't be obtained, ship the FailLoud + the mandatory a11y `<table>` twin (the table is the real, accessible representation) — never fake geometry. If a live API is unreachable at build, the card shows "insufficient evidence," not a guess.

## ⟦L11⟧ SELF-VERIFICATION GATE (cannot report "done" until ALL green)
Tag every atom #1–#56 from `gateway_prompt_atoms.md` with the section that satisfies it; **any untagged atom blocks completion.** Then confirm: (a) zero claims without `<Sourced>`; (b) all 8 layers present with AR names + defenses; (c) every case shows layer(s)+defense; (d) CONTESTED/UNVERIFIED/corpus labelled correctly; (e) ≥2 live APIs wired; (f) reduced-motion + 320px fallback on every animated block; (g) RTL + Arabic-Indic digits + no `font-cairo` reliance; (h) no `smooth-scroll.tsx`; GSAP registered in effects; (i) `/the-descent` in `PAGE_ORDER`; (j) no new deps beyond the geojson; (k) `npx tsc --noEmit` clean for the new files. Output a final atom-coverage table (#1–#56 → section) as proof.
