# UI Components — slice comp-2

Covers items 52–102 of the ASCII-sorted `src/components/**/*.tsx` list.  
Files: 51 · Features catalogued: 102

---

## hunter/HunterMode

- **Live Trend Radar** — Fetches real-time trending topics from `/api/hunter/trends` and displays the top-15 results for Egypt or Worldwide in a ranked list with surge volume. _Use case:_ Investigators or educators scanning which claims are going viral right now so they can preemptively debunk them. (`src/components/hunter/HunterMode.tsx`)
- **Egypt/Worldwide geo toggle** — Tab control switching the trend feed between EG and US (worldwide) Google Trends geographies. _Use case:_ Distinguishing locally-trending misinformation from globally-trending ones. (`src/components/hunter/HunterMode.tsx`)
- **Medical Credentials Hunter** — Search form that queries the Egyptian Medical Syndicate (EMS) database via `/api/hunter/medical`, auto-injecting wildcard characters, and returns credential status with a UserCheck/UserX badge. _Use case:_ Verifying whether someone claiming to be a doctor is actually registered, surfacing potential imposters on social media. (`src/components/hunter/HunterMode.tsx`)
- **Embedded RumorHeatmap** — Renders the `RumorHeatmap` component inline below the two OSINT panels to complete the Hunter Mode dashboard. _Use case:_ Provides geographic spread context alongside the trend and credential tools. (`src/components/hunter/HunterMode.tsx`)

---

## hunter/RumorHeatmap

- **Epidemiological Heatmap** — Animated SVG/div map of Egypt divided into six named regions, each represented by a pulsing colored node whose severity (critical/high/medium/low) is color-coded. _Use case:_ Visually communicating which regions of Egypt have the highest concentration of rumor activity in a training or awareness context. (`src/components/hunter/RumorHeatmap.tsx`)
- **Rotating radar sweep** — CSS conic-gradient div rotating 360° continuously over the map to simulate a live OSINT radar scan. _Use case:_ Visual engagement device that reinforces the "active scan" metaphor while the map auto-refreshes every 5 seconds. (`src/components/hunter/RumorHeatmap.tsx`)
- **Hover tooltip with severity** — AnimatePresence-powered tooltip appearing on region node hover, showing region name, severity label, and an illustrative disclaimer. _Use case:_ Letting the user inspect individual regions without cluttering the map. (`src/components/hunter/RumorHeatmap.tsx`)

---

## hunter/ThreatMap

- **Patient Zero Propagation Map** — Animated directed-graph visualization showing how a rumor flows from an anonymous origin board → Telegram/Twitter → WhatsApp groups → Facebook → general public, with animated SVG path-draw edges and moving data-packet circles. _Use case:_ Teaching users how misinformation spreads through a multi-platform chain, used as an explainer inside exercise pages or debunking dashboards. (`src/components/hunter/ThreatMap.tsx`)
- **Claim tracking label** — Optional `claim` prop displays the tracked claim text beneath the title so the map is contextually tied to a specific piece of misinformation. _Use case:_ Embedding the map inside a debunking result page to show the propagation of a specific claim. (`src/components/hunter/ThreatMap.tsx`)
- **8-second animation loop** — The entire graph resets and replays every 8 seconds so the propagation story repeats without user interaction. _Use case:_ Suitable for display-mode kiosk or demo contexts. (`src/components/hunter/ThreatMap.tsx`)

---

## interactive/branching-visual-experience

- **BranchingVisualExperience (5-state simulation)** — Multi-phase interactive experience (idle → spreading → branches → truth → rewinding → rewound → correcting → corrected) that simulates a medical misinformation WhatsApp message spreading across 6 Egyptian family archetypes, culminating in a DeepReal correction. _Use case:_ Main interactive centerpiece on the home/awareness page to viscerally demonstrate how one false sentence causes cascading harm. (`src/components/interactive/branching-visual-experience.tsx`)
- **Live spread counter** — Animated number counter (countTo function with cubic easing) ticking from 0 to 3000 shares during the spreading phase, and reversing during the rewind. _Use case:_ Makes the abstract scale of viral spread concrete and alarming. (`src/components/interactive/branching-visual-experience.tsx`)
- **Harm branch reveal** — Six character cards (father, child, mother, believer, pharmacist, teacher) that animate in staggered and expand with emotional hook + harm path + corrective source when truth mode is active. _Use case:_ Shows the user multiple real-world vectors through which a single claim causes harm. (`src/components/interactive/branching-visual-experience.tsx`)
- **Hold-to-time-travel rewind** — Press-and-hold button (2-second hold with progress bar) that reverses the branch count and share counter, undoing the simulated harm. _Use case:_ Metaphor for awareness and verification stopping the spread; adds friction to make the lesson memorable. (`src/components/interactive/branching-visual-experience.tsx`)
- **DeepReal correction typewriter** — After the rewind, a "DeepReal" button triggers a character-by-character typewriter replacement of the false claim with a WHO-sourced correct statement. _Use case:_ Demonstrates what AI-assisted correction looks like and drives users toward the DeepReal engine. (`src/components/interactive/branching-visual-experience.tsx`)
- **Positive correction branches** — After DeepReal fires, six positive resolution cards replace the harm cards (green border), showing how each archetype behaves when equipped with correct information. _Use case:_ Ends the simulation on an empowering note, showing that verification changes outcomes. (`src/components/interactive/branching-visual-experience.tsx`)
- **EgyptSpreadMap** — Inline SVG map of Egypt with 10 city dots lighting up red (spreading) or green (corrected) as the simulation progresses. _Use case:_ Geographic anchoring that makes the spread feel local and relevant to Egyptian users. (`src/components/interactive/branching-visual-experience.tsx`)
- **WhatsApp share card** — Final state renders a pre-composed WhatsApp share link and a DeepReal link for users to share the corrected message with their own contacts. _Use case:_ Turns awareness into action by giving users a ready-made truth-forward message. (`src/components/interactive/branching-visual-experience.tsx`)
- **Text-only fallback** — Toggle button switches to a static table view with no animations for users who prefer reduced-motion or accessibility modes. _Use case:_ Accessibility compliance and low-bandwidth environments. (`src/components/interactive/branching-visual-experience.tsx`)
- **Reduced-motion support** — `useReducedMotion()` hook checks `prefers-reduced-motion` and skips all timers/animations, collapsing them to instant transitions. _Use case:_ Compliance with WCAG 2.1 §2.3. (`src/components/interactive/branching-visual-experience.tsx`)

---

## interactive/micro-interactions

- **TextReveal** — Word-by-word reveal animation that exposes text at a configurable per-word delay with an `onComplete` callback. _Use case:_ Slows user reading rhythm during the Bias Reflection Minute exercise to force deliberate reading. (`src/components/interactive/micro-interactions.tsx`)
- **WaveformIndicator** — Five animated CSS bars that pulse when `playing=true`, static otherwise, with an aria-label for screen readers. _Use case:_ Visual indicator while the ExpertVoiceCapsule audio plays. (`src/components/interactive/micro-interactions.tsx`)
- **DecisionTreeAccordion (micro-interactions variant)** — Collapsible accordion rendering if/then decision paths with max-height CSS animation. _Use case:_ Displays SIFT method or verification decision logic without overwhelming vertical scroll. (`src/components/interactive/micro-interactions.tsx`)
- **PeerPairTabs** — Tab navigation component with a sliding underline indicator (translateX) that switches between "My Answer" and "Peer's Answer" panels. _Use case:_ Post-exercise comparison view showing how a peer approached the same claim. (`src/components/interactive/micro-interactions.tsx`)
- **ExpertMarquee** — Infinite-scroll marquee with two rows of expert testimonial cards scrolling in opposite directions. _Use case:_ Ambient social proof on landing pages, showing that real experts endorse the platform's approach. (`src/components/interactive/micro-interactions.tsx`)

---

## interactive/scroll-physics

- **ParallaxHero** — Wraps hero children with a background div that moves at 0.3× scroll speed via a passive scroll listener. _Use case:_ Adds visual depth to hero sections connecting the awareness layers. (`src/components/interactive/scroll-physics.tsx`)
- **ScrollProgressBar** — Top-of-page scaleX progress bar tracking scroll percentage through the full document. _Use case:_ Shows 14-day curriculum progress as a persistent visual cue tied to scroll depth. (`src/components/interactive/scroll-physics.tsx`)
- **StaggerReveal** — IntersectionObserver wrapper that adds a `visible` CSS class when 20% of the element is in view, triggering stagger animations on children. _Use case:_ Gradually dismantles myth autopsy sections as the user scrolls down. (`src/components/interactive/scroll-physics.tsx`)
- **StickyChecklist** — `position:sticky` verification checklist that stays alongside the user while they read a claim, crossing off items as they are checked. _Use case:_ Reinforces the SIFT method by keeping verification steps visible during content consumption. (`src/components/interactive/scroll-physics.tsx`)
- **HorizontalScrollCards** — Horizontal scroll-snap container for cards that saves vertical page space. _Use case:_ Negative-coping awareness cards and any card deck where vertical stacking would exhaust scroll endurance. (`src/components/interactive/scroll-physics.tsx`)
- **DotNavigation** — Centered dot-nav indicator where the active dot enlarges 1.5×; clicking a dot fires `onNavigate`. _Use case:_ Step sequencing during full-screen SIFT Method training modules. (`src/components/interactive/scroll-physics.tsx`)

---

## interventions/advanced-modes

- **SourceCompare** — Side-by-side panel showing the same topic from 2–3 trusted sources (Band A/B/C color-coded), with a hidden triangulation takeaway revealed on button click. Includes pre-built comparisons for DeepReal, Mental Health, and Religion Hub topics. _Use case:_ Teaching lateral reading / source triangulation by making the contrast between a Band-A source and a viral post visible. (`src/components/interventions/advanced-modes.tsx`)
- **ExpertCapsule (advanced variant)** — Expandable card showing a ~90-second text explanation by a research-grounded domain expert on one concept (fake news vulnerability, mental health literacy, or religious coping). _Use case:_ Delivering bite-sized expert context within an exercise without requiring audio playback. (`src/components/interventions/advanced-modes.tsx`)

---

## interventions/behavior-modes

- **BiasReflection** — Three-step metacognition prompt asking "Did I want this to be true?", "What emotion did I feel?", "Did my judgment change?" with a text area each step and a completion callback. _Use case:_ Post-exercise reflection that trains users to notice emotional bias during information processing. (`src/components/interventions/behavior-modes.tsx`)
- **CorrectionLedger** — Reads from `progress-service` and displays the user's last 10 corrected beliefs (what I thought → what is actually true, with date). _Use case:_ Normalizing being wrong as part of learning by creating a personal record of successful belief revision. (`src/components/interventions/behavior-modes.tsx`)
- **DecisionTree (behavior-modes)** — Multi-node branching navigator for Mental Health (crisis → support → grounding) and Religion Hub (guidance → guilt → coping) paths, each terminal node with specific action guidance. _Use case:_ Safely routing distressed or confused users to the correct resource without the app providing clinical advice. (`src/components/interventions/behavior-modes.tsx`)

---

## interventions/decision-tree

- **DecisionTreeAccordion (interventions)** — Accordion-based decision tree navigator using pre-built MH_DISTRESS_TREE and RELIGION_COPING_TREE node sets, each with action-type-coded rows (action/warning/resource). _Use case:_ "If distressed → stop → ground → read disclaimer → seek help" safety flow embedded in any exercise. (`src/components/interventions/decision-tree.tsx`)

---

## interventions/engagement-modes

- **VerificationChecklist** — Five-item interactive checklist (source, date, evidence, other source, emotion check) that fires `onComplete` when all items are ticked. _Use case:_ Persistent friction before a user accepts a claim; the SIFT method in checkbox form. (`src/components/interventions/engagement-modes.tsx`)
- **MicroScenario** — Short (~1 min) scenario card for idle-time learning: presents a realistic social media scenario, asks one question, hides an insight until the user clicks reveal. _Use case:_ No-pressure practice between formal exercises to build intuitive pattern recognition. (`src/components/interventions/engagement-modes.tsx`)
- **AfterActionReview** — Weekly summary dashboard pulling live stats from `progress-service` (exercises completed, corrections, sources consulted, avg confidence shift, verification actions) plus three reflection prompts. _Use case:_ Weekly metacognition session helping users understand what changed and what fooled them. (`src/components/interventions/engagement-modes.tsx`)

---

## interventions/evidence-ladder

- **EvidenceLadder** — 7-rung visual ladder from "Opinion/Social Media" (level 0) up to "Systematic Review" (level 6), each rung expandable to show description and example; optional `highlightLevel` prop highlights where specific content sits. _Use case:_ Teaching users why not all evidence is equal, embedded next to any piece of content to contextualize its source quality. (`src/components/interventions/evidence-ladder.tsx`)

---

## interventions/expert-voice-capsule

- **ExpertVoiceCapsule** — Audio player (or Web Speech API TTS fallback) showing expert name/role, animated waveform bars, play/pause, and a togglable transcript panel. _Use case:_ Delivering 60–90-second expert audio explanations within exercises without requiring pre-recorded audio files. (`src/components/interventions/expert-voice-capsule.tsx`)

---

## interventions/mode-control-room

- **ModeControlRoom** — Reads the 17-mode intervention framework schedule (`intervention-schedule` data) for the current day, renders the active mode cards (name, duration, cadence, description), and shows a cadence map of the 14-day journey in a grid. Accepts MVP and compact props. _Use case:_ A transparent "what is the system doing today" panel for educators, supervisors, or curious users. (`src/components/interventions/mode-control-room.tsx`)

---

## interventions/myth-autopsy

- **MythAutopsy** — 5-step stepper (Claim → Emotional Hook → Missing Evidence → Corrective Source → Corrected Understanding) with step-indicator buttons, forward/back navigation, and a "Show All Steps" option. Pre-built myth cases for DeepReal (deepfake detector hype, fact-check absolutism), Mental Health (depression as laziness, anxiety dismissal), and Religion Hub (faith vs therapy). _Use case:_ Converting abstract media literacy into pattern recognition by autopsy-style breakdown of real myth archetypes. (`src/components/interventions/myth-autopsy.tsx`)

---

## interventions/peer-pair-review

- **PeerPairReview** — Tab navigation (sliding underline via translateX) comparing the user's reasoning with a peer's reasoning on the same claim, with the claim text truncated in the header. _Use case:_ Post-exercise social comparison that exposes users to alternative verification approaches. (`src/components/interventions/peer-pair-review.tsx`)

---

## interventions/source-of-day

- **SourceOfDay** — Daily spotlight card (one per 14-day intervention day) for a specific trust-Band-A source: what it's good for, what NOT to use it for, a real example, and a "Got it ✓" dismiss button persisted to localStorage. Shows once per day per user. _Use case:_ Building long-term source memory by introducing one trusted source per day during the 14-day curriculum. (`src/components/interventions/source-of-day.tsx`)

---

## interventions/time-friction-gate

- **TimeFrictionGate** — Wraps any CTA button with a countdown timer (configurable `delaySec`), locking it until the countdown reaches zero, then logs the friction event to localStorage. _Use case:_ COM-B anti-acceptance friction barrier that forces a pause before a user accepts or shares a claim. (`src/components/interventions/time-friction-gate.tsx`)

---

## mh/HelpSeekingWizard

- **HelpSeekingWizard (mh variant)** — Renders a list of Egypt-specific mental health care pathways (public hospitals, Okasha Institute, private verified, primary care) with bilingual names and contact details. _Use case:_ Educational routing to verified Egyptian mental health resources without providing clinical advice. (`src/components/mh/HelpSeekingWizard.tsx`)

---

## mh/WhatsAppForwardCheck

- **WhatsAppForwardCheck** — Server component that classifies a pasted WhatsApp message via `classifyClaim`, then renders a three-question pre-forward checklist with conditional vague-authority warning flag and an affect-score alert when emotional manipulation is detected. _Use case:_ Intercepting the forward decision for Egyptian users in the habit of sharing health/religious content without verification. (`src/components/mh/WhatsAppForwardCheck.tsx`)

---

## misinfo-atlas/misinfo-card-integrated

- **MisinfoCardIntegrated** — Suspicious-content news card with thumbnail, "Suspicious" badge, source URL, title, and excerpt, plus three embedded `DefenseScannerOverlay` buttons (DeepReal image scan, Mental Health bias check, Religion Hub ontological anchor) for inline multi-engine verification. _Use case:_ Rendering flagged content items in a feed or atlas view with one-click verification for each engine. (`src/components/misinfo-atlas/misinfo-card-integrated.tsx`)

---

## onboarding/Tour

- **FortressTour** — React Joyride guided tour with four steps targeting `#mist-card`, `#pyramid`, `#sift-bar`, and `#journal` DOM anchors, with skip/continue and progress controls. _Use case:_ First-visit onboarding that orients new users to the platform's core tools without requiring them to read documentation. (`src/components/onboarding/Tour.tsx`)

---

## psychometrics/confidence-slider (standalone)

- **ConfidenceSlider (psychometrics/confidence-slider.tsx)** — Slider (0–100%) with color-coded confidence label and a "Lock My Confidence" button; once submitted, shows a locked read-only view. RTL-aware. _Use case:_ Collecting pre-answer confidence for Trust Calibration Error (TCE = |Confidence% − Correctness%|) measurement. (`src/components/psychometrics/confidence-slider.tsx`)

---

## psychometrics/psychometric-inputs

- **ConfidenceSlider (psychometric-inputs variant)** — Identical slider but outputs to the `§17.7` psychometric pipeline; simpler design without RTL or color label. _Use case:_ Embedded inside exercises to feed raw confidence data into the TCE calculation pipeline. (`src/components/psychometrics/psychometric-inputs.tsx`)
- **DwellTimeTracker** — Transparent wrapper that records `Date.now()` on mount, counts clicks inside the container, and fires `onAccept(dwellMs, clickCount)` via an "Accept & Continue" button. _Use case:_ Measuring the Acceptance Friction Score — how long a user spent and how many times they hesitated before accepting a claim. (`src/components/psychometrics/psychometric-inputs.tsx`)
- **AuthorityCard** — 16:9 aspect-ratio selectable card for source-ranking exercises; shows source logo emoji, name, type, and trust band badge. Equal visual weight regardless of source authority level. _Use case:_ Testing whether users pick sources based on name recognition (authority bias) vs. actual trust-band reasoning. (`src/components/psychometrics/psychometric-inputs.tsx`)
- **ThumbnailTrapTest** — 3×4 grid of 12 thumbnails (6 emotional, 6 neutral) that the user clicks to simulate their social media feed behavior; on submit reveals Emotional Trigger Susceptibility (ETS) score. _Use case:_ Measuring how strongly a user is drawn to emotionally-charged headlines vs. neutral factual ones. (`src/components/psychometrics/psychometric-inputs.tsx`)
- **ArchiveAwarenessButton** — Tracked button for reverse-search, archive-check, or whois-lookup actions that logs clicks to the AFS (Acceptance Friction Score) dataset. _Use case:_ Counting how often a user reaches for verification tools during exercises. (`src/components/psychometrics/psychometric-inputs.tsx`)

---

## pyramid/SourcePyramid

- **SourcePyramid3D** — React Three Fiber 3D pyramid of stacked boxes (6 tiers from social media at the bottom to WHO/Cochrane at the top) with bloom post-processing; optional `highlightTier` prop makes a specific tier glow; geometry cleanup on unmount. _Use case:_ Visually internalizing the source quality hierarchy; rotating 3D view makes it memorable compared to a flat list. (`src/components/pyramid/SourcePyramid.tsx`)

---

## religion/MaqasidCheck

- **MaqasidReasoningCheck** — Renders a list of Maqāṣid al-Sharīʿah impact assessments (5 protected interests: Din, Nafs, Aql, Nasl, Mal) with a harms/preserves badge for each impact passed in as props. _Use case:_ Evaluating whether a religious manipulation technique structurally harms or preserves Islamic protected interests, without issuing a fatwa. (`src/components/religion/MaqasidCheck.tsx`)

---

## religion/TafsirComponents

- **Stripped** — Displays a decontextualized Quranic snippet with a red warning border, labeled "The Decontextualized Snippet". _Use case:_ Step 1 of a Tafsir exercise, showing what the manipulation looks like before context is restored. (`src/components/religion/TafsirComponents.tsx`)
- **Reveal** — Gate component with a "Reveal Full Context" button that, when clicked, animates children into view (full context). _Use case:_ Forces the user to actively request the full context rather than seeing it passively. (`src/components/religion/TafsirComponents.tsx`)
- **Contextual** — Renders the full surrounding verses list after the reveal. _Use case:_ Step 2 of Tafsir exercise restoring the verse's textual neighborhood. (`src/components/religion/TafsirComponents.tsx`)
- **AsbabSection** — Amber-bordered panel displaying the Asbāb al-Nuzūl (circumstances of revelation). _Use case:_ Step 3, adding historical context to the verse. (`src/components/religion/TafsirComponents.tsx`)
- **CommentaryGrid** — 1–2-column grid of classical commentary cards (authority name + commentary text). _Use case:_ Step 4, showing how recognized scholars interpreted the verse. (`src/components/religion/TafsirComponents.tsx`)
- **UserReflection** — Labeled textarea prompting a cognitive reflection on how the full context changes the user's understanding. _Use case:_ Step 5, closing the Tafsir exercise with written metacognition. (`src/components/religion/TafsirComponents.tsx`)

---

## research/scientific-intelligence-center

- **ScientificIntelligenceCenter** — 6-tab dashboard (Scientific signals, Targeted people, Why trust them, Flag library, Stay updated, New standard) that fetches `/api/science/briefing` with domain/family/query filters and renders each collection. Falls back to static data on fetch failure. _Use case:_ Comprehensive research briefing panel giving educators or investigators a filterable view of the EAL's scientific evidence base, audience risk profiles, trusted sources, and misinformation flag library. (`src/components/research/scientific-intelligence-center.tsx`)

---

## research/support-directory-panel

- **SupportDirectoryPanel** — Grid of verified support/escalation directory entries (phone hotlines, official web resources) filtered by MVP scope, with name, jurisdiction, type, status badge, hours, last-verified date, official source, and escalation use notes. _Use case:_ Displaying real verified crisis and support routes inside mental-health or religion exercises so users can escalate safely. (`src/components/research/support-directory-panel.tsx`)

---

## safety/index

- **CrisisCard** — Red-bordered emergency banner with the Egyptian Ministry of Health Mental Health Hotline (08008880700). _Use case:_ Displayed at the top of any page dealing with distressing mental health content to provide immediate crisis access. (`src/components/safety/index.tsx`)
- **DisclaimerNotDiagnosis** — Bilingual (English + Arabic) disclaimer banner stating this is not a diagnosis and directing users to consult a professional. _Use case:_ Legal/ethical compliance footer for all pages that present psychological or medical content. (`src/components/safety/index.tsx`)

---

## science/BlueprintDisplay

- **BlueprintDisplay** — Full-page markdown renderer (ReactMarkdown with Tailwind prose classes) for engine blueprint documents, with a dot-grid background, gradient header, engine number badge, and a centered white card. RTL-aware. _Use case:_ Displaying the detailed technical/scientific blueprint of each engine (DeepReal, Mental Health, Religion Hub) as a readable formatted document. (`src/components/science/BlueprintDisplay.tsx`)

---

## science/cognitive-command-deck

- **CognitiveCommandDeck** — 6-tab reference deck (resilience protocols, basics, biases, sources, authorities, references) with search/filter, deferred rendering, and evidence-fetch integration. Each tab shows a different facet of the cognitive science knowledge base. _Use case:_ Power-user reference panel giving researchers or educators access to the full cognitive science foundation of the EAL without leaving the exercise interface. (`src/components/science/cognitive-command-deck.tsx`)

---

## science/deepreal-game-arena

- **DeepRealGameArena** — Interactive multi-mode game (Classic, EGY, POV, Rumors, Scams, TikTok) that fetches rounds from `/api/science/game`, presents a scene + prompt + choices, scores user responses with scoreDelta feedback, and shows a completion summary. _Use case:_ Gamified prebunking training where users practice identifying manipulation techniques across different Egyptian-context scenarios. (`src/components/science/deepreal-game-arena.tsx`)

---

## science/deepreal-tripillar-ui

- **DeepRealTripillarUI** — Three-pillar UI (Philosophy, Forensic scan, Cognitive intercept) with an rPPG/ZKP scan simulation; after the 2-second simulated scan, a COM-B bias reflection prompt appears asking "Why did you want this media to be true?" before revealing the result. _Use case:_ Demonstrating the three-pillar DeepReal methodology (truth burden → forensics → cognition) in an educational simulation context. (`src/components/science/deepreal-tripillar-ui.tsx`)

---

## science/deepreal-upload-zone

- **DeepRealUploadZone** — Drag-and-drop / click-to-select file upload zone that POSTs image/video files to `/api/defense/deepreal/analyze` and displays the analysis result. _Use case:_ Allowing users to upload a suspicious image or video for AI-powered deepfake detection directly from the DeepReal engine page. (`src/components/science/deepreal-upload-zone.tsx`)

---

## science/defense-scanner-overlay

- **DefenseScannerOverlay** — Inline button that opens a floating analysis panel (Framer Motion AnimatePresence) calling the appropriate engine API (`/api/defense/deepreal/analyze`, `/api/defense/mental-health/analyze`, or `/api/defense/religion-hub/analyze`) and rendering the result with loading/error states. Supports deepreal, mental-health, and religion-hub scanner types. _Use case:_ Embedding a one-click on-demand analysis overlay onto any piece of content — images in a card, text excerpts, titles — without navigating away from the current page. (`src/components/science/defense-scanner-overlay.tsx`)

---

## science/engine-one-ui

- **EngineOneUI (5-stage mental health interactive)** — Scroll-snapping 5-stage interactive: (1) Amygdala Hijack threat-level gauge with breathing reboot animation, (2) Somatic Mapping cards, (3) Cultural Firewall node extractor, (4) Ego Decoupling gauge with attack simulation, (5) Math Solver (TRAUMA formula sliders). _Use case:_ An immersive, scientifically-grounded explainer of how emotional manipulation works at a neurological and cultural level, used on the Mental Health engine page. (`src/components/science/engine-one-ui.tsx`)

---

## science/engine-two-ui

- **EngineTwoUI (4-stage misinformation literacy)** — Scroll-snapping 4-stage interactive: (1) Intro, (2) COPE Funding Scanner (checks if sponsor text suggests corporate conflict of interest), (3) PRISMA Shredder (validates study design quality by type and sample size), (4) CONSORT Flowchart (visualizes clinical trial enrollment/attrition). _Use case:_ Teaching users to evaluate research quality using standardized scientific reporting checklists, used on the DeepReal science page. (`src/components/science/engine-two-ui.tsx`)

---

## science/evidence-command-board

- **EvidenceCommandBoard** — Fetches `/api/science/evidence` (with optional module filter), displays evidence claims with their metric snapshots (region, value, method, confidence, source URL, sync status) and a source health summary (live/failed/stale counts) with a manual refresh button. _Use case:_ Live evidence dashboard showing the current state of the EAL's evidence database for a given module. (`src/components/science/evidence-command-board.tsx`)

---

## science/guided-journey-board

- **GuidedJourneyBoard** — Fetches `/api/science/journey`, renders per-module journey cards (status, emotional nudge, scientific reason, progress bar, comparison data Egypt vs global, next step), and a data-freshness/source-count summary panel. _Use case:_ Personalized learning path dashboard showing where a user is in each engine's journey and what their scientifically-recommended next step is. (`src/components/science/guided-journey-board.tsx`)

---

## science/layer-combat-engine

- **LayerCombatEngine** — Accordion list of engine-specific "combat lenses" — one card per deception layer (1–8) — showing weapon name (AR/EN), methodology tag, layer definition, and expandable combat strategy content. Filtered by `engineId`. _Use case:_ Reference panel inside each engine page showing exactly how that engine counteracts each of the 8 deception layers. (`src/components/science/layer-combat-engine.tsx`)

---

## science/live-swarm-debate

- **LiveSwarmDebate** — Terminal-style streaming UI using `useCompletion` from `@ai-sdk/react` to call `/api/defense/swarm`; displays the multi-agent swarm analysis output in a scrolling green-on-black monospace terminal with a loading indicator. _Use case:_ Submitting a threat text to the multi-agent swarm debunking pipeline and watching the analysis stream in real time, used on the swarm debate and OSINT investigator pages. (`src/components/science/live-swarm-debate.tsx`)

---

## science/mental-health-tripillar-ui

- **MentalHealthTripillarUI** — Interactive cognitive-load monitor with three simulated biometric sliders (HRV, screen time, scroll velocity); computes a `CognitiveFirewall.assessCognitiveLoad` score, derives friction delay, and dims/blocks content if load is high; user can acknowledge to reset biometrics. _Use case:_ Educational demonstration of how scroll velocity and screen time affect critical thinking capacity, embedded as an explainer on the Mental Health engine page. (`src/components/science/mental-health-tripillar-ui.tsx`)

---

## science/module-command-center

- **ModuleCommandCenter** — 6-tab content navigator (exercises, rules, myths, scenarios, tricks, reverse) fetching module-specific items from `/api/science/command`, with a `ModuleGuidePopup` for emotion-based journey entry, `ModuleLabConsole` for live analysis, `ProtocolWorkbench` for protocol evaluation, and filter controls. _Use case:_ The central command interface for any of the three engine modules; consolidates all content types and live tools into one panel. (`src/components/science/module-command-center.tsx`)

---

## science/module-guide-popup

- **ModuleGuidePopup** — Focus-trapped modal (FocusTrapModal) presenting emotion-based guide options for a module; user selects their current emotional state from a list, then the guide recommends a starting tab and first step, applying the selection via an `onApply` callback. _Use case:_ Trauma-informed onboarding for engine modules — routing users to the right content based on how they're feeling rather than a fixed curriculum order. (`src/components/science/module-guide-popup.tsx`)

---

## science/module-lab-console

- **ModuleLabConsole** — Module-specific form (different fields for deepreal/mental-health/religion-hub) that POSTs to `/api/science/operations` and renders the scored outcome (title, summary, severity), reasoning list, and next actions; also shows related open-access evidence search results. _Use case:_ Live lab for users to input a real-world situation (e.g., a claim's emotional pressure score) and receive an evidence-based severity assessment. (`src/components/science/module-lab-console.tsx`)

---

## science/module-operating-shell

- **ModuleOperatingShell** — Page-level layout shell for engine module pages: hero banner (with pattern/gradient/tagline/CTAs), disclaimer block, core question, navigation link grid, before-shell slot, and an embedded `ModuleCommandCenter`. Accepts `module`, `accent`, `icon`, `title`, `subtitle`, `disclaimer`, `links`, and optional hero customization props. _Use case:_ Shared layout wrapper used by DeepReal, Mental Health, and Religion Hub engine pages to ensure consistent structure with module-specific branding. (`src/components/science/module-operating-shell.tsx`)

---

## science/osint-terminal

- **OsintTerminal** — Streaming OSINT investigation terminal that calls `/api/defense/osint-investigator` with Server-Sent Events, displaying each step (planner → scraping → scraped → synthesizer) with source URLs as they arrive, then renders a final ReactMarkdown report. _Use case:_ Live OSINT investigation tool where users submit a claim and watch the AI agent scrape, analyze, and synthesize a verified report in real time. (`src/components/science/osint-terminal.tsx`)

---

## science/protocol-workbench

- **ProtocolWorkbench** — Fetches a module protocol schema from `/api/science/protocol`, renders its dynamic form fields (boolean/scale/select/textarea) with validation, POSTs the user's responses back, and displays the evaluation outcome (score, severity, Egyptian context, next action). _Use case:_ Structured protocol evaluation tool where users work through a research-backed decision protocol for a specific content item (e.g., evaluating whether a religious claim meets manipulation criteria). (`src/components/science/protocol-workbench.tsx`)

---

## science/quarantine-provider

- **QuarantineProvider** — React context provider wrapping the app; when `triggerQuarantine()` is called (e.g., on toxicity score > 95/100), a full-screen backdrop blur overlay covers the interface, shows the reason, and runs a mandatory 4-7-8 breathing exercise with an animated progress bar before allowing release. _Use case:_ Cognitive fail-safe that enforces a grounding pause when the platform detects the user has been exposed to extremely toxic/manipulative content. (`src/components/science/quarantine-provider.tsx`)

---

## science/religion-tripillar-ui

- **ReligionTripillarUI** — Interactive chaos-level slider controlling an `AnchorProtocol.evaluateOntologicalStability` state machine (RECONSTRUCT → STABILIZE → ANCHOR phases) with trauma-informed theme changes (background color, blur) and a `Layer8Containment.enforceEpistemicQuarantine` trigger at chaos > 0.95. _Use case:_ Educational demonstration of the three-pillar Religion Hub methodology (ontological stability, epistemic quarantine, substrate starvation) for developers and educators. (`src/components/science/religion-tripillar-ui.tsx`)

---

## science/reporting-console

- **ReportingConsole** — Fetches `/api/science/report` and renders a printable summary dashboard: module progress stats, evidence claims with regional metric snapshots, source health counts, and next steps per module. Print-button triggers `window.print()`. _Use case:_ Administrative or educator-facing reporting view showing the overall state of the EAL's evidence pipeline and user journey progress across all modules. (`src/components/science/reporting-console.tsx`)
