'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { PageNavigation } from '@/components/shared/page-navigation';
import { useRTL } from '@/components/shared/rtl-provider';

const enginesData = [
  {
    name: 'DeepReal Verification Engine',
    nameAr: 'محرك التحقق العميق',
    icon: '🔴',
    route: '/deepreal',
    status: 'operational',
    color: '#ef4444',
    purpose: 'Primary fact-checking engine. Implements the SIFT methodology (Wineburg & McGrew, 2019) and the FLICC taxonomy (Cook, 2020) for systematic misinformation identification, with an AI-assisted media analysis prototype.',
    input: 'Text claims, image URLs, video URLs, social media post links',
    output: 'Verification verdict (True/False/Misleading), qualitative confidence, identified fallacy types, source credibility notes, evidence chain',
    accuracy: 'Not benchmarked',
    latency: 'Varies (LLM call)',
    models: 'Gemini 2.0 Flash',
    useCases: [
      'Verifying viral WhatsApp health claims circulating in Egyptian communities',
      'Analyzing posts for FLICC misinformation techniques (Cook, 2020)',
      'Cross-referencing claims against the evidence aggregator (OpenAlex, Semantic Scholar, Crossref, EuropePMC, DOAJ)',
      'Surfacing the deepfake-forensics prototype for media submitted by users',
    ],
  },
  {
    name: 'Mental Health Shield Engine',
    nameAr: 'محرك الدرع النفسي',
    icon: '🧠',
    route: '/mental-health',
    status: 'operational',
    color: '#3b82f6',
    purpose: 'WHO mhGAP-informed mental health literacy engine. Detects stigmatizing language, provides evidence-based psychoeducation, and applies cognitive friction for harmful content.',
    input: 'Text content and user-reported emotional state indicators',
    output: 'Stigma detection signal, mhGAP-informed guidance, safe-messaging prompts, crisis resource links',
    accuracy: 'Not benchmarked',
    latency: 'Varies (LLM call)',
    models: 'Gemini 2.0 Flash',
    useCases: [
      'Detecting stigmatizing mental health language in Arabic social media posts',
      'Providing WHO mhGAP-informed psychoeducation on depression and anxiety',
      'Applying strategic friction when harmful self-harm content is detected',
      'Connecting users to a published Egyptian crisis support line',
    ],
  },
  {
    name: 'Religion Hub Reasoning Engine',
    nameAr: 'محرك التفكير الديني',
    icon: '🕌',
    route: '/religion-hub',
    status: 'operational',
    color: '#8b5cf6',
    purpose: 'Islamic scholarship support that references classical tafsīr sources, Maqāṣid al-Sharīʿah reasoning, and a hadith-lookup pipeline. Outputs are labeled educational context, not personal rulings.',
    input: 'Religious claims, Quran verse references, hadith citations, Arabic text',
    output: 'Educational verification notes, tafsīr cross-reference, hadith grading where available (Sahih/Hasan/Daʿif), Maqāṣid framing',
    accuracy: 'Not benchmarked',
    latency: 'Varies (LLM call)',
    models: 'Gemini 2.0 Flash + hadith API (when a key is configured)',
    useCases: [
      'Looking up well-known hadiths from collections such as Sahih al-Bukhari and Sahih Muslim',
      'Cross-referencing Quran interpretations across classical tafsīr scholars',
      'Flagging commonly fabricated or misattributed scholarly claims for further review',
      'Framing claims through the Maqāṣid al-Sharīʿah objectives',
    ],
  },
  {
    name: 'SOVO Orchestration Engine',
    nameAr: 'محرك التنسيق الشامل',
    icon: '🎯',
    route: '/sovo',
    status: 'operational',
    color: '#10b981',
    purpose: 'Orchestration layer that routes queries to specialized engines and synthesizes results. Uses a multi-provider key rotator (Gemini, Groq, OpenRouter, Cerebras, Together, SambaNova) with automatic model failover.',
    input: 'Any user query, claim, or interaction — classified and routed',
    output: 'Unified response combining results from multiple engines, composite confidence signal, recommended actions',
    accuracy: 'Not benchmarked',
    latency: 'Varies',
    models: 'Gemini 2.0 Flash + Groq Llama 3.3 70B',
    useCases: [
      'Routing a complex claim that touches both medical and religious aspects',
      'Orchestrating the operational verification engines (DeepReal, Mental Health, Religion Hub)',
      'Managing model failover across providers when a primary API hits rate limits',
      'Synthesizing results from multiple engines into one response',
    ],
  },
  {
    name: 'Sentiment & Emotion Analyzer',
    nameAr: 'محلل المشاعر والعواطف',
    icon: '💭',
    route: '/angry-debunkers',
    status: 'partial',
    color: '#f59e0b',
    purpose: 'NLP-based emotional tone detection built on the VADER lexicon plus keyword/trigger heuristics. An optional Hugging Face AraBERT call adds Arabic linguistic analysis when an API key is configured, with a local fallback. Identifies manipulative framing, fear-mongering, and rage-bait patterns.',
    input: 'Text content in Arabic or English, social media posts, news article headlines',
    output: 'Sentiment/emotion signal, manipulation score, emotional-trigger highlights, identified manipulation techniques',
    accuracy: 'Not benchmarked',
    latency: 'Fast (local) / varies if HF used',
    models: 'VADER lexicon + heuristics (+ optional AraBERT via Hugging Face)',
    useCases: [
      'Detecting emotional manipulation in news headlines',
      'Estimating fear-mongering intensity in health misinformation',
      'Identifying rage-bait patterns in social media engagement farming',
      'Highlighting emotional-exploitation cues in conspiracy narratives',
    ],
  },
  {
    name: 'Cognitive Bias Detector',
    nameAr: 'كاشف التحيز المعرفي',
    icon: '⚖️',
    route: '/bias-detector',
    status: 'operational',
    color: '#06b6d4',
    purpose: 'Identifies common cognitive biases in content and arguments using a curated taxonomy. Draws on Kahneman & Tversky\'s dual-process theory and references the COM-B behavioral change model (Michie et al., 2011).',
    input: 'Text claims, argument structures, decision points',
    output: 'Identified biases from the taxonomy, qualitative intensity signal, debiasing suggestions',
    accuracy: 'Not benchmarked',
    latency: 'Varies',
    models: 'Gemini 2.0 Flash + keyword classifier',
    useCases: [
      'Detecting confirmation bias reinforcement in echo chamber content',
      'Identifying anchoring bias in misleading statistical presentations',
      'Analyzing bandwagon effect triggers in viral misinformation',
      'Assessing Dunning-Kruger patterns in overconfident medical claims',
    ],
  },
  {
    name: 'Digital Forensics Engine',
    nameAr: 'محرك الطب الشرعي الرقمي',
    icon: '🔬',
    route: '/forensic-image',
    status: 'prototype',
    color: '#ec4899',
    purpose: 'Media forensics workspace covering C2PA content-provenance checks and AI-vision-assisted image analysis. Error Level Analysis, EXIF parsing, and deepfake (rPPG) detection are described in the analysis framework but are prototype/demo-stage, not production-validated.',
    input: 'Image files (JPEG, PNG, WebP), URLs to media content, C2PA manifests',
    output: 'C2PA validation status, AI-vision manipulation assessment, and prototype ELA/EXIF/GAN notes where available',
    accuracy: 'Not benchmarked',
    latency: 'Varies',
    models: 'Gemini Vision + C2PA validation',
    useCases: [
      'Validating C2PA content-provenance manifests on news photos',
      'Running AI-vision-assisted checks on images shared on social media',
      'Reviewing prototype ELA/EXIF/GAN signals where present',
      'Linking out to reverse image search to trace original context',
    ],
  },
  {
    name: 'OSINT Investigation Engine',
    nameAr: 'محرك استخبارات المصادر المفتوحة',
    icon: '🌐',
    route: '/osint-investigator',
    status: 'partial',
    color: '#a855f7',
    purpose: 'Open-Source Intelligence support: cross-references claims across Arabic and English sources, assists with geolocation reasoning, and surfaces domain and timeline signals.',
    input: 'Claims with geographic references, social media profiles, domain names, URLs, event descriptions',
    output: 'Source verification notes, geolocation assessment, domain age/reputation signals, temporal consistency notes',
    accuracy: 'Not benchmarked',
    latency: 'Varies',
    models: 'Gemini 2.0 Flash + OSINT lookups',
    useCases: [
      'Reasoning about geographic claims tied to specific locations',
      'Reviewing the credibility and age of news domains',
      'Looking for patterns suggestive of coordinated inauthentic behavior',
      'Cross-referencing event timelines across multiple news sources',
    ],
  },
];

function statusMeta(status?: string, isRTL = false) {
  switch (status) {
    case 'operational':
      return { label: isRTL ? 'شغّال' : 'Operational', color: '#10b981' };
    case 'partial':
      return { label: isRTL ? 'جزئي' : 'Partial', color: '#f59e0b' };
    case 'prototype':
      return { label: isRTL ? 'نموذج أولي' : 'Prototype', color: '#a855f7' };
    default:
      return { label: isRTL ? 'قيد التنفيذ' : 'In progress', color: '#64748b' };
  }
}

export default function EnginesGuidePage() {
  const { isRTL } = useRTL();
  const [expanded, setExpanded] = useState<number | null>(0);
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = enginesData.filter(e =>
    e.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.purpose.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;
400;500;600;700;800;900&family=Cairo:wght@400;600;700;800&display=swap');
        @keyframes egFadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes egSlideDown { from { opacity: 0; max-height: 0; } to { opacity: 1; max-height: 1000px; } }
        .eg-accordion:hover { border-color: rgba(255,255,255,0.12) !important; }
        .eg-usecase:hover { background: rgba(255,255,255,0.04) !important; }
        .eg-metric:hover { transform: scale(1.05); }
      `}</style>
      <main dir={isRTL ? 'rtl' : 'ltr'} style={{ minHeight: '100vh', background: 'var(--bg-page)', color: 'var(--text-primary)', fontFamily: 'Inter, sans-serif', padding: '40px 24px 80px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          {/* Header */}
          <header style={{ textAlign: 'center', marginBottom: 40, animation: 'egFadeIn 0.6s ease-out' }}>
            <div style={{
              display: 'inline-flex', width: 80, height: 80, borderRadius: 24, fontSize: 40,
              alignItems: 'center', justifyContent: 'center', marginBottom: 16,
              background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
              boxShadow: '0 0 40px rgba(59,130,246,0.4)',
            }}>🗺️</div>
            <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 900, margin: '0 0 8px', background: 'linear-gradient(135deg, #3b82f6, #8b5cf6, #06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              {isRTL ? 'دليل محركات الذكاء الاصطناعي' : 'AI Engines Guide'}
            </h1>
            <p style={{ fontFamily: 'Cairo, sans-serif', fontSize: '1.2rem', color: 'var(--text-secondary)', direction: isRTL ? 'ltr' : 'rtl', fontWeight: 700 }}>
              {isRTL ? 'AI Engines Guide' : 'دليل محركات الذكاء الاصطناعي'}
            </p>
            <p style={{ color: 'var(--text-muted)', maxWidth: 650, margin: '12px auto 0', lineHeight: 1.7 }}>
              {isRTL
                ? 'دليل مرجعي لمحركات وأدوات التحقق بالذكاء الاصطناعي في المنصة، كل واحد بيركّز على بُعد معيّن من أبعاد مكافحة التضليل. علامات الحالة بتوضّح إيه اللي شغّال دلوقتي وإيه اللي لسه نموذج أولي. أرقام الدقة مش متقاسة بشكل مستقل.'
                : "Reference guide to the platform's AI verification engines and tools, each aimed at a specific dimension of misinformation defense. Status labels mark what is operational today versus prototype. Accuracy figures are not independently benchmarked."}
            </p>
          </header>

          {/* Search */}
          <div style={{
            marginBottom: 32, animation: 'egFadeIn 0.6s ease-out 0.2s both',
          }}>
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={isRTL ? 'دوّر على المحركات بالاسم أو الغرض...' : 'Search engines by name or purpose...'}
              style={{
                width: '100%', padding: '14px 20px', borderRadius: 14, border: '1px solid var(--border-primary)',
                background: 'var(--bg-card)', backdropFilter: 'blur(12px)', color: 'var(--text-primary)',
                fontFamily: 'Inter, sans-serif', fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box',
                textAlign: isRTL ? 'right' : 'left',
              }}
            />
          </div>

          {/* Accordion */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {filtered.map((e, i) => {
              const isOpen = expanded === i;
              return (
                <div key={i} className="eg-accordion" style={{
                  borderRadius: 20, overflow: 'hidden',
                  background: 'var(--bg-card)', backdropFilter: 'blur(12px)',
                  border: `1px solid ${isOpen ? e.color + '40' : 'var(--border-subtle)'}`,
                  transition: 'all 0.3s ease',
                  animation: `egFadeIn 0.5s ease-out ${0.1 * i}s both`,
                }}>
                  {/* Header */}
                  <button
                    onClick={() => setExpanded(isOpen ? null : i)}
                    style={{
                      width: '100%', padding: '20px 28px', background: 'none', border: 'none', cursor: 'pointer',
                      display: 'flex', alignItems: 'center', gap: 16, color: 'var(--text-primary)', textAlign: isRTL ? 'right' : 'left',
                      fontFamily: 'Inter, sans-serif',
                    }}
                  >
                    <span style={{ fontSize: 32, flexShrink: 0 }}>{e.icon}</span>
                    <div style={{ flex: 1 }}>
                      <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: e.color, margin: 0 }}>{isRTL ? e.nameAr : e.name}</h3>
                      <p style={{ fontFamily: 'Cairo, sans-serif', fontSize: '0.8rem', color: 'var(--text-secondary)', direction: isRTL ? 'ltr' : 'rtl', margin: 0, fontWeight: 600 }}>{isRTL ? e.name : e.nameAr}</p>
                    </div>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexShrink: 0 }}>
                      <span style={{ padding: '4px 10px', borderRadius: 6, background: `${statusMeta(e.status).color}18`, color: statusMeta(e.status).color, fontSize: '0.7rem', fontWeight: 800 }}>
                        {statusMeta(e.status, isRTL).label}
                      </span>
                      <span style={{ fontSize: '1.2rem', color: 'var(--text-muted)', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s', display: 'inline-block' }}>▼</span>
                    </div>
                  </button>

                  {/* Expandable Content */}
                  {isOpen && (
                    <div style={{ padding: '0 28px 28px', animation: 'egFadeIn 0.4s ease-out' }}>
                      <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: 20 }}>
                        {/* Purpose */}
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 20 }}>{e.purpose}</p>

                        {/* Metrics */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: 12, marginBottom: 20 }}>
                          {[
                            { label: isRTL ? 'التحقّق' : 'Validation', value: e.accuracy },
                            { label: isRTL ? 'زمن الاستجابة' : 'Latency', value: e.latency },
                            { label: isRTL ? 'النماذج' : 'Models', value: e.models },
                          ].map((m, j) => (
                            <div key={j} className="eg-metric" style={{
                              padding: '12px 16px', borderRadius: 12, background: 'var(--bg-elevated)',
                              border: '1px solid var(--border-subtle)', transition: 'transform 0.2s', cursor: 'default',
                            }}>
                              <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', marginBottom: 4 }}>{m.label}</div>
                              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: e.color }}>{m.value}</div>
                            </div>
                          ))}
                        </div>

                        {/* Input/Output */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
                          <div>
                            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', marginBottom: 6 }}>{isRTL ? '📥 المدخلات' : '📥 Input'}</div>
                            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>{e.input}</p>
                          </div>
                          <div>
                            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', marginBottom: 6 }}>{isRTL ? '📤 المخرجات' : '📤 Output'}</div>
                            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>{e.output}</p>
                          </div>
                        </div>

                        {/* Use Cases */}
                        <div>
                          <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', marginBottom: 8 }}>{isRTL ? '🎯 حالات الاستخدام' : '🎯 Use Cases'}</div>
                          {e.useCases.map((uc, j) => (
                            <div key={j} className="eg-usecase" style={{
                              display: 'flex', gap: 8, padding: '8px 12px', borderRadius: 8,
                              transition: 'background 0.2s', marginBottom: 4,
                            }}>
                              <span style={{ color: e.color, flexShrink: 0 }}>→</span>
                              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{uc}</span>
                            </div>
                          ))}
                        </div>

                        {/* Route Link */}
                        {e.route && (
                          <div style={{ marginTop: 22, paddingTop: 18, borderTop: '1px solid var(--border-subtle)' }}>
                            <Link
                              href={e.route}
                              style={{
                                display: 'inline-flex', alignItems: 'center', gap: 8,
                                padding: '10px 18px', borderRadius: 12, textDecoration: 'none',
                                background: `${e.color}1a`, border: `1px solid ${e.color}40`,
                                color: e.color, fontSize: '0.85rem', fontWeight: 700,
                              }}
                            >
                              {isRTL ? 'افتح المحرك' : 'Open this engine'}
                              <span style={{ fontFamily: 'Cairo, sans-serif', color: 'var(--text-secondary)', fontWeight: 600 }}>{isRTL ? '· Open this engine' : '· افتح المحرك'}</span>
                              <span aria-hidden>→</span>
                            </Link>
                            <span style={{ marginInlineStart: 10, fontSize: '0.72rem', color: 'var(--text-muted)' }}>{e.route}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Summary Stats */}
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 16,
            marginTop: 40, animation: 'egFadeIn 0.6s ease-out 0.8s both',
          }}>
            {[
              { label: isRTL ? 'المحركات والأدوات' : 'Engines & Tools', value: String(enginesData.length), icon: '⚡' },
              { label: isRTL ? 'شغّال دلوقتي' : 'Operational Now', value: String(enginesData.filter(e => e.status === 'operational').length), icon: '✅' },
              { label: isRTL ? 'النموذج الأساسي' : 'Primary Model', value: 'Gemini 2.0 Flash', icon: '🤖' },
              { label: isRTL ? 'المقاييس' : 'Metrics', value: isRTL ? 'مش متقاسة' : 'Not benchmarked', icon: '🔬' },
            ].map((s, i) => (
              <div key={i} style={{
                padding: 20, borderRadius: 16, textAlign: 'center', background: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)', backdropFilter: 'blur(12px)',
              }}>
                <div style={{ fontSize: 24, marginBottom: 8 }}>{s.icon}</div>
                <div style={{ fontSize: 'clamp(0.95rem, 2.4vw, 1.4rem)', lineHeight: 1.2, fontWeight: 900, background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{s.value}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Back Link */}
          <div style={{ textAlign: 'center', marginTop: 48 }}>
            <Link href="/explore" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 600 }}>
              {isRTL ? 'الرجوع للاستكشاف →' : '← Back to Explore'}
            </Link>
            <PageNavigation currentPath="/engines-guide" />
          </div>
        </div>
      </main>
    </>
  );
}
