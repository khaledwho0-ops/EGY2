'use client';

import React, { useState, useEffect, useCallback } from 'react';

// ── Types ────────────────────────────────────────────────────────────────────
interface Exercise {
  id: number | string;
  // calibration / trust / claim-based
  claim?: string;
  claimAr?: string;
  prompt?: string;
  promptAr?: string;
  options?: string[];
  correctAnswer?: number | boolean;
  explanation?: string;
  explanationAr?: string;
  truthValue?: string;
  correctAssessment?: string;
  reliabilityScore?: number;
  redFlags?: string[];
  // breathing
  triggerContent?: string;
  triggerContentAr?: string;
  calmPrompt?: string;
  reflectionQuestions?: string[];
  // osint
  title?: string;
  titleAr?: string;
  investigationSteps?: string[];
  toolsToUse?: string[];
  correctFindings?: string;
  // myth-bust
  myth_en?: string;
  myth_ar?: string;
  explanation_en?: string;
  explanation_ar?: string;
}

interface DayData {
  id: string;
  day: number;
  title: string;
  titleAr: string;
  description?: string;
  descriptionAr?: string;
  type: string;
  difficulty: number;
  estimatedMinutes: number;
  exercises: Exercise[];
}

// ── Day config ────────────────────────────────────────────────────────────────
const DAY_FILES = [
  { file: 'day1_calibration.json', label: 'Day 1', color: '#6366f1' },
  { file: 'day2_trust_battery_sprint1.json', label: 'Day 2', color: '#8b5cf6' },
  { file: 'day3_thumbnail_traps.json', label: 'Day 3', color: '#a855f7' },
  { file: 'day4_emotion_vs_evidence.json', label: 'Day 4', color: '#d946ef' },
  { file: 'day5_calm_breath.json', label: 'Day 5', color: '#06b6d4' },
  { file: 'day6_help_seeking_intro.json', label: 'Day 6', color: '#10b981' },
  { file: 'day7_deepreal_teaser.json', label: 'Day 7', color: '#f59e0b' },
];

const TYPE_ICONS: Record<string, string> = {
  calibration: '🎯',
  trust: '🔒',
  thumbnail: '🖼️',
  emotion: '❤️‍🔥',
  breathing: '🌬️',
  help: '🤝',
  osint: '🔍',
};

function difficultyDots(d: number) {
  return Array.from({ length: 5 }, (_, i) => (
    <span key={i} style={{
      display: 'inline-block', width: 8, height: 8, borderRadius: '50%',
      background: i < d ? '#6366f1' : 'rgba(255,255,255,0.15)',
      marginRight: 2,
    }} />
  ));
}

// ── Exercise Player ───────────────────────────────────────────────────────────
function ExercisePlayer({
  exercises,
  dayId,
  type,
  onComplete,
}: {
  exercises: Exercise[];
  dayId: string;
  type: string;
  onComplete: () => void;
}) {
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);

  const ex = exercises[idx];
  const isLast = idx === exercises.length - 1;

  // Determine prompt text
  const promptText =
    ex.claim ?? ex.prompt ?? ex.triggerContent ?? ex.title ?? ex.myth_en ?? '';

  // Determine options (for MC exercises)
  const hasOptions = Array.isArray(ex.options) && ex.options.length > 0;

  // Determine explanation
  const explanationText =
    ex.explanation ?? ex.explanation_en ?? ex.correctFindings ?? '';

  function handleSelect(i: number) {
    if (answered) return;
    setSelected(i);
    setAnswered(true);
    if (ex.correctAnswer === i) setScore((s) => s + 1);
  }

  function handleTruthVote(val: 'true' | 'false' | 'misleading') {
    if (answered) return;
    setAnswered(true);
    if (ex.truthValue === val) setScore((s) => s + 1);
  }

  function handleNext() {
    if (isLast) {
      onComplete();
      return;
    }
    setIdx((i) => i + 1);
    setSelected(null);
    setAnswered(false);
  }

  // Breathing / OSINT / generic continue
  const isBreathing = type === 'breathing' || !!ex.triggerContent;
  const isOsint = type === 'osint' || !!ex.investigationSteps;
  const isTruth = ex.truthValue !== undefined;
  const isMythBust = !!ex.myth_en || !!ex.myth_ar;

  return (
    <div style={{
      background: 'rgba(15,23,42,0.9)',
      border: '1px solid rgba(99,102,241,0.3)',
      borderRadius: 16,
      padding: 24,
      marginTop: 16,
    }}>
      {/* Progress */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <span style={{ color: '#94a3b8', fontSize: 13 }}>
          Exercise {idx + 1} / {exercises.length}
        </span>
        <span style={{ color: '#6366f1', fontWeight: 700, fontSize: 13 }}>
          Score: {score}/{exercises.length}
        </span>
      </div>
      <div style={{
        height: 4, background: 'rgba(255,255,255,0.07)', borderRadius: 2, marginBottom: 20,
      }}>
        <div style={{
          height: '100%',
          width: `${((idx) / exercises.length) * 100}%`,
          background: 'linear-gradient(90deg,#6366f1,#8b5cf6)',
          borderRadius: 2,
          transition: 'width 0.4s',
        }} />
      </div>

      {/* Prompt */}
      <div style={{
        background: 'rgba(99,102,241,0.08)',
        border: '1px solid rgba(99,102,241,0.2)',
        borderRadius: 12,
        padding: 16,
        marginBottom: 20,
      }}>
        {(ex.myth_ar || ex.myth_en) && (
          <p style={{ color: '#f1f5f9', fontSize: 17, fontWeight: 700, marginBottom: 8, direction: 'rtl' }}>
            {ex.myth_ar}
          </p>
        )}
        <p style={{ color: '#e2e8f0', fontSize: 15, lineHeight: 1.65, margin: 0 }}>
          {promptText}
        </p>
        {ex.claimAr && (
          <p style={{ color: '#94a3b8', fontSize: 13, marginTop: 8, direction: 'rtl', margin: '8px 0 0' }}>
            {ex.claimAr}
          </p>
        )}
      </div>

      {/* Multiple choice */}
      {hasOptions && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {ex.options!.map((opt, i) => {
            const isCorrect = ex.correctAnswer === i;
            const bg = !answered
              ? 'rgba(255,255,255,0.04)'
              : isCorrect
              ? 'rgba(34,197,94,0.2)'
              : selected === i
              ? 'rgba(239,68,68,0.2)'
              : 'rgba(255,255,255,0.02)';
            const border = !answered
              ? '1px solid rgba(255,255,255,0.1)'
              : isCorrect
              ? '1px solid #22c55e'
              : selected === i
              ? '1px solid #ef4444'
              : '1px solid rgba(255,255,255,0.06)';
            return (
              <button
                key={i}
                onClick={() => handleSelect(i)}
                style={{
                  background: bg,
                  border,
                  borderRadius: 10,
                  padding: '12px 16px',
                  color: '#e2e8f0',
                  textAlign: 'left',
                  cursor: answered ? 'default' : 'pointer',
                  fontSize: 14,
                  lineHeight: 1.5,
                  transition: 'all 0.2s',
                }}
              >
                {opt}
              </button>
            );
          })}
        </div>
      )}

      {/* Truth vote (calibration / trust exercises) */}
      {!hasOptions && isTruth && !isBreathing && !isOsint && (
        <div style={{ display: 'flex', gap: 10 }}>
          {(['true', 'misleading', 'false'] as const).map((v) => {
            const colors: Record<string, string> = { true: '#22c55e', misleading: '#eab308', false: '#ef4444' };
            const labels: Record<string, string> = { true: '✓ True', misleading: '⚠ Misleading', false: '✗ False' };
            const isCorrectVote = ex.truthValue === v;
            return (
              <button
                key={v}
                onClick={() => handleTruthVote(v)}
                style={{
                  flex: 1,
                  padding: '12px 8px',
                  borderRadius: 10,
                  border: answered && isCorrectVote
                    ? `2px solid ${colors[v]}`
                    : '1px solid rgba(255,255,255,0.12)',
                  background: answered && isCorrectVote
                    ? `${colors[v]}22`
                    : 'rgba(255,255,255,0.04)',
                  color: colors[v],
                  fontWeight: 700,
                  cursor: answered ? 'default' : 'pointer',
                  fontSize: 14,
                  transition: 'all 0.2s',
                }}
              >
                {labels[v]}
              </button>
            );
          })}
        </div>
      )}

      {/* Myth bust (correctAnswer is bool) */}
      {isMythBust && !hasOptions && !isTruth && (
        <div style={{ display: 'flex', gap: 10 }}>
          {[{ label: '✓ True', val: true }, { label: '✗ False', val: false }].map(({ label, val }) => {
            const col = val ? '#22c55e' : '#ef4444';
            return (
              <button key={String(val)} onClick={() => {
                if (!answered) { setAnswered(true); if (ex.correctAnswer === val) setScore(s => s + 1); }
              }} style={{
                flex: 1, padding: '12px 8px', borderRadius: 10,
                border: answered && ex.correctAnswer === val ? `2px solid ${col}` : '1px solid rgba(255,255,255,0.12)',
                background: answered && ex.correctAnswer === val ? `${col}22` : 'rgba(255,255,255,0.04)',
                color: col, fontWeight: 700, cursor: answered ? 'default' : 'pointer', fontSize: 14,
              }}>
                {label}
              </button>
            );
          })}
        </div>
      )}

      {/* Breathing exercise */}
      {isBreathing && (
        <div style={{ background: 'rgba(6,182,212,0.1)', border: '1px solid rgba(6,182,212,0.3)', borderRadius: 12, padding: 16 }}>
          <p style={{ color: '#06b6d4', fontWeight: 700, margin: '0 0 8px' }}>🌬️ Breathing Exercise</p>
          <p style={{ color: '#94a3b8', margin: 0, fontSize: 14 }}>{ex.calmPrompt}</p>
          {ex.reflectionQuestions && (
            <ul style={{ color: '#cbd5e1', fontSize: 13, marginTop: 10, paddingLeft: 18 }}>
              {ex.reflectionQuestions.map((q, i) => <li key={i} style={{ marginBottom: 4 }}>{q}</li>)}
            </ul>
          )}
        </div>
      )}

      {/* OSINT steps */}
      {isOsint && ex.investigationSteps && (
        <div style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.3)', borderRadius: 12, padding: 16 }}>
          <p style={{ color: '#f59e0b', fontWeight: 700, margin: '0 0 10px' }}>🔍 Investigation Steps</p>
          <ol style={{ color: '#cbd5e1', fontSize: 13, paddingLeft: 18, margin: 0 }}>
            {ex.investigationSteps.map((s, i) => <li key={i} style={{ marginBottom: 4 }}>{s}</li>)}
          </ol>
          {ex.toolsToUse && (
            <div style={{ marginTop: 12 }}>
              <p style={{ color: '#94a3b8', fontSize: 12, margin: '0 0 6px' }}>Tools:</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {ex.toolsToUse.map((t, i) => (
                  <span key={i} style={{
                    background: 'rgba(245,158,11,0.15)', color: '#fcd34d',
                    padding: '2px 8px', borderRadius: 20, fontSize: 11,
                  }}>{t}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Explanation */}
      {answered && explanationText && (
        <div style={{
          background: 'rgba(16,185,129,0.08)',
          border: '1px solid rgba(16,185,129,0.25)',
          borderRadius: 12,
          padding: 14,
          marginTop: 14,
        }}>
          <p style={{ color: '#10b981', fontWeight: 700, margin: '0 0 6px' }}>💡 Explanation</p>
          <p style={{ color: '#94a3b8', fontSize: 13, margin: 0, lineHeight: 1.6 }}>
            {explanationText}
          </p>
          {(ex.explanationAr || ex.explanation_ar) && (
            <p style={{ color: '#64748b', fontSize: 12, marginTop: 8, direction: 'rtl', lineHeight: 1.6 }}>
              {ex.explanationAr ?? ex.explanation_ar}
            </p>
          )}
          {ex.redFlags && (
            <ul style={{ color: '#f97316', fontSize: 12, marginTop: 8, paddingLeft: 16 }}>
              {ex.redFlags.map((f, i) => <li key={i}>⚠ {f}</li>)}
            </ul>
          )}
          {ex.correctFindings && (
            <p style={{ color: '#22c55e', fontSize: 13, marginTop: 8 }}>✓ {ex.correctFindings}</p>
          )}
        </div>
      )}

      {/* Next / Finish */}
      {(answered || isBreathing || isOsint) && (
        <button
          onClick={handleNext}
          style={{
            marginTop: 16,
            width: '100%',
            padding: '13px',
            borderRadius: 10,
            border: 'none',
            background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
            color: '#fff',
            fontWeight: 700,
            fontSize: 15,
            cursor: 'pointer',
            transition: 'opacity 0.2s',
          }}
        >
          {isLast ? '🎉 Complete Day' : 'Next Exercise →'}
        </button>
      )}
    </div>
  );
}

// ── Completion Banner ─────────────────────────────────────────────────────────
function CompletionBanner({ title, onClose }: { title: string; onClose: () => void }) {
  return (
    <div style={{
      background: 'linear-gradient(135deg,rgba(16,185,129,0.2),rgba(99,102,241,0.2))',
      border: '1px solid rgba(16,185,129,0.4)',
      borderRadius: 16,
      padding: 24,
      textAlign: 'center',
      marginTop: 16,
    }}>
      <div style={{ fontSize: 48, marginBottom: 10 }}>🏆</div>
      <h3 style={{ color: '#10b981', fontWeight: 800, fontSize: 20, margin: '0 0 8px' }}>
        Day Complete!
      </h3>
      <p style={{ color: '#94a3b8', margin: '0 0 16px' }}>{title} finished. Great work!</p>
      <button onClick={onClose} style={{
        padding: '10px 24px', borderRadius: 10, border: 'none',
        background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
        color: '#fff', fontWeight: 700, cursor: 'pointer',
      }}>
        ← Back to Week
      </button>
    </div>
  );
}

// ── Main Dashboard ────────────────────────────────────────────────────────────
export const Phase0Dashboard: React.FC = () => {
  const [days, setDays] = useState<DayData[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeDay, setActiveDay] = useState<DayData | null>(null);
  const [completed, setCompleted] = useState<Set<string>>(new Set());
  const [showPlayer, setShowPlayer] = useState(false);
  const [dayComplete, setDayComplete] = useState(false);

  // Load progress from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem('egy-phase0-progress');
      if (raw) setCompleted(new Set(JSON.parse(raw)));
    } catch { /* noop */ }
  }, []);

  // Load all day JSON files
  useEffect(() => {
    Promise.all(
      DAY_FILES.map(({ file }) =>
        fetch(`/api/exercise?file=${file}`)
          .then((r) => r.json())
          .catch(() => null)
      )
    ).then((results) => {
      setDays(results.filter(Boolean) as DayData[]);
      setLoading(false);
    });
  }, []);

  const saveProgress = useCallback((id: string) => {
    setCompleted((prev) => {
      const next = new Set(prev);
      next.add(id);
      try { localStorage.setItem('egy-phase0-progress', JSON.stringify([...next])); } catch { /* noop */ }
      return next;
    });
  }, []);

  const completionPct = days.length
    ? Math.round((completed.size / days.length) * 100)
    : 0;

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 0', color: '#6366f1' }}>
        <div style={{ fontSize: 40, marginBottom: 12 }}>⚡</div>
        <p style={{ color: '#94a3b8' }}>Loading Phase 0 curriculum…</p>
      </div>
    );
  }

  // Active day player view
  if (activeDay) {
    return (
      <div>
        <button
          onClick={() => { setActiveDay(null); setShowPlayer(false); setDayComplete(false); }}
          style={{
            background: 'none', border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: 8, color: '#94a3b8', cursor: 'pointer',
            padding: '8px 16px', marginBottom: 16, fontSize: 13,
          }}
        >
          ← Back to Week
        </button>

        {/* Day header */}
        <div style={{
          background: 'rgba(99,102,241,0.1)',
          border: '1px solid rgba(99,102,241,0.25)',
          borderRadius: 16, padding: 20, marginBottom: 8,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
            <span style={{ fontSize: 28 }}>
              {TYPE_ICONS[activeDay.type] ?? '📘'}
            </span>
            <div>
              <h2 style={{ color: '#f1f5f9', fontWeight: 800, fontSize: 20, margin: 0 }}>
                {activeDay.title}
              </h2>
              <p style={{ color: '#94a3b8', margin: '4px 0 0', direction: 'rtl', fontSize: 14 }}>
                {activeDay.titleAr}
              </p>
            </div>
          </div>
          <p style={{ color: '#64748b', fontSize: 13, margin: '0 0 10px' }}>
            {activeDay.description}
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <span style={{ color: '#6366f1', fontSize: 12 }}>
              ⏱ {activeDay.estimatedMinutes} min
            </span>
            <span style={{ color: '#94a3b8', fontSize: 12 }}>
              {difficultyDots(activeDay.difficulty)} Difficulty
            </span>
            <span style={{ color: '#94a3b8', fontSize: 12, textTransform: 'capitalize' }}>
              {activeDay.type}
            </span>
          </div>
        </div>

        {/* Player / Complete */}
        {dayComplete ? (
          <CompletionBanner
            title={activeDay.title}
            onClose={() => { setActiveDay(null); setShowPlayer(false); setDayComplete(false); }}
          />
        ) : !showPlayer ? (
          <button
            onClick={() => setShowPlayer(true)}
            style={{
              marginTop: 12, width: '100%', padding: '14px',
              borderRadius: 12, border: 'none',
              background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
              color: '#fff', fontWeight: 800, fontSize: 16, cursor: 'pointer',
            }}
          >
            ▶ Start {activeDay.exercises.length} Exercises
          </button>
        ) : (
          <ExercisePlayer
            exercises={activeDay.exercises}
            dayId={activeDay.id}
            type={activeDay.type}
            onComplete={() => {
              saveProgress(activeDay.id);
              setDayComplete(true);
              setShowPlayer(false);
            }}
          />
        )}
      </div>
    );
  }

  // Week grid view
  return (
    <div>
      {/* Header stats */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 16,
        background: 'rgba(99,102,241,0.08)',
        border: '1px solid rgba(99,102,241,0.2)',
        borderRadius: 14, padding: '14px 20px', marginBottom: 24,
        flexWrap: 'wrap',
      }}>
        <div style={{ flex: 1 }}>
          <p style={{ color: '#94a3b8', fontSize: 12, margin: '0 0 4px' }}>
            Phase 0 — Psychological Calibration (Weeks 1–4)
          </p>
          <div style={{ height: 6, background: 'rgba(255,255,255,0.07)', borderRadius: 3, maxWidth: 300 }}>
            <div style={{
              height: '100%', borderRadius: 3,
              width: `${completionPct}%`,
              background: 'linear-gradient(90deg,#6366f1,#10b981)',
              transition: 'width 0.5s',
            }} />
          </div>
          <p style={{ color: '#6366f1', fontWeight: 700, fontSize: 13, margin: '4px 0 0' }}>
            {completionPct}% complete ({completed.size}/{days.length} days)
          </p>
        </div>
      </div>

      {/* 7-day grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: 16,
      }}>
        {days.map((day, i) => {
          const isComplete = completed.has(day.id);
          const config = DAY_FILES[i];
          return (
            <button
              key={day.id}
              onClick={() => { setActiveDay(day); setShowPlayer(false); setDayComplete(false); }}
              style={{
                background: isComplete
                  ? 'rgba(16,185,129,0.08)'
                  : 'rgba(15,23,42,0.8)',
                border: isComplete
                  ? '1px solid rgba(16,185,129,0.3)'
                  : `1px solid rgba(255,255,255,0.08)`,
                borderRadius: 14,
                padding: '18px 18px 14px',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.25s',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Accent bar */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: 3,
                background: isComplete
                  ? '#10b981'
                  : config?.color ?? '#6366f1',
                borderRadius: '14px 14px 0 0',
              }} />

              {/* Day badge */}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                <span style={{
                  background: isComplete ? 'rgba(16,185,129,0.2)' : 'rgba(99,102,241,0.2)',
                  color: isComplete ? '#10b981' : '#818cf8',
                  padding: '2px 10px', borderRadius: 20, fontSize: 11, fontWeight: 700,
                }}>
                  Day {day.day}
                </span>
                <span style={{ fontSize: 20 }}>
                  {isComplete ? '✅' : (TYPE_ICONS[day.type] ?? '📘')}
                </span>
              </div>

              <h3 style={{ color: '#f1f5f9', fontWeight: 700, fontSize: 15, margin: '0 0 4px', lineHeight: 1.3 }}>
                {day.title}
              </h3>
              <p style={{ color: '#64748b', fontSize: 12, direction: 'rtl', margin: '0 0 12px', textAlign: 'right' }}>
                {day.titleAr}
              </p>
              <p style={{ color: '#475569', fontSize: 12, margin: '0 0 12px', lineHeight: 1.5, minHeight: 36 }}>
                {day.description?.slice(0, 100)}
                {(day.description?.length ?? 0) > 100 ? '…' : ''}
              </p>

              <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
                <span style={{ color: '#64748b', fontSize: 11 }}>⏱ {day.estimatedMinutes}m</span>
                <span style={{ color: '#64748b', fontSize: 11 }}>{difficultyDots(day.difficulty)}</span>
                <span style={{
                  marginLeft: 'auto',
                  background: 'rgba(99,102,241,0.15)', color: '#818cf8',
                  padding: '2px 8px', borderRadius: 20, fontSize: 10, textTransform: 'capitalize',
                }}>
                  {day.exercises.length} exercises
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
