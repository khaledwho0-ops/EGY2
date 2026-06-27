# COGNITION ENGINE v2 — the mechanic spec (supersedes the v1 brief for authoring)

The v1 exercises used ONE mechanic: **recognize** (MCQ / true-false / differentiation).
Research says recognition alone is the weakest cognition training. v2 makes every day a
**blend** of evidence-based mechanics that actually build transferable thinking.

Read alongside: the v1 brief (One-Law, name-free, tone, Egyptian grounding — ALL still apply)
and `src/data/cases/eltaybat-case-001.ts` (the anchor).

## The 8 mechanics (each = a researched method)
Add a `"mechanic"` field to every exercise item. Default `"recognize"` (back-compatible).

| mechanic | method (citation) | builds |
|---|---|---|
| `recognize` | active recall / retrieval practice (Dunlosky) | spot the move |
| `calibrate` | confidence-calibration w/ feedback (Kelly 2024) | accurate self-assessment |
| `self_explain` | self-explanation (Chi; Dunlosky) | deep encoding |
| `consider_opposite` | consider-the-opposite (Lord/Larrick) | kills confirmation bias + premature closure |
| `inoculate` | active inoculation / be-the-manipulator (van der Linden; SDT meta-analysis N=37k) | discrimination, not cynicism |
| `decompose` | argument mapping (Halpern; van Gelder) | argument structure + transfer |
| `retrieve` | spaced retrieval (re-test of an earlier concept) | durability |
| `transfer` | far-transfer to a NEW domain (Halpern) | generalization |

### JSON shapes per mechanic (all bilingual; every fact needs `sources`)

**recognize** (unchanged): `{ "id", "mechanic":"recognize", "claim","claimAr", options[]+correctAnswer | correctAnswer:bool(+myth_en/ar) | scenario+question+answer+key_differentiators, "explanation","explanationAr", "sources", "cognitivebiasAtPlay" }`

**calibrate** = a recognize item with `"calibrated": true`. The player asks the user to set a
confidence % BEFORE revealing, then shows calibration feedback (right+confident / wrong+confident →
"overconfidence", etc.). No extra content fields; just the flag. Use on ~1 item/day.

**self_explain**:
`{ "id","mechanic":"self_explain", "claim","claimAr", "options",​"correctAnswer", "selfExplain": {"prompt":"In your own words, why is this the manipulation?","promptAr":"بكلماتك، ليه دي الحركة المضلِّلة؟"}, "explanation","explanationAr" (=the model answer revealed AFTER they type), "sources" }`

**consider_opposite**:
`{ "id","mechanic":"consider_opposite", "claim","claimAr" (a claim the learner is inclined to accept), "prompt":"What would DISPROVE this? What else could explain it?","promptAr":"إيه اللي يكذّب ده؟ وإيه تفسير تاني ممكن؟", "modelPoints":["disconfirming point 1", ...], "modelPointsAr":[...], "sources" }`
(Player: free-text box → reveal modelPoints to self-compare.)

**inoculate** (generative — be the manipulator in a weakened dose):
`{ "id","mechanic":"inoculate", "technique":"emotional manipulation","techniqueAr":"التلاعب العاطفي", "task":"Write a short post that uses THIS technique to push a (harmless) claim like 'drink more water'.","taskAr":"اكتب بوست قصير يستخدم الحركة دي لترويج ادعاء غير ضار زي 'اشرب مية أكتر'.", "tells":["the giveaways that expose this technique", ...],"tellsAr":[...], "sources" }`
(Player: free-text box → reveal `tells`. Builds discrimination by making the move from the inside.)

**decompose** (argument map):
`{ "id","mechanic":"decompose", "claim","claimAr", "parts":[ {"text","textAr","role":"conclusion|premise|assumption|irrelevant"} ... ], "explanation","explanationAr", "sources" }`
(Player: user labels each part by role; graded against `role`. Teaches structure: hidden assumptions + what's missing.)

**retrieve** = a recognize item tagged `"retrievalOf": <earlierDay>` — a spaced re-test of a prior
concept, re-grounded in a fresh scenario. Put 1 on most days from week 6 onward.

**transfer** = a recognize/self_explain item tagged `"transferDomain":"<new domain>"` — same skill,
deliberately different context (e.g. a logic taught via health, re-applied to a political claim).

## DAY COMPOSITION RULE (the upgrade)
Each day = **4–7 items that BLEND mechanics** — not 5 recognize. A good standard day:
1× recognize (intro the concept) · 1× `self_explain` · 1× `consider_opposite` OR `decompose` ·
1× `calibrate` · 1× `retrieve` (re-test an earlier day) · and from week 7+, 1× `inoculate` or `transfer`.
Checkpoint days (every 7th): heavy `interleave` (mixed concepts) + `calibrate` + `inoculate`.
Set day-level `"interleaved": true` on checkpoint days.

## MECHANIC → SOURCE/PHASE EMPHASIS
- **Psychology of Belief (Phase 1)**: lean on `consider_opposite` (vs cognitive closure),
  `calibrate` (vs overconfidence/Dunning), `self_explain` (vs motivated reasoning), `inoculate`.
- **Evidence Pyramid (Phase 2)**: `decompose` (claim → evidence rung), `recognize`+`retrieve`
  for the ladder, `transfer` (apply appraisal to a new health claim).
- **altaybat / Phase 3-4**: `inoculate` (build a religiously-shielded claim, then spot it),
  `decompose` (the case's layers), `consider_opposite`, capstone = full multi-mechanic.

## MODEL TIERING (for the authoring crank)
- **OPUS**: Phase-1 psychology-of-belief CORE (wk8, days 51–56), Phase-3 religious-shield
  (99–140, sensitivity), Phase-4 capstone (162–168), and any `inoculate`/`decompose` design.
- **SONNET**: standard fallacy/science days with the mechanic blend (bulk).
- **HAIKU**: validation scripts, manifest regen, dedupe, formatting — no authoring.

## HARD RULES (unchanged from v1)
One-Law (every fact → real `sources` url or `EAL-case-001:<id>`), NAME-FREE, empathy-first tone,
application-not-recall, full bilingual (`*Ar` twin on every user-facing string), Egyptian-grounded.
Write one file per day to `src/data/exercises/cognition/dayNN_<slug>.json`.
