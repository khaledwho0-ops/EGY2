'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { SCIENCE_EXERCISES, DIFFICULTY_LABELS, DIFFICULTY_COLORS } from '@/data/exercises/science/index';

type FilterMode = 'all' | 'beginner' | 'intermediate' | 'advanced';

function getDiffGroup(d: number): FilterMode {
  if (d <= 2) return 'beginner';
  if (d === 3) return 'intermediate';
  return 'advanced';
}

interface ExerciseItem {
  id: number | string;
  prompt?: string;
  options?: string[];
  correctAnswer?: number;
  explanation?: string;
}

interface ScienceData {
  title?: string;
  statisticalConcept?: { name?: string; nameAr?: string; definition?: string };
  exercises?: ExerciseItem[];
  estimatedMinutes?: number;
  difficulty?: number;
}

// ── Mini player ───────────────────────────────────────────────────────────────
function QuickPlayer({ exercises, onDone }: { exercises: ExerciseItem[]; onDone: () => void }) {
  const [idx, setIdx] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);

  const ex = exercises[idx];
  if (!ex) return null;
  const isLast = idx === exercises.length - 1;
  const hasOptions = Array.isArray(ex.options) && ex.options.length > 0;

  function pick(i: number) {
    if (answered) return;
    setSelected(i);
    setAnswered(true);
    if (ex.correctAnswer === i) setScore((s) => s + 1);
  }

  function next() {
    if (isLast) { onDone(); return; }
    setIdx((i) => i + 1);
    setAnswered(false);
    setSelected(null);
  }

  return (
    <div style={{ marginTop: 10, padding: 14, background: 'rgba(0,0,0,0.5)', borderRadius: 10, border: '1px solid rgba(234,179,8,0.25)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
        <span style={{ color: '#64748b', fontSize: 11 }}>{idx + 1}/{exercises.length}</span>
        <span style={{ color: '#eab308', fontSize: 11, fontWeight: 700 }}>Score {score}</span>
      </div>
      <div style={{ height: 2, background: 'rgba(255,255,255,0.07)', borderRadius: 2, marginBottom: 12 }}>
        <div style={{ height: '100%', width: `${(idx / exercises.length) * 100}%`, background: '#eab308', borderRadius: 2 }} />
      </div>
      <p style={{ color: '#e2e8f0', fontSize: 13, lineHeight: 1.55, marginBottom: 10 }}>{ex.prompt}</p>
      {hasOptions && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {ex.options!.map((opt, i) => {
            const isCorrect = ex.correctAnswer === i;
            return (
              <button key={i} onClick={() => pick(i)} style={{
                padding: '9px 12px', borderRadius: 8, fontSize: 12, textAlign: 'left',
                cursor: answered ? 'default' : 'pointer',
                background: !answered ? 'rgba(255,255,255,0.04)' : isCorrect ? 'rgba(34,197,94,0.16)' : selected === i ? 'rgba(239,68,68,0.1)' : 'rgba(255,255,255,0.02)',
                border: !answered ? '1px solid rgba(255,255,255,0.07)' : isCorrect ? '1px solid #22c55e' : selected === i ? '1px solid rgba(239,68,68,0.3)' : '1px solid rgba(255,255,255,0.03)',
                color: '#e2e8f0',
              }}>{opt}</button>
            );
          })}
        </div>
      )}
      {answered && ex.explanation && (
        <div style={{ background: 'rgba(16,185,129,0.07)', border: '1px solid rgba(16,185,129,0.18)', borderRadius: 8, padding: 10, marginTop: 10 }}>
          <p style={{ color: '#10b981', fontSize: 11, fontWeight: 700, margin: '0 0 3px' }}>💡</p>
          <p style={{ color: '#94a3b8', fontSize: 11, margin: 0, lineHeight: 1.55 }}>{ex.explanation}</p>
        </div>
      )}
      {(answered || !hasOptions) && (
        <button onClick={next} style={{
          marginTop: 10, width: '100%', padding: '10px', borderRadius: 8, border: 'none',
          background: 'linear-gradient(135deg,#eab308,#f97316)',
          color: '#000', fontWeight: 700, cursor: 'pointer', fontSize: 13,
        }}>{isLast ? '🎉 Complete' : 'Next →'}</button>
      )}
    </div>
  );
}

// ── Row card ──────────────────────────────────────────────────────────────────
function ExerciseRow({
  meta,
  isCompleted,
  onComplete,
}: {
  meta: typeof SCIENCE_EXERCISES[0];
  isCompleted: boolean;
  onComplete: (id: string) => void;
}) {
  const [data, setData] = useState<ScienceData | null>(null);
  const [loading, setLoading] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [done, setDone] = useState(isCompleted);
  const diffColor = DIFFICULTY_COLORS[meta.difficulty] ?? '#94a3b8';

  async function launch() {
    if (!data && !loading) {
      setLoading(true);
      try {
        const res = await fetch(`/api/exercise?file=${meta.file}&subdir=science`);
        const json = await res.json();
        setData(json);
      } finally {
        setLoading(false);
      }
    }
    setPlaying(true);
  }

  return (
    <div style={{
      background: done ? 'rgba(16,185,129,0.05)' : 'rgba(10,10,25,0.7)',
      border: done ? '1px solid rgba(16,185,129,0.2)' : '1px solid rgba(255,255,255,0.06)',
      borderRadius: 10,
      padding: '13px 14px',
      transition: 'border-color 0.2s',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
        {/* Day + name */}
        <span style={{ color: '#475569', fontSize: 11, minWidth: 48, fontWeight: 700 }}>Day {meta.day}</span>
        <div style={{ flex: 1, minWidth: 160 }}>
          <p style={{ color: '#f1f5f9', fontSize: 13, fontWeight: 700, margin: 0, lineHeight: 1.3 }}>
            {data?.statisticalConcept?.name ?? meta.id.replace(/_/g, ' ')}
          </p>
          {data?.statisticalConcept?.nameAr && (
            <p style={{ color: '#475569', fontSize: 11, direction: 'rtl', margin: 0 }}>
              {data.statisticalConcept.nameAr}
            </p>
          )}
        </div>
        {/* Diff badge */}
        <span style={{
          background: `${diffColor}18`, color: diffColor,
          padding: '2px 8px', borderRadius: 20, fontSize: 10, fontWeight: 700,
        }}>
          {DIFFICULTY_LABELS[meta.difficulty]}
        </span>
        {/* Action */}
        {done ? (
          <span style={{ color: '#10b981', fontSize: 12, fontWeight: 700 }}>✅</span>
        ) : (
          <button onClick={launch} disabled={loading} style={{
            padding: '6px 12px', borderRadius: 7, border: 'none',
            background: loading ? 'rgba(255,255,255,0.05)' : `${diffColor}25`,
            color: loading ? '#64748b' : diffColor,
            fontWeight: 700, fontSize: 12, cursor: loading ? 'default' : 'pointer',
          }}>
            {loading ? '⏳' : '▶ Start'}
          </button>
        )}
      </div>

      {/* Inline player */}
      {playing && data?.exercises && (
        <QuickPlayer
          exercises={data.exercises}
          onDone={() => { setPlaying(false); setDone(true); onComplete(meta.id); }}
        />
      )}
    </div>
  );
}

// ── Main exported component ───────────────────────────────────────────────────
export function ScienceExerciseTracker() {
  const [filter, setFilter] = useState<FilterMode>('all');
  const [completed, setCompleted] = useState<Set<string>>(new Set());

  useEffect(() => {
    try {
      const raw = localStorage.getItem('egy-phase2-progress');
      if (raw) setCompleted(new Set(JSON.parse(raw)));
    } catch { /* noop */ }
  }, []);

  function markComplete(id: string) {
    setCompleted((prev) => {
      const next = new Set(prev);
      next.add(id);
      try { localStorage.setItem('egy-phase2-progress', JSON.stringify([...next])); } catch { /* noop */ }
      return next;
    });
  }

  const filtered = SCIENCE_EXERCISES.filter((ex) =>
    filter === 'all' || getDiffGroup(ex.difficulty) === filter
  );

  const completionPct = Math.round((completed.size / SCIENCE_EXERCISES.length) * 100);

  // Find next uncompleted
  const nextUncompleted = SCIENCE_EXERCISES.find((ex) => !completed.has(ex.id));

  const FILTER_TABS: { key: FilterMode; label: string; color: string }[] = [
    { key: 'all', label: 'All', color: '#94a3b8' },
    { key: 'beginner', label: 'Beginner', color: '#22c55e' },
    { key: 'intermediate', label: 'Intermediate', color: '#eab308' },
    { key: 'advanced', label: 'Advanced', color: '#f97316' },
  ];

  return (
    <section style={{
      marginTop: 32,
      border: '1px solid rgba(234,179,8,0.2)',
      borderRadius: 20,
      padding: 24,
      background: 'linear-gradient(180deg,rgba(234,179,8,0.04) 0%,transparent 100%)',
    }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
        <div style={{ flex: 1 }}>
          <h2 style={{ color: '#f1f5f9', fontWeight: 800, fontSize: 18, margin: '0 0 4px' }}>
            📊 Statistical Literacy Exercises
          </h2>
          <p style={{ color: '#64748b', fontSize: 12, margin: 0 }}>
            33 research-integrity modules from p-hacking to causal inference
          </p>
        </div>
        <Link href="/curriculum/phase2" style={{
          padding: '8px 14px', borderRadius: 9, border: '1px solid rgba(234,179,8,0.3)',
          color: '#fde047', textDecoration: 'none', fontSize: 12, fontWeight: 700,
        }}>
          Full Phase 2 →
        </Link>
      </div>

      {/* Progress bar */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
          <span style={{ color: '#64748b', fontSize: 12 }}>Progress</span>
          <span style={{ color: '#eab308', fontWeight: 700, fontSize: 12 }}>
            {completed.size}/33 ({completionPct}%)
          </span>
        </div>
        <div style={{ height: 6, background: 'rgba(255,255,255,0.07)', borderRadius: 3 }}>
          <div style={{
            height: '100%', borderRadius: 3,
            width: `${completionPct}%`,
            background: 'linear-gradient(90deg,#eab308,#f97316)',
            transition: 'width 0.5s',
          }} />
        </div>
      </div>

      {/* Start Next button */}
      {nextUncompleted && (
        <div style={{ marginBottom: 16, padding: 12, background: 'rgba(234,179,8,0.07)', borderRadius: 10, display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ color: '#eab308', fontSize: 22 }}>⚡</span>
          <div style={{ flex: 1 }}>
            <p style={{ color: '#f1f5f9', fontWeight: 700, fontSize: 13, margin: '0 0 2px' }}>
              Next up: Day {nextUncompleted.day} — {nextUncompleted.id.replace(/_/g, ' ')}
            </p>
            <p style={{ color: '#64748b', fontSize: 11, margin: 0 }}>
              {DIFFICULTY_LABELS[nextUncompleted.difficulty]} · Click Start Next Exercise below
            </p>
          </div>
        </div>
      )}

      {/* Filter tabs */}
      <div style={{ display: 'flex', gap: 7, marginBottom: 16, flexWrap: 'wrap' }}>
        {FILTER_TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            style={{
              padding: '5px 12px', borderRadius: 20, border: 'none',
              background: filter === tab.key ? `${tab.color}22` : 'rgba(255,255,255,0.04)',
              color: filter === tab.key ? tab.color : '#64748b',
              fontWeight: filter === tab.key ? 700 : 400,
              fontSize: 12, cursor: 'pointer',
              outline: filter === tab.key ? `1px solid ${tab.color}50` : 'none',
              transition: 'all 0.2s',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Exercise list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxHeight: 480, overflowY: 'auto', paddingRight: 2 }}>
        {filtered.map((ex) => (
          <ExerciseRow
            key={ex.id}
            meta={ex}
            isCompleted={completed.has(ex.id)}
            onComplete={markComplete}
          />
        ))}
      </div>
    </section>
  );
}
