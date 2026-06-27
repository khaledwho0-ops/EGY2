# Data & Content Assets — slice data-1

This slice covers files 1–125 of the ASCII-sorted `src/data/**/*.{ts,json}` list. It includes:
- 1 baseline psychometric instrument
- 1 platform blueprint blob
- 10 DeepReal case stubs
- 1 constructive-positives stub
- 3 fallacy registries (Islamic, Logical, Scientific)
- 109 curriculum day stubs (day1–day67 lexicographic, spanning all 4 curriculum phases)

---

## src/data/baseline/trust-battery.ts

The Trust Calibration Battery is the Day-0 psychometric instrument users complete before beginning the curriculum. It measures baseline epistemic calibration across four dimensions: claim confidence, source ranking, emotion-driven judgment, and comfort-vs-accuracy bias.

- **CALIBRATION_CLAIMS dataset (12 items)** — Exports 12 `BatteryClaim` objects covering the three MVP domains (deepreal, mental-health, religion-hub) with trilingual text (English, Standard Arabic, Egyptian dialect), a ground-truth boolean, emotional load rating, and source-cited explanation. _Use case:_ Rendered on the `/baseline` page to measure a new user's initial claim-acceptance accuracy before any curriculum exposure.  (`src/data/baseline/trust-battery.ts`)

- **SOURCE_RANKING_SCENARIOS dataset (2 scenarios × 8 sources)** — Exports two `SourceRankingScenario` objects, each containing eight ranked source options (e.g. PubMed vs. a celebrity Instagram post), with authority-marker and evidence-quality flags and an ideal rank. _Use case:_ Displayed as drag-and-drop ranking exercises to establish a baseline source-evaluation score.  (`src/data/baseline/trust-battery.ts`)

- **EMOTION_EVIDENCE_PAIRS dataset (5 matched pairs)** — Exports five `EmotionEvidencePair` objects each presenting a neutral and an emotionally heightened version of the same underlying claim, with factual accuracy flags and emotional-trigger labels. _Use case:_ Measures susceptibility to emotional framing by tracking whether users rate the manipulated version differently from the neutral version.  (`src/data/baseline/trust-battery.ts`)

- **COMFORT_ACCURACY_PAIRS dataset (4 matched pairs)** — Exports four `ComfortAccuracyPair` objects each pairing a comforting-but-weak claim with an accurate-but-uncomfortable claim, graded by evidence strength. _Use case:_ Quantifies the "comfort bias" — how much a user's preference for reassuring information overrides accuracy — at Day 0.  (`src/data/baseline/trust-battery.ts`)

- **MODULE_BASELINE_TASKS dataset (3 tasks)** — Exports three `BaselineTask` objects (one per MVP: deepreal Thumbnail-Trap Test, mental-health Help-Seeking Attitudes Survey, religion-hub Quranic Context Test) each containing scored items with trilingual text. _Use case:_ Provides module-specific pre-training baselines so post-curriculum gains can be measured per track.  (`src/data/baseline/trust-battery.ts`)

---

## src/data/blueprint-data.ts

Exports a single large string constant `BLUEPRINT_DATA` containing the platform's founding scientific and methodological blueprint (~80KB markdown).

- **Platform Blueprint String** — Exports the full verified research blueprint as a template literal string, covering inoculation theory, cognitive dual-process foundations, worldwide standards (IFCN, UNESCO MIL, WHO mhGAP, DSM-5-TR, Amman Message), curriculum design rationale, and a 144-day program outline. _Use case:_ Used by documentation pages and the `/methodology` route to display the platform's evidentiary foundations to users and auditors.  (`src/data/blueprint-data.ts`)

---

## src/data/cases/chunk1.ts – chunk10.ts

Ten thin DeepReal case-file stubs, each exporting a single `DeepRealCase` object (fields: id, title, mediaType, detectedLayers, description).

- **DeepReal Case Registry (10 cases)** — Defines 10 synthetic media case files used for forensic training, ranging from a deepfake religious sermon (chunk1) and a forged WHO WhatsApp alert (chunk2) to a voice-cloned phishing call (chunk10), each tagged with media type and detection layer hints. _Use case:_ Each case is loaded by the DeepReal forensics engine to present a specific manipulation scenario to learners for 6-layer forensic dismantling practice.  (`src/data/cases/chunk1.ts` – `src/data/cases/chunk10.ts`)

---

## src/data/constructive-positives.ts

Stub dataset exporting a `ConstructivePositive[]` array of 30 items across three categories (Logic, Science, Theology), each with a placeholder name and description.

- **Constructive Positive Scaffolds (stub)** — Defines 30 post-debunk cognitive rebuilding mechanisms across Logic, Science, and Theology categories. _Use case:_ After exposing a fallacy or misconception, the platform presents a corresponding constructive alternative to avoid leaving a cognitive vacuum; this stub holds the schema for those replacements.  (`src/data/constructive-positives.ts`)

---

## src/data/curriculum/100-islamic-fallacies.ts

Exports `islamicFallacies: IslamicFallacy[]` — 28 verified entries (the file is titled "100" for interface-compatibility but is honest about containing only the 28 entries that can be sourced per the One Law).

- **Islamic Fallacy Registry (28 entries)** — Provides a bilingual (English + Arabic) catalogue of named theological and jurisprudential reasoning errors drawn from classical Islamic scholarship, including Tashbih, Ta'til, Takfir Without Conditions, Bid'a Hasana Denial, contextual isolation (taqti' al-ayah), Asbab al-Nuzul neglect, and others, each with a sourced explanation and illustrative example. _Use case:_ Powers the Islamic Fallacy Engine (Week 16–17 of Phase 3) and the religion-hub debunking pipeline; also used to flag fallacious patterns in AI-generated religious content.  (`src/data/curriculum/100-islamic-fallacies.ts`)

---

## src/data/curriculum/100-logical-fallacies.ts

Exports `logicalFallacies: LogicalFallacy[]` — 100 entries of named formal and informal logical fallacies.

- **Logical Fallacy Registry (100 entries)** — Bilingual catalogue of classical and informal logic errors (Affirming the Consequent, Denying the Antecedent, Ad Hominem, Strawman, Gish Gallop, False Equivalence, etc.) each with standard academic definition citing Hurley, Walton, or Hamblin, plus an illustrative example. _Use case:_ Powers the Logical Fallacy Engine used in Phase 1 (Weeks 6–7) and the general debunking pipeline; exposed via the `/fallacies` registry page.  (`src/data/curriculum/100-logical-fallacies.ts`)

- **Formal Fallacy sub-group** — Entries lf-1 through ~lf-10 cover strictly formal syllogistic errors (Affirming the Consequent, Denying the Antecedent, Undistributed Middle, etc.) with symbolic form notation. _Use case:_ Used to teach learners to identify structurally invalid arguments independent of content.  (`src/data/curriculum/100-logical-fallacies.ts`)

- **Informal Fallacy sub-group** — Remaining entries cover relevance, presumption, and ambiguity fallacies including emotional manipulation techniques (Appeal to Fear, Bandwagon, Loaded Question). _Use case:_ Used in the "Fallacy Engine Simulation" interactive exercise days and the WhatsApp forward fact-check drills.  (`src/data/curriculum/100-logical-fallacies.ts`)

---

## src/data/curriculum/100-scientific-fallacies.ts

Exports `scientificFallacies: ScientificFallacy[]` — 98 verified entries of methodology and reasoning errors in scientific contexts (the file is honest about the count per the One Law).

- **Scientific Fallacy Registry (98 entries)** — Bilingual catalogue of statistical, epidemiological, and science-denial reasoning errors: P-Hacking, HARKing, Garden-of-Forking-Paths, Multiple Comparisons Without Correction, Regression to the Mean, Appeal to Nature, Survivorship Bias, Base-Rate Neglect, Cherry-Picking, etc., each sourced to primary methodology literature (Ioannidis 2005, Simmons et al. 2011, Gelman & Loken 2014, Cook FLICC taxonomy). _Use case:_ Powers the Scientific Fallacy Engine used in Phase 2 (Weeks 11–12), the paper-audit simulator, and the medical disinformation debunking pipeline.  (`src/data/curriculum/100-scientific-fallacies.ts`)

- **Statistical Fallacy sub-group (sf-1 to sf-33)** — Covers research-design and data-analysis errors from p-hacking through base-rate neglect, used specifically in the "Anatomy of a Medical Study" and "Paper-Auditor Matrix" week modules. _Use case:_ Enables learners to identify flawed methodology in viral health claims before sharing them.  (`src/data/curriculum/100-scientific-fallacies.ts`)

- **Science-Denial Fallacy sub-group** — Covers FLICC-taxonomy patterns (Fake experts, Cherry-picking, Conspiracy theories, etc.) used in the "100 Scientific Fallacies Engine" game and as classifier labels in the AI debunking swarm. _Use case:_ Classifies science-denial manipulation techniques in user-submitted or AI-retrieved content.  (`src/data/curriculum/100-scientific-fallacies.ts`)

---

## src/data/curriculum/phase0-calibration.ts

Exports `phase0Calibration: CurriculumPhase` with 4 weeks of content.

- **Phase 0 Calibration Blueprint (4 weeks)** — Defines the psychological calibration phase (Weeks 1–4): Algorithm Anatomy (filter-bubble simulator), Emotional Lexicon Mapping (trigger-word EIS visualization), Illusory Truth Effect (reaction-time testing), and Base-Rate Primer (visual numerator/denominator builder). _Use case:_ Consumed by the curriculum routing layer to display week objectives, core mechanics, and assessment types; establishes the pre-curriculum deconstruction phase before hard forensic skills.  (`src/data/curriculum/phase0-calibration.ts`)

---

## src/data/curriculum/phase1-cognition.ts

Exports `phase1Cognition: CurriculumPhase` with 4 weeks of content.

- **Phase 1 Cognition Blueprint (4 weeks)** — Defines Foundational Cognition weeks (Weeks 5–8): Cognitive Bias Fingerprint, Logical Fallacies Engine Part 1 (sorting game), Logical Fallacies Engine Part 2 (debate autopsy), and Socratic Defense (dialogue simulator vs AI). _Use case:_ Drives the curriculum week-navigation UI and pre-loads the correct interactive mechanics and assessment types for each week.  (`src/data/curriculum/phase1-cognition.ts`)

---

## src/data/curriculum/phase2-science.ts

Exports `phase2Science: CurriculumPhase` with 6 weeks of content.

- **Phase 2 Scientific Literacy Blueprint (6 weeks)** — Defines Weeks 9–14: Anatomy of a Medical Study (p-hacking simulator), Evidence Pyramid (drag-and-drop hierarchy), Scientific Fallacies Engine Parts 1 and 2, Paper-Auditor Matrix (retraction watch simulator), and Correlation vs. Causation (spurious data simulator). _Use case:_ Provides the week-level content schema for the science literacy track, referenced by curriculum navigation and progress-tracking logic.  (`src/data/curriculum/phase2-science.ts`)

---

## src/data/curriculum/phase3-islamic.ts

Exports `phase3Islamic: CurriculumPhase` with 6 weeks of content.

- **Phase 3 Islamic Literacy Blueprint (6 weeks)** — Defines Weeks 15–20: Usul al-Fiqh introduction, Islamic Fallacies Engine Parts 1 and 2, Takhrij Simulator (hadith authentication via API), Maqasid Alignment Matrix (5 objectives verification), and Bi-l-ma'thur Gating Protocol (tafsir lock-and-key UI). _Use case:_ Drives curriculum navigation for the religious literacy track; provides structured Islamic jurisprudential defense training objectives.  (`src/data/curriculum/phase3-islamic.ts`)

---

## src/data/curriculum/phase4-defense.ts

Exports `phase4Defense: CurriculumPhase` with 4 weeks of content.

- **Phase 4 Live Defense Blueprint (4 weeks)** — Defines capstone Weeks 21–24: Threat-Map Simulator (bot/astroturfing network graph), DeepReal Forensics (6-layer WebGL media analysis), Inoculation Passport (weakened-dose fallacy injection), and Sovereign Debate (AI boss-fight integrating all 3 registries). _Use case:_ Defines the final integration assessment objectives and mechanics; the "Sovereign Defense" pass/fail is the platform's graduation gate.  (`src/data/curriculum/phase4-defense.ts`)

---

## src/data/curriculum/days/day1.ts – day67.ts (109 files, lexicographic slice)

All 109 day files in the slice (day1, day10, day100–day119, day11, day12–day19, day2, day20–day29, day3, day30–day39, day4, day40–day49, day5, day50–day59, day6, day60–day67) export a single thin `DailyExercise` stub with id, dayNumber, weekNumber, phaseTopic, exerciseType, and a generic prompt string.

These files cover curriculum days belonging to all four phases:
- **Psychological Calibration** (days 1–28): phaseTopic = "Psychological Calibration"
- **Foundational Cognition & Logic** (days 29–56): phaseTopic = "Foundational Cognition & Logic"
- **Scientific Literacy** (days 57–98): phaseTopic = "Scientific Literacy"
- **Islamic Literacy** (days 99–120): phaseTopic = "Islamic Literacy"
- **Live Defense & Inoculation** (days 121–144): phaseTopic = "Live Defense & Inoculation"

Observed `exerciseType` values across the slice:
- `Theory Introduction (MDX Payload)` — lesson-delivery days
- `Historical Case Study (Analysis)` — narrative case analysis
- `Fallacy Engine Simulation (Interactive)` — interactive gamified fallacy drill
- `Socratic Dialogue Tree (Roleplay)` — AI dialogue roleplay
- `WhatsApp Forward Check (Viral Takhrij)` — viral content fact-check drill
- `Weekly Assessment & Synthesis (Quiz)` — end-of-week checkpoint quiz

- **Daily Exercise Stub (days 1–67 of 144)** — Each file defines the id, day number, week number, phase topic, exercise mechanic type, and a generic prompt for one day in the 144-day curriculum. _Use case:_ The curriculum router imports the relevant day's stub to scaffold the UI for that session, routing to the appropriate interactive component (MDX payload, fallacy engine, dialogue tree, etc.) based on `exerciseType`.  (`src/data/curriculum/days/day1.ts` – `src/data/curriculum/days/day67.ts`)

- **Psychological Calibration Day Stubs (days 1–28)** — 28 day stubs covering Phase 0 content: algorithmic anatomy, emotional lexicon mapping, illusory-truth effect training, and base-rate primer. _Use case:_ Delivered sequentially during the first 4 weeks to dismantle pre-existing cognitive resistance before hard mechanics begin.  (`src/data/curriculum/days/day1.ts` – `src/data/curriculum/days/day28.ts`)

- **Foundational Cognition Day Stubs (days 29–56)** — 28 day stubs covering Phase 1: cognitive bias fingerprint, logical fallacies engine Parts 1–2, Socratic defense dialogs. _Use case:_ Delivered in weeks 5–8 to train structural logical defense skills.  (`src/data/curriculum/days/day29.ts` – `src/data/curriculum/days/day56.ts`)

- **Scientific Literacy Day Stubs (days 57–67 in slice)** — Partial Phase 2 stubs (days 57–67) covering the beginning of scientific methodology training. _Use case:_ First days of the science literacy track, scaffolding medical study anatomy exercises and evidence pyramid ranking.  (`src/data/curriculum/days/day57.ts` – `src/data/curriculum/days/day67.ts`)

- **Islamic Literacy Day Stubs (days 100–120 in slice)** — 21 stubs (day100–day119 lexicographically falls in the slice) covering Phase 3: usul al-fiqh, Islamic fallacies engine, takhrij hadith validation, maqasid alignment. _Use case:_ Delivered in weeks 15–20 to build resistance to theological manipulation.  (`src/data/curriculum/days/day100.ts` – `src/data/curriculum/days/day119.ts`)

- **Live Defense Day Stubs (days 121–129 in slice)** — 9 stubs (day121–day129) covering the beginning of Phase 4 capstone: threat-map simulator, deepfake forensics. _Use case:_ First days of the final integration phase, applying all prior skills in live-fire simulation scenarios.  (`src/data/curriculum/days/day121.ts` – `src/data/curriculum/days/day129.ts`)
