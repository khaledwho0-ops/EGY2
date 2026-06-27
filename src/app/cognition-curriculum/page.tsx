'use client';

// COGNITION CURRICULUM — the "second half" delivery surface (Engine v2).
// Manifest-driven. Plays each day's JSON via /api/exercise?subdir=cognition.
// Supports 8 evidence-based mechanics, not just recognition quizzes.

import { useEffect, useMemo, useState } from 'react';
import manifest from '@/data/exercises/cognition/_manifest.json';
import { readProfile, recordDay, calibration, accuracyPct, type Profile } from '@/lib/cognition/profile';

type Lang = 'en' | 'ar';

interface DayMeta {
  day: number; file: string; week: number | null; phase: number | null;
  title: string; titleAr: string; type: string; items: number;
  estimatedMinutes: number | null; difficulty: number | null;
}
interface PhaseGroup { phase: number; name: { en: string; ar: string }; days: DayMeta[] }

interface Part { text?: string; textAr?: string; role?: string }
interface ExItem {
  id: number | string;
  mechanic?: string;            // recognize | calibrate | self_explain | consider_opposite | inoculate | decompose
  calibrated?: boolean;
  itemKind?: 'manipulation' | 'legitimate';
  claim?: string; claimAr?: string;
  options?: string[]; correctAnswer?: number | boolean;
  explanation?: string; explanationAr?: string;
  myth_en?: string; myth_ar?: string;
  scenario?: string; scenarioAr?: string; question?: string; questionAr?: string;
  answer?: string; key_differentiators?: string[];
  selfExplain?: { prompt?: string; promptAr?: string };
  prompt?: string; promptAr?: string;
  modelPoints?: string[]; modelPointsAr?: string[];
  technique?: string; techniqueAr?: string; task?: string; taskAr?: string;
  tells?: string[]; tellsAr?: string[];
  parts?: Part[];
  sources?: string[]; cognitivebiasAtPlay?: string | null;
}
interface DayData { id: string; title?: string; titleAr?: string; description?: string; descriptionAr?: string; type?: string; exercises?: ExItem[] }

const PHASE_ACCENT: Record<number, string> = { 1: '#8b5cf6', 2: '#38bdf8', 3: '#c084fc', 4: '#34d399' };
const ROLES = ['conclusion', 'premise', 'assumption', 'irrelevant'] as const;
const ROLE_AR: Record<string, string> = { conclusion: 'الخلاصة', premise: 'مقدّمة', assumption: 'افتراض خفي', irrelevant: 'غير ذي صلة' };

export default function CognitionCurriculumPage() {
  const [lang, setLang] = useState<Lang>('en');
  const [active, setActive] = useState<DayMeta | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  useEffect(() => { setProfile(readProfile()); }, [active]);
  const ar = lang === 'ar';
  const t = (en: string, arr: string) => (ar ? arr : en);
  const phases = (manifest.phases || []) as PhaseGroup[];

  return (
    <div dir={ar ? 'rtl' : 'ltr'} style={{ minHeight: '100vh', background: '#0b0f17', color: '#e6edf3', fontFamily: ar ? 'var(--font-heading-ar, Tahoma, sans-serif)' : "var(--font-body,'Inter',system-ui,sans-serif)" }}>
      <div style={{ maxWidth: 980, marginInline: 'auto', padding: '40px 22px 96px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
          <div>
            <div style={{ fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#7c8794', fontWeight: 700 }}>{t('The Cognition Build', 'بناء الإدراك')}</div>
            <h1 style={{ fontSize: 34, fontWeight: 700, margin: '8px 0 6px', lineHeight: 1.15 }}>{t('Train Your Mind, Not Just Your Feed', 'درّب عقلك، مش بس الفيد بتاعك')}</h1>
            <p style={{ color: '#9aa4b1', fontSize: 15, maxWidth: 620, lineHeight: 1.6 }}>
              {t('A daily curriculum built on what science shows actually improves thinking — retrieval, calibration, self-explanation, considering the opposite, and active inoculation — anchored to the real Egyptian Taybat case.',
                 'منهج يومي مبني على اللي العلم أثبت إنه بيحسّن التفكير فعلاً — الاسترجاع، والمعايرة، والشرح الذاتي، والتفكير في العكس، والتلقيح النشط — وكله مربوط بحالة «الطيبات» المصرية الحقيقية.')}
            </p>
          </div>
          <button onClick={() => setLang(ar ? 'en' : 'ar')} style={{ flexShrink: 0, border: '1px solid #2a3340', background: '#141a23', color: '#e6edf3', borderRadius: 10, padding: '8px 14px', cursor: 'pointer', fontSize: 14, fontWeight: 600 }}>{ar ? 'EN' : 'ع'}</button>
        </div>

        <div style={{ display: 'flex', gap: 18, marginTop: 22, padding: '14px 18px', background: '#111722', border: '1px solid #1f2731', borderRadius: 14, flexWrap: 'wrap' }}>
          <Stat label={t('Days available', 'أيام متاحة')} value={String(manifest.generatedDays ?? 0)} />
          <Stat label={t('Exercises', 'تمارين')} value={String(manifest.totalItems ?? 0)} />
          <Stat label={t('Phases', 'مراحل')} value={String(phases.length)} />
          <Stat label={t('One-Law sourced', 'موثّق بالقانون الواحد')} value="100%" accent="#34d399" />
          {profile && profile.days.length > 0 && (
            <>
              <Stat label={t('Your days', 'أيامك')} value={String(profile.days.length)} accent="#8b5cf6" />
              <Stat label={t('Your accuracy', 'دقّتك')} value={accuracyPct(profile) + '%'} />
              <Stat label={t('Calibration', 'معايرتك')} value={ar ? calibration(profile.calib).labelAr : calibration(profile.calib).label} />
            </>
          )}
        </div>

        {active ? (
          <Player day={active} lang={lang} onBack={() => setActive(null)} />
        ) : (
          <div style={{ marginTop: 30, display: 'flex', flexDirection: 'column', gap: 30 }}>
            {phases.map((p) => (
              <section key={p.phase}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                  <span style={{ width: 10, height: 10, borderRadius: 999, background: PHASE_ACCENT[p.phase] || '#8b5cf6' }} />
                  <h2 style={{ fontSize: 18, fontWeight: 700 }}>{ar ? p.name.ar : p.name.en}</h2>
                  <span style={{ fontSize: 12, color: '#7c8794' }}>· {p.days.length} {t('days', 'يوم')}</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 12 }}>
                  {p.days.map((d) => (
                    <button key={d.day} onClick={() => setActive(d)} style={{ textAlign: ar ? 'right' : 'left', background: '#111722', border: '1px solid #1f2731', borderRadius: 14, padding: '14px 16px', cursor: 'pointer', color: '#e6edf3' }}
                      onMouseEnter={(e) => (e.currentTarget.style.borderColor = PHASE_ACCENT[p.phase] || '#8b5cf6')}
                      onMouseLeave={(e) => (e.currentTarget.style.borderColor = '#1f2731')}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#7c8794', marginBottom: 6 }}>
                        <span>{t('Day', 'يوم')} {d.day}</span>
                        <span>{d.items} {t('items', 'عناصر')}{d.estimatedMinutes ? ` · ${d.estimatedMinutes}m` : ''}</span>
                      </div>
                      <div style={{ fontSize: 14.5, fontWeight: 600, lineHeight: 1.4 }}>{ar ? (d.titleAr || d.title) : d.title}</div>
                    </button>
                  ))}
                </div>
              </section>
            ))}
            {!phases.length && <p style={{ color: '#7c8794' }}>{t('Curriculum is being authored — check back shortly.', 'المنهج بيتكتب دلوقتي — ارجع بعد شوية.')}</p>}
          </div>
        )}
      </div>
    </div>
  );
}

function Stat({ label, value, accent }: { label: string; value: string; accent?: string }) {
  return (<div><div style={{ fontSize: 22, fontWeight: 700, color: accent || '#e6edf3' }}>{value}</div><div style={{ fontSize: 11.5, color: '#7c8794' }}>{label}</div></div>);
}

function Player({ day, lang, onBack }: { day: DayMeta; lang: Lang; onBack: () => void }) {
  const ar = lang === 'ar';
  const t = (en: string, arr: string) => (ar ? arr : en);
  const [data, setData] = useState<DayData | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<number | string | boolean | null>(null);
  const [confidence, setConfidence] = useState<number>(60);
  const [confLocked, setConfLocked] = useState(false);
  const [text, setText] = useState('');
  const [revealed, setRevealed] = useState(false);
  const [roles, setRoles] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [results, setResults] = useState<{ correct: boolean; conf: number | null; kind?: string }[]>([]);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    let alive = true;
    setData(null); setErr(null); setIdx(0); resetItem(); setScore(0); setResults([]); setFinished(false);
    fetch(`/api/exercise?file=${encodeURIComponent(day.file)}&subdir=cognition`)
      .then((r) => r.json()).then((j) => { if (alive) (j.error ? setErr(j.error) : setData(j)); })
      .catch(() => alive && setErr('load failed'));
    return () => { alive = false; };
  }, [day.file]);

  function resetItem() { setPicked(null); setConfidence(60); setConfLocked(false); setText(''); setRevealed(false); setRoles({}); setSubmitted(false); }

  const exercises = data?.exercises || [];
  const ex = exercises[idx];
  const diffOptions = useMemo(() => Array.from(new Set(exercises.map((e) => e.answer).filter((x): x is string => typeof x === 'string'))), [exercises]);

  if (err) return <Shell onBack={onBack} t={t}><p style={{ color: '#f87171' }}>Error: {err}</p></Shell>;
  if (!data || !ex) return <Shell onBack={onBack} t={t}><p style={{ color: '#7c8794' }}>{t('Loading…', 'بيحمّل…')}</p></Shell>;

  if (finished) {
    const cal = calibration(results.filter((r) => r.conf != null).map((r) => ({ conf: r.conf as number, correct: r.correct })));
    const acc = results.length ? Math.round((score / results.length) * 100) : 0;
    return (
      <Shell onBack={onBack} t={t}>
        <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>{t('Day complete', 'خلصت اليوم')} ✓</h2>
        <p style={{ color: '#9aa4b1', fontSize: 14, marginBottom: 18 }}>{ar ? (data.titleAr || data.title) : data.title}</p>
        <div style={{ display: 'flex', gap: 22, flexWrap: 'wrap', marginBottom: 18 }}>
          <Stat label={t('Score', 'النتيجة')} value={`${score}/${results.length}`} />
          <Stat label={t('Accuracy', 'الدقّة')} value={`${acc}%`} accent="#34d399" />
          <Stat label={t('Confidence calibration', 'معايرة الثقة')} value={results.some((r) => r.conf != null) ? (ar ? cal.labelAr : cal.label) : '—'} accent={cal.direction === 'over' ? '#f87171' : cal.direction === 'under' ? '#e3b341' : '#34d399'} />
        </div>
        <p style={{ fontSize: 13.5, color: '#cdd6e0', lineHeight: 1.6, background: '#111722', border: '1px solid #1f2731', borderRadius: 12, padding: '12px 14px', margin: 0 }}>
          {cal.direction === 'over'
            ? t('You were sure on answers you got wrong — overconfidence is the exact trap pseudoscience exploits. Noticing it is the skill.', 'كنت واثق في إجابات غلط — الثقة الزائدة هي الفخّة اللي العلم الزائف بيستغلّها. ملاحظتها هي المهارة.')
            : cal.direction === 'under'
            ? t('You knew more than you felt — trust your trained judgment a little more.', 'كنت عارف أكتر مما حسّيت — وثّق في حكمك المدرَّب شوية أكتر.')
            : t('Your confidence matched your accuracy — that calibration is exactly what keeps you discerning, not cynical.', 'ثقتك طابقت دقّتك — المعايرة دي بالظبط اللي بتخلّيك مميِّز، مش متشكّك في كل حاجة.')}
        </p>
        <div style={{ marginTop: 16, display: 'flex', justifyContent: 'flex-end' }}>
          <button onClick={onBack} style={btn}>{t('Back to curriculum', 'رجوع للمنهج')} →</button>
        </div>
      </Shell>
    );
  }

  const mech = ex.mechanic || 'recognize';
  const hasOptions = Array.isArray(ex.options) && ex.options.length > 0;
  const isTF = !hasOptions && typeof ex.correctAnswer === 'boolean';
  const isDiff = !hasOptions && !isTF && typeof ex.answer === 'string';
  const prompt = ar ? (ex.claimAr || ex.scenarioAr || ex.questionAr || ex.claim) : (ex.claim || ex.scenario || ex.question);
  const explanation = ar ? (ex.explanationAr || ex.explanation) : ex.explanation;
  const isLast = idx === exercises.length - 1;

  const optionRows: { label: string; val: number | string | boolean; ok: boolean }[] = hasOptions
    ? ex.options!.map((o, i) => ({ label: o, val: i, ok: i === ex.correctAnswer }))
    : isTF ? [{ label: t('True', 'صح'), val: true, ok: ex.correctAnswer === true }, { label: t('False', 'غلط'), val: false, ok: ex.correctAnswer === false }]
    : isDiff ? diffOptions.map((c) => ({ label: c, val: c, ok: c === ex.answer })) : [];

  const gradeable = mech === 'recognize' || mech === 'calibrate' || mech === 'self_explain';
  const answered = gradeable ? picked !== null : mech === 'decompose' ? submitted : revealed;
  const calibrate = mech === 'calibrate' || ex.calibrated;

  const grade = (val: number | string | boolean) => {
    if (picked !== null) return;
    const ok = hasOptions ? val === ex.correctAnswer : isTF ? val === ex.correctAnswer : val === ex.answer;
    setPicked(val); if (ok) setScore((s) => s + 1);
    setResults((rs) => [...rs, { correct: ok, conf: calibrate ? confidence : null, kind: ex.itemKind }]);
  };
  const advance = () => {
    if (isLast) {
      recordDay({
        dayId: data.id || day.file,
        answered: results.length,
        correct: score,
        calib: results.filter((r) => r.conf != null).map((r) => ({ conf: r.conf as number, correct: r.correct })),
        disc: results.filter((r) => r.kind).map((r) => ({ manipulation: r.kind === 'manipulation', flagged: r.correct ? r.kind === 'manipulation' : r.kind !== 'manipulation' })),
      }, Date.now());
      setFinished(true);
    } else { setIdx((i) => i + 1); resetItem(); }
  };

  // calibration feedback message
  const correct = picked !== null && (hasOptions ? picked === ex.correctAnswer : isTF ? picked === ex.correctAnswer : picked === ex.answer);
  const calMsg = !calibrate || picked === null ? null
    : correct && confidence >= 70 ? t('Well calibrated — sure and right. ✓', 'معايرة ممتازة — واثق وصح. ✓')
    : correct && confidence <= 40 ? t('You knew more than you felt (under-confident).', 'كنت عارف أكتر مما حسّيت (ثقة أقل من اللازم).')
    : !correct && confidence >= 70 ? t('Overconfidence — sure but wrong. THIS is the trap to feel.', 'ثقة زائدة — واثق وغلط. دي الفخّة اللي المفروض تحسّها.')
    : !correct && confidence <= 40 ? t('Appropriately unsure — good instinct to doubt.', 'شكّك في محلّه — حسّ كويس بالشكّ.')
    : t('Reasonable calibration.', 'معايرة معقولة.');

  return (
    <Shell onBack={onBack} t={t}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700 }}>{ar ? (data.titleAr || day.titleAr || data.title) : (data.title || day.title)}</h2>
        <span style={{ fontSize: 12, color: '#7c8794' }}>{idx + 1}/{exercises.length} · {t('score', 'نتيجة')} {score}</span>
      </div>
      <div style={{ height: 4, background: '#1f2731', borderRadius: 9, overflow: 'hidden', marginBottom: 14 }}>
        <div style={{ width: `${((idx + (answered ? 1 : 0)) / exercises.length) * 100}%`, height: '100%', background: '#8b5cf6', transition: 'width .25s' }} />
      </div>
      <MechChip mech={mech} ar={ar} />

      {/* PROMPT */}
      {isTF && ex.myth_en && <div style={{ fontSize: 12, color: '#e3b341', margin: '8px 0' }}>{t('Myth to judge:', 'خرافة للحكم:')} “{ar ? ex.myth_ar : ex.myth_en}”</div>}
      {(prompt || mech === 'inoculate') && <p style={{ fontSize: 16.5, lineHeight: 1.6, margin: '10px 0 14px', fontWeight: 500 }}>{mech === 'inoculate' ? (ar ? ex.taskAr : ex.task) : prompt}</p>}
      {isDiff && ex.question && <p style={{ fontSize: 14, color: '#9aa4b1', marginBottom: 12 }}>{ar ? ex.questionAr : ex.question}</p>}

      {/* CALIBRATION SLIDER (before answering) */}
      {calibrate && picked === null && (
        <div style={{ marginBottom: 14, padding: '12px 14px', background: '#111722', border: '1px solid #1f2731', borderRadius: 12 }}>
          <div style={{ fontSize: 13, color: '#9aa4b1', marginBottom: 8 }}>{t('Before you answer — how sure are you?', 'قبل ما تجاوب — إنت متأكد قد إيه؟')} <strong style={{ color: '#e6edf3' }}>{confidence}%</strong></div>
          <input type="range" min={0} max={100} step={5} value={confidence} onChange={(e) => setConfidence(Number(e.target.value))} onMouseUp={() => setConfLocked(true)} onTouchEnd={() => setConfLocked(true)} style={{ width: '100%' }} />
        </div>
      )}

      {/* GRADEABLE OPTIONS (recognize / calibrate / self_explain) */}
      {gradeable && optionRows.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 9, opacity: calibrate && !confLocked && picked === null ? 0.5 : 1, pointerEvents: calibrate && !confLocked && picked === null ? 'none' : 'auto' }}>
          {optionRows.map((o, i) => {
            const chosen = picked === o.val; const reveal = picked !== null && (o.ok || chosen);
            const bg = picked === null ? '#141a23' : o.ok ? 'rgba(52,211,153,.14)' : chosen ? 'rgba(248,113,113,.14)' : '#141a23';
            const bd = picked === null ? '#2a3340' : o.ok ? '#34d399' : chosen ? '#f87171' : '#2a3340';
            return <button key={i} disabled={picked !== null} onClick={() => grade(o.val)} style={{ textAlign: ar ? 'right' : 'left', background: bg, border: `1px solid ${bd}`, color: '#e6edf3', borderRadius: 11, padding: '12px 15px', cursor: picked !== null ? 'default' : 'pointer', fontSize: 14.5 }}>{o.label}{reveal && o.ok ? '  ✓' : reveal && chosen ? '  ✕' : ''}</button>;
          })}
        </div>
      )}

      {/* DECOMPOSE (argument map) */}
      {mech === 'decompose' && Array.isArray(ex.parts) && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {ex.parts.map((p, i) => {
            const got = roles[i]; const right = submitted && got === p.role;
            return (
              <div key={i} style={{ background: '#141a23', border: `1px solid ${submitted ? (right ? '#34d399' : '#f87171') : '#2a3340'}`, borderRadius: 11, padding: '11px 13px' }}>
                <div style={{ fontSize: 14, marginBottom: 8 }}>{ar ? (p.textAr || p.text) : p.text}</div>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {ROLES.map((r) => (
                    <button key={r} disabled={submitted} onClick={() => setRoles((m) => ({ ...m, [i]: r }))}
                      style={{ fontSize: 12, borderRadius: 8, padding: '5px 10px', cursor: submitted ? 'default' : 'pointer', border: `1px solid ${got === r ? '#8b5cf6' : '#2a3340'}`, background: got === r ? 'rgba(139,92,246,.18)' : '#0e131c', color: '#e6edf3' }}>
                      {ar ? ROLE_AR[r] : r}
                    </button>
                  ))}
                </div>
                {submitted && !right && <div style={{ fontSize: 12, color: '#34d399', marginTop: 6 }}>{t('Correct role:', 'الدور الصح:')} {ar ? ROLE_AR[p.role || ''] : p.role}</div>}
              </div>
            );
          })}
          {!submitted && <button onClick={() => { const all = ex.parts!.every((p, i) => roles[i] === p.role); if (all) setScore((s) => s + 1); setResults((rs) => [...rs, { correct: all, conf: null, kind: ex.itemKind }]); setSubmitted(true); }} disabled={Object.keys(roles).length < (ex.parts?.length || 0)} style={{ ...btn, alignSelf: 'flex-start', opacity: Object.keys(roles).length < (ex.parts?.length || 0) ? 0.5 : 1 }}>{t('Check', 'تحقّق')}</button>}
        </div>
      )}

      {/* OPEN-RESPONSE (self_explain / consider_opposite / inoculate) */}
      {(mech === 'self_explain' || mech === 'consider_opposite' || mech === 'inoculate') && (gradeable ? picked !== null : true) && !revealed && (
        <div style={{ marginTop: 12 }}>
          <div style={{ fontSize: 13.5, color: '#cdd6e0', marginBottom: 8 }}>
            {mech === 'self_explain' ? (ar ? (ex.selfExplain?.promptAr || 'بكلماتك، ليه دي الحركة؟') : (ex.selfExplain?.prompt || 'In your own words, why is this the move?'))
              : (ar ? ex.promptAr : ex.prompt)}
          </div>
          <textarea value={text} onChange={(e) => setText(e.target.value)} rows={3} placeholder={t('Type your thinking…', 'اكتب تفكيرك…')} style={{ width: '100%', background: '#0e131c', border: '1px solid #2a3340', borderRadius: 10, color: '#e6edf3', padding: '10px 12px', fontSize: 14, resize: 'vertical' }} />
          <button onClick={() => setRevealed(true)} style={{ ...btn, marginTop: 8 }}>{t('Reveal & compare', 'اكشف وقارن')}</button>
        </div>
      )}

      {/* FEEDBACK PANEL */}
      {answered && (
        <div style={{ marginTop: 16, padding: '14px 16px', background: '#111722', border: '1px solid #1f2731', borderRadius: 12 }}>
          {calMsg && <div style={{ fontSize: 13, color: correct ? '#34d399' : '#e3b341', marginBottom: 8, fontWeight: 600 }}>{calMsg}</div>}
          {ex.cognitivebiasAtPlay && <div style={{ display: 'inline-block', fontSize: 11, color: '#c084fc', border: '1px solid #3a2d52', borderRadius: 999, padding: '2px 10px', marginBottom: 8 }}>🧠 {ex.cognitivebiasAtPlay}</div>}
          {explanation && <p style={{ fontSize: 14.5, lineHeight: 1.65, color: '#cdd6e0' }}>{explanation}</p>}
          {(mech === 'consider_opposite') && (ar ? ex.modelPointsAr : ex.modelPoints)?.length ? (
            <><div style={{ fontSize: 12, color: '#7c8794', marginTop: 8 }}>{t('What could disprove / re-explain it:', 'اللي ممكن يكذّبه / يفسّره تاني:')}</div>
            <ul style={{ margin: '4px 0 0', paddingInlineStart: 18, color: '#cdd6e0', fontSize: 13.5 }}>{(ar ? ex.modelPointsAr! : ex.modelPoints!).map((k, i) => <li key={i}>{k}</li>)}</ul></>
          ) : null}
          {(mech === 'inoculate') && (ar ? ex.tellsAr : ex.tells)?.length ? (
            <><div style={{ fontSize: 12, color: '#7c8794', marginTop: 8 }}>{t('The tells that expose this technique:', 'العلامات اللي بتكشف الحركة دي:')}</div>
            <ul style={{ margin: '4px 0 0', paddingInlineStart: 18, color: '#cdd6e0', fontSize: 13.5 }}>{(ar ? ex.tellsAr! : ex.tells!).map((k, i) => <li key={i}>{k}</li>)}</ul></>
          ) : null}
          {isDiff && ex.key_differentiators?.length ? <ul style={{ margin: '8px 0 0', paddingInlineStart: 18, color: '#9aa4b1', fontSize: 13 }}>{ex.key_differentiators.map((k, i) => <li key={i}>{k}</li>)}</ul> : null}
          {ex.sources?.length ? (
            <div style={{ marginTop: 10, fontSize: 12, color: '#7c8794' }}>{t('Sources:', 'المصادر:')}{' '}
              {ex.sources.map((s, i) => <span key={i}>{s.startsWith('http') ? <a href={s} target="_blank" rel="noopener noreferrer" style={{ color: '#38bdf8' }}>[{i + 1}]</a> : <span style={{ color: '#9aa4b1' }}>[{i + 1} {s}]</span>}{' '}</span>)}
            </div>
          ) : null}
          <div style={{ marginTop: 14, display: 'flex', justifyContent: 'flex-end' }}>
            <button onClick={advance} style={btn}>{isLast ? `${t('Finish', 'إنهاء')} · ${score}/${exercises.length}` : `${t('Next', 'التالي')} →`}</button>
          </div>
        </div>
      )}
    </Shell>
  );
}

const MECH_LABEL: Record<string, { en: string; ar: string; c: string }> = {
  recognize: { en: 'Spot the move', ar: 'اكتشف الحركة', c: '#8b5cf6' },
  calibrate: { en: 'Calibrate your confidence', ar: 'عايِر ثقتك', c: '#e3b341' },
  self_explain: { en: 'Explain why', ar: 'اشرح ليه', c: '#38bdf8' },
  consider_opposite: { en: 'Consider the opposite', ar: 'فكّر في العكس', c: '#34d399' },
  inoculate: { en: 'Be the manipulator (then spot it)', ar: 'كن المتلاعب (وبعدين اكشفه)', c: '#f87171' },
  decompose: { en: 'Map the argument', ar: 'فكّك الحُجّة', c: '#c084fc' },
};
function MechChip({ mech, ar }: { mech: string; ar: boolean }) {
  const m = MECH_LABEL[mech] || MECH_LABEL.recognize;
  return <div style={{ display: 'inline-block', fontSize: 11, fontWeight: 600, letterSpacing: '0.04em', color: m.c, border: `1px solid ${m.c}55`, background: `${m.c}14`, borderRadius: 999, padding: '3px 11px' }}>{ar ? m.ar : m.en}</div>;
}

const btn: React.CSSProperties = { background: '#8b5cf6', color: '#fff', border: 'none', borderRadius: 10, padding: '9px 18px', cursor: 'pointer', fontSize: 14, fontWeight: 600 };

function Shell({ children, onBack, t }: { children: React.ReactNode; onBack: () => void; t: (en: string, ar: string) => string }) {
  return (
    <div style={{ marginTop: 26 }}>
      <button onClick={onBack} style={{ background: 'none', border: 'none', color: '#7c8794', cursor: 'pointer', fontSize: 13, marginBottom: 14 }}>← {t('Back to curriculum', 'رجوع للمنهج')}</button>
      <div style={{ background: '#0e131c', border: '1px solid #1f2731', borderRadius: 18, padding: '22px 24px' }}>{children}</div>
    </div>
  );
}
