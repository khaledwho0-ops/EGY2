export type Domain = "scientific" | "islamic" | "both";

export interface CognitiveBias {
  id: string;
  name: string;
  description: string;
  scientificApplication: string;
  islamicApplication: string;
  detectionMethod: string;
}

export interface DetectedBias {
  bias: CognitiveBias;
  confidence: number; // 0-1
  evidence: string; // what in the text triggered this
  evidenceAr: string; // Arabic version
}

export const COGNITIVE_BIASES: CognitiveBias[] = [
  {
    id: "E1",
    name: "Confirmation Bias",
    description: "The tendency to search for, interpret, favor, and recall information in a way that confirms or supports one's prior beliefs or values.",
    scientificApplication: "User only searches for papers supporting their view, ignoring contradictory evidence.",
    islamicApplication: "User only quotes verses supporting their position, ignoring abrogating or contextual verses.",
    detectionMethod: "Track search patterns in session. Look for leading questions."
  },
  {
    id: "E2",
    name: "Dunning-Kruger Effect",
    description: "A cognitive bias in which people with low ability at a task overestimate their ability.",
    scientificApplication: "Non-expert makes expert claims about complex epidemiology.",
    islamicApplication: "Unqualified person issues a fatwa or sweeping ruling.",
    detectionMethod: "Check claim complexity vs user profile/expertise."
  },
  {
    id: "E3",
    name: "Anchoring Effect",
    description: "Relying too heavily on an initial piece of information offered (the 'anchor') when making decisions.",
    scientificApplication: "First number or statistic seen dominates judgment.",
    islamicApplication: "First hadith heard becomes the 'absolute truth' despite context.",
    detectionMethod: "Detect if first-cited source completely dominates the user's argument."
  },
  {
    id: "E4",
    name: "Availability Heuristic",
    description: "A mental shortcut that relies on immediate examples that come to a given person's mind.",
    scientificApplication: "Judging disease prevalence based on recent news stories rather than statistics.",
    islamicApplication: "Judging the state of the Ummah based on trending Twitter hashtags.",
    detectionMethod: "Flag emotional keywords tied to recent events used as broad evidence."
  },
  {
    id: "E5",
    name: "Bandwagon Effect",
    description: "The tendency to do (or believe) things because many other people do (or believe) the same.",
    scientificApplication: "Believing a claim because 'millions use this alternative medicine.'",
    islamicApplication: "Following a ruling because a specific Sheikh has 5 million followers on YouTube.",
    detectionMethod: "Look for 'everyone knows', 'millions of people', 'viral'."
  },
  {
    id: "E6",
    name: "Authority Bias",
    description: "The tendency to attribute greater accuracy to the opinion of an authority figure and be more influenced by that opinion.",
    scientificApplication: "Believing a Nobel Laureate speaking completely outside their field of study.",
    islamicApplication: "Believing a charismatic leader's personal political opinion is divinely mandated.",
    detectionMethod: "Detect 'Dr. X said', 'Sheikh Y said' without accompanying evidence citations."
  },
  {
    id: "E7",
    name: "Backfire Effect",
    description: "When people react to disconfirming evidence by strengthening their previous beliefs.",
    scientificApplication: "Correcting a belief makes the user double down on it.",
    islamicApplication: "Correcting a religious misunderstanding causes intense defensiveness.",
    detectionMethod: "Detect highly defensive or aggressive query patterns after being corrected."
  },
  {
    id: "E8",
    name: "Illusory Correlation",
    description: "Perceiving a relationship between variables even when no such relationship exists.",
    scientificApplication: "Seeing patterns in random health data or unrelated events.",
    islamicApplication: "'I prayed and the rain came, therefore my prayer directly caused the rain today.'",
    detectionMethod: "Statistical independence check on causal claims."
  },
  {
    id: "E9",
    name: "Framing Effect",
    description: "Drawing different conclusions from the same information, depending on how that information is presented.",
    scientificApplication: "'90% survival' vs '10% mortality' — same data, different reactions.",
    islamicApplication: "'Jihad means holy war' vs 'Jihad means struggle' — same word, manipulated framing.",
    detectionMethod: "Detect emotional framing and loaded words in text."
  },
  {
    id: "E10",
    name: "Sunk Cost Fallacy",
    description: "Continuing a behavior or endeavor as a result of previously invested resources (time, money, or effort).",
    scientificApplication: "'I've been doing this treatment for years, I can't stop now.'",
    islamicApplication: "'I've followed this sheikh for 20 years, I can't admit he is wrong.'",
    detectionMethod: "Detect investment-based reasoning in user queries."
  },
  {
    id: "E11",
    name: "Halo Effect",
    description: "The tendency for positive impressions of a person, company, brand or product in one area to positively influence one's opinion or feelings in other areas.",
    scientificApplication: "Attractive or confident doctor is seen as more trustworthy.",
    islamicApplication: "Charismatic preacher is seen as more authoritative.",
    detectionMethod: "Detect charisma-based or purely aesthetic authority claims."
  },
  {
    id: "E12",
    name: "Normalcy Bias",
    description: "The refusal to plan for, or react to, a disaster which has never happened before.",
    scientificApplication: "'It won't happen to me' — ignoring obvious health risks.",
    islamicApplication: "'Our community is fine' — ignoring signs of radicalization.",
    detectionMethod: "Detect minimization language in the face of strong evidence."
  },
  {
    id: "E13",
    name: "In-Group Bias",
    description: "The tendency for people to give preferential treatment to others they perceive to be members of their own groups.",
    scientificApplication: "'Our nation's researchers are better than theirs.'",
    islamicApplication: "'Our Madhab/Sect is the only correct one, the rest are entirely wrong.'",
    detectionMethod: "Detect tribalistic language patterns ('us' vs 'them')."
  },
  {
    id: "E14",
    name: "Peak-End Rule",
    description: "People judge an experience largely based on how they felt at its peak (i.e., its most intense point) and at its end, rather than based on the total sum or average of every moment of the experience.",
    scientificApplication: "Judging a study by its exciting conclusion, ignoring the flawed methodology.",
    islamicApplication: "Judging a sermon by its emotional ending, ignoring the weak hadiths used.",
    detectionMethod: "Detect conclusion-only citing without methodological reference."
  },
  {
    id: "E15",
    name: "Mere Exposure Effect",
    description: "The tendency to express undue liking for things merely because of familiarity with them.",
    scientificApplication: "A repeated claim feels true just because it is heard often.",
    islamicApplication: "A repeatedly quoted verse without context feels absolute.",
    detectionMethod: "Track repetition frequency of unverified claims."
  }
];
