/* One-off exporter: reads six-layers/data.ts, strips TS types, emits
 * (1) flattened JSON of all case studies, (2) bilingual Markdown summary. */
const fs = require('fs');
const path = require('path');

const SRC = path.join(__dirname, 'src', 'components', 'six-layers', 'data.ts');
const OUT_DIR = path.join(__dirname, 'exports');
fs.mkdirSync(OUT_DIR, { recursive: true });

let src = fs.readFileSync(SRC, 'utf8');

// Strip TS interface blocks (closing brace at column 0).
src = src.replace(/export interface[\s\S]*?\n\}\n/g, '');
// Strip type annotations on the exported consts and `as const`.
src = src
  .replace(/export const LAYER_COLORS = \{/, 'const LAYER_COLORS = {')
  .replace(/\} as const;/, '};')
  .replace(/export const LAYERS: LayerData\[\] = \[/, 'const LAYERS = [')
  .replace(/export const LAYER_8_PHASE_2_CASES: CaseStudy\[\] = \[/, 'const LAYER_8_PHASE_2_CASES = [')
  .replace(/export const DEFENSE_PROTOCOLS = \[/, 'const DEFENSE_PROTOCOLS = [');

// Evaluate and capture the data objects.
const factory = new Function(
  src + '\nreturn { LAYERS, LAYER_8_PHASE_2_CASES, DEFENSE_PROTOCOLS, LAYER_COLORS };'
);
const { LAYERS, LAYER_8_PHASE_2_CASES, DEFENSE_PROTOCOLS } = factory();

// ── Flatten ──────────────────────────────────────────────────
const flat = [];
for (const layer of LAYERS) {
  for (const c of layer.caseStudies) {
    flat.push({
      layerNumber: layer.number,
      layerNameEn: layer.name,
      layerNameAr: layer.nameAr,
      phase2: false,
      id: c.id,
      title: c.title,
      titleAr: c.titleAr,
      year: c.year,
      domain: c.domain,
      domainAr: c.domainAr,
      damage: c.damage,
      damageAr: c.damageAr,
      illustrationEn: c.illustrationEn || '',
      illustrationAr: c.illustrationAr || '',
      egyptianSpecific: c.egyptianSpecific === true,
    });
  }
}
// Layer 8 phase-2 cases (exported separately in the source).
const layer8 = LAYERS.find((l) => l.number === 8);
for (const c of LAYER_8_PHASE_2_CASES) {
  flat.push({
    layerNumber: 8,
    layerNameEn: layer8.name,
    layerNameAr: layer8.nameAr,
    phase2: true,
    id: c.id,
    title: c.title,
    titleAr: c.titleAr,
    year: c.year,
    domain: c.domain,
    domainAr: c.domainAr,
    damage: c.damage,
    damageAr: c.damageAr,
    illustrationEn: c.illustrationEn || '',
    illustrationAr: c.illustrationAr || '',
    egyptianSpecific: c.egyptianSpecific === true,
  });
}

const jsonOut = {
  generated: 'export-six-layers.js',
  totalLayers: LAYERS.length,
  totalCaseStudies: flat.length,
  caseStudies: flat,
};
const jsonPath = path.join(OUT_DIR, 'six-layers-cases.json');
fs.writeFileSync(jsonPath, JSON.stringify(jsonOut, null, 2), 'utf8');

// ── Markdown ─────────────────────────────────────────────────
const lines = [];
lines.push('# The Six-Layers Deception Taxonomy — Full Data Export');
lines.push('');
lines.push(`> Source: \`src/components/six-layers/data.ts\``);
lines.push(`> ${LAYERS.length} layers · ${flat.length} case studies (bilingual EN/AR)`);
lines.push('');
lines.push('## Contents');
for (const layer of LAYERS) {
  lines.push(`- **Layer ${layer.number}** — ${layer.name} / ${layer.nameAr} (${layer.caseStudies.length} cases)`);
}
lines.push(`- **Layer 8 — Phase 2 cases** (${LAYER_8_PHASE_2_CASES.length} additional)`);
lines.push('- **Defense Protocols**');
lines.push('');
lines.push('---');
lines.push('');

function renderCase(c, n) {
  const tag = c.egyptianSpecific ? ' 🇪🇬 **Egyptian-specific**' : '';
  lines.push(`#### ${n}. ${c.title} — ${c.titleAr} \`#${c.id}\`${tag}`);
  lines.push('');
  lines.push(`- **Year:** ${c.year}`);
  lines.push(`- **Domain:** ${c.domain} / ${c.domainAr}`);
  lines.push(`- **Damage:** ${c.damage} / ${c.damageAr}`);
  if (c.illustrationEn) {
    lines.push('');
    lines.push(`**EN:** ${c.illustrationEn}`);
  }
  if (c.illustrationAr) {
    lines.push('');
    lines.push(`**AR:** ${c.illustrationAr}`);
  }
  lines.push('');
}

for (const layer of LAYERS) {
  lines.push(`## Layer ${layer.number} (${layer.numberAr}) — ${layer.name} / ${layer.nameAr}`);
  lines.push('');
  lines.push(`**Definition (EN):** ${layer.definition}`);
  lines.push('');
  lines.push(`**Definition (AR):** ${layer.definitionAr}`);
  lines.push('');
  lines.push(`**Accent color:** \`${layer.accentHSL}\` · **Background:** \`${layer.bgHSL}\``);
  lines.push('');
  lines.push('**Counters:**');
  lines.push('');
  lines.push('| Value | Label (EN) | Label (AR) |');
  lines.push('|-------|------------|------------|');
  for (const ct of layer.counters) {
    lines.push(`| ${ct.target}${ct.suffix} | ${ct.labelEn} | ${ct.label} |`);
  }
  lines.push('');
  lines.push(`### Case Studies (${layer.caseStudies.length})`);
  lines.push('');
  layer.caseStudies.forEach((c, i) => renderCase(c, i + 1));
  lines.push('---');
  lines.push('');
}

// Layer 8 phase-2
lines.push(`## Layer 8 — Phase 2 Cases (${LAYER_8_PHASE_2_CASES.length})`);
lines.push('');
lines.push('_Exported separately in the source as `LAYER_8_PHASE_2_CASES`._');
lines.push('');
LAYER_8_PHASE_2_CASES.forEach((c, i) => renderCase(c, i + 1));
lines.push('---');
lines.push('');

// Defense protocols
lines.push('## Defense Protocols');
lines.push('');
lines.push('| Layer | Attack (EN) | Attack (AR) | Defense (EN) | Defense (AR) |');
lines.push('|-------|-------------|-------------|--------------|--------------|');
for (const d of DEFENSE_PROTOCOLS) {
  lines.push(`| ${d.layer} (${d.layerAr}) | ${d.attack} | ${d.attackAr} | ${d.defense} | ${d.defenseAr} |`);
}
lines.push('');

const mdPath = path.join(OUT_DIR, 'six-layers-summary.md');
fs.writeFileSync(mdPath, lines.join('\n'), 'utf8');

console.log('JSON: ' + jsonPath);
console.log('MD:   ' + mdPath);
console.log('Total case studies: ' + flat.length);
console.log('Egyptian-specific: ' + flat.filter((c) => c.egyptianSpecific).length);
