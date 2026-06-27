import { CurriculumPhase } from './phase0-calibration'; // 1

export const phase1Cognition: CurriculumPhase = { // 2
  phaseId: 'phase-1', // 3
  phaseName: 'PHASE 1: FOUNDATIONAL COGNITION', // 4
  phaseObjective: 'Equip the learner with structural defense mechanisms against logical and emotional manipulation.', // 5
  weeks: [ // 6
    { // 7
      weekNumber: 5, // 8
      title: 'The Cognitive Bias Fingerprint', // 9
      objective: 'Map personal vulnerabilities to Confirmation Bias and Dunning-Kruger.', // 10
      coreMechanic: 'Bias-Fingerprint analysis tool matching user statements to known heuristics.', // 11
      assessmentType: 'Bias blind-spot evaluation' // 12
    }, // 1
    { // 2
      weekNumber: 6, // 3
      title: 'The 100 Logical Fallacies Engine (Part 1)', // 4
      objective: 'Taxonomy of informal and formal logical errors.', // 5
      coreMechanic: 'Fallacy-Engine sorting game (Ad Hominem, Strawman, Appeal to Emotion).', // 6
      assessmentType: 'Rapid-fire fallacy identification' // 7
    }, // 8
    { // 9
      weekNumber: 7, // 10
      title: 'The 100 Logical Fallacies Engine (Part 2)', // 11
      objective: 'Advanced systemic manipulation (Gish Gallop, False Equivalence).', // 12
      coreMechanic: 'Deconstruct a synthetic political debate using the 100-registry.', // 1
      assessmentType: 'Debate autopsy' // 2
    }, // 3
    { // 4
      weekNumber: 8, // 5
      title: 'The Socratic Defense', // 6
      objective: 'Asking the right questions instead of giving answers to lower opponent arousal.', // 7
      coreMechanic: 'Socratic dialogue simulator vs AI bot.', // 8
      assessmentType: 'Conversational de-escalation test' // 9
    } // 10
  ] // 11
}; // 12
