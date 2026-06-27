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
