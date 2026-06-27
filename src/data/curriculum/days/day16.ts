export interface DailyExercise { // 1
  id: string; // 2
  dayNumber: number; // 3
  weekNumber: number; // 4
  phaseTopic: string; // 5
  exerciseType: string; // 6
  prompt: string; // 7
} // 8

export const day16Payload: DailyExercise = { // 9
  id: 'day-16', // 10
  dayNumber: 16, // 11
  weekNumber: 3, // 12
  phaseTopic: 'Psychological Calibration', // 1
  exerciseType: 'Fallacy Engine Simulation (Interactive)', // 2
  prompt: 'Engage the specific cognitive defense mechanism assigned for Week 3, Day 4.' // 3
}; // 4
