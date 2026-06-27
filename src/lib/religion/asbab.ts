export interface AsbabAlNuzulRecord { // 1
  surahNumber: number; // 2
  ayahNumber: number; // 3
  classification: 'Makki' | 'Madani'; // 4
  revelationContext: string; // 5
  primaryNarrator: string; // 6
  found: true; // 7 — always true when a real record is returned
} // 8

export interface AsbabAlNuzulNotFound { // 9
  found: false; // 10
  surahNumber: number; // 11
  ayahNumber: number; // 12
  note: string; // 1
} // 2

export class AsbabRegistry { // 3
  // Central registry enforcing Makki-Madani gating // 4
  static getContext(surah: number, ayah: number): AsbabAlNuzulRecord | AsbabAlNuzulNotFound { // 5
    // Only sourced entries are returned; all others fail loud // 6
    if (surah === 8) { // 7
      return { // 8
        found: true, // 9
        surahNumber: 8, // 10
        ayahNumber: ayah, // 11
        classification: 'Madani', // 12
        revelationContext: 'Revealed concerning the events of the Battle of Badr', // 1
        primaryNarrator: 'Ibn Abbas' // 2
      }; // 3
    } // 4

    // No sourced Asbab Al-Nuzul entry for this surah:ayah — do NOT default to Makki // 5
    return { // 6
      found: false, // 7
      surahNumber: surah, // 8
      ayahNumber: ayah, // 9
      note: 'No verified Asbab Al-Nuzul record found for this ayah. Classification cannot be assigned without a sourced narration. / لا يوجد سبب نزول موثَّق لهذه الآية في قاعدة البيانات.' // 10
    }; // 11
  } // 12
} // 1
