# 00 — THE SCIENTIFIC STANDARD (EAL CONSTITUTION)

> **STATUS: BINDING.** This is the governing standard for the Egyptian Awareness Library.
> Every page, every chatbot, every API route, every output — from now on — MUST comply.
> If a feature cannot satisfy this standard, it does not ship. No exceptions, no "just UI" placeholders.
>
> Read order for any agent: this file → `CLAUDE.md` → the task-specific section only.

---

## 0. THE ONE LAW

> **No claim reaches the user without a real, resolvable source behind it.**
> If we cannot ground it, we say so — loudly — and we never fabricate to fill the gap.

This single rule subsumes every "no mock data" instruction. Mock data, dummy returns, placeholder
content, and confident-but-ungrounded AI text are all the SAME failure: an unsourced claim. They are
forbidden. **Fail loud, never fake.**

---

## 1. THE FORMULA

```
EAL = STRONGEST REAL TOOLS  ⊗  CONCATENATION BUILDING
```

- **Strongest real tools** — we never call one weak endpoint and hope. We call the best primary
  source for the domain (academic, institutional, fact-check, or authentic Islamic source) and we
  call several.
- **Concatenation building** — tools are *chained*, not isolated. Each feature runs the full
  Cognitive Defense Pipeline (§6): retrieve → cross-verify → ground → guard → diagnose → defend →
  emit-with-provenance. Output of one stage is the input of the next. A page that does only the
  first stage is not finished.

Every feature must answer three questions before it ships:
1. **Where did this come from?** (a Tier-listed source in §3, or an authentic Islamic source in §4)
2. **How do we know it's not hallucinated?** (which of the 4 Truth-Stack strategies in §2 applied)
3. **Which deception layer does it counter, and what's the defense?** (the 8-layer taxonomy in §5)

---

## 2. THE TRUTH STACK — 4 STRATEGIES AGAINST HALLUCINATION & FAKE DATA

These four run together. They are the project's epistemic guarantee. Each one has a concrete code
enforcement point — a strategy with no enforcement is decoration.

### Strategy 1 — GROUNDING (Retrieval-Augmented, source-first)
**Principle:** The model never answers from its own memory. It answers *over retrieved documents.*
**Mechanism:** Before any generative call, hit the Evidence Aggregator (`/api/search/evidence` →
OpenAlex + Semantic Scholar + Crossref + EuropePMC + DOAJ) and/or the domain APIs (fact-check,
Islamic, forensic). Pass the retrieved snippets into the prompt as the ONLY permitted factual basis.
**Enforcement:** No retrieval result → the feature returns "insufficient evidence," not a guess.
Retrieval happens server-side in the API route, never skipped to "save a call."

### Strategy 2 — PROVENANCE ENFORCEMENT (no-citation = no-claim, with abstention)
**Principle:** Every factual sentence carries a resolvable source. The model is *required* to say
"I don't know" when evidence is thin — abstention is a correct answer, fabrication never is.
**Mechanism:** All AI responses are returned through a **zod schema** with a mandatory
`sources: { title, url, tier }[]` field. Any claim object with an empty `sources` array is rendered
as `UNVERIFIED` (visually flagged) or dropped — it is never shown as fact.
**Enforcement:** Schema validation at the tool-call boundary; the UI has a dedicated `UNVERIFIED`
state and an evidence chip on every factual block (satisfies CLAUDE.md "every output MUST show
evidence source").

### Strategy 3 — CROSS-MODEL CONSENSUS (ensemble / self-consistency)
**Principle:** A single model's confidence is worthless. Agreement across independent models is signal.
**Mechanism:** Use the Gemini Mega-Rotator (`src/lib/ai/`, 14 keys / 6 providers) to ask ≥2
independent providers the same grounded question, or run the God-System adversarial judgment
pipeline (`src/app/god-system/`). Claims that survive agreement get HIGH confidence; claims where
models disagree are shown as **CONTESTED**, never silently resolved to one side.
**Enforcement:** Confidence score on every output ∈ {HIGH, MEDIUM, CONTESTED, UNVERIFIED}, derived
from cross-model agreement + source tier — not hardcoded. (Hardcoded scores are the exact api-swarm.ts
bug; see §9.)

### Strategy 4 — GUARDRAILS + ADVERSARIAL SELF-CRITIQUE (constrained generation)
**Principle:** Constrain the generation surface so the model cannot drift, then attack its own answer.
**Mechanism:** (a) `src/lib/ai/guardrails.ts` for safety/refusal; (b) schema-constrained output (no
free-form essays where structured data is expected); (c) low temperature for factual tasks; (d) a
final **self-critique pass** — "list every sentence in this answer not supported by the retrieved
sources" — and strip/flag those sentences before display.
**Enforcement:** The critique pass is a real second call, not a comment. Unsupported sentences are
removed or marked, never shipped as confident prose.

> **The Stack in one line:** *Retrieve real sources → demand citations or abstain → cross-check across
> models → constrain and self-critique.* Four nets. A hallucination has to beat all four to reach a user.

---

## 3. THE EVIDENCE BASE — GLOBAL SOURCE WHITELIST (TIERED)

Outputs declare which tier their evidence came from. Higher tier = higher trust. We prefer S/A and
fall back down only when forced, and we *say* when we fell back.

### Tier S — Primary academic (peer-reviewed / indexed)
OpenAlex · Semantic Scholar · Crossref · Europe PMC · DOAJ · PubMed / MEDLINE · Cochrane Library ·
ClinicalTrials.gov · arXiv · bioRxiv / medRxiv. *(OpenAlex+S2+Crossref+EuropePMC+DOAJ already wired
at `/api/search/evidence`.)*

### Tier A — Top institutions, NGOs, statistical bodies
WHO · UN / UNESCO / UNICEF · World Bank · OECD · CDC · ECDC / EFSA · Our World in Data ·
Pew Research Center · Reuters Institute for the Study of Journalism · Amnesty International ·
Egypt: CAPMAS (الجهاز المركزي للتعبئة العامة والإحصاء), Ministry of Health & Population.

### Tier A — Top journals & science press
Nature · Science · The Lancet · NEJM · BMJ · Cell · Nature Medicine · Scientific American ·
MIT Technology Review.

### Tier B — Verification, fact-check & OSINT
Google Fact Check Tools API · ClaimBuster · AFP Fact Check · Reuters Fact Check · Full Fact ·
Snopes · EU DisinfoLab · First Draft / Bellingcat (OSINT method, not opinion).

### Tier C — Community knowledge (only with citation-chasing)
Wikipedia (follow to its primary citations — never cite the article itself as the source) ·
Skeptics Stack Exchange · Cochrane plain-language summaries · Retraction Watch.

**Rule:** A Tier-C source is a *lead*, never a *proof*. Chase it to a Tier S/A primary or mark
the claim CONTESTED. Never present a Tier-C lead as established fact.

---

## 4. THE ISLAMIC AUTHENTICITY PROTOCOL (الجانب الإسلامي)

The religious side carries the same epistemic weight as the scientific side — and an extra duty of
care, because exploitation here causes the worst harm (see Layer 1 *Fabricated Hadith* and Layer 5
*Exploitative Ruqyah* in the taxonomy). The standard is non-negotiable.

### 4.1 Authentic-source hierarchy
- **Qur'an:** Quran.com API v4 · Tanzil · King Fahd Complex text. Always with sūrah:āyah reference
  and a recognized tafsīr when interpreting (Ibn Kathīr, al-Ṭabarī, al-Qurṭubī).
- **Hadith:** Sunnah.com · Hadith API · with the **collection + book + number**.
- **Fatwā / scholarly ruling:** Dar al-Iftāʾ al-Miṣriyyah (دار الإفتاء المصرية) · Al-Azhar.
  IslamQA and similar may be shown only with an explicit "single-school opinion" flag.

### 4.2 The isnād-grading rule (MANDATORY)
**No hadith is ever displayed without its authenticity grade and source.** Grades, strongest to weakest:
`Ṣaḥīḥ (صحيح)` → `Ḥasan (حسن)` → `Ḍaʿīf (ضعيف)` → `Mawḍūʿ / fabricated (موضوع)`.
A fabricated or weak narration may be shown **only** when the explicit purpose is to warn that it is
fabricated/weak — and it must be labelled as such in red. Presenting an ungraded narration as if
authentic is the single worst violation in this project.

### 4.3 Anti-exploitation duty
When religion intersects health, money, or crisis, the platform must surface the manipulation
(Layer 5) and route to legitimate help — never reinforce the exploit. Qur'anic verses must always be
shown with the surrounding context (Layer 3 defense), because verse-stripping (e.g. Q 2:191) is a
documented attack vector already catalogued in the deception data.

---

## 5. THE 8-LAYER DECEPTION TAXONOMY (FROM `/six-layers`, FULLY ABSORBED)

This is the project's diagnostic spine. Every piece of analyzed content is classified into one or more
of these layers, and every classification carries its **defense protocol**. Source of truth:
`src/components/six-layers/data.ts`. The standard absorbs **all eight layers** — none skipped.

| # | Name (EN) | Name (AR) | Essence | DEFENSE PROTOCOL |
|---|-----------|-----------|---------|------------------|
| 1 | THE ABSOLUTE FABRICATION | الكذب المطلق | No source, no reality — invented from nothing (liar, hostile state, or AI). Preys on confirmation bias. | **SIFT** — Stop, Investigate the source, Find better coverage, Trace to origin. |
| 2 | THE BIASED LENS | العدسة المنحازة | Real, verifiable event — but filtered: selective omission, cherry-picking, loaded language. *Passes fact-checks.* | Ask **"What are they NOT showing?"** Seek the omitted half. |
| 3 | DECONTEXTUALIZATION | اقتطاع السياق | Credible source, accurate quote, real data — surgically removed from context so meaning inverts. | **Always read the FULL source.** Restore the sentence before and after. |
| 4 | WEAPONIZED TIMING | التوقيت المسلّح | Elite source, accurate info, context intact — but released for maximum destruction at a calculated moment. | Ask **"Why NOW? Who benefits from this timing?"** |
| 5 | THE EVIL APPLICATION | التطبيق الشرير | Source, info, and context all PERFECT — true knowledge applied to an oppressive/destructive end. | **Demand ethical oversight.** Separate the truth from its weaponized use. |
| 6 | THE MATRIX OF MANIPULATION | مصفوفة التلاعب | Aggregates all layers. Real doctors, real orgs, real podcasts — attacks vulnerability (trauma, parenthood, despair, spiritual hunger). Showing facts pushes victims *deeper*. | **Build diverse info networks; ask HOW, not WHAT.** Break isolation first, facts second. |
| 7 | THE MEGA-MACHINE (THE ARCHITECTS) | المهندسون (الخطة صفر حرية) | The invisible designers of the Matrix who own society's algorithmic rails; treat humans as livestock in a predictive-behavior market. | **Total systemic disconnect — refuse the rails.** Own your information diet. |
| 8 | THE UNKNOWN | المجهول | The genuinely unexplained — AI black boxes, mass psychogenic anomalies, cosmic/epistemic horror. No clean answer exists. | *No defense protocol — by definition.* The honest response is calibrated uncertainty, never false closure. |

**Layer-8 discipline:** Because Layer 8 is "the unknown," it is the layer most likely to invite
hallucination. The Truth Stack applies *hardest* here: present documented phenomena with their real
sources, label the speculative as speculative, and **never manufacture certainty** to make it tidy.

The full case-study corpus (Piltdown Man, Wakefield, Operation INFEKTION, Nayirah, Tobacco Playbook,
Cambridge Analytica, Pegasus, Operation Gladio, the Egyptian-specific cases, etc.) lives in
`data.ts` / `layer8Cases.ts` and is the canonical example set — features should draw real examples
from it rather than inventing new ones.

---

## 6. THE COGNITIVE DEFENSE PIPELINE (THE CONCATENATION)

Every analytical feature is this chain. This is what "concatenation building" means in practice.

```
 USER INPUT (claim / image / message / verse / question)
   │
   ▼
[1] RETRIEVE      → Evidence Aggregator + domain APIs (Tier S→C / Islamic §4)        ← Strategy 1
   │
   ▼
[1.5] RELEVANCE   → Logic Layer: per source, judge from the ABSTRACT (not the title) whether it
   │  GATE           actually addresses the claim, its stance, and WHY; the irrelevant are dropped.  ← logic-layer.ts
   ▼
[2] CROSS-VERIFY  → Mega-Rotator ≥2 providers / God-System adversarial panel          ← Strategy 3
   │
   ▼
[3] GROUND+CITE   → bind every claim to a resolvable source; empty sources ⇒ abstain  ← Strategy 2
   │
   ▼
[4] GUARD+CRITIQUE→ guardrails + schema + self-critique strips unsupported sentences   ← Strategy 4
   │
   ▼
[5] DIAGNOSE      → classify into Layer 1–8 (the deception taxonomy, §5)
   │
   ▼
[6] PRESCRIBE     → attach the layer's Defense Protocol (SIFT / "what's hidden?" / …)
   │
   ▼
 OUTPUT: { verdict, confidence∈{HIGH,MEDIUM,CONTESTED,UNVERIFIED}, layer, defense, sources[] }
```

The output shape is uniform across the whole platform so every page speaks the same language and
every chatbot can reason over it.

---

## 7. BINDING COMPLIANCE CONTRACT (EVERY PAGE & CHATBOT MUST PASS)

A feature is **done** only when ALL boxes are checkable. This is the review gate.

- [ ] **Real data only** — no mock, no placeholder, no dummy return, no hardcoded score. (§0)
- [ ] **Runs the pipeline** — at least Retrieve → Ground+Cite → Diagnose → Output. (§6)
- [ ] **Sources visible** — every factual block shows its source + tier; `UNVERIFIED`/`CONTESTED`
      states exist and are used honestly. (§2, §3)
- [ ] **Confidence shown** — derived, never hardcoded. (§2 Strategy 3)
- [ ] **Layer + defense** — output classifies to Layer 1–8 and shows the matching defense. (§5)
- [ ] **Islamic content graded** — any hadith carries collection+number+grade; verses carry context. (§4)
- [ ] **Chatbot present** — domain-specific multi-layered system prompt wired to the Mega-Rotator. (§8)
- [ ] **Quick-start explainer** — a "how to use + real scenario" block on the page.
- [ ] **Scientific name** — page name is scientific/philosophical, not generic.
- [ ] **Bilingual + RTL** — English + Egyptian-aware Arabic, correct RTL.
- [ ] **Responsive** — works to 320px width.
- [ ] **Fails loud** — errors surface to the user; no empty try/catch, no fake success. (§0)
- [ ] **In navigation** — reachable from the explore/all-pages surface; nothing hidden.
- [ ] **`npm run build` passes.**

---

## 8. CHATBOT SYSTEM-PROMPT STANDARD (MULTI-LAYERED)

Every page's chatbot uses one shared template, specialized per domain. The layers:

1. **Identity layer** — who the bot is (domain expert: misinformation analyst / mental-health
   literacy guide / Islamic-authenticity checker / forensic examiner …).
2. **Epistemic layer** — *the Truth Stack is law*: ground every claim, cite or abstain, flag
   CONTESTED, never fabricate. Explicit permission to say "I don't have a verified source for that."
3. **Taxonomy layer** — the bot knows the 8 deception layers (§5) and names the layer + defense when
   analyzing content.
4. **Source layer** — the bot prefers Tier S/A (§3); for religion, obeys the Islamic Authenticity
   Protocol (§4) and never quotes an ungraded hadith.
5. **Safety layer** — guardrails: no medical/financial/religious ruling presented as personal
   directive; route to legitimate help on crisis; refuse exploitation.
6. **Locale layer** — answers in the user's language (Egyptian-aware Arabic with correct RTL), plain
   and concrete, with a real scenario when teaching.

Implementation source of truth for wiring: `src/app/api/ai/chat/route.ts` + `src/lib/ai/`.
The per-domain specialization is just the Identity + Source + scenario set swapped in; layers 2–5
are constant across every bot.

---

## 9. FORBIDDEN (THE NEVER-DO LIST)

- ❌ Mock data, placeholder content, dummy returns, hardcoded credibility scores.
  *(This is literally the `api-swarm.ts` P0 bug — hardcoded scores instead of extracted ones.)*
- ❌ Confident AI prose with no source behind it. Ungrounded = unverified = not shown as fact.
- ❌ Empty `try/catch` that swallows errors; `{ success: true }` without doing the work;
  `// TODO: implement later`. (Recall `classifier.ts` P0: crashes with no fallback — wrap and abstain.)
- ❌ Any hadith without collection + number + authenticity grade. Any verse stripped of context.
- ❌ Hiding a page from navigation. Generic, non-scientific page names.
- ❌ Calling one weak endpoint and presenting its raw output as truth (no cross-verify, no tier).
- ❌ Manufacturing certainty about Layer-8 "unknown" topics to make them feel resolved.

---

## 10. HOW THIS STANDARD IS USED

- **Building a new feature?** Walk §6 (pipeline) and tick §7 (contract). Pull examples from `data.ts`.
- **Revamping a "VERY BAD" page (trend-hunter, live-deception, misinfo-atlas)?** The fix *is* making
  them satisfy §7 — real pipeline, real sources, layer+defense, chatbot, explainer.
- **Writing a chatbot?** Use the §8 template; keep layers 2–5 constant.
- **Touching religion?** §4 is law before anything else.
- **Reviewing anything?** §7 is the gate. If a box can't be ticked, it's not done.

> This standard is the constitution. Code serves it; it does not serve the code.

---

## 11. THE METHODOLOGY PROTOCOL — HOW A PAGE BECOMES "REAL"

The scientific rigor does NOT come from the LLM knowing methodologies at runtime. It comes from
**implementing the real published methodology as auditable code at build time**, bound to the
canonical real source for its domain. The LLM is the **narrator**, never the source of truth.

**The model that is FORBIDDEN:** scrape randomly / let the LLM invent the method and the data.
**The model that is REQUIRED:** bind to the canonical API/dataset + implement the actual algorithm as
deterministic code + let the LLM only translate/explain grounded output + abstain when unbacked.

| | AI-slop build (banned) | Real build (the Standard) |
|---|---|---|
| Facts | LLM generates | Real API / real dataset |
| Method | LLM "reasons" at runtime | Deterministic code citing its source paper |
| LLM's job | the brain | the **narrator** of code + source output |
| No source | confident guess | **abstain — UNVERIFIED** |

### The 4-line page contract (fill BEFORE writing any code)
1. **Canonical source/dataset** — the real API/DB for this domain.
2. **Published methodology + citation** — the actual algorithm, confirmed implementable as deterministic code.
3. **What the LLM does** — narration only; how it abstains.
4. **Proof test** — how we will show it's real (the verification run).

If #1 and #2 cannot be filled with a real source + real method, the page is honestly labelled a
**validated-framework / educational** page (real frameworks + real citations, but a teaching tool —
NOT dressed up as a live data engine).

### The four structural assurances (independently checkable on every page)
1. **Provenance** — every factual output carries a resolvable source URL or a named algorithm.
2. **Auditable methodology** — the scoring/model is code citing its paper; diff it against the original.
3. **Reproducibility** — same input + same source ⇒ same output (deterministic parts).
4. **Fail-loud abstention** — no source / no algorithm ⇒ UNVERIFIED, never fabrication.

---

## 12. THE COGNITION BUILDER — SPECIFIC TECHNIQUE PER LAYER (NOT "CRITICAL THINKING")

"Use critical thinking" is generic and banned. For EACH deception layer the platform names the EXACT
technique, the SPECIFIC bias it counters, WHY it fits, the precise STEPS, and the real tools.
Executable source of truth: **`src/lib/standard/cognition.ts`** (`COGNITION_BUILDER`, `getDefense`).

| Layer | Technique (the builder) | Counters (bias) | Why this one |
|---|---|---|---|
| 1 Absolute Fabrication | **Lateral Reading + SIFT** | Confirmation bias / source neglect | Fabrication has no origin — you verify by leaving the artifact and checking the source EXISTS. |
| 2 Biased Lens | **Omission Audit + Steelmanning** | Framing effect / WYSIATI | Facts are true but partial — reconstruct the omitted half. |
| 3 Decontextualization | **Upstream Reading + Toulmin** | Illusory truth / quote-mining | Meaning lives in context + warrant — restore both. |
| 4 Weaponized Timing | **Cui Bono + Temporal Forensics** | Recency / emotional reasoning | The lie is the WHEN — analyse motive + release moment. |
| 5 Evil Application | **Is–Ought Separation + Dual-Use Ethics** | Halo effect / authority transfer | Data is valid; the wrong is the use — separate fact from deployment. |
| 6 Matrix of Manipulation | **Inoculation / Prebunking + Bubble-Exit** | Identity-protective cognition / backfire | Facts push deeper — prebunk + restore exit ramps, don't argue facts. |
| 7 The Architects | **Systems & Incentive Mapping** | System justification / proportionality | It's structural — map who owns the rails, not any one message. |
| 8 The Unknown | **Bayesian Calibration + Steelman the Null** | Need for closure / overconfidence | The honest move is probability — never manufacture certainty. |

Every analytical output must attach the **matched technique + steps**, not a generic "think critically."

---

## 13. THE SCIENTIFIC SHIELD — EVERY PAGE, EVERY LAYER

Every page that analyzes content must deploy the **Scientific Shield**: on detecting a layer, it fires
that layer's **matched real tool** (§12 `shieldTools`) AND its **matched cognition technique** (§12).
Tool + technique together are the strongest available counter for that layer.

- Implement once as a reusable component fed by `cognition.ts` + `layers.ts`; every page mounts it.
- Honesty clause: the shield is the **strongest available** counter — we do not claim "100% destroyed."
  We claim: best real tool + correct technique + provenance + honest abstention. That is what is
  defensible in a thesis or a peer review.

---

## 14. THE TWO CATEGORIES & THE FOUR PILLARS

Every page is **exactly one category × one pillar**. This is the whole project's map.

### Two categories (what a page DOES)
- **VERIFICATION** — checks a specific artifact/claim against reality. Output: a verdict + provenance
  (debunker, forensics, hadith-check, evidence search, paper-auditor, OSINT, fact-feeds).
- **COGNITION BUILDER** — builds durable mental defenses. Output: a measured skill / behavior change
  (assessment, bias-fingerprint, critical-thinking ladder, debate-sim, inoculation, six-layers).

### Four pillars (the DOMAIN of awareness)
- **Scientific Awareness** — DeepReal, evidence, forensics, paper-auditor, Medical Life.
- **Religious Awareness** — Religion Hub + tools (hadith, fatwa, anti-exploitation, Maqāṣid).
- **Mental Awareness** — Mental Health engine, stigma/literacy, Men's & Women's shields, stress/reaction.
- **Society Awareness** — rumor/threat/trend maps, misinfo-atlas, economic/political rumor, BLACKBOX.

A page declares its `{ category, pillar }` in its header and the Master Plan tracks the matrix.

---

## 15. COMPETITOR & OPEN-SOURCE INTEGRATION POLICY

We study the strongest existing tools, **integrate the open ones**, and **never copy a claim without a
source**. (Names below are starting points — verify current capability via deep research before relying.)

### Competitors to study (method, not content)
- **Verification:** NewsGuard, Logically.ai, Full Fact (automated fact-checking), Snopes, PolitiFact,
  AFP Fact Check, Bellingcat (OSINT method), Google Fact Check Tools / ClaimReview.
- **Cognition-building:** Cambridge Social Decision-Making Lab — *Bad News*, *GoViral!*, *Harmony Square*
  (inoculation games); News Literacy Project / MediaWise; Tilt.

### Open-source / open-API to connect
- **Evidence:** OpenAlex, Semantic Scholar, Crossref, Europe PMC, DOAJ, PubMed/E-utilities. *(5 wired.)*
- **Forensics:** InVID/WeVerify (image/video), C2PA / Content Authenticity SDK, exifr/ExifTool, ELA.
- **Claims:** ClaimBuster, ClaimReview schema, Google Fact Check Tools API.
- **Arabic/Islamic NLP & text:** CAMeL Tools / Farasa (Egyptian dialect), Quran.com & Tanzil, Sunnah.com,
  HadithAPI, Dorar.
- **Inoculation:** the open *Bad News* / *Inoculation Science* technique taxonomy.

**Rule:** integrate the *open tool*; cite the *method's paper*; for a closed competitor, replicate the
documented technique with our own real sources — never present their output as ours unsourced.

---

## 16. COMPLIANCE CONTRACT — ADDENDUM (extends §7)

Every page must additionally:
- [ ] Declare its **category** (Verification | Cognition-Builder) and **pillar** (§14).
- [ ] Pass the **4-line methodology contract** (§11) — or be labelled framework/educational.
- [ ] Mount the **Scientific Shield** (§13) wired to `cognition.ts` + `layers.ts`.
- [ ] Cite its **methodology source** (the paper/algorithm) in the page + the chatbot prompt.
- [ ] Use the **specific cognition technique** for any layer it surfaces (§12) — never generic "critical thinking."

---

## 17. THE VERIFIED ARSENAL (researched 2026-06-20, with sources)

Live web research (4 parallel agents). Tools verified current; caveats are honest. This is the
canonical registry — the Master Plan §3 starting list is superseded by this.

### 17.1 Verification stack
| Need | Adopt | How | Caveat |
|---|---|---|---|
| "Already debunked?" | **Google Fact Check Tools API** | `claims:search?languageCode=ar` (free key); also publish our verdicts as **ClaimReview** | quota unpublished |
| Claim-matching (post → known debunk) | **BGE-M3 / multilingual-E5 + BM25 hybrid** | vector index of our fact-checks + Google pulls (per SemEval-2025 Task 7, strong Arabic) | build first — highest ROI |
| Check-worthiness gating | **ClaimBuster** | free key API or self-host DeBERTaV2 (HF `whispAI/ClaimBuster-DeBERTaV2`); EN-centric → fine-tune AR | hosted API historically flaky |
| Our verifier recipe | **HerO / AVeriTeC** (open) | HyDE retrieval → question-gen → LLM verdict+justification, over OUR Arabic sources | the blueprint for our engine |
| Architecture scaffold | **OpenFactCheck** | Processor→Retriever→Verifier interface to hot-swap components | — |
| Tipline/annotation (optional) | **Meedan Check** (MIT) | self-host for WhatsApp/Telegram AR tipline | heavy; pull only matching svc |
| Study-only (don't depend) | NewsGuard (paid feed), Full Fact AI (Arabic, partner-apply), **Logically = defunct 2025** | replicate transparent scoring criteria ourselves | — |

### 17.2 Forensics stack
| Need | Adopt | How | Caveat |
|---|---|---|---|
| Provenance (build now) | **C2PA** `@contentauth/c2pa-node` (server) + `c2pa-web` (browser pin) | read/validate manifests + signing chain | absence ≠ fake; valid sig ≠ true content |
| Metadata | **exifr** | `exifr.parse/gps()` client or server | trivially edited; stripped by socials |
| Splice triage | **ELA** via `sharp` | re-encode + diff heatmap | weak on PNG/AI images; triage only |
| Recontextualization | **SerpApi (Google Lens)** / **TinEye** | server-side keyed REST | paid; no free option post-Lens-shift |
| Journalist-grade tools | **InVID/WeVerify/vera.ai** | request gated API key | deepfake tab is experimental |
| AI/deepfake detection | **HF detector (self-host) + commercial 2nd-opinion** | calibrated score, never a label | ⚠️ **Deepfake-Eval-2024: open models 61–69%, high false-positives. NEVER auto-label "fake."** |

### 17.3 Cognition / Inoculation stack
Replicable, evidence-backed interventions (effect sizes are *measured*, cited):
- **Jigsaw prebunk videos** (Roozenbeek et al., *Science Advances* 2022) — 60–90s clips, recognition ↑ up to 2.1×; the **most scalable** format → build prebunk micro-clips using the recipe **warn → weakened example → refute**.
- **Bad News** (d≈0.36–0.41), **Harmony Square** (d=0.54), **GoViral!** health (d=0.52–0.56) — CC-licensed; replicate as "play-as-manipulator" modules localized to Egyptian examples.
- **MIST-20 / 16 / 8** (Maertens 2023, N=8,504; items open on OSF; free test) → encode as **baseline + progress assessment** with an Arabic true-vs-fabricated headline bank.
- **SIFT** (Caulfield) + lateral reading → a "SIFT-it" button beside flagged content.
- **Guess et al. "Tips"** (PNAS 2020; +26.5% US) → low-friction tips checklist for first-time users.
- ⚠️ A 2025 Swedish study found one-shot inoculation didn't durably help → **use spaced boosters, not one-shots.**

**The inoculation technique taxonomy we teach** (encoded in `cognition.ts` → `INOCULATION_TECHNIQUES`):
FLICC backbone (Fake experts · Logical fallacies · Impossible expectations · Cherry-picking · Conspiracy) +
emotional manipulation, impersonation, false dichotomy, scapegoating, ad-hominem/trolling, incoherence,
polarization/amplification, decontextualization.

### 17.4 Evidence + Arabic/Islamic stack
- **Academic:** Crossref (`mailto` polite pool) = DOI source-of-truth · **OpenAlex — ⚠️ now requires a free API key (`mailto` polite pool discontinued ~Feb 2026)** · Semantic Scholar (key for 1 req/s) · Europe PMC + PubMed E-utilities (key = 10 req/s) for health · DOAJ (predatory filter) · Unpaywall (OA full text) · **Retraction Watch CSV** (Crossref) as the integrity gate before grounding.
- **Arabic NLP (Egyptian dialect):** **CAMeL Tools** (offline, native EGY) + **MARBERTv2** (dialect ID/sentiment). Farasa/AraBERT = MSA/classical only.
- **Qur'an:** AlQuran.cloud (keyless, fast) or Quran.Foundation API v4 (OAuth2, richest tafsir).
- **Hadith (graded):** **HadithAPI.com** (free instant key, real Sahih/Hasan/Da'if — our primary, already wired via `HADITHAPI_COM_KEY`) · **Dorar self-host wrapper** `AhmedElTabarani/dorar-hadith-api` (best Arabic grading + takhrij — better than direct Dorar which 403s) · **Sunnah.com** (most authoritative, but key-gated + blocks anonymous server access — apply).

### 17.5 Build-order decision
1. Claim-matching index (cheapest, highest ROI). 2. C2PA + exifr + ELA forensics (free, build now).
3. Prebunk micro-clips + MIST baseline (cognition). 4. Verifier on HerO recipe over our Arabic sources.
**Code follow-up:** add `OPENALEX_API_KEY` support to `api-swarm.ts` (mailto pool sunsetting); self-host the Dorar wrapper as a hadith fallback.
