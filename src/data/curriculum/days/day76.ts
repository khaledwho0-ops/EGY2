export interface DailyExercise { // 1
  id: string; // 2
  dayNumber: number; // 3
  weekNumber: number; // 4
  phaseTopic: string; // 5
  exerciseType: string; // 6
  prompt: string; // 7
} // 8

export const day76Payload: DailyExercise = { // 9
  id: 'day-76', // 10
  dayNumber: 76, // 11
  weekNumber: 13, // 12
  phaseTopic: 'Scientific Literacy', // 1
  exerciseType: 'Fallacy Engine Simulation (Interactive)', // 2
  prompt: 'Engage the specific cognitive defense mechanism assigned for Week 13, Day 4.' // 3
}; // 4
