'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { SCIENCE_EXERCISES, DIFFICULTY_LABELS, DIFFICULTY_COLORS } from '@/data/exercises/science/index';
import { PageNavigation } from '@/components/shared/page-navigation';
import ToolGuide from '@/components/ToolGuide';
import { useRTL } from '@/components/shared/rtl-provider';

// ── Types ─────────────────────────────────────────────────────────────────────
interface StatConcept {
  name?: string;
  nameAr?: string;
  definition?: string;
}

interface ExerciseItem {
  id: number | string;
  prompt?: string;
  promptAr?: string;
  options?: string[];
  correctAnswer?: number;
  explanation?: string;
  explanationAr?: string;
}

interface ScienceData {
  id: string;
  title?: string;
  titleAr?: string;
  description?: string;
  descriptionAr?: string;
  difficulty?: number;
  estimatedMinutes?: number;
  statisticalConcept?: StatConcept;
  exercises?: ExerciseItem[];
}

type FilterMode = 'all' | 'beginner' | 'intermediate' | 'advanced';

// ── Difficulty helpers ────────────────────────────────────────────────────────
function getDiffGroup(d: number): FilterMode {
  if (d <= 2) return 'beginner';
  if (d === 3) return 'intermediate';
  return 'advanced';
}

function DiffDots({ difficulty, size = 7 }: { difficulty: number; size?: number }) {
  return (
    <span>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} style={{
          display: 'inline-block', width: size, height: size, borderRadius: '50%',
          background: i < difficulty ? DIFFICULTY_COLORS[difficulty] : 'var(--border-secondary)',
          marginRight: 2,
        }} />
      ))}
    </span>
  );
}

// ── Mini Exercise Player ──────────────────────────────────────────────────────
function SciencePlayer({
  exercises,
  onDone,
}: {
  exercises: ExerciseItem[];
  onDone: () => void;
}) {
  const { isRTL } = useRTL();
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
    <div dir={isRTL ? 'rtl' : 'ltr'} style={{ marginTop: 14, padding: 16, background: 'var(--bg-elevated)', borderRadius: 12, border: '1px solid var(--border-primary)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
        <span style={{ color: 'var(--text-muted)', fontSize: 12 }}>{idx + 1}/{exercises.length}</span>
        <span style={{ color: 'var(--accent-amber)', fontSize: 12, fontWeight: 700 }}>{isRTL ? 'النتيجة' : 'Score'} {score}</span>
      </div>
      <div style={{ height: 3, background: 'var(--border-subtle)', borderRadius: 2, marginBottom: 14 }}>
        <div style={{ height: '100%', width: `${(idx / exercises.length) * 100}%`, background: 'var(--accent-amber)', borderRadius: 2, transition: 'width 0.3s' }} />
      </div>

      <p style={{ color: 'var(--text-primary)', fontSize: 14, lineHeight: 1.6, marginBottom: 12 }}>{ex.prompt}</p>
      {ex.promptAr && (
        <p style={{ color: 'var(--text-muted)', fontSize: 12, direction: 'rtl', marginBottom: 12 }}>{ex.promptAr}</p>
      )}

      {hasOptions && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {ex.options!.map((opt, i) => {
            const isCorrect = ex.correctAnswer === i;
            return (
              <button key={i} onClick={() => pick(i)} style={{
                padding: '11px 14px', borderRadius: 9, fontSize: 13, textAlign: isRTL ? 'right' : 'left',
                cursor: answered ? 'default' : 'pointer',
                background: !answered ? 'var(--bg-secondary)' : isCorrect ? 'rgba(34,197,94,0.18)' : selected === i ? 'rgba(239,68,68,0.12)' : 'var(--bg-secondary)',
                border: !answered ? '1px solid var(--border-primary)' : isCorrect ? '1px solid var(--accent-emerald)' : selected === i ? '1px solid rgba(239,68,68,0.4)' : '1px solid var(--border-subtle)',
                color: 'var(--text-primary)',
              }}>{opt}</button>
            );
          })}
        </div>
      )}

      {answered && ex.explanation && (
        <div style={{ background: 'var(--accent-mentalhealth-surface)', border: '1px solid var(--border-primary)', borderRadius: 9, padding: 12, marginTop: 12 }}>
          <p style={{ color: 'var(--accent-emerald)', fontWeight: 700, fontSize: 12, margin: '0 0 4px' }}>💡 {isRTL ? 'الشرح' : 'Explanation'}</p>
          <p style={{ color: 'var(--text-secondary)', fontSize: 12, margin: 0, lineHeight: 1.6 }}>{ex.explanation}</p>
        </div>
      )}

      {(answered || !hasOptions) && (
        <button onClick={next} style={{
          marginTop: 12, width: '100%', padding: '11px', borderRadius: 9, border: 'none',
          background: 'linear-gradient(135deg,#eab308,#f97316)',
          color: '#000', fontWeight: 700, cursor: 'pointer', fontSize: 14,
        }}>{isLast ? (isRTL ? '🎉 تم' : '🎉 Complete') : (isRTL ? 'التالي ←' : 'Next →')}</button>
      )}
    </div>
  );
}

// ── Science Card ──────────────────────────────────────────────────────────────
function ScienceCard({
  meta,
  isCompleted,
  onComplete,
}: {
  meta: typeof SCIENCE_EXERCISES[0];
  isCompleted: boolean;
  onComplete: (id: string) => void;
}) {
  const { isRTL } = useRTL();
  const [data, setData] = useState<ScienceData | null>(null);
  const [loading, setLoading] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [done, setDone] = useState(isCompleted);

  const diffColor = DIFFICULTY_COLORS[meta.difficulty] ?? '#94a3b8';
  const diffLabel = DIFFICULTY_LABELS[meta.difficulty] ?? 'Unknown';

  async function startExercise() {
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
    <div dir={isRTL ? 'rtl' : 'ltr'} style={{
      background: done ? 'var(--accent-mentalhealth-surface)' : 'var(--bg-card)',
      border: done ? '1px solid var(--accent-mentalhealth-glow)' : '1px solid var(--border-primary)',
      borderRadius: 13,
      overflow: 'hidden',
      transition: 'border-color 0.2s',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Top color bar */}
      <div style={{ height: 3, background: done ? 'var(--accent-emerald)' : diffColor }} />

      <div style={{ padding: '16px 16px 14px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Day + difficulty badge */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <span style={{
            background: 'var(--bg-secondary)',
            color: 'var(--text-muted)', padding: '2px 9px', borderRadius: 20, fontSize: 10, fontWeight: 700,
          }}>
            {isRTL ? 'يوم' : 'Day'} {meta.day}
          </span>
          <span style={{
            background: `${diffColor}22`, color: diffColor,
            padding: '2px 9px', borderRadius: 20, fontSize: 10, fontWeight: 700,
          }}>
            {diffLabel}
          </span>
        </div>

        {/* Concept name if loaded */}
        {data?.statisticalConcept?.name ? (
          <>
            <h3 style={{ color: 'var(--text-primary)', fontWeight: 700, fontSize: 14, margin: '0 0 2px', lineHeight: 1.3 }}>
              {data.statisticalConcept.name}
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: 11, direction: 'rtl', margin: '0 0 8px' }}>
              {data.statisticalConcept.nameAr}
            </p>
            <p style={{ color: 'var(--text-secondary)', fontSize: 12, lineHeight: 1.5, flex: 1, margin: '0 0 10px' }}>
              {data.statisticalConcept.definition?.slice(0, 120)}…
            </p>
          </>
        ) : (
          <div style={{ flex: 1, marginBottom: 10 }}>
            <h3 style={{ color: 'var(--text-secondary)', fontWeight: 700, fontSize: 14, margin: '0 0 6px' }}>
              {meta.id.replace(/_/g, ' ')}
            </h3>
            <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
              <DiffDots difficulty={meta.difficulty} />
            </div>
          </div>
        )}

        {/* Action */}
        {done ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--accent-emerald)', fontSize: 12, fontWeight: 700 }}>
            ✅ {isRTL ? 'مكتمل' : 'Completed'}
          </div>
        ) : playing && data ? (
          <SciencePlayer
            exercises={data.exercises ?? []}
            onDone={() => {
              setPlaying(false);
              setDone(true);
              onComplete(meta.id);
            }}
          />
        ) : (
          <button
            onClick={startExercise}
            disabled={loading}
            style={{
              padding: '9px', borderRadius: 9, border: 'none',
              background: loading ? 'var(--bg-secondary)' : `linear-gradient(135deg,${diffColor},${diffColor}bb)`,
              color: loading ? 'var(--text-muted)' : '#000',
              fontWeight: 700, fontSize: 13, cursor: loading ? 'default' : 'pointer',
            }}
          >
            {loading ? (isRTL ? '⏳ جاري التحميل…' : '⏳ Loading…') : (isRTL ? '▶ ابدأ التمرين' : '▶ Start Exercise')}
          </button>
        )}
      </div>
      <PageNavigation currentPath="/curriculum/phase2" />
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function Phase2Page() {
  const { isRTL } = useRTL();
  const [filter, setFilter] = useState<FilterMode>('all');
  const [completed, setCompleted] = useState<Set<string>>(new Set());
  const exercisesRef = useRef<HTMLDivElement | null>(null);

  // Wire ToolGuide "ready example" buttons to the page's real filter setter.
  // Each scenario carries a FilterMode in `input`; we apply it to the actual
  // `setFilter` state, then scroll the exercise grid into view so the matching
  // exercise band is front-and-centre.
  function handleTryExample(mode: string) {
    const m = (['all', 'beginner', 'intermediate', 'advanced'].includes(mode)
      ? mode
      : 'all') as FilterMode;
    setFilter(m);
    requestAnimationFrame(() => {
      exercisesRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  // Load progress
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

  const FILTER_TABS: { key: FilterMode; label: string; labelAr: string; color: string }[] = [
    { key: 'all', label: 'All (33)', labelAr: 'الكل (33)', color: '#94a3b8' },
    { key: 'beginner', label: 'Beginner', labelAr: 'مبتدئ', color: '#22c55e' },
    { key: 'intermediate', label: 'Intermediate', labelAr: 'متوسط', color: '#eab308' },
    { key: 'advanced', label: 'Advanced', labelAr: 'متقدم', color: '#f97316' },
  ];

  return (
    <main dir={isRTL ? 'rtl' : 'ltr'} style={{ minHeight: '100vh', background: 'var(--bg-page)', color: 'var(--text-primary)', padding: '48px 16px' }}>
      <div style={{ maxWidth: 1140, margin: '0 auto' }}>

        {/* Header */}
        <div style={{ marginBottom: 32, borderBottom: '1px solid var(--border-subtle)', paddingBottom: 24 }}>
          <span style={{
            background: 'var(--accent-deepreal-surface)', color: 'var(--accent-amber)',
            padding: '3px 12px', borderRadius: 20, fontSize: 11, fontWeight: 700,
          }}>
            {isRTL ? 'المرحلة 2 — الأسابيع 9–16' : 'PHASE 2 — WEEKS 9–16'}
          </span>
          <h1 style={{
            fontSize: 'clamp(26px, 5vw, 40px)', fontWeight: 900, margin: '10px 0 4px',
            background: 'linear-gradient(135deg,#eab308,#f97316,#ef4444)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            lineHeight: 1.15,
          }}>
            {isRTL ? 'الثقافة الإحصائية والعلمية' : 'Statistical & Scientific Literacy'}
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: 15, direction: isRTL ? 'ltr' : 'rtl', margin: '0 0 8px' }}>
            {isRTL ? 'Statistical & Scientific Literacy' : 'الثقافة الإحصائية والعلمية'}
          </p>
          <p style={{ color: 'var(--text-muted)', fontSize: 13, lineHeight: 1.7, maxWidth: 700 }}>
            {isRTL
              ? '33 تمرينًا في نزاهة البحث العلمي تغطي التلاعب بالقيمة الاحتمالية، وانحياز النشر، والاستدلال البايزي، والاستدلال السببي، والمتغيرات المربكة — كلها بدراسات حالة واقعية وسياق مصري.'
              : '33 research-integrity exercises spanning p-hacking, publication bias, Bayesian reasoning, causal inference, and confounding — all with real-world case studies and Egyptian context.'}
          </p>
        </div>

        {/* How to use this phase — ToolGuide */}
        <ToolGuide
          lang={isRTL ? 'ar' : 'en'}
          accent="#eab308"
          titleEn="How to use Phase 2 (and who it's for)"
          titleAr="كيفية استخدام المرحلة الثانية (ولمن هي)"
          whoBenefits={{
            en: "Any Egyptian who keeps seeing 'a study proved…' posts, miracle-cure WhatsApp forwards, or before/after testimonial threads and wants to test the claim instead of trusting the screenshot. No maths background needed — each of the 33 exercises teaches one trick that bad claims use, with Egyptian examples.",
            ar: "أي مصري يرى باستمرار منشورات «أثبتت دراسة...» أو رسائل واتساب عن علاجات معجزة أو سلاسل شهادات «قبل وبعد» ويريد اختبار الادعاء بدلًا من تصديق الصورة. لا تحتاج خلفية في الرياضيات — كل تمرين من الـ33 يشرح حيلة واحدة تستخدمها الادعاءات المضللة، بأمثلة مصرية.",
          }}
          steps={[
            {
              en: "Start with the green Beginner band (Difficulty 1–2). Pick a card and press ▶ Start Exercise — it loads a few multiple-choice questions inside the card.",
              ar: "ابدأ بالقسم الأخضر للمبتدئين (الصعوبة 1–2). اختر بطاقة واضغط ▶ ابدأ التمرين — ستظهر بضعة أسئلة اختيار من متعدد داخل البطاقة نفسها.",
            },
            {
              en: "Answer each question; after you choose, the correct answer turns green and a 💡 Explanation appears telling you WHY a claim using that trick is misleading.",
              ar: "أجب عن كل سؤال؛ بعد اختيارك تتحول الإجابة الصحيحة إلى الأخضر ويظهر 💡 شرح يوضح لماذا يكون الادعاء الذي يستخدم تلك الحيلة مضللًا.",
            },
            {
              en: "Finish a card to mark it ✅ Completed. Your progress bar (X/33) saves on this device automatically, so you can stop and come back later.",
              ar: "أكمل البطاقة لتُحدَّد ✅ مكتملة. يُحفظ شريط تقدمك (X/33) على هذا الجهاز تلقائيًا، فيمكنك التوقف والعودة لاحقًا.",
            },
            {
              en: "Use the filter tabs (Beginner / Intermediate / Advanced) to climb difficulty, or press a ready example below to jump straight to the band that debunks a claim you've actually seen.",
              ar: "استخدم تبويبات التصفية (مبتدئ / متوسط / متقدم) للتدرّج في الصعوبة، أو اضغط مثالًا جاهزًا بالأسفل للانتقال مباشرةً إلى القسم الذي يفنّد ادعاءً رأيته فعلًا.",
            },
          ]}
          scenarios={[
            {
              label: "'Garlic & lemon cures cancer' WhatsApp forward",
              labelAr: "رسالة واتساب «الثوم والليمون يعالج السرطان»",
              input: 'beginner',
              tag: 'health',
            },
            {
              label: "'I quit my meds and my sugar fixed itself' testimonial",
              labelAr: "شهادة «وقّفت الدوا وسكري اتظبط لوحده»",
              input: 'beginner',
              tag: 'health',
            },
            {
              label: "'A study PROVED this diet works' headline",
              labelAr: "عنوان «دراسة أثبتت أن هذا الرجيم ناجح»",
              input: 'intermediate',
              tag: 'science',
            },
            {
              label: "'The vaccine caused it — it happened right after' post",
              labelAr: "منشور «اللقاح هو السبب — حصل بعده على طول»",
              input: 'advanced',
              tag: 'causation',
            },
          ]}
          onTry={handleTryExample}
        />

        {/* Progress + link to /science */}
        <div style={{
          display: 'flex', gap: 16, alignItems: 'center',
          background: 'var(--accent-deepreal-surface)',
          border: '1px solid var(--border-primary)',
          borderRadius: 14, padding: '14px 20px', marginBottom: 28,
          flexWrap: 'wrap',
        }}>
          <div style={{ flex: 1, minWidth: 200 }}>
            <p style={{ color: 'var(--text-secondary)', fontSize: 12, margin: '0 0 6px' }}>{isRTL ? 'التقدّم' : 'Progress'}</p>
            <div style={{ height: 6, background: 'var(--border-subtle)', borderRadius: 3, marginBottom: 4, maxWidth: 340 }}>
              <div style={{
                height: '100%', borderRadius: 3,
                width: `${completionPct}%`,
                background: 'linear-gradient(90deg,#eab308,#f97316)',
                transition: 'width 0.5s',
              }} />
            </div>
            <p style={{ color: 'var(--accent-amber)', fontWeight: 700, fontSize: 13, margin: 0 }}>
              {isRTL
                ? `اكتمل ${completed.size}/33 تمرينًا (${completionPct}%)`
                : `${completed.size}/33 exercises complete (${completionPct}%)`}
            </p>
          </div>
          <Link href="/science" style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '10px 18px', borderRadius: 10,
            background: 'linear-gradient(135deg,#eab308,#f97316)',
            color: '#000', textDecoration: 'none', fontWeight: 700, fontSize: 13,
          }}>
            {isRTL ? '🔬 افتح مركز العلوم ←' : '🔬 Open Science Hub →'}
          </Link>
        </div>

        {/* Filter tabs */}
        <div ref={exercisesRef} style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap', scrollMarginTop: 24 }}>
          {FILTER_TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              style={{
                padding: '7px 16px', borderRadius: 20, border: 'none',
                background: filter === tab.key ? `${tab.color}25` : 'var(--bg-secondary)',
                color: filter === tab.key ? tab.color : 'var(--text-muted)',
                fontWeight: filter === tab.key ? 700 : 400,
                fontSize: 13, cursor: 'pointer',
                outline: filter === tab.key ? `2px solid ${tab.color}60` : 'none',
                transition: 'all 0.2s',
              }}
            >
              {isRTL ? tab.labelAr : tab.label}
            </button>
          ))}
        </div>

        {/* Difficulty sections */}
        {(['beginner', 'intermediate', 'advanced'] as FilterMode[])
          .filter((g) => filter === 'all' || filter === g)
          .map((group) => {
            const groupItems = filtered.filter((ex) => getDiffGroup(ex.difficulty) === group);
            if (groupItems.length === 0) return null;
            const labels: Record<string, { label: string; labelAr: string; color: string; icon: string }> = {
              beginner: { label: 'Beginner (Difficulty 1–2)', labelAr: 'مبتدئ (الصعوبة 1–2)', color: '#22c55e', icon: '🟢' },
              intermediate: { label: 'Intermediate (Difficulty 3)', labelAr: 'متوسط (الصعوبة 3)', color: '#eab308', icon: '🟡' },
              advanced: { label: 'Advanced (Difficulty 4–5)', labelAr: 'متقدم (الصعوبة 4–5)', color: '#f97316', icon: '🔴' },
            };
            const { label, labelAr, color, icon } = labels[group];
            return (
              <section key={group} style={{ marginBottom: 36 }}>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16,
                  [isRTL ? 'borderRight' : 'borderLeft']: `3px solid ${color}`,
                  [isRTL ? 'paddingRight' : 'paddingLeft']: 12,
                }}>
                  <span style={{ fontSize: 18 }}>{icon}</span>
                  <h2 style={{ color: 'var(--text-primary)', fontWeight: 800, fontSize: 16, margin: 0 }}>
                    {isRTL ? labelAr : label}
                  </h2>
                  <span style={{
                    background: `${color}20`, color, padding: '2px 9px',
                    borderRadius: 20, fontSize: 11, fontWeight: 700, [isRTL ? 'marginRight' : 'marginLeft']: 'auto',
                  }}>
                    {isRTL
                      ? `${groupItems.filter((ex) => completed.has(ex.id)).length}/${groupItems.length} مكتمل`
                      : `${groupItems.filter((ex) => completed.has(ex.id)).length}/${groupItems.length} done`}
                  </span>
                </div>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
                  gap: 14,
                }}>
                  {groupItems.map((ex) => (
                    <ScienceCard
                      key={ex.id}
                      meta={ex}
                      isCompleted={completed.has(ex.id)}
                      onComplete={markComplete}
                    />
                  ))}
                </div>
              </section>
            );
          })}

        {/* Navigation */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', marginTop: 32,
          borderTop: '1px solid var(--border-subtle)', paddingTop: 24,
          flexWrap: 'wrap', gap: 12,
        }}>
          <Link href="/curriculum/phase1" style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '10px 18px', borderRadius: 10,
            border: '1px solid var(--border-primary)',
            color: 'var(--text-secondary)', textDecoration: 'none', fontSize: 13,
          }}>
            {isRTL ? 'المرحلة 1: المناعة المعرفية ←' : '← Phase 1: Cognitive Immunity'}
          </Link>
          <Link href="/science" style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '10px 18px', borderRadius: 10,
            background: 'linear-gradient(135deg,#eab308,#f97316)',
            color: '#000', textDecoration: 'none', fontSize: 13, fontWeight: 700,
          }}>
            {isRTL ? 'مركز العلوم الكامل ←' : 'Full Science Hub →'}
          </Link>
        </div>

      </div>
    </main>
  );
}
