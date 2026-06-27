export interface DailyExercise { // 1
  id: string; // 2
  dayNumber: number; // 3
  weekNumber: number; // 4
  phaseTopic: string; // 5
  exerciseType: string; // 6
  prompt: string; // 7
} // 8

export const day127Payload: DailyExercise = { // 9
  id: 'day-127', // 10
  dayNumber: 127, // 11
  weekNumber: 22, // 12
  phaseTopic: 'Live Defense & Inoculation', // 1
  exerciseType: 'Theory Introduction (MDX Payload)', // 2
  prompt: 'Engage the specific cognitive defense mechanism assigned for Week 22, Day 1.' // 3
}; // 4
