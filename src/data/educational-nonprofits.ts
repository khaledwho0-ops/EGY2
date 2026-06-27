export interface EducationalNonProfit { // 1
  id: string; // 2
  nonProfitName: string; // 3
  reachLatest: string; // 4
  countries: string; // 5
  languages: string; // 6
  peerReviewedEvidence: string; // 7
  sourceUrl: string; // 8
} // 9

export const educationalNonProfits: EducationalNonProfit[] = [ // 10
  { // 11
    id: 'wikimedia', // 12
    nonProfitName: 'Wikimedia Foundation / Wikipedia', // 1
    reachLatest: '~2 billion monthly readers; ~265,000 active editors/month; 65 M+ articles', // 2
    countries: '300+ language editions / global', // 3
    languages: '300+ languages', // 4
    peerReviewedEvidence: 'Editorial trust & accuracy studies (multi-Wikipedia comparative)', // 5
    sourceUrl: 'https://wikimediafoundation.org/', // 6
  }, // 7
  { // 8
    id: 'khan-academy', // 9
    nonProfitName: 'Khan Academy', // 10
    reachLatest: '62.4 M international learners SY24-25; ≈ 20 M MAU; Khanmigo in 180+ countries', // 11
    countries: '190+ countries', // 12
    languages: '50+ languages', // 1
    peerReviewedEvidence: 'University of Toronto RCT (n=11,000) showed meaningful positive effect; SRI/Murphy 2014 d ≈ 0.36; Nov 2024 efficacy report', // 2
    sourceUrl: 'https://annualreport.khanacademy.org/', // 3
  }, // 4
  { // 5
    id: 'duolingo', // 6
    nonProfitName: 'Duolingo', // 7
    reachLatest: '103 M MAU (2024); 500 M registered', // 8
    countries: '195+ markets', // 9
    languages: '38 (100+ courses)', // 10
    peerReviewedEvidence: 'Loewen et al. — small-to-medium effect size on L2 outcomes through frequency/intensity (ResearchGate 2023)', // 11
    sourceUrl: 'https://www.businessofapps.com/data/duolingo-statistics/', // 12
  }, // 1
  { // 2
    id: 'coursera', // 3
    nonProfitName: 'Coursera', // 4
    reachLatest: '168.2 M registered learners end-2024 (+19 % YoY)', // 5
    countries: '196 countries', // 6
    languages: '8 languages (Global Skills Report)', // 7
    peerReviewedEvidence: 'Coursera Global Skills Report 2024 (skill-proficiency benchmarking)', // 8
    sourceUrl: 'https://blog.coursera.org/presenting-the-2024-coursera-global-skills-report/', // 9
  }, // 10
  { // 11
    id: 'edx', // 12
    nonProfitName: 'edX (now part of 2U/Axim Collaborative non-profit assets)', // 1
    reachLatest: '100 M+ learners (press 2025)', // 2
    countries: '100+', // 3
    languages: 'English + 12 others (Open edX 13-language instance)', // 4
    peerReviewedEvidence: 'Open edX learning-outcome studies (Reich, MIT/HarvardX 2014-2022)', // 5
    sourceUrl: 'https://press.edx.org/all', // 6
  }, // 7
  { // 8
    id: 'mit-ocw', // 9
    nonProfitName: 'MIT OpenCourseWare (OCW)', // 10
    reachLatest: '4.91 M YouTube subscribers, 426 M views; 5,000+ visitor surveys', // 11
    countries: 'Global', // 12
    languages: 'English (multi-lingual ports e.g., aprende.org)', // 1
    peerReviewedEvidence: '80 % of visitors rate OCW impact extremely positive/positive; 96 % educator-helpfulness', // 2
    sourceUrl: 'https://openlearning.mit.edu/news/24-fun-facts-about-mit-open-learning-2024', // 3
  }, // 4
  { // 5
    id: 'code-org', // 6
    nonProfitName: 'Code.org', // 7
    reachLatest: '8.8 M+ students reached through systemic improvements', // 8
    countries: '180+ countries (Hour of Code)', // 9
    languages: '50+ languages (Hour of Code) + Spanish, Hindi, Korean microsites', // 10
    peerReviewedEvidence: 'Maharashtra foundational-learning gain; CS Fundamentals adoption studies', // 11
    sourceUrl: 'https://code.org/en-US/global/partners', // 12
  }, // 1
  { // 2
    id: 'wikimedia-sister', // 3
    nonProfitName: 'Wikimedia Sister Projects (Wikiversity, Wiktionary)', // 4
    reachLatest: 'Hundreds of M monthly users combined', // 5
    countries: 'Global', // 6
    languages: '300+', // 7
    peerReviewedEvidence: 'Multiple ed-research papers via Wikimedia Research', // 8
    sourceUrl: 'https://wikimediafoundation.org/', // 9
  }, // 10
  { // 11
    id: 'internet-archive', // 12
    nonProfitName: 'Internet Archive / Open Library', // 1
    reachLatest: 'Hundreds of M unique visitors/yr', // 2
    countries: 'Global', // 3
    languages: '50+', // 4
    peerReviewedEvidence: 'Multiple bibliometric studies', // 5
    sourceUrl: 'https://en.wikipedia.org/wiki/Internet_Archive', // 6
  }, // 7
  { // 8
    id: 'cambridge-sdm', // 9
    nonProfitName: 'Cambridge Social Decision-Making Lab (academic non-profit research outreach incl. Bad News game)', // 10
    reachLatest: '5 M+ Bad News players estimate', // 11
    countries: '30+ countries', // 12
    languages: '12+', // 1
    peerReviewedEvidence: 'Bad News: d = 0.52 average inoculation effect (Roozenbeek & van der Linden 2019); Good News follow-up (Basol et al. 2020)', // 2
    sourceUrl: 'https://www.nature.com/articles/s41599-019-0279-9', // 3
  }, // 4
  { // 5
    id: 'mit-harvardx', // 6
    nonProfitName: 'edX-affiliated MIT/HarvardX research outputs (Open Learning)', // 7
    reachLatest: '100 M+ enrollments', // 8
    countries: 'Global', // 9
    languages: 'English + multilingual', // 10
    peerReviewedEvidence: 'Reich & Ruipérez-Valiente, Science 2019 — MOOC outcomes meta-analysis', // 11
    sourceUrl: 'https://openlearning.mit.edu/news/24-fun-facts-about-mit-open-learning-2024', // 12
  }, // 1
  { // 2
    id: 'gutenberg', // 3
    nonProfitName: 'Project Gutenberg', // 4
    reachLatest: '~5–10 M downloads/month', // 5
    countries: 'Global', // 6
    languages: '60+', // 7
    peerReviewedEvidence: 'Cross-citation in bibliometric studies', // 8
    sourceUrl: 'https://www.gutenberg.org/', // 9
  }, // 10
  { // 11
    id: 'openstax', // 12
    nonProfitName: 'OpenStax (Rice University non-profit)', // 1
    reachLatest: '4 M+ students/yr', // 2
    countries: '100+', // 3
    languages: '5', // 4
    peerReviewedEvidence: 'Independent textbook-effect studies', // 5
    sourceUrl: 'https://online.rice.edu/insights-and-updates/rice-reach-reputation-amplified-by-coursera-2024', // 6
  }, // 7
  { // 8
    id: 'unesco-gec', // 9
    nonProfitName: 'UNESCO Global Education Coalition (incl. Khan Academy, Coursera partners)', // 10
    reachLatest: '400 M learners during COVID emergency', // 11
    countries: '190+', // 12
    languages: '100+', // 1
    peerReviewedEvidence: 'UNESCO M&E reports', // 2
    sourceUrl: 'https://www.unesco.org/en/global-education-coalition/khan-academy', // 3
  }, // 4
  { // 5
    id: 'hundred', // 6
    nonProfitName: 'HundrED Foundation', // 7
    reachLatest: 'Catalogues 200+ innovations, scales 50+ globally', // 8
    countries: '100+', // 9
    languages: 'Multilingual', // 10
    peerReviewedEvidence: 'Independent innovation-impact research (HundrED.org)', // 11
    sourceUrl: 'https://foundation.hundred.org/en/innovations/khan-academy', // 12
  } // 1
]; // 2
