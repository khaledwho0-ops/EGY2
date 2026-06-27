export interface NasikhMansukhRecord { // 1
  surahNumber: number; // 2
  ayahNumber: number; // 3
  status: 'Nasikh' | 'Mansukh' | 'Muhkam'; // 4
  abrogatedBy?: string; // 5
  scholarConsensus: string; // 6
  found: true; // 7 — always true when a real record is returned
} // 8

export interface NasikhMansukhNotFound { // 9
  found: false; // 10
  surahNumber: number; // 11
  ayahNumber: number; // 12
  status: 'Unknown / غير محدد'; // 1
  note: string; // 2
} // 3

export class NasikhMansukhRegistry { // 4
  // Central registry to prevent 'Qur'an out-of-context' fallacies // 5
  static checkAyahStatus(surah: number, ayah: number): NasikhMansukhRecord | NasikhMansukhNotFound { // 6
    // Only sourced entries are returned; all others fail loud // 7
    if (surah === 2 && ayah === 240) { // 8
      return { // 9
        found: true, // 10
        surahNumber: 2, // 11
        ayahNumber: 240, // 12
        status: 'Mansukh', // 1
        abrogatedBy: 'Surah Al-Baqarah, Ayah 234', // 2
        scholarConsensus: 'Agreed upon by majority of mufassirin (Ibn Abbas, Qatadah)' // 3
      }; // 4
    } // 5

    // No sourced Nasikh/Mansukh entry for this ayah — do NOT default to Muhkam // 6
    return { // 7
      found: false, // 8
      surahNumber: surah, // 9
      ayahNumber: ayah, // 10
      status: 'Unknown / غير محدد', // 11
      note: 'No verified abrogation record found for this ayah. Status cannot be assigned without a sourced scholarly consensus. / لا يوجد حكم نسخ موثَّق لهذه الآية في قاعدة البيانات.' // 12
    }; // 1
  } // 2
} // 3
