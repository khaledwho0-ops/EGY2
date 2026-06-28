# Egyptian Awareness Library (EAL)

> A bilingual (English / Egyptian-Arabic) evidence-based platform for misinformation defense, scientific literacy, and mental-health literacy — built for Egyptian university students.

**Live:** **[egy2.vercel.app](https://egy2.vercel.app)** · Next.js 15 · React 19 · TypeScript · Tailwind v4 · Deployed on Vercel

---

## What it is

EAL is a deployable web platform that ships three things together:

1. **Verification engines** — pasted-claim debunkers, image/media forensics, fact-check aggregators, Islamic-text authentication tools, and a 7-layer deception-analysis pipeline.
2. **A 140-day Cognition Curriculum** — bilingual daily exercises that build the *habits of mind* science says protect against pseudoscience: retrieval, calibration, self-explanation, considering the opposite, active inoculation, argument decomposition. Anchored to a real Egyptian case study («نظام الطيبات»).
3. **A measurement layer** — confidence calibration, signal-detection discrimination guard (so the build provably makes users discerning, not cynical), and the validated MIST-20 / MHLS / Brief-RCOPE psychometric instruments planned for an N=84 pilot study.

Everything operates under one binding rule — **the One-Law**: no claim reaches the user without a real, resolvable source. When the platform can't ground a fact, it says so loudly ("UNVERIFIED / غير موثّق") rather than fabricating.

## Scale at a glance

| | |
|---|---|
| Routes | **135 pages** · **86 API endpoints** · 10 categories |
| Cognition curriculum | **140 days · 721 exercises · 0 unsourced** (verified) |
| Exercise mechanics | 8 evidence-based (recognize, calibrate, self-explain, consider-opposite, inoculate, decompose, retrieve, transfer) |
| AI providers (failover stack) | 7× Gemini · 5× Groq · NVIDIA · Cohere · Cerebras · OpenRouter · HuggingFace · Together · SambaNova · Cloudflare · Moonshot · OpenAlex · SightEngine |
| i18n | English + Egyptian Arabic, full RTL on every page |

## Quick start

```bash
git clone https://github.com/khaledwho0-ops/EGY2.git
cd EGY2
npm install --legacy-peer-deps
cp .env.example .env.local       # add at least JWT_SECRET + one AI key
npm run dev                      # http://localhost:3000
```

Production build:

```bash
npm run build
npm start
```

See **[docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)** for the full Vercel deploy guide (env vars, branch previews, rollback).

## Project layout

```
src/
├── app/                     # Next.js App Router (135 page.tsx, 86 route.ts)
│   ├── cognition-curriculum/    # The 140-day course player (bilingual + measurement)
│   ├── explore/                 # The 124-tool catalog hub
│   ├── deepreal/                # Media forensics engine
│   ├── mental-health/           # PHQ-9 + literacy + crisis lines
│   ├── religion-hub/            # Hadith / fatwa / Quran verification suite
│   ├── angry-debunkers/         # Truth-sandwich claim debunker
│   └── api/                     # 86 backend routes
├── components/              # 200+ React components (engines, charts, RTL UI)
├── data/
│   ├── cases/eltaybat-case-001.ts        # Sourced anchor: 12 red flags, 16 biases, evidence ladder
│   └── exercises/cognition/              # 140 daily exercise JSONs + manifest
├── lib/
│   ├── ai/                  # Multi-provider rotator (Gemini-first, 12 failovers)
│   ├── cognition/           # FLICC, MIST-20, SM-2, calibration profile, SDT guard
│   ├── debunking/           # Classifier + API swarm + workers
│   └── standard/            # Executable form of the One-Law
├── data/exercises/cognition/_ENGINE_V2_SPEC.md     # The 8-mechanic spec
└── data/exercises/cognition/_AUTHORING_BRIEF.md    # Content rules + One-Law contract
docs/
├── DEPLOYMENT.md            # Vercel deploy guide
└── HANDOFF.md               # Contributor handoff (the project's "law")
HI CLAUDE/                   # The governing scientific standard (binding for all output)
```

## The One-Law (governing standard)

`HI CLAUDE/00_THE_SCIENTIFIC_STANDARD.md` is the project's constitution. Every page, chatbot, API route, and AI output complies with it. Key contracts:

- **No fabrication.** If a claim can't be sourced, render `UNVERIFIED / غير موثّق`.
- **Source tier whitelist.** Tier S (peer-reviewed, WHO/CDC/Cochrane) → Tier 1 (mainstream journalism) → Tier 5 (no source).
- **Islamic Authenticity Protocol.** Hadith / fatwa output requires real, attributable references; never invent a chain.
- **8-layer deception taxonomy.** Every verdict tags which layer of manipulation the claim uses.

The code references it in 8+ source files (`src/lib/standard/*`, `src/lib/ai/output-enforcer.ts`).

## Pilot study (honest disclosure)

The platform is **designed for** a quasi-experimental N=84 study (pre/post with control) measuring misinformation resilience (MIST-20), mental-health literacy (MHLS, GHSQ), and positive religious coping (Brief RCOPE). The efficacy engine is built; the *measured* Egyptian effect size is currently **N=0** — the real number comes from the pilot. We deliberately do not claim measured efficacy.

## Tech stack

- **Framework:** Next.js 15.5.19 (App Router), React 19, TypeScript 5, Tailwind v4
- **AI:** Vercel AI SDK + 12-provider failover rotator (`src/lib/ai/`)
- **Data viz:** Recharts, Nivo, D3.js
- **NLP:** wink-nlp, natural, VADER sentiment
- **i18n:** i18next, full RTL
- **Auth:** jose (JWT), bcryptjs
- **Testing:** Vitest, Playwright, Testing Library
- **Deploy:** Vercel (auto-deploy on `git push`)

## Status

- ✅ Cognition curriculum complete (140 days, all v2 mechanics, 0 unsourced)
- ✅ Deployed to production with all AI keys configured
- ✅ All 135 pages + 86 APIs build clean
- ✅ Validators in place (`scripts/validate-cognition.js`, `gen-manifest.js`)
- ⚠️ The N=84 pilot is scheduled; effect-size measurements are pending
- ⚠️ Some specialised pages (BLACKBOX, Medical Life) flag "real-data depth pending" honestly per the One-Law

## Contributing

Read **[docs/HANDOFF.md](docs/HANDOFF.md)** first — it's the binding contract for anyone (human or AI agent) modifying this codebase. It covers the One-Law, name-free rule, bilingual requirement, and the validators to run after any change.

## License

See [LICENSE](LICENSE).

---

*Internal strategy, research sources (BRAINS methodology transcripts, the «نظام الطيبات» case-study analysis, the Science Platform PRD, presentation scripts) live in a separate private vault repo — they shaped the product but don't belong in the public production tree.*
