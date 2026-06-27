# GATEWAY POLISH SPEC — from the user's page-by-page QA (2026-06-21)
## Apply across /the-descent. Goal: cinematic, legible, professional, culturally-correct. AMAZE.

## 0. GLOBAL (fix once, applies everywhere) — HIGHEST PRIORITY
- **G1 — KILL THE "1 error" TOAST.** A runtime error is leaking to the UI on every page. Eliminate ALL console errors: (a) `KineticMarquee` "setState while rendering" — make it pure/deterministic; (b) hydration mismatches (SSR/client branches, `typeof window`, locale) — gate client-only reads behind `useEffect`/mounted; (c) the `/api/search/evidence` fetch must NOT hang — keep the AbortController but render a fallback immediately, never block; (d) any `_toArray`/other. Verify the browser console is CLEAN.
- **G2 — TYPOGRAPHY SCALE (too small everywhere).** Mono/body text is 9–11px; raise to: body ≥ 15px (line-height 1.6), secondary ≥ 13px, mono labels ≥ 12px (never < 11px), data-panel values large. Define one scale in `dw/design-wave.css` and use it.
- **G3 — BILINGUAL EQUALITY.** Arabic is consistently lighter/smaller than English — treat them as EQUALS: same visual weight, comparable size, same emphasis. Arabic uses a proper heavy display face for headings (Tajawal/Cairo 700–900), not a thin fallback.
- **G4 — CONTRAST (WCAG AA).** Many grays fail on near-black. Raise body text to ≥ `#C9C5BD` on dark; never set descriptive text within ~15% of its card bg. Gold/economic text (`#F0C030` on dark gray) is illegible — darken the card or brighten/también add a subtle plate behind gold text.
- **G5 — TIER LEGEND.** Tier S/A/B/C, CONTESTED, UNVERIFIED appear with no explanation. Add a compact, reusable legend: a small fixed "evidence key" affordance + a first-use tooltip on each badge. One `<TierLegend/>` component; badges link to it.
- **G6 — COLOR-PER-LAYER SYSTEM (make it explicit + consistent).** 8 distinct accents, fixed per layer, shown in a tiny persistent layer legend / the DepthRail. L1 red · L2 amber · L3 violet · L4 cyan-blue · L5 green · L6 magenta · L7 white/steel · L8 pale. Apply the SAME accent on that layer's numeral, card border, tag, and rail tick.
- **G7 — ALL 8 LAYERS, DISTINCT BREAKS.** The scroll skips L2 and L6 (reads L1→L3→L4→L5→L7→L8). Ensure each of the 8 renders as a clear full-viewport break with its giant `−n` numeral + name + color. No layer blends into its neighbour.
- **G8 — RIGHT-SIDE DATA PANELS (L1–L8) too small/low-contrast.** Enlarge the diagrams (citation-chain, timeline, flatline, confidence-band, flow-map) to ~2× and give labels ≥ 12px high-contrast text. These diagrams are the payoff — make them legible heroes, not tooltips.
- **G9 — MAPS RENDER AS FLAT COLOR BLOCKS (broken).** The Egypt choropleth + flow-map show a solid cyan/coral rectangle (geojson/paths not drawing). FIX: actually draw the 27 governorate `<path>`s from `src/data/egypt-governorates.geojson` (d3-geo `geoMercator().fitSize`), colored by the domain value; if geojson fails, render the **a11y data-table as the primary**, NOT a flat block. Same for the flow-map (real arcs, not a coral rectangle).

## 1. HERO — PUSH HARDER (cinematic, bigger, more motion/depth)
- Bigger giant type; more depth (layered parallax, stronger ghost); more motion (subtle scale/parallax on scroll, drifting orbs, animated tape).
- **FIX the figure** — current duotone figure is asymmetric/broken. Redraw a clean, SYMMETRIC silhouette (person hunched over a glowing phone), intentional; REMOVE the stray cyan diamond on the shoulder (reads as a debug placeholder).
- **"THE DESCENT" is clipped by the ticker bar** — move the tape lower / add breathing room so no glyph is cut. The Enter button must not crowd the tape.
- **Ticker legibility** — text is dark-red-on-purple and tiny. Make it bone/white, ≥ 18px, higher-contrast ribbon.
- **«نظام الطيبات» box** — thin pink border reads as a wireframe leftover. Finish it: solid/elevated, intentional corner ticks, clear it's a highlighted case name.
- **Vertical side label** — nearly invisible. Either brighten/enlarge into deliberate atmosphere or cut it. No invisible-but-present text.
- Remove any error toast remnant from the hero.

## 2. COPY — PROFESSIONAL REWRITE (EN) + CULTURALLY-CORRECT (AR)
User: "the Arabic translations are unmatched to the cultural [context] and the English isn't professional." Rewrite ALL copy in `descent-data.ts` (headlines, leads, case one-liners, labels, CTAs):
- **English:** polished, professional, emotionally precise editorial voice. No awkward/literal phrasing. Tight.
- **Arabic:** culturally-resonant Egyptian register — natural, dignified, correct; not stiff machine-MSA, not slangy. Equal weight/emphasis to English. Religious/medical terms handled with care.
- Keep the data structure + every `{source,tier}` intact — only the human-facing strings change.

## 3. PER-SECTION FIXES (from the QA)
- **Thread (M0):** the green WhatsApp border/label clashes — keep it as *deliberate* sickly contrast but tone the green and anchor the card (the top 40% void needs a focal element). "Anyone can believe it" line fails contrast — brighten. Faint "THE DESCENT" watermark — make it deliberate texture or remove.
- **Pull (M1):** italic-pink EN above AR creates a ragged gap — balance the centered block. The `١٤٫٥٪` + `14.5%` stacked is redundant — show one (Arabic-Indic in AR context, Western in EN), not both stacked. "TIER A" pills too tiny → legible + linked to legend. "LIE VS TRUTH" label has no top padding + is cut → spacing.
- **Problem (M1.5):** stop the EN→AR→EN→AR stutter — GROUP English block then Arabic block per card. Decorative tag pills ("Real/Harmful/Dangerous") look clickable (false affordance) → make clearly non-interactive (or remove the pill chrome). Paragraph too wide → cap ~65ch.
- **Descent layers (M2–M9):** enlarge right panels (G8), per-layer color (G6), contrast (G4), bilingual-equal (G3). The **flatline (L5)** is the best viz — make the line thicker + label legible. Timeline (L4), citation-chain (L1), confidence-band (L8) → 2× size, legible. "CONTEXT RESTORED" (L3) should be the HERO of that section, not a side tooltip.
- **Blast radius (M10):** size the orbiting domain circles BY magnitude (53.9% vs 78.4% vs 38%). Strengthen the You→Family→Friends→Community arrows into a clear causal chain. Domain colors must match the rest of the site (not introduced cold).
- **Domain grid (M12):** equal card heights; gold/economic contrast fix; move the "1.44 psychiatrists/100k" stat out of the Religious card into Medical or its own card; tier badges → legible + legend.
- **Map (M13):** see G9. Add the other domain filter chips (only one shown). Data-table rows need stronger alternating contrast.
- **Tools (M14):** 8 cards in 3-col grid breaks on row 3 (2 cards) → use a 4×2 or 2×4 even grid. Reduce the 6 competing sections per card to a clear hierarchy. The "live" green ≠ the WhatsApp green (different hue). Top floating parallax words are cut off at edges → contain them.
- **Cognition (M14b)/Enterprise (M15):** radar axis labels ~8px → legible. Line-chart x-axis (L1–L8) cramped → space. ONE primary CTA: "Enter the Library" primary, "Request Enterprise Access" secondary (not equal weight). Reduce redundant repeated stats (53.9/78.4/91.7/14.5 reused) — vary or summarize.
- **Outro (M16):** "Enter →" should dominate over "Home". The flat gray "ONBOARDING · 1/5" nav bar clashes with the cinematic tone → restyle to match (or hide on this gateway). Reduce vertical dead space.

## 4. DONE = console clean (no toast), tsc clean, route 200, every item above addressed, copy professional in both languages, maps actually draw, all 8 layers distinct, one coherent type/color/tier system.
