# Engines & Libraries — slice lib-1

Files covered: items 1–42 of `src/lib/**/*.ts` (ASCII-sorted).

---

## src/lib/agents/

### agents/types.ts
- **AgentProfile type** — Defines the shape of an AI debunking agent (id, name, nameAr, role, avatar, specialty, tools list). _Use case:_ Shared type contract consumed by every component that renders or invokes an agent. (`src/lib/agents/types.ts`)
- **AgentResult type** — Captures one agent's findings, confidence score, and sources from a single investigation run. _Use case:_ Collected after each agent runs so the orchestrator can merge results. (`src/lib/agents/types.ts`)
- **InvestigationReport type** — Full multi-agent verdict envelope (claim, per-agent results, overallVerdict, layers_detected). _Use case:_ The return type for the debunking pipeline; consumed by report-rendering UI. (`src/lib/agents/types.ts`)

### agents/profiles.ts
- **Source Hunter agent profile** — Preconfigured agent that traces claim origins via OpenAlex, EuropePMC, Snopes, IFCN, and Google Fact Check API. _Use case:_ Used as the first stage of the multi-agent debunking pipeline to find Patient Zero of a misinformation item. (`src/lib/agents/profiles.ts`)
- **Bias Detector agent profile** — Preconfigured agent running 180+ cognitive-bias framework, logical-fallacy classifier, and sentiment polarity analysis. _Use case:_ Second stage of the debunking pipeline; identifies rhetorical manipulation embedded in a claim. (`src/lib/agents/profiles.ts`)
- **Arabic Linguist agent profile** — Preconfigured agent specializing in Egyptian-Arabic dialect manipulation detection, religious-text verification, and translation-distortion scanning. _Use case:_ Analyzes claims in Egyptian Arabic for culturally-specific misinformation markers. (`src/lib/agents/profiles.ts`)
- **Timeline Builder agent profile** — Preconfigured agent mapping chronological spread, virality curves, bot-network fingerprints, and amplification nodes. _Use case:_ Tracks how a misinformation item spread and who amplified it. (`src/lib/agents/profiles.ts`)
- **Counter-Narrative Expert agent profile** — Preconfigured agent that crafts culturally-appropriate rebuttals using Truth Sandwich, Inoculation Theory, and Egyptian cultural context. _Use case:_ Final stage of debunking pipeline; generates shareable Arabic/English counter-messages. (`src/lib/agents/profiles.ts`)

---

## src/lib/ai/__tests__/

### ai/__tests__/cohere-rerank.test.ts
- **cohereRerank unit tests** — Offline Vitest suite proving the reranker returns correct scored ordering on success and falls back safely (null) on missing key, empty input, or network failure. _Use case:_ CI gate that ensures the reranker never breaks the pipeline. (`src/lib/ai/__tests__/cohere-rerank.test.ts`)
- **rerankBy unit tests** — Proves the typed-array wrapper reorders items by Cohere relevance and returns the original order when unavailable. _Use case:_ Protects callers that depend on fail-safe ordering behavior. (`src/lib/ai/__tests__/cohere-rerank.test.ts`)

### ai/__tests__/output-enforcer.test.ts
- **One Law enforcement tests** — 10-case Vitest suite proving enforceOneLaw correctly accepts Tier S–C sources, rejects Tier-U or malformed URLs, and prioritizes stronger tiers. _Use case:_ CI enforcement of the project's core anti-hallucination rule. (`src/lib/ai/__tests__/output-enforcer.test.ts`)
- **enforceSourcedOutput tests** — Tests the combined shape+law validator on well-formed and ill-formed payloads. _Use case:_ Verifies that AI route handlers correctly reject unsourced structured outputs. (`src/lib/ai/__tests__/output-enforcer.test.ts`)
- **applyVerdictEnforcement tests** — Proves verdict passthrough when admissible source exists, and downgrades to UNVERIFIED (confidence ≤ 0.2) when not. _Use case:_ Guards every AI-generated verdict label from being presented as fact without a source. (`src/lib/ai/__tests__/output-enforcer.test.ts`)

---

## src/lib/ai/

### ai/cohere-rerank.ts
- **cohereRerank** — Low-level fetch to Cohere `rerank-v3.5` (multilingual) that returns scored index ordering or null on any failure; 8-second timeout with AbortSignal. _Use case:_ Re-orders retrieved evidence/sources by true semantic relevance to the user's query in Arabic or English. (`src/lib/ai/cohere-rerank.ts`)
- **rerankBy** — Typed wrapper around `cohereRerank` that accepts a generic array plus a text-extractor and returns the array reordered by Cohere relevance; falls back to original order. _Use case:_ Drop-in enhancement for any search result list (evidence, sources, cases) to improve ranking without risking pipeline breakage. (`src/lib/ai/cohere-rerank.ts`)

### ai/eal-knowledge.ts
- **EAL_KNOWLEDGE constant** — 190-line comprehensive knowledge base (platform identity, 3 engines, 6 psychometric instruments, research methodology, hypotheses, navigation, chatbot modes) injected into AI system prompts. _Use case:_ Injects full platform context into chatbot and AI routes so they answer accurately about the EAL without hallucinating. (`src/lib/ai/eal-knowledge.ts`)
- **EAL_KNOWLEDGE_SHORT constant** — Condensed 10-line version covering the three engines and key facts. _Use case:_ Used in token-constrained prompts (e.g., claim analysis, mental health AI) to avoid hitting context limits. (`src/lib/ai/eal-knowledge.ts`)

### ai/forensic-analysis.ts
- **analyzeMedia** — Sends a media file or URL to the Python FastAPI backend (OpenCV/FFmpeg/Whisper) for deepfake, audio, metadata, or C2PA analysis; falls back to educational mode if backend is unavailable. _Use case:_ Powers the deepfake detection tool when users upload suspected manipulated images/videos/audio. (`src/lib/ai/forensic-analysis.ts`)
- **isForensicBackendAvailable** — Health-checks the Python forensic backend via `/api/forensic/health`. _Use case:_ UI toggle logic: show live analysis UI only when backend is running. (`src/lib/ai/forensic-analysis.ts`)
- **Educational fallback mode** — Returns structured "what this analysis would check" results for each analysis type (ELA, EXIF, GAN detection, etc.) when the backend is offline. _Use case:_ Defense demonstrations and training sessions without requiring the Python service. (`src/lib/ai/forensic-analysis.ts`)
- **ForensicAnalysisType enum** — Defines five analysis modes: deepfake_video, deepfake_image, audio_analysis, metadata_extraction, c2pa_verification. _Use case:_ Used by the UI to route submissions to the correct backend endpoint. (`src/lib/ai/forensic-analysis.ts`)

### ai/forensic-service.ts
- **runForensicAnalysis** — Production-grade forensic dispatcher that sends FormData to `FORENSIC_BACKEND_URL` with bearer-token auth, or returns a context-aware fallback (higher suspicion score when filename contains "edit"/"deepfake"/"viral" etc.). _Use case:_ Server action powering all media authentication requests in the platform. (`src/lib/ai/forensic-service.ts`)
- **hasForensicBackend** — Returns boolean based on whether `FORENSIC_BACKEND_URL` env var is set. _Use case:_ Feature-flag gating forensic UI sections in production vs. dev. (`src/lib/ai/forensic-service.ts`)
- **Suspicion-hint fallback builder** — When backend is absent, infers preliminary risk from filename/URL keywords, returning `confidence: 41` for suspicious names vs `18` for neutral. _Use case:_ Provides meaningful preliminary guidance even before the backend is connected. (`src/lib/ai/forensic-service.ts`)

### ai/guardrails.ts
- **interpolatePrompt** — Replaces `{variable}` placeholders in prompt templates with HTML-escaped values. _Use case:_ Safe injection of user-provided claim/source into pre-built analysis prompts. (`src/lib/ai/guardrails.ts`)
- **checkGuardrails** — Runs three layered pattern checks (harm/self-harm, medical diagnosis boundary, fatwa boundary) against user input and returns a GuardrailResult with crisis redirect flag. _Use case:_ Pre-flight check on every Prompt Lab or chatbot submission to block unsafe requests and route crisis cases to hotlines. (`src/lib/ai/guardrails.ts`)
- **detectEmotionalTriggers** — Scans text for words from a 30-term emotion lexicon (anger, fear, sadness, disgust) and returns tagged positions. _Use case:_ Highlights emotionally manipulative language in claims for training exercises. (`src/lib/ai/guardrails.ts`)
- **highlightEmotionalWords** — Wraps detected emotion words in `<span class="emotion-X">` HTML for colored rendering. _Use case:_ Visual emotion-trigger highlighting in the Prompt Lab and debunking UI. (`src/lib/ai/guardrails.ts`)
- **logMisuseAttempt** — Stores a truncated record of jailbreak/self-harm attempts to localStorage and console for supervisor review. _Use case:_ Tracks abuse patterns across sessions for admin audit without transmitting PII. (`src/lib/ai/guardrails.ts`)

### ai/index.ts
- **initai stub** — Trivial module placeholder (console.log only); no real logic. _Use case:_ Reserved barrel entry; no active features. (`src/lib/ai/index.ts`)

### ai/llm-provider.ts
- **getActiveProvider** — Returns the first available LLM config from a priority chain (Claude → OpenAI → Llama → static fallback), respecting user localStorage preference. _Use case:_ Enables site reliability during a provider outage by automatically switching to the next in chain. (`src/lib/ai/llm-provider.ts`)
- **setPreferredProvider** — Saves the user's preferred LLM provider to localStorage. _Use case:_ Admin/power-user can pin a specific provider from the settings panel. (`src/lib/ai/llm-provider.ts`)
- **markProviderUnavailable** — Sets a provider's `isAvailable` flag to false at runtime. _Use case:_ Auto-failover on HTTP error — the caller marks the failing provider and retries. (`src/lib/ai/llm-provider.ts`)
- **sendPrompt** — Sends a message to the active provider with MVP-aware static fallback for all-down scenarios. _Use case:_ Chatbot and Prompt Lab calls ensuring a response is always returned, even on defense day. (`src/lib/ai/llm-provider.ts`)
- **getProviderStatuses** — Returns an array of provider name, model, and availability for all configured slots. _Use case:_ Admin dashboard health panel. (`src/lib/ai/llm-provider.ts`)

### ai/nvidia-first.ts
- **nvidiaFirstGenerate** — Text generation via the MegaRotator (Gemini → Groq → OpenRouter → Cerebras → Together → SambaNova → NVIDIA last); returns provider:"none" with empty text only if every slot failed. _Use case:_ Primary text-generation entrypoint for all debunking and analysis routes — replaces the old NVIDIA-first single-key path that timed out at 22 s. (`src/lib/ai/nvidia-first.ts`)
- **nvidiaFirstGenerateJSON** — Wraps `nvidiaFirstGenerate` and attempts JSON parsing of the cleaned response. _Use case:_ Structured-output generation for debunking verdicts and classification tasks where a JSON object is expected. (`src/lib/ai/nvidia-first.ts`)

### ai/output-enforcer.ts
- **enforceOneLaw** — Classifies a list of candidate sources by tier (via whitelist), rejects Tier-U, sorts admissible sources strongest-first, and returns a verified/unverified verdict with tier floor. _Use case:_ Applied to every AI-generated answer before it reaches the user; ensures no unsourced claim is presented as fact. (`src/lib/ai/output-enforcer.ts`)
- **isAdmissible** — Returns false for Tier U, true for Tier S–C. _Use case:_ Quick gate used in verdict-downgrade and content-atom validation logic. (`src/lib/ai/output-enforcer.ts`)
- **SourcedAIOutputSchema** — Zod schema requiring `text`, `sources[]` (≥1 item), and optional confidence. _Use case:_ Passed to `generateObject` to force the model to return sources in structured generation calls. (`src/lib/ai/output-enforcer.ts`)
- **enforceSourcedOutput** — Validates a raw AI output against the Zod schema AND the One Law in one call; returns a discriminated ok/fail result. _Use case:_ Used in `/api/ai/*` routes as a single-line verification step before the response is serialized. (`src/lib/ai/output-enforcer.ts`)
- **applyVerdictEnforcement** — Passes a model verdict through if backed by an admissible source; otherwise downgrades verdict to UNVERIFIED and caps confidence at 0.2. _Use case:_ Final wiring point that prevents a FALSE/TRUE label from reaching the debunking UI without an admissible source. (`src/lib/ai/output-enforcer.ts`)

### ai/providers.ts
- **aiGenerate** — Six-provider cascade (NVIDIA NIM → NVIDIA DeepSeek → Gemini → Groq → GitHub → HuggingFace) with automatic failover; throws only if all providers fail. _Use case:_ Backs the multi-provider chatbot and claim analysis routes, maximizing uptime. (`src/lib/ai/providers.ts`)
- **analyzeClaimWithAI** — Calls `aiGenerate` with a structured misinformation-analyst system prompt (SIFT method, verdict format, red-flag listing, bias enumeration); language-aware (responds in claim's language). _Use case:_ The core claim-analysis function in the DeepReal chatbot mode. (`src/lib/ai/providers.ts`)
- **mentalHealthAI** — Calls `aiGenerate` with a psychoeducation-only system prompt, Egyptian-Arabic warmth, CBT/mindfulness frameworks, and embedded crisis hotline numbers. _Use case:_ Powers the Mental Health chatbot mode with appropriate safety boundaries. (`src/lib/ai/providers.ts`)
- **analyzeSentiment** — HuggingFace twitter-roberta-base sentiment classifier returning label + score. _Use case:_ Sentiment analysis component in claim bias detection and emotional-trigger workflows. (`src/lib/ai/providers.ts`)
- **translateText** — HuggingFace Helsinki-NLP model for bidirectional Arabic↔English translation. _Use case:_ Translation chatbot mode and automatic bilingual response generation. (`src/lib/ai/providers.ts`)

### ai/rag.ts
- **upsertCase** — Embeds a case document via OpenAI text-embedding-3-small and upserts it into the named Pinecone namespace (deepreal-cases / mhgap-modules / religion-tafsir). _Use case:_ Populates the vector store with evidence cases, mental health modules, and tafsir documents for semantic retrieval. (`src/lib/ai/rag.ts`)
- **retrieveSimilarCases** — Embeds a query, fetches top-K dense matches from Pinecone, then Cohere-reranks by semantic relevance; falls back to dense order if Cohere is unavailable. _Use case:_ Powers evidence-augmented AI answers by retrieving the most relevant precedent cases or knowledge. (`src/lib/ai/rag.ts`)
- **EngineNamespace type** — Strict union `"deepreal-cases" | "mhgap-modules" | "religion-tafsir"`. _Use case:_ Enforces namespace isolation between the three EAL engines in the Pinecone index. (`src/lib/ai/rag.ts`)

### ai/router.ts
- **model (task router)** — Returns the optimal AI SDK model for five distinct tasks: verify (GPT-4o depth), fast_classify (Groq Llama-3.3 <200ms), embed (OpenAI text-embedding-3-small), ar_tafsir (Gemini-2.0-flash Arabic), safety (GPT-4o-mini deterministic). _Use case:_ Every AI call in the codebase imports this to get the right model for the job without hardcoding. (`src/lib/ai/router.ts`)

---

## src/lib/analytics/

### analytics/comb-analytics.ts
- **getComBProfile** — Aggregates all completed exercises by COM-B target (Capability/Psychological, Motivation/Reflective, etc.), computes distribution percentages, coverage of the 6 segments, per-MVP breakdown, and average score per target. _Use case:_ Research reporting: shows supervisors which behavioral-change domains were exercised and how well. (`src/lib/analytics/comb-analytics.ts`)
- **getComBSummary** — Returns a human-readable text summary of the COM-B profile. _Use case:_ Dashboard card showing researchers a quick behavioral-change overview. (`src/lib/analytics/comb-analytics.ts`)
- **getComBGaps** — Returns the list of COM-B segments not yet exercised by the participant. _Use case:_ Prompts users toward unvisited behavioral domains to ensure full 6-segment coverage. (`src/lib/analytics/comb-analytics.ts`)

### analytics/defense-pack.ts
- **collectDefenseData** — Assembles a DefensePackData object combining current participant snapshot with full cohort analytics (hypotheses, engine summaries, source ops). _Use case:_ Builds the data bundle for academic defense presentations. (`src/lib/analytics/defense-pack.ts`)
- **exportDefenseCSV** — Serializes the defense pack to a structured multi-section CSV (metadata, participant snapshot, cohort engine summary, hypothesis results, source ops). _Use case:_ Provides a single-click CSV export for researchers presenting N=84 results. (`src/lib/analytics/defense-pack.ts`)
- **downloadDefensePack** — Creates a Blob CSV and triggers browser download named `defense_pack_<date>.csv`. _Use case:_ Admin panel download button used the day before the academic defense. (`src/lib/analytics/defense-pack.ts`)
- **exportDefenseJSON** — Returns the defense pack as a formatted JSON string. _Use case:_ Machine-readable export for SPSS/R/Python analysis pipelines. (`src/lib/analytics/defense-pack.ts`)

### analytics/research-export.ts
- **generateResearchCSV** — Anonymizes participant records and serializes all 52 variables (demographics, all 6 instrument pre/post scores, trust calibration, engagement metrics, confidence shifts, timestamps) into a research-grade CSV. _Use case:_ Creates the SPSS/R-compatible dataset for the N=84 quasi-experimental study. (`src/lib/analytics/research-export.ts`)
- **generateResearchJSON** — Same data as CSV but as a JSON payload with software compatibility metadata (SPSS v28, R, Python/pandas). _Use case:_ Alternative export for Python-based analysis or archiving. (`src/lib/analytics/research-export.ts`)
- **collectCurrentParticipantData** — Reads all EAL localStorage keys (progress, assessments, trust calibration, confidence shifts, analytics) and assembles a partial ParticipantRecord. _Use case:_ Called before any export to hydrate the current browser session's research data. (`src/lib/analytics/research-export.ts`)
- **buildCurrentParticipantRecord** — Returns a fully-typed ParticipantRecord with defaults for any missing fields from `collectCurrentParticipantData`. _Use case:_ Normalizes partial data so the CSV/JSON generators always receive complete rows. (`src/lib/analytics/research-export.ts`)

---

## src/lib/api/

### api/api-error.ts
- **apiError** — Creates a standardized bilingual `NextResponse.json` error with Arabic + English message, error code, and optional recovery action. _Use case:_ All EAL API routes use this so errors are bilingual and consistently shaped. (`src/lib/api/api-error.ts`)
- **ERR presets** — Five preset error factories (missingQuery, notConfigured, fetchFailed, notFound, invalidPayload) with bilingual Egyptian-Arabic messages. _Use case:_ One-liner error returns in route handlers instead of duplicating bilingual message logic. (`src/lib/api/api-error.ts`)

### api/debounce.ts
- **debounce** — Generic function debouncer: delays execution until N ms of silence. _Use case:_ Prevents API spam on search inputs (300ms for searches, per Q74). (`src/lib/api/debounce.ts`)
- **throttle** — Generic function throttler: executes at most once per interval. _Use case:_ Limits scroll and resize event handlers to avoid performance degradation. (`src/lib/api/debounce.ts`)
- **withBackoff** — Async retry wrapper with exponential backoff + random jitter, default 3 retries. _Use case:_ Wraps Crossref, OpenAlex, and Nominatim calls to respect rate limits (Q73). (`src/lib/api/debounce.ts`)
- **politeFetch** — Fetch wrapper that automatically adds the required `User-Agent: EgyptianAwarenessLibrary/1.0 (mailto:research@eal.edu.eg)` for Crossref polite pool, and Nominatim compliance; respects `Retry-After` headers with recursive retry. _Use case:_ All academic API calls (Crossref, Nominatim) must use this to stay in the polite-pool tier. (`src/lib/api/debounce.ts`)

### api/search-cache.ts
- **withSearchCache** — In-memory TTL cache for async loaders: returns cached value if not expired, otherwise calls the loader and stores the result. _Use case:_ Caches repeated search queries (evidence search, source lookups) to reduce redundant external API calls. (`src/lib/api/search-cache.ts`)

---

## src/lib/audit/

### audit/pilot-certification.ts
- **runCertificationAudit** — Executes 26 structured checks across 10 categories (exercise coverage, prompt library, KeyHunter, crisis contacts, source registry, assessments, COM-B pipeline, UI integration, SEO metadata, type system) and returns pass/fail/warn per check plus a certified boolean. _Use case:_ Pre-deployment integrity gate verifying all N=84 pilot data-pipeline components are ready. (`src/lib/audit/pilot-certification.ts`)
- **generateCertificationReport** — Converts the audit results into a formatted ASCII box report grouped by category with emoji pass/fail icons. _Use case:_ Run by a developer or supervisor to get a printable "Doctor-Proof" stamp before launch. (`src/lib/audit/pilot-certification.ts`)

---

## src/lib/auth/

### auth.ts (root)
- **getCurrentUser** — Verifies the `eal_pilot_auth` JWT cookie (HS256) and returns the embedded UserProfile. _Use case:_ Server components and middleware call this to get the authenticated user's profile and role. (`src/lib/auth.ts`)
- **loginUser** — Validates email+password against bcrypt hash in mock DB, issues a 24h JWT cookie. _Use case:_ The /login form server action. (`src/lib/auth.ts`)
- **registerUser** — Creates a new UserProfile (with admin-code opt-in for admin role), hashes password, issues cookie. _Use case:_ The /register form server action for the N=84 pilot participants. (`src/lib/auth.ts`)
- **loginAsGuest** — Mints an anonymous guest UserProfile with a UUID and issues a session cookie without any PII. _Use case:_ Lets unenrolled visitors explore the platform without creating an account. (`src/lib/auth.ts`)
- **logoutUser** — Deletes the `eal_pilot_auth` cookie. _Use case:_ Logout button handler. (`src/lib/auth.ts`)
- **isAdmin** — Returns true if the current user has role "admin". _Use case:_ Guards the supervisor panel and research export routes. (`src/lib/auth.ts`)
- **requestPasswordReset / resetPassword** — Stub: returns a preview token; reset always returns RESET_TOKEN_INVALID (placeholder for real DB). _Use case:_ Placeholder wiring for future email-based password reset. (`src/lib/auth.ts`)

### auth/passport.ts
- **createPassport** — Mints a random anonymous userId, a base64url recovery key, stores both in kvStore, and signs a 180-day JWT. _Use case:_ Privacy-preserving user identity for BLACKBOX/no-logging ethos — no email or PII required. (`src/lib/auth/passport.ts`)
- **restorePassport** — Recovers an existing anonymous passport on a new device by hashing and looking up the recovery key in kvStore. _Use case:_ Lets users resume their progress on another device using only the recovery key. (`src/lib/auth/passport.ts`)
- **signSession / verifySession** — Sign and verify 180-day HS256 JWTs for the anonymous passport system. _Use case:_ Session middleware authentication for passport-based users. (`src/lib/auth/passport.ts`)
- **sessionCookieOptions** — Returns httpOnly/secure/sameSite/maxAge cookie options gated on NODE_ENV. _Use case:_ Consistent cookie config for both pilot auth and passport systems. (`src/lib/auth/passport.ts`)

### auth/signin.ts
- **signin server action** — Validates email/password via Zod schema, compares bcrypt hash, issues a 7-day JWT cookie. _Use case:_ Minimal sign-in server action (placeholder for real DB lookup). (`src/lib/auth/signin.ts`)

### auth/user-progress-binding.ts
- **bindUserProgress** — On login, copies user-namespaced localStorage keys to unprefixed keys so the rest of the app reads the correct user's progress. _Use case:_ Restores a returning user's 14-day exercise history and gamification state on login. (`src/lib/auth/user-progress-binding.ts`)
- **unbindUserProgress** — On logout, saves current unprefixed progress to the user's namespace, then clears unprefixed keys. _Use case:_ Prevents progress data from leaking to the next user on a shared device. (`src/lib/auth/user-progress-binding.ts`)
- **saveCurrentProgress** — Copies all tracked localStorage keys under the user's namespace prefix. _Use case:_ Called on a 60-second interval and on `beforeunload` to prevent data loss. (`src/lib/auth/user-progress-binding.ts`)
- **initProgressAutoSave** — Registers `beforeunload` listener and 60s interval for automatic progress saves. _Use case:_ Called once in the root layout to keep progress safe across browser refreshes. (`src/lib/auth/user-progress-binding.ts`)

---

## src/lib/cognition/

### cognition/doctor-test.ts
- **DOCTOR_TEST checklist** — 5-item bilingual checklist (specialty, syndicate registration, hospital affiliation, publications, professional society) for verifying a claimed doctor's credentials. _Use case:_ Embedded in claim analysis UI to guide users evaluating medical authority claims. (`src/lib/cognition/doctor-test.ts`)

### cognition/efficacy.ts
- **computeCohortEfficacy** — From a list of participant files with pre/post MIST-20 scores, computes cohort N, mean veracity discernment delta, sample SD, Cohen's dz, 95% CI, fake-news acceptance delta, and a DISTRUST-DRIFT guard (flags if gains come from cynicism rather than true discernment). _Use case:_ The fundable metric for the N=84 pilot — generates the one citable claim "people measurably get harder to fool." (`src/lib/cognition/efficacy.ts`)
- **loadAllParticipantFiles** — Reads every participant assessment file from kvStore via the index key `assessment:participants`. _Use case:_ Hydrates the efficacy computation with the full cohort data server-side. (`src/lib/cognition/efficacy.ts`)
- **Distrust-drift guard** — Flags results where realNewsBias drifted negative (user became more cynical, not more discerning) and adds a caveat to the headline. _Use case:_ Academic honesty check — prevents the team from publishing misleadingly positive efficacy results. (`src/lib/cognition/efficacy.ts`)

### cognition/flicc-classifier.ts
- **classifyClaim** — Two-pass claim classifier: (1) deterministic regex + VADER + wink-nlp readability scan; (2) LLM structured-object call via the fast_classify model (Groq Llama) only when deterministic pass is insufficient. Results cached 24h in Vercel KV. _Use case:_ Classifies any text by FLICC manipulation technique and 7-layer deception taxonomy layer, powering the debunker and exercise engine. (`src/lib/cognition/flicc-classifier.ts`)
- **KV-cached classification** — SHA-256 key cache with 24h TTL avoiding redundant LLM calls on repeated claims. _Use case:_ Cost reduction and latency optimization for frequently seen claims. (`src/lib/cognition/flicc-classifier.ts`)

### cognition/flicc.ts
- **FLICC taxonomy** — Canonical FLICC object with five top-level categories (Fake Experts, Logical Fallacies with ~30 sub-types, Impossible Expectations, Cherry-Picking, Conspiracy) each with signatures and counter-strategies. _Use case:_ Shared reference for the FLICC classifier, exercises, and educational UI. (`src/lib/cognition/flicc.ts`)
- **SIFT method steps** — Four SIFT steps (Stop, Investigate, Find, Trace) with bilingual prompts and action codes. _Use case:_ Used in the claim analysis UI to guide users through lateral reading and provenance tracing. (`src/lib/cognition/flicc.ts`)

### cognition/index.ts
- **Documentation barrel** — Comment-only module documenting the 6 sibling modules; no exports. _Use case:_ Developer orientation; trivial file. (`src/lib/cognition/index.ts`)

### cognition/ledger.ts
- **appendDefense** — Appends a DefenseEvent (surface, deception layer 1-8, technique, outcome: caught/missed/reviewed, confidence before/after) to the user's KV ledger; capped at 5000 events. _Use case:_ Records every defensive act a user performs across all platform surfaces for the Cognitive Immunity Score. (`src/lib/cognition/ledger.ts`)
- **getLedger** — Retrieves all defense events for a user from kvStore. _Use case:_ Feeds the immunity meter calculations and research analytics. (`src/lib/cognition/ledger.ts`)
- **deriveMeters** — Pure function that aggregates ledger events into ImmunityMeters: accuracy, per-layer coverage (8 layers), active days, current streak, average confidence shift, and Cognitive Immunity Score (0-100 composite). _Use case:_ Powers the immunity dashboard and the North-Star "Verified Defenses Delivered" metric. (`src/lib/cognition/ledger.ts`)

### cognition/mist.ts
- **scoreMIST** — Scores a 20-item MIST-20 submission computing veracityDiscernment (0-20), realNewsBias (distrust vs naivete), fakeNewsAccept (gullibility), and missedByType (per FLICC category vulnerability profile). _Use case:_ Pre/post assessment scoring for H1 (MIST-20 improvement hypothesis) and trust calibration baseline. (`src/lib/cognition/mist.ts`)
- **MistSubmission / MistAnswer Zod schemas** — Validates a 20-answer array with start/finish timestamps. _Use case:_ Input validation for the MIST-20 assessment submission route. (`src/lib/cognition/mist.ts`)

### cognition/sm2.ts
- **sm2** — Pure implementation of the SM-2 spaced-repetition algorithm: given a card (ease, interval, repetitions, due date) and quality score 0-5, returns the updated card with next due date. _Use case:_ Schedules when review cards for manipulation techniques or vocabulary should be shown again, ensuring long-term retention. (`src/lib/cognition/sm2.ts`)

---

## src/lib/cognitive/

### cognitive/bias-detector.ts
- **detectCognitiveBiases** — Two-tier bias detection: Tier 1 regex pattern banks (EN + AR) for 15 cognitive biases; Tier 2 wink-nlp + VADER linguistic features (absolutist words, emotional density, authority mentions, evidence keywords, us-vs-them ratio); weighted scoring with anti-pattern penalties and a 0.35 confidence threshold. _Use case:_ Identifies cognitive biases present in any claim text to educate users on what psychological mechanisms made the claim persuasive. (`src/lib/cognitive/bias-detector.ts`)
- **Domain weighting** — Optional `domain` parameter ("scientific" | "islamic" | "both") applies keyword-based boosts from the bias's domain-specific application text. _Use case:_ More accurate bias scoring for Islamic-context claims vs scientific claims. (`src/lib/cognitive/bias-detector.ts`)
- **extractLinguisticFeatures** — Internal function computing 12 features (VADER sentiment, absolutist count, emotional density, authority mentions, evidence keywords, us-vs-them ratio, number count, question count, exclamation count, unique sentence ratio). _Use case:_ Shared feature extraction used by all 15 bias scoring rules. (`src/lib/cognitive/bias-detector.ts`)

### cognitive/biases-data.ts
- **COGNITIVE_BIASES data** — 15 CognitiveBias objects (E1–E15) each with id, name, description, scientificApplication, islamicApplication, and detectionMethod (Confirmation Bias, Dunning-Kruger, Anchoring, Availability, Bandwagon, Authority, Backfire, Illusory Correlation, Framing, Sunk Cost, Halo, Normalcy, In-Group, Peak-End, Mere Exposure). _Use case:_ Reference data consumed by the bias detector, educational exercises, and the cognitive defense lens UI. (`src/lib/cognitive/biases-data.ts`)
- **CognitiveBias / DetectedBias / Domain types** — Type definitions for the bias system. _Use case:_ Type safety across the bias detection pipeline. (`src/lib/cognitive/biases-data.ts`)

---

## src/lib/content/

### content.ts (root)
- **loadCondition** — Reads a `.mdx` file from `src/content/mental-health/<slug>.mdx` using gray-matter for frontmatter parsing. _Use case:_ Loads mental health condition pages (depression, anxiety, etc.) from the content directory for server-side rendering. (`src/lib/content.ts`)

### content/content-atom.ts
- **validateAtom** — Validates a ContentAtom against Zod schema AND enforces the One Law (≥1 Tier S–C source) AND the Islamic Authenticity Protocol (hadithGrade must be present and not weak/fabricated). _Use case:_ Content-authoring gate: any new content atom (exercise, claim, lesson) must pass this before being deployed. (`src/lib/content/content-atom.ts`)
- **ContentAtomSchema** — Zod schema for a bilingual content atom: id, claim (en+ar), sources[], optional layer (1-8), optional islamic.hadithGrade. _Use case:_ Enforces the minimum required shape for every authored content item. (`src/lib/content/content-atom.ts`)

---

## src/lib/db/

### db/kv-store.ts
- **kvStore.get** — Reads a key from Vercel KV in production or from a local `.runtime/kv_fallback/<key>.json` file in development. _Use case:_ Universal storage read for all server-side persistent data (ledger, assessment records, passport, source registry). (`src/lib/db/kv-store.ts`)
- **kvStore.set** — Writes a key to Vercel KV or local FS fallback. _Use case:_ Universal storage write ensuring the system works both locally and on Vercel without code changes. (`src/lib/db/kv-store.ts`)
- **kvStore.keys** — Lists keys matching a glob pattern from Vercel KV or local FS with basic regex pattern match. _Use case:_ Used by the assessment index to enumerate all participant files. (`src/lib/db/kv-store.ts`)

---

## src/lib/debunking/

### debunking/classifier.ts
- **classifyEgyptianContext** — Uses `rotatingGenerateObject` to classify a claim into one of 23 Egyptian context vectors (WhatsApp Family Medical Panic, Religious/Fatwa Manipulation, etc.) using structured LLM output; returns a discriminated union (degraded/success). _Use case:_ Routes incoming claims to the appropriate debunking workflow based on Egyptian social context. (`src/lib/debunking/classifier.ts`)

### debunking/egy-data.ts
- **EGYPTIAN_CONTEXT_VECTORS** — 23 Egypt-specific misinformation categories (WhatsApp panics, fatwa manipulation, state rumors, pseudoscience scams, etc.) as a const tuple. _Use case:_ Enum backing the context classifier and debunking pipeline routing. (`src/lib/debunking/egy-data.ts`)
- **NEGATIVE_SCIENCE_CATEGORIES** — 13 categories of scientific fraud/manipulation (cherry-picking, false authority, correlation-causation fallacy, etc.). _Use case:_ Labeling engine for the DeepReal negative-science analysis layer. (`src/lib/debunking/egy-data.ts`)
- **VERBAL_SCIENCE_LAYERS** — 5 analytical layers (Emotional Trigger Analysis, Source Provenance Check, Logical Structure Validation, Empirical Evidence Mapping, Incentive & Bias Expose). _Use case:_ Step labels for the 5-layer verbal science analysis in the debunking UI. (`src/lib/debunking/egy-data.ts`)
- **DEFENSE_METHODS** — 130 defense methods across three categories: 44 Medical (Ministry of Health cross-reference, Doctors Syndicate verification, etc.), 43 DeepReal (AI artifact detection, EXIF extraction, bot-network identification, etc.), 43 Demographic (CAPMAS data check, subsidy rumor assessment, sectarian bias neutralization, etc.). _Use case:_ The comprehensive Egypt-specific defense playbook shown to users and powering the debunking recommendations engine. (`src/lib/debunking/egy-data.ts`)
