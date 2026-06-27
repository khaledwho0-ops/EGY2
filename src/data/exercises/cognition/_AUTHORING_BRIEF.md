# COGNITION AUTHORING BRIEF — EAL curriculum days 15–168

You are authoring **playable daily exercises** for the "cognition-building" half of the
Egyptian Awareness Library. Project root (NESTED):
`C:\Users\pc\Desktop\EGY\New folder (20)\egyptian-awareness-library`

You will be told a **day range** to author. Produce one JSON file per day.

---

## 0. THE ONE LAW (non-negotiable)
- **No claim reaches the user without a real, resolvable source.** Every exercise item that
  asserts a fact MUST carry a `sources: [url]` array with ≥1 real public URL (peer-reviewed,
  WHO/CDC/NIH/Cochrane, a major institution, or — for the case anchor — a citation id from the
  El-Tayyibat bibliography). Never fabricate a URL. If you cannot source a specific number,
  do not state the number — teach the *reasoning* instead.
- Prefer primary/strong sources (meta-analysis, RCT, Cochrane, WHO). arXiv = preprint, label it.
- If unsure a fact is real, drop it. Better a smaller true exercise than a fabricated one.

## 1. NAME-FREE rule (legal)
- NEVER print a private individual's personal name in learner-facing text.
- Refer to the case as **«نظام الطيبات» / "the viral Taybat diet system"** and to its originator
  only by role: **"a board-certified anaesthesiologist."** (The system name is public & banned.)
- No brand/deceiver personal names anywhere in display strings.

## 2. TONE (from the PRD — enforce strictly)
- **Empathy first, evidence second.** Never condescending. Never "only ignorant people believe…",
  "conspiracy theorists", "obviously wrong." Shame entrenches false belief (backfire effect).
- Voice: "here is how we *know*," not "here is why *you* are wrong." Start from shared values
  (health, family, truth). Egyptian-Arabic dialect aware in `*Ar` fields; natural, warm.
- **Application, not recall.** Quizzes must test *spotting the move in a scenario*, not
  reciting a definition. BAD: "Define falsifiability." GOOD: "A seller says the remedy only
  fails if you didn't believe enough. Which red flag is this?"

## 3. THE EXACT PLAYABLE JSON SHAPE (match precisely — this renders in the existing player)
One file per day at `src/data/exercises/cognition/<id>.json`. Shape:

```json
{
  "id": "day31_formal_fallacies",
  "phase": 1,
  "week": 5,
  "day": 31,
  "title": "Affirming the Consequent",
  "titleAr": "إثبات التالي",
  "description": "One sentence, plain language, why this matters in Egyptian daily life.",
  "descriptionAr": "جملة واحدة بالعامية المصرية عن أهمية الموضوع.",
  "type": "logic",                
  "difficulty": 3,                 
  "estimatedMinutes": 12,
  "source": "https://plato.stanford.edu/entries/fallacies/",
  "exercises": [
    {
      "id": 1,
      "claim": "Scenario or claim the learner judges (Egyptian-grounded).",
      "claimAr": "السيناريو أو الادعاء بالعامية.",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctAnswer": 1,
      "explanation": "Why the right answer is right — teach the move, empathetic.",
      "explanationAr": "الشرح بالعامية.",
      "sources": ["https://real-url"],
      "cognitivebiasAtPlay": "Confirmation Bias"
    }
  ]
}
```

### Item variants the player supports (use the right one per exercise):
- **Multiple choice:** `options: string[]` + `correctAnswer: <index number>`.
- **True/False myth-bust:** `claim` + `correctAnswer: true|false` (+ optional `myth_en`/`myth_ar`).
- **Differentiation (A-vs-B, e.g. grief vs depression):** `scenario` + `question` + `answer: "<code>"`
  (no `options`; the player derives choices from the distinct `answer` codes in the set) +
  `key_differentiators: string[]`.
- Always bilingual: every user-facing string needs its `*Ar` twin. Every factual item needs `sources`.
- `type` ∈ logic | science | bias | psychology | religion-literacy | integration | reflection.
- `difficulty` 1–5; `estimatedMinutes` 8–18; 3–6 exercises per day (a "checkpoint" day may have more).

## 4. THE EL-TAYYIBAT ANCHOR (import, don't retype)
Canonical sourced data lives in `src/data/cases/eltaybat-case-001.ts`:
`EVIDENCE_HIERARCHY`, `RED_FLAGS` (12), `BIAS_CARDS` (16), `RELIGIOUS_SHIELD` (+2 refuting
Quran verses 5:87, 16:116), `CONSPIRACY_PAIRS`, `TIMELINE`, `STRUCTURAL_FACTORS`, `BIBLIOGRAPHY`.
Use the case as the recurring worked example. For case facts, cite a `BIBLIOGRAPHY` id in `sources`
(e.g. `"EAL-case-001:ems-2026-03"`) OR the real outlet URL if you have it. Pedagogy for biases
(INT-03): define → show in Taybat → show a 2nd unrelated transfer example → practice scenario.

---

## 5. THE TWO BRAINS METHODOLOGIES — distilled micro-concepts (don't skip any)

### SPINE A · THE EVIDENCE PYRAMID  (Dr. Ismail story → Science phase, days ~57–98)
Teach how strong a medical proof is, bottom→top, as story-driven scenarios:
1. **Case report** — one patient written up (vitamin-D + a factory worker's red eye/skin). Weakest;
   generates a hypothesis only.
2. **Case series** — several similar patients; hints at a new disease; still weak. If "X patients
   improved on supplement Y," that is *very weak* evidence — yet most YouTube sellers stop here.
3. **Cross-sectional / survey** — a "snapshot" of prevalence (questionnaire to factory workers).
   Observational, weak; biased by people lying for sick leave, sympathy, shame, or not noticing.
4. **Case-control** — split sick vs healthy, look *back* for exposures. Fast/cheap BUT **recall bias**
   (people misremember or invent exposures, worse when they expect compensation), and selection bias.
5. **Cohort** — follow a *healthy* exposed group *forward* for years (3-yr factory follow-up; 64%
   developed symptoms). Stronger, but slow, costly, and still has **selection bias** (who refuses).
6. **Systematic review / meta-analysis** — a team pools & statistically combines all studies; peers
   worldwide critique it. **Strongest.**
7. **RCT (randomized controlled trial)** — randomly assign to drug vs **placebo** (identical sugar
   pill). **Double-blind** = neither patient nor doctor knows who got what → kills placebo effect and
   experimenter bias. Randomization kills **selection bias**. Big sample + matched groups (age, sex,
   habits) kills **confounders**. (In the story, vitamin-D ultimately did NOT cure the disease — and
   that honest null result is trustworthy *because* of the method.)
Cross-cutting rules (the 5 takeaways — make exercises for each):
- **Strength of evidence varies** even within one study type (5 people vs 500 people).
- **Confounders** = lurking third variables (coffee↔cancer is really smoking↔cancer). Control them.
- **Biases** (selection, recall, information) — minimise, never fully eliminate.
- **Don't over-generalize** — a result on 50-yr-old male smokers may not apply to everyone.
- **Correlation ≠ causation** — ambulances at crashes don't cause crashes; new shirt didn't cause the
  promotion. Two things together ≠ one caused the other.
The contrast: the honest **Dr. Ismail** (knows one happy patient proves nothing) vs the **quack**
("Dr. K", fictional) — tiny sample, no control group, placebo-driven, no oversight, 3M views, and
ultimately adulterating "herbs" with hidden pharmaceuticals (a real fraud pattern). Quack is NAME-FREE
/ fictional. Anchor real claims (chicken is a complete protein; legumes & leafy veg are longevity foods;
T1 diabetes needs insulin) to WHO / AHA / Harvard SPH / Cochrane URLs.

### SPINE B · THE PSYCHOLOGY OF BELIEF  (Abu-Abed essay → Cognition phase, days ~15–56; capstone 141–168)
WHY people believe pseudoscience/conspiracy, and the inner training to resist. Micro-concepts:
- **Belief ≠ stupidity.** Smart people build the most elaborate illusions (Newton & alchemy; Kepler &
  astrology; Conan Doyle & fairies). Intelligence can *defend* a delusion better. Everyone has zones of
  fragility through which ideas enter.
- **Need for cognitive closure** (Kruglanski) — craving a quick, certain answer to escape the discomfort
  of ambiguity/the unknown. People often prefer a *bad* explanation to "I don't know."
- **Conspiracy comforts**: gives an ordered world, a hidden agent connecting all events, a reason for
  evil, and relief from randomness — even when the story is dark.
- **Motivated reasoning** — we don't ask "what's true?" but (often unconsciously) "which idea can I live
  with / that protects me / comforts me / gives meaning / justifies my anger?" — then we hunt evidence
  for it. (= the "first believe, then look for proofs.")
- **Confirmation bias** — the mind auto-magnifies info that fits and instantly doubts/ridicules info that
  doesn't, turning from *testing* an idea to *defending* it.
- **Belief as ego-defense / cognitive narcissism** — "the masses are asleep, I'm awake," "I'm one of the
  few who know the secret," "I understand more than the scientists." The myth becomes identity & status,
  a symbolic superiority for someone who feels ordinary.
- **Argument-as-war** — once a view is gripped "with the teeth," it becomes dignity; disagreement feels
  like an attack on the self, not the data. That's why people get *angry*, not curious.
- **Nietzsche (slave morality)** — reinterpreting one's incapacity as a virtue ("I'm humble/peaceful")
  to live with it. Applied: turning "I can't tolerate not-knowing" into "I have the special knowledge."
- **Freud** — many beliefs are wish-fulfilment, not reasoning: a need for a father, protection, order.
- **Hannah Arendt** — when a person loses trust in their own ability to know truth, they don't become a
  skeptic — they become someone who'll believe *anything*; once the wall between true/false collapses,
  the most emotionally convincing narrative wins, and the person is ripe for propaganda and manipulation.
  The danger isn't one wrong belief — it's *training yourself daily to betray reality.*
THE CURE (build exercises that *practice* these, not just name them):
- **Intellectual humility** — "I might be wrong." Maturity = not needing an answer for everything; being
  able to live, temporarily or permanently, with no answer, without rushing to build an illusion.
- **Tolerate "لا أدري / I don't know"** and be patient with the unknown.
- **Separate comfort from evidence** — ask "is this true, or does it just relieve me?"
- **Ask about the SOURCE, not the beauty of the story.**
- **Watch your own desires** — notice which conclusion you *want*, then distrust that pull.
- Thesis sentence to weave through the phase: *the fight against superstition is not a battle of
  information — it is psychological and moral self-training.*
Use El-Tayyibat as the live example for every concept (it embodies all of them).

---

## 6. DAY → MODULE MAP (24 weeks · 168 days)
- **Phase 0 (1–14): Calibration** — ALREADY AUTHORED (individual files exist). Do not touch.
- **Phase 1 (15–56): COGNITION** — Spine B (Psychology of Belief) + logic.
  - Wk3–4 (15–28): finish calibration→cognition bridge (reaction/impulse, base rate, illusory truth).
  - Wk5 (29–35): formal fallacies (affirming consequent, denying antecedent, undistributed middle…).
  - Wk6 (36–42): informal fallacies — relevance & presumption (ad hominem, straw man, false dichotomy,
    appeal to authority/nature/emotion, begging the question, slippery slope).
  - Wk7 (43–49): informal fallacies — ambiguity + Gish gallop, moving goalposts, cherry-pick, special
    pleading, Texas sharpshooter, Galileo gambit; + intro to the 16 biases.
  - Wk8 (50–56): the 16 cognitive biases (El-Tayyibat-anchored) + Psychology of Belief core (cognitive
    closure, motivated reasoning, ego-defense, intellectual humility, "I don't know" training,
    productive conversation / Socratic defense).
- **Phase 2 (57–98): SCIENCE LITERACY** — Spine A (Evidence Pyramid) + Foundation F1–F4 + AP1/AP10.
  - What is science & falsifiability; scientific method (controls, blinding, pre-registration,
    replication); the **evidence hierarchy** (Dr. Ismail, days ~63–70); study designs (case report→RCT);
    statistics (mean/SD, p-value, confidence interval, sample size, base rate); confounders & biases;
    correlation≠causation; reading research & predatory journals; the **12 red flags** (El-Tayyibat);
    detox/"toxin" claims; the **SIFT** fact-check toolkit (Stop, Investigate source, Find better
    coverage, Trace to origin).
- **Phase 3 (99–140): ISLAMIC / RELIGIOUS-SHIELD LITERACY** — the El-Tayyibat religious layer (INT-04).
  Framing: *defending* Islam from those who weaponise it. The vocabulary exploit («الطيبات»/«الخبائث»);
  the two refuting verses (5:87, 16:116); the Prophet's-diet hadith fabrication (chicken & milk are in
  authenticated hadith); separating cultural practice from a medical efficacy claim (same evidence bar);
  recognising religious framing used to make a claim unfalsifiable. Keep strictly within the One-Law
  Islamic Authenticity rules (only real, attributable hadith/verses; cite source/grade).
- **Phase 4 (141–168): INTEGRATION / CAPSTONE** — the full 14-layer El-Tayyibat case as a live
  stress test; combine logical + scientific + religious defense; productive-conversation practice
  (motivational-interviewing style); the capstone (pick a pseudoscience claim, write an evidence-based,
  empathetic rebuttal that names the fallacy, cites strong evidence, and explains *why the belief
  persists*); graduation / inoculation passport.

## 7. OUTPUT CONTRACT (per assigned day)
- Write `src/data/exercises/cognition/<dayNN>_<slug>.json` (NN zero-padded for <100? use plain dayN to
  match existing — e.g. `day31_formal_fallacies.json`).
- Valid JSON, parses, matches §3 shape, every factual item has real `sources`, fully bilingual,
  empathetic, application-not-recall, Egyptian-grounded scenarios.
- Return (as your structured result) the list of files you wrote with day numbers + titles.
```
```
