// Scans the cognition exercise dir and emits a phase/week-grouped manifest the
// /cognition page reads. De-dupes by day (keeps the file with more exercises).
const fs = require('fs');
const path = require('path');
const DIR = 'C:/Users/pc/Desktop/EGY/New folder (20)/egyptian-awareness-library/src/data/exercises/cognition';
const PHASE_NAMES = {
  1: { en: 'Phase 1 · Cognition & Logic', ar: 'المرحلة 1 · الإدراك والمنطق' },
  2: { en: 'Phase 2 · Science Literacy', ar: 'المرحلة 2 · الثقافة العلمية' },
  3: { en: 'Phase 3 · Faith & Pseudoscience', ar: 'المرحلة 3 · الإيمان والعلم الزائف' },
  4: { en: 'Phase 4 · Integration & Capstone', ar: 'المرحلة 4 · الدمج والتتويج' },
};
const files = fs.readdirSync(DIR).filter(f => f.endsWith('.json') && !f.startsWith('_'));
const byDay = {};
for (const f of files) {
  let j; try { j = JSON.parse(fs.readFileSync(path.join(DIR, f), 'utf8')); } catch { continue; }
  if (typeof j.day !== 'number') continue;
  const entry = { day: j.day, file: f, week: j.week ?? null, phase: j.phase ?? null,
    title: j.title || f, titleAr: j.titleAr || '', type: j.type || 'logic',
    items: Array.isArray(j.exercises) ? j.exercises.length : 0,
    estimatedMinutes: j.estimatedMinutes ?? null, difficulty: j.difficulty ?? null };
  // de-dupe: keep the one with more exercise items
  if (!byDay[j.day] || entry.items > byDay[j.day].items) byDay[j.day] = entry;
}
const days = Object.values(byDay).sort((a, b) => a.day - b.day);
const phases = {};
for (const d of days) {
  const p = d.phase || (d.day <= 56 ? 1 : d.day <= 98 ? 2 : d.day <= 140 ? 3 : 4);
  (phases[p] = phases[p] || { phase: p, name: PHASE_NAMES[p], days: [] }).days.push(d);
}
const manifest = {
  generatedDays: days.length,
  totalItems: days.reduce((n, d) => n + d.items, 0),
  range: days.length ? [days[0].day, days[days.length - 1].day] : [],
  phases: Object.values(phases).sort((a, b) => a.phase - b.phase),
};
fs.writeFileSync(path.join(DIR, '_manifest.json'), JSON.stringify(manifest, null, 2));
console.log(`manifest: ${manifest.generatedDays} days, ${manifest.totalItems} items, phases ${manifest.phases.map(p => p.phase + ':' + p.days.length).join(' ')}`);
