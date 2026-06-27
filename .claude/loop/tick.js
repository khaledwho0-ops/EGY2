#!/usr/bin/env node
/**
 * Loop Engineering — deterministic "tick" the agent calls on every iteration.
 *
 * Pattern matches the user's diagram:
 *   Set goal → AI writes own prompt → Agent executes → Goal met? → loop
 *
 * This script does the boring deterministic work each tick (read state, decide
 * what's next, write back). The AGENT (cron-fired Claude) reads the planNextStep()
 * output, executes it, then calls this script with --record to write results.
 *
 * Idempotent. Safe to call repeatedly. No network calls. No mutation outside
 * .claude/loop/STATE.json + LOG.md and the project files the agent edits.
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', '..');
const STATE_PATH = path.join(__dirname, 'STATE.json');
const LOG_PATH = path.join(__dirname, 'LOG.md');
const GUIDES_PATH = path.join(ROOT, 'src', 'data', 'page-guides.ts');
const EXPLORE_PATH = path.join(ROOT, 'src', 'app', 'explore', 'page.tsx');

// ─── helpers ────────────────────────────────────────────────────────────────
function readState() { return JSON.parse(fs.readFileSync(STATE_PATH, 'utf8')); }
function writeState(s) { fs.writeFileSync(STATE_PATH, JSON.stringify(s, null, 2) + '\n'); }
function logLine(msg) {
  const line = `- [${new Date().toISOString()}] ${msg}\n`;
  fs.appendFileSync(LOG_PATH, line);
}
function readCatalogRoutes() {
  // Strict regex sweep of the Explore catalog — the truth source for "all routes".
  const src = fs.readFileSync(EXPLORE_PATH, 'utf8');
  return [...src.matchAll(/path:\s*'([^']+)'/g)].map((m) => m[1]);
}
function readGuideRoutes() {
  const src = fs.readFileSync(GUIDES_PATH, 'utf8');
  // PAGE_GUIDES: Record<string, PageGuide> = { '/foo': {...}, '/bar': {...} }
  return [...src.matchAll(/^\s*'([^']+)':\s*\{/gm)].map((m) => m[1]);
}

// ─── what's next? ───────────────────────────────────────────────────────────
function planNextStep() {
  const catalog = readCatalogRoutes();
  const have = new Set(readGuideRoutes());
  const todo = catalog.filter((r) => !have.has(r));
  return {
    totalCatalog: catalog.length,
    haveGuides: have.size,
    todo,
    done: todo.length === 0,
    nextBatch: todo.slice(0, 5), // batch of 5 per tick (matches GOAL.md hard cap)
  };
}

// ─── commands ───────────────────────────────────────────────────────────────
const cmd = process.argv[2] || 'status';
const state = readState();

if (cmd === 'status' || cmd === 'plan') {
  const plan = planNextStep();
  console.log(JSON.stringify({
    status: state.status,
    ticks: state.ticks,
    lastTickAt: state.lastTickAt,
    progress: `${plan.haveGuides}/${plan.totalCatalog}`,
    remaining: plan.todo.length,
    nextBatch: plan.nextBatch,
    done: plan.done,
  }, null, 2));
  process.exit(0);
}

if (cmd === 'start') {
  state.status = 'running';
  state.startedAt = new Date().toISOString();
  writeState(state);
  logLine('LOOP STARTED');
  console.log('loop: status=running');
  process.exit(0);
}

if (cmd === 'pause') {
  state.status = 'paused';
  writeState(state);
  logLine('LOOP PAUSED');
  console.log('loop: status=paused');
  process.exit(0);
}

if (cmd === 'record') {
  // Called by the agent after it finishes a tick. Args 3..N are routes that became DONE.
  const newlyDone = process.argv.slice(3).filter(Boolean);
  state.ticks += 1;
  state.lastTickAt = new Date().toISOString();
  state.doneRoutes = Array.from(new Set([...(state.doneRoutes || []), ...newlyDone]));
  state.lastTickResult = { recorded: newlyDone.length, routes: newlyDone };
  const plan = planNextStep();
  state.remainingRoutes = plan.todo.length;
  if (plan.done) {
    state.status = 'DONE';
    state.finishedAt = new Date().toISOString();
    logLine(`LOOP DONE after ${state.ticks} ticks — ${plan.haveGuides}/${plan.totalCatalog} guides`);
  } else {
    logLine(`tick #${state.ticks}: +${newlyDone.length} routes (${plan.haveGuides}/${plan.totalCatalog} done, ${plan.todo.length} todo)`);
  }
  writeState(state);
  console.log(JSON.stringify({ ticks: state.ticks, remaining: plan.todo.length, done: plan.done }));
  process.exit(0);
}

if (cmd === 'reset') {
  writeState({ status: 'idle', ticks: 0, lastTickAt: null, lastTickResult: null, doneRoutes: [], skippedRoutes: [], remainingRoutes: null, errors: [] });
  logLine('LOOP RESET');
  console.log('loop: reset');
  process.exit(0);
}

console.error(`unknown command: ${cmd}\nusage: node tick.js [status|plan|start|pause|record route... |reset]`);
process.exit(2);
