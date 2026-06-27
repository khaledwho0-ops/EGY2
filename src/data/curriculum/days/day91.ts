export interface DailyExercise { // 1
  id: string; // 2
  dayNumber: number; // 3
  weekNumber: number; // 4
  phaseTopic: string; // 5
  exerciseType: string; // 6
  prompt: string; // 7
} // 8

export const day91Payload: DailyExercise = { // 9
  id: 'day-91', // 10
  dayNumber: 91, // 11
  weekNumber: 16, // 12
  phaseTopic: 'Islamic Literacy', // 1
  exerciseType: 'Theory Introduction (MDX Payload)', // 2
  prompt: 'Engage the specific cognitive defense mechanism assigned for Week 16, Day 1.' // 3
}; // 4
