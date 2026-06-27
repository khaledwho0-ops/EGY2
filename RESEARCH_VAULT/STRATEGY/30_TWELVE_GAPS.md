# 30 — THE TWELVE GAPS: What EAL Is Missing That Most Changes Its Trajectory

> **What this is.** A holistic, evidence-grounded audit of the Egyptian Awareness Library — the
> codebase (`src/`, 817 TS/TSX files, 80 API routes, 125 pages), the philosophy (the One-Law / Truth
> Stack / 8-layer taxonomy), the strategy (the four injection layers in `10_STRATEGY_*.md`), and the
> business plan (`20_BUSINESS_*.md`). It names the **12 highest-leverage things currently missing** —
> the capabilities, safeguards, and growth levers whose absence most constrains where EAL can go.
>
> **Selection rule.** Not a bug list and not a wish list. Each of the 12 had to pass one test: *does
> its absence cap the project's trajectory — its ability to prove impact, earn money, stay trusted,
> or scale?* Trivia (a missing nav link, a CSS bug) is excluded. Strategy-doc features that are
> genuinely build-ready but unbuilt are included **only** where they are load-bearing for everything
> downstream.
>
> **Grounding (verified by audit, not assumed).** Every "missing" claim below was checked against the
> real repo on 2026-06-24:
> - `/api/srs/route.ts` is a **9-line stub** (returns `{status:'ok'}`; no SM-2, no scheduling).
> - There is **no `src/lib/cognition/ledger.ts`** and **no `src/lib/pipeline/verify.ts`** — the two
>   substrates the product/tools strategies depend on do not exist.
> - `/api/ai/chat/route.ts` still hardcodes non-resolvable sources (`{title:"NVIDIA NIM Nemotron
>   Analysis", type:"ai"}`, `{title:"EAL Fact-Check Engine"}`) and never calls `enforceOneLaw` — a
>   live One-Law violation on the most-used surface.
> - **No auth dependency** in `package.json` (no next-auth/clerk/firebase-auth) — there is no real
>   user identity, so "streaks," "passports," and "the 30-day re-test" have nothing durable to attach to.
> - **KV is wired in only ~2 routes** (`/api/mist`, `/api/assessment` via `kvStore`); `kvStore` falls
>   back to local-FS JSON when `KV_REST_API_URL` is unset — i.e. in most deploys persistence is ephemeral.
> - **No analytics/observability** is instrumented (no `@vercel/analytics`, posthog, sentry in deps or
>   layout) — the business plan's North-Star "Verified Defenses Delivered" is currently uncountable.
> - `public/manifest.json` is a **PWA manifest**, not a browser extension; there is **no MV3 extension**.
> - Content validation (`scripts/validate-content.ts`) only scans **MDX frontmatter** — the
>   `ContentAtom` One-Law gate described in `10_STRATEGY_standard-content.md` is **not implemented**.
> - **11 test files** total for 817 source files; no CI test job in `.github/workflows`.
>
> **Read order:** `01_PHILOSOPHY_DIGEST.md` → the four `10_STRATEGY_*.md` → the three `20_BUSINESS_*.md`
> → this file. This document is the *priority lens* over all of them.

---

## 0. THE ONE-LINE DIAGNOSIS

EAL has built an extraordinary **arsenal** (forensics, evidence RAG, the enforcer, the cognition spine,
the Descent) but has not yet built the **nervous system** that turns that arsenal into a measurable,
defensible, fundable, self-propagating product. The arsenal is the hard part and it is largely done.
The missing 12 are mostly *connective tissue and proof* — cheaper to build than what exists, but each
one gates outcomes that the arsenal alone cannot reach. **The project's risk is no longer "can we
build the tools?" — it is "can we prove they work, keep them trustworthy at runtime, and get them into
hands?"** The 12 below are the answer to that second question.

Three of the four strategy layers (`product-injection`, `tools-wiring`, `cognition-science`) already
diagnosed pieces of this — but they are written as *if-we-build-it* designs. This document's job is to
rank them against the business reality and the unbuilt safeguards, and to say which **3–4 are the
keystones** the other gaps hang from.

---

## THE TWELVE (ranked by trajectory impact)

| # | Gap | Type | Effort | Keystone? |
|---|---|---|---|---|
| 1 | The Measurement Substrate (Defense Ledger + real SRS) | Capability / Proof | **M** | ⭐ keystone |
| 2 | Runtime One-Law on every chatbot (the shared pipeline) | Safeguard | **M** | ⭐ keystone |
| 3 | Identity & the durable user account | Capability | **M** | ⭐ keystone |
| 4 | The Efficacy Engine (pre/post proof, the fundable number) | Growth / Proof | **M** | ⭐ keystone |
| 5 | The Browser Extension (defense at point of exposure) | Growth lever | **L** | |
| 6 | The Content One-Law Gate (ContentAtom + CI) | Safeguard | **M** | |
| 7 | Abuse / Safety / Crisis hardening at scale | Safeguard | **M** | |
| 8 | Observability + cost-guard for the free-tier rotator | Safeguard / Survival | **S–M** | |
| 9 | The Teach-It-Forward viral loop (WhatsApp-native) | Growth lever | **M** | |
| 10 | The Institutional Layer (teacher/cohort dashboard) | Revenue | **L** | |
| 11 | The Packaged Verification API (the scalable revenue engine) | Revenue | **L** | |
| 12 | Trust & Governance spine (independence, audit, IFCN posture) | Safeguard / Moat | **M** | |

> **Sequencing claim:** Gaps **1–4 are the keystones** and must come first — they are cheap-to-medium,
> mostly connective, and *every* later gap (extension, dashboards, API, growth loops, funding) is
> dead-on-arrival without them. You cannot sell a school a "cohort dashboard" (10) with no user
> accounts (3) and no measured outcome (4); you cannot ship an extension (5) that emits the same
> hardcoded-source slop the chatbot does (2); you cannot raise the grant the whole business plan rests
> on without the efficacy number (4) that needs the ledger (1) and identity (3).

---

## GAP 1 — THE MEASUREMENT SUBSTRATE (Defense Ledger + real SRS) ⭐ KEYSTONE

**What it is.** A single append-only event store — one row per defensive act a user performs (`surface,
layer, technique, outcome, confidenceBefore/After, sources`) — plus a **working** spaced-repetition
scheduler. Designed in `10_STRATEGY_product-injection.md §1` (`ledger.ts`) and
`10_STRATEGY_cognition-science.md §6`, but **neither exists in code**: there is no `ledger.ts`, and
`/api/srs/route.ts` is a 9-line health stub. `sm2.ts` exists (pure, correct) but **nothing calls it**.

**Why it matters (trajectory).** This is the spine the entire product theory stands on. The philosophy
says EAL builds *named, measurable* cognitive defenses; the business plan's North-Star metric is
"Verified Defenses Delivered"; the cognition science says immunity must be *measured, never asserted*
and that one-shot inoculation **decays** so boosters are mandatory. **All three are vaporware without a
ledger and a live SRS.** With no event log: no immunity meters, no decay, no boosters, no CIS, no
vulnerability fingerprint, no proof-of-change, no honest "this is what you built." Every downstream
gap (efficacy, dashboards, passport, teach-forward credit) reads from this substrate. It is the
cheapest high-leverage thing missing.

**Effort: M.** Schema + KV-backed `/api/ledger` (promote the stub) + wire `sm2.ts` into a scheduler +
derive the 8 meters. Pure/deterministic core is TDD-able in days; the engines it reads already exist.

**Dependencies.** Needs **durable persistence** — today `kvStore` silently falls back to local-FS JSON
when KV isn't configured, so the ledger would evaporate per-deploy. So Gap 1 is coupled to provisioning
real KV/Redis, and is far more valuable once **Identity (Gap 3)** gives events a stable owner.

**Roadmap slot.** **Phase 0, first build.** It is item #1 in the product-injection build order for a
reason — nothing measures behavior change without it.

---

## GAP 2 — RUNTIME ONE-LAW ON EVERY CHATBOT (the shared pipeline) ⭐ KEYSTONE

**What it is.** Extract the gold-standard `/api/ai/debunker` chain into one reusable
`runVerificationPipeline()` (`src/lib/pipeline/verify.ts`) and point **every** chatbot and training
payoff at it. Designed in full in `10_STRATEGY_tools-wiring.md`. **Not built:** no `src/lib/pipeline/`
exists, and `/api/ai/chat` — the bot mounted on the cognition pages — still answers from model memory
with **hardcoded, non-resolvable `sources`** and **never calls `enforceOneLaw`**.

**Why it matters (trajectory).** This is the single most acute **live violation of the project's own
constitution**, on its most-used surface. The One-Law is the brand's "life insurance" (the GTM doc
names a single bad output as the trust-collapse risk). A misinformation-defense product whose own
chatbot fabricates sources is self-refuting — and it is the exact "AI-slop, no-retrieval, fake-sources"
build the Standard bans. Fixing it both removes an existential trust liability **and** unlocks the
training payoffs (debate-sim refutation, live-deception exit card, MIST remediation) that are currently
narrated over static content. One fix, compounding returns.

**Effort: M.** The hard parts (evidence RAG, logic-layer, enforcer, rotator) all exist; this is
*orchestration + deletion of hardcoded arrays + prompt-builder swap*, plus the `<ScientificShield>` /
`<EvidenceChips>` UI. Largely a refactor of working code.

**Dependencies.** None blocking — can start now. Synergizes with Gap 6 (same enforcer governs content)
and Gap 8 (the cross-verify + rotator need cost-guarding once every chat turn hits ≥2 providers).

**Roadmap slot.** **Phase 0, alongside Gap 1.** Step 1–3 of the tools-wiring build order.

---

## GAP 3 — IDENTITY & THE DURABLE USER ACCOUNT ⭐ KEYSTONE

**What it is.** A real authentication + account layer (passwordless/OTP or OAuth, plus the existing
hashed-ID pattern for privacy). Today there is **no auth dependency in the project at all** and
persistence is hashed-anonymous KV that, absent KV config, lands in local-FS.

**Why it matters (trajectory).** Everything the product and business plans promise as *longitudinal* —
streaks, the Inoculation Passport, the 8 decaying meters, the 30-day durability re-test, certificates
tied to a person, cohort tracking, teach-forward attribution, B2C "Pro," school seats — requires a
**stable user** to attach to. Anonymous-only means a user's "immunity" resets on every device/clear,
which destroys the retention engine *and* the funder/efficacy story (you cannot show a pre→post delta
for a user you can't re-identify). It is also the precondition for **every revenue lane** (you cannot
bill, seat-license, or certify a ghost). The BLACKBOX/no-logging ethos is preserved by keeping identity
minimal and hashed — but "minimal identity" still must *exist*.

**Effort: M.** A scoped passwordless/email-OTP + session layer; deliberately thin to honor privacy.
The schema and KV pattern already exist; this is the missing front door.

**Dependencies.** Pairs with durable KV (shared with Gap 1). Unblocks 4, 10, 11, and the whole §1
B2C/cert revenue stack.

**Roadmap slot.** **Phase 0/early Phase 1.** Must land with or immediately after the ledger so events
have an owner before the public launch generates them.

---

## GAP 4 — THE EFFICACY ENGINE (pre/post proof — the fundable number) ⭐ KEYSTONE

**What it is.** The closed loop that produces EAL's **one citable claim**: *people measurably get
harder to fool.* The pieces are half-present (`/api/mist` scores and persists; `/api/assessment` stores
pre/post; `/api/assessment/export` gives CSV/JSON) but the **engine** — held-out MIST split for
post-tests, the 30-day re-administration, the CIS aggregator, the distrust-drift guard (`realNewsBias`
tracked separately), and the *reporting* of the delta — is not assembled. The N=84 pilot is referenced
everywhere but the instrument that turns it into a published delta is not wired end-to-end.

**Why it matters (trajectory).** This is the literal hinge of the business plan. *Every* funding tier
(OTF, Mozilla, Luminate, OSF, GNI, EMIF) and *every* institutional sale demands measured impact; the
econ doc's headline ("under $1 to protect a citizen for a year") and the GTM's North-Star both resolve
to *"the MIST delta moved."* Without the efficacy engine, EAL is an impressive demo asking funders to
take impact on faith — the weakest possible fundraising position. With it, EAL has the one thing most
civic-tech tools lack: **a deployed, reproducible, honest pre/post instrument.** It is also the
project's own §11 "proof test" — and the honest design (real *and* fake items, distrust-drift flagged)
is itself a credibility asset.

**Effort: M.** Mostly aggregation + a held-out split + a re-test scheduler over instruments that exist.

**Dependencies.** Needs the **Ledger (1)** for continuous accuracy/calibration inputs and **Identity
(3)** to re-administer at 30 days to the same person. This is why 1+3 must precede it.

**Roadmap slot.** **Phase 0 → Phase 1 exit gate.** The Phase-0 milestone in the GTM plan *is* "MIST-20
pre/post delta documented." It is the deliverable that unlocks the first grant.

---

## GAP 5 — THE BROWSER EXTENSION (defense at the point of exposure)

**What it is.** An MV3 extension that fires EAL's analysis in-feed (Facebook/X/YouTube/WhatsApp Web):
claim sensor, image/video badge with calibrated forensics, decontext catcher, hadith guard,
"add-to-today's-rep." Designed in `10_STRATEGY_product-injection.md §7`. **Not built** — `manifest.json`
is only a PWA manifest; no extension scaffold exists.

**Why it matters (trajectory).** The GTM doc names the extension the **keystone distribution channel**
and the daily-habit surface — the thing that converts EAL from a destination you must remember into an
ambient layer that meets the user *inside* the manipulation. It is where the trained reflex actually
fires, where retention lives, and a local moat a global player won't build for Egyptian/Arabic context.
It is the highest-leverage *growth* lever — but it is deliberately ranked below the keystones because
an extension that emits the same un-enforced output as the chatbot (Gap 2) would propagate the trust
risk into the wild, and one that can't "add to today's rep" (Gap 1) loses half its value.

**Effort: L.** New MV3 client, side panel, store review/distribution, privacy hardening — but it is a
*thin client over existing APIs*, no new intelligence.

**Dependencies.** Hard-depends on **Gap 2** (it must call the enforced pipeline) and benefits from
**Gap 1** (the rep loop). Privacy posture ties to **Gap 12**.

**Roadmap slot.** **Phase 1** (Egypt beachhead launch), after the pipeline and ledger are live. Last
item in the product-injection build order.

---

## GAP 6 — THE CONTENT ONE-LAW GATE (ContentAtom + CI)

**What it is.** A build-time gate that makes shipping an **unsourced lesson** impossible — the
`ContentAtomSchema` + `scripts/verify-content.ts` that reuses `enforceOneLaw`/`classifyTier` on
*authored* content, designed in `10_STRATEGY_standard-content.md`. Today's `validate-content.ts` only
checks MDX frontmatter; the atom-level provenance/grading gate (hadith must carry a grade, verse must
carry context, Tier-C auto-downgrades to CONTESTED) **does not exist**.

**Why it matters (trajectory).** The philosophy's own corollary: *"a confident lesson with no source is
the same failure as a confident chatbot with no source."* The curriculum is large (144 days,
fallacy/case banks) and increasingly AI-drafted — exactly where an ungraded hadith, a stripped verse,
or a "studies show…" with no study slips in. The §4 Islamic protocol calls the ungraded hadith the
*single worst violation*; one such item in a religious lesson is a reputational and theological
landmine. The gate is the structural safeguard that lets EAL scale content authoring (and accept
AI-drafted atoms) without scaling its risk — and it doubles as the license-attribution check.

**Effort: M.** Schema + CI script reusing existing enforcer primitives; then a migration to hydrate
existing curriculum into atoms (the long tail).

**Dependencies.** Reuses the enforcer (shared with Gap 2). Independent of identity/ledger — can run in
parallel.

**Roadmap slot.** **Phase 0/1**, before the religious-shield and large content pushes ship to users.

---

## GAP 7 — ABUSE, SAFETY & CRISIS HARDENING AT SCALE

**What it is.** The safety envelope around a tool that, by design, handles suicide/self-harm disclosure
(crisis route, hotlines), religious incitement, medical claims that can kill (insulin/steroid cases),
and adversarial inputs (prompt injection, jailbreaks to make the bot *generate* convincing
disinformation, abuse of the "Build-a-Lie" forge). Pieces exist (`/api/crisis`, toxicity, content-safety,
a mindframe safety test) but there is **no unified abuse model**: rate-limiting is present in only one
lib, the forge/live-deception generators can be turned into a disinformation factory, and crisis
escalation isn't systematically guaranteed across every surface a disclosure could appear on.

**Why it matters (trajectory).** This is the gap whose failure mode is *human harm and legal/reputational
catastrophe*, not lost engagement. A misinformation tool that can be jailbroken into producing
polished Arabic disinformation, or that mishandles a suicide disclosure in a training chat, is an
existential event — far worse for a *trust* brand than for an ordinary app. As EAL moves from demo to
public Egypt launch (Phase 1), the input distribution turns adversarial and vulnerable simultaneously.
The mission ("we fight manipulation; we cannot deploy or enable it") makes this non-negotiable.

**Effort: M.** Consistent rate-limit middleware, an abuse/jailbreak guard on generative routes, a
crisis-detection pass wired into *every* chat surface (not just the crisis page), synthetic-content
labeling on all forge output, and an incident runbook.

**Dependencies.** Touches the shared pipeline (Gap 2) and the chatbot surfaces; benefits from
observability (Gap 8) to detect abuse.

**Roadmap slot.** **Phase 0→1 gate.** Before public launch; you cannot open the doors to a vulnerable
population without it.

---

## GAP 8 — OBSERVABILITY + COST-GUARD FOR THE FREE-TIER ROTATOR

**What it is.** (a) Product analytics/event telemetry to actually *count* the North-Star and the funnel
(no `@vercel/analytics`/posthog/sentry is wired). (b) A **rotator health + quota dashboard** and
circuit-breakers, because the entire cost model rests on free provider tiers whose **rate limits and
ToS are the real constraint** (and which "often forbid resale," per the monetization doc).

**Why it matters (trajectory).** Two trajectory risks converge here. First, the business plan's own
sensitivity analysis says the model is **fragile to exactly one thing**: a provider killing/capping its
free tier. Without observability on the rotator, the first sign of that is a user-facing outage, not an
alert. Second, **you cannot improve or fund what you cannot measure** — "Verified Defenses Delivered,"
K-factor, extension retention, FLIP-completion are all currently uncountable, so neither the product
loop nor the funder report can be evidenced. This is cheap insurance on the single largest structural
risk, plus the instrumentation every other growth claim depends on.

**Effort: S–M.** Drop-in analytics + Sentry; a rotator-quota/cost panel and 429-aware breakers (the
multi-provider rotator already exists to fall back across).

**Dependencies.** Privacy-respecting analytics must honor the BLACKBOX ethos (event *that* a defense
happened, not *what* was read) — ties to Gap 12. Feeds Gap 4 and Gap 7.

**Roadmap slot.** **Phase 0.** Instrument before launch so Phase-1 numbers exist; the cost-guard before
traffic hits free-tier ceilings.

---

## GAP 9 — THE TEACH-IT-FORWARD VIRAL LOOP (WhatsApp-native)

**What it is.** The "send the 1-line rebuttal to one person" mechanic — the IREX teach-forward habit
that is both the ~1.5-yr persistence driver *and* the zero-CAC growth engine. Today there are only
scattered `wa.me`/`navigator.share` references; there is **no instrumented share/rebuttal loop**, no
WhatsApp-inbound verifier, and no attribution of installs/returns to shares.

**Why it matters (trajectory).** The GTM thesis is that **growth and mission are the same act** — the
defense rides the same WhatsApp/Facebook rails the lie used, at CAC ≈ $0. This is how EAL reaches the
exact low-income, underbanked population that can never pay and that B2C must never gate. Without an
instrumented teach-forward loop, EAL has no organic distribution and must buy reach it can't afford —
collapsing the whole free-public-good-funded-by-institutions model. It is also a measured retention
mechanic (the share is the user's own retrieval practice), not a vanity share.

**Effort: M.** Pre-composed AR/EN rebuttal generator (exists in `/api/whatsapp-analyzer`) → share with
UTM/attribution → K-factor measurement; plus an opt-in WhatsApp inbound path (more setup, do last).

**Dependencies.** Needs the **Ledger (8 meters/attribution)** and **Observability (K-factor)**; the
inbound WhatsApp path needs the **enforced pipeline (Gap 2)**.

**Roadmap slot.** **Phase 1**, as the core viral loop of the Egypt beachhead launch.

---

## GAP 10 — THE INSTITUTIONAL LAYER (teacher / cohort dashboard)

**What it is.** The B2B/B2G product surface: a teacher/admin dashboard to enroll a cohort, assign the
curriculum, track per-student progress and pre/post MIST deltas, issue bulk certificates, and (later)
SSO/LMS integration. The certificate generator exists (`/api/certificate/generate`, HMAC-signed) and
the assessment store exists, but the **multi-user admin/cohort layer is missing** (the only admin
artifact is a single `supervisor-dashboard.tsx`).

**Why it matters (trajectory).** Schools are the GTM's *funded, measurable, institutional* channel —
one signed school = hundreds of users + a paying/grant relationship + a credibility reference + a
teacher-evangelist. The monetization doc puts schools, certification, and white-label as core revenue;
none are sellable without a cohort dashboard. This is the surface that converts the efficacy number
(Gap 4) into *recurring institutional money* and turns reach into revenue.

**Effort: L.** Multi-tenant roles, cohort management, teacher dashboard, certificate issuance at scale,
SSO. Real product surface, not a refactor.

**Dependencies.** Hard-depends on **Identity (3)**, **Ledger (1)**, and **Efficacy (4)** — it is the
institutional *view* of those three. Cannot meaningfully precede them.

**Roadmap slot.** **Phase 2** (MENA/institutional), after the keystones prove the consumer loop and the
efficacy delta exists to sell.

---

## GAP 11 — THE PACKAGED VERIFICATION API (the scalable revenue engine)

**What it is.** The 80 routes turned into a **productized, metered, documented Arabic-first verification
API** — keys, tiers, quotas, SLAs, dashboard, docs — plus a **ToS-clean, cost-controlled inference
path** for paid/commercial use. Today the routes exist but are internal; there is no API product, no
metering, no commercial-safe inference path (the rotator's free tiers forbid resale).

**Why it matters (trajectory).** The monetization doc calls this the **highest-leverage, most-defensible
revenue lane** — Arabic-native claim-checking, forensics, hadith-authenticity grading, and
fallacy/bias detection packaged for developers, newsrooms, banks (anti-social-engineering), and
platforms. It is the lane with the highest ceiling and the structural margin advantage. But it is
ranked below the keystones and the consumer loops because (a) it needs the **commercial inference
path** the econ doc flags as "the first serious infrastructure investment," and (b) it is a different
go-to-market that should follow consumer/institutional traction, not lead it.

**Effort: L.** API gateway, metering/billing, key management, docs, *and* the paid/self-hosted
inference path (the real cost cliff). A genuine platform build.

**Dependencies.** Needs **Observability/cost-guard (8)** to meter, **Identity/billing (3)**, and the
**commercial inference path** (a net-new infra investment). Independence guardrails from **Gap 12**
(selling the tool, never an editorial kill-switch).

**Roadmap slot.** **Phase 2+.** After consumer proof; concurrent with institutional scale.

---

## GAP 12 — TRUST & GOVERNANCE SPINE (independence, audit, IFCN posture)

**What it is.** The explicit, durable mechanisms that keep EAL *trustworthy and independent* as money
and government enter: a public methodology/transparency page, an IFCN-aligned posture, a
revenue-concentration cap (no funder/contract > ~30–40%), contractual "no editorial kill-switch"
clauses for any B2G/platform deal, a fiscal-sponsorship/legal structure, a privacy/data-handling policy
honoring BLACKBOX, and an audit trail for outputs. These are *named* across the business and standard
docs but are not yet a built/operational governance layer.

**Why it matters (trajectory).** EAL operates in a politically sensitive space — **45.7% of Egyptian
misinformation touches state projects, some of it pro-state framing.** The business plans correctly
flag that the largest revenue (B2G, platforms) is also the largest threat to independence, and that one
captured output or one mishandled political claim collapses the trust the whole product runs on.
Governance is not bureaucratic overhead here — it is the **moat and the survival condition**:
independence *is* the product's truth claim. It also unblocks funding (most strong funders can't grant
to an individual/for-profit; the fiscal-sponsor structure is a gating prerequisite the econ doc says to
do "early").

**Effort: M.** Mostly policy, structure, and a transparency surface (low code), but high-stakes and
requires legal/relationship work — hence not S.

**Dependencies.** The fiscal-sponsorship piece gates **Tier-2 funding** and should precede major
B2G/API deals; the privacy policy ties to **Gaps 8 and 5**.

**Roadmap slot.** **Phase 0 (fiscal sponsor + transparency page) → ongoing.** The structural pieces
before the first institutional grant; the contractual guardrails before any government/platform deal in
Phase 2.

---

## THE DEPENDENCY MAP (why order matters)

```
            PHASE 0 (keystones + safeguards — mostly connective, cheap-to-medium)
   ┌──────────────────────────────────────────────────────────────────────┐
   │  [3] Identity ──┬──► [1] Ledger + real SRS ──┬──► [4] Efficacy Engine  │  ← unlocks the
   │  (durable KV) ──┘     (8 meters, boosters)  ──┘     (the fundable #)    │     first grant
   │                                                                        │
   │  [2] Shared Pipeline (One-Law on every bot) ──► fixes live violation   │
   │  [6] Content One-Law Gate     [7] Abuse/Crisis     [8] Observability   │
   │  [12] Fiscal sponsor + transparency (governance seed)                  │
   └───────────────┬────────────────────────────────────────────────────────┘
                   ▼  PHASE 1 (Egypt beachhead — growth on top of proof)
            [5] Browser Extension     [9] Teach-it-forward viral loop
                   ▼  PHASE 2 (MENA + revenue — monetize the proven loop)
            [10] Institutional dashboard   [11] Verification API   [12] B2G guardrails
```

**The four keystones (1, 2, 3, 4)** are the cheapest cluster and the one that converts EAL from
"impressive arsenal" to "measurable, trustworthy, fundable product." Build them first; the other eight
become tractable — and individually fundable — only after.

---

## WHAT IS *NOT* ON THIS LIST (and why)

To keep the 12 honest, the things deliberately excluded as **lower-trajectory** despite being real work:
the React/CSS polish on the Descent, more curriculum days, additional forensic providers, more
inoculation mini-games, MSA/dialect variants, the diaspora pricing tier, and deeper Layer-8 calibration
content. All worthwhile — none *changes the trajectory* the way a missing measurement substrate, a
trust-breaking chatbot, or the absence of any user account does. **The arsenal is not the gap. The
nervous system, the proof, and the doors are.**

---

### Provenance of this audit
- **Codebase, verified 2026-06-24** under `C:/Users/pc/Desktop/EGY/New folder (20)/egyptian-awareness-library/`:
  `src/app/api/srs/route.ts` (stub), `src/app/api/ai/chat/route.ts` (hardcoded sources, no enforcer),
  `src/lib/cognition/{sm2,mist,flicc,flicc-classifier,doctor-test}.ts` (real), `src/lib/db/kv-store.ts`
  (KV-or-local-FS fallback), `src/app/api/{assessment,certificate/generate,mist}/route.ts` (real),
  `scripts/validate-content.ts` (MDX-only), `package.json` (no auth/analytics deps), `public/manifest.json`
  (PWA only), `tests/` (11 test files), absence of `src/lib/pipeline/` and `src/lib/cognition/ledger.ts`.
- **Strategy:** the four `RESEARCH_VAULT/STRATEGY/10_STRATEGY_*.md` (cognition-science, product-injection,
  tools-wiring, standard-content).
- **Business:** `RESEARCH_VAULT/STRATEGY/20_BUSINESS_{monetization,gtm-market,econ-funding}.md`.
- **Philosophy/standard:** `01_PHILOSOPHY_DIGEST.md`, `HI CLAUDE/00_THE_SCIENTIFIC_STANDARD.md`.
