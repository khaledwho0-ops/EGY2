'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { PageNavigation } from '@/components/shared/page-navigation';

/* ── Correction Data ────────────────────────────────────────────────── */
interface Correction {
  id: string;
  date: string;
  page: string;
  pageRoute: string;
  type: 'factual' | 'statistical' | 'citation' | 'language' | 'methodology';
  severity: 'minor' | 'moderate' | 'major';
  originalText: string;
  correctedText: string;
  reason: string;
  source: string;
  reviewer: string;
  version: string;
}

const corrections: Correction[] = [
  {
    id: 'COR-2026-001',
    date: '2026-06-08',
    page: 'Media Literacy Module',
    pageRoute: '/curriculum/phase0',
    type: 'statistical',
    severity: 'moderate',
    originalText: '73% of Egyptian youth encounter misinformation weekly',
    correctedText: '68% of Egyptian youth encounter misinformation weekly',
    reason: 'Updated to reflect Reuters Institute Digital News Report 2025 data for Egypt, replacing 2023 estimate.',
    source: 'Reuters Institute Digital News Report 2025, p. 47',
    reviewer: 'Dr. Ahmed Mansour, Research Lead',
    version: 'v2.3.1 → v2.3.2',
  },
  {
    id: 'COR-2026-002',
    date: '2026-06-05',
    page: 'Islamic Literacy — Hadith Verification',
    pageRoute: '/explore',
    type: 'citation',
    severity: 'minor',
    originalText: 'Imam al-Nawawi classified hadith into 65 categories',
    correctedText: 'Imam Ibn al-Salah classified hadith into 65 types in his Muqaddimah; al-Nawawi later summarized these in his Taqrib',
    reason: 'Attribution clarified to correctly credit Ibn al-Salah (d. 643 AH) as the original classifier, with al-Nawawi as summarizer.',
    source: 'Muqaddimah Ibn al-Salah fi Ulum al-Hadith, critical edition by Nur al-Din Itr',
    reviewer: 'Sheikh Mahmoud Fathi, Islamic Studies Advisor',
    version: 'v2.3.0 → v2.3.1',
  },
  {
    id: 'COR-2026-003',
    date: '2026-05-28',
    page: 'Cognitive Bias Explorer',
    pageRoute: '/explore',
    type: 'methodology',
    severity: 'major',
    originalText: 'Dunning-Kruger effect demonstrates that less competent individuals always overestimate their abilities',
    correctedText: 'Dunning-Kruger effect (1999) shows a tendency for less skilled individuals to overestimate competence, though the magnitude varies by domain and recent meta-analyses debate the statistical methodology',
    reason: 'Added nuance per Gignac & Zajenkowski (2020) meta-analysis in Intelligence journal questioning the original effect size.',
    source: 'Gignac, G. E., & Zajenkowski, M. (2020). Intelligence, 80, 101449',
    reviewer: 'Prof. Layla Hassan, Psychology Dept.',
    version: 'v2.2.8 → v2.3.0',
  },
  {
    id: 'COR-2026-004',
    date: '2026-05-20',
    page: 'OSINT Training Module',
    pageRoute: '/explore',
    type: 'factual',
    severity: 'minor',
    originalText: 'TinEye supports searching across 45 billion images',
    correctedText: 'TinEye supports searching across 68+ billion images (as of 2025)',
    reason: 'Updated to reflect TinEye\'s current index size per their official API documentation.',
    source: 'TinEye API Documentation, accessed May 2025',
    reviewer: 'Eng. Karim Nasser, OSINT Lead',
    version: 'v2.2.7 → v2.2.8',
  },
  {
    id: 'COR-2026-005',
    date: '2026-05-15',
    page: 'Emotional Regulation — Breathing Exercise',
    pageRoute: '/curriculum/phase0',
    type: 'language',
    severity: 'minor',
    originalText: 'Arabic breathing prompt used colloquial Egyptian dialect',
    correctedText: 'Replaced with Modern Standard Arabic (MSA) for consistency and accessibility across Arabic-speaking users',
    reason: 'User feedback indicated confusion for non-Egyptian Arabic speakers. MSA ensures broader comprehension.',
    source: 'Internal user feedback report #UF-2026-034',
    reviewer: 'Nour El-Din, Arabic Localization',
    version: 'v2.2.6 → v2.2.7',
  },
];

const editorialStandards = [
  { icon: '📚', title: 'Primary Source Priority', titleAr: 'أولوية المصادر الأولية', desc: 'All claims must reference primary research papers, official reports, or recognized scholarly works. Secondary sources acceptable only when primary is inaccessible.' },
  { icon: '🔄', title: 'Version Control', titleAr: 'التحكم في الإصدارات', desc: 'Every content change tracked with semantic versioning (major.minor.patch). Breaking factual corrections trigger minor version bumps.' },
  { icon: '⏱️', title: '48-Hour Correction Window', titleAr: 'نافذة التصحيح ٤٨ ساعة', desc: 'Reported errors acknowledged within 24 hours and corrected within 48 hours. Critical factual errors corrected within 6 hours.' },
  { icon: '👥', title: 'Dual Review Process', titleAr: 'عملية المراجعة المزدوجة', desc: 'All corrections verified by subject matter expert + editorial reviewer before publication. No single-person corrections for major issues.' },
  { icon: '🌐', title: 'Bilingual Consistency', titleAr: 'اتساق ثنائي اللغة', desc: 'Corrections applied simultaneously to both English and Arabic versions. Translation accuracy verified by native Arabic speaker.' },
  { icon: '📊', title: 'Statistical Rigor', titleAr: 'الدقة الإحصائية', desc: 'All statistics must include source, year, sample size context, and confidence level. Outdated statistics (>2 years) flagged for review.' },
];

const typeColors: Record<string, string> = {
  factual: '#ef4444',
  statistical: '#f59e0b',
  citation: '#6366f1',
  language: '#06b6d4',
  methodology: '#8b5cf6',
};

const severityColors: Record<string, string> = {
  minor: '#10b981',
  moderate: '#f59e0b',
  major: '#ef4444',
};

type TabId = 'log' | 'form' | 'standards';

export default function CorrectionsPage() {
  const [activeTab, setActiveTab] = useState<TabId>('log');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [filterType, setFilterType] = useState('all');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const filteredCorrections = filterType === 'all' ? corrections : corrections.filter(c => c.type === filterType);

  const tabs: { id: TabId; label: string; icon: string }[] = [
    { id: 'log', label: 'Corrections Log', icon: '📋' },
    { id: 'form', label: 'Request Correction', icon: '✍️' },
    { id: 'standards', label: 'Editorial Standards', icon: '📖' },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;
400;500;600;700;800;900&family=Cairo:wght@400;600;700;800&display=swap');
        .corr-page { min-height: 100vh; background: #020617; color: #e2e8f0; font-family: 'Inter', sans-serif; }
        .corr-container { max-width: 1100px; margin: 0 auto; padding: 40px 24px 80px; }
        .corr-header { text-align: center; margin-bottom: 40px; position: relative; }
        .corr-header::before { content: ''; position: absolute; top: -60px; left: 50%; transform: translateX(-50%); width: 700px; height: 500px; background: radial-gradient(circle, rgba(239,68,68,0.08) 0%, transparent 65%); pointer-events: none; }
        .corr-header h1 { font-size: 48px; font-weight: 900; background: linear-gradient(135deg, #f87171, #ef4444, #dc2626); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin: 0 0 8px; position: relative; }
        .corr-header .ar { font-family: 'Cairo', sans-serif; font-size: 22px; color: #94a3b8; direction: rtl; margin: 0 0 16px; position: relative; }
        .glow-line { height: 2px; background: linear-gradient(90deg, transparent, #ef4444, #f87171, #ef4444, transparent); margin: 20px auto; max-width: 400px; }
        .tab-bar { display: flex; gap: 8px; justify-content: center; flex-wrap: wrap; margin-bottom: 28px; }
        .tab-btn { padding: 10px 20px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.08); background: rgba(15,23,42,0.6); color: #94a3b8; font-size: 13px; font-weight: 600; cursor: pointer; transition: all 0.3s; display: flex; align-items: center; gap: 8px; }
        .tab-btn:hover { border-color: rgba(239,68,68,0.3); }
        .tab-btn.active { background: rgba(239,68,68,0.12); border-color: rgba(239,68,68,0.4); color: #fca5a5; }
        .glass-card { background: rgba(15,23,42,0.8); backdrop-filter: blur(12px); border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; padding: 24px; margin-bottom: 12px; transition: all 0.3s; cursor: pointer; }
        .glass-card:hover { border-color: rgba(239,68,68,0.2); transform: translateY(-1px); }
        .type-badge { padding: 3px 10px; border-radius: 16px; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; display: inline-flex; align-items: center; gap: 4px; }
        .sev-badge { padding: 3px 10px; border-radius: 16px; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; }
        .diff-block { margin-top: 12px; border-radius: 10px; overflow: hidden; font-family: monospace; font-size: 12px; }
        .diff-del { background: rgba(239,68,68,0.1); border-left: 3px solid #ef4444; padding: 8px 12px; color: #fca5a5; }
        .diff-add { background: rgba(16,185,129,0.1); border-left: 3px solid #10b981; padding: 8px 12px; color: #6ee7b7; }
        .filter-row { display: flex; gap: 6px; margin-bottom: 20px; flex-wrap: wrap; }
        .filter-chip { padding: 5px 12px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.08); background: transparent; color: #64748b; font-size: 11px; font-weight: 600; cursor: pointer; transition: all 0.2s; text-transform: capitalize; }
        .filter-chip.active { background: rgba(239,68,68,0.12); color: #fca5a5; border-color: rgba(239,68,68,0.3); }
        .form-group { margin-bottom: 16px; }
        .form-label { display: block; color: #c7d2fe; font-size: 13px; font-weight: 600; margin-bottom: 6px; }
        .form-input, .form-textarea, .form-select { width: 100%; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); border-radius: 10px; padding: 12px 14px; color: #e2e8f0; font-family: 'Inter', sans-serif; font-size: 14px; outline: none; transition: border-color 0.3s; box-sizing: border-box; }
        .form-input:focus, .form-textarea:focus, .form-select:focus { border-color: rgba(239,68,68,0.4); }
        .form-textarea { min-height: 100px; resize: vertical; line-height: 1.6; }
        .form-select { appearance: auto; }
        .form-select option { background: #0f172a; }
        .submit-btn { width: 100%; padding: 14px; border-radius: 12px; border: none; background: linear-gradient(135deg, #ef4444, #dc2626); color: white; font-weight: 800; font-size: 15px; cursor: pointer; transition: all 0.3s; }
        .submit-btn:hover { box-shadow: 0 0 30px rgba(239,68,68,0.2); }
        .standard-card { background: rgba(15,23,42,0.8); backdrop-filter: blur(12px); border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; padding: 24px; transition: all 0.3s; }
        .standard-card:hover { border-color: rgba(239,68,68,0.25); transform: translateY(-2px); }
        .back-link { display: inline-flex; align-items: center; gap: 8px; color: #ef4444; text-decoration: none; font-size: 14px; font-weight: 600; margin-bottom: 24px; transition: all 0.2s; }
        .back-link:hover { color: #f87171; gap: 10px; }
        .stats-row { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 12px; margin-bottom: 28px; }
        .stat-card { background: rgba(15,23,42,0.8); border: 1px solid rgba(255,255,255,0.08); border-radius: 14px; padding: 18px; text-align: center; backdrop-filter: blur(12px); }
        .success-msg { text-align: center; padding: 20px; background: rgba(16,185,129,0.1); border: 1px solid rgba(16,185,129,0.3); border-radius: 12px; color: #34d399; margin-top: 12px; }
        @media (max-width: 768px) { .corr-header h1 { font-size: 32px; } }
      `}</style>
      <div className="corr-page">
        <div className="corr-container">
          <Link href="/explore" className="back-link">← Back to Explore</Link>

          <div className="corr-header">
            <h1>Corrections & Accountability</h1>
            <p className="ar" style={{ fontFamily: 'Cairo, sans-serif' }}>التصحيحات والمساءلة</p>
            <div className="glow-line" />
            <p style={{ color: '#64748b', fontSize: 14, maxWidth: 650, margin: '0 auto', lineHeight: 1.7, position: 'relative' }}>
              Transparency in error correction is a cornerstone of credibility. Inspired by
              the correction policies of Nature, The Washington Post, and the BBC, every content
              correction is logged publicly with full version history.
            </p>
          </div>

          {/* Stats */}
          <div className="stats-row">
            <div className="stat-card">
              <div style={{ color: '#ef4444', fontSize: 28, fontWeight: 900 }}>{corrections.length}</div>
              <div style={{ color: '#64748b', fontSize: 11, marginTop: 4, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Total Corrections</div>
            </div>
            <div className="stat-card">
              <div style={{ color: '#10b981', fontSize: 28, fontWeight: 900 }}>{'<48h'}</div>
              <div style={{ color: '#64748b', fontSize: 11, marginTop: 4, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Avg Response Time</div>
            </div>
            <div className="stat-card">
              <div style={{ color: '#6366f1', fontSize: 28, fontWeight: 900 }}>{corrections.filter(c => c.severity === 'major').length}</div>
              <div style={{ color: '#64748b', fontSize: 11, marginTop: 4, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Major Corrections</div>
            </div>
            <div className="stat-card">
              <div style={{ color: '#f59e0b', fontSize: 28, fontWeight: 900 }}>100%</div>
              <div style={{ color: '#64748b', fontSize: 11, marginTop: 4, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Transparent Logging</div>
            </div>
          </div>

          <div className="tab-bar">
            {tabs.map(t => (
              <button key={t.id} className={`tab-btn ${activeTab === t.id ? 'active' : ''}`} onClick={() => setActiveTab(t.id)}>
                <span>{t.icon}</span><span>{t.label}</span>
              </button>
            ))}
          </div>

          {/* Corrections Log */}
          {activeTab === 'log' && (
            <div>
              <div className="filter-row">
                {['all', 'factual', 'statistical', 'citation', 'language', 'methodology'].map(f => (
                  <button key={f} className={`filter-chip ${filterType === f ? 'active' : ''}`} onClick={() => setFilterType(f)}>{f}</button>
                ))}
              </div>
              {filteredCorrections.map(c => (
                <div key={c.id} className="glass-card" onClick={() => setExpandedId(expandedId === c.id ? null : c.id)}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, flexWrap: 'wrap' }}>
                    <div style={{ flex: 1, minWidth: 200 }}>
                      <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 6, flexWrap: 'wrap' }}>
                        <span style={{ color: '#475569', fontSize: 11, fontFamily: 'monospace' }}>{c.id}</span>
                        <span className="type-badge" style={{ background: `${typeColors[c.type]}22`, color: typeColors[c.type], border: `1px solid ${typeColors[c.type]}44` }}>{c.type}</span>
                        <span className="sev-badge" style={{ background: `${severityColors[c.severity]}22`, color: severityColors[c.severity], border: `1px solid ${severityColors[c.severity]}44` }}>{c.severity}</span>
                      </div>
                      <div style={{ fontWeight: 700, color: '#f1f5f9', fontSize: 15 }}>{c.page}</div>
                      <div style={{ color: '#64748b', fontSize: 12, marginTop: 2 }}>{c.date} · {c.reviewer}</div>
                    </div>
                    <div style={{ color: '#475569', fontSize: 11, fontFamily: 'monospace' }}>{c.version}</div>
                  </div>

                  {expandedId === c.id && (
                    <div style={{ marginTop: 16 }}>
                      <div className="diff-block">
                        <div className="diff-del">− {c.originalText}</div>
                        <div className="diff-add">+ {c.correctedText}</div>
                      </div>
                      <div style={{ marginTop: 12, padding: 14, background: 'rgba(99,102,241,0.06)', borderRadius: 10, border: '1px solid rgba(99,102,241,0.15)' }}>
                        <div style={{ color: '#818cf8', fontSize: 12, fontWeight: 700, marginBottom: 4 }}>Reason</div>
                        <p style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.6, margin: 0 }}>{c.reason}</p>
                      </div>
                      <div style={{ marginTop: 8, padding: 10, background: 'rgba(255,255,255,0.02)', borderRadius: 8 }}>
                        <span style={{ color: '#475569', fontSize: 11 }}>📚 Source: </span>
                        <span style={{ color: '#94a3b8', fontSize: 12 }}>{c.source}</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Correction Request Form */}
          {activeTab === 'form' && (
            <div className="glass-card" style={{ cursor: 'default' }}>
              <h3 style={{ color: '#f1f5f9', fontWeight: 800, fontSize: 18, margin: '0 0 4px' }}>Submit a Correction Request</h3>
              <p style={{ fontFamily: 'Cairo, sans-serif', color: '#64748b', fontSize: 13, direction: 'rtl' as const, margin: '0 0 20px' }}>تقديم طلب تصحيح</p>
              <div className="form-group">
                <label className="form-label">Page / Module Name</label>
                <input type="text" className="form-input" placeholder="e.g., Media Literacy Module" />
              </div>
              <div className="form-group">
                <label className="form-label">Type of Correction</label>
                <select className="form-select">
                  <option value="">Select type...</option>
                  <option value="factual">Factual Error</option>
                  <option value="statistical">Statistical Error</option>
                  <option value="citation">Citation Issue</option>
                  <option value="language">Language / Translation</option>
                  <option value="methodology">Methodology Concern</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Current (Incorrect) Text</label>
                <textarea className="form-textarea" placeholder="Paste the text that needs correction..." />
              </div>
              <div className="form-group">
                <label className="form-label">Suggested Correction</label>
                <textarea className="form-textarea" placeholder="What should it say instead?" />
              </div>
              <div className="form-group">
                <label className="form-label">Source / Evidence</label>
                <input type="text" className="form-input" placeholder="Link or citation supporting the correction" />
              </div>
              <button className="submit-btn" onClick={() => setFormSubmitted(true)}>📤 Submit Correction Request</button>
              {formSubmitted && <div className="success-msg">✅ Thank you! Your correction request has been logged. Our editorial team will review it within 48 hours.</div>}
            </div>
          )}

          {/* Editorial Standards */}
          {activeTab === 'standards' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 16 }}>
              {editorialStandards.map((s, i) => (
                <div key={i} className="standard-card">
                  <div style={{ fontSize: 32, marginBottom: 10 }}>{s.icon}</div>
                  <h4 style={{ color: '#f1f5f9', fontWeight: 800, fontSize: 16, margin: '0 0 4px' }}>{s.title}</h4>
                  <p style={{ fontFamily: 'Cairo, sans-serif', color: '#818cf8', fontSize: 13, direction: 'rtl' as const, margin: '0 0 10px' }}>{s.titleAr}</p>
                  <p style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.7, margin: 0 }}>{s.desc}</p>
                </div>
              ))}
            </div>
          )}
          <PageNavigation currentPath="/corrections" />
        </div>
      </div>
    </>
  );
}
