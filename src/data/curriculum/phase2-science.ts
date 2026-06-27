import { CurriculumPhase } from './phase0-calibration'; // 1

export const phase2Science: CurriculumPhase = { // 2
  phaseId: 'phase-2', // 3
  phaseName: 'PHASE 2: SCIENTIFIC & MEDICAL LITERACY', // 4
  phaseObjective: 'Equip the learner with structural defense mechanisms against pseudoscientific manipulation and medical disinformation.', // 5
  weeks: [ // 6
    { // 7
      weekNumber: 9, // 8
      title: 'The Anatomy of a Medical Study', // 9
      objective: 'Understand peer review, sample sizes, and p-hacking.', // 10
      coreMechanic: 'Interactive p-hacking simulator to demonstrate how data can be tortured to confess anything.', // 11
      assessmentType: 'Methodology flaw identification' // 12
    }, // 1
    { // 2
      weekNumber: 10, // 3
      title: 'The Evidence Pyramid', // 4
      objective: 'Differentiate between low-tier evidence (case studies/anecdotes) and high-tier evidence (Systematic RCTs).', // 5
      coreMechanic: 'Evidence-sorting drag-and-drop hierarchy game.', // 6
      assessmentType: 'Evidence weighting test' // 7
    }, // 8
    { // 9
      weekNumber: 11, // 10
      title: 'The 100 Scientific Fallacies Engine (Part 1)', // 11
      objective: 'Taxonomy of basic scientific errors (e.g., appeal to nature, chemical phobia).', // 12
      coreMechanic: 'Fallacy-Engine sorting game using the scientific registry.', // 1
      assessmentType: 'Rapid-fire fallacy identification' // 2
    }, // 3
    { // 4
      weekNumber: 12, // 5
      title: 'The 100 Scientific Fallacies Engine (Part 2)', // 6
      objective: 'Advanced systemic errors (e.g., base-rate neglect in epidemiology, survivorship bias).', // 7
      coreMechanic: 'Deconstruct a synthetic alternative-medicine pitch using the 100-registry.', // 8
      assessmentType: 'Pitch autopsy' // 9
    }, // 10
    { // 11
      weekNumber: 13, // 12
      title: 'Paper-Auditor Matrix', // 1
      objective: 'Dissecting retracted COVID/Vaccine papers and identifying their fatal flaws.', // 2
      coreMechanic: 'Retraction-Watch cross-referencing simulator.', // 3
      assessmentType: 'Retraction audit' // 4
    }, // 5
    { // 6
      weekNumber: 14, // 7
      title: 'Correlation vs. Causation', // 8
      objective: 'Visualize spurious correlations (e.g., ice cream sales and shark attacks).', // 9
      coreMechanic: 'Spurious correlations data simulator.', // 10
      assessmentType: 'Causal inference test' // 11
    } // 12
  ] // 1
}; // 2
