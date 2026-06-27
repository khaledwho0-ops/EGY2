# Engines & Libraries — slice lib-2

Files covered: items 43–84 (inclusive) from the ASCII-sorted `src/lib/**/*.ts` list.

---

## src/lib/debunking/fallacies-data.ts

- **Scientific Fallacy Taxonomy (25 entries)** — Defines 25 named scientific logical fallacies (Post Hoc, Cherry-Picking, Appeal to Nature, P-Hacking, Survivorship Bias, etc.) with id, description, domain, and example.  _Use case:_ The fallacy-detection engine and UI reference this catalogue to label which fallacy type a claim contains. (`src/lib/debunking/fallacies-data.ts`)
- **Islamic Fallacy Taxonomy (25 entries)** — Defines 25 Islamic-specific fallacies (Tahrif, Context Stripping, Unauthorized Takfir, Abrogation Fraud, Fabricated Hadith, Scholarly Cosplay, etc.) with bilingual examples.  _Use case:_ Religion-domain debunking pipeline uses this to expose misuse of religious texts and authority. (`src/lib/debunking/fallacies-data.ts`)
- **ALL_FALLACIES combined export** — Merges both scientific and Islamic arrays into a single iterable for domain-agnostic detection.  _Use case:_ Default domain-agnostic fallacy scan passes `ALL_FALLACIES` as the candidate set. (`src/lib/debunking/fallacies-data.ts`)

---

## src/lib/debunking/fallacy-engine.ts

- **Tier-1 Regex Detection** — Runs bilingual (English + Egyptian Arabic) regex patterns for all 50 fallacies against input text; returns matched fallacy + confidence + matched excerpt.  _Use case:_ Fastest, zero-latency tier of the detection pipeline — handles obvious patterns before LLM calls. (`src/lib/debunking/fallacy-engine.ts`)
- **Tier-2 TF-IDF Similarity** — Uses the `natural` library's TF-IDF to compare input text against fallacy name/description/example documents; returns hits with normalized similarity scores.  _Use case:_ Catches fallacies whose phrasing varies enough to miss regex but still shares vocabulary with the fallacy's description. (`src/lib/debunking/fallacy-engine.ts`)
- **Tier-3 Gemini Fallback Detection** — Sends text to `rotatingGenerateObject` with a structured Zod schema requesting JSON-formatted fallacy IDs only when Tiers 1+2 return nothing and text >80 chars.  _Use case:_ Last-resort semantic detection for novel or paraphrased fallacious arguments. (`src/lib/debunking/fallacy-engine.ts`)
- **3-Tier Hybrid `detectFallacies()`** — Orchestrates the three tiers in sequence, deduplicates by fallacy ID keeping highest confidence, sorts by confidence descending, and returns the final list.  _Use case:_ Single entry point called by debunking API routes and the live fact-check UI. (`src/lib/debunking/fallacy-engine.ts`)

---

## src/lib/debunking/gemini-rotator.ts

- **Multi-Provider Slot Builder** — Builds an ordered list of AI provider slots: Gemini (up to 7 keys), Groq (5), OpenRouter (2), Cerebras (2), Together (1), SambaNova (1), NVIDIA NIM last (5 keys, 550B model).  _Use case:_ All AI calls across the platform funnel through this to ensure there is always a live provider available. (`src/lib/debunking/gemini-rotator.ts`)
- **Per-Attempt Timeout Rotation Core** — Generic `rotate()` function with 28-second per-slot timeout, sliding cooldowns on 429/503 errors, and automatic advance to the next available slot.  _Use case:_ Prevents a single stuck provider (especially slow NVIDIA 550B) from blocking the entire request. (`src/lib/debunking/gemini-rotator.ts`)
- **`rotatingGenerateObject()`** — Structured JSON output generation (Zod-schema-validated) that runs through the full slot rotation; used by classifier, fallacy engine, and guardrails.  _Use case:_ Any feature that needs a reliably-shaped JSON response from an LLM uses this function. (`src/lib/debunking/gemini-rotator.ts`)
- **`rotatingGenerateText()`** — Plain-text generation through the full rotation; powers every chatbot endpoint that does not need structured output.  _Use case:_ Religion Hub chatbot, mental health chatbot, and any free-text AI response route. (`src/lib/debunking/gemini-rotator.ts`)
- **`getActiveGeminiModel()`** — Returns the next available Gemini model slot (non-cooldown) for streaming use-cases.  _Use case:_ Streaming routes that stream tokens directly to the browser pick a live Gemini key with this. (`src/lib/debunking/gemini-rotator.ts`)
- **`getActiveNvidiaModel()`** — Selects an available NVIDIA NIM key for routes that explicitly need Nemotron 550B.  _Use case:_ Routes requiring maximum analytical depth (BLACKBOX engine) use this to request the 550B model directly. (`src/lib/debunking/gemini-rotator.ts`)
- **`getNvidiaContentSafetyModel()` / `getNvidiaFastModel()`** — Returns the NVIDIA content-safety model (nemotron-3.5-content-safety) and the DeepSeek V4 Flash model respectively.  _Use case:_ Content safety screening pipeline and fast-inference routes use these targeted model accessors. (`src/lib/debunking/gemini-rotator.ts`)

---

## src/lib/debunking/guidelines.ts

- **Scientific Guideline Rules (6 rules)** — Defines PRISMA compliance, CONSORT compliance, COPE integrity, FAIR data standard, statistical power threshold, and p-value integrity rules with bilingual kill-codes and enforcement levels.  _Use case:_ Any claim about systematic reviews, clinical trials, or statistics is checked against these rules before passing to the user. (`src/lib/debunking/guidelines.ts`)
- **Islamic Guideline Rules (7 rules)** — Encodes the Amman Message (anti-Takfir), Makkah Declaration (anti-exclusivism), IIFA resolutions, AAOIFI standards (anti-Riba), Wathiqat Al-Azhar, Usul al-Fiqh integrity, and Maqasid al-Shariah as checkable pattern-rules.  _Use case:_ Islamic-domain responses are validated against these before surfacing to the user to block extremist or legally erroneous rulings. (`src/lib/debunking/guidelines.ts`)
- **AI Ethics Guidelines (2 rules)** — Algorithmic transparency (no black-box AI claims) and anti-concordism (forbids forcing Quran to validate science or vice versa).  _Use case:_ Every AI-generated answer is checked for these violations before display. (`src/lib/debunking/guidelines.ts`)
- **`validateAgainstGuidelines(text, domain)`** — Evaluates all applicable rules against the text using trigger patterns + co-occurrence absence logic; returns `PASS | FLAG | FAIL` and a list of `GuidelineViolation` objects.  _Use case:_ Called in the debunking pipeline on every claim and every AI output to enforce the EAL scientific standard. (`src/lib/debunking/guidelines.ts`)

---

## src/lib/debunking/preflight.ts

- **Egyptian Arabic Slang Normalizer** — Translates common Egyptian colloquial words (عشان→لأن, إزاي→كيف, etc.) to MSA equivalents before API search queries.  _Use case:_ Improves API search recall when Egyptian-dialect users submit claims in local dialect. (`src/lib/debunking/preflight.ts`)
- **Red-Direct Panic Detector** — Checks for crisis keywords (suicide, bomb, self-harm) and sets the `isRedDirectPanic` flag.  _Use case:_ Routes users who type crisis language directly to emergency support without running the debunking pipeline. (`src/lib/debunking/preflight.ts`)
- **URL Input Branch** — Detects if the raw user input is a URL, calls `extractUrlContent` to pull text, and sets `extractedTitle` / `sourceUrl` metadata.  _Use case:_ Lets users paste a news article URL instead of text — the pipeline reads the article automatically. (`src/lib/debunking/preflight.ts`)
- **`runPreflight(rawText)`** — Master pre-flight function that orchestrates normalization, panic detection, URL extraction, and Egyptian context classification into a single `PreflightContext` object.  _Use case:_ Every debunking request passes through this before the main AI analysis begins. (`src/lib/debunking/preflight.ts`)

---

## src/lib/debunking/workers/api-swarm.ts

- **OpenAlex Worker** — Fetches up to 3 academic papers from the OpenAlex API; decodes inverted-index abstracts into real text; assigns tier from URL classification.  _Use case:_ First academic source in the 5-parallel swarm for scientific claims. (`src/lib/debunking/workers/api-swarm.ts`)
- **EuropePMC Worker** — Fetches peer-reviewed biomedical records (resultType=core for real abstracts) from Europe PMC; assigns credibility score from tier and content depth.  _Use case:_ Second academic source in the swarm, specialized for medical/life-science claims. (`src/lib/debunking/workers/api-swarm.ts`)
- **AlQuran.cloud Worker** — Searches Quranic text for exact matches; returns surah/ayah reference with match count.  _Use case:_ Verifies whether a claimed Quranic quote actually exists in the text. (`src/lib/debunking/workers/api-swarm.ts`)
- **Hadith Authenticity Worker** — Calls HadithAPI.com (primary) and Dorar.net (fallback) to retrieve graded narrations; returns the grade (Sahih/Hasan/Da'if/Mawdu'), source, and text; returns null if neither yields a graded narration.  _Use case:_ Prevents ungraded or fabricated hadith from being treated as reliable evidence. (`src/lib/debunking/workers/api-swarm.ts`)
- **Google FactCheck Worker** — Queries Google's FactCheck Tools API; returns publisher rating (e.g. "False") and citation URL.  _Use case:_ For viral media claims already reviewed by professional fact-checkers. (`src/lib/debunking/workers/api-swarm.ts`)
- **`executeApiSwarm(query)`** — Runs all 5 workers in parallel via `Promise.allSettled` with 8-second AbortController-bounded timeouts; collects non-null results.  _Use case:_ Single entry point that debunking API routes call to gather all evidence in one parallel pass. (`src/lib/debunking/workers/api-swarm.ts`)
- **Tier-Derived Credibility Scoring (`deriveScore`)** — Maps EAL source tier (S/A/B/C/U) + content length to a numeric credibility score (0–100); penalizes thin or missing content.  _Use case:_ Ensures a real, rich abstract scores higher than a bare metadata hit of the same tier. (`src/lib/debunking/workers/api-swarm.ts`)

---

## src/lib/debunking/workers/hive-mind.ts

- **Medical Strike Team** — Queries OpenAlex and EuropePMC in parallel for scientific/medical claims; falls back to a "no evidence found" sentinel.  _Use case:_ Domain-specific evidence gathering when the claim is classified as MEDICAL. (`src/lib/debunking/workers/hive-mind.ts`)
- **Religious Strike Team** — Queries AlQuran.cloud for Quranic text matches; returns a zero-credibility sentinel if no source is found.  _Use case:_ Domain-specific evidence gathering for RELIGIOUS claims. (`src/lib/debunking/workers/hive-mind.ts`)
- **Media/OSINT Strike Team** — Queries Google FactCheck API; returns a zero-credibility absence sentinel when no coverage exists.  _Use case:_ Domain-specific evidence for MEDIA_DEEPFAKE and OSINT_PANIC threat classes. (`src/lib/debunking/workers/hive-mind.ts`)
- **AraBERT Cognitive Profiler** — Optionally calls Hugging Face Inference API (aubmindlab AraBERT) for NLP manipulation-vector detection; returns honest "unavailable" sentinel if no HF token is set.  _Use case:_ Runs alongside any strike team to add Arabic NLP signal to every debunking result. (`src/lib/debunking/workers/hive-mind.ts`)
- **`executeStrikeTeam(domain, query)`** — Selects the correct strike team by `ThreatDomain` and runs it alongside the cognitive profiler in parallel; returns the merged evidence array.  _Use case:_ Legacy hive-mind orchestration layer; newer code favours `api-swarm.ts` but this remains active. (`src/lib/debunking/workers/hive-mind.ts`)

---

## src/lib/debunking/workers/url-extractor.ts

- **URL Detector (`isUrl`)** — Regex test that identifies whether raw user input is an http/https URL.  _Use case:_ Preflight check before deciding whether to extract article content or treat input as direct text. (`src/lib/debunking/workers/url-extractor.ts`)
- **Jina Reader Web Extractor (`extractUrlContent`)** — Fetches page content via the free Jina Reader API (r.jina.ai); trims to 8000 chars; extracts a title from the first line; falls back to returning the raw URL if Jina fails.  _Use case:_ Lets users submit a URL to fact-check, automatically pulling the article text into the pipeline. (`src/lib/debunking/workers/url-extractor.ts`)

---

## src/lib/deployment/readiness-checklist.ts

- **Deployment Readiness Checklist** — Defines 17 named checks across 5 categories (expert sign-offs, technical APIs, data integrity, accessibility, legal/ethics) with blocking flags and pending/pass/fail statuses.  _Use case:_ Supervisor dashboard displays which checks remain before production deployment is permitted. (`src/lib/deployment/readiness-checklist.ts`)
- **Deployment Blocker Check (`isDeploymentBlocked`)** — Iterates the checklist and returns all blocking items that have not yet passed, plus a boolean `blocked` flag.  _Use case:_ CI/CD gate or supervisor UI widget shows exactly what must be done before launch. (`src/lib/deployment/readiness-checklist.ts`)
- **Readiness Summary (`getReadinessSummary`)** — Aggregates total/passed/failed/pending counts and a percentage; includes `canDeploy` flag.  _Use case:_ Dashboard widget shows a single progress bar for deployment readiness. (`src/lib/deployment/readiness-checklist.ts`)

---

## src/lib/evidence/aggregate.ts

- **OpenAlex Fetcher** — Retrieves up to 8 scholarly works; normalizes to `NormalizedAPIResponse` with open-access flag, trust band, and author metadata.  _Use case:_ First parallel source in the 7-API evidence aggregator. (`src/lib/evidence/aggregate.ts`)
- **Semantic Scholar Fetcher** — Fetches papers with TLDR summaries, citation counts, and open-access PDF links; assigns trust band based on citation count.  _Use case:_ Adds concise paper summaries and citation-based credibility signal. (`src/lib/evidence/aggregate.ts`)
- **Crossref Fetcher** — Retrieves DOI metadata including journal, author, and citation count; marked `paid` access tier, ranked last unless `includePaid` is set.  _Use case:_ DOI-discovery fallback when open-access routes are exhausted. (`src/lib/evidence/aggregate.ts`)
- **EuropePMC Fetcher** — Returns biomedical literature with full open-access routes; uses `isOpenAccess` flag for tier assignment.  _Use case:_ Biomedical and health-science claims get full-text sources through this route. (`src/lib/evidence/aggregate.ts`)
- **DOAJ Fetcher** — Searches the Directory of Open Access Journals; all results are free/open-access, trust band A.  _Use case:_ Guarantees at least one fully open route for academic evidence. (`src/lib/evidence/aggregate.ts`)
- **arXiv Fetcher** — Parses arXiv Atom XML to extract preprint entries with PDF links; trust band B (pre-review).  _Use case:_ Covers cutting-edge scientific preprints not yet in peer-reviewed journals. (`src/lib/evidence/aggregate.ts`)
- **CORE Fetcher** — Queries CORE repository aggregator; has full-text download URLs; trust band A when `downloadUrl` present.  _Use case:_ Catches open-access papers from institutional repositories missed by other sources. (`src/lib/evidence/aggregate.ts`)
- **`aggregateEvidence(query, opts)`** — Runs all 7 fetchers in parallel, trust-scores results, filters to free/open-access first, then Cohere-reranks by semantic relevance; returns top-N results.  _Use case:_ Used by the evidence API route and the `runVerificationPipeline` so every chatbot answer has real scholarly grounding. (`src/lib/evidence/aggregate.ts`)

---

## src/lib/export/reporting.ts

- **Awareness Report Builder (`buildAwarenessReport`)** — Constructs a full `AwarenessReport` object from a `ParticipantSnapshot`, inferring strongest skill, focus area, estimated bias, badge, and 6-dimension vulnerability fingerprint.  _Use case:_ Called when a participant finishes the study to produce their personal awareness report. (`src/lib/export/reporting.ts`)
- **Vulnerability Dimension Scoring** — Computes 6 domain vulnerability scores (health, religion, politics, economy, science, social) from exercise ratios, assessment shifts, and behavioral metrics.  _Use case:_ Radar-chart display in the report showing where the user is most susceptible to misinformation. (`src/lib/export/reporting.ts`)
- **Report Serialization/Deserialization** — Encodes the report to a URL-safe Base64 token for shareable links; decodes and validates expiry (90-day links).  _Use case:_ Participant clicks "Share my report" and gets a link that can be opened by the supervisor or shared on social media. (`src/lib/export/reporting.ts`)
- **Shareable Link Generator** — Combines origin URL with the Base64 report token into a full `/report/<token>` URL.  _Use case:_ Produces the link handed to participants at study completion. (`src/lib/export/reporting.ts`)
- **Report Checkpoint Persistence** — Saves/retrieves up to 20 `ReportCheckpoint` entries in `localStorage` keyed by trigger type (manual/checkpoint/session_end).  _Use case:_ Auto-saves report state so users don't lose progress if they close the browser mid-session. (`src/lib/export/reporting.ts`)
- **Printable HTML Report Generator (`buildPrintableReportHtml`)** — Produces a self-contained A4 HTML page with metric cards, score-summary table, vulnerability bars, privacy policy section, and share card; supports RTL Arabic.  _Use case:_ Participant presses "Print / Save PDF" and gets a polished bilingual awareness certificate. (`src/lib/export/reporting.ts`)

---

## src/lib/forensics/ocr.ts

- **Bilingual OCR Engine (`ocrImage`)** — Uses Tesseract.js with English + Arabic language data to extract text from an image buffer; caches the worker process-wide.  _Use case:_ Viral screenshot misinformation is Egypt's primary misinformation vector — this extracts the claim text so it can be verified. (`src/lib/forensics/ocr.ts`)

---

## src/lib/gamification/celebrations.ts

- **Confetti Celebration Effect (`celebrateProgress`)** — Fires canvas-confetti animations scaled by badge count, level-up flag, and track-completion flag; uses dual side-burst for large events.  _Use case:_ Played after exercise completion, badge unlocks, or full MVP track completion to reward learners. (`src/lib/gamification/celebrations.ts`)

---

## src/lib/gamification/xp-engine.ts

- **XP Reward Table** — Defines XP values for 8 event types (exercise_complete=100, gate_verified=50, streak_bonus=200, badge_unlock=150, assessment_complete=300, source_verified=25, mvp_complete=1000, perfect_score=500).  _Use case:_ Every gamified action awards XP at rates calibrated for a 14-day engagement arc. (`src/lib/gamification/xp-engine.ts`)
- **9-Level Progression System** — Level thresholds from Novice (0 XP) to Master (12 000 XP) with names and icons.  _Use case:_ Displays current level name and icon in the player dashboard. (`src/lib/gamification/xp-engine.ts`)
- **21-Badge Registry** — Three sets of 7 domain-specific badges (DeepReal, Mental Health, Religion Hub) with unlock requirements.  _Use case:_ Badge wall on the player profile; unlocked badges are shown as achievements. (`src/lib/gamification/xp-engine.ts`)
- **`awardXP()` with Deduplication** — Awards XP for an event, checks a dedupe key to prevent double-awards, updates streak, fires badge-unlock check, recalculates level, and saves to `localStorage`.  _Use case:_ Called by every exercise completion, source verification click, and assessment submission. (`src/lib/gamification/xp-engine.ts`)
- **`getCohortStats()`** — Returns average completion, top streak, and participant count from a `localStorage` cohort snapshot; flags `isSample=true` when real multi-user data is absent.  _Use case:_ Social-proof display ("17 participants active this week") on the home page. (`src/lib/gamification/xp-engine.ts`)
- **Level Progress Calculator (`getLevelProgress`)** — Returns progress percentage toward the next level threshold.  _Use case:_ XP progress bar in the player dashboard. (`src/lib/gamification/xp-engine.ts`)

---

## src/lib/i18n/arabic-gate.ts

- **Scale Validation Registry** — Tracks Arabic-translation validation status for 6 psychometric instruments (MIST-20, MHLS, GHSQ, Brief RCOPE, SUS, MC-SDS) with validation type and date.  _Use case:_ Prevents unvalidated Arabic translations from being shown to Arabic-language participants. (`src/lib/i18n/arabic-gate.ts`)
- **`isArabicSafe(scaleId)`** — Returns true only when a scale has an approved Arabic translation.  _Use case:_ UI conditionally renders Arabic or English instrument based on this gate. (`src/lib/i18n/arabic-gate.ts`)
- **`getScaleLanguage(scaleId, userLang)`** — Determines the correct language to render a scale in, respecting the user's preference and the validation gate.  _Use case:_ Scale components call this before rendering questions to select the correct language variant. (`src/lib/i18n/arabic-gate.ts`)
- **Validation Badge Generator (`getValidationBadge`)** — Returns a label and color pair indicating "AR ✓ Full", "AR ✓ Back-Trans", or "AR ⚠ Pending".  _Use case:_ Displays Arabic validation status badge on the supervisor assessment checklist. (`src/lib/i18n/arabic-gate.ts`)

---

## src/lib/kv/index.ts

- **KV Subsystem Init** — Trivial placeholder that logs initialization of the KV cognitive kernel subsystem.  _Use case:_ Module initialization hook; no real logic. (`src/lib/kv/index.ts`)

---

## src/lib/kv/ratelimit.ts

- **Three-Rule Rate Limiter Config** — Defines sliding-window rules for chat (8/60s), debunker (4/hour), and MIST (1/24h); no crisis limit ever applied.  _Use case:_ Prevents prompt-injection spam and frivolous expensive AI calls while keeping crisis support unrestricted. (`src/lib/kv/ratelimit.ts`)
- **Dual-Backend Enforcement (`enforce`)** — Uses Vercel KV (Upstash sliding window) when configured; falls back to in-memory map when KV is absent; fail-opens to in-memory on any KV error.  _Use case:_ Rate-limiting works in local dev (in-memory) and in production (KV) without code changes or 500 errors. (`src/lib/kv/ratelimit.ts`)

---

## src/lib/nlp/arabic-analysis.ts

- **Arabic Dialect Detector** — Heuristic classifier distinguishing Egyptian dialect, MSA, or mixed based on hit counts for marker words.  _Use case:_ Adapts response style when the system detects Egyptian Arabic input. (`src/lib/nlp/arabic-analysis.ts`)
- **Arabic Sentiment + Entity Extraction (`analyzeArabicText`)** — Calls a configurable CAMeL Tools microservice backend; falls back to a keyword-based analyser for negative/positive/neutral sentiment, risk flags, emotion triggers, and named entities.  _Use case:_ Provides Arabic-language sentiment analysis for the debunking pipeline without requiring the external backend. (`src/lib/nlp/arabic-analysis.ts`)
- **Risk Flag Detection** — Checks text against suicide/self-harm Arabic phrase patterns and raises `riskFlags`.  _Use case:_ Triggers the Red-Direct Protocol when Arabic crisis language is detected. (`src/lib/nlp/arabic-analysis.ts`)

---

## src/lib/nlp/sentiment-engine.ts

- **VADER Sentiment Analysis** — Uses `vader-sentiment` to compute compound, positive, negative, neutral polarity scores for English text.  _Use case:_ Baseline sentiment signal for the manipulation score formula. (`src/lib/nlp/sentiment-engine.ts`)
- **Manipulation Score Formula** — Computes `|compound| × 40 + emotionalTriggers × 7 + persuasionPatterns × 12` clamped to 0–100.  _Use case:_ Displays a manipulation meter on every analyzed claim to help users recognize emotional exploitation. (`src/lib/nlp/sentiment-engine.ts`)
- **Flesch-Kincaid Readability** — Computes readability grade level via `text-readability`.  _Use case:_ Low readability on a health claim can indicate content designed to confuse rather than inform. (`src/lib/nlp/sentiment-engine.ts`)
- **Naive Bayes Crisis Classifier** — Trains a small in-process Bayes model on crisis and non-crisis sentence corpora; classifies text into `crisisDetected + crisisConfidence`; handles regex direct-risk patterns and buffered-language exclusions.  _Use case:_ Detects suicidal ideation in user-typed text to trigger crisis routing without a network call. (`src/lib/nlp/sentiment-engine.ts`)
- **Wink NLP Entity Extraction** — Uses `wink-nlp` to extract named entities and emotionally-weighted tokens.  _Use case:_ Shows which specific words drove the manipulation score in the UI. (`src/lib/nlp/sentiment-engine.ts`)
- **`getSentimentBadge(result)`** — Returns a color-coded badge label (Crisis-sensitive / High emotional load / Moderate / Hope-bait / Low) from the sentiment result.  _Use case:_ Sentiment badge rendered next to every analyzed claim in the debunker UI. (`src/lib/nlp/sentiment-engine.ts`)

---

## src/lib/obs/metrics.ts

- **Privacy-First Event Counter (`incr`)** — Increments a named event counter in the KV store; records only that an event happened, never what content was involved.  _Use case:_ Tracks "debunker used", "crisis detected", etc. for operational monitoring without privacy violation. (`src/lib/obs/metrics.ts`)
- **`getCounts()`** — Reads all event counter values from KV.  _Use case:_ Observability dashboard shows event frequency without any user data. (`src/lib/obs/metrics.ts`)

---

## src/lib/orchestration/covo-router.ts

- **Emotional Intent Scoring (`computeEmotionalIntentScore`)** — Computes a 0–1 Emotional Intent Score (EIS) from fear/guilt/superiority keyword densities using a three-vector heuristic.  _Use case:_ Quickly scores a query's emotional manipulation level before deciding which analysis branch to use. (`src/lib/orchestration/covo-router.ts`)
- **Emotional Route Decision (`determineRoute`)** — Routes queries with EIS > 0.7 to the CalmReveal component, others to the full debunking god-system pipeline.  _Use case:_ High-emotion inputs are handled gently; analytical inputs go to the full pipeline. (`src/lib/orchestration/covo-router.ts`)
- **`CovoRouter.analyzeQuery(text)`** — Single entry point returning EIS, vector breakdown, route path, and `highEmotionalManipulation` flag.  _Use case:_ Called at the top of the debunking flow to determine UI path before evidence gathering begins. (`src/lib/orchestration/covo-router.ts`)

---

## src/lib/osint/dom-parser.ts

- **HTML-to-Markdown Extractor (`extractCleanMarkdown`)** — Uses Cheerio to strip scripts/styles/media, replace heading/link/list tags with pseudo-markdown, and truncate to 8 000 chars.  _Use case:_ Converts scraped article HTML to clean text that can be passed to an LLM without blowing the token budget. (`src/lib/osint/dom-parser.ts`)

---

## src/lib/osint/search-tool.ts

- **DuckDuckGo Meta-Search (`executeMetaSearch`)** — Fetches DuckDuckGo HTML Lite results, parses `.result` nodes with Cheerio, extracts and decodes `uddg=` redirect URLs, and gracefully degrades on rate-limit (429) to an empty array.  _Use case:_ Provides a free, keyless web search for the OSINT investigator and debunking pipeline's lateral-reading step. (`src/lib/osint/search-tool.ts`)

---

## src/lib/pedagogy/addie-sam-validator.ts

- **ADDIE Pipeline Validator** — Checks that all five phases (Analysis, Design, Development, Implementation, Evaluation ≥80%) are complete; returns the first blocking phase.  _Use case:_ Ensures new learning modules pass instructional-design quality gates before launch. (`src/lib/pedagogy/addie-sam-validator.ts`)
- **SAM Agility Validator** — Checks that the latest SAM iteration has deployed a prototype, active feedback loop, and applied refinements.  _Use case:_ Agile iteration check for the rapid prototyping cycles on new exercise sets. (`src/lib/pedagogy/addie-sam-validator.ts`)

---

## src/lib/pipeline/verify.ts

- **`runVerificationPipeline(claim)`** — Gathers evidence from two channels (academic via `aggregateEvidence` + best-effort web via DuckDuckGo + Cheerio title extraction), Cohere-reranks the combined pool, then calls `enforceOneLaw` to classify which sources are admissible.  _Use case:_ Every chatbot answer and fact-check surface calls this so no response is sent without real sourced evidence. (`src/lib/pipeline/verify.ts`)

---

## src/lib/progress/progress-service.ts

- **Exercise Completion Recorder** — Persists exercise completion with score, time, confidence pre/post, COM-B target/mechanism, and streak updates to `localStorage`.  _Use case:_ Tracks every exercise outcome for both gamification and research data export. (`src/lib/progress/progress-service.ts`)
- **Assessment Completion Recorder** — Stores psychometric instrument results (MIST-20, MHLS, GHSQ, etc.) with phase (pre/post) and score breakdown.  _Use case:_ Pre/post assessment scores are required for hypothesis testing. (`src/lib/progress/progress-service.ts`)
- **Trust Calibration Recorder** — Stores TCE/AFS/AOI/ETS/CTCS scores at baseline, midpoint, and post phases.  _Use case:_ The §17.7 trust calibration battery data powers the trust-shift metrics in the supervisor dashboard. (`src/lib/progress/progress-service.ts`)
- **Source Click + Prompt Usage Trackers** — Records every source open and prompt use event with context (exercise/registry/keyhunter).  _Use case:_ Research dependent variable: how many sources did participants actually verify? (`src/lib/progress/progress-service.ts`)
- **Verification Event Logger** — Logs 8-Gate checks, friction overlays, and bias reflections with gates-filled count and skip flag.  _Use case:_ Measures verification behavior depth — key behavioral outcome variable. (`src/lib/progress/progress-service.ts`)
- **Progress CSV/JSON Export** — Serialises all tracked events (exercises, assessments, trust calibration, source clicks, prompts, verification) to CSV or JSON.  _Use case:_ Supervisor downloads participant data at study close for statistical analysis. (`src/lib/progress/progress-service.ts`)
- **Correction Ledger** — Records claim-correction pairs (up to 25) when users self-correct a belief.  _Use case:_ Qualitative research data on belief-updating moments. (`src/lib/progress/progress-service.ts`)

---

## src/lib/progression/drip-ui.ts

- **Day Unlock Gate (`isDayUnlocked`)** — Currently returns `true` for all 14 days (time-gate disabled for pilot); original 24h-per-day logic documented inline.  _Use case:_ Pilot evaluators and participants can access all content immediately; logic restores time-gating for production. (`src/lib/progression/drip-ui.ts`)
- **Day Completion Marker (`markDayCompleted`)** — Stores completion timestamp for a day in `localStorage`; initialises enrollment date on first call.  _Use case:_ Enables future time-gating and streak calculation at day granularity. (`src/lib/progression/drip-ui.ts`)
- **Drip Status Reader (`getDripStatus`)** — Returns 14-item array with `day`, `unlocked`, `completed`, `completedAt` for the curriculum progress view.  _Use case:_ Curriculum map component renders locked/unlocked/completed state for each of the 14 days. (`src/lib/progression/drip-ui.ts`)

---

## src/lib/prompts/prompt-engine.ts

- **Variable Interpolation (`interpolatePrompt`)** — Replaces `{variable_name}` tokens in prompt templates with user-supplied values; uses `[variable_name]` placeholder for missing vars.  _Use case:_ Pre-built prompt templates are personalised with user inputs before sending to the LLM. (`src/lib/prompts/prompt-engine.ts`)
- **Guardrail Checker (`checkGuardrails`)** — Blocks diagnosis language (MH-P02), fatwa-request language (RH-P04), and self-harm content (all MVPs); returns violation message and optional redirect to crisis support.  _Use case:_ Every prompt submission is checked before API call to prevent the platform from inadvertently providing clinical diagnosis or religious rulings. (`src/lib/prompts/prompt-engine.ts`)
- **Emotional Trigger Analyser (`analyzeEmotionalTriggers`)** — Tokenises text and maps each word to an emotion class (anger/fear/sadness/disgust) for highlighted display.  _Use case:_ Exercises highlight emotionally loaded words in a claim to teach students to recognize manipulation. (`src/lib/prompts/prompt-engine.ts`)
- **Pre-Built Prompt Templates (4 samples)** — Defines SIFT Verification (DR-P01), Lateral Reading Plan (DR-P04), Mental Health Term Explainer (MH-P01), and Positive Coping Reflection (RH-P01) with required variables and guardrail annotations.  _Use case:_ Prompt library page lets students submit evidence-based queries with structured scaffolding. (`src/lib/prompts/prompt-engine.ts`)

---

## src/lib/provenance/index.ts

- **Provenance Subsystem Init** — Trivial placeholder that logs initialization.  _Use case:_ Module init hook; no real logic. (`src/lib/provenance/index.ts`)

---

## src/lib/provenance/wayback.ts

- **Wayback Machine Archiver (`saveSnapshot`)** — Submits a URL to the Internet Archive Save Page Now API with idempotency (KV-backed 24-hour cache); polls job status up to 12 times at 5s intervals; returns the archived URL.  _Use case:_ When a source is cited in an EAL answer, the system archives it so the link remains resolvable even if the original page is deleted. (`src/lib/provenance/wayback.ts`)

---

## src/lib/registry/source-freshness.ts

- **Source Freshness Classifier (`checkFreshness`)** — Categorises a source as fresh (0–30 days), aging (31–60), stale (61–90), or critical (>90) with a recommended action message.  _Use case:_ Sources not re-verified within 90 days are hidden from user-facing display until reviewed. (`src/lib/registry/source-freshness.ts`)
- **Batch Freshness Audit (`auditSourceFreshness`)** — Runs `checkFreshness` across all sources and returns a `FreshnessStatus` array.  _Use case:_ Supervisor dashboard runs this at page load to show the source health panel. (`src/lib/registry/source-freshness.ts`)
- **Freshness Summary Stats (`getFreshnessSummary`)** — Returns total/fresh/aging/stale/critical counts and a health percentage.  _Use case:_ Single-number "Source Health" metric shown in the deployment readiness panel. (`src/lib/registry/source-freshness.ts`)

---

## src/lib/registry/source-registry.ts

- **Trust Band Calculator** — Maps a numeric score (0–14) to trust bands A/B/C/rejected per §19.2 scoring rubric.  _Use case:_ Sources are graded and their band determines display order and access tier. (`src/lib/registry/source-registry.ts`)
- **Filterable Source Query (`getSources`)** — Filters and sorts the 100-source registry by MVP, trust band, visibility tier, role, and text search; returns A-first sorted results.  _Use case:_ Trusted Sources Directory page uses this to let users browse and search sources. (`src/lib/registry/source-registry.ts`)
- **Topic Source Selector (`getTopicSources`)** — Returns exactly 1 primary + 1 comparative + 1 methodological source for a given MVP per §19.5 operational rule.  _Use case:_ Exercise pages pull exactly three sources per topic to avoid overwhelming the learner. (`src/lib/registry/source-registry.ts`)
- **Source Count Stats** — `getSourceCountsByBand` and `getSourceCountsByMVP` return distribution breakdowns.  _Use case:_ Supervisor health dashboard shows source distribution across trust bands and MVPs. (`src/lib/registry/source-registry.ts`)

---

## src/lib/religion/asbab.ts

- **Asbab Al-Nuzul Registry** — Returns verified revelation-context records for specific surah:ayah pairs; fails loud with `found:false` when no sourced record exists rather than guessing classification.  _Use case:_ Context-stripping fallacy prevention — ensures verses are never displayed without their historical revelation context. (`src/lib/religion/asbab.ts`)

---

## src/lib/religion/fatwa-context.ts

- **Fatwa Source Analyser (`FatwaContextEngine.analyzeFatwaSource`)** — Classifies a fatwa's source URL as Dar Al-Ifta, Al-Azhar, Unverified/SocialMedia, or unknown; flags TikTok/WhatsApp sources as social-media anomalies.  _Use case:_ Prevents viral TikTok fatwas from being treated with the same authority as official Egyptian theological bodies. (`src/lib/religion/fatwa-context.ts`)

---

## src/lib/religion/hadith-check.ts

- **Hadith Takhrij Engine (`HadithTakhrijEngine.verifyAttribution`)** — Detects known fabrication patterns; returns Mawdu' classification for matches; returns `isAuthentic: null` and `غير موثّق` classification for all other texts, refusing to default to Sahih.  _Use case:_ Prevents fabricated hadith from appearing as authenticated — central to the One-Law Islamic authenticity protocol. (`src/lib/religion/hadith-check.ts`)

---

## src/lib/religion/nasikh-mansukh.ts

- **Nasikh/Mansukh Registry** — Returns abrogation status (Nasikh/Mansukh/Muhkam) for specific surah:ayah pairs with scholar consensus; fails loud with `found:false` and `Unknown` status when no sourced record exists.  _Use case:_ Prevents Abrogation Fraud fallacy — ensures abrogated verses cannot be cited as current binding law. (`src/lib/religion/nasikh-mansukh.ts`)

---

## src/lib/religion/quran.ts

- **Verse Loader (`loadAyat`)** — Fetches Quranic verses by surah and ayah range from the AlQuran.cloud API (Asad English translation).  _Use case:_ Religion Hub exercises display real Quranic text fetched from an authoritative API rather than hardcoded strings. (`src/lib/religion/quran.ts`)
- **Range Parser (`parseRange`)** — Converts "190-193" notation to an array of ayah numbers.  _Use case:_ Exercise configurations specify verse ranges in compact string form. (`src/lib/religion/quran.ts`)

---

## src/lib/religion/tafsir.ts

- **Classical Commentary Loader (`loadCommentaries`)** — Returns commentary from four authorities (Tabari, Ibn Kathir, Qurtubi, Al-Mizan) for hardcoded flagship surah 2:190–193; falls back to generic text for other verses.  _Use case:_ The cognitive case study exercise on defensive warfare verses shows four independent scholarly interpretations to illustrate scholarly diversity. (`src/lib/religion/tafsir.ts`)

---

## src/lib/research/anonymization.ts

- **Async Participant ID Anonymizer (`anonymizeParticipantId`)** — SHA-256 hashes the participant ID with a project namespace; works in browser (SubtleCrypto) and server (FNV fallback) environments.  _Use case:_ All research exports replace raw participant IDs with one-way hashes before leaving the client. (`src/lib/research/anonymization.ts`)
- **Sync Server-Side Hash (`hashParticipantId`)** — Node.js `crypto` SHA-256 version of the same hash for API routes.  _Use case:_ Assessment submission API routes anonymize participant data before storage. (`src/lib/research/anonymization.ts`)
- **Entity Anonymizer (`anonymizeParticipantEntity`)** — Applies ID anonymization to any object with a `participantId` field.  _Use case:_ Batch export endpoint anonymizes a full cohort array in one call. (`src/lib/research/anonymization.ts`)

---

## src/lib/research/research-governance.ts

- **Research Governance State** — Tracks participant language, source policy confirmation, 4 crisis-directory re-checks, and 3 domain reviewer sign-offs in `localStorage`.  _Use case:_ Supervisor must confirm all governance items before the platform is unlocked for participant deployment. (`src/lib/research/research-governance.ts`)
- **Participant Launch Gate (`getParticipantLaunchGate`)** — Returns `ready: false` with a list of specific blockers (missing sign-offs, unconfirmed hotlines, Arabic gate still open).  _Use case:_ The "Ready to Launch" button on the supervisor dashboard is disabled until this returns `ready: true`. (`src/lib/research/research-governance.ts`)

---

## src/lib/research/research-ops.ts

- **`buildParticipantSnapshot()`** — Aggregates all `UserProgress` data into a flat, typed `ParticipantSnapshot` including exercise counts, assessment scores and shifts, trust calibration, verification behavior, and composite improvement score.  _Use case:_ The core research data collection function — called to capture participant state at any point during the study. (`src/lib/research/research-ops.ts`)
- **Paired t-Test Engine (`runPairedTTest`)** — Implements a paired t-test (differences method) with Cohen's d effect size and a numerical Student's t CDF via regularized incomplete beta function.  _Use case:_ Tests H1–H4 (MIST/MHLS/GHSQ/RCOPE pre-post shifts) in the supervisor analytics dashboard. (`src/lib/research/research-ops.ts`)
- **Welch's t-Test Engine (`runWelchTTest`)** — Unequal-variance t-test between two independent groups with Welch-Satterthwaite degrees of freedom.  _Use case:_ Tests H5: tri-module vs. single-module participant composite improvement. (`src/lib/research/research-ops.ts`)
- **Supervisor Analytics Builder (`buildSupervisorAnalytics`)** — Compiles cohort completion rate, SUS pass rate, per-engine analytics, 5-hypothesis statistical test results, and source-ops health into a single `SupervisorAnalytics` object.  _Use case:_ The supervisor dashboard renders all study metrics from this single function call. (`src/lib/research/research-ops.ts`)
- **Cohort CRUD** — `upsertParticipantSnapshot`, `getResearchCohort`, `removeParticipantSnapshot` manage the multi-participant cohort array in `localStorage`.  _Use case:_ Admin import screen adds participant exports; supervisor can remove test entries before analysis. (`src/lib/research/research-ops.ts`)
- **Participant Import (`importParticipantJsonText`)** — Accepts raw JSON that may be either a `UserProgress` object or a `ParticipantSnapshot`; normalizes to snapshot format.  _Use case:_ Supervisor imports participant exports from offline studies or emailed data files. (`src/lib/research/research-ops.ts`)

---

## src/lib/routing/cross-mvp-router.ts

- **5 Handoff Scenario Definitions** — Defines scenario HO-01 through HO-05 covering viral-health-claim, guilt-as-faith-failure, alarming-religious-content, self-diagnosis thread, and fear-manipulation clip situations; each specifies a first-to-second MVP transition with keyword triggers and suggested exercise day.  _Use case:_ Users who finish one engine's exercise are offered a bridge to a related engine when their content triggers a handoff. (`src/lib/routing/cross-mvp-router.ts`)
- **`detectHandoff(currentMVP, content, responses)`** — Keyword-match filter (≥2 hits) that returns applicable handoff scenarios for the current MVP and exercise content.  _Use case:_ At exercise completion, the system checks for handoff triggers and displays a contextual "Would you like to explore this from another angle?" prompt. (`src/lib/routing/cross-mvp-router.ts`)
- **MVP Identity Registry** — Defines the role, core question, and transformation narrative for each of the 3 engines (DeepReal / Mental Health / Religion Hub).  _Use case:_ On-boarding and handoff UI display these descriptors so users understand what each engine does. (`src/lib/routing/cross-mvp-router.ts`)
