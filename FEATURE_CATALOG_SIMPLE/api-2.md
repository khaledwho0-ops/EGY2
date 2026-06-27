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
