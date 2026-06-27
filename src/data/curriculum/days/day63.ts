export interface DailyExercise { // 1
  id: string; // 2
  dayNumber: number; // 3
  weekNumber: number; // 4
  phaseTopic: string; // 5
  exerciseType: string; // 6
  prompt: string; // 7
} // 8

export const day63Payload: DailyExercise = { // 9
  id: 'day-63', // 10
  dayNumber: 63, // 11
  weekNumber: 11, // 12
  phaseTopic: 'Scientific Literacy', // 1
  exerciseType: 'WhatsApp Forward Check (Viral Takhrij)', // 2
  prompt: 'Engage the specific cognitive defense mechanism assigned for Week 11, Day 3.' // 3
}; // 4
