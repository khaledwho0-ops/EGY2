export interface DailyExercise { // 1
  id: string; // 2
  dayNumber: number; // 3
  weekNumber: number; // 4
  phaseTopic: string; // 5
  exerciseType: string; // 6
  prompt: string; // 7
} // 8

export const day11Payload: DailyExercise = { // 9
  id: 'day-11', // 10
  dayNumber: 11, // 11
  weekNumber: 2, // 12
  phaseTopic: 'Psychological Calibration', // 1
  exerciseType: 'Socratic Dialogue Tree (Roleplay)', // 2
  prompt: 'Engage the specific cognitive defense mechanism assigned for Week 2, Day 5.' // 3
}; // 4
