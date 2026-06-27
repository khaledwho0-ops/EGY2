# API Endpoints — slice api-2

Files covered: items 44–86 of the sorted `src/app/api/**/route.ts` list (43 files total).

---

## /api/islamic/sectarian

- **Sectarian & Takfir Detection** — Analyzes Arabic/English text for Takfir rhetoric, Amman Message compliance violations, and extremism level using NVIDIA NIM, returning a structured JSON with detected indicators and de-radicalization counter-resources. _Use case:_ A moderation or research user submits a social-media post to check whether it promotes exclusionary or extremist Islamic rhetoric before publishing.  (`src/app/api/islamic/sectarian/route.ts`)

---

## /api/islamic/semantic

- **Islamic Semantic Search (Kalimat + fallback)** — Searches Quran and Hadith texts semantically using the Kalimat API, falling back to composing results from the `/api/islamic/quran` and `/api/islamic/hadith` routes; results are cached 30 min. _Use case:_ A researcher enters a topic keyword and wants relevant Quran verses and hadiths ranked by semantic overlap.  (`src/app/api/islamic/semantic/route.ts`)
- **NVIDIA NIM Scholarly Synthesis** — After retrieving top semantic results, calls NVIDIA NIM to produce a bilingual scholarly context object with synthesis, misuse warnings, and Islamic literacy tips in both Arabic and English. _Use case:_ Alongside raw text matches, the UI presents a scholar-level explanation of how those texts relate to the query and common ways they are misused.  (`src/app/api/islamic/semantic/route.ts`)
- **Token Overlap Scoring Fallback** — Implements a local token-overlap scoring function to rank combined Quran/Hadith results when the Kalimat API is unavailable. _Use case:_ Ensures results are still relevance-ordered without any external dependency.  (`src/app/api/islamic/semantic/route.ts`)

---

## /api/islamic/tafsir

- **Quran Tafsir Retrieval** — Fetches verse exegesis (tafsir) from `api.quran-tafseer.com` for a given surah/ayah and tafsir ID, with 24-hour caching. _Use case:_ A student or researcher views the scholarly exegesis of a specific Quran verse.  (`src/app/api/islamic/tafsir/route.ts`)
- **Claim Verification Against Verse** — Accepts an optional `claim` parameter and returns an AI assessment of whether the claim accurately reflects the verse's meaning (verdict: ACCURATE / INACCURATE / PARTIALLY_ACCURATE / OUT_OF_CONTEXT). _Use case:_ A fact-checker wants to verify whether a social-media claim correctly cites a Quran verse.  (`src/app/api/islamic/tafsir/route.ts`)
- **NVIDIA NIM Scholarly Context** — For each tafsir retrieval, generates bilingual scholarly context including Asbab al-Nuzul, Makki/Madani classification, consensus of major scholars (Ibn Kathir, Al-Tabari), common misuses, and an educational note. _Use case:_ The UI augments raw tafsir text with rich scholarly metadata for educational use.  (`src/app/api/islamic/tafsir/route.ts`)

---

## /api/kill-list

- **Kill-List Claims Retrieval** — Returns the full static `killList` dataset of pre-catalogued dangerous or high-priority misinformation claims for immediate action. _Use case:_ A moderation dashboard loads the curated list of the most harmful active claims to prioritize debunking efforts.  (`src/app/api/kill-list/route.ts`)

---

## /api/ledger

- **Cognitive Defense Ledger Retrieval (GET)** — Returns a passport-authenticated user's full defense event history, event count, and derived immunity meters (a per-layer cognitive defense scorecard). _Use case:_ The user's personal dashboard loads their deception-detection performance metrics across the 8-layer taxonomy.  (`src/app/api/ledger/route.ts`)
- **Defense Event Recording (POST)** — Appends a defense outcome (caught/missed/reviewed) for a specific deception layer and surface to the user's ledger; returns updated immunity meters. _Use case:_ After completing a detection exercise, the frontend records whether the user caught or missed the manipulation technique, driving personalized learning paths.  (`src/app/api/ledger/route.ts`)

---

## /api/live-deception/generate

- **Radicalizing Feed Simulation** — Generates the next post in a simulated social-media radicalizing rabbit-hole, escalating conspiracy or manipulation content based on the user's last liked post and current rabbit-hole depth level, using NVIDIA NIM (Egyptian Arabic primary) or Gemini fallback. _Use case:_ The Live Deception educational module shows users how recommendation algorithms progressively radicalize content, with synthetic engagement counts clearly marked as non-real.  (`src/app/api/live-deception/generate/route.ts`)
- **Manipulation Tagging & Brain-Area Targeting** — Returns `manipulationTags`, `targetBrainArea`, and `psychologicalHook` fields that identify which manipulation layer, brain region, and psychological vulnerability the generated post exploits. _Use case:_ The UI overlays educational annotations on each simulated post so users understand the neurological mechanics of manipulation.  (`src/app/api/live-deception/generate/route.ts`)

---

## /api/medical/dailymed

- **DailyMed Drug Label Search** — Queries the NLM DailyMed API for official FDA-approved drug label documents by drug name, returning up to 5 results with title, set ID, published date, and link; 24-hour cache. _Use case:_ A user searches for a medication name to view its official label and dosage information from the National Library of Medicine.  (`src/app/api/medical/dailymed/route.ts`)

---

## /api/medical/openfda

- **OpenFDA Adverse Event Search** — Queries the FDA's drug adverse event API for a medication name, returning up to 10 serious event records with reaction terms, patient age, sex, and receipt date; 24-hour cache. _Use case:_ A researcher or user looks up reported adverse reactions for a drug to assess real-world safety signals from FDA post-market surveillance.  (`src/app/api/medical/openfda/route.ts`)

---

## /api/medical/rxnorm

- **RxNorm Drug Name Normalization** — Queries the NLM RxNorm API to return standardized RxCUI identifiers, synonyms, and term types for a medication name; 24-hour cache. _Use case:_ The system normalizes a user-submitted drug name to its canonical RxCUI for consistent cross-database medical lookups.  (`src/app/api/medical/rxnorm/route.ts`)

---

## /api/medical/who

- **WHO GHO Indicator Search** — Queries the WHO Global Health Observatory API for health indicators matching a search term or returns up to 50 indicators by default; one-week cache. _Use case:_ A public health researcher searches WHO indicators to find standardized global health metrics relevant to a claim.  (`src/app/api/medical/who/route.ts`)
- **WHO GHO Indicator Data Fetch** — Retrieves the 100 most recent data points for a specific WHO indicator code ordered by time; one-week cache. _Use case:_ The system loads time-series data for a WHO indicator to populate evidence charts or debunk claims using official global health statistics.  (`src/app/api/medical/who/route.ts`)

---

## /api/mist

- **MIST Quiz Scoring & Persistence** — Scores a submitted MIST (Misinformation Susceptibility Test) assessment using the SM-2 algorithm, persists the score and history to the user's KV store entry (last 100 runs), and returns a personalized FLICC-gap recommendation. _Use case:_ After completing a misinformation susceptibility quiz, the user receives a scored baseline and a curriculum recommendation targeting their weakest cognitive defense category.  (`src/app/api/mist/route.ts`)

---

## /api/nlp/arabic

- **Arabic Text NLP Analysis** — Analyzes Arabic text up to 10,000 characters using the `analyzeArabicText` library function for structural linguistic features, and sets a `X-Risk-Detected` response header if risk flags are present. _Use case:_ A content moderator submits Arabic social-media content for automated language analysis before routing to human review.  (`src/app/api/nlp/arabic/route.ts`)
- **Egyptian Dialect Manipulation Deep Analysis** — Optionally calls NVIDIA NIM to produce a deep analysis JSON including dialect classification (Egyptian/Gulf/MSA etc.), registered emotion, manipulation techniques with text evidence, Egyptian context risks, viral potential score, and recommended user response in both languages. _Use case:_ The Arabic text analysis panel enriches raw NLP output with AI-detected manipulation signals specific to Egyptian Arabic disinformation patterns.  (`src/app/api/nlp/arabic/route.ts`)

---

## /api/nlp/sentiment

- **Bilingual Sentiment Analysis (POST)** — Analyzes up to 2,000 characters of text for sentiment label (positive/negative/neutral), compound score, manipulation score, viral-intent score, emotional triggers, and crisis detection; returns a badge for UI display. _Use case:_ The frontend runs submitted message text through the sentiment engine to visualize emotional load before displaying it to the user.  (`src/app/api/nlp/sentiment/route.ts`)
- **Sentiment Analysis via GET** — Provides the same sentiment analysis accessible via a `text` or `q` query parameter for easy inline linking and server-side composition. _Use case:_ Another API route or server action calls sentiment analysis as a sub-request without constructing a POST body.  (`src/app/api/nlp/sentiment/route.ts`)

---

## /api/nvidia/chat

- **NVIDIA NIM Streaming Chat** — Streams responses from a selectable NVIDIA NIM model (Nemotron-3 Ultra 550B, DeepSeek V4 Flash/Pro, Gemma 4, Mistral, Kimi, etc.) via the AI SDK text stream with a 25-second abort timeout. _Use case:_ The NVIDIA Hub chat interface sends a conversation thread to this endpoint and streams the model's reply token-by-token into the UI.  (`src/app/api/nvidia/chat/route.ts`)
- **Model Allow-Listing** — Validates the requested model against a fixed list of 9 NVIDIA NIM models and falls back to Nemotron-3 Ultra 550B if an invalid model is submitted. _Use case:_ Prevents unauthorized or unsupported model requests while allowing the UI's model-selector to switch between available options.  (`src/app/api/nvidia/chat/route.ts`)

---

## /api/nvidia/complete

- **Non-Streaming NVIDIA Chat Completion** — Calls NVIDIA NIM (Nemotron-3 Ultra 550B) with an 8-second timeout for a JSON response `{ content, model, provider }`; falls back to Gemini 2.0 Flash if NIM fails or is unconfigured. _Use case:_ Internal routes like Debate-Sim and Angry Debunkers call this for structured non-streaming AI completions without managing streaming logic.  (`src/app/api/nvidia/complete/route.ts`)

---

## /api/nvidia/content-safety

- **NVIDIA Content Safety Scanning** — Runs text (up to 10,000 chars) through the `checkContentSafety` library function backed by NVIDIA Nemotron-3.5 Content Safety, supporting `input` and `output` modes. _Use case:_ Any EAL module that needs to screen user input or AI-generated output for harmful content calls this endpoint before displaying results.  (`src/app/api/nvidia/content-safety/route.ts`)

---

## /api/nvidia/live-editor

- **AI Live Component Generator** — Streams pure Tailwind HTML (no JS, no iframes, no external URLs) from NVIDIA NIM Nemotron-3 Ultra 550B in response to a natural-language description of a UI component; supports Arabic RTL via language parameter. _Use case:_ Users on the NVIDIA Hub describe a widget (e.g. "chart of top 10 fallacies" or "prayer times widget for Cairo") and the AI streams renderable HTML into a sandboxed container live.  (`src/app/api/nvidia/live-editor/route.ts`)

---

## /api/nvidia/models

- **NVIDIA Model Registry** — Returns a static JSON list of 9 NVIDIA NIM models with name, description, Arabic description, category, parameter count, accent color, icon, and whether the API key is configured. _Use case:_ The NVIDIA Hub page loads this on mount to populate the model-card grid showing available AI engines and their roles in the EAL platform.  (`src/app/api/nvidia/models/route.ts`)

---

## /api/paper-auditor

- **Scientific Paper Audit (POST)** — Submits a research paper (title, abstract, DOI, authors, journal, year, optional claims) to NVIDIA NIM for a comprehensive peer-review-grade audit covering statistical validity, methodology (CONSORT/PRISMA), COI analysis, reproducibility, claim accuracy, detected fallacies, Arabic summary, Egyptian context note, and a WhatsApp-ready rebuttal script. _Use case:_ A student or journalist pastes a paper abstract to determine whether a viral scientific claim actually holds up to methodological scrutiny.  (`src/app/api/paper-auditor/route.ts`)
- **CrossRef Paper Metadata Fetch (GET with DOI)** — Fetches paper metadata (title, authors, journal, year, abstract) from CrossRef by DOI within an 8-second timeout, returning it pre-filled for the audit form. _Use case:_ The UI auto-populates the audit form when a user pastes a DOI link, eliminating manual data entry.  (`src/app/api/paper-auditor/route.ts`)
- **API Info & Feature List (GET without DOI)** — Returns a documentation object listing the Paper Auditor's supported features and usage instructions. _Use case:_ Developer or integration tool calls GET with no DOI to discover endpoint capabilities.  (`src/app/api/paper-auditor/route.ts`)

---

## /api/safety/alert

- **Critical Safety Alert Persistence** — Receives and persists an `AbuseLogEntry` (with severity and violation type) from client-side `triggerAdminAlert` calls into the `safety:alerts` KV key, capped at 500 entries, logged to server console for audit. _Use case:_ When a user interaction triggers a critical abuse signal (e.g. attempted harmful content injection), the client calls this endpoint to ensure the event is recorded server-side for supervisor review.  (`src/app/api/safety/alert/route.ts`)

---

## /api/science/briefing

- **Scientific Intelligence Briefing** — Returns filtered collections of science signals, audience risk profiles, trusted sources, red/green flag library entries, update methods, and the Awareness Standard Blueprint from static research data; filterable by domain, query, and flag family. _Use case:_ The Science Literacy command center loads its data dashboard with all scientific intelligence collections filtered by the user's selected domain.  (`src/app/api/science/briefing/route.ts`)

---

## /api/science/evidence

- **Module Evidence Overview** — Returns evidence overviews for one or all of the three science modules (deepreal, mental-health, religion-hub) showing claims and source health status. _Use case:_ The evidence health panel reads this on load to display which research claims have live vs. failed upstream sources for each module.  (`src/app/api/science/evidence/route.ts`)
- **Evidence Source Directory** — When `sources=1` query param is passed, returns the full directory of all evidence sources without module grouping. _Use case:_ An admin or internal tool retrieves a flat list of all configured evidence sources and their health.  (`src/app/api/science/evidence/route.ts`)

---

## /api/science/game

- **Science Game Payload Retrieval (GET)** — Returns the full game payload for a specified mode (classic / egy / pov / immunity-rumors / immunity-scams / immunity-tiktok) including rounds and state. _Use case:_ The game UI loads on page open to initialize the current round and available choices for the selected game mode.  (`src/app/api/science/game/route.ts`)
- **Game Answer Submission** — Accepts an `answer` action with `choiceId` to process the user's round answer, returning updated game state and feedback. _Use case:_ The user clicks an answer option; the frontend calls this and the response reveals whether the answer was correct and advances the round.  (`src/app/api/science/game/route.ts`)
- **Game Reset** — Accepts a `reset` action to restart a game mode from the beginning. _Use case:_ The user clicks "Play Again" after completing a game session.  (`src/app/api/science/game/route.ts`)
- **AI Challenge Generation** — Accepts a `generate` action with difficulty (1–5) and topic, calling NVIDIA NIM to dynamically create a new multiple-choice scientific literacy challenge with bilingual explanation, real-world example, and concept taught. _Use case:_ Advanced users request custom challenges on specific topics beyond the pre-built question bank.  (`src/app/api/science/game/route.ts`)

---

## /api/science/journey

- **Science Learning Journey** — Returns the full journey payload (module list, primary module, progression status) from the module service. _Use case:_ The Science Platform landing page loads this to render the user's curriculum map showing module completion states.  (`src/app/api/science/journey/route.ts`)

---

## /api/science/module/[module]

- **Module Payload by ID** — Returns the full payload for a specific science module (deepreal / mental-health / religion-hub) including steps, rules, myths, scenarios, tricks, reverse exercises, and guide state. _Use case:_ When a user opens a specific science module page, the frontend fetches this to populate all content sections.  (`src/app/api/science/module/[module]/route.ts`)

---

## /api/science/operations

- **Module Operation Execution** — Executes a named operation for a science module with arbitrary input, returning a timestamped result from the module-operations library. _Use case:_ A module sub-feature (e.g. a scenario evaluator) posts to this endpoint to run a specific computational operation without a separate route.  (`src/app/api/science/operations/route.ts`)

---

## /api/science/protocol

- **Protocol Definition Retrieval (GET)** — Fetches a specific protocol item (exercise, rule, myth, scenario, trick, or reverse item) by module ID, kind, and item ID. _Use case:_ The module UI loads a single protocol step or exercise when the user expands it for detail.  (`src/app/api/science/protocol/route.ts`)
- **Protocol Evaluation (POST)** — Evaluates user inputs against a protocol item, returning both the protocol definition and the evaluation result. _Use case:_ After a user completes an exercise, the frontend submits their answers for graded feedback.  (`src/app/api/science/protocol/route.ts`)

---

## /api/science/refresh

- **Science Refresh Summary (GET)** — Returns the current evidence-source sync status and last-refresh metadata. _Use case:_ The command center status panel shows when sources were last synced and how many are healthy.  (`src/app/api/science/refresh/route.ts`)
- **Manual Evidence Source Refresh (POST)** — Triggers a fresh sync of all evidence sources and records the refresh event in the workflow store, returning both the sync result and refresh summary. _Use case:_ An admin manually triggers a source refresh from the command center when sources appear stale.  (`src/app/api/science/refresh/route.ts`)

---

## /api/science/report

- **Combined Science Report** — Returns a unified report merging the full learning journey and all evidence overviews, with a summary of module progress, total evidence claims, and live vs. failed source counts. _Use case:_ An admin or analytics view fetches this single endpoint to get a health snapshot of the entire Science Platform in one call.  (`src/app/api/science/report/route.ts`)

---

## /api/science/workflow

- **Workflow Store Retrieval (GET)** — Returns the workflow state for all modules or a specific module, including completed step IDs, selected item IDs for each content type, and guide seen state. _Use case:_ On page load, the module UI reads this to restore the user's last progress (which steps/rules/myths they already completed).  (`src/app/api/science/workflow/route.ts`)
- **Workflow Item Toggle (POST)** — Marks or unmarks a specific workflow item (step, rule, scenario, myth, trick, reverse, or exercise) as completed/selected for the given module. _Use case:_ When a user checks off a step or selects a rule in the module UI, the frontend persists that selection via this endpoint.  (`src/app/api/science/workflow/route.ts`)
- **Guide Seen Acknowledgment** — Special `guide` kind action records that the user has seen the module guide and optionally sets the guide emotion key. _Use case:_ The onboarding guide overlay calls this once dismissed so it does not reappear.  (`src/app/api/science/workflow/route.ts`)
- **Workflow Refresh Trigger** — Special `refresh` kind action records a refresh event for a module in the workflow store. _Use case:_ Module-level "refresh" buttons trigger this to log a timestamp without requiring a full evidence sync.  (`src/app/api/science/workflow/route.ts`)

---

## /api/search/archive

- **Internet Archive Search** — Searches the Internet Archive's advanced search for up to 6 items matching a query, returning normalized responses with identifier, title, creator, date, and direct archive.org links; 30-min cache. _Use case:_ Verification workflows use this to retrieve archived historical versions of documents or media to cross-check claim provenance.  (`src/app/api/search/archive/route.ts`)

---

## /api/search/claimbuster

- **ClaimBuster Claim-Worthiness Scoring (API)** — Sends text to the University of Texas Arlington ClaimBuster API, which scores each sentence 0–1 on check-worthiness and classifies it as NFS/UFS/CFS; 1-hour cache. _Use case:_ The exercise engine shows students which sentences in a piece of content are most in need of fact-checking.  (`src/app/api/search/claimbuster/route.ts`)
- **Local Claim-Worthiness Heuristic Fallback** — When no ClaimBuster API key is configured, applies a rule-based scoring heuristic (numbers, absolute language, causal claims, authority attribution) to sentences. _Use case:_ The endpoint degrades gracefully without an API key, still providing useful claim prioritization for offline or unconfigured deployments.  (`src/app/api/search/claimbuster/route.ts`)

---

## /api/search/evidence

- **Evidence Aggregator** — Wraps `aggregateEvidence()` across multiple academic databases (OpenAlex, Semantic Scholar, Crossref, EuropePMC, DOAJ) with optional Cohere reranking, returning up to 6 normalized results; free-first policy; 30-min cache. _Use case:_ Any verification workflow or SOVO orchestrator calls this as the primary multi-database academic evidence retrieval layer.  (`src/app/api/search/evidence/route.ts`)

---

## /api/search/factcheck

- **Google Fact Check Tools Search** — Queries the Google Fact Check Tools API for ClaimReview-backed fact-check verdicts matching a query, normalizes results with trust band assignment (Reuters/AFP/BBC/Snopes = Band A); 30-min cache. _Use case:_ The debunking pipeline calls this to surface existing professional fact-check verdicts for a given claim before generating a new analysis.  (`src/app/api/search/factcheck/route.ts`)

---

## /api/search/mediawiki

- **MediaWiki Orientation Search** — Searches English Wikipedia for up to 6 articles matching a query, returning normalized Band-C orientation results for entity discovery and terminology lookup; 15-min cache. _Use case:_ The verification pipeline uses Wikipedia results as the orientation layer to resolve entities and terminology, explicitly disclaiming it is not for final adjudication.  (`src/app/api/search/mediawiki/route.ts`)

---

## /api/search/ncbi

- **NCBI PubMed Biomedical Literature Search** — Uses NCBI E-utilities (ESearch + ESummary) to retrieve up to 6 PubMed articles by relevance, returning normalized Band-A results with title, authors, journal, publication type, and PubMed URL; 30-min cache. _Use case:_ Health-related verification queries use this endpoint as the primary biomedical evidence source.  (`src/app/api/search/ncbi/route.ts`)

---

## /api/search/openalex

- **OpenAlex Scholarly Works Search** — Queries the OpenAlex API for up to 6 academic works matching a query, normalizing results with author list, citation count, open-access status, and best access URL; 30-min cache. _Use case:_ The evidence aggregator and verification pipeline use OpenAlex as the second research-discovery layer for broader paper search beyond PubMed.  (`src/app/api/search/openalex/route.ts`)

---

## /api/search/reverse-image

- **Reverse Image Search (SerpApi Google Lens)** — Posts an image URL to SerpApi's Google Lens engine, returning up to 8 visual matches with domain, score, thumbnail, and a knowledge-graph identification if present; 1-hour cache. _Use case:_ Forensic workflows submit a suspected manipulated image URL to find where it first appeared online and establish provenance.  (`src/app/api/search/reverse-image/route.ts`)
- **Reverse Image Fallback Heuristic** — When no SerpApi key is configured, returns two structured placeholder matches noting the unconfigured state and a cross-platform repost risk warning. _Use case:_ The forensics UI degrades gracefully without API credentials, still educating the user about image re-post risks.  (`src/app/api/search/reverse-image/route.ts`)

---

## /api/search/semantic-scholar

- **Semantic Scholar Academic Search** — Queries the Allen Institute Semantic Scholar API for up to 8 papers, returning AI-generated TLDRs, citation counts, influential-citation counts, open-access PDF links, and trust band derived from citation impact; 30-min cache. _Use case:_ Students or researchers get instant plain-language AI summaries of complex academic papers alongside citation authority signals.  (`src/app/api/search/semantic-scholar/route.ts`)

---

## /api/search/veracity

- **Claim Veracity Analysis (External Backend)** — Posts a claim and optional context to a configurable external Veracity backend, returning verdict (refuted/supported/mixed/uncertain), confidence, explanation, and evidence list; 30-min cache. _Use case:_ The SOVO orchestrator and standalone verification UI call this as the primary claim-verdict layer when a dedicated veracity service is configured.  (`src/app/api/search/veracity/route.ts`)
- **Built-in Veracity Pattern Fallback** — When no backend is configured, matches the claim against hardcoded high-confidence patterns (5G/COVID, vaccines/autism, flat Earth, miracle cures) and returns sourced verdicts from those known patterns. _Use case:_ The endpoint handles the most common viral Egyptian misinformation patterns without any external dependency.  (`src/app/api/search/veracity/route.ts`)

---

## /api/sovo/analyze

- **SOVO Nexus Orchestrated Claim Analysis** — Full-pipeline POST endpoint that classifies the query via COVO router, fan-outs parallel calls to evidence, fact-check, and hadith APIs (8-second timeouts), then synthesizes a structured verdict with truth sandwich, scientific audit, Islamic audit, and cognitive defense using NVIDIA NIM (primary) or Gemini MegaRotator (fallback). _Use case:_ The main "analyze a claim" entry point for the Egyptian Awareness Library, providing a comprehensive dual-mandate (scientific + Islamic) fact-check in a single call.  (`src/app/api/sovo/analyze/route.ts`)
- **Citation Assembly** — Aggregates evidence, fact-check, and hadith results into a structured `citations` array attached to the response so the UI can render sourced footnotes. _Use case:_ Every SOVO result page renders a citations panel showing the real sources that informed the AI verdict, satisfying the One-Law no-unsourced-claims rule.  (`src/app/api/sovo/analyze/route.ts`)

---

## /api/srs

- **SRS Due Cards Retrieval (GET)** — Returns all spaced-repetition flash-cards due for review now for the passport-authenticated user, including total card count and due count. _Use case:_ The daily learning dashboard shows how many inoculation booster cards the user needs to review today to maintain cognitive immunity.  (`src/app/api/srs/route.ts`)
- **SM-2 Card Review Submission (POST)** — Accepts a `cardId` and quality score (0–5), runs the SM-2 spaced-repetition algorithm, persists the updated card state to KV store, and returns the next scheduled review date. _Use case:_ After a user answers a spaced-repetition booster card, the frontend submits their recall quality and the system schedules the next review interval accordingly.  (`src/app/api/srs/route.ts`)

---

## /api/whatsapp-analyzer

- **WhatsApp Message Manipulation Analysis** — Analyzes a WhatsApp message text for bot patterns, emotional framing hooks, urgency indicators, manipulation triggers, a 0–100 manipulation probability score, and an overall verdict (SAFE/SUSPICIOUS/DANGEROUS) using NVIDIA NIM (primary) or Gemini MegaRotator (fallback). _Use case:_ A user pastes a WhatsApp forward they received and immediately gets a structured assessment of whether it is a bot-generated chain message or emotional manipulation campaign.  (`src/app/api/whatsapp-analyzer/route.ts`)
- **Ready-to-Paste Bilingual Rebuttal** — Generates a short Arabic rebuttal (`arabicRebuttal`) and English rebuttal (`englishRebuttal`) suitable for copy-pasting directly back into WhatsApp to counter the misinformation with minimal friction. _Use case:_ A user who identifies a dangerous message can immediately share the AI-generated counter-message to their WhatsApp group without writing their own response.  (`src/app/api/whatsapp-analyzer/route.ts`)
- **Claim-Level Rating Extraction** — Extracts individual factual claims from the message text and provides per-claim ratings (verified/false/misleading/unverified) with confidence scores and explanations. _Use case:_ The analysis UI breaks down a complex message into its individual claims, allowing users to see which specific assertions are false vs. true.  (`src/app/api/whatsapp-analyzer/route.ts`)
