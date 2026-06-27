# GATEWAY MASTER BLUEPRINT — «THE DESCENT / النزول»
## Route `/the-descent` · the EAL project's front door · 16 sections (M0–M16)
### Synthesized 2026-06-21 from a 3-blueprint judged design workflow. Build spec for the GOD PROMPT.

> Concept: a second-person ("you") cinematic FALL down an 8-rung shaft of deception that kills an Egyptian, then a mirrored CLIMB back up — verification tools first, then cognition — to the Library door. Two zones: DESCENT (warm→arterial→black) then THE FLIP → CLIMB (cold dawn→emerald→gold).
> All data is grounded — see `RESEARCH_VAULT/total_convergence_findings.md`, `study_the_problem.md` §1, `00_THE_SCIENTIFIC_STANDARD.md` §1/§17, `six-layers/data.ts` counters. Every number/case carries `{source, tier}`. Atom tags (#n) map to `gateway_prompt_atoms.md`.

## Master palette ramp
`#0B0E0C → #1A0F06 → #2A0608 → #050304 → [FLIP] → #0A1620 → #0E1C18 → #141008`
Three fixed `pointer-events-none` overlays: SVG `feTurbulence` grain (op .05, blend overlay), scanline/photocopy (op .04), per-zone grading `motion.div` cross-fade + clamped `useVelocity→hue-rotate(±3deg)` (off <768px / reduced-motion). **(atoms #7,#10,#11,#47,#48)**

---

### M0 · `descent-thread` — THE THREAD (WhatsApp cold-open) — atoms #51,#17,#21
- **Purpose:** grab attention; the seductive forwarded family-group message — "anyone can believe it."
- **EN:** a forwarded WhatsApp message: *"Insulin is a lie. Medicine is secondary — food is the cure."* · timestamp, "Forwarded many times."
- **AR:** «الأنسولين كذبة. الدوا ثانوي — الأكل هو العلاج.» · «أُعيد توجيهه كثيرًا».
- **Palette:** WhatsApp green `#25D366` on `#0B0E0C`; warm bone `#E8E2D6` text.
- **Animation:** chat bubble drops in; magnetically pulsing Forward button (`useSpring`, pointer-only); `Scene` particles seeded with slight −y velocity.
- **Layer:** seeds L1 (no origin); `<LayerTag>` withheld until M2.
- **Case/source:** Al-Awadi "insulin is a lie" thesis — Al-Masry Al-Youm #4249980 / Egyptian Medical Syndicate strike-off 17 Feb 2026 — **Tier A.**
- **Reduced-motion/320px:** static bubble, no pulse; single card <768px.

### M1 · `descent-pull` — THE PULL BEFORE THE FALL — atoms #16,#17,#12,#13
- **Purpose:** "Anyone can believe it" — universality without shaming.
- **EN:** *"Anyone can believe it. That's not stupidity — it's design."* · *"In 2025, 14.5% of everything Egyptians read was false — up from 13.8%. The lie travels first."*
- **AR:** «أي حد ممكن يصدّقها. ده مش غباء — ده تصميم.» · «في ٢٠٢٥، ١٤.٥٪ من كل اللي المصريين بيقروه كان كذب — طالع من ١٣.٨٪. الكذبة بتوصل الأول.»
- **Palette:** `#0B0E0C`, warm bone type.
- **Animation:** Scene particle field, particles −y; GSAP SplitText line-mask (lines only — Arabic ligature safety) + ScrollTrigger; two count-ups (framer `useMotionValue`, Arabic-Indic via `Intl.NumberFormat('ar-EG')`): `14.5%` and `13.8%→14.5%` delta.
- **Data-viz:** "lie vs truth" sparkline — false news 70% more likely retweeted, 6× faster (Vosoughi 2018).
- **Layer:** L1 `<LayerTag n={1}/>`.
- **Source:** Egyptian Cabinet Media Centre 2025 (study_the_problem §1.1; data.ts counter) — **Tier A**; Vosoughi et al., *Science* 2018 — **Tier A.**
- **Cognition:** faint first seed — *"STOP. Notice the emotional pull."* (L1 SIFT step 1), deliberately weak; returns at full strength on the climb.

### M1.5 · `descent-problem` — THE THREE THINGS NOBODY TAUGHT YOU — atoms #18,#19,#20,#22,#23,#24,#25,#21
- **Purpose:** name the exact gap that the platform later closes; state the danger framing in full.
- **EN:** *"Nobody taught you three things: how to reach a source you can trust, how to check that it's real, and how to use it in your life. This isn't 'just information.' It's real, it's harmful, it's dangerous — the single most dangerous thing around you — and it has killed."*
- **AR:** «محدش علّمك ٣ حاجات: إزاي توصل لمصدر تثق فيه، إزاي تتأكد إنه حقيقي، وإزاي تطبّقه في حياتك. دي مش "مجرد معلومات". دي حقيقة، ومضرّة، وخطيرة — أخطر حاجة حواليك — وقتلت بالفعل.»
- **Palette:** `#1A0F06` warming.
- **Animation:** three short lines mask-reveal in sequence (SplitText lines); the words "killed/قتلت" hold under a red pulse.
- **Note:** the three gaps are explicitly answered later — **reach + verify by M13 (tools)**, **apply-in-life by M14 (cognition)**. (atoms #18,#19 → M13; #20 → M14.)

### M2–M9 · THE EIGHT-LAYER SHAFT — `descent-layer-1 … 8`, descending — atom #41 (8 layers)
Pinned vertical descent; each layer = one viewport, bg darkens one notch; left-rail **depth gauge** fills −1→−8. Shared `<DescentLayer>` (fork of `LayerSection`: keeps AnimatedCounter + CaseCard+ESC-modal + glass), data-driven. Each: ghost numeral `−{n}`@.06, `<LayerTag>`, AR+EN layer name, one real case in second person, one scrubbed micro-viz, the gauge, grain. Accent from `LAYER_COLORS[n]` (extend keys 7–8).

| M | id | Layer AR / EN | "You" beat | Real case + source (tier) | Micro-viz (lib) |
|---|---|---|---|---|---|
| M2 | `descent-layer-1` | الكذب المطلق / Absolute Fabrication | *You believe the cure exists because no one shows you it doesn't.* | Curcumin Doctor (Abou El-Nasr) — pharmacist not physician; "curcumin cures all"; 8,045 unregistered packages; a diabetic died — findings §2 (AMAY #2530265, Youm7) **B** | count-up `8,045` + `183+ frauds` `[corpus]`; DrawSVG citation chain to a dead-end node |
| M3 | `descent-layer-2` | العدسة المنحازة / Biased Lens | *You see only testimonials, never the deaths.* | Al-Awadi نظام الطيبات — real nutrition bent (fruit/fish banned, sugar/Nutella allowed) — Syndicate + Al Jazeera **A** | "shown vs omitted" split bar (recharts), scrubbed; omitted half slides in late |
| M4 | `descent-layer-3` | اقتطاع السياق / Decontextualization | *A word from the Qur'an is turned against your body.* | Al-Awadi «الطيبات/الخبائث» Qur'anic terms recoded to ban foods — **A** | quote-in-context restorer; GSAP clip-path wipe (NOT SplitText on scripture) |
| M5 | `descent-layer-4` | التوقيت المسلّح / Weaponized Timing | *The "if I die, I was killed" video drops the moment doubt rises.* | Al-Awadi pre-recorded "I was killed, never suicide" minting a martyr after his Dubai death (ruled natural) — AMAY #4249980 **A**; + EGP-float rumors timed to MPC day 3 Feb 2024 §5 | timeline scrub event-vs-release; "Why now? Who benefits?" pins (d3 time-scale + DrawSVG) |
| M6 | `descent-layer-5` | التطبيق الشرير / Evil Application (THE KILL) | *Real knowledge, turned into a weapon against your veins.* | The deaths: diabetic quit insulin → coma, dead in a week; lupus off steroids → dead in ICU (Al-Awadi §1 **A**); + counterfeit Unictam 1500 — 48 adverse events, 12 governorates, one miscarriage (EDA Circular 9/2022; WHO PIDM **A**; tabloid deaths UNVERIFIED); + 53.9% self-medicate antibiotics (Mostafa 2021 **S**) | **THE FLATLINE** — ECG/insulin line draws, flatlines on the death sentence (SVG + DrawSVG); `53.9%` counter; bg snaps arterial `#2A0608` |
| M7 | `descent-layer-6` | مصفوفة التلاعب / The Matrix | *When your cousin warns you, you defend the liar — facts push you deeper.* | «دجال المرج» Mahmoud Radi, 30, beaten to death as "jinn leaving," his own family helped; healer+4 family arrested — §4 **B** (verdict UNVERIFIED); + 78.4% OCD→jinn (PMC 2019 **S**); ~67% non-doctor first (Okasha **S/A**) | "backfire" diagram: fact arrow bounces off belief, belief grows (framer); nodes repel on scroll |
| M8 | `descent-layer-7` | المهندسون / The Architects | *You were never the target of one man — you're inside a machine.* | HoggPool Ponzi — 9,000+ e-wallets, 3,367 SIMs, 29 arrested, FX-pain weaponized; official ≥19M EGP; the 6B EGP / 800,000-victim figure shown `[CONTESTED]` violet, NOT adopted — §9 (CBS/AlJazeera/LoC) **A**; + 82M internet users as the rail (Freedom House **A**) | **Egypt governorate flow-map** — propagation arcs, edge weight = spread (d3-geo + DrawSVG, particles via getPointAtLength, throttled mobile) |
| M9 | `descent-layer-8` | المجهول / The Unknown | *Some of it, honestly, we don't know — and the liar exploits exactly that.* | Al-Awadi's death — official natural cardiac; demanded second autopsy unpublished → held as calibrated uncertainty, neither asserted nor denied — §1 + gaps | **confidence-band gauge** (recharts area band) that refuses 0/100%; needle settles into a band, never resolving |

### M10 · `descent-radius` — THE BLAST RADIUS — atoms #39,#42,#43,#44,#45,#27,#28,#29
- **Purpose:** damage across ALL of one person's views, then ripple family→friends→community.
- **EN:** *"It didn't stop at you. It moved through your body, your faith, your wallet, your vote, your dinner table."*
- **AR:** «ماوقفش عندك. عدّى في جسمك، في إيمانك، في جيبك، في صوتك، وعلى سفرة العشا.»
- **Palette:** arterial `#2A0608` → floor `#050304`.
- **Structure:** central "you" avatar; **5 concentric petals** (Medical · Religious · Economic · Political · Social) each opening to a sourced stat; then a **2nd ring Family → Friends → Community**.
- **Flagship map (atom #39):** Egypt 27-governorate choropleth (d3-geo `geoMercator().fitSize` → React `<path>`), recolor per scroll-step by domain. **HONESTY GATE:** until live per-governorate data exists from `/api/search/evidence` + `src/lib/debunking/`, ship a clearly-labeled **"modeled distribution"** keyed off national sector shares — never asserted as measured. GeoJSON at `src/data/egypt-governorates.geojson` (GADM ADM1, simplified <100KB, plain GeoJSON); absent → `<FailLoud>`. **Mandatory a11y `<table>` twin.**
- **Per-domain stat + source:** Medical 53.9% antibiotics w/o Rx (Mostafa 2021 **S**), 91.7% from pharmacies (Elden 2020 **S**); Religious/Mental 78.4% OCD→jinn (PMC 2019 **S**), 67% non-doctor first (Okasha **S/A**), 1.44 psychiatrists/100k (WHO-AIMS **A**); Economic ~38% EGP devaluation Mar 2024, 36.5% peak inflation Jul 2023, gold 1,650→3,175 EGP (§5 **A/B**); Political state-project misinfo **45.7%** (Cabinet Media Centre **A**); Social anchor «دجال المرج» family complicity (§4).
- **Layers:** L5 + L6 at personal scale. **Animation:** petals bloom `whileInView` stagger; choropleth cross-fade per step.

### M11 · `descent-floor` — THE FLOOR — atom #26
- **EN:** *"This is the bottom. People are dead, and the lie is still being forwarded."* · **AR:** «دي القاع. ناس ماتوا، والكذبة لسه بتتبعت.»
- **Palette:** `#050304`, grain max, one slow red drip. Particles hang motionless (velocity→0). framer fade only. Sets up the FLIP. Reduced-motion: static near-black poster.

### M12 · `climb-turn` — THE FLIP (the page's central WOW) — atoms #30,#1
- **Purpose:** horror→hope pivot. Sets `localStorage 'eal-descent-seen'='1'` (skip-on-return).
- **EN:** *"You can climb. Not with willpower — with method."* · *"Everything below was the fall. Everything above is how you rise."*
- **AR:** «تقدر تطلع. مش بالنية — بالمنهج.» · «كل اللي تحت كان النزول. كل اللي فوق هو الطلوع.»
- **THE FLIP (one pinned scrub):** particle color drains arterial-red→teal/gold; bg `#050304→#0A1620`; grain `.05→.02`; vignette inverts to glow; downward particles **reverse upward** (flip velocity sign — payoff of M1/M11); depth gauge drains upward.
- **Lib:** one GSAP ScrollTrigger `pin:true, scrub` drives ParticleField color uniform (read `ScrollContext.stateRef` in `useFrame`) + framer `background` cross-fade + velocity-sign flip; SplitText reveal. **Reduced-motion:** hard cut between two static posters.

### M13 · `climb-tools` — MOVEMENT ONE: THE VERIFICATION ARSENAL — atoms #31,#32,#33,#34,#18,#19,#37(order)
- **Purpose:** name the strong verification tools + their strength + the layer each guards (answers "how to reach/verify").
- **EN:** *"First, the instruments. These don't ask you to trust — they let you check. Five academic indexes. No claim without a citation."* · **AR:** «الأول، الأدوات. دي مابتقولكش 'صدّق' — دي بتخليك تتأكد. خمسة فهارس أكاديمية. ولا ادّعاء بلا مصدر.»
- **Palette:** cold slate `#0A1620` + emerald `#10B981` + forensic-cyan.
- **Structure:** horizontal **pinned filmstrip** (GSAP `matchMedia('(min-width:768px)')` pin+scrub; **stacks vertically <768px**). A mock pipeline animates a claim flowing RETRIEVE → RELEVANCE → CROSS-VERIFY → CITE → CRITIQUE (DrawSVG connectors).
- **Tools (name · strength · honest caveat · layer guarded):**
  1. **Evidence Aggregator** (OpenAlex+Semantic Scholar+Crossref+Europe PMC+DOAJ) — RAG; no retrieval ⇒ "insufficient evidence, never a guess." **Guards L1.**
  2. **Relevance Logic Layer** — adjudicates each source from its abstract (zod, threshold 0.5). **Guards L2/L3.**
  3. **Google Fact Check / ClaimReview + Claim-Matching Index (BGE-M3/E5+BM25)** — "already debunked?", strong Arabic. **Guards L1/L6.**
  4. **Media forensics row** — C2PA + exifr + ELA(sharp) + reverse-image(InVID) + deepfake score under calibrated uncertainty (caveat: models 61–69%, **no auto-"fake" label**). **Guards L3/L4/L1.**
  5. **Cross-Model Consensus (Gemini Mega-Rotator + God-System)** — ≥2 providers; agree⇒HIGH, disagree⇒CONTESTED. **Anchors L8.**
  6. **Provenance Enforcement + Adversarial Self-Critique (zod `sources[]` + real critique pass)** — empty sources ⇒ UNVERIFIED. **Guards L2/L8.**
  7. **Tiered Whitelist + Retraction-Watch gate** — S→A→B→C. **Guards L1/L2.**
  8. **HadithAPI graded-hadith + Qur'an/Tafsir/Fatwa (Dar al-Ifta/Al-Azhar)** — never a narration without grade; verse always with surah:ayah + tafsir. **Guards L1/L3/L5.**
- **≥2 live API rule:** cards 1 & 3 deep-link live `/api/search/evidence` + debunking pipeline, show live counts.

### M14 · `climb-cognition` — MOVEMENT TWO: HOW THINKING IS BUILT (the deepest part) — atoms #35,#36,#37,#20,#40(defenses)
- **Purpose:** the thesis. Tools verify content; cognition rebuilds the person. Map all 8 defenses 1:1 to the 8 layers (answers "how to apply in your life").
- **EN:** *"Tools check a claim. Thinking changes the person. This is the part that stays."* · **AR:** «الأدوات بتفحص الخبر. التفكير بيغيّر الإنسان. ده الجزء اللي بيفضل.»
- **STRUCTURE:** the reader **climbs the identical shaft in reverse** — ascends Layer 8→1, ghost numerals `+8…+1`; at each rung the technique **visually overwrites** the deception (GSAP **Flip** from the M2–M9 visual to its defense). Emerald `#0E1C18`→gold `#141008`.
- **Per-layer cognition (counter the exact bias):** L1 Lateral Reading+SIFT (Caulfield; Wineburg&McGrew 2017); L2 Omission Audit+Steelmanning; L3 Upstream Reading+Toulmin Warrant; L4 Cui Bono+Temporal Forensics; L5 Is–Ought Separation+Dual-Use Ethics; L6 Inoculation/Prebunking+Bubble-Exit (McGuire 1964; van der Linden & Roozenbeek); L7 Systems & Incentive Mapping (Zuboff 2019); L8 Bayesian Calibration+Steelman the Null (Tetlock 2015).
- **Inoculation arsenal (named + cited):** Jigsaw prebunks (recognition ↑ up to 2.1×, Science Advances 2022), Bad News (d≈0.36–0.41), Harmony Square (d=0.54), GoViral! (d≈0.52–0.56), MIST-20 + Arabic headline bank (Maertens 2023, N=8,504), "SIFT-it" button — caveat: one-shots may not durably help → spaced boosters.
- **Data-viz:** `@nivo/radar` "your cognitive defenses" 8-axis chart that **fills as you ascend** (earned self-mastery score), RTL-aware. DrawSVG draws upward; per-rung Flip overwrite.

### M15 · `enterprise-awareness` — THE ENTERPRISE TIER — atoms #53,#54,#55,#56
- **Purpose:** announce paid **ENTERPRISE AWARENESS** without breaking the sober tone.
- **EN:** *"ENTERPRISE AWARENESS — decisions defended by the strongest tools, trained on the strongest sources. Where the individual climbs out, the enterprise builds the ladder for thousands."* · **AR:** «الوعي المؤسسي — قراراتٌ تحميها أقوى الأدوات، مُدرَّبةٌ على أقوى المصادر. حيث الفرد بيطلع — المؤسسة بتبني السلّم لآلاف.»
- **Palette:** gold-on-near-black `#141008` + `--accent-cta` glow; restrained `.glass-card`.
- **Visual:** executive board card + small enterprise dashboard mock (`@nivo/radar` org-awareness + `recharts` credibility time-series). 3 columns: what you get (full tool swarm + Cross-Model Consensus + curated S/A corpus + cohort training) · who it's for (investors/enterprises) · the outcome.
- **Animation:** framer entrance; gold gradient-text shimmer (transform/opacity); magnetic CTA (`useSpring`, gated `(hover:hover) and (pointer:fine)`); single `canvas-confetti` burst only on CTA hover. CTA `.btn-primary` → "Request Enterprise Access"; secondary → "Enter the Library."

### M16 · `gateway-door` — THE DOOR — atoms #4,#30(resolve)
- **EN:** *"You came in believing a message. You leave able to question one. Welcome to the Library."* · CTA *"Enter →"* · **AR:** «دخلت وانت مصدّق رسالة. بتخرج وانت قادر تشكّك فيها. أهلاً بيك في المكتبة.» · «ادخل ←».
- **Palette:** warm gold dawn `#141008`→bone; grain→~0.
- **Animation:** particle field coalesces from chaos into a calm slow upward drift (final R3F state); SVG door aperture draws open (DrawSVG); SplitText final line. Confetti withheld (dignified close). `<PageNavigation currentPath="/the-descent"/>`; CTA → `/six-layers` or `/`.

---

## FILE / BUILD PLAN (installed libs only; one new asset)
```
src/app/the-descent/
  layout.tsx        // Server Component: bilingual metadata + immersive <style> chrome-hide (copy six-layers/layout.tsx)
  page.tsx          // 'use client'; wraps <ReactLenis root> + <ScrollProvider>; inner <DescentExperience/>
src/components/the-descent/
  DescentExperience.tsx   // mounts Scene + DepthRail + grain + grading overlay; Lenis+GSAP shared-RAF; mouse/scroll → ScrollContext; imports M0–M16 in order
  ThreadSection.tsx (M0) PullSection.tsx (M1) ProblemSection.tsx (M1.5) DescentLayer.tsx (M2–M9, data-driven)
  BlastRadiusSection.tsx (M10) FloorSection.tsx (M11) ClimbTurnSection.tsx (M12 THE FLIP)
  ToolsFilmstrip.tsx (M13) CognitionShaft.tsx (M14) EnterpriseTier.tsx (M15) GatewayDoor.tsx (M16)
  DepthRail.tsx           // left gauge −8…+8 (fork FloatingNav, parameterized to descent ids)
  viz/EgyptChoropleth.tsx // d3-geo SVG + mandatory <table> a11y fallback + "modeled distribution" label
  viz/ScrubLineChart.tsx  // recharts + framer pathLength (M3 split bar, M9 confidence band)
  viz/FlowMap.tsx         // M8 d3-geo arcs + DrawSVG
  shared/Sourced.tsx, LayerTag.tsx, DefenseChip.tsx, FailLoud.tsx
  descent-data.ts         // ALL copy EN/AR + cases + stats + {source,tier} + layer↔defense map + tool list (single source of truth)
src/data/egypt-governorates.geojson   // NEW asset (GADM ADM1 → simplified <100KB, plain GeoJSON)
```
**Reuse directly:** `ScrollProvider`/`useScrollContext`, `Scene`/`SceneCanvas`/`ParticleField`, `LayerSection` (fork base), `LAYER_COLORS` (extend keys 7–8), `.glass-card`/`.btn-primary`, `useRTL`, `PageNavigation` (after `PAGE_ORDER` patch).
**Scroll engine:** adopt real `lenis/react` `<ReactLenis root>`; bridge `lenis.on('scroll', ScrollTrigger.update)` + `gsap.ticker.add(t=>lenis.raf(t*1000))`. **Do NOT reuse `src/lib/scroll/smooth-scroll.tsx`** (it `preventDefault`s wheel → breaks pin/sticky — fatal). `gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin, SplitText, Flip, Observer)` inside `useEffect`/`useLayoutEffect`; `gsap.context()` cleanup. **MorphSVG NOT in dist → use Flip**, never shape-morph.
**Libs:** framer-motion ^12.40, gsap ^3.15 (+ScrollTrigger/DrawSVG/SplitText/Flip/Observer), lenis ^1.3, three ^0.184/@react-three/fiber ^9.6/drei ^10.7/postprocessing ^3.0, d3 ^7.9 (d3-geo, d3-scale-chromatic), recharts ^3.8, @nivo/radar, canvas-confetti, lucide-react. **No new deps except the geojson asset.**

## REDUCED-MOTION + 320px (central, fail-safe)
One `gsap.matchMedia('(prefers-reduced-motion: no-preference)')` for all GSAP + framer `useReducedMotion()`. Reduced ⇒ particles snap / fall back to Scene's static radial-gradient; DrawSVG sets final state; M12 flip = hard cut between two posters; choropleth cross-fades fills + data table; grain static; count-ups render final; no magnetic cursor/confetti. Every pinned/horizontal/WebGL block wrapped in `matchMedia('(min-width:768px)')` with explicit stacked fallback. Fluid type to 320px; RTL via `dir="rtl"` + inline `fontFamily:"var(--font-heading-ar)"` (NEVER the no-op `font-cairo`). Arabic-Indic digits via `Intl.NumberFormat('ar-EG')`. SplitText on Arabic: lines/words only, never chars; scripture uses clip-path.

## WOW MOMENTS
1. **WhatsApp cold-open (M0)** — forwarded family message, magnetically pulsing Forward, the seductive `#25D366` green that sickens on scroll.
2. **THE FLATLINE (M6)** — insulin/ECG line draws across the viewport, flatlines on "dead within a week," bg snaps arterial.
3. **THE FLIP (M12)** — one pinned scrub drains red out of the live particle field, reverses every particle upward, cross-fades the page to cold dawn — the horror→hope hinge.
4. **THE MIRRORED SHAFT (M2–M9 vs M14)** — fall down 8 rungs (−1…−8); climb the identical shaft in reverse (+8…+1), each technique Flip-overwriting the deception that dropped you.
5. **THE BLAST-RADIUS CHOROPLETH (M10)** — Egypt's 27 governorates recoloring per domain as damage ripples you→family→community, labeled "modeled distribution" with an a11y table twin.
6. **THE DEFENSE RADAR (M14)** — an 8-axis radar of "your cognitive defenses" filling as you ascend.
