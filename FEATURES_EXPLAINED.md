# EAL — Every Feature Explained (one file)

**What this whole project is, in one breath:** a bilingual (Egyptian-Arabic + English) website that teaches ordinary people how to *not get fooled* — by fake news, fake health cures, fake religious messages, scam images, and manipulation — and how to protect their mental health. Think of it as a **gym for your brain's "lie detector,"** plus a toolbox of checkers you can paste suspicious stuff into.

This file lists **every feature** in the project (~1,702 of them), grouped into 6 parts:
1. **Pages** — the screens you click on.
2. **API endpoints** — the "engine room" jobs the website does behind the scenes when you press a button.
3. **Engines & libraries** — the reusable brains/tools the code uses.
4. **Components** — the reusable building blocks of the screens (buttons, charts, widgets).
5. **Data & content** — the lessons, quizzes, word-lists, and trusted-source lists the site is built from.
6. **Cross-cutting systems** — the big things that span the whole site (the menu, the languages, the safety net, the certificate).

Each feature is written as **what it does** + **a real situation where it helps you**.

---

## 📖 Plain-language glossary — read this first

Whenever you see a scary word below in the catalog, look it up here:

- **AI** — a computer that can read, write, and "reason" a bit like a person. Here it reads claims and explains if they're true or fishy.
- **API / endpoint** — a behind-the-scenes "worker" the website calls when you press a button (like the kitchen behind a restaurant counter).
- **Claim** — any statement someone says is true (e.g. "garlic cures COVID").
- **Misinformation / disinformation** — wrong info spreading by accident vs. spread *on purpose* to fool you.
- **Prebunking / inoculation** — showing you a *weak, safe dose* of a manipulation trick **before** you meet the real one, so you build "mental antibodies" (like a vaccine, but for lies).
- **Debunk** — to prove a claim false and explain why.
- **FLICC** — the 5 common dirty tricks people use to deny facts: **F**ake experts, **L**ogical mistakes, **I**mpossible demands, **C**herry-picking (showing only the bits that help them), **C**onspiracy theories.
- **SIFT** — a 4-step habit for checking anything: **S**top, **I**nvestigate the source, **F**ind better coverage, **T**race it to the original.
- **Logical fallacy** — a sneaky thinking mistake that makes a weak argument *sound* convincing (e.g. attacking the person instead of their point).
- **Cognitive bias** — a built-in mental shortcut that often fools us (e.g. believing things that match what we already think).
- **System 1 / System 2 (dual-process)** — your two thinking speeds: System 1 = fast gut reaction; System 2 = slow careful thinking. Scams target System 1.
- **OSINT** — "open-source intelligence" = detective work using only *public* info anyone can find online.
- **EXIF** — the hidden info tucked inside a photo file (camera, date, GPS). Like the photo's secret diary.
- **ELA (Error Level Analysis)** — a photo trick that highlights edited areas (parts that were Photoshopped show up differently).
- **Reverse image search** — uploading a picture to find *where else it appeared online* (catches old photos reused as "new").
- **Deepfake** — a fake video/voice made by AI to look/sound like a real person.
- **C2PA / content credentials** — a tamper-proof "nutrition label" attached to a photo/video showing where it came from and how it was edited.
- **Provenance** — the origin/history of a piece of media (where it really came from).
- **Metadata** — "data about data" — the extra hidden details attached to a file.
- **Tier (S / A / B / C / U)** — a grade for how trustworthy a source is. S = rock-solid (e.g. WHO); U = unverified/junk.
- **One-Law** — the project's golden rule: *never show a claim as true without a real, clickable source.* If there's no source, it says **"UNVERIFIED"** instead of guessing.
- **Source / citation** — the trustworthy place a fact comes from (a study, an official site).
- **Evidence aggregator** — a tool that searches many science libraries at once and gathers the results.
- **RAG** — when an AI looks things up in a real document library *before* answering, so it doesn't make things up.
- **MegaRotator** — the site's "backup-generator" system for AI: if one AI provider is down, it instantly switches to another so nothing breaks.
- **MIST-20** — a 20-question quiz (used by real scientists) that measures how easily you're fooled by fake headlines. A "susceptibility thermometer."
- **MHLS / GHSQ / Brief-RCOPE / SUS / MC-SDS** — other standard questionnaires: mental-health knowledge / willingness to seek help / religious coping / how easy the site is to use / a "are you answering honestly?" check.
- **PHQ-9** — the standard 9-question depression screening doctors use.
- **Cohen's d / dz (effect size)** — a number for *how big* an improvement is (not just "did it work" but "how much"). Small ≈ 0.2, big ≈ 0.8.
- **p-value / confidence interval (95% CI)** — stats tools that say how *sure* we are a result isn't just luck.
- **RCT** — the gold-standard experiment: split people into two groups (one trained, one not) and compare.
- **COM-B** — a model of why people change behavior: you need **C**apability + **O**pportunity + **M**otivation.
- **SM-2 / spaced repetition** — a smart review schedule that reminds you of a lesson right before you'd forget it, so it sticks.
- **xAPI / SCORM** — standard formats for recording "who learned what" so any school system can read the progress.
- **Mindframe** — the suicide-safety rule: any text about self-harm must show a real crisis hotline right next to it.
- **Crisis hotline 08008880700** — Egypt's free mental-health helpline the site surfaces in emergencies.
- **Hadith** — a reported saying/action of the Prophet Muhammad ﷺ. **Isnad** = its chain of narrators. **Takhrij** = tracing a hadith back to its original books. **Sahih/Hasan/Da'if/Mawdu'** = grades from authentic → fabricated.
- **Fatwa** — a religious ruling by a qualified scholar. **Dar al-Ifta / Al-Azhar** = Egypt's official religious authorities.
- **Maqasid al-Shariah** — the 5 higher aims Islamic law protects (life, mind, faith, lineage, wealth) — used here to spot harmful "religious" scams.
- **Nasikh / Mansukh** — which Qur'anic verse later updated an earlier ruling (abrogation).
- **Asbab al-Nuzul** — the real-life reason/context a verse was revealed (stops out-of-context misquoting).
- **Sectarian / takfir** — content that incites hatred between religious groups / falsely brands someone a non-believer.
- **Zakat / Mawarith** — obligatory charity calculation / Islamic inheritance shares.
- **HMAC** — a tamper-proof digital "wax seal." If anyone edits the certificate, the seal breaks.
- **Certificate + /verify** — your proof-of-learning, which *anyone* can check online for authenticity.
- **RTL / i18n / bilingual** — RTL = right-to-left (Arabic) screen layout; i18n = making the site work in multiple languages.
- **localStorage** — a little memory box inside *your own browser* that remembers your progress (nothing sent to a server).
- **Kill-list** — a maintained list of already-debunked viral claims.
- **KeyHunter** — a big organized list of manipulation keywords/phrases to watch for.
- **Educational simulation** — an honest label on a few demo tools that *look* like advanced detectors but are really teaching mock-ups, not real detection (the project flags these on purpose, per the One-Law).

> **Heads-up (honesty):** a few features are deliberately marked **"educational simulation"** (they teach the idea but don't do real detection yet), and some content is still being built out (a validated Arabic version of the quizzes, later curriculum days). The project labels these honestly rather than pretending.

---

# THE FULL FEATURE LIST

_Every feature below is written for a total beginner: **What it is** (plain words) and **When it helps you** (a real situation). Any unfamiliar word is in the glossary above._

---

# Platform Pages & Features — Plain-Language Guide (pages-1)

This guide explains every feature on the Egyptian Awareness Library website in everyday words.
No technical background needed. Every feature is here — nothing is skipped.

---

## Audit Page — `/audit`

This page lets anyone check that the platform plays by the rules and is honest about how it works.

### Compliance Checklist
**What it is:** A list of 9 yes/no questions that check whether the platform follows important ethical and legal rules — including Egyptian data-protection law and international research ethics guidelines. Each item either gets a green "pass" badge or a yellow "needs review" badge. You can click any item to see the full details.
**When it helps you:** An independent reviewer or ethics committee wants to confirm the platform is safe and legal before recommending it to students or patients.

### Ethical AI Principles tab
**What it is:** Six cards explaining the values the platform commits to when using artificial intelligence — things like "do no harm," "be fair to all users," "be transparent," and "be accountable." Each card has both Arabic and English text.
**When it helps you:** A partner organization wants to know the platform's AI does not discriminate or mislead anyone before they link to it from their own site.

### Transparency Metrics tab
**What it is:** Six numbers that show how well the platform lives up to its promises — for example, what percentage of its code is open for anyone to inspect (100%), how often its claims link to real sources (97%), and how fast it corrects mistakes (within 48 hours). These are shown as animated bars that fill up.
**When it helps you:** A funder or journalist wants a quick snapshot of quality before writing about the platform.

### Audit Log with Severity Filter
**What it is:** A time-stamped diary of recent actions taken to keep the platform honest — content reviews, privacy checks, bias assessments. You can filter the list to show only "success," "info," or "warning" entries.
**When it helps you:** An auditor wants to see the chronological record of governance actions taken over recent weeks.

---

## Journal Page — `/journal`

A private daily notebook where learners reflect on what they learned and track how they feel over time.

### Daily Reflection Entry
**What it is:** Three short questions you answer each day — "What did I learn?", "What surprised me?", and "What will I do differently?" Your answers are saved in your browser so they are there the next time you return.
**When it helps you:** After finishing an exercise about spotting fake news, you spend two minutes writing down what clicked for you — building the habit of thinking critically.

### Mood Selector
**What it is:** Five emoji faces (from very sad to very happy) you tap to record how you feel when you make a journal entry.
**When it helps you:** You notice that on the days you practiced spotting manipulation tricks you felt more anxious — the mood log helps you see that pattern.

### Cognitive Growth Self-Assessment Slider
**What it is:** A sliding scale from 1 to 10 where you rate how much you think your thinking skills have grown that day. The number is saved and shown in a chart over time.
**When it helps you:** After two weeks, you check the chart and see your self-score has been slowly climbing — a sign the practice is working.

### Tag System
**What it is:** Eight topic labels you can attach to a journal entry — such as "Critical Thinking," "OSINT" (meaning: open-source investigation skills, like searching public records), "Islamic Studies," and more. Each entry can have multiple labels.
**When it helps you:** You look back at your entries tagged "Critical Thinking" and realize you have been doing much more reflection on that topic than on media literacy.

### Past Entries Timeline
**What it is:** A scrollable list of every journal entry you have ever written. Click any entry to expand it and read your full reflection, mood, and tags from that day.
**When it helps you:** You want to remind yourself what you thought about deepfakes (meaning: AI-made fake videos that look real) a month ago before re-reading the topic.

### Mood Tracker Bar Chart
**What it is:** A bar chart showing your mood scores for the last 21 journal entries, so you can see the trend at a glance.
**When it helps you:** You notice a dip in your mood over the last week and connect it to a stressful news cycle — then you decide to take a break from heavy practice.

### Cognitive Growth Chart
**What it is:** A vertical bar chart of your self-rated thinking-skills score for the last 14 entries. It also shows a short explanation of how humans develop knowledge in stages (this idea comes from an education framework called Bloom's Taxonomy — a widely accepted map of learning levels from "remembering a fact" to "creating new ideas").
**When it helps you:** A teacher uses this to show a student the clear upward trend in their self-confidence over the past two weeks.

### Day Streak Counter
**What it is:** A counter that shows how many days in a row you have written a journal entry, up to 30 days.
**When it helps you:** Seeing "Day 12 streak" gives you a small push to not break the chain and write even a short entry today.

---

## Skills Page — `/skills`

A personal skill-tracking page where you rate yourself in eight areas and watch your scores grow.

### 8-Dimension Skill Self-Assessment
**What it is:** Eight skill areas — Critical Thinking, Statistical Literacy (meaning: understanding numbers and data), Source Verification, Emotional Regulation, Islamic Literacy, OSINT (meaning: using publicly available information to investigate claims), Debate, and Media Literacy — each rated 1 to 5 by you. Scores are saved in your browser.
**When it helps you:** A new user sits down and honestly rates themselves before starting the program, creating a starting point to compare against later.

### Radar Chart Visualization
**What it is:** A spider-web shaped diagram (also called a radar chart) where each of the eight skills is a spoke. Your scores are plotted as a shaded shape — a balanced learner has an even shape; a learner with weak areas has a lopsided shape.
**When it helps you:** You instantly see that your "Statistical Literacy" spoke is much shorter than the others — showing that understanding numbers and research studies is your weakest point.

### Progress Bar View Toggle
**What it is:** A button that switches the spider-web display to a simple set of straight bars — one per skill — each filled to your current level.
**When it helps you:** A user who finds the spider-web diagram confusing switches to the familiar bar view instead.

### Level Dot Adjuster
**What it is:** When you click on any skill, it opens up to show five labeled buttons (each named for the level it represents for that skill). You tap one to update your score.
**When it helps you:** After finishing an OSINT exercise, you tap the skill and move yourself up from level 2 to level 3.

### Overall Skill Profile Score
**What it is:** A single percentage bar that adds up all eight skill scores into one headline number, plus the total raw points.
**When it helps you:** A student uses this single number when writing a reflection on their learning progress for a school report.

---

## Corrections Page — `/corrections`

A public record of every mistake the platform has made and fixed — showing it holds itself accountable.

### Public Corrections Log
**What it is:** A list of five publicly disclosed corrections the platform has made — including what the original text said, what it was changed to, why it was wrong, who approved the fix, and a version number. Think of it like a newspaper's published corrections column.
**When it helps you:** A reader finds a claim suspicious and checks the corrections page to see if the platform has already acknowledged and fixed that error.

### Correction Type Filter
**What it is:** A row of filter buttons — Factual, Statistical, Citation, Language, Methodology — that let you show only the corrections you care about.
**When it helps you:** A researcher only wants to see cases where a statistic was wrong, so they tap "Statistical" to filter the list.

### Correction Request Submission Form
**What it is:** A form where anyone can report an error they found — you fill in the page name, the type of mistake, the current wrong text, what you think it should say, and where you found the correct information.
**When it helps you:** You are reading an article on the platform, spot a wrong date in a historical claim, and submit it so the editors can check and fix it.

### Editorial Standards Cards
**What it is:** Six cards describing the rules the platform follows when writing and editing — such as "always use primary sources first," "fix mistakes within 48 hours," and "check that both Arabic and English versions say the same thing."
**When it helps you:** A potential partner organization reads these cards to decide whether the platform's editorial standards are high enough to be trusted.

---

## Methodology Page — `/methodology`

Explains the science behind why and how the platform teaches people to resist misinformation.

### Three Pillars of Cognitive Defense
**What it is:** Three key science ideas that explain how people are fooled and how they can be trained not to be. First, "Inoculation Theory" — the idea that you can protect someone from manipulation by giving them a tiny, safe dose of it first, like a vaccine. Second, "Continued Influence Effect" — the research finding that even after a lie is corrected, it keeps affecting what people believe. Third, "Dual-Process Theory" — the discovery that our brains have a fast, emotional mode (easy to trick) and a slow, careful mode (harder to trick).
**When it helps you:** An educator wants to explain to school administrators why simply fact-checking articles is not enough to protect students — the science here explains why training the brain directly is necessary.

### "Why Tools Cannot Win" 5-Step Proof
**What it is:** A step-by-step argument walking through the seven layers of how information spreads — from the original source all the way to your brain — to show that technology tools can only catch problems at the early layers, but can never protect the final layer: your own thinking.
**When it helps you:** A funder who is deciding between paying for a fact-checking app or for this cognitive training platform reads this to understand why the training approach solves a deeper problem.

### Worldwide Standards Alignment Tables
**What it is:** Four tables that map each platform feature to an internationally recognized standard — for example, showing which features follow UNESCO (United Nations education body) media literacy standards, WHO (World Health Organization) mental health guidelines, Al-Azhar's mainstream Islamic scholarship guidelines, or WCAG (meaning: the international rules for making websites accessible to people with disabilities).
**When it helps you:** An institutional reviewer checking whether the platform meets international quality benchmarks can look up any specific standard by name.

### Source Hierarchy Pyramid
**What it is:** A visual pyramid that shows which types of sources are most trustworthy at the top (for example: peer-reviewed scientific studies, WHO reports) and least trustworthy at the bottom (for example: anonymous social media posts). Like a food pyramid but for evidence.
**When it helps you:** A new user who wonders "why does the platform trust a WHO report more than a YouTube video?" reads this pyramid and immediately understands the logic.

---

## Transparency Page — `/transparency`

Shows every technology, data source, and financial influence behind the platform — nothing hidden.

### AI Models Disclosure
**What it is:** A table listing the five AI systems the platform uses — their names, who made them, what task each one does, and whether it is currently active. For example: one AI model is used for generating answers, another for re-ranking search results.
**When it helps you:** A regulator or a concerned user wants to know exactly which AI companies' technology is analyzing their queries.

### Data Sources Registry
**What it is:** A table of eight trusted organizations whose data and research the platform relies on — such as Reuters Institute (a journalism research center), WHO (World Health Organization), PubMed (a massive database of medical research papers), and CAPMAS (Egypt's official statistics agency) — with a link to each.
**When it helps you:** A journalist writing about the platform wants to verify where a quoted statistic came from.

### Methodology Disclosure
**What it is:** Four cards explaining the specific teaching and research methods the platform uses. "SIFT" is a four-step fact-checking method: Stop, Investigate the source, Find better coverage, Trace claims. "Paul-Elder Framework" is a structured way of evaluating reasoning. "Bloom's Taxonomy" is a map of how humans learn — from memorizing facts up to creating new ideas. "Mustalah al-Hadith" is the centuries-old Islamic science of checking whether a reported saying of the Prophet (peace be upon him) is authentic — it works like a detective method for religious text.
**When it helps you:** A teacher wants to confirm the platform uses recognized, peer-reviewed teaching frameworks before recommending it to a class.

### Conflict of Interest Declarations
**What it is:** Open statements from the Project Lead, the Islamic Content Advisor, and the Psychology Advisor — each declaring whether they have any financial or personal connections that could bias the content they produce for the platform.
**When it helps you:** A university partner wants to confirm no team member has a financial stake in any company whose products the platform evaluates.

### Funding Disclosure
**What it is:** A statement explaining how the platform is paid for — it is self-funded, uses free open-source tools, and is applying for grants — and a guarantee that whoever provides funding has no say over what content is published.
**When it helps you:** A watchdog organization checking for hidden commercial influence reads this to confirm the platform cannot be bought.

### Open Source Commitment tab
**What it is:** A display of the platform's technology stack (the list of software tools it is built on) and three cards explaining: the code is publicly inspectable by anyone, the results can be independently repeated, and the community can contribute improvements. "Open source" means the code is published for anyone to read and audit — like publishing your recipe so anyone can check the ingredients.
**When it helps you:** A software engineer wants to inspect the AI analysis code to check for hidden biases before recommending the platform to a government ministry.

---

## About Page — `/about`

Everything you need to know about what the platform is, who built it, and why it is different.

### Mission & Identity tab
**What it is:** A plain-language description of the platform's purpose and its three main engines — DeepReal (for spotting fake images, videos, and AI-generated content), Mental Health (for protecting your emotional wellbeing from manipulative content), and Religion Hub (for defending against fake religious claims). Each engine is described in terms of what skill it builds and what danger it protects against.
**When it helps you:** A visitor who just arrived on the platform reads this tab first to understand what they can learn here and why it matters.

### Team & Institution tab
**What it is:** Cards for each of the five team members — showing their name, role in Arabic and English, and their institution (Higher Technology Institute in New Heliopolis). Also shows the academic supervisor and contact information.
**When it helps you:** A competition judge wants to verify the project is a real academic submission with identified student authors.

### Original Contributions tab
**What it is:** A description of four new things this platform created that did not exist before: the EAL platform itself, a vocabulary-based deception detection system called KeyHunter (a 7-layer taxonomy — meaning: a structured list — of deceptive language patterns), the first multi-domain study measuring all three areas (media, mental health, religion) at once, and a reusable design framework other researchers can copy.
**When it helps you:** A grant reviewer needs to confirm the project is genuinely new and not just a copy of existing tools.

### Competitive Analysis tab
**What it is:** A side-by-side table comparing this platform against seven similar tools (such as the "Bad News" game, Google's pre-bunking exercises, the Headspace meditation app, and others) — listing each tool's strengths, weaknesses, and the specific gap that EAL fills which none of the others do.
**When it helps you:** An investor asking "why does this need to exist when other tools are already out there?" finds the clear answer here.

### Evidence Types tab
**What it is:** A visual guide that explains the different categories of evidence — showing what counts as strong proof versus weak proof in different contexts (scientific vs. religious vs. journalistic).
**When it helps you:** A researcher wants to confirm the platform distinguishes between, say, a peer-reviewed medical study and an anecdotal social media post.

### Defense Library tab
**What it is:** A navigational overview listing every tool the platform offers for protecting yourself from deception — all in one place.
**When it helps you:** A new user feels overwhelmed and uses this tab as a map to find the right tool for their specific question.

### Framework Coverage Map tab
**What it is:** A visual map showing which scientific and educational frameworks each platform feature is grounded in — so you can see there are no gaps in the coverage.
**When it helps you:** An academic supervisor checking a student's thesis needs to confirm all required frameworks are actually implemented, not just mentioned.

---

## AI Agents Page — `/ai-agents`

Five specialized AI investigators working together to check a claim from every angle.

### Multi-Agent Investigation Panel
**What it is:** You type or paste a claim, and five different AI "agents" (meaning: specialized AI programs, each with its own job) immediately start working on it at the same time. One hunts for sources, one checks for bias, one analyzes the Arabic language, one builds a timeline, and one finds counter-evidence. You can watch each agent's status in real time — idle, working, done, or error.
**When it helps you:** You read a viral claim that a new drug cures a disease. You paste it here and within moments five independent AI perspectives have analyzed it from different angles.

### Agent Result Expansion
**What it is:** Once an agent finishes its work, you click its card to expand it and read its full findings in detail.
**When it helps you:** The source-hunter agent finished first. You click it to read exactly which sources it found (or failed to find) for the claim.

### Verdict Display
**What it is:** After all agents finish, a single final verdict is shown — TRUE, FALSE, MISLEADING, UNVERIFIED, or PARTIALLY TRUE — with a color-coded icon and an Arabic label.
**When it helps you:** After reading all five agents' findings, you see the bright red "FALSE" verdict with the Arabic equivalent, giving you a clear definitive answer to share.

### Investigation History Modal
**What it is:** Every investigation you run is saved in your browser. You can open the history panel to reload any previous investigation without running the analysis again.
**When it helps you:** You ran an analysis three days ago on a claim about a local politician. Today someone brings up the same claim and you reload your saved investigation instantly.

---

## AI Editor Page — `/ai-editor`

A tool for building interactive educational widgets by describing what you want in plain words.

### Natural Language UI Generation
**What it is:** You type a plain-language description of an educational tool you want — for example, "a quiz card about spotting fake medical claims" — and the system generates a working interactive widget on the spot, powered by an extremely large AI model (NVIDIA's Nemotron-3 Ultra 550B, meaning: a very powerful AI with 550 billion parameters — think of it as one of the world's most capable AI reasoning engines).
**When it helps you:** A teacher who cannot write computer code wants to create a custom exercise for her students about vaccine misinformation — she types what she wants and gets a working widget in seconds.

### Logic Scenario Template Library
**What it is:** Eight categories of ready-made templates — Defense Tools, Islamic, Science, Cognitive Training, Dashboards, Social Media, Gamification — each containing pre-written prompts for tools like a claim verification card, a hadith (meaning: a reported saying of the Prophet, peace be upon him) authentication card, a cognitive bias quiz, or a p-value visualizer (meaning: a tool that shows whether a scientific result is statistically convincing or could just be random chance).
**When it helps you:** A lecturer who wants a quick interactive p-value demonstration for a statistics class selects the science template, clicks a button, and gets a working visualizer without writing a line of code.

### Template Difficulty Filter
**What it is:** Each template is labeled Beginner, Intermediate, or Advanced. You filter to only see templates at the right level.
**When it helps you:** A middle-school teacher filters to "Beginner" templates to avoid accidentally picking something too complex for her students.

### Category Filter Chips
**What it is:** Clickable labels at the top of the template library that filter the list to one specific content area — Defense, Islamic, Science, etc.
**When it helps you:** An Islamic studies teacher only wants to see religion-related templates, so she clicks "Islamic" and the list shrinks to only those.

---

## Angry Debunkers Page — `/angry-debunkers`

The platform's most rigorous claim-busting tool — runs every claim through eight layers of analysis.

### GOD-System 8-Layer Claim Analysis
**What it is:** You paste a claim and it is put through seven analysis steps one after another: (1) strip out the emotional language, (2) identify the actual factual claim, (3) separate the variables, (4) cross-reference databases, (5) check context, (6) detect logical fallacies (meaning: tricks in an argument's structure that make it sound valid when it isn't), (7) format the final answer using the "Truth Sandwich" method (meaning: lead with the truth, mention the falsehood only briefly, end with the truth again — a technique proven to prevent the false version from sticking in memory). Works in Arabic and English.
**When it helps you:** You receive a forwarded WhatsApp voice note claiming that a certain herb cures cancer. You transcribe the claim here and get a step-by-step forensic verdict showing exactly where the claim breaks down.

### PDF Document Audit
**What it is:** You upload a PDF file (like a research paper, a ministry report, or a religious opinion document) and the system runs seven stages of forensic checks — scanning the pages, pulling out any methodology claims, checking whether citations are real, cross-referencing against a scientific paper database, checking statistics, detecting pseudoscience (meaning: claims that look like science but don't follow scientific methods), and producing a forensic report.
**When it helps you:** A doctor receives a PDF claiming a supplement company's product has been proven effective in clinical trials. She uploads the PDF to check whether the cited studies are real and whether the statistics are being misrepresented.

### Threat Map & Hunter Mode
**What it is:** A geographical map that shows where pieces of misinformation are spreading, plus an investigation mode for doing a deep dive into a specific misinformation campaign — tracing its origins and spread.
**When it helps you:** A journalist investigates whether a false rumor about election results is spreading from a specific region and uses the Threat Map to visualize and document the spread.

### Session History with Reload
**What it is:** Every analysis you have run on this page is saved in your browser. You can open the history panel and reload any previous result.
**When it helps you:** Yesterday you analyzed a false health claim. Today the same claim surfaces again from a different person, so you reload yesterday's result rather than running a new analysis.

### In-Page AI Chatbot
**What it is:** A chat window embedded on the page that knows the context of the current analysis. You can ask it follow-up questions about the verdict.
**When it helps you:** After getting a "MISLEADING" verdict on a claim, you ask the chatbot "Why exactly is this misleading and not completely false?" and get an explanation.

---

## Arabic Shield Page — `/arabic-shield`

Scans Arabic (or English) messages for psychological manipulation tricks and shows you exactly what they are.

### Arabic Text Manipulation Analyzer
**What it is:** You paste any Arabic or English text — a WhatsApp message, a social media post, a news article — and the tool immediately scans it for seven manipulation techniques: fear-mongering, emotional manipulation, false authority appeal, false urgency, conspiracy logic, in-group/out-group bias (meaning: making you feel that "us" is under threat from "them"), and loaded language (meaning: words chosen specifically to trigger strong emotions). Each technique gets a confidence score.
**When it helps you:** Your aunt sends a scary WhatsApp message saying a vaccine caused deaths. You paste it here and the tool shows you it scores 87/100 on fear-mongering and 91/100 on false urgency — now you understand why it felt so alarming even before you checked the facts.

### Red Flag Highlighting
**What it is:** A list of specific words and phrases from the text that triggered a red flag, each with an explanation in both Arabic and English of why that word is a warning sign.
**When it helps you:** You want to show a family member not just that a message is manipulative but point to the exact words — "Look, the phrase 'your children are in danger' is a fear-mongering trigger."

### Overall Manipulation Score
**What it is:** A single number from 0 to 100 shown on a color-coded gauge — green for safe, yellow for suspicious, red for highly manipulative.
**When it helps you:** Before deciding whether to forward a message, you paste it here and see a score of 73 in orange — a warning to stop and think before sharing.

### Suggested Response Generator
**What it is:** Based on what manipulation techniques were detected, the tool writes a suggested fact-based reply you can send back to the person who sent you the manipulative message. Provided in both Arabic and English.
**When it helps you:** You want to politely correct a relative who shared false health information, and the tool writes a calm, evidence-based response you can copy and paste.

### Emotional Trigger List
**What it is:** A specific list of the emotional words found in the text — the vocabulary designed to make you feel fear, anger, or urgency.
**When it helps you:** A media literacy teacher uses this list in class to teach students exactly which words are being weaponized against their emotions.

### Text-to-Speech (TTS) Button
**What it is:** A button with a speaker icon that reads the analysis results aloud.
**When it helps you:** A user with low literacy or who prefers to listen rather than read gets the full analysis spoken to them.

---

## Assessment Page — `/assessment`

A set of scientifically validated questionnaires used to measure how much the platform actually helps.

### MIST-20 Instrument
**What it is:** A 20-headline test (developed by researchers in 2024, with a reliability score of .77 — meaning it gives consistent results) that measures how well you can tell real news from fake news, and whether you tend to trust everything or distrust everything. Can be taken before and after the training program to measure improvement. MIST-20 stands for Misinformation Susceptibility Test.
**When it helps you:** A researcher uses this test before and after participants complete the training to scientifically measure whether the program makes people harder to fool.

### MHLS Instrument
**What it is:** A 35-question test (with a reliability score of .873) that measures how much you know about mental health conditions — such as recognizing signs of depression or anxiety. MHLS stands for Mental Health Literacy Scale.
**When it helps you:** A researcher measures whether the Mental Health training module actually increases participants' mental health knowledge.

### Brief RCOPE Instrument
**What it is:** A questionnaire that measures how a person uses religion to cope with stress — both in healthy ways (finding meaning, seeking God's guidance) and unhealthy ways (feeling punished by God, blaming others). RCOPE stands for Religious Coping.
**When it helps you:** A researcher assesses whether the Religion Hub module helps participants develop healthier spiritual coping strategies.

### GHSQ Instrument
**What it is:** A questionnaire that asks whether someone intends to seek professional help for a mental health problem. GHSQ stands for General Help-Seeking Questionnaire.
**When it helps you:** A researcher checks whether the Mental Health module makes participants more likely to actually seek therapy or counseling.

### SUS Instrument
**What it is:** A standard 10-question survey that measures how easy and satisfying a website or app is to use. SUS stands for System Usability Scale — it is used worldwide to benchmark how user-friendly digital products are.
**When it helps you:** The design team collects usability scores to identify which parts of the platform confuse users.

### MC-SDS Social Desirability Scale
**What it is:** A set of questions designed to detect whether a person is answering surveys the way they think they are supposed to answer rather than honestly. MC-SDS stands for Marlowe-Crowne Social Desirability Scale — it is like a lie-detection layer for questionnaire data.
**When it helps you:** Researchers use this to filter out responses where participants may have given "socially acceptable" answers rather than honest ones, keeping the study data trustworthy.

### AssessmentEngine Component
**What it is:** The shared system that runs all six questionnaires above in a consistent way — tracking your progress, recording how long you take, and saving your results to the research record automatically.
**When it helps you:** Regardless of which questionnaire a participant is taking, the experience is smooth and identical — no confusion about where to click or how to submit answers.

### Bilingual Administration
**What it is:** A language selector that lets participants take any of the six questionnaires in either English or Arabic, using settings from their participant profile.
**When it helps you:** An Arabic-speaking participant completes the MIST-20 in Arabic, ensuring the test results are valid because language confusion is not interfering with the answers.

---

## Bad News Game — `/bad-news`

A role-playing game where you experience being a misinformation spreader — so you recognize the tricks.

### "Bad News" Misinformation Role-Play Game
**What it is:** Three short game scenarios where you play someone who encounters viral misinformation — such as a blurry photo of ancient technology, a scary WhatsApp health rumor, or a fake video of a politician. In each scenario you choose between the responsible action and the viral, irresponsible one.
**When it helps you:** By experiencing firsthand how tempting it is to share something shocking and unverified, you understand the pull of misinformation from the inside — which makes you more resistant to it in real life.

### Score and Follower Counter
**What it is:** Choosing the wrong option (spreading the misinformation) gives your fake account more followers and a higher score. Choosing the right option gives you almost nothing. This deliberately mirrors how social media rewards viral lies.
**When it helps you:** Players viscerally feel the perverse reward system of social media — understanding why misinformation spreads even when people know better.

### Credibility Tracker
**What it is:** A score that goes down every time you make a manipulative choice in the game — showing you the long-term cost to your reputation.
**When it helps you:** Players see the trade-off: short-term popularity versus long-term trust and credibility.

### Scenario Feedback Explainer
**What it is:** After each choice, a panel appears explaining what the right answer was and why — with cited reasoning from research.
**When it helps you:** Immediately after making a mistake in the game, you learn the evidence-based reason why that choice was harmful — locking in the lesson.

---

## Baseline Page — `/baseline`

A starting-point test taken on Day 0 to measure where you are before any training begins.

### Day-0 Trust Calibration Battery
**What it is:** A five-section test taken before you begin any training — it includes a brief introduction, then tasks where you classify claims as real or fake, pair emotional reactions with evidence, and compare comfort versus accuracy. "Trust calibration" means measuring whether your level of trust in information matches how trustworthy that information actually is.
**When it helps you:** Researchers establish exactly how susceptible each participant is to misinformation on Day 0 so they can later measure the true improvement.

### Claim Classification with Confidence Rating
**What it is:** For each claim you see, you choose real, fake, or unsure — and also move a slider from 0% to 100% to show how confident you are. This lets researchers see not only when you get the answer wrong, but also when you are dangerously overconfident in a wrong answer.
**When it helps you:** Researchers identify participants who get claims wrong but feel 90% sure they are right — the most dangerous group to target with training.

### Emotion vs Evidence Pairing
**What it is:** Short exercises where you are shown an emotionally charged scenario alongside evidence, and your responses reveal whether your emotions or your reasoning are driving your judgments.
**When it helps you:** Researchers measure your System 1 vs System 2 balance — System 1 being the fast, emotional snap-judgment brain and System 2 being the slow, careful, analytical brain.

### Trust Calibration Profile Generation
**What it is:** When you finish the baseline test, the system automatically builds a detailed profile of your specific susceptibility patterns — which types of claims fool you most, how overconfident you are, how much emotions override your reasoning.
**When it helps you:** The research team has a structured data profile for every participant, ready for comparison against their scores after the training ends.

---

## Bias Detector Page — `/bias-detector`

Learn about the mental shortcuts that make you easier to deceive — and scan text for them.

### Cognitive Bias Encyclopedia
**What it is:** An interactive library of six or more named mental shortcuts (called cognitive biases) that the human brain uses — including Confirmation Bias (meaning: only noticing information that confirms what you already believe), Anchoring (meaning: being overly influenced by the first number or fact you hear), Availability Heuristic (meaning: judging how common something is based on how easily examples come to mind), and more. Each entry has a real Egyptian example, an academic citation, and an Arabic translation.
**When it helps you:** A student reads about Confirmation Bias and suddenly recognizes why they kept believing a false health claim — it aligned with something they already thought was true.

### Bias API Detection
**What it is:** You paste any text and click a button. The system sends it to an AI analysis tool and returns a list of specific cognitive biases it detected in the text — pointing out exactly where and how the writer is exploiting mental shortcuts.
**When it helps you:** You paste a viral Facebook post about a political topic into the tool and discover it is heavily exploiting the Bandwagon Effect (meaning: pressure to believe something because "everyone" believes it) and Anchoring.

### Concept Explainer
**What it is:** When you click on any bias in the encyclopedia, a detailed panel opens with a full explanation of how it works psychologically and examples of how it appears in real life.
**When it helps you:** A learner who wants to deeply understand the Dunning-Kruger Effect (meaning: the tendency of people with little knowledge to overestimate their competence) clicks it and reads the full psychological mechanism.

---

## Bias Fingerprint Page — `/bias-fingerprint`

Discover your personal weak spots — which specific mental shortcuts most affect your thinking.

### Behavioral Bias Self-Assessment
**What it is:** For each cognitive bias the platform tracks, you answer a real-life behavioral question — not a theoretical one — on a scale of 0 to 4. Your answers are converted into a 0–100% vulnerability score for each bias. No scores are pre-set; your vulnerability score is entirely based on your own responses.
**When it helps you:** Instead of being told "everyone is vulnerable to Confirmation Bias," you find out your specific score is 78% for that bias — giving you a personalized target to work on.

### localStorage Persistence
**What it is:** Your fingerprint answers are saved in your own browser (under a name called "eal-bias-fingerprint-answers"), so when you come back weeks later your profile reflects accumulated interactions — not just one sitting.
**When it helps you:** A returning user opens the page and immediately sees their current bias profile without having to re-answer everything.

### Exercise Recommendations
**What it is:** Each bias in your fingerprint shows links to the specific EAL exercises that target that vulnerability.
**When it helps you:** Your fingerprint shows you score high on Availability Heuristic. The card immediately shows which exercises will help you practice overcoming it.

### Arabic Tip for Each Bias
**What it is:** Each bias card includes a practical tip in both Arabic and English — for example, "Use SIFT" (meaning: Stop, Investigate the source, Find better coverage, Trace the claim) or "Try lateral reading" (meaning: open multiple new tabs to check what other sources say about the source, not just the claim itself).
**When it helps you:** An Arabic-speaking user gets actionable advice in their native language about how to resist their top bias in their daily life.

---

## Blackbox Page — `/blackbox`

The most comprehensive claim audit — checks a claim across seven different dimensions at once.

### 7-Dimension Forensic Audit
**What it is:** You paste a claim and the system simultaneously scores it across seven dimensions: How credible is the source? Is the logic consistent? Is it emotionally manipulative? Is it still timely? Is any attached media authentic? Is it scientifically grounded? Does it align with verified Islamic scholarship? Each dimension is scored using multiple real-world databases.
**When it helps you:** You want the most thorough possible check on a claim — not just a true/false verdict, but a complete breakdown of every possible angle where it could be misleading.

### Animated 6-Step Reasoning Chain
**What it is:** As the analysis runs, you watch six steps animate one after another — Intake, Decomposition, Source Trace, Cross-Reference, Media Forensics, and Synthesis — each lighting up when active, so you understand what the system is doing.
**When it helps you:** A researcher presenting the platform to an audience shows this animation to illustrate that the system is doing real multi-step reasoning, not just returning a single AI guess.

### Quick Example Prompts
**What it is:** Four pre-loaded example claims from Egyptian misinformation — including "lemon water cures cancer," a 5G/COVID conspiracy claim, a fake Al-Azhar fatwa (meaning: an Islamic legal ruling) about Bitcoin, and a false currency devaluation story. You click one to instantly run a demo analysis.
**When it helps you:** A new user who is not sure what to type clicks an example to immediately see how the system works.

### One Law Enforcement Display
**What it is:** The result includes a compliance check showing whether the verdict meets the platform's "One Law" — the rule that no claim can reach you without a real, checkable source. The display shows the compliance status, the tier of evidence, and how many admissible sources were found.
**When it helps you:** Users can see at a glance whether the verdict is backed by verified sources or whether it is marked as unverifiable because no qualifying sources exist.

---

## Certificate Page — `/certificate`

Earn and download a certificate when you complete enough of the training program.

### Dynamic Completion Certificate
**What it is:** The page reads your saved progress and generates a personalized certificate showing your name, what percentage of the 42 exercises you completed, which of the three training tracks you are strongest in (DeepReal, Mental Health, or Religion Hub), and today's date. A certificate is generated when you reach 80% or more.
**When it helps you:** A student completes the program and earns a certificate to attach to a university portfolio or scholarship application.

### Download Certificate
**What it is:** A download button that saves your certificate as an image file you can keep and share.
**When it helps you:** A user posts their certificate on LinkedIn to show employers they have completed a verified critical-thinking training program.

### Progress Gate
**What it is:** If you have not yet reached 80% completion, the page shows exactly how much of the program is left and what you still need to do.
**When it helps you:** A user who is at 65% completion sees "You need 15% more to earn your certificate" and knows exactly which sections to finish.

---

## Chatbot Page — `/chatbot`

An AI chat assistant for asking questions about misinformation, mental health, and Islamic topics.

### Multi-Mode AI Chatbot
**What it is:** A chat interface where you can choose different "modes" — each one changes what the AI focuses on and how it speaks to you. For example, one mode focuses on fact-checking, another on mental health support, another on Islamic questions.
**When it helps you:** You are feeling anxious about a scary health rumor and switch to the Mental Health mode, where the chatbot responds with both fact-checking and emotional support.

### Session Management
**What it is:** You can create multiple separate named chat conversations — each stored in your browser — and switch between them. Like having different chat threads for different topics.
**When it helps you:** You keep one chat session for questions about health misinformation and another for Islamic scholarship questions, so they don't mix together.

### Onboarding Flow
**What it is:** The first time you open the chatbot, a welcome screen appears explaining the platform's rules and limitations before you start chatting.
**When it helps you:** A new user understands upfront that the chatbot can assist and guide but is not a replacement for a doctor or a scholar.

### Chat Export (Download)
**What it is:** A button to download your full conversation transcript as a file.
**When it helps you:** You have a useful conversation about a complex Islamic misinformation topic and download it to review later or share with a friend.

### Scroll-to-Bottom Button
**What it is:** When you scroll up in a long conversation, a button appears that jumps you back to the most recent message with one click.
**When it helps you:** After scrolling up to re-read something, you click the button instead of scrolling back down through dozens of messages.

---

## Check Image Page — `/check-image`

Fact-check a claim that is written inside an image — like a screenshot or a meme.

### Screenshot OCR Fact-Check
**What it is:** You upload an image — a screenshot of a WhatsApp message, a meme, a photo of text — and the system reads the text out of the image using OCR (meaning: Optical Character Recognition — technology that converts an image of text into actual readable text, like how a scanner converts a physical page to a document). It then runs that extracted text through the full fact-checking pipeline and returns a verdict.
**When it helps you:** Someone sends you a screenshot of a "news article" making a health claim. You upload the screenshot and get a fact-check verdict without having to type out the claim manually.

### Image Preview
**What it is:** The uploaded image is shown on the page next to the analysis results.
**When it helps you:** You confirm you uploaded the right image before reading the verdict.

### One-Law Enforcement Display
**What it is:** Shows whether the verdict meets the platform's strict source standard — verified, unverified, what tier the evidence is, and how many qualifying sources were found.
**When it helps you:** You see "UNVERIFIED — no admissible sources found" and know the claim cannot be confirmed through any reliable database.

### Source List with Tier Badges
**What it is:** A list of every source the system used to reach the verdict, each with a label showing its evidence tier (e.g., peer-reviewed study, government database, reputable news agency).
**When it helps you:** You click through to the actual WHO page that contradicts the health claim in the image.

---

## Cognitive Lab Page — `/cognitive-lab`

A research-style workspace for exploring and testing cognitive biases.

### Cognitive Bias Browser
**What it is:** A searchable list of all the cognitive biases in the platform's database — each with an icon, a color, and a short description. Click any bias to see its full profile.
**When it helps you:** A student exploring the topic browses the full list like an encyclopedia to discover biases they have never heard of before.

### Live Bias Detection on Text
**What it is:** A text box where you paste any content and click scan. The system sends it to the bias detection engine and returns a list of biases found in the text.
**When it helps you:** A journalism lecturer runs a student's draft article through the scanner to show the class which biases the student unconsciously wrote into their piece.

### Bias Search Filter
**What it is:** A search box that filters the bias library as you type — narrowing the list by name or description.
**When it helps you:** You type "anchor" to immediately find the Anchoring Bias entry without scrolling through the entire list.

---

## COM-B Tracker Page — `/comb-tracker`

Measures whether your actual behavior has changed — not just your knowledge.

### COM-B Behavioral Change Dashboard
**What it is:** This page reads your full activity history and calculates a score across three components: Capability (meaning: do you have the skill and knowledge to act differently?), Opportunity (meaning: do your environment and social circle support the new behavior?), and Motivation (meaning: do you genuinely want to act differently?). These three components together make up the COM-B model — a widely used behavioral science framework (COM-B = Capability, Opportunity, Motivation → Behavior) for understanding why people do or don't change their habits. The three scores are combined into an overall Behavior Change score.
**When it helps you:** A researcher checks whether the program has moved participants from "I know misinformation is bad" to "I actually behave differently when I encounter it."

### Track Breakdown
**What it is:** The dashboard splits your exercise completions into the three training tracks — DeepReal, Mental Health, Religion Hub — and shows how each has contributed to your behavioral change score.
**When it helps you:** A learner discovers that most of their growth is in Media literacy but very little in Mental Health — so they know where to focus next.

### Verification-Use Counter
**What it is:** Tracks how many times you have actually used the platform's verification tools (not just studied them). This is stored in your browser.
**When it helps you:** Researchers measure real-world tool adoption — the difference between someone who learned about SIFT and someone who actually used it 15 times this week.

---

## Competition Demo Page — `/competition-demo`

An automatic live demonstration of the platform's full capabilities for judges and audiences.

### Auto-Running Platform Showcase
**What it is:** A page that automatically runs through all the platform's major features in under 60 seconds by actually calling the real tools with realistic Egyptian misinformation examples — no manual clicking needed.
**When it helps you:** At a competition presentation, the team presses one button and the audience watches every major system fire live, demonstrating the platform is working and not just a mockup.

### Multi-Step Demo Runner
**What it is:** Six or more demo steps — including the GOD-System analysis, fallacy detection, cognitive bias scanning, and more — each showing the endpoint being called, the data going in, a category tag, and a link to the full tool.
**When it helps you:** Academic committee members watching a project defense see a structured, time-limited live demonstration of each feature with a link to explore it themselves.

---

## Connect Page — `/connect`

A social space where platform users challenge each other and compete on the leaderboard.

### Peer Challenge Feed
**What it is:** A live feed of challenges sent from other users — for example, "Can you beat my OSINT (meaning: open-source investigation) score?" You can accept or decline each challenge.
**When it helps you:** A user who learns better through competition accepts a challenge from a classmate to see who can fact-check a set of claims most accurately.

### Leaderboard
**What it is:** A ranked list showing all users' XP totals (XP = experience points, earned by completing exercises) and their current level.
**When it helps you:** A user sees they are in fourth place and completes two more exercises to move up to third.

### XP & Level Display
**What it is:** Your current level and total XP points shown prominently on the page.
**When it helps you:** You open the page and immediately see you are "Level 4 — 4,250 XP," knowing exactly where you stand.

---

## Critical Thinking Page — `/critical-thinking`

A guided step-by-step framework for analyzing any claim, religious or scientific.

### 6-Step Critical Thinking Framework
**What it is:** An interactive six-step guide you walk through for any claim: (1) What is the claim? (2) Who is the source? (3) What is their methodology (meaning: how did they arrive at this conclusion)? (4) What does the data actually show? (5) Is the logic sound? (6) What is your verdict? Each step has a text area for your notes.
**When it helps you:** You hear a claim on the news about a new health treatment. You open this framework and work through each step, arriving at a reasoned conclusion rather than a gut reaction.

### Domain-Specific Guiding Questions
**What it is:** Each of the six steps includes three context-specific questions that work for both scientific claims and Islamic claims simultaneously — for example, asking about sample size for a study, or asking about the chain of narrators (called isnad — the series of people who passed down a hadith, used in Islamic scholarship to verify authenticity) for a religious text.
**When it helps you:** A student evaluating both a medical study and a religious ruling can use the same framework without needing two separate tools.

---

## Curriculum Page — `/curriculum`

An overview of the complete five-phase learning program from start to finish.

### 5-Phase Curriculum Overview
**What it is:** A roadmap of the entire program — Phase 0 (Calibration, 14 days), Phase 1 (Cognitive Armor, 30 days), Phase 2 (Deep Verification, 30 days), Phase 3 (Islamic Shield, 30 days), and Phase 4 (Live Defense, 30 days) — with a description of each phase and links to start it.
**When it helps you:** A new participant reads this page to understand the full commitment before starting — and a returning participant uses it to navigate directly to whichever phase they are in.

### Key Metrics Summary
**What it is:** A quick summary showing the scope of the program: approximately 42 guided days, 33 science exercises, 5 phases, and 5 validated measurement scales.
**When it helps you:** A funder or administrator wants to understand the scale of the program at a glance.

---

## Curriculum Phase 0 — `/curriculum/phase0`

The first 28 days — establishing where you are before training begins.

### 28-Day Phase 0 Exercise Calendar
**What it is:** A grid of 28 days, each labeled with the day's specific exercise name (in English and Arabic), its type (Assessment, Calibration, Forensics, etc.), and whether you have already completed it.
**When it helps you:** A learner returning after a few days off opens the calendar to see exactly which days they have already completed and which is the next one waiting.

### Progress Sync
**What it is:** The calendar reads your saved progress from the platform's tracking system to mark completed days — so it always shows your real current state.
**When it helps you:** A user who completed days 1–8 sees those days marked as done and resumes from day 9 without any manual input.

---

## Curriculum Phase 1 — `/curriculum/phase1`

Building Cognitive Armor — exercises targeting mental health literacy and manipulation resistance.

### Phase 1 Mental Health Myth Card Exercises
**What it is:** A set of exercises using Mental Health cards that challenge common myths about psychological conditions, combined with bias and fallacy training and a six-layer verification drill.
**When it helps you:** A learner who completes this phase can recognize when emotional manipulation is using mental health fears (like "this will cause depression") to make a health claim more frightening.

### ScenarioResponsePlayer
**What it is:** An interactive component that presents real-world scenarios — for example, a conversation where someone is being psychologically manipulated — and asks you to respond. Your choices are then evaluated and explained.
**When it helps you:** A learner practices the right response to a manipulative message in a safe simulated environment before facing it in real life.

---

## Curriculum Phase 2 — `/curriculum/phase2`

Deep Verification — the scientific and forensic skills phase.

### Science Exercise Browser
**What it is:** A browsable collection of exercises from the platform's science library, filterable by difficulty (Beginner, Intermediate, Advanced) and labeled with color-coded difficulty badges. Covers topics like OSINT (meaning: open-source investigation), image forensics, research paper auditing, and statistical reasoning.
**When it helps you:** A learner who is already comfortable with basic fact-checking filters to "Advanced" exercises to challenge themselves with paper-level forensic analysis.

### Statistical Concept Detail
**What it is:** Each science exercise includes a plain-language explanation of the statistical idea behind it — for example, what "p-value" means or what "sample size" affects.
**When it helps you:** A learner who does not have a science background can complete the exercise and understand the underlying concept without needing a statistics class first.

---

## Curriculum Phase 3 — `/curriculum/phase3`

The Islamic Shield — protecting yourself from religious misinformation.

### Islamic Shield Module Browser
**What it is:** Four weeks of modules covering: the foundations of Islamic ways of knowing, the science of authenticating hadith (meaning: reported sayings of the Prophet, peace be upon him), how the Quran is misquoted and taken out of context, and more. Each module links to relevant platform tools, lists its Islamic references, difficulty level, and number of exercises.
**When it helps you:** A learner who has received a forwarded message claiming a specific hadith says something extreme completes this phase and knows how to verify whether that hadith is authentic and what it actually means in context.

### Classical Reference Integration
**What it is:** Each module is anchored to a specific classical Islamic text — for example, al-Shafi'i's Risala (meaning: one of the founding works of Islamic legal methodology) or Ibn Hajar's Taqrib al-Tahdhib (meaning: a major reference work for evaluating the reliability of hadith narrators). This grounds the module in recognized traditional scholarship.
**When it helps you:** An Islamic studies educator checking whether the curriculum is grounded in real classical scholarship can look up the cited texts and confirm they are authentic major references.

---

## Curriculum Phase 4 — `/curriculum/phase4`

Live Defense — the final capstone phase where you prove your skills under real conditions.

### Live Defense Capstone Challenges
**What it is:** Expert-level timed challenges — including a "Boss Fight" where you must debunk 20 real claims in 60 minutes, an OSINT investigation of actual Egyptian misinformation campaigns using the Threat Map, and a Community Defense Mission. These use real claims, not practice scenarios.
**When it helps you:** A learner who has completed all four previous phases proves they can apply everything they learned under realistic time pressure with real-world content.

### Badge & Milestone System
**What it is:** Completing each capstone challenge unlocks a named badge — such as "Fact Warrior" or "Intelligence Analyst" — and grants access to the next challenge.
**When it helps you:** A learner displays their "Fact Warrior" badge as a credential in their portfolio and is motivated by the clear progression to keep completing challenges.

---

## Cohort Dashboard — `/dashboard/cohort`

Measures whether the training program actually works — in scientific terms.

### Cohort Efficacy Dashboard
**What it is:** This page retrieves and displays the before-and-after MIST-20 scores (meaning: the misinformation susceptibility test taken before and after training) for all participants as a group. It shows the average improvement, the Cohen's dz effect size (meaning: a standard measure of how big the improvement was — an effect size of 0.5 means a "medium" real-world impact), the 95% CI (meaning: Confidence Interval — the range within which the true average almost certainly falls), and the gullibility change.
**When it helps you:** A researcher presents one citable, scientifically formatted answer to the most important question: does this program actually make people harder to fool?

### Distrust Drift Flag
**What it is:** An automatic warning flag that appears if the data shows the training made participants too suspicious — distrusting legitimate news as well as fake news. This is an important potential side effect.
**When it helps you:** Researchers monitor for the risk that anti-misinformation training could backfire by making people distrust everything, and flag it honestly if it happens.

### Caveats Section
**What it is:** A section listing the statistical limitations of the efficacy results — for example, small sample size, self-selection bias, or missing data.
**When it helps you:** Ensures that anyone who sees the efficacy results also sees its limitations, so the claim is not overstated.

---

## Personal Dashboard — `/dashboard`

Your personal progress headquarters — tracks everything in one place.

### Personal Progress Dashboard
**What it is:** A summary page showing how many days you have completed, what today's exercise is, how much time you have spent today, how far along you are in each of the three training tracks (DeepReal, Mental Health, Religion Hub), and whether you have completed your assessments.
**When it helps you:** A learner opens the dashboard each morning to see exactly where they are and what to do next.

### Area / Bar Charts
**What it is:** Interactive charts (built with a library called Recharts) showing your engagement over time and your progress in each training track as visual bars and area graphs.
**When it helps you:** A visual learner sees their activity chart and notices a gap of five days when they stopped — motivating them to get back on track.

### Confidence Shift Tracker
**What it is:** Shows the average change in your self-reported confidence between before and after exercises — measuring whether training is building appropriate certainty (not overconfidence).
**When it helps you:** A learner sees their confidence has increased by an average of 23% after exercises, suggesting the training is having a real impact on their self-assurance.

### Source Click Stats
**What it is:** Tracks how often you actually click through to the sources cited in verdicts — not just read the verdict itself.
**When it helps you:** Researchers measure a key behavioral outcome: are participants genuinely engaging with evidence, or just accepting verdicts at face value?

### Research Data Export
**What it is:** Buttons that generate your personal data as a downloadable CSV file (meaning: a spreadsheet file) or JSON file (meaning: a structured data file used by researchers and software) for research analysis.
**When it helps you:** A researcher downloads individual participant data files for statistical analysis after the study period ends.

### Printable Awareness Report
**What it is:** A formatted HTML page (meaning: a web-formatted document that looks polished when printed) summarizing your entire awareness journey — all your scores, progress, and achievements.
**When it helps you:** A participant prints this report and includes it as an attachment in a scholarship application or a school portfolio.

### Shareable Report Link
**What it is:** A button that generates a unique URL you can share with someone else so they can view your progress report.
**When it helps you:** A student shares their progress link with their supervisor to demonstrate they have been engaging seriously with the program.

### Admin Mode
**What it is:** A hidden set of extra controls that becomes visible only to platform administrators, giving them access to cohort-level analytics and management tools.
**When it helps you:** A platform administrator checks overall participant counts and cohort completion rates without needing to log into a separate system.

### Source Freshness Report
**What it is:** An automatic check that reviews all the sources cited across the platform and flags any that may have become outdated.
**When it helps you:** An editor is automatically alerted when a cited statistic from 2020 has been superseded by newer data, so they can update it.

### COM-B Profile Summary
**What it is:** A snapshot of your Capability-Opportunity-Motivation (COM-B — the behavioral change science framework) breakdown shown right on the dashboard alongside your raw exercise progress.
**When it helps you:** A learner sees at a glance not just "I finished 18 exercises" but also "my Motivation score is high but my Opportunity score is low — I need a more supportive environment."

---

## Debate Simulator — `/debate-sim`

Practice spotting flawed arguments by debating an AI that secretly uses logical tricks against you.

### Socratic Devil's Advocate Debate
**What it is:** You make a claim, and an AI argues back — but secretly embeds a specific logical fallacy (meaning: a trick in an argument's structure that sounds convincing but is actually invalid — for example, "everyone believes this, so it must be true" is a Bandwagon Fallacy) in its response. Your job is to identify which trick it used.
**When it helps you:** A student practices spotting fallacies not by reading about them but by experiencing them in a realistic back-and-forth debate.

### Fallacy Label Reveal
**What it is:** After the AI responds, its message card shows the name of the fallacy it embedded — so you can check whether you caught it.
**When it helps you:** You guessed the AI used "Appeal to Authority" (meaning: claiming something is true just because an authority figure said it). The reveal shows you were right — or tells you what you missed.

### Bilingual Interface
**What it is:** All AI and user messages support both Arabic and English, with toggle support.
**When it helps you:** An Arabic-speaking learner debates the AI entirely in Arabic, practicing logical reasoning in their native language.

---

## DeepReal Forensics Page — `/deepreal-forensics`

Upload a photo and find out whether it is real or AI-generated/manipulated.

### Real Image Authentication
**What it is:** You upload a photo and the system runs two checks: it reads the hidden technical data embedded in the image file (called EXIF metadata — meaning: invisible data stored inside a photo file by the camera, recording things like the camera model, date taken, and GPS location) and sends it to a deepfake detection service (a deepfake is a photo or video where AI has altered faces or created a fake scene). The result is one of four verdicts: AUTHENTIC, LIKELY FAKE, SUSPICIOUS, or INCONCLUSIVE.
**When it helps you:** A journalist receives a "news photo" from an unknown source and uploads it here before publishing — the system shows the EXIF data was stripped (a common sign of manipulation) and the deepfake score is high.

### EXIF Metadata Display
**What it is:** Shows the hidden camera data read from the photo — the camera brand and model, the software used to edit it, the date and time the photo was taken, and the GPS coordinates if present.
**When it helps you:** You see the photo was supposedly taken in Cairo in 2024 but the EXIF data shows it was processed by an AI image editor — a strong red flag.

### Metadata Signals List
**What it is:** A plain-language interpretation of what each piece of EXIF data means for authenticity — for example, "No GPS data found — we cannot confirm where this photo was taken."
**When it helps you:** A non-technical user understands what the technical metadata actually means for whether the photo is real, without needing to know anything about photography or data.

### AI Intelligence Verdict
**What it is:** A bilingual (English and Arabic) explanation of the final verdict — including the confidence level, specific action items, and a risk level.
**When it helps you:** After the analysis, you get a clear "High risk — do not share this image without further verification" recommendation in both languages.

---

## DeepReal Upload Page — `/deepreal-upload`

Upload multiple files at once for forensic analysis.

### Multi-Format Upload Queue
**What it is:** A drag-and-drop zone where you can upload multiple files at once — photos (JPG, PNG), videos (MP4), audio (WAV), and documents (PDF). Each file gets its own progress bar showing how the analysis is going.
**When it helps you:** An investigator has five suspect images from an online post and uploads all five at once rather than checking them one by one.

### Per-File Analysis Status
**What it is:** Each uploaded file has its own status indicator that moves through stages — queued, analyzing, complete, or error — with an animated progress bar.
**When it helps you:** You watch in real time as three files finish analysis quickly while a large video file is still processing — knowing you don't have to wait for all of them before reading the first results.

---

## DeepReal Daily Exercise — `/deepreal/exercise/[day]`

One new forensic skills exercise every day for 14 days.

### 14-Day DeepReal Exercise Engine
**What it is:** A dynamic page that loads a different validated exercise each day for 14 days — each exercise is a tested, structured learning activity stored as a data file. When you finish, your completion is recorded automatically to your research progress record.
**When it helps you:** A learner opens day 7's exercise, completes it, and the system marks day 7 done — keeping their streak intact and their research data up to date.

### Research Snapshot Sync
**What it is:** Every time you complete a daily exercise, the system automatically updates your participant research record with the new data point.
**When it helps you:** Researchers always have accurate, up-to-date completion records for every participant without needing manual data entry.

---

## DeepReal Game — `/deepreal/game`

A game that builds manipulation immunity by safely exposing you to deception techniques.

### DeepReal Inoculation Game
**What it is:** A game (driven by a real live server) that deliberately exposes you to manipulation techniques in a safe, game-like environment — similar to how a vaccine works by giving you a harmless version of a pathogen so your body learns to fight it. This is called "inoculation" in the research — pre-exposing someone to weakened manipulation so they recognize and resist the real thing.
**When it helps you:** A player who would normally be vulnerable to AI-generated fake images becomes harder to fool after playing because the game has trained their pattern-recognition instincts.

---

## DeepReal Hub — `/deepreal`

The central navigation page for all media forensics tools.

### DeepReal Command Center
**What it is:** A hub page with four large tool cards linking to Image Forensics, Video Analysis, Audio Check, and C2PA Verification (C2PA means: Content Credentials — an industry standard where cameras and AI tools embed a hidden verified signature in media files to prove their origin, like a tamper-proof seal on food packaging).
**When it helps you:** A user who received a suspicious video clip, not a photo, goes straight to Video Analysis from this hub rather than hunting through menus.

### Drag-and-Drop File Entry
**What it is:** You can drag a file directly onto the hub page to start analysis, rather than opening a specific tool first.
**When it helps you:** A user who already has the suspicious file open drags it straight onto the page for the fastest possible entry.

---

## Defense Main Plan — `/defense-main-plan`

The project team's internal preparation hub for academic and investor presentations.

### 10-Part Defense Command Center
**What it is:** A navigation hub with ten sections covering everything the project team needs for a formal academic defense — demo pages, diagnosis of weak pages, resilience strategy, live-defense scripts, API status checks, and research outcome summaries.
**When it helps you:** The project team opens this page the morning of their thesis defense to confirm every section is ready and navigate to any part instantly.

### PartNavigation Component
**What it is:** Quick-jump links that let you jump directly between the ten defense sections without scrolling.
**When it helps you:** A presenter mid-defense needs to jump from the Research Outcomes section back to the API Status section quickly — one click gets them there.

---

## Defense Pages Map — `/defense-pages-map`

A complete directory of every tool on the platform, organized by category.

### Platform Tool Map by Category
**What it is:** A grouped directory of all platform tools organized into six categories — Verification & Forensics, DeepReal & Media, Cognitive Training, Islamic Defense, Mental Health, and more — each with a link, tool name, and one-line description.
**When it helps you:** During a live demo, a judge asks "do you have a tool for Islamic misinformation?" and the presenter finds and opens it from this map in seconds.

### Bilingual Category Headers
**What it is:** Each category has a header in both Arabic and English.
**When it helps you:** An Arabic-speaking evaluator navigates the map in Arabic without switching to a different interface.

---

## Defense Q&A Page — `/defense-qa`

Preparation materials for students presenting this project to an academic committee.

### Expected Q&A tab
**What it is:** An accordion list (meaning: a list where you click a question to expand the answer, then click again to collapse it) of questions the committee is likely to ask, with model answers — all in Arabic.
**When it helps you:** A student rehearses the defense the night before by reading through each expected question and comparing their answer to the model answer.

### Presentation Script tab
**What it is:** A full bilingual (Arabic and English) presentation script — the complete text the presenter would deliver during the formal defense.
**When it helps you:** A presenter who is nervous about forgetting key points reads through the full script to internalize the structure before the defense.

### Eight Theories tab
**What it is:** A list and explanation of the eight scientific theories that underpin the platform's approach to education and behavior change.
**When it helps you:** A student who is asked "what is the theoretical basis for your platform?" can name and explain all eight theories confidently.

### Visual Map tab
**What it is:** A visual overview diagram of the entire project — showing how all the parts connect.
**When it helps you:** A presenter points to the visual map during the oral defense to give the committee a quick bird's-eye view of the project architecture.

---

## Defense Test Page — `/defense-test`

A self-test quiz to make sure students can answer technical questions before the real defense.

### 12-Question Defense Preparation Quiz
**What it is:** A multiple-choice quiz covering key platform topics — SIFT (meaning: Stop, Investigate the source, Find better coverage, Trace the claim — a four-step fact-checking method), FLICC (meaning: a taxonomy of five techniques used to deny science — Fake experts, Logical fallacies, Impossible expectations, Cherry picking, Conspiracy theories), ELA (meaning: Error Level Analysis — a technique for detecting image manipulation by analyzing compression patterns), ad hominem (meaning: attacking the person making an argument instead of the argument itself), the Bandwagon Effect, and more. The quiz shows your score and detailed explanations at the end.
**When it helps you:** A student takes the quiz two days before the defense and discovers they cannot correctly explain FLICC — giving them time to study before the real presentation.

### Scored with Explanatory Feedback
**What it is:** After each question, the correct answer is revealed along with a detailed explanation citing the original researcher or source.
**When it helps you:** A student who answered wrong reads the explanation and finally understands the concept — learning from the mistake in a low-stakes environment.

---

## Demo Page — `/demo`

A single showcase page combining the platform's most impressive interactive components.

### Cognitive Fortress Dashboard Demo
**What it is:** A showcase page that brings together several of the platform's most visually impressive components in one place — a 3D interactive pyramid, an onboarding tour guide, an Islamic ethics analyzer, and an animated content-reveal component — for presenting to judges or introducing new users.
**When it helps you:** A competition judge gets a single impressive page showing the platform's depth without having to navigate across multiple pages.

### Maqasid Impact Analysis
**What it is:** A live analysis of a real-world example — specifically, a fraudulent religious practice (ruqyah fraud, meaning: people falsely claiming to perform Islamic healing rituals for money) — evaluated against the five Maqasid al-Shariah (meaning: the five fundamental objectives of Islamic law that scholars use to evaluate whether something is beneficial or harmful — protecting life, intellect, lineage, wealth, and religion). The analysis labels each dimension as either "harm" or "benefit."
**When it helps you:** An educator demonstrates to students how Islamic jurisprudence can be used as a systematic ethical framework to evaluate harmful religious fraud — not just a feeling but a structured analytical method.

### 3D Source Pyramid
**What it is:** An interactive three-dimensional pyramid (built with three.js, a 3D graphics library) showing the evidence hierarchy — you can rotate and explore it.
**When it helps you:** A presenter shows the evidence hierarchy to an audience in a visually memorable, interactive way rather than a flat diagram.

### Fortress Onboarding Tour
**What it is:** A guided overlay that walks first-time users through the platform's key sections one step at a time, using the metaphor of building a "Cognitive Fortress" — defenses around your thinking.
**When it helps you:** A new user feels less overwhelmed by the large platform because a tour guides them to the most important starting points.

---

*End of pages-1 plain-language guide — 104 features across 44 pages/routes*

---

# Pages & Features — slice pages-2 (plain-language)

Covers the same 44 pages as the technical catalog (items 45–88). Every feature is explained in everyday language — no background knowledge needed.

---

## /drug-checker
*(The page where you can look up information about any medicine)*

### Multi-database medication search
**What it is:** When you type in a medicine name, the tool searches three big official databases at the same time and brings back all the results at once — like asking three expert librarians the same question simultaneously.
**When it helps you:** Your mother-in-law heard a rumor that a painkiller she takes daily is dangerous. You type the name and get official information from all three sources in seconds.

### OpenFDA adverse-event display
**What it is:** Shows you real cases where people reported bad reactions to a medicine, pulled from the US Food and Drug Administration (FDA — the official American government body that monitors drug safety). Each case shows how serious it was and who was affected.
**When it helps you:** You want to know if that common Egyptian pharmacy pill has ever caused serious problems for anyone. This shows you the recorded cases.

### DailyMed label viewer
**What it is:** Shows you the official instruction leaflet for a medicine — the same document that comes in the medicine box — taken from a trusted US government database called DailyMed. You get a direct link to read the full leaflet.
**When it helps you:** A pharmacist or patient needs the real, approved instructions for a medicine — not a random website's summary.

### RxNorm clinical-name lookup
**What it is:** Medicines sold in Egypt often have different brand names (like "Adol" or "Panadol") for the same ingredient. This feature finds the single official scientific name behind all those brands, so you know you are looking at the same medicine no matter what it is called on the box.
**When it helps you:** You want to check if "Adol" and "Panadol" are really the same thing before searching for safety information about them.

### Egyptian pharmaceutical context panel
**What it is:** A short information panel explaining why checking medicines is especially important in Egypt — using real statistics from the World Health Organization (WHO) about things like overuse of antibiotics and misuse of certain painkillers in Egypt.
**When it helps you:** You wonder why this tool exists at all. This panel explains the real-life problem it is solving, so you understand why the habit of checking medicines matters.

### Quick-search preset buttons
**What it is:** Eight ready-made buttons for the most common medicines found in Egyptian homes — like Paracetamol, Ibuprofen, and Amoxicillin. Just click one and the search runs automatically.
**When it helps you:** You are new to the tool and do not know what to search for first. Clicking "Paracetamol" shows you what the results look like.

### Page AI chatbot (Drug Safety)
**What it is:** A built-in chat assistant you can talk to right on this page. It knows about Egyptian medicine habits, common myths about natural remedies (like black seed and honey), and which medicines are officially approved in Egypt.
**When it helps you:** After looking up a drug, you still have questions like "Is it safe to take this with black seed oil?" — you ask the chatbot and get an answer without leaving the page.

---

## /effect-dashboard
*(A research dashboard for people running the platform's scientific study — not for general public use)*

### Research effect-size forest plot
**What it is:** A special chart (called a forest plot) used by researchers to visualize how large an effect a teaching program is expected to have — based on previous published studies. Think of it like a target on a shooting range: it shows what score the program is aiming for. This area is only visible to administrators.
**When it helps you:** A researcher wants to check, before collecting any data, whether the study is designed to detect a meaningful change in participants' ability to spot fake news.

### Hypothesis matrix table
**What it is:** A table listing all the predictions the research team made before the study started — like a written promise of what they expect to find. It shows each prediction, the target score, and whether the results (once collected) confirm or deny it. "p-value" (a number researchers use to judge whether a result is likely real or just random chance) and "Cohen's d" (a number that measures how big the difference is between two groups — like before and after a training) are both shown here.
**When it helps you:** An academic reviewer can see that the team wrote down their predictions honestly before seeing any results — a sign of trustworthy science.

### Power analysis progress bar
**What it is:** A progress bar showing how close the study is to having enough participants. Scientists need a certain number of people in a study (in this case, 84 people) before the results are meaningful — like needing a big-enough sample of food to taste before judging a whole dish.
**When it helps you:** The person running the study can see at a glance whether they have recruited enough volunteers yet.

### Design-target honesty banner
**What it is:** A prominent orange warning notice reminding anyone reading the dashboard that the numbers shown are *goals* from published research — not actual collected results. It is there to prevent anyone from misreading a target as a real finding.
**When it helps you:** Stops a reader from accidentally thinking the study has already proven something, when in fact data collection may not have started yet.

### Live assessment data fetch
**What it is:** Once real data starts coming in from participants, this feature automatically switches the dashboard from showing "expected" numbers to showing the real measured results — like a weather station that updates from a forecast to the actual temperature.
**When it helps you:** Once real participants complete the program, the dashboard updates automatically without anyone having to do extra work.

---

## /engines-guide
*(A guide to all the AI tools on the platform)*

### AI engines accordion directory
**What it is:** A collapsible list (like an accordion that opens and closes) showing all 8 AI tools on the platform — what each one does, what it takes as input, what it gives back, and whether it is fully working or still being developed. OSINT (Open Source Intelligence — the practice of finding information from publicly available sources like social media and news archives) is one of those tools.
**When it helps you:** You are new and want to understand which tool to use for which type of problem — e.g., which one handles fake religious quotes versus which one handles edited photos.

### Engine search filter
**What it is:** A search box that lets you type a word and instantly filters the list of AI tools to only show the ones matching that word.
**When it helps you:** A developer searching for the tool that handles Arabic text can type "Arabic" and find it instantly.

### Operational-status badges
**What it is:** A small colored label on each tool card that honestly says whether that tool is fully working ("Operational"), partially working ("Partial"), or still in early development ("Prototype"). The badges also note that accuracy has not been independently verified by outside testers.
**When it helps you:** Someone investing in or writing about the platform can see exactly what is production-ready and what is still experimental — no false advertising.

### Model/provider metadata tiles
**What it is:** Small information boxes on each tool showing which AI company's technology powers it, how fast it roughly runs, and whether it has been validated.
**When it helps you:** A journalist writing an article about the platform can see exactly which AI providers are being used for each tool.

### "Open this engine" deep-link
**What it is:** A button at the bottom of each tool's description that takes you directly to that tool so you can use it immediately.
**When it helps you:** After reading about a tool, you do not have to search for it — one click takes you there.

---

## /epistemology
*(A page explaining how humans know if something is true — from three different traditions)*

### Three-tab epistemology comparison
**What it is:** Three side-by-side tabs comparing how truth is verified in three different traditions: the Scientific Method, Islamic hadith (prophetic sayings) and legal scholarship, and classical logic (the way of thinking developed by the ancient Greek philosopher Aristotle). Each tab shows the steps in that tradition's verification process. "Usul al-Fiqh" means the foundational principles of Islamic law.
**When it helps you:** A student learning critical thinking sees that scientists, Islamic scholars, and logicians all use structured step-by-step processes to separate truth from fiction — and the processes look surprisingly similar.

### Evidence pyramid visualiser
**What it is:** A visual diagram shaped like a pyramid, showing different types of evidence from weakest (at the bottom, like one person's story) to strongest (at the top, like a large review of many studies). "Meta-analysis" means a study that combines the results of many other studies to get a more reliable answer. "Cochrane review" means a particularly trusted type of mega-study.
**When it helps you:** A user who heard "my friend said this vaccine caused problems" learns visually why one person's experience is much weaker evidence than a study of millions of people.

### Islamic Sanad / Rijal methodology steps
**What it is:** A description of the 6 steps that traditional Islamic hadith scholars use to check whether a saying attributed to the Prophet is genuine. "Sanad" means the chain of narrators — like a chain of people who passed a message down through history. "Rijal" means checking each narrator's reliability. "Matn" means checking the content of the saying itself. "Nasikh & Mansukh" refers to rules about which religious texts override others.
**When it helps you:** A Muslim who sees a suspicious quote claiming to be from the Prophet can apply the same rigorous checking method that Islamic scholars have used for 1,400 years.

### Scientific guidelines panel
**What it is:** A list of up to 5 key scientific principles (like "correlation does not mean causation" — meaning just because two things happen together does not mean one caused the other) with links to the EAL tools that let you practice applying each principle.
**When it helps you:** A teacher can link each abstract rule of science to a live, practical exercise the students can try immediately.

### Applied-in-EAL cross-links
**What it is:** Clickable links on every section of this page that take you directly to the specific EAL tool that puts that principle into practice — for example, reading about hadith checking links you to the Hadith Check tool.
**When it helps you:** A learner does not just read the theory — they can jump straight into practicing it with a real tool.

---

## /evidence-search
*(A shortcut entry point to the evidence search engine)*

### Evidence Aggregator Panel (thin wrapper)
**What it is:** This page is simply a second doorway that leads to the same evidence search tool as the main evidence page. RTL (Right-to-Left) means the page layout is automatically arranged for Arabic readers, who read from right to left.
**When it helps you:** If a link or another page sends you here, you land on the same powerful evidence search without anything being broken.

---

## /evidence
*(Search millions of scientific papers to check if a claim has real research behind it)*

### 7-source academic search
**What it is:** When you type a health claim or topic, this tool searches seven major scientific databases at the same time and shows you real published research papers. It is like asking seven different university libraries the same question simultaneously. The sources include OpenAlex, Semantic Scholar, Europe PMC, DOAJ, Crossref, arXiv, and CORE — all trusted, publicly accessible scientific archives.
**When it helps you:** Someone tells you "garlic cures cancer." You search it here and find out immediately whether any serious research supports that claim — or whether no credible study exists.

### Trust-band scoring
**What it is:** Each search result gets a label — Band A (most trustworthy: peer-reviewed journal), Band B (medium trust), or Band C (lowest: early-stage or speculative paper). "Peer-reviewed" means other experts in the field checked the paper before it was published — like having your homework checked by multiple teachers before being graded. A "preprint" is a paper that has not yet been checked by other experts.
**When it helps you:** A non-expert can glance at the label and immediately understand whether a paper is solid or shaky — without needing a science degree.

### Source filter sidebar
**What it is:** A list of checkboxes, one for each database, so you can turn individual sources on or off. "Select All" and "Clear All" buttons make it easy.
**When it helps you:** A doctor searching for medical evidence wants to skip the physics database (arXiv) and focus only on medical sources like Europe PMC.

### Open-Access filter toggle
**What it is:** A single switch that hides all papers you would have to pay to read, showing only ones you can read for free.
**When it helps you:** A user in Egypt without access to expensive journal subscriptions can filter to only papers they can actually open and read.

### Sort controls (relevance / year)
**What it is:** A dropdown menu that lets you reorder your results — either by how closely they match your search, by newest first, or by oldest first.
**When it helps you:** A researcher who wants the most recent studies on a topic switches to "newest first."

### Search history (localStorage)
**What it is:** The tool remembers your last 5 searches on your own device and shows them as clickable buttons before you start a new search. "localStorage" just means the memory is stored in your browser — it stays private on your device.
**When it helps you:** You come back the next day to continue research and find your previous searches waiting for you — no need to retype them.

### Suggested quick searches
**What it is:** Five pre-written controversial topics (like mRNA vaccines and climate change) shown as ready-made buttons when the page first loads — so you can start exploring immediately.
**When it helps you:** You are new and want to see how the tool works. Click one of the example buttons and results appear instantly.

### Page AI chatbot (Evidence Pyramid)
**What it is:** A built-in chat assistant that understands scientific evidence. It knows the full pyramid from weakest to strongest evidence, understands the GRADE framework (a system scientists use to rate the quality of evidence), and has knowledge of Egyptian medical journals.
**When it helps you:** After seeing a result, you are confused by a technical term like "confidence interval" (a range of numbers showing how certain a result is). You ask the chatbot and it explains in plain language.

### Tool usage guide (ToolGuide component)
**What it is:** A step-by-step guide in both English and Arabic showing four real worked examples — including "does garlic cure cancer?" and "do vaccines cause autism?" — walking you through how to search and what the results mean.
**When it helps you:** A first-time user follows one of the worked examples to understand exactly how to use the tool and interpret what they find.

---

## /explore
*(Browse all the tools on the platform)*

### Full platform directory (categorised)
**What it is:** A complete, organized list of every tool on the EAL platform, grouped by category — like a map of the whole building. Each entry shows the tool name, a short description, and the method or framework it uses.
**When it helps you:** A new user arriving at the platform does not know where to start. They browse this directory and click on the tool that matches what they need right now.

### Method/instrument tag per tool
**What it is:** A small label on each tool showing the academic framework or validated method it is built on. For example, "FLICC taxonomy (Cook)" refers to a scientifically validated system for categorizing manipulation techniques, named after researcher John Cook. "SIFT methodology" is a four-step fact-checking method (Stop, Investigate the source, Find better coverage, Trace claims).
**When it helps you:** A teacher preparing a media-literacy class can check which tools are built on published, peer-reviewed methods — not just guesswork.

### "isNew" badge
**What it is:** A small "New" label that appears on recently added tools so returning users can spot them immediately.
**When it helps you:** You visit the platform again after a month and can immediately see which tools are new without reading through the entire directory.

---

## /fallacy-engine
*(Identify the trick being used in a misleading argument)*

### 5-category fallacy taxonomy display
**What it is:** A structured list of manipulation tricks organized into five groups: tricks in the logic itself (Formal), tricks in how an argument is framed (Informal), tricks using numbers and statistics (Statistical), tricks in how language is used (Rhetorical), and tricks that exploit religious feelings (Religious Exploitation). Each trick has an Egyptian-language example and an Arabic name.
**When it helps you:** A student watching a TV health show hears a confusing argument and can now look it up to see which specific type of trick is being used.

### AI fallacy analyser
**What it is:** You paste any text — a WhatsApp message, a Facebook post, a news headline — and the AI reads it, then tells you which category of manipulation trick it is using. It uses a validated system called the FLICC taxonomy (a research-backed framework for categorizing five main types of science denial and misinformation). The screen shows a progress animation while the analysis runs.
**When it helps you:** Your aunt sends a scary health claim on WhatsApp. You paste it here and immediately learn it is using a "fake expert" trick, not real evidence.

### Concept explainer (ConceptExplainer component)
**What it is:** Small pop-up information boxes that appear when you click on any technical term — so you can understand what a specific trick means without leaving the page or searching elsewhere.
**When it helps you:** You see the term "affirming the consequent" (a logic error where someone assumes that because A leads to B, B must mean A happened) and do not know what it means. One click shows a simple explanation right there.

---

## /family-kit
*(Practical tools for dealing with fake news in your family group chats)*

### 5-question quick-check card deck
**What it is:** Five simple yes-or-no questions you can mentally run through in under 30 seconds whenever you see a suspicious forwarded message: Does it have a source? Does it have a date and author? Have you searched for it? Does it make you feel very emotional? Would you bet money it is true?
**When it helps you:** Your uncle shares a scary WhatsApp health message. You run through the 5 questions in your head and realize it has no source and is making you panic — two warning signs.

### WhatsApp reply templates
**What it is:** Ready-written messages in both English and Egyptian Arabic for five common situations — when someone shares fake health information, a political rumor, a religious quote that may be fabricated, a scam, or general fake news. The messages are polite and non-confrontational, designed for family settings.
**When it helps you:** Your mother shared fake cancer-cure advice. You need a kind, respectful way to correct her without starting a fight. Pick the health misinformation template, copy it, and send it.

### Copy-to-clipboard template action
**What it is:** A "Copy" button next to each template message that instantly copies the full text, ready to paste directly into WhatsApp.
**When it helps you:** One tap and the message is in your clipboard — ready to paste without any typing.

---

## /features
*(An overview page showing everything the platform can do)*

### Full platform feature catalogue (7 categories)
**What it is:** A grid of all the EAL features organized into seven groups: Defense Arsenal (tools for spotting lies), Cognitive Training (exercises to sharpen your thinking), Islamic Intelligence (tools for checking religious claims), Science & Evidence (tools to find real research), AI-Powered Tools, Personal Dashboard, and Community. Each card links to the tool.
**When it helps you:** A potential partner, funder, or curious visitor wants a quick overview of everything the platform offers — this is the right page.

### Category filtering / navigation
**What it is:** Clickable tabs that let you jump between the seven feature categories so you only see what you are interested in.
**When it helps you:** A user who only cares about Islamic tools clicks the "Islamic Intelligence" tab and sees just those features, without scrolling through everything else.

### Feature metadata (title, Arabic, description, icon, href)
**What it is:** Every feature card on this page shows its name in both English and Arabic, a small picture icon, a description, and a direct link to the tool. "i18n" and "RTL" refer to the technology that makes the page work correctly for right-to-left Arabic readers.
**When it helps you:** An Arabic-speaking visitor reads every feature name in Arabic — nothing is hidden behind a language barrier.

---

## /fight-back
*(A library of counter-arguments to use when responding to misinformation)*

### Counter-narrative toolkit (searchable)
**What it is:** A searchable library of logical tricks, thinking biases (mental shortcuts that lead people to wrong conclusions), and religious manipulation patterns — each one explained in both English and Arabic, with a specific counter-argument for each one.
**When it helps you:** You have identified a fallacy in a conversation and now need to know how to respond. Search the library and find the right counter-argument.

### Three-tab category filter
**What it is:** Three tabs — Logical Fallacies, Cognitive Biases, and Religious Manipulation — each showing how many items are in that category. Click a tab to see only that group.
**When it helps you:** You are preparing to address specifically religious manipulation tactics in a conversation. Click the "Religious Manipulation" tab to see only those.

### Expandable entry cards
**What it is:** Each item in the library starts as a short summary card. Click it and it expands to show the full description and the full counter-argument.
**When it helps you:** You want to read the complete strategy before using it in a conversation — not just the headline.

### Page AI chatbot
**What it is:** A built-in chat assistant on this page that can help you write a personalized response using a counter-argument from the library.
**When it helps you:** You found the right counter-argument but do not know how to phrase it for your specific situation. Ask the AI and it helps you draft a reply.

---

## /forensic-c2pa
*(Learn how photos carry hidden digital certificates proving their origin)*

### C2PA technical explainer (4 layers)
**What it is:** An educational page explaining how a new international standard called C2PA (Content Credentials) works — it is like a digital passport for photos and videos. The page explains digital signatures (mathematical codes that prove a file has not been changed, like a wax seal on a letter), the container format that holds this information, and the chain of custody (a record of everywhere a file has been since it was created). It is bilingual.
**When it helps you:** A journalist or media teacher wants to understand how to check if a news photo is authentic before running or sharing it.

### Illustrative Egyptian case studies
**What it is:** Real-scenario examples showing how this digital certificate system could expose manipulated news photos that have actually circulated in Egypt.
**When it helps you:** A media-literacy educator uses these examples in a workshop to show students what a fake photo investigation looks like in practice.

### Page AI chatbot (C2PA)
**What it is:** A built-in assistant for questions about digital photo certificates.
**When it helps you:** You want to know whether a specific Egyptian news website's photos carry these digital certificates. Ask the AI.

---

## /forensic-image
*(Check whether a photo has been digitally manipulated)*

### Forensic technique library (educational)
**What it is:** Detailed explanations of three image-analysis techniques used by investigators: Error Level Analysis or ELA (a method that finds parts of a photo that were edited by checking how the editing changed the image's digital compression — like finding a patch on a wall by looking for slightly different paint texture), EXIF metadata extraction (reading the hidden data inside a photo file that records the camera model, date, and GPS location — like a photo's birth certificate), and Clone/Copy-Move detection (spotting areas of a photo that were copied from somewhere else and pasted). Each includes what the technique can and cannot do, and Egyptian examples.
**When it helps you:** An investigator wants to understand the limitations of these techniques before drawing conclusions from them.

### AI-vision image analysis
**What it is:** You upload a photo and an AI (powered by Google's Gemini Vision) examines it and describes any signs that it may have been manipulated or generated by a computer.
**When it helps you:** A viral protest photo is circulating. You upload it and the AI flags a suspicious area in the background as possibly generated or pasted in.

### Page AI chatbot (Forensics)
**What it is:** A built-in assistant for questions about photo and video forensics.
**When it helps you:** After seeing analysis results, you wonder how to detect fake videos (deepfakes — videos where someone's face has been replaced using AI). Ask the assistant.

---

## /global-alliance
*(Find organizations around the world that fight misinformation)*

### Global organisation directory (searchable)
**What it is:** A searchable directory of organizations worldwide that work on fact-checking, media literacy, AI ethics, religious education, mental health, OSINT (using public internet sources to investigate — like checking social media or news archives), academic research, and digital rights. Each entry shows the organization's region, category, and a link.
**When it helps you:** An EAL user in the Middle East wants to find an Arabic-language fact-checking partner to cross-reference a claim. They search here.

### Category filter (8 types)
**What it is:** Eight color-coded filter buttons — one for each type of organization — so you can narrow the list instantly.
**When it helps you:** An AI ethics researcher wants to find only AI Ethics organizations. One click filters the list.

### Region filter (6 regions)
**What it is:** Filter buttons for six world regions — Middle East, Europe, Americas, Asia, Africa, and Global — so you can find organizations near you or focused on your region.
**When it helps you:** Someone looking specifically for organizations serving the Arab world clicks "Middle East."

### Organisation search
**What it is:** A text search box that filters the directory by typing any part of an organization's name or description.
**When it helps you:** You know you are looking for AFP (the French news agency's fact-checking arm) and type "AFP" to find it instantly.

---

## /god-system
*(The most powerful tool: run a single claim through all 8 deception detectors at once)*

### 8-layer deception analysis
**What it is:** You paste any claim — a WhatsApp message, a news headline, a social media post — and this tool sends it through 8 different analysis "lenses" at the same time: Is it a complete lie? Does it leave out important facts? Is a real fact being used out of context? Was it released at a deliberately suspicious moment? Does it cherry-pick only some data? Is it wrapped in a misleading story? Does it fake authority? Is it a mix of the above? All 8 verdicts come back in one result.
**When it helps you:** You receive a scary or "too good to be true" claim on WhatsApp or Facebook and want a complete check without having to run it through multiple separate tools.

### ToolGuide with Egyptian-dialect context
**What it is:** A bilingual guide written specifically for Egyptian users, explaining that this tool is designed for the kind of frightening or miraculous claims that spread on WhatsApp, Facebook, and Egyptian TV.
**When it helps you:** A first-time user from Egypt understands exactly what kind of content this tool is built for, before they submit anything.

### AnalysisProgress staging
**What it is:** An animated progress indicator that shows you which step of the analysis is currently running while you wait for the full result.
**When it helps you:** The analysis takes a few seconds. The animation keeps you informed so you do not think the tool has frozen.

### Page AI chatbot (God System)
**What it is:** A built-in assistant that knows the full 8-layer deception system and can answer your questions about any part of the verdict you received.
**When it helps you:** The result says a claim uses "Layer 6: Narrative Matrix." You do not know what that means. Ask the assistant.

---

## /guide
*(A full tour of the platform for first-time visitors)*

### Comprehensive platform navigation guide
**What it is:** A scroll-through page that walks you through every section of the EAL platform from start to finish — explaining the crisis of misinformation in Egypt, which tools exist, how the evidence tools work, how the religious tools work, the health tools, the community tools, and the personal dashboard.
**When it helps you:** You arrived at the platform without any context and feel overwhelmed. Reading this guide from top to bottom tells you exactly where to start and what each section is for.

### Scroll-triggered section animations
**What it is:** Each section of the guide fades smoothly into view as you scroll down — instead of showing everything at once and overwhelming you.
**When it helps you:** The guide stays visually calm and easy to follow, one section at a time, rather than looking like a wall of text.

---

## /health-data
*(Look up real health statistics from the World Health Organization)*

### WHO indicator search
**What it is:** A search tool that lets you look up any health measurement tracked by the WHO (World Health Organization — the United Nations body responsible for global public health). For example, you can search "life expectancy" or "child mortality" and find the official WHO tracking data for that measure.
**When it helps you:** Someone is claiming a specific health statistic about Egypt. You search it here to find the real official WHO number and compare.

### Indicator time-series drill-down
**What it is:** Once you find a health indicator, you can click on it to see how that number has changed over time in different countries — like a graph showing Egypt's child death rate across the past 20 years.
**When it helps you:** A journalist tracking Egypt's child health trends over time pulls the raw official WHO data directly, instead of relying on someone else's summary.

---

## /impact
*(A page showing key numbers about the platform's scale)*

### Animated metrics dashboard
**What it is:** A dashboard with numbers that count up smoothly when you scroll to them — showing how large the platform has grown: how many API routes (programming connections to outside services), how many exercise files, how many pages, and other technical measures.
**When it helps you:** A competition judge, investor, or partner lands on this page and immediately sees headline numbers about the platform's scale.

### Metric detail cards
**What it is:** Each number has a card beneath it explaining what it represents and which technology powers it — for example, which AI model is behind the highest-power route.
**When it helps you:** The big numbers make more sense when you can read a plain-language explanation of what each one actually means.

---

## /inoculation-passport
*(Track your personal immunity against 12 types of manipulation)*

### 12-technique immunity tracker
**What it is:** A visual "passport" showing 12 specific manipulation techniques — such as Fear-Mongering (making you panic), Fake Authority (pretending someone is an expert when they are not), Deepfake Detection (spotting AI-generated fake videos), and Cherry-Picking (using only the facts that support one side). For each technique, there is a slot showing whether you have completed the exercises to build resistance to it. Think of it like a vaccination card — but for your mind.
**When it helps you:** You want to know which manipulation types you have practiced defending against and which ones you still need to work on.

### Exercise completion progress per technique
**What it is:** For each of the 12 techniques, a progress bar shows what percentage of the required practice exercises you have completed, based on your exercise history saved on your device.
**When it helps you:** You complete Day 3 of the program and come back to see that your "Conspiracy Logic" immunity bar has moved forward.

### Immunity decay simulation
**What it is:** If you stop practicing a technique for a while, its immunity bar slowly drops — simulating how real skills fade without use, just like a language you have not spoken in months. Each technique has its own "decay rate" (how quickly the immunity fades without practice).
**When it helps you:** You come back after three weeks away and see that some of your immunity bars have dropped. This motivates you to return to those exercises.

### Page AI chatbot (Inoculation Passport)
**What it is:** A built-in assistant for questions about the passport system.
**When it helps you:** You do not understand what "deepfake detection immunity" means or how to improve it. Ask the assistant and it explains clearly.

---

## /instruments/mist
*(A redirect that fixes a broken link)*

### MIST-20 redirect
**What it is:** If any link or button on the platform ever accidentally points to this address instead of the correct one, this page silently sends you to the right place — the MIST-20 assessment (a validated 20-question test that measures how good you are at telling real news from fake news, developed by academic researchers). No broken page, no error — you just arrive where you should be.
**When it helps you:** You click an old link from a tutorial or a demo page and instead of seeing an error, you are quietly redirected to the real assessment.

---

## /kill-list
*(A registry of claims that have already been checked and proven false)*

### Active threats registry
**What it is:** A live database of specific false claims that have been verified, debunked, and documented. Each entry shows the original false claim, the correct facts, the source of the correction, the date it was documented, the category (health, politics, religion, etc.), and how dangerous it is (Low / Medium / High / Critical threat level).
**When it helps you:** You have seen a specific viral claim circulating. You check here to see if it has already been investigated and debunked — saving you from having to research it yourself.

### Search over debunked claims
**What it is:** A search box that filters the registry as you type, so you can find a specific debunked claim quickly.
**When it helps you:** You search "antibiotics children" and immediately find the relevant debunked claim about giving antibiotics to children for viral infections.

### Expandable claim detail cards
**What it is:** Each claim in the registry starts as a summary card. Click it to expand and read the full fact-correction and the source that proves it is false.
**When it helps you:** Before forwarding a correction to your family group, you read the full sourced explanation so you can explain it properly.

### Bilingual toggle (EN / AR)
**What it is:** A single button that switches all claim text between English and Egyptian Arabic.
**When it helps you:** Arabic-first readers can read both the original false claim and its correction in Arabic, making it easier to use when responding to Arabic-language messages.

---

## /knowledge-graph
*(A visual map of how all the platform's knowledge is connected)*

### D3 force-directed knowledge graph
**What it is:** An interactive moving diagram — like a star map — showing how all the information on the platform is organized and connected. The dots represent topics or tools, and the lines between them show relationships. The diagram is powered by a physics simulation (called a force-directed graph — where nodes push and pull each other like magnets) so you can drag and rearrange it. The three main clusters are the DeepReal engine (for detecting fake media), the Mental Health engine, and the Religion Hub.
**When it helps you:** A researcher or educator wants to visually explore how the platform's knowledge base is structured — which topics cluster together and why.

### Node filter by type/group
**What it is:** Filter controls that let you hide all nodes except the type you are interested in — for example, show only religion-hub topics.
**When it helps you:** You want to study the religious knowledge cluster in isolation without the full map cluttering your view.

### Node detail panel
**What it is:** Click any dot on the graph and a side panel opens showing the full details of that knowledge entry — the evidence behind it and the debunking method used for claims related to it.
**When it helps you:** You spot an interesting topic node and want to read the full background evidence behind it.

### Graph text search
**What it is:** A search box that highlights matching dots on the graph as you type.
**When it helps you:** You type "vaccine" and all vaccine-related nodes glow so you can find them on the map instantly.

---

## /language-select
*(Choose your language before entering the main chat)*

### Language/direction selection screen
**What it is:** A full-screen page showing three large buttons: Standard Arabic, Egyptian Arabic dialect, and English. Whichever you choose is saved on your device. If you pick Arabic, the whole platform automatically switches to RTL layout (RTL means Right-to-Left — the direction Arabic text flows, so the layout mirrors to match).
**When it helps you:** A new user arriving at the platform sets their language preference once, and the whole experience is customized for them from that point on.

### RTL toggle integration
**What it is:** When you select Arabic, a single function flips the entire platform interface from left-to-right to right-to-left automatically — every page, every menu, every text box.
**When it helps you:** An Arabic-speaking user gets a fully correct Arabic reading experience — text, buttons, and menus all flow in the right direction — without manually configuring anything.

### Post-selection redirect to chatbot
**What it is:** After you confirm your language, the platform waits half a second (for a smooth transition animation) and then takes you directly to the main AI chatbot.
**When it helps you:** The onboarding flow feels seamless — you pick your language and land in the right place without extra clicks.

---

## /layers/[id]/fight
*(Specific counter-tools for each of the 8 types of deception)*

### Per-layer counter-weapons arsenal
**What it is:** A dynamic page that changes depending on which deception layer you are fighting (layers 1 through 8). For each layer, it lists 4 to 5 specific tools or techniques — called "counter-weapons" — with bilingual descriptions (English and Arabic). For example, Layer 3 is "Decontextualisation" (taking something real and placing it in a misleading context). OSINT (Open Source Intelligence — using publicly available sources to investigate) tools appear here as counter-weapons for context-based deception.
**When it helps you:** You have identified that a claim is using the "decontextualisation" trick and want to know exactly which tools will help you restore the missing context.

### Star-rated weapon effectiveness
**What it is:** Each counter-weapon has a 1 to 5 star rating showing how effective it is at defeating that specific deception type.
**When it helps you:** When you are short on time, you choose the 5-star weapon for the fastest and most reliable counter-move.

### Bilingual weapon descriptions
**What it is:** Every counter-weapon has its full description in both English and Arabic.
**When it helps you:** An Arabic-speaking investigator reads the tool description in Arabic before deciding which approach to use.

---

## /live-deception
*(A simulated social media feed to practice spotting real manipulation in the wild)*

### Annotated social media feed simulator
**What it is:** A fake social media scroll feed that looks like real Egyptian-dialect posts — but each post is secretly tagged with which type of deception it uses (layers 1 through 5, color-coded). You can turn on an "X-Ray mode" that reveals the hidden labels, showing the manipulation technique, the threat level, and notes explaining what to look out for.
**When it helps you:** A media-literacy class looks at a realistic-looking Arabic health scare post and learns in real time how it is tagged as "Layer 1: Absolute Fabrication" — seeing what trained critical thinking detects.

### X-Ray toggle
**What it is:** A single on/off switch that flips between a normal-looking social media view and a forensic view that reveals all the hidden manipulation labels on every post.
**When it helps you:** Demonstrates the difference between what an untrained reader sees (a normal post) and what a trained reader sees (a labeled manipulation attempt).

### Real kill-list integration
**What it is:** Some posts in the feed are populated with claims from the real debunked-claims database — so the simulation uses documented real Egyptian misinformation, not invented examples.
**When it helps you:** Students practice on actual misinformation that has really circulated in Egypt, not hypothetical scenarios.

### Page AI chatbot (Live Deception)
**What it is:** A built-in assistant you can ask about the manipulation patterns shown in the feed.
**When it helps you:** After seeing a post tagged "Layer 3: Decontextualisation," you ask the AI to explain that layer in simple terms.

---

## /manipulation-cards
*(A deck of cards for learning every manipulation technique)*

### FLICC-taxonomy card deck
**What it is:** A full set of cards — one for each manipulation technique — organized by the FLICC system (a research-backed framework with five categories: Fake Experts, Logical Fallacies, Impossible Expectations, Cherry-Picking, and Conspiracy theories). Each card shows the technique name in English and Arabic, explains the psychological mechanism (why it works on people's minds), gives a real Egyptian example without naming specific people, and shows how to counter it.
**When it helps you:** A trainer uses the cards as a teaching deck in a media-literacy workshop, going through one card at a time with a group.

### Card filter by FLICC category
**What it is:** A filter that lets you see only the cards from one FLICC category at a time, so you can focus your study.
**When it helps you:** A student practicing specifically how to recognize "Fake Expert" claims filters the deck to see only those cards.

### Per-card source citation
**What it is:** Each card shows a real, verifiable reference (a published study or official source) behind the information on it — so you can check where the claim comes from.
**When it helps you:** An educator fact-checks the card content before using it in a class — confirming every claim is supported by a real source.

### Page AI chatbot (Manipulation Cards)
**What it is:** A built-in assistant for questions about manipulation techniques.
**When it helps you:** After reading a card, you want more Egyptian-specific examples of that technique. Ask the assistant.

---

## /master-roadmap
*(A detailed development timeline for the platform — for project managers and developers)*

### 136-node forensic roadmap timeline
**What it is:** A visual timeline showing every step in the platform's development process — 136 steps total, organized into categories — displayed as a vertical center-line with items branching left and right. You can collapse categories you are not interested in.
**When it helps you:** A project manager or developer follows the structured sequence from initial setup to full deployment, making sure nothing is missed.

### Copy-node action
**What it is:** A clipboard icon next to each roadmap item that copies its text with one click.
**When it helps you:** A developer copies a roadmap step and pastes it into a project management tool like Trello or Jira.

### Collapsible category sections
**What it is:** Each category of roadmap steps can be opened or closed like a folder. The first category is open by default, and the rest are closed.
**When it helps you:** A user working on one phase hides all the other phases so they can focus only on the current section without being overwhelmed by 136 items at once.

---

## /media-library
*(Find out which movies and TV shows about Egypt tell the truth)*

### Egypt-focused media accuracy fact-checker
**What it is:** A library of movies, TV shows, and documentaries that feature Egypt, each given an accuracy rating — High (mostly true), Mixed (some true, some false), or Low (mostly false). Specific claims made in each film are listed and individually marked as true or false with a historical explanation.
**When it helps you:** A teacher preparing a history class around the film "The Mummy" checks which claims about ancient Egypt are accurate before showing it to students.

### Per-claim truth analysis cards
**What it is:** Each media item can be expanded to show individual claims it makes — each one given a true/false verdict with a detailed historical explanation of why.
**When it helps you:** A student researching ancient Egyptian high priest Imhotep finds that the "cursed high priest" portrayal from Hollywood is historically false, and reads the real historical facts about who Imhotep actually was.

### Media type filter (movie / show / documentary)
**What it is:** A filter button for each type of media — movie, TV show, or documentary — so you can narrow the library to just the format you care about.
**When it helps you:** A researcher focused specifically on documentaries filters the library to see only documentary accuracy ratings.

---

## /medical-life
*(Search across four major medical sources at once)*

### 4-source parallel medical search
**What it is:** When you enter any health question, this tool queries four authoritative medical databases at the same time — OpenFDA (the US drug safety database), DailyMed (official drug labels), RxNorm (the standard medicine name registry), and WHO (the World Health Organization) — and collects all results at once. "Promise.allSettled" is a technical method that means: keep all results, even if one database fails to respond.
**When it helps you:** You have a general health question and want to see what four different authoritative sources say at the same time, rather than visiting each website separately.

### Source-labelled result cards
**What it is:** Each result card is clearly labeled with which database it came from and how serious the finding is (High severity or just Informational). This lets you understand the nature of each result before reading it.
**When it helps you:** You can quickly see the difference between a WHO population-level health statistic and an FDA individual drug-reaction report — they are different things that need to be read differently.

---

## /mens-shield
*(A private mental health check specifically designed for Egyptian men)*

### Male stress calculator (5 dimensions)
**What it is:** Five sliding scales — for Work Stress, Isolation, Emotional Strain, Sleep Quality, and Physical Fatigue — that you adjust to reflect your current state. The tool then calculates a single overall stress score from 0 to 100%. The tool is designed for Egyptian men, who often face cultural pressure to not discuss mental health.
**When it helps you:** An Egyptian man who would never say "I am struggling" out loud can get a private, number-based stress reading instead — removing the emotional barrier of having to describe feelings in words.

### Page AI chatbot (Men's Mental Health)
**What it is:** A built-in assistant that understands Egyptian male cultural norms around mental health — including the barriers that stop men from seeking help — and knows about Egyptian crisis resources.
**When it helps you:** After seeing his stress score, a user asks the assistant for coping strategies that fit his life without feeling judged.

---

## /mental-health/depression
*(Evidence-based information and tools for people experiencing depression)*

### PHQ-9 self-assessment
**What it is:** A 9-question clinical screening tool — the PHQ-9 (Patient Health Questionnaire) — used by doctors worldwide to measure depression severity. You answer each question on a scale of 0 to 3 (not at all to nearly every day) and the tool calculates a total score. Scores are grouped into bands: minimal, mild, moderate, moderately severe, and severe. If your score is 15 or above, you are shown links to professional help. PHQ-9 is a validated, peer-reviewed clinical instrument — not just a quiz.
**When it helps you:** You suspect you might have depression but are not sure. Taking this recognized clinical screening tool helps you understand how your symptoms compare to clinical thresholds, before you decide whether to see a doctor.

### 14-day CBT program
**What it is:** A day-by-day, 14-day self-help program based on CBT (Cognitive Behavioral Therapy — a well-researched form of therapy that helps people change unhelpful thinking patterns and behaviors). Each day covers a different topic: sleep, negative thoughts, physical activity and its effect on mood (serotonin is a brain chemical linked to feelings of wellbeing), building social connections, mindfulness (paying calm attention to the present moment), gratitude journaling, nutrition, setting healthy personal limits (boundaries), and planning for long-term mental health (WRAP — Wellness Recovery Action Plan). Every exercise has a cited source.
**When it helps you:** Someone with mild-to-moderate depression follows a structured, evidence-backed self-help protocol at home, one day at a time.

### Myth-busting panel (10 myths)
**What it is:** A panel addressing 10 widely believed myths about depression in Egypt — such as "depression is just laziness" or "strong faith prevents it" — paired with scientific rebuttals, references to official medical classifications (ICD and DSM are the two major international systems doctors use to classify mental health conditions), and the specific logical fallacy used by each myth.
**When it helps you:** A user whose family dismisses their depression can use the cited, sourced rebuttals in a conversation with their family — showing that their condition is medically recognized, not a character flaw.

### Scientific shield provenance
**What it is:** A visible list of the real published sources behind every clinical claim on this page — including WHO guidelines, the PHQ-9 instrument itself, a major meta-analysis (a large study that combines many smaller studies) on therapy, and UK clinical guidelines (NICE NG222). The ScientificShield component displays these citations clearly.
**When it helps you:** A clinician or careful reader can verify that every medical claim on this page is grounded in an actual published guideline or study.

### Page AI chatbot (Depression Support)
**What it is:** A built-in chat assistant specifically for people experiencing depression. It follows safe-messaging guidelines (protocols for how to talk about mental health without causing harm) and always provides the Egyptian mental health crisis line number (08008880700) when the conversation suggests someone may be in danger.
**When it helps you:** A user in distress gets supportive, careful guidance — and if the conversation signals a crisis, the assistant immediately provides the crisis line number.

---

## /mental-health/exercise/[day]
*(The engine that delivers each day's mental health exercise)*

### 14-day mental health exercise engine
**What it is:** A system that loads the correct exercise for whichever day of the program you are on (days 1 through 14), delivers it through an interactive exercise player, and saves your progress when you finish. COM-B is a research framework that describes how Capability, Opportunity, and Motivation together explain behavior change — the exercises are designed using this model.
**When it helps you:** You are on Day 5 of the mental health program. This engine automatically loads the sleep-hygiene exercise for that day, walks you through it, and records your completion.

### Progress recording + research sync
**What it is:** When you finish an exercise, two things happen simultaneously: your personal progress is saved so you can track your journey, and your anonymized data is also contributed to the platform's research study (which is measuring how much the program improves people's ability to spot misinformation and manage their mental health).
**When it helps you:** As a user, you benefit from tracking your own progress. At the same time, you contribute to a real scientific study without any extra effort on your part.

---

## /mental-health
*(The main mental health hub — overview, quick check, and crisis resources)*

### 14-day programme timeline overview
**What it is:** A scrollable preview of all 14 days of the mental health program, each with its title in English and Arabic, a short description, and an icon showing what type of exercise it is.
**When it helps you:** You want to see the whole program before committing to it — or you want to jump back to a specific day you remember.

### 5-item mini PHQ-9 screening
**What it is:** A shortened 5-question version of the depression screening tool that gives you a quick mental health snapshot in under a minute. The result is color-coded (Minimal / Mild / Moderate / Severe) so you can see at a glance where you stand.
**When it helps you:** You want a quick check before deciding whether to start the full 14-day program.

### Crisis resource display
**What it is:** A clearly visible section showing three Egyptian mental health emergency contacts with phone numbers and descriptions: the Egyptian Mental Health Hotline (08008880700), Behman Hospital Helpline, and Befrienders Egypt.
**When it helps you:** A user in crisis sees actionable phone numbers immediately — they do not have to search for them.

### Page AI chatbot (Mental Health)
**What it is:** A built-in assistant informed by the WHO mhGAP (the World Health Organization's mental health action programme — a set of evidence-based guidelines for mental health care).
**When it helps you:** You are unsure whether what you are experiencing is serious enough to see a doctor. You ask the assistant and it helps you think through it.

---

## /misinfo-atlas
*(A 3D map of the history of misinformation — for presentations and deep learning)*

### 3D sphere/echo/pyramid misinformation atlas
**What it is:** An interactive three-dimensional visual built with a 3D graphics engine (React-Three-Fiber is a library for rendering 3D scenes in a browser). You can spin and explore a globe, an echo-chamber model (showing how misinformation spreads inside closed communities), and a pyramid — each representing the 8-layer deception taxonomy as glowing nodes in 3D space. Bloom post-processing means the glowing nodes have a soft halo effect for visual clarity.
**When it helps you:** A teacher or competition presenter wants to show the deception taxonomy in a visually striking, memorable way during a presentation.

### 8-layer deception taxonomy reference panel
**What it is:** A sidebar listing all 8 deception layers — from Layer 1 (complete fabrication) to Layer 8 (unknown or hybrid deception) — with a brief summary of each layer's nature and the defense strategy against it, in both English and Arabic.
**When it helps you:** A user identifies which layer a specific claim belongs to and reads the corresponding defense strategy immediately.

### Historical era nodes
**What it is:** Clickable dots on the 3D surface representing documented cases of misinformation from different periods in history. Clicking a dot opens a detail card about that historical case.
**When it helps you:** A researcher traces how the same manipulation trick — say, fabricating authority — has been used repeatedly across different historical periods.

### Real kill-list integration
**What it is:** The atlas can optionally overlay live, documented Egyptian misinformation campaigns from the debunked-claims database directly onto the 3D visualization.
**When it helps you:** The historical atlas is grounded in current Egyptian examples, not just ancient history — making the patterns feel relevant and immediate.

### Page AI chatbot (Misinfo Atlas)
**What it is:** A built-in assistant for questions about the 8-layer taxonomy.
**When it helps you:** You wonder which of the 8 layers a specific Egyptian conspiracy theory falls under. Ask the assistant.

---

## /nvidia-hub
*(Information about the AI models powering the platform)*

### NVIDIA AI model directory
**What it is:** A page honestly describing which NVIDIA AI models are used in the platform — including Nemotron-Ultra 550B (an extremely large and powerful language model, described as the last-resort option when other AI providers are unavailable) — and exactly what role each model plays. The descriptions are intentionally honest: they say when a model is used as a fallback, not as the primary engine.
**When it helps you:** A technical partner or journalist wants to understand exactly how the platform uses NVIDIA technology — and the page does not exaggerate.

### Page AI chatbot (NVIDIA Hub)
**What it is:** A built-in assistant for questions about NVIDIA's role in the platform.
**When it helps you:** You want to know what Nemotron-Ultra 550B actually is and why it is listed last in the AI rotation. Ask the assistant.

---

## /onboarding
*(A guided first-time introduction to the platform)*

### Step-by-step platform tour (multi-step wizard)
**What it is:** A 4-step guided tour for new users, with animations at each step, covering: the scale of misinformation in Egypt, the three main verification engines, how the evidence tools work, and how to get started on your first session.
**When it helps you:** A brand-new user who arrives at the platform with no context is walked gently through what it is and how to use it — before they encounter any of the actual tools.

### Parallax hero section
**What it is:** A visually engaging introduction screen at the start of the tour where background layers move at different speeds as you scroll, creating a sense of depth — making the first impression more memorable.
**When it helps you:** Creates a strong, welcoming first impression for new users, encouraging them to continue through the onboarding steps.

---

## /open-source
*(Technical documentation for developers who want to understand or contribute to the platform)*

### 4-tab technical architecture portal
**What it is:** A documentation page with four tabs: an overview of the platform's five-engine architecture, an explanation of the 14-key AI rotator system, a mathematical explanation of Error Level Analysis (ELA) for forensic image checking, and a description of how the search system queries multiple databases simultaneously. This page is for developers and researchers, not general users.
**When it helps you:** A developer who wants to contribute to the platform reads this to understand how the different technical systems are connected before writing any code.

### Multi-provider AI rotator documentation
**What it is:** An explanation of how the platform avoids going offline when any single AI provider is unavailable. It uses 14 API keys (access tokens — like passwords that let the platform use an AI service) spread across 6 different AI companies (Gemini, Groq, OpenRouter, Cerebras, Together, SambaNova). If one fails, the system automatically tries the next one — like having 14 spare tires.
**When it helps you:** An open-source contributor who wants to add a new AI provider to the system reads this to understand the routing logic.

### ELA forensic mathematics
**What it is:** A mathematical explanation of exactly how the Error Level Analysis algorithm works — the technique used to detect edited regions in photos by comparing how digital compression affected different parts of the image.
**When it helps you:** A researcher verifying the scientific validity of the platform's image forensics tool reads this to check the math.

---

## /osint-investigator
*(Investigate photos directly in your browser — no upload to any server)*

### In-browser EXIF metadata extraction
**What it is:** EXIF data is hidden information stored inside every photo file — like the photo's birth certificate. It records the camera model, the date and time the photo was taken, the GPS location, and the software used to edit it. This tool reads all of that information directly in your browser (using a library called exifr) without sending the image to any server.
**When it helps you:** An investigator has a photo claimed to be from a recent protest. They upload it and check the EXIF timestamp — it says the photo was taken two years ago, proving the claim is false.

### In-browser Error Level Analysis (ELA)
**What it is:** ELA is a technique that checks whether parts of a photo have been digitally edited. It works by re-compressing the image at a known quality level and comparing the result to the original — edited areas look different from unedited ones, like a patch on a wall that is slightly different from the paint around it. This runs entirely inside your browser without sending anything to a server.
**When it helps you:** You have a viral photo and want to check if it has been manipulated. The ELA heatmap highlights any suspicious regions without your image ever leaving your device.

### Dual-tab interface (EXIF / ELA)
**What it is:** Two tabs on the same page — one for EXIF data, one for ELA analysis — so you can run both checks on the same photo without re-uploading it.
**When it helps you:** An investigator checks both the hidden metadata and the visual manipulation indicators for the same image in one session.

### Page AI chatbot (OSINT Investigator)
**What it is:** A built-in assistant with expertise in open-source investigation methods.
**When it helps you:** You see a high ELA score on a specific part of the image but do not know whether it is significant. Ask the assistant what it means.

---

## /others-search
*(Search fact-checkers, encyclopedias, scientific archives, and more — all at once)*

### Federated multi-source search
**What it is:** When you search a topic or claim, this tool queries up to 7 sources simultaneously: the EAL's own evidence database, Google's FactCheck API (a database of professionally fact-checked claims), OpenAlex (a giant open academic database), NCBI/PubMed (the US National Library of Medicine's research database), ClaimBuster (an AI tool for identifying checkworthy claims), Wikipedia, and the Internet Archive (a digital library of web history). Results from all sources are shown together.
**When it helps you:** You want a comprehensive picture of what is known about a claim — from academic papers to fact-checkers to encyclopedias — in a single search.

### Source selection UI
**What it is:** A list of checkboxes — one per source — so you can choose exactly which databases to include in your search. "Select All" and "Clear All" make it easy to switch quickly.
**When it helps you:** You want only peer-reviewed academic evidence, so you uncheck Wikipedia and FactCheck and search only through OpenAlex and PubMed.

### Bilingual interface toggle
**What it is:** A button that switches all the labels, buttons, and prompts on this page between English and Arabic.
**When it helps you:** An Arabic speaker uses the tool entirely in Arabic — every element of the interface is in their language.

### Page AI chatbot (Federated Search)
**What it is:** A built-in assistant that helps you make sense of results from many different sources that might seem to contradict each other.
**When it helps you:** PubMed says one thing and a fact-checker says something different. You ask the AI which source to trust more and why.

---

## / (root landing page)
*(The first page every visitor sees)*

### Platform hero section
**What it is:** The big, attention-grabbing introduction at the very top of the homepage — with the platform's tagline in both English and Arabic, and three large buttons taking you to the three main engines: DeepReal (for detecting fake media and misinformation), Mental Health Shield, and Religion Hub (for checking religious claims). The background has a parallax effect (layers moving at different speeds as you scroll, creating depth).
**When it helps you:** Anyone arriving at the platform for the first time immediately understands what the three main tools are and can click into the one they need.

### 3-engine MVP cards with live counts
**What it is:** Three cards — one for each main engine — showing live numbers: how many exercises, scenarios, and knowledge entries each engine currently has, pulled from the platform's own data files. "MVP" means the three core, fully developed tools.
**When it helps you:** A user picks the engine that matches their current need — health and media issues (DeepReal), mental wellbeing, or religious claims — based on what they can see on the card.

### Evidence features showcase
**What it is:** A section highlighting the platform's scientific tools: the 7-database academic search, the drug checker, and the WHO health-data tool — making it clear that the platform is grounded in real scientific sources.
**When it helps you:** A skeptical visitor who wonders "is this just opinion?" sees the evidence tools and understands the platform is built on verifiable data.

### Verified-voices quote panel
**What it is:** Three carefully chosen quotes — from physicist Richard Feynman, the WHO on mental health, and the Quran (Surah Al-Hujurat 49:6, which instructs Muslims to verify information before acting on it) — taken from a verified-quotes database to ensure they are genuine and correctly sourced.
**When it helps you:** The platform's intellectual, scientific, and spiritual foundations are made clear from the very first page — signaling that it respects both science and faith.

### Methodology section
**What it is:** A short section explaining the three core ideas behind the platform: the One-Law (no claim reaches the user without a real, verifiable source), inoculation theory (the idea that exposing people to weakened forms of manipulation techniques makes them resistant to real ones — like a vaccine for the mind), and evidence-based methodology.
**When it helps you:** An educator or journalist evaluating the platform reads this and understands the intellectual framework it is built on.

### Baseline CTA / final CTA
**What it is:** Two call-to-action (CTA) sections — invitations to do something next. The first directs you to take the baseline assessment (a test measuring your current ability to spot misinformation). The second links to the main platform guide. Both are designed to convert a curious browser into an active user.
**When it helps you:** After reading the homepage, you know exactly what to do next: take the baseline test to see where you stand, then start using the platform.

---

## /paper-auditor
*(Check whether a scientific paper cited in a health or news claim is real and trustworthy)*

### DOI-based paper metadata lookup
**What it is:** A DOI (Digital Object Identifier) is a unique code assigned to every published academic paper — like a serial number for research. You paste the DOI here and the tool looks it up in Crossref (the official international registry of academic papers) to retrieve the paper's title, authors, journal, year, number of times it has been cited, and whether it is free to read.
**When it helps you:** A health claim you saw online says "according to a study..." and gives a DOI. You paste it here and discover the study is real — or find it does not exist.

### PRISMA / CONSORT checklist
**What it is:** Two internationally recognized checklists that researchers are supposed to follow when reporting their findings. PRISMA (Preferred Reporting Items for Systematic Reviews and Meta-Analyses) is the standard for review papers that combine many studies. CONSORT (Consolidated Standards of Reporting Trials) is the standard for randomized controlled trials (studies where participants are randomly assigned to groups). You work through the checklist to evaluate whether a paper followed proper reporting standards.
**When it helps you:** A researcher auditing a systematic review uses this checklist to verify it follows the PRISMA standard — like checking a building against safety code.

### Statistical power calculator
**What it is:** Sliders that let you enter a study's sample size (how many participants) and effect size (how big a difference the study is looking for), and the tool calculates whether the study had enough participants to reliably detect that effect. A study with too few participants is like trying to taste soup with a toothpick — you cannot get a reliable reading.
**When it helps you:** A reviewer checks: a study with 40 participants looking for a medium-sized effect — does it have enough people to be trustworthy? This tool gives the answer.

### ToolGuide with ready-example DOIs
**What it is:** A usage guide with real DOI codes pre-loaded as clickable examples, so you can see the tool in action with a real paper without having to find your own DOI.
**When it helps you:** A new user clicks one of the example DOIs and immediately sees a real audit result — understanding how the tool works before using their own paper.

### Page AI chatbot (Paper Auditor)
**What it is:** A built-in assistant for questions about evaluating scientific papers.
**When it helps you:** You see "CONSORT flow diagram" on the checklist and have no idea what that is. Ask the assistant and it explains in plain language.

---

## /passport
*(Your personal cognitive identity and verification score)*

### Cognitive Passport auto-bootstrap
**What it is:** When you visit this page, the system checks whether you already have a personal profile (called a "Cognitive Passport"). If you do not, it automatically creates one for you — anonymously, without requiring an account — and gives you a recovery key (a secret code to get your profile back if you clear your browser). API means the communication channel the page uses to create and retrieve your profile.
**When it helps you:** You get a persistent personal profile that tracks your verification skills over time, with no sign-up, no email address required.

### Cognitive Immunity Score display
**What it is:** A dashboard showing your personal verification history: how many claims you have checked, how many manipulations you correctly caught versus missed, how many days in a row you have practiced (your streak), and your overall Cognitive Immunity Score — a single number summarizing how sharp your misinformation-detection skills are.
**When it helps you:** You track your improvement over time — like a fitness tracker, but for your critical thinking.

### 8-layer coverage meters
**What it is:** Eight progress bars — one for each type of deception — showing how many claims of each type you have reviewed. If some bars are empty, those are your "blind spots" — types of deception you have not yet practiced recognizing.
**When it helps you:** You see that you have reviewed many Layer 1 (fabrication) claims but none of the Layer 6 (narrative manipulation) type. You navigate to practice that specific type.

### Cohort efficacy headline
**What it is:** A display showing how the entire group of platform users has improved on average — specifically, the average difference between users' scores before and after using the platform, expressed as Cohen's d_z (a number that tells researchers how large the improvement is — a d of 0.8 or above is considered large by scientific convention).
**When it helps you:** You see how your personal improvement compares to the overall improvement seen across all platform users — placing your journey in a broader context.

---

## /peer-challenge
*(A timed competitive fact-checking game for groups and classrooms)*

### Timed competitive fact-checking game
**What it is:** A game where players are shown 10 real or fake claims about Egypt and must judge each one as real or fake before a countdown timer runs out. Points are awarded based on how quickly and accurately you answer. The faster and more accurate, the higher your score.
**When it helps you:** A group of students competes in a classroom to see who can most quickly identify fabricated Egyptian news — learning critical thinking through competition.

### Room code generation
**What it is:** The game generates a short shareable code that other players can enter to join the same challenge session — like a password for a game lobby.
**When it helps you:** A teacher generates a code and displays it on screen. Students enter it on their own devices and all join the same real-time challenge.

### Difficulty-stratified question pool
**What it is:** The 10 questions in each game are drawn from three difficulty levels — easy (100 points), medium (200 points), and hard (300 points) — covering claims about Egyptian events, health topics, and science.
**When it helps you:** A mixed-ability group is challenged at the right level — beginners can still answer the easy questions while experts are pushed by the harder ones.

### Results leaderboard with technique explanations
**What it is:** After each question, the answer is revealed along with — if the claim was fake — an explanation of which manipulation technique it used. A leaderboard updates in real time during the game.
**When it helps you:** Players do not just learn whether they were right or wrong — they learn the specific name and mechanism of the trick used, turning a game into a genuine learning experience.

---

## /philosophy
*(The intellectual and scientific foundation behind the platform's approach)*

### Platform philosophy manifesto
**What it is:** A long-form article explaining why the platform was built the way it was — covering why traditional fact-checking alone is not enough, how inoculation theory works (the scientific idea that showing people weakened examples of manipulation techniques makes them resistant to real ones, like a vaccine), how the Cognitive Immunity Model works, and more. Every claim has a citation.
**When it helps you:** An academic, journalist, or potential partner reads this to understand the intellectual and scientific thinking behind the platform's design — and to judge whether it is credible.

### Theme-reactive layout
**What it is:** The entire page automatically adjusts its colors and typography to match whichever of the 16 visual themes the user has selected for the platform. It uses design-token variables (shared color and font values that the whole platform references) so the page always looks consistent.
**When it helps you:** Arabic readers using the platform's Arabic dark theme see the manifesto in the same visual style as every other page — no jarring inconsistency.

### Inoculation-theory evidence section
**What it is:** A section of the manifesto listing specific published studies — with exact numbers — that back up the platform's approach: Roozenbeek 2022 (showing a 52% reduction in sharing misinformation after inoculation-style training), Van der Linden 2017, and Cook 2017. Effect sizes (Cohen's d — the number measuring how large an improvement is) are shown.
**When it helps you:** A researcher fact-checking the platform's scientific claims can verify that the cited studies are real, the effect sizes are reported accurately, and the platform is not overstating the evidence.

---

---

# Platform Features — Pages 3 (plain-language)

Features 89–134 explained in everyday words — no background knowledge needed.

---

## /platform-guide — How to Use the Platform

### Interactive Platform Guide
**What it is:** A step-by-step map of the whole website, split into 13 sections you can open and close like an accordion. Each section tells you what tool is in it, how long it takes, and shows you links to get there. It works in both Arabic and English.
**When it helps you:** You just arrived at the website and have no idea where to start. You open this guide and it walks you through every tool in order, with time estimates so you know what to expect.

### Section Progress Tracking
**What it is:** The guide remembers which sections you already read and which steps you ticked off, even if you close the browser and come back another day. It saves your place automatically on your device.
**When it helps you:** You read half the guide on Monday, then life got busy. When you return on Thursday, your progress is still there and you can pick up exactly where you left off.

### Searchable Section Filter
**What it is:** A search box at the top of the guide. You type any word and it instantly filters the sections to show only the ones that mention that word — including Arabic words and tags.
**When it helps you:** You remember hearing about a "hadith checker" tool but can't find it. You type "hadith" in the search box and the relevant section appears immediately.

### Quick Start Card
**What it is:** A short five-step strip at the top of the guide for people who don't want to read everything. It gives you the fastest possible path through the platform: take the self-assessment, follow the curriculum, check your dashboard, see the threat map, and earn your passport.
**When it helps you:** You're impatient or you've used the platform before and just want a quick reminder of the best order to do things.

### Competition Demo Order
**What it is:** Section 10 of the guide lays out the exact sequence a presenter should follow when showing the platform to judges at a competition: Explore the platform → try the AI Editor → visit the Angry Debunkers → try the Swarm Debate → see the God System.
**When it helps you:** You are presenting the platform to a panel of judges and want to rehearse the demo in the right order to make the best impression.

---

## /presentation — Downloadable Presentation Decks

### Presentation Deck Center
**What it is:** A page showing five ready-made slide decks you can download. Each deck has a different focus — competition pitch, technical details, scientific background, Islamic tools, and impact results. Each card shows how many slides it has, how long it takes to present, and its file size.
**When it helps you:** You need to present the platform to an audience and want a polished, ready-made slide deck instead of building one from scratch.

### Deck Topic Expansion
**What it is:** When you click on a deck card, it opens up and shows you a list of all the topics covered inside that deck, displayed as small labels.
**When it helps you:** You're choosing between two decks and want to quickly see which one covers the topics most relevant to your specific audience before downloading.

### Deck Download Trigger
**What it is:** Each deck card has a Download button. When you click it, the button shows a loading animation while the file prepares, then the download begins.
**When it helps you:** You have a pitch meeting in an hour and need to quickly download the right deck to your computer.

---

## /pricing-presentation — Service Pricing Slides

### Pricing Package Slideshow
**What it is:** A full-screen, three-slide presentation (designed for right-to-left Arabic reading) showing three price tiers for building or consulting on the platform: Large project (50,000–70,000 Egyptian pounds), Medium (30,000–35,000 EGP), and Small (15,000–17,000 EGP). You can navigate with keyboard arrows. (RTL means the text and layout flow right-to-left, the natural direction for Arabic.)
**When it helps you:** You are presenting your services to a potential Egyptian client and want to walk them through pricing options on screen.

### Revision Cost Slide
**What it is:** The second slide explains what it costs if the client wants to make changes after work is delivered — small changes cost 1,500 EGP, medium changes 3,000 EGP, large changes 5,000 EGP. It also shows a payment schedule: 50% upfront, 30% midway, 20% on delivery.
**When it helps you:** A client asks "what if I want to change something later?" — you go to this slide to set clear, documented expectations before signing a contract.

### Marketing Channels Slide
**What it is:** The third slide outlines how the platform will be promoted — social media, content creation, paid digital ads, referrals, and online webinars — plus key partnerships with universities, tech hubs, and consulting firms.
**When it helps you:** You are in a meeting with investors or partners and need to show them that you have a real plan for reaching users, not just building a product.

---

## /project-vision — Why the Platform Exists

### Vision Principles Cards
**What it is:** A set of cards displaying the core beliefs behind the platform — the "why we built this" values — each one shown in both English and Arabic with a short explanation.
**When it helps you:** You are a researcher, journalist, or potential partner who wants to understand the thinking and philosophy behind the platform before deciding to work with it.

### Egyptian Misinformation Pattern Map
**What it is:** A list of the specific types of false information that spread most in Egypt on social media, each linked to a psychological reason why it works. These are patterns specific to Egyptian culture and online behavior.
**When it helps you:** You are a researcher or journalist trying to understand what kinds of lies and rumors are most common in Egypt and why Egyptians tend to believe them.

### Cognitive Bias Map
**What it is:** A map of 14 mental shortcuts (called cognitive biases — automatic ways our brains take shortcuts that can lead us astray) that make people vulnerable to misinformation. Each one comes with an Egyptian example, why it matters, how the platform responds to it, and a link to the published scientific study behind that claim.
**When it helps you:** You are a reviewer or academic partner checking whether the platform's design choices are actually grounded in real research — not just good intentions.

### Design Response Layers
**What it is:** A breakdown of the specific design decisions built into the platform to interrupt each path that misinformation travels. It connects each design feature to the scientific reason it was built that way.
**When it helps you:** You are a product manager or designer who wants to understand the "why" behind each screen and feature — why things are placed where they are and why interactions work the way they do.

### Verified Expert Quotes
**What it is:** A collection of quotes from real scholars and researchers that support the platform's approach. Each quote is shown in both languages with a proper reference (author, institution, publication).
**When it helps you:** You are writing a report or giving a presentation and want to back up the platform's approach with real expert voices, not just your own claims.

---

## /prompt-lab — Ready-Made AI Prompts for Fact-Checking

### Prompt Template Library
**What it is:** Five pre-written instructions (called prompts) that you can copy and paste into any AI chat tool (like ChatGPT) to help you fact-check things. The five prompts cover: checking an image's context, detecting deepfakes (fake AI-generated videos or photos), checking if a source is trustworthy, planning a reverse image search, and identifying logical tricks in an argument. (OSINT stands for Open Source Intelligence — finding information using public sources like social media and news sites. A deepfake is a realistic-looking fake video or photo created by artificial intelligence.)
**When it helps you:** You find a suspicious video online and want to check if it's real. You open the prompt lab, copy the Deepfake Detection prompt, paste it into your AI tool along with a description of the video, and get a guided analysis.

### Category + Tag Filter
**What it is:** Buttons that let you filter the prompt cards to show only the type you need — for example, only OSINT (public-source investigation) prompts, or only prompts related to debunking.
**When it helps you:** You are doing a specific investigation and only want to see the prompts that are relevant to your task, without scrolling through all five.

### One-Click Prompt Copy
**What it is:** A Copy button on each prompt. One click copies the full prompt text to your clipboard (the "clipboard" is the invisible holding area where copied text lives until you paste it). The button shows "Copied!" for two seconds so you know it worked.
**When it helps you:** You want to use a prompt immediately. You click Copy, switch to your AI chat window, and paste — no selecting or highlighting needed.

---

## /publishing-plan — How the Platform Will Be Released

### Publishing Phase Roadmap
**What it is:** A clear step-by-step plan for how the platform will be released to the public — starting from GitHub (a code-sharing website), then as a PWA (a website that can be installed like an app), then on Android, then on iPhone, and finally through partnerships with institutions. Each phase is clickable in a navigation bar at the top.
**When it helps you:** You are a team member planning what needs to be done before the next release, or a partner who wants to understand the timeline.

### Non-Negotiable Guardrails
**What it is:** A bilingual (Arabic and English) list of rules that must never be broken during any release. These are the hard limits that protect users and ensure the platform stays trustworthy — no matter how much pressure there is to skip them.
**When it helps you:** You are a developer or quality checker preparing for a release and need to confirm every item on the "never skip" checklist has been met.

---

## /reaction-test — How Fast Does Your Brain Get Fooled?

### Dual-System Reaction Speed Test
**What it is:** A test based on a well-known idea in psychology: our brains have two modes. Mode 1 is fast and automatic — it jumps to conclusions. Mode 2 is slow and careful — it checks the facts. This test runs 24 headlines twice: first you judge them quickly (Mode 1), then you judge them again slowly (Mode 2). It compares your accuracy and speed between the two rounds.
**When it helps you:** You want to know how much your snap judgments differ from your careful analysis — and whether slowing down actually makes you more accurate at spotting fake news.

### Real/Fake Headline Classification
**What it is:** Eight headlines chosen randomly from a set of 24, covering health scares, money panics, archaeology news, and WhatsApp hoaxes common in Egypt. For each one you say: real or fake.
**When it helps you:** You practice spotting misinformation in the kinds of headlines that actually circulate in Egyptian WhatsApp groups and news feeds — building a real-world skill.

### Reaction Time Measurement
**What it is:** For every headline, the test secretly records exactly how many milliseconds it takes you to answer. At the end it calculates your average speed for the fast round versus the slow round.
**When it helps you:** Over multiple sessions, you can track whether you are getting quicker and more accurate — concrete proof that your "cognitive immunity" (your brain's ability to resist false information) is improving.

---

## /religion-hub/exercise/[day] — Daily Islamic Exercises

### 14-Day Islamic Exercise Program
**What it is:** A series of 14 daily exercises — one per day — for the Religion Hub learning track. Each day's exercise is loaded automatically when you navigate to it. The exercises include behavior-change science metadata called COM-B (a framework that explains what a person needs — Capability, Opportunity, and Motivation — to change a behavior) to make them more effective.
**When it helps you:** You are following the 14-day Religion Hub program and arrive at today's exercise. The page shows exactly what to do today, no searching required.

### Exercise Completion Tracking
**What it is:** When you finish an exercise, the platform saves your completion and quietly adds your anonymous results to the platform's research data pool — helping build evidence that the program actually works.
**When it helps you:** Your progress is saved automatically. And by completing exercises, you help researchers measure whether the program is genuinely improving people's ability to spot religious misinformation.

---

## /religion-hub/maqasid — Islamic Higher Objectives Tool

### Maqasid al-Shariah Reasoning Tool
**What it is:** Islam has five overarching goals (called Maqasid al-Shariah — the higher objectives of Islamic law) that all Islamic rulings are meant to protect: religion, life, the mind, family lineage, and wealth. This tool shows all five as clickable cards with a description, historical basis from classical scholars (Al-Shatibi and Al-Ghazali), and example questions for each.
**When it helps you:** Someone sends you a religious ruling and you want to think through whether it genuinely serves the spirit of Islamic law — not just what someone says it says.

### Claim Maqasid Analysis
**What it is:** A text box where you paste a religious claim or ruling. The tool analyzes it against the Islamic objective you selected and tells you whether it is compatible — and adds a reminder that its analysis should be cross-checked with Dar Al-Ifta or Al-Azhar (Egypt's official Islamic authorities).
**When it helps you:** You received a fatwa (a religious ruling) on WhatsApp that seems to justify something extreme. You paste it here and check whether it actually aligns with Islam's stated higher purposes.

---

## /religion-hub — Islamic Verification Home

### Islamic Verification Hub Landing
**What it is:** The home page for all Islamic verification tools. It displays nine tools as color-coded cards (Hadith Checker, Fatwa Context Analyzer, Quran Browser, Sectarian Detector, Authority Verifier, Zakat Calculator, Inheritance Calculator, Halal Finance Checker, and Maqasid Reasoning Tool) with counters showing the platform has catalogued 100 Islamic fallacies and covers 8 hadith collections.
**When it helps you:** You received questionable religious content and want to check it — this page is your starting point to choose the right tool.

### Quick Links: Daily Exercise, WhatsApp Checker, Quran Browser
**What it is:** Three shortcut buttons on the same home page that take you directly to the 14-day exercise program, the WhatsApp religious message checker, or the full Quran browser.
**When it helps you:** You've used the platform before and know exactly what you want. Instead of scrolling, you click the shortcut and go straight there.

---

## /religion-hub/quran — Read the Quran

### Live Quran Browser
**What it is:** Fetches a live list of all 114 surahs (chapters) of the Quran — with Arabic name, English translation, verse count, and whether it was revealed in Makkah or Madinah — directly from the official quran.com database. You can search by name.
**When it helps you:** Someone quotes a Quran verse and you want to verify it is real and correctly cited. You look it up here using a trusted, sourced copy.

### Verse-by-Verse Reader
**What it is:** Once you choose a surah, it loads every verse in the traditional Uthmani script (the standard Arabic writing style used in printed Qurans worldwide) from the quran.com source.
**When it helps you:** You want to read the exact Arabic text of a verse someone quoted — to confirm it hasn't been changed, shortened, or taken out of context.

---

## /religion-hub/tools/authority-verifier — Is This Sheikh Qualified?

### Islamic Authority Credential Check
**What it is:** You type in the name of a sheikh or scholar, and the tool searches its database and returns a profile showing their credentials — whether they studied at a recognized institution, hold scholarly certifications, or are simply a social media personality with no formal training.
**When it helps you:** Someone sends you a ruling from "Sheikh so-and-so" on WhatsApp. You paste the name here to find out whether this person is actually a qualified scholar before following their advice.

### Authority Score Visualization
**What it is:** The result comes with a color-coded score: green means high credibility (80 or above), yellow/amber means moderate (50–79), red means low (below 50). It also shows institutional badges if the person holds recognized positions.
**When it helps you:** You can instantly see the trust level at a glance — no need to read through a long explanation. Green means trustworthy, red means be careful.

---

## /religion-hub/tools/fatwa-context — Understanding Religious Rulings

### Fatwa Context Analyzer
**What it is:** A fatwa is a religious ruling issued by a qualified scholar. When you paste a fatwa into this tool, it finds out who issued it, which institution they belong to, when it was issued, and what specific situation it was originally meant to address — then checks it against Dar Al-Ifta (Egypt's official Islamic fatwa body).
**When it helps you:** You see a fatwa on social media that is being used to justify something controversial. You paste it here to find out whether the ruling is being applied accurately or ripped out of context.

---

## /religion-hub/tools/hadith-check — Is This Hadith Real?

### Hadith Authenticity Classifier
**What it is:** A hadith is a recorded saying or action of the Prophet Muhammad (peace be upon him). Not all hadiths are equally reliable — scholars have classified them for centuries into categories: Sahih (authentic), Hasan (good), Da'if (weak), and Mawdu' (fabricated/invented). You paste a hadith here and the tool tells you which category it falls into, which book it comes from, and what the chain of narrators looks like (the isnad — the list of people who passed the hadith down, like a chain of witnesses). It also shows opinions from multiple scholars.
**When it helps you:** Before you share a hadith in a WhatsApp group or use it in a talk, you check it here first to make sure it's actually authentic — not something someone invented and attributed to the Prophet.

### Quick Example Hadiths
**What it is:** Pre-loaded examples of authentic hadiths and fabricated (invented) hadiths so you can test the tool and learn to recognize the difference before checking your own.
**When it helps you:** You are new to the tool and want to understand what a real result looks like. You try an example and see immediately how the tool distinguishes authentic from fake.

---

## /religion-hub/tools/halal-finance — Is This Financial Product Islamic?

### Shariah Finance Compliance Checker
**What it is:** You describe a financial product (like a loan, mortgage, or investment scheme) and the tool analyzes whether it is halal (permissible in Islam) or haram (forbidden). It explains its reasoning and flags specific problems like riba (interest — which Islam prohibits), gharar (excessive uncertainty in contracts), or maysir (gambling-like speculation).
**When it helps you:** A bank offers you an "Islamic mortgage." You paste the product description here to check whether it truly avoids interest or whether it is conventional interest repackaged under Islamic-sounding names.

---

## /religion-hub/tools/mawarith — Islamic Inheritance Calculator

### Islamic Inheritance Calculator
**What it is:** Under Islamic law, inheritance is divided according to rules set in the Quran (specifically verses 4:11–12). This calculator takes in the value of the estate, the deceased person's gender, and how many spouses, sons, daughters, and parents are still alive — and computes exactly how much each person receives.
**When it helps you:** A family member passes away and relatives argue about who gets what. You enter the details here and get the Quran-prescribed shares in exact Egyptian pound amounts, so there is no room for dispute.

### Heir Share Breakdown Table
**What it is:** A table showing each heir's name, their fraction of the estate (like one-eighth or one-sixth), the exact amount in Egyptian pounds, and their percentage of the total.
**When it helps you:** Family members who are not scholars can look at a clear table with real numbers — rather than debating Quranic fractions — making the process transparent and fair for everyone.

---

## /religion-hub/tools (index) — Religious Tools Overview

### Religious Verification Tools Landing
**What it is:** A landing page with a decorative Islamic geometric pattern that lists the available tools, each with a full description in both Arabic and English, and a status badge showing whether it is live and ready or coming soon.
**When it helps you:** You arrive at the tools section and want a clear overview before committing to a specific tool — so you pick the right one without guessing.

---

## /religion-hub/tools/quran-context — Is This Verse Being Used Correctly?

### Quranic Verse Context Lookup
**What it is:** You enter a surah and verse number (for example, 2:255 means chapter 2, verse 255). The tool fetches the full Arabic text, an English translation, and the classical commentary by Al-Jalalayn (a famous pair of medieval Islamic scholars who wrote one of the most widely used Quran explanations). It also checks whether the verse is abrogated — meaning replaced or superseded by a later verse — because some people cite abrogated verses as if they are still the ruling.
**When it helps you:** Someone uses a Quran verse to justify a position. You look it up here to see the full context, the scholarly explanation, and whether that verse is even still in effect — or whether a later verse changed the ruling.

---

## /religion-hub/tools/sectarian-detector — Is This Content Trying to Divide Muslims?

### Sectarian Manipulation Detector
**What it is:** Sectarian content is text designed to make Muslims suspicious of or hostile toward other groups of Muslims — turning religious disagreements into hatred and conflict. You paste any Arabic or English religious text here and the tool tells you the risk level (low, medium, or high) and flags specific warning signs: takfir rhetoric (declaring other Muslims to be non-believers, which is a serious accusation), political manipulation using religion, and deliberate sectarian framing.
**When it helps you:** A friend sends you a religious article that feels like it's trying to make you angry at Shia Muslims, or Sunni Muslims, or a particular group. You paste it here to get an objective analysis before you react or share it.

---

## /religion-hub/tools/zakat-calculator — How Much Zakat Do I Owe?

### Multi-Asset Zakat Calculator
**What it is:** Zakat is one of the Five Pillars of Islam — an annual charitable payment of 2.5% of your eligible wealth above a minimum threshold called the nisab. This calculator has tabs for different types of assets: cash savings, gold (at 24-karat, 21-karat, and 18-karat purity), silver, and business assets. It uses current Egyptian market gold and silver prices and follows AAOIFI standards (AAOIFI is the main international body that sets Islamic finance rules).
**When it helps you:** You are not sure how much zakat you owe this year. You enter your savings, gold jewellery weight, and business assets and get an exact, properly calculated amount.

### Nisab Eligibility Display
**What it is:** The nisab is the minimum amount of wealth a Muslim must have before zakat becomes obligatory. The tool shows you clearly whether your total wealth is above or below this threshold and how much you owe per asset category.
**When it helps you:** You are unsure if zakat is even required for you this year. The tool gives you a plain yes or no answer, and if yes, exactly how much.

---

## /religion-hub/whatsapp — Check a Religious WhatsApp Message

### WhatsApp Religious Message Checker
**What it is:** You paste any religious message you received on WhatsApp. The tool scans it for patterns: Does it contain a hadith that needs verification? Is it a fatwa being used out of context? Does it try to stir up division between Muslim groups? Is it a completely fabricated claim? It then gives you a verdict plus a ready-made polite reply in both Arabic and English that you can send back to the person who sent it.
**When it helps you:** Your uncle forwarded a message saying a certain religious practice is forbidden based on "what the Prophet said." You paste it here, find out whether the hadith is real and whether the claim is accurate, and get a calm, respectful response to share with the group.

---

## /report/[token] — View a Shared Awareness Report

### Shared Awareness Report Viewer
**What it is:** When someone shares their awareness report (a personal summary of their learning results), the report is encoded into a unique web link. This page decodes that link and shows the full report. If the link is expired, tampered with, or not valid, it shows a clear error message. The report appears in whichever language the original owner preferred.
**When it helps you:** Your teacher or coach sends you a link to their awareness report. You open the link and see their results without needing to log in or create an account.

---

## /report (index) — What Is My Awareness Report?

### Awareness Report Information Page
**What it is:** A page explaining what your personal awareness report contains — your resilience against misinformation, your mental health literacy score, and your growth in using Islamic coping tools — and what privacy protections are in place. It also tells you how to generate your own report after completing exercises.
**When it helps you:** You just finished a set of exercises and see a button to generate your report. Before clicking, you read this page to understand what the report will say and how your data is protected.

---

## /reverse — How Manipulation Is Built

### Manipulation Reverse-Engineering Hub
**What it is:** Instead of just showing you manipulation, this page takes you behind the scenes and shows you how manipulation campaigns are designed and structured — across three areas: fake news and edited videos (DeepReal track), mental health exploitation, and religious coercion.
**When it helps you:** You are a teacher, researcher, or curious advanced user who wants to understand not just "this is a manipulation trick" but "this is how someone would design a whole manipulation campaign from scratch."

### Cross-Domain Manipulation Deconstruction
**What it is:** Each of the three areas (fake news, mental health, religion) reveals the full chain of tactics used: how rumors start and get amplified, how people's identities get captured by harmful online communities, how religious content gets weaponized to create fear and compliance.
**When it helps you:** You are building a media literacy curriculum and need to teach students the architecture of manipulation — not just individual examples, but the systems behind them.

---

## /rumor-heatmap — How Fast Can a Rumor Spread?

### SIR Epidemic Rumor Simulator
**What it is:** Scientists use the same mathematical model to describe how diseases spread (the SIR model — Susceptible, Infected, Recovered) and how rumors spread through a population. This interactive simulator lets you set three dials: R0 (how contagious the rumor is — like a virality score), how many days people believe it, and what fraction of people have been "inoculated" (trained to recognize it). It then draws a graph of how the rumor grows and fades over 60 days.
**When it helps you:** You want to understand, visually, why prebunking (warning people about a trick before they encounter it) works so well — you can literally see the curve flatten when you increase the inoculated fraction.

### Herd Immunity Calculator
**What it is:** Calculates the minimum percentage of people who need to be trained (inoculated against a rumor) before the rumor can no longer spread uncontrolled — the same idea as herd immunity for vaccines. It also shows the rumor's effective spread rate and predicts on which day it will peak.
**When it helps you:** Policy makers, educators, or campaign designers can use this to answer: "How many people do we need to reach with prebunking training before this specific rumor burns out on its own?"

---

## /science — Science Literacy Hub

### Science Hub Landing
**What it is:** The home page for the science literacy track. It brings together four tools on one page: a command board for evaluating scientific evidence, a center for science intelligence, an exercise tracker, and a guide to the tools. (Think of it as a control room for scientific thinking.)
**When it helps you:** You want to get better at reading scientific claims in the news. This page is where you start the science track and see all related tools at a glance.

### Exercise Tracker Scroll-Jump
**What it is:** A button labeled "Jump to tracker" that smoothly scrolls the page down to the exercise tracker section and briefly highlights it so you know exactly where to look.
**When it helps you:** You are a first-time visitor who landed on the science page and are not sure what to do first. The button takes you directly to the action item — start your exercises here.

---

## /self-test-protocol — How the Platform Measures Its Own Effectiveness

### Research Protocol Spec Viewer
**What it is:** This page shows the full scientific plan for measuring whether the platform actually works — the research questions, the hypotheses (specific testable predictions), the measurement schedule, the sampling strategy (how participants are selected), and the success criteria. This is a transparent record of how effectiveness is measured, not just claimed.
**When it helps you:** You are a researcher, academic reviewer, or evaluator who wants to inspect the platform's evidence-collection methods before trusting its results.

### Instrument Readiness Board
**What it is:** A board showing each measurement tool (called a psychometric instrument — a tested questionnaire or test used in scientific research) with a color-coded status badge: Ready (green), Blocked (red), or Pending (yellow).
**When it helps you:** You are on the quality assurance team and need to know which measurement tools are ready to deploy and which are still waiting before a release.

### Self-Test Pillars & Risks
**What it is:** Two lists: what the research protocol measures (the pillars), and what could go wrong or reduce confidence in the results (the risks) — along with what the team is doing to reduce each risk.
**When it helps you:** You are an academic partner or institutional reviewer checking whether the platform's measurement approach is scientifically honest — including about its own limitations.

---

## /six-layers — The Platform's 6-Layer Teaching Architecture

### 6-Layer Scrollytelling Experience
**What it is:** A visually immersive, scroll-driven experience (scrollytelling means a story told through scrolling) that explains the platform's educational design across six layers. As you scroll, a 3D particle cloud moves in the background, each layer appears in sequence, and a floating navigation bar shows your progress. (ADDIE is a standard educational design framework — Analysis, Design, Development, Implementation, Evaluation.)
**When it helps you:** You are a first-time visitor or a competition judge who wants to understand the platform's educational depth in a compelling, visual way — not through a dry text document.

### Scroll + Mouse Tracking
**What it is:** As you scroll and move your mouse, the 3D background cloud reacts — it shifts and flows in response to where you are on the page and where your cursor is.
**When it helps you:** Makes the experience feel alive and interactive, keeping your attention engaged as you move through the six layers.

---

## /sources — Where Every Claim Comes From

### Comprehensive Source Registry
**What it is:** A complete, organized list of every source the platform relies on, grouped into six categories: Cognitive Science, Islamic Scholarly Sources, Egyptian Data and Statistics, Verification and Fact-Checking tools, AI and Technology APIs, and Medical and Mental Health sources. Every single claim on the platform must trace back to one of these sources.
**When it helps you:** You want to check whether the platform's statistics and claims are real. You come here and see every source, fully named and categorized — nothing is hidden.

### Full Source Map with Feature Mappings
**What it is:** A detailed map that lists each source alongside the exact platform features that use it and explains how each source is applied. This makes it possible to trace any claim on any page back to its specific source.
**When it helps you:** You are auditing the platform for a competition, funding body, or institution and need to verify that every feature has a legitimate source — not invented content.

### Evidence Search Panel
**What it is:** A live search tool embedded on the sources page that lets you look up evidence across multiple trusted databases simultaneously, without leaving the page.
**When it helps you:** You want to verify a specific claim right now. You type it into the search and see which of the platform's trusted sources address it.

---

## /sovo — Six-Engine Fact-Check in One Click

### SOVO Parallel-Engine Orchestrator
**What it is:** SOVO runs six specialist analysis tools simultaneously on any claim you type in: a Sentiment Analyzer (checks emotional tone), a Fallacy Detector (identifies logical tricks), a Bias Scanner (spots one-sided framing), a Source Verifier (checks the origin), an OSINT Investigator (OSINT means using public internet sources to investigate), and a Digital Forensics engine (looks for signs of tampering or faking). All six run at the same time and their findings are combined into one AI verdict.
**When it helps you:** You want the most thorough possible check on a suspicious claim — all six analysis methods applied at once, not just one.

### Engine Activation Visualization
**What it is:** You can watch each of the six engines "switch on" one after another with a short animation delay between them, so you can see that six separate analyses are actually running. The tool only shows real confidence scores from the analysis — it never shows made-up numbers.
**When it helps you:** In a live demonstration, this makes it visually clear that multiple independent systems are checking the claim, not just one algorithm giving a single score.

---

## /stat-power — Is This Study Strong Enough to Believe?

### Statistical Power Calculator
**What it is:** When scientists run a study, there is a risk of missing a real effect because the study was too small. "Statistical power" is the probability that a study would actually detect a true effect if one exists. This calculator lets you enter the effect size (Cohen's d — a measure of how big the difference between two groups is), the number of participants, and the significance threshold (alpha — the standard cutoff for calling a result "statistically significant," usually 0.05, meaning a 5% chance of a false positive). It then tells you the study's power: how likely it was to catch a real effect.
**When it helps you:** A news headline says "scientists found that X causes Y." You check the study's numbers here and discover it only had 30 participants and 40% power — meaning there was a 60% chance of missing the effect even if it existed. Now you know not to take the headline too seriously.

### Required Sample Size Estimator
**What it is:** Flips the calculation around: instead of "given this study, what was the power?", it asks "to achieve reliable results, how many participants would a study need?" It shows you the gap between what a study actually used and what it should have used.
**When it helps you:** You are reviewing a study someone cited to support a health claim. You check whether the sample size was large enough to be trustworthy — or whether the headline was based on a study too small to prove anything.

---

## /supervisor — Tracking a Group of Learners

### Supervisor Cohort Dashboard
**What it is:** A dashboard for teachers and administrators showing a roster of students going through the 144-day program. For each student it shows their current day, percentage of progress, score, whether they are at risk of falling behind, and their learning streak. You can sort by name, progress, or score, and filter by time period (last 7, 30, or 90 days).
**When it helps you:** You are a teacher running a class of ten students through the program. At a glance, you see who is doing well, who is falling behind, and who needs a check-in.

### Platform Metrics Overview
**What it is:** Six summary numbers at the top of the supervisor page: average score across all students (70.8%), overall completion rate (72%), number of at-risk students (3 out of 10), a compliance score for technical standards (SCORM — a set of rules that ensure the platform works with other learning management systems), daily activity events (2,847 per day), and average session length (34 minutes).
**When it helps you:** You are an institutional buyer or program director deciding whether the platform is effective. These six numbers give you an honest summary of how the current cohort is performing.

### SCORM/xAPI Telemetry Indicators
**What it is:** Two technical readiness indicators: SCORM compliance (SCORM is a universal standard that lets e-learning content work inside a school's existing learning management system, like Moodle or Blackboard) and xAPI event rate (xAPI is a newer standard that records detailed learning activities). Both show that the platform can be plugged into institutional systems.
**When it helps you:** Your university or organization already has a learning management system. These indicators confirm the platform can integrate with it without custom development.

### Export Menu
**What it is:** A dropdown button to export student progress data as a CSV (a spreadsheet file) or PDF report. The button and menu are built and visible, though the underlying data export is not yet fully connected.
**When it helps you:** You need to submit a progress report to your institution. You click Export and get a ready-made report instead of copying data manually.

---

## /swarm-debate — Practice Arguing Against Manipulation

### Swarm Debate vs 5 AI Archetypes
**What it is:** You choose one of five manipulation character types (archetypes) — an Ad-Hominem Attacker (someone who attacks the person instead of the argument), a Cherry-Picker (someone who selects only facts that support their side and ignores others), a False Authority (someone pretending to be an expert), a Conspiracy Framer (someone who claims hidden powers are behind everything), or a Deepfake Skeptic (someone who dismisses real evidence as AI-generated). You type a claim. The AI responds using that archetype's manipulation style. Your job is to write back in a way that names the specific trick being used.
**When it helps you:** You want to practice staying calm and logical when someone uses dirty debate tricks on you — especially the kinds common in Egyptian social media arguments.

### Fallacy Identification Scoring
**What it is:** After you write your rebuttal, the page reveals which logical fallacy the AI was using and whether your response actually named it. Your result is recorded for a final session score.
**When it helps you:** You learn not just to "feel" that something is wrong, but to name it exactly — which research shows is the most effective way to debunk manipulation publicly.

### Archetype Strategy Cards
**What it is:** Before the debate begins, you can see a card for each of the five archetypes showing its name, its manipulation style, and the recommended counter-strategy for defeating it.
**When it helps you:** You study the playbook before entering the debate — so you are not caught off guard when the AI uses a tactic you did not expect.

---

## /the-descent — The Platform's Story Told Through Scrolling

### The Descent Scrollytelling Gateway
**What it is:** The platform's flagship cinematic experience — a dramatic, scroll-driven story that introduces misinformation and cognitive defense through visuals and narrative as you scroll down the page. (Scrollytelling is a technique where a story unfolds as you scroll — like a comic strip that plays out as you move through the page.) It uses the browser's native scrolling (an earlier animation library was removed because it caused the page to go blank).
**When it helps you:** You are a first-time visitor who wants to understand what the platform is about in an engaging, memorable way — not through a wall of text.

---

## /threat-briefing — Today's Misinformation News in Egypt

### Daily Egyptian Threat Briefing
**What it is:** Every day, this page fetches live fact-checks from Google's Fact Check database and sorts them into six categories relevant to Egypt: health, economy, politics, religion, science, and food safety. Each item is tagged as high, medium, or low threat and links to the original fact-check source.
**When it helps you:** You wake up and want to know: what false stories are circulating in Egypt today? This page is your morning briefing — like a weather forecast, but for misinformation.

### Today's Focus & Exercise Recommendation
**What it is:** Each day highlights one topic to focus on (health misinformation, political polarization, religious exploitation, etc.) and recommends the specific exercise and curriculum track most relevant to that day's theme.
**When it helps you:** You do not know which exercise to do today. The page connects the current real-world threat to the learning activity that will best prepare you to deal with it.

### Threat Level Category Filter
**What it is:** Filter buttons that let you show only the items at a specific threat level (all, high, medium, or low) and a specific topic category.
**When it helps you:** You are pressed for time and only want to read the highest-priority items about health misinformation. You filter to "high threat" + "health" and see only what matters most to you.

---

## /threat-map — Seeing How a Rumor Travels

### Patient Zero Network Graph
**What it is:** A network graph — a visual diagram of dots (nodes) connected by lines — showing how misinformation spreads through Egyptian social media from a single starting point (called Patient Zero, borrowing the medical term for the first infected person in an outbreak). You enter a claim and the map shows where it could spread and how.
**When it helps you:** Competition judges or curious users can see, visually, the shape of how a specific false claim would ripple out through a network — making the abstract idea of "viral misinformation" concrete and visible.

---

## /tools-download — Download Investigator Tools

### Python Tool Script Downloads
**What it is:** Three downloadable scripts written in Python (a programming language) that you run on your own computer: one detects bot patterns on social media, one performs Error Level Analysis (ELA) on images to spot manipulation without needing the internet (ELA is a technique that reveals parts of an image that have been edited by looking at compression differences — like finding fingerprints left by Photoshop), and one extracts hidden information from PDF files.
**When it helps you:** You are an experienced investigator or researcher who wants powerful offline tools — not just web-based ones. You download these scripts and run them on your own machine for deeper, private analysis.

### Download State Tracking
**What it is:** Each script card gets a visual checkmark after you download it, so you remember which tools you have already saved to your computer.
**When it helps you:** You are downloading several tools in one session. The checkmarks prevent you from accidentally downloading the same file twice.

---

## /trailer — AI-Assisted Platform Trailer Production

### Cinematic Trailer Prompt Center
**What it is:** Five cards, each describing one scene of a cinematic trailer for the platform — including what the visuals should look like, what music and sound design to use, what dialogue to include, and what to type into an AI video generator to create that scene. A navigation strip at the top lets you jump between scenes.
**When it helps you:** You are using an AI video tool to produce a promotional trailer. Instead of inventing the creative direction yourself, you use these carefully written scene descriptions as your production guide.

### Negative Prompt Bank
**What it is:** A shared bilingual (Arabic and English) list of things to tell the AI video or image generator to avoid — for example, stock-photo aesthetics, generic backgrounds, or low-quality visual styles. In AI generation, a "negative prompt" is an instruction telling the system what not to produce.
**When it helps you:** You are generating trailer visuals and keep getting generic, stock-photo-style results. You add these negative prompts to your AI tool and the output quality improves dramatically.

---

## /transformation — Before and After: Proof the Platform Works

### Before/After Behavior Transformation Viewer
**What it is:** Six or more scenario cards, each showing a real situation and two responses: what a person would say or do on Day 1 (before the program) versus Day 14 (after completing the program). The cards span three tracks — fake news (DeepReal), mental health, and religion — and show the specific skill each scenario demonstrates.
**When it helps you:** You want evidence that the program actually changes how people think and behave — not just that they pass a quiz. These scenarios show the difference in real words and actions.

### Track-Filtered Scenario View
**What it is:** Color-coded cards that you can filter to show only the track you completed — so if you only did the mental health track, you see only those transformation examples.
**When it helps you:** You completed only one track and want to review what changed for you specifically, without seeing irrelevant examples from the other tracks.

---

## /trend-hunter — Spotting New Misinformation Early

### Live Google Trends Egypt Feed
**What it is:** Pulls the current list of what is trending in Egypt from Google Trends right now, showing each topic, an estimated traffic number, and when it was first trending.
**When it helps you:** You want to get ahead of emerging misinformation by monitoring what topics Egyptians are searching for at this moment — because new false stories often ride on trending topics.

### Debunked Claims Kill-List
**What it is:** A database of misinformation claims that have already been officially debunked, each with a severity badge (Critical, High, Medium, or Low), the false claim, the true fact, and the source of the debunking — shown in both Arabic and English.
**When it helps you:** A topic is trending and you want to know: has this exact false story appeared before and been debunked? You check the kill-list to see if today's trending rumor is a recycled old lie.

### Threat Level Filter
**What it is:** Filter buttons to show only the debunked claims at a specific severity level — so you can focus on Critical or High threats and skip the lower-priority ones.
**When it helps you:** You have limited time and need to triage — you filter to Critical claims only and address the most dangerous ones first.

---

## /ux-science — Why the Platform Is Designed the Way It Is

### 30 UX Persuasion Hooks Catalog
**What it is:** A catalog of 30 behavioral psychology techniques used intentionally in the platform's design — things like variable rewards (small surprises that keep you engaged), streak tracking (counting how many days in a row you have done something), and the Zeigarnik Effect (the feeling of needing to finish something you started). Each entry explains what the technique is, which category it belongs to, and why the platform uses it. (UX stands for User Experience — the design of how people interact with a product.)
**When it helps you:** You are a designer or educator studying how digital platforms can ethically keep users engaged and motivated, or you simply want to understand why this platform feels satisfying to use.

### Category Filter for Hooks
**What it is:** Buttons to filter the 30 hooks by behavioral category: Attention, Reward, Habit, Progress, Social, Persuasion, Friction, and Retention.
**When it helps you:** You are a UX researcher studying a specific type of engagement mechanism — for example, only "Habit" hooks. You filter to that category and see only the relevant entries.

---

## /verify/[id] — Is This Certificate Real?

### Public Certificate Verifier
**What it is:** When someone earns a completion certificate from the platform, they get a unique link. This page opens that link and displays the certificate with the holder's name, credential title, issue date, score band, and a tamper hash (a tamper hash is like a digital seal — a unique code generated from the certificate's exact contents; if anyone changes even one character, the code breaks and the forgery is revealed). It also accepts an optional name check to prevent someone from showing another person's certificate as their own.
**When it helps you:** An employer, competition judge, or institution wants to confirm that a certificate someone presented is genuine and was actually earned by that specific person.

### Tamper Detection Display
**What it is:** Shows the tamper hash and a clear "verification passed" or "verification failed" message. If the certificate was altered in any way since it was issued, the hash will not match and the page will show a failure warning.
**When it helps you:** Someone presents a certificate that looks legitimate but something feels off. You open the verify link and the tamper check immediately reveals whether it is genuine or forged.

---

## /welcome — First Impression

### Platform Welcome & Orientation
**What it is:** The animated welcome page for first-time visitors. It shows floating particles in the background, platform statistics (123+ pages, 80+ API routes, a 144-day curriculum, 8 AI engines), and five feature highlight cards — one for each major track: the Curriculum, Defense Tools, Islamic Hub, Science Engine, and AI Power.
**When it helps you:** You just discovered the platform and want a quick, visually impressive overview of what it does before deciding to sign up.

---

## /whatsapp-analyzer — Is This WhatsApp Message Real or Coordinated?

### WhatsApp Forwarded Message Analyzer
**What it is:** You paste in any forwarded WhatsApp message. The AI analyzes it and returns: a probability score for manipulation, detected bot-like patterns (signs the message was created by an automated account rather than a real person), emotional framing signals (language designed to make you feel fear, anger, or urgency), and urgency indicators (pressure tactics like "share this immediately before it's deleted").
**When it helps you:** You receive a suspicious forwarded message — maybe about a political crisis, a health scare, or a religious warning. You paste it here and find out in seconds whether it looks like organic sharing or a coordinated disinformation campaign.

### Bilingual Analysis Toggle
**What it is:** A switch button that changes the interface and the analysis context between English and Arabic. When analyzing an Arabic message, the AI processes it with full Arabic language understanding rather than translating it first.
**When it helps you:** You received a WhatsApp message written in Arabic. You switch to Arabic mode so the analysis understands the language, idioms, and cultural context properly — giving you a more accurate result.

---

## /why-us — Why This Platform and Not Others?

### Competitive Differentiation Page
**What it is:** A page that shows specific, sourced statistics about the scale of misinformation in Egypt — for example, 87% of Egyptians encounter health misinformation every week (according to WHO Egypt 2022) — alongside animated counters that make the numbers vivid. It then explains what makes this platform's approach different from generic fact-checking websites.
**When it helps you:** You are a potential user, funder, or competition judge wondering why this platform deserves attention. The page answers that question with hard numbers, not just promises.

---

## /womens-shield — Protecting Against Manipulation Targeting Women

### Women's Manipulation Pattern Detector
**What it is:** You paste any text — a message, a post, something someone said to you. The tool scans it against four categories of psychological manipulation that are specifically used to control or harm women: Gaslighting (making you doubt your own memory or perception), Guilt-Tripping (making you feel responsible for someone else's bad behavior), Isolation Attempt (cutting you off from friends and family), and Intimidation or Coercion (using fear to control you). It tells you which patterns were found and how severe they are.
**When it helps you:** You received a message from someone that made you feel confused, guilty, or afraid — but you are not sure why. You paste it here and the tool names exactly what is happening and how serious it is.

### Ready-Made Safety Response Scripts
**What it is:** For each manipulation pattern detected, the tool gives you a suggested response in both Arabic and English — a calm, assertive reply that addresses the manipulation directly without escalating conflict.
**When it helps you:** You identified gaslighting in a message but do not know how to respond without sounding angry or being dismissed. The tool gives you the exact words to use.

---

# API Features — First Half of the Platform (plain-language)

This document explains every feature in the first 43 API files of the Egyptian Awareness Library in everyday words. No technical background is needed to understand any of it.

---

## Investigating Claims with Multiple AI Helpers

### Five-Expert Parallel Claim Investigation
**What it is:** When you send the platform a suspicious claim, five different AI helpers (think of them as five specialized investigators) all study it at the same time from five different angles — where it came from, what psychological tricks it uses, whether it exploits Egyptian Arabic expressions, when it first appeared, and how to fight back against it. They work simultaneously so you get a complete picture fast.
**When it helps you:** Your cousin shares a viral story in the family group saying honey cures cancer. You paste it here and within moments get a full report covering the origin, the manipulation tactics, whether the Arabic phrasing is designed to trick you, and a ready-made reply you can paste back.

### Source Hunter Helper
**What it is:** One of the five helpers specializes in tracing a false story back to whoever created it first — like following footprints in the snow all the way back to the person who made them. It also checks professional fact-checking websites (like Snopes) to see if others have already debunked it.
**When it helps you:** You want to know: "Who started this rumor about the water supply being poisoned, and how did it reach our WhatsApp group?"

### Bias Detector Helper
**What it is:** One helper looks for the mental tricks hidden inside a message — ways the message is designed to make you feel, believe, or do something without you realizing you are being nudged. It gives each message a score between 0 and 1 (0 = honest, 1 = highly manipulative).
**When it helps you:** You read a post that made you feel angry and scared about immigrants. This helper explains exactly which emotional tricks the post used to trigger those feelings.

### Arabic Language Helper
**What it is:** One helper understands Egyptian Arabic dialect specifically — the everyday slang, the code words people use to hint at something without saying it directly, and whether a religious text has been quietly twisted in translation. English-only tools miss these local tricks; this one does not.
**When it helps you:** A message circulating in Arabic uses a religious phrase slightly out of context to make a health claim sound more trustworthy. This helper spots the distortion.

### Timeline Builder Helper
**What it is:** One helper figures out when a claim first appeared on the internet and draws a map of how it spread — which accounts or groups passed it along and why it keeps coming back even after being debunked.
**When it helps you:** You see the same "bottled water causes cancer" story for the third time. This helper explains that it first appeared in 2017, was debunked, and re-surfaces every summer because heat-related health anxiety makes people share it again.

### Counter-Narrative Helper
**What it is:** One helper writes a calm, clear, ready-to-use correction in both Arabic and English — including a short version you can paste directly into WhatsApp — so you can help the people around you without getting into an argument.
**When it helps you:** You want to correct your uncle's misinformation without starting a family fight. This helper gives you polite, factual words to use.

### Chief Verdict Officer
**What it is:** After all five helpers finish their reports, a final step reads them all together and issues one clear verdict: TRUE, FALSE, MISLEADING, UNVERIFIED, or PARTIALLY TRUE — with a plain explanation in both Arabic and English.
**When it helps you:** After the full investigation you get one bottom-line answer you can share with confidence, rather than a confusing pile of details.

---

## Internet Archive Connection

### Wayback Machine Archive (Placeholder)
**What it is:** A reserved space in the system for a future feature that will save web pages to the Internet Archive (a free service that takes permanent snapshots of websites so they cannot disappear). Right now it just signals that this connection is planned but not yet fully built.
**When it helps you:** In the future, sources cited in a fact-check will be automatically saved so that even if the original website deletes the page, the evidence remains.

---

## The Main AI Chat System

### Universal AI Chat
**What it is:** The central AI conversation tool used by every part of the platform. It can operate in six different modes depending on what you need — fact-checking, mental health support, understanding emotions in text, translation, academic research, or general questions. If one AI service stops working, it automatically switches to a backup service so the conversation never breaks.
**When it helps you:** Whatever page of the website you are on, when you click "Ask AI," this is the engine behind it.

### Claim Fact-Check Mode
**What it is:** When you ask the chat to check a claim, it only gives you an answer if it can find a real, trustworthy source to back it up — like a doctor's note instead of a rumor. If no good source is found, it honestly says "UNVERIFIED" instead of guessing.
**When it helps you:** You paste a claim saying a certain medication is dangerous. The chat checks real medical sources and shows you what they actually say — or tells you honestly that it could not find enough evidence to judge.

### Mental Health Chat Mode
**What it is:** A special gentle mode that responds with care when you are talking about emotional struggles, anxiety, or trauma. It also automatically shares real phone numbers and websites for mental health help in Egypt.
**When it helps you:** You are feeling overwhelmed and just need to talk. The AI listens with compassion and gives you real resources, not generic advice.

### Emotion Scoring Mode
**What it is:** The AI reads a piece of text and tells you whether the overall feeling is positive, negative, or neutral — like a mood-meter for words. It uses a specialized tool that was trained on millions of social media posts.
**When it helps you:** A module on the platform wants to understand whether a news headline is written in an angry, fearful, or calm way before showing it to you.

### Translation Mode
**What it is:** Translates between Arabic (including Egyptian everyday dialect and even "Arabizi" — Arabic written in English letters like "ana msh fahem") and English with natural, accurate meaning, not robotic word-for-word substitution.
**When it helps you:** A researcher needs to understand an Egyptian social media post written in dialect to check whether it is spreading misinformation.

### Academic Research Mode
**What it is:** When you need a serious, properly cited answer — the kind with references to actual published studies — this mode produces it in the formal style used in universities (called APA-7 format). It clearly separates what comes from peer-reviewed research versus general knowledge.
**When it helps you:** A student writing a paper on health misinformation in Egypt needs properly formatted sources, not just a paragraph summary.

### General / Page-Context Mode
**What it is:** On every page of the website there is an "Ask AI" button. This mode powers it by giving the AI extra knowledge about what that specific page is about — its topic, common tricks used in that domain, and the platform's own guidelines.
**When it helps you:** On the religion page, the AI already knows you are discussing Islamic topics; on the health page, it knows you are dealing with medical claims.

### Automatic Manipulation Guard (COVO)
**What it is:** Before every single AI response, an invisible check runs in the background looking for emotional manipulation tricks and logical holes in what you sent. If it finds them, it adds a gentle Socratic nudge — a question that makes you think — before giving the main answer. You never have to turn this on; it runs automatically.
**When it helps you:** You paste a manipulative anti-vaccine message without realizing how it is designed to bypass your critical thinking. The guard detects it and adjusts the AI's response to help you see the manipulation before accepting the conclusion.

### Language Auto-Detection
**What it is:** The AI automatically figures out whether you are writing in Arabic, English, or a mix of both — by counting which type of letters you used — and then responds in the same language you used.
**When it helps you:** You write "ana 3ayez a3raf" (Egyptian Arabizi) and the AI responds in Arabic naturally, without you having to choose a language setting.

### Defense Ledger Logging
**What it is:** For users who have created a private account, every time they check a claim the system quietly records it (without your name, just a private code) so researchers can later study patterns — like how often Egyptian users encounter health misinformation in a month.
**When it helps you:** You benefit from being part of research that improves the platform and shows funders that it is making a real difference.

---

## Quick Web Fact-Checking

### Live Web Search for Claims
**What it is:** Instead of just checking its own database, the system goes out to the live internet and searches news websites and fact-checking organizations for any pages that discuss the claim you submitted. It ignores social media results and only reads reputable websites.
**When it helps you:** A brand-new rumor from this week is checked against current news rather than old stored data.

### Source Quality Ranking
**What it is:** Every website found during the search is given a trust rating — S (gold standard like WHO), A (top news organizations), B (reputable), C (acceptable), or U (unacceptable). Social media pages and tabloids are automatically excluded from verdicts.
**When it helps you:** You know that the fact-check you received is based on reliable sources, not a random blog.

### Photo Hidden Data Check (EXIF)
**What it is:** Photos taken with a phone or camera contain invisible hidden data (called EXIF — think of it as a photo's birth certificate) that records when, where, and on what device the photo was taken, and whether software like Photoshop or an AI image generator touched it. This feature reads that hidden data.
**When it helps you:** A photo claims to show flooding in Alexandria right now, but the hidden data reveals it was taken in 2019 in a different country.

### Saving Sources as Permanent Snapshots
**What it is:** Every website cited in a fact-check is automatically saved to the Internet Archive (like taking a screenshot of the whole page) so that even if the website deletes the article later, the evidence is preserved forever.
**When it helps you:** A source that was used to verify a claim stays available even if the news site removes the article.

### Scientific Study Search
**What it is:** For claims about health, science, or medicine, the system also searches five major scientific databases (think of them as giant libraries of published research papers) and brings back real study references to back up the verdict.
**When it helps you:** A health claim like "turmeric cures Alzheimer's" is checked against actual published medical research, not just news articles.

### Strict Truth Standard (One-Law)
**What it is:** A built-in rule that prevents the AI from saying something is definitely true or false unless it has found a real, trusted source to prove it. If the evidence is too thin, the verdict is automatically changed to "UNVERIFIED." No guessing allowed.
**When it helps you:** You can trust that when the platform says "FALSE," it has real proof — it will not bluff.

### SIFT Learning Package
**What it is:** SIFT is a four-step method for checking information (Stop — Investigate — Find better sources — Trace claims). Every fact-check result is packaged with a mini-lesson showing you which SIFT steps were applied, so you learn the method as you use the tool.
**When it helps you:** Over time you internalize a reliable habit for checking information on your own, not just relying on the platform.

---

## Embeddings Placeholder

### Semantic Search Placeholder
**What it is:** A reserved space for a future feature that will let the platform find articles and content that mean the same thing even when worded differently — like a smarter search engine. It is not yet active.
**When it helps you:** In the future, searching for "does sugar cause diabetes" and "is sweets linked to blood sugar disease" will find the same results.

---

## Research Data Export

### Export All Assessment Data (JSON Format)
**What it is:** A tool for authorized researchers to download all the quiz and test results from platform users in a structured data format that computers can easily read and analyze. Access is restricted to admin users only.
**When it helps you:** A research supervisor needs to analyze results from 84 study participants to check whether the platform is actually improving people's ability to spot misinformation.

### Export All Assessment Data (Spreadsheet Format)
**What it is:** The same data but formatted as a spreadsheet file (CSV) that can be opened directly in Excel, Google Sheets, or statistical software. The file is automatically named with today's date.
**When it helps you:** A researcher wants to run statistical calculations in a program like SPSS or R to measure how much the platform helped participants.

---

## Tracking Personal Progress

### Retrieve Your Assessment Results
**What it is:** Fetches your quiz and test results from before and after using the platform so you can see how much you improved. For example, it compares your score from Day 0 (before training) to your score from Day 15 (after training).
**When it helps you:** After completing the program, you can see your personal before-and-after improvement in a dashboard.

### Submit Your Assessment Results
**What it is:** Saves your quiz results securely. The system handles several types of tests, including a media literacy test (MIST-20 — a standard 20-question test used by researchers worldwide to measure how well someone can tell real from fake news), mental health scales, and a usability survey.
**When it helps you:** After you finish a quiz, your score is saved so it can be compared to your future score and used in research.

### Personalized AI Feedback After Tests
**What it is:** After saving your test results, an AI helper writes a personal message just for you — explaining your strengths, what you could improve, suggested next steps in both Arabic and English, and which parts of the website would help you most.
**When it helps you:** Instead of just seeing a number, you get a friendly, specific coaching message that tells you exactly what to do next.

### Participant Tracking for Research
**What it is:** When you join the study, a private anonymous code for you is added to a list that researchers can count — so they can see how many total people completed the program, without ever seeing personal details.
**When it helps you:** Your participation (anonymously) helps build the evidence that this platform works, which helps get funding to keep it running and growing.

---

## Anonymous Login System

### Check if You Are Logged In
**What it is:** A quick check that tells any page on the website whether you already have an active session — like the website recognizing you when you come back without needing your name or email.
**When it helps you:** You return to the platform after a few days and your progress is already there waiting for you.

### Create a Private Anonymous Account
**What it is:** You can create an account without giving any personal information — no name, no email, no phone number. The system gives you a one-time recovery key (like a password) that you must save. This is the only way to get back in if you switch devices.
**When it helps you:** You want the platform to remember your progress and scores across visits, but you do not want to hand over personal data.

### Recover Your Account on a New Device
**What it is:** If you saved your recovery key, you can enter it on a different phone or computer and get all your history and scores back.
**When it helps you:** You switch from your old phone to a new one and recover your entire learning history and certificates using just that one key.

---

## Spotting Mental Tricks in Text

### Cognitive Bias Detection (Full Submission)
**What it is:** You paste any text — a message, post, or article — and the system scans it for cognitive biases (mental tricks that push you toward believing something without real proof, like "everyone is doing it" or "this is scary so it must be true"). It can check up to 10,000 characters at once.
**When it helps you:** Your aunt sends a scary WhatsApp forward saying a new food additive is poisoning children. You paste it here and discover it uses "fear appeal" and "false consensus" tricks.

### Cognitive Bias Detection (Quick Check)
**What it is:** The same bias-detection but designed for a quick check — you put the text directly in the web address bar instead of a form. Useful for small tools that need bias checking on the fly.
**When it helps you:** A mini widget on a web page can quietly check a headline for manipulation tricks as you browse.

### Deep AI Bias Explanation
**What it is:** If the quick scan finds bias tricks, this step calls on a more powerful AI to dig deeper — it names the single most dominant trick being used, gives you a score for how manipulative the text is, tells you step-by-step how to think more clearly about it, and offers an alternative way to interpret the message. All in Arabic and English.
**When it helps you:** After being told "this message uses anchoring bias," you now understand exactly what that means and how to protect your thinking.

---

## Anonymous Deep Investigations

### Anonymous Forensic Audit
**What it is:** You can submit any question, scientific paper reference, or sensitive claim completely anonymously — no account needed — and the system searches academic databases for evidence, then checks that evidence for hidden problems like funding from interested parties, ghostwriting (when someone else secretly wrote the study), or data that cannot be checked.
**When it helps you:** You are worried about a health claim but feel embarrassed to ask publicly. You submit it anonymously and get a judgment-free honest analysis.

### Strict Truth Standard on Anonymous Audits
**What it is:** Even in anonymous mode, the same "no guessing" rule applies — if there is not enough verified evidence, the answer is marked UNVERIFIED rather than inventing a verdict.
**When it helps you:** You can trust anonymous results just as much as regular ones. The platform does not cut corners just because nobody is watching.

### Two-AI Backup for Anonymous Audits
**What it is:** The anonymous audit tries a first AI service (NVIDIA) and automatically switches to a second (Google Gemini) if the first one is busy or unavailable — so you always get a result.
**When it helps you:** Even at peak times when AI services are overloaded, your anonymous audit still completes.

---

## Earning a Certificate

### Cognitive Immunity Certificate
**What it is:** If you complete all exercises on the platform, score well on a standard media literacy test (MIST-20 — the 20-question research test for spotting fake news), and demonstrate strong critical thinking across multiple measures, the platform issues you a digital certificate. All scores are verified on the server — you cannot fake them.
**When it helps you:** You earn a genuine, tamper-proof certificate that proves your ability to spot fake news and manipulation.

### Score Fraud Prevention
**What it is:** Your MIST-20 test score is only read from the secure server database — the platform ignores any score your browser tries to send, so you cannot cheat by editing the page.
**When it helps you:** Your certificate means something real, because nobody can fake their way to it.

### Tamper-Proof Certificate Signing (HMAC)
**What it is:** Each certificate is mathematically "signed" (using a method called HMAC-SHA256 — think of it like a wax seal on an official letter that breaks if anyone tampers with it). The signature, name, score, date, and version are all stored together. Anyone can check whether the certificate has been altered.
**When it helps you:** You share your certificate link with an employer or university and they can verify it is real without calling anyone.

### Public Certificate Verification
**What it is:** Anyone with your certificate's unique link can check it online. The system re-calculates the mathematical seal and confirms it matches. It also checks that the certificate has not been cancelled, and can verify your name if you choose to include it.
**When it helps you:** An employer or institution can confirm your certificate is authentic by visiting a public link — no paperwork needed.

### Detailed Failure Feedback
**What it is:** If you do not yet qualify for a certificate, the system tells you exactly which of the five criteria you did not meet — so you know precisely which skill to practice more.
**When it helps you:** Instead of a generic "you failed," you see "you need to improve your logical coherence score from 28 to 32 — try the reasoning exercises."

---

## The Main Chatbot

### Streaming "Angry Debunker" Chat
**What it is:** The main chatbot on the fact-checking page. It responds in real-time as it types (like watching someone write), uses a personality that is direct and passionate about truth, and can handle multi-turn conversations (you can keep asking follow-up questions).
**When it helps you:** You are having a back-and-forth conversation about a claim — asking questions, getting answers, digging deeper — like chatting with a knowledgeable friend.

### Seven-Layer Response Structure
**What it is:** Every response from this chatbot follows a fixed seven-step format: (1) strip out the emotional hook, (2) state the fact, (3) show who benefits from the lie, (4) bring the science, (5) review the evidence, (6) bust the myth, (7) give you a ready script to defend the truth. This structure is called the "Truth Sandwich" method — researchers have found it is one of the best ways to actually change minds.
**When it helps you:** You do not just learn "this is false" — you learn the full story of why it spread and how to explain it to others.

### Origin Story Investigation
**What it is:** When the fact-check includes information about where a claim was first created, the chatbot is instructed to tell you specifically which platform it started on, in which year, and who or what group appears to have launched it.
**When it helps you:** You ask "where did this rumor start?" and get a sourced, specific answer instead of a vague "it spread online."

---

## Handling Mental Health Emergencies

### Crisis Hotline Delivery
**What it is:** When the platform detects certain warning words (like expressions of self-harm or distress), it immediately delivers real, verified Egyptian mental health phone numbers — including the national helpline 08008880700 and Befrienders Cairo — without relying on AI at all. The numbers are hard-coded so they can never be wrong or invented.
**When it helps you:** If you or someone you know is in a crisis moment, real help information appears instantly and reliably, even if the AI systems are down.

### AI Compassionate Enrichment for Crisis
**What it is:** On top of the hard-coded hotlines, if you provide more context about your situation, the AI adds a warm, culturally sensitive message in Arabic that acknowledges your feelings and explains what you might be experiencing — without ever replacing or blocking the phone numbers.
**When it helps you:** You feel heard as a person, not just handed a list of numbers.

### Crisis Audit Log
**What it is:** The system keeps a private, secure record of when crisis resources were triggered (not what was said, just the fact that it happened and from where). This follows international guidelines on responsible reporting about mental health crises.
**When it helps you:** The platform meets ethical safety standards, and researchers can see that the safety net is being used, which supports continued operation.

---

## Debate Training

### AI Devil's Advocate
**What it is:** This feature picks one of the known logical fallacies (reasoning tricks that sound convincing but are actually flawed — like "my grandfather smoked and lived to 100, so smoking is fine") and secretly uses it to argue against your point. Your job is to spot which trick it used.
**When it helps you:** Like a sparring partner in boxing, this trains your ability to recognize manipulation in real debates before you encounter it in the wild.

### Hidden Fallacy Reveal
**What it is:** While the AI is making its flawed argument, the name of the fallacy it used is stored separately and only shown to you after you guess. The argument text itself never names the trick.
**When it helps you:** You practice detecting the trick without being told what to look for — building real skill rather than just memorizing labels.

---

## Quick Fact-Check with Religious and Cultural Context

### Quick Fact-Check (One Step)
**What it is:** You submit a claim and in one fast step the system checks live sources, detects emotional manipulation, judges each source's relevance to your specific claim, and produces a bilingual verdict with Egyptian cultural context — including religious context when needed.
**When it helps you:** You get a full fact-check result in seconds, tailored to Egyptian context, not a generic Western answer.

### Deep Forensic Analysis (Optional Second Step)
**What it is:** For users who want more depth, a second optional step runs a complete seven-layer analysis — tracing the claim back to its origin, identifying all eight possible types of deception, and giving you specific tools to counter each one.
**When it helps you:** A journalist or researcher wants the full picture, not just the verdict.

### PDF Document Analysis
**What it is:** You can upload a PDF file alongside your claim — for example a health article, a religious decree, or a screenshot — and the AI reads the actual document content, not just the claim you typed.
**When it helps you:** Someone sends you a suspicious PDF "study" claiming to prove something. You upload it directly and the system fact-checks what the document actually says.

### Source Relevance Filter
**What it is:** After finding academic papers and news articles, the system runs a second check asking "does this source actually address this specific claim?" and drops any sources that are only vaguely related — preventing a false sense of confidence from unrelated evidence.
**When it helps you:** You get sources that actually prove or disprove your claim, not sources that just happen to use the same keywords.

### Cross-Model Second Opinion
**What it is:** Two separate AI models look at your claim independently and reach their own verdicts. If they disagree, that disagreement is shown to you as a signal of genuine uncertainty.
**When it helps you:** When two AIs disagree, you know the claim is genuinely ambiguous rather than clearly true or false — an honest signal not to be overconfident.

### Hallucination Catcher
**What it is:** After the AI writes its response, a third check reads it and identifies any sentence that is not actually supported by the sources that were found. These unsupported sentences are flagged in the interface.
**When it helps you:** You can see exactly which parts of the AI's answer came from real sources and which parts might be invented — protecting you from AI errors.

### Honest Confidence Rating
**What it is:** Instead of just showing the AI's own self-reported confidence (which tends to be overconfident), the platform calculates a more honest confidence score by combining five signals: the AI's own rating, the quality of sources found, how many sources were found, whether two AIs agreed, and how many sentences lacked source support.
**When it helps you:** You see a confidence level you can actually trust, not one the AI invented to sound convincing.

### Religious Claim Checker
**What it is:** When a claim involves Islamic topics — like a hadith (a saying attributed to the Prophet Muhammad) or a fatwa (a religious ruling) — the system checks only real retrieved sources, never from memory, cites classical Islamic scholars by name, and clearly says when it cannot grade a narration. It never invents Islamic scholarly positions.
**When it helps you:** A viral "hadith" circulating on social media claiming the Prophet endorsed a certain medicine is checked against real hadith collections, not made up.

---

## Spotting Fake Images and Videos (DeepReal)

### Photo Hidden Data (EXIF) Check
**What it is:** Every photo taken by a phone or camera carries hidden technical information (called EXIF data — think of it as the photo's invisible ID card) recording the camera brand, when the photo was taken, where it was taken (GPS coordinates), and whether image-editing software like Photoshop or Canva touched it. This feature reads all of that.
**When it helps you:** A photo claiming to show a recent event is checked — its hidden data reveals it is actually five years old and was edited with software.

### Commercial Deepfake Detector
**What it is:** If the platform has access to a commercial service called Sightengine, it runs the image through that service's deepfake detection tool and reports back a probability score. The platform is honest that this score is a hint, not a final verdict.
**When it helps you:** An image of a public figure saying something controversial is checked for signs of digital face-swapping.

### Combined Forensic Verdict
**What it is:** The EXIF hidden data and the deepfake detection score are combined by the AI into a single plain-language verdict — one of: AUTHENTIC, INCONCLUSIVE, SUSPICIOUS, or LIKELY FAKE — with an explanation in Arabic and English of what each signal means.
**When it helps you:** Instead of deciphering technical numbers yourself, you get one clear answer with an explanation.

---

## Uploading Documents for Analysis

### PDF Upload and Conversion
**What it is:** You upload a PDF file (up to 10 megabytes) and the system converts it into a format (called base64 — essentially the file turned into a long string of text) that can be passed to the fact-checking AI. The system checks that it is really a PDF before accepting it.
**When it helps you:** A preliminary step that lets you upload documents once and then check them repeatedly without re-uploading.

---

## Checking Hadiths

### Hadith Authenticity Grading
**What it is:** You paste the text of a hadith (a saying attributed to the Prophet Muhammad) and the system evaluates whether it appears in real Islamic collections and what scholars have said about its reliability. The grades are: Sahih (sound/authentic), Hasan (good), Da'if (weak), Mawdu' (fabricated), or UNVERIFIABLE (cannot be determined). It also checks the chain of narrators (called isnad — the list of people who passed the saying from generation to generation) and detects if the text is being misattributed to the wrong collection.
**When it helps you:** A viral message claims the Prophet said something that sounds suspicious. You check it here before sharing it.

### Scholar Opinion Mapping
**What it is:** Beyond the grade, the system tells you what famous Islamic scholars — both classical ones (like Ibn Hajar al-Asqalani and Imam al-Nawawi, renowned medieval hadith experts) and modern ones — have said about this specific narration.
**When it helps you:** You want more than a grade — you want to know which respected authorities have studied this hadith and what they concluded.

### Misattribution Alert
**What it is:** Sometimes a real hadith text exists but is wrongly attributed to the wrong book or a different narrator than the actual source. This feature flags those cases and explains the error.
**When it helps you:** A message says "Bukhari narrated..." but the text actually comes from a weaker collection. You catch that mislabeling.

---

## Detecting Emotional Harm in Messages

### Psychological Manipulation Detector
**What it is:** You paste any text — a message, post, or article — and the system analyzes it for emotional pressure tactics and "dark patterns" (tricks designed to make you feel trapped, guilty, afraid, or obligated). It returns a score for how cognitively demanding the message is, a yes/no flag for manipulation, and a list of the specific tricks found.
**When it helps you:** A message from a group or recruiter feels off but you cannot explain why. This tool names the specific tactics being used against you.

---

## Open-Source Intelligence Investigation (OSINT)

### Automated Internet Investigation
**What it is:** OSINT (Open-Source Intelligence — the practice of gathering information from publicly available sources) is the technique journalists and investigators use to research stories using only the public internet. This feature runs that process automatically: an AI planner figures out the best search questions, a search agent goes out to the live web and reads the relevant pages, and a final agent writes a sourced report with numbered citations.
**When it helps you:** You want a thorough investigation of a claim — like who is behind a suspicious social media account — and the system does the searching, reading, and report-writing for you in real time.

### AI Search Planner
**What it is:** The first step of the investigation: an AI takes your question and breaks it into three or fewer focused search queries designed to find the most relevant evidence.
**When it helps you:** Instead of you trying to guess the right search terms, the AI figures out the best way to search for what you need.

### Simultaneous Web Search
**What it is:** All the search queries run at the same time (not one after another) and the system reads the top relevant web pages, ignoring ones that are blocked or empty.
**When it helps you:** The investigation is fast because multiple searches happen in parallel rather than sequentially.

### Cited OSINT Report
**What it is:** The final report from the investigation cites every single claim with a numbered source (like [1] or [2]) so you can check each piece of evidence yourself. Any claim that cannot be sourced is marked UNVERIFIED rather than stated as fact.
**When it helps you:** You receive a professional-quality research report you can share or build on, knowing every statement is either sourced or honestly flagged as unverified.

---

## Religious Shock Support

### Ontological Shock Counter-Narrative
**What it is:** "Ontological shock" means the deeply unsettling feeling when something challenges your core beliefs about existence, religion, or identity — like encountering content that attacks your faith in a psychologically destabilizing way. This feature accepts the text that shook you, rates how serious the shock is (0–10), and responds with a verified historical or theological grounding, a calming truth, and a suggested action.
**When it helps you:** You watch a video that seems to debunk something fundamental in your faith and feel deeply unsettled. This feature gives you a calm, scholarly, psychologically safe response.

---

## Three-Expert Threat Response Swarm

### Combined Three-Expert Analysis
**What it is:** Three AI helpers work one after another like a relay team: the first one searches the live internet for fact-checks about a threat or claim, the second one analyses the psychological manipulation tactics in the threat, and the third one reads both reports and writes you a calm, grounded response that combines the facts with philosophical and emotional support.
**When it helps you:** A threatening or destabilizing piece of content — religious, political, or health-related — is tackled from three angles at once, giving you a complete defense.

### Live Internet Fact-Checker (Threat Hunter)
**What it is:** The first helper in the team uses real-time internet search (not stored old data) to find current fact-checks about the claim, so its information is up-to-date.
**When it helps you:** Brand-new threats from this week are checked against current sources, not data from months ago.

### Manipulation Tactics Analyst
**What it is:** The second helper produces a precise, technical list of every psychological trick and manipulation technique being used in the threatening content — things like manufactured urgency, false authority, or exploiting in-group identity.
**When it helps you:** The third helper uses this list to craft a rebuttal that directly dismantles each tactic.

### Trauma-Informed Final Response
**What it is:** The third helper writes the final response that you actually read — combining the fact-check and the list of manipulation tactics into a message that is both intellectually clear and emotionally safe. It streams to you word-by-word as it is being written.
**When it helps you:** You receive a single, readable, psychologically supportive reply that explains both the facts and the psychology behind the threat.

---

## Detecting Hate Speech and Toxic Language

### Arabic Hate Speech Detector
**What it is:** This analyzes Arabic text for hate speech, content that incites violence, sectarian code words (words that target a religious or ethnic group without using the obvious slur), language that targets women, and manipulation tactics. It returns a toxicity score from 0 (clean) to 1 (highly harmful), a severity rating, a recommendation on whether to report the content, and a suggested counter-message in Arabic.
**When it helps you:** You receive an aggressive message or see a post that feels hateful but you are not sure if it rises to the level of reporting. This gives you a clear score and guidance.

### Emotion Detection Backup
**What it is:** If the main Arabic-aware AI is unavailable, the system falls back to a general emotion detector that identifies the top three emotions in the text (like anger, fear, disgust). This is less powerful but ensures you always get some signal.
**When it helps you:** Even when the main service is busy, you still get some information about the emotional content of the text.

---

## Research Impact Measurement

### Platform Effectiveness Report
**What it is:** A summary for researchers showing — anonymously across all users — how many people have used the platform, what their average MIST-20 (the standard media literacy research test) scores were before and after training, and how large the improvement is (using a measure called Hedges' g — a standard statistical tool that tells you how big an effect really is, like the difference between a small nudge and a major change). It also checks whether the training accidentally made people distrust everything.
**When it helps you:** Funders and researchers can see a real number — "our training improved media literacy by X points" — that justifies continued investment in the platform.

---

## Exercise Content

### Secure Exercise File Server
**What it is:** A secure way for the platform's interactive training exercises to load their content (the questions, scenarios, and drills) from files on the server. It includes a safety check that prevents anyone from tricking the system into reading files from outside the allowed folder.
**When it helps you:** Every cognitive training exercise on the platform loads correctly and securely, whether it is a fallacy drill, a Socratic reasoning practice, or a misinformation spotting game.

---

## Detecting Logical Fallacies in Arguments

### Logical Fallacy Scanner (Full Submission)
**What it is:** You paste an argument or persuasive text and the system checks it against a library of known logical fallacies (reasoning errors — like "appeal to emotion," "strawman," or "slippery slope") using pattern matching. It tells you which fallacies it found, what the pattern is, and how severe each one is.
**When it helps you:** You paste a politician's speech or a product advertisement and discover exactly which flawed reasoning tricks it relies on.

### Logical Fallacy Scanner (Quick Check)
**What it is:** The same scanner but accessible via a quick URL-based check — useful for small widgets that need to test text in real time.
**When it helps you:** A browser tool silently checks the rhetoric of a page you are reading without you needing to submit a form.

### Deep AI Fallacy Breakdown
**What it is:** After the pattern scan, a more powerful AI looks for subtle, sophisticated fallacies that pattern-matching misses — like when an argument quietly shifts its definition mid-way through (called a "motte-and-bailey" fallacy). It gives you a manipulation score, identifies the main rhetorical category, and writes a step-by-step guide in both Arabic and English for how to dismantle the argument using the Truth Sandwich method.
**When it helps you:** You encounter a cleverly written misleading article that passes surface checks. The deep analysis catches the sophisticated tricks and explains them clearly.

---

## Audio Forensics

### Audio Format Identification
**What it is:** The first step in checking any audio file — the system reads the very beginning of the file to identify whether it is MP3, WAV, OGG, FLAC, AAC, or M4A. It reports the format, file size, and technical encoding details.
**When it helps you:** Before deeper analysis begins, the system knows exactly what kind of audio file it is dealing with.

### MP3 Origin Tag Extraction
**What it is:** MP3 files carry hidden information tags (called ID3 tags) that record which program created them — like FFmpeg, Audacity, or Adobe Audition. If those tags have been deliberately removed, that itself is flagged as suspicious — because innocent recordings usually keep their tags.
**When it helps you:** A leaked audio recording is checked: its origin tags show it was processed through multiple editing programs, suggesting it may have been assembled from different clips.

### Audio Consistency Check
**What it is:** The system scans through an MP3 file looking at how the audio quality is encoded across the whole file. If different sections of the audio have inconsistent quality patterns (called VBR — variable bitrate — artifacts), that can indicate the audio was assembled from multiple different recordings.
**When it helps you:** A supposed recording of a public figure saying something controversial shows quality inconsistencies at key moments, suggesting splicing.

### WAV File Technical Inspection
**What it is:** For WAV audio files (a common format for uncompressed audio), the system reads the technical header that describes how the audio was captured — number of audio channels, recording quality (sample rate), and audio depth. Very low quality settings are flagged as potential signs of a secretly recorded phone call.
**When it helps you:** A claimed "leaked phone call recording" shows audio quality settings consistent with a low-quality recorder rather than a broadcast microphone.

### Suspicious Filename Check
**What it is:** Some AI voice-cloning services (like ElevenLabs) leave their name in the file's name when you download audio they generated. This quick check flags filenames that contain known AI-generation keywords.
**When it helps you:** A file named "elevenlabs_output_minister_speech.mp3" is immediately flagged as likely AI-generated before any other analysis runs.

### AI Voice Cloning Detection
**What it is:** A more powerful AI listens to (or analyzes) the audio to detect signs of synthetic voice generation or audio splicing — things that sound slightly unnatural to an AI even if they sound fine to a human ear. This works even for files under 10 megabytes using Google Gemini's multimodal capability.
**When it helps you:** A voice message that sounds like a famous person giving instructions is analyzed for signs that the voice was artificially cloned.

---

## Photo and Video Authenticity Certificates (C2PA)

### C2PA Credential Check
**What it is:** C2PA (Coalition for Content Provenance and Authenticity — a standard created by major tech companies and news organizations to let cameras and editing tools attach a verifiable digital certificate of origin to every photo or video they produce, like a notary stamp for media) credentials are embedded in the file's binary data. This feature scans for those credentials and reports whether they exist, where in the file they are, and how trustworthy they appear.
**When it helps you:** You receive a photo claiming to come from a trusted news agency. The C2PA check confirms whether the camera or organization actually certified this image.

### C2PA Reference Detection in File Metadata
**What it is:** Some files carry a reference to C2PA credentials in their text metadata even if the full embedded certificate is elsewhere. This feature scans the first part of the file for those references and identifies known issuers — companies like Adobe, Truepic, Qualcomm, BBC, and major camera manufacturers.
**When it helps you:** You can see which trusted organization's camera or software produced or certified the image.

### Honest "No Certificate" Response
**What it is:** When a file has no C2PA credentials, instead of shouting "FAKE!", the system honestly reports that absence of a certificate does NOT prove the image was manipulated — most photos simply predate this technology. It also checks for older-style provenance tags (IPTC and XMP — other metadata standards used by news agencies) as secondary evidence.
**When it helps you:** You do not get a false alarm. The platform gives you an honest assessment: "we found no certificate, but that is common and does not mean the image is fake."

---

## Forensic Tools Status Check

### Forensic Backend Health Check
**What it is:** A status check that tests whether the more advanced forensic analysis tools are currently available — including exiftool (a professional metadata reader) and c2patool (a certificate verifier). If the full system is not reachable, it honestly reports "degraded mode" or "fallback mode" so you know what level of analysis is available.
**When it helps you:** Before you submit a file for deep analysis, the platform transparently tells you which tools are working today.

---

## Forensic Image Analysis

### Photo Metadata and Camera Fingerprint
**What it is:** When you upload a photo for investigation, the system reads its hidden technical information (called EXIF data — every digital photo carries an invisible record of the camera that took it, the software that edited it, when it was first captured, and when it was last modified). It flags editing software like Photoshop or GIMP and time gaps between the original capture and the last modification as warning signs of tampering.
**When it helps you:** A photo circulating as "live footage from yesterday" is uploaded and the EXIF data reveals it was captured three years ago and subsequently opened in image-editing software.

### JPEG Compression Pattern Check
**What it is:** JPEG photos (the most common photo format) are compressed every time they are saved. If a photo has been saved multiple times — which often happens when editing is done in stages to hide traces — the system can detect patterns inside the file that indicate it was re-saved more than once. It also flags very heavy compression that could hide editing marks.
**When it helps you:** A photo shared as "the original unedited picture" shows signs of having been saved and re-saved multiple times, suggesting edits were made between saves.

### AI Deepfake Face Detection (Images)
**What it is:** Beyond checking the hidden data, an AI visually examines the photo itself looking for signs that a human face was digitally swapped or generated by an AI — things like inconsistent lighting on skin, unnatural texture, copy-paste seam marks around faces, or warped backgrounds near the edges of a person. It returns a verdict: AUTHENTIC, INCONCLUSIVE, SUSPICIOUS, or LIKELY FAKE.
**When it helps you:** A viral photo of a public figure in a compromising situation is analyzed and the AI spots unnatural skin texture and background warping consistent with AI face-generation.

---

## Image Full Metadata Report

### Full Photo Metadata Inspection
**What it is:** Reads all the hidden information in a photo across four different metadata standards (EXIF, IPTC, XMP, and GPS — think of them as four different filing systems all storing information about the same photo). Returns camera brand, editing software used, original capture date vs. modification date, GPS location, image dimensions, color type, compression level, and journalist attribution fields.
**When it helps you:** A journalist or researcher gets a complete picture of a photo's entire documented history in one report.

### Manipulation Risk Score
**What it is:** The system takes all the metadata signals — missing device information, presence of editing software, suspicious gaps between capture and modification dates — and combines them into a single percentage (0–95%) that represents the risk that the photo was manipulated. It explains in plain words what drove the score.
**When it helps you:** Instead of reading a table of technical data, you see: "67% manipulation risk — the photo lacks device information and was modified with Photoshop 4.5 hours after capture."

---

## Reading Text from Images (OCR)

### Screenshot Claim Extractor and Checker
**What it is:** You upload a photo of a screenshot — for example a WhatsApp message, a tweet, or a headline. The system reads all the text in the image (using a technology called OCR — Optical Character Recognition — which is like teaching a computer to read printed text the way humans do, in both English and Arabic). It then immediately fact-checks that extracted text against real sources.
**When it helps you:** Your friend sends you a screenshot of a "shocking news headline." Instead of sharing it, you upload it here and get an immediate fact-check on whatever it says.

### Strict Truth Standard on Screenshot Text
**What it is:** The text extracted from a screenshot is subjected to the same strict "no guessing" rule as everything else — the system reports how many trustworthy sources were found, what quality they are, and whether the claim is verified or not.
**When it helps you:** Even image-based misinformation — the kind designed to avoid text-based detection — gets the same rigorous treatment as typed text.

---

## Video Forensics

### Video Format Identification
**What it is:** The first step in video analysis — the system reads the beginning of the video file to identify whether it is MP4/MOV, WebM/MKV, or AVI format, and reports its size.
**When it helps you:** The correct analysis tools are selected based on the video format.

### Video Edit History Detection
**What it is:** For MP4 videos, the system reads the internal structure (the "atoms" — building blocks of an MP4 file) to check whether the video's original metadata has been stripped out, and whether the file carries signatures from video editing software like Adobe Premiere, DaVinci Resolve, FFmpeg, CapCut, InShot, or KineMaster.
**When it helps you:** A video circulating as "raw footage" is revealed to have been processed through professional editing software, raising questions about what was edited.

### AI Video Deepfake Detection
**What it is:** The AI examines the video for visual signs of deepfake manipulation — face inconsistencies (like ears that do not match), lip movements that do not match the audio, jumps in time, background distortion around the face, or unnaturally smooth skin texture. This works for videos under 10 megabytes using Google Gemini's video analysis.
**When it helps you:** A viral video of a public official making controversial statements is checked for signs of face-swapping or AI-generated footage.

---

## The God-System Eight-Layer Analysis

### Complete Eight-Layer Analysis
**What it is:** The most thorough analysis the platform offers. It runs eight consecutive checks on any claim: (1) safety screening, (2) emotional manipulation scoring, (3) source evidence pyramid, (4) logical fallacy detection, (5) alternative reasoning frameworks, (6) bilingual Truth Sandwich verdict, (7) a Socratic question to make you think, and (8) a WhatsApp-ready counter-script. All of this comes from one submission.
**When it helps you:** You submit a complex, multi-layered piece of misinformation and receive a complete cognitive defense toolkit in response.

### Input Safety Screening
**What it is:** Before any AI processes your submission, an automatic safety check reads it to make sure it is not a deliberately crafted "injection attack" — an attempt to trick the AI into behaving badly by hiding instructions inside the text you submit.
**When it helps you:** Malicious actors trying to abuse the platform's AI are stopped at the door.

### Emotional Manipulation Score (Layer 2)
**What it is:** The second layer measures how emotionally charged and potentially manipulative a claim is (this score is called EIS — Emotional Intent Score). If the score is very high, the system uses a gentler "calm reveal" mode when showing you the verdict, to avoid adding to the emotional impact.
**When it helps you:** A deeply upsetting claim is presented to you in a way that is psychologically safer — the analysis is cushioned rather than shocking.

### Graceful Failure Handling
**What it is:** If the main AI service is unavailable or takes too long, the system returns a partial result with whatever it was able to compute, rather than showing you an error page. The interface always has something to display.
**When it helps you:** You never see a blank screen or a cryptic error — even when things go wrong behind the scenes, you get a usable response.

---

## Platform Health Dashboard

### System Health Snapshot
**What it is:** A live summary for administrators showing: how many AI "rotation slots" are available (the system uses many AI accounts in rotation to stay online), anonymous usage counters (how many fact-checks were run, how many were verified vs unverified, how many new accounts were created), and the platform's current research headline (total participants, average test scores).
**When it helps you:** The team running the platform can monitor its health and impact at a glance, and notice problems before users do.

---

## Verifying Medical Professionals

### Egyptian Medical Syndicate Lookup
**What it is:** You enter a doctor's name and the system attempts to check it against the Egyptian Medical Syndicate's official register (ems.org.eg) to verify whether that person holds a valid medical license. The system is honest when the official website is unreachable and does not invent results.
**When it helps you:** Someone is giving health advice online and claims to be a licensed Egyptian doctor. You can check whether they are actually registered.

---

## Trending Topics in Egypt

### Egypt Google Trends Live Feed
**What it is:** Fetches the top currently trending search topics in Egypt from Google Trends, updated every five minutes. It shows topic names and approximate popularity.
**When it helps you:** You can see what Egyptians are searching for right now and cross-reference it with viral claims — if a topic is trending, that explains why misinformation about it is spreading.

---

## Evaluating Islamic Scholars

### Islamic Scholar Authority Profile
**What it is:** You provide the name of an Islamic scholar or religious figure and the system produces a profile covering their formal academic qualifications, which institutions they are affiliated with, their scholarly methodology (different recognized schools of thought like Ash'ari, Salafi, or Modernist), their major positions, how aligned they are with mainstream consensus Islamic bodies (Al-Azhar and the Amman Message — two of the most respected mainstream Islamic authorities), and any notable controversies. Results are stored for 24 hours so repeated requests are fast.
**When it helps you:** A viral religious video cites an unfamiliar scholar. You check whether this person is a mainstream authority or a fringe voice.

---

## Understanding Religious Rulings (Fatwas)

### Comparative Fatwa Analysis
**What it is:** You paste the text of a religious ruling or fatwa (an Islamic legal opinion on a specific question) and the system explains it in four ways: a plain summary, how each of the four main Islamic legal schools (Hanafi, Maliki, Shafi'i, Hanbali — the four major traditions of Islamic jurisprudence that represent the main scholarly approaches to Islamic law) approaches the same question, analysis based on the five overarching purposes of Islamic law (Maqasid al-Shariah — the framework Islamic scholars use to evaluate whether a ruling protects life, reason, faith, family, and property), historical background, and whether a major international Islamic body (IIFA — International Islamic Fiqh Academy) has addressed it.
**When it helps you:** Someone presents a ruling as the only possible Islamic position. This shows you the full range of scholarly opinion and stops "only one view" manipulation.

---

## Islamic Finance Compliance

### Shariah Finance Audit
**What it is:** You describe a financial product or investment — a loan, a savings account, a cryptocurrency, a business deal — and the system audits it against Islamic finance rules. It checks for three forbidden elements: Riba (interest or usury — earning money from money rather than real trade or value), Gharar (excessive uncertainty or ambiguity in a contract that makes it unfair), and Maysir (gambling or pure speculation). It follows AAOIFI standards (the Accounting and Auditing Organization for Islamic Financial Institutions — the internationally recognized Islamic finance standard-setting body). It handles modern grey areas like cryptocurrency and staking.
**When it helps you:** You are considering putting money in an investment and want to know if it is halal (permissible under Islamic law) before committing.

---

## Searching Hadith Collections

### Live Hadith Search (Free Database)
**What it is:** Searches the six main collections of hadith (the canonical books that Muslims consider the most reliable records of the Prophet Muhammad's sayings and actions — Bukhari, Muslim, Tirmidhi, Abu Dawud, Ibn Majah, Nasa'i, and Malik's Muwatta) using a free, publicly accessible database. Results include the exact text, the hadith number, and its grade. Results are stored for one hour to keep the service fast.
**When it helps you:** You want to check whether a specific saying attributed to the Prophet actually appears in any of the recognized canonical collections.

### Sunnah.com Premium Search
**What it is:** If the platform has a licensed subscription to Sunnah.com's API (an advanced Islamic resources service), it uses that for richer results including Arabic text alongside translation.
**When it helps you:** Users of institutions that have licensed this API get more detailed results with original Arabic text.

### HadithAPI.com Search
**What it is:** A second backup hadith search provider that covers additional collections and includes narrator attribution (who passed the saying along in the chain of transmission).
**When it helps you:** When the first search finds nothing, this second provider may cover collections the first one missed.

### Built-in Offline Hadith Collection
**What it is:** A hand-curated collection of 13 well-known hadiths from Sahih Bukhari and Sahih Muslim — two of the most authoritative collections — that is built directly into the platform. It uses synonym matching (for example, it knows "rahma" and "mercy" and "compassion" all mean the same thing) so a search never comes back completely empty. This runs when all online databases are unavailable.
**When it helps you:** Even with no internet connection or when all APIs are busy, the hadith search returns something useful and educational.

---

## Prayer Times

### Prayer Time Lookup
**What it is:** For any location (defaulting to Cairo), the platform fetches the five daily Islamic prayer times from AlAdhan.com (a reliable, widely-used prayer time calculation service). It also returns the current date in the Islamic (Hijri) calendar in both Arabic and English. Results are stored for one hour.
**When it helps you:** Any page on the platform can embed accurate, location-specific prayer times and the current Hijri date.

### Qibla Direction
**What it is:** For any GPS coordinates, this returns the exact compass direction to face toward Mecca (Kaaba) for prayer — called the Qibla direction.
**When it helps you:** A user in an unfamiliar location can find the correct prayer direction from the same tool that shows them prayer times.

---

## Quran Reference and Search

### Quran Keyword Search
**What it is:** You search the entire text of the Quran using keywords and the system returns up to ten matching verses — with the chapter name (Surah), verse number (Ayah), and reference. It uses Muhammad Asad's respected English translation. Results are stored for 24 hours.
**When it helps you:** A claim says "the Quran commands X." You search for the relevant keyword and check whether any verse actually says that.

### Specific Verse Retrieval
**What it is:** You request a specific verse using its address (like "2:255" meaning Chapter 2, Verse 255) and receive the exact text in both original Arabic script and English translation.
**When it helps you:** A social media post quotes a Quran verse but you suspect it is taken out of context or misquoted. You retrieve the exact text to compare.

### Full Chapter Retrieval
**What it is:** You request an entire chapter (Surah) of the Quran and receive the complete text in both Arabic and English.
**When it helps you:** A claim cites a verse whose meaning depends on what comes before and after it. You read the whole chapter to understand the full context.

### Classical Commentary Retrieval (Tafsir)
**What it is:** For any specific verse, you can retrieve the classical scholarly commentary (called Tafsir — the detailed explanation and interpretation of Quranic verses written by renowned Islamic scholars). The default is the Tafsir of Ibn Kathir (a 14th-century Islamic scholar whose commentary is one of the most widely trusted in Sunni Islam), alongside the Arabic text and English translation.
**When it helps you:** You encounter a verse being used to justify something that feels wrong. The classical commentary shows you what Islamic scholars across centuries actually understood the verse to mean.

---

# API Features — Slice api-2 (plain-language)

Plain-language guide to every feature in this slice. Every technical word is explained the moment it appears. No background knowledge needed.

---

## /api/islamic/sectarian — Detecting Dangerous Religious Speech

### Sectarian and Takfir Detection
**What it is:** This tool reads Arabic or English text and checks whether it contains "takfir" rhetoric — that is, language that calls other Muslims non-believers or enemies of the faith, which is a warning sign for extremist thinking. It also checks whether the text breaks the Amman Message rules (the Amman Message is a widely accepted international Islamic declaration that says Muslims must not label other Muslims as non-believers just because they follow a different school of thought). The tool then gives a score for how extreme the content is and suggests resources to counter it.

**When it helps you:** A community manager for a mosque Facebook group receives a comment that sounds aggressive toward Shia Muslims. They paste it into this tool and instantly see whether it crosses into extremist territory — and get suggested resources to share with the commenter.

---

## /api/islamic/semantic — Searching the Quran and Hadith by Meaning

### Islamic Semantic Search
**What it is:** Instead of searching for an exact word, this tool lets you search by meaning or topic — like asking "what does Islam say about honesty?" and getting the most relevant Quran verses and hadith (sayings of the Prophet) ranked by how closely they match your question. It uses a service called Kalimat to do this. If Kalimat is unavailable it falls back to its own built-in search, and it saves results for 30 minutes so repeat searches are instant.

**When it helps you:** You want to know what Islam says about protecting the environment. You type the idea and the tool finds the most relevant Quran verses and hadith on that theme, even if the word "environment" does not appear in them.

### NVIDIA NIM Scholarly Synthesis
**What it is:** After the search finds relevant religious texts, this feature calls a powerful AI (NVIDIA NIM — a large language model, like a very knowledgeable assistant) to write a short scholarly explanation in both Arabic and English. The explanation summarises what the texts mean together, warns about common ways people misuse those texts, and gives tips on understanding them correctly.

**When it helps you:** Alongside the raw Quran verses your search returned, you also see a short expert explanation of how those verses relate to your topic and a warning like "this verse is often taken out of context to justify X."

### Token Overlap Scoring Fallback
**What it is:** If the Kalimat search service is unavailable, this backup tool still ranks results in a sensible order. It does this by counting how many words your question shares with each verse or hadith — more shared words means a higher rank. Think of it like a rough word-matching score that keeps results useful even without the main service.

**When it helps you:** The search still works and gives you ordered results even when the platform's main search engine is temporarily down.

---

## /api/islamic/tafsir — Understanding What a Quran Verse Actually Means

### Quran Tafsir Retrieval
**What it is:** "Tafsir" means the scholarly explanation of what a Quran verse means — it is like an official commentary written by Islamic scholars over centuries. This tool fetches that commentary for any specific verse you choose, from an online tafsir library. Results are saved for 24 hours so the page loads fast the second time.

**When it helps you:** You read a Quran verse being shared on social media and you want to know what qualified scholars actually say it means, not just what someone on the internet claims.

### Claim Verification Against Verse
**What it is:** You can also give this tool a specific claim — for example, "This verse proves vaccines are forbidden" — and it will compare that claim to the real meaning of the verse and give you one of four verdicts: ACCURATE, INACCURATE, PARTIALLY_ACCURATE, or OUT_OF_CONTEXT. Think of it like a lie-detector for religious arguments.

**When it helps you:** Someone sends you a message saying a Quran verse forbids a medical treatment. You paste the claim and the verse reference here, and you get a clear verdict on whether the claim matches what the verse actually says.

### NVIDIA NIM Scholarly Context
**What it is:** For every tafsir lookup, the AI also generates rich background information in both Arabic and English. This includes: the reason the verse was revealed (called "Asbab al-Nuzul" — the historical circumstances behind it), whether the verse is Makki or Madani (revealed before or after the Prophet's migration to Medina — an important detail that affects its meaning), what major classical scholars like Ibn Kathir and Al-Tabari said about it, common ways people misuse it, and a short educational note.

**When it helps you:** Instead of just seeing the raw old Arabic commentary, you see a well-organised summary that tells you the verse's history, what scholars agreed on, and a warning if it is commonly misquoted.

---

## /api/kill-list — The Most Dangerous Active False Claims

### Kill-List Claims Retrieval
**What it is:** This is a curated, pre-researched list of the most harmful misinformation claims circulating right now — the ones most likely to cause real harm if left unchallenged. Think of it like a most-wanted list, but for dangerous lies. Fact-checkers and editors use it to know what to prioritise debunking first.

**When it helps you:** A content team opens their moderation dashboard each morning and instantly sees the top 10 most dangerous false claims they need to address today, already ranked and documented.

---

## /api/ledger — Your Personal Deception-Detection Scorecard

### Cognitive Defense Ledger Retrieval
**What it is:** Every time you use the platform to spot manipulation, the system keeps a record. This feature retrieves your complete personal history of those detection exercises. It also calculates your "immunity meters" — a score for each of the 8 types of deception the platform tracks (like fake science, emotional manipulation, religious misuse, etc.). Think of it like a fitness tracker but for your critical thinking skills.

**When it helps you:** You open your personal dashboard and see that you are strong at spotting fake medical claims but weaker at recognising emotionally manipulative language — so you know where to practise more.

### Defense Event Recording
**What it is:** Every time you complete a detection exercise and either catch or miss a manipulation trick, this feature saves that result to your personal record. It then recalculates your immunity scores so your dashboard always reflects your latest performance.

**When it helps you:** After you finish an exercise where you had to spot a fake religious argument, the system records whether you got it right, and your religious-manipulation immunity score goes up or down accordingly.

---

## /api/live-deception/generate — Simulating How Social Media Radicalises People

### Radicalizing Feed Simulation
**What it is:** This tool generates fake social-media posts that slowly become more extreme — simulating the way recommendation algorithms (the software that decides what content you see next) can push people deeper and deeper into conspiracy theories or extremist content without them realising it. The posts are clearly labelled as fake and educational. They are written primarily in Egyptian Arabic.

**When it helps you:** In an educational module, you watch as a fake feed gets gradually more extreme after you "like" certain posts, so you experience firsthand how the rabbit-hole effect works — without being exposed to real harmful content.

### Manipulation Tagging and Brain-Area Targeting
**What it is:** Each generated fake post comes with labels that explain exactly what manipulation trick it is using, which part of the brain it is targeting (for example, the fear response or the tribal loyalty instinct), and which psychological vulnerability it exploits. Think of it like X-ray glasses that let you see the hidden mechanics of manipulation.

**When it helps you:** Instead of just seeing a scary fake post, you also see a note that says "This post is targeting your fear of outsiders and using urgency to bypass your rational thinking." That awareness is the first step to resisting it.

---

## /api/medical/dailymed — Looking Up Official Drug Labels

### DailyMed Drug Label Search
**What it is:** DailyMed is the official US government database of approved drug labels — the official documents that come with medicines describing what they are, what they treat, dosage instructions, and warnings. This tool lets you search that database by drug name and get up to 5 official results, with links to the full label documents. Results are saved for 24 hours.

**When it helps you:** You hear about a new medicine but are not sure what it is officially approved for. You search by name and get the official government-approved description, not a random blog post.

---

## /api/medical/openfda — Looking Up Real Reported Side Effects

### OpenFDA Adverse Event Search
**What it is:** The US FDA (the American government body that approves medicines) collects reports from doctors and patients about unexpected bad reactions to drugs after they are approved. This tool searches that real-world safety database by drug name and returns up to 10 reports of serious reactions, including what the reaction was, the patient's age, and when it was reported. Results are saved for 24 hours.

**When it helps you:** Someone sends you a message saying a popular drug causes a specific side effect. You look it up here and see whether real doctors have actually reported that reaction to the FDA — or whether the claim is exaggerated.

---

## /api/medical/rxnorm — Standardising Medicine Names

### RxNorm Drug Name Normalization
**What it is:** The same medicine can have dozens of different brand names, spellings, or abbreviations. RxNorm is a system that gives every medicine one official standardised ID code (called an RxCUI — think of it as a barcode for drug names). This tool translates whatever name you type into that standard code, so the system can look the drug up consistently across different medical databases.

**When it helps you:** You type "Panadol" and the system quietly converts it to its universal medical code so it can look up the same drug correctly whether another database calls it "Paracetamol" or "Acetaminophen."

---

## /api/medical/who — Looking Up Official World Health Organization Data

### WHO GHO Indicator Search
**What it is:** The World Health Organization (WHO) tracks hundreds of global health statistics — things like child mortality rates, disease prevalence, vaccination coverage, etc. This tool searches that database for indicators (official measurements) matching your search term, or shows you up to 50 available indicators by default. Results are saved for a week.

**When it helps you:** You want to know if there is an official WHO measurement for diabetes rates in a specific region. You search and find the exact indicator name to use.

### WHO GHO Indicator Data Fetch
**What it is:** Once you know which WHO measurement you want, this tool fetches the 100 most recent data points for it — for example, vaccination rates over the last 20 years. This data can be used to draw evidence charts or to contradict false health claims with real WHO numbers.

**When it helps you:** Someone claims that a disease is getting worse globally. You pull the official WHO time-series data and see whether the numbers actually support or contradict that claim.

---

## /api/mist — Testing How Susceptible You Are to Misinformation

### MIST Quiz Scoring and Persistence
**What it is:** The MIST (Misinformation Susceptibility Test) is a scientifically designed quiz that measures how easily you might be fooled by misinformation. After you complete it, this tool scores your answers using the SM-2 algorithm (a method originally designed for flashcard learning that schedules future review sessions at the right intervals to help you improve). It saves your score and your last 100 attempts, then recommends which specific type of deception trick (using the FLICC framework — a classification of common manipulation techniques like False Analogies, Loaded Language, Impossible Expectations, Conspiracy thinking, and Cherry-picking) you should practise identifying most.

**When it helps you:** After taking the quiz, you find out that you are particularly vulnerable to cherry-picked statistics and get pointed directly to exercises that train you to spot that specific trick.

---

## /api/nlp/arabic — Analysing Arabic Text for Hidden Manipulation

### Arabic Text NLP Analysis
**What it is:** NLP stands for Natural Language Processing — it is the technology that lets computers understand and analyse human language. This tool analyses Arabic text up to 10,000 characters long and checks its structure for language-based warning signs (like unusual sentence patterns, loaded words, or structural manipulation). If it finds risk flags, it marks the response so the system can route it for further review.

**When it helps you:** A piece of Arabic content is automatically scanned before being shown to a human reviewer, saving the reviewer time by flagging suspicious text first.

### Egyptian Dialect Manipulation Deep Analysis
**What it is:** On top of the basic language analysis, this feature uses an AI (NVIDIA NIM) to do a much deeper investigation specifically tuned for Egyptian Arabic. It identifies which dialect the text is written in (Egyptian, Gulf, Modern Standard Arabic, etc.), what emotion it is trying to trigger, what specific manipulation tricks it uses (with direct quotes from the text as evidence), what risks it poses in the Egyptian cultural context, how likely it is to go viral, and what the reader should do about it. All of this is given in both Arabic and English.

**When it helps you:** A piece of Egyptian Arabic content is not just flagged as risky — you get a detailed breakdown explaining exactly which Egyptian-specific manipulation patterns it is using and why they are effective on an Egyptian audience.

---

## /api/nlp/sentiment — Measuring the Emotional Weight of a Message

### Bilingual Sentiment Analysis (POST)
**What it is:** Sentiment analysis is the process of measuring the emotional tone of a piece of writing — whether it is positive, negative, or neutral, and how strongly. This tool analyses text up to 2,000 characters and gives you: the overall emotional label, a score for how manipulative the writing is, a score for how much it is designed to go viral, a list of emotional triggers it uses, and a flag if the content suggests a crisis situation. It also creates a small visual badge to display in the interface.

**When it helps you:** Before showing you a message, the platform measures how emotionally charged it is, so you can be prepared and not react impulsively to content deliberately designed to make you angry or afraid.

### Sentiment Analysis via GET
**What it is:** The same sentiment-analysis tool above, but accessible in a simpler way — by adding the text directly to a web address link instead of sending a formal request. This makes it easy for other parts of the platform to quickly check the emotional tone of a piece of text without complex technical setup.

**When it helps you:** Other tools inside the platform can call this automatically in the background to pre-check the emotional intensity of any text before it reaches you.

---

## /api/nvidia/chat — Chatting With Powerful AI Models

### NVIDIA NIM Streaming Chat
**What it is:** This is the engine behind the platform's AI chat feature. It connects to several powerful AI models (like Nemotron, DeepSeek, Gemma, Mistral, and others — these are large language models, meaning very capable AI assistants similar to ChatGPT) and streams their replies to you word-by-word in real time, so you see the answer appearing as it is written rather than waiting for the whole thing. It stops automatically if no answer comes within 25 seconds.

**When it helps you:** You ask an AI a question in the NVIDIA Hub chat and the answer starts appearing on your screen immediately, letter by letter, rather than making you wait.

### Model Allow-Listing
**What it is:** To prevent misuse, only a fixed list of 9 approved AI models can be used through this tool. If someone tries to request a model that is not on that list, the system automatically uses the default safe option (Nemotron-3 Ultra 550B) instead. Think of it like a bouncer at the door — only pre-approved guests get in.

**When it helps you:** The platform stays secure and predictable — no one can accidentally or deliberately route your conversation to an unauthorised or untested AI model.

---

## /api/nvidia/complete — Quick AI Answers Without Streaming

### Non-Streaming NVIDIA Chat Completion
**What it is:** Unlike the streaming chat above, this tool asks an AI a question and waits for the complete answer before returning it all at once — like getting a full letter rather than watching it being typed. It uses the same powerful AI (Nemotron-3 Ultra 550B) but with an 8-second time limit. If that AI is unavailable, it automatically falls back to Google's Gemini 2.0. This is used internally by other platform features that need a clean complete answer, not a live stream.

**When it helps you:** Platform features like the Debate Simulator and Angry Debunker use this behind the scenes to get quick, complete AI-generated responses that they then format and show to you.

---

## /api/nvidia/content-safety — Screening Text for Harmful Content

### NVIDIA Content Safety Scanning
**What it is:** Before any user input or AI-generated text is shown, this tool scans it for harmful content — things like violent speech, self-harm encouragement, or abuse. It is powered by NVIDIA's Nemotron Content Safety model (a specialised AI trained specifically to detect harmful content) and can scan up to 10,000 characters in either "checking what the user wrote" mode or "checking what the AI answered" mode.

**When it helps you:** If you accidentally type something that could be harmful, or if an AI generates an unsafe response, this screen catches it before it causes any harm — like a filter at the door.

---

## /api/nvidia/live-editor — Building Widgets With Plain English

### AI Live Component Generator
**What it is:** This tool lets you describe a visual component (a piece of a webpage, like a chart, a table, or a widget) in plain words, and the AI writes the actual code for it and streams the result live so you see it take shape in real time. The AI only creates safe, self-contained visual code — no hidden scripts, no links to outside websites. It supports Arabic text displayed right-to-left (RTL — since Arabic is read from right to left, websites need special handling for it).

**When it helps you:** You type "show me a chart of the top 10 most common manipulation tricks" or "prayer times widget for Cairo" and a working visual widget appears on your screen in seconds, no coding knowledge required.

---

## /api/nvidia/models — Seeing Which AI Engines Are Available

### NVIDIA Model Registry
**What it is:** This feature returns a list of the 9 AI models available on the platform, with a plain-language description of each one in both Arabic and English, what category it belongs to, how many parameters it has (a parameter is roughly a unit of "knowledge" the AI has learned — more parameters generally means more capable), its display colour and icon, and whether the required access key is currently set up. Think of it as a catalogue page for the available AI engines.

**When it helps you:** When you open the NVIDIA Hub section of the platform, you see a grid of AI models with clear descriptions of what each one is good at, so you can choose the right tool for your question.

---

## /api/paper-auditor — Checking Whether a Scientific Paper Is Reliable

### Scientific Paper Audit
**What it is:** You paste in a research paper's title, abstract (summary), and basic details, and the AI performs a deep critical review of it — similar to what expert peer reviewers do before a paper is published. The review checks: whether the statistics are valid, whether the study followed proper scientific methods (CONSORT and PRISMA are standardised checklists scientists use to make sure studies are reported correctly), whether the authors might have a conflict of interest (COI — meaning a financial or personal stake in the outcome), whether the findings could be reproduced by other scientists, whether the specific claims are accurate, and whether any logical fallacies are present. It also gives an Arabic summary and a note about how the findings apply specifically in Egypt. Finally, it generates a ready-to-use short rebuttal you can share on WhatsApp.

**When it helps you:** A viral post is sharing a study claiming that a herb cures cancer. You paste the study's abstract here and get a plain-language verdict on whether the methodology actually supports that claim.

### CrossRef Paper Metadata Fetch
**What it is:** CrossRef is a large database that stores information about published academic papers. When you paste a DOI (a DOI is a unique ID link for an academic paper — like a barcode for research), this tool automatically fetches the paper's title, authors, journal name, year, and abstract from CrossRef and fills in the audit form for you. This saves you from typing everything manually.

**When it helps you:** You copy a DOI link from a paper someone shared. The form fills itself in automatically and you can start the audit without typing anything.

### API Info and Feature List
**What it is:** If a developer or another tool asks this endpoint what it can do (without providing a paper to audit), it returns a plain description of all its features and how to use them. It is like a "read me" instruction page.

**When it helps you:** A developer building on top of this platform can ask the endpoint to describe itself and get structured documentation back automatically.

---

## /api/safety/alert — Recording Abuse Attempts

### Critical Safety Alert Persistence
**What it is:** Whenever a serious abuse attempt is detected — for example, someone trying to trick the platform into generating harmful content — this feature records the incident server-side with details about what happened and how severe it was. Up to 500 such records are kept in a secure log for supervisors to review. Think of it as a security alarm that both rings and writes down what triggered it.

**When it helps you:** If someone tries to abuse the platform, the event is permanently recorded even if the attempt fails. Supervisors can review the log to identify patterns and improve the platform's defences.

---

## /api/science/briefing — The Science Literacy Intelligence Dashboard

### Scientific Intelligence Briefing
**What it is:** This feature powers a dashboard that shows researchers and educators a curated set of science-literacy intelligence: current warning signals about misleading science (science signals), profiles of which audiences are most at risk from specific false claims (audience risk profiles), a list of trusted scientific sources, a library of red flags (signs a claim is probably false) and green flags (signs a claim is probably trustworthy), and the platform's own Awareness Standard Blueprint. All of this can be filtered by topic or subject area.

**When it helps you:** An educator preparing a media-literacy lesson opens the command centre and filters by "health misinformation" to see all the current warning signals, risky audience profiles, and red/green flags specific to that topic.

---

## /api/science/evidence — Checking the Health of Research Sources

### Module Evidence Overview
**What it is:** The platform uses specific research claims as the backbone of its educational modules (for deepfake detection, mental health, and religious misinformation). This tool shows a status overview for each module: which of the underlying research sources are currently reachable (live) and which are broken or unavailable (failed). Think of it as a health monitor for the platform's evidence backbone.

**When it helps you:** The platform's quality team can see at a glance if any module is currently relying on a source that has gone offline, so they can fix it before users see outdated or missing evidence.

### Evidence Source Directory
**What it is:** A flat, ungrouped list of every single evidence source the platform uses across all modules, with its health status. Instead of viewing sources per module, you see all of them in one place.

**When it helps you:** An administrator wants a complete inventory of every external source the platform relies on so they can audit them all at once.

---

## /api/science/game — Playing the Misinformation Detection Game

### Science Game Payload Retrieval
**What it is:** The platform has an educational game with multiple modes — classic, Egyptian-focused, point-of-view challenges, and immunity-building modes focused on rumours, scams, and TikTok content. When you start a game, this feature loads the full game data for the mode you chose, including all the rounds and their answer options.

**When it helps you:** You open the game section and your chosen game mode loads instantly with all its questions and choices ready to go.

### Game Answer Submission
**What it is:** When you click an answer in the game, this feature processes your choice and returns whether you were correct or not, along with feedback that explains why, and updates the game to the next round.

**When it helps you:** You pick an answer in the game and immediately see whether you were right, with an explanation of why — so every wrong answer is a learning moment.

### Game Reset
**What it is:** When you finish a game and click "Play Again," this feature resets the entire game back to the beginning so you can start fresh.

**When it helps you:** You finished a round of the game and want to play again without refreshing the page.

### AI Challenge Generation
**What it is:** For users who want a harder or more tailored challenge, this feature asks an AI to generate a brand-new quiz question on any topic you choose, at any difficulty level from 1 (easiest) to 5 (hardest). The AI creates a multiple-choice question with a bilingual explanation (Arabic and English), a real-world example, and a note about what concept the question teaches.

**When it helps you:** You have already answered all the pre-built questions in the game. You ask for a custom hard question about climate misinformation and a unique new challenge appears instantly.

---

## /api/science/journey — Your Learning Curriculum Map

### Science Learning Journey
**What it is:** This feature loads the full curriculum map for the platform's science-literacy learning path — which modules exist, which one is currently active for you, and how far through the overall curriculum you have progressed. Think of it like a visual roadmap showing where you are in your learning journey and what comes next.

**When it helps you:** You open the Science Platform landing page and see a clear map showing you have completed the deepfake module and are halfway through the mental health module, with the religion module still ahead.

---

## /api/science/module/[module] — Loading a Specific Learning Module

### Module Payload by ID
**What it is:** Each of the three main science modules (deepfake detection, mental health awareness, and religious misinformation) contains many things: learning steps, rules to remember, myths to debunk, real-world scenarios to practise, manipulation tricks to recognise, and reverse exercises (where you are shown the answer and have to explain why it is correct). This feature loads all of that content for whichever module you open.

**When it helps you:** You click on the mental health module and all its content — steps, myths, scenarios, and exercises — loads immediately.

---

## /api/science/operations — Running Module Sub-Features

### Module Operation Execution
**What it is:** Some module features require running a specific calculation or evaluation in the background — for example, scoring your answer to a scenario exercise. Instead of needing a separate web address for every sub-feature, they all share this one endpoint and just specify by name which operation to run. Think of it like a Swiss Army knife — one tool that does many different jobs depending on what you ask for.

**When it helps you:** Various interactive features within a module work smoothly without the user needing to know or care about how each one connects to the platform's backend.

---

## /api/science/protocol — Fetching and Grading Learning Exercises

### Protocol Definition Retrieval
**What it is:** A "protocol item" is one piece of educational content within a module — for example, one exercise, one rule, one myth to debunk, or one scenario to analyse. This feature fetches the full details of a specific item when you expand it in the interface.

**When it helps you:** You click to expand an exercise in the module and its full instructions and content load instantly.

### Protocol Evaluation
**What it is:** After you complete an exercise and submit your answers, this feature compares your responses to the correct answers and returns graded feedback showing what you got right and what you missed.

**When it helps you:** You finish a scenario exercise and immediately get a personalised breakdown of your answers — what was correct, what was wrong, and why.

---

## /api/science/refresh — Keeping Research Sources Up to Date

### Science Refresh Summary
**What it is:** This feature shows the current synchronisation status of the platform's evidence sources — when were they last updated, and how many are working correctly right now. Think of it like a freshness indicator for the platform's research backbone.

**When it helps you:** A quality manager checks the status panel and sees that all sources were successfully updated three hours ago and 47 out of 48 are healthy.

### Manual Evidence Source Refresh
**What it is:** This feature allows an administrator to manually trigger a fresh update of all evidence sources — re-downloading and re-checking all the research references the platform uses. It records that a refresh was done and returns a report of what was found.

**When it helps you:** An admin notices that some source indicators look stale after a system update. They click "Refresh Sources" and the platform re-checks everything immediately.

---

## /api/science/report — One-Click Platform Health Snapshot

### Combined Science Report
**What it is:** This feature combines the full learning curriculum status and the evidence source health report into a single summary. It shows an overview of how far through all modules all users have progressed, how many research claims the platform is based on, and how many underlying sources are currently live versus broken. It is designed for administrators who need a quick complete health check in one request.

**When it helps you:** An administrator opens the analytics view and with one request sees the complete state of the Science Platform — curriculum health and evidence health — without needing to check multiple places.

---

## /api/science/workflow — Saving Your Progress

### Workflow Store Retrieval
**What it is:** The platform remembers exactly where you left off in each module — which steps you have completed, which items you have selected, and whether you have already seen the introductory guide. When you return, this feature loads all of that saved progress so you can pick up right where you stopped.

**When it helps you:** You close the platform halfway through a module on Monday and come back on Wednesday. Everything is exactly as you left it — your completed steps are still checked off and your place is saved.

### Workflow Item Toggle
**What it is:** Every time you check off a step, select a rule, complete a scenario, or mark any item as done within a module, this feature records that action in your personal save file. Think of it like a checkbox that actually remembers being checked even after you close the page.

**When it helps you:** You check off "I understand the False Authority trick" and even after closing the browser and coming back later, that item is still marked as complete.

### Guide Seen Acknowledgment
**What it is:** The first time you open a module, a welcome guide overlay appears to explain how it works. Once you close it, this feature records that you have seen it so it does not pop up again every time you visit.

**When it helps you:** The welcome guide only appears once — you are never repeatedly interrupted by an intro you have already read.

### Workflow Refresh Trigger
**What it is:** Some modules have a "Refresh" button that logs a timestamp — recording that you requested a refresh at a specific moment — without actually re-downloading all the evidence sources. This is a lightweight logging action rather than a full sync.

**When it helps you:** When you click a module-level refresh button, the platform logs the action so administrators can see patterns in when users request content updates.

---

## /api/search/archive — Finding Historical Versions of Documents

### Internet Archive Search
**What it is:** The Internet Archive (also known as the Wayback Machine) saves snapshots of web pages and documents over time. This tool searches that archive for up to 6 historical items matching your query and returns links to those saved snapshots. Results are saved for 30 minutes. This is part of what researchers call OSINT (Open-Source Intelligence — gathering information from publicly available sources) workflows.

**When it helps you:** Someone claims a news article was published years ago but has since been deleted. You search the archive and find whether the article ever actually existed and what it originally said.

---

## /api/search/claimbuster — Identifying Which Sentences Most Need Fact-Checking

### ClaimBuster Claim-Worthiness Scoring
**What it is:** ClaimBuster is a tool developed by the University of Texas that reads a piece of text and scores each sentence on a scale of 0 to 1 for how much it needs to be fact-checked. A sentence saying "water is wet" scores near 0 (no fact-checking needed). A sentence saying "the government poisoned the water supply in 2022" scores near 1 (definitely needs checking). It sorts sentences into three categories: NFS (Not Fact-checkable — opinions or vague statements), UFS (Unimportant Fact Statement — probably true but minor), and CFS (Check-worthy Fact Statement — should be verified). Results are saved for one hour.

**When it helps you:** You paste a long article into the platform and instead of reading every sentence yourself, you immediately see which specific sentences are making factual claims that need to be verified.

### Local Claim-Worthiness Heuristic Fallback
**What it is:** If the ClaimBuster service is not available or not set up, the platform uses its own built-in scoring rules to rank sentences instead. These rules look for things like: does the sentence contain numbers? Does it use absolute words like "always" or "never"? Does it make a cause-and-effect claim? Does it cite an authority figure? Sentences with more of these features get higher check-worthy scores. Think of it as a simpler hand-crafted substitute that still helps prioritise.

**When it helps you:** Even without any external services configured, you still get a useful ranking of which sentences in a text most need fact-checking.

---

## /api/search/evidence — Searching Multiple Research Databases at Once

### Evidence Aggregator
**What it is:** Instead of searching one academic database at a time, this tool searches five of them simultaneously — OpenAlex, Semantic Scholar, Crossref, EuropePMC, and DOAJ (these are all large databases of peer-reviewed scientific papers). It returns up to 6 of the best results combined, optionally ranked using Cohere reranking (an AI tool that re-orders results by relevance). It prioritises free-access papers and saves results for 30 minutes.

**When it helps you:** You need scientific evidence to verify or debunk a health claim. Instead of searching five websites one by one, you get the best results from all of them in a single search.

---

## /api/search/factcheck — Finding Existing Professional Fact-Checks

### Google Fact Check Tools Search
**What it is:** Before the platform analyses a claim from scratch, it first checks whether professional fact-checkers — organisations like Reuters, AFP, BBC, or Snopes — have already investigated it. Google maintains a database of fact-check verdicts from these organisations (using a standard format called ClaimReview). This tool searches that database and returns existing verdicts, labelling results from top-tier organisations with a "Band A" trust rating. Results are saved for 30 minutes.

**When it helps you:** You paste a claim and instead of waiting for a new AI analysis, you immediately see if Reuters or the BBC have already definitively fact-checked it — saving time and giving you a highly credible answer.

---

## /api/search/mediawiki — Using Wikipedia for Quick Background Checks

### MediaWiki Orientation Search
**What it is:** This tool searches English Wikipedia for up to 6 articles related to your query and returns them as background reference results. It is used only for the orientation stage of verification — getting basic context on who someone is or what something means — not for final verdicts. The platform explicitly labels these results as not suitable for final judgements. Results are saved for 15 minutes.

**When it helps you:** You encounter an unfamiliar name or organisation in a claim. The platform quickly pulls a Wikipedia summary to give you basic orientation about who or what it is, so you understand the context before diving into deeper fact-checking.

---

## /api/search/ncbi — Searching Medical Research Publications

### NCBI PubMed Biomedical Literature Search
**What it is:** PubMed is the world's largest database of peer-reviewed medical and biological research, maintained by the US National Center for Biotechnology Information (NCBI). This tool searches PubMed for up to 6 relevant papers matching your query, returning the title, authors, journal name, type of study, and a direct link to the paper. Results are saved for 30 minutes and are labelled as Band-A trust sources (the highest tier).

**When it helps you:** A claim says a specific supplement cures a disease. You search here and see whether any proper peer-reviewed medical studies actually support or contradict that claim.

---

## /api/search/openalex — Searching Broader Academic Literature

### OpenAlex Scholarly Works Search
**What it is:** OpenAlex is a free, open database of academic papers from all fields of science. This tool searches it for up to 6 papers matching your query and returns each paper's authors, how many times it has been cited by other researchers (more citations generally means more impact), whether it is freely available to read online (open-access), and a link to read it. Results are saved for 30 minutes.

**When it helps you:** You need research on a topic that is not strictly medical — for example, the psychology of misinformation spreading. OpenAlex covers a wider range of academic fields than PubMed does.

---

## /api/search/reverse-image — Tracking Down Where a Photo Really Came From

### Reverse Image Search
**What it is:** When someone shares a photo claiming it shows a recent event, this tool lets you find where that photo has appeared before online — so you can check whether it was actually taken somewhere else, years earlier, or in a completely different context. It uses Google Lens (via a service called SerpApi) to find up to 8 visual matches, showing which websites they appeared on, a similarity score, and a thumbnail of each match. Results are saved for one hour. This is a core OSINT (open-source investigation) tool used to detect manipulated or misused photos.

**When it helps you:** You receive a photo claiming to show a local flood happening right now. You run it through this tool and discover the photo is actually five years old and from a different country — proving the claim is false.

### Reverse Image Fallback Heuristic
**What it is:** If the SerpApi service is not configured, the tool still gives you a useful response — two placeholder results that tell you the service needs to be set up, and a warning that the image may have been reposted across multiple platforms (which is itself a risk signal worth knowing about).

**When it helps you:** Even without full search capabilities, the platform still alerts you that this type of image re-sharing is a common manipulation tactic and reminds you to be cautious.

---

## /api/search/semantic-scholar — Getting Plain-Language Summaries of Academic Papers

### Semantic Scholar Academic Search
**What it is:** Semantic Scholar is an academic search engine built by the Allen Institute for AI. This tool searches it for up to 8 papers and returns not just the titles and links but also AI-generated TLDRs (a TLDR is a very short summary — "Too Long Didn't Read" — a couple of sentences that capture the paper's main finding), how many times the paper has been cited, how many of those citations are from other influential papers, and a link to the free PDF if available. It also assigns a trust band based on how widely cited the paper is. Results are saved for 30 minutes.

**When it helps you:** You find a study that seems relevant but the full paper is dense and technical. The AI-generated summary tells you the key finding in two sentences so you can quickly decide if it is worth reading in full.

---

## /api/search/veracity — Getting a Direct True/False Verdict on a Claim

### Claim Veracity Analysis
**What it is:** This is the platform's direct verdict engine. You submit a claim and it returns a clear judgement: refuted (proven false), supported (evidence backs it up), mixed (some evidence on both sides), or uncertain (not enough evidence to decide). It also gives a confidence percentage and an explanation with a list of supporting evidence. Results are saved for 30 minutes.

**When it helps you:** You paste in a specific claim — for example "Drinking hot water kills coronavirus" — and get back a clear verdict, a confidence score, and an explanation with sources.

### Built-in Veracity Pattern Fallback
**What it is:** Even without any external verification service connected, the platform has a built-in list of the most common viral Egyptian misinformation patterns — things like 5G causing COVID, vaccines causing autism, flat-Earth claims, and miracle cure claims. When a submitted claim matches one of these patterns, it returns a sourced verdict immediately without needing any external service.

**When it helps you:** The most harmful recurring false claims in Egypt are handled instantly and reliably even if all external services are unavailable.

---

## /api/sovo/analyze — The Main Claim-Analysis Engine

### SOVO Nexus Orchestrated Claim Analysis
**What it is:** This is the core engine of the entire platform — the main "analyse a claim" feature. When you submit a claim, it does all of the following in parallel: classifies what kind of claim it is (using a router called COVO — think of it as a traffic director that decides which specialist to send the claim to), searches academic evidence databases, checks existing fact-check verdicts, and searches Islamic hadith databases. It then synthesises all of that into one structured verdict that includes: a "truth sandwich" (a communication technique where you lead with the truth rather than the false claim, to avoid reinforcing the misinformation), a scientific audit, an Islamic authenticity audit, and a cognitive defence analysis. All within one request.

**When it helps you:** You paste any claim — whether it is a fake health story, a misquoted religious text, or a conspiracy theory — and the platform's full investigative apparatus runs in one shot and returns a comprehensive structured verdict.

### Citation Assembly
**What it is:** For every analysis the platform produces, this feature collects all the real sources that were used — the academic papers, fact-check pages, hadith databases — and assembles them into a structured list of citations that appears at the bottom of every result. This directly satisfies the platform's core rule: no claim can reach the user without a real, checkable source. Think of it as the footnotes that prove the analysis is grounded in real evidence.

**When it helps you:** When you see the platform's verdict on a claim, you do not have to trust it blindly — you can scroll down and see every real source that was used to reach that conclusion, with links to check them yourself.

---

## /api/srs — Your Daily Inoculation Booster Cards

### SRS Due Cards Retrieval
**What it is:** SRS stands for Spaced Repetition System — a scientifically proven learning method where you review information at increasing intervals (today, then in 3 days, then in a week, etc.) to lock it into long-term memory. Think of it like a personal trainer that schedules your brain workouts at exactly the right times. This feature returns all the flashcards that are due for your review right now, along with how many total cards you have and how many are due today.

**When it helps you:** You open the platform and your dashboard shows "You have 7 inoculation booster cards to review today" — a manageable daily habit to keep your manipulation-detection skills sharp.

### SM-2 Card Review Submission
**What it is:** After you answer a flashcard, you rate how well you remembered it on a scale from 0 (completely forgot) to 5 (remembered perfectly). This feature runs the SM-2 algorithm (the mathematical formula behind most spaced-repetition apps) to calculate when you should next see that card. It saves the new schedule to your personal record and tells you the exact date of your next review.

**When it helps you:** You struggle to remember a particular manipulation trick, give it a low rating, and the system shows it to you again in just 2 days instead of a week — automatically adapting to help you learn what you find hardest.

---

## /api/whatsapp-analyzer — Checking WhatsApp Messages for Manipulation

### WhatsApp Message Manipulation Analysis
**What it is:** You paste any WhatsApp message you received — a forward, a warning, a health claim, a political message — and the platform analyses it for signs that it was designed to manipulate you. It checks for: bot-generated language patterns (signs the message was written by a program rather than a real person), emotional framing hooks (words and phrases designed to trigger strong emotions), urgency language (claims like "share now or it will be too late"), and other manipulation triggers. It returns an overall manipulation score from 0 to 100 and a clear verdict: SAFE, SUSPICIOUS, or DANGEROUS.

**When it helps you:** Your aunt forwards you a message saying a certain medicine is being recalled and you must stop taking it immediately. You paste it here and see a 78/100 manipulation score and a SUSPICIOUS verdict, with a breakdown of exactly which tricks it used.

### Ready-to-Paste Bilingual Rebuttal
**What it is:** Once the platform identifies a dangerous WhatsApp message, it also writes a short counter-message for you in both Arabic and English that you can copy and paste straight back into the WhatsApp conversation. This rebuttal is designed to be polite, clear, and effective — so you can correct the misinformation in your group without needing to write anything yourself.

**When it helps you:** After identifying that your family group received a dangerous health hoax, you copy the AI-written Arabic rebuttal and paste it into the group chat immediately, correcting the misinformation with a trustworthy response.

### Claim-Level Rating Extraction
**What it is:** Many WhatsApp messages mix several different claims together — some true, some false, some misleading. This feature breaks the message apart into its individual factual claims and gives each one a separate rating: verified (true), false, misleading, or unverified (cannot be determined). Each rating comes with a confidence score and a brief explanation.

**When it helps you:** A message you received makes five different claims. Instead of one overall verdict for the whole message, you see that two claims are false, one is misleading, one is verified, and one cannot be confirmed — so you know exactly which specific parts to be concerned about.

---

# Engines & Libraries — slice lib-1 (plain-language)

This file covers items 1–42 of the platform's behind-the-scenes code (the logic layer, not the screens). Every feature is explained as if you have never heard a technical term before.

---

## AI Agents (the investigation team)

### Agent Profile shape
**What it is:** The platform has several AI "agents" — think of them as specialized investigators on a team. This defines what information describes each one: their name, their job title, what they are good at, and which tools they can use. It is the template that gives every agent its identity.
**When it helps you:** Every time you submit a suspicious claim and the platform sends multiple AI investigators to look at it from different angles, this is what tells each investigator who it is and what its job is.

### Agent Result shape
**What it is:** After one investigator finishes looking at a claim, its findings are packaged into this envelope: what it found, how confident it is (0 = not sure at all, 1 = very sure), and which real sources it used to back up its conclusion.
**When it helps you:** When you get a verdict on a WhatsApp rumor, this is what holds the individual report from each specialist before all reports are combined into the final answer.

### Investigation Report shape
**What it is:** The full final verdict document that wraps up all investigators' findings into one package. It records the original claim, what every agent found, the overall verdict (true/false/misleading/unverified), and which types of deception (out of 8 layers) were detected.
**When it helps you:** This is what the screen shows you after the platform finishes analyzing a piece of misinformation — the complete, combined verdict from all the AI specialists.

---

## AI Agent Profiles (the specialist investigators)

### Source Hunter agent
**What it is:** A pre-built AI investigator whose only job is to find where a claim first appeared — who said it first, and whether real academic databases (like OpenAlex, EuropePMC) or professional fact-checkers (like Snopes, IFCN) have already verified or debunked it. Think of it as the detective who traces a rumor back to Patient Zero.
**When it helps you:** When a scary health claim is spreading on Facebook, this agent is the first one sent out to find the original source — was it a real doctor? A fake news site? A satire piece that got shared out of context?

### Bias Detector agent
**What it is:** A pre-built AI investigator trained to recognize over 180 psychological tricks and logical fallacies (a logical fallacy is a way of arguing that sounds convincing but is actually flawed — like saying "everyone believes it, so it must be true"). It also checks the emotional tone of a claim to see if it is designed to make you panic or angry rather than inform you.
**When it helps you:** Your uncle sends you a voice note that sounds very alarming about a new "government conspiracy." This agent spots the manipulation tricks: fear words, false logic, and us-vs-them framing.

### Arabic Linguist agent
**What it is:** A pre-built AI investigator that specializes in the Egyptian-Arabic dialect. It checks if religious texts (like Quran verses or hadiths — hadiths are recorded sayings attributed to the Prophet Muhammad) are being quoted accurately or distorted. It also detects if something has been mistranslated to change its meaning.
**When it helps you:** A message says "the Prophet said..." and includes a quote. This agent checks whether that quote is real, misquoted, or completely made up — using the same authentication methods Islamic scholars use.

### Timeline Builder agent
**What it is:** A pre-built AI investigator that maps out the life story of a piece of misinformation — when it first appeared, how it spread, whether bots (automated fake accounts) were used to amplify it, and which accounts pushed it hardest.
**When it helps you:** You wonder why a rumor about a political figure exploded overnight across all social platforms. This agent shows you the timeline and whether it looks like an organic spread or a coordinated fake campaign.

### Counter-Narrative Expert agent
**What it is:** A pre-built AI investigator that does not just detect lies — it writes back. It crafts a clear, culturally appropriate rebuttal using proven techniques like the "Truth Sandwich" (lead with the truth, then mention the myth briefly, then reinforce the truth) and inoculation theory (teaching people the trick before they fall for it). It writes in both Arabic and English.
**When it helps you:** After the platform debunks a claim, this agent generates a shareable, respectful counter-message you can actually send back to your family group without causing a fight.

---

## AI Testing (quality checks for the AI tools)

### Reranker reliability tests
**What it is:** Automated checks that run every time a developer changes the code, to make sure the tool that sorts evidence by relevance (the "reranker" — think of it as a librarian who re-shelves your search results so the most useful ones are on top) still works correctly after any change. It checks both the happy path (everything works) and the failure path (what happens when the internet is down or a key is missing).
**When it helps you:** These run invisibly in the background. Their job is to make sure that when you search for evidence, you always get the most relevant results first — and that the system never crashes if something goes wrong.

### Sorted results wrapper tests
**What it is:** A companion set of checks that verify a helper function — the one that takes any list of items and re-orders them by relevance — works correctly and falls back gracefully to the original order if the reranker is unavailable.
**When it helps you:** Same invisible quality assurance: your search results stay useful and the app does not break even if one external service is offline.

### One Law enforcement tests
**What it is:** A set of 10 automated checks that enforce the platform's core rule — "no claim reaches you without a real source." The test verifies that the system correctly accepts sources from trusted tiers (think of tiers like gold, silver, bronze for source quality) and correctly rejects low-quality or unverifiable sources.
**When it helps you:** Every answer the AI gives you has gone through this gate. These tests make sure the gate is always working, so you never receive an AI-generated "fact" that has no real source behind it.

### Structured AI output tests
**What it is:** Checks that verify the AI always returns its answer in the correct shape — with both the text of the answer AND the sources that back it up. If either piece is missing, the check fails and the answer is blocked.
**When it helps you:** Prevents the AI from giving you a confident-sounding answer without citations. The answer must come with proof, or it does not reach you.

### Verdict downgrade tests
**What it is:** Checks that verify a specific safety rule: if the AI produces a verdict (TRUE / FALSE / MISLEADING) but cannot point to a real admissible source, the system automatically downgrades that verdict to "UNVERIFIED" and lowers the confidence score to 20% or below.
**When it helps you:** Stops the platform from presenting a "FALSE" or "TRUE" label as though it is certain, when it is actually just a guess. You always know when a verdict has solid evidence vs. when the evidence is still uncertain.

---

## AI Core Tools

### cohereRerank (relevance sorter)
**What it is:** A tool that sends a list of search results to Cohere (an AI company) and asks it to re-order them by how relevant they are to your actual question — in Arabic or English. It gives up safely after 8 seconds if there is no response, rather than freezing.
**When it helps you:** When you search for evidence on a medical claim, this makes sure the most directly relevant research papers appear at the top of the list, not just the ones that happen to share a keyword with your question.

### rerankBy (easy-use wrapper)
**What it is:** A simpler version of the relevance sorter above that works with any kind of list — evidence, sources, cases — and automatically falls back to the original order if the Cohere service is unavailable. Plug it in anywhere without risk of breaking the app.
**When it helps you:** Improves the quality of every search result list across the platform without any risk of the page crashing if the service is down.

### EAL knowledge base (full)
**What it is:** A 190-line "briefing document" that gets injected into the AI's memory at the start of every chat session. It tells the AI exactly what the Egyptian Awareness Library is, what its three engines do, what research tools it uses, and how it should behave — so it never makes things up about the platform itself.
**When it helps you:** When you ask the chatbot "what does this platform do?" or "how does the debunking tool work?", it answers accurately because it has been given a detailed briefing, not a guess.

### EAL knowledge base (short)
**What it is:** A condensed 10-line version of the same briefing — used in situations where the AI's "memory budget" is tight (every AI model can only hold a certain amount of text in mind at once, like working memory for a person).
**When it helps you:** Makes sure the AI still knows the basics about the platform even in quick-analysis tasks, without using up memory needed for your actual question.

### analyzeMedia (media checker)
**What it is:** Sends an image, video, or audio file to a specialist analysis program that checks for deepfakes (deepfakes are videos or images where someone's face or voice has been digitally swapped or faked using AI), hidden metadata (metadata is invisible data embedded in a file, like a photo's GPS location or the camera model used), and C2PA verification (C2PA is a digital certificate system — like a tamper-evident seal — that proves a photo was taken by a real camera and has not been edited).
**When it helps you:** You receive a viral video claiming to show a public figure saying something shocking. You upload it here and the tool checks whether the face or voice has been manipulated.

### isForensicBackendAvailable (media tool health check)
**What it is:** A quick status check that pings the media analysis service to see if it is running. If it is not running, the platform hides the live analysis option and shows the educational demo mode instead, so nothing breaks.
**When it helps you:** You never see a broken button. The platform automatically shows what is available based on what is actually working at that moment.

### Educational fallback mode
**What it is:** When the media analysis service is offline, instead of showing an error, the platform shows you a detailed explanation of what each type of analysis would normally check — what ELA (Error Level Analysis — a technique that spots areas of an image that were edited by looking for inconsistencies in compression patterns) looks for, what EXIF data is (EXIF is the invisible data recorded inside a photo file, like the date, camera type, and GPS coordinates), how GAN detection works (GAN detection looks for the tiny visual fingerprints left by AI-generated images), etc.
**When it helps you:** Even if the live tool is offline — during a class, a demo, or a presentation — you still learn exactly how to think about media forensics.

### ForensicAnalysisType (analysis menu)
**What it is:** The list of five things the media analysis tool can do: check a video for deepfakes, check an image for deepfakes, analyze audio for manipulation, extract hidden file metadata, and verify digital authenticity certificates (C2PA). Choosing the right one tells the system which specialized checks to run.
**When it helps you:** When you upload a suspicious file, you pick which type of check you want. This ensures the right analysis tool is applied to the right kind of media.

---

## AI Forensic Service

### runForensicAnalysis (main media check dispatcher)
**What it is:** The production-level tool that actually sends your file to the analysis service with proper security credentials. If the service is not connected, it makes a smart preliminary guess: if the filename contains words like "edit", "deepfake", or "viral", it flags the file as more suspicious (41% suspicion) than a neutrally named file (18% suspicion).
**When it helps you:** Even before a full analysis is complete, you get an honest preliminary signal: "this file's name suggests it may have been manipulated" vs. "nothing suspicious about the filename."

### hasForensicBackend (service availability flag)
**What it is:** A simple yes/no check: is the media analysis service connected? The answer controls whether the full live tool is shown or whether the platform switches to educational mode.
**When it helps you:** Makes the platform work sensibly in every situation — full power when the service is connected, informative education mode when it is not.

### Suspicion-hint fallback builder
**What it is:** The logic that examines a file's name and web address for suspicious keywords ("edit", "deepfake", "viral") and assigns a preliminary suspicion score, so users get meaningful guidance even when the full analysis service is offline.
**When it helps you:** If someone sends you a file called "viral_deepfake_expose.mp4" and the analysis service is down, you still get a flag that says this file name is suspicious — rather than a blank or confusing response.

---

## AI Safety Rails (guardrails)

### interpolatePrompt (safe template filler)
**What it is:** When you type a claim into the platform, this tool safely inserts your text into a pre-written analysis template by replacing placeholder slots. It also "escapes" your text — meaning it neutralizes any hidden code you might accidentally paste in, so the system cannot be hijacked.
**When it helps you:** Keeps the analysis system safe when you paste in claims from social media that might contain unusual characters or hidden formatting.

### checkGuardrails (safety pre-check)
**What it is:** Before the AI looks at anything you type, this tool runs three rapid checks: (1) does the message contain anything that could cause harm, like self-harm language? (2) is the person asking the AI to diagnose a medical condition (which it cannot safely do)? (3) is the person asking it to issue a religious ruling called a fatwa (a fatwa is a formal Islamic legal opinion — only a qualified scholar can issue one, not an AI)? If any check triggers, it either redirects to a crisis hotline or explains the boundary.
**When it helps you:** Protects you. If you are in distress and your message contains crisis signals, the platform redirects you to a real hotline rather than just running an AI analysis.

### detectEmotionalTriggers (manipulation word scanner)
**What it is:** Scans any text for words from a list of 30 emotionally charged terms — things that trigger anger, fear, sadness, or disgust — and marks exactly where they appear. These are the words manipulators plant to override your rational thinking.
**When it helps you:** In a fake news exercise, the platform highlights which words in a manipulative message are designed to make you feel afraid or angry, so you can see the manipulation technique in action.

### highlightEmotionalWords (colored highlighting)
**What it is:** Takes the detected emotion words and wraps them in colored highlighting in the display, so you can visually see which parts of a message are emotionally loaded vs. factually substantive.
**When it helps you:** When you paste a viral rumor into the analysis tool, the emotionally manipulative words light up in color — making the trick immediately obvious.

### logMisuseAttempt (abuse tracker)
**What it is:** If someone tries to trick or "jailbreak" the AI (bypass its safety rules) or sends a self-harm message, this tool saves a short, anonymous record of the attempt on the device. No personal identity is sent anywhere — it is only for the platform supervisor to review patterns of misuse.
**When it helps you:** Makes the platform safer for everyone, especially in a school or community setting, by letting supervisors spot if the tool is being abused — without invading anyone's privacy.

---

## AI System Entry Point

### initai stub (placeholder)
**What it is:** An empty doorway module — it exists to mark where the AI system starts, but currently has no real logic. It is like a reserved parking spot.
**When it helps you:** Does nothing for the user right now. It is a technical placeholder that developers use to keep the code organized.

---

## AI Provider Management (backup AI systems)

### getActiveProvider (AI backup switcher)
**What it is:** Checks a priority list of AI services — first Claude (by Anthropic), then OpenAI (ChatGPT's maker), then Llama (open-source AI), then a static backup answer — and uses the first one that is currently working. It also respects your personal preference if you have set one.
**When it helps you:** If one AI service goes down during an important session, the platform automatically switches to the next one without you noticing. The analysis keeps working.

### setPreferredProvider (AI preference setting)
**What it is:** Lets a power user or administrator pin a specific AI service as the preferred one, saving that choice on the device.
**When it helps you:** An administrator can choose to always use a specific AI model for consistency during a research session.

### markProviderUnavailable (failure flag)
**What it is:** When an AI service fails to respond, this marks it as temporarily unavailable so the system stops trying it and moves on to the next option.
**When it helps you:** Speeds up the automatic backup process — rather than waiting for a failing service to time out each time, the system remembers it failed and skips it immediately.

### sendPrompt (AI message sender)
**What it is:** The core function that actually sends your question or claim to the active AI service and returns the answer. If every AI service is down (very unlikely), it returns a pre-written static answer so the platform never shows you a blank screen.
**When it helps you:** Guarantees you always get a response — even on the worst possible day when every AI service is simultaneously unavailable.

### getProviderStatuses (AI health dashboard)
**What it is:** Returns a quick status list showing every configured AI service — its name, the specific model version it uses, and whether it is currently working or not.
**When it helps you:** Administrators can open the health panel and see at a glance which AI services are live and which are offline.

---

## AI Text Generation (the multi-engine rotator)

### nvidiaFirstGenerate (multi-engine text generator)
**What it is:** The main text-generation engine that tries a rotating chain of AI providers — Gemini, Groq, OpenRouter, Cerebras, Together AI, SambaNova, and NVIDIA — one after another until one succeeds. It only gives up if every single option fails. It replaced an older system that relied on one provider and frequently timed out.
**When it helps you:** Every debunking analysis, every AI-generated explanation, and every counter-narrative the platform produces comes through this. The rotation means you almost never wait long for a result, even if a provider is slow.

### nvidiaFirstGenerateJSON (structured text generator)
**What it is:** The same rotating generator, but specifically for tasks where the AI needs to return a structured answer (like a verdict with categories and scores) rather than free-flowing text. It parses and cleans the AI's response into the expected format.
**When it helps you:** When the debunking tool needs a structured verdict — "Layer: Health misinformation, Technique: Fear appeal, Verdict: FALSE" — this ensures the answer arrives in exactly the right shape, not as a wall of text.

---

## AI Output Enforcer (the truth gate)

### enforceOneLaw (source quality filter)
**What it is:** Checks every source the AI cites against a whitelist of trusted tiers — think of it like a quality stamp system where Tier S is gold (peer-reviewed science, WHO, government), down to Tier C (credible journalism), and Tier U (unknown or untrustworthy) gets rejected. It sorts the good sources strongest-first and rejects everything else.
**When it helps you:** Every single AI answer you receive has been through this filter. If the AI could not find a real source to back up its claim, the answer gets flagged as unverified before it reaches you.

### isAdmissible (quick source check)
**What it is:** A simple yes/no question: "Is this source trustworthy enough to use?" Returns "no" for Tier U (untrustworthy), "yes" for Tiers S through C.
**When it helps you:** Used as a quick gate across the whole platform — any time the system needs to decide in a split second whether a source can be cited.

### SourcedAIOutputSchema (AI answer template)
**What it is:** A strict template (using Zod, a validation tool — think of it as a form with required fields) that every AI answer must fill in: the text of the answer, at least one source, and optionally a confidence percentage. If the AI skips any required field, the answer is rejected.
**When it helps you:** Forces the AI to always provide sources. You cannot get an answer without a citation attached to it.

### enforceSourcedOutput (combined answer validator)
**What it is:** Runs both checks at once — does the answer have the right shape (fields filled in), AND do the sources meet the quality standard? Returns a clear "ok" or "fail" result. Used by every AI route before sending a response.
**When it helps you:** A single quality checkpoint that every AI response must pass before it is sent to your screen. Think of it as the final inspection on a production line.

### applyVerdictEnforcement (verdict safety net)
**What it is:** The last line of defense before a verdict label (TRUE / FALSE / MISLEADING) reaches you. If the AI's verdict is backed by a real admissible source, it passes through unchanged. If not, the label is automatically changed to UNVERIFIED and confidence is capped at 20%.
**When it helps you:** You can trust the labels you see. A "FALSE" verdict means there is real evidence behind it. An "UNVERIFIED" label means the evidence was not strong enough — and you can see that difference clearly.

---

## AI Providers (the AI toolbox)

### aiGenerate (six-provider AI chain)
**What it is:** A six-step chain of AI services — NVIDIA NIM, NVIDIA DeepSeek, Gemini, Groq, GitHub AI, HuggingFace — tried in order until one works. It only throws an error if literally every service fails.
**When it helps you:** Powers the chatbot and claim analysis features with maximum uptime. If one AI is slow or down, the next one in line takes over automatically.

### analyzeClaimWithAI (claim analysis engine)
**What it is:** Calls the AI chain with a specialized system prompt that tells the AI to behave as a professional misinformation analyst. It uses the SIFT method (Stop — don't share yet; Investigate the source; Find better coverage; Trace the original context) and always responds in the same language as the claim (Arabic if the claim is in Arabic, English if in English).
**When it helps you:** This is the core "is this true?" function in the DeepReal chatbot. You paste a claim, and this sends it to the AI with all the right instructions to analyze it properly.

### mentalHealthAI (mental health chatbot engine)
**What it is:** Calls the AI chain with a completely different set of instructions — this time as a warm, supportive psychoeducation companion (not a therapist). It uses CBT (Cognitive Behavioral Therapy — a structured way of identifying and changing unhelpful thought patterns) and mindfulness frameworks. It writes in warm Egyptian Arabic and includes real crisis hotline numbers.
**When it helps you:** When you are feeling overwhelmed by news or online toxicity, this chatbot mode offers supportive psychoeducational responses — and if you are in crisis, it gives you real hotline numbers immediately.

### analyzeSentiment (emotional tone detector)
**What it is:** Sends text to a specialized AI model trained on social media posts to classify the emotional tone as positive, negative, or neutral, with a confidence score. Like having someone read the emotional temperature of a piece of text.
**When it helps you:** Used behind the scenes when the platform assesses whether a claim is written in an emotionally manipulative way — adding data to the bias detection analysis.

### translateText (Arabic-English translator)
**What it is:** Uses a specialized translation AI model (Helsinki-NLP, trained specifically for Arabic-English translation) to translate text in both directions. This is separate from general-purpose translation — it is optimized for this language pair.
**When it helps you:** When a claim is in English and you need to analyze it in Arabic (or vice versa), this handles the translation automatically within the platform without sending your text to a third-party app.

---

## AI Evidence Retrieval (RAG — smart search memory)

RAG (Retrieval-Augmented Generation) means the AI looks up relevant stored knowledge before answering — like checking a reference library before responding, instead of relying only on what it memorized during training.

### upsertCase (evidence library updater)
**What it is:** Adds a new piece of knowledge — a verified case, a mental health module, or a religious text — to the platform's searchable knowledge library. It converts the text into a mathematical representation (called an embedding — think of it as a fingerprint made of numbers that captures meaning) and stores it so similar texts can be found later.
**When it helps you:** Every time researchers add new verified evidence, cases, or Islamic texts to the platform's library, this is what stores them so the AI can find them when you ask a question.

### retrieveSimilarCases (smart evidence finder)
**What it is:** Converts your question into that same mathematical fingerprint and searches the library for the closest matches — then re-orders the results by relevance using the Cohere reranker. Falls back to the basic search order if the reranker is unavailable.
**When it helps you:** When you submit a suspicious health claim, this finds the most relevant previously verified cases and research evidence — so the AI's answer is grounded in real, stored knowledge, not a guess.

### EngineNamespace (library sections)
**What it is:** Defines three separate sections of the knowledge library that must never be mixed up: one for misinformation cases (DeepReal), one for mental health modules, and one for Islamic religious texts. Like having three completely separate filing cabinets.
**When it helps you:** Ensures a search about a fake health claim only retrieves health evidence — not religious texts or mental health content by accident.

---

## AI Task Router

### model — task router (right AI for the right job)
**What it is:** A function that returns the best-suited AI model for five specific jobs: deep verification (uses GPT-4o for maximum depth), fast classification (uses Groq's Llama for under 200 milliseconds — nearly instant), text embedding (OpenAI's embedding model), Arabic religious text analysis (Gemini for Arabic), and safety checks (GPT-4o-mini for consistency). Every AI call in the platform uses this to pick the right tool for the task.
**When it helps you:** Makes the platform both fast and accurate — quick tasks use the fastest AI, complex tasks use the most powerful one, safety checks use the most reliable one.

---

## Analytics — Behavioral Change Tracking (COM-B)

COM-B is a scientific framework for understanding behavior change. It says behavior depends on three things: Capability (can the person do it?), Opportunity (do they have the chance?), and Motivation (do they want to?). The platform tracks which of these six areas its exercises target.

### getComBProfile (behavior change map)
**What it is:** Looks at everything a participant has done on the platform and maps it against the six COM-B behavioral segments — showing how well each area has been exercised, how their scores compare, and what percentage of the behavioral framework they have covered.
**When it helps you:** Researchers and supervisors can see whether the platform is building well-rounded critical thinking skills across all six areas, or whether it is accidentally skipping some.

### getComBSummary (behavior change text summary)
**What it is:** Turns the COM-B map into a plain-language paragraph that a researcher or supervisor can read at a glance — no charts or numbers needed.
**When it helps you:** A quick dashboard card that tells a researcher "this participant has strong capability skills but has not worked on motivation-based exercises yet."

### getComBGaps (missing exercise finder)
**What it is:** Returns a list of the COM-B segments the participant has not yet exercised at all — the gaps in their behavioral coverage.
**When it helps you:** The platform can nudge a participant toward types of exercises they have been skipping, so the training covers all six dimensions of behavioral change.

---

## Analytics — Defense Pack (academic export tools)

### collectDefenseData (research data assembler)
**What it is:** Gathers all the data needed for an academic research defense — the current participant's snapshot plus the full cohort (all 84 participants) analytics including hypothesis test results, engine summaries, and source analysis — into one bundle.
**When it helps you:** The day before an academic defense presentation, a researcher clicks one button and gets everything assembled automatically instead of hunting through multiple files.

### exportDefenseCSV (spreadsheet export)
**What it is:** Converts the research bundle into a structured CSV file (CSV is a spreadsheet format that Excel, SPSS, R, and Python can all open) with multiple clearly labeled sections: metadata, participant data, cohort summary, hypothesis results, and source analysis.
**When it helps you:** Researchers can open the CSV directly in SPSS (a statistics program) or Excel on the morning of their defense and have all 84 participants' data ready to present.

### downloadDefensePack (one-click download)
**What it is:** Creates the CSV file and automatically triggers a download to your computer, naming the file with today's date so you always know which version you downloaded.
**When it helps you:** A single click on the admin panel the night before a presentation saves the complete research dataset to your computer.

### exportDefenseJSON (machine-readable export)
**What it is:** The same full research dataset, but saved as JSON (JSON is a structured data format — like a very organized text file — that Python, R, and SPSS can all import directly). Includes notes on which software versions are compatible.
**When it helps you:** A researcher using Python or R for statistical analysis can import this file directly into their analysis script without any manual data entry.

---

## Analytics — Research Export

### generateResearchCSV (full study dataset)
**What it is:** Creates the main research dataset: anonymized records for all participants (no names, just codes) with all 52 measured variables — age group, education, pre- and post-test scores on all six psychometric instruments (standardized tests that measure things like critical thinking and news literacy), trust calibration, engagement time, confidence shifts, and timestamps.
**When it helps you:** The core deliverable of the N=84 study — the file a researcher submits with their thesis or paper as proof of their data.

### generateResearchJSON (JSON version of the study dataset)
**What it is:** The exact same dataset as the CSV but in JSON format, with notes confirming it is compatible with SPSS v28, R, and Python's pandas library (a data analysis toolkit).
**When it helps you:** Researchers who prefer to analyze data in Python or R instead of SPSS can use this format directly without converting anything.

### collectCurrentParticipantData (session data collector)
**What it is:** Reads everything stored in the current user's browser session — progress records, test scores, trust measurements, confidence shifts, and engagement analytics — and packages it up.
**When it helps you:** Called automatically before any data export to make sure the very latest session data is captured, not just data from previous sessions.

### buildCurrentParticipantRecord (complete participant record builder)
**What it is:** Takes the collected session data and fills in any missing fields with safe default values, so the final record is always complete and consistently shaped — even if some exercises were skipped.
**When it helps you:** Ensures no participant record has blank cells in the research dataset, which would cause errors in statistical analysis software.

---

## API Utilities

### apiError (bilingual error message maker)
**What it is:** Whenever something goes wrong with an API call (an API is a connection between two computer systems — like the connection between the platform and an external database), this creates a standardized error message in both Arabic and English, with a code identifying what went wrong and a suggested next step.
**When it helps you:** If you search for evidence and the external database is temporarily down, you see a clear, friendly bilingual message explaining what happened — not a cryptic technical error code.

### ERR presets (ready-made error messages)
**What it is:** Five pre-built error messages covering the most common problems: missing search query, service not configured, external fetch failed, item not found, and invalid data submitted. Each comes in both Egyptian Arabic and English.
**When it helps you:** Makes error messages across the platform consistent, readable, and genuinely helpful — telling you what went wrong and what to do next.

### debounce (anti-spam wait timer)
**What it is:** Delays an action until you have stopped typing for a set amount of time (300 milliseconds — about a third of a second). So instead of firing off a search request for every single letter you type, it waits until you have probably finished typing.
**When it helps you:** When you are searching for evidence or typing a claim in the search box, the platform waits for you to pause before sending the request — preventing you from accidentally flooding the server with hundreds of half-typed searches.

### throttle (action speed limiter)
**What it is:** Like debounce but for repeated actions — ensures a function can only run once per set time window, no matter how many times it is triggered. Used for scroll events and window resize events that could otherwise fire hundreds of times per second.
**When it helps you:** Keeps the platform running smoothly even when you are rapidly scrolling through a long results page.

### withBackoff (smart retry wrapper)
**What it is:** Wraps any external API call with automatic retries. If the call fails, it waits a short time and tries again — and doubles the wait each time (this is called exponential backoff). It also adds a small random delay to avoid all retries hitting a server at exactly the same moment. Default: 3 tries.
**When it helps you:** When external academic databases like Crossref or OpenAlex are temporarily slow or rate-limited (rate limiting means the database only allows a certain number of requests per minute), this quietly retries instead of showing you an error.

### politeFetch (polite API caller)
**What it is:** A special version of the platform's web request tool that includes a required "please be nice to our servers" header identifying the platform by name and contact email — required to access the "polite pool" tier of Crossref (a large academic database). It also automatically respects "Retry-After" instructions from servers that say "wait X seconds before trying again."
**When it helps you:** Ensures the platform stays in the good graces of academic databases so searches for peer-reviewed evidence keep working reliably.

---

## API Search Cache

### withSearchCache (search result memory)
**What it is:** Remembers the result of a search for a set amount of time (TTL = Time To Live — the lifespan of a stored result). If you or someone else searches the exact same thing again within that window, it returns the saved result instantly instead of calling the external database again.
**When it helps you:** Makes repeated searches much faster and reduces how often the platform calls external services. If ten students in a class all search the same claim, only the first search goes out to the internet — the rest get the cached answer immediately.

---

## Audit Tools

### runCertificationAudit (pre-launch quality check)
**What it is:** Runs 26 structured checks across 10 categories before the platform is launched or updated: are all exercises in place? Is the prompt library complete? Are crisis contact numbers present? Is the source registry populated? Are all assessments wired up? Do all the data-collection pieces work together? It returns a pass/fail/warning result for each check, plus an overall "certified" or "not certified" verdict.
**When it helps you:** The researchers and developers run this before any major launch to make sure the platform is ready — like a pre-flight checklist before a plane takes off.

### generateCertificationReport (readable audit report)
**What it is:** Converts the audit results into a clean, formatted text report — organized by category, with clear pass/fail symbols next to each check — that a non-technical supervisor or academic examiner can read and sign off on.
**When it helps you:** The project supervisor can print or screenshot this report and confirm "yes, the system is ready" before the N=84 pilot study begins.

---

## Authentication (login system)

### getCurrentUser (identity verifier)
**What it is:** Checks the login "stamp" stored in your browser (a JWT — JSON Web Token — which is like a digital wristband that proves you have been verified) and returns your identity and role (participant, admin, etc.). Used by every protected page to know who you are.
**When it helps you:** Every time you navigate to a protected part of the platform, this silently checks your wristband to confirm you are allowed to be there — without making you log in again.

### loginUser (login handler)
**What it is:** Checks the email and password you entered against stored credentials (using bcrypt — a secure one-way encryption method, like a lock that can only be opened by the original key, never copied from the lock itself), and if correct, issues you a 24-hour digital wristband (JWT cookie).
**When it helps you:** The standard login process for registered pilot participants.

### registerUser (account creator)
**What it is:** Creates a new account with your profile, securely hashes (scrambles and locks) your password so it can never be read even if the database is accessed, and issues your first login wristband. An optional admin code lets researchers register as administrators.
**When it helps you:** The sign-up process for the 84 pilot study participants and their supervisors.

### loginAsGuest (anonymous access)
**What it is:** Creates a completely anonymous temporary identity (with a random ID, no name, no email — no personal information at all) and issues a session wristband. You can explore the whole platform without creating an account.
**When it helps you:** A teacher can hand a tablet to a student and let them explore the platform's educational content without any account or personal data being collected.

### logoutUser (sign-out)
**What it is:** Deletes your login wristband from the browser, ending your session.
**When it helps you:** The logout button — simple, clean, and complete.

### isAdmin (admin access check)
**What it is:** A quick yes/no check: does the current user have administrator privileges? Used to show or hide the supervisor panel and research data export tools.
**When it helps you:** Regular participants cannot accidentally access the research data or admin controls — the platform checks your role before showing those sections.

### requestPasswordReset / resetPassword (password reset placeholder)
**What it is:** Currently a placeholder — the infrastructure for password reset is written but not yet connected to a real email system. The reset always returns "invalid token" for now.
**When it helps you:** Future feature. The wiring is in place so a real email-based password reset can be activated later without rebuilding from scratch.

---

## Anonymous Passport System (privacy-first identity)

### createPassport (anonymous identity creator)
**What it is:** Creates a completely private user identity — no email, no name, no phone number. It generates a random user ID and a recovery key (like a master key for a lock — lose the key and you lose access, but with the key you can always get back in). Both are stored securely, and a 180-day login wristband (JWT) is issued.
**When it helps you:** Users who want maximum privacy — or who simply do not want to create an account — can still have a persistent identity that saves their progress, without giving the platform any personal information.

### restorePassport (account recovery on a new device)
**What it is:** If you get a new phone or clear your browser, you can recover your anonymous account on the new device by entering your recovery key. The system looks up your key, verifies it (by hashing — a one-way mathematical transformation — and comparing), and restores your session.
**When it helps you:** You used the platform on your home computer and want to continue on your phone. Enter your recovery key on the new device and your progress is restored — no email or password needed.

### signSession / verifySession (wristband signer and checker)
**What it is:** Two paired functions — one creates the 180-day digital wristband (signs it with a secret key using HS256, a secure digital signing method), and the other checks that a wristband is genuine and has not been tampered with.
**When it helps you:** Every page load, the platform silently checks your wristband is genuine before showing you your private data.

### sessionCookieOptions (cookie security settings)
**What it is:** The security settings applied to the login cookie: httpOnly (cannot be accessed by website scripts — prevents theft), secure (only sent over encrypted connections), sameSite (prevents the cookie from being sent to other websites), and a maximum age. These settings are automatically stricter in the live version than in development.
**When it helps you:** Makes it much harder for malicious websites or scripts to steal your session — your login wristband stays safe.

---

## Sign-In Action

### signin server action (server-side login)
**What it is:** The server-side (runs on the server, not in your browser) version of the login process: validates that the email and password are in the correct format (using Zod validation), checks the password against the stored hash, and issues a 7-day login wristband. Currently uses a placeholder user database.
**When it helps you:** The secure login form that keeps password checking on the server — your password never travels further than necessary.

---

## Progress Saving (keeping your work safe)

### bindUserProgress (progress loader on login)
**What it is:** When you log back in, this copies your previously saved progress (exercise history, scores, gamification state) from your personal storage space to the active workspace — so the rest of the app can read it correctly.
**When it helps you:** You log back in after a few days and your 14-day exercise streak, your scores, and your badges are all exactly where you left them.

### unbindUserProgress (progress saver on logout)
**What it is:** When you log out, this saves your current active progress back to your personal storage namespace and clears the active workspace — so the next person who uses the device does not accidentally see your data.
**When it helps you:** On a shared device (like a school tablet), each student's progress stays separate. Logging out is enough to protect your data.

### saveCurrentProgress (progress auto-saver)
**What it is:** Copies all your current progress data to your personal storage namespace. Runs automatically every 60 seconds while you are using the platform.
**When it helps you:** If your browser crashes, you close the tab accidentally, or the internet cuts out, you lose at most 60 seconds of progress — not the whole session.

### initProgressAutoSave (auto-save starter)
**What it is:** Sets up the automatic saving system when you first load the platform — registers both the 60-second recurring save and a "save immediately before closing" trigger.
**When it helps you:** You never have to click "save" manually. The moment the platform loads, it starts protecting your progress automatically.

---

## Cognition Tools (knowledge and critical thinking)

### DOCTOR_TEST checklist (how to verify a doctor)
**What it is:** A bilingual five-point checklist for verifying whether someone claiming to be a doctor is genuine: (1) stated medical specialty, (2) Egyptian Medical Syndicate registration (the official body all licensed Egyptian doctors must register with), (3) hospital or clinic affiliation, (4) published medical research, (5) membership in a professional medical society. Each point tells you exactly what to look for and where.
**When it helps you:** A Facebook post by "Dr. Ahmed" warns you that a medication is dangerous. You use this checklist to quickly verify whether "Dr. Ahmed" is a real licensed doctor — or someone pretending to be one.

### computeCohortEfficacy (study effectiveness calculator)
**What it is:** Takes all participants' before-and-after MIST-20 scores (MIST-20 is a validated 20-question test that measures how well a person can tell real news from fake news — it is widely used in academic research), calculates the average improvement, the standard deviation (how spread out the results are — like checking if everyone improved or just a few people pulled the average up), Cohen's dz (a standardized way to say "how big was the real effect?" — like converting a test score to a meaningful size comparison), a 95% confidence interval (the range of values we are 95% sure contains the true result), and flags a "distrust drift" warning if people got better at rejecting fake news by becoming cynical about all news rather than by genuinely improving their judgment.
**When it helps you:** This is the scientific proof that the platform works — it produces the one sentence a researcher can present: "After using this platform, participants were measurably better at identifying misinformation, not just more cynical."

### loadAllParticipantFiles (study data loader)
**What it is:** Retrieves all 84 participants' assessment data from the server-side storage to feed into the efficacy calculation.
**When it helps you:** Runs automatically before the efficacy report is generated — the researcher does not need to manually gather or upload anything.

### Distrust-drift guard (cynicism detector)
**What it is:** Checks whether the platform's improvements in fake-news rejection came from genuine discernment (people got smarter at evaluating evidence) or from distrust (people started rejecting all news, real or fake, out of cynicism). If cynicism increased significantly, it adds an honest caveat to the headline result.
**When it helps you:** Keeps the research honest. If the platform accidentally made people more suspicious of everything rather than more discerning, the researchers know — and can say so in their paper.

### classifyClaim (claim type identifier)
**What it is:** A two-step claim classifier. First it tries a fast, rule-based check using patterns and linguistic analysis (no AI needed, very quick). If that is not enough, it calls the AI for a more nuanced classification. The result identifies which FLICC manipulation technique (FLICC stands for Fake Experts, Logical Fallacies, Impossible Expectations, Cherry-Picking, Conspiracy — a research-backed taxonomy of manipulation tricks) is being used and which of the 8 deception layers the claim belongs to. Results are stored for 24 hours so the same claim is not re-analyzed unnecessarily.
**When it helps you:** Every claim you submit is automatically sorted into the right category so the platform knows which debunking approach to use — and so exercises teach you about the specific type of manipulation in that claim.

### KV-cached classification (claim memory)
**What it is:** After a claim is classified, the result is stored using a secure fingerprint (SHA-256 hash — a unique code generated from the text, like a fingerprint) so that if the same claim comes in again within 24 hours, the result is returned instantly from memory instead of running the whole analysis again.
**When it helps you:** If the same viral rumor is submitted by multiple users within the same day, everyone after the first gets an instant answer — faster and cheaper for the platform.

### FLICC taxonomy (manipulation technique library)
**What it is:** The complete catalogue of manipulation tricks, organized into five families: Fake Experts (using people with impressive-sounding but irrelevant credentials), Logical Fallacies (arguments that sound valid but are not — about 30 specific types listed here), Impossible Expectations (demanding a standard of proof that can never be met), Cherry-Picking (citing only the evidence that supports one side), and Conspiracy (unfalsifiable "they are hiding the truth" claims). Each entry includes the telltale signs and the best counter-strategy.
**When it helps you:** Powers the exercises, the debunker's explanations, and the educational content. When the platform explains "this message uses cherry-picking," it is drawing from this catalogue.

### SIFT method steps (four-step fact-checking guide)
**What it is:** A simple four-step method for checking any claim: Stop (do not share yet — pause before reacting), Investigate the source (who is making this claim?), Find better coverage (look for other coverage of the same story), Trace the original context (find where the claim originally appeared and what it really meant). Each step includes bilingual prompts and specific actions.
**When it helps you:** Displayed in the claim analysis interface to guide you through how to investigate the claim yourself — not just to receive the platform's verdict, but to understand the process.

### Documentation barrel (developer orientation file)
**What it is:** A comment-only file that tells developers what the six sibling files in this folder do. Has no features for users — purely internal developer documentation.
**When it helps you:** Does not affect user experience. It is an internal map for the development team.

---

## Defense Ledger (your personal track record)

### appendDefense (defense event recorder)
**What it is:** Every time you catch a manipulation tactic — in any part of the platform — this records the event: what surface you were on, which of the 8 deception layers it belonged to, which technique was used, whether you caught it, missed it, or reviewed it after the fact, and your confidence level before and after. Capped at 5000 events per user.
**When it helps you:** Builds your complete personal track record of defensive actions, which powers your Cognitive Immunity Score — a 0-100 score measuring how strong your defenses against misinformation have become.

### getLedger (defense history retriever)
**What it is:** Retrieves your full list of recorded defense events from storage.
**When it helps you:** Used by the immunity dashboard and research analytics to show you how your defenses have grown over time.

### deriveMeters (immunity score calculator)
**What it is:** Takes your full list of defense events and calculates several metrics from them: accuracy rate (what percentage of the time you correctly identified manipulation), coverage of all 8 deception layers (have you practiced defending against all types?), how many days you have been active, your current practice streak, average confidence change, and your final Cognitive Immunity Score (a composite 0-100 number summarizing all of the above).
**When it helps you:** The immunity dashboard — your personal progress tracker. It shows you not just "how many things you did" but "how broadly and accurately you can defend yourself against deception."

---

## MIST-20 Assessment (fake-news detection test)

### scoreMIST (fake-news test scorer)
**What it is:** Scores your 20-answer MIST-20 submission and produces four measures: veracity discernment (on a scale of 0-20, how well can you tell real from fake?), real-news bias (are you too trusting of real news? or too suspicious?), fake-news acceptance (how often did you believe fake news?), and a vulnerability profile showing which types of manipulation you are most susceptible to.
**When it helps you:** Your pre-test score becomes the baseline, and your post-test score is compared to it to measure your personal improvement after using the platform.

### MistSubmission and MistAnswer schemas (test answer validator)
**What it is:** A set of rules (using Zod validation) that check your submitted test answers are in the right format — exactly 20 answers, each in the correct shape, with valid start and finish timestamps.
**When it helps you:** Prevents corrupted or incomplete test submissions from being saved as research data, protecting the integrity of the N=84 study.

---

## Spaced Repetition Learning

### sm2 (memory scheduling algorithm)
**What it is:** A classic learning algorithm called SM-2 (the same algorithm that powers apps like Anki for language learning). It looks at how well you remembered something (on a 0-5 quality scale) and calculates exactly when you should see it again for the most efficient long-term memory formation. Easier items are shown less often; harder ones come back sooner.
**When it helps you:** When you learn a manipulation technique today, the platform schedules a review for the optimal day — maybe tomorrow for something you found hard, maybe in a week for something easy. Over time, the knowledge sticks because you review it at exactly the right moments, not randomly.

---

## Cognitive Bias Detection

### detectCognitiveBiases (bias finder)
**What it is:** A two-level analysis that identifies which psychological biases (natural mental shortcuts that can be exploited) are present in a piece of text. Level 1 uses pattern matching in both English and Arabic, checking for 15 specific biases. Level 2 does a deeper linguistic analysis measuring things like how many absolutist words are used (words like "always", "never", "every"), emotional density, how often authority is invoked, and how much "us vs. them" language appears. Each bias gets a weighted score, and only biases above a 35% confidence threshold are flagged.
**When it helps you:** You read a health claim that feels convincing but you cannot say why. This tool identifies "this uses Authority Bias — it mentions doctors repeatedly without specifying who — and Bandwagon Bias — it implies everyone already believes this."

### Domain weighting (context-aware bias scoring)
**What it is:** An optional setting that tells the bias detector whether a claim is about science, Islam, or both. It then applies extra weight to the bias-detection rules most relevant to that domain — so a scientific claim gets extra scrutiny on evidence keywords, and an Islamic claim gets extra attention on authority and religious language patterns.
**When it helps you:** More accurate results when you are analyzing a religious claim (where authority appeals look different than in a science claim) vs. a medical claim.

### extractLinguisticFeatures (text feature extractor)
**What it is:** The internal engine that measures 12 specific features of any text: emotional tone score, count of absolutist words, emotional word density, number of authority references, number of evidence keywords, ratio of us-vs-them language, how many numbers appear, how many questions, how many exclamation marks, and sentence variety. These 12 numbers feed into all 15 bias-scoring rules.
**When it helps you:** This runs invisibly every time you submit text for bias analysis. It is the "lab work" that the bias-detection diagnosis is based on.

---

## Cognitive Bias Data

### COGNITIVE_BIASES data (15-bias reference library)
**What it is:** The complete catalogue of 15 cognitive biases (natural mental shortcuts that can make us believe false things) the platform can detect and teach. Each bias entry includes: its name, a plain explanation of what it is, how it appears in scientific misinformation, how it appears in Islamic context misinformation, and the method used to detect it. The 15 are: Confirmation Bias, Dunning-Kruger Effect, Anchoring, Availability, Bandwagon, Authority, Backfire Effect, Illusory Correlation, Framing Effect, Sunk Cost, Halo Effect, Normalcy Bias, In-Group Bias, Peak-End Rule, and Mere Exposure Effect.
**When it helps you:** Every time the platform explains "this message exploits confirmation bias," it draws from this catalogue for its explanation, examples, and counter-strategies.

### CognitiveBias / DetectedBias / Domain types (bias data structure)
**What it is:** The technical definitions of the shapes of data used throughout the bias system — what fields a bias object must have, what a detection result looks like, and what domain options are valid. This is purely for code correctness.
**When it helps you:** Invisible to users — ensures the bias detection pipeline never breaks due to mismatched data shapes.

---

## Content Management

### loadCondition (mental health page loader)
**What it is:** Reads a mental health information page (about conditions like depression or anxiety) from a file stored on the server, extracting both the metadata (title, description, sources) and the content body.
**When it helps you:** Every mental health condition page on the platform loads its content from a carefully authored file, not from a database or an AI guess — ensuring the information is reviewed and accurate.

### validateAtom (content quality gate)
**What it is:** Before any new educational content — an exercise, a claim example, a lesson — is published, it must pass three checks: (1) is it in the right format? (2) does it have at least one trusted-tier source? (3) if it cites an Islamic hadith (a saying attributed to the Prophet Muhammad), is the hadith's authenticity grade present and is the hadith not classified as weak or fabricated? All three must pass.
**When it helps you:** Guarantees that every exercise and lesson on the platform is both well-sourced and religiously responsible. No content that cites a fabricated hadith can reach users.

### ContentAtomSchema (content template)
**What it is:** The required template for every piece of content on the platform: it must have a unique ID, a claim in both English and Arabic, at least one source, optionally a deception layer number (1-8), and optionally an Islamic authentication grade for any hadith cited.
**When it helps you:** Enforces quality and completeness for every authored item — no content can be published with a missing translation, missing source, or unchecked Islamic citation.

---

## Database / Storage

### kvStore.get (data reader)
**What it is:** The universal "read from storage" function. In the live platform, it reads from Vercel KV (a fast, reliable cloud key-value store — like a giant, very fast dictionary in the cloud). In development on a local computer, it reads from a regular file on disk. The code is the same either way.
**When it helps you:** Every piece of stored data — your progress, your test scores, your defense ledger, the research data — is read through this. It works identically in development and in production, making the platform reliable.

### kvStore.set (data writer)
**What it is:** The universal "write to storage" function — saves data to Vercel KV in production or to a local file in development.
**When it helps you:** Every time you complete an exercise, submit a test, or the platform saves your progress, this is what actually stores the data safely.

### kvStore.keys (storage index searcher)
**What it is:** Searches storage for all keys matching a pattern — like finding all files whose name starts with "participant_". Used to enumerate all participant records.
**When it helps you:** When the research export tool needs to gather all 84 participants' data, this finds every participant record in storage without needing to know each one's exact name.

---

## Debunking Pipeline

### classifyEgyptianContext (Egyptian context classifier)
**What it is:** Uses AI to sort an incoming claim into one of 23 categories specific to the Egyptian social context — for example: "WhatsApp Family Medical Panic," "Religious/Fatwa Manipulation," "State Rumor," "Pseudoscience Scam." Returns either a successful classification or a "degraded" signal if the AI could not classify it reliably.
**When it helps you:** A rumor about a new food-related cancer cure spreading in Egyptian family WhatsApp groups gets routed to the health-panic debunking path, while a fake fatwa claim gets routed to the religious verification path. The right tools are applied to the right type of claim.

### EGYPTIAN_CONTEXT_VECTORS (23 Egypt-specific categories)
**What it is:** The complete list of 23 misinformation types that are particularly common or particularly dangerous in Egypt's social media landscape — things like WhatsApp family health panics, fake fatwas, state and political rumors, pseudoscience product scams, and more. This is the vocabulary the classifier speaks.
**When it helps you:** Makes the platform's analysis culturally specific and relevant to Egyptian users, rather than generic. A claim about "folk remedies for kidney disease shared in a family group" is recognized as a specific, high-risk Egyptian misinformation pattern.

### NEGATIVE_SCIENCE_CATEGORIES (13 science fraud patterns)
**What it is:** A list of 13 specific ways that scientific-sounding misinformation manipulates its audience: cherry-picking studies, using false authority figures, confusing correlation with causation (just because two things happen together does not mean one caused the other), and 10 other patterns.
**When it helps you:** When the DeepReal engine analyzes a claim that abuses scientific language, it labels which of these 13 patterns is being used — making the deception visible and educational.

### VERBAL_SCIENCE_LAYERS (5 analysis steps)
**What it is:** The five steps the platform uses when doing a "verbal science" analysis of a claim: (1) Emotional Trigger Analysis, (2) Source Provenance Check, (3) Logical Structure Validation, (4) Empirical Evidence Mapping, (5) Incentive and Bias Exposure. These are the labeled stages shown in the debunking interface.
**When it helps you:** When you see the debunking results laid out in five steps, these are the labels. Each step shows you a different angle of why a claim is or is not trustworthy.

### DEFENSE_METHODS (130 Egypt-specific defense playbook entries)
**What it is:** A comprehensive catalogue of 130 specific defense techniques organized into three domains: 44 medical defenses (how to cross-reference with the Egyptian Ministry of Health, how to check a doctor's credentials through the Doctors Syndicate, etc.), 43 digital reality defenses (how to detect AI artifacts in images, how to extract and read EXIF data from photos, how to spot bot networks, etc.), and 43 demographic defenses (how to check population statistics from CAPMAS — Egypt's official statistics agency, how to assess subsidy-related rumors, how to identify sectarian bias in claims, etc.).
**When it helps you:** When the platform recommends "you should verify this through the Doctors Syndicate" or "check the EXIF data on this photo," it is drawing from this playbook. It is the platform's practical guide to defending yourself against Egyptian-context misinformation.

---

# Engines & Libraries — slice lib-2 (plain-language)

A plain-language guide to every feature in this slice. No technical background needed.

---

## Fallacy Definitions — Scientific & Islamic

### Scientific Fallacy List (25 types)
**What it is:** A built-in dictionary of 25 common tricks people use when making bad arguments about science. Each trick has a name (like "Cherry-Picking" — choosing only the facts that support your side and ignoring the rest) and a real-world example of how it looks.
**When it helps you:** When someone sends you a message claiming a food cures cancer "because studies say so," the tool checks whether the argument uses one of these 25 misleading tricks.

### Islamic Fallacy List (25 types)
**What it is:** A matching dictionary of 25 tricks specific to religious arguments — things like taking a religious verse completely out of its original situation to make it say something it never meant, or citing a made-up saying and pretending a respected scholar said it.
**When it helps you:** When you see a viral video where someone uses Islamic verses or hadith (sayings of the Prophet) to justify something extreme, this list helps the platform spot and name the exact trick being used.

### Combined Fallacy List
**What it is:** The 25 scientific tricks and 25 religious tricks are joined into one big list of 50, so the platform can check both types at the same time without having to know in advance whether your question is about science or religion.
**When it helps you:** If you paste a message that mixes health claims with religious language — common in Egyptian social media — the platform can spot tricks from both worlds in a single pass.

---

## Fallacy Detection Engine

### Fast Pattern Matching (Tier 1)
**What it is:** The first and fastest check — the platform instantly scans the text for obvious telltale phrases in both English and Egyptian Arabic that signal a fallacy. Think of it like a spell-checker, but for logical tricks. No internet call needed; it works in a fraction of a second.
**When it helps you:** A WhatsApp forward says "scientists ALWAYS agree that…" — the word pattern "always agree" is a known exaggeration trick, and this check catches it immediately.

### Vocabulary Similarity Check (Tier 2)
**What it is:** A second, smarter check. It measures how many words the suspicious text shares with the description of each known fallacy. Even if the exact phrase is different from usual, similar vocabulary can still reveal the trick. (TF-IDF is just a math method for measuring word overlap — think of it as a "word fingerprint" comparison.)
**When it helps you:** Someone rewords an old trick in a new way. The first check misses it, but this second check notices the vocabulary still sounds like the "Cherry-Picking" fallacy.

### AI Fallback Check (Tier 3)
**What it is:** If the first two checks find nothing and the text is long enough to be suspicious, the platform asks an AI model to read it carefully and name any fallacies it sees. This is the slowest but most thorough check — only used when the faster methods come up empty.
**When it helps you:** Someone writes a cleverly worded argument that doesn't match any known phrase patterns. The AI reads between the lines and identifies it as a "Survivorship Bias" trick.

### Combined Detection — Main Entry Point
**What it is:** The three checks above run one after the other, like three sifting nets. Results from all three are combined, duplicate findings are removed, and the most confident findings are shown first.
**When it helps you:** When you submit a claim to the platform, this is what runs behind the scenes — it is the single "check this for tricks" button that coordinates all three levels of analysis.

---

## AI Provider Rotation System

### Multi-Provider Slot Builder
**What it is:** The platform does not rely on just one AI service. It keeps a ranked list of backup AI providers (Gemini, Groq, OpenRouter, Cerebras, Together, SambaNova, and NVIDIA as a last resort). Think of it like having seven phone numbers for the same person — if one doesn't answer, try the next.
**When it helps you:** If the main AI service is overloaded at 2am, your question still gets answered because the platform automatically switches to the next available service.

### Per-Attempt Timeout with Smart Switching
**What it is:** Each AI provider gets 28 seconds to respond. If it is too slow or returns an error, the platform instantly moves to the next provider. If a provider is having problems, it gets put on a "cooling off" timer so the platform doesn't keep trying it.
**When it helps you:** You are checking a claim during a busy news day when AI services are slow. Instead of waiting forever or seeing an error, the platform switches silently to a backup within 28 seconds.

### Structured Answer Generator
**What it is:** Some features need the AI to return information in a very specific organized format (like a form with exact fields filled in). This function forces the AI to always return answers in that exact shape, no matter which backup provider is used.
**When it helps you:** The fallacy detection feature needs results in a specific format. This ensures the format is always correct regardless of which AI service is being used behind the scenes.

### Plain Text Answer Generator
**What it is:** For features that just need the AI to write a normal paragraph — like a chatbot answering your question in plain language — this function handles that without requiring any special format.
**When it helps you:** You ask the Religion Hub chatbot a question. This function sends it to whichever AI provider is available and returns the natural-language answer.

### Live Streaming Model Selector
**What it is:** When the platform needs to show you an answer word-by-word as it types (streaming), this picks an available AI key specifically set up for that kind of live output.
**When it helps you:** You watch the debunker "think out loud" and type its analysis word by word on screen. This function picks the connection that makes that live streaming possible.

### Deep Analysis Model Selector
**What it is:** For the most complex and thorough analyses, the platform can access NVIDIA's very large 550-billion-parameter AI model (NVIDIA NIM / Nemotron 550B). This function picks an available key for that specific model. (550B means the model has 550 billion learned patterns — it is extremely capable but also slow and expensive.)
**When it helps you:** You submit a complex multi-layered conspiracy theory. The platform uses this extra-powerful model for the deepest possible analysis.

### Safety and Speed Model Selectors
**What it is:** Two specialized shortcut functions — one picks a model trained specifically to detect harmful or unsafe content, and another picks a fast "lite" model for quick low-stakes responses.
**When it helps you:** Before showing you any AI-generated content, the platform runs it through the safety model to filter anything harmful. For a quick dropdown suggestion, the fast model responds in milliseconds.

---

## Content Quality Rulebook

### Scientific Quality Rules (6 rules)
**What it is:** Six strict rules about how scientific evidence must be presented. For example: studies about medical treatments must follow recognized international reporting standards (CONSORT), and statistical results cannot be manipulated by selectively running analyses until a favorable number appears (p-hacking). Any claim that breaks these rules is flagged.
**When it helps you:** A viral post claims "a new study proves…" but the study has no control group and no standard reporting. The platform flags it for breaking the scientific quality rules.

### Islamic Quality Rules (7 rules)
**What it is:** Seven rules based on internationally recognized Islamic scholarly standards — including the Amman Message (which says you cannot call a fellow Muslim an unbeliever without solid scholarly consensus), Al-Azhar's official positions, and Islamic financial ethics. Content that violates these is blocked before it reaches you.
**When it helps you:** An online fatwa (religious ruling) calls people who disagree "infidels." The platform checks it against the Amman Message rule and flags it as a violation.

### AI Ethics Rules (2 rules)
**What it is:** Two rules that apply to every AI-generated response: (1) the AI must not make claims it cannot explain — no "trust me, the algorithm says so"; (2) the AI must not force a connection between Quranic verses and scientific discoveries just because it seems clever (this is called concordism — making the Quran "predict" science in ways scholars have not endorsed).
**When it helps you:** The AI wants to say "the Quran predicted black holes." The concordism rule blocks this from reaching you, because it is not an established scholarly interpretation.

### Content Checker Function
**What it is:** A single function that runs a piece of text through all the applicable rules above and returns one of three verdicts: PASS (all good), FLAG (worth noting but not blocking), or FAIL (blocked). It also lists exactly which rule was violated and why.
**When it helps you:** Before any chatbot answer appears on your screen, this function checks it. If it fails, you see a message explaining the problem instead of the potentially misleading answer.

---

## Input Preparation (Preflight)

### Egyptian Arabic Normalizer
**What it is:** Converts everyday Egyptian street Arabic into formal written Arabic before searching for information. For example, the Egyptian word "عشان" (because) becomes "لأن" — the standard form that academic databases understand.
**When it helps you:** You type a claim in Egyptian dialect slang. Without this step, the search might find nothing because databases use formal Arabic. With it, the search works correctly.

### Crisis Keyword Detector
**What it is:** Before doing anything else, the system scans for words related to suicide, self-harm, or violence. If found, it raises an emergency flag immediately.
**When it helps you:** Someone types "I want to hurt myself" instead of a misinformation question. The platform skips the fact-checking entirely and instead shows crisis helpline information right away.

### URL Input Handler
**What it is:** If you paste a web link instead of text, this detects that it is a link and automatically fetches the article at that address so the content can be checked.
**When it helps you:** You see a suspicious news article online. Instead of copying all the text, you just paste the article's link — the platform reads it for you automatically.

### Master Preparation Function
**What it is:** One function that runs all three steps above in the right order — normalize the language, check for crisis words, handle any links — and packages everything into a neat bundle ready for the main analysis.
**When it helps you:** Every time you submit anything to the fact-checker, this preparation step runs first, invisibly, to make sure the right path is taken (fact-check, crisis help, or article extraction).

---

## Evidence Gathering — Fast Swarm

### OpenAlex Academic Search
**What it is:** Searches OpenAlex — a free global database of academic research papers — and retrieves up to 3 relevant papers. It decodes the paper summaries from a compressed format into readable text.
**When it helps you:** You check a health claim. This worker finds actual peer-reviewed papers related to it within seconds.

### EuropePMC Medical Search
**What it is:** Searches EuropePMC — a specialized database of medical and life-science research — for real, peer-reviewed summaries. It also estimates how trustworthy each result is based on how detailed it is.
**When it helps you:** A claim about a specific drug or disease is checked against actual medical research, not just general science papers.

### Quran Text Verification
**What it is:** Checks whether a claimed Quranic verse actually exists in the Quran, and if so, in which chapter (surah) and verse number (ayah). It searches the actual Quranic text directly.
**When it helps you:** Someone sends you a "Quranic verse" that turns out to be invented. This check finds no match in the real Quran and flags the quote as unverified.

### Hadith Authenticity Checker
**What it is:** Looks up whether a claimed saying of the Prophet (hadith) has been reviewed by classical Islamic scholars. It searches two specialized Islamic databases and returns the scholar-assigned grade: Sahih (sound/authenticated), Hasan (acceptable), Da'if (weak/unreliable), or Mawdu' (fabricated/fake).
**When it helps you:** A viral post claims "the Prophet said…" and you are not sure if it is real. This check looks it up and tells you whether scholars have authenticated it or declared it fabricated.

### Google Fact-Check Search
**What it is:** Searches Google's database of claims that professional fact-checking organizations around the world have already investigated. Returns the fact-checkers' verdict (e.g. "False") and a link to their full investigation.
**When it helps you:** A claim has already been fact-checked by a reputable organization. This tool finds that existing verdict so you don't have to start from scratch.

### Parallel Evidence Runner
**What it is:** Runs all five searches above at exactly the same time (in parallel) instead of one after the other. Each search has an 8-second deadline. Results are collected as they arrive.
**When it helps you:** Instead of waiting 5 × 8 = 40 seconds for five sequential searches, you get all results within 8 seconds because they all run simultaneously.

### Source Trust Scorer
**What it is:** Gives each search result a number from 0 to 100 representing how trustworthy it is. A detailed paper from a top-tier journal scores higher than a bare title from an obscure source, even if both come from the same database.
**When it helps you:** Two search results are shown side by side — one is a real research paper with a full abstract, one is just a title. The scores help you see which deserves more weight.

---

## Evidence Gathering — Domain-Specific Teams

### Medical Research Strike Team
**What it is:** A specialized search team that activates specifically for health and medical claims. It queries two academic databases (OpenAlex and EuropePMC) at the same time and returns the best medical evidence it finds. If it finds nothing at all, it honestly returns a "no evidence found" marker instead of pretending.
**When it helps you:** You submit a claim about a drug or a disease treatment. This team kicks in because the claim is medical — it searches specifically in medical research databases rather than general ones.

### Religious Text Strike Team
**What it is:** A specialized search team for religious claims. It queries the Quran text database to find matching verses. If no match is found, it returns a zero-confidence "nothing found" marker rather than guessing.
**When it helps you:** A claim says "the Quran says…" and references a verse. This team checks whether that verse actually exists in the Quran text.

### Media and OSINT Strike Team
**What it is:** OSINT stands for "Open Source Intelligence" — gathering information from publicly available sources like news websites, social media, and public records. This team activates for claims involving viral images, manipulated videos (deepfakes — fake videos made by AI), or social-media panic. It queries the Google Fact-Check database for any existing professional verdict on the claim.
**When it helps you:** A scary image is going viral on social media claiming to show something alarming. This team checks whether professional fact-checkers have already investigated and debunked it.

### AraBERT Arabic Language Analyzer
**What it is:** AraBERT (developed by the American University of Beirut's AI lab) is a specialized AI model trained to understand Arabic text deeply. When available, this analyzer sends the text to AraBERT to detect manipulation patterns that only show up in Arabic language structure. If the service is unavailable, it honestly reports "unavailable" instead of making something up.
**When it helps you:** An Arabic-language message uses subtle manipulation patterns that are specific to how Arabic sentences are structured. AraBERT detects these patterns that a general English-trained AI would miss.

### Domain Strike Team Orchestrator
**What it is:** The master coordinator that decides which specialized team to call based on what kind of claim is being checked (medical, religious, or media-related), then runs that team alongside the Arabic language analyzer at the same time, and merges all the results into one evidence package.
**When it helps you:** You submit a claim. This function automatically identifies the right team for the job, runs both the topic search and the Arabic analysis simultaneously, and returns a combined result — all without you having to choose anything.

---

## URL Content Extraction

### URL Detector
**What it is:** A simple check that looks at your input and recognizes in an instant whether it is a web address (starting with http:// or https://) or ordinary text.
**When it helps you:** You paste something into the fact-checker. This instantly decides whether to treat it as a link to fetch or as text to analyze directly — routing your input correctly without any extra steps from you.

### Jina Reader Article Fetcher
**What it is:** When a web link is detected, this tool fetches the full content of the article at that address using Jina Reader (a free service that cleanly extracts text from any webpage). It trims the result to 8,000 characters, pulls out the article title, and falls back to the raw URL if the service fails.
**When it helps you:** You paste a news article link into the fact-checker. This automatically fetches and extracts the article text so the platform can analyze what the article actually says — without you having to copy and paste the whole thing.

---

## Deployment Readiness Checklist

### Full Deployment Checklist (17 checks)
**What it is:** A master checklist of 17 specific items the platform must pass before it can be launched to real users. The checks cover five areas: expert sign-offs (medical, religious, psychological specialists must approve their sections), working API connections, data integrity (no corrupted or missing data), accessibility (usable by people with disabilities), and legal/ethics compliance. Each item is marked as blocking (must pass before launch) or non-blocking.
**When it helps you:** The team knows exactly what is left before the platform is safe to launch. Nothing is forgotten or assumed to be "probably fine."

### Deployment Blocker Checker
**What it is:** A function that reads the checklist and returns only the items that (a) are marked as blocking AND (b) have not yet passed. Also returns a simple true/false: is deployment currently blocked?
**When it helps you:** A supervisor asks "can we launch today?" This function answers with a precise list of what still needs to be done — not a vague "not ready," but the exact three items standing in the way.

### Readiness Progress Summary
**What it is:** Counts how many of the 17 checks have passed, how many failed, how many are still in progress, and calculates an overall percentage. Also produces a clear "yes/no" on whether deployment is allowed.
**When it helps you:** A dashboard widget shows "12 of 17 checks passed — 71% ready — Deployment blocked" in a single progress bar — giving everyone on the team a quick visual read on launch readiness.

---

## Evidence Gathering — Deep Aggregator

### OpenAlex Deep Fetcher
**What it is:** A more thorough version of the OpenAlex search that retrieves up to 8 papers and also checks whether each paper is free to read (open access), who wrote it, and which trust band it falls into.
**When it helps you:** You need more than 3 papers to properly evaluate a complex health claim. This fetcher gives you up to 8.

### Semantic Scholar Fetcher
**What it is:** Searches Semantic Scholar — an AI-powered research database — and retrieves short plain-language summaries (TLDRs — "Too Long Didn't Read" summaries) and counts of how many other papers cited each result. More citations generally means more trust.
**When it helps you:** You want a quick plain-language summary of a paper without reading the full thing. Semantic Scholar provides that alongside citation counts.

### Crossref DOI Fetcher
**What it is:** A DOI (Digital Object Identifier) is like a permanent address for a published paper. This fetcher retrieves paper details using DOIs from the Crossref registry, as a backup when the free sources have nothing.
**When it helps you:** A paper is behind a paywall but its metadata (author, journal, year) is still available. This finds that metadata so at least the source can be identified.

### EuropePMC Deep Fetcher
**What it is:** A fuller version of the EuropePMC search that retrieves entire free-to-read papers in biomedical topics, not just summaries.
**When it helps you:** You are investigating a specific medical claim and need the full methodology of a study, not just the abstract (summary).

### DOAJ Open Access Fetcher
**What it is:** Searches the Directory of Open Access Journals — a catalogue of peer-reviewed journals that are completely free to read. Every result here is guaranteed to be freely accessible to anyone.
**When it helps you:** You want to find evidence that anyone, anywhere, can read and verify themselves — no subscription required.

### arXiv Preprint Fetcher
**What it is:** Searches arXiv — a platform where scientists share their latest research before it has been formally reviewed by other scientists (a "preprint" is like a draft). These results are cutting-edge but not yet fully verified. They receive a lower trust rating to reflect this.
**When it helps you:** A brand-new scientific finding is being shared online but hasn't been published in a journal yet. arXiv may have the original research paper, letting you see what scientists actually claimed versus what the media reported.

### CORE Repository Fetcher
**What it is:** Searches CORE — a system that collects free-to-read papers from thousands of university repositories around the world. Often finds papers missed by the other sources.
**When it helps you:** A paper exists but does not appear in the mainstream databases. CORE often finds it in a university's own digital library.

### Seven-Source Evidence Aggregator
**What it is:** Runs all seven fetchers above at the same time, combines the results, prioritizes free-to-read sources first, then uses an AI ranking tool (Cohere reranker — a tool that scores how relevant each result is to your specific question) to sort them by relevance. Returns the best results.
**When it helps you:** You submit a claim and the platform instantly searches seven different academic sources simultaneously, then ranks and filters the results to show you the most relevant, most trustworthy evidence.

---

## Personal Awareness Report

### Report Builder
**What it is:** After you finish the study exercises, this puts together your personal awareness report — figuring out what your strongest skill is, what you need to work on most, and which type of misinformation you are most vulnerable to.
**When it helps you:** You complete the 14-day program and receive a detailed personal report summarizing what you learned and where you should focus next.

### Vulnerability Dimension Scorer
**What it is:** Calculates how vulnerable you are to misinformation in six different areas: health, religion, politics, economy, science, and social media. It produces a spider-chart (a six-sided diagram) showing where your defenses are strong and where they are weak.
**When it helps you:** Your report shows you are very strong at spotting political manipulation but more vulnerable to health misinformation — so you know to be extra careful with medical claims.

### Report Link Encoder/Decoder
**What it is:** Converts your entire personal report into a compact coded text string (like a long password) that can be put in a web link. The link expires after 90 days for privacy. Decoding reverses the process.
**When it helps you:** You click "Share my report" and get a link you can send to your supervisor or save for yourself without your data being stored on a central server.

### Shareable Link Generator
**What it is:** Takes the encoded report and creates a complete web address (URL) you can share — like `website.com/report/ABC123XYZ`.
**When it helps you:** Your supervisor asks for your awareness results. You generate a link and share it in one click.

### Auto-Save Checkpoints
**What it is:** Automatically saves your progress up to 20 times during the session — like a video game that saves your progress automatically so you never lose your work.
**When it helps you:** Your browser crashes halfway through the exercises. When you return, your progress is still there from the last automatic save.

### Print-Ready Report Generator
**What it is:** Produces a polished, printable document (like a certificate) in proper A4 paper size, with your scores, charts, a privacy statement, and sharing information. It supports right-to-left Arabic text layout (RTL — the direction Arabic is written in) as well as English.
**When it helps you:** You want a physical copy of your awareness certificate to show a teacher or employer. You click "Print / Save PDF" and get a professionally formatted bilingual document.

---

## Image Text Extraction (OCR)

### Bilingual Image Text Reader
**What it is:** OCR stands for "Optical Character Recognition" — it is technology that reads text from images like a human reads a printed page. This tool reads both Arabic and English text from screenshots and photos.
**When it helps you:** Someone sends you a screenshot of a news claim. Instead of retyping it all, you upload the image and the platform reads the text out of it automatically so it can be fact-checked.

---

## Celebration Animations

### Confetti Progress Celebration
**What it is:** Triggers a confetti animation on screen when you achieve something — finish an exercise, unlock a badge, or complete a full learning track. Bigger achievements get a bigger celebration.
**When it helps you:** You complete your first exercise and colorful confetti bursts across your screen — a small reward that makes the learning experience feel more fun and encouraging.

---

## Experience Points & Levels

### XP Reward Table
**What it is:** A table defining how many experience points (XP — points you earn for doing things, like in a video game) each action is worth. Finishing an exercise: 100 XP. Verifying a source: 25 XP. Completing the full program: 1,000 XP. These numbers are designed to keep you motivated across 14 days.
**When it helps you:** You know exactly how many points an action is worth before doing it, so you can plan which activities to prioritize.

### 9-Level Progression System
**What it is:** Nine levels from "Novice" (0 XP) all the way to "Master" (12,000 XP), each with its own title and icon. As you earn XP, you climb the levels.
**When it helps you:** Your profile shows your current level title and icon, so you always know how far you have come and how far you have to go.

### 21-Badge Achievement System
**What it is:** Twenty-one special badges you can unlock — seven each for three different skill areas (spotting fake images/videos, mental health awareness, and Islamic misinformation). Each badge has specific requirements to unlock it.
**When it helps you:** You unlock the "Source Verifier" badge after checking five sources. Your profile shows it as a permanent achievement.

### XP Award Function with Cheat Prevention
**What it is:** The function that actually adds XP to your account when you do something. It also checks that you haven't already been awarded XP for the exact same action (preventing accidental double-counting), updates your streak (days in a row you've used the platform), and checks whether you've unlocked any new badges.
**When it helps you:** You complete an exercise, and within milliseconds your XP updates, your streak is maintained, and any newly earned badges appear — all consistently and without errors.

### Community Stats Display
**What it is:** Shows you anonymized statistics about other learners — like average completion rate and the top streak among all participants. When real data from many users isn't available yet, it honestly says this is a sample figure, not a real count.
**When it helps you:** You see "17 other participants are active this week" on the homepage — a gentle social nudge to keep going, similar to seeing a "currently reading" count on a reading app.

### Level Progress Calculator
**What it is:** Calculates what percentage of the way you are toward the next level, so a progress bar can show your exact progress.
**When it helps you:** A progress bar on your dashboard shows "67% to next level" — so you know roughly how many more exercises to do before leveling up.

---

## Arabic Language Safety Gate

### Arabic Translation Validation Registry
**What it is:** A record of six psychological measurement questionnaires (tools used to measure things like media literacy or mental health) and whether their Arabic translations have been properly scientifically validated for use with Arabic speakers. A questionnaire translated without proper validation could give misleading results.
**When it helps you:** The platform only shows Arabic versions of questionnaires that have been properly validated for Arabic speakers — protecting the accuracy of the research.

### Arabic Safety Checker
**What it is:** A simple yes/no check: has this specific questionnaire been approved for use in Arabic? If not, the English version is shown instead.
**When it helps you:** An Arabic-speaking participant opens a questionnaire. If the Arabic version hasn't been validated yet, the English version appears automatically rather than giving them a potentially inaccurate Arabic translation.

### Language Selector for Questionnaires
**What it is:** Decides which language to show a questionnaire in, respecting both the participant's preference and the validation check above. If you want Arabic but the Arabic translation isn't validated, the system explains this and shows English.
**When it helps you:** You prefer Arabic but the specific questionnaire only has a validated English version. The system explains this and shows the English version rather than an unreliable Arabic one.

### Validation Badge Generator
**What it is:** Creates a colored label showing the Arabic validation status of each questionnaire: green "AR ✓ Full" (fully validated), yellow "AR ✓ Back-Trans" (partially validated — only checked by translating back to English to verify accuracy), or red "AR ⚠ Pending" (not yet validated).
**When it helps you:** Supervisors see at a glance which questionnaires are safe to use in Arabic and which still need validation work.

---

## Key-Value Storage Initializer

### KV Subsystem Startup
**What it is:** A simple startup note that runs when the platform's key-value storage system (a fast data store used for things like rate limiting and counters) starts up. KV storage works like a very fast dictionary — you give it a word, it gives you a number back.
**When it helps you:** This runs automatically in the background. You will never interact with it directly — it just makes sure the storage system is ready.

---

## Request Rate Limiter

### Three-Rule Speed Limit Config
**What it is:** Rules that limit how many requests you can make in a time window — like a speed limit for the platform. The chatbot allows 8 questions per minute; the fact-checker allows 4 per hour; the media literacy test allows 1 per day. Crisis support has no limit — ever.
**When it helps you:** Prevents someone from flooding the system with automated spam. Regular users will never hit these limits. Crisis users are never blocked, no matter what.

### Dual-Mode Rate Limit Enforcer
**What it is:** The rules above are enforced by this system. When running on the live website, it uses a proper database (Upstash KV — a fast cloud storage service) to track requests. When running locally for development, it uses the computer's own memory. If anything goes wrong, it defaults to allowing requests rather than blocking them.
**When it helps you:** Whether the platform is in test mode or live, the rate limits work correctly. And if there is a technical problem with the rate-limit system, users are not accidentally blocked.

---

## Arabic Language Analysis

### Egyptian Dialect Detector
**What it is:** Identifies whether text is written in Egyptian colloquial Arabic, formal Modern Standard Arabic (MSA — the Arabic used in news and books), or a mix of both. It does this by counting how many dialect-specific words appear.
**When it helps you:** When you type in Egyptian dialect, the platform recognizes this and responds in a matching style rather than giving you stiff, formal Arabic back.

### Arabic Sentiment and Entity Analyzer
**What it is:** Reads Arabic text and determines: (1) what emotion it expresses (positive, negative, or neutral); (2) what risk factors it contains; (3) which emotion-triggering words it uses; (4) what names or places it mentions. It tries to use a specialized Arabic AI tool (CAMeL Tools — a research-grade Arabic language processing system) but has a simpler backup if that tool is unavailable.
**When it helps you:** You paste an Arabic WhatsApp message. The system identifies that it has a strongly negative tone and mentions fear-triggering words, helping flag it as emotionally manipulative content.

### Arabic Crisis Phrase Detector
**What it is:** Scans Arabic text for specific phrases associated with suicidal thoughts or self-harm. If found, it raises an alert.
**When it helps you:** Someone types a message in Arabic that hints at self-harm. This detector catches it and redirects them to crisis support before any fact-checking happens.

---

## English Sentiment & Manipulation Analysis

### VADER Sentiment Analyzer
**What it is:** VADER is a well-known English-language sentiment scoring tool. It reads English text and gives it four scores: how positive it is, how negative it is, how neutral it is, and a combined score. Think of it as a mood-meter for text.
**When it helps you:** An English-language headline is analyzed and scores very negative — an early warning sign that it might be designed to trigger fear or outrage.

### Manipulation Score Calculator
**What it is:** Takes the sentiment score, counts words that trigger strong emotions (fear, anger, urgency), and counts persuasion patterns (loaded language, false urgency, appeals to authority). Combines them into a single manipulation score from 0 to 100.
**When it helps you:** The fact-checker shows a manipulation score of 82 on a viral health message. Even before you know whether the claim is true or false, you can see it is highly emotionally manipulative — a reason to be careful.

### Readability Checker
**What it is:** Measures how easy or hard a piece of text is to read, using the Flesch-Kincaid formula (a standard tool used in education — it counts words per sentence and syllables per word to give a grade-level score).
**When it helps you:** A health warning is written at a university reading level (very difficult) — often a sign that it is intentionally confusing rather than trying to inform. The platform flags this.

### Crisis Text Classifier
**What it is:** A small AI model trained on examples of crisis text and non-crisis text. It reads new text and says whether it sounds like someone in crisis, and how confident that judgment is. It also recognizes indirect ways people sometimes express distress (like saying "I'm so tired of everything" without explicitly mentioning self-harm). Works instantly with no internet connection.
**When it helps you:** A user types something that sounds like masked distress. This classifier recognizes it even without explicit crisis words and triggers the crisis support pathway.

### Named Entity and Emotional Word Extractor
**What it is:** Identifies which specific words in a text are emotionally loaded (words that carry strong feelings) and which are names of people, places, or organizations. Uses a language processing tool called Wink NLP.
**When it helps you:** The debunker highlights specific words in red on your screen — showing you exactly which words made the manipulation score high and why.

### Sentiment Color Badge Generator
**What it is:** Converts the full sentiment analysis result into a single color-coded label for quick reading: red "Crisis-sensitive," orange "High emotional load," yellow "Moderate," green "Hope-bait" (false positivity), or blue "Low." Think of it as a traffic light for emotional manipulation.
**When it helps you:** Every analyzed claim in the platform gets one of these colored badges — so at a glance you can see how emotionally charged a piece of content is.

---

## Usage Counting (Observability)

### Privacy-First Event Counter
**What it is:** Counts how many times certain things happen on the platform — like "the fact-checker was used" or "a crisis was detected" — but records only the count, never the actual content of what anyone typed. Like a tally sheet that counts votes without reading the ballots.
**When it helps you:** The team can see that the crisis detector fired 12 times this week without ever knowing what any individual user typed — privacy is fully protected.

### Count Reader
**What it is:** Reads back all those event counts for the monitoring dashboard.
**When it helps you:** The supervisor can see "fact-checker used 340 times this week" as a number on a dashboard, confirming the platform is being used without seeing anyone's private content.

---

## Emotional Routing

### Emotional Intensity Scorer
**What it is:** Quickly measures how much fear, guilt, or superiority language is packed into a message, on a scale from 0 to 1. (EIS stands for "Emotional Intent Score" — a quick measure of how emotionally manipulative a message seems.)
**When it helps you:** A message full of "You will go to hell if you don't…" language scores very high. This quick score is used to decide how to handle the message before the full analysis begins.

### Route Decider
**What it is:** If the emotional score is above 0.7 (very high manipulation), the message is sent to a gentler, calming analysis display. If the score is lower, it goes to the full technical fact-checking pipeline.
**When it helps you:** You paste an emotionally charged religious threat. Instead of bombarding you with academic citations, the platform first gently unpacks the emotional manipulation tactics being used — a more human approach.

### Combined Emotional Analysis Entry Point
**What it is:** One function that calculates the emotional score, breaks down which emotions are dominant (fear? guilt? superiority?), decides the route, and flags whether this is a high-manipulation message — all in one step.
**When it helps you:** Before the platform processes your submission, this runs first to choose the most appropriate way to present the analysis to you.

---

## Web Page Content Cleaner

### HTML to Clean Text Converter
**What it is:** When the platform fetches a web article, it arrives as messy HTML code (the code that web browsers use to display pages). This tool strips out all the website formatting, buttons, ads, and navigation menus, leaving only the actual article text — and limits it to 8,000 characters so it fits within the AI's reading capacity.
**When it helps you:** You submit a news article URL. Without this cleaning step, the AI would be confused by hundreds of lines of website code. With it, the AI receives only the clean article text.

---

## Free Web Search

### DuckDuckGo Lateral Search
**What it is:** Performs a free web search using DuckDuckGo (a privacy-respecting search engine) without needing a paid API key. "Lateral reading" is the practice fact-checkers use of opening multiple other websites to cross-check a claim, rather than reading the original source more carefully.
**When it helps you:** The platform checks a claim by searching the broader web to see what other sources say about it — just like a good fact-checker would do by searching around rather than just reading the one article.

---

## Lesson Quality Validators

### ADDIE Lesson Design Checker
**What it is:** ADDIE is a five-step framework educators use to design good lessons: Analyze (understand the learners), Design (plan the lesson), Develop (create the materials), Implement (deliver the lesson), Evaluate (check it worked — at least 80% quality required). This checker confirms all five steps were properly completed before a new lesson goes live.
**When it helps you:** Before a new exercise module is published, this check ensures the lesson was actually designed properly and not just thrown together.

### SAM Rapid Iteration Checker
**What it is:** SAM is a faster, more flexible lesson design approach that works in quick cycles: build a prototype, collect feedback, improve, repeat. This checker confirms that a prototype was actually built and tested — not just planned — before the lesson is considered ready.
**When it helps you:** Ensures that exercise improvements are based on real user testing, not just guesswork.

---

## Evidence Verification Pipeline

### Full Claim Verification Runner
**What it is:** The platform's main evidence-gathering function. When you submit a claim, this runs two types of searches in parallel: academic databases (for scholarly evidence) and the web (for news and fact-checker coverage). All results are combined, ranked by relevance using an AI reranker, and then checked against the platform's "One Law" — the rule that no answer can be shown without a real, verifiable source attached to it.
**When it helps you:** Every response the chatbots give you has been through this pipeline — meaning it is backed by actual retrieved sources, not just the AI making things up.

---

## Learning Progress Tracking

### Exercise Completion Recorder
**What it is:** Saves a detailed record every time you finish an exercise: your score, how long it took, how confident you felt before and after, and what behavior-change goal the exercise targeted. (COM-B is a psychology model for understanding what drives behavior — Capability, Opportunity, Motivation, Behavior.)
**When it helps you:** Your learning record is available for you and the researcher to review — showing your exact progress exercise by exercise.

### Assessment Result Recorder
**What it is:** Saves your scores from the psychological questionnaires (like MIST-20 — a 20-question test for media literacy, MHLS — a mental health literacy scale, and GHSQ — a scale measuring willingness to seek help) at the start and end of the study so changes can be measured.
**When it helps you:** Researchers can see whether your ability to spot misinformation genuinely improved from the start to the end of the program.

### Trust Calibration Recorder
**What it is:** Saves your scores from a battery of trust-measurement questionnaires taken at multiple points during the study. "Trust calibration" refers to how accurately you assess what sources deserve trust.
**When it helps you:** Researchers measure whether the program improved your ability to judge sources fairly — not being too gullible or too cynical.

### Source Click and Prompt Usage Trackers
**What it is:** Records every time you actually open a source link or use a pre-built analysis prompt — not just whether you saw them, but whether you engaged with them.
**When it helps you:** This is one of the key measurements in the study — did participants actually verify sources, or just skim past them? Your genuine engagement is recorded honestly.

### Verification Behavior Logger
**What it is:** Records the depth of your fact-checking behavior — how many of the eight verification steps you completed, whether you engaged with critical thinking prompts, and whether you skipped any friction moments.
**When it helps you:** Researchers measure not just whether you got answers right, but whether you went through a thoughtful verification process to get there.

### Data Export (CSV and JSON)
**What it is:** Packages all your recorded data — exercises, assessments, trust scores, source clicks, verification steps — into a downloadable file in either CSV format (a spreadsheet) or JSON format (a structured data file). CSV and JSON are standard file formats that can be opened in Excel or any statistics program.
**When it helps you:** At the end of the study, the supervisor can download your anonymized data for statistical analysis.

### Belief Correction Ledger
**What it is:** Records specific moments when you updated a belief you held — storing both what you believed before and what you now believe after seeing the evidence. Saves up to 25 of these moments.
**When it helps you:** Researchers can study the specific moments when the program changed someone's mind — valuable qualitative data about how belief change actually happens.

---

## 14-Day Content Drip System

### Day Unlock Gate
**What it is:** Originally designed to release one day's worth of content every 24 hours (like a daily unlock in a learning app). For the current pilot, all 14 days are unlocked immediately so evaluators can review everything. The time-gate will be restored for the final version.
**When it helps you:** Pilot testers and evaluators can access all exercises immediately. Normal participants in the final version will have content released day by day.

### Day Completion Marker
**What it is:** Records a timestamp (exact date and time) when you complete a day's content. This also sets your start date on the first day you use the platform.
**When it helps you:** The system knows which days you have completed, so it can calculate your streak and — once time-gating is restored — unlock the next day for you.

### 14-Day Progress Status Reader
**What it is:** Returns a list of all 14 days with the status of each: unlocked or locked, completed or not, and when it was completed. This powers the visual curriculum map on your dashboard.
**When it helps you:** You see a row of 14 circles on your dashboard — green for completed days, gray for future days, bright for today. This tells you exactly where you are in the program.

---

## Prompt Template System

### Variable Substitution
**What it is:** The platform has pre-written question templates with blank spaces (like "Explain the word {term} in simple language"). This fills in the blanks with your actual inputs before sending the question to the AI. Like a fill-in-the-blank form.
**When it helps you:** You type a medical term. The template automatically wraps your term in a properly structured question that gets you a better, more focused AI answer.

### Guardrail Checker
**What it is:** Before any message is sent to the AI, this checks for three types of prohibited requests: (1) asking the AI to diagnose a medical condition; (2) asking the AI to issue a religious ruling (fatwa); (3) any content related to self-harm. If found, the request is blocked and the user is told why — or redirected to crisis support.
**When it helps you:** You ask "Do I have depression?" The platform blocks this before it reaches the AI and explains that medical diagnosis must come from a licensed professional, not an AI.

### Emotional Trigger Word Highlighter
**What it is:** Splits a piece of text into individual words and marks each one with an emotion category — anger, fear, sadness, or disgust — if it belongs to one of those categories. This powers the colored word-highlighting in the exercises.
**When it helps you:** In a teaching exercise, specific words in a manipulative message glow red or orange on screen, helping you see exactly which words are designed to trigger an emotional reaction in you.

### Pre-Built Prompt Templates (4 examples)
**What it is:** Four ready-made, carefully designed question frameworks: (1) SIFT — a four-step source verification method (Stop, Investigate the source, Find better coverage, Trace claims); (2) Lateral Reading — a guide to checking a source by looking at what others say about it; (3) Mental Health Term Explainer — asks the AI to explain a mental health concept simply; (4) Positive Coping Reflection — a guided reflection prompt. Each template has labeled variables and built-in safety rules.
**When it helps you:** A student wants to fact-check a claim but doesn't know where to start. The SIFT template walks them through exactly the right questions to ask, step by step.

---

## Provenance Tracking Startup

### Provenance System Initializer
**What it is:** A startup placeholder that signals the provenance (source-tracking) system is running. "Provenance" means the ability to trace where a piece of information came from. This module contains no active logic — it simply confirms the system is online.
**When it helps you:** Runs automatically in the background. You will not interact with it directly.

---

## Web Archive Backup

### Wayback Machine Page Archiver
**What it is:** When the platform cites a webpage as a source, it automatically submits that page to the Internet Archive (a non-profit that saves copies of websites permanently — archive.org). It waits for confirmation, then saves the archived link so the source can still be found even if the original webpage is deleted later. It also remembers pages it has already saved so it doesn't submit the same page twice in 24 hours.
**When it helps you:** An article is cited as evidence for a claim. A week later the article is deleted. Because the platform automatically archived it, the source is still accessible at the archived link.

---

## Source Freshness Monitoring

### Source Age Classifier
**What it is:** Checks when a source was last verified and assigns it one of four categories: Fresh (checked in the last 30 days), Aging (31–60 days), Stale (61–90 days), or Critical (over 90 days — hidden from users until re-verified). Like a freshness label on food.
**When it helps you:** You never see an outdated source that may no longer be accurate. Sources older than 90 days are automatically hidden until someone on the team re-verifies them.

### Batch Freshness Checker
**What it is:** Runs the age check on all sources at once and produces a complete health report.
**When it helps you:** The supervisor opens the dashboard and sees which sources have gone stale and need immediate re-verification.

### Freshness Summary Stats
**What it is:** Counts how many sources are in each category (fresh/aging/stale/critical) and calculates an overall "Source Health" percentage.
**When it helps you:** A single number — "82% of sources are fresh" — tells the supervisor at a glance how healthy the platform's evidence base is.

---

## Source Registry

### Trust Band Calculator
**What it is:** Converts a source's quality score (a number from 0 to 14 based on a detailed scoring checklist) into a letter grade: A (excellent), B (good), C (acceptable), or Rejected (not allowed). Like a school grading system for information sources.
**When it helps you:** You browse the Trusted Sources Directory and see that a source is Band A — meaning it passed all quality checks with high marks.

### Filterable Source Browser
**What it is:** Lets you search and filter the platform's list of 100 pre-vetted sources by topic, trust grade, who can see it, and text search. Results are always sorted to show the best sources first.
**When it helps you:** You want to find the best health sources on the platform. You filter by "Medical" and the Band-A sources appear at the top.

### Per-Topic Source Selector
**What it is:** For each learning exercise, the platform uses exactly three sources: one primary (the main evidence), one comparative (a second perspective), and one methodological (explaining how to evaluate the evidence). This function picks exactly those three — never more, never fewer — to avoid overwhelming the learner.
**When it helps you:** You are doing an exercise on vaccine safety. You see exactly three sources displayed — one main study, one that offers a different angle, and one that explains how to read vaccine research — rather than a confusing list of twenty.

### Source Distribution Statistics
**What it is:** Two counting functions: one shows how many sources are in each trust grade (A/B/C), another shows how many sources cover each engine topic. These feed the supervisor's health dashboard.
**When it helps you:** The supervisor sees that Topic X has no Band-A sources — a gap that needs to be filled before the platform is fully ready.

---

## Islamic Contextual Tools

### Asbab Al-Nuzul Registry
**What it is:** Asbab Al-Nuzul (Arabic: "reasons for revelation") are the historical events and circumstances that caused specific Quranic verses to be revealed. This registry stores verified historical context for specific verses. If no verified context record exists, it honestly says so rather than guessing.
**When it helps you:** Someone shares a verse out of context to justify something extreme. This registry can show what situation the verse was actually addressing, revealing the distortion.

### Fatwa Source Analyzer
**What it is:** Analyzes where a fatwa (Islamic religious ruling) comes from. A fatwa from Dar Al-Ifta Egypt or Al-Azhar University (Egypt's highest Islamic authorities) is treated very differently from one shared on TikTok or WhatsApp, which is flagged as a "social media anomaly."
**When it helps you:** A viral TikTok video presents a religious ruling as authoritative. This tool identifies it as coming from social media — not from any recognized scholarly body — so it is not given false authority.

### Hadith Fabrication Checker
**What it is:** Checks whether a claimed saying of the Prophet follows known fabrication patterns. "Takhrij" (Arabic: tracing the chain of narrators) is the classical Islamic method of verifying whether a hadith is authentic. If the text matches fabrication patterns, it is classified as Mawdu' (fabricated). If it simply cannot be verified, the tool returns "unverified" — it never defaults to calling something authentic when unsure.
**When it helps you:** A social media post attributes a dramatic-sounding saying to the Prophet. This engine checks it and finds it matches a known fabrication pattern — it returns "fabricated" so you can see it is not a real hadith.

### Nasikh/Mansukh (Abrogation) Registry
**What it is:** In Islamic jurisprudence (Islamic law), some earlier Quranic verses were superseded by later ones — this is called "naskh" (abrogation). A "Nasikh" verse is one that replaces; a "Mansukh" verse is the one that was replaced; a "Muhkam" verse remains binding. This registry tracks the scholarly consensus on the abrogation status of specific verses. If no verified record exists, it honestly says "unknown" rather than guessing.
**When it helps you:** Someone cites a verse that classical scholars say was superseded centuries ago, presenting it as current binding law. This registry reveals its abrogation status and prevents the misuse.

---

## Quran Text Tools

### Verse Loader
**What it is:** Fetches the actual text of Quranic verses (in the Asad English translation) from a trusted online API (AlQuran.cloud) when given a chapter number and verse range. The text comes from the authoritative source rather than being stored statically in the platform's code.
**When it helps you:** An exercise displays the actual Quranic text for analysis. This ensures the text shown is always accurate and up to date from a trusted source.

### Verse Range Parser
**What it is:** Converts shorthand like "190-193" into a list of individual verse numbers [190, 191, 192, 193] — a simple conversion needed to load a range of verses efficiently.
**When it helps you:** An exercise specifies "verses 190 to 193 of chapter 2." This converter turns that compact notation into individual verse requests.

---

## Classical Quran Commentary

### Classical Commentary Loader
**What it is:** Returns scholarly commentary (tafsir — classical explanation and interpretation of Quranic verses) from four major classical Islamic scholars: Al-Tabari (9th century), Ibn Kathir (14th century), Al-Qurtubi (13th century), and Al-Mizan (20th century Shia perspective). Showing multiple independent interpretations is deliberate — it illustrates that respected scholars can interpret the same verse in different ways.
**When it helps you:** In an exercise analyzing verses about defensive warfare, you see four different scholarly interpretations side by side — teaching you that context and scholarly diversity matter, and that no single extreme interpretation should be treated as the only valid one.

---

## Research Data Privacy

### Participant ID Anonymizer (Browser)
**What it is:** Converts your participant ID into a one-way scrambled code using SHA-256 (a standard cryptographic hashing algorithm — think of it as a one-way blender: you can make the code from the ID, but you can't reverse the code back to the ID). Works inside a regular web browser.
**When it helps you:** All research data uses your scrambled code, not your real ID. Even if the data were ever seen by someone unauthorized, they could not identify whose data it is.

### Participant ID Anonymizer (Server)
**What it is:** The same one-way scrambling process, but running on the server side when your data is submitted. Ensures anonymization happens before anything is stored.
**When it helps you:** Your identity is protected the moment you submit any data — before it even reaches any storage system.

### Batch Entity Anonymizer
**What it is:** Applies the ID anonymization to an entire group of participant records at once.
**When it helps you:** When the supervisor downloads data for a group of 50 participants, all 50 IDs are anonymized in one step — the supervisor only ever sees scrambled codes.

---

## Research Governance

### Research Governance State Tracker
**What it is:** A checklist that tracks whether all the necessary ethical and operational requirements have been met before the study can begin with real participants — things like confirming the language of the study, verifying emergency crisis hotlines are working, and confirming that domain experts (medical, religious, psychological) have signed off on the content.
**When it helps you:** Prevents the platform from being accidentally deployed to real participants before all safety and ethical checks are complete.

### Participant Launch Gate
**What it is:** A locked gate function that returns "not ready" along with a specific list of what is still missing — like "medical reviewer has not signed off" or "Arabic questionnaire gate is still open." The launch button stays disabled until everything is confirmed.
**When it helps you:** The supervisor presses "Ready to Launch" and sees exactly which three items still need to be completed before participants can start — a clear, specific checklist rather than a vague "not ready" message.

---

## Research Statistics Engine

### Participant Data Snapshot Builder
**What it is:** The main data collection function. Pulls together every recorded piece of information about a participant — how many exercises they completed, their assessment scores before and after, their trust calibration scores, how many sources they verified, and an overall improvement score — into one organized record.
**When it helps you:** This is what the study collects about each participant. All statistics, charts, and research findings flow from this snapshot.

### Paired t-Test Engine
**What it is:** A paired t-test is a standard statistical method for comparing scores from the same person before and after an intervention (like before and after a training program). Cohen's d measures the practical size of the improvement — was it tiny or large? This engine runs the full calculation including a p-value (p-value = the probability that a result this large could happen by pure chance; a low p-value means the improvement is probably real).
**When it helps you:** The supervisor dashboard shows whether improvements in media literacy scores are statistically significant (probably real) or could just be random variation — giving the study scientific credibility.

### Welch's t-Test Engine
**What it is:** A statistical test for comparing two different groups of people who each have different amounts of variation in their scores. (Welch's test is used instead of a regular t-test when the two groups are not the same size or have different spread in their scores.) Used to compare participants who completed all three learning modules against those who only completed one.
**When it helps you:** The study can scientifically test whether doing all three modules produces a bigger improvement than doing just one — a key research question.

### Supervisor Analytics Builder
**What it is:** One function that assembles the complete picture for the supervisor: overall completion rates, test scores, results of all five statistical hypotheses (the five main research questions), and the health of all information sources — packaged into a single object that drives the entire supervisor dashboard.
**When it helps you:** The supervisor opens one screen and sees all study metrics in one place, ready for reporting, without having to run separate calculations.

### Cohort Database Management
**What it is:** Three functions for managing the group of participant records: add or update a participant's record, retrieve all records, or remove a test entry that was added by mistake.
**When it helps you:** The supervisor can import real participant data, view everyone's records, and clean up any accidental test entries before running the final analysis.

### Participant Data Importer
**What it is:** Accepts a raw data file from a participant (either in one of two supported formats) and converts it into the standard format used by the analysis tools.
**When it helps you:** A participant emails their data file to the supervisor. The supervisor imports it directly into the platform without any manual reformatting.

---

## Cross-Engine Navigation

### 5 Handoff Scenario Definitions
**What it is:** Five pre-defined bridge scenarios that connect the three learning engines. For example: if someone is learning about fake health information and their content also involves religious language, the platform can suggest they also explore the Religion Hub. Each scenario has specific trigger keywords and suggests which exercise to try next.
**When it helps you:** You finish a fact-checking exercise about a viral health claim. The platform notices it also involves religious guilt tactics and offers: "Would you like to explore how religious language is used to manipulate health decisions?" — connecting your learning across two areas.

### Handoff Trigger Detector
**What it is:** Scans the current exercise content and your responses for the keywords that define each of the five bridge scenarios. If at least two trigger words match, the relevant handoff scenario is activated.
**When it helps you:** The platform detects that your current exercise content overlaps with another engine's focus area and offers you the bridge suggestion — but only when the overlap is strong enough (two or more keywords matched), not on every exercise.

### Engine Identity Registry
**What it is:** Stores the core description of each of the three engines — what it is for, what main question it answers, and what kind of personal transformation it aims to support. DeepReal (spotting fake images and videos), Mental Health (protecting your mental health from manipulation), and Religion Hub (understanding authentic Islamic knowledge vs. distortions).
**When it helps you:** When you first open the platform or encounter a bridge suggestion, you see a clear, honest description of what each engine does — so you can make an informed choice about which to use.

---

# Engines & Libraries — slice lib-3 (plain-language)

Every feature from the technical catalog rewritten so that anyone — no computer, science, or religious-studies background needed — can understand what it does and when it helps them.

---

## Content Safety & Input Moderation

These features act as a security guard that reads everything a person types before the website's AI responds. They protect both the user and the platform.

### Jailbreak Pattern Detection
**What it is:** When you type a message into any chat tool on the site, this feature quietly scans it for known "trick phrases" — things like "ignore your previous instructions" or special code words that bad actors use to fool an AI into saying harmful things. If it spots a trick phrase, it records it as a warning so staff can check it later.
**When it helps you:** If someone tries to manipulate the site's AI assistant into giving dangerous advice, this catches it before the AI even reads the message — keeping everyone on the platform safe.

### Self-Harm Detection
**What it is:** This feature reads every message for words or phrases connected to self-harm. If it finds any, it instantly sends a high-priority alert to the site's administrators — it does not wait, it does not pass the message to the AI first.
**When it helps you:** If someone in a mental-health chat session writes something that hints they might hurt themselves, the site raises an alarm immediately so a real person can step in quickly.

### Abuse Log Persistence
**What it is:** The site keeps a running list (up to 100 entries) of every suspicious message that was flagged. This list is saved in the browser so supervisors can come back and review it.
**When it helps you:** Site supervisors can look back through the log to spot patterns — for example, if the same kind of trick is tried repeatedly — and make the platform safer over time.

### Export Abuse Logs
**What it is:** A way to download the full list of flagged suspicious messages in one go.
**When it helps you:** An administrator reviewing the platform's safety history can pull all the records at once instead of reading them one by one.

### Get Abuse Stats
**What it is:** Instead of reading every flagged entry, this gives a quick count — for example, "5 trick-phrase attempts, 2 self-harm flags" — sorted by how serious each type is.
**When it helps you:** A dashboard screen can show a simple summary like "last week: 3 jailbreak attempts, 0 self-harm flags" so staff can see the big picture at a glance.

### Safety Subsystem Placeholder
**What it is:** A simple startup instruction that tells the safety system "you exist, get ready." It does not do anything on its own.
**When it helps you:** It is a behind-the-scenes setup step that other safety tools depend on to work correctly.

### Input Safety Guard
**What it is:** Before any text you write is sent to the AI, this runs it through a list of 50 dangerous patterns — things like attempts to hack the site, inject commands, or run hidden scripts. If your text matches any pattern, it is blocked.
**When it helps you:** Protects the site from people trying to break it through clever text input, so the AI only ever receives clean, safe messages.

### Mental-Health Content Audit
**What it is:** Every response the AI produces about mental health is checked against a set of strict rules before you see it. The rules come from "safe messaging" guidelines — for example, the AI is not allowed to describe harmful methods in detail, must not glamorize suffering, and must include a helpline number near any mention of suicide.
**When it helps you:** If you are reading about depression or anxiety on the site, you can trust the content will not accidentally do more harm. The rule about including a helpline number means help is always one scroll away.

### Mindframe Violation Error
**What it is:** If the mental-health content audit finds a problem, it raises a named alarm called a "MindframeViolation" that carries a list of exactly what went wrong.
**When it helps you:** It allows the system to stop a bad response mid-delivery (like hitting an emergency brake on a train) rather than letting harmful content reach you.

### NVIDIA Content Safety Check
**What it is:** The site connects to an external AI safety service (from NVIDIA) that understands 12 languages including Arabic. It reads text and decides whether it is safe to show, returning a yes/no answer along with the reason and how confident it is. If the service is unavailable, the site defaults to allowing the content rather than breaking.
**When it helps you:** Every piece of text — whether you typed it or the AI wrote it — passes through this Arabic-aware safety check before it is used. This is especially important for Egyptian users who write in Arabic.

### Quick Safety Boolean Check
**What it is:** A simpler yes/no version of the NVIDIA safety check — just answers "is this safe?" without returning all the details.
**When it helps you:** Used as a fast doorbell check at the entrance of various features — if the answer is "no," the content is stopped right there.

### Batch Safety Check
**What it is:** Instead of checking texts one at a time, this checks many texts at the same moment (in parallel), like scanning many bags through airport security simultaneously.
**When it helps you:** When the site needs to show you a list of search results, it can check all of them for safety at once instead of making you wait for each one to be checked individually.

### Safe AI Stream Gate
**What it is:** When the AI is sending you a response word by word (called "streaming," like watching a live transcript appear on screen), this feature reads the response as it builds up. The moment it detects a mental-health safety violation, it stops the stream immediately — like cutting a TV broadcast mid-sentence.
**When it helps you:** Ensures that even if you are watching an AI response appear in real time, harmful content cannot sneak through before the safety check catches it.

---

## Content Validation Rules (Schemas)

These features are like fill-in forms with strict requirements — every piece of content on the site must pass these checks before it can be stored or shown.

### Citation Rule (CitationSchema)
**What it is:** Every source or reference used on the site must include the original text, a working link, a quality rating (from S — the best — down to level 5), a backup copy on the internet archive (Wayback Machine), and the date it was archived. If any of these are missing, the source is rejected.
**When it helps you:** You never see a vague "according to experts" citation. Every reference is traceable, archived, and rated for trustworthiness.

### Expert Reviewer Rule (ReviewerSchema)
**What it is:** Any content that has been reviewed by an expert must record the expert's name, their qualifications, where they work, when they reviewed it, and what exactly they reviewed. Incomplete reviewer information is rejected.
**When it helps you:** When the site says "reviewed by a doctor" or "reviewed by a religious scholar," there is a real, named, verifiable person behind that claim — not a vague label.

### Full Content Quality Check (ContentFrontmatter)
**What it is:** A master checklist that every piece of content must pass before going live. It checks that the content is connected to the right type of analysis tool, is available in the right language, cites its sources correctly, follows international standards (like WHO health guidelines and IFCN fact-checking standards), lists which types of deception it covers, and — critically — requires at least 2 clinical reviewers for health content and a religious scholar's input for religion content.
**When it helps you:** It is the foundation that ensures everything you read on the platform has been properly sourced, reviewed, and labeled — no shortcuts allowed.

### Schemas Subsystem Placeholder
**What it is:** A simple startup instruction for the content-rules system. Does nothing on its own.
**When it helps you:** A behind-the-scenes setup step, similar to flipping the main switch before the rules can run.

### Religion Content Rule (ReligionFrontmatter)
**What it is:** A special set of rules for religious content. Before any Islamic content can be published, it must show it was checked against at least 3 different schools of Islamic law (madhāhib — the recognized traditions of scholars), aligns with the Amman Message (a major international Islamic scholars' declaration against extremism), rates how it affects the five core goals of Islamic law (Maqāṣid al-Sharīʿah — protecting life, mind, faith, lineage, and property), and — if it quotes a saying of the Prophet (hadith) — must include a grade for whether that saying is authentic (SAHIH = verified authentic, HASAN = acceptably authentic, DAIF = weak, MAWDU = fabricated). It must also include a warning label if it resembles a religious ruling (fatwa) and point to Egypt's official fatwa authority (Dar al-Iftāʾ) when appropriate.
**When it helps you:** If someone sends you a religious message that claims "Islam says X," the site's religion section has been built so that every claim went through this strict check — protecting you from fake or distorted religious content.

---

## Science Platform Core Engines

These features power the interactive learning tools that help you build habits of thinking carefully before believing claims.

### Cognitive Load Assessment
**What it is:** Looks at signals like how fast you are scrolling, how long you have been on your screen, and other usage patterns to give you a "mental tiredness score" from 0 to 100. A higher score means your brain is more overloaded and more likely to accept false information without noticing.
**When it helps you:** Before showing you challenging content about fake news, the site checks whether you are in a state where you can think clearly, or whether you are exhausted and therefore more vulnerable to manipulation.

### Strategic Friction Delay
**What it is:** Based on your mental tiredness score, the site adds a small intentional pause — 0, 1, or 3 seconds — before you can take an action. This is called "strategic friction." The idea is that a tiny forced pause breaks the automatic "see it, believe it" reflex.
**When it helps you:** If you are doom-scrolling and your brain is on autopilot, that 3-second pause is enough to make you think for a moment instead of clicking "share" on something you have not really read.

### Epistemic Quarantine Check
**What it is:** "Epistemic" (ep-is-TEM-ic) simply means "related to knowledge and belief." This feature watches AI responses for two warning signs: (1) the AI's output is unusually random or incoherent, suggesting it is guessing wildly; (2) the meaning of the response has drifted far from what was asked. If either happens, it raises a flag — a signal that the response may be unreliable.
**When it helps you:** It acts like a quality inspector at the end of the AI assembly line. If something seems off about an AI answer, this feature flags it before you see it, so you are shown a warning rather than quietly given bad information.

### Mandatory Break Trigger
**What it is:** If you have been interacting with the AI continuously for 45 minutes, this feature throws a "stop" signal that forces the interface to show you a break prompt. You cannot keep going until you take a pause.
**When it helps you:** Long AI chat sessions can become addictive or create a false sense of closeness with a machine. This hard stop protects you from falling into that pattern.

### DeepReal Game — Load Progress
**What it is:** When you open the DeepReal media-literacy game (a game where you practice spotting fake content), this loads the game from wherever you left off — which round you are on, how much you have completed, and how many rounds are left.
**When it helps you:** You do not have to start from the beginning every time. Your progress is remembered so you can pick up the training exactly where you stopped.

### DeepReal Game — Reset Progress
**What it is:** Wipes your saved game progress for a mode so you can start fresh.
**When it helps you:** When you click "Play Again" after finishing the game, this clears your old scores so the game is challenging again.

### DeepReal Game — Answer a Round
**What it is:** When you submit your answer for a round in the DeepReal game, this processes it: checks if it was right, calculates how many points you earned, updates your score, and gives you feedback and a lesson explaining why the correct answer was correct.
**When it helps you:** After each round you do not just get "right" or "wrong" — you get a real explanation of the manipulation technique involved, so you actually learn rather than just guessing.

### Evidence Overview Loader
**What it is:** Pulls up the scientific evidence supporting what each learning module teaches — sources, research claims, and data — from the site's database. If the database is unavailable, it falls back to a built-in set of backup data.
**When it helps you:** Every tool on the Science Platform shows you the research behind it. Instead of "trust us," you see the actual studies and sources that prove the techniques work.

### All-Module Evidence Loader
**What it is:** Loads evidence for all three learning modules at the same time, in parallel.
**When it helps you:** When you open the learning journey dashboard, all three modules load their evidence simultaneously so the page is fast instead of loading one section at a time.

### Source Link Health Check
**What it is:** Automatically checks whether every cited source URL on the site is still working (not broken or gone). Tags each source as: fresh (checked in the last 30 days), aging (up to 60 days old), stale (up to 90 days), or critical (more than 90 days without a check).
**When it helps you:** Ensures that when you click on a source to verify a claim yourself, the link actually works and is not leading you to a dead page.

### Evidence Source Directory
**What it is:** Returns the full list of every source used across all learning modules.
**When it helps you:** A "source transparency" page can show users — and supervisors — exactly what evidence the platform is built on.

### Egyptian Official Authorities List
**What it is:** Returns the correct Egyptian official authorities for each topic area: Al-Azhar and Dar al-Iftāʾ for religion, Egypt's Ministry of Health for mental health, and IFCN/UNICEF for media literacy. These are the bodies the site links to when it says "for more information, consult the official authority."
**When it helps you:** Ensures that when you need to go beyond the platform, you are directed to Egypt's real, legitimate authorities — not random websites.

### Evidence Seed Stats
**What it is:** Returns a quick count of how many research signals, trusted sources, pieces of seeded evidence, and claims are in the system.
**When it helps you:** An admin dashboard can show a simple summary like "We have 180 trusted sources and 42 verified claims" so supervisors know how well-stocked the evidence library is.

### Deepfake Blood-Flow Detection Stub
**What it is:** Describes a deepfake detection technique called rPPG (remote photoplethysmography — a way to detect the tiny color changes in skin caused by a heartbeat, which AI-generated faces cannot fake). In the current version this is a teaching stub — it always returns "no result" because the real detector has not been connected yet. It is clearly labeled as a simulation.
**When it helps you:** It teaches you that this type of detection exists and is planned — honest about the fact that it is not yet running, so you know the platform is not pretending to do things it cannot do.

### Voice-Cloning Detection Stub
**What it is:** Describes a technique for detecting AI-cloned voices by analyzing the natural throat-and-glottis (IAIF — Iterative Adaptive Inverse Filtering — a way to isolate how your throat produces sound, which cloned voices mimic imperfectly). Also a teaching stub that always returns "no result."
**When it helps you:** Same purpose as above: educates you that voice-cloning detection is being built into the platform, while being transparent that this feature is not yet active.

### Zero-Knowledge Humanity Verification Stub
**What it is:** Describes a privacy-preserving way to prove a user is a real human (not a bot) without revealing who they are. "Zero-knowledge proof" (ZKP) means you can prove a fact — "I am human" — without sharing any identifying details, like proving you are over 18 without showing your birthdate. This is also a teaching stub that always returns false.
**When it helps you:** Educates you about the anti-bot technology being designed for the platform, while being honest that it is not active yet.

### Rate-Limit Bot Check Stub
**What it is:** A teaching stub that checks if a user is sending more than 5 messages per minute — a pattern typical of bots. Always returns a flag but does not enforce anything in the current version.
**When it helps you:** Demonstrates the anti-spam/anti-bot rate-limiting system being designed for the platform.

### Module Diagnostic Tool
**What it is:** The interactive "check yourself" tool on each of the three modules (DeepReal, Mental Health, Religion Hub). You fill in a short form about your situation — for example in DeepReal: "How urgent does this claim feel? Is there emotional pressure? Does it come from an official source?" — and the tool scores your answers and gives you a bilingual (English and Arabic) verdict: how serious the situation is, why, and exactly what to do next in an Egyptian context.
**When it helps you:** Your aunt sends you a scary voice message claiming a medicine cures cancer. You open the DeepReal diagnostic, fill in the form, and within seconds get a verdict: "This shows 3 classic manipulation signals. Here is what to do." Then it gives you specific Egyptian resources to check.

### Module Page Data Assembler
**What it is:** When you open a module page (for example the Mental Health module), this gathers everything the page needs in one trip: the module briefing, your current progress through the workflow, all the evidence, the last content refresh, and six collections of content (exercises, rules, myths, scenarios, tricks, and reverse-engineering examples) — all cleaned up and sorted.
**When it helps you:** The page loads fast and complete — you do not see half-loaded sections or have to wait for content to appear piece by piece.

### Journey Dashboard Data Assembler
**What it is:** Builds the data for your personal learning journey dashboard: a summary of your progress in each of the three modules, a recommendation for which module to focus on next, and all supporting evidence.
**When it helps you:** When you open your learning homepage, you see a personalized view — "You are making good progress in DeepReal; your next step in Mental Health is X" — rather than a generic list.

### Journey Progress Summarizer
**What it is:** For each module, works out where you are in your learning journey: whether you need a guide to start, whether you are in progress, or whether you have completed it. Also identifies what emotional state you might be in (based on your activity) and nudges you toward the most useful next step.
**When it helps you:** Instead of being overwhelmed by many options, each visit shows you one clear recommended action — "Continue here" — based on where you left off.

### Ontological Stability Evaluator
**What it is:** "Ontological" (on-toe-LOJ-i-cal) refers to your sense of reality — your basic certainty about what is real and true. When the platform is showing you very disturbing content (like a deeply convincing deepfake or a reality-fracturing manipulation), this measures how destabilized you might feel, rated on a scale. Based on that score, it places you in one of four states: just assessing, needing validation, needing grounding, or needing full mental reconstruction support. These states are linked to Terror Management Theory (TMT) — a psychological framework about how people react when their sense of reality is threatened.
**When it helps you:** If you have just seen something deeply disturbing that makes you question what is real, the platform does not just move on. It recognizes your state and adjusts how it supports you next.

### Calm Design Theme Provider
**What it is:** Based on how destabilized you are feeling (from the evaluator above), this returns a set of visual settings — colors, blur effects, pacing — that make the screen calmer and less stimulating. These settings are based on "Calm Design" principles (design techniques proven to reduce anxiety).
**When it helps you:** If you are in a distressed state, the website automatically becomes softer, slower, and quieter-looking — helping you feel grounded rather than more overwhelmed.

### Protocol Definition Loader
**What it is:** For every interactive exercise, myth, scenario, or learning activity on the platform, this loads all the details: the goal, the step-by-step form you fill in, what the possible outcomes are, and how those outcomes connect to real evidence. It also provides everything in both English and Arabic, with Egyptian-specific context.
**When it helps you:** When you open any exercise — for example "How to spot emotional manipulation in a news headline" — the page has all the instructions, the form, and the evidence ready immediately.

### Protocol Evaluator
**What it is:** When you complete an exercise form, this scores your answers using the rules for that specific module. For DeepReal it checks the source, evidence quality, emotional pressure, and official-source match. For Mental Health it first checks for immediate danger, then distress level, function impact, and duration. For Religion Hub it checks for signs of coercion, guilt-tripping, whether the content is replacing professional care, and sectarian markers. The result is a verdict with a score, a detailed bilingual explanation, and specific Egyptian-context next steps.
**When it helps you:** After completing a "diagnose this claim" exercise, you get a real verdict — not just a quiz score, but actionable guidance like "Go to this Egyptian hotline" or "Check this official religious source."

### Workflow State Reader
**What it is:** Reads your saved learning progress for each module — which steps you have completed, which items you have selected, whether you have seen the guide — from the site's database, with a backup file if the database is unavailable.
**When it helps you:** Every time you return to a module, the site knows exactly where you left off and picks up from there.

### Workflow State Writer
**What it is:** Saves your full learning progress to the database or a backup file immediately whenever you complete a step.
**When it helps you:** Your progress is never lost, even if you close the browser mid-exercise.

### Single Step Progress Updater
**What it is:** Updates just one module's progress at a time — for example "mark this step as done" or "record that this item was selected" — and saves it instantly.
**When it helps you:** Each time you tick off a step in a learning exercise, it is saved right away without you needing to click a "save" button.

### DeepReal Game Progress Reader and Writer
**What it is:** Reads and saves all DeepReal game data — your score, which round you are on, your answer history, whether you have completed the game — in the site's database.
**When it helps you:** Your game progress is saved on the server (not just your browser), so it persists even if you switch devices or clear your browser.

### Science Sources Refresh Recorder
**What it is:** Updates the full list of evidence sources from the master data and records a log entry each time a refresh is run.
**When it helps you:** Administrators can trigger a "refresh" to keep all the scientific evidence up to date, and the system records exactly when it happened and what changed.

### Science Refresh Summary
**What it is:** Returns a history of the last several source refresh runs plus the current status of each source (is it new? recently checked? possibly outdated?).
**When it helps you:** A supervisor dashboard panel can show "Last refreshed: 2 days ago. 3 sources need attention" so someone can check whether the platform's evidence is still current.

### JSON-to-Database Migration
**What it is:** On first run after an upgrade, this automatically moves any learning progress that was saved in an old file format into the new database, without any manual steps.
**When it helps you:** If the platform upgrades its storage system while you are mid-way through a learning journey, your progress is automatically carried over — you do not lose anything.

---

## Statistical Scoring Engines

These features are the research measurement tools — they calculate whether the platform is actually helping people think more critically.

### Cohen's d Effect Size Calculator
**What it is:** Compares two groups of measurements (for example, test scores before and after using the platform) and tells you how big the difference is in everyday terms: "negligible," "small," "medium," or "large." Cohen's d is a standard research measure that tells you not just *whether* a change happened but *how meaningful* that change is, along with a 95% confidence interval (a range of values you can be 95% sure contains the true answer).
**When it helps you:** When the research team wants to know "did the platform actually make people better at spotting fake news?", this gives them a meaningful answer — not just "yes it helped a little" but "the effect was medium-sized, equivalent to moving from the 50th to the 69th percentile."

### Paired T-Test Calculator
**What it is:** A standard statistical test (t-test) that compares scores from the same people measured twice — before and after using the platform. It calculates the t-statistic (a measure of how different the two sets of scores are), the p-value (p for probability — the chance that the difference happened by random luck alone; a p below 0.05 means the difference is real), and applies a correction called Bonferroni (bone-fer-OH-nee) that makes the test stricter when multiple things are being tested at once, to avoid false positives.
**When it helps you:** This is the main scientific test that proves (or disproves) whether the platform's three core goals were achieved — better fake-news detection, better mental-health literacy, and better religious-knowledge accuracy.

### Research Power Analysis Constants
**What it is:** Hard-coded numbers from a standard research planning tool (G*Power) that determined the study needs at least 42 people per group, with an 80% chance of detecting a medium-sized difference, using the Bonferroni-corrected threshold.
**When it helps you:** These numbers ensure the research study is big enough to find real effects if they exist — not so small that it misses genuine improvements or so large that it wastes resources.

### Success Criteria Definitions
**What it is:** Seven specific targets the platform must hit to be considered successful — for example, a minimum improvement on three research measurement scales (MIST-20 for media literacy, MHLS for mental-health literacy, RCOPE for religious coping), a minimum usability score (SUS — System Usability Scale, the industry standard usability rating), a minimum completion rate, and expert content validation scores. Each target has a "minimum acceptable," a "target," and a "stretch goal."
**When it helps you:** The research dashboard can show in real time which targets are being met — making the platform accountable to its own stated goals rather than just claiming "it works."

### Research Variable Map
**What it is:** A structured reference list of 12 research variables — things being measured (like test scores and user behavior), things being changed (like which version of the platform someone uses), background factors (like age), and process measures (like time spent). It also maps each variable to the instrument used to measure it, the measurement scale, and when it is collected.
**When it helps you:** Ensures the research is set up correctly from the start so that the data collected can actually answer the research questions — essential for any scientific study.

### Trust Calibration Error (TCE) Calculator
**What it is:** Measures how well your confidence matches reality. For each claim, you say how confident you are (0–100%) and then whether you believe it is true or false. This tool calculates the average gap between your confidence and whether you were actually right. A high TCE means you are overconfident (or underconfident) about your judgments.
**When it helps you:** Before and after using the platform, you take a short test. The change in your TCE score shows whether you have learned to be more accurately confident — not just more skeptical, but better calibrated.

### Acceptance Friction Score (AFS) Calculator
**What it is:** Measures how carefully you check claims before accepting them. It adds up: how long you paused before deciding, how many times you clicked on a source, how often you checked an archive, whether you used reverse-image search, whether you looked at evidence, and whether you changed your mind after seeing evidence. The higher the score, the more careful you were.
**When it helps you:** This turns "being careful" into a number. The platform can show you how your verification habits improve over the 14-day program.

### Authority Overweight Index (AOI) Calculator
**What it is:** Measures whether you trust a source more because it looks official, even when the evidence it presents is weak. It checks how often you ranked a high-authority source (like a government logo) above a source with better actual evidence.
**When it helps you:** Detects a specific thinking bias — "it has a logo, so it must be right" — that makes people vulnerable to fake news from official-looking sources. Seeing your own AOI score can make this bias visible and easier to overcome.

### Emotional Trigger Susceptibility (ETS) Calculator
**What it is:** Compares how often you accepted a claim when it was written in emotionally charged language versus when the same claim was written in neutral language. A high ETS score means emotional language successfully bypassed your critical thinking.
**When it helps you:** Shows whether you are more likely to believe something scary or outrageous just because of how it was written — a key vulnerability that fake-news creators exploit.

### Comfort-Truth Confusion Score (CTCS) Calculator
**What it is:** Measures how often you rated a comforting-but-weakly-supported claim as more reliable than an uncomfortable-but-well-supported one. Basically: how often does "this feels good to believe" win over "this is actually backed by evidence"?
**When it helps you:** Especially useful for spotting why people share feel-good misinformation about health products or religious claims — because believing them feels reassuring even when the evidence is thin.

### Full Trust Calibration Profile Builder
**What it is:** Runs all five of the above scoring calculators at once and packages the results into a complete profile, labeled with whether this was taken before or after the program.
**When it helps you:** Creates a full before-and-after picture of your critical-thinking biases so you can see exactly what improved (and what still needs work) after the 14-day program.

### Improvement Calculator
**What it is:** Compares your before and after Trust Calibration profiles and calculates the percentage improvement in each area, checking whether each improvement hit the minimum target set by the research team.
**When it helps you:** Instead of just "you got better," you see: "Your emotional susceptibility improved by 32% — that beats the target. Your authority bias improved by 8% — that is below target and needs more work."

### Regulatory Body Scorer
**What it is:** Scores a regulatory organization (like a government ministry or oversight body) using a formula: 40% of the score comes from budget size (a rough measure of capacity), 30% from how many people they have legal authority over and how binding that authority is, 20% from staff count, and 10% from how long they have existed.
**When it helps you:** When the platform ranks sources in a "trust pyramid" exercise, this formula ensures a well-funded, widely-authoritative regulator ranks higher than a small one — giving you a defensible, transparent basis for the ranking.

### Research Institution Scorer
**What it is:** Scores a research institution using a formula: 40% based on how often its research is cited in top journals (Nature Index ranking), 30% from Nobel Prize winners, 20% from research budget, and 10% from age and growth trajectory.
**When it helps you:** Helps the platform teach you how to rank scientific institutions when evaluating whether a study "from a university" is trustworthy — not all universities are equal.

### Education Organization Scorer
**What it is:** Scores education organizations (like NGOs that run media-literacy programs) using: 35% active learner count, 20% countries reached, 15% languages supported, and 30% peer-reviewed evidence of effectiveness.
**When it helps you:** The platform's institutional trust ladder uses this to show you that an NGO reaching millions of learners with proven results ranks higher than one with a glossy website but no evidence.

### Adaptive Learning Engine
**What it is:** After each learning session, calculates how many experience points (XP) you earned based on accuracy. Then watches two patterns: if you have struggled (EIS — Emotional Interference Score — is above 0.8) for three sessions in a row, it lowers the difficulty to reduce frustration; if you have scored above 95% accuracy for five days running, it raises the difficulty to keep challenging you.
**When it helps you:** Keeps the learning exercises at the right level for you personally — not too easy (boring), not too hard (discouraging). The difficulty adjusts to how you are actually doing.

---

## Source Freshness Monitoring

These features track whether the sources cited on the platform are still current and working.

### Source Freshness Checker
**What it is:** Looks at when each source was last reviewed and assigns a label: fresh (checked within 30 days), aging (31–60 days), stale (61–90 days), or critical (more than 90 days). Like a freshness date on a food package.
**When it helps you:** Ensures you are not shown outdated information. If a health source has not been checked in three months, a warning appears so you know it may be stale.

### Freshness Badge Generator
**What it is:** Converts the freshness label into a visual badge with a specific color and text — for example, a green "Fresh" badge or a red "Critical" badge.
**When it helps you:** Source cards display a clear, color-coded badge so you can tell at a glance how recently each source was verified.

### Batch Freshness Checker
**What it is:** Runs the freshness check on many sources at the same time.
**When it helps you:** When a supervisor opens the dashboard, all sources are checked simultaneously so the full health picture appears quickly.

### Freshness Summary Stats
**What it is:** Counts up all sources into categories (total, fresh, aging, stale, critical) and calculates the average number of days since the last check.
**When it helps you:** A "Source Health" widget on the admin dashboard shows something like: "120 sources total: 80 fresh, 25 aging, 10 stale, 5 critical. Average age: 22 days" — so supervisors know at a glance whether urgent re-checking is needed.

---

## EAL Governing Standard (Executable Form)

These features are the platform's "constitution" — the single source of truth that all tools and AI assistants must follow.

### Standard Re-export Barrel
**What it is:** A single import point that brings together all the rules, definitions, and tools from the governing standard into one place. Every part of the platform that needs these rules imports from this one location instead of from many scattered files.
**When it helps you:** Ensures consistency — if the rules change, they change in one place, and every tool automatically uses the updated version.

### 8 Deception Layers Definition
**What it is:** The platform's master list of 8 types of deception, from the simplest (Layer 1: a complete lie — something invented from nothing) to the most complex (Layer 8: exploiting things we genuinely do not know). Each layer has a name in English and Arabic, a definition, and a set of defense techniques. These 8 layers are the framework that organizes everything the platform teaches.
**When it helps you:** When the platform analyzes a piece of misinformation, it tells you which of the 8 layers it uses — so you learn not just "this is fake" but "this is fake in this specific way, and here is how to defend against this type."

### Layer Lookup Helper
**What it is:** A quick search tool — give it a layer number (1–8), get back its full definition. Returns nothing for unknown numbers.
**When it helps you:** Components throughout the site use this to display the correct layer badge and description without repeating the same text everywhere.

### 8 Layers AI Prompt Block
**What it is:** A pre-written summary of all 8 deception layers in a format that is ready to be inserted directly into instructions given to an AI assistant. This ensures every AI tool on the platform "knows" the 8-layer framework.
**When it helps you:** Every AI chatbot on the platform uses the same, accurate deception taxonomy — so the DeepReal AI, the Mental Health AI, and the Religion AI all talk about misinformation using the same consistent framework.

### Source Tier Classifier
**What it is:** Looks at the web address (URL) of any source and matches it against four lists: Tier S (the gold standard — academic databases, major scientific indexes); Tier A (very high quality — WHO, peer-reviewed journals, major institutions, and recognized Islamic authorities like Al-Azhar); Tier B (reliable — professional fact-checkers, OSINT (Open Source Intelligence — publicly available verification tools) resources); Tier C (community-level — forums, local sources). Anything not on the lists gets Tier U (unknown).
**When it helps you:** When the platform checks a source, it instantly tells you whether it comes from a gold-standard academic database or from an unverified community site — making it easier to judge how much to trust a source.

### Source Tier Weight Converter
**What it is:** Turns the tier letter into a number: S=100, A=88, B=70, C=45, U=20. These numbers are used in the math that calculates how confident the platform is in a verdict.
**When it helps you:** Allows the confidence calculation to be transparent and consistent — a verdict backed by Tier S sources scores much higher than one backed only by Tier C sources.

### Confidence Label Deriver
**What it is:** Takes four signals — how many sources support the claim, what the best source tier is, whether different AI models agree, and how many unsupported sentences are in the analysis — and turns them into a single honest label: HIGH, MEDIUM, CONTESTED, or UNVERIFIED. The rules are strict: no sources at all → always UNVERIFIED; models disagree → always CONTESTED; too many unsupported sentences → capped at MEDIUM; tier quality → determines HIGH vs MEDIUM.
**When it helps you:** Every fact-check on the platform ends with one of these four honest labels — never a false certainty. You see HIGH only when the evidence genuinely supports it.

### Universal Fact-Check Result Shape
**What it is:** A strict template that every fact-check result must follow: it must include a verdict, a confidence label, which of the 8 deception layers is involved, and a list of sources. If any of these are missing or wrong, the result is rejected before you see it.
**When it helps you:** No matter which tool you use on the platform, the results always look the same and always include the same basic information — so you always know what you are looking at.

### AI System Prompt Builder
**What it is:** Builds the set of instructions given to every AI chatbot on the platform. These instructions are assembled in 6 layers: (1) who the AI is; (2) the "cite or stay silent" rule — the AI must cite a real source or say it does not know; (3) the 8-layer deception taxonomy; (4) the preferred trusted sources; (4b) for religion chatbots, the Islamic Authenticity Protocol; (5) safety rules; (6) language and Arabic right-to-left (RTL) text formatting rules.
**When it helps you:** No AI on this platform can go "off-script." Every chatbot follows the same constitution, which means they all refuse to fabricate, always cite sources, and always handle Arabic correctly.

### Cognitive Defense Technique Catalog
**What it is:** A catalog of 8 specific, named critical-thinking techniques — one for each deception layer. For example: Layer 1 (complete lies) → Lateral Reading and the SIFT method (Stop, Investigate the source, Find better coverage, Trace claims); Layer 4 (hidden motives) → "Cui Bono?" (Latin for "who benefits?" — asking who profits from you believing this); Layer 6 (psychological manipulation) → Inoculation (learning the manipulation tricks before you encounter them so they do not work on you). Each technique includes which cognitive bias it fights, why it works, and a step-by-step procedure.
**When it helps you:** Instead of vague advice like "think critically," the platform gives you specific, proven techniques with names, steps, and the science behind them — so you can actually practice them.

### 12 Manipulation Techniques Catalog
**What it is:** A list of 12 manipulation techniques (drawn from research frameworks called FLICC, Jigsaw, and Bad News — all well-known media literacy programs), each paired with a one-line "prebunk" strategy. A prebunk is a warning you get before you see the manipulation, so when you do encounter it, it does not work as well.
**When it helps you:** The inoculation training modules use these prebunk messages to vaccinate you against manipulation. Just like a medical vaccine exposes you to a weakened version of a virus, these prebunks expose you to a weakened version of a trick so you recognize it when the real thing appears.

### Cognitive Defense AI Prompt Block
**What it is:** A pre-written version of the cognitive defense catalog, formatted to be inserted directly into AI instructions.
**When it helps you:** When the AI gives you an analysis, it uses the named, specific techniques from this catalog — so instead of generic advice, it says "use Lateral Reading here" or "apply Cui Bono to this claim."

### Defense and Technique Lookup Helpers
**What it is:** Two quick search tools: one that finds a defense technique by layer number, one that finds a manipulation technique by ID.
**When it helps you:** The small cards and badges throughout the site use these to display the correct technique description without copying the same text into many different places.

### Relevance Logic Layer Prompt Builder
**What it is:** Builds the instructions for an AI that judges whether a retrieved source actually addresses the claim being checked — based on the content of the source, not just whether the title contains matching words. It returns a judgment: does this source support the claim, refute it, take no position, or is it actually unrelated?
**When it helps you:** Prevents the platform from misleading you by citing a source that merely mentions the same words as the claim without actually addressing it. Every source citation on the platform has been judged for real relevance.

### Source Adjudication Merger
**What it is:** Takes the AI's relevance judgments and attaches them back to the list of sources they apply to.
**When it helps you:** After the AI judges whether each source is relevant, this step ensures each source record is updated with that judgment before you see the final analysis.

### Adjudication Fallback
**What it is:** If the relevance-judging AI fails to run, this marks all sources as "neutral, 50% relevance" as a safe default, rather than crashing or returning nothing.
**When it helps you:** The platform degrades gracefully — you still see a result, it just shows that the relevance judgment could not be completed, instead of breaking.

---

## xAPI/SCORM Telemetry (Basic)

These features record your learning activity in formats that work with standard educational software.

### xAPI Statement Generator (Basic)
**What it is:** xAPI (Experience API) is the modern standard for recording learning activity — like a universal receipt that any compatible learning system can read. When you complete an activity, this creates a basic receipt with: who you are, what you did (the "verb"), what you did it on (the "object"), and optionally your score.
**When it helps you:** If your school or organization uses a Learning Record Store (LRS — a database that collects learning activity records from many platforms), the platform can send your learning data there in a format the LRS understands.

### SCORM Score Payload Generator
**What it is:** SCORM 1.2 is an older but still widely used standard for e-learning — the format most Learning Management Systems (LMS — platforms like Moodle or Blackboard that schools use to manage courses) understand. This produces a SCORM-compatible score report with lesson completion status and time spent.
**When it helps you:** If a school or organization wants to embed this platform inside their existing LMS, scores and completion data can be sent in SCORM format so the LMS can track progress automatically.

---

## Behavioral Dwell-Time Tracking

These features track how carefully users interact with each exercise — not just whether they answered, but whether they actually verified before deciding.

### Exercise Session Opener and Closer
**What it is:** Opens a tracking window when you start an exercise and closes it when you finish, saving a record of everything you did during that window (including your "verification score").
**When it helps you:** Every exercise has a clean start and end point for measuring your behavior, so the data captured is specific to that exercise rather than mixing up activity from different exercises.

### Behavioral Event Recorder
**What it is:** Every time you take a careful verification action — clicking on a source, checking an archive, running a reverse image search, looking at evidence, comparing sources — this records it with a timestamp and adds it to a running count.
**When it helps you:** These small actions are the proof that you actually verified a claim rather than just guessing. The data builds your real behavioral profile as a critical thinker.

### Real-Time Acceptance Friction Score (AFS) Calculator
**What it is:** During an exercise, continuously calculates your current AFS (verification behavior score, 0–100) from your pause time, source clicks, evidence checks, and comparison actions.
**When it helps you:** You can see your AFS update in real time as you work through an exercise — so you get immediate feedback on whether you are being careful enough, not just a score at the end.

---

## Global Utilities

Small helper tools used throughout the entire platform.

### CSS Class Merger
**What it is:** A helper that combines style instructions (CSS classes — the codes that control colors, sizes, spacing, etc.) and automatically resolves conflicts when two instructions contradict each other, keeping only the right one.
**When it helps you:** Ensures the site looks correct on every screen. Without this, conflicting style instructions would cause visual glitches.

### MVP Theme Helpers
**What it is:** Three helper functions that, given the name of one of the three main platform tools (DeepReal, Mental Health, or Religion Hub), return the correct color theme, display name, and icon for that tool.
**When it helps you:** Every button, card, and heading automatically uses the right colors for which tool you are in — so DeepReal looks different from Mental Health, making it easy to know where you are on the platform.

---

## Form and API Validation

These features check that data submitted to the platform is complete and correctly formatted before being stored.

### Assessment Submission Validator
**What it is:** When you submit a research assessment (the before/after tests used to measure how much you have learned), this checks that the submission includes: which test it is, whether it is the "before" or "after" version, all your answers (rated 0–100), the exact time you submitted, and your participant ID. Any missing field causes the submission to be rejected.
**When it helps you:** Ensures the research data is clean and usable. A submission missing a participant ID or with out-of-range scores would corrupt the research results — this prevents that.

### Source Card Validator
**What it is:** When sources from five different external databases (OpenAlex, Semantic Scholar, Crossref, EuropePMC, and the platform's local sources) are combined into one list, each source must be converted to a standard format. This validator checks that every source has an ID, title, source name, URL, and a label showing which database it came from.
**When it helps you:** All sources shown to you look the same and have the same fields, regardless of which database they came from — making them easy to compare and evaluate.

### Exercise Completion Validator
**What it is:** When you submit a completed exercise, this checks that the submission includes: the exercise ID, which of the three main tools it belongs to, which day of the 14-day program it is (must be 1–14), your answers, your confidence level before and after, and how long you spent.
**When it helps you:** Ensures the 14-day program data is accurate and complete. Missing data could make it impossible to measure whether the program actually worked.

---

## Verification Subsystem Placeholder

### Verification Startup Instruction
**What it is:** A simple startup instruction for the verification system. Does nothing on its own.
**When it helps you:** A behind-the-scenes setup step that other verification tools depend on.

---

## Content Version History

These features keep a full record of every change made to learning exercises.

### Content History Reader
**What it is:** Reads or creates the change history for any exercise — a log of every time it was created, updated, reviewed, or approved.
**When it helps you:** You can see exactly how a piece of content has evolved — when it was last updated and what changed — giving you confidence that it is actively maintained.

### Content Version Recorder
**What it is:** When a change is made to an exercise — whether someone updated it, an expert reviewed it, or it was officially approved — this adds a new entry to the history with the author's name, a summary of what changed, and any recommendation from an expert.
**When it helps you:** Creates a full audit trail. If a piece of content is ever questioned, you can trace every change back to who made it and when.

### Full History Exporter
**What it is:** Collects the complete change history for every exercise on the platform into a single export.
**When it helps you:** Researchers and supervisors can download a full audit trail of all content changes for review or publication — showing the platform is transparent about how content evolves.

---

## Expert Sign-off Workflow

These features manage the approval process that every piece of content must go through before it can be published.

### Approval Record Creator
**What it is:** When a new exercise enters the system, this creates a record saying "this content is in draft, needs 3 expert sign-offs before it can go live."
**When it helps you:** Prevents any content from being published without going through the full review process — no shortcuts.

### Expert Sign-off Adder
**What it is:** When a domain expert (a doctor, religious scholar, psychologist, etc.) signs off on a piece of content, this records their signature along with a CVI score (Content Validity Index — a standard research measure of how relevant and appropriate content is, rated 0–1). Once at least 3 experts have signed with an average CVI of 0.78 or higher (the international standard set by researcher Lawshe), the content is automatically promoted to "approved." Below that threshold it stays in review.
**When it helps you:** Content cannot be published just because someone with a title looked at it. It needs at least 3 experts who all agree it meets the quality standard — a real peer-review process.

### Publish Permission Check
**What it is:** A simple yes/no check: is this content in "approved" state? If yes, it can be published. If not, the publish button stays locked.
**When it helps you:** A hard technical lock prevents any content from being published until it has passed the full expert review — even if someone tries to bypass the process.

### Content Status Badge Generator
**What it is:** Returns a colored label for each content state: draft, under expert review, reviewed (but not yet approved), approved, or published.
**When it helps you:** Content management lists display a clear, color-coded status for every piece of content so reviewers can instantly see what is ready, what is waiting, and what still needs work.

---

## Full xAPI 1.0.3 Learning Records Engine

These features handle the complete, standards-compliant recording of everything you do on the platform.

### Full xAPI Statement Builder
**What it is:** Creates a complete, fully standard-compliant xAPI 1.0.3 learning record for any activity. This includes: your identity (using a privacy-protected email hash), the verb (what you did), the object (what you did it on, with a full bilingual description), your score and time if applicable, platform-specific tags, and a curriculum grouping so the activity is linked to the right part of the learning program.
**When it helps you:** Every learning activity generates a complete, standards-compliant record that any external learning system can read and understand — making your progress portable.

### xAPI Statement Emitter
**What it is:** Saves the xAPI statement to your browser first (up to 500 records stored locally, so nothing is lost if you are offline), then sends it in the background to the platform's records server without interrupting what you are doing.
**When it helps you:** Your learning records are never lost due to a bad connection. They are saved locally first and synced later — so even if your internet cuts out mid-exercise, your completion is recorded.

### xAPI Convenience Verbs
**What it is:** Ready-made shortcuts for the four most common learning outcomes: experienced (you saw it), passed (you scored 80% or more), failed (you scored below 80%), and mastered (you scored 95% or more). Each automatically sets the right completion and success flags according to the xAPI standard.
**When it helps you:** The platform consistently records whether you merely experienced an activity, passed it, or fully mastered it — allowing accurate progress tracking and gating (you must pass before you can advance).

### Completion Rate Calculator
**What it is:** Looks through your stored xAPI records and counts what percentage of the required activities you have completed.
**When it helps you:** Progress bars and "gate" checks (you must complete X before accessing Y) are powered by this — giving you an honest view of how far along the program you are.

### Pre-defined Activity Registry
**What it is:** A fixed list of 10 key learning activities on the platform (the Phase 0–4 curriculum modules, the Fallacy Engine, the Reaction Test, the Paper Auditor, the Swarm Debate, the Inoculation Passport, and the Hadith Check), each with a unique permanent identifier, bilingual name, and activity type label.
**When it helps you:** Every activity always has the same permanent identifier regardless of what the URL might look like. This prevents the system from recording "you completed X" and then losing that record because a URL changed.

### xAPI Engine Factory
**What it is:** Creates a personalized xAPI engine with your user ID and name already attached, ready to use within a session.
**When it helps you:** Every page or component that needs to record learning activity gets a personalized engine already set up with your identity — no repeated setup needed.

---

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

---

# Tools for Spotting Fake News, Protecting Your Mind & Your Faith (plain-language)

Covers features 52–102 of the component library — the tools that let you investigate rumors,
protect yourself from manipulation, and understand how misinformation spreads.

---

## hunter/HunterMode — The Rumor-Hunting Dashboard

### Live Trend Radar
**What it is:** A live list that updates every few minutes showing the top 15 topics that are spreading fast right now — either across Egypt or worldwide. Think of it like a "what is everyone sharing right now?" scoreboard, but focused on things that might be false or misleading.
**When it helps you:** You are a teacher or journalist and you want to know which scary story is going viral today in Egypt before students or readers come to you asking about it. You check this list first so you can prepare a clear, fact-based answer.

### Egypt / Worldwide Toggle
**What it is:** A simple two-button switch. One button shows you what is trending inside Egypt. The other button shows you what is trending globally (in the rest of the world). One click flips between them.
**When it helps you:** A rumor is spreading in your neighborhood WhatsApp group. You want to know: is this a local Egyptian scare, or is it a worldwide panic? Switching between the two views answers that in seconds.

### Medical Credentials Hunter
**What it is:** A search box where you type a person's name, and the tool checks the official Egyptian Medical Syndicate (EMS) register — the government list of licensed doctors — to see if they are actually a real, registered doctor. It gives you a clear "verified" or "not found" badge.
**When it helps you:** Someone on Facebook is selling herbal supplements and calling themselves "Dr. Ahmed." You type their name here and it tells you whether they appear on the official doctors' list, or whether "doctor" is just a made-up title.

### Rumor Heatmap (embedded)
**What it is:** A map of Egypt divided into regions, with colored dots showing where rumors are most active — red means a lot of rumor activity, green means calm. It refreshes automatically every 5 seconds.
**When it helps you:** You are running a media-literacy workshop and want to show participants a visual picture of where in Egypt misinformation is spreading most right now, to make the problem feel real and local.

---

## hunter/RumorHeatmap — Egypt Rumor Map

### Epidemiological Heatmap
**What it is:** An animated map of Egypt split into six regions (like Cairo, Alexandria, Upper Egypt, etc.). Each region has a colored pulsing dot — critical (very bad), high, medium, or low — showing how much rumor activity that area has. "Epidemiological" (عِلم الأوبئة) just means studying how something spreads through a population, the same way doctors study disease spread.
**When it helps you:** A trainer showing a live audience how misinformation spreads geographically across Egypt, making the issue visual instead of just numbers on a page.

### Rotating Radar Sweep
**What it is:** A spinning circular line rotates over the map, like a radar screen you see in action movies. It is purely a visual effect — it does not do extra scanning — but it signals that the map is "live" and refreshing.
**When it helps you:** Keeps people engaged during training sessions by making the tool feel active and real-time, instead of a still picture.

### Hover Tooltip with Severity
**What it is:** When you move your mouse over a region's dot on the map, a small popup appears with the region's name, how serious the rumor situation is there, and a note. Move your mouse away and the popup disappears cleanly.
**When it helps you:** You want details about one specific region without the map becoming cluttered with text everywhere.

---

## hunter/ThreatMap — How a Rumor Travels

### Patient Zero Propagation Map
**What it is:** An animated diagram that shows the journey a rumor takes — starting from an anonymous online board, then jumping to Telegram and Twitter, then to WhatsApp family groups, then to Facebook, and finally reaching the general public. Animated lines and moving dots show the path step by step. ("Patient zero" is a medical term for the first person who spreads a disease; here it means the first source of the rumor.)
**When it helps you:** You want to explain to someone why deleting one post does not stop a rumor — this animation shows them visually how information has already jumped across five different platforms by the time most people see it.

### Claim Tracking Label
**What it is:** An optional piece of text you can attach to the map that displays the exact rumor or claim being tracked, so the map is tied to a specific story rather than being abstract.
**When it helps you:** You are running a debunking exercise on a specific claim (like "honey cures cancer") and you want the map to show the audience: "this is the exact claim we are tracking as it spreads."

### 8-Second Animation Loop
**What it is:** The whole animated rumor-journey plays once, then automatically restarts and replays every 8 seconds — no clicking needed.
**When it helps you:** You set this up on a screen at an exhibition or awareness event and it runs by itself, telling the story of how rumors spread to every passer-by without needing someone to press play each time.

---

## interactive/branching-visual-experience — The Spread Simulation

### BranchingVisualExperience (Full Simulation)
**What it is:** A step-by-step interactive story that simulates a fake health message spreading through a typical Egyptian family on WhatsApp. You watch it spread, then you can "rewind" it and see what happens when someone stops and checks the facts first. It goes through stages: spreading → branching into harm → truth revealed → rewinding → corrected.
**When it helps you:** You want to feel — not just understand intellectually — how one false sentence sent by a well-meaning aunt can hurt six different people in six different ways. Then you see how checking facts before forwarding could have prevented all of it.

### Live Spread Counter
**What it is:** A number on screen that counts up rapidly from 0 to 3,000 "shares" while the simulation runs, then counts back down when you rewind. It uses a smooth acceleration so it feels urgent.
**When it helps you:** Seeing "3,000 shares in 40 seconds" on screen makes the abstract idea of "viral spread" feel concrete and alarming — far more than reading a statistic in an article.

### Harm Branch Reveal
**What it is:** Six character cards appear on screen — a father, a child, a mother, a believer, a pharmacist, and a teacher. Each card shows exactly how that type of person is harmed by the false claim, and what the correct source of information would be. They appear one by one with a slight delay.
**When it helps you:** Shows you that the same false message causes very different damage depending on who reads it — the pharmacist might give bad advice, the believer might make a religious decision based on a lie, the child might be scared needlessly.

### Hold-to-Rewind Button
**What it is:** A button you press and hold for 2 full seconds (a progress bar fills while you hold) that "rewinds" the simulation — the share counter drops back to zero and the harm branches disappear. It requires you to hold it, not just click.
**When it helps you:** The effort of holding the button for 2 seconds is a deliberate lesson: stopping misinformation takes conscious, sustained effort. It makes the point memorable through physical action.

### DeepReal Correction Typewriter
**What it is:** After the rewind, a button labeled "DeepReal" replaces the false claim on screen with the correct, WHO-sourced true statement — one character at a time, like someone typing it live. (WHO = World Health Organization, the global health authority.)
**When it helps you:** Demonstrates what an AI-powered fact-correction looks like and shows users that a correct answer exists and is easy to reach.

### Positive Correction Branches
**What it is:** After the correction happens, the six harm cards are replaced by six green "resolution" cards showing how each person (father, child, etc.) behaves differently when they have accurate information. Green borders replace red ones.
**When it helps you:** Ends the simulation on an empowering note — you leave feeling that verification genuinely changes outcomes for real people, not just that misinformation is bad.

### EgyptSpreadMap
**What it is:** A small map of Egypt with 10 city dots that light up red (the false message arrived there) during the spreading phase, then turn green (corrected) during the rewind phase.
**When it helps you:** Makes the simulation feel local and personal — you can see Cairo, Alexandria, Aswan, etc. lighting up, which is more impactful for Egyptian users than a generic globe.

### WhatsApp Share Card
**What it is:** At the end, a ready-made WhatsApp share button appears with a pre-written correct message and a link to DeepReal, so you can forward the truth to the same contacts you might have otherwise forwarded the false claim to.
**When it helps you:** Turns the lesson into direct action — instead of just knowing better, you have a one-tap way to share the correct information with your family right now.

### Text-Only Fallback
**What it is:** A toggle button that switches off all the animations and shows the same information as a simple, still table. No movement, no delays.
**When it helps you:** If you are on a slow internet connection, or if flashing animations are uncomfortable for you (some people have medical conditions that make animations painful), you still get the full lesson without any movement.

### Reduced-Motion Support
**What it is:** The tool automatically checks your device's accessibility setting called "prefer reduced motion." If you have turned that setting on (it tells apps you want less movement), all animations are skipped and transitions happen instantly.
**When it helps you:** People with vestibular disorders (conditions that make movement on screen feel physically nauseating) can use the tool safely without any extra steps.

---

## interactive/micro-interactions — Small Interactive Helpers

### TextReveal
**What it is:** Text appears word by word at a slow, steady pace instead of all at once. You are forced to read each word before the next one appears.
**When it helps you:** During a "Bias Reflection Minute" exercise where the whole point is to slow down and read carefully — this tool physically prevents you from skimming.

### WaveformIndicator
**What it is:** Five small vertical bars that bounce up and down like a sound equalizer while audio is playing, and stay still when audio is paused. Screen-reader software (used by blind users) also gets a text description of what is happening.
**When it helps you:** A clear visual signal that tells you "audio is currently playing" — useful when a short expert explanation is being read aloud inside an exercise.

### DecisionTreeAccordion (micro-interactions version)
**What it is:** A collapsible list of "if X, then Y" steps — you click to open a step and see what to do next, click again to close it. Like a FAQ section but for decision-making. (A decision tree is like a flowchart for making choices.)
**When it helps you:** Displaying the SIFT method (Stop, Investigate the source, Find better coverage, Trace the claim) step by step without scrolling through a wall of text.

### PeerPairTabs
**What it is:** Two tabs — "My Answer" and "Peer's Answer" — with a sliding underline that moves smoothly between them when you switch. Shows your reasoning and a classmate's reasoning on the same exercise side by side.
**When it helps you:** After completing a fact-checking exercise, you compare how you thought about the claim versus how another participant approached it — a simple way to learn from different perspectives.

### ExpertMarquee
**What it is:** A scrolling ribbon of short expert quotes — two rows of cards moving slowly in opposite directions, looping forever. Like a ticker tape, but with expert testimonials instead of news headlines.
**When it helps you:** Visitors to the platform's main page see real experts endorsing the approach without having to click anything — it builds quiet confidence in the platform before they start an exercise.

---

## interactive/scroll-physics — Scroll Animations

### ParallaxHero
**What it is:** When you scroll down the page, the background image moves more slowly than the foreground text, creating a sense of depth — like looking through a window while driving. ("Parallax" means two things appear to move at different speeds depending on your viewpoint.)
**When it helps you:** Makes the opening section of an awareness page feel richer and more immersive, encouraging users to keep reading.

### ScrollProgressBar
**What it is:** A thin colored bar at the very top of the page that fills up as you scroll down. When you reach the bottom, the bar is full. When you are halfway, the bar is half full.
**When it helps you:** During a 14-day awareness course, this bar reminds you visually how far through today's reading you are, so you never feel lost on a long page.

### StaggerReveal
**What it is:** As you scroll down, sections of the page appear one by one rather than all being visible at once. Each block "fades in" when you scroll close to it — like items appearing as you walk toward them.
**When it helps you:** On a page that takes apart a myth step by step, this makes sure you absorb each step before the next one appears, rather than jumping to the conclusion.

### StickyChecklist
**What it is:** A small checklist that "sticks" to the side of the screen as you scroll, always staying in view. Each item on the list gets a strikethrough as you tick it off.
**When it helps you:** While reading a long news article to evaluate it, the SIFT verification checklist (Stop, Investigate, Find, Trace) stays visible the whole time so you do not forget any step.

### HorizontalScrollCards
**What it is:** Instead of stacking cards in a long vertical list, they sit in a horizontal row and you scroll left and right to see them. Each card "snaps" cleanly into position.
**When it helps you:** When there are many cards to show (like different warning signs of manipulation), horizontal scrolling saves the page from becoming an endless vertical scroll.

### DotNavigation
**What it is:** A row of small dots at the bottom of a multi-step experience. The dot for the current step is bigger than the others. You can click any dot to jump to that step.
**When it helps you:** During a multi-step SIFT training module, you always know which step you are on and can jump back to review any previous step without using a back button.

---

## interventions/advanced-modes — Deep Learning Tools

### SourceCompare
**What it is:** A side-by-side panel showing the same topic covered by two or three trusted sources at once (color-coded by trust level — Band A is the most trusted). After you look at both, you click a button to reveal a hidden "takeaway" that triangulates (meaning: combines the evidence from all sides to reach a more reliable conclusion). ("Lateral reading" means checking what other sources say about a source, rather than only reading the source itself.)
**When it helps you:** You see a viral Facebook post about a new health treatment. This tool shows you the same topic from a top medical journal and from a government health site side by side, so you can see the contrast instantly.

### ExpertCapsule (advanced version)
**What it is:** An expandable card — small and closed at first — that opens when you tap it to reveal a ~90-second plain-text explanation by a domain expert on one specific concept (like "what makes fake news spread" or "how anxiety affects religious decision-making"). No audio needed, just text.
**When it helps you:** You are in the middle of an exercise and you want a quick, reliable explanation of one concept without leaving the page or watching a video.

---

## interventions/behavior-modes — Building Better Habits

### BiasReflection
**What it is:** A three-question self-check that appears after you complete an exercise. Question 1: "Did I want this to be true?" Question 2: "What emotion did I feel?" Question 3: "Did my judgment change?" Each has a text box for you to write your honest answer.
**When it helps you:** After reading a scary health claim, you realize you shared it immediately because you wanted to protect your family — not because you checked if it was true. This tool helps you notice that emotional pull so you can catch it next time.

### CorrectionLedger
**What it is:** A personal log showing the last 10 times you changed your mind based on better evidence — what you used to believe, what you know now, and the date you updated your belief. Like a diary of times you got smarter.
**When it helps you:** It normalizes being wrong. Instead of feeling embarrassed about past mistakes, you see a list of growth moments — proof that updating your beliefs is healthy, not shameful.

### DecisionTree (behavior-modes version)
**What it is:** A step-by-step guide with branches — like a flowchart — for two situations: (1) if you are feeling distressed about mental health topics, and (2) if you are confused about a religious question. Each branch leads you to a concrete, safe next action. The tool never gives medical or religious rulings — it routes you to real resources.
**When it helps you:** You are feeling overwhelmed after reading upsetting health content. Instead of panicking, you follow the branches: Stop → Ground yourself → Read the disclaimer → Here is who to call.

---

## interventions/decision-tree — Safety Decision Flowchart

### DecisionTreeAccordion (interventions version)
**What it is:** An accordion (collapsible list) built specifically for safety situations. It uses two pre-built pathways: one for mental health distress (MH_DISTRESS_TREE) and one for religious confusion (RELIGION_COPING_TREE). Each step is color-coded: blue for an action to take, orange for a warning, green for a resource.
**When it helps you:** Someone feels spiritually shaken after reading content that questions their faith. This flowchart walks them safely: "If distressed → stop → ground yourself → read this disclaimer → seek help here."

---

## interventions/engagement-modes — Practice and Reflection

### VerificationChecklist
**What it is:** Five checkboxes you must tick before the tool lets you "accept" a claim: (1) checked the source, (2) checked the date, (3) checked for evidence, (4) found a second source, (5) checked my own emotion. All five must be ticked before you can continue.
**When it helps you:** Adds a useful speed bump before you accept or share something. You cannot just click past it — you have to consciously tick each step, which builds the habit of checking facts.

### MicroScenario
**What it is:** A short (about 1-minute) practice card that shows you a realistic situation — like a social media post you might see — asks you one question about it, then hides the expert insight until you click "reveal." Low pressure, no grades.
**When it helps you:** Between formal exercises, you encounter these mini-challenges. Over time they train your brain to recognize manipulation patterns automatically — the way practice drills build muscle memory in sports.

### AfterActionReview
**What it is:** A weekly summary dashboard that shows you your stats for the past week: how many exercises you completed, how many times you changed a belief, how many sources you consulted, how your confidence levels changed. It also gives you three reflection questions to think about.
**When it helps you:** Once a week you sit down and ask: "What fooled me this week? What did I do well? What should I practice more?" The numbers make the reflection concrete instead of vague.

---

## interventions/evidence-ladder — How Strong Is This Proof?

### EvidenceLadder
**What it is:** A picture of a 7-rung ladder. The bottom rung is "Opinion or Social Media post" (the weakest evidence). The top rung is "Systematic Review" (the strongest — where scientists combine results from dozens of studies). Each rung can be expanded to show a description and an example. When you are looking at specific content, the tool can highlight which rung that content belongs on.
**When it helps you:** Someone shares a Facebook post saying "scientists proved X." This ladder shows you that one person's Facebook post is on rung 0, while actual scientific proof requires reaching at least rung 4 or 5 — a huge difference.

---

## interventions/expert-voice-capsule — Expert Audio Player

### ExpertVoiceCapsule
**What it is:** An audio player inside the page that plays a 60–90-second spoken explanation by a real expert (a doctor, researcher, or scholar). It shows the expert's name, their role, a waveform animation while it plays, and a transcript (written version) you can open. If no audio recording is available, the tool uses your device's text-to-speech to read it aloud.
**When it helps you:** You prefer listening to reading, or you are doing something else while learning. You tap play and a doctor briefly explains why a specific health claim is false — in under 2 minutes.

---

## interventions/mode-control-room — Today's Learning Plan

### ModeControlRoom
**What it is:** A transparent dashboard that shows you which of the 17 different learning approaches the platform is using today (like "critical thinking mode" or "emotional reflection mode"), how long each session lasts, and a grid overview of all 14 days of the awareness course. It is the platform's "what is the system doing today?" display.
**When it helps you:** A teacher or program supervisor wants to understand exactly what the platform is doing on Day 9 of the course — which exercises are active, how long they last, and how they fit into the full 14-day journey.

---

## interventions/myth-autopsy — Taking Apart a False Claim

### MythAutopsy
**What it is:** A 5-step guided walkthrough that dissects a false claim like a scientist examining a specimen. Step 1: the raw claim. Step 2: the emotional hook (why it feels true). Step 3: what evidence is missing. Step 4: the correct source. Step 5: the corrected understanding. You can move forward, go back, or see all steps at once. Pre-built examples cover fake image detection, mental health myths (like "depression is just laziness"), and religious manipulation.
**When it helps you:** Instead of just being told "this is false," you see exactly why it was designed to fool you — the emotional hook, the missing evidence — so you recognize the same pattern the next time.

---

## interventions/peer-pair-review — Compare Your Thinking

### PeerPairReview
**What it is:** A two-tab view showing your reasoning on a claim and another participant's reasoning on the same claim, side by side. A sliding underline moves between "My Answer" and "Peer's Answer" tabs.
**When it helps you:** After deciding whether a health claim is true or false, you see how a peer thought through the same claim. Maybe they caught something you missed, or used a verification step you had not considered.

---

## interventions/source-of-day — One Trusted Source Per Day

### SourceOfDay
**What it is:** A daily spotlight card that introduces you to one reliable source (like a medical journal or a fact-checking website). It tells you what the source is good for, what it is NOT good for, gives a real example of using it, and has a "Got it" button that dismisses the card for the day. It appears once per day during the 14-day course.
**When it helps you:** By the end of 14 days you have been introduced to 14 trusted sources, one at a time, with real examples — making it easy to remember where to check next time you see a suspicious claim.

---

## interventions/time-friction-gate — Forced Pause Before Sharing

### TimeFrictionGate
**What it is:** A timer that locks a button (like "Accept" or "Share") for a countdown — say 10 seconds. You cannot click the button until the countdown reaches zero. After you finally click, the system records that you paused. (COM-B is a behavior-change framework — it stands for Capability, Opportunity, Motivation — used by psychologists to design habits. This tool uses it to build the habit of pausing before accepting a claim.)
**When it helps you:** You are about to forward a WhatsApp message. Instead of tapping "Forward" immediately, a 10-second timer appears. That pause alone gives your brain time to think: "Should I check this first?"

---

## mh/HelpSeekingWizard — Finding Mental Health Help in Egypt

### HelpSeekingWizard (mental health version)
**What it is:** A list of verified places in Egypt where you can get mental health support: public hospitals, the Okasha Institute (Egypt's main psychiatric research center), private verified clinics, and primary care doctors. Each entry has the name in both Arabic and English, and contact details.
**When it helps you:** You or someone you care about needs professional mental health support in Egypt but you do not know where to start. This list tells you the verified options without you having to search the internet and risk finding unverified clinics.

---

## mh/WhatsAppForwardCheck — Should I Forward This?

### WhatsAppForwardCheck
**What it is:** You paste a WhatsApp message into this tool, and it automatically analyzes it and shows you three questions to ask before forwarding it. If the message uses vague authority ("experts say," "doctors confirm" with no names), a warning flag appears. If the message is emotionally manipulative, an alert appears telling you your emotions are being targeted.
**When it helps you:** Your relative sends you a message saying "Doctors confirm that [product] cures [disease]" — before you forward it to your own contacts, you paste it here and immediately see: vague authority warning, emotional manipulation alert. You decide not to forward it.

---

## misinfo-atlas/misinfo-card-integrated — Suspicious Content Card

### MisinfoCardIntegrated
**What it is:** A card displaying a piece of potentially false content (image, title, source, excerpt) with a "Suspicious" badge on it, and three one-click scan buttons embedded directly on the card: one for checking if the image is AI-generated or fake (DeepReal), one for checking if it is emotionally manipulating you (Mental Health), and one for checking if it misuses religious text (Religion Hub).
**When it helps you:** You are browsing a feed of flagged content and you see a suspicious article with a scary image. Right there on the card, without leaving the page, you click "Scan image" and instantly get an analysis — no need to open a new tab or copy-paste anything.

---

## onboarding/Tour — First-Visit Guided Tour

### FortressTour
**What it is:** An automatic guided tour for first-time visitors. It highlights four key tools on the page one by one — the manipulation detection card, the source quality pyramid, the SIFT verification bar, and your learning journal — with a short explanation for each. You can skip it or continue step by step. (SIFT stands for Stop, Investigate the source, Find better coverage, Trace the original context — a four-step fact-checking method.)
**When it helps you:** You land on the platform for the first time and have no idea where to start. The tour walks you through the four most important tools in under 2 minutes so you feel oriented immediately.

---

## psychometrics/confidence-slider — How Sure Are You?

### ConfidenceSlider (standalone version)
**What it is:** A slider bar from 0% to 100% with a color-coded label. You drag it to show how sure you are of your answer — for example, 80% sure this news story is false. Then you click "Lock My Confidence." After you submit, it shows a read-only version of what you chose. It also works correctly if your screen displays Arabic text right-to-left. (RTL = right-to-left, the direction Arabic text is read.) (TCE = Trust Calibration Error — the gap between how sure you thought you were and whether you were actually correct. A big gap means your confidence needs recalibrating.)
**When it helps you:** Before answering whether a claim is true or false, you record how confident you are. After the exercise, the platform shows you your TCE — for example, you were 90% sure but wrong, which means your confidence was too high. Over time you learn to better match your certainty to your actual accuracy.

---

## psychometrics/psychometric-inputs — Measuring How You Think

### ConfidenceSlider (psychometric-inputs version)
**What it is:** The same 0–100% confidence slider as above, but simpler in design and connected to the deeper measurement system that tracks your confidence patterns over many exercises.
**When it helps you:** Built into every exercise to quietly collect data on how your confidence levels change over time — feeding the platform's understanding of whether you are becoming better calibrated.

### DwellTimeTracker
**What it is:** An invisible wrapper around a piece of content that records how many seconds you spent reading it and how many times you clicked around before hitting "Accept & Continue." It is like a stopwatch that runs silently while you read. (AFS = Acceptance Friction Score — a measure of how much hesitation you showed before accepting a claim. More hesitation = healthier skepticism.)
**When it helps you:** The platform learns whether you are a fast-clicker (you accept claims too quickly without thinking) or a slow deliberator (you take time to think). This helps it give you personalized exercises where you need the most practice.

### AuthorityCard
**What it is:** A selectable card showing a source's logo, name, type, and trust band (a rating of how reliable it is). All cards look the same size and weight so no source looks more impressive than another just because of its name or branding.
**When it helps you:** In an exercise, you are asked to rank sources by trustworthiness. Because the cards look equal, you cannot rely on which one "looks more official" — you have to actually think about why one source is more reliable than another.

### ThumbnailTrapTest
**What it is:** A grid of 12 thumbnail images — 6 with emotionally charged, scary, or exciting visuals, and 6 with calm, factual visuals. You click whichever ones catch your eye. When you submit, the tool reveals your ETS score. (ETS = Emotional Trigger Susceptibility — how strongly you are drawn to emotional images versus neutral ones. A high score means emotional headlines pull your attention more than factual ones.)
**When it helps you:** After the test, you see a number that shows honestly how much emotionally charged images pull your attention. If your score is high, the platform knows to give you specific exercises for resisting emotional-clickbait design.

### ArchiveAwarenessButton
**What it is:** A tracked button that you use to run verification steps like reverse image search (finding where an image originally came from), archive checks (finding older versions of a webpage), or domain-owner lookups. Every time you click it, the platform counts the click as a positive verification action.
**When it helps you:** The platform uses these counts to measure how often you voluntarily reach for verification tools during exercises — a sign that the habit of checking is becoming natural.

---

## pyramid/SourcePyramid — The 3D Trust Pyramid

### SourcePyramid3D
**What it is:** A rotating 3D pyramid made of stacked boxes, where each level represents a different quality of source. Social media posts sit at the very bottom. WHO reports and Cochrane Reviews (large scientific meta-analyses — studies that combine results from hundreds of other studies) sit at the top. You can rotate it and zoom in. A specific tier can glow to highlight where a particular piece of content belongs. (Bloom post-processing = a glow effect that makes highlighted tiers look they are lit up.)
**When it helps you:** Seeing the hierarchy in 3D and being able to rotate it is far more memorable than a flat list. You internalize "social media is at the bottom, systematic reviews are at the top" in a way that sticks.

---

## religion/MaqasidCheck — Does This Message Harm Islamic Values?

### MaqasidReasoningCheck
**What it is:** A checklist that evaluates a piece of religious content against the five things Islamic law is designed to protect — faith (Din), life (Nafs), reason (Aql), family lineage (Nasl), and property (Mal). For each one, it shows whether the content harms or preserves it, with a clear badge. It does not issue a religious ruling (fatwa) — it is an educational framework only. (Maqasid al-Shariah = المقاصد الشرعية = the higher objectives of Islamic law, a well-established scholarly concept.)
**When it helps you:** A viral religious post is spreading on WhatsApp claiming that a certain practice is obligatory. This tool checks: does this message, if believed, harm or protect a person's reason, family, or livelihood? It helps you see the structural impact before accepting it.

---

## religion/TafsirComponents — Understanding Quranic Verses in Context

### Stripped
**What it is:** A panel showing only a small, out-of-context fragment of a Quranic verse, with a red warning border and a label that says "The Decontextualized Snippet." (Decontextualized = taken out of its surrounding text, so the meaning is incomplete or distorted.)
**When it helps you:** Step 1 of a Quran-context exercise — you see exactly what a manipulative post looks like when it uses only one fragment of a verse, stripped of everything before and after it.

### Reveal
**What it is:** A panel with a "Reveal Full Context" button. You have to click it yourself to see the full verse and surrounding verses. The content slides into view when you click.
**When it helps you:** By making you actively request the full context (instead of showing it automatically), the exercise makes a point: full context is always there — you just have to look for it. It builds the habit of seeking context before judging.

### Contextual
**What it is:** The full surrounding verses displayed after you click Reveal — the verses before and after the fragment, so you can read the complete passage.
**When it helps you:** Step 2 of the Quran exercise — you can now compare the manipulative fragment to the full passage and see how different the meaning is.

### AsbabSection
**What it is:** An amber-bordered panel showing the Asbab al-Nuzul (أسباب النزول) — the historical circumstances in which the verse was revealed. Knowing why and when a verse was revealed is essential to understanding what it means. (Asbab al-Nuzul = causes/reasons of revelation.)
**When it helps you:** Step 3 — the same verse that sounds like a general command may have been revealed in response to a specific historical event. Knowing that context changes everything.

### CommentaryGrid
**What it is:** A grid of cards showing how recognized classical Islamic scholars interpreted the verse — each card shows the scholar's name and their commentary in plain text.
**When it helps you:** Step 4 — you see that mainstream, well-respected scholars interpreted the verse in a way that is very different from what a manipulative viral post claims.

### UserReflection
**What it is:** A text box with a prompt asking you to write, in your own words, how the full context changed your understanding of the verse compared to when you first read the stripped fragment.
**When it helps you:** Step 5 — writing your answer forces you to actively process what changed, making the lesson stick far better than just reading.

---

## research/scientific-intelligence-center — The Research Dashboard

### ScientificIntelligenceCenter
**What it is:** A 6-tab research panel for educators and investigators. The tabs cover: (1) scientific signals from research, (2) which types of people are most at risk, (3) why certain sources are trusted, (4) a library of identified manipulation flags, (5) how to stay updated, (6) the platform's scientific standard. You can filter by topic. If the live data fails to load, it falls back to built-in static data.
**When it helps you:** You are a teacher preparing a lesson and you want a comprehensive view of the scientific evidence behind the platform's claims, the manipulation tactics it covers, and which audiences are most vulnerable — all in one place.

---

## research/support-directory-panel — Verified Help Directory

### SupportDirectoryPanel
**What it is:** A grid of verified contact cards — phone hotlines, official websites — for real crisis support and mental health resources in Egypt. Each card shows the name, who it covers (jurisdiction), what type of help it offers, whether it is active, what hours it operates, when it was last verified, and exactly when to use it.
**When it helps you:** Someone in an exercise becomes distressed reading about suicide or trauma. The platform shows this panel so they can immediately see the real, verified Egyptian crisis hotline number — not a generic international one.

---

## safety/index — Safety Banners

### CrisisCard
**What it is:** A red-bordered banner at the top of any distressing page showing the Egyptian Ministry of Health Mental Health Hotline number: 08008880700.
**When it helps you:** Someone reading deeply upsetting content about mental health sees this banner immediately at the top of the page and has the crisis line number without having to search for it.

### DisclaimerNotDiagnosis
**What it is:** A bilingual banner (in both English and Arabic) clearly stating that nothing on this platform is a medical diagnosis and that users should consult a real professional. It appears at the bottom of all pages covering psychological or medical topics.
**When it helps you:** Protects users from treating platform content as medical advice, and protects the platform legally. Meets the ethical requirement that health-related content must always recommend professional consultation.

---

## science/BlueprintDisplay — Engine Blueprint Viewer

### BlueprintDisplay
**What it is:** A full-page formatted document viewer that renders the detailed technical/scientific blueprint of each of the three main engines (DeepReal for fake content, Mental Health, Religion Hub). It has a dot-grid background, a gradient header, an engine number badge, and renders the document in clean, readable text. It also displays Arabic text correctly (right-to-left). (RTL = right-to-left.)
**When it helps you:** A researcher or educator wants to read the full scientific basis behind, say, the Mental Health engine — this viewer presents it as a readable formatted document rather than raw code.

---

## science/cognitive-command-deck — The Science Reference Panel

### CognitiveCommandDeck
**What it is:** A 6-tab reference panel covering the cognitive science behind the platform: (1) resilience techniques, (2) how the brain processes information, (3) known cognitive biases (mental shortcuts that lead to errors), (4) source quality guides, (5) trusted scientific authorities, (6) academic references. You can search and filter within each tab. It only loads the data you are currently viewing, not everything at once.
**When it helps you:** A researcher or educator wants to look up the scientific explanation for why people fall for emotional manipulation. They open this panel and search within it without leaving the exercise interface.

---

## science/deepreal-game-arena — The Fake-Detection Game

### DeepRealGameArena
**What it is:** An interactive game with six modes — Classic, Egypt-context, Point-of-View, Rumors, Scams, and TikTok. In each round, the game shows you a scenario and asks you to identify the manipulation technique being used. After each answer, you see whether you were right and how many points you earned. At the end, you get a summary of your performance.
**When it helps you:** Instead of reading about manipulation tactics, you practice spotting them in game form — which builds faster, more instinctive recognition. The Egypt-specific mode uses scenarios relevant to Egyptian social media.

---

## science/deepreal-tripillar-ui — The Three-Step Verification Demo

### DeepRealTripillarUI
**What it is:** An interactive demonstration of the three pillars of the DeepReal method: (1) Philosophy — who must prove the truth?, (2) Forensic scan — a simulated 2-second technical scan of the content, (3) Cognitive intercept — after the scan, a question appears: "Why did you want this to be true?" before showing you the result. (rPPG = remote photoplethysmography — a technology that can detect whether a face in a video is real by analysing subtle color changes in skin; here it is shown as an educational simulation. ZKP = zero-knowledge proof — a cryptographic technique; shown here for educational purposes.)
**When it helps you:** You learn the three-step logic the DeepReal engine uses — not just "it said fake," but why the burden of proof matters, what forensic scanning does, and why your own emotional investment in the content must be checked.

---

## science/deepreal-upload-zone — Upload a Suspicious File

### DeepRealUploadZone
**What it is:** A drag-and-drop zone where you drag an image or video file from your computer onto the page (or click to select it), and the platform analyzes it for signs of AI manipulation or deepfake generation. The result appears on the same page.
**When it helps you:** A colleague sends you an image that looks like a prominent person saying something shocking. You drag that image here and within seconds the platform tells you whether it shows signs of AI manipulation.

---

## science/defense-scanner-overlay — One-Click Inline Analysis

### DefenseScannerOverlay
**What it is:** A small button embedded directly on top of any piece of content (an image in an article, a quote, a title) that, when clicked, opens a floating analysis panel without leaving the page. Depending on what type of content it is, it runs one of three scanners: DeepReal (fake image/video), Mental Health (emotional manipulation), or Religion Hub (religious text misuse). The panel shows loading and error states cleanly.
**When it helps you:** You are reading a news feed and you see a suspicious headline. Instead of opening a new tab, you click the small scanner button overlaid on that headline and get an instant analysis right there.

---

## science/engine-one-ui — How Emotional Manipulation Works (Interactive)

### EngineOneUI (Mental Health interactive)
**What it is:** A 5-stage scroll-through experience explaining how manipulation affects your brain and emotions: (1) Amygdala Hijack — a diagram showing how fear bypasses rational thinking (the amygdala is the brain's alarm system), with a breathing animation to calm it; (2) Somatic Mapping — how your body feels manipulation (tension, chest tightening); (3) Cultural Firewall — specific cultural vulnerabilities in Egyptian context; (4) Ego Decoupling — how to separate your identity from a claim being attacked; (5) TRAUMA Formula — interactive sliders showing the components of emotional trauma impact. You scroll through one stage at a time.
**When it helps you:** You want to understand why you feel a surge of fear or anger when you read certain posts — and what to do about it. Each stage is a concrete, interactive explanation, not just text.

---

## science/engine-two-ui — How to Evaluate Research Quality (Interactive)

### EngineTwoUI (Misinformation literacy interactive)
**What it is:** A 4-stage scroll-through experience: (1) Introduction to research quality; (2) COPE Funding Scanner — checks whether a sponsor name suggests a company with financial interests might be biasing the research (COPE = a committee that sets ethical standards for publications); (3) PRISMA Shredder — checks whether a study follows quality reporting standards based on its type and sample size (PRISMA = a checklist for reporting medical research properly); (4) CONSORT Flowchart — a visual diagram showing how many patients were enrolled in a clinical trial and how many dropped out at each stage (CONSORT = a standard for reporting clinical trials).
**When it helps you:** Someone shares a study saying "proven: X cures Y." You go through these four stages and learn to ask: Who funded it? Is the sample size large enough? Did they report their methods properly? How many people dropped out?

---

## science/evidence-command-board — Live Evidence Dashboard

### EvidenceCommandBoard
**What it is:** A live dashboard that pulls up the platform's evidence database for any given topic. It shows each claim with its supporting data — which region the study was done in, what the measured value is, which method was used, how confident the result is, and the source link. It also shows a health summary: how many sources are live, how many failed to load, how many are outdated. There is a manual refresh button.
**When it helps you:** An educator wants to see, in real time, whether the evidence supporting a particular platform claim is current and from working sources — or whether some sources have gone offline and need replacing.

---

## science/guided-journey-board — Your Personalized Learning Path

### GuidedJourneyBoard
**What it is:** A dashboard showing where you stand in each of the three engine courses (DeepReal, Mental Health, Religion Hub). For each course it shows: your current status, an encouraging message, the scientific reason for your next step, a progress bar, how Egypt's results compare to global results, and exactly what you should do next. It also shows when the data was last updated and how many sources it is based on.
**When it helps you:** You have not opened the platform in 3 days. You come back and this board immediately shows you where you left off, why your next step matters, and what to do — personalized to your progress.

---

## science/layer-combat-engine — How Each Engine Fights Each Deception Layer

### LayerCombatEngine
**What it is:** A collapsible list showing, for each of the 8 layers of deception the platform recognizes, exactly how the specific engine you are using fights that layer. Each item shows the weapon name in Arabic and English, the methodology used, and an expandable explanation of the combat strategy.
**When it helps you:** You are a researcher who wants to understand the Religion Hub engine's specific approach to fighting Layer 3 deception (for example, emotional manipulation). You open the accordion for Layer 3 and read the strategy without having to read the full technical blueprint.

---

## science/live-swarm-debate — Watch the AI Analyze a Claim Live

### LiveSwarmDebate
**What it is:** A terminal-style screen (green text on black background, like in hacker movies) where you submit a suspicious claim or text, and watch multiple AI analysis "agents" work through it in real time — one plans the investigation, another scrapes the web, another synthesizes the findings. The results stream in line by line as they are generated.
**When it helps you:** You submit a viral claim about a new disease treatment and watch the analysis unfold live — seeing each step of the investigation as it happens builds trust in the result and teaches you how multi-source analysis works.

---

## science/mental-health-tripillar-ui — How Screen Time Affects Critical Thinking (Demo)

### MentalHealthTripillarUI
**What it is:** An interactive demonstration with three sliding dials — representing your heart-rate variability (HRV, a measure of stress), your daily screen time, and your scroll speed on social media. As you adjust the dials, the tool computes a "Cognitive Firewall Score" — how much mental bandwidth you have left for critical thinking. If the score is too low, the content on the page dims or gets blocked until you acknowledge it. (HRV = Heart Rate Variability — a medical measure of how stressed your nervous system is; lower HRV = more stressed.)
**When it helps you:** You learn visually and interactively that after hours of fast scrolling and high screen time, your brain's ability to evaluate claims carefully is genuinely reduced — which is exactly when misinformation is most effective.

---

## science/module-command-center — The Central Control Panel for Each Engine

### ModuleCommandCenter
**What it is:** A 6-tab control panel at the heart of each engine page (DeepReal, Mental Health, Religion Hub). The tabs cover: exercises, rules, myths, scenarios, manipulation tricks, and reverse-engineering attacks. It also includes: a pop-up guide that routes you based on your current emotional state, a live lab for analyzing real-world situations, a protocol workbench for structured evaluation, and filter controls throughout.
**When it helps you:** You are a user of the Mental Health engine. Instead of hunting through different pages, everything — exercises, case studies, live analysis tool — is in one tabbed panel.

---

## science/module-guide-popup — Start Where You Are Emotionally

### ModuleGuidePopup
**What it is:** A popup window (that traps your focus so you do not accidentally click outside it) that asks: "How are you feeling right now?" You pick your current emotional state from a list. The tool then recommends which tab to start on and what your first step should be. (Focus-trapped modal = a window that keeps your keyboard navigation inside it until you close it — important for keyboard-only and screen-reader users.)
**When it helps you:** You open the Mental Health engine feeling anxious. Instead of the platform forcing you to start at Exercise 1, this popup says: "You're feeling anxious — start with the grounding exercises in Tab 3." The learning path adapts to your state.

---

## science/module-lab-console — Live Real-World Analysis Tool

### ModuleLabConsole
**What it is:** A form specific to each engine (different questions for deepfake analysis, mental health analysis, or religious content analysis). You fill in the details of a real situation you encountered, submit it, and the platform returns: a title, a summary, a severity level, the reasoning behind the assessment, and suggested next actions. It also shows related published research that backs up the assessment.
**When it helps you:** You encountered a disturbing religious post on Facebook. You fill in the form describing it, and the platform gives you a structured severity assessment and tells you exactly what to do next — based on research, not guesswork.

---

## science/module-operating-shell — The Shared Page Frame for Each Engine

### ModuleOperatingShell
**What it is:** The standard page layout wrapper that all three engine pages (DeepReal, Mental Health, Religion Hub) share. It provides: a hero banner with a gradient, the engine's tagline and action buttons, a disclaimer block, the core question the engine answers, navigation links, and the Module Command Center. Each engine uses the same frame but with its own colors, icon, and text.
**When it helps you:** Ensures that whether you are on the Mental Health page or the DeepReal page, the layout feels consistent and you always know where to find the same types of tools — no relearning needed when switching engines.

---

## science/osint-terminal — Live Open-Source Investigation

### OsintTerminal
**What it is:** A streaming investigation terminal. You submit a claim or topic, and watch a multi-step investigation happen in real time: a planner designs the investigation → a scraper fetches sources from the web → the scraped sources appear with their URLs → a synthesizer combines everything into a final report that appears in readable formatted text. (OSINT = Open-Source Intelligence — investigating using only publicly available information, like websites, social media, and news archives.)
**When it helps you:** You want to investigate whether a viral story is based on real events. You submit the claim and watch the platform scrape real web sources and assemble a cited report in front of you — like watching a journalist do their research live.

---

## science/protocol-workbench — Structured Evaluation Checklist

### ProtocolWorkbench
**What it is:** A dynamic form that loads a research-backed evaluation protocol for a specific type of content (for example: "Is this religious claim manipulative?"). The form has different question types — yes/no, scale from 1–10, multiple choice, or open text. After you complete it and submit, the platform scores your responses and returns: a score, a severity level, an Egyptian-context note, and a recommended next action.
**When it helps you:** You are evaluating a specific claim and want to be systematic instead of going on gut feeling. The protocol walks you through every relevant question in a structured order so you do not miss anything important.

---

## science/quarantine-provider — Emergency Mental Cool-Down

### QuarantineProvider
**What it is:** A safety mechanism that covers the entire screen with a blurred overlay when the platform detects that you have just been exposed to extremely toxic or manipulative content (scoring above 95 out of 100 on a toxicity scale). The overlay shows why it was triggered and runs a guided 4-7-8 breathing exercise (breathe in 4 seconds, hold 7 seconds, breathe out 8 seconds) with an animated progress bar. The screen only unlocks after you complete the breathing exercise.
**When it helps you:** You have just read a deeply disturbing, psychologically manipulative piece of content. Instead of immediately reacting and potentially making a poor decision (sharing, arguing, feeling overwhelmed), the platform forces a calm breathing pause. You emerge from it more grounded.

---

## science/religion-tripillar-ui — Religion Hub Three-Pillar Demo

### ReligionTripillarUI
**What it is:** An interactive slider that lets you adjust a "chaos level" from calm to extreme. As you increase the chaos level, the screen's visual theme shifts (colors change, background blurs) representing increasing psychological instability. The tool shows three phases the platform uses to help: RECONSTRUCT (rebuild understanding) → STABILIZE (steady the foundation) → ANCHOR (fix the correct belief firmly). At extreme chaos levels, an "epistemic quarantine" is triggered, protecting the user from further destabilization. ("Epistemic" = relating to knowledge and belief — an epistemic quarantine means pausing input of new claims that could further destabilize someone's beliefs.)
**When it helps you:** A trainer demonstrates to an audience how the Religion Hub platform responds when someone is in a state of extreme religious confusion — and what the three phases of recovery look like in practice.

---

## science/reporting-console — Printable Progress Report

### ReportingConsole
**What it is:** A printable summary dashboard showing: progress statistics for each engine module, a list of evidence claims with their data snapshots, a count of how many sources are live versus failed, and recommended next steps per module. Clicking the print button sends it to your printer or saves it as a PDF.
**When it helps you:** An administrator or educator wants a printed report of where the platform's evidence stands and how far along users are in each module — for a meeting, a grant application, or a supervision session.

---

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

---

# Sources, Scroll Story & UI Building Blocks (plain-language)
## comp-4 — Items 154 to 205 — Written for someone with zero technical background

---

## GROUP A — Trusted Sources Components

---

### 154 · ComprehensiveResourceDirectory
**What it is:** A big organized list of helpful websites and books, sorted into categories like "health," "fact-checking," "crisis help," and "academic research." You can jump straight to the category you need by clicking its name in a menu on the side. The page works in both English and Arabic, and automatically flips the text direction (right-to-left) when you switch to Arabic — just like how Arabic newspapers look.
**When it helps you:** You want to verify a scary health rumor but don't know which websites to trust. You open this page, click "Health Sources," and instantly see a curated list of reliable health organizations.

---

### 155 · MegaMenu
**What it is:** A big pop-up panel — think of it like a mini directory — that appears when you click "Trusted Sources" in the top navigation bar. It shows about 22 reliable websites organized by topic (health, religion, fact-checking, science, crisis). Each website gets a letter grade (A, B, or C) so you know at a glance how trustworthy it is. You can also type in a search box to find a specific source fast. Press Escape or click anywhere outside the panel to close it.
**When it helps you:** You're reading an article and want to quickly check if a source is credible. You click "Trusted Sources" at the top of the page, and the panel pops up with graded sources sorted by topic — no need to leave the page.

#### Sub-feature: TrustedQuickAccess
**What it is:** A small colored button that lives permanently in the top navigation bar. Clicking it opens or closes the MegaMenu panel. The button's color tells you which trust grade the current category holds.
**When it helps you:** You're anywhere on the website and want instant access to the trusted sources panel without having to navigate to a separate page.

---

### 156 · SourceRegistry
**What it is:** A full directory page where you can browse every single source the platform uses and trusts. You can search by name, filter by type, and see a freshness label for each source — "fresh" means it was checked recently, "stale" means it hasn't been verified in a while. For each source, you can read a plain-language explanation of why the platform trusts it, what role it plays, and when it was last checked. Nothing is listed without a reason.
**When it helps you:** A researcher or curious reader wants to know: "Why does this website trust this source? When was it last checked?" They open the Source Registry and expand any source card to read the full explanation.

---

## GROUP B — The Descent: Story Sections

*These are the chapters of a scroll-through story called "The Descent" — an interactive experience that walks you through how dangerous misinformation spreads and how to defend yourself against it.*

---

### 157 · BlastRadiusSection
**What it is:** A visual scene in the scroll story labeled "THE BLAST RADIUS." It puts YOU in the center of a diagram surrounded by five rings representing the areas of life that fake health news can damage: medicine, religion, economics, politics, and society. Each ring's size reflects how big the damage is in that area. You can click filter buttons to switch topics and see a color-coded map of Egypt showing where the impact is heaviest. Every number shown comes with a cited source.
**When it helps you:** You wonder: "How much real harm does health misinformation actually cause in Egypt?" This scene shows you the scale visually — you can see that it doesn't only hurt individuals, it damages the economy, religious trust, and politics too.

---

### 158 · ClimbTurnSection
**What it is:** A scene in the scroll story called "THE FLIP." This is the turning point — the moment the whole story shifts from dark and scary (red color scheme) to hopeful and forward-moving (blue-green). The background color changes, the headline switches from "FALL" to "RISE," and a progress gauge drains and resets. The first time you reach this scene, the website quietly remembers you've been here, so if you return to the page later it can offer you a shortcut past the beginning.
**When it helps you:** After learning how destructive misinformation is, this moment marks the shift toward solutions. It's the emotional pivot point that tells you: now we start climbing out.

---

### 159 · CognitionShaft
**What it is:** A scene in the scroll story called "COGNITION." As you scroll down, a ladder appears and each rung lights up one by one. Every rung shows a deception trick being "overwritten" by a defense skill — like erasing a lie and writing the truth over it. There's also a spider-web-shaped chart (called a radar chart) showing how effective each defense skill is. The whole thing is bilingual — you can toggle between English and Arabic. Every claim cites its source.
**When it helps you:** You want to understand not just what the tricks are, but what specific skill you can use to counter each one. This ladder makes it concrete and progressive — you literally watch each deception get replaced by its antidote as you scroll.

---

### 160 · DepthRail
**What it is:** A thin navigation strip fixed to the side of the page while you scroll through "The Descent" story. It shows a scale from −8 (deepest, most dangerous) to +8 (fully defended). As you scroll, an animated fill grows or shrinks to show how deep into the story you are. You can click any marker on the strip to jump to that part of the story. On a small phone screen, the labels hide and only the thin bar remains.
**When it helps you:** You're deep in the scroll story and lose track of where you are. The side rail tells you at a glance: "I'm at level −5 out of −8" — like a depth gauge on a submarine.

---

### 161 · DescentExperience
**What it is:** The master controller for the entire "The Descent" page. It's the invisible engine behind the scenes that manages everything: the scroll speed, the color shifts between sections, which scene is currently active, and the animated background effects. It stitches together all 20 scenes in the correct order. It also shows a "Skip" button for returning visitors who don't want to watch the whole story again.
**When it helps you:** You don't interact with this directly — it's what makes the whole scrolling story feel smooth, connected, and consistent from beginning to end.

---

### 162 · DescentLayer
**What it is:** A reusable template for each of the 8 "deception layers" — the 8 different tricks that fake news uses. You pass in a layer number (1 through 8) and it builds the whole section: a big ghost number on screen, a mini visualization unique to that deception type, a real-world case study card you can open, bilingual text, and atmospheric visuals. Think of it as the mold that stamps out each chapter of the story.
**When it helps you:** The story needs 8 chapters for 8 deception tricks. Instead of building 8 separate pages, one smart template handles all of them — ensuring they all look and feel consistent.

#### Sub-feature: LayerViz (internal dispatcher)
**What it is:** The part inside DescentLayer that decides which mini-chart or diagram to show for each layer. Layer 1 gets a diagram of a fake citation chain. Layer 2 gets a bar chart showing what information is hidden versus shown. Layer 3 gets an animation of a quote being shown in pieces then restored in full. Layer 4 gets a timeline. Layer 5 gets a heart monitor flatline. Layer 6 gets a "backfire" diagram. Layer 7 gets a flow map. Layer 8 gets a chart showing a range of uncertainty.
**When it helps you:** Each deception trick is different, so it needs a different kind of picture to explain it. This dispatcher picks the right visual automatically based on which layer you're reading.

---

### 163 · FloorSection
**What it is:** A scene in the scroll story called "THE FLOOR" — the darkest, most serious moment. The screen goes nearly black with a single slow red glow. Two real death-case cards appear, citing their sources. A pulsing dot reads: "…and the lie is still being forwarded." No animation. No noise. Maximum stillness.
**When it helps you:** This is the emotional rock bottom of the story — the moment when the real-world cost of believing fake health news is stated directly, quietly, and with evidence.

---

### 164 · GatewayDoor
**What it is:** A scene in the scroll story called "THE DOOR" — the final exit. An animated golden door drawn in SVG (a type of computer graphic) swings open as you reach it. Tiny dust particles drift across the screen. Final messages appear, and two buttons invite you to continue to the next chapter of the platform or go home.
**When it helps you:** You've finished "The Descent." This scene gives you a clear, beautiful exit point — and points you toward the next step in learning how to protect yourself.

---

### 165 · ProblemSection
**What it is:** An early scene in the scroll story called "THE GAP." It shows three cards explaining three ways people fail to handle misinformation: they can't reach good information, they can't verify it, and they can't apply what they know. A word cycling animation shows the danger escalating: "Real → Harmful → Dangerous → Single most dangerous thing." A word pulses on screen: "killed." The text is available in English and Arabic.
**When it helps you:** Before the 8 deception tricks are introduced, this scene frames why any of this matters — misinformation gaps aren't just annoying, they can be lethal.

---

### 166 · ThreadSection
**What it is:** The opening scene of "The Descent," labeled "THE THREAD." It recreates a real WhatsApp message — styled to look like the actual app, with the green color and chat bubble — containing a false health claim that led to a real death. As you scroll away from it, the green color slowly drains from the bubble, going gray, as if the lie is losing its life. There's also a scrolling strip of lie-phrases at the bottom, and a magnetic "Forward" button that wobbles when you hover near it — a subtle reminder of how easy it is to pass dangerous messages along.
**When it helps you:** The story needs to hook you immediately with something real and recognizable. A WhatsApp message everyone has seen before makes the danger feel personal and immediate, not abstract.

---

### 167 · ToolsFilmstrip
**What it is:** A scene in the scroll story called "THE VERIFICATION ARSENAL." It shows rows of verification tools, one for each type of deception. Each row can be expanded to see how strong the tool is, what its limits are, and a live count of how many real sources back it up. That count is fetched live from the website's own evidence database every time you open the page (with a 6-second timeout in case the internet is slow). There's also a 5-step verification process diagram. Available in English and Arabic.
**When it helps you:** You want to know: "What tools actually exist to check if something is fake, and how well do they work?" This scene answers that, with live evidence counts so you know the numbers are current.

#### Sub-feature: useEvidenceCount (hook)
**What it is:** A small behind-the-scenes helper that silently contacts the platform's evidence database and returns a live count of supporting sources for each verification tool. It handles slow connections gracefully — after 6 seconds it gives up rather than freezing the page.
**When it helps you:** You see a badge on a tool saying "247 sources." That number came from this helper contacting the database just now — not from a number typed in months ago.

---

## GROUP C — The Descent: Hero Banner and Persistent UI

---

### 168 · Hero (DW)
**What it is:** The very first thing you see when you open "The Descent" — the big cinematic title screen. The words "النزول" (Arabic for "The Descent") and "THE DESCENT" appear in giant overlapping letters, one slightly offset behind the other for a dramatic effect. A silhouette of a person hunched over their phone sits in the center. A slow rotating wireframe globe spins in the background. A diagonal scrolling strip of crossed-out lie-phrases runs across the screen. In the bottom corner, a box names a real death case with a button inviting you to enter.
**When it helps you:** This is the opening frame — it sets the serious, documentary tone of the whole experience before you start scrolling through the story.

---

### 169 · LayerLegend
**What it is:** A color key that stays visible while you move through the story, showing which of the 8 deception layers you're currently reading about. Each layer has its own color (like a legend on a map), and the active one is highlighted. On smaller screens it shrinks to just colored squares with numbers. Works in both English and Arabic.
**When it helps you:** You're mid-story and forget which deception type you're currently looking at. The color key on the side reminds you instantly — like a bookmark that tells you the chapter name.

---

### 170 · TierBadge
**What it is:** A small colored label that appears next to any claim or source to show how strong the evidence behind it is. The grades are: S (strongest), A, B, C, CONTESTED (experts disagree), or UNVERIFIED (no source provided). If you hover over the badge, a tooltip explains what the grade means.
**When it helps you:** You're reading a statistic on the platform and want to know: "How solid is this number?" The badge tells you at a glance — green for strong, red for unverified.

#### Sub-feature: TierLegend (compact key)
**What it is:** A small horizontal strip that lists all six evidence grade badges (S through UNVERIFIED) with their labels, so you can see the full scale in one place.
**When it helps you:** You encounter a badge you haven't seen before (like "CONTESTED") and want to understand the full grading system. This strip shows all grades side by side.

#### Sub-feature: TierKeyToggle
**What it is:** A small floating button fixed on the page that you can click to show or hide the full evidence grade legend without interrupting your reading or scrolling.
**When it helps you:** You want to quickly check what the grades mean without scrolling to a separate section or leaving the page.

#### Sub-feature: resolveTierKey
**What it is:** A behind-the-scenes rule that decides which grade badge to show. It looks at three things: the official grade, whether the claim is contested, and whether a source was actually provided. If no source is given, it automatically escalates to "UNVERIFIED" — no silent empty badges allowed.
**When it helps you:** This runs invisibly every time a badge is displayed, ensuring that a claim without a source is always flagged as unverified rather than accidentally appearing credible.

---

## GROUP D — The Descent: Individual Layer Scenes

---

### 171 · ArchitectsSection
**What it is:** The scene for Layer 7, called "THE ARCHITECTS." It shows a constellation diagram — a picture of dots connected by lines — representing the network of people and institutions that spread and amplify misinformation. Your position in the network (the "YOU" dot) is highlighted in red. Two real-world example cards show how this works globally and in Egypt. The background has a slow animated grid to reinforce the "network" feeling.
**When it helps you:** You want to understand that misinformation isn't always random — sometimes there are systematic actors (organizations, platforms, coordinated groups) that deliberately amplify it. This scene makes that visible.

---

### 172 · BiasedLensScene
**What it is:** The scene for Layer 2, called "BIASED LENS." It shows an iceberg diagram. The tip above the water — the part you can see — represents the success stories (testimonials, people who say a remedy worked). The massive hidden part below the water represents all the people who were harmed or died and whose stories were never shared. Floating orange bubbles animate upward from the dark water. The real case is cited with a source.
**When it helps you:** Someone shows you ten people who say a remedy worked. This scene reminds you to ask: "How many people tried it and got worse — and why aren't their stories being shown?"

---

### 173 · DecontextScene
**What it is:** A dramatic Layer 3 scene showing how religious text can be deceptively cut down. A fragment of an Arabic religious phrase appears alone on screen, looking ambiguous or alarming. Then a line draws across it and the full original verse is gradually revealed — restoring the meaning that was hidden when only the fragment was shown. The full Arabic text is never split mid-word or mid-sentence.
**When it helps you:** Someone sends you a short religious quote that seems to support a dangerous claim. This scene shows you that cutting a verse down changes its meaning entirely — and demonstrates how to restore the context.

---

### 174 · DecontextSection
**What it is:** A longer, magazine-style version of the Layer 3 decontextualization lesson, this time using a scientific example. It shows the famous Darwin quote: "the eye seems absurd" — which gets shared as proof that even Darwin doubted evolution. Then it reveals the full sentence, which actually says the opposite. Red shows what they cut. Gold shows what they deleted. An "AHA" panel explains the trick. Available in English and Arabic.
**When it helps you:** You see a quote from a scientist or scholar shared to prove something surprising. This scene shows you how deliberately cutting a quote turns its meaning upside-down.

---

### 175 · FabricationScene
**What it is:** The scene for Layer 1, called "ABSOLUTE FABRICATION." It shows a diagram of a fake citation chain: three real-looking sources that all trace back to nothing — an empty void marked with an X. Rising ember particles float upward from the broken chain. Real statistics about fabricated health products and fraud cases appear — every number sourced and cited.
**When it helps you:** You see an article that cites sources, and the sources cite other sources — but when you trace all the way back, there's nothing real there. This scene shows how that fabrication chain is built.

---

### 176 · ImmunitySection
**What it is:** A visual scene explaining the idea of "cognitive immunity" — the mental equivalent of being vaccinated against misinformation. Orbiting shield-ring animations, floating particles bouncing off a shield, and mandala-like rings create a sense of protection. It explains the three steps: you get a "dose" of the trick (learn what it looks like), your mind "responds" (recognizes it), and you become "immune" (don't fall for it anymore). It also includes an honest note about the limits of this approach.
**When it helps you:** Before the defense section begins, this scene explains the whole philosophy: learning about manipulation tricks in a safe environment makes you less likely to fall for them in real life.

---

### 177 · KillSection
**What it is:** The scene for Layer 5, called "THE KILL" — the emotional peak of the story. Black cinema bars appear at the top and bottom of the screen, like a movie in letterbox format. A full-width heart-monitor line (the kind you see in hospitals) draws across the screen — then flatlines. A beats-per-minute counter animates down to zero. The headline in Arabic reads: "He heard that insulin was 'a lie' — so he stopped taking it." Every medical statistic is cited.
**When it helps you:** This is the moment the story becomes undeniable. A real person died because of a health lie they believed. The flatline and the counter make that loss visceral and impossible to dismiss.

---

### 178 · MatrixSection
**What it is:** The scene for Layer 6, called "THE MATRIX." It shows concentric rings with the words "You're inside" at the center — because by this point in the story, the reader is meant to realize they are already embedded in a misinformation environment, not watching from the outside. Two example cards show how this applies globally and in Egypt. Small floating dust particles add depth.
**When it helps you:** This scene is the moment of recognition: misinformation isn't something that happens to other people — you are already inside the information environment it shapes.

---

### 179 · SpreadSection
**What it is:** A scene called "THE SPREAD" showing how misinformation travels across five platforms: Facebook, TikTok, X (formerly Twitter), YouTube, and WhatsApp. Each platform gets its own distinctly colored tile. A sourced statistic shows how quickly fake news spreads compared to true news. Available in English and Arabic.
**When it helps you:** You want to understand which platforms are most responsible for spreading health misinformation in Egypt. This scene breaks it down platform by platform with evidence.

---

### 180 · StandardSection
**What it is:** A scene called "THE ONE LAW" — a visual gate showing the platform's core rule. Two lanes are shown side by side: Lane 1 shows a claim paired with a source and gets a green checkmark labeled "verified." Lane 2 shows a claim with no source and gets a red X labeled "unverified." A cyan glow surrounds the verified lane. This is the rule the entire platform is built on: no claim without a real source.
**When it helps you:** This scene makes the platform's anti-fabrication rule visible and memorable — if there's no source, the claim doesn't pass. Simple as that.

---

### 181 · TimingScene
**What it is:** The scene for Layer 4, called "WEAPONIZED TIMING." It shows a timeline diagram where a real event (a natural death) is marked on the left. Then, much later on the right, a second marker appears: a coordinated false video claiming the person was murdered. The delay between the two markers is drawn in slowly via an animation, making the gap visible. Available in English and Arabic.
**When it helps you:** Someone dies of natural causes. A week later, a video appears claiming they were killed for exposing a conspiracy. This scene shows how that deliberate timing gap is the trick — false narratives are released after the initial confusion has faded.

---

### 182 · UnknownScene
**What it is:** The scene for Layer 8, called "THE UNKNOWN." Animated fog blobs drift across a dark background. A chart appears showing a range of possibility that refuses to collapse to either 0% or 100% — because honestly, some things are genuinely uncertain. The scene is designed to teach calibrated humility: admitting "I don't know for certain" is not weakness, it's accuracy. The contested case is cited with a source.
**When it helps you:** Someone says: "Scientists can't agree on this, so it must be fake." This scene explains the difference between "genuinely uncertain" and "fabricated" — and shows that sitting with uncertainty is intellectually honest.

---

## GROUP E — The Descent: Shared Reusable Pieces

---

### 183 · DefenseChip
**What it is:** A small bilingual label (like a badge or tag) that summarizes one defense skill for a specific deception layer. In compact mode it shows just the skill name in English and Arabic. In full mode it adds the core idea behind the skill and a citation. If the layer doesn't exist in the system's knowledge, a warning symbol appears instead of inventing something.
**When it helps you:** Throughout the story, these chips appear as quick reminders: "For this trick, the defense is [skill name]." Like a flash card pinned to the page.

---

### 184 · FailLoud
**What it is:** A big, obvious red error card that appears whenever data is unavailable. It says clearly: "UNVERIFIED — DATA UNAVAILABLE." It never silently shows nothing, never makes up a replacement number, and never pretends the data is there when it isn't. It's announced to screen readers as an alert.
**When it helps you:** If a map or statistic fails to load, you see a clear red card explaining that the data isn't available — rather than a mysteriously blank space that might make you think the answer is zero, or worse, a made-up number.

---

### 185 · LayerTag
**What it is:** A small colored pill-shaped label that tags any piece of content with the deception layer it belongs to, for example "L3 — Decontextualization." Each layer has its own color. If you try to show a layer number that doesn't exist, it shows "UNKNOWN" with a warning symbol instead of crashing silently. There's also a smaller version for tight spaces.
**When it helps you:** You're reading a case study or a statistic and want to know: "Which type of deception trick does this belong to?" The tag tells you instantly, and the color connects it back to the color key.

---

### 186 · Sourced
**What it is:** The single most important rule-enforcer on the entire platform. Every factual number or claim anywhere on the website must be wrapped in this component, which requires: the claim text, a quality grade (like A or B), and a non-empty source name. If the source is missing or the grade is empty, it automatically shows a red "UNVERIFIED" badge instead of letting the claim pass silently. If experts dispute the claim, it shows a violet "CONTESTED" badge. This is the technical guard that makes the One Law (no claim without a real source) actually work in practice.
**When it helps you:** Every time you read a statistic on this platform — "53.9% of Egyptians self-medicate," for example — it's been through this check. The system literally cannot publish a bare number without attaching a grade and a source.

---

## GROUP F — The Descent: Visual Building Blocks

---

### 187 · DisplayType
**What it is:** A special headline component for big, dramatic section titles. It layers the same text twice: one copy is filled solid, the other is just an outline slightly behind it, creating a ghost-shadow effect. The filled text can use a color gradient. The size adapts smoothly to any screen. On phones or when the user has asked for reduced motion (in their accessibility settings), the ghost layer is hidden to keep things clean and readable.
**When it helps you:** Every big chapter title in "The Descent" story uses this — giving the story a cinematic, documentary-film feel rather than a flat blog look.

---

### 188 · DuotoneFrame
**What it is:** A visual filter that turns an image into a two-color dramatic picture — like an old movie poster that only uses two ink colors. The colors used match the current section's accent color (so the descent uses deep reds, the climb uses teals). It has two built-in shapes: a human silhouette and a branching Nile-delta pattern. It never uses photographs of real people's faces.
**When it helps you:** Throughout the story, these duotone figures appear to represent "a person" without using any specific individual's likeness — connecting the human element of the story to the visual language of each section.

#### Sub-feature: hexToUnit
**What it is:** A tiny behind-the-scenes converter that turns a color code (like `#FF5500`) into the number format that SVG image filters need (which is a number between 0 and 1 instead of 0 and 255).
**When it helps you:** This runs invisibly whenever a duotone filter is applied, enabling the platform to accept any color code and automatically convert it to the format the filter requires — no manual calculation needed.

---

### 189 · GlassPanel
**What it is:** A frosted-glass card style — the kind you see in modern phone interfaces where the background blurs through a translucent panel. The glow color around the card matches the current section's accent color. You can adjust the padding (space inside the card), choose to add a glow effect, and use it as different HTML element types (article, section, list item, etc.).
**When it helps you:** Case study cards, WhatsApp chat bubbles, and various information boxes throughout the story use this style to look polished, layered, and visually distinct from the background.

---

### 190 · GradientGrade
**What it is:** An invisible full-page color wash that always sits on top of everything but never blocks clicks. It fills the screen with a gentle two-color gradient that matches the current section's palette. As you scroll faster, the colors subtly shift hue — like the lighting changing as you walk through different rooms. When the story flips from descent (dark red) to climb (teal), the gradient smoothly cross-fades. On phones or when reduced motion is set, it stays perfectly still.
**When it helps you:** You may not consciously notice this layer, but it's what gives each section a unified atmospheric feel — the "room" of each chapter has its own ambient lighting.

---

### 191 · GrainOverlay
**What it is:** Another invisible full-page layer — this one adds a subtle film-grain texture, like the faint noise you see in old photographs or documentary footage. The grain intensity changes slightly between the dark descent sections and the brighter climb sections. A faint scanline pattern (thin horizontal lines, like on an old TV) is layered underneath at even lower intensity.
**When it helps you:** Combined with the color wash above, this grain layer is what makes "The Descent" feel like a serious documentary rather than a typical website. It adds visual texture that your eye reads as "authentic" and "weighty."

---

### 192 · HighlightBox
**What it is:** A simple accent box — a thin colored border with a faint fill — that draws attention to a key term or statistic. Small decorative corner ticks appear in the accent color, like the corners of a photograph holder. It never animates, so it's safe for users who have motion sensitivity. The accent color automatically matches the current section.
**When it helps you:** When a key term like "53.9%" or a layer name needs to be called out on the page without a distracting animation, this box creates a visual anchor without movement.

---

### 193 · KineticMarquee
**What it is:** A diagonal scrolling strip — like a hazard tape or a ticker-tape banner — running across sections of the page. In the descent (dark) zone, the strip shows Arabic lie-phrases crossed out in blood-red, displayed as museum artifacts (they are labeled as examples, never asserted as true). In the climb (hopeful) zone, the strip instead shows defense techniques in teal. On phones or when the user has asked for no motion, the strip stands still at an angle instead.
**When it helps you:** The visual texture of these scrolling strips reinforces the emotional tone of each section — crossed-out lies in the dark part, hopeful defenses in the bright part.

#### Sub-feature: DESCENT_LIE_PHRASES
**What it is:** The stored list of Arabic lie-phrases that appear crossed out on the descent-zone hazard tape.
**When it helps you:** These are the specific phrases the platform has identified as common dangerous claims — displayed as museum exhibits, always struck through, so readers know these are examples of misinformation, not true statements.

#### Sub-feature: CLIMB_DEFENSE_PHRASES
**What it is:** The stored list of Arabic defense-technique phrases that appear on the climb-zone marquee tape.
**When it helps you:** As the story shifts to solutions, these phrases replace the lie-phrases — reinforcing the transition from "here is the danger" to "here is what you can do about it."

---

### 194 · NeonStat
**What it is:** A glowing chip that presents an important number or statistic. It has a colored border, a faint background fill, and a neon-glow shadow that matches the current section's color. Inside the chip, the number itself can be animated (counting up from zero). The source and grade are always attached — the chip can't show a number without a citation.
**When it helps you:** Key statistics in the story — like a death toll or a percentage — appear in these glowing chips, making them visually prominent while still keeping their sources attached.

---

### 195 · OrbField
**What it is:** A background decorative layer of soft glowing spheres that drift slowly across the page. They're made with simple CSS gradients (not a heavy 3D engine), so they don't slow your device down. Their positions are mathematically fixed so the page looks the same every time it loads (no random shuffling). On phones or with reduced-motion settings, they hold still.
**When it helps you:** These orbs give the page a sense of depth and space — like looking into a dark room where light sources are slowly moving. It's atmospheric without being distracting.

---

### 196 · ParallaxLayer
**What it is:** A wrapper that makes background elements scroll at a different speed than the main content — slower or faster. This creates a sense of depth, like how distant mountains seem to move more slowly than nearby trees when you're in a moving car. You can set how strong the effect is and cap the maximum distance it travels. On phones or with reduced-motion settings, everything scrolls at the same speed.
**When it helps you:** Background globes, large text layers, and decorative figures in the story use this to feel like they're on a different visual plane — adding cinematic depth to the experience.

---

### 197 · ScrollReveal
**What it is:** A wrapper that makes content fade in smoothly as you scroll down to it. What makes this one special is that it has three separate safety checks to make sure content never accidentally stays invisible: (1) it checks immediately on load if the content is already on screen, (2) it watches for the content entering the screen using a sensor, and (3) it has a backup listener in case you skipped to this section very quickly. Once content has appeared, it stays visible. With reduced-motion settings, content appears instantly without any animation.
**When it helps you:** If you've ever seen a website where content never appeared because you scrolled too fast, this solves that problem. The three-check system means you'll never see a blank section.

---

### 198 · SectionKicker
**What it is:** A small sideways text label (rotated 90 degrees, running vertically) pinned to the left or right edge of a section, like you'd see in a magazine layout. It shows the section number and name, for example "00 — THE THREAD." On small screens it rotates back to horizontal and shrinks. It uses no animation, so it's safe for motion-sensitive users.
**When it helps you:** As you scroll through the story, these vertical labels keep you oriented — telling you the name and number of the current chapter, like a margin note in a book.

---

## GROUP G — The Descent: Data Visualizations

---

### 199 · EgyptChoropleth
**What it is:** An interactive map of Egypt's 27 governorates (provinces), colored by misinformation impact. Darker colors mean heavier impact. You can click topic buttons (health, religion, economics, etc.) to switch which type of misinformation the map is showing. Each governorate is a distinct filled shape — no flat blocks, proper borders between them. An honest label explains that the color distribution is modeled (estimated from patterns), not directly measured. If the map data file is missing, a clear red error card appears. There is also a plain text table version of the same data for accessibility.
**When it helps you:** You want to see whether health misinformation hits some parts of Egypt harder than others, and to compare that across different topics. The map makes geographic patterns visible at a glance.

#### Sub-feature: nameHash
**What it is:** A small mathematical formula that takes a governorate's name and turns it into a consistent number between 0 and 1. This number is used to decide the governorate's color on the map — the same name always produces the same number, so the map looks identical every time the page loads.
**When it helps you:** Without this, the map's colors would look different every time you refreshed the page. This formula makes it stable and consistent, while clearly being labeled as a modeled estimate rather than real measured data.

---

### 200 · FlowMap
**What it is:** A visualization showing how misinformation spreads outward from Cairo across all of Egypt. It draws curved lines (called arcs) from Cairo to every other governorate on a real map of Egypt. Thicker, brighter lines mean stronger connections. Cairo's dot is bigger because it's the hub. The arcs draw themselves in slowly via animation when you scroll to this section. Tiny particles travel along the arcs on larger screens. If the map data file is missing, it falls back to a simpler abstract diagram with an honest note. All numbers are sourced.
**When it helps you:** Layer 7 of the story is about institutional amplification — how misinformation moves through networks. This map makes that geographic spread concrete: you can literally watch it radiate outward from Cairo.

---

### 201 · ScrubLineChart
**What it is:** A small chart component with two modes. Mode 1 ("split-bar"): a bar chart where one half of each bar is fully painted (what's shown to you) and the other half is blocked out (what's hidden from you) — illustrating how health product promoters show only the success stories and hide the failures. Mode 2 ("confidence-band"): a chart showing a range of likely values with a needle that settles inside the range but deliberately never reaches 0% or 100% — illustrating that honest uncertainty means acknowledging you can't be completely sure. Both animate smoothly when you scroll to them.
**When it helps you:** Layer 2 uses the split-bar to show selection bias visually. Layer 8 uses the confidence-band to show that calibrated uncertainty is honest — claiming to be 100% sure is usually a red flag.

---

## GROUP H — General UI Components

---

### 202 · CalmReveal
**What it is:** A wrapper that can slow down the display of emotionally intense content. It checks whether a piece of content has been scored as highly emotional (using a score above 0.7 on a 0–1 scale). If it has, the content is held behind a timed "breathing gate" — you must wait and breathe for a moment before it reveals. If the score is low, the content appears immediately with a gentle fade. This is designed to protect you from reacting impulsively to emotionally charged information.
**When it helps you:** You ask the AI about a scary health claim you received. Instead of the answer instantly appearing and potentially triggering panic, this gate gives you a few seconds to breathe first — reducing the chance you'll forward the message without thinking.

---

### 203 · MegaNav
**What it is:** The main navigation dropdown menu for the whole website. It has 5 top-level categories (Intelligence, Defense, Curriculum, Human, Platform), and each category reveals a grid of 6 destinations when you hover over it — 30 total places you can go. Each destination shows an icon, a name in English and Arabic, and a short description. A sliding animated pill moves between category names as you hover. The dropdown centers itself under the active category and stays within the screen edges. When you switch to Arabic, the layout automatically mirrors to right-to-left.
**When it helps you:** You're anywhere on the platform and want to navigate to a different section. This menu gives you a clear, visual overview of everything available without having to go back to the homepage.

---

### 204 · PremiumCharts
**What it is:** A simple bar chart built with pure CSS (no heavy charting libraries). You give it a list of numbers with labels and a color, and it draws proportional bars. When you hover over a bar, a small tooltip shows you the exact number. Bar labels are angled at 45 degrees so they don't overlap. The bars smoothly animate to their height when the chart first loads.
**When it helps you:** Admin pages or simple data displays on the platform need a lightweight chart without loading a full charting engine. This provides a clean, readable bar chart for straightforward comparisons.

---

### 205 · TimeFrictionGate
**What it is:** A mandatory pause screen that appears before emotionally intense content. A circular ring pulses gently in and out (like a slow breath) while a percentage counter climbs from 0 to 100 over about 5 seconds. When it reaches 100, the content behind it becomes visible. The breathing ring is specifically designed to calm your nervous system — the slow oscillation mirrors a breathing exercise. You can't skip it.
**When it helps you:** Before you read an AI analysis of a claim you found emotionally upsetting — like a death threat shared about vaccines — this 5-second breathing pause is a research-backed anti-impulsivity measure. It reduces the chance you'll react by forwarding or sharing without thinking.

---

## Feature Count Summary

| Group | Topic | Features |
|---|---|---|
| A — Sources Components | Trusted sources directory and registry | 4 |
| B — Descent Top-Level Sections | Story chapter scenes | 15 |
| C — DW Hero + Persistent UI | Opening screen and persistent labels | 8 |
| D — DW Layer Scenes | Individual deception layer visualizations | 12 |
| E — Descent Shared Primitives | Reusable story building blocks | 4 |
| F — Visual Primitives | Atmospheric and cinematic visual effects | 17 |
| G — Data Visualizations | Maps and charts | 5 |
| H — UI Components | General site-wide interface components | 4 |
| **TOTAL** | | **69** |

---

# Data & Content Assets — slice data-1 (plain-language)

This section covers all the behind-the-scenes data files that power the Egyptian Awareness Library's learning platform. Think of these files as the "ingredients" the website reads before showing you lessons, tests, and exercises. There are starting tests, lesson blueprints, fake-news case files, and day-by-day lesson plans.

---

## Starting Tests (before your first lesson)

These are the files that run the quiz you take on Day 0 — before you learn anything — so the platform knows your starting point and can measure how much you improve.

### Claim Confidence Test (12 questions)

**What it is:** A set of 12 true-or-false statements — one from each of the three main topics the platform covers (fake videos/audio, health claims, religious messages). Each statement is written in English, formal Arabic, and Egyptian dialect. The platform checks whether you believe the statement, records how confident you feel, and notes whether the statement is actually true or false. It is like a vision-test for your lie-detector: it measures how sharp your BS detector is before any training.

**When it helps you:** On your very first day, the platform shows you these 12 statements to get a picture of where you start. Later, after weeks of lessons, it runs a similar test so you can see exactly how much you improved at catching false claims.

---

### Source Ranking Quiz (2 scenarios, 8 sources each)

**What it is:** Two short exercises where you drag and sort eight different information sources from "most trustworthy" to "least trustworthy." The sources might include things like a medical journal, a government website, a celebrity's Instagram post, or a WhatsApp forward. The platform already knows the correct order and checks how close your ranking is.

**When it helps you:** Before any lessons, this quiz reveals whether you already know which sources deserve your trust. If you would rank a celebrity post above a medical journal, the platform knows to focus your early lessons on source evaluation.

---

### Emotion vs. Evidence Test (5 matched pairs)

**What it is:** Five pairs of statements. In each pair, one statement says the same thing in calm, plain language, and the other says the same thing in scary or outrage-triggering language — but both versions have exactly the same level of evidence behind them. The platform tracks whether you rate the two versions differently, which would show that your emotions are steering your judgment rather than the facts.

**When it helps you:** This catches a very common weakness: many people believe a scary-sounding claim more easily than a calm one, even when the evidence is identical. Knowing this about yourself early helps you watch out for it.

---

### Comfort vs. Accuracy Test (4 matched pairs)

**What it is:** Four pairs of statements. In each pair, one statement is comforting and easy to believe, the other is accurate but uncomfortable. The platform checks whether you prefer the comfortable version even when the evidence says it is weaker. This measures your "comfort bias" — how much you let the desire to feel safe override your search for truth.

**When it helps you:** Before lessons begin, this shows the platform (and you) whether you tend to believe reassuring things over accurate things. If you do, lessons will focus on helping you sit with uncomfortable truths.

---

### Module Starting Tests (3 domain tests)

**What it is:** Three short scored tests — one for fake videos and audio, one for health claims, and one for religious texts — each with their own questions in English and Arabic. These give the platform a starting score for each of the three main topics separately.

**When it helps you:** Because you get a separate starting score for each topic, you can later see which areas you improved in most. For example, you might start out already good at spotting health myths but weak at recognising a fake religious quote — the platform uses this to personalise your learning path.

---

## Platform Blueprint

### Platform Blueprint Document

**What it is:** The full scientific foundation of the entire platform, saved as a single large document. It explains the research theories the platform is built on — such as "inoculation theory" (the idea that showing people a weakened dose of a manipulation trick makes them immune to the real thing, like a vaccine for the mind), how the human brain has two thinking modes (fast automatic gut-reactions and slower careful reasoning), and the international standards the platform follows (including WHO guidelines and UNESCO media-literacy standards). It also outlines the full 144-day lesson plan and explains why each part is designed the way it is.

**When it helps you:** When you visit the "Methodology" page on the website, this document is what you are reading. It lets researchers, educators, and curious users see exactly why the platform was built this way and which scientific sources back it up.

---

## Fake-Media Case Files

### DeepReal Case Library (10 cases)

**What it is:** Ten example files of manipulated or faked media, used as training cases. Each case is a different type of fake: a deepfake (a video or audio clip where a computer has replaced someone's face or voice — think of it like a very convincing digital costume) of a religious preacher, a forged health warning pretending to be from the World Health Organization, a voice-cloned phone call (where AI has copied someone's real voice to make a fake recording), and others. Each case is tagged to show what type of media it is and which detection techniques to use.

**When it helps you:** The forensics part of the platform loads one of these cases and walks you through dismantling it step by step — almost like a detective game — so you learn to spot the signs of each type of fake before you encounter them in real life.

---

## Positive Replacements After Debunking

### Constructive Replacement Library (30 items)

**What it is:** Thirty "what to believe instead" items, organised into three categories: Logic, Science, and Theology. After the platform shows you that a claim is false, it does not just leave a blank in your mind. It offers a healthy, accurate replacement idea — like a patch over a hole. This file holds the templates for those replacements.

**When it helps you:** Imagine you believed a false health myth your whole life. The platform debunks it — but if it just says "that's wrong" without giving you anything better, your mind tends to drift back to the old belief. These replacement items give you something solid and true to hold onto instead.

---

## Error and Manipulation Catalogues

### Islamic Fallacy Registry (28 named errors)

**What it is:** A list of 28 named reasoning errors (called "fallacies" — mistakes in logic or argument) that appear specifically in Islamic religious discussions, each explained in both English and Arabic. Examples include: "Tashbih" (wrongly comparing God to a human form), "Takfir Without Conditions" (declaring someone a non-Muslim without proper justification), and "Taqti' al-Ayah" (cutting a Quranic verse out of its context to make it mean something it does not). Each entry comes with a sourced explanation and a real example. The sources come from classical Islamic scholarship — meaning this is not the platform's opinion, it is what traditional scholars themselves identified as errors.

**When it helps you:** If someone sends you a religious message that uses one of these tricks — for example, quoting half a verse to claim something the full verse does not say — the platform can detect and name the trick. You learn to spot it yourself too during Week 16 and 17 of the course.

---

### Logical Fallacy Registry (100 named errors)

**What it is:** A list of 100 named tricks and mistakes in everyday reasoning, in both English and Arabic. For example: "Ad Hominem" (attacking the person instead of their argument — like saying "you can't trust his health advice because he's ugly"), "Strawman" (misrepresenting someone's view to make it easier to argue against), "Gish Gallop" (throwing so many weak arguments at someone so fast that they can't answer all of them, which makes them look wrong). Each entry has a definition from a textbook and a real-life example.

**When it helps you:** This catalogue powers the fallacy-spotting game in Weeks 6 and 7 of the course. You also see these labels when the platform analyses a viral message you paste in — it names the tricks being used and explains each one.

---

### Logical Fallacy Registry — Structural Errors sub-group

**What it is:** The first ten or so entries in the logical fallacy list, covering errors in the basic shape of an argument (called "formal fallacies"). These are arguments that are wrong because of their structure, not just their wording — like a mathematical equation where the steps are incorrect. Example: "Affirming the Consequent" means arguing "If it rains, the street is wet. The street is wet. Therefore it rained" — which is wrong because many other things could make the street wet.

**When it helps you:** These lessons teach you to see when an argument is broken at its core, regardless of what topic it is about. Once you know the shape of a bad argument, you can spot it whether the subject is health, politics, or religion.

---

### Logical Fallacy Registry — Everyday Manipulation Tricks sub-group

**What it is:** The remaining entries in the logical fallacy list, covering tricks that exploit emotions, assumptions, or confusing language — for example: "Appeal to Fear" (making you afraid so you stop thinking clearly), "Bandwagon" (everyone believes it, so you should too), "Loaded Question" (a question that sneaks in a false assumption, like "Have you stopped cheating on your taxes?" — you can't say yes or no without admitting something false).

**When it helps you:** These are the tricks you will see in WhatsApp forwards and social media posts. The interactive drills in this section of the course use real examples of viral messages and ask you to spot and name the trick being used.

---

### Scientific Fallacy Registry (98 named errors)

**What it is:** A list of 98 named reasoning errors that appear specifically in health, science, and medical claims — each with an English and Arabic explanation sourced to real academic papers. Examples include: "P-Hacking" (a researcher secretly runs their numbers many different ways until they get a result that looks impressive, then only reports that one — like shuffling a deck until you get the card you want and then claiming it was always on top), "Survivorship Bias" (only paying attention to the success stories and ignoring all the failures — like thinking a diet works because you only heard from the people it worked for), "Cherry-Picking" (choosing only the studies that support your point and ignoring all the others), "Appeal to Nature" (assuming something is safe or good just because it is "natural").

**When it helps you:** When you see a viral health claim — say, "This herb cures diabetes" — the platform can identify which of these tricks the claim is using. The course's Weeks 11 and 12 turn these into an interactive game where you practice spotting them in real medical headlines.

---

### Scientific Fallacy Registry — Statistics Errors sub-group (entries 1–33)

**What it is:** The first 33 entries of the scientific fallacy list, covering mistakes made in numbers, data, and research design. These include things like running a study on too few people (so the result is just random luck), confusing correlation with causation (two things happening at the same time does not mean one causes the other), and ignoring the base rate (the background frequency of something — like panicking about a "100% increased risk" of a rare disease when going from 1-in-a-million to 2-in-a-million).

**When it helps you:** The "Anatomy of a Medical Study" week uses these entries to teach you to read a health headline critically. Before sharing a scary medical article, you will know the right questions to ask: How many people were in the study? Did they compare it to a control group? Who funded the research?

---

### Scientific Fallacy Registry — Science-Denial Tricks sub-group

**What it is:** A set of entries covering the specific playbook used to attack or undermine established science — organised using a framework called FLICC (Fake experts, Large-scale cherry-picking, Impossible expectations, Conspiracy theories, Cherry-picking). For example, "Fake Experts" means finding one scientist who disagrees and presenting them as if they represent the whole scientific community — when in fact 99% of scientists agree.

**When it helps you:** If you see a video claiming "scientists are hiding the truth about vaccines" or "climate change is a hoax," this catalogue helps the platform identify exactly which denial trick is being used. It is also used by the platform's AI tools to automatically label these patterns in content you submit for analysis.

---

## Lesson Plan Blueprints (the four phases)

### Phase 0 Blueprint — Psychological Calibration (Weeks 1–4)

**What it is:** The lesson plan for the first four weeks of the course. These weeks do not teach you facts yet — they warm up your mind and show you how your own thinking works. Week 1 shows you how social media algorithms create "filter bubbles" (a kind of echo chamber where you only see content that matches what you already believe). Week 2 maps your personal emotional trigger words. Week 3 demonstrates the "Illusory Truth Effect" — the proven phenomenon where hearing a false statement many times makes you start to believe it just because it feels familiar. Week 4 teaches you to think in numbers about probability (like understanding that "rare" and "impossible" are not the same thing).

**When it helps you:** Before learning to spot tricks in others' messages, you need to understand your own mental shortcuts and weak spots. These four weeks are like stretching before a run — they prepare your mind for the harder lessons ahead.

---

### Phase 1 Blueprint — Logic and Thinking Skills (Weeks 5–8)

**What it is:** The lesson plan for weeks five through eight. Week 5 creates your personal "cognitive bias fingerprint" (a map of which mental shortcuts — shortcuts that sometimes lead to errors — you rely on most). Weeks 6 and 7 run you through the logical fallacy games where you sort and dissect bad arguments. Week 8 puts you in a simulated debate against an AI that tries to manipulate you, and you have to defend yourself using what you learned.

**When it helps you:** After these four weeks, when a family member shares a manipulative argument — say, "Everyone is doing this investment, why aren't you?" — you will be able to name the trick (Bandwagon fallacy) and explain calmly why it is not a good reason.

---

### Phase 2 Blueprint — Science and Health Literacy (Weeks 9–14)

**What it is:** The lesson plan for six weeks of science literacy. Week 9 teaches you how to read a medical study critically (including a simulator that shows you how easy it is to cheat with statistics). Week 10 shows you the "Evidence Pyramid" — a ranking of how reliable different types of evidence are (a single personal story is at the bottom; a large randomised controlled trial is near the top). Weeks 11 and 12 use the scientific fallacy game. Week 13 simulates being an auditor of retracted (officially withdrawn) scientific papers. Week 14 uses a fun data tool to show how two completely unrelated things can appear to be connected if you look at the numbers a certain way.

**When it helps you:** After these six weeks, you will know how to evaluate a viral health claim before sharing it. You will ask: Is this a real study? How many people were in it? Was it peer-reviewed? Has it been retracted?

---

### Phase 3 Blueprint — Religious Text Literacy (Weeks 15–20)

**What it is:** The lesson plan for six weeks focused on protecting yourself from manipulation through religious content. Week 15 introduces the traditional Islamic tools for checking whether an argument follows proper reasoning (called "Usul al-Fiqh" — the classical rules of Islamic legal reasoning). Weeks 16 and 17 run the Islamic fallacy game. Week 18 simulates the scholarly process of "Takhrij" (checking whether a hadith — a reported saying of the Prophet — is authentic by tracing its chain of narrators, using a real authentication database). Week 19 teaches the "Maqasid" framework (the five goals that Islamic law is designed to protect — life, mind, lineage, property, and faith), used as a checklist to test whether a fatwa or ruling genuinely serves Islam or is being weaponised. Week 20 trains you on how proper Quranic interpretation (tafsir) works, so you can spot when a verse is being ripped out of context.

**When it helps you:** When someone sends you a scary religious ruling or a quote supposedly from the Prophet, you will know the standard tools that real scholars use to verify it — and you will be able to ask the right questions before believing or sharing it.

---

### Phase 4 Blueprint — Live Defense and Real-World Practice (Weeks 21–24)

**What it is:** The final four weeks — the graduation phase. Week 21 shows you an interactive map of how disinformation campaigns are coordinated (including fake accounts, bots, and "astroturfing" — when a coordinated group of accounts pretends to be spontaneous public opinion). Week 22 gives you hands-on forensic practice with the DeepReal tool, which analyses suspicious media through six layers of checks. Week 23 gives you an "Inoculation Passport" — weakened doses of various manipulation tricks delivered in a safe learning environment so you become resistant to the full-strength versions (exactly like a vaccine works). Week 24 is the final "boss fight": a debate simulation against an AI opponent that uses all three fallacy registries at once — you pass the course by winning.

**When it helps you:** This is where everything comes together. By the end of these four weeks, you are trained to handle real manipulation attempts — from a fake health video to a coordinated political disinformation campaign — using all the tools you built across the previous 20 weeks.

---

## Daily Lesson Files (Days 1–67 of 144)

### Daily Exercise Files — Overview (all 109 day files in this data slice)

**What it is:** Each day of the 144-day curriculum has its own small file that tells the platform what type of lesson to run that day. The file says: which day number it is, which week, which phase topic, and what kind of activity to show — for example, a reading lesson, a historical case study, a fallacy-spotting game, a roleplay conversation with an AI, a WhatsApp-forward fact-check drill, or an end-of-week quiz.

**When it helps you:** When you log in on any given day, the platform reads that day's file and shows you exactly the right activity at the right point in your learning journey — no manual navigation needed.

---

### Daily Exercise Files — Psychological Calibration Days (Days 1–28)

**What it is:** The 28 day files for the first four weeks. These days walk you through discovering how your own mind works: how your social media feed is shaped to keep you in a bubble, what words trigger an emotional reaction in you, why repetition makes false things feel true, and how to think about probability without panic.

**When it helps you:** These early days are deliberately gentle — they help you become aware of your own mental habits before you start learning to spot manipulation. You cannot defend yourself from tricks that work on everyone if you do not first understand that they work on you too.

---

### Daily Exercise Files — Logic and Thinking Days (Days 29–56)

**What it is:** The 28 day files for weeks five through eight. These days build your logical self-defence skills: mapping your personal blind spots, playing the fallacy-sorting game, dissecting real-debate transcripts for hidden tricks, and practising Socratic dialogue (a structured method of asking questions to expose flawed reasoning — like a calm intellectual self-defence technique).

**When it helps you:** Day by day, these lessons stack on top of each other. By the end of week eight you will have a reliable set of mental tools for recognising when an argument is being used to manipulate rather than inform you.

---

### Daily Exercise Files — Scientific Literacy Days (Days 57–67, partial)

**What it is:** The first eleven day files of the science literacy phase. These days begin teaching you how medical studies work and how to rank different types of evidence from most to least reliable.

**When it helps you:** These are the first days where you start practising with real-looking health claims. You learn to slow down before believing or sharing a medical headline and ask the basic questions that separate solid evidence from noise.

---

### Daily Exercise Files — Islamic Literacy Days (Days 100–119)

**What it is:** Twenty-one day files covering the religious-text literacy phase. These days walk you through the classical Islamic scholarly tools for checking religious claims, the Islamic fallacy game, practising hadith authentication, applying the Maqasid checklist, and learning the rules of proper Quranic interpretation.

**When it helps you:** These days specifically prepare you for the religious manipulation that is extremely common in Egypt and the wider Arab world — forwarded fatwas with no source, out-of-context verses used to frighten people, or invented hadiths used to push a political agenda.

---

### Daily Exercise Files — Live Defense Days (Days 121–129)

**What it is:** The first nine day files of the final phase. These days begin the live-fire practice: studying how disinformation networks are organised (who runs them, how they spread messages) and starting the hands-on deepfake forensics exercises.

**When it helps you:** At this point you have all the knowledge — these days make you practise it under pressure, in realistic scenarios, so that the skills become automatic rather than theoretical.

---

# Training Content, Exercises & Support Data (plain-language)

This section covers all the learning exercises, daily lessons, crisis contacts, and behind-the-scenes data that power the Egyptian Awareness Library's training program.

---

## Daily Lesson Skeleton Files (Days 7–9 and Days 68–99)

### Daily Exercise Payload Stub
**What it is:** A tiny information card for each day of the training program. It tells the website which lesson topic and activity type to show that day — like a bookmark that says "Day 75: open the Islamic Literacy quiz." Nothing is shown directly to the user from this card; it is just a routing label.
**When it helps you:** Every time you open the app on a new day, this file is what makes the right lesson load automatically instead of showing you yesterday's content.

---

## Phase 0: Psychological Preparation (Weeks 1–4)

### Phase 0 Curriculum Definition
**What it is:** The full plan for the first four weeks of training. These weeks are about getting your mind ready before the real lessons begin. Topics include: how social media bubbles keep you from seeing the full picture (filter bubbles), how certain words and images make you feel emotions that cloud your judgement (emotional triggers), why hearing a lie many times makes you start to believe it even without evidence (the illusory truth effect), and how to think in base-rates (understanding that "rare" means rare even if it feels common in your feed).
**When it helps you:** This plan is what structures your first month of training — without it, the website would not know which topics to show in which order.

### CurriculumWeek / CurriculumPhase Interface Definitions
**What it is:** A shared template (like a standard form) that all five training phases use to describe themselves in the same consistent way — same fields, same format. It ensures every phase follows the same structure.
**When it helps you:** Behind the scenes, this is what lets all five phases display correctly without each one being coded differently. It is invisible to the user but keeps the whole program consistent.

---

## Phase 1: Thinking Skills (Weeks 5–8)

### Phase 1 Curriculum Definition
**What it is:** The four-week plan for sharpening your thinking tools. It covers: mapping your personal cognitive blind spots (the biases you are most prone to), common logical tricks people use to win arguments unfairly — such as attacking the person instead of the idea (ad hominem), misrepresenting what someone said to make it easier to attack (strawman), or flooding you with so many weak arguments you get overwhelmed (Gish Gallop) — and practising how to defend your reasoning out loud.
**When it helps you:** This phase is what trains you to recognise when someone's argument is built on manipulation rather than logic, whether you're watching a debate on TV or arguing in a family WhatsApp group.

---

## Phase 2: Science & Health Literacy (Weeks 9–14)

### Phase 2 Curriculum Definition
**What it is:** Six weeks focused on understanding how science works — and how it gets misused. It covers: how to read a medical study and spot when numbers are manipulated (p-hacking — forcing statistics to produce a "positive" result that isn't real), a drag-and-drop game that ranks evidence from weakest to strongest, how people misuse nature ("natural = safe") or rare events to mislead you, how to audit retracted COVID and vaccine papers, and why two things happening at the same time does not mean one caused the other (correlation vs causation).
**When it helps you:** Someone posts a viral health claim saying a natural herb cures cancer. This training gives you the tools to ask: where is the study? Is it real? Was it retracted?

---

## Phase 3: Islamic Literacy (Weeks 15–20)

### Phase 3 Curriculum Definition
**What it is:** Six weeks learning how to tell authentic Islamic knowledge from fabricated or misused religious claims. Includes: understanding the hierarchy of Islamic legal sources (Usul al-Fiqh — the rules scholars use to decide what Islam actually says, ordered from most to least authoritative), how people manipulate texts by taking verses out of context or treating ancient rulings as eternal (ahistoricism), how to trace a hadith (a saying attributed to the Prophet) back to its original source to check if it is genuine (takhrij — like a fact-check for religious quotes), checking whether a fatwa (a religious ruling) actually serves the higher goals of Islamic law (Maqasid — the five purposes Islam protects: life, mind, religion, family, and property), and the rules for interpreting Quran (Usul al-Tafsir).
**When it helps you:** Someone sends you a hadith on WhatsApp saying something alarming. This phase trains you to ask: is this hadith actually confirmed? Who said it first? Does it match the broader spirit of Islam?

---

## Phase 4: Live Defence (Weeks 21–24)

### Phase 4 Curriculum Definition
**What it is:** The final four weeks where you apply everything together in live-fire scenarios. Includes: seeing how fake online movements are manufactured by bots and paid accounts working together (astroturfing), analysing potentially fake videos at six technical levels, receiving a "weakened dose" of manipulation so your mind learns to recognise it before the real version arrives (like a vaccine for your brain — based on the Cambridge Bad News model), and a final debate against an AI trained to argue like a sophisticated propagandist.
**When it helps you:** After this phase, you have practised defending yourself against real-world deception, not just theory. You have sparred against a tough opponent and won.

---

## Academic Defence Preparation Files

### Defense Q&A Script
**What it is:** Ten ready-made questions and answers in Arabic about the project — covering what it does, which AI tools it uses, who it is for, and how data is stored. Like a cheat sheet for answering tough questions.
**When it helps you:** When the project's creator stands in front of a university examination panel, this file gives pre-prepared answers so no question catches them off guard.

### Theoretical Basis Registry
**What it is:** A list of eight proven scientific theories that the platform is built on — each with the name of the theory, where it appears in the app, and the academic paper it comes from. For example: Inoculation Theory (how pre-exposing people to manipulation makes them resistant), COM-B (what drives human behaviour: Capability, Opportunity, Motivation), SIFT (a four-step fact-checking method), MIST-20 (a 20-question test that measures how well someone spots misinformation).
**When it helps you:** When an examiner asks "why did you build it this way?", this registry provides scientific proof that every design choice is backed by published research.

### Visual Demo Map
**What it is:** A time-stamped script telling the presenter exactly which screen to show at each moment during a live demo — like stage directions for a show.
**When it helps you:** Prevents the presenter from fumbling around during a live demonstration in front of examiners, keeping the walkthrough smooth and impressive.

### Unique Points Registry
**What it is:** A list of eight things this platform does that no other Egyptian platform does — for example, being the first to apply the MIST-20 misinformation test in the Egyptian Arabic dialect.
**When it helps you:** Gives the creator strong, specific talking points when asked "what makes your project original?"

---

## Defense Dashboard Data

### Executive Lock
**What it is:** A single summary card containing the project's core identity statement and demo strategy — the one-sentence version of what the whole platform is and how to show it.
**When it helps you:** The first thing the presenter sees when they open the defense dashboard; grounds them before the presentation begins.

### Powerful Pages Registry
**What it is:** A detailed file listing the five strongest pages to demonstrate, each with: which web address to open, what to type as demo input, what result to expect, the chain of files behind it, how risky it is to show live, and ready answers to tough questions an examiner might ask (called "doctor attacks").
**When it helps you:** Gives the presenter a complete, battle-tested guide to the five demo moments most likely to impress a panel.

### Stress Test Registry
**What it is:** A list of real scenarios the platform has already been tested against — for example, entering an Arabic health misinformation claim and checking whether the result is correct — with the actual outcomes recorded as pass or fail.
**When it helps you:** If an examiner says "prove it works right now," the presenter already knows the exact input to type and what the correct answer looks like.

### Demo Segments
**What it is:** A timed running order for the full live demonstration — opening segment, technical proof, AI capstone, and closing — each with a time budget and talking points.
**When it helps you:** Keeps the presentation on time and ensures nothing important gets skipped or rushed.

### Recovery Lines
**What it is:** Pre-written scripts in Arabic and English for when something goes wrong during a live demo — for example, if the AI takes too long to respond or a page crashes.
**When it helps you:** Instead of freezing when a technical problem appears on screen, the presenter has a calm, professional thing to say while recovering.

### Brutal Honesty Registry
**What it is:** A list of the platform's real, known weaknesses — for example, that the Arabic claim-checker was originally trained on English data and works slightly better in English. Nothing is hidden or sugar-coated.
**When it helps you:** Research panels trust presenters more when they admit limitations honestly. Having these ready prevents the examiner from catching the creator off-guard with a weakness they hadn't admitted.

---

## Defense Navigation Files

### Presenter Route Order
**What it is:** An ordered list of exactly eight web addresses (routes) to visit, in order, during the defense demo — like a numbered checklist.
**When it helps you:** Keeps the presenter from accidentally jumping to the wrong page mid-demonstration.

### Backend Focus Stats
**What it is:** A count of all the server-side processes (API routes — the invisible workers that fetch data and run calculations behind the scenes): 41 total, 36 safe to show live, and so on.
**When it helps you:** When an examiner asks "how deep is your backend?", the presenter can quote real numbers instantly.

### Do-Not-Show Warnings
**What it is:** A clear list of things to never show or claim during the defense — for example, do not open the chatbot live, do not claim features that are not finished.
**When it helps you:** Prevents the presenter from accidentally showing an unstable page that could crash mid-demo.

### Page Map Entries
**What it is:** A comprehensive guide to every page in the app — roughly 40 entries — each describing: what the page does, whether it is safe to demo, what technology it needs, specific answers to likely examiner questions, and step-by-step test instructions.
**When it helps you:** The presenter's complete backstage manual. Before the defense, they can look up any page and know exactly what it does and how to talk about it.

---

## Crisis & Emergency Contacts

### Egypt Crisis Contacts Registry
**What it is:** A verified list of 10 real crisis helplines and emergency numbers in Egypt: the Mental Health Hotline (16328), Ambulance (123), the Ministry of Health's mental health platform, the official Islamic fatwa authority (Dar al-Ifta, 107), the Al-Azhar Observatory for reporting religious misinformation, and others — each with a description in both Arabic and English.
**When it helps you:** If you are in the middle of a lesson about mental health or religious manipulation and you feel distressed, the app can surface the right phone number or website instantly instead of leaving you to search alone.

### Official Source URL Constants
**What it is:** A stored list of trusted web addresses — links to the Ministry of Health mental health platform, World Health Organisation fact sheets on depression, anxiety, suicide, and mental disorders, and the Dar al-Ifta contact page — so the app always links to exactly the right official page.
**When it helps you:** When the app shows you a link to an official health resource, this file ensures it always goes to the correct, up-to-date URL and never drifts to a wrong or outdated address.

### Egypt Crisis Phone Numbers
**What it is:** The definitive list of emergency phone numbers used throughout the whole app — the mental health short code, the toll-free number, the landline, the ambulance number, and the Dar al-Ifta number — stored in one place.
**When it helps you:** Ensures every part of the app shows the same correct phone number. If a number ever changes, only this one file needs updating.

### Official Mental Health Guidance Cards
**What it is:** Six information cards sourced from the World Health Organisation and the Egyptian Ministry of Health — covering mental health in general, mental disorders, depression, anxiety, and suicide — each with key statistics and a short description.
**When it helps you:** When you reach a section about mental health, these cards give you reliable, official information to read — not opinions, not guesses, real figures from the WHO and the Egyptian government.

---

## Support Directory

### Support Directories Registry
**What it is:** A detailed list of eight real, verified support services available in Egypt and online — including hotlines, websites, and references — with information on hours, who they serve (mental health, religion, or everyone), their geographic reach, the last date they were confirmed still active, and when to use each one.
**When it helps you:** Instead of the app dumping a generic list of links, this registry ensures every contact shown is appropriate to your situation — a mental health question gets mental health contacts, a religious question gets the right Islamic authority.

### getSupportDirectoriesForMvp() Function
**What it is:** A filter that selects only the contacts relevant to whichever part of the app you are in. If you're in the Mental Health section, you see mental health contacts. If you're in the Religion Hub, you see religion-related contacts. It works automatically.
**When it helps you:** You never see a jarring mismatch — like being shown a mental health hotline while studying Islamic text verification. The right help appears in the right context.

---

## Reference & Benchmark Data

### Educational Non-Profits Dataset
**What it is:** A data file listing 15 of the world's leading digital-education organisations — including Wikimedia, Khan Academy, Duolingo, Coursera, and others — with their reach in numbers, which countries and languages they serve, and links to academic research proving they work.
**When it helps you:** Used when showing how this project compares to other serious educational platforms in the world. It positions the Egyptian Awareness Library alongside proven global organisations, not unproven apps.

### Engine Combat Lenses Dataset
**What it is:** A set of detailed defence protocols for each of the three main engines (Mental Health, Scientific, Religion Hub), each broken into seven layers of manipulation. For each layer, there is a name, a method, a mental protocol to follow (in both Arabic and English), a rule to rewrite into your thinking, and links to real Egyptian case examples. Think of it as seven battle-moves for each type of deception.
**When it helps you:** When you are studying a specific type of manipulation — say, how fear is used to sell fake health cures — the app can activate the matching protocol and walk you through exactly how to identify and dismantle that attack.

### Mental Health Lens — Layer-by-Layer Protocols
**What it is:** Seven specific mental defence moves for emotional and health manipulation. For example: the "Amygdala Firewall" teaches you to recognise when a piece of content is deliberately spiking your stress hormones (cortisol — the body's alarm chemical) before you even read it fully. Another protocol helps you separate cultural habits from actual religious obligations. Another helps you notice when you are sleep-deprived or emotionally raw — times when your judgement is most easily hijacked.
**When it helps you:** You see a health-scare post at midnight claiming a medication will harm your child. Instead of panicking and forwarding it, you recognise the cortisol spike, apply the firewall, and pause before reacting.

### DeepReal Scientific Lens — Layer-by-Layer Protocols
**What it is:** Seven defence protocols for spotting fake or manipulated science. For example: "COPE Source Annihilation" teaches you to check whether a journal has a real DOI (a unique code every real published paper has) and whether it has been verified by COPE (the ethics body for scientific publishing). "Follow-the-Money Forensics" helps you find hidden conflicts of interest in research. "PRISMA Full-Context Recovery" teaches you to demand a full systematic review (a study of all studies) rather than accepting one cherry-picked paper.
**When it helps you:** A doctor on TV cites a study saying a supplement works. Instead of accepting the claim, you know how to check the DOI, look for who funded the study, and ask whether all the other studies on the same topic agree.

### Religion Hub Lens — Layer-by-Layer Protocols
**What it is:** Seven protocols for defending against manipulation that uses religion as a weapon — for example, misquoting a verse, taking a ruling out of its historical context, or pretending that one scholar's opinion is the universal consensus of Islam.
**When it helps you:** Someone sends you a religious clip claiming music is absolutely forbidden in Islam and that any Muslim who disagrees is sinful. These protocols help you check: which scholar said this, does it reflect the full range of Islamic scholarship, and is it being applied to its proper context?

---

## Day-by-Day Core Training Exercises

### Day 1 — MIST-20 Cognitive Immunity Calibration
**What it is:** The opening test on your very first day. You see 10 real claims from Egyptian social media — about health, politics, history, religion, and science — and decide if each is true, false, or misleading. The app then calculates your starting Cognitive Immunity Score using the MIST-20 instrument (a scientifically validated 20-question test used in academic research to measure how well people spot misinformation).
**When it helps you:** Gives you and the app a baseline — a starting point to compare against at the end of training so you can see exactly how much you improved.

### Day 2 — Trust Battery Sprint
**What it is:** You are shown 12 claims, each from a different Egyptian source: Al-Ahram newspaper, a WhatsApp forward, BBC Arabic, a Facebook post, Reuters. You rate how trustworthy you think each source is. The app shows you the correct reliability score and explains the red flags you might have missed.
**When it helps you:** After this exercise, you have a mental map of the Egyptian information landscape — which sources tend to be reliable and which ones you should treat with extra scepticism.

### Day 3 — Thumbnail Trap Detection
**What it is:** You practise spotting manipulation in YouTube and Facebook thumbnails from Egyptian content. The exercise identifies four techniques: using extreme emotion and fake urgency, framing everything as a yes/no choice when the reality is complicated (false dichotomy), hinting at hidden secrets to make you feel afraid of missing out, and using misleading charts or conspiracy framing.
**When it helps you:** Before you even click a video, you will be able to recognise the tricks its thumbnail is using to hijack your curiosity or fear.

### Day 4 — Emotion vs Evidence Drill
**What it is:** You are shown content side by side — for example, a fear-filled 5G health scare post versus a summary from a WHO systematic review — and you practise identifying which one uses real evidence and which one is just emotional manipulation dressed up as information.
**When it helps you:** Trains you to slow down and ask "does this have real evidence behind it, or is it just making me feel something?" — which are two very different things.

### Day 5 — Calm Breath / Time-Friction Training
**What it is:** Four scenarios of emotionally explosive Egyptian social media content (a football disqualification rumour, a scary government decree, a checkpoint video, a vaccine voice note on WhatsApp). For each one, the app guides you through a specific breathing technique — 4-7-8 breathing, box breathing, or the 5-4-3 grounding method — and makes you wait at least 10 seconds before you can interact with the content.
**When it helps you:** Builds the habit of creating a pause between "feeling alarmed" and "hitting share." That 10-second gap is enough for your thinking brain to come back online.

### Day 6 — GHSQ Help-Seeking Barriers Introduction
**What it is:** Three real-feeling Egyptian stories — Ahmad (25, suicidal thoughts), Fatima (30, anxiety in Upper Egypt), Omar (19, depression combined with pressure to "man up") — each showing the barriers that stop them from seeking help. The exercise uses the GHSQ instrument (a validated questionnaire, the General Help-Seeking Questionnaire, that measures how willing someone is to seek mental health support) and includes an Islamic perspective on why seeking professional help is compatible with faith.
**When it helps you:** Helps you recognise whether you or someone you know is facing hidden barriers to getting mental health support — and gives you language to talk about it.

### Day 7 — DeepReal OSINT Teaser
**What it is:** Your first introduction to OSINT (Open Source Intelligence — investigating using only freely available tools, like a detective using public records instead of a warrant). You practise reverse image search (uploading a photo to find where it originally came from), checking metadata (hidden information embedded in a file), and tracing a source. The scenario: a viral image falsely claimed to show Egyptian military vehicles entering Gaza in 2024. The real source: a 2013 military exercise in Sinai.
**When it helps you:** When you see a dramatic photo on social media claiming to show a current event, you now know how to find out where the photo actually came from.

### Day 8 — Bias Fingerprint Assessment
**What it is:** Eight Egyptian-context scenarios that reveal which mental shortcuts you are most vulnerable to — for example: believing a COVID vaccine article only because it confirms what you already think (confirmation bias), overestimating how common crime is after seeing one news story about it (availability heuristic), being anchored by a fake WhatsApp poll (anchoring bias), and five others. At the end you get your personal "Bias Fingerprint" — a map of your specific weak spots.
**When it helps you:** Everyone has biases. Knowing yours specifically is the first step to defending against them.

### Day 9 — Expert Voice Calibration
**What it is:** Eight scenarios with Egyptian and international "experts" making health, science, and policy claims. Some are real experts; some are fabricated. You learn to check: Does this person appear in any official professional directory? Does their claim contradict official government data? Do they have any published research you can verify? Based on Nichols (2017) "The Death of Expertise."
**When it helps you:** A doctor in a white coat appears on a Facebook video making bold health claims. This training teaches you to verify credentials before trusting authority — because a lab coat is not a peer-reviewed paper.

### Day 9 — Source Evaluation (Alternative Exercise)
**What it is:** A shorter, more compact source evaluation activity that complements the Expert Voice exercise on Day 9.
**When it helps you:** Provides extra practice for users who want more repetition on evaluating sources before moving to Day 10.

---

## Days 10–28: Core Skill Building

### Day 10 — Lateral Reading
**What it is:** Teaches you to open other tabs to check what others say about a source before you read the source's own content — instead of reading an article and then deciding if the website seems credible, you first open new tabs and search what independent sources say about that website. Like checking a restaurant's reviews on Google before going inside.
**When it helps you:** A website looks professional and makes big health claims. Lateral reading lets you quickly find out if it is a known misinformation site before you spend time reading it.

### Day 11 — Base Rate Primer
**What it is:** Introduces the idea that when evaluating any risk or claim, you need to know the background rate — how common something is in the general population — not just the dramatic individual story. For example: one person who got sick after a vaccine is not evidence the vaccine is dangerous if millions took it safely.
**When it helps you:** When a relative says "I know three people who got sick after the vaccine," you can think: but what is the rate across the full population? Numbers without context can mislead.

### Day 12 — Anchoring Drill (Short)
**What it is:** A brief exercise introducing anchoring bias — when the first number or idea you hear influences all your later judgements, even when the anchor was completely made-up.
**When it helps you:** First exposure before a deeper drill on Day 16. After this, you start noticing when prices, statistics, or claims are designed to anchor your expectations.

### Day 13 — Dunning-Kruger Exercise
**What it is:** Scenarios where Egyptian social media commentators are completely confident about topics they know very little about. You practise identifying the gap between their confidence and their actual expertise — and then reflect on where you might have the same gap yourself. Based on a real psychological effect named after researchers Dunning and Kruger.
**When it helps you:** Helps you pause before posting strong opinions in fields where you have only surface-level knowledge — and recognise when others are doing the same.

### Day 14 — Week 2 Checkpoint Quiz
**What it is:** A summary quiz covering everything from the first two weeks — a check-in to see what you have retained before continuing.
**When it helps you:** Measures whether you are actually learning or just clicking through. The app can then highlight which skills need more practice.

### Day 15 — Reaction Time Baseline (Full)
**What it is:** Ten viral Egyptian claims flash on screen for two seconds each. You click TRUE or FALSE before the timer runs out. The app scores you: fast and correct earns 10 points, slow and correct earns 7, fast and wrong loses 5. It computes your EAL Impulsivity Index — your personal score for how often you react fast and wrong. This same test is retaken on Day 28 to measure improvement.
**When it helps you:** Shows you concretely how impulsive you are when under time pressure — which is exactly the condition a viral post exploits. Seeing the score is often a wake-up call.

### Day 15 — Reaction Time (Short Stub)
**What it is:** A compact reference version of the Day 15 exercise used by the curriculum routing system.
**When it helps you:** Ensures the curriculum system loads the correct exercise type for Day 15 even from a compact entry.

### Day 16 — Anchoring Effect Drill (Full)
**What it is:** Eight real Egyptian scenarios where a first number manipulates your judgement — a private clinic quoting 50,000 EGP first so 18,000 EGP feels cheap, a WhatsApp poll claiming 90% agree with something, a New Cairo apartment advertised at 5.5 million EGP. Each scenario shows the anchor, the biased reaction it creates, and the correct debiasing technique. Based on Tversky and Kahneman's research from 1974.
**When it helps you:** Trains you to notice when a price, statistic, or poll is designed to manipulate your reference point before you make a decision.

### Day 16 — Confirmation Bias (Alternative Exercise)
**What it is:** A shorter confirmation bias drill that can be used alongside or instead of the anchoring exercise on Day 16.
**When it helps you:** Extra practice on confirmation bias — the tendency to believe information that matches what you already think and dismiss information that challenges it.

### Day 17 — In-Group Bias Exercise
**What it is:** Scenarios set in Egyptian social contexts showing how we tend to believe and excuse people from our own group (family, football club, religion, political party) more readily than outsiders — even when the evidence is the same.
**When it helps you:** When a claim about your favourite football team, your neighbourhood, or your religious community seems obviously true, this training helps you ask: am I believing this because it is true, or because it is about my group?

### Day 18 — Availability Deep Dive
**What it is:** Advanced scenarios showing how easily the most vivid, recent, or emotionally striking example in your memory distorts your sense of how common or likely something is — building on the short introduction in Day 11.
**When it helps you:** After a plane crash in the news, people overestimate the danger of flying. After a crime story about a specific neighbourhood, people overestimate crime rates there. This exercise trains you to ask: is this actually common, or is it just vivid?

### Day 19 — Correlation vs Causation
**What it is:** Egyptian data examples showing that two things happening at the same time does not mean one caused the other. For example: ice cream sales and drowning rates both rise in summer — but ice cream does not cause drowning; hot weather causes both.
**When it helps you:** Health claims often exploit this confusion — "people who drink green tea are healthier" does not mean green tea made them healthy. After this exercise, you will catch this trick automatically.

### Day 20 — WhatsApp Drills
**What it is:** Practice scenarios built around real-format Egyptian WhatsApp forwards — the panicked voice notes, the shocking screenshots, the "share this immediately" messages — with rapid detection exercises.
**When it helps you:** WhatsApp is the primary way misinformation spreads in Egypt. This gives you reps specifically on the format you encounter most in daily life.

### Day 21 — Midpoint Assessment
**What it is:** A comprehensive check-in at the halfway point of Phase 0 measuring progress across all the skills taught so far.
**When it helps you:** Shows you clearly which skills are getting stronger and which ones still need work — so the remaining days can be targeted.

### Day 22 — Inoculation Introduction (Short)
**What it is:** A brief primer on psychological inoculation — the idea, proven by decades of research, that seeing a weakened version of a manipulation technique protects you from the real thing later, just like a vaccine.
**When it helps you:** First exposure to this concept before the full exercise.

### Day 22 — Inoculation Introduction (Full)
**What it is:** The full version of the inoculation exercise. Based on research by McGuire (1961) and Roozenbeek and van der Linden (2019), which showed that inoculation produces a measurable effect (d=0.52 — a medium-to-large improvement on research scales). Covers five manipulation techniques including emotional fear hijacking and fake authority, with Egyptian media examples for each. You see the technique in a "weakened dose" first, then encounter it in a real test.
**When it helps you:** After this exercise, the next time someone sends you a fear-based health warning on WhatsApp, your brain will recognise the technique faster because it has already been pre-exposed.

### Day 23 — Prebunking Exercise
**What it is:** More prebunking practice — you encounter additional manipulation scenarios and continue building immunity to the techniques introduced on Day 22.
**When it helps you:** Repetition is how inoculation works. The more variations of a manipulation you see in a safe environment, the more automatically you recognise them in the wild.

### Day 24 — DeepReal Introduction
**What it is:** A brief introductory exercise connecting everything you have learned in Phase 0 to the DeepReal forensics engine — a preview of the deeper investigation tools you will use next.
**When it helps you:** Makes the transition from general thinking skills to technical investigation feel natural, not abrupt.

### Day 25 — GHSQ Retake
**What it is:** The same General Help-Seeking Questionnaire from Day 6, taken again after 25 days of training.
**When it helps you:** Measures whether your willingness to seek mental health support has actually changed after the training — a real before-and-after measure of attitude shift.

### Day 26 — SUS Checkpoint
**What it is:** A usability check — a standard questionnaire (SUS, the System Usability Scale, the most widely used tool for measuring how easy a product is to use) to measure how easy the app is to navigate at this point in the programme.
**When it helps you:** Gives the development team feedback on whether the app is confusing people, so they can improve it.

### Day 27 — Forward Defence Exercise
**What it is:** You write scripts for teaching the manipulation techniques you have learned to someone in your own social circle — a family member, a friend, a colleague. You become the educator.
**When it helps you:** Research shows that teaching something is the best way to solidify your own understanding. This also spreads protection to people who will never use the app themselves.

### Day 28 — Inoculation Passport Level 1
**What it is:** The graduation exercise for Phase 0. Completing it awards you Level 1 of the Inoculation Passport — a milestone marking that you have completed the first 28 days of training.
**When it helps you:** Gives you a tangible achievement to mark real progress. The passport levels continue through the whole programme.

---

## Phase Exercise Routing Maps

### Phase 0 Exercise Manifest (Days 1–28)
**What it is:** A master list connecting each of the 28 days to its specific exercise file, the screen components it uses, and the measurement instrument it activates (for example: Day 1 activates the MIST-20 baseline, Day 6 activates the GHSQ, Day 15 activates the Impulsivity Index).
**When it helps you:** Ensures the app always loads the right exercise on the right day without anyone having to manually configure it.

### Phase 1 Exercise Weekly Pattern Manifest (Days 29–56)
**What it is:** The routing map for weeks 5 through 8. Each week follows a repeating pattern: five logical fallacy exercises per day, two logic-building exercises, and emotional-intelligence practice — all pointing to the correct screen components.
**When it helps you:** The curriculum engine reads this to serve the correct mix of exercises each day during the logic-and-fallacies training phase.

### Phase 2 Exercise Weekly Pattern Manifest (Days 57–98)
**What it is:** The routing map for weeks 9 through 14 (Scientific Literacy). Each day includes six scientific fallacy exercises with rotating real-paper case studies, plus weekly checks using the paper-auditing, image forensics, and evidence-ranking tools.
**When it helps you:** Drives the six-week scientific literacy schedule automatically.

### Phase 3 Exercise Weekly Pattern Manifest (Days 99–140)
**What it is:** The routing map for weeks 15 through 20 (Islamic Literacy). Daily exercises cover Islamic logical fallacies, hadith checking, Maqasid alignment, Quranic interpretation rules, sectarian-framing detection, Islamic finance claims, and inheritance calculations.
**When it helps you:** Drives the Islamic literacy curriculum automatically across six weeks.

### Phase 4 Exercise Weekly Pattern Manifest (Days 141–168)
**What it is:** The routing map for the final four capstone weeks. Week 21: live stress test against all seven deception layers at once. Week 22: combining mental health and investigative skills. Week 23: cross-discipline mastery. Week 24: graduation, final MIST-20 retake, and Inoculation Passport Level 5 (Sovereign) issuance.
**When it helps you:** Drives the final, hardest phase of the programme automatically — including triggering the graduation ceremony and final measurements.

---

## DeepReal: Fact-Checking & Forensics Exercises

### DeepReal Day 1 — SIFT Method Introduction
**What it is:** Teaches the four-step SIFT method — Stop (don't share immediately), Investigate the source, Find better coverage, Trace claims to their origin — using a scenario about a viral lemon-water health claim.
**When it helps you:** Gives you one memorable framework (SIFT) to apply every time you see a suspicious claim, instead of not knowing where to start.

### DeepReal Day 2 — Lateral Reading
**What it is:** Practises the technique of checking what other credible sources say about a website before reading the website itself.
**When it helps you:** Saves you from spending 20 minutes reading a convincing-sounding article only to discover later it came from a known misinformation site.

### DeepReal Day 3 — Source Credibility Deep Dive
**What it is:** Advanced exercises for evaluating whether a source can be trusted — going beyond the surface appearance of a website to its history, ownership, and track record.
**When it helps you:** Develops a more sophisticated instinct for source quality beyond "does this look professional?"

### DeepReal Day 4 — Evidence Pyramid Application
**What it is:** Teaches the hierarchy of evidence quality — from weakest (one person's personal story) up to strongest (a systematic review — a study that combines and analyses all the other studies on a topic) — and practises ranking real Egyptian health claims on this pyramid.
**When it helps you:** When someone cites "a study," you now ask: what kind of study? One small experiment, or a review of a hundred experiments? The type of evidence matters enormously.

### DeepReal Day 5 — Emotional Manipulation Detection
**What it is:** Identifies specific emotional manipulation techniques used in viral Egyptian content — such as manufacturing urgency, exploiting fear of death or disease, or creating tribal us-vs-them framing.
**When it helps you:** Builds automatic awareness of when your emotions are being deliberately activated to bypass your critical thinking.

### DeepReal Day 6 — Social Proof Resistance
**What it is:** Exercises to resist the pull of manufactured social proof — when a post shows "10,000 shares" or "everyone agrees," training you to ask whether that consensus is genuine or artificially inflated by bots.
**When it helps you:** Fake popularity is one of the most powerful misinformation tricks. This training makes you sceptical of crowd signals.

### DeepReal Day 7 — Deepfake Visual Detection
**What it is:** Teaches you to spot the tell-tale signs of deepfakes (AI-generated fake videos where one person's face is swapped onto another's body) — including blurry edges around the face, lips that don't quite match the words being spoken, and unnatural blinking patterns.
**When it helps you:** A video appears to show a public figure saying something shocking. This training gives you a checklist of visual red flags to look for before believing or sharing it.

### DeepReal Day 8 — Coordinated Inauthentic Behaviour
**What it is:** Teaches you to recognise when dozens or hundreds of social media accounts push the same message at the same time in a coordinated way (sometimes called a bot-net — a group of automated fake accounts working together). This is different from something genuinely going viral.
**When it helps you:** When a topic suddenly floods your feed from many accounts you don't recognise, you can ask: is this organic interest, or is someone paying to make this trend?

### DeepReal Day 9 — Claim Tracing
**What it is:** Practises the "Trace" step of SIFT — following a claim all the way back to its original source instead of accepting what a third-hand post says the source was.
**When it helps you:** Many viral claims say "scientists say" or "studies show" without a real link. Tracing teaches you to find the actual original study — and often discover it said something very different.

### DeepReal Day 10 — Manufactured Authority
**What it is:** Trains you to detect fake credibility signals — a website ending in .org (which anyone can register), "leaked documents" that turn out to be screenshots, or a professional-looking logo that was designed in an afternoon.
**When it helps you:** Distinguishes between genuine authority (verifiable credentials, institutional affiliation, track record) and the appearance of authority created to fool you.

### DeepReal Day 11 — Bias in Information Framing
**What it is:** Shows how the same facts can be presented very differently depending on what the author chose to emphasise, what they left out, and which words they used — revealing how framing shapes meaning even when no individual fact is false.
**When it helps you:** Teaches you to ask not only "is this true?" but "is this the complete picture, or has something important been left out or downplayed?"

### DeepReal Day 12 — Confirmation Bias in Verification
**What it is:** Focuses specifically on how confirmation bias (believing things that match what you already think) can corrupt your own fact-checking — making you dismiss correct debunks and accept weak evidence that supports your existing beliefs.
**When it helps you:** Fact-checking only works if you apply it equally to claims you want to believe and claims you don't. This exercise trains intellectual honesty.

### DeepReal Day 13 — Echo Chamber Escape
**What it is:** Teaches you to deliberately seek out sources from different perspectives — including ones you disagree with — to check whether a claim holds up outside your usual information bubble.
**When it helps you:** If a claim is only supported by sources that already agree with each other, that is a warning sign. Real facts tend to be confirmed by sources with very different agendas.

### DeepReal Day 14 — Final Integration Assessment
**What it is:** The capstone test for the entire DeepReal module — a complex multi-layered scenario involving a deepfake video of an Egyptian health minister making dangerous medical claims. You apply every skill learned over 14 days: SIFT, source credibility, deepfake detection, emotional manipulation, social proof, claim tracing. Based on van der Linden (2022) "Foolproof." Completing it triggers advancement in your Inoculation Passport.
**When it helps you:** This is the final exam. Passing it means you can handle one of the most sophisticated misinformation attacks imaginable — a fake video of a real authority figure.

---

## DeepReal Advanced OSINT Exercises

### OSINT Basics — 5-Technique Investigation
**What it is:** A five-exercise deep investigation module covering: (1) reverse image search — uploading a photo to Google, TinEye, or Yandex to find where it originally appeared; (2) EXIF metadata extraction — reading the hidden data inside a photo file, like a digital fingerprint (EXIF is the technical name for this hidden data — it includes the camera model, date taken, and sometimes GPS location); (3) geolocation — cross-checking GPS coordinates embedded in a photo with Google Maps satellite imagery; (4) archive research — using the Wayback Machine to see what a website looked like in the past; (5) WHOIS domain lookup — checking who registered a website and when. Based on the Bellingcat OSINT Manual (Bellingcat is a world-renowned investigative journalism group that uses only public information to investigate conflicts and crimes).
**When it helps you:** For users who want to go further than basic fact-checking — to actually trace a photo, unmask a fake website, or verify a location claim with satellite evidence.

### Reverse Image Search — Egyptian Context
**What it is:** Five reverse image search scenarios tailored specifically to patterns common in Egyptian social media misinformation: old photos recycled as if they are current (a 2015 flooding photo reused in 2025), stock photos labelled as Egyptian scenes, images from other countries, photos that have been cropped to remove context, and AI-generated images. Each has step-by-step instructions and explains the red flags that confirm a photo is being misused.
**When it helps you:** Egyptian misinformation often recycles old, real photos with false captions. After this exercise, you will know exactly how to find the original photo and its true date and location.

### Metadata Analysis and C2PA Content Credentials
**What it is:** Five technical exercises in reading hidden information inside photo files. Includes: GPS coordinates that contradict where a photo claims to have been taken (a photo claimed to be from Sinai whose GPS points to Hurghada), signs that a timestamp has been forged, evidence of editing left inside the file by software like Photoshop, and C2PA credentials — a new digital standard (Coalition for Content Provenance and Authenticity) that works like a tamper-evident seal on media files, showing where a photo came from and whether it has been modified.
**When it helps you:** For sophisticated verification of high-stakes media. If someone claims a photo proves something happened somewhere at a specific time, you can check the metadata to confirm or contradict the claim.

### Audio Forensics — Detecting Manipulated Audio
**What it is:** Five exercises in detecting fake or edited audio. Covers: reading a spectrogram (a visual picture of sound — like an X-ray of an audio file) to spot signs of cloned voice; detecting unnatural cuts where the background noise changes suddenly, revealing a splice; recognising the digital fingerprints of AI voice synthesis tools; finding inconsistencies in background noise; and checking whether a speaker's mouth movements match the audio in a video.
**When it helps you:** A voice recording of a religious scholar or political figure surfaces on WhatsApp making alarming statements. This training gives you tools to check whether the voice is genuine.

### Video Forensics — Deepfake and Manipulation Detection
**What it is:** Five advanced video analysis exercises covering: face-swap artefacts (the blurry halo around a swapped face, hairline inconsistencies, unnatural ears), lip-sync testing (checking whether the mouth movements match the phonemes — the individual sounds — of the words), professional deepfake detection tools (Sensity AI, Microsoft Video Authenticator, Intel FakeCatcher, InVID WeVerify), real Egyptian-context deepfake scenarios, and how the story itself is sometimes the biggest red flag even before the technical analysis. Based on research from MIT Media Lab and the FaceForensics++ benchmark.
**When it helps you:** An Egyptian public figure appears in a video making dangerous or embarrassing statements. This module gives you a professional-level checklist to determine whether the video is genuine before sharing or acting on it.

### DeepReal Exercises 4–14 (Full TypeScript Data Module)
**What it is:** The complete technical data behind DeepReal exercises for days 4 through 14 — a structured file that the exercise engine reads to display each session. Each exercise contains: the scenario, the task (ranking, scenario response, or quiz), feedback, a list of what NOT to do, a confidence-tracking flag, and whether the exercise requires passing the Eight-Gate (a verification checkpoint within the platform). Categories range from source credibility (days 4–8) to detection tasks (days 9–13) to integration (day 14).
**When it helps you:** This is the data backbone of the DeepReal module. Without it, the exercise engine would have nothing to display. Users benefit every time they complete any of these exercises.

---

## Mental Health Engine Exercises

### MH Day 1 — Affect Labeling
**What it is:** Teaches you to name your emotions precisely instead of vaguely. "I feel bad" becomes "I feel disappointed because my effort was not recognised." Based on neuroscience research by Lieberman et al. (2007) showing that naming emotions accurately reduces their intensity in the brain. The task: match vague emotional expressions to their precise counterparts.
**When it helps you:** Precise emotional labelling is not just about vocabulary — it physically calms the emotional part of your brain. This is day one of building that skill.

### MH Day 2 — Anxiety Psychoeducation
**What it is:** A plain-language explanation of what anxiety actually is in the brain — specifically, the interaction between the amygdala (your brain's alarm bell) and the prefrontal cortex (your brain's thinking centre), and why the alarm bell sometimes fires when there is no real danger.
**When it helps you:** When you understand why anxiety happens neurologically, it feels less like a personal flaw and more like a biological process you can influence.

### MH Day 3 — Cognitive Restructuring Introduction
**What it is:** Teaches the basics of identifying and reframing automatic negative thoughts — the reflexive negative interpretations your brain generates before you even have time to think consciously (a technique at the core of Cognitive Behavioural Therapy — the most evidence-backed form of talking therapy).
**When it helps you:** Instead of accepting "I'm a failure" as a fact when something goes wrong, you learn to notice the thought, examine the evidence for and against it, and replace it with a more balanced interpretation.

### MH Day 4 — Behavioral Activation
**What it is:** A practical technique for depression — scheduling small, manageable activities that give you a sense of achievement or pleasure, even when you do not feel like doing anything. Based on a well-researched behavioural approach to treating low mood.
**When it helps you:** Depression often creates a cycle of withdrawal (not doing things) which makes the depression worse. Behavioural activation breaks that cycle through gentle, structured action.

### MH Day 5 — Mindfulness Introduction
**What it is:** A guided mindfulness practice — paying deliberate attention to the present moment without judging it — culturally adapted for Egyptian Muslim users, including connections to Islamic contemplative practices like dhikr (remembrance of God) and muraqaba (spiritual self-observation).
**When it helps you:** Builds a daily habit of returning attention to the present, which research consistently shows reduces anxiety and improves emotional regulation.

### MH Day 6 — Help-Seeking Pathways
**What it is:** A map of all the real mental health support options available to Egyptian university students: campus counselling centres, telehealth platforms, crisis hotlines. Each option is explained in plain terms.
**When it helps you:** Many people who need help do not seek it simply because they do not know what options exist or how to access them. This exercise removes that barrier.

### MH Day 7 — Stigma Recognition
**What it is:** Practises identifying stigmatising language and behaviour in Egyptian social contexts — the kind of comments heard in families, at work, or in media that discourage people from acknowledging or treating mental health problems.
**When it helps you:** You cannot fight stigma you cannot recognise. This exercise makes it visible so you can challenge it — in yourself and in others.

### MH Day 8 — Crisis Recognition
**What it is:** Teaches the warning signs that a mental health situation has become a crisis requiring urgent professional help — for yourself or someone you know — and explains when and how to escalate to professional care.
**When it helps you:** Many mental health emergencies are missed because people do not know what to look for. This training could make the difference between someone getting help in time or not.

### MH Day 9 — Islamic Perspectives on Mental Health
**What it is:** Integrates insights from Islamic scholars — including Al-Ghazali (an eleventh-century Islamic philosopher and psychologist) and Ibn Sina (a tenth-century physician whose medical writings shaped medicine for centuries) — on emotional wellbeing, alongside modern psychology. Shows that caring for your mental health is consistent with and supported by Islamic tradition.
**When it helps you:** For Egyptian Muslim users who feel tension between seeking psychological help and their faith, this exercise shows that the tension is based on a misreading — Islamic scholarship has always recognised the importance of caring for the mind and soul.

### MH Day 10 — Coping Skills Toolkit
**What it is:** A practical catalogue of coping strategies — divided into problem-focused coping (addressing the source of stress directly) and emotion-focused coping (managing your emotional response when you cannot change the situation) — with Egyptian-context examples for each.
**When it helps you:** Knowing multiple coping tools means you can choose the right one for each situation, rather than defaulting to avoidance or rumination.

### MH Day 11 — Safety Planning
**What it is:** A collaborative framework for creating a personal safety plan — a step-by-step written plan for what to do if you reach a crisis point — referencing the Befrienders Worldwide model (one of the world's leading suicide prevention organisations).
**When it helps you:** A safety plan created calmly in advance is far more useful than trying to think clearly in the middle of a crisis. This is the mental equivalent of knowing where the fire exits are before the fire starts.

### MH Day 12 — Social Support Mapping
**What it is:** Guides you to map out your real social support network — who in your life provides what kind of support — and identify gaps or relationships that could be strengthened.
**When it helps you:** Social connection is one of the strongest protective factors for mental health. Many people have more support available than they realise — or can take steps to build what is missing.

### MH Day 13 — Relapse Prevention
**What it is:** Teaches you to identify your personal early warning signs (changes in sleep, withdrawal, irritability) that a difficult mental health period might be returning, and helps you build a personalised plan for responding to those signs before they escalate.
**When it helps you:** Mental health, like physical health, requires maintenance. Recognising the early signs of a downturn — while you still have the capacity to act — gives you a much better chance of handling it effectively.

### MH Day 14 — Integration and Graduation
**What it is:** The final exercise of the Mental Health engine — integrating all skills from the 14-day module and computing end-of-module progress scores. Triggers Inoculation Passport advancement.
**When it helps you:** Marks a real milestone of completion and provides a measurable record of what you have learned.

---

## Mental Health Myth-Busting Modules

### Depression Myths Debunking (10 Egyptian Myths)
**What it is:** Ten of the most common depression myths in Egyptian culture — each presented as it is typically stated, then debunked with evidence from the DSM-5-TR (the official international manual used by psychiatrists to diagnose mental health conditions) and WHO. Myths include: "Depression is just laziness," "A true believer cannot be depressed," "Psychiatric medication is addictive," and "Talking about suicide encourages it." Each myth is connected to the help-seeking barrier it creates. The exercise includes Egyptian mental health hotlines and hospital references. Safety note with crisis numbers is included.
**When it helps you:** Your aunt insists that depression is a sign of weak faith and that the solution is more prayer. After this exercise, you have evidence-based, respectful responses — and you understand why those myths exist and why they are harmful.

### Anxiety Myths Debunking
**What it is:** The same myth-busting format applied to the most common Egyptian anxiety myths — particularly those framed through religious or cultural lenses.
**When it helps you:** Removes the same kind of false beliefs that stop Egyptians from acknowledging and treating anxiety — the second most common mental health problem globally.

### Stigma Navigation Scenarios (6 Egyptian Scenarios)
**What it is:** Six realistic stories of Egyptians who want mental health support but face real barriers — a family that would see it as shameful, a conservative community in Upper Egypt, a young man who has been taught that men do not show weakness. Each scenario ends with practical navigation strategies and a full resources appendix: the National Mental Health Hotline (08008880700), Behman Hospital (one of Egypt's oldest and most reputable psychiatric hospitals, founded in 1912), the national mental health institute, and the Nebny Foundation (an NGO providing free services).
**When it helps you:** Prepares you for the specific social dynamics you will actually face when trying to access mental health support in Egypt — not a generic Western scenario, but the real Egyptian context.

### Grief vs Depression Differential
**What it is:** Exercises that help you distinguish between normal grief (the sadness and loss that follows bereavement, which is expected and eventually passes) and clinical depression (a medical condition that requires professional treatment) — using both DSM-5-TR criteria and Islamic perspectives on grief and mourning, which validate grief as a natural and honourable human response while recognising when it has crossed into something that needs professional care.
**When it helps you:** Many Egyptians — and their families — dismiss depression as "just grief" after a loss, denying treatment to someone who genuinely needs it. This exercise gives you the tools to tell the difference.

---

## Religion Hub Engine Exercises

### Religion Hub Day 1 — Positive Religious Coping
**What it is:** Introduces the Brief RCOPE framework — a scientifically validated tool developed by Pargament (1997, 2011) that distinguishes between healthy religious coping (using faith as a genuine source of comfort and meaning — praying for strength AND seeking professional help) and spiritual bypassing (using religion to avoid addressing a real problem — "only pray, no medicine"). Seven specific healthy coping patterns are covered, and you practise classifying real scenarios.
**When it helps you:** Shows that there is nothing un-Islamic about seeking psychological or medical help — it is a form of using the mind and resources God gave us, not a replacement for faith.

### Religion Hub Day 2 — Negative Religious Coping Identification
**What it is:** The continuation of the RCOPE framework focusing on harmful religious coping patterns — when religion is used in ways that increase guilt, fear, and isolation rather than providing genuine comfort and support.
**When it helps you:** Helps you recognise when a religious message is making your mental health worse rather than better — and gives you language to identify and resist that pattern.

---

# Data and Content Assets — slice data-3 (plain-language)

This section covers all the data files and content pieces that power the platform's exercises, tools, and reference materials.

---

## Religion Hub Exercises (Days 3–14)

### Day-03 Community Support Matcher
**What it is:** A short matching exercise that helps you tell the difference between a religious group that genuinely cares for its members and one that uses control tactics — like isolating people, making them feel guilty, or shaming them into obedience.
**When it helps you:** You join a new religious study circle and something feels off. This exercise gives you a clear checklist so you can name exactly what feels wrong and decide whether to stay.

### Day-04 Forgiveness Psychology Exercise
**What it is:** A bilingual (Arabic and English) exercise that teaches the difference between forgiving someone to free yourself from anger — which is healthy — and being pressured to forgive someone who is still hurting you — which is not. It shows how Islamic teachings on forgiveness are sometimes misquoted to silence victims.
**When it helps you:** A family member tells you "Islam says you must forgive him" after someone harmed you. This exercise shows you what Islamic forgiveness actually means and when that advice is being misused.

### Day-05 Prayer and Wellbeing Exercise
**What it is:** An exercise that shows you two different roles prayer can play: as a healthy tool for calming your mind and focusing (like a form of meditation), versus as a substitute for medical treatment when you are actually sick. It draws a clear line between the two.
**When it helps you:** You are feeling depressed and someone tells you to just pray more and skip seeing a doctor. This exercise helps you understand that prayer and medicine are not enemies — they work together.

### Day-06 Doubt and Faith Exercise
**What it is:** An exercise based on a well-known theory about how people's faith grows over their lifetime. It helps you tell the difference between healthy intellectual questions about religion (which lead to deeper faith) and a genuine spiritual crisis that needs support.
**When it helps you:** You start questioning aspects of your faith and feel scared that something is wrong with you. This exercise shows you that asking questions is a normal, healthy part of belief — not a sign of weakness.

### Day-07 Gratitude and Patience (Sabr/Shukr) Evidence-Based Practice
**What it is:** An exercise that connects the Islamic ideas of sabr (صبر — patience through hardship) and shukr (شكر — gratitude) with actual scientific research on gratitude that confirms these practices reduce stress and improve wellbeing. It includes a practical drill where you practice being specific about what you are grateful for.
**When it helps you:** You feel like gratitude exercises are just empty positivity. This exercise shows you that both science and Islamic tradition point to the same truth, and teaches you a concrete way to practice it.

### Day-08 Spiritual Bypassing Detector
**What it is:** An exercise that helps you spot "spiritual bypassing" — when someone (or you yourself) uses religious language to avoid dealing with a real problem. For example, saying "just trust in God" as a way to avoid seeking help for depression. The exercise uses Arabic and English examples.
**When it helps you:** You feel sad or anxious and a well-meaning person keeps telling you religious phrases instead of encouraging you to get real support. This exercise helps you recognize the difference between genuine spiritual comfort and using religion to avoid reality.

### Day-09 Guilt vs. Healthy Remorse
**What it is:** An exercise that separates two very different feelings that look similar: toxic guilt (endless self-punishment and shame that defines who you are) versus healthy remorse (recognizing you did something wrong, fixing it, and moving on without destroying your self-worth).
**When it helps you:** You made a mistake and have been beating yourself up for months, feeling like you are a bad person forever. This exercise helps you see that Islam encourages repair and moving forward — not endless self-torture.

### Day-10 Islamic Scholar Credibility Check
**What it is:** An exercise that teaches you how to tell a genuinely qualified Islamic scholar from someone who only looks or sounds authoritative. It covers things like Al-Azhar University certification (the oldest and most respected Islamic institution), peer recognition among scholars, and published academic work.
**When it helps you:** You see a man with a beard and a robe on YouTube confidently giving religious rulings. This exercise gives you a checklist to find out whether he is actually qualified or just performing authority.

### Day-11 Radicalization Awareness (Moghaddam Model)
**What it is:** An advanced exercise based on a scientific model (called the "Staircase to Terrorism") that describes the five steps through which a normal person can be gradually pulled toward extremism. It helps you recognize warning signs — in yourself or someone you know — versus simply having strong, sincere faith.
**When it helps you:** You are worried about a younger brother or friend who has started following a very angry online preacher. This exercise helps you identify specific warning signs and understand when to seek help from Al-Azhar's official counter-extremism resources.

### Day-12 Moderate Interpretation Drill
**What it is:** An exercise that shows you the same event or situation described in two ways: the moderate mainstream Islamic framing versus an extremist framing. It is anchored in the Islamic principle of Wasatiyyah (الوسطية — the "middle path" or balanced approach).
**When it helps you:** You read a post that says a world event "proves Muslims are under attack and must respond with force." This exercise trains you to recognize how extremists twist neutral events into calls for violence.

### Day-13 Religion–Medicine Boundary Exercise
**What it is:** An exercise that classifies different scenarios into two categories: cases where religious practice works alongside medicine (healthy and encouraged), and cases where someone uses religion as a reason to refuse or delay medical treatment (dangerous). It includes examples like ruqyah (Quran recitation for healing) and refusing psychiatric care.
**When it helps you:** A family member refuses to take their medication because a sheikh told them ruqyah is enough. This exercise helps you explain — with clear examples — why this is a misreading of Islamic teaching.

### Day-14 Positive Coping Integration Exercise
**What it is:** The final exercise of the 14-day Religion Hub course. It brings together all seven healthy religious coping strategies covered across the course — things like seeking God's support, seeing hardship as meaningful, and spiritual connection. You classify statements across all seven types to show you have mastered the full picture.
**When it helps you:** You finish the 14-day course and want to check how much you have actually learned. This capstone exercise confirms you can recognize and apply all the tools.

---

## Science Exercise Registry

### Science-Panel Theory Registry (DeepReal)
**What it is:** A behind-the-scenes data table that connects each day of the DeepReal (fake-news detection) exercise course to the actual scientific theory that exercise is based on. It records the theory name, who created it, what year, how it works, and how strong the evidence for it is.
**When it helps you:** While doing a DeepReal exercise, you see a "Science" panel that says "This exercise is based on Inoculation Theory (Compton, 2013)." That information comes from this registry — it is the platform proving it is not making things up.

### Science-Panel Theory Registry (Mental Health)
**What it is:** The same kind of table, but for the Mental Health module. It links each Mental Health exercise day to its scientific framework — for example, Affect Labeling (the research showing that naming your emotions reduces their intensity) or CBT (Cognitive Behavioural Therapy, a well-proven method for treating anxiety and depression).
**When it helps you:** Same as above — the Science panel in every Mental Health exercise draws from this table to show you the real research behind what you are learning.

### Science-Panel Theory Registry (Religion Hub)
**What it is:** The same table for the Religion Hub module. It connects each Religion Hub exercise to frameworks like Pargament's Religious Coping research (a major body of work on how religion affects mental health) and Radicalization Models.
**When it helps you:** Same — every Religion Hub exercise can show you exactly which published research it is based on.

---

## Science Track Exercises (Phase 1, Days 3–35)

### SCIENCE_EXERCISES Registry
**What it is:** A master list of all 33 science-track exercises built so far (covering days 3 through 35), each tagged with an ID, a file name, which day it belongs to, and a difficulty rating from 1 (easy) to 5 (very hard). It also notes that days 57–98 are planned but not yet built.
**When it helps you:** The platform uses this list to load the correct exercise when you reach a given day, so you always get the right content at the right difficulty.

### P-Hacking Audit (Day 3)
**What it is:** An exercise about a type of scientific fraud called "p-hacking." The "p" stands for a statistical measurement called a p-value (a number that tells you whether a result is likely real or just random chance). P-hacking means researchers secretly try many different calculations on their data until they get a p-value that looks good — making a fake result appear real. This exercise uses a real scandal (the Cornell Food Lab case) to show you how to catch it.
**When it helps you:** You read a news story saying "Scientists PROVE that eating X makes you smarter!" This exercise helps you ask the right questions to find out whether the research was honest.

### HARKing (Day 4)
**What it is:** An exercise about "HARKing" — Hypothesizing After Results are Known. This means a researcher runs an experiment, sees what the data shows, then pretends they predicted that result before they started. It is like writing down a lottery number after the draw and claiming you predicted it. The exercise uses real retracted (officially withdrawn) papers as examples.
**When it helps you:** You learn to spot studies where the "hypothesis" was suspiciously perfectly matched to the results — a red flag for dishonest research.

### Forking Paths (Day 5)
**What it is:** An exercise about "researcher degrees of freedom" — the idea that when analyzing the same data, a researcher has dozens of choices (which people to include, which variables to measure, how to handle outliers). Different choices produce wildly different results. The exercise shows this visually. "Multiverse analysis" means testing all possible paths to see how fragile the result is.
**When it helps you:** You understand why two studies on the same topic can reach completely opposite conclusions — not because one lied, but because they made different choices.

### Bonferroni Correction (Day 6)
**What it is:** An exercise about a mathematical fix used when researchers test many things at once. If you test 20 things looking for anything "significant," one will probably look significant just by chance. The Bonferroni Correction (named after an Italian mathematician) adjusts the threshold to account for this — making it harder to call something a real finding.
**When it helps you:** You see a study that tested 50 vitamins and found one that "works." This exercise helps you understand why that single finding is probably a false alarm without the correction.

### Regression to the Mean (Day 7)
**What it is:** An exercise about a natural statistical effect called "regression to the mean." When something is measured at an extreme (very bad or very good), it tends to move back toward average on the next measurement — on its own, with no treatment at all. Researchers who do not account for this can mistakenly think their treatment worked.
**When it helps you:** A product claims that after using it, people who scored very low on a test improved dramatically. This exercise helps you ask: did they improve because of the product, or just because extreme scores naturally move toward average?

### Simpson's Paradox (Day 8)
**What it is:** An exercise about a surprising effect called Simpson's Paradox, where combining two groups of data makes a trend look real that actually disappears (or reverses) when you look at each group separately. It is named after the statistician who described it.
**When it helps you:** A headline says "Hospital A has a better survival rate than Hospital B." This exercise helps you see that Hospital B may actually be better — it just treats more critically ill patients, which drags its overall numbers down.

### Ecological Fallacy (Day 9)
**What it is:** An exercise about a mistake called the Ecological Fallacy — drawing conclusions about individual people from data collected about whole groups. For example: "Countries that eat more chocolate win more Nobel Prizes" does not mean chocolate makes individuals smarter.
**When it helps you:** You see a statistic about a country or city and someone uses it to make a claim about individual people from that place. This exercise shows you why that leap is almost always wrong.

### Atomistic Fallacy (Day 10)
**What it is:** The opposite mistake to the Ecological Fallacy: drawing conclusions about groups from individual-level data. Just because one person you know had a bad experience does not mean the group shares that experience.
**When it helps you:** Someone says "I know three people who got the flu after the vaccine, so the vaccine causes flu." This exercise helps you explain why individual stories cannot prove claims about whole populations.

### Survivorship Bias (Day 11)
**What it is:** An exercise about a mental blind spot called Survivorship Bias — we only see the things that survived (succeeded, were published, are still standing) and draw conclusions from them, ignoring all the ones that failed silently. The classic example is analyzing only planes that returned from war to figure out where to add armor — ignoring the ones that never came back.
**When it helps you:** Someone says "Successful people all dropped out of college, so college is useless." This exercise shows you the hidden population: the vast majority of dropouts you never hear about.

### Selection Bias (Day 12)
**What it is:** An exercise about how the people chosen for a study can distort the results. If only certain types of people join the study (richer people, healthier people, people who are already interested in the topic), the results will not apply to everyone.
**When it helps you:** A diet company says "95% of our customers lost weight." This exercise helps you ask: who were the customers? Were they self-selected people already motivated to lose weight?

### Sampling Issues (Day 13)
**What it is:** An exercise about the difference between a truly representative sample (a group that genuinely reflects the whole population) and a convenience sample (just the people who happened to be available). A bad sample makes the results useless for everyone else.
**When it helps you:** A poll says "70% of Egyptians support X" but it was conducted only among university students in Cairo. This exercise helps you recognize when a sample is too narrow to support such a big claim.

### Volunteer Bias (Day 14)
**What it is:** An exercise about a specific sampling problem: people who volunteer for studies are different from people who do not. Volunteers tend to be more health-conscious, more educated, and more motivated — so results from volunteer studies cannot be generalized to average people.
**When it helps you:** A supplement study says "Participants who took our supplement felt 40% healthier." The people who signed up for a supplement study were already health-obsessed — this exercise helps you see why that result probably does not apply to you.

### Publication Bias (Day 15)
**What it is:** An exercise about the "file-drawer problem": studies that find a positive result get published; studies that find nothing get filed away and never seen. This means the published scientific literature is biased toward positive results, making treatments look more effective than they are.
**When it helps you:** You search for studies on a supplement and only find ones saying it works. This exercise explains why the studies showing it does not work probably exist but are hidden in file drawers.

### Funnel Plot Interpretation (Day 16)
**What it is:** An exercise on reading a specific type of chart called a funnel plot, which researchers use to visually check whether a collection of studies on the same topic is missing the negative ones (publication bias). An asymmetric funnel shape is a warning sign.
**When it helps you:** You are evaluating a meta-analysis (a study of studies) and want to know if the summary is trustworthy. This exercise gives you the visual literacy to spot when something is missing.

### Effect Size (Day 17)
**What it is:** An exercise about a concept called effect size — a measure of how big a difference actually is, not just whether it is statistically real. A common measure is Cohen's d (named after statistician Jacob Cohen). Something can be statistically significant (real) but so tiny it makes no practical difference in your life. An odds ratio tells you how much more likely an outcome is in one group vs. another.
**When it helps you:** A headline says "Coffee SIGNIFICANTLY reduces cancer risk!" This exercise helps you ask: how much does it reduce it? The answer is often "by 0.001%" — real but meaningless.

### Confidence Intervals (Day 18)
**What it is:** An exercise on confidence intervals (CI) — a range of numbers that shows how precise a research finding is. Instead of just saying "the drug reduces pain by 30%," a CI says "we are 95% confident the true effect is somewhere between 5% and 55%." A wide range means the result is uncertain.
**When it helps you:** A news article quotes a single number from a study. This exercise trains you to ask for the confidence interval — because a single number hides how uncertain the finding actually is.

### P-Value Significance (Day 19)
**What it is:** An exercise correcting the most common misunderstanding in all of science: what a "p-value" actually means. A p-value is NOT the probability that the result is true. It is the probability of seeing results this extreme if there were no real effect at all. This exercise addresses all the common wrong interpretations.
**When it helps you:** Any time someone says "the study was statistically significant so it must be true." This exercise gives you the exact words to explain why that reasoning is wrong.

### Bayes Factor (Day 20)
**What it is:** An advanced exercise about a different way of measuring scientific evidence called the Bayes Factor (BF), using a scale developed by two statisticians (Kass and Raftery) in 1995. Unlike p-values, a Bayes Factor tells you how much the data should update your belief — and crucially, it can tell you when evidence supports the null hypothesis (i.e., the treatment does not work).
**When it helps you:** A clinical trial finds no effect. Is that because the treatment truly does not work, or because the study was too small? The Bayes Factor helps answer this question — this exercise explains how.

### Likelihood Ratio (Day 21)
**What it is:** An exercise about likelihood ratios — a tool used in medicine to figure out how much a test result changes the probability that you actually have a disease. A positive test does not mean you definitely have the disease; the likelihood ratio tells you by how much the probability increased.
**When it helps you:** You get a positive result on a health screening test. This exercise helps you understand what "positive" really means in terms of actual probability, so you do not panic unnecessarily.

### Prior Specification (Day 22)
**What it is:** An exercise about a key idea in Bayesian statistics (a branch of statistics based on updating beliefs with evidence): the "prior" — your starting belief before you see the data. The exercise shows how different starting assumptions lead to different conclusions from the same data.
**When it helps you:** You understand why two honest scientists can look at the same study and reach different conclusions — their starting assumptions differ. This exercise shows you when that disagreement is legitimate versus when someone is gaming the system.

### Frequentist vs. Bayesian (Day 23)
**What it is:** An exercise comparing two fundamentally different schools of statistical thinking — Frequentist (the traditional approach focused on repeating experiments) and Bayesian (updating beliefs with evidence). Both are legitimate; they just answer slightly different questions.
**When it helps you:** Scientists and commentators sometimes talk past each other because they are using different frameworks. This exercise helps you understand both sides of that debate.

### Stopping Rules (Day 24)
**What it is:** An exercise about what happens when a researcher peeks at their data while a study is still running and stops as soon as they see a good result. This "optional stopping" inflates false-positive rates — it is like flipping a coin repeatedly and stopping the moment you get three heads in a row, then claiming the coin is biased.
**When it helps you:** You see a company announce their product works based on an interim analysis. This exercise helps you know to ask: did they pre-register when they would stop the study?

### Optional Stopping (Day 25)
**What it is:** A deeper exercise extending the stopping-rule lesson, with more practice scenarios and strategies for catching this flaw in real published research.
**When it helps you:** Reinforces the previous day's lesson with additional real-world cases.

### Degrees of Freedom (Day 26)
**What it is:** An exercise about how exploiting hidden choices in data analysis ("researcher degrees of freedom") can make a completely fake result look real. Researchers who are not deliberately dishonest can still fall into this trap.
**When it helps you:** You want to evaluate whether a finding from a small lab is reliable before sharing it. This exercise gives you the questions to ask.

### Outlier Handling (Day 27)
**What it is:** An exercise on how researchers deal with extreme data points (outliers). Transparent researchers set rules for handling outliers before they look at the data. Selective researchers remove outliers only when doing so improves their result. This exercise teaches you the difference.
**When it helps you:** You see a study with a very clean result and wonder if it is too good to be true. Selective outlier removal is one reason results can look cleaner than reality.

### Data Dredging (Day 28)
**What it is:** An exercise on "data dredging" (also called "fishing" or "specification searching") — running many different analyses on the same dataset until one produces a significant result. Like trying enough combinations on a lock, you will eventually get lucky even with random data.
**When it helps you:** A study finds a strange correlation (e.g., chocolate consumption predicts Nobel prizes). This exercise helps you recognize when a result is likely the product of a data fishing expedition.

### Missing Data (Day 29)
**What it is:** An exercise on how to handle participants who drop out of a study or skip questions. "Multiple Imputation" (MI) is a mathematical technique to fill in missing data intelligently rather than simply throwing out incomplete cases (which biases results). Difficulty 4.
**When it helps you:** You evaluate a drug trial and notice 30% of participants dropped out. This exercise helps you ask whether the researchers handled that responsibly.

### Missing at Random (Day 30)
**What it is:** An exercise distinguishing three different types of missing data: MCAR (Missing Completely At Random — dropout is unrelated to anything), MAR (Missing At Random — dropout is related to observed factors), and MNAR (Missing Not At Random — dropout is related to the outcome itself, e.g., people who felt worse stopped responding). Each type requires different handling.
**When it helps you:** You understand why "some people did not respond" in a survey can completely change the meaning of the results.

### ITT vs. PP (Day 31)
**What it is:** An exercise on two ways of analyzing clinical trial data: Intention-to-Treat (ITT — analyze everyone who was assigned to a group, even those who stopped the treatment) versus Per-Protocol (PP — analyze only those who followed the treatment perfectly). ITT is more conservative and realistic; PP can look more impressive but is more biased.
**When it helps you:** A drug company reports results using only patients who "completed the full course." This exercise helps you understand why that choice flatters their drug.

### Subgroup Analysis (Day 32)
**What it is:** An exercise on when it is valid to look at a subgroup of participants (e.g., women over 50) versus when it is a fishing trip. Post-hoc subgroup analysis (done after seeing the full results) is almost always invalid unless it was pre-planned.
**When it helps you:** A drug fails to show a benefit overall, but the company says "it works for people over 65." This exercise helps you evaluate whether that subgroup claim is real or cherry-picked.

### Interaction Effects (Day 33)
**What it is:** An exercise on the difference between a main effect (a treatment works equally for everyone) and a moderation or interaction effect (a treatment works differently depending on some other factor, like age or sex). Many researchers confuse these.
**When it helps you:** A study says a supplement works for athletes. This exercise helps you check whether that finding was properly tested as an interaction or just assumed.

### Confounding (Day 34)
**What it is:** An exercise on confounders — hidden third variables that create a fake relationship between two things. The classic example: ice cream sales and drowning deaths both rise in summer, but ice cream does not cause drowning. The confounder is hot weather.
**When it helps you:** You see a headline like "People who drink coffee live longer." This exercise helps you ask: what other differences exist between coffee drinkers and non-drinkers that might explain this?

### Collider Bias (Day 35)
**What it is:** An advanced capstone exercise on a subtle and counter-intuitive statistical trap called "collider bias." A collider is a variable that is caused by two other things. When you control for (adjust for) a collider in your analysis, you can actually create a fake relationship that does not exist in reality — the opposite of what most people expect.
**When it helps you:** You evaluate a study that adjusts for many variables and wonder if the adjustments themselves might be creating misleading results. This exercise gives you the tools for that advanced check.

---

## Exercise Translation Registry

### Arabic Item Translation Fallback Map
**What it is:** A behind-the-scenes lookup table that stores Arabic translations of exercise questions and answers. When an exercise file does not contain its own Arabic version, the platform automatically looks up the correct Arabic text from this table instead of breaking or showing English. RTL stands for Right-to-Left — the direction Arabic text is written.
**When it helps you:** You switch the platform to Arabic and every exercise still shows correctly in Arabic, even exercises that were originally written only in English.

---

## Global Regulatory Institutions

### Global Regulatory Organization Registry
**What it is:** A carefully researched list of the world's most important health and safety organizations — such as the WHO (World Health Organization), FDA (United States food and drug regulator), and EMA (European Medicines Agency). Each entry includes the organization's official name, where it is based, when it was founded, what it covers, and verified numbers (like budget and staff size) with links to prove them.
**When it helps you:** When the platform tells you "According to the WHO..." it draws from this registry. You can see exactly why that organization was chosen as an authority — not just because someone said so.

---

## Language Strings (i18n)

### Chatbot Trilingual String Map
**What it is:** A data table containing every word, label, and message shown in the platform's chatbot — in three languages: English, Standard Arabic (فصحى), and Egyptian dialect (عامية مصرية). It covers everything from buttons and loading messages to error notices.
**When it helps you:** You use the chatbot in Egyptian dialect and everything — every button, every message — appears in your natural way of speaking, not in formal language that feels distant.

### Site-Wide Trilingual String Map
**What it is:** The same kind of table but for the whole website — navigation menus, homepage headlines, descriptions of the three main tools (DeepReal, Mental Health, Religion Hub), tour steps, and evidence sections — all in English, Standard Arabic, and Egyptian dialect.
**When it helps you:** The entire platform can switch languages without a developer changing a single line of code, because all text lives in this one centralized table.

### Exercise Engine Bilingual UI Map
**What it is:** A table of all the labels and buttons used inside exercises — things like difficulty levels, phase names, confidence slider labels, and the eight quality-check boxes. Every label exists in both English and Arabic.
**When it helps you:** Every exercise on the platform shows consistent Arabic labels everywhere, with no mixed-language confusion.

---

## Psychometric Instruments (Measurement Tools)

### Brief RCOPE Instrument (TypeScript file)
**What it is:** A full 14-question psychological questionnaire — a scientifically validated test called the "Brief Religious Coping Scale" — measuring how a person uses religion to cope with hardship. Seven questions measure healthy religious coping (seeking God's support, finding meaning); seven measure harmful patterns (feeling abandoned by God, spiritual guilt). Respondents answer on a 1–4 scale. It has been tested for reliability (α = .90/.81 means it gives consistent results). The Arabic labels are included.
**When it helps you:** You take this test at the start of the Religion Hub and again at the end. The platform uses the score change to show you whether the course actually shifted how you relate to religion in hard times.

### Brief RCOPE Instrument (Companion data file)
**What it is:** A machine-readable version of the same questionnaire with full research details — the original citation, the doi (digital identifier to find the paper), a scoring formula, and population norms (typical scores from real research populations).
**When it helps you:** This file allows the platform to automatically calculate and explain your score correctly, and to show supervisors and researchers the proper academic documentation.

### GHSQ Instrument
**What it is:** A 17-question questionnaire called the General Help-Seeking Questionnaire that measures how likely you are to seek help from different sources (a doctor, a friend, a family member, a religious leader, a professional counselor) when you are struggling emotionally or having thoughts of self-harm. It has been adapted for Egyptian university students and includes Egypt's mental health crisis line number (16328).
**When it helps you:** You take this at the start and end of the platform. If the course works, your score should show increased willingness to seek professional help.

### MC-SDS Instrument
**What it is:** A 13-question True/False test called the Marlowe-Crowne Social Desirability Scale — it measures how much a person tends to give "socially acceptable" answers rather than honest ones. This is used as a control variable (a way to adjust for the fact that some people answer questionnaires the way they think they should, not the way they actually feel). α = .76 means it reliably measures what it claims to measure.
**When it helps you:** This helps the platform give more accurate results. If someone scored very high on honesty-bias, the platform can mathematically adjust for that when calculating real wellbeing changes.

### MHLS Instrument
**What it is:** A 35-question Mental Health Literacy Scale that measures how much someone knows about mental health — specifically: can they recognize a disorder, do they know its risk factors, do they know where to get help, and do they hold stigmatizing attitudes. It uses multiple question types (1–4 and 1–5 scales). Arabic translations are included.
**When it helps you:** You take this before and after the Mental Health course. The score change is one of the main measures of whether the course worked.

### MIST-20 Instrument
**What it is:** A 20-headline test called the Misinformation Susceptibility Test where you read real and fake news headlines and judge which are true. Your accuracy score measures how susceptible you are to misinformation. The platform currently has a "blocked for Arabic" flag turned on — because a proper Arabic adaptation of this test does not yet exist, and the platform refuses to use a test on Arabic speakers if it has not been validated for them. This is part of the project's "One-Law" commitment — no tool reaches users without a real source backing it.
**When it helps you:** This is the primary pre/post test for the DeepReal (fake news) module. Once an Arabic adaptation is validated, it will measure how much better you got at spotting fake news.

### SUS Instrument
**What it is:** A 10-question System Usability Scale — a standard questionnaire used worldwide to measure how easy a piece of software is to use. Scores run from 0 to 100. A score of 68 is considered average; 80.3 or above is Grade A (excellent). The platform needs to reach 68 or higher to pass its usability test.
**When it helps you:** After using the platform, you answer these 10 questions. Your answers directly tell the developers whether the platform is intuitive or frustrating.

### SUS Companion Data File
**What it is:** A machine-readable version of the SUS questionnaire data with full documentation, used by the system for automated checks.
**When it helps you:** Same as above — ensures the usability score is calculated correctly every time.

### Instruments Index
**What it is:** A single entry point that imports and re-exports all six measurement tools in one place, with a table showing exactly when each tool is administered (before the course, after the course, or only once).
**When it helps you:** Any part of the platform that needs to run a questionnaire pulls it from this one central location — preventing errors from importing the wrong version.

---

## Intervention Schedule

### 17 Non-Exercise Intervention Modes Registry
**What it is:** A detailed list of 17 small interactive tools — separate from the main exercises — that are shown to users throughout the 14-day course. Examples include: a "Source of the Day" briefing (a daily dose of fact-checking knowledge), a Confidence Logging tool (where you record how sure you are about a claim), a Myth Autopsy Board (analyzing why a specific myth spread), a Bias Reflection Minute (a 60-second self-check on your thinking), and a Peer Pair Review. Each tool has an ID, description, how long it takes, which days it appears, and whether it is currently built.
**When it helps you:** The platform does not just show you exercises — it sprinkles small interactive moments throughout your day to keep the learning active and varied.

### getModesForDay() Helper
**What it is:** A small automatic function that looks at what day of the course you are on and returns only the intervention tools that should appear that day. It can also filter by which version of the platform (MVP — Minimum Viable Product) is running.
**When it helps you:** The platform automatically shows the right tools on the right day without human decision-making — the schedule runs itself.

### DAY_SCHEDULE Constant
**What it is:** A lookup table that maps day ranges (days 1–3, 4–6, 7–9, 10–12, 13–14) to the full set of intervention tools active during that period. The list grows as the course progresses.
**When it helps you:** Overview pages and supervisor dashboards can show exactly what interventions are active at any point in the course.

---

## IRL (In Real Life) Knowledge Store

### IRL Micro-Node Content Store
**What it is:** A content library that powers the "Apply in Real Life" button inside exercises. When you click it, a side panel opens with a 3-step plan for applying what you just learned to a real situation, three specific scientific methods with exercises, and links to sources. It covers topics like detecting deepfakes (a deepfake is a video or image where someone's face or voice is replaced by AI — like a video of a politician saying something they never said), reducing stigma, and using prayer healthily.
**When it helps you:** You finish an exercise and think "but how do I actually use this tomorrow?" The IRL panel gives you a concrete action plan grounded in research.

### Top 100 Trusted Sources with Academic Citations
**What it is:** A library of 100 carefully selected academic sources — research papers, studies, and institutional reports — covering fake news, mental health, religious coping, research methods, psychology, and Egypt-specific topics. Each entry records the title, authors, year, journal name, a link to the source, the key findings, and why it is relevant to this platform.
**When it helps you:** Every claim the platform makes can be traced to one of these 100 sources. This is the backbone of the platform's credibility.

---

## Islamic Reference Data

### Nasikh-Mansukh (Abrogation) Database
**What it is:** A specialized Islamic reference database about nasikh and mansukh (النسخ والمنسوخ) — which means "abrogation," the Islamic scholarly principle that some Quranic verses or rulings from the Prophet's time were later superseded or replaced by newer ones. The database lists which verses were abrogated, what replaced them, and what type of change it was — with explanations in Arabic and English and references to classical Islamic scholars like Ibn Kathir. This is a well-established field of Islamic jurisprudence.
**When it helps you:** Extremists or manipulative preachers sometimes quote a verse that has been abrogated (replaced) as if it still applies today. The platform uses this database to flag such misuse and explain the full scholarly context.

---

## KeyHunter Entries

### KeyHunterEntry Type (Data Model)
**What it is:** The structural template — like a fill-in form — that every KeyHunter entry must follow. It requires seven "layers" of keywords: core everyday terms, expert technical terms, hidden terms manipulators use, research phrases, threat keywords, confusing terms that sound similar, and prompt suggestions. This enforces consistency across all 42 entries.
**When it helps you:** Every search, exercise tag, and AI prompt suggestion on the platform follows the same reliable structure — no entries are missing crucial layers.

### DeepReal KeyHunter Entries (14 topics)
**What it is:** Fourteen complete keyword packages — one for each day of the DeepReal course — covering topics like SIFT (a fact-checking method: Stop, Investigate, Find better coverage, Trace claims), source credibility, deepfake detection (deepfake = AI-generated fake video), emotional manipulation triggers, prebunking (teaching people about manipulation before they encounter it), archive verification, confirmation bias, filter bubbles, and synthetic media. Each package has all seven keyword layers and an academic citation.
**When it helps you:** When you type something into the platform's search or AI chat, the KeyHunter uses these layers to find the most relevant, precise results — not just loose keyword matches.

### Mental Health KeyHunter Entries (14 topics)
**What it is:** The same type of 14 keyword packages for the Mental Health course — covering Affect Labeling (naming your emotions), stress, anxiety, depression, the PERMA model (a framework for wellbeing: Positive emotion, Engagement, Relationships, Meaning, Achievement), stigma, help-seeking, cognitive reframing, sleep, resilience, and emotion regulation. Expert keywords reach into clinical terminology used by psychiatrists and psychologists.
**When it helps you:** Same as above — ensures precise search and routing for all Mental Health topics.

### Religion Hub KeyHunter Entries (14 topics)
**What it is:** Fourteen keyword packages for the Religion Hub course. The "confusing words" layer is especially important here — it distinguishes terms manipulators misuse from their correct meanings, protecting against harmful misinterpretation.
**When it helps you:** When someone searches a religious topic on the platform, the confusionWords layer helps the system avoid showing manipulative content alongside genuine scholarship.

### KeyHunter Index (Combined List and Helpers)
**What it is:** A single file that combines all 42 KeyHunter entries (14 per module) into one combined list, with two helper functions: one to look up any entry by its ID, one to get all entries for a specific module (DeepReal, Mental Health, or Religion Hub).
**When it helps you:** Any part of the platform that needs keyword data imports it from this one place — no duplication, no inconsistency.

---

## Methodology Metadata

### Global Methodology Metadata
**What it is:** A transparency document describing exactly how the platform's source rankings were built — which 8 databases were searched (including WHO, FDA, Nature Index, and OpenAlex), what Boolean search strings (combinations of AND/OR/NOT keywords used in database searches) were used, how two independent sources were required to confirm any number, and how institutions were ranked. It records when the data was extracted and shows the comparison tables used to decide which organizations are most authoritative.
**When it helps you:** When you visit the "How We Did This" section, you see exactly how the platform decided who to trust — with full transparency, not just "trust us."

---

## Navigation / Search

### Site-Wide Content Search Tags
**What it is:** A large lookup table connecting every major page and section of the platform to a set of keywords in both English and Egyptian Arabic. When you type something into the search bar, the platform matches your words against these keyword lists to show you the right page or section — including pages deep inside the site that would be hard to find by clicking.
**When it helps you:** You type "Am I being manipulated?" into the search bar and it takes you directly to the manipulation-detection section, even though that is not the exact page title.

---

## Organizations Directory

### Global Alliance Directory
**What it is:** A curated directory of organizations around the world working on fact-checking, media literacy, AI ethics, religious literacy, mental health, OSINT (Open Source Intelligence — the practice of finding and verifying information from publicly available sources like social media, news sites, and public records), academic research, and digital rights. Each entry includes the organization's name in Arabic, its region, website, and a verified status flag.
**When it helps you:** If you want to connect with a real organization working on fake news in the Arab world, or a mental health helpline in Egypt, this directory points you there.

---

## Prompt Libraries

### DeepReal Prompt Library (24 Prompts)
**What it is:** A collection of 24 pre-written AI prompts — ready-to-use instructions you give to an AI assistant — specifically designed for fact-checking tasks. They cover strategies like breaking a claim into smaller checkable pieces, finding the original source of a claim, checking for emotional manipulation language, comparing an old version of a webpage to its current version (archive comparison), and generating a watchlist of suspicious sources. Each prompt has a placeholder — like {claim} or {url} — where you fill in the specific thing you want to check.
**When it helps you:** Instead of not knowing what to ask an AI, you pick one of these ready-made prompts for your situation — for example, "I want to check if this health claim is manipulative" — and it generates a precise, safe, evidence-demanding question for you.

### Mental Health Prompt Library (9 Prompts)
**What it is:** Nine pre-written prompts for mental health topics. All of them have a built-in guardrail — a hard rule against diagnosing any condition. They cover getting clear definitions, understanding the limits between normal distress and a disorder, reducing stigma, finding help, and communicating with family members about mental health.
**When it helps you:** You want to use an AI to learn more about anxiety but worry it will tell you that you have a disorder. These prompts are designed to inform without diagnosing.

### Religion Hub Prompt Library (9 Prompts)
**What it is:** Nine pre-written prompts for religious topics. All of them have a hard rule against producing fatwas (فتوى — an Islamic legal ruling that only qualified scholars can issue). They cover explaining positive coping, detecting boundary violations, finding the moderate interpretation of a situation, and assessing community dynamics.
**When it helps you:** You want to ask an AI about an Islamic concept but do not want it to pretend to be a scholar. These prompts keep the AI in its lane — information only, no religious verdicts.

### Logical Fallacies and Heuristics Datasets
**What it is:** Four large datasets used throughout the platform: (1) over 100 named logical fallacies (errors in reasoning) sorted into categories including Islamic argumentation; (2) 40 valid argument forms (correct ways to reason, like syllogisms — if A then B, A is true, therefore B is true); (3) 30 critical thinking rules of thumb; (4) 30 emotional intelligence skills. Together these form the vocabulary the platform uses to classify and explain thinking patterns.
**When it helps you:** When the platform tells you "this argument uses the Appeal to Authority fallacy," it draws from these datasets. You can also browse the full lists to build your own reasoning toolkit.

### Prompt Index (Combined List)
**What it is:** A single entry point combining all 42 prompts from the three modules, with helper functions to get prompts by module or by ID. Because each prompt has variable slots, the 42 templates actually produce 250+ different specific queries at runtime.
**When it helps you:** Any part of the platform that needs a prompt pulls it from here — ensuring prompts are consistent and no module gets outdated versions.

---

## Self-Test Protocol

### SELF_TEST_PILLARS
**What it is:** Four foundational principles that describe how the platform's research study is designed: (1) always measure before and after; (2) use multiple validated questionnaires, not just one; (3) do not expose users to unvalidated tools; (4) define failure conditions in advance.
**When it helps you:** The "How This Study Works" page shows these principles so that supervisors, researchers, and users can understand the scientific standards behind the platform.

### SELF_TEST_ROUTE_STEPS
**What it is:** A step-by-step schedule of the measurement process: Day 0 (take all baseline questionnaires), then the 14-day course, then Day 15 (take all the same questionnaires again), then statistical analysis.
**When it helps you:** An interactive timeline on the protocol page shows you exactly what happens when, so there are no surprises.

### SELF_TEST_RISKS
**What it is:** A list of explicit failure conditions — things that would prove the platform did not work — each with a control strategy. Examples: if test scores do not improve significantly, if users' coping gets worse instead of better, if usability scores are too low, or if too many users drop out. These were written before the study began so the researchers cannot pretend failure is success.
**When it helps you:** Supervisors and defense committees can see that the researchers pre-registered what "failure" looks like — a sign of honest, rigorous research.

---

## Content Provenance

### Exercise Provenance Registry (3-Source Rule)
**What it is:** A transparency record for every one of the 42 exercises. For each exercise it records: the primary source (the main paper or institution it is based on), a comparative source (a second independent source that confirms the same finding), a methodological source (a source confirming the method used), the strength of the evidence (ranging from "systematic review" — the strongest — down to "expert opinion" — the weakest), the date the content was last reviewed, and whether it passed review. Every exercise must have three sources to comply with the platform's content rules.
**When it helps you:** When you click "Sources" on any exercise, you see all three sources and their evidence tier. The platform cannot publish an exercise without this record.

---

## Publishing Plan

### Publishing Phases Timeline
**What it is:** A roadmap in Arabic and English showing the planned stages for releasing the platform: starting with GitHub (code sharing), then PWA (Progressive Web App — a website that works like a phone app, installable without an app store), then official App Stores (Google Play, Apple App Store), then submitting findings to academic journals, then regional partnerships in the Arab world.
**When it helps you:** Supervisors, investors, and collaborators can see the realistic post-pilot plan in one clear table.

---

## Research Data Modules

### Authored Casebook (Brain Exercises, Myths, Scenarios, Tricks, Reverse Cases)
**What it is:** Egypt-specific practice content written specifically for this platform — not adapted from foreign materials. This includes real Egyptian WhatsApp rumor patterns, health misinformation scenarios that Egyptian families actually encounter, and insider tricks for verifying claims in the Egyptian context. Each item is available in English, Standard Arabic, and Egyptian dialect, with intensity levels and decision logic.
**When it helps you:** Instead of learning about fake news through American or European examples that feel distant, you practice on scenarios ripped from Egyptian daily life — a message your uncle might actually send you.

### Authority Routes and Religious References
**What it is:** A guide that tells you exactly who to consult for different types of questions: which academic researcher to find for scientific questions, Al-Azhar University for religious questions, a mental health professional for psychological questions. For each type, it gives you self-verification steps, proof signals to check, and direct links (free, official, and community options). It also maps Quran and Hadith themes relevant to mental health and coping.
**When it helps you:** You finish an exercise and want to go deeper with a real expert. This guide tells you exactly where to go and how to verify you have found a genuine authority.

### Cognitive Knowledge Types
**What it is:** A set of data structure definitions (like blank forms) for three things the platform stores: cognitive biases with a family taxonomy (grouping related biases together), community resources with scope and access level details. These definitions ensure all entries in the bias library and community directory follow the same format.
**When it helps you:** The bias library and resource directory display consistently formatted entries because all data follows these same templates.

### Coverage Maps
**What it is:** A progress tracker with 29 sections showing which requirements from the master project specification have been "implemented," which are "partial," and which are pending. It maps every project requirement to its app implementation.
**When it helps you:** Supervisors can see at a glance how complete the platform is against the official specification — no guesswork needed.

### DeepReal Game Mode Definitions
**What it is:** The content definitions for a game built into the DeepReal module. Six game modes are defined: a classic mode, an Egypt-specific mode, a point-of-view mode, and three "immunity" modes (for rumors, scams, and TikTok-specific misinformation). Each mode has rounds with multiple-choice answers, score points, and a lesson for each answer choice.
**When it helps you:** You play the DeepReal game in the Egypt-specific mode and encounter WhatsApp rumors that look exactly like ones you have received in real life — making the learning feel real and urgent.

### DeepReal Immunity Game Modes
**What it is:** The detailed content for the three immunity training game modes — 12 rounds of Egyptian rumor patterns, scam patterns, and TikTok misinformation patterns. Each round has bilingual titles, story scenes, prompts, multiple-choice answers, and sourced references (including AkhbarMeter, Egypt's leading fact-checking site).
**When it helps you:** Advanced practice against the specific types of misinformation most common in Egypt's digital environment.

### Defense Library
**What it is:** A data store supporting the academic defense (thesis viva) preparation section of the platform. It contains structured strategies for different types of defense challenge — data-related questions, emotional challenges, planning questions, and behavioral questions — each with expert implementation notes and justification. It also includes a keyword matrix, authority outreach plans, and standards for Egyptian university contexts.
**When it helps you:** If you are a researcher using this platform for a thesis, the defense page gives you organized preparation materials structured around the most common question types.

### Exercise Validation Audit
**What it is:** Automated quality-control functions that check all 42 exercises against a strict schema (a set of rules for what every exercise must contain). The checks include: whether the exercise covers a specific behavior-change component (COM-B — a scientific framework that maps barriers to behavior change to interventions), whether Arabic translations are present, whether safety notes exist, and whether evidence citations are present. It generates a validation report.
**When it helps you:** Before the platform goes live with real users, these automated checks ensure no exercise is missing critical content. The platform will not deploy exercises that fail the audit.

### Fight-Back Data (Fallacies, Biases, Religious Biases)
**What it is:** A set of 25 interactive defense cards — 10 named logical fallacies (errors in reasoning), 10 cognitive biases (predictable ways human thinking goes wrong), and 5 religion-specific manipulation tactics. The religious manipulation tactics include: cherry-picking scripture, claiming authority without qualifications, using fear to control, telling people to replace medicine with religion, and threatening people with takfir (تكفير — declaring someone a non-Muslim, a serious accusation used as a silencing weapon). Each card has severity ratings, sources, and content in three languages.
**When it helps you:** You encounter a manipulative argument in real life. The Fight-Back cards give you the exact name for what is happening and the specific counter-argument to use.

### Global Crisis Data
**What it is:** A collection of real, cited statistics about the scale of the problems the platform addresses — the financial cost of misinformation worldwide, how fast deepfakes spread, the global treatment gap for mental health disorders. It also includes multi-regional case studies tagged as Egypt-specific, MENA-region, or global, plus a registry of viral fake claims with helper functions to look up the relevant case study for any exercise.
**When it helps you:** The platform shows you hard numbers — backed by citations — so you understand why this education matters, not just that it does.

### Global Institutions (Research Module)
**What it is:** Ranked lists of the world's top regulatory bodies, research organizations, and educational institutions — with their Nature Index shares (a measure of high-quality scientific output), Nobel laureate counts, and annual budgets as verified objective measures.
**When it helps you:** The "About Our Evidence" page shows comparative tables explaining why specific institutions are cited as authoritative — with objective data, not just reputation.

### Instrument Readiness Matrix
**What it is:** A governance record for each of the six questionnaires (measurement tools) the platform uses. For each one, it records separately whether it is ready for English users and Arabic users ("ready," "conditional," or "blocked"), the permission status, the rule for when it can be deployed, and what needs to happen next. The MIST-20 (fake news susceptibility test) is currently blocked for Arabic speakers because no proper Arabic adaptation exists yet.
**When it helps you:** This governance record ensures the platform never accidentally administers an unvalidated Arabic questionnaire to Arabic-speaking users — protecting research integrity.

### Kill List (Debunked Claims Registry)
**What it is:** A registry of specific viral false claims — each with the claim in Arabic and English, the correct fact, the source that debunks it, the date, a category, and a threat level (Critical, High, Medium, or Low). It includes claims like microchips in vaccines and 5G causing COVID-19.
**When it helps you:** When you paste a suspicious health or news claim into the platform, it cross-references this registry to tell you whether this specific claim has already been debunked — and shows you the source.

### Module Briefings
**What it is:** A detailed briefing for each of the three modules (DeepReal, Mental Health, Religion Hub) in all three languages. Each briefing has a mission statement, a step-by-step workflow guide, and a comparison table of global versus Egyptian statistics on the problem the module addresses — all with sources.
**When it helps you:** When you land on a module's command center, you see immediately why this module matters (with real Egyptian statistics), how to use it, and what you will accomplish.

### Module Guides (Emotion-Based Entry Points)
**What it is:** A routing system based on how you feel when you arrive. Each module has a set of emotion-based starting states ("I feel rushed," "I feel angry," "I feel confused," "I feel hopeless"). For each emotion, the guide provides: validation of that feeling, the scientific reason it affects your judgment, a recommendation for where to start, a caution, and which tab to open first.
**When it helps you:** You arrive at the platform feeling upset after seeing a disturbing news story. Instead of being dropped into a generic home page, the platform asks "How are you feeling?" and routes you to the right starting point for your current emotional state.

### Module Libraries
**What it is:** Aggregated content libraries for each module, combining the Egypt-specific authored casebook items with additional templated items generated to fill the library. The library tab in each module shows all available items for browsing.
**When it helps you:** You want to explore topics beyond the daily exercise — the library gives you a full browsable catalog of all available content in that module.

### Protocol Specification
**What it is:** The formal scientific research protocol — the document that defines exactly what this study is testing. It includes: the main research question, seven sub-questions (SQ1–SQ7), the null hypothesis (what would be true if the platform does not work) and the alternative hypothesis (what would be true if it does), the statistical power analysis (a calculation that determines how many participants are needed to detect a real effect), success criteria, and measurement phases.
**When it helps you:** This page shows supervisors and defense committees the full research design in standard scientific format — proving the study was designed before it was run, not reverse-engineered from results.

### Real-World Data
**What it is:** A set of key statistics anchoring the platform in Egyptian reality: the estimated global financial cost of misinformation ($417 billion), Egypt's misinformation rate by sector, the global mental health treatment gap (75% of people with a mental health condition receive no treatment), Egypt's own treatment gap (80%), and religion-related statistics. All figures are sourced.
**When it helps you:** Data visualization charts on the homepage and module pages show these numbers visually, making the scale of the problem concrete and immediate.

### Realtime Cognitive Protocols
**What it is:** A library of short, in-the-moment mental tools — micro-protocols — that appear during exercises or when you flag that you are feeling distressed. Examples include: a pressure pause (stop and breathe before reacting to a claim), a claim distillation (write the claim in one sentence), a source trace (find where the claim originally came from), an emotion check (name how you are feeling), and a breath anchor (use breathing to reduce emotional arousal). Each has a scientific explanation and a source.
**When it helps you:** You are working through a difficult exercise and start feeling overwhelmed or angry. The platform detects this and offers a relevant micro-protocol to help you re-center before continuing.

### Scientific Intelligence
**What it is:** Data structures for an intelligence dashboard that tracks: science signals (specific indicators from trusted sources that something in a topic area is changing), trusted source leaders (the top people in each domain with their trust signals), audience risk profiles (which demographic groups are most vulnerable to which types of manipulation), and flag families (categories of warning signs: red flags, camouflage flags, green flags, grey flags, blood flags).
**When it helps you:** The scientific intelligence dashboard gives researchers and advanced users a domain-specific risk map — showing where the biggest threats are right now and which sources to watch.

### Source Freshness Monitor
**What it is:** An automated function that checks all 100 trusted sources for how recently they were verified. Sources not checked in more than 90 days trigger a warning; sources not checked in more than 180 days trigger a critical alert. It generates a report showing how many sources are fresh, how many are stale, and which ones need urgent review.
**When it helps you:** The platform never shows you information from sources that have not been recently verified. This monitor ensures the credibility system stays current and does not silently degrade over time.

### Support Media Registry
**What it is:** A curated library of books, podcasts, films, documentaries, TV shows, and inspirational quotes relevant to the platform's three modules. Each item is tagged with its module relevance and which exercise day it relates to. Helper functions let you find the right media by type, module, or specific exercise.
**When it helps you:** After finishing an exercise on deepfake detection, the "Further Learning" section shows you a documentary or podcast about the topic — so the learning continues beyond the platform.

### Verified Quotes
**What it is:** A collection of 24 carefully sourced quotes — 8 per module — from thinkers including Socrates, Carl Sagan, Marie Curie, Viktor Frankl, and al-Ghazali (الغزالي — a major Islamic philosopher and theologian). Each quote is in Arabic and English with its framing and attribution verified.
**When it helps you:** These quotes appear as motivational anchors on module hub pages — chosen specifically because they connect to the module's theme and come from sources whose words are verifiable.

### Victim Impact Profiles
**What it is:** Concrete, demographic-specific harm case studies showing how misinformation, mental health stigma, and religious manipulation actually hurt real people — Egyptian mothers, university students, elderly people, young people, and professionals. Each profile includes the harm case in Arabic and English, the region, which module it belongs to, the manipulation technique used, and the protective skill the platform teaches. Helper functions let exercises link to the profile most relevant to their topic.
**When it helps you:** Exercises use these profiles to ground abstract lessons in real Egyptian harm scenarios — making clear why these skills are not academic, but potentially life-saving.

### Research Index (Combined Entry Point)
**What it is:** A single import point that re-exports the global crisis data, victim profiles, and support media library — so any page that needs research data can import it all from one place.
**When it helps you:** This prevents different pages from using inconsistent versions of the same data — everything flows from one source of truth.

---

## Comprehensive Resource List

### Comprehensive Resource Categories
**What it is:** A browsable directory of vetted organizations and platforms organized into four categories: (1) Fact-checking initiatives like Misbar, Fatabyyano, and AkhbarMeter (leading Arab fact-checking sites); (2) Academic networks; (3) Crisis line directories (emergency mental health phone numbers); (4) Digital literacy platforms. Each entry has a name, type, country, year founded, current status, website, and description in both Arabic and English.
**When it helps you:** You want to find Egypt's official fact-checking organization or a mental health crisis line for a friend. This directory takes you there directly.

---

## Roadmap Data

### Platform Roadmap Categories
**What it is:** A navigable map of every section of the platform, organized by category (Core Platform, DeepReal Engine, Mental Health Engine, Religion Hub Engine, Research Tools, etc.). Each item has a bilingual name, a link, a plain-language description of the science behind it, the best use cases, and a ready-to-paste example scenario showing exactly how to use it.
**When it helps you:** You want to understand what the whole platform contains before diving in. This roadmap gives supervisors and new users a complete picture in one place.

---

## Scientific Institutions

### Top Scientific Institutions Registry
**What it is:** A ranked list of the world's most important scientific research institutions — including the Chinese Academy of Sciences (CAS), Harvard, Max Planck Society, MIT, and Stanford — each with their Nature Index share (a precise measure of high-quality scientific output), number of Nobel Prize winners, annual budget, and a note on what makes them the leader in their area.
**When it helps you:** The "About Our Evidence" page uses this data to show you the pedigree of the institutions behind the research the platform cites — so you know you are learning from the best sources, not random websites.

---

## Trusted Sources

### Top 100 Trusted Source Registry (TypeScript file)
**What it is:** The master list of 100 carefully evaluated sources that the platform uses — 34 for the DeepReal module, 33 for Mental Health, and 33 for Religion Hub. Each source has a role (primary evidence, verification tool, contextual background, etc.), a visibility level (shown to users, shown to supervisors, internal only), an evidence level (from systematic review down to expert opinion), a jurisdiction, and a trust band (A, B, or C based on a 12-point scoring system). The date each source was last verified is also recorded.
**When it helps you:** Every time the platform cites a source, it comes from this list. Sources are not chosen randomly — each one passed a formal evaluation.

### Trusted Sources JSON
**What it is:** The same 100 sources in a standard data format (JSON — a universal format any computer system can read) with additional fields including total score and direct URL. This version is used by API routes (programming interfaces that let other systems request the source data).
**When it helps you:** External tools, export functions, and automated checks can access the source registry without needing to process the main codebase.

### Source Types Schema
**What it is:** A strict definition of exactly what fields every source entry must have — ID, name, module, why it is trusted, how it is used, its role, visibility level, evidence level, jurisdiction, trust band, last verified date, and optional backup source. This enforces consistency — no source can be added without all required fields.
**When it helps you:** This guarantees that the source registry never has incomplete entries, preventing silent errors where a source is cited but key information is missing.

---

## Theory Data

### COM-B Behavior Change Mapping
**What it is:** A scientific framework called COM-B (Capability, Opportunity, Motivation — Behaviour) developed by researcher Susan Michie and colleagues in 2011 maps how behavior change actually works: you need the capability to do something, the opportunity to do it, and the motivation — otherwise behavior will not change. This data maps all 18 specific barriers in the platform (6 per module) to the exact exercises that address them and the measurement tools that track change.
**When it helps you:** The COM-B visualizer in the platform shows you which exercise is addressing which real barrier to change in your thinking or behavior — making the scientific logic of the course visible, not hidden.

### Theory Connections (15 Frameworks)
**What it is:** A full explanation of all 15 scientific theories behind the three modules — 5 per module. Each entry includes what causes the change this theory predicts (the causal mechanism), the key research citation, which exercise days it applies to, how it is specifically applied in those exercises, and what outcome it is designed to produce. Examples include: Inoculation Theory (pre-exposing people to weakened forms of manipulation to build immunity), Dual Process Theory (the difference between fast intuitive thinking and slow careful thinking — often called System 1 vs System 2), and the Stigma Contact Hypothesis (face-to-face or story-based contact with people who have mental health conditions is one of the most effective ways to reduce stigma).
**When it helps you:** The "Scientific Foundation" panel in every exercise shows you exactly which theory you are engaging with and why it is expected to work. Researchers can see the full theoretical architecture of the platform in one place.

---

## Trailer Scenes

### Cinematic Trailer Scene Scripts
**What it is:** Detailed screenplay-style scripts for a series of awareness trailer videos — scenes like a father watching fake news on the sofa, a university student encountering a health rumor, someone in a doctor's waiting room. Each scene has a duration, bilingual setting description, dialogue directions, camera movement notes, sound design notes, and even specific text prompts for AI image generation (including what to include and what to avoid).
**When it helps you:** These scripts are used to create the platform's awareness videos and presentation visuals — connecting the platform's message to real Egyptian everyday life in a format designed for emotional impact.

---

## Project Vision Framework

### PROJECT_VISION_PILLARS
**What it is:** Four core principles that define why this platform was built the way it was: (1) changing how people think and act matters more than just how much content they consume; (2) the platform was built specifically for Egypt's misinformation landscape first; (3) three lenses (fake news, mental health, and religious manipulation) are addressed together because they are interconnected; (4) only evidence-backed content is allowed — no claims without sources. Both Arabic and English versions are included.
**When it helps you:** The Project Vision page's hero section shows these four pillars to help anyone — supervisor, user, or partner — understand immediately why the platform is structured the way it is.

### Egyptian Misinformation Patterns
**What it is:** A documented list of the specific types of misinformation that circulate in Egypt — such as WhatsApp family chain messages, unofficial fatwas (religious rulings issued by people with no authority), health panic messages, and economic rumors. Each pattern is described in both Arabic and English.
**When it helps you:** The Egyptian Pattern Map section of the Project Vision page shows the specific threat landscape the platform was built to address — not generic global misinformation, but the exact patterns Egyptians encounter.

### Cognition Bias Entries
**What it is:** Twelve cognitive biases (predictable, universal errors in human thinking) each explained in the Egyptian context — including Confirmation Bias (only looking for information that confirms what you already believe), Availability Heuristic (judging how common something is by how easily an example comes to mind), Authority Bias (believing something because an authority figure said it, even without evidence), Dunning-Kruger Effect (people with little knowledge overestimate their competence), Illusory Truth Effect (believing something is true just because you have heard it many times), Social Proof (doing what others around you do), In-Group Bias (trusting people from your own group more than evidence warrants), Backfire Effect (becoming more convinced of a false belief when corrected), Emotional Reasoning (treating feelings as facts), Proportionality Bias (assuming big events must have big causes), Pattern Recognition Overreach (seeing meaningful patterns in random noise), and Anchoring (being overly influenced by the first number or fact you hear). Each entry includes the specific Egyptian pattern where the bias is exploited, the key researcher, a citation, why it matters here, and which platform feature addresses it.
**When it helps you:** The Cognitive Bias Map section is an interactive display connecting each of your thinking vulnerabilities to the specific tool that trains you to overcome it.

### VisionResponseLayers
**What it is:** A set of design response layers showing exactly how the platform's features map to the biases and patterns identified above. Each layer references specific platform capabilities.
**When it helps you:** The Design Response section of the Project Vision page closes the loop — showing that every identified vulnerability has a corresponding tool, so the platform is not just a general education site but a specific response to specific documented problems.

---

## Evidence Pyramid Dataset — "Dr. Ismail Methodology" — `src/data/keyhunter/evidence-pyramid.ts`

### Evidence Pyramid — how strong is a medical proof? (story-based)
**What it is:** A bilingual (Arabic + English) list that ranks medical "proof" from weakest to strongest — from one person's "I tried it and it worked" story (the weakest, scored 1 out of 10) all the way up to a "meta-analysis" (which carefully combines many large studies — the strongest). Each rung comes with: a strength score (1–10), the common thinking-traps at that level (like only remembering the people a cure helped and forgetting those it didn't), real Egyptian examples, a "good doctor" story (Dr. Ismail, who knows that one happy patient proves nothing by itself), a "quack" story (a made-up fake-cure YouTuber, "Dr. Karim Abu El-Qasr," who gets 3 million views selling crushed pills disguised as herbs), and the exact give-away phrases to watch for ("I tried it and it worked", "everyone I know says…").
**When it helps you:** A relative shares a viral video of a "doctor" who cured diabetes with herbs "because his patients got better." This teaches you — through a simple story — that a personal testimonial is the *weakest* kind of evidence, so you don't get fooled, and you learn what *strong* proof actually looks like.

---

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

---

# Scientific, Safety, and Measurement Systems (plain-language)

Strategy: Cross-Cutting Systems
Source: FEATURE_CATALOG/systems-b.md
Simplified: 2026-06-27

---

## 1. MIST-20 Scoring Engine

### MIST-20 Misinformation Susceptibility Test Scorer

**What it is:** A 20-question quiz that measures how good you are at telling real news from fake news. After you answer, the system gives you three scores: how many you got right, whether you tend to distrust even real news (paranoia), and how often you fell for fake stories (gullibility). It also tells you which type of trickery tripped you up most — for example, whether you were fooled most by fake experts or by cherry-picked statistics. FLICC (which stands for Fake Experts, Logical Fallacies, Impossible Expectations, Cherry-Picking, Conspiracy Theories) is simply a list of the five main ways people lie with information.

**When it helps you:** You take the quiz on your first day using the platform. After finishing the lessons, you take it again. The system then shows you exactly how much better you got at spotting lies — not just a feeling, but a real number you can point to.

---

## 2. SM-2 Spaced-Repetition Engine

### SM-2 Spaced-Repetition Scheduler

**What it is:** A smart reminder system for flashcard-style review, based on a well-known memory science method called SM-2. After you practice a lesson, it schedules your next review at the exact right moment — not too soon (waste of time) and not too late (you've already forgotten). If you got something wrong, it shows it to you again sooner. If you knew it well, it waits longer before reminding you. It works entirely on your device with no internet needed.

**When it helps you:** You learn how a "fake expert" trick works on Monday. The system schedules a quick review on Wednesday, then the following week, then a month later — each time reinforcing the lesson just before you would naturally forget it, so it sticks in your long-term memory.

---

## 3. FLICC Taxonomy and SIFT Protocol

### FLICC Manipulation Taxonomy + SIFT Verification Protocol

**What it is:** Two tools bundled together. First, FLICC is a named checklist of every major trick used to spread lies: Fake Experts (someone pretending to be qualified), Logical Fallacies (over 30 types of bad arguments — like attacking the person instead of the argument, or giving only two false choices), Impossible Expectations, Cherry-Picking (only showing the facts that support one side), and Conspiracy Theories (unfalsifiable claims that "the enemy is always behind it"). Second, SIFT is a four-step fact-checking habit: **Stop** (pause — notice if you feel scared or angry), **Investigate the source** (who is actually behind this message?), **Find better coverage** (search for independent reports), **Trace the claim** (find the original source, not just a copy of a copy). Both tools are available in English and Arabic.

**When it helps you:** Your uncle shares a scary health claim on a family group chat. You run SIFT: you stop and notice you feel alarmed (that's a manipulation signal), you check who first published the claim, you look for independent doctors commenting on it, and you trace it back to its origin. The FLICC checklist helps you name exactly which trick was used — in this case, Cherry-Picking.

---

## 4. Defense Ledger and Cognitive Immunity Score

### Defense Ledger + Cognitive Immunity Score (CIS)

**What it is:** A personal diary of every time you correctly spotted a deception trick or were fooled by one. Every exercise you complete — every right answer and every miss — is recorded with the date, which part of the platform you used, and which of the 8 deception types was involved. From all that history, the system calculates your Cognitive Immunity Score (CIS), a single number from 0 to 100 that shows how well-protected your thinking is. It weighs your accuracy (40%), how many different deception types you've practiced (25%), how much you've practiced overall (20%), and how consistent your daily streak is (15%).

**When it helps you:** You open your personal dashboard and see a score of 62 out of 100. The chart shows you are strong against fake experts but weak against conspiracy theories. You know exactly where to focus your practice next.

---

## 5. Efficacy Engine (Cohort dz / CI / Distrust-Drift Guard)

### Cohort Efficacy Engine with Distrust-Drift Guard

**What it is:** A system that looks at all the quiz results from every person who has used the platform and honestly calculates whether the platform is actually making people better at spotting lies — not just one person, but the whole group. It reports the average improvement, a statistical measure called Cohen's dz (think of it as a "how big was the effect?" score — small, medium, or large), and a confidence interval (a range that says "the true improvement is almost certainly between X and Y"). It also includes a critical safety check called the "distrust-drift guard": if people are getting better scores by becoming paranoid and rejecting all information — even true information — the system flags this as a false win and marks the results with a warning. A 95% confidence interval means: "if we repeated this study 100 times, 95 of those times the true answer would fall inside this range."

**When it helps you:** A researcher or funder asks "does your platform actually work?" The system produces a clear honest answer: "Across 250 users, ability to spot fake news improved from an average of 13 correct to 17 correct out of 20 (effect size: large). No distrust-drift detected." That is a real, citable result.

---

## 6. Doctor-Test Credential Validator

### Doctor-Test (Egyptian Medical Credential Checklist)

**What it is:** A five-question checklist you can run in your head (or on screen) to quickly judge whether a "medical expert" making a health claim in Egypt is real and trustworthy. The five questions are: Does the person state a clear medical specialty? Are they listed in the Egyptian Medical Syndicate (the official registry of licensed Egyptian doctors)? Are they affiliated with a public hospital or university? Have they published research in peer-reviewed journals (journals that check the work before publishing)? Are they a member of a professional medical society? It works without any internet connection — it is just a checklist.

**When it helps you:** A Facebook video shows a man in a white coat claiming a herbal supplement cures diabetes. You run the five questions: no specialty stated, no syndicate listing, no hospital affiliation, no publications found, no society membership. Four out of five fail — this is a Fake Expert, and the claim should not be trusted.

---

## 7. 8-Layer Deception Taxonomy (Canonical)

### EAL 8-Layer Deception Taxonomy

**What it is:** The platform's official map of every type of lie, from the simplest to the most complex, organized into 8 layers in order of how hard they are to detect and fight. Layer 1 is a complete invention (a fully made-up story). Layer 2 is a biased lens (true facts twisted by who tells them). Layer 3 is taking something out of context. Layer 4 is weaponized timing (releasing true information at the worst possible moment). Layer 5 is using true information for evil purposes. Layer 6 combines all the above and targets your personal vulnerabilities. Layer 7 is the "Mega-Machine" — invisible systems and algorithms shaping what millions of people see without their knowledge. Layer 8 is "The Unknown" — AI black boxes and mass psychology events where no clean answer exists. Each layer has a name in English and Arabic and a defense instruction. Every AI tool on the platform uses this same map so that nothing falls through the cracks.

**When it helps you:** After an analysis, the platform tells you "this message uses Layer 3 deception — it takes a real quote out of context." You know immediately what type of lie it is and what defense to apply.

---

## 8. MHLS Psychometric Instrument

### Mental Health Literacy Scale (MHLS)

**What it is:** A 35-question survey, validated by researchers (meaning it has been tested and shown to actually measure what it claims to measure), that checks how much you know about mental health. It tests six areas: can you recognize signs of mental illness? do you know what causes it? would you keep social distance from someone who has it? are you confident about where to find help? what are your attitudes toward mental illness? The full score runs from 35 (very low literacy) to 165 (very high literacy). All answer options are available in Arabic.

**When it helps you:** Before starting the mental health section of the platform, you answer these questions. After finishing the lessons, you answer them again. If your score rose from 90 to 130, you can see that you now recognize more disorders, have less stigma, and feel more able to seek help — a real before-and-after measurement.

---

## 9. GHSQ — General Help-Seeking Questionnaire

### General Help-Seeking Questionnaire (GHSQ)

**What it is:** A 17-question survey that measures how likely you are to actually reach out for help when you are struggling emotionally — not whether you have sought help in the past, but what you *intend* to do. You rate each question from 1 (extremely unlikely) to 7 (extremely likely). The survey asks about different kinds of help: talking to a close friend, a parent, another relative, a mental health professional, a phone helpline (including Egypt's line 16328), a family doctor, a religious leader (imam, priest, or sheikh), or a university counselor. There is also a section on what you would do if you had thoughts of suicide. All questions are in both English and Arabic.

**When it helps you:** A student who feels depressed takes this survey before and after using the platform. Their score for "I would talk to a mental health professional" rises from 2 to 6 — evidence that the platform reduced the fear and shame that was stopping them from seeking real help.

---

## 10. Brief RCOPE — Religious Coping Scale

### Brief RCOPE (Religious Coping Scale)

**What it is:** A 14-question survey that measures how you use your faith when things are hard. There are two types of religious coping: Positive (for example, feeling that God is working with you, finding spiritual meaning in difficulties, feeling supported by God) and Negative (for example, feeling that God is punishing you, feeling abandoned by God, blaming an evil force). Each type has 7 questions rated from "not at all" to "a great deal." The two types are scored separately — they must never be added together, because they mean opposite things. Importantly, if the Negative score goes up after someone uses the platform, that is flagged as a possible sign of harm — it means the platform may have made their spiritual life worse, and this must be investigated.

**When it helps you:** Someone using the Religion Hub section takes this survey before and after. If their Positive score rises (they feel spiritually stronger) and Negative score drops (they feel less punished by God), the platform helped. If Negative rises, the team is immediately alerted — no platform should make someone's relationship with God more painful.

---

## 11. MC-SDS Anti-Gaming Instrument

### Marlowe-Crowne Social Desirability Scale — Short Form C (MC-SDS)

**What it is:** A 13-question True/False quiz that detects whether someone is answering surveys the "right way" to look good, rather than answering honestly. Some people, especially when they know they are being studied, instinctively choose the answer that makes them seem virtuous. A high score on this test means someone is likely doing that. It is given once at the start — never repeated — and the score is used as a correction factor when analyzing everyone's results, to avoid a false picture of improvement.

**When it helps you:** Imagine the platform claims "mental health knowledge improved significantly." But what if participants were just answering the knowledge quiz the way they thought researchers wanted? The MC-SDS score lets the research team mathematically remove that effect from the results, so the findings are honest and scientifically credible.

---

## 12. SUS — System Usability Scale

### System Usability Scale (SUS)

**What it is:** A 10-question survey (the same one used by usability researchers worldwide since 1996) that measures how easy a digital platform is to use. The score runs from 0 to 100. Above 80.3 means "excellent — top 10% of all software." Above 68 means "good — better than average." Below 68 means the platform is confusing and needs to be redesigned before it can be used in a study. The exact wording of the questions cannot be changed — even swapping the word "system" for "app" would make the scores unreliable. Arabic answer labels are included.

**When it helps you:** After someone finishes using the platform, they take this survey. If the score comes back at 55 (below average), the team knows the design is too confusing and fixes it before claiming the lessons improved anyone's thinking — because a confusing tool cannot fairly teach anything.

---

## 13. MegaRotator v8 — Multi-Provider AI Failover

### MegaRotator v8 (Gemini-First Multi-Provider AI Failover)

**What it is:** A smart traffic-switching system for the platform's AI brain. Instead of relying on one single AI service that could go down or hit its usage limit, the platform has up to 20 slots spread across 7 different AI providers (companies like Google Gemini, Groq, OpenRouter, Cerebras, Together, SambaNova, and NVIDIA). It tries the fastest provider first. If that one is busy or down, it automatically switches to the next one — silently, in under 28 seconds — until it finds one that works. If a service says "try again later," the system remembers and skips that slot for the cooldown period.

**When it helps you:** A classroom of 40 students all submit their fake-news analysis at the same time. Without this system, everyone might hit a usage limit and see an error. With it, the platform quietly distributes the work across multiple providers so everyone gets their answer within seconds.

---

## 14. Evidence Aggregator — 7-API Academic Retrieval

### Evidence Aggregator (7 Academic APIs, Free-First, Cohere-Reranked)

**What it is:** A system that, when the platform needs to support a claim with real evidence, searches seven different free academic databases at the same time: OpenAlex, Semantic Scholar, Europe PMC, DOAJ, arXiv, CORE, and Crossref. It sorts results by two things: how trustworthy the source is (a WHO document ranks higher than a random blog) and whether the full article is actually free to read (important for users in Egypt without access to expensive journal subscriptions). Then an AI reranking tool (Cohere rerank-v3.5) re-orders the results by how closely they actually answer your question — not just by how many times they have been cited. If one database is down, the others still work.

**When it helps you:** A chatbot on the platform says "vaccines are safe." Instead of just asserting it, the platform immediately pulls seven real, free-to-read academic sources that back the claim — so you can check them yourself.

---

## 15. Source-Tier Classifier (Tiered Whitelist)

### Tiered Source Whitelist + Classifier

**What it is:** A ranking system for every website and publication the platform might use as evidence. Think of it like a color-coded trust badge. Tier S (the gold standard) includes major academic indexes like PubMed, arXiv, and Cochrane. Tier A includes global health authorities (WHO, CDC, NIH) and top journals (Nature, The Lancet), plus Egyptian government sources (CAPMAS, Ministry of Health). Tier B includes trusted fact-checkers and open-source investigators like Reuters, AP, Snopes, FullFact, and Bellingcat. Tier C includes useful but imperfect community sources like Wikipedia — good for leads, never proof. Tier U means unverified: no trust, cannot be shown as evidence. Islamic authority websites (like azhar.eg and dar-alifta.org) are also included and default to Tier A.

**When it helps you:** The platform's AI tries to cite a random blog post as evidence for a medical claim. The classifier catches it, marks it Tier U, and blocks it. Only verified sources reach you.

---

## 16. One-Law Output Enforcer and applyVerdictEnforcement

### One-Law AI Output Enforcer

**What it is:** The platform's most important safety rule, built into the software as a technical lock. The One Law is: no claim can reach you without a real, checkable source. Every time the platform's AI produces an answer, this system checks every source the AI suggested. If at least one source from Tier S, A, B, or C is present, the answer is allowed through. If all sources are Tier U (unverified), the answer is downgraded to "UNVERIFIED" and its confidence score is capped at 20% — the platform cannot present a fabricated claim as fact. There is also a guardrails layer that blocks certain types of requests entirely: asking the AI to diagnose a medical condition, asking it for a religious ruling (fatwa), or anything that triggers a self-harm concern — those are redirected to the right professional resource instead.

**When it helps you:** You ask the platform's chatbot whether a specific diet cures cancer. The AI generates a response but cannot find a single trusted academic source to back it. The enforcer blocks the claim and tells you instead: "We cannot confirm this — here is what peer-reviewed evidence actually says."

---

## 17. Mindframe Suicide-Safe Gate

### Mindframe Safe Messaging Gate (streaming content guard)

**What it is:** A real-time safety filter watching every word the AI writes in mental-health conversations as it is being typed out (technically called "streaming"). It is built on Mindframe guidelines — an internationally recognized set of rules about how to talk about suicide safely in media. The filter blocks specific harmful patterns: describing the method of suicide in detail, phrases that make suicide sound peaceful or glamorous, and sensational headlines. It also enforces a rule that any time suicide is mentioned, the national crisis hotline number (16328 in Egypt) must appear nearby within the same text. If a violation is detected mid-stream, the message is stopped immediately.

**When it helps you:** A distressed user asks the mental-health chatbot about suicide. The AI begins generating a response. If even one harmful phrase appears, the filter catches it before the message finishes sending and replaces it with a compassionate redirect to the crisis hotline — protecting the user in real time.

---

## 18. Abuse Logger and Critical Alert System

### Misuse / Abuse Event Logger

**What it is:** A silent monitoring system that watches for attempts to misuse or break the platform. It checks every message a user sends against two lists: a list of over 50 tricks people use to trick AI systems (called "jailbreak" attempts — for example, telling the AI to "ignore your rules" or "pretend you are an unrestricted AI"), and a list of signals that someone may be in crisis. When something concerning is detected, the system records what happened (the type of violation, how serious it was) and immediately sends a silent alert to the supervisors. Up to 100 recent incidents are saved locally for review, and supervisors can download a report.

**When it helps you:** Someone tries to force the platform's AI to give dangerous medical advice by sending a manipulative prompt. The logger catches the attempt, blocks it, records it, and alerts the supervisor — all without interrupting the user experience for anyone else.

---

## 19. NVIDIA Nemotron Content Safety Module

### NVIDIA Nemotron-3.5 Content Safety Classifier

**What it is:** A second layer of content checking, powered by a specialized AI model (NVIDIA's Nemotron-3.5 Content Safety, which understands Arabic and over 12 languages). Before a user's message reaches the main AI analysis system, this tool scans it for harmful content — hate speech, harassment, threats of violence, dangerous instructions, religious hate, or misinformation. After the main AI produces a response, this tool scans the response too, before it is sent back to you. If the API service is unavailable, the system allows traffic through rather than blocking everyone (this is called "fail-open" — it chooses availability over perfect safety when the safety tool itself is broken).

**When it helps you:** A user in Egypt writes an Arabic message containing disguised religious hate speech. Western-only AI safety tools might miss the Arabic phrasing entirely. This model's Arabic capability catches it, flags it, and blocks it before it reaches the analysis pipeline.

---

## 20. SemaFor Forensic Engine

### SemaFor Deepfake / Synthetic Media Detection (Educational Simulation)

**What it is:** A teaching tool — NOT a real detection tool. It explains two advanced scientific techniques that researchers use to detect AI-generated fake videos and voices: rPPG (remote photoplethysmography — detecting whether a face in a video has real blood-pulse variations under the skin, which AI-generated faces typically lack) and IAIF (voice analysis that detects whether a voice shows the natural vibration patterns of a real human throat, which AI-cloned voices often fake incorrectly). However, the platform clearly labels this as a simulation — it does NOT actually run those tests. Showing you a fake result would violate the platform's One Law, so the tool honestly returns no verdict and always displays a disclaimer.

**When it helps you:** You learn what forensic scientists actually look for when checking if a video of a politician has been faked. You understand the real science of deepfake detection — which makes you a smarter consumer of suspicious videos — even though the platform cannot run the tests itself.

---

## 21. ZKP Identity Engine

### Zero-Knowledge Proof Humanity Verification (Educational Stub)

**What it is:** A teaching tool — NOT a real identity verifier. It introduces you to the concept of Zero-Knowledge Proofs (ZKP) — a cryptographic method that lets a platform confirm "this is a real human" without collecting any personal information about who you are. Think of it like a magic trick where you prove you know a secret without ever revealing the secret. The platform describes how this works (using a method called Rate Limiting Nullifier — RLN) but is fully transparent that no real verification is happening. It always returns "not verified" and labels itself an educational stub.

**When it helps you:** You are studying how fake campaigns use fake accounts (Sybil attacks — where one person creates thousands of fake accounts to flood a conversation). Understanding that ZKP could defeat this — by proving personhood without exposing identity — gives you insight into how online manipulation could be technically stopped.

---

## 22. Epistemic Quarantine Classifier

### Layer 8 Epistemic Threshold / Containment Classifier

**What it is:** A monitoring signal for "cognitive overload" situations. Epistemic means "related to knowledge and certainty." When a conversation gets too confused, too random, or goes on so long that the person's thinking may be drifting into chaos (measured by an "entropy" score above 0.95 — entropy here means how random and disorganized the conversation has become), the system raises a flag. It does not lock you out or close the browser — it simply signals to the rest of the platform to show you a break screen or a calming message. If you have been talking to the AI for 45 continuous minutes without a break, the system also triggers a break reminder.

**When it helps you:** You have spent 45 minutes going deep into conspiracy theory content. The system gently interrupts with "it looks like you have been at this for a while — would you like to take a short break?" instead of feeding you more confusing content that could push you further into anxiety.

---

## 23. TMT Anchor Protocol (Ontological Stability)

### Terror Management Theory Anchor Protocol (Trauma-Informed UI)

**What it is:** A design system that changes how the website looks and behaves when the content is psychologically unsettling. Terror Management Theory (TMT) is a branch of psychology that studies how people behave when they are confronted with things that shake their sense of reality — like learning that invisible systems are manipulating millions of people (Layer 7 content). When a user shows signs of high psychological disruption (measured by a chaos score from 0 to 1), the platform shifts through four calming phases: ASSESS (the screen goes very dark, very quiet, very slow — maximum calming), then VALIDATE, then GROUND, then RECONSTRUCT (gradually returning to normal). The idea: when reality feels unstable, the interface becomes maximally predictable and low-stimulation so it does not add to the anxiety.

**When it helps you:** You are reading about algorithmic manipulation and feel overwhelmed. The platform detects this and automatically shifts to a quiet, dark, slow-moving design — like a calm room — rather than continuing to throw flashy content at you while you are already overwhelmed.

---

## 24. Strategic Friction / Cognitive Firewall

### Cognitive Firewall — Strategic Algorithmic Friction

**What it is:** A system that introduces deliberate tiny delays in content loading when it detects you may be stuck in a mindless scroll loop. It reads three signals: your heart-rate variability (HRV — a measure of stress; below 40ms means you are stressed), your scroll speed (faster than 1500 pixels per second means you are doomscrolling without actually reading), and how long you have been on screen (over 60 minutes adds stress points). If the total "cognitive load" score is high, the platform waits up to 3 seconds before showing the next piece of content — not to punish you, but to break the automatic stimulus-response loop that social media apps exploit. Those 3 seconds are enough time for your conscious mind to re-engage.

**When it helps you:** You have been scrolling for over an hour and your speed is very high. The platform introduces a 3-second pause before the next article loads. In that pause, you might actually decide to stop and step away — rather than the algorithm making that decision never happen.

---

## 25. Gamification XP Engine

### XP Engine (Experience Points, Levels, Badges, Streaks)

**What it is:** A points-and-rewards system grounded in real learning science (not just entertainment gimmicks). Every time you complete an exercise, verify a source, submit an assessment, or maintain a daily practice streak, you earn Experience Points (XP). Points accumulate across 9 levels from Novice (0 XP) to Master (12,000+ XP). There are 21 badges to unlock across the platform's three learning tracks. Streaks give bonus points at 3, 7, and 14 consecutive days. The system is careful not to let you earn the same reward twice. When showing community statistics, it displays a disclaimer if the data is from only one person rather than a real group.

**When it helps you:** You feel stuck on a hard topic. But you notice you are just 150 XP away from the next level and you have a 6-day streak — you do not want to break it. That small motivational nudge keeps you going through the difficult material instead of quitting.

---

## 26. xAPI / SCORM Telemetry Engine

### xAPI (Experience API) Statement Engine

**What it is:** A learning-records system that tracks every significant thing you do on the platform in a standardized international format called xAPI (also known as the Experience API or Tin Can API). Every time you start an activity, pass a test, fail a test, or master a skill, the system creates a small record — like a detailed receipt — and saves it both on your device and on a server. These records use a standard language that any learning management system in the world can read (including university platforms). The records include your score, how long you spent, and whether you passed, failed, or mastered the activity. xAPI is to learning records what PDF is to documents — a universal format.

**When it helps you:** A university wants to verify that you completed the full misinformation-literacy curriculum. Your xAPI records can be exported in a format their system reads directly — no manual certificate needed, no way to fake completion, a full auditable trail.

---

## 27. Verifiable Cognitive Immunity Certificate

### Cognitive Immunity Certificate — HMAC-Signed, Server-Verified

**What it is:** A shareable credential you earn after completing the full EAL curriculum, with a tamper-evident digital signature. HMAC (Hash-based Message Authentication Code) is a mathematical lock — like a wax seal on an envelope — that makes it detectable if anyone tries to alter the certificate after it was issued. To earn the certificate you must meet five real requirements: complete all exercises, score at least 90% on the fake-news detection quiz (measured by the server — you cannot cheat by submitting a fake score), score at least 95 on the Socratic Swarm reasoning test, score at least 32 out of 35 on logical thinking, and achieve a final weighted score of 90% or above. Once issued, anyone — an employer, an NGO, a researcher — can check your certificate at a public web address and confirm it is genuine. The certificate itself honestly states what it certifies and that it is not an accredited university degree.

**When it helps you:** You finish the full curriculum and want to show an organization that you are trained in media literacy. You share the certificate link. They paste your ID into the verification page and instantly see: "Valid. Issued [date]. MIST-20 score confirmed by server. Not revoked." No one can fake this certificate, and no one can claim you earned it if you did not.

---

## Summary Table

| # | Feature | Category | Plain-Language Summary |
|---|---------|----------|------------------------|
| 1 | MIST-20 Scorer | Psychometric | 20-question fake-news detection quiz with before/after scores |
| 2 | SM-2 Scheduler | Cognition | Smart flashcard timing so lessons stick in long-term memory |
| 3 | FLICC + SIFT | Cognition | Checklist of 5 lie types + 4-step fact-checking habit |
| 4 | Defense Ledger / CIS | Measurement | Personal history of every catch/miss; 0–100 immunity score |
| 5 | Efficacy Engine | Measurement | Honest group-wide improvement stats with paranoia warning |
| 6 | Doctor-Test | Cognition | 5-question Egyptian medical credential checklist |
| 7 | 8-Layer Taxonomy | Standard | Official map of 8 deception types from simple lies to invisible systems |
| 8 | MHLS | Psychometric | 35-question mental health knowledge survey |
| 9 | GHSQ | Psychometric | 17-question survey on willingness to seek help (Egyptian-adapted) |
| 10 | Brief RCOPE | Psychometric | 14-question positive/negative religious coping survey with harm flag |
| 11 | MC-SDS | Anti-Gaming | 13-question test for "answering to look good" bias |
| 12 | SUS | Usability | 10-question universal ease-of-use survey (0–100) |
| 13 | MegaRotator v8 | AI Infrastructure | 20-slot AI backup system across 7 providers; auto-switches on failure |
| 14 | Evidence Aggregator | AI / Research | Searches 7 free academic databases at once; shows free-to-read sources first |
| 15 | Source-Tier Classifier | Standard | Trust-badge ranking for every source (S/A/B/C/U tiers) |
| 16 | One-Law Enforcer | Safety / Standard | Technical lock: blocks any AI claim that lacks a verified source |
| 17 | Mindframe Gate | Safety | Real-time filter stopping harmful suicide-related language mid-stream |
| 18 | Abuse Logger | Safety | Silent detector for jailbreak attempts and crisis signals; alerts supervisors |
| 19 | NVIDIA Content Safety | Safety | Arabic-aware AI content moderator; screens inputs and outputs |
| 20 | SemaFor Engine | CogSec (simulation) | Educational demo of deepfake science — clearly labeled, no real verdict |
| 21 | ZKP Identity | CogSec (simulation) | Educational demo of privacy-preserving human verification |
| 22 | Epistemic Quarantine | CogSec | Chaos-level detector that triggers break reminders at 45 minutes |
| 23 | TMT Anchor | CogSec | Calming UI mode that activates when content becomes psychologically overwhelming |
| 24 | Strategic Friction | CogSec | Deliberate micro-delay that breaks doomscroll loops |
| 25 | XP Engine | Gamification | Points, 9 levels, 21 badges, streak bonuses across all learning tracks |
| 26 | xAPI Engine | Telemetry | Universal learning-record system; exports to any university platform |
| 27 | Certificate API | Credentialing | Server-verified, tamper-evident credential with 5 real earning criteria |
