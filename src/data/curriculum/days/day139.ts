export interface DailyExercise { // 1
  id: string; // 2
  dayNumber: number; // 3
  weekNumber: number; // 4
  phaseTopic: string; // 5
  exerciseType: string; // 6
  prompt: string; // 7
} // 8

export const day139Payload: DailyExercise = { // 9
  id: 'day-139', // 10
  dayNumber: 139, // 11
  weekNumber: 24, // 12
  phaseTopic: 'Live Defense & Inoculation', // 1
  exerciseType: 'Theory Introduction (MDX Payload)', // 2
  prompt: 'Engage the specific cognitive defense mechanism assigned for Week 24, Day 1.' // 3
}; // 4
