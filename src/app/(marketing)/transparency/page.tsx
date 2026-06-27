'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { PageNavigation } from '@/components/shared/page-navigation';

/* ── Transparency Data ──────────────────────────────────────────────── */
// Honest disclosure of the ACTUAL stack (the key-rotator), not aspirational
// models or fabricated stats — the One Law applies to this page too.
const aiModels = [
  { name: 'Gemini 2.5 Flash', provider: 'Google', usage: 'Lead model in the key-rotator — claim analysis, structured verdicts, Arabic generation', status: 'active' as const, requests: 'via rotator', accuracy: '—' },
  { name: 'Llama 3.3 70B', provider: 'Groq · Cerebras · Together · SambaNova', usage: 'Fast fallback for classification and JSON synthesis', status: 'active' as const, requests: 'via rotator', accuracy: '—' },
  { name: 'Nemotron-3 (NIM)', provider: 'NVIDIA', usage: 'Last-resort heavy reasoning (deprioritized for latency)', status: 'active' as const, requests: 'via rotator', accuracy: '—' },
  { name: 'rerank-v3.5', provider: 'Cohere', usage: 'Multilingual semantic reranking of retrieved evidence', status: 'active' as const, requests: 'on retrieval', accuracy: '—' },
  { name: 'text-embedding-3-small', provider: 'OpenAI', usage: 'Embeddings for Pinecone case retrieval (RAG)', status: 'active' as const, requests: 'on index', accuracy: '—' },
];

const dataSources = [
  { name: 'Reuters Institute Digital News Report', year: '2024–2025', type: 'Research Report', url: 'https://reutersinstitute.politics.ox.ac.uk', description: 'Media consumption and misinformation exposure statistics for Egypt and MENA region.' },
  { name: 'WHO Mental Health Atlas', year: '2024', type: 'Health Data', url: 'https://www.who.int/data', description: 'Mental health resource availability and crisis intervention data for Egypt.' },
  { name: 'PubMed / PMC', year: 'Ongoing', type: 'Academic Database', url: 'https://pubmed.ncbi.nlm.nih.gov', description: 'Peer-reviewed research on cognitive biases, media literacy, and psychological resilience.' },
  { name: 'Arab Barometer', year: '2024', type: 'Survey Data', url: 'https://www.arabbarometer.org', description: 'Public opinion and digital media trust metrics across Arab countries.' },
  { name: 'CAPMAS (Egypt)', year: '2024–2025', type: 'Government Statistics', url: 'https://www.capmas.gov.eg', description: 'Central Agency for Public Mobilization and Statistics — demographic and education data.' },
  { name: 'UNESCO MIL Curriculum', year: '2023', type: 'Educational Framework', url: 'https://www.unesco.org/en/media-information-literacy', description: 'Media and Information Literacy competency framework used for skill assessment structure.' },
  { name: 'Sunnah.com / IslamQA', year: 'Ongoing', type: 'Islamic Reference', url: 'https://sunnah.com', description: 'Authenticated hadith database and Islamic jurisprudence references.' },
  { name: 'Stanford History Education Group', year: '2023', type: 'Educational Research', url: 'https://sheg.stanford.edu', description: 'Civic Online Reasoning curriculum — basis for SIFT method implementation.' },
];

const methodologies = [
  { title: 'SIFT Method', titleAr: 'طريقة سيفت', desc: 'Stop → Investigate the source → Find better coverage → Trace claims to origin. Developed by Mike Caulfield at the University of Washington.' },
  { title: 'Paul-Elder Framework', titleAr: 'إطار بول-إلدر', desc: 'Eight elements of reasoning with nine intellectual standards. Licensed for educational use from the Foundation for Critical Thinking.' },
  { title: 'Bloom\'s Taxonomy (Revised)', titleAr: 'تصنيف بلوم المعدل', desc: 'Anderson & Krathwohl (2001) revision — Remember → Understand → Apply → Analyze → Evaluate → Create. Used for skill progression mapping.' },
  { title: 'Mustalah al-Hadith', titleAr: 'مصطلح الحديث', desc: 'Classical hadith authentication methodology — chain analysis (isnad), narrator reliability (jarh wa ta\'dil), and textual comparison (matn analysis).' },
];

const coiDeclarations = [
  { person: 'Project Lead', declaration: 'No financial ties to any AI company. Platform is not sponsored by OpenAI, Google, or Anthropic. API usage is paid at standard rates.' },
  { person: 'Islamic Content Advisor', declaration: 'Independent scholar with no affiliation to any political or sectarian organization. Content reviewed per Sunni mainstream scholarly consensus.' },
  { person: 'Psychology Advisor', declaration: 'Licensed clinical psychologist (Egyptian Syndicate of Psychologists). No pharmaceutical industry affiliations.' },
];

const fundingSources = [
  { source: 'Self-Funded', amount: 'Primary', description: 'Platform development and hosting costs covered by the founding team.' },
  { source: 'Open Source Community', amount: 'In-Kind', description: 'Development tools, frameworks (Next.js, React), and libraries used under MIT/Apache licenses.' },
  { source: 'Educational Grants', amount: 'Applied', description: 'Applications submitted to UNESCO IICBA and Ford Foundation Digital Literacy Initiative.' },
];

type TabId = 'ai-models' | 'data-sources' | 'methodology' | 'coi' | 'funding' | 'open-source';

export default function TransparencyPage() {
  const [activeTab, setActiveTab] = useState<TabId>('ai-models');

  const tabs: { id: TabId; label: string; icon: string }[] = [
    { id: 'ai-models', label: 'AI Models', icon: '🤖' },
    { id: 'data-sources', label: 'Data Sources', icon: '📚' },
    { id: 'methodology', label: 'Methodology', icon: '🔬' },
    { id: 'coi', label: 'Conflicts of Interest', icon: '⚖️' },
    { id: 'funding', label: 'Funding', icon: '💰' },
    { id: 'open-source', label: 'Open Source', icon: '🌐' },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;
400;500;600;700;800;900&family=Cairo:wght@400;600;700;800&display=swap');
        .trans-page { min-height: 100vh; background: #020617; color: #e2e8f0; font-family: 'Inter', sans-serif; }
        .trans-container { max-width: 1200px; margin: 0 auto; padding: 40px 24px 80px; }
        .trans-header { text-align: center; margin-bottom: 40px; position: relative; }
        .trans-header::before { content: ''; position: absolute; top: -60px; left: 50%; transform: translateX(-50%); width: 700px; height: 500px; background: radial-gradient(circle, rgba(6,182,212,0.1) 0%, transparent 65%); pointer-events: none; }
        .trans-header h1 { font-size: 48px; font-weight: 900; background: linear-gradient(135deg, #67e8f9, #06b6d4, #0891b2); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin: 0 0 8px; position: relative; }
        .trans-header .ar { font-family: 'Cairo', sans-serif; font-size: 22px; color: #94a3b8; direction: rtl; margin: 0 0 16px; position: relative; }
        .glow-line { height: 2px; background: linear-gradient(90deg, transparent, #06b6d4, #67e8f9, #06b6d4, transparent); margin: 20px auto; max-width: 400px; }
        .tab-bar { display: flex; gap: 8px; justify-content: center; flex-wrap: wrap; margin-bottom: 28px; }
        .tab-btn { padding: 10px 18px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.08); background: rgba(15,23,42,0.6); color: #94a3b8; font-size: 12px; font-weight: 600; cursor: pointer; transition: all 0.3s; display: flex; align-items: center; gap: 6px; }
        .tab-btn:hover { border-color: rgba(6,182,212,0.3); }
        .tab-btn.active { background: rgba(6,182,212,0.12); border-color: rgba(6,182,212,0.4); color: #67e8f9; box-shadow: 0 0 20px rgba(6,182,212,0.1); }
        .glass-card { background: rgba(15,23,42,0.8); backdrop-filter: blur(12px); border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; padding: 24px; margin-bottom: 12px; transition: all 0.3s; }
        .glass-card:hover { border-color: rgba(6,182,212,0.25); transform: translateY(-1px); box-shadow: 0 8px 32px rgba(0,0,0,0.3); }
        .model-grid { display: grid; gap: 16px; }
        .model-status { padding: 3px 10px; border-radius: 20px; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; }
        .status-active { background: rgba(16,185,129,0.15); color: #34d399; border: 1px solid rgba(16,185,129,0.3); }
        .status-planned { background: rgba(245,158,11,0.15); color: #fbbf24; border: 1px solid rgba(245,158,11,0.3); }
        .source-table { width: 100%; border-collapse: separate; border-spacing: 0; }
        .source-table th { text-align: left; padding: 10px 14px; font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.08em; border-bottom: 1px solid rgba(255,255,255,0.06); }
        .source-table td { padding: 12px 14px; font-size: 13px; color: #94a3b8; border-bottom: 1px solid rgba(255,255,255,0.04); }
        .source-table tr:hover td { background: rgba(6,182,212,0.04); }
        .source-link { color: #06b6d4; text-decoration: none; font-size: 11px; }
        .source-link:hover { text-decoration: underline; }
        .method-card { background: rgba(15,23,42,0.8); backdrop-filter: blur(12px); border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; padding: 24px; transition: all 0.3s; }
        .method-card:hover { border-color: rgba(6,182,212,0.3); transform: translateY(-2px); }
        .coi-card { background: rgba(15,23,42,0.8); backdrop-filter: blur(12px); border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; padding: 20px; margin-bottom: 12px; }
        .back-link { display: inline-flex; align-items: center; gap: 8px; color: #06b6d4; text-decoration: none; font-size: 14px; font-weight: 600; margin-bottom: 24px; transition: all 0.2s; }
        .back-link:hover { color: #67e8f9; gap: 10px; }
        .oss-badge-row { display: flex; gap: 12px; flex-wrap: wrap; margin: 20px 0; }
        .oss-badge { padding: 8px 16px; border-radius: 10px; background: rgba(6,182,212,0.1); border: 1px solid rgba(6,182,212,0.25); color: #67e8f9; font-size: 13px; font-weight: 600; display: flex; align-items: center; gap: 8px; }
        .commitment-card { background: rgba(15,23,42,0.8); border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; padding: 20px; backdrop-filter: blur(12px); }
        @media (max-width: 768px) { .trans-header h1 { font-size: 32px; } .source-table { display: block; overflow-x: auto; } .tab-btn { padding: 8px 12px; font-size: 11px; } }
      `}</style>
      <div className="trans-page">
        <div className="trans-container">
          <Link href="/explore" className="back-link">← Back to Explore</Link>

          <div className="trans-header">
            <h1>Transparency Report</h1>
            <p className="ar" style={{ fontFamily: 'Cairo, sans-serif' }}>تقرير الشفافية</p>
            <div className="glow-line" />
            <p style={{ color: '#64748b', fontSize: 14, maxWidth: 650, margin: '0 auto', lineHeight: 1.7, position: 'relative' }}>
              Full disclosure of every AI model, data source, methodology, and funding decision.
              We believe educational platforms must be held to the same transparency standards
              as peer-reviewed research institutions.
            </p>
          </div>

          <div className="tab-bar">
            {tabs.map(t => (
              <button key={t.id} className={`tab-btn ${activeTab === t.id ? 'active' : ''}`} onClick={() => setActiveTab(t.id)}>
                <span>{t.icon}</span><span>{t.label}</span>
              </button>
            ))}
          </div>

          {/* AI Models */}
          {activeTab === 'ai-models' && (
            <div className="model-grid">
              {aiModels.map((m, i) => (
                <div key={i} className="glass-card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, flexWrap: 'wrap' }}>
                    <div>
                      <div style={{ fontWeight: 800, color: '#f1f5f9', fontSize: 18 }}>{m.name}</div>
                      <div style={{ color: '#64748b', fontSize: 12, marginTop: 2 }}>Provider: {m.provider}</div>
                    </div>
                    <span className={`model-status ${m.status === 'active' ? 'status-active' : 'status-planned'}`}>{m.status}</span>
                  </div>
                  <p style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.6, margin: '12px 0 16px' }}>{m.usage}</p>
                  <div style={{ display: 'flex', gap: 24 }}>
                    <div>
                      <div style={{ color: '#475569', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Requests (Monthly)</div>
                      <div style={{ color: '#06b6d4', fontWeight: 800, fontSize: 18, marginTop: 2 }}>{m.requests}</div>
                    </div>
                    <div>
                      <div style={{ color: '#475569', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Task Accuracy</div>
                      <div style={{ color: '#10b981', fontWeight: 800, fontSize: 18, marginTop: 2 }}>{m.accuracy}</div>
                    </div>
                  </div>
                </div>
              ))}
              <div className="glass-card" style={{ borderColor: 'rgba(245,158,11,0.2)', background: 'rgba(245,158,11,0.04)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 24 }}>⚠️</span>
                  <div>
                    <div style={{ fontWeight: 700, color: '#fbbf24', fontSize: 14 }}>AI Transparency Commitment</div>
                    <p style={{ color: '#94a3b8', fontSize: 13, margin: '4px 0 0', lineHeight: 1.6 }}>
                      All AI-generated content is labeled. AI assists but never replaces human editorial judgment.
                      Every AI output is reviewed by a subject matter expert before publication.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Data Sources */}
          {activeTab === 'data-sources' && (
            <div className="glass-card" style={{ overflow: 'auto' }}>
              <table className="source-table">
                <thead>
                  <tr>
                    <th>Source</th>
                    <th>Year</th>
                    <th>Type</th>
                    <th>Usage</th>
                    <th>Link</th>
                  </tr>
                </thead>
                <tbody>
                  {dataSources.map((s, i) => (
                    <tr key={i}>
                      <td style={{ fontWeight: 600, color: '#e2e8f0' }}>{s.name}</td>
                      <td>{s.year}</td>
                      <td><span style={{ background: 'rgba(6,182,212,0.1)', color: '#67e8f9', padding: '2px 8px', borderRadius: 12, fontSize: 11 }}>{s.type}</span></td>
                      <td style={{ maxWidth: 300 }}>{s.description}</td>
                      <td><a href={s.url} target="_blank" rel="noopener noreferrer" className="source-link">Visit →</a></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Methodology */}
          {activeTab === 'methodology' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 16 }}>
              {methodologies.map((m, i) => (
                <div key={i} className="method-card">
                  <h4 style={{ color: '#f1f5f9', fontWeight: 800, fontSize: 17, margin: '0 0 4px' }}>{m.title}</h4>
                  <p style={{ fontFamily: 'Cairo, sans-serif', color: '#06b6d4', fontSize: 14, direction: 'rtl' as const, margin: '0 0 12px' }}>{m.titleAr}</p>
                  <p style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.7, margin: 0 }}>{m.desc}</p>
                </div>
              ))}
            </div>
          )}

          {/* Conflict of Interest */}
          {activeTab === 'coi' && (
            <div>
              <div className="glass-card" style={{ borderColor: 'rgba(16,185,129,0.2)', marginBottom: 20 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 28 }}>✅</span>
                  <div>
                    <div style={{ fontWeight: 700, color: '#34d399', fontSize: 15 }}>No Undisclosed Conflicts of Interest</div>
                    <p style={{ color: '#94a3b8', fontSize: 13, margin: '4px 0 0' }}>All team members have provided voluntary COI declarations. Updated quarterly.</p>
                  </div>
                </div>
              </div>
              {coiDeclarations.map((c, i) => (
                <div key={i} className="coi-card">
                  <div style={{ fontWeight: 700, color: '#f1f5f9', fontSize: 14, marginBottom: 6 }}>{c.person}</div>
                  <p style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.6, margin: 0 }}>{c.declaration}</p>
                </div>
              ))}
            </div>
          )}

          {/* Funding */}
          {activeTab === 'funding' && (
            <div>
              {fundingSources.map((f, i) => (
                <div key={i} className="glass-card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <div style={{ fontWeight: 700, color: '#f1f5f9', fontSize: 16 }}>{f.source}</div>
                    <span style={{ background: 'rgba(6,182,212,0.12)', color: '#67e8f9', padding: '4px 12px', borderRadius: 20, fontSize: 11, fontWeight: 700 }}>{f.amount}</span>
                  </div>
                  <p style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.6, margin: 0 }}>{f.description}</p>
                </div>
              ))}
              <div className="glass-card" style={{ borderColor: 'rgba(99,102,241,0.2)', background: 'rgba(99,102,241,0.04)', marginTop: 8 }}>
                <div style={{ fontWeight: 700, color: '#a5b4fc', fontSize: 14, marginBottom: 6 }}>💡 Funding Independence Guarantee</div>
                <p style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.6, margin: 0 }}>
                  No funder has or will have editorial control over platform content. All funding arrangements
                  include explicit editorial independence clauses. This commitment is modeled after the
                  editorial independence policies of The Guardian and ProPublica.
                </p>
              </div>
            </div>
          )}

          {/* Open Source */}
          {activeTab === 'open-source' && (
            <div>
              <div className="glass-card">
                <h3 style={{ color: '#f1f5f9', fontWeight: 800, fontSize: 20, margin: '0 0 8px' }}>🌐 Open Source Commitment</h3>
                <p style={{ fontFamily: 'Cairo, sans-serif', color: '#06b6d4', fontSize: 15, direction: 'rtl' as const, margin: '0 0 16px' }}>التزامنا بالمصدر المفتوح</p>
                <p style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.7, margin: 0 }}>
                  The Egyptian Awareness Library is built entirely with open-source technologies and
                  the platform codebase itself follows open-source principles. We believe that educational
                  tools for critical thinking should be transparent, auditable, and replicable by any
                  community worldwide.
                </p>
              </div>
              <div className="oss-badge-row">
                {['Next.js 15', 'React 19', 'TypeScript', 'Tailwind CSS', 'Vercel', 'GitHub'].map(tech => (
                  <div key={tech} className="oss-badge">⚡ {tech}</div>
                ))}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
                <div className="commitment-card">
                  <div style={{ fontSize: 28, marginBottom: 8 }}>📖</div>
                  <h4 style={{ color: '#f1f5f9', fontWeight: 700, margin: '0 0 8px' }}>Auditable Code</h4>
                  <p style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.6, margin: 0 }}>Every algorithm, scoring function, and content pipeline is inspectable in the source code.</p>
                </div>
                <div className="commitment-card">
                  <div style={{ fontSize: 28, marginBottom: 8 }}>🔄</div>
                  <h4 style={{ color: '#f1f5f9', fontWeight: 700, margin: '0 0 8px' }}>Reproducible Results</h4>
                  <p style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.6, margin: 0 }}>Exercise scoring and skill assessments use deterministic algorithms — same input always produces same output.</p>
                </div>
                <div className="commitment-card">
                  <div style={{ fontSize: 28, marginBottom: 8 }}>🤝</div>
                  <h4 style={{ color: '#f1f5f9', fontWeight: 700, margin: '0 0 8px' }}>Community Contributions</h4>
                  <p style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.6, margin: 0 }}>Pull requests welcome for translations, exercise content, and accessibility improvements.</p>
                </div>
              </div>
            </div>
          )}
          <PageNavigation currentPath="/transparency" />
        </div>
      </div>
    </>
  );
}
