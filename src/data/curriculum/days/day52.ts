export interface DailyExercise { // 1
  id: string; // 2
  dayNumber: number; // 3
  weekNumber: number; // 4
  phaseTopic: string; // 5
  exerciseType: string; // 6
  prompt: string; // 7
} // 8

export const day52Payload: DailyExercise = { // 9
  id: 'day-52', // 10
  dayNumber: 52, // 11
  weekNumber: 9, // 12
  phaseTopic: 'Scientific Literacy', // 1
  exerciseType: 'Fallacy Engine Simulation (Interactive)', // 2
  prompt: 'Engage the specific cognitive defense mechanism assigned for Week 9, Day 4.' // 3
}; // 4
