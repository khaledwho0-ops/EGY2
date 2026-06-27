# UI Components — slice comp-3

**Strategy:** UI Components  
**Items covered:** 103–153 (51 files, 1-based, inclusive)  
**Glob:** `src/components/**/*.tsx` sorted ASCII-ascending  
**Project root:** `New folder (20)/egyptian-awareness-library`

---

## Item 103 — `src/components/science/science-exercise-tracker.tsx`

### Feature: ScienceExerciseTracker
- **Explanation:** Top-level tracker component that lists 33 statistical literacy exercises with difficulty filter tabs (all / beginner / intermediate / advanced). Stores completed exercise IDs in localStorage, renders a filled progress bar, and provides a "Jump to Next" shortcut that finds the first uncompleted exercise.
- **Use Case:** Placed on the Science / Statistics Literacy page so users can work through a curriculum of exercises and resume from where they left off across sessions.
- **Path:** `src/components/science/science-exercise-tracker.tsx`

### Feature: QuickPlayer
- **Explanation:** Inline MCQ player component that renders a single exercise's questions in a step-by-step format. Tracks score, highlights the chosen answer (correct = green / wrong = red), reveals a per-question explanation after the user selects an answer, and shows a final score percentage on the last step.
- **Use Case:** Embedded inside ExerciseRow; launches without navigating away, keeping context intact.
- **Path:** `src/components/science/science-exercise-tracker.tsx`

### Feature: ExerciseRow
- **Explanation:** Lazy-loading row for one exercise. On first expand it fetches `/api/exercise?id=<id>` to get question data, then mounts QuickPlayer. On completion it POSTs to `/api/exercise/complete`, updates localStorage, and calls onComplete callback to increment the global progress bar.
- **Use Case:** Renders each of the 33 exercises in the ScienceExerciseTracker list, deferring data load to keep the initial page lightweight.
- **Path:** `src/components/science/science-exercise-tracker.tsx`

---

## Item 104 — `src/components/shared/ai-assistant.tsx`

### Feature: AIAssistant (floating chatbot)
- **Explanation:** Fixed bottom-right floating button (56 px, purple-to-blue gradient, Sparkles icon) that expands to a 380×520 px chat panel. Supports three modes — General (blue Bot), Fact-Check (red Shield), and Wellness (green HeartPulse) — selectable via tab buttons. Posts to `/api/ai/chat` with `{ message, mode }`, renders provider / model / latency metadata beneath assistant replies, shows an animated spinner while loading, and gracefully displays error messages when no API keys are configured.
- **Use Case:** Persistent site-wide AI assistant; users ask misinformation, mental-health, or claim-verification questions from any page without leaving their current context.
- **Path:** `src/components/shared/ai-assistant.tsx`

---

## Item 105 — `src/components/shared/auth-button.tsx`

### Feature: AuthButton
- **Explanation:** Navbar-level session button that shows "Login" when unauthenticated, or the user's first name + an admin shield icon when logged in. Clicking "Login" opens AuthModal; clicking a logged-in name navigates to the profile page. Calls `getCurrentUser()` on mount.
- **Use Case:** Mounted in the Navbar for every page; provides a consistent authentication entry point.
- **Path:** `src/components/shared/auth-button.tsx`

### Feature: AuthModal
- **Explanation:** Portal-rendered full-screen modal handling four auth flows: login, register, forgot-password, and reset-password. Features: email + password fields, optional admin-code field, "Keep me signed in 24 h" checkbox, offline detection banner, Guest Login button, lockout countdown, and error codes (ALL_FIELDS_REQUIRED, INVALID_EMAIL, PASSWORD_TOO_SHORT, PASSWORD_MISMATCH, EMAIL_EXISTS, LOCKED_OUT, RESET_TOKEN_EXPIRED, RESET_TOKEN_INVALID, INVALID_CREDENTIALS).
- **Use Case:** Triggered by AuthButton; handles the entire user lifecycle from sign-up through password reset within a single component.
- **Path:** `src/components/shared/auth-button.tsx`

---

## Item 106 — `src/components/shared/auth-init.tsx`

### Feature: AuthInit
- **Explanation:** Invisible client component that renders `null`. Currently a placeholder that was intended to initialize JWT state on hydration; contains no active logic.
- **Use Case:** Mounted once in the root layout so future JWT initialization code can be added without changing the layout tree.
- **Path:** `src/components/shared/auth-init.tsx`

---

## Item 107 — `src/components/shared/autopilot.tsx`

### Feature: LiveAutopilot
- **Explanation:** Automated tour of 19 hard-coded pages. Navigates via `router.push()` and scrolls through each page using `window.scrollTo()` at a user-controlled speed (0.5×–5×). Controls: Play/Stop toggle, speed slider with Rewind (←) and FastForward (→) buttons, Skip Page button, a progress bar showing page N/19, current page name, and a live action-status line with animated typing-like indicator.
- **Use Case:** Demonstration or onboarding mode; shows new users all the platform's pages automatically without manual interaction.
- **Path:** `src/components/shared/autopilot.tsx`

---

## Item 108 — `src/components/shared/bilingual-term-card.tsx`

### Feature: BilingualTermCard
- **Explanation:** Side-by-side card that displays an English term alongside its Arabic equivalent, with definitions for each language in a two-column grid. Supports an optional `semanticAnchorSource` field that shows the provenance of the semantic mapping.
- **Use Case:** Used on glossary and terminology pages to give readers both-language context simultaneously.
- **Path:** `src/components/shared/bilingual-term-card.tsx`

---

## Item 109 — `src/components/shared/breadcrumbs.tsx`

### Feature: Breadcrumbs
- **Explanation:** Semantic navigation component that injects a Schema.org `BreadcrumbList` JSON-LD script into the document head, renders an accessible `<nav>` with `aria-label="Breadcrumb"`, and marks the last crumb with `aria-current="page"`.
- **Use Case:** Mounted on inner pages to provide both SEO-structured markup and accessible breadcrumb navigation for users.
- **Path:** `src/components/shared/breadcrumbs.tsx`

---

## Item 110 — `src/components/shared/comb-visualizer.tsx`

### Feature: COMBVisualizer
- **Explanation:** Interactive 3×2 grid of the six COM-B components (Capability-Psychological, Capability-Physical, Opportunity-Physical, Opportunity-Social, Motivation-Reflective, Motivation-Automatic). Clicking any component cell expands a detail panel showing barriers, interventions, and measuredBy fields. Accepts a `currentDay` prop to filter entries by exercise day. Card borders use MVP-specific accent colors.
- **Use Case:** Placed on the Behavior Change / COM-B theory pages to let users understand which psychological levers each exercise targets and what barriers it addresses.
- **Path:** `src/components/shared/comb-visualizer.tsx`

---

## Item 111 — `src/components/shared/concept-explainer.tsx`

### Feature: ConceptExplainer
- **Explanation:** Small inline badge button that, on click, opens a tooltip-style popup displaying a concept's icon, bilingual term (English + Arabic), plain-language explanation, and source citation. Supports four visual types with distinct color schemes: scientific (indigo), islamic (amber), psychological (teal), and statistical (pink).
- **Use Case:** Embedded inside body text on any page; lets authors annotate technical terms without forcing readers to leave the page or break their reading flow.
- **Path:** `src/components/shared/concept-explainer.tsx`

---

## Item 112 — `src/components/shared/defense-library.tsx`

### Feature: DefenseLibrary
- **Explanation:** Large reference component that renders a tabbed or sectioned library of defensive knowledge, comprising: Paralysis Strategy tables by cluster (data-decision, emotional-motivational, planning-cognitive, behavioral-social); 20 Universal Research Standards; 20 Applied Science Principles; 20 Negative Science Threats; 12 Data Scientist Strategies; 12 University Standards; KeyHunter 7-Layer Analysis (4 keyword tables); Mental Health / Religion / Standards synthesis + IAL model; Authority Outreach strategies; Prompt Engineering Strategies; and Support Resources (books, podcasts, media, quotes, presentation guidelines, anti-patterns, defense checklist). All sections render via a shared `DataTable` sub-component.
- **Use Case:** Serves as the comprehensive "encyclopedia" reference on the Defense Library page; researchers and advanced users consult it for structured evidence-based defense strategies.
- **Path:** `src/components/shared/defense-library.tsx`

---

## Item 113 — `src/components/shared/dot-navigation.tsx`

### Feature: DotNavigation
- **Explanation:** Fixed right-side vertical dot indicator. Uses an IntersectionObserver to highlight the dot for whichever section currently occupies the viewport midpoint. Clicking a dot calls `scrollIntoView({ behavior: 'smooth' })` on the target section. Each dot carries `aria-label` and the active dot gets `aria-current="true"`.
- **Use Case:** Placed on long single-page experiences (e.g., multi-section deep-dives) so users always know where they are and can jump to any section with one click.
- **Path:** `src/components/shared/dot-navigation.tsx`

---

## Item 114 — `src/components/shared/eight-gate-check.tsx`

### Feature: EightGateCheck
- **Explanation:** 8-gate claim verification protocol rendered as eight labeled checkboxes plus five text-input boxes (Claim / Evidence / Context / Emotion / Consequence). A status indicator shows a warning until all eight boxes are checked and all five inputs are non-empty. A "Continue" button calls `recordVerificationEvent()` on completion.
- **Use Case:** Embedded on fact-checking workflows to guide users through the platform's full verification methodology before they accept or share a claim.
- **Path:** `src/components/shared/eight-gate-check.tsx`

---

## Item 115 — `src/components/shared/evidence-search.tsx`

### Feature: EvidenceSearch
- **Explanation:** Multi-backend evidence aggregator with eight search tabs: Fact Check (ClaimBuster), Crossref, OpenAlex, Semantic Scholar, Veracity (POST `/api/search/veracity`), NCBI PubMed, MediaWiki, and Internet Archive. Each backend issues a GET request with `?q=<query>` or a POST with `{ claim }`. Results are normalised via `normalizeVeracityResult()` into `NormalizedAPIResponse[]` objects, then rendered as cards showing trust band A/B/C color-coding (A = green, B = amber, C = red), source type badge, and an external link.
- **Use Case:** Placed on the Evidence Hub and God-System pages so researchers can search academic and fact-checking databases without leaving the platform.
- **Path:** `src/components/shared/evidence-search.tsx`

---

## Item 116 — `src/components/shared/explore-hub.tsx`

### Feature: ExploreHub
- **Explanation:** Full-screen right-side panel (960 px wide) triggered by a floating action button. Contains four tabs: (1) "All Pages" — 123 routes across 13 categories with text search and active-page highlighting; (2) "How It Works" — 6-step verification flow cards; (3) "Live Tools" — 18 runnable API tools (factcheck, pubmed, openalex, semantic-scholar, wikipedia, archive, claimbuster, veracity, reverse-image, nlp-sentiment, nlp-arabic, ai-chat, osint-investigator, fallacy-detect, bias-detect, forensic-image, forensic-c2pa, god-system), each with an inline query input that fires and displays results in real time; (4) "Core Modules" — 6 module cards with links. Supports multi-tool parallel execution, ESC to close, body-scroll lock, and a custom `open-explore-hub` browser event from external code.
- **Use Case:** Site-wide exploration and tool-access overlay; users can discover content, run live API lookups, and navigate to any page from any context.
- **Path:** `src/components/shared/explore-hub.tsx`

---

## Item 117 — `src/components/shared/focus-trap-modal.tsx`

### Feature: useFocusTrap (hook)
- **Explanation:** React hook that, when activated, restricts Tab-key focus cycling to elements within a container ref. ESC key triggers a provided `onClose` callback. On unmount the hook restores focus to the element that was active before the modal opened.
- **Use Case:** Imported by FocusTrapModal and other portal modals to ensure screen-reader users cannot accidentally focus outside an open dialog.
- **Path:** `src/components/shared/focus-trap-modal.tsx`

### Feature: FocusTrapModal
- **Explanation:** Portal-rendered modal wrapper that uses `useFocusTrap` internally. Supports configurable max-width, sticky header slot, `closeOnOverlay` and `closeOnEscape` props, and locks body scroll by adding the `menu-open` CSS class to `document.body` while open.
- **Use Case:** Base modal primitive reused by ImplementIRLButton, AuthModal, and other dialogs that require accessible focus containment.
- **Path:** `src/components/shared/focus-trap-modal.tsx`

---

## Item 118 — `src/components/shared/footer.tsx`

### Feature: Footer
- **Explanation:** Site footer containing: crisis contacts panel (mental-health hotline 16328, toll-free helpline, ambulance 123, MOHP digital platform link, Dar al-Ifta 107); engine links (DeepReal, Mental Health, Religion Hub); a Powers section (Angry Debunkers, AI Agents, Global Alliance, Islamic Verification, OSINT); Resources links; and a disclaiming "Important Notice" text drawn from an EAL legal notice constant. Contact data is imported from `@/data/crisis-contacts`.
- **Use Case:** Mounted in the root layout below every page; ensures crisis resources are always one scroll away.
- **Path:** `src/components/shared/footer.tsx`

---

## Item 119 — `src/components/shared/framework-coverage.tsx`

### Feature: FrameworkCoverage
- **Explanation:** Stats dashboard component showing two tables: `PROJECT_SCOPE_COVERAGE` (scope section, status, summary, app mapping) and `RESEARCH_TASKS_COVERAGE` (task, status, implementation), plus summary count cards for scope sections, implemented/mapped/partial entries, trusted sources, KeyHunter entries, prompt library size, intervention modes, theory entries, and COM-B entries.
- **Use Case:** Placed on the Research/Framework admin page for project contributors to track which parts of the governing standard have been implemented in the app.
- **Path:** `src/components/shared/framework-coverage.tsx`

---

## Item 120 — `src/components/shared/global-search.tsx`

### Feature: GlobalSearch
- **Explanation:** Full-screen search overlay triggered from the Navbar. Loads `SITE_CONTENT_TAGS` (an array of `{ label, labelAr, keywords, route }` objects) and performs fuzzy filtering across all fields as the user types. ESC or clicking outside closes the overlay with body-scroll lock. Selecting a result navigates via `router.push()` and shows a result count.
- **Use Case:** Site-wide keyword search for users who know a topic but not which page contains it.
- **Path:** `src/components/shared/global-search.tsx`

---

## Item 121 — `src/components/shared/handoff-card.tsx`

### Feature: HandoffCard
- **Explanation:** Cross-engine recommendation chip (per §25.4) that shows the target MVP's identity card — role name, core question, icon — and a dismiss (×) button plus an "Explore [MVP]" link pointing to a specific exercise day URL. Implements the platform's "handoff" pattern where one engine recommends a related MVP to the user.
- **Use Case:** Surfaced when the current page detects a user's need that another MVP addresses better (e.g., after a DeepReal session, recommending the Mental Health MVP).
- **Path:** `src/components/shared/handoff-card.tsx`

---

## Item 122 — `src/components/shared/implement-irl-button.tsx`

### Feature: ImplementIRLButton
- **Explanation:** Pill-shaped "Apply IRL" button (compact mode renders only an icon) that opens a portal modal with ordered real-life implementation steps and three scientific method cards (each showing name, description, exercise prompt, and source citation). Accent color is configurable per call site. Uses `FocusTrapModal` internally.
- **Use Case:** Placed next to exercises and evidence cards so users can immediately see how to apply a theoretical concept in the real world, without needing to navigate elsewhere.
- **Path:** `src/components/shared/implement-irl-button.tsx`

---

## Item 123 — `src/components/shared/keyhunter-drawer.tsx`

### Feature: KeyHunterDrawer
- **Explanation:** Accordion-style drawer that exposes all seven KeyHunter keyword layers: coreKeywords, expertKeywords, hiddenTerms, researchPhrases, threatKeywords, confusionWords, and promptSuggestions. Each keyword item has a copy-to-clipboard icon that shows a temporary checkmark confirmation.
- **Use Case:** Embedded on research pages to give users curated search-term lists for each deception layer so they can run informed database searches.
- **Path:** `src/components/shared/keyhunter-drawer.tsx`

### Feature: KeyHunterCard
- **Explanation:** Compact toggle card that shows a layer name and toggles KeyHunterDrawer visibility on click. Acts as the collapsed entry point for the drawer.
- **Use Case:** Space-efficient wrapper used in sidebars and exercise pages where full drawer space is not always available.
- **Path:** `src/components/shared/keyhunter-drawer.tsx`

---

## Item 124 — `src/components/shared/methodology-timeline.tsx`

### Feature: MethodologyTimeline
- **Explanation:** Vertical timeline rendering 9 research phases (Recruitment → Data Analysis). Each phase node is clickable; clicking expands a description paragraph and a color-coded pill list of the instruments/tools used in that phase.
- **Use Case:** Shown on the Methodology / Research Design page to explain the study pipeline to students, reviewers, and collaborating researchers.
- **Path:** `src/components/shared/methodology-timeline.tsx`

---

## Item 125 — `src/components/shared/mini-chatbot.tsx`

### Feature: MiniChatbot
- **Explanation:** Page-contextual floating chatbot. Accepts `systemPrompt`, `pageName`, `pageNameAr`, and `quickScenarios` (pre-built prompt buttons) as props. Posts messages to `/api/chat`. Includes a client-side fallback response generator for offline/error states so the UI never shows a broken state. History is maintained in-memory for the session.
- **Use Case:** Placed on individual content pages (e.g., specific deception-layer or exercise pages) with a page-specific system prompt that anchors the AI to that context.
- **Path:** `src/components/shared/mini-chatbot.tsx`

---

## Item 126 — `src/components/shared/narrator-guide.tsx`

### Feature: NarratorGuide
- **Explanation:** Per-page contextual guide with multiple tip slides. Uses a `PAGE_TIPS` map keyed to 9 route patterns (plus a wildcard exercise pattern) to load the correct tip set. Auto-displays after 2.5 s on the first visit to a page (checked with a sessionStorage flag). The open button pulses until the guide has been dismissed once. Supports dot-based pagination (prev/next) and ESC to close.
- **Use Case:** Provides first-time contextual orientation on complex pages without requiring users to seek help; silences itself after the first view to avoid annoyance on return visits.
- **Path:** `src/components/shared/narrator-guide.tsx`

---

## Item 127 — `src/components/shared/navbar.tsx`

### Feature: Navbar
- **Explanation:** Sticky top navigation bar that transitions from fully transparent to a frosted-glass surface when the page is scrolled more than 60 px. Contains: theme picker, RTL/LTR language toggle, language selector (EN / AR / ar-EG), GlobalSearch trigger, AuthButton, MegaNav dropdown, and TrustedQuickAccess panel. Mobile breakpoint collapses items to a hamburger menu; opening the menu adds `menu-open` to the body for scroll lock. Reads the current user on mount via `getCurrentUser()`.
- **Use Case:** Persistent top-level navigation mounted in the root layout across all pages.
- **Path:** `src/components/shared/navbar.tsx`

---

## Item 128 — `src/components/shared/page-ai-chatbot.tsx`

### Feature: PageAIChatbot
- **Explanation:** Framer Motion–animated floating chatbot (scale/opacity/y spring animation on open/close). Accepts `systemPromptOverride` and `pageContext` props passed directly to `/api/ai/chat`. Maintains multi-turn conversation history. Auto-greets on first open with a configurable greeting. Shows suggested quick questions when the message count is ≤ 1. Renders assistant responses via `dangerouslySetInnerHTML` with rudimentary markdown (bold, italic, horizontal rule, newlines) conversion.
- **Use Case:** Richer per-page AI assistant replacement for pages where MiniChatbot is insufficient; used on engine landing pages and complex content pages.
- **Path:** `src/components/shared/page-ai-chatbot.tsx`

---

## Item 129 — `src/components/shared/page-navigation.tsx`

### Feature: PageNavigation
- **Explanation:** Previous/Next navigation links that are strictly constrained to the same category as the current page. Uses an exported `PAGE_ORDER` constant (11 categories, ~100 pages) to find adjacent pages. Renders a category badge showing category name and position N/total, handles gracefully when a page is at the start or end of its category.
- **Use Case:** Mounted at the bottom of content pages to guide users through a structured curriculum without jumping categories.
- **Path:** `src/components/shared/page-navigation.tsx`

### Feature: PAGE_ORDER (exported constant)
- **Explanation:** Named export of the full ordered page-routing table (11 categories, ~100 routes). Consumed by PageNavigation but also importable by other components that need category-aware routing logic.
- **Use Case:** Single source of truth for the in-app reading order; prevents ad-hoc route arrays from diverging.
- **Path:** `src/components/shared/page-navigation.tsx`

---

## Item 130 — `src/components/shared/parallax-hero.tsx`

### Feature: ParallaxHero
- **Explanation:** Wrapper component that applies a `translateY(scrollY * speed)` CSS transform to a background layer as the user scrolls, creating a parallax depth effect. Props: `speed` (default 0.3), `bgGradient` CSS string, `minHeight`.
- **Use Case:** Used as the hero section wrapper on landing pages and chapter headers to add visual depth without JavaScript-heavy animation libraries.
- **Path:** `src/components/shared/parallax-hero.tsx`

---

## Item 131 — `src/components/shared/prompt-lab.tsx`

### Feature: PromptLab
- **Explanation:** Displays 42 framework prompts (24 DeepReal + 9 Mental Health + 9 Religion Hub). MVP filter tabs narrow the visible set. A variable-substitution form calls `fillPromptVariables()` to populate prompt placeholders before display. Each prompt card has a copy-to-clipboard button. A safety notice section lists the §20.1 seven prompt safety rules.
- **Use Case:** Placed on the Prompt Lab research page so practitioners and researchers can find, customize, and copy ready-made evidence-based prompts for AI tools.
- **Path:** `src/components/shared/prompt-lab.tsx`

---

## Item 132 — `src/components/shared/provenance-box.tsx`

### Feature: ProvenanceBox
- **Explanation:** Evidence provenance card with: a review-status badge; a 5-bar strength indicator (evidence tier); a 3-source chain (primary, comparative, methodological) each tagged with trust band A/B/C color-coding; and reviewer/date metadata.
- **Use Case:** Mounted alongside factual claims on content pages so readers can immediately inspect the evidence chain without navigating to external sources.
- **Path:** `src/components/shared/provenance-box.tsx`

### Feature: EvidenceDisambiguation
- **Explanation:** Explanatory panel that distinguishes three types of evidence used in the platform — Content Evidence (what the source says), Validation Evidence (independent replication), and Framework Evidence (theoretical grounding) — with examples for each.
- **Use Case:** Shown on methodology/about pages to help users understand what each evidence type in ProvenanceBox means.
- **Path:** `src/components/shared/provenance-box.tsx`

---

## Item 133 — `src/components/shared/quick-guide.tsx`

### Feature: QuickGuide
- **Explanation:** Collapsible guide component rendering numbered steps as styled circles with labels, plus an optional "Real Scenario" example block. Props: `rtl` for Arabic layout, `defaultOpen`, step array, scenario text. Uses CSS custom properties for theming. Collapsed by default unless `defaultOpen` is passed.
- **Use Case:** Placed at the start of exercise pages and tool pages to give users a brief "how to use this page" orientation that they can dismiss.
- **Path:** `src/components/shared/quick-guide.tsx`

---

## Item 134 — `src/components/shared/rtl-provider.tsx`

### Feature: RTLProvider + useRTL
- **Explanation:** React Context providing trilingual state: `en`, `ar`, and `ar-EG`. Persists selections to localStorage under keys `eal-language` and `eal-direction`. On change, syncs `dir` and `lang` attributes to `document.documentElement`. Exposes a `t({ en, ar, arEG })` translation helper that picks `arEG` over `ar` over `en` based on current locale. `useRTL()` hook exposes `isRTL`, `language`, `setLanguage`, and `t`.
- **Use Case:** Root provider wrapping the entire application; all bilingual components consume `useRTL` instead of managing their own locale state.
- **Path:** `src/components/shared/rtl-provider.tsx`

---

## Item 135 — `src/components/shared/scientific-shield.tsx`

### Feature: ScientificShield
- **Explanation:** Pure presentational evidence-chip component (EAL Standard §13). Renders a themed card containing: confidence label badge (HIGH / MEDIUM / CONTESTED / UNVERIFIED) with a derived percentage; cross-model consensus indicator; optional methodology note; deception-layer attribution block (layer number, name, Arabic name, defense strategy); a tiered source list (S/A/B/C/U tiers, stance badges: supports/refutes/unrelated, relevance dimming, snippet, why text); and a grounding-audit panel listing up to three unsupported claims flagged by the AI. All colors derive from CSS custom properties so the chip re-grades visually with the active theme. Accepts partial props — renders only the sections for which data is provided.
- **Use Case:** Mounted on every factual block across the platform wherever AI-generated evidence shields are rendered, providing the One-Law evidence provenance display.
- **Path:** `src/components/shared/scientific-shield.tsx`

---

## Item 136 — `src/components/shared/scroll-progress-bar.tsx`

### Feature: ScrollProgressBar
- **Explanation:** Fixed top-of-page progress bar (3–4 px tall, `zIndex: 9999`, `pointerEvents: none`) driven by `scrollY / (scrollHeight − viewportHeight)`. Supports three gradient variants: `default` (purple-to-red `#667eea → #f64f59`), `14day` (three-engine gradient using CSS variables), and `mvp` (single MVP accent color with a lighter tint). Can be overridden with a `manualProgress` prop (0–1) for non-scroll-driven contexts. Passive scroll listener, RAF-based initial sync. Exposes `role="progressbar"` with `aria-valuenow`.
- **Use Case:** Mounted at the top of long content pages and the 14-day program pages to give visual reading-progress feedback.
- **Path:** `src/components/shared/scroll-progress-bar.tsx`

---

## Item 137 — `src/components/shared/scroll-progress.tsx`

### Feature: ScrollProgress
- **Explanation:** Simpler version of scroll-progress feedback: a single thin bar using `transform: scaleX()` driven by `window.scrollY / (body.scrollHeight − innerHeight)`. Relies on two CSS classes (`scroll-progress`, `scroll-progress-bar`) defined in globals.css rather than inline styles. Passive scroll listener, GPU-accelerated via transform. Gradient is fixed purple-to-pink.
- **Use Case:** Drop-in replacement for pages that use the Tailwind CSS class-based styling approach rather than inline CSS variables; the simpler styling model reduces override risk.
- **Path:** `src/components/shared/scroll-progress.tsx`

---

## Item 138 — `src/components/shared/source-pyramid.tsx`

### Feature: SourcePyramid
- **Explanation:** Animated Framer Motion pyramid illustrating the EAL source hierarchy. Six tiers from top (narrowest) to bottom (widest): Tier S — Living Authoritative Bodies (WHO, Cochrane, Al-Azhar Observatory, Dar al-Iftaʾ, IFCN signatories); Tier 1 — Peer-Reviewed Primary Evidence with GRADE (NEJM, Lancet, Nature); Tier 2 — Credentialed Secondary (CDC, ECDC, MoH Egypt, classical Islamic commentaries with chains); Tier 3 — Quality Journalism (Reuters, AP, BBC); Tier 4 — Aggregators (Wikipedia as jump-off only); Tier 5 — Social Media & AI Generation (treat as zero evidence). Each tier fades and slides up on scroll via `whileInView`. A vertical gradient spine connects them visually.
- **Use Case:** Shown on the Source Verification and About pages to visually communicate which sources the platform accepts and at what weight.
- **Path:** `src/components/shared/source-pyramid.tsx`

---

## Item 139 — `src/components/shared/success-tracker.tsx`

### Feature: SuccessTracker
- **Explanation:** RTL-aware dashboard rendering the `SUCCESS_CRITERIA` array from `@/lib/scoring/effect-size`. For each metric, shows three threshold bands (minimum / target / stretch) in a 3-column grid with conditional highlighting based on `currentLevel`. A left-border color encodes the current achievement level (red = not_met, amber = minimum, blue = target, green = stretch). An "If not met" fallback message is displayed at the bottom of each row.
- **Use Case:** Placed on the Research / Study Design page for project contributors to track which success criteria the study is currently meeting.
- **Path:** `src/components/shared/success-tracker.tsx`

---

## Item 140 — `src/components/shared/testimonials-marquee.tsx`

### Feature: TestimonialsMarquee
- **Explanation:** Two-row auto-scrolling CSS marquee of 8 verified scholarly quotes (Carl Sagan, Richard Feynman, William James, Viktor Frankl, Jonathan Sacks, Karen Armstrong, Ibn Rushd, Al-Hasan al-Basri). Row 1 scrolls left; row 2 scrolls right using a `marquee-track-reverse` CSS class. Each card shows the quote in italic, author initials avatar, and role label. RTL-aware layout. Quotes are duplicated in the track array to create seamless looping.
- **Use Case:** Placed on the home page and platform introduction pages to establish intellectual credibility through recognizable authority quotes.
- **Path:** `src/components/shared/testimonials-marquee.tsx`

---

## Item 141 — `src/components/shared/theme-provider.tsx`

### Feature: ThemeProvider + useTheme
- **Explanation:** React Context providing 16 named themes (bloodline, dark, light, terracotta, amethyst, olive-meadow, pearl-slate, core-wine, blush-energy, steel-azure, crimson-violet, deep-mocha, espresso-peony, raspberry-space, icy-gunmetal, lilac-cream) plus a `system` sentinel that resolves to dark or light based on `prefers-color-scheme`. Applies the theme by setting a `data-theme` attribute on `<html>`. Includes `contrastMode` (normal / high) toggling. Auto-cycle mode uses a Fisher-Yates shuffle queue so each theme appears exactly once per cycle before reshuffling. Exposes `setTheme`, `setContrastMode`, `startAutoCycle`, `stopAutoCycle`, and `isAutoCycling`.
- **Use Case:** Root provider wrapped around the application; all themed components reference CSS variables set by the active theme class rather than hard-coded colors.
- **Path:** `src/components/shared/theme-provider.tsx`

### Feature: THEME_OPTIONS (exported constant)
- **Explanation:** Named export — an array of `{ value, label, description, scheme }` objects for all 16 resolved themes. Consumed by the theme picker UI, VisualClarityPanel, and the Navbar theme switcher.
- **Use Case:** Single source of truth for the theme catalog; adding a new theme requires only one entry in this array.
- **Path:** `src/components/shared/theme-provider.tsx`

---

## Item 142 — `src/components/shared/theory-card.tsx`

### Feature: TheoryCard
- **Explanation:** Expandable accordion card for a single theoretical framework (`TheoryConnection` type). Collapsed state shows role badge (primary/pedagogical/supporting/skill/design/risk), year, theory name, and authors. Expanded state reveals: description paragraph; Causal Mechanism block (highlighted with role badge color and left border); Evidence block (emerald); How It's Applied block; Expected Outcome block (amber); a row of day-number chips for which exercise days the theory is active; and a formatted citation. Bilingual via `useRTL`.
- **Use Case:** Mounted on exercise detail pages (the "Why This Works" section) so users understand the psychological or behavioral theory underlying each exercise, not just the exercise instructions.
- **Path:** `src/components/shared/theory-card.tsx`

---

## Item 143 — `src/components/shared/verified-quotes-strip.tsx`

### Feature: VerifiedQuotesStrip
- **Explanation:** Randomized grid of 6 scholarly quotes drawn from the `VERIFIED_QUOTES` dataset (2 from DeepReal, 2 from Mental Health, 2 from Religion Hub). Selection is randomized per render via `useMemo` + `Math.random()`. Each card renders a module badge, author name, the quote text (bilingual based on `isRTL`), and a framing sentence explaining relevance. Titles and framing use the `t()` translation helper.
- **Use Case:** Placed on the home page and hub pages to show domain-balanced, citation-backed wisdom from scientists, religious scholars, and philosophers — reinforcing the platform's One-Law evidence standard.
- **Path:** `src/components/shared/verified-quotes-strip.tsx`

---

## Item 144 — `src/components/shared/visual-clarity-panel.tsx`

### Feature: VisualClarityPanel
- **Explanation:** In-workflow panel offering four recommended themes (steel-azure, light, terracotta, icy-gunmetal) as one-click buttons, plus normal/high contrast toggle buttons, and a "Try all themes" auto-cycle toggle. Shows the current active theme and contrast mode as badges. Bilingual labels. Explains the ergonomic rationale (eye strain reduction, fewer reading errors under pressure).
- **Use Case:** Embedded inside settings sidebars and the DeepReal analysis workflow so users can adjust visual comfort settings without navigating away from their task.
- **Path:** `src/components/shared/visual-clarity-panel.tsx`

---

## Item 145 — `src/components/six-layers/DefenseSection.tsx`

### Feature: DefenseSection
- **Explanation:** Closing section of the "هندسة الخداع" (Architecture of Deception) scrollytelling page. Renders a bilingual defense-protocol table (layer number in Arabic calligraphy, attack description EN/AR, defense description EN/AR) using data from `DEFENSE_PROTOCOLS`. Below the table, two CTA cards link to the Live Deception Simulator (`/live-deception`) and the 3D Infection Atlas (`/misinfo-atlas`). Uses Framer Motion `whileInView` entrance animations.
- **Use Case:** Mounted as the final section of the six-layers scrollytelling page; transitions users from passive reading to active practice tools.
- **Path:** `src/components/six-layers/DefenseSection.tsx`

---

## Item 146 — `src/components/six-layers/FloatingNav.tsx`

### Feature: FloatingNav
- **Explanation:** Fixed right-side floating navigation with 10 dots (0 = hero, 1–8 = layers, 9 = defense). Uses IntersectionObserver with 30% threshold on section elements to track the active layer and syncs to `ScrollContext`. Hovering a dot reveals a fade-in Arabic tooltip with the layer name. Clicking scrolls to the corresponding section via `scrollIntoView`. The active dot enlarges with a CSS scale transform and an animated ring using Framer Motion `layoutId`. Also writes the current layer index back to `useScrollContext` for the WebGL particle system.
- **Use Case:** Provides spatial orientation in the long six-layers scrollytelling experience and enables quick navigation to any section.
- **Path:** `src/components/six-layers/FloatingNav.tsx`

---

## Item 147 — `src/components/six-layers/HeroSection.tsx`

### Feature: HeroSection
- **Explanation:** Immersive hero section with a transparent background so the WebGL particle field shows through. Contains: brand preface (Framer Motion fade-in), a large Arabic calligraphic title "هندسة الخداع" (fade + slide), bilingual subtitle, four stat chips (70+ case studies, 6 layers, 1000+ years, Egyptian focus), a scroll CTA with an animated bouncing scroll indicator (mouse icon with white dot). Section element has `id="hero"` for FloatingNav targeting.
- **Use Case:** Entry point for the `/six-layers` (Architecture of Deception) scrollytelling page; sets the dramatic tone before the WebGL particle sphere transforms as the user scrolls.
- **Path:** `src/components/six-layers/HeroSection.tsx`

---

## Item 148 — `src/components/six-layers/Layer8Special.tsx`

### Feature: Layer8Special
- **Explanation:** Specially staged section for Layer 8 ("The Unknown"). Displays all 108 combined case studies (8 base + 100 from `LAYER_8_100_CASES`) with a torch-mask effect: mouse position drives a CSS radial-gradient mask revealing only what is near the cursor (the rest is dark). A three-phase timed reveal (phase 1 at 20 min, phase 2 at 25 min, phase 3 at 30 min of reading) progressively adds CSS glitch animations (`animate-cursed-glitch`) and culminates in a full-screen red "YOU CANT DO ANYTHING BUT BE TERRIFIED" message. An `isAnimationsDisabled` flag from ScrollContext bypasses all timed effects for accessibility.
- **Use Case:** Constitutes the final content layer on the six-layers page, designed to be deliberately overwhelming and hard to read — a visceral experience of "uncontrollable information" as the content theme.
- **Path:** `src/components/six-layers/Layer8Special.tsx`

---

## Item 149 — `src/components/six-layers/LayerSection.tsx`

### Feature: LayerSection (main controller)
- **Explanation:** Top-level controller that routes to the correct layer renderer based on `layer.number`: Layer 8 → `Layer8Special`; Layer 7 → toggling / faded / creepy phase-based renderers; Layers 1–6 → `StandardLayerUI`. Layer 7 runs a `runTimeline` async loop toggling between `Layer7Special` (brutalist/glitchy) and `StandardLayerUI` (glassmorphism) every 30 s, then phases through a fade-out and a creepy "CONTINUE SCROLLING AS WE WANT" message, then loops.
- **Use Case:** Single import point for any layer section; the page only needs to map over `LAYERS` and render `<LayerSection layer={layer} />` for the routing to be handled automatically.
- **Path:** `src/components/six-layers/LayerSection.tsx`

### Feature: StandardLayerUI
- **Explanation:** Full glassmorphism layer section for Layers 1–6. Renders: large Arabic numeral hero (animated scale-in), bilingual layer name, definition block, animated stat counters (IntersectionObserver-triggered cubic-ease-out count-up), global case study cards (CaseCard), Egyptian case study cards, and an Egyptian Deep Dive panel with stats grid for that layer's Egyptian-specific context (data from `EGYPTIAN_DETAILS` record for layers 1–6).
- **Use Case:** Used for the standard layers in the Architecture of Deception page; particles from the WebGL layer show through the transparent backgrounds.
- **Path:** `src/components/six-layers/LayerSection.tsx`

### Feature: CaseCard + popup modal
- **Explanation:** Glassmorphism card displaying a deception case study with year, domain, bilingual title, and impact description. On click, opens a portal modal (`AnimatePresence` spring animation) with the full content: impact section, "How it works" illustration (EN + AR), layer analysis, and an Egyptian Context badge when `egyptianSpecific` is true. ESC closes the modal.
- **Use Case:** Case study presentation unit for all layers; keeps the layer section scannable while giving users an optional deep-dive into each case.
- **Path:** `src/components/six-layers/LayerSection.tsx`

### Feature: AnimatedCounter
- **Explanation:** Count-up number display driven by IntersectionObserver + `requestAnimationFrame`. Uses a cubic ease-out easing function over 2.5 s. Displays formatted integers or one-decimal floats, a suffix, bilingual label, and an accent-colored top glow bar.
- **Use Case:** Used inside StandardLayerUI to show impactful statistics (e.g., "82 million Egyptian internet users") that animate into view as the user scrolls to each layer.
- **Path:** `src/components/six-layers/LayerSection.tsx`

### Feature: Layer7Special (brutalist renderer)
- **Explanation:** Brutalist / Swiss-style renderer for Layer 7 ("Total Freedom vs. Zero Freedom"). Uses glitch-shaking Framer Motion animations, RGB offset text shadows, alternating black/white case study boxes, and extreme skew entrance transitions. Contrasted against `StandardLayerUI` in the 30-s toggle loop in `LayerSection` to embody the theme of the layer itself (manipulation of presentation).
- **Use Case:** The "brutalist" visual mode for Layer 7 that alternates with the glassmorphism mode to disorient and demonstrate total-freedom manipulation of information presentation.
- **Path:** `src/components/six-layers/LayerSection.tsx`

---

## Item 150 — `src/components/six-layers/ParticleField.tsx`

### Feature: ParticleField
- **Explanation:** React Three Fiber `<points>` component rendering up to 65,536 particles (16,384 on mobile) with a custom GLSL vertex/fragment shader. The vertex shader morphs particles between 9 named shapes tied to scroll layers: Sphere (hero), Exploded (L1), Torus (L2), Grid (L3), Spiral (L4), DNA (L5), Brain (L6), BlackHole (L7), Chaos (L8). Morph interpolation uses `smoothstep` between adjacent shapes driven by `u_morphProgress` (lerped toward `currentLayer` each frame). Mouse proximity triggers an exponential particle repulsion "explosion" effect (2-unit radius). Layer-specific color overrides: L7 = red/cyan alternating; L8 = pulsing blood red. Uses `AdditiveBlending` with very low per-particle alpha (0.02–0.06) to create a nebula effect without white bloom. Simplex noise (GLSL snoise) drives organic drift.
- **Use Case:** The full-page fixed WebGL background of the six-layers scrollytelling page; its shape morphs to match whichever deception layer the user is viewing, creating a visceral visual metaphor for each layer.
- **Path:** `src/components/six-layers/ParticleField.tsx`

---

## Item 151 — `src/components/six-layers/Scene.tsx`

### Feature: Scene
- **Explanation:** Fixed `z-0` wrapper component that dynamically imports `SceneCanvas` (SSR disabled) to prevent Next.js server-side serialization issues with R3F. Falls back to a static radial gradient if `prefers-reduced-motion` is detected. Shows a bilingual loading indicator ("Initializing Neural Core...") while SceneCanvas loads.
- **Use Case:** Mounted once in the six-layers page layout; separates SSR-safe wrappers from the WebGL canvas, ensuring the page hydrates without crashing on server rendering.
- **Path:** `src/components/six-layers/Scene.tsx`

---

## Item 152 — `src/components/six-layers/SceneCanvas.tsx`

### Feature: SceneCanvas
- **Explanation:** The actual R3F `<Canvas>` configuration separated from `Scene.tsx` to avoid circular JSON serialization in the Next.js runtime. Sets `dpr` to `[1,1]` on mobile and `[1,2]` on desktop, disables antialias/stencil/depth for performance, positions the camera at `[0,0,5]` with a 60° FOV, and renders `<ParticleField>` inside `<Suspense>` (65,536 particles on desktop, 16,384 on mobile).
- **Use Case:** The leaf-level WebGL canvas; dynamically imported by Scene to isolate R3F initialization from the SSR-safe layer.
- **Path:** `src/components/six-layers/SceneCanvas.tsx`

---

## Item 153 — `src/components/six-layers/ScrollContext.tsx`

### Feature: ScrollProvider + useScrollContext
- **Explanation:** React Context providing shared scroll state to both DOM components and R3F `useFrame` callbacks. Uses a mutable `stateRef` (not React state) for all frequently updated fields — `progress` (0–1), `currentLayer` (0–9), `layerProgress` (0–1), `mouseX/Y` (−1 to 1), `velocity` (px/frame) — so that the WebGL shader can read them each frame with zero re-renders. Setter functions (`setProgress`, `setCurrentLayer`, `setLayerProgress`, `setVelocity`, `setMouse`) are stable `useCallback` references. Also manages `isAnimationsDisabled` boolean state (React state, because UI components need to re-render when it changes) and `setAnimationsDisabled`.
- **Use Case:** Root provider for the six-layers page; FloatingNav writes `currentLayer` into it, ParticleField reads it every WebGL frame to drive morph progress, and Layer8Special reads `isAnimationsDisabled` to bypass timed glitch effects.
- **Path:** `src/components/six-layers/ScrollContext.tsx`

---

## Summary Table

| # | File | Features Documented |
|---|------|-------------------|
| 103 | science/science-exercise-tracker.tsx | ScienceExerciseTracker, QuickPlayer, ExerciseRow |
| 104 | shared/ai-assistant.tsx | AIAssistant |
| 105 | shared/auth-button.tsx | AuthButton, AuthModal |
| 106 | shared/auth-init.tsx | AuthInit |
| 107 | shared/autopilot.tsx | LiveAutopilot |
| 108 | shared/bilingual-term-card.tsx | BilingualTermCard |
| 109 | shared/breadcrumbs.tsx | Breadcrumbs |
| 110 | shared/comb-visualizer.tsx | COMBVisualizer |
| 111 | shared/concept-explainer.tsx | ConceptExplainer |
| 112 | shared/defense-library.tsx | DefenseLibrary |
| 113 | shared/dot-navigation.tsx | DotNavigation |
| 114 | shared/eight-gate-check.tsx | EightGateCheck |
| 115 | shared/evidence-search.tsx | EvidenceSearch |
| 116 | shared/explore-hub.tsx | ExploreHub |
| 117 | shared/focus-trap-modal.tsx | useFocusTrap, FocusTrapModal |
| 118 | shared/footer.tsx | Footer |
| 119 | shared/framework-coverage.tsx | FrameworkCoverage |
| 120 | shared/global-search.tsx | GlobalSearch |
| 121 | shared/handoff-card.tsx | HandoffCard |
| 122 | shared/implement-irl-button.tsx | ImplementIRLButton |
| 123 | shared/keyhunter-drawer.tsx | KeyHunterDrawer, KeyHunterCard |
| 124 | shared/methodology-timeline.tsx | MethodologyTimeline |
| 125 | shared/mini-chatbot.tsx | MiniChatbot |
| 126 | shared/narrator-guide.tsx | NarratorGuide |
| 127 | shared/navbar.tsx | Navbar |
| 128 | shared/page-ai-chatbot.tsx | PageAIChatbot |
| 129 | shared/page-navigation.tsx | PageNavigation, PAGE_ORDER |
| 130 | shared/parallax-hero.tsx | ParallaxHero |
| 131 | shared/prompt-lab.tsx | PromptLab |
| 132 | shared/provenance-box.tsx | ProvenanceBox, EvidenceDisambiguation |
| 133 | shared/quick-guide.tsx | QuickGuide |
| 134 | shared/rtl-provider.tsx | RTLProvider + useRTL |
| 135 | shared/scientific-shield.tsx | ScientificShield |
| 136 | shared/scroll-progress-bar.tsx | ScrollProgressBar |
| 137 | shared/scroll-progress.tsx | ScrollProgress |
| 138 | shared/source-pyramid.tsx | SourcePyramid |
| 139 | shared/success-tracker.tsx | SuccessTracker |
| 140 | shared/testimonials-marquee.tsx | TestimonialsMarquee |
| 141 | shared/theme-provider.tsx | ThemeProvider + useTheme, THEME_OPTIONS |
| 142 | shared/theory-card.tsx | TheoryCard |
| 143 | shared/verified-quotes-strip.tsx | VerifiedQuotesStrip |
| 144 | shared/visual-clarity-panel.tsx | VisualClarityPanel |
| 145 | six-layers/DefenseSection.tsx | DefenseSection |
| 146 | six-layers/FloatingNav.tsx | FloatingNav |
| 147 | six-layers/HeroSection.tsx | HeroSection |
| 148 | six-layers/Layer8Special.tsx | Layer8Special |
| 149 | six-layers/LayerSection.tsx | LayerSection, StandardLayerUI, CaseCard, AnimatedCounter, Layer7Special |
| 150 | six-layers/ParticleField.tsx | ParticleField |
| 151 | six-layers/Scene.tsx | Scene |
| 152 | six-layers/SceneCanvas.tsx | SceneCanvas |
| 153 | six-layers/ScrollContext.tsx | ScrollProvider + useScrollContext |

**Total files:** 51  
**Total features:** 66
