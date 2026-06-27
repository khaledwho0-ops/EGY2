# 🧠 Claude Code Master Strategy — Egyptian Awareness Library

> **Created:** 2026-06-20 | **From:** Antigravity session context  
> **Purpose:** Everything you need to work efficiently with Claude Code on the EAL codebase

---

## 1. YOUR CODEBASE REALITY

| Metric | Value | What This Means |
|--------|-------|-----------------|
| Total project size | 2,595 MB | 99% is `node_modules` — NEVER scan |
| Source files | 806 | This is what matters |
| Source size | 8.89 MB | Manageable if targeted |
| Page routes | 124 `page.tsx` | Across 102+ directories |
| Library modules | 109 files | In 41 subdirs under `src/lib/` |
| Components | 28 subdirs | Under `src/components/` |
| `globals.css` | 135 KB | ⚠️ NEVER read whole file |
| Root `page.tsx` | 51 KB | ⚠️ NEVER read whole file |

---

## 2. ANTIGRAVITY CONVERSATION CONTEXT

### Conversation Sessions (107 total, 4 significant)

| Session | ID | Size | Summary |
|---------|-----|------|---------|
| **Main Build (12 hours)** | `56ec5322-d068-4e95-a62c-bfe55d4f2878` | 701KB | Built forensic-c2pa, cognitive-lab, nvidia-hub, angry-debunkers, ai-agents, debate-sim |
| **First Handoff** | `6c6c1d58-4359-4b7a-a050-ea3fc8a6a140` | 69KB | Created HANDOFF_AND_STRATEGY.md, CLAUDE.md, brainstorm docs |
| **Current Session** | `1cd153f9-cba8-40dd-aa5f-cae5575caf15` | 41KB | This strategy document, final context packaging |
| **Earlier Session** | `bfae47b8-eb02-4805-a8be-fbaeb472a6f1` | 22KB | Earlier feature work |

### Transcript Locations
```
C:\Users\pc\.gemini\antigravity-ide\brain\56ec5322-d068-4e95-a62c-bfe55d4f2878\.system_generated\logs\transcript.jsonl
C:\Users\pc\.gemini\antigravity-ide\brain\6c6c1d58-4359-4b7a-a050-ea3fc8a6a140\.system_generated\logs\transcript.jsonl
C:\Users\pc\.gemini\antigravity-ide\brain\1cd153f9-cba8-40dd-aa5f-cae5575caf15\.system_generated\logs\transcript.jsonl
```

### What Was Built in Main Build Session
- `src/app/forensic-c2pa/page.tsx` — C2PA content provenance forensics
- `src/app/cognitive-lab/page.tsx` — Cognitive bias laboratory
- `src/app/nvidia-hub/page.tsx` — NVIDIA AI hub page
- `src/app/angry-debunkers/page.tsx` — Debunker community page
- `src/app/ai-agents/page.tsx` — AI agents showcase
- `src/app/debate-sim/page.tsx` — Debate simulator

### What's Currently Open / In-Progress
These pages were open when the user stopped (may need completion):
- `src/app/others-search/page.tsx` (19KB)
- `src/app/baseline/page.tsx` (18KB)
- `src/app/osint-investigator/page.tsx` (23KB)
- `src/app/assessment/page.tsx` (32KB)
- `src/app/blackbox/page.tsx` (33KB)

---

## 3. MODEL SELECTION — THE COMPLETE GUIDE

### Decision Flowchart

```
Is the task a simple edit, rename, comment, or format change?
├── YES → 🟢 HAIKU (fastest, cheapest, ~3¢/task)
└── NO ↓

Is it standard feature work, bug fix, or single-file refactor?
├── YES → 🔵 SONNET (daily driver, 80-90% of work)
└── NO ↓

Is it multi-file architecture, complex debugging, or planning?
├── YES → 🟣 OPUS (premium reasoning, ~15x Haiku cost)
└── NO → 🔵 SONNET (safe default)
```

### 🟢 HAIKU — The Sprinter

**When:** Simple, mechanical, low-reasoning tasks

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
```
"Add Arabic RTL className to this div"
"Rename fetchOpenAlex to fetchOpenAlexData"
"Add a loading state to this button"
"Generate JSDoc for this function"
"Fix this TypeScript type error on line 45"
```

### 🔵 SONNET — The Workhorse (DEFAULT 80-90%)

**When:** Standard development work with clear requirements

| ✅ Use For | ❌ Don't Use For |
|-----------|----------------|
| Building new page routes | Designing the 6-agent pipeline |
| Implementing single features | Complex multi-system refactoring |
| Standard bug fixes | Tasks that failed twice already |
| Code review | Architectural decisions with trade-offs |
| Single-file refactoring | Writing master implementation plans |
| Component creation | Security/safety reviews |
| API integration | |

**EAL Examples:**
```
"Build the drug-checker page with openFDA integration"
"Fix the api-swarm.ts hardcoded scores using HANDOFF_AND_STRATEGY.md"
"Add WhatsApp analyzer text parsing logic"
"Create the evidence aggregation UI component"
"Implement the mastery model state machine"
```

### 🟣 OPUS — The Architect

**When:** Complex reasoning, multi-file systems, debugging failures

| ✅ Use For | ❌ Never For |
|-----------|------------|
| Multi-file architectural refactoring | Simple edits |
| Complex debugging (failed with Sonnet) | Routine feature work |
| Designing engine pipelines | Boilerplate generation |
| Planning cross-system integrations | File reading/searching |
| Security/safety implications review | Styling/CSS changes |
| Complex state machines spanning files | One-off renames |
| Writing implementation plans | |

**EAL Examples:**
```
"Design and implement the 6-Agent Logic Pipeline across src/lib/agents/"
"Refactor Gemini Mega-Rotator into unified provider system"
"Architect the Knowledge Graph with SHA-256 verification"
"Debug why hive-mind swarm produces inconsistent scores across 5 APIs"
"Implement Negative Prompt Layers (NEG-01 through NEG-07)"
```

### The Escalation Pattern

```
START → Sonnet
  ├── Success? → Done ✅
  └── Failure?
      ├── Simple mistake? → Retry Sonnet
      └── Genuinely complex? → Escalate to Opus
          └── After Opus solves architecture → Drop back to Sonnet for implementation
```

> [!IMPORTANT]  
> **The Opus-then-Sonnet pattern** is the most cost-effective way to handle complex work:
> 1. Use Opus to *plan and design* the architecture
> 2. Switch to Sonnet to *implement* the plan
> 3. Switch back to Opus only if implementation hits unexpected complexity

---

## 4. TOKEN EFFICIENCY STRATEGIES

### Strategy 1: Zone-Based Work (CRITICAL)

Split the codebase into zones. Only load context for the zone you're working in.

| Zone | Files to Load | When |
|------|--------------|------|
| **Zone A: Single Page** | 1 `page.tsx` + its component imports | Building/fixing a specific page |
| **Zone B: Feature Vertical** | 1 page + 1 lib module + 1 component dir | Building a connected feature |
| **Zone C: System Layer** | `src/lib/<module>/` files only | Fixing backend logic, APIs |
| **Zone D: Design System** | `globals.css` lines X-Y + `layout.tsx` | Styling/theme work |
| **Zone E: Cross-Cutting** | `middleware.ts` + `layout.tsx` + config files | Auth, i18n, routing |

> [!CAUTION]  
> **NEVER load Zone A + Zone D + Zone C simultaneously.** Each zone = separate session or `/clear` boundary.

### Strategy 2: CLAUDE.md Bootstrap (FREE context)

The `CLAUDE.md` file in the project root is automatically read by Claude Code at session start — **zero tokens wasted re-explaining the project**. It's already created and contains:
- Architecture summary
- File size warnings
- Known bugs
- Key documentation links
- Token efficiency rules

### Strategy 3: Prompt Templates

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
Read HANDOFF_AND_STRATEGY.md section [X] for architecture context.
Do NOT read globals.css, layout.tsx, or other pages.
```

#### For Bug Fixes:
```
Bug in src/lib/[module]/[file].ts
Symptom: [what's wrong]
Read ONLY this file and its direct imports.
Fix proposed in HANDOFF_AND_STRATEGY.md — implement it.
```

### Strategy 4: File Size Rules

| File Size | Action |
|-----------|--------|
| < 5KB | Safe to read whole file |
| 5-20KB | Read whole file first time, then target lines |
| 20-50KB | Read in 200-line chunks |
| 50KB+ | ⚠️ NEVER read whole file. Always specify line ranges |

### Strategy 5: Session Lifecycle

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

## 5. CLAUDE CODE COMMANDS CHEATSHEET

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

### Critical Habits

> [!WARNING]  
> **The 60% Rule:** Don't wait for automatic compaction. Run `/compact` proactively at 60% context usage. Performance degrades sharply after 80%.

> [!CAUTION]  
> **The Context Cliff:** If Claude starts forgetting things, repeating itself, or making inconsistent changes — you've hit the cliff. Don't add more instructions. `/clear`, save state to a file, restart.

> [!TIP]  
> **The `/clear` Discipline:** Commit your changes after each task, then `/clear` before starting the next task. Clean context = better reasoning.

---

## 6. TASK PRIORITIZATION (Ordered by Impact)

| Priority | Task | Model | Zone | Sessions |
|----------|------|-------|------|----------|
| **P0** | Apply HANDOFF_AND_STRATEGY.md fixes (api-swarm + classifier) | 🔵 Sonnet | C | 1 |
| **P1** | Build Evidence Aggregation UI (5-API aggregator has ZERO UI) | 🔵 Sonnet | B | 2-3 |
| **P1** | Upgrade Islamic APIs (AlQuran→Quran.com v4, local→fawazahmed0) | 🔵 Sonnet | C | 2 |
| **P1** | Connect free APIs (arXiv, openFDA, DailyMed, RxNorm, WHO) | 🔵 Sonnet | C | 3-4 |
| **P2** | Build Medical Life Engine | 🟣 Opus→🔵 Sonnet | B | 4-5 |
| **P2** | Build BLACKBOX Scenarios Engine | 🟣 Opus→🔵 Sonnet | B | 3-4 |
| **P2** | Implement Mastery Learning model | 🔵 Sonnet | B | 2-3 |
| **P3** | Design 6-Agent Judgment Pipeline | 🟣 Opus | C | 5+ |
| **P3** | Build Kill-Switch V(r,K) middleware | 🟣 Opus | C | 3-4 |
| **P3** | Implement Negative Prompt Layers | 🟣 Opus→🔵 Sonnet | C | 2-3 |
| **P4** | Omar's 15 features (Trend Hunter, KILL LIST, etc.) | 🔵 Sonnet | A | 1 each |
| **P4** | PWA/Offline Emergency Cache | 🔵 Sonnet | E | 2-3 |
| **P5** | Women's Shield + Men's Crisis Shield | 🔵 Sonnet | A | 1-2 each |

---

## 7. ANTI-PATTERNS — What DESTROYS Tokens

| ❌ Anti-Pattern | 💰 Cost | ✅ Do Instead |
|----------------|---------|-------------|
| "Explain the whole codebase" | 50K+ tokens | "Read CLAUDE.md and src/app/[page]/page.tsx" |
| Reading globals.css fully | ~30K tokens | "Read globals.css lines 1-50 for color vars" |
| "Find all files that..." (recursive) | 10K+ | Use grep with specific patterns |
| Chatty back-and-forth | Compounds | Give clear, complete instructions upfront |
| Keeping old context when switching tasks | Context rot | `/clear` between tasks |
| Reading page.tsx (51KB) fully | ~12K tokens | "Read page.tsx lines 1-100 for hero" |
| "Thank you" / pleasantries | Wasted | Skip to next instruction |
| Re-explaining project each session | 2K+ per session | Use CLAUDE.md (loads free) |
| Running build to "check everything" | 30sec+ | Build only when verifying specific changes |

---

## 8. BOOTSTRAP PROMPT — Copy-Paste to Start Any Session

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
- 13 API routes active (target: 25+)
- Known bugs in api-swarm.ts and classifier.ts (see HANDOFF_AND_STRATEGY.md)
```

---

## 9. QUICK REFERENCE CARD

```
╔══════════════════════════════════════════════════════════════════╗
║                    EAL QUICK REFERENCE                          ║
╠══════════════════════════════════════════════════════════════════╣
║  PROJECT: Egyptian Awareness Library                            ║
║  STACK:   Next.js 15 + React 19 + TypeScript + Tailwind v4     ║
║  SIZE:    806 files / 8.89MB source / 102 routes / 124 pages   ║
║  STATUS:  3/5 engines, 13/25 APIs, 917/1150 entries            ║
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
║  ┌─ DANGER FILES ──────────────────────────────────────┐        ║
║  │ • globals.css (135KB) — read specific line ranges    │        ║
║  │ • src/app/page.tsx (51KB) — read in chunks           │        ║
║  │ • node_modules/ — NEVER touch                        │        ║
║  │ • .next/ — NEVER touch                               │        ║
║  │ • package-lock.json (496KB) — NEVER read             │        ║
║  └──────────────────────────────────────────────────────┘        ║
╚══════════════════════════════════════════════════════════════════╝
```

---

## 10. KEY FILES MAP (for Claude Code navigation)

### Project Root
```
c:\Users\pc\Desktop\EGY\New folder (20)\egyptian-awareness-library\
├── CLAUDE.md               ← Auto-loaded by Claude Code (FREE)
├── HANDOFF_AND_STRATEGY.md ← 651 lines, master strategy
├── BRAIN STORM.md          ← Philosophy & decision prompts
├── FINAL_EAL_AUDIT_REPORT.md ← Quality audit
├── package.json            ← Dependencies
├── next.config.ts          ← Next.js config
├── tsconfig.json           ← TypeScript config
├── .env.local              ← API keys (6KB, 14 keys)
```

### Parent Directory Docs
```
c:\Users\pc\Desktop\EGY\
├── implementation_plan.md  ← 666-line master architecture
├── handoff.md              ← Original bug diagnoses
├── PRD DOCUMENT SKILL      ← Product requirements (24KB)
├── FINALK2.md              ← 72KB deep analysis
├── FINAL_GOD_TIER_REPORT.md ← 6.7KB summary
```

### Source Architecture
```
src/app/           → 102 route dirs (pages, each self-contained "use client")
src/components/    → 28 feature component dirs
src/lib/           → 41 logic module dirs (ai/, debunking/, agents/, i18n/, etc.)
src/content/       → Static content
src/data/          → Data files
src/features/      → Feature modules
src/types/         → TypeScript types
src/middleware.ts   → Route protection, i18n
```
