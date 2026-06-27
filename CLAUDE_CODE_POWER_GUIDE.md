# 🔥 CLAUDE CODE — FULL POWER USER GUIDE (MAX 5x PLAN)
## Everything Researched — Models, Skills, Commands, Strategies

> **Created:** 2026-06-20 | **Plan:** Max 5x ($100/mo, 5x Pro usage)  
> **Sources:** Anthropic docs, Reddit, Medium, GitHub, dev.to, claudefa.st

---

# ═══════════════════════════════════════════════════════════
# SECTION 1: YOUR MAX 5x PLAN — WHAT YOU GET
# ═══════════════════════════════════════════════════════════

| Feature | Max 5x |
|---------|--------|
| **Price** | $100/month |
| **Usage** | 5x more than Pro plan |
| **Models** | Opus, Sonnet, Haiku — all available |
| **Claude Code** | ✅ Full access, terminal-based |
| **Priority** | Priority access during high-traffic |
| **Early Features** | Early access to new features |
| **Context Window** | 200K tokens per session (hard cap) |
| **Usage Shared** | Between claude.ai + Claude Code + other tools |

> [!IMPORTANT]
> **API Key Conflict:** If you have `ANTHROPIC_API_KEY` set in your environment, Claude Code may use your API credits instead of your subscription. Remove it to use your Max plan.

---

# ═══════════════════════════════════════════════════════════
# SECTION 2: ALL SLASH COMMANDS — COMPLETE LIST
# ═══════════════════════════════════════════════════════════

Type `/` in terminal to see all commands. Here's the complete reference:

## Context & Session Management

| Command | What It Does | When to Use |
|---------|-------------|-------------|
| `/clear` | Hard reset — wipes conversation | Switching to a new task |
| `/compact` | Compresses history into summary | Context at ~60% |
| `/compact keep the API patterns` | Targeted compression | Preserve specific context |
| `/context` | Shows token usage breakdown | Before complex operations |
| `/rewind` | Rolls back conversation + file changes | Agent went wrong direction |

## Model Control

| Command | What It Does | When to Use |
|---------|-------------|-------------|
| `/model sonnet` | Switch to Sonnet | Default work (80-90%) |
| `/model opus` | Switch to Opus | Architecture, deep debug |
| `/model haiku` | Switch to Haiku | Simple edits, formatting |
| `/model opusplan` | **Opus plans, Sonnet executes** | Complex features (BEST VALUE) |
| Arrow keys in model picker | Adjust effort level | Fine-tune performance |

## Planning & Workflow

| Command | What It Does | When to Use |
|---------|-------------|-------------|
| `/plan` | Plan mode — outline before executing | Large/complex changes |
| `/diff` | Shows interactive view of changes | Review what was modified |
| `/init` | Generates starter CLAUDE.md | First-time project setup |
| `/memory` | View/edit CLAUDE.md | Update project rules |

## Configuration & Info

| Command | What It Does | When to Use |
|---------|-------------|-------------|
| `/config` | Opens settings | Change preferences |
| `/help` | Lists all commands | When unsure |
| `/mcp` | Manage MCP server connections | Tool integrations |
| `/agents` | Manage subagents | Multi-agent workflows |
| `/cost` | Shows session cost | Monitor spending |
| `/exit` | Exit Claude Code | Done working |

## Permission Modes (Shift+Tab to cycle)

| Mode | Behavior |
|------|----------|
| **Default** | Normal — asks before risky actions |
| **Auto-accept** | Automatically approves all actions |
| **Plan Mode** | Read-only — plans but won't edit files |

---

# ═══════════════════════════════════════════════════════════
# SECTION 3: MODEL SELECTION — THE DEFINITIVE GUIDE
# ═══════════════════════════════════════════════════════════

## The Four Model Options in Claude Code

```
┌─────────────────────────────────────────────────────────────┐
│                    MODEL HIERARCHY                            │
│                                                              │
│  🟢 HAIKU     → Speed demon. Simple tasks. Cheapest.        │
│  🔵 SONNET    → Daily driver. 80-90% of all work.           │
│  🟣 OPUS      → Deep thinker. Architecture. Debugging.      │
│  🟠 OPUSPLAN  → BEST OF BOTH: Opus plans, Sonnet executes.  │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## 🟢 HAIKU — The Speed Demon

**Switch:** `/model haiku`

| ✅ Perfect For | ❌ Never For |
|--------------|------------|
| Adding comments/docstrings | Multi-file changes |
| Simple renames/formatting | Complex logic |
| File searches and grep | Architecture decisions |
| Writing commit messages | Debugging subtle bugs |
| Quick one-liner fixes | API integration |
| Generating boilerplate | Reading large files for comprehension |

## 🔵 SONNET — The Workhorse (DEFAULT)

**Switch:** `/model sonnet`

| ✅ Perfect For | ❌ Don't For |
|--------------|------------|
| Building new pages/components | Multi-system architecture |
| Implementing features | Tasks that failed 2x already |
| Standard bug fixes | Writing master plans |
| Code review | Security reviews |
| Single-file refactoring | |
| API integration | |

## 🟣 OPUS — The Architect

**Switch:** `/model opus`

| ✅ Perfect For | ❌ Never For |
|--------------|------------|
| Multi-file architectural refactoring | Simple edits |
| Complex debugging (after Sonnet fails) | Routine features |
| Designing system pipelines | Boilerplate |
| Planning cross-system integrations | File searching |
| Security/safety review | CSS/styling |
| Complex state machines across files | |

## 🟠 OPUSPLAN — The Smart Hybrid (HIGHEST VALUE)

**Switch:** `/model opusplan`

**How it works:**
1. **Planning phase** → Uses **Opus** (deepest reasoning)
2. **Implementation phase** → Switches to **Sonnet** (fast, efficient)
3. You get Opus-quality architecture with Sonnet-speed implementation

**Best for:** Any task that needs both good planning AND efficient execution.

## The Escalation Ladder

```
START → Sonnet (default)
  │
  ├── Simple edit? → Drop to Haiku (save tokens)
  │
  ├── Task succeeds? → Done ✅
  │
  └── Task fails or is complex?
      ├── Simple mistake? → Retry Sonnet
      └── Genuinely complex? → Escalate to Opus (or opusplan)
          └── After architecture solved → Drop back to Sonnet
```

---

# ═══════════════════════════════════════════════════════════
# SECTION 4: CLAUDE.md — THE CONSTITUTION FILE
# ═══════════════════════════════════════════════════════════

## What It Is
- A file at your project root that Claude Code reads **automatically** at session start
- **Zero token cost** for persistent context — it's FREE
- Acts as the "behavioral contract" for your project

## Best Practices (from Anthropic + community)

| Rule | Details |
|------|---------|
| **Length** | < 200 lines. If longer, Claude starts ignoring instructions |
| **Location** | Project root (`./CLAUDE.md`) |
| **Content** | "How WE do things" — project-specific rules only |
| **Don't Duplicate** | Skip standard coding knowledge (Claude already knows) |
| **Update Often** | If Claude makes a mistake twice → add a rule |
| **Delete Stale Rules** | Remove rules that no longer apply |

## What to Include (High-Signal)
1. Project overview + stack
2. Architecture patterns + forbidden practices
3. Workflow commands (`npm run dev`, `npm run build`)
4. Common gotchas + known bugs
5. Commit message format
6. Testing philosophy
7. File size warnings (what NOT to read fully)

## What to Exclude (Bloat)
- General "write clean code" instructions
- Standard language syntax (Claude already knows)
- Long API docs that change often
- Anything already in README.md

## Progressive Disclosure Pattern
```
my-project/
├── CLAUDE.md              ← Master rules (summary, <200 lines)
├── .claude/
│   ├── rules/             ← Scoped rules (api.md, testing.md)
│   ├── skills/            ← Reusable task scripts
│   ├── commands/          ← Custom slash commands
│   ├── hooks/             ← Automation hooks
│   └── settings.json      ← Configuration
└── docs/                  ← Deep documentation modules
```

---

# ═══════════════════════════════════════════════════════════
# SECTION 5: .claudeignore — BLOCK TOKEN WASTE
# ═══════════════════════════════════════════════════════════

Create `.claudeignore` at project root. Same syntax as `.gitignore`.

**Can cut token usage by 50-70%.**

## For Your EAL Project:
```gitignore
# Build outputs
.next/
out/
build/

# Dependencies (2.5GB!)
node_modules/

# Package lock (496KB)
package-lock.json

# Large generated files
tsconfig.tsbuildinfo
a11y_out.json
tmp-blueprint.txt
tailwind-test.css

# Test outputs
test-results/
test_output.txt
test_output_2.txt

# Build logs
build-output.txt
build_log.txt
build_output.txt
dev_server.log
start-*.log

# IDE
.vscode/
.vercel/

# Git
.git/

# Scratch
scratch/
```

---

# ═══════════════════════════════════════════════════════════
# SECTION 6: HOOKS — AUTO-QUALITY CHECKS
# ═══════════════════════════════════════════════════════════

Hooks run custom commands at lifecycle points. Create in `.claude/hooks/`.

## Lifecycle Events:
| Event | When |
|-------|------|
| `SessionStart` | When Claude Code session begins |
| `UserPromptSubmit` | When you submit a prompt |
| `PreToolUse` | Before Claude runs a tool |
| `PostToolUse` | After Claude runs a tool |

## Example Hooks for EAL:

### Auto-lint after file edits:
```json
// .claude/hooks/post-edit.json
{
  "event": "PostToolUse",
  "tools": ["write_file", "edit_file"],
  "command": "npx eslint --fix ${file}"
}
```

### Block dangerous commands:
```json
// .claude/hooks/block-danger.json
{
  "event": "PreToolUse",
  "tools": ["run_command"],
  "command": "echo 'Blocked' && exit 1",
  "match": "rm -rf|drop table|format"
}
```

---

# ═══════════════════════════════════════════════════════════
# SECTION 7: SKILLS — REUSABLE WORKFLOWS
# ═══════════════════════════════════════════════════════════

Skills teach Claude specific repeatable tasks. Create in `.claude/skills/`.

## Skill File Structure:
```
.claude/skills/
├── build-page/
│   └── SKILL.md          ← Instructions for building a new page
├── fix-api/
│   └── SKILL.md          ← Instructions for fixing API routes
└── add-chatbot/
    └── SKILL.md          ← Instructions for adding AI chatbot
```

## Example Skill for EAL — `build-page/SKILL.md`:
```markdown
---
name: build-page
description: Build a new EAL page with AI chatbot
---

# Build EAL Page

When building a new page for EAL:

1. Create `src/app/[page-name]/page.tsx`
2. Use "use client" directive
3. Import from `src/lib/ai/providers.ts` for AI chatbot
4. Add unique multi-layered system prompt
5. Include Arabic RTL support
6. Add real scenarios (NO mock data)
7. Add page to explore/navigation
8. Ensure mobile responsive (320px min)
```

---

# ═══════════════════════════════════════════════════════════
# SECTION 8: CUSTOM COMMANDS
# ═══════════════════════════════════════════════════════════

Create `.md` files in `.claude/commands/`. Filename = command name.

## Example: `.claude/commands/preflight.md`
```markdown
Run these checks before any commit:
1. `npm run lint`
2. `npm run build`
3. Check for any TypeScript errors
4. Verify no hardcoded API keys
Report results as a checklist.
```

Now you can type `/preflight` in Claude Code!

## Example: `.claude/commands/zone-report.md`
```markdown
Analyze the current zone I'm working in:
1. List all files I've modified this session
2. Check which imports cross zone boundaries
3. Verify no globals.css was read fully
4. Report token usage estimate
```

---

# ═══════════════════════════════════════════════════════════
# SECTION 9: SUBAGENTS & PARALLEL AGENTS
# ═══════════════════════════════════════════════════════════

## Subagents
- Delegate sub-tasks to specialized agents
- Each runs in its own context window
- Preserves main session's context

**How to use:** `/agents` to manage, or Claude auto-delegates

## Parallel Agents via Git Worktrees

**The power-user pattern for large codebases:**

```bash
# Create isolated worktrees for parallel work
git worktree add ../eal-frontend feature/frontend-fixes
git worktree add ../eal-backend feature/api-fixes

# Run separate Claude Code sessions in each
cd ../eal-frontend && claude
cd ../eal-backend && claude
```

**Why this works:**
- Each agent has its own file system
- No context bleeding between tasks
- Can work on frontend + backend simultaneously
- Share the same git history

## Headless Mode (CI/CD)
```bash
# Run without interactive terminal
claude -p "Fix all TypeScript errors in src/app/assessment/page.tsx"
claude --print "Generate unit tests for src/lib/ai/providers.ts"
```

## Multi-Agent Orchestration Pattern
```
┌─────────────────┐
│   ORCHESTRATOR   │  ← Opus (plans the work)
│   (opusplan)     │
└────────┬────────┘
         │
    ┌────┴────┐
    │         │
┌───▼───┐ ┌──▼────┐
│Agent 1│ │Agent 2│  ← Sonnet (executes)
│Frontend│ │Backend│
└───────┘ └───────┘
    │         │
    └────┬────┘
         │
┌────────▼────────┐
│    REVIEWER      │  ← Opus (validates)
└─────────────────┘
```

---

# ═══════════════════════════════════════════════════════════
# SECTION 10: CONTEXT WINDOW MANAGEMENT (CRITICAL)
# ═══════════════════════════════════════════════════════════

## Hard Facts

| Fact | Value |
|------|-------|
| Context window | 200K tokens (hard cap in Claude Code) |
| Underlying model capacity | Up to 1M tokens via API |
| Everything counts | Prompts + responses + file reads + tool outputs |
| Auto-compaction | Triggers when nearing limit |

## The Context Budget Framework

Think of 200K tokens as a budget:

```
┌──────────────────────────────────────────────────┐
│                 200K TOKEN BUDGET                  │
│                                                    │
│  System + CLAUDE.md        ≈ 2-5K   (free-ish)   │
│  Your prompts              ≈ 1-5K per turn        │
│  Claude's responses        ≈ 2-10K per turn       │
│  File reads                ≈ varies (can be HUGE) │
│  Command outputs           ≈ varies               │
│                                                    │
│  ⚠️ DANGER ZONE: After 80% → performance drops   │
│  ✅ SWEET SPOT: /compact at 60%                   │
└──────────────────────────────────────────────────┘
```

## Rules for EAL (806 files / 8.89MB)

1. **NEVER** read `globals.css` (135KB = ~30K tokens = 15% of context!)
2. **NEVER** read root `page.tsx` (51KB = ~12K tokens)
3. **NEVER** read `package-lock.json` (496KB = would FILL entire context)
4. Use `.claudeignore` to block `node_modules`, `.next`, build outputs
5. `/compact` at 60% — don't wait for auto-compaction
6. `/clear` between tasks — always
7. One zone per session — never cross zones

## The Performance Degradation Curve

```
Quality ───────────────────────────╮
  100% │████████████████████████   │
   90% │                       █   │
   80% │                        █  │
   70% │                         █ │
   50% │                          █│ ← Context Cliff
   30% │                           █
   10% │                            █
       └───────────────────────────────
        0%    40%    60%   80%  100%
              Context Usage →
```

**The cliff is real.** After ~80% context, Claude starts:
- Forgetting earlier instructions
- Repeating itself
- Making inconsistent edits
- Hallucinating file contents

---

# ═══════════════════════════════════════════════════════════
# SECTION 11: TOKEN EFFICIENCY — ADVANCED STRATEGIES
# ═══════════════════════════════════════════════════════════

## Strategy 1: .claudeignore (50-70% savings)
Already covered in Section 5. Create it NOW.

## Strategy 2: Zone-Based Sessions
- One zone per `/clear` cycle
- Never mix frontend + backend + styling in one session
- Commit after each zone

## Strategy 3: Precise Prompts (saves 2-5x tokens)

**BAD (wastes tokens):**
> "Look at the project and tell me what's wrong with the assessment page"

**GOOD (targeted):**
> "Read src/app/assessment/page.tsx lines 1-50. The form submission handler on line 35 is not validating input. Add zod schema validation."

## Strategy 4: Batch Your Instructions

**BAD (multiple turns = token compound):**
```
Turn 1: "Add a loading state"
Turn 2: "Also add error handling"
Turn 3: "And make it responsive"
```

**GOOD (one complete turn):**
```
In src/app/assessment/page.tsx:
1. Add a loading state with spinner
2. Add error handling with try/catch and user-friendly error message
3. Make the layout responsive (320px min viewport)
Only read this file. Do NOT scan other files.
```

## Strategy 5: Verification-First

Always give Claude a way to verify:
```
After making changes:
1. Run `npm run lint` to check for errors
2. Run `npm run build` to verify compilation
Report any errors found.
```

## Strategy 6: Use opusplan for Complex Tasks

Instead of manually switching between Opus and Sonnet:
```
/model opusplan
```
Claude automatically uses Opus to plan, Sonnet to implement.

---

# ═══════════════════════════════════════════════════════════
# SECTION 12: EAL-SPECIFIC SETUP FOR CLAUDE CODE
# ═══════════════════════════════════════════════════════════

## Step-by-Step First Session

```bash
# 1. Navigate to project
cd "c:\Users\pc\Desktop\EGY\New folder (20)\egyptian-awareness-library"

# 2. Start Claude Code
claude

# 3. CLAUDE.md loads automatically (already created!)

# 4. Create .claudeignore (see Section 5 content)

# 5. Set model
/model sonnet    # For most work
/model opusplan  # For complex features

# 6. Start working with bootstrap prompt (from handoff doc)
```

## The Bootstrap Prompt (Copy-Paste):
```
I'm working on the Egyptian Awareness Library (EAL) — a Next.js 15 platform
with 102 route directories and 806 source files.

CLAUDE.md has already loaded with project rules.

Key context docs (read ONLY when relevant):
- HANDOFF_AND_STRATEGY.md (bugs, strategy, priorities)
- COMPLETE_CLAUDE_CODE_HANDOFF.md (full project context)

Today I'm working on: [ZONE X — describe task]
Only read files relevant to this zone. Do NOT scan the full codebase.
```

## Files to Create in Claude Code:

| File | Purpose |
|------|---------|
| `.claudeignore` | Block 50-70% of token waste |
| `.claude/commands/preflight.md` | Pre-commit checks |
| `.claude/commands/zone-report.md` | Context usage report |
| `.claude/skills/build-page/SKILL.md` | Page building template |
| `.claude/skills/add-chatbot/SKILL.md` | AI chatbot integration |

---

# ═══════════════════════════════════════════════════════════
# SECTION 13: ANTI-PATTERNS — WHAT KILLS YOUR MAX PLAN
# ═══════════════════════════════════════════════════════════

| ❌ Mistake | 💰 Cost | ✅ Fix |
|-----------|---------|-------|
| No `.claudeignore` | 50-70% more tokens wasted | Create it immediately |
| Reading large files fully | 12-30K tokens each | Always use line ranges |
| CLAUDE.md > 200 lines | Claude ignores excess | Keep concise, use .claude/rules/ |
| Chatty back-and-forth | Tokens compound per turn | Batch instructions in one prompt |
| Not using `/compact` | Context cliff at 80% | `/compact` at 60% |
| Not using `/clear` | Context bleeding | `/clear` between tasks |
| Always using Opus | 15x more expensive than Haiku | Use Sonnet default, Opus only when needed |
| Pasting entire files in prompt | Doubles token usage | Let Claude read files itself |
| No verification step | Iterates blindly | Always provide test/build command |
| `ANTHROPIC_API_KEY` set | Uses API credits not subscription | Remove from env |
| Ignoring `/context` | No visibility into usage | Check regularly |

---

# ═══════════════════════════════════════════════════════════
# SECTION 14: POWER USER WORKFLOWS
# ═══════════════════════════════════════════════════════════

## Workflow 1: The Daily Session
```
1. claude                          ← Start
2. CLAUDE.md loads automatically   ← Free context
3. /model sonnet                   ← Default model
4. State task + zone               ← Focused work
5. Work...
6. /context                        ← Check usage
7. /compact keep [key patterns]    ← At 60%
8. Continue work...
9. git commit                      ← Save progress
10. /clear                         ← Clean for next task
```

## Workflow 2: Complex Architecture
```
1. /model opusplan                 ← Opus plans, Sonnet implements
2. Describe the full feature       ← Opus creates plan
3. Review plan                     ← You approve
4. Claude implements with Sonnet   ← Efficient execution
5. /compact                        ← If long session
6. Verify with build/test          ← Quality check
```

## Workflow 3: Parallel Multi-Agent
```
Terminal 1: claude --worktree frontend
Terminal 2: claude --worktree backend
Terminal 3: claude --worktree styling

Each agent works independently:
- Frontend: Fix "VERY BAD" pages
- Backend: Fix api-swarm.ts bugs
- Styling: Update globals.css sections

Merge when all done.
```

## Workflow 4: The Recovery
```
Claude going off-track?
1. /rewind                         ← Undo last changes
2. /clear                          ← Fresh start
3. Save state to scratch file      ← Preserve progress
4. Re-state task with more detail  ← Better instructions
```

---

# ═══════════════════════════════════════════════════════════
# SECTION 15: QUICK REFERENCE CARD
# ═══════════════════════════════════════════════════════════

```
╔════════════════════════════════════════════════════════════╗
║              CLAUDE CODE MAX 5x — QUICK REFERENCE          ║
╠════════════════════════════════════════════════════════════╣
║                                                            ║
║  ┌─ MODELS ──────────────────────────────────────┐         ║
║  │ /model haiku     → simple edits (cheapest)    │         ║
║  │ /model sonnet    → features, fixes (DEFAULT)  │         ║
║  │ /model opus      → architecture, debug        │         ║
║  │ /model opusplan  → Opus plans + Sonnet builds │         ║
║  └───────────────────────────────────────────────┘         ║
║                                                            ║
║  ┌─ ESSENTIAL COMMANDS ──────────────────────────┐         ║
║  │ /clear    → reset context (between tasks)     │         ║
║  │ /compact  → compress history (at 60%)         │         ║
║  │ /context  → check token usage                 │         ║
║  │ /rewind   → undo last changes                 │         ║
║  │ /plan     → plan before executing             │         ║
║  │ /diff     → see what changed                  │         ║
║  │ /init     → create CLAUDE.md                  │         ║
║  └───────────────────────────────────────────────┘         ║
║                                                            ║
║  ┌─ TOKEN SAVERS ────────────────────────────────┐         ║
║  │ • .claudeignore = block 50-70% waste          │         ║
║  │ • CLAUDE.md = free persistent context         │         ║
║  │ • /compact at 60% = prevent cliff             │         ║
║  │ • /clear between tasks = clean reasoning      │         ║
║  │ • Batch instructions = fewer turns            │         ║
║  │ • Line ranges for big files                   │         ║
║  └───────────────────────────────────────────────┘         ║
║                                                            ║
║  ┌─ PERMISSION MODES (Shift+Tab) ────────────────┐        ║
║  │ Default    → asks before risky actions         │        ║
║  │ Auto-accept → approves everything              │        ║
║  │ Plan Mode  → read-only, plans only             │        ║
║  └───────────────────────────────────────────────┘         ║
║                                                            ║
║  ┌─ ADVANCED POWER ─────────────────────────────┐          ║
║  │ • .claude/skills/ = reusable workflows        │         ║
║  │ • .claude/commands/ = custom slash commands   │         ║
║  │ • .claude/hooks/ = auto quality checks        │         ║
║  │ • Git worktrees = parallel agents             │         ║
║  │ • claude -p = headless mode (CI/CD)           │         ║
║  │ • /agents = subagent management               │         ║
║  └───────────────────────────────────────────────┘         ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝
```

---

**END — You now have EVERYTHING about Claude Code's full power.**
