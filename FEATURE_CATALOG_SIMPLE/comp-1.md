# UI Components — slice comp-1 (plain-language)

Every feature from `src/components/**/*.tsx` items 1–51, rewritten for anyone with zero technical background.

---

## Root-level utilities

### Honest loading bar (AnalysisProgress)

**What it is:** When you ask the website to check something and it takes a while, this shows you a moving progress bar — like a progress bar on a download. It fills up gradually and only shows "done" when the work is actually finished. It never lies and shows "done" in 0.8 seconds when it actually took 20 seconds.
**When it helps you:** You paste a suspicious WhatsApp message into the fact-checker. Instead of staring at a frozen screen for 15 seconds, you see a bar slowly filling up so you know the tool is working.

### Loading bar stage names (AnalysisProgress — stage sets)

**What it is:** A ready-made list of short descriptions (like "Reading the text…", "Checking sources…") that appear inside the loading bar for five different tools. Think of it as the subtitles that play while the tool is thinking.
**When it helps you:** Each tool (fake-news checker, WhatsApp checker, image checker, etc.) shows you its own set of step names so you understand what the tool is doing at each moment.

### Arabic loading labels (AnalysisProgress — bilingual stage labels)

**What it is:** Every step description in the loading bar has two versions — one in English, one in Arabic. The bar automatically shows the right language and flips its direction for Arabic (which reads right to left instead of left to right — this is called RTL, meaning "right to left").
**When it helps you:** If you are using the site in Arabic, all the loading messages appear in Arabic, reading in the correct direction, with no extra steps needed.

### Color-coded loading bar (AnalysisProgress — configurable accent color)

**What it is:** The color of the loading bar can be changed to match whichever tool is running. So the image-forgery tool might show a blue bar while the fake-news tool shows a red bar.
**When it helps you:** When you use several different tools in one session, the colors help you quickly tell which tool is currently working.

---

### Collapsible how-to panel (ToolGuide)

**What it is:** A small "How to use this tool" section that you can click to open or close — like a folding instruction card attached to the tool. It can start open (for new users) or folded away (for people who already know how to use it).
**When it helps you:** You land on a new page and are not sure what to do. You click the panel open and get a simple explanation without having to search for a help page.

### Who this tool is for (ToolGuide — who-it-helps blurb)

**What it is:** A short paragraph in both English and Arabic that tells you in plain language who the tool is designed to help (for example: "This tool is for anyone who receives religious claims on social media and wants to check them quickly").
**When it helps you:** Before you use a tool, you read two sentences and immediately know whether it is relevant to your situation.

### Step-by-step instructions (ToolGuide — numbered step list)

**What it is:** A numbered list (1, 2, 3…) of exactly what to do to get a result from the tool — like a recipe. Each step has a colored number badge to make it easy to follow. Both English and Arabic versions are shown.
**When it helps you:** Instead of figuring out how to use a new tool by trial and error, you follow the numbered steps and get a result on your first try.

### Try a real example button (ToolGuide — ready-example scenario buttons)

**What it is:** A row of buttons labeled with real-life examples (for example: "Try: Viral health rumor"). When you click one, it automatically fills the tool's input box with that example text so you can immediately see the tool working — no typing required.
**When it helps you:** You are curious about the tool but do not have a suspicious message on hand. You click a button and instantly see a full demonstration using a real Egyptian example.

### Category tags on example buttons (ToolGuide — per-scenario category tags)

**What it is:** Each example button can show a small colored label saying what category the example belongs to — for instance "health", "religion", or "politics".
**When it helps you:** If you care about one topic (say, health misinformation), you can pick the example that matches your concern instead of clicking through all of them.

---

## Admin (tools for the researchers and supervisors who run the platform)

### Study launch readiness checker (ResearchGovernancePanel — participant launch gate)

**What it is:** A dashboard panel that reads a checklist of conditions that must all be true before a research study can be opened to participants. It shows a green "ready" signal when everything is in order, or an orange "not yet" signal with a list of what still needs to be done.
**When it helps you:** A research supervisor checks this panel before opening the study. It prevents accidentally starting a study before safety and ethics conditions are met.

### Language path selector (ResearchGovernancePanel — participant language selector)

**What it is:** A switch that lets the research team choose whether participants will use the English version of the study tools or the Arabic version. Choosing Arabic locks out any tool that has not yet been validated (proven to work correctly) in Arabic.
**When it helps you:** It stops researchers from accidentally giving Arabic-speaking participants a tool that was only designed and tested in English — which would produce unreliable results.

### Reviewer approval records (ResearchGovernancePanel — reviewer sign-off records)

**What it is:** A set of cards — one for each major study tool — that record who reviewed it, on what date, and any notes they left. Like a sign-off sheet that proves each tool was checked by a qualified person before being used with real participants.
**When it helps you:** An auditor or ethics board can open this panel and immediately see proof that each tool was formally reviewed.

### Tool validation check (ResearchGovernancePanel — instrument readiness check)

**What it is:** An automatic check that confirms every measurement tool (questionnaire or test) has been validated for the language the participants will use. "Validated" means it has been scientifically tested to produce accurate results in that language.
**When it helps you:** It prevents the embarrassing — and scientifically useless — situation of running a study with a questionnaire that was never tested in the participants' language.

### Main research question display (ResearchProtocolPanel — project protocol overview)

**What it is:** A highlighted box showing the main question the research study is trying to answer, written in plain language. Like a reminder poster on the wall of a lab saying "this is what we are trying to find out."
**When it helps you:** Supervisors and auditors can glance at this panel and immediately recall the study's core purpose without reading a lengthy document.

### Sub-questions table (ResearchProtocolPanel — sub-research questions table)

**What it is:** A table that lists all the smaller questions that together make up the main research question, and shows how each smaller question connects back to the main one.
**When it helps you:** An auditor can trace the logic of the study — every smaller question has a clear reason for being there.

### Hypotheses and failure conditions table (ResearchProtocolPanel — falsifiable hypotheses table)

**What it is:** A table listing every prediction the study makes (for example: "people who complete the training will spot fake news more often"), plus the opposite prediction (the "null hypothesis" — the case where the training makes no difference), and the exact condition under which the prediction would be proven wrong. "Falsifiable" means the prediction can be tested and potentially proven wrong — good science requires this.
**When it helps you:** Researchers and ethics reviewers can confirm that the study is designed to reach a real conclusion rather than cherry-pick favorable results.

### Full protocol tables (ResearchProtocolPanel — sampling strategy and evaluation protocol)

**What it is:** Additional tables showing how participants will be selected ("sampling"), how often measurements will be taken, and what counts as success or failure for the study.
**When it helps you:** Any supervisor or external auditor can see the complete study plan in one place without looking up separate documents.

### Source health overview (SourceCommandCenter — registry health summary cards)

**What it is:** Six summary cards showing the health of the platform's database of verified sources — for example, how many sources are confirmed, how many are missing web links, how many need to be re-verified soon.
**When it helps you:** A platform operator can check these six numbers in seconds and know whether the source database is in good shape or needs urgent attention.

### Outdated sources list (SourceCommandCenter — stale/critical sources list)

**What it is:** A list of up to eight sources that either have not been checked in a long time ("stale") or are in a critical state, shown with the number of days since they were last verified and a suggested action.
**When it helps you:** An operator knows which sources to re-check first, without having to manually scan hundreds of entries.

### Missing information panel (SourceCommandCenter — metadata gap panel)

**What it is:** A panel that flags sources that are missing a web link, missing a backup copy, or waiting for local confirmation. "Metadata" just means the basic information about a source — its web address, author, date, etc.
**When it helps you:** It ensures that when a user is shown a source to support a claim, the platform can actually link them to it. Sources with missing links would dead-end the user.

### Research supervisor navigation (SupervisorDashboard admin — multi-tab navigation sidebar)

**What it is:** A sidebar with eight labeled tabs (Overview, Protocol, Cohort Operations, Engine Analytics, Hypothesis Tests, Governance, Source Operations, Exports). Each tab opens a different section of the study management dashboard. "Cohort" means the group of participants in the study.
**When it helps you:** A supervisor manages every aspect of the study from one screen instead of hunting through separate pages.

### Participant data manager (SupervisorDashboard admin — cohort participant management)

**What it is:** Tools that let the supervisor save a snapshot of participant data, import participant files collected from multiple devices, and remove individual participants from the dataset.
**When it helps you:** When participants use the platform on different computers or phones, the supervisor can combine all their data into one place for analysis.

### Participation bar charts (SupervisorDashboard admin — engine analytics bar charts)

**What it is:** Bar charts (the kind with vertical rectangles of different heights) showing how many participants are actively using or have completed each learning module (DeepReal for fake images, Mental Health, Religion Hub).
**When it helps you:** The supervisor can instantly see if one module is barely being used and investigate why.

### Intervention pie chart (SupervisorDashboard admin — intervention pie chart)

**What it is:** A pie chart (a circle divided into colored slices) showing how often participants clicked on recommended sources, used suggested prompts, completed a verification step, or skipped the intervention entirely.
**When it helps you:** The supervisor sees whether participants are actually engaging with the learning tools or skipping past them.

### Data export (SupervisorDashboard admin — defense pack export)

**What it is:** A button that generates and downloads a file containing all the study data collected so far.
**When it helps you:** The supervisor can take the data offline for deeper analysis in a spreadsheet or statistics program, or archive it for record-keeping.

### AI provider status (SupervisorDashboard admin — AI provider status panel)

**What it is:** A panel showing which AI services the platform currently has working connections to. If one AI service is down, this panel shows it in red.
**When it helps you:** If users are getting poor or broken AI responses, the supervisor checks here first to see if an AI provider has gone offline.

### All-in-one study dashboard (SupervisorDashboard admin — embedded governance, protocol, and source panels)

**What it is:** The supervisor dashboard pulls together the governance panel, the protocol panel, and the source health panel into a single screen with tabs. You don't have to open three separate pages.
**When it helps you:** Everything a supervisor needs to run and audit the study is accessible from one place.

---

## Assessment (scientific questionnaires used in the study)

### Multi-questionnaire runner (AssessmentEngine — multi-instrument question renderer)

**What it is:** A system that can display six different validated scientific questionnaires (MIST-20 — a test that measures how well you spot misinformation; MHLS — a mental-health literacy scale; Brief RCOPE — a religious coping scale; GHSQ — a help-seeking intentions questionnaire; SUS — a usability scale; MC-SDS — a social desirability scale). Each questionnaire has its own question format — some use a sliding scale from "strongly disagree" to "strongly agree" (called a Likert scale), some are yes/no, and some ask you to judge whether a headline is real or fake.
**When it helps you:** Participants complete before-and-after questionnaires directly on the website as part of the research program, without the supervisor having to use a separate survey tool.

### Step-by-step question navigation (AssessmentEngine — step-by-step question navigation)

**What it is:** Previous and Next buttons that move you through a questionnaire one question at a time. You cannot move forward without answering the current question. When you answer the last question, your score is automatically calculated.
**When it helps you:** It prevents participants from skipping questions by accident, which would make their results scientifically invalid.

### Reversed-item scoring (AssessmentEngine — reversed-item scoring)

**What it is:** Some scientific questionnaires include questions that are intentionally worded in the opposite direction (for example, rating "I never worry about things" on a worry scale). The system automatically flips the score for those questions before calculating the total.
**When it helps you:** Scores are always correct even for questionnaires with tricky reverse-scored items, without the participant needing to know about it.

### Tamper-proof score submission (AssessmentEngine — zero-trust server action submission)

**What it is:** When you finish a questionnaire, your answers are sent directly to a secure server for storage. The website does not let you modify your score inside the browser before it is saved. "Zero-trust" means the system does not assume the browser is telling the truth — it re-validates everything on the server side.
**When it helps you:** In a research context, this ensures that participants cannot manipulate their scores, keeping the study data clean and honest.

### Bilingual questionnaire text (AssessmentEngine — bilingual question text)

**What it is:** Every questionnaire question has an English version and optionally an Arabic version. The system automatically shows the correct language and adjusts text direction.
**When it helps you:** Arabic-speaking participants complete the questionnaires in Arabic, which is essential for producing valid research results.

---

## Baseline (tools that measure your starting point before training)

### Clickbait susceptibility test (ThumbnailTrapTest — Emotional Trigger Susceptibility measurement)

**What it is:** You are shown 12 video thumbnail images — 6 with emotionally charged headlines (scary, outrage-inducing, shocking) and 6 with calm, neutral headlines — in a fixed mixed order. The test records which type you click first and how many of each type you click overall. This measures your "Emotional Trigger Susceptibility" (ETS) — basically, how easily sensational titles pull your attention away from neutral ones.
**When it helps you:** Before starting the training program, this test establishes your personal baseline — how susceptible you are to clickbait right now. After training, you take it again to see if you improved.

### ETS score calculation (ThumbnailTrapTest — ETS score calculation)

**What it is:** After the test, the system subtracts the percentage of neutral thumbnails you clicked from the percentage of emotional thumbnails you clicked. A high positive number means you strongly prefer emotional content; a number near zero means you treat both equally.
**When it helps you:** Researchers and participants get a single number that summarizes clickbait susceptibility, making it easy to compare before and after training.

### Click order recording (ThumbnailTrapTest — click order tracking)

**What it is:** The test records not just what you clicked, but the full sequence — which thumbnail you clicked first, second, third, and so on.
**When it helps you:** Researchers can study whether training changes not just overall click rates but also whether people stop going for the emotional thumbnail as their very first click.

---

## Calm / Animation utilities

### Smooth page scrolling (CalmRoot — Lenis smooth scroll)

**What it is:** Instead of the page jumping instantly when you scroll, it glides smoothly (like a gentle wave) using a library called Lenis. The smoothness can be turned off automatically if your device is set to reduce motion (a standard accessibility setting for people who get dizzy from animation).
**When it helps you:** The whole website feels calmer and more comfortable to navigate, especially on long pages with lots of content.

### Content fade-in as you scroll (Reveal — scroll-triggered fade-in)

**What it is:** As you scroll down a page, each section gently appears by fading from invisible to visible while rising slightly. This is called a scroll-triggered animation.
**When it helps you:** Information appears one section at a time as you reach it, making the page feel organized and less overwhelming rather than dumping everything on screen at once.

---

## Chatbot

### Comfortable text entry box (ChatInput — auto-resizing textarea)

**What it is:** The box where you type your message to the AI grows taller automatically as you type more text (up to a limit), instead of forcing you to scroll inside a tiny fixed-height box.
**When it helps you:** If you want to paste a long suspicious message into the chatbot, the text box expands to show all of it clearly.

### Automatic Arabic text direction (ChatInput — Arabic auto-direction)

**What it is:** When you start typing Arabic letters, the text box automatically switches to right-to-left direction (the way Arabic is naturally written). If you type in English, it stays left-to-right. It detects the language as you type, not after you finish.
**When it helps you:** You can switch between Arabic and English mid-message without pressing any settings button — the box just works in whichever language you are typing.

### Press Enter to send (ChatInput — Enter-to-send / Shift+Enter new-line)

**What it is:** Pressing Enter sends your message. Pressing Shift and Enter at the same time adds a new line instead of sending. This is the same behavior as WhatsApp and most messaging apps.
**When it helps you:** You can type multi-line messages without accidentally sending them, and you do not need to reach for a "Send" button.

### Send button lock during processing (ChatInput — loading lock)

**What it is:** While the AI is preparing its response, the text box and the Send button are temporarily disabled so you cannot accidentally send another message before the first one is answered.
**When it helps you:** Prevents confusion from double-sending the same question and getting two overlapping responses.

### Chat bubbles (ChatMessage — role-aware bubble layout)

**What it is:** Your messages appear in bubbles on one side; the AI's messages appear in bubbles on the other side — exactly like a standard messaging app. The layout flips appropriately for Arabic (right-to-left) vs English (left-to-right). Each side has a small icon to identify who is speaking.
**When it helps you:** You can glance at the chat and immediately know which messages are yours and which are the AI's, even in a long conversation.

### Copy message button (ChatMessage — copy-to-clipboard)

**What it is:** A small "Copy" button on each message. Clicking it copies the full text to your clipboard. A small checkmark appears for a moment to confirm the copy worked. This works on phones too, which handle copying differently.
**When it helps you:** You want to share the AI's explanation with a family member — you tap Copy and paste it into WhatsApp.

### Sources panel (ChatMessage — source/citation panel)

**What it is:** AI responses that are backed by real sources show a "Sources" button. Clicking it opens a list of the sources with their titles and links.
**When it helps you:** You can verify the AI's answer yourself by clicking through to the actual studies, articles, or official websites it used. This is the platform's core "no unsourced claims" rule made visible.

### Thumbs up / thumbs down (ChatMessage — reaction thumbs)

**What it is:** Each AI message has a thumbs-up and thumbs-down button. Your reaction is saved locally on your device so if you come back later the button stays in its chosen state.
**When it helps you:** You can quickly flag a response as helpful or unhelpful, giving feedback without writing anything.

### Delete and retry buttons (ChatMessage — delete/retry actions)

**What it is:** Each message has a delete button (removes it from the conversation) and a retry button (asks the AI to answer the same question again, in case the first answer was unsatisfactory).
**When it helps you:** If the AI gives a confusing answer, you can hit Retry to get a fresh attempt without retyping your question.

### AI provider label (ChatMessage — provider/model/latency metadata)

**What it is:** Below each AI response, small faint text shows which AI service answered (e.g. "Google Gemini"), which exact version of the model was used, and how many milliseconds it took to respond.
**When it helps you:** You can see exactly which AI answered your question. If one AI service is producing poor answers, you can mention it to the platform team.

### Markdown text renderer (MarkdownRenderer — lightweight markdown parser)

**What it is:** AI responses often include formatting like **bold text**, bullet points, numbered lists, and headings. This component converts those formatting codes (called "markdown") into nicely formatted text you can read. It does this without adding extra weight to the page.
**When it helps you:** AI answers appear clearly formatted with headers, lists, and highlights instead of raw code symbols like asterisks and hashes.

### Safety filter on AI text (MarkdownRenderer — DOMPurify XSS sanitization)

**What it is:** Before the formatted AI response is displayed, it passes through a safety filter (called DOMPurify) that removes any hidden malicious code that could have been embedded in the AI's output. "XSS" (cross-site scripting) is a type of attack where harmful code is hidden inside text — this filter stops that.
**When it helps you:** Protects you from a rare but real risk where a bad actor manipulates the AI into outputting code that could attack your browser.

### Arabic response direction (MarkdownRenderer — RTL-aware direction)

**What it is:** Arabic responses are automatically displayed right-to-left; English responses left-to-right. The renderer wraps the text in the correct direction tag.
**When it helps you:** Arabic AI responses look correct and natural, not jumbled or reversed.

### Chat mode switcher (ChatSidebar — mode switcher)

**What it is:** A sidebar with five chat modes — General conversation, Wellness support, Fact-Checking, Translation, and Academic research — each shown with a color badge. Clicking a mode changes how the AI responds (its "personality" and rules for that mode).
**When it helps you:** You switch to Fact-Check mode before pasting a suspicious article link, so the AI focuses on verification rather than general conversation.

### Conversation history with search (ChatSidebar — session history with search)

**What it is:** The sidebar shows a list of your previous conversations grouped into "Today" and "Older." A search box lets you type a word and filter the list to conversations whose titles contain that word.
**When it helps you:** You had a conversation last week about a health claim and want to find it again. You type a keyword and it appears immediately without scrolling.

### New and delete conversation (ChatSidebar — new/delete session)

**What it is:** A button to start a brand new blank conversation and a button to delete an existing one. A "clear all" button removes all conversation history at once.
**When it helps you:** You can keep your conversation list clean, just like managing chats in WhatsApp or any messaging app.

### Mode description (ChatSidebar — mode info expand)

**What it is:** Each chat mode has an expandable section that, when clicked, shows a short description of what that mode does.
**When it helps you:** Before switching to "Academic" mode, you click the expand arrow and read a description so you know what to expect.

### Sidebar drawer on mobile (ChatSidebar — mobile overlay)

**What it is:** On a small phone screen, the sidebar appears as a full-screen panel with a semi-transparent background behind it (called an overlay), so it looks like a drawer sliding over the content.
**When it helps you:** The sidebar works comfortably on phones without covering the chat permanently or getting in the way.

---

## Debate

### Five-attacker debate training (LiveSwarmDebate — 5-archetype AI debater swarm)

**What it is:** Five AI characters attack you simultaneously, each using a different manipulation tactic: one attacks you personally instead of your argument (Ad-Hominem), one cherry-picks only evidence that supports their side, one pretends to be a religious authority to sound credible (False-Authority Sheikh), one frames everything as a grand conspiracy (Conspiracy Framer), and one dismisses evidence by claiming everything is a deepfake (Deepfake Skeptic). A "deepfake" is a fake photo or video made using AI. You must identify which trick each one is using and compose a counter-argument.
**When it helps you:** You practice recognizing real manipulation tactics that people use on social media before you encounter them in the wild.

### Response scoring (LiveSwarmDebate — per-agent response scoring)

**What it is:** After you respond to each attacker, your response is scored on three things: how logically sound it is, whether you correctly identified the manipulation trick, and whether you stayed calm without emotional escalation.
**When it helps you:** You get specific, actionable feedback — not just a pass/fail — so you know exactly what to improve.

### Round-based session (LiveSwarmDebate — round-based session management)

**What it is:** The debate is structured into a fixed number of rounds. The system tracks which round you are on, running totals of your scores, and shows a final summary when you finish all rounds.
**When it helps you:** The exercise has a clear beginning and end, so you know how long it will take and can see your total score at the end.

### Bilingual attacker names (LiveSwarmDebate — bilingual agent names)

**What it is:** Each of the five AI attackers has a name in both English and Arabic.
**When it helps you:** Arabic-speaking users recognize each attacker type in their own language, making the exercise easier to follow.

---

## Defense pages (tools for preparing and rehearsing a live presentation of the platform)

### Route risk panel (BackendFocusPanel — route risk classification panel)

**What it is:** A panel showing all the website's internal paths ("routes" — like pages), divided into four groups: paths that are safe to show live, paths that need no API key (login credential) to work, paths that carry risk in a live demo, and paths that depend on backend services that might be unavailable. "API" stands for "Application Programming Interface" — it is how the website communicates with external services like AI providers.
**When it helps you:** Before a live presentation, the presenter can see at a glance which parts of the website are safe to demonstrate live and which to avoid.

### Full page inventory (DefensePagesMap — full page inventory with filter/sort/search)

**What it is:** A complete list of every page on the platform, with tools to search by name, filter by category or risk level, and sort in different ways. There are 15 filter presets ready to use.
**When it helps you:** A presenter quickly finds any specific page in a large catalog before a live demonstration.

### Card and table view toggle (DefensePagesMap — card/table view toggle)

**What it is:** A toggle that switches the page list between two views: a "card" view where each page gets its own detailed tile, and a "table" view where everything is in a compact rows-and-columns format.
**When it helps you:** Cards give rich detail for rehearsal; the table gives a clean overview that is easier to print or scan quickly.

### Tested-route tracker (DefensePagesMap — tested-route tracker)

**What it is:** A checkbox next to each page that is saved on your device (in the browser's local storage). You tick off each page as you test it during rehearsal, and you can reset all ticks with one button before the real presentation.
**When it helps you:** You never lose track of which pages you have already tested during a rehearsal session.

### Presenter priority strip (DefensePagesMap — presenter-mode panel)

**What it is:** A highlighted strip showing only the most important pages in the order they should be demonstrated, with a short note about what to do on each one.
**When it helps you:** During a live defense, the presenter follows this strip step by step instead of navigating the full list.

### Backend risk context (DefensePagesMap — backend-focus panel integration)

**What it is:** The backend risk panel (see BackendFocusPanel above) is embedded directly below the page list so both are visible at the same time.
**When it helps you:** You do not need to switch between two separate screens to check route safety and page details simultaneously.

### Color-coded page card (PageMapCard — risk-coded route card)

**What it is:** Each page in the list gets a card showing its name, a color-coded badge indicating how safe it is to demo, another badge showing its risk level, and a checklist of things to verify before marking it as tested.
**When it helps you:** At a glance, the presenter can see whether a page is green (safe), amber (caution), or red (risky) without reading long descriptions.

### Direct page link (PageMapCard — direct route link)

**What it is:** A button on each card that opens that specific page in a new browser tab directly.
**When it helps you:** The presenter can jump straight from the rehearsal card to the actual live page with one click.

### Copy test steps (PageMapCard — copy demo-step markdown)

**What it is:** A copy button that copies the test checklist for a page as formatted text (markdown) so you can paste it into a notes document or message.
**When it helps you:** The presenter can build a written rehearsal document from the platform itself without retyping anything.

### Compact page table (PageMapTable — compact sortable route table)

**What it is:** A single scrollable table listing every page with columns for its path, status, risk level, category, what kind of backend it needs, what logic it demonstrates, a tested checkbox, and buttons to open or copy it.
**When it helps you:** You can scan the entire platform at once in a condensed format — useful for a printed overview sheet.

### Ordered test steps display (PageTestChecklist — test-step checklist display)

**What it is:** A numbered list of exact steps to follow when testing a specific page, displayed with checkbox styling inside a page card.
**When it helps you:** The tester knows precisely what to do — and in what order — to confirm a page is working before marking it as ready.

### Search and filter toolbar (PagesMapToolbar — search + filter + sort bar)

**What it is:** A sticky bar (it stays at the top as you scroll) with a search box, 15 category filter buttons you can click to narrow the list, a sort selector, and the card/table view toggle.
**When it helps you:** No matter how far down the page list you scroll, the search and filter tools are always reachable.

### Export full route report (PagesMapToolbar — export route report)

**What it is:** A copy button that copies a complete formatted report of every page — all details in one go — as markdown text.
**When it helps you:** The presenter or team lead can paste the full route inventory into a shared document with one click.

### Print presenter checklist (PagesMapToolbar — print presenter checklist)

**What it is:** A copy button that outputs a condensed checklist version — just the key pages and their actions — formatted for printing.
**When it helps you:** The presenter prints this checklist and holds it during the live defense as a physical reference card.

### Reset buttons (PagesMapToolbar — clear tested / clear filters)

**What it is:** Two reset buttons — one clears all the "tested" checkboxes, the other removes all active filters.
**When it helps you:** Between rehearsal sessions you reset the tested checkboxes cleanly, and between different filter views you clear filters without reloading the page.

### Live defense step-by-step strip (PresenterModePanel — priority route presenter strip)

**What it is:** A panel showing the highest-priority pages in presentation order. Each entry shows the page title, its path, a one-line statement of what it proves, its risk level, the exact action to take while demoing, and an Open button.
**When it helps you:** During a live defense or presentation, the presenter reads down this strip step by step to demonstrate the most impactful parts of the platform without improvising.

---

## Defense (main defense plan components)

### Copy button (CopyButton — clipboard copy with fallback)

**What it is:** A button that copies text to your clipboard (like pressing Ctrl+C). If your browser is old and does not support the modern clipboard method, it automatically falls back to an older method. A small checkmark appears for 2 seconds to confirm the copy worked.
**When it helps you:** Any time you want to copy generated text, scripts, or reports from the platform, this button handles it reliably across all browsers and devices.

### Color-coded information card (DefenseCard — tone-coded info card)

**What it is:** A card-shaped container for content that uses a colored border to signal its tone — neutral (grey), good (green), warning (amber), danger (red), or information (blue). The style is a semi-transparent "glass" look.
**When it helps you:** You scan a defense plan page and immediately spot the red-bordered card that signals "this is risky" or the green card that signals "this is solid."

### Page link inside a card (DefenseCard — route link chip)

**What it is:** If a card is about a specific page on the platform, it shows a small clickable chip with an arrow that takes you directly to that page. If the path is external or not directly navigable, it shows a non-clickable chip instead.
**When it helps you:** You are reading about a page in the defense plan and want to immediately open it — you click the chip instead of navigating manually.

### Status and badge labels (DefenseCard — status and badge labels)

**What it is:** Small uppercase label chips that can appear in the card header — for example "MUST SHOW LIVE" or "BACKUP DEMO" — to tag the card with a status at a glance.
**When it helps you:** The presenter instantly knows which cards represent things that must be demonstrated and which are backup options.

### Demo-worthy pages grid (DefenseCommandCenter — powerful pages grid)

**What it is:** A grid of cards — one per "powerful page" — showing each page's route, current live status, and a description of what makes it impressive to demonstrate.
**When it helps you:** The presenter opens this grid to see which pages will make the strongest impression during a live demonstration.

### Stress test results (DefenseCommandCenter — stress-test results)

**What it is:** Cards showing which difficult adversarial scenarios the platform has been deliberately tested against, with a badge showing whether it PASSED, PARTIALLY passed, or was PREPARED for.
**When it helps you:** If an evaluator asks "what happens if someone tries to break this?", the presenter can point to these results to show the platform was stress-tested.

### Doctor-attack scenarios (DefenseCommandCenter — doctor-attack scenarios)

**What it is:** Cards preparing the presenter for tough medical-misinformation challenges — the kind a doctor or health-expert evaluator might throw at the platform — each with a list of evidence responses.
**When it helps you:** The presenter rehearses responses to medical-accuracy challenges rather than being caught off-guard.

### Live demo scripts (DefenseCommandCenter — live demo scenarios)

**What it is:** Step-by-step, time-stamped scripts for exactly how to run specific demos during the live defense, telling the presenter what to say and what to click at each moment.
**When it helps you:** The presenter follows a rehearsed script rather than improvising, reducing the chance of stumbling or going off-track.

### Emergency and recovery scripts (DefenseCommandCenter — emergency scripts and recovery lines)

**What it is:** Pre-written responses for when something goes wrong live — for example if a page fails to load or an AI call times out. These are short phrases the presenter can say to recover composure, plus copy buttons.
**When it helps you:** Instead of freezing when something breaks live, the presenter clicks Copy and reads the recovery line naturally.

### Do-not-show and what-not-to-say lists (DefenseCommandCenter — do-not-show and what-not-to-say lists)

**What it is:** Explicit lists of pages and statements to avoid during the defense — things that are incomplete, risky, or likely to invite embarrassing questions — along with a "brutal honesty" section acknowledging known limitations.
**When it helps you:** The presenter avoids accidentally demonstrating an unfinished feature or making a claim the platform cannot yet back up.

### Executive one-liner (DefenseCommandCenter — executive lock summary)

**What it is:** A concise summary card containing a single sentence that captures the platform's core value proposition for non-technical evaluators.
**When it helps you:** When a decision-maker asks "but what does this actually do?", the presenter reads this one sentence.

### Section wrapper (DefenseSection — eyebrow-title-description section wrapper)

**What it is:** A layout block that wraps any content section with a small label above the heading (called an "eyebrow"), a main heading, and a description paragraph — providing a consistent look across all defense-plan sections.
**When it helps you:** Every section of the multi-part defense plan looks visually consistent and professional.

### 10-part tab bar (PartNavigation — sticky 10-part tab bar)

**What it is:** A horizontal row of numbered tab buttons (1 through 10) that sticks to the top of the screen as you scroll. The button for the section you are currently reading is highlighted. You can click any number to jump to that part of the defense plan.
**When it helps you:** The defense plan is split across 10 parts. This tab bar lets you jump between any two parts instantly without going back to a main menu.

### Home link in tab bar (PartNavigation — hub link)

**What it is:** The first item in the tab bar always links back to the main defense plan overview page.
**When it helps you:** If you are deep inside Part 7 and want to go back to the beginning, you click the hub link instead of pressing the browser back button multiple times.

---

## Dev (developer tools, not shown to regular users)

### Accessibility error finder (AxeDevtools — axe accessibility audit injection)

**What it is:** A tool that only runs on the developer's computer (never on the live website) and automatically scans every page for accessibility problems — things that would make the site difficult to use for people with disabilities (e.g. missing labels on buttons, poor color contrast). It prints a list of problems in the developer's browser console every second. "WCAG" stands for Web Content Accessibility Guidelines — the international standard for accessible websites.
**When it helps you:** Developers catch accessibility problems during building rather than discovering them after launch when fixing them is harder.

---

## Engagement (tools that encourage you to keep learning)

### Points and daily streak (EngagementLayer — XP and streak tracker)

**What it is:** Every time you visit a new page on the platform, you earn XP (experience points — like in a video game). Your current XP total and a "streak" counter (showing how many days in a row you have visited) are saved on your device so they persist even after you close the browser.
**When it helps you:** You are more motivated to come back each day when you can see your streak growing and your XP increasing — the same principle behind Duolingo's daily streak.

### Progress map (EngagementLayer — visited-pages tracker)

**What it is:** The system remembers which pages you have visited and calculates what percentage of the full platform you have explored (out of 15 tracked pages). This percentage is shown in the engagement panel.
**When it helps you:** You see "You've explored 60% of the platform" and are nudged to visit the remaining sections you have not seen yet.

### Motivational messages (EngagementLayer — motivational toast messages)

**What it is:** When you visit a page, a short motivational message briefly appears (like a toast notification — a small pop-up that fades away). The messages rotate through six options and are written using an anchoring technique — mentioning large impressive numbers to make you feel part of something significant.
**When it helps you:** The message gives you a moment of encouragement and makes the experience feel warmer than a purely functional website.

### "Others are exploring this" counter (EngagementLayer — simulated social-proof counter)

**What it is:** A counter showing a number like "47 others exploring right now." The number is randomly generated to create the feeling that many people are using the platform at the same time. This uses a psychological principle called "social proof" — people feel more confident in their choices when they see others making the same choice.
**When it helps you:** If you feel uncertain about spending time on a topic, seeing that many others are exploring it makes it feel more worthwhile.

### Time-on-page counter (EngagementLayer — time-spent counter)

**What it is:** A visible counter showing how many seconds you have spent on the current page.
**When it helps you:** Seeing time pass makes you more conscious of how much time you are investing in learning, which can encourage deeper reading rather than skimming.

### Floating engagement panel (EngagementLayer — collapsible floating engagement panel)

**What it is:** A small floating panel (like a widget attached to the corner of the screen) that you can tap to open or close at any time. When open, it shows your XP progress bar, your streak, a map of pages you have visited, and a motivational message.
**When it helps you:** Your progress is always one tap away from any page, but it stays out of the way when you do not need it.

---

## Evidence (tools that find real scientific research to back up claims)

### Academic research search (EvidenceAggregatorPanel — multi-database academic search)

**What it is:** When you or a tool needs to find real peer-reviewed evidence for a claim, this searches seven academic databases at once — OpenAlex, Semantic Scholar, Europe PMC, DOAJ, arXiv, CORE, and Crossref — and groups the results by which database found them. "Peer-reviewed" means the research was checked by other experts before being published.
**When it helps you:** Instead of manually searching multiple research databases, one search finds evidence across all of them simultaneously.

### Evidence quality badges (EvidenceAggregatorPanel — trust-band badges)

**What it is:** Each result gets a badge — A, B, or C — showing how trustworthy that piece of evidence is, based on which database it came from and what information is available about it.
**When it helps you:** You can immediately focus on the A-grade results and know the C-grade ones deserve more skepticism, without having to evaluate each source yourself.

### Free/paid access labels (EvidenceAggregatorPanel — access-tier badges)

**What it is:** Each result is labeled as "Free" (you can read the full article at no cost), "Mixed" (some parts are free), or "Paid" (requires a subscription or payment to read).
**When it helps you:** You know before clicking whether you can actually read the full article, saving time and frustration.

### Expandable abstract cards (EvidenceAggregatorPanel — expandable abstract cards)

**What it is:** Each search result appears as a card. You can click to expand a card and read the full abstract (the short summary that appears at the start of a research article), how many times the paper has been cited by other researchers, and source details.
**When it helps you:** You can quickly decide whether a paper is relevant to your question without leaving the page to open the full article.

### Arabic source name labels (EvidenceAggregatorPanel — bilingual source labels)

**What it is:** Each database name is translated into Arabic and shown in Arabic when the interface is in Arabic mode.
**When it helps you:** Arabic-speaking users understand which database each result came from without needing to recognize English database names.

### Include paid results toggle (EvidenceAggregatorPanel — paid-source toggle)

**What it is:** A switch that, when turned on, includes results from paid academic journals in the search. When turned off, only free results are shown.
**When it helps you:** If you have access to an academic library subscription, you turn this on to see more complete results; otherwise you leave it off and only see what you can actually read.

---

## Exercises

### Draft-then-reveal exercise player (ScenarioResponsePlayer — draft-before-reveal player)

**What it is:** An exercise where you are shown a real-life scenario (for example: a friend tells you their grief is probably depression), you type your own response, and then an expert model response is revealed for you to compare. You write your answer before seeing the right answer — this forces genuine thinking rather than just recognizing a correct option.
**When it helps you:** You work through mental-health or religion-related social scenarios and compare your instinctive response to what an expert would say, improving your real-world communication.

### Progress bar in scenarios (ScenarioResponsePlayer — progress bar with reveal state)

**What it is:** A progress bar that counts your position through the set of scenarios. Revealing the expert answer is counted as completing one step.
**When it helps you:** You see how far along you are in the exercise set so you know how much is left.

### Expert response reveal (ScenarioResponsePlayer — expert response display)

**What it is:** After you reveal, the exercise shows the expert response, a list of what NOT to say or do, and the key insight explaining why the expert response is better. This follows evidence-based feedback timing — you see the correction only after making your own attempt.
**When it helps you:** You learn from contrast — seeing the difference between your instinct and the expert response, and understanding the reason for the difference.

### Bilingual scenario text (ScenarioResponsePlayer — bilingual scenario text)

**What it is:** Every scenario, expert response, and "what not to do" list is available in both Arabic and English.
**When it helps you:** Arabic-speaking users experience the full exercise in their native language, including the subtle wording that makes mental-health and religious scenarios culturally meaningful.

### Source line on scenarios (ScenarioResponsePlayer — source line display)

**What it is:** At the top of each scenario, a line shows where the scenario came from — which study, dataset, or institution produced it.
**When it helps you:** You know the scenario is grounded in real research, not invented by the platform. This is the platform's "no unsourced claims" rule applied to exercise content.

### Arabic language analyzer (ArabicAnalysisCard — Arabic NLP live analysis)

**What it is:** When an exercise contains Arabic text, this tool automatically sends it to a language analysis service (NLP stands for "Natural Language Processing" — it is how computers understand human language). The tool then shows you the emotional tone of the text, hints about which Arabic dialect it is written in, emotionally loaded "trigger words," and any risk flags. This helps you see how the text is constructed to affect emotions.
**When it helps you:** You read a viral Arabic message and the tool highlights which specific words are designed to trigger fear or outrage, helping you recognize the manipulation technique.

### Error display for Arabic analyzer (ArabicAnalysisCard — error state display)

**What it is:** If the Arabic language service is unavailable, a clear warning card appears instead of the analysis. The exercise continues to work normally without crashing.
**When it helps you:** A service outage does not break your exercise session — you see a clear message explaining the service is temporarily unavailable.

### Five-question pause checkpoint (CognitiveFrictionOverlay — 5-gate friction form)

**What it is:** Before proceeding past certain exercises, you are shown five text boxes — one for each of these questions: What is the Claim? What is the Evidence? What is the Context? What emotion is this triggering in me? What are the Consequences of believing this? All five boxes must be filled in before you can move forward. This "friction" (deliberate slowing-down) is designed to interrupt the automatic "believe first, think later" pattern.
**When it helps you:** Your aunt shows you a message saying a vaccine kills children. Before you share it or believe it, the platform makes you stop and consciously answer these five questions — which usually reveals the weakness in the claim.

### Skip only after all gates (CognitiveFrictionOverlay — skip after all gates)

**What it is:** Even if you do not want to fully engage with the friction checkpoint, the Skip button is only available after you have at least seen all five question boxes. You cannot bypass them entirely without scrolling past all five.
**When it helps you:** The exercise prevents the most common avoidance behavior — clicking Skip immediately without engaging at all with the five questions.

### Bilingual friction labels (CognitiveFrictionOverlay — bilingual gate labels and placeholders)

**What it is:** All five question labels and their example placeholder text are available in both Arabic and English.
**When it helps you:** Arabic-speaking users go through the full pause-and-think checkpoint in their own language.

### Suspicious image checker (DeeprealForensicsConsole — deepfake image analysis)

**What it is:** You paste a link to a suspicious image and the tool sends it for analysis. It returns an "authenticity score" — a number showing how likely the image is to be real vs. artificially created or manipulated — along with heatmap data showing which parts of the image look unnatural. A "deepfake" is an image or video made or altered using AI to show something that never happened.
**When it helps you:** You see a shocking photo shared on Facebook claiming to show a real event. You paste the image link here and the tool tells you how likely it is to be genuine.

### Image metadata reader (DeeprealForensicsConsole — metadata analysis)

**What it is:** The tool reads the hidden information embedded inside an image file — called EXIF data (similar to a birth certificate for the photo, recording when and where it was taken, with what device). It shows you whether this information is still present or has been stripped out — which can itself be a warning sign.
**When it helps you:** Real news photos usually retain their camera and location metadata. A manipulated viral photo often has no metadata at all, because the person who edited it removed it.

### Provenance certificate check (DeeprealForensicsConsole — C2PA provenance check)

**What it is:** C2PA (Content Credentials — think of it as a digital certificate of authenticity attached to media) is a new standard where cameras and editing tools can sign media with a verifiable record of its origin and editing history. This tool checks whether an image carries that certificate. If it does, you can trust where it came from. If it does not, that does not prove it is fake — but it means there is no certified origin trail.
**When it helps you:** Major news organizations and camera manufacturers are beginning to use C2PA. If an image carries a valid certificate, you know exactly who created it and what was done to it.

### Reverse image search (DeeprealForensicsConsole — reverse-image search)

**What it is:** The tool searches the internet for other places where the same image (or very similar images) has appeared before, returning matching websites, similarity scores, when the image was first indexed, and notes about context.
**When it helps you:** A photo is being shared claiming to show a recent event in Egypt, but the reverse search reveals it actually first appeared five years ago in a different country — exposing the false context.

### Raw forensic evidence display (DeeprealForensicsConsole — evidence field display)

**What it is:** The tool shows up to six of the underlying signals the forensic AI used to reach its verdict — displayed as simple label-value pairs.
**When it helps you:** Instead of just trusting a "fake" or "real" verdict, you can see the specific technical reasons behind it, building your understanding of how image forensics works.

### DeepReal science explanation (DeeprealScienceBrief — research pillar cards)

**What it is:** Four expandable cards explaining the science behind why the DeepReal exercises are designed the way they are: how misinformation susceptibility is measured (MIST — the Misinformation Susceptibility Test), how "prebunking" (explaining a manipulation technique before you encounter it in the wild) creates resistance, how SIFT (a four-step fact-checking method: Stop, Investigate the source, Find better coverage, Trace claims) and lateral reading (checking a source by looking at what other sources say about it) work, and how the practice exercises are designed.
**When it helps you:** If you wonder "why am I being asked to do this?", you open the relevant card and read the scientific evidence explaining the purpose.

### DeepReal source links with statistics (DeeprealScienceBrief — official source links with stats)

**What it is:** Each explanation card links to the actual published research paper or official source it is based on, along with a key statistic from that source.
**When it helps you:** You can verify the science yourself — the platform does not just claim the training works; it shows you the study that proved it.

### 14-day progress navigator (ExerciseDayNav — 14-day progress navigator)

**What it is:** A grid of 14 buttons, one per day of the training program. Each button shows whether you completed that day, what score you got, and how your confidence changed from before to after the exercise (the "confidence delta"). This information is read from your device's local storage.
**When it helps you:** You can jump to any day to review it, or see at a glance which days you have completed and which are still ahead.

### Score history view (ExerciseDayNav — score vs. completion toggle)

**What it is:** A toggle that switches the day buttons between two views: one showing completion status (checkmarks and lock icons) and one showing the actual score you got on each completed day.
**When it helps you:** After completing the 14-day program, you can scan your score history across all days to see your improvement over time.

### Trophy indicator (ExerciseDayNav — trophy unlock indicator)

**What it is:** A trophy icon appears on a day's button when you have both a before-training and after-training confidence score recorded for that day — meaning the full learning loop was completed.
**When it helps you:** Trophies give visual confirmation that you did the complete exercise (not just the test), reinforcing the habit of doing the full session.

### Universal exercise runner (ExerciseEngine — universal exercise runner)

**What it is:** The core engine that powers every exercise across the entire 14-day program. It handles multiple question types: multiple-choice (MCQ), scenario-based, yes/no (binary), and sliding-scale (Likert). It also manages confidence sliders (before and after the exercise you rate how confident you are), validates your answers, and calculates your score.
**When it helps you:** You experience a consistent, smooth exercise session regardless of which of the three learning tracks (DeepReal, Mental Health, Religion Hub) you are in.

### Pause-and-think integration (ExerciseEngine — cognitive friction integration)

**What it is:** For certain exercise types, the five-gate friction checkpoint (described above) is automatically inserted before you can proceed. The exercise engine decides when to apply it.
**When it helps you:** The pause-and-think checkpoint appears at the right moments without you having to find it separately — it is built into the exercise flow.

### Theory explanation overlay (ExerciseEngine — theory-card overlay)

**What it is:** Each day's exercise is mapped to a psychological theory that explains why the exercise works. The engine shows a "theory card" explaining the psychology, plus a visual chart showing the behavior model behind the exercise (the COM-B model — Capability, Opportunity, Motivation to Behaviour — a framework used in behavior-change science to explain why people do or do not change behavior).
**When it helps you:** Instead of just doing exercises, you understand the psychological science behind each one — turning practice into genuine learning.

### Intervention mode pipeline (ExerciseEngine — intervention mode pipeline)

**What it is:** Each day delivers a different kind of learning "intervention" — for example, one day might show you a verified source, another day might walk you through a bias reflection exercise, another might show an expert video capsule. The engine automatically includes the right intervention type for each day.
**When it helps you:** Each day of the program feels different and targets a specific skill, keeping the training varied and effective.

### Cross-module referral (ExerciseEngine — cross-MVP handoff routing)

**What it is:** Sometimes a DeepReal exercise touches on mental health topics, or a mental-health exercise raises religious questions. When this happens, the engine detects the overlap and shows a "handoff card" suggesting you also visit the relevant other module. "MVP" here means one of the three major learning tracks.
**When it helps you:** Your learning is connected across topics. The platform notices when you should explore a related area and guides you there without you having to figure it out yourself.

### Reading time tracker (ExerciseEngine — dwell-time tracking)

**What it is:** For each question, the engine records how long you spend reading it before answering (called "dwell time"). It computes an "Attention Focus Score" (AFS) — a measure of how carefully you are engaging. Rushing through in 2 seconds suggests skimming; spending a reasonable time suggests careful reading.
**When it helps you:** The system can detect if you are rushing through exercises without really reading them, and can adjust difficulty accordingly.

### XP award on correct answers (ExerciseEngine — XP/gamification award)

**What it is:** Every time you answer correctly, the engine automatically awards XP points, triggers a small celebration animation, and updates your overall program progress.
**When it helps you:** Correct answers feel rewarding immediately, reinforcing the habit of careful thinking.

### Emotional tone analysis on exercise text (ExerciseEngine — NLP sentiment analysis)

**What it is:** The exercise engine quietly analyzes the emotional tone of each exercise's scenario text — measuring how emotionally loaded it is, how manipulative its language is, and whether it contains any crisis signals. It then shows small badges on the text. "NLP" (Natural Language Processing) is the computer science field that deals with understanding human language.
**When it helps you:** You see labels on the exercise text showing you exactly which words carry emotional weight or manipulation patterns — turning the exercise itself into a lesson in spotting these techniques.

### Day navigation within exercise (ExerciseEngine — day navigator integration)

**What it is:** The 14-day progress grid (described above) is embedded directly inside the exercise page so you can jump to any other day without leaving the exercise.
**When it helps you:** You are on Day 9 and want to review Day 3. You click Day 3 in the grid directly from the exercise page — no need to go back to a menu.

### First-time guided tour (ExerciseOnboardingTour — react-joyride step-through tour)

**What it is:** The very first time you open an exercise page, a guided tour automatically starts, using highlighted spotlight boxes and tooltip descriptions to walk you through 3 to 5 key areas of the page — the points and streak panel, the verification console, the scenario area, and optionally the image forensics and support panels.
**When it helps you:** You immediately know where everything is on a complex page without experimenting or feeling lost.

### Tour completion memory (ExerciseOnboardingTour — per-MVP tour completion memory)

**What it is:** Once you complete the guided tour for a module (DeepReal, Mental Health, or Religion Hub), the platform saves a note on your device so the tour never starts again automatically for that module.
**When it helps you:** The tour does not annoy you on every visit — it only runs once per module, then stays out of your way.

### Custom tour per exercise type (ExerciseOnboardingTour — conditional forensics/support steps)

**What it is:** The tour only includes steps for panels that actually exist on the current exercise page. For example, the forensics step only appears on DeepReal exercises that show the forensics console.
**When it helps you:** The tour is always relevant — you are never guided to a panel that is not on your screen.

### Crisis-escalating support panel (ExerciseSupportRail — crisis-sensitive support panel)

**What it is:** A panel showing helpful support resources (a mental health hotline, official religious guidance contacts). Normally it shows in a calm neutral color. If the language analysis detects crisis signals in what you are writing — words indicating severe distress, self-harm, or emergency — the panel turns red and prominently shows the national mental health hotline number (16328 in Egypt).
**When it helps you:** If you are working through a mental-health exercise and start expressing real distress in your text, the platform notices and immediately shows you real help, not just exercises.

### Module-aware support labels (ExerciseSupportRail — module-aware labeling)

**What it is:** The support panel's heading and description change depending on which module you are in — mental health exercises show psychological support framing; religion-hub exercises show religious guidance framing.
**When it helps you:** The support panel feels relevant and appropriate to the topic you are working on, rather than a generic out-of-place message.

### Hidden for fact-checking exercises (ExerciseSupportRail — hidden for DeepReal)

**What it is:** The support panel does not appear at all on DeepReal (image/media forensics) exercises, because those exercises do not involve sensitive mental-health or religious content.
**When it helps you:** The screen stays clean and focused during forensics exercises — no irrelevant panel taking up space.

### Points and level display (GamificationStatus — level and XP progress bar)

**What it is:** A panel showing your current level (like a rank in a game), an XP progress bar showing how far you are from the next level, and the XP target for the next level.
**When it helps you:** You see your overall progression through the entire awareness program in one glance.

### Streak display (GamificationStatus — streak display)

**What it is:** A counter showing how many days in a row you have used the platform.
**When it helps you:** The streak makes your daily habit visible and gives you a reason to come back tomorrow to keep it going — the same motivation behind daily streaks in Duolingo.

### Recent badges strip (GamificationStatus — recent badges strip)

**What it is:** A row showing the two most recently unlocked achievement badges.
**When it helps you:** Right after completing a milestone, you immediately see the badge you just earned, giving a satisfying sense of reward.

### Cohort rank (GamificationStatus — cohort rank percentile)

**What it is:** A number showing what percentage of other participants in your study group you outrank by XP — for example "Top 15%."
**When it helps you:** If you are competitive by nature, seeing that you are near the top of your group motivates you to stay engaged and keep going.

### Module progress (GamificationStatus — MVP program progress)

**What it is:** A display showing how many sessions you have completed and how many total exercises exist in the specific module you are currently working through (separate from your global XP total).
**When it helps you:** You see "8 of 14 sessions completed in DeepReal" and know exactly how much of that specific track remains.

### Mental health science explanation (MentalHealthScienceBrief — research pillar cards)

**What it is:** Four expandable cards explaining the science behind the Mental Health exercises: how mental-health literacy is measured (MHLS — a validated questionnaire), how naming emotions out loud reduces their emotional power (affect labeling — a finding from neuroscience that putting words to feelings calms the brain's alarm response), how literacy changes behavior, and how the practice exercises are designed.
**When it helps you:** You understand why you are doing the exercises, making the learning more meaningful and easier to transfer to real life.

### Egyptian crisis contacts (MentalHealthScienceBrief — Egyptian crisis contacts display)

**What it is:** Official Egyptian support hotline numbers — including the national mental health line (16328), a toll-free number, and the ambulance number — displayed with clear action labels.
**When it helps you:** Anyone reading the science brief who realizes they or someone they know needs help can find the right number immediately, without having to search for it separately.

### Mental health official source links (MentalHealthScienceBrief — official source links)

**What it is:** Links to the World Health Organization (WHO), Egypt's Ministry of Health and Population (MOHP), and academic research papers that back up every claim made in the science brief.
**When it helps you:** Every statement in the brief can be verified by the user directly. Nothing is said without a real source attached.

### Religion-psychology research explanation (ReligionHubScienceBrief — religion-psychology research pillars)

**What it is:** Four expandable cards explaining what the Religion Hub module measures, how positive religious coping (using faith as a healthy resource during hardship) is distinguished from negative religious coping (feeling punished or abandoned by God), where the limits of religious coping are and when professional help is needed, and how the exercises are designed.
**When it helps you:** You understand that the module is grounded in scientific psychology-of-religion research, not opinion — and that it respects faith while also being honest about its limits.

### Official Islamic institution links (ReligionHubScienceBrief — official Islamic institution links)

**What it is:** Links to Egypt's Dar al-Ifta (the official Egyptian institution that issues Islamic legal rulings), the Al-Azhar Observatory (the official Islamic institution that monitors religious misinformation), and Egypt's MOHP mental health platform — each shown with a key statistic.
**When it helps you:** The module's religious content is grounded in official Egyptian Islamic institutions, not anonymous online opinions.

### Theory connection card (SciencePanel — theory connection card)

**What it is:** An expandable card that names the specific psychological theory behind the current exercise, who developed it, in what year, and explains in plain language what the theory says causes the change in behavior.
**When it helps you:** You finish an exercise and click this card to understand the science behind why that exercise was designed the way it was.

### Positive science card (SciencePanel — positive science card)

**What it is:** An expandable card showing what the research says is the constructive, beneficial path — for example "research shows that benevolent reappraisal (finding a charitable interpretation for someone's behavior) reduces conflict" — with the specific mechanism and citation.
**When it helps you:** You see not just what to avoid, but what to actively do instead, backed by a specific study.

### Negative science card (SciencePanel — negative science card)

**What it is:** An expandable card showing what the research warns against and why — explaining the psychological or social mechanism by which a harmful pattern causes harm.
**When it helps you:** Understanding why something is harmful (not just that it is) makes it much easier to recognize and avoid in real life.

### Evidence quality label (SciencePanel — evidence trust-band display)

**What it is:** A color-coded label next to each scientific claim showing how strong the evidence behind it is, using a tiered scale from Tier 1 (strongest — large randomized controlled trials) down through Tier 5 (weakest — expert opinion only), plus an "Applied" tier for real-world implementation studies. It also shows what type of study the evidence comes from.
**When it helps you:** You instantly know whether a claim is backed by dozens of large clinical studies or just one expert's opinion — helping you calibrate how much weight to give it.

### Panel display mode filter (SciencePanel — display mode filtering)

**What it is:** The science panel can be set to show its full content, or only the theory card, or only the positive-science card, or only the negative-science card. Each exercise chooses which mode fits best.
**When it helps you:** Exercises that only need you to understand the theory do not clutter the screen with the positive and negative science cards.

### Claim priority classifier (VerificationConsole — claim priority scoring)

**What it is:** You type a claim and the tool classifies it into one of three categories: NFS (Needs Fact-Checking Soon), UFS (Urgently Fact-Check), or CFS (Critical to Fact-Check Immediately), using an automatic analysis.
**When it helps you:** When you are confronted with multiple suspicious claims at once, this tells you which one needs your attention most urgently.

### Quran verse lookup (VerificationConsole — Quran ayah search)

**What it is:** You enter a Quran reference (chapter and verse number, called "surah" and "ayah" in Arabic) and the tool fetches the actual text of that verse from a verified Quran database. This lets you check whether a quote attributed to the Quran is accurate.
**When it helps you:** Someone messages you a supposed Quran quote to justify a claim. You paste the reference here and see the actual verse — often revealing the quote was fabricated or taken out of context.

### Hadith lookup (VerificationConsole — hadith search)

**What it is:** You enter a search term and the tool searches authenticated hadith (the recorded sayings and actions of the Prophet Muhammad, peace be upon him — the second foundational source of Islamic law after the Quran) collections, returning the text, its grade of authenticity, and its reference. An authenticated hadith has passed a rigorous chain-of-transmission analysis (called "isnad" — the chain of narrators) and grading process (called "takhrij" — the science of tracing and grading hadith).
**When it helps you:** A viral message claims "the Prophet said [something alarming]." You search here and discover either that no such hadith exists, or that it is graded "weak" or "fabricated."

### Claim veracity check (VerificationConsole — veracity check)

**What it is:** The tool sends a claim to a fact-checking backend and returns a structured verdict: Refuted, Supported, Mixed, or Uncertain — with a confidence percentage and the evidence used to reach the verdict.
**When it helps you:** You get a clear, structured fact-check result on any claim during an exercise — not just a web search, but a structured verdict with evidence.

### Islamic text semantic search (VerificationConsole — semantic Islamic search)

**What it is:** Instead of searching for an exact reference, you describe a topic in plain language and the tool searches both the Quran and hadith collections for relevant passages, ranking results by how closely they match. "Semantic" means it understands meaning rather than just matching exact words.
**When it helps you:** You want to know what Islamic texts say about a topic (for example: "charging interest on loans") but you do not have a specific reference. You describe the topic and the tool finds the most relevant texts.

---

## Features / Curriculum

### 7-day warm-up program (Phase0Dashboard — 7-day pre-curriculum exercise player)

**What it is:** A 7-day introductory program that runs before the main 14-day training. Each day has a specific type of exercise: Day 1 calibrates your starting level, Day 2 explores trust, Day 3 is the clickbait thumbnail test, Day 4 looks at emotions, Day 5 is a breathing exercise, Day 6 covers help-seeking, Day 7 previews the DeepReal module. Your progress through all 7 days is saved on your device.
**When it helps you:** You ease into the platform gradually — getting used to the tools, establishing your baseline measurements, and building confidence before the main program begins.

### Difficulty dots (Phase0Dashboard — difficulty dots)

**What it is:** Each of the 7 days shows a row of 5 dots indicating how challenging that day's exercise is — like a difficulty rating.
**When it helps you:** You know in advance what to expect from each day, so you can choose a day that matches your current energy and focus level.

### Day type icons (Phase0Dashboard — day type icons)

**What it is:** Each day's exercise type is represented by a small icon — for example a target for a calibration exercise, a breath symbol for a breathing exercise.
**When it helps you:** A quick visual scan tells you what kind of activity each day involves, helping you pick the right time and mood for it.

### Warm-up progress tracking (Phase0Dashboard — progress tracking)

**What it is:** The platform remembers which of the 7 warm-up days you have completed, so you can close the browser and come back later to continue where you left off.
**When it helps you:** You do not need to finish all 7 days in one sitting — your progress is safe across sessions.

---

## Features / DeepReal

### 6-layer forensic control panel (SixLayersVisualizer — 6-layer forensic control panel)

**What it is:** An interactive panel with 6 buttons, each representing one layer of forensic analysis used to detect deepfakes: Pixel Noise (unnatural patterns in the image pixels), C2PA (the digital certificate of origin), GAN Artifacts (tell-tale patterns left by AI image-generation networks — "GAN" stands for "Generative Adversarial Network," the AI technique used to create deepfakes), Audio Spectrogram (visual representation of sound patterns to detect voice cloning), Context Match (checking whether the image matches its claimed context), and Prompt Origin (tracing whether the image was generated from an AI prompt). Clicking each button activates that layer and adds to the overall confidence score.
**When it helps you:** You see visually how forensic analysis works — it is not one magic test, but six independent checks that together build confidence.

### Forensic confidence accumulator (SixLayersVisualizer — confidence score accumulator)

**What it is:** A progress bar and percentage counter that fills up as you activate more forensic layers. Starting at 0%, it grows with each layer you check.
**When it helps you:** You understand that certainty comes from checking multiple independent signals — the more layers agree, the more confident the verdict.

---

## Features / Mental Health

### Help-seeking assessment sliders (HelpSeekingWizard — GHSQ/Brief-RCOPE assessment sliders)

**What it is:** Two sliding scales (0 to 100) for measuring two things: how willing you are to seek professional help (GHSQ — General Help Seeking Questionnaire) and how much you use religious faith as a coping resource (Brief RCOPE — Brief Religious Coping scale). There is also a free-text box for you to write anything about your current situation.
**When it helps you:** Before and after the mental-health training, this assessment measures your baseline and any change in your willingness to seek help.

### Crisis language detection (HelpSeekingWizard — crisis lexicon detection)

**What it is:** The free-text box monitors what you type for words associated with crisis — suicidal thoughts, severe distress, self-harm — in both Egyptian Arabic and English. If any are detected, the national hotline number (16328) appears on screen immediately, before any other response.
**When it helps you:** If you are in genuine distress and type something revealing it — even in an exercise context — you immediately see real help. The platform prioritizes your safety above everything else.

### Myth deconstruction display (MythAutopsy — myth deconstruction display)

**What it is:** A structured layout that takes a common harmful myth (the example used is "depression is just laziness") and breaks it apart using two approaches: emotional intelligence analysis (identifying which emotional intelligence competencies are being violated by the myth) and logical falsifiability (showing why the myth cannot withstand scientific scrutiny).
**When it helps you:** You see exactly how a harmful stigma myth is constructed — which makes it much easier to recognize and counter the next time you encounter it in conversation.

### Help-seeking wizard embedded in myth autopsy (MythAutopsy — embedded HelpSeekingWizard)

**What it is:** After the myth deconstruction exercise, the help-seeking assessment sliders appear directly on the same page.
**When it helps you:** The moment you finish understanding why a mental-health stigma is false, you are immediately invited to reflect on your own help-seeking readiness — while the insight from the exercise is still fresh.

---

## Features / Religion

### Islamic legal objectives matrix (MaqasidCheck — Maqasid al-Shari'ah verification matrix)

**What it is:** A grid of five colored tiles, each representing one of the five fundamental objectives of Islamic law — Maqasid al-Shari'ah (the higher goals that Islamic legal rulings are supposed to protect): protecting Life, protecting Mind/Reason, protecting Lineage/Family, protecting Property, and protecting Religion itself. When you paste in a religious ruling (fatwa), active tiles highlight to show which objectives the ruling aligns with or conflicts with. A "fatwa" is an official Islamic legal ruling issued by a qualified Islamic scholar.
**When it helps you:** When you receive a viral religious ruling on social media, you can use this framework to ask: does this ruling actually serve the core purposes of Islamic law? A ruling that harms all five objectives is unlikely to be genuine.

### Fatwa text input (MaqasidCheck — fatwa text input)

**What it is:** A text box where you paste in any ruling or religious claim you want to evaluate against the five objectives.
**When it helps you:** You received a WhatsApp message with a supposed fatwa banning something (for example, cryptocurrency). You paste it in and see which Islamic legal objectives it claims to protect and which it might threaten.

### Tafsir methodology enforcer (TafsirComponents — Usul al-Tafsir enforcement display)

**What it is:** A two-tier display showing the Islamic hermeneutics protocol for Quranic interpretation. "Tafsir" means explanation or interpretation of the Quran. "Usul al-Tafsir" means the foundational rules governing valid interpretation. The first tier — interpretation based on direct transmission (Quran explaining Quran, then authenticated hadith) — is shown as "unlocked." The second tier — interpretation based on human reasoning — is shown as "locked" until all transmission-based sources have been checked first. This enforces the classical Islamic scholarly principle that opinion-based interpretation must not bypass transmitted sources.
**When it helps you:** When someone online gives a Quranic interpretation based solely on personal opinion, without first checking whether the Quran or authentic hadith already addresses the question, this framework shows why that approach is methodologically invalid.

### WhatsApp Quran reference extractor (WhatsAppForwardCheck — viral message ayah reference extractor)

**What it is:** You paste a forwarded WhatsApp message and the tool automatically searches it for Quranic verse references — handling numeric formats (2:255), Arabic keyword formats, and the names of all 114 chapters (surahs) of the Quran.
**When it helps you:** A long WhatsApp forward contains dozens of paragraphs, but hidden inside is a citation to a Quran verse that is being used deceptively. The tool finds it instantly without you having to read every word.

### Abrogation check (WhatsAppForwardCheck — Nasikh-mansukh lookup)

**What it is:** Once a Quran verse is detected, the tool checks whether it has been abrogated. "Nasikh-mansukh" means "the abrogating and the abrogated" in Arabic — it refers to the classical Islamic legal concept that some earlier Quranic verses were superseded by later ones. "Abrogated" means the ruling in that verse was replaced by a later revelation. Deceptive religious messages sometimes cite abrogated verses and present them as currently binding.
**When it helps you:** A message quotes an early Quranic verse to support an extreme position, but the tool reveals that this verse's ruling was superseded by a later verse — a fact the message did not mention.

### Revelation context lookup (WhatsAppForwardCheck — Asbab al-Nuzul lookup)

**What it is:** The tool retrieves the historical circumstances under which the detected verse was revealed — called "Asbab al-Nuzul" (the causes or occasions of revelation). This is the classical Islamic scholarly discipline of recording why and in what context each verse was revealed. A verse revealed to address a specific historical situation may be misrepresented when quoted without that context.
**When it helps you:** A verse is being shared to support a ruling, but the revelation context shows it was addressing a completely different situation 1400 years ago — giving you the knowledge to explain why the application is being misused.

---

## Features / Telemetry (supervisor monitoring of participant learning)

### Emotional intensity history chart (SupervisorDashboard telemetry — EIS history chart)

**What it is:** A line chart (a graph with a line connecting data points) showing a participant's "Emotional Intent Score" (EIS — a measure of how emotionally reactive they are being in their exercise responses) across five sessions. A horizontal line marks the danger threshold — the level at which emotional escalation requires action.
**When it helps you:** The research supervisor monitors whether a participant is becoming increasingly distressed or emotionally escalated over sessions, allowing early intervention.

### Accuracy progress chart (SupervisorDashboard telemetry — engine accuracy chart)

**What it is:** A line chart showing a participant's answer accuracy across sessions, with a line marking the "mastery threshold" — the accuracy level that qualifies a participant for promotion to a harder difficulty level.
**When it helps you:** The supervisor tracks when a participant is ready to advance and does not have to manually check individual session scores.

### Frustration loop risk card (SupervisorDashboard telemetry — frustration loop risk card)

**What it is:** A card showing how many consecutive sessions a participant has shown high emotional intensity scores — counted against a threshold of 3. When a participant hits 3 consecutive high-EIS sessions, the difficulty tier automatically drops to prevent frustration from causing them to quit.
**When it helps you:** The supervisor can see the risk building before the automatic difficulty drop triggers, allowing human intervention if needed.

### Mastery promotion card (SupervisorDashboard telemetry — mastery progression card)

**What it is:** A card showing how many consecutive days a participant has achieved high accuracy — counted against a threshold of 5 days. Five consecutive high-accuracy days triggers an automatic promotion to a harder difficulty level.
**When it helps you:** The supervisor can see when a participant is excelling and is about to be promoted, allowing them to prepare more challenging materials.

### Curriculum XP card (SupervisorDashboard telemetry — curriculum XP card)

**What it is:** A card showing the participant's total XP earned so far against the maximum possible XP for the full curriculum, displayed as a progress bar.
**When it helps you:** The supervisor sees overall curriculum completion progress at a glance — one number showing how far through the full program a participant is.
