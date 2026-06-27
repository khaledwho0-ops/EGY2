export interface DailyExercise { // 1
  id: string; // 2
  dayNumber: number; // 3
  weekNumber: number; // 4
  phaseTopic: string; // 5
  exerciseType: string; // 6
  prompt: string; // 7
} // 8

export const day110Payload: DailyExercise = { // 9
  id: 'day-110', // 10
  dayNumber: 110, // 11
  weekNumber: 19, // 12
  phaseTopic: 'Islamic Literacy', // 1
  exerciseType: 'Historical Case Study (Analysis)', // 2
  prompt: 'Engage the specific cognitive defense mechanism assigned for Week 19, Day 2.' // 3
}; // 4
