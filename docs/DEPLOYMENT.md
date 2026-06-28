# EAL — Deployment Plan (error-free, deployed, safe to iterate)

Goal: ship the whole project live on **Vercel**, fully functional, and be able to **add features / fix bugs without breaking production**.

---

## 0 · One-time truth check (before first deploy)
The build currently passes only because `next.config.ts` has `eslint.ignoreDuringBuilds:true` + `typescript.ignoreBuildErrors:true`. That hides real errors. For a genuinely error-free deploy we gate on the REAL checks, then (optionally) keep the ignores as a safety net so a stray non-blocking error never breaks a deploy.

Run locally and get each to green:
```bash
npx tsc --noEmit          # 0 type errors (was driven to 0 before — re-confirm)
npm run lint              # 0 errors
npm run build             # exit 0
node scripts/validate-cognition.js   # cognition data: 0 unsourced / 0 missing
npm run validate:content  # MDX/content frontmatter (if present)
npm test                  # vitest (if wired)
```
Fix anything red. This is the "no errors" gate.

## 1 · Secrets & environment (critical)
- All keys live in **`.env.local`** (gitignored) locally and in **Vercel → Project → Settings → Environment Variables** for prod/preview.
- NEVER prefix secrets with `NEXT_PUBLIC_` (that ships them to the browser). Server-only.
- Keys this project uses (set the ones you have; the app fails *loud*, not silent, when missing):
  - AI rotator: `GEMINI_API_KEY*`, `GROQ_API_KEY`, `OPENROUTER_API_KEY`, `CEREBRAS_API_KEY`, `TOGETHER_API_KEY`, `SAMBANOVA_API_KEY`
  - `COHERE_API_KEY` (Evidence Aggregator rerank), `OPENAI_API_KEY` (classifier)
  - `KV_REST_API_URL` + `KV_REST_API_TOKEN` (rate-limiting/ledger; without them it falls back to in-memory per-instance)
  - Any certificate-signing `HMAC_SECRET`
- Add each in Vercel for **Production** AND **Preview** (so preview deploys work too).

## 2 · First deploy (Vercel)
1. Push the repo to GitHub (private is fine).
2. Vercel → **New Project → Import** the repo. Framework auto-detects **Next.js**.
3. Build command `next build`, output `.next` (defaults are correct).
4. Paste env vars (step 1).
5. Deploy. Vercel gives a production URL + a unique URL per deploy.
6. Smoke-test the live URL: `/`, `/explore`, `/cognition-curriculum`, `/angry-debunkers`, `/sources`, a couple of `/api/*` routes.

> I can't run the deploy for you (needs your Vercel auth + GitHub). Give me access or run the import, and I'll drive the config + smoke tests.

## 3 · Safe iteration — add features / fix bugs WITHOUT breaking prod
The whole point. Use **branch → preview → gate → merge**:

1. **Never commit straight to `main`.** Branch per change: `feat/...` or `fix/...`.
2. **Every push = automatic Vercel Preview deploy** on its own URL. Test there, not in prod.
3. **CI gate before merge** (GitHub Actions): run `tsc --noEmit`, `lint`, `build`, `validate-cognition.js`, tests. Block merge if any fail.
4. **Merge to `main` → production deploy** only after the preview is verified + CI green.
5. **Instant rollback:** Vercel → Deployments → previous → "Promote to Production". One click, ~10s. So a bad deploy is never more than seconds from reverted.
6. **Feature flags** for risky/unfinished features (env var or a simple `flags.ts`): ship dark, enable when ready — no breakage.
7. **Additive-first:** new pages/data files (like the cognition days) don't touch existing routes, so they can't break them. Prefer adding over rewriting.

### Suggested CI (`.github/workflows/ci.yml`)
```yaml
name: ci
on: [pull_request]
jobs:
  gate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20, cache: npm }
      - run: npm ci
      - run: npx tsc --noEmit
      - run: npm run lint
      - run: node scripts/validate-cognition.js
      - run: npm run build
```

## 4 · Post-deploy hardening
- **Verification CDN for certificates** should be independent of the main app (per the PRD's FM-10 link-rot rule) so certs verify even during maintenance.
- **Monitoring:** Vercel Observability/logs; alert on 5xx spikes and on any API route returning the loud "UNVERIFIED" fallback at high rate.
- **Caching/TTL** on the BRAINS/evidence sources (PRD rule): never serve stale medical guidance.
- **`smoke:science`** (existing) as a post-deploy check against the live URL.

## 5 · Definition of "done / deployed"
- [ ] tsc 0 · lint 0 · build exit 0 · validate-cognition 0 gaps · tests green
- [ ] Env vars set in Vercel (prod + preview), no secret is `NEXT_PUBLIC_`
- [ ] Production URL live; key pages + APIs smoke-pass
- [ ] CI gate on PRs; preview deploys working; rollback verified once
- [ ] Certificate verify on independent CDN
