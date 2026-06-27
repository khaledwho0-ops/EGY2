// lib/cognition/sm2.ts — pure, deterministic, dependency-free
export interface Card {
  cardId: string;
  ease: number;          // E-factor, default 2.5
  interval: number;      // days
  repetitions: number;
  due: string;           // ISO date
}

export function sm2(card: Card, q: 0|1|2|3|4|5): Card {
  let { ease, interval, repetitions } = card;
  if (q < 3) { 
    repetitions = 0; 
    interval = 1; 
  } else {
    if (repetitions === 0)      interval = 1;
    else if (repetitions === 1) interval = 6;
    else                        interval = Math.round(interval * ease);
    repetitions += 1;
  }
  
  ease = Math.max(1.3, ease + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02)));
  const due = new Date(Date.now() + interval * 86400000).toISOString();
  
  return { ...card, ease, interval, repetitions, due };
}
