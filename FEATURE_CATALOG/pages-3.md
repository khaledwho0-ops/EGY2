# Pages & Routes — slice pages-3

Items 89–134 (46 files) of the ASCII-sorted `src/app/**/page.tsx` list.

---

## /platform-guide

- **Interactive Platform Guide** — A 13-section accordion guide that maps every tool on the platform to a structured, searchable learning path with bilingual (EN/AR) titles, estimated time per section, per-step links, and pro-tips.  _Use case:_ New users who want a structured starting point, or returning users who need to find a specific tool quickly.  (`src/app/platform-guide/page.tsx`)
- **Section Progress Tracking** — Persists opened/read sections and checked-off steps to localStorage so that guide completion survives page refreshes.  _Use case:_ Users who read the guide in multiple sessions and want to see how far they've come.  (`src/app/platform-guide/page.tsx`)
- **Searchable Section Filter** — Real-time keyword search over section titles, Arabic titles, tags, step text, and pro-tips to surface relevant content immediately.  _Use case:_ A user who remembers a tool name (e.g. "hadith") but not which section it is in.  (`src/app/platform-guide/page.tsx`)
- **Quick Start Card** — A 5-step speed-start strip (Assessment → Curriculum → Dashboard → Threat Map → Passport) for impatient or returning users who skip the full guide.  _Use case:_ First-session users who want to skip orientation and jump straight in.  (`src/app/platform-guide/page.tsx`)
- **Competition Demo Order** — Section 10 encodes the exact presentation sequence for NVIDIA/UGRF judges: Explore → AI Editor → Angry Debunkers → Swarm Debate → God System.  _Use case:_ Presenters rehearsing a demo for competition judges.  (`src/app/platform-guide/page.tsx`)

---

## /presentation

- **Presentation Deck Center** — Displays five downloadable presentation decks (Competition Pitch, Technical Architecture, Scientific Foundation, Islamic Tools Showcase, Impact Report) as interactive cards showing slides count, duration, size, and topics.  _Use case:_ Team members or judges who want a structured PDF/PPTX overview of the platform.  (`src/app/presentation/page.tsx`)
- **Deck Topic Expansion** — Clicking a card toggles a topic-chip panel listing the key sections covered in that deck.  _Use case:_ A presenter deciding which deck is most relevant for a given audience.  (`src/app/presentation/page.tsx`)
- **Deck Download Trigger** — Each card has a Download button that enters a shimmer loading state and simulates (or initiates) a PDF/PPTX download.  _Use case:_ Downloading decks ahead of a pitch meeting.  (`src/app/presentation/page.tsx`)

---

## /pricing-presentation

- **Pricing Package Slideshow** — A 3-slide full-screen RTL presentation (keyboard-navigable) showing Egyptian-pound-priced project tiers (Large 50k–70k EGP, Medium 30k–35k EGP, Small 15k–17k EGP) with feature bullet lists.  _Use case:_ Presenting a services/consulting pricing model to potential clients.  (`src/app/pricing-presentation/page.tsx`)
- **Revision Cost Slide** — Slide 2 lists additional-revision pricing (1,500 / 3,000 / 5,000 EGP for small/medium/large changes) alongside a 50/30/20% payment policy card and a layered bar chart.  _Use case:_ Setting client expectations around change requests.  (`src/app/pricing-presentation/page.tsx`)
- **Marketing Channels Slide** — Slide 3 outlines promotion channels (social media, content marketing, paid digital, referrals, webinars) and strategic partnerships (universities, TIEC, Greek Campus, consulting firms).  _Use case:_ Sharing a go-to-market slide with stakeholders.  (`src/app/pricing-presentation/page.tsx`)

---

## /project-vision

- **Vision Principles Cards** — Renders `PROJECT_VISION_PILLARS` data: named platform principles each with English and Arabic titles and summaries.  _Use case:_ Communicating the product philosophy to collaborators or evaluators.  (`src/app/project-vision/page.tsx`)
- **Egyptian Misinformation Pattern Map** — Renders `EGYPT_MISINFORMATION_PATTERNS`: named rumor behaviors that are specific to Egyptian social-media culture, each tied to a bias.  _Use case:_ Researchers or journalists understanding the local misinformation landscape the platform addresses.  (`src/app/project-vision/page.tsx`)
- **Cognitive Bias Map** — Renders `COGNITION_BIAS_MAP`: 14 biases each with Egyptian-specific pattern, why-it-matters, product-response, and peer-reviewed citation.  _Use case:_ Reviewers evaluating whether the platform's design decisions are evidence-based.  (`src/app/project-vision/page.tsx`)
- **Design Response Layers** — Renders `VISION_RESPONSE_LAYERS`: describes the UX/product interventions built to interrupt each misinformation pathway, with links to feature names.  _Use case:_ Product managers mapping platform features to research-backed design rationale.  (`src/app/project-vision/page.tsx`)
- **Verified Expert Quotes** — Pulls `deepreal`-lens quotes from the shared verified-quotes bank, displaying bilingual citation cards.  _Use case:_ Presenting scholarly backing for the platform's approach in reports or pitches.  (`src/app/project-vision/page.tsx`)

---

## /prompt-lab

- **Prompt Template Library** — Displays 5 pre-built fact-checking/OSINT prompt templates (Verify Image Context, Deepfake Detection Pass, Source Credibility Check, Reverse Search Strategy, Logical Fallacy Breakdown) each tagged with KEYHUNTER and category labels.  _Use case:_ Analysts who want ready-made prompts for AI-assisted fact-checking tasks.  (`src/app/prompt-lab/page.tsx`)
- **Category + Tag Filter** — Filters prompt cards by category (Fact-Checking, OSINT, Analysis, Debunking) and tag (KEYHUNTER, Deepfake, Metadata, Verification, Source Analysis).  _Use case:_ A user who needs only OSINT prompts for a specific task.  (`src/app/prompt-lab/page.tsx`)
- **One-Click Prompt Copy** — Copies prompt text to the clipboard with a visual "Copied!" confirmation that auto-resets after 2 seconds.  _Use case:_ Quickly pasting a verified prompt into an AI chat interface.  (`src/app/prompt-lab/page.tsx`)

---

## /publishing-plan

- **Publishing Phase Roadmap** — Renders `PUBLISHING_PHASES` data: a concrete post-program publishing path from GitHub through PWA, Android, iOS, to institutional partnerships, each phase anchor-linked in a top navigation strip.  _Use case:_ Team members planning the platform's release rollout.  (`src/app/publishing-plan/page.tsx`)
- **Non-Negotiable Guardrails** — Displays `PUBLISHING_GUARDRAILS_EN/AR`: bilingual list of deployment constraints that must not be bypassed in any publishing phase.  _Use case:_ Developers and QA ensuring compliance before each release milestone.  (`src/app/publishing-plan/page.tsx`)

---

## /reaction-test

- **Dual-System Reaction Speed Test** — A 24-headline test based on Dual-Process Theory: round 1 measures System 1 (fast, intuitive) correct-rate and reaction time; round 2 revisits the same headlines under deliberate System 2 analysis.  _Use case:_ Users benchmarking how vulnerable they are to fast-forward misinformation before slowing down to verify.  (`src/app/reaction-test/page.tsx`)
- **Real/Fake Headline Classification** — Randomized subset of 8 headlines from 24 real/fake pairs (health scares, financial panics, archaeological news, WhatsApp chain hoaxes) requiring True/False verdicts.  _Use case:_ Training users to distinguish credible news from manipulation patterns in an Egyptian context.  (`src/app/reaction-test/page.tsx`)
- **Reaction Time Measurement** — Records millisecond-accurate response time for each headline decision, then computes per-round averages for System 1 vs System 2 speed comparison.  _Use case:_ Tracking cognitive immunity improvement over time by comparing reaction speed and accuracy across sessions.  (`src/app/reaction-test/page.tsx`)

---

## /religion-hub/exercise/[day]

- **14-Day Islamic Exercise Program** — Dynamic route serving one of 14 JSON-validated daily exercises for the Religion Hub track, loaded via the shared `ExerciseEngine` component with COM-B metadata.  _Use case:_ Users following the daily religion-hub track who navigate to a specific day's exercise.  (`src/app/religion-hub/exercise/[day]/page.tsx`)
- **Exercise Completion Tracking** — On completion, calls `recordExerciseCompletion` (progress service) and `syncCurrentParticipantSnapshot` (research ops) to log progress and contribute to research telemetry.  _Use case:_ Platform ensuring user progress is persisted and research data is captured for outcome tracking.  (`src/app/religion-hub/exercise/[day]/page.tsx`)

---

## /religion-hub/maqasid

- **Maqasid al-Shariah Reasoning Tool** — Interactive 5-card selector for the five Islamic higher objectives (Din, Nafs, 'Aql, Nasl, Mal) with detailed description, scholarly basis (Al-Shatibi, Al-Ghazali), and example questions for each.  _Use case:_ Users testing whether a religious ruling or claim is compatible with Islamic higher objectives.  (`src/app/religion-hub/maqasid/page.tsx`)
- **Claim Maqasid Analysis** — Text input where users paste a claim; pressing analyze returns a compatibility verdict against the selected Maqsad with a Dar Al-Ifta / Al-Azhar cross-reference disclaimer.  _Use case:_ Evaluating the legitimacy of a fatwa or health directive that invokes Islamic reasoning.  (`src/app/religion-hub/maqasid/page.tsx`)

---

## /religion-hub (index)

- **Islamic Verification Hub Landing** — Dashboard linking to 9 tools (Hadith Checker, Fatwa Context, Quran Context, Sectarian Detector, Authority Verifier, Zakat Calculator, Mawarith, Halal Finance, Maqasid Check) with color-coded cards and stat counters (9 tools, 100 Islamic fallacies, 50 fundamentals, 8 hadith collections).  _Use case:_ Entry point for users who want to fact-check religious content from a single hub.  (`src/app/religion-hub/page.tsx`)
- **Quick Links: Daily Exercise, WhatsApp Checker, Quran Browser** — Three additional shortcut cards to the 14-day exercise, the WhatsApp religious message checker, and the live Quran browser.  _Use case:_ Returning users jumping directly to the tool they need.  (`src/app/religion-hub/page.tsx`)

---

## /religion-hub/quran

- **Live Quran Browser** — Fetches all 114 surahs from `api.quran.com/v4` with name, Arabic name, translation, verse count, and revelation place; supports search filtering.  _Use case:_ Users who want to read and browse the Quran with source provenance directly on the platform.  (`src/app/religion-hub/quran/page.tsx`)
- **Verse-by-Verse Reader** — On selecting a surah, fetches and renders verses in Uthmani script from the quran.com API.  _Use case:_ Verifying exact Quranic text when checking a quote's accuracy.  (`src/app/religion-hub/quran/page.tsx`)

---

## /religion-hub/tools/authority-verifier

- **Islamic Authority Credential Check** — Accepts a scholar or "sheikh" name, calls `/api/islamic/authority`, and returns a scored authority profile distinguishing real scholars from unqualified social-media figures.  _Use case:_ A user who received a religious ruling from an unknown "sheikh" on WhatsApp and wants to verify their credentials before acting on it.  (`src/app/religion-hub/tools/authority-verifier/page.tsx`)
- **Authority Score Visualization** — Color-coded credibility score (green ≥80, amber ≥50, red below) displayed with institutional badges and scholarly designations.  _Use case:_ Quickly communicating trust level in a form non-specialists can interpret.  (`src/app/religion-hub/tools/authority-verifier/page.tsx`)

---

## /religion-hub/tools/fatwa-context

- **Fatwa Context Analyzer** — Accepts pasted fatwa text, posts to `/api/islamic/fatwa-context`, and returns an analysis with scholarly context, issuing institution, historical period, and cross-references to Dar Al-Ifta.  _Use case:_ A user encountering an out-of-context fatwa on social media who wants to understand its original scope and applicability.  (`src/app/religion-hub/tools/fatwa-context/page.tsx`)

---

## /religion-hub/tools/hadith-check

- **Hadith Authenticity Classifier** — Input for Arabic or transliterated hadith text; calls the hadith API and returns Sahih / Hasan / Da'if / Mawdu' classification with confidence percentage, source book + number, narrator chain analysis (chain summary, weak links, grade), and multiple scholar opinions.  _Use case:_ Verifying a hadith before sharing it in a WhatsApp group or citing it in a sermon.  (`src/app/religion-hub/tools/hadith-check/page.tsx`)
- **Quick Example Hadiths** — Pre-loaded authentic and fabricated hadith examples with expected classification labels so users can learn the tool before submitting their own.  _Use case:_ New users orienting themselves to what authentic vs fabricated hadiths look like.  (`src/app/religion-hub/tools/hadith-check/page.tsx`)

---

## /religion-hub/tools/halal-finance

- **Shariah Finance Compliance Checker** — Text field accepting a description of a financial product; calls `/api/islamic/finance` and returns a compliance verdict (halal/haram/uncertain), confidence score, explanation, and list of specific issues (riba, gharar, maysir).  _Use case:_ A user evaluating whether a "Islamic mortgage" or investment product is genuinely Shariah-compliant.  (`src/app/religion-hub/tools/halal-finance/page.tsx`)

---

## /religion-hub/tools/mawarith

- **Islamic Inheritance Calculator** — Form accepting estate value, deceased's gender, number of spouses, sons, daughters, and parents' survival status; computes exact share amounts and fractions per Quran 4:11-12 rules for each heir.  _Use case:_ Families calculating fair inheritance distribution after a death, avoiding disputes from incorrect shares.  (`src/app/religion-hub/tools/mawarith/page.tsx`)
- **Heir Share Breakdown Table** — Renders a per-heir table showing fraction (e.g. 1/8), calculated EGP amount, and percentage of estate.  _Use case:_ Making inheritance amounts concrete and auditable for family members.  (`src/app/religion-hub/tools/mawarith/page.tsx`)

---

## /religion-hub/tools (index)

- **Religious Verification Tools Landing** — CSS geometric-pattern landing page listing active tools (Hadith Authenticity Checker, Maqasid Reasoning Tool) with full bilingual descriptions and status badges (active/coming-soon).  _Use case:_ Users arriving at the tools section who want an overview before choosing which tool to use.  (`src/app/religion-hub/tools/page.tsx`)

---

## /religion-hub/tools/quran-context

- **Quranic Verse Context Lookup** — Accepts a Surah:Ayah reference (e.g. 2:255), fetches the Uthmani text + English translation and Al-Jalalayn tafsir from the internal API, and checks abrogation status via local nasikh-mansukh data.  _Use case:_ Verifying that a Quranic verse is quoted accurately and in proper context when encountered in religious content.  (`src/app/religion-hub/tools/quran-context/page.tsx`)

---

## /religion-hub/tools/sectarian-detector

- **Sectarian Manipulation Detector** — Pastes Arabic or English text into a field, posts to `/api/islamic/sectarian`, and returns a risk level (low/medium/high), explanation, and flags for takfir rhetoric, political instrumentalization, and sectarian framing.  _Use case:_ Identifying whether forwarded religious content is designed to stoke inter-sectarian division before sharing it.  (`src/app/religion-hub/tools/sectarian-detector/page.tsx`)

---

## /religion-hub/tools/zakat-calculator

- **Multi-Asset Zakat Calculator** — Tabbed calculator covering Cash, Gold (24k/21k/18k purity), Silver, and Business assets; computes zakat at 2.5% above nisab thresholds using AAOIFI standards with Egyptian pound gold/silver market prices.  _Use case:_ Muslims calculating their annual zakat obligation accurately across multiple asset types.  (`src/app/religion-hub/tools/zakat-calculator/page.tsx`)
- **Nisab Eligibility Display** — Shows whether the user's total eligible assets exceed the nisab threshold (gold or silver basis) and the exact zakat amount owed per asset category.  _Use case:_ Determining whether zakat is obligatory this year and how much to pay.  (`src/app/religion-hub/tools/zakat-calculator/page.tsx`)

---

## /religion-hub/whatsapp

- **WhatsApp Religious Message Checker** — Accepts pasted message text and uses keyword pattern detection to classify it as hadith-requiring-verification, fatwa-needing-context, sectarian-alert, or fabricated-claim; provides a detailed checklist response and a ready-made bilingual reply message.  _Use case:_ A user who received a forwarded religious WhatsApp message and wants a quick verdict plus a polite, informed response to send back.  (`src/app/religion-hub/whatsapp/page.tsx`)

---

## /report/[token]

- **Shared Awareness Report Viewer** — Deserializes a URL-embedded base64 token into a full awareness report; handles expired, tampered, or invalid tokens with clear error states; renders the report in the holder's preferred language (EN/AR).  _Use case:_ A user sharing their awareness report with a friend, coach, or researcher via a single URL.  (`src/app/report/[token]/page.tsx`)

---

## /report (index)

- **Awareness Report Information Page** — Landing page explaining what the personalized awareness report contains (misinformation resilience, mental health literacy, religious coping growth), privacy protections, and how to generate one.  _Use case:_ Users who completed exercises and want to understand what their report will say before generating it.  (`src/app/report/page.tsx`)

---

## /reverse

- **Manipulation Reverse-Engineering Hub** — Presents a `BranchingVisualExperience` component and three `ModuleCommandCenter` panels (deepreal, mental-health, religion-hub each in "reverse" tab mode) for deconstructing manipulation across three domains.  _Use case:_ Advanced users who want to understand how misinformation campaigns, mental-health exploitation, and religious coercion are architecturally built.  (`src/app/reverse/page.tsx`)
- **Cross-Domain Manipulation Deconstruction** — Each domain panel reveals the tactic chain: DeepReal (rumors, edited clips), Mental Health (identity capture, stigma loops), Religion Hub (moderation disappearance, coercion entry points).  _Use case:_ Educators and researchers building curricula around the mechanics of manipulation.  (`src/app/reverse/page.tsx`)

---

## /rumor-heatmap

- **SIR Epidemic Rumor Simulator** — Interactive epidemiological model (Susceptible–Infected–Recovered) where users set R0 (virality), belief-duration in days, and inoculation fraction; renders an SVG line chart of all three curves over 60 days.  _Use case:_ Illustrating how prebunking/inoculation creates herd immunity against a rumor before it peaks.  (`src/app/rumor-heatmap/page.tsx`)
- **Herd Immunity Calculator** — Computes and displays the minimum inoculation percentage needed for Reff < 1, the effective reproduction number, and peak infection day.  _Use case:_ Policy discussions about how many people need inoculation training to prevent a misinformation outbreak.  (`src/app/rumor-heatmap/page.tsx`)

---

## /science

- **Science Hub Landing** — Assembles the `EvidenceCommandBoard`, `ScientificIntelligenceCenter`, `ScienceExerciseTracker`, and `ToolGuide` components into a single hub for scientific literacy.  _Use case:_ Entry point for users pursuing the science literacy track of the curriculum.  (`src/app/science/page.tsx`)
- **Exercise Tracker Scroll-Jump** — "Jump to tracker" button smoothly scrolls to the `#exercise-tracker` element and briefly pulses it, guiding zero-knowledge users to the action item.  _Use case:_ Onboarding new users to the correct starting point within the hub.  (`src/app/science/page.tsx`)

---

## /self-test-protocol

- **Research Protocol Spec Viewer** — Renders `RESEARCH_PROTOCOL`, `EVALUATION_PROTOCOL`, `FALSIFIABLE_HYPOTHESES`, `MEASUREMENT_SCHEDULE`, `SAMPLING_STRATEGY`, and `SUCCESS_CRITERIA` from structured data — the full psychometric measurement plan.  _Use case:_ Researchers and evaluators reviewing the platform's evidence-collection methodology.  (`src/app/self-test-protocol/page.tsx`)
- **Instrument Readiness Board** — Displays `INSTRUMENT_READINESS` entries with color-coded badges (Ready/Blocked/Pending) per psychometric instrument.  _Use case:_ QA team checking which assessment instruments are deployment-ready.  (`src/app/self-test-protocol/page.tsx`)
- **Self-Test Pillars & Risks** — Renders `SELF_TEST_PILLARS` (what the protocol measures) and `SELF_TEST_RISKS` (methodological threats and mitigations).  _Use case:_ Academic partners scrutinizing the measurement framework's validity and reliability safeguards.  (`src/app/self-test-protocol/page.tsx`)

---

## /six-layers

- **6-Layer Scrollytelling Experience** — Assembles a 3D particle `Scene` (fixed background), scroll-driven `HeroSection`, one `LayerSection` per layer from `LAYERS` data, a `DefenseSection`, and a `FloatingNav` that tracks scroll progress.  _Use case:_ Immersive introduction to the ADDIE-extended pedagogical architecture for new users or competition judges.  (`src/app/six-layers/page.tsx`)
- **Scroll + Mouse Tracking** — Normalizes `window.scrollY` (0–1 progress) and mouse coordinates (–1 to 1 range) and feeds them to `ScrollContext` for 3D scene interactivity.  _Use case:_ Making the 3D background scene responsive to the user's scroll position and cursor movement.  (`src/app/six-layers/page.tsx`)

---

## /sources

- **Comprehensive Source Registry** — Renders `TRUSTED_SOURCES` through the `SourceRegistry` component, organized into 6 categories: Cognitive Science, Islamic Scholarly Sources, Egyptian Data & Statistics, Verification & Fact-Checking, AI & Technology APIs, Medical & Mental Health.  _Use case:_ Transparency — any user or auditor who wants to know where every platform claim originates.  (`src/app/sources/page.tsx`)
- **Full Source Map with Feature Mappings** — An in-page `FULL_SOURCE_MAP` lists each source alongside the exact platform features that use it and how it is applied.  _Use case:_ Demonstrating One-Law compliance by tracing every claim to a real, named source.  (`src/app/sources/page.tsx`)
- **Evidence Search Panel** — Embeds `EvidenceSearch` and `SupportDirectoryPanel` components for live cross-source evidence lookup.  _Use case:_ Users who want to verify a claim against multiple trusted source databases directly from the sources page.  (`src/app/sources/page.tsx`)

---

## /sovo

- **SOVO Parallel-Engine Orchestrator** — Accepts a claim text, calls `/api/sovo/analyze`, and runs 6 verification engines (Sentiment Analyzer, Fallacy Detector, Bias Scanner, Source Verifier, OSINT Investigator, Digital Forensics) with staggered activation animations; returns a unified AI verdict.  _Use case:_ Users who want the most comprehensive single-call fact-check available on the platform.  (`src/app/sovo/page.tsx`)
- **Engine Activation Visualization** — Each engine activates with a 400ms stagger animation so users can watch all 6 engines engage sequentially, and a neutral tick replaces fabricated confidence scores (One-Law compliance).  _Use case:_ Competition demonstrations showing AI multi-engine orchestration in action.  (`src/app/sovo/page.tsx`)

---

## /stat-power

- **Statistical Power Calculator** — Computes power (probability of detecting a true effect) for independent or paired t-tests given Cohen's d effect size, N per group, alpha level (0.01/0.05/0.10), and one-/two-tails; uses a polynomial approximation of the normal CDF.  _Use case:_ Users evaluating whether a study they read had adequate power to detect the claimed effect, exposing underpowered "headline studies".  (`src/app/stat-power/page.tsx`)
- **Required Sample Size Estimator** — Computes the N needed to achieve 80% power for the given effect size and alpha, surfacing the gap between reported and required sample sizes.  _Use case:_ Researchers and science-literate users checking if a study's sample size was sufficient.  (`src/app/stat-power/page.tsx`)

---

## /supervisor

- **Supervisor Cohort Dashboard** — Displays a 10-student demo roster with curriculum-day, progress%, score%, at-risk flag, and streak; supports sort by name/progress/score and date-range filters (7d/30d/90d/all).  _Use case:_ Teachers, supervisors, or institutional administrators monitoring a student cohort through the 144-day program.  (`src/app/supervisor/page.tsx`)
- **Platform Metrics Overview** — Six KPI cards: average score (70.8%), completion rate (72%), at-risk count (3/10), SCORM compliance (96.4%), xAPI events/day (2,847), average session time (34 min).  _Use case:_ Institutional buyers or program managers reviewing overall platform effectiveness.  (`src/app/supervisor/page.tsx`)
- **SCORM/xAPI Telemetry Indicators** — Displays SCORM compliance percentage and xAPI event rate to signal LMS-integration readiness.  _Use case:_ EdTech decision-makers evaluating whether the platform can integrate into an existing LMS.  (`src/app/supervisor/page.tsx`)
- **Export Menu** — A dropdown export button (not yet wired to real data) scaffolds CSV/PDF report exports for institutional reporting.  _Use case:_ Supervisors who need to submit compliance or progress reports to their institution.  (`src/app/supervisor/page.tsx`)

---

## /swarm-debate

- **Swarm Debate vs 5 AI Archetypes** — Users choose one of 5 manipulation archetypes (Ad-Hominem Attacker, Cherry-Picker, False Authority, Conspiracy Framer, Deepfake Skeptic), enter a claim, and receive an AI counter-argument that uses that archetype's tactic; they must rewrite a rebuttal that names the fallacy.  _Use case:_ Advanced users who want to practice argumentation against the most common manipulation styles encountered on Egyptian social media.  (`src/app/swarm-debate/page.tsx`)
- **Fallacy Identification Scoring** — After submitting a rebuttal, the UI reveals which fallacy the AI used and whether the user's text named it; a round-result record is accumulated for final session scoring.  _Use case:_ Training users to explicitly name the fallacy as the most effective debunking technique.  (`src/app/swarm-debate/page.tsx`)
- **Archetype Strategy Cards** — Each archetype card shows name, badge, color, manipulation style, and the recommended counter-strategy, available before entering the debate.  _Use case:_ Helping users prepare the correct counter-technique for each archetype before encountering it live.  (`src/app/swarm-debate/page.tsx`)

---

## /the-descent

- **The Descent Scrollytelling Gateway** — Entry point for the platform's flagship cinematic scrollytelling experience; wraps `DescentExperience` in `ScrollProvider` using native document scroll (Lenis removed to prevent blank-page freeze caused by broken ScrollTrigger bridge).  _Use case:_ First-time visitors experiencing the platform's narrative introduction to misinformation and cognitive defense.  (`src/app/the-descent/page.tsx`)

---

## /threat-briefing

- **Daily Egyptian Threat Briefing** — Fetches live fact-checks from Google Fact Check API across 6 Egypt-relevant topic categories (health, economy, politics, religion, science, food safety), classifies each claim as high/medium/low threat, and presents them with source links.  _Use case:_ Users checking the morning misinformation landscape for Egypt before starting their day.  (`src/app/threat-briefing/page.tsx`)
- **Today's Focus & Exercise Recommendation** — Rotates through 7 daily focus topics (health misinformation, political polarization, religious exploitation, etc.) and links the day's recommended exercise and curriculum track.  _Use case:_ Connecting threat intelligence to the learning curriculum so users address the most relevant threat each day.  (`src/app/threat-briefing/page.tsx`)
- **Threat Level Category Filter** — Filters the briefing feed by threat level (all/high/medium/low) and topic category for targeted review.  _Use case:_ A user who only wants to read high-threat health-related items.  (`src/app/threat-briefing/page.tsx`)

---

## /threat-map

- **Patient Zero Network Graph** — Renders the `ThreatMap` component showing a network-graph visualization of Egyptian misinformation propagation patterns with a user-supplied claim as the seed node.  _Use case:_ UGRF competition feature demonstrating real-time misinformation spread topology.  (`src/app/threat-map/page.tsx`)

---

## /tools-download

- **Python Tool Script Downloads** — Lists three downloadable Python scripts: `bot_hunter.py` (social-media bot pattern detection), `ela_analyzer.py` (offline Error Level Analysis for image manipulation), `pdf_metadata.py` (hidden PDF metadata extraction).  _Use case:_ Power users and OSINT investigators who want offline/command-line tools to complement the web platform.  (`src/app/tools-download/page.tsx`)
- **Download State Tracking** — Marks each script as downloaded in component state with a visual tick so users know which tools they have already saved.  _Use case:_ Users downloading multiple scripts who want to avoid re-downloading.  (`src/app/tools-download/page.tsx`)

---

## /trailer

- **Cinematic Trailer Prompt Center** — Renders `TRAILER_SCENES` data as cards: 5 film scenes each with visual language, sound design spec, positive cinematography prompts, and dialogue, navigable via anchor-linked top strip.  _Use case:_ Content creators or competition teams using AI video tools to produce a trailer for the platform.  (`src/app/trailer/page.tsx`)
- **Negative Prompt Bank** — Renders `TRAILER_MASTER_NEGATIVE_PROMPTS_AR/EN`: a shared bilingual list of image/video generation constraints to prevent undesirable outputs (e.g. stock-photo aesthetics).  _Use case:_ Ensuring consistent visual quality by excluding generic or low-quality generated imagery.  (`src/app/trailer/page.tsx`)

---

## /transformation

- **Before/After Behavior Transformation Viewer** — Displays 6+ scenario cards across three tracks (DeepReal, Mental Health, Religion Hub), each showing a Day-1 vs Day-14 response and behavior chain and the skill learned.  _Use case:_ Demonstrating measurable cognitive change to users, supporters, or competition judges as proof the platform works.  (`src/app/transformation/page.tsx`)
- **Track-Filtered Scenario View** — Scenarios are color-coded by track and can be filtered to show only the user's completed track.  _Use case:_ A user who only completed the mental-health track reviewing their specific transformation.  (`src/app/transformation/page.tsx`)

---

## /trend-hunter

- **Live Google Trends Egypt Feed** — Fetches `/api/hunter/trends` (Google Trends RSS geo=EG) and renders current Egyptian trending topics with traffic estimate and publication date.  _Use case:_ Real-time monitoring of what topics are trending in Egypt, providing context for emerging misinformation claims.  (`src/app/trend-hunter/page.tsx`)
- **Debunked Claims Kill-List** — Fetches `/api/kill-list` and renders documented, dated debunked claims with threat-level badges (Critical/High/Medium/Low), bilingual title/claim/fact, and source attribution.  _Use case:_ Cross-referencing a trending topic against known debunked claims to see if a current trend is recycling old misinformation.  (`src/app/trend-hunter/page.tsx`)
- **Threat Level Filter** — Filters the kill-list by severity level to surface only critical or high-threat claims.  _Use case:_ Triage — focusing limited attention on the most dangerous active claims.  (`src/app/trend-hunter/page.tsx`)

---

## /ux-science

- **30 UX Persuasion Hooks Catalog** — An annotated catalog of 30 behavioral-psychology hooks used in the platform's UI (Variable Reward, Streak Maintenance, Endowed Progress, Zeigarnik Effect, etc.) each with category tags, icon, and bilingual explanation.  _Use case:_ Transparency about the platform's engagement design, or educators studying ethical persuasive design.  (`src/app/ux-science/page.tsx`)
- **Category Filter for Hooks** — Filters hooks by behavioral category (Attention, Reward, Habit, Progress, Social, Persuasion, Friction, Retention).  _Use case:_ UX researchers examining how specific behavioral mechanisms are implemented across the platform.  (`src/app/ux-science/page.tsx`)

---

## /verify/[id]

- **Public Certificate Verifier** — Dynamic route that fetches a certificate record from `/api/certificate/generate?id=<uuid>` and displays holder name, credential title, issue date, score band, tamper hash, and verified/revoked status; supports optional `?name=` anti-impersonation check.  _Use case:_ Anyone (employer, partner, competition judge) verifying the authenticity of a user's EAL completion certificate.  (`src/app/verify/[id]/page.tsx`)
- **Tamper Detection Display** — Shows `tamperState` and `tamperHash` fields; surfaces "verification failed" if the signature does not match, turning the credential into a real trust signal rather than theatre.  _Use case:_ Detecting forged or modified certificates presented by bad actors.  (`src/app/verify/[id]/page.tsx`)

---

## /welcome

- **Platform Welcome & Orientation** — Animated hero section with floating particles, platform stats (123+ pages, 80+ API routes, 144-day curriculum, 8 AI engines), and 5 feature highlight cards (Curriculum, Defense Tools, Islamic Hub, Science Engine, AI Power).  _Use case:_ First-time visitors getting a concise, visually compelling overview of what the platform offers before signing up.  (`src/app/welcome/page.tsx`)

---

## /whatsapp-analyzer

- **WhatsApp Forwarded Message Analyzer** — Accepts pasted message text, calls `/api/whatsapp-analyzer`, and returns a manipulation probability score, detected bot patterns, emotional framing signals, and urgency indicators.  _Use case:_ Users who received a suspicious forwarded WhatsApp message and want an AI verdict on whether it is organic or coordinated disinformation.  (`src/app/whatsapp-analyzer/page.tsx`)
- **Bilingual Analysis Toggle** — EN/AR language toggle that switches both the UI and the analysis request context for Arabic-language messages.  _Use case:_ Arabic-speaking users analyzing Arabic-language messages with full NLP context.  (`src/app/whatsapp-analyzer/page.tsx`)

---

## /why-us

- **Competitive Differentiation Page** — Animated counter-based stat display with sourced problem-severity data (e.g. 87% of Egyptians encounter health misinformation weekly — WHO Egypt 2022) alongside platform advantage claims.  _Use case:_ Convincing potential users, funders, or competition judges why this platform is superior to generic fact-checking alternatives.  (`src/app/why-us/page.tsx`)

---

## /womens-shield

- **Women's Manipulation Pattern Detector** — Accepts pasted text and pattern-matches against 4+ manipulation categories (Gaslighting, Guilt-Tripping, Isolation Attempt, Intimidation/Coercion) using bilingual keyword lists; returns matched patterns with severity and description.  _Use case:_ Women identifying whether content they received exhibits psychological manipulation tactics targeting them specifically.  (`src/app/womens-shield/page.tsx`)
- **Ready-Made Safety Response Scripts** — Provides bilingual suggested responses to each manipulation pattern so users have language prepared for confronting or deflecting the tactic.  _Use case:_ A woman who identified gaslighting and needs a calm, assertive reply.  (`src/app/womens-shield/page.tsx`)
