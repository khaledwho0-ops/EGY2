// lib/cognition/flicc.ts — canonical taxonomy, build into the bundle.

export const FLICC = {
  F: {
    code: "F", name: "Fake Experts",
    signatures: ["credential without specialty", "non-peer-reviewed",
                 "credential outside domain", "magnified-minority appeal"],
    counters: ["lateral_reading", "credential_lookup", "consensus_check"],
  },
  L: {
    code: "L", name: "Logical Fallacies",
    children: {
      AD_HOMINEM: { name: "Ad Hominem", probe: "Does this attack the person or the claim?" },
      STRAWMAN: { name: "Strawman", probe: "Did they re-state the opponent's position fairly?" },
      FALSE_DICHOTOMY: { name: "False Dichotomy", probe: "Are there really only two options?" },
      RED_HERRING: { name: "Red Herring", probe: "Is this relevant to the original claim?" },
      SINGLE_CAUSE: { name: "Oversimplification", probe: "Is this attributing complex to one cause?" },
      MISREPRESENTATION: { name: "Misrepresentation", probe: "Is the evidence faithfully shown?" },
      // ... ~30 entries total
    },
  },
  I: { code: "I", name: "Impossible Expectations",
       probe: "Is the demand achievable for any real evidence?" },
  C: { code: "C", name: "Cherry-Picking",
       probe: "Is the full dataset being shown, or only the favorable slice?" },
  Conspiracy: { code: "Cn", name: "Conspiracy Theories",
                signatures: ["unfalsifiable", "nefarious intent", "self-sealing"] },
} as const;

export const SIFT = [
  { key: "STOP", name: "Stop",
    promptEN: "Pause. What is your emotion in the last 3 seconds?",
    promptAR: "توقف. ما هو شعورك في الثلاث ثوانٍ الأخيرة؟" },
  { key: "INVESTIGATE", name: "Investigate the Source",
    action: "open_lateral_tab" },
  { key: "FIND", name: "Find Better Coverage",
    action: "search_independent_outlets" },
  { key: "TRACE", name: "Trace Claims to Original",
    action: "follow_provenance_chain" },
] as const;
