# Pages & Routes — slice pages-1

Covers items 1–44 of the sorted `src/app/**/page.tsx` list (ASCII order).
Strategy: Pages & Routes.

---

## (kernel)/audit — `/audit`
`src/app/(kernel)/audit/page.tsx`

- **Compliance Checklist** — Displays 9 compliance items across IRB, Data Privacy, and Informed Consent categories with expandable detail and pass/review status badges.  _Use case:_ Reviewers and ethics committees inspect whether the platform meets Belmont Report, Declaration of Helsinki, and Egyptian Data Protection Law (No. 151/2020) requirements.  (`src/app/(kernel)/audit/page.tsx`)
- **Ethical AI Principles tab** — Renders 6 ethical AI principle cards (Beneficence, Justice, Non-Maleficence, Autonomy, Transparency, Accountability) with Arabic/English bilingual text.  _Use case:_ Users and institutional partners verify the platform's ethical commitments.  (`src/app/(kernel)/audit/page.tsx`)
- **Transparency Metrics tab** — Shows 6 quantitative metrics (open-source coverage 100%, citation rate 97%, correction response 48 hrs, etc.) as animated progress bars.  _Use case:_ Funders or reviewers check platform quality at a glance.  (`src/app/(kernel)/audit/page.tsx`)
- **Audit Log with Severity Filter** — Displays 8 time-stamped log entries (content reviews, privacy audits, bias assessments) filterable by severity (all/success/info/warning).  _Use case:_ Auditors track recent governance actions chronologically.  (`src/app/(kernel)/audit/page.tsx`)

---

## (kernel)/journal — `/journal`
`src/app/(kernel)/journal/page.tsx`

- **Daily Reflection Entry** — Structured three-prompt form (What did I learn? / What surprised me? / What will I do differently?) with localStorage persistence.  _Use case:_ Learners record daily cognitive reflections to reinforce metacognition after exercises.  (`src/app/(kernel)/journal/page.tsx`)
- **Mood Selector** — 5-emoji mood picker (1–5 scale) linked to each journal entry.  _Use case:_ Users track emotional state alongside cognitive learning for holistic progress monitoring.  (`src/app/(kernel)/journal/page.tsx`)
- **Cognitive Growth Self-Assessment Slider** — A 1–10 numeric self-rating slider saved per entry and charted over time.  _Use case:_ Learners estimate their cognitive growth each day so the platform can chart progression.  (`src/app/(kernel)/journal/page.tsx`)
- **Tag System** — 8 selectable topic tags (Critical Thinking, OSINT, Islamic Studies, etc.) attached to entries for categorization.  _Use case:_ Users tag entries by domain so patterns in weak areas are visible.  (`src/app/(kernel)/journal/page.tsx`)
- **Past Entries Timeline** — Scrollable list of all previous journal entries, expandable to reveal full reflections, mood, and tags.  _Use case:_ Learners review their journal history to see how their thinking has evolved.  (`src/app/(kernel)/journal/page.tsx`)
- **Mood Tracker Bar Chart** — Bar chart of last 21 entries showing mood distribution and trend over time.  _Use case:_ Users monitor emotional patterns to identify burnout or stress related to training.  (`src/app/(kernel)/journal/page.tsx`)
- **Cognitive Growth Chart** — Vertical bar chart of the last 14 entries' self-assessed cognitive score, with explanatory cards citing Bloom's Taxonomy.  _Use case:_ Visualizes whether the learner's self-rated cognitive competence is improving.  (`src/app/(kernel)/journal/page.tsx`)
- **Day Streak Counter** — Calculates and displays a consecutive daily journaling streak (up to 30 days).  _Use case:_ Motivation mechanic to maintain consistent daily reflection practice.  (`src/app/(kernel)/journal/page.tsx`)

---

## (kernel)/skills — `/skills`
`src/app/(kernel)/skills/page.tsx`

- **8-Dimension Skill Self-Assessment** — Users rate themselves 1–5 on Critical Thinking, Statistical Literacy, Source Verification, Emotional Regulation, Islamic Literacy, OSINT, Debate, and Media Literacy; ratings persist in localStorage.  _Use case:_ Learners establish and track their cognitive defense skill profile across all domains.  (`src/app/(kernel)/skills/page.tsx`)
- **Radar Chart Visualization** — SVG radar/spider chart rendering the user's 8-dimensional skill scores as a data polygon.  _Use case:_ Users see their overall cognitive defense profile shape at a glance to spot weak dimensions.  (`src/app/(kernel)/skills/page.tsx`)
- **Progress Bar View Toggle** — Switches the display from radar chart to individual progress bars per skill, each color-coded.  _Use case:_ Users who prefer linear representation can compare skill levels without the radar.  (`src/app/(kernel)/skills/page.tsx`)
- **Level Dot Adjuster** — Clicking a skill expands it to show 5 clickable badge buttons for adjusting the score level, each labeled with that skill's level names.  _Use case:_ Users update their self-assessed level after completing relevant exercises.  (`src/app/(kernel)/skills/page.tsx`)
- **Overall Skill Profile Score** — Aggregates all 8 skill scores into a single percentage progress bar with total points.  _Use case:_ Single headline metric for learner progress reports.  (`src/app/(kernel)/skills/page.tsx`)

---

## (marketing)/corrections — `/corrections`
`src/app/(marketing)/corrections/page.tsx`

- **Public Corrections Log** — Lists 5 publicly disclosed content corrections (factual, statistical, citation, language, methodology) with diff view (old vs. new text), reason, source, reviewer, and semantic version.  _Use case:_ Readers verify the platform's editorial accountability and track what changed.  (`src/app/(marketing)/corrections/page.tsx`)
- **Correction Type Filter** — Chips filter the corrections log by type (factual/statistical/citation/language/methodology).  _Use case:_ Researchers interested in a specific correction category filter to relevant items.  (`src/app/(marketing)/corrections/page.tsx`)
- **Correction Request Submission Form** — Form with page name, correction type, current text, suggested correction, and source fields.  _Use case:_ Community members report errors they find in platform content.  (`src/app/(marketing)/corrections/page.tsx`)
- **Editorial Standards Cards** — 6 cards explaining the platform's standards (primary source priority, version control, 48-hour window, dual review, bilingual consistency, statistical rigor).  _Use case:_ Partners and users understand the quality bar the platform holds itself to.  (`src/app/(marketing)/corrections/page.tsx`)

---

## (marketing)/methodology — `/methodology`
`src/app/(marketing)/methodology/page.tsx`

- **Three Pillars of Cognitive Defense** — Explains Inoculation Theory (pre-bunking), Continued Influence Effect (why correction fails), and Dual-Process Theory (where deception lives) with cited scientific baselines.  _Use case:_ Educators and funders understand the scientific foundation of the platform's approach.  (`src/app/(marketing)/methodology/page.tsx`)
- **"Why Tools Cannot Win" 5-Step Proof** — Walks through layers 1–7 of the information ecosystem to argue that only cognitive training can defeat deception.  _Use case:_ Persuades stakeholders to invest in cognitive training over fact-checking tools.  (`src/app/(marketing)/methodology/page.tsx`)
- **Worldwide Standards Alignment Tables** — Four table sections mapping the platform's features to international standards: Truth & Verification (IFCN, UNESCO MIL, Stanford COR, RAND), Mental Health (WHO mhGAP, DSM-5-TR, ICD-11), Religion (Al-Azhar Wasatiyya, Amman Message, Marrakesh Declaration), and Trust/Privacy (WCAG 2.2, GDPR, Cochrane/GRADE).  _Use case:_ Institutional reviewers confirm compliance with specific global frameworks.  (`src/app/(marketing)/methodology/page.tsx`)
- **Source Hierarchy Pyramid** — Renders the `SourcePyramid` component showing the tiered evidence hierarchy used by the platform.  _Use case:_ Users understand why some sources are trusted over others in verdicts.  (`src/app/(marketing)/methodology/page.tsx`)

---

## (marketing)/transparency — `/transparency`
`src/app/(marketing)/transparency/page.tsx`

- **AI Models Disclosure** — Lists 5 AI models in use (Gemini 2.5 Flash, Llama 3.3 70B, Nemotron-3, Cohere rerank-v3.5, OpenAI text-embedding-3-small) with provider, use case, and status.  _Use case:_ Users and regulators verify which AI systems process their queries.  (`src/app/(marketing)/transparency/page.tsx`)
- **Data Sources Registry** — Table of 8 authoritative data sources (Reuters Institute, WHO Atlas, PubMed, Arab Barometer, CAPMAS, UNESCO MIL, Sunnah.com, Stanford SHEG) with year, type, description, and link.  _Use case:_ Researchers trace where platform statistics and citations originate.  (`src/app/(marketing)/transparency/page.tsx`)
- **Methodology Disclosure** — Cards describing 4 core methodologies: SIFT, Paul-Elder Framework, Bloom's Taxonomy (Revised), and Mustalah al-Hadith.  _Use case:_ Educators verify the platform's pedagogical approach.  (`src/app/(marketing)/transparency/page.tsx`)
- **Conflict of Interest Declarations** — Lists COI statements for Project Lead, Islamic Content Advisor, and Psychology Advisor.  _Use case:_ Institutional partners confirm no hidden commercial or political influence.  (`src/app/(marketing)/transparency/page.tsx`)
- **Funding Disclosure** — Reveals funding sources (self-funded, open-source in-kind, grant applications) and editorial independence guarantee.  _Use case:_ Funders and watchdogs verify editorial independence.  (`src/app/(marketing)/transparency/page.tsx`)
- **Open Source Commitment Tab** — Lists technology stack badges and 3 cards on auditable code, reproducible results, and community contributions.  _Use case:_ Developers and auditors understand the platform's commitment to inspectable algorithms.  (`src/app/(marketing)/transparency/page.tsx`)

---

## about — `/about`
`src/app/about/page.tsx`

- **Mission & Identity tab** — Shows the platform's mission statement and summary of three core engines (DeepReal, Mental Health, Religion Hub) with objectives, skills, and risks for each.  _Use case:_ New users and evaluators understand what the platform does and why it exists.  (`src/app/about/page.tsx`)
- **Team & Institution tab** — Lists 5 team members with student ID codes, names, roles (Arabic/English), and institution info (Higher Technology Institute in New Heliopolis, supervisor, contact).  _Use case:_ Academic reviewers and competition judges see the project's academic context.  (`src/app/about/page.tsx`)
- **Original Contributions tab** — Describes 4 original contributions: the EAL platform itself, KeyHunter 7-layer vocabulary taxonomy, first multi-domain empirical evaluation, and reusable design framework.  _Use case:_ Grant reviewers and journal reviewers assess novelty.  (`src/app/about/page.tsx`)
- **Competitive Analysis tab** — Side-by-side comparison of 7 competitors (Bad News Game, Go Viral!, Google Prebunking, Headspace, Wysa, Faithlife, iCBT platforms) with strengths, weaknesses, and gap EAL fills.  _Use case:_ Investors and juries understand why EAL is differentiated.  (`src/app/about/page.tsx`)
- **Evidence Types tab** — Surfaces the `EvidenceDisambiguation` component showing different evidence categories.  _Use case:_ Researchers confirm the platform's evidence standards.  (`src/app/about/page.tsx`)
- **Defense Library tab** — Shows the `DefenseLibrary` component listing all platform defense tools.  _Use case:_ Navigational overview of all available tools for new users.  (`src/app/about/page.tsx`)
- **Framework Coverage Map tab** — Shows the `FrameworkCoverage` component mapping features to scientific frameworks.  _Use case:_ Academic supervisors verify coverage of required frameworks.  (`src/app/about/page.tsx`)

---

## ai-agents — `/ai-agents`
`src/app/ai-agents/page.tsx`

- **Multi-Agent Investigation Panel** — User submits a claim, 5 specialist AI agents (source-hunter, bias-detector, arabic-linguist, timeline-builder, counter-narrative) are activated with staggered animation showing each agent's live status (idle/working/done/error).  _Use case:_ Users verify complex claims with concurrent multi-perspective AI analysis.  (`src/app/ai-agents/page.tsx`)
- **Agent Result Expansion** — Each completed agent's findings are viewable by clicking its card to expand the detailed result.  _Use case:_ Users drill into which specific agent flagged what issue with the claim.  (`src/app/ai-agents/page.tsx`)
- **Verdict Display** — Final `InvestigationReport` verdict rendered with color-coded icon (TRUE/FALSE/MISLEADING/UNVERIFIED/PARTIALLY_TRUE) and Arabic label.  _Use case:_ Users get a single definitive verdict with supporting multi-agent evidence.  (`src/app/ai-agents/page.tsx`)
- **Investigation History Modal** — Stores past investigation sessions in localStorage and allows reloading prior sessions.  _Use case:_ Users revisit earlier claims without re-running the analysis.  (`src/app/ai-agents/page.tsx`)

---

## ai-editor — `/ai-editor`
`src/app/ai-editor/page.tsx`

- **Natural Language UI Generation** — Users type a prompt and the page generates a live rendered UI component powered by NVIDIA NIM Nemotron-3 Ultra 550B.  _Use case:_ Platform developers and educators quickly prototype new awareness tool widgets.  (`src/app/ai-editor/page.tsx`)
- **Logic Scenario Template Library** — 8 scenario categories (Defense Tools, Islamic, Science, Cognitive Training, Dashboards, Social Media, Gamification) with pre-built prompts such as claim verification card, 8-layer deception detector, Hadith authentication card, prayer dashboard, cognitive bias quiz, and p-value visualizer.  _Use case:_ Non-technical educators select a template to instantly generate a domain-specific interactive widget.  (`src/app/ai-editor/page.tsx`)
- **Template Difficulty Filter** — Templates labeled Beginner/Intermediate/Advanced for appropriate selection.  _Use case:_ Educators match template complexity to audience level.  (`src/app/ai-editor/page.tsx`)
- **Category Filter Chips** — Filter the template library by category (Defense/Islamic/Science/etc.).  _Use case:_ Users narrow the template list to a specific content domain.  (`src/app/ai-editor/page.tsx`)

---

## angry-debunkers — `/angry-debunkers`
`src/app/angry-debunkers/page.tsx`

- **GOD-System 8-Layer Claim Analysis** — Users submit a claim and the GOD-System (NVIDIA-backed) runs it through 7 sequential analysis stages (emotion-stripping, claim identification, variable isolation, database cross-reference, context verification, fallacy detection, Truth Sandwich formatting).  _Use case:_ Users need a rigorous, multi-layer verdict on Arabic or English misinformation.  (`src/app/angry-debunkers/page.tsx`)
- **PDF Document Audit** — Upload a PDF document for a 7-stage forensic audit (page parsing, methodology claim extraction, citation fraud detection, EuropePMC cross-reference, statistical claim verification, pseudoscience detection, forensic report).  _Use case:_ Researchers audit academic papers or reports for integrity issues.  (`src/app/angry-debunkers/page.tsx`)
- **Threat Map & Hunter Mode** — Embeds the `ThreatMap` and `HunterMode` components for visualizing misinformation spread and running deep investigation.  _Use case:_ Analysts track and investigate active misinformation campaigns geographically.  (`src/app/angry-debunkers/page.tsx`)
- **Session History with Reload** — Previous investigation sessions stored per-browser, loadable from a History Modal.  _Use case:_ Users reference prior verdicts without resubmitting claims.  (`src/app/angry-debunkers/page.tsx`)
- **In-Page AI Chatbot** — `PageAIChatbot` context-aware chatbot embedded for follow-up questions.  _Use case:_ Users ask follow-up questions about a verdict or request clarification on methodology.  (`src/app/angry-debunkers/page.tsx`)

---

## arabic-shield — `/arabic-shield`
`src/app/arabic-shield/page.tsx`

- **Arabic Text Manipulation Analyzer** — Client-side rule-based engine analyzes pasted Arabic (or English) text for 7 manipulation techniques: fear-mongering, emotional manipulation, authority appeal, false urgency, conspiracy logic, in-group/out-group bias, and loaded language; returns confidence scores per technique.  _Use case:_ Arabic-speaking users paste a viral WhatsApp message or post to instantly see what psychological manipulation techniques it uses.  (`src/app/arabic-shield/page.tsx`)
- **Red Flag Highlighting** — Lists specific trigger words found in the text with their reason (Arabic + English) for flagging.  _Use case:_ Users identify exactly which phrases are manipulative rather than just a score.  (`src/app/arabic-shield/page.tsx`)
- **Overall Manipulation Score** — Numeric 0–100 score with color-coded gauge.  _Use case:_ Quick headline risk assessment before sharing a piece of content.  (`src/app/arabic-shield/page.tsx`)
- **Suggested Response Generator** — Produces a contextually appropriate response or counter-message (Arabic + English) based on detected techniques.  _Use case:_ Users formulate a fact-based reply to share with the sender.  (`src/app/arabic-shield/page.tsx`)
- **Emotional Trigger List** — Enumerates specific words that triggered emotional responses.  _Use case:_ Users learn which emotional vocabulary is used against them.  (`src/app/arabic-shield/page.tsx`)
- **Text-to-Speech (TTS) Button** — Reads the analysis aloud (Volume2 icon).  _Use case:_ Accessibility for users who prefer audio feedback.  (`src/app/arabic-shield/page.tsx`)

---

## assessment — `/assessment`
`src/app/assessment/page.tsx`

- **MIST-20 Instrument** — 20-headline misinformation susceptibility test (Maertens et al., 2024) measuring veracity discernment, naivete, and distrust; α = .77; available as pre- and post-test.  _Use case:_ Researchers measure participants' misinformation susceptibility before and after training for RCT analysis.  (`src/app/assessment/page.tsx`)
- **MHLS Instrument** — 35-item Mental Health Literacy Scale (α = .873) assessing knowledge of mental health conditions.  _Use case:_ Researchers measure mental health literacy as an outcome variable for the Mental Health engine.  (`src/app/assessment/page.tsx`)
- **Brief RCOPE Instrument** — Religious coping scale measuring positive and negative religious coping behaviors.  _Use case:_ Researchers assess religious coping as an outcome for the Religion Hub engine.  (`src/app/assessment/page.tsx`)
- **GHSQ Instrument** — General Help-Seeking Questionnaire measuring intentions to seek professional help.  _Use case:_ Researchers track whether the Mental Health engine increases help-seeking intentions.  (`src/app/assessment/page.tsx`)
- **SUS Instrument** — System Usability Scale (10 items) for measuring perceived platform usability.  _Use case:_ Researchers collect usability data as part of the design science evaluation.  (`src/app/assessment/page.tsx`)
- **MC-SDS Social Desirability Scale** — Marlowe-Crowne Social Desirability Scale to detect response bias in self-reports.  _Use case:_ Researchers control for socially desirable responding in analysis.  (`src/app/assessment/page.tsx`)
- **AssessmentEngine Component** — Drives all 6 instruments using a shared adaptive engine that tracks answers, duration, and calls `recordAssessmentCompletion`.  _Use case:_ Uniform administration of all validated instruments with automatic progress recording.  (`src/app/assessment/page.tsx`)
- **Bilingual Administration** — Language selection (English/Arabic) based on `getResearchGovernance()` participant language preference.  _Use case:_ Arabic-speaking participants complete instruments in their native language for validity.  (`src/app/assessment/page.tsx`)

---

## bad-news — `/bad-news`
`src/app/bad-news/page.tsx`

- **"Bad News" Misinformation Role-Play Game** — Three-scenario game where players must choose between responsible and irresponsible actions when encountering viral misinformation (blurry ancient tech photo, WhatsApp health scare, deepfake political video).  _Use case:_ Users experience firsthand how misinformation spreads so they can recognize the tactics.  (`src/app/bad-news/page.tsx`)
- **Score and Follower Counter** — Choosing the "wrong" (misinformation-spreading) option increases score and followers; choosing the right option gives minimal gain.  _Use case:_ Illustrates the perverse incentive structure that drives misinformation virality.  (`src/app/bad-news/page.tsx`)
- **Credibility Tracker** — Credibility score decreases when manipulative choices are made.  _Use case:_ Players see the trade-off between short-term virality and long-term credibility.  (`src/app/bad-news/page.tsx`)
- **Scenario Feedback Explainer** — After each choice, an explanatory panel reveals the correct response with cited reasoning.  _Use case:_ Players learn the evidence-based rationale immediately after each decision.  (`src/app/bad-news/page.tsx`)

---

## baseline — `/baseline`
`src/app/baseline/page.tsx`

- **Day-0 Trust Calibration Battery** — 5-section pre-test: intro, claim classification with confidence (using `CALIBRATION_CLAIMS`), emotion-vs-evidence pairing (`EMOTION_EVIDENCE_PAIRS`), and comfort-vs-accuracy (`COMFORT_ACCURACY_PAIRS`).  _Use case:_ Researchers establish each participant's initial misinformation susceptibility profile before any training.  (`src/app/baseline/page.tsx`)
- **Claim Classification with Confidence Rating** — For each claim users select real/fake/unsure AND adjust a confidence slider (0–100%); used to compute calibration (accuracy vs. stated certainty).  _Use case:_ Measures not just whether users get claims right but how confident they are when wrong (overconfidence detection).  (`src/app/baseline/page.tsx`)
- **Emotion vs Evidence Pairing** — Trial pairs an emotional scenario with evidence to measure whether emotion overrides rational assessment.  _Use case:_ Captures System 1 vs System 2 susceptibility as a baseline metric.  (`src/app/baseline/page.tsx`)
- **Trust Calibration Profile Generation** — On completion calls `buildTrustCalibrationProfile()` to produce a structured susceptibility profile.  _Use case:_ Research team receives a per-participant baseline data object for later pre/post comparison.  (`src/app/baseline/page.tsx`)

---

## bias-detector — `/bias-detector`
`src/app/bias-detector/page.tsx`

- **Cognitive Bias Encyclopedia** — Interactive display of 6+ named cognitive biases (Confirmation Bias, Anchoring, Availability Heuristic, Dunning-Kruger, Bandwagon, and more) with academic citations, Egypt-specific examples, and Arabic translations.  _Use case:_ Users learn to recognize biases that make them susceptible to misinformation.  (`src/app/bias-detector/page.tsx`)
- **Bias API Detection** — Users paste text and call `/api/bias-detect` to receive an AI-analyzed list of biases present in the text.  _Use case:_ Users test their own writing or viral content for cognitive bias exploitation.  (`src/app/bias-detector/page.tsx`)
- **Concept Explainer** — `ConceptExplainer` component renders detailed explanations for selected bias.  _Use case:_ Learners drill into a specific bias's definition, psychological mechanism, and examples.  (`src/app/bias-detector/page.tsx`)

---

## bias-fingerprint — `/bias-fingerprint`
`src/app/bias-fingerprint/page.tsx`

- **Behavioral Bias Self-Assessment** — Each of the platform's tracked cognitive biases has a real behavioral scenario question answered on a 0–4 Likert scale; answer maps to a 0–100% vulnerability score with no hardcoded values.  _Use case:_ Users get an honest, personalized bias vulnerability profile based on their own behavioral responses.  (`src/app/bias-fingerprint/page.tsx`)
- **localStorage Persistence** — Answers saved under `eal-bias-fingerprint-answers` so the fingerprint reflects actual interactions over time.  _Use case:_ Users return and see their current fingerprint without re-answering all questions.  (`src/app/bias-fingerprint/page.tsx`)
- **Exercise Recommendations** — Each bias card shows which EAL exercises target that specific vulnerability.  _Use case:_ Users are directed to the right exercises to address their top vulnerability.  (`src/app/bias-fingerprint/page.tsx`)
- **Arabic Tip for Each Bias** — Each bias has a bilingual actionable tip (SIFT, lateral reading, etc.) for mitigation.  _Use case:_ Arabic-speaking users receive advice in their preferred language.  (`src/app/bias-fingerprint/page.tsx`)

---

## blackbox — `/blackbox`
`src/app/blackbox/page.tsx`

- **7-Dimension Forensic Audit** — User submits a claim; the system scores it across Source Credibility, Logical Consistency, Emotional Manipulation, Temporal Validity, Media Authenticity, Scientific Basis, and Islamic Verification using multi-API cross-referencing.  _Use case:_ Users want the most comprehensive claim audit available, covering all platform dimensions simultaneously.  (`src/app/blackbox/page.tsx`)
- **Animated 6-Step Reasoning Chain** — Displays a sequential reasoning trace (Intake → Decomposition → Source Trace → Cross-Reference → Media Forensics → Synthesis) with each step animated as it executes.  _Use case:_ Users and researchers understand the analysis methodology step by step.  (`src/app/blackbox/page.tsx`)
- **Quick Example Prompts** — 4 pre-loaded Egyptian misinformation examples (lemon water cures cancer, 5G/COVID, Al-Azhar bitcoin fatwa, currency devaluation) to demo the system.  _Use case:_ New users can immediately test the tool without crafting their own claim.  (`src/app/blackbox/page.tsx`)
- **One Law Enforcement Display** — Result shows `enforcement` object with status/tier/admissible sources count.  _Use case:_ Users see whether the verdict is One-Law compliant (only real, resolvable sources accepted).  (`src/app/blackbox/page.tsx`)

---

## certificate — `/certificate`
`src/app/certificate/page.tsx`

- **Dynamic Completion Certificate** — Reads user progress from localStorage and renders a personalized certificate showing completion percentage (of 42 exercises), strongest track (DeepReal/Mental Health/Religion Hub), and today's date.  _Use case:_ Users who reach ≥80% completion earn a shareable proof-of-learning credential.  (`src/app/certificate/page.tsx`)
- **Download Certificate** — `certRef` div is target for canvas/screenshot-style download.  _Use case:_ Users save and share their certificate on social media or include it in a portfolio.  (`src/app/certificate/page.tsx`)
- **Progress Gate** — Shows remaining percentage needed for full certificate if completion is below 80%.  _Use case:_ Motivates incomplete users to finish the curriculum.  (`src/app/certificate/page.tsx`)

---

## chatbot — `/chatbot`
`src/app/chatbot/page.tsx`

- **Multi-Mode AI Chatbot** — Chat interface with selectable modes (general, plus others defined in `CHAT_MODES`) each changing the AI's persona and focus area.  _Use case:_ Users ask questions about misinformation, mental health, or Islamic topics with context-appropriate AI guidance.  (`src/app/chatbot/page.tsx`)
- **Session Management** — Multiple named chat sessions created, listed in a sidebar, and persisted in localStorage via `saveSessions`/`loadSessions`.  _Use case:_ Users maintain separate conversations for different topics without losing history.  (`src/app/chatbot/page.tsx`)
- **Onboarding Flow** — First-visit users see an onboarding screen before accessing chat.  _Use case:_ New users understand platform rules and limitations before chatting.  (`src/app/chatbot/page.tsx`)
- **Chat Export (Download)** — Download button to export conversation transcript.  _Use case:_ Users save a chat session for reference or sharing.  (`src/app/chatbot/page.tsx`)
- **Scroll-to-Bottom Button** — Appears when user scrolls up in long conversations.  _Use case:_ Usability feature for long chat sessions.  (`src/app/chatbot/page.tsx`)

---

## check-image — `/check-image`
`src/app/check-image/page.tsx`

- **Screenshot OCR Fact-Check** — User uploads an image; the page calls `/api/forensic/ocr` (Tesseract) to extract text, then runs it through the One-Law pipeline returning a cited verdict or UNVERIFIED.  _Use case:_ Users who receive viral images (WhatsApp screenshots, memes) can fact-check the claim embedded as text in the image.  (`src/app/check-image/page.tsx`)
- **Image Preview** — Displays the uploaded image inline beside the analysis result.  _Use case:_ Users confirm they uploaded the correct image.  (`src/app/check-image/page.tsx`)
- **One-Law Enforcement Display** — Shows enforcement status (verified/unverified), tier, and number of admissible sources.  _Use case:_ Users see whether the verdict meets the platform's strict source standard.  (`src/app/check-image/page.tsx`)
- **Source List with Tier Badges** — Lists each cited source URL with its evidence tier classification.  _Use case:_ Users can click through to the actual sources backing the verdict.  (`src/app/check-image/page.tsx`)

---

## cognitive-lab — `/cognitive-lab`
`src/app/cognitive-lab/page.tsx`

- **Cognitive Bias Browser** — Searchable list of all biases from `COGNITIVE_BIASES` dataset with icon, color, and description; clicking one shows full detail.  _Use case:_ Students explore the complete bias taxonomy as a reference resource.  (`src/app/cognitive-lab/page.tsx`)
- **Live Bias Detection on Text** — Text input sends to `/api/bias-detect` to return a list of biases detected in the pasted content.  _Use case:_ Educators or researchers run any text through the bias scanner for classroom demonstrations.  (`src/app/cognitive-lab/page.tsx`)
- **Bias Search Filter** — Filters the bias list by name or description string.  _Use case:_ Users quickly find a specific bias by keyword.  (`src/app/cognitive-lab/page.tsx`)

---

## comb-tracker — `/comb-tracker`
`src/app/comb-tracker/page.tsx`

- **COM-B Behavioral Change Dashboard** — Reads user progress (exercises, tool uses, streak) and computes scores for Capability (Physical + Psychological), Opportunity (Social + Physical), and Motivation (Reflective + Automatic) using the COM-B model; derives an overall Behavior Change score.  _Use case:_ Researchers and learners see not just what they learned but whether their behavior has actually changed according to a validated behavioral change model.  (`src/app/comb-tracker/page.tsx`)
- **Track Breakdown** — Splits exercise completion into three tracks (DeepReal, Mental Health, Religion Hub) as input to COM-B subscores.  _Use case:_ Learners see which engine has contributed most to behavioral change.  (`src/app/comb-tracker/page.tsx`)
- **Verification-Use Counter** — Reads from localStorage the number of times verification tools were actually used (not just exercises completed).  _Use case:_ Measures real-world behavior change (tool adoption) as an outcome.  (`src/app/comb-tracker/page.tsx`)

---

## competition-demo — `/competition-demo`
`src/app/competition-demo/page.tsx`

- **Auto-Running Platform Showcase** — Sequentially demos all major platform API capabilities in under 60 seconds by firing real endpoints (GOD-system, fallacy-detect, bias-detect, etc.) with representative Egyptian misinformation payloads.  _Use case:_ Competition judges or investors watch the platform run live without manually navigating.  (`src/app/competition-demo/page.tsx`)
- **Multi-Step Demo Runner** — 6+ demo steps (GOD-System 8-Layer, Fallacy Detection, Cognitive Bias Scanner, and more) each with endpoint, payload, category tag, metrics, and a link to the full tool.  _Use case:_ Automated presentation script for academic project defenses.  (`src/app/competition-demo/page.tsx`)

---

## connect — `/connect`
`src/app/connect/page.tsx`

- **Peer Challenge Feed** — Lists active peer challenges from the EAL Network with accept/decline actions.  _Use case:_ Users challenge each other to fact-checking or cognitive exercises to earn XP.  (`src/app/connect/page.tsx`)
- **Leaderboard** — Shows users' XP totals and current rank (Level 4, 4,250 XP shown as example).  _Use case:_ Social motivation for continued platform engagement.  (`src/app/connect/page.tsx`)
- **XP & Level Display** — User's current rank and total XP prominently displayed in the header stats card.  _Use case:_ Users track their standing in the platform community at a glance.  (`src/app/connect/page.tsx`)

---

## critical-thinking — `/critical-thinking`
`src/app/critical-thinking/page.tsx`

- **6-Step Critical Thinking Framework** — Interactive stepper through 6 analysis stages: The Claim, The Source, The Methodology, The Data, The Logic, and The Verdict; each with domain-specific questions (covering both scientific and Islamic epistemology contexts).  _Use case:_ Users apply a structured framework to any claim they encounter, guided step-by-step.  (`src/app/critical-thinking/page.tsx`)
- **Domain-Specific Guiding Questions** — Each step includes 3 contextual questions that span secular (sample size, RCT) and Islamic (isnad chain, PRISMA) criteria simultaneously.  _Use case:_ Users who encounter claims in either scientific or religious contexts apply the same rigor.  (`src/app/critical-thinking/page.tsx`)

---

## curriculum — `/curriculum`
`src/app/curriculum/page.tsx`

- **5-Phase Curriculum Overview** — Displays the full Sovereign Curriculum roadmap: Phase 0 (Calibration, 14 days), Phase 1 (Cognitive Armor, 30 days), Phase 2 (Deep Verification, 30 days), Phase 3 (Islamic Shield, 30 days), Phase 4 (Live Defense, 30 days) with descriptions and links.  _Use case:_ Learners understand the complete program structure and navigate to any phase.  (`src/app/curriculum/page.tsx`)
- **Key Metrics Summary** — Shows ~42 guided days, 33 science exercises, 5 phases, 5 validated scales.  _Use case:_ Administrators and funders see the program scope at a glance.  (`src/app/curriculum/page.tsx`)

---

## curriculum/phase0 — `/curriculum/phase0`
`src/app/curriculum/phase0/page.tsx`

- **28-Day Phase 0 Exercise Calendar** — Grid of 28 days each labeled with its specific exercise name, Arabic translation, exercise type (Assessment/Calibration/Forensics/etc.) and completion status from progress service.  _Use case:_ Learners track their daily progress through the 4-week Calibration phase.  (`src/app/curriculum/phase0/page.tsx`)
- **Progress Sync** — Reads `getProgress()` from `progress-service` to mark completed days.  _Use case:_ Returning users see their actual completion state without re-entering data.  (`src/app/curriculum/phase0/page.tsx`)

---

## curriculum/phase1 — `/curriculum/phase1`
`src/app/curriculum/phase1/page.tsx`

- **Phase 1 Mental Health Myth Card Exercises** — Loads Mental Health cards (MHCard array) and presents Cognitive Armor exercises (CBI, fallacy engine, 6-layer verification).  _Use case:_ Learners complete the Cognitive Armor phase to build mental-health literacy and manipulation resistance.  (`src/app/curriculum/phase1/page.tsx`)
- **ScenarioResponsePlayer** — Uses the `ScenarioResponsePlayer` component for interactive scenario-based exercises.  _Use case:_ Learners respond to real-world scenarios testing their ability to recognize manipulation.  (`src/app/curriculum/phase1/page.tsx`)

---

## curriculum/phase2 — `/curriculum/phase2`
`src/app/curriculum/phase2/page.tsx`

- **Science Exercise Browser** — Loads exercises from `SCIENCE_EXERCISES` dataset with difficulty filter (all/beginner/intermediate/advanced), difficulty labels, and colored badges.  _Use case:_ Learners work through the Deep Verification phase covering DeepReal forensics, OSINT, paper auditing, and statistical power.  (`src/app/curriculum/phase2/page.tsx`)
- **Statistical Concept Detail** — Each science exercise includes a `statisticalConcept` definition displayed to the learner.  _Use case:_ Learners understand the statistical principle underpinning each verification exercise.  (`src/app/curriculum/phase2/page.tsx`)

---

## curriculum/phase3 — `/curriculum/phase3`
`src/app/curriculum/phase3/page.tsx`

- **Islamic Shield Module Browser** — 4 weeks of modules (Foundations of Islamic Epistemology, Hadith Authentication Science, Quranic Context & Misquotation, and more) with tool links, Islamic references, difficulty, and exercise counts.  _Use case:_ Learners complete the Islamic Shield phase to resist religious misinformation.  (`src/app/curriculum/phase3/page.tsx`)
- **Classical Reference Integration** — Each module cites a specific classical Islamic text (e.g., al-Shafi'i's Risala, Ibn Hajar's Taqrib al-Tahdhib) as its scholarly anchor.  _Use case:_ Islamic studies educators verify the curriculum's grounding in classical scholarship.  (`src/app/curriculum/phase3/page.tsx`)

---

## curriculum/phase4 — `/curriculum/phase4`
`src/app/curriculum/phase4/page.tsx`

- **Live Defense Capstone Challenges** — Expert-level capstone challenges: Sovereign Boss-Fight (debunk 20 real claims in 60 min), Threat Map Operations (OSINT investigation of live Egyptian misinformation), Community Defense Mission, and others.  _Use case:_ Learners prove cognitive sovereignty by applying all skills in live, timed, real-world scenarios.  (`src/app/curriculum/phase4/page.tsx`)
- **Badge & Milestone System** — Completing challenges unlocks named badges (Fact Warrior, Intelligence Analyst) and grants access to next phase.  _Use case:_ Motivates completion and serves as credentialing evidence.  (`src/app/curriculum/phase4/page.tsx`)

---

## dashboard/cohort — `/dashboard/cohort`
`src/app/dashboard/cohort/page.tsx`

- **Cohort Efficacy Dashboard** — Calls `/api/efficacy` to retrieve pre/post MIST-20 paired scores; displays mean delta, Cohen's dz effect size, 95% CI, and gullibility delta.  _Use case:_ Researchers present the one citable efficacy claim: does EAL make participants measurably harder to fool?  (`src/app/dashboard/cohort/page.tsx`)
- **Distrust Drift Flag** — Displays a flag if real-news bias delta indicates the training caused unhealthy over-distrust of legitimate news.  _Use case:_ Researchers monitor the study's key adverse outcome risk and flag it honestly.  (`src/app/dashboard/cohort/page.tsx`)
- **Caveats Section** — Lists statistical caveats from the API response.  _Use case:_ Ensures the efficacy claim is presented with appropriate limitations.  (`src/app/dashboard/cohort/page.tsx`)

---

## dashboard — `/dashboard`
`src/app/dashboard/page.tsx`

- **Personal Progress Dashboard** — Reads user progress and shows completed days, current day, today's time-on-task, MVP completion breakdown (DeepReal/Mental Health/Religion Hub), and assessment completion status.  _Use case:_ Learners monitor their overall program progress and navigate to the next recommended activity.  (`src/app/dashboard/page.tsx`)
- **Area / Bar Charts** — Uses Recharts to plot progress over time and per-MVP completion.  _Use case:_ Visual learners track their engagement trajectory.  (`src/app/dashboard/page.tsx`)
- **Confidence Shift Tracker** — Shows `getAverageConfidenceShift()` — the change in self-reported confidence pre/post exercises.  _Use case:_ Measures whether training is increasing appropriate confidence.  (`src/app/dashboard/page.tsx`)
- **Source Click Stats** — `getSourceClickStats()` tracks how often users actually click through to cited sources.  _Use case:_ Behavioral measure of engagement with evidence beyond surface verdicts.  (`src/app/dashboard/page.tsx`)
- **Research Data Export** — Calls `generateResearchCSV()`/`generateResearchJSON()` to produce exportable per-participant data files.  _Use case:_ Researchers export individual participant records for analysis.  (`src/app/dashboard/page.tsx`)
- **Printable Awareness Report** — `buildPrintableReportHtml()` generates a formatted HTML report of the user's awareness journey.  _Use case:_ Users print or submit evidence of program completion to institutions.  (`src/app/dashboard/page.tsx`)
- **Shareable Report Link** — `createShareableReportLink()` creates a URL for sharing the user's progress report.  _Use case:_ Users share results with supervisors or peers.  (`src/app/dashboard/page.tsx`)
- **Admin Mode** — `isAdmin()` check reveals additional controls for admin users.  _Use case:_ Platform administrators access cohort-level analytics and management.  (`src/app/dashboard/page.tsx`)
- **Source Freshness Report** — `generateFreshnessReport()` checks whether cited sources are still current.  _Use case:_ Editors are alerted when platform citations become outdated.  (`src/app/dashboard/page.tsx`)
- **COM-B Profile Summary** — `getComBProfile()` provides the behavioral change model breakdown on the dashboard.  _Use case:_ Learners see their COM-B profile alongside raw progress metrics.  (`src/app/dashboard/page.tsx`)

---

## debate-sim — `/debate-sim`
`src/app/debate-sim/page.tsx`

- **Socratic Devil's Advocate Debate** — User presents a claim; the AI counters with a logical fallacy secretly embedded in its response; user attempts to identify the fallacy used.  _Use case:_ Learners practice spotting logical fallacies under the pressure of a realistic adversarial debate.  (`src/app/debate-sim/page.tsx`)
- **Fallacy Label Reveal** — After the AI response, the `fallacyUsed` field is displayed on the AI message card.  _Use case:_ Learners confirm whether they correctly identified the fallacy after each exchange.  (`src/app/debate-sim/page.tsx`)
- **Bilingual Interface** — All AI and user messages displayed with Arabic/English toggle support.  _Use case:_ Arabic-speaking learners practice in their native language.  (`src/app/debate-sim/page.tsx`)

---

## deepreal-forensics — `/deepreal-forensics`
`src/app/deepreal-forensics/page.tsx`

- **Real Image Authentication** — Upload an image; system calls `/api/defense/deepreal/analyze` to extract real EXIF metadata (exifr library), run Sightengine deepfake detection, and return a verdict (AUTHENTIC/LIKELY_FAKE/SUSPICIOUS/INCONCLUSIVE).  _Use case:_ Users verify whether an image they received is authentic or AI-generated/manipulated.  (`src/app/deepreal-forensics/page.tsx`)
- **EXIF Metadata Display** — Shows extracted EXIF fields: camera make/model, software, date taken, GPS coordinates.  _Use case:_ Users see provenance signals embedded in the image file itself.  (`src/app/deepreal-forensics/page.tsx`)
- **Metadata Signals List** — Human-readable interpretation of EXIF signals (e.g., "no GPS data — cannot confirm location").  _Use case:_ Non-technical users understand what the metadata means for authenticity.  (`src/app/deepreal-forensics/page.tsx`)
- **AI Intelligence Verdict** — Bilingual (EN/AR) explanation of the verdict with confidence level, action items, and risk level.  _Use case:_ Users receive an actionable summary of what to do with the finding.  (`src/app/deepreal-forensics/page.tsx`)

---

## deepreal-upload — `/deepreal-upload`
`src/app/deepreal-upload/page.tsx`

- **Multi-Format Upload Queue** — Drag-and-drop or click upload for JPG, PNG, MP4, WAV, and PDF files; each queued file shows animated progress bar and final result with confidence score.  _Use case:_ Users batch-upload multiple media files for forensic analysis.  (`src/app/deepreal-upload/page.tsx`)
- **Per-File Analysis Status** — Each file transitions through states (queued → analyzing → complete/error) with animated progress.  _Use case:_ Users monitor multiple concurrent file analyses in one view.  (`src/app/deepreal-upload/page.tsx`)

---

## deepreal/exercise/[day] — `/deepreal/exercise/[day]`
`src/app/deepreal/exercise/[day]/page.tsx`

- **14-Day DeepReal Exercise Engine** — Dynamic route loading one of 14 validated JSON exercise files (day-01 through day-14) into the shared `ExerciseEngine` component; records completion via `recordExerciseCompletion` and syncs to participant snapshot.  _Use case:_ Learners complete each daily DeepReal exercise in sequence, with progress tracked for research outcomes.  (`src/app/deepreal/exercise/[day]/page.tsx`)
- **Research Snapshot Sync** — On completion calls `syncCurrentParticipantSnapshot()` to update the research data record.  _Use case:_ Each exercise completion event is captured for the pre/post efficacy study.  (`src/app/deepreal/exercise/[day]/page.tsx`)

---

## deepreal/game — `/deepreal/game`
`src/app/deepreal/game/page.tsx`

- **DeepReal Inoculation Game** — Mounts `DeepRealGameArena` component driven by `/api/science/game`; the inoculation game that exposes players to manipulation techniques in a safe game setting.  _Use case:_ Learners build manipulation immunity through gamified practice rather than direct instruction.  (`src/app/deepreal/game/page.tsx`)

---

## deepreal — `/deepreal`
`src/app/deepreal/page.tsx`

- **DeepReal Command Center** — Hub page with 4 tool cards linking to Image Forensics, Video Analysis, Audio Check, and C2PA Verification.  _Use case:_ Users navigate to the appropriate media type forensics tool from one central interface.  (`src/app/deepreal/page.tsx`)
- **Drag-and-Drop File Entry** — Drag files onto the page to begin analysis; dropped filenames queued.  _Use case:_ Quick entry for users who already have the suspicious file ready.  (`src/app/deepreal/page.tsx`)

---

## defense-main-plan — `/defense-main-plan`
`src/app/defense-main-plan/page.tsx`

- **10-Part Defense Command Center** — Static navigation hub with 10 parts covering demo pages, failing/weak page diagnosis, resilience strategy, live-defense scripts, API status, research outcomes, etc.  _Use case:_ Project team prepares for academic or investor defense presentation.  (`src/app/defense-main-plan/page.tsx`)
- **PartNavigation Component** — `PartNavigation` renders quick-jump links between the 10 defense sections.  _Use case:_ Presenter navigates between defense preparation materials during the presentation.  (`src/app/defense-main-plan/page.tsx`)

---

## defense-pages-map — `/defense-pages-map`
`src/app/defense-pages-map/page.tsx`

- **Platform Tool Map by Category** — Grouped directory of all platform tools across 6 categories (Verification & Forensics, DeepReal & Media, Cognitive Training, Islamic Defense, Mental Health, and more) with link, name, and one-line description.  _Use case:_ Presenters and users quickly find any tool by category during a live demo.  (`src/app/defense-pages-map/page.tsx`)
- **Bilingual Category Headers** — Each category has an Arabic and English header.  _Use case:_ Arabic-speaking evaluators navigate the map in their language.  (`src/app/defense-pages-map/page.tsx`)

---

## defense-qa — `/defense-qa`
`src/app/defense-qa/page.tsx`

- **Expected Q&A Tab** — Accordion list of expected committee questions and model answers loaded from `QA_ITEMS` data, in Arabic.  _Use case:_ Students prepare for academic project defense by reviewing anticipated questions.  (`src/app/defense-qa/page.tsx`)
- **Presentation Script Tab** — Full bilingual presentation script from `VISUAL_MAP` data.  _Use case:_ Presenter reads or reviews the structured delivery script.  (`src/app/defense-qa/page.tsx`)
- **Eight Theories Tab** — Lists the 8 scientific theories underpinning the platform from `THEORIES` data.  _Use case:_ Students memorize and explain the theoretical framework to the committee.  (`src/app/defense-qa/page.tsx`)
- **Visual Map Tab** — Renders a visual overview map of the project.  _Use case:_ Presenter can display or point to this during the oral defense.  (`src/app/defense-qa/page.tsx`)

---

## defense-test — `/defense-test`
`src/app/defense-test/page.tsx`

- **12-Question Defense Preparation Quiz** — 5 (and more) multiple-choice questions covering SIFT, FLICC, ELA image forensics, ad hominem, bandwagon effect, and other platform topics; shows score and explanations on completion.  _Use case:_ Students self-test before the academic defense to confirm they can answer technical questions.  (`src/app/defense-test/page.tsx`)
- **Scored with Explanatory Feedback** — Correct answer revealed with a detailed cited explanation (SIFT/Wineburg 2019, FLICC Cook 2020, DSM-5, etc.) after each question.  _Use case:_ Students learn from wrong answers before the actual defense.  (`src/app/defense-test/page.tsx`)

---

## demo — `/demo`
`src/app/demo/page.tsx`

- **Cognitive Fortress Dashboard Demo** — Integrated demo combining `SourcePyramid3D` (three.js), `FortressTour` onboarding overlay, `MaqasidReasoningCheck`, and animated `CalmReveal` components.  _Use case:_ A single showcase page for presenting the platform's key interactive components to judges or new users.  (`src/app/demo/page.tsx`)
- **Maqasid Impact Analysis** — Shows `MaqasidReasoningCheck` analyzing a real-world ruqyah/exorcism fraud example against the 5 Maqasid al-Shariah objectives (Nafs, Mal, Din) with harm/benefit labeling.  _Use case:_ Demonstrates how the platform applies Islamic jurisprudence to evaluate harmful practices.  (`src/app/demo/page.tsx`)
- **3D Source Pyramid** — `SourcePyramid3D` renders an interactive three.js pyramid of evidence hierarchy.  _Use case:_ Visual learners and presentation audiences see the evidence hierarchy in 3D.  (`src/app/demo/page.tsx`)
- **Fortress Onboarding Tour** — `FortressTour` guides first-time users through the platform's key sections.  _Use case:_ New users get an oriented walkthrough of the "Cognitive Fortress" metaphor.  (`src/app/demo/page.tsx`)

---

*End of pages-1 slice (44 files, 104 features)*
