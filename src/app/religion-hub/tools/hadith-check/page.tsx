'use client';
/* ═══════════════════════════════════════════════════════════════
 * /religion-hub/tools/hadith-check — Hadith Authenticity Checker
 * Rebuilt with real hadith examples, premium UI, AI chatbot
 * ═══════════════════════════════════════════════════════════════ */

import { useState } from 'react';
import Link from 'next/link';
import { useRTL } from '@/components/shared/rtl-provider';
import { PageNavigation } from '@/components/shared/page-navigation';
import { PageAIChatbot } from '@/components/shared/page-ai-chatbot';

/* ── Types ─────────────────────────────────────────────────── */

interface NarratorChainAnalysis {
  chainSummary: string;
  weakLinks: string[];
  chainGrade: string;
}

interface ScholarOpinion {
  scholar: string;
  opinion: string;
  era: string;
}

interface HadithAnalysis {
  classification: 'Sahih' | 'Hasan' | "Da'if" | "Mawdu'";
  confidencePercent: number;
  sourceBook: string;
  hadithNumber: string;
  narratorChainAnalysis: NarratorChainAnalysis;
  scholarOpinions: ScholarOpinion[];
  textAnalysis: string;
  arabicClassification: string;
  recommendation: string;
}

/* ── Classification Badge Colors ───────────────────────────── */

const CLASSIFICATION_COLORS: Record<string, { bg: string; border: string; text: string }> = {
  Sahih: { bg: 'rgba(16, 185, 129, 0.12)', border: 'rgba(16, 185, 129, 0.4)', text: '#10b981' },
  Hasan: { bg: 'rgba(212, 168, 67, 0.12)', border: 'rgba(212, 168, 67, 0.4)', text: '#d4a843' },
  "Da'if": { bg: 'rgba(249, 115, 22, 0.12)', border: 'rgba(249, 115, 22, 0.4)', text: '#f97316' },
  "Mawdu'": { bg: 'rgba(239, 68, 68, 0.12)', border: 'rgba(239, 68, 68, 0.4)', text: '#ef4444' },
};

/* ── Main Page ─────────────────────────────────────────────── */

// ── Quick Example Hadiths ─────────────────────────────────────
const QUICK_EXAMPLES = [
  {
    labelAr: 'تداووا — الصحيح',
    labelEn: 'Seek Treatment (Authentic)',
    textAr: 'تداووا فإن الله لم يضع داءً إلا وضع له دواءً',
    expectedAr: 'صحيح — أبو داود ٣٨٥٥، الترمذي ٢٠٣٨',
    color: '#10b981'
  },
  {
    labelAr: 'اطلبوا العلم بالصين — موضوع',
    labelEn: 'Seek Knowledge in China (Fabricated)',
    textAr: 'اطلبوا العلم ولو بالصين',
    expectedAr: 'موضوع — لا أصل له في الكتب الستة',
    color: '#ef4444'
  },
  {
    labelAr: 'طلب العلم فريضة — حسن',
    labelEn: 'Seeking Knowledge is Obligatory (Hasan)',
    textAr: 'طلب العلم فريضة على كل مسلم',
    expectedAr: 'حسن — ابن ماجه ٢٢٤',
    color: '#d4a843'
  },
  {
    labelAr: 'لا ضرر ولا ضرار — حسن',
    labelEn: 'No Harm Shall Be Inflicted (Hasan)',
    textAr: 'لا ضرر ولا ضرار',
    expectedAr: 'حسن — ابن ماجه ٢٣٤٠، مالك في الموطأ',
    color: '#d4a843'
  },
  {
    labelAr: 'من بنى مسجداً — صحيح',
    labelEn: 'Whoever Builds a Mosque (Sahih)',
    textAr: 'من بنى مسجداً ولو كمفحص قطاة بنى الله له بيتاً في الجنة',
    expectedAr: 'صحيح — البخاري ٤٥٠، مسلم ٥٣٣',
    color: '#10b981'
  },
];

export default function HadithCheckPage() {
  const { isRTL, t } = useRTL();
  const [hadithText, setHadithText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<HadithAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!hadithText.trim()) return;
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch('/api/defense/hadith-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ hadithText: hadithText.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to check hadith');
      }

      setResult(data.analysis);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const classColors = result
    ? CLASSIFICATION_COLORS[result.classification] || CLASSIFICATION_COLORS["Da'if"]
    : null;

  return (
    <div className="hcheck-page" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Ambient */}
      <div className="hcheck-ambient" />

      {/* Navigation */}
      <nav className="hcheck-nav">
        <Link href="/religion-hub/tools" className="hcheck-back-link">
          <span>{isRTL ? '→' : '←'}</span>
          {t({ en: 'Back to Tools', ar: 'العودة إلى الأدوات' })}
        </Link>
      </nav>

      {/* Header */}
      <header className="hcheck-header">
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '5px 14px', borderRadius: 20, background: 'rgba(212,168,67,0.1)', border: '1px solid rgba(212,168,67,0.3)', marginBottom: 16 }}>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '2px', color: '#d4a843', textTransform: 'uppercase' }}>🕌 Islamic Forensics — التحقق الإسلامي</span>
        </div>
        <div className="hcheck-icon">📜</div>
        <h1 className="hcheck-title">
          {t({ en: 'Hadith Authenticator', ar: 'موثّق الأحاديث' })}
        </h1>
        <p className="hcheck-subtitle">
          {t({
            en: 'Isnad / Ilm al-Rijal',
            ar: 'الإسناد وعلم الرجال',
          })}
        </p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center', marginTop: 16 }}>
          {[{ label: 'صحيح', color: '#10b981', bg: 'rgba(16,185,129,0.1)' }, { label: 'حسن', color: '#d4a843', bg: 'rgba(212,168,67,0.1)' }, { label: 'ضعيف', color: '#f97316', bg: 'rgba(249,115,22,0.1)' }, { label: 'موضوع', color: '#ef4444', bg: 'rgba(239,68,68,0.1)' }].map(cls => (
            <span key={cls.label} style={{ padding: '4px 12px', borderRadius: 20, fontSize: 13, fontWeight: 700, background: cls.bg, color: cls.color, border: `1px solid ${cls.color}44` }}>{cls.label}</span>
          ))}
        </div>
      </header>

      {/* Quick Examples */}
      <div style={{ maxWidth: 700, margin: '0 auto 24px', padding: '0 1.5rem' }}>
        <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginBottom: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          {t({ en: '⚡ Quick Examples — Click to Test:', ar: '⚡ أمثلة سريعة — اضغط للاختبار:' })}
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {QUICK_EXAMPLES.map((ex, i) => (
            <button key={i} onClick={() => setHadithText(ex.textAr)}
              style={{ padding: '7px 14px', borderRadius: 12, fontSize: 13, cursor: 'pointer', background: ex.color + '15', border: `1px solid ${ex.color}44`, color: ex.color, fontWeight: 600, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', textAlign: 'right', direction: 'rtl' }}>
              <span>{isRTL ? ex.labelAr : ex.labelEn}</span>
              <span style={{ fontSize: 10, opacity: 0.7, fontWeight: 400 }}>{ex.expectedAr}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Input Section */}
      <section className="hcheck-input-section">
        <textarea
          className="hcheck-textarea"
          value={hadithText}
          onChange={(e) => setHadithText(e.target.value)}
          placeholder={t({
            en: 'Paste the hadith text here... (Arabic or English)',
            ar: 'الصق نص الحديث هنا... (عربي أو إنجليزي)',
          })}
          rows={5}
          maxLength={5000}
          dir="auto"
        />
        <div className="hcheck-input-footer">
          <span className="hcheck-char-count">
            {hadithText.length} / 5000
          </span>
          <button
            className="hcheck-submit-btn"
            onClick={handleSubmit}
            disabled={isLoading || !hadithText.trim()}
          >
            {isLoading ? (
              <span className="hcheck-spinner" />
            ) : (
              t({ en: 'Check Authenticity', ar: 'تحقق من الصحة' })
            )}
          </button>
        </div>
      </section>

      {/* Error Display */}
      {error && (
        <div className="hcheck-error">
          <span>⚠</span> {error}
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="hcheck-loading">
          <div className="hcheck-loading-dots">
            <span />
            <span />
            <span />
          </div>
          <p className="hcheck-loading-text">
            {t({
              en: 'Analyzing narrator chain and consulting scholarly sources...',
              ar: 'تحليل سلسلة الرواة واستشارة المصادر العلمية...',
            })}
          </p>
        </div>
      )}

      {/* Results */}
      {result && classColors && (
        <section className="hcheck-results" style={{ animationDelay: '0.1s' }}>
          {/* Classification Hero */}
          <div
            className="hcheck-class-hero"
            style={{
              '--cls-bg': classColors.bg,
              '--cls-border': classColors.border,
              '--cls-text': classColors.text,
            } as React.CSSProperties}
          >
            <div className="hcheck-class-badge">{result.classification}</div>
            <div className="hcheck-class-arabic">{result.arabicClassification}</div>
            <div className="hcheck-confidence">
              <div className="hcheck-confidence-bar">
                <div
                  className="hcheck-confidence-fill"
                  style={{ width: `${result.confidencePercent}%`, background: classColors.text }}
                />
              </div>
              <span className="hcheck-confidence-label">
                {result.confidencePercent}% {t({ en: 'confidence', ar: 'ثقة' })}
              </span>
            </div>
          </div>

          {/* Source Info */}
          <div className="hcheck-result-card">
            <h3 className="hcheck-result-heading">
              {t({ en: '📚 Source', ar: '📚 المصدر' })}
            </h3>
            <div className="hcheck-kv">
              <span className="hcheck-kv-label">{t({ en: 'Book:', ar: 'الكتاب:' })}</span>
              <span className="hcheck-kv-value">{result.sourceBook}</span>
            </div>
            <div className="hcheck-kv">
              <span className="hcheck-kv-label">{t({ en: 'Reference:', ar: 'المرجع:' })}</span>
              <span className="hcheck-kv-value">{result.hadithNumber}</span>
            </div>
          </div>

          {/* Narrator Chain */}
          <div className="hcheck-result-card">
            <h3 className="hcheck-result-heading">
              {t({ en: '🔗 Narrator Chain (Isnad)', ar: '🔗 سلسلة الرواة (الإسناد)' })}
            </h3>
            <p className="hcheck-result-text">{result.narratorChainAnalysis.chainSummary}</p>
            <div className="hcheck-kv">
              <span className="hcheck-kv-label">{t({ en: 'Chain Grade:', ar: 'تقدير السند:' })}</span>
              <span className="hcheck-kv-value">{result.narratorChainAnalysis.chainGrade}</span>
            </div>
            {result.narratorChainAnalysis.weakLinks.length > 0 && (
              <div className="hcheck-weak-links">
                <span className="hcheck-kv-label">
                  {t({ en: 'Weak Links:', ar: 'الحلقات الضعيفة:' })}
                </span>
                <div className="hcheck-tags">
                  {result.narratorChainAnalysis.weakLinks.map((link, i) => (
                    <span key={i} className="hcheck-tag hcheck-tag--warn">{link}</span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Text Analysis */}
          <div className="hcheck-result-card">
            <h3 className="hcheck-result-heading">
              {t({ en: '📝 Text Analysis (Matn)', ar: '📝 تحليل المتن' })}
            </h3>
            <p className="hcheck-result-text">{result.textAnalysis}</p>
          </div>

          {/* Scholar Opinions */}
          <div className="hcheck-result-card">
            <h3 className="hcheck-result-heading">
              {t({ en: '🎓 Scholar Opinions', ar: '🎓 آراء العلماء' })}
            </h3>
            <div className="hcheck-scholars-grid">
              {result.scholarOpinions.map((op, i) => (
                <div key={i} className="hcheck-scholar-card">
                  <div className="hcheck-scholar-name">{op.scholar}</div>
                  <div className="hcheck-scholar-era">{op.era}</div>
                  <p className="hcheck-scholar-opinion">{op.opinion}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Recommendation */}
          <div className="hcheck-result-card hcheck-recommendation">
            <h3 className="hcheck-result-heading">
              {t({ en: '💡 Recommendation', ar: '💡 التوصية' })}
            </h3>
            <p className="hcheck-result-text">{result.recommendation}</p>
          </div>
        </section>
      )}

      {/* Scoped Styles */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@300;
400;500;600;700&family=Inter:wght@300;400;500;600;700;800&display=swap');

        .hcheck-page {
          position: relative;
          min-height: 100vh;
          background: #050510;
          color: #e0e0e0;
          font-family: 'Inter', sans-serif;
          overflow-x: hidden;
          padding-bottom: 4rem;
        }
        [dir="rtl"] .hcheck-page {
          font-family: 'IBM Plex Sans Arabic', 'Inter', sans-serif;
        }

        .hcheck-ambient {
          position: fixed; inset: 0;
          background: radial-gradient(ellipse at 50% 0%, rgba(212, 168, 67, 0.05) 0%, transparent 50%);
          pointer-events: none; z-index: 0;
        }

        /* ── Nav ─────────────────────────────────────────── */
        .hcheck-nav { position: relative; z-index: 10; padding: 1.5rem 2rem; }
        .hcheck-back-link {
          display: inline-flex; align-items: center; gap: 0.5rem;
          color: rgba(255,255,255,0.5); text-decoration: none;
          font-size: 0.875rem; font-weight: 500; transition: color 0.3s;
        }
        .hcheck-back-link:hover { color: #d4a843; }

        /* ── Header ──────────────────────────────────────── */
        .hcheck-header {
          position: relative; z-index: 10;
          text-align: center; padding: 1rem 2rem 2rem;
          max-width: 650px; margin: 0 auto;
          animation: hcheck-fadeUp 0.8s ease-out;
        }
        .hcheck-icon { font-size: 3rem; margin-bottom: 1rem; }
        .hcheck-title {
          font-size: clamp(1.6rem, 4vw, 2.2rem);
          font-weight: 800; color: #fff; margin: 0 0 0.75rem;
          background: linear-gradient(135deg, #fff 30%, #d4a843);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .hcheck-subtitle {
          font-size: 0.95rem; line-height: 1.7; color: rgba(255,255,255,0.5);
        }

        /* ── Input Section ───────────────────────────────── */
        .hcheck-input-section {
          position: relative; z-index: 10;
          max-width: 700px; margin: 0 auto; padding: 0 1.5rem;
        }
        .hcheck-textarea {
          width: 100%; box-sizing: border-box;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(212, 168, 67, 0.15);
          border-radius: 14px;
          padding: 1.25rem;
          color: #e0e0e0;
          font-size: 1rem; line-height: 1.8;
          font-family: inherit;
          resize: vertical;
          transition: border-color 0.3s;
          min-height: 120px;
        }
        .hcheck-textarea:focus {
          outline: none;
          border-color: rgba(212, 168, 67, 0.4);
          box-shadow: 0 0 20px rgba(212, 168, 67, 0.05);
        }
        .hcheck-textarea::placeholder { color: rgba(255,255,255,0.25); }
        .hcheck-input-footer {
          display: flex; justify-content: space-between; align-items: center;
          margin-top: 0.75rem;
        }
        .hcheck-char-count {
          font-size: 0.75rem; color: rgba(255,255,255,0.25);
          font-family: 'Inter', monospace;
        }
        .hcheck-submit-btn {
          display: inline-flex; align-items: center; justify-content: center;
          min-width: 170px; height: 44px;
          background: linear-gradient(135deg, rgba(212, 168, 67, 0.2), rgba(212, 168, 67, 0.05));
          border: 1px solid rgba(212, 168, 67, 0.3);
          border-radius: 999px;
          color: #d4a843; font-weight: 600; font-size: 0.9rem;
          cursor: pointer; transition: all 0.3s;
          font-family: inherit;
        }
        .hcheck-submit-btn:hover:not(:disabled) {
          background: rgba(212, 168, 67, 0.2);
          box-shadow: 0 0 30px rgba(212, 168, 67, 0.15);
          transform: translateY(-1px);
        }
        .hcheck-submit-btn:disabled {
          opacity: 0.4; cursor: not-allowed;
        }

        /* Spinner */
        .hcheck-spinner {
          display: inline-block; width: 18px; height: 18px;
          border: 2px solid rgba(212, 168, 67, 0.2);
          border-top-color: #d4a843;
          border-radius: 50%;
          animation: hcheck-spin 0.8s linear infinite;
        }
        @keyframes hcheck-spin { to { transform: rotate(360deg); } }

        /* ── Error ───────────────────────────────────────── */
        .hcheck-error {
          position: relative; z-index: 10;
          max-width: 700px; margin: 1rem auto; padding: 0.75rem 1rem;
          background: rgba(239, 68, 68, 0.08);
          border: 1px solid rgba(239, 68, 68, 0.25);
          border-radius: 10px;
          color: #ef4444; font-size: 0.9rem;
          display: flex; align-items: center; gap: 0.5rem;
          margin-left: 1.5rem; margin-right: 1.5rem;
        }

        /* ── Loading ─────────────────────────────────────── */
        .hcheck-loading {
          position: relative; z-index: 10;
          text-align: center; padding: 2rem;
          animation: hcheck-fadeUp 0.5s ease-out;
        }
        .hcheck-loading-dots {
          display: flex; gap: 6px; justify-content: center; margin-bottom: 1rem;
        }
        .hcheck-loading-dots span {
          width: 8px; height: 8px; border-radius: 50%;
          background: #d4a843;
          animation: hcheck-bounce 1.4s ease-in-out infinite;
        }
        .hcheck-loading-dots span:nth-child(2) { animation-delay: 0.2s; }
        .hcheck-loading-dots span:nth-child(3) { animation-delay: 0.4s; }
        @keyframes hcheck-bounce {
          0%, 80%, 100% { transform: scale(0.6); opacity: 0.3; }
          40% { transform: scale(1); opacity: 1; }
        }
        .hcheck-loading-text {
          color: rgba(255,255,255,0.4); font-size: 0.9rem;
        }

        /* ── Results ─────────────────────────────────────── */
        .hcheck-results {
          position: relative; z-index: 10;
          max-width: 700px; margin: 2rem auto; padding: 0 1.5rem;
          display: flex; flex-direction: column; gap: 1rem;
          animation: hcheck-fadeUp 0.6s ease-out backwards;
        }

        /* Classification Hero */
        .hcheck-class-hero {
          text-align: center;
          background: var(--cls-bg);
          border: 1px solid var(--cls-border);
          border-radius: 16px;
          padding: 2rem;
        }
        .hcheck-class-badge {
          font-size: 2rem; font-weight: 800;
          color: var(--cls-text);
          margin-bottom: 0.25rem;
        }
        .hcheck-class-arabic {
          font-size: 1.3rem; font-weight: 600;
          color: var(--cls-text); opacity: 0.7;
          margin-bottom: 1rem;
          font-family: 'IBM Plex Sans Arabic', sans-serif;
        }
        .hcheck-confidence {
          display: flex; align-items: center; gap: 0.75rem;
          max-width: 300px; margin: 0 auto;
        }
        .hcheck-confidence-bar {
          flex: 1; height: 6px;
          background: rgba(255,255,255,0.08);
          border-radius: 3px; overflow: hidden;
        }
        .hcheck-confidence-fill {
          height: 100%; border-radius: 3px;
          transition: width 0.8s ease-out;
        }
        .hcheck-confidence-label {
          font-size: 0.8rem; color: rgba(255,255,255,0.4);
          white-space: nowrap;
        }

        /* Result Cards */
        .hcheck-result-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(212, 168, 67, 0.1);
          border-radius: 14px;
          padding: 1.25rem;
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }
        .hcheck-result-heading {
          font-size: 1rem; font-weight: 700;
          color: #d4a843; margin: 0 0 0.75rem;
        }
        .hcheck-result-text {
          font-size: 0.9rem; line-height: 1.8;
          color: rgba(255,255,255,0.6); margin: 0;
        }
        .hcheck-kv {
          display: flex; gap: 0.5rem; margin-bottom: 0.4rem;
          font-size: 0.88rem;
        }
        .hcheck-kv-label {
          font-weight: 600; color: rgba(255,255,255,0.5);
          white-space: nowrap;
        }
        .hcheck-kv-value { color: rgba(255,255,255,0.75); }
        .hcheck-weak-links { margin-top: 0.75rem; }
        .hcheck-tags { display: flex; gap: 0.5rem; flex-wrap: wrap; margin-top: 0.4rem; }
        .hcheck-tag {
          font-size: 0.75rem; font-weight: 600;
          padding: 0.25rem 0.6rem; border-radius: 6px;
        }
        .hcheck-tag--warn {
          background: rgba(249, 115, 22, 0.1);
          border: 1px solid rgba(249, 115, 22, 0.25);
          color: #f97316;
        }

        /* Scholars Grid */
        .hcheck-scholars-grid {
          display: grid; gap: 0.75rem;
        }
        .hcheck-scholar-card {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 10px;
          padding: 0.75rem 1rem;
        }
        .hcheck-scholar-name {
          font-size: 0.9rem; font-weight: 600; color: #fff;
        }
        .hcheck-scholar-era {
          font-size: 0.72rem; color: rgba(255,255,255,0.3);
          margin-bottom: 0.4rem;
        }
        .hcheck-scholar-opinion {
          font-size: 0.85rem; line-height: 1.6;
          color: rgba(255,255,255,0.55); margin: 0;
        }

        /* Recommendation */
        .hcheck-recommendation {
          border-color: rgba(16, 185, 129, 0.15);
          background: rgba(16, 185, 129, 0.04);
        }
        .hcheck-recommendation .hcheck-result-heading {
          color: #10b981;
        }

        @keyframes hcheck-fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 640px) {
          .hcheck-header { padding: 1rem 1rem 1.5rem; }
          .hcheck-input-section { padding: 0 1rem; }
          .hcheck-results { padding: 0 1rem; }
          .hcheck-input-footer { flex-direction: column; gap: 0.75rem; align-items: stretch; }
          .hcheck-submit-btn { width: 100%; }
        }
      `}</style>
      <div style={{ maxWidth: 700, margin: '0 auto', padding: '0 1.5rem 4rem' }}>
        <PageNavigation currentPath="/religion-hub/tools/hadith-check" />
      </div>

      <PageAIChatbot
        pageTitle="Hadith Checker — مدقق الأحاديث"
        pageContext="Egyptian Awareness Library - Hadith Authenticity Checker. Verifies hadiths using classical Hadith Sciences: isnad (chain) analysis, narrator reliability grading from al-Jarh wal-Tadil, classical scholar opinions (Ibn Hajar, Nawawi, Albani, Ibn al-Jawzi), Maqasid assessment, and manipulation warning if hadith is commonly misused."
        systemPrompt={`You are the EAL Hadith Authentication Engine — an expert in Hadith Sciences (Mustalah al-Hadith).

KNOWLEDGE BASE:
- Kutub al-Sitta: Bukhari, Muslim, Abu Dawud, Tirmidhi, Ibn Majah, Nasai
- Additional: Musnad Ahmad, Malik's Muwatta, Bayhaqi, Ibn Hibban, Tabarani
- Rijal science: al-Jarh wal-Tadil grades for narrator reliability
- Classical scholars: Ibn Hajar al-Asqalani (Fath al-Bari), Imam Nawawi (al-Majmu'), Sheikh Albani (Silsila), Ibn al-Jawzi (al-Mawduʿat)

FOR EVERY HADITH:
1. State CLASSIFICATION in Arabic and English:
   - صحيح (Sahih): All narrators reliable, unbroken chain
   - حسن (Hasan): Narrators acceptable, slight weakness
   - ضعيف (Daʿif): Weak narrator or broken chain
   - موضوع (Mawduʿ): Fabricated — never attributed to Prophet ﷺ

2. Give EXACT SOURCE: Book name, chapter (bab), hadith number
   Example: "صحيح البخاري، كتاب الطب، حديث رقم ٥٦٧٨"

3. ISNAD ANALYSIS: Name the key narrators in the chain and their reliability grade
   Example: "الإسناد: النبي ﷺ ← أبو هريرة (ثقة) ← الزهري (ثقة ثبت) ← مالك (إمام)"

4. SCHOLAR OPINIONS (cite at least 2):
   - Ibn Hajar al-Asqalani (773-852 AH)
   - Imam al-Nawawi (631-676 AH)
   - Sheikh Nasiruddin al-Albani (1914-1999)
   - Ibn al-Jawzi (510-597 AH) for fabricated hadiths

5. MAQASID ASSESSMENT: Which of the 5 Maqasid does this hadith protect?
   - حفظ الدين (Faith), حفظ النفس (Life), حفظ العقل (Intellect), حفظ النسل (Lineage), حفظ المال (Property)

6. MANIPULATION WARNING: Is this hadith commonly taken out of context or weaponized?
   Example: 'تداووا' is used to permit any medicine including haram — correct: it permits halal medicine only

FOLLOW:
- Amman Message 2004 standards (no extremist interpretation)
- Mainstream Sunni scholarship
- NEVER fabricate hadith numbers or attributes
- If uncertain: say "يحتاج تحقق" (needs verification) explicitly`}
        suggestedQuestions={[
          'هل حديث "اطلبوا العلم ولو بالصين" صحيح؟',
          'ما حكم حديث "تداووا" وكيف يُساء استخدامه؟',
          'كيف يمكنني معرفة إذا كان الحديث مكذوباً؟',
          'What is the authentic hadith on seeking knowledge?',
        ]}
        accentColor="#d4a843"
        accentColorRgb="212,168,67"
      />
    </div>
  );
}
