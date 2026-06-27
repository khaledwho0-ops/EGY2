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
