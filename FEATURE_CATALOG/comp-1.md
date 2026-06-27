# UI Components — slice comp-1

Covers items 1–51 of `src/components/**/*.tsx` sorted ASCII-ascending.

---

## Root-level utilities

### AnalysisProgress
`src/components/AnalysisProgress.tsx`

- **Asymptotic progress bar** — Fills toward 93% asymptotically using an exponential curve tied to the real request lifecycle; snaps to 100% only when the parent signals completion. _Use case:_ Shown during long AI calls (11–25 s) so users see honest latency rather than a fake "done in 800 ms" spinner.
- **Pre-built stage sets** — Exports `STAGE_SETS` with named arrays of bilingual stage labels for five engine types (debunk, whatsapp, fallacy, forensic, swarm). _Use case:_ Drop-in labels for the matching engine without writing custom stage lists.
- **Bilingual stage labels** — Each stage has `.en` and `.ar` fields; the bar renders in the requested language and flips direction for RTL. _Use case:_ Arabic-first users see Arabic stage names automatically.
- **Configurable accent color** — The `accent` prop recolors the progress fill, dot, and percentage label in one pass. _Use case:_ Each engine maintains its brand color across all loading states.

### ToolGuide
`src/components/ToolGuide.tsx`

- **Collapsible guide panel** — An accordion-style component that opens/closes a "how to use this" explainer; default-open state is configurable. _Use case:_ Any tool page can embed an always-visible or collapsed onboarding guide without writing its own accordion.
- **Who-it-helps blurb** — Renders a bilingual "who it's for" paragraph. _Use case:_ Helps zero-knowledge users immediately understand the target audience before using a tool.
- **Numbered step list** — Renders bilingual ordered steps with colored number badges. _Use case:_ Guides the user through the correct workflow in two to five steps.
- **Ready-example scenario buttons** — Renders a row of "try a real example" buttons that fire `onTry(input)` with the actual scenario input text. _Use case:_ One-click loading of a real Egyptian, name-free example into the tool so newcomers can see it work without typing anything.
- **Per-scenario category tags** — Each scenario button can show a small category tag (e.g., "health", "religion"). _Use case:_ Lets users pick examples by domain when multiple categories are available.

---

## Admin

### ResearchGovernancePanel
`src/components/admin/research-governance-panel.tsx`

- **Participant launch gate** — Reads `getParticipantLaunchGate()` and shows a green "ready" or amber "gated" status block with a bullet list of remaining blockers. _Use case:_ Supervisor checks whether all pre-conditions are met before opening the study to participants.
- **Participant language selector** — Toggle between "English validated path" and "Arabic deployment path"; persists via `saveResearchGovernance`. _Use case:_ Locks instruments whose Arabic path is unvalidated when Arabic is selected.
- **Reviewer sign-off records** — Renders per-engine (DeepReal, Mental Health, Religion Hub) reviewer cards with name, date, and note fields. _Use case:_ Documents formal reviewer approval required by framework §28.8–§28.12 before participant launch.
- **Instrument readiness check** — Reads `INSTRUMENT_READINESS` data to confirm all instruments are validated for the chosen language. _Use case:_ Prevents launching a study with an instrument that has not been validated for the participant's language.

### ResearchProtocolPanel
`src/components/admin/research-protocol-panel.tsx`

- **Project protocol overview** — Renders the main research question in a highlighted amber box. _Use case:_ Gives supervisors a quick reference to the study's primary research question.
- **Sub-research questions table** — Three-column table (ID / Question / Maps To) built from `SUB_RESEARCH_QUESTIONS`. _Use case:_ Supervisor or auditor traces how each sub-question links back to the main question.
- **Falsifiable hypotheses table** — Four-column table (ID / Hypothesis / Null Hypothesis / Failure Condition). _Use case:_ Tracks the exact conditions under which each hypothesis would be falsified, enabling pre-registered evaluation.
- **Sampling strategy and evaluation protocol display** — Renders additional research data tables (measurement schedule, success criteria, sampling). _Use case:_ Full-protocol audit trail visible in the admin UI.

### SourceCommandCenter
`src/components/admin/source-command-center.tsx`

- **Registry health summary cards** — Six KPI cards: health percent, pinned sources, admin-only, missing URLs, missing backups, pending directories. _Use case:_ One-glance source-registry health check for operators.
- **Stale/critical sources list** — Shows up to eight critical then stale sources with days-since-verification and recommended action. _Use case:_ Prioritizes which sources need immediate freshness attention.
- **Metadata gap panel** — Lists sources missing URLs, missing backup sources, and directories pending local confirmation. _Use case:_ Surfaces operational gaps that would prevent the platform from linking users to verified sources.

### SupervisorDashboard (admin)
`src/components/admin/supervisor-dashboard.tsx`

- **Multi-tab navigation sidebar** — Eight tabbed sections (Overview, Protocol, Cohort Ops, Engine Analytics, Hypothesis Tests, Governance, Source Ops, Exports). _Use case:_ Research supervisors navigate all study-operations functions from a single dashboard.
- **Cohort participant management** — Save current browser snapshot, import JSON participant files (multi-file), remove individual participants. _Use case:_ Aggregates participant data from multiple devices/sessions into a unified research cohort.
- **Engine analytics bar charts** — Recharts BarChart showing active/completed participants per engine (DeepReal, Mental Health, Religion Hub). _Use case:_ Supervisor monitors adoption and completion rates per learning module.
- **Intervention pie chart** — Recharts PieChart for source opens, prompt uses, verification completions, and skips. _Use case:_ Tracks whether participants engage with the key intervention touchpoints.
- **Defense pack export** — `downloadDefensePack()` generates a downloadable data export. _Use case:_ Supervisor downloads study data for offline analysis or archival.
- **AI provider status panel** — Reads `getProviderStatuses()` to show which LLM providers are currently available. _Use case:_ Identifies provider outages that could affect study quality.
- **Embedded governance, protocol, and source panels** — Composes `ResearchGovernancePanel`, `ResearchProtocolPanel`, and `SourceCommandCenter` into the relevant sidebar tabs. _Use case:_ Single-entry-point access to all research-operations functions.

---

## Assessment

### AssessmentEngine
`src/components/assessment/assessment-engine.tsx`

- **Multi-instrument question renderer** — Supports six validated instruments (MIST-20, MHLS, Brief RCOPE, GHSQ, SUS, MC-SDS) with Likert, binary, and real/fake question types. _Use case:_ Delivers pre/post psychometric assessments within the research curriculum.
- **Step-by-step question navigation** — Previous/Next buttons with progress bar; prevents advancing without answering; computes scores on the final question. _Use case:_ Ensures participants cannot skip items, maintaining instrument validity.
- **Reversed-item scoring** — `config.scoring` handles reversed items automatically before calling `onComplete`. _Use case:_ Instruments such as MC-SDS require reverse-scored items for correct composite scores.
- **Zero-trust server action submission** — Calls `submitAssessmentAction` as a Next.js server action; stores validated results server-side. _Use case:_ Prevents client-side tampering with assessment scores in a research context.
- **Bilingual question text** — Each question has `text` (EN) and optional `textAr` (AR) with auto-direction. _Use case:_ Supports the Arabic participant path validated in the governance panel.

---

## Baseline

### ThumbnailTrapTest
`src/components/baseline/thumbnail-trap-test.tsx`

- **Emotional Trigger Susceptibility (ETS) measurement** — Displays 6 emotional vs. 6 neutral thumbnail cards in a fixed interleaved order; records first click type and click distribution. _Use case:_ Baseline measurement instrument Q11 (§17.3, §17.6) quantifying how susceptible a participant is to emotionally charged clickbait before training.
- **ETS score calculation** — Computes `emotional_click_rate − neutral_click_rate` and returns a structured `ETSResult`. _Use case:_ Pre/post comparison of emotional susceptibility across the training program.
- **Click order tracking** — Records the sequence of all clicked thumbnail IDs. _Use case:_ Researchers analyze whether first-click patterns change after inoculation training.

---

## Calm / Animation utilities

### CalmRoot & Reveal
`src/components/calm/CalmReveal.tsx`

- **CalmRoot — Lenis smooth scroll** — Wraps children in a Lenis smooth-scroll loop (duration 1.2s, cubic ease); respects `prefers-reduced-motion`. _Use case:_ Applies a single smooth-scroll feel to entire page sections without per-page setup.
- **Reveal — scroll-triggered fade-in** — Framer Motion `whileInView` animation fading from `opacity:0, y:16` to visible once; configurable delay. _Use case:_ Progressively reveals content sections as the user scrolls.

---

## Chatbot

### ChatInput
`src/components/chatbot/chat-input.tsx`

- **Auto-resizing textarea** — Adjusts height dynamically up to 200 px as the user types; resets after send. _Use case:_ Comfortable multi-line message entry in the AI chatbot without a fixed-height box.
- **Arabic auto-direction** — Detects Arabic Unicode characters in the input and switches `dir` to RTL mid-composition. _Use case:_ Users who switch between Arabic and English mid-message get correct cursor direction automatically.
- **Enter-to-send / Shift+Enter new-line** — `Enter` triggers send; `Shift+Enter` inserts a new line. _Use case:_ Standard keyboard UX for chat interfaces that users expect.
- **Loading lock** — Disables the send button and textarea while `loading` is true. _Use case:_ Prevents double-submission during an in-flight AI request.

### ChatMessage
`src/components/chatbot/chat-message.tsx`

- **Role-aware bubble layout** — User messages align right (LTR) or left (RTL); assistant messages align opposite; includes avatar icons. _Use case:_ Standard chat bubble layout adapted for bilingual RTL/LTR chat.
- **Copy-to-clipboard** — Copies message text using `navigator.clipboard` with `execCommand` fallback for mobile; shows checkmark confirmation. _Use case:_ Users copy AI responses for sharing or reference.
- **Source/citation panel** — Toggles a list of source titles and URLs attached to assistant messages. _Use case:_ Academic mode responses cite their sources inline for One-Law compliance.
- **Reaction thumbs (up/down)** — Persists reaction in `localStorage` per message ID. _Use case:_ Collects quick feedback on response quality without a backend call.
- **Delete / retry actions** — Per-message delete and retry buttons with callbacks to parent. _Use case:_ Users can remove unwanted messages or re-run a query.
- **Provider/model/latency metadata** — Shows provider name, model ID, and latency in ms as subtle metadata under assistant messages. _Use case:_ Transparency about which AI provider answered the query.

### MarkdownRenderer
`src/components/chatbot/markdown-renderer.tsx`

- **Lightweight markdown parser** — Parses headings, bold, italic, lists, links, code blocks, inline code, blockquotes, and horizontal rules to HTML without external dependencies. _Use case:_ Renders AI markdown responses in chat without shipping a heavy markdown library.
- **DOMPurify XSS sanitization** — Sanitizes generated HTML before `dangerouslySetInnerHTML`; skips on SSR. _Use case:_ Prevents XSS attacks from AI-generated markdown containing malicious HTML.
- **RTL-aware direction** — Wraps rendered HTML in `dir="rtl"` or `dir="ltr"` based on the `isRTL` prop. _Use case:_ Arabic responses render right-aligned with correct text flow.

### ChatSidebar
`src/components/chatbot/sidebar.tsx`

- **Mode switcher** — Lists five chat modes (General, Wellness, Fact-Check, Translation, Academic) grouped by category with color badges. _Use case:_ Users switch the AI's behavior/system prompt with one click.
- **Session history with search** — Lists past sessions grouped by "today" vs. older; filter by title search string. _Use case:_ Users return to a previous conversation without scrolling through a flat list.
- **New / delete session** — Create a new blank session or delete an existing one; "clear all" button. _Use case:_ Manage conversation history similar to ChatGPT-style session management.
- **Mode info expand** — Each mode has an expandable info section (`expandedInfo` state). _Use case:_ Users unfamiliar with a mode can learn what it does before switching.
- **Mobile overlay** — Full-screen translucent overlay backdrop on mobile when sidebar is open. _Use case:_ Sidebar works as a modal-style drawer on small screens.

---

## Debate

### LiveSwarmDebate
`src/components/debate/live-swarm-debate.tsx`

- **5-archetype AI debater swarm** — Simultaneously presents five AI agents (Ad-Hominem, Cherry-Picker, False-Authority Sheikh, Conspiracy Cabal-Framer, Deepfake Skeptic) using deliberate manipulation tactics. _Use case:_ Socratic combat training where users must identify the fallacy used by each attacker and compose a counter-argument.
- **Per-agent response scoring** — Each user response receives scores for logical coherence, fallacy detection, and emotional stability. _Use case:_ Measures whether the user can counter an attack without emotional escalation.
- **Round-based session management** — Tracks current round, max rounds, cumulative scores, and a completion state. _Use case:_ Finite structured debate session with a final score summary.
- **Bilingual agent names** — Each archetype has English and Arabic names. _Use case:_ Arabic-speaking users recognize the archetype in their language.

---

## Defense-Pages (demo readiness)

### BackendFocusPanel
`src/components/defense-pages/BackendFocusPanel.tsx`

- **Route risk classification panel** — Displays total API routes, connected/demo-relevant count, and four categorized lists (safe fallback routes, keyless public routes, risky routes, backend-dependent pages). _Use case:_ During a live demo or defense presentation, the presenter sees exactly which routes are safe to show and which to avoid.

### DefensePagesMap
`src/components/defense-pages/DefensePagesMap.tsx`

- **Full page inventory with filter/sort/search** — Loads all `pageMapEntries`; supports 15 filter presets, three sort orders, and free-text search. _Use case:_ Defense presenter quickly finds a specific page by route, category, risk level, or demo status.
- **Card / table view toggle** — Switches between a rich card view and a compact table view. _Use case:_ Cards give detail for rehearsal; table gives a print-friendly overview.
- **Tested-route tracker (localStorage)** — Checkbox per route stored in localStorage via a custom store event. _Use case:_ Presenter marks each route as tested during rehearsal and resets before the live demo.
- **Presenter-mode panel** — A prioritized strip of the top routes with exact demo actions. _Use case:_ The most important routes are surfaced in presentation order for live use.
- **Backend-focus panel integration** — Shows the `BackendFocusPanel` below the main map. _Use case:_ Keeps backend risk context visible alongside the route list.

### PageMapCard
`src/components/defense-pages/PageMapCard.tsx`

- **Risk-coded route card** — Renders a page entry with color-coded demo-status badge, risk badge, detail blocks, and a test-checklist. _Use case:_ At-a-glance understanding of a page's live-demo safety, backend dependencies, and test steps.
- **Direct route link** — Opens the route in a new tab if it is a simple `/` path. _Use case:_ Presenter clicks to open the page directly from the rehearsal card.
- **Copy demo-step markdown** — CopyButton wrapping the test steps as a markdown string. _Use case:_ Presenter pastes test steps into a rehearsal document.

### PageMapTable
`src/components/defense-pages/PageMapTable.tsx`

- **Compact sortable route table** — Tabular view of all page entries with route, status, risk, category, backend kind, logic focus, tested checkbox, and open/copy actions. _Use case:_ Quick visual scan of the entire route inventory in one scrollable table.

### PageTestChecklist
`src/components/defense-pages/PageTestChecklist.tsx`

- **Test-step checklist display** — Renders an ordered list of test steps with checkbox-style styling. _Use case:_ Embedded inside a PageMapCard to show exactly what to verify before marking a route as tested.

### PagesMapToolbar
`src/components/defense-pages/PagesMapToolbar.tsx`

- **Search + filter + sort bar** — Sticky toolbar with text search, 15 category filter chips, sort selector, and card/table toggle. _Use case:_ The primary navigation control for the DefensePagesMap.
- **Export route report** — CopyButton outputs a full route-report markdown. _Use case:_ Presenter copies the entire inventory to a document.
- **Print presenter checklist** — CopyButton outputs presenter checklist markdown. _Use case:_ Presenter prints or pastes a condensed checklist for the live defense.
- **Clear tested / clear filters** — Reset buttons for both tested-route state and active filters. _Use case:_ Reset between rehearsals or when switching filters.

### PresenterModePanel
`src/components/defense-pages/PresenterModePanel.tsx`

- **Priority route presenter strip** — Renders the top-priority routes with title, route path, proof statement, risk level, "exact action" script, and an Open button. _Use case:_ During a live defense, the presenter follows the strip step-by-step to demonstrate only the most impactful pages.

---

## Defense (defense-main-plan)

### CopyButton
`src/components/defense/CopyButton.tsx`

- **Clipboard copy with fallback** — Copies text via `navigator.clipboard`; falls back to `execCommand("copy")` on older browsers; shows a ✓ icon for 2 s. _Use case:_ Any place in the app where the user needs to copy generated text, scripts, or report markdown.

### DefenseCard
`src/components/defense/DefenseCard.tsx`

- **Tone-coded info card** — A glass-style card with five tone variants (neutral, good, warn, danger, info) applied as border color. _Use case:_ Wraps any block of defense-plan content with a visual severity indicator.
- **Route link chip** — If the `route` prop is a valid internal path, renders an arrow-linked chip; otherwise renders a non-clickable external chip. _Use case:_ Cards about a specific route link directly to that route for fast navigation.
- **Status and badge labels** — Optional status and badge slots rendered as small uppercase chips. _Use case:_ "Must show live" or "Backup demo" labels appear inside the card header.

### DefenseCommandCenter
`src/components/defense/DefenseCommandCenter.tsx`

- **Powerful pages grid** — Renders `POWERFUL_PAGES` as `DefenseCard` components with route links and live status. _Use case:_ Centralized view of the most demo-worthy pages with status and navigation.
- **Stress-test results** — Renders `STRESS_TESTS` as cards with PASS/PARTIAL/PREPARED tone badges. _Use case:_ Shows which adversarial scenarios the platform has been tested against.
- **Doctor-attack scenarios** — Renders `DOCTOR_ATTACKS` with evidence lists. _Use case:_ Prepares the presenter for technical medical-misinformation challenges.
- **Live demo scenarios** — Renders `LIVE_SCENARIOS` as time-stamped demo scripts. _Use case:_ Step-by-step demo playbook for the live defense.
- **Emergency scripts and recovery lines** — Renders `EMERGENCY_SCRIPTS` and `RECOVERY_LINES` with copy buttons. _Use case:_ Presenter can quickly paste a recovery script if something goes wrong live.
- **Do-not-show and what-not-to-say lists** — Renders `DO_NOT_SHOW`, `WHAT_NOT_TO_SAY`, and `BRUTAL_HONESTY` sections. _Use case:_ Prevents presenter from accidentally demonstrating risky or incomplete features.
- **Executive lock summary** — Renders `EXECUTIVE_LOCK` as a concise summary card. _Use case:_ One-sentence defense position for non-technical evaluators.

### DefenseSection
`src/components/defense/DefenseSection.tsx`

- **Eyebrow-title-description section wrapper** — Renders a section with an eyebrow badge, heading, and description before its children. _Use case:_ Consistent section headers throughout the defense-main-plan multi-part layout.

### PartNavigation
`src/components/defense/PartNavigation.tsx`

- **Sticky 10-part tab bar** — Horizontal scrollable nav bar with numbered part links that highlight the active part based on the URL path. _Use case:_ Users navigate across the 10 defense-plan parts (Powerful Pages → Brutal Honesty) without returning to a hub page.
- **Hub link** — First item always links back to `/defense-main-plan`. _Use case:_ Quick escape back to the overview when deep in a part.

---

## Dev

### AxeDevtools
`src/components/dev/axe-devtools.tsx`

- **Axe accessibility audit injection** — Dynamically imports `@axe-core/react` in development only and runs a live DOM audit every 1 s. _Use case:_ Surfaces WCAG accessibility violations in the browser console during local development without any production overhead.

---

## Engagement

### EngagementLayer
`src/components/engagement/engagement-layer.tsx`

- **XP and streak tracker** — Reads and writes `eal-xp` and `eal-streak` from localStorage; increments XP when a new page is visited. _Use case:_ Gamified motivation that persists across page navigations and browser sessions.
- **Visited-pages tracker** — Maintains a list of visited page paths; computes completion percentage across 15 platform pages. _Use case:_ Shows users how much of the platform they have explored and nudges them to visit new sections.
- **Motivational toast messages** — Cycles through six motivational messages anchored to high numbers; shows as a temporary toast on page visit. _Use case:_ Behavioral hook (Cialdini anchoring) to increase dwell time and repeat visits.
- **Simulated social-proof counter** — Shows a randomized "N others exploring" counter. _Use case:_ Social-proof hook to reduce isolation and increase engagement.
- **Time-spent counter** — Tracks seconds on the current page, shown in the engagement panel. _Use case:_ Reinforces dwell-time goals by making time spent visible.
- **Collapsible floating engagement panel** — Toggle-able panel showing XP bar, streak, visited-page map, and motivation. _Use case:_ Persistent but non-intrusive gamification layer accessible from any page.

---

## Evidence

### EvidenceAggregatorPanel
`src/components/evidence/EvidenceAggregatorPanel.tsx`

- **Multi-database academic search** — Queries `/api/search/evidence` against OpenAlex, Semantic Scholar, Europe PMC, DOAJ, arXiv, CORE, and Crossref; renders results grouped by source. _Use case:_ Any exercise or tool page that needs to show real, peer-reviewed evidence for a claim.
- **Trust-band badges** — Each result gets an A/B/C trust-tier badge based on source and metadata. _Use case:_ Users immediately see evidence quality without reading the full paper.
- **Access-tier badges** — Labels results as free, mixed, or paid access. _Use case:_ Users know before clicking whether they can actually read the full text.
- **Expandable abstract cards** — Each result card expands to show full abstract, citation count, and source metadata. _Use case:_ Users preview the abstract before opening the external link.
- **Bilingual source labels** — Each database name is translated to Arabic (`labelAr`). _Use case:_ Arabic-interface users see source names in Arabic.
- **Paid-source toggle** — `includePaid` flag passed to the API; lets the user opt into paid results. _Use case:_ Advanced users who have institutional access can enable paid-source results.

---

## Exercises

### ScenarioResponsePlayer
`src/components/exercises/ScenarioResponsePlayer.tsx`

- **Draft-before-reveal player** — Shows a scenario, lets the user type a free-text response, then reveals the expert model response for comparison. _Use case:_ Active-recall loop for scenario-response exercises (Stigma Scenarios, Grief-vs-Depression) where no single MCQ answer exists.
- **Progress bar with reveal state** — Progress percentage counts a revealed step as completed within the current scenario index. _Use case:_ Users see their progress through the scenario set without ambiguity.
- **Expert response display** — Shows expert response, "what not to do" list, and key insight after reveal. _Use case:_ Provides the correction and rationale after the user's own attempt, following evidence-based feedback timing.
- **Bilingual scenario text** — Renders `scenarioAr` / `scenario`, Arabic/English response and not-to-do lists. _Use case:_ Full Arabic experience for scenarios in the mental-health and religion-hub tracks.
- **Source line display** — Shows the dataset `source` string at the top. _Use case:_ One-Law compliance — every scenario block must carry its source reference in the UI.

### ArabicAnalysisCard
`src/components/exercises/arabic-analysis-card.tsx`

- **Arabic NLP live analysis** — Calls `/api/nlp/arabic` with the exercise text; displays sentiment, dialect hints, trigger words, and risk flags. _Use case:_ Chunk 6 entry point — exercises annotate Arabic text with NLP metadata so users see how emotional language is structured.
- **Error state display** — Shows a warning card if the API call fails. _Use case:_ Graceful degradation when the NLP API is unavailable without crashing the exercise.

### CognitiveFrictionOverlay
`src/components/exercises/cognitive-friction-overlay.tsx`

- **5-gate friction form** — Sequential Claim / Evidence / Context / Emotion / Consequence text boxes that must all be filled before proceeding. _Use case:_ Framework §17.4–§17.5 — injects a mandatory pause-before-belief checkpoint inside exercise flows.
- **Skip after all gates** — "Skip" is only enabled after all five boxes have been viewed. _Use case:_ Prevents users from reflexively dismissing the friction check without seeing all five cognitive prompts.
- **Bilingual gate labels and placeholders** — Each box has EN/AR label and placeholder. _Use case:_ Arabic participants go through the friction check in Arabic.

### DeeprealForensicsConsole
`src/components/exercises/deepreal-forensics-console.tsx`

- **Deepfake image analysis** — Sends an image URL to `analyzeMedia({type: "deepfake_image"})` and renders an authenticity score with heatmap data. _Use case:_ Lets users submit a suspicious image URL and see a forensic authenticity score.
- **Metadata analysis** — Sends a URL to the metadata endpoint and renders extracted EXIF/provenance fields. _Use case:_ Users check whether image metadata was stripped or altered.
- **C2PA provenance check** — Runs a C2PA (Content Credentials) verification on a URL. _Use case:_ Users verify whether a piece of media carries a cryptographically signed provenance record.
- **Reverse-image search** — Queries a reverse-image endpoint and renders matching domains, scores, first-indexed dates, and notes. _Use case:_ Users check where else an image has appeared to detect context manipulation.
- **Evidence field display** — Renders up to 6 key-value pairs from the raw forensic evidence record. _Use case:_ Transparency about what raw signals the forensic model used to reach its verdict.

### DeeprealScienceBrief
`src/components/exercises/deepreal-science-brief.tsx`

- **Research pillar cards** — Four expandable cards explaining the science behind DeepReal: MIST measurement, prebunking inoculation, SIFT/lateral reading, and practice design. _Use case:_ Provides scientific legitimacy and transparency about why the exercises are designed the way they are.
- **Official source links with stats** — Each source entry shows a label, URL, key statistic, and description pulled from real Cambridge/MIST publications. _Use case:_ One-Law compliance — the science brief links to real, resolvable sources.

### ExerciseDayNav
`src/components/exercises/exercise-day-nav.tsx`

- **14-day progress navigator** — Renders a grid of 14 day buttons, each showing completion status, score, and confidence delta (pre vs. post), read from localStorage. _Use case:_ Users navigate to any day and see their historical performance without leaving the exercise.
- **Score vs. completion toggle** — Toggles between showing check/lock icons and showing numeric scores per day. _Use case:_ Power users can review score history across all 14 days at a glance.
- **Trophy unlock indicator** — Shows a trophy if any day has both pre- and post-confidence recorded. _Use case:_ Visual reward when confidence change data exists, reinforcing the gamification loop.

### ExerciseEngine
`src/components/exercises/exercise-engine.tsx`

- **Universal exercise runner** — Handles all exercise question types (MCQ, scenario, binary, likert) with confidence sliders, answer validation, and score computation. _Use case:_ The single entry point for all 14-day exercises across DeepReal, Mental Health, and Religion Hub tracks.
- **Cognitive friction integration** — Injects `CognitiveFrictionOverlay` before certain exercise types. _Use case:_ Applies mandatory pause-before-belief training within the normal exercise flow.
- **Theory-card overlay** — Shows `TheoryCard` and `COMBVisualizer` mapped to the exercise's day. _Use case:_ Surfaces the psychological theory motivating each exercise so users learn the "why."
- **Intervention mode pipeline** — Reads `getModesForDay()` and conditionally renders SourceOfDay, EvidenceLadder, MythAutopsy, BiasReflection, MicroScenario, ExpertCapsule, SourceCompare. _Use case:_ Each day delivers a different intervention mode (§18) as an overlay on top of the core question.
- **Cross-MVP handoff routing** — Calls `detectHandoff()` and renders `HandoffCard` when the exercise content warrants routing to a different module. _Use case:_ Framework §25.4 — seamless cross-module referrals when an exercise topic overlaps mental health or religion.
- **Dwell-time tracking** — Starts/records/ends a dwell session per question; computes Attention Focus Score (AFS). _Use case:_ Measures whether users are reading carefully or rushing through exercises.
- **XP / gamification award** — Calls `awardXP` and `celebrateProgress` on correct answers; updates MVP progress. _Use case:_ Operationalizes the XP engine so completing exercises earns visible progress.
- **NLP sentiment analysis** — Lazily imports the sentiment engine to badge the exercise text with emotional load, manipulation score, and crisis detection. _Use case:_ Alerts users to emotional manipulation patterns in the exercise scenario text itself.
- **Day navigator integration** — Renders `ExerciseDayNav` to allow free navigation across all 14 days. _Use case:_ Users can revisit any day without going back to the exercise list.

### ExerciseOnboardingTour
`src/components/exercises/exercise-onboarding-tour.tsx`

- **react-joyride step-through tour** — 3–5 step guided tour pointing to gamification, verification console, scenario, forensics (optional), and support (optional) panels. _Use case:_ First-time users on an exercise page are walked through the key UI zones so they understand where to find each tool.
- **Per-MVP tour completion memory** — Stores `eal-exercise-tour-complete:{mvp}` in localStorage so the tour only runs once per module. _Use case:_ Returning users are not re-shown the tour they already completed.
- **Conditional forensics/support steps** — Tour steps for forensics and support are included only when those panels are rendered on the current exercise. _Use case:_ Tour is customized per exercise type rather than showing irrelevant steps.

### ExerciseSupportRail
`src/components/exercises/exercise-support-rail.tsx`

- **Crisis-sensitive support panel** — Shows official support routes (mental health hotline, formal religious guidance) with color escalation to red when `crisisDetected` is true in the sentiment result. _Use case:_ If NLP detects crisis language in a Mental Health exercise, the support rail escalates to red and shows immediate support routes.
- **Module-aware labeling** — Title and summary text differ for Mental Health vs. Religion Hub exercises. _Use case:_ Each module shows the relevant support framing (psychological vs. religious-guidance context).
- **Hidden for DeepReal** — Returns null for DeepReal exercises. _Use case:_ DeepReal content is forensics-focused and does not require a support rail.

### GamificationStatus
`src/components/exercises/gamification-status.tsx`

- **Level and XP progress bar** — Shows current level, XP bar, and next-level threshold from the XP engine. _Use case:_ Persistent visual of the user's progression through the awareness program.
- **Streak display** — Shows current consecutive-day streak. _Use case:_ Encourages daily return visits by making the streak salient.
- **Recent badges strip** — Shows up to two most recently unlocked badges. _Use case:_ Celebrates achievements immediately after they are earned.
- **Cohort rank percentile** — Shows the user's XP percentile relative to the local cohort. _Use case:_ Social comparison hook that motivates users who are near the top percentile.
- **MVP program progress** — Shows sessions completed and total exercises for the current MVP module. _Use case:_ Users see module-specific progress separate from their global XP.

### MentalHealthScienceBrief
`src/components/exercises/mental-health-science-brief.tsx`

- **Research pillar cards** — Four expandable cards covering MHLS measurement, affect labeling, literacy behavior change, and practice design. _Use case:_ Scientific legitimacy panel for the Mental Health module, giving users evidence for why the exercises are designed as they are.
- **Egyptian crisis contacts display** — Renders official Egyptian hotline numbers (16328, toll-free, ambulance) with action labels. _Use case:_ One-Law–compliant safety resource ensuring crisis contacts are always visible in the science brief.
- **Official source links** — Links to WHO, MOHP, and academic references. _Use case:_ Every claim in the brief is backed by a real, resolvable source.

### ReligionHubScienceBrief
`src/components/exercises/religion-hub-science-brief.tsx`

- **Religion-psychology research pillars** — Four cards: what the module measures, positive religious coping, moderation boundaries, and practice design. _Use case:_ Explains the psychology-of-religion science behind the Religion Hub exercises.
- **Official Islamic institution links** — Dar al-Ifta Egypt, Al-Azhar Observatory, MOHP mental health platform with stats and descriptions. _Use case:_ Grounds the module in official religious and health institutions rather than opinion.

### SciencePanel
`src/components/exercises/science-panel.tsx`

- **Theory connection card** — Expandable card naming the psychological theory, author, year, and causal mechanism. _Use case:_ Links each exercise to its theoretical framework (§8.1–§8.3) so users understand the science behind the task.
- **Positive science card** — Shows what research supports (e.g., benevolent reappraisal) with mechanism and citation. _Use case:_ Gives users the evidence-based constructive path alongside the exercise.
- **Negative science card** — Shows what research warns against with mechanism and citation. _Use case:_ Users learn risk patterns and how the positive and negative paths differ.
- **Evidence trust-band display** — Color-coded tier label (Tier 1–5 + Applied) with study-design type. _Use case:_ Users can assess the strength of the evidence cited in the panel.
- **Display mode filtering** — `mode` prop accepts "full" / "theory-only" / "positive-only" / "negative-only" to show only the needed sub-panels. _Use case:_ Exercises that only need the theory card skip the positive/negative panels.

### VerificationConsole
`src/components/exercises/verification-console.tsx`

- **Claim priority scoring** — Classifies claims as NFS / UFS / CFS using an API call. _Use case:_ Exercises that involve a claim show the user whether the claim is "needs fact-checking" before proceeding.
- **Quran ayah search** — Fetches Quran text for a given reference via the Quran API. _Use case:_ Religion Hub exercises can verify Quranic text citations directly in the console.
- **Hadith search** — Searches hadith collections via Sunnah API with grade and reference. _Use case:_ Verifies whether a hadith cited in a viral message is authenticated.
- **Veracity check** — Calls the veracity backend to get a verdict (refuted/supported/mixed/uncertain) with confidence and evidence. _Use case:_ Provides a structured fact-check result for any claim during an exercise.
- **Semantic Islamic search** — Searches both Quran and hadith semantically and returns ranked results. _Use case:_ Users search for Islamic textual evidence on a topic without needing exact references.

---

## Features / Curriculum

### Phase0Dashboard
`src/components/features/curriculum/Phase0Dashboard.tsx`

- **7-day pre-curriculum exercise player** — Loads JSON exercise files for Days 1–7 (calibration, trust, thumbnails, emotion, breathing, help-seeking, DeepReal teaser) and renders them as an interactive player with progress tracking. _Use case:_ Onboarding curriculum that establishes baseline measures and familiarizes users with the platform before the 14-day main program.
- **Difficulty dots** — Visual 5-dot difficulty indicator per day. _Use case:_ Sets user expectations about exercise complexity before they start a day.
- **Day type icons** — Each exercise type maps to an emoji icon (calibration=🎯, breathing=🌬️, etc.). _Use case:_ Quick visual categorization of the day's exercise type.
- **Progress tracking** — Reads/writes day completion to localStorage. _Use case:_ Users can continue Phase 0 across sessions.

---

## Features / DeepReal

### SixLayersVisualizer
`src/components/features/deepreal/six-layers.tsx`

- **6-layer forensic control panel** — Interactive panel with 6 clickable forensic layer buttons (Pixel Noise, C2PA, GAN Artifacts, Audio Spectrogram, Context Match, Prompt Origin); each button updates the active analysis layer and increments a confidence score. _Use case:_ Visual demonstration of the DeepReal 6-layer WebGL forensics methodology.
- **Confidence score accumulator** — Progress bar and percentage fill as layers are scanned. _Use case:_ Shows users that forensic confidence builds as more layers are checked.

---

## Features / Mental Health

### HelpSeekingWizard
`src/components/features/mental-health/HelpSeekingWizard.tsx`

- **GHSQ / Brief-RCOPE assessment sliders** — Two 0–100 sliders for GHSQ intention and Brief-RCOPE religious coping, plus a free-text input. _Use case:_ Baseline feature component for mental-health help-seeking research assessment.
- **Crisis lexicon detection** — Matches input against an Egyptian-Arabic/English crisis-language list; shows the national hotline (16328) immediately if matched. _Use case:_ Safety net: any user expressing crisis language in the free-text field sees the hotline before anything else.

### MythAutopsy
`src/components/features/mental-health/myth-autopsy.tsx`

- **Myth deconstruction display** — Static two-section layout (Emotional Intelligence activation + Logical Positives) deconstructing "depression is just laziness" using EI competencies and logical falsifiability. _Use case:_ Demonstrates the myth-autopsy pattern for reducing stigma through structured cognitive reappraisal.
- **Embedded HelpSeekingWizard** — Renders `HelpSeekingWizard` at the end of the autopsy flow. _Use case:_ Guides users from stigma deconstruction directly into a help-seeking assessment.

---

## Features / Religion

### MaqasidCheck
`src/components/features/religion/MaqasidCheck.tsx`

- **Maqasid al-Shari'ah verification matrix** — Renders five Maqasid objectives as color-coded tiles; active tiles highlight for the current fatwa text. _Use case:_ Allows users to evaluate whether a ruling or fatwa aligns with the five foundational Islamic legal objectives.
- **Fatwa text input** — Textarea accepts arbitrary ruling text; "active" tiles are pre-configured for demonstration. _Use case:_ Prototype interaction for evaluating contemporary fatwas (e.g., cryptocurrency).

### TafsirComponents
`src/components/features/religion/TafsirComponents.tsx`

- **Usul al-Tafsir enforcement display** — Static two-tier list showing transmission-based Tafsir (unlocked) before reason-based Tafsir (locked until primary cleared). _Use case:_ Visualizes the Islamic hermeneutics protocol that gates opinion-based interpretation behind transmission-based sources.

### WhatsAppForwardCheck
`src/components/features/religion/WhatsAppForwardCheck.tsx`

- **Viral message ayah reference extractor** — Parses forwarded WhatsApp text for surah:ayah references using numeric, Arabic keyword, and name-based patterns against a full 114-surah name map. _Use case:_ Detects Quranic references in forwarded messages so users can check them against abrogation and context records.
- **Nasikh-mansukh (abrogation) lookup** — Queries `NasikhMansukhRegistry` for the detected ayah reference. _Use case:_ Identifies whether a cited verse has been abrogated — a common deceptive tactic in religious misinformation.
- **Asbab al-Nuzul (revelation context) lookup** — Queries `AsbabRegistry` for the circumstance of revelation. _Use case:_ Provides the historical context of the verse to prevent decontextualized citation.

---

## Features / Telemetry

### SupervisorDashboard (telemetry)
`src/components/features/telemetry/supervisor-dashboard.tsx`

- **EIS history chart** — Line chart of Emotional Intent Score across 5 sessions with a danger threshold annotation. _Use case:_ Supervisors monitor whether participants are experiencing emotional escalation that triggers a difficulty-tier drop.
- **Engine accuracy chart** — Line chart of answer accuracy across sessions with a mastery threshold. _Use case:_ Supervisors track when participants reach 95% accuracy and are eligible for tier promotion.
- **Frustration loop risk card** — Shows consecutive-high-EIS count against a 3-session trigger threshold. _Use case:_ Automated difficulty management: tier drops when frustration reaches 3/3 sessions.
- **Mastery progression card** — Shows consecutive high-accuracy days against a 5-day promotion threshold. _Use case:_ Tier promotion trigger visualization for the supervisor.
- **Curriculum XP card** — Shows total/max XP with a progress bar. _Use case:_ Overall curriculum completion tracking for the supervisor or the student.
