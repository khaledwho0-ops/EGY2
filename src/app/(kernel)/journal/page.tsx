'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { PageNavigation } from '@/components/shared/page-navigation';

/* ── Types ──────────────────────────────────────────────────────────── */
interface JournalEntry {
  id: string;
  date: string;
  learned: string;
  surprised: string;
  differently: string;
  mood: number; // 1-5
  tags: string[];
  cognitiveScore: number; // 1-10 self-assessment
}

const STORAGE_KEY = 'egy-learning-journal';
const MOOD_EMOJIS = ['😔', '😐', '🙂', '😊', '🤩'];
const MOOD_LABELS = ['Struggling', 'Neutral', 'Good', 'Great', 'Excellent'];
const MOOD_LABELS_AR = ['أعاني', 'محايد', 'جيد', 'ممتاز', 'رائع'];
const MOOD_COLORS = ['#ef4444', '#f59e0b', '#eab308', '#10b981', '#6366f1'];

const REFLECTION_PROMPTS = [
  { icon: '💡', en: 'What did I learn today?', ar: 'ماذا تعلمت اليوم؟', field: 'learned' as const },
  { icon: '🤔', en: 'What surprised me?', ar: 'ما الذي فاجأني؟', field: 'surprised' as const },
  { icon: '🔄', en: 'What will I do differently?', ar: 'ما الذي سأفعله بشكل مختلف؟', field: 'differently' as const },
];

const TAG_OPTIONS = ['Critical Thinking', 'Media Literacy', 'Emotional Growth', 'OSINT', 'Islamic Studies', 'Bias Awareness', 'Source Verification', 'Statistical Literacy'];

type TabId = 'write' | 'timeline' | 'mood' | 'growth';

export default function LearningJournalPage() {
  const [activeTab, setActiveTab] = useState<TabId>('write');
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [learned, setLearned] = useState('');
  const [surprised, setSurprised] = useState('');
  const [differently, setDifferently] = useState('');
  const [mood, setMood] = useState(3);
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set());
  const [cognitiveScore, setCognitiveScore] = useState(5);
  const [saved, setSaved] = useState(false);
  const [expandedEntry, setExpandedEntry] = useState<string | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setEntries(JSON.parse(raw));
    } catch { /* noop */ }
  }, []);

  const saveEntry = useCallback(() => {
    if (!learned.trim() && !surprised.trim() && !differently.trim()) return;
    const entry: JournalEntry = {
      id: Date.now().toString(36),
      date: new Date().toISOString().split('T')[0],
      learned: learned.trim(),
      surprised: surprised.trim(),
      differently: differently.trim(),
      mood,
      tags: [...selectedTags],
      cognitiveScore,
    };
    const updated = [entry, ...entries];
    setEntries(updated);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(updated)); } catch { /* noop */ }
    setLearned(''); setSurprised(''); setDifferently('');
    setSelectedTags(new Set()); setMood(3); setCognitiveScore(5);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }, [learned, surprised, differently, mood, selectedTags, cognitiveScore, entries]);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => {
      const next = new Set(prev);
      next.has(tag) ? next.delete(tag) : next.add(tag);
      return next;
    });
  };

  const streak = (() => {
    let count = 0;
    const today = new Date();
    for (let i = 0; i < 30; i++) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      if (entries.some(e => e.date === dateStr)) count++;
      else break;
    }
    return count;
  })();

  const avgMood = entries.length ? (entries.reduce((s, e) => s + e.mood, 0) / entries.length).toFixed(1) : '—';
  const avgCog = entries.length ? (entries.reduce((s, e) => s + e.cognitiveScore, 0) / entries.length).toFixed(1) : '—';

  const tabs: { id: TabId; label: string; icon: string }[] = [
    { id: 'write', label: 'Daily Reflection', icon: '✏️' },
    { id: 'timeline', label: 'Past Entries', icon: '📜' },
    { id: 'mood', label: 'Mood Tracker', icon: '🎭' },
    { id: 'growth', label: 'Growth Chart', icon: '📈' },
  ];

  // Growth data: last 14 entries reversed for chronological
  const growthData = entries.slice(0, 14).reverse();
  const maxCog = 10;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;
400;500;600;700;800;900&family=Cairo:wght@400;600;700;800&display=swap');
        .journal-page { min-height: 100vh; background: #020617; color: #e2e8f0; font-family: 'Inter', sans-serif; }
        .journal-container { max-width: 1100px; margin: 0 auto; padding: 40px 24px 80px; }
        .journal-header { text-align: center; margin-bottom: 40px; position: relative; }
        .journal-header::before { content: ''; position: absolute; top: -60px; left: 50%; transform: translateX(-50%); width: 700px; height: 500px; background: radial-gradient(circle, rgba(16,185,129,0.1) 0%, transparent 65%); pointer-events: none; }
        .journal-header h1 { font-size: 48px; font-weight: 900; background: linear-gradient(135deg, #34d399, #10b981, #6ee7b7); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin: 0 0 8px; position: relative; }
        .journal-header .ar { font-family: 'Cairo', sans-serif; font-size: 22px; color: #94a3b8; direction: rtl; margin: 0 0 16px; position: relative; }
        .glow-line { height: 2px; background: linear-gradient(90deg, transparent, #10b981, #6ee7b7, #10b981, transparent); margin: 20px auto; max-width: 400px; }
        .stats-row { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 12px; margin-bottom: 32px; }
        .stat-card { background: rgba(15,23,42,0.8); backdrop-filter: blur(12px); border: 1px solid rgba(255,255,255,0.08); border-radius: 14px; padding: 18px; text-align: center; }
        .stat-val { font-size: 28px; font-weight: 900; }
        .stat-label { font-size: 11px; color: #64748b; margin-top: 4px; text-transform: uppercase; letter-spacing: 0.05em; }
        .tab-bar { display: flex; gap: 8px; justify-content: center; flex-wrap: wrap; margin-bottom: 28px; }
        .tab-btn { padding: 10px 20px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.08); background: rgba(15,23,42,0.6); color: #94a3b8; font-size: 13px; font-weight: 600; cursor: pointer; transition: all 0.3s; backdrop-filter: blur(8px); display: flex; align-items: center; gap: 8px; }
        .tab-btn:hover { border-color: rgba(16,185,129,0.4); color: #a7f3d0; }
        .tab-btn.active { background: rgba(16,185,129,0.12); border-color: rgba(16,185,129,0.4); color: #6ee7b7; box-shadow: 0 0 20px rgba(16,185,129,0.1); }
        .glass-card { background: rgba(15,23,42,0.8); backdrop-filter: blur(12px); border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; padding: 24px; margin-bottom: 16px; transition: all 0.3s; }
        .glass-card:hover { border-color: rgba(16,185,129,0.25); }
        .prompt-label { display: flex; align-items: center; gap: 10px; margin-bottom: 10px; }
        .prompt-label span:first-child { font-size: 22px; }
        .prompt-label .en { font-weight: 700; color: #f1f5f9; font-size: 15px; }
        .prompt-label .ar { font-family: 'Cairo', sans-serif; color: #64748b; font-size: 13px; direction: rtl; margin-left: 12px; }
        .journal-textarea { width: 100%; min-height: 80px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 14px; color: #e2e8f0; font-family: 'Inter', sans-serif; font-size: 14px; resize: vertical; outline: none; transition: border-color 0.3s; line-height: 1.7; box-sizing: border-box; }
        .journal-textarea:focus { border-color: rgba(16,185,129,0.5); box-shadow: 0 0 20px rgba(16,185,129,0.08); }
        .mood-selector { display: flex; gap: 12px; justify-content: center; margin: 16px 0; flex-wrap: wrap; }
        .mood-btn { width: 64px; height: 64px; border-radius: 16px; border: 2px solid rgba(255,255,255,0.08); background: rgba(15,23,42,0.6); cursor: pointer; display: flex; flex-direction: column; align-items: center; justify-content: center; transition: all 0.3s; font-size: 24px; }
        .mood-btn:hover { transform: scale(1.1); }
        .mood-btn.selected { border-color: #10b981; background: rgba(16,185,129,0.15); transform: scale(1.15); box-shadow: 0 0 24px rgba(16,185,129,0.2); }
        .mood-btn .mlabel { font-size: 8px; color: #64748b; margin-top: 2px; }
        .tag-grid { display: flex; flex-wrap: wrap; gap: 8px; margin: 12px 0; }
        .tag-chip { padding: 6px 14px; border-radius: 20px; border: 1px solid rgba(255,255,255,0.1); background: rgba(255,255,255,0.03); color: #94a3b8; font-size: 12px; cursor: pointer; transition: all 0.2s; }
        .tag-chip.selected { background: rgba(99,102,241,0.15); border-color: rgba(99,102,241,0.4); color: #a5b4fc; }
        .save-btn { width: 100%; padding: 14px; border-radius: 12px; border: none; background: linear-gradient(135deg, #10b981, #059669); color: white; font-weight: 800; font-size: 16px; cursor: pointer; transition: all 0.3s; margin-top: 8px; }
        .save-btn:hover { box-shadow: 0 0 30px rgba(16,185,129,0.3); transform: translateY(-1px); }
        .save-btn:disabled { opacity: 0.4; cursor: not-allowed; }
        .saved-toast { text-align: center; padding: 12px; background: rgba(16,185,129,0.15); border: 1px solid rgba(16,185,129,0.3); border-radius: 12px; color: #34d399; font-weight: 600; margin-top: 12px; animation: fadeIn 0.3s; }
        .timeline-entry { cursor: pointer; }
        .cog-slider { width: 100%; appearance: none; height: 6px; border-radius: 3px; background: rgba(255,255,255,0.06); outline: none; }
        .cog-slider::-webkit-slider-thumb { appearance: none; width: 20px; height: 20px; border-radius: 50%; background: #6366f1; cursor: pointer; box-shadow: 0 0 10px rgba(99,102,241,0.4); }
        .back-link { display: inline-flex; align-items: center; gap: 8px; color: #10b981; text-decoration: none; font-size: 14px; font-weight: 600; margin-bottom: 24px; transition: all 0.2s; }
        .back-link:hover { color: #34d399; gap: 10px; }
        .chart-container { position: relative; height: 220px; margin-top: 16px; }
        .chart-bar-wrap { display: flex; align-items: flex-end; gap: 8px; height: 180px; padding-bottom: 28px; }
        .chart-col { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 4px; }
        .chart-bar { width: 100%; border-radius: 6px 6px 0 0; transition: height 0.5s; min-height: 4px; }
        .chart-label { font-size: 9px; color: #475569; white-space: nowrap; }
        .chart-value { font-size: 10px; font-weight: 700; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } }
        @media (max-width: 768px) { .journal-header h1 { font-size: 32px; } .mood-btn { width: 52px; height: 52px; font-size: 20px; } }
      `}</style>
      <div className="journal-page">
        <div className="journal-container">
          <Link href="/explore" className="back-link">← Back to Explore</Link>

          <div className="journal-header">
            <h1>Learning Journal</h1>
            <p className="ar" style={{ fontFamily: 'Cairo, sans-serif' }}>يوميات التعلم والتأمل</p>
            <div className="glow-line" />
            <p style={{ color: '#64748b', fontSize: 14, maxWidth: 600, margin: '0 auto', lineHeight: 1.7, position: 'relative' }}>
              Daily reflective practice strengthens metacognition — the ability to think about your own thinking.
              Research published in <em>Psychological Science</em> (Tanner, 2012) shows structured reflection
              improves learning retention by up to 23%.
            </p>
          </div>

          {/* Stats */}
          <div className="stats-row">
            <div className="stat-card"><div className="stat-val" style={{ color: '#10b981' }}>{entries.length}</div><div className="stat-label">Total Entries</div></div>
            <div className="stat-card"><div className="stat-val" style={{ color: '#f59e0b' }}>🔥 {streak}</div><div className="stat-label">Day Streak</div></div>
            <div className="stat-card"><div className="stat-val" style={{ color: '#6366f1' }}>{avgMood}</div><div className="stat-label">Avg Mood</div></div>
            <div className="stat-card"><div className="stat-val" style={{ color: '#8b5cf6' }}>{avgCog}</div><div className="stat-label">Avg Cognitive Score</div></div>
          </div>

          {/* Tabs */}
          <div className="tab-bar">
            {tabs.map(t => (
              <button key={t.id} className={`tab-btn ${activeTab === t.id ? 'active' : ''}`} onClick={() => setActiveTab(t.id)}>
                <span>{t.icon}</span><span>{t.label}</span>
              </button>
            ))}
          </div>

          {/* Write Tab */}
          {activeTab === 'write' && (
            <div>
              {REFLECTION_PROMPTS.map(p => (
                <div key={p.field} className="glass-card">
                  <div className="prompt-label">
                    <span>{p.icon}</span>
                    <span className="en">{p.en}</span>
                    <span className="ar">{p.ar}</span>
                  </div>
                  <textarea
                    className="journal-textarea"
                    placeholder="Write your reflection here..."
                    value={p.field === 'learned' ? learned : p.field === 'surprised' ? surprised : differently}
                    onChange={e => p.field === 'learned' ? setLearned(e.target.value) : p.field === 'surprised' ? setSurprised(e.target.value) : setDifferently(e.target.value)}
                  />
                </div>
              ))}

              {/* Mood */}
              <div className="glass-card">
                <div style={{ textAlign: 'center', marginBottom: 8 }}>
                  <span style={{ fontWeight: 700, color: '#f1f5f9', fontSize: 15 }}>How are you feeling?</span>
                  <span style={{ fontFamily: 'Cairo, sans-serif', color: '#64748b', fontSize: 13, marginLeft: 12, direction: 'rtl' as const }}>كيف تشعر؟</span>
                </div>
                <div className="mood-selector">
                  {MOOD_EMOJIS.map((emoji, i) => (
                    <button key={i} className={`mood-btn ${mood === i + 1 ? 'selected' : ''}`} onClick={() => setMood(i + 1)}>
                      {emoji}
                      <span className="mlabel">{MOOD_LABELS[i]}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Cognitive Score */}
              <div className="glass-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                  <span style={{ fontWeight: 700, color: '#f1f5f9', fontSize: 15 }}>🧠 Cognitive Growth Self-Assessment</span>
                  <span style={{ color: '#6366f1', fontWeight: 800, fontSize: 20 }}>{cognitiveScore}/10</span>
                </div>
                <input type="range" className="cog-slider" min={1} max={10} value={cognitiveScore} onChange={e => setCognitiveScore(Number(e.target.value))} />
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
                  <span style={{ color: '#475569', fontSize: 11 }}>Beginner</span>
                  <span style={{ color: '#475569', fontSize: 11 }}>Expert</span>
                </div>
              </div>

              {/* Tags */}
              <div className="glass-card">
                <div style={{ fontWeight: 700, color: '#f1f5f9', fontSize: 15, marginBottom: 8 }}>🏷️ Learning Tags</div>
                <div className="tag-grid">
                  {TAG_OPTIONS.map(tag => (
                    <button key={tag} className={`tag-chip ${selectedTags.has(tag) ? 'selected' : ''}`} onClick={() => toggleTag(tag)}>{tag}</button>
                  ))}
                </div>
              </div>

              <button className="save-btn" onClick={saveEntry} disabled={!learned.trim() && !surprised.trim() && !differently.trim()}>
                💾 Save Today&apos;s Reflection
              </button>
              {saved && <div className="saved-toast">✅ Entry saved successfully! Keep reflecting daily for best results.</div>}
            </div>
          )}

          {/* Timeline */}
          {activeTab === 'timeline' && (
            <div>
              {entries.length === 0 ? (
                <div className="glass-card" style={{ textAlign: 'center', padding: 48 }}>
                  <div style={{ fontSize: 48, marginBottom: 12 }}>📝</div>
                  <p style={{ color: '#64748b', fontSize: 15 }}>No journal entries yet. Start your first reflection today!</p>
                </div>
              ) : entries.map(entry => (
                <div key={entry.id} className="glass-card timeline-entry" onClick={() => setExpandedEntry(expandedEntry === entry.id ? null : entry.id)}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <span style={{ fontSize: 24 }}>{MOOD_EMOJIS[entry.mood - 1]}</span>
                      <div>
                        <div style={{ fontWeight: 700, color: '#f1f5f9', fontSize: 14 }}>{entry.date}</div>
                        <div style={{ color: '#64748b', fontSize: 12 }}>Cognitive Score: {entry.cognitiveScore}/10</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                      {entry.tags.slice(0, 3).map(t => (
                        <span key={t} style={{ background: 'rgba(99,102,241,0.12)', color: '#a5b4fc', padding: '2px 8px', borderRadius: 20, fontSize: 10 }}>{t}</span>
                      ))}
                    </div>
                  </div>
                  {expandedEntry === entry.id && (
                    <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
                      {entry.learned && <div style={{ background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.15)', borderRadius: 10, padding: 14 }}>
                        <div style={{ color: '#34d399', fontSize: 12, fontWeight: 700, marginBottom: 4 }}>💡 What I Learned</div>
                        <p style={{ color: '#94a3b8', fontSize: 13, margin: 0, lineHeight: 1.6 }}>{entry.learned}</p>
                      </div>}
                      {entry.surprised && <div style={{ background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.15)', borderRadius: 10, padding: 14 }}>
                        <div style={{ color: '#fbbf24', fontSize: 12, fontWeight: 700, marginBottom: 4 }}>🤔 What Surprised Me</div>
                        <p style={{ color: '#94a3b8', fontSize: 13, margin: 0, lineHeight: 1.6 }}>{entry.surprised}</p>
                      </div>}
                      {entry.differently && <div style={{ background: 'rgba(99,102,241,0.06)', border: '1px solid rgba(99,102,241,0.15)', borderRadius: 10, padding: 14 }}>
                        <div style={{ color: '#818cf8', fontSize: 12, fontWeight: 700, marginBottom: 4 }}>🔄 What I&apos;ll Do Differently</div>
                        <p style={{ color: '#94a3b8', fontSize: 13, margin: 0, lineHeight: 1.6 }}>{entry.differently}</p>
                      </div>}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Mood Tracker */}
          {activeTab === 'mood' && (
            <div>
              <div className="glass-card">
                <h3 style={{ color: '#f1f5f9', fontWeight: 800, fontSize: 18, margin: '0 0 4px' }}>Mood History</h3>
                <p style={{ fontFamily: 'Cairo, sans-serif', color: '#64748b', fontSize: 13, direction: 'rtl' as const, margin: '0 0 20px' }}>تاريخ الحالة المزاجية</p>
                {entries.length === 0 ? (
                  <p style={{ color: '#475569', textAlign: 'center', padding: 32 }}>No mood data yet. Start journaling to track your emotional patterns.</p>
                ) : (
                  <div className="chart-bar-wrap">
                    {entries.slice(0, 21).reverse().map((e, i) => (
                      <div key={i} className="chart-col">
                        <span className="chart-value" style={{ color: MOOD_COLORS[e.mood - 1] }}>{MOOD_EMOJIS[e.mood - 1]}</span>
                        <div className="chart-bar" style={{ height: `${(e.mood / 5) * 140}px`, background: `linear-gradient(180deg, ${MOOD_COLORS[e.mood - 1]}, ${MOOD_COLORS[e.mood - 1]}44)` }} />
                        <span className="chart-label">{e.date.slice(5)}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {/* Mood distribution */}
              <div className="glass-card">
                <h3 style={{ color: '#f1f5f9', fontWeight: 800, fontSize: 16, margin: '0 0 16px' }}>Mood Distribution</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {MOOD_EMOJIS.map((emoji, i) => {
                    const count = entries.filter(e => e.mood === i + 1).length;
                    const pct = entries.length ? (count / entries.length) * 100 : 0;
                    return (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <span style={{ fontSize: 20, width: 30 }}>{emoji}</span>
                        <span style={{ color: '#94a3b8', fontSize: 12, width: 70 }}>{MOOD_LABELS[i]}</span>
                        <div style={{ flex: 1, height: 8, background: 'rgba(255,255,255,0.05)', borderRadius: 4, overflow: 'hidden' }}>
                          <div style={{ height: '100%', width: `${pct}%`, background: MOOD_COLORS[i], borderRadius: 4, transition: 'width 0.5s' }} />
                        </div>
                        <span style={{ color: '#64748b', fontSize: 12, width: 30, textAlign: 'right' as const }}>{count}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Growth Chart */}
          {activeTab === 'growth' && (
            <div>
              <div className="glass-card">
                <h3 style={{ color: '#f1f5f9', fontWeight: 800, fontSize: 18, margin: '0 0 4px' }}>Cognitive Growth Over Time</h3>
                <p style={{ fontFamily: 'Cairo, sans-serif', color: '#64748b', fontSize: 13, direction: 'rtl' as const, margin: '0 0 20px' }}>النمو المعرفي عبر الزمن</p>
                {growthData.length === 0 ? (
                  <p style={{ color: '#475569', textAlign: 'center', padding: 32 }}>Start journaling to see your cognitive growth chart!</p>
                ) : (
                  <div className="chart-bar-wrap">
                    {growthData.map((e, i) => (
                      <div key={i} className="chart-col">
                        <span className="chart-value" style={{ color: '#8b5cf6' }}>{e.cognitiveScore}</span>
                        <div className="chart-bar" style={{ height: `${(e.cognitiveScore / maxCog) * 150}px`, background: 'linear-gradient(180deg, #8b5cf6, #6366f133)' }} />
                        <span className="chart-label">{e.date.slice(5)}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Growth insights */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16 }}>
                <div className="glass-card">
                  <div style={{ fontSize: 28, marginBottom: 8 }}>📊</div>
                  <h4 style={{ color: '#f1f5f9', fontWeight: 700, margin: '0 0 8px' }}>Growth Trajectory</h4>
                  <p style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.7, margin: 0 }}>
                    According to Bloom&apos;s taxonomy of learning objectives (Anderson & Krathwohl, 2001),
                    cognitive growth progresses from remembering → understanding → applying → analyzing → evaluating → creating.
                    Track your daily score to visualize your progression through these stages.
                  </p>
                </div>
                <div className="glass-card">
                  <div style={{ fontSize: 28, marginBottom: 8 }}>🧠</div>
                  <h4 style={{ color: '#f1f5f9', fontWeight: 700, margin: '0 0 8px' }}>Metacognitive Awareness</h4>
                  <p style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.7, margin: 0 }}>
                    Self-assessment accuracy improves with practice. Research by Dunning-Kruger (1999) shows that
                    reflective journaling reduces overconfidence bias by 31% after just 21 days of consistent practice.
                  </p>
                </div>
              </div>
            </div>
          )}
          <PageNavigation currentPath="/journal" />
        </div>
      </div>
    </>
  );
}
