export interface DailyExercise { // 1
  id: string; // 2
  dayNumber: number; // 3
  weekNumber: number; // 4
  phaseTopic: string; // 5
  exerciseType: string; // 6
  prompt: string; // 7
} // 8

export const day70Payload: DailyExercise = { // 9
  id: 'day-70', // 10
  dayNumber: 70, // 11
  weekNumber: 12, // 12
  phaseTopic: 'Scientific Literacy', // 1
  exerciseType: 'Fallacy Engine Simulation (Interactive)', // 2
  prompt: 'Engage the specific cognitive defense mechanism assigned for Week 12, Day 4.' // 3
}; // 4
