export interface DailyExercise { // 1
  id: string; // 2
  dayNumber: number; // 3
  weekNumber: number; // 4
  phaseTopic: string; // 5
  exerciseType: string; // 6
  prompt: string; // 7
} // 8

export const day128Payload: DailyExercise = { // 9
  id: 'day-128', // 10
  dayNumber: 128, // 11
  weekNumber: 22, // 12
  phaseTopic: 'Live Defense & Inoculation', // 1
  exerciseType: 'Historical Case Study (Analysis)', // 2
  prompt: 'Engage the specific cognitive defense mechanism assigned for Week 22, Day 2.' // 3
}; // 4
