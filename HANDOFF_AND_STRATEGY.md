# 🏗️ EAL Handoff & Token Efficiency Strategy

> **Purpose:** Everything a new AI session (Claude Code or otherwise) needs to understand, navigate, and efficiently work on the Egyptian Awareness Library codebase — without burning tokens rediscovering what's already known.

---

## 1. CODEBASE ANATOMY (Hard Numbers)

### Size Reality Check

| Metric | Value | Implication |
|--------|-------|-------------|
| **Total project files** | 62,390 | Mostly `node_modules` — **never scan this** |
| **Total project size** | 2,595 MB | Do NOT do recursive reads |
| **Source code files** | 806 files | This is what matters |
| **Source code size** | 8.89 MB | Manageable if targeted |
| **Page routes** | 124 `page.tsx` files | 2.54 MB across 102+ directories |
| **Library modules** | 109 files in `src/lib/` | 0.63 MB across 41 subdirectories |
| **Components** | 28 subdirectories in `src/components/` | Varies per component |
| **globals.css** | 135 KB (single file) | ⚠️ MASSIVE — never read whole file |
| **Root page.tsx** | 51 KB | ⚠️ Largest single page |

### The File System Map

```
c:\Users\pc\Desktop\EGY\New folder (20)\egyptian-awareness-library\
├── src/
│   ├── app/                          # 102 route dirs + 7 files
│   │   ├── page.tsx                  # 51KB — Landing page (HUGE)
│   │   ├── layout.tsx                # 7.8KB — Root layout
│   │   ├── globals.css               # 135KB — ALL styles (MASSIVE)
│   │   ├── error.tsx                 # 1.8KB
│   │   ├── loading.tsx               # 0.8KB
│   │   ├── not-found.tsx             # 1.9KB
│   │   │
│   │   ├── (kernel)/                 # Route groups
│   │   ├── (marketing)/
│   │   ├── [lang]/                   # i18n dynamic route
│   │   │
│   │   ├── ai-agents/                # AI agent pages
│   │   ├── ai-editor/
│   │   ├── angry-debunkers/
│   │   ├── arabic-shield/
│   │   ├── assessment/
│   │   ├── bad-news/                 # Inoculation game
│   │   ├── baseline/
│   │   ├── bias-detector/
│   │   ├── bias-fingerprint/
│   │   ├── blackbox/                 # BLACKBOX scenarios engine
│   │   ├── chatbot/                  # AI chatbot
│   │   ├── cognitive-lab/
│   │   ├── comb-tracker/
│   │   ├── competition-demo/
│   │   ├── connect/
│   │   ├── critical-thinking/
│   │   ├── curriculum/
│   │   ├── dashboard/
│   │   ├── debate-sim/               # Debate simulator
│   │   ├── deepreal/                 # Deepfake detection
│   │   ├── deepreal-forensics/
│   │   ├── deepreal-upload/
│   │   ├── defense-main-plan/
│   │   ├── defense-pages-map/
│   │   ├── defense-qa/
│   │   ├── defense-test/
│   │   ├── demo/
│   │   ├── drug-checker/
│   │   ├── effect-dashboard/
│   │   ├── engines-guide/
│   │   ├── epistemology/
│   │   ├── evidence/
│   │   ├── explore/
│   │   ├── fallacy-engine/
│   │   ├── family-kit/
│   │   ├── forensic-c2pa/            # C2PA provenance
│   │   ├── forensic-image/
│   │   ├── global-alliance/
│   │   ├── god-system/               # 7-Layer Pipeline
│   │   ├── guide/
│   │   ├── health-data/
│   │   ├── impact/
│   │   ├── inoculation-passport/
│   │   ├── kill-list/
│   │   ├── knowledge-graph/
│   │   ├── language-select/
│   │   ├── layers/
│   │   ├── live-deception/
│   │   ├── manipulation-cards/
│   │   ├── master-roadmap/
│   │   ├── media-library/
│   │   ├── medical-life/
│   │   ├── mens-shield/
│   │   ├── mental-health/
│   │   ├── misinfo-atlas/
│   │   ├── nvidia-hub/
│   │   ├── onboarding/
│   │   ├── open-source/
│   │   ├── osint-investigator/
│   │   ├── others-search/
│   │   ├── paper-auditor/
│   │   ├── peer-challenge/
│   │   ├── philosophy/
│   │   ├── platform-guide/
│   │   ├── presentation/
│   │   ├── pricing-presentation/
│   │   ├── project-vision/
│   │   ├── prompt-lab/
│   │   ├── publishing-plan/
│   │   ├── reaction-test/
│   │   ├── religion-hub/
│   │   ├── report/
│   │   ├── reverse/
│   │   ├── rumor-heatmap/
│   │   ├── science/
│   │   ├── self-test-protocol/
│   │   ├── six-layers/
│   │   ├── sources/
│   │   ├── sovo/
│   │   ├── stat-power/
│   │   ├── supervisor/
│   │   ├── swarm-debate/
│   │   ├── threat-briefing/
│   │   ├── threat-map/
│   │   ├── tools-download/
│   │   ├── trailer/
│   │   ├── transformation/
│   │   ├── trend-hunter/
│   │   ├── ux-science/
│   │   ├── welcome/
│   │   ├── whatsapp-analyzer/
│   │   ├── why-us/
│   │   ├── womens-shield/
│   │   │
│   │   ├── about/
│   │   ├── actions/                  # Server actions
│   │   └── api/                      # API routes
│   │
│   ├── components/                   # 28 subdirectories
│   │   ├── admin/
│   │   ├── assessment/
│   │   ├── baseline/
│   │   ├── calm/
│   │   ├── chatbot/
│   │   ├── debate/
│   │   ├── defense/
│   │   ├── defense-pages/
│   │   ├── dev/
│   │   ├── engagement/
│   │   ├── exercises/
│   │   ├── features/
│   │   ├── hunter/
│   │   ├── interactive/
│   │   ├── interventions/
│   │   ├── mh/                       # Mental health
│   │   ├── misinfo-atlas/
│   │   ├── onboarding/
│   │   ├── psychometrics/
│   │   ├── pyramid/
│   │   ├── religion/
│   │   ├── research/
│   │   ├── safety/
│   │   ├── science/
│   │   ├── shared/                   # Shared/reusable
│   │   ├── six-layers/
│   │   ├── sources/
│   │   └── ui/                       # Base UI primitives
│   │
│   ├── lib/                          # 41 subdirectories + 3 files
│   │   ├── agents/                   # AI agent logic
│   │   ├── ai/                       # AI provider configs
│   │   ├── analytics/
│   │   ├── api/
│   │   ├── audit/
│   │   ├── auth/
│   │   ├── auth.ts                   # 4.4KB
│   │   ├── certification/
│   │   ├── cognition/
│   │   ├── cognitive/
│   │   ├── content.ts                # 0.6KB
│   │   ├── db/
│   │   ├── debunking/                # ⚠️ HAS KNOWN BUGS (see handoff.md)
│   │   ├── deployment/
│   │   ├── export/
│   │   ├── gamification/
│   │   ├── i18n/                     # Internationalization
│   │   ├── kv/
│   │   ├── nlp/                      # NLP processing
│   │   ├── orchestration/
│   │   ├── osint/
│   │   ├── pedagogy/
│   │   ├── progress/
│   │   ├── progression/
│   │   ├── prompts/
│   │   ├── provenance/
│   │   ├── registry/
│   │   ├── religion/
│   │   ├── research/
│   │   ├── routing/
│   │   ├── safety/
│   │   ├── schemas/
│   │   ├── science/
│   │   ├── scoring/
│   │   ├── scroll/
│   │   ├── sources/
│   │   ├── telemetry/
│   │   ├── tracking/
│   │   ├── utils.ts                  # 1.4KB
│   │   ├── validation/
│   │   ├── verification/
│   │   ├── versioning/
│   │   ├── workflow/
│   │   └── xapi/
│   │
│   ├── content/                      # Static content / data
│   ├── data/                         # Data files
│   ├── features/                     # Feature modules
│   ├── types/                        # TypeScript types
│   └── middleware.ts                  # 1.8KB — Route middleware
│
├── public/                           # Static assets
├── package.json
├── next.config.js
├── tsconfig.json
└── tailwind.config.ts
```

### Critical Files You'll Touch Most

| File | Size | Why |
|------|------|-----|
| `src/app/globals.css` | 135KB | Design system — ALL styles |
| `src/app/page.tsx` | 51KB | Landing page |
| `src/app/layout.tsx` | 7.8KB | Root layout, providers, nav |
| `src/lib/ai/` | varies | AI provider configs, rotator |
| `src/lib/debunking/` | varies | ⚠️ Has known bugs (handoff.md) |
| `src/middleware.ts` | 1.8KB | Route protection, i18n |

---

## 2. KNOWN BUGS & PENDING FIXES

> From [handoff.md](file:///c:/Users/pc/Desktop/EGY/handoff.md) — these are already diagnosed with proposed code:

### Bug 1: `api-swarm.ts` — Hardcoded Scores
**File:** `src/lib/debunking/workers/api-swarm.ts`
- `fetchOpenAlex`, `fetchEuropePMC`, `fetchQuran`, `fetchGoogleFactCheck` return **hardcoded** `credibilityScore` and `abstract` instead of extracting from API responses
- `withTimeout` doesn't use `AbortController` → socket leaks on timeout
- **Fix:** Proposed code exists in `handoff.md` — needs implementation

### Bug 2: `classifier.ts` — Missing try/catch
**File:** `src/lib/debunking/classifier.ts`
- `classifyEgyptianContext` crashes if `OPENAI_API_KEY` is missing (no try/catch)
- **Fix:** Wrap in try/catch, fallback to `"State Stability & Economic Rumors"`

---

## 3. EXISTING DOCUMENTATION MAP

| Document | Path | What It Contains |
|----------|------|-----------------|
| **Implementation Plan** | [implementation_plan.md](file:///c:/Users/pc/Desktop/EGY/implementation_plan.md) | 666-line master architecture: 3 pillars, 5 engines, 6-agent pipeline, 50 COVO additions, 7-step roadmap, API map |
| **Handoff Report** | [handoff.md](file:///c:/Users/pc/Desktop/EGY/handoff.md) | Bug diagnoses + proposed code for api-swarm.ts and classifier.ts |
| **PRD Document** | [PRD DOCUMENT SKILL](file:///c:/Users/pc/Desktop/EGY/PRD%20DOCUMENT%20SKILL) | 24KB product requirements |
| **God Tier Report** | [FINAL_GOD_TIER_REPORT.md](file:///c:/Users/pc/Desktop/EGY/FINAL_GOD_TIER_REPORT.md) | 6.7KB summary report |
| **FINALK2** | [FINALK2.md](file:///c:/Users/pc/Desktop/EGY/FINALK2.md) | 72KB deep analysis |

---

## 4. ANTIGRAVITY CONVERSATION CONTEXT

### Previous Sessions

| Session | ID | Summary |
|---------|------|---------|
| **Main Build Session** | `56ec5322-d068-4e95-a62c-bfe55d4f2878` | "Developing Egyptian Infrastructure Systems" — Built/modified pages including forensic-c2pa, cognitive-lab, nvidia-hub, angry-debunkers, ai-agents, debate-sim. Ran 2026-06-19 09:10 → 21:45 (~12 hours) |
| **Current Session** | `6c6c1d58-4359-4b7a-a050-ea3fc8a6a140` | This handoff session |

### How to Access Conversation Logs
```
Antigravity transcript location:
C:\Users\pc\.gemini\antigravity-ide\brain\<conversation-id>\.system_generated\logs\transcript.jsonl

Main build session:
C:\Users\pc\.gemini\antigravity-ide\brain\56ec5322-d068-4e95-a62c-bfe55d4f2878\.system_generated\logs\transcript.jsonl
```

### What Was Built in the Main Session (Best Guess from Open Files)
- `forensic-c2pa/page.tsx` — C2PA content provenance forensics
- `cognitive-lab/page.tsx` — Cognitive bias laboratory
- `nvidia-hub/page.tsx` — NVIDIA AI hub page
- `angry-debunkers/page.tsx` — Debunker community page
- `ai-agents/page.tsx` — AI agents showcase
- `debate-sim/` — Debate simulator (currently live at localhost:3000)

---

## 5. SMART TOKEN EFFICIENCY PLAN

### ⚡ The Core Problem

Your codebase has **806 source files** across **102 route directories**. A naive AI session that tries to "understand the whole project" will burn thousands of tokens reading files that are irrelevant to the current task.

### 🎯 Strategy 1: Zone-Based Work (CRITICAL)

Split the codebase into **zones**. Only load context for the zone you're working in.

| Zone | Files | When to Load |
|------|-------|-------------|
| **Zone A: Single Page** | 1 `page.tsx` + its component imports | Building/fixing a specific page |
| **Zone B: Feature Vertical** | 1 page + 1 lib module + 1 component dir | Building a connected feature |
| **Zone C: System Layer** | `src/lib/<module>/` files only | Fixing backend logic, APIs |
| **Zone D: Design System** | `globals.css` lines X-Y + `layout.tsx` | Styling/theme work |
| **Zone E: Cross-Cutting** | `middleware.ts` + `layout.tsx` + config files | Auth, i18n, routing changes |

> [!IMPORTANT]
> **NEVER load Zone A + Zone D + Zone C simultaneously.** Each zone should be a separate session or a `/clear` boundary.

### 🎯 Strategy 2: The CLAUDE.md Bootstrap

Create this file at the project root. Every Claude Code session reads it automatically — **zero tokens wasted re-explaining the project**.

```markdown
# CLAUDE.md — Egyptian Awareness Library (EAL)

## Project Identity
- Next.js 14+ App Router, TypeScript, Tailwind CSS
- 102 route directories, 124 page.tsx files
- Deployed on Vercel

## Architecture (DO NOT REDISCOVER)
- 5 Engines: DeepReal, Medical Life, Mental Health, Religion Hub, BLACKBOX
- God-System: 7-Layer analysis pipeline
- Gemini Mega-Rotator: 14 API keys across 6 AI providers
- Evidence Aggregator: 5 APIs (OpenAlex + Semantic Scholar + Crossref + EuropePMC + DOAJ)
- Debunking pipeline: classifier.ts → api-swarm.ts → workers

## Key Patterns
- Pages are self-contained "use client" components with inline state
- Styling uses Tailwind + globals.css (135KB — read only specific sections)
- AI calls go through src/lib/ai/ with automatic failover
- Server actions in src/app/actions/
- API routes in src/app/api/

## Known Issues
- src/lib/debunking/workers/api-swarm.ts: hardcoded scores (see handoff.md)
- src/lib/debunking/classifier.ts: missing try/catch (see handoff.md)

## Commands
- `npm run dev` — Start dev server (port 3000)
- `npm run build` — Production build
- `npm run lint` — ESLint

## Rules
- Every new page connects to ≥2 existing APIs
- Every output must show evidence source
- Arabic RTL support required
- Mobile responsive (320px minimum)
- NEVER edit node_modules or .next
```

### 🎯 Strategy 3: The Prompt Templates

Use these **exact prompts** to avoid token waste:

#### For Single Page Work:
```
I need to [fix/build/modify] the [page-name] page.
File: src/app/[page-name]/page.tsx
It [does X / should do Y / has bug Z].
Only read this file and its direct imports. Do NOT scan the full codebase.
```

#### For Feature Implementation:
```
I need to implement [feature].
Relevant files ONLY:
- src/app/[route]/page.tsx (the UI)
- src/lib/[module]/ (the logic)
- src/components/[area]/ (shared components)
Read the implementation_plan.md section on [X] for architecture context.
Do NOT read globals.css, layout.tsx, or other pages.
```

#### For Bug Fixes:
```
Bug in src/lib/[module]/[file].ts
Symptom: [what's wrong]
Read ONLY this file and its direct imports.
Fix proposed in handoff.md — implement it.
```

### 🎯 Strategy 4: File Size Awareness

| File | Action |
|------|--------|
| **< 5KB** | Safe to read whole file |
| **5-20KB** | Read whole file first time, then target specific lines |
| **20-50KB** | Read in 200-line chunks, specify line ranges |
| **50KB+** (page.tsx, globals.css) | ⚠️ NEVER read whole file. Always specify line ranges |

### 🎯 Strategy 5: Session Architecture

```
┌─────────────────────────────────────────────┐
│           SESSION LIFECYCLE                  │
│                                              │
│  1. CLAUDE.md loads automatically (free)     │
│  2. State your ZONE (A/B/C/D/E)             │
│  3. Read ONLY zone-relevant files            │
│  4. Do work                                  │
│  5. /compact when context hits ~60%          │
│  6. /clear when switching zones              │
│  7. Commit after each zone is done           │
└─────────────────────────────────────────────┘
```

---

## 6. MODEL SELECTION GUIDE — When to Use What

### The Decision Matrix

```
┌──────────────────────────────────────────────────────────────────┐
│                    MODEL SELECTION FLOWCHART                      │
│                                                                  │
│  Is the task a simple edit, rename, or format change?            │
│  ├── YES → 🟢 HAIKU (fastest, cheapest)                         │
│  └── NO ↓                                                       │
│                                                                  │
│  Is it standard feature work, bug fix, or single-file refactor? │
│  ├── YES → 🔵 SONNET (daily driver, 80-90% of work)            │
│  └── NO ↓                                                       │
│                                                                  │
│  Is it multi-file architecture, complex debugging, or planning? │
│  ├── YES → 🟣 OPUS (premium reasoning)                          │
│  └── NO → 🔵 SONNET (default safe choice)                       │
└──────────────────────────────────────────────────────────────────┘
```

### 🟢 HAIKU — The Sprinter

**Cost:** Cheapest | **Speed:** Fastest | **Context:** Smallest

| ✅ Use For | ❌ Don't Use For |
|-----------|-----------------|
| Adding comments/docstrings | Multi-file changes |
| Simple renames/formatting | Complex logic |
| File searches/grep operations | Architecture decisions |
| Generating repetitive boilerplate | Debugging subtle bugs |
| Quick one-liner fixes | Reading large files for comprehension |
| Writing commit messages | Anything requiring deep reasoning |

**EAL Examples:**
- "Add Arabic RTL className to this div"
- "Rename `fetchOpenAlex` to `fetchOpenAlexData`"
- "Add a loading state to this button"
- "Generate JSDoc for this function"

### 🔵 SONNET — The Workhorse (DEFAULT)

**Cost:** Balanced | **Speed:** Fast | **Context:** Large

| ✅ Use For | ❌ Don't Use For |
|-----------|-----------------|
| Building new page routes | Designing the 6-agent pipeline from scratch |
| Implementing single features | Complex multi-system refactoring |
| Standard bug fixes | Architectural decisions with trade-offs |
| Code review | Tasks that failed twice already |
| Single-file refactoring | Writing the implementation plan |
| Component creation | |
| API integration | |

**EAL Examples:**
- "Build the drug-checker page with openFDA integration"
- "Fix the api-swarm.ts hardcoded scores using handoff.md"
- "Add the WhatsApp analyzer text parsing logic"
- "Create the evidence aggregation UI component"
- "Implement the mastery model state machine"

### 🟣 OPUS — The Architect

**Cost:** Most expensive | **Speed:** Slower | **Context:** Largest + Deepest reasoning

| ✅ Use For | ❌ Don't Use For |
|-----------|-----------------|
| Multi-file architectural refactoring | Simple edits |
| Complex debugging (failed with Sonnet) | Routine feature work |
| Designing the Judgment Engine pipeline | Boilerplate generation |
| Planning cross-system integrations | Reading/searching files |
| Reviewing security/safety implications | Styling/CSS changes |
| Building the kill-switch V(r,K) logic | |
| Complex state machines spanning files | |

**EAL Examples:**
- "Design and implement the 6-Agent Logic Pipeline across src/lib/agents/"
- "Refactor Gemini Mega-Rotator + LLM provider into unified system"
- "Architect the Knowledge Graph with SHA-256 verification"
- "Debug why the hive-mind swarm produces inconsistent scores across 5 APIs"
- "Implement the Negative Prompt Layers (NEG-01 through NEG-07)"

### The Escalation Pattern

```
START with Sonnet
    │
    ├── Task succeeds? → Done ✅
    │
    └── Task fails or output is wrong?
        │
        ├── Was it a simple mistake? → Retry with Sonnet
        │
        └── Is it genuinely complex? → Escalate to Opus
            │
            └── After Opus solves the architecture →
                Drop back to Sonnet for implementation
```

---

## 7. CLAUDE CODE SESSION COMMANDS CHEATSHEET

| Command | What It Does | When to Use |
|---------|-------------|-------------|
| `/clear` | Wipes conversation history | Switching zones / tasks |
| `/compact` | Compresses history into summary | Context at ~60% capacity |
| `/compact keep the API integration and error patterns` | Targeted compression | Preserve critical context |
| `/context` | Shows token usage breakdown | Before complex operations |
| `/cost` | Shows session cost | Monitor spending |
| `/model sonnet` | Switch to Sonnet | Default work |
| `/model opus` | Switch to Opus | Architecture/debugging |
| `/model haiku` | Switch to Haiku | Simple edits |
| `/plan` | Force planning before coding | Complex features |
| `/branch explore-new-approach` | Fork conversation | Try alternatives safely |

### Critical Habits

> [!CAUTION]
> **The 60% Rule:** Don't wait for automatic compaction. Run `/compact` proactively at 60% context usage. Performance degrades sharply after 80%.

> [!WARNING]  
> **The Context Cliff:** If Claude starts forgetting things, repeating itself, or making inconsistent changes — you've hit the cliff. Don't add more instructions. `/clear`, save state to a file, restart.

> [!TIP]
> **The `/clear` Discipline:** Commit your changes after each task, then `/clear` before starting the next task. Clean context = better reasoning.

---

## 8. TASK PRIORITIZATION FOR NEW SESSIONS

### What to Work On (Ordered by Impact)

| Priority | Task | Model | Zone | Est. Sessions |
|----------|------|-------|------|---------------|
| **P0** | Apply handoff.md fixes (api-swarm + classifier) | 🔵 Sonnet | C | 1 |
| **P0** | Create CLAUDE.md at project root | 🟢 Haiku | E | 1 |
| **P1** | Build Evidence Aggregation UI (5-API aggregator has ZERO UI) | 🔵 Sonnet | B | 2-3 |
| **P1** | Upgrade Islamic APIs (AlQuran→Quran.com v4, local→fawazahmed0) | 🔵 Sonnet | C | 2 |
| **P1** | Connect free APIs (arXiv, openFDA, DailyMed, RxNorm, WHO) | 🔵 Sonnet | C | 3-4 |
| **P2** | Build Medical Life Engine | 🟣 Opus (plan) → 🔵 Sonnet (build) | B | 4-5 |
| **P2** | Build BLACKBOX Scenarios Engine | 🟣 Opus (plan) → 🔵 Sonnet (build) | B | 3-4 |
| **P2** | Implement Mastery Learning model | 🔵 Sonnet | B | 2-3 |
| **P3** | Design 6-Agent Judgment Pipeline | 🟣 Opus | C | 5+ |
| **P3** | Build Kill-Switch V(r,K) middleware | 🟣 Opus | C | 3-4 |
| **P3** | Implement Negative Prompt Layers | 🟣 Opus → 🔵 Sonnet | C | 2-3 |
| **P4** | Omar's 15 features (Trend Hunter, KILL LIST, etc.) | 🔵 Sonnet | A | 1 each |
| **P4** | PWA/Offline Emergency Cache | 🔵 Sonnet | E | 2-3 |
| **P5** | Women's Shield + Men's Crisis Shield | 🔵 Sonnet | A | 1-2 each |
| **P5** | COVO deep systems (20 items) | 🟣 Opus (plan) → 🔵 Sonnet | B/C | varies |

---

## 9. COPY-PASTE BOOTSTRAP PROMPT

Use this prompt at the start of any new Claude Code session to instantly bootstrap context:

```
I'm working on the Egyptian Awareness Library (EAL) — a Next.js 14 platform
with 102 route directories and 806 source files.

Read CLAUDE.md in the project root for architecture rules.

Key docs:
- implementation_plan.md (666-line master architecture)
- handoff.md (known bugs + proposed fixes)

Today I'm working on: [ZONE X — describe task]
Only read files relevant to this zone. Do NOT scan the full codebase.

Current status:
- 3/5 engines operational (DeepReal, Mental Health, Religion Hub)
- 13 API routes active (target: 25+)
- 917/1150 KEYHUNTER entries (target: 1150+)
- Known bugs in api-swarm.ts and classifier.ts (see handoff.md)
```

---

## 10. ANTI-PATTERNS — What DESTROYS Tokens

| ❌ Anti-Pattern | 💰 Token Cost | ✅ Do This Instead |
|----------------|--------------|-------------------|
| "Explain the whole codebase" | 50K+ tokens | "Read CLAUDE.md and src/app/[specific-page]/page.tsx" |
| Reading globals.css fully | 135KB = ~30K tokens | "Read globals.css lines 1-50 for the color variables" |
| "Find all files that..." (recursive) | 10K+ tokens | Use grep with specific patterns |
| Chatty back-and-forth | Compounds per turn | Give clear, complete instructions upfront |
| Keeping old context when switching tasks | Context rot | `/clear` between tasks |
| Reading page.tsx (51KB root) fully | ~12K tokens | "Read page.tsx lines 1-100 for the hero section" |
| "Thank you" / pleasantries | Wasted tokens | Skip to next instruction |
| Re-explaining the project each session | 2K+ tokens per session | Use CLAUDE.md (loads free) |

---

## 11. QUICK REFERENCE CARD

```
╔══════════════════════════════════════════════════════════╗
║               EAL QUICK REFERENCE                        ║
╠══════════════════════════════════════════════════════════╣
║                                                          ║
║  PROJECT: Egyptian Awareness Library                     ║
║  STACK:   Next.js 14 + TypeScript + Tailwind             ║
║  SIZE:    806 files / 8.89MB source                      ║
║  ROUTES:  102 directories / 124 pages                    ║
║  LIB:     41 modules / 109 files                         ║
║  STATUS:  3/5 engines, 13/25 APIs, 917/1150 entries     ║
║                                                          ║
║  ┌─ MODEL GUIDE ──────────────────────────────────────┐  ║
║  │ 🟢 Haiku  = simple edits, comments, formatting     │  ║
║  │ 🔵 Sonnet = features, fixes, components (DEFAULT)  │  ║
║  │ 🟣 Opus   = architecture, deep debug, planning     │  ║
║  └────────────────────────────────────────────────────┘  ║
║                                                          ║
║  ┌─ TOKEN SAVERS ─────────────────────────────────────┐  ║
║  │ • CLAUDE.md at root = free persistent context       │  ║
║  │ • /compact at 60% = prevent context cliff           │  ║
║  │ • /clear between tasks = clean reasoning            │  ║
║  │ • Zone-based work = focused file reads              │  ║
║  │ • Line ranges for big files = targeted context      │  ║
║  └────────────────────────────────────────────────────┘  ║
║                                                          ║
║  ┌─ DANGER FILES (never read fully) ──────────────────┐  ║
║  │ • globals.css (135KB) — read specific line ranges   │  ║
║  │ • src/app/page.tsx (51KB) — read in chunks          │  ║
║  │ • node_modules/ — NEVER touch                       │  ║
║  │ • .next/ — NEVER touch                              │  ║
║  └────────────────────────────────────────────────────┘  ║
║                                                          ║
╚══════════════════════════════════════════════════════════╝
```
