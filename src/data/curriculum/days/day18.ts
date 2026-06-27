export interface DailyExercise { // 1
  id: string; // 2
  dayNumber: number; // 3
  weekNumber: number; // 4
  phaseTopic: string; // 5
  exerciseType: string; // 6
  prompt: string; // 7
} // 8

export const day18Payload: DailyExercise = { // 9
  id: 'day-18', // 10
  dayNumber: 18, // 11
  weekNumber: 3, // 12
  phaseTopic: 'Psychological Calibration', // 1
  exerciseType: 'Weekly Assessment & Synthesis (Quiz)', // 2
  prompt: 'Engage the specific cognitive defense mechanism assigned for Week 3, Day 6.' // 3
}; // 4
