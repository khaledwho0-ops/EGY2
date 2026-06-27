export interface ScientificInstitution { // 1
  id: string; // 2
  institutionName: string; // 3
  country: string; // 4
  natureIndexShare: number; // 5
  niCountArticles: string; // 6
  nobelLaureates: string; // 7
  annualBudgetUSD: string; // 8
  sourceUrl: string; // 9
  comparativeAdvantage: string; // 10
} // 11

export const topScientificInstitutions: ScientificInstitution[] = [ // 12
  { // 1
    id: 'cas', // 2
    institutionName: 'Chinese Academy of Sciences (CAS)', // 3
    country: 'China', // 4
    natureIndexShare: 2243.22, // 5
    niCountArticles: '7,554 → 11,293', // 6
    nobelLaureates: '3 (affiliated)', // 7
    annualBudgetUSD: '~$15.7 billion', // 8
    sourceUrl: 'https://www.nature.com/nature-index/institution-outputs/china/chinese-academy-of-sciences-cas/513906bb34d6b65e6a00016b', // 9
    comparativeAdvantage: 'Unmatched volume output; centralized state-funding apparatus driving massive physical sciences scaling' // 10
  }, // 11
  { // 12
    id: 'harvard', // 1
    institutionName: 'Harvard University', // 2
    country: 'USA', // 3
    natureIndexShare: 1143.43, // 4
    niCountArticles: '3,342', // 5
    nobelLaureates: '161', // 6
    annualBudgetUSD: '~$6.1 billion', // 7
    sourceUrl: 'https://www.nature.com/nature-index/institution-outputs/united-states-of-america-usa/harvard-university/513906bc34d6b65e6a000175', // 8
    comparativeAdvantage: 'Highest absolute concentration of Nobel laureates; unmatched $50B+ endowment driving life sciences hegemony' // 9
  }, // 10
  { // 11
    id: 'max-planck', // 12
    institutionName: 'Max Planck Society', // 1
    country: 'Germany', // 2
    natureIndexShare: 663.85, // 3
    niCountArticles: '2,423', // 4
    nobelLaureates: '39', // 5
    annualBudgetUSD: '~$2.1 billion (€1.9B)', // 6
    sourceUrl: 'https://www.nature.com/nature-index/institution-outputs/germany/max-planck-society/513906bb34d6b65e6a00016e', // 7
    comparativeAdvantage: 'Harnack principle (researcher-centric funding rather than project-centric); massive physics/chemistry infrastructure' // 8
  }, // 9
  { // 10
    id: 'cnrs', // 11
    institutionName: 'French National Centre for Scientific Research (CNRS)', // 12
    country: 'France', // 1
    natureIndexShare: 605.34, // 2
    niCountArticles: '3,892', // 3
    nobelLaureates: '23', // 4
    annualBudgetUSD: '~$4.1 billion (€3.8B)', // 5
    sourceUrl: 'https://www.nature.com/nature-index/institution-outputs/france/french-national-centre-for-scientific-research-cnrs/513906bc34d6b65e6a000185', // 6
    comparativeAdvantage: 'Largest fundamental science agency in Europe; cross-disciplinary monolithic structure integrates deeply with universities' // 7
  }, // 8
  { // 9
    id: 'nih', // 10
    institutionName: 'National Institutes of Health (NIH)', // 11
    country: 'USA', // 12
    natureIndexShare: 462.66, // 1
    niCountArticles: '1,498', // 2
    nobelLaureates: '170+ (funded/intramural)', // 3
    annualBudgetUSD: '$47.3 billion (Intramural + Extramural)', // 4
    sourceUrl: 'https://www.nature.com/nature-index/institution-outputs/united-states-of-america-usa/national-institutes-of-health-nih/513906bc34d6b65e6a000171', // 5
    comparativeAdvantage: 'The apex funding and intramural execution engine for global biomedical research' // 6
  }, // 7
  { // 8
    id: 'mit', // 9
    institutionName: 'Massachusetts Institute of Technology (MIT)', // 10
    country: 'USA', // 11
    natureIndexShare: 541.31, // 12
    niCountArticles: '1,672', // 1
    nobelLaureates: '100+', // 2
    annualBudgetUSD: '$4.2 billion', // 3
    sourceUrl: 'https://www.nature.com/nature-index/institution-outputs/united-states-of-america-usa/massachusetts-institute-of-technology-mit/513906bc34d6b65e6a00016d', // 4
    comparativeAdvantage: 'Unparalleled tech-transfer ecosystem (Route 128/Kendall Square); engineering-physics-biology convergence leadership' // 5
  }, // 6
  { // 7
    id: 'stanford', // 8
    institutionName: 'Stanford University', // 9
    country: 'USA', // 10
    natureIndexShare: 642.71, // 11
    niCountArticles: '1,902', // 12
    nobelLaureates: '85', // 1
    annualBudgetUSD: '$8.9 billion', // 2
    sourceUrl: 'https://www.nature.com/nature-index/institution-outputs/united-states-of-america-usa/stanford-university/513906bc34d6b65e6a00017c', // 3
    comparativeAdvantage: 'Silicon Valley integration; unmatched capital-commercialization velocity in AI and applied biotech' // 4
  }, // 5
  { // 6
    id: 'helmholtz', // 7
    institutionName: 'Helmholtz Association', // 8
    country: 'Germany', // 9
    natureIndexShare: 531.02, // 10
    niCountArticles: '2,130', // 11
    nobelLaureates: '5', // 12
    annualBudgetUSD: '~$6.2 billion (€5.8B)', // 1
    sourceUrl: 'https://www.nature.com/nature-index/institution-outputs/germany/helmholtz-association-of-german-research-centres/513906bc34d6b65e6a000180', // 2
    comparativeAdvantage: 'Controls Germany\'s "big science" infrastructure (particle accelerators, supercomputers, research vessels)' // 3
  }, // 4
  { // 5
    id: 'cambridge', // 6
    institutionName: 'University of Cambridge', // 7
    country: 'UK', // 8
    natureIndexShare: 432.89, // 9
    niCountArticles: '1,421', // 10
    nobelLaureates: '121', // 11
    annualBudgetUSD: '~$2.9 billion (£2.3B)', // 12
    sourceUrl: 'https://www.nature.com/nature-index/institution-outputs/united-kingdom-uk/university-of-cambridge/513906bc34d6b65e6a00017d', // 1
    comparativeAdvantage: 'Silicon Fen anchoring; European leadership in molecular biology (MRC LMB) and genomics' // 2
  }, // 3
  { // 4
    id: 'oxford', // 5
    institutionName: 'University of Oxford', // 6
    country: 'UK', // 7
    natureIndexShare: 451.22, // 8
    niCountArticles: '1,498', // 9
    nobelLaureates: '73', // 10
    annualBudgetUSD: '~$3.6 billion (£2.8B)', // 11
    sourceUrl: 'https://www.nature.com/nature-index/institution-outputs/united-kingdom-uk/university-of-oxford/513906bc34d6b65e6a000186', // 12
    comparativeAdvantage: 'Highest-ranking global clinical/medical science output; proven vaccine rapid-scale capability' // 1
  }, // 2
  { // 3
    id: 'utokyo', // 4
    institutionName: 'University of Tokyo', // 5
    country: 'Japan', // 6
    natureIndexShare: 398.11, // 7
    niCountArticles: '1,204', // 8
    nobelLaureates: '16', // 9
    annualBudgetUSD: '~$2.1 billion', // 10
    sourceUrl: 'https://www.nature.com/nature-index/institution-outputs/japan/the-university-of-tokyo-utokyo/513906bb34d6b65e6a00016c', // 11
    comparativeAdvantage: 'Japan\'s preeminent physical sciences and robotics engine; massive corporate-R&D integration' // 12
  }, // 1
  { // 2
    id: 'tsinghua', // 3
    institutionName: 'Tsinghua University', // 4
    country: 'China', // 5
    natureIndexShare: 752.12, // 6
    niCountArticles: '2,312', // 7
    nobelLaureates: '2 (affiliated)', // 8
    annualBudgetUSD: '~$5.5 billion', // 9
    sourceUrl: 'https://www.nature.com/nature-index/institution-outputs/china/tsinghua-university/513906bb34d6b65e6a000161', // 10
    comparativeAdvantage: 'The engineering/CS apex of China; leading global outputs in advanced materials and AI architecture' // 11
  }, // 12
  { // 1
    id: 'peking', // 2
    institutionName: 'Peking University', // 3
    country: 'China', // 4
    natureIndexShare: 698.34, // 5
    niCountArticles: '2,145', // 6
    nobelLaureates: '3 (affiliated)', // 7
    annualBudgetUSD: '~$4.2 billion', // 8
    sourceUrl: 'https://www.nature.com/nature-index/institution-outputs/china/peking-university-pku/513906bb34d6b65e6a000166', // 9
    comparativeAdvantage: 'China\'s fundamental sciences and humanities anchor; elite basic-research talent density' // 10
  }, // 11
  { // 12
    id: 'eth-zurich', // 1
    institutionName: 'ETH Zurich', // 2
    country: 'Switzerland', // 3
    natureIndexShare: 351.44, // 4
    niCountArticles: '982', // 5
    nobelLaureates: '22', // 6
    annualBudgetUSD: '~$2.2 billion (CHF 1.9B)', // 7
    sourceUrl: 'https://www.nature.com/nature-index/institution-outputs/switzerland/swiss-federal-institute-of-technology-zurich-eth-zurich/513906bc34d6b65e6a000174', // 8
    comparativeAdvantage: 'Continental Europe\'s highest-density engineering and physics hub; exceptional spin-off creation rate' // 9
  }, // 10
  { // 11
    id: 'csic', // 12
    institutionName: 'Spanish National Research Council (CSIC)', // 1
    country: 'Spain', // 2
    natureIndexShare: 312.11, // 3
    niCountArticles: '1,452', // 4
    nobelLaureates: '1 (Cajal)', // 5
    annualBudgetUSD: '~$1.2 billion', // 6
    sourceUrl: 'https://www.nature.com/nature-index/institution-outputs/spain/spanish-national-research-council-csic/513906bc34d6b65e6a000179', // 7
    comparativeAdvantage: 'Crucial bridge for Latin American collaborative science; heavy infrastructure in marine/environmental research' // 8
  } // 9
]; // 10
