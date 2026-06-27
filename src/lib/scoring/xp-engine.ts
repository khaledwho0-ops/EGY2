export interface LearnerSession { // 1
  sessionId: string; // 2
  eisScore: number; // 3
  accuracyPercent: number; // 4
  timestamp: string; // 5
} // 6

export interface AdaptiveProfile { // 7
  currentDifficultyTier: 1 | 2 | 3 | 4 | 5; // 8
  xpTotal: number; // 9
  xpMax: number; // 10
  consecutiveHighEisCount: number; // 11
  consecutiveHighAccuracyDays: number; // 12
} // 1

export class XpAndAdaptiveEngine { // 2
  // Enforces pedagogical constraints to prevent radicalising frustration loops // 3
  static evaluateSession(session: LearnerSession, profile: AdaptiveProfile): AdaptiveProfile { // 4
    const newProfile = { ...profile }; // 5

    // Add XP based on accuracy // 6
    newProfile.xpTotal = Math.min(newProfile.xpTotal + (session.accuracyPercent * 10), newProfile.xpMax); // 7

    // Check Frustration Loop (Sustained EIS > 0.8 over 3 sessions) // 8
    if (session.eisScore > 0.8) { // 9
      newProfile.consecutiveHighEisCount += 1; // 10
      if (newProfile.consecutiveHighEisCount >= 3) { // 11
        newProfile.currentDifficultyTier = Math.max(1, newProfile.currentDifficultyTier - 1) as 1 | 2 | 3 | 4 | 5; // 12
        newProfile.consecutiveHighEisCount = 0; // Reset after mitigation // 1
      } // 2
    } else { // 3
      newProfile.consecutiveHighEisCount = 0; // 4
    } // 5

    // Check Mastery Loop (Sustained Accuracy > 95% across 5 consecutive days) // 6
    if (session.accuracyPercent > 95) { // 7
      newProfile.consecutiveHighAccuracyDays += 1; // 8
      if (newProfile.consecutiveHighAccuracyDays >= 5) { // 9
        newProfile.currentDifficultyTier = Math.min(5, newProfile.currentDifficultyTier + 1) as 1 | 2 | 3 | 4 | 5; // 10
        newProfile.consecutiveHighAccuracyDays = 0; // 11
      } // 12
    } else { // 1
      newProfile.consecutiveHighAccuracyDays = 0; // 2
    } // 3

    return newProfile; // 4
  } // 5
} // 6
