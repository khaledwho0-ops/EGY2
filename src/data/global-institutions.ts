export interface GlobalRegulatoryOrganization { // 1
  id: string; // 2
  officialName: string; // 3
  hq: string; // 4
  founded: number; // 5
  scope: string; // 6
  decisiveQuantitativeMetric: string; // 7
  sourceUrls: string[]; // 8
  reasonChosenOverCompetitor: string; // 9
} // 10

export const globalRegulatoryOrgs: GlobalRegulatoryOrganization[] = [ // 11
  { // 12
    id: 'who', // 1
    officialName: 'World Health Organization (WHO)', // 2
    hq: 'Geneva, Switzerland', // 3
    founded: 1948, // 4
    scope: 'Global public-health norm-setting; 194 Member States', // 5
    decisiveQuantitativeMetric: 'Programme Budget 2024-2025 = US$ 6.83 billion (biennium); 2026-2027 budget approved with +20 % assessed contributions', // 6
    sourceUrls: [ // 7
      'https://healthpolicy-watch.news/who-6-83b-budget-for-2024-25-transparency/', // 8
      'https://www.who.int/news/item/20-05-2025-in-historic-move--who-member-states-approve-20--funding-increase-and-2026-27-budget' // 9
    ], // 10
    reasonChosenOverCompetitor: 'Chosen over PAHO because WHO\'s 194-state mandate dwarfs PAHO\'s 35-state Americas remit' // 11
  }, // 12
  { // 1
    id: 'fda', // 2
    officialName: 'U.S. Food and Drug Administration (FDA)', // 3
    hq: 'Silver Spring, MD, USA', // 4
    founded: 1906, // 5
    scope: 'Regulates 20% of US consumer spending ($3.2 trillion worth of products)', // 6
    decisiveQuantitativeMetric: 'FY 2024 enacted budget = $6.72 billion ($3.5B budget authority + $3.2B user fees); ~18,000 FTEs', // 7
    sourceUrls: [ // 8
      'https://www.neha.org/fy-24-funding' // 9
    ], // 10
    reasonChosenOverCompetitor: 'Chosen over CDC because FDA possesses statutory enforcement & market-denial power; CDC is advisory/surveillance' // 11
  }, // 12
  { // 1
    id: 'ema', // 2
    officialName: 'European Medicines Agency (EMA)', // 3
    hq: 'Amsterdam, Netherlands', // 4
    founded: 1995, // 5
    scope: 'Centralised authorisation for 27 EU member states (448 million pop)', // 6
    decisiveQuantitativeMetric: '2024 Budget = €458 million (approx. 89% from industry fees); ~900 staff', // 7
    sourceUrls: [ // 8
      'https://www.ema.europa.eu/en/about-us/how-we-work/governance-reporting/funding' // 9
    ], // 10
    reasonChosenOverCompetitor: 'Chosen over individual member-state agencies (e.g., BfArM) due to its binding EU-wide centralised procedure mandate' // 11
  }, // 12
  { // 1
    id: 'cdc', // 2
    officialName: 'Centers for Disease Control and Prevention (CDC)', // 3
    hq: 'Atlanta, GA, USA', // 4
    founded: 1946, // 5
    scope: 'US federal health protection and global disease surveillance', // 6
    decisiveQuantitativeMetric: 'FY 2024 Budget = $9.2 billion; ~12,000 employees globally', // 7
    sourceUrls: [ // 8
      'https://www.cdc.gov/media/releases/2023/s0309-budget.html' // 9
    ], // 10
    reasonChosenOverCompetitor: 'Chosen over NIH for this list because CDC is an operational surveillance/response body, whereas NIH is primarily a research-funding entity' // 11
  }, // 12
  { // 1
    id: 'nmpa', // 2
    officialName: 'National Medical Products Administration (NMPA)', // 3
    hq: 'Beijing, China', // 4
    founded: 1998, // 5
    scope: 'Drug/device regulation for 1.4 billion population', // 6
    decisiveQuantitativeMetric: 'Oversight of the world\'s second-largest pharmaceutical market (~$160B+)', // 7
    sourceUrls: [ // 8
      'https://english.nmpa.gov.cn/' // 9
    ], // 10
    reasonChosenOverCompetitor: 'Included unconditionally due to its unilateral jurisdiction over the massive Chinese domestic market' // 11
  }, // 12
  { // 1
    id: 'pmda', // 2
    officialName: 'Pharmaceuticals and Medical Devices Agency (PMDA)', // 3
    hq: 'Tokyo, Japan', // 4
    founded: 2004, // 5
    scope: 'Review and safety for the 3rd largest global pharma market', // 6
    decisiveQuantitativeMetric: 'FY 2022 Budget approx. ¥28.6 billion; ~1,000 staff', // 7
    sourceUrls: [ // 8
      'https://gabi-journal.net/pmda-update-the-current-situation-and-future-directions.html' // 9
    ], // 10
    reasonChosenOverCompetitor: 'Chosen over South Korea\'s MFDS due to Japan\'s larger absolute market size and historical role in ICH harmonization' // 11
  }, // 12
  { // 1
    id: 'mhra', // 2
    officialName: 'Medicines and Healthcare products Regulatory Agency (MHRA)', // 3
    hq: 'London, UK', // 4
    founded: 2003, // 5
    scope: 'UK-wide regulatory authority; post-Brexit sovereign independence', // 6
    decisiveQuantitativeMetric: 'Approx. £180M annual budget; 1,200+ staff', // 7
    sourceUrls: [ // 8
      'https://www.gov.uk/government/organisations/medicines-and-healthcare-products-regulatory-agency/about' // 9
    ], // 10
    reasonChosenOverCompetitor: 'Chosen over Health Canada as the MHRA exerts stronger global influence via the Access Consortium and historically aggressive approval timelines' // 11
  }, // 12
  { // 1
    id: 'health-canada', // 2
    officialName: 'Health Canada (HPFB)', // 3
    hq: 'Ottawa, Canada', // 4
    founded: 1919, // 5
    scope: 'Federal department regulating products for ~40 million Canadians', // 6
    decisiveQuantitativeMetric: 'Departmental budget > $3.5B CAD (HPFB portion specific)', // 7
    sourceUrls: [ // 8
      'https://www.canada.ca/en/health-canada/corporate/transparency/corporate-management-reporting.html' // 9
    ], // 10
    reasonChosenOverCompetitor: 'Chosen over Australia\'s TGA due to larger internal market and tight integration with US FDA supply chains' // 11
  }, // 12
  { // 1
    id: 'tga', // 2
    officialName: 'Therapeutic Goods Administration (TGA)', // 3
    hq: 'Canberra, Australia', // 4
    founded: 1989, // 5
    scope: 'Regulation for Australia (26 million pop)', // 6
    decisiveQuantitativeMetric: '100% cost-recovered via industry fees; >$160M AUD operating budget', // 7
    sourceUrls: [ // 8
      'https://www.tga.gov.au/about-tga/corporate-information/tga-cost-recovery' // 9
    ], // 10
    reasonChosenOverCompetitor: 'Chosen over Medsafe (New Zealand) due to regional hegemony and leadership within the Access Consortium' // 11
  }, // 12
  { // 1
    id: 'efsa', // 2
    officialName: 'European Food Safety Authority (EFSA)', // 3
    hq: 'Parma, Italy', // 4
    founded: 2002, // 5
    scope: 'EU-wide independent risk assessment regarding food/feed safety', // 6
    decisiveQuantitativeMetric: '2023 Budget = €135 million; ~500 staff', // 7
    sourceUrls: [ // 8
      'https://www.efsa.europa.eu/en/corporate/pub/draft-programming-document-2024-2026' // 9
    ], // 10
    reasonChosenOverCompetitor: 'Chosen over national European food agencies (e.g., ANSES) because EFSA’s scientific opinions dictate EU Commission binding regulations' // 11
  }, // 12
  { // 1
    id: 'epa', // 2
    officialName: 'Environmental Protection Agency (EPA)', // 3
    hq: 'Washington, D.C., USA', // 4
    founded: 1970, // 5
    scope: 'US federal environmental regulation (chemicals, pesticides, emissions)', // 6
    decisiveQuantitativeMetric: 'FY 2024 Enacted Budget = $9.14 billion; ~14,000+ FTEs', // 7
    sourceUrls: [ // 8
      'https://www.epa.gov/planandbudget/cj' // 9
    ], // 10
    reasonChosenOverCompetitor: 'Chosen over ECHA (EU) because EPA combines both risk assessment AND direct statutory enforcement capability within a single massive jurisdiction' // 11
  }, // 12
  { // 1
    id: 'echa', // 2
    officialName: 'European Chemicals Agency (ECHA)', // 3
    hq: 'Helsinki, Finland', // 4
    founded: 2007, // 5
    scope: 'Manages REACH, CLP, BPR across the EU', // 6
    decisiveQuantitativeMetric: '2024 Budget approx. €120 million; handles the world\'s largest chemicals database', // 7
    sourceUrls: [ // 8
      'https://echa.europa.eu/about-us/the-way-we-work/finance' // 9
    ], // 10
    reasonChosenOverCompetitor: 'Chosen over national bodies due to the global standard-setting nature of the REACH regulation' // 11
  }, // 12
  { // 1
    id: 'cdsco', // 2
    officialName: 'Central Drugs Standard Control Organisation (CDSCO)', // 3
    hq: 'New Delhi, India', // 4
    founded: 1940, // 5
    scope: 'National regulatory body for pharmaceuticals and medical devices in India', // 6
    decisiveQuantitativeMetric: 'Jurisdiction over the "Pharmacy of the World" (India supplies ~20% of global generic drugs)', // 7
    sourceUrls: [ // 8
      'https://cdsco.gov.in/' // 9
    ], // 10
    reasonChosenOverCompetitor: 'Included unconditionally due to its oversight of massive global generic and vaccine export pipelines' // 11
  }, // 12
  { // 1
    id: 'anvisa', // 2
    officialName: 'Agência Nacional de Vigilância Sanitária (ANVISA)', // 3
    hq: 'Brasília, Brazil', // 4
    founded: 1999, // 5
    scope: 'Regulates health products for ~215 million Brazilians', // 6
    decisiveQuantitativeMetric: 'Budget approx. R$ 1 billion; largest regulatory body in Latin America', // 7
    sourceUrls: [ // 8
      'https://www.gov.br/anvisa/pt-br' // 9
    ], // 10
    reasonChosenOverCompetitor: 'Chosen over COFEPRIS (Mexico) due to ANVISA\'s stricter harmonization alignment with ICH and larger market capitalization' // 11
  }, // 12
  { // 1
    id: 'sa-hpra', // 2
    officialName: 'South African Health Products Regulatory Authority (SAHPRA)', // 3
    hq: 'Pretoria, South Africa', // 4
    founded: 2018, // 5
    scope: 'National regulatory authority of South Africa (replacing MCC)', // 6
    decisiveQuantitativeMetric: 'Key anchor for the African Medicines Agency (AMA) harmonisation; oversees continent\'s most advanced clinical trial sector', // 7
    sourceUrls: [ // 8
      'https://www.sahpra.org.za/' // 9
    ], // 10
    reasonChosenOverCompetitor: 'Chosen over NAFDAC (Nigeria) because SAHPRA maintains higher stringent regulatory status and more robust clinical trial oversight capacity in Africa' // 11
  } // 12
]; // 1
