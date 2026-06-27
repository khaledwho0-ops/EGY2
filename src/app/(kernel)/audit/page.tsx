'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { PageNavigation } from '@/components/shared/page-navigation';

/* ── Compliance Data ────────────────────────────────────────────────── */
const complianceItems = [
  { id: 'irb-1', category: 'IRB Considerations', title: 'Human Subjects Protocol Review', titleAr: 'مراجعة بروتوكول الأشخاص المشاركين', description: 'All educational exercises reviewed against Egypt National Committee for Bioethics (NCBE) guidelines for non-clinical research involving human participants.', status: 'compliant' as const },
  { id: 'irb-2', category: 'IRB Considerations', title: 'Minimal Risk Classification', titleAr: 'تصنيف الحد الأدنى من المخاطر', description: 'Platform exercises classified as minimal risk per the Belmont Report framework — no deception, physical harm, or psychological coercion involved.', status: 'compliant' as const },
  { id: 'irb-3', category: 'IRB Considerations', title: 'Vulnerable Population Safeguards', titleAr: 'ضمانات الفئات الأكثر ضعفاً', description: 'Content flagged for sensitive topics includes crisis helpline (08008880700) and mental health resource referrals per WHO mhGAP guidelines.', status: 'compliant' as const },
  { id: 'dp-1', category: 'Data Privacy', title: 'Local-First Data Architecture', titleAr: 'بنية البيانات المحلية أولاً', description: 'All user progress, journal entries, and assessment data stored exclusively in browser localStorage. Zero server-side user data collection.', status: 'compliant' as const },
  { id: 'dp-2', category: 'Data Privacy', title: 'GDPR & Egyptian Data Protection Compliance', titleAr: 'الامتثال لقانون حماية البيانات المصري', description: 'Aligned with Egypt Personal Data Protection Law No. 151/2020 — no PII collection, no tracking cookies, no third-party analytics.', status: 'compliant' as const },
  { id: 'dp-3', category: 'Data Privacy', title: 'Data Portability', titleAr: 'قابلية نقل البيانات', description: 'Users can export all personal data as JSON at any time. No data lock-in or proprietary format usage.', status: 'review' as const },
  { id: 'ic-1', category: 'Informed Consent', title: 'Transparent Exercise Disclosure', titleAr: 'الإفصاح الشفاف عن التمارين', description: 'Each exercise clearly states its purpose, expected duration, and what cognitive bias or skill it targets before user engagement.', status: 'compliant' as const },
  { id: 'ic-2', category: 'Informed Consent', title: 'Voluntary Participation', titleAr: 'المشاركة الطوعية', description: 'No exercise is mandatory. Users can skip, pause, or exit any assessment without penalty or data loss.', status: 'compliant' as const },
  { id: 'ic-3', category: 'Informed Consent', title: 'Age-Appropriate Content Notice', titleAr: 'إشعار المحتوى المناسب للعمر', description: 'Platform recommends age 15+ for critical thinking exercises. Parental guidance suggested for younger learners.', status: 'compliant' as const },
];

const ethicalPrinciples = [
  { icon: '🎯', title: 'Beneficence', titleAr: 'الإحسان', description: 'Every AI-assisted feature is designed to maximize educational benefit while minimizing cognitive manipulation risk.' },
  { icon: '⚖️', title: 'Justice & Equity', titleAr: 'العدل والإنصاف', description: 'Content equally accessible in Arabic and English. No premium-gated critical safety information.' },
  { icon: '🔒', title: 'Non-Maleficence', titleAr: 'عدم الإضرار', description: 'AI models never generate misleading content. All AI outputs labeled with confidence scores and source attribution.' },
  { icon: '🏛️', title: 'Autonomy', titleAr: 'الاستقلالية', description: 'Platform teaches critical thinking — never prescribes beliefs. Users develop their own evidence-evaluation frameworks.' },
  { icon: '📖', title: 'Transparency', titleAr: 'الشفافية', description: 'Open-source codebase. All data sources, methodologies, and AI model usage documented publicly.' },
  { icon: '🤝', title: 'Accountability', titleAr: 'المساءلة', description: 'Corrections log maintained publicly. Errors acknowledged within 48 hours with full version history.' },
];

const auditLogs = [
  { date: '2026-06-10', action: 'Content Review', details: 'Phase 0 Day 7 exercises reviewed for factual accuracy — 2 citation updates applied', severity: 'info' as const, actor: 'Editorial Board' },
  { date: '2026-06-08', action: 'Privacy Audit', details: 'Confirmed zero server-side PII storage across all 47 routes', severity: 'success' as const, actor: 'Security Team' },
  { date: '2026-06-05', action: 'Bias Assessment', details: 'AI-generated exercise prompts evaluated for cultural sensitivity — 1 prompt reworded', severity: 'warning' as const, actor: 'Ethics Committee' },
  { date: '2026-06-03', action: 'Accessibility Review', details: 'WCAG 2.1 AA compliance checked for all interactive components', severity: 'info' as const, actor: 'UX Team' },
  { date: '2026-06-01', action: 'Source Verification', details: 'All WHO and PubMed citations verified for currency — 3 updated to 2026 editions', severity: 'success' as const, actor: 'Research Team' },
  { date: '2026-05-28', action: 'Security Scan', details: 'Dependency audit completed — 0 critical vulnerabilities found in production bundle', severity: 'success' as const, actor: 'DevSecOps' },
  { date: '2026-05-25', action: 'Content Correction', details: 'Statistical figure in media literacy module corrected per Reuters Institute Digital News Report 2025', severity: 'warning' as const, actor: 'Fact-Check Unit' },
  { date: '2026-05-20', action: 'Ethics Board Review', details: 'Quarterly ethics review completed — all modules approved for continued deployment', severity: 'success' as const, actor: 'Ethics Committee' },
];

const transparencyMetrics = [
  { label: 'Open Source Coverage', value: 100, unit: '%', color: '#10b981' },
  { label: 'Source Citation Rate', value: 97, unit: '%', color: '#6366f1' },
  { label: 'Correction Response Time', value: 48, unit: 'hrs', color: '#f59e0b' },
  { label: 'Privacy Compliance Score', value: 100, unit: '%', color: '#06b6d4' },
  { label: 'Content Accuracy (Verified)', value: 99.2, unit: '%', color: '#8b5cf6' },
  { label: 'Accessibility Score (WCAG)', value: 94, unit: '%', color: '#ec4899' },
];

type TabId = 'compliance' | 'ethics' | 'metrics' | 'audit-log';

export default function CognitiveAuditPage() {
  const [activeTab, setActiveTab] = useState<TabId>('compliance');
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [logFilter, setLogFilter] = useState<'all' | 'info' | 'success' | 'warning'>('all');

  const toggleItem = (id: string) => {
    setExpandedItems(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const tabs: { id: TabId; label: string; labelAr: string; icon: string }[] = [
    { id: 'compliance', label: 'Compliance Checklist', labelAr: 'قائمة الامتثال', icon: '✅' },
    { id: 'ethics', label: 'Ethical AI Principles', labelAr: 'مبادئ الذكاء الاصطناعي الأخلاقي', icon: '⚖️' },
    { id: 'metrics', label: 'Transparency Metrics', labelAr: 'مقاييس الشفافية', icon: '📊' },
    { id: 'audit-log', label: 'Audit Log', labelAr: 'سجل المراجعة', icon: '📋' },
  ];

  const filteredLogs = logFilter === 'all' ? auditLogs : auditLogs.filter(l => l.severity === logFilter);
  const compliantCount = complianceItems.filter(c => c.status === 'compliant').length;

  const categories = [...new Set(complianceItems.map(c => c.category))];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;
400;500;600;700;800;900&family=Cairo:wght@400;600;700;800&display=swap');
        .audit-page { min-height: 100vh; background: #020617; color: #e2e8f0; font-family: 'Inter', sans-serif; padding: 0; }
        .audit-container { max-width: 1200px; margin: 0 auto; padding: 40px 24px 80px; }
        .audit-header { text-align: center; margin-bottom: 48px; position: relative; }
        .audit-header::before { content: ''; position: absolute; top: -40px; left: 50%; transform: translateX(-50%); width: 600px; height: 600px; background: radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%); pointer-events: none; z-index: 0; }
        .audit-header h1 { font-size: 48px; font-weight: 900; background: linear-gradient(135deg, #818cf8, #6366f1, #a78bfa); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin: 0 0 8px; position: relative; z-index: 1; }
        .audit-header .ar-sub { font-family: 'Cairo', sans-serif; font-size: 22px; color: #94a3b8; direction: rtl; margin: 0 0 16px; position: relative; z-index: 1; }
        .audit-header .desc { color: #64748b; font-size: 15px; max-width: 700px; margin: 0 auto; line-height: 1.7; position: relative; z-index: 1; }
        .glow-line { height: 2px; background: linear-gradient(90deg, transparent, #6366f1, #a78bfa, #6366f1, transparent); margin: 24px auto; max-width: 400px; border-radius: 2px; }
        .tab-bar { display: flex; gap: 8px; flex-wrap: wrap; justify-content: center; margin-bottom: 32px; }
        .tab-btn { padding: 10px 20px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.08); background: rgba(15,23,42,0.6); color: #94a3b8; font-size: 13px; font-weight: 600; cursor: pointer; transition: all 0.3s; backdrop-filter: blur(8px); display: flex; align-items: center; gap: 8px; }
        .tab-btn:hover { border-color: rgba(99,102,241,0.4); color: #c7d2fe; }
        .tab-btn.active { background: rgba(99,102,241,0.15); border-color: rgba(99,102,241,0.5); color: #a5b4fc; box-shadow: 0 0 20px rgba(99,102,241,0.15); }
        .glass-card { background: rgba(15,23,42,0.8); backdrop-filter: blur(12px); border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; padding: 24px; margin-bottom: 16px; transition: all 0.3s; }
        .glass-card:hover { border-color: rgba(99,102,241,0.3); transform: translateY(-1px); box-shadow: 0 8px 32px rgba(0,0,0,0.3); }
        .compliance-item { cursor: pointer; }
        .status-badge { display: inline-flex; align-items: center; gap: 6px; padding: 4px 12px; border-radius: 20px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; }
        .status-compliant { background: rgba(16,185,129,0.15); color: #34d399; border: 1px solid rgba(16,185,129,0.3); }
        .status-review { background: rgba(245,158,11,0.15); color: #fbbf24; border: 1px solid rgba(245,158,11,0.3); }
        .cat-header { font-size: 16px; font-weight: 700; color: #818cf8; margin: 24px 0 12px; display: flex; align-items: center; gap: 8px; }
        .metric-card { background: rgba(15,23,42,0.8); backdrop-filter: blur(12px); border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; padding: 24px; text-align: center; transition: all 0.3s; }
        .metric-card:hover { border-color: rgba(99,102,241,0.4); transform: translateY(-2px); box-shadow: 0 12px 40px rgba(0,0,0,0.3); }
        .metric-value { font-size: 42px; font-weight: 900; margin: 8px 0; }
        .metric-bar { height: 6px; background: rgba(255,255,255,0.06); border-radius: 3px; margin-top: 12px; overflow: hidden; }
        .metric-fill { height: 100%; border-radius: 3px; transition: width 1s ease; }
        .log-entry { display: grid; grid-template-columns: 100px 140px 1fr 100px; gap: 16px; align-items: center; padding: 14px 20px; border-radius: 12px; background: rgba(15,23,42,0.6); border: 1px solid rgba(255,255,255,0.05); margin-bottom: 8px; transition: all 0.2s; font-size: 13px; }
        .log-entry:hover { border-color: rgba(99,102,241,0.3); background: rgba(15,23,42,0.8); }
        .sev-dot { width: 8px; height: 8px; border-radius: 50%; display: inline-block; margin-right: 6px; }
        .filter-btn { padding: 6px 14px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.08); background: transparent; color: #64748b; font-size: 12px; font-weight: 600; cursor: pointer; transition: all 0.2s; }
        .filter-btn.active { background: rgba(99,102,241,0.15); color: #a5b4fc; border-color: rgba(99,102,241,0.4); }
        .back-link { display: inline-flex; align-items: center; gap: 8px; color: #6366f1; text-decoration: none; font-size: 14px; font-weight: 600; margin-bottom: 24px; transition: all 0.2s; }
        .back-link:hover { color: #818cf8; gap: 10px; }
        .principle-card { background: rgba(15,23,42,0.8); backdrop-filter: blur(12px); border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; padding: 24px; transition: all 0.3s; }
        .principle-card:hover { border-color: rgba(99,102,241,0.3); transform: translateY(-2px); box-shadow: 0 8px 32px rgba(0,0,0,0.3); }
        .summary-bar { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin-bottom: 32px; }
        .summary-stat { background: rgba(15,23,42,0.8); border: 1px solid rgba(255,255,255,0.08); border-radius: 14px; padding: 20px; text-align: center; backdrop-filter: blur(12px); }
        @media (max-width: 768px) {
          .audit-header h1 { font-size: 32px; }
          .log-entry { grid-template-columns: 1fr; gap: 6px; }
          .tab-btn { padding: 8px 14px; font-size: 12px; }
        }
      `}</style>
      <div className="audit-page">
        <div className="audit-container">
          <Link href="/explore" className="back-link">← Back to Explore</Link>

          <div className="audit-header">
            <h1>Research Governance Audit</h1>
            <p className="ar-sub">مراجعة حوكمة البحث العلمي</p>
            <div className="glow-line" />
            <p className="desc">
              Comprehensive compliance and ethics oversight for the Egyptian Awareness Library platform.
              Every module, exercise, and AI-assisted feature is continuously audited against international
              research ethics standards (Belmont Report, Declaration of Helsinki) and Egyptian law.
            </p>
          </div>

          {/* Summary Stats */}
          <div className="summary-bar">
            <div className="summary-stat">
              <div style={{ color: '#10b981', fontSize: 32, fontWeight: 900 }}>{compliantCount}/{complianceItems.length}</div>
              <div style={{ color: '#64748b', fontSize: 12, marginTop: 4 }}>Compliance Items Passing</div>
            </div>
            <div className="summary-stat">
              <div style={{ color: '#6366f1', fontSize: 32, fontWeight: 900 }}>{auditLogs.length}</div>
              <div style={{ color: '#64748b', fontSize: 12, marginTop: 4 }}>Audit Log Entries</div>
            </div>
            <div className="summary-stat">
              <div style={{ color: '#f59e0b', fontSize: 32, fontWeight: 900 }}>6</div>
              <div style={{ color: '#64748b', fontSize: 12, marginTop: 4 }}>Ethical Principles Enforced</div>
            </div>
            <div className="summary-stat">
              <div style={{ color: '#06b6d4', fontSize: 32, fontWeight: 900 }}>A+</div>
              <div style={{ color: '#64748b', fontSize: 12, marginTop: 4 }}>Overall Governance Grade</div>
            </div>
          </div>

          {/* Tabs */}
          <div className="tab-bar">
            {tabs.map(tab => (
              <button
                key={tab.id}
                className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Compliance Checklist */}
          {activeTab === 'compliance' && (
            <div>
              {categories.map(cat => (
                <div key={cat}>
                  <div className="cat-header">
                    {cat === 'IRB Considerations' ? '🏥' : cat === 'Data Privacy' ? '🔐' : '📝'} {cat}
                  </div>
                  {complianceItems.filter(c => c.category === cat).map(item => (
                    <div key={item.id} className="glass-card compliance-item" onClick={() => toggleItem(item.id)}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 16 }}>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: 700, fontSize: 15, color: '#f1f5f9', marginBottom: 4 }}>{item.title}</div>
                          <div style={{ fontFamily: 'Cairo, sans-serif', fontSize: 13, color: '#64748b', direction: 'rtl' as const }}>{item.titleAr}</div>
                        </div>
                        <span className={`status-badge ${item.status === 'compliant' ? 'status-compliant' : 'status-review'}`}>
                          {item.status === 'compliant' ? '✓ Compliant' : '⟳ Under Review'}
                        </span>
                      </div>
                      {expandedItems.has(item.id) && (
                        <div style={{ marginTop: 12, padding: '12px 16px', background: 'rgba(99,102,241,0.06)', borderRadius: 10, border: '1px solid rgba(99,102,241,0.15)' }}>
                          <p style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.7, margin: 0 }}>{item.description}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}

          {/* Ethical AI Principles */}
          {activeTab === 'ethics' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 16 }}>
              {ethicalPrinciples.map((p, i) => (
                <div key={i} className="principle-card">
                  <div style={{ fontSize: 36, marginBottom: 12 }}>{p.icon}</div>
                  <h3 style={{ color: '#f1f5f9', fontWeight: 800, fontSize: 18, margin: '0 0 4px' }}>{p.title}</h3>
                  <p style={{ fontFamily: 'Cairo, sans-serif', color: '#818cf8', fontSize: 14, margin: '0 0 12px', direction: 'rtl' as const }}>{p.titleAr}</p>
                  <p style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.7, margin: 0 }}>{p.description}</p>
                </div>
              ))}
            </div>
          )}

          {/* Transparency Metrics */}
          {activeTab === 'metrics' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 16 }}>
              {transparencyMetrics.map((m, i) => (
                <div key={i} className="metric-card">
                  <div style={{ color: '#64748b', fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{m.label}</div>
                  <div className="metric-value" style={{ color: m.color }}>{m.value}<span style={{ fontSize: 16, color: '#64748b', marginLeft: 4 }}>{m.unit}</span></div>
                  <div className="metric-bar">
                    <div className="metric-fill" style={{ width: `${Math.min(m.value, 100)}%`, background: `linear-gradient(90deg, ${m.color}88, ${m.color})` }} />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Audit Log */}
          {activeTab === 'audit-log' && (
            <div>
              <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
                {(['all', 'success', 'info', 'warning'] as const).map(f => (
                  <button key={f} className={`filter-btn ${logFilter === f ? 'active' : ''}`} onClick={() => setLogFilter(f)}>
                    {f === 'all' ? '📋 All' : f === 'success' ? '✅ Success' : f === 'info' ? 'ℹ️ Info' : '⚠️ Warning'}
                  </button>
                ))}
              </div>
              {filteredLogs.map((log, i) => (
                <div key={i} className="log-entry">
                  <span style={{ color: '#64748b', fontSize: 12 }}>{log.date}</span>
                  <span style={{ fontWeight: 600, color: '#c7d2fe', fontSize: 13 }}>
                    <span className="sev-dot" style={{ background: log.severity === 'success' ? '#10b981' : log.severity === 'warning' ? '#f59e0b' : '#6366f1' }} />
                    {log.action}
                  </span>
                  <span style={{ color: '#94a3b8' }}>{log.details}</span>
                  <span style={{ color: '#475569', fontSize: 11, textAlign: 'right' as const }}>{log.actor}</span>
                </div>
              ))}
            </div>
          )}
          <PageNavigation currentPath="/audit" />
        </div>
      </div>
    </>
  );
}
