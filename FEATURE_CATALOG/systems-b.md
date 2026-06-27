# FEATURE CATALOG — Part B: Scientific / Safety / Measurement Systems

Strategy: Cross-Cutting Systems
Generated: 2026-06-26

---

## 1. MIST-20 Scoring Engine

**Name:** MIST-20 Misinformation Susceptibility Test Scorer

**Explanation:** Implements the published 20-item Misinformation Susceptibility Test (Maertens et al., 2024, Behavior Research Methods DOI: 10.3758/s13428-023-02124-2). Takes a 20-answer submission (real/fake/unsure per headline), computes three sub-scores: `veracityDiscernment` (0–20 correct classifications), `realNewsBias` (distrust vs. naïvete signal), and `fakeNewsAccept` (gullibility rate). Also produces a per-FLICC-category breakdown of which manipulation types the user missed most.

The scoring logic in `src/lib/cognition/mist.ts` is distinct from the instrument configuration in `src/data/instruments/mist-20.ts`. The instrument file contains the exact validated 20 headlines (10 real from Pew/AP/Reuters/Gallup, 10 fake via GPT-2 four-phase protocol), the signal-detection d-prime computation (z(hitRate) − z(falseAlarmRate) with 0.01–0.99 boundary correction per Supplement S17), and an Arabic-adaptation-pending flag (`MIST20_ARABIC_ADAPTATION_PENDING = true`) that triggers a bilingual notice instead of silent RTL fallback.

**Use Case:** Pre/post misinformation resistance measurement. A user takes the MIST-20 before starting the DeepReal MVP and again after completing it; the Efficacy Engine (Feature 6) computes cohort-level improvement. The per-FLICC missed-category breakdown feeds the curriculum's adaptive layer, directing the learner toward their weakest deception type.

**Key Files:**
- `src/lib/cognition/mist.ts` — scorer (veracityDiscernment, realNewsBias, fakeNewsAccept)
- `src/data/instruments/mist-20.ts` — full instrument, d-prime scoring, Arabic pending flag
- `src/lib/cognition/mist-items-2023.json` — version-locked canonical item set

---

## 2. SM-2 Spaced-Repetition Engine

**Name:** SM-2 Spaced-Repetition Scheduler

**Explanation:** A pure, dependency-free TypeScript implementation of the SuperMemo SM-2 algorithm. Takes a `Card` record (ease factor, interval, repetitions, due date) and a quality rating `q` (0–5), then returns an updated card. Ratings below 3 reset repetitions and interval to 1; higher ratings grow the interval by the ease factor. The ease factor is bounded at 1.3 minimum and adjusted via the SM-2 formula: `ease + 0.1 − (5−q)(0.08 + (5−q)×0.02)`.

**Use Case:** Powers the Inoculation Passport and any flashcard-style exercise. When a learner reviews a deception-technique card (e.g., a FLICC fallacy card), their response quality feeds back to schedule the next review at a scientifically optimal interval, maximizing retention with minimal review burden. Deterministic and side-effect-free — can be unit-tested without network or DB.

**Key Files:**
- `src/lib/cognition/sm2.ts` — full SM-2 implementation

---

## 3. FLICC Taxonomy & SIFT Protocol

**Name:** FLICC Manipulation Taxonomy + SIFT Verification Protocol

**Explanation:** A hardcoded canonical taxonomy of five top-level misinformation technique categories (based on John Cook's FLICC framework): F — Fake Experts (credential outside domain, magnified minority), L — Logical Fallacies (30+ subtypes: ad hominem, strawman, false dichotomy, red herring, etc.), I — Impossible Expectations, C — Cherry-Picking, Cn — Conspiracy Theories (unfalsifiable, nefarious intent, self-sealing). Each category carries signatures and counter-strategy arrays.

Also includes the four-step SIFT verification protocol: Stop (pause, notice emotion), Investigate the source (open lateral reading tab), Find better coverage (search independent outlets), Trace the claim to its original context. Both English and Arabic prompts are present for the Stop step.

**Use Case:** The `classifyClaim()` function in `flicc-classifier.ts` references this taxonomy in a two-pass pipeline: a deterministic NLP pass (winkNLP readability, VADER sentiment, regex signatures) followed by an LLM structured-object call only when deterministic confidence is insufficient. The FLICC codes returned feed the MIST-20 missed-category analysis and the Defense Ledger layer tagging.

**Key Files:**
- `src/lib/cognition/flicc.ts` — taxonomy data (FLICC, SIFT)
- `src/lib/cognition/flicc-classifier.ts` — two-pass classifier (deterministic + LLM, KV-cached 24h)

---

## 4. Defense Ledger & Cognitive Immunity Score

**Name:** Defense Ledger + Cognitive Immunity Score (CIS)

**Explanation:** An append-only per-user event log stored in KV (production) or local filesystem (dev), keyed by passport userId. Each `DefenseEvent` records timestamp, surface (descent/chat/debunker/exercise/extension), deception layer (1–8), technique, outcome (caught/missed/reviewed), and optional confidence-before/after values. Bounded at 5,000 events per user.

`deriveMeters()` computes `ImmunityMeters`: total events, accuracy (caught / caught+missed), per-layer defense distribution, layer coverage (0–8 distinct layers practiced), active days, current streak, average confidence shift, and the composite `cognitiveImmunityScore` (CIS, 0–100) via the formula: `100 × (0.4 × accuracy + 0.25 × layerCoverage + 0.2 × volumeScore + 0.15 × streakScore)`.

**Use Case:** The CIS is the platform's per-user north-star metric, backing the product claim "people measurably build named, measured defenses." The per-layer breakdown drives the UI immunity meters on the dashboard. The confidence-shift average measures whether explanations are actually increasing certainty. The streak drives gamification bonuses.

**Key Files:**
- `src/lib/cognition/ledger.ts` — DefenseEvent, appendDefense, getLedger, deriveMeters, ImmunityMeters, CIS formula

---

## 5. Efficacy Engine (Cohort dz / CI / Distrust-Drift Guard)

**Name:** Cohort Efficacy Engine with Distrust-Drift Guard

**Explanation:** Aggregates paired pre/post MIST-20 records across the full participant cohort from the KV assessment store. Computes mean pre/post veracityDiscernment, mean delta, sample SD, within-subjects Cohen's dz (`meanDelta / sdDelta`), 95% CI (`meanDelta ± 1.96×sd/√n`), mean fakeNewsAccept delta (negative = less gullible), and mean realNewsBias delta.

Crucially includes a **distrust-drift guard**: if `realNewsBiasDelta < −0.1`, the system flags the cohort result as suspect — veracity gains may reflect cynicism (rejecting real news) rather than genuine discernment, and the headline is tagged `⚠ DISTRUST-DRIFT flagged`. Caveats are honest: within-subjects only (no control group), self-administered, N-dependent width of CI.

**Use Case:** Generates the one citable impact claim for funders and partners: "Across N=X users, MIST-20 veracity discernment improved from Y to Z (Δ=+W/20, dz=D)." The distrust-drift guard prevents a false win where users become paranoid rather than discerning. Loaded at the admin/supervisor dashboard and in research reports.

**Key Files:**
- `src/lib/cognition/efficacy.ts` — computeCohortEfficacy, loadAllParticipantFiles, CohortEfficacy type

---

## 6. Doctor-Test Credential Validator

**Name:** Doctor-Test (Egyptian Medical Credential Checklist)

**Explanation:** A five-item client-side heuristic checklist for evaluating the credibility of a medical/expert authority claim in the Egyptian context. The five binary questions test: stated specialty, Egyptian Medical Syndicate registry listing, public-hospital/university affiliation, peer-reviewed publications, and professional society membership (e.g., Egyptian Psychiatric Association). Available in English and Arabic.

**Use Case:** Surfaced inside the Religion Hub and Mental Health MVPs whenever a user encounters a health claim backed by a named "expert." The checklist operationalizes the FLICC "Fake Experts" category into an Egypt-specific credential-verification protocol. Pure client check, no network required.

**Key Files:**
- `src/lib/cognition/doctor-test.ts` — DOCTOR_TEST checklist object

---

## 7. 8-Layer Deception Taxonomy (Canonical)

**Name:** EAL 8-Layer Deception Taxonomy

**Explanation:** The platform's canonical deception classification schema, defined as a single server-safe TypeScript constant array. Eight layers in ascending complexity: L1 Absolute Fabrication, L2 Biased Lens, L3 Decontextualization, L4 Weaponized Timing, L5 Evil Application, L6 Matrix of Manipulation (aggregates all layers + exploits vulnerability), L7 Mega-Machine (invisible architects, algorithmic rails), L8 The Unknown (AI black boxes, mass psychogenic anomalies — no clean answer). Each layer carries English and Arabic names, definition, defense instruction, and Arabic defense.

Exposes `getLayer(n)` and `CANONICAL_LAYERS_PROMPT_BLOCK` (a compact string for embedding in LLM system prompts). Governed by the scientific standard §5.

**Use Case:** Every classification-producing system — the FLICC classifier, the God-System, the Defense Ledger, the scrollytelling Descent page — references this single source of truth for layer numbers and defense protocols. The LLM prompt block ensures models reason within the taxonomy's definitions rather than inventing their own.

**Key Files:**
- `src/lib/standard/layers.ts` — DECEPTION_LAYERS array, getLayer(), CANONICAL_LAYERS_PROMPT_BLOCK

---

## 8. MHLS Psychometric Instrument

**Name:** Mental Health Literacy Scale (MHLS) — O'Connor & Casey (2015)

**Explanation:** A 35-item validated psychometric scale (α = .873) measuring mental health literacy across six subscales: recognition of mental disorders (8 items, 4-point), knowledge of risk factors (2 items, 4-point), social distance/willingness (5 items, 5-point), information-seeking confidence (4 items, 5-point), and attitudes toward mental illness (16 items, 5-point, 6 items reversed). Score range 35–165. Arabic labels are provided for all response options.

The implementation notes important licensing status: the exact instrument wording is representative pending author permission; items are flagged as not verbatim validated. Section labels not confirmed in the published abstract are tagged `social_distance` to match content rather than speculating. Scoring reverses tagged items and computes subscale and total sums.

**Use Case:** Pre/post administration in the Mental Health MVP to measure whether the platform increases users' ability to recognize mental disorders, reduces stigma, and improves help-seeking attitudes. Subscale profiles drive personalized content recommendations (e.g., users scoring low on recognition receive additional psychoeducation modules).

**Key Files:**
- `src/data/instruments/mhls.ts` — 35 items, subscale structure, scoring function, createMHLSConfig()

---

## 9. GHSQ — General Help-Seeking Questionnaire

**Name:** General Help-Seeking Questionnaire (GHSQ) — Wilson et al. (2005)

**Explanation:** A 17-item flexible instrument measuring help-seeking *intentions* (not behavior) on a 7-point Likert scale (1 = Extremely unlikely, 7 = Extremely likely). Test-retest reliability r = .86. Two sections: personal/emotional problems (10 items, one reversed "would not seek help"), and suicidal ideation (7 items). Help sources are adapted for the Egyptian university context: intimate partner, friend, parent, other relative, mental health professional, phone helpline (16328 — the Egyptian hotline), GP, religious leader (imam/priest/sheikh), university counselling, and the "no one" reversed item. All items are bilingual EN/AR.

**Use Case:** Pre/post measurement in the Mental Health MVP. Suicidal ideation items are accompanied by a crisis disclaimer in the instrument description linking to 16328. Higher scores = greater help-seeking intentions. Results identify whether EAL reduces the stigma barrier to seeking professional help and whether religious-leader pathways remain high in the post condition (culturally relevant finding for Egypt).

**Key Files:**
- `src/data/instruments/ghsq.ts` — 17 items, scoring function, createGHSQConfig()

---

## 10. Brief RCOPE — Religious Coping Scale

**Name:** Brief RCOPE (Pargament et al., 2011)

**Explanation:** A 14-item validated instrument measuring positive and negative religious coping (7 items each), scored on a 4-point scale (Not at all → A great deal). Positive subscale α = .90 (benevolent God, collaborative coping, spiritual growth); negative subscale α = .81 (divine punishment, abandonment, demonic reattribution). Validated in Muslim populations including Arabic versions. Items are reproduced verbatim from the published instrument. The scoring function deliberately separates positive and negative subscales — they must not be summed into a single total.

A critical safety flag is documented in the scoring comments: if the Negative subscale shows a statistically significant increase post-intervention (p < .05), this signals potential harm to the participant and must be investigated before reporting results.

**Use Case:** Measures the Religion Hub MVP's effect on religious coping style. The dual-subscale structure enables detection of both a beneficial outcome (positive coping up) and a harmful one (negative coping up). Pre/post comparison. Arabic labels for response options are included for direct bilingual rendering.

**Key Files:**
- `src/data/instruments/brief-rcope.ts` — 14 items, positive/negative subscale scoring, harm-flag note
- `src/data/instruments/brief-rcope.json` — static JSON companion

---

## 11. MC-SDS Anti-Gaming Instrument

**Name:** Marlowe-Crowne Social Desirability Scale — Short Form C (MC-SDS)

**Explanation:** Reynolds (1982) 13-item True/False scale (α = .76) measuring the tendency to respond in socially desirable ways. Scored 0–13: items describing socially undesirable behaviors (reversed, e.g. "I sometimes feel resentful") score 1 point for FALSE; items describing universally desirable behaviors (e.g. "I'm always a good listener") score 1 point for TRUE. Higher score = greater social desirability bias. Pre-only administration — used as a statistical covariate in ANCOVA to control for participants who answer assessments the "right way" rather than honestly.

The instrument is in the public domain (Crowne & Marlowe, 1960 + Reynolds, 1982 short form).

**Use Case:** Applied at baseline to identify participants likely to inflate their self-reported mental health literacy or help-seeking intentions. By including MC-SDS score as a covariate in the pre/post analysis, the research team can report results controlling for response bias, improving the scientific credibility of efficacy claims.

**Key Files:**
- `src/data/instruments/mc-sds.ts` — 13 items, reversed-item scoring, createMCSDSConfig()

---

## 12. SUS — System Usability Scale

**Name:** System Usability Scale (SUS) — Brooke (1996)

**Explanation:** The canonical 10-item usability questionnaire (α = .91). Items use the EXACT original "system" wording — the code explicitly notes that changing "system" to "platform" or "app" invalidates psychometric properties. Odd items (positive): contribution = response − 1. Even items (negative): contribution = 5 − response. Total × 2.5 scales to 0–100. Benchmarks: ≥80.3 = Grade A (top 10%), ≥68 = Grade B (above average), ≥51 = Grade C (average). Post-only. Arabic response labels are provided.

**Use Case:** Post-condition usability measurement. If the SUS score falls below 68, the platform fails the usability bar and interface redesign is triggered before the research can claim the intervention was fairly delivered. Also reported alongside efficacy findings as a design quality check.

**Key Files:**
- `src/data/instruments/sus.ts` — 10 items, exact Brooke wording enforcement note, grading logic
- `src/data/instruments/sus.json` — static JSON companion

---

## 13. MegaRotator v8 — Multi-Provider AI Failover

**Name:** MegaRotator v8 (Gemini-First Multi-Provider AI Failover)

**Explanation:** A priority-ordered rotating pool of up to ~20 AI API slots across 7 providers: Gemini (up to 7 keys, gemini-2.5-flash) → Groq (up to 5 keys, llama-3.3-70b) → OpenRouter (2, llama-3.3-70b free) → Cerebras (2, llama-3.3-70b) → Together (1, Llama-3.3-70B-Turbo) → SambaNova (1, Llama-3.3-70B) → NVIDIA NIM (up to 5, Nemotron-550B, last because ~20s latency). Each slot maintains a cooldown timestamp; rate-limit errors extract `retry-after` and set per-slot cooldowns. A per-attempt hard ceiling of 28,000ms prevents stalled slots from blocking the rotation. Maximum attempts = `SLOTS.length × 2`.

Exposes `rotatingGenerateObject()` (structured JSON via Zod schemas) and `rotatingGenerateText()` (plain text). The `nvidia-first.ts` module is now a thin wrapper over the rotator — all callers using `nvidiaFirstGenerate()` are now rotator-backed. A `getActiveGeminiModel()` export for streaming routes and `getActiveNvidiaModel()` for routes explicitly needing 550B are also provided.

**Use Case:** Every AI-powered feature in the platform — chatbots, FLICC classifier (LLM pass), debunker, God-System analysis, forensic analysis, claim scoring — calls through this rotator. This eliminates single-provider outages and rate-limit cascades. When 14 keys are configured across providers, the platform can sustain high-throughput classroom use without degradation.

**Key Files:**
- `src/lib/debunking/gemini-rotator.ts` — full rotator implementation
- `src/lib/ai/nvidia-first.ts` — compatibility shim → rotator
- `src/lib/ai/providers.ts` — older simple provider cascade (Gemini/Groq/GitHub/HuggingFace) still active for some routes

---

## 14. Evidence Aggregator — 7-API Academic Retrieval

**Name:** Evidence Aggregator (7 Academic APIs, Free-First, Cohere-Reranked)

**Explanation:** Fan-out parallel fetcher hitting seven open-access academic APIs: OpenAlex, Semantic Scholar, Europe PMC, DOAJ, arXiv, CORE, and optionally Crossref (paid/metadata-only, excluded unless `includePaid=true`). Each source normalizes results to `NormalizedAPIResponse` with `trustBand` (A/B/C), `accessTier` (free/mixed/paid/unknown), and `openAccess` boolean. Results are scored: accessScore (free=30, mixed=18) + trustScore (A=30, B=18, C=8) + officialScore (official_guidance=24, journal=16). Scored results are sorted free-first, then semantically reranked by the Cohere rerank-v3.5 multilingual model (handles Arabic + English). Reranker fails safe — if unavailable, trust-order is used.

The route caches with 30-minute revalidation (`withSearchCache`). Each fetch has individual `.catch(()=>[])` so a single API failure never blocks results from others.

**Use Case:** Every AI chatbot or verification pipeline that needs to back a claim with real, resolvable academic evidence calls `aggregateEvidence()`. The route `/api/search/evidence?q=...` is the thin public interface. The free-first policy ensures users in Egypt without institutional access can actually reach the evidence. Cohere reranking ensures the most semantically relevant results surface first regardless of citation count.

**Key Files:**
- `src/lib/evidence/aggregate.ts` — aggregateEvidence(), 7 fetchers, scoring, Cohere rerank
- `src/app/api/search/evidence/route.ts` — GET route, 30-min cache wrapper

---

## 15. Source-Tier Classifier (Tiered Whitelist)

**Name:** Tiered Source Whitelist + Classifier

**Explanation:** A domain-whitelist classifier assigning every URL to one of five tiers: S (primary academic indexes: OpenAlex, Semantic Scholar, PubMed, arXiv, Cochrane, etc.), A (top institutions/journals: WHO, UN, CDC, NIH, Nature, Lancet, NEJM, CAPMAS, MOHP Egypt), B (fact-check/OSINT: Reuters, AP, Snopes, FullFact, Bellingcat, BBC), C (community knowledge: Wikipedia, Retraction Watch — lead, never proof), U (unlisted/unverified). Islamic authority domains (quran.com, sunnah.com, dar-alifta.org, azhar.eg, islamqa.info, etc.) default to Tier A unless their parent matches a higher tier. `tierWeight()` maps tiers to numeric weights (S=100, A=88, B=70, C=45, U=20) for sorting.

**Use Case:** Called by the Output Enforcer (Feature 16) on every AI-produced source URL. Also used directly in the Evidence Aggregator to assign trustBand before the Cohere rerank. The whitelist is the single chokepoint that enforces the platform's One Law — no Tier U source can be presented as evidence.

**Key Files:**
- `src/lib/standard/sources.ts` — TIER_S/A/B/C arrays, ISLAMIC_AUTHORITY list, classifyTier(), tierWeight()

---

## 16. One-Law Output Enforcer & applyVerdictEnforcement

**Name:** One-Law AI Output Enforcer (applyVerdictEnforcement)

**Explanation:** The platform-wide enforcement module that applies the governing standard's "One Law" (no claim reaches the user without a real, resolvable source) to all AI-generated output. `enforceOneLaw(candidates)` takes the model's candidate source list, classifies each via `classifyTier()` (or trusts pre-assigned tiers from the evidence aggregator), and returns an `EnforcementResult`: a `verified` status only if ≥1 Tier S–C source is present, plus admitted sources sorted strongest-first, rejected Tier-U sources, tier floor, and a plain-English reason when unverified.

`enforceSourcedOutput()` validates the full AI output shape via Zod (`SourcedAIOutputSchema`: text + sources[] with min 1) and then enforces the One Law. `applyVerdictEnforcement()` downgrades unsourced verdicts to `verdict:"UNVERIFIED"` with confidence capped at 0.2 — the route can never present a fabricated claim as fact.

The guardrails module (`src/lib/ai/guardrails.ts`) handles the upstream input side: medical diagnosis boundary (blocks "diagnose/prescribe/treatment plan" keywords in Mental Health MVP), fatwa boundary (blocks religious-ruling requests in Religion Hub MVP), self-harm/crisis redirect, jailbreak detection, and emotional trigger highlighting (VADER-backed lexicon with CSS-class output).

**Use Case:** Every `/api/ai/*` route and chatbot wraps AI responses in `enforceSourcedOutput()` before returning to the client. This is the technical implementation of the constitution clause: the platform can be audited at the source level to confirm that every public-facing AI claim is backed by a whitelisted source. `applyVerdictEnforcement()` is the last defense before the JSON leaves the server.

**Key Files:**
- `src/lib/ai/output-enforcer.ts` — enforceOneLaw(), enforceSourcedOutput(), applyVerdictEnforcement(), SourcedAIOutputSchema
- `src/lib/ai/guardrails.ts` — checkGuardrails() (medical/fatwa/harm), detectEmotionalTriggers(), logMisuseAttempt()

---

## 17. Mindframe Suicide-Safe Gate

**Name:** Mindframe Safe Messaging Gate (streaming content guard)

**Explanation:** Implements the Mindframe suicide-safe messaging guidelines as a real-time content filter applied to every AI text stream in mental-health contexts. A `FORBIDDEN` array of regex patterns blocks method-detail content (hanging, overdose quantities, "committed suicide" glamorization phrasing, "peaceful escape from pain" language, sensational "epidemic/crisis/wave" headlines). A `REQUIRED_PROXIMITY` rule enforces that any content containing a suicide-related trigger word must have a crisis hotline reference within 300 characters in either direction.

`mindframeAudit(content)` returns `{ok, violations[]}`. The `safeStream()` function in `stream-gate.ts` wraps the AI SDK's `streamText`, buffers each chunk, and throws a `MindframeViolation` error that halts the stream if `mindframeAudit` fails — ensuring unsafe content never reaches the user mid-stream.

**Use Case:** All mental-health chatbot streaming routes pass through `safeStream()`. If a violating pattern appears (e.g., the model produces method details or glamorizing language), the stream is immediately terminated and the caller can replace the output with the crisis hotline redirect. This is the platform's primary clinical-safety guarantee for the Mental Health MVP.

**Key Files:**
- `src/lib/safety/mindframe.ts` — FORBIDDEN patterns, REQUIRED_PROXIMITY, mindframeAudit(), MindframeViolation
- `src/lib/safety/stream-gate.ts` — safeStream() wrapper

---

## 18. Abuse Logger & Critical Alert System

**Name:** Misuse / Abuse Event Logger (Q87)

**Explanation:** Client-side misuse detection and logging module. `scanForAbuse()` tests user input against two pattern sets: a jailbreak blocklist (50+ patterns: "ignore previous instructions", "act as", "DAN mode", "system prompt", SQL injection, XSS vectors, etc.) and a self-harm detector. Returns a typed `AbuseLogEntry` with violationType (jailbreak/self_harm/diagnosis_attempt/fatwa_attempt/hate_speech/other), severity (low/medium/high/critical), and the triggering guardrail.

Critical events trigger a fire-and-forget POST to `/api/safety/alert` with `keepalive:true`, plus localStorage persistence as fallback. Up to 100 log entries are maintained in localStorage for supervisor review. `exportAbuseLogs()` and `getAbuseStats()` provide structured access for the supervisor dashboard.

**Use Case:** Continuously monitors all AI-assisted interaction surfaces. When a user attempts prompt injection or expresses suicidal ideation via the chatbot interface, the event is logged, escalated to the server, and the guardrail triggers a crisis redirect. Supervisor reviews the `critical_alerts` log at the end of each session window.

**Key Files:**
- `src/lib/safety/abuse-logger.ts` — scanForAbuse(), AbuseLogEntry, persistAbuseLog(), triggerAdminAlert(), exportAbuseLogs()
- `src/lib/safety/llm-input.ts` — InputSafetyGuard class, 50-pattern promptInjectionBlocklist, sanitizeInput()

---

## 19. NVIDIA Nemotron Content Safety Module

**Name:** NVIDIA Nemotron-3.5 Content Safety Classifier

**Explanation:** Server-side content moderation using NVIDIA's Nemotron-3.5 Content Safety model (4B parameters, multilingual including Arabic). `checkContentSafety(text, mode)` calls the NVIDIA NIM API with a structured JSON-output prompt that categorizes harm type (hate_speech, harassment, violence, self_harm, sexual, dangerous_content, misinformation, religious_hate) and returns action (allow/rewrite/block/flag), confidence, and reasoning. Operates in both `input` mode (screen user text before passing to the GOD-System) and `output` mode (screen LLM responses before delivery). Fails-open: if the API key is absent or the API returns an error, the call returns `safe:true/action:allow` rather than blocking all traffic. `batchCheckSafety()` processes multiple texts in parallel.

**Use Case:** Pre-screening user inputs before the high-capability GOD-System analysis pipeline, and post-screening LLM outputs before delivery to the user. Especially important for Arabic-language inputs where Western-trained safety models have weaker coverage. The Arabic capability is explicitly selected via the multilingual model. Results feed the Supervisor Dashboard safety score.

**Key Files:**
- `src/lib/safety/nvidia-content-safety.ts` — checkContentSafety(), isContentSafe(), batchCheckSafety()

---

## 20. SemaFor Forensic Engine

**Name:** SemaFor Deepfake / Synthetic Media Detection (Educational Simulation)

**Explanation:** IMPORTANT — this module is self-labeled as an educational simulation (`SEMAFOR_IS_SIMULATION = true`). It describes, but does not perform, two forensic detection techniques: Remote Photoplethysmography (rPPG) analysis for detecting AI-generated video (real implementation requires a server-side CAN model pipeline not wired here), and Iterative Adaptive Inverse Filtering (IAIF) for voice cloning detection (requires real glottal-source signal processing). Both methods return `null` rather than a random verdict, explicitly because returning a fabricated forensic result would violate the One Law.

The educational value is in the interface definitions: `SemanticAnomaly` with `PHYSICAL_LIGHTING`, `ACOUSTIC_REVERBERATION`, `ACTION_UNIT_VIOLATION`, `BIOLOGICAL_rPPG` types — which describe real artifact categories a future backend could detect.

**Use Case:** Teaches learners what rPPG and IAIF detection look for (the biological rhythms and glottal vibration patterns that generative models fail to replicate authentically). Any UI using this module must check `SEMAFOR_IS_SIMULATION` and display a disclaimer. It must never be presented as a real deepfake verdict.

**Key Files:**
- `src/lib/science/forensics/semafor-engine.ts` — ForensicEngine class, SEMAFOR_IS_SIMULATION flag, educational stubs

---

## 21. ZKP Identity Engine

**Name:** Zero-Knowledge Proof Humanity Verification (Educational Stub)

**Explanation:** IMPORTANT — this module explicitly performs no real ZK proof verification. It describes the architecture of Plonk/Circom-based ZKP Sybil resistance using a Rate Limiting Nullifier (RLN) pattern. `verifyHumanity()` unconditionally returns `false` because no snarkjs verification key is loaded and no cryptographic proof pipeline exists. `checkRateLimitingNullifier()` implements a stub integer comparison (messagesPerMinute > 5) clearly labeled `EDUCATIONAL_STUB`, not real RLN (which requires polynomial interpolation over duplicate nullifier hashes).

**Use Case:** Educates learners about privacy-preserving anonymous verification (how platforms could verify "this is a real human" without revealing identity). Because the module is entirely honest about its simulation status, it serves the curriculum's Layer 1–3 defense education (identity authentication as a defense against fabrication campaigns) without making any false technical claim.

**Key Files:**
- `src/lib/science/forensics/zkp-identity.ts` — ZKPIdentityEngine, verifyHumanity() (returns false), checkRateLimitingNullifier() (educational stub)

---

## 22. Epistemic Quarantine Classifier

**Name:** Layer 8 Epistemic Threshold / Containment Classifier

**Explanation:** IMPORTANT — this module is a pure classifier, not a runtime containment system. `Layer8Containment.enforceEpistemicQuarantine(entropy, driftFlag)` returns `true` (a boolean) when caller-supplied entropy > 0.95 or semantic drift is detected, emitting a console warning. It does not isolate output streams, wipe context windows, or close WebSockets. `triggerSubstrateStarvation(durationMs)` throws `Error("ERR_SUBSTRATE_SEVERED")` when interaction time exceeds 45 continuous minutes — a signal for the caller to prompt a break, not a lockout.

The module documentation is explicit: "Those actions would require OS/network-level intervention that is entirely outside the scope of this module."

**Use Case:** The caller (e.g., a chat session manager) uses the boolean or caught error to decide whether to display a forced break screen, disable the input field for a cooldown period, or show the Layer 8 "Unknown" defense message. Maps to the 8-layer taxonomy's Layer 8 defense: respond with calibrated uncertainty; never manufacture false closure.

**Key Files:**
- `src/lib/science/containment/epistemic-quarantine.ts` — Layer8Containment, enforceEpistemicQuarantine(), triggerSubstrateStarvation()

---

## 23. TMT Anchor Protocol (Ontological Stability)

**Name:** Terror Management Theory Anchor Protocol (Trauma-Informed UI)

**Explanation:** Implements a Terror Management Theory (TMT) + Psychological First Aid (PFA) inspired state machine for stabilizing user experience when encountering psychologically destabilizing Layer 7 content (the Mega-Machine / architects). `evaluateOntologicalStability(interactionChaos)` maps a 0–1 chaos score to one of four phases: ASSESS (>0.9), VALIDATE (>0.7), GROUND (>0.5), RECONSTRUCT (otherwise). `getTraumaInformedTheme(phase)` returns corresponding UI theme values: extreme sensory reduction (black background, 20px blur, extremely-slow pacing) for ASSESS, progressively relaxing to normal for RECONSTRUCT.

The "Calm Design" principle: when cognitive reality destabilizes, the UI becomes hyper-predictable and low-stimulation to support psychological grounding.

**Use Case:** Applied by the Descent scrollytelling page and any Layer 7 content module when `interactionChaos` (computed from user interaction signals) exceeds a threshold. The theme values drive real CSS/Framer Motion parameters, turning the interface into a grounding tool rather than an additional source of stimulation.

**Key Files:**
- `src/lib/science/ontological/tmt-anchor.ts` — AnchorProtocol, evaluateOntologicalStability(), getTraumaInformedTheme()

---

## 24. Strategic Friction / Cognitive Firewall

**Name:** Cognitive Firewall — Strategic Algorithmic Friction (CogSec)

**Explanation:** Implements a CogSec defensive measure against dopamine-hijacking scroll loops. `CognitiveFirewall.assessCognitiveLoad(biometrics)` scores load 0–100 from three biometric signals: HRV < 40ms (low = stress, +30 points), scroll velocity > 1500px/s (doomscrolling, +40 points), screen time > 60 minutes (+20 points). `calculateFrictionDelay(cognitiveLoad)` returns a mandatory UI delay: 3000ms for load > 75 (HIGH — injects Strategic Friction), 1000ms for load > 50, 0ms otherwise.

The OODA loop framing: "if the algorithm is predicting the user, we introduce un-computability." The forced delay breaks the immediate stimulus-response reward cycle.

**Use Case:** The UI layer uses the delay return value to insert a mandatory pause before rendering the next content unit — a literal speed bump that breaks the reinforcement loop. Because real biometric data (HRV, scroll velocity) would come from device sensors or scroll-event tracking, callers are responsible for supplying accurate signal values; the module only computes the response.

**Key Files:**
- `src/lib/science/cogsec/strategic-friction.ts` — CognitiveFirewall, assessCognitiveLoad(), calculateFrictionDelay()

---

## 25. Gamification XP Engine

**Name:** XP Engine (Experience Points, Levels, Badges, Streaks)

**Explanation:** localStorage-backed gamification engine grounded in Deterding et al. (2012), Deci & Ryan Self-Determination Theory, and Fogg Behavior Model. Tracks a `PlayerProfile`: totalXP, 9-tier level system (Novice → Master, 0–12,000 XP), 21 badges (7 per MVP: DeepReal, Mental Health, Religion Hub), daily streak with bonuses at 3/7/14 days, completed exercise IDs, and per-MVP progress counters.

XP awards: exercise_complete=100, gate_verified=50, streak_bonus=200, badge_unlock=150, assessment_complete=300, source_verified=25, mvp_complete=1000, perfect_score=500. Deduplication via `awardedKeys` prevents double-earning. `getCohortStats()` returns an `isSample:true` flag when no real multi-user cohort data is loaded — the UI must display a disclaimer and not present single-user data as community activity.

**Use Case:** Fires on every exercise completion, source verification, assessment submission, and streak update across all three MVPs. Drives the gamified dashboard: level progress bar, badge collection, streak counter. The `mvpProgress` counters (0–14 per MVP) unlock MVP-completion badges and can gate access to advanced curriculum phases.

**Key Files:**
- `src/lib/gamification/xp-engine.ts` — PlayerProfile, awardXP(), getPlayerProfile(), BADGE_REGISTRY, LEVELS, XP_REWARDS
- `src/lib/gamification/celebrations.ts` — canvas-confetti celebrateProgress() (badge/level/track-complete visual feedback)

---

## 26. xAPI / SCORM Telemetry Engine

**Name:** xAPI (Experience API) Statement Engine (SCORM-compatible)

**Explanation:** Full xAPI 1.0.3 statement emitter. `XAPIEngine` class generates conformant statements with actor (Agent, mailto IRI), verb (experienced/passed/failed/mastered/launched/progressed — all with IRI + EN/AR display labels), object (Activity with IRI, bilingual name/description, ADL activity type), result (raw/min/max/scaled score, completion, success, ISO 8601 duration), and context (registration UUID, grouping to the EAL-24W-v1.0.0 course, EAL extensions). Persists to localStorage (up to 500 statements, offline-first) and fires non-blocking POST to `/api/supervisor/lrs` with keepalive.

The `EAL_ACTIVITIES` registry maps 10 platform routes to typed Activity objects (phases 0–4, fallacy-engine, reaction-test, paper-auditor, swarm-debate, inoculation-passport, hadith-check). `getCompletionRate()` derives exercise completion percentage from stored statements.

**Use Case:** Every curriculum activity emits an xAPI statement. The Supervisor Dashboard aggregates these statements from the LRS endpoint to track per-learner and cohort progress in a format interoperable with any LRS (Learning Locker, SCORM Cloud, etc.). The `experienced` verb fires on activity launch; `passed`/`failed` fire on scored assessments; `mastered` fires at ≥95% or Bloom L5+ performance.

**Key Files:**
- `src/lib/xapi/xapi-engine.ts` — XAPIEngine, XAPIStatement, EAL_ACTIVITIES, VERB_IRIS, createXAPIEngine()

---

## 27. Verifiable Cognitive Immunity Certificate

**Name:** Cognitive Immunity Certificate — HMAC-Signed, Server-Verified

**Explanation:** A tamper-evident (not tamper-proof) credential issued at `/api/certificate/generate` (POST) and publicly verifiable at the same endpoint (GET `?id=<uuid>&name=<holder>`). The MIST-20 score is read server-side from `kvStore.get("mist:<userId>:latest")` — never trusted from the request body, preventing self-issue with a fabricated score. A composite final score is computed: `0.3 × (XP/max) + 0.25 × (passportLevel/5) + 0.20 × (mist20/100) + 0.15 × (socraticSwarm/100) + 0.10 × (forwardDefense/required)`.

Criteria (C1–C5): 100% exercise completion, MIST-20 ≥ 90% (server-measured), Socratic Swarm ≥ 95, logical coherence ≥ 32/35, fallacy detection ≥ 32/35, EIS ≤ 0.3, finalScore ≥ 90%. Each record is persisted at `cert:<uuid>` in KV with a SHA-256 + HMAC-SHA256 signature over `uuid||nameHash||finalScore||issuedAt||curriculumVersion`. Verification recomputes the HMAC; a name mismatch or revocation flag fails verification. The certificate self-describes as "self-issued, methodology-published — not an accredited degree."

**Use Case:** Graduates of the full EAL curriculum receive a shareable credential. Employers, NGOs, and researchers can verify the credential's authenticity at a public URL. The server-side MIST score prevents certificate farming. The One Law is applied to the credential itself: the display copy is explicit about what it certifies and what it does not.

**Key Files:**
- `src/app/api/certificate/generate/route.ts` — POST (issue), GET (verify), HMAC signing, criteria thresholds, server-side MIST read

---

## Summary Table

| # | Feature | Category | Key Metric / Property |
|---|---------|----------|-----------------------|
| 1 | MIST-20 Scorer | Psychometric | 20 items, d-prime, FLICC miss-map |
| 2 | SM-2 Scheduler | Cognition | Pure deterministic, E-factor scheduling |
| 3 | FLICC + SIFT | Cognition | 5 categories, 30+ fallacy subtypes, 4-step protocol |
| 4 | Defense Ledger / CIS | Measurement | Append-only events, CIS 0–100 composite |
| 5 | Efficacy Engine | Measurement | dz, 95% CI, distrust-drift guard |
| 6 | Doctor-Test | Cognition | 5-item Egyptian credential checklist |
| 7 | 8-Layer Taxonomy | Standard | Canonical server-safe definition array |
| 8 | MHLS | Psychometric | 35 items, 6 subscales, α=.873 |
| 9 | GHSQ | Psychometric | 17 items, 7-point, Egyptian-adapted |
| 10 | Brief RCOPE | Psychometric | 14 items, positive/negative subscales, harm flag |
| 11 | MC-SDS | Anti-Gaming | 13 items, social desirability covariate |
| 12 | SUS | Usability | 10 items, 0–100, α=.91 |
| 13 | MegaRotator v8 | AI Infrastructure | 7 providers, 20 slots, 28s per-attempt timeout |
| 14 | Evidence Aggregator | AI / Research | 7 APIs, free-first, Cohere rerank-v3.5 |
| 15 | Source-Tier Classifier | Standard | S/A/B/C/U tiers, Islamic authority list |
| 16 | One-Law Enforcer | Safety / Standard | applyVerdictEnforcement, Tier U blocks |
| 17 | Mindframe Gate | Safety | Forbidden patterns, 300-char hotline proximity, streaming |
| 18 | Abuse Logger | Safety | 50-pattern blocklist, critical alert POST, localStorage |
| 19 | NVIDIA Content Safety | Safety | Nemotron-3.5, 12 languages, Arabic, fail-open |
| 20 | SemaFor Engine | CogSec (simulation) | rPPG + IAIF stubs, SIMULATION=true |
| 21 | ZKP Identity | CogSec (simulation) | RLN stub, unconditionally returns false |
| 22 | Epistemic Quarantine | CogSec | entropy > 0.95 → boolean flag, 45-min break guard |
| 23 | TMT Anchor | CogSec | 4-phase trauma-informed UI theming |
| 24 | Strategic Friction | CogSec | HRV/velocity/time → mandatory delay (0–3000ms) |
| 25 | XP Engine | Gamification | 9 levels, 21 badges, 5 XP sources, streak bonuses |
| 26 | xAPI Engine | Telemetry | xAPI 1.0.3, 6 verbs, LRS POST, localStorage fallback |
| 27 | Certificate API | Credentialing | HMAC-signed, server-side MIST, 5-criterion gate |
