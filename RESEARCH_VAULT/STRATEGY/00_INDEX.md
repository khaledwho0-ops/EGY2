# 00 — THE STRATEGY VAULT: MASTER INDEX

> **What this is.** The single front door to EAL's strategy vault — the one page you read first.
> It gives the whole strategy + business + roadmap on one page, a linked map to every file in this
> folder, and the **Top 10 Next Actions** that turn the plan into shipped product. Everything here is
> a *navigation + priority* layer; the depth lives in the files it links to.
>
> **Governing law (it governs this index too).** *"No claim reaches the user without a real, resolvable
> source. If we cannot ground it, we say so — loudly — and we never fabricate to fill the gap."*
> (`01_PHILOSOPHY_DIGEST.md §0`.) Every claim below traces to a vault file; figures carry their source.
>
> **Binding read order.** `01_PHILOSOPHY_DIGEST.md` → the four `10_STRATEGY_*.md` → the three
> `20_BUSINESS_*.md` → `30_TWELVE_GAPS.md` → `40_USER_ROADMAP.md`. This index sits *above* all of them
> as the orientation + sequencing lens.
>
> **Last updated.** 2026-06-24.

---

## 1. EXECUTIVE SUMMARY (THE WHOLE STRATEGY ON ONE PAGE)

**What EAL is.** The Egyptian Awareness Library is an Arabic/Egypt-first misinformation-defense and
cognition-training platform: ~40 user-facing tools across ~80–102 API routes and 5 engines (DeepReal
forensics, Mental Health, Religion Hub, Medical Life, BLACKBOX) plus a GOD-System orchestrator, built
on a deliberately free/near-zero-cost multi-provider AI stack (NVIDIA NIM + a 14-key Mega-Rotator over
6 providers, layered on free academic + fact-check APIs). It runs under one constitution — **the One
Law**: no claim reaches the user without a real, resolvable source; *fail loud, never fake.*

**The problem it answers.** Egypt's monitored-misinformation rate is **14.5%** (2025, up from 13.8% in
2024); **45.7%** of it touches state projects, 20.3% economic, 11% health — riding WhatsApp and Facebook.
The science is settled enough to build on: *technique-based inoculation* (Cambridge SDMLab; Bad News
game; cross-cultural N≈5,061, Cohen's d 0.24–0.41) builds resistance that generalizes — but **no Arabic
/ MENA validated instrument exists.** That gap is EAL's opportunity. (`03_VERIFIED_SOURCES.md`,
`20_BUSINESS_monetization.md §0`.)

**The one-line diagnosis (`30_TWELVE_GAPS.md`).** EAL has built an extraordinary **arsenal** (forensics,
evidence RAG, the One-Law enforcer, the cognition spine, the Descent) — the hard part, largely done. What
it has *not* built is the **nervous system** that turns the arsenal into a measurable, defensible,
fundable, self-propagating product. The risk is no longer *"can we build the tools?"* — it is *"can we
prove they work, keep them trustworthy at runtime, and get them into hands?"*

**The strategy in four moves.** Four injection layers (`10_STRATEGY_*.md`) describe the build:
(1) **product-injection** — the Defense Ledger, the daily rep, the meters, the extension; (2)
**tools-wiring** — one enforced `runVerificationPipeline()` behind every chatbot; (3)
**cognition-science** — measured inoculation, decay, boosters, the efficacy instrument; (4)
**standard-content** — a build-time One-Law gate so no unsourced lesson ships. These are *if-we-build-it*
designs; `30_TWELVE_GAPS.md` ranks them against business reality and names the four keystones.

**The business in one thesis (`20_BUSINESS_*.md`).** Keep the consumer product **free at the point of
need** (mission + funnel + zero-CAC distribution), and charge **institutions and developers** for the
verification stack, certification, cohort dashboards, white-label, and a metered API; fund the runway
with media-literacy / press-freedom / civic-tech grants. Marginal AI cost ≈ $0 today, so gross margin
is structurally very high and the binding constraints are **distribution, trust, and grant runway** — not
compute. The headline economic claim: *under ~$1 to protect a citizen for a year.* The single
fundability hinge: **a deployed, honest pre→post MIST-20 delta** — the one citable claim that *people
measurably get harder to fool.*

**The roadmap (`40_USER_ROADMAP.md`).** An 8-level user journey (L0 First Touch → L8 Mastery/Certified)
runs on a 9-milestone build (B0 security/RAG in flight → B8 API + governance). The build deliberately
ships the **nervous system (B1–B3: ledger, identity, daily loop, efficacy, content gate) before the
growth surfaces (B5+: extension, viral loop, cohorts, API)** — because an extension or a school dashboard
with no ledger, no identity, and no enforced pipeline is dead on arrival. North-Star metric: **Verified
Defenses Delivered.** Phase-0/1 exit gate: **MIST-20 pre/post delta documented** — the deliverable that
unlocks the first grant.

**The critical path.** Four keystone gaps come first and everything hangs off them: **[3] Identity →
[1] Measurement Substrate (Defense Ledger + real SRS) → [4] Efficacy Engine**, with **[2] the runtime
One-Law pipeline** fixing a live constitutional violation on the most-used chatbot in parallel. They are
the *cheapest* cluster and the one that converts EAL from "impressive arsenal" to "measurable,
trustworthy, fundable product." The other eight gaps become individually tractable — and fundable — only
after.

---

## 2. TABLE OF CONTENTS (EVERY FILE IN THIS VAULT)

> Read in the order shown. ⭐ = read-first foundation. The "Anchors" column lists the file's most
> load-bearing internal references.

### Foundation — what is true and what we have

| # | File | What it is | Anchors |
|---|------|------------|---------|
| 00 | **`00_INDEX.md`** (this file) | Master index: 1-page summary, linked TOC, Top-10 next actions | the priority lens over all below |
| 01 ⭐ | [`01_PHILOSOPHY_DIGEST.md`](./01_PHILOSOPHY_DIGEST.md) | Canonical digest of the governing standard: the One Law, the Truth Stack (4 anti-hallucination strategies), source tiers, Islamic Authenticity Protocol, the 8-layer deception taxonomy, the Cognitive Defense Pipeline | distilled from `HI CLAUDE/00_THE_SCIENTIFIC_STANDARD.md` + `CLAUDE.md` |
| 02 | [`02_API_CAPABILITY_MAP.md`](./02_API_CAPABILITY_MAP.md) | Inventory of every API route, AI helper, and tool — by code audit. The provider/rotator infrastructure, the enforcer, COVO router, evidence aggregator | `src/app/api/**`, `src/lib/**` |
| 03 | [`03_VERIFIED_SOURCES.md`](./03_VERIFIED_SOURCES.md) | Sourced catalog of inoculation/media-literacy science + data (Cambridge SDMLab, Bad News, MIST, effect sizes) with license notes | the evidence base for the curriculum |

### Strategy — the four injection layers (`10_STRATEGY_*`)

| # | File | What it is | Anchors |
|---|------|------------|---------|
| 10a | [`10_STRATEGY_cognition-science.md`](./10_STRATEGY_cognition-science.md) | The measured-inoculation science layer: immunity must be measured not asserted, decay + mandatory boosters, the SRS, the efficacy instrument | feeds Gaps 1 & 4 |
| 10b | [`10_STRATEGY_product-injection.md`](./10_STRATEGY_product-injection.md) | The product layer: the Defense Ledger (`ledger.ts`), the 8 meters, the daily rep, passport, the browser extension (§7) | feeds Gaps 1, 3, 5 |
| 10c | [`10_STRATEGY_tools-wiring.md`](./10_STRATEGY_tools-wiring.md) | The runtime layer: extract the debunker chain into one `runVerificationPipeline()` (`src/lib/pipeline/verify.ts`) behind every bot | feeds Gap 2 |
| 10d | [`10_STRATEGY_standard-content.md`](./10_STRATEGY_standard-content.md) | The content layer: `ContentAtom` schema + CI One-Law gate so no unsourced lesson ships; the AR glossary | feeds Gap 6 |

### Business — money, market, runway (`20_BUSINESS_*`)

| # | File | What it is | Anchors |
|---|------|------------|---------|
| 20a | [`20_BUSINESS_monetization.md`](./20_BUSINESS_monetization.md) | The full revenue design: 6 lanes (B2C funnel, certification, schools, NGOs/platforms, B2G, API/SaaS); every lane filtered through the One Law | feeds Gaps 10, 11 |
| 20b | [`20_BUSINESS_gtm-market.md`](./20_BUSINESS_gtm-market.md) | Go-to-market + sizing: Egypt → MENA → global; beachhead, channels, North-Star, the extension as keystone channel, phased milestones | feeds Gaps 5, 9 |
| 20c | [`20_BUSINESS_econ-funding.md`](./20_BUSINESS_econ-funding.md) | Unit economics + the named, sequenced funding path (OTF, Mozilla, Luminate, OSF, GNI, EMIF); the fiscal-sponsor prerequisite | feeds Gaps 4, 8, 12 |

### Synthesis — priorities and the integrated map

| # | File | What it is | Anchors |
|---|------|------------|---------|
| 30 | [`30_TWELVE_GAPS.md`](./30_TWELVE_GAPS.md) | The priority lens: the 12 highest-leverage missing things, ranked by trajectory impact, with the 4 keystones and a dependency map | audits all of 01–20 against the real repo |
| 40 | [`40_USER_ROADMAP.md`](./40_USER_ROADMAP.md) | The integration lens: the 8-level user journey fused with the 9-milestone build roadmap (B0–B8); every feature → level → defense → business touchpoint | sequences everything in 01–30 |

---

## 3. THE TWELVE GAPS AT A GLANCE (the priority lens)

Full detail in [`30_TWELVE_GAPS.md`](./30_TWELVE_GAPS.md). Ranked by trajectory impact; ⭐ = keystone.

| # | Gap | Type | Effort | Keystone? | Build slot |
|---|-----|------|--------|-----------|------------|
| 1 | Measurement Substrate (Defense Ledger + real SRS) | Capability / Proof | M | ⭐ | B1 / Phase 0 |
| 2 | Runtime One-Law on every chatbot (shared pipeline) | Safeguard | M | ⭐ | B0–B1 / Phase 0 |
| 3 | Identity & the durable user account | Capability | M | ⭐ | B1 / Phase 0 |
| 4 | The Efficacy Engine (the fundable pre/post number) | Growth / Proof | M | ⭐ | B2 / Phase 0→1 gate |
| 5 | The Browser Extension (defense at point of exposure) | Growth lever | L | | B5 / Phase 1 |
| 6 | The Content One-Law Gate (ContentAtom + CI) | Safeguard | M | | B3 / Phase 0–1 |
| 7 | Abuse / Safety / Crisis hardening at scale | Safeguard | M | | Phase 0→1 gate |
| 8 | Observability + cost-guard for the free-tier rotator | Safeguard / Survival | S–M | | Phase 0 (cross-cutting) |
| 9 | Teach-It-Forward viral loop (WhatsApp-native) | Growth lever | M | | B5 / Phase 1 |
| 10 | Institutional Layer (teacher/cohort dashboard) | Revenue | L | | B7 / Phase 2 |
| 11 | Packaged Verification API (scalable revenue engine) | Revenue | L | | B8 / Phase 2+ |
| 12 | Trust & Governance spine (independence, IFCN, audit) | Safeguard / Moat | M | | Phase 0 → ongoing |

**Dependency spine (why order matters):** `[3] Identity → [1] Ledger+SRS → [4] Efficacy` is the funding
critical path; `[2] Pipeline`, `[6] Content gate`, `[7] Abuse`, `[8] Observability`, and `[12] Fiscal
sponsor` are the Phase-0 safeguards that must land before the public Egypt launch. Growth (5, 9) rides on
top of proof; revenue (10, 11) rides on top of growth.

---

## 4. TOP 10 NEXT ACTIONS

> Ordered for execution. Each maps to a gap (`30`) and a build milestone (`40`). Actions 1–5 are the
> Phase-0 keystone cluster — do these before anything in Phase 1. "Grounded by" notes the repo reality
> the action fixes (verified 2026-06-24).

1. **Provision durable persistence, then build the Defense Ledger + wire the SRS.** Stand up real
   KV/Redis (today `kvStore` silently falls back to local-FS, so events evaporate per-deploy); ship the
   append-only `/api/ledger` event store and connect the existing-but-uncalled `sm2.ts` into a real
   scheduler; derive the 8 immunity meters. *(Gap 1, keystone · B1 · grounded by: no `ledger.ts`,
   `/api/srs/route.ts` is a 9-line stub.)*

2. **Add a thin, privacy-preserving identity layer.** Passwordless/email-OTP or OAuth + session over the
   existing hashed-ID pattern, so streaks, the passport, the 8 meters, the 30-day re-test, and every
   revenue lane have a stable owner. *(Gap 3, keystone · B1 · grounded by: no auth dependency in
   `package.json`.)*

3. **Extract `runVerificationPipeline()` and put the One-Law behind every chatbot.** Build
   `src/lib/pipeline/verify.ts` from the gold-standard debunker chain; delete the hardcoded
   non-resolvable `sources` arrays in `/api/ai/chat`, make it call `enforceOneLaw`, and surface
   `<ScientificShield>`/`<EvidenceChips>`. This closes a **live constitutional violation on the
   most-used surface.** *(Gap 2, keystone · B0–B1 · grounded by: `/api/ai/chat` answers from model
   memory with fake sources, never calls the enforcer.)*

4. **Assemble the Efficacy Engine and publish the MIST-20 pre→post delta.** Wire the held-out MIST split
   for post-tests, the 30-day re-administration, the CIS aggregator, and the distrust-drift guard over
   the existing `/api/mist` + `/api/assessment` instruments — then *report the delta.* This is the one
   citable claim and the deliverable that unlocks the first grant. *(Gap 4, keystone · B2 · Phase-0/1
   exit gate.)*

5. **Instrument observability + a rotator cost-guard before launch.** Drop in privacy-respecting
   analytics + Sentry to make the North-Star ("Verified Defenses Delivered"), funnel, and K-factor
   countable; add a rotator quota/health panel and 429-aware circuit-breakers — the model is fragile to
   exactly one thing: a provider capping its free tier. *(Gap 8 · Phase 0, cross-cutting · grounded by:
   no analytics/observability deps wired.)*

6. **Ship the Content One-Law gate (`ContentAtom` + CI).** A build-time gate that makes shipping an
   unsourced lesson impossible (hadith must carry a grade, verse must carry context, Tier-C
   auto-downgrades to CONTESTED), reusing the existing enforcer; then migrate the curriculum into atoms.
   *(Gap 6 · B3 · grounded by: `validate-content.ts` checks MDX frontmatter only.)*

7. **Harden abuse, safety, and crisis across every surface.** Unified rate-limit middleware, a
   jailbreak/abuse guard on the generative/forge routes (so the tool can't be turned into a
   disinformation factory), synthetic-content labeling on all forge output, and a crisis-detection pass
   wired into *every* chat surface — not just `/api/crisis`. *(Gap 7 · Phase 0→1 gate.)*

8. **Establish the governance seed: fiscal sponsor + public transparency/methodology page.** The
   fiscal-sponsorship structure gates Tier-2 funding (most strong funders cannot grant to an
   individual/for-profit) and the econ doc says to do it *early*; publish an IFCN-aligned methodology +
   BLACKBOX privacy page. *(Gap 12 · Phase 0 → ongoing.)*

9. **Build the instrumented Teach-It-Forward loop.** Turn the existing `/api/whatsapp-analyzer` rebuttal
   output into a one-tap AR/EN "send to one person" share with UTM/attribution and K-factor measurement —
   the zero-CAC growth engine where growth and mission are the same act. *(Gap 9 · B5 · Phase 1, after
   Gaps 1 & 2.)*

10. **Scaffold and ship the MV3 browser extension.** A thin client over the *enforced* pipeline (claim
    sensor, forensics badge, decontext catcher, hadith guard, "add to today's rep") — the keystone
    distribution channel and daily-habit surface. Hard-depends on Gaps 2 and 1, so it is last in the
    Phase-1 cluster. *(Gap 5 · B5 · grounded by: `manifest.json` is a PWA manifest, no extension exists.)*

---

### Provenance
This index summarizes and links the eleven vault files listed in §2, all under
`RESEARCH_VAULT/STRATEGY/`. The repo-reality grounding in §1, §3, and §4 is carried from
`30_TWELVE_GAPS.md` (codebase verified 2026-06-24); build-milestone and journey-level mappings are from
`40_USER_ROADMAP.md`; market/economic figures are from `20_BUSINESS_*.md`; the One-Law and taxonomy from
`01_PHILOSOPHY_DIGEST.md`.
