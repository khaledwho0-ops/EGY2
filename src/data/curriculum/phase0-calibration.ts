export interface CurriculumWeek { // 1
  weekNumber: number; // 2
  title: string; // 3
  objective: string; // 4
  coreMechanic: string; // 5
  assessmentType: string; // 6
} // 7

export interface CurriculumPhase { // 8
  phaseId: string; // 9
  phaseName: string; // 10
  phaseObjective: string; // 11
  weeks: CurriculumWeek[]; // 12
} // 1

export const phase0Calibration: CurriculumPhase = { // 2
  phaseId: 'phase-0', // 3
  phaseName: 'PHASE 0: PSYCHOLOGICAL CALIBRATION', // 4
  phaseObjective: 'Dismantle pre-existing cognitive resistance before introducing hard institutional or forensic mechanics.', // 5
  weeks: [ // 6
    { // 7
      weekNumber: 1, // 8
      title: 'The Anatomy of an Algorithm', // 9
      objective: 'Deconstruct filter bubbles vs. baseline reality.', // 10
      coreMechanic: 'Social media feed simulator demonstrating algorithmic echo-chamber reinforcement.', // 11
      assessmentType: 'Algorithmic awareness self-audit' // 12
    }, // 1
    { // 2
      weekNumber: 2, // 3
      title: 'Emotional Lexicon Mapping', // 4
      objective: 'Identify personal \'trigger words\' (e.g., \'agenda\', \'elites\', \'sheep\').', // 5
      coreMechanic: 'Covo-Router EIS visualization of user-supplied texts.', // 6
      assessmentType: 'Lexicon sensitivity baseline test' // 7
    }, // 8
    { // 9
      weekNumber: 3, // 10
      title: 'The Illusory Truth Effect', // 11
      objective: 'Demonstrate why repetition creates false validity in human neurology.', // 12
      coreMechanic: 'Reaction-time testing on repeated vs novel statements.', // 1
      assessmentType: 'Truth-latency cognitive test' // 2
    }, // 3
    { // 4
      weekNumber: 4, // 5
      title: 'Base-Rate Primer', // 6
      objective: 'Introduction to numerators without denominators (the foundational statistical fallacy).', // 7
      coreMechanic: 'Visual numerator/denominator builder.', // 8
      assessmentType: 'Base-rate application quiz' // 9
    } // 10
  ] // 11
}; // 12
