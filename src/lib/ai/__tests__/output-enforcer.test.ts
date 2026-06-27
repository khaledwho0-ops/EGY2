/* ═══════════════════════════════════════════════════════════════
 * EVAL HARNESS — THE ONE LAW ON AI OUTPUT
 * Pure, offline, no API key. Proves the output enforcer fails loud on
 * unsourced / unverifiable AI prose and only passes admissible (Tier S–C)
 * sources. Run: vitest run output-enforcer
 * ═══════════════════════════════════════════════════════════════ */

import { describe, it, expect } from 'vitest';
import {
  enforceOneLaw,
  enforceSourcedOutput,
  isAdmissible,
  applyVerdictEnforcement,
} from '@/lib/ai/output-enforcer';

describe('One Law · output enforcer', () => {
  it('verifies output backed by a Tier-S academic source', () => {
    const r = enforceOneLaw([{ title: 'Study', url: 'https://openalex.org/W123' }]);
    expect(r.status).toBe('verified');
    expect(r.tierFloor).toBe('S');
    expect(r.sources).toHaveLength(1);
  });

  it('fails loud when there are NO sources', () => {
    const r = enforceOneLaw([]);
    expect(r.status).toBe('unverified');
    expect(r.tierFloor).toBe('U');
    expect(r.reason).toMatch(/One Law/i);
  });

  it('rejects an unlisted blog as Tier U → unverified', () => {
    const r = enforceOneLaw([{ url: 'https://some-random-blog.example/post' }]);
    expect(r.status).toBe('unverified');
    expect(r.rejected).toHaveLength(1);
    expect(r.rejected[0].tier).toBe('U');
  });

  it('accepts a fact-checker at Tier B', () => {
    const r = enforceOneLaw([{ url: 'https://www.snopes.com/fact-check/x' }]);
    expect(r.status).toBe('verified');
    expect(r.tierFloor).toBe('B');
  });

  it('accepts an authentic Islamic authority at Tier A', () => {
    const r = enforceOneLaw([{ url: 'https://sunnah.com/bukhari/1' }]);
    expect(r.status).toBe('verified');
    expect(r.tierFloor).toBe('A');
  });

  it('ranks the strongest source first (S over C)', () => {
    const r = enforceOneLaw([
      { url: 'https://en.wikipedia.org/wiki/X' }, // Tier C
      { url: 'https://pubmed.ncbi.nlm.nih.gov/123' }, // Tier S
    ]);
    expect(r.status).toBe('verified');
    expect(r.sources[0].tier).toBe('S');
    expect(r.tierFloor).toBe('S');
  });

  it('treats a malformed URL as unverified', () => {
    const r = enforceOneLaw([{ url: 'not-a-url' }]);
    expect(r.status).toBe('unverified');
  });

  it('isAdmissible: U is never admissible; S–C are', () => {
    expect(isAdmissible('U')).toBe(false);
    expect(isAdmissible('S')).toBe(true);
    expect(isAdmissible('C')).toBe(true);
  });

  it('trusts a pre-assigned tier for a vetted source even off-whitelist', () => {
    const r = enforceOneLaw([{ title: 'Journal paper', url: 'https://some-journal.example/article', tier: 'A' }]);
    expect(r.status).toBe('verified');
    expect(r.tierFloor).toBe('A');
  });

  it('a pre-assigned U tier is still inadmissible', () => {
    const r = enforceOneLaw([{ url: 'https://whitelisted-looking.example', tier: 'U' }]);
    expect(r.status).toBe('unverified');
  });
});

describe('enforceSourcedOutput · shape + law together', () => {
  it('passes a well-formed, sourced payload', () => {
    const res = enforceSourcedOutput({
      text: 'Insulin is life-saving for type-1 diabetes.',
      sources: [{ title: 'WHO', url: 'https://www.who.int/news-room/x' }],
    });
    expect(res.ok).toBe(true);
    if (res.ok) expect(res.enforcement.tierFloor).toBe('A');
  });

  it('fails a payload whose sources are all Tier U', () => {
    const res = enforceSourcedOutput({
      text: 'Trust me.',
      sources: [{ url: 'https://random-blog.example/p' }],
    });
    expect(res.ok).toBe(false);
    if (!res.ok) expect(res.status).toBe('unverified');
  });

  it('fails a malformed payload (no sources field)', () => {
    const res = enforceSourcedOutput({ text: 'No sources here.' });
    expect(res.ok).toBe(false);
  });
});

describe('applyVerdictEnforcement · the debunker wiring decision', () => {
  it('keeps the model verdict when an admissible source backs it', () => {
    const enf = enforceOneLaw([{ url: 'https://www.who.int/news-room/x' }]);
    const out = applyVerdictEnforcement({ verdict: 'DEBUNKED', confidence: 0.9 }, enf);
    expect(out.verdict).toBe('DEBUNKED');
    expect(out.confidence).toBe(0.9);
  });

  it('downgrades to UNVERIFIED when no admissible source exists', () => {
    const enf = enforceOneLaw([{ url: 'https://random-blog.example/p' }]);
    const out = applyVerdictEnforcement({ verdict: 'TRUE', confidence: 0.95 }, enf);
    expect(out.verdict).toBe('UNVERIFIED');
    expect(out.confidence as number).toBeLessThanOrEqual(0.2);
    expect(out.unverifiedReason).toBeTruthy();
  });

  it('fails loud when the model returned no verdict at all', () => {
    const enf = enforceOneLaw([]);
    const out = applyVerdictEnforcement(null, enf);
    expect(out.verdict).toBe('UNVERIFIED');
  });
});
