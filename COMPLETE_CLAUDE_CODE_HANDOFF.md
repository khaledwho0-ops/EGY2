# 🧠 COMPLETE CLAUDE CODE HANDOFF — Egyptian Awareness Library
## Single Document — Everything — Nothing Skipped

> **Created:** 2026-06-20T01:11:00+03:00  
> **From:** Antigravity IDE (107 conversation sessions)  
> **For:** Claude Code continuation  
> **Author:** Khalid Sayed — khalidsayed459@gmail.com  
> **Project Root:** `c:\Users\pc\Desktop\EGY\New folder (20)\egyptian-awareness-library\`

---

# ═══════════════════════════════════════════════════════════
# PART 1: CLAUDE.md — AUTO-LOADED BY CLAUDE CODE (FREE)
# ═══════════════════════════════════════════════════════════

This is the content of the `CLAUDE.md` file at the project root. Claude Code reads it automatically at session start — zero token cost.

```markdown
# CLAUDE.md — Egyptian Awareness Library (EAL)

@AGENTS.md

## Project Identity
- **Framework:** Next.js 15.0.3 App Router, React 19, TypeScript, Tailwind CSS v4
- **Scale:** 102 route directories, 124 page.tsx files, 806 source files (8.89MB)
- **Deploy:** Vercel
- **Dev:** `npm run dev` (port 3000)
- **Key deps:** ai-sdk (Gemini/Groq/OpenAI), framer-motion, recharts, d3, three.js, zod, langchain

## Architecture (DO NOT REDISCOVER)
- **5 Engines:** DeepReal ✅, Medical Life ❌, Mental Health ✅, Religion Hub ✅, BLACKBOX ❌
- **God-System:** 7-Layer analysis pipeline in `src/app/god-system/`
- **Gemini Mega-Rotator:** 14 API keys across 6 AI providers (Gemini, Groq, OpenRouter, Cerebras, Together, SambaNova)
- **Evidence Aggregator:** 5 APIs (OpenAlex + Semantic Scholar + Crossref + EuropePMC + DOAJ)
- **Debunking Pipeline:** `src/lib/debunking/` → classifier.ts → api-swarm.ts → workers

## Key Patterns
- Pages are self-contained `"use client"` components with inline state
- Styling uses Tailwind + `globals.css` (135KB — read only specific line ranges)
- AI calls go through `src/lib/ai/` with automatic failover rotation
- Server actions in `src/app/actions/`
- API routes in `src/app/api/`

## Known Bugs
- `src/lib/debunking/workers/api-swarm.ts`: hardcoded credibilityScores + no AbortController
- `src/lib/debunking/classifier.ts`: missing try/catch, crashes without OPENAI_API_KEY

## File Size Warnings — CRITICAL
| File | Size | Rule |
|------|------|------|
| `globals.css` | 135KB | NEVER read whole file |
| `src/app/page.tsx` | 51KB | NEVER read whole file |
| `node_modules/` | 2.5GB | NEVER touch |
| `.next/` | varies | NEVER touch |
| `package-lock.json` | 496KB | NEVER read |

## Token Efficiency Rules
1. NEVER scan the full codebase. Work in zones
2. NEVER read globals.css or root page.tsx fully
3. Read HANDOFF_AND_STRATEGY.md for architecture context
4. One task per session. `/clear` between tasks
5. `/compact` at 60% context

## Commands
npm run dev        # Start dev server (port 3000)
npm run build      # Production build
npm run lint       # ESLint
```

---

# ═══════════════════════════════════════════════════════════
# PART 2: CODEBASE ANATOMY — HARD NUMBERS
# ═══════════════════════════════════════════════════════════

## Size Reality Check

| Metric | Value | Implication |
|--------|-------|-------------|
| **Total project files** | 62,390 | Mostly `node_modules` — **never scan** |
| **Total project size** | 2,595 MB | Do NOT do recursive reads |
| **Source code files** | 806 files | This is what matters |
| **Source code size** | 8.89 MB | Manageable if targeted |
| **Page routes** | 124 `page.tsx` files | 2.54 MB across 102+ directories |
| **Library modules** | 109 files in `src/lib/` | 0.63 MB across 41 subdirectories |
| **Components** | 28 subdirectories in `src/components/` | Varies per component |
| **globals.css** | 135 KB (single file) | ⚠️ MASSIVE — never read whole file |
| **Root page.tsx** | 51 KB | ⚠️ Largest single page |

## Critical Files

| File | Size | Why Important |
|------|------|---------------|
| `src/app/globals.css` | 135KB | Design system — ALL styles |
| `src/app/page.tsx` | 51KB | Landing page |
| `src/app/layout.tsx` | 7.8KB | Root layout, providers, nav |
| `src/lib/ai/providers.ts` | 12KB | AI provider rotation config |
| `src/lib/ai/llm-provider.ts` | 5.8KB | LLM provider logic |
| `src/lib/ai/guardrails.ts` | 5.7KB | AI safety guardrails |
| `src/lib/debunking/gemini-rotator.ts` | 11KB | Gemini key rotation |
| `src/lib/debunking/guidelines.ts` | 34KB | Debunking guidelines |
| `src/lib/debunking/fallacy-engine.ts` | 32KB | Fallacy detection engine |
| `src/lib/debunking/egy-data.ts` | 28KB | Egyptian-specific data |
| `src/lib/debunking/classifier.ts` | 533B | ⚠️ HAS KNOWN BUG |
| `src/middleware.ts` | 1.8KB | Route protection, i18n |

---

# ═══════════════════════════════════════════════════════════
# PART 3: COMPLETE FILE SYSTEM MAP
# ═══════════════════════════════════════════════════════════

## Project Root Files

```
c:\Users\pc\Desktop\EGY\New folder (20)\egyptian-awareness-library\
├── CLAUDE.md                    (2.8KB)  — Claude Code bootstrap
├── HANDOFF_AND_STRATEGY.md      (29KB)   — Master strategy document
├── BRAIN STORM.md               (12.6KB) — Philosophy & decisions
├── FINAL_EAL_AUDIT_REPORT.md    (9KB)    — Technical audit
├── EAL_FULL_DEFENSE_SCRIPT.md   (23KB)   — Arabic defense script
├── EAL_PRESENTATION_SCRIPTS.md  (9.7KB)  — English 3-person script
├── PRESENTER_CHEATSHEET.md      (3.9KB)  — Arabic presenter cheatsheet
├── PROJECT.md                   (2KB)    — Project milestones
├── README.md                    (5.2KB)  — GitHub readme
├── TEST_INFRA.md                (2.1KB)  — Test infrastructure
├── TEST_READY.md                (1.2KB)  — Test coverage status
├── AGENTS.md                    (327B)   — Next.js agent rules
├── ANTIGRAVITY_CONTEXT_EXPORT.md (NEW)   — Conversation context
├── CLAUDE_CODE_STRATEGY.md      (NEW)    — Strategy guide
├── .env.local                   (6.1KB)  — Active API keys (14 keys)
├── .env.example                 (2.7KB)  — API keys template
├── package.json                 (2.9KB)  — Dependencies
├── next.config.ts               (239B)   — Next.js config
├── tsconfig.json                (757B)   — TypeScript config
├── eslint.config.mjs            (1.1KB)  — ESLint config
├── vitest.config.mts            (484B)   — Vitest config
├── docker-compose.yml           (814B)   — Docker setup
├── firebase.json                (194B)   — Firebase config
├── vercel.json                  (197B)   — Vercel config
├── postcss.config.mjs           (94B)    — PostCSS config
```

## Source Architecture

```
src/
├── app/                          # 102 route dirs + 7 core files
│   ├── page.tsx                  # 51KB — Landing page (HUGE)
│   ├── layout.tsx                # 7.8KB — Root layout
│   ├── globals.css               # 135KB — ALL styles (MASSIVE)
│   ├── error.tsx                 # 1.8KB
│   ├── loading.tsx               # 0.8KB
│   ├── not-found.tsx             # 1.9KB
│   ├── favicon.ico               # 26KB
│   │
│   ├── (kernel)/                 # Route groups
│   ├── (marketing)/
│   ├── [lang]/                   # i18n dynamic route
│   │
│   │── ── ALL 102 PAGE ROUTES (listed in Part 4) ──
│   │
│   ├── about/
│   ├── actions/                  # Server actions
│   └── api/                      # 28 API route directories
│
├── components/                   # 28 subdirectories
│   ├── admin/
│   ├── assessment/
│   ├── baseline/
│   ├── calm/
│   ├── chatbot/
│   ├── debate/
│   ├── defense/
│   ├── defense-pages/
│   ├── dev/
│   ├── engagement/
│   ├── exercises/
│   ├── features/
│   ├── hunter/
│   ├── interactive/
│   ├── interventions/
│   ├── mh/                       # Mental health
│   ├── misinfo-atlas/
│   ├── onboarding/
│   ├── psychometrics/
│   ├── pyramid/
│   ├── religion/
│   ├── research/
│   ├── safety/
│   ├── science/
│   ├── shared/                   # Shared/reusable
│   ├── six-layers/
│   ├── sources/
│   └── ui/                       # Base UI primitives
│
├── lib/                          # 41 subdirectories + 3 files
│   ├── agents/                   # AI agent logic
│   ├── ai/                       # AI provider configs (11 files)
│   │   ├── providers.ts          # 12KB — All AI provider configs
│   │   ├── llm-provider.ts       # 5.8KB — LLM routing
│   │   ├── eal-knowledge.ts      # 10KB — EAL knowledge base
│   │   ├── guardrails.ts         # 5.7KB — AI safety
│   │   ├── forensic-analysis.ts  # 6.7KB
│   │   ├── forensic-service.ts   # 5.9KB
│   │   ├── nvidia-first.ts       # 3.7KB
│   │   ├── emotional-trigger-highlighter.tsx  # 3.7KB
│   │   ├── rag.ts                # 1.7KB
│   │   ├── router.ts             # 1KB
│   │   └── index.ts              # 126B
│   ├── analytics/
│   ├── api/
│   ├── audit/
│   ├── auth/
│   ├── auth.ts                   # 4.4KB
│   ├── certification/
│   ├── cognition/
│   ├── cognitive/
│   ├── content.ts                # 0.6KB
│   ├── db/
│   ├── debunking/                # ⚠️ HAS KNOWN BUGS
│   │   ├── classifier.ts         # 533B — ⚠️ BUG: missing try/catch
│   │   ├── gemini-rotator.ts     # 11KB — Gemini key rotation
│   │   ├── fallacy-engine.ts     # 32KB — Fallacy detection
│   │   ├── guidelines.ts         # 34KB — Debunking guidelines
│   │   ├── egy-data.ts           # 28KB — Egyptian data
│   │   ├── fallacies-data.ts     # 11KB
│   │   ├── god-system.ts         # 2.6KB
│   │   ├── preflight.ts          # 2.4KB
│   │   └── workers/              # ⚠️ api-swarm.ts has bugs
│   ├── deployment/
│   ├── export/
│   ├── gamification/
│   ├── i18n/                     # Internationalization
│   ├── kv/
│   ├── nlp/                      # NLP processing
│   ├── orchestration/
│   ├── osint/
│   ├── pedagogy/
│   ├── progress/
│   ├── progression/
│   ├── prompts/
│   ├── provenance/
│   ├── registry/
│   ├── religion/
│   ├── research/
│   ├── routing/
│   ├── safety/
│   ├── schemas/
│   ├── science/
│   ├── scoring/
│   ├── scroll/
│   ├── sources/
│   ├── telemetry/
│   ├── tracking/
│   ├── utils.ts                  # 1.4KB
│   ├── validation/
│   ├── verification/
│   ├── versioning/
│   ├── workflow/
│   └── xapi/
│
├── content/                      # Static content / data
├── data/                         # Data files
├── features/                     # Feature modules
├── types/                        # TypeScript types
└── middleware.ts                  # 1.8KB — Route middleware
```

---

# ═══════════════════════════════════════════════════════════
# PART 4: ALL 102 PAGE ROUTES
# ═══════════════════════════════════════════════════════════

Every directory under `src/app/` that has a `page.tsx`:

| Route | Directory | Category |
|-------|-----------|----------|
| `/` | `page.tsx` (51KB) | Core |
| `/about` | `about/` | Core |
| `/welcome` | `welcome/` | Core |
| `/onboarding` | `onboarding/` | Core |
| `/dashboard` | `dashboard/` | Core |
| `/explore` | `explore/` | Core |
| `/guide` | `guide/` | Core |
| `/language-select` | `language-select/` | Core |
| `/features` | `features/` | Core |
| `/deepreal` | `deepreal/` | Engine: DeepReal ✅ |
| `/deepreal-forensics` | `deepreal-forensics/` | Engine: DeepReal ✅ |
| `/deepreal-upload` | `deepreal-upload/` | Engine: DeepReal ✅ |
| `/forensic-c2pa` | `forensic-c2pa/` | Engine: DeepReal ✅ |
| `/forensic-image` | `forensic-image/` | Engine: DeepReal ✅ |
| `/reverse` | `reverse/` | Engine: DeepReal ✅ |
| `/medical-life` | `medical-life/` | Engine: Medical ❌ |
| `/health-data` | `health-data/` | Engine: Medical ❌ |
| `/drug-checker` | `drug-checker/` | Engine: Medical ❌ |
| `/mental-health` | `mental-health/` | Engine: Mental Health ✅ |
| `/religion-hub` | `religion-hub/` | Engine: Religion ✅ |
| `/blackbox` | `blackbox/` | Engine: BLACKBOX ❌ |
| `/angry-debunkers` | `angry-debunkers/` | Debunking |
| `/ai-agents` | `ai-agents/` | AI |
| `/ai-editor` | `ai-editor/` | AI |
| `/chatbot` | `chatbot/` | AI |
| `/prompt-lab` | `prompt-lab/` | AI |
| `/swarm-debate` | `swarm-debate/` | AI |
| `/arabic-shield` | `arabic-shield/` | Defense |
| `/womens-shield` | `womens-shield/` | Defense |
| `/mens-shield` | `mens-shield/` | Defense |
| `/family-kit` | `family-kit/` | Defense |
| `/fight-back` | `fight-back/` | Defense |
| `/defense-main-plan` | `defense-main-plan/` | Defense |
| `/defense-pages-map` | `defense-pages-map/` | Defense |
| `/defense-qa` | `defense-qa/` | Defense |
| `/defense-test` | `defense-test/` | Defense |
| `/assessment` | `assessment/` (32KB) | Assessment |
| `/baseline` | `baseline/` (18KB) | Assessment |
| `/self-test-protocol` | `self-test-protocol/` | Assessment |
| `/reaction-test` | `reaction-test/` | Assessment |
| `/bias-detector` | `bias-detector/` | Cognition |
| `/bias-fingerprint` | `bias-fingerprint/` | Cognition |
| `/cognitive-lab` | `cognitive-lab/` | Cognition |
| `/critical-thinking` | `critical-thinking/` | Cognition |
| `/fallacy-engine` | `fallacy-engine/` | Cognition |
| `/epistemology` | `epistemology/` | Cognition |
| `/philosophy` | `philosophy/` | Cognition |
| `/debate-sim` | `debate-sim/` | Cognition |
| `/peer-challenge` | `peer-challenge/` | Cognition |
| `/bad-news` | `bad-news/` | Inoculation |
| `/inoculation-passport` | `inoculation-passport/` | Inoculation |
| `/manipulation-cards` | `manipulation-cards/` | Inoculation |
| `/six-layers` | `six-layers/` | Inoculation |
| `/layers` | `layers/` | Inoculation |
| `/live-deception` | `live-deception/` | Investigation |
| `/osint-investigator` | `osint-investigator/` (23KB) | Investigation |
| `/others-search` | `others-search/` (19KB) | Investigation |
| `/whatsapp-analyzer` | `whatsapp-analyzer/` | Investigation |
| `/paper-auditor` | `paper-auditor/` | Investigation |
| `/trend-hunter` | `trend-hunter/` | Monitoring |
| `/rumor-heatmap` | `rumor-heatmap/` | Monitoring |
| `/threat-map` | `threat-map/` | Monitoring |
| `/threat-briefing` | `threat-briefing/` | Monitoring |
| `/misinfo-atlas` | `misinfo-atlas/` | Monitoring |
| `/comb-tracker` | `comb-tracker/` | Monitoring |
| `/kill-list` | `kill-list/` | Monitoring |
| `/evidence` | `evidence/` | Science |
| `/sources` | `sources/` | Science |
| `/science` | `science/` | Science |
| `/ux-science` | `ux-science/` | Science |
| `/stat-power` | `stat-power/` | Science |
| `/knowledge-graph` | `knowledge-graph/` | Science |
| `/god-system` | `god-system/` | Science |
| `/supervisor` | `supervisor/` | Admin |
| `/report` | `report/` | Admin |
| `/effect-dashboard` | `effect-dashboard/` | Admin |
| `/nvidia-hub` | `nvidia-hub/` | Platform |
| `/open-source` | `open-source/` | Platform |
| `/connect` | `connect/` | Platform |
| `/global-alliance` | `global-alliance/` | Platform |
| `/tools-download` | `tools-download/` | Platform |
| `/media-library` | `media-library/` | Platform |
| `/sovo` | `sovo/` | Platform |
| `/impact` | `impact/` | Marketing |
| `/why-us` | `why-us/` | Marketing |
| `/project-vision` | `project-vision/` | Marketing |
| `/transformation` | `transformation/` | Marketing |
| `/trailer` | `trailer/` | Marketing |
| `/presentation` | `presentation/` | Marketing |
| `/pricing-presentation` | `pricing-presentation/` | Marketing |
| `/publishing-plan` | `publishing-plan/` | Marketing |
| `/master-roadmap` | `master-roadmap/` | Marketing |
| `/engines-guide` | `engines-guide/` | Marketing |
| `/platform-guide` | `platform-guide/` | Marketing |
| `/certificate` | `certificate/` | Gamification |
| `/curriculum` | `curriculum/` | Learning |
| `/competition-demo` | `competition-demo/` | Demo |
| `/demo` | `demo/` | Demo |

---

# ═══════════════════════════════════════════════════════════
# PART 5: ALL 28 API ROUTES
# ═══════════════════════════════════════════════════════════

Every directory under `src/app/api/`:

| API Route | Purpose |
|-----------|---------|
| `api/agents/` | AI agent endpoints |
| `api/ai/` | AI model endpoints |
| `api/assessment/` | Psychometric assessment |
| `api/bias-detect/` | Bias detection |
| `api/blackbox/` | BLACKBOX scenarios |
| `api/certificate/` | Certificate generation |
| `api/chat/` | AI chatbot |
| `api/crisis/` | Crisis detection |
| `api/debate-sim/` | Debate simulation |
| `api/defense/` | Defense analysis |
| `api/exercise/` | Exercise engine |
| `api/fallacy-detect/` | Fallacy detection |
| `api/forensic/` | Image/video/audio forensics |
| `api/god-system/` | 7-layer analysis |
| `api/hunter/` | Trend hunting |
| `api/islamic/` | Quran/Hadith/semantic |
| `api/kill-list/` | Kill list management |
| `api/live-deception/` | Live deception detection |
| `api/medical/` | Medical information |
| `api/mist/` | MIST-20 assessment |
| `api/nlp/` | Arabic NLP |
| `api/nvidia/` | NVIDIA AI models |
| `api/paper-auditor/` | Academic paper audit |
| `api/science/` | Science evidence |
| `api/search/` | Evidence aggregation (5 APIs) |
| `api/sovo/` | SOVO system |
| `api/srs/` | Spaced repetition |
| `api/whatsapp-analyzer/` | WhatsApp message analysis |

---

# ═══════════════════════════════════════════════════════════
# PART 6: KNOWN BUGS — MUST FIX FIRST
# ═══════════════════════════════════════════════════════════

## Bug 1: `api-swarm.ts` — Hardcoded Scores

**File:** `src/lib/debunking/workers/api-swarm.ts`

**Problem:**
- `fetchOpenAlex`, `fetchEuropePMC`, `fetchQuran`, `fetchGoogleFactCheck` return **hardcoded** `credibilityScore` and `abstract` instead of extracting from API responses
- `withTimeout` doesn't use `AbortController` → socket leaks on timeout

**Fix:** Proposed code exists in `HANDOFF_AND_STRATEGY.md` Section 2

## Bug 2: `classifier.ts` — Missing try/catch

**File:** `src/lib/debunking/classifier.ts` (only 533 bytes)

**Problem:**
- `classifyEgyptianContext` crashes if `OPENAI_API_KEY` is missing (no try/catch)

**Fix:** Wrap in try/catch, fallback to `"State Stability & Economic Rumors"`

---

# ═══════════════════════════════════════════════════════════
# PART 7: ENVIRONMENT VARIABLES MAP
# ═══════════════════════════════════════════════════════════

From `.env.example` (78 lines):

```
# Fact-Check APIs
GOOGLE_FACTCHECK_API_KEY=
CLAIMBUSTER_API_KEY=

# Veracity RAG Pipeline
VERACITY_BACKEND_URL=
VERACITY_BACKEND_TOKEN=

# Islamic Text APIs
HADITH_API_KEY=
SUNNAH_API_KEY=
SUNNAH_HADITH_SEARCH_URL=
KALIMAT_API_URL=
KALIMAT_API_KEY=

# AI Chat Providers (cascading fallback: Gemini → Groq → GitHub → HuggingFace)
GEMINI_API_KEY=        # PRIMARY
GROQ_API_KEY=
GITHUB_TOKEN=
HF_TOKEN=

# Reverse Image Search
SERPAPI_API_KEY=

# Forensics Python Backend
FORENSIC_BACKEND_URL=http://localhost:8000
FORENSIC_BACKEND_TOKEN=

# Arabic NLP Backend
ARABIC_NLP_BACKEND_URL=http://localhost:8000/arabic
ARABIC_NLP_BACKEND_TOKEN=

# Admin
NEXT_PUBLIC_ADMIN_CODE=
JWT_SECRET=
ADMIN_REGISTRATION_CODE=

# NVIDIA NIM (5 keys for rotation)
NVIDIA_API_KEY=
NVIDIA_API_KEY_2=
NVIDIA_API_KEY_3=
NVIDIA_API_KEY_4=
NVIDIA_API_KEY_5=
```

---

# ═══════════════════════════════════════════════════════════
# PART 8: PACKAGE.JSON — ALL DEPENDENCIES
# ═══════════════════════════════════════════════════════════

```json
{
  "name": "egyptian-awareness-library",
  "version": "0.1.0",
  "scripts": {
    "dev": "node --disable-warning=ExperimentalWarning ./node_modules/next/dist/bin/next dev",
    "build": "node --disable-warning=ExperimentalWarning ./node_modules/next/dist/bin/next build",
    "start": "node --disable-warning=ExperimentalWarning ./node_modules/next/dist/bin/next start",
    "lint": "eslint"
  },
  "dependencies": {
    "@ai-sdk/google": "^3.0.79",
    "@ai-sdk/groq": "^3.0.39",
    "@ai-sdk/openai": "^3.0.65",
    "@ai-sdk/openai-compatible": "^2.0.48",
    "@ai-sdk/react": "^3.0.193",
    "@google/generative-ai": "^0.24.1",
    "@langchain/core": "^1.1.48",
    "@langchain/langgraph": "^1.3.2",
    "@nivo/radar": "^0.99.0",
    "@pinecone-database/pinecone": "^7.2.0",
    "@react-three/drei": "^10.7.7",
    "@react-three/fiber": "^9.6.1",
    "@react-three/postprocessing": "^3.0.4",
    "@tailwindcss/typography": "^0.5.19",
    "@upstash/ratelimit": "^2.0.8",
    "@vercel/kv": "^3.0.0",
    "ai": "^6.0.191",
    "bcryptjs": "^3.0.3",
    "canvas-confetti": "^1.9.4",
    "cheerio": "^1.2.0",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "d3": "^7.9.0",
    "dompurify": "^3.4.5",
    "duck-duck-scrape": "^2.2.7",
    "exifr": "^7.1.3",
    "framer-motion": "^12.40.0",
    "gray-matter": "^4.0.3",
    "gsap": "^3.15.0",
    "i18next": "^26.0.5",
    "isomorphic-dompurify": "^3.16.0",
    "jose": "^6.2.3",
    "lenis": "^1.3.23",
    "lucide-react": "^1.16.0",
    "natural": "^8.1.1",
    "next": "15.0.3",
    "next-themes": "^0.4.6",
    "openai": "^6.39.0",
    "react": "19.2.4",
    "react-dom": "19.2.4",
    "react-i18next": "^17.0.3",
    "react-joyride": "^3.0.2",
    "react-markdown": "^10.1.0",
    "recharts": "^3.8.1",
    "tailwind-merge": "^3.5.0",
    "text-readability": "^1.1.1",
    "three": "^0.184.0",
    "tsx": "^4.22.4",
    "vader-sentiment": "^1.1.3",
    "wink-eng-lite-web-model": "^1.8.1",
    "wink-nlp": "^2.4.0",
    "zod": "^4.4.3"
  },
  "devDependencies": {
    "@playwright/test": "^1.59.1",
    "@tailwindcss/postcss": "^4",
    "@testing-library/jest-dom": "^6.9.1",
    "@testing-library/react": "^16.3.2",
    "eslint": "^9",
    "eslint-config-next": "16.2.4",
    "jsdom": "^29.0.2",
    "tailwindcss": "^4",
    "typescript": "^5",
    "vitest": "^4.1.4"
  }
}
```

---

# ═══════════════════════════════════════════════════════════
# PART 9: NEXT.JS & ESLINT CONFIGURATION
# ═══════════════════════════════════════════════════════════

## next.config.ts
```typescript
const nextConfig = {
  reactStrictMode: true,
  serverExternalPackages: ["natural"],
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
};
export default nextConfig;
```

## eslint.config.mjs — Disabled Rules
```
@typescript-eslint/no-explicit-any: OFF
@next/next/no-img-element: OFF
@typescript-eslint/no-unused-vars: OFF
@typescript-eslint/no-require-imports: OFF
prefer-const: OFF
react-hooks/rules-of-hooks: OFF
react-hooks/exhaustive-deps: OFF
```

---

# ═══════════════════════════════════════════════════════════
# PART 10: ANTIGRAVITY CONVERSATION CONTEXT
# ═══════════════════════════════════════════════════════════

## Session Inventory (107 Total, 4 Significant)

| Session | ID | Size | Duration | Summary |
|---------|-----|------|----------|---------|
| **Main Build** | `56ec5322-d068-4e95-a62c-bfe55d4f2878` | 701KB | ~12 hours | Built forensic-c2pa, cognitive-lab, nvidia-hub, angry-debunkers, ai-agents, debate-sim. Revamped Scientific & Religious Toolkits. |
| **First Handoff** | `6c6c1d58-4359-4b7a-a050-ea3fc8a6a140` | 69KB | ~1 hour | Created HANDOFF_AND_STRATEGY.md, CLAUDE.md, strategy docs |
| **Current Session** | `1cd153f9-cba8-40dd-aa5f-cae5575caf15` | 41KB | active | This comprehensive handoff document |
| **Earlier Session** | `bfae47b8-eb02-4805-a8be-fbaeb472a6f1` | 22KB | unknown | Earlier feature work |
| **Other Sessions** | `081ffc9a...`, `13eafd60...` | 14-19KB each | unknown | Smaller sessions |

## Transcript File Locations
```
C:\Users\pc\.gemini\antigravity-ide\brain\56ec5322-d068-4e95-a62c-bfe55d4f2878\.system_generated\logs\transcript.jsonl
C:\Users\pc\.gemini\antigravity-ide\brain\6c6c1d58-4359-4b7a-a050-ea3fc8a6a140\.system_generated\logs\transcript.jsonl
C:\Users\pc\.gemini\antigravity-ide\brain\1cd153f9-cba8-40dd-aa5f-cae5575caf15\.system_generated\logs\transcript.jsonl
C:\Users\pc\.gemini\antigravity-ide\brain\bfae47b8-eb02-4805-a8be-fbaeb472a6f1\.system_generated\logs\transcript.jsonl
```

## What Was Built in Main Build Session (12 hours)
- `src/app/forensic-c2pa/page.tsx` — C2PA content provenance forensics
- `src/app/cognitive-lab/page.tsx` — Cognitive bias laboratory
- `src/app/nvidia-hub/page.tsx` — NVIDIA AI hub page
- `src/app/angry-debunkers/page.tsx` — Debunker community page
- `src/app/ai-agents/page.tsx` — AI agents showcase
- `src/app/debate-sim/page.tsx` — Debate simulator

## User Request History (Main Build Session — Exact Words)

The user's core task was: **"Revamping Scientific And Religious Toolkits"**

### Requirements Given (exact user words):
1. "ALL MUST BE REAL FUNCTIONAL NOT JUST UI" — No mock data
2. "add IT TO EVERY CHATBOT WITH UNIQUE SYSTEM MULTI LAYERED PROMPT" — AI chatbot on every page
3. "MUST THE UI UX BE VERY GOOD AND ALL ACCESSED BY THE USER EASILY NO PAGES HIDDEN"
4. "ADD QUICK EXPLAINATION WITH REAL SCENARIOS HOW TO USE EACH PAGE AND ITS CHATBOT"
5. "I want to change all the pages names it sounds generic and non scientific"
6. "add all new pages to the explore all pages"
7. "ALL MUST BE REAL NO MOCK DATA ALLOWED"

### Pages Explicitly Called "VERY BAD":
- `/trend-hunter` — "THE UI AND THE UX AND THE LOGIC IS VERY BAD"
- `/live-deception` — "THE UI AND THE UX AND THE LOGIC IS VERY BAD"
- `/misinfo-atlas` — "THE UI AND THE UX AND THE LOGIC IS VERY BAD"

### Full List of Pages That Need Work (from user's explicit list):
1. Hadith Authenticity Checker (`religion-hub/tools`)
2. Women's Psychographic Shield (`womens-shield`)
3. Men's Mental & Crisis Shield (`mens-shield`)
4. Forensic C2PA (`forensic-c2pa`)
5. Forensic Image (`forensic-image`)
6. Trend Hunter (`trend-hunter`) — VERY BAD
7. Live Deception (`live-deception`) — VERY BAD
8. Epidemiological Rumor Heatmap (`rumor-heatmap`)
9. Patient Zero Threat Map (`threat-map`)
10. Misinfo Atlas (`misinfo-atlas`) — VERY BAD
11. Daily Threat Briefing (`threat-briefing`)
12. Dashboard (`dashboard`)
13. Awareness Certificate (`certificate`)
14. Reaction Speed Test (`reaction-test`)
15. Socratic Debate Simulator (`debate-sim`)
16. Cognitive Bias Fingerprint (`bias-fingerprint`)
17. Critical Thinking Ladder (`critical-thinking`)
18. Fallacy Engine (`fallacy-engine`)
19. Phase 0: Psychological Calibration (`assessment`)

### Pages Open When Session Stopped (may be incomplete):
- `src/app/others-search/page.tsx` (19KB)
- `src/app/baseline/page.tsx` (18KB)
- `src/app/osint-investigator/page.tsx` (23KB)
- `src/app/assessment/page.tsx` (32KB)
- `src/app/blackbox/page.tsx` (33KB)

---

# ═══════════════════════════════════════════════════════════
# PART 11: PROJECT STATUS — WHAT'S REAL vs WHAT'S NOT
# ═══════════════════════════════════════════════════════════

## What's Working (from BRAIN STORM.md)
- Live fact-checking surfaces
- Claim-worthiness scoring path
- Multi-source evidence search
- Quran verification
- Hadith search
- Semantic religious query flow
- Forensic metadata extraction
- C2PA provenance verification
- Arabic NLP microservice path
- Custom sentiment and crisis-screening logic
- Gamification engine and progress HUD
- Anonymized research export
- Supervisor analytics and hypothesis math
- Docker-compose local stack
- CI lint/build
- PWA/offline shell
- Security headers and basic rate limiting

## What's Still Incomplete
- Exact open-source merges from `LOST.md`
- Many package-level integrations
- Testing stack (45 tests defined, not all passing)
- Accessibility toolchain
- Collaboration layer
- CMS/content editing stack
- Privacy-first analytics platform
- Deployment automation
- Final defense automation/doc generation
- 2/5 engines missing (Medical Life ❌, BLACKBOX ❌)
- Pages flagged as "VERY BAD" (trend-hunter, live-deception, misinfo-atlas)
- AI chatbot integration on all pages
- Scientific page naming

## Engine Status

| Engine | Status | Location |
|--------|--------|----------|
| DeepReal | ✅ Operational | `src/app/deepreal/` |
| Medical Life | ❌ Missing | `src/app/medical-life/` (stub) |
| Mental Health | ✅ Operational | `src/app/mental-health/` |
| Religion Hub | ✅ Operational | `src/app/religion-hub/` |
| BLACKBOX | ❌ Missing | `src/app/blackbox/` (stub) |

---

# ═══════════════════════════════════════════════════════════
# PART 12: SMART TOKEN EFFICIENCY PLAN
# ═══════════════════════════════════════════════════════════

## Strategy 1: Zone-Based Work (CRITICAL)

| Zone | Files to Load | When |
|------|--------------|------|
| **Zone A: Single Page** | 1 `page.tsx` + its component imports | Building/fixing one page |
| **Zone B: Feature Vertical** | 1 page + 1 lib module + 1 component dir | Connected feature |
| **Zone C: System Layer** | `src/lib/<module>/` files only | Backend logic, APIs |
| **Zone D: Design System** | `globals.css` lines X-Y + `layout.tsx` | Styling/theme work |
| **Zone E: Cross-Cutting** | `middleware.ts` + `layout.tsx` + configs | Auth, i18n, routing |

> **RULE:** NEVER load Zone A + Zone D + Zone C simultaneously. Each zone = separate session or `/clear` boundary.

## Strategy 2: CLAUDE.md Bootstrap (FREE)

`CLAUDE.md` auto-loads at session start. Zero token cost. Contains architecture, bugs, rules.

## Strategy 3: Prompt Templates

### For Single Page Work:
```
I need to [fix/build/modify] the [page-name] page.
File: src/app/[page-name]/page.tsx
It [does X / should do Y / has bug Z].
Only read this file and its direct imports. Do NOT scan the full codebase.
```

### For Feature Implementation:
```
I need to implement [feature].
Relevant files ONLY:
- src/app/[route]/page.tsx (the UI)
- src/lib/[module]/ (the logic)
- src/components/[area]/ (shared components)
Read HANDOFF_AND_STRATEGY.md section [X] for architecture context.
Do NOT read globals.css, layout.tsx, or other pages.
```

### For Bug Fixes:
```
Bug in src/lib/[module]/[file].ts
Symptom: [what's wrong]
Read ONLY this file and its direct imports.
Fix proposed in HANDOFF_AND_STRATEGY.md — implement it.
```

## Strategy 4: File Size Rules

| File Size | Action |
|-----------|--------|
| < 5KB | Safe to read whole file |
| 5-20KB | Read whole first time, then target lines |
| 20-50KB | Read in 200-line chunks |
| 50KB+ | ⚠️ NEVER read whole. Always specify line ranges |

## Strategy 5: Session Lifecycle

```
1. CLAUDE.md loads automatically (free)
2. State your ZONE (A/B/C/D/E)
3. Read ONLY zone-relevant files
4. Do work
5. /compact when context hits ~60%
6. /clear when switching zones
7. Commit after each zone is done
```

---

# ═══════════════════════════════════════════════════════════
# PART 13: MODEL SELECTION GUIDE (OPUS / SONNET / HAIKU)
# ═══════════════════════════════════════════════════════════

## Decision Flowchart

```
Is the task a simple edit, rename, comment, or format change?
├── YES → 🟢 HAIKU (fastest, cheapest)
└── NO ↓

Is it standard feature work, bug fix, or single-file refactor?
├── YES → 🔵 SONNET (daily driver, 80-90% of work)
└── NO ↓

Is it multi-file architecture, complex debugging, or planning?
├── YES → 🟣 OPUS (premium reasoning)
└── NO → 🔵 SONNET (safe default)
```

## 🟢 HAIKU — The Sprinter

**Cost:** Cheapest | **Speed:** Fastest | **Context:** Smallest

| ✅ Use For | ❌ Never For |
|-----------|------------|
| Adding comments/docstrings | Multi-file changes |
| Simple renames/formatting | Complex logic |
| Adding RTL className to a div | Architecture decisions |
| Generating repetitive boilerplate | Debugging subtle bugs |
| Quick one-liner fixes | Reading large files |
| Writing commit messages | Deep reasoning tasks |
| File searches/grep | API integration work |

**EAL Examples:**
- "Add Arabic RTL className to this div"
- "Rename `fetchOpenAlex` to `fetchOpenAlexData`"
- "Add a loading state to this button"
- "Generate JSDoc for this function"
- "Fix this TypeScript type error on line 45"

## 🔵 SONNET — The Workhorse (DEFAULT 80-90%)

**Cost:** Balanced | **Speed:** Fast | **Context:** Large

| ✅ Use For | ❌ Don't Use For |
|-----------|----------------|
| Building new page routes | Designing 6-agent pipeline |
| Implementing single features | Complex multi-system refactoring |
| Standard bug fixes | Tasks that failed twice already |
| Code review | Architectural decisions with trade-offs |
| Single-file refactoring | Writing master implementation plans |
| Component creation | Security/safety reviews |
| API integration | |

**EAL Examples:**
- "Build the drug-checker page with openFDA integration"
- "Fix the api-swarm.ts hardcoded scores using HANDOFF_AND_STRATEGY.md"
- "Add WhatsApp analyzer text parsing logic"
- "Create the evidence aggregation UI component"
- "Implement the mastery model state machine"

## 🟣 OPUS — The Architect

**Cost:** Most expensive | **Speed:** Slower | **Context:** Largest + Deepest reasoning

| ✅ Use For | ❌ Never For |
|-----------|------------|
| Multi-file architectural refactoring | Simple edits |
| Complex debugging (failed with Sonnet) | Routine feature work |
| Designing engine pipelines | Boilerplate generation |
| Planning cross-system integrations | File reading/searching |
| Security/safety implications review | Styling/CSS changes |
| Complex state machines spanning files | One-off renames |

**EAL Examples:**
- "Design and implement the 6-Agent Logic Pipeline across src/lib/agents/"
- "Refactor Gemini Mega-Rotator into unified provider system"
- "Architect the Knowledge Graph with SHA-256 verification"
- "Debug why hive-mind swarm produces inconsistent scores across 5 APIs"
- "Implement Negative Prompt Layers (NEG-01 through NEG-07)"

## The Escalation Pattern

```
START → Sonnet
  ├── Success? → Done ✅
  └── Failure?
      ├── Simple mistake? → Retry Sonnet
      └── Genuinely complex? → Escalate to Opus
          └── After Opus solves architecture → Drop back to Sonnet for implementation
```

**The Opus-then-Sonnet pattern:**
1. Use Opus to *plan and design* the architecture
2. Switch to Sonnet to *implement* the plan
3. Switch back to Opus only if implementation hits unexpected complexity

---

# ═══════════════════════════════════════════════════════════
# PART 14: CLAUDE CODE COMMANDS CHEATSHEET
# ═══════════════════════════════════════════════════════════

| Command | What It Does | When |
|---------|-------------|------|
| `/clear` | Wipes conversation history | Switching zones/tasks |
| `/compact` | Compresses history into summary | Context at ~60% |
| `/compact keep the API integration and error patterns` | Targeted compression | Preserve critical context |
| `/context` | Shows token usage breakdown | Before complex operations |
| `/cost` | Shows session cost | Monitor spending |
| `/model sonnet` | Switch to Sonnet | Default work |
| `/model opus` | Switch to Opus | Architecture/debugging |
| `/model haiku` | Switch to Haiku | Simple edits |

### Critical Rules
- **The 60% Rule:** Run `/compact` proactively at 60% context usage. Performance degrades sharply after 80%.
- **The Context Cliff:** If Claude starts forgetting, repeating, or making inconsistent changes — `/clear`, save state to a file, restart.
- **The `/clear` Discipline:** Commit changes after each task, then `/clear` before the next. Clean context = better reasoning.

---

# ═══════════════════════════════════════════════════════════
# PART 15: TASK PRIORITIZATION
# ═══════════════════════════════════════════════════════════

| Priority | Task | Model | Zone | Sessions |
|----------|------|-------|------|----------|
| **P0** | Apply HANDOFF_AND_STRATEGY.md fixes (api-swarm + classifier) | 🔵 Sonnet | C | 1 |
| **P1** | Fix "VERY BAD" pages (trend-hunter, live-deception, misinfo-atlas) | 🔵 Sonnet | A | 1 each |
| **P1** | Build Evidence Aggregation UI (5-API aggregator has ZERO UI) | 🔵 Sonnet | B | 2-3 |
| **P1** | Upgrade Islamic APIs (AlQuran→Quran.com v4) | 🔵 Sonnet | C | 2 |
| **P1** | Connect free APIs (arXiv, openFDA, DailyMed, RxNorm, WHO) | 🔵 Sonnet | C | 3-4 |
| **P2** | Build Medical Life Engine | 🟣 Opus→🔵 Sonnet | B | 4-5 |
| **P2** | Build BLACKBOX Scenarios Engine | 🟣 Opus→🔵 Sonnet | B | 3-4 |
| **P2** | Implement Mastery Learning model | 🔵 Sonnet | B | 2-3 |
| **P2** | Add AI chatbot to all pages with unique system prompts | 🔵 Sonnet | A | 1-2 per page |
| **P3** | Design 6-Agent Judgment Pipeline | 🟣 Opus | C | 5+ |
| **P3** | Build Kill-Switch V(r,K) middleware | 🟣 Opus | C | 3-4 |
| **P3** | Implement Negative Prompt Layers | 🟣 Opus→🔵 Sonnet | C | 2-3 |
| **P4** | Omar's 15 features (Trend Hunter, KILL LIST, etc.) | 🔵 Sonnet | A | 1 each |
| **P4** | PWA/Offline Emergency Cache | 🔵 Sonnet | E | 2-3 |
| **P5** | Women's Shield + Men's Crisis Shield | 🔵 Sonnet | A | 1-2 each |
| **P5** | Rename all pages to scientific/philosophical names | 🟢 Haiku | A | 1 |

---

# ═══════════════════════════════════════════════════════════
# PART 16: ANTI-PATTERNS — TOKEN DESTROYERS
# ═══════════════════════════════════════════════════════════

| ❌ Anti-Pattern | 💰 Cost | ✅ Do Instead |
|----------------|---------|-------------|
| "Explain the whole codebase" | 50K+ tokens | "Read CLAUDE.md and src/app/[page]/page.tsx" |
| Reading globals.css fully | ~30K tokens | "Read globals.css lines 1-50 for color vars" |
| "Find all files that..." (recursive) | 10K+ | Use grep with specific patterns |
| Chatty back-and-forth | Compounds per turn | Give clear, complete instructions upfront |
| Keeping old context when switching tasks | Context rot | `/clear` between tasks |
| Reading page.tsx (51KB) fully | ~12K tokens | "Read page.tsx lines 1-100 for hero" |
| "Thank you" / pleasantries | Wasted tokens | Skip to next instruction |
| Re-explaining project each session | 2K+ per session | Use CLAUDE.md (loads free) |
| Running build to "check everything" | 30sec+ wasted | Build only when verifying specific changes |
| Reading package-lock.json | ~120K tokens | NEVER read this file |

---

# ═══════════════════════════════════════════════════════════
# PART 17: BOOTSTRAP PROMPT — COPY-PASTE TO START
# ═══════════════════════════════════════════════════════════

```
I'm working on the Egyptian Awareness Library (EAL) — a Next.js 15 platform
with 102 route directories and 806 source files.

Read CLAUDE.md in the project root for architecture rules.

Key docs:
- HANDOFF_AND_STRATEGY.md (master strategy, known bugs, proposed fixes)
- implementation_plan.md at c:\Users\pc\Desktop\EGY\ (666-line architecture)

Today I'm working on: [ZONE X — describe task]
Only read files relevant to this zone. Do NOT scan the full codebase.

Current status:
- 3/5 engines operational (DeepReal, Mental Health, Religion Hub)
- 2 missing engines: Medical Life, BLACKBOX
- 13 API routes active (target: 25+)
- Known bugs in api-swarm.ts and classifier.ts (see HANDOFF_AND_STRATEGY.md)
- Pages flagged as "VERY BAD": trend-hunter, live-deception, misinfo-atlas
- All pages need AI chatbot with unique system prompts
- All pages need scientific/philosophical naming
```

---

# ═══════════════════════════════════════════════════════════
# PART 18: PROJECT IDENTITY & SCIENCE
# ═══════════════════════════════════════════════════════════

## From FINAL_EAL_AUDIT_REPORT.md

| Field | Value |
|-------|-------|
| **Full Name** | Egyptian Awareness Library (EAL) |
| **Type** | Digital Behavioral Intervention Platform |
| **Target** | Egyptian university students (18–25) |
| **Sample Size** | N=84 (quasi-experimental pre-post design) |
| **Duration** | 14-day structured intervention |
| **Languages** | Arabic (RTL) + English |
| **Deployment** | Vercel Edge Network (global CDN) |
| **Live URLs** | `egyptian-awareness-library.vercel.app` + `eal-v2-latest.vercel.app` |
| **Admin Login** | admin@eal.edu.eg / EAL2026! |

## The 3 MVPs

| MVP | Purpose | Theory | Measurement |
|-----|---------|--------|-------------|
| **DeepReal** | Combat financial/political misinformation | Inoculation Theory (McGuire 1964) | MIST-20 |
| **Mental Health** | Reduce stigma, improve literacy | COM-B Model (Michie 2011) | MHLS |
| **Religion Hub** | Counter religious exploitation | Brief RCOPE (Pargament 2011) | Brief RCOPE scale |

## The 8 Behavioral Theories

| # | Theory | Where Applied |
|---|--------|---------------|
| 1 | Inoculation Theory | DeepReal prebunking exercises |
| 2 | COM-B Model | All 42 exercises tagged with C/O/M |
| 3 | SIFT Method | DeepReal verification flow |
| 4 | Cognitive Load Theory | Negative UX in Fight-Back |
| 5 | Self-Determination Theory | Gamification (XP, streaks) |
| 6 | Brief RCOPE | Religion Hub coping assessment |
| 7 | MIST-20 | Pre/post misinformation susceptibility |
| 8 | Elaboration Likelihood Model | AI Debate Arena |

## Key Stats (All Cited)

| Stat | Value | Source |
|------|-------|--------|
| Global disinformation cost | $78B/year | WEF 2024 |
| Egyptian youth internet rate | 89% | CAPMAS/ITU 2024 |
| Prebunking effectiveness | 21% reduction | Cambridge 2019 |
| Platform exercises | 42 (14 days × 3 MVPs) | Platform data |
| API endpoints | 27+ | Platform data |
| Color themes | 16 | Platform data |
| Psychometric scales | 6 (MIST-20, MHLS, RCOPE, GHSQ, SUS, MC-SDS) | Platform data |

---

# ═══════════════════════════════════════════════════════════
# PART 19: PROJECT MILESTONES (from PROJECT.md)
# ═══════════════════════════════════════════════════════════

| # | Name | Status |
|---|------|--------|
| 1 | UI and Navigation | IN_PROGRESS |
| 2 | KeyHunter UI (7-layer vocabulary) | IN_PROGRESS |
| 3 | MVP Core Modules (DeepReal, Mental Health, Religion Hub) | PLANNED |
| 4 | API Swarm Integration (AbortController, try/catch) | IN_PROGRESS |
| 5 | Assessments & Dashboard (MIST-20, MHLS, Brief RCOPE) | PLANNED |

## Interface Contract: Frontend ↔ API Swarm
- Frontend makes requests to `/api/debunking/swarm`
- API route calls `classifier.ts` and `api-swarm.ts`
- Response handles timeouts, returning fallback `"State Stability & Economic Rumors"` if API fails
- `withTimeout` must abort fetch if > 8000ms

---

# ═══════════════════════════════════════════════════════════
# PART 20: TEST INFRASTRUCTURE
# ═══════════════════════════════════════════════════════════

## From TEST_INFRA.md & TEST_READY.md

- **Test runner:** Playwright for E2E, Vitest for unit
- **Command:** `npx playwright test tests/e2e/angry-debunkers.spec.ts`
- **Status:** Tests defined but will fail until backend features complete
- **Total tests:** 45

| Tier | Count | Description |
|------|-------|-------------|
| Feature Coverage | 24 | Submit, Dashboard, Visualizer, Citations |
| Boundary & Corner | 14 | XSS, timeouts, rate limits, character limits |
| Cross-Feature | 4 | Sequence interactions |
| Real-World | 3 | Medical, Educational, Societal scenarios |

---

# ═══════════════════════════════════════════════════════════
# PART 21: BRAINSTORM — WHAT'S REAL vs ASPIRATIONAL
# ═══════════════════════════════════════════════════════════

## From BRAIN STORM.md — Honest Assessment

### Reliable For:
- Supervised demos
- Internal validation
- Architecture defense with caveats
- Showing real product direction

### NOT Reliable Enough For:
- Claiming all open-source projects are fully merged
- Claiming complete scientific instrumentation
- Claiming strong distributed backend guarantees
- Claiming comprehensive crisis-governance readiness

### Highest-Priority Next Work (from brainstorm):
1. Convert overclaimed partials into honest implementations
2. Remove false confidence (hardcoded cohort social proof, unclear fallback modes)
3. Build quality floor (unit tests, component tests, route contract tests)
4. Decide: research prototype vs deployable platform vs publishable engine

### Remaining Technical Work:
- Real-time collaboration
- Formal content pipeline
- Accessibility instrumentation
- Analytics instrumentation
- Final deployment workflow
- Documentation systems
- Exact open-source fidelity

### Remaining Scientific Work:
- Clearer scientific labeling of heuristic vs validated methods
- Model evaluation datasets
- Arabic evaluation benchmarks
- False-positive / false-negative analysis
- Provider reliability analysis
- Safety-governance review of crisis flows

---

# ═══════════════════════════════════════════════════════════
# PART 22: PARENT DIRECTORY DOCS
# ═══════════════════════════════════════════════════════════

Key documents in `c:\Users\pc\Desktop\EGY\`:

| Document | Size | Contains |
|----------|------|----------|
| `implementation_plan.md` | 41KB (666 lines) | Master architecture: 3 pillars, 5 engines, 6-agent pipeline, 50 COVO additions, 7-step roadmap, complete API map |
| `handoff.md` | 10KB | Original bug diagnoses + proposed code fixes for api-swarm.ts and classifier.ts |
| `PRD DOCUMENT SKILL` | 24KB | Product requirements document |
| `FINALK2.md` | 72KB | Deep analysis (very large — read in chunks only) |
| `FINAL_GOD_TIER_REPORT.md` | 6.7KB | Summary report |

---

# ═══════════════════════════════════════════════════════════
# PART 23: QUICK REFERENCE CARD
# ═══════════════════════════════════════════════════════════

```
╔══════════════════════════════════════════════════════════════════╗
║                    EAL QUICK REFERENCE                          ║
╠══════════════════════════════════════════════════════════════════╣
║  PROJECT: Egyptian Awareness Library                            ║
║  STACK:   Next.js 15 + React 19 + TypeScript + Tailwind v4     ║
║  SIZE:    806 files / 8.89MB source / 102 routes / 124 pages   ║
║  ENGINES: 3/5 working (DeepReal ✅ Mental ✅ Religion ✅)        ║
║  STATUS:  13/25 APIs, 917/1150 entries                         ║
║  DEPLOY:  egyptian-awareness-library.vercel.app                 ║
║                                                                 ║
║  ┌─ MODEL GUIDE ───────────────────────────────────────┐        ║
║  │ 🟢 Haiku  = simple edits, comments, formatting      │        ║
║  │ 🔵 Sonnet = features, fixes, components (DEFAULT)   │        ║
║  │ 🟣 Opus   = architecture, deep debug, planning      │        ║
║  └──────────────────────────────────────────────────────┘        ║
║                                                                 ║
║  ┌─ TOKEN SAVERS ──────────────────────────────────────┐        ║
║  │ • CLAUDE.md at root = free persistent context        │        ║
║  │ • /compact at 60% = prevent context cliff            │        ║
║  │ • /clear between tasks = clean reasoning             │        ║
║  │ • Zone-based work = focused file reads               │        ║
║  │ • Line ranges for big files = targeted context       │        ║
║  └──────────────────────────────────────────────────────┘        ║
║                                                                 ║
║  ┌─ DANGER FILES (never read fully) ──────────────────┐         ║
║  │ • globals.css (135KB)                                │        ║
║  │ • src/app/page.tsx (51KB)                            │        ║
║  │ • package-lock.json (496KB)                          │        ║
║  │ • node_modules/ — NEVER touch                        │        ║
║  │ • .next/ — NEVER touch                               │        ║
║  └──────────────────────────────────────────────────────┘        ║
║                                                                 ║
║  ┌─ KNOWN BUGS ────────────────────────────────────────┐        ║
║  │ • api-swarm.ts: hardcoded scores + no AbortController│        ║
║  │ • classifier.ts: missing try/catch                   │        ║
║  │ • See HANDOFF_AND_STRATEGY.md §2 for fixes           │        ║
║  └──────────────────────────────────────────────────────┘        ║
║                                                                 ║
║  ┌─ COMMANDS ──────────────────────────────────────────┐        ║
║  │ npm run dev    → localhost:3000                       │        ║
║  │ npm run build  → production build                    │        ║
║  │ npm run lint   → ESLint                              │        ║
║  └──────────────────────────────────────────────────────┘        ║
╚══════════════════════════════════════════════════════════════════╝
```

---

# ═══════════════════════════════════════════════════════════
# PART 24: FILES CREATED IN THIS SESSION
# ═══════════════════════════════════════════════════════════

| File | Location | Purpose |
|------|----------|---------|
| `CLAUDE.md` | Project root (updated) | Auto-loaded by Claude Code — free bootstrap |
| `HANDOFF_AND_STRATEGY.md` | Project root (already existed, 651 lines) | Master strategy document |
| `CLAUDE_CODE_STRATEGY.md` | Project root (new) | Strategy guide copy |
| `ANTIGRAVITY_CONTEXT_EXPORT.md` | Project root (new) | Conversation context |
| `COMPLETE_CLAUDE_CODE_HANDOFF.md` | This artifact | Everything in one document |

---

**END OF DOCUMENT — NOTHING SKIPPED**
