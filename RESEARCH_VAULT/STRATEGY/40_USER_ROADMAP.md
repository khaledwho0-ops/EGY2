# 40 — THE COMPLETE USER ROADMAP (THE JOURNEY + THE BUILD)

> **What this is.** The single end-to-end map of the EAL user's journey — from the first 8 seconds of
> first touch to durable, certified, teach-it-forward **cognitive immunity** — integrated with the
> parallel **BUILD roadmap** (what we ship, in what order). It fuses *every* feature: what exists in
> the repo today, every new capability across the four strategy layers
> (`10_STRATEGY_{cognition-science, product-injection, tools-wiring, standard-content}.md`), every
> business/monetization touchpoint (`20_BUSINESS_*`), and the twelve trajectory gaps
> (`30_TWELVE_GAPS.md`). **Nothing is skipped.**
>
> **Read order (binding):** `01_PHILOSOPHY_DIGEST.md` → the four `10_STRATEGY_*.md` → the three
> `20_BUSINESS_*.md` → `30_TWELVE_GAPS.md` → **this file**. This document is the *integration lens*:
> it sequences the journey and the build so an engineer, a funder, and a user can each read their own
> column.
>
> **The One Law still governs every screen (§0).** A roadmap is not exempt. Every touchpoint below is
> admitted only if it (a) runs on **real data / real method**, and (b) builds a **named, measured
> cognitive defense** mapped to one of the 8 deception layers. Engagement that moves no defense metric
> is vanity and is not on this map.
>
> **Bilingual-aware throughout (EN / AR Egyptian-dialect).** Every user-facing surface ships EN +
> Egyptian-aware Arabic with correct RTL, one language shown at a time (the EN⇄ع toggle), MSA reserved
> for `verse`/`hadith`/ruling atoms. Stage names, meters, and notifications carry their canonical
> Arabic from `glossary-ar.ts` (§3 of the content strategy).

---

## 0. THE WHOLE THING ON ONE PAGE

**The user's spine (one line):** *Notice the pull → name the technique → run the real tool → log the
verdict → teach one person → return tomorrow.*

**The journey has 8 phases (user-facing levels) running on a 4-phase build (what we ship):**

```
 USER JOURNEY (levels)                                   BUILD (milestones)
 ─────────────────────────────────────────────────────  ───────────────────────────────
 L0  FIRST TOUCH        (the descent / the hook)         B0  PHASE-1 SECURITY/RAG/GUARDRAIL  ◀ in flight
 L1  BASELINE           (MIST pre-test, fingerprint)      B1  MEASUREMENT SUBSTRATE + IDENTITY
 L2  THE COMMITMENT     (onboarding → habit contract)     B2  THE DAILY LOOP + EFFICACY ENGINE
 L3  THE DAILY REP      (notice→name→run→reconcile→teach) B3  MICRO-INTERACTIONS + CONTENT GATE
 L4  THE TRAINED EYE    (8-layer modules, adaptive curve) B4  TRAINING SURFACES WIRED LIVE
 L5  IN THE WILD        (extension, point-of-exposure)    B5  EXTENSION + VIRAL LOOP + NOTIFS
 L6  THE PROOF          (30-day re-test, CIS, passport)   B6  DURABILITY + CERTIFICATE
 L7  THE TEACHER        (teach-forward, cohorts, family)  B7  INSTITUTIONAL LAYER
 L8  MASTERY / ARCHITECT (systems+calibration, certified) B8  API PRODUCT + GOVERNANCE SPINE
```

The journey is a **funnel that becomes a flywheel**: L0→L2 is acquisition (emotion → measured baseline
→ habit), L3→L6 is the retention/efficacy core (the daily loop + the proof number), L7→L8 is the
growth + revenue compounding loop (teach-forward → institutions → API). The build ships the nervous
system (B1–B3) *before* the growth surfaces (B5+), because — per the twelve gaps — an extension or a
school dashboard with no ledger, no identity, and no enforced pipeline is dead on arrival.

---

# PART I — THE USER JOURNEY (8 LEVELS)

Each level below specifies, exactly as the task demands:
**(a) the user's state**, **(b) what they do**, **(c) which tools/features power it**,
**(d) which cognitive defense it builds**, **(e) the business/monetization touchpoint.**

---

## LEVEL 0 — FIRST TOUCH: THE DESCENT / THE HOOK
### المستوى صفر — اللمسة الأولى: الهبوط

**(a) User state.** A stranger, arriving cold — most often from a shared WhatsApp/Facebook link
(a teach-forward from an existing user, or organic). Skeptical, distracted, no account, possibly on a
$80 Android at 320px on a metered connection. Emotionally neutral or already agitated by whatever they
were just reading. **They owe us nothing and will leave in 8 seconds if nothing lands.**

**(b) What they do.**
- Land on **`/the-descent`** — the second-person scrollytelling FALL through all 8 deception layers
  that kills an Egyptian character, then the CLIMB out to the Library (16 sections M0–M16). Built;
  emotion-first by design.
- At the end of **each FALL layer (M1–M8)** they make a **1-tap micro-choice** ("what would you have
  done?") *before* the layer kills the character — turning passive scroll into 8 logged decisions.
- On the **CLIMB (M9–M13)** they actually *run* a real tool on a sample (e.g. M13 filmstrip → live
  `/api/forensic/image` or `/api/search/evidence`) — proving the arsenal is real, not narrated.
- At the **Library door (M16)** they see **"Your descent, scored"** — which layers *they* fell for →
  their 3 weakest meters → "train these first" — and a CTA that hands off to `/onboarding`.
- Alternative cold entries that also land here: the **gateway `/the-descent` GOD page**, a
  prebunk-of-the-week clip, or a direct link to a verified claim from a teach-forward share.

**(c) Tools / features.** `/the-descent` (built; `descent-data.ts` single source of truth, the One-Law
`<Sourced>`/`FailLoud`/`LayerTag`/`DefenseChip` primitives); the **descent injections** (micro-choices,
climb tool-trials, exit ramp — `10_STRATEGY_product-injection §3`); `/api/kill-list` + `descent-data`
real Egyptian cases; the matched **shieldTools** per layer. Pure-CSS motion, native scroll, shared
`useReveal()` IntersectionObserver — no fragile machinery (the hard-won design constraint).

**(d) Cognitive defense built.** The **emotion-first anchor** ("this could kill someone I know") +
first exposure to **technique-per-layer** (`COGNITION_BUILDER`). The 8 micro-choices seed the 8
immunity meters *during the story*. First proof that **everything real shows its source** (One-Law felt,
not explained). Layers 1–8, one micro-decision each.

**(e) Business / monetization touchpoint.** **Top-of-funnel, CAC ≈ $0.** This is the emotional on-ramp
the GTM plan relies on; the descent is the shareable artifact that rides the same WhatsApp rails the
lie used. No paywall, ever — the descent is a pure public good. Its only "conversion" ask is the
handoff to onboarding while affect is high. Instrumented (Gap 8) so we can count *descent → baseline*
conversion as the first funnel step.

---

## LEVEL 1 — BASELINE: THE HONEST STARTING NUMBER
### المستوى الأول — خط الأساس: الرقم الصادق

**(a) User state.** Curious, slightly rattled by the descent, willing to spend 90 more seconds.
Still anonymous (no login wall before value). Wants to know "how bad am I, actually?"

**(b) What they do.**
- Take the **MIST-20** baseline (8–10 items in the onboarding flow): swipe real/fake on real Egyptian
  items *before* any teaching.
- Receive a **measured susceptibility score** + a **vulnerability fingerprint** — per-layer /
  per-technique profile showing exactly where they're weak (e.g. "blind spot: conspiratorial reasoning
  at Layer 6").
- See the result framed honestly: accuracy on **real AND fake items separately**, with the
  `realNewsBias` (distrust-drift) term visible — never a single flattering number.

**(c) Tools / features.** `POST /api/mist` (real, `mist-items-2023.json`, CC-licensed MIST-20,
FLICC-typed distractors); `scoreMIST()` → `{veracityDiscernment, realNewsBias, fakeNewsAccept,
missedByType}`; persisted to KV (the baseline = the pre-score for the efficacy engine). The
**vulnerability fingerprint** output (`10_STRATEGY_cognition-science §8.3`). Fail-loud: if MIST/KV is
down, score shows **UNVERIFIED**, never faked.

**(d) Cognitive defense built.** *Metacognition* — the user now has a true reading of their own
fallibility, and a named first blind spot (never generic "be skeptical"). This is the **measured
construct** the whole product is honest about; the fingerprint becomes their personalized curriculum.

**(e) Business / monetization touchpoint.** **The pre-score is the fundable number's left endpoint.**
Every grant tier (OTF, Mozilla, Luminate, OSF, GNI, EMIF) and every school sale needs a measured
pre→post delta; this is the "pre." It is also the Phase-0 GTM milestone ("MIST-20 baseline captured").
Still no paywall — measurement is free and is itself the credibility asset.

---

## LEVEL 2 — THE COMMITMENT: ONBOARDING → HABIT CONTRACT
### المستوى الثاني — الالتزام: عقد العادة

**(a) User state.** Has felt the gap (descent) and seen the number (MIST). Now deciding whether EAL is
a one-time curiosity or a daily habit. This is the make-or-break retention moment.

**(b) What they do.** The five onboarding beats (`/onboarding`, `10_STRATEGY_product-injection §2`):
1. **The Hook** — 3 real Egyptian items (1 fabricated, 1 decontextualized, **1 genuinely true**); swipe
   real/fake before any teaching. The *true* item is load-bearing (anti-blanket-distrust).
2. **Reveal + Name** — for each miss, the **exact technique** they lacked (from `cognition.ts`).
3. **MIST Baseline** — (the Level-1 instrument, if not already taken here).
4. **Emotion-as-Detector drill** — replay the item that fooled them; teach the **PAUSE reflex**
   ("notice the pull → that pull is the signal"), with the live COVO emotional-intent score.
5. **The One Commitment** — pick a daily slot + channel (push / WhatsApp). "One rep a day. 90 seconds."
   Seeds the first SM-2 card. **This is where identity is requested** — only to save the streak.

**(c) Tools / features.** `/onboarding`, `/welcome` (exist); `COGNITION_BUILDER`; `POST /api/mist`;
`covo-router.ts` emotional-intent; notification opt-in; the **first SM-2 card seeded**
(`src/lib/cognition/sm2.ts`); the **Defense Ledger** (new — `ledger.ts`) begins recording
`DefenseEvent`s with `confidenceBefore`; **Identity / account** (new — passwordless OTP/OAuth, Gap 3).
Anonymous through beats 1–4 (localStorage mirror); account only at beat 5.

**(d) Cognitive defense built.** The **PAUSE / emotion-as-detector reflex** (the universal trigger that
precedes every other move) + the conversion of a session into a **habit contract**. First entry in the
Defense Ledger — the user's immunity is now *being recorded*, not asserted.

**(e) Business / monetization touchpoint.** **Activation + identity capture** — the durable account is
the precondition for *every* downstream revenue lane (B2C Pro, certificates, school seats, the 30-day
re-test). This is the funnel's activation gate. Still free; the "product" being sold here is the
*commitment*, paid in attention, not money.

---

## LEVEL 3 — THE DAILY REP: THE HABIT ENGINE
### المستوى الثالث — تمرين اليوم: محرك العادة

**(a) User state.** A returning user (day 2+). Triggered by a daily push at their chosen slot. The
product's center of gravity lives here — this is where retention and real behavior change are made or
lost. Over ~21 days the *external* trigger should become an *internal* one ("I feel outrage → I pause
and verify").

**(b) What they do.** The **`/daily`** rep — a 90-second spaced-repetition loop, 5 micro-steps, one
screen each (`10_STRATEGY_product-injection §4`):
1. **NOTICE** — a real item drops (WhatsApp-style card / headline / image). "Gut call: real / fake /
   not sure?" + a **confidence slider** *before* analysis. **Abstain is first-class.**
2. **NAME** — "Which technique exposes this?" — 4 technique chips.
3. **RUN** — one tap fires the layer's **real tool** on the item; the user reads live evidence.
4. **VERDICT + RECONCILE** — final verdict + confidence-after; app shows the One-Law verdict object
   `{verdict, confidence∈{HIGH,MEDIUM,CONTESTED,UNVERIFIED}, layer, defense, sources[]}`.
5. **TEACH-IT-FORWARD** — send the pre-composed AR/EN 1-line rebuttal to one person (WhatsApp).

Before the new item, the session **front-loads due SM-2 boosters** (hardest-first), so weak techniques
resurface; the warm-up is a SIFT "STOP" emotion micro-item. Streaks are **quality-gated** (all 5 steps
completed, not opens).

**(c) Tools / features.** `/daily` (new); the promoted **`/api/srs` → ledger + SM-2 scheduler**;
the **shared verification pipeline** `runVerificationPipeline()` (`/api/pipeline/verify`, new) behind
the RUN step; item banks `kill-list`, `descent-data`, `live-deception/generate` (escalating feed),
reverse-image samples; per-layer `shieldTools` → `/api/search/evidence`, `/api/forensic/image`,
`/api/islamic/hadith`, `/api/search/factcheck`, `/api/whatsapp-analyzer`; `output-enforcer.ts`,
`/api/god-system` for hard items; `<ScientificShield>` + `<EvidenceChips>` + `<DefenseCard>` (new
shared primitives). The **8 Immunity Meters** (derived from the ledger, decay on SM-2 schedule).

**(d) Cognitive defense built.** The full behavioral spine in one loop: **emotion-as-detector → technique
recall (the generalizing skill) → first-hand provenance → calibration (true items too) → teach-forward
(the persistence + diffusion driver).** Spaced boosters defeat one-shot decay. Honest-abstain earns
meter credit (calibrated skepticism, not blanket distrust). Layers rotate 1–8.

**(e) Business / monetization touchpoint.** **Retention + the North-Star metric ("Verified Defenses
Delivered").** This loop produces the engagement that is *also* the mission — every completed rep is a
logged defensive act, the unit the funder report and the efficacy engine read. The teach-forward step
is the **zero-CAC growth engine** (K-factor). The free B2C tier lives entirely here; **Pro** (later)
adds advanced reps/analytics but never gates the core loop (the population this serves can never pay).

---

## LEVEL 4 — THE TRAINED EYE: THE 8-LAYER CURRICULUM
### المستوى الرابع — العين المُدرَّبة: منهج الطبقات الثماني

**(a) User state.** A committed daily user building real breadth. Moving beyond reflex into *structured
mastery* of each deception layer. Wants to "level up" and feel competence accrue.

**(b) What they do.** Work through the **8 modules** (one per layer, taught in order), each following
the fixed **6-beat shape** (`10_STRATEGY_cognition-science §3`):
- **BEAT 0 ACTIVATE** (SIFT STOP + confidence baseline) → **BEAT 1 FOREWARN** (named technique +
  defanged dose) → **BEAT 2 DECONSTRUCT** (walk the `COGNITION_BUILDER` steps on a real Egyptian case)
  → **BEAT 3 FORGE** (Build-a-Lie: construct the manipulation, classifier grades it) → **BEAT 4 SPOT**
  (graded retrieval = the SM-2 review) → **BEAT 5 DEFEND** (one live item through the real pipeline).
- Progress through the **9 exercise types** (E1 Spot-the-Technique … E9 Calibration) at an **adaptive
  difficulty curve** (levels 1 Obvious → 5 Architect): promote at ≥80% over ≥8 items *with* calibrated
  confidence; demote/remediate on the weakest `missedByType` FLICC category.
- Module specials: **Layer 6** = the inoculation core (don't lead with the counter-fact; rabbit-hole
  game); **Layer 8** = calibration-only (Brier-scored probability bands, never a binary verdict).

**(c) Tools / features.** The **trainer** orchestration layer (`src/lib/cognition/trainer/*`, new) over
existing engines: `sm2.ts`, `mist.ts`, `flicc.ts`, `flicc-classifier.ts`, `doctor-test.ts`,
`COGNITION_BUILDER` + `INOCULATION_TECHNIQUES`; the **exercise bank** (`Exercise[]` typed store) filled
with sourced Egyptian-dialect items; `/api/debate-sim`, `/api/live-deception/generate` mounted as
E6/E7/E8; the **content modules** hydrated into the **144-day curriculum** (`src/data/curriculum/`),
every claim a **ContentAtom** that passed the One-Law gate. The **Scientific Shield** mounted on every
module page (live "try-it" classifier). The **trainer coach chatbot** (§8 6-layer prompt, pipeline-backed).

**(d) Cognitive defense built.** **Durable, technique-based immunity across all 8 layers** — the
generalizing skill (recognize the *tactic*, not the hoax). The forge (active role-play) gives the
strongest persistence/transfer. Calibration drills (Layer 8) train the meta-skill the whole product
depends on. The user moves Spotter → Auditor → Inoculated along measured gates.

**(e) Business / monetization touchpoint.** **The depth that justifies institutional value + Pro.** The
structured curriculum is the asset a school assigns and a teacher tracks (the institutional layer reads
this progress). Advanced modules, the full tool arsenal in-loop, and the paper-auditor are the
**Auditor/Debater tier unlocks** — earned by logged acts, never sold as shortcuts. This is where the
**curriculum content** (license-respecting, sourced) becomes a defensible, hard-to-copy moat.

---

## LEVEL 5 — IN THE WILD: DEFENSE AT THE POINT OF EXPOSURE
### المستوى الخامس — في البرّية: الدفاع عند نقطة التعرّض

**(a) User state.** A trained user living their normal online life — scrolling Facebook/X/YouTube,
reading WhatsApp. The reflex now needs to **fire in-context**, the moment a manipulated claim appears,
not only inside `/daily`. This is the highest-leverage behavior-change surface.

**(b) What they do.**
- Install and use the **MV3 browser extension** (`10_STRATEGY_product-injection §7`): in-feed **claim
  sensor** (subtle underline of check-worthy claims), **image/video badge** (EXIF/C2PA/AI score *with*
  the false-positive caveat shown), **decontext catcher** ("see full context"), **emotion meter**,
  **hadith guard** (red warning on ungraded religious posts), **"add to today's rep,"** and
  **right-click → Verify with EAL**.
- Use the in-app **micro-interactions** anywhere (`§5`): Pause Gate, Lateral-Read button, "What's
  hidden?" toggle, Restore-Context, Cui-Bono chip, Is/Ought split, Bubble-Exit, Grade-the-Hadith,
  Calibrate-Me, and the celebrated **Honest-Abstain** (earns credit).
- Receive **notifications** (`§6`, charter-bound): daily rep, booster (when a meter decays),
  prebunk-of-the-week clip, rare **live-threat prebunk** (prebunks the *technique*, never re-broadcasts
  the rumor), teach-forward nudge.
- Forward a suspicious WhatsApp message **to EAL** and get it analyzed inbound.

**(c) Tools / features.** The **MV3 extension** (thin client over existing APIs; side panel reusing the
One-Law primitives; ships via `/tools-download`); the **micro-interaction library** (each ≤1 tap, each
logs a `DefenseEvent`, each names its technique, each surfaces a real source+tier); `covo-router.ts`;
`/api/search/{evidence,factcheck,claimbuster,archive,reverse-image}`; `/api/forensic/{image,c2pa}`;
`/api/islamic/hadith` + `hadith-check`; `/api/whatsapp-analyzer`; the **notification scheduler** (cron)
+ web push + WhatsApp templates; the **enforced pipeline** (Gap 2) behind every extension verdict —
calibrated score + technique + sources, **never an auto "FAKE" label**.

**(d) Cognitive defense built.** The reflex **transfers to the wild** — the trained eye fires unaided,
in the actual manipulation context. The extension *teaches* (shows the technique every time) so it
eventually becomes unnecessary for that technique. Privacy-respecting (on-demand by default; logs *that*
a defense happened, not *what* was read — BLACKBOX ethos). Layers 1–8 in real feeds.

**(e) Business / monetization touchpoint.** **The keystone distribution channel + daily-habit surface +
local moat.** The extension converts EAL from a destination into an ambient layer; it is the GTM's
primary retention engine and a moat a global player won't build for Egyptian/Arabic context. The
**teach-forward viral loop** (instrumented shares, K-factor) is the zero-CAC growth engine reaching the
low-income population. WhatsApp inbound is the most-powerful, most-sensitive channel (opt-in,
template-bound).

---

## LEVEL 6 — THE PROOF: DURABILITY, CIS & THE PASSPORT
### المستوى السادس — البرهان: الديمومة والمناعة والجواز

**(a) User state.** ~30 days in, with a real practice history. Ready to see *whether it stuck* — and to
hold an artifact of what they built. This is the user's "proof of change" moment and the project's.

**(b) What they do.**
- Take the **30-day held-out MIST re-test** (items they never saw in training) → measures *transfer +
  durability*, not memorization.
- See their **Cognitive Immunity Score (CIS ∈ 0–100)** — the derived composite
  `CIS = 0.35·DISCERNMENT + 0.25·CALIBRATION + 0.25·COVERAGE + 0.15·DURABILITY` — with its sub-scores
  and the `realNewsBias` distrust-drift term **visible**, plus a band (Exposed / Aware / Resilient /
  Architect-Aware).
- Open the **Inoculation Passport** (`/inoculation-passport`): the 8 meters over time, the calibration
  chart (true vs false), FLICC weak-spots, streak, teach-forward count, and the **pre→post MIST delta**.
  It is *honest* — shows decay, shows where you over-flag real news, shows UNVERIFIED where data is thin.

**(c) Tools / features.** The **Efficacy Engine** (Gap 4): held-out MIST split, 30-day re-administration
scheduler, the **CIS aggregator** (reuses `scoreMIST` math; `CISResult` shape); `/api/assessment`
(+`/export` CSV/JSON, the N=84 pilot pre/post pipeline); `/inoculation-passport` (exists, upgraded to
the full scoreboard); the **Defense Ledger** + 8 meters; **Identity** (to re-administer to the same
person at 30 days).

**(d) Cognitive defense built.** **Durable immunity, measured and proven** — the IREX ~1.5-year
persistence target made checkable. The passport is the metacognitive mirror: the user *sees* their
immunity wane without practice (the retention engine) and rise with it. Calibration is the headline:
"you're 92 — but you over-flag *real* news" is the honest, useful truth.

**(e) Business / monetization touchpoint.** **THE fundable number.** The pre→post MIST delta is EAL's one
citable claim ("people measurably get harder to fool") — the literal hinge of every grant and every
institutional sale, and the project's own §11 proof test. The passport is the **investment artifact**
that makes quitting feel like losing something real (retention) and is the basis for the **certificate**
revenue. Phase-1 exit gate = "MIST-20 pre/post delta documented."

---

## LEVEL 7 — THE TEACHER: DIFFUSION, COHORTS & FAMILY
### المستوى السابع — المُعلّم: النشر والمجموعات والأسرة

**(a) User state.** A Resilient/Inoculated user (Stage 3+) who now spreads immunity to others — the
compounding loop. May be a parent, a teacher, a community figure, or a peer evangelist. Growth and
mission become the same act.

**(b) What they do.**
- Unlock **"send a prebunk"** (Stage-3+): share one technique-card with its real source to a contact —
  the validated IREX diffusion habit (also the sharer's own retrieval practice).
- Use the **family-kit** (`/family-kit`, exists): a parent/teacher-friendly packaged version to onboard
  a child or a classroom.
- (If a teacher/admin) Enroll a **cohort** via the **institutional dashboard**: assign the curriculum,
  track per-student progress and **pre/post MIST deltas**, issue **bulk certificates**, (later) SSO/LMS.
- Recruit a learner → restart the whole journey at L0 for a new person (the K-factor in action).

**(c) Tools / features.** The **teach-it-forward loop** (instrumented shares with attribution/UTM,
K-factor measurement; `/api/whatsapp-analyzer` rebuttal generator); the **family-kit** (exists); the
**Institutional Layer** (Gap 10, new): multi-tenant roles, cohort management, teacher dashboard,
certificate issuance at scale, SSO/LMS; `/api/certificate/generate` (HMAC-signed, the weighted score =
CIS); the **Defense Ledger** as the institutional *view* of every student.

**(d) Cognitive defense built.** **Diffusion + reinforcement** — teaching is the strongest retrieval
practice, so the teacher's own immunity deepens while a new person's begins. Breaks isolation (the
Layer-6 defense at the social level). The cohort makes immunity a *shared norm*, not a lonely skill.

**(e) Business / monetization touchpoint.** **The revenue inflection.** Schools are the funded,
measurable, institutional channel — one signed school = hundreds of users + a paying/grant relationship
+ a credibility reference + a teacher-evangelist. The cohort dashboard converts the efficacy number
(L6) into **recurring institutional money** (seats, certification, white-label). The teach-forward loop
is the **zero-CAC growth engine**. Certificates are a B2C/B2B revenue line. This is where reach becomes
revenue — without ever gating the free public-good core.

---

## LEVEL 8 — MASTERY / ARCHITECT-AWARE: CERTIFIED & SYSTEMIC
### المستوى الثامن — الإتقان: مُدرك للبنية ومُعتمَد

**(a) User state.** The fully-trained citizen: systems-level thinking (Layer 7, the Architects) +
calibrated on the genuinely unknown (Layer 8), durable across a month, low Brier score. The product's
end-state human — and a node who keeps the flywheel turning.

**(b) What they do.**
- Clear the **Stage-4 gate**: L7–L8 modules done; COVERAGE ≥ 0.8 (most technique-cards retained ≥21
  days); passes the 30-day durability re-test; Brier ≤ 0.15.
- Receive the **signed sovereign certificate** (`/api/certificate/generate`, SHA-256/HMAC) — the
  weighted score *is* CIS, sub-scores encoded, tamper-evident and auditable. No fake badges.
- Map a feed's incentives + ownership (Layer 7 Systems Mapping); assign **probability bands** to
  unresolved claims (Layer 8 calibration) instead of false verdicts.
- (Power users / developers / newsrooms) Use the **packaged Verification API** to embed EAL's
  Arabic-first checking into their own products.

**(c) Tools / features.** The full **trainer** at Architect difficulty (level 5); Layer-7 **Systems &
Incentive Mapping** + Layer-8 **Bayesian Calibration** exercises (E9, Brier-scored); the **certificate**
generator; the **Packaged Verification API** (Gap 11, new: keys, tiers, quotas, SLAs, docs, the
ToS-clean commercial inference path); the **Trust & Governance spine** (Gap 12) standing behind every
output (transparency page, IFCN posture, independence guardrails).

**(d) Cognitive defense built.** **Architect-Aware immunity** — the user sees the rails (Layer 7) and
refuses false closure on the unknown (Layer 8). This is calibrated, durable, systems-level cognitive
immunity — the strongest *available* counter (never "100% destroyed"; the honesty clause holds).

**(e) Business / monetization touchpoint.** **The highest-ceiling, most-defensible revenue lane.** The
**Verification API** (Arabic-native claim-checking, forensics, hadith-grading, fallacy/bias detection)
sells to developers, newsrooms, banks (anti-social-engineering), and platforms — the lane with the best
margin and the structural Arabic-first moat. The certificate is a credential people pay for. The
**governance spine** (revenue-concentration cap, no editorial kill-switch, fiscal sponsorship) is the
moat *and* the survival condition — independence *is* the product's truth claim.

---

## THE JOURNEY AS A FLYWHEEL (how each level causes the next)

```
   L0 DESCENT ──emotion──▶ L1 BASELINE ──the number──▶ L2 COMMITMENT ──habit contract──▶
   L3 DAILY REP ◀──booster (meter decays)── L3   ──logs DefenseEvents──▶ 8 METERS + LEDGER
        │ teach-forward                                      │ weak items → spaced cards
        ▼                                                    ▼
   new person enters at L0          L4 TRAINED EYE (8-layer modules, adaptive curve)
        ▲                                                    │
        │                                                    ▼
   L7 TEACHER ◀── certificate / cohort ── L6 THE PROOF ◀── L5 IN THE WILD (extension fires)
        │                                  (CIS, passport,        │ "add to today's rep"
        ▼                                   30-day delta)         ▼ feeds the loop
   L8 ARCHITECT-AWARE ──▶ Verification API + Governance ──▶ sustains the whole system
```

**Internalization target:** after ~21 days of reps + extension use, the *external* trigger (push) is
replaced by the *internal* one ("I feel outrage → I pause and verify"). That internal trigger — measured
by the MIST delta + ledger calibration — **is** the cognitive immunity the whole journey exists to build.

---

## THE FULL FEATURE → LEVEL → DEFENSE → BUSINESS MATRIX (the at-a-glance contract)

> Every feature (existing + new) appears exactly once, mapped to the level it first powers, the named
> defense it builds (never generic "critical thinking"), and its business touchpoint. **Nothing skipped.**

| Feature / Tool | Status | First powers | Named defense (technique → layer) | Business touchpoint |
|---|---|---|---|---|
| `/the-descent` scrollytelling | built | L0 | emotion-anchor + technique-per-layer (1–8) | top-of-funnel, CAC≈0 |
| Descent micro-choices + climb tool-trials + exit ramp | new | L0 | 8 logged decisions; tool-grounded verification | funnel→baseline conversion |
| `/api/kill-list`, `descent-data` cases | built | L0 | real Egyptian case corpus | content moat |
| MIST-20 (`/api/mist`, `scoreMIST`) | built | L1 | FLICC discrimination (real vs fake) | pre-score = fundable left endpoint |
| Vulnerability fingerprint | new | L1 | metacognition; named first blind spot | personalized curriculum hook |
| `/onboarding` 5 beats + `/welcome` | exists→rebuild | L2 | PAUSE / emotion-as-detector reflex | activation + identity capture |
| **Identity / durable account** (Gap 3) | **new** | L2 | (enables all longitudinal defenses) | precondition for all revenue |
| **Defense Ledger + 8 meters** (`ledger.ts`, Gap 1) | **new** | L2 | measures every defensive act | North-Star substrate |
| `covo-router.ts` emotional-intent | built | L2 | emotion-as-signal (IREX) → L4/L6 | — |
| `/daily` rep (5 micro-steps) | new | L3 | full spine: notice→name→run→reconcile→teach | retention; North-Star; Pro core |
| **`/api/srs` → real SM-2 scheduler** (Gap 1) | stub→build | L3 | spaced boosters (anti-decay) | durability KPI |
| `sm2.ts` SuperMemo-2 | built | L3 | spaced repetition | — |
| **`runVerificationPipeline` / `/api/pipeline/verify`** (Gap 2) | **new** | L3 | grounded verdict (One-Law enforced) | fixes existential trust risk |
| `/api/ai/debunker` (SIFT chain) | built | L3 | SIFT lateral verification → L1 | (generalized into pipeline) |
| `/api/search/evidence` (7-API RAG) + Cohere rerank | built | L3 | grounding (Strategy 1) → S/A/B/C tiers | — |
| `logic-layer.ts` relevance gate | built | L3 | drops irrelevant sources (no keyword fakes) | — |
| `output-enforcer.ts` (One-Law) | built | L3 | abstain/UNVERIFIED on unsourced | trust guarantee |
| `/api/god-system` adversarial panel | built | L3 | cross-model CONTESTED on divergence | — |
| `<ScientificShield>`/`<EvidenceChips>`/`<DefenseCard>` | new | L3 | tool+technique together (§13) | — |
| `/api/whatsapp-analyzer` rebuttal generator | built | L3 | teach-it-forward (IREX) → diffusion | zero-CAC growth |
| 8-layer modules (6-beat shape) | new | L4 | the layer's `COGNITION_BUILDER` technique | institutional depth |
| Exercise bank E1–E9 + adaptive curve (1–5) | new | L4 | spot/forge/trace/cui-bono/calibrate per layer | Pro/Auditor unlock |
| Build-a-Lie forge (`flicc-classifier.ts`) | built engine | L4 | active role-play (strongest transfer) → L1–7 | — |
| `/api/debate-sim` | built | L4 | fallacy-spotting under pressure | Debater-tier unlock |
| `/api/live-deception/generate` rabbit-hole | built | L4 | inoculation + bubble-exit → L6 | — |
| `bad-news` six-techniques game | built | L4 | become-the-manipulator role-play | — |
| 144-day curriculum hydrated to ContentAtoms | exists→hydrate | L4 | sourced, graded, bilingual lessons | curriculum moat |
| **ContentAtom + `verify-content.ts` gate** (Gap 6) | **new** | L4 | structural anti-unsourced-lesson safeguard | scales AI-drafted content safely |
| `glossary-ar.ts` canonical Arabic lock | new | L4 | terminology fidelity (EN/AR) | bilingual quality |
| Trainer coach chatbot (§8 6-layer prompt) | new | L4 | pipeline-backed, cites or abstains | — |
| `buildSystemPrompt` (every bot) | built→adopt | L4 | Truth-Stack epistemic law in chat | trust on most-used surface |
| **MV3 browser extension** (Gap 5) | **new** | L5 | reflex fires at point-of-exposure (1–8) | keystone distribution + moat |
| Micro-interactions library (Pause Gate … Honest-Abstain) | new | L5 | one-tap rehearsal per technique | retention everywhere |
| Notifications + charter + scheduler (Gap 9 partial) | new | L5 | spaced boosters; prebunk-of-week; live-threat | re-trigger; viral loop |
| WhatsApp inbound verifier | new | L5 | inbound SIFT triage | most-powerful EG channel |
| **Teach-it-forward viral loop (instrumented)** (Gap 9) | **new** | L5/L7 | IREX diffusion + retrieval practice | zero-CAC K-factor engine |
| **Efficacy Engine** (held-out split, CIS, 30-day) (Gap 4) | **new** | L6 | durable immunity, proven (real vs fake) | THE fundable number |
| CIS aggregator + `CISResult` | new | L6 | derived composite (never hardcoded) | grant/sale headline |
| `/inoculation-passport` (full scoreboard) | exists→upgrade | L6 | metacognitive mirror; honest decay | retention investment artifact |
| `/api/assessment` (+`/export`) pre/post | built | L6 | the §11 proof test | funder report data |
| **Institutional / cohort dashboard** (Gap 10) | **new** | L7 | shared-norm immunity; cohort tracking | recurring institutional revenue |
| `/family-kit` | exists | L7 | parent/teacher diffusion | B2C/B2G channel |
| `/api/certificate/generate` (HMAC, CIS-weighted) | built | L7/L8 | auditable proof-of-change credential | certification revenue |
| **Packaged Verification API** (Gap 11) | **new** | L8 | Arabic-first checking embedded | highest-ceiling revenue lane |
| Layer-7 Systems Mapping + Layer-8 Calibration (Brier) | new | L8 | refuse the rails; calibrated uncertainty | Architect tier |
| **Observability + cost-guard** (Gap 8) | **new** | (all, behind-scenes) | counts North-Star; protects free tiers | survival + every metric |
| **Abuse / Crisis hardening** (Gap 7) | **new** | (all, behind-scenes) | jailbreak guard; crisis routing everywhere | harm/legal-risk safeguard |
| **Trust & Governance spine** (Gap 12) | **new** | L8 (seed at B0) | independence; transparency; IFCN posture | moat + funding precondition |

---

# PART II — THE BUILD ROADMAP (WHAT WE SHIP, IN WHAT ORDER)

> The build ships the **nervous system before the growth surfaces** — exactly the sequencing the twelve
> gaps mandate (keystones 1–4 first; extension/dashboards/API after). The **Phase-1 security / RAG /
> guardrail work already in flight is milestone B0** — it is the prerequisite under everything else.

```
 B0  PHASE-1 SECURITY / RAG / GUARDRAIL          ◀ IN FLIGHT (the foundation under all of it)
 B1  MEASUREMENT SUBSTRATE + IDENTITY            (Gaps 1, 3)            ── keystones
 B2  THE DAILY LOOP + EFFICACY ENGINE            (Gaps 4 + product §4)  ── keystone proof
 B3  MICRO-INTERACTIONS + CONTENT ONE-LAW GATE   (Gaps 6 + product §5)  ── safeguards
 B4  TRAINING SURFACES WIRED LIVE                (cognition + tools)    ── depth
 B5  EXTENSION + VIRAL LOOP + NOTIFICATIONS      (Gaps 5, 9)            ── growth
 B6  DURABILITY + CERTIFICATE                    (cognition §9, §13)    ── proof artifact
 B7  INSTITUTIONAL LAYER                          (Gap 10)              ── revenue
 B8  API PRODUCT + GOVERNANCE SPINE              (Gaps 11, 12)          ── scale + moat
        ⟂ cross-cutting, all phases:  OBSERVABILITY + COST-GUARD (Gap 8) · ABUSE/CRISIS (Gap 7)
```

---

## MILESTONE B0 — PHASE-1 SECURITY / RAG / GUARDRAIL (IN FLIGHT)
### الأساس: الأمن والاسترجاع والحارس — قيد التنفيذ

**This is the work already underway and the foundation under everything.** It is milestone #1 because
nothing else is safe to ship on top of an un-enforced runtime.

**Ships:**
1. **Extract `src/lib/pipeline/verify.ts` → `runVerificationPipeline()`** from the gold-standard
   `/api/ai/debunker` chain — the single concatenation point (RETRIEVE → RELEVANCE GATE → RERANK →
   CROSS-VERIFY → GROUND+CITE → GUARD+CRITIQUE → DIAGNOSE → PRESCRIBE → OUTPUT). Confidence **derived**
   (`tier × relevance × agreement`), never hardcoded. *(Unit-testable: same claim + same sources ⇒ same
   output — the §11 reproducibility assurance.)*
2. **`POST /api/pipeline/verify`** thin wrapper (+ search-cache).
3. **Fix `/api/ai/chat`** (Gap 2): delete the hardcoded non-resolvable `sources`, route factual claims
   through the pipeline, switch every prompt to `buildSystemPrompt`, return `sources/enforcement/
   layer/defense`. *(This alone makes every existing `PageAIChatbot` One-Law compliant — fixes the #1
   live constitution violation on the most-used surface.)*
4. **RAG hardening:** OpenAlex API key (mailto pool sunset ~Feb 2026), Retraction Watch integrity gate,
   the relevance logic-layer + Cohere rerank wired into the shared pipeline.
5. **Guardrails:** `enforceOneLaw` / `applyVerdictEnforcement` on every factual output; the
   `<ScientificShield>` UI primitive; fail-loud UNVERIFIED state everywhere.
6. **Security baseline:** consistent rate-limit middleware; the known P0 fixes (`api-swarm.ts`
   hardcoded scores + AbortController; `classifier.ts` try/catch + abstain).

**Why first:** it removes an existential trust liability *and* unlocks every training payoff (debate-sim
refutation, live-deception exit card, MIST remediation) that currently narrates over static content.
The whole brand is "no claim without a resolvable source" — this milestone makes the runtime obey it.

**User-facing now:** the chatbot stops fabricating sources; verdicts carry real evidence chips. **Powers
levels:** L3 (the RUN/RECONCILE steps), and everything that calls the pipeline downstream.

---

## MILESTONE B1 — MEASUREMENT SUBSTRATE + IDENTITY (keystones 1 & 3)
### محرك القياس + الهوية

**Ships:**
- **Durable persistence:** provision real Vercel KV/Redis (today `kvStore` silently falls back to
  local-FS — the ledger would evaporate per-deploy). Non-negotiable prerequisite.
- **Identity / account (Gap 3):** scoped passwordless OTP / OAuth + session, deliberately thin to honor
  the BLACKBOX hashed-ID privacy ethos. The missing front door under streaks, passport, re-tests,
  certificates, billing, cohorts.
- **Defense Ledger (`src/lib/cognition/ledger.ts`, Gap 1):** append-only `DefenseEvent` store (hashed
  user id; `surface, layer, technique, outcome, confidenceBefore/After, sources`). Promote the 9-line
  `/api/srs` stub → real **SM-2 scheduler** + ledger. Derive the **8 Immunity Meters** (decay = inverse
  SM-2 interval) with per-meter true-vs-false calibration. Local-first fallback + honest "saved locally"
  chip (never a fake `{success:true}`).

**Why here:** these are the cheapest high-leverage cluster and *every* downstream gap reads from them.
No ledger ⇒ no meters, decay, boosters, CIS, fingerprint, proof-of-change. No identity ⇒ nothing
longitudinal to attach to and no billable user.

**Powers levels:** L2 (ledger begins; account at commitment), L3 (boosters), and the substrate for L6/L7.

---

## MILESTONE B2 — THE DAILY LOOP + EFFICACY ENGINE (keystone proof)
### الحلقة اليومية + محرك الإثبات

**Ships:**
- **`/daily` rep** — the 5-step loop (NOTICE→NAME→RUN→RECONCILE→TEACH) over the ledger + existing item
  banks (`kill-list`, `live-deception`, `descent-data`) + the pipeline (B0) + tool APIs. Quality-gated
  streaks. The core habit engine.
- **Onboarding rebuild** (`/onboarding`) — the 5 beats ending in the habit contract; writes the MIST
  baseline; seeds card #1.
- **Efficacy Engine (Gap 4):** held-out MIST split for post-tests, the 30-day re-administration
  scheduler, the **CIS aggregator** (four sub-scores reusing `scoreMIST` math), the distrust-drift guard
  (`realNewsBias` tracked separately), and the *reporting* of the pre→post delta.

**Why here:** the Phase-0 GTM milestone *is* "MIST-20 pre/post delta documented" — the deliverable that
unlocks the first grant. The daily loop is the retention core; the efficacy engine turns it into the one
citable claim. Both depend on B1 (ledger + identity).

**Powers levels:** L1 (baseline), L2 (commitment), L3 (the rep), L6 (the proof).

---

## MILESTONE B3 — MICRO-INTERACTIONS + CONTENT ONE-LAW GATE (safeguards)
### التفاعلات الدقيقة + بوابة القانون الواحد للمحتوى

**Ships:**
- **Micro-interaction library** — the reusable reflex components (Pause Gate, Lateral-Read,
  Restore-Context, What's-hidden, Cui-Bono, Is/Ought, Bubble-Exit, Grade-the-Hadith, Calibrate-Me,
  **Honest-Abstain**), each ≤1 tap, each over an existing API, each logging a `DefenseEvent`, each naming
  its technique. Drop into every page.
- **ContentAtom + `scripts/verify-content.ts` (Gap 6):** the build-time gate that makes shipping an
  unsourced lesson impossible — reuses `enforceOneLaw`/`classifyTier`/`deriveConfidenceLabel`; hadith
  must carry a grade, verse must carry context, Tier-C auto-downgrades to CONTESTED. Wired into
  `npm run build`. **`glossary-ar.ts`** consolidated; `arabic-gate.ts` validation extended to atoms.
- Seed module (SIFT 30-sec gut-check, CC BY 4.0) as the reference implementation.

**Why here:** the curriculum is large and increasingly AI-drafted — exactly where an ungraded hadith
(the *single worst violation*, §4.2) or a "studies show…" with no study slips in. The gate lets content
authoring scale without scaling risk, before the big content + religious-shield pushes ship.

**Powers levels:** L4 (every module's sourced lessons), L5 (micro-interactions in the wild).

---

## MILESTONE B4 — TRAINING SURFACES WIRED LIVE (depth)
### تشغيل أسطح التدريب بالتحقق الحيّ

**Ships (the cognition + tools strategies fully):**
- **Trainer orchestration** (`src/lib/cognition/trainer/*`): the session runner, exercise bank schema
  (E1–E9), the `grade.ts` answer→`q` bridge, the adaptive curve (promote ≥80%/≥8-items + calibrated;
  remedial boosters), the **8-layer modules** (6-beat shape) with Egyptian-dialect sourced content.
- **Wire training payoffs to the pipeline:** debate-sim reveal, live-deception exit card, bad-news
  debrief, MIST remediation walkthrough, six-layers/critical-thinking live "try-it" box — all call
  `/api/pipeline/verify` and render `<ScientificShield>`.
- **Coach chatbots** on every page via `buildSystemPrompt` + `COGNITION_PROMPT_BLOCK` — cites or
  abstains, names layer+defense.
- **Hydrate the 144 days** with module atoms; tie modules → `/api/mist` for pre/post.

**Why here:** depends on B0 (pipeline), B1 (ledger for mastery tracking), B3 (content gate). This is the
structured-mastery depth that L4 needs and that institutions later assign.

**Powers levels:** L4 (the trained eye), reinforces L3.

---

## MILESTONE B5 — EXTENSION + VIRAL LOOP + NOTIFICATIONS (growth)
### الإضافة + الحلقة الفيروسية + الإشعارات

**Ships:**
- **MV3 browser extension (Gap 5):** thin client over existing APIs (claim sensor, media badge with
  false-positive caveat, decontext catcher, hadith guard, emotion meter, add-to-rep, right-click verify).
  Side panel reuses One-Law primitives. Ships via `/tools-download`. **Hard-depends on B0** (must call
  the enforced pipeline — never propagate hardcoded-source slop into the wild).
- **Teach-it-forward viral loop (Gap 9):** instrumented AR/EN rebuttal share with attribution/UTM,
  K-factor measurement; opt-in **WhatsApp inbound verifier** (most setup, last).
- **Notifications + charter:** web push + cron scheduler; daily rep, booster, prebunk-of-week,
  live-threat prebunk (technique only, never the rumor), teach-forward nudge. Hard caps, no dark patterns.

**Why here:** these are the growth surfaces — only safe and valuable *after* the pipeline (B0), ledger
(B1), and loop (B2) exist. This is the Egypt-beachhead launch layer.

**Powers levels:** L5 (in the wild), feeds L3 and L7.

---

## MILESTONE B6 — DURABILITY + CERTIFICATE (proof artifact)
### الديمومة + الشهادة

**Ships:**
- **Passport upgrade** (`/inoculation-passport`): the full honest scoreboard — 8 meters over time,
  calibration chart, FLICC weak-spots, streak, teach-forward count, pre→post delta, decay shown.
- **30-day durability re-test** end-to-end (held-out split, re-administered to the same identity).
- **Certificate** at Stage-4 (`/api/certificate/generate`, HMAC, CIS-weighted, sub-scores encoded).
- **Mastery path gates** (Stages 0–4) wired to the ledger (every unlock earned by a logged real act).

**Why here:** depends on B2 (efficacy engine) + B1 (identity for re-test). Produces the investment
artifact and the credential.

**Powers levels:** L6 (the proof), L8 (the certificate).

---

## MILESTONE B7 — INSTITUTIONAL LAYER (revenue)
### الطبقة المؤسسية

**Ships (Gap 10):** multi-tenant roles; the **teacher/admin cohort dashboard** (enroll, assign
curriculum, track per-student progress + pre/post MIST deltas, bulk certificates); SSO/LMS integration
(later). The institutional *view* of the ledger/efficacy/identity stack.

**Why here:** hard-depends on Identity (B1), Ledger (B1), Efficacy (B2/B6). Cannot precede them. This
is where the proven consumer loop + efficacy number become **recurring institutional money** (the GTM's
funded, measurable channel).

**Powers levels:** L7 (the teacher / cohorts).

---

## MILESTONE B8 — API PRODUCT + GOVERNANCE SPINE (scale + moat)
### منتج الـ API + عمود الحوكمة

**Ships:**
- **Packaged Verification API (Gap 11):** the 80 routes productized — keys, tiers, quotas, SLAs,
  metering/billing, docs, *and* the ToS-clean, cost-controlled commercial inference path (the first
  serious infra investment, since free rotator tiers forbid resale). Arabic-first checking, forensics,
  hadith-grading, fallacy/bias detection for developers/newsrooms/banks/platforms.
- **Trust & Governance spine (Gap 12):** public methodology/transparency page, IFCN-aligned posture,
  revenue-concentration cap (no funder/contract > ~30–40%), contractual "no editorial kill-switch"
  clauses for any B2G/platform deal, fiscal-sponsorship/legal structure, BLACKBOX privacy policy, output
  audit trail. **(Seed the fiscal-sponsor + transparency page back at B0/Phase-0 — it gates Tier-2
  funding and precedes any institutional grant.)**

**Why last (but seeded early):** the API needs metering (Gap 8), billing/identity (B1), and the
commercial inference path; it follows consumer + institutional traction. The governance spine is the
moat *and* survival condition — independence *is* the product's truth claim — with structural pieces
seeded at Phase-0 and contractual guardrails landing before any government/platform deal.

**Powers levels:** L8 (Architect-Aware + API), and protects the whole system's trust.

---

## CROSS-CUTTING (every phase): OBSERVABILITY + ABUSE/CRISIS HARDENING

**Observability + cost-guard (Gap 8) — instrument from B0.** Product analytics/event telemetry to count
the North-Star ("Verified Defenses Delivered"), K-factor, FLIP-completion, extension retention (none is
wired today); a **rotator health + quota dashboard** with 429-aware circuit-breakers — because the cost
model rests on free provider tiers whose limits/ToS are the single largest structural risk. Privacy-
respecting (event *that* a defense happened, not *what* was read).

**Abuse / Safety / Crisis hardening (Gap 7) — a Phase-0→1 launch gate.** Consistent rate-limit
middleware; an abuse/jailbreak guard on every generative route (so the forge / live-deception generators
can't become a disinformation factory); a **crisis-detection pass wired into every chat surface** (not
just the crisis page) routing to legitimate help; synthetic-content labeling on all forge output; an
incident runbook. Non-negotiable before opening the doors to a vulnerable population.

---

## THE BUILD ↔ JOURNEY DEPENDENCY MAP

```
 B0 PIPELINE/RAG/GUARDRAIL (in flight) ──────────────┐ powers every RUN/verdict (L3+)
        │                                            │
        ▼                                            ▼
 B1 IDENTITY + LEDGER+SRS ──┬──▶ B2 DAILY LOOP + EFFICACY ──┬──▶ B6 DURABILITY + CERT
 (durable KV)              │     (the fundable delta)       │     (passport, certificate)   → L6/L8
        │                  │                                │
        ▼                  ▼                                ▼
 powers L2 commitment   B3 MICRO-INTERACTIONS + CONTENT GATE   B7 INSTITUTIONAL (cohorts) → L7
        │                  │ (safeguards)                       │  needs identity+ledger+efficacy
        ▼                  ▼                                    ▼
        │              B4 TRAINING SURFACES LIVE (L4)        B8 API PRODUCT + GOVERNANCE → L8
        ▼                  ▼
        └────────▶ B5 EXTENSION + VIRAL LOOP + NOTIFS (L5) ── needs B0 (enforced) + B1 (rep)
 ⟂ all phases: OBSERVABILITY/COST-GUARD (Gap 8) + ABUSE/CRISIS (Gap 7) + GOVERNANCE seed (Gap 12)
```

**The four keystones (B0–B2: pipeline, identity, ledger, efficacy) convert EAL from "impressive arsenal"
to "measurable, trustworthy, fundable product."** Everything after — extension, content depth, cohorts,
API — becomes tractable and individually fundable only once those exist.

---

## PHASE ALIGNMENT (journey levels × build milestones × business phase)

| Build | Journey levels unlocked | Business phase | The proof / revenue event |
|---|---|---|---|
| **B0** pipeline/RAG/guardrail (in flight) | L3 RUN step works honestly | Phase 0 (foundation) | trust risk removed; chatbot One-Law compliant |
| **B1** identity + ledger + SRS | L2 commitment, L3 boosters | Phase 0 | durable user + measurable defenses exist |
| **B2** daily loop + efficacy | L1, L2, L3, L6 (pre side) | **Phase 0 exit** | **MIST pre/post delta documented → first grant** |
| **B3** micro-interactions + content gate | L4 (lessons), L5 (reflexes) | Phase 0/1 | content scales safely; reflexes everywhere |
| **B4** training surfaces live | L4 trained eye | Phase 1 | structured mastery; coach bots cite/abstain |
| **B5** extension + viral loop + notifs | L5 in the wild | **Phase 1 (Egypt beachhead)** | keystone distribution; K-factor growth |
| **B6** durability + certificate | L6 the proof, L8 cert | Phase 1 exit | durable immunity proven; credential issued |
| **B7** institutional layer | L7 the teacher / cohorts | **Phase 2 (MENA/institutional)** | recurring school/B2G revenue |
| **B8** API product + governance | L8 architect-aware + API | **Phase 2+ (revenue/scale)** | highest-ceiling revenue lane; independence moat |

---

## COMPLIANCE FOOTER (the §7 + §16 gate applies to every surface on this roadmap)

Every user-facing surface above is "done" only when all boxes tick — the same gate as any EAL feature:
- [ ] **Real data only** — no mock/placeholder/hardcoded score (§0).
- [ ] **Runs the pipeline** — at least Retrieve → Ground+Cite → Diagnose → Output (§6).
- [ ] **Sources visible + tier** — `UNVERIFIED`/`CONTESTED` states used honestly (§2, §3).
- [ ] **Confidence derived**, never hardcoded (§2 Strategy 3).
- [ ] **Layer + defense** named — the specific technique, never generic "think critically" (§5, §12).
- [ ] **Islamic content graded** — hadith collection+number+grade; verses with context (§4).
- [ ] **Chatbot present** — pipeline-backed, §8 6-layer prompt.
- [ ] **Quick-start explainer** + **scientific name** + **in navigation**.
- [ ] **Bilingual EN/AR (Egyptian-aware) + correct RTL** + **responsive to 320px**.
- [ ] **Fails loud** — no empty try/catch, no fake success (§0).
- [ ] **`npm run build` (incl. `verify-content`) passes.**

> **The honesty clause holds at every level:** EAL builds the *strongest available* cognitive immunity —
> best real tool + correct technique + provenance + honest abstention. We never claim "immune" or "100%
> destroyed." The CIS is a measured construct with its sub-scores and `realNewsBias` visible — defensible
> in a thesis, a peer review, and a funder's due diligence. That honesty is the moat.

---

### Provenance of this roadmap
Integrates, all under `C:/Users/pc/Desktop/EGY/New folder (20)/egyptian-awareness-library/RESEARCH_VAULT/STRATEGY/`:
- `01_PHILOSOPHY_DIGEST.md` (One-Law, Truth Stack, 8-layer taxonomy, §6 pipeline, §7+§16 contract, §11
  methodology, §12 cognition builder, §13 Shield, §14 category×pillar).
- `10_STRATEGY_cognition-science.md` (the trainer: modules, 6-beat shape, E1–E9 exercises, adaptive
  curve, SM-2 wiring, daily session runner, CIS, the 5-stage mastery path).
- `10_STRATEGY_product-injection.md` (the Defense Ledger + 8 meters, onboarding 5 beats, descent
  injections, the `/daily` loop, micro-interactions, notifications charter, extension, progression,
  the behavior-change logic model).
- `10_STRATEGY_tools-wiring.md` (`runVerificationPipeline`, the chatbot fix, `<ScientificShield>`,
  training payoffs wired to live verification).
- `10_STRATEGY_standard-content.md` (ContentAtom, the One-Law content gate, bilingual authoring,
  glossary-ar lock, catalog→module map, the 144-day hydration).
- `20_BUSINESS_{monetization, gtm-market, econ-funding}.md` (CAC≈0 teach-forward growth, the fundable
  MIST delta, schools/certification/white-label/API revenue lanes, free-tier survival risk).
- `30_TWELVE_GAPS.md` (the dependency map: keystones 1–4 first; ledger/identity/pipeline/efficacy;
  extension/content-gate/abuse/observability/viral-loop/institutional/API/governance).
- Real code substrate (verified in repo): `src/lib/cognition/{sm2, mist, flicc, flicc-classifier,
  doctor-test}.ts`, `mist-items-2023.json`, `src/lib/standard/{cognition, layers, sources, schema,
  logic-layer, system-prompt}.ts`, `src/lib/ai/{output-enforcer, nvidia-first, cohere-rerank}.ts`,
  `src/lib/orchestration/covo-router.ts`, `src/components/the-descent/*`, and routes `/the-descent`,
  `/onboarding`, `/welcome`, `/daily`(new), `/inoculation-passport`, `/family-kit`, `/tools-download`,
  `/api/{mist, assessment, srs→ledger, ai/debunker, ai/chat, pipeline/verify(new), search/*, forensic/*,
  islamic/*, whatsapp-analyzer, debate-sim, live-deception/generate, god-system, certificate/generate}`.
