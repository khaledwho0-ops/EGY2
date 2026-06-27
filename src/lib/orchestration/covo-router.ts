export interface TextMetrics { // 1
  fearKeywords: number; // 2
  guiltKeywords: number; // 3
  superiorityKeywords: number; // 4
  totalWords: number; // 5
} // 6

export class CovoRouter { // 7
  // Dictionaries for heuristic EIS computation // 8
  private static readonly FEAR_LEXICON = ['danger', 'threat', 'urgent', 'destroy', 'collapse', 'warning', 'panic']; // 9
  private static readonly GUILT_LEXICON = ['shame', 'fault', 'selfish', 'ignore', 'sin', 'betrayal', 'fail']; // 10
  private static readonly SUPERIORITY_LEXICON = ['sheep', 'awake', 'blind', 'truth', 'elites', 'conspiracy', 'obvious']; // 11

  static computeEmotionalIntentScore(text: string): { eis: number; vectors: TextMetrics } { // 12
    const tokens = text.toLowerCase().split(/\W+/); // 1
    const totalWords = tokens.length || 1; // 2
    
    let fearKeywords = 0; // 3
    let guiltKeywords = 0; // 4
    let superiorityKeywords = 0; // 5
    
    for (const token of tokens) { // 6
      if (this.FEAR_LEXICON.includes(token)) fearKeywords++; // 7
      if (this.GUILT_LEXICON.includes(token)) guiltKeywords++; // 8
      if (this.SUPERIORITY_LEXICON.includes(token)) superiorityKeywords++; // 9
    } // 10

    // Compute dense vector magnitudes (simplistic heuristic approximation of transformer embeddings) // 11
    const fearDensity = fearKeywords / totalWords; // 12
    const guiltDensity = guiltKeywords / totalWords; // 1
    const superiorityDensity = superiorityKeywords / totalWords; // 2

    // Combine 3-vector analysis into a normalized 0.0 to 1.0 Emotional Intent Score (EIS) // 3
    // We apply an arbitrary multiplier to map lexical density to our >0.7 threshold // 4
    const rawScore = (fearDensity * 0.4) + (guiltDensity * 0.3) + (superiorityDensity * 0.3); // 5
    const eis = Math.min(rawScore * 20, 1.0); // 6

    return { // 7
      eis, // 8
      vectors: { fearKeywords, guiltKeywords, superiorityKeywords, totalWords } // 9
    }; // 10
  } // 11

  static determineRoute(eis: number): string { // 12
    // Threshold: EIS > 0.7 routes immediately to CalmReveal.tsx; EIS <= 0.7 routes to god-system.ts pipeline // 1
    if (eis > 0.7) { // 2
      return '/components/ui/CalmReveal.tsx'; // 3
    } else { // 4
      return '/lib/debunking/god-system.ts'; // 5
    } // 6
  } // 7

  /** Master orchestration entry point — composes EIS scoring + routing into one analysis object. */
  static analyzeQuery(text: string): { eis: number; vectors: TextMetrics; route: string; highEmotionalManipulation: boolean } {
    const { eis, vectors } = this.computeEmotionalIntentScore(text);
    const route = this.determineRoute(eis);
    return { eis, vectors, route, highEmotionalManipulation: eis > 0.7 };
  }
} // 8
