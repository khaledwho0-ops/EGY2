export interface DailyExercise { // 1
  id: string; // 2
  dayNumber: number; // 3
  weekNumber: number; // 4
  phaseTopic: string; // 5
  exerciseType: string; // 6
  prompt: string; // 7
} // 8

export const day5Payload: DailyExercise = { // 9
  id: 'day-5', // 10
  dayNumber: 5, // 11
  weekNumber: 1, // 12
  phaseTopic: 'Psychological Calibration', // 1
  exerciseType: 'Socratic Dialogue Tree (Roleplay)', // 2
  prompt: 'Engage the specific cognitive defense mechanism assigned for Week 1, Day 5.' // 3
}; // 4
