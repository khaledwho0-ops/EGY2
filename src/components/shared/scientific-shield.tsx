/* ═══════════════════════════════════════════════════════════════
 * <ScientificShield /> — the One Law, rendered. (EAL Standard §13)
 *
 * The universal evidence chip every page mounts on its factual blocks:
 * tiered sources + derived confidence + deception layer + its defense +
 * cross-model consensus + grounding critique. Fully theme-reactive (var(--…)),
 * so it re-grades with the theme picker. Pure presentational — pass it whatever
 * subset you have; it renders only what's present.
 * ═══════════════════════════════════════════════════════════════ */

export interface ShieldSource {
  title: string;
  url?: string | null;
  tier?: 'S' | 'A' | 'B' | 'C' | 'U';
  snippet?: string | null;
  relevant?: boolean;
  stance?: string;
  why?: string;
}

export interface ScientificShieldProps {
  confidenceLabel?: string;          // HIGH | MEDIUM | CONTESTED | UNVERIFIED
  confidenceScore?: number;          // 0-100 (derived)
  consensus?: { agreement?: boolean; secondOpinionVerdict?: string | null } | null;
  layer?: { number: number; name: string; nameAr?: string; defense?: string } | null;
  sources?: ShieldSource[];
  relevantCount?: number;
  critique?: { unsupportedClaims?: string[] } | null;
  methodologyNote?: string;          // for content pages: the real method + citation
  title?: string;                    // override the header label
}

const confColor = (label?: string) =>
  label === 'HIGH' ? 'var(--accent-emerald)'
    : label === 'CONTESTED' ? 'var(--accent-amber)'
    : label === 'UNVERIFIED' ? 'var(--accent-red)'
    : label === 'MEDIUM' ? 'var(--accent-amber)'
    : 'var(--accent-blue)';

const tierColor = (tier?: string) =>
  tier === 'S' || tier === 'A' ? 'var(--accent-emerald)'
    : tier === 'U' ? 'var(--accent-red)'
    : 'var(--accent-amber)';

const stanceColor = (stance?: string) =>
  stance === 'supports' ? 'var(--accent-emerald)'
    : stance === 'refutes' ? 'var(--accent-red)'
    : stance === 'unrelated' ? 'var(--text-muted)'
    : 'var(--accent-amber)';

export function ScientificShield({
  confidenceLabel, confidenceScore, consensus, layer, sources = [],
  relevantCount, critique, methodologyNote, title,
}: ScientificShieldProps) {
  const unsupported = critique?.unsupportedClaims ?? [];
  const cc = confColor(confidenceLabel);

  return (
    <div style={{
      borderRadius: 18, padding: 18, textAlign: 'start',
      background: 'var(--bg-card)', border: '1px solid var(--border-primary)',
    }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
        <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
          🛡 {title || 'Scientific Shield · الدرع العلمي'}
        </span>
        {confidenceLabel && (
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: 9, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Confidence</span>
            <span style={{ padding: '4px 12px', borderRadius: 999, fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em', background: `color-mix(in srgb, ${cc} 14%, transparent)`, border: `1px solid color-mix(in srgb, ${cc} 40%, transparent)`, color: cc }}>
              {confidenceLabel}{typeof confidenceScore === 'number' ? ` · ${confidenceScore}%` : ''}
            </span>
          </span>
        )}
      </div>

      {consensus && (
        <div style={{ marginTop: 10, fontSize: 12, color: 'var(--text-secondary)' }}>
          <span style={{ fontWeight: 700, color: consensus.agreement ? 'var(--accent-emerald)' : 'var(--accent-amber)' }}>
            {consensus.agreement ? 'Cross-model consensus ✓' : `Contested — 2nd opinion: ${consensus.secondOpinionVerdict || '—'}`}
          </span>
        </div>
      )}

      {methodologyNote && (
        <p style={{ marginTop: 10, fontSize: 12.5, lineHeight: 1.65, color: 'var(--text-secondary)' }}>
          <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>Method — </span>{methodologyNote}
        </p>
      )}

      {layer && (
        <div style={{ marginTop: 12, padding: 12, borderRadius: 12, background: 'color-mix(in srgb, var(--accent-purple) 9%, transparent)', border: '1px solid color-mix(in srgb, var(--accent-purple) 24%, transparent)' }}>
          <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--accent-purple)', marginBottom: 4 }}>
            Deception Layer {layer.number}: {layer.name}{layer.nameAr ? ` · ${layer.nameAr}` : ''}
          </div>
          {layer.defense && <div style={{ fontSize: 12, lineHeight: 1.6, color: 'var(--text-secondary)' }}>🛡 Defense: {layer.defense}</div>}
        </div>
      )}

      {sources.length > 0 && (
        <div style={{ marginTop: 12 }}>
          <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 8 }}>
            Evidence{typeof relevantCount === 'number' ? ` — ${relevantCount}/${sources.length} relevant` : ' — tiered provenance'}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {sources.map((s, i) => {
              const tc = tierColor(s.tier);
              const irrelevant = s.relevant === false;
              return (
                <div key={i} style={{ display: 'flex', gap: 8, fontSize: 12, opacity: irrelevant ? 0.5 : 1 }}>
                  {s.tier && (
                    <span style={{ flexShrink: 0, padding: '2px 8px', borderRadius: 6, fontWeight: 800, background: `color-mix(in srgb, ${tc} 14%, transparent)`, border: `1px solid color-mix(in srgb, ${tc} 40%, transparent)`, color: tc }}>{s.tier}</span>
                  )}
                  <div style={{ minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                      {s.url ? (
                        <a href={s.url} target="_blank" rel="noopener noreferrer" style={{ fontWeight: 700, color: 'var(--accent-blue)', textDecoration: 'none' }}>{s.title}</a>
                      ) : (
                        <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{s.title}</span>
                      )}
                      {s.stance && (
                        <span style={{ padding: '1px 7px', borderRadius: 5, fontSize: 9, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em', background: `color-mix(in srgb, ${stanceColor(s.stance)} 14%, transparent)`, border: `1px solid color-mix(in srgb, ${stanceColor(s.stance)} 40%, transparent)`, color: stanceColor(s.stance) }}>
                          {irrelevant ? 'not relevant' : s.stance}
                        </span>
                      )}
                    </div>
                    {s.why && <p style={{ margin: '2px 0 0', fontSize: 11, fontStyle: 'italic', color: 'var(--text-secondary)' }}>↳ {s.why}</p>}
                    {s.snippet && <p style={{ margin: '2px 0 0', fontSize: 11, color: 'var(--text-muted)' }}>{String(s.snippet).slice(0, 150)}</p>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {unsupported.length > 0 && (
        <div style={{ marginTop: 12, padding: 12, borderRadius: 12, background: 'color-mix(in srgb, var(--accent-amber) 9%, transparent)', border: '1px solid color-mix(in srgb, var(--accent-amber) 28%, transparent)' }}>
          <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--accent-amber)', marginBottom: 4 }}>
            ⚠ Grounding audit flagged {unsupported.length} unsupported claim(s)
          </div>
          <ul style={{ margin: 0, paddingInlineStart: 18, fontSize: 11, lineHeight: 1.6, color: 'var(--text-secondary)' }}>
            {unsupported.slice(0, 3).map((c, i) => <li key={i}>{c}</li>)}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ScientificShield;
