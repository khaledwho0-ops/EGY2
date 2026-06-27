export interface DailyExercise { // 1
  id: string; // 2
  dayNumber: number; // 3
  weekNumber: number; // 4
  phaseTopic: string; // 5
  exerciseType: string; // 6
  prompt: string; // 7
} // 8

export const day72Payload: DailyExercise = { // 9
  id: 'day-72', // 10
  dayNumber: 72, // 11
  weekNumber: 12, // 12
  phaseTopic: 'Scientific Literacy', // 1
  exerciseType: 'Weekly Assessment & Synthesis (Quiz)', // 2
  prompt: 'Engage the specific cognitive defense mechanism assigned for Week 12, Day 6.' // 3
}; // 4
