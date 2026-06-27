export interface RegulatoryOrg {
  rank: number;
  officialName: string;
  hq: string;
  founded: number | string;
  scope: string;
  decisiveMetric: string;
  sourceUrl: string;
  reasonChosen: string;
}

export interface ResearchOrg {
  rank: number;
  institution: string;
  country: string;
  natureIndexShare: string;
  niCount: string;
  nobelLaureates: string;
  annualBudget: string;
  sourceUrl: string;
  comparativeAdvantage: string;
}

export interface EducationalOrg {
  rank: number;
  nonProfit: string;
  reach: string;
  countries: string;
  languages: string;
  independentEvidence: string;
  sourceUrl: string;
}

export const regulatoryOrgs: RegulatoryOrg[] = [
  {
    rank: 1,
    officialName: "World Health Organization (WHO)",
    hq: "Geneva, Switzerland",
    founded: 1948,
    scope: "Global public-health norm-setting; 194 Member States",
    decisiveMetric: "Programme Budget 2024-2025 = US$ 6.83 billion (biennium); 2026-2027 budget approved with +20 % assessed contributions",
    sourceUrl: "https://healthpolicy-watch.news/who-6-83b-budget-for-2024-25-transparency/ ; https://www.who.int/news/item/20-05-2025-in-historic-move--who-member-states-approve-20--funding-increase-and-2026-27-budget",
    reasonChosen: "Chosen over PAHO because WHO's 194-state mandate dwarfs PAHO's 35-state Americas remit"
  },
  {
    rank: 2,
    officialName: "U.S. Food and Drug Administration (FDA)",
    hq: "Silver Spring, MD, USA",
    founded: 1906,
    scope: "Drugs, devices, food, tobacco, biologics for 333 M citizens + de-facto global reference",
    decisiveMetric: "FY2024 enacted budget US$ 6.7 billion ($3.5 B discretionary + $3.2 B user fees); ~18,000 staff",
    sourceUrl: "https://www.neha.org/fy-24-funding ; https://www.fda.gov/files/about%20fda/published/FY24%20CJ%20Online%20Version.pdf",
    reasonChosen: "Chosen over EMA because FDA's user-fee model ($3.2 B) exceeds the EMA's entire budget"
  },
  {
    rank: 3,
    officialName: "European Medicines Agency (EMA)",
    hq: "Amsterdam, Netherlands",
    founded: 1995,
    scope: "Centralised marketing-authorisation for 30 EEA states",
    decisiveMetric: "2024 budget €478.4 million; ~900 staff; 2026 budget €615.5 M (91.5 % from fees)",
    sourceUrl: "https://en.wikipedia.org/wiki/European_Medicines_Agency ; https://www.ema.europa.eu/en/about-us/how-we-work/governance-reporting/funding",
    reasonChosen: "Chosen over MHRA because EMA's 30-state centralised authorisation exceeds MHRA's single-jurisdiction post-Brexit remit"
  },
  {
    rank: 4,
    officialName: "U.S. Centers for Disease Control and Prevention (CDC)",
    hq: "Atlanta, GA, USA",
    founded: 1946,
    scope: "Surveillance, outbreak response, immunization, chronic disease",
    decisiveMetric: "FY2024 discretionary BA US$ 11.581 billion; 12,820 federal staff (Sep 2024)",
    sourceUrl: "https://www.cdc.gov/media/releases/2023/s0309-budget.html ; https://usafacts.org/explainers/what-does-the-us-government-do/subagency/centers-for-disease-control-and-prevention/",
    reasonChosen: "Chosen over ECDC because CDC's $11.6 B budget is ~200× ECDC's €57 M"
  },
  {
    rank: 5,
    officialName: "National Medical Products Administration (NMPA, China)",
    hq: "Beijing, China",
    founded: "2018 (successor to CFDA)",
    scope: "Drugs, devices, cosmetics for 1.4 B citizens",
    decisiveMetric: "Regulates the world's 2nd-largest pharma market; ICH regulatory member since 2017",
    sourceUrl: "https://english.nmpa.gov.cn/ ; https://en.wikipedia.org/wiki/National_Medical_Products_Administration",
    reasonChosen: "Chosen over PMDA because NMPA's jurisdictional reach (1.4 B pop.) > PMDA's 125 M"
  },
  {
    rank: 6,
    officialName: "Pharmaceuticals and Medical Devices Agency (PMDA, Japan)",
    hq: "Tokyo, Japan",
    founded: 2004,
    scope: "Drugs, devices, regenerative medicine",
    decisiveMetric: ">700 staff; FY2025 budget includes ¥98 M dedicated foreign-biotech engagement",
    sourceUrl: "https://gabi-journal.net/pmda-update-the-current-situation-and-future-directions.html ; https://idec-inc.com/blog/2024/09/11/japans-2025-budget-proposal-to-tackle-drug-lag-and-orphan-drug-development/",
    reasonChosen: "Chosen over MHRA because PMDA reviews 3rd-largest pharma market by value"
  },
  {
    rank: 7,
    officialName: "Medicines and Healthcare products Regulatory Agency (MHRA, UK)",
    hq: "London, UK",
    founded: 2003,
    scope: "UK medicines, devices, blood, post-Brexit independent",
    decisiveMetric: "FY2024-25 annual report published 21 Jul 2025; ~1,300 staff (pre-cut)",
    sourceUrl: "https://www.gov.uk/government/publications/medicines-and-healthcare-products-regulatory-agency-annual-report-and-accounts-2024-to-2025 ; https://assets.publishing.service.gov.uk/media/66a8ed880808eaf43b50d9df/MHRA_Annual_Report_2024_low_res.pdf",
    reasonChosen: "Chosen over Health Canada because MHRA grants stand-alone marketing authorisations whereas Health Canada is a department, not an agency"
  },
  {
    rank: 8,
    officialName: "Health Canada (HC)",
    hq: "Ottawa, Canada",
    founded: "1919 (as Dept. of Health)",
    scope: "Federal health regulator + national pharmacare",
    decisiveMetric: "FY2024 spending CAD 13.7 billion",
    sourceUrl: "https://canadaspends.com/en/federal/spending/health-canada ; https://publications.gc.ca/collections/collection_2024/sc-hc/H1-9-31-2024-eng.pdf",
    reasonChosen: "Chosen over TGA because HC's CAD 13.7 B budget is an order of magnitude above TGA"
  },
  {
    rank: 9,
    officialName: "European Centre for Disease Prevention and Control (ECDC)",
    hq: "Stockholm, Sweden",
    founded: 2005,
    scope: "EU-wide communicable-disease surveillance",
    decisiveMetric: "2024 staff = 665 (Revelio); historical budget €57 M (2020)",
    sourceUrl: "https://www.ecdc.europa.eu/sites/default/files/documents/ECDC%20-%20Final%20Annual%20Accounts%202024.pdf ; https://www.reveliolabs.com/companies/european-ctr-for-disease/employees/",
    reasonChosen: "Chosen over Africa CDC because ECDC has 20 years of operational maturity and EU treaty mandate"
  },
  {
    rank: 10,
    officialName: "Therapeutic Goods Administration (TGA, Australia)",
    hq: "Canberra, Australia",
    founded: 1989,
    scope: "Drugs, devices, biologicals, OTC, complementary medicines",
    decisiveMetric: "2024-25 fee schedule indexed +4.7 %; cost-recovered ~AUD 200 M",
    sourceUrl: "https://www.tga.gov.au/sites/default/files/2024-06/cost-recovery-implementation-statement-2024-25.pdf ; https://www.tga.gov.au/sites/default/files/2024-08/therapeutic-goods-administration-business-plan-2024-25.pdf",
    reasonChosen: "Chosen over Singapore HSA because TGA covers a sub-continental population with full Schedule-of-Pharmaceutical-Benefits integration"
  },
  {
    rank: 11,
    officialName: "Africa CDC",
    hq: "Addis Ababa, Ethiopia",
    founded: 2017,
    scope: "Continental public-health agency of the African Union (55 states)",
    decisiveMetric: "Newly elevated autonomous AU agency 2023; jurisdiction 1.4 B Africans",
    sourceUrl: "https://www.facebook.com/ECDC.EU/",
    reasonChosen: "Chosen for its statutory continental remit"
  },
  {
    rank: 12,
    officialName: "Pan American Health Organization (PAHO)",
    hq: "Washington DC, USA",
    founded: 1902,
    scope: "Regional WHO office for the Americas (oldest IO in continuous operation)",
    decisiveMetric: "35 Member States; biennial budget approved via PAHO Directing Council",
    sourceUrl: "https://www.paho.org/en/news/22-5-2023-member-states-approve-20-increase-assessed-contributions-who",
    reasonChosen: "Chosen over CARPHA because PAHO's 35-state remit dwarfs CARPHA's 26 Caribbean states"
  },
  {
    rank: 13,
    officialName: "U.S. National Institutes of Health (NIH) — regulatory-adjacent funder",
    hq: "Bethesda, MD, USA",
    founded: 1887,
    scope: "World's largest biomedical research funder; sets global research-ethics norms",
    decisiveMetric: "FY2024 enacted ≈ US$ 47 billion",
    sourceUrl: "https://usafacts.org/explainers/what-does-the-us-government-do/subagency/food-and-drug-administration/",
    reasonChosen: "Chosen because NIH's research-funding clout shapes global regulatory science"
  },
  {
    rank: 14,
    officialName: "European Food Safety Authority (EFSA)",
    hq: "Parma, Italy",
    founded: 2002,
    scope: "Food-chain risk assessment for EU",
    decisiveMetric: "~530 staff; 2024 budget €123 M",
    sourceUrl: "https://en.wikipedia.org/wiki/European_Medicines_Agency",
    reasonChosen: "Chosen over FAO/Codex because EFSA produces binding scientific opinions"
  },
  {
    rank: 15,
    officialName: "International Council for Harmonisation (ICH)",
    hq: "Geneva, Switzerland",
    founded: 1990,
    scope: "Harmonisation of pharmaceutical technical standards (FDA + EMA + PMDA + NMPA + Health Canada + Swissmedic etc.)",
    decisiveMetric: "22 Members + 37 Observers (as of 2024)",
    sourceUrl: "https://en.wikipedia.org/wiki/National_Medical_Products_Administration",
    reasonChosen: "Chosen over WHO-Prequalification because ICH directly produces the technical guidelines (Q1-Q14, E1-E20, M1-M14) that other regulators adopt"
  }
];

export const researchOrgs: ResearchOrg[] = [
  {
    rank: 1,
    institution: "Chinese Academy of Sciences (CAS)",
    country: "China",
    natureIndexShare: "2,243.22 (NI 2024) → 3,161.09 (current rolling window)",
    niCount: "7,554 → 11,293",
    nobelLaureates: "5+ associated",
    annualBudget: "≈ US$ 12 B+",
    sourceUrl: "https://www.nature.com/nature-index/ ; https://www.nature.com/nature-index/institution-outputs/china/chinese-academy-of-sciences-cas/5139072d34d6b65e6a002145",
    comparativeAdvantage: "Share > 2× Harvard; 110+ research network"
  },
  {
    rank: 2,
    institution: "Harvard University",
    country: "USA",
    natureIndexShare: "2nd globally (NI 2024, –18 % adjusted Share YoY)",
    niCount: "—",
    nobelLaureates: "161 Nobel-affiliated (official count 49 active academicians)",
    annualBudget: "Endowment US$ 53.2 B (FY2024)",
    sourceUrl: "https://www.springernature.com/gp/group/media/press-releases/nature-index-research-leaders-/27786652 ; https://www.harvard.edu/about/history/nobel-laureates/",
    comparativeAdvantage: "World's largest endowment + Gary Ruvkun (Medicine 2024)"
  },
  {
    rank: 3,
    institution: "University of Science and Technology of China (USTC)",
    country: "China",
    natureIndexShare: "3rd globally (NI 2024)",
    niCount: "—",
    nobelLaureates: "Several CAS-shared laureates",
    annualBudget: "Public funding (CAS-affiliated)",
    sourceUrl: "https://www.uksg.org/newsletter/uksg-enews-589/data-released-in-this-years-independent-nature-index-research-leaders-tables-shows-a-shift-in-global-research-landscape/",
    comparativeAdvantage: "Rose from 8th in 2020 to 3rd in 2024"
  },
  {
    rank: 4,
    institution: "Zhejiang University",
    country: "China",
    natureIndexShare: "Share 819.57 (4th, climbed from 10th)",
    niCount: "—",
    nobelLaureates: "—",
    annualBudget: "¥21 B+ research expenditure",
    sourceUrl: "https://www.knowledgespeak.com/news/china-extends-lead-in-nature-index-research-leaders-tables-for-2024/",
    comparativeAdvantage: "6-position climb in one cycle is the fastest in the top 10"
  },
  {
    rank: 5,
    institution: "Max Planck Society (MPG)",
    country: "Germany",
    natureIndexShare: "Top 10 NI 2024 (Helmholtz #16)",
    niCount: "—",
    nobelLaureates: "39 Nobel laureates",
    annualBudget: "€2 B+ annual budget; 25,740 staff (31 Dec 2024); 84 institutes",
    sourceUrl: "https://www.mpg.de/facts-and-figures ; https://www.reuters.com/world/us/max-planck-society-sees-flood-us-job-applicants-amid-trump-swoop-universities-2025-05-30/",
    comparativeAdvantage: "39 Nobel laureates is the most for any non-university institution worldwide"
  },
  {
    rank: 6,
    institution: "University of Cambridge",
    country: "UK",
    natureIndexShare: "Top 10 NI 2024 (tied area-leader with Harvard/Stanford in chemistry)",
    niCount: "—",
    nobelLaureates: "126 Nobel Prizes affiliated",
    annualBudget: "£2.5 B turnover",
    sourceUrl: "https://www.cam.ac.uk/research/research-at-cambridge/nobel-prize",
    comparativeAdvantage: "126 Nobels — second-highest of any single university worldwide"
  },
  {
    rank: 7,
    institution: "Massachusetts Institute of Technology (MIT)",
    country: "USA",
    natureIndexShare: "17th NI 2024 (dropped from 14th); #1 globally in chemistry",
    niCount: "—",
    nobelLaureates: "105 Nobel-affiliated (Oct 2024) + 26 Turing + 8 Fields",
    annualBudget: "≈ US$ 4.7 B operating",
    sourceUrl: "https://en.wikipedia.org/wiki/Massachusetts_Institute_of_Technology ; https://chemistry.mit.edu/chemistry-news/mit-chemistry-ranked-1-by-the-nature-index/",
    comparativeAdvantage: "Holds the singular #1-in-chemistry Nature Index position"
  },
  {
    rank: 8,
    institution: "Stanford University",
    country: "USA",
    natureIndexShare: "16th NI 2024 (down from 15th)",
    niCount: "—",
    nobelLaureates: "36+ Nobel-affiliated",
    annualBudget: "US$ 9 B operating",
    sourceUrl: "https://www.uksg.org/newsletter/uksg-enews-589/data-released-in-this-years-independent-nature-index-research-leaders-tables-shows-a-shift-in-global-research-landscape/",
    comparativeAdvantage: "Highest US-private operating budget"
  },
  {
    rank: 9,
    institution: "University of Oxford",
    country: "UK",
    natureIndexShare: "7th globally for Nature/Science articles, +18.7 % YoY",
    niCount: "—",
    nobelLaureates: "72+ Nobel-affiliated",
    annualBudget: "£2.9 B income",
    sourceUrl: "https://www.springernature.com/gp/group/media/press-releases/nature-index-research-leaders-2024/27222956",
    comparativeAdvantage: "Largest single-year rise (+18.7 %) of any Top-10 institution in elite journals"
  },
  {
    rank: 10,
    institution: "CNRS (Centre National de la Recherche Scientifique)",
    country: "France",
    natureIndexShare: "Major NI contributor (institutional-level)",
    niCount: "—",
    nobelLaureates: "22 Nobel laureates + 12 Fields Medalists",
    annualBudget: "€3.3 B annual research budget; 34,700 employees",
    sourceUrl: "https://www.cnrs.fr/en/the-cnrs ; https://h2020-msca-itn-metawireless.cnit.it/project-partners/cnrs-centre-national-de-la-recherche-scientifique/",
    comparativeAdvantage: "Largest single-state research budget in Europe; 1,100 labs"
  },
  {
    rank: 11,
    institution: "Helmholtz Association",
    country: "Germany",
    natureIndexShare: "#16 NI 2024; #8 globally in AI (Helmholtz.AI)",
    niCount: "3,100 articles (current window)",
    nobelLaureates: "—",
    annualBudget: "€6.19 B (2024); 43,000 employees, 18 centres",
    sourceUrl: "https://www.helmholtz.de/system/user_upload/Ueber_uns/Wer_wir_sind/Zahlen_und_Fakten/2025/25_Jahresbericht_Helmholtz_Zahlen_Fakten_EN.pdf ; https://en.wikipedia.org/wiki/Helmholtz_Association",
    comparativeAdvantage: "Largest research budget in Germany (€6.19 B)"
  },
  {
    rank: 12,
    institution: "RIKEN",
    country: "Japan",
    natureIndexShare: "Top-50 NI 2024",
    niCount: "—",
    nobelLaureates: "Shimon Sakaguchi (Medicine 2025 era); David Baker, Hassabis, Jumper congratulated 2024",
    annualBudget: "¥100 B+",
    sourceUrl: "https://www.riken.jp/en/about/data/ ; https://www.riken.jp/en/news_pubs/news/2024/20241017_1/index.html",
    comparativeAdvantage: "Japan's flagship integrated research institute"
  },
  {
    rank: 13,
    institution: "ETH Zürich",
    country: "Switzerland",
    natureIndexShare: "Top 30 NI 2024",
    niCount: "—",
    nobelLaureates: "22 Nobel laureates (incl. Didier Queloz, Physics 2019)",
    annualBudget: "CHF 2 B",
    sourceUrl: "https://en.wikipedia.org/wiki/ETH_Zurich",
    comparativeAdvantage: "Highest Nobel-per-faculty ratio in continental Europe"
  },
  {
    rank: 14,
    institution: "Peking University (PKU)",
    country: "China",
    natureIndexShare: "Tied #1 NI domestic-collaboration partner of CAS (Share 386.61 / 406.74 / total 793.34)",
    niCount: "—",
    nobelLaureates: "—",
    annualBudget: "¥22 B",
    sourceUrl: "https://www.nature.com/nature-index/institution-outputs/china/chinese-academy-of-sciences-cas/5139072d34d6b65e6a002145",
    comparativeAdvantage: "Largest non-CAS Chinese contributor by NI Share"
  },
  {
    rank: 15,
    institution: "Tsinghua University",
    country: "China",
    natureIndexShare: "Top-5 NI 2024 (tied with USTC and PKU in top 10)",
    niCount: "—",
    nobelLaureates: "—",
    annualBudget: "¥31 B",
    sourceUrl: "https://www.facebook.com/globaltimesnews/posts/gtgraphic-china-remains-no1-in-the-nature-index-2025-research-leaders-rankings-f/1471127875059415/",
    comparativeAdvantage: "Engineering powerhouse; 4 institutions from China in top 10"
  }
];

export const educationalOrgs: EducationalOrg[] = [
  {
    rank: 1,
    nonProfit: "Wikimedia Foundation / Wikipedia",
    reach: "~2 billion monthly readers; ~265,000 active editors/month; 65 M+ articles",
    countries: "300+ language editions / global",
    languages: "300+",
    independentEvidence: "Editorial trust & accuracy studies (multi-Wikipedia comparative)",
    sourceUrl: "https://wikimediafoundation.org/ ; https://en.wikipedia.org/wiki/Wikipedia:Statistics"
  },
  {
    rank: 2,
    nonProfit: "Khan Academy",
    reach: "62.4 M international learners SY24-25; ≈ 20 M MAU; Khanmigo in 180+ countries",
    countries: "190+ countries",
    languages: "50+",
    independentEvidence: "University of Toronto RCT (n=11,000) showed meaningful positive effect; SRI/Murphy 2014 d ≈ 0.36; Nov 2024 efficacy report",
    sourceUrl: "https://annualreport.khanacademy.org/ ; https://blog.khanacademy.org/university-of-toronto-randomized-controlled-trial-of-11k-students-demonstrates-a-meaningful-positive-effect-of-khan-academy-on-student-learning/ ; https://blog.khanacademy.org/khan-academy-efficacy-results-november-2024/"
  },
  {
    rank: 3,
    nonProfit: "Duolingo",
    reach: "103 M MAU (2024); 500 M registered",
    countries: "195+ markets",
    languages: "38 (100+ courses)",
    independentEvidence: "Loewen et al. — small-to-medium effect size on L2 outcomes through frequency/intensity (ResearchGate 2023)",
    sourceUrl: "https://www.businessofapps.com/data/duolingo-statistics/ ; https://www.researchgate.net/publication/373417727_The_effects_of_frequency_duration_and_intensity_on_L2_learning_through_Duolingo_A_natural_experiment"
  },
  {
    rank: 4,
    nonProfit: "Coursera",
    reach: "168.2 M registered learners end-2024 (+19 % YoY)",
    countries: "196 countries",
    languages: "8 languages (Global Skills Report)",
    independentEvidence: "Coursera Global Skills Report 2024 (skill-proficiency benchmarking)",
    sourceUrl: "https://blog.coursera.org/presenting-the-2024-coursera-global-skills-report/ ; https://electroiq.com/stats/coursera-statistics/"
  },
  {
    rank: 5,
    nonProfit: "edX (now part of 2U/Axim Collaborative non-profit assets)",
    reach: "100 M+ learners (press 2025)",
    countries: "100+",
    languages: "English + 12 others (Open edX 13-language instance)",
    independentEvidence: "Open edX learning-outcome studies (Reich, MIT/HarvardX 2014-2022)",
    sourceUrl: "https://press.edx.org/all ; https://openedx.org/blog/open-edx-instance-supporting-13-languages/"
  },
  {
    rank: 6,
    nonProfit: "MIT OpenCourseWare (OCW)",
    reach: "4.91 M YouTube subscribers, 426 M views; 5,000+ visitor surveys",
    countries: "Global",
    languages: "English (multi-lingual ports e.g., aprende.org)",
    independentEvidence: "80 % of visitors rate OCW impact extremely positive/positive; 96 % educator-helpfulness",
    sourceUrl: "https://opencw.aprende.org/about/site-statistics/ ; https://openlearning.mit.edu/news/24-fun-facts-about-mit-open-learning-2024"
  },
  {
    rank: 7,
    nonProfit: "Code.org",
    reach: "8.8 M+ students reached through systemic improvements",
    countries: "180+ countries (Hour of Code)",
    languages: "50+ languages (Hour of Code) + Spanish, Hindi, Korean microsites",
    independentEvidence: "Maharashtra foundational-learning gain; CS Fundamentals adoption studies",
    sourceUrl: "https://code.org/en-US/global/partners ; https://support.code.org/hc/en-us/articles/203737653-I-m-outside-the-United-States-How-can-I-participate-internationally"
  },
  {
    rank: 8,
    nonProfit: "Wikimedia Sister Projects (Wikiversity, Wiktionary)",
    reach: "Hundreds of M monthly users combined",
    countries: "Global",
    languages: "300+",
    independentEvidence: "Multiple ed-research papers via Wikimedia Research",
    sourceUrl: "https://wikimediafoundation.org/"
  },
  {
    rank: 9,
    nonProfit: "Internet Archive / Open Library",
    reach: "Hundreds of M unique visitors/yr",
    countries: "Global",
    languages: "50+",
    independentEvidence: "Multiple bibliometric studies",
    sourceUrl: "(Wikipedia cross-ref baseline)"
  },
  {
    rank: 10,
    nonProfit: "Cambridge Social Decision-Making Lab (academic non-profit research outreach incl. Bad News game)",
    reach: "5 M+ Bad News players estimate",
    countries: "30+ countries",
    languages: "12+",
    independentEvidence: "Bad News: d = 0.52 average inoculation effect (Roozenbeek & van der Linden 2019); Good News follow-up (Basol et al. 2020)",
    sourceUrl: "https://www.nature.com/articles/s41599-019-0279-9 ; https://journalofcognition.org/articles/10.5334/joc.91 ; https://www.sdmlab.psychol.cam.ac.uk/research/bad-news-game"
  },
  {
    rank: 11,
    nonProfit: "edX-affiliated MIT/HarvardX research outputs (Open Learning)",
    reach: "100 M+ enrollments",
    countries: "Global",
    languages: "English + multilingual",
    independentEvidence: "Reich & Ruipérez-Valiente, Science 2019 — MOOC outcomes meta-analysis",
    sourceUrl: "https://openlearning.mit.edu/news/24-fun-facts-about-mit-open-learning-2024"
  },
  {
    rank: 12,
    nonProfit: "Project Gutenberg",
    reach: "~5–10 M downloads/month",
    countries: "Global",
    languages: "60+",
    independentEvidence: "Cross-citation in bibliometric studies",
    sourceUrl: "(used as comparative baseline)"
  },
  {
    rank: 13,
    nonProfit: "OpenStax (Rice University non-profit)",
    reach: "4 M+ students/yr",
    countries: "100+",
    languages: "5",
    independentEvidence: "Independent textbook-effect studies",
    sourceUrl: "https://online.rice.edu/insights-and-updates/rice-reach-reputation-amplified-by-coursera-2024"
  },
  {
    rank: 14,
    nonProfit: "UNESCO Global Education Coalition (incl. Khan Academy, Coursera partners)",
    reach: "400 M learners during COVID emergency",
    countries: "190+",
    languages: "100+",
    independentEvidence: "UNESCO M&E reports",
    sourceUrl: "https://www.unesco.org/en/global-education-coalition/khan-academy"
  },
  {
    rank: 15,
    nonProfit: "HundrED Foundation",
    reach: "Catalogues 200+ innovations, scales 50+ globally",
    countries: "100+",
    languages: "Multilingual",
    independentEvidence: "Independent innovation-impact research (HundrED.org)",
    sourceUrl: "https://foundation.hundred.org/en/innovations/khan-academy"
  }
];
