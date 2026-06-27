'use client';
import React, { useState, useCallback } from 'react';
import Link from 'next/link';
import { PageNavigation } from '@/components/shared/page-navigation';
import { PageAIChatbot } from '@/components/shared/page-ai-chatbot';

const supportedFormats = [
  { ext: 'JPG', icon: '🖼️', desc: 'JPEG Images', color: '#3b82f6' },
  { ext: 'PNG', icon: '🎨', desc: 'PNG Images', color: '#8b5cf6' },
  { ext: 'MP4', icon: '🎬', desc: 'Video Files', color: '#ef4444' },
  { ext: 'WAV', icon: '🎙️', desc: 'Audio Files', color: '#f59e0b' },
  { ext: 'PDF', icon: '📄', desc: 'Documents', color: '#10b981' },
];

interface QueuedFile {
  name: string;
  size: string;
  type: string;
  status: 'queued' | 'analyzing' | 'complete' | 'error';
  progress: number;
  result?: string;
  confidence?: number;
}

export default function DeepRealUploadPage() {
  const [dragActive, setDragActive] = useState(false);
  const [queue, setQueue] = useState<QueuedFile[]>([]);
  const [borderPhase, setBorderPhase] = useState(0);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    const interval = setInterval(() => setBorderPhase(p => (p + 1) % 360), 30);
    return () => clearInterval(interval);
  }, []);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') setDragActive(true);
    else if (e.type === 'dragleave') setDragActive(false);
  }, []);

  const analyzeFile = useCallback(async (file: File) => {
    const name = file.name;
    const sizeStr = file.size > 1024 * 1024
      ? `${(file.size / (1024 * 1024)).toFixed(1)} MB`
      : `${(file.size / 1024).toFixed(1)} KB`;
    const ext = name.split('.').pop()?.toUpperCase() || 'FILE';

    const newFile: QueuedFile = { name, size: sizeStr, type: ext, status: 'queued', progress: 0 };
    setQueue(prev => [...prev, newFile]);

    // Start analyzing
    setTimeout(() => {
      setQueue(prev => prev.map(f => f.name === name && f.status === 'queued' ? { ...f, status: 'analyzing', progress: 30 } : f));
    }, 300);

    try {
      const formData = new FormData();
      formData.append('file', file);

      // Update progress
      setTimeout(() => {
        setQueue(prev => prev.map(f => f.name === name && f.status === 'analyzing' ? { ...f, progress: 60 } : f));
      }, 1500);

      const res = await fetch('/api/forensic/image', { method: 'POST', body: formData });
      const data = await res.json();

      if (data.error) {
        setQueue(prev => prev.map(f => f.name === name ? { ...f, status: 'error', progress: 100, result: 'Error: ' + data.error, confidence: 0 } : f));
        return;
      }

      const verdict = data.isManipulated ? 'Manipulated' : data.confidence > 30 ? 'Suspicious' : 'Authentic';
      setQueue(prev => prev.map(f => f.name === name ? {
        ...f, status: 'complete', progress: 100,
        result: verdict,
        confidence: 100 - (data.confidence || 0), // Flip: API gives manipulation %, we show authenticity %
      } : f));

    } catch (err) {
      console.error('Analysis error:', err);
      setQueue(prev => prev.map(f => f.name === name ? { ...f, status: 'error', progress: 100, result: 'Connection failed', confidence: 0 } : f));
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    Array.from(e.dataTransfer.files).forEach(f => analyzeFile(f));
  }, [analyzeFile]);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      Array.from(e.target.files).forEach(f => analyzeFile(f));
    }
  }, [analyzeFile]);

  const getStatusColor = (status: string) => {
    if (status === 'complete') return '#10b981';
    if (status === 'analyzing') return '#3b82f6';
    if (status === 'error') return '#ef4444';
    return '#64748b';
  };

  const getResultColor = (result?: string) => {
    if (result === 'Authentic') return '#10b981';
    if (result === 'Manipulated' || result === 'AI-Generated') return '#ef4444';
    return '#f59e0b';
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Cairo:wght@400;600;700;800&display=swap');
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulse { 0%, 100% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.05); opacity: 0.8; } }
        @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
        @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-10px); } }
        .upload-format:hover { transform: translateY(-4px) !important; box-shadow: 0 8px 30px rgba(0,0,0,0.3) !important; }
        .queue-item:hover { background: rgba(59,130,246,0.06) !important; }
      `}</style>
      <div style={{
        minHeight: '100vh', background: '#020617', fontFamily: "'Inter', sans-serif",
        color: '#e2e8f0', position: 'relative', overflow: 'hidden',
      }}>
        {/* Background effects */}
        <div style={{ position: 'fixed', top: '10%', left: '5%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(59,130,246,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'fixed', bottom: '10%', right: '5%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(139,92,246,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 24px', position: 'relative', zIndex: 2 }}>
          {/* Hidden File Input */}
          <input ref={fileInputRef} type="file" multiple accept="image/*,video/*,audio/*,.pdf" onChange={handleFileInput} style={{ display: 'none' }} />
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '48px', animation: 'fadeInUp 0.5s ease' }}>
            <div style={{ display: 'inline-block', padding: '5px 16px', borderRadius: '16px', marginBottom: '16px', background: 'rgba(59,130,246,0.15)', border: '1px solid rgba(59,130,246,0.3)', fontSize: '12px', fontWeight: 600, color: '#60a5fa', letterSpacing: '2px', textTransform: 'uppercase' }}>
              Direct Media Upload
            </div>
            <h1 style={{ fontSize: '46px', fontWeight: 900, margin: '0 0 8px 0', background: 'linear-gradient(135deg, #3b82f6, #06b6d4, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Media Upload Analyzer
            </h1>
            <p style={{ fontFamily: "'Cairo', sans-serif", fontSize: '20px', color: '#94a3b8', direction: 'rtl' as const, margin: '0 0 8px 0' }}>
              ارفع ملفاتك للتحقق الفوري
            </p>
            <p style={{ color: '#64748b', fontSize: '14px', maxWidth: '500px', margin: '0 auto' }}>
              Drag and drop any media file for instant deepfake analysis through our 6-layer forensic pipeline.
            </p>
            <Link href="/explore" style={{ display: 'inline-block', marginTop: '12px', color: '#60a5fa', fontSize: '14px', textDecoration: 'none' }}>← Back to Explore</Link>
          </div>

          {/* Main Drop Zone */}
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={handleClick}
            style={{
              position: 'relative', borderRadius: '20px', padding: '4px', marginBottom: '32px',
              background: `linear-gradient(${borderPhase}deg, #3b82f6, #8b5cf6, #06b6d4, #10b981, #3b82f6)`,
              backgroundSize: '300% 300%',
              animation: 'fadeInUp 0.6s ease',
              cursor: 'pointer',
            }}
          >
            <div style={{
              borderRadius: '18px', padding: '80px 40px', textAlign: 'center',
              background: dragActive ? 'rgba(15,23,42,0.9)' : '#020617',
              transition: 'all 0.3s',
            }}>
              <div style={{ fontSize: '64px', marginBottom: '20px', animation: 'float 3s ease infinite' }}>
                {dragActive ? '📥' : '☁️'}
              </div>
              <h2 style={{ fontSize: '26px', fontWeight: 800, margin: '0 0 8px 0', color: '#f1f5f9' }}>
                {dragActive ? 'Release to Upload' : 'Drop Files Here'}
              </h2>
              <p style={{ fontFamily: "'Cairo', sans-serif", fontSize: '18px', color: '#94a3b8', direction: 'rtl' as const, margin: '0 0 16px 0' }}>
                أو انقر لاختيار الملفات
              </p>
              <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '4px' }}>
                or click anywhere in this zone to select files
              </p>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '6px 16px',
                borderRadius: '8px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)',
                marginTop: '12px',
              }}>
                <span style={{ color: '#ef4444', fontSize: '13px', fontWeight: 600 }}>⚠️ Maximum file size: 50 MB</span>
              </div>
            </div>
          </div>

          {/* Supported Formats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '12px', marginBottom: '32px', animation: 'fadeInUp 0.7s ease' }}>
            {supportedFormats.map(fmt => (
              <div key={fmt.ext} className="upload-format" style={{
                background: 'rgba(15,23,42,0.8)', backdropFilter: 'blur(12px)',
                border: `1px solid ${fmt.color}30`, borderRadius: '12px', padding: '20px 12px',
                textAlign: 'center', transition: 'all 0.3s',
              }}>
                <div style={{ fontSize: '28px', marginBottom: '8px' }}>{fmt.icon}</div>
                <div style={{ fontSize: '16px', fontWeight: 800, color: fmt.color }}>.{fmt.ext}</div>
                <div style={{ fontSize: '11px', color: '#64748b', marginTop: '4px' }}>{fmt.desc}</div>
              </div>
            ))}
          </div>

          {/* Analysis Queue */}
          <div style={{
            background: 'rgba(15,23,42,0.8)', backdropFilter: 'blur(12px)',
            border: '1px solid rgba(59,130,246,0.15)', borderRadius: '16px',
            padding: '28px', animation: 'fadeInUp 0.8s ease',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 700, margin: '0 0 4px 0', color: '#f1f5f9' }}>📋 Analysis Queue</h3>
                <p style={{ fontFamily: "'Cairo', sans-serif", fontSize: '13px', color: '#64748b', margin: 0, direction: 'rtl' as const }}>قائمة انتظار التحليل</p>
              </div>
              {queue.length > 0 && (
                <span style={{ fontSize: '12px', color: '#64748b', padding: '4px 12px', background: 'rgba(59,130,246,0.1)', borderRadius: '8px' }}>
                  {queue.filter(f => f.status === 'complete').length}/{queue.length} complete
                </span>
              )}
            </div>

            {queue.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <div style={{ fontSize: '40px', marginBottom: '12px', opacity: 0.3 }}>📭</div>
                <div style={{ color: '#64748b', fontSize: '14px' }}>No files in queue — upload files to begin analysis</div>
                <div style={{ fontFamily: "'Cairo', sans-serif", color: '#475569', fontSize: '13px', marginTop: '4px', direction: 'rtl' as const }}>لا توجد ملفات — ارفع ملفات لبدء التحليل</div>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {queue.map((file, i) => (
                  <div key={i} className="queue-item" style={{
                    display: 'flex', alignItems: 'center', gap: '16px',
                    padding: '14px 16px', borderRadius: '10px',
                    border: '1px solid rgba(100,116,139,0.1)', transition: 'background 0.2s',
                  }}>
                    <div style={{ fontSize: '24px' }}>
                      {file.status === 'complete' ? '✅' : file.status === 'analyzing' ? '⏳' : '📄'}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                        <span style={{ fontSize: '14px', fontWeight: 600, color: '#e2e8f0' }}>{file.name}</span>
                        <span style={{ fontSize: '12px', color: '#64748b' }}>{file.size}</span>
                      </div>
                      {/* Progress bar */}
                      <div style={{ height: '4px', background: 'rgba(30,41,59,0.8)', borderRadius: '2px', overflow: 'hidden' }}>
                        <div style={{
                          width: `${file.progress}%`, height: '100%', borderRadius: '2px',
                          background: file.status === 'complete'
                            ? (file.result === 'Authentic' ? '#10b981' : file.result === 'Inconclusive' ? '#f59e0b' : '#ef4444')
                            : 'linear-gradient(90deg, #3b82f6, #8b5cf6)',
                          backgroundSize: file.status === 'analyzing' ? '200% 100%' : '100% 100%',
                          animation: file.status === 'analyzing' ? 'shimmer 1.5s infinite' : 'none',
                          transition: 'width 0.5s ease',
                        }} />
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
                        <span style={{ fontSize: '11px', color: getStatusColor(file.status), fontWeight: 600, textTransform: 'uppercase' }}>
                          {file.status === 'analyzing' ? '⟳ Analyzing...' : file.status}
                        </span>
                        {file.result && (
                          <Link href="/deepreal-forensics" style={{
                            fontSize: '11px', color: getResultColor(file.result), fontWeight: 700, textDecoration: 'none',
                          }}>
                            {file.result} ({file.confidence}%) — View Details →
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <PageNavigation currentPath="/deepreal" />
        </div>
      </div>

      <PageAIChatbot
        pageTitle="DeepReal Upload — التحقق الجنائي للوسائط"
        pageContext="Egyptian Awareness Library - DeepReal Media Upload: Drag-and-drop media verification using real forensic analysis (EXIF extraction, JPEG compression analysis, AI Vision via NVIDIA NIM + Gemini). Supports JPG, PNG, MP4, WAV, PDF."
        systemPrompt={`[LAYER 1 - ROLE]: You are the EAL DeepReal Forensic Media Analyst — an expert in digital media authentication and deepfake detection.

[LAYER 2 - EXPERTISE]:
- EXIF/metadata forensics (camera model, GPS, timestamps, software traces)
- JPEG compression analysis (quantization tables, double-compression detection)
- Error Level Analysis (ELA) for detecting edited regions
- Frequency domain analysis for GAN/diffusion model detection
- rPPG (Remote Photoplethysmography) for video deepfake detection
- C2PA content credentials verification
- Clone detection (SIFT/SURF keypoint matching)

[LAYER 3 - EGYPTIAN CONTEXT]:
- WhatsApp group viral images are typically stripped of EXIF (red flag if EXIF is present on a 'WhatsApp screenshot')
- Common Egyptian misinfo: decontextualized protest photos, fake government announcements, fabricated celebrity endorsements
- Screenshot manipulation is rampant in Egyptian social media disputes

[LAYER 4 - ISLAMIC VERIFICATION]:
- Quran 49:6 (Al-Hujurat): 'يا أيها الذين آمنوا إن جاءكم فاسق بنبأ فتبينوا' — VERIFY before spreading
- Hadith: 'كفى بالمرء كذباً أن يحدث بكل ما سمع' (صحيح مسلم) — spreading unverified media = lying

[LAYER 5 - RULES]:
1. Explain forensic findings in simple terms for non-technical users
2. For every finding: explain WHAT was found, WHY it matters, and HOW CONFIDENT the result is
3. Always distinguish between 'suspicious' and 'confirmed manipulation'
4. Respond in the language the user writes in
5. Cite specific techniques and their limitations honestly`}
        suggestedQuestions={[
          'إزاي أعرف الصورة دي متعدلة؟',
          'What does double JPEG compression mean?',
          'How to detect AI-generated faces?',
          'ليه صور الواتساب مش فيها EXIF؟',
        ]}
        accentColor="#3b82f6"
        accentColorRgb="59,130,246"
      />
    </>
  );
}
