# EAL — Cognitive Shield (browser extension)

Defense at the point of exposure (Gap 5). A Manifest V3 extension that checks any
claim against the Egyptian Awareness Library's **One-Law verification pipeline** —
returning real, cited sources, or a loud **UNVERIFIED** when nothing admissible
backs the claim. No fake data.

## What it does
- **In-feed button:** select text on Facebook / X / YouTube / WhatsApp Web → a
  floating `✓ EAL` button appears → click it → the verdict + cited sources render
  inline.
- **Right-click menu:** "Check this claim with EAL · تحقّق" on any selection.
- **Popup:** paste a claim → get the verdict, the UNVERIFIED banner if unsourced,
  and the source links.

It calls the real endpoint `POST {base}/api/ai/chat` with `{ message, mode: "claim" }`
— the same One-Law pipeline the website uses (academic-API retrieval + Cohere
rerank + the source-grade enforcer).

## Load it (unpacked)
1. Run the EAL app locally (`npm run dev`, default `http://localhost:3000`).
2. Open `chrome://extensions`, enable **Developer mode**, click **Load unpacked**,
   and select this `extension/` folder.
3. Open the popup and set the **EAL base URL** if not localhost.

## Notes
- No build step, no dependencies — plain MV3.
- For production, point the base URL at the deployed EAL instance and tighten
  `host_permissions` / CORS as needed.
