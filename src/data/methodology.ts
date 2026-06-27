export interface MethodologyMetadata { // 1
  databasesSearched: string[]; // 2
  representativeBooleanStrings: string[]; // 3
  crossValidationRules: string; // 4
  extractionTimestamp: string; // 5
  comparativeIllustrativeTable: { // 6
    block: string; // 7
    competitors: { name: string; budgetOrMetric: string; reach: string }[]; // 8
  }[]; // 9
} // 10

export const globalMethodology: MethodologyMetadata = { // 11
  databasesSearched: [ // 12
    'WHO publications repository', // 1
    'FDA budget justifications', // 2
    'Nature Index Global Database', // 3
    'OpenAlex', // 4
    'Scopus', // 5
    'Charity Navigator', // 6
    'Guidestar', // 7
    'Annual reports' // 8
  ], // 9
  representativeBooleanStrings: [ // 10
    '("World Health Organization" OR WHO) AND (budget OR funding) AND (2024 OR 2025)' // 11
  ], // 12
  crossValidationRules: 'Every metric required two independent sources (e.g., official budget document + third-party audit/press reporting). In cases of conflict, the more conservative lower-bound figure was utilized.', // 1
  extractionTimestamp: 'live search executed 2026-06-07 UTC', // 2
  comparativeIllustrativeTable: [ // 3
    { // 4
      block: 'Block 1 (Regulatory)', // 5
      competitors: [ // 6
        { name: 'WHO', budgetOrMetric: '6.83B', reach: '194 states' }, // 7
        { name: 'FDA', budgetOrMetric: '6.72B', reach: 'USA' }, // 8
        { name: 'EMA', budgetOrMetric: '€458M', reach: 'EU27' } // 9
      ] // 10
    } // 11
  ] // 12
}; // 1

export interface Block1Weighting { // 2
  verifiedBudgetWeight: 0.40; // 3
  jurisdictionalReachWeight: 0.30; // 4
  staffHeadcountWeight: 0.20; // 5
  longevityWeight: 0.10; // 6
} // 7

export interface Block2Weighting { // 8
  natureIndexShareWeight: 0.40; // 9
  nobelLaureateCountWeight: 0.30; // 10
  annualResearchBudgetWeight: 0.20; // 11
  institutionalAgeGrowthWeight: 0.10; // 12
} // 1

export interface Block3Weighting { // 2
  monthlyActiveLearnersWeight: 0.35; // 3
  countriesReachedWeight: 0.20; // 4
  languagesSupportedWeight: 0.15; // 5
  peerReviewedEffectSizeWeight: 0.30; // 6
} // 7
