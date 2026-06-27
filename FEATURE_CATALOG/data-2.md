# Data & Content Assets — slice data-2

Slice covers items 126–250 (1-based, inclusive) from the ASCII-sorted list of `src/data/**/*.{ts,json}`.
Total files covered: **125**.

---

## curriculum/days — Day Stub Files (days 68-99, and day 7, 8, 9)

Files: `src/data/curriculum/days/day68.ts` through `src/data/curriculum/days/day99.ts` (plus day7, day8, day9) — 35 stub files, each 16 lines.

All follow an identical structure: they export a `DailyExercise` typed constant with `id`, `dayNumber`, `weekNumber`, `phaseTopic`, and `exerciseType`.

- **Daily Exercise Payload Stub** — A typed constant giving a single day's metadata (day number, week, phase topic, exercise type, and prompt string) for the curriculum router to load. _Use case:_ The curriculum router imports these stubs to know which topic and exercise type to display on a given calendar day. (`src/data/curriculum/days/day68.ts` through `day99.ts`, `day7.ts`, `day8.ts`, `day9.ts`)

Notable phase topics and exercise types represented in this range:
- Days 68-84: Scientific Literacy — exercise types include Historical Case Study (Analysis), Weekly Assessment & Synthesis (Quiz), Socratic Defense Drill, Evidence Pyramid Game, Paper-Auditor Matrix, Correlation vs Causation Simulator.
- Days 85-99: Islamic Literacy — exercise types include WhatsApp Forward Check (Viral Takhrij), Hadith Verification Sprint, Maqasid Alignment Check, Usul al-Fiqh intro, Weekly Assessment & Synthesis (Quiz).
- Days 7-9: Psychological Calibration / Foundational Cognition — exercise types include Theory Introduction (MDX Payload), Bias Fingerprint drill, Expert Voice Calibration.

---

## curriculum/phase0-calibration.ts

- **Phase 0 Curriculum Definition (Psychological Calibration)** — Exports the `phase0Calibration` constant typed as `CurriculumPhase`, defining 4 weeks of psychological calibration training covering filter bubbles, emotional trigger mapping, the illusory truth effect, and base-rate primer. _Use case:_ Drives the curriculum overview UI and router to display week-by-week objectives, core mechanics, and assessment types for Phase 0. (`src/data/curriculum/phase0-calibration.ts`)
- **CurriculumWeek / CurriculumPhase Interface Definitions** — Declares the shared TypeScript interfaces (`CurriculumPhase`, `CurriculumWeek`) used across all 5 phase files. _Use case:_ Imported by all other phase files to enforce type consistency. (`src/data/curriculum/phase0-calibration.ts`)

---

## curriculum/phase1-cognition.ts

- **Phase 1 Curriculum Definition (Foundational Cognition)** — Exports `phase1Cognition` with 4 weeks: Cognitive Bias Fingerprint, Logical Fallacies Engine Part 1 (ad hominem/strawman/appeal to emotion), Logical Fallacies Engine Part 2 (Gish Gallop/false equivalence), and Socratic Defense simulator. _Use case:_ Drives curriculum overview and exercise routing for Phase 1 (weeks 5–8). (`src/data/curriculum/phase1-cognition.ts`)

---

## curriculum/phase2-science.ts

- **Phase 2 Curriculum Definition (Scientific & Medical Literacy)** — Exports `phase2Science` with 6 weeks: anatomy of a medical study (p-hacking), evidence pyramid drag-and-drop game, Scientific Fallacies Engine Parts 1 and 2 (appeal to nature, base-rate neglect), Paper-Auditor Matrix (retracted COVID/vaccine papers), and correlation-vs-causation simulator. _Use case:_ Drives curriculum overview and exercise routing for Phase 2 (weeks 9–14). (`src/data/curriculum/phase2-science.ts`)

---

## curriculum/phase3-islamic.ts

- **Phase 3 Curriculum Definition (Islamic Literacy)** — Exports `phase3Islamic` with 6 weeks: Introduction to Usul al-Fiqh hierarchy mapping, Islamic Fallacies Engine Parts 1 and 2 (textual isolation / taqti' al-ayah, ahistoricism), Takhrij Simulator (hadith validation via primary source triangulation), Maqasid Alignment matrix (cryptocurrency fatwas), and the Bi-l-ma'thur Gating Protocol (Usul al-Tafsir hierarchies). _Use case:_ Drives curriculum overview and exercise routing for Phase 3 (weeks 15–20). (`src/data/curriculum/phase3-islamic.ts`)

---

## curriculum/phase4-defense.ts

- **Phase 4 Curriculum Definition (Live Defense & Inoculation)** — Exports `phase4Defense` with 4 weeks: Threat-Map Simulator (bot activity and astroturfing), DeepReal Forensics (6-Layer WebGL synthetic media analysis), Inoculation Passport (weakened-dose fallacy injection, Cambridge Bad News model), and the Sovereign Debate capstone (AI boss-fight against a sophisticated propagandist). _Use case:_ Drives curriculum overview and exercise routing for Phase 4 (weeks 21–24). (`src/data/curriculum/phase4-defense.ts`)

---

## defense-qa.ts

- **Defense Q&A Script (QA_ITEMS)** — Exports 10 Arabic question-and-answer pairs covering project status, AI stack, target audience, data storage, and technical choices for presenting the project. _Use case:_ Powers a `/defense-qa` route that gives pre-canned answers for academic defense presentations. (`src/data/defense-qa.ts`)
- **Theoretical Basis Registry (THEORIES)** — Lists 8 academic theories underpinning the platform (Inoculation Theory, COM-B, SIFT, Cognitive Load, SDT, Brief RCOPE, MIST-20, ELM), each with placement in the app and peer-reviewed references. _Use case:_ Displayed in academic defense slides to justify the scientific grounding of each feature. (`src/data/defense-qa.ts`)
- **Visual Demo Map (VISUAL_MAP)** — Specifies which screen to show at each time slot during a live presentation (locked/unlocked screen states and demo cues). _Use case:_ Acts as a presenter's autopilot script for showing the app to examiners or panels. (`src/data/defense-qa.ts`)
- **Unique Points Registry (UNIQUE_POINTS)** — Lists 8 differentiation claims (e.g., first MIST-20 application in Egyptian Arabic, Negative UX, 16-theme color system, COM-B labeling on all exercises). _Use case:_ Provides talking points for academic defense pitch sections. (`src/data/defense-qa.ts`)

---

## defense/defense-main-plan.ts

- **Executive Lock (EXECUTIVE_LOCK)** — A single object containing the project's defense-ready identity statement and demo strategy. _Use case:_ Shown at the top of the defense dashboard to orient the presenter. (`src/data/defense/defense-main-plan.ts`)
- **Powerful Pages Registry (POWERFUL_PAGES)** — An array of the 5 strongest demo pages (DeepReal, Bad News, Baseline, Supervisor, RTL), each with route, demo status, expected output, evidence chain (page file, components, API routes, data files, storage keys, live results), risk level, and specific answers to anticipated "doctor attacks." _Use case:_ Powers the `/defense-main-plan` page so presenters know exactly which pages to open, which inputs to use, and how to respond to technical challenges. (`src/data/defense/defense-main-plan.ts`)
- **Stress Test Registry (STRESS_TESTS)** — A list of live-tested scenarios (Arabic health misinformation, English health misinformation, Bad News offline, etc.) with actual results, pass/fail status, and ready-made defense lines. _Use case:_ Enables the presenter to anticipate and pre-empt "prove it live" challenges during academic defense. (`src/data/defense/defense-main-plan.ts`)
- **Demo Segments (DEMO_SEGMENTS)** — Timed segments for the full live demonstration run (opening, technical proof, capstone AI, closing), each with time allocation and talking points. _Use case:_ Structures the defense presentation flow. (`src/data/defense/defense-main-plan.ts`)
- **Recovery Lines (RECOVERY_LINES)** — Pre-written Arabic/English responses for when a live demo fails (API timeout, page error, empty results). _Use case:_ Gives the presenter graceful fallback scripts if any engine misbehaves during the defense. (`src/data/defense/defense-main-plan.ts`)
- **Brutal Honesty Registry (BRUTAL_HONESTY)** — Documented known weaknesses (Arabic ClaimBuster heuristic is English-optimized, chatbot has no local fallback, forensics depends on Docker). _Use case:_ Prepares the presenter to acknowledge limitations proactively, which increases examiner trust. (`src/data/defense/defense-main-plan.ts`)

---

## defense/pages-map.ts

- **Presenter Route Order (presenterRouteOrder)** — A typed tuple of the 8 routes to visit in order during the defense demo. _Use case:_ Drives a step-by-step demo navigation widget on the defense dashboard. (`src/data/defense/pages-map.ts`)
- **Backend Focus Stats (backendFocusStats)** — Counts of total API routes (41), demo-relevant safe routes (36), safe fallback routes, risky routes, keyless public routes, and backend-dependent routes. _Use case:_ Used in the supervisor/defense page to show examiners the backend depth of the system. (`src/data/defense/pages-map.ts`)
- **Do-Not-Show Warnings (doNotShowWarnings)** — An array of explicit prohibitions (do not show /chatbot live, do not claim TinEye, do not claim Redis, do not open auth files). _Use case:_ Prevents the presenter from accidentally exposing unstable or risky pages. (`src/data/defense/pages-map.ts`)
- **Page Map Entries (pageMapEntries)** — A large array of ~40 entries, each describing one app route with: title, file path, category, demo status (Must Show / Backup / Do Not Show), risk level, backend kind (local-only / needs-api-key / none), UI/UX focus, logic focus, backend focus, storage focus, evidence array, test steps, doctor attack answers, warnings, and tags. _Use case:_ Powers the `/defense-pages-map` route giving the presenter a comprehensive cheat-sheet for every page in the app. (`src/data/defense/pages-map.ts`)

---

## directory/crisis-contacts.json

- **Egypt Crisis Contacts Registry** — A JSON array of 10 confirmed crisis contact entries (Egypt Mental Health Hotline 16328, toll-free backup, Cairo landline, Ambulance 123, MoHP mental health platform, Dar al-Ifta 107, Al-Azhar Observatory, Befrienders Worldwide, National Food Safety Authority, University Counseling placeholder), each with bilingual name/description and status field. _Use case:_ Rendered as an emergency resource panel in the Mental Health and Religion Hub engines whenever a safety escalation path is triggered. (`src/data/directory/crisis-contacts.json`)

---

## directory/official-support.ts

- **Official Source URL Constants** — Exports named URL constants for MoHP mental health platform, WHO mental health fact sheets (depression, anxiety, suicide, mental disorders), and Dar al-Ifta contacts. _Use case:_ Imported throughout the app wherever a sourced link to an official body is needed, preventing URL drift. (`src/data/directory/official-support.ts`)
- **Egypt Crisis Phone Numbers (EGYPT_CRISIS_CONTACTS)** — Exports a const object mapping contact types (mentalHealthShortCode, mentalHealthTollFree, mentalHealthLandline, ambulance, darAlIfta) to their numbers. _Use case:_ Single source of truth for crisis phone numbers used across the Mental Health and Religion Hub engines. (`src/data/directory/official-support.ts`)
- **Official Mental Health Guidance Cards (OFFICIAL_MENTAL_HEALTH_GUIDANCE)** — An array of 6 `OfficialGuidanceCard` entries (WHO mental health, mental disorders, depression, anxiety, suicide; Egypt MoHP) with stats, descriptions, and source type classification. _Use case:_ Rendered as a carousel of evidence-backed guidance cards in the Mental Health engine home and help-seeking sections. (`src/data/directory/official-support.ts`)

---

## directory/support-registry.ts

- **Support Directories Registry (SUPPORT_DIRECTORIES)** — An array of 8 `SupportDirectoryEntry` objects, each with id, name, type (phone/web/reference), mvp scope (mental-health / religion-hub / all), jurisdiction (Egypt/regional/global), phone/url, hours, lastVerified date, escalationUse description, status, officialSource, and notes. Entries include GSMHAT hotlines, ambulance, MoHP platform, Dar al-Ifta, Al-Azhar Observatory, and a pending campus counseling entry. _Use case:_ The app's authoritative list of real, verified support contacts that can be surfaced in AI responses, exercise safety notes, and help-seeking pathways. (`src/data/directory/support-registry.ts`)
- **getSupportDirectoriesForMvp() Function** — Filters the SUPPORT_DIRECTORIES array by MVP scope so the Mental Health engine and Religion Hub each surface only contextually appropriate contacts. _Use case:_ Called by engine pages to inject the correct subset of contacts into the UI without hardcoding. (`src/data/directory/support-registry.ts`)

---

## educational-nonprofits.ts

- **Educational Non-Profits Dataset** — Exports an array of 15 `EducationalNonProfit` entries covering global digital-education leaders (Wikimedia, Khan Academy, Duolingo, Coursera, edX, MIT OCW, Code.org, Internet Archive, Cambridge SDM/Bad News, MIT/HarvardX, Project Gutenberg, OpenStax, UNESCO GEC, HundrED), each with reach statistics, country/language coverage, and peer-reviewed evidence citations. _Use case:_ Used in comparative context pages and the academic defense to position EAL within a landscape of evidence-backed educational platforms. (`src/data/educational-nonprofits.ts`)

---

## engine-combat-lenses.ts

- **Engine Combat Lenses Dataset (EngineCombatLens array)** — Exports a 3-engine dataset (Mental Health, DeepReal Scientific, Religion Hub), each containing 7 `LayerCombat` objects. Each layer has bilingual weapon name, methodology tag, a deep cognitive protocol paragraph (English + Arabic), a rewrite rule (the cognitive reframe the user internalizes), and Egyptian case IDs linking to `src/components/six-layers/data.ts`. _Use case:_ Powers the "Combat Lens" overlay mode of the Six Layers page, giving each of the 3 engines its own applied 7-layer defense protocol per deception taxonomy layer. (`src/data/engine-combat-lenses.ts`)
- **Mental Health Lens — Layer-by-Layer Protocols** — 7 protocols: Amygdala Firewall (cortisol spike recognition + DSM-5-TR), Cultural Firewall (surgical extraction of 'Urf from Deen), Ego-Decoupling Protocol (Tazkiyat al-Nafs + epistemic humility), Cortisol Timing Detector (WHO mhGAP + neurochemical timing awareness), Amanah Protocol (Islamic bioethics + body as sacred trust), Cognitive Stability Equation (E = f(T)×(B+C)/Awareness), Prefrontal Cortex Sovereignty Protocol (dopamine system self-audit). _Use case:_ Displayed when a user activates the Mental Health engine overlay on the Six Layers interactive diagram. (`src/data/engine-combat-lenses.ts`)
- **DeepReal Scientific Lens — Layer-by-Layer Protocols** — 7 protocols: COPE Source Annihilation (DOI verification, scientific impersonation detection), Follow-the-Money Forensics (COPE conflict-of-interest scan), PRISMA Full-Context Recovery (systematic review demand, anti-cherry-picking), CONSORT Temporal Forensics (pre-registration check, ITT analysis), Institutional Ethics Audit (IRB check, informed consent verification), Full Pipeline Decomposition (COPE+PRISMA+CONSORT combined against compound attacks), OSINT Algorithmic Forensics (network mapping, algorithm exposure, incentive structure reverse-engineering). _Use case:_ Displayed when a user activates the DeepReal engine overlay on the Six Layers diagram. (`src/data/engine-combat-lenses.ts`)
- **Religion Hub Lens — Layer-by-Layer Protocols** — (Implied third engine) 7 protocols covering theological manipulation defenses. _Use case:_ Displayed when a user activates the Religion Hub overlay on the Six Layers diagram. (`src/data/engine-combat-lenses.ts`)

---

## exercises/day1_calibration.json

- **Day 1 MIST-20 Cognitive Immunity Calibration** — A calibration exercise (`type: calibration`) with 10 real Egyptian social media claims (health, politics, history, religion, science), each with bilingual claim text, truth value (true/false/misleading), category, difficulty, explanation citing real sources, source URLs, and the cognitive bias at play. Computes baseline Cognitive Immunity Score (CIS₀) using the MIST-20 instrument. _Use case:_ Administered on Day 1 of the program to measure where each user starts before any training. (`src/data/exercises/day1_calibration.json`)

---

## exercises/day2_trust_battery_sprint1.json

- **Day 2 Trust Battery Sprint** — A source-ranking exercise with 12 claims from varied Egyptian sources (Al-Ahram, WhatsApp forwards, BBC Arabic, Facebook posts, Reuters), each with reliability score (0-100), red flags array, and correct trustworthiness assessment (reliable/partially_reliable/unreliable). _Use case:_ Calibrates users' source-trust instincts by exposing them to the full spectrum of Egyptian information sources. (`src/data/exercises/day2_trust_battery_sprint1.json`)

---

## exercises/day3_thumbnail_traps.json

- **Day 3 Thumbnail Trap Detection** — A detection exercise with Egyptian-specific YouTube and Facebook thumbnail scenarios, each identifying a manipulation technique (emotional exploitation + false urgency, false dichotomy + censorship fear, mystery gap + appeal to ignorance, data visualization manipulation + conspiracy framing), listing red flags, and providing the correct analysis. _Use case:_ Trains users to identify clickbait and visual manipulation tactics specific to Arabic YouTube and Egyptian social media. (`src/data/exercises/day3_thumbnail_traps.json`)

---

## exercises/day4_emotion_vs_evidence.json

- **Day 4 Emotion vs Evidence Drill** — An exercise distinguishing emotionally charged claims from evidence-based reasoning, with scenarios including 5G health fear posts, WHO meta-analysis excerpts, anonymous WhatsApp doctor claims, and RCT abstracts. Each item identifies emotional triggers, evidence quality (none/anecdotal/high), and the correct assessment. _Use case:_ Trains the System 2 thinking habit of separating emotional response from evidential reasoning. (`src/data/exercises/day4_emotion_vs_evidence.json`)

---

## exercises/day5_calm_breath.json

- **Day 5 Time-Friction / Calm Breath Training** — A breathing exercise (`type: breathing`) with high-emotion trigger scenarios (football disqualification rumor, social media registration decree, checkpoint video, vaccine WhatsApp voice note). Each item has emotionalIntensity rating, a calm prompt with specific breathing technique (4-7-8, 5-4-3 grounding, box breathing), and reflection questions. Sets a 10-second friction gate before reacting. _Use case:_ Builds the physiological pause habit (System 2 activation) before sharing or reacting to emotional content. (`src/data/exercises/day5_calm_breath.json`)

---

## exercises/day6_help_seeking_intro.json

- **Day 6 GHSQ Help-Seeking Barriers Introduction** — Three scenarios of Egyptians facing mental health barriers (Ahmad, 25, suicidal thoughts; Fatima, 30, anxiety in Upper Egypt; Omar, 19, depression + masculinity stigma). Each has barriers in Arabic/English, appropriate resource list, GHSQ interpretation, and an Islamic jurisprudence perspective reconciling faith with professional care. _Use case:_ Introduces the GHSQ instrument and primes users to recognize help-seeking barriers before the formal baseline measurement. (`src/data/exercises/day6_help_seeking_intro.json`)

---

## exercises/day7_deepreal_teaser.json

- **Day 7 DeepReal OSINT Teaser** — OSINT introduction exercise covering reverse image search (Google Images, TinEye, Yandex), metadata checking, and source tracing. Egyptian-context scenario: a viral image falsely claiming Egyptian military vehicles entered Gaza in 2024 (actual source: 2013 Sinai exercise). _Use case:_ Provides first exposure to OSINT investigation before the dedicated DeepReal engine module, establishing baseline OSINT awareness. (`src/data/exercises/day7_deepreal_teaser.json`)

---

## exercises/day8_bias_fingerprint.json

- **Day 8 Bias Fingerprint Assessment** — 8 Egyptian-context scenario questions assessing susceptibility to 6 biases: confirmation bias (COVID vaccine article), availability heuristic (Zamalek crime story), anchoring bias (WhatsApp 90% TikTok poll), Dunning-Kruger, in-group bias, survivorship bias. Computes a personal `Bias_Fingerprint_v1` profile. References Kahneman (2011). _Use case:_ Produces each user's unique cognitive bias vulnerability map at Phase 0 midpoint for personalized intervention targeting. (`src/data/exercises/day8_bias_fingerprint.json`)

---

## exercises/day9_expert_voice.json

- **Day 9 Expert Voice Calibration** — 8 scenarios with real and fabricated Egyptian and international "experts" making health/science/policy claims. Each has credential red flags (no NRC directory listing, contradicts official HCWW data, no Google Scholar profile), correct verdict (trust/distrust), explanation, and verification steps. References Nichols (2017) "The Death of Expertise." _Use case:_ Trains users to detect pseudoexpertise by evaluating credential verifiability rather than authority appearance. (`src/data/exercises/day9_expert_voice.json`)

---

## exercises/day9_source_evaluation.json

- **Day 9 Source Evaluation (Alt File)** — A compact source evaluation exercise. _Use case:_ Alternative or supplemental source-evaluation exercise for Day 9. (`src/data/exercises/day9_source_evaluation.json`)

---

## exercises/day10_lateral_reading.json through day28_passport_level1.json (days 10-28 individual JSONs)

These 19 files follow a consistent structure of ~29–163 lines each.

- **Day 10 Lateral Reading Exercise** — Teaches the lateral reading technique (opening multiple tabs to check a source's reputation before reading its content). _Use case:_ Core SIFT-framework skill building for cross-source verification. (`src/data/exercises/day10_lateral_reading.json`)
- **Day 11 Base Rate Primer Exercise** — Introduces base-rate neglect with Egyptian health and policy scenarios. _Use case:_ Builds statistical literacy for evaluating numerator-only claims. (`src/data/exercises/day11_base_rate.json`)
- **Day 12 Anchoring Drill (Short)** — Brief anchoring bias introduction exercise. _Use case:_ First exposure to anchoring before the full Day 16 drill. (`src/data/exercises/day12_anchoring.json`)
- **Day 13 Dunning-Kruger Exercise** — Scenarios where users identify overconfidence in low-expertise Egyptian social media commentators. _Use case:_ Trains metacognitive awareness of confidence-competence gaps. (`src/data/exercises/day13_dunning_kruger.json`)
- **Day 14 Week 2 Checkpoint Quiz** — Summary checkpoint for the first two weeks of training. _Use case:_ Weekly assessment to measure early skill retention before progressing. (`src/data/exercises/day14_week2_checkpoint.json`)
- **Day 15 Reaction Time Baseline (Full)** — 10 Egyptian viral claims flash for 2 seconds each; users click TRUE/FALSE before the timer expires. Scoring system: correct-fast (+10), correct-slow (+7), wrong-fast (-5), wrong-slow (-2). Computes EAL Impulsivity Index (EI = wrong_fast_count/total_attempts). Retested on Day 28. _Use case:_ Establishes emotional-impulsivity baseline (EI₀) for pre/post measurement of intervention efficacy. (`src/data/exercises/day15_reaction_test_baseline.json`)
- **Day 15 Reaction Time (Alt Short File)** — Compact metadata stub for Day 15. _Use case:_ Curriculum router reference for Day 15 exercise type. (`src/data/exercises/day15_reaction_time.json`)
- **Day 16 Anchoring Effect Drill (Full)** — 8 Egyptian anchoring scenarios: private clinic price anchor (50,000 vs 18,000 EGP), fabricated 90% TikTok poll, New Cairo real estate anchor (5.5M vs 3.8M EGP), and more. Each has anchor value, anchor type, common biased response, and correct debiased answer with debiasing technique. Science background: Tversky & Kahneman (1974). _Use case:_ Builds practical debiasing skills for real Egyptian commercial, political, and health contexts. (`src/data/exercises/day16_anchoring_effect.json`)
- **Day 16 Confirmation Bias Exercise (Alt)** — Short confirmation bias drill. _Use case:_ Compact alternative/supplemental drill for Day 16. (`src/data/exercises/day16_confirmation_bias.json`)
- **Day 17 In-Group Bias Exercise** — In-group favoritism scenarios in Egyptian social contexts. _Use case:_ Builds awareness of how tribal identity amplifies misinformation acceptance. (`src/data/exercises/day17_ingroup_bias.json`)
- **Day 18 Availability Deep Dive** — Advanced availability heuristic scenarios with Egyptian media examples. _Use case:_ Deepens availability heuristic awareness beyond Day 11. (`src/data/exercises/day18_availability_deep.json`)
- **Day 19 Correlation-Causation Exercise** — Exercises distinguishing correlation from causation using Egyptian epidemiological and social data examples. _Use case:_ Scientific literacy building for evaluating health and policy claims. (`src/data/exercises/day19_correlation_causation.json`)
- **Day 20 WhatsApp Drills** — Egyptian WhatsApp forward scenarios for rapid misinformation detection practice. _Use case:_ Platform-specific training for the dominant Egyptian social media vector. (`src/data/exercises/day20_whatsapp_drills.json`)
- **Day 21 Midpoint Assessment** — Comprehensive midpoint check at Day 21 measuring progress across Phase 0 skills. _Use case:_ Provides mid-intervention measurement point for research tracking. (`src/data/exercises/day21_midpoint.json`)
- **Day 22 Inoculation (Short)** — Brief inoculation theory introduction. _Use case:_ Compact inoculation technique primer. (`src/data/exercises/day22_inoculation.json`)
- **Day 22 Inoculation Intro (Full — 257 lines)** — Full prebunking exercise introducing psychological inoculation theory (McGuire 1961; Roozenbeek & van der Linden 2019, d=0.52). Covers 5 manipulation techniques (emotional appeal/fear hijacking, false authority) with inoculation examples using Egyptian media contexts, test examples, and sourced correct detection verdicts. _Use case:_ Core Day 22 prebunking content that teaches manipulation technique recognition before live exposure. (`src/data/exercises/day22_inoculation_intro.json`)
- **Day 23 Prebunking Exercise** — Additional prebunking scenarios expanding on Day 22 techniques. _Use case:_ Second prebunking session consolidating inoculation technique recognition. (`src/data/exercises/day23_prebunking.json`)
- **Day 24 DeepReal Introduction** — Brief intro to the DeepReal forensics engine. _Use case:_ Gateway exercise connecting Phase 0 skills to the DeepReal engine. (`src/data/exercises/day24_deepreal_intro.json`)
- **Day 25 GHSQ Retake** — Re-administration of the General Help-Seeking Questionnaire after Phase 0 training. _Use case:_ Measures whether help-seeking attitudes improved after psychological calibration. (`src/data/exercises/day25_ghsq_retake.json`)
- **Day 26 SUS Checkpoint** — Usability/system checkpoint at Day 26. _Use case:_ Platform usability assessment mid-program. (`src/data/exercises/day26_sus_checkpoint.json`)
- **Day 27 Forward Defense Exercise** — Proactive forward defense scripting — users write scripts to inoculate others in their social circle. _Use case:_ Social transmission of immunity; trains users to become peer educators. (`src/data/exercises/day27_forward_defense.json`)
- **Day 28 Inoculation Passport Level 1** — Graduation exercise for Phase 0; awards Level 1 Inoculation Passport on completion. _Use case:_ Provides a measurable achievement milestone and motivational endpoint for the first 28-day phase. (`src/data/exercises/day28_passport_level1.json`)

---

## exercises/phase-0-calibration/day1_to_day28.json

- **Phase 0 Exercise Manifest** — A JSON array mapping each day (1–28) to its exercise file, component(s), logic engine, and psychometric hook (e.g., Day 1 → MIST-20 / CIVO-Router computes baseline EIS=0; Day 6 → GHSQ baseline; Day 8 → CIS₀ computation; Day 15 → reaction test). _Use case:_ Consumed by the curriculum router to wire each calendar day to the correct components and instruments without hardcoding. (`src/data/exercises/phase-0-calibration/day1_to_day28.json`)

---

## exercises/phase-1-cognition/day29_to_day56.json

- **Phase 1 Exercise Weekly Pattern Manifest** — A JSON array mapping weeks 5–8 (days 29–56) to their daily exercise pattern: 5 fallacies/day, 2 logic constructs/day, 1.5 heuristics/day, 1.5 EI competencies/day, with component references (`fallacy-engine/page.tsx`, `debate-sim/page.tsx`, `reaction-test/page.tsx`, etc.). _Use case:_ Drives the Phase 1 curriculum schedule with a repeating weekly pattern across 4 weeks of logic/fallacy training. (`src/data/exercises/phase-1-cognition/day29_to_day56.json`)

---

## exercises/phase-2-science/day57_to_day98.json

- **Phase 2 Exercise Weekly Pattern Manifest** — Maps weeks 9–14 (days 57–98) to 6 scientific fallacies/day with rotating case study chunks (chunk2–chunk7) and Friday threat-map/rumor-heatmap inspections. Components include `paper-auditor`, `forensic-image`, `forensic-c2pa`, `evidence`, `osint-investigator`, `threat-map`. _Use case:_ Drives Phase 2 (Scientific Literacy) curriculum routing. (`src/data/exercises/phase-2-science/day57_to_day98.json`)

---

## exercises/phase-3-islamic/day99_to_day140.json

- **Phase 3 Exercise Weekly Pattern Manifest** — Maps weeks 15–20 (days 99–140) to Islamic fallacy exercises (4/day) with components including `MaqasidCheck.tsx`, `WhatsAppForwardCheck.tsx`, `hadith-check`, `TafsirComponents.tsx`, sectarian-detector, fatwa-context, halal-finance, mawarith. Deeper Islamic literacy tracks across theological, jurisprudence, financial, and inheritance topics. _Use case:_ Drives Phase 3 (Islamic Literacy) curriculum routing. (`src/data/exercises/phase-3-islamic/day99_to_day140.json`)

---

## exercises/phase-4-integration/day141_to_day168.json

- **Phase 4 Exercise Weekly Pattern Manifest** — Maps weeks 21–24 (days 141–168) with capstone integration exercises: 7-Layer GOD-System Live Stress Test (week 21), Mental Health + DeepReal Convergence (week 22), Cross-Disciplinary Mastery (week 23), and Sovereign Graduation + Inoculation Passport issuance (week 24). Psychometric hooks include GHSQ Retake, MIST-20 Final Retake, and Passport Issuance (Level 5 Sovereign). _Use case:_ Drives the Phase 4 capstone curriculum routing for the final 4 weeks. (`src/data/exercises/phase-4-integration/day141_to_day168.json`)

---

## exercises/deepreal/ — DeepReal Exercise Files

### deepreal/day-01.json through day-14.json (14 files)

All 14 files follow a consistent schema: `id`, `title`/`titleAr`, `mvp`, `day`, `duration`, `difficulty`, `category`, `learningObjective`/`learningObjectiveAr`, `bloomLevel`, `content` (scenario + task with items), feedback.

- **DeepReal Day 1 — SIFT Method Introduction** — Teaches the 4-step SIFT method (Stop, Investigate, Find, Trace) with a lemon-water viral claim scenario. Task type: scenario_response. Bloom level: understand. _Use case:_ First day of the DeepReal 14-day engine; establishes the foundational verification framework. (`src/data/exercises/deepreal/day-01.json`)
- **DeepReal Day 2 — Lateral Reading** — Teaches lateral reading for source credibility evaluation. _Use case:_ Day 2 skill building within the DeepReal module. (`src/data/exercises/deepreal/day-02.json`)
- **DeepReal Day 3 — Source Credibility Deep Dive** — Advanced source credibility analysis. _Use case:_ Day 3 of DeepReal module. (`src/data/exercises/deepreal/day-03.json`)
- **DeepReal Day 4 — Evidence Pyramid Application** — Applies the evidence hierarchy (anecdote → expert opinion → cohort → RCT → systematic review) to classify Egyptian health claims. Bloom level: analyze. _Use case:_ Day 4 of DeepReal module — bridges source credibility to evidence quality assessment. (`src/data/exercises/deepreal/day-04.json`)
- **DeepReal Day 5 — Emotional Manipulation Detection** — Identifies emotional manipulation techniques in viral Egyptian content. _Use case:_ Day 5 of DeepReal module. (`src/data/exercises/deepreal/day-05.json`)
- **DeepReal Day 6 — Social Proof Resistance** — Exercises to resist manufactured social consensus signals. _Use case:_ Day 6 of DeepReal module. (`src/data/exercises/deepreal/day-06.json`)
- **DeepReal Day 7 — Deepfake Visual Detection** — Visual artifact detection for face-swap deepfakes (boundary blur, lip-sync inconsistency, unnatural blink). _Use case:_ Day 7 of DeepReal module. (`src/data/exercises/deepreal/day-07.json`)
- **DeepReal Day 8 — Coordinated Inauthentic Behavior** — Identifies CIB patterns (simultaneous sharing from multiple accounts, bot-net topology). _Use case:_ Day 8 of DeepReal module. (`src/data/exercises/deepreal/day-08.json`)
- **DeepReal Day 9 — Claim Tracing** — Traces claims back to original sources using SIFT's Trace step. _Use case:_ Day 9 of DeepReal module. (`src/data/exercises/deepreal/day-09.json`)
- **DeepReal Day 10 — Manufactured Authority** — Detects manufactured credibility signals (.org domains, "leaked documents," professional appearance vs genuine authority). _Use case:_ Day 10 of DeepReal module. (`src/data/exercises/deepreal/day-10.json`)
- **DeepReal Day 11 — Bias in Information Framing** — Identifies bias through information framing and selective emphasis. _Use case:_ Day 11 of DeepReal module. (`src/data/exercises/deepreal/day-11.json`)
- **DeepReal Day 12 — Confirmation Bias in Verification** — Addresses how confirmation bias interferes with neutral fact-checking. _Use case:_ Day 12 of DeepReal module. (`src/data/exercises/deepreal/day-12.json`)
- **DeepReal Day 13 — Echo Chamber Escape** — Teaches cross-checking across ideologically diverse sources to escape echo chambers. _Use case:_ Day 13 of DeepReal module. (`src/data/exercises/deepreal/day-13.json`)
- **DeepReal Day 14 — Final Integration Assessment** — Capstone assessment combining all DeepReal skills (SIFT, source credibility, deepfake forensics, emotional manipulation, social proof, claim tracing) against a multi-layered Egyptian health minister deepfake scenario. Bloom level: create. References van der Linden (2022) "Foolproof." _Use case:_ End-of-DeepReal-module mastery test; triggers Inoculation Passport level advancement. (`src/data/exercises/deepreal/day-14.json`)

### deepreal/osint_basics_day1.json

- **OSINT Basics — 5-Technique Investigation** — A 5-exercise OSINT investigation module covering: reverse image search (Google/TinEye/Yandex), EXIF metadata extraction, geolocation verification (GPS cross-referencing with Google Maps), archive research (Wayback Machine), and WHOIS domain lookup. Each exercise has a scenario, tool list with free/paid status, step-by-step workflow, and correct finding. COM-B target: Capability/Psychological. Source: Bellingcat OSINT Manual. _Use case:_ Deep OSINT skill-building within the DeepReal engine for users tackling advanced verification tasks. (`src/data/exercises/deepreal/osint_basics_day1.json`)

### deepreal/reverse_image_day2.json

- **Reverse Image Search — Egyptian Context** — 5 reverse image search scenarios specific to Egyptian misinformation patterns: old archive images recycled as current events (2015 Delta flooding reused in 2025), stock photos labeled as Egyptian scenes, images from other countries, cropped images, and AI-generated content. Each has tools (TinEye, Yandex, Google), steps, correct findings with dates/sources, and red flag indicators. _Use case:_ Advanced reverse image search practice tuned to patterns unique to Egyptian social media misinformation. (`src/data/exercises/deepreal/reverse_image_day2.json`)

### deepreal/metadata_analysis_day3.json

- **Metadata Analysis & C2PA Content Credentials** — 5 EXIF metadata verification exercises: GPS coordinate contradiction (photo claimed to be from Sinai but GPS shows Eastern Desert near Hurghada), timestamp forgery detection, Photoshop metadata evidence, metadata stripping indicators, and C2PA (Coalition for Content Provenance and Authenticity) content credentials interpretation. Tools: ExifTool, EXIF.tools, Sentinel Hub EO Browser, Google Maps. _Use case:_ Technical metadata forensics training for users who need to go beyond visual inspection to verify digital provenance. (`src/data/exercises/deepreal/metadata_analysis_day3.json`)

### deepreal/audio_forensics_day4.json

- **Audio Forensics — Detecting Manipulated Audio** — 5 exercises covering: spectrogram analysis for voice cloning detection, audio splice detection (unnatural room tone transitions), AI voice synthesis red flags (ElevenLabs/Respeecher artifacts), background noise inconsistency analysis, and lip-sync verification for video-audio deepfakes. Tools: Adobe Audition Spectral Frequency display, Audacity, AI Voice Detector. _Use case:_ Audio forensics skill development for detecting audio deepfakes and manipulated voice recordings in Egyptian political/religious contexts. (`src/data/exercises/deepreal/audio_forensics_day4.json`)

### deepreal/video_forensics_day5.json

- **Video Forensics — Deepfake & Manipulation Detection** — 5 exercises: face swap artifact identification (boundary blur, hairline inconsistency, ear artifacts), lip-sync accuracy testing (phoneme-to-mouth misalignment), deepfake detection tools (Sensity AI, Microsoft Video Authenticator, Intel FakeCatcher, InVID WeVerify), Egyptian media deepfake scenarios (compromised businessman video), and contextual analysis (when the narrative itself is the red flag). Sources: MIT Media Lab, FaceForensics++ Benchmark. _Use case:_ Advanced video forensics for the final DeepReal capability tier, enabling users to analyze high-stakes synthetic media. (`src/data/exercises/deepreal/video_forensics_day5.json`)

### deepreal/exercises-4-14.ts

- **DeepReal Exercises 4–14 TypeScript Module** — Exports `DEEPREAL_EXERCISES` array with 11 structured exercise objects (days 4–14), each with id, bilingual title, mvp, day, duration, difficulty, category, learning objective, Bloom level, full scenario content, task (ranking/scenario_response/quiz type), feedback, whatNotToDo list, keyhunterId, evidence citation, safetyNote, trackConfidence flag, and requiresEightGate flag. Categories: source_credibility (days 4–8), detection_tasks (days 9–13), integration (day 14). _Use case:_ Primary data source for the DeepReal exercise engine, loaded by `exercise-engine.tsx` to render days 4–14 interactively. (`src/data/exercises/deepreal/exercises-4-14.ts`)

---

## exercises/mental-health/ — Mental Health Exercise Files

### mental-health/day-01.json through day-14.json (14 files)

All 14 follow consistent schema: `id`, `title`/`titleAr`, `mvp: "mental-health"`, `day`, `duration`, `difficulty`, `category`, `learningObjective`, `bloomLevel`, `content` (scenario + task), feedback.

- **MH Day 1 — Affect Labeling** — Teaches emotion vocabulary precision ("I feel disappointed because..." vs "I feel bad") using Lieberman et al. (2007) neuroscience. Task: matching vague emotional expressions to precise affect labels. _Use case:_ Day 1 of the Mental Health engine; builds emotional granularity as a foundational regulation skill. (`src/data/exercises/mental-health/day-01.json`)
- **MH Day 2 — Anxiety Psychoeducation** — Science of anxiety (amygdala-prefrontal cortex circuit). _Use case:_ Day 2 psychoeducation on the neurological basis of anxiety. (`src/data/exercises/mental-health/day-02.json`)
- **MH Day 3 — Cognitive Restructuring Intro** — Introduction to identifying and reframing automatic negative thoughts. _Use case:_ Day 3 cognitive behavioral skills. (`src/data/exercises/mental-health/day-03.json`)
- **MH Day 4 — Behavioral Activation** — Behavioral activation scheduling for depression. _Use case:_ Day 4 evidence-based depression management skills. (`src/data/exercises/mental-health/day-04.json`)
- **MH Day 5 — Mindfulness Introduction** — Guided mindfulness practice with cultural adaptation for Egyptian Muslim users. _Use case:_ Day 5 self-regulation technique. (`src/data/exercises/mental-health/day-05.json`)
- **MH Day 6 — Help-Seeking Pathways** — Maps help-seeking pathways available to Egyptian university students (campus counseling, telehealth, hotlines). _Use case:_ Day 6 resource navigation. (`src/data/exercises/mental-health/day-06.json`)
- **MH Day 7 — Stigma Recognition** — Identifies stigmatizing language and behavior in Egyptian social contexts. _Use case:_ Day 7 anti-stigma literacy. (`src/data/exercises/mental-health/day-07.json`)
- **MH Day 8 — Crisis Recognition** — Teaches warning signs of mental health crises and when to escalate to professional help. _Use case:_ Day 8 safety awareness training. (`src/data/exercises/mental-health/day-08.json`)
- **MH Day 9 — Islamic Perspectives on Mental Health** — Integrates Islamic scholarly perspectives (Al-Ghazali, Ibn Sina) on emotional wellbeing with modern psychology. _Use case:_ Day 9 faith-integrated mental health literacy. (`src/data/exercises/mental-health/day-09.json`)
- **MH Day 10 — Coping Skills Toolkit** — Practical coping skills catalog (problem-focused vs emotion-focused) with Egyptian-context examples. _Use case:_ Day 10 skills synthesis. (`src/data/exercises/mental-health/day-10.json`)
- **MH Day 11 — Safety Planning** — Collaborative safety planning framework referencing Befrienders Worldwide. _Use case:_ Day 11 crisis safety competency. (`src/data/exercises/mental-health/day-11.json`)
- **MH Day 12 — Social Support Mapping** — Maps and strengthens social support networks. _Use case:_ Day 12 resilience building. (`src/data/exercises/mental-health/day-12.json`)
- **MH Day 13 — Relapse Prevention** — Identifies early warning signs and builds a personal relapse prevention plan. _Use case:_ Day 13 long-term maintenance skills. (`src/data/exercises/mental-health/day-13.json`)
- **MH Day 14 — Integration & Graduation** — Final integration of all mental health skills; computes end-of-module scores. _Use case:_ Day 14 capstone for the Mental Health engine, triggers Passport level advancement. (`src/data/exercises/mental-health/day-14.json`)

### mental-health/depression_myths_day1.json

- **Depression Myths Debunking (10 Egyptian Myths)** — 10 myth-bust items addressing the most common Egyptian depression misconceptions: "Depression is laziness," "A believer cannot be depressed," "Psychiatric medication causes addiction," "Talking about suicide encourages it," and 6 more. Each has bilingual myth text, DSM-5-TR/WHO citations, cognitive distortion identified, help-seeking barrier flag, and references. Safety note with Egyptian hotlines (08008880700, Behman Hospital). COM-B target: Capability/Psychological. _Use case:_ Standalone myth-detection module for the Mental Health engine that directly combats the top stigma-based barriers to care-seeking in Egypt. (`src/data/exercises/mental-health/depression_myths_day1.json`)

### mental-health/anxiety_myths_day2.json

- **Anxiety Myths Debunking** — Equivalent myth-busting module for anxiety myths specific to Egyptian culture and religious framing. _Use case:_ Day 2 complement to depression myths for the Mental Health engine. (`src/data/exercises/mental-health/anxiety_myths_day2.json`)

### mental-health/stigma_scenarios_day3.json

- **Stigma Navigation Scenarios (6 Egyptian Scenarios)** — 6 real-life scenarios where Egyptians want mental health support but face barriers. Includes a full resource appendix for Egypt: National Mental Health Hotline (08008880700), Behman Hospital for Mental Health (founded 1912), ENIDH (Abbassia, Cairo), and Nebny Foundation NGO. Each scenario has barriers in Arabic/English and appropriate response. COM-B target: Motivation/Social. _Use case:_ Builds practical navigation skills for stigma-rich Egyptian family and social environments. (`src/data/exercises/mental-health/stigma_scenarios_day3.json`)

### mental-health/grief_vs_depression_day4.json

- **Grief vs Depression Differential** — Clinical and Islamic-informed exercises distinguishing complicated grief from clinical depression (DSM-5-TR criteria). _Use case:_ Day 4 psychoeducation for the Mental Health engine helping users distinguish normal grief (legitimate in Islamic tradition) from pathological depression requiring professional care. (`src/data/exercises/mental-health/grief_vs_depression_day4.json`)

---

## exercises/religion-hub/day-01.json and day-02.json

- **Religion Hub Day 1 — Positive Religious Coping (Brief RCOPE)** — Teaches Pargament's (1997, 2011) 7 positive religious coping subscales vs spiritual bypassing. Task: 4 scenario_response items classifying coping as healthy positive, spiritual bypassing, or negative. Distinguishes "prayer AND professional help" (healthy) from "only prayer, no medicine" (bypassing). _Use case:_ Day 1 of the Religion Hub engine; establishes the foundational healthy-vs-harmful religious coping framework before introducing manipulation detection. (`src/data/exercises/religion-hub/day-01.json`)
- **Religion Hub Day 2 — Negative Religious Coping Identification** — Continuation of RCOPE framework focusing on harmful patterns. _Use case:_ Day 2 of Religion Hub engine. (`src/data/exercises/religion-hub/day-02.json`)

---

## Summary Table by Category

| Category | Files | Key Features |
|---|---|---|
| Curriculum Day Stubs | 35 | Per-day exercise metadata payloads (days 68-99, 7-9) |
| Curriculum Phase Definitions | 5 | Phase 0-4 week-by-week objectives, mechanics, assessments |
| Defense Preparation | 3 | Demo strategy, page map, stress tests, recovery lines, honest risks |
| Crisis Directory | 3 | Verified Egypt crisis contacts, official support URLs, support registry with MVP filtering |
| Contextual Reference Data | 2 | Educational nonprofits benchmark, engine combat lenses (7-layer defense protocols per engine) |
| Phase Exercise Manifests | 5 | Week-pattern routing maps for Phases 0-4 (days 1-168) |
| DeepReal Exercises | 21 | SIFT, OSINT, reverse image, metadata, audio/video forensics, 14-day progressive module |
| Mental Health Exercises | 19 | Affect labeling, myth-busting, stigma scenarios, GHSQ, Brief RCOPE, daily modules |
| Religion Hub Exercises | 2 | RCOPE positive/negative coping framework |
| Core Calibration Exercises | 19 | MIST-20 calibration, trust battery, thumbnail traps, emotion-vs-evidence, breathing, bias fingerprint, expert voice, anchoring, inoculation, passport |
