# 09 — MASTER PLAN (EAL Campaign)

> Governed by `00_THE_SCIENTIFIC_STANDARD.md`. This plan operationalizes the Standard across the
> whole project **without breaking existing features**. Every page → exactly one **category** ×
> one **pillar**, mounts the **Scientific Shield**, and passes the **4-line methodology contract**.

---

## 1. THE MAP — 2 CATEGORIES × 4 PILLARS

```
                 │ SCIENTIFIC          │ RELIGIOUS            │ MENTAL                │ SOCIETY
─────────────────┼─────────────────────┼──────────────────────┼───────────────────────┼─────────────────────────
 VERIFICATION    │ DeepReal, evidence, │ hadith-check, fatwa- │ (screening tools,     │ angry-debunkers, misinfo-
 (check an       │ forensic-image,     │ context, authority-  │ symptom-vs-stigma     │ atlas, rumor-heatmap,
  artifact vs    │ forensic-c2pa,      │ verifier, quran-     │ checkers — evidence-  │ threat-map, trend-hunter,
  reality →      │ paper-auditor,      │ context, sectarian-  │ based, never          │ live-deception, osint-
  verdict +      │ reverse, whatsapp-  │ detector, halal-     │ diagnostic)           │ investigator, threat-
  provenance)    │ analyzer            │ finance, zakat       │                       │ briefing, blackbox
─────────────────┼─────────────────────┼──────────────────────┼───────────────────────┼─────────────────────────
 COGNITION       │ critical-thinking,  │ religion-hub         │ mental-health         │ six-layers, philosophy,
 BUILDER         │ fallacy-engine,     │ exercises, Maqāṣid,  │ literacy, womens-     │ debate-sim, bias-
 (build durable  │ assessment (MIST),  │ RCOPE coping         │ shield, mens-shield,  │ fingerprint, reaction-
  mental defense │ science             │ assessment           │ stigma reduction      │ test, dashboard,
  → measured     │                     │                      │                       │ certificate
  skill)         │                     │                      │                       │
```

**Rule of placement:** does the page *check something* (→ Verification) or *change the user* (→ Cognition Builder)? If it does both, split it or pick its primary output.

---

## 2. PER-PILLAR REAL SOURCE / TOOL STACK (the anti-generic backbone)

| Pillar | Canonical real sources (Tier S/A) | Real methodology (coded, not LLM) |
|---|---|---|
| **Scientific** | OpenAlex, Semantic Scholar, Crossref, Europe PMC, DOAJ, PubMed; InVID/WeVerify, C2PA, exifr | Evidence aggregation + tiering; EXIF/ELA/C2PA forensic algorithms; retraction checks |
| **Religious** | Quran.com / Tanzil, Sunnah.com, HadithAPI, Dorar, Dar al-Iftāʾ, Al-Azhar | Isnād grading **from the source** (Ṣaḥīḥ→Mawḍūʿ); tafsīr context; Maqāṣid mapping |
| **Mental** | MHLS (α=.873), GHSQ (r=.86), Brief RCOPE (α=.90/.81), WHO/CDC literacy | Validated instruments' **real items + scoring keys + published norms** |
| **Society** | Google Fact Check / ClaimReview, AFP/Reuters feeds, CAPMAS, fact-check timestamps | SIR/SEIR diffusion math; cui-bono/temporal forensics; OSINT method |

If a cell has no real source for a page → that page is **framework/educational**, labelled as such.

---

## 3. COMPETITOR & OSS MAP (study method, integrate open tools — §15)

> ✅ **Verified version is Standard §17 — The Verified Arsenal** (researched 2026-06-20, with sources +
> caveats). Use §17 as the authoritative tool/source registry; the table below is the planning sketch.

| Need | Strongest competitor (study) | Open tool to integrate |
|---|---|---|
| Claim spotting | Full Fact AFC, Logically | **ClaimBuster API**, ClaimReview schema |
| Image/video forensics | (closed) InVID partners | **InVID/WeVerify**, C2PA SDK, exifr/ExifTool |
| Source credibility | NewsGuard | OpenAlex/Crossref tiering (ours) |
| OSINT | Bellingcat toolkit | reverse-image, Wayback, geolocation method |
| Inoculation/cognition | Cambridge: *Bad News*, *GoViral!*, *Harmony Square* | open inoculation **technique taxonomy** |
| Arabic dialect NLP | (closed) | **CAMeL Tools / Farasa** |
| Fact-check graph | Google Fact Check Tools | ClaimReview + our Evidence Aggregator |

**Deep-research checkpoint:** before integrating any of these, run the `deep-research` skill to verify
current API availability + capability (training knowledge may be stale). Never present a competitor's
output as ours unsourced.

---

## 4. EXECUTION SEQUENCE (disciplined chunks — no mass breakage)

- **Phase 0 — Foundation** ✅ done: Standard + `src/lib/standard/` (`layers`, `sources`, `schema`,
  `system-prompt`, `cognition`). `/angry-debunkers` migrated + stress-tested.
- **Phase 1 — Philosophy showcase** (next): present the full Standard creatively on `/philosophy`
  (the constitution as an interactive feature) + chatbot + explainer.
- **Phase 2 — Build the shared Scientific Shield component** once (fed by `cognition.ts`+`layers.ts`),
  so every page mounts it in ~10 lines.
- **Phase 3 — Pillar sweeps, page by page**, each: fill 4-line contract → wire real source + coded
  method → mount Shield → chatbot (specific technique) → explainer + scenario → build → **stress test** →
  fix. Order: Society (the 3 "VERY BAD" pages first) → Scientific → Religious → Mental.
- **Phase 4 — Rename** every page to a strong scientific name (one pass, after features are real).
- **Phase 5 — Full regression stress test** + fix.

Each page is its own checkpoint. We do not advance a pillar until its pages pass §7 + §16.

---

## 5. PER-PAGE CONTRACT TEMPLATE (fill before coding each page)

```
PAGE: /<route>
CATEGORY: Verification | Cognition-Builder
PILLAR: Scientific | Religious | Mental | Society
1. CANONICAL SOURCE/DATASET: <real API/DB>
2. PUBLISHED METHODOLOGY + CITATION: <algorithm + paper>  (deterministic? yes/no)
3. LLM ROLE: narration only — abstains when: <condition>
4. PROOF TEST: <how we verify it's real>
SHIELD: layers surfaced → cognition.ts techniques applied
RENAME (Phase 4): <strong scientific name>
```

---

## 6. NON-NEGOTIABLES (carried from the Standard into every step)
- Real source or coded method, or honest UNVERIFIED. No mock, no generic "critical thinking."
- Specific cognition technique per layer (§12). Scientific Shield on every analytical page (§13).
- Philosophy + Standard referenced in every page header + chatbot.
- Build green + stress test before a page is "done." Fix every error found.
