// Deterministic dedupe: one file per day. Keeps the richest version
// (v2 mechanic-variety > exercise count > filename length), deletes the rest.
const fs = require('fs');
const path = require('path');
const DIR = 'C:/Users/pc/Desktop/EGY/New folder (20)/egyptian-awareness-library/src/data/exercises/cognition';
const files = fs.readdirSync(DIR).filter(f => f.endsWith('.json') && !f.startsWith('_'));
const byDay = {};
for (const f of files) {
  let j; try { j = JSON.parse(fs.readFileSync(path.join(DIR, f), 'utf8')); } catch { continue; }
  if (typeof j.day !== 'number') continue;
  const exs = Array.isArray(j.exercises) ? j.exercises : [];
  const mechVariety = new Set(exs.map(e => e.mechanic || 'recognize')).size;
  const score = mechVariety * 1000 + exs.length;
  (byDay[j.day] = byDay[j.day] || []).push({ f, score });
}
let deleted = 0;
for (const [day, arr] of Object.entries(byDay)) {
  if (arr.length < 2) continue;
  arr.sort((a, b) => b.score - a.score || a.f.length - b.f.length);
  const keep = arr[0];
  for (const x of arr.slice(1)) { fs.unlinkSync(path.join(DIR, x.f)); deleted++; console.log(`day ${day}: kept ${keep.f}  (deleted ${x.f})`); }
}
console.log(`\nDeduped: deleted ${deleted} files. Distinct days now: ${Object.keys(byDay).length}`);
