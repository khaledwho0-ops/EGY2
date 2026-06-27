export interface DailyExercise { // 1
  id: string; // 2
  dayNumber: number; // 3
  weekNumber: number; // 4
  phaseTopic: string; // 5
  exerciseType: string; // 6
  prompt: string; // 7
} // 8

export const day133Payload: DailyExercise = { // 9
  id: 'day-133', // 10
  dayNumber: 133, // 11
  weekNumber: 23, // 12
  phaseTopic: 'Live Defense & Inoculation', // 1
  exerciseType: 'Theory Introduction (MDX Payload)', // 2
  prompt: 'Engage the specific cognitive defense mechanism assigned for Week 23, Day 1.' // 3
}; // 4
