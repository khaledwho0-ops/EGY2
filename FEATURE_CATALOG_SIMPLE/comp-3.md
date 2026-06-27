# UI Components — Slice comp-3 (plain-language)

**What this file covers:** Every building block (button, panel, chart, chatbot, etc.) used across the website, explained in plain everyday language. Items 103–153.

---

## Item 103 — Statistics Practice Tracker

### ScienceExerciseTracker
**What it is:** A study-progress board that lists 33 practice exercises on how to understand numbers and statistics. You can filter them by difficulty (beginner, middle, advanced). It saves which ones you have already done so that next time you open the page it remembers where you left off, like a bookmark. A filled bar shows how far through the 33 exercises you are, and a "Jump to Next" button takes you straight to the first one you have not done yet.
**When it helps you:** You start working through the statistics exercises on a Tuesday, finish 10 of them, then close the browser. When you come back on Thursday the bar still shows 10 out of 33 done and the button takes you to exercise 11 automatically.

### QuickPlayer
**What it is:** A mini quiz player that appears right inside the exercise list without sending you to a new page. It shows one question at a time, lights up your answer in green if you got it right or red if you got it wrong, then shows you a short explanation of why before moving to the next question. At the very end it tells you your total score as a percentage.
**When it helps you:** You click on an exercise about understanding percentages, the quiz opens right there, you answer all the questions, and a little explanation after each wrong answer teaches you what you missed — all without leaving the page you are on.

### ExerciseRow
**What it is:** The individual row for each exercise. It does not load the questions until you actually click on it, so the page stays fast and light. Once you click, it fetches the questions, plays the quiz, and when you finish it marks that exercise as done — both in your browser memory and on the server — and updates the big progress bar.
**When it helps you:** The page loads quickly even with 33 exercises listed because it only downloads an exercise's questions when you actually open it, not all at once.

---

## Item 104 — Floating AI Assistant

### AIAssistant (floating chatbot)
**What it is:** A small button sitting in the bottom-right corner of every page on the website. Click it and a chat window pops up. You can switch between three helpers: a general-question helper (blue), a fact-checking helper (red), and a mental-wellness helper (green). You type your question, it sends it to an AI, and the answer appears with a note telling you which AI model answered and how fast it was. If something goes wrong it shows a friendly error message instead of a blank screen.
**When it helps you:** You are reading an article and a confusing health claim appears. You click the red "Fact-Check" tab, paste the claim, and the assistant immediately tells you what it found — without you having to open a new tab or leave the page.

---

## Item 105 — Login Button and Sign-Up Window

### AuthButton
**What it is:** The login button in the top navigation bar. When you are not logged in it says "Login." When you are logged in it shows your first name and a small shield icon if you have admin access. Clicking "Login" opens the sign-up/sign-in window; clicking your name takes you to your profile page.
**When it helps you:** You visit the site and see "Login" in the corner. One click opens the sign-in form. Once logged in, you see your name there as a quick confirmation that the site recognises you.

### AuthModal
**What it is:** The full-screen window that handles everything to do with your account: logging in, creating a new account, asking for a forgotten-password link, and setting a new password with a reset link. It has helpful safeguards: it warns you if you are offline, lets you log in as a guest without an account, locks out repeated wrong attempts and shows a countdown before you can try again, and shows clear error messages like "password too short" or "email already in use" in plain text.
**When it helps you:** You forgot your password. You click "Login," choose "Forgot password," type your email, receive a link, click it, type a new password, and the same window handles all of those steps without sending you to separate pages.

---

## Item 106 — Invisible Login Initialiser

### AuthInit
**What it is:** An invisible placeholder component that does nothing visible. It is a reserved slot in the website's skeleton so that login-related code can be added there later without having to restructure the whole page layout.
**When it helps you:** You will never notice this one — it is purely a placeholder for future login improvements that the developers will add without breaking anything else.

---

## Item 107 — Automatic Website Tour

### LiveAutopilot
**What it is:** An automated tour that visits all 19 main pages of the website by itself, scrolling through each page so you can watch. You control the speed (from 0.5× slow to 5× fast), can pause and resume, skip a page, or jump backwards. A progress bar shows which page you are on (e.g. "Page 3 of 19"), and a live status line tells you what the tour is doing right now.
**When it helps you:** A teacher wants to show students everything the platform offers in a class demonstration. They press Play, set the speed to 2×, and the tour visits every page automatically while the teacher explains what each one does.

---

## Item 108 — Side-by-Side Word Card (English + Arabic)

### BilingualTermCard
**What it is:** A card that puts an English word or phrase next to its Arabic translation, with a definition in each language in two side-by-side columns. It can also show where the connection between the two versions came from.
**When it helps you:** You encounter the term "confirmation bias" on a glossary page and the card immediately shows you its Arabic equivalent alongside both definitions so you understand it in whichever language feels clearer.

---

## Item 109 — Breadcrumb Trail

### Breadcrumbs
**What it is:** The "you are here" trail shown near the top of inner pages — like "Home > Fact-Checking > How Sources Work." It is built in a way that search engines understand, so the website appears correctly in Google results. It also helps visually impaired users who use screen readers to know exactly where they are on the site.
**When it helps you:** You are deep inside the site on a specific exercise page. The breadcrumb trail shows you the path back to the main sections so you can navigate back with one click instead of pressing the back button many times.

---

## Item 110 — Behaviour-Change Diagram

### COMBVisualizer
**What it is:** An interactive 3-by-2 grid showing six reasons why people do or do not change their behaviour. The six boxes come from a well-known psychology model called COM-B (COM-B stands for Capability, Opportunity, Motivation, and Behaviour — essentially: can you do it, do you have a chance to do it, and do you want to do it?). Clicking any box opens a panel explaining the barriers blocking that behaviour, what actions can help overcome them, and how they are measured. You can also filter by which day of a programme the exercise belongs to.
**When it helps you:** You are wondering why you keep falling for scary health messages even when you know they are probably fake. You click the "Motivation – Automatic" box and read about how fast emotional reactions bypass slow careful thinking — and what exercises can help train that.

---

## Item 111 — Pop-up Term Explainer

### ConceptExplainer
**What it is:** A small badge you can click next to a difficult word in any article. Clicking it opens a little pop-up bubble showing the word in English and Arabic, a plain-language explanation, and where the definition comes from. Different types of concepts get different colours: science terms (dark blue), Islamic studies terms (amber/gold), psychology terms (teal), and statistics terms (pink).
**When it helps you:** You are reading and come across the word "isnad" (isnad means the chain of people who passed down a religious saying — like a chain of witnesses). You click the badge next to it and a bubble explains it clearly, in both languages, without you having to open a dictionary.

---

## Item 112 — Defence Reference Library

### DefenseLibrary
**What it is:** A large reference collection — like an encyclopaedia — of techniques and knowledge for defending yourself against false information. It is divided into many sections: tables of strategies for different types of paralysis (being stuck in decisions, emotions, planning), research standards, science principles, threats to honest science, data-science strategies, guidance from universities, keyword lists for deeper research, mental health and religion frameworks, and a checklist of common mistakes to avoid. All sections are displayed in organised tables.
**When it helps you:** A researcher or advanced user wants to understand the full toolkit the platform is built on. They open the Defence Library page and browse the encyclopaedia to find exactly the strategy or principle relevant to what they are studying.

---

## Item 113 — Dot Navigation (Page Position Indicator)

### DotNavigation
**What it is:** A column of small dots fixed to the right side of long pages. As you scroll, the dot matching the section currently in your view lights up. Clicking any dot smoothly scrolls you to that section. Each dot has an accessible label so screen readers can announce it.
**When it helps you:** You are reading a very long article with eight sections. Instead of scrolling all the way back up, you click the second dot to jump to the second section instantly.

---

## Item 114 — Eight-Gate Claim Checker

### EightGateCheck
**What it is:** A structured checklist with eight boxes you must tick and five text fields you must fill in (Claim, Evidence, Context, Emotion, Consequence) before you are allowed to mark a claim as verified. A warning light stays on until all eight boxes are ticked and all five fields are filled. When you complete it all, the system records that you completed this verification step.
**When it helps you:** Before sharing a news story about a health treatment, you use this checklist. It forces you to think about the evidence, the context the claim was made in, whether it triggers strong emotion (a red flag), and what the consequence would be if the claim turned out to be false.

---

## Item 115 — Evidence Search Engine

### EvidenceSearch
**What it is:** A search tool with eight different tabs, each searching a different trusted database at the same time. The databases include ClaimBuster (a fact-checking tool), Crossref (a database of academic papers), OpenAlex (open science research), Semantic Scholar (AI-powered research search), PubMed (medical research from the US National Institutes of Health), Wikipedia, and the Internet Archive. Results are colour-coded: green (A = most trustworthy), amber (B = moderate), red (C = low trustworthiness). Each result shows what type of source it is and a link to the original.
**When it helps you:** Someone sends you a claim that a common food causes cancer. You type it into the Evidence Search, hit all eight tabs at once, and within seconds you see what medical research databases and fact-checkers actually say about it — colour-coded by how trustworthy each source is.

---

## Item 116 — Full-Site Exploration Panel

### ExploreHub
**What it is:** A large side panel (like a drawer) that opens from a button on any page. It has four tabs: (1) "All Pages" — a full list of 123 pages on the site you can search by keyword; (2) "How It Works" — six illustrated steps explaining the platform's verification process; (3) "Live Tools" — 18 real tools you can run directly inside this panel (fact-checking, image search, Arabic language analysis, bias detection, and more); (4) "Core Modules" — links to the six main sections of the site. You can run several tools at the same time and close the panel with the Escape key.
**When it helps you:** You are on a content page and want to quickly run a reverse image search (to check if an image is stolen or old) without navigating away. You open the panel, go to "Live Tools," type the image URL into the "Reverse Image" tool, and see results right there.

---

## Item 117 — Accessible Modal Lock

### useFocusTrap (hook)
**What it is:** An invisible technical helper that, when a pop-up window is open, keeps your keyboard's Tab key from accidentally moving focus to buttons or links hidden behind the pop-up. Pressing the Escape key closes the pop-up. When the pop-up closes, your focus returns to exactly where it was before.
**When it helps you:** You are navigating the site using only your keyboard (common for people with motor disabilities or power users). When a dialog box opens, pressing Tab only cycles through the buttons inside that dialog — you cannot accidentally activate hidden buttons behind it.

### FocusTrapModal
**What it is:** A reusable pop-up window frame that uses the focus-trap helper above. It can have a fixed header, can be closed by clicking outside it or pressing Escape, and prevents the page behind it from scrolling while it is open.
**When it helps you:** Any pop-up window on the site — login forms, "Apply in Real Life" panels, exercise modals — uses this frame to make sure the window behaves in a consistent and accessible way.

---

## Item 118 — Site Footer

### Footer
**What it is:** The section at the very bottom of every page on the site. It shows emergency contact numbers (mental health hotline 16328, ambulance 123, a toll-free helpline), links to the three main platform engines (fact-checking, mental health, religion), links to tools and resources, and an important legal disclaimer about what the site is and is not.
**When it helps you:** Someone using the site starts feeling anxious after reading about a health scare. They scroll to the bottom and immediately see the mental health hotline number without having to search for it.

---

## Item 119 — Research Framework Coverage Dashboard

### FrameworkCoverage
**What it is:** A dashboard showing two tables — one listing which sections of the project's research plan are done, partly done, or not yet built; and another listing specific research tasks and their current status. Summary boxes show counts: how many theory entries exist, how many trusted sources are used, how many prompt templates exist, and so on.
**When it helps you:** A team member or researcher checking the project's progress can open this page to see at a glance which parts of the scientific framework have been coded into the app and which are still pending.

---

## Item 120 — Site-Wide Keyword Search

### GlobalSearch
**What it is:** A full-screen search overlay that appears when you click the search icon in the top navigation bar. As you type, it instantly filters all the pages and topics on the site — in English and Arabic — and shows matches. Press Escape or click outside to close it. Clicking a result takes you straight to that page.
**When it helps you:** You remember reading something about "emotional manipulation in advertising" but cannot remember which page it was on. You open the search, type "manipulation," and see a list of matching pages you can jump to directly.

---

## Item 121 — Cross-Engine Recommendation Card

### HandoffCard
**What it is:** A small recommendation chip that appears when the current page detects that your question or need is better served by a different part of the platform. It shows the name and purpose of the recommended section and a button to go there, plus an X button to dismiss it if you prefer to stay.
**When it helps you:** You finish a session in the fake-news detection section. The platform notices your answers suggest you might also benefit from the mental health section, so a card appears saying "This might also help you: Mental Health Engine — explore on Day 3" with a link.

---

## Item 122 — Apply in Real Life Button

### ImplementIRLButton
**What it is:** A pill-shaped button labelled "Apply IRL" (IRL = In Real Life) placed next to exercises and evidence cards. Clicking it opens a window showing numbered steps for using what you just learned in your everyday life, plus three related scientific methods with their descriptions and sources.
**When it helps you:** You just read about a technique for spotting emotional manipulation in news headlines. The "Apply IRL" button opens a window that shows you: Step 1 — notice strong feelings when reading headlines; Step 2 — pause and ask what emotion is being triggered; Step 3 — search for the same story in a neutral source. Concrete and actionable.

---

## Item 123 — Search-Term Keyword Tool

### KeyHunterDrawer
**What it is:** An accordion-style panel (click to expand) that gives you ready-made lists of search words for researching a topic in depth. It has seven layers of keyword lists: basic keywords, expert-level keywords, hidden or less-obvious terms, research phrases, threat or warning keywords, confusion words used to mislead, and suggested prompt phrases you can use with AI tools. Each word has a copy button so you can paste it straight into a search engine.
**When it helps you:** You want to research whether a certain herbal remedy is safe. You open the KeyHunter panel, copy the expert-level keywords, paste them into PubMed (the medical research database), and get far better results than if you had just typed the herb's name.

### KeyHunterCard
**What it is:** A compact toggle button that shows just the layer name. Click it and the full KeyHunterDrawer opens; click again and it collapses. It is the small version used in sidebars where there is not much space.
**When it helps you:** On a page with a narrow sidebar you see a small "Core Keywords" toggle. One click expands the full keyword list; another click collapses it so you can keep reading.

---

## Item 124 — Research Phase Timeline

### MethodologyTimeline
**What it is:** A vertical timeline showing the nine phases of the study behind this platform, from recruiting participants all the way to analysing the data. Each phase is a dot you can click to expand a description and a colour-coded list of the tools and methods used in that phase.
**When it helps you:** A student or researcher reading about how the platform was built clicks through the timeline to understand the step-by-step research process — from how participants were recruited to how the final data was analysed.

---

## Item 125 — Page-Specific Mini Chatbot

### MiniChatbot
**What it is:** A small chatbot that is customised for the specific page you are on. The page passes it a set of instructions (called a system prompt) and a name in English and Arabic, plus a few pre-written question buttons you can click instead of typing. If the internet connection fails, the chatbot falls back to a built-in answer generator so you never see a broken screen. It remembers your conversation while you are on the page.
**When it helps you:** You are on the "spotting fake religious messages" page. The chatbot there already knows the topic, so when you click "Show me an example" it gives a relevant answer straight away — much better than a generic AI that knows nothing about the page you are on.

---

## Item 126 — First-Visit Page Guide

### NarratorGuide
**What it is:** An on-screen guide that appears automatically 2.5 seconds after you visit a complex page for the first time, showing you a short series of tips about that page. After you dismiss it, it never auto-appears again on that page (it uses a browser memory called sessionStorage to remember). The open button pulses gently to draw your attention until you have dismissed the guide at least once. You can flip through tips with dot-based navigation (like slides) or press Escape to close.
**When it helps you:** You open a complex analysis tool for the first time and feel overwhelmed. The guide pops up automatically after a second and walks you through three tips: "Step 1: paste your text here," "Step 2: pick the analysis type," "Step 3: read the results." On your second visit it stays out of your way.

---

## Item 127 — Top Navigation Bar

### Navbar
**What it is:** The bar fixed at the top of every page. It starts transparent but turns into a frosted-glass bar once you scroll down a bit. It contains: a colour-theme picker, a right-to-left/left-to-right language toggle (for Arabic versus English), a language selector (English, standard Arabic, Egyptian Arabic), the global search button, the login button, a dropdown mega-menu, and a quick-access panel for trusted tools. On small screens these collapse into a hamburger menu.
**When it helps you:** You switch to Arabic at the top of the page and the whole site immediately flips to right-to-left layout with Arabic labels everywhere — all controlled from this bar.

---

## Item 128 — Richer Per-Page AI Chatbot

### PageAIChatbot
**What it is:** A more powerful version of the mini chatbot for pages that need it. It opens with a smooth animation (it slides and fades in). It sends both a custom set of instructions for the page and additional context to the AI. It remembers the full conversation (not just one exchange). When you first open it, it greets you automatically. When the conversation is new, it shows you a few suggested questions you can click. It can display formatted text (bold, italics, line breaks) in the AI's replies.
**When it helps you:** You are on a complex page about a specific deception technique. The chatbot greets you ("Welcome! Ask me anything about this technique"), shows three suggested questions, and remembers everything you discussed so follow-up questions make sense.

---

## Item 129 — Previous/Next Page Navigation

### PageNavigation
**What it is:** Previous and Next buttons at the bottom of content pages that keep you within the same topic category — they will never jump you from the "statistics" section to the "religion" section by accident. It shows a badge with the category name and your position within it (e.g. "Science – Page 4 of 11"). It handles gracefully when you are on the first or last page of a category.
**When it helps you:** You are on page 4 of the "Understanding Evidence" category. Clicking "Next" takes you to page 5 of the same category, not to some unrelated topic.

### PAGE_ORDER (exported constant)
**What it is:** The master list that defines the correct reading order for all ~100 pages grouped by their 11 topic categories. The Previous/Next navigation reads this list to know which page comes before and after the current one.
**When it helps you:** This is a behind-the-scenes list the developers maintain. It means any page linked from it automatically gets correct Previous/Next navigation without someone having to hard-code the order each time.

---

## Item 130 — Scrolling Background Effect (Parallax)

### ParallaxHero
**What it is:** A wrapper for the colourful banner at the top of certain pages. It makes the background move at a slightly slower speed than your scrolling — an effect called parallax, which creates a sense of depth, as if the background is far away. You can control how strong the depth effect is and what gradient colours the background uses.
**When it helps you:** As you start scrolling down a landing page, the header background slowly drifts upward at a different speed, giving the page a visual depth and polish that makes it feel less flat.

---

## Item 131 — Prompt Lab (Ready-Made AI Instructions)

### PromptLab
**What it is:** A collection of 42 ready-made instruction templates (called prompts) for use with AI tools. 24 are for fact-checking, 9 for mental health topics, and 9 for religion topics. You can filter by topic, fill in blank placeholders in any template (like substituting the actual name of a claim you are checking), then copy the finished instruction with one click. A safety notice section lists seven rules for using AI prompts responsibly.
**When it helps you:** You want to use ChatGPT to check a religious claim but do not know how to write a good instruction. You find the "Islamic claim verification" prompt in the Prompt Lab, fill in the claim, copy the result, paste it into ChatGPT, and get a much better-structured response than if you had just typed the claim raw.

---

## Item 132 — Evidence Provenance Card

### ProvenanceBox
**What it is:** A card attached to factual claims showing exactly where the evidence comes from. It has: a review-status badge (is this verified?), a five-bar strength indicator (like signal bars on a phone, but for evidence strength), three sources in a chain (primary source, a second source that confirms it, a methodological source explaining how it was studied), each colour-coded — green (A = most trustworthy), amber (B = moderate), red (C = low). It also shows which reviewer checked it and when.
**When it helps you:** You are reading a claim that "misinformation spreads faster than truth online." The ProvenanceBox next to it shows a green "A" source (a peer-reviewed study from MIT), an amber "B" source (a news report citing that study), and tells you a reviewer checked it on a specific date. You trust the claim with full transparency.

### EvidenceDisambiguation
**What it is:** An explanatory panel that teaches you the difference between three types of evidence the platform uses: Content Evidence (what the source actually says), Validation Evidence (whether someone else independently confirmed it), and Framework Evidence (the theoretical model behind the claim). Each type comes with a simple example.
**When it helps you:** You are confused about why some claims have three sources listed rather than one. This panel explains: one source says the thing, a second confirms it independently, and a third provides the scientific framework that makes it credible.

---

## Item 133 — Quick How-To Guide

### QuickGuide
**What it is:** A collapsible step-by-step guide placed at the start of tool and exercise pages. It shows numbered circles with short labels explaining how to use the page, plus an optional box with a realistic example scenario. It can be set to start open or closed. It supports right-to-left (Arabic) layout.
**When it helps you:** You land on a new tool page and feel unsure where to start. A "How to use this tool" guide is open at the top with steps 1-2-3. You read them in 20 seconds, then start. You can click to collapse it so it does not take up screen space afterward.

---

## Item 134 — Language and Direction System

### RTLProvider + useRTL
**What it is:** The engine that handles language switching across the whole site. It supports three language modes: English (left-to-right), standard Arabic (right-to-left), and Egyptian Arabic dialect (right-to-left). It saves your choice in the browser so the next visit remembers it. Switching language instantly changes the reading direction of the whole page (RTL = right-to-left, the direction Arabic is read). Every bilingual component on the site uses a small helper function from this engine called `t()` which automatically picks the right translation for whichever language you chose.
**When it helps you:** You choose "Arabic (Egyptian)" once from the navbar. The whole site flips to right-to-left layout, all text switches to Egyptian-dialect Arabic, and the next time you visit the site it is still in that language without you having to set it again.

---

## Item 135 — Evidence Quality Shield

### ScientificShield
**What it is:** A detailed evidence card shown next to AI-generated claims across the platform. It tells you: how confident the AI is in this claim (HIGH / MEDIUM / CONTESTED / UNVERIFIED), whether multiple AI models agreed, a note on what method was used, which deception layer this claim relates to (with the defence strategy to counter it), a list of the sources with their trust-tier colour coding and whether each source supports, refutes, or is unrelated to the claim, and a "grounding audit" panel that flags any unsupported sub-claims the AI made. Sections only appear if there is data for them — it never shows empty boxes.
**When it helps you:** An AI on the platform makes a claim about a hadith (a saying attributed to the Prophet Muhammad). The shield next to it shows: confidence CONTESTED, two sources rated B (amber), one rated C (red), a note saying "original chain of narrators not found in classical sources," and an audit flagging one unsupported sub-claim. You know immediately to treat this with caution.

---

## Item 136 — Reading Progress Bar (Full-Featured)

### ScrollProgressBar
**What it is:** A thin coloured bar fixed at the very top of long pages. It fills from left to right as you scroll down, so you can always see roughly how much of a page you have read. It supports three colour styles depending on where it is used: a purple-to-red gradient (general pages), a three-engine gradient (the 14-day programme), and a single-colour version matching each section's colour. It also supports being controlled manually (not by scrolling) for special contexts.
**When it helps you:** You are reading a long research article and the coloured bar at the top tells you you are about two-thirds through. You can decide whether you have time to finish now or should come back later.

---

## Item 137 — Reading Progress Bar (Simple)

### ScrollProgress
**What it is:** A simpler version of the reading progress bar. It works the same way — a thin bar that fills as you scroll — but it uses a different technical approach that works better on pages styled with a certain method (Tailwind CSS classes). The bar colour is a fixed purple-to-pink gradient.
**When it helps you:** Same as the full-featured bar above — you always know how far through a long article you are — but this version is used on pages where the simpler styling approach fits better.

---

## Item 138 — Source Trust Pyramid

### SourcePyramid
**What it is:** An animated pyramid diagram — like a triangle — that shows which sources the platform trusts and how much, from the most trusted at the top to the least trusted at the bottom. The six levels are: Tier S at the top (the most authoritative living bodies — like the World Health Organisation, Cochrane (Cochrane = the gold standard database of medical evidence reviews), Egypt's Dar al-Iftaʾ for Islamic rulings, and certified fact-checkers); Tier 1 (peer-reviewed studies in top journals like The Lancet or Nature); Tier 2 (government health agencies and classical Islamic commentaries with verified chains); Tier 3 (quality journalism like Reuters or BBC); Tier 4 (aggregators like Wikipedia — useful as a starting point only); Tier 5 at the bottom (social media and AI — treated as zero evidence on their own). Each tier slides into view as you scroll to it.
**When it helps you:** You want to understand why the platform dismissed a Facebook post as evidence. The pyramid makes it clear visually: Facebook sits at the very bottom tier — it counts as no evidence by itself, no matter how many people shared it.

---

## Item 139 — Study Success Metrics Tracker

### SuccessTracker
**What it is:** A dashboard for project contributors (not regular users) that shows every measurable goal the underlying research study is trying to achieve. For each goal it shows three levels: the bare minimum acceptable result, the target result, and the stretch/ideal result. A colour border on each row tells you whether the project is currently not meeting the minimum (red), just meeting the minimum (amber), meeting the target (blue), or exceeding it (green). Each row also shows what to do if the goal is not being met.
**When it helps you:** A researcher checking the study's performance opens this page and instantly sees that one measurement is falling below the minimum threshold (red border) while another is exceeding the stretch goal (green border), so they know where to focus attention.

---

## Item 140 — Scrolling Quotes Strip

### TestimonialsMarquee
**What it is:** Two rows of quote cards that scroll automatically in opposite directions like a ticker tape — one row moves left, the other moves right, and they loop seamlessly. The eight quotes come from famous scientists, philosophers, and religious thinkers (Carl Sagan, Richard Feynman, Viktor Frankl, Jonathan Sacks, Ibn Rushd, Al-Hasan al-Basri, and others). Each card shows the quote in italics, the author's initials in a small circle, and their role. The layout adapts for right-to-left reading.
**When it helps you:** Someone new to the platform arrives at the homepage and sees quotes from respected scientists and Islamic scholars scrolling by, which builds trust that the platform is grounded in serious intellectual tradition — not just opinion.

---

## Item 141 — Colour Theme System

### ThemeProvider + useTheme
**What it is:** The system that controls the colour scheme of the entire site. It offers 16 named colour themes with descriptive names like "bloodline," "terracotta," "pearl-slate," "espresso-peony," and so on. There is also a "system" option that automatically picks dark or light based on your device's setting. You can switch to high-contrast mode for easier reading. There is an auto-cycle mode that rotates through all themes one by one, making sure you see each one once before repeating. All colour choices are applied to the whole site at once by changing a single setting in the page's code.
**When it helps you:** You find the default colours hard on your eyes at night. You switch to "dark" theme from the navbar and the whole site immediately changes to a dark background with light text.

### THEME_OPTIONS (exported constant)
**What it is:** The master list of all 16 colour themes with their names, descriptions, and whether they are light or dark. The theme picker in the navbar reads this list to know which options to show you.
**When it helps you:** This is a behind-the-scenes list. When the developers add a new theme, they add it to this list and it automatically appears in the theme picker everywhere on the site.

---

## Item 142 — Theory Explanation Card

### TheoryCard
**What it is:** An expandable card for each scientific or psychological theory that an exercise is based on. Collapsed, it shows the theory name, who developed it, the year, and what role it plays (is it the main theory, a teaching theory, or a supporting one?). When you expand it you see: a description of the theory, a "How it causes the effect" explanation (the causal mechanism), evidence supporting it, how it is applied in this exercise, what outcome to expect, which exercise days it is active on, and the full academic citation for it.
**When it helps you:** You do an exercise and wonder "why does this actually work?" You expand the theory card below the exercise and read that it is based on Inoculation Theory (the idea that a weakened dose of a persuasion technique makes you more resistant to the full-strength version later) — with the evidence and citation right there.

---

## Item 143 — Verified Scholarly Quotes Grid

### VerifiedQuotesStrip
**What it is:** A grid showing six quotes randomly selected from a verified set — two from the fake-news detection section, two from the mental health section, and two from the religion section. Each card shows which module the quote belongs to, the author's name, the quote itself in English or Arabic depending on your language setting, and a sentence explaining why it is relevant. The selection changes each time the page loads.
**When it helps you:** Every time you visit the homepage you see a different mix of six quotes from scientists, religious scholars, and philosophers — all verified — giving you a varied window into the intellectual foundation of the platform.

---

## Item 144 — Visual Comfort Settings Panel

### VisualClarityPanel
**What it is:** A small settings panel — embedded inside certain pages and sidebars — that lets you change the colour theme with one click. It offers four recommended themes chosen for being easy on the eyes during focused work (a steel-blue, a clean light, a warm terracotta, and a cool grey-blue). It also has normal/high contrast toggle buttons and a "Try all themes" button that cycles through them automatically. It shows your current active theme and contrast mode. It explains, in plain language, why adjusting visual settings reduces eye strain and reading errors.
**When it helps you:** You are deep in an analysis task and the current colour scheme is making your eyes tired. You see the Visual Clarity panel in the sidebar, click "light" theme with one tap, and the whole interface immediately becomes easier to read — without navigating to settings.

---

## Item 145 — Defence Protocols Section (Six-Layers Page)

### DefenseSection
**What it is:** The closing section of a page called "The Architecture of Deception." It shows a bilingual table — Arabic on one side, English on the other — listing each deception attack and the matching defence for it, displayed with a calligraphic Arabic number for each layer. Below the table, two large buttons link to two practice tools: a live deception simulator and a 3D map of how misinformation spreads. The content slides in as you scroll to it.
**When it helps you:** After reading through all six layers of deception on that page, you reach this section which gives you the defence strategy for each layer in one clear table, then offers you a button to go practise those defences in a live simulation.

---

## Item 146 — Layer Navigation Dots (Six-Layers Page)

### FloatingNav
**What it is:** A column of 10 dots fixed to the right side of the "Architecture of Deception" scrollytelling page — one dot for the hero intro and one for each of the eight deception layers plus the defence section. As you scroll, the dot for whichever section is on your screen grows larger and gets a glowing ring around it. Hovering over a dot reveals a small Arabic label showing that section's name. Clicking a dot scrolls you there. The active dot also communicates with the 3D particle background so the particle shape changes when you navigate.
**When it helps you:** You are deep in Layer 5 of the deception page and want to jump back to Layer 2. You glance at the dot column, click the second dot, and you are there instantly.

---

## Item 147 — Opening Hero Section (Six-Layers Page)

### HeroSection
**What it is:** The dramatic opening screen of the "Architecture of Deception" page. The background is see-through so the animated 3D particle sphere (see ParticleField) shows through it. It has a large Arabic calligraphic title "هندسة الخداع" (The Architecture of Deception) that fades and slides in, a bilingual subtitle, four bold statistics (70+ case studies, 6 layers, 1000+ years of history, Egyptian focus), and a bouncing scroll indicator that tells you to scroll down to begin.
**When it helps you:** When you first arrive at the page, this opening screen immediately sets the serious, dramatic tone of what you are about to read — making it clear this is an in-depth exploration, not a quick article.

---

## Item 148 — The "Unknown" Layer Section (Layer 8)

### Layer8Special
**What it is:** A special, deliberately disturbing section for Layer 8 of the deception page — the theme is "the things we cannot fully understand or control." It shows 108 case studies but most of the text is hidden in darkness; you can only read what is directly under your mouse cursor (like searching in the dark with a torch). After a very long reading session (around 20–30 minutes in), the page slowly starts adding glitchy shaking effects and eventually flashes a dramatic full-screen message. For users who need accessibility (e.g. photosensitive conditions), all these timed effects can be turned off with a single switch.
**When it helps you:** This section is intentionally designed as an experience, not a comfortable read. It makes you feel the overwhelm of "too much information" as a physical experience — which is exactly the point of Layer 8's theme.

---

## Item 149 — Layer Controller (Six-Layers Page)

### LayerSection (main controller)
**What it is:** The behind-the-scenes director for the six-layers page. For each layer it decides which visual style to use: Layer 8 gets the "torch in the dark" treatment; Layer 7 alternates every 30 seconds between a brutalist/glitchy style and a smooth glassmorphism style; Layers 1–6 get the standard polished style. You never need to think about this — it just makes sure each layer looks right for its theme.
**When it helps you:** This is invisible to users. It is the reason Layer 7 looks intentionally jarring and unstable — because Layer 7's theme is "total freedom vs. total control of information," and the visual style embodies that.

### StandardLayerUI
**What it is:** The polished visual template used for Layers 1–6. Each layer section has: a large animated Arabic number, a bilingual layer name, a definition, animated statistics that count up as you scroll into view, global case study cards, Egyptian-specific case study cards, and a deep-dive panel of Egyptian-specific facts and context for that layer.
**When it helps you:** As you scroll into Layer 3, the number "٣" animates in from the right, statistics count up dramatically, and case studies appear — all clearly organised and readable.

### CaseCard + popup modal
**What it is:** Each case study is a card showing the year, topic area, title in both languages, and the impact. Clicking a card opens a pop-up with the full story: impact details, step-by-step breakdown of how the deception worked (in English and Arabic), which layer it belongs to, and a special "Egyptian Context" badge if the case happened in Egypt. Pressing Escape closes the pop-up.
**When it helps you:** You are scanning the Layer 2 case studies and spot one about a health hoax from 2019. You click it to see the full story of how it spread, how it worked, and what it did — without leaving the main page.

### AnimatedCounter
**What it is:** A number that counts upward dramatically when you scroll to it, like an odometer rolling. It uses a smooth easing curve over about 2.5 seconds, shows the number with any suffix (like "%" or "million"), a label in both languages, and a coloured glow bar above it.
**When it helps you:** You scroll into a layer section and the statistic "82 million Egyptian internet users" counts upward from 0 to 82 in front of your eyes — making the scale land more powerfully than if it were just a static number.

### Layer7Special (brutalist renderer)
**What it is:** The jarring, visually "broken" style used for Layer 7 (the theme of which is "total manipulation of how information is presented"). Text shakes, colours glitch, shapes tilt wildly, and alternating black-and-white boxes appear — completely opposite to the smooth polished style of the other layers. It alternates with the polished style every 30 seconds as part of the Layer 7 experience.
**When it helps you:** The deliberately ugly, unstable appearance of Layer 7 makes you feel the disorientation of manipulated information presentation — the content IS the experience here.

---

## Item 150 — 3D Animated Particle Background

### ParticleField
**What it is:** The full-page animated 3D background on the six-layers deception page, made up of thousands of tiny glowing dots (up to 65,000 on desktop, 16,000 on mobile). The dots form different shapes depending on which layer you are reading: a sphere at the start, an exploded burst for Layer 1, a ring (torus) for Layer 2, a grid for Layer 3, a spiral for Layer 4, a DNA double helix for Layer 5, a brain shape for Layer 6, a black-hole swirl for Layer 7, and a chaotic cloud for Layer 8. The shapes smoothly morph into each other as you scroll. Moving your mouse causes the dots near your cursor to fly away from it. Layer 7 uses red and cyan; Layer 8 pulses blood red.
**When it helps you:** As you scroll from Layer 5 (the DNA helix, representing biological/evolutionary manipulation) to Layer 6 (the brain shape, representing psychological manipulation), the particle background smoothly morphs from one shape to the other — making the visual narrative feel visceral and coherent.

---

## Item 151 — WebGL Scene Wrapper

### Scene
**What it is:** An invisible technical wrapper that loads the 3D particle animation safely. It avoids a common crash that happens when a browser-only 3D engine tries to run on the server during page generation. It shows a bilingual "Initialising..." message while loading. If your device or settings are set to reduce motion (an accessibility preference), it shows a static gradient background instead of the 3D animation.
**When it helps you:** The page loads correctly on all devices — including those that cannot run 3D graphics — without crashing. Users who prefer reduced motion get a calm static background instead.

---

## Item 152 — WebGL Canvas Configuration

### SceneCanvas
**What it is:** The actual 3D drawing surface (the "canvas") that renders the particle animation. It sets how sharp the animation looks (lower on mobile to save battery, sharper on desktop), turns off several expensive graphic features that are not needed, positions the virtual "camera" looking at the scene, and loads the particle field inside a loading zone so the rest of the page is not blocked.
**When it helps you:** The 3D background runs smoothly on your phone without draining battery quickly, because this component automatically adjusts quality for the screen it is running on.

---

## Item 153 — Shared Scroll State for the Six-Layers Page

### ScrollProvider + useScrollContext
**What it is:** A shared memory system that all parts of the six-layers page use to stay in sync. It tracks: how far down the page you have scrolled (as a number from 0 to 1), which layer you are currently in (0–9), how far through that specific layer you are, where your mouse cursor is on the screen, and how fast you are scrolling. It is designed so that the 3D particle animation can read these values every fraction of a second without causing unnecessary redraws of the rest of the page. The dot navigation writes into it; the particle background reads from it; the Layer 8 accessibility switch also lives here.
**When it helps you:** This is invisible to you as a user, but it is what makes the six-layers page feel like one unified, seamlessly connected experience — the dots, the 3D particles, the glitch effects, and the layer content all know what the others are doing because they share this single source of truth.

---

## Summary Table

| # | File | Features Documented |
|---|------|-------------------|
| 103 | science/science-exercise-tracker.tsx | ScienceExerciseTracker, QuickPlayer, ExerciseRow |
| 104 | shared/ai-assistant.tsx | AIAssistant |
| 105 | shared/auth-button.tsx | AuthButton, AuthModal |
| 106 | shared/auth-init.tsx | AuthInit |
| 107 | shared/autopilot.tsx | LiveAutopilot |
| 108 | shared/bilingual-term-card.tsx | BilingualTermCard |
| 109 | shared/breadcrumbs.tsx | Breadcrumbs |
| 110 | shared/comb-visualizer.tsx | COMBVisualizer |
| 111 | shared/concept-explainer.tsx | ConceptExplainer |
| 112 | shared/defense-library.tsx | DefenseLibrary |
| 113 | shared/dot-navigation.tsx | DotNavigation |
| 114 | shared/eight-gate-check.tsx | EightGateCheck |
| 115 | shared/evidence-search.tsx | EvidenceSearch |
| 116 | shared/explore-hub.tsx | ExploreHub |
| 117 | shared/focus-trap-modal.tsx | useFocusTrap, FocusTrapModal |
| 118 | shared/footer.tsx | Footer |
| 119 | shared/framework-coverage.tsx | FrameworkCoverage |
| 120 | shared/global-search.tsx | GlobalSearch |
| 121 | shared/handoff-card.tsx | HandoffCard |
| 122 | shared/implement-irl-button.tsx | ImplementIRLButton |
| 123 | shared/keyhunter-drawer.tsx | KeyHunterDrawer, KeyHunterCard |
| 124 | shared/methodology-timeline.tsx | MethodologyTimeline |
| 125 | shared/mini-chatbot.tsx | MiniChatbot |
| 126 | shared/narrator-guide.tsx | NarratorGuide |
| 127 | shared/navbar.tsx | Navbar |
| 128 | shared/page-ai-chatbot.tsx | PageAIChatbot |
| 129 | shared/page-navigation.tsx | PageNavigation, PAGE_ORDER |
| 130 | shared/parallax-hero.tsx | ParallaxHero |
| 131 | shared/prompt-lab.tsx | PromptLab |
| 132 | shared/provenance-box.tsx | ProvenanceBox, EvidenceDisambiguation |
| 133 | shared/quick-guide.tsx | QuickGuide |
| 134 | shared/rtl-provider.tsx | RTLProvider + useRTL |
| 135 | shared/scientific-shield.tsx | ScientificShield |
| 136 | shared/scroll-progress-bar.tsx | ScrollProgressBar |
| 137 | shared/scroll-progress.tsx | ScrollProgress |
| 138 | shared/source-pyramid.tsx | SourcePyramid |
| 139 | shared/success-tracker.tsx | SuccessTracker |
| 140 | shared/testimonials-marquee.tsx | TestimonialsMarquee |
| 141 | shared/theme-provider.tsx | ThemeProvider + useTheme, THEME_OPTIONS |
| 142 | shared/theory-card.tsx | TheoryCard |
| 143 | shared/verified-quotes-strip.tsx | VerifiedQuotesStrip |
| 144 | shared/visual-clarity-panel.tsx | VisualClarityPanel |
| 145 | six-layers/DefenseSection.tsx | DefenseSection |
| 146 | six-layers/FloatingNav.tsx | FloatingNav |
| 147 | six-layers/HeroSection.tsx | HeroSection |
| 148 | six-layers/Layer8Special.tsx | Layer8Special |
| 149 | six-layers/LayerSection.tsx | LayerSection, StandardLayerUI, CaseCard, AnimatedCounter, Layer7Special |
| 150 | six-layers/ParticleField.tsx | ParticleField |
| 151 | six-layers/Scene.tsx | Scene |
| 152 | six-layers/SceneCanvas.tsx | SceneCanvas |
| 153 | six-layers/ScrollContext.tsx | ScrollProvider + useScrollContext |

**Total files:** 51
**Total features:** 66
