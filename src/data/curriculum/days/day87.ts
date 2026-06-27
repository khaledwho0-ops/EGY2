export interface DailyExercise { // 1
  id: string; // 2
  dayNumber: number; // 3
  weekNumber: number; // 4
  phaseTopic: string; // 5
  exerciseType: string; // 6
  prompt: string; // 7
} // 8

export const day87Payload: DailyExercise = { // 9
  id: 'day-87', // 10
  dayNumber: 87, // 11
  weekNumber: 15, // 12
  phaseTopic: 'Islamic Literacy', // 1
  exerciseType: 'WhatsApp Forward Check (Viral Takhrij)', // 2
  prompt: 'Engage the specific cognitive defense mechanism assigned for Week 15, Day 3.' // 3
}; // 4
