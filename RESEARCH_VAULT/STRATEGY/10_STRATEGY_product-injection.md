# 10 — STRATEGY: PRODUCT / UX INJECTION (LAYER 2)

> **What this is.** The build-ready blueprint for *how* EAL injects its philosophy (the One-Law,
> the Truth Stack, the 8-layer taxonomy) and its real tool arsenal into the **user journey** so it
> measurably **changes behavior** — not a marketing site, a behavior-change instrument.
>
> **Read order:** `01_PHILOSOPHY_DIGEST.md` → `02_API_CAPABILITY_MAP.md` → `03_VERIFIED_SOURCES.md` → *this file*.
> Everything here is grounded in those three and in the **real routes/code that already exist** in
> the repo (verified by audit, paths below). No invented features dressed as live engines (§11).
>
> **The governing test for every touchpoint (the One-Law applied to UX):**
> *A screen earns its place only if it (a) runs on real data/real method, and (b) builds a **named,
> measurable cognitive defense** mapped to a specific deception layer.* Engagement that does not move
> a defense metric is vanity — we don't ship it.

---

## 0. THE CORE THESIS — WHY THIS LAYER EXISTS

The philosophy (Layer-1 work) and the tools (the API arsenal) are **inert** until a human *forms a
habit of using them under emotional pressure*. The verified-source research is blunt about this:

- **Technique-based inoculation generalizes; fact-by-fact debunking does not** (Roozenbeek & van der
  Linden, *Science Advances* 2022, eabo6254; Lu et al., *JMIR* 2023, d=−0.36). → The product must
  teach *the move*, not *the hoax of the week*.
- **One-shot inoculation decays; spaced boosters persist** (§17 Arsenal caveat; the 2025 Swedish
  finding). IREX L2D skills persisted **~1.5 years** *because* of repeated practice + teach-it-forward
  (Murrock et al., *JMLE* 2018, N=412). → The product must be a **daily loop**, not a one-time course.
- **Some interventions just shift people to "say false more"** (2025 SDT meta-analysis, N≈37,075). →
  We must measure discernment on **true AND false items**, and the UX must build *calibrated* skepticism,
  not blanket distrust. Every "this is fake" reflex we train is paired with a "this is *real*, here's
  why I trust it" reflex.
- **Prebunking raises self-confidence in judgment** (Basol et al., *J. Cognition* 2020). → Bake a
  **metacognition / confidence check** into every loop so users don't over- or under-trust themselves.

So Layer-2's job: convert philosophy + arsenal into a **trigger → action → reward → investment** habit
loop (Nir Eyal's Hooked model, used here only as a scaffold, not a manipulation — we hook people on
*verifying*, the one habit that is good for them), with **the emotion-as-detector reflex** (IREX) as
the entry trigger and **teach-it-forward** (IREX) as the investment that compounds retention.

**The behavioral spine, one line:** *Notice the pull → name the technique → run the real tool → log the
verdict → teach one person.* Every touchpoint below is one station on that spine.

---

## 1. THE DEFENSE LEDGER — THE MEASUREMENT SUBSTRATE (build this first)

Nothing else works without a place to record *which defense a user actually built*. This is the single
data model the whole journey reads and writes. It is also what makes us One-Law-compliant at the UX
layer: every claimed behavior change is **backed by a logged, reproducible event**, never a vanity count.

### 1.1 Data model (`src/lib/cognition/ledger.ts` — new, deterministic)

```ts
// One row per defensive act the user performed. Append-only, hashed user id.
export interface DefenseEvent {
  id: string;
  userId: string;            // hashed (matches assessment route's hashed-ID pattern)
  ts: string;                // ISO
  surface: 'onboarding' | 'descent' | 'daily-rep' | 'extension' | 'analyzer'
         | 'debate-sim' | 'bad-news' | 'whatsapp' | 'forensic' | 'hadith-check';
  layer: 1|2|3|4|5|6|7|8;     // which deception layer this act trained (DECEPTION_LAYERS)
  technique: string;          // from COGNITION_BUILDER (cognition.ts) — never generic
  outcome: 'correct' | 'incorrect' | 'abstained' | 'verified-real' | 'verified-fake';
  confidenceBefore?: 0|1|2|3|4|5;  // metacognition (Basol 2020)
  confidenceAfter?: 0|1|2|3|4|5;
  sources?: { title: string; url: string; tier: 'S'|'A'|'B'|'C' }[]; // provenance of the act
  itemId?: string;            // links to MIST item / rep card / case
}
```

### 1.2 The 8 Immunity Meters (the user-facing scoreboard)

One meter per deception layer (1–8), each 0–100, **derived** from `DefenseEvent`s — *never hardcoded*
(that is exactly the `api-swarm.ts` hardcoded-score sin, §9/§10). A meter rises when the user correctly
*and confidently-for-the-right-reason* exercises that layer's technique; it **decays** on a spaced
schedule (drives the booster loop) so the user sees their immunity wane if they stop practicing — the
visible decay is the retention engine.

- **Decay = the inverse of the SM-2 interval** already implemented at `src/lib/cognition/sm2.ts`.
  Reuse it: each layer-meter is the aggregate "freshness" of that layer's due cards. This is a *real,
  cited algorithm* (SuperMemo-2), not a vibes number → §11 compliant.
- **Calibration sub-score** per meter: discernment measured on *true* items vs *false* items
  separately (the 2025 SDT caveat). A meter shown as "92 — but you over-flag *real* news" is honest;
  a single blended number would hide the failure mode.

### 1.3 Storage & fail-loud

- Persist via **Vercel KV**, the exact pattern already used by `/api/mist` and `/api/assessment`
  (hashed IDs, no PII). New thin route: `POST/GET /api/ledger` (promote the existing **stub**
  `src/app/api/srs/route.ts` — it is currently a health-only placeholder — into the real
  spaced-repetition + ledger scheduler).
- **Local-first fallback:** mirror to `localStorage`/IndexedDB so the loop works offline and pre-login;
  sync on auth. If KV write fails, the UI **says so** (a quiet "saved locally, will sync" chip) — never
  a fake `{success:true}` (§9).

> Everything below reads/writes this ledger. That is what makes "it changes behavior" a *measured
> claim* and not a slogan.

---

## 2. ONBOARDING — THE 90-SECOND INOCULATION (route: `/onboarding`, `/welcome` exist)

**Goal:** in the first session, give the user *one real "I was about to be fooled" moment* + their
**baseline immunity reading**, and end on a single, repeatable daily commitment. We do not explain the
philosophy; we let them *feel* it, then name it.

**Design mandate (verified sources):** active role-play + emotion-first beats passive explanation
(Bad News; IREX). So onboarding is **interactive from screen 1**, never a feature tour.

### 2.1 The five onboarding beats (each maps to a defense)

| # | Beat | What happens | Real data / route | Defense built | Layer |
|---|------|--------------|-------------------|---------------|-------|
| 1 | **The Hook ("Could you tell?")** | Show 3 real Egyptian items (1 fabricated, 1 decontextualized, 1 *genuinely true*). User swipes real/fake **before** any teaching. | Items from `descent-data.ts` cases + `kill-list` archive (`/api/kill-list`). The *true* item is load-bearing (anti-blanket-distrust). | Establishes the gap; creates the "I was wrong" emotional anchor. | mixed 1/3 |
| 2 | **The Reveal + Name** | Reveal answers. For each miss, name the **exact technique** they lacked (from `cognition.ts`), not "be skeptical." | `COGNITION_BUILDER` (`src/lib/standard/cognition.ts`) | First named-technique exposure. | per item |
| 3 | **MIST Baseline** | 8–10 items of the validated **MIST** instrument → a real susceptibility score + FLICC weak-spots. | `POST /api/mist` (real; `mist-items-2023.json`, `flicc-classifier.ts`), persisted to KV. | A *measured* baseline → the assessment's pre-score (§14 research instrument, N=84 pilot). | all |
| 4 | **Emotion-as-Detector drill** | Replay the item that fooled them; teach the **PAUSE reflex**: "notice the pull → that pull is the signal." | IREX L2D emotion-detector method; COVO emotional-intent score (`covo-router.ts`) shown live. | The universal trigger reflex (precedes every other move). | 4/6 |
| 5 | **The One Commitment** | Pick a daily slot + channel (push/WhatsApp). "One rep a day. 90 seconds." Set the first booster. | Notification opt-in (§6); seeds first SM-2 card. | Converts a session into a **habit contract**. | — |

### 2.2 Onboarding rules

- **No login wall before value.** Run beats 1–4 anonymously (the `localStorage` mirror); ask for
  identity only to *save the streak* at beat 5. (BLACKBOX's no-logging ethos, `/api/blackbox`.)
- **Bilingual + the EN⇄ع toggle**, one language shown at a time (per the maximalist-density memo —
  never interleave paragraphs). RTL correct.
- **Fail-loud:** if MIST scoring or KV is down, show the baseline as **UNVERIFIED** and let the user
  proceed — never fake a score.
- **Output:** writes `DefenseEvent`s for every swipe (with `confidenceBefore`), seeds all 8 meters,
  schedules card #1. The user leaves with a *number they want to raise* and a *time they'll return*.

---

## 3. THE `/the-descent` GATEWAY — THE EMOTIONAL ON-RAMP (route exists, built)

The gateway already exists: a second-person scrollytelling **FALL through all 8 layers that kills an
Egyptian, then a CLIMB out** to the Library (16 sections M0–M16; `src/components/the-descent/*`;
single source of truth `descent-data.ts`; One-Law `<Sourced>`/`FailLoud`/`LayerTag`/`DefenseChip`
primitives). **Layer-2's job is not to rebuild it — it is to wire it into the behavior loop** so the
emotion it generates converts into a logged defensive act and a return visit.

### 3.1 What the descent already does well (keep)
- Delivers the **emotion-first** payload the research demands (the death narrative = the "pull").
- Teaches **technique per layer** on the climb (maps to `COGNITION_BUILDER`).
- Every stat is sourced + tiered (One-Law at the content layer).

### 3.2 The injections (new, behavior-converting)

| Injection | Where | Mechanism | Defense / metric moved |
|---|---|---|---|
| **Mid-fall micro-choice** | end of each FALL layer (M1–M8) | A 1-tap "what would you have done?" before the layer kills the character. Records a `DefenseEvent` (layer, outcome). | Turns passive scroll into 8 logged decisions; seeds the 8 meters *during the story*. |
| **The Climb = tool trial** | CLIMB sections (M9–M13) | Each climb rung lets the user *actually run* the matching real tool on a sample (e.g. M13 verification filmstrip → live `/api/forensic/image` or `/api/search/evidence`). | First real-tool use; proves the arsenal is real, not narrated. |
| **Exit ramp → onboarding** | Library door (M16) | The door's CTA hands off to `/onboarding` beat 3 (MIST) if not yet baselined, else to today's rep. | Converts the emotional peak into the **habit contract** while affect is high. |
| **"Your descent, scored"** | post-climb | A personal recap: which layers *you* fell for in the micro-choices → your 3 weakest meters → "train these first." | Personalized starting curriculum; honest (shows true-vs-false calibration). |

### 3.3 Design constraints (hard-won, from memory)
- **No fragile machinery.** Pure-CSS motion, native scroll, the shared `useReveal()` IntersectionObserver
  — *not* `whileInView`, not Lenis, not R3F `<Scene/>` (all broke v1/v2). Reuse `dw/` v3 patterns.
- **Maximalist-but-smooth boxes:** gradient fills + `color-mix` soft borders, ≥20px radius, ≥13px text,
  aligned equal-height grids, one accent per item, **no boxes-in-boxes**, EN⇄ع toggle. (Both design memos.)
- Arabic font via inline `var(--font-heading-ar)` (the `font-cairo`/`font-amiri` classes are no-ops).

---

## 4. THE DAILY PRACTICE LOOP — THE HABIT ENGINE (the heart of Layer 2)

This is the product's center of gravity. The verified research says retention comes from **spaced,
technique-based, active practice** — so the daily loop is a **90-second spaced-repetition "rep"** that
drills one technique against one real Egyptian item, then asks the user to teach it forward.

**New route:** `/daily` (the "Daily Rep" / "تمرين اليوم"). **Backed by:** the promoted
`/api/srs` → ledger + SM-2 scheduler (`sm2.ts` already exists).

### 4.1 The rep — 5 micro-steps (the spine, one screen each)

| Step | UX | Real engine/route | Defense reflex | Layer |
|---|---|---|---|---|
| **1. NOTICE** | A real item drops in (WhatsApp-style card, a headline, an image). "Gut call: real / fake / not sure?" + **confidence slider** *before* analysis. | item bank: `kill-list`, `descent-data` cases, `live-deception/generate` (escalating feed), reverse-image samples | Emotion-as-detector + the **abstain option** is first-class (IREX; §2 abstention). | rotates 1–8 |
| **2. NAME** | "Which technique exposes this?" — 4 technique chips. | `COGNITION_BUILDER` techniques | Technique recall (the generalizing skill — *Sci Adv* 2022). | item's layer |
| **3. RUN** | One tap fires the layer's **real tool** on the item; user reads the live evidence. | `shieldTools` per layer → `/api/search/evidence`, `/api/forensic/image`, `/api/islamic/hadith`, `/api/search/factcheck`, `/api/whatsapp-analyzer`… | First-hand provenance; the tool, not the app, delivers the verdict. | item's layer |
| **4. VERDICT + RECONCILE** | User commits a final verdict + **confidence-after**. App shows the One-Law verdict `{verdict, confidence∈{HIGH,MEDIUM,CONTESTED,UNVERIFIED}, layer, defense, sources[]}`. | `output-enforcer.ts`, `/api/god-system` for hard items | Calibration: did confidence track correctness? On true items too. | item's layer |
| **5. TEACH-IT-FORWARD** | "Send the 1-line rebuttal to someone." Pre-composed AR/EN rebuttal, share to WhatsApp. | `/api/whatsapp-analyzer` rebuttal generator | **The investment hook** (Hooked) + IREX teach-forward (the ~1.5-yr persistence driver). | item's layer |

### 4.2 What makes the loop a *habit* (Hooked, applied ethically)

- **Trigger (external→internal):** a daily push at the user's chosen slot (§6). Over ~3 weeks the
  external trigger is meant to become an *internal* one: "I saw something outrageous → I reflexively
  pause and verify." That internal trigger **is** the product's real deliverable.
- **Action:** the 90-second rep (lowest-friction version of "verify a claim").
- **Variable reward:** the item is unpredictable (which layer, real or fake, easy or a trap); the
  *reward* is the "aha" + the meter tick + a streak. Variability sustains the loop without manipulation
  because the payload is genuinely useful each time.
- **Investment:** teach-it-forward + the rising meters + the SM-2 cards the user has "earned" — each
  rep makes tomorrow's rep more personalized (weak layers resurface more often). Loaded triggers.

### 4.3 Spacing & boosters (the anti-decay core)
- Each missed/weak item becomes an **SM-2 card** (`sm2.ts`): quality-of-recall `q∈0..5` from the rep
  outcome → next due date. Strong items space out; weak ones return fast. This is the *cited mechanism*
  (SuperMemo-2) that operationalizes "spaced boosters, not one-shots" (§17 caveat).
- **Booster days:** if a layer-meter decays below threshold (no rep for ~its interval), the next rep is
  forced to that layer + a "your [Decontextualization] immunity is fading" nudge.
- **Calibration boosters:** if the ledger shows over-flagging of *real* items, the scheduler injects
  *true-item* reps specifically (counters the SDT "criterion shift" failure).

### 4.4 Streaks done honestly
- Streak = consecutive days with ≥1 *completed* rep (all 5 steps), not opens. A streak that rewards
  skipping the RUN step would train the wrong reflex. **Quality-gated streaks.**
- **No dark patterns:** no fake-urgency, no loss-aversion guilt-bombing, no infinite scroll. (We are
  the project that *catalogs* dark patterns — `/api/defense/mental-health/analyze` detects them; we
  cannot deploy them. This is a hard ethical constraint, not a preference.)

---

## 5. MICRO-INTERACTIONS — THE DEFENSE REFLEXES, EVERYWHERE

Small, repeated interactions are where reflexes actually form. Each one is a **one-tap rehearsal** of a
specific technique, available across the whole app (not just the daily loop).

| Micro-interaction | Trigger | What it does | Real route/lib | Defense (technique → layer) |
|---|---|---|---|---|
| **The Pause Gate** | User about to share/react to a hot claim | A 1.5s interstitial: "You felt something. Name it." (3 emotion chips). Then "verify first?" | COVO emotional-intent score (`covo-router.ts`) | Emotion-as-detector → L4/L6 |
| **Lateral-Read button** | On any claim card | "Leave the page" → opens the source's *reputation* (what others say about it), not the claim. | `/api/search/evidence`, `/api/search/mediawiki`→primary, `/api/search/factcheck` | Lateral Reading + SIFT → L1 |
| **"What's hidden?" toggle** | On any framed stat | Pulls the omitted half: base rate / denominator / opposing study. | Evidence Aggregator both-sides; base-rate retrieval | Omission Audit → L2 |
| **Restore-Context** | On any quote/clip | Fetches the sentence before/after + the primary source. | `/api/search/archive` (Wayback), upstream fetch | Upstream Reading + Toulmin → L3 |
| **Cui-Bono chip** | On any well-timed release | "Why now? Who benefits?" prompt + timestamp forensics. | timestamp/temporal forensics; `/api/search/factcheck` dates | Cui Bono + Temporal Forensics → L4 |
| **Is/Ought split** | On dual-use "the science says…" claims | Separates the factual claim from the prescribed action. | `/api/god-system` construct layer | Is–Ought Separation → L5 |
| **Bubble-Exit** | Periodically / on echo-chamber content | Shows the same story from a *different* credible frame. | Evidence Aggregator multi-source | Inoculation/Bubble-Exit → L6 |
| **Grade-the-Hadith** | On any religious claim | Will not render a hadith without collection+number+**grade**; ungraded → red. | `/api/islamic/hadith`, `/api/defense/hadith-check` | Isnad grading (§4) → L1/L3 religious |
| **Calibrate-Me** | After any verdict | "How sure were you? How sure should you have been?" | ledger calibration | Bayesian calibration → L8 |
| **The Honest-Abstain** | Whenever evidence is thin | A *celebrated* "I don't know yet — UNVERIFIED" action (earns meter credit, not penalty). | `output-enforcer.ts` | Steelman-the-null → L8; anti-overconfidence everywhere |

**Design law for micro-interactions:** each must (1) be ≤1 tap, (2) surface a **real source + tier**,
(3) log a `DefenseEvent`, (4) name its technique. A micro-interaction that just says "think critically"
is **banned** (§12). The "Honest-Abstain" earning *credit* is the single most important one — it is how
we train calibrated skepticism instead of blanket distrust (the SDT caveat made into a game mechanic).

---

## 6. NOTIFICATIONS — RE-TRIGGER WITHOUT BECOMING THE ENEMY

Notifications are the external trigger that keeps the loop alive — and the single most abusable surface.
Because EAL exists to *fight* manipulation, our notification ethics are a **public, enforced contract**.

### 6.1 Channels
- **Web Push** (PWA) — primary; one daily rep reminder at the user's chosen slot.
- **WhatsApp** — the native channel of Egyptian misinformation; the most powerful and the most
  sensitive. Opt-in only, template-bound, used for (a) the daily rep link, (b) a *prebunk-of-the-week*
  micro-clip, (c) replying to a forwarded message the user sends *us* (turns WhatsApp into an inbound
  verifier via `/api/whatsapp-analyzer`).
- **Email** — weekly digest only (the immunity report, §8).

### 6.2 The notification taxonomy (each tied to a defense, capped)

| Type | Cadence | Payload | Defense purpose |
|---|---|---|---|
| **Daily Rep** | 1×/day, user-set time | "90-sec rep ready. Today: spotting [Decontextualization]." | Habit trigger → loop |
| **Booster** | only when a meter decays | "Your [Cui-Bono] reflex is fading — 1 rep refreshes it." | Anti-decay (spaced boosters) |
| **Prebunk-of-the-week** | 1×/week | A <2-min Arabic prebunk clip (Inoculation-Science template) on a *currently spreading* technique. | Pre-exposure before the wild hoax lands (WHO Primary level) |
| **Live-threat prebunk** | event-driven, rare | When a real rumor is trending (`/api/hunter/trends` EG, `rumor-heatmap`), a *technique* prebunk — never amplifying the specific false claim. | Weaponized-timing counter at population scale (L4) |
| **Teach-forward nudge** | after a strong rep | "You nailed that. Send the rebuttal to one person." | Investment hook + diffusion (IREX) |

### 6.3 Anti-dark-pattern notification charter (binding)
- **Hard cap:** max 1 push/day + 1 weekly digest by default; user controls slot and can silence any type.
- **No manufactured urgency, no guilt, no streak-loss-bombing, no red badges that lie.** (We detect
  these as Layer-6 manipulation; we will not commit them.)
- **Live-threat alerts prebunk the *technique*, never re-broadcast the false claim** (Layer-4 discipline:
  amplifying the rumor to "warn" about it is the attack vector itself).
- **Every notification is itself sourced** where it makes a claim (the prebunk clip cites its method).
- Implementation: schedule via the existing **scheduled-tasks / cron** capability; respect quiet hours.

---

## 7. THE BROWSER EXTENSION — DEFENSE AT THE POINT OF EXPOSURE

The daily loop builds the reflex; the extension is where the reflex **fires in the wild**, in-feed,
the moment a manipulated claim appears. This is the highest-leverage behavior-change surface because it
meets the user *inside the manipulation context* (Facebook, X, YouTube, news sites, WhatsApp Web).

**Honest framing (One-Law / Arsenal caveats):** the extension is an **assistant that surfaces evidence
and names techniques — never an oracle that stamps "FAKE."** Deepfake/AI detection is 61–69% on open
models with high false-positives (§17); C2PA absence ≠ fake; ELA is triage-only. So the extension emits
**calibrated scores + the matched technique + real sources**, with a one-tap path to the full tool —
and it **flags its own uncertainty loudly**. Auto-labeling "fake" is forbidden.

### 7.1 What it does (MV3 extension; talks to the same APIs)

| Feature | In-feed behavior | Real route | Defense | Layer |
|---|---|---|---|---|
| **Claim sensor** | Underlines check-worthy claims (subtle), no nag. Click → side panel. | `/api/search/claimbuster` (check-worthiness), `/api/search/factcheck` ("already debunked?") | Triage → SIFT | 1 |
| **Image/video badge** | On media: a small "verify" affordance → EXIF/C2PA/AI score *with the false-positive caveat shown*. | `/api/forensic/image`, `/api/forensic/c2pa`, DeepReal | Media provenance, **calibrated** | 1/3 |
| **Decontext catcher** | On a quote/clip: "see full context" → restores surrounding text + primary source. | `/api/search/archive`, evidence | Upstream Reading | 3 |
| **Emotion meter** | Live emotional-intent reading of the post you're about to share. | `covo-router.ts` | Emotion-as-detector / Pause Gate | 4/6 |
| **Hadith guard** | On Arabic religious posts: checks for a graded source; ungraded → red warning. | `/api/islamic/hadith`, `hadith-check` | Isnad grading (§4) | religious |
| **"Add to today's rep"** | Any flagged item → becomes tomorrow's spaced card. | ledger + `sm2.ts` | Closes the wild→practice loop | any |
| **Right-click → Verify** | Select text/image → "Verify with EAL" context menu. | `/api/god-system` (full pipeline) | One-call full analysis | all |

### 7.2 The extension *teaches*, it doesn't just judge
Every flag shows **the technique** (`cognition.ts`) so repeated exposure trains the user to spot it
*unaided* — the goal is to make the extension eventually unnecessary for that technique. The side panel
always carries: verdict + confidence enum + **sources with tier chips** + the named defense + a
"why we're not sure" line when applicable. Logs a `DefenseEvent(surface:'extension')`.

### 7.3 Privacy & ethics (non-negotiable)
- **On-demand only by default** (analyze when the user invokes; passive claim-underlining is a setting,
  off by default, and runs check-worthiness *locally* where possible). No browsing-history exfiltration.
- BLACKBOX ethos: no logging of *what* the user reads, only *that* a defense event occurred (hashed).
- Fail-loud: API down → "couldn't verify, here's how to check manually (SIFT)" — never a fake verdict.

### 7.4 Build path
There is already a `/tools-download` route and an `open-source` route — ship the extension there.
MV3, side-panel UI reusing the app's React components + the One-Law primitives (`Sourced`, `LayerTag`,
`DefenseChip`, `FailLoud`). The extension is a thin client over the **existing** API surface — no new
intelligence, just a new *placement* of it.

---

## 8. HABIT FORMATION & PROGRESSION — THE LONG GAME

Behavior change ≠ a streak; it's a **measured competence that persists**. Progression is built to prove
the IREX ~1.5-year-persistence outcome is achievable, and to keep the user climbing.

### 8.1 The progression ladder (each tier unlocks real capability, not cosmetics)

| Tier | Name (EN / ع) | Gate (from ledger, real) | What unlocks |
|---|---|---|---|
| 0 | **Initiate / مبتدئ** | onboarding + MIST baseline done | daily loop, basic micro-interactions |
| 1 | **Reader / قارئ جانبي** | lateral-read used correctly ×N across L1 | extension claim-sensor |
| 2 | **Auditor / مُدقّق** | all 8 meters > 40, calibration balanced | full tool arsenal in-loop; paper-auditor |
| 3 | **Debater / مُحاوِر** | beat the Debate-Sim on ≥3 fallacies | `/api/debate-sim` advanced; peer-challenge |
| 4 | **Teacher / مُعلّم** | taught-forward ×N, recruited 1 learner | family-kit, can author/curate prebunks |

Gates read the **DefenseEvent ledger** — every unlock is *earned by a logged real act*, never granted
to inflate engagement (§0 applied to gamification).

### 8.2 The Inoculation Passport (route `/inoculation-passport` exists)
Make it the **visible record of immunity over time**: the 8 meters, the calibration chart (true vs
false items), the FLICC weak-spots, the streak, the teach-forward count, and the **assessment pre/post
delta** (the N=84 pilot instrument, `/api/assessment`). It is *honest*: it shows decay, shows where you
over-flag real news, shows UNVERIFIED where data is thin. This is the artifact a user is proud of — the
investment that makes quitting feel like a loss of something *real* they built.

### 8.3 The MIST re-test as proof-of-change
Re-administer MIST monthly (the booster cadence). The **delta** (post − pre) is the product's core
behavior-change KPI and is *citable* (validated instrument). Show the user their own curve. This is the
"proof test" (§11 #4) for the entire product: *same instrument, real scoring, reproducible, the number
moved.* If it doesn't move, we have a real falsification signal — we report it, not hide it.

### 8.4 Teach-it-forward as the compounding loop
Every "Teacher" tier user who recruits a learner restarts the loop for a new person → the IREX
diffusion mechanic. The **family-kit** (route exists) packages a parent/teacher-friendly version. This
is also the growth engine — growth and the mission are the *same act* (teaching verification), so we
never have to choose between engagement and ethics.

---

## 9. THE FULL TOUCHPOINT → DEFENSE MAP (the at-a-glance contract)

Every touchpoint, the layer(s) it trains, the named technique (`cognition.ts`), and the real engine.
This is the table reviewers tick against — if a touchpoint can't fill all four columns, it doesn't ship.

| Touchpoint | Deception layer(s) | Named technique (not "critical thinking") | Real engine / route |
|---|---|---|---|
| Onboarding Hook swipe | 1, 3 | Lateral Reading + Upstream Reading | `kill-list`, `descent-data`, MIST |
| Onboarding MIST baseline | 1–8 | FLICC discrimination | `/api/mist`, `flicc-classifier.ts` |
| Emotion-as-detector drill | 4, 6 | Emotion-as-signal (IREX) + Pause | `covo-router.ts` |
| Descent micro-choices | 1–8 (one per fall) | the layer's `COGNITION_BUILDER` technique | `descent-data.ts` + shield tools |
| Descent climb tool-trial | 1–5 | Tool-grounded verification | `/api/forensic/*`, `/api/search/evidence` |
| Daily Rep · NOTICE | rotates 1–8 | Emotion-as-detector + abstain | `live-deception`, `kill-list` |
| Daily Rep · NAME | item's layer | technique recall | `COGNITION_BUILDER` |
| Daily Rep · RUN | item's layer | layer's shieldTools | the matched API |
| Daily Rep · RECONCILE | item's layer | Bayesian calibration | `output-enforcer.ts`, `god-system` |
| Daily Rep · TEACH | item's layer | teach-it-forward (IREX) | `/api/whatsapp-analyzer` |
| Pause Gate | 4, 6 | Emotion-as-detector | `covo-router.ts` |
| Lateral-Read button | 1 | Lateral Reading + SIFT | `/api/search/evidence`, factcheck |
| What's-hidden toggle | 2 | Omission Audit + Steelman | evidence both-sides |
| Restore-Context | 3 | Upstream Reading + Toulmin | `/api/search/archive` |
| Cui-Bono chip | 4 | Cui Bono + Temporal Forensics | factcheck dates, trends |
| Is/Ought split | 5 | Is–Ought + Dual-Use Ethics | `/api/god-system` |
| Bubble-Exit | 6 | Inoculation + Bubble-Exit | evidence multi-source |
| Grade-the-Hadith | religious 1/3 | Isnad grading (§4) | `/api/islamic/hadith`, `hadith-check` |
| Calibrate-Me / Honest-Abstain | 8 | Bayesian calibration + Steelman-the-null | ledger, `output-enforcer.ts` |
| Notification · Booster | the decaying layer | spaced boosters | scheduler + `sm2.ts` |
| Notification · Prebunk-of-week | technique-of-week | technique-based prebunking | Inoculation-Science template |
| Notification · Live-threat | 4 | prebunk the technique (never the claim) | `/api/hunter/trends`, `rumor-heatmap` |
| Extension · Claim sensor | 1 | SIFT triage | `claimbuster`, `factcheck` |
| Extension · Media badge | 1, 3 | calibrated forensics | `/api/forensic/image`, `c2pa` |
| Extension · Decontext catcher | 3 | Upstream Reading | `/api/search/archive` |
| Extension · Emotion meter | 4, 6 | Emotion-as-detector | `covo-router.ts` |
| Extension · Hadith guard | religious | Isnad grading | `/api/islamic/hadith` |
| Debate-Sim | L (fallacies) | fallacy-spotting under pressure | `/api/debate-sim` |
| Bad-News / Live-Deception game | 1–7 | become-the-manipulator role-play | `/api/live-deception/generate`, `/bad-news` |
| Passport / Assessment | 1–8 | metacognition + proof-of-change | `/inoculation-passport`, `/api/assessment` |

---

## 10. THE BEHAVIOR-CHANGE LOGIC MODEL (how each surface causes the next)

```
            ┌──────────────────────────────────────────────────────────┐
            │  /the-descent  (emotion: "this could kill someone I know")│
            └───────────────┬──────────────────────────────────────────┘
                            ▼  affect high → hand off at the door
            ┌──────────────────────────────────────────────────────────┐
            │  /onboarding   (feel the gap → MIST baseline → 1 commitment)│
            └───────────────┬──────────────────────────────────────────┘
                            ▼  habit contract + first SM-2 card
   external trigger ──►┌──────────────────────────────────────────────┐
   (push/WhatsApp)     │  /daily  NOTICE→NAME→RUN→RECONCILE→TEACH      │◄─┐
                       └───────────────┬──────────────────────────────┘  │
                                       ▼  logs DefenseEvent + updates meters │ booster
                       ┌──────────────────────────────────────────────┐  │ when a
                       │  DEFENSE LEDGER  →  8 immunity meters (decay)  │──┘ meter fades
                       └───────────────┬──────────────────────────────┘
                  in the wild ▲        ▼  weak items → spaced cards; teach-forward
        ┌──────────────────────────┐  ┌──────────────────────────────┐
        │  BROWSER EXTENSION         │  │  PASSPORT + monthly MIST re-test│
        │ (reflex fires at exposure) │  │  → measured, citable delta      │
        └───────────┬───────────────┘  └──────────────────────────────┘
                    ▼ "add to today's rep"
              (wild encounter feeds the loop) ──────────────► back to /daily
```

**Internalization target:** after ~21 days of reps + extension use, the *external* trigger (push)
is replaced by the *internal* trigger ("I feel outrage → I pause and verify"). That internal trigger,
measured by the MIST delta + ledger calibration, **is** the cognition immunity we set out to build.

---

## 11. BUILD ORDER (dependency-correct, ship-incrementally)

1. **Defense Ledger + 8 meters** (`ledger.ts`, promote `/api/srs`→ledger, KV like `/api/mist`).
   *Nothing measures behavior change without this.* Reuse `sm2.ts` for decay.
2. **Daily Rep `/daily`** (the 5-step loop) over the ledger + existing item banks (`kill-list`,
   `live-deception`, `descent-data`) + existing tool APIs. The core habit engine.
3. **Onboarding rebuild** (`/onboarding`) — the 5 beats, ends in the habit contract; writes baseline.
4. **Micro-interactions library** — the reusable reflex components (Pause Gate, Lateral-Read,
   Restore-Context…), each over an existing API, each logging a DefenseEvent. Drop into every page.
5. **Notifications** — web push + scheduler (cron) + the charter; WhatsApp template last (most setup).
6. **Descent injections** — micro-choices + climb tool-trials + exit ramp (don't rebuild the page).
7. **Passport + monthly MIST re-test** (`/inoculation-passport`, `/api/assessment`) — the proof.
8. **Browser extension** (MV3, thin client over existing APIs; ship via `/tools-download`).

**§7 compliance per surface:** each must pass — real data only · runs the pipeline · sources+tier
visible · confidence derived · layer+defense shown · Islamic content graded · chatbot reachable ·
quick-start explainer · scientific name · bilingual+RTL · 320px responsive · fails loud · in nav ·
`npm run build` passes.

---

## 12. WHAT WE WILL **NOT** DO (the UX never-do list — One-Law for product)

- ❌ **Engagement metrics with no defense behind them.** A DAU that didn't run a real tool is vanity;
  we report the *defense ledger*, not opens. (§0: vanity counts = unsourced claims about impact.)
- ❌ **Auto-label "FAKE."** The extension and loop emit calibrated scores + technique + sources; never
  an oracle stamp (§17 false-positive caveats).
- ❌ **Dark patterns we ourselves catalog** — fake urgency, guilt, loss-aversion streak-bombing,
  infinite scroll, red-badge lies. We detect these (`mental-health/analyze`); deploying them would
  be self-refuting.
- ❌ **Blanket-distrust training.** Every "spot the fake" is paired with "trust the real, here's why";
  meters track true-item accuracy separately (the SDT caveat as a guardrail).
- ❌ **Ungraded hadith / context-stripped verses** anywhere in the journey (§4 — worst violation).
- ❌ **Re-broadcasting a live rumor to "warn" about it** (Layer-4 self-own); prebunk the *technique*.
- ❌ **Fake success states** — KV down, API down, model unsure → say so (UNVERIFIED), never a green
  checkmark over nothing (§9 empty try/catch, fake `{success:true}`).
- ❌ **Generic "think critically" prompts** — every reflex names its exact technique (§12).

---

### Provenance of this strategy
Built on, all under `C:/Users/pc/Desktop/EGY/New folder (20)/egyptian-awareness-library/`:
- `RESEARCH_VAULT/STRATEGY/01_PHILOSOPHY_DIGEST.md` (One-Law, Truth Stack, 8 layers, §11 method, §12 techniques, §7 contract)
- `RESEARCH_VAULT/STRATEGY/02_API_CAPABILITY_MAP.md` (every route/engine cited above is real and audited)
- `RESEARCH_VAULT/STRATEGY/03_VERIFIED_SOURCES.md` (Bad News, Inoculation Science, IREX L2D, SIFT, COR, MIST, the SDT caveat, effect sizes)
- Real code substrate verified in repo: `src/lib/cognition/{sm2.ts, mist.ts, mist-items-2023.json, flicc.ts, flicc-classifier.ts}`, `src/lib/standard/{cognition.ts, layers.ts}`, `src/lib/orchestration/covo-router.ts`, `src/lib/ai/output-enforcer.ts`, `src/components/the-descent/descent-data.ts`, and existing routes `/onboarding /welcome /the-descent /inoculation-passport /daily(new) /bad-news /debate-sim /live-deception /tools-download /api/mist /api/assessment /api/srs(stub→promote) /api/whatsapp-analyzer /api/forensic/* /api/search/* /api/islamic/* /api/god-system`.
- Behavior-change scaffolds: Eyal *Hooked* (trigger→action→reward→investment, used ethically); IREX L2D emotion-detector + teach-it-forward (~1.5-yr persistence, Murrock et al. 2018); spaced-repetition (SuperMemo-2, implemented); technique-based inoculation (Roozenbeek & van der Linden 2022); calibration/SDT caveat (2025).
