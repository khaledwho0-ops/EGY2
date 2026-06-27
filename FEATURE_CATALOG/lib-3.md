# Engines & Libraries — slice lib-3

Covers items 85–125 of the ASCII-sorted `src/lib/**/*.ts` list (40 files total).

---

## src/lib/safety — Content Safety & Input Moderation

### `src/lib/safety/abuse-logger.ts`
- **Jailbreak pattern detection** — Scans user input against 9 regex patterns (e.g. "ignore previous instructions", "DAN mode") and logs any match as an `AbuseLogEntry` with violation type and severity.  _Use case:_ Prompt Lab inputs are scanned before hitting the LLM to block prompt-injection attempts. (`src/lib/safety/abuse-logger.ts`)
- **Self-harm detection** — Matches self-harm vocabulary at `critical` severity and fires an immediate admin alert via `/api/safety/alert` (with localStorage fallback). _Use case:_ Any MVP chatbot surfaces critical mental-health flags before passing them to the AI. (`src/lib/safety/abuse-logger.ts`)
- **Abuse log persistence** — Stores up to 100 `AbuseLogEntry` records in localStorage, keeping a rolling window. _Use case:_ Supervisors retrieve the log from client-side storage for review. (`src/lib/safety/abuse-logger.ts`)
- **exportAbuseLogs** — Returns the full localStorage abuse log array. _Use case:_ Admin export / supervisor dashboard data feed. (`src/lib/safety/abuse-logger.ts`)
- **getAbuseStats** — Returns aggregated counts by severity and violation type. _Use case:_ Dashboard widgets show how many jailbreak vs. self-harm attempts occurred. (`src/lib/safety/abuse-logger.ts`)

### `src/lib/safety/index.ts`
- **Safety subsystem placeholder** — Exports a no-op `initsafety()` initializer. _Use case:_ Trivial barrel; no real logic. (`src/lib/safety/index.ts`)

### `src/lib/safety/llm-input.ts`
- **InputSafetyGuard.sanitizeInput** — Runs a 50-pattern blocklist (prompt injection, XSS, SQL injection, shell commands) against any string and returns `{isSafe, flaggedPattern}`. _Use case:_ All user-supplied text is screened before being included in an LLM prompt. (`src/lib/safety/llm-input.ts`)

### `src/lib/safety/mindframe.ts`
- **mindframeAudit** — Checks mental-health content for forbidden patterns (Werther-effect method detail, glamorization phrases, sensational headlines) and enforces that a hotline number appears within 300 characters of any suicide-related trigger word. _Use case:_ Every AI-generated mental-health response is audited before delivery. (`src/lib/safety/mindframe.ts`)
- **MindframeViolation error class** — Typed error thrown when the audit fails, carrying the list of violations. _Use case:_ `safeStream` (stream-gate.ts) catches this to abort a live stream. (`src/lib/safety/mindframe.ts`)

### `src/lib/safety/nvidia-content-safety.ts`
- **checkContentSafety** — Calls NVIDIA Nemotron-3.5 Content Safety (12-language, multilingual Arabic support) and returns `{safe, action, categories, reasoning, confidence}`. Fails-open when the API key is absent. _Use case:_ Pre-screens user inputs and post-screens LLM outputs across all three MVPs. (`src/lib/safety/nvidia-content-safety.ts`)
- **isContentSafe** — Thin boolean wrapper around `checkContentSafety` for inline API-route guards. _Use case:_ Quick-check before routing a claim to the GOD-System. (`src/lib/safety/nvidia-content-safety.ts`)
- **batchCheckSafety** — Parallel-checks an array of texts via `Promise.all`. _Use case:_ Batch moderation for search result snippets before display. (`src/lib/safety/nvidia-content-safety.ts`)

### `src/lib/safety/stream-gate.ts`
- **safeStream** — Wraps the AI SDK `streamText` call with an `onChunk` hook that runs `mindframeAudit` on the accumulating buffer and throws `MindframeViolation` if a violation is detected mid-stream. _Use case:_ Ensures that a mental-health streaming response is aborted the moment a safe-messaging rule is broken. (`src/lib/safety/stream-gate.ts`)

---

## src/lib/schemas — Zod Validation Schemas

### `src/lib/schemas/content.ts`
- **CitationSchema** — Zod schema requiring text, URL, tier classification (S/1–5), archived Wayback URL, and archived/accessed timestamps. _Use case:_ Every content citation must be validated against this before being stored or displayed. (`src/lib/schemas/content.ts`)
- **ReviewerSchema** — Zod schema for named expert reviewers with credential, affiliation, review date, and scope. _Use case:_ Content requiring clinical or religious review is validated for minimum reviewer metadata. (`src/lib/schemas/content.ts`)
- **ContentFrontmatter** — Composite Zod schema tying together engine, language, i18n titles, standard bindings (IFCN/WHO/DSM-5-TR/Mindframe/etc.), deception layers covered, clinical codes (DSM-5-TR/ICD-11/mhGAP), religious metadata, and quality-gate reviewers/citations. Enforces ≥2 clinical reviewers for mental-health and religious frontmatter for religion engine. _Use case:_ Validates every piece of authored content before it enters the platform pipeline. (`src/lib/schemas/content.ts`)

### `src/lib/schemas/index.ts`
- **Schemas subsystem placeholder** — Trivial barrel; exports `initschemas()` no-op. (`src/lib/schemas/index.ts`)

### `src/lib/schemas/religion.ts`
- **ReligionFrontmatter** — Zod schema enforcing: minimum 3 madhāhib consulted, Amman Message alignment, Maqāṣid al-Sharīʿah impact ratings (5 values × 3 options), optional ḥadīth chain grading (SAHIH/HASAN/DAIF/MAWDU), fatwa warning literal, and Dar al-Iftāʾ referral URL. _Use case:_ All religion-engine content must be validated against this before publication to enforce the Islamic Authenticity Protocol. (`src/lib/schemas/religion.ts`)

---

## src/lib/science — Science Platform Core Engines

### `src/lib/science/cogsec/strategic-friction.ts`
- **CognitiveFirewall.assessCognitiveLoad** — Scores a biometric state (HRV, screen time, scroll velocity) 0–100 using threshold rules. _Use case:_ DeepReal checks whether a user is in a doomscrolling/dopamine loop before delivering content. (`src/lib/science/cogsec/strategic-friction.ts`)
- **CognitiveFirewall.calculateFrictionDelay** — Returns a mandatory UI delay (0/1000/3000ms) based on cognitive load score, implementing the "Strategic Algorithmic Friction" principle. _Use case:_ Prevents immediate stimulus–response cycles in high-stress states by forcing the UI to pause. (`src/lib/science/cogsec/strategic-friction.ts`)

### `src/lib/science/containment/epistemic-quarantine.ts`
- **Layer8Containment.enforceEpistemicQuarantine** — Returns `true` when AI output entropy exceeds 0.95 or semantic drift is flagged, logging a console warning. Callers decide what to do (pure classifier). _Use case:_ Signals to calling API routes that an AI output may be hazardous, triggering UI quarantine display. (`src/lib/science/containment/epistemic-quarantine.ts`)
- **Layer8Containment.triggerSubstrateStarvation** — Throws `ERR_SUBSTRATE_SEVERED` when continuous interaction exceeds 45 minutes, prompting the caller to enforce a break. _Use case:_ Prevents compulsive long-session AI engagement by signaling the UI to show a mandatory break prompt. (`src/lib/science/containment/epistemic-quarantine.ts`)

### `src/lib/science/deepreal-game.ts`
- **getDeepRealGamePayload** — Loads the game mode definition and current user progress, returning a `DeepRealGamePayload` with current round, completion rate, and remaining rounds. _Use case:_ The DeepReal game UI calls this on mount to restore session state. (`src/lib/science/deepreal-game.ts`)
- **resetDeepRealGame** — Wipes progress for a mode (score, history, index) and returns a fresh payload. _Use case:_ "Play Again" button in the DeepReal game. (`src/lib/science/deepreal-game.ts`)
- **answerDeepRealGameRound** — Processes a player's choice: validates it against the round, computes `scoreDelta`, updates `completedRounds`/`perfectRounds`, advances index, and returns a `DeepRealGameResolution` with feedback and lesson. _Use case:_ Each round submission in the DeepReal media-literacy game. (`src/lib/science/deepreal-game.ts`)

### `src/lib/science/evidence-store.ts`
- **getEvidenceOverview** — Queries a SQLite database (`.runtime/science.db`) for sources, claims, metrics, and data snapshots for a given module, returning a typed `EvidenceOverview` with sourceHealth stats. Falls back to in-memory seed data when SQLite is unavailable. _Use case:_ Science page panels display evidence supporting each module's pedagogical claims. (`src/lib/science/evidence-store.ts`)
- **getAllEvidenceOverviews** — Fetches evidence overviews for all three modules in parallel. _Use case:_ Journey dashboard requires evidence for all three modules at once. (`src/lib/science/evidence-store.ts`)
- **syncEvidenceSources** — Performs live HTTP HEAD/GET checks on each seeded source URL, updating sync status (`live`/`failed`/`stale`) in the database. _Use case:_ Admin refresh run verifies that all cited sources are still reachable. (`src/lib/science/evidence-store.ts`)
- **getEvidenceSourceDirectory** — Returns the full list of evidence sources (all modules). _Use case:_ Source transparency page / supervisor source-health panel. (`src/lib/science/evidence-store.ts`)
- **getEgyptOfficialAuthoritySources** — Returns module-specific Egyptian official authorities (Al-Azhar/Dar al-Iftāʾ for religion, MOHP for mental health, IFCN/UNICEF for deepreal). _Use case:_ Ensures Egyptian-context routing links point to the correct official bodies. (`src/lib/science/evidence-store.ts`)
- **getEvidenceSeedStats** — Returns summary counts (signals, trusted sources, seeded evidence, claims). _Use case:_ Admin dashboard stat tiles. (`src/lib/science/evidence-store.ts`)

### `src/lib/science/forensics/semafor-engine.ts`
- **ForensicEngine.analyzeMicroBloodFlow** — Describes rPPG-based deepfake detection (simulation only; no real model). Always returns `null`. _Use case:_ Educational stub showing the DeepReal deepfake detection architecture; callers must check `SEMAFOR_IS_SIMULATION`. (`src/lib/science/forensics/semafor-engine.ts`)
- **ForensicEngine.analyzeGlottalFlow** — Describes IAIF-based voice-cloning detection (simulation only). Always returns `null`. _Use case:_ Same educational context — illustrates the Layer 4 biological signal detection concept. (`src/lib/science/forensics/semafor-engine.ts`)

### `src/lib/science/forensics/zkp-identity.ts`
- **ZKPIdentityEngine.verifyHumanity** — Describes Plonk/Circom ZKP humanity verification (educational stub). Always returns `false`. _Use case:_ Illustrates Sybil-resistance architecture for the DeepReal bot-detection layer. (`src/lib/science/forensics/zkp-identity.ts`)
- **ZKPIdentityEngine.checkRateLimitingNullifier** — Educational stub that flags users over 5 messages/minute. _Use case:_ Rate-limiting illustration; callers should implement real enforcement. (`src/lib/science/forensics/zkp-identity.ts`)

### `src/lib/science/module-operations.ts`
- **runModuleOperation** — Evaluates user-supplied signals (deepreal: urgency/emotionalPressure/sourceKnown/officialMatch; mental-health: distress/functionDrop/dangerNow; religion-hub: coercion/guilt/replacesCare/sectarian) and returns a scored `ModuleOperationResult` with bilingual (EN/AR) outcome title, summary, severity, reasons, and next-action instructions. _Use case:_ DeepReal, Mental Health, and Religion Hub interactive diagnostic tools use this to compute a routing decision from a filled-in form. (`src/lib/science/module-operations.ts`)

### `src/lib/science/module-service.ts`
- **getModulePayload** — Assembles the full server-side payload for a single module page: briefing, workflow state, evidence overview, refresh summary, journey summary, and six deduped/sorted content collections (exercises, rules, myths, scenarios, tricks, reverse-engineering). _Use case:_ Module page server actions call this once to hydrate the full UI. (`src/lib/science/module-service.ts`)
- **getJourneyPayload** — Builds the multi-module journey dashboard payload: per-module journey summaries, primary module recommendation, refresh summary, and all evidence overviews. _Use case:_ The /science home or journey page renders module cards from this. (`src/lib/science/module-service.ts`)
- **buildJourneySummary** — Derives per-module `routeStatus` (guide-required / guided / in-progress / complete), next step, recommended tab, active emotion, emotional nudge, and scientific reason from workflow state. _Use case:_ Guides the user to the most relevant entry point on each visit. (`src/lib/science/module-service.ts`)

### `src/lib/science/ontological/tmt-anchor.ts`
- **AnchorProtocol.evaluateOntologicalStability** — Maps an `interactionChaos` score (0–1) to a four-phase TMT anchor protocol: ASSESS / VALIDATE / GROUND / RECONSTRUCT. _Use case:_ Layer 7/8 content triggers this to determine how deeply the UI must reduce sensory input. (`src/lib/science/ontological/tmt-anchor.ts`)
- **AnchorProtocol.getTraumaInformedTheme** — Returns CSS theme values (bg, blur, pacing) scaled to the current anchor phase, applying "Calm Design" principles during ontological distress. _Use case:_ UI components adopt these values when the user is exposed to existential/reality-fracturing content. (`src/lib/science/ontological/tmt-anchor.ts`)

### `src/lib/science/protocol-engine.ts`
- **getProtocolDefinition** — Retrieves an `ExecutableProtocol` for any module × kind × id combination, including bilingual title, goal, decision logic, field schema (boolean/scale/select/textarea), Egyptian-context outcomes, and linked evidence claim IDs. _Use case:_ Individual exercise / myth / scenario detail pages render their interactive protocol form from this. (`src/lib/science/protocol-engine.ts`)
- **evaluateProtocol** — Runs the scoring logic against user-supplied inputs and returns a `ProtocolEvaluation` with score, matched outcome, bilingual reasoning, Egyptian-context next action, and linked evidence. Each module has its own scoring rules (deepreal: source + evidence + emotion + official; mental-health: danger-first + distress + function + duration; religion-hub: coercion + guilt + care-replacement + sectarian). _Use case:_ After a user fills in a protocol form, this produces the routing verdict and actionable Egyptian-context steps. (`src/lib/science/protocol-engine.ts`)

### `src/lib/science/workflow-store.ts`
- **readWorkflowStore** — Reads per-module workflow state (completed steps, selected items, guide seen state) from SQLite (`.runtime/science.db`) with JSON fallback. _Use case:_ All module pages restore user progress on load. (`src/lib/science/workflow-store.ts`)
- **writeWorkflowStore** — Persists the full workflow store to SQLite or JSON file. _Use case:_ Any step completion or guide interaction writes state immediately. (`src/lib/science/workflow-store.ts`)
- **updateModuleWorkflow** — Applies an updater function to a single module's state, timestamps it, and persists. _Use case:_ Single-step completion actions (mark step done, select item). (`src/lib/science/workflow-store.ts`)
- **readDeepRealGameProgress / updateDeepRealGameProgress** — Reads and writes DeepReal game progress per mode (score, round index, history, completion) in SQLite. _Use case:_ Game state is fully persisted server-side between page loads. (`src/lib/science/workflow-store.ts`)
- **recordScienceRefresh** — Upserts the full source registry from seed data and records a refresh run log entry. _Use case:_ Admin `/api/science/refresh` endpoint triggers this to keep the source registry current. (`src/lib/science/workflow-store.ts`)
- **getScienceRefreshSummary** — Returns the last N refresh runs plus source registry records with freshness classification. _Use case:_ Supervisor dashboard "Science Sources" panel shows last-sync status. (`src/lib/science/workflow-store.ts`)
- **JSON-to-SQLite migration** — `migrateLegacyJsonIfNeeded` auto-migrates from the legacy `.runtime/science-workflow.json` file into SQLite on first run. _Use case:_ Zero-downtime upgrade path for existing deployments. (`src/lib/science/workflow-store.ts`)

---

## src/lib/scoring — Statistical Scoring Engines

### `src/lib/scoring/effect-size.ts`
- **cohensD** — Computes Cohen's d for paired samples with 95% confidence intervals and a text interpretation label (negligible / small / medium / large). _Use case:_ Pre/post research study analysis (§5.2) to measure how much the platform shifted MIST-20, MHLS, and RCOPE scores. (`src/lib/scoring/effect-size.ts`)
- **pairedTTest** — Runs a full paired-samples t-test: t-statistic, df, p-value, significance at α=0.05 and Bonferroni-corrected α=0.01, mean/SD difference, and embedded Cohen's d. _Use case:_ Primary statistical test (H1–H3) for the EAL research framework. (`src/lib/scoring/effect-size.ts`)
- **POWER_ANALYSIS constants** — Hard-coded G*Power 3.1 power analysis parameters (n=42/group, 80% power, medium d=0.5, Bonferroni α=0.01). _Use case:_ Research protocol documentation and sample-size planning. (`src/lib/scoring/effect-size.ts`)
- **SUCCESS_CRITERIA** — Seven outcome criteria (MIST-20, MHLS, RCOPE+/−, SUS, completion rate, expert CVI) with minimum/target/stretch thresholds and remediation notes. _Use case:_ Research dashboard shows which success criteria are met against live data. (`src/lib/scoring/effect-size.ts`)
- **VARIABLE_MAP** — 12-entry typed research variable map (DVs, IVs, covariates, process metrics, instruments, scales, timing). _Use case:_ Research documentation and SPSS import configuration. (`src/lib/scoring/effect-size.ts`)

### `src/lib/scoring/trust-calibration.ts`
- **calculateTCE (Trust Calibration Error)** — Computes mean absolute error between user confidence (0–100) and binary correctness for a set of claim-confidence pairs. _Use case:_ Measures over/under-confidence pre and post intervention. (`src/lib/scoring/trust-calibration.ts`)
- **calculateAFS (Acceptance Friction Score)** — Weighted sum of pause time, source opens, evidence checks, comparison actions, tool use, and judgment changes. _Use case:_ Measures whether users pause and verify before accepting claims. (`src/lib/scoring/trust-calibration.ts`)
- **calculateAOI (Authority Overweight Index)** — Percentage of source-ranking tasks where high-authority/low-evidence sources were ranked above their ideal. _Use case:_ Detects authority bias — ranking a logo over evidence quality. (`src/lib/scoring/trust-calibration.ts`)
- **calculateETS (Emotional Trigger Susceptibility)** — Acceptance rate difference between emotionally loaded and neutral versions of identical claims. _Use case:_ Measures susceptibility to emotional manipulation. (`src/lib/scoring/trust-calibration.ts`)
- **calculateCTCS (Comfort-Truth Confusion Score)** — Percentage of comfort-biased but weakly-evidenced claims rated as more reliable. _Use case:_ Detects the "feels good = must be true" bias, especially for mental-health and religion content. (`src/lib/scoring/trust-calibration.ts`)
- **buildTrustCalibrationProfile** — Runs all five scoring algorithms and packages them into a `TrustCalibrationProfile` with phase (pre/post) and timestamp. _Use case:_ Creates a full before/after profile for each research participant. (`src/lib/scoring/trust-calibration.ts`)
- **calculateImprovement** — Computes % improvement per construct between pre and post profiles, checking against `TRUST_CALIBRATION_TARGETS`. _Use case:_ Research reporting — shows which constructs met their improvement targets. (`src/lib/scoring/trust-calibration.ts`)

### `src/lib/scoring/weighting-formulas.ts`
- **InstitutionalWeightingEngine.calculateRegulatoryScore** — Applies formula (40% budget + 30% jurisdictional reach × bindingness + 20% staff + 10% longevity) to regulatory metrics. _Use case:_ Scores regulatory bodies in source-ranking and trust-pyramid exercises. (`src/lib/scoring/weighting-formulas.ts`)
- **InstitutionalWeightingEngine.calculateResearchScore** — Applies formula (40% Nature Index + 30% Nobel laureates + 20% research budget + 10% age × growth) to research institution metrics. _Use case:_ Scores research institutions for the evidence-authority ranking module. (`src/lib/scoring/weighting-formulas.ts`)
- **InstitutionalWeightingEngine.calculateEducationScore** — Applies formula (35% active learners + 20% countries + 15% languages + 30% peer-reviewed effect-size) to education NGO metrics. _Use case:_ Scores education organizations for the platform's institutional trust ladder. (`src/lib/scoring/weighting-formulas.ts`)

### `src/lib/scoring/xp-engine.ts`
- **XpAndAdaptiveEngine.evaluateSession** — Adds accuracy-proportional XP and runs two adaptive loops: if EIS >0.8 for 3 consecutive sessions, drops difficulty tier; if accuracy >95% for 5 consecutive days, raises difficulty tier. _Use case:_ Adaptive difficulty in learning exercises — prevents both frustration loops and boredom. (`src/lib/scoring/xp-engine.ts`)

---

## src/lib/sources — Source Freshness Monitoring

### `src/lib/sources/freshness-monitor.ts`
- **checkSourceFreshness** — Computes days since last review and assigns a staleness badge: fresh (≤30d), aging (31–60d), stale (61–90d), critical (>90d). _Use case:_ Triggered on dashboard load to flag sources needing re-review. (`src/lib/sources/freshness-monitor.ts`)
- **getFreshnessBadge** — Returns CSS class, color, background color, and label text for a freshness record. _Use case:_ Source cards display the appropriate color-coded badge. (`src/lib/sources/freshness-monitor.ts`)
- **batchCheckFreshness** — Runs freshness checks on an array of sources. _Use case:_ Bulk audit on supervisor dashboard load. (`src/lib/sources/freshness-monitor.ts`)
- **getFreshnessSummary** — Aggregates freshness records into counts (total, fresh, aging, stale, critical) and mean days. _Use case:_ Dashboard stat widget "Source Health". (`src/lib/sources/freshness-monitor.ts`)

---

## src/lib/standard — EAL Governing Standard (Executable Form)

### `src/lib/standard/index.ts`
- **Re-export barrel** — Exports everything from layers, sources, schema, system-prompt, cognition, and logic-layer. _Use case:_ All platform code imports from `@/lib/standard` as the single constitution module. (`src/lib/standard/index.ts`)

### `src/lib/standard/layers.ts`
- **DECEPTION_LAYERS** — Authoritative 8-entry array of `DeceptionLayer` objects with English/Arabic names, definitions, and defense protocols (Layer 1 = Absolute Fabrication through Layer 8 = The Unknown). _Use case:_ Every analysis, LLM prompt, and component that references deception layers imports from here. (`src/lib/standard/layers.ts`)
- **getLayer** — Lookup by layer number, returns `null` for unknown. _Use case:_ Inline layer badge components. (`src/lib/standard/layers.ts`)
- **CANONICAL_LAYERS_PROMPT_BLOCK** — Pre-serialized string of all 8 layers for LLM prompt injection. _Use case:_ Embedded in every system prompt so the model knows the taxonomy. (`src/lib/standard/layers.ts`)

### `src/lib/standard/sources.ts`
- **classifyTier** — Matches a URL hostname against four whitelists (Tier S: academic/indexes; A: WHO/journals/institutions; B: fact-checkers/OSINT; C: community; plus Islamic Authority list mapping to Tier A) and returns `TierInfo`. _Use case:_ Every retrieved source is classified before contributing to confidence scoring. (`src/lib/standard/sources.ts`)
- **tierWeight** — Returns numeric weight (S=100, A=88, B=70, C=45, U=20) for confidence math. _Use case:_ `deriveConfidenceLabel` in schema.ts uses this as the primary weight. (`src/lib/standard/sources.ts`)

### `src/lib/standard/schema.ts`
- **deriveConfidenceLabel** — Maps four Truth-Stack signals (source count, top tier, model agreement, unsupported sentence count) onto a `{label, score}` pair (HIGH/MEDIUM/CONTESTED/UNVERIFIED). Priority ordering: no sources → UNVERIFIED; disagreement → CONTESTED; unsupported sentences cap at 65/MEDIUM; tier weight determines HIGH vs MEDIUM. _Use case:_ Every fact-check result output uses this to derive its honest confidence label, never hardcoding it. (`src/lib/standard/schema.ts`)
- **StandardClaimResultSchema** — Zod schema for the universal output shape `{verdict, confidence, layer, sources[]}`. _Use case:_ Every API route that returns a fact-check result validates against this. (`src/lib/standard/schema.ts`)

### `src/lib/standard/system-prompt.ts`
- **buildSystemPrompt** — Assembles a 6-layer chatbot system prompt from a `SystemPromptSpec`: Layer 1 role identity, Layer 2 epistemic law (cite-or-abstain), Layer 3 8-layer taxonomy injection, Layer 4 preferred sources, optional Layer 4b Islamic Authenticity Protocol, Layer 5 safety rules, Layer 6 locale/Arabic RTL. _Use case:_ Every EAL chatbot (DeepReal, Mental Health, Religion Hub) builds its system prompt from this instead of writing ad-hoc prompts. (`src/lib/standard/system-prompt.ts`)

### `src/lib/standard/cognition.ts`
- **COGNITION_BUILDER** — 8-entry array mapping each deception layer to an exact cognitive defense technique (Lateral Reading+SIFT for L1, Omission Audit for L2, Upstream Reading+Toulmin for L3, Cui Bono for L4, Is-Ought Separation for L5, Inoculation for L6, Systems Mapping for L7, Bayesian Calibration for L8) with bias countered, why explanation, step-by-step procedure, and shield tools. _Use case:_ Every cognition-builder page imports this so defenses are precise and sourced, not generic advice. (`src/lib/standard/cognition.ts`)
- **INOCULATION_TECHNIQUES** — 12-entry manipulation technique taxonomy (from FLICC, Jigsaw, Bad News) each with a one-line prebunk strategy. _Use case:_ Inoculation training modules use these prebunk strings to help users recognize manipulation before exposure. (`src/lib/standard/cognition.ts`)
- **COGNITION_PROMPT_BLOCK** — Pre-serialized per-layer technique+steps string for LLM prompt injection. _Use case:_ Embedded in advanced analysis prompts to steer the model toward named techniques. (`src/lib/standard/cognition.ts`)
- **getDefense / getTechnique** — Lookup helpers by layer number or technique ID. _Use case:_ Inline component rendering of defense cards. (`src/lib/standard/cognition.ts`)

### `src/lib/standard/logic-layer.ts`
- **buildLogicLayerPrompt** — Constructs the Relevance Logic Layer LLM prompt that instructs the model to judge each retrieved source by abstract content (not title or keyword overlap), returning stance (supports/refutes/neutral/unrelated) and relevance score. _Use case:_ The Evidence Aggregator pipeline passes search results through this before using them as grounding. (`src/lib/standard/logic-layer.ts`)
- **applyAdjudication** — Merges LLM adjudication verdicts back onto source objects by index. _Use case:_ Post-processing step after the logic layer call returns. (`src/lib/standard/logic-layer.ts`)
- **unadjudicated** — Fallback that marks all sources as `neutral/0.5` when the logic layer could not run. _Use case:_ Graceful degradation when the adjudication LLM call fails. (`src/lib/standard/logic-layer.ts`)

---

## src/lib/telemetry — xAPI/SCORM Telemetry

### `src/lib/telemetry/xapi-scorm-engine.ts`
- **TelemetryEngine.generateXapiStatement** — Builds a minimal xAPI statement (actor, verb, object, optional score result) for submission to an LRS. _Use case:_ Basic telemetry emission for learning record stores. (`src/lib/telemetry/xapi-scorm-engine.ts`)
- **TelemetryEngine.generateScormPayload** — Produces a SCORM 1.2 `cmi.core.*` payload (lesson_status, score, session_time in HHHH:MM:SS format). _Use case:_ LMS-compatible score reporting when the platform is embedded in a SCORM environment. (`src/lib/telemetry/xapi-scorm-engine.ts`)

---

## src/lib/tracking — Behavioral Dwell-Time Tracking

### `src/lib/tracking/dwell-time-tracker.ts`
- **startDwellSession / endDwellSession** — Opens and closes an `AFSSession` for a specific exercise, persisting the final session with AFS score to localStorage. _Use case:_ Wraps the interaction window of each exercise to capture behavioral data. (`src/lib/tracking/dwell-time-tracker.ts`)
- **recordDwellEvent** — Logs typed behavioral events (accept_click, source_open, archive_check, reverse_search, evidence_check, comparison_action) with timestamps and increments the appropriate counter. _Use case:_ UI components fire this on every verification action to build the AFS behavioral profile. (`src/lib/tracking/dwell-time-tracker.ts`)
- **calculateAFS** — Computes the Acceptance Friction Score (0–100) from the current session's normalized pause time + source opens + evidence checks + comparison actions. _Use case:_ Real-time AFS indicator displayed while the user works through an exercise. (`src/lib/tracking/dwell-time-tracker.ts`)

---

## src/lib/utils.ts — Global Utilities

### `src/lib/utils.ts`
- **cn** — Tailwind class merger combining `clsx` + `tailwind-merge` to resolve conflicting utility classes. _Use case:_ Used by virtually every component for conditional class construction. (`src/lib/utils.ts`)
- **getMVPAccent / getMVPName / getMVPIcon** — Lookup helpers mapping MVP identifiers (`deepreal` / `mental-health` / `religion-hub`) to CSS accent variables, display names, and Lucide icon names. _Use case:_ Themed UI components auto-color themselves based on which MVP they belong to. (`src/lib/utils.ts`)

---

## src/lib/validation — Form and API Validation

### `src/lib/validation/schemas.ts`
- **validateAssessmentSubmission** — Runtime-validates pre/post assessment submissions (instrumentId, phase, responses 0–100, timestamps, participantId). _Use case:_ Research data collection API routes validate incoming form payloads before storing. (`src/lib/validation/schemas.ts`)
- **validateNormalizedSource** — Validates normalized API source cards (id, title, sourceName, url, apiOrigin from 5 allowed APIs). _Use case:_ Unifies responses from FactCheck, OpenAlex, Crossref, Nominatim, and local sources into one shape. (`src/lib/validation/schemas.ts`)
- **validateExerciseSubmission** — Validates exercise completion data (exerciseId, MVP, day 1–14, answers, confidence pre/post, time spent). _Use case:_ 14-day exercise completion API routes validate submissions. (`src/lib/validation/schemas.ts`)

---

## src/lib/verification/index.ts

- **Verification subsystem placeholder** — Exports a no-op `initverification()` initializer. _Use case:_ Trivial barrel; no real logic. (`src/lib/verification/index.ts`)

---

## src/lib/versioning — Content Version History

### `src/lib/versioning/content-history.ts`
- **getContentHistory** — Reads or initializes a versioned content history record for an exercise from localStorage. _Use case:_ Content detail views display the change log for any exercise. (`src/lib/versioning/content-history.ts`)
- **recordContentVersion** — Appends a new version entry (created/updated/reviewed/approved) with author, summary, and optional expert recommendation to the localStorage history. _Use case:_ Expert sign-off and content update workflows record each change. (`src/lib/versioning/content-history.ts`)
- **exportAllHistories** — Collects all `content_history_*` localStorage entries into a single record. _Use case:_ Research pack export for the full audit trail of content changes. (`src/lib/versioning/content-history.ts`)

---

## src/lib/workflow — Expert Sign-off Workflow

### `src/lib/workflow/expert-signoff.ts`
- **createApprovalRecord** — Initializes a `ContentApproval` record in `draft` state requiring 3 expert sign-offs. _Use case:_ A new exercise enters the pipeline in draft state. (`src/lib/workflow/expert-signoff.ts`)
- **addSignOff** — Appends an `ExpertSignOff` (with CVI score 0–1) and advances state: ≥3 sign-offs with average CVI ≥0.78 (Lawshe standard) → `approved`; otherwise → `reviewed` or `expert_review`. _Use case:_ Domain experts digitally sign content before it can be published. (`src/lib/workflow/expert-signoff.ts`)
- **canPublish** — Returns `true` only when state is `approved`. _Use case:_ Publish button guard in the content management UI. (`src/lib/workflow/expert-signoff.ts`)
- **getApprovalBadge** — Returns themed label + color for each content state (draft/expert_review/reviewed/approved/published). _Use case:_ Content list views show colored status badges. (`src/lib/workflow/expert-signoff.ts`)

---

## src/lib/xapi — Full xAPI 1.0.3 Engine

### `src/lib/xapi/xapi-engine.ts`
- **XAPIEngine.buildStatement** — Constructs a fully spec-compliant xAPI 1.0.3 statement (actor mbox, verb IRI, object IRI + definition, optional score + duration + response, EAL-specific extensions, curriculum context grouping). _Use case:_ Every tracked learning activity emits a statement via this builder. (`src/lib/xapi/xapi-engine.ts`)
- **XAPIEngine.emit** — Stores the statement in localStorage (offline-first, up to 500) and fires a non-blocking POST to `/api/supervisor/lrs`. _Use case:_ All curriculum activity completions are tracked without blocking the UI. (`src/lib/xapi/xapi-engine.ts`)
- **XAPIEngine convenience verbs** — `experienced`, `passed`, `failed`, `mastered` helpers with correct score/completion/success defaults matching xAPI verb semantics (passed/mastered require ≥80% / ≥95%). _Use case:_ Exercise and assessment completion calls. (`src/lib/xapi/xapi-engine.ts`)
- **XAPIEngine.getCompletionRate** — Computes the completion rate for a list of required activities from stored statements. _Use case:_ Curriculum progress bars and gating logic. (`src/lib/xapi/xapi-engine.ts`)
- **EAL_ACTIVITIES registry** — Pre-defined `XAPIObject` entries for 10 key routes (Phase 0–4 curriculum modules, Fallacy Engine, Reaction Test, Paper Auditor, Swarm Debate, Inoculation Passport, Hadith Check) with bilingual names and ADL activity types. _Use case:_ Activity IRIs are resolved by path from this registry, preventing magic strings. (`src/lib/xapi/xapi-engine.ts`)
- **createXAPIEngine factory** — Creates a session-scoped `XAPIEngine` with userId and userName bound. _Use case:_ React hook / SSR initialization. (`src/lib/xapi/xapi-engine.ts`)
