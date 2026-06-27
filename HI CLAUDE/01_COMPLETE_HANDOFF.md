# 📂 HI CLAUDE — READ THIS FIRST
## Complete Handoff Package for Claude Code (Max 5x Plan)

> **Project:** Egyptian Awareness Library (EAL)  
> **Author:** Khalid Sayed  
> **Created:** 2026-06-20  
> **From:** Antigravity IDE (107 sessions)  
> **To:** Claude Code (Max 5x Plan)

---

## 📋 Files in This Folder

| # | File | Size | What It Contains |
|---|------|------|-----------------|
| 01 | `README.md` | — | This index file |
| 02 | `02_CLAUDE_CODE_POWER_GUIDE_V2.md` | 36KB | **START HERE** — Full power guide: all commands, models, skills (7 EAL-specific), 12 things you missed, 15 deadly sins, GitHub repos, CLI flags, MCP servers, hooks, context management |
| 03 | `03_COMPLETE_HANDOFF_FULL.md` | 57KB | Complete 24-part project context: codebase anatomy, all 102 routes, all 28 APIs, known bugs, env vars, package.json, test infrastructure, science/theories, task priorities |
| 04 | `04_HANDOFF_AND_STRATEGY.md` | 29KB | Original strategy doc with proposed bug fixes and architecture details |
| 05 | `05_CLAUDE_CODE_STRATEGY.md` | 18KB | Token efficiency strategies, zone-based work, model selection guide |
| 06 | `06_ANTIGRAVITY_CONTEXT_EXPORT.md` | 3KB | User requirements, pages to fix, conversation IDs from 107 sessions |
| 07 | `07_CLAUDEIGNORE_TEMPLATE.txt` | 1KB | .claudeignore template (already deployed at project root) |

**Total:** ~144KB of concentrated context (vs. 8.89MB codebase)

---

## 🚀 Quick Start for Claude Code

```bash
# 1. Navigate to project
cd "c:\Users\pc\Desktop\EGY\New folder (20)\egyptian-awareness-library"

# 2. Start Claude Code
claude

# 3. CLAUDE.md + .claudeignore load automatically (FREE)

# 4. Set model
/model opusplan    # For complex features
/model sonnet      # For standard work

# 5. Paste this bootstrap prompt:
```

```
I'm working on the Egyptian Awareness Library (EAL) — a Next.js 15 platform
with 102 route directories and 806 source files.

CLAUDE.md has loaded with project rules.

Read the "HI CLAUDE/" folder for full context:
- 02_CLAUDE_CODE_POWER_GUIDE_V2.md (how to use Claude Code efficiently)
- 03_COMPLETE_HANDOFF_FULL.md (project architecture + all routes + bugs)

Today I'm working on: [describe task]
Only read files relevant to this task. Do NOT scan the full codebase.
After changes, run `npm run build` to verify.
```

---

## 🎯 Priority Order

| # | Task | Model | Est. Sessions |
|---|------|-------|--------------|
| P0 | Fix api-swarm.ts + classifier.ts bugs | Sonnet | 1 |
| P1 | Fix "VERY BAD" pages (trend-hunter, live-deception, misinfo-atlas) | Sonnet | 1 each |
| P2 | Build missing engines (Medical Life, BLACKBOX) | opusplan | 3-5 each |
| P3 | Add AI chatbot to all pages | Sonnet | 1-2 per page |
| P4 | Rename pages to scientific names | Haiku | 1 |

---

## ⚡ The 3 Rules

1. **Never read globals.css fully** (135KB = 30K tokens = 15% of context)
2. **`/compact` at 60%** — performance cliff at 80%
3. **`/clear` between tasks** — clean context = better reasoning
