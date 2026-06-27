'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { PageNavigation } from '@/components/shared/page-navigation';
import ScenarioResponsePlayer, { type ScenarioExercise } from '@/components/exercises/ScenarioResponsePlayer';

// ── Types ─────────────────────────────────────────────────────────────────────
interface MHCard {
  file: string;
  id: string;
  label: string;
  labelAr: string;
  color: string;
  icon: string;
}

interface DayData {
  id: string;
  title?: string;
  titleAr?: string;
  description?: string;
  descriptionAr?: string;
  estimatedMinutes?: number;
  difficulty?: number;
  type?: string;
  source?: string;
  safetyNote?: string;
  safetyNoteAr?: string;
  exercises?: unknown[];
}

interface ExerciseItem {
  id: number | string;
  claim?: string;
  claimAr?: string;
  prompt?: string;
  promptAr?: string;
  myth_en?: string;
  myth_ar?: string;
  options?: string[];
  correctAnswer?: number | boolean;
  explanation?: string;
  explanation_en?: string;
  explanationAr?: string;
  explanation_ar?: string;
  // differentiation (grief-vs-depression) fields
  scenario?: string;
  scenarioAr?: string;
  question?: string;
  questionAr?: string;
  answer?: string;
  key_differentiators?: string[];
  references?: string[];
  isReal?: boolean;
}

// ── Config ────────────────────────────────────────────────────────────────────
const MH_CARDS: MHCard[] = [
  {
    file: 'depression_myths_day1.json',
    id: 'depression_myths_day1',
    label: 'Depression Myths in Egypt',
    labelAr: 'أساطير الاكتئاب في مصر',
    color: '#6366f1',
    icon: '🧠',
  },
  {
    file: 'anxiety_myths_day2.json',
    id: 'anxiety_myths_day2',
    label: 'Anxiety Myths',
    labelAr: 'أساطير القلق',
    color: '#8b5cf6',
    icon: '💜',
  },
  {
    file: 'stigma_scenarios_day3.json',
    id: 'stigma_scenarios_day3',
    label: 'Stigma Scenarios',
    labelAr: 'سيناريوهات الوصمة',
    color: '#ec4899',
    icon: '🛡️',
  },
  {
    file: 'grief_vs_depression_day4.json',
    id: 'grief_vs_depression_day4',
    label: 'Grief vs. Depression',
    labelAr: 'الحزن مقابل الاكتئاب',
    color: '#06b6d4',
    icon: '💧',
  },
];

const PHASE_LINKS = [
  { href: '/fallacy-engine', label: 'Fallacy Engine', labelAr: 'محرك المغالطات', icon: '⚙️', desc: 'Identify logical fallacies in real-time' },
  { href: '/bias-detector', label: 'Bias Detector', labelAr: 'كاشف التحيز', icon: '🔬', desc: 'Detect cognitive biases in arguments' },
  { href: '/bias-fingerprint', label: 'Bias Fingerprint', labelAr: 'بصمة التحيز', icon: '🖐️', desc: 'Your personal cognitive bias profile' },
  { href: '/cognitive-lab', label: 'Cognitive Lab', labelAr: 'مختبر الإدراك', icon: '🧪', desc: 'Interactive cognitive immunity experiments' },
  { href: '/reaction-test', label: 'Reaction Test', labelAr: 'اختبار ردود الفعل', icon: '⚡', desc: 'Test your cognitive reaction speed' },
];

// ── Mini Exercise Player ──────────────────────────────────────────────────────
function MiniPlayer({
  exercises,
  type,
  onDone,
}: {
  exercises: ExerciseItem[];
  type?: string;
  onDone: () => void;
}) {
  const [idx, setIdx] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [selectedCode, setSelectedCode] = useState<string | null>(null);

  const ex = exercises[idx];
  if (!ex) return null;

  const isLast = idx === exercises.length - 1;
  const hasOptions = Array.isArray(ex.options) && ex.options.length > 0;
  // True/False ("is this claim true?") triggers on a boolean key, so a balancing
  // TRUE item needs only {claim, correctAnswer:true} — no fake myth_en.
  const isMythBust = (!!ex.myth_en || typeof ex.correctAnswer === 'boolean') && !hasOptions;
  // "differentiation" items (e.g. grief-vs-depression): scenario + question + a
  // free-string `answer` code and NO options[]. Derive selectable options from the
  // distinct answer codes across the set and grade by exact-match (deterministic).
  const isDifferentiation = !hasOptions && !isMythBust && typeof ex.answer === 'string';
  const diffOptions: string[] = isDifferentiation
    ? Array.from(new Set(exercises.map((e) => e.answer).filter((x): x is string => typeof x === 'string')))
    : [];
  const questionText = ex.question ?? '';
  const prompt = ex.claim ?? ex.prompt ?? ex.myth_en ?? ex.scenario ?? '';
  const explanation = ex.explanation ?? ex.explanation_en ?? '';
  const keyDiffs: string[] = Array.isArray(ex.key_differentiators) ? ex.key_differentiators : [];
  const isTruth = typeof ex.correctAnswer === 'undefined' && !isMythBust && !hasOptions && !isDifferentiation;
  const hasNothing = !prompt && !questionText; // guard: never render a bare Next on an empty item
  const humanize = (code: string) => code.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

  function handleOption(i: number) {
    if (answered) return;
    setAnswered(true);
    if (ex.correctAnswer === i) setScore((s) => s + 1);
  }

  function handleBool(val: boolean) {
    if (answered) return;
    setAnswered(true);
    if (ex.correctAnswer === val) setScore((s) => s + 1);
  }

  function handleDiff(code: string) {
    if (answered) return;
    setAnswered(true);
    setSelectedCode(code);
    if (ex.answer === code) setScore((s) => s + 1);
  }

  function next() {
    if (isLast) { onDone(); return; }
    setIdx((i) => i + 1);
    setAnswered(false);
    setSelectedCode(null);
  }

  return (
    <div style={{
      background: 'rgba(10,10,30,0.9)',
      border: '1px solid rgba(139,92,246,0.3)',
      borderRadius: 14, padding: 20, marginTop: 12,
    }}>
      {/* progress */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
        <span style={{ color: '#64748b', fontSize: 12 }}>{idx + 1}/{exercises.length}</span>
        <span style={{ color: '#8b5cf6', fontSize: 12, fontWeight: 700 }}>Score {score}</span>
      </div>
      <div style={{ height: 3, background: 'rgba(255,255,255,0.07)', borderRadius: 2, marginBottom: 16 }}>
        <div style={{ height: '100%', width: `${(idx / exercises.length) * 100}%`, background: '#8b5cf6', borderRadius: 2, transition: 'width 0.3s' }} />
      </div>

      {/* prompt */}
      {(ex.myth_ar) && (
        <p style={{ color: '#f1f5f9', fontWeight: 700, fontSize: 16, direction: 'rtl', marginBottom: 6 }}>
          {ex.myth_ar}
        </p>
      )}
      <p style={{ color: '#e2e8f0', fontSize: 14, lineHeight: 1.6, marginBottom: 14 }}>{prompt}</p>
      {(ex.claimAr || ex.promptAr) && (
        <p style={{ color: '#64748b', fontSize: 12, direction: 'rtl', marginBottom: 14 }}>
          {ex.claimAr ?? ex.promptAr}
        </p>
      )}

      {/* differentiation: question + options derived from the answer codes */}
      {isDifferentiation && questionText && (
        <p style={{ color: '#c4b5fd', fontSize: 13.5, fontWeight: 600, marginBottom: 12 }}>{questionText}</p>
      )}
      {isDifferentiation && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {diffOptions.map((code) => {
            const isCorrect = ex.answer === code;
            return (
              <button key={code} onClick={() => handleDiff(code)} style={{
                padding: '11px 14px', borderRadius: 9, fontSize: 13, textAlign: 'left',
                cursor: answered ? 'default' : 'pointer',
                background: !answered ? 'rgba(255,255,255,0.04)' : isCorrect ? 'rgba(34,197,94,0.18)' : selectedCode === code ? 'rgba(239,68,68,0.12)' : 'rgba(255,255,255,0.02)',
                border: !answered ? '1px solid rgba(255,255,255,0.09)' : isCorrect ? '1px solid #22c55e' : selectedCode === code ? '1px solid rgba(239,68,68,0.4)' : '1px solid rgba(255,255,255,0.05)',
                color: '#e2e8f0',
              }}>{humanize(code)}</button>
            );
          })}
        </div>
      )}

      {/* MC options */}
      {hasOptions && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {ex.options!.map((opt, i) => {
            const isCorrect = ex.correctAnswer === i;
            return (
              <button key={i} onClick={() => handleOption(i)} style={{
                padding: '11px 14px', borderRadius: 9, fontSize: 13, textAlign: 'left',
                cursor: answered ? 'default' : 'pointer',
                background: !answered ? 'rgba(255,255,255,0.04)' : isCorrect ? 'rgba(34,197,94,0.18)' : 'rgba(255,255,255,0.02)',
                border: !answered ? '1px solid rgba(255,255,255,0.09)' : isCorrect ? '1px solid #22c55e' : '1px solid rgba(255,255,255,0.05)',
                color: '#e2e8f0',
              }}>{opt}</button>
            );
          })}
        </div>
      )}

      {/* myth bust */}
      {isMythBust && (
        <div style={{ display: 'flex', gap: 10 }}>
          {[{ l: '✓ True', v: true, c: '#22c55e' }, { l: '✗ False', v: false, c: '#ef4444' }].map(({ l, v, c }) => (
            <button key={String(v)} onClick={() => handleBool(v)} style={{
              flex: 1, padding: '12px', borderRadius: 9, fontWeight: 700, fontSize: 14,
              cursor: answered ? 'default' : 'pointer',
              color: c,
              background: answered && ex.correctAnswer === v ? `${c}22` : 'rgba(255,255,255,0.04)',
              border: answered && ex.correctAnswer === v ? `2px solid ${c}` : '1px solid rgba(255,255,255,0.1)',
            }}>{l}</button>
          ))}
        </div>
      )}

      {/* explanation */}
      {answered && explanation && (
        <div style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: 10, padding: 12, marginTop: 12 }}>
          <p style={{ color: '#10b981', fontWeight: 700, fontSize: 12, margin: '0 0 4px' }}>💡 Explanation</p>
          <p style={{ color: '#94a3b8', fontSize: 12, margin: 0, lineHeight: 1.6 }}>{explanation}</p>
          {(ex.explanationAr ?? ex.explanation_ar) && (
            <p style={{ color: '#64748b', fontSize: 11, marginTop: 6, direction: 'rtl', lineHeight: 1.5 }}>
              {ex.explanationAr ?? ex.explanation_ar}
            </p>
          )}
          {Array.isArray(ex.references) && ex.references.length > 0 && (
            <div style={{ marginTop: 8, paddingTop: 8, borderTop: '1px solid rgba(16,185,129,0.15)' }}>
              <p style={{ color: '#10b981', fontSize: 10, fontWeight: 700, margin: '0 0 3px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Sources</p>
              {ex.references.map((r, i) => (
                <p key={i} style={{ color: '#5b7c8d', fontSize: 10.5, margin: '0 0 2px', lineHeight: 1.4 }}>• {r}</p>
              ))}
            </div>
          )}
        </div>
      )}

      {/* key differentiators (differentiation items) */}
      {answered && keyDiffs.length > 0 && (
        <div style={{ marginTop: 10, background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.2)', borderRadius: 10, padding: 12 }}>
          <p style={{ color: '#a78bfa', fontWeight: 700, fontSize: 12, margin: '0 0 6px' }}>🔑 Key differentiators</p>
          <ul style={{ margin: 0, paddingInlineStart: 18 }}>
            {keyDiffs.map((k, i) => <li key={i} style={{ color: '#cbd5e1', fontSize: 12, lineHeight: 1.6, marginBottom: 3 }}>{k}</li>)}
          </ul>
        </div>
      )}

      {/* next */}
      {(answered || (isTruth && !hasNothing)) && (
        <button onClick={next} style={{
          marginTop: 12, width: '100%', padding: '12px', borderRadius: 9, border: 'none',
          background: 'linear-gradient(135deg,#8b5cf6,#6366f1)',
          color: '#fff', fontWeight: 700, cursor: 'pointer',
        }}>{isLast ? '🎉 Complete' : 'Next →'}</button>
      )}
    </div>
  );
}

// ── MH Card ───────────────────────────────────────────────────────────────────
function MentalHealthCard({ card }: { card: MHCard }) {
  const [data, setData] = useState<DayData | null>(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [done, setDone] = useState(false);

  async function loadAndOpen() {
    if (!loading && !data) {
      setLoading(true);
      try {
        const res = await fetch(`/api/exercise?file=${card.file}&subdir=mental-health`);
        const json = await res.json();
        setData(json);
      } finally {
        setLoading(false);
      }
    }
    setOpen((o) => !o);
  }

  return (
    <div style={{
      background: 'rgba(10,10,30,0.8)',
      border: `1px solid ${card.color}30`,
      borderRadius: 14,
      overflow: 'hidden',
      transition: 'border-color 0.2s',
    }}>
      {/* Top accent */}
      <div style={{ height: 3, background: card.color }} />
      <div style={{ padding: '18px 18px 14px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 10 }}>
          <span style={{ fontSize: 26 }}>{card.icon}</span>
          <div style={{ flex: 1 }}>
            <h3 style={{ color: '#f1f5f9', fontWeight: 700, fontSize: 15, margin: '0 0 2px' }}>{card.label}</h3>
            <p style={{ color: '#64748b', fontSize: 12, direction: 'rtl', margin: 0 }}>{card.labelAr}</p>
          </div>
        </div>

        {data && (
          <p style={{ color: '#475569', fontSize: 12, margin: '0 0 12px', lineHeight: 1.5 }}>
            {data.description?.slice(0, 120)}…
          </p>
        )}

        <div style={{ display: 'flex', gap: 8 }}>
          <button
            onClick={loadAndOpen}
            style={{
              flex: 1, padding: '9px', borderRadius: 8, border: 'none',
              background: open ? `${card.color}22` : 'rgba(255,255,255,0.05)',
              color: open ? card.color : '#94a3b8',
              fontWeight: 700, fontSize: 13, cursor: 'pointer',
            }}
          >
            {loading ? '⏳ Loading…' : open ? '▲ Collapse' : '▼ View Details'}
          </button>
          {open && !playing && !done && (
            <button
              onClick={() => setPlaying(true)}
              style={{
                padding: '9px 14px', borderRadius: 8, border: 'none',
                background: card.color,
                color: '#fff', fontWeight: 700, fontSize: 13, cursor: 'pointer',
              }}
            >
              ▶ Start
            </button>
          )}
        </div>

        {/* Expanded */}
        {open && data && (
          <div style={{ marginTop: 12 }}>
            <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 10, padding: 12, marginBottom: 10 }}>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 6 }}>
                <span style={{ color: '#64748b', fontSize: 11 }}>⏱ {data.estimatedMinutes ?? '?'} min</span>
                <span style={{ color: '#64748b', fontSize: 11 }}>
                  {Array.from({ length: 5 }, (_, i) => (
                    <span key={i} style={{
                      display: 'inline-block', width: 7, height: 7, borderRadius: '50%',
                      background: i < (data.difficulty ?? 2) ? card.color : 'rgba(255,255,255,0.12)',
                      marginRight: 2,
                    }} />
                  ))}
                </span>
                <span style={{
                  background: `${card.color}22`, color: card.color,
                  padding: '1px 7px', borderRadius: 20, fontSize: 10,
                }}>
                  {(data.exercises as ExerciseItem[])?.length ?? 0} exercises
                </span>
              </div>
              <p style={{ color: '#475569', fontSize: 12, margin: 0, lineHeight: 1.5 }}>
                {data.descriptionAr}
              </p>
            </div>

            {playing && !done && (
              data.type === 'scenario-response' ? (
                <ScenarioResponsePlayer
                  title={data.title}
                  titleAr={data.titleAr}
                  source={data.source}
                  safetyNote={data.safetyNote}
                  safetyNoteAr={data.safetyNoteAr}
                  exercises={((data.exercises ?? []) as unknown) as ScenarioExercise[]}
                  lang="en"
                  onComplete={() => { setPlaying(false); setDone(true); }}
                />
              ) : (
                <MiniPlayer
                  exercises={(data.exercises as ExerciseItem[]) ?? []}
                  type={data.type}
                  onDone={() => { setPlaying(false); setDone(true); }}
                />
              )
            )}
            {done && (
              <div style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: 10, padding: 14, textAlign: 'center' }}>
                <span style={{ fontSize: 28 }}>🏆</span>
                <p style={{ color: '#10b981', fontWeight: 700, margin: '6px 0 0' }}>Exercise Complete!</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ── MIST-20 Assessment Panel ──────────────────────────────────────────────────
function MIST20Panel() {
  return (
    <div style={{
      background: 'linear-gradient(135deg,rgba(99,102,241,0.12),rgba(139,92,246,0.08))',
      border: '1px solid rgba(99,102,241,0.3)',
      borderRadius: 16, padding: 22, marginBottom: 28,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
        <span style={{ fontSize: 28 }}>🎓</span>
        <div>
          <h2 style={{ color: '#f1f5f9', fontWeight: 800, fontSize: 17, margin: 0 }}>
            Phase Entrance Test: MIST-20
          </h2>
          <p style={{ color: '#64748b', fontSize: 12, margin: '2px 0 0' }}>
            Misinformation Susceptibility Test — Required before Phase 1 content
          </p>
        </div>
      </div>
      <p style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.65, margin: '0 0 14px' }}>
        The MIST-20 is a validated 20-item instrument measuring individual susceptibility to misinformation.
        It presents true and false news headlines and measures your accuracy in distinguishing them.
        Your score establishes a baseline for tracking your cognitive immunity growth through Phase 1.
      </p>
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 10, padding: '10px 14px', flex: 1, minWidth: 140 }}>
          <p style={{ color: '#6366f1', fontWeight: 700, fontSize: 12, margin: '0 0 2px' }}>20 Items</p>
          <p style={{ color: '#475569', fontSize: 11, margin: 0 }}>Headlines to evaluate</p>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 10, padding: '10px 14px', flex: 1, minWidth: 140 }}>
          <p style={{ color: '#8b5cf6', fontWeight: 700, fontSize: 12, margin: '0 0 2px' }}>~10 min</p>
          <p style={{ color: '#475569', fontSize: 11, margin: 0 }}>Estimated time</p>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 10, padding: '10px 14px', flex: 1, minWidth: 140 }}>
          <p style={{ color: '#ec4899', fontWeight: 700, fontSize: 12, margin: '0 0 2px' }}>Validated</p>
          <p style={{ color: '#475569', fontSize: 11, margin: 0 }}>Peer-reviewed instrument</p>
        </div>
      </div>
      <Link
        href="/instruments/mist"
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          marginTop: 16, padding: '11px 20px', borderRadius: 10,
          background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
          color: '#fff', fontWeight: 700, fontSize: 14, textDecoration: 'none',
        }}
      >
        Take MIST-20 Now →
      </Link>
      <PageNavigation currentPath="/curriculum/phase1" />
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function Phase1Page() {
  return (
    <main style={{ minHeight: '100vh', background: '#040816', padding: '48px 16px' }}>
      <div style={{ maxWidth: 960, margin: '0 auto' }}>

        {/* Header */}
        <div style={{ marginBottom: 36, borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
            <span style={{
              background: 'rgba(139,92,246,0.2)', color: '#a78bfa',
              padding: '3px 12px', borderRadius: 20, fontSize: 11, fontWeight: 700,
            }}>
              PHASE 1 — WEEKS 5–8
            </span>
          </div>
          <h1 style={{
            fontSize: 'clamp(28px, 5vw, 42px)',
            fontWeight: 900,
            background: 'linear-gradient(135deg,#8b5cf6,#6366f1,#06b6d4)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            margin: '8px 0',
            lineHeight: 1.15,
          }}>
            Cognitive Immunity
          </h1>
          <p style={{ color: '#94a3b8', fontSize: 16, direction: 'rtl', margin: '0 0 8px' }}>
            المناعة المعرفية
          </p>
          <p style={{ color: '#64748b', fontSize: 14, lineHeight: 1.7, maxWidth: 680 }}>
            Phase 1 builds your cognitive immune system against manipulation. You will master
            logical fallacy detection, cognitive bias recognition, emotional regulation under
            information stress, and mental health literacy — all grounded in Egyptian social
            and cultural contexts.
          </p>
        </div>

        {/* MIST-20 Entrance Test */}
        <MIST20Panel />

        {/* Phase Tools */}
        <section style={{ marginBottom: 36 }}>
          <h2 style={{ color: '#f1f5f9', fontWeight: 800, fontSize: 18, margin: '0 0 16px' }}>
            🛠️ Phase 1 Tools & Experiences
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
            gap: 12,
          }}>
            {PHASE_LINKS.map((link) => (
              <Link key={link.href} href={link.href} style={{ textDecoration: 'none' }}>
                <div style={{
                  background: 'rgba(10,10,30,0.8)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: 12, padding: '16px',
                  transition: 'border-color 0.2s, transform 0.15s',
                  cursor: 'pointer',
                }}>
                  <div style={{ fontSize: 24, marginBottom: 8 }}>{link.icon}</div>
                  <p style={{ color: '#f1f5f9', fontWeight: 700, margin: '0 0 2px', fontSize: 14 }}>{link.label}</p>
                  <p style={{ color: '#64748b', fontSize: 11, direction: 'rtl', margin: '0 0 6px' }}>{link.labelAr}</p>
                  <p style={{ color: '#475569', fontSize: 12, margin: 0 }}>{link.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Mental Health Exercises */}
        <section>
          <div style={{ marginBottom: 16 }}>
            <h2 style={{ color: '#f1f5f9', fontWeight: 800, fontSize: 18, margin: '0 0 4px' }}>
              🧠 Mental Health Literacy Exercises
            </h2>
            <p style={{ color: '#64748b', fontSize: 12, margin: 0, direction: 'rtl' }}>
              تمارين ثقافة الصحة النفسية
            </p>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: 16,
          }}>
            {MH_CARDS.map((card) => (
              <MentalHealthCard key={card.id} card={card} />
            ))}
          </div>
        </section>

        {/* Navigation */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', marginTop: 40,
          borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 24,
          flexWrap: 'wrap', gap: 12,
        }}>
          <Link href="/curriculum/phase0" style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '10px 18px', borderRadius: 10,
            border: '1px solid rgba(255,255,255,0.1)',
            color: '#94a3b8', textDecoration: 'none', fontSize: 13,
          }}>
            ← Phase 0: Calibration
          </Link>
          <Link href="/curriculum/phase2" style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '10px 18px', borderRadius: 10,
            background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
            color: '#fff', textDecoration: 'none', fontSize: 13, fontWeight: 700,
          }}>
            Phase 2: Science → 
          </Link>
        </div>

      </div>
    </main>
  );
}
