export interface DailyExercise { // 1
  id: string; // 2
  dayNumber: number; // 3
  weekNumber: number; // 4
  phaseTopic: string; // 5
  exerciseType: string; // 6
  prompt: string; // 7
} // 8

export const day130Payload: DailyExercise = { // 9
  id: 'day-130', // 10
  dayNumber: 130, // 11
  weekNumber: 22, // 12
  phaseTopic: 'Live Defense & Inoculation', // 1
  exerciseType: 'Fallacy Engine Simulation (Interactive)', // 2
  prompt: 'Engage the specific cognitive defense mechanism assigned for Week 22, Day 4.' // 3
}; // 4
