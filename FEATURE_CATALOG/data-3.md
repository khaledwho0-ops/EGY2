# Data & Content Assets — slice data-3

Slice covers sorted list items 251–368 (118 files), which is the entire remainder of `src/data/**/*.{ts,json}`.

---

## Religion Hub Exercises (days 3–14)

`src/data/exercises/religion-hub/day-03.json` through `day-14.json` (12 files)

- **Day-03 Community Support Matcher** — A Bloom-level "understand" matching exercise distinguishing healthy religious community support from controlling dynamics (isolation, guilt, shame). _Use case:_ Religion Hub day-3 lesson; teaches users to spot unhealthy group dynamics vs genuine communal care.  (`src/data/exercises/religion-hub/day-03.json`)
- **Day-04 Forgiveness Psychology Exercise** — Bilingual scenario task teaching the distinction between healthy forgiveness (releasing resentment for one's own wellbeing) and coerced forgiveness of abusers. _Use case:_ Day-4 religion module; prevents misuse of Islamic forgiveness teachings to minimise harm.  (`src/data/exercises/religion-hub/day-04.json`)
- **Day-05 Prayer and Wellbeing Exercise** — Scenario-response exercise on using ritual prayer for psychological regulation (mindfulness, breathing, grounding) vs. using it to avoid medical treatment. _Use case:_ Day-5 religion module; reinforces complementary not replacement role of prayer.  (`src/data/exercises/religion-hub/day-05.json`)
- **Day-06 Doubt and Faith Exercise** — Matches statements about questioning with categories of "intellectual growth" vs "spiritual emergency", anchored in Fowler's faith development theory. _Use case:_ Day-6 religion module; normalises healthy religious doubt.  (`src/data/exercises/religion-hub/day-06.json`)
- **Day-07 Gratitude & Sabr Evidence-Based Practice** — Scenario-response exercise combining Islamic sabr/shukr concepts with empirical gratitude research (Emmons & McCullough, 2003); includes a guided specificity gratitude drill. _Use case:_ Day-7; bridges Islamic wisdom with positive psychology.  (`src/data/exercises/religion-hub/day-07.json`)
- **Day-08 Spiritual Bypassing Detector** — Classifies religious statements as healthy reappraisal or spiritual bypassing using Welwood's framework, with Arabic bilingual items. _Use case:_ Day-8; flags when religion is used to deny real psychological difficulty.  (`src/data/exercises/religion-hub/day-08.json`)
- **Day-09 Guilt vs Healthy Remorse** — Differentiates pathological religious guilt (self-punishment, shame spirals) from healthy remorse (leads to repair, does not define identity). _Use case:_ Day-9; reduces guilt-amplification harm in religious contexts.  (`src/data/exercises/religion-hub/day-09.json`)
- **Day-10 Islamic Scholarly Credibility Check** — Exercises on verifying a religious figure's credentials (Al-Azhar certification, peer recognition, published scholarship) vs. appearance-based authority. _Use case:_ Day-10; trains users to distinguish qualified scholars from unqualified social-media preachers.  (`src/data/exercises/religion-hub/day-10.json`)
- **Day-11 Radicalization Awareness (Moghaddam Model)** — Advanced evaluation exercise using Moghaddam's (2005) Staircase Model to identify five-step radicalization warning signs vs. normal strong faith. References Al-Azhar Observatory. _Use case:_ Day-11; equips users to recognise themselves or others at risk.  (`src/data/exercises/religion-hub/day-11.json`)
- **Day-12 Moderate Interpretation Drill** — Scenario analysis distinguishing moderate Islamic framing from extremist framing of the same events; anchored in Wasatiyyah (middle way) scholarship. _Use case:_ Day-12; builds resistance to extremist rhetoric reframing.  (`src/data/exercises/religion-hub/day-12.json`)
- **Day-13 Religion-Medicine Boundary Exercise** — Classifies scenarios where religious practice complements medical treatment vs. replaces it (ruqyah alone, refusing psychiatry). _Use case:_ Day-13; prevents medical neglect driven by religious misinterpretation.  (`src/data/exercises/religion-hub/day-13.json`)
- **Day-14 Positive Coping Integration Exercise** — Capstone exercise integrating all seven Brief RCOPE positive coping strategies; user classifies statements across the full typology. _Use case:_ Day-14 final religion hub exercise; consolidates the 14-day learning.  (`src/data/exercises/religion-hub/day-14.json`)

---

## Science Exercise Registry

`src/data/exercises/science-registry.ts`

- **Science-Panel Theory Registry (DeepReal)** — Maps each DeepReal exercise day (dr-day1–dr-day14) to a `ScienceData` object containing theoryName, theoryAuthor, theoryYear, theoryMechanism, positiveScience, negativeScience, evidenceType, and evidenceTrustBand. Covers Inoculation Theory, Lateral Reading, Dual Process Theory, and more. _Use case:_ Rendered by the SciencePanel component to show the evidence base behind each exercise in real time.  (`src/data/exercises/science-registry.ts`)
- **Science-Panel Theory Registry (Mental Health)** — Same structure for mh-day1–mh-day14; frameworks include Affect Labeling, PERMA, CBT, Stigma Contact Hypothesis, Health Belief Model. _Use case:_ Same rendering pipeline for Mental Health module.  (`src/data/exercises/science-registry.ts`)
- **Science-Panel Theory Registry (Religion Hub)** — Same structure for rh-day1–rh-day14; frameworks include Pargament Religious Coping, Forgiveness Theory, Positive Psychology, Radicalization Models. _Use case:_ Same rendering pipeline for Religion Hub module.  (`src/data/exercises/science-registry.ts`)

---

## Science Track Exercises (Phase-1, days 3–35)

`src/data/exercises/science/index.ts` and 33 JSON exercise files

- **SCIENCE_EXERCISES Registry** — Typed index of 33 built Phase-1 science exercises (days 3–35), each entry carrying id, filename, day number, and difficulty 1–5. Explicitly marks Phase-2 (days 57–98) as not yet built. _Use case:_ Loader/router uses this registry to fetch the correct exercise JSON for any given science-track day.  (`src/data/exercises/science/index.ts`)
- **P-Hacking Audit (day 3)** — Multi-question exercise on detecting p-hacking through the Cornell Food Lab scandal case study; covers family-wise error rate, GRIM tests, and selective reporting. Difficulty 3. _Use case:_ Teaches students to detect researcher degrees of freedom abuse in published papers.  (`src/data/exercises/science/p-hacking_audit_day3.json`)
- **HARKing (day 4)** — Exercise on Hypothesizing After Results are Known; uses real retracted examples. Difficulty 3. _Use case:_ Trains recognition of post-hoc hypothesis fabrication.  (`src/data/exercises/science/harking_day4.json`)
- **Forking Paths (day 5)** — Exercise on multiverse analysis and researcher degrees of freedom. Difficulty 3. _Use case:_ Demonstrates how different analytical choices on the same data produce wildly different results.  (`src/data/exercises/science/forking_day5.json`)
- **Bonferroni Correction (day 6)** — Statistical exercise on multiple comparisons correction; difficulty 3. _Use case:_ Teaches when and how to apply family-wise error corrections.  (`src/data/exercises/science/bonferroni_day6.json`)
- **Regression to the Mean (day 7)** — Exercise identifying RTM artefacts in before-after study designs; difficulty 2. _Use case:_ Prevents users from attributing natural variation to treatment effects.  (`src/data/exercises/science/rtm_day7.json`)
- **Simpson's Paradox (day 8)** — Exercise on confounded aggregated data; difficulty 3. _Use case:_ Demonstrates how aggregation can reverse apparent trends.  (`src/data/exercises/science/simpsons_day8.json`)
- **Ecological Fallacy (day 9)** — Exercise distinguishing group-level from individual-level inference; difficulty 3. _Use case:_ Prevents misapplication of population statistics to individuals.  (`src/data/exercises/science/ecological_day9.json`)
- **Atomistic Fallacy (day 10)** — Exercise on drawing group conclusions from individual-level data; difficulty 3.  (`src/data/exercises/science/atomistic_day10.json`)
- **Survivorship Bias (day 11)** — Exercise using visible-survivor vs. missing-data examples; difficulty 2.  (`src/data/exercises/science/survivorship_day11.json`)
- **Selection Bias (day 12)** — Exercise on non-random sample selection distortions; difficulty 3.  (`src/data/exercises/science/selection_day12.json`)
- **Sampling Issues (day 13)** — Exercise on representative vs. convenience sampling; difficulty 2.  (`src/data/exercises/science/sampling_day13.json`)
- **Volunteer Bias (day 14)** — Exercise on self-selection effects in volunteer samples; difficulty 2.  (`src/data/exercises/science/volunteer_day14.json`)
- **Publication Bias (day 15)** — Exercise on the file-drawer problem and funnel plot asymmetry; difficulty 3.  (`src/data/exercises/science/pubbias_day15.json`)
- **Funnel Plot Interpretation (day 16)** — Exercise reading and interpreting funnel plots for meta-analyses; difficulty 4.  (`src/data/exercises/science/funnel_day16.json`)
- **Effect Size (day 17)** — Exercise on Cohen's d, odds ratios, and practical significance vs. statistical significance; difficulty 3.  (`src/data/exercises/science/effectsize_day17.json`)
- **Confidence Intervals (day 18)** — Exercise on interpreting CIs beyond "does it include zero"; difficulty 3.  (`src/data/exercises/science/ci_day18.json`)
- **P-Value Significance (day 19)** — Exercise on the correct interpretation of p-values and common misconceptions; difficulty 3.  (`src/data/exercises/science/psig_day19.json`)
- **Bayes Factor (day 20)** — Advanced exercise on BF₁₀ using the Kass & Raftery (1995) scale; includes clinical trial examples where Bayesian evidence for null is actionable; difficulty 4.  (`src/data/exercises/science/bayesfactor_day20.json`)
- **Likelihood Ratio (day 21)** — Exercise on likelihood ratios in diagnostic testing; difficulty 4.  (`src/data/exercises/science/lr_day21.json`)
- **Prior Specification (day 22)** — Exercise on how prior choice affects Bayesian posterior; difficulty 4.  (`src/data/exercises/science/prior_day22.json`)
- **Frequentist vs Bayesian (day 23)** — Comparative exercise on interpreting the same data under each paradigm; difficulty 4.  (`src/data/exercises/science/freqbayes_day23.json`)
- **Stopping Rules (day 24)** — Exercise on sequential testing and inflated Type I error from optional stopping; difficulty 4.  (`src/data/exercises/science/stopping_day24.json`)
- **Optional Stopping (day 25)** — Exercise extending stopping-rule analysis; difficulty 3.  (`src/data/exercises/science/optstop_day25.json`)
- **Degrees of Freedom (day 26)** — Exercise on how exploiting researcher degrees of freedom inflates false-positive rates; difficulty 3.  (`src/data/exercises/science/dof_day26.json`)
- **Outlier Handling (day 27)** — Exercise on transparent vs. selective outlier exclusion criteria; difficulty 3.  (`src/data/exercises/science/outlier_day27.json`)
- **Data Dredging (day 28)** — Exercise on specification searching and model overfitting; difficulty 3.  (`src/data/exercises/science/dredge_day28.json`)
- **Missing Data (MI, day 29)** — Exercise on multiple imputation vs. complete-case analysis; difficulty 4.  (`src/data/exercises/science/mi_day29.json`)
- **Missing at Random (day 30)** — Exercise distinguishing MCAR, MAR, and MNAR missingness mechanisms; difficulty 4.  (`src/data/exercises/science/mar_day30.json`)
- **ITT vs PP (day 31)** — Exercise on intention-to-treat vs. per-protocol analysis trade-offs in RCTs; difficulty 4.  (`src/data/exercises/science/ittpp_day31.json`)
- **Subgroup Analysis (day 32)** — Exercise on when post-hoc subgroup analysis is and is not valid; difficulty 3.  (`src/data/exercises/science/subgroup_day32.json`)
- **Interaction Effects (day 33)** — Exercise on moderation vs. main effects and interpretation pitfalls; difficulty 3.  (`src/data/exercises/science/interaction_day33.json`)
- **Confounding (day 34)** — Exercise on identifying and adjusting for confounders in observational studies; difficulty 3.  (`src/data/exercises/science/confound_day34.json`)
- **Collider Bias (day 35)** — Advanced capstone exercise on collider variables and why controlling for them can introduce bias; difficulty 3.  (`src/data/exercises/science/collider_day35.json`)

---

## Exercise Translation Registry

`src/data/exercises/translations.ts`

- **Arabic Item Translation Fallback Map** — `ITEM_TRANSLATIONS` record maps exercise item IDs (e.g., `str-1`, `anx-2`, `dep-3`, `perma-p`, `stig-1`, `help-2`, `br-1`, `comm-2`, `forg-1`, `pray-2`) to Arabic text and explanations for the ExerciseEngine when inline `textAr` is absent. Covers MH days 2–14 and RH days 2–7. _Use case:_ RTL rendering fallback so Arabic-language users receive bilingual content even when exercise JSON lacks `textAr` fields.  (`src/data/exercises/translations.ts`)

---

## Global Regulatory Institutions

`src/data/global-institutions.ts`

- **Global Regulatory Organization Registry** — Typed list of the world's major health/safety regulatory bodies (WHO, FDA, EMA, etc.) with officialName, hq, founded, scope, decisiveQuantitativeMetric (verified budget/staff), dual sourceUrls, and reasonChosenOverCompetitor. _Use case:_ Referenced by exercises and source-display surfaces to show why particular institutions are the most authoritative on a topic.  (`src/data/global-institutions.ts`)

---

## i18n Strings

`src/data/i18n/chatbot-strings.ts`, `site-strings.ts`, `ui-strings.ts`

- **Chatbot Trilingual String Map** — `CHAT_STRINGS` record covering all chatbot UI labels in English, Arabic (Fusha), and Egyptian dialect (arEG): onboarding, mode notes, loading states, action buttons, placeholders, error states. _Use case:_ Chatbot component renders the correct dialect string based on user language preference.  (`src/data/i18n/chatbot-strings.ts`)
- **Site-Wide Trilingual String Map** — Exports `NAV`, `HOME`, and other records covering navbar labels, homepage headlines, three-engine descriptions, tour steps, evidence and methodology sections — all in en/ar/arEG. _Use case:_ All major page components import these instead of hardcoding labels, enabling dialect switching without code changes.  (`src/data/i18n/site-strings.ts`)
- **ExerciseEngine Bilingual UI Map** — `UI` object maps Bloom levels, difficulty levels, MVP labels, phase headers, button labels, confidence slider labels, and 8-Gate check box texts to en/ar pairs. _Use case:_ ExerciseEngine component uses this as the single source of truth for all rendered labels, ensuring Arabic UI strings are consistent across all exercises.  (`src/data/i18n/ui-strings.ts`)

---

## Psychometric Instruments

`src/data/instruments/` (7 files)

- **Brief RCOPE Instrument (TS)** — Full 14-item Religious Coping Scale (Pargament et al., 2011): 7 positive and 7 negative subscale items, 4-point Likert (α = .90/.81), with Arabic labels, harm-monitoring note, and `createBriefRCOPEConfig()` factory. _Use case:_ Pre- and post-assessment for Religion Hub to measure change in religious coping style.  (`src/data/instruments/brief-rcope.ts`)
- **Brief RCOPE Instrument (JSON)** — Companion JSON with full `_meta` block (citation, DOI, PMID, subscale scoring formula, norms) for the same instrument. _Use case:_ Provides machine-readable metadata for instrument-readiness checks and documentation surfaces.  (`src/data/instruments/brief-rcope.json`)
- **GHSQ Instrument** — General Help-Seeking Questionnaire (Wilson et al., 2005): 17 items across two problem types (personal-emotional and suicidal ideation), 7-point Likert, adapted for Egyptian university context (includes religious leader source, crisis number 16328), with `createGHSQConfig()` factory. _Use case:_ Pre- and post-assessment measuring shift in help-seeking intentions.  (`src/data/instruments/ghsq.ts`)
- **MC-SDS Instrument** — Marlowe-Crowne Social Desirability Scale Short Form C (Reynolds, 1982): 13 True/False items (α = .76); used as covariate in ANCOVA to control for response bias. _Use case:_ Pre-only assessment to detect and statistically control social desirability effects in all outcome measures.  (`src/data/instruments/mc-sds.ts`)
- **MHLS Instrument** — Mental Health Literacy Scale (O'Connor & Casey, 2015): 35 representative items across 6 sections (disorder recognition, risk factors, social distance, help-seeking knowledge, stigma attitudes), with multilevel response scales (1–4 and 1–5 Likert) and Arabic translations. _Use case:_ Pre- and post-assessment of mental health literacy.  (`src/data/instruments/mhls.ts`)
- **MIST-20 Instrument** — Misinformation Susceptibility Test (Maertens et al., 2024): 20 real/fake headline items with veracity discernment subscores; exports `MIST20_ARABIC_ADAPTATION_PENDING = true` flag and `MIST20_ARABIC_NOTICE` bilingual notice to block Arabic deployment until a localized adaptation exists. _Use case:_ Pre- and post-assessment for DeepReal; the pending flag enforces the One-Law no-unsourced-equivalence policy for Arabic users.  (`src/data/instruments/mist-20.ts`)
- **SUS Instrument** — System Usability Scale (Brooke, 1996): exact 10 original items, 1–5 Likert, scoring algorithm (0–100), and benchmarks (≥80.3 = Grade A); `createSUSConfig()` factory. _Use case:_ Post-only usability assessment; SUS score ≥68 is a success criterion gate.  (`src/data/instruments/sus.ts`)
- **SUS JSON** — Companion JSON metadata mirror for the SUS instrument. _Use case:_ Same as brief-rcope.json — machine-readable metadata for documentation and readiness checks.  (`src/data/instruments/sus.json`)
- **Instruments Index (barrel)** — Re-exports `createMHLSConfig`, `createBriefRCOPEConfig`, `createGHSQConfig`, `createMCSDSConfig`, `createSUSConfig` from a single import point, with a table documenting when each of the 6 instruments is administered. _Use case:_ Assessment page imports all instruments from this single entry point.  (`src/data/instruments/index.ts`)

---

## Intervention Schedule

`src/data/interventions/intervention-schedule.ts`

- **17 Non-Exercise Intervention Modes Registry** — `INTERVENTION_MODES` array defines each of the 17 intervention modes (Source-of-the-Day Brief, Verification Checklist Overlay, Confidence Logging, Correction Ledger, Evidence Ladder Card, Source Compare Mode, Archive Replay, Myth Autopsy Board, Expert Voice Capsule, Decision Tree Navigator, Trusted Directory, Bias Reflection Minute, Prompt Lab, Peer Pair Review, Micro-Scenario Feed, Boundary Warning Layer, Weekly After-Action Review) with id, name, description, duration, cadence, mvps, activeDays, component name, and implemented flag. _Use case:_ Platform determines which intervention widgets to render on any given day and MVP.  (`src/data/interventions/intervention-schedule.ts`)
- **`getModesForDay()` helper** — Filters INTERVENTION_MODES by day and optional MVP, returning only implemented modes. _Use case:_ Day-view controller calls this to build the daily intervention widget deck.  (`src/data/interventions/intervention-schedule.ts`)
- **DAY_SCHEDULE constant** — Maps day ranges ("1-3", "4-6", "7-9", "10-12", "13-14") to the cumulative set of active intervention modes for that period. _Use case:_ Overview displays and supervisor dashboard render the escalating schedule.  (`src/data/interventions/intervention-schedule.ts`)

---

## IRL (In Real Life) Knowledge Store

`src/data/irl/irl-knowledge-store.ts`

- **IRL Micro-Node Content Store** — Maps micro-node keys (theme names, lab exercises, deepreal/mental-health/religion modules) to `IRLContent` objects each containing: bilingual steps (3-step real-life application protocol), 3 scientific methods with exercises and sources, and optional source reference. Includes nodes for UI themes (AMETHYST GEODE, Icy Gunmetal), distress assessment, deepfake detection, stigma reduction, prayer use, and more. _Use case:_ IRL button in exercises opens a side panel populated from this store, bridging in-app learning to real-world application with cited methods.  (`src/data/irl/irl-knowledge-store.ts`)

`src/data/irl/trusted-sources-repository.ts`

- **Top 100 Trusted Sources with Academic Citations** — `TRUSTED_SOURCES` array of 100 objects each carrying: id, title, authors, year, journal, domain (misinformation/mental-health/religious-coping/methodology/cognition/egypt-specific), url, keyFindings, and relevanceToEAL. _Use case:_ Pre/post test question generation, IRL button references, and evidence methodology citations throughout the platform.  (`src/data/irl/trusted-sources-repository.ts`)

---

## Islamic Reference Data

`src/data/islamic/nasikh-mansukh.ts`

- **Nasikh-Mansukh (Abrogation) Database** — Typed list of `AbrogatedVerse` objects, each containing verseRef, surah number, ayah, abrogatedBy, type (ruling_only / recitation_only / both), bilingual context and explanation, and classical tafsir reference (Ibn Kathir, Al-Jassas). _Use case:_ Religion Hub exercises and reference panels that need to handle abrogated rulings accurately, preventing misuse of superseded Quranic rulings.  (`src/data/islamic/nasikh-mansukh.ts`)

---

## KeyHunter Entries

`src/data/keyhunter/` (6 files)

- **KeyHunterEntry Type (§7.3 Data Model)** — Interface with 7 keyword layers: coreKeywords, expertKeywords, hiddenTerms, researchPhrases, threatKeywords, confusionWords, promptSuggestions; plus source, lastUpdated, optional comBTarget, and day. _Use case:_ Structural contract that all 42 KeyHunter entries must satisfy; enforces consistent 7-layer taxonomy across all three MVPs.  (`src/data/keyhunter/types.ts`)
- **DeepReal KeyHunter Entries (14)** — 14 entries for the DeepReal MVP spanning days 1–14 (SIFT Method, Source Credibility, Deepfake Detection, Emotional Triggers, Prebunking, Archive Verification, Deepfake Artifacts, Confirmation Bias, Filter Bubbles, Cross-Platform Verification, Coordinated Inauthentic Behavior, Algorithmic Amplification, Satire Recognition, Synthetic Media). Each has 7 keyword layers + academic citation. _Use case:_ KeyHunter engine uses these layers to generate precision research queries, route prompt suggestions, and tag exercises.  (`src/data/keyhunter/deepreal-entries.ts`)
- **Mental Health KeyHunter Entries (14)** — 14 entries for the Mental Health MVP spanning days 1–14 (Affect Labeling, Stress Response, Anxiety, Depression, PERMA, Stigma, Help-Seeking, Cognitive Reframing, Coping Strategies, Social Support, Sleep & Mental Health, Resilience, Emotion Regulation, Psychoeducation). Each has 7 keyword layers with expertKeywords reaching clinical terminology. _Use case:_ Same KeyHunter pipeline for Mental Health module.  (`src/data/keyhunter/mental-health-entries.ts`)
- **Religion Hub KeyHunter Entries (14)** — 14 entries for the Religion Hub MVP spanning days 1–14 (Positive Religious Coping, Benevolent Reappraisal, Community Support, Forgiveness, Prayer Wellbeing, Doubt, Gratitude/Sabr, Spiritual Bypassing, Guilt, Scholar Credibility, Radicalization, Moderate Islam, Religion-Medicine, Integration). _Use case:_ Same pipeline for Religion Hub module; confusionWords layer is especially important here to prevent misuse.  (`src/data/keyhunter/religion-hub-entries.ts`)
- **KeyHunter Index (barrel + helpers)** — Exports `ALL_KEYHUNTER_ENTRIES` (42 combined), `getKeyHunterEntry(id)`, and `getKeyHunterEntriesByMVP(mvp)` functions. _Use case:_ Any component needing a KeyHunter entry looks it up from this single barrel.  (`src/data/keyhunter/index.ts`)

---

## Methodology Metadata

`src/data/methodology.ts`

- **Global Methodology Metadata** — `globalMethodology` object documenting: 8 databases searched (WHO, FDA, Nature Index, OpenAlex, Scopus, Charity Navigator, Guidestar, annual reports), representative Boolean search strings, cross-validation rules (two independent sources, conservative lower bound), extraction timestamp, and comparative weighting tables for regulatory/research/educational org ranking. _Use case:_ Displayed in the About/Methodology section to establish the provenance and rigour of the institution-ranking datasets.  (`src/data/methodology.ts`)

---

## Navigation / Search

`src/data/navigation/global-search-tags.ts`

- **Site-Wide Content Search Tags** — `SITE_CONTENT_TAGS` array of `ContentTag` objects mapping every major route and sub-section (home, engines, assessments, instruments, biases, defence, resources, etc.) to its label (en + arEG), href, and keyword array. ~50+ entries covering pages, bias anchor links, and instrument sections. _Use case:_ Global search bar matches user queries against the keyword arrays to surface the correct page or section anchor.  (`src/data/navigation/global-search-tags.ts`)

---

## Organizations Directory

`src/data/organizations.ts`

- **Global Alliance Directory** — `organizations` array of `Organization` objects covering fact-checking, media-literacy, AI-ethics, religious-literacy, mental-health, OSINT, academic, and digital-rights organisations, each with id, name, nameAr, category, region, country, website, description, languages, founded, and isVerified fields. _Use case:_ Alliance/Partners page and trusted-directory quick-access widget render this list for users to find relevant organizations by domain.  (`src/data/organizations.ts`)

---

## Prompt Libraries

`src/data/prompts/` (5 files)

- **DeepReal Prompt Library (24 prompts)** — `DEEPREAL_PROMPTS` array with 24 exact framework-specified prompts covering strategies: claim_decomposition, evidence_laddering, source_triage, lateral_reading, contradiction_scan, emotional_lever_analysis, motive_analysis, confidence_calibration, geographic_context, archive_comparison, cross_model_verification, watchlist_generation. Each carries id, useCase, prompt text with variable slots `{claim}/{url}/{topic}`, bloomLevel, and comBTarget. _Use case:_ Prompt Lab page displays these as selectable templates; AI chat pre-populates selected prompts to enforce safe, evidence-demanding AI queries.  (`src/data/prompts/deepreal-prompts.ts`)
- **Mental Health Prompt Library (9 prompts)** — `MENTAL_HEALTH_PROMPTS` covering definition clarity, diagnosis boundary, stigma audit, help-seeking route, family communication, professional referral, safety boundary, cultural sensitivity, and self-care differentiation. All enforce no-diagnosis guardrail. _Use case:_ Mental Health Prompt Lab; chatbot mode selection pre-selects relevant prompts.  (`src/data/prompts/mental-health-prompts.ts`)
- **Religion Hub Prompt Library (9 prompts)** — `RELIGION_HUB_PROMPTS` covering positive coping explanation, boundary detection, moderation lens rewrite, non-fatwa guardrail, comparison framing, source verification, community assessment, personal reflection, and extremism distance. All forbid fatwa behavior. _Use case:_ Religion Hub Prompt Lab; enforces no-theological-verdict policy.  (`src/data/prompts/religion-prompts.ts`)
- **Logical Fallacies & Heuristics Datasets** — `logicalFallacies` (100+ named fallacies across formal/informal/scientific/Islamic categories), `logicConstructs` (40 valid inference forms from syllogism to Rapoport's rules), `criticalThinkingHeuristics` (30 entries from source triangulation to decision journaling), `emotionalIntelligenceCompetencies` (30 EI competencies). _Use case:_ Prompt Lab filter panel, FightBack engine, and exercise metadata tagging use these to classify reasoning patterns.  (`src/data/prompts/fallacies.ts`, `src/data/prompts/heuristics.ts`)
- **Prompt Index (barrel)** — Exports `ALL_PROMPTS` (42 combined), `getPromptsByMVP()`, `getPromptById()`. Total: 42 prompts generating 250+ runtime variants via variable interpolation. _Use case:_ Unified import for any component needing prompts.  (`src/data/prompts/index.ts`)

---

## Self-Test Protocol

`src/data/protocol/self-test-framework.ts`

- **SELF_TEST_PILLARS** — 4 pillars describing the research protocol's design principles (baseline-first, multi-instrument, gated deployment, explicit failure conditions). _Use case:_ Self-Test Protocol page renders these as the philosophical foundation of the study design.  (`src/data/protocol/self-test-framework.ts`)
- **SELF_TEST_ROUTE_STEPS** — Step-by-step measurement schedule (Day 0 battery → intervention → Day 15 post-assessment → analysis) with timing and summaries. _Use case:_ Interactive schedule component on the protocol page.  (`src/data/protocol/self-test-framework.ts`)
- **SELF_TEST_RISKS** — Explicit failure conditions (non-significant change, negative-coping drift, poor usability, low completion) each with a control strategy. _Use case:_ Supervisor dashboard and defence documentation display these as pre-registered failure criteria.  (`src/data/protocol/self-test-framework.ts`)

---

## Content Provenance

`src/data/provenance/content-provenance.ts`

- **Exercise Provenance Registry (3-source rule)** — Generates per-exercise provenance metadata for all 42 exercises (14 DeepReal + 14 Mental Health + 14 Religion Hub), each with primarySource, comparativeSource, methodologicalSource (name, type, lastReviewed), evidenceTier (systematic_review/rct/quasi_experiment/observational/expert_opinion), contentReviewDate, and reviewStatus. _Use case:_ Source transparency panel on every exercise; verifies compliance with the 3-source rule per §23.1.  (`src/data/provenance/content-provenance.ts`)

---

## Publishing Plan

`src/data/publishing/publishing-plan.ts`

- **Publishing Phases Timeline** — `PUBLISHING_PHASES` array (GitHub → PWA → App Stores → Academic Journals → Regional Partnerships) each with bilingual title, timing, summary, and action checklist in en/ar. _Use case:_ Supervisor / About page roadmap section shows the post-pilot publishing trajectory.  (`src/data/publishing/publishing-plan.ts`)

---

## Research Data Modules

`src/data/research/` (18 files)

- **Authored Casebook (Brain Exercises, Myths, Scenarios, Tricks, Reverse Cases)** — `AUTHORED_BRAIN_EXERCISES` and extended variants are Egypt-specific authored content (Egypt WhatsApp rumor break, health misinformation family scenarios, insider verification tricks) each with localized title/summary/action in en/ar/arEG, intensity level, decision logic, protocolNextAction, and linkedEvidenceClaimIds. _Use case:_ DeepReal and Mental Health module libraries render these as concrete real-world practice items prioritised for Egypt context.  (`src/data/research/authored-casebook.ts`)
- **Authority Routes & Religious References** — `AUTHORITY_ROUTES` defines which expert type to consult for each module (primary source owner, academic researcher, Al-Azhar for religious, mental-health professional), each with verifyYourself steps, proofSignals, and direct URL routes (free/official/community access). `RELIGIOUS_REFERENCES` maps Quran/Hadith themes relevant to mental health and coping. _Use case:_ "Find an expert" panel in exercises routes users to the correct authority type for their query.  (`src/data/research/authority-references.ts`)
- **Cognitive Knowledge Types** — Defines `KeyHunterV2Entry`, `BiasLibraryEntry`, and `CommunityResource` interfaces for the extended knowledge store (cognitive biases with family taxonomy, community resources with scope and access level). _Use case:_ Type definitions imported by components building the bias library and community resource directory.  (`src/data/research/cognitive-knowledge.ts`)
- **Coverage Maps** — `PROJECT_SCOPE_COVERAGE` (29 sections tracking implementation status from "implemented" to "partial") and `RESEARCH_TASKS_COVERAGE` map every requirement from the master framework to its app implementation. _Use case:_ Supervisor framework panel and defence preparation surfaces show progress against the full project specification.  (`src/data/research/coverage-maps.ts`)
- **DeepReal Game Mode Definitions** — Defines `DeepRealGameModeDefinition` type and imports from deepreal-immunity; exports 6 game modes (classic, egy, pov, immunity-rumors, immunity-scams, immunity-tiktok) each with rounds, choices (scoreDelta, correct flag, lesson), sources, and completion metadata. _Use case:_ The DeepReal interactive game component reads these definitions to render each mode.  (`src/data/research/deepreal-game.ts`)
- **DeepReal Immunity Game Modes** — Three `DeepRealGameModeDefinition` objects for IMMUNITY_RUMORS_MODE (12 rumor pattern rounds), IMMUNITY_SCAMS_MODE, and IMMUNITY_TIKTOK_MODE, each with bilingual round titles, scenes, prompts, choices, and sourced references (AkhbarMeter, etc.). _Use case:_ Advanced immunity training modes that test users on Egyptian-specific rumor patterns.  (`src/data/research/deepreal-immunity.ts`)
- **Defense Library** — Interfaces for paralysis-strategy clusters (data-decision/emotional-motivational/planning-cognitive/behavioral-social), expert implementations with justification, university application standards, keyword matrix entries, research applications, IAL components, and authority outreach plans. _Use case:_ Defense Q&A page and supervisor strategy tables render these for academic defense preparation.  (`src/data/research/defense-library.ts`)
- **Exercise Validation Audit** — `validateExercise()` and `validateAllExercises()` functions run schema validation (using ExerciseSchema/Zod) on all 42 exercise JSONs; generates a `ValidationReport` covering COM-B coverage, bilingual coverage, safety notes, and evidence presence. _Use case:_ Admin/test pipeline confirms exercise data quality before pilot deployment.  (`src/data/research/exercise-validation-audit.ts`)
- **Fight-Back Data (Fallacies, Biases, Religious Biases)** — `FALLACIES` (10 entries, en/ar/arEG with example + defense), `BIASES` (10 cognitive biases), `RELIGIOUS_BIASES` (5 entries: scripture cherry-picking, unqualified authority, fear-based control, medical replacement, takfir threat) — each with severity, sources, and trilingual content. _Use case:_ FightBack engine and project-vision bias-map pages render these as interactive defense cards.  (`src/data/research/fight-back-data.ts`)
- **Global Crisis Data** — `GLOBAL_CRISIS_STATISTICS` (citation-backed statistics on misinformation cost, deepfake spread, mental health treatment gaps), `GLOBAL_CASE_STUDIES` (multi-field case studies with Egypt/MENA/global tags), `VIRAL_FAKES_REGISTRY` with helper functions `getCrisisStatsByMVP()`, `getCaseStudiesByRegion()`, `getViralFakesBySiftStep()`, `getCaseStudyForExercise()`. _Use case:_ DeepReal and research pages surface hard numbers and case studies; exercises reference specific viral fakes for context.  (`src/data/research/global-crisis-data.ts`)
- **Global Institutions (research module)** — Typed arrays `regulatoryOrgs`, `researchOrgs`, `educationalOrgs` with rankings, Nature Index shares, Nobel laureate counts, and annual budgets. _Use case:_ "About Evidence" and Global Institutions pages render comparative tables of top scientific bodies.  (`src/data/research/global-institutions.ts`)
- **Instrument Readiness Matrix** — `INSTRUMENT_READINESS` record with per-instrument profiles (mist20, mhls, brief-rcope, ghsq, sus, mc-sds) each carrying english/arabic ReadinessStatus ("ready"/"conditional"/"blocked"), permissionStatus, deploymentRule, why, nextAction, and reviewerNeeded. _Use case:_ Governance panel and readiness checklist enforce hard gates (e.g., MIST-20 Arabic = blocked) before participant exposure.  (`src/data/research/instrument-readiness.ts`)
- **Kill List (Debunked Claims Registry)** — `killList` array of `DebunkedClaim` objects (claim in en/ar, fact, source, date, category, threatLevel Critical/High/Medium/Low); includes entries like microchips in vaccines, 5G causing COVID, etc. _Use case:_ DeepReal claim-lookup and fact-check surfaces cross-reference this registry for common viral claims.  (`src/data/research/kill-list.ts`)
- **Module Briefings** — `MODULE_BRIEFINGS` record (deepreal / mental-health / religion-hub) each containing trilingual title/subtitle/mission, structured `WorkflowStep` arrays (ordered steps with when/action/description), and `ComparisonMetric` arrays (global vs Egypt statistics with sources). _Use case:_ Module command-centre pages render the workflow and metrics panels.  (`src/data/research/module-briefings.ts`)
- **Module Guides (Emotion-Based Entry Points)** — `MODULE_GUIDES` record maps each module to an array of emotion-based entry states ("I feel rushed", "I feel angry", "I feel confused", "I feel hopeless") each with validation, scientificReason, recommendation, caution, firstStepId, and recommendedTab. _Use case:_ Module hub landing pages ask "How are you feeling?" and route to the recommended starting tab.  (`src/data/research/module-guides.ts`)
- **Module Libraries** — Aggregates authored casebook items and generated library items into unified `ModuleLibraryItem` arrays per module; `buildLibrary()` function generates templated items when authored content is exhausted. _Use case:_ Library tab within each module hub renders the full content list for browsing.  (`src/data/research/module-libraries.ts`)
- **Protocol Specification** — `RESEARCH_PROTOCOL` (full title + main research question), `SUB_RESEARCH_QUESTIONS` (SQ1–SQ7 with variable mappings), `HYPOTHESES` (null and alternative with failure conditions), `STATISTICAL_PLAN` (power analysis constants, success criteria table), `EVALUATION_METHODS`, and `MEASUREMENT_PHASES`. _Use case:_ Self-Test Protocol page and supervisor analytics render the formal research protocol; defence Q&A surfaces these data.  (`src/data/research/protocol-spec.ts`)
- **Real-World Data** — `REAL_WORLD_DATA` constant with nested misinformation (global $417B cost, Egypt 13.8–14.5% rate with sector breakdown), mentalHealth (75% global treatment gap, 80% Egypt), and religion sections with sourced statistics. _Use case:_ Data visualisation components (charts, stat cards) on the platform homepage and module hubs.  (`src/data/research/real-world-data.ts`)
- **Realtime Cognitive Protocols** — `REALTIME_COGNITIVE_PROTOCOLS` array of in-the-moment micro-protocols (pressure pause, claim distillation, source trace, emotion check, breath anchor, moderate voice, etc.) each with module, bilingual title/summary/action, whyItWorks, and sourced links. _Use case:_ Real-time cognitive friction widget shown during exercises or when user flags distress.  (`src/data/research/realtime-cognitive.ts`)
- **Scientific Intelligence** — Defines `ScienceSignal`, `TrustedSourceLeader`, `AudienceRiskProfile`, and `FlagRecord` interfaces for the intelligence layer (science signals with value/source/appliedTo, source leaders with trust signals, audience risk profiles with protective moves, flag families red/camouflage/green/grey/blood). _Use case:_ Scientific intelligence dashboard and source command center use these to display domain-specific risk signals and source evaluations.  (`src/data/research/scientific-intelligence.ts`)
- **Source Freshness Monitor** — `checkSourceFreshness()` (not shown but implied) generates a `FreshnessReport` with totalSources, freshCount, staleCount, criticalCount, and `staleSources` array; thresholds: >90 days = warning, >180 days = critical. _Use case:_ Governance panel and source audit surface trigger alerts when trusted-sources become stale.  (`src/data/research/source-freshness-monitor.ts`)
- **Support Media Registry** — `SUPPORT_MEDIA_REGISTRY` of books, podcasts, films, documentaries, TV shows, and quotes (type, title, titleAr, creator, year, platform, mvpRelevance, exerciseDayLink, description, url) with helpers `getMediaByType()`, `getMediaByMVP()`, `getMediaForExercise()`. _Use case:_ "Further Learning" section at the end of each exercise surfaces relevant recommended media.  (`src/data/research/support-media-registry.ts`)
- **Verified Quotes** — `VERIFIED_QUOTES` array of 24 quotes (8 per MVP: DeepReal, Mental Health, Religion Hub) each with bilingual quote/author/framing; sources include Socrates, Carl Sagan, Marie Curie, Viktor Frankl, al-Ghazali, and others. _Use case:_ Platform surfaces these as motivational anchors on module hub pages and the project-vision section.  (`src/data/research/verified-quotes.ts`)
- **Victim Impact Profiles** — `VICTIM_IMPACT_PROFILES` demographic-specific harm case studies (mothers, university students, elderly, youth, professionals) each with harmCase/harmCaseAr, region (egypt/mena/global), mvp, exerciseDay, comBTarget, manipulationVector, and protectiveSkill; helpers `getProfilesByDemographic()`, `getProfilesByMVP()`, `getProfileForExerciseDay()`. _Use case:_ Exercises use these profiles to ground abstract threats in concrete Egyptian demographic harm scenarios.  (`src/data/research/victim-impact-profiles.ts`)
- **Research Index (barrel)** — Re-exports global crisis data, victim profiles, and support media with all their types and helpers from a single import point. _Use case:_ Reduces import verbosity across all pages referencing research data.  (`src/data/research/index.ts`)

---

## Comprehensive Resource List

`src/data/resources/comprehensive-resource-list.ts`

- **Comprehensive Resource Categories** — `COMPREHENSIVE_RESOURCE_CATEGORIES` array of `ResourceCategory` objects covering: Initiatives (Misbar, Fatabyyano, AkhbarMeter, etc.), Academic Networks, Crisis Line Directories, and Digital Literacy Platforms; each entry with name, type, country, yearFounded, status, url, descriptionEn/Ar, and relevanceEn/Ar. _Use case:_ Resources / Directory page renders these as a browsable partnership and reference guide.  (`src/data/resources/comprehensive-resource-list.ts`)

---

## Roadmap Data

`src/data/roadmap-data.ts`

- **Platform Roadmap Categories** — `ROADMAP_DATA` array of `RoadmapCategory` objects (Core Platform, DeepReal Engine, Mental Health Engine, Religion Hub Engine, Research Tools, etc.) each containing `RoadmapItem` entries with bilingual name, href, scientificMechanics, bestUseCases, and a copyPasteScenario string. _Use case:_ Roadmap / Overview page gives users and supervisors a navigable map of every platform section.  (`src/data/roadmap-data.ts`)

---

## Scientific Institutions

`src/data/scientific-institutions.ts`

- **Top Scientific Institutions Registry** — `topScientificInstitutions` array covering CAS, Harvard, Max Planck, MIT, Stanford, etc. with institutionName, country, natureIndexShare (fractional count), niCountArticles, nobelLaureates, annualBudgetUSD, sourceUrl, and comparativeAdvantage. _Use case:_ "About Evidence" global institutions section benchmarks the scientific pedigree of the sources behind EAL.  (`src/data/scientific-institutions.ts`)

---

## Trusted Sources

`src/data/sources/trusted-sources.ts`, `trusted-sources.json`, `types.ts`

- **Top 100 Trusted Source Registry (TS)** — `TRUSTED_SOURCES` array (100 entries, ids 1–100) covering DeepReal (1–34), Mental Health (35–67), and Religion Hub (68–100) sources, each typed with sourceRole, userVisibility, evidenceLevel, jurisdiction, trustBand (A/B/C per §19.2 scoring 12-14/9-11/6-8), and lastVerified. _Use case:_ Source command center, source-of-the-day intervention, claim cross-check panels, and freshness monitor all reference this registry.  (`src/data/sources/trusted-sources.ts`)
- **Trusted Sources JSON** — Same 100 sources in JSON format with additional url and totalScore fields, providing a static snapshot for non-TypeScript consumers (API routes, export tools). _Use case:_ API routes that serve source data to external integrations without needing TypeScript compilation.  (`src/data/sources/trusted-sources.json`)
- **Source Types Schema** — `TrustedSource` interface defining the exact tag structure: id (1–100), name, mvp, whyTrusted, appUse, sourceRole (5 values), userVisibility (3 values), evidenceLevel (5 values), jurisdiction (3 values), trustBand, lastVerified, optional url and backupSource. _Use case:_ Type-safety enforcer for all source-registry consumers; prevents schema drift.  (`src/data/sources/types.ts`)

---

## Theory Data

`src/data/theory/comb-mapping.ts`, `theory-connections.ts`

- **COM-B Behavior Change Mapping** — `COMB_MAPPING` array of 18 entries (6 per MVP) mapping capability-psychological, capability-physical, opportunity-physical, opportunity-social, motivation-reflective, and motivation-automatic components to specific barriers, interventions, exerciseDays, and measuredBy metrics (e.g., MIST-20, GHSQ subscores). Anchored in Michie et al. (2011). _Use case:_ COM-B visualizer component shows how each exercise targets a specific behavior-change barrier; supervisor analytics tracks COM-B coverage.  (`src/data/theory/comb-mapping.ts`)
- **Theory Connections (15 frameworks)** — `THEORY_CONNECTIONS` array with all 15 theoretical frameworks across the three MVPs (Inoculation Theory, Dual Process Theory, SIFT, Bloom's Taxonomy, Lateral Reading for DeepReal; Affect Labeling, PERMA, CBT, Contact Hypothesis, Health Belief Model for Mental Health; Pargament Religious Coping, Forgiveness Theory, Positive Psychology, Radicalization Models, Spiritual Bypassing for Religion Hub) — each with causalMechanism, evidence citation, exerciseDays, applicationInExercise, and expectedOutcome. _Use case:_ "Scientific Foundation" panel in exercises and the About/Theory page renders these to explain why the design works.  (`src/data/theory/theory-connections.ts`)

---

## Trailer Scenes

`src/data/trailer/trailer-scenes.ts`

- **Cinematic Trailer Scene Scripts** — `TRAILER_SCENES` array of `TrailerScene` objects (Scene 1: Father on Sofa, Scene 2: University Student, Scene 3: Doctor Waiting Room, etc.) each with duration, bilingual setting description, dialogue direction, cinematography notes (camera moves), sound design notes, positive AI prompt, and negative AI prompt for image generation. _Use case:_ Used to generate or storyboard the platform's awareness trailer and concept visuals for presentation materials.  (`src/data/trailer/trailer-scenes.ts`)

---

## Project Vision Framework

`src/data/vision/project-vision-framework.ts`

- **PROJECT_VISION_PILLARS** — 4 vision pillars (behavior-change before content volume, Egypt-first misinformation literacy, three-lens integration, evidence-only foundation) with bilingual title/summary. _Use case:_ Project Vision page hero section renders these as the platform's guiding principles.  (`src/data/vision/project-vision-framework.ts`)
- **EgyptianMisinformationPatterns** — Array of Egypt-specific misinformation patterns (WhatsApp family chains, unofficial fatwas, health panic, economy rumors) with bilingual title/summary. _Use case:_ Egyptian Pattern Map section of the Project Vision page.  (`src/data/vision/project-vision-framework.ts`)
- **CognitionBiasEntries** — Array of 12 cognitive biases (Confirmation Bias, Availability Heuristic, Authority Bias, Dunning-Kruger, Illusory Truth, Social Proof, In-Group Bias, Backfire Effect, Emotional Reasoning, Proportionality Bias, Pattern Recognition Overreach, Anchoring) each with egyptianPattern, researcher, citation, whyItMatters, and productResponse. _Use case:_ Cognitive Bias Map interactive section; each bias links to the product feature that counteracts it.  (`src/data/vision/project-vision-framework.ts`)
- **VisionResponseLayers** — Array of design response layers showing how the platform's features address the identified bias/pattern landscape; each layer has featureRefs linking back to specific platform capabilities. _Use case:_ Design Response section of the Project Vision page ties user-facing features to the theoretical need.  (`src/data/vision/project-vision-framework.ts`)

---

## src/data/keyhunter/evidence-pyramid.ts

- **EVIDENCE_PYRAMID dataset (Dr. Ismail Methodology)** — Exports an `EvidenceLevel[]` ranking medical evidence from anecdote/testimonial (strength 1, critical bias risk) through case report, case series, cohort/observational, RCT, up to systematic review / meta-analysis; each level carries bilingual EN/AR description, a 1–10 strength score, biasRisk, commonBiases, realWorldExample, a positive `drIsmailStory`, a `quackExample` (the fictional charlatan "Dr. Karim Abu El-Qasr"), and `howToSpot` red-flag phrases. _Use case:_ Powers a story-driven gamified lesson that teaches users to rank the trustworthiness of medical claims — so they recognise that a YouTube testimonial is the weakest evidence and a meta-analysis the strongest.  (`src/data/keyhunter/evidence-pyramid.ts`)
