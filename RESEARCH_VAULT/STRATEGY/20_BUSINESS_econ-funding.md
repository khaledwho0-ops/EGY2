# EAL — Unit Economics & Funding Path

> **Purpose:** A concrete, numbers-driven model of what it costs to run the Egyptian Awareness Library per active user, where the gross margin sits, how long the cash lasts under three scenarios, and a named, sequenced funding path through media-literacy / press-freedom / civic-tech / MENA grant programs.
>
> **Method:** Costs are derived from the *actual* stack documented in `02_API_CAPABILITY_MAP.md` (NVIDIA-first helper, the 14-key Mega-Rotator across 6 providers, free academic APIs, Cohere free-tier rerank, Pinecone, Vercel). Where a public price is used it is named inline. Figures are planning estimates, not audited accounts — every assumption is stated so it can be challenged and re-run.
>
> **The strategic claim in one line:** EAL's architecture was *designed* to push marginal AI cost toward zero (free-tier rotation + free academic APIs + deterministic local engines), which means the binding constraint is **not** server cost — it is **distribution, trust, and grant runway**. The economics exist to make EAL *fundable as a public good*, not to chase per-user revenue.

---

## 0. Cost philosophy — why the marginal user is nearly free

EAL is unusual: most AI products bleed money per call because they pay OpenAI/Anthropic list prices. EAL was built to *not* do that. Three structural choices collapse marginal cost:

1. **Free-tier provider rotation, not paid inference.** The Mega-Rotator v7 spreads load across ~13 key slots over 6 providers (Gemini ×5, Groq ×4, NVIDIA ×5, OpenRouter ×2, Cerebras ×2, Together, SambaNova), each on a free developer tier, with cooldown/round-robin. The NVIDIA-first helper runs Nemotron-3 Ultra on NVIDIA NIM's free build credits. **Effective $/token paid today ≈ $0** until free quotas are exhausted; the cost is *rate-limit headroom*, not dollars.
2. **Free-first academic + fact-check APIs.** OpenAlex, Semantic Scholar, Europe PMC, DOAJ, Crossref, arXiv, CORE, PubMed/NCBI, Google Fact Check, WHO GHO, openFDA, RxNorm, Internet Archive, Wikipedia — all free. The Evidence Aggregator's grounding layer costs $0/call.
3. **Deterministic local engines do the cheap work.** Fallacy engine, bias engine, VADER-style sentiment, Arabic NLP, EXIF/JPEG/C2PA forensics, MIST-20 scoring, COVO router — all run in-process with **zero** external spend. They also act as an *early-exit* layer that prevents many queries from ever reaching a paid model.

The economic consequence: **gross margin per active user is dominated by fixed platform subscriptions (Vercel, Pinecone, Cohere, optional SerpAPI/Sightengine), not by variable per-call cost.** The model below treats that explicitly.

---

## 1. Cost structure — the three layers

### Layer A — Fixed platform floor (paid monthly regardless of usage)

| Line item | Plan | Monthly USD | Notes |
|---|---|---:|---|
| Vercel | Pro (1 seat) | **$20** | App + serverless/edge functions. Free Hobby tier (non-commercial) = **$0** in pre-grant phase. |
| Vercel function overage | usage-based | $0–40 | Only once traffic is real; included usage covers MVP. |
| Pinecone | Serverless (pay-as-you-go) | **$0–25** | `cognitive-fortress` index, 3 namespaces. Serverless starter has a free allowance; small index stays near floor. |
| Cohere Rerank | Free Trial tier | **$0** | rerank-v3.5; trial = 1,000 calls/mo, rate-limited. $0 until upgrade. |
| Domain + email | — | **$2** | ~$15–25/yr domain amortized + free tier email. |
| Error/uptime monitoring | free tiers | **$0** | Vercel Analytics free slice + free Sentry/UptimeRobot tiers. |
| **Fixed floor (lean / pre-grant)** | | **≈ $22–47/mo** | The entire platform runs for the price of a streaming subscription. |
| **Fixed floor (funded / scaled)** | | **≈ $200–400/mo** | Vercel Pro + overages, Pinecone standard, Cohere Production, SerpAPI/Sightengine paid. |

### Layer B — Variable AI inference (the part the architecture zeroes out)

| Component | List-price equivalent | What EAL actually pays | Why |
|---|---|---|---|
| LLM generation (chat, debunk, agents, GOD-system) | ~$0.15–5 / 1M tok depending on model | **~$0** while inside free quotas | Mega-Rotator over 6 free providers + NVIDIA NIM free credits |
| Embeddings (RAG) | OpenAI text-embedding-3-small ~$0.02 / 1M tok | **near $0** | Tiny corpus; embed-once, query-many; router can fall to free providers |
| Rerank | Cohere ~$2 / 1K searches (paid) | **$0** on trial | Free tier covers MVP volume |
| Vision/forensics | NVIDIA NIM vision (free) → Gemini vision (free) | **$0** | Deterministic EXIF/JPEG/C2PA does most of the work first |
| Content safety / moderation | NVIDIA Nemotron Content Safety (free) | **$0** | In-stack |
| Academic + fact-check retrieval | mostly free APIs | **$0** | OpenAlex now needs a *free* key (mailto pool sunset ~Feb 2026) |

> **The honest caveat (and the real cost):** "free" is a *rate-limit budget*, not infinite. The true variable cost is **engineering time to keep the rotator healthy** (rotating keys, adding providers, handling 429s) plus the **eventual paid-tier cliff** when free quotas can't absorb traffic. The model below prices that cliff explicitly as the "post-free" scenario.

### Layer C — Human / operating cost (the real budget)

For a mission-driven public good, **people are the cost**, not servers. A realistic lean operating budget:

| Role | FTE | Annual USD (MENA-adjusted) |
|---|---:|---:|
| Founder/lead engineer (stipend) | 1.0 | $24,000–40,000 |
| Part-time Arabic content/fact-check editor | 0.5 | $9,000–15,000 |
| Part-time community / distribution lead | 0.5 | $9,000–15,000 |
| Contractor pool (design, security audit, legal) | — | $8,000–15,000 |
| Infra + tools + paid API cliff buffer | — | $4,000–8,000 |
| **Lean annual burn** | **~2.0 FTE** | **≈ $54,000–93,000/yr** |

A **minimum-viable** version (solo founder + volunteers, free tiers only) burns **≈ $6,000–12,000/yr** — essentially infra + one modest stipend. This is the number that makes EAL *survivable without funding* while grants are pursued.

---

## 2. Unit economics — cost & margin per active user

**Definition.** An **MAU (monthly active user)** is someone who runs ≥1 analysis-bearing action in a month (a debunk, a GOD-system run, a forensic check, a chat session). A heavy user runs ~30–50; a typical user ~3–6.

### 2.1 Marginal cost per MAU

Assume an average active user triggers **~8 LLM-bearing actions/month**, each averaging ~3K input + 1.5K output tokens after the local early-exit layer filters cheap queries — so ~36K tokens/user/month.

| Scenario | $/1M tokens (blended) | AI cost / MAU / mo | + share of fixed floor | **Total cost / MAU / mo** |
|---|---:|---:|---:|---:|
| **A. Free-tier (today)** | ~$0 | **$0.000** | floor ÷ MAU | dominated by fixed floor only |
| **B. Post-free, cheap paid** (Groq/Gemini Flash/DeepSeek paid tiers) | ~$0.20 blended | **$0.0072** | — | **< $0.05** all-in at 5K+ MAU |
| **C. Premium paid** (if forced onto GPT-4o-class for "verify") | ~$3.00 blended | **$0.108** | — | **~$0.12–0.18** |

**Reading this:** even in the pessimistic Scenario C, fully-loaded marginal cost is **under $0.20/MAU/month**. In the realistic Scenario B it is **under 1 cent of inference** plus a shrinking slice of the fixed floor. The fixed floor amortizes fast:

| MAU | Fixed floor (lean $35/mo) ÷ MAU | + Scenario B inference | **Fully-loaded cost/MAU/mo** |
|---:|---:|---:|---:|
| 100 | $0.350 | $0.007 | **$0.357** |
| 1,000 | $0.035 | $0.007 | **$0.042** |
| 10,000 | $0.0035 (floor rises to ~$300 → $0.030) | $0.007 | **~$0.037** |
| 50,000 | floor ~$600 → $0.012 | $0.007 | **~$0.019** |

> **Key insight:** Beyond ~1,000 MAU the per-user cost flattens to **3–4 US cents/month**. At 10K MAU, total monthly run cost is **roughly $370–700** all-in. EAL can serve a city for the price of a small SaaS bill.

### 2.2 Gross margin

EAL is **free to the user by mission** (cognitive immunity as a public good — see `01_PHILOSOPHY_DIGEST.md`). So "gross margin" is not measured against user revenue but against **grant/philanthropic dollars per user served**:

- **Cost to serve 1 MAU for a full year (Scenario B, 10K-MAU scale):** ≈ **$0.45–0.85/user/year**.
- A **$50,000 grant** therefore covers **~60,000–110,000 user-years of service** on infra alone — the rest of the grant is people.
- Stated as a funder-facing metric: **cost-per-protected-citizen ≈ under $1/year.** This is the headline number for every grant application.

If a **values-aligned revenue layer** is ever added (optional, never gating the core tool):

| Revenue line | Price | Gross margin | Notes |
|---|---|---:|---|
| Institutional/NGO API or white-label dashboard | $200–1,000/mo per org | **~90%+** | Marginal cost ~cents; price is for support + SLA + branding |
| "Defender" supporter tier (donation, perks only) | $3–10/mo | **~97%** | Patreon-style; never paywalls a debunk |
| Training/workshop licensing (schools, journalists) | $500–5,000/cohort | **~80%** | Human-time-bound, not infra-bound |
| Verified-certificate issuance for institutions | $1–3/cert | **~95%** | HMAC-signed sovereign certs already built |

Because marginal cost is near-zero, **any** of these is structurally high-margin. The strategy is **grant-funded core + optional institutional revenue to extend runway**, never a consumer paywall.

---

## 3. Runway scenarios

Starting assumption for scenarios: a **seed pool** and a **lean burn** that scales with hiring. Three cases.

### Scenario 1 — Bootstrap / survival (no grant yet)
- **Burn:** $6K–12K/yr (solo founder stipend-light + free tiers).
- **Cash on hand:** assume $5K personal/seed.
- **Runway:** **5–10 months** at the floor; **indefinite** if founder is unpaid and only infra ($400–600/yr) must be covered.
- **Goal of this phase:** ship the product, get N≈84→500 pilot users, generate the *evidence pack* (pre/post MIST-20 deltas already instrumented via `/api/assessment`) that every grant requires.

### Scenario 2 — First grant landed ($25K–75K)
- **Burn:** $54K–93K/yr (2 FTE lean team).
- **Runway on a single $50K grant:** **~7–11 months** of the 2-FTE team, OR **~4+ years** if kept at minimum-viable burn.
- **Goal:** convert pilot evidence into a published efficacy result + 2–3 partner institutions (a university, a fact-check org, a press-freedom NGO). De-risks the next, larger grant.

### Scenario 3 — Anchor grant / multi-funder ($150K–400K over 18–24 mo)
- **Burn:** $120K–200K/yr (3–4 FTE + audits + distribution budget).
- **Runway:** **18–24 months**, the standard project-grant horizon.
- **Goal:** 10K–50K MAU, independent evaluation, regional expansion template (Egypt → MENA), and a diversified funder base so no single political/funding shock kills the project.

### Sensitivity — the only thing that breaks the model
The model is robust to user growth (cost stays in cents). It is **fragile** to two risks, both *non-financial*:
1. **Free-tier provider policy change** (a provider kills its free tier or rate-caps hard). Mitigation: 6-provider diversity + budget the Scenario-B paid cliff ($4–8K/yr buffer already in Layer C). Even fully paid, 10K MAU ≈ <$1K/mo.
2. **Distribution & trust**, not cost, is the real constraint. The dollars are easy; reaching Egyptians and being believed is hard. Funding should be spent disproportionately on *distribution and credibility*, not infrastructure.

---

## 4. Funding path — named programs, sequenced

EAL sits at the intersection of **media literacy, press freedom, counter-disinformation, civic tech, and MENA digital rights** — which is a *dense* funding landscape. The path below is sequenced from fastest/easiest to largest/slowest. **Always verify current open calls and eligibility before applying — programs and amounts change; confirm on each funder's site.**

### Tier 1 — Fast, founder-friendly, non-dilutive (apply first, 0–6 months)

| Funder / program | Fit | Typical size | Why it fits EAL |
|---|---|---|---|
| **Open Technology Fund (OTF)** — Internet Freedom Fund + Rapid Response Fund | Strong | $50K–900K (IFF); small/fast (RRF) | Funds anti-censorship, counter-disinfo, digital-security tools for closed/closing societies. MENA is a priority region. Open-source requirement aligns with EAL's transparency. |
| **Mozilla Technology Fund / Mozilla Foundation awards** | Strong | $10K–50K | Trustworthy-AI and anti-disinformation themes; loves open, AI-accountability tooling. |
| **Prototype Fund-style / DfPI micro-grants** | Medium | $5K–50K | Early civic-tech prototypes; good for the pilot-evidence phase. |
| **Google.org / Google News Initiative (GNI)** — fact-checking & media-literacy challenges | Strong | $25K–300K | Recurrent open calls for fact-checking innovation and media literacy; Arabic/MENA cohorts have been funded. |
| **Meedan / Check Global community fund + partnerships** | Strong | in-kind + small grants | Arabic-first misinformation tooling; potential tech partner *and* funder/distributor. |
| **RightsCon / Digital Rights small grants & fellowships** | Medium | fellowship-scale | Network + small money + credibility in the digital-rights world. |

### Tier 2 — Core institutional grantmakers (apply at pilot-evidence stage, 3–12 months)

| Funder / program | Fit | Typical size | Notes |
|---|---|---|---|
| **National Endowment for Democracy (NED)** | Strong | $25K–150K/yr | Funds independent media, civic education, countering disinformation in the region. *Note the geopolitical optics of US-democracy funding inside Egypt — assess carefully; may favor a diaspora/regional registration.* |
| **Luminate (Omidyar Network spinout)** | Strong | $100K–500K+ | Core thesis = healthy information ecosystems, civic empowerment. Funds counter-disinfo and media literacy directly. |
| **Open Society Foundations (OSF)** — Information & Digital Rights / regional programs | Strong | $50K–500K | Long history funding information integrity and MENA civil society. |
| **Knight Foundation** | Medium | $25K–250K | US-centric on media, but funds media-literacy and trust-in-information tools; possible for a US fiscal-sponsor structure. |
| **Ford Foundation — Technology & Society / BUILD** | Medium | $100K–1M | Funds public-interest tech and information integrity; larger, slower, relationship-driven. |
| **IFCN (Poynter) grants + signatory pathway** | Strong | $10K–100K + credibility | Becoming an IFCN signatory is itself a *trust asset*; IFCN runs fact-checking innovation grants. |

### Tier 3 — Large / strategic / regional (12+ months, post-traction)

| Funder / program | Fit | Typical size | Notes |
|---|---|---|---|
| **EU — European Media and Information Fund (EMIF, via Calouste Gulbenkian Foundation)** | Strong | €10K–100K+ | Dedicated to fighting disinformation and media literacy; MENA-adjacent projects with EU partners are eligible. Partner with an EU-based org. |
| **EU NEAR / EuropeAid civil-society & media calls (Southern Neighbourhood)** | Medium | €100K–1M+ | Large MENA civil-society envelopes; bureaucratic, consortium-based. |
| **UNESCO — Media & Information Literacy / IPDC** | Medium | $10K–100K | MIL is a flagship UNESCO theme; IPDC funds media-development projects, Egypt is a member state. |
| **Internews** (as partner/sub-grantor) | Strong | sub-grants + capacity | Major implementer of media/information-integrity programs in MENA; better as a *partner who sub-grants* than a direct funder. |
| **GIZ / FCDO / Dutch (NL) MFA digital-rights funds** | Medium | varies | Bilateral donors funding MENA digital rights and counter-disinfo; usually via consortia. |
| **Patrick J. McGovern Foundation / Siegel Family / Schmidt Futures (AI-for-good)** | Medium | $50K–500K | AI-public-interest funders; EAL's responsible-AI architecture is the hook. |
| **Wikimedia / Internet Society Foundation grants** | Medium | $10K–250K | Knowledge-integrity and internet-resilience angles. |

### Tier 4 — Compute & in-kind (pursue continuously, reduces burn directly)

| Program | What it gives | Why it matters |
|---|---|---|
| **NVIDIA Inception** | Cloud/compute credits, NIM access, technical support | EAL already runs NVIDIA NIM-first — natural fit; directly extends the free-inference runway. |
| **Google for Startups / Google Cloud credits + Gemini** | up to ~$200K cloud credits (program-dependent) | Underwrites the Gemini rotator legs and any GCP infra. |
| **Microsoft for Startups Founders Hub / Azure + GitHub Models** | Azure + OpenAI credits, GitHub Models access | EAL already calls GitHub Models (gpt-4o-mini) — credits cover the "verify" tier cliff. |
| **AWS Activate / Cloudflare for Startups** | cloud + edge credits | Edge/CDN + backup infra. |
| **Pinecone / Cohere / Together / Cerebras startup programs** | vector-DB + inference credits | Directly subsidizes the exact paid lines in Layer A/B. |
| **Vercel OSS / startup credits** | hosting credits | Covers the platform floor. |

### Fiscal sponsorship & structure (do this early)
Many of the strongest funders cannot grant to an individual or an Egyptian for-profit. **Secure a fiscal sponsor or a fitting legal home before Tier 2:** a US 501(c)(3) fiscal sponsor (e.g., open-source/civic-tech sponsors), or an EU/regional NGO partner. This unlocks NED/Knight/Ford/EMIF without standing up a full entity, and lets sensitive funders route money safely given the Egyptian operating context.

---

## 5. The 0–18 month funding sequence (concrete)

| Phase | Months | Action | Money target |
|---|---|---|---|
| **0. Bootstrap** | 0–3 | Run on free tiers + NVIDIA Inception + cloud-credit programs. Ship MVP, instrument MIST-20 pre/post. | $0 cash, ~$200K in-kind credits |
| **1. Pilot evidence** | 2–6 | Hit 500–2,000 users; produce the efficacy pack (immunity-delta data). Apply OTF RRF, Mozilla, GNI/Google.org, Meedan. | $10K–75K |
| **2. Institutionalize** | 6–12 | Secure fiscal sponsor. Become IFCN-adjacent. Apply NED, Luminate, OSF, EMIF (with EU partner). | $50K–250K |
| **3. Anchor + diversify** | 12–18 | Land one anchor grant (OSF/Luminate/Ford/EMIF). Add 2–3 co-funders so no single funder >40% of budget. | $150K–400K |
| **4. Sustain** | 18+ | Layer optional institutional revenue (NGO dashboards, training, certs) to reach a grant-light steady state. | recurring |

---

## 6. The one-paragraph pitch to a funder (uses these numbers)

> EAL makes Egyptians **immune** to misinformation rather than removing content — a bottom-up, permanent cognitive-immunity layer, Arabic-first, with a hard rule that *no claim reaches a user without a real, resolvable source*. Because it runs on a self-healing rotation of free AI tiers and free academic APIs, **it costs under $1 to protect one citizen for a year**, and the marginal user is effectively free. A **$50K grant funds ~100,000 user-years of service plus a lean two-person team for the better part of a year.** We are not asking funders to subsidize servers — the architecture already solved that. We are asking them to fund **distribution and trust**: getting a proven cognitive-defense tool into the hands of the people a closing information environment most endangers.

---

## 7. Assumptions log (challenge these)

1. Free-tier provider quotas remain usable through 2026; modeled cliff = Scenario B at $0.20/1M blended.
2. Avg active user = ~8 LLM-actions/mo @ ~4.5K tokens each, after local early-exit. Heavy users skew higher but are a minority.
3. Lean FTE comp uses MENA-adjusted stipends, not US salaries — a US team triples Layer C.
4. Fixed floor scales stepwise (Vercel/Pinecone/Cohere tier jumps), not linearly; modeled at ~$300/mo by 10K MAU, ~$600/mo by 50K MAU.
5. All grant sizes are *typical ranges* from these programs' public histories — **confirm current open calls and amounts at application time.** Eligibility (esp. for US-government-adjacent funders operating into Egypt) must be assessed for safety and optics.
6. Revenue lines are *optional runway extenders*, explicitly subordinate to the free-public-good mission; none may paywall a debunk.
