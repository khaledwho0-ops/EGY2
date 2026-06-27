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
