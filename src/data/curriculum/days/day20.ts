export interface DailyExercise { // 1
  id: string; // 2
  dayNumber: number; // 3
  weekNumber: number; // 4
  phaseTopic: string; // 5
  exerciseType: string; // 6
  prompt: string; // 7
} // 8

export const day20Payload: DailyExercise = { // 9
  id: 'day-20', // 10
  dayNumber: 20, // 11
  weekNumber: 4, // 12
  phaseTopic: 'Psychological Calibration', // 1
  exerciseType: 'Historical Case Study (Analysis)', // 2
  prompt: 'Engage the specific cognitive defense mechanism assigned for Week 4, Day 2.' // 3
}; // 4
