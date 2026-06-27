# 01 — PHILOSOPHY DIGEST (CANONICAL REFERENCE)

> **What this is.** A precise, quotation-grounded digest of the EAL governing standard, distilled
> from `HI CLAUDE/00_THE_SCIENTIFIC_STANDARD.md` (the constitution) and `CLAUDE.md` (project rules),
> cross-checked against `HI CLAUDE/09_MASTER_PLAN.md` and `HI CLAUDE/GOD_PROMPT.md`.
> **Every other agent builds on this file.** Where a rule matters, the exact text of the constitution
> is quoted. Section numbers (§) refer to the constitution.
>
> **Source of truth, in read order (from the constitution itself):**
> `00_THE_SCIENTIFIC_STANDARD.md` → `CLAUDE.md` → the task-specific section only.
>
> **STATUS (quoted):** "BINDING. This is the governing standard for the Egyptian Awareness Library.
> Every page, every chatbot, every API route, every output — from now on — MUST comply. If a feature
> cannot satisfy this standard, it does not ship. No exceptions, no 'just UI' placeholders."

---

## 0. THE ONE LAW (§0)

The single rule that subsumes every other:

> **"No claim reaches the user without a real, resolvable source behind it.**
> **If we cannot ground it, we say so — loudly — and we never fabricate to fill the gap."**

And its corollary, verbatim:

> "Mock data, dummy returns, placeholder content, and confident-but-ungrounded AI text are all the
> SAME failure: an unsourced claim. They are forbidden. **Fail loud, never fake.**"

The whole constitution is the unfolding of this one law. `CLAUDE.md` restates it: *"the one law: no
claim reaches the user without a real, resolvable source."*

### The Formula (§1)

```
EAL = STRONGEST REAL TOOLS  ⊗  CONCATENATION BUILDING
```

- **Strongest real tools** — "we never call one weak endpoint and hope. We call the best primary
  source for the domain (academic, institutional, fact-check, or authentic Islamic source) and we
  call several."
- **Concatenation building** — "tools are *chained*, not isolated. Each feature runs the full
  Cognitive Defense Pipeline (§6) ... Output of one stage is the input of the next. A page that does
  only the first stage is not finished."

**The three questions every feature must answer before it ships (§1):**
1. **Where did this come from?** (a Tier-listed source in §3, or an authentic Islamic source in §4)
2. **How do we know it's not hallucinated?** (which of the 4 Truth-Stack strategies in §2 applied)
3. **Which deception layer does it counter, and what's the defense?** (the 8-layer taxonomy in §5)

---

## 1. THE TRUTH STACK — 4 ANTI-HALLUCINATION STRATEGIES (§2)

> "These four run together. They are the project's epistemic guarantee. Each one has a concrete code
> enforcement point — a strategy with no enforcement is decoration."

### Strategy 1 — GROUNDING (Retrieval-Augmented, source-first)
- **Principle:** "The model never answers from its own memory. It answers *over retrieved documents.*"
- **Mechanism:** Before any generative call, hit the Evidence Aggregator (`/api/search/evidence` →
  OpenAlex + Semantic Scholar + Crossref + EuropePMC + DOAJ) and/or domain APIs (fact-check, Islamic,
  forensic). "Pass the retrieved snippets into the prompt as the ONLY permitted factual basis."
- **Enforcement:** "No retrieval result → the feature returns 'insufficient evidence,' not a guess.
  Retrieval happens server-side in the API route, never skipped to 'save a call.'"

### Strategy 2 — PROVENANCE ENFORCEMENT (no-citation = no-claim, with abstention)
- **Principle:** "Every factual sentence carries a resolvable source. The model is *required* to say
  'I don't know' when evidence is thin — abstention is a correct answer, fabrication never is."
- **Mechanism:** "All AI responses are returned through a **zod schema** with a mandatory
  `sources: { title, url, tier }[]` field. Any claim object with an empty `sources` array is rendered
  as `UNVERIFIED` (visually flagged) or dropped — it is never shown as fact."
- **Enforcement:** "Schema validation at the tool-call boundary; the UI has a dedicated `UNVERIFIED`
  state and an evidence chip on every factual block."

### Strategy 3 — CROSS-MODEL CONSENSUS (ensemble / self-consistency)
- **Principle:** "A single model's confidence is worthless. Agreement across independent models is signal."
- **Mechanism:** "Use the Gemini Mega-Rotator (`src/lib/ai/`, 14 keys / 6 providers) to ask ≥2
  independent providers the same grounded question, or run the God-System adversarial judgment
  pipeline (`src/app/god-system/`). Claims that survive agreement get HIGH confidence; claims where
  models disagree are shown as **CONTESTED**, never silently resolved to one side."
- **Enforcement:** "Confidence score on every output ∈ {HIGH, MEDIUM, CONTESTED, UNVERIFIED}, derived
  from cross-model agreement + source tier — not hardcoded. (Hardcoded scores are the exact
  api-swarm.ts bug; see §9.)"

### Strategy 4 — GUARDRAILS + ADVERSARIAL SELF-CRITIQUE (constrained generation)
- **Principle:** "Constrain the generation surface so the model cannot drift, then attack its own answer."
- **Mechanism:** "(a) `src/lib/ai/guardrails.ts` for safety/refusal; (b) schema-constrained output
  (no free-form essays where structured data is expected); (c) low temperature for factual tasks;
  (d) a final **self-critique pass** — 'list every sentence in this answer not supported by the
  retrieved sources' — and strip/flag those sentences before display."
- **Enforcement:** "The critique pass is a real second call, not a comment. Unsupported sentences are
  removed or marked, never shipped as confident prose."

> **The Stack in one line (quoted):** *"Retrieve real sources → demand citations or abstain →
> cross-check across models → constrain and self-critique. Four nets. A hallucination has to beat all
> four to reach a user."*

---

## 2. THE TIERED SOURCE WHITELIST (S / A / B / C) — §3

> "Outputs declare which tier their evidence came from. Higher tier = higher trust. We prefer S/A and
> fall back down only when forced, and we *say* when we fell back."

| Tier | Scope | Sources (verbatim) |
|------|-------|--------------------|
| **S** | Primary academic (peer-reviewed / indexed) | OpenAlex · Semantic Scholar · Crossref · Europe PMC · DOAJ · PubMed / MEDLINE · Cochrane Library · ClinicalTrials.gov · arXiv · bioRxiv / medRxiv. *(OpenAlex+S2+Crossref+EuropePMC+DOAJ already wired at `/api/search/evidence`.)* |
| **A** | Top institutions, NGOs, statistical bodies | WHO · UN / UNESCO / UNICEF · World Bank · OECD · CDC · ECDC / EFSA · Our World in Data · Pew Research Center · Reuters Institute for the Study of Journalism · Amnesty International · Egypt: CAPMAS (الجهاز المركزي للتعبئة العامة والإحصاء), Ministry of Health & Population. |
| **A** | Top journals & science press | Nature · Science · The Lancet · NEJM · BMJ · Cell · Nature Medicine · Scientific American · MIT Technology Review. |
| **B** | Verification, fact-check & OSINT | Google Fact Check Tools API · ClaimBuster · AFP Fact Check · Reuters Fact Check · Full Fact · Snopes · EU DisinfoLab · First Draft / Bellingcat (OSINT method, not opinion). |
| **C** | Community knowledge (only with citation-chasing) | Wikipedia (follow to its primary citations — never cite the article itself as the source) · Skeptics Stack Exchange · Cochrane plain-language summaries · Retraction Watch. |

**The Tier-C rule (verbatim):**
> "A Tier-C source is a *lead*, never a *proof*. Chase it to a Tier S/A primary or mark the claim
> CONTESTED. Never present a Tier-C lead as established fact."

**Note on "U":** *U* is not a source tier — it is the **`UNVERIFIED` output state** mandated by
Strategy 2 (§2) and the confidence enum (§2 Strategy 3). The full confidence enum on every output is
`{ HIGH, MEDIUM, CONTESTED, UNVERIFIED }`. A claim with an empty `sources[]` array, or one with no
retrieval/algorithm behind it, is emitted as `UNVERIFIED` rather than assigned a source tier. So the
"S/A/B/C/U" shorthand = four evidence tiers **plus** the honest-abstention state.

> **Verified Arsenal caveat (§17.4):** OpenAlex "now requires a free API key (`mailto` polite pool
> discontinued ~Feb 2026)." Crossref uses the `mailto` polite pool as DOI source-of-truth.
> **Retraction Watch CSV** is the "integrity gate before grounding."

---

## 3. THE ISLAMIC AUTHENTICITY PROTOCOL (الجانب الإسلامي) — §4

> "The religious side carries the same epistemic weight as the scientific side — and an extra duty of
> care, because exploitation here causes the worst harm... The standard is non-negotiable."

### 3.1 Authentic-source hierarchy (§4.1)
- **Qur'an:** "Quran.com API v4 · Tanzil · King Fahd Complex text. Always with sūrah:āyah reference
  and a recognized tafsīr when interpreting (Ibn Kathīr, al-Ṭabarī, al-Qurṭubī)."
- **Hadith:** "Sunnah.com · Hadith API · with the **collection + book + number**."
- **Fatwā / scholarly ruling:** "Dar al-Iftāʾ al-Miṣriyyah (دار الإفتاء المصرية) · Al-Azhar.
  IslamQA and similar may be shown only with an explicit 'single-school opinion' flag."

### 3.2 The isnād-grading rule (MANDATORY) (§4.2)
> **"No hadith is ever displayed without its authenticity grade and source."**
> Grades, strongest to weakest: `Ṣaḥīḥ (صحيح)` → `Ḥasan (حسن)` → `Ḍaʿīf (ضعيف)` →
> `Mawḍūʿ / fabricated (موضوع)`.
> "A fabricated or weak narration may be shown **only** when the explicit purpose is to warn that it
> is fabricated/weak — and it must be labelled as such in red. **Presenting an ungraded narration as
> if authentic is the single worst violation in this project.**"

### 3.3 Anti-exploitation duty (§4.3)
> "When religion intersects health, money, or crisis, the platform must surface the manipulation
> (Layer 5) and route to legitimate help — never reinforce the exploit. Qur'anic verses must always
> be shown with the surrounding context (Layer 3 defense), because verse-stripping (e.g. Q 2:191) is
> a documented attack vector already catalogued in the deception data."

> **Verified hadith stack (§17.4):** Primary = **HadithAPI.com** (real Sahih/Hasan/Da'if grades,
> already wired via `HADITHAPI_COM_KEY`). Fallback = self-hosted **Dorar wrapper**
> (`AhmedElTabarani/dorar-hadith-api`). Sunnah.com is most authoritative but key-gated.

---

## 4. THE 8-LAYER DECEPTION TAXONOMY (§5)

> "This is the project's diagnostic spine. Every piece of analyzed content is classified into one or
> more of these layers, and every classification carries its **defense protocol**. Source of truth:
> `src/components/six-layers/data.ts`. The standard absorbs **all eight layers** — none skipped."

| # | Name (EN) | Name (AR) | Essence (quoted) | DEFENSE PROTOCOL (quoted) |
|---|-----------|-----------|------------------|---------------------------|
| 1 | THE ABSOLUTE FABRICATION | الكذب المطلق | "No source, no reality — invented from nothing (liar, hostile state, or AI). Preys on confirmation bias." | **SIFT** — Stop, Investigate the source, Find better coverage, Trace to origin. |
| 2 | THE BIASED LENS | العدسة المنحازة | "Real, verifiable event — but filtered: selective omission, cherry-picking, loaded language. *Passes fact-checks.*" | Ask **"What are they NOT showing?"** Seek the omitted half. |
| 3 | DECONTEXTUALIZATION | اقتطاع السياق | "Credible source, accurate quote, real data — surgically removed from context so meaning inverts." | **Always read the FULL source.** Restore the sentence before and after. |
| 4 | WEAPONIZED TIMING | التوقيت المسلّح | "Elite source, accurate info, context intact — but released for maximum destruction at a calculated moment." | Ask **"Why NOW? Who benefits from this timing?"** |
| 5 | THE EVIL APPLICATION | التطبيق الشرير | "Source, info, and context all PERFECT — true knowledge applied to an oppressive/destructive end." | **Demand ethical oversight.** Separate the truth from its weaponized use. |
| 6 | THE MATRIX OF MANIPULATION | مصفوفة التلاعب | "Aggregates all layers. Real doctors, real orgs, real podcasts — attacks vulnerability (trauma, parenthood, despair, spiritual hunger). Showing facts pushes victims *deeper*." | **Build diverse info networks; ask HOW, not WHAT.** Break isolation first, facts second. |
| 7 | THE MEGA-MACHINE (THE ARCHITECTS) | المهندسون (الخطة صفر حرية) | "The invisible designers of the Matrix who own society's algorithmic rails; treat humans as livestock in a predictive-behavior market." | **Total systemic disconnect — refuse the rails.** Own your information diet. |
| 8 | THE UNKNOWN | المجهول | "The genuinely unexplained — AI black boxes, mass psychogenic anomalies, cosmic/epistemic horror. No clean answer exists." | *No defense protocol — by definition.* The honest response is calibrated uncertainty, never false closure. |

**Layer-8 discipline (verbatim):**
> "Because Layer 8 is 'the unknown,' it is the layer most likely to invite hallucination. The Truth
> Stack applies *hardest* here: present documented phenomena with their real sources, label the
> speculative as speculative, and **never manufacture certainty** to make it tidy."

**Canonical example corpus (do not invent new examples):** Piltdown Man, Wakefield, Operation
INFEKTION, Nayirah, Tobacco Playbook, Cambridge Analytica, Pegasus, Operation Gladio, the
Egyptian-specific cases — lives in `data.ts` / `layer8Cases.ts`.

### 4b. THE COGNITION BUILDER — exact technique per layer (§12)

> "'Use critical thinking' is generic and banned." Source of truth:
> `src/lib/standard/cognition.ts` (`COGNITION_BUILDER`, `getDefense`).

| Layer | Technique (the builder) | Counters (bias) |
|---|---|---|
| 1 Absolute Fabrication | **Lateral Reading + SIFT** | Confirmation bias / source neglect |
| 2 Biased Lens | **Omission Audit + Steelmanning** | Framing effect / WYSIATI |
| 3 Decontextualization | **Upstream Reading + Toulmin** | Illusory truth / quote-mining |
| 4 Weaponized Timing | **Cui Bono + Temporal Forensics** | Recency / emotional reasoning |
| 5 Evil Application | **Is–Ought Separation + Dual-Use Ethics** | Halo effect / authority transfer |
| 6 Matrix of Manipulation | **Inoculation / Prebunking + Bubble-Exit** | Identity-protective cognition / backfire |
| 7 The Architects | **Systems & Incentive Mapping** | System justification / proportionality |
| 8 The Unknown | **Bayesian Calibration + Steelman the Null** | Need for closure / overconfidence |

> "Every analytical output must attach the **matched technique + steps**, not a generic 'think critically.'"

---

## 5. THE COGNITIVE DEFENSE PIPELINE — THE CONCATENATION (§6)

> "Every analytical feature is this chain. This is what 'concatenation building' means in practice."

```
 USER INPUT (claim / image / message / verse / question)
   │
   ▼
[1]   RETRIEVE       → Evidence Aggregator + domain APIs (Tier S→C / Islamic §4)        ← Strategy 1
   │
   ▼
[1.5] RELEVANCE GATE → Logic Layer: per source, judge from the ABSTRACT (not the title)
   │                   whether it actually addresses the claim, its stance, and WHY;
   │                   the irrelevant are dropped.                                       ← logic-layer.ts
   ▼
[2]   CROSS-VERIFY   → Mega-Rotator ≥2 providers / God-System adversarial panel          ← Strategy 3
   │
   ▼
[3]   GROUND+CITE    → bind every claim to a resolvable source; empty sources ⇒ abstain  ← Strategy 2
   │
   ▼
[4]   GUARD+CRITIQUE → guardrails + schema + self-critique strips unsupported sentences   ← Strategy 4
   │
   ▼
[5]   DIAGNOSE       → classify into Layer 1–8 (the deception taxonomy, §5)
   │
   ▼
[6]   PRESCRIBE      → attach the layer's Defense Protocol (SIFT / "what's hidden?" / …)
   │
   ▼
 OUTPUT: { verdict, confidence∈{HIGH,MEDIUM,CONTESTED,UNVERIFIED}, layer, defense, sources[] }
```

> "The output shape is uniform across the whole platform so every page speaks the same language and
> every chatbot can reason over it."

**Minimum viable pipeline (from the §7 contract):** a feature must run *at least*
**Retrieve → Ground+Cite → Diagnose → Output.**

---

## 6. THE PER-FEATURE COMPLIANCE CONTRACT (§7 + §16 addendum)

> "A feature is **done** only when ALL boxes are checkable. This is the review gate."

### 6.1 Core contract (§7) — verbatim checklist
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

### 6.2 Addendum (§16) — every page must additionally
- [ ] Declare its **category** (Verification | Cognition-Builder) and **pillar** (§14).
- [ ] Pass the **4-line methodology contract** (§11) — or be labelled framework/educational.
- [ ] Mount the **Scientific Shield** (§13) wired to `cognition.ts` + `layers.ts`.
- [ ] Cite its **methodology source** (the paper/algorithm) in the page + the chatbot prompt.
- [ ] Use the **specific cognition technique** for any layer it surfaces (§12) — never generic "critical thinking."

### 6.3 The 4-line methodology contract (§11) — fill BEFORE writing any code
1. **Canonical source/dataset** — the real API/DB for this domain.
2. **Published methodology + citation** — the actual algorithm, confirmed implementable as deterministic code.
3. **What the LLM does** — narration only; how it abstains.
4. **Proof test** — how we will show it's real (the verification run).

> "If #1 and #2 cannot be filled with a real source + real method, the page is honestly labelled a
> **validated-framework / educational** page (real frameworks + real citations, but a teaching tool —
> NOT dressed up as a live data engine)."

**The build-time methodology principle (§11), verbatim:**
> "The scientific rigor does NOT come from the LLM knowing methodologies at runtime. It comes from
> **implementing the real published methodology as auditable code at build time**, bound to the
> canonical real source for its domain. The LLM is the **narrator**, never the source of truth."

| | AI-slop build (banned) | Real build (the Standard) |
|---|---|---|
| Facts | LLM generates | Real API / real dataset |
| Method | LLM "reasons" at runtime | Deterministic code citing its source paper |
| LLM's job | the brain | the **narrator** of code + source output |
| No source | confident guess | **abstain — UNVERIFIED** |

**Four structural assurances, independently checkable (§11):** Provenance · Auditable methodology ·
Reproducibility (same input + same source ⇒ same output) · Fail-loud abstention.

---

## 7. THE CHATBOT SYSTEM-PROMPT STANDARD — 6 LAYERS (§8)

> "Every page's chatbot uses one shared template, specialized per domain." Wiring source of truth:
> `src/app/api/ai/chat/route.ts` + `src/lib/ai/`. "The per-domain specialization is just the
> Identity + Source + scenario set swapped in; layers 2–5 are constant across every bot."

1. **Identity layer** — "who the bot is (domain expert: misinformation analyst / mental-health
   literacy guide / Islamic-authenticity checker / forensic examiner …)."
2. **Epistemic layer** — "*the Truth Stack is law*: ground every claim, cite or abstain, flag
   CONTESTED, never fabricate. Explicit permission to say 'I don't have a verified source for that.'"
3. **Taxonomy layer** — "the bot knows the 8 deception layers (§5) and names the layer + defense
   when analyzing content."
4. **Source layer** — "the bot prefers Tier S/A (§3); for religion, obeys the Islamic Authenticity
   Protocol (§4) and never quotes an ungraded hadith."
5. **Safety layer** — "guardrails: no medical/financial/religious ruling presented as personal
   directive; route to legitimate help on crisis; refuse exploitation."
6. **Locale layer** — "answers in the user's language (Egyptian-aware Arabic with correct RTL), plain
   and concrete, with a real scenario when teaching."

---

## 8. THE SCIENTIFIC SHIELD (§13)

> "Every page that analyzes content must deploy the **Scientific Shield**: on detecting a layer, it
> fires that layer's **matched real tool** (§12 `shieldTools`) AND its **matched cognition
> technique** (§12). Tool + technique together are the strongest available counter for that layer."

- "Implement once as a reusable component fed by `cognition.ts` + `layers.ts`; every page mounts it."
- **Honesty clause (verbatim):** "the shield is the **strongest available** counter — we do not claim
  '100% destroyed.' We claim: best real tool + correct technique + provenance + honest abstention.
  That is what is defensible in a thesis or a peer review."

---

## 9. THE PROJECT MAP — 2 CATEGORIES × 4 PILLARS (§14)

> "Every page is **exactly one category × one pillar**. This is the whole project's map."
> A page declares its `{ category, pillar }` in its header and the Master Plan tracks the matrix.

**Two categories (what a page DOES):**
- **VERIFICATION** — "checks a specific artifact/claim against reality. Output: a verdict +
  provenance (debunker, forensics, hadith-check, evidence search, paper-auditor, OSINT, fact-feeds)."
- **COGNITION BUILDER** — "builds durable mental defenses. Output: a measured skill / behavior change
  (assessment, bias-fingerprint, critical-thinking ladder, debate-sim, inoculation, six-layers)."

**Rule of placement (Master Plan §1):** "does the page *check something* (→ Verification) or *change
the user* (→ Cognition Builder)? If it does both, split it or pick its primary output."

**Four pillars (the DOMAIN of awareness):**
- **Scientific Awareness** — DeepReal, evidence, forensics, paper-auditor, Medical Life.
- **Religious Awareness** — Religion Hub + tools (hadith, fatwa, anti-exploitation, Maqāṣid).
- **Mental Awareness** — Mental Health engine, stigma/literacy, Men's & Women's shields, stress/reaction.
- **Society Awareness** — rumor/threat/trend maps, misinfo-atlas, economic/political rumor, BLACKBOX.

**Per-pillar real source / coded-method backbone (Master Plan §2):**

| Pillar | Canonical real sources (Tier S/A) | Real methodology (coded, not LLM) |
|---|---|---|
| Scientific | OpenAlex, Semantic Scholar, Crossref, Europe PMC, DOAJ, PubMed; InVID/WeVerify, C2PA, exifr | Evidence aggregation + tiering; EXIF/ELA/C2PA forensic algorithms; retraction checks |
| Religious | Quran.com / Tanzil, Sunnah.com, HadithAPI, Dorar, Dar al-Iftāʾ, Al-Azhar | Isnād grading **from the source** (Ṣaḥīḥ→Mawḍūʿ); tafsīr context; Maqāṣid mapping |
| Mental | MHLS (α=.873), GHSQ (r=.86), Brief RCOPE (α=.90/.81), WHO/CDC literacy | Validated instruments' **real items + scoring keys + published norms** |
| Society | Google Fact Check / ClaimReview, AFP/Reuters feeds, CAPMAS, fact-check timestamps | SIR/SEIR diffusion math; cui-bono/temporal forensics; OSINT method |

> "If a cell has no real source for a page → that page is **framework/educational**, labelled as such."

---

## 10. FORBIDDEN — THE NEVER-DO LIST (§9)

- ❌ "Mock data, placeholder content, dummy returns, hardcoded credibility scores. *(This is literally
  the `api-swarm.ts` P0 bug — hardcoded scores instead of extracted ones.)*"
- ❌ "Confident AI prose with no source behind it. Ungrounded = unverified = not shown as fact."
- ❌ "Empty `try/catch` that swallows errors; `{ success: true }` without doing the work;
  `// TODO: implement later`. (Recall `classifier.ts` P0: crashes with no fallback — wrap and abstain.)"
- ❌ "Any hadith without collection + number + authenticity grade. Any verse stripped of context."
- ❌ "Hiding a page from navigation. Generic, non-scientific page names."
- ❌ "Calling one weak endpoint and presenting its raw output as truth (no cross-verify, no tier)."
- ❌ "Manufacturing certainty about Layer-8 'unknown' topics to make them feel resolved."

---

## 11. INTEGRATION POLICY & VERIFIED ARSENAL (§15, §17 — pointers)

**Policy (§15):** "integrate the *open tool*; cite the *method's paper*; for a closed competitor,
replicate the documented technique with our own real sources — never present their output as ours
unsourced." Run the `deep-research` skill to verify current API availability before integrating
(training knowledge may be stale).

**The Verified Arsenal (§17, researched 2026-06-20)** is the *canonical tool registry* (supersedes
the Master Plan §3 sketch). Key load-bearing caveats agents must respect:
- **Deepfake/AI detection:** "Deepfake-Eval-2024: open models 61–69%, high false-positives. **NEVER
  auto-label 'fake.'**" Emit a calibrated score, never a label.
- **C2PA:** "absence ≠ fake; valid sig ≠ true content."
- **EXIF (exifr):** "trivially edited; stripped by socials." **ELA:** "weak on PNG/AI images; triage only."
- **OpenAlex:** now requires a free API key (`mailto` pool sunset ~Feb 2026) — add `OPENALEX_API_KEY`.
- **Inoculation:** "use spaced boosters, not one-shots" (a 2025 Swedish study found one-shot
  inoculation didn't durably help).
- **Build order (§17.5):** 1) claim-matching index, 2) C2PA+exifr+ELA forensics, 3) prebunk
  micro-clips + MIST baseline, 4) verifier on the HerO/AVeriTeC recipe over our Arabic sources.

---

## 12. PROJECT-RULE OVERLAY (from `CLAUDE.md` — operational hard rules)

These sit beneath the constitution and bind day-to-day work:
- **"Every new page MUST connect to ≥2 existing APIs."**
- **"Every output MUST show evidence source."**
- **"Arabic RTL support required on all pages."**
- **"Mobile responsive (320px minimum viewport)."**
- **"Bilingual: English + Arabic (Egyptian dialect aware)."**
- **"NEVER edit node_modules or .next."**
- **Known P0 bugs that exemplify the violations:** `api-swarm.ts` (hardcoded credibilityScores + no
  AbortController → socket leaks) and `classifier.ts` (missing try/catch, crashes without
  `OPENAI_API_KEY`).
- **File-size discipline:** never read `globals.css` (135KB) or `src/app/page.tsx` (51KB) whole — use
  line ranges; never read `package-lock.json`; never touch `node_modules/` or `.next/`.

---

## 13. HOW THIS STANDARD IS USED (§10) — the operating loop

- **Building a new feature?** Walk §6 (pipeline) and tick §7 (contract). Pull examples from `data.ts`.
- **Revamping a "VERY BAD" page (trend-hunter, live-deception, misinfo-atlas)?** "The fix *is* making
  them satisfy §7 — real pipeline, real sources, layer+defense, chatbot, explainer."
- **Writing a chatbot?** Use the §8 template; keep layers 2–5 constant.
- **Touching religion?** §4 is law before anything else.
- **Reviewing anything?** §7 is the gate. "If a box can't be ticked, it's not done."

> **The closing principle (§10), verbatim:**
> *"This standard is the constitution. Code serves it; it does not serve the code."*

---

### Provenance of this digest
Quoted and distilled from, all under
`C:/Users/pc/Desktop/EGY/New folder (20)/egyptian-awareness-library/`:
- `HI CLAUDE/00_THE_SCIENTIFIC_STANDARD.md` (the constitution — §0–§17)
- `CLAUDE.md` (project rules overlay)
- `HI CLAUDE/09_MASTER_PLAN.md` (category×pillar map, per-pillar source stack)
- `HI CLAUDE/GOD_PROMPT.md` (operating rules, behavioral theories, known bugs — corroborating context)
