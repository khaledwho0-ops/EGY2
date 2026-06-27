# Antigravity Conversation Context Export
# Exported: 2026-06-20T01:08:00+03:00
# For use with Claude Code

## What Was Being Worked On (Main Build Session)

The user was in a 12-hour build session revamping the entire platform.
The core task was: "Revamping Scientific And Religious Toolkits"

### Requirements Given:
1. All pages must have REAL functionality — NO mock data, NO placeholder content
2. Every page needs AI chatbot integration using the Gemini Mega-Rotator
3. Each chatbot needs unique multi-layered system prompt specific to that page's domain
4. UI/UX must be premium quality throughout
5. All pages must be accessible from the explore/navigation — no hidden pages
6. Navigation must be logical (next/prev within same category)
7. Quick explanation with real scenarios on how to use each page and its chatbot
8. Page names should be scientific and linked to project philosophy (not generic)

### Pages That Were Being Updated/Fixed (from user's explicit list):
- Hadith Authenticity Checker (religion-hub/tools)
- Women's Psychographic Shield (womens-shield)
- Men's Mental & Crisis Shield (mens-shield)
- Forensic C2PA (forensic-c2pa)
- Forensic Image (forensic-image)
- Trend Hunter — "UI, UX, and logic is VERY BAD"
- Live Deception — "UI, UX, and logic is VERY BAD"
- Epidemiological Rumor Heatmap (rumor-heatmap)
- Patient Zero Threat Map (threat-map)
- Misinfo Atlas — "UI, UX, and logic is VERY BAD"
- Daily Threat Briefing (threat-briefing)
- Dashboard
- Awareness Certificate (certificate)
- Reaction Speed Test (reaction-test)
- Socratic Debate Simulator (debate-sim)
- Cognitive Bias Fingerprint (bias-fingerprint)
- Critical Thinking Ladder (critical-thinking)
- Fallacy Engine (fallacy-engine)
- Phase 0: Psychological Calibration (assessment)

### Pages That Were Open When Session Stopped:
- others-search/page.tsx (19KB)
- baseline/page.tsx (18KB)
- osint-investigator/page.tsx (23KB)
- assessment/page.tsx (32KB)
- blackbox/page.tsx (33KB)

### Key Technical Context:
- The Gemini Mega-Rotator with 14 API keys is at: src/lib/ai/
- Evidence APIs are at: src/app/api/search/evidence/
- The debunking pipeline has known bugs (see HANDOFF_AND_STRATEGY.md)
- All pages use "use client" pattern with inline state
- i18n is at src/lib/i18n/ with [lang] dynamic routes
- Framer-motion is used for animations
- Recharts/D3/Three.js for data viz

## Conversation IDs (107 total in Antigravity)
- Main Build: 56ec5322-d068-4e95-a62c-bfe55d4f2878 (701KB transcript)
- Handoff: 6c6c1d58-4359-4b7a-a050-ea3fc8a6a140 (69KB transcript)
- Strategy: 1cd153f9-cba8-40dd-aa5f-cae5575caf15 (this session)
