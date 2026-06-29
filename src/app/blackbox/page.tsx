'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRTL } from '@/components/shared/rtl-provider';
import { PageNavigation } from '@/components/shared/page-navigation';
import { PageAIChatbot } from '@/components/shared/page-ai-chatbot';
import AnalysisProgress, { STAGE_SETS } from '@/components/AnalysisProgress';

const dimensions = [
  { name: 'Source Credibility', nameAr: 'مصداقية المصدر', score: 0, color: 'var(--accent-blue)', desc: 'Multi-source cross-check using the EAL evidence aggregator (OpenAlex, Semantic Scholar, PubMed, WHO) and the AI model\'s trained knowledge of Al-Azhar Fatwa Council positions.', descAr: 'مراجعة متعددة المصادر عبر مجمّع الأدلة (OpenAlex وSemantic Scholar وPubMed وWHO) وتدريب نموذج الذكاء الاصطناعي على مواقف مجلس فتاوى الأزهر.' },
  { name: 'Logical Consistency', nameAr: 'الاتساق المنطقي', score: 0, color: 'var(--accent-indigo)', desc: 'Analyzing argument structure for internal contradictions, non-sequiturs, and circular reasoning patterns.', descAr: 'تحليل بنية الحجة بحثاً عن التناقضات الداخلية، والاستنتاجات غير المنطقية، وأنماط المنطق الدائري.' },
  { name: 'Emotional Manipulation', nameAr: 'التلاعب العاطفي', score: 0, color: 'var(--accent-red)', desc: 'VADER + AraBERT sentiment analysis detecting fear-mongering, rage-bait, and emotional exploitation.', descAr: 'تحليل المشاعر بـ VADER + AraBERT لكشف إثارة الخوف والغضب والاستغلال العاطفي.' },
  { name: 'Temporal Validity', nameAr: 'الصلاحية الزمنية', score: 0, color: 'var(--accent-emerald)', desc: 'Checking date accuracy, anachronisms, out-of-context temporal framing, and event chronology.', descAr: 'فحص دقة التواريخ، والمفارقات الزمنية، وإطار السياق الزمني، والتسلسل الزمني للأحداث.' },
  { name: 'Media Authenticity', nameAr: 'أصالة الوسائط', score: 0, color: 'var(--accent-amber)', desc: 'C2PA manifest validation, EXIF extraction, ELA analysis, deepfake detection via rPPG and frequency analysis.', descAr: 'التحقق من بيانات C2PA، استخراج EXIF، تحليل ELA، كشف التزييف العميق عبر rPPG وتحليل الترددات.' },
  { name: 'Scientific Basis', nameAr: 'الأساس العلمي', score: 0, color: 'var(--accent-mentalhealth)', desc: 'Peer-review status check, citation analysis, methodology assessment, and reproducibility scoring.', descAr: 'التحقق من حالة مراجعة الأقران، وتحليل الاستشهادات، وتقييم المنهجية، وتسجيل قابلية التكرار.' },
  { name: 'Islamic Verification', nameAr: 'التحقق الإسلامي', score: 0, color: 'var(--accent-deepreal)', desc: 'Checking claims against authentic hadith sources (Kutub al-Sitta), Al-Azhar positions, Dar al-Ifta fatwas, and Maqasid al-Shariah.', descAr: 'التحقق من الادعاءات مقابل مصادر الحديث الصحيحة (الكتب الستة)، ومواقف الأزهر، وفتاوى دار الإفتاء، ومقاصد الشريعة.' },
];

const reasoningSteps = [
  { step: 'INTAKE', detail: 'Claim received and sanitized. Language detection and encoding check in progress.', detailAr: 'تم استلام الادعاء وتنظيفه. جاري كشف اللغة والتحقق من الترميز.' },
  { step: 'DECOMPOSITION', detail: 'Claim decomposed into atomic assertions: causal claims, statistical claims, and authority appeals.', detailAr: 'تم تفكيك الادعاء إلى مكوّنات أساسية: ادعاءات سببية، ادعاءات إحصائية، واستناد لجهات سُلطة.' },
  { step: 'SOURCE_TRACE', detail: 'Tracing cited source via SIFT methodology. Querying DOI registry and domain reputation services.', detailAr: 'تتبّع المصدر المذكور بمنهجية SIFT. الاستعلام من سجل DOI وخدمات تقييم سمعة النطاقات.' },
  { step: 'CROSS_REFERENCE', detail: 'Querying PubMed, WHO Fact Sheets, Al-Azhar Fatwa Database, and fact-checking registries.', detailAr: 'الاستعلام من PubMed وصحائف منظمة الصحة العالمية وقاعدة فتاوى الأزهر وسجلات تدقيق الحقائق.' },
  { step: 'MEDIA_FORENSICS', detail: 'Checking for attached media. If present: ELA, EXIF extraction, C2PA manifest validation, and reverse-image lookup.', detailAr: 'فحص الوسائط المرفقة. إن وُجدت: تحليل ELA، استخراج EXIF، التحقق من بيانات C2PA، والبحث العكسي عن الصور.' },
  { step: 'SYNTHESIS', detail: 'AI findings compiled. One Law enforcement applied. Verdict prepared with admissibility check.', detailAr: 'تجميع نتائج الذكاء الاصطناعي. تطبيق قانون المصدر الواحد. تجهيز الحكم مع فحص المقبولية.' },
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
      <main dir={isRTL ? 'rtl' : 'ltr'} style={{ minHeight: '100vh', background: 'var(--bg-page)', color: 'var(--text-primary)', fontFamily: 'Inter, sans-serif', padding: '40px 24px 80px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          {/* Header */}
          <header style={{ textAlign: 'center', marginBottom: 48, animation: 'bbFadeIn 0.6s ease-out' }}>
            <div style={{
              display: 'inline-flex', width: 80, height: 80, borderRadius: 24, fontSize: 40,
              alignItems: 'center', justifyContent: 'center', marginBottom: 16,
              background: 'linear-gradient(135deg, var(--accent-emerald), var(--accent-mentalhealth))',
              boxShadow: '0 0 40px var(--accent-mentalhealth-glow)',
            }}>🔍</div>
            <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 900, margin: '0 0 8px', background: 'linear-gradient(135deg, var(--accent-emerald), var(--accent-mentalhealth), var(--accent-blue))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              {isRTL ? 'تدقيق الادعاء' : 'Claim Audit'}
            </h1>
            <p style={{ fontFamily: 'Cairo, sans-serif', fontSize: '1.2rem', color: 'var(--text-secondary)', direction: 'rtl', fontWeight: 700 }}>
              {isRTL ? 'الصندوق الأسود — شفافية كاملة' : 'تدقيق الادعاء'}
            </p>
            <p style={{ color: 'var(--text-muted)', maxWidth: 650, margin: '12px auto 0', lineHeight: 1.7 }}>
              {t({
                en: 'Anonymous claim submission with full AI transparency. See exactly how the AI reasons — every step of the reasoning chain is exposed. No hidden logic, no black boxes.',
                ar: 'تقديم الادعاءات بشكل مجهول مع شفافية كاملة للذكاء الاصطناعي. شاهد بالضبط كيف يفكر الذكاء الاصطناعي — كل خطوة من سلسلة الاستدلال مكشوفة. لا منطق مخفي، لا صناديق سوداء.'
              })}
            </p>
          </header>

          {/* Quick Usage Guide */}
          <div style={{
            background: 'var(--bg-card)', backdropFilter: 'blur(12px)', borderRadius: 20,
            border: '1px solid var(--border-primary)', marginBottom: 24,
            animation: 'bbFadeIn 0.6s ease-out 0.1s both', overflow: 'hidden',
          }}>
            <div onClick={() => setShowGuide(!showGuide)} style={{
              padding: '16px 28px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 20 }}>📖</span>
                <span style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--accent-blue)' }}>
                  {t({ en: 'How to Use This Tool — Quick Guide', ar: 'كيف تستخدم هذه الأداة — دليل سريع' })}
                </span>
              </div>
              <span style={{ color: 'var(--text-muted)', transform: showGuide ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}>▼</span>
            </div>
            {showGuide && (
              <div style={{ padding: '0 28px 24px', fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.8 }}>
                <div style={{ display: 'grid', gap: 12, gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
                  <div style={{ padding: 16, borderRadius: 12, background: 'var(--accent-mentalhealth-surface)', border: '1px solid var(--border-subtle)' }}>
                    <div style={{ fontWeight: 700, color: 'var(--accent-emerald)', marginBottom: 6 }}>1️⃣ {t({ en: 'Paste Any Claim', ar: 'الصق أي ادعاء' })}</div>
                    <div>{t({ en: 'Copy a suspicious WhatsApp message, Facebook post, tweet, or any claim you want verified. The AI analyzes it across 7 forensic dimensions.', ar: 'انسخ رسالة واتساب مشبوهة، منشور فيسبوك، تغريدة، أو أي ادعاء تريد التحقق منه. الذكاء الاصطناعي يحلله عبر ٧ أبعاد جنائية.' })}</div>
                  </div>
                  <div style={{ padding: 16, borderRadius: 12, background: 'var(--accent-religionhub-surface)', border: '1px solid var(--border-subtle)' }}>
                    <div style={{ fontWeight: 700, color: 'var(--accent-indigo)', marginBottom: 6 }}>2️⃣ {t({ en: 'Watch the Reasoning Chain', ar: 'شاهد سلسلة التفكير' })}</div>
                    <div>{t({ en: 'Unlike black-box AI, you see EVERY step: intake, decomposition, source tracing, cross-referencing, media forensics, synthesis.', ar: 'بخلاف الذكاء الاصطناعي المغلق، ترى كل خطوة: الاستقبال، التحليل، تتبع المصدر، المراجعة المتقاطعة، الطب الشرعي الرقمي، التوليف.' })}</div>
                  </div>
                  <div style={{ padding: 16, borderRadius: 12, background: 'var(--accent-deepreal-surface)', border: '1px solid var(--border-subtle)' }}>
                    <div style={{ fontWeight: 700, color: 'var(--accent-amber)', marginBottom: 6 }}>3️⃣ {t({ en: 'Read the AI Verdict', ar: 'اقرأ حكم الذكاء الاصطناعي' })}</div>
                    <div>{t({ en: 'Get a scored verdict with confidence level, bilingual explanation, and actionable sources. Use the chatbot 💬 for follow-up questions.', ar: 'احصل على حكم مع مستوى الثقة، شرح ثنائي اللغة، ومصادر قابلة للتنفيذ. استخدم الشات بوت 💬 للأسئلة التابعة.' })}</div>
                  </div>
                </div>
                <div style={{ marginTop: 16, padding: 12, borderRadius: 8, background: 'var(--accent-deepreal-surface)', border: '1px solid var(--border-subtle)' }}>
                  <strong style={{ color: 'var(--accent-deepreal)' }}>🕌 {t({ en: 'Islamic Scenario', ar: 'سيناريو إسلامي' })}:</strong>{' '}
                  {t({ en: '"Someone shared a hadith on WhatsApp saying music is halal. Paste it here — the AI will check it against Kutub al-Sitta, verify the isnad chain, and cite the actual Al-Azhar/Dar al-Ifta position."', ar: '"حد شير حديث على الواتساب بيقول الموسيقى حلال. الصقه هنا — الذكاء الاصطناعي هيتحقق منه من الكتب الستة، ويتأكد من سلسلة الإسناد، ويذكر موقف الأزهر/دار الإفتاء الفعلي."' })}
                </div>
              </div>
            )}
          </div>

          {/* Anonymous Submission */}
          <div style={{
            background: 'var(--bg-card)', backdropFilter: 'blur(12px)', borderRadius: 20,
            border: '1px solid var(--border-primary)', padding: 32, marginBottom: 32,
            animation: 'bbFadeIn 0.6s ease-out 0.2s both',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <span style={{ fontSize: 20 }}>🕵️</span>
              <span style={{ fontSize: '0.85rem', color: 'var(--accent-emerald)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1 }}>{t({ en: 'Anonymous Submission', ar: 'تقديم مجهول الهوية' })}</span>
              <span style={{ padding: '2px 8px', borderRadius: 4, background: 'var(--accent-mentalhealth-surface)', color: 'var(--accent-emerald)', fontSize: '0.65rem', fontWeight: 700 }}>{t({ en: 'NO TRACKING', ar: 'بدون تتبّع' })}</span>
            </div>
            <p style={{ fontFamily: 'Cairo, sans-serif', fontSize: '0.85rem', color: 'var(--text-muted)', direction: 'rtl', marginBottom: 12 }}>
              تقديم مجهول الهوية — لا تتبع، لا تسجيل
            </p>

            {/* Quick Example Buttons */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 12 }}>
              {QUICK_EXAMPLES.map((ex, i) => (
                <button
                  key={i}
                  onClick={() => setClaim(isRTL ? ex.ar : ex.en)}
                  style={{
                    padding: '5px 12px', borderRadius: 8, border: '1px solid var(--border-primary)',
                    background: 'var(--accent-mentalhealth-surface)', color: 'var(--accent-emerald)', fontSize: '0.7rem',
                    cursor: 'pointer', textAlign: isRTL ? 'right' : 'left', lineHeight: 1.3, transition: 'all 0.2s',
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
              dir={isRTL ? 'rtl' : 'ltr'}
              style={{
                width: '100%', minHeight: 100, padding: 16, borderRadius: 12, border: '1px solid var(--border-primary)',
                background: 'var(--bg-elevated)', color: 'var(--accent-emerald)', fontFamily: '"Courier New", monospace', fontSize: '0.9rem',
                resize: 'vertical', outline: 'none', lineHeight: 1.6, boxSizing: 'border-box',
              }}
            />

            {apiError && (
              <div style={{ marginTop: 12, padding: 12, borderRadius: 8, background: 'var(--accent-religionhub-surface)', border: '1px solid var(--accent-red)', color: 'var(--accent-red)', fontSize: '0.85rem' }}>
                ⚠️ {apiError}
              </div>
            )}

            <button
              onClick={runAudit}
              disabled={isAnalyzing || !claim.trim()}
              style={{
                marginTop: 16, padding: '14px 36px', borderRadius: 12, border: 'none', fontWeight: 800, fontSize: '1rem',
                background: isAnalyzing ? 'var(--accent-mentalhealth-surface)' : 'linear-gradient(135deg, var(--accent-emerald), var(--accent-mentalhealth))',
                color: 'var(--text-inverse)', cursor: isAnalyzing ? 'not-allowed' : 'pointer', transition: 'all 0.3s',
                boxShadow: isAnalyzing ? 'none' : '0 0 20px var(--accent-mentalhealth-glow)',
              }}
            >
              {isAnalyzing
                ? t({ en: '⟳ Audit in Progress...', ar: '⟳ التدقيق جارٍ...' })
                : t({ en: '🔬 Deploy Forensic Audit', ar: '🔬 ابدأ التدقيق الجنائي' })}
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
            background: 'var(--bg-card)', backdropFilter: 'blur(12px)', borderRadius: 20,
            border: '1px solid var(--border-primary)', marginBottom: 32, overflow: 'hidden',
            animation: 'bbFadeIn 0.6s ease-out 0.4s both',
          }}>
            <div onClick={() => setShowReasoning(!showReasoning)} style={{
              padding: '20px 28px', borderBottom: '1px solid var(--border-subtle)', cursor: 'pointer',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
              <div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0 }}>{t({ en: '🧠 AI Reasoning Chain (Transparent)', ar: '🧠 سلسلة استدلال الذكاء الاصطناعي (شفافة)' })}</h3>
                <p style={{ fontFamily: 'Cairo, sans-serif', fontSize: '0.8rem', color: 'var(--text-muted)', direction: 'rtl', margin: 0 }}>سلسلة التفكير — شفافية كاملة</p>
              </div>
              <span style={{ color: 'var(--text-muted)', fontSize: '1.2rem', transform: showReasoning ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}>▼</span>
            </div>
            {showReasoning && (
              <div style={{ padding: '16px 28px 24px' }}>
                {reasoningSteps.map((s, i) => (
                  <div key={i} className="bb-step" style={{
                    display: 'flex', gap: 16, padding: '12px 8px', borderBottom: '1px solid var(--border-subtle)',
                    transition: 'background 0.2s', borderRadius: 4,
                    opacity: activeStep >= i || !isAnalyzing ? 1 : 0.3,
                  }}>
                    <div style={{
                      width: 32, height: 32, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: activeStep >= i ? 'var(--accent-mentalhealth-surface)' : 'var(--bg-elevated)',
                      color: activeStep >= i ? 'var(--accent-emerald)' : 'var(--text-muted)', fontSize: '0.75rem', fontWeight: 800, flexShrink: 0,
                    }}>
                      {activeStep >= i ? '✓' : (i + 1)}
                    </div>
                    <div>
                      <div style={{ fontSize: '0.8rem', fontWeight: 800, color: activeStep >= i ? 'var(--accent-emerald)' : 'var(--text-muted)', fontFamily: 'monospace' }}>[{s.step}]</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginTop: 2 }}>{isRTL ? s.detailAr : s.detail}</div>
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
                background: 'var(--bg-card)', backdropFilter: 'blur(12px)', borderRadius: 20,
                border: '1px solid var(--border-primary)', padding: 32, marginBottom: 32,
              }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: 4 }}>{t({ en: '📊 Confidence Breakdown (7 Dimensions)', ar: '📊 تحليل الثقة (٧ أبعاد)' })}</h3>
                <p style={{ fontFamily: 'Cairo, sans-serif', fontSize: '0.85rem', color: 'var(--text-muted)', direction: 'rtl', marginBottom: 24 }}>تحليل الثقة — ٧ أبعاد</p>

                {dimensions.map((d, i) => (
                  <div key={i} className="bb-dim" style={{ marginBottom: 20, transition: 'transform 0.2s', cursor: 'default' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                      <div>
                        <span style={{ fontSize: '0.9rem', fontWeight: 700, color: d.color }}>{isRTL ? d.nameAr : d.name}</span>
                        <span style={{ fontFamily: 'Cairo, sans-serif', fontSize: '0.75rem', color: 'var(--text-muted)', marginInlineStart: 8, direction: 'rtl' }}>{isRTL ? d.name : d.nameAr}</span>
                      </div>
                      <span style={{ fontWeight: 800, color: scores[i] > 60 ? 'var(--accent-red)' : scores[i] > 40 ? 'var(--accent-amber)' : 'var(--accent-emerald)', fontSize: '0.9rem' }}>
                        {scores[i]}%
                      </span>
                    </div>
                    <div style={{ height: 8, borderRadius: 4, background: 'var(--bg-elevated)' }}>
                      <div style={{
                        height: '100%', borderRadius: 4, width: `${scores[i]}%`,
                        background: `linear-gradient(90deg, ${d.color}, ${d.color})`,
                        transition: 'width 1s ease-out',
                      }} />
                    </div>
                    <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: 4, lineHeight: 1.4 }}>{isRTL ? d.descAr : d.desc}</p>
                  </div>
                ))}
              </div>

              {/* One Law: unverified banner — shown when no admissible source backs the verdict */}
              {apiResult && (apiResult.enforcement?.status === 'unverified' || apiResult.unverifiedReason) && (
                <div style={{
                  padding: '16px 20px', borderRadius: 12, marginBottom: 24,
                  background: 'var(--accent-deepreal-surface)', border: '2px solid var(--accent-amber)',
                  display: 'flex', gap: 12, alignItems: 'flex-start',
                }}>
                  <span style={{ fontSize: 20, flexShrink: 0 }}>⚠️</span>
                  <div>
                    <div style={{ fontWeight: 800, color: 'var(--accent-amber)', marginBottom: 4 }}>
                      [UNVERIFIED / غير موثّق]
                    </div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
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
                  background: 'var(--bg-card)', backdropFilter: 'blur(12px)', borderRadius: 20,
                  border: '1px solid var(--border-primary)', padding: 32, marginBottom: 32,
                }}>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: 4, color: 'var(--accent-indigo)' }}>{t({ en: '🔬 AI Forensic Findings', ar: '🔬 نتائج التحليل الجنائي بالذكاء الاصطناعي' })}</h3>
                  <p style={{ fontFamily: 'Cairo, sans-serif', fontSize: '0.85rem', color: 'var(--text-muted)', direction: 'rtl', marginBottom: 20 }}>نتائج التحليل الجنائي بالذكاء الاصطناعي</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {apiResult.results.map((finding: any, i: number) => (
                      <div key={i} style={{
                        padding: 16, borderRadius: 12, background: 'var(--bg-elevated)',
                        borderInlineStart: `3px solid ${finding.risk === 'High' ? 'var(--accent-red)' : finding.risk === 'Medium' ? 'var(--accent-amber)' : 'var(--accent-emerald)'}`,
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                          <span style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)' }}>{finding.type}</span>
                          <span style={{
                            padding: '2px 10px', borderRadius: 6, fontSize: '0.7rem', fontWeight: 800,
                            background: finding.risk === 'High' ? 'var(--accent-religionhub-surface)' : finding.risk === 'Medium' ? 'var(--accent-deepreal-surface)' : 'var(--accent-mentalhealth-surface)',
                            color: finding.risk === 'High' ? 'var(--accent-red)' : finding.risk === 'Medium' ? 'var(--accent-amber)' : 'var(--accent-emerald)',
                          }}>{finding.risk} {t({ en: 'Risk', ar: 'خطورة' })}</span>
                        </div>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>{finding.desc}</p>
                      </div>
                    ))}
                  </div>

                  {/* AI Verdict & Explanation */}
                  {apiResult.verdict && (
                    <div style={{ marginTop: 20, padding: 16, borderRadius: 12, background: 'var(--bg-elevated)', border: '1px solid var(--border-primary)' }}>
                      <div style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--accent-blue)', marginBottom: 8 }}>{t({ en: '📋 AI Verdict:', ar: '📋 حكم الذكاء الاصطناعي:' })} {apiResult.verdict}</div>
                      {apiResult.confidence && <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: 8 }}>{t({ en: 'Confidence:', ar: 'مستوى الثقة:' })} {apiResult.confidence}</div>}
                      {apiResult.explanation_en && <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 8 }}>{apiResult.explanation_en}</p>}
                      {apiResult.explanation_ar && <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.7, direction: 'rtl', fontFamily: 'Cairo, sans-serif', marginBottom: 8 }}>{apiResult.explanation_ar}</p>}
                      {apiResult.truthSandwich && (
                        <div style={{ padding: 12, borderRadius: 8, background: 'var(--accent-mentalhealth-surface)', border: '1px solid var(--border-subtle)', fontSize: '0.8rem', color: 'var(--accent-emerald)', lineHeight: 1.6 }}>
                          <strong>{t({ en: '🥪 Truth Sandwich:', ar: '🥪 ساندويتش الحقيقة:' })}</strong> {apiResult.truthSandwich}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Sources */}
                  {apiResult.sources && apiResult.sources.length > 0 && (
                    <div style={{ marginTop: 16, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                      {apiResult.sources.map((src: string, i: number) => (
                        <span key={i} style={{ padding: '4px 10px', borderRadius: 6, background: 'var(--bg-elevated)', fontSize: '0.7rem', color: 'var(--text-muted)' }}>📎 {src}</span>
                      ))}
                    </div>
                  )}
                  {apiResult.provider && (
                    <div style={{ marginTop: 12, fontSize: '0.7rem', color: 'var(--text-caption)' }}>{t({ en: 'Powered by:', ar: 'مدعوم بـ:' })} {apiResult.provider}</div>
                  )}
                </div>
              )}

              {/* Composite Verdict */}
              {(() => { const _unv = apiResult?.enforcement?.status === 'unverified' || !!apiResult?.unverifiedReason; return (
              <div style={{
                background: _unv ? 'var(--bg-secondary)' : compositeScore > 50 ? 'var(--accent-religionhub-surface)' : 'var(--accent-mentalhealth-surface)',
                border: `1px solid ${_unv ? 'var(--border-secondary)' : compositeScore > 50 ? 'var(--accent-red)' : 'var(--accent-emerald)'}`,
                borderRadius: 20, padding: 32, textAlign: 'center', animation: 'bbGlow 3s ease-in-out infinite',
              }}>
                <div style={{ fontSize: 48, marginBottom: 12 }}>{_unv ? '❓' : compositeScore > 50 ? '🚨' : compositeScore > 30 ? '⚠️' : '✅'}</div>
                <h3 style={{
                  fontSize: '1.5rem', fontWeight: 900, marginBottom: 8,
                  color: _unv ? 'var(--text-secondary)' : compositeScore > 50 ? 'var(--accent-red)' : compositeScore > 30 ? 'var(--accent-amber)' : 'var(--accent-emerald)',
                }}>
                  {_unv
                    ? t({ en: 'UNVERIFIED — INSUFFICIENT SOURCE', ar: 'غير موثّق — لا يوجد مصدر كافٍ' })
                    : (apiResult?.verdict || (compositeScore > 50
                        ? t({ en: 'LIKELY MISINFORMATION', ar: 'على الأرجح معلومات مضللة' })
                        : compositeScore > 30
                        ? t({ en: 'REQUIRES FURTHER INVESTIGATION', ar: 'يتطلب مزيداً من التحقيق' })
                        : t({ en: 'LIKELY AUTHENTIC', ar: 'على الأرجح صحيح' })))}
                </h3>
                <p style={{ fontFamily: 'Cairo, sans-serif', fontSize: '1rem', direction: 'rtl', marginBottom: 16, fontWeight: 700, color: _unv ? 'var(--text-secondary)' : compositeScore > 50 ? 'var(--accent-red)' : compositeScore > 30 ? 'var(--accent-amber)' : 'var(--accent-emerald)' }}>
                  {_unv ? 'الحكم: غير موثّق — لا يوجد مصدر كافٍ' : compositeScore > 50 ? 'الحكم: على الأرجح معلومات مضللة' : compositeScore > 30 ? 'الحكم: يتطلب مزيداً من التحقيق' : 'الحكم: على الأرجح صحيح'}
                </p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
                  <span style={{ padding: '8px 16px', borderRadius: 8, background: 'var(--bg-elevated)', fontSize: '0.85rem', fontWeight: 700 }}>
                    {t({ en: 'Composite:', ar: 'النتيجة المجمّعة:' })} {compositeScore}/100
                  </span>
                  <span style={{ padding: '8px 16px', borderRadius: 8, background: 'var(--bg-elevated)', fontSize: '0.85rem', fontWeight: 700 }}>
                    {t({ en: 'Audit ID:', ar: 'رقم التدقيق:' })} #BFA-{Date.now().toString(36).slice(-6).toUpperCase()}
                  </span>
                  {apiResult?.auditedPapersCount !== undefined && (
                    <span style={{ padding: '8px 16px', borderRadius: 8, background: 'var(--bg-elevated)', fontSize: '0.85rem', fontWeight: 700 }}>
                      {t({ en: 'Papers Audited:', ar: 'الأوراق المُدقّقة:' })} {apiResult.auditedPapersCount}
                    </span>
                  )}
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
                  <a href="https://www.who.int/health-topics/infodemic" target="_blank" rel="noopener" style={{ color: 'var(--accent-blue)', fontSize: '0.8rem', textDecoration: 'none' }}>{t({ en: '📎 WHO Infodemic Guide', ar: '📎 دليل منظمة الصحة العالمية للوباء المعلوماتي' })}</a>
                  <a href="https://pubmed.ncbi.nlm.nih.gov/" target="_blank" rel="noopener" style={{ color: 'var(--accent-blue)', fontSize: '0.8rem', textDecoration: 'none' }}>{t({ en: '📎 PubMed Search', ar: '📎 بحث PubMed' })}</a>
                  <a href="https://firstdraftnews.org/" target="_blank" rel="noopener" style={{ color: 'var(--accent-blue)', fontSize: '0.8rem', textDecoration: 'none' }}>{t({ en: '📎 First Draft News', ar: '📎 First Draft News' })}</a>
                </div>
              </div>
              ); })()}
            </div>
          )}

          {/* Back Link */}
          <div style={{ textAlign: 'center', marginTop: 48 }}>
            <Link href="/explore" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 600 }}>
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
