export type Domain = 'scientific' | 'islamic' | 'both';

export interface Fallacy {
  id: string;
  name: string;
  description: string;
  domain: Domain;
  example: string;
}

export interface DetectedFallacy {
  fallacy: Fallacy;
  confidence: number; // 0-1
  matchedPattern: string; // what triggered the match
  tier: 'regex' | 'tfidf' | 'nlp' | 'gemini'; // which technology detected it
}

export const SCIENTIFIC_FALLACIES: Fallacy[] = [
  { id: "F1", name: "Post Hoc Ergo Propter Hoc", description: "Assuming that because B comes after A, A caused B.", domain: "scientific", example: "I took vitamin X, then I healed, therefore X cured me" },
  { id: "F2", name: "Cherry-Picking (Texas Sharpshooter)", description: "Selecting only data that confirms the hypothesis, hiding contradicting data.", domain: "scientific", example: "'5 studies say X' (hiding 50 that don't)" },
  { id: "F3", name: "Appeal to Nature", description: "Arguing that something is good or safe because it is natural.", domain: "scientific", example: "Herbal medicine is better because it's natural" },
  { id: "F4", name: "Appeal to Authority", description: "Using a title or PhD instead of empirical evidence.", domain: "scientific", example: "Dr. X on TV said it, so it's true (without peer review)" },
  { id: "F5", name: "P-Hacking / Data Dredging", description: "Running multiple tests until p < 0.05 is achieved by chance.", domain: "scientific", example: "Clusters of p-values exactly near 0.049" },
  { id: "F6", name: "Survivorship Bias", description: "Looking only at successes, ignoring the failures.", domain: "scientific", example: "Steve Jobs dropped out and succeeded" },
  { id: "F7", name: "Ecological Fallacy", description: "Applying group-level statistics to individuals.", domain: "scientific", example: "Country X has high IQ therefore person Y from Country X is smart" },
  { id: "F8", name: "Simpson's Paradox", description: "A trend appears in different groups of data but disappears or reverses when combined.", domain: "scientific", example: "Treatment works in men AND women separately but 'fails' when combined" },
  { id: "F9", name: "Base Rate Neglect", description: "Ignoring the overall prevalence of a condition when evaluating test results.", domain: "scientific", example: "99% accurate test on a 1-in-a-million rare disease" },
  { id: "F10", name: "False Equivalence", description: "Treating two unequal evidence bases as equally valid.", domain: "scientific", example: "Giving equal airtime to flat earthers and astrophysicists" },
  { id: "F11", name: "Nirvana Fallacy", description: "Rejecting a good solution because it is not perfect.", domain: "scientific", example: "Vaccines aren't 100% effective, so don't take them" },
  { id: "F12", name: "Correlation Illusion", description: "Seeing causal patterns in random or unrelated data.", domain: "scientific", example: "Since I started praying, the stock market went up" },
  { id: "F13", name: "Regression to the Mean", description: "Extreme values naturally regressing to average over time, mistaken for treatment effect.", domain: "scientific", example: "I felt terrible, tried X, now feel normal (was going to anyway)" },
  { id: "F14", name: "Publication Bias", description: "The tendency to only publish positive results.", domain: "scientific", example: "The 'File Drawer' problem" },
  { id: "F15", name: "Genetic Fallacy", description: "Judging a claim by its origin rather than its content.", domain: "scientific", example: "That research comes from China so it's fake" },
  { id: "F16", name: "Appeal to Novelty", description: "Assuming something is better simply because it is new.", domain: "scientific", example: "The latest supplement breakthrough" },
  { id: "F17", name: "Sunk Cost Fallacy", description: "Continuing a course of action because of past investment, not merit.", domain: "scientific", example: "I've been taking this for years, can't stop now" },
  { id: "F18", name: "Dunning-Kruger in Claims", description: "A low-expertise individual making expert-level assertions.", domain: "scientific", example: "Facebook user 'debunks' peer-reviewed paper" },
  { id: "F19", name: "Anecdotal Evidence", description: "Using a single story to override statistical data.", domain: "scientific", example: "My uncle smoked and lived to 90" },
  { id: "F20", name: "Moving the Goalposts", description: "Changing criteria when the original claim is disproven.", domain: "scientific", example: "OK the earth isn't flat, but the moon landing was fake" },
  { id: "F21", name: "Slippery Slope", description: "Asserting A inevitably leads to Z without proving intermediate steps.", domain: "scientific", example: "If we allow X, society will collapse" },
  { id: "F22", name: "Straw Man", description: "Misrepresenting an opponent's position to easily attack it.", domain: "scientific", example: "Scientists say humans came from monkeys" },
  { id: "F23", name: "Ad Hominem", description: "Attacking the person instead of the argument.", domain: "scientific", example: "He's funded by pharma, so his data is wrong (without checking data)" },
  { id: "F24", name: "Bandwagon", description: "Believing something because many others do.", domain: "scientific", example: "Millions use homeopathy" },
  { id: "F25", name: "False Dilemma", description: "Presenting only 2 options when more exist.", domain: "scientific", example: "Either you trust science or you trust God" }
];

export const ISLAMIC_FALLACIES: Fallacy[] = [
  { id: "IF1", name: "Tahrif (Semantic Distortion)", description: "Twisting the Arabic meaning of a word to change a ruling.", domain: "islamic", example: "Redefining 'Qiwamah' as tyranny" },
  { id: "IF2", name: "Context Stripping (Asbab al-Nuzul removal)", description: "Quoting a verse without its specific historical revelation context.", domain: "islamic", example: "Quoting sword verses without mentioning the treaty breach" },
  { id: "IF3", name: "Unauthorized Takfir", description: "Declaring Muslims as disbelievers without scholarly authority.", domain: "islamic", example: "If you do X, you're no longer Muslim" },
  { id: "IF4", name: "Madhab Shopping (Talfiq)", description: "Cherry-picking the strictest or loosest opinion across different schools.", domain: "islamic", example: "Taking the harshest view of each topic from different Madhabs" },
  { id: "IF5", name: "Abrogation Fraud (Nasikh/Mansukh)", description: "Citing abrogated rulings as current binding law.", domain: "islamic", example: "Using a cancelled ruling to justify a modern practice" },
  { id: "IF6", name: "Fabricated Hadith Citation", description: "Using known fabricated (Mawdu') narrations as evidence.", domain: "islamic", example: "Mawdu' hadith presented as Sahih" },
  { id: "IF7", name: "Weak Hadith as Legislation", description: "Using Da'if hadith for binding legal rulings (Ahkam).", domain: "islamic", example: "Weak narration used to obligate a practice" },
  { id: "IF8", name: "Scholarly Cosplay", description: "An unqualified person issuing fatwas.", domain: "islamic", example: "YouTuber without Ijazah giving religious rulings" },
  { id: "IF9", name: "Cultural Masking (Urf as Shariah)", description: "Disguising a local cultural custom as divine Islamic law.", domain: "islamic", example: "'Women can't drive' = culture, not Islam" },
  { id: "IF10", name: "Selective Compassion", description: "Showing mercy in one area while being brutal in another.", domain: "islamic", example: "'Islam is peace' while justifying honor killings" },
  { id: "IF11", name: "Historical Anachronism", description: "Applying a past-context ruling directly to a modern situation.", domain: "islamic", example: "7th-century warfare ruling applied to a neighbor" },
  { id: "IF12", name: "Forced Concordism", description: "Forcing the Quran to 'predict' modern science.", domain: "islamic", example: "The Quran described embryology before science (forced reading)" },
  { id: "IF13", name: "Spiritual Gaslighting", description: "Using faith to deny legitimate medical or psychological needs.", domain: "islamic", example: "'Just pray more' for clinical depression" },
  { id: "IF14", name: "Weaponized Birr al-Walidayn", description: "Using parental obedience to justify abuse.", domain: "islamic", example: "Parents stealing an adult child's salary 'because Islam'" },
  { id: "IF15", name: "Emotional Blackmail via Afterlife", description: "Using hellfire threats to control behavior arbitrarily.", domain: "islamic", example: "If you don't obey me, you'll go to hell" },
  { id: "IF16", name: "Ijma Fraud", description: "Claiming scholarly consensus where none actually exists.", domain: "islamic", example: "'All scholars agree' when there is valid difference of opinion" },
  { id: "IF17", name: "Qiyas Corruption", description: "Invalid analogical reasoning.", domain: "islamic", example: "False analogy between two unrelated cases" },
  { id: "IF18", name: "Maqasid Inversion", description: "Using the objectives of Shariah to justify their opposite.", domain: "islamic", example: "'Preserving religion' used to destroy intellect or life" },
  { id: "IF19", name: "Takfir by Implication", description: "Indirect excommunication through loaded questions.", domain: "islamic", example: "'Are you saying you know better than Allah?'" },
  { id: "IF20", name: "Decontextualized Ijma", description: "Using historical consensus without acknowledging changed conditions.", domain: "islamic", example: "Medieval market ruling applied to modern global finance" },
  { id: "IF21", name: "Bid'ah Weaponization", description: "Labeling any new practice as heresy to maintain control.", domain: "islamic", example: "'Celebrating birthdays is haram bid'ah'" },
  { id: "IF22", name: "Gender Weaponization", description: "Using biology and religion to subjugate.", domain: "islamic", example: "Evo-psych + Quran 4:34 interpreted as 'wife is property'" },
  { id: "IF23", name: "Economic Isolation", description: "Forbidding all modern finance without providing an alternative.", domain: "islamic", example: "All banking is Riba, resulting in financial paralysis" },
  { id: "IF24", name: "Sectarian Othering", description: "Declaring only your specific group is saved.", domain: "islamic", example: "Excluding 90% of Muslims as deviant" },
  { id: "IF25", name: "Authority Transfer", description: "Presenting a Sheikh's personal opinion as God's direct command.", domain: "islamic", example: "'The sheikh said' = 'God said'" }
];

export const ALL_FALLACIES = [...SCIENTIFIC_FALLACIES, ...ISLAMIC_FALLACIES];
