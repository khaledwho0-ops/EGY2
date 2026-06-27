export interface DailyExercise { // 1
  id: string; // 2
  dayNumber: number; // 3
  weekNumber: number; // 4
  phaseTopic: string; // 5
  exerciseType: string; // 6
  prompt: string; // 7
} // 8

export const day136Payload: DailyExercise = { // 9
  id: 'day-136', // 10
  dayNumber: 136, // 11
  weekNumber: 23, // 12
  phaseTopic: 'Live Defense & Inoculation', // 1
  exerciseType: 'Fallacy Engine Simulation (Interactive)', // 2
  prompt: 'Engage the specific cognitive defense mechanism assigned for Week 23, Day 4.' // 3
}; // 4
