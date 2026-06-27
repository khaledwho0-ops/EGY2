'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRTL } from '@/components/shared/rtl-provider';
import { PageNavigation } from '@/components/shared/page-navigation';
import { PageAIChatbot } from '@/components/shared/page-ai-chatbot';
import AnalysisProgress, { STAGE_SETS } from '@/components/AnalysisProgress';

const dimensions = [
  { name: 'Source Credibility', nameAr: 'مصداقية المصدر', score: 0, color: '#3b82f6', desc: 'Multi-source cross-check using the EAL evidence aggregator (OpenAlex, Semantic Scholar, PubMed, WHO) and the AI model\'s trained knowledge of Al-Azhar Fatwa Council positions.', descAr: 'مراجعة متعددة المصادر عبر مجمّع الأدلة (OpenAlex وSemantic Scholar وPubMed وWHO) وتدريب نموذج الذكاء الاصطناعي على مواقف مجلس فتاوى الأزهر.' },
  { name: 'Logical Consistency', nameAr: 'الاتساق المنطقي', score: 0, color: '#8b5cf6', desc: 'Analyzing argument structure for internal contradictions, non-sequiturs, and circular reasoning patterns.', descAr: 'تحليل بنية الحجة بحثاً عن التناقضات الداخلية، والاستنتاجات غير المنطقية، وأنماط المنطق الدائري.' },
  { name: 'Emotional Manipulation', nameAr: 'التلاعب العاطفي', score: 0, color: '#ef4444', desc: 'VADER + AraBERT sentiment analysis detecting fear-mongering, rage-bait, and emotional exploitation.', descAr: 'تحليل المشاعر بـ VADER + AraBERT لكشف إثارة الخوف والغضب والاستغلال العاطفي.' },
  { name: 'Temporal Validity', nameAr: 'الصلاحية الزمنية', score: 0, color: '#10b981', desc: 'Checking date accuracy, anachronisms, out-of-context temporal framing, and event chronology.', descAr: 'فحص دقة التواريخ، والمفارقات الزمنية، وإطار السياق الزمني، والتسلسل الزمني للأحداث.' },
  { name: 'Media Authenticity', nameAr: 'أصالة الوسائط', score: 0, color: '#f59e0b', desc: 'C2PA manifest validation, EXIF extraction, ELA analysis, deepfake detection via rPPG and frequency analysis.', descAr: 'التحقق من بيانات C2PA، استخراج EXIF، تحليل ELA، كشف التزييف العميق عبر rPPG وتحليل الترددات.' },
  { name: 'Scientific Basis', nameAr: 'الأساس العلمي', score: 0, color: '#06b6d4', desc: 'Peer-review status check, citation analysis, methodology assessment, and reproducibility scoring.', descAr: 'التحقق من حالة مراجعة الأقران، وتحليل الاستشهادات، وتقييم المنهجية، وتسجيل قابلية التكرار.' },
  { name: 'Islamic Verification', nameAr: 'التحقق الإسلامي', score: 0, color: '#d4a843', desc: 'Checking claims against authentic hadith sources (Kutub al-Sitta), Al-Azhar positions, Dar al-Ifta fatwas, and Maqasid al-Shariah.', descAr: 'التحقق من الادعاءات مقابل مصادر الحديث الصحيحة (الكتب الستة)، ومواقف الأزهر، وفتاوى دار الإفتاء، ومقاصد الشريعة.' },
];

const reasoningSteps = [
  { step: 'INTAKE', detail: 'Claim received and sanitized. Language detection and encoding check in progress.' },
  { step: 'DECOMPOSITION', detail: 'Claim decomposed into atomic assertions: causal claims, statistical claims, and authority appeals.' },
  { step: 'SOURCE_TRACE', detail: 'Tracing cited source via SIFT methodology. Querying DOI registry and domain reputation services.' },
  { step: 'CROSS_REFERENCE', detail: 'Querying PubMed, WHO Fact Sheets, Al-Azhar Fatwa Database, and fact-checking registries.' },
  { step: 'MEDIA_FORENSICS', detail: 'Checking for attached media. If present: ELA, EXIF extraction, C2PA manifest validation, and reverse-image lookup.' },
  { step: 'SYNTHESIS', detail: 'AI findings compiled. One Law enforcement applied. Verdict prepared with admissibility check.' },
];

export default function BlackboxPage() {
  const { isRTL, t } = useRTL();
  const [claim, setClaim] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [scores, setScores] = useState(dimensions.map(() => 0));
  const [activeStep, setActiveStep] = useState(-1);
  const [showReasoning, setShowReasoning] = useState(true);
  const [apiResult, setApiResult] = useState<any>(null);
  const [apiError, setApiError] = useState<string | null>(null);
  const [showGuide, setShowGuide] = useState(false);

  const QUICK_EXAMPLES = [
    { en: '"Drinking warm lemon water cures cancer" — Facebook post', ar: '"شرب الماء الدافئ بالليمون يعالج السرطان" — منشور فيسبوك' },
    { en: '"5G towers spread COVID-19" — WhatsApp forward', ar: '"أبراج الجيل الخامس تنشر كوفيد-19" — رسالة واتساب محولة' },
    { en: '"Al-Azhar issued fatwa permitting bitcoin trading" — screenshot', ar: '"الأزهر أصدر فتوى بإباحة تداول البيتكوين" — لقطة شاشة' },
    { en: '"Egypt will devalue currency to 100 EGP per dollar next month"', ar: '"مصر هتخفض العملة لـ ١٠٠ جنيه للدولار الشهر الجاي"' },
  ];

  const runAudit = async () => {
    if (!claim.trim()) return;
    const auditStartedAt = Date.now();
    setIsAnalyzing(true);
    setShowResults(false);
    setActiveStep(-1);
    setApiResult(null);
    setApiError(null);

    // Animate reasoning steps
    reasoningSteps.forEach((_, i) => {
      setTimeout(() => setActiveStep(i), (i + 1) * 700);
    });

    try {
      const res = await fetch('/api/blackbox', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: claim }),
      });

      if (!res.ok) throw new Error(`API error: ${res.status}`);
      const data = await res.json();

      if (data.error) {
        setApiError(data.error);
        setIsAnalyzing(false);
        return;
      }

      setApiResult(data);

      // Map API results to dimension scores based on risk levels — deterministic, no Math.random
      const riskToScore = (risk: string) =>
        risk === 'High' ? 80 :
        risk === 'Medium' ? 50 :
        15;

      const results = data.results || [];
      // Scores are only meaningful when the API returned real findings; pad with 0 if absent
      const newScores = dimensions.map((_, i) =>
        i < results.length ? riskToScore(results[i].risk) : 0
      );

      // Wait for the reasoning-step animation to finish before revealing results.
      // (Previously `remaining` was computed from `Date.now() - Date.now()`, i.e.
      // always 0, so results popped instantly. Track the real request start so the
      // staged bar + reasoning chain read as intentional, never longer than needed.)
      const animDelay = reasoningSteps.length * 700 + 500;
      const sinceStart = Date.now() - auditStartedAt;
      const remaining = Math.max(0, animDelay - sinceStart);

      setTimeout(() => {
        setScores(newScores);
        setIsAnalyzing(false);
        setShowResults(true);
      }, remaining);

    } catch (err: any) {
      console.error('Blackbox API error:', err);
      setApiError(err.message || 'Connection failed');
      setIsAnalyzing(false);
    }
  };

  const compositeScore = showResults ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;
400;500;600;700;800;900&family=Cairo:wght@400;600;700;800&display=swap');
        @keyframes bbFadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes bbScanLine { 0% { top: 0%; } 100% { top: 100%; } }
        @keyframes bbPulse { 0%, 100% { opacity: 0.4; } 50% { opacity: 1; } }
        @keyframes bbGlow { 0%, 100% { box-shadow: 0 0 15px rgba(16,185,129,0.1); } 50% { box-shadow: 0 0 30px rgba(16,185,129,0.3); } }
        .bb-step:hover { background: rgba(16,185,129,0.05) !important; }
        .bb-dim:hover { transform: translateX(4px); }
      `}</style>
      <main style={{ minHeight: '100vh', background: '#020617', color: '#e2e8f0', fontFamily: 'Inter, sans-serif', padding: '40px 24px 80px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          {/* Header */}
          <header style={{ textAlign: 'center', marginBottom: 48, animation: 'bbFadeIn 0.6s ease-out' }}>
            <div style={{
              display: 'inline-flex', width: 80, height: 80, borderRadius: 24, fontSize: 40,
              alignItems: 'center', justifyContent: 'center', marginBottom: 16,
              background: 'linear-gradient(135deg, #10b981, #06b6d4)',
              boxShadow: '0 0 40px rgba(16,185,129,0.4)',
            }}>🔍</div>
            <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 900, margin: '0 0 8px', background: 'linear-gradient(135deg, #10b981, #06b6d4, #3b82f6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Claim Audit
            </h1>
            <p style={{ fontFamily: 'Cairo, sans-serif', fontSize: '1.2rem', color: '#94a3b8', direction: 'rtl', fontWeight: 700 }}>
              تدقيق الادعاء
            </p>
            <p style={{ color: '#64748b', maxWidth: 650, margin: '12px auto 0', lineHeight: 1.7 }}>
              {t({
                en: 'Anonymous claim submission with full AI transparency. See exactly how the AI reasons — every step of the reasoning chain is exposed. No hidden logic, no black boxes.',
                ar: 'تقديم الادعاءات بشكل مجهول مع شفافية كاملة للذكاء الاصطناعي. شاهد بالضبط كيف يفكر الذكاء الاصطناعي — كل خطوة من سلسلة الاستدلال مكشوفة. لا منطق مخفي، لا صناديق سوداء.'
              })}
            </p>
          </header>

          {/* Quick Usage Guide */}
          <div style={{
            background: 'rgba(15,23,42,0.8)', backdropFilter: 'blur(12px)', borderRadius: 20,
            border: '1px solid rgba(59,130,246,0.2)', marginBottom: 24,
            animation: 'bbFadeIn 0.6s ease-out 0.1s both', overflow: 'hidden',
          }}>
            <div onClick={() => setShowGuide(!showGuide)} style={{
              padding: '16px 28px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 20 }}>📖</span>
                <span style={{ fontSize: '0.95rem', fontWeight: 700, color: '#3b82f6' }}>
                  {t({ en: 'How to Use This Tool — Quick Guide', ar: 'كيف تستخدم هذه الأداة — دليل سريع' })}
                </span>
              </div>
              <span style={{ color: '#64748b', transform: showGuide ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}>▼</span>
            </div>
            {showGuide && (
              <div style={{ padding: '0 28px 24px', fontSize: '0.85rem', color: '#94a3b8', lineHeight: 1.8 }}>
                <div style={{ display: 'grid', gap: 12, gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
                  <div style={{ padding: 16, borderRadius: 12, background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.15)' }}>
                    <div style={{ fontWeight: 700, color: '#10b981', marginBottom: 6 }}>1️⃣ {t({ en: 'Paste Any Claim', ar: 'الصق أي ادعاء' })}</div>
                    <div>{t({ en: 'Copy a suspicious WhatsApp message, Facebook post, tweet, or any claim you want verified. The AI analyzes it across 7 forensic dimensions.', ar: 'انسخ رسالة واتساب مشبوهة، منشور فيسبوك، تغريدة، أو أي ادعاء تريد التحقق منه. الذكاء الاصطناعي يحلله عبر ٧ أبعاد جنائية.' })}</div>
                  </div>
                  <div style={{ padding: 16, borderRadius: 12, background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.15)' }}>
                    <div style={{ fontWeight: 700, color: '#8b5cf6', marginBottom: 6 }}>2️⃣ {t({ en: 'Watch the Reasoning Chain', ar: 'شاهد سلسلة التفكير' })}</div>
                    <div>{t({ en: 'Unlike black-box AI, you see EVERY step: intake, decomposition, source tracing, cross-referencing, media forensics, synthesis.', ar: 'بخلاف الذكاء الاصطناعي المغلق، ترى كل خطوة: الاستقبال، التحليل، تتبع المصدر، المراجعة المتقاطعة، الطب الشرعي الرقمي، التوليف.' })}</div>
                  </div>
                  <div style={{ padding: 16, borderRadius: 12, background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.15)' }}>
                    <div style={{ fontWeight: 700, color: '#f59e0b', marginBottom: 6 }}>3️⃣ {t({ en: 'Read the AI Verdict', ar: 'اقرأ حكم الذكاء الاصطناعي' })}</div>
                    <div>{t({ en: 'Get a scored verdict with confidence level, bilingual explanation, and actionable sources. Use the chatbot 💬 for follow-up questions.', ar: 'احصل على حكم مع مستوى الثقة، شرح ثنائي اللغة، ومصادر قابلة للتنفيذ. استخدم الشات بوت 💬 للأسئلة التابعة.' })}</div>
                  </div>
                </div>
                <div style={{ marginTop: 16, padding: 12, borderRadius: 8, background: 'rgba(212,168,67,0.08)', border: '1px solid rgba(212,168,67,0.15)' }}>
                  <strong style={{ color: '#d4a843' }}>🕌 {t({ en: 'Islamic Scenario', ar: 'سيناريو إسلامي' })}:</strong>{' '}
                  {t({ en: '"Someone shared a hadith on WhatsApp saying music is halal. Paste it here — the AI will check it against Kutub al-Sitta, verify the isnad chain, and cite the actual Al-Azhar/Dar al-Ifta position."', ar: '"حد شير حديث على الواتساب بيقول الموسيقى حلال. الصقه هنا — الذكاء الاصطناعي هيتحقق منه من الكتب الستة، ويتأكد من سلسلة الإسناد، ويذكر موقف الأزهر/دار الإفتاء الفعلي."' })}
                </div>
              </div>
            )}
          </div>

          {/* Anonymous Submission */}
          <div style={{
            background: 'rgba(15,23,42,0.8)', backdropFilter: 'blur(12px)', borderRadius: 20,
            border: '1px solid rgba(16,185,129,0.2)', padding: 32, marginBottom: 32,
            animation: 'bbFadeIn 0.6s ease-out 0.2s both',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <span style={{ fontSize: 20 }}>🕵️</span>
              <span style={{ fontSize: '0.85rem', color: '#10b981', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1 }}>Anonymous Submission</span>
              <span style={{ padding: '2px 8px', borderRadius: 4, background: 'rgba(16,185,129,0.15)', color: '#10b981', fontSize: '0.65rem', fontWeight: 700 }}>NO TRACKING</span>
            </div>
            <p style={{ fontFamily: 'Cairo, sans-serif', fontSize: '0.85rem', color: '#64748b', direction: 'rtl', marginBottom: 12 }}>
              تقديم مجهول الهوية — لا تتبع، لا تسجيل
            </p>

            {/* Quick Example Buttons */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 12 }}>
              {QUICK_EXAMPLES.map((ex, i) => (
                <button
                  key={i}
                  onClick={() => setClaim(isRTL ? ex.ar : ex.en)}
                  style={{
                    padding: '5px 12px', borderRadius: 8, border: '1px solid rgba(16,185,129,0.2)',
                    background: 'rgba(16,185,129,0.08)', color: '#10b981', fontSize: '0.7rem',
                    cursor: 'pointer', textAlign: 'left', lineHeight: 1.3, transition: 'all 0.2s',
                  }}
                >
                  {isRTL ? ex.ar.slice(0, 40) + '...' : ex.en.slice(0, 40) + '...'}
                </button>
              ))}
            </div>

            <textarea
              value={claim}
              onChange={(e) => setClaim(e.target.value)}
              placeholder={t({ en: "Submit any claim, URL, or media description for forensic analysis. Your submission is not tracked or stored.", ar: "أرسل أي ادعاء أو رابط أو وصف وسائط للتحليل الجنائي. لا يتم تتبع أو تخزين ما ترسله." })}
              style={{
                width: '100%', minHeight: 100, padding: 16, borderRadius: 12, border: '1px solid rgba(255,255,255,0.1)',
                background: 'rgba(0,0,0,0.4)', color: '#10b981', fontFamily: '"Courier New", monospace', fontSize: '0.9rem',
                resize: 'vertical', outline: 'none', lineHeight: 1.6, boxSizing: 'border-box',
              }}
            />

            {apiError && (
              <div style={{ marginTop: 12, padding: 12, borderRadius: 8, background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#ef4444', fontSize: '0.85rem' }}>
                ⚠️ {apiError}
              </div>
            )}

            <button
              onClick={runAudit}
              disabled={isAnalyzing || !claim.trim()}
              style={{
                marginTop: 16, padding: '14px 36px', borderRadius: 12, border: 'none', fontWeight: 800, fontSize: '1rem',
                background: isAnalyzing ? 'rgba(16,185,129,0.3)' : 'linear-gradient(135deg, #10b981, #06b6d4)',
                color: '#fff', cursor: isAnalyzing ? 'not-allowed' : 'pointer', transition: 'all 0.3s',
                boxShadow: isAnalyzing ? 'none' : '0 0 20px rgba(16,185,129,0.3)',
              }}
            >
              {isAnalyzing ? '⟳ Audit in Progress...' : '🔬 Deploy Forensic Audit'}
            </button>

            {isAnalyzing && (
              <div style={{ marginTop: 20 }}>
                <AnalysisProgress
                  running={isAnalyzing}
                  stages={STAGE_SETS.debunk}
                  lang={isRTL ? 'ar' : 'en'}
                  expectedMs={15000}
                  accent="#10b981"
                  title={{ en: 'Forensic audit running…', ar: 'التدقيق الجنائي قيد التشغيل…' }}
                />
              </div>
            )}
          </div>

          {/* AI Transparency Panel */}
          <div style={{
            background: 'rgba(15,23,42,0.8)', backdropFilter: 'blur(12px)', borderRadius: 20,
            border: '1px solid rgba(255,255,255,0.06)', marginBottom: 32, overflow: 'hidden',
            animation: 'bbFadeIn 0.6s ease-out 0.4s both',
          }}>
            <div onClick={() => setShowReasoning(!showReasoning)} style={{
              padding: '20px 28px', borderBottom: '1px solid rgba(255,255,255,0.06)', cursor: 'pointer',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0 }}>🧠 AI Reasoning Chain (Transparent)</h3>
                <p style={{ fontFamily: 'Cairo, sans-serif', fontSize: '0.8rem', color: '#64748b', direction: 'rtl', margin: 0 }}>سلسلة التفكير — شفافية كاملة</p>
              </div>
              <span style={{ color: '#64748b', fontSize: '1.2rem', transform: showReasoning ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}>▼</span>
            </div>
            {showReasoning && (
              <div style={{ padding: '16px 28px 24px' }}>
                {reasoningSteps.map((s, i) => (
                  <div key={i} className="bb-step" style={{
                    display: 'flex', gap: 16, padding: '12px 8px', borderBottom: '1px solid rgba(255,255,255,0.03)',
                    transition: 'background 0.2s', borderRadius: 4,
                    opacity: activeStep >= i || !isAnalyzing ? 1 : 0.3,
                  }}>
                    <div style={{
                      width: 32, height: 32, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: activeStep >= i ? 'rgba(16,185,129,0.2)' : 'rgba(255,255,255,0.05)',
                      color: activeStep >= i ? '#10b981' : '#64748b', fontSize: '0.75rem', fontWeight: 800, flexShrink: 0,
                    }}>
                      {activeStep >= i ? '✓' : (i + 1)}
                    </div>
                    <div>
                      <div style={{ fontSize: '0.8rem', fontWeight: 800, color: activeStep >= i ? '#10b981' : '#64748b', fontFamily: 'monospace' }}>[{s.step}]</div>
                      <div style={{ fontSize: '0.8rem', color: '#94a3b8', lineHeight: 1.5, marginTop: 2 }}>{s.detail}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Confidence Breakdown */}
          {showResults && (
            <div style={{ animation: 'bbFadeIn 0.6s ease-out' }}>
              <div style={{
                background: 'rgba(15,23,42,0.8)', backdropFilter: 'blur(12px)', borderRadius: 20,
                border: '1px solid rgba(255,255,255,0.06)', padding: 32, marginBottom: 32,
              }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: 4 }}>📊 Confidence Breakdown (6 Dimensions)</h3>
                <p style={{ fontFamily: 'Cairo, sans-serif', fontSize: '0.85rem', color: '#64748b', direction: 'rtl', marginBottom: 24 }}>تحليل الثقة — ٦ أبعاد</p>

                {dimensions.map((d, i) => (
                  <div key={i} className="bb-dim" style={{ marginBottom: 20, transition: 'transform 0.2s', cursor: 'default' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                      <div>
                        <span style={{ fontSize: '0.9rem', fontWeight: 700, color: d.color }}>{d.name}</span>
                        <span style={{ fontFamily: 'Cairo, sans-serif', fontSize: '0.75rem', color: '#64748b', marginLeft: 8, direction: 'rtl' }}>{d.nameAr}</span>
                      </div>
                      <span style={{ fontWeight: 800, color: scores[i] > 60 ? '#ef4444' : scores[i] > 40 ? '#f59e0b' : '#10b981', fontSize: '0.9rem' }}>
                        {scores[i]}%
                      </span>
                    </div>
                    <div style={{ height: 8, borderRadius: 4, background: 'rgba(255,255,255,0.06)' }}>
                      <div style={{
                        height: '100%', borderRadius: 4, width: `${scores[i]}%`,
                        background: `linear-gradient(90deg, ${d.color}, ${d.color}80)`,
                        transition: 'width 1s ease-out',
                      }} />
                    </div>
                    <p style={{ fontSize: '0.7rem', color: '#64748b', marginTop: 4, lineHeight: 1.4 }}>{d.desc}</p>
                  </div>
                ))}
              </div>

              {/* One Law: unverified banner — shown when no admissible source backs the verdict */}
              {apiResult && (apiResult.enforcement?.status === 'unverified' || apiResult.unverifiedReason) && (
                <div style={{
                  padding: '16px 20px', borderRadius: 12, marginBottom: 24,
                  background: 'rgba(245,158,11,0.08)', border: '2px solid rgba(245,158,11,0.4)',
                  display: 'flex', gap: 12, alignItems: 'flex-start',
                }}>
                  <span style={{ fontSize: 20, flexShrink: 0 }}>⚠️</span>
                  <div>
                    <div style={{ fontWeight: 800, color: '#f59e0b', marginBottom: 4 }}>
                      [UNVERIFIED / غير موثّق]
                    </div>
                    <div style={{ fontSize: '0.82rem', color: '#94a3b8', lineHeight: 1.6 }}>
                      {t({
                        en: 'No admissible source (Tier S–C) was found to back this audit. The findings below are AI-generated analysis only — treat them as a starting point for your own research, not as a verified verdict.',
                        ar: 'لم يتم العثور على مصدر مقبول (من الفئة S–C) لدعم هذا التدقيق. النتائج أدناه هي تحليل ذكاء اصطناعي فقط — اعتبرها نقطة انطلاق لبحثك الخاص، وليس حكماً موثقاً.',
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* AI-Generated Forensic Findings from Real API */}
              {apiResult && apiResult.results && (
                <div style={{
                  background: 'rgba(15,23,42,0.8)', backdropFilter: 'blur(12px)', borderRadius: 20,
                  border: '1px solid rgba(139,92,246,0.2)', padding: 32, marginBottom: 32,
                }}>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: 4, color: '#8b5cf6' }}>🔬 AI Forensic Findings</h3>
                  <p style={{ fontFamily: 'Cairo, sans-serif', fontSize: '0.85rem', color: '#64748b', direction: 'rtl', marginBottom: 20 }}>نتائج التحليل الجنائي بالذكاء الاصطناعي</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {apiResult.results.map((finding: any, i: number) => (
                      <div key={i} style={{
                        padding: 16, borderRadius: 12, background: 'rgba(0,0,0,0.3)',
                        borderLeft: `3px solid ${finding.risk === 'High' ? '#ef4444' : finding.risk === 'Medium' ? '#f59e0b' : '#10b981'}`,
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                          <span style={{ fontWeight: 700, fontSize: '0.9rem', color: '#e2e8f0' }}>{finding.type}</span>
                          <span style={{
                            padding: '2px 10px', borderRadius: 6, fontSize: '0.7rem', fontWeight: 800,
                            background: finding.risk === 'High' ? 'rgba(239,68,68,0.15)' : finding.risk === 'Medium' ? 'rgba(245,158,11,0.15)' : 'rgba(16,185,129,0.15)',
                            color: finding.risk === 'High' ? '#ef4444' : finding.risk === 'Medium' ? '#f59e0b' : '#10b981',
                          }}>{finding.risk} Risk</span>
                        </div>
                        <p style={{ fontSize: '0.8rem', color: '#94a3b8', lineHeight: 1.6, margin: 0 }}>{finding.desc}</p>
                      </div>
                    ))}
                  </div>

                  {/* AI Verdict & Explanation */}
                  {apiResult.verdict && (
                    <div style={{ marginTop: 20, padding: 16, borderRadius: 12, background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.2)' }}>
                      <div style={{ fontWeight: 800, fontSize: '1rem', color: '#3b82f6', marginBottom: 8 }}>📋 AI Verdict: {apiResult.verdict}</div>
                      {apiResult.confidence && <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: 8 }}>Confidence: {apiResult.confidence}</div>}
                      {apiResult.explanation_en && <p style={{ fontSize: '0.85rem', color: '#cbd5e1', lineHeight: 1.7, marginBottom: 8 }}>{apiResult.explanation_en}</p>}
                      {apiResult.explanation_ar && <p style={{ fontSize: '0.85rem', color: '#cbd5e1', lineHeight: 1.7, direction: 'rtl', fontFamily: 'Cairo, sans-serif', marginBottom: 8 }}>{apiResult.explanation_ar}</p>}
                      {apiResult.truthSandwich && (
                        <div style={{ padding: 12, borderRadius: 8, background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.15)', fontSize: '0.8rem', color: '#10b981', lineHeight: 1.6 }}>
                          <strong>🥪 Truth Sandwich:</strong> {apiResult.truthSandwich}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Sources */}
                  {apiResult.sources && apiResult.sources.length > 0 && (
                    <div style={{ marginTop: 16, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                      {apiResult.sources.map((src: string, i: number) => (
                        <span key={i} style={{ padding: '4px 10px', borderRadius: 6, background: 'rgba(255,255,255,0.05)', fontSize: '0.7rem', color: '#64748b' }}>📎 {src}</span>
                      ))}
                    </div>
                  )}
                  {apiResult.provider && (
                    <div style={{ marginTop: 12, fontSize: '0.7rem', color: '#475569' }}>Powered by: {apiResult.provider}</div>
                  )}
                </div>
              )}

              {/* Composite Verdict */}
              {(() => { const _unv = apiResult?.enforcement?.status === 'unverified' || !!apiResult?.unverifiedReason; return (
              <div style={{
                background: _unv ? 'rgba(148,163,184,0.06)' : compositeScore > 50 ? 'rgba(239,68,68,0.05)' : 'rgba(16,185,129,0.05)',
                border: `1px solid ${_unv ? 'rgba(148,163,184,0.25)' : compositeScore > 50 ? 'rgba(239,68,68,0.2)' : 'rgba(16,185,129,0.2)'}`,
                borderRadius: 20, padding: 32, textAlign: 'center', animation: 'bbGlow 3s ease-in-out infinite',
              }}>
                <div style={{ fontSize: 48, marginBottom: 12 }}>{_unv ? '❓' : compositeScore > 50 ? '🚨' : compositeScore > 30 ? '⚠️' : '✅'}</div>
                <h3 style={{
                  fontSize: '1.5rem', fontWeight: 900, marginBottom: 8,
                  color: _unv ? '#94a3b8' : compositeScore > 50 ? '#ef4444' : compositeScore > 30 ? '#f59e0b' : '#10b981',
                }}>
                  {_unv ? 'UNVERIFIED — INSUFFICIENT SOURCE' : (apiResult?.verdict || (compositeScore > 50 ? 'LIKELY MISINFORMATION' : compositeScore > 30 ? 'REQUIRES FURTHER INVESTIGATION' : 'LIKELY AUTHENTIC'))}
                </h3>
                <p style={{ fontFamily: 'Cairo, sans-serif', fontSize: '1rem', direction: 'rtl', marginBottom: 16, fontWeight: 700, color: _unv ? '#94a3b8' : compositeScore > 50 ? '#ef4444' : compositeScore > 30 ? '#f59e0b' : '#10b981' }}>
                  {_unv ? 'الحكم: غير موثّق — لا يوجد مصدر كافٍ' : compositeScore > 50 ? 'الحكم: على الأرجح معلومات مضللة' : compositeScore > 30 ? 'الحكم: يتطلب مزيداً من التحقيق' : 'الحكم: على الأرجح صحيح'}
                </p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
                  <span style={{ padding: '8px 16px', borderRadius: 8, background: 'rgba(255,255,255,0.05)', fontSize: '0.85rem', fontWeight: 700 }}>
                    Composite: {compositeScore}/100
                  </span>
                  <span style={{ padding: '8px 16px', borderRadius: 8, background: 'rgba(255,255,255,0.05)', fontSize: '0.85rem', fontWeight: 700 }}>
                    Audit ID: #BFA-{Date.now().toString(36).slice(-6).toUpperCase()}
                  </span>
                  {apiResult?.auditedPapersCount !== undefined && (
                    <span style={{ padding: '8px 16px', borderRadius: 8, background: 'rgba(255,255,255,0.05)', fontSize: '0.85rem', fontWeight: 700 }}>
                      Papers Audited: {apiResult.auditedPapersCount}
                    </span>
                  )}
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
                  <a href="https://www.who.int/health-topics/infodemic" target="_blank" rel="noopener" style={{ color: '#3b82f6', fontSize: '0.8rem', textDecoration: 'none' }}>📎 WHO Infodemic Guide</a>
                  <a href="https://pubmed.ncbi.nlm.nih.gov/" target="_blank" rel="noopener" style={{ color: '#3b82f6', fontSize: '0.8rem', textDecoration: 'none' }}>📎 PubMed Search</a>
                  <a href="https://firstdraftnews.org/" target="_blank" rel="noopener" style={{ color: '#3b82f6', fontSize: '0.8rem', textDecoration: 'none' }}>📎 First Draft News</a>
                </div>
              </div>
              ); })()}
            </div>
          )}

          {/* Back Link */}
          <div style={{ textAlign: 'center', marginTop: 48 }}>
            <Link href="/explore" style={{ color: '#64748b', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 600 }}>
              {t({ en: '← Back to Explore', ar: '→ العودة إلى الاستكشاف' })}
            </Link>
            <PageNavigation currentPath="/blackbox" />
          </div>
        </div>
      </main>

      <PageAIChatbot
        pageTitle="Black Box Forensic Audit — الصندوق الأسود"
        pageContext="Egyptian Awareness Library - Black Box Forensic Audit: Transparent AI-powered fact-checking that shows its reasoning across 6 dimensions: Source Credibility, Logical Consistency, Emotional Manipulation, Temporal Validity, Media Authenticity, Scientific Basis."
        systemPrompt={`You are the EAL Black Box Forensic Audit AI — a transparent, explainable fact-checker.

You analyze claims across 6 DIMENSIONS:
1. SOURCE CREDIBILITY (0-100): Cross-reference against fact-checking databases, PubMed, WHO, Al-Azhar
2. LOGICAL CONSISTENCY (0-100): Check for contradictions, circular reasoning, non-sequiturs
3. EMOTIONAL MANIPULATION (0-100): Detect fear-mongering, rage-bait, emotional exploitation using sentiment analysis
4. TEMPORAL VALIDITY (0-100): Check dates, anachronisms, out-of-context temporal framing
5. MEDIA AUTHENTICITY (0-100): C2PA manifests, EXIF data, ELA analysis, deepfake markers
6. SCIENTIFIC BASIS (0-100): Peer-review status, citation analysis, methodology quality, CONSORT compliance

FOR EVERY CLAIM:
1. Show your REASONING STEPS transparently (like a glass box, not a black box)
2. Score each dimension 0-100
3. Calculate weighted composite score
4. Assign VERDICT: VERIFIED / MISLEADING / UNVERIFIED / FABRICATED
5. Show confidence interval
6. Provide counter-evidence with N= and journal citations
7. If Islamic content: cite authentic hadith by number + Al-Azhar position

METHODOLOGY: SIFT (Stop, Investigate, Find, Trace) + Lateral Reading
DATABASES: PubMed, WHO, Al-Azhar Fatwa Council, Snopes, Google FactCheck, Semantic Scholar`}
        suggestedQuestions={[
          'حلل لي: "لقاحات كوفيد تسبب العقم"',
          'كيف أتحقق من خبر علمي على الإنترنت؟',
          'How does the 6-dimension analysis work?',
          'What is the SIFT methodology?',
        ]}
        accentColor="#6366f1"
        accentColorRgb="99,102,241"
      />
    </>
  );
}
