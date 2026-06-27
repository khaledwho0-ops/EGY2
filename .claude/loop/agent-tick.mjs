#!/usr/bin/env node
/**
 * agent-tick.mjs — the AI side of the loop (GitHub Actions OR local cron).
 *
 * On every tick: read GOAL + STATE + TICK_PROMPT + existing page-guides.ts,
 * ask Claude for the next batch of entries, append them, and call tick.js record.
 *
 * Auth: ANTHROPIC_API_KEY env var (set as a GitHub Actions secret).
 * Model: claude-sonnet-4-6 by default (override with LOOP_MODEL env).
 */

import Anthropic from '@anthropic-ai/sdk';
import { readFileSync, writeFileSync, existsSync, appendFileSync } from 'fs';
import { execSync } from 'child_process';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, '..', '..');
const GUIDES = resolve(ROOT, 'src/data/page-guides.ts');
const GOAL = readFileSync(resolve(HERE, 'GOAL.md'), 'utf8');
const TICK_PROMPT = readFileSync(resolve(HERE, 'TICK_PROMPT.md'), 'utf8');

// Planner: what's the next batch of routes to author?
const plan = JSON.parse(execSync(`node ${resolve(HERE, 'tick.js')} status`, { cwd: ROOT }).toString());
if (plan.done) {
  console.log('LOOP COMPLETE — goal met, no more routes.');
  process.exit(0);
}
const batch = plan.nextBatch || [];
if (!batch.length) {
  console.log('No routes in nextBatch — nothing to do this tick.');
  process.exit(0);
}

console.log(`Tick: authoring ${batch.length} routes (${plan.progress} done, ${plan.remaining} remaining).`);

const guidesSrc = readFileSync(GUIDES, 'utf8');

// Build the system prompt: project laws + the exact template.
const systemPrompt = `You are an autonomous content author for the Egyptian Awareness Library.
Follow the loop tick protocol EXACTLY — do not improvise.

## TICK PROTOCOL
${TICK_PROMPT}

## CURRENT GOAL
${GOAL}

## CURRENT page-guides.ts (the EXACT template + style you must match)
\`\`\`ts
${guidesSrc}
\`\`\`

## YOUR JOB
Author entries for these routes ONLY: ${batch.map((r) => `"${r}"`).join(', ')}.

Return a single JSON object of the form:
{ "entries": { "/route": { "title", "titleAr", "scenarios":[...], "useCases":[...], "chatbotContext" }, ... } }

Match the existing entries' shape EXACTLY. Every user-facing string needs an *Ar twin.
No fabricated sources. Name-free («نظام الطيبات» + "a board-certified anaesthesiologist" only).
Output ONLY the JSON, no commentary, no markdown fences.`;

const client = new Anthropic();
const model = process.env.LOOP_MODEL || 'claude-sonnet-4-6';

const resp = await client.messages.create({
  model,
  max_tokens: 8000,
  system: systemPrompt,
  messages: [{ role: 'user', content: `Author entries for: ${batch.join(', ')}. Output ONLY the JSON.` }],
});

const raw = resp.content.filter((b) => b.type === 'text').map((b) => b.text).join('').trim();
const cleaned = raw.replace(/^```json\s*/i, '').replace(/```$/i, '').trim();

let parsed;
try { parsed = JSON.parse(cleaned); }
catch (e) {
  console.error('Model returned non-JSON; pausing the loop for human review.');
  execSync(`node ${resolve(HERE, 'tick.js')} pause`, { cwd: ROOT, stdio: 'inherit' });
  appendFileSync(resolve(HERE, 'LOG.md'), `- [${new Date().toISOString()}] PAUSED: model returned non-JSON. Raw: ${raw.slice(0, 200)}...\n`);
  process.exit(1);
}

const entries = parsed.entries || {};
const newKeys = Object.keys(entries).filter((k) => batch.includes(k));
if (!newKeys.length) {
  console.log('Model returned no valid entries this tick.');
  execSync(`node ${resolve(HERE, 'tick.js')} record`, { cwd: ROOT, stdio: 'inherit' });
  process.exit(0);
}

// Splice the new entries into PAGE_GUIDES — insert before the closing `};` of the map.
const insertion = newKeys.map((k) => `  '${k}': ${JSON.stringify(entries[k], null, 2).replace(/\n/g, '\n  ')},`).join('\n');
const updated = guidesSrc.replace(/(\n};\s*\n\s*\/\*\* Lookup that tolerates trailing slashes)/, `\n${insertion}\n$1`);
if (updated === guidesSrc) {
  console.error('Could not find the PAGE_GUIDES closing brace — page-guides.ts shape changed?');
  execSync(`node ${resolve(HERE, 'tick.js')} pause`, { cwd: ROOT, stdio: 'inherit' });
  process.exit(1);
}
writeFileSync(GUIDES, updated);

// Record the win.
execSync(`node ${resolve(HERE, 'tick.js')} record ${newKeys.join(' ')}`, { cwd: ROOT, stdio: 'inherit' });
console.log(`Tick OK: +${newKeys.length} routes authored.`);
