# THE LAW — Handoff for the Next AI Agent (read this FIRST, fully)

> Purpose: continue this project **without breaking anything that already works**, know exactly
> **what is done vs remaining**, and **deploy**. Credit ran low mid-build; this file is the source of truth.

---

## 0 · NON-NEGOTIABLE GUARDRAILS — DO NOT BREAK

1. **Nested root.** The real project is `C:\Users\pc\Desktop\EGY\New folder (20)\egyptian-awareness-library\`
   (one level below the cwd). A **separate sibling tree** at `C:\Users\pc\Desktop\New folder (20)\egyptian-awareness-library\`
   holds the user's source inputs: `BRAINS/`, `altaybat_research_v2.html`, `Science_Platform_PRD.docx`, `TASK.txt`.
2. **The One-Law (governing standard `HI CLAUDE/00_THE_SCIENTIFIC_STANDARD.md`):** no claim reaches the user
   without a real, resolvable source. If you can't source it, render it **UNVERIFIED / غير موثّق** — NEVER fabricate
   a source, hadith, number, or study.
3. **NAME-FREE in all user-facing text.** The case is «نظام الطيبات»; its originator is "a board-certified
   anaesthesiologist" — never a private person's name. No deceiver/brand personal names anywhere in UI.
4. **Bilingual + RTL** on everything user-facing (English + Egyptian Arabic; every string needs its `*Ar` twin).
5. **Do NOT regenerate or revert the 140 cognition day files** (`src/data/exercises/cognition/dayNN_*.json`).
   They are COMPLETE, v2, sourced. Several (50, 63, 85, …) were intentionally linter-modified — keep them.
6. **Never** edit `node_modules/` or `.next/`. Never read `globals.css` or root `page.tsx` whole (huge — use ranges).
7. `next.config.ts` sets `typescript.ignoreBuildErrors` + `eslint.ignoreDuringBuilds`. The build passing does NOT
   mean type-clean. The **real gate is `npx tsc --noEmit`** — run it before claiming "no errors."
8. **Additive-first.** New pages/data files can't break existing routes. Prefer adding over rewriting. After ANY
   change touching cognition data, run `node scripts/gen-manifest.js` then `node scripts/validate-cognition.js`.

---

## 1 · WHAT IS DONE (verified)

### A) Cognition build — ✅ COMPLETE (the user's "second half")
- **140 days (29–168)** in `src/data/exercises/cognition/dayNN_*.json` — **0 unsourced, 0 missing, 0 duplicates,
  all v2** (8 mechanics: recognize · calibrate · self_explain · consider_opposite · inoculate · decompose · retrieve · transfer).
- Player + measurement: `src/app/cognition-curriculum/page.tsx` (manifest-driven, bilingual, plays each day via
  `/api/exercise?file=…&subdir=cognition`), `src/lib/cognition/profile.ts` (calibration + SDT distrust-drift guard).
- Spec/brief (durable, in repo): `src/data/exercises/cognition/_ENGINE_V2_SPEC.md`, `_AUTHORING_BRIEF.md`.
- Sourced anchor: `src/data/cases/eltaybat-case-001.ts` (12 red flags, 16 biases, evidence ladder, 2 refuting Quran
  verses 5:87 & 16:116, conspiracy pairs, bibliography). Reference case facts as `EAL-case-001:<id>`.
- Manifest: `src/data/exercises/cognition/_manifest.json` (regenerate with `node scripts/gen-manifest.js`).
- Helper scripts in `scripts/`: `gen-manifest.js`, `validate-cognition.js`, `dedupe-cognition.js`,
  `classify-mechanics.js`, and the reusable `brains-to-cognition.workflow.js`.

### B) Explore Hub catalog — ✅ COMPLETE
- `src/app/explore/page.tsx` → `CATEGORIES`: **124 tools across 10 categories**, covers **100% of user-facing
  routes** (only `defense-test`, `defense-qa`, `defense-pages-map` excluded = internal dev/test). `STATS` is dynamic.
- `src/components/shared/explore-hub.tsx` → tool/module counts now dynamic (`LIVE_TOOLS.length`, `CORE_MODULES.length`);
  **Cognition Curriculum** added as the 7th module + a page entry.

### C) Deployment plan — ✅ WRITTEN: `DEPLOYMENT_PLAN.md`.

### D) Page-Guides system (TASK.txt "C") — ✅ WIRED + VERIFIED (content fill remaining)
- `src/data/page-guides.ts`: `PageGuide` type + registry `PAGE_GUIDES` with **4 exemplar routes**
  (`/angry-debunkers`, `/evidence-search`, `/fallacy-engine`, `/cognition-curriculum`) + `getPageGuide(pathname)`.
- `src/components/shared/page-guide.tsx`: inline, **collapsed-by-default**, bilingual panel = copy-paste scenarios +
  use-cases. Renders ONLY on routes with a registry entry (returns `null` otherwise). No floating bubble — respects the
  layout's de-distraction philosophy.
- Mounted ONCE in `src/app/layout.tsx` (between `</main>` and `<Footer/>`). **VERIFIED live:** `/` and `/angry-debunkers`
  return 200, no error overlay, page content intact, and the panel renders on `/angry-debunkers`.
- **REMAINING:** (1) fill `PAGE_GUIDES` for the other ~119 catalog routes (DATA ONLY — no component/page edits needed),
  via a tiered workflow by category; (2) the page-aware **chatbot** piece — wire `src/components/shared/page-ai-chatbot.tsx`
  with each route's `guide.chatbotContext` (still TODO).

---

## 2 · WHAT IS REMAINING (strict, priority order)

### 🥇 PRIORITY 1 — Make it deployable & verified (do this BEFORE new features)
1. `npx tsc --noEmit` → fix any type errors (was 0 before; re-confirm after the explore/page-guides edits).
2. `npm run build` → exit 0. `npm run lint`. `node scripts/validate-cognition.js` → 0 gaps.
3. Deploy per `DEPLOYMENT_PLAN.md` (§4 below).

### 🥈 PRIORITY 2 — TASK.txt workstream "C" (per-page help) — the big remaining build
Goal (from `…\Desktop\New folder (20)\…\TASK.txt`): **every page** gets (a) ready copy-paste scenarios,
(b) a page-aware chatbot (system prompt + the page's exact data), (c) use-cases (how it helps / how to apply).
**Architecture chosen + foundation BUILT & VERIFIED** — finish it data-first so you don't edit 135 page files:
   1. ✅ DONE — `src/components/shared/page-guide.tsx` (inline collapsible scenarios + use-cases panel).
   2. ✅ DONE — `<PageGuide/>` mounted once in `src/app/layout.tsx` (verified live, no breakage).
   3. ⬜ Fill `PAGE_GUIDES` in `src/data/page-guides.ts` for the remaining ~119 catalog routes (DATA ONLY). Big content
      job → tiered workflow **by category** (Opus designs the per-category template, Sonnet authors each route's
      `{scenarios, useCases, chatbotContext}`), bilingual + One-Law. Use the 4 existing entries as the exact template.
   4. ⬜ Wire the page-aware chatbot: feed each route's `guide.chatbotContext` into `page-ai-chatbot.tsx` (currently the
      registry carries the context but no chat UI is attached — the de-distraction layout removed the global chat bubble).

### 🥉 PRIORITY 3 — TASK.txt "D" + the wayfinding bar
- Page-by-page working/UI audit → status matrix (note pages that are "just UI"/stubs). Pages flagged in CLAUDE.md as
  in-progress: `others-search`, `baseline`, `osint-investigator`, `assessment`, `blackbox`.
- **Wayfinding bar**: users are lost about "what page comes before/after." Add a sequence-aware bar (tie to the
  curriculum/journey order). This is the "bar" from both the chat and TASK.txt.

### PRIORITY 4 — deferred by the user
- **موثوق ("Trusted") rebrand** → user said **"make موثوق LATER."** When greenlit: redesign identity + welcome page +
  nav bar as one pass. Until then, do NOT rename anything.
- Pilot study **N=84** (efficacy engine built; measured Egyptian effect size is still N=0 — never claim measured efficacy).
- Activate the SDT guard fully: add `itemKind: "manipulation" | "legitimate"` to cognition items so discrimination
  (not just calibration) goes live in `profile.ts`.
- `/platform-guide` full redesign; validated Arabic instruments (MIST-20/MHLS) — blocked by One-Law (no machine-translation).

> ⚠️ **TASK.txt is NOT a complete feature list** (user confirmed). Always derive "all features" from the real routes:
> `find src/app -name page.tsx`. The Explore catalog (`CATEGORIES`) is now the authoritative user-facing list.

---

## 3 · HOW TO ADD WITHOUT BREAKING (exact contracts)

- **A cognition day** (`src/data/exercises/cognition/dayNN_slug.json`): match `_ENGINE_V2_SPEC.md`. Every fact item needs
  `sources:[realURL | "EAL-case-001:<id>"]`. After adding: `node scripts/gen-manifest.js` (the page auto-grows) +
  `node scripts/validate-cognition.js` (must show 0 unsourced / 0 missing) + `node scripts/classify-mechanics.js`.
- **An explore catalog tool**: add `{ path, name, method, desc, isNew? }` to the right category's `tools:[]` in
  `src/app/explore/page.tsx`. `STATS` and the hub counts update themselves. Don't add internal/test routes.
- **A page guide**: add an entry to `PAGE_GUIDES` in `src/data/page-guides.ts` (bilingual). No page edit needed once
  `<PageGuide/>` is mounted in the layout.
- **Never** hardcode a count that a `.length` can compute (the stale "18 tools / 6 modules / 151 pages" bug we fixed).

---

## 4 · DEPLOY GUIDE (full detail in `DEPLOYMENT_PLAN.md`)

1. **Gate (the real "no errors"):** `npx tsc --noEmit` · `npm run lint` · `npm run build` (exit 0) ·
   `node scripts/validate-cognition.js`. Fix red before deploying.
2. **Secrets → Vercel env (Production + Preview), never `NEXT_PUBLIC_`:** the AI rotator keys (GEMINI*/GROQ/OPENROUTER/
   CEREBRAS/TOGETHER/SAMBANOVA), `COHERE_API_KEY`, `OPENAI_API_KEY`, `KV_REST_API_URL`/`KV_REST_API_TOKEN`, any HMAC cert secret.
   App fails LOUD (not silent) when a key is missing — that's by design.
3. **First deploy:** push to GitHub → Vercel "Import Project" (auto-detects Next.js, build `next build`) → paste env →
   Deploy. Smoke-test live: `/`, `/explore`, `/cognition-curriculum`, `/angry-debunkers`, `/sources`, a couple `/api/*`.
4. **Iterate without breaking prod:** branch per change → push = automatic Vercel **Preview** deploy (test there) →
   CI gate (tsc/lint/build/validate-cognition) blocks bad merges → merge to `main` = production → **one-click rollback**
   in Vercel if anything regresses. Use feature flags for unfinished work. (CI YAML is in `DEPLOYMENT_PLAN.md` §3.)
5. Certificate verification should live on an **independent CDN** (so certs verify even if the app is down).

---

## 5 · STATE OF THIS SESSION'S LAST EDIT
- Page-Guides **foundation is WIRED + VERIFIED**: `page-guides.ts` (registry, 4 routes) + `page-guide.tsx` (component) +
  layout mount. Verified live on the dev server (`/` and `/angry-debunkers` → 200, no error overlay, panel renders).
  **Resume at Priority 2, step 3** — fill the registry for the remaining ~119 routes (workflow, by category), then step 4 (chatbot).
- Everything in §1 (A, B, C, D) is complete/verified. Nothing is in a broken intermediate state — the platform is shippable now.

**Bottom line for the next agent:** the platform is shippable now (run §4 gate → deploy). The biggest remaining
*feature* is the per-page help system (Priority 2) — finish it data-first via the page-guides registry, never by editing
135 pages. Keep the One-Law, keep it name-free, keep it bilingual, and re-run the cognition validators after any data change.

---

## 6 · GIT / DEPLOY TARGET — EGY2 (critical, do not confuse with the backup)
- **`origin` = `github.com/khaledwho0-ops/EGY2`** (PRIVATE) — THIS is the deploy target. Push here.
- **`backup` = `github.com/khaledwho0-ops/EGY-awareness-library`** — the user's SAFE BACKUP. **NEVER push to `backup`.**
- Local working branch is **`egy2clean`** which tracks **`origin/master`**. EGY2 was seeded as a clean single-commit
  snapshot (no old history — full history is preserved on `backup`). Normal flow: edit → `git add -A && git commit` →
  `git push` (goes to EGY2 `master`).
- **Token limitation:** the `gh` token lacks `workflow` scope, so **`.github/workflows/*` files cannot be pushed**
  (that's why CI isn't in the repo). To enable CI: add `.github/workflows/ci.yml` via GitHub's web UI (YAML is in
  `DEPLOYMENT_PLAN.md §3`), OR run `gh auth refresh -h github.com -s workflow` (interactive) then push the file.
- **First Vercel deploy:** vercel.com → Add New → Project → Import `khaledwho0-ops/EGY2` → it auto-detects Next.js +
  `vercel.json` → add env vars (≥1 AI key + `JWT_SECRET`; rest optional, app fails loud not crash) → Deploy. After that,
  every `git push` to EGY2 auto-deploys; branches get preview URLs; rollback is one click in Vercel.
