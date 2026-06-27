# LOOP ENGINEERING — quick reference

The autonomous loop matching your diagram:
**Set goal → AI writes own prompt → Agent executes → Goal met? → repeat**

## Files
- **`GOAL.md`** — what done looks like. Edit freely to redirect the loop.
- **`STATE.json`** — auto-updated per tick. `status` ∈ idle / running / paused / DONE.
- **`tick.js`** — deterministic engine. Reads catalog + current guides, plans next batch.
- **`LOG.md`** — append-only timeline (auto-created on first tick).
- **`TICK_PROMPT.md`** — the prompt the cron fires every tick. Already wired.

## Control commands (run from project root)
```bash
node .claude/loop/tick.js status   # plan + progress, no mutation
node .claude/loop/tick.js start    # mark loop running
node .claude/loop/tick.js pause    # halt without losing state
node .claude/loop/tick.js reset    # zero state (keeps already-written guides)
```

## How it actually loops (3 engines, pick one)

### A) `CronCreate` durable cron (Claude Code app must be open & idle)
Already scheduled. Survives Claude Code restarts. Auto-expires after 7 days.
- Manage: `CronList` shows it, `CronDelete <id>` stops it.

### B) `schedule` skill (TRUE cloud — works when laptop is off)
Run: `/schedule create loop tick every 30 minutes`. Lives on Anthropic infra.

### C) GitHub Actions (TRUE cloud, free, scriptable)
File at `.github/workflows/loop.yml` (created separately — needs `workflow` token scope to push).

## Goal-met detection
`tick.js status` returns `"done": true` when every route in the Explore catalog has
a matching entry in `PAGE_GUIDES`. At that point the agent self-cancels its cron.

## Token-spend guarantees
- Batch size capped at 5 routes per tick (GOAL.md hard cap)
- Max 250 ticks (~5 weeks at half-hourly)
- Loop checks the cap on every tick and stops if exceeded
