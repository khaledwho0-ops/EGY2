export interface FatwaContextRecord { // 1
  fatwaId: string; // 2
  issuingBody: 'Dar Al-Ifta' | 'Al-Azhar' | 'Unverified/SocialMedia' | 'Unverified / غير معروف'; // 3
  contextualScope: 'Local/Specific' | 'General/Universal' | 'Unknown'; // 4
  socioPoliticalEnvironment: string; // 5
} // 6

// Real domains for recognised Egyptian theological authorities // 7
const DAR_AL_IFTA_DOMAINS = ['dar-alifta.org', 'dar-alifta.gov.eg']; // 8
const AL_AZHAR_DOMAINS = ['azhar.eg', 'alazhar.gov.eg']; // 9

export class FatwaContextEngine { // 10
  // Central registry contextualizing fatwas to counter the "Trending fatwa on TikTok" fallacy // 11
  static analyzeFatwaSource(sourceUrl: string, fatwaText: string): FatwaContextRecord { // 12
    let hostname = ''; // 1
    try { // 2
      hostname = new URL(sourceUrl).hostname.replace(/^www\./, ''); // 3
    } catch { // 4
      // unparseable URL — treat as unverified // 5
    } // 6

    if (sourceUrl.includes('tiktok.com') || sourceUrl.includes('whatsapp')) { // 7
      return { // 8
        fatwaId: 'social-media-anomaly', // 9
        issuingBody: 'Unverified/SocialMedia', // 10
        contextualScope: 'Local/Specific', // 11
        socioPoliticalEnvironment: 'Out of context, highly vulnerable to sectarian or clickbait manipulation' // 12
      }; // 1
    } // 2

    if (DAR_AL_IFTA_DOMAINS.includes(hostname)) { // 3
      return { // 4
        fatwaId: 'dar-al-ifta-official', // 5
        issuingBody: 'Dar Al-Ifta', // 6
        contextualScope: 'General/Universal', // 7
        socioPoliticalEnvironment: 'Source domain matches official Dar Al-Ifta website' // 8
      }; // 9
    } // 10

    if (AL_AZHAR_DOMAINS.includes(hostname)) { // 11
      return { // 12
        fatwaId: 'al-azhar-official', // 1
        issuingBody: 'Al-Azhar', // 2
        contextualScope: 'General/Universal', // 3
        socioPoliticalEnvironment: 'Source domain matches official Al-Azhar website' // 4
      }; // 5
    } // 6

    // URL is not on any verified authority allowlist — fail loud, never claim official status // 7
    return { // 8
      fatwaId: 'unverified-source', // 9
      issuingBody: 'Unverified / غير معروف', // 10
      contextualScope: 'Unknown', // 11
      socioPoliticalEnvironment: 'Source domain not recognised as an official theological authority. Cannot confirm authenticity. / المصدر غير معروف — لا يمكن التحقق من الجهة المُصدِرة.' // 12
    }; // 1
  } // 2
} // 3
