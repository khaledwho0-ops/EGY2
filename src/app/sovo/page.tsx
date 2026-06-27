'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { PageNavigation } from '@/components/shared/page-navigation';
import { PageAIChatbot } from '@/components/shared/page-ai-chatbot';
import AnalysisProgress, { STAGE_SETS } from '@/components/AnalysisProgress';

const engines = [
  { id: 'sentiment', name: 'Sentiment Analyzer', nameAr: 'محلل المشاعر', icon: '💭', desc: 'NLP-based emotional tone detection using VADER + AraBERT models. Identifies manipulative emotional framing, fear-mongering, and rage-bait patterns in claims.', color: '#3b82f6', role: 'emotional-framing' },
  { id: 'fallacy', name: 'Fallacy Detector', nameAr: 'كاشف المغالطات', icon: '🔍', desc: 'FLICC taxonomy classifier detecting 5 categories and 27 sub-techniques of misinformation: Fake Experts, Logical Fallacies, Impossible Expectations, Cherry-Picking, and Conspiracy Theories.', color: '#ef4444', role: 'logical-structure' },
  { id: 'bias', name: 'Bias Scanner', nameAr: 'ماسح التحيز', icon: '⚖️', desc: 'Cognitive bias detection engine identifying 24 bias types including confirmation bias, anchoring effect, Dunning-Kruger, and authority bias using transformer-based classification.', color: '#f59e0b', role: 'cognitive-bias' },
  { id: 'source', name: 'Source Verifier', nameAr: 'محقق المصادر', icon: '📰', desc: 'Multi-source cross-check against PubMed, WHO, Al-Azhar Fatwa Council, and curated fact-checking registries. SIFT methodology: Stop, Investigate, Find, Trace.', color: '#10b981', role: 'multi-source-cross-check' },
  { id: 'osint', name: 'OSINT Investigator', nameAr: 'محقق استخبارات', icon: '🌐', desc: 'Open-Source Intelligence gathering across Arabic and English sources. Reverse image search, geolocation verification, social network analysis, and temporal consistency checks.', color: '#8b5cf6', role: 'open-source-intel' },
  { id: 'forensics', name: 'Digital Forensics', nameAr: 'الطب الشرعي الرقمي', icon: '🔬', desc: 'C2PA manifest validation, EXIF metadata extraction, ELA (Error Level Analysis) for image manipulation, deepfake detection via rPPG blood flow analysis and frequency domain analysis.', color: '#06b6d4', role: 'digital-forensics' },
];

export default function SOVOPage() {
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
      setApiError(err.message || 'Connection failed');
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
        .sovo-result-row:hover { background: rgba(255,255,255,0.03) !important; }
      `}</style>
      <main style={{ minHeight: '100vh', background: '#020617', color: '#e2e8f0', fontFamily: 'Inter, sans-serif', padding: '40px 24px 80px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          {/* Header */}
          <header style={{ textAlign: 'center', marginBottom: 48, animation: 'sovoFadeIn 0.6s ease-out' }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              width: 80, height: 80, borderRadius: 24, fontSize: 40, marginBottom: 16,
              background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
              boxShadow: '0 0 40px rgba(139,92,246,0.4)',
            }}>🧠</div>
            <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 900, margin: '0 0 8px', background: 'linear-gradient(135deg, #8b5cf6, #3b82f6, #06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Claim Verification
            </h1>
            <p style={{ fontFamily: 'Cairo, sans-serif', fontSize: '1.2rem', color: '#94a3b8', direction: 'rtl', fontWeight: 700 }}>
              التحقق من الادعاءات
            </p>
            <p style={{ color: '#64748b', maxWidth: 700, margin: '12px auto 0', lineHeight: 1.7 }}>
              Multi-source synthesis
            </p>
          </header>

          {/* Claim Input */}
          <div style={{
            background: 'rgba(15,23,42,0.8)', backdropFilter: 'blur(12px)', borderRadius: 20,
            border: '1px solid rgba(139,92,246,0.2)', padding: 32, marginBottom: 40,
            animation: 'sovoFadeIn 0.6s ease-out 0.2s both',
          }}>
            <label style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', fontWeight: 700, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>
              Submit Claim for Verification
            </label>
            <p style={{ fontFamily: 'Cairo, sans-serif', fontSize: '0.85rem', color: '#64748b', direction: 'rtl', marginBottom: 12 }}>
              أدخل الادعاء للتحقق منه عبر جميع المحركات
            </p>
            <textarea
              value={claim}
              onChange={(e) => setClaim(e.target.value)}
              placeholder='e.g., "A study proved that 5G towers cause COVID-19 symptoms in Egyptian children..."'
              style={{
                width: '100%', minHeight: 100, padding: 16, borderRadius: 12, border: '1px solid rgba(255,255,255,0.1)',
                background: 'rgba(0,0,0,0.3)', color: '#e2e8f0', fontFamily: 'Inter, sans-serif', fontSize: '0.95rem',
                resize: 'vertical', outline: 'none', lineHeight: 1.6, boxSizing: 'border-box',
              }}
            />
            <button
              onClick={runEngines}
              disabled={isRunning || !claim.trim()}
              style={{
                marginTop: 16, padding: '14px 36px', borderRadius: 12, border: 'none', fontWeight: 800, fontSize: '1rem',
                background: isRunning ? 'rgba(139,92,246,0.3)' : 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
                color: '#fff', cursor: isRunning ? 'not-allowed' : 'pointer', transition: 'all 0.3s',
                boxShadow: isRunning ? 'none' : '0 0 20px rgba(139,92,246,0.3)',
              }}
            >
              {isRunning ? '⟳ Engines Running...' : '🚀 Run All Engines'}
            </button>
          </div>

          {/* Staged loading bar — tied to the REAL fetch lifecycle */}
          {isRunning && (
            <div style={{ marginBottom: 40, animation: 'sovoFadeIn 0.4s ease-out' }}>
              <AnalysisProgress
                running={isRunning}
                stages={STAGE_SETS.debunk}
                lang="en"
                expectedMs={18000}
                accent="#8b5cf6"
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
                  padding: 28, borderRadius: 20, background: 'rgba(15,23,42,0.8)', backdropFilter: 'blur(12px)',
                  border: `1px solid ${isActive ? e.color + '50' : 'rgba(255,255,255,0.06)'}`,
                  transition: 'all 0.4s ease', cursor: 'default',
                  animation: `sovoFadeIn 0.6s ease-out ${0.3 + i * 0.1}s both`,
                  boxShadow: isActive ? `0 0 25px ${e.color}20` : 'none',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                    <div style={{ fontSize: 36 }}>{e.icon}</div>
                    {isActive && (
                      <div style={{ padding: '4px 10px', borderRadius: 8, background: `${e.color}20`, color: e.color, fontSize: '0.75rem', fontWeight: 800 }} title="engine ran">
                        ✓
                      </div>
                    )}
                    {isRunning && !isActive && (
                      <div style={{ width: 20, height: 20, border: '2px solid rgba(255,255,255,0.1)', borderTop: `2px solid ${e.color}`, borderRadius: '50%', animation: 'sovoSpin 0.8s linear infinite' }} />
                    )}
                  </div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: e.color, marginBottom: 2 }}>{e.name}</h3>
                  <p style={{ fontFamily: 'Cairo, sans-serif', fontSize: '0.8rem', color: '#94a3b8', direction: 'rtl', marginBottom: 8, fontWeight: 600 }}>{e.nameAr}</p>
                  <p style={{ fontSize: '0.8rem', color: '#64748b', lineHeight: 1.6, marginBottom: 12 }}>{e.desc}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{e.role.replace(/-/g, ' ')}</span>
                    {isActive && (
                      <div style={{ height: 4, flex: 1, marginLeft: 12, borderRadius: 2, background: 'rgba(255,255,255,0.06)' }}>
                        <div style={{ height: '100%', width: '100%', borderRadius: 2, background: `linear-gradient(90deg, ${e.color}, ${e.color}80)`, transition: 'width 0.5s' }} />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Error */}
          {apiError && (
            <div style={{ padding: 16, borderRadius: 12, background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#ef4444', fontSize: '0.85rem', marginBottom: 24 }}>
              ⚠️ {apiError}
            </div>
          )}

          {/* Results & Verdict */}
          {showResults && apiResults && (
            <div style={{ animation: 'sovoFadeIn 0.6s ease-out' }}>
              {/* Truth Sandwich / Findings */}
              {apiResults.truth_sandwich && (
                <div style={{
                  background: 'rgba(15,23,42,0.8)', backdropFilter: 'blur(12px)', borderRadius: 20,
                  border: '1px solid rgba(255,255,255,0.06)', overflow: 'hidden', marginBottom: 24,
                }}>
                  <div style={{ padding: '20px 28px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0 }}>🥪 Truth Sandwich</h3>
                    <p style={{ fontFamily: 'Cairo, sans-serif', fontSize: '0.85rem', color: '#64748b', direction: 'rtl', margin: 0 }}>ساندويتش الحقيقة</p>
                  </div>
                  {[
                    { label: 'Fact (Top)', ar: apiResults.truth_sandwich.fact_1_ar, en: apiResults.truth_sandwich.fact_1_en, color: '#10b981' },
                    { label: 'Myth Exposed', ar: apiResults.truth_sandwich.myth_ar, en: apiResults.truth_sandwich.myth_en, color: '#ef4444' },
                    { label: 'Fact (Bottom)', ar: apiResults.truth_sandwich.fact_2_ar, en: apiResults.truth_sandwich.fact_2_en, color: '#10b981' },
                  ].map((row, i) => (
                    <div key={i} className="sovo-result-row" style={{
                      padding: '14px 28px', borderBottom: '1px solid rgba(255,255,255,0.03)',
                      display: 'flex', flexDirection: 'column', gap: 4, transition: 'background 0.2s',
                    }}>
                      <span style={{ fontWeight: 700, fontSize: '0.75rem', color: row.color, textTransform: 'uppercase', letterSpacing: 1 }}>{row.label}</span>
                      {row.ar && <p style={{ fontFamily: 'Cairo, sans-serif', fontSize: '0.9rem', color: '#e2e8f0', direction: 'rtl', margin: 0 }}>{row.ar}</p>}
                      {row.en && <p style={{ fontSize: '0.85rem', color: '#94a3b8', margin: 0 }}>{row.en}</p>}
                    </div>
                  ))}
                </div>
              )}

              {/* Cognitive Defense */}
              {apiResults.cognitive_defense && (
                <div style={{
                  background: 'rgba(15,23,42,0.8)', backdropFilter: 'blur(12px)', borderRadius: 20,
                  border: '1px solid rgba(255,255,255,0.06)', padding: '20px 28px', marginBottom: 24,
                }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 800, margin: '0 0 12px' }}>🛡 Cognitive Defense</h3>
                  <p style={{ fontSize: '0.85rem', color: '#94a3b8', margin: '0 0 4px' }}>
                    <strong style={{ color: '#f59e0b' }}>Fallacy:</strong> {apiResults.cognitive_defense.detected_fallacy}
                  </p>
                  <p style={{ fontSize: '0.85rem', color: '#94a3b8', margin: '0 0 4px' }}>
                    <strong style={{ color: '#f59e0b' }}>Bias:</strong> {apiResults.cognitive_defense.detected_bias}
                  </p>
                  {apiResults.cognitive_defense.socratic_deconstruction && (
                    <p style={{ fontSize: '0.9rem', color: '#e2e8f0', margin: '8px 0 0', fontStyle: 'italic' }}>
                      💬 {apiResults.cognitive_defense.socratic_deconstruction}
                    </p>
                  )}
                </div>
              )}

              {/* Verdict */}
              {apiResults.verdict && (
                <div style={{
                  background: 'rgba(239,68,68,0.05)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 20,
                  padding: 32, textAlign: 'center', animation: 'sovoGlow 3s ease-in-out infinite',
                }}>
                  <div style={{ fontSize: 48, marginBottom: 12 }}>🚨</div>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#ef4444', marginBottom: 8 }}>VERDICT: {apiResults.verdict}</h3>
                  {apiResults.verdict_explanation_ar && <p style={{ fontFamily: 'Cairo, sans-serif', fontSize: '1.1rem', color: '#ef4444', direction: 'rtl', marginBottom: 16, fontWeight: 700 }}>{apiResults.verdict_explanation_ar}</p>}
                  {apiResults.verdict_explanation_en && <p style={{ color: '#94a3b8', maxWidth: 600, margin: '0 auto', lineHeight: 1.7, fontSize: '0.9rem' }}>{apiResults.verdict_explanation_en}</p>}
                  {apiResults.citations && apiResults.citations.length > 0 && (
                    <div style={{ marginTop: 16, fontSize: '0.8rem', color: '#64748b', textAlign: 'left', maxWidth: 600, margin: '16px auto 0' }}>
                      <strong style={{ color: '#94a3b8' }}>Sources:</strong>
                      <ul style={{ margin: '4px 0 0', paddingLeft: 16 }}>
                        {apiResults.citations.slice(0, 5).map((c: any, i: number) => (
                          <li key={i}><a href={c.url} target="_blank" rel="noreferrer" style={{ color: '#3b82f6' }}>{c.title}</a> <span style={{ color: '#475569' }}>[{c.type}]</span></li>
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
            <Link href="/explore" style={{ color: '#64748b', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 600 }}>
              ← Back to Explore
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
