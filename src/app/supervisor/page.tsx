'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { PageNavigation } from '@/components/shared/page-navigation';
import { useRTL } from '@/components/shared/rtl-provider';

const students = [
  { name: 'Ahmed Hassan', nameAr: 'أحمد حسن', progress: 92, score: 88, risk: false, module: 'Day 128/144', streak: 45 },
  { name: 'Fatima Al-Sayed', nameAr: 'فاطمة السيد', progress: 87, score: 91, risk: false, module: 'Day 120/144', streak: 38 },
  { name: 'Omar Ibrahim', nameAr: 'عمر إبراهيم', progress: 74, score: 72, risk: false, module: 'Day 106/144', streak: 22 },
  { name: 'Nour El-Din', nameAr: 'نور الدين', progress: 45, score: 48, risk: true, module: 'Day 65/144', streak: 3 },
  { name: 'Sara Mohamed', nameAr: 'سارة محمد', progress: 95, score: 94, risk: false, module: 'Day 137/144', streak: 52 },
  { name: 'Youssef Kamal', nameAr: 'يوسف كمال', progress: 68, score: 63, risk: false, module: 'Day 98/144', streak: 15 },
  { name: 'Layla Mostafa', nameAr: 'ليلى مصطفى', progress: 33, score: 35, risk: true, module: 'Day 48/144', streak: 0 },
  { name: 'Khaled Adel', nameAr: 'خالد عادل', progress: 81, score: 79, risk: false, module: 'Day 117/144', streak: 30 },
  { name: 'Mariam Tarek', nameAr: 'مريم طارق', progress: 56, score: 52, risk: true, module: 'Day 81/144', streak: 7 },
  { name: 'Ali Mahmoud', nameAr: 'علي محمود', progress: 89, score: 86, risk: false, module: 'Day 129/144', streak: 41 },
];

const metrics = [
  { label: 'Average Score', labelAr: 'متوسط الدرجات', value: '70.8%', icon: '📊', color: 'var(--accent-blue)' },
  { label: 'Completion Rate', labelAr: 'معدل الإكمال', value: '72%', icon: '✅', color: 'var(--accent-emerald)' },
  { label: 'At-Risk Students', labelAr: 'الطلاب المعرضون للخطر', value: '3/10', icon: '⚠️', color: 'var(--accent-red)' },
  { label: 'SCORM Compliance', labelAr: 'توافق SCORM', value: '96.4%', icon: '📋', color: 'var(--accent-purple)' },
  { label: 'xAPI Events/Day', labelAr: 'أحداث xAPI/يوم', value: '2,847', icon: '📡', color: 'var(--accent-amber)' },
  { label: 'Avg. Session Time', labelAr: 'متوسط مدة الجلسة', value: '34 min', icon: '⏱️', color: 'var(--accent-deepreal)' },
];

type DateRange = '7d' | '30d' | '90d' | 'all';

export default function SupervisorPage() {
  const { isRTL } = useRTL();
  const [dateRange, setDateRange] = useState<DateRange>('30d');
  const [sortBy, setSortBy] = useState<'name' | 'progress' | 'score'>('progress');
  const [showExportMenu, setShowExportMenu] = useState(false);

  const sorted = [...students].sort((a, b) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    if (sortBy === 'score') return b.score - a.score;
    return b.progress - a.progress;
  });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Cairo:wght@400;600;700;800&display=swap');
        @keyframes supFadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes supPulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
        .sup-metric-card:hover { transform: translateY(-4px); box-shadow: 0 12px 40px rgba(0,0,0,0.3); }
        .sup-student-row:hover { background: var(--accent-blue-surface, rgba(59,130,246,0.08)) !important; }
        .sup-btn:hover { background: var(--bg-elevated) !important; }
        .sup-export-btn:hover { background: var(--accent-blue-surface, rgba(59,130,246,0.2)) !important; }
        .sup-date-active { background: var(--accent-blue-surface, rgba(59,130,246,0.3)) !important; border-color: var(--accent-blue) !important; }
      `}</style>
      <main style={{ minHeight: '100vh', background: 'var(--bg-page)', color: 'var(--text-primary)', fontFamily: 'Inter, sans-serif', padding: '40px 24px 80px' }} dir={isRTL ? 'rtl' : 'ltr'}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          {/* Header */}
          <header style={{ marginBottom: 48, animation: 'supFadeIn 0.6s ease-out' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 8 }}>
                  <div style={{
                    width: 56, height: 56, borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: 'linear-gradient(135deg, var(--accent-emerald), var(--accent-blue))', fontSize: 28,
                    boxShadow: '0 0 30px var(--accent-mentalhealth-glow)',
                  }}>👨‍🏫</div>
                  <div>
                    <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 900, margin: 0, background: 'linear-gradient(135deg, var(--accent-emerald), var(--accent-blue))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                      {isRTL ? 'لوحة تحكم المشرف' : 'Supervisor Dashboard'}
                    </h1>
                    <p style={{ fontFamily: 'Cairo, sans-serif', color: 'var(--text-muted)', direction: 'rtl', margin: 0, fontSize: '1rem', fontWeight: 600 }}>
                      لوحة تحكم المشرف المؤسسي
                    </p>
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
                {/* Date Range Selector */}
                {(['7d', '30d', '90d', 'all'] as DateRange[]).map(r => (
                  <button key={r} className={dateRange === r ? 'sup-date-active' : 'sup-btn'} onClick={() => setDateRange(r)} style={{
                    padding: '8px 16px', borderRadius: 8, border: '1px solid var(--border-primary)',
                    background: 'var(--bg-card)', color: 'var(--text-primary)', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600, transition: 'all 0.2s',
                  }}>
                    {r === 'all' ? (isRTL ? 'كل الوقت' : 'All Time') : r === '7d' ? (isRTL ? '٧ أيام' : '7 Days') : r === '30d' ? (isRTL ? '٣٠ يوم' : '30 Days') : (isRTL ? '٩٠ يوم' : '90 Days')}
                  </button>
                ))}
                {/* Export */}
                <div style={{ position: 'relative' }}>
                  <button onClick={() => setShowExportMenu(!showExportMenu)} className="sup-btn" style={{
                    padding: '8px 20px', borderRadius: 8, border: '1px solid var(--border-primary)',
                    background: 'linear-gradient(135deg, var(--accent-blue), var(--accent-purple))', color: 'var(--text-inverse)', cursor: 'pointer', fontWeight: 700, fontSize: '0.85rem',
                  }}>
                    {isRTL ? '📥 تصدير' : '📥 Export'}
                  </button>
                  {showExportMenu && (
                    <div style={{
                      position: 'absolute', top: '100%', [isRTL ? 'left' : 'right']: 0, marginTop: 8, background: 'var(--bg-elevated)',
                      border: '1px solid var(--border-primary)', borderRadius: 12, padding: 8, minWidth: 160, zIndex: 10,
                      backdropFilter: 'blur(12px)',
                    }}>
                      {[
                        { en: 'CSV Report', ar: 'تقرير CSV' },
                        { en: 'PDF Summary', ar: 'ملخص PDF' },
                        { en: 'xAPI Bundle', ar: 'حزمة xAPI' },
                        { en: 'SCORM Package', ar: 'حزمة SCORM' },
                      ].map(f => (
                        <button key={f.en} className="sup-export-btn" style={{
                          display: 'block', width: '100%', textAlign: isRTL ? 'right' : 'left', padding: '10px 16px', background: 'transparent',
                          color: 'var(--text-primary)', border: 'none', cursor: 'pointer', borderRadius: 8, fontSize: '0.85rem', transition: 'all 0.2s',
                        }}>
                          {isRTL ? f.ar : f.en}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </header>

          {/* Metrics Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: 16, marginBottom: 40 }}>
            {metrics.map((m, i) => (
              <div key={i} className="sup-metric-card" style={{
                padding: 24, borderRadius: 16, background: 'var(--bg-card)', backdropFilter: 'blur(12px)',
                border: '1px solid var(--border-subtle)', transition: 'all 0.3s ease', cursor: 'default',
                animation: `supFadeIn 0.6s ease-out ${i * 0.1}s both`,
              }}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>{m.icon}</div>
                <div style={{ fontSize: '1.6rem', fontWeight: 900, color: m.color }}>{m.value}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, marginTop: 4 }}>{isRTL ? m.labelAr : m.label}</div>
              </div>
            ))}
          </div>

          {/* Students Table */}
          <div style={{
            background: 'var(--bg-card)', backdropFilter: 'blur(12px)', borderRadius: 20,
            border: '1px solid var(--border-subtle)', overflow: 'hidden',
            animation: 'supFadeIn 0.8s ease-out 0.4s both',
          }}>
            <div style={{ padding: '24px 28px', borderBottom: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
              <div>
                <h2 style={{ fontSize: '1.3rem', fontWeight: 800, margin: 0 }}>{isRTL ? 'نظرة عامة على المجموعة' : 'Cohort Overview'}</h2>
                <p style={{ fontFamily: 'Cairo, sans-serif', color: 'var(--text-muted)', direction: 'rtl', margin: 0, fontSize: '0.9rem' }}>نظرة عامة على المجموعة</p>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                {(['progress', 'score', 'name'] as const).map(s => (
                  <button key={s} onClick={() => setSortBy(s)} style={{
                    padding: '6px 14px', borderRadius: 6, border: '1px solid var(--border-primary)',
                    background: sortBy === s ? 'var(--accent-blue-surface, rgba(59,130,246,0.3))' : 'transparent', color: 'var(--text-primary)',
                    cursor: 'pointer', fontSize: '0.75rem', fontWeight: 600, transition: 'all 0.2s', textTransform: 'capitalize',
                  }}>
                    {isRTL
                      ? `ترتيب: ${s === 'progress' ? 'التقدّم' : s === 'score' ? 'الدرجة' : 'الاسم'}`
                      : `Sort: ${s}`}
                  </button>
                ))}
              </div>
            </div>

            {/* Table Header */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 2fr 1fr 1fr 1fr', gap: 8, padding: '12px 28px', background: 'var(--bg-secondary)', fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>
              <span>{isRTL ? 'الطالب' : 'Student'}</span><span>{isRTL ? 'الحالة' : 'Status'}</span><span>{isRTL ? 'التقدّم' : 'Progress'}</span><span>{isRTL ? 'الدرجة' : 'Score'}</span><span>{isRTL ? 'الوحدة' : 'Module'}</span><span>{isRTL ? 'المواظبة' : 'Streak'}</span>
            </div>

            {/* Student Rows */}
            {sorted.map((s, i) => (
              <div key={i} className="sup-student-row" style={{
                display: 'grid', gridTemplateColumns: '2fr 1fr 2fr 1fr 1fr 1fr', gap: 8,
                padding: '16px 28px', borderBottom: '1px solid var(--border-subtle)',
                transition: 'background 0.2s', alignItems: 'center',
              }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{isRTL ? s.nameAr : s.name}</div>
                  <div style={{ fontFamily: 'Cairo, sans-serif', fontSize: '0.75rem', color: 'var(--text-muted)', direction: 'rtl' }}>{s.nameAr}</div>
                </div>
                <div>
                  {s.risk ? (
                    <span style={{ padding: '4px 10px', borderRadius: 6, background: 'var(--accent-deepreal-surface)', color: 'var(--accent-red)', fontSize: '0.75rem', fontWeight: 700, animation: 'supPulse 2s infinite' }}>{isRTL ? '⚠ معرّض للخطر' : '⚠ At Risk'}</span>
                  ) : (
                    <span style={{ padding: '4px 10px', borderRadius: 6, background: 'var(--accent-mentalhealth-surface)', color: 'var(--accent-emerald)', fontSize: '0.75rem', fontWeight: 700 }}>{isRTL ? '✓ على المسار' : '✓ On Track'}</span>
                  )}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ flex: 1, height: 8, borderRadius: 4, background: 'var(--bg-secondary)' }}>
                    <div style={{
                      height: '100%', borderRadius: 4, width: `${s.progress}%`, transition: 'width 0.5s',
                      background: s.progress > 80 ? 'linear-gradient(90deg, var(--accent-emerald), var(--accent-blue))' : s.progress > 50 ? 'linear-gradient(90deg, var(--accent-amber), var(--accent-deepreal))' : 'linear-gradient(90deg, var(--accent-red), var(--accent-amber))',
                    }} />
                  </div>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, minWidth: 36 }}>{s.progress}%</span>
                </div>
                <span style={{ fontWeight: 700, color: s.score >= 80 ? 'var(--accent-emerald)' : s.score >= 60 ? 'var(--accent-amber)' : 'var(--accent-red)' }}>{s.score}%</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{s.module}</span>
                <span style={{ fontSize: '0.85rem' }}>{s.streak > 0 ? `🔥 ${s.streak}d` : '❄️ 0d'}</span>
              </div>
            ))}
          </div>

          {/* Back Link */}
          <div style={{ textAlign: 'center', marginTop: 48 }}>
            <Link href="/explore" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 600, transition: 'color 0.2s' }}>
              {isRTL ? 'العودة إلى الاستكشاف →' : '← Back to Explore'}
            </Link>
            <PageNavigation currentPath="/supervisor" />
          </div>
        </div>
      </main>
    </>
  );
}
