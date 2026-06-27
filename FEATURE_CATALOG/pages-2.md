# Pages & Routes — slice pages-2

Covers items 45–88 (1-based, inclusive) of the ASCII-sorted `src/app/**/page.tsx` list.
Total files covered: **44**

---

## /drug-checker

- **Multi-database medication search** — Queries OpenFDA adverse events, DailyMed official labels, and RxNorm clinical names in parallel for any drug name entered by the user. _Use case:_ An Egyptian user wants to verify safety information about a medication before taking it or before forwarding a WhatsApp health claim. (`src/app/drug-checker/page.tsx`)
- **OpenFDA adverse-event display** — Shows FDA-reported adverse events with seriousness classification (SERIOUS / NON-SERIOUS), patient demographics, and reaction tags. _Use case:_ A user checks whether a popular Egyptian OTC drug has reported dangerous side effects in the FDA database. (`src/app/drug-checker/page.tsx`)
- **DailyMed label viewer** — Lists official NLM DailyMed drug labels with title, publish date, and a deep-link to the full label. _Use case:_ A pharmacist or patient needs the current approved prescribing information. (`src/app/drug-checker/page.tsx`)
- **RxNorm clinical-name lookup** — Returns standardised RxNorm concept names, synonyms, and RXCUI identifiers. _Use case:_ Resolving brand-name Egyptian drug variants (Adol, Panadol) to their RxNorm canonical concept. (`src/app/drug-checker/page.tsx`)
- **Egyptian pharmaceutical context panel** — Static educational panel citing WHO Egypt 2022 statistics about unregulated OTC sales, Tramadol misuse, and antibiotic resistance rankings. _Use case:_ Contextualises why drug verification matters specifically in Egypt. (`src/app/drug-checker/page.tsx`)
- **Quick-search preset buttons** — Pre-populated buttons for 8 common Egyptian medications (Paracetamol, Ibuprofen, Amoxicillin, Metformin, Omeprazole, Fluoxetine, Sertraline, Tramadol). _Use case:_ Lets first-time users explore without typing. (`src/app/drug-checker/page.tsx`)
- **Page AI chatbot (Drug Safety)** — Embedded AI assistant with Egypt-specific system prompt covering antibiotic myths, Islamic medicine (black seed, honey), and EDA-approved drug lists. _Use case:_ User asks follow-up questions about a drug after reviewing database results. (`src/app/drug-checker/page.tsx`)

---

## /effect-dashboard

- **Research effect-size forest plot** — Renders an SVG forest plot of six literature-based design-target Cohen's d values (MIST-20, MHLS, Brief RCOPE, Inoculation Confidence, Digital Literacy) with 95% CI bars. Admin-only gate; shows design targets, not collected data. _Use case:_ A researcher or admin reviews the study's statistical power and expected effect sizes before data collection begins. (`src/app/effect-dashboard/page.tsx`)
- **Hypothesis matrix table** — Tabular view of all six hypotheses with pre/post score slots (currently "TBD"), target d, p-value, and significance markers; Bonferroni-corrected alpha shown. _Use case:_ Academic reviewers verify the research design is pre-registered and honest about what data has (not) been collected. (`src/app/effect-dashboard/page.tsx`)
- **Power analysis progress bar** — Calculates and displays estimated statistical power relative to the N=84 target cohort, warning when underpowered. _Use case:_ Admin monitors recruitment progress toward the minimum sample needed for medium-effect detection. (`src/app/effect-dashboard/page.tsx`)
- **Design-target honesty banner** — Prominent amber alert declaring all d values are literature-based hypotheses, not collected findings, enforcing the EAL One-Law no-fabrication standard. _Use case:_ Prevents misreading of design targets as real results. (`src/app/effect-dashboard/page.tsx`)
- **Live assessment data fetch** — Polls `/api/assessment` on mount; will switch dashboard from "design-target" mode to real measured effect sizes once a cohort is available. _Use case:_ After data collection begins, the dashboard automatically computes live Cohen's d from pre/post assessment scores. (`src/app/effect-dashboard/page.tsx`)

---

## /engines-guide

- **AI engines accordion directory** — Expandable accordion listing 8 AI verification engines (DeepReal, Mental Health Shield, Religion Hub, SOVO Orchestration, Sentiment/Emotion Analyzer, Cognitive Bias Detector, Digital Forensics, OSINT) with purpose, status, input/output spec, and use-case list. _Use case:_ A new user or contributor understands which engine handles which kind of misinformation claim. (`src/app/engines-guide/page.tsx`)
- **Engine search filter** — Full-text search over engine names and purpose descriptions, narrowing the accordion list in real time. _Use case:_ Developer looking for the engine that handles Arabic NLP finds "Sentiment & Emotion Analyzer" by searching "Arabic". (`src/app/engines-guide/page.tsx`)
- **Operational-status badges** — Each engine card carries a colour-coded badge: Operational, Partial, or Prototype, with honest notes that accuracy figures are not independently benchmarked. _Use case:_ Stakeholders assess production readiness without misleading claims. (`src/app/engines-guide/page.tsx`)
- **Model/provider metadata tiles** — Per-engine metric cards showing primary AI model, latency estimate, and validation status. _Use case:_ A journalist writing about the platform verifies which AI providers power each tool. (`src/app/engines-guide/page.tsx`)
- **"Open this engine" deep-link** — Each accordion footer links directly to the engine's live route. _Use case:_ Immediate navigation from reference documentation to live tool. (`src/app/engines-guide/page.tsx`)

---

## /epistemology

- **Three-tab epistemology comparison** — Side-by-side tabs for Scientific Method, Islamic Usul (Hadith science / Usul al-Fiqh), and Logical Proof (Aristotelian), each showing canonical steps and EAL applied-links. _Use case:_ A student learning critical thinking understands how three knowledge traditions verify truth using parallel methodologies. (`src/app/epistemology/page.tsx`)
- **Evidence pyramid visualiser** — Renders the EVIDENCE_PYRAMID data in a stacked visual from anecdote (weakest) to meta-analysis (strongest) with colour coding. _Use case:_ User learning to assess a health claim understands why a single case story is weaker than a Cochrane review. (`src/app/epistemology/page.tsx`)
- **Islamic Sanad / Rijal methodology steps** — Lists the 6-step hadith authentication process (Sanad verification, Rijal grading, Matn analysis, Asbab al-Nuzul, Nasikh & Mansukh, Qiyas & Ijma) with explanations. _Use case:_ A Muslim user learns to apply the same chain-of-custody logic used by hadith scholars to evaluate modern claims. (`src/app/epistemology/page.tsx`)
- **Scientific guidelines panel** — Shows up to 5 entries from SCIENTIFIC_GUIDELINES (e.g. falsifiability, correlation ≠ causation) with links to live EAL tools that implement each principle. _Use case:_ A teacher assigns specific tools to each epistemological principle. (`src/app/epistemology/page.tsx`)
- **Applied-in-EAL cross-links** — Each panel includes deep-links to the exact EAL tool that operationalises the principle (e.g., Epistemology → Hadith Check, stat-power → Science Lab). _Use case:_ Learner immediately practises the abstract principle in a live tool. (`src/app/epistemology/page.tsx`)

---

## /evidence-search

- **Evidence Aggregator Panel (thin wrapper)** — Mounts the `EvidenceAggregatorPanel` component with RTL-aware direction; the full search UI lives inside the shared component. _Use case:_ A secondary entry point to the evidence search engine; same functionality as /evidence but via a clean thin route. (`src/app/evidence-search/page.tsx`)

---

## /evidence

- **7-source academic search** — Queries OpenAlex, Semantic Scholar, Europe PMC, DOAJ, Crossref, arXiv, and CORE simultaneously via `/api/search/evidence`; returns paginated, relevance-ranked scholarly results. _Use case:_ User verifying whether "garlic cures cancer" finds (or doesn't find) supporting RCTs in the global literature. (`src/app/evidence/page.tsx`)
- **Trust-band scoring** — Each result card displays a Band A / B / C trust label based on peer-review status, open-access flag, and citation count, explained in a sidebar legend. _Use case:_ Non-expert user can tell at a glance whether evidence is high-quality peer-reviewed (A) or a speculative preprint (C). (`src/app/evidence/page.tsx`)
- **Source filter sidebar** — Checkbox list to enable/disable individual academic databases, with Select All / Clear All buttons. _Use case:_ Researcher focused on biomedical evidence deselects arXiv and CORE to filter to Europe PMC. (`src/app/evidence/page.tsx`)
- **Open-Access filter toggle** — One-click filter to show only freely readable full-text papers. _Use case:_ User in Egypt without institutional access filters to papers they can actually read. (`src/app/evidence/page.tsx`)
- **Sort controls (relevance / year)** — Dropdown to re-sort results by relevance (API score), newest first, or oldest first. _Use case:_ Researcher wants to see the most recent literature on a topic. (`src/app/evidence/page.tsx`)
- **Search history (localStorage)** — Persists last 5 searches locally; shown as clickable chips before first search. _Use case:_ User returns to continue research without retyping the same query. (`src/app/evidence/page.tsx`)
- **Suggested quick searches** — Five pre-set controversial topic buttons (mRNA vaccines, climate change, etc.) shown on the empty state. _Use case:_ Onboarding users explore the tool without a specific claim in mind. (`src/app/evidence/page.tsx`)
- **Page AI chatbot (Evidence Pyramid)** — Embedded AI with full evidence-hierarchy system prompt covering the 7 pyramid levels, GRADE framework, and Egyptian journal context. _Use case:_ User asks what a confidence interval means after seeing a result. (`src/app/evidence/page.tsx`)
- **Tool usage guide (ToolGuide component)** — Bilingual step-by-step guide with 4 worked scenarios (garlic/cancer, lemon/chemo, fasting/diabetes, vaccines/autism). _Use case:_ First-time user understands how to formulate a search query and interpret results. (`src/app/evidence/page.tsx`)

---

## /explore

- **Full platform directory (categorised)** — Lists all major EAL tools grouped into categories: Cognitive Immunity Curriculum, Live Defense Tools, Digital Media Forensics (partial read), with tool names, method tags, and descriptions. _Use case:_ A new user discovers which tools exist and navigates to the one matching their task. (`src/app/explore/page.tsx`)
- **Method/instrument tag per tool** — Each tool entry shows the academic methodology it implements (e.g. "FLICC taxonomy (Cook)", "SIFT methodology", "dual-process (Kahneman) drills"). _Use case:_ An educator verifies which tools are backed by validated educational frameworks. (`src/app/explore/page.tsx`)
- **"isNew" badge** — Certain tools are flagged as new (Live Deception feed simulator, Kill List). _Use case:_ Returning users spot recently added capabilities. (`src/app/explore/page.tsx`)

---

## /fallacy-engine

- **5-category fallacy taxonomy display** — Presents Formal, Informal, Statistical, Rhetorical, and Religious Exploitation fallacies, each with Egyptian-specific examples and Arabic translations. _Use case:_ A student identifies that a TV health claim uses "survivorship bias" rather than a personal attack. (`src/app/fallacy-engine/page.tsx`)
- **AI fallacy analyser** — Posts user-submitted text to an AI backend (via AnalysisProgress stages) for FLICC-taxonomy classification. _Use case:_ User pastes a WhatsApp health message and gets back which fallacy category it belongs to. (`src/app/fallacy-engine/page.tsx`)
- **Concept explainer (ConceptExplainer component)** — Inline educational pop-overs explaining individual fallacy types. _Use case:_ Student reads "affirming the consequent" and clicks for a quick definition without leaving the page. (`src/app/fallacy-engine/page.tsx`)

---

## /family-kit

- **5-question quick-check card deck** — Five yes/no questions (source? date/author? Google searched? emotional reaction? would you bet on it?) for rapidly evaluating any forwarded message. _Use case:_ A family member can run the checklist on a suspicious WhatsApp forward in under 30 seconds. (`src/app/family-kit/page.tsx`)
- **WhatsApp reply templates** — Pre-written bilingual (EN/EG Arabic) template messages for 5 situations: health misinformation, political rumours, misattributed religious quotes, scams, and general fake news. _Use case:_ User needs a polite, non-confrontational way to respond to a parent who shared fake health news. (`src/app/family-kit/page.tsx`)
- **Copy-to-clipboard template action** — Each template has a copy button for immediate pasting into WhatsApp. _Use case:_ One-click copy of a culturally appropriate counter-message. (`src/app/family-kit/page.tsx`)

---

## /features

- **Full platform feature catalogue (7 categories)** — Grid of all EAL features organised into: Defense Arsenal, Cognitive Training, Islamic Intelligence, Science & Evidence, AI-Powered Tools, Personal Dashboard, Community. Each card links to its route. _Use case:_ Product demo or investor overview of the platform's full scope. (`src/app/features/page.tsx`)
- **Category filtering / navigation** — Category-based navigation tabs to jump between feature clusters. _Use case:_ A user interested only in Islamic tools browses the Islamic Intelligence section. (`src/app/features/page.tsx`)
- **Feature metadata (title, Arabic, description, icon, href)** — Every feature entry is bilingual with a Lucide icon and direct navigation link. _Use case:_ Accessibility and i18n: Arabic speakers read the Arabic feature names. (`src/app/features/page.tsx`)

---

## /fight-back

- **Counter-narrative toolkit (searchable)** — Full-text searchable library of logical fallacies, cognitive biases, and religious manipulation patterns, each with bilingual name, description, and counter-argument. _Use case:_ After identifying a fallacy in a conversation, user looks up the specific rebuttal strategy. (`src/app/fight-back/page.tsx`)
- **Three-tab category filter** — Separate tabs for Logical Fallacies, Cognitive Biases, and Religious Manipulation, with item counts. _Use case:_ A debater targeting specifically religious manipulation tactics filters to that category. (`src/app/fight-back/page.tsx`)
- **Expandable entry cards** — Each entry expands to show the full description and counter-argument for that fallacy or bias. _Use case:_ User reads the full explanation before using it in a conversation. (`src/app/fight-back/page.tsx`)
- **Page AI chatbot** — Embedded AI assistant for the counter-narrative toolkit. _Use case:_ User asks the AI to help draft a response using a specific counter-argument. (`src/app/fight-back/page.tsx`)

---

## /forensic-c2pa

- **C2PA technical explainer (4 layers)** — Educational sections on digital signatures (X.509), JUMBF container format, provenance chain-of-custody, and AI generation disclosure requirements with bilingual detail. _Use case:_ A journalist or media-literacy educator learns how Content Credentials work before running the checker. (`src/app/forensic-c2pa/page.tsx`)
- **Illustrative Egyptian case studies** — Scenario-based examples of how C2PA can expose manipulated news photos circulating in Egypt. _Use case:_ Educator uses the examples to teach provenance analysis in a media-literacy workshop. (`src/app/forensic-c2pa/page.tsx`)
- **Page AI chatbot (C2PA)** — Embedded AI assistant for C2PA provenance questions. _Use case:_ User asks whether a specific news site's photos carry C2PA manifests. (`src/app/forensic-c2pa/page.tsx`)

---

## /forensic-image

- **Forensic technique library (educational)** — Deep technical explanations of Error Level Analysis (ELA), EXIF metadata extraction, Clone/Copy-Move detection, each with "how it works", "limitations", Egyptian case examples, and bilingual text. _Use case:_ An investigator learns what ELA can and cannot reveal before analysing an image. (`src/app/forensic-image/page.tsx`)
- **AI-vision image analysis** — Uploads an image for AI (Gemini Vision) assessment of manipulation signals. _Use case:_ User uploads a viral protest photo to check for AI-generated or manipulated regions. (`src/app/forensic-image/page.tsx`)
- **Page AI chatbot (Forensics)** — AI assistant for media forensics questions. _Use case:_ User asks how to detect deepfake videos after reviewing the ELA results. (`src/app/forensic-image/page.tsx`)

---

## /global-alliance

- **Global organisation directory (searchable)** — Lists fact-checking, media literacy, AI ethics, religious literacy, mental health, OSINT, academic, and digital-rights organisations by region and category with links. _Use case:_ An EAL user in the Middle East finds Arabic-language fact-checking partners. (`src/app/global-alliance/page.tsx`)
- **Category filter (8 types)** — Colour-coded filter buttons for each organisation category. _Use case:_ An AI-ethics researcher filters to AI Ethics organisations only. (`src/app/global-alliance/page.tsx`)
- **Region filter (6 regions)** — Filter by Middle East, Europe, Americas, Asia, Africa, Global. _Use case:_ User looking for MENA-specific organisations filters by Middle East. (`src/app/global-alliance/page.tsx`)
- **Organisation search** — Full-text search across organisation names and descriptions. _Use case:_ Finding a specific organisation by name (e.g. "AFP") instantly. (`src/app/global-alliance/page.tsx`)

---

## /god-system

- **8-layer deception analysis** — Submits any claim text to `/api/god-system` for simultaneous analysis across 8 dimensions (fabrication, omission, decontextualisation, weaponised timing, cherry-picking, narrative framing, authority spoofing, unknown/hybrid). _Use case:_ User pastes a viral WhatsApp claim to receive a full multi-layer verdict in one call instead of running each engine separately. (`src/app/god-system/page.tsx`)
- **ToolGuide with Egyptian-dialect context** — Bilingual usage guide explaining the tool is for Egyptian users getting scary or TGTBT claims on WhatsApp/Facebook/TV. _Use case:_ First-time user understands what the system does before submitting a claim. (`src/app/god-system/page.tsx`)
- **AnalysisProgress staging** — Animated progress indicator showing which analysis stage is running. _Use case:_ Keeps users engaged during the multi-engine AI call. (`src/app/god-system/page.tsx`)
- **Page AI chatbot (God System)** — AI assistant with 8-layer deception taxonomy context. _Use case:_ User asks follow-up questions about a specific layer's verdict. (`src/app/god-system/page.tsx`)

---

## /guide

- **Comprehensive platform navigation guide** — Scroll-animated page walking users through the EAL platform: crisis context, 3 engines overview, learning path, evidence tools, religion tools, health tools, community tools, dashboard. _Use case:_ A new user who arrived at the platform without context learns what each section is for and where to start. (`src/app/guide/page.tsx`)
- **Scroll-triggered section animations** — IntersectionObserver-driven fade-in for each section as user scrolls. _Use case:_ Improves guide readability and prevents cognitive overwhelm. (`src/app/guide/page.tsx`)

---

## /health-data

- **WHO indicator search** — Queries `/api/medical/who?type=indicators` to search WHO global health indicators by keyword (mortality, life expectancy, etc.). _Use case:_ A user verifying a health statistic claim finds the official WHO indicator behind it. (`src/app/health-data/page.tsx`)
- **Indicator time-series drill-down** — Clicking a WHO indicator fetches its full time-series data via `/api/medical/who?type=data` for country-level trend analysis. _Use case:_ Journalist examining Egypt's child mortality trend over time uses this to pull the raw WHO data. (`src/app/health-data/page.tsx`)

---

## /impact

- **Animated metrics dashboard** — Scroll-triggered animated counters for platform statistics: API routes (78), NVIDIA NIM routes (31), exercise files (91), platform pages (119), and other operational metrics. _Use case:_ A competition judge or investor sees headline impact numbers immediately upon landing. (`src/app/impact/page.tsx`)
- **Metric detail cards** — Each metric has a description, colour-coded category icon, and a glow visual. _Use case:_ Provides context for each number (e.g., "Powered by Nemotron-Ultra 550B"). (`src/app/impact/page.tsx`)

---

## /inoculation-passport

- **12-technique immunity tracker** — Displays 12 manipulation-technique "immunity slots" (Fear-Mongering, Emotional Manipulation, False Authority, Conspiracy Logic, Polarization, Impersonation, Trolling, Discrediting, Deepfake Detection, Cherry-Picking, Scapegoating, Distraction), each linked to required exercises. _Use case:_ User checks which manipulation types they have built immunity against and which still need practice. (`src/app/inoculation-passport/page.tsx`)
- **Exercise completion progress per technique** — Reads progress from localStorage and the progress-service to calculate what percentage of required exercises are done for each technique. _Use case:_ After completing Day 3 exercises, user sees "Conspiracy Logic" immunity bar advance. (`src/app/inoculation-passport/page.tsx`)
- **Immunity decay simulation** — Each technique has a `decayRate` (% per week without practice) that reduces immunity over time since last practice, creating urgency to revisit. _Use case:_ User who hasn't practised for 3 weeks sees immunity bars decay, motivating return. (`src/app/inoculation-passport/page.tsx`)
- **Page AI chatbot (Inoculation Passport)** — AI assistant for questions about the inoculation passport system. _Use case:_ User asks what "deepfake detection immunity" means and how to improve it. (`src/app/inoculation-passport/page.tsx`)

---

## /instruments/mist

- **MIST-20 redirect** — Server-side redirect from the phantom `/instruments/mist` route to the real MIST-20 instrument at `/assessment`, fixing a dead link that caused 404 errors from curriculum and demo pages. _Use case:_ Any existing link to `/instruments/mist` is silently repaired. (`src/app/instruments/mist/page.tsx`)

---

## /kill-list

- **Active threats registry** — Fetches verified debunked claims from `/api/kill-list`, displaying each with title, claim text, fact correction, source citation, date, category, and threat level (Low/Medium/High/Critical). _Use case:_ User checks whether a specific viral claim is already documented and debunked. (`src/app/kill-list/page.tsx`)
- **Search over debunked claims** — Filters the displayed claims by keyword in real time. _Use case:_ User searching "antibiotics children" finds the relevant debunked health claim quickly. (`src/app/kill-list/page.tsx`)
- **Expandable claim detail cards** — Each claim card expands to reveal the full fact-correction and source. _Use case:_ User reads the cited source before forwarding the correction to their family group. (`src/app/kill-list/page.tsx`)
- **Bilingual toggle (EN / AR)** — Single button switches all claim text between English and Arabic. _Use case:_ Arabic-first users read the original claim and correction in Egyptian Arabic. (`src/app/kill-list/page.tsx`)

---

## /knowledge-graph

- **D3 force-directed knowledge graph** — Renders the full KEYHUNTER dataset as an interactive SVG force graph: ROOT node → 3 MVP hubs (deepreal, mental-health, religion-hub) → topic nodes. _Use case:_ Researcher explores how the platform's knowledge base is structured and sees which topics cluster around each engine. (`src/app/knowledge-graph/page.tsx`)
- **Node filter by type/group** — Filter controls narrow visible nodes by group (engine hub, topic, etc.). _Use case:_ User interested only in religion-hub topics isolates that cluster. (`src/app/knowledge-graph/page.tsx`)
- **Node detail panel** — Clicking a node shows the full KEYHUNTER entry details in a side panel. _Use case:_ User inspects the evidence and debunking methodology behind a specific knowledge claim. (`src/app/knowledge-graph/page.tsx`)
- **Graph text search** — Search input highlights matching nodes in the graph. _Use case:_ User searches "vaccine" to locate all vaccine-related knowledge nodes. (`src/app/knowledge-graph/page.tsx`)

---

## /language-select

- **Language/direction selection screen** — Presents three choices (Arabic MSA, Egyptian Arabic ar-EG, English) as full-screen cards; persists selection to localStorage and adjusts RTL direction accordingly. _Use case:_ A new user arriving at the platform sets their language preference before entering the main chatbot. (`src/app/language-select/page.tsx`)
- **RTL toggle integration** — Selecting Arabic triggers `toggleDirection()` to switch the entire app to RTL layout. _Use case:_ Arabic-speaking user gets a fully RTL interface without any manual setting. (`src/app/language-select/page.tsx`)
- **Post-selection redirect to chatbot** — After confirming language, navigates to `/chatbot` after a 600 ms transition animation. _Use case:_ Smooth onboarding flow from language selection into the main AI chatbot interface. (`src/app/language-select/page.tsx`)

---

## /layers/[id]/fight

- **Per-layer counter-weapons arsenal** — Dynamic route accepting layer IDs 1–8; for each of the 8 deception layers, displays 4–5 specific counter-weapons with name, bilingual description, and star rating. _Use case:_ A user who identifies that a claim uses "decontextualisation" (Layer 3) navigates here to find the specific OSINT and context-restoration tools to defeat it. (`src/app/layers/[id]/fight/page.tsx`)
- **Star-rated weapon effectiveness** — Each counter-weapon has a 1–5 star effectiveness rating. _Use case:_ User chooses the highest-rated (5-star) weapon when time is limited. (`src/app/layers/[id]/fight/page.tsx`)
- **Bilingual weapon descriptions** — Each weapon has full EN and AR descriptions. _Use case:_ Arabic-speaking investigator reads the tool description in their language. (`src/app/layers/[id]/fight/page.tsx`)

---

## /live-deception

- **Annotated social media feed simulator** — Simulates a social-media scroll feed of Egyptian-dialect posts, each tagged with a deception layer (1–5) and colour-coded overlay; users can toggle X-Ray mode to reveal manipulation annotations. _Use case:_ A media-literacy class sees how a realistic-looking Arabic health scare post is tagged as "Layer 1: Absolute Fabrication". (`src/app/live-deception/page.tsx`)
- **X-Ray toggle** — Single toggle switches between normal feed view and forensic overlay view showing layer labels, threat levels, and debunking notes. _Use case:_ Demonstrates what trained critical thinking "sees" that untrained readers miss. (`src/app/live-deception/page.tsx`)
- **Real kill-list integration** — Optionally fetches live debunked claims from `/api/kill-list` to populate some posts with real documented Egyptian misinformation campaigns. _Use case:_ Ensures the simulator uses real (not invented) misinformation examples. (`src/app/live-deception/page.tsx`)
- **Page AI chatbot (Live Deception)** — AI assistant for questions about the manipulation patterns shown. _Use case:_ After seeing a "Layer 3: Decontextualisation" tag, user asks the AI to explain that layer. (`src/app/live-deception/page.tsx`)

---

## /manipulation-cards

- **FLICC-taxonomy card deck** — Full deck of manipulation technique cards classified by FLICC (Fake Experts, Logical Fallacy, Impossible Expectations, Cherry-Picking, Conspiracy), each with bilingual name, psychological mechanism, name-free Egyptian example, and counter/defence. _Use case:_ A trainer uses the cards as a teaching deck for a media-literacy workshop. (`src/app/manipulation-cards/page.tsx`)
- **Card filter by FLICC category** — Filter the deck to a single FLICC category to focus study. _Use case:_ User practising recognition of "Fake Expert" claims filters to category F cards only. (`src/app/manipulation-cards/page.tsx`)
- **Per-card source citation** — Every card carries a real, resolvable citation where applicable, enforcing the One-Law. _Use case:_ Educator fact-checks the card content before using it in class. (`src/app/manipulation-cards/page.tsx`)
- **Page AI chatbot (Manipulation Cards)** — AI assistant for questions about manipulation techniques. _Use case:_ User asks for more Egyptian examples of a specific technique. (`src/app/manipulation-cards/page.tsx`)

---

## /master-roadmap

- **136-node forensic roadmap timeline** — Visual centre-line timeline of 136 categorised "forensic nodes" covering the entire EAL platform development and deployment sequence, with collapsible categories. _Use case:_ A project manager or developer follows the structured sequence from core deployment to full orchestration. (`src/app/master-roadmap/page.tsx`)
- **Copy-node action** — Each node has a clipboard copy button for the node text. _Use case:_ Developer copies a roadmap item into a task-management tool. (`src/app/master-roadmap/page.tsx`)
- **Collapsible category sections** — Each roadmap category can be expanded/collapsed; first category is open by default. _Use case:_ A user focuses on a specific phase without being overwhelmed by all 136 nodes. (`src/app/master-roadmap/page.tsx`)

---

## /media-library

- **Egypt-focused media accuracy fact-checker** — Library of movies, TV shows, and documentaries featuring Egypt, each rated High/Mixed/Low accuracy with specific claim verdicts (true/false + explanation). _Use case:_ A teacher preparing a lesson on "The Mummy" checks which historical claims are accurate before showing the film. (`src/app/media-library/page.tsx`)
- **Per-claim truth analysis cards** — Each media item expands to show individual claims with boolean verdicts and detailed historical explanations. _Use case:_ A student researching Imhotep finds that the "cursed high priest" portrayal is false and learns the real historical figure. (`src/app/media-library/page.tsx`)
- **Media type filter (movie / show / documentary)** — Filter the library by format. _Use case:_ Researcher looking only at documentaries filters to verify their historical accuracy. (`src/app/media-library/page.tsx`)

---

## /medical-life

- **4-source parallel medical search** — Queries OpenFDA, DailyMed, RxNorm, and WHO simultaneously via Promise.allSettled for any medical query. _Use case:_ A user with a general health question gets data from four authoritative sources at once. (`src/app/medical-life/page.tsx`)
- **Source-labelled result cards** — Each result is labelled with its source (openFDA, DailyMed, RxNorm, WHO) and a severity indicator (High/Info). _Use case:_ User distinguishes between a WHO population-level indicator and an FDA adverse-event report. (`src/app/medical-life/page.tsx`)

---

## /mens-shield

- **Male stress calculator (5 dimensions)** — Slider-based self-assessment across Work Stress, Isolation, Emotional Strain, Sleep Quality, and Physical Fatigue; computes a composite 0–100% stress score. _Use case:_ An Egyptian man who culturally avoids discussing mental health gets a quantified, non-stigmatising stress reading. (`src/app/mens-shield/page.tsx`)
- **Page AI chatbot (Men's Mental Health)** — AI assistant specialised for Egyptian male mental health context, covering cultural barriers and crisis resources. _Use case:_ User discusses stress results and asks for coping strategies tailored to Egyptian male cultural norms. (`src/app/mens-shield/page.tsx`)

---

## /mental-health/depression

- **PHQ-9 self-assessment** — Full 9-item Patient Health Questionnaire with 0–3 Likert scale; computes total score (0–27) with severity banding (minimal/mild/moderate/moderately severe/severe) and links to professional help if score ≥ 15. _Use case:_ User suspects they have depression and takes a clinically validated screening tool before seeking professional help. (`src/app/mental-health/depression/page.tsx`)
- **14-day CBT program** — Day-by-day programme covering PHQ-9 baseline, sleep hygiene, automatic negative thoughts, behavioural activation, exercise/serotonin science, social connection mapping, mindfulness, cognitive restructuring, gratitude journaling, nutrition/mood, boundaries, WRAP trigger management, mid-point retake, and sustainability plan — each with exercise instructions and cited sources. _Use case:_ Someone with mild-to-moderate depression follows a structured evidence-based self-help protocol. (`src/app/mental-health/depression/page.tsx`)
- **Myth-busting panel (10 myths)** — Debunks 10 Egyptian cultural myths about depression (e.g. "depression is laziness", "strong faith prevents it") with each myth paired with a scientific rebuttal, ICD/DSM reference, and the specific logical fallacy used. _Use case:_ A user whose family dismisses their depression uses the cited myth-busters in conversation. (`src/app/mental-health/depression/page.tsx`)
- **Scientific shield provenance** — Citations for every clinical claim (WHO ICD-11, PHQ-9, Cuijpers meta-analysis, NICE NG222) displayed via ScientificShield component. _Use case:_ Clinician verifies that the programme follows evidence-based guidelines. (`src/app/mental-health/depression/page.tsx`)
- **Page AI chatbot (Depression Support)** — AI assistant with depression-specific system prompt including safe-messaging guidelines and Egyptian crisis line (08008880700). _Use case:_ User in distress receives supportive AI guidance with immediate referral to crisis services. (`src/app/mental-health/depression/page.tsx`)

---

## /mental-health/exercise/[day]

- **14-day mental health exercise engine** — Dynamic route loading day-specific JSON exercise files (day-01 through day-14) into the ExerciseEngine component with COM-B metadata; records completion to progress-service and syncs a participant snapshot. _Use case:_ User completing Day 5 of the mental health programme gets the sleep-hygiene exercise with proper progress tracking. (`src/app/mental-health/exercise/[day]/page.tsx`)
- **Progress recording + research sync** — On completion, calls `recordExerciseCompletion()` and `syncCurrentParticipantSnapshot()` to update both the user's personal progress and the platform's research data. _Use case:_ Platform collects pre/post research data for the N=84 quasi-experiment while users benefit from the exercises. (`src/app/mental-health/exercise/[day]/page.tsx`)

---

## /mental-health

- **14-day programme timeline overview** — Scroll-through timeline of all 14 days with title, Arabic translation, description, and exercise type icon. _Use case:_ User previews the full programme before committing to it, or finds a specific day to return to. (`src/app/mental-health/page.tsx`)
- **5-item mini PHQ-9 screening** — Quick 5-question version of the PHQ-9 with live scoring and colour-coded severity label (Minimal/Mild/Moderate/Severe). _Use case:_ User gets a rapid mental health snapshot before deciding whether to start the full programme. (`src/app/mental-health/page.tsx`)
- **Crisis resource display** — Shows Egyptian Mental Health Hotline (08008880700), Behman Hospital Helpline, and Befrienders Egypt with phone numbers and descriptions. _Use case:_ User in crisis immediately sees actionable help numbers. (`src/app/mental-health/page.tsx`)
- **Page AI chatbot (Mental Health)** — AI assistant with WHO mhGAP-informed mental health system prompt. _Use case:_ User asks whether their symptoms warrant professional help. (`src/app/mental-health/page.tsx`)

---

## /misinfo-atlas

- **3D sphere/echo/pyramid misinformation atlas** — Three-dimensional interactive React-Three-Fiber canvas rendering the 8-layer deception taxonomy as historical nodes with CameraControls, Bloom post-processing, and Star field; three view modes (sphere, echo chamber, pyramid). _Use case:_ A teacher or competition presenter demonstrates the taxonomy immersively. (`src/app/misinfo-atlas/page.tsx`)
- **8-layer deception taxonomy reference panel** — Sidebar listing all 8 deception layers (Absolute Fabrication through The Unknown) with essence summaries and defence strategies in EN/AR. _Use case:_ User identifies which layer a claim belongs to and reads the corresponding defence. (`src/app/misinfo-atlas/page.tsx`)
- **Historical era nodes** — Graph nodes representing historical misinformation eras, displayed on the 3D surface with click-to-expand detail cards. _Use case:_ Researcher traces how the same manipulation pattern has recurred across history. (`src/app/misinfo-atlas/page.tsx`)
- **Real kill-list integration** — Optionally overlays live documented Egyptian misinformation campaigns from `/api/kill-list` onto the atlas. _Use case:_ Grounds the historical atlas in current Egyptian misinformation context. (`src/app/misinfo-atlas/page.tsx`)
- **Page AI chatbot (Misinfo Atlas)** — AI assistant for 8-layer taxonomy questions. _Use case:_ User asks which layer a specific Egyptian conspiracy theory belongs to. (`src/app/misinfo-atlas/page.tsx`)

---

## /nvidia-hub

- **NVIDIA AI model directory** — Lists NVIDIA AI models (Nemotron-3 Ultra 550B and others) with honest descriptions of their role in the EAL platform (last-resort rotator slot, content safety, deepfake showcase). _Use case:_ A technical stakeholder understands exactly how NVIDIA models are used — and not overstated. (`src/app/nvidia-hub/page.tsx`)
- **Page AI chatbot (NVIDIA Hub)** — AI assistant for questions about NVIDIA's role in the platform. _Use case:_ User asks what Nemotron-Ultra 550B is and why it's listed last in the rotator. (`src/app/nvidia-hub/page.tsx`)

---

## /onboarding

- **Step-by-step platform tour (multi-step wizard)** — 4+ step wizard with animated visuals covering: Egypt's misinformation crisis, the 3 verification engines, how evidence tools work, and how to get started. _Use case:_ A brand-new user is guided through the platform's purpose and main features before their first verification session. (`src/app/onboarding/page.tsx`)
- **Parallax hero section** — ParallaxHero component at the start of the tour for visual engagement. _Use case:_ High-impact first impression for onboarding. (`src/app/onboarding/page.tsx`)

---

## /open-source

- **4-tab technical architecture portal** — Tabs: System Overview (5-engine architecture), Gemini Rotator API (14-key multi-provider rotator algorithm), Forensic ELA Math (mathematical basis of Error Level Analysis), Parallel Federated Routing (search-fan-out algorithm). _Use case:_ A developer or academic reviewer audits the platform's underlying technical implementation. (`src/app/open-source/page.tsx`)
- **Multi-provider AI rotator documentation** — Explains the 14-key, 6-provider (Gemini, Groq, OpenRouter, Cerebras, Together, SambaNova) automatic failover system with mathematical routing explanation. _Use case:_ Open-source contributor understands how to add a new provider to the rotator. (`src/app/open-source/page.tsx`)
- **ELA forensic mathematics** — Mathematical explanation of the error-level analysis algorithm used in the forensic image tools. _Use case:_ Researcher verifies the scientific basis of the platform's image forensics. (`src/app/open-source/page.tsx`)

---

## /osint-investigator

- **In-browser EXIF metadata extraction** — Uses the `exifr` library to parse EXIF data directly in the browser from an uploaded image file; displays camera model, GPS, timestamp, software. _Use case:_ Investigator uploads a photo claimed to be from a recent event and checks the EXIF timestamp to verify the date. (`src/app/osint-investigator/page.tsx`)
- **In-browser Error Level Analysis (ELA)** — Client-side ELA using HTML Canvas: re-compresses the image at known quality, pixel-diffs the result, renders an ELA heatmap showing suspected edited regions. _Use case:_ User checks a viral protest photo for signs of digital manipulation without sending it to a server. (`src/app/osint-investigator/page.tsx`)
- **Dual-tab interface (EXIF / ELA)** — Switch between EXIF extraction and ELA analysis views for the same uploaded image. _Use case:_ Investigator runs both analyses on the same image without re-uploading. (`src/app/osint-investigator/page.tsx`)
- **Page AI chatbot (OSINT Investigator)** — AI assistant with OSINT-specific context. _Use case:_ User asks how to interpret a high ELA score on a specific image region. (`src/app/osint-investigator/page.tsx`)

---

## /others-search

- **Federated multi-source search** — Queries up to 7 external sources simultaneously: internal Evidence DB, Google FactCheck API, OpenAlex, NCBI/PubMed, ClaimBuster, MediaWiki/Wikipedia, Internet Archive. _Use case:_ User searching for information about a claim gets consolidated results from across the entire fact-checking and academic ecosystem. (`src/app/others-search/page.tsx`)
- **Source selection UI** — Per-source toggle checkboxes with Select All / Clear All; each source shows icon, name, and description. _Use case:_ User focused on academic evidence deselects Wikipedia and FactCheck to search only OpenAlex and PubMed. (`src/app/others-search/page.tsx`)
- **Bilingual interface toggle** — EN/AR toggle switches all UI labels and search prompts. _Use case:_ Arabic-speaking user operates the tool in their language. (`src/app/others-search/page.tsx`)
- **Page AI chatbot (Federated Search)** — AI assistant for helping interpret multi-source results. _Use case:_ User receives conflicting results from different sources and asks the AI which to trust. (`src/app/others-search/page.tsx`)

---

## / (root landing page)

- **Platform hero section** — Parallax hero with platform tagline, bilingual copy, and CTA buttons linking to the three engines (DeepReal, Mental Health, Religion Hub). _Use case:_ First impression for any new visitor arriving at the platform root. (`src/app/page.tsx`)
- **3-engine MVP cards with live counts** — Card grid for DeepReal, Mental Health, and Religion Hub, each showing live counts of exercises, scenarios, and knowledge-base entries derived from data modules. _Use case:_ A user picks the engine most relevant to their current need (health vs. religion vs. media). (`src/app/page.tsx`)
- **Evidence features showcase** — Highlights the 7-database evidence aggregator, drug checker, and WHO health-data tools. _Use case:_ Demonstrates scientific credibility to sceptical visitors. (`src/app/page.tsx`)
- **Verified-voices quote panel** — Shows three verified quotes (Feynman, WHO mental health, Quran Hujurat 49:6) sourced from VERIFIED_QUOTES data. _Use case:_ Establishes intellectual and spiritual grounding for the platform's mission. (`src/app/page.tsx`)
- **Methodology section** — Explains the One-Law, inoculation theory approach, and evidence-based methodology briefly. _Use case:_ Builds credibility for educators and journalists evaluating the platform. (`src/app/page.tsx`)
- **Baseline CTA / final CTA** — Two CTA sections linking to baseline assessment and the main platform guide. _Use case:_ Converts browser to active user by directing them to take the first assessment. (`src/app/page.tsx`)

---

## /paper-auditor

- **DOI-based paper metadata lookup** — Submits a DOI to Crossref API (via `/api/...`) to retrieve paper title, authors, journal, year, citation count, and open-access status. _Use case:_ User checks whether a paper cited in a health claim is real and peer-reviewed. (`src/app/paper-auditor/page.tsx`)
- **PRISMA / CONSORT checklist** — Interactive 6-item checklist switchable between PRISMA (systematic reviews) and CONSORT (RCTs) standards; user marks each item to assess reporting quality. _Use case:_ Researcher auditing whether a systematic review follows PRISMA reporting standards. (`src/app/paper-auditor/page.tsx`)
- **Statistical power calculator** — Sliders for sample size and effect size; computes power estimate inline. _Use case:_ Reviewer checks whether a study with N=40 and d=0.5 has adequate power. (`src/app/paper-auditor/page.tsx`)
- **ToolGuide with ready-example DOIs** — Usage guide with pre-loaded example DOIs that trigger a live audit. _Use case:_ New user sees the tool in action with a real paper without finding their own DOI. (`src/app/paper-auditor/page.tsx`)
- **Page AI chatbot (Paper Auditor)** — AI assistant for paper quality assessment questions. _Use case:_ User asks what a CONSORT flow-diagram is after seeing it on the checklist. (`src/app/paper-auditor/page.tsx`)

---

## /passport

- **Cognitive Passport auto-bootstrap** — Calls `/api/auth/passport` (GET); if not authenticated, POSTs to create a new anonymous passport and shows a recovery key. _Use case:_ User gets a persistent, anonymous cognitive identity without creating an account. (`src/app/passport/page.tsx`)
- **Cognitive Immunity Score display** — Fetches `/api/ledger` to show the user's Defense Ledger metrics: total claims reviewed, caught vs. missed, streak, and the composite Cognitive Immunity Score. _Use case:_ User tracks their verification accuracy over time. (`src/app/passport/page.tsx`)
- **8-layer coverage meters** — Visualises how many claims from each of the 8 deception layers the user has reviewed, showing blind spots. _Use case:_ User sees they haven't encountered any Layer 6 (Narrative Matrix) claims and navigates to practice that type. (`src/app/passport/page.tsx`)
- **Cohort efficacy headline** — Fetches `/api/efficacy` to show the platform's aggregate pre/post veracity discernment delta and Cohen's d_z. _Use case:_ User sees how their individual progress compares to the cohort's overall improvement. (`src/app/passport/page.tsx`)

---

## /peer-challenge

- **Timed competitive fact-checking game** — Players are shown 10 real/fake claims about Egypt and must judge each as real or fake under a time-limited countdown; score scales with speed and difficulty. _Use case:_ A group of students competes in a classroom setting to see who can most quickly identify fabricated Egyptian news claims. (`src/app/peer-challenge/page.tsx`)
- **Room code generation** — Generates a shareable room code so multiple players can compete in the same session. _Use case:_ Teacher generates a code and students join the same challenge room. (`src/app/peer-challenge/page.tsx`)
- **Difficulty-stratified question pool** — 10-question pool mixing easy (100 pts), medium (200 pts), and hard (300 pts) claims about Egyptian events and health/science topics. _Use case:_ Mixed-ability groups are challenged appropriately. (`src/app/peer-challenge/page.tsx`)
- **Results leaderboard with technique explanations** — After each answer, the manipulation technique used (if fake) is revealed with an explanation. _Use case:_ Players learn the specific deception technique while competing, not just whether they were right. (`src/app/peer-challenge/page.tsx`)

---

## /philosophy

- **Platform philosophy manifesto** — Multi-section long-form article with themed sections: The Problem with Fact-Checking Alone, Inoculation Theory (with 4 cited RCTs), Cognitive Immunity Model, and further sections — all with inline citations and bilingual text. _Use case:_ An academic, journalist, or investor reads the intellectual and scientific foundation for EAL's approach. (`src/app/philosophy/page.tsx`)
- **Theme-reactive layout** — Entire page uses CSS design-token variables (var(--…)) from the 16 art-directed themes; the typography uses Playfair Display for premium manifesto aesthetics. _Use case:_ Page looks consistent in all 16 platform themes without separate style overrides. (`src/app/philosophy/page.tsx`)
- **Inoculation-theory evidence section** — Lists specific published studies (Roozenbeek 2022 – 52% reduction; Van der Linden 2017; Cook 2017) with exact effect sizes supporting the platform's pedagogical approach. _Use case:_ Researcher fact-checks the platform's evidence claims for scientific validity. (`src/app/philosophy/page.tsx`)

---
