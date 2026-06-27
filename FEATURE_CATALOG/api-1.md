# API Endpoints — slice api-1

Files 1–43 of 86, sorted ASCII-ascending from `src/app/api/`.

---

## /api/agents/investigate

`src/app/api/agents/investigate/route.ts`

- **5-Agent Parallel Claim Investigation** — Runs five specialized AI agents (Source Hunter, Bias Detector, Arabic Linguist, Timeline Builder, Counter-Narrative Expert) in parallel via NVIDIA NIM primary / Gemini fallback to analyze a claim from all angles simultaneously. _Use case:_ A user submits a viral claim and the platform produces a multi-dimensional forensic report in one request. (`src/app/api/agents/investigate/route.ts`)
- **Source Hunter Agent** — Traces a claim to its patient-zero origin, maps the propagation chain, and cross-references IFCN/Snopes fact-check databases. _Use case:_ Identifying who first published a misinformation narrative and how it entered Egyptian WhatsApp groups. (`src/app/api/agents/investigate/route.ts`)
- **Bias Detector Agent** — Identifies all cognitive biases exploited by a claim (confirmation bias, anchoring, etc.) and computes a deception score 0–1. _Use case:_ Educating users about the psychological manipulation embedded in content they encountered. (`src/app/api/agents/investigate/route.ts`)
- **Arabic Linguist Agent** — Analyses Egyptian Arabic dialect patterns, dog-whistle language, translation distortions, and religious text misuse in the claim. _Use case:_ Catching culture-specific manipulation markers that English-language models miss. (`src/app/api/agents/investigate/route.ts`)
- **Timeline Builder Agent** — Establishes the first known appearance of a claim and maps amplification nodes, virality factors, and current spread trajectory. _Use case:_ Understanding why a debunked claim resurfaces periodically and which accounts amplify it. (`src/app/api/agents/investigate/route.ts`)
- **Counter-Narrative Expert Agent** — Generates a bilingual Truth Sandwich rebuttal, inoculation message, and WhatsApp-ready counter-script. _Use case:_ Giving a user copy-paste text to defend their community on social media. (`src/app/api/agents/investigate/route.ts`)
- **Chief Verdict Officer Synthesis** — Synthesizes all five agent reports into a final verdict (TRUE / FALSE / MISLEADING / UNVERIFIED / PARTIALLY_TRUE) with Arabic and English explanations and detected deception layers. _Use case:_ Providing a single actionable verdict after the multi-agent investigation completes. (`src/app/api/agents/investigate/route.ts`)

---

## /api/ai/archive

`src/app/api/ai/archive/route.ts`

- **Wayback Machine Archive Stub** — GET and POST stub endpoint that returns a static "Cognitive Kernel Route Active" response; Wayback Machine integration is declared but not yet implemented. _Use case:_ Placeholder / health-check for the archive integration layer. (`src/app/api/ai/archive/route.ts`)

---

## /api/ai/chat

`src/app/api/ai/chat/route.ts`

- **Universal AI Chat** — POST endpoint supporting six modes (claim, mental-health, sentiment, general, translation, academic) with automatic Gemini → Groq → GitHub → HuggingFace failover. _Use case:_ Central chatbot entry-point for any EAL page needing conversational AI. (`src/app/api/ai/chat/route.ts`)
- **Claim Fact-Check Mode** — Runs the One-Law verification pipeline (retrieves real Tier S–C sources), then generates a Truth Sandwich verdict grounded only in those sources; UNVERIFIED banner shown when no admissible source is found. _Use case:_ A user pastes a suspicious claim and receives a cited verdict. (`src/app/api/ai/chat/route.ts`)
- **Mental-Health Chat Mode** — Routes to the mentalHealthAI provider and attaches WHO mental health resource links. _Use case:_ Users seeking emotional support receive trauma-informed responses with real external resources. (`src/app/api/ai/chat/route.ts`)
- **Sentiment Analysis Mode** — Returns a sentiment score via HuggingFace twitter-roberta-base-sentiment. _Use case:_ Modules that need to gauge the emotional polarity of Arabic/English text. (`src/app/api/ai/chat/route.ts`)
- **Translation Mode** — Translates Arabic (including Egyptian dialect) ↔ English with idiomatic precision; handles mixed Arabizi input. _Use case:_ Researchers or users who need accurate translation of Egyptian colloquial text. (`src/app/api/ai/chat/route.ts`)
- **Academic Research Mode** — Produces research-grade APA-7 cited answers, distinguishing peer-reviewed from general knowledge, and appends a structured sources section. _Use case:_ Students or journalists needing sourced academic content on misinformation, mental health, or Islamic topics. (`src/app/api/ai/chat/route.ts`)
- **General / Page-Context Mode** — Provides a page-specific AI assistant injected with COVO orchestration data (domain, fallacy list, manipulation risk) and EAL platform knowledge. _Use case:_ Every page's "Ask AI" button uses this mode with a custom system prompt. (`src/app/api/ai/chat/route.ts`)
- **COVO Orchestration Intercept** — Detects emotional manipulation, logical fallacies, and routing recommendations before any AI call; prepends a Socratic intervention prefix when manipulation is detected. _Use case:_ Automatic cognitive-defense layer applied to every chat message without user action. (`src/app/api/ai/chat/route.ts`)
- **Language Auto-Detection** — Classifies input as Arabic, English, or mixed based on Unicode character ratio so the AI responds in the user's language. _Use case:_ Bilingual users typing in mixed Arabic-English are understood and answered correctly. (`src/app/api/ai/chat/route.ts`)
- **Defense Ledger Logging** — For authenticated (passport) users in claim mode, fire-and-forgets a defense event to the cognition ledger including surface, layer, and sources used. _Use case:_ Longitudinal research tracking how often each user encounters and checks misinformation. (`src/app/api/ai/chat/route.ts`)

---

## /api/ai/debunker

`src/app/api/ai/debunker/route.ts`

- **Lateral Web Search Fact-Check** — Performs a DuckDuckGo lateral search for a claim, filters social-media results, and fetches+parses the top 6 candidates via Cheerio. _Use case:_ Finding independent news or fact-check sources that mention the claim. (`src/app/api/ai/debunker/route.ts`)
- **Source Tier Classification** — Assigns each fetched source a canonical tier (S/A/B/C/U) using the EAL source whitelist; checks for author attribution, publication date, and corrections policy. _Use case:_ Ensuring only credible sources drive the verdict; social media and tabloids are excluded. (`src/app/api/ai/debunker/route.ts`)
- **EXIF Image Forensics** — If a base64 image is supplied, extracts GPS coordinates, capture date, and software signature (detects Photoshop/Midjourney watermarks). _Use case:_ A user submits an image alongside a claim to check whether the photo was manipulated or AI-generated. (`src/app/api/ai/debunker/route.ts`)
- **Wayback Archiving of Sources** — Archives every cited source URL via the Wayback Machine (saveSnapshot) to create a tamper-evident provenance record. _Use case:_ Sources used in a verdict are preserved even if the original page is deleted. (`src/app/api/ai/debunker/route.ts`)
- **Academic Evidence Aggregation** — Calls aggregateEvidence (OpenAlex + Semantic Scholar + Crossref + EuropePMC + DOAJ) in-process to add peer-reviewed backing alongside the web results. _Use case:_ Scientific claims receive citation-backed academic sources in the verdict, not just news links. (`src/app/api/ai/debunker/route.ts`)
- **One-Law Verdict Enforcement** — Applies enforceOneLaw and applyVerdictEnforcement so the AI verdict is downgraded to UNVERIFIED when no admissible whitelisted source backs it. _Use case:_ Preventing the AI from asserting FALSE/TRUE when evidence is insufficient. (`src/app/api/ai/debunker/route.ts`)
- **SIFT Evidence Packet Response** — Returns a structured SIFT (Stop-Investigate-Find-Trace) packet alongside the AI verdict and image forensics for the frontend. _Use case:_ Teaching users the SIFT methodology while displaying the debunking result. (`src/app/api/ai/debunker/route.ts`)

---

## /api/ai/embed

`src/app/api/ai/embed/route.ts`

- **OpenAI Embeddings Stub** — GET and POST stub that returns a static "Cognitive Kernel Route Active" response; embeddings integration is declared but not yet implemented. _Use case:_ Placeholder for a future semantic-search embedding pipeline. (`src/app/api/ai/embed/route.ts`)

---

## /api/assessment/export

`src/app/api/assessment/export/route.ts`

- **Admin Assessment Data Export (JSON)** — Admin-gated GET that returns all assessment records from KV store across all participants as structured JSON, optionally filtered by instrument ID. _Use case:_ Research supervisors downloading the N=84 pilot study dataset for statistical analysis. (`src/app/api/assessment/export/route.ts`)
- **Admin Assessment Data Export (CSV)** — Returns the same dataset as a downloadable CSV file with dynamic column headers per instrument's score keys, named with today's date. _Use case:_ Importing pilot study results into SPSS, R, or Excel for effect-size computation. (`src/app/api/assessment/export/route.ts`)

---

## /api/assessment

`src/app/api/assessment/route.ts`

- **Assessment Record Retrieval** — GET with `pid` param retrieves all pre/post records for a participant, computes Day 0 vs Day 15 score deltas per instrument. _Use case:_ Displaying a participant's progress dashboard after completing both phases. (`src/app/api/assessment/route.ts`)
- **Assessment Record Submission** — POST saves a scored assessment record (mist20, mhls, brief-rcope, ghsq, sus, mc-sds) per participant hash; replaces existing records for the same instrument+phase. _Use case:_ A participant completes the MIST-20 pre-assessment and their scores are persisted for later comparison. (`src/app/api/assessment/route.ts`)
- **AI Personalized Feedback Generation** — After saving, calls NVIDIA NIM to generate personalized feedback including strengths, improvement areas, next steps (bilingual), recommended modules, Bloom's level, and effect size estimate. _Use case:_ Motivating participants after each assessment with actionable, culturally-appropriate guidance. (`src/app/api/assessment/route.ts`)
- **Participant Index Maintenance** — Appends new participant hashes to a shared index key in KV so the Efficacy Engine can aggregate cohort data. _Use case:_ Enabling cohort-level pre/post analysis without scanning all possible KV keys. (`src/app/api/assessment/route.ts`)

---

## /api/auth/passport

`src/app/api/auth/passport/route.ts`

- **Passport Session Check** — GET returns whether the current session cookie is authenticated and the associated userId. _Use case:_ Pages and API routes checking whether a user already has an active anonymous session. (`src/app/api/auth/passport/route.ts`)
- **Anonymous Passport Creation** — POST (no body) creates a new anonymous passport, sets a session cookie, and returns a one-time recovery key the user must save. _Use case:_ First-time users creating a privacy-preserving identity to track their progress across sessions. (`src/app/api/auth/passport/route.ts`)
- **Passport Recovery / Restore** — POST with `recoveryKey` restores a previously created passport on a new device and issues a new session cookie. _Use case:_ A user switching devices can recover their cognitive defense ledger and assessment history. (`src/app/api/auth/passport/route.ts`)

---

## /api/bias-detect

`src/app/api/bias-detect/route.ts`

- **Cognitive Bias Detection (POST)** — Accepts text up to 10,000 characters and runs regex+VADER+wink-nlp bias detection across all or domain-filtered cognitive biases; returns matched biases. _Use case:_ A user pastes a persuasive message to discover which cognitive biases it exploits. (`src/app/api/bias-detect/route.ts`)
- **Cognitive Bias Detection (GET)** — Accepts text as a query parameter for quick in-URL bias scanning. _Use case:_ Lightweight integration by other tools or widgets that need bias detection without a POST body. (`src/app/api/bias-detect/route.ts`)
- **AI Bias Enhancement** — If biases are found, calls NVIDIA NIM (time-boxed to 25s) for deep analysis: overall bias score, dominant bias, debiasing steps, and alternative interpretation (bilingual). _Use case:_ Providing actionable debiasing guidance beyond the pattern-matching layer. (`src/app/api/bias-detect/route.ts`)

---

## /api/blackbox

`src/app/api/blackbox/route.ts`

- **Anonymous Forensic Audit** — Accepts any query (DOI, claim, topic) anonymously and runs aggregateEvidence to fetch academic papers, then audits them for conflicts of interest, industry funding bias, ghostwriting signatures, and non-FAIR data practices. _Use case:_ A user afraid to ask about a sensitive claim publicly can submit it anonymously and receive a judgment-free analysis. (`src/app/api/blackbox/route.ts`)
- **One-Law Enforcement on Anonymous Audit** — Applies enforceOneLaw so the verdict is downgraded to UNVERIFIED when no whitelisted admissible source backs it, even in anonymous mode. _Use case:_ Preventing fabricated verdicts on sensitive claims where the user may be especially vulnerable. (`src/app/api/blackbox/route.ts`)
- **NVIDIA/Gemini Dual-Provider Forensic Synthesis** — Tries NVIDIA NIM primary for the forensic JSON; falls back to Gemini mega-rotator via rotatingGenerateObject if NVIDIA fails. _Use case:_ Ensuring the blackbox audit returns a result even when one AI provider is rate-limited. (`src/app/api/blackbox/route.ts`)

---

## /api/certificate/generate

`src/app/api/certificate/generate/route.ts`

- **Cognitive Immunity Certificate Issuance** — POST issues a self-signed EAL Cognitive Immunity Certificate if the user meets all criteria: 100% exercise completion, MIST-20 ≥ 90% (server-side), Socratic Swarm ≥ 95, logical coherence ≥ 32/35, EIS sustained ≤ 0.30, and final weighted score ≥ 90%. _Use case:_ Rewarding users who complete the full cognitive immunity curriculum with a tamper-evident credential. (`src/app/api/certificate/generate/route.ts`)
- **MIST-20 Server-Side Score Verification** — Reads MIST-20 score exclusively from `mist:<uid>:latest` KV key; ignores any client-submitted score to prevent self-issued perfect scores. _Use case:_ Anti-fraud mechanism ensuring the certificate reflects a genuinely measured immunity level. (`src/app/api/certificate/generate/route.ts`)
- **HMAC Tamper-Evident Signing** — Signs the certificate payload (uuid, name hash, score, date, curriculum version) with SHA-256 + HMAC-SHA256 and stores the full record in KV at `cert:<uuid>`. _Use case:_ Anyone can verify a certificate URL without trusting the holder's word about their score. (`src/app/api/certificate/generate/route.ts`)
- **Certificate Public Verification** — GET with `?id=<uuid>&name=<holder>` looks up the stored record, recomputes the HMAC, checks for revocation, and optionally verifies the holder's name. Returns tamper state, band, subScores. _Use case:_ An employer or institution can verify a certificate's authenticity at a public URL. (`src/app/api/certificate/generate/route.ts`)
- **Eligibility Failure Reporting** — Returns detailed failing criteria (C1–C5) when the user does not qualify, so they know exactly which score to improve. _Use case:_ Motivating users toward the specific skill gaps blocking their certificate. (`src/app/api/certificate/generate/route.ts`)

---

## /api/chat

`src/app/api/chat/route.ts`

- **Angry Debunker Streaming Chat** — POST streams an Arabic/English response from the "Angry Debunker" persona via Gemini-2.5-flash using the Vercel AI SDK; injects LangGraph fact-check context from the client if provided. _Use case:_ The main chatbot widget on the DeepReal / fact-check page for multi-turn conversations about a claim. (`src/app/api/chat/route.ts`)
- **7-Layer GOD-System Output Structure** — The system prompt enforces a strict 7-layer response format: Emotion Strip → Fact → Incentive Map → Scientific Beatdown → Audit → Myth → Proud Defender Pathway (Truth Sandwich). _Use case:_ Ensuring every chatbot reply teaches the user the full deception-deconstruction methodology, not just the verdict. (`src/app/api/chat/route.ts`)
- **Patient Zero Interrogation** — When the factCheckContext includes patient_zero_tracing data, the model is instructed to forensically cite the claim's origin platform, year, and instigator. _Use case:_ A user asking "where did this come from?" receives a sourced origin story. (`src/app/api/chat/route.ts`)

---

## /api/crisis

`src/app/api/crisis/route.ts`

- **Crisis Resource Delivery** — POST accepts a trigger type (self_harm_keyword, explicit_request, screening_score_red) and language, and always returns verified Egyptian mental health hotlines (08008880700, Befrienders Cairo) plus the IASP directory as a hard-coded, non-fabricatable baseline. _Use case:_ When the mental health module detects a red-flag keyword, crisis resources are delivered instantly without AI dependency. (`src/app/api/crisis/route.ts`)
- **NVIDIA AI Crisis Enrichment** — If context text is provided, calls NVIDIA NIM to add emotional validation, psychoeducation, and a culturally-sensitive safety plan in Arabic; AI enrichment is additive only and never blocks or replaces the static hotlines. _Use case:_ Adding compassionate, personalized support alongside the hotline numbers for users who include context. (`src/app/api/crisis/route.ts`)
- **Sealed Crisis Audit Log** — Logs the trigger type and IP to a sealed audit log (not public analytics) per Mindframe suicide reporting guidelines. _Use case:_ Compliance with ethical guidelines for crisis platforms while ensuring no public counter of suicide-related interactions. (`src/app/api/crisis/route.ts`)

---

## /api/debate-sim

`src/app/api/debate-sim/route.ts`

- **Socratic Devil's Advocate** — POST picks a random logical fallacy from the EAL fallacy library and generates a conversational counter-argument to the user's last message that covertly employs that fallacy. _Use case:_ Training users to detect logical fallacies in real debate by exposing them to a fallacy they must identify. (`src/app/api/debate-sim/route.ts`)
- **Fallacy Concealment Protocol** — The response text must not name or explain the fallacy; it returns the fallacy name/description separately so the UI can reveal it after the user guesses. _Use case:_ Interactive "spot the fallacy" game where users build detection skills by playing against an AI opponent. (`src/app/api/debate-sim/route.ts`)

---

## /api/defense/angry-debunkers

`src/app/api/defense/angry-debunkers/route.ts`

- **Quick Mode Truth Sandwich (1 API call)** — Runs API swarm (worker data), COVO orchestration, relevance adjudication, and Gemini-primary (NVIDIA fallback) to produce a bilingual Truth Sandwich, verdict, Egyptian context vector, deception layer, and negative-science category. _Use case:_ A user submits a claim and within seconds receives a full fact-check with religious and cultural context. (`src/app/api/defense/angry-debunkers/route.ts`)
- **Deep Mode Forensic Analysis (2nd API call)** — On user request, runs a second NVIDIA/Gemini call for God-System 7-layer audit, patient-zero tracing, and 8-layer deception detection with counter-weapons. _Use case:_ Power users or researchers who want a complete forensic breakdown after the quick result. (`src/app/api/defense/angry-debunkers/route.ts`)
- **PDF Multimodal Input** — Accepts pdfBase64 alongside the claim, passing the file to Gemini's multimodal endpoint so the model can analyze document content directly. _Use case:_ Users who upload a suspicious PDF article or WhatsApp screenshot for fact-checking. (`src/app/api/defense/angry-debunkers/route.ts`)
- **Relevance Adjudication Layer** — Uses a second Gemini call to judge each retrieved source against the specific claim (stance, why relevant), dropping irrelevant results before the verdict prompt. _Use case:_ Preventing false confidence from topically-adjacent but claim-unrelated academic papers. (`src/app/api/defense/angry-debunkers/route.ts`)
- **Cross-Model Second Opinion** — Runs an independent Gemini call (time-boxed 22s) in parallel to produce a second verdict; agreement/disagreement feeds into derived confidence scoring. _Use case:_ Surfacing model disagreement to the user as a signal of genuine uncertainty. (`src/app/api/defense/angry-debunkers/route.ts`)
- **Adversarial Grounding Critique** — After the verdict, a third Gemini call identifies which asserted sentences in the truth sandwich are NOT supported by the retrieved sources. _Use case:_ Catching model hallucinations before they reach the user; unsupported claims are flagged in the UI. (`src/app/api/defense/angry-debunkers/route.ts`)
- **Derived Confidence Label** — Combines model self-reported score, source tier, source count, cross-model agreement, and unsupported claim count into a calibrated confidence label using deriveConfidenceLabel. _Use case:_ Showing users an honest, multi-signal confidence rating rather than raw model self-assessment. (`src/app/api/defense/angry-debunkers/route.ts`)
- **Religious Claim Handling** — Detects Islamic claims, grades hadith authenticity from retrieved worker data only (never from model memory), cites scholars (Ibn Hajar, Al-Nawawi), and populates religious_context in the response. _Use case:_ Safely fact-checking viral hadiths or fatwas without fabricating Islamic scholarly positions. (`src/app/api/defense/angry-debunkers/route.ts`)

---

## /api/defense/deepreal/analyze

`src/app/api/defense/deepreal/analyze/route.ts`

- **EXIF Metadata Real Layer** — Extracts EXIF data from any uploaded image/video using exifr (no API key required); identifies editing/AI software, GPS, camera make/model. _Use case:_ Always-available forensic baseline even without paid API keys. (`src/app/api/defense/deepreal/analyze/route.ts`)
- **Sightengine Deepfake Detection** — If SIGHTENGINE_API_USER and API_SECRET are configured, calls Sightengine's deepfake + genai models and reports scores as weak signals (explicitly labeled non-conclusive). _Use case:_ Adding commercial deepfake detection probability to the analysis when keys are available, while being transparent about its limitations. (`src/app/api/defense/deepreal/analyze/route.ts`)
- **NVIDIA AI Forensic Synthesis** — Combines EXIF signals and Sightengine scores into an honest bilingual AI verdict (AUTHENTIC / INCONCLUSIVE / SUSPICIOUS / LIKELY_FAKE) with action items. _Use case:_ Giving the user a single readable explanation of all the forensic signals combined. (`src/app/api/defense/deepreal/analyze/route.ts`)

---

## /api/defense/extract-pdf

`src/app/api/defense/extract-pdf/route.ts`

- **PDF to Base64 Extractor** — POST accepts a multipart PDF (≤ 10 MB), validates MIME type, and returns the file as a base64 string with filename and size metadata. _Use case:_ Preparation step before passing a document to the angry-debunkers endpoint for multimodal analysis; the browser can upload once and reuse the base64. (`src/app/api/defense/extract-pdf/route.ts`)

---

## /api/defense/hadith-check

`src/app/api/defense/hadith-check/route.ts`

- **Hadith Authenticity Grading** — POST accepts hadith text (up to 5,000 chars); NVIDIA NIM primary (with Al-Azhar scholar persona) grades it Sahih/Hasan/Da'if/Mawdu'/UNVERIFIABLE with isnad analysis, narrator chain, collections found, and misattribution detection. Gemini fallback provides a structured schema response. _Use case:_ Verifying whether a viral "hadith" shared on social media is authentic, weak, or outright fabricated. (`src/app/api/defense/hadith-check/route.ts`)
- **Scholar Opinion Mapping** — Returns classical and modern scholar opinions (Ibn Hajar, Al-Albani, Al-Nawawi) on the narration. _Use case:_ Providing context beyond a simple grade — showing which authorities have addressed the narration and what they concluded. (`src/app/api/defense/hadith-check/route.ts`)
- **Misattribution Alert** — Boolean misattributed field plus explanation when a text is incorrectly attributed to a collection or narrator. _Use case:_ Catching claims that quote a real hadith number but attach it to the wrong book or a fabricated narrator. (`src/app/api/defense/hadith-check/route.ts`)

---

## /api/defense/mental-health/analyze

`src/app/api/defense/mental-health/analyze/route.ts`

- **Psychological Manipulation Detection** — POST accepts text and returns a JSON analysis with cognitive load score, manipulation detected flag, detected biases list, dark patterns list, and a 2–3 sentence summary. _Use case:_ The mental health engine analyzing a message a user received to identify emotional coercion or dark persuasion patterns. (`src/app/api/defense/mental-health/analyze/route.ts`)

---

## /api/defense/osint-investigator

`src/app/api/defense/osint-investigator/route.ts`

- **OSINT LangGraph Investigation** — POST streams an NDJSON investigation workflow built with LangChain LangGraph: Planner node (generates up to 3 search queries), Search+Scrape node (DuckDuckGo + URL scraping via extractCleanMarkdown), and Synthesizer node (generates a cited OSINT report). _Use case:_ A user submits a threat or claim for autonomous open-source intelligence gathering and synthesis, receiving real-time progress updates. (`src/app/api/defense/osint-investigator/route.ts`)
- **Planner Agent** — Uses Groq (Llama-3.3-70b) to generate focused search queries from the user's threat description. _Use case:_ Decomposing a complex claim into searchable sub-queries that maximize evidence coverage. (`src/app/api/defense/osint-investigator/route.ts`)
- **Search and Scrape Agent** — Executes all queries concurrently, caps to 3 scraped URLs, and filters empty/blocked pages. _Use case:_ Collecting raw web evidence from multiple sources simultaneously within a 60s budget. (`src/app/api/defense/osint-investigator/route.ts`)
- **OSINT Synthesizer Agent** — Grounded report generation: must cite every claim with bracketed source numbers [1][2]; outputs UNVERIFIED for unsubstantiated claims; never hallucinates sources. _Use case:_ Producing a professional OSINT report the user can share with confidence. (`src/app/api/defense/osint-investigator/route.ts`)

---

## /api/defense/religion-hub/analyze

`src/app/api/defense/religion-hub/analyze/route.ts`

- **Ontological Shock Counter-Narrative** — POST accepts a "threatText" representing an existential or religious shock and returns shock level (0–10), a verified historical/theological baseline, a trauma-informed grounding truth, and a suggested action. _Use case:_ When a user encounters content that shakes their religious worldview, this provides a calm, scholarly counter-narrative. (`src/app/api/defense/religion-hub/analyze/route.ts`)

---

## /api/defense/swarm

`src/app/api/defense/swarm/route.ts`

- **3-Agent Streaming Swarm** — POST runs three sequential AI agents: OSINT Threat Hunter (Groq + DuckDuckGo live search tool-calling), Red Team Psychologist (psychological manipulation analysis), and Trauma-Informed Theologian (streaming counter-narrative to client). _Use case:_ Full-spectrum threat neutralization combining live fact-checking, psychological deconstruction, and grounded counter-narrative in one pipeline. (`src/app/api/defense/swarm/route.ts`)
- **OSINT Threat Hunter with Live Search** — First agent uses Groq's native tool-calling with a DuckDuckGo webSearch tool to autonomously query the live internet for fact-checks about the claim. _Use case:_ Getting current, real-world fact-check coverage rather than relying on training data alone. (`src/app/api/defense/swarm/route.ts`)
- **Red Team Psychologist** — Produces a tight bulleted technical list of psychological manipulation tactics, dark patterns, and cognitive biases weaponized in the threat. _Use case:_ Giving a precise vocabulary of manipulation to the final agent for theological/philosophical deconstruction. (`src/app/api/defense/swarm/route.ts`)
- **Trauma-Informed Theologian Streaming** — Final agent streams a grounded counter-narrative combining the fact-check and psychological analysis with philosophical and ontological anchoring. _Use case:_ Providing a single readable, psychologically safe rebuttal to users who were targeted by the threat. (`src/app/api/defense/swarm/route.ts`)

---

## /api/defense/toxicity/analyze

`src/app/api/defense/toxicity/analyze/route.ts`

- **Arabic Toxicity Analysis** — POST analyzes Arabic text for hate speech, incitement, sectarian dog-whistles, gender-based violence language, and manipulation tactics; returns toxicity score 0–1, severity, counter-speech recommendation in Arabic, and report recommendation flag. _Use case:_ Moderating or flagging harmful Arabic social media content before it is shared further. (`src/app/api/defense/toxicity/analyze/route.ts`)
- **Emotion Detection Fallback** — If NVIDIA NIM fails, falls back to HuggingFace roberta-base-go_emotions for top-3 emotion classification. _Use case:_ Ensuring the toxicity endpoint always returns some emotional signal even without the Arabic-aware NVIDIA model. (`src/app/api/defense/toxicity/analyze/route.ts`)

---

## /api/efficacy

`src/app/api/efficacy/route.ts`

- **Cohort Efficacy Report** — GET returns an anonymized aggregate pre/post MIST-20 efficacy report: participant count (N), mean pre/post scores, Hedges' g effect size, and distrust-drift guard status. _Use case:_ Research team checking the platform's measurable impact on users' misinformation resistance — the core "fundable number." (`src/app/api/efficacy/route.ts`)

---

## /api/exercise

`src/app/api/exercise/route.ts`

- **Exercise Data File Loader** — GET with `file` and optional `subdir` params reads a JSON exercise definition from `src/data/exercises/`; enforces path-traversal security by checking the resolved path stays inside the allowed base directory. _Use case:_ Pages that render cognitive exercises (fallacy training, Socratic drills) fetch their exercise data from this secure file server. (`src/app/api/exercise/route.ts`)

---

## /api/fallacy-detect

`src/app/api/fallacy-detect/route.ts`

- **Logical Fallacy Detection (POST)** — Accepts text up to 10,000 characters; runs regex+TF-IDF fallacy engine across all or domain-filtered fallacies; returns matched fallacies with name, pattern, and severity. _Use case:_ A user pastes an argument or persuasive text to discover which logical fallacies it contains. (`src/app/api/fallacy-detect/route.ts`)
- **Logical Fallacy Detection (GET)** — Same detection via query parameter for lightweight integrations. _Use case:_ Browser widgets that check text on the fly without a POST body. (`src/app/api/fallacy-detect/route.ts`)
- **AI Deep Fallacy Analysis** — Calls NVIDIA NIM to find additional subtle fallacies missed by regex, assigns an overall manipulation score, identifies dominant rhetorical category, and generates a bilingual deconstruction guide and Truth Sandwich frame. _Use case:_ Going beyond keyword matching to catch sophisticated rhetorical manipulation (e.g. subtle appeal to nature or motte-and-bailey). (`src/app/api/fallacy-detect/route.ts`)

---

## /api/forensic/audio

`src/app/api/forensic/audio/route.ts`

- **Audio Format Detection** — Identifies MP3/WAV/OGG/FLAC/AAC/M4A from magic bytes and reports format, size, and encoding metadata. _Use case:_ First classification step before deeper forensic layers. (`src/app/api/forensic/audio/route.ts`)
- **MP3 ID3 Metadata Extraction** — Parses ID3v2 tags, detects encoder signatures (LAME, FFmpeg, Audacity, Adobe Audition), and flags stripped metadata as a manipulation indicator. _Use case:_ Identifying whether an audio file was re-encoded or had its provenance metadata removed. (`src/app/api/forensic/audio/route.ts`)
- **MP3 Bitrate Consistency Analysis** — Scans frame headers to classify CBR vs VBR encoding; VBR may indicate re-encoding from an edited source. _Use case:_ Detecting audio that has been spliced from different recordings, which often produces VBR artifacts. (`src/app/api/forensic/audio/route.ts`)
- **WAV Header Parsing** — Extracts channels, sample rate, bits per sample, and format code; flags phone-quality sample rates as potential call recordings. _Use case:_ Assessing whether a WAV file might be a secretly recorded phone call or a broadcast clip re-encoded at low quality. (`src/app/api/forensic/audio/route.ts`)
- **Suspicious Filename Heuristics** — Flags filenames containing deepfake/ElevenLabs/AI synthesis keywords as a manipulation signal. _Use case:_ Quick first-pass filter when users upload audio they found online. (`src/app/api/forensic/audio/route.ts`)
- **AI Audio Analysis (NVIDIA/Gemini)** — NVIDIA NIM (8s time-boxed) or Gemini multimodal (for files < 10 MB) provides a voice-cloning and splicing probability assessment with a verdict. _Use case:_ Detecting synthetic or cloned voice audio that passes binary format checks but sounds unnatural. (`src/app/api/forensic/audio/route.ts`)

---

## /api/forensic/c2pa

`src/app/api/forensic/c2pa/route.ts`

- **C2PA Manifest Detection** — Scans binary for C2PA JUMBF box (magic bytes 0x63327061) and COSE_Sign1 signature presence; reports byte offset and trust level. _Use case:_ Verifying whether a media file carries Coalition for Content Provenance and Authenticity credentials from a camera or editing tool. (`src/app/api/forensic/c2pa/route.ts`)
- **C2PA XMP Reference Detection** — Scans the first 200 KB of file text for C2PA XMP namespace references and identifies known issuers (Adobe Content Credentials, Truepic, Qualcomm, BBC, camera vendors). _Use case:_ Identifying files that reference C2PA provenance even without a full binary manifest. (`src/app/api/forensic/c2pa/route.ts`)
- **Provenance Absence Handling** — When no C2PA credentials are found, checks for IPTC and XMP edit-history metadata as secondary provenance indicators; explicitly states that absence does NOT prove manipulation. _Use case:_ Giving users an honest, calibrated assessment without false positives. (`src/app/api/forensic/c2pa/route.ts`)

---

## /api/forensic/health

`src/app/api/forensic/health/route.ts`

- **Forensic Backend Health Check** — GET pings the external forensic backend (FORENSIC_BACKEND_URL) for exiftool and c2patool availability; returns "fallback" mode when no backend is configured, "degraded" when unreachable. _Use case:_ The forensic UI showing users which tools are available and whether the full backend pipeline is live. (`src/app/api/forensic/health/route.ts`)

---

## /api/forensic/image

`src/app/api/forensic/image/route.ts`

- **Image EXIF and Metadata Forensics** — Parses EXIF via exifr to extract camera make/model, software, timestamps (original vs modified), and GPS; flags editing software (Photoshop, GIMP, Canva) and timestamp gaps as manipulation indicators. _Use case:_ First forensic layer for any image suspected of being manipulated or AI-generated. (`src/app/api/forensic/image/route.ts`)
- **JPEG Structure Analysis** — Parses JPEG quantization tables to estimate compression level; detects double JPEG encoding (multiple SOI markers) as a re-save indicator; identifies high-compression artifacts. _Use case:_ Detecting images that have been re-saved multiple times to reduce visible editing artifacts. (`src/app/api/forensic/image/route.ts`)
- **AI Vision Deepfake Detection (NVIDIA/Gemini)** — NVIDIA NIM (8s time-boxed) or Gemini Vision analyzes the image for inconsistent lighting, unnatural skin texture, AI generation artifacts, copy-paste marks, and background warping; returns a manipulation probability and verdict. _Use case:_ Detecting deepfake faces and AI-generated images that pass metadata checks but have visual tells. (`src/app/api/forensic/image/route.ts`)

---

## /api/forensic/metadata

`src/app/api/forensic/metadata/route.ts`

- **Full Metadata Extraction (EXIF/IPTC/XMP/GPS)** — Parses all four metadata standards from an image using exifr in parallel; returns capture device, editing software, timestamps, GPS coordinates, image dimensions, color space, compression, and IPTC attribution. _Use case:_ Comprehensive metadata dump for journalists or researchers who need all available provenance fields. (`src/app/api/forensic/metadata/route.ts`)
- **Manipulation Risk Assessment** — Computes a 0–95% manipulation risk score from metadata signals (missing device info, editing software, timestamp gaps) and explains the assessment in plain language. _Use case:_ Giving a non-expert user a single number that summarizes all the metadata red flags. (`src/app/api/forensic/metadata/route.ts`)

---

## /api/forensic/ocr

`src/app/api/forensic/ocr/route.ts`

- **Screenshot Claim Extraction and Verification** — POST accepts an image (≤ 10 MB), OCRs it (English + Arabic via Tesseract), then immediately runs the extracted text through the One-Law verification pipeline (max 6 sources). _Use case:_ "Check the screenshot" feature — upload a viral image and receive a real cited verdict on whatever text it contains. (`src/app/api/forensic/ocr/route.ts`)
- **One-Law Enforcement on OCR Text** — Returns verification status (verified/unverified), tier floor, admissible source count, and up to 6 source objects for the OCR-extracted claim. _Use case:_ Ensuring that even image-based misinformation is subjected to the same source-verification standard as text submissions. (`src/app/api/forensic/ocr/route.ts`)

---

## /api/forensic/video

`src/app/api/forensic/video/route.ts`

- **Video Container Format Detection** — Identifies MP4/MOV, WebM/MKV, and AVI from magic bytes; reports format and file size. _Use case:_ First classification step for video forensic analysis. (`src/app/api/forensic/video/route.ts`)
- **MP4 Atom Parsing and Edit Tool Detection** — Parses MP4 box structure, checks for stripped metadata (missing udta/meta atoms), scans for editing tool signatures (Premiere, DaVinci Resolve, FFmpeg, CapCut, InShot, KineMaster). _Use case:_ Identifying whether a viral video was professionally edited or assembled from different sources. (`src/app/api/forensic/video/route.ts`)
- **AI Video Deepfake Detection (NVIDIA/Gemini)** — NVIDIA NIM (8s time-boxed) or Gemini Vision (for files < 10 MB) analyzes for face inconsistencies, lip-sync anomalies, temporal jumps, background warping, and unnatural smoothness. _Use case:_ Detecting deepfake video content where the face has been digitally swapped or synthesized. (`src/app/api/forensic/video/route.ts`)

---

## /api/god-system

`src/app/api/god-system/route.ts`

- **GOD-System 8-Layer Analysis** — POST runs InputSafetyGuard sanitization, then COVO Emotional Intent Score computation, then an NVIDIA NIM (25s time-boxed) call that produces layers 3–8: source triangulation (evidence pyramid), fallacy detection, constructive positive (reasoning framework), bilingual Truth Sandwich, Socratic question, and Forward Defense WhatsApp script. _Use case:_ The core cognitive immunity analysis pipeline powering the /god-system page; one call returns the complete 8-layer output. (`src/app/api/god-system/route.ts`)
- **LLM Safety Gate** — Layer 1 InputSafetyGuard sanitizes the claim for prompt-injection and harmful patterns before any AI call. _Use case:_ Preventing adversarial inputs from hijacking the analysis pipeline. (`src/app/api/god-system/route.ts`)
- **Emotional Intent Scoring (Layer 2)** — COVO router computes an Emotional Intent Score (EIS) and determines whether a calm-reveal mode is needed before showing the verdict. _Use case:_ Adapting the response presentation for highly emotionally manipulative claims. (`src/app/api/god-system/route.ts`)
- **Graceful Degradation** — Returns a structured fallback response with partial data when NVIDIA NIM times out or fails JSON parsing, so the UI always has a renderable result. _Use case:_ Preventing 500 errors when the primary AI provider is unavailable. (`src/app/api/god-system/route.ts`)

---

## /api/health

`src/app/api/health/route.ts`

- **System Health Snapshot** — GET returns rotator slot count, privacy-safe event counters (chat.claim, verified, unverified, debunk, passport.create), and the live cohort efficacy headline (N, pre/post MIST-20 means). _Use case:_ Admin monitoring dashboard showing AI capacity, usage counters, and whether the platform is having a measurable impact. (`src/app/api/health/route.ts`)

---

## /api/hunter/medical

`src/app/api/hunter/medical/route.ts`

- **Egyptian Medical Syndicate Lookup** — POST accepts a doctor name, constructs a wildcard query, and attempts to fetch results from ems.org.eg; returns a degraded/unavailable response when the site is unreachable; explicitly states HTML parsing is not yet implemented rather than fabricating results. _Use case:_ Verifying whether a person claiming to be a doctor is registered with the Egyptian Medical Syndicate. (`src/app/api/hunter/medical/route.ts`)

---

## /api/hunter/trends

`src/app/api/hunter/trends/route.ts`

- **Google Trends Live Feed** — GET fetches the Google Trends RSS feed for a given geo (default Egypt/EG), parses titles and approximate traffic with regex, and caches for 5 minutes. _Use case:_ Displaying trending topics in Egypt so users can cross-reference viral claims against what is currently trending nationally. (`src/app/api/hunter/trends/route.ts`)

---

## /api/islamic/authority

`src/app/api/islamic/authority/route.ts`

- **Islamic Scholar Authority Analysis** — GET analyzes a named Islamic scholar/figure using NVIDIA NIM to return their formal qualifications, institutional affiliations, scholarly methodology (Ash'ari/Salafi/Modernist), known positions, alignment score with mainstream Al-Azhar/Amman Message consensus, and red-flag controversies; 24h cached. _Use case:_ Helping users evaluate whether a scholar cited in a viral religious claim is a mainstream authority or a fringe voice. (`src/app/api/islamic/authority/route.ts`)

---

## /api/islamic/fatwa-context

`src/app/api/islamic/fatwa-context/route.ts`

- **Comparative Fatwa Analysis** — POST accepts a fatwa or ruling text and returns a structured analysis: summary, four-madhab comparison (Hanafi/Maliki/Shafi'i/Hanbali positions), Maqasid al-Shariah analysis, historical context, and whether the IIFA has an explicit ruling. _Use case:_ Showing the scholarly breadth of opinion on a ruling to counter "only one valid view" manipulation. (`src/app/api/islamic/fatwa-context/route.ts`)

---

## /api/islamic/finance

`src/app/api/islamic/finance/route.ts`

- **Shariah Finance Compliance Audit** — POST accepts a transaction or investment description and audits it for Riba (interest), Gharar (excessive uncertainty), and Maysir (gambling/speculation) per AAOIFI standards; returns compliance status, confidence score, explanation citing AAOIFI, and specific issues. Handles grey areas like crypto and staking. _Use case:_ An Egyptian investor checking whether a financial product is halal before committing funds. (`src/app/api/islamic/finance/route.ts`)

---

## /api/islamic/hadith

`src/app/api/islamic/hadith/route.ts`

- **Live Hadith Search (fawazahmed0 provider)** — GET searches the six canonical collections (Bukhari, Muslim, Tirmidhi, Abu Dawud, Ibn Majah, Nasa'i, Malik) via the free fawazahmed0/hadith-api CDN; returns hadith text, number, and grade; 1h cached. _Use case:_ Verifying whether a quoted hadith appears in a canonical collection at all. (`src/app/api/islamic/hadith/route.ts`)
- **Configured Sunnah.com API Search** — Falls back to a configurable SUNNAH_HADITH_SEARCH_URL + SUNNAH_API_KEY endpoint when available. _Use case:_ Institutions that have licensed a Sunnah API subscription get richer results with Arabic text. (`src/app/api/islamic/hadith/route.ts`)
- **HadithAPI.com Provider** — Second fallback via HADITH_API_KEY for broader collection coverage including narrator attribution. _Use case:_ Additional coverage when fawazahmed0 and the configured provider both return no results. (`src/app/api/islamic/hadith/route.ts`)
- **Local Educational Hadith Fallback** — 13-hadith curated dataset from Sahih Bukhari/Muslim with synonym expansion (rahma → mercy/compassion, sabr → patience) used when all live APIs fail. _Use case:_ Ensuring the hadith search always returns something educational even when offline. (`src/app/api/islamic/hadith/route.ts`)

---

## /api/islamic/prayer

`src/app/api/islamic/prayer/route.ts`

- **Prayer Time Lookup** — GET with lat/lon/date (default Cairo) fetches the five daily prayer times from AlAdhan.com API (method 5) and returns times alongside Hijri calendar data (day, month in Arabic/English, year); 1h cached. _Use case:_ Embedding accurate prayer times for the user's location in any EAL page. (`src/app/api/islamic/prayer/route.ts`)
- **Qibla Direction Lookup** — GET with type=qibla returns the exact compass direction to Mecca for given coordinates from AlAdhan.com. _Use case:_ Showing the Qibla direction alongside prayer times for users who need to orient themselves. (`src/app/api/islamic/prayer/route.ts`)

---

## /api/islamic/quran

`src/app/api/islamic/quran/route.ts`

- **Quran Keyword Search** — GET type=search queries the entire Quran via AlQuran.cloud API using Muhammad Asad's English translation; returns up to 10 verse matches with surah name, ayah number, and reference. 24h cached. _Use case:_ Verifying whether a verse cited in a claim actually exists and what it says in context. (`src/app/api/islamic/quran/route.ts`)
- **Quran Verse Retrieval** — GET type=ayah with reference "2:255" fetches a specific verse in both Uthmani Arabic script and Asad English translation. _Use case:_ Displaying the exact text of a verse next to a claim that misquotes it. (`src/app/api/islamic/quran/route.ts`)
- **Full Surah Retrieval** — GET type=surah with surah number fetches the entire chapter in Arabic and English. _Use case:_ Providing full context when a claim cites a verse whose meaning depends on surrounding ayahs. (`src/app/api/islamic/quran/route.ts`)
- **Tafsir Retrieval** — GET type=tafsir fetches Ibn Kathir tafsir (or any configured tafsir ID) for a verse from Quran.com API alongside the Arabic and Asad English text. _Use case:_ Showing classical scholarly interpretation alongside a verse to counter out-of-context citations. (`src/app/api/islamic/quran/route.ts`)
