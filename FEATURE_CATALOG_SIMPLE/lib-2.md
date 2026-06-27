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
