'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { PageNavigation } from '@/components/shared/page-navigation';

// ═══ COMPETITION DEMO: Auto-Running Platform Capability Showcase ═══
// This page demonstrates every major feature in under 60 seconds.

interface DemoStep {
  id: string;
  title: string;
  titleAr: string;
  category: string;
  color: string;
  icon: string;
  description: string;
  endpoint: string;
  payload: Record<string, unknown>;
  link: string;
  metrics: { label: string; value: string }[];
}

const DEMO_STEPS: DemoStep[] = [
  {
    id: 'god-system',
    title: 'GOD-System: 8-Layer Analysis',
    titleAr: 'نظام GOD: تحليل 8 طبقات',
    category: 'FLAGSHIP',
    color: '#f59e0b',
    icon: '⚡',
    description: 'NVIDIA Nemotron analyzing a real Egyptian misinformation claim through 8 cognitive immunity layers',
    endpoint: '/api/god-system',
    payload: { claim: 'الحجامة تعالج السرطان والسكري وكل الأمراض', lang: 'ar' },
    link: '/angry-debunkers',
    metrics: [{ label: 'Layers', value: '8' }, { label: 'AI Model', value: 'NVIDIA NIM' }, { label: 'Languages', value: 'AR + EN' }],
  },
  {
    id: 'fallacy-detect',
    title: 'Fallacy Detection Engine',
    titleAr: 'محرك كشف المغالطات',
    category: 'COGNITIVE',
    color: '#6366f1',
    icon: '🧠',
    description: 'Detecting logical fallacies with NVIDIA deep analysis + Arabic explanations',
    endpoint: '/api/fallacy-detect',
    payload: { text: 'كل العلماء الحقيقيين يؤمنون بهذه النظرية، فمن لا يؤمن بها ليس عالماً حقيقياً', domain: 'both' },
    link: '/fallacy-engine',
    metrics: [{ label: 'Fallacies DB', value: '100+' }, { label: 'Detection', value: 'Regex+AI' }, { label: 'Arabic', value: '✓ Native' }],
  },
  {
    id: 'bias-detect',
    title: 'Cognitive Bias Scanner',
    titleAr: 'ماسح التحيز المعرفي',
    category: 'COGNITIVE',
    color: '#8b5cf6',
    icon: '🔍',
    description: 'NVIDIA-enhanced bias detection with de-biasing recommendations',
    endpoint: '/api/bias-detect',
    payload: { text: 'النجاح في الأعمال سهل - انظر فقط إلى إيلون ماسك الذي بدأ من الصفر وأصبح الأغنى', domain: 'both' },
    link: '/bias-detector',
    metrics: [{ label: 'Bias Types', value: '50+' }, { label: 'NLP Engine', value: 'VADER+wink' }, { label: 'NVIDIA', value: 'Enhancement' }],
  },
  {
    id: 'tafsir',
    title: 'Islamic Scholarly Analysis',
    titleAr: 'التحليل الإسلامي الأكاديمي',
    category: 'ISLAMIC',
    color: '#10b981',
    icon: '🕌',
    description: 'Quran tafsir with NVIDIA scholarly context and misuse detection',
    endpoint: '/api/islamic/tafsir?surah=2&ayah=256&claim=الإسلام يفرض الإكراه على الدين',
    payload: {},
    link: '/religion-hub/tools/quran-context',
    metrics: [{ label: 'Tafsir Sources', value: '16' }, { label: 'Scholars', value: 'Ibn Kathir+' }, { label: 'Claim Check', value: '✓ Active' }],
  },
  {
    id: 'assessment-nlp',
    title: 'Arabic NLP Deep Analysis',
    titleAr: 'التحليل اللغوي العربي العميق',
    category: 'NLP',
    color: '#ec4899',
    icon: '🗣️',
    description: 'Egyptian dialect detection + manipulation signal analysis with NVIDIA',
    endpoint: '/api/nlp/arabic',
    payload: { text: 'يا شباب الكلام ده خطييير جداً!!!! شاركوه قبل ما يتمسح! الحكومة مش عايزاكم تعرفوا الحقيقة دي', deep: true },
    link: '/whatsapp-analyzer',
    metrics: [{ label: 'Dialects', value: '6' }, { label: 'Manipulation', value: 'Detected' }, { label: 'Viral Score', value: '0-1.0' }],
  },
];

interface StepResult {
  status: 'pending' | 'loading' | 'done' | 'error';
  data?: Record<string, unknown>;
  error?: string;
  timeMs?: number;
}

export default function CompetitionDemoPage() {
  const [currentStep, setCurrentStep] = useState(-1);
  const [results, setResults] = useState<Record<string, StepResult>>({});
  const [isRunning, setIsRunning] = useState(false);
  const [totalTime, setTotalTime] = useState(0);
  const [autoPlay, setAutoPlay] = useState(false);

  const runStep = useCallback(async (step: DemoStep) => {
    setResults(prev => ({ ...prev, [step.id]: { status: 'loading' } }));
    const start = Date.now();
    try {
      const isGet = Object.keys(step.payload).length === 0;
      const url = isGet ? step.endpoint : step.endpoint;
      const res = await fetch(url, isGet ? { method: 'GET' } : {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(step.payload),
      });
      const data = await res.json();
      const timeMs = Date.now() - start;
      setResults(prev => ({ ...prev, [step.id]: { status: 'done', data, timeMs } }));
      setTotalTime(t => t + timeMs);
    } catch (err) {
      setResults(prev => ({ ...prev, [step.id]: { status: 'error', error: String(err) } }));
    }
  }, []);

  const runAllSteps = useCallback(async () => {
    setIsRunning(true);
    setResults({});
    setTotalTime(0);
    for (let i = 0; i < DEMO_STEPS.length; i++) {
      setCurrentStep(i);
      await runStep(DEMO_STEPS[i]);
      await new Promise(r => setTimeout(r, 300));
    }
    setCurrentStep(-1);
    setIsRunning(false);
  }, [runStep]);

  useEffect(() => {
    if (autoPlay) {
      const timer = setTimeout(runAllSteps, 1500);
      return () => clearTimeout(timer);
    }
  }, [autoPlay, runAllSteps]);

  const completedCount = Object.values(results).filter(r => r.status === 'done').length;
  const totalSteps = DEMO_STEPS.length;

  return (
    <div style={{ minHeight: '100vh', background: '#020617', color: '#f8fafc', fontFamily: 'Inter, sans-serif' }}>
      {/* ── HERO ── */}
      <div style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)',
        borderBottom: '1px solid #1e293b',
        padding: '3rem 2rem',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Grid overlay */}
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.04,
          backgroundImage: 'linear-gradient(#6366f1 1px, transparent 1px), linear-gradient(90deg, #6366f1 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-block', background: 'linear-gradient(90deg, #f59e0b, #ef4444)', borderRadius: '999px', padding: '4px 16px', fontSize: '12px', fontWeight: 700, marginBottom: '1rem', letterSpacing: '2px' }}>
            🏆 COMPETITION DEMO
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, margin: '0 0 1rem', background: 'linear-gradient(135deg, #f8fafc, #818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Live Platform Capabilities
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '1.1rem', marginBottom: '0.5rem' }}>
            مكتبة الوعي المصري — Egyptian Awareness Library
          </p>
          <p style={{ color: '#64748b', maxWidth: '600px', margin: '0 auto 2rem' }}>
            Watch {totalSteps} AI-powered engines run in real-time. Powered by NVIDIA NIM Nemotron.
          </p>
          {/* Stats Bar */}
          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '2rem' }}>
            {[
              { v: '77+', l: 'API Routes' },
              { v: '5', l: 'AI Models' },
              { v: '144', l: 'Day Curriculum' },
              { v: '33', l: 'Science Exercises' },
              { v: '9', l: 'Islamic Tools' },
              { v: '116', l: 'Pages' },
            ].map(s => (
              <div key={s.l} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.75rem', fontWeight: 900, color: '#818cf8' }}>{s.v}</div>
                <div style={{ fontSize: '0.75rem', color: '#475569' }}>{s.l}</div>
              </div>
            ))}
          </div>
          {/* Controls */}
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={runAllSteps}
              disabled={isRunning}
              style={{
                padding: '14px 32px', borderRadius: '12px', border: 'none', cursor: isRunning ? 'not-allowed' : 'pointer',
                background: isRunning ? '#374151' : 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                color: '#fff', fontSize: '1rem', fontWeight: 700,
                boxShadow: isRunning ? 'none' : '0 0 30px rgba(99,102,241,0.4)',
                transition: 'all 0.2s',
              }}
            >
              {isRunning ? `⏳ Running (${completedCount}/${totalSteps})...` : '▶ Run All Demos'}
            </button>
            <button
              onClick={() => setAutoPlay(v => !v)}
              style={{
                padding: '14px 24px', borderRadius: '12px', border: `1px solid ${autoPlay ? '#10b981' : '#334155'}`,
                background: autoPlay ? 'rgba(16,185,129,0.1)' : 'transparent',
                color: autoPlay ? '#10b981' : '#94a3b8', cursor: 'pointer', fontSize: '1rem',
              }}
            >
              {autoPlay ? '✓ Auto-Play ON' : '⚙ Auto-Play'}
            </button>
            <Link href="/" style={{
              padding: '14px 24px', borderRadius: '12px', border: '1px solid #334155',
              background: 'transparent', color: '#94a3b8', fontSize: '1rem', textDecoration: 'none',
            }}>
              ← Back Home
            </Link>
          </div>

          {/* Progress Bar */}
          {isRunning && (
            <div style={{ marginTop: '1.5rem', maxWidth: '500px', margin: '1.5rem auto 0' }}>
              <div style={{ background: '#1e293b', borderRadius: '999px', height: '8px', overflow: 'hidden' }}>
                <div style={{ width: `${(completedCount / totalSteps) * 100}%`, height: '100%', background: 'linear-gradient(90deg, #6366f1, #10b981)', transition: 'width 0.5s', borderRadius: '999px' }} />
              </div>
              <div style={{ color: '#64748b', fontSize: '0.8rem', marginTop: '6px' }}>
                {completedCount}/{totalSteps} engines completed • {(totalTime / 1000).toFixed(1)}s total
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── DEMO STEPS ── */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '2rem 1rem' }}>
        <div style={{ display: 'grid', gap: '1.5rem' }}>
          {DEMO_STEPS.map((step, idx) => {
            const result = results[step.id];
            const isActive = currentStep === idx;
            const isDone = result?.status === 'done';
            const isLoading = result?.status === 'loading';
            const isError = result?.status === 'error';

            return (
              <div key={step.id} style={{
                background: isActive ? 'rgba(99,102,241,0.05)' : '#0f172a',
                border: `1px solid ${isActive ? '#6366f1' : isDone ? step.color + '40' : '#1e293b'}`,
                borderRadius: '16px',
                overflow: 'hidden',
                transition: 'all 0.3s',
                boxShadow: isActive ? `0 0 30px ${step.color}20` : 'none',
              }}>
                {/* Header */}
                <div style={{ padding: '1.25rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                  <div style={{
                    width: '48px', height: '48px', borderRadius: '12px',
                    background: `${step.color}20`, border: `1px solid ${step.color}40`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', flexShrink: 0,
                  }}>
                    {isLoading ? <span style={{ animation: 'spin 1s linear infinite', display: 'inline-block' }}>⚙</span> : isDone ? '✅' : isError ? '❌' : step.icon}
                  </div>
                  <div style={{ flex: 1, minWidth: '200px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                      <span style={{ background: `${step.color}30`, color: step.color, padding: '2px 8px', borderRadius: '999px', fontSize: '11px', fontWeight: 700 }}>{step.category}</span>
                      <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: '#f8fafc' }}>{step.title}</h3>
                    </div>
                    <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: '#64748b' }}>{step.description}</p>
                    <p style={{ margin: '2px 0 0', fontSize: '0.8rem', color: '#475569', fontFamily: 'Cairo, sans-serif' }}>{step.titleAr}</p>
                  </div>
                  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    {step.metrics.map(m => (
                      <div key={m.label} style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '0.9rem', fontWeight: 700, color: step.color }}>{m.value}</div>
                        <div style={{ fontSize: '0.65rem', color: '#475569' }}>{m.label}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => runStep(step)}
                      disabled={isLoading || isRunning}
                      style={{
                        padding: '8px 16px', borderRadius: '8px', border: `1px solid ${step.color}60`,
                        background: `${step.color}15`, color: step.color, cursor: isLoading ? 'not-allowed' : 'pointer',
                        fontSize: '0.8rem', fontWeight: 600,
                      }}
                    >
                      {isLoading ? 'Running...' : 'Run'}
                    </button>
                    <Link href={step.link} style={{
                      padding: '8px 16px', borderRadius: '8px', border: '1px solid #1e293b',
                      color: '#64748b', fontSize: '0.8rem', textDecoration: 'none',
                    }}>
                      Open →
                    </Link>
                  </div>
                </div>

                {/* Payload preview */}
                {Object.keys(step.payload).length > 0 && (
                  <div style={{ padding: '0 1.5rem 0.75rem' }}>
                    <div style={{ background: '#0a0f1a', borderRadius: '8px', padding: '10px 14px', border: '1px solid #1e293b' }}>
                      <div style={{ fontSize: '0.7rem', color: '#475569', marginBottom: '4px' }}>INPUT (Arabic Misinformation Claim):</div>
                      <div style={{ fontSize: '0.85rem', color: '#94a3b8', fontFamily: 'Cairo, monospace', direction: 'rtl', textAlign: 'right' }}>
                        {JSON.stringify(step.payload).substring(0, 200)}
                      </div>
                    </div>
                  </div>
                )}

                {/* Result */}
                {isDone && result?.data && (
                  <div style={{ padding: '0 1.5rem 1.25rem' }}>
                    <div style={{ background: '#0a0f1a', borderRadius: '8px', border: `1px solid ${step.color}30`, padding: '12px 14px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', flexWrap: 'wrap', gap: '8px' }}>
                        <span style={{ fontSize: '0.7rem', color: '#10b981', fontWeight: 600 }}>✓ RESULT — {result.timeMs}ms</span>
                        <span style={{ fontSize: '0.7rem', color: '#475569' }}>
                          Provider: {(result.data as any)?.provider || (result.data as any)?.aiProvider || 'NVIDIA NIM'}
                        </span>
                      </div>
                      {/* Smart result display */}
                      <ResultDisplay data={result.data} step={step} />
                    </div>
                  </div>
                )}
                {isError && (
                  <div style={{ padding: '0 1.5rem 1rem', color: '#ef4444', fontSize: '0.8rem' }}>
                    ⚠ {result?.error}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* ── PLATFORM LINKS ── */}
        <div style={{ marginTop: '3rem', padding: '2rem', background: '#0f172a', borderRadius: '16px', border: '1px solid #1e293b' }}>
          <h2 style={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.5rem', color: '#f8fafc' }}>
            🗺 Explore All 116 Pages
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '0.75rem' }}>
            {[
              { href: '/angry-debunkers', label: '⚡ Angry Debunkers', color: '#f59e0b' },
              { href: '/swarm-debate', label: '⚔️ Swarm Debate', color: '#ef4444' },
              { href: '/science', label: '🔬 Science Hub', color: '#3b82f6' },
              { href: '/religion-hub', label: '🕌 Islamic Hub', color: '#10b981' },
              { href: '/platform-guide', label: '📖 Platform Guide', color: '#8b5cf6' },
              { href: '/features', label: '✨ All Features', color: '#6366f1' },
              { href: '/curriculum/phase0', label: '🎓 Curriculum', color: '#ec4899' },
              { href: '/dashboard', label: '📊 Dashboard', color: '#14b8a6' },
              { href: '/impact', label: '🏆 Our Impact', color: '#f59e0b' },
              { href: '/why-us', label: '🥇 Why Us', color: '#6366f1' },
              { href: '/fallacy-engine', label: '🧩 Fallacy Engine', color: '#8b5cf6' },
              { href: '/osint-investigator', label: '🔎 OSINT', color: '#06b6d4' },
            ].map(item => (
              <Link key={item.href} href={item.href} style={{
                display: 'block', padding: '10px 14px', borderRadius: '10px',
                background: `${item.color}10`, border: `1px solid ${item.color}30`,
                color: item.color, textDecoration: 'none', fontSize: '0.85rem', fontWeight: 600,
                transition: 'all 0.2s', textAlign: 'center',
              }}>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;
700&family=Inter:wght@400;600;700;900&display=swap');
      `}</style>
    </div>
  );
}

function ResultDisplay({ data, step }: { data: Record<string, unknown>; step: DemoStep }) {
  // Smart display based on step type
  if (step.id === 'god-system') {
    const verdict = (data as any)?.verdict || (data as any)?.data?.verdict;
    const explanation = (data as any)?.verdictExplanation_ar || (data as any)?.layer6?.fact1_ar;
    const layer4 = (data as any)?.layer4;
    return (
      <div>
        {verdict && <div style={{ fontSize: '1rem', fontWeight: 700, color: verdict === 'DEBUNKED' ? '#ef4444' : verdict === 'TRUE' ? '#10b981' : '#f59e0b', marginBottom: '8px' }}>Verdict: {verdict}</div>}
        {explanation && <div style={{ fontSize: '0.8rem', color: '#94a3b8', direction: 'rtl', textAlign: 'right', fontFamily: 'Cairo, sans-serif', marginBottom: '8px' }}>{String(explanation).substring(0, 200)}</div>}
        {layer4?.fallacies?.length > 0 && <div style={{ fontSize: '0.75rem', color: '#f59e0b' }}>Fallacies: {layer4.fallacies.map((f: any) => f.name).join(', ')}</div>}
      </div>
    );
  }
  if (step.id === 'fallacy-detect') {
    const count = (data as any)?.totalDetected || 0;
    const ai = (data as any)?.aiAnalysis;
    return (
      <div>
        <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#6366f1', marginBottom: '6px' }}>{count} fallacies detected</div>
        {ai?.dominantBias && <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Dominant: {ai.dominantBias}</div>}
        {ai?.deconstructionGuide_ar && <div style={{ fontSize: '0.8rem', color: '#94a3b8', direction: 'rtl', textAlign: 'right', fontFamily: 'Cairo, sans-serif', marginTop: '6px' }}>{String(ai.deconstructionGuide_ar).substring(0, 150)}</div>}
      </div>
    );
  }
  if (step.id === 'bias-detect') {
    const count = (data as any)?.totalDetected || 0;
    const ai = (data as any)?.aiEnhancement;
    return (
      <div>
        <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#8b5cf6', marginBottom: '6px' }}>{count} biases detected</div>
        {ai?.dominantBias && <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Dominant: {ai.dominantBias} (score: {ai.overallBiasScore})</div>}
        {ai?.alternativeInterpretationAr && <div style={{ fontSize: '0.8rem', color: '#94a3b8', direction: 'rtl', textAlign: 'right', fontFamily: 'Cairo, sans-serif', marginTop: '6px' }}>{String(ai.alternativeInterpretationAr).substring(0, 150)}</div>}
      </div>
    );
  }
  if (step.id === 'tafsir') {
    const tafsir = (data as any)?.results?.[0];
    const ctx = (data as any)?.scholarlyContext;
    return (
      <div>
        {tafsir?.text && <div style={{ fontSize: '0.8rem', color: '#94a3b8', direction: 'rtl', textAlign: 'right', fontFamily: 'Cairo, sans-serif', marginBottom: '8px' }}>{String(tafsir.text).substring(0, 200)}...</div>}
        {ctx?.claimAssessment?.verdict && <div style={{ fontSize: '0.85rem', fontWeight: 700, color: ctx.claimAssessment.verdict === 'INACCURATE' ? '#ef4444' : '#10b981' }}>Claim: {ctx.claimAssessment.verdict}</div>}
        {ctx?.commonMisuses?.[0] && <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '4px' }}>⚠ {ctx.commonMisuses[0]}</div>}
      </div>
    );
  }
  if (step.id === 'assessment-nlp') {
    const deep = (data as any)?.deepAnalysis;
    return (
      <div>
        {deep?.dialect && <div style={{ fontSize: '0.85rem', color: '#ec4899', marginBottom: '4px' }}>Dialect: {deep.dialect}</div>}
        {deep?.registeredEmotion && <div style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '4px' }}>Emotion: {deep.registeredEmotion} (intensity: {deep.emotionIntensity})</div>}
        {deep?.viralPotential !== undefined && <div style={{ fontSize: '0.85rem', color: deep.viralPotential > 0.7 ? '#ef4444' : '#f59e0b' }}>Viral Potential: {(deep.viralPotential * 100).toFixed(0)}%</div>}
        {deep?.manipulationTechniques?.length > 0 && <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '4px' }}>Techniques: {deep.manipulationTechniques.map((t: any) => t.technique).join(', ')}</div>}
        <PageNavigation currentPath="/competition-demo" />
      </div>
    );
  }
  // Generic fallback
  return (
    <pre style={{ fontSize: '0.7rem', color: '#64748b', overflow: 'auto', maxHeight: '150px', whiteSpace: 'pre-wrap' }}>
      {JSON.stringify(data, null, 2).substring(0, 500)}...
    </pre>
  );
}
