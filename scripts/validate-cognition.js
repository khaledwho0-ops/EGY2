const fs = require('fs');
const path = require('path');
const DIR = 'C:/Users/pc/Desktop/EGY/New folder (20)/egyptian-awareness-library/src/data/exercises/cognition';
const files = fs.readdirSync(DIR).filter(f => f.endsWith('.json'));
const byDay = {};
const problems = [];
let factItems = 0, unsourced = 0;
const REAL = /^https?:\/\//, CASEID = /^EAL-case-001:/;
for (const f of files) {
  let j;
  try { j = JSON.parse(fs.readFileSync(path.join(DIR, f), 'utf8')); }
  catch (e) { problems.push(`PARSE_FAIL ${f}: ${e.message.slice(0, 60)}`); continue; }
  (byDay[j.day] = byDay[j.day] || []).push(f);
  if (!Array.isArray(j.exercises) || !j.exercises.length) { problems.push(`NO_EXERCISES ${f}`); continue; }
  if (!j.titleAr) problems.push(`NO_titleAr ${f}`);
  for (const e of j.exercises) {
    const assertsFact = Array.isArray(e.options) || typeof e.correctAnswer === 'boolean' || typeof e.answer === 'string';
    if (assertsFact) {
      factItems++;
      const s = e.sources || [];
      const ok = Array.isArray(s) && s.length && s.every(x => REAL.test(x) || CASEID.test(x));
      if (!ok) { unsourced++; problems.push(`UNSOURCED ${f} item ${e.id}`); }
    }
    if (e.claim && !e.claimAr) problems.push(`NO_claimAr ${f} #${e.id}`);
    if (e.explanation && !e.explanationAr) problems.push(`NO_explanationAr ${f} #${e.id}`);
  }
}
const days = Object.keys(byDay).map(Number).sort((a, b) => a - b);
const present = new Set(days);
const dupes = Object.entries(byDay).filter(([, fs]) => fs.length > 1);
const missing = [];
for (let d = 29; d <= 168; d++) if (!present.has(d)) missing.push(d);
console.log('=== COGNITION VALIDATION (snapshot; Sonnet run may still be writing) ===');
console.log('files:', files.length, '| distinct days:', days.length, days.length ? `(${days[0]}-${days[days.length - 1]})` : '');
console.log('DUPLICATE days (need dedupe):', dupes.length, '->', dupes.map(([d, fs]) => `${d}[${fs.length}]`).join(' '));
console.log('MISSING days 29-168:', missing.length, '->', missing.join(','));
console.log('fact items:', factItems, '| UNSOURCED:', unsourced);
console.log('total problems:', problems.length);
if (problems.length) console.log('--- first 30 ---\n' + problems.slice(0, 30).join('\n'));
