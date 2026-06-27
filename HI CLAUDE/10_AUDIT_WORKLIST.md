# 10 — AUDIT WORKLIST (grounded, 2026-06-20)

> Produced by a 90-page audit workflow (91 agents) reading the real files. This is the campaign
> roadmap. Source of truth for which page to fix next and what its "first fix" is.

## Scoreboard
- 90 pages audited. **Mean 45 · median 42 · min 8 · max 82. Zero pages ≥ 86.**
- Bands: **0–30 (critical): ~20** · **31–60 (broken): ~38** · **61–85 (near): ~31** · **86–100: 0–1**
- **73/75 use hardcoded colors** (only `/mawarith`, `/chatbot`, `/philosophy`, `/master-roadmap` clean)
- **47 have mock data** · 28 missing chatbot · 27 missing explainer · 33 missing API call
- **Universal gap:** 0 pages render the One Law inline (`sources[{title,url,tier}]` + confidence + Scientific Shield) → build it ONCE as a shared component.

## The 2×4 Tool Matrix
| | Scientific | Religious | Mental | Society |
|---|---|---|---|---|
| **Verification** | effect-dashboard, angry-debunkers, blackbox, live-deception, kill-list, deepreal, deepreal-forensics, deepreal-upload, forensic-image, forensic-c2pa, paper-auditor, reverse, sovo, god-system, evidence, drug-checker, health-data, medical-life, others-search, six-layers, rumor-heatmap, trend-hunter, misinfo-atlas | religion-hub, hadith-check, fatwa-context, sectarian-detector, authority-verifier, quran-context, halal-finance, arabic-shield | dashboard | whatsapp-analyzer, womens-shield, threat-map, threat-briefing |
| **CognitionBuilder** | curriculum/phase2, fallacy-engine, epistemology, critical-thinking, debate-sim, science, stat-power, assessment, self-test-protocol | curriculum/phase3, zakat-calculator, mawarith | depression, mental-health, comb-tracker, transformation, curriculum/phase0-1, cognitive-lab, manipulation-cards, bad-news, reaction-test, inoculation-passport, peer-challenge, swarm-debate, bias-detector, bias-fingerprint, mens-shield, baseline | fight-back, family-kit |

Platform/meta (not in matrix): knowledge-graph, curriculum/phase4, ai-editor, chatbot, ai-agents, prompt-lab, nvidia-hub, certificate, supervisor, connect, global-alliance, platform-guide, competition-demo, master-roadmap, why-us, impact, philosophy, about, open-source, sources, tools-download, ux-science.

## Top-12 highest-impact "first fix" (do first)
| # | Page | Score | First fix | Real method |
|---|---|---|---|---|
| 1 | deepreal-forensics | 8 | delete `mockResults`; wire real forensic API | exifr + C2PA + HF AI-detection + /api/search/evidence |
| 2 | ux-science | 13 | per-hook citations; add explainer+chatbot | OpenAlex per nudge/dark-pattern |
| 3 | knowledge-graph | 15 | tokenize D3 colors; surface sources; wire /api/search/evidence | Evidence Aggregator |
| 4 | curriculum/phase0 | 15 | replace mock curriculum; run Defense Pipeline | peer-reviewed curriculum + Evidence API |
| 5 | authority-verifier | 15 | RETRIEVE (Dar al-Ifta) before AI verdict | Dar al-Ifta + Al-Azhar + Sunnah.com |
| 6 | mawarith | 15 | cite Q4:11-12; add mandatory chatbot | Quran.com + Dar al-Ifta, ≥2 madhabs |
| 7 | rumor-heatmap | 15 | remove `Math.random()` velocity; wire real feed | Google Trends/WHO + SEIR math |
| 8 | supervisor | 18 | replace mock cohort with LMS/xAPI | real cohort API |
| 9 | zakat-calculator | 18 | live gold/silver price | CBE/commodity API + AAOIFI |
| 10 | effect-dashboard | 24 | kill hardcoded effect sizes (d=0.82) | /api/assessment + Evidence + consensus |
| 11 | connect | 25 | real leaderboard/profile API | backend |
| 12 | competition-demo | 22 | tokenize colors; guided walkthrough | — |

## Closest-to-done (quick wins)
1. `/self-test-protocol` (82) — DOI links + token color-mix + Cronbach α tables
2. `/philosophy` (82) — hyperlink citations + add chatbot *(build already green; agent flagged an import to re-verify)*
3. `/assessment` (78) — replace rgba fallbacks + live OpenAlex citation counts
4. `/depression` (72→improved) — ✅ safety gate + chatbot + explainer done; remaining: persistence + full color tokens
5. `/chatbot` (72) — tier badges + self-critique + deception-layer mapping

## Most-broken (rebuild-grade)
deepreal-forensics (8), ux-science (13), knowledge-graph (15), curriculum/phase0 (15), authority-verifier (15), mawarith (15), rumor-heatmap (15)

## Universal closeout (apply to EVERY page before sign-off)
1. Swap all hex/rgba → `var(--…)` theme tokens (keep semantic severity colors as tokens too).
2. Mount **`<ScientificShield>`** — sources[{title,url,tier}] + HIGH/MEDIUM/CONTESTED/UNVERIFIED confidence + layer + defense evidence chip on every factual block.
3. Embed **PageAIChatbot** (RAG via /api/search/evidence) + on-page **explainer** + the page's **specific cognition technique** (§12).
4. Build green + **test + devil-test** before "done".

## Known per-page bugs the audit caught (fix in passing)
- `/cognitive-lab` + `/manipulation-cards`: payload bug — send `text` not `claim`.
- `/fallacy-engine`: only 5 fallacies wired; integrate the full ALL_FALLACIES (50+).
- `/mental-health`: shows only 5 PHQ items scored /15 — mislabeled as PHQ-9; use full 9-item /27.
- `/blackbox`, `/rumor-heatmap`: `Math.random()` used for scores/velocity — remove.
