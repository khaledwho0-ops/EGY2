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
