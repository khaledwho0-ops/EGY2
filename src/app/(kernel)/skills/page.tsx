'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { PageNavigation } from '@/components/shared/page-navigation';

/* ── Skill Data ─────────────────────────────────────────────────────── */
interface SkillDimension {
  id: string;
  name: string;
  nameAr: string;
  icon: string;
  color: string;
  description: string;
  levels: string[];
  defaultScore: number;
}

const SKILLS: SkillDimension[] = [
  { id: 'critical-thinking', name: 'Critical Thinking', nameAr: 'التفكير النقدي', icon: '🧠', color: '#6366f1', description: 'Ability to analyze arguments, identify logical fallacies, and evaluate evidence quality. Based on the Paul-Elder Critical Thinking Framework.', levels: ['Novice', 'Developing', 'Competent', 'Proficient', 'Expert'], defaultScore: 3 },
  { id: 'statistical-literacy', name: 'Statistical Literacy', nameAr: 'الإلمام الإحصائي', icon: '📊', color: '#8b5cf6', description: 'Understanding of base rates, p-values, confidence intervals, and common statistical manipulations. Aligned with Gigerenzer\'s risk literacy framework.', levels: ['Aware', 'Basic', 'Intermediate', 'Advanced', 'Researcher'], defaultScore: 2 },
  { id: 'source-verification', name: 'Source Verification', nameAr: 'التحقق من المصادر', icon: '🔍', color: '#06b6d4', description: 'Skill in applying the SIFT method (Stop, Investigate, Find better coverage, Trace claims) to verify online information. Developed by Mike Caulfield.', levels: ['Unaware', 'Reactive', 'Systematic', 'Expert', 'Trainer'], defaultScore: 2 },
  { id: 'emotional-regulation', name: 'Emotional Regulation', nameAr: 'التنظيم العاطفي', icon: '💚', color: '#10b981', description: 'Capacity to recognize emotional triggers in media and maintain analytical composure. Based on Gross\'s Process Model of Emotion Regulation.', levels: ['Reactive', 'Aware', 'Managing', 'Regulated', 'Resilient'], defaultScore: 3 },
  { id: 'islamic-literacy', name: 'Islamic Literacy', nameAr: 'الثقافة الإسلامية', icon: '🕌', color: '#f59e0b', description: 'Understanding of authentic Islamic scholarship, hadith verification methodology (mustalah al-hadith), and distinguishing scholarly consensus from cultural practice.', levels: ['Beginner', 'Student', 'Intermediate', 'Advanced', 'Scholar'], defaultScore: 3 },
  { id: 'osint', name: 'OSINT', nameAr: 'الاستخبارات مفتوحة المصدر', icon: '🕵️', color: '#ef4444', description: 'Open Source Intelligence skills for digital investigation — reverse image search, geolocation, metadata analysis, and social media forensics.', levels: ['Unaware', 'Curious', 'Practitioner', 'Analyst', 'Expert'], defaultScore: 1 },
  { id: 'debate', name: 'Debate & Argumentation', nameAr: 'المناظرة والحجاج', icon: '⚔️', color: '#ec4899', description: 'Ability to construct and deconstruct arguments using Toulmin\'s model — claim, data, warrant, backing, qualifier, and rebuttal.', levels: ['Passive', 'Responsive', 'Structured', 'Persuasive', 'Master'], defaultScore: 2 },
  { id: 'media-literacy', name: 'Media Literacy', nameAr: 'الثقافة الإعلامية', icon: '📰', color: '#14b8a6', description: 'Competence in analyzing media messages, understanding editorial bias, recognizing propaganda techniques (Institute for Propaganda Analysis framework).', levels: ['Consumer', 'Questioning', 'Analytical', 'Critical', 'Creator'], defaultScore: 2 },
];

const STORAGE_KEY = 'egy-skills-assessment';
const BADGE_ICONS = ['🥉', '🥈', '🥇', '💎', '👑'];

function getLevel(score: number): number {
  return Math.min(Math.max(Math.floor(score) - 1, 0), 4);
}

export default function SkillsAssessmentPage() {
  const [scores, setScores] = useState<Record<string, number>>({});
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [showRadar, setShowRadar] = useState(true);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        setScores(JSON.parse(raw));
      } else {
        const defaults: Record<string, number> = {};
        SKILLS.forEach(s => { defaults[s.id] = s.defaultScore; });
        setScores(defaults);
      }
    } catch {
      const defaults: Record<string, number> = {};
      SKILLS.forEach(s => { defaults[s.id] = s.defaultScore; });
      setScores(defaults);
    }
  }, []);

  const saveScores = useCallback((updated: Record<string, number>) => {
    setScores(updated);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(updated)); } catch { /* noop */ }
  }, []);

  const updateScore = (id: string, val: number) => {
    const updated = { ...scores, [id]: val };
    saveScores(updated);
  };

  const totalScore = Object.values(scores).reduce((a, b) => a + b, 0);
  const maxTotal = SKILLS.length * 5;
  const overallPct = maxTotal ? Math.round((totalScore / maxTotal) * 100) : 0;

  // Radar chart math
  const radarSize = 300;
  const center = radarSize / 2;
  const maxRadius = 120;
  const numAxes = SKILLS.length;

  function polarToCartesian(angle: number, radius: number): [number, number] {
    const rad = ((angle - 90) * Math.PI) / 180;
    return [center + radius * Math.cos(rad), center + radius * Math.sin(rad)];
  }

  const angleStep = 360 / numAxes;

  const radarPoints = SKILLS.map((s, i) => {
    const score = scores[s.id] ?? s.defaultScore;
    const radius = (score / 5) * maxRadius;
    const angle = i * angleStep;
    return polarToCartesian(angle, radius);
  });

  const radarPath = radarPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p[0]} ${p[1]}`).join(' ') + ' Z';

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;
400;500;600;700;800;900&family=Cairo:wght@400;600;700;800&display=swap');
        .skills-page { min-height: 100vh; background: #020617; color: #e2e8f0; font-family: 'Inter', sans-serif; }
        .skills-container { max-width: 1200px; margin: 0 auto; padding: 40px 24px 80px; }
        .skills-header { text-align: center; margin-bottom: 40px; position: relative; }
        .skills-header::before { content: ''; position: absolute; top: -60px; left: 50%; transform: translateX(-50%); width: 700px; height: 500px; background: radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 65%); pointer-events: none; }
        .skills-header h1 { font-size: 48px; font-weight: 900; background: linear-gradient(135deg, #a78bfa, #8b5cf6, #7c3aed); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin: 0 0 8px; position: relative; }
        .skills-header .ar { font-family: 'Cairo', sans-serif; font-size: 22px; color: #94a3b8; direction: rtl; margin: 0 0 16px; position: relative; }
        .glow-line { height: 2px; background: linear-gradient(90deg, transparent, #8b5cf6, #a78bfa, #8b5cf6, transparent); margin: 20px auto; max-width: 400px; }
        .overall-bar { background: rgba(15,23,42,0.8); backdrop-filter: blur(12px); border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; padding: 24px; margin-bottom: 24px; display: flex; align-items: center; gap: 24px; flex-wrap: wrap; }
        .overall-circle { width: 80px; height: 80px; border-radius: 50%; border: 3px solid #8b5cf6; display: flex; align-items: center; justify-content: center; flex-direction: column; flex-shrink: 0; }
        .toggle-row { display: flex; gap: 8px; margin-bottom: 24px; justify-content: center; }
        .toggle-btn { padding: 8px 18px; border-radius: 10px; border: 1px solid rgba(255,255,255,0.1); background: rgba(15,23,42,0.6); color: #94a3b8; font-size: 13px; font-weight: 600; cursor: pointer; transition: all 0.3s; }
        .toggle-btn.active { background: rgba(139,92,246,0.15); border-color: rgba(139,92,246,0.4); color: #c4b5fd; }
        .radar-wrap { display: flex; justify-content: center; margin-bottom: 32px; }
        .glass-card { background: rgba(15,23,42,0.8); backdrop-filter: blur(12px); border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; padding: 24px; margin-bottom: 12px; transition: all 0.3s; cursor: pointer; }
        .glass-card:hover { border-color: rgba(139,92,246,0.3); transform: translateY(-1px); box-shadow: 0 8px 32px rgba(0,0,0,0.3); }
        .glass-card.selected { border-color: rgba(139,92,246,0.5); box-shadow: 0 0 30px rgba(139,92,246,0.1); }
        .skill-row { display: flex; align-items: center; gap: 16px; flex-wrap: wrap; }
        .skill-icon { font-size: 28px; width: 44px; height: 44px; display: flex; align-items: center; justify-content: center; background: rgba(255,255,255,0.04); border-radius: 12px; flex-shrink: 0; }
        .skill-info { flex: 1; min-width: 200px; }
        .skill-name { font-weight: 700; color: #f1f5f9; font-size: 15px; }
        .skill-name-ar { font-family: 'Cairo', sans-serif; color: #64748b; font-size: 12px; direction: rtl; }
        .progress-track { height: 8px; background: rgba(255,255,255,0.06); border-radius: 4px; overflow: hidden; margin-top: 6px; }
        .progress-fill { height: 100%; border-radius: 4px; transition: width 0.5s ease; }
        .badge { padding: 4px 12px; border-radius: 20px; font-size: 11px; font-weight: 700; display: inline-flex; align-items: center; gap: 4px; white-space: nowrap; }
        .skill-detail { margin-top: 16px; padding: 16px; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06); border-radius: 12px; }
        .level-dots { display: flex; gap: 8px; margin-top: 10px; }
        .level-dot { width: 32px; height: 32px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 14px; transition: all 0.2s; cursor: pointer; border: 1px solid rgba(255,255,255,0.08); }
        .level-dot:hover { transform: scale(1.15); }
        .level-dot.filled { border-color: rgba(139,92,246,0.4); }
        .back-link { display: inline-flex; align-items: center; gap: 8px; color: #8b5cf6; text-decoration: none; font-size: 14px; font-weight: 600; margin-bottom: 24px; transition: all 0.2s; }
        .back-link:hover { color: #a78bfa; gap: 10px; }
        .skills-grid { display: grid; gap: 12px; }
        @media (max-width: 768px) { .skills-header h1 { font-size: 32px; } .overall-bar { flex-direction: column; text-align: center; } }
      `}</style>
      <div className="skills-page">
        <div className="skills-container">
          <Link href="/explore" className="back-link">← Back to Explore</Link>

          <div className="skills-header">
            <h1>Skills Assessment</h1>
            <p className="ar" style={{ fontFamily: 'Cairo, sans-serif' }}>تقييم المهارات المعرفية</p>
            <div className="glow-line" />
            <p style={{ color: '#64748b', fontSize: 14, maxWidth: 650, margin: '0 auto', lineHeight: 1.7, position: 'relative' }}>
              Self-assess across 8 cognitive defense dimensions. Based on frameworks from the
              Stanford History Education Group, Cambridge Analytical Thinking Assessment, and
              UNESCO Media & Information Literacy curriculum.
            </p>
          </div>

          {/* Overall Score */}
          <div className="overall-bar">
            <div className="overall-circle">
              <span style={{ fontSize: 24, fontWeight: 900, color: '#c4b5fd' }}>{overallPct}%</span>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, color: '#f1f5f9', fontSize: 16, marginBottom: 6 }}>Overall Skill Profile</div>
              <div style={{ height: 10, background: 'rgba(255,255,255,0.06)', borderRadius: 5, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${overallPct}%`, background: 'linear-gradient(90deg, #8b5cf6, #6366f1, #a78bfa)', borderRadius: 5, transition: 'width 0.6s' }} />
              </div>
              <div style={{ color: '#64748b', fontSize: 12, marginTop: 4 }}>{totalScore} / {maxTotal} total points across {SKILLS.length} dimensions</div>
            </div>
          </div>

          {/* Toggle */}
          <div className="toggle-row">
            <button className={`toggle-btn ${showRadar ? 'active' : ''}`} onClick={() => setShowRadar(true)}>🕸️ Radar Chart</button>
            <button className={`toggle-btn ${!showRadar ? 'active' : ''}`} onClick={() => setShowRadar(false)}>📊 Progress Bars</button>
          </div>

          {/* Radar Chart */}
          {showRadar && (
            <div className="radar-wrap">
              <svg width={radarSize} height={radarSize} viewBox={`0 0 ${radarSize} ${radarSize}`}>
                {/* Grid circles */}
                {[1, 2, 3, 4, 5].map(level => {
                  const r = (level / 5) * maxRadius;
                  const points = Array.from({ length: numAxes }, (_, i) => {
                    const [x, y] = polarToCartesian(i * angleStep, r);
                    return `${x},${y}`;
                  }).join(' ');
                  return <polygon key={level} points={points} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={1} />;
                })}
                {/* Axis lines */}
                {SKILLS.map((s, i) => {
                  const [x, y] = polarToCartesian(i * angleStep, maxRadius + 8);
                  return <line key={s.id} x1={center} y1={center} x2={x} y2={y} stroke="rgba(255,255,255,0.08)" strokeWidth={1} />;
                })}
                {/* Labels */}
                {SKILLS.map((s, i) => {
                  const [x, y] = polarToCartesian(i * angleStep, maxRadius + 28);
                  return <text key={s.id} x={x} y={y} textAnchor="middle" dominantBaseline="middle" fill={s.color} fontSize={10} fontWeight={700}>{s.icon} {s.name.split(' ')[0]}</text>;
                })}
                {/* Data polygon */}
                <polygon points={radarPoints.map(p => p.join(',')).join(' ')} fill="rgba(139,92,246,0.15)" stroke="#8b5cf6" strokeWidth={2} />
                {/* Data dots */}
                {radarPoints.map((p, i) => (
                  <circle key={i} cx={p[0]} cy={p[1]} r={4} fill={SKILLS[i].color} stroke="#020617" strokeWidth={2} />
                ))}
              </svg>
            </div>
          )}

          {/* Skills List */}
          <div className="skills-grid">
            {SKILLS.map(skill => {
              const score = scores[skill.id] ?? skill.defaultScore;
              const level = getLevel(score);
              const isSelected = selectedSkill === skill.id;
              return (
                <div key={skill.id} className={`glass-card ${isSelected ? 'selected' : ''}`} onClick={() => setSelectedSkill(isSelected ? null : skill.id)}>
                  <div className="skill-row">
                    <div className="skill-icon">{skill.icon}</div>
                    <div className="skill-info">
                      <div className="skill-name">{skill.name}</div>
                      <div className="skill-name-ar">{skill.nameAr}</div>
                      <div className="progress-track">
                        <div className="progress-fill" style={{ width: `${(score / 5) * 100}%`, background: `linear-gradient(90deg, ${skill.color}88, ${skill.color})` }} />
                      </div>
                    </div>
                    <div style={{ textAlign: 'center' as const }}>
                      <span style={{ fontSize: 20 }}>{BADGE_ICONS[level]}</span>
                      <div className="badge" style={{ background: `${skill.color}22`, color: skill.color, border: `1px solid ${skill.color}44`, marginTop: 4 }}>
                        {skill.levels[level]}
                      </div>
                    </div>
                    <div style={{ fontWeight: 900, fontSize: 24, color: skill.color, minWidth: 40, textAlign: 'center' as const }}>{score}/5</div>
                  </div>

                  {isSelected && (
                    <div className="skill-detail">
                      <p style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.7, margin: '0 0 12px' }}>{skill.description}</p>
                      <div style={{ fontWeight: 600, color: '#c4b5fd', fontSize: 12, marginBottom: 8 }}>Adjust Your Level:</div>
                      <div className="level-dots">
                        {skill.levels.map((lbl, i) => (
                          <button
                            key={i}
                            className={`level-dot ${i + 1 <= score ? 'filled' : ''}`}
                            style={{ background: i + 1 <= score ? `${skill.color}33` : 'rgba(255,255,255,0.03)' }}
                            onClick={(e) => { e.stopPropagation(); updateScore(skill.id, i + 1); }}
                            title={lbl}
                          >
                            {BADGE_ICONS[i]}
                          </button>
                        ))}
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
                        {skill.levels.map((lbl, i) => (
                          <span key={i} style={{ fontSize: 9, color: i === level ? skill.color : '#475569', fontWeight: i === level ? 700 : 400, flex: 1, textAlign: 'center' as const }}>{lbl}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <PageNavigation currentPath="/skills" />
        </div>
      </div>
    </>
  );
}
