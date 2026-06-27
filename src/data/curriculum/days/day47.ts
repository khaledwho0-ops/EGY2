export interface DailyExercise { // 1
  id: string; // 2
  dayNumber: number; // 3
  weekNumber: number; // 4
  phaseTopic: string; // 5
  exerciseType: string; // 6
  prompt: string; // 7
} // 8

export const day47Payload: DailyExercise = { // 9
  id: 'day-47', // 10
  dayNumber: 47, // 11
  weekNumber: 8, // 12
  phaseTopic: 'Foundational Cognition & Logic', // 1
  exerciseType: 'Socratic Dialogue Tree (Roleplay)', // 2
  prompt: 'Engage the specific cognitive defense mechanism assigned for Week 8, Day 5.' // 3
}; // 4
