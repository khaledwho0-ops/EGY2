# Platform Hardening — Plan, Checklist & Stress-Test Gate
**Opened 2026-06-25.** Source: user's platform-wide audit (~45 named pages + "review the full tool catalog one by one").
Rule of work: **fix root causes, not symptoms** → **stress-test every fix vs the philosophy + the EAL Standard** → only then check the box.

---

## The Stress-Test Gate (every fixed page MUST pass ALL six before ✅)
1. **Connects & responds** within a sane budget (no 30s hangs, no HTTP 000).
2. **The One Law** — every factual claim carries a real resolvable tiered source, or fails LOUD as `[⚠ UNVERIFIED]`. Never fabricates.
3. **Name-free** — no deceiver/brand names (legal).
4. **Bilingual** — EN + Egyptian Arabic, RTL correct.
5. **Zero-knowledge usable** — a user who knows nothing can understand the point, has a ready scenario, knows how to use it & how they benefit.
6. **Real, not mock** — live/real data or honest "sample" labelling; no fake numbers.

---

## REMAINING WORK — DIVIDED (after the AI-layer + question-system are done & verified)
**Group A — How-to + ready scenarios + use cases** ✅ **DONE & verified** (all 9 HTTP 200, ToolGuide renders): paper-auditor (4 real Crossref DOIs) · stat-power (real tiny-study cases, zero-knowledge steps) · bias-detector + cognitive-lab (real Egyptian arguments, auto-run) · god-system + swarm-debate (real claims) · evidence (live search) · sources + curriculum/phase2 (scroll/filter). Reusable `src/components/ToolGuide.tsx` built. All name-free, bilingual, wired to real handlers.
**Group B — real data / live feeds** ✅ **DONE & verified** (all 6 HTTP 200): live-deception (ADDED real-cases feed from kill-list + clickable "track the source"; strong sim untouched) · trend-hunter (**fixed a One-Law violation** — it was showing FABRICATED spread-scores/N/p-values; rewrote around real live Google Trends + kill-list archive) · misinfo-atlas (intro narrative + real kill-list data + **fixed dead "Run Scenario"** — it was a toggle with no driver) · bias-fingerprint (**removed mock formula** → real 8-item self-assessment computing from actual answers) · reaction-test (12→24 items) · manipulation-cards (**found lost content** — `.slice(0,10)` dropped 30/50 → 31 real FLICC cards + regression guard). **Kill-list expanded 5→17 real Egyptian cases** (name-free, bilingual, real sources WHO/FDA/EDA/Central Bank of Egypt/Al-Azhar/NCI/Antiquities) — feeds all 3 pages.
**Group C — content/links/updates:** epistemology (real links to where each principle is applied) · engines-guide (real links + honesty pass) · science (update) · curriculum/phase3 (restore lost content) · phase4 (update) · nvidia-hub (update).
**Group D — redesign/mess:** platform-guide (full mess → rebuild) · swarm-debate redesign · competition-demo · peer-challenge (works per audit — verify questions).
**Group E — catalog review** one-by-one (full registry vs the 6-point gate).

## RENAME → REDESIGN (user 2026-06-25: "rename every page to a REAL SCIENTIFIC name, all are generic/cringe, then redesign")
**Style chosen: HYBRID** — plain name + real method tag (e.g. "Claim Debunker · truth-sandwich method", "Bias Detector · dual-process (Kahneman)", "Deception Analysis · 8-layer").
- [x] **Central catalog `src/app/explore/page.tsx` renamed** (all ~90 tools + 10 category titles → hybrid; `method` field + render added; fixed certificate "blockchain-anchored" overclaim). Verified /explore 200, new names render, cringe names gone. **This is the rename source-of-truth.**
- [~] **Per-page headings** — ✅ DONE + verified 200 on :59225: **defense** (Claim Debunker, Claim Audit, Active Threats Registry…), **forensics** (Provenance Verifier, Forensics Dashboard, Paper Auditor…), **ai** (AI Research Agents, Deception Analysis; nvidia-hub/ai-editor/prompt-lab already done), **islamic** (Hadith Authenticator, Fatwa Context, Claim Verification…). ✅ Fixed `/reverse` content mismatch → "Manipulation Reverse-Engineering" (page + catalog). TODO: **science · community · dashboard · curriculum-tools** clusters; chatbot heading lives in `src/components/chatbot/sidebar.tsx` ("EAL Assistant" → "AI Assistant"). NOTE: rate-limit hit when running 4 parallel rename agents → run rename clusters ≤2 parallel or sequential.
- [ ] **Top nav** category labels (`mega-nav.tsx` / `data/i18n/site-strings.ts`: "Intelligence Core", "Cognitive Shield" …) → rename. (Editing navbar recompiles every page → do it on a fresh server, then verify.)
- [ ] **REDESIGN** — `/platform-guide` + `/swarm-debate` ONLY (user: "worst offenders only").
- ⚠️ Dev server crashed once under the heavy rename batch (≈25 page edits at once) → restarted clean, now on **:59225**. Keep rename batches small + verify one-at-a-time.

---

## PHASE 0 — Diagnosis ✅ (done 2026-06-25)
- [x] Mapped **84 API routes**. Live dev server = **:58681** (root-launched `eal-dev`).
- [x] **Confirmed root cause A:** `/api/chat` (the chatbot) `runtime='edge'` + calls **NVIDIA Nemotron-550B FIRST** → hangs 30s → HTTP 000 → "couldn't connect." Fallback never triggers (selection doesn't throw; the *stream* is what hangs).
- [x] Debunk engine alive: `/api/defense/angry-debunkers` 200 in 1.9s (wants field `query`).
- [x] **37 routes** touch NVIDIA/streamText; **3** still `runtime='edge'`. The dead AI pages share root cause A.
- [x] Health 200 but **4.7s** — dev-mode compile sluggishness (not a prod bug).

---

## PHASE 1 — Revive the dead AI layer  🔴 CRITICAL (a debunker that can't connect betrays the One Law)
**Root fix:** standardise every user-facing AI route on the **Gemini-first MegaRotator** (`rotatingGenerateText`/`nvidiaFirstGenerate`) + **hard timeout (AbortController)** + **fail-loud** fallback. NVIDIA-550B last, never first.
- [x] `/api/chat` → chatbot (global widget + /angry-debunkers + /chatbot)  **[root cause A]** ✅ Gemini-first + nodejs; HTTP 200 in 11s streaming real Arabic debunk (was HTTP 000/30s hang).
- [x] `/sovo` → `/api/sovo/analyze` ✅ 200 in 20s. Two bugs: unbounded self-HTTP fetches (now 8s-timeout-bounded) + crash on stale `COVORouter` shape (used `baseAnalysis.route`/`.eis`, real fields). Pacing (20s) → tune in P2.
- [x] `/osint-investigator` → `/api/defense/osint-investigator` ✅ 200 in 10.8s, full LangGraph pipeline + real sources. Groq-first flip.
- [x] `/angry-debunkers` deep mode → `/api/agents/investigate` ✅ Pattern C (already Gemini-first, fails-soft). **Root-cause hang fixed at SOURCE:** added a 28s per-attempt `AbortSignal.timeout` inside the rotator (`gemini-rotator.ts`) so a stalled slot is abandoned instead of hanging — benefits EVERY rotator-backed route. Still slow-by-design (5 parallel agents) → loading bar in P2.
- [~] `/whatsapp-analyzer` → `/api/whatsapp-analyzer` — ⚠️ **route WORKS** (200, score 85, SUSPICIOUS, ~11s). "Full failing" = Pattern C: slow + no loading feedback. → fix in P2.
- [~] `/debate-sim` → `/api/debate-sim` — ⚠️ **route WORKS** (200, real fallacy counter-arg, ~25s). "Full failing" = Pattern C (slow + silent, and 25s is steep). → fix in P2.
- [~] `/fallacy-engine` → `/api/fallacy-detect` — ⚠️ **route WORKS** (200, 3 fallacies, ~20s). "Fully failed" = Pattern C (slow + silent). → fix in P2.
- [x] `/swarm-debate` → `/api/defense/swarm` ✅ 200 in **5.9s** (was minutes-long hang), real counter-narrative. Groq-first flip. (redesign still pending in P7)
- [x] `/god-system` → `/api/god-system` ✅ 200 in 12.5s (verdict DEBUNKED + 8 layers), 25s route timeout added. (scenarios still P4)
- [x] `/paper-auditor` → `/api/paper-auditor` ✅ rotator-backed POST; 8s timeout on the CrossRef fetch. (scenarios still P4)
- [x] `/deepreal`, `/deepreal-forensics`, `/forensic-c2pa` → forensic routes ✅ hard timeouts on the URL + NVIDIA-550B + Sightengine fetches (NO unsafe vision-model swap; One-Law preserved). nvidia-hub routes also timeout-bounded (kept NVIDIA showcase).
- [x] `/peer-challenge` + `/competition-demo` — ⚠️ **NOT broken** (standalone client game / works-but-slow). `/critical-thinking` ✅ FIXED a real TypeError crash (`result.layers[0]` → remapped the whole result UI to the god-system schema). `/demo` ✅ dead `/tools/mist` button → `/assessment`. `/instruments/mist` ✅ was a phantom 404 ("fully down") → created a redirect to `/assessment`.

### Rotator source-fix (benefits all rotator-backed routes)
- [x] `gemini-rotator.ts` — added a 28s per-attempt `AbortSignal.timeout` to both `generateObject` & `generateText` calls in `rotate()`. A stuck slot (NVIDIA-550B last resort, network stall) is now dropped so the rotator advances instead of hanging. Smoke-tested: chat 200 (13s), whatsapp 200 in 8.4s (down from 11s). Generous ceiling so legitimate slow Gemini big-JSON answers survive.

## PHASE 2 — UX feedback: loading bars + staged progress 🟠
**USER DECISION (2026-06-25): keep STRICT Gemini-first everywhere (max quality/priority); accept 11–20s but MASK it with strong live loading bars + staged progress so it reads as intentional, not broken.** Do NOT switch heavy tools to Groq for speed.
- [x] Shared `<AnalysisProgress/>` built (`src/components/AnalysisProgress.tsx`) — honest request-tied fill, bilingual STAGE_SETS (debunk/whatsapp/fallacy/forensic/swarm).
- [x] Wire into the cluster ✅ **ALL 8 wired + compile 200**: whatsapp, blackbox, angry-debunkers, fallacy-engine, debate-sim, sovo, paper-auditor, god-system.
- [x] Fake-timer bugs FIXED as a bonus: blackbox (`Date.now()-Date.now()=0` → results popped instantly), angry-debunkers (removed simulated `setTimeout` staging), sovo (results now tied to the real fetch, not 800ms). Minor follow-up: prune now-dead `currentLayer`/`activeLayers` consts in angry-debunkers (harmless lint, not a build error).

## PHASE 3 — Real / live data (kill mockups) 🟠
- [ ] `/live-deception` — feed real posts/news + **clickable source tracking** (keep it as strong).
- [ ] `/trend-hunter` — live trends across the full year (verify vs live-deception overlap).
- [ ] `/misinfo-atlas` — stronger intro narrative + fix "run live scenario."
- [ ] `/bias-fingerprint` — real data, not mock.
- [ ] `/reaction-test` — more data.
- [ ] `/manipulation-cards` — way more data + restore lost content.
- [ ] `/engines-guide` — real links + honestly verify its data.

## PHASE 4 — Zero-knowledge onboarding: ready scenarios + use cases + how-to-use 🟡
Reusable `<HowToUse/>` + `<ReadyScenarios/>` pattern, then apply to:
- [ ] `/paper-auditor` · `/stat-power` (works for below-zero knowledge) · `/sources` · `/god-system`
- [ ] `/bias-detector` · `/cognitive-lab` · `/curriculum/phase2` · `/swarm-debate`
- [ ] `/evidence` — it's vague: state the point / what to do.

## PHASE 5 — Content + links + updates 🟡
- [ ] `/epistemology` — real links to where each principle is applied.
- [ ] `/science` — update. · [ ] `/curriculum/phase3` — update + restore lost content. · [ ] `/curriculum/phase4` — update.
- [ ] `/nvidia-hub` — update.

## PHASE 6 — Curriculum + exercises 🟡
- [ ] `/curriculum/phase0` — UNLOCK ALL.
- [ ] Mental-Health exercises — add MORE (same methodology) + fix "Stigma Scenarios" & "Grief vs Depression" (not working).

## PHASE 7 — Redesigns 🟢
- [ ] `/platform-guide` — full mess → rebuild.
- [ ] `/swarm-debate` — redesign + scenarios.

## PHASE 8 — 🔴 The question / assessment / philosophy system (CRITICAL = "half the philosophy & standard")
**BINDING SPEC** = `RESEARCH_VAULT/STRATEGY/10_STRATEGY_cognition-science.md` (the Science/Cognition-Builder PRD). It mandates: **9 exercise types E1–E9**, each with an `answerKey`; **deterministic CODE grading where a key exists** (E1/E2/E6/E7/E9), LLM only narrates over retrieved sources (E3/E5); **every real item carries `sources[]` with a tier** (One-Law) or is labeled synthetic; **Layer-8 has NO binary key — graded on calibration (Brier)**, never manufactured certainty; balanced real/fake accuracy (discernment-not-distrust). Data shape `Exercise{ id, layer, techniqueId, type, difficulty, promptEn/Ar, isReal, answerKey, sources[], synthetic }`.

**DIAGNOSIS — why it "fails / no way to answer correct":** the implemented data has fragmented into ≥3 incompatible shapes vs the spec:
1. **Science** (`exercises[].options[]` + `correctAnswer` index + `explanation`) — clean MCQ, HAS a working renderer (`science-exercise-tracker.tsx` QuickPlayer). ✓
2. **Mental-health `scenario-response`** (`correct_response`/`barriers_present`/`what_not_to_do`) — **NO renderer at all** → no answer UI. ✗
3. **Canonical `ExerciseSchema`** (`content.task.items[].isCorrect`) — used by deepreal/religion-hub exercises; renderer status unknown.
The QuickPlayer bug: line 89 `{(answered || !hasOptions) && <Next>}` — any item lacking `options` just shows a Next button = "no way to answer."

**FIX PLAN:**
- [x] AUDIT (workflow ww4xkiiie) — 6 surfaces mapped; full fix-map below.
- [~] BUILD players: ✅ `ScenarioResponsePlayer` (reveal) built + wired for stigma; ✅ MiniPlayer extended for `differentiation` (grief: derived options + exact-match) + empty-item guard. TODO: calibration-slider (Layer-8), MIST per-item review screen.
- [x] **Mental-health bank — the explicit "Stigma + Grief don't work" — FIXED & verified 200**: stigma → ScenarioResponsePlayer; grief → differentiation MCQ. Both now have a real answer→check→feedback loop.
- [~] FIX "not logical" items: ✅ **depression myths rebalanced** (14 items: 10 false + 4 sourced TRUE); ✅ **anxiety myths rebalanced** (11 items: 8 false + 3 sourced TRUE) — both no longer all-False; ✅ **science answer-position de-biased** ({0:20,1:121,2:21,3:3} → {0:43,1:40,2:42,3:40}, even, verified from disk). TODO: science distractor **length-balance** (correct still often longest); confidence slider (E2).
- [~] One-Law sourcing: ✅ MiniPlayer now **renders item `references`** on answer (stigma/grief/myth). TODO: promote science prose citations to structured `sources[]`+tier; show before answering.
- [x] Reach + review: ✅ created `deepreal/exercise/[day]` + `mental-health/exercise/[day]` routes (banks were unreachable); ✅ **MIST per-item right/wrong review** added to /assessment; ✅ **phase0 UNLOCK ALL** (isLocked=false, 28 days open). TODO: curriculum p2 how-to / p3 lost content / p4 update.
- [x] COMPILE-VERIFIED on a clean server (:60535 after restart): /curriculum/phase1, /assessment, /deepreal/exercise/1, /mental-health/exercise/1, /curriculum/phase0 all HTTP 200 + render real content, no error markers. (Note: a big simultaneous edit batch thrashed the old :58681 into a stuck compile → restarted clean; dev port auto-assigns.)
- [ ] DEEPER STRESS-TEST: interactively click through each fixed exercise vs the spec + One-Law (answer→check→feedback→source). Remaining build: science distractor length-balance, E2 confidence slider, structured `sources[]`+tier on science, curriculum p2/p3/p4.

**AUDIT RESULTS (6 surfaces, 2026-06-25) — concrete fix-map:**
- 🔴 **mental-health bank** (CRITICAL; the explicit complaint): MiniPlayer in `curriculum/phase1/page.tsx` silently no-ops on shapes it doesn't know → **stigma (6) + grief-vs-depression (5) render empty prompt + bare Next** = "do not work." **depression+anxiety myths (18): `correctAnswer===false` for EVERY item** = degenerate True/False ("not logical"). FIX: MiniPlayer handle `scenario-response` (→ ScenarioResponsePlayer, built ✓) + `differentiation` (derive options[] from answer codes, exact-match grade) + guard empty prompts + render sources; rebalance the all-False myths (+true items / confidence slider). `exercises-2-14.ts` (45KB) is DEAD.
- 🟠 **science** (165 items): keys CORRECT, but **73% of correct answers at index 1 + correct = always the longest option** ("feels rigged") → shuffle positions + length-balance distractors; promote prose citations to `sources[]` + show before answering.
- 🟠 **MIST/assessment**: works, but results screen shows ONLY aggregate numbers — **no per-item right/wrong review** ("opaque, can't see correct"). FIX: add per-item review (answer vs correct + FLICC explanation; data already present). Delete orphaned `mist20.json` + stub `mist-items-2023.json`.
- 🔴 **canonical-exercises**: `ExerciseEngine` only reachable via `religion-hub/exercise/[day]`; **DeepReal + Mental-Health have NO [day] route → their banks unreachable.** Wire routes.
- 🔴 **curriculum** phase0-4: partial; phase0 unlock-gate, phase2 how-to, phase3 lost content, phase4 update.
- 🟢 **peer-challenge + defense-test**: WORK. Cambridge `src/features/badnews` engine is orphaned (no route).

## PHASE 9 — Catalog review (the full tool registry, one by one) 🟢
- [ ] Systematic pass over every tool in the pasted catalog vs the 6-point gate.

---

## Progress log
- 2026-06-25: Phase 0 done. Phase 1 — fixed & verified `/api/chat` (chatbot ×3 surfaces), `/api/defense/osint-investigator`, `/api/defense/swarm`, `/api/sovo/analyze`. Two root-cause patterns confirmed:
  - **Pattern A — `nvidiaKey ? '550b' : 'llama-3.3-70b'`:** having the NVIDIA key forces the slow 550B → hang. Fix: flip to fast-first (Groq `llama-3.3-70b-versatile` or Gemini), NVIDIA-550B LAST. Same fix for forensic/nvidia routes.
  - **Pattern B — unbounded self-HTTP `fetch(\`${origin}/api/...\`)`:** hangs the single-process dev server. Fix: `AbortSignal.timeout()` or call the function in-process.
  - Stale-shape crashes: verify the helper's current return shape before referencing fields (`COVORouter.analyzeQuery` → `{eis,vectors,route,highEmotionalManipulation}`).
  - **Pattern C — "works but feels failed":** `/api/whatsapp-analyzer` (200, score 85, 11s) & `/api/fallacy-detect` (200, 3 fallacies, 20s) RETURN REAL RESULTS but take 11–20s with NO loading feedback (and some pages, e.g. sovo, render on a fake timer). Users read this as "failing." `nvidiaFirstGenerateJSON` is correctly rotator-backed (Gemini-first); the slowness is heavy JSON schemas on the sluggish dev server. → Fix = Phase 2 (real loading bars + pacing, consider Groq-fast path for heavy structured calls since Groq gave swarm 5.9s) + per-page render audit. Do NOT treat these as dead routes.
  - NEXT: dead-route sweep `/api/agents/investigate`, `/api/debate-sim`, forensic routes (`audio/video/image` 550B), nvidia-hub routes (Pattern A) — then pivot to Phase 2 for the Pattern-C cluster.
- 2026-06-25 (cont.): **Phase 1 COMPLETE + Phase 2 COMPLETE.** Workflow #1 (6 agents) hardened 9 routes (paper-auditor, god-system, bias-detect, forensic image/audio/video, deepreal, c2pa, nvidia ×3) with timeouts + vision/showcase guardrails. **Rotator source-fix**: 28s per-attempt timeout in `gemini-rotator.ts`. Fixed 3 page bugs: critical-thinking TypeError crash (schema remap), demo dead link, instruments/mist phantom 404 (redirect). Workflow #2 (7 agents) wired `AnalysisProgress` into all 8 Pattern-C pages + fixed 3 fake-timer bugs. All verified 200. **NEXT: Phase 8 scenario-response renderer (CRITICAL), then Phases 3–6 (real data / ready scenarios / content), Phase 7 (platform-guide), Phase 9 (catalog).**
