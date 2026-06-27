# FILM / ANIMATION TOOLKIT (gathered 2026-06-21) — awaiting go to install + produce
## Goal: cinematic promo film + animated GIFs + art, from the 20 approved /the-descent scenes. Quality bar: "scary good" (sound, pacing, visuals).

## Local machine — render-ready except ffmpeg
✅ Node v24.12, npm 11.6, npx, git 2.52, Python 3.14 (pip via `python -m pip`), **Chrome** (Remotion uses it — no browser download), ImageMagick 7, **OBS Studio**, **Clipchamp**, MPC-HC. ❌ **ffmpeg NOT installed** (the one must-install). ❌ gifski (optional).

## Toolchain (ranked)
1. **Remotion** — React→MP4/WebM. THE fit: our scenes are already React/CSS/tokens (`descent-theme.ts` 3 zones). Build in a SEPARATE sibling project (not inside the Next app). `npm create video@latest` (Blank) or `npm i remotion @remotion/cli @remotion/transitions`; render `npx remotion render <Comp> out/film.mp4`; `--sequence` for PNG frames (→GIF). Uses Chrome + ffmpeg.
2. **ffmpeg** — encode/concat/mux audio, letterbox/grain filters, GIF via palettegen/paletteuse. `winget install Gyan.FFmpeg` or `npx remotion install ffmpeg`.
3. **OBS Studio** (installed) — capture the LIVE /the-descent scroll as raw cinematic footage (fastest first cut + real product hero shot).
4. **Clipchamp** (installed) — timeline assemble/edit/export 1080p–4K (burn Arabic RTL text in Remotion to be safe).
5. **Manim** (Python) — optional explainer motion. ⚠️ Python 3.14 wheels may lag → use a 3.12 conda env or skip (our data-viz is already React/d3).
- GIFs: ffmpeg palettegen (baseline) / gifski (max quality) / `anthropic-skills:slack-gif-creator`.
- Art/keyframes: `mcp__visualize__show_widget` (SVG/HTML), figma/canva generate+export, `algorithmic-art`, `canvas-design`, `web-artifacts-builder`, `theme-factory`.
- Music/SFX (CC0, mux w/ ffmpeg): Pixabay, Mixkit, 99Sounds, Bensound. ⚠️ AI music needs an external service (Suno/Udio) — none as MCP here.

## FILM — 75s promo (Hook→Problem→Stakes→Solution→CTA), graded per the 3 zones, letterbox 2.39:1, grain, slow push-ins
- 0–6s **HOOK** — Thread/WhatsApp cold-open («الأنسولين كذبة…») · notification SFX → silence.
- 6–20s **PROBLEM** — Pull + Gap · «مش غباء — ده تصميم» + 14.5% count-up · rising drone.
- 20–38s **STAKES** — Blast-radius shockwave → Floor · 5 domains expand → cut to **silence** on «دي القاع».
- 38–46s **THE FLIP** — palette swap red→cyan (the signature token flip), camera inverts up · key-change uplift.
- 46–64s **SOLUTION** — One-Law + Arsenal + Cognitive-Immunity + Cognition · tools light up, gold wash · confident build.
- 64–75s **CTA** — Door opens to light · «بتخرج قادر تشكّك… ادخل ←» · resolve chord.
- No-VO v1 (kinetic bilingual type + sound design); optional VO v2 later. Build: OBS quick-cut ∥ Remotion frame-exact final; assemble/mux in Clipchamp/ffmpeg; export 16:9 + 9:16.

## GIF loops (2–4s, seamless, ≤5MB): the Flatline · the Spread · the Blast-Radius · the Flip · the Door. Remotion `--sequence` → gifski/ffmpeg.

## INSTALL CHECKLIST (on user's go — nothing installed yet)
1. **ffmpeg**: `winget install Gyan.FFmpeg` (or `npx remotion install ffmpeg`). 2. **Remotion** (sibling folder): `npm create video@latest`. 3. (opt) gifski `npm i -g gifski`. 4. (opt) Manim on a 3.12 env. 5. Download CC0 music/SFX.

## References
Remotion docs (render/install/ffmpeg) · gifski.ski · ffmpeg high-quality-GIF (blog.pkh.me/p/21) · Awwwards Storytelling/Immersive collections · hook-body-CTA frameworks (sovran.ai, ckstudio) · editing rhythm/pacing (lwks, skillmanvideogroup) · sound-design-vs-music (indieshortsmag) · Pixabay/Mixkit/99Sounds/Bensound.

> Tied to [[gateway-the-descent-page]] + [[eal-feature-inventory]]. Status: **READY — awaiting go** (no media produced).
