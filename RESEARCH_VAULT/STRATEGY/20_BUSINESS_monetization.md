# 20 — BUSINESS: EAL Monetization Strategy

> **What this is.** The complete revenue design for the Egyptian Awareness Library (EAL): every realistic way the platform can earn money without betraying the mission. For each model: *who pays, for what, how much, and why it fits a mission-driven misinformation-defense product.*
>
> **Grounding (the numbers this is built on):**
> - **Product reality:** ~40 user-facing tools across 102 API routes, 5 engines (DeepReal forensics, Mental Health, Religion Hub, Medical Life, BLACKBOX) + GOD-System orchestrator, dual-mandate (scientific + Islamic), Arabic/Egypt-first. Source: `RESEARCH_VAULT/eal_feature_inventory.md`, `02_API_CAPABILITY_MAP.md`.
> - **Cost reality:** the AI stack is a multi-provider rotator over **free/near-free tiers** (NVIDIA NIM, Gemini, Groq, OpenRouter, Cerebras, Together, SambaNova, HuggingFace) with free Tier-S academic APIs (OpenAlex, Crossref, Semantic Scholar, EuropePMC). Marginal cost per query today ≈ **near zero**. Source: `02_API_CAPABILITY_MAP.md §0`. This is the single most important fact for pricing — **gross margin on software is structurally very high**; the binding constraints are rate limits and provider ToS, not compute bills.
> - **Market reality:** Egypt misinformation rate **14.5%** of all monitored information (2025), up from 13.8% (2024); state-project misinfo **45.7%**, economic **20.3%**, health **11%**; WhatsApp + Facebook are the dominant vectors. Source: Egyptian Cabinet Media Centre, 2025 (via `study_the_problem.md §1`).
> - **The binding constraint on monetization (The One Law):** "No claim reaches the user without a real, resolvable source." Source: `01_PHILOSOPHY_DIGEST.md §0`. **Every revenue model below is filtered through one test: does it create any incentive to fabricate, inflate confidence, or suppress an abstention?** Models that fail that test are explicitly rejected at the end of this doc.

---

## 0. The strategic frame: why this product can be monetized honestly

A misinformation-defense product has a unique commercial problem and a unique commercial gift.

**The problem:** the people who most need it (low-income WhatsApp users being scammed on exchange rates, drug prices, and miracle cures) are the *least* able to pay, and charging them per-debunk would be obscene and would gate the mission. So **B2C can never be the financial engine** — it is a funnel, a credibility-builder, and a data/distribution asset, not the profit center.

**The gift:** EAL is simultaneously (a) a consumer awareness product, (b) a **verification API/SaaS** (the same forensic, fact-check, hadith-authenticity, and source-tiering stack that powers the UI is already exposed as 102 routes), and (c) an **impact instrument** that maps cleanly onto donor and government priorities (media literacy, public health, counter-extremism, youth, Arabic-language AI safety). The same engineering serves three buyers who value it for three different reasons and pay through three different doors.

**The core monetization thesis:**
> **Keep the consumer product free or near-free (mission + funnel). Charge institutions and developers for the verification stack, structured access, certification, and white-label deployments. Fund the runway and the public-good mission with grants/impact capital. Cross-subsidize, deliberately and transparently.**

This is the **Wikipedia/Signal/Mozilla pattern crossed with a Twilio/Stripe API business**: a free public good on top of a paid infrastructure/enterprise layer, topped up by mission funding. Below, every lane is specified.

**Revenue lanes at a glance:**

| # | Lane | Who pays | Mission fit | Time-to-revenue | Ceiling |
|---|------|----------|-------------|-----------------|---------|
| 1 | B2C freemium + Pro subscription | Individuals, prosumers | Funnel, not engine | 3–6 mo | Low–medium |
| 2 | Paid certification / credentials | Learners, teachers, journalists, employers | Strong | 6–12 mo | Medium |
| 3 | B2B — schools & universities | Education institutions | Strong | 6–12 mo | Medium–high |
| 4 | B2B — NGOs, journalism, platforms | Newsrooms, NGOs, social platforms | Strong | 6–18 mo | Medium |
| 5 | B2G — ministries (education/health), agencies | Government | Strong but slow/political | 12–36 mo | High |
| 6 | API / SaaS licensing of the verification stack | Developers, apps, platforms | Very strong | 6–12 mo | High (scalable) |
| 7 | White-label / managed deployments | Institutions wanting their own instance | Strong | 9–18 mo | Medium–high |
| 8 | Grants & impact funding | Foundations, donors, dev agencies | Native | 0–9 mo | Medium (non-dilutive) |

A note on currency: figures are given in both **EGP and USD**. Use a planning rate of **~1 USD ≈ 48–50 EGP** (mid-2026 band; the EGP is volatile — Layer-1 misinformation fodder in its own right — so contracts with foreign buyers should be USD-denominated and domestic consumer pricing should be EGP-denominated and revisited quarterly).

---

## 1. B2C — Freemium + "EAL Pro" subscription

**Who pays:** individual Egyptians/Arabic speakers who get real personal value beyond casual use — power users, parents managing family WhatsApp groups, students, content creators, small-business owners, diaspora.

**The freemium line (what stays free forever — non-negotiable, mission core):**
- All **crisis and safety** features: mental-health hotlines (16328 / 08008880700 / 123), crisis flow, doctor-syndicate imposter check, drug checker. *Never gated. Charging a panicking person to verify a suicide hotline or a fake doctor is a mission violation.*
- A **generous daily quota** of the core debunking tools (e.g. 5–10 free claim checks / WhatsApp analyses / forensic scans per day) — enough that 95% of casual users never hit the wall.
- Full read access to the Kill-List archive, the educational/inoculation games (Swarm Debate, Live Deception X-Ray, MIST-20 test), and the religion/medical reference lookups.

**What "EAL Pro" adds (≈ 99–149 EGP / month, ~$2–3; or 990 EGP / yr, ~$20):**
- **Unlimited** debunks, forensic scans, paper audits, and GOD-System runs.
- **Priority compute** (skip the free-tier rotator queue; routed to faster providers).
- **Batch + history**: save investigations, export PDF reports with citations, re-run on a schedule.
- **Family/parent mode**: monitor a shared "claims inbox" for a family WhatsApp group; weekly digest of what's circulating + ready-to-paste rebuttals.
- **Bias Fingerprint + Inoculation Passport pro**: full longitudinal tracking, decay alerts, deeper personal vulnerability analytics.
- **Browser/WhatsApp companion**: forward a message to an EAL number/bot and get a verdict (see Lane 6 for the API plumbing).

**Pricing logic & reality check:**
- Egypt is **price-sensitive**. Anchor against what Egyptians already pay for digital subscriptions: a Netflix mobile plan in Egypt is ~**EGP 100/mo**, Spotify Individual ~**EGP 80–100/mo**, YouTube Premium ~**EGP 80/mo**, ChatGPT Plus **$20/mo (~EGP 1,000)** which is *expensive* for the mass market and only prosumers buy it. EAL Pro at **~99 EGP/mo** sits deliberately at the "one streaming service" psychological price point — affordable to the prosumer segment, trivially cheap globally.
- **Local payment rails matter more than price**: support **Fawry, Vodafone Cash, Orange Cash, Etisalat Cash, InstaPay, Meeza cards** — not just international Visa/Mastercard. A large share of Egyptians are underbanked; card-only checkout would kill conversion. (Apple/Google in-app billing as a secondary path for the mobile app.)
- **Diaspora premium tier**: the same Pro at **$5–8/mo** for users outside Egypt (detected by billing geography), who can pay more and often want to verify what their families back home are forwarding.

**Realistic conversion math (deliberately conservative):**
- Misinformation-defense is a "vitamins not painkillers" purchase for most → expect **low free-to-paid conversion: 1–3%**.
- Illustrative: 200,000 registered free users → ~2% Pro → 4,000 paid × 99 EGP × 12 = **~4.75M EGP/yr (~$95K)**. At 1M users and 2%: ~**24M EGP/yr (~$475K)**.
- **Verdict:** B2C subscription is a *real but secondary* line. It will not fund the company alone, and trying to make it do so creates pressure to paywall the mission. Treat it as **margin + a top-of-funnel that proves traction to grant-makers and institutional buyers.**

**Mission-fit:** High *if* the free tier stays genuinely useful and all safety features stay free. The One-Law test passes cleanly: Pro buys *more* and *faster* verification, never *different/looser* verification. **There is exactly one red line: a paid verdict must never differ from a free verdict.** Confidence is derived from sources and cross-model consensus, not from whether the user paid.

---

## 2. Paid certification & credentials ("Cognitive Immunity" certificates)

**Who pays:** learners who want a credential; teachers/trainers who want to be certified to teach the curriculum; journalists/editors; and *employers/institutions* who pay to certify cohorts.

**What they pay for:** a **proctored, verifiable certificate** in misinformation resistance / digital media literacy / source verification, built on assets EAL already has — the MIST-20 susceptibility test, the FLICC fallacy curriculum, the inoculation games, and the Bias Fingerprint. The certificate attests a measurable, pre/post-tested improvement in misinformation resistance, with a **public verification URL** (itself an instance of the One Law: the credential is a resolvable, checkable claim).

**Products & pricing:**
- **Individual certificate (self-paced):** ~**299–499 EGP (~$6–10)** per exam attempt; free to learn, pay to certify. Diaspora/international: **$25–40**.
- **Educator certification ("Certified EAL Trainer"):** ~**1,500–3,000 EGP (~$30–60)**; lets a teacher run the curriculum and issue sub-certificates; recurring annual recertification (immunity decays — the product literally measures this, so recert is honest, not a money-grab).
- **Cohort/employer certification:** institutions buy seats in bulk (see B2B/B2G). A newsroom certifying 50 staff, or a bank certifying its customer-service team against social-engineering/phishing, pays **per-seat** at ~**200–400 EGP/seat** with volume discounts.

**Why this fits & why it sells:** certification turns a *free educational good* into a *paid signal of competence* without paywalling the education itself — you learn free, you pay only for the verified credential. This is the Coursera/Google-Career-Certificates model. It aligns with employers' real, growing need: **anti-phishing / social-engineering training** is already a budgeted line item in banks, telecoms, and government; EAL's version is Arabic-native and broader (it covers political/health/religious manipulation, not just IT security).

**Realistic scale:** credentials are a **medium** line — meaningful margin, slow to build trust/recognition. The unlock is **accreditation/endorsement** (a university, a syndicate like the Press Syndicate or Medical Syndicate, or a ministry recognizing the cert). Until then price it modestly and use it primarily as a B2B/B2G door-opener.

---

## 3. B2B — Schools & Universities

**Who pays:** private K-12 schools (international and national), language schools, and universities (public and private) — initially the **private** segment that has discretionary budgets and competes on "21st-century skills."

**What they pay for:**
- **Classroom/campus license** to the full platform with a **teacher dashboard**: assign inoculation games and the 14-day cognitive-defense curriculum, track per-student Bias Fingerprint progress, run pre/post MIST-20 to *evidence* learning gains (schools love measurable outcomes for parents and accreditation).
- **Curriculum + lesson plans** mapped to the FLICC framework, in Arabic, ready to drop into a "critical thinking / digital citizenship" slot.
- **Bulk student certificates** (Lane 2).
- **LMS integration** (Google Classroom / Microsoft / Moodle) and SSO.

**Pricing (per-seat, annual, volume-tiered):**
- Private K-12 / language schools: **~80–150 EGP/student/yr (~$1.6–3)**, min. commitment per campus. A 1,000-student school ≈ **80K–150K EGP/yr (~$1.6–3K)**.
- Universities: **site license ~150K–600K EGP/yr (~$3K–12K)** depending on enrollment, plus certificate revenue share.
- **Public schools:** generally *cannot* pay these rates → reach them through the **ministry (B2G, Lane 5)** or a **donor-funded program (Lane 8)**, not direct sales.

**Anchor:** Egyptian private schools already pay per-seat for ed-tech (e.g. learning platforms, English programs, exam prep) in the tens-to-low-hundreds of EGP/student/year range; EAL fits that envelope as a "digital citizenship / critical thinking" line. Internationally, media-literacy programs (e.g. Newsela, Checkology by the News Literacy Project) price per-school/per-district — EAL is the Arabic-first analogue with live AI tools, not just static lessons.

**Mission-fit:** Excellent. Building cognitive immunity in students *is* the bottom-up, permanent, distributed mission. Selling to schools scales the mission and the revenue together.

---

## 4. B2B — NGOs, journalism organizations & social platforms

Three distinct buyers under one lane.

### 4a. Newsrooms & journalism organizations
- **Who/what:** newsrooms, fact-check desks, and broadcasters buy a **professional verification workbench** — the forensic suite (image/video/audio/EXIF/ELA/deepfake/C2PA), reverse-search + lateral-reading (SIFT) packets, paper-auditor, source-tiering, and the AI agent investigators — as a daily tool for desk verification, plus **API access** (Lane 6) to plug into their CMS.
- **Pricing:** seat-based SaaS, **~$30–80/seat/mo** for pro forensic tooling (benchmark: pro OSINT/forensic and social-verification tools sit in this band; EAL undercuts on price and wins on Arabic + Islamic-context coverage that Western tools lack). A 10-seat desk ≈ **$3.6K–9.6K/yr**.
- **Fit:** very strong — newsrooms live by sourcing discipline, which *is* the One Law.

### 4b. NGOs & civil society (media-literacy, public-health, human-rights, fact-checking orgs)
- **Who/what:** they license EAL to deliver programs — campaign dashboards, the misinfo atlas/threat-map for monitoring narratives across governorates, toxicity/incitement detection, bulk training + certification for their beneficiaries.
- **Pricing:** **program/project-based**, **$5K–50K** per program depending on reach, usually **donor-funded** (the NGO is the buyer, a foundation is the ultimate payer — overlaps with Lane 8). Offer **mission pricing / free tier for small grassroots orgs** to preserve goodwill and reach.
- **Fit:** native. NGOs are both customers and distribution partners.

### 4c. Social platforms & messaging providers
- **Who/what:** platforms with Arabic/Egyptian user bases (and especially **WhatsApp/Meta-adjacent ecosystems**) need **Arabic-dialect misinformation classification, deepfake detection, and incitement/toxicity scoring** — exactly EAL's differentiator. Sold as **API/volume licensing** (Lane 6): claim check-worthiness, manipulation-layer scoring, hate-speech/sectarian detection, deepfake probability.
- **Pricing:** **enterprise usage-based**, **$X per 1,000 calls** with committed monthly minimums; realistically **$20K–250K+/yr** per platform deal. This is the **highest-ceiling B2B line** but also the longest sales cycle and the one with the most political/ToS sensitivity (platform partnerships in Egypt touch government).
- **Fit:** strong on capability, but **carries the most risk to independence** — a platform or government-linked buyer could pressure outputs. Mitigate by contracting the *tool* (scores, evidence packets) and never the *verdict editorial* — EAL provides the analysis; the buyer decides moderation. The One Law stays intact because EAL never agrees to suppress a sourced finding.

---

## 5. B2G — Ministries & government agencies

**Who pays:** Ministry of Education & Technical Education, Ministry of Health & Population, Ministry of Communications & IT (ICT/Digital Egypt), the Cabinet's Information & Decision Support Center (IDSC) / Media Centre (which *publishes the very misinformation statistics this product cites*), youth and religious-affairs bodies (e.g. Dar al-Iftāʾ / Al-Azhar adjacency for the religion hub), and counter-extremism programs.

**What they pay for:**
- **National media-literacy rollout** in public schools (curriculum + platform + teacher certification at population scale) — the single biggest possible deal.
- **Public-health misinformation monitoring** (health is 11% of Egypt's misinfo; vaccine/drug/miracle-cure claims) — a dashboard + rapid-response debunk service for the health ministry.
- **Election/crisis-period monitoring** of narrative spread (threat-map / atlas) for IDSC-type bodies.
- **Counter-extremism / sectarian-incitement detection** in Arabic.

**Pricing & deal shape:**
- Government deals are **large, slow, and procurement-bound**: think **multi-year contracts $100K–$1M+** for national rollouts, priced as platform license + per-seat curriculum + services/training. A ministry rollout to even 10% of Egypt's ~25M students at a *heavily discounted* public rate of ~20 EGP/student/yr is **~10M EGP (~$200K)/yr** — and that is the floor of what a real national program looks like.
- Expect **public-procurement tenders, local-entity requirements, data-residency, and political vetting**. Budget 12–36 months and a local partner/reseller.

**Mission-fit & the hard caveat:** B2G is where mission and money align *at the largest scale* (reaching the public-school majority that can never pay) **and** where independence is most at risk. The Cabinet Media Centre already frames misinformation as a national problem — that's the opening. **But** a state customer that funds the platform can be tempted to define "misinformation" politically (note: state-project misinformation is **45.7%** of the total — some of which is *pro-state* framing). 

**Hard guardrails for any B2G deal:**
1. EAL sells **method and tooling**, never a content kill-switch or an editorial line.
2. The **One Law and the public source-tier whitelist are contractually non-negotiable** — outputs are sourced or marked UNVERIFIED, full stop.
3. **No exclusivity** that would let government gate citizen access to the free tier.
4. Diversify so **no single government contract exceeds a capped share of revenue** (target <30–40%), to keep the power to walk away.

---

## 6. API / SaaS licensing of the verification stack (the scalable engine)

**This is the highest-leverage, most-defensible revenue lane.** EAL has *already built* 102 routes — a full **Arabic-first verification API**: claim check-worthiness (ClaimBuster-style), fact-check aggregation, evidence/source-tiering, image/video/audio forensics + deepfake + C2PA, hadith-authenticity grading, scholar/doctor authority verification, fallacy/bias detection, toxicity/incitement, and the GOD-System orchestrated verdict. None of this exists, packaged and Arabic-native, anywhere else.

**Who pays:** developers, startups, super-apps, banks (anti-fraud/social-engineering), insurers, telcos, e-commerce (review/listing fraud), newsrooms (Lane 4a), platforms (Lane 4c), and other ed-tech/civic-tech builders.

**What they buy:** metered API access to individual capabilities or bundles, with SLAs, keys, dashboards, and docs.

**Packaging & pricing (usage-based, the Twilio/Stripe/Sightengine pattern):**

| Tier | Price | Who | Includes |
|------|-------|-----|----------|
| **Free / Dev** | 0 | Builders, students, researchers, civic hackers | ~1,000 calls/mo, rate-limited, attribution required, non-commercial |
| **Starter** | ~$49/mo | Small apps | ~25K calls/mo, basic forensics + fact-check |
| **Growth** | ~$299/mo | Funded startups, newsrooms | ~250K calls/mo, full forensic + agents, priority |
| **Scale / Enterprise** | custom, $2K–20K+/mo | Platforms, banks, telcos, gov | Millions of calls, SLA, on-prem/VPC option, custom models, support |
| **Per-call overage** | ~$0.5–5 per 1,000 calls | all | tiered by capability (forensics/deepfake cost more than text classification) |

**Margin reality (the killer advantage):** because the underlying inference runs on a **multi-provider free-tier rotator** (NVIDIA NIM, Gemini, Groq, etc.) and **free Tier-S academic/fact-check APIs**, EAL's marginal cost per call is **far below** what it can charge — and far below competitors paying retail OpenAI/Anthropic rates. *Caveat for the business model, stated honestly:* those free tiers have **rate limits and ToS that often forbid resale**. A commercial API at scale will require either (a) negotiated/paid commercial tiers with one or more providers, or (b) self-hosted open models (the stack already includes open models like Nemotron, Llama, Mistral, Kimi). **The first serious infrastructure investment should be a cost-controlled, ToS-clean inference path for the paid API.** Even at paid-inference rates, gross margins of 70–90% are achievable because the per-call token counts are small and many capabilities (EXIF, C2PA, source-tiering, rule-engine fallacy/bias) are **deterministic and use no LLM at all**.

**Mission-fit:** very strong and *self-reinforcing*. Every developer who builds on the API extends cognitive immunity into apps EAL would never build, and the **free dev tier keeps the public good open**. The One Law travels with the API: every response ships sources + a confidence enum, so downstream apps inherit the abstention discipline.

---

## 7. White-label / managed deployments

**Who pays:** institutions that want EAL's capability **under their own brand and control** — a ministry that wants a national-branded portal, a large newsroom or media group, a Gulf government or NGO wanting a localized instance, a university research center.

**What they pay for:** a **branded, configured, hosted (or on-prem/VPC) instance** of the platform or a subset of engines, with their logo, their content priorities, their data staying in their environment, plus setup + training + support.

**Pricing:** **setup fee $20K–100K + annual license/support $30K–250K**, scaling with engines included, user count, and hosting model. This is a **services-heavy, high-touch** line — fewer, bigger deals.

**Mission-fit:** strong, with the same independence guardrails as B2G. White-labeling the *tooling* is fine; white-labeling a way to *suppress sourced findings* is not — the One Law ships with the instance and is contractually fixed.

**Gulf/regional expansion note:** the Arabic-first + Islamic-context stack is **uniquely exportable** to GCC and the broader Arab world, where budgets are larger (Saudi/UAE digital-government and media spend dwarfs Egypt's). The same product, white-labeled, is plausibly a **higher-revenue line abroad than at home** — Egypt is the proving ground and mission heart; the Gulf is the margin.

---

## 8. Grants & impact funding (the runway and the conscience)

**Who pays:** philanthropic foundations, development agencies, press-freedom and media-literacy funders, public-health funders, Big-Tech civic/AI-safety funds, and Arabic-language-AI / digital-rights programs. This is **non-dilutive, mission-native money** that should fund the **public-good core** (the free tier, the curriculum, the open dev API) so that commercial lanes never have to compromise it.

**Plausible funder archetypes & what they fund:**
- **Media-literacy & journalism funders** (e.g. press/journalism foundations, Google News Initiative / Meta journalism-type programs, IFCN-adjacent fact-checking grants): fund the verification workbench, fact-check partnerships, and IFCN-style methodology.
- **Public-health funders** (global-health foundations, WHO-adjacent infodemic-management programs — WHO has a literal "infodemic management" agenda): fund the Medical Life engine and health-misinfo rapid response.
- **Digital-rights / open-internet funders** (e.g. open-tech funds, digital-defenders programs): fund Arabic-language tooling, anti-censorship-compatible architecture, and the open API.
- **AI-safety / responsible-AI funds** (frontier-lab social-impact funds, academic AI-safety grants): fund the One-Law provenance engine and cross-model-consensus research — EAL is a *working, deployed* example of grounded, abstaining, sourced AI in a low-resource language, which is genuinely fundable research.
- **Development agencies & multilaterals** (UNESCO media-literacy, UNDP, EU neighborhood programs, bilateral development funds): fund national/regional rollouts and teacher training.
- **Local/regional philanthropy** (Egyptian and Gulf foundations, university research centers, Islamic-knowledge institutions for the religion hub).

**Realistic grant scale:** seed/pilot grants **$10K–50K**; program grants **$50K–250K**; multi-year institutional grants **$250K–1M+**. A blended target of **$150K–500K/yr in grants in years 1–3** is realistic for a credible team with a deployed product and measurable outcomes — and the product's built-in MIST-20 pre/post measurement is *exactly* the impact evidence funders demand.

**Mission-fit:** native — this is the purest mission money. **The discipline:** treat grants as **runway to build the earned-revenue lanes**, not as a permanent crutch. Foundations fund momentum, not maintenance; a product that is *only* grant-funded at year 5 is a red flag to the next funder. The narrative to tell funders: *"Grants build the public good; the API/B2B/B2G lanes make it self-sustaining; you are buying permanence, not dependence."*

---

## 9. Putting it together — phased rollout & blended model

**The cross-subsidy in one sentence:** *Grants + B2G + API + white-label fund the free consumer product and the open dev tier; the consumer product is the funnel, the credibility, and the impact evidence that win the grants and the institutional deals.* It is a flywheel, not four separate businesses.

**Sequencing (what to turn on when):**

- **Phase 0 — Now (0–6 mo): Free + traction + first grant.** Ship the free consumer product wide. Launch EAL Pro and the free Dev API tier (cheap to run, generates the usage data and developer goodwill). Win one **pilot grant** and one **lighthouse institutional pilot** (a private school or a newsroom) — even free/discounted — to generate case studies and outcome data.
- **Phase 1 — (6–18 mo): Earned revenue lanes.** Open paid API tiers (Starter/Growth) and B2B school/newsroom seats. Stand up certification. Land 1–2 NGO program deals (donor-funded). Secure a multi-year program grant. **Goal: prove three independent revenue doors work.**
- **Phase 2 — (18–36 mo): Scale + government + region.** Pursue a B2G ministry rollout and enterprise API/platform deals; launch white-label, with the Gulf as the margin play. **Goal: earned revenue covers core opex; grants now fund expansion, not survival.**

**Illustrative blended revenue at modest maturity (year ~3, conservative, planning-grade not a forecast):**

| Lane | Conservative annual |
|------|---------------------|
| B2C Pro (≈400K users, ~2% paid) | ~$90K |
| Certification | ~$40K |
| Schools/universities (a few dozen campuses) | ~$120K |
| NGO/newsroom programs | ~$120K |
| API/SaaS (long tail + a few Scale deals) | ~$200K |
| White-label (1–2 deals) | ~$120K |
| **B2G** (one program, if it lands) | ~$200K–500K |
| **Grants** | ~$250K |
| **Blended total** | **~$0.9M–1.4M/yr** |

The point of the table is not the total — it's that **no single lane exceeds ~30–40% of revenue**, which is exactly the diversification that protects the mission's independence.

---

## 10. What we will NOT do (rejected models — and why)

Stated explicitly because in a misinformation-defense product, *how you make money is part of the product's truth claim.* A platform that fights manipulation cannot fund itself by manipulating.

- **❌ Programmatic ads / ad-tech.** Ad incentives reward engagement and dwell time, which reward outrage and fear — the exact dynamics EAL exists to defuse. Ads also create surveillance/data-broker pressure. **Hard no.** (A narrow exception: *non-tracking, clearly-labeled sponsorships* from aligned mission partners — e.g. a university or foundation — are acceptable, because they don't shape outputs.)
- **❌ Selling user data / behavioral profiles.** The Bias Fingerprint and BLACKBOX explicitly promise privacy (BLACKBOX is "no logging"). Monetizing that data would detonate the trust the whole product runs on. **Hard no.**
- **❌ Pay-to-pass / pay-for-a-better-verdict.** A paid verdict that differs from a free verdict violates the One Law. Pro buys *speed, volume, convenience, history* — never a *different truth*. **Hard no.**
- **❌ "Reputation management" / paid debunking-to-order.** Selling someone the service of "debunking" their critics, or burying inconvenient-but-true claims, is the abuse case of this exact toolset. **Hard no**, and worth an explicit ToS prohibition.
- **❌ Gating crisis/safety features.** Hotlines, crisis flow, doctor/drug checks stay free forever. **Hard no.**
- **❌ Government or platform contracts with an editorial kill-switch or output-suppression clause.** EAL sells method and evidence, never the power to make a sourced finding disappear. **Hard no.**

**The single governing principle for all monetization:** *money may buy access, speed, scale, support, and a credential — it may never buy a change in what is true, a suppression of an abstention, or the user's data.* Every model above is built to respect that line; every model in this section crosses it.
