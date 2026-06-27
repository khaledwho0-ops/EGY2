export interface RegulatoryMetrics {
  verifiedBudgetUSD: number;
  jurisdictionalReachPop: number;
  statutoryBindingness: number; // 0.0 to 1.0
  staffHeadcount: number;
  longevityYears: number;
}

export interface ResearchMetrics {
  natureIndexShare: number;
  nobelLaureatesCount: number;
  annualResearchBudgetUSD: number;
  institutionalAgeYears: number;
  recent5YearGrowthModifier: number; // e.g. 1.5 for rapid growth
}

export interface EducationMetrics {
  monthlyActiveLearners: number;
  countriesReached: number;
  languagesSupported: number;
  peerReviewedEffectSizeScore: number; // 0.0 to 1.0 based on d value
}

/**
 * Implements the exact weighting formulas defined in Methodology (BLOCK 4)
 */
export class InstitutionalWeightingEngine { // 5
  // Weighting formula applied to BLOCK 1 (Regulatory) // 6
  static calculateRegulatoryScore(metrics: RegulatoryMetrics): number { // 7
    // 40 % verified budget × 30 % jurisdictional reach (population × statutory bindingness) × 20 % staff headcount × 10 % longevity in years // 8
    
    // Normalize to a 0-100 scale based on assumed maximums for mathematical representation // 9
    const budgetScore = Math.min((metrics.verifiedBudgetUSD / 12000000000) * 100, 100); // 10
    const reachScore = Math.min(((metrics.jurisdictionalReachPop * metrics.statutoryBindingness) / 8000000000) * 100, 100); // 11
    const staffScore = Math.min((metrics.staffHeadcount / 20000) * 100, 100); // 12
    const longevityScore = Math.min((metrics.longevityYears / 150) * 100, 100); // 1
    
    return (0.40 * budgetScore) + (0.30 * reachScore) + (0.20 * staffScore) + (0.10 * longevityScore); // 2
  } // 3

  // Weighting formula applied to BLOCK 2 (Research) // 4
  static calculateResearchScore(metrics: ResearchMetrics): number { // 5
    // 40 % Nature Index 2024 Share × 30 % Nobel laureate-at-time-of-prize count × 20 % annual research budget USD × 10 % institutional age weighted by recent 5-year growth // 6
    
    const niScore = Math.min((metrics.natureIndexShare / 3500) * 100, 100); // 7
    const nobelScore = Math.min((metrics.nobelLaureatesCount / 165) * 100, 100); // 8
    const budgetScore = Math.min((metrics.annualResearchBudgetUSD / 15000000000) * 100, 100); // 9
    const ageGrowthScore = Math.min(((metrics.institutionalAgeYears * metrics.recent5YearGrowthModifier) / 200) * 100, 100); // 10
    
    return (0.40 * niScore) + (0.30 * nobelScore) + (0.20 * budgetScore) + (0.10 * ageGrowthScore); // 11
  } // 12

  // Weighting formula applied to BLOCK 3 (Education NGOs) // 1
  static calculateEducationScore(metrics: EducationMetrics): number { // 2
    // 35 % monthly active learners × 20 % countries reached × 15 % languages supported × 30 % independent peer-reviewed effect-size evidence (DOI required) // 3
    
    const malScore = Math.min((metrics.monthlyActiveLearners / 2000000000) * 100, 100); // 4
    const countriesScore = Math.min((metrics.countriesReached / 195) * 100, 100); // 5
    const languagesScore = Math.min((metrics.languagesSupported / 300) * 100, 100); // 6
    const evidenceScore = Math.min((metrics.peerReviewedEffectSizeScore) * 100, 100); // 7
    
    return (0.35 * malScore) + (0.20 * countriesScore) + (0.15 * languagesScore) + (0.30 * evidenceScore); // 8
  } // 9
} // 10
