# 10 — STRATEGY: TOOLS WIRING (Layer 3)

> **What this is.** The build-ready plan for wiring EAL's *strongest real tools* — the AI Debunker / SIFT
> pipeline, the Evidence Aggregator (RAG) + Cohere rerank, the Relevance Logic Layer, the forensic stack,
> the One-Law Output Enforcer, and the NVIDIA-First / Mega-Rotator brain — directly into the **cognition
> training surfaces** AND into **every chatbot**. Goal: training is *powered by live verification at runtime*,
> not narrated over static content.
>
> **Grounded in real code** (paths verified, project root = `New folder (20)/egyptian-awareness-library/`):
> - GOLD-STANDARD already-wired pipeline: `src/app/api/ai/debunker/route.ts` (lateral search → fetch+`classifyTier` → EXIF → Wayback → `nvidiaFirstGenerateJSON` → `enforceOneLaw` + `applyVerdictEnforcement`).
> - The One Law for AI prose: `src/lib/ai/output-enforcer.ts` (`enforceOneLaw`, `applyVerdictEnforcement`, `enforceSourcedOutput`, `SourcedAIOutputSchema`).
> - Evidence RAG + rerank: `src/app/api/search/evidence/route.ts` (7 APIs, trust-scored, free-first) + `src/lib/ai/cohere-rerank.ts` (`rerankBy`, fail-safe).
> - Relevance gate (pipeline stage 1.5): `src/lib/standard/logic-layer.ts` (`buildLogicLayerPrompt`, `applyAdjudication`, `RELEVANCE_THRESHOLD`).
> - Cognition spine: `src/lib/standard/cognition.ts` (`COGNITION_BUILDER`, `getDefense`, `INOCULATION_TECHNIQUES`, `getTechnique`) + `src/lib/standard/layers.ts`.
> - Chatbot prompt builder: `src/lib/standard/system-prompt.ts` (`buildSystemPrompt`, layers 2–5 constant).
> - AI brain: `src/lib/ai/nvidia-first.ts` (`nvidiaFirstGenerate`/`nvidiaFirstGenerateJSON`) + `src/lib/debunking/gemini-rotator.ts` (`rotatingGenerateObject`).
> - Pre-screen: `src/lib/orchestration/covo-router.ts` (`CovoRouter.analyzeQuery`).
> - The shipped (under-wired) chatbot route: `src/app/api/ai/chat/route.ts`. The shared widget: `src/components/shared/page-ai-chatbot.tsx`.
> - Training surfaces: `src/app/api/debate-sim/route.ts`, `src/app/api/live-deception/generate/route.ts`, plus pages `bad-news`, `inoculation-passport`, `mist`, `six-layers`, `critical-thinking`, `bias-fingerprint`, `fallacy-engine`.

---

## 0. THE CORE PROBLEM THIS LAYER FIXES (with code evidence)

The constitution (§6) demands every analytical feature run the **Cognitive Defense Pipeline**:
`RETRIEVE → RELEVANCE GATE → CROSS-VERIFY → GROUND+CITE → GUARD+CRITIQUE → DIAGNOSE → PRESCRIBE → OUTPUT`.

Two facts from the actual code:

1. **One feature already does it right.** `/api/ai/debunker` is the canonical chain. We do not re-invent it — we
   **extract it into a reusable orchestrator** and point everything else at it.

2. **The most-used chatbot does NOT.** `/api/ai/chat/route.ts` (the route behind `PageAIChatbot`, the widget mounted
   on cognition pages) currently:
   - never calls `/api/search/evidence` or any retrieval — it answers from model memory;
   - hardcodes its `sources` to label strings (`{ title: "NVIDIA NIM Nemotron Analysis", type: "ai" }`,
     `{ title: "EAL Fact-Check Engine" }`) that are **not resolvable URLs** — a textbook One-Law violation (§0, §10);
   - never calls `enforceOneLaw` / `applyVerdictEnforcement`, so an ungrounded answer is shown as fact, never downgraded to UNVERIFIED.

   So the chatbot the user talks to *on a cognition-training page* is exactly the AI-slop build the Standard bans
   (LLM = the brain, no retrieval, fake sources). **This is the #1 thing Layer-3 wiring fixes.**

3. **Training surfaces generate content but don't verify it.** `/api/debate-sim` and `/api/live-deception/generate`
   produce manipulative text (correct — that's the inoculation *dose*) but the **payoff** of inoculation — *"now spot it,
   here's the real evidence that refutes it"* — is not wired to live verification. The refutation half must be grounded.

**Design rule for this whole layer (verbatim discipline):** *the LLM is the narrator; deterministic code bound to a
real source is the truth.* Every wiring below moves a fact from "model said so" to "a tiered, resolvable source said so,
verified by the enforcer."

---

## 1. THE SHARED SPINE — ONE ORCHESTRATOR, REUSED EVERYWHERE

Build **one** server module that *is* the pipeline, so training pages and chatbots both call it instead of re-implementing.

### 1.1 New file: `src/lib/pipeline/verify.ts` — `runVerificationPipeline()`

This generalizes `/api/ai/debunker` into a callable function. It is the single concatenation point (§6).

```ts
// src/lib/pipeline/verify.ts  (NEW — server-only)
import { rerankBy } from '@/lib/ai/cohere-rerank';
import { buildLogicLayerPrompt, applyAdjudication, RELEVANCE_THRESHOLD,
         SourceAdjudicationSchema, unadjudicated } from '@/lib/standard/logic-layer';
import { enforceOneLaw, applyVerdictEnforcement } from '@/lib/ai/output-enforcer';
import { classifyTier } from '@/lib/standard/sources';
import { getDefense } from '@/lib/standard/cognition';
import { nvidiaFirstGenerateJSON } from '@/lib/ai/nvidia-first';
import { rotatingGenerateObject } from '@/lib/debunking/gemini-rotator';

export interface PipelineInput {
  claim: string;
  domain?: 'scientific' | 'religious' | 'mental' | 'society';
  islamic?: boolean;        // route hadith/verse claims to the Islamic stack
  imageBase64?: string;     // triggers the forensic branch
  lang: 'ar' | 'en' | 'mixed';
}
export interface PipelineOutput {
  verdict: 'DEBUNKED'|'MISLEADING'|'PARTIALLY_TRUE'|'TRUE'|'UNVERIFIED'|'CONTESTED';
  confidence: number;                 // DERIVED (see §1.3), never hardcoded
  layer: number | null;               // 1..8 deception taxonomy
  defense: ReturnType<typeof getDefense>;
  truthSandwich?: { fact1: string; myth: string; fact2: string };
  sources: { title: string; url: string; tier: string; stance: string; why: string }[];
  enforcement: { status: 'verified'|'unverified'; tier: string; reason?: string };
  forensics?: unknown;                // EXIF/C2PA when image present
}

export async function runVerificationPipeline(input: PipelineInput): Promise<PipelineOutput> { /* §1.2 steps */ }
```

### 1.2 The eight stages, mapped to real calls

| # | Stage (§6) | Concrete call in `runVerificationPipeline` | Source of truth |
|---|---|---|---|
| 1 | **RETRIEVE** | `GET /api/search/evidence?q=<claim>` for sci/society; for `islamic:true` also `GET /api/islamic/hadith` + `GET /api/islamic/quran`/`tafsir`. Image → `POST /api/forensic/image` (+ `/api/forensic/c2pa`). | `evidence/route.ts`, `islamic/*`, `forensic/*` |
| 1.5 | **RELEVANCE GATE** | Build `buildLogicLayerPrompt(claim, sources.map(title+abstract))` → `rotatingGenerateObject({ schema: SourceAdjudicationSchema })` → `applyAdjudication` → drop `relevanceScore < RELEVANCE_THRESHOLD (0.5)`. On failure use `unadjudicated()` (relevance UNKNOWN, never faked). | `logic-layer.ts` |
| — | **RERANK** (relevance polish) | `rerankBy(claim, kept, s => `${s.title}. ${s.snippet}`, { topN: 6 })` — fail-safe, keeps order if Cohere down. | `cohere-rerank.ts` |
| 2 | **CROSS-VERIFY** | Ask ≥2 providers the SAME grounded question: primary `nvidiaFirstGenerateJSON`, second pass `rotatingGenerateObject` (different provider via rotation). Agreement ⇒ HIGH; divergence ⇒ `verdict='CONTESTED'`. | `nvidia-first.ts`, `gemini-rotator.ts` |
| 3 | **GROUND+CITE** | Prompt receives ONLY the surviving adjudicated snippets as the permitted factual basis (RAG). | (prompt construction) |
| 4 | **GUARD+CRITIQUE** | `enforceOneLaw(sources.map({title,url}))` → `applyVerdictEnforcement(verdict, enforcement)`. Unsourced ⇒ `verdict:'UNVERIFIED'`, confidence capped 0.2. Optional self-critique second call. | `output-enforcer.ts` |
| 5 | **DIAGNOSE** | LLM classifies claim → layer 1–8 (constrained enum), validated against `DECEPTION_LAYERS`. | `layers.ts` |
| 6 | **PRESCRIBE** | `getDefense(layer)` attaches technique + steps + `shieldTools`. | `cognition.ts` |
| — | **OUTPUT** | Uniform `PipelineOutput` shape — every page and bot reasons over the same object. | this module |

### 1.3 Confidence is DERIVED here (kills the api-swarm hardcode class of bug)

```
base   = tierWeight(enforcement.tierFloor)         // S>A>B>C, from output-enforcer
× rel  = mean(relevanceScore of kept sources)      // logic-layer
× agree= providersAgree ? 1.0 : 0.5                // cross-verify; disagree ⇒ CONTESTED
→ confidence ∈ {HIGH≥.75, MEDIUM≥.5, CONTESTED(any divergence), UNVERIFIED(enforcement.status==='unverified')}
```
No literal numbers assigned to `credibilityScore` anywhere (§9/§10 forbidden). If `enforcement.status==='unverified'`,
`applyVerdictEnforcement` already forces UNVERIFIED + caps confidence — we never override it upward.

### 1.4 Thin route wrappers (so the function is reachable + cacheable)

- `POST /api/pipeline/verify` → calls `runVerificationPipeline`, returns `PipelineOutput`. The **one** endpoint training pages and chatbots hit for "check this claim."
- Keep `/api/ai/debunker` as a **named preset** of the same function (`mode:'sift'`) so nothing existing breaks.

---

## 2. WIRING THE CHATBOT (the #1 fix) — every bot becomes a verification client

### 2.1 Rebuild `/api/ai/chat` so factual claims pass through the pipeline

Current flow (broken): `message → COVO → nvidiaFirstGenerate → hardcoded sources[]`. New flow:

```
message
  → CovoRouter.analyzeQuery            (already present — keep: emotional-intent + fallacy pre-screen)
  → IF covo.domain is factual/health/religious/society OR message is a checkable claim:
        out = await runVerificationPipeline({ claim: message, islamic: covo.domain==='religious', lang })
        // chatbot NARRATES out.truthSandwich + out.defense; sources = out.sources (REAL urls+tiers)
        // enforcement.status==='unverified' ⇒ bot SAYS "I don't have a verified source for that" (§8 layer 2)
  → ELSE (chit-chat / how-to): plain nvidiaFirstGenerate, but still run enforceOneLaw on any factual sentence it emits.
```

Concrete edits to `src/app/api/ai/chat/route.ts`:

1. **Delete the hardcoded `sources` arrays** in `case "claim"`, `mental-health`, `academic`. Replace with
   `out.sources` from the pipeline (each `{ title, url, tier }`, resolvable).
2. In `case "claim"`: replace the single `nvidiaFirstGenerate` call with `runVerificationPipeline` and render its
   truth sandwich. Return `enforcement` + `confidence` + `layer` + `defense` in the JSON so the widget can show chips.
3. The `default` (page-specific) branch: after `aiGenerate`, run a **post-hoc enforcement pass** — extract any
   claim the bot made, call `/api/pipeline/verify` for the load-bearing one, and append a "✅ verified / ⚠ UNVERIFIED"
   evidence chip. (Cheap version: only verify when COVO flags the message as a factual claim.)
4. Keep COVO's `socratic_intervention` prefix — it is the Layer-6 prebunk reflex and belongs in training chat.

### 2.2 Make `buildSystemPrompt` the ONLY prompt source (replace the inline mega-strings)

The route hand-writes prompts. The Standard already has the 6-layer builder (`system-prompt.ts`) with layers 2–5
constant. Swap every inline prompt for:

```ts
import { buildSystemPrompt } from '@/lib/standard';
const system = buildSystemPrompt({
  role: spec.role, roleAr: spec.roleAr,
  sourcePreferences: spec.sources,         // Tier S/A names per pillar (§14 table)
  islamic: domain === 'religious',
  extraRules: ['When you state a fact, you MUST attach a source object from the pipeline output. No source ⇒ say UNVERIFIED.'],
});
```

This guarantees every bot inherits: Truth-Stack epistemic law, the 8-layer taxonomy block
(`CANONICAL_LAYERS_PROMPT_BLOCK`), Islamic protocol (when religious), safety, locale — exactly §8.

### 2.3 The shared widget already carries the data — surface it

`PageAIChatbot` (`page-ai-chatbot.tsx`) takes `systemPrompt`/`pageContext` and POSTs to `/api/ai/chat`. Two additions:

- **Render the evidence trailer.** When the response JSON has `sources[]` + `enforcement`, draw an **EvidenceChips**
  row under each assistant message: each chip = `[Tier S] Title ↗` linking to the real URL; an `⚠ UNVERIFIED` chip
  (red) when `enforcement.status==='unverified'`. (This is the §13 Scientific Shield, surfaced in chat.)
- **Render the defense card.** When `layer` is present, show `getDefense(layer)` technique + steps — so *talking to the
  bot teaches the cognition technique*, not just the answer.

### 2.4 Per-domain bot specialization (one table, swap Identity+Source only)

| Page / bot | `role` | `sourcePreferences` (Tier S/A) | `islamic` | Pipeline domain |
|---|---|---|---|---|
| six-layers, critical-thinking, bias-fingerprint | "misinformation analyst & cognition coach" | OpenAlex, Semantic Scholar, Crossref, IFCN fact-checks | — | society |
| religion-hub, hadith tools | "Islamic-authenticity checker" | Quran.com, Sunnah.com, HadithAPI, Dorar, Dar al-Iftāʾ | ✅ | religious |
| mental-health, men's/women's shield | "mental-health literacy guide" | WHO, CDC, MHLS/GHSQ instruments | — | mental |
| deepreal, forensic, paper-auditor | "forensic examiner" | OpenAlex, EXIF/C2PA, Crossref | — | scientific |

Everything else (epistemic/taxonomy/safety/locale layers) is constant — exactly §8.

---

## 3. WIRING THE COGNITION TRAINING SURFACES (training ← live verification)

The inoculation paradigm (Verified-Sources Part 1) is **warn → weakened dose → refute → "now spot it."** The *dose* can
be AI-generated; the **refutation and the "real example" MUST be live-verified**, or we are teaching over static content.

### 3.1 Debate Simulator (`/api/debate-sim`) — verify the user's rebuttal

Today the bot argues using a random fallacy from `ALL_FALLACIES` (good — that's the dose). Add the payoff:

- When the user submits their counter-rebuttal, send it to `/api/pipeline/verify`. If the user cited a claim, show
  whether their evidence is real (tier + enforcement). Turns "I think I won the debate" into "your rebuttal was
  grounded in a Tier-A source / your rebuttal was UNVERIFIED."
- Attach `getTechnique(fallacyId)` (from `INOCULATION_TECHNIQUES`) so the reveal names the technique + its one-line
  prebunk — the technique-spotting that *generalizes* (the spine mandate from §17.3 / Verified-Sources §5).

### 3.2 Live-Deception / "rabbit-hole feed" (`/api/live-deception/generate`) — ground the exit ramp

The feed generates an escalating radicalization thread (the dose). Wire the **exit**:

- For each generated post, run `/api/pipeline/verify` on its core claim *behind the scenes at build time of the round*,
  cache the `PipelineOutput`, and reveal it as the "what's really true here" card when the user taps "check this."
- The reveal shows the real Tier-S/A source that refutes the post + the matched `getDefense(layer)` technique. This is
  Layer-6 prescription (Inoculation/Prebunking + Bubble-Exit) made literal.

### 3.3 Bad News / six-techniques game (`bad-news`, `inoculation-passport`)

- Each of the six techniques (Impersonation, Emotion, Polarization, Conspiracy, Discrediting, Trolling) maps to an entry
  in `INOCULATION_TECHNIQUES`. After the player "plays the manipulator," the debrief pulls a **real Egyptian example**
  and runs it through `/api/pipeline/verify` so the player sees the technique caught in the wild with a resolvable source.
- Record technique-mastery to the `inoculation-passport` (spaced boosters, per §17.4 caveat: *use spaced boosters, not
  one-shots* — schedule re-tests via the SRS stub once real, `src/lib/cognition/sm2.ts`).

### 3.4 MIST-20 (`/api/mist`, `mist.ts`) — measure, then remediate with live tools

MIST scoring is deterministic (good). Wire the *remediation loop*:

- A low MIST item (e.g. failed to flag a real headline as real, or fake as fake) recommends the matching FLICC lesson
  AND launches a `/api/pipeline/verify` walkthrough on that exact headline — the user watches the pipeline classify it,
  so the assessment converts directly into a guided verification rep.
- Per the SDT caveat (Verified-Sources §1.5): the remediation must use BOTH true and false items so we build discernment,
  not blanket "say false." The pipeline returning `TRUE` on a real claim is a teaching moment, not a failure.

### 3.5 Six-Layers / Critical-Thinking ladder (`six-layers`, `critical-thinking`)

- Each layer card mounts a **live "try it" box**: user pastes a claim → `/api/pipeline/verify` → the output's `layer`
  and `defense` are highlighted on the very card the user is reading. The static taxonomy becomes a live classifier.
- This is the §13 Scientific Shield mounted on a Cognition-Builder page: on detecting a layer it fires that layer's
  `shieldTools` (real tools) + technique (from `cognition.ts`) — tool + technique together.

### 3.6 Bias-Fingerprint / Fallacy-Engine

- `/api/fallacy-detect` + `/api/bias-detect` already run rule engines + AI. Add the enforcer on their AI-enhancement
  output and feed detected fallacy IDs into `getTechnique` for the prebunk line. Training reflex = "named bias →
  named technique → live source."

---

## 4. THE SHARED REACT PRIMITIVE — `<ScientificShield>` (mount once, everywhere)

Per §13: *implement once as a reusable component fed by `cognition.ts` + `layers.ts`; every page mounts it.* Build:

```tsx
// src/components/shared/scientific-shield.tsx (NEW, "use client")
// Props: { claim?: string; imageBase64?: string; domain; islamic? }
// 1. POSTs to /api/pipeline/verify
// 2. Renders: verdict + confidence badge (HIGH/MEDIUM/CONTESTED/UNVERIFIED, color-coded),
//    EvidenceChips (sources[] with tier + resolvable url),
//    DefenseCard (getDefense(layer): technique, steps, shieldTools),
//    Honesty clause footer: "strongest available counter — not '100% destroyed'."
// 3. Fail-loud: enforcement.status==='unverified' renders the red ⚠ UNVERIFIED state, never hidden.
```

This single component is the surface for §2 (chatbot evidence trailer), §3.5 (six-layers try-it box), and any new page.
Bilingual + RTL + 320px responsive (CLAUDE.md hard rules) baked in once.

---

## 5. DATA-FLOW DIAGRAMS (the two canonical flows)

### 5.1 Chatbot turn (cognition page)

```
User msg ─▶ /api/ai/chat
   │  CovoRouter.analyzeQuery (emotional-intent + fallacy pre-screen, socratic prefix)
   │  factual? ──yes──▶ runVerificationPipeline()
   │                       ├─[1]  /api/search/evidence  (+ islamic/* | forensic/* by domain)
   │                       ├─[1.5] logic-layer adjudication (drop <0.5) ─▶ rerankBy (Cohere)
   │                       ├─[2]  nvidiaFirstGenerateJSON  ⊕  rotatingGenerateObject  (≥2 providers)
   │                       ├─[4]  enforceOneLaw ─▶ applyVerdictEnforcement (UNVERIFIED if unsourced)
   │                       ├─[5]  layer 1–8 classify  ─▶ [6] getDefense(layer)
   │                       └────▶ PipelineOutput
   │  buildSystemPrompt(spec) narrates output ▶ widget renders EvidenceChips + DefenseCard
   └─▶ chit-chat ──no──▶ nvidiaFirstGenerate (+ post-hoc enforceOneLaw on factual sentences)
```

### 5.2 Inoculation training round (debate-sim / live-deception / bad-news)

```
Round start ─▶ generate DOSE (AI fallacy/manipulative post)  [the weakened exposure]
User acts (spots / rebuts) ─▶ /api/pipeline/verify on the round's core claim
   └─▶ REVEAL card: real Tier-S/A refuting source (enforcer-verified)
                   + getDefense(layer).technique/steps
                   + getTechnique(fallacyId).prebunk  [technique-spotting that generalizes]
   └─▶ write mastery to inoculation-passport (spaced boosters via SRS)
```

---

## 6. TOOL-BY-TOOL: where each strong tool plugs in

| Strong tool (file) | Wired into training | Wired into chatbot | Enforcement role |
|---|---|---|---|
| **AI Debunker / SIFT** (`/api/ai/debunker`) | generalized to `runVerificationPipeline`; powers every "try it"/reveal box | `case "claim"` calls the pipeline | provides the One-Law-enforced verdict |
| **Evidence RAG** (`/api/search/evidence`) | the refutation source for debate-sim, live-deception, six-layers, MIST remediation | retrieval step for any factual chat turn | gives resolvable Tier S/A/B/C URLs the enforcer can classify |
| **Cohere rerank** (`cohere-rerank.ts`, `rerankBy`) | reorders the evidence shown in every reveal so the BEST source is first | reorders chat sources by relevance to the question | fail-safe; never breaks the count |
| **Relevance Logic Layer** (`logic-layer.ts`) | ensures the "real example" actually addresses the claim (no keyword-match fakes) | stage 1.5 of every chat verification | drops irrelevant; confidence derived from kept set |
| **Forensic stack** (`/api/forensic/image`,`/c2pa`, exifr) | image rounds (deepreal/six-layers Layer-3 decontext) get EXIF/C2PA | image-bearing chat messages branch to forensics | emits *calibrated score, never a "fake" label* (§17.4 caveat) |
| **One-Law Enforcer** (`output-enforcer.ts`) | every reveal/verdict downgraded to UNVERIFIED if unsourced | every chat factual sentence checked | THE guardrail; `applyVerdictEnforcement` caps confidence |
| **NVIDIA-First + Mega-Rotator** | generation brain for doses AND verdicts | generation brain for chat | cross-verify (≥2 providers) ⇒ CONTESTED on divergence |
| **COVO Router** (`covo-router.ts`) | pre-screens training input for emotional manipulation | already in chat; keep socratic prefix | routes before LLM; Layer-6 reflex |
| **Cognition spine** (`cognition.ts`, `layers.ts`) | every reveal attaches technique+steps | every bot prompt carries the taxonomy block | makes defense concrete (§12), never "think critically" |

---

## 7. BUILD ORDER (dependency-correct, ship-incrementally)

1. **Extract `src/lib/pipeline/verify.ts`** from `/api/ai/debunker` + add logic-layer + cross-verify + derived confidence. *(No UI change; unit-testable: same claim + same sources ⇒ same output — the §11 reproducibility assurance.)*
2. **Add `POST /api/pipeline/verify`** wrapper (+ search-cache like evidence route).
3. **Fix `/api/ai/chat`**: pipeline-back the `claim` mode, delete hardcoded sources, switch prompts to `buildSystemPrompt`, return `sources/enforcement/layer/defense`. *(This alone makes every existing PageAIChatbot One-Law compliant.)*
4. **Build `<ScientificShield>`** + `<EvidenceChips>` + `<DefenseCard>`; wire into `PageAIChatbot`.
5. **Wire training payoffs**: debate-sim reveal, live-deception exit-card, bad-news debrief, MIST remediation, six-layers try-it box — all call `/api/pipeline/verify` + render `<ScientificShield>`.
6. **Spaced boosters**: make the SRS/passport real (`sm2.ts`) so inoculation persists (§17.4 caveat).

Each step is independently shippable and each makes a previously-static surface live-verified.

---

## 8. COMPLIANCE CHECK (this layer against §7 + §16)

- [x] **Real data only** — pipeline output is enforcer-gated; hardcoded chat `sources[]` deleted.
- [x] **Runs the pipeline** — `runVerificationPipeline` = Retrieve→Gate→Cross-verify→Ground→Guard→Diagnose→Prescribe→Output.
- [x] **Sources visible** — `<EvidenceChips>` on every factual block; UNVERIFIED/CONTESTED states real and used.
- [x] **Confidence derived** — §1.3 formula from tier × relevance × agreement; never hardcoded.
- [x] **Layer + defense** — `getDefense(layer)` attached to every output.
- [x] **Islamic graded** — religious domain routes to hadith/quran stack; enforcer + Islamic prompt layer block ungraded narrations.
- [x] **Chatbot present** — every bot is now a pipeline client via `buildSystemPrompt`.
- [x] **Scientific Shield mounted** — one reusable component fed by `cognition.ts` + `layers.ts`.
- [x] **Fails loud** — `enforcement.status==='unverified'` ⇒ red UNVERIFIED; no empty catch, no fake success.
- [x] **Bilingual + RTL + 320px** — baked into `<ScientificShield>` once.

> **The honesty clause stays loud:** the shield is the *strongest available* counter — best real tool + correct
> technique + provenance + honest abstention. We never claim "100% destroyed." That is what survives peer review.
