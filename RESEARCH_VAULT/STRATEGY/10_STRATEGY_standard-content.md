# 10 — STRATEGY: STANDARD / CONTENT (Layer 4)

> **What this is.** The build-ready operating manual for turning the EAL governing standard
> (the One-Law, the S/A/B/C/U tiers, the Truth Stack, the Islamic Authenticity Protocol) into the
> *actual training content and curriculum*: how every lesson and every claim is sourced, how the
> bilingual EN/AR content is authored, how the verified-source catalog (`03_VERIFIED_SOURCES.md`)
> becomes shippable modules, and the content quality gate that reuses the One-Law enforcer already in
> the codebase.
>
> **Grounding.** Every mechanism below is bound to real files that already exist:
> - Standard kernel: `src/lib/standard/{sources.ts, cognition.ts, schema.ts, layers.ts, logic-layer.ts, system-prompt.ts}`
> - One-Law enforcer (AI prose): `src/lib/ai/output-enforcer.ts` → `enforceOneLaw()`, `SourcedAIOutputSchema`, `applyVerdictEnforcement()`
> - One-Law enforcer (static data): `src/components/the-descent/shared/Sourced.tsx`
> - Existing curriculum: `src/data/curriculum/` (144 `days/*.ts`, `phaseN-*.ts`, `100-*-fallacies.ts`)
> - Validated instruments + scoring keys: `src/data/instruments/` + `src/lib/cognition/mist.ts`
> - Trusted-source registry: `src/data/sources/trusted-sources.ts` (100 entries, trust-banded)
> - Arabic validation gate: `src/lib/i18n/arabic-gate.ts` (`SCALE_VALIDATION_REGISTRY`)
> - Inoculation/source research: `RESEARCH_VAULT/STRATEGY/03_VERIFIED_SOURCES.md`
> - Philosophy + tiers: `RESEARCH_VAULT/STRATEGY/01_PHILOSOPHY_DIGEST.md`
>
> **The governing rule (from `00_THE_SCIENTIFIC_STANDARD.md` §0):** *"No claim reaches the user without
> a real, resolvable source behind it. If we cannot ground it, we say so — loudly — and we never
> fabricate to fill the gap."* This document applies that law to **content** — every lesson, every
> example, every quiz item, every Arabic string.

---

## 0. THE PROBLEM THIS LAYER SOLVES

The standard's One-Law was written for *runtime AI output*. But training content is **authored ahead
of time** by humans + AI drafting, and it is just as capable of carrying an unsourced claim — a
made-up statistic in a lesson, an Arabic verse stripped of context, a "studies show…" with no study,
an ungraded hadith, a deception example that never happened. **A confident lesson with no source is
the same failure as a confident chatbot with no source.** §0 corollary, verbatim: *"Mock data, dummy
returns, placeholder content, and confident-but-ungrounded AI text are all the SAME failure."*

So Layer 4's job is to make the content pipeline **structurally incapable of shipping an unsourced
claim**, in either language, while turning `03_VERIFIED_SOURCES.md` into modules that map 1:1 onto the
8-layer taxonomy and the existing 144-day curriculum.

**Five deliverables (the spine of this doc):**
1. **The Content Atom** — the single typed unit every lesson is built from, with mandatory provenance.
2. **The Sourcing Protocol** — exactly how each atom gets its S/A/B/C/U tier, and the Tier-C / Islamic / Layer-8 special rules.
3. **The Bilingual Authoring Protocol** — how EN and AR are authored, the translation-validation gate, and the Egyptian-dialect register.
4. **The Catalog→Module Map** — `03_VERIFIED_SOURCES.md` turned into concrete modules bound to layers + curriculum days.
5. **The Content Quality Gate** — an automated CI gate that reuses `output-enforcer.ts` to fail-loud on any unsourced atom *before build*.

---

## 1. THE CONTENT ATOM — the unit of all training content

Everything the user reads is composed of **Content Atoms**. An atom is the smallest publishable claim
+ its provenance. This is the content analogue of the standard's uniform output schema
(`schema.ts: StandardClaimResult`) and it is what the quality gate validates.

### 1.1 The atom type (new file: `src/lib/content/atom.ts`)

```ts
import { z } from 'zod';
import { SourceTier } from '@/lib/standard/sources';

/** One bilingual, sourced claim. The unit the One-Law gate validates. */
export const ContentAtomSchema = z.object({
  id: z.string(),                          // stable, e.g. "atom.inoc.emotion.def"
  kind: z.enum([
    'concept',        // a definition / explanation
    'claim',          // an empirical assertion (needs S/A evidence)
    'example',        // a real, named deception case (needs B/C provenance + date)
    'technique',      // a manipulation technique (maps to INOCULATION_TECHNIQUES id)
    'defense',        // a cognition-builder step (maps to COGNITION_BUILDER layer)
    'verse',          // Qur'an — requires surah:ayah + tafsir + context (§4)
    'hadith',         // requires collection+book+number+grade (§4.2)
    'instrument-item',// a validated scale item (maps to src/data/instruments)
    'quiz',           // an assessment question (answer keyed)
  ]),
  // ── Bilingual body (BOTH required; AR may be gated, see §3) ──
  en: z.string().min(1),
  ar: z.string().min(1),
  arRegister: z.enum(['msa', 'egyptian', 'mixed']).default('egyptian'),
  // ── Taxonomy binding (every atom must locate itself on the map) ──
  layer: z.number().min(1).max(8).optional(),      // DECEPTION_LAYERS
  techniqueId: z.string().optional(),               // INOCULATION_TECHNIQUES id
  pillar: z.enum(['scientific','religious','mental','society']),
  category: z.enum(['verification','cognition-builder']),
  // ── PROVENANCE (the One-Law field — never empty for claim/example/verse/hadith) ──
  sources: z.array(z.object({
    title: z.string(),
    url: z.string().url(),
    tier: z.custom<SourceTier>().optional(),  // derived by classifyTier, not hand-set
    locator: z.string().optional(),           // page/§/timestamp/DOI/surah:ayah/collection#
    quote: z.string().optional(),             // the exact supporting sentence
    accessedISO: z.string().optional(),
  })),
  // ── Islamic-specific (required when kind ∈ {verse,hadith}) ──
  islamic: z.object({
    ref: z.string(),                          // "2:191" or "Bukhari 1:1:1"
    grade: z.enum(['sahih','hasan','daif','mawdu','quran']).optional(),
    context: z.string(),                      // surrounding-context restoration (Layer 3 defense)
    tafsir: z.string().optional(),            // Ibn Kathir / al-Tabari / al-Qurtubi
    warningIfWeak: z.boolean().default(false),// daif/mawdu shown ONLY to warn → render red
  }).optional(),
  // ── Confidence + state (mirrors schema.ts ConfidenceLabelEnum) ──
  state: z.enum(['VERIFIED','CONTESTED','UNVERIFIED']).default('VERIFIED'),
  reviewedBy: z.string().optional(),          // human reviewer initials (audit trail)
  lastVerifiedISO: z.string(),
});
export type ContentAtom = z.infer<typeof ContentAtomSchema>;
```

### 1.2 Why this shape (each field is load-bearing)

| Field | Enforces (standard §) | Failure it prevents |
|---|---|---|
| `sources[]` non-empty for `claim/example/verse/hadith` | §0 One-Law, §2 Strategy 2 | "studies show…" with no study |
| `tier` derived via `classifyTier()` not hand-set | §3 tier whitelist | author inflating a blog to "Tier S" |
| `locator` + `quote` | §5 Layer 3 (decontextualization) | citing a real paper that doesn't say it |
| `islamic.grade` required on `hadith` | §4.2 isnād rule | the "single worst violation": ungraded narration shown as authentic |
| `islamic.context` required on `verse` | §4.3 + Layer 3 | verse-stripping (the documented Q 2:191 attack vector) |
| `en` AND `ar` both required | CLAUDE.md bilingual rule | an English-only or untranslated lesson shipping |
| `layer` / `techniqueId` | §5 + §12 | a lesson that teaches no specific defense ("think critically" — banned) |
| `state` ∈ {VERIFIED,CONTESTED,UNVERIFIED} | §2 Strategy 3 | a contested claim shown as settled fact |

### 1.3 Atom → Lesson → Module → Day (the composition hierarchy)

```
ContentAtom            ← smallest sourced claim (this file)
  └─ Lesson            ← ordered atoms + 1 active exercise (role-play / quiz / verify-this)
       └─ Module       ← lessons grouped by a single deception layer or technique family
            └─ Day      ← maps to the existing src/data/curriculum/days/dayN.ts (144 exist)
                 └─ Phase ← the existing phaseN-*.ts (0..4)
```

The existing `DailyExercise` interface (`days/day1.ts`) is **deliberately thin** (`prompt` only).
This strategy upgrades it: each `dayN.ts` gains an `atoms: ContentAtom[]` field (or references atom
ids), so the 144-day skeleton stays but is now **filled with sourced atoms** instead of a bare prompt
string. No rewrite of the curriculum structure — we **hydrate** it.

---

## 2. THE SOURCING PROTOCOL — how every atom gets its tier

This is the operational unfolding of §3 (tier whitelist) and §0 (One-Law) onto authored content. The
tier is **never typed by hand** — it is computed by the same `classifyTier()` the runtime uses, so
content and runtime can never diverge.

### 2.1 The author's 4-question gate (run BEFORE writing the atom)

Lifted from §1's "three questions" + the §11 methodology contract, specialized for content:

1. **Where did this come from?** → a real URL that `classifyTier()` resolves to S/A/B/C.
   If it resolves to **U**, the atom is blocked unless re-sourced.
2. **What exactly supports it?** → fill `locator` + `quote`. The quote must literally contain the claim.
3. **Which layer/technique does it teach, and what's the defense?** → fill `layer`/`techniqueId`.
4. **Could I show it's real to a reviewer?** → the `reviewedBy` + `lastVerifiedISO` audit trail.

### 2.2 Tier-assignment rules (deterministic, from `sources.ts`)

- **Tier S** (academic primary): effect-size claims, meta-analyses, instrument psychometrics
  (e.g. inoculation Cohen's d, MHLS α=.873) — MUST cite the primary paper/DOI, never a news write-up.
  Sources: OpenAlex / Crossref / Semantic Scholar / EuropePMC / DOAJ / PubMed (all already wired at
  `/api/search/evidence`).
- **Tier A** (institutional): framework/curriculum claims (UNESCO MIL, WHO infodemic 4-level, Cochrane/GRADE).
- **Tier B** (fact-check/OSINT): the *examples* — debunked Egyptian claims, IFCN ClaimReview items,
  AFP/Reuters/Misbar/Fatabyyano debunks. An `example` atom's provenance lives here.
- **Tier C** (community lead): Wikipedia ONLY as a lead → **§3 Tier-C rule is binding in content too**:
  *"A Tier-C source is a lead, never a proof. Chase it to a Tier S/A primary or mark the claim
  CONTESTED."* In practice: a Tier-C-only atom is auto-set `state: 'CONTESTED'` by the gate (§5.3).
- **Tier U / no source** → atom **rejected at the gate**; if the concept must appear, it ships as
  `state: 'UNVERIFIED'` and is visually flagged (the `<Sourced>` `[⚠ UNVERIFIED]` render path).

### 2.3 The canonical-example rule (anti-fabrication for `example` atoms)

§5 / §10 forbids inventing examples: *"Canonical example corpus (do not invent new examples)."* The
content protocol enforces this:

- **Global examples** must come from the canonical corpus already in the codebase
  (`src/components/six-layers/data.ts`, `layer8Cases.ts`): Piltdown Man, Wakefield, Operation
  INFEKTION, Nayirah, Tobacco Playbook, Cambridge Analytica, Pegasus, Operation Gladio.
- **Egyptian examples** must come from `src/data/cases/chunk*.ts`, the `/api/kill-list` curated archive,
  or a dated Tier-B Arabic debunk (Da Begad / Fatabyyano / Misbar / AFP-Arabic — see
  `03_VERIFIED_SOURCES.md` Part 4). Each carries a **date** (`locator`) so Layer-4 (timing) is testable.
- **No author may invent a "plausible" Egyptian rumor.** If a needed example doesn't exist in the
  corpus, the author either (a) sources a real one, or (b) builds a clearly-labelled *synthetic
  training scenario* tagged `kind:'example'`, `state:'UNVERIFIED'`, `sources:[]` with a banner
  "تمرين تدريبي / training scenario — not a real event." The gate permits this ONLY with that label.

### 2.4 The Islamic sourcing rules (§4 — law before anything else)

For `kind:'verse'` and `kind:'hadith'`, the sourcing protocol is stricter than the scientific side:

- **Verse atoms** — pull from `/api/islamic/quran` (alquran.cloud / quran.com). MUST carry
  `islamic.context` (the verse before + after) and a recognized `tafsir`. The Q 2:191 verse-stripping
  vector is the named test case: any war/violence verse atom **without** `context` is auto-rejected.
- **Hadith atoms** — pull from `/api/islamic/hadith` (HadithAPI.com primary, Dorar fallback). MUST
  carry `islamic.grade` from the **source's own grading**, plus collection+book+number in `islamic.ref`.
  A `grade` of `daif`/`mawdu` is allowed **only** with `warningIfWeak:true` (renders red). An atom with
  `kind:'hadith'` and no `grade` is the single worst violation (§4.2) → the gate hard-fails the build.
- **Fatwā / ruling atoms** — Dar al-Iftāʾ / Al-Azhar are Tier-A Islamic authorities; IslamQA-type
  single-school opinions must be flagged `arRegister` notes + a "single-school opinion" banner.

### 2.5 Confidence on content (reuse `deriveConfidenceLabel`)

Content atoms do not invent a confidence number. For `claim` atoms that aggregate multiple sources,
the build step calls the **existing** `deriveConfidenceLabel()` (`schema.ts`) with:
`{ topTier, sourceCount, agreement: (sources don't contradict), unsupportedCount: 0 }`. This yields the
same HIGH/MEDIUM/CONTESTED/UNVERIFIED label the runtime uses — **one confidence function for content
and runtime.** A single Tier-C source ⇒ CONTESTED; no source ⇒ UNVERIFIED. Hardcoding a confidence in
content is the same banned act as the `api-swarm.ts` hardcoded-score bug (§9).

---

## 3. THE BILINGUAL AUTHORING PROTOCOL (EN / AR — Egyptian-aware)

CLAUDE.md is explicit: *"Bilingual: English + Arabic (Egyptian dialect aware)," "Arabic RTL support
required on all pages."* And §4.3 makes Arabic the **higher-stakes** language because the religious
exploitation vectors land hardest here. So the AR side is not a translation afterthought — it is
co-primary and gated.

### 3.1 The authoring order (EN-anchor, AR-validated)

1. **Author EN first** as the source-anchored canonical text (it's where the S/A citations are vetted).
2. **Author AR as a localization, not a literal translation.** Egyptian register by default
   (`arRegister: 'egyptian'`): plain, concrete, the way a Cairo WhatsApp message actually reads — *not*
   stiff MSA. MSA is reserved for `verse`/`hadith`/legal-ruling atoms (`arRegister: 'msa'`).
3. **Examples are re-localized, not translated.** A US tobacco-industry example keeps its EN form but
   the AR lesson pairs it with an **Egyptian** equivalent example (e.g. a viral "natural cure" claim)
   so the AR learner sees a case from their own information environment. This is the IREX L2D
   "emotion-as-detector with local material" principle (`03_VERIFIED_SOURCES.md` §2.4).
4. **Glossary lock.** Every deception-technique and tier term uses the **canonical Arabic glossary**
   (below). Authors may not coin new Arabic terms ad-hoc — terminology drift breaks the shared
   vocabulary the standard depends on.

### 3.2 The canonical Arabic glossary (single source of truth)

Already half-present across `cognition.ts` (`techniqueAr`, `nameAr`), `layers.ts` (`nameAr`,
`defenseAr`), and `arabic-gate.ts`. **Consolidate into `src/data/i18n/glossary-ar.ts`** as the
authoritative map; every AR atom string must use these exact terms. Seed (verbatim from the codebase):

| EN term | Canonical AR | Source file |
|---|---|---|
| Absolute Fabrication | الكذب المطلق | `layers.ts` |
| The Biased Lens | العدسة المنحازة | `layers.ts` |
| Decontextualization | اقتطاع السياق | `layers.ts` |
| Weaponized Timing | التوقيت المسلّح | `layers.ts` |
| Lateral Reading + SIFT | القراءة الجانبية + سِفت | `cognition.ts` |
| Omission Audit | تدقيق الحذف | `cognition.ts` |
| Inoculation / Prebunking | التلقيح المعرفي / الدحض الاستباقي | `cognition.ts` |
| Emotional Manipulation | التلاعب العاطفي | `cognition.ts` |
| Fake Experts | خبراء زائفون / انتحال | `cognition.ts` |
| Cherry Picking | انتقاء الكرز | `cognition.ts` |
| Sahih / Hasan / Daif / Mawdu | صحيح / حسن / ضعيف / موضوع | §4.2 |

UNESCO's Arabic "Think Critically, Click Wisely" (`03_VERIFIED_SOURCES.md` §2.1) is the external
anchor for any term not yet in the codebase — adopt its wording to stay aligned with the regional MIL
standard, rather than inventing.

### 3.3 The Arabic translation-validation gate (reuse `arabic-gate.ts`)

The codebase already has `SCALE_VALIDATION_REGISTRY` (`src/lib/i18n/arabic-gate.ts`) that hides
**unvalidated** Arabic instrument translations. **Generalize the same pattern to all content atoms.**
An AR string carries a validation status; unvalidated AR for high-stakes atoms is gated:

```ts
// extend the existing ScaleValidationStatus pattern to content
arValidation: 'full' | 'back_translation' | 'expert_review' | 'pending'
```

- `instrument-item`, `verse`, `hadith` atoms: AR **must** be `full` or `back_translation` to ship
  (psychometric/scriptural fidelity is non-negotiable — same logic that gates GHSQ today).
- `concept`, `example`, `defense` atoms: AR may ship at `expert_review`; `pending` renders with a
  small "ترجمة قيد المراجعة" (translation under review) chip rather than being hidden.
- Back-translation note from the registry is the model: MIST-20's AR was *"Contextualized for Egyptian
  news environment — Western political items replaced with MENA equivalents."* Every gated AR atom
  records its equivalent localization note.

### 3.4 RTL + responsive content rules (build-checkable)

- Every atom renders inside the existing RTL-aware components; AR strings must not embed LTR-only
  punctuation tricks. Mixed AR/EN (a transliterated term + Arabic) uses `arRegister:'mixed'`.
- Content must read at **320px** (CLAUDE.md). Lesson atoms therefore cap example text length and use
  the existing `<Sourced>` chip for citations rather than long inline URLs.

---

## 4. THE CATALOG → MODULE MAP (turning `03_VERIFIED_SOURCES.md` into shippable content)

This is the heart of "how the verified-source catalog becomes modules." Each module is a set of
ContentAtoms, bound to a **deception layer** (`layers.ts`), a **cognition technique**
(`cognition.ts`), the **real source** from the catalog, and a slot in the **144-day curriculum**.

### 4.1 The module spec (new file: `src/data/curriculum/modules/<id>.ts`)

```ts
interface ContentModule {
  id: string;
  titleEn: string; titleAr: string;
  layer: number;                 // DECEPTION_LAYERS
  techniqueId?: string;          // INOCULATION_TECHNIQUES
  pillar: 'scientific'|'religious'|'mental'|'society';
  category: 'verification'|'cognition-builder';
  methodologySource: string;     // the §11 published method (paper/curriculum) + URL
  atoms: ContentAtom[];          // the sourced body
  activeExercise: 'role-play'|'spot-the-technique'|'verify-this'|'quiz'|'omission-audit';
  curriculumDays: number[];      // which dayN.ts this hydrates
  boosterDays: number[];         // spaced-repetition re-exposure (§17 caveat, below)
}
```

### 4.2 The catalog-to-module table (build-ready backlog)

Each row = one module. "Lead source" is the real, citable backbone from `03_VERIFIED_SOURCES.md`;
"Tier" is what `classifyTier()` assigns its primary citations.

| Module | Layer / Technique | Lead source (catalog §) | Tier | Active exercise | Pillar |
|---|---|---|---|---|---|
| **The 6 Manipulation Techniques** (role-play) | L6 / all `INOCULATION_TECHNIQUES` | Bad News, Roozenbeek & van der Linden 2019 (§1.2) | S | role-play ("become the manipulator 5 min") | society |
| **Cross-cultural inoculation works** (claim) | L6 / inoculation | HKS Misinfo Review 2020, d=.24–.41 (§1.2) | S | quiz | society |
| **11 Tactics short-video set** | L1–L6 / fake-expert, false-dichotomy, scapegoating… | Jigsaw/Cambridge *Science Advances* 2022 (§1.3) | S | spot-the-technique | society |
| **3 Prebunking modes** (content rubric) | L6 | Jigsaw Practical Guide (§1.4) | A | — (author tool) | society |
| **Calibrated claims about prebunking** | L8 / Bayesian | Lu et al. 2023 JMIR d=−.36 (§1.5) + 2025 SDT caveat | S | confidence-check | society |
| **Lateral Reading reflex** | L1 / SIFT | Stanford COR 3 questions (§2.5) | A | verify-this (Egyptian site) | society |
| **SIFT 30-sec gut-check** | L1, L3 / SIFT | Caulfield, CC BY 4.0 (§2.7) | A | verify-this | society |
| **Information Disorder vocabulary** | naming layer | Wardle & Derakhshan / CoE 2017 (§2.6) | A | quiz | society |
| **Emotion-as-detector** | L6 / emotion | IREX L2D, JMLE 2018, ~1.5y persistence (§2.4) | S | omission-audit | mental |
| **Evidence-strength pyramid** | L2, L8 / GRADE | Cochrane/GRADE (§3.3) | A | quiz | scientific |
| **WHO infodemic 4-level** (architecture) | L6/L7 | WHO infodemic framework (§3.2) | A | — | society |
| **IFCN: how to vet a fact-checker** | L1 / fake-expert | IFCN 5 commitments (§3.1) | B/A | verify-this | society |
| **Hands-on media verification** | L1/L3 / decontextualization | Verification Handbook **Arabic** (§3.4) | B | verify-this (image/video) | scientific |
| **Egyptian debunk casebook** | L1–L4 examples | Da Begad/Fatabyyano/Misbar/AFP-Ar (§4.1–4.5) | B | spot-the-technique | society |
| **Vaccine/“natural cure” health track** | L5/L6 | WHO + Cochrane + AFP-Ar health debunks | S/A/B | verify-this | scientific |
| **Religious-exploitation shield** | L5/L6 + §4 | Quran/Hadith APIs + Dar al-Iftāʾ (§4 protocol) | A(Islamic) | restore-context | religious |

### 4.3 Mapping rules (so modules don't drift from the standard)

- **Every module declares `{category, pillar}`** (§14) and binds to exactly one primary `layer`.
- **Every module cites its methodology source** in BOTH the page and the chatbot prompt (§16 addendum).
  E.g. the inoculation module names *Roozenbeek & van der Linden 2019* on-page; the bot's system prompt
  (via `system-prompt.ts`) carries the same citation so the bot can answer "where's this from?".
- **Effect sizes are quoted, never rounded up** (§intellectual honesty). The module says
  "d=.24–.41 across 4 languages, none Arabic" — it does **not** claim "proven to work in Egypt." The
  Arabic-validation gap is stated as a gap (it's the project's stated research opportunity).
- **Spaced boosters, not one-shots.** §17 caveat (verbatim): *"use spaced boosters, not one-shots"* —
  a 2025 Swedish study found one-shot inoculation didn't durably help. So every inoculation module
  sets `boosterDays` (re-exposure at +7/+21/+60 days) inside the 144-day schedule, and the
  IREX persistence finding (~1.5y) is cited as the *target*, not a guarantee.
- **Discernment, not blanket distrust.** Per the 2025 SDT critique (`03` §1.5), every `quiz`/assessment
  module must test accuracy on **true AND false** items, so we don't train people to just say "false."
  This is a hard authoring rule for `kind:'quiz'` atoms.

### 4.4 Reuse, don't rehost (license discipline — §15 integration policy)

`03_VERIFIED_SOURCES.md` license legend is binding on content:
- 🟢 **SIFT (CC BY 4.0)** and 🟢 UNESCO OER / JMIR (CC BY) / HKS articles → may be adapted into atoms
  with attribution. These are the safe-to-reuse backbone.
- 🟡 Bad News / Inoculation Science videos / COR → **re-implement the open-science paradigm with
  original Arabic atoms**; link to the official asset, do not rehost it.
- 🔴 IFCN / fact-checker archives / Cambridge SDMLab page → **cite only**; use as the *method* and the
  *example source*, never copy their text into an atom.
- Each atom's `sources[].url` is the attribution; the build gate (§5) verifies the URL resolves and
  classifies, which doubles as the license-attribution check.

---

## 5. THE CONTENT QUALITY GATE (reuse the One-Law enforcer)

This is the enforcement teeth: a **build-time gate** that makes shipping an unsourced atom impossible.
It reuses the *exact* code already enforcing the One-Law on runtime AI output, so content and runtime
obey one law with one implementation.

### 5.1 What it reuses (no new enforcement logic invented)

- `enforceOneLaw(candidates)` (`output-enforcer.ts`) — already returns `verified|unverified` based on
  whether ≥1 source classifies to Tier S–C. We feed it each atom's `sources[]`.
- `classifyTier(url)` (`sources.ts`) — assigns S/A/B/C/U from the URL. Atom tiers come from here, never by hand.
- `deriveConfidenceLabel(...)` (`schema.ts`) — derives the atom's CONTESTED/UNVERIFIED state.
- `<Sourced>` (`the-descent/shared/Sourced.tsx`) — the **render-time** twin: any atom that slips
  through with empty sources renders as `[⚠ UNVERIFIED]` instead of as fact (defense in depth).

### 5.2 The gate script (new: `scripts/verify-content.ts`, wired into `npm run build`)

For every atom in `src/data/curriculum/**` and `src/data/curriculum/modules/**`:

```
for each ContentAtom a:
  1. SCHEMA       → ContentAtomSchema.parse(a)            // shape, both languages present
  2. ONE-LAW      → if a.kind ∈ {claim,example,verse,hadith}:
                       r = enforceOneLaw(a.sources)
                       if r.status === 'unverified' AND a.state !== 'UNVERIFIED'  → FAIL LOUD
  3. TIER TRUTH   → for each src: assert classifyTier(src.url).tier === src.tier  // no hand-inflated tiers
  4. ISLAMIC      → if kind==='hadith' && !a.islamic.grade                        → FAIL (worst violation §4.2)
                     if kind==='verse'  && !a.islamic.context                     → FAIL (verse-stripping)
                     if grade ∈ {daif,mawdu} && !warningIfWeak                    → FAIL
  5. TAXONOMY     → if category==='cognition-builder' && !a.layer && !a.techniqueId → FAIL (no generic "think critically")
  6. BILINGUAL    → assert a.en && a.ar; if high-stakes kind, assert arValidation ∈ {full,back_translation}
  7. CONTESTED    → if topTier(a.sources)==='C' && a.state==='VERIFIED'           → FAIL (Tier-C rule §3)
  8. EXAMPLE-REAL → if kind==='example' && sources empty && !label('training scenario') → FAIL
  9. LINK-RESOLVE → (CI-only) HEAD each url; dead link → WARN (or FAIL in release build)
exit 1 on any FAIL  → build does not ship
```

This is the content analogue of the §7 per-feature contract, run as code. **"If a box can't be
ticked, it's not done"** becomes **"if an atom can't pass, the build fails."**

### 5.3 The state machine (how a failing atom degrades, never silently)

```
authored atom
   │
   ├─ has Tier S/A/B source + locator/quote        → VERIFIED   (renders normally, with <Sourced> chip)
   ├─ only Tier C source                            → CONTESTED  (renders with "lead — verify" badge)
   ├─ sources contradict / models disagreed         → CONTESTED
   ├─ no admissible source                          → UNVERIFIED (renders [⚠ UNVERIFIED]; blocked unless labelled)
   └─ hadith w/o grade  |  verse w/o context        → BUILD FAILS (cannot ship at all)
```

Mirror of `deriveConfidenceLabel`'s own ordering (abstain > contested > quality) — same precedence,
applied to content.

### 5.4 The human review layer (the gate catches structure; humans catch meaning)

The script proves an atom *has* a resolvable source; it cannot prove the source *says what the atom
claims*. So:
- Every `claim`/`verse`/`hadith` atom requires `reviewedBy` + `lastVerifiedISO` before `state:'VERIFIED'`.
- A reviewer checks the `quote` literally supports the claim and (for Islamic atoms) the grade/context
  match the source — the §11 "proof test." Religious atoms get a second reviewer (the §4 duty of care).
- `lastVerifiedISO` older than 12 months → CI WARN to re-verify (sources move; OpenAlex key/policy
  changes per §17.4 are the reminder that "verified once" isn't "verified forever").

---

## 6. THE CHATBOT-CONTENT CONTRACT (content the bots stand on)

Every page chatbot uses the §8 6-layer template (`system-prompt.ts`). Content Layer 4 supplies the
**Source layer + scenario set** that gets swapped in per domain:

- The bot's system prompt is injected with the page's module `methodologySource` + the atom `sources[]`,
  so the bot answers *over the same vetted atoms the page shows* (Strategy 1 grounding) — it does not
  free-associate. This is the `COGNITION_PROMPT_BLOCK` pattern already in `cognition.ts`, extended with
  the module's atoms.
- The bot inherits the **same** `enforceOneLaw` / `SourcedAIOutputSchema` on its output, so a bot
  answer with empty `sources[]` is downgraded to UNVERIFIED exactly as an atom would be. **One law,
  three surfaces: static atom, page render, bot answer.**

---

## 7. BUILD ORDER (what to ship, in order)

Aligned to §17.5 build order and the existing assets (don't rebuild what exists):

1. **Kernel files (1 day):** `src/lib/content/atom.ts` (ContentAtomSchema) + `scripts/verify-content.ts`
   (reusing `enforceOneLaw`/`classifyTier`/`deriveConfidenceLabel`). Wire into `npm run build`.
2. **Glossary lock (0.5 day):** consolidate `src/data/i18n/glossary-ar.ts` from `cognition.ts` +
   `layers.ts` + `arabic-gate.ts`. Extend `arabic-gate.ts` validation pattern to atoms.
3. **Seed module (1 day):** author the **SIFT 30-sec gut-check** module end-to-end (🟢 CC BY 4.0, lowest
   license risk, highest reuse) as the reference implementation every other module copies. Pass the gate.
4. **Inoculation core (the spine, §17.5 step 3):** the **6 Manipulation Techniques** role-play module +
   spaced boosters, bound to L6 and `INOCULATION_TECHNIQUES`. Egyptian examples from `cases/` + kill-list.
5. **Verification reflexes:** Lateral Reading (COR) + Verification Handbook (Arabic) modules → bind to
   the existing forensic/evidence APIs (`02_API_CAPABILITY_MAP.md`) as the "verify-this" exercises.
6. **Religious shield (§4 first):** the religious-exploitation module — authored under double review,
   every verse with context, every hadith graded, before it touches the curriculum.
7. **Hydrate the 144 days:** map modules → `curriculumDays`, replacing each `dayN.ts` bare `prompt`
   with its `atoms`. Phases 0→4 already exist; fill them.
8. **MIST-baseline tie-in:** modules feed the existing `/api/mist` + instruments so pre/post
   measurement (the §11 proof test) runs on real, validated scales (MIST-20, MHLS) — already coded.

---

## 8. THE CONTENT COMPLIANCE CONTRACT (the per-atom checklist — the review gate)

A content atom is **done** only when every box ticks (the content twin of §7):

- [ ] **Both languages present** — `en` and `ar`, AR in correct register; high-stakes AR validated (§3.3).
- [ ] **One-Law passes** — `enforceOneLaw(sources)` = verified, OR atom honestly labelled UNVERIFIED/training-scenario.
- [ ] **Tier is derived** — every `src.tier === classifyTier(src.url).tier`; no hand-inflated tiers.
- [ ] **Locator + quote** — the cited source literally contains the claim (Layer-3 defense baked in).
- [ ] **Taxonomy bound** — `layer` and/or `techniqueId` set; the specific technique named (not "think critically").
- [ ] **Islamic atoms graded/contextualized** — hadith: collection+number+grade; verse: context+tafsir.
- [ ] **Confidence derived** — `state` from `deriveConfidenceLabel`, never hardcoded.
- [ ] **Example is real** — from canonical/Egyptian corpus, dated, or labelled a training scenario.
- [ ] **License respected** — 🟢 adapt, 🟡 re-implement+link, 🔴 cite-only.
- [ ] **Reviewed** — `reviewedBy` + `lastVerifiedISO`; religious atoms double-reviewed.
- [ ] **Renders to 320px, RTL-correct, with a `<Sourced>` chip.**
- [ ] **`npm run build` (incl. `verify-content`) passes.**

> **Closing principle (echoing §10):** the standard is the constitution; **content serves it.** A
> lesson that cannot show where it came from does not teach awareness — it performs the very thing we
> inoculate against. The gate makes that lesson impossible to ship.

---

### Provenance of this strategy
Bound to real files under `C:/Users/pc/Desktop/EGY/New folder (20)/egyptian-awareness-library/`:
`src/lib/standard/{sources,cognition,schema,layers,logic-layer,system-prompt}.ts` ·
`src/lib/ai/output-enforcer.ts` · `src/components/the-descent/shared/Sourced.tsx` ·
`src/data/curriculum/{days/*.ts, phase*.ts, 100-*-fallacies.ts}` · `src/data/instruments/*` ·
`src/lib/cognition/mist.ts` · `src/data/sources/trusted-sources.ts` · `src/lib/i18n/arabic-gate.ts` ·
`src/components/six-layers/{data,layer8Cases}.ts` · `src/data/cases/chunk*.ts`.
Standard: `HI CLAUDE/00_THE_SCIENTIFIC_STANDARD.md` (§0–§17) + `CLAUDE.md`.
Research inputs: `RESEARCH_VAULT/STRATEGY/{01_PHILOSOPHY_DIGEST, 02_API_CAPABILITY_MAP, 03_VERIFIED_SOURCES}.md`.
