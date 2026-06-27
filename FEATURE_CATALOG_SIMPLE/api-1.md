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
