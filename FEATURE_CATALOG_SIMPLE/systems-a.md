# Cross-Cutting Systems — Part A (plain-language)

> This file covers 10 platform-wide features: how the site is explored, navigated, introduced, extended into your browser, built, protected from fake content, tested, verified, and prepared for games. Every explanation is written for someone with zero technical background.

---

## 1. Tool Catalog — the "Explore" page

### Platform-Wide Tool Catalog

**What it is:** Think of this as the front page of a library — a single place where every tool on the platform is listed, organized into 10 topic shelves (like "Defense Tools," "Mental Health," "Islamic Verification," etc.). You can type any word — say "deepfake" (a fake video made by a computer) or "hadith" (a recorded saying of the Prophet) — into a search box and instantly find the right tool. There are 91 tools across those 10 shelves, and the site claims 130+ pages and 20+ live AI tools. New tools are marked with a pulsing "NEW" badge so you never miss them. The page works in both English and Arabic, and the whole grid adjusts automatically whether you are on a phone or a computer screen.

**When it helps you:** You heard the platform has a tool that checks whether a religious saying is authentic, but you have no idea where it is. You open the Explore page, type "hadith," and the exact tool appears in seconds — no hunting through menus.

---

## 2. Navigation System — the top menu bar

### Mega-Navigation with Bilingual and Right-to-Left Support

**What it is:** This is the big menu bar that runs across the top of every page. It has five main sections. When you hover over any section a wide dropdown opens and shows you six links inside it, each with a small description so you know what to expect before clicking. The menu reads and writes in both English and full Arabic (as well as Egyptian dialect Arabic). When you switch to Arabic the entire layout flips — text starts from the right side of the screen instead of the left (this is called RTL, short for "right-to-left," because Arabic is written that way). The dropdown also stays inside the screen no matter how narrow your window is. Your language choice is saved, so the next time you visit the site it remembers which language you prefer.

**When it helps you:** Your grandmother wants to use the platform but only reads Arabic. You switch the language to Arabic for her; the entire site immediately flips to right-to-left layout, all menus appear in Arabic, and the font changes to a clear Arabic typeface. She can navigate by herself from then on.

---

## 3. "The Descent" — the platform's opening story

### "The Descent" Scrollytelling Gateway Experience

**What it is:** "Scrollytelling" means a story that unfolds as you scroll down — like turning pages, but on a screen. "The Descent" is the dramatic opening experience of the platform. As you scroll you travel through 8 layers that describe how misinformation (false or misleading information spread to deceive people) spreads in Egypt: from completely made-up stories, to one-sided framing, to real events taken out of context, to lies timed perfectly for maximum damage. Then the story "climbs back up," shows you the antidote — the platform's tools and the single rule it lives by (every claim must have a real, checkable source) — and delivers you to the main library through a gateway door. The whole journey is backed by real statistics, each one labelled with its source. If any statistic lacks a proper source, the page shows a bright red warning label instead of hiding it. There is also a depth gauge on the left side of the screen so you always know how deep into the story you are.

**When it helps you:** You arrive at the site with no idea why misinformation in Egypt is a serious problem. By the end of The Descent you have seen the real scale of the crisis, understand the 8 ways people are deceived, and feel motivated to use the tools — all in one immersive scroll.

---

## 4. Browser Extension

### EAL Cognitive Shield Browser Extension

**What it is:** A small add-on you install in your Chrome browser (like a mini-app that lives inside the browser). Once installed, it watches Facebook, X (formerly Twitter), YouTube, and WhatsApp Web. It gives you three ways to check a claim without ever leaving the page you are on:

1. **Pop-up panel** — click the EAL icon in your toolbar, paste any claim, hit "Check," and get a verdict with sources right there.
2. **Right-click menu** — select any text on screen, right-click, and choose "Check this claim with EAL" from the menu that appears.
3. **Floating button** — select text anywhere in your social-media feed; a small "✓ EAL" button pops up near your cursor. One click runs the verification and shows the result inside the feed itself.

If a claim cannot be verified with a real source, the result says "UNVERIFIED" — the extension never invents an answer.

**When it helps you:** You are scrolling Facebook and see a post claiming a certain medicine cures cancer. You select the text, the "✓ EAL" button appears, you click it, and a verdict with cited sources appears right below the post — without opening a new tab.

---

## 5. App Configuration and Root Providers

### Next.js App Configuration and Root Provider Tree

**What it is:** Every time any page on the platform loads, an invisible "setup layer" runs first and wraps the entire site in several protective and helpful services — like putting a set of invisible layers around every room in a building before anyone enters:

- **Theme layer** — gives you 16 colour themes (dark, light, terracotta, amethyst, and more) to choose the look that is easiest on your eyes.
- **Language/direction layer** — makes the RTL flip (right-to-left for Arabic) work everywhere automatically.
- **Science isolation layer** — keeps the science tools in a separate area so they cannot accidentally interfere with other parts of the page.
- **Skip-to-content link** — lets people who navigate with a keyboard (rather than a mouse) jump straight to the main content, which is important for people with disabilities.
- **Auth layer** — keeps your login state and saves your learning progress automatically.
- **Offline layer** — a small background helper (called a "service worker") saves key parts of the site so you can still read them when your internet connection drops.
- **Map support** — the map data for Egypt's regions (used in The Descent) is loaded as a proper data file.
- **Crisis-aware footer** — every page has a footer that includes emergency mental-health contacts.

Six optional overlay features were deliberately switched off to keep the site focused and fast.

**When it helps you:** You open the platform on a slow connection in a rural area. Even if the internet cuts out, the service worker lets you keep reading material you already loaded. When your connection returns, everything syncs back automatically.

---

## 6. One-Law Content Validation Scripts

### One-Law CI Gate (content atom validator and MDX validator)

**What it is:** Two automatic checking programs that run before anything new is published on the site — like a security guard at a door who checks every piece of content for a valid ID before letting it through.

- **Content atom validator** — scans every small chunk of factual content (called a "content atom" — think of it as a single sourced claim stored as a tiny data file). If any chunk is missing a real, working source, or if a religious claim does not meet the Islamic authenticity rules, the entire publishing process stops and the developer is told exactly which claim failed and why.
- **MDX validator** — MDX files are text files that mix writing with interactive elements (like a Word document that can also run code). This validator checks that every such file has its required header information (title, author, date, citations, etc.) filled in correctly before publication.

Both programs produce an error message that stops the site from going live if anything fails.

**When it helps you:** A contributor accidentally writes that "scientists proved X" without linking to any study. Before that claim can reach you, the validator catches it, refuses to publish, and tells the developer exactly where the problem is — so you only ever see verified claims.

---

## 7. Science Smoke Test

### Science API Smoke Test

**What it is:** A short automated "health check" program that runs after the site is built but before it is released to the public. It starts up the full platform, waits until it is ready, then sends a series of quick test requests to the science section's back-end routes (the "API routes" — the invisible pipes that supply data to the pages). It checks that every pipe responds correctly: the learning journey, the evidence feed, the report generator, the module data, the quiz game, and more. If any pipe gives a bad response the test fails and the release is blocked.

**When it helps you:** You never interact with this directly, but it protects you: every time a developer ships an update, this check confirms the science tools actually work end-to-end before your browser ever tries to load them.

---

## 8. Test Suites

### Multi-Layer Test Infrastructure (End-to-End and Unit Tests)

**What it is:** Two layers of automated testing that run before the platform is published — like rehearsing a play in full costume (one layer) and also testing each actor's lines separately (the other layer):

- **End-to-end tests (Playwright)** — a robot browser pretends to be a real user, opens the site, and performs real journeys: checking accessibility (whether the site is usable for people with visual or motor disabilities), checking the claim-debunker tool flows correctly, checking the mental-health crisis flow, and confirming the landing page is structurally healthy (correct headline visible, engine cards present, main button navigates to the dashboard). Accessibility violations that could block a disabled user from using the site will cause the test to fail.
- **Unit tests (Vitest)** — smaller tests that check individual algorithms without needing the whole site running: the spaced-repetition (a method of reminding you of things just before you are about to forget them) scheduling algorithm, the mental-health safety guardrails, timeout behavior, and the Egyptian-context classifier.

**When it helps you:** A developer updates the debunker tool. Before the update goes live, the robot browser replays the full debunking flow and confirms it still works. If something broke, the release is blocked and you never see a broken page.

---

## 9. Certificate Verification System

### Verifiable Cognitive-Immunity Certificate and Public Verify Page

**What it is:** When you complete the platform's 24-week learning programme (the "Cognitive Immunity Curriculum"), you receive a certificate with a unique ID — like a digital diploma with a serial number. Anyone in the world can go to the `/verify/<your-ID>` page, type your name, and instantly confirm the certificate is real. The page shows: whether the certificate is genuine or has been tampered with (changed by someone), the holder's name in English and Arabic, the programme name, the score band (how well you performed), and the date it was issued. If someone fakes a certificate or changes the name on it, the page shows "verification failed" — it is impossible to forge successfully. No login is needed to verify.

**When it helps you:** You earn your certificate and include the verify link on your university application. The admissions officer opens the link, sees your name, score, and a tamper-proof confirmation that the certificate is real — and trusts it, just as they would trust a verified university transcript.

---

## 10. Immunity Rumor Data Generator

### Immunity Rumor Data Generator

**What it is:** A program that automatically writes the game scenarios used in the platform's prebunking game (a "prebunking game" teaches you to recognize manipulation tricks before you encounter them in real life — like a vaccine for your brain). It generates 12 "Rumor Round" scenarios in both English and Arabic. Each scenario has a situation description, a question, and several choices to pick from. Each choice tells you what effect it would have, explains why it is right or wrong, and shows you what manipulation tags it exploits (like "fear" or "urgency"). Running this program produces a ready-to-use game data file instantly, instead of someone having to type all 12 scenarios by hand.

**When it helps you:** The team wants to add new scenarios about vaccine rumours circulating on WhatsApp. They run the generator, get a fresh bilingual data file in seconds, and the game is updated — without any risk of typos or mismatched Arabic/English pairs from hand-editing.
