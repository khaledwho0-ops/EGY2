/* ═══════════════════════════════════════════════════════════════
 * COHERE RERANK — unit tests (offline, fetch mocked).
 * Proves: correct relevance ordering AND fail-safe fallback (the reranker
 * must never break a pipeline — on no-key / empty / network error it returns
 * the caller's original order). Run: vitest run cohere-rerank
 * ═══════════════════════════════════════════════════════════════ */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { cohereRerank, rerankBy } from '@/lib/ai/cohere-rerank';

const realFetch = global.fetch;
const realKey = process.env.COHERE_API_KEY;

beforeEach(() => {
  process.env.COHERE_API_KEY = 'test-key';
});
afterEach(() => {
  global.fetch = realFetch;
  if (realKey === undefined) delete process.env.COHERE_API_KEY;
  else process.env.COHERE_API_KEY = realKey;
  vi.restoreAllMocks();
});

function mockCohere(results: { index: number; relevance_score: number }[]) {
  global.fetch = vi.fn(async () => ({ ok: true, json: async () => ({ results }) })) as unknown as typeof fetch;
}

describe('cohereRerank', () => {
  it('returns scored ordering on success', async () => {
    mockCohere([
      { index: 2, relevance_score: 0.9 },
      { index: 0, relevance_score: 0.5 },
      { index: 1, relevance_score: 0.1 },
    ]);
    const hits = await cohereRerank('q', ['a', 'b', 'c']);
    expect(hits).not.toBeNull();
    expect(hits![0]).toEqual({ index: 2, relevanceScore: 0.9 });
  });

  it('returns null without a key (fail safe)', async () => {
    delete process.env.COHERE_API_KEY;
    expect(await cohereRerank('q', ['a', 'b'])).toBeNull();
  });

  it('returns null on empty documents', async () => {
    expect(await cohereRerank('q', [])).toBeNull();
  });

  it('returns null on network error (fail safe)', async () => {
    global.fetch = vi.fn(async () => {
      throw new Error('network down');
    }) as unknown as typeof fetch;
    expect(await cohereRerank('q', ['a', 'b'])).toBeNull();
  });
});

describe('rerankBy', () => {
  it('reorders items by Cohere relevance', async () => {
    mockCohere([
      { index: 2, relevance_score: 0.9 },
      { index: 0, relevance_score: 0.5 },
      { index: 1, relevance_score: 0.1 },
    ]);
    const items = [{ t: 'a' }, { t: 'b' }, { t: 'c' }];
    const out = await rerankBy('q', items, (i) => i.t);
    expect(out.map((i) => i.t)).toEqual(['c', 'a', 'b']);
  });

  it('returns the ORIGINAL order when rerank is unavailable (fail safe)', async () => {
    global.fetch = vi.fn(async () => {
      throw new Error('down');
    }) as unknown as typeof fetch;
    const items = [{ t: 'a' }, { t: 'b' }, { t: 'c' }];
    const out = await rerankBy('q', items, (i) => i.t);
    expect(out.map((i) => i.t)).toEqual(['a', 'b', 'c']);
  });

  it('does not call the API for 0 or 1 items', async () => {
    const f = vi.fn();
    global.fetch = f as unknown as typeof fetch;
    const out = await rerankBy('q', [{ t: 'a' }], (i) => i.t);
    expect(out.map((i) => i.t)).toEqual(['a']);
    expect(f).not.toHaveBeenCalled();
  });
});
