# 10 — STRATEGY: COGNITION SCIENCE (THE COGNITION BUILDER / TRAINER)

> **What this is.** The build-ready design for EAL's *cognition-immunity trainer* — the
> COGNITION-BUILDER category half of the project (§14). It specifies module structure, exercise
> types, the difficulty curve, how immunity is **measured** (pre/post + a Cognitive Immunity Score),
> and the mastery path. Every mechanic is grounded in the learning science cataloged in
> `03_VERIFIED_SOURCES.md` and bound to **code that already exists** in the repo.
>
> **Read order (binding):** `01_PHILOSOPHY_DIGEST.md` → `03_VERIFIED_SOURCES.md` → this file.
>
> **The One Law still governs (§0).** A trainer is not exempt: every claim shown in a lesson, every
> "real news" item in a test, every debunk used as feedback carries a resolvable source or is flagged
> `UNVERIFIED`. The trainer **teaches** the Truth Stack by **obeying** it.

---

## 0. WHAT ALREADY EXISTS (build ON this, do not re-invent)

This design is deliberately a thin orchestration layer over modules already in the repo. Audited:

| Concern | Real file | What it gives us (verbatim from code) |
|---|---|---|
| **Spaced repetition** | `src/lib/cognition/sm2.ts` | `sm2(card, q)` — pure SuperMemo SM-2. `q∈0..5`, ease floor `1.3`, intervals `1 → 6 → round(interval×ease)`, resets on `q<3`. Dependency-free, deterministic. |
| **Susceptibility test** | `src/lib/cognition/mist.ts` + `mist-items-2023.json` | `scoreMIST()` → `{ veracityDiscernment(0-20), realNewsBias, fakeNewsAccept, missedByType }`. The published MIST-20 under its CC license, **distractor-typed by FLICC** (`F/L/I/C/Cn`). |
| **Manipulation taxonomy** | `src/lib/cognition/flicc.ts` | `FLICC` (Fake experts, Logical fallacies, Impossible expectations, Cherry-picking, Conspiracy) + `SIFT` 4-move array with AR prompts. |
| **Per-layer defense** | `src/lib/standard/cognition.ts` | `COGNITION_BUILDER[8]` — for each Layer 1-8: `technique, techniqueAr, biasCountered, why, steps[], shieldTools[], source`. Plus `INOCULATION_TECHNIQUES[12]` each with a one-line `prebunk`. **This is the curriculum spine, already coded.** |
| **Live classifier** | `src/lib/cognition/flicc-classifier.ts` | `classifyClaim()` → deterministic-first FLICC + layer + confidence, KV-cached. Used to auto-generate/grade exercises. |
| **Imposter checklist** | `src/lib/cognition/doctor-test.ts` | `DOCTOR_TEST.must[]` — 5 lateral-reading checks for a "doctor" (specialty, syndicate, affiliation, publications, society). A ready Layer-1/Fake-Expert exercise. |
| **MIST endpoint** | `POST /api/mist` (02_API map) | "Scores the MIST, persists baseline, recommends FLICC lessons." Already wired to Vercel KV. |
| **Inoculation games** | `POST /api/live-deception/generate`, `POST /api/debate-sim` | Escalating rabbit-hole feed generator + AI-argues-with-a-fallacy. The active-role-play mechanics already exist as routes. |
| **Assessment persistence** | `GET/POST /api/assessment`, `/api/assessment/export` | "N=84 pilot pre/post instrument persistence (KV, hashed IDs) + admin CSV/JSON export." The pre/post pipeline exists. |

**Design rule:** the trainer is **new orchestration + content**, not new engines. Where a primitive
exists (SM-2, MIST scorer, classifier, COGNITION_BUILDER), import it. New code is: the **session
runner**, the **exercise bank schema**, the **Cognitive Immunity Score (CIS)** aggregator, and the
**content** (Egyptian-dialect items per technique).

---

## 1. THE LEARNING-SCIENCE SPINE (the five mechanisms, and why each)

Each mechanism is load-bearing and cited to `03_VERIFIED_SOURCES.md`. Nothing here is a vibe.

| # | Mechanism | What it does | Primary evidence (from 03) | How EAL implements it |
|---|---|---|---|---|
| **M1** | **Technique-based inoculation** (prebunk the *tactic*, not the hoax) | Builds resistance that **generalizes to unseen** misinformation | Roozenbeek & van der Linden 2019 (*Palgrave Comms*); **Science Advances 2022**, ~30k participants, recognition gains; cross-cultural *d*=0.24–0.41 | The 8-Layer spine × `INOCULATION_TECHNIQUES`: every lesson teaches a *technique* with a weakened dose + refutation, then "now spot it." |
| **M2** | **Active role-play** ("become the manipulator for 5 min") | Strongest **persistence + transfer** of the active-learning mechanics | Bad News game (six techniques); IREX L2D persistence **~1.5 yr** | "Build-a-Lie" forge exercises + the existing `live-deception/generate` rabbit-hole + `debate-sim`. |
| **M3** | **Spaced repetition** | Converts one-shot recognition into **durable** memory; counters the documented decay of one-shot inoculation | 2025 Swedish study: one-shots don't durably help → "**use spaced boosters**" (03 §1.2, Arsenal §17.5) | `sm2.ts` schedules **booster** re-exposures of each technique; never one-and-done. |
| **M4** | **Retrieval practice** (test-to-learn, not re-read) | Active recall outperforms re-reading; the test *is* the lesson | Standard testing-effect literature; operationalized via MIST/FLICC item recall | Every module ends in a graded retrieval set; the SM-2 `q` grade **is** the recall score. |
| **M5** | **Emotion-as-detector + metacognition** | Trains noticing one's **own** emotional spike as the trigger to pause; calibrates confidence | IREX L2D (emotion-detector lesson); Basol et al. 2020 — prebunking raises **confidence calibration**, not just accuracy | SIFT's "STOP — what's your emotion in the last 3s?" (`flicc.ts` `SIFT[0]`) opens every analysis; each answer logs a **confidence slider** → calibration score. |

**Two honesty mandates baked into measurement (from 03 §5, non-negotiable):**
1. **Discernment, not distrust.** A 2025 SDT/network meta-analysis found some prebunking just shifts
   people to say "false" more (criterion shift, not real accuracy). → **We score accuracy on REAL
   and FAKE items separately** and report the *bias* term, exactly as `scoreMIST` already returns
   `realNewsBias`. A trainer that only makes users more cynical has **failed**, and the score must be
   able to *show* that failure.
2. **Calibrated claims.** Effect sizes are real but modest (field ~+5% recognition). The product
   **never** claims "immune" or "100%." The score is labeled *Cognitive Immunity* as a measured
   construct with a confidence band — consistent with the §13 Shield honesty clause ("strongest
   available counter… not '100% destroyed'").

---

## 2. THE CURRICULUM SPINE — 8 LAYERS × THE FLICC/INOCULATION TECHNIQUES

The 8-Layer deception taxonomy (§5) is the **vertical spine** (the syllabus order). The
`INOCULATION_TECHNIQUES` and `FLICC` codes are the **horizontal skills** taught inside each layer.
The pairing is already encoded in `COGNITION_BUILDER` (technique per layer) — the curriculum is its
expansion.

### 2.1 The module map (one module per layer, taught in order)

| Module | Layer (spine) | Core technique taught (`COGNITION_BUILDER`) | Bias countered | Technique cards drilled (`INOCULATION_TECHNIQUES`) | Anchor exercise |
|---|---|---|---|---|---|
| **M1** | **1 — Absolute Fabrication** | Lateral Reading + SIFT | Confirmation bias / source neglect | `fake-expert`, `emotion` | DOCTOR_TEST imposter check + "does this source exist?" lateral hunt |
| **M2** | **2 — Biased Lens** | Omission Audit + Steelmanning | Framing / WYSIATI | `cherry-picking`, `scapegoating` | "What are they NOT showing?" — supply the omitted half + base rate |
| **M3** | **3 — Decontextualization** | Upstream Reading + Toulmin | Illusory truth / quote-mining | `decontextualization` | Reverse-search a real clip to its original context (SIFT Trace) |
| **M4** | **4 — Weaponized Timing** | Cui Bono + Temporal Forensics | Recency / emotional reasoning | `polarization`, `emotion` | "Why NOW? Who benefits?" timeline-overlay |
| **M5** | **5 — Evil Application** | Is–Ought Separation + Dual-Use Ethics | Halo effect / authority transfer | `false-dichotomy`, `logical-fallacy` | Separate a true fact from its weaponized use; name the harm |
| **M6** | **6 — Matrix of Manipulation** | **Inoculation / Prebunking** + Bubble-Exit | Identity-protective cognition / backfire | `conspiracy`, `ad-hominem`, `incoherence` | The **rabbit-hole game** (`live-deception/generate`): spot escalation, don't lead with facts |
| **M7** | **7 — The Architects** | Systems & Incentive Mapping | System justification / proportionality | `polarization` (amplification), `impossible-expectations` | Map a feed's incentives + ownership; identify the "rail" |
| **M8** | **8 — The Unknown** | Bayesian Calibration + Steelman the Null | Need for closure / overconfidence | (calibration drills) | Assign a **probability band**, not a verdict; state what would update it |

> Every cell above is already present in `cognition.ts` (`steps[]`, `why`, `source`). The module
> content is the **Egyptian-dialect dramatization** of those steps, not new theory.

### 2.2 Layer-6 and Layer-8 get special handling (per the constitution)

- **Layer 6 is the inoculation core**, not just a module. The §5 defense *is* "prebunk + bubble-exit,"
  and M5 of the learning spine (emotion + role-play) is heaviest here. **Do not lead with the
  counter-fact** (`COGNITION_BUILDER[6].steps[0]`): acknowledge the need, give a weakened dose, name
  the technique, restore exit ramps. This is the one module where "winning the argument" is the wrong
  goal.
- **Layer 8 trains the meta-skill** the whole product depends on: *calibrated uncertainty*. Its
  exercises have **no clean answer key** — they are graded on calibration (did your confidence match
  reality?) via a Brier-style score, never on a binary verdict. This directly enforces §5's Layer-8
  discipline ("never manufacture certainty").

---

## 3. MODULE STRUCTURE — the fixed 6-beat shape every module follows

Every module is the same loop so "every page speaks the same language" (§6). The beats map 1:1 to the
Jigsaw 5-step prebunk loop (03 §1.4) plus a retrieval beat.

```
 ┌─ BEAT 0 · ACTIVATE ───────────────────────────────────────────────┐
 │ SIFT "STOP" prompt (flicc.ts SIFT[0]): "What is your emotion in     │
 │ the last 3 seconds?" + log baseline confidence slider.   ← M5      │
 ├─ BEAT 1 · FOREWARN (the weakened dose) ───────────────────────────┤
 │ Name the technique + show a *labeled, defanged* example of it.     │
 │ Source: INOCULATION_TECHNIQUES[id].prebunk.              ← M1      │
 ├─ BEAT 2 · DECONSTRUCT (how the trick works) ──────────────────────┤
 │ Walk COGNITION_BUILDER[layer].steps[] with one real Egyptian case  │
 │ from data.ts / layer8Cases.ts. Show the bias it exploits. ← M1     │
 ├─ BEAT 3 · FORGE (active role-play) ───────────────────────────────┤
 │ "Build-a-Lie": user constructs the manipulation themselves, then   │
 │ the classifier (flicc-classifier.ts) grades whether it lands.← M2  │
 ├─ BEAT 4 · SPOT (retrieval practice, graded) ──────────────────────┤
 │ 5–10 mixed real/fake items; user labels + rates confidence.        │
 │ This is the SM-2 review. Output feeds CIS + missedByType.  ← M4    │
 ├─ BEAT 5 · DEFEND (transfer) ──────────────────────────────────────┤
 │ One live WhatsApp-style item routed through the real pipeline      │
 │ (/api/whatsapp-analyzer or /api/ai/debunker); user writes the      │
 │ counter using the layer's defense, then sees the model's.   ← M2/M4│
 └────────────────────────────────────────────────────────────────────┘
```

**Compliance footer on every module (the §7 contract, non-negotiable):** sources visible + tier on
every item; confidence shown (derived); layer + defense named; bilingual AR(Egyptian)/EN + RTL;
responsive to 320px; fails loud; reachable from navigation. A module is **done** only when all boxes
tick — same gate as any other EAL feature.

---

## 4. EXERCISE TYPES (the bank) — 9 types, each grounded + auto-gradable

The exercise **bank** is a typed content store. Each item declares its `layer`, `technique`,
`difficulty (1-5)`, `source[]`, and `answerKey`. Types:

| # | Type | Beat | What the user does | Grading (deterministic where possible) | Backed by |
|---|---|---|---|---|---|
| **E1** | **Spot-the-Technique** (MCQ) | 4 | Pick which technique a real item uses | Exact-match key | MIST `distractorType` mapping; FLICC |
| **E2** | **Real-or-Fake + confidence** | 4 | Binary label + 0-100 slider | Accuracy on real/fake **separately** + calibration | `scoreMIST` math (reused) |
| **E3** | **Find-the-Omission** | 2 | Name what's missing from a true-but-biased post | LLM-narrated vs. retrieved base rate (Evidence Aggregator) | `COGNITION_BUILDER[2]` |
| **E4** | **Trace-Upstream** | 5 | Reverse-search a clip/quote to origin | Did they reach the archived original? (Wayback/SerpAPI hit) | `COGNITION_BUILDER[3]`, `/api/search/reverse-image` |
| **E5** | **Cui-Bono Timeline** | 2 | Place an item on a timeline, answer "why now?" | Rubric (who-benefits identified) | `COGNITION_BUILDER[4]` |
| **E6** | **Build-a-Lie (forge)** | 3 | Construct a manipulation using a given technique | `classifyClaim()` confirms the technique is detectable | `flicc-classifier.ts` |
| **E7** | **Debate-the-Bot** | 3/5 | Argue with an AI that hides a fallacy; spot it | Did the user name the planted fallacy? | `/api/debate-sim` |
| **E8** | **Rabbit-Hole Survival** | 3 | Navigate an escalating feed without "falling in" | Choice-tree scoring (resisted escalation) | `/api/live-deception/generate` |
| **E9** | **Calibration (Layer 8)** | 4 | Give a probability band for an unresolved claim | **Brier score** vs. honest ground-truth band | `COGNITION_BUILDER[8]` |

**The grading honesty rule (One-Law):** where a deterministic key exists (E1, E2, E6, E7, E9), the
LLM does **not** grade — code does. Where the LLM narrates (E3, E5), it runs over **retrieved**
sources only and may return "insufficient evidence." No exercise is graded by ungrounded model
confidence.

**Item provenance:** every item in the bank is either (a) a real, sourced case from `data.ts` /
`layer8Cases.ts` / the kill-list (`/api/kill-list`), or (b) a **synthetic item labeled synthetic**
generated by `live-deception/generate` for forge/role-play only — never presented as a real event.

---

## 5. THE DIFFICULTY CURVE — 5 levels, adaptive, evidence-shaped

Difficulty is a per-item integer `1-5`. The curve is shaped by **how hard the deception is to detect**,
which tracks the taxonomy itself: Layer 1 (no source) is detectable by a novice; Layer 6/7 (everything
real, manipulation is structural) defeats fact-checks and needs the trained eye.

| Lvl | Name (EN / AR) | Detection demand | Typical layers | Item characteristics |
|---|---|---|---|---|
| **1** | Obvious / واضح | Surface cues | L1, L2 | Loaded words, absolutism, no source, clear emotional bait |
| **2** | Plausible / محتمل | Lateral check needed | L1, L2, L3 | Looks credible; one lateral read exposes it |
| **3** | Credible / مُقنع | Context restoration | L3, L4 | Real quote/clip, wrong context; needs upstream trace |
| **4** | Expert / احترافي | Multi-step + base rates | L4, L5, L6 | Passes fact-checks; manipulation is omission/timing/application |
| **5** | Architect / الأعلى | Systems thinking + calibration | L6, L7, L8 | Everything real; the trap is structural or genuinely unknown |

**Adaptive progression (deterministic, auditable — no black box):**
- A learner has a per-technique **level** (starts at 1).
- **Promote** to level *n+1* when rolling accuracy on level *n* items for that technique ≥ **80%**
  over the last **≥8** items **AND** SM-2 grade `q≥4` on the latest review.
- **Demote / hold** when accuracy < 60% over the last 8 — and **inject a remedial booster** of the
  weakest `missedByType` FLICC category (directly from `scoreMIST().missedByType`).
- **Confidence gate (anti-overconfidence):** a *correct* answer given with mis-calibrated confidence
  (e.g., 95% sure on a Layer-8 unknown) does **not** count toward promotion. This operationalizes
  the discernment-not-distrust and calibration mandates from §1.

**Why 80%/8-items:** standard mastery-learning threshold; 8 items keeps the rolling window stable
enough to resist a lucky streak while staying responsive within one session.

---

## 6. SPACED REPETITION & RETRIEVAL — wiring SM-2 to the curriculum

The unit of memory is **one technique-card per (technique × layer-context)** — e.g.
`fake-expert@L1`, `cherry-picking@L2`, `decontextualization@L3`. ~20 cards total (12 techniques,
several appearing in 2 layers). This makes the deck small enough to actually master and review.

**Mapping the review answer → SM-2 `q∈0..5`** (the one place we must define the bridge, because
`sm2.ts` is pure and takes a 0-5 quality, not an accuracy):

| Outcome on the card's retrieval item | `q` | Effect (from `sm2.ts`) |
|---|---|---|
| Wrong | **0** | reset: `repetitions=0, interval=1` |
| Right but only after a hint | **2** | reset (q<3): `interval=1` |
| Right, slow, low confidence | **3** | first real interval (1 day) |
| Right, confident, calibrated | **4** | interval grows × ease |
| Right, fast, well-calibrated, on a harder level | **5** | max ease gain, longest next interval |

> This bridge is **deterministic and testable**: same outcome → same `q` → same `sm2()` output
> (reproducibility, §11). It is the *only* glue code needed for scheduling.

**Booster scheduling (the durability fix):** because one-shot inoculation decays (03 §1.2; Arsenal
"use spaced boosters"), every technique-card is **due** again on its SM-2 interval. The daily session
(§7) always front-loads **due cards** before new content. A technique is never "finished" — it
re-surfaces until its interval is long (mastery), then periodically as a maintenance booster.

**Retrieval-practice rule:** boosters are always *test* items (E1/E2/E7/E9), never re-reading the
lesson. The re-test *is* the booster (M4).

---

## 7. THE DAILY SESSION RUNNER (the loop the user actually runs)

A session is short (target 7–12 min) to fit the WhatsApp-native habit and to make daily return cheap.

```
SESSION(user):
  1. WARM-UP  · SIFT STOP prompt + 1 emotion-as-detector micro-item        (M5, ~30s)
  2. BOOSTERS · all SM-2 cards where due ≤ today, hardest-first             (M3/M4)
                 → each is a retrieval item → grade → sm2(card, q)
  3. NEW      · 1 module beat from the current layer (caps new load)        (M1/M2)
  4. FORGE    · 1 active role-play item (Build-a-Lie / debate-bot / rabbit) (M2)
  5. TRANSFER · 1 live item via the real pipeline (whatsapp-analyzer)       (M2/M4)
  6. WRAP     · show today's CIS delta + the one technique to watch         (metacognition)
```

Persistence reuses `/api/assessment` + Vercel KV (hashed IDs, already built). No new datastore.

---

## 8. MEASURING IMMUNITY — pre/post tests + the Cognitive Immunity Score (CIS)

This is the heart of the task. Immunity is **measured**, never asserted. Three instruments, all
already partly coded.

### 8.1 The pre/post backbone (validated instruments only)

| Instrument | When | What it measures | Source / status |
|---|---|---|---|
| **MIST-20** | **Pre** (onboarding baseline) + **Post** (after each layer block & at 30-day) | Veracity discernment + the two **bias** terms | `mist.ts` / `mist-items-2023.json` (published, CC) — **already built**, `/api/mist` persists baseline |
| **Per-technique retrieval accuracy** | Continuous | Per-FLICC-category skill, real vs fake separately | `scoreMIST().missedByType` + the bank's E1/E2 logs |
| **Confidence calibration** | Continuous | Brier score: does stated confidence match correctness? | Logged from every E2/E9 confidence slider |
| **Transfer item** | Pre + Post | Can the user counter an *unseen* live item? | Graded rubric over `/api/ai/debunker` output |

**Honest pre/post design (counters the criterion-shift critique, 03 §5 mandate 2):**
- Always test **real AND fake** items; report `realNewsBias` (already returned by `scoreMIST`). A
  "gain" that is only `fakeNewsAccept↓` with `realNewsBias` swinging to distrust is flagged as
  **distrust drift**, not immunity.
- Use a **held-out MIST split** for post-tests (the JSON is version-locked; reserve items the user
  never saw in training) so the post-test measures *transfer*, not memorization of trained items.
- Re-administer at **30 days** (SM-2 will have driven boosters) to measure *durability* — the metric
  that matters per IREX's 1.5-yr persistence benchmark.

### 8.2 The Cognitive Immunity Score (CIS) — definition

CIS ∈ **0–100**, a derived composite (never hardcoded — §2 Strategy 3). Four sub-scores, each 0–100,
weighted:

```
CIS = 0.35·DISCERNMENT + 0.25·CALIBRATION + 0.25·COVERAGE + 0.15·DURABILITY
```

| Sub-score | Formula (deterministic) | Reads from |
|---|---|---|
| **DISCERNMENT** | balanced accuracy = ½·(real-item acc + fake-item acc), rescaled 0–100. Using *balanced* accuracy is what makes pure "say-false" gaming worthless. | `scoreMIST` real/fake splits + bank logs |
| **CALIBRATION** | `100 · (1 − Brier)` over all confidence-rated items (Brier = mean( (conf − correct)² )). Rewards knowing what you don't know. | E2/E9 confidence sliders |
| **COVERAGE** | fraction of the ~20 technique-cards at SM-2 `interval ≥ 21 days` (i.e., demonstrably retained), ×100. Breadth across all 8 layers. | `sm2.ts` card state |
| **DURABILITY** | retention on the 30-day held-out re-test vs. immediate post-test (decay penalty). | held-out MIST + SM-2 history |

**Bands (calibrated, no over-claiming):**
- **0–39 · Exposed (مكشوف):** vulnerable across multiple layers; high `fakeNewsAccept` or distrust drift.
- **40–64 · Aware (واعٍ):** reliable on L1–L3, calibrated emotion-spotting.
- **65–84 · Resilient (مُحصَّن):** holds through L4–L6, base-rate and omission audits automatic.
- **85–100 · Architect-Aware (مدرك للبنية):** systems-level (L7) + calibrated on the unknown (L8).

> **What CIS is NOT:** it is **not** a claim of immunity. It is a *measured construct* with the same
> honesty as a thesis instrument — reported with its sub-scores and the `realNewsBias` term visible,
> so a reviewer can see *how* the number was earned. This satisfies §11's four structural assurances
> (provenance, auditable methodology, reproducibility, fail-loud) for the score itself.

### 8.3 The vulnerability fingerprint (diagnostic output)

Beyond the single number, the user (and the system) gets a **per-layer / per-technique profile**,
driven directly by `scoreMIST().missedByType` plus bank logs:

```
{ layer: 6, technique: "conspiracy", realAcc: .9, fakeAcc: .55,
  calibration: .71, weakest: true, nextBooster: "<cardId>" }
```

This is what makes feedback *specific* (§12 ban on generic "think critically"): the trainer says
"your blind spot is **conspiratorial reasoning at Layer 6** — here is the booster," not "do better."

---

## 9. THE MASTERY PATH (the user's journey, gated and certifiable)

Five stages. Each stage gate is a **measured** threshold, not a click-through.

| Stage | Name (EN / AR) | Unlock gate (all measured) | What it certifies |
|---|---|---|---|
| **0** | **Baseline / خط الأساس** | Complete MIST-20 pre-test | Honest starting CIS; vulnerability fingerprint generated |
| **1** | **Spotter / كاشف** | L1–L3 modules done; DISCERNMENT ≥ 50; emotion-detector reflex logged | Catches fabrication, bias, decontextualization on level ≤3 items |
| **2** | **Auditor / مُدقِّق** | L4–L5 done; balanced acc ≥ 70 on level-4; CALIBRATION ≥ 60 | Omission/timing/application; reasons past "passes fact-check" |
| **3** | **Inoculated / مُلقَّح** | L6 done; survives 2 rabbit-hole runs; **no distrust drift** (`realNewsBias` in band) | Resists the Matrix without becoming a cynic — the hardest balance |
| **4** | **Architect-Aware / مدرك للبنية** | L7–L8 done; COVERAGE ≥ 0.8; passes the 30-day durability re-test; Brier ≤ 0.15 | Systems mapping + calibrated uncertainty; durable across a month |

**Certification (reuses real infra):** Stage 4 issues the existing **signed sovereign certificate**
(`POST /api/certificate/generate`, "weighted score, SHA-256/HMAC") — the weighted score *is* CIS, the
cert encodes the sub-scores, so the credential is auditable and tamper-evident. No fake badges.

**Teach-it-forward (IREX diffusion mechanic, 03 §2.4):** a Stage-3+ user unlocks a "send a prebunk"
action — share one technique-card (with its real source) to a contact. This is the validated
diffusion habit (L2D), not a vanity share, and it doubles as the user's own retrieval practice.

---

## 10. BUILD-READY DATA SHAPES (so an engineer can start today)

Minimal new types; everything else imports from existing files.

```ts
// src/lib/cognition/trainer/types.ts  (NEW — orchestration only)
import type { Card } from "@/lib/cognition/sm2";              // REUSE
import type { ManipulationTechnique } from "@/lib/standard/cognition"; // REUSE

export type Difficulty = 1 | 2 | 3 | 4 | 5;
export type ExerciseType =
  | "E1_spot" | "E2_realfake" | "E3_omission" | "E4_trace"
  | "E5_cuibono" | "E6_forge" | "E7_debate" | "E8_rabbithole" | "E9_calibrate";

export interface Exercise {
  id: string;
  layer: 1|2|3|4|5|6|7|8;        // the spine
  techniqueId: string;          // INOCULATION_TECHNIQUES[].id
  type: ExerciseType;
  difficulty: Difficulty;
  promptEn: string; promptAr: string;
  isReal: boolean;              // for E2 real/fake balance
  answerKey: unknown;           // type depends on ExerciseType
  sources: { title: string; url: string; tier: "S"|"A"|"B"|"C" }[]; // One-Law: never empty for real items
  synthetic: boolean;           // true ⇒ generated, never shown as a real event
}

export interface TechniqueCard extends Card {            // extends SM-2 Card
  techniqueId: string;
  layer: number;
  level: Difficulty;            // current adaptive level for this technique
  realAcc: number; fakeAcc: number; brier: number; // rolling stats
}

export interface CISResult {
  cis: number;                                  // 0–100, derived
  discernment: number; calibration: number; coverage: number; durability: number;
  realNewsBias: number;                         // surfaced from scoreMIST — distrust-drift guard
  band: "Exposed"|"Aware"|"Resilient"|"Architect-Aware";
  fingerprint: { layer: number; technique: string; weakest: boolean; nextBooster: string }[];
}
```

**Answer→`q` bridge (the only scheduling glue, deterministic):**
```ts
// src/lib/cognition/trainer/grade.ts (NEW)
import { sm2, type Card } from "@/lib/cognition/sm2"; // REUSE
export function toQ(correct: boolean, hintUsed: boolean, calibrated: boolean, hard: boolean): 0|1|2|3|4|5 {
  if (!correct) return 0;
  if (hintUsed) return 2;
  if (!calibrated) return 3;
  return hard ? 5 : 4;
}
export const review = (card: Card, ...args: Parameters<typeof toQ>) => sm2(card, toQ(...args));
```

---

## 11. THE METHODOLOGY CONTRACT (§11) — filled, so this ships as a real engine

| Line | Answer |
|---|---|
| **1 · Canonical source/dataset** | MIST-20 (`mist-items-2023.json`, published CC set); FLICC taxonomy (Cook/Lewandowsky); Bad News six-technique paradigm; Jigsaw 11-tactic set — all in `03_VERIFIED_SOURCES.md` Part 1–2. |
| **2 · Published methodology + citation** | SM-2 (SuperMemo, deterministic — in `sm2.ts`); MIST scoring (Maertens et al. 2023); inoculation theory (van der Linden & Roozenbeek 2017–2022, *Science Advances* 2022); Brier score for calibration (Brier 1950); balanced accuracy. **All implemented as deterministic code**, not LLM-reasoned. |
| **3 · What the LLM does** | Narrates feedback, dramatizes Egyptian-dialect items, plays the debate-bot adversary, and *narrates* grading where no key exists (E3/E5) — over **retrieved sources only**, abstaining when evidence is thin. It is the narrator (§11), never the source of the score. |
| **4 · Proof test** | (a) SM-2 unit tests: fixed `(card,q)` → fixed output. (b) CIS reproducibility: same logs → same CIS. (c) Pre/post run on the N=84 pilot (`/api/assessment/export`) showing DISCERNMENT↑ **with `realNewsBias` stable** (not distrust drift). (d) 30-day held-out re-test for durability. |

**Label honesty:** because lines 1 & 2 are filled with real datasets + real coded methods, this is a
**live data engine**, not a framework page. The CIS, the SM-2 schedule, and the MIST scoring are all
auditable, reproducible, and fail-loud (abstain/`UNVERIFIED` when an item lacks a source). If a layer
ever lacks sourced items, **that module** is labeled educational until the bank is filled — per §11.

---

## 12. PER-FEATURE COMPLIANCE (§7 + §16) — the trainer's checklist

- [x] **Real data only** — items from `data.ts`/kill-list/MIST; synthetics labeled synthetic.
- [x] **Runs the pipeline** — Retrieve (bank/Evidence Aggregator) → Ground+Cite → Diagnose (classifier → layer) → Output (CIS + defense).
- [x] **Sources visible + tier** on every real item; `UNVERIFIED`/`CONTESTED` used honestly.
- [x] **Confidence shown, derived** — CIS sub-scores + Brier calibration, never hardcoded.
- [x] **Layer + defense** — every exercise names its Layer 1–8 and the `COGNITION_BUILDER` technique.
- [x] **Islamic content graded** — any hadith used as a Layer-1/6 example carries collection+number+grade (§4); religious-exploitation items route through `/api/islamic/hadith` + `hadith-check`.
- [x] **Chatbot present** — a trainer coach using the §8 6-layer prompt, COGNITION_PROMPT_BLOCK injected.
- [x] **Quick-start explainer** — "how to use + real Egyptian scenario" on the page.
- [x] **Scientific name** — e.g. *"المناعة المعرفية / Cognitive Immunity Trainer"*, not "quiz."
- [x] **Bilingual + RTL**, **responsive 320px**, **fails loud**, **in navigation**, **`npm run build` passes**.
- [x] **Category/pillar (§16):** Category = **COGNITION BUILDER**; Pillar = primarily **Society Awareness**, with per-module pillar tags (e.g. L1 medical-imposter → Scientific; religious-exploitation items → Religious).
- [x] **4-line methodology contract** — filled in §11 above.
- [x] **Scientific Shield mounted** — wired to `cognition.ts` + `layers.ts` (the Shield *is* what each module teaches).
- [x] **Methodology source cited** in-page + in the coach prompt (MIST, SM-2, inoculation theory).
- [x] **Specific technique, never generic** — `COGNITION_BUILDER`/`INOCULATION_TECHNIQUES` per layer.

---

## 13. BUILD ORDER (smallest shippable path)

Following the Arsenal build order (§17.5: claim-index → forensics → prebunk clips + MIST baseline):

1. **MIST baseline + fingerprint** — wire `/api/mist` onboarding → store baseline, render the
   vulnerability fingerprint. (Mostly exists; this is the pre-test spine.)
2. **Exercise bank schema + L1–L3 content** — `Exercise[]` typed store; author ~10 sourced items per
   technique for the first three layers (Egyptian-dialect), each with `sources[]`.
3. **Session runner + SM-2 wiring** — the `grade.ts` bridge + daily loop (§7) over `sm2.ts`. Pure,
   unit-tested first (TDD).
4. **CIS aggregator** — the four sub-scores (§8.2), reusing `scoreMIST` math; expose `CISResult`.
5. **Forge + role-play** — mount existing `debate-sim` / `live-deception/generate` as E6/E7/E8.
6. **Adaptive curve + boosters** — promotion/demotion gates (§5) + due-card front-loading.
7. **Post-test + 30-day durability + certificate** — held-out MIST split, `certificate/generate`.
8. **Coach chatbot** — §8 prompt + `COGNITION_PROMPT_BLOCK`; abstains, cites, names layer+defense.

> Each step is independently shippable and independently verifiable. Steps 1, 3, 4 are pure/
> deterministic and should be **TDD'd before** the LLM-facing content (steps 2, 5, 8) lands.

---

## 14. PROVENANCE OF THIS DESIGN

- **Learning science + effect sizes:** `RESEARCH_VAULT/STRATEGY/03_VERIFIED_SOURCES.md`
  (inoculation: Roozenbeek & van der Linden 2019, *Science Advances* 2022, cross-cultural *d*=0.24–0.41;
  meta-analytic caveats Lu et al. 2023 + 2025 SDT critique; IREX L2D ~1.5-yr persistence; Bad News
  six techniques; SIFT CC BY 4.0; UNESCO/COR/First Draft).
- **Constitution + curriculum spine:** `RESEARCH_VAULT/STRATEGY/01_PHILOSOPHY_DIGEST.md`
  (§5 8-layer taxonomy, §6 pipeline, §7+§16 contract, §11 methodology, §12 cognition builder, §13
  Shield, §14 category×pillar).
- **Bound code (audited in-repo):** `src/lib/cognition/{sm2,mist,flicc,flicc-classifier,doctor-test}.ts`,
  `src/lib/cognition/mist-items-2023.json`, `src/lib/standard/cognition.ts`
  (`COGNITION_BUILDER`, `INOCULATION_TECHNIQUES`), `src/components/six-layers/{data,layer8Cases}.ts`.
- **Endpoints reused:** `/api/mist`, `/api/assessment(+export)`, `/api/debate-sim`,
  `/api/live-deception/generate`, `/api/whatsapp-analyzer`, `/api/ai/debunker`,
  `/api/search/evidence`, `/api/certificate/generate` (per `02_API_CAPABILITY_MAP.md`).
```
