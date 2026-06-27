# 🔥 CLAUDE CODE — FULL POWER USER GUIDE (MAX 5x PLAN)
## V2: With Skills Deep Dive, Reddit Wisdom, 12 Things You Missed, Repositories, CLI Flags

> **Created:** 2026-06-20 | **Plan:** Max 5x ($100/mo, 5x Pro usage)
> **Sources:** Anthropic docs, Reddit r/ClaudeAI, Medium, GitHub repos, dev.to, claudefa.st, ETH Zurich study

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

> **⚠️ API KEY CONFLICT:** If you have `ANTHROPIC_API_KEY` set in your environment, Claude Code may use your API credits instead of your subscription. **Remove it** to use your Max plan.

---

# ═══════════════════════════════════════════════════════════
# SECTION 2: ALL SLASH COMMANDS — COMPLETE LIST
# ═══════════════════════════════════════════════════════════

Type `/` in terminal to see all. Here's the full reference:

## Context & Session Management

| Command | What It Does | When to Use |
|---------|-------------|-------------|
| `/clear` | Hard reset — wipes conversation | Switching to a new task |
| `/compact` | Compresses history into summary | Context at ~60% |
| `/compact keep the API patterns` | Targeted compression | Preserve specific context |
| `/context` | Shows token usage breakdown | Before complex operations |
| `/rewind` | Rolls back conversation + file changes | Agent went wrong direction |
| `/cost` | Shows session cost | Monitor spending |
| `/usage` | Shows token consumption details | Identify what burns tokens |

## Model Control

| Command | What It Does | When to Use |
|---------|-------------|-------------|
| `/model sonnet` | Switch to Sonnet | Default work (80-90%) |
| `/model opus` | Switch to Opus | Architecture, deep debug |
| `/model haiku` | Switch to Haiku | Simple edits, formatting |
| `/model opusplan` | **Opus plans, Sonnet executes** | Complex features (BEST VALUE) |
| Arrow keys in picker | Adjust effort level | Fine-tune performance |

## Planning & Workflow

| Command | What It Does | When to Use |
|---------|-------------|-------------|
| `/plan` | Plan mode — outline before executing | Large/complex changes |
| `/diff` | Shows interactive view of changes | Review what was modified |
| `/init` | Generates starter CLAUDE.md | First-time project setup |
| `/memory` | View/edit CLAUDE.md | Update project rules |

## Configuration & Tools

| Command | What It Does | When to Use |
|---------|-------------|-------------|
| `/config` | Opens settings | Change preferences |
| `/help` | Lists all commands | When unsure |
| `/mcp` | Manage MCP server connections | Tool integrations |
| `/agents` | Manage subagents | Multi-agent workflows |
| `/exit` | Exit Claude Code | Done working |

## Permission Modes (Shift+Tab to cycle)

| Mode | Behavior |
|------|----------|
| **Default** | Normal — asks before risky actions |
| **Auto-accept** | Approves ~93% of common tasks automatically |
| **Plan Mode** | Read-only — plans but won't edit files |

---

# ═══════════════════════════════════════════════════════════
# SECTION 3: CLI FLAGS — COMPLETE REFERENCE
# ═══════════════════════════════════════════════════════════

| Flag | What It Does |
|------|-------------|
| `-p "task"` / `--prompt` | Pass initial prompt on startup |
| `--print` | One-shot mode — output to terminal and exit |
| `--worktree <name>` | Run in isolated Git worktree |
| `--permission-mode <mode>` | Set permissions: `auto`, `manual`, `bypassPermissions` |
| `--dangerously-skip-permissions` | Bypass ALL confirmations (no `-y` shortcut exists!) |
| `--json-schema <schema>` | Force output to match JSON schema (for pipelines) |
| `--dry-run` | Preview actions without executing |
| `--append-system-prompt` | Add custom instructions without overwriting base |
| `--resume <session-id>` | Resume a previously saved session |
| `--fork-session` | Fork from master context for parallel work |

> **⚠️ IMPORTANT:** There is NO `--yes` or `-y` flag. Anthropic intentionally omitted it for safety. Use `--dangerously-skip-permissions` (full name required).

> **⚠️ ROOT BLOCK:** Claude Code refuses `--dangerously-skip-permissions` if running as root.

---

# ═══════════════════════════════════════════════════════════
# SECTION 4: MODEL SELECTION — THE DEFINITIVE GUIDE
# ═══════════════════════════════════════════════════════════

## The Four Model Options

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

### 🟢 HAIKU — The Speed Demon
`/model haiku`
- ✅ Comments, docstrings, renames, formatting, commit messages, boilerplate, quick fixes
- ❌ Multi-file changes, complex logic, architecture, debugging, API work

### 🔵 SONNET — The Workhorse (DEFAULT 80-90%)
`/model sonnet`
- ✅ New pages, features, bug fixes, code review, refactoring, API integration
- ❌ Multi-system architecture, tasks that failed twice, writing master plans

### 🟣 OPUS — The Architect
`/model opus`
- ✅ Multi-file architecture, complex debugging, system pipelines, security review
- ❌ Simple edits, routine features, boilerplate, file searching, CSS

### 🟠 OPUSPLAN — The Smart Hybrid (HIGHEST VALUE)
`/model opusplan`
- **Phase 1:** Opus creates the plan (deepest reasoning)
- **Phase 2:** Sonnet implements it (fast, efficient)
- **Best for:** Any complex task needing both planning AND execution

### The Escalation Ladder
```
START → Sonnet (default)
├── Simple edit? → Drop to Haiku
├── Task succeeds? → Done ✅
└── Task fails/complex?
    ├── Simple mistake? → Retry Sonnet
    └── Genuinely complex? → Escalate to Opus/opusplan
        └── Architecture solved → Drop back to Sonnet
```

---

# ═══════════════════════════════════════════════════════════
# SECTION 5: SKILLS — THE COMPLETE DEEP DIVE
# ═══════════════════════════════════════════════════════════

## What Are Skills?
Skills are **reusable workflow templates** stored in `.claude/skills/`. They teach Claude specific repeatable tasks. Claude loads them ONLY when needed — saving context tokens.

## Skill Anatomy

```
.claude/skills/
├── build-page/
│   └── SKILL.md          ← Main instructions
│   └── references/       ← Optional: extra docs
│   └── examples/         ← Optional: example files
├── fix-api/
│   └── SKILL.md
└── add-chatbot/
    └── SKILL.md
```

### SKILL.md Format
```markdown
---
name: my-skill-name          # becomes /my-skill-name command
description: Max 200 chars describing when to trigger this skill
---

# Skill Instructions

Step-by-step instructions here...
```

## The Two Critical Fields
1. **`name`** → Becomes the slash command (e.g., `build-page` → `/build-page`)
2. **`description`** → Claude uses this to AUTO-DECIDE when to invoke the skill. Make it specific!

## Skill Design Best Practices

| Rule | Why |
|------|-----|
| **One skill = one task** | Broad skills confuse the model |
| **< 200 chars description** | Longer descriptions waste tokens |
| **Progressive disclosure** | Put details in `references/` subfolders, not SKILL.md |
| **Use the skill creator** | Ask Claude: "Help me create a skill for [task]" |
| **Test the trigger** | After creating, test various prompts to ensure it fires correctly |

## Rules vs Skills
| Type | File Pattern | Purpose |
|------|-------------|---------|
| **Rules** | `<topic>.rules.md` | General conventions (coding standards, style) |
| **Skills** | `<topic>/SKILL.md` | Specific executable tasks |

## 7 EAL-Specific Skills to Create

### Skill 1: `build-page`
```markdown
---
name: build-page
description: Build a new EAL page with AI chatbot and Arabic RTL support
---

# Build EAL Page

1. Create `src/app/[page-name]/page.tsx`
2. Add `"use client"` directive
3. Import AI chat from `src/lib/ai/providers.ts`
4. Add unique multi-layered system prompt for this page's domain
5. Include Arabic RTL support via className toggle
6. Add real scenarios with live data (NO mock data ever)
7. Add page to explore/navigation at `src/app/explore/`
8. Ensure mobile responsive (320px min viewport)
9. Add loading states and error boundaries
10. Run `npm run lint` to verify
```

### Skill 2: `fix-api-route`
```markdown
---
name: fix-api-route
description: Debug and fix an API route in src/app/api/
---

# Fix API Route

1. Read the failing route file
2. Check for: missing try/catch, hardcoded values, missing AbortController
3. Verify environment variables are checked before use
4. Add proper error responses with status codes
5. Test with `curl` or browser dev tools
6. Run `npm run build` to verify compilation
```

### Skill 3: `add-chatbot`
```markdown
---
name: add-chatbot
description: Add AI chatbot with unique system prompt to an EAL page
---

# Add AI Chatbot

1. Import chat UI component
2. Create domain-specific system prompt (multi-layered)
3. Connect to Gemini via `src/lib/ai/providers.ts`
4. Add floating chat button (bottom-right)
5. Include conversation history in localStorage
6. Add Arabic/English toggle
```

### Skill 4: `zone-work`
```markdown
---
name: zone-work
description: Start focused zone-based work on EAL to save tokens
---

# Zone-Based Work Protocol

Before starting:
1. Identify zone: A (single page), B (feature), C (system), D (design), E (cross-cutting)
2. List ONLY the files in this zone
3. Do NOT read files outside the zone
4. Do NOT read globals.css fully (use line ranges)
5. Do NOT read root page.tsx fully
6. Run /context periodically
7. Run /compact at 60% usage
8. Commit when zone is done
9. /clear before next zone
```

### Skill 5: `preflight-check`
```markdown
---
name: preflight-check
description: Run pre-commit quality checks on EAL
---

# Preflight Checks

1. `npm run lint` — ESLint
2. `npm run build` — TypeScript + compilation
3. Check for hardcoded API keys in source
4. Check for `console.log` in production code
5. Verify no mock/placeholder data
6. Report results as checklist
```

### Skill 6: `fix-known-bugs`
```markdown
---
name: fix-known-bugs
description: Fix known bugs documented in HANDOFF_AND_STRATEGY.md
---

# Fix Known Bugs

Read HANDOFF_AND_STRATEGY.md Section 2 for proposed fixes.

Bug 1: src/lib/debunking/workers/api-swarm.ts
- Replace hardcoded credibilityScores with API response extraction
- Add AbortController to withTimeout

Bug 2: src/lib/debunking/classifier.ts
- Add try/catch wrapper
- Fallback to "State Stability & Economic Rumors"
```

### Skill 7: `revamp-page`
```markdown
---
name: revamp-page
description: Revamp a page flagged as VERY BAD with new UI/UX/logic
---

# Page Revamp Protocol

1. Read current page.tsx (use line ranges if > 20KB)
2. Identify: broken logic, missing data, bad UX patterns
3. Research what the page SHOULD do (check HANDOFF_AND_STRATEGY.md)
4. Rewrite with:
   - Real functional logic (NO mocks)
   - Proper loading/error states
   - Mobile responsive layout
   - AI chatbot integration
   - Arabic RTL support
5. Run build + lint to verify
```

---

# ═══════════════════════════════════════════════════════════
# SECTION 6: THE 12 THINGS YOU MISSED
# ═══════════════════════════════════════════════════════════

## 1. 🖼️ Multimodal in CLI
**Claude Code supports VISION.** You can drag-and-drop images or paste image paths into the terminal. Use this to:
- Show Claude a screenshot of a broken UI
- Paste an error screenshot instead of typing it
- Show architectural diagrams for reference

## 2. 📁 Modular CLAUDE.md Files
You can have **multiple CLAUDE.md files in subfolders**. Each one provides scoped context:
```
src/lib/debunking/CLAUDE.md    ← Rules specific to debunking module
src/app/api/CLAUDE.md          ← Rules specific to API routes
src/components/CLAUDE.md       ← Component conventions
```
Claude reads the nearest CLAUDE.md to the files it's working on.

## 3. ⚡ Inline Bash with `!`
Prefix any command with `!` to run it immediately:
```
!npm test
!npm run lint
!git status
```
The output feeds directly into Claude's context for self-correction.

## 4. 🔄 `--fork-session` for A/B Testing
Fork your current session to test two approaches:
- Fork A: Try approach with Sonnet
- Fork B: Try approach with Opus
- Compare results, keep the winner

## 5. 🛡️ Auto Mode (93% Approval Rate)
Since March 2026, "auto" mode approves ~93% of common tasks without asking. Set in `settings.json`:
```json
{ "permissions": { "mode": "auto" } }
```

## 6. 📊 `ccusage` — Token Tracking Tool
**Install:** `npx ccusage`
- Parses your local session JSONL files
- Shows breakdown by model (Opus/Sonnet/Haiku)
- Tracks cache hits
- Estimates USD spend
- Has a Raycast extension for menu-bar alerts
- **GitHub:** github.com/ryoppippi/ccusage

## 7. 🎯 Filter Command Output
Don't paste full test logs. Filter them:
```bash
npm test 2>&1 | grep -A 5 "FAIL"    # Only show failures
npm run build 2>&1 | tail -20         # Only show last 20 lines
```
This saves THOUSANDS of tokens per command.

## 8. 🔌 Disable Unused MCP Servers
Connected MCP servers load into context even if unused. Disable ones you don't need:
```
/mcp                           # See connected servers
# Disconnect unused ones to save context
```

## 9. 🧹 The "Fail Loud, Never Fake" Rule
Add this to CLAUDE.md to prevent the #1 Reddit complaint:
```
CRITICAL RULE: Never use mock data, placeholder values, or swallow errors
with empty try/catch blocks. If something fails, surface the error clearly.
Never fake success.
```

## 10. 🔀 Git Bisect Delegation
Claude can perform `git bisect` for you:
```
Find the commit that broke the build. Use git bisect with `npm run build` as the test.
```

## 11. 📝 Edit Previous Prompt Instead of Replying
**Reddit pro tip:** Instead of sending "actually, make it shorter" (which reprocesses entire history), **edit your original prompt**. This saves the compounding token cost of correction chains.

## 12. 🎨 Custom Status Line
Advanced users add to their terminal status line:
- Current model version
- Branch name
- Token usage %
- Uncommitted file count
This gives instant visibility into session health.

---

# ═══════════════════════════════════════════════════════════
# SECTION 7: WHAT NOT TO DO — REDDIT HORROR STORIES
# ═══════════════════════════════════════════════════════════

## The 15 Deadly Sins of Claude Code

### 🚫 Sin 1: "Build me an app" in one prompt
**What happens:** Claude creates a sprawling, unmanageable mess
**Fix:** Break into atomic steps. "Step 1: Create the interface. Step 2: Add logic."

### 🚫 Sin 2: The Silent Fake Success
**What happens:** Claude "fixes" a bug with a `try/catch` that swallows errors, or returns mock data
**Fix:** Add "Fail Loud, Never Fake" rule to CLAUDE.md

### 🚫 Sin 3: Using Claude as a linter
**What happens:** Tokens wasted on formatting issues ESLint catches instantly
**Fix:** Use ESLint/Prettier in CI/CD hooks. Don't ask Claude to find syntax issues.

### 🚫 Sin 4: CLAUDE.md bloat (>200 lines)
**What happens:** ETH Zurich study showed bloated context files REDUCE task success by 3% while increasing costs by 20%
**Fix:** Keep CLAUDE.md under 200 lines. Use .claude/rules/ for extra rules.

### 🚫 Sin 5: Never running /compact
**What happens:** Context cliff at 80% — Claude starts hallucinating, forgetting, repeating
**Fix:** `/compact` at 60%. Every time. No exceptions.

### 🚫 Sin 6: Always using Opus
**What happens:** ~2x cost of Sonnet for tasks that don't need deep reasoning
**Fix:** Sonnet default. Opus only for architecture/failed debugging.

### 🚫 Sin 7: Pasting entire files in prompt
**What happens:** Doubles token usage — Claude reads the file PLUS your pasted copy
**Fix:** Let Claude read files itself with targeted line ranges

### 🚫 Sin 8: Correction chains
**What happens:** "Actually, make it shorter" → "No, even shorter" → compounds tokens
**Fix:** Edit original prompt OR give complete instructions upfront

### 🚫 Sin 9: Long-running single session
**What happens:** Performance degrades, context fills, "forgetfulness" starts
**Fix:** One task per session. /clear between tasks. Commit after each.

### 🚫 Sin 10: No .claudeignore
**What happens:** Claude indexes node_modules (2.5GB!), .next, build outputs
**Fix:** Create .claudeignore immediately (50-70% token savings)

### 🚫 Sin 11: No verification step
**What happens:** Claude says "done!" but code doesn't compile or tests fail
**Fix:** Always include: "After making changes, run `npm run build` and report errors"

### 🚫 Sin 12: "Explain the whole codebase"
**What happens:** 50K+ tokens burned on a single reconnaissance pass
**Fix:** Use CLAUDE.md for architecture. Ask about specific files only.

### 🚫 Sin 13: Allowing multi-file simultaneous edits
**What happens:** Conflicts, compiler errors, inconsistent state
**Fix:** Explicitly scope: "Only work in this folder. Don't touch other files."

### 🚫 Sin 14: Generic CLAUDE.md rules
**What happens:** "Write clean code" and "follow best practices" add noise without changing behavior
**Fix:** Only add project-SPECIFIC rules Claude can't infer from code

### 🚫 Sin 15: Ignoring idle MCP servers
**What happens:** Connected MCP servers consume context tokens even when unused
**Fix:** `/mcp` → disconnect servers not needed for current task

---

# ═══════════════════════════════════════════════════════════
# SECTION 8: GITHUB REPOSITORIES & TOOLS
# ═══════════════════════════════════════════════════════════

## Must-Have Repositories

| Repository | What It Is | URL |
|------------|-----------|-----|
| **awesome-claude-code** | Canonical curated list: skills, hooks, commands, agents | `github.com/hesreallyhim/awesome-claude-code` |
| **everything-claude-code** | Aggregator firehose for ALL community contributions | `github.com/affaan-m/everything-claude-code` |
| **awesome-mcp-servers** | Primary directory for MCP server integrations | `github.com/punkpeye/awesome-mcp-servers` |
| **awesome-claude-plugins** | Plugin adoption metrics across GitHub | `github.com/quemsah/awesome-claude-plugins` |
| **ccusage** | Token tracking CLI (model breakdown, cost estimates) | `github.com/ryoppippi/ccusage` |

## Essential Developer Tools

| Tool | What It Does |
|------|-------------|
| **ast-grep** | Structural code search/refactoring (better than grep for code) |
| **difftastic** | Advanced semantic diffing (understands code structure) |
| **claude-hud** | Status-line HUD for tracking agent health + context |
| **fullstack-dev-skills** | Pre-built skills for languages, infra, and project management |

## Recommended MCP Servers for Next.js

| MCP Server | What It Does | How to Add |
|------------|-------------|-----------|
| **GitHub MCP** | Manage issues, PRs, branches | `claude mcp add github -- npx -y @modelcontextprotocol/server-github` |
| **Next.js DevTools** | Runtime errors, server logs, page metadata | `claude mcp add nextjs -- npx -y @next/mcp` |
| **Playwright** | Browser testing, UI inspection | `claude mcp add playwright -- npx -y @anthropic/mcp-playwright` |
| **Context7** | Up-to-date API docs for React/Next.js | `claude mcp add context7 -- npx -y context7-mcp` |
| **Firecrawl** | Web scraping for real-time data | `claude mcp add firecrawl -- npx -y firecrawl-mcp` |

---

# ═══════════════════════════════════════════════════════════
# SECTION 9: CONTEXT WINDOW — THE SCIENCE
# ═══════════════════════════════════════════════════════════

## Hard Facts

| Fact | Value |
|------|-------|
| Context window | 200K tokens (hard cap in Claude Code) |
| Underlying model | Up to 1M tokens via API |
| Everything counts | Prompts + responses + file reads + tool outputs + MCP |
| Auto-compaction | Triggers when nearing limit |

## The Performance Degradation Curve

```
Quality ──────────────────────────╮
  100% │████████████████████████   │
   90% │                       █   │
   80% │                        █  │
   70% │                         █ │
   50% │                          █│ ← CONTEXT CLIFF
   30% │                           █
   10% │                            █
       └───────────────────────────────
        0%    40%    60%   80%  100%
              Context Usage →
```

## The 60% Rule
- At 60%: Run `/compact` proactively
- At 80%: Performance drops sharply (hallucinations, forgetting)
- At 100%: Auto-compaction kicks in but quality is already degraded

## Token Budget for EAL Sessions

```
┌──────────────────────────────────────────────────┐
│                 200K TOKEN BUDGET                  │
│                                                    │
│  System + CLAUDE.md          ≈ 2-5K   (free-ish)  │
│  Your prompts                ≈ 1-5K per turn       │
│  Claude's responses          ≈ 2-10K per turn      │
│  File reads                  ≈ varies (HUGE risk)  │
│  Command outputs             ≈ varies              │
│  MCP server context          ≈ varies              │
│                                                    │
│  ⚠️ globals.css = 135KB ≈ 30K tokens = 15%!!     │
│  ⚠️ page.tsx = 51KB ≈ 12K tokens = 6%            │
│  ⚠️ package-lock.json = 496KB = FILLS ENTIRE CTX │
└──────────────────────────────────────────────────┘
```

---

# ═══════════════════════════════════════════════════════════
# SECTION 10: ADVANCED WORKFLOWS
# ═══════════════════════════════════════════════════════════

## Workflow 1: The Initialization Ritual
```
1. claude                          ← Start
2. /init                           ← Walk the workspace (if no CLAUDE.md)
3. CLAUDE.md loads automatically   ← Free context
4. /model sonnet                   ← Default model
5. State task + zone               ← Focused work
```

## Workflow 2: The Daily Session
```
1. State task + zone
2. Work focused...
3. /context                        ← Check usage at ~50%
4. /compact keep [key patterns]    ← At 60%
5. Continue work...
6. git add + commit                ← Save progress
7. /clear                          ← Clean for next task
```

## Workflow 3: Complex Feature (opusplan)
```
1. /model opusplan
2. Describe the full feature
3. Opus creates plan → Review it
4. Approve → Sonnet implements
5. /compact if long session
6. npm run build → verify
```

## Workflow 4: Parallel Multi-Agent
```
Terminal 1: claude --worktree frontend
Terminal 2: claude --worktree backend
Terminal 3: claude --worktree styling

Each agent works independently, merge when done.
```

## Workflow 5: The A/B Test
```
1. Get to a stable checkpoint
2. Fork session A: Try approach 1
3. Fork session B: Try approach 2
4. Compare results, keep winner
```

## Workflow 6: The Recovery
```
Claude going off-track?
1. /rewind or Esc+Esc             ← Undo last changes
2. /clear                          ← Fresh start
3. Save state to scratch file      ← Preserve progress
4. Re-state task more precisely    ← Better instructions
```

## Workflow 7: The Adversarial Review
```
1. Agent 1 (Sonnet) implements feature
2. Agent 2 (Opus) reviews the implementation
3. Agent 1 fixes issues found by Agent 2
4. Final verification with build + tests
```

---

# ═══════════════════════════════════════════════════════════
# SECTION 11: .claudeignore FOR EAL (READY TO USE)
# ═══════════════════════════════════════════════════════════

Already created at project root. Content:

```gitignore
# Build outputs
.next/
out/
build/

# Dependencies (2.5GB!)
node_modules/

# Package lock (496KB — fills entire context window)
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

# Build/dev logs
build-output.txt
build_log.txt
dev_server.log
start-*.log

# IDE / deploy
.vscode/
.vercel/
.runtime/

# Git internals
.git/

# Scratch
scratch/

# Temp
tmp-*.tsx
```

---

# ═══════════════════════════════════════════════════════════
# SECTION 12: HOOKS — AUTO-QUALITY CHECKS
# ═══════════════════════════════════════════════════════════

Hooks run custom commands at lifecycle points. Create in `.claude/hooks/`.

## Lifecycle Events
| Event | When |
|-------|------|
| `SessionStart` | Session begins |
| `UserPromptSubmit` | You submit a prompt |
| `PreToolUse` | Before Claude runs a tool |
| `PostToolUse` | After Claude runs a tool |

## Example: Auto-lint after edits
```json
{
  "event": "PostToolUse",
  "tools": ["write_file", "edit_file"],
  "command": "npx eslint --fix ${file}"
}
```

## Example: Block dangerous commands
```json
{
  "event": "PreToolUse",
  "tools": ["run_command"],
  "command": "echo 'Blocked' && exit 1",
  "match": "rm -rf|drop table|format"
}
```

---

# ═══════════════════════════════════════════════════════════
# SECTION 13: CLAUDE.md BEST PRACTICES (DEEP DIVE)
# ═══════════════════════════════════════════════════════════

## The ETH Zurich Finding
> Poorly written context files REDUCE task success rates by 3% while INCREASING costs by 20%.

## The Golden Rules

| Rule | Details |
|------|---------|
| **< 200 lines** | Beyond this, Claude starts ignoring instructions |
| **Project-specific only** | Don't add "write clean code" — Claude already knows |
| **Architecture + constraints** | What's unique about YOUR project |
| **Update iteratively** | If Claude makes a mistake twice → add a rule |
| **Delete stale rules** | Remove what no longer applies |
| **No duplicated README** | Don't repeat what's in README.md |

## Structure Pattern
```
CLAUDE.md (root)              ← Master rules (<200 lines)
├── src/lib/CLAUDE.md         ← Library-specific rules
├── src/app/api/CLAUDE.md     ← API-specific rules
├── src/components/CLAUDE.md  ← Component conventions
└── .claude/
    ├── rules/                ← Extra rules files
    ├── skills/               ← Reusable skills
    ├── commands/             ← Custom slash commands
    └── hooks/                ← Automation hooks
```

## What MUST Be in CLAUDE.md
1. Stack + framework version
2. File size warnings (what NOT to read fully)
3. Known bugs
4. "Fail Loud, Never Fake" rule
5. Build/lint/test commands
6. Architecture overview (brief)

## What Must NOT Be in CLAUDE.md
1. "Write clean code" / "follow best practices"
2. Standard language syntax
3. Long API documentation
4. Anything already in README.md
5. Generic coding standards

---

# ═══════════════════════════════════════════════════════════
# SECTION 14: EAL-SPECIFIC BOOTSTRAP
# ═══════════════════════════════════════════════════════════

## First Session Checklist
```
1. cd "c:\Users\pc\Desktop\EGY\New folder (20)\egyptian-awareness-library"
2. claude
3. CLAUDE.md + .claudeignore load automatically ✅
4. /model opusplan (or sonnet for simple tasks)
5. Paste bootstrap prompt below ↓
```

## Bootstrap Prompt (Copy-Paste):
```
I'm working on the Egyptian Awareness Library (EAL) — a Next.js 15 platform
with 102 route directories and 806 source files.

CLAUDE.md has loaded with project rules.

Key docs (read ONLY when relevant):
- HANDOFF_AND_STRATEGY.md (bugs, strategy, priorities)
- COMPLETE_CLAUDE_CODE_HANDOFF.md (full project context)
- Read "HI CLAUDE/" folder for skills, strategies, everything

Today I'm working on: [ZONE X — describe task]
Only read files relevant to this zone. Do NOT scan the full codebase.
Do NOT read globals.css or root page.tsx fully.
After changes, run `npm run build` to verify.
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
║  MODELS:                                                   ║
║  /model haiku     → simple edits (cheapest)                ║
║  /model sonnet    → features, fixes (DEFAULT 80-90%)       ║
║  /model opus      → architecture, debug                    ║
║  /model opusplan  → Opus plans + Sonnet builds (BEST)      ║
║                                                            ║
║  ESSENTIAL COMMANDS:                                       ║
║  /clear    → reset (between tasks)                         ║
║  /compact  → compress (at 60%)                             ║
║  /context  → check tokens                                  ║
║  /rewind   → undo changes                                  ║
║  /plan     → plan before executing                         ║
║  /diff     → see what changed                              ║
║  /init     → create CLAUDE.md                              ║
║  /mcp      → manage MCP servers                            ║
║  !command  → run bash inline                               ║
║                                                            ║
║  TOKEN SAVERS:                                             ║
║  • .claudeignore = 50-70% savings                          ║
║  • CLAUDE.md = free persistent context                     ║
║  • /compact at 60% = prevent cliff                         ║
║  • /clear between tasks                                    ║
║  • Filter command output (grep, tail)                      ║
║  • Edit original prompt, don't reply                       ║
║  • Disable unused MCP servers                              ║
║                                                            ║
║  NEVER DO:                                                 ║
║  ✗ Read globals.css fully (135KB = 30K tokens)             ║
║  ✗ Read package-lock.json (fills entire context)           ║
║  ✗ "Build me an app" in one prompt                         ║
║  ✗ Use Claude as a linter                                  ║
║  ✗ Default to Opus for everything                          ║
║  ✗ Skip verification step                                  ║
║  ✗ Leave MCP servers connected when unused                 ║
║                                                            ║
║  PERMISSION MODES (Shift+Tab):                             ║
║  Default → Auto-accept → Plan Mode                         ║
║                                                            ║
║  CLI FLAGS:                                                ║
║  -p "prompt" → initial task                                ║
║  --print → one-shot output                                 ║
║  --worktree → isolated workspace                           ║
║  --dry-run → preview only                                  ║
║  --resume → continue session                               ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝
```

---

**END — COMPLETE GUIDE WITH SKILLS, REDDIT, REPOS, 12 MISSED THINGS, WHAT NOT TO DO**
