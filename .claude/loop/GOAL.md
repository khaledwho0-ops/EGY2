# LOOP GOAL

The orchestrator reads this file every tick. Edit it freely to redirect the loop.

## Active goal
**Fill the PageGuide registry for every route in the Explore Hub catalog.**

## Done = (the termination condition the loop checks)
- `src/data/page-guides.ts` contains a `PAGE_GUIDES` entry for every route listed in
  the `CATEGORIES` array of `src/app/explore/page.tsx`
- Each entry has: `scenarios[]` (≥1 copy-paste example), `useCases[]` (≥1 help/apply pair),
  `chatbotContext` (system prompt for that page), and is **bilingual** (every user-facing
  string has its `*Ar` twin)
- All entries respect the **One-Law** (no fabricated facts) and are **name-free** per the
  project's binding rules in `THE_LAW_HANDOFF.md` and `HI CLAUDE/00_THE_SCIENTIFIC_STANDARD.md`

## Hard caps (the loop must respect)
- Max 250 ticks total (safety stop)
- Max 5 routes authored per tick (keeps token spend predictable + diff-reviewable)
- Stop immediately if `npm run build` would break (validator-driven)

## Termination behavior
When done, write `DONE` to `.claude/loop/STATE.json#status`, append a final entry to
`.claude/loop/LOG.md`, and self-cancel the cron.
