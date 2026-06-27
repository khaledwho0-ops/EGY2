/* ═══════════════════════════════════════════════════════════════
 * EAL STANDARD — TIERED SOURCE WHITELIST + CLASSIFIER
 * Governed by HI CLAUDE/00_THE_SCIENTIFIC_STANDARD.md §3 + §4.
 * Tiers (high→low trust): S → A → B → C → U(unknown).
 * ═══════════════════════════════════════════════════════════════ */

export type SourceTier = 'S' | 'A' | 'B' | 'C' | 'U';

export interface TierInfo {
  tier: SourceTier;
  label: string;
  isIslamicAuthority: boolean;
}

/* Domain → tier maps. endsWith match on hostname (www stripped). */
const TIER_S = [
  // Primary academic / indexes / systematic reviews
  'openalex.org', 'semanticscholar.org', 'crossref.org', 'europepmc.org', 'ebi.ac.uk',
  'doaj.org', 'pubmed.ncbi.nlm.nih.gov', 'ncbi.nlm.nih.gov', 'cochrane.org',
  'clinicaltrials.gov', 'arxiv.org', 'biorxiv.org', 'medrxiv.org',
];
const TIER_A = [
  // Top institutions, NGOs, statistical bodies, top journals
  'who.int', 'un.org', 'unesco.org', 'unicef.org', 'worldbank.org', 'oecd.org',
  'cdc.gov', 'ecdc.europa.eu', 'efsa.europa.eu', 'nih.gov', 'ourworldindata.org',
  'pewresearch.org', 'reutersinstitute.politics.ox.ac.uk', 'amnesty.org',
  'capmas.gov.eg', 'mohp.gov.eg', 'ipcc.ch',
  'nature.com', 'science.org', 'thelancet.com', 'nejm.org', 'bmj.com', 'cell.com',
  'jamanetwork.com', 'scientificamerican.com', 'technologyreview.com',
];
const TIER_B = [
  // Verification / fact-check / OSINT
  'factchecktools.googleapis.com', 'toolbox.google.com', 'idir.uta.edu', // ClaimBuster host
  'factcheck.afp.com', 'reuters.com', 'apnews.com', 'fullfact.org', 'snopes.com',
  'disinfo.eu', 'bellingcat.com', 'bbc.com', 'bbc.co.uk', 'politifact.com',
];
const TIER_C = [
  // Community knowledge — lead, never proof. Chase to a primary.
  'wikipedia.org', 'skeptics.stackexchange.com', 'retractionwatch.com',
];

/* Authentic Islamic sources (§4) — graded as authority sources. */
const ISLAMIC_AUTHORITY = [
  'quran.com', 'alquran.cloud', 'tanzil.net', 'sunnah.com', 'dorar.net',
  'dar-alifta.org', 'daralifta.org', 'azhar.eg', 'islamqa.info',
];

export function classifyTier(url?: string | null): TierInfo {
  if (!url) return { tier: 'U', label: 'Unverified source', isIslamicAuthority: false };
  try {
    const host = new URL(url).hostname.replace(/^www\./, '');
    const isIslamic = ISLAMIC_AUTHORITY.some((d) => host.endsWith(d));
    if (TIER_S.some((d) => host.endsWith(d))) return tierInfo('S', isIslamic);
    if (TIER_A.some((d) => host.endsWith(d))) return tierInfo('A', isIslamic);
    if (isIslamic) return tierInfo('A', true); // authentic Islamic authority defaults to Tier A
    if (TIER_B.some((d) => host.endsWith(d))) return tierInfo('B', false);
    if (TIER_C.some((d) => host.endsWith(d))) return tierInfo('C', false);
    return { tier: 'U', label: 'Unlisted / unverified source', isIslamicAuthority: false };
  } catch {
    return { tier: 'U', label: 'Unverified source', isIslamicAuthority: false };
  }
}

function tierInfo(tier: SourceTier, isIslamic: boolean): TierInfo {
  const labels: Record<SourceTier, string> = {
    S: 'Tier S — primary academic / systematic review',
    A: 'Tier A — top institution, NGO, or journal',
    B: 'Tier B — verification / fact-check / OSINT',
    C: 'Tier C — community knowledge (chase to primary)',
    U: 'Unlisted / unverified source',
  };
  return { tier, label: labels[tier], isIslamicAuthority: isIslamic };
}

/** Numeric weight for ranking / confidence math. Higher = more trusted. */
export function tierWeight(tier: SourceTier): number {
  return { S: 100, A: 88, B: 70, C: 45, U: 20 }[tier];
}
