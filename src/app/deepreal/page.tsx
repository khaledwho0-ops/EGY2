'use client';
import React, { useState, useCallback } from 'react';
import Link from 'next/link';
import { PageNavigation } from '@/components/shared/page-navigation';
import { PageAIChatbot } from '@/components/shared/page-ai-chatbot';

const toolCards = [
  {
    icon: '🔬',
    title: 'Image Forensics',
    titleAr: 'تحليل الصور الجنائي',
    desc: 'ELA, noise analysis, clone detection, and JPEG ghost analysis to expose pixel-level manipulation in images.',
    href: '/forensic-image',
    color: '#3b82f6',
  },
  {
    icon: '🎬',
    title: 'Video Analysis',
    titleAr: 'تحليل الفيديو',
    desc: 'Frame-by-frame deepfake detection using temporal consistency checks, lip-sync analysis, and GAN artifact scanning.',
    href: '/deepreal-forensics',
    color: '#8b5cf6',
  },
  {
    icon: '🎙️',
    title: 'Audio Check',
    titleAr: 'فحص الصوت',
    desc: 'Voice cloning detection via spectral analysis, formant tracking, and neural vocoder artifact identification.',
    href: '/deepreal-upload',
    color: '#f59e0b',
  },
  {
    icon: '🛡️',
    title: 'C2PA Verification',
    titleAr: 'التحقق من C2PA',
    desc: 'Content Credentials verification using the Coalition for Content Provenance and Authenticity standard.',
    href: '/forensic-c2pa',
    color: '#10b981',
  },
];

export default function DeepRealPage() {
  const [dragActive, setDragActive] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true);
    else if (e.type === 'dragleave') setDragActive(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const files = Array.from(e.dataTransfer.files).map(f => f.name);
    setUploadedFiles(prev => [...prev, ...files]);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Cairo:wght@400;600;700;800&display=swap');
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 20px rgba(59,130,246,0.3); }
          50% { box-shadow: 0 0 40px rgba(59,130,246,0.6); }
        }
        @keyframes borderRotate {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes scanLine {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes dashAnim {
          to { stroke-dashoffset: 0; }
        }
        .dr-card-hover:hover {
          transform: translateY(-6px) scale(1.02);
          box-shadow: 0 20px 60px rgba(0,0,0,0.4);
        }
        .dr-history-row:hover {
          background: rgba(59,130,246,0.08) !important;
        }
        .dr-dropzone-active {
          border-color: #3b82f6 !important;
          background: rgba(59,130,246,0.08) !important;
        }
      `}</style>
      <div style={{
        minHeight: '100vh',
        background: '#020617',
        fontFamily: "'Inter', sans-serif",
        color: '#e2e8f0',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Scan line effect */}
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, height: '2px',
          background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.4), transparent)',
          animation: 'scanLine 4s linear infinite',
          zIndex: 1, pointerEvents: 'none',
        }} />

        {/* Ambient glow */}
        <div style={{
          position: 'fixed', top: '-200px', right: '-200px', width: '600px', height: '600px',
          background: 'radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '40px 24px', position: 'relative', zIndex: 2 }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '60px', animation: 'fadeInUp 0.6s ease' }}>
            <div style={{
              display: 'inline-block', padding: '6px 20px', borderRadius: '20px', marginBottom: '20px',
              background: 'rgba(59,130,246,0.15)', border: '1px solid rgba(59,130,246,0.3)',
              fontSize: '13px', fontWeight: 600, color: '#60a5fa', letterSpacing: '2px', textTransform: 'uppercase',
            }}>
              Engine 01 — Verification Command Center
            </div>
            <h1 style={{
              fontSize: '52px', fontWeight: 900, margin: '0 0 8px 0', lineHeight: 1.1,
              background: 'linear-gradient(135deg, #3b82f6, #8b5cf6, #06b6d4)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>
              Forensics Dashboard
            </h1>
            <p style={{ fontFamily: "'Cairo', sans-serif", fontSize: '22px', color: '#94a3b8', margin: '8px 0 0 0', direction: 'rtl' as const }}>
              مركز قيادة التحقق من الوسائط المتعددة
            </p>
            <p style={{ color: '#64748b', fontSize: '15px', marginTop: '12px', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}>
              Powered by 6-layer forensic analysis pipeline. Detect deepfakes, verify provenance, and protect against synthetic media threats.
            </p>
            <Link href="/explore" style={{
              display: 'inline-flex', alignItems: 'center', gap: '6px', marginTop: '16px',
              color: '#60a5fa', fontSize: '14px', textDecoration: 'none',
            }}>
              ← Back to Explore
            </Link>
          </div>


          {/* 4 Tool Cards */}
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px', marginBottom: '50px',
          }}>
            {toolCards.map((card, i) => (
              <Link href={card.href} key={i} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div
                  className="dr-card-hover"
                  onMouseEnter={() => setHoveredCard(i)}
                  onMouseLeave={() => setHoveredCard(null)}
                  style={{
                    background: 'rgba(15,23,42,0.8)', backdropFilter: 'blur(12px)',
                    border: `1px solid ${hoveredCard === i ? card.color : 'rgba(59,130,246,0.15)'}`,
                    borderRadius: '16px', padding: '28px',
                    transition: 'all 0.3s ease', cursor: 'pointer',
                    animation: `fadeInUp ${0.5 + i * 0.1}s ease`,
                    position: 'relative', overflow: 'hidden',
                  }}
                >
                  {/* Glow on hover */}
                  <div style={{
                    position: 'absolute', top: '-50px', right: '-50px', width: '150px', height: '150px',
                    background: `radial-gradient(circle, ${card.color}15 0%, transparent 70%)`,
                    opacity: hoveredCard === i ? 1 : 0, transition: 'opacity 0.3s',
                  }} />
                  <div style={{ fontSize: '40px', marginBottom: '16px' }}>{card.icon}</div>
                  <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#f1f5f9', margin: '0 0 4px 0' }}>{card.title}</h3>
                  <p style={{ fontFamily: "'Cairo', sans-serif", fontSize: '14px', color: card.color, margin: '0 0 12px 0', direction: 'rtl' as const }}>
                    {card.titleAr}
                  </p>
                  <p style={{ fontSize: '13px', color: '#94a3b8', lineHeight: 1.6, margin: '0 0 16px 0' }}>{card.desc}</p>
                  <div style={{
                    display: 'flex', justifyContent: 'flex-end', alignItems: 'center',
                    borderTop: '1px solid rgba(100,116,139,0.2)', paddingTop: '12px',
                  }}>
                    <span style={{ fontSize: '13px', color: card.color, fontWeight: 600 }}>Launch →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>


          {/* Upload Drop Zone */}
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={dragActive ? 'dr-dropzone-active' : ''}
            style={{
              background: dragActive ? 'rgba(59,130,246,0.08)' : 'rgba(15,23,42,0.6)',
              backdropFilter: 'blur(12px)',
              border: `2px dashed ${dragActive ? '#3b82f6' : 'rgba(100,116,139,0.3)'}`,
              borderRadius: '16px', padding: '60px 40px', textAlign: 'center',
              transition: 'all 0.3s ease', cursor: 'pointer', animation: 'fadeInUp 1s ease',
            }}
          >
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>{dragActive ? '📥' : '🔍'}</div>
            <h3 style={{ fontSize: '22px', fontWeight: 700, color: '#f1f5f9', margin: '0 0 8px 0' }}>
              {dragActive ? 'Drop to Analyze' : 'Quick Verify — Drop Media Here'}
            </h3>
            <p style={{ fontFamily: "'Cairo', sans-serif", fontSize: '16px', color: '#64748b', direction: 'rtl' as const, margin: '0 0 16px 0' }}>
              اسحب الملفات هنا للتحقق السريع
            </p>
            <p style={{ fontSize: '13px', color: '#64748b' }}>
              Supports JPG, PNG, MP4, WAV, PDF — Max 50MB per file
            </p>
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginTop: '16px', flexWrap: 'wrap' }}>
              {['JPG', 'PNG', 'MP4', 'WAV', 'PDF'].map(fmt => (
                <span key={fmt} style={{
                  padding: '4px 12px', borderRadius: '6px', fontSize: '11px', fontWeight: 600,
                  background: 'rgba(59,130,246,0.1)', color: '#60a5fa', border: '1px solid rgba(59,130,246,0.2)',
                }}>
                  .{fmt}
                </span>
              ))}
            </div>
            {uploadedFiles.length > 0 && (
              <div style={{ marginTop: '20px', borderTop: '1px solid rgba(100,116,139,0.2)', paddingTop: '16px' }}>
                <div style={{ fontSize: '13px', color: '#94a3b8', marginBottom: '8px' }}>Queued for analysis:</div>
                {uploadedFiles.map((f, i) => (
                  <div key={i} style={{ fontSize: '13px', color: '#60a5fa', padding: '4px 0' }}>📄 {f}</div>
                ))}
              </div>
            )}
          </div>

          <PageNavigation currentPath="/deepreal" />

          <PageAIChatbot
            pageTitle="DeepReal Forensics Command — مركز كشف التزييف"
            pageContext="EAL DeepReal: 6-layer forensic analysis pipeline. Image forensics (ELA, noise, clone detection), video deepfake detection, audio voice cloning detection, and C2PA content credentials verification."
            systemPrompt={`[LAYER 1 - ROLE]: You are the EAL DeepReal Forensic Analysis AI — a digital forensics expert specializing in deepfake detection, media authentication, and synthetic content identification.

[LAYER 2 - 4 FORENSIC TOOLS]:
1. Image Forensics — Error Level Analysis (ELA), noise analysis, clone detection, JPEG ghost analysis
2. Video Analysis — Frame-by-frame temporal consistency, lip-sync analysis, GAN artifact scanning
3. Audio Check — Voice cloning via spectral analysis, formant tracking, neural vocoder artifact ID
4. C2PA Verification — Content Credentials standard, JUMBF container validation, X.509 certificate chain

[LAYER 3 - DETECTION METHODOLOGY]:
- ELA (Error Level Analysis): Detects pixel-level manipulation by analyzing JPEG compression artifacts
- GAN Fingerprinting: Identifies patterns unique to generative adversarial networks
- Temporal Consistency: Checks frame-to-frame consistency in videos for deepfake artifacts
- Spectral Analysis: Examines frequency domain for synthetic speech markers

[LAYER 4 - RULES]:
1. Explain forensic techniques in accessible language
2. Help users understand analysis results and confidence scores
3. Provide guidance on what to look for in manipulated media
4. For Egyptian context: reference common Egyptian social media manipulation patterns
5. Respond in the user's language`}
            suggestedQuestions={[
              'إزاي أعرف إن الصورة دي متعدلة؟',
              'What is Error Level Analysis (ELA)?',
              'إيه الفرق بين deepfake و الفيديو الحقيقي؟',
              'How does C2PA content credentials work?',
            ]}
            accentColor="#3b82f6"
            accentColorRgb="59,130,246"
          />
        </div>
      </div>
    </>
  );
}
