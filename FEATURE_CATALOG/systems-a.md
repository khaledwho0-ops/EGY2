# EAL Feature Catalog — Cross-Cutting Systems (Part A)

Strategy: Cross-Cutting Systems  
Generated: 2026-06-26  
Source files: read directly; nothing invented.

---

## 1. TOOL CATALOG — `/explore` Page

**Name:** Platform-Wide Tool Catalog  
**File:** `src/app/explore/page.tsx`

**Explanation:**  
A single filterable, searchable directory of every page and tool on the platform. It is statically defined as a `CATEGORIES` array of 10 named objects, each with a bilingual title (EN + AR), gradient/glow design tokens, and an array of `Tool` objects. Each tool carries: `path` (the Next.js route), `name`, `method` (the scientific/methodological tag), `desc`, and an optional `isNew` badge. A live full-text search filters across name, method, desc, and path simultaneously. Category tab-bar tabs let the user focus one category. Stats strip advertises 130+ pages, 80+ API routes, 20+ live AI tools, 10 categories. The component renders a masonry-style card grid; each card is a `<Link>` to the tool's route.

**Use Case:**  
A new visitor who does not know the platform uses `/explore` to discover tools, browse by category, or search "hadith" / "deepfake" / "bias" to surface the exact tool they need.

**10 Categories (confirmed in file):**

| id | Title EN | Title AR | Tool count |
|----|----------|----------|------------|
| curriculum | Cognitive Immunity Curriculum | منهج التحصين المعرفي | 14 |
| defense | Live Defense Tools | أدوات الدفاع الحيّ | 12 |
| forensics | Digital Media Forensics | الطب الشرعي الرقمي | 7 |
| islamic | Islamic Verification Tools | أدوات التحقق الإسلامية | 10 |
| science | Scientific Evidence Tools | أدوات الأدلة العلمية | 8 |
| ai | AI Tools | أدوات الذكاء الاصطناعي | 6 |
| dashboard | Assessment & Analytics | التقييم والتحليل | 7 |
| community | Community & Live Tracking | المجتمع والتتبّع الحيّ | 10 |
| platform | Platform & Resources | المنصة والموارد | 10 |
| mentalhealth | Mental Health & Wellbeing | الصحة النفسية والعافية | 7 |

Total catalog entries: 91 tools across 10 categories.

**Key features inside the component:**
- `useMemo`-driven live search (name + method + desc + path)
- Category tab filter with animated active-pill state
- `isNew` badge with pulsing animation for newly shipped tools
- Bilingual category labels and hero subtitle (EN + AR)
- Responsive grid (`repeat(auto-fill, minmax(280px, 1fr))`)
- Hover micro-animations (translateY, box-shadow glow per category color)

---

## 2. NAVIGATION SYSTEM — MegaNav + RTL

**Name:** Mega-Navigation with Bilingual / RTL Support  
**Files:** `src/components/ui/mega-nav.tsx`, `src/components/shared/rtl-provider.tsx`, `src/data/i18n/site-strings.ts`, `src/data/i18n/chatbot-strings.ts`, `src/data/i18n/ui-strings.ts`

**Explanation:**  
The `MegaNav` component renders a horizontal top bar with five primary category tabs:

| id | EN label | AR label |
|----|----------|---------|
| intelligence | (from NAV_CATS.intelligence.en) | (NAV_CATS.intelligence.ar) |
| defense | (from NAV_CATS.defense.en) | (NAV_CATS.defense.ar) |
| curriculum | (from NAV_CATS.curriculum.en) | (NAV_CATS.curriculum.ar) |
| human | (from NAV_CATS.cognitive.en) | (NAV_CATS.cognitive.ar) |
| platform | (from NAV_CATS.platform.en) | (NAV_CATS.platform.ar) |

Each tab opens a 620-px wide dropdown with 6 sub-links, each having bilingual title, description, icon (Lucide), href, and optional `isNew` flag. The dropdown position is computed dynamically to stay clamped within the viewport. A sliding animated pill tracks the hovered item.

The nav reads `useRTL()` from `RTLProvider` to flip `dir` between `ltr` and `rtl`. Tab labels and dropdown text both switch language based on the active language state.

**RTL Provider** (`src/components/shared/rtl-provider.tsx`) is a React context that provides:
- `direction` ("ltr" | "rtl")
- `language` ("en" | "ar" | "ar-EG") — three-way: English, Arabic Fusha, Egyptian Arabic dialect
- `toggleDirection()` — flips direction and persists to `localStorage("eal-language")`
- `setLanguage(lang)` — sets any of the three variants
- `isRTL`, `isArabic`, `isEgyptian` — boolean shorthands
- `t(entry)` — resolves a `{en, ar, arEG?}` trilingual object to the active variant

On mount it reads `localStorage("eal-language")` to restore the last chosen language. Setting `ar` or `ar-EG` writes `dir="rtl"` and `lang="ar"` / `lang="ar-EG"` onto `document.documentElement`, driving CSS layout mirroring globally.

**i18n string files:**
- `site-strings.ts` — site-wide trilingual map: `NAV` (navbar labels + onboarding tour steps), `HOME` (homepage copy), `NAV_CATS` (category labels); type `T = {en, ar, arEG?}`
- `chatbot-strings.ts` — strings for the AI chatbot interface
- `ui-strings.ts` — generic shared UI label strings

**Use Case:**  
An Arabic-speaking user clicks the language toggle; the entire platform immediately flips to RTL layout, switches fonts to Cairo/Noto Kufi Arabic, and all trilingual strings resolve to Egyptian dialect where available. The MegaNav dropdowns label themselves in Arabic. This persists across sessions via localStorage.

---

## 3. THE DESCENT — Scrollytelling Gateway

**Name:** «The Descent» — scrollytelling gateway experience  
**Files:**
- `src/components/the-descent/DescentExperience.tsx` — orchestrator
- `src/components/the-descent/descent-data.ts` — single source of truth for all stats/copy
- `src/components/the-descent/descent-theme.ts` — zone CSS variable palettes
- `src/components/the-descent/shared/Sourced.tsx` — One-Law display primitive
- `src/components/the-descent/dw/design-wave.css` — DW design system CSS
- `src/components/the-descent/dw/Hero.tsx` — opening hero scene
- `src/components/the-descent/dw/scenes/` — 9 named scene files (SpreadSection, FabricationScene, BiasedLensScene, DecontextSection, TimingScene, KillSection, MatrixSection, ArchitectsSection, StandardSection, ImmunitySection)
- Plus: `BlastRadiusSection.tsx`, `ClimbTurnSection.tsx`, `CognitionShaft.tsx`, `DepthRail.tsx`, `FloorSection.tsx`, `GatewayDoor.tsx`, `ProblemSection.tsx`, `ThreadSection.tsx`, `ToolsFilmstrip.tsx`
- Visual helpers: `src/components/the-descent/visual/` (OrbField, GrainOverlay, GradientGrade, KineticMarquee, NeonStat)
- Data viz: `src/components/the-descent/viz/` (EgyptChoropleth, FlowMap, ScrubLineChart)

**Explanation:**  
The Descent is a full-page scrollytelling narrative that introduces the platform by taking the visitor through 8 layers of Egyptian misinformation (Absolute Fabrication → Biased Lens → Decontextualization → Weaponized Timing → The Kill → The Matrix → The Architects → The Unknown), then climbs back up to present the antidote (Standard / The One Law → Tools → Immunity → Cognition) and ends at a Gateway Door that enters the main library.

The orchestrator (`DescentExperience`) manages:
1. **Background field** — pure CSS `.dw-bgfield` gradient + drifting orbs (replaces an earlier R3F Three.js particle scene that caused blank-page crashes)
2. **Native scroll** → `ScrollContext` (progress 0–1 + velocity) fed to `ClimbTurnSection` via ref-only updates (no re-renders)
3. **Zone palette swap** — three named zones: `descent` (red/crimson), `climb` (cyan), `enterprise` (gold). An `IntersectionObserver` watches `[data-descent-section]` elements and publishes CSS vars (e.g. `--td-accent`, `--td-canvas`) onto the root `div` as the viewport crosses each scene.
4. **Mouse parallax** — pointer-fine devices only; normalized −1..1 fed to `ScrollContext`.
5. **Returning-visitor fast-path** — `localStorage(SKIP_FLAG_KEY)` banner + skip button jumps to `#door`.
6. **DepthRail** — a fixed left gauge showing depth −8…+8 as the user scrolls.

**20-scene manifest order** (confirmed in `DescentExperience.tsx`):
hero · thread · spread · problem · layer-1 (Fabrication) · layer-2 (BiasedLens) · layer-3 (Decontextualization) · layer-4 (Timing) · layer-5 (Kill) · layer-6 (Matrix) · layer-7 (Architects) · layer-8 (Unknown) · radius · floor · flip (ClimbTurn) · standard (ONE LAW) · tools (ToolsFilmstrip) · immunity · cognition · door (GatewayDoor)

**The `<Sourced>` primitive** (`shared/Sourced.tsx`):  
Every numeric or factual claim on the page renders through `<Sourced>`. Its TypeScript props *require* a non-empty `source` and `tier` (S/A/B/C). Runtime guard: if either is absent → visible red `⚠ UNVERIFIED` badge (fail loud). If `contested={true}` → violet `CONTESTED` badge. If `corpusCount={true}` → grey `corpus count` label. All data originates in `descent-data.ts` which cites `RESEARCH_VAULT/total_convergence_findings.md` verbatim.

**Use Case:**  
A first-time visitor lands on `/the-descent`. The immersive scroll narrative builds emotional and intellectual urgency about the Egyptian misinformation crisis, presents real sourced statistics, then offers the tools. By the time the user reaches the Gateway Door they understand why the platform exists and are motivated to enter.

---

## 4. BROWSER EXTENSION (MV3)

**Name:** EAL Cognitive Shield Browser Extension  
**Files:** `extension/manifest.json`, `extension/background.js`, `extension/content.js`, `extension/popup.html`, `extension/popup.js`, `extension/README.md`

**Explanation:**  
A Manifest V3 Chrome extension named "EAL — Cognitive Shield · الدرع المعرفي". It runs on Facebook, X/Twitter, YouTube, and WhatsApp Web (plus localhost for development).

**Three interaction surfaces:**

1. **Popup** (`popup.html` + `popup.js`): A 340-px bilingual panel (EN + AR). User pastes a claim into a textarea and clicks "Check · تحقّق". The popup calls the live EAL API endpoint (configurable base URL, defaulting to `http://localhost:3000`) and shows the sourced verdict inline. Bottom settings input lets the user override the base URL to point at production.

2. **Context menu** (`background.js` — service worker): Registers a right-click item "Check this claim with EAL · تحقّق من الادعاء" on text selections. When clicked it sends `{type:"EAL_CHECK", claim}` to the active tab's content script.

3. **In-feed floating button** (`content.js`): On `mouseup` events, if the user has selected text (≥13 chars), a floating "✓ EAL" button appears near the cursor. Clicking it (or via context menu message) calls the real EAL One-Law endpoint and renders the verdict + cited sources inline inside the social feed — with an explicit UNVERIFIED label for unsourced claims. No fake data is ever shown.

**Permissions:** `activeTab`, `contextMenus`, `storage`  
**Host permissions:** facebook.com, x.com, twitter.com, youtube.com, web.whatsapp.com, localhost

**Use Case:**  
A user sees a viral claim on their Facebook feed. They select the claim text; a "✓ EAL" button appears. One click → the platform's One-Law verification runs against real sources and the verdict appears inline in the feed without leaving the page. Defense at the point of exposure.

---

## 5. APP CONFIGURATION & ROOT PROVIDERS

**Name:** Next.js App Config + Root Provider Tree  
**Files:** `next.config.ts`, `src/app/layout.tsx`

**Explanation:**

**`next.config.ts`:**
- `reactStrictMode: true`
- `serverExternalPackages: ["natural", "tesseract.js"]` — NLP and OCR libraries kept server-side
- `eslint.ignoreDuringBuilds: true`, `typescript.ignoreBuildErrors: true` (pragmatic build config)
- **webpack rule** — `*.geojson` files (specifically `egypt-governorates.geojson` used by `/the-descent`) loaded as JSON modules via `type: "json"`
- **turbopack rule** — mirrors the same `*.geojson → json-loader` config for `next dev --turbo`

**Root layout provider tree** (`src/app/layout.tsx`):
```
ThemeProvider
  RTLProvider
    QuarantineProvider          ← science engine isolation
      <a#skip-to-main-content>  ← accessibility
      AuthInit                  ← auth + XP progress auto-save
      Navbar                    ← sticky frosted top bar
      <main id="main-content">  ← page children
      Footer                    ← crisis contacts §28.9
      ExploreHub                ← full-screen tool directory overlay
      <script>                  ← offline Service Worker registration (production only)
```

**ThemeProvider** supports 16 named visual themes (bloodline, dark, light, terracotta, amethyst, olive-meadow, pearl-slate, core-wine, blush-energy, steel-azure, crimson-violet, deep-mocha, espresso-peony, raspberry-space, icy-gunmetal, lilac-cream) plus a `system` mode. Each theme has `scheme: "dark" | "light"` and a description string. A `ContrastMode` of "normal" | "high" is also tracked.

**Offline Service Worker:** registered at `/sw.js` in production, unregistered on localhost. Enables offline access for users with intermittent connectivity.

**OpenGraph metadata** includes `alternateLocale: "ar_EG"` signaling bilingual indexing.

**6 overlay components deliberately removed** from the layout (ScrollProgress, AxeDevtools, NarratorGuide, EngagementLayer, LiveAutopilot, AIAssistant) to maximize focus on content.

**Use Case:**  
Every page on the platform automatically receives RTL support, theme switching, authentication state, crisis-aware footer, offline capability, and the explore-hub overlay — with zero per-page boilerplate.

---

## 6. ONE-LAW CONTENT VALIDATION SCRIPTS

**Name:** One-Law CI Gate (content atom validator + MDX validator)  
**Files:** `scripts/verify-content-atoms.ts`, `scripts/validate-content.ts`

**Explanation:**

**`scripts/verify-content-atoms.ts`** — The One-Law CI gate. Scans all `*.atoms.json` files under `src/content` and `src/data`, validates each atom via `src/lib/content/content-atom#validateAtom()`, and exits non-zero if any atom lacks a real, resolvable source or violates the Islamic authenticity protocol. Designed to be wired into `prebuild` / CI so shipping an unsourced claim becomes a build failure. Comment: "drops in the moment any `*.atoms.json` ships."

**`scripts/validate-content.ts`** — MDX frontmatter validator. Walks `src/content/` recursively for `.mdx` and `.md` files, parses YAML frontmatter with `gray-matter`, normalizes JS Date objects to ISO strings, and validates against the `ContentFrontmatter` Zod schema (from `src/lib/schemas/content.ts`). Handles nested `reviewers[].reviewedAt`, `citations[].archivedAt`, `citations[].accessedAt`, and `correctionsLog` date fields. Exits non-zero on any schema violation.

**Use Case:**  
Running `npx tsx scripts/verify-content-atoms.ts` before a deployment fails the build if any content atom is missing a source. The developer sees which file and atom ID failed, preventing fabricated statistics from ever reaching users.

---

## 7. SCIENCE SMOKE TEST

**Name:** Science API Smoke Test  
**File:** `scripts/science-smoke.mjs`

**Explanation:**  
A Node.js smoke test that spins up the full Next.js production build on a configurable port (default 3021, overridden via `SCIENCE_SMOKE_PORT`), waits for the server to be ready (up to 40 × 500 ms attempts), then fires a battery of real HTTP requests against the science engine's API routes:

- `GET /api/science/journey`
- `GET /api/science/evidence`
- `POST /api/science/refresh`
- `GET /api/science/report`
- `GET /api/science/module/deepreal`
- `GET /api/science/workflow?module=deepreal`
- `POST /api/science/game` (reset + answer rounds)
- `GET /api/science/game?mode=classic`

Each request asserts `response.ok`. For the game endpoint it additionally asserts that the first-choice `id` is a non-empty string. Tears down the server on success or failure.

**Use Case:**  
Run after a production build to confirm the science engine's data pipeline is not broken before deploying to Vercel. Catches route-handler crashes that TypeScript compilation misses.

---

## 8. TEST SUITES

**Name:** Multi-layer test infrastructure (Playwright E2E + Vitest unit)  
**Files:** `playwright.config.ts`, `vitest.config.mts`, `tests/e2e/`, `tests/cognition/`, `tests/safety/`, `tests/load/`, `tests/m2_stress.test.ts`

**Explanation:**

**Playwright E2E** (`playwright.config.ts`):
- `testDir: ./tests/e2e`; serial workers (1), 1 retry, 30s timeout per test
- Serves `npm run start -- -p 3000` or reuses an existing server
- Chromium Desktop Chrome only
- Test files:
  - `a11y.spec.ts` — WCAG 2A/2AA axe-core audit on `/`, `/deepreal`, `/mental-health/depression`, `/sources`; gates only on `impact === "critical"` violations
  - `angry-debunkers.spec.ts` — Claim Debunker tool flow
  - `crisis.spec.ts` — crisis mental-health flow
  - `critical-flows.spec.ts` — landing page structural health (h1 visible, three engine cards, primary CTA navigates to `/dashboard`)

**Vitest unit** (`vitest.config.mts`):
- `@` alias → `./src`; excludes `node_modules`, `.next`, `tests/e2e`, `.agents`
- Loads Next.js env vars via `@next/env` `loadEnvConfig`
- Test files:
  - `tests/m2_stress.test.ts` — M2 backend orchestrator: `withTimeout` exact timing, `classifyEgyptianContext` via mocked `rotatingGenerateObject` (network-free); uses Vitest `vi.mock`
  - `tests/cognition/sm2.spec.ts` — SM2 spaced-repetition algorithm spec
  - `tests/safety/mindframe.spec.ts` — MindFrame safety guardrail spec
  - `tests/load/stress-test.js` — load/stress test

**Use Case:**  
`npx playwright test` runs the E2E suite against the production build to catch broken routes and regressions. `npx vitest` runs the unit suite network-free in CI to validate algorithm correctness and timeout behavior.

---

## 9. CERTIFICATE VERIFICATION SYSTEM

**Name:** Verifiable Cognitive-Immunity Certificate + Public Verify Page  
**Files:** `src/app/verify/[id]/page.tsx`, `src/app/certificate/page.tsx`, `src/app/api/certificate/`

**Explanation:**  
`/verify/[id]` is a public, unauthenticated page that checks whether a certificate UUID is genuine. It calls `GET /api/certificate/generate?id=<uuid>&name=<holder>`. The API returns a `VerifyResult` object with fields: `verified` (bool), `revoked`, `tamperState`, `nameMatch` (anti-impersonation: optional holder name must match), `holder.name/nameAr`, `title_en/title_ar`, `program`, `tier`, `band` (score band EN+AR), `issuedAt`, `curriculumVersion`, `tamperHash`, and `subScores` (MIST-20 score, real-news bias).

Display states: loading → ok (shows full credential) → notfound (honest "no such certificate") → error. The page is bilingual (EN/AR toggle). Tampered or forged signatures display "verification failed."

The page is designed so an employer, institution, or peer can paste the certificate URL and immediately confirm authenticity without logging in — described in code as "turns the credential from theatre into a real, checkable trust signal."

**Use Case:**  
A user completes the 24-week Cognitive Immunity Curriculum and earns a certificate. They share the `/verify/<uuid>` URL with a university admissions office. The admissions officer loads the page, confirms the holder's name matches, sees the score band and tamper hash, and trusts the credential.

---

## 10. GENERATE IMMUNITY DATA SCRIPT

**Name:** Immunity Rumor Data Generator  
**File:** `scripts/generate-immunity-data.js`

**Explanation:**  
A Node.js script that programmatically generates bilingual (EN/AR) structured game-data for the Immunity section. It produces 12 "Rumor Round" scenarios, each with: `id`, bilingual `title` and `scene` text, `prompt`, `objective`, and a `choices` array. Each choice has `id`, bilingual `label` and `effectLabel`, feedback/lesson text, `scoreDelta`, `correct` flag, and `tags` (e.g. `["fear", "urgency"]`). All text is wrapped in a helper `t(en, ar)` function returning `{en, ar}`. Sources are structured as `{label: {en, ar}, url}`.

**Use Case:**  
Running the generator produces a fresh JSON data file for the Bad-News-style prebunking game used in the Immunity section of The Descent. Allows rapid iteration on scenario content without hand-editing a large JSON file.

---

## SUMMARY TABLE

| # | System | Key File(s) | Categories |
|---|--------|-------------|------------|
| 1 | Tool Catalog `/explore` | `src/app/explore/page.tsx` | Navigation, Discovery |
| 2 | MegaNav + RTL/i18n | `mega-nav.tsx`, `rtl-provider.tsx`, `src/data/i18n/*.ts` | Navigation, i18n |
| 3 | The Descent scrollytelling | `the-descent/DescentExperience.tsx`, `descent-data.ts`, `shared/Sourced.tsx` | UX, One-Law |
| 4 | Browser Extension (MV3) | `extension/manifest.json`, `background.js`, `content.js`, `popup.*` | Extension, One-Law |
| 5 | App Config + Root Providers | `next.config.ts`, `src/app/layout.tsx` | Infrastructure |
| 6 | One-Law CI Gate (scripts) | `scripts/verify-content-atoms.ts`, `scripts/validate-content.ts` | Quality, One-Law |
| 7 | Science Smoke Test | `scripts/science-smoke.mjs` | Testing |
| 8 | Test Suites (Playwright + Vitest) | `playwright.config.ts`, `vitest.config.mts`, `tests/**` | Testing |
| 9 | Certificate Verify System | `src/app/verify/[id]/page.tsx` | Trust, Assessment |
| 10 | Immunity Data Generator | `scripts/generate-immunity-data.js` | Tooling |
