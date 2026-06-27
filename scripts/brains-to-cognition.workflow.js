/**
 * BRAINS → COGNITION pipeline (reusable crank).
 *
 * Turns ANY BRAINS scientific source (a transcript, paper, or note) into
 * Engine-v2 cognition days, the same way every time:
 *   Extract (OPUS)  → read the source + v2 spec, mine every micro-concept,
 *                     build a per-day plan (concept + mechanic blend + anchor).
 *   Author  (SONNET)→ author one day JSON per day, throttled (batches of 2).
 *   Validate (you)  → run scripts that check parse/sources/bilingual, then
 *                     regenerate _manifest.json so /cognition-curriculum grows.
 *
 * HOW TO RUN (after the session limit resets):
 *   Workflow({
 *     scriptPath: "<this file>",
 *     args: { source: "C:/abs/path/to/brains-source.txt",
 *             phase: 2, dayStart: 64, dayCount: 7,
 *             topic: "the evidence pyramid", authorModel: "sonnet" }
 *   })
 * Then locally: node gen-manifest.js  (regenerate the manifest).
 *
 * Model tiering (per the user's directive): OPUS for the hard extract/plan,
 * SONNET for the bulk authoring, HAIKU-tier validation done by deterministic
 * node scripts (no agent needed).
 */
export const meta = {
  name: 'brains-to-cognition',
  description: 'Reusable crank: turn a BRAINS scientific source into Engine-v2 cognition days (Opus extracts+plans, Sonnet authors, throttled).',
  phases: [
    { title: 'Extract', detail: 'Opus mines micro-concepts + per-day mechanic plan', model: 'opus' },
    { title: 'Author', detail: 'Sonnet authors each day from the plan (batches of 2)', model: 'sonnet' },
  ],
}

const a = (typeof args === 'object' && args) ? args : {}
const SOURCE = a.source || ''
const PHASE = a.phase ?? 1
const START = a.dayStart ?? 29
const COUNT = a.dayCount ?? 7
const TOPIC = a.topic || 'this BRAINS source'
const DAYS = Array.from({ length: COUNT }, (_, i) => START + i)

const REPO = 'C:/Users/pc/Desktop/EGY/New folder (20)/egyptian-awareness-library'
const SPEC = REPO + '/src/data/exercises/cognition/_ENGINE_V2_SPEC.md'
const BRIEF = REPO + '/src/data/exercises/cognition/_AUTHORING_BRIEF.md'
const CASE = REPO + '/src/data/cases/eltaybat-case-001.ts'
const TEMPLATE = REPO + '/src/data/exercises/cognition/day51_need_for_closure.json'
const OUTDIR = REPO + '/src/data/exercises/cognition'

if (!SOURCE) { log('ERROR: pass args.source = absolute path to the BRAINS source.'); return { error: 'no source provided' } }

const PLAN_SCHEMA = {
  type: 'object', additionalProperties: false,
  properties: { days: { type: 'array', items: {
    type: 'object', additionalProperties: false,
    properties: { day: { type: 'number' }, concept: { type: 'string' }, mechanics: { type: 'array', items: { type: 'string' } }, anchor: { type: 'string' } },
    required: ['day', 'concept', 'mechanics'],
  } } },
  required: ['days'],
}
const DAY_SCHEMA = {
  type: 'object', additionalProperties: false,
  properties: { day: { type: 'number' }, file: { type: 'string' }, title: { type: 'string' }, mechanics: { type: 'array', items: { type: 'string' } } },
  required: ['day', 'file', 'title', 'mechanics'],
}

phase('Extract')
log(`Mining ${SOURCE} → plan for days ${DAYS[0]}–${DAYS[DAYS.length - 1]} (phase ${PHASE})`)
const plan = await agent(
  `Read IN FULL: the BRAINS source at ${SOURCE}, the v2 mechanic spec at ${SPEC}, and the anchor module at ${CASE}.
Mine EVERY micro-concept the source teaches about "${TOPIC}" — skip nothing (the user's standing rule: "don't skip a single micro data").
Then build a per-day teaching plan for days ${DAYS.join(', ')}. For EACH day assign: (1) one specific concept/sub-concept, (2) a BLEND of v2 mechanics — recognize PLUS at least two of {calibrate, self_explain, consider_opposite, inoculate, decompose}, (3) a one-line El-Tayyibat anchor tie-in. Distribute concepts so nothing important is dropped or duplicated. Return ONLY the structured plan.`,
  { label: 'extract+plan', phase: 'Extract', schema: PLAN_SCHEMA, model: 'opus', effort: 'high' }
)
const planByDay = {}
for (const d of (plan && plan.days ? plan.days : [])) planByDay[d.day] = d
log(`Plan ready for ${Object.keys(planByDay).length} days.`)

phase('Author')
const BATCH = 2
const written = []
for (let i = 0; i < DAYS.length; i += BATCH) {
  const chunk = DAYS.slice(i, i + BATCH)
  log(`Authoring days ${chunk.join(', ')}`)
  const r = await parallel(chunk.map((day) => () => {
    const p = planByDay[day] || { concept: TOPIC, mechanics: ['recognize', 'self_explain', 'calibrate'], anchor: '' }
    return agent(
      `Author ONE Engine-v2 cognition day file for day ${day} (phase ${PHASE}).
Read first: ${SPEC} (exact mechanic JSON shapes), ${BRIEF} (One-Law + name-free + tone), and the template ${TEMPLATE} (match its structure exactly).
Concept: ${p.concept}
Mechanic blend to use: ${(p.mechanics || []).join(', ')}
El-Tayyibat tie-in: ${p.anchor || 'use where natural'}
RULES: One-Law (every fact item carries a real "sources" url OR "EAL-case-001:<id>"; NEVER invent a url) · NAME-FREE («نظام الطيبات» + "a board-certified anaesthesiologist") · empathy-first, never condescending · application-not-recall · FULLY BILINGUAL (*Ar twin on every user-facing string). 4–6 items. Write the file to ${OUTDIR}/day${day}_<slug>.json. Return ONLY the structured object.`,
      { label: `author:day${day}`, phase: 'Author', schema: DAY_SCHEMA, model: a.authorModel || 'sonnet', effort: 'medium' }
    )
  }))
  written.push(...r.filter(Boolean))
}
log(`Authored ${written.length}/${DAYS.length} days. Next: run gen-manifest.js + validate-cognition.js locally.`)
return { source: SOURCE, phase: PHASE, days: DAYS, authored: written.length, files: written }
