'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { PageNavigation } from '@/components/shared/page-navigation';

const decks = [
  {
    title: 'Competition Pitch Deck',
    titleAr: 'عرض المسابقة',
    icon: '🏆',
    color: '#f59e0b',
    slides: 24,
    duration: '15 min',
    desc: 'Complete competition presentation covering the platform vision, problem statement (misinformation in Egypt affecting 67M+ internet users), solution architecture, technical innovation, and social impact metrics.',
    topics: ['Problem & Opportunity', 'Platform Architecture', '8 AI Engine Overview', 'Impact Metrics', 'Competition Differentiators', 'Roadmap & Sustainability'],
    format: 'PDF / PPTX',
    size: '12.4 MB',
  },
  {
    title: 'Technical Architecture',
    titleAr: 'البنية التقنية',
    icon: '⚙️',
    color: '#3b82f6',
    slides: 32,
    duration: '20 min',
    desc: 'Deep dive into the Next.js 15 architecture with 123+ pages, 80+ API routes, SOVO orchestration layer, multi-model AI pipeline (Gemini 2.5, Groq Llama 4, ONNX), and SCORM/xAPI telemetry integration.',
    topics: ['Next.js 15 App Router', 'SOVO Orchestration', 'Multi-Model Pipeline', 'API Architecture (80+ Routes)', 'SCORM/xAPI Integration', 'Security & Rate Limiting'],
    format: 'PDF / PPTX',
    size: '18.7 MB',
  },
  {
    title: 'Scientific Foundation',
    titleAr: 'الأساس العلمي',
    icon: '🔬',
    color: '#10b981',
    slides: 28,
    duration: '18 min',
    desc: 'Evidence base covering WHO mhGAP guidelines for mental health, SIFT methodology for fact-checking (Wineburg & McGrew, 2019), FLICC taxonomy (Cook, 2020), COM-B behavioral model, and peer-reviewed misinformation research.',
    topics: ['WHO mhGAP Framework', 'SIFT Methodology', 'FLICC Taxonomy', 'COM-B Behavioral Model', 'rPPG Blood Flow Analysis', 'Inoculation Theory (Van der Linden)'],
    format: 'PDF / PPTX',
    size: '15.2 MB',
  },
  {
    title: 'Islamic Tools Showcase',
    titleAr: 'عرض الأدوات الإسلامية',
    icon: '🕌',
    color: '#8b5cf6',
    slides: 20,
    duration: '12 min',
    desc: 'Presentation of the Islamic scholarship integration: Tafsīr from Ibn Kathīr, Al-Tabari, and Al-Qurtubi, Maqāṣid al-Sharīʿah reasoning engine, hadith authentication pipeline, and Al-Azhar fatwa cross-referencing.',
    topics: ['Tafsīr Integration', 'Maqāṣid al-Sharīʿah Engine', 'Hadith Authentication', 'Al-Azhar Fatwa Database', 'Islamic Psychology (Ibn al-Qayyim)', 'Scholarly Source Verification'],
    format: 'PDF / PPTX',
    size: '9.8 MB',
  },
  {
    title: 'Impact Report',
    titleAr: 'تقرير الأثر',
    icon: '📊',
    color: '#06b6d4',
    slides: 18,
    duration: '10 min',
    desc: 'Social impact assessment covering projected reach across Egyptian governorates, misinformation resilience improvement metrics, mental health literacy gains, and alignment with Egypt Vision 2030 digital literacy goals.',
    topics: ['Reach & Accessibility', 'Misinformation Resilience', 'Mental Health Literacy', 'Egypt Vision 2030 Alignment', 'Scalability Plan', 'Partnership Opportunities'],
    format: 'PDF / PPTX',
    size: '8.3 MB',
  },
];

export default function PresentationPage() {
  const [selectedDeck, setSelectedDeck] = useState<number | null>(null);
  const [downloadingIdx, setDownloadingIdx] = useState<number | null>(null);

  const handleDownload = (idx: number) => {
    setDownloadingIdx(idx);
    setTimeout(() => setDownloadingIdx(null), 2000);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;
400;500;600;700;800;900&family=Cairo:wght@400;600;700;800&display=swap');
        @keyframes presFadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes presShimmer { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }
        .pres-card:hover { transform: translateY(-6px); box-shadow: 0 16px 48px rgba(0,0,0,0.4); }
        .pres-dl-btn:hover { filter: brightness(1.2); transform: scale(1.03); }
        .pres-topic:hover { background: rgba(255,255,255,0.08) !important; }
      `}</style>
      <main style={{ minHeight: '100vh', background: '#020617', color: '#e2e8f0', fontFamily: 'Inter, sans-serif', padding: '40px 24px 80px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          {/* Header */}
          <header style={{ textAlign: 'center', marginBottom: 48, animation: 'presFadeIn 0.6s ease-out' }}>
            <div style={{
              display: 'inline-flex', width: 80, height: 80, borderRadius: 24, fontSize: 40,
              alignItems: 'center', justifyContent: 'center', marginBottom: 16,
              background: 'linear-gradient(135deg, #f59e0b, #ef4444)',
              boxShadow: '0 0 40px rgba(245,158,11,0.4)',
            }}>📑</div>
            <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 900, margin: '0 0 8px', background: 'linear-gradient(135deg, #f59e0b, #ef4444, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Presentation Center
            </h1>
            <p style={{ fontFamily: 'Cairo, sans-serif', fontSize: '1.2rem', color: '#94a3b8', direction: 'rtl', fontWeight: 700 }}>
              مركز العروض التقديمية
            </p>
            <p style={{ color: '#64748b', maxWidth: 650, margin: '12px auto 0', lineHeight: 1.7 }}>
              Download competition-ready presentation decks covering every aspect of the Egyptian Awareness Library —
              from technical architecture to social impact assessment.
            </p>
          </header>

          {/* Deck Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24 }}>
            {decks.map((d, i) => (
              <div
                key={i}
                className="pres-card"
                onClick={() => setSelectedDeck(selectedDeck === i ? null : i)}
                style={{
                  borderRadius: 20, overflow: 'hidden', cursor: 'pointer',
                  background: 'rgba(15,23,42,0.8)', backdropFilter: 'blur(12px)',
                  border: `1px solid ${selectedDeck === i ? d.color + '50' : 'rgba(255,255,255,0.06)'}`,
                  transition: 'all 0.3s ease',
                  animation: `presFadeIn 0.6s ease-out ${0.2 + i * 0.1}s both`,
                }}
              >
                {/* Preview Area */}
                <div style={{
                  height: 160, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                  background: `linear-gradient(135deg, ${d.color}15, ${d.color}05)`,
                  borderBottom: `1px solid ${d.color}20`, position: 'relative',
                }}>
                  <div style={{ fontSize: 56, marginBottom: 8 }}>{d.icon}</div>
                  <div style={{ display: 'flex', gap: 12, fontSize: '0.75rem', color: '#94a3b8' }}>
                    <span>📄 {d.slides} slides</span>
                    <span>⏱️ {d.duration}</span>
                    <span>💾 {d.size}</span>
                  </div>
                  <div style={{
                    position: 'absolute', top: 12, right: 12, padding: '4px 10px', borderRadius: 6,
                    background: `${d.color}20`, color: d.color, fontSize: '0.65rem', fontWeight: 800,
                  }}>
                    {d.format}
                  </div>
                </div>

                {/* Content */}
                <div style={{ padding: 24 }}>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: d.color, marginBottom: 4 }}>{d.title}</h3>
                  <p style={{ fontFamily: 'Cairo, sans-serif', fontSize: '0.85rem', color: '#94a3b8', direction: 'rtl', fontWeight: 600, marginBottom: 12 }}>{d.titleAr}</p>
                  <p style={{ fontSize: '0.8rem', color: '#64748b', lineHeight: 1.6, marginBottom: 16 }}>{d.desc}</p>

                  {/* Topics */}
                  {selectedDeck === i && (
                    <div style={{ marginBottom: 16, animation: 'presFadeIn 0.3s ease-out' }}>
                      <div style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 700, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>Key Topics</div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                        {d.topics.map((t, j) => (
                          <span key={j} className="pres-topic" style={{
                            padding: '4px 10px', borderRadius: 6, background: 'rgba(255,255,255,0.05)',
                            fontSize: '0.7rem', color: '#94a3b8', transition: 'background 0.2s',
                          }}>{t}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Download Button */}
                  <button
                    className="pres-dl-btn"
                    onClick={(e) => { e.stopPropagation(); handleDownload(i); }}
                    style={{
                      width: '100%', padding: '12px 0', borderRadius: 12, border: 'none', fontWeight: 700, fontSize: '0.9rem',
                      background: downloadingIdx === i
                        ? `linear-gradient(90deg, ${d.color}40, ${d.color}80, ${d.color}40)`
                        : `linear-gradient(135deg, ${d.color}, ${d.color}CC)`,
                      backgroundSize: downloadingIdx === i ? '200% auto' : 'auto',
                      animation: downloadingIdx === i ? 'presShimmer 1.5s linear infinite' : 'none',
                      color: '#fff', cursor: 'pointer', transition: 'all 0.3s',
                    }}
                  >
                    {downloadingIdx === i ? '⏳ Preparing Download...' : `📥 Download ${d.format}`}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Back Link */}
          <div style={{ textAlign: 'center', marginTop: 48 }}>
            <Link href="/explore" style={{ color: '#64748b', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 600 }}>
              ← Back to Explore
            </Link>
            <PageNavigation currentPath="/presentation" />
          </div>
        </div>
      </main>
    </>
  );
}
