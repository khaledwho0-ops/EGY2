'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { PageNavigation } from '@/components/shared/page-navigation';
import { PageAIChatbot } from '@/components/shared/page-ai-chatbot';
import AnalysisProgress, { STAGE_SETS } from '@/components/AnalysisProgress';
import { useRTL } from '@/components/shared/rtl-provider';

const engines = [
  { id: 'sentiment', name: 'Sentiment Analyzer', nameAr: 'محلل المشاعر', icon: '💭', desc: 'NLP-based emotional tone detection using VADER + AraBERT models. Identifies manipulative emotional framing, fear-mongering, and rage-bait patterns in claims.', descAr: 'كشف النبرة العاطفية بالاعتماد على معالجة اللغة الطبيعية بنماذج VADER و AraBERT. بيحدد التأطير العاطفي المُضلِّل وإثارة الخوف وأنماط استدرار الغضب في الادعاءات.', color: 'var(--accent-blue)', role: 'emotional-framing', roleAr: 'التأطير العاطفي' },
  { id: 'fallacy', name: 'Fallacy Detector', nameAr: 'كاشف المغالطات', icon: '🔍', desc: 'FLICC taxonomy classifier detecting 5 categories and 27 sub-techniques of misinformation: Fake Experts, Logical Fallacies, Impossible Expectations, Cherry-Picking, and Conspiracy Theories.', descAr: 'مُصنِّف بتصنيف FLICC بيكشف ٥ فئات و٢٧ أسلوب فرعي من التضليل: الخبراء المزيّفين، المغالطات المنطقية، التوقعات المستحيلة، انتقاء الأدلة، ونظريات المؤامرة.', color: 'var(--accent-red)', role: 'logical-structure', roleAr: 'البنية المنطقية' },
  { id: 'bias', name: 'Bias Scanner', nameAr: 'ماسح التحيز', icon: '⚖️', desc: 'Cognitive bias detection engine identifying 24 bias types including confirmation bias, anchoring effect, Dunning-Kruger, and authority bias using transformer-based classification.', descAr: 'محرك كشف التحيّز الإدراكي بيحدد ٢٤ نوع تحيّز منها تحيّز التأكيد وتأثير الترسيخ ودانينج-كروجر وتحيّز السلطة، باستخدام تصنيف قائم على نماذج المُحوِّلات.', color: 'var(--accent-amber)', role: 'cognitive-bias', roleAr: 'التحيّز الإدراكي' },
  { id: 'source', name: 'Source Verifier', nameAr: 'محقق المصادر', icon: '📰', desc: 'Multi-source cross-check against PubMed, WHO, Al-Azhar Fatwa Council, and curated fact-checking registries. SIFT methodology: Stop, Investigate, Find, Trace.', descAr: 'تحقّق متعدد المصادر بمقارنة الادعاء بـ PubMed ومنظمة الصحة العالمية ودار الإفتاء بالأزهر وسجلات تدقيق موثوقة. منهجية SIFT: قِف، تحرَّ، ابحث، تتبَّع.', color: 'var(--accent-emerald)', role: 'multi-source-cross-check', roleAr: 'تحقّق متعدد المصادر' },
  { id: 'osint', name: 'OSINT Investigator', nameAr: 'محقق استخبارات', icon: '🌐', desc: 'Open-Source Intelligence gathering across Arabic and English sources. Reverse image search, geolocation verification, social network analysis, and temporal consistency checks.', descAr: 'جمع معلومات استخباراتية من مصادر مفتوحة عربية وإنجليزية. بحث عكسي بالصور، التحقق من الموقع الجغرافي، تحليل الشبكات الاجتماعية، وفحص الاتساق الزمني.', color: 'var(--accent-indigo)', role: 'open-source-intel', roleAr: 'استخبارات مفتوحة المصدر' },
  { id: 'forensics', name: 'Digital Forensics', nameAr: 'الطب الشرعي الرقمي', icon: '🔬', desc: 'C2PA manifest validation, EXIF metadata extraction, ELA (Error Level Analysis) for image manipulation, deepfake detection via rPPG blood flow analysis and frequency domain analysis.', descAr: 'التحقق من بيان C2PA، استخراج بيانات EXIF الوصفية، تحليل مستوى الخطأ ELA لكشف تلاعب الصور، وكشف التزييف العميق عبر تحليل تدفق الدم rPPG وتحليل النطاق الترددي.', color: '#06b6d4', role: 'digital-forensics', roleAr: 'الطب الشرعي الرقمي' },
];

export default function SOVOPage() {
  const { isRTL } = useRTL();
  const [claim, setClaim] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [activeEngines, setActiveEngines] = useState<string[]>([]);
  const [engineConfidences, setEngineConfidences] = useState<Record<string, number>>({});
  const [apiResults, setApiResults] = useState<any>(null);
  const [apiError, setApiError] = useState<string | null>(null);

  const runEngines = async () => {
    if (!claim.trim()) return;
    setIsRunning(true);
    setShowResults(false);
    setActiveEngines([]);
    setEngineConfidences({});
    setApiResults(null);
    setApiError(null);

    // Animate engines activating one by one
    engines.forEach((e, i) => {
      setTimeout(() => setActiveEngines(prev => [...prev, e.id]), (i + 1) * 400);
    });

    try {
      const res = await fetch('/api/sovo/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: claim }),
      });
      const data = await res.json();

      if (data.error) {
        setApiError(data.error);
        setIsRunning(false);
        return;
      }

      // Route returns { type, aiProvider, data: { verdict, verdict_explanation_ar, ... } }
      setApiResults(data.data ?? data);

      // One-Law: the route does NOT return per-engine confidences, so we display NONE
      // rather than a fabricated fixed number. Active engines show a neutral "ran" tick only.
      setEngineConfidences({});

      // Tie the reveal to the REAL fetch lifecycle — no fake 800ms timer.
      setIsRunning(false);
      setShowResults(true);
    } catch (err: any) {
      console.error('SOVO API error:', err);
      setApiError(err.message || (isRTL ? 'فشل الاتصال' : 'Connection failed'));
      setIsRunning(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Cairo:wght@400;600;700;800&display=swap');
        @keyframes sovoFadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes sovoSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes sovoGlow { 0%, 100% { box-shadow: 0 0 15px rgba(139,92,246,0.2); } 50% { box-shadow: 0 0 35px rgba(139,92,246,0.5); } }
        .sovo-engine:hover { transform: translateY(-6px) scale(1.02); }
        .sovo-result-row:hover { background: var(--bg-elevated) !important; }
      `}</style>
      <main dir={isRTL ? 'rtl' : 'ltr'} style={{ minHeight: '100vh', background: 'var(--bg-page)', color: 'var(--text-primary)', fontFamily: 'Inter, sans-serif', padding: '40px 24px 80px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          {/* Header */}
          <header style={{ textAlign: 'center', marginBottom: 48, animation: 'sovoFadeIn 0.6s ease-out' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              width: 80, height: 80, borderRadius: 24, fontSize: 40, marginBottom: 16,
              background: 'linear-gradient(135deg, var(--accent-indigo), var(--accent-blue))',
              boxShadow: '0 0 40px var(--accent-religionhub-glow)',
            }}>🧠</div>
            <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 900, margin: '0 0 8px', background: 'linear-gradient(135deg, var(--accent-indigo), var(--accent-blue), #06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              {isRTL ? 'التحقق من الادعاءات' : 'Claim Verification'}
            </h1>
            <p style={{ fontFamily: 'Cairo, sans-serif', fontSize: '1.2rem', color: 'var(--text-secondary)', direction: 'rtl', fontWeight: 700 }}>
              التحقق من الادعاءات
            </p>
            <p style={{ color: 'var(--text-muted)', maxWidth: 700, margin: '12px auto 0', lineHeight: 1.7 }}>
              {isRTL ? 'تركيب من مصادر متعددة' : 'Multi-source synthesis'}
            </p>
          </header>

          {/* Claim Input */}
          <div style={{
            background: 'var(--bg-card)', backdropFilter: 'blur(12px)', borderRadius: 20,
            border: '1px solid var(--accent-religionhub-surface)', padding: 32, marginBottom: 40,
            animation: 'sovoFadeIn 0.6s ease-out 0.2s both',
          }}>
            <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 700, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>
              {isRTL ? 'قدِّم ادعاءً للتحقق منه' : 'Submit Claim for Verification'}
            </label>
            <p style={{ fontFamily: 'Cairo, sans-serif', fontSize: '0.85rem', color: 'var(--text-muted)', direction: 'rtl', marginBottom: 12 }}>
              أدخل الادعاء للتحقق منه عبر جميع المحركات
            </p>
            <textarea
              value={claim}
              onChange={(e) => setClaim(e.target.value)}
              placeholder={isRTL ? 'مثال: "دراسة أثبتت أن أبراج الجيل الخامس بتسبب أعراض كورونا في الأطفال المصريين..."' : 'e.g., "A study proved that 5G towers cause COVID-19 symptoms in Egyptian children..."'}
              style={{
                width: '100%', minHeight: 100, padding: 16, borderRadius: 12, border: '1px solid var(--border-primary)',
                background: 'var(--bg-elevated)', color: 'var(--text-primary)', fontFamily: 'Inter, sans-serif', fontSize: '0.95rem',
                resize: 'vertical', outline: 'none', lineHeight: 1.6, boxSizing: 'border-box',
              }}
            />
            <button
              onClick={runEngines}
              disabled={isRunning || !claim.trim()}
              style={{
                marginTop: 16, padding: '14px 36px', borderRadius: 12, border: 'none', fontWeight: 800, fontSize: '1rem',
                background: isRunning ? 'var(--accent-religionhub-surface)' : 'linear-gradient(135deg, var(--accent-indigo), var(--accent-blue))',
                color: 'var(--text-inverse)', cursor: isRunning ? 'not-allowed' : 'pointer', transition: 'all 0.3s',
                boxShadow: isRunning ? 'none' : '0 0 20px var(--accent-religionhub-glow)',
              }}
            >
              {isRunning ? (isRTL ? '⟳ المحركات شغالة...' : '⟳ Engines Running...') : (isRTL ? '🚀 شغّل كل المحركات' : '🚀 Run All Engines')}
            </button>
          </div>

          {/* Staged loading bar — tied to the REAL fetch lifecycle */}
          {isRunning && (
            <div style={{ marginBottom: 40, animation: 'sovoFadeIn 0.4s ease-out' }}>
              <AnalysisProgress
                running={isRunning}
                stages={STAGE_SETS.debunk}
                lang={isRTL ? 'ar' : 'en'}
                expectedMs={18000}
                accent="var(--accent-indigo)"
                title={{ en: 'Orchestrating 6 verification engines…', ar: 'تنسيق ٦ محركات تحقّق…' }}
              />
            </div>
          )}

          {/* 6 Engine Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20, marginBottom: 40 }}>
            {engines.map((e, i) => {
              const isActive = activeEngines.includes(e.id);
              const conf = engineConfidences[e.id];
              return (
                <div key={e.id} className="sovo-engine" style={{
                  padding: 28, borderRadius: 20, background: 'var(--bg-card)', backdropFilter: 'blur(12px)',
                  border: `1px solid ${isActive ? e.color : 'var(--border-primary)'}`,
                  transition: 'all 0.4s ease', cursor: 'default',
                  animation: `sovoFadeIn 0.6s ease-out ${0.3 + i * 0.1}s both`,
                  boxShadow: isActive ? `0 0 25px ${e.color}` : 'none',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                    <div style={{ fontSize: 36 }}>{e.icon}</div>
                    {isActive && (
                      <div style={{ padding: '4px 10px', borderRadius: 8, background: 'var(--bg-elevated)', color: e.color, fontSize: '0.75rem', fontWeight: 800 }} title={isRTL ? 'المحرك اشتغل' : 'engine ran'}>
                        ✓
                      </div>
                    )}
                    {isRunning && !isActive && (
                      <div style={{ width: 20, height: 20, border: '2px solid var(--border-primary)', borderTop: `2px solid ${e.color}`, borderRadius: '50%', animation: 'sovoSpin 0.8s linear infinite' }} />
                    )}
                  </div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: e.color, marginBottom: 2 }}>{isRTL ? e.nameAr : e.name}</h3>
                  <p style={{ fontFamily: 'Cairo, sans-serif', fontSize: '0.8rem', color: 'var(--text-secondary)', direction: 'rtl', marginBottom: 8, fontWeight: 600 }}>{e.nameAr}</p>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: 12, direction: isRTL ? 'rtl' : 'ltr' }}>{isRTL ? e.descAr : e.desc}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{isRTL ? e.roleAr : e.role.replace(/-/g, ' ')}</span>
                    {isActive && (
                      <div style={{ height: 4, flex: 1, marginLeft: 12, borderRadius: 2, background: 'var(--border-primary)' }}>
                        <div style={{ height: '100%', width: '100%', borderRadius: 2, background: `linear-gradient(90deg, ${e.color}, ${e.color})`, transition: 'width 0.5s' }} />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Error */}
          {apiError && (
            <div style={{ padding: 16, borderRadius: 12, background: 'var(--accent-red)', border: '1px solid var(--accent-red)', color: 'var(--text-inverse)', fontSize: '0.85rem', marginBottom: 24 }}>
              ⚠️ {apiError}
            </div>
          )}

          {/* Results & Verdict */}
          {showResults && apiResults && (
            <div style={{ animation: 'sovoFadeIn 0.6s ease-out' }}>
              {/* Truth Sandwich / Findings */}
              {apiResults.truth_sandwich && (
                <div style={{
                  background: 'var(--bg-card)', backdropFilter: 'blur(12px)', borderRadius: 20,
                  border: '1px solid var(--border-primary)', overflow: 'hidden', marginBottom: 24,
                }}>
                  <div style={{ padding: '20px 28px', borderBottom: '1px solid var(--border-primary)' }}>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0 }}>{isRTL ? '🥪 ساندويتش الحقيقة' : '🥪 Truth Sandwich'}</h3>
                    <p style={{ fontFamily: 'Cairo, sans-serif', fontSize: '0.85rem', color: 'var(--text-muted)', direction: 'rtl', margin: 0 }}>ساندويتش الحقيقة</p>
                  </div>
                  {[
                    { label: isRTL ? 'حقيقة (أعلى)' : 'Fact (Top)', ar: apiResults.truth_sandwich.fact_1_ar, en: apiResults.truth_sandwich.fact_1_en, color: 'var(--accent-emerald)' },
                    { label: isRTL ? 'الخرافة مكشوفة' : 'Myth Exposed', ar: apiResults.truth_sandwich.myth_ar, en: apiResults.truth_sandwich.myth_en, color: 'var(--accent-red)' },
                    { label: isRTL ? 'حقيقة (أسفل)' : 'Fact (Bottom)', ar: apiResults.truth_sandwich.fact_2_ar, en: apiResults.truth_sandwich.fact_2_en, color: 'var(--accent-emerald)' },
                  ].map((row, i) => (
                    <div key={i} className="sovo-result-row" style={{
                      padding: '14px 28px', borderBottom: '1px solid var(--border-subtle)',
                      display: 'flex', flexDirection: 'column', gap: 4, transition: 'background 0.2s',
                    }}>
                      <span style={{ fontWeight: 700, fontSize: '0.75rem', color: row.color, textTransform: 'uppercase', letterSpacing: 1 }}>{row.label}</span>
                      {row.ar && <p style={{ fontFamily: 'Cairo, sans-serif', fontSize: '0.9rem', color: 'var(--text-primary)', direction: 'rtl', margin: 0 }}>{row.ar}</p>}
                      {row.en && <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>{row.en}</p>}
                    </div>
                  ))}
                </div>
              )}

              {/* Cognitive Defense */}
              {apiResults.cognitive_defense && (
                <div style={{
                  background: 'var(--bg-card)', backdropFilter: 'blur(12px)', borderRadius: 20,
                  border: '1px solid var(--border-primary)', padding: '20px 28px', marginBottom: 24,
                }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 800, margin: '0 0 12px' }}>{isRTL ? '🛡 الدفاع الإدراكي' : '🛡 Cognitive Defense'}</h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: '0 0 4px' }}>
                    <strong style={{ color: 'var(--accent-amber)' }}>{isRTL ? 'مغالطة:' : 'Fallacy:'}</strong> {apiResults.cognitive_defense.detected_fallacy}
                  </p>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: '0 0 4px' }}>
                    <strong style={{ color: 'var(--accent-amber)' }}>{isRTL ? 'تحيّز:' : 'Bias:'}</strong> {apiResults.cognitive_defense.detected_bias}
                  </p>
                  {apiResults.cognitive_defense.socratic_deconstruction && (
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-primary)', margin: '8px 0 0', fontStyle: 'italic' }}>
                      💬 {apiResults.cognitive_defense.socratic_deconstruction}
                    </p>
                  )}
                </div>
              )}

              {/* Verdict */}
              {apiResults.verdict && (
                <div style={{
                  background: 'var(--accent-deepreal-surface)', border: '1px solid var(--accent-red)', borderRadius: 20,
                  padding: 32, textAlign: 'center', animation: 'sovoGlow 3s ease-in-out infinite',
                }}>
                  <div style={{ fontSize: 48, marginBottom: 12 }}>🚨</div>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--accent-red)', marginBottom: 8 }}>{isRTL ? 'الحكم: ' : 'VERDICT: '}{apiResults.verdict}</h3>
                  {apiResults.verdict_explanation_ar && <p style={{ fontFamily: 'Cairo, sans-serif', fontSize: '1.1rem', color: 'var(--accent-red)', direction: 'rtl', marginBottom: 16, fontWeight: 700 }}>{apiResults.verdict_explanation_ar}</p>}
                  {apiResults.verdict_explanation_en && <p style={{ color: 'var(--text-secondary)', maxWidth: 600, margin: '0 auto', lineHeight: 1.7, fontSize: '0.9rem' }}>{apiResults.verdict_explanation_en}</p>}
                  {apiResults.citations && apiResults.citations.length > 0 && (
                    <div style={{ marginTop: 16, fontSize: '0.8rem', color: 'var(--text-muted)', textAlign: isRTL ? 'right' : 'left', maxWidth: 600, margin: '16px auto 0' }}>
                      <strong style={{ color: 'var(--text-secondary)' }}>{isRTL ? 'المصادر:' : 'Sources:'}</strong>
                      <ul style={{ margin: '4px 0 0', paddingLeft: 16 }}>
                        {apiResults.citations.slice(0, 5).map((c: any, i: number) => (
                          <li key={i}><a href={c.url} target="_blank" rel="noreferrer" style={{ color: 'var(--accent-blue)' }}>{c.title}</a> <span style={{ color: 'var(--text-caption)' }}>[{c.type}]</span></li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Back Link */}
          <div style={{ textAlign: 'center', marginTop: 48 }}>
            <Link href="/explore" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 600 }}>
              {isRTL ? 'العودة إلى الاستكشاف →' : '← Back to Explore'}
            </Link>
            <PageNavigation currentPath="/sovo" />
          </div>
        </div>
      </main>

      <PageAIChatbot
        pageTitle="SOVO Scientific Orchestrator — المنسق العلمي"
        pageContext="Egyptian Awareness Library - SOVO: Scientific Orchestration & Verification Overseer. Routes claims through 6 parallel AI engines: Sentiment, Fallacy, Bias, Source, OSINT, Forensics."
        systemPrompt={`[LAYER 1 - ROLE]: You are the SOVO Scientific Orchestrator AI — the master coordinator of 6 parallel verification engines.

[LAYER 2 - YOUR 6 ENGINES]:
1. Sentiment Analyzer: VADER + AraBERT NLP for emotional manipulation detection
2. Fallacy Detector: FLICC taxonomy (27 sub-techniques across 5 categories)
3. Bias Scanner: 24 cognitive bias types identification
4. Source Verifier: PubMed, WHO, Al-Azhar cross-referencing via SIFT
5. OSINT Investigator: multi-source open intelligence gathering
6. Digital Forensics: C2PA, EXIF, ELA, deepfake detection

[LAYER 3 - METHODOLOGY]:
- Each engine runs INDEPENDENTLY and produces its own confidence score
- SOVO synthesizes all 6 results into a composite verdict
- Verdicts: VERIFIED / MISLEADING / DEBUNKED / UNVERIFIED / FABRICATED

[LAYER 4 - ISLAMIC FOUNDATION]:
- Quran 49:6: 'يا أيها الذين آمنوا إن جاءكم فاسق بنبأ فتبينوا'
- Hadith: 'كفى بالمرء كذباً أن يحدث بكل ما سمع' (صحيح مسلم)

[LAYER 5 - RULES]:
1. Explain how each engine contributes to verdicts
2. Cite N=, p-value, journal for scientific claims
3. For Islamic claims: cite Quran [Surah:Ayah], Hadith [Book, Number, Grade]
4. Respond in the user's language
5. NEVER hallucinate — if uncertain, say so`}
        suggestedQuestions={[
          'كيف يعمل نظام المحركات الستة؟',
          'What is the FLICC taxonomy?',
          'إزاي أتحقق من ادعاء علمي بنفسي؟',
          'How does OSINT analysis work?',
        ]}
        accentColor="#8b5cf6"
        accentColorRgb="139,92,246"
      />
    </>
  );
}
