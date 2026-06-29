'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { PageNavigation } from '@/components/shared/page-navigation';
import { PageAIChatbot } from '@/components/shared/page-ai-chatbot';
import { useRTL } from '@/components/shared/rtl-provider';

const timelineData = [
  { day: 1, title: 'Understanding Your Baseline', titleAr: 'فهم حالتك الأساسية', desc: 'PHQ-9 self-assessment and mood baseline tracking using WHO-validated scales.', icon: '📊' },
  { day: 2, title: 'Sleep Hygiene Foundation', titleAr: 'أساسيات نظافة النوم', desc: 'Circadian rhythm regulation and stimulus control therapy techniques.', icon: '🌙' },
  { day: 3, title: 'Cognitive Awareness', titleAr: 'الوعي المعرفي', desc: 'Identifying automatic negative thoughts (ANTs) from Aaron Beck\'s CBT framework.', icon: '🧠' },
  { day: 4, title: 'Movement & Serotonin', titleAr: 'الحركة والسيروتونين', desc: '30 minutes of moderate exercise shown to boost serotonin by 25% (Craft & Perna, 2004).', icon: '🏃' },
  { day: 5, title: 'Social Connection', titleAr: 'التواصل الاجتماعي', desc: 'Structured social engagement to counter isolation. One meaningful conversation daily.', icon: '🤝' },
  { day: 6, title: 'Nutrition & Mood', titleAr: 'التغذية والمزاج', desc: 'Mediterranean diet elements linked to 33% lower depression risk (Lassale et al., 2019).', icon: '🥗' },
  { day: 7, title: 'Mindfulness Practice', titleAr: 'ممارسة التأمل', desc: 'Body scan meditation based on MBSR (Kabat-Zinn) — 8-week programs show clinical efficacy.', icon: '🧘' },
  { day: 8, title: 'Thought Challenging', titleAr: 'تحدي الأفكار', desc: 'ABC model: Activating event → Belief → Consequence. Restructure distorted thinking.', icon: '💭' },
  { day: 9, title: 'Gratitude Journaling', titleAr: 'يوميات الامتنان', desc: 'Three good things exercise (Seligman, 2005) — clinically proven for 6-month mood improvement.', icon: '📝' },
  { day: 10, title: 'Behavioral Activation', titleAr: 'التنشيط السلوكي', desc: 'Schedule pleasurable and mastery activities — core technique from Martell\'s BA protocol.', icon: '⚡' },
  { day: 11, title: 'Boundaries & Self-Care', titleAr: 'الحدود والعناية بالذات', desc: 'Setting healthy emotional boundaries. Saying no as self-preservation, not selfishness.', icon: '🛡️' },
  { day: 12, title: 'Trigger Management', titleAr: 'إدارة المحفزات', desc: 'Identify and create WRAP (Wellness Recovery Action Plan) for personal triggers.', icon: '🎯' },
  { day: 13, title: 'Support System Map', titleAr: 'خريطة نظام الدعم', desc: 'Map your support network: professionals, friends, family, crisis resources, peer support.', icon: '🗺️' },
  { day: 14, title: 'Sustainability Plan', titleAr: 'خطة الاستدامة', desc: 'Create a maintenance plan combining all learned techniques. Relapse prevention strategy.', icon: '🌟' },
];

const crisisResources = [
  { name: 'MoHP Mental Health & Addiction Hotline', nameAr: 'خط الصحة النفسية والإدمان (وزارة الصحة)', phone: '08008880700', desc: 'Free 24/7 crisis support', descAr: 'دعم مجاني للأزمات على مدار الساعة', icon: '🆘', color: '#ef4444' },
  { name: 'Behman Hospital Helpline', nameAr: 'خط مساعدة مستشفى بهمان', phone: '02-25218888', desc: 'Psychiatric emergency services', descAr: 'خدمات الطوارئ النفسية', icon: '🏥', color: '#f59e0b' },
  { name: 'Abbasseya Mental Health Hospital (direct)', nameAr: 'مستشفى العباسية للصحة النفسية (مباشر)', phone: '01154898506', desc: 'Emotional support and crisis intervention', descAr: 'دعم نفسي وتدخّل وقت الأزمات', icon: '💚', color: '#10b981' },
];

export default function MentalHealthPage() {
  const { isRTL } = useRTL();
  const [activeDay, setActiveDay] = useState(0);
  const [assessmentStarted, setAssessmentStarted] = useState(false);
  const [phqScore, setPhqScore] = useState<number | null>(null);

  const phqQuestions = [
    { en: 'Little interest or pleasure in doing things', ar: 'قلة الاهتمام أو المتعة في عمل الأشياء' },
    { en: 'Feeling down, depressed, or hopeless', ar: 'الإحساس بالإحباط أو الاكتئاب أو فقدان الأمل' },
    { en: 'Trouble falling or staying asleep', ar: 'صعوبة في النوم أو الاستمرار فيه' },
    { en: 'Feeling tired or having little energy', ar: 'الإحساس بالتعب أو قلة الطاقة' },
    { en: 'Poor appetite or overeating', ar: 'ضعف الشهية أو الإفراط في الأكل' },
  ];

  const [answers, setAnswers] = useState<number[]>(new Array(5).fill(-1));

  const handleAnswer = (qi: number, val: number) => {
    const na = [...answers];
    na[qi] = val;
    setAnswers(na);
    if (na.every(a => a >= 0)) {
      setPhqScore(na.reduce((s, v) => s + v, 0));
    }
  };

  const getScoreLabel = (score: number) => {
    if (score <= 4) return { label: isRTL ? 'بسيط' : 'Minimal', color: '#10b981' };
    if (score <= 9) return { label: isRTL ? 'خفيف' : 'Mild', color: '#f59e0b' };
    if (score <= 14) return { label: isRTL ? 'متوسط' : 'Moderate', color: '#f97316' };
    return { label: isRTL ? 'شديد — من فضلك اطلب المساعدة' : 'Severe — Please seek help', color: '#ef4444' };
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;
400;500;600;700;800;900&family=Cairo:wght@400;600;700;800&display=swap');
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes breathe { 0%, 100% { transform: scale(1); opacity: 0.6; } 50% { transform: scale(1.15); opacity: 1; } }
        @keyframes heartbeat { 0%, 100% { transform: scale(1); } 14% { transform: scale(1.15); } 28% { transform: scale(1); } 42% { transform: scale(1.1); } 56% { transform: scale(1); } }
        .mh-timeline-dot:hover { transform: scale(1.4) !important; }
        .mh-crisis-card:hover { transform: translateY(-4px) !important; }
        .mh-link-card:hover { transform: translateY(-4px) !important; box-shadow: 0 12px 40px rgba(0,0,0,0.3) !important; }
        .phq-opt:hover { background: var(--accent-mentalhealth-surface) !important; }
      `}</style>
      <div dir={isRTL ? 'rtl' : 'ltr'} style={{
        minHeight: '100vh', background: 'var(--bg-page)', fontFamily: "'Inter', sans-serif",
        color: 'var(--text-primary)', position: 'relative', overflow: 'hidden',
      }}>
        {/* Teal ambient glow */}
        <div style={{ position: 'fixed', top: '-150px', right: '-150px', width: '500px', height: '500px', background: 'radial-gradient(circle, var(--accent-mentalhealth-glow) 0%, transparent 70%)', opacity: 0.35, pointerEvents: 'none' }} />
        <div style={{ position: 'fixed', bottom: '-150px', left: '-150px', width: '500px', height: '500px', background: 'radial-gradient(circle, var(--accent-mentalhealth-glow) 0%, transparent 70%)', opacity: 0.25, pointerEvents: 'none' }} />

        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px', position: 'relative', zIndex: 2 }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '48px', animation: 'fadeInUp 0.5s ease' }}>
            <div style={{ display: 'inline-block', animation: 'heartbeat 2s infinite', fontSize: '48px', marginBottom: '12px' }}>💚</div>
            <div style={{ padding: '5px 16px', borderRadius: '16px', marginBottom: '16px', background: 'var(--accent-mentalhealth-surface)', border: '1px solid var(--accent-mentalhealth)', fontSize: '12px', fontWeight: 600, color: 'var(--accent-mentalhealth)', letterSpacing: '2px', textTransform: 'uppercase', display: 'inline-block' }}>
              {isRTL ? 'المحرك ٠٢ — محرك الفهم' : 'Engine 02 — The Understanding Engine'}
            </div>
            <h1 style={{ fontSize: '48px', fontWeight: 900, margin: '0 0 8px 0', color: 'var(--accent-mentalhealth)' }}>
              {isRTL ? 'مركز الصحة النفسية' : 'Mental Health Hub'}
            </h1>
            <p style={{ fontFamily: "'Cairo', sans-serif", fontSize: '22px', color: 'var(--text-secondary)', direction: 'rtl' as const, margin: '0 0 8px 0' }}>
              مركز الصحة النفسية — لأن صحتك النفسية أولوية
            </p>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px', maxWidth: '550px', margin: '0 auto' }}>
              {isRTL ? 'دعم نفسي قائم على الأدلة ومتجذّر في إرشادات منظمة الصحة العالمية، ومُكيَّف مع السياق الثقافي المصري. إنت مش لوحدك.' : 'Evidence-based mental health support rooted in WHO guidelines, adapted for Egyptian cultural context. You are not alone.'}
            </p>
            <Link href="/explore" style={{ display: 'inline-block', marginTop: '12px', color: 'var(--accent-mentalhealth)', fontSize: '14px', textDecoration: 'none' }}>{isRTL ? 'الرجوع إلى الاستكشاف →' : '← Back to Explore'}</Link>
          </div>

          {/* Stigma-Breaking Message (Arabic) */}
          <div style={{
            background: 'var(--accent-mentalhealth-surface)', backdropFilter: 'blur(12px)',
            border: '1px solid var(--accent-mentalhealth)', borderRadius: '16px',
            padding: '28px', marginBottom: '40px', textAlign: 'center',
            animation: 'fadeInUp 0.6s ease',
          }}>
            <p style={{ fontFamily: "'Cairo', sans-serif", fontSize: '24px', fontWeight: 700, color: 'var(--accent-mentalhealth)', direction: 'rtl' as const, margin: '0 0 8px 0', lineHeight: 1.8 }}>
              الاعتراف بالألم النفسي ليس ضعفًا — بل هو أول خطوة نحو القوة الحقيقية
            </p>
            <p style={{ fontFamily: "'Cairo', sans-serif", fontSize: '15px', color: 'var(--text-secondary)', direction: 'rtl' as const, margin: '0 0 8px 0' }}>
              في مصر، يعاني واحد من كل أربعة أشخاص من اضطراب نفسي خلال حياتهم (منظمة الصحة العالمية، ٢٠٢٣). لست وحدك.
            </p>
            <p style={{ fontSize: '14px', color: 'var(--text-muted)', fontStyle: 'italic' }}>
              &ldquo;Acknowledging mental pain is not weakness — it is the first step toward true strength.&rdquo;
            </p>
          </div>

          {/* Quick Links */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '40px' }}>
            {[
              { href: '/mental-health/depression', icon: '🌧️', title: 'Depression Program', titleAr: 'برنامج الاكتئاب', desc: '14-day structured CBT-based intervention', descAr: 'برنامج منظّم لمدة ١٤ يومًا قائم على العلاج السلوكي المعرفي', color: '#14b8a6' },
              { href: '/drug-checker', icon: '💊', title: 'Drug Interaction Checker', titleAr: 'فاحص تفاعل الأدوية', desc: 'Check psychiatric medication interactions', descAr: 'افحص تفاعلات أدوية الأمراض النفسية', color: '#10b981' },
            ].map(card => (
              <Link key={card.href} href={card.href} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="mh-link-card" style={{
                  background: 'var(--bg-card)', backdropFilter: 'blur(12px)',
                  border: `1px solid ${card.color}30`, borderRadius: '16px', padding: '24px',
                  transition: 'all 0.3s', cursor: 'pointer',
                }}>
                  <div style={{ fontSize: '36px', marginBottom: '12px' }}>{card.icon}</div>
                  <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 4px 0' }}>{isRTL ? card.titleAr : card.title}</h3>
                  <p style={{ fontFamily: "'Cairo', sans-serif", fontSize: '14px', color: card.color, direction: 'rtl' as const, margin: '0 0 8px 0' }}>{card.titleAr}</p>
                  <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: 0 }}>{isRTL ? card.descAr : card.desc}</p>
                  <div style={{ marginTop: '12px', fontSize: '13px', color: card.color, fontWeight: 600 }}>{isRTL ? 'افتح →' : 'Open →'}</div>
                </div>
              </Link>
            ))}
          </div>

          {/* Crisis Resources */}
          <div style={{
            background: 'var(--bg-card)', backdropFilter: 'blur(12px)',
            border: '1px solid var(--accent-red)', borderRadius: '16px',
            padding: '28px', marginBottom: '40px', animation: 'fadeInUp 0.7s ease',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
              <span style={{ fontSize: '24px', animation: 'breathe 3s infinite' }}>🆘</span>
              <div>
                <h2 style={{ fontSize: '20px', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>{isRTL ? 'موارد الأزمات — مصر' : 'Crisis Resources — Egypt'}</h2>
                <p style={{ fontFamily: "'Cairo', sans-serif", fontSize: '14px', color: 'var(--text-secondary)', margin: 0, direction: 'rtl' as const }}>موارد الأزمات — مصر</p>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
              {crisisResources.map(r => (
                <div key={r.phone} className="mh-crisis-card" style={{
                  padding: '20px', borderRadius: '12px',
                  border: `1px solid ${r.color}30`, background: `${r.color}08`,
                  transition: 'all 0.3s',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                    <span style={{ fontSize: '24px' }}>{r.icon}</span>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>{isRTL ? r.nameAr : r.name}</div>
                      <div style={{ fontFamily: "'Cairo', sans-serif", fontSize: '12px', color: 'var(--text-secondary)', direction: 'rtl' as const }}>{r.nameAr}</div>
                    </div>
                  </div>
                  <div style={{ fontSize: '22px', fontWeight: 900, color: r.color, fontFamily: 'monospace', marginBottom: '4px' }}>
                    📞 {r.phone}
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{isRTL ? r.descAr : r.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* 14-Day Timeline */}
          <div style={{
            background: 'var(--bg-card)', backdropFilter: 'blur(12px)',
            border: '1px solid var(--accent-mentalhealth)', borderRadius: '16px',
            padding: '28px', marginBottom: '40px', animation: 'fadeInUp 0.8s ease',
          }}>
            <h2 style={{ fontSize: '20px', fontWeight: 700, margin: '0 0 4px 0', color: 'var(--text-primary)' }}>{isRTL ? '📅 برنامج العافية لمدة ١٤ يومًا' : '📅 14-Day Wellness Program'}</h2>
            <p style={{ fontFamily: "'Cairo', sans-serif", fontSize: '14px', color: 'var(--text-muted)', margin: '0 0 24px 0', direction: 'rtl' as const }}>برنامج العافية لمدة ١٤ يومًا</p>

            {/* Timeline dots */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', position: 'relative' }}>
              <div style={{ position: 'absolute', top: '50%', left: '12px', right: '12px', height: '2px', background: 'var(--border-secondary)', transform: 'translateY(-50%)' }} />
              {timelineData.map((d, i) => (
                <div
                  key={i}
                  className="mh-timeline-dot"
                  onClick={() => setActiveDay(i)}
                  style={{
                    width: '28px', height: '28px', borderRadius: '50%', cursor: 'pointer',
                    background: activeDay === i ? 'var(--accent-mentalhealth)' : i < activeDay ? 'var(--accent-mentalhealth-surface)' : 'var(--bg-elevated)',
                    border: `2px solid ${activeDay === i ? 'var(--accent-mentalhealth)' : 'var(--border-secondary)'}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '10px', fontWeight: 700, color: activeDay === i ? 'var(--text-inverse)' : 'var(--text-secondary)',
                    position: 'relative', zIndex: 2, transition: 'all 0.2s',
                  }}
                >
                  {d.day}
                </div>
              ))}
            </div>

            {/* Active Day Content */}
            <div style={{
              padding: '24px', borderRadius: '12px',
              background: 'var(--accent-mentalhealth-surface)', border: '1px solid var(--accent-mentalhealth)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <span style={{ fontSize: '32px' }}>{timelineData[activeDay].icon}</span>
                <div>
                  <div style={{ fontSize: '12px', color: 'var(--accent-mentalhealth)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>
                    {isRTL ? `اليوم ${timelineData[activeDay].day} من ١٤` : `Day ${timelineData[activeDay].day} of 14`}
                  </div>
                  <div style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-primary)' }}>{isRTL ? timelineData[activeDay].titleAr : timelineData[activeDay].title}</div>
                  <div style={{ fontFamily: "'Cairo', sans-serif", fontSize: '15px', color: 'var(--accent-mentalhealth)', direction: 'rtl' as const }}>{timelineData[activeDay].titleAr}</div>
                </div>
              </div>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.7, margin: '0 0 16px 0' }}>{timelineData[activeDay].desc}</p>
              
              {/* ACTION BUTTONS — Previously missing, causing "no way to enter" */}
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '16px' }}>
                <Link href="/mental-health/depression" style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  padding: '12px 24px', borderRadius: '12px', border: 'none',
                  background: 'var(--accent-mentalhealth)',
                  color: 'var(--text-inverse)', fontSize: '14px', fontWeight: 700, textDecoration: 'none',
                  transition: 'all 0.3s',
                }}>
                  {isRTL ? '▶ ابدأ هذا اليوم' : '▶ Start This Day'}
                </Link>
                <Link href="/mental-health/depression" style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  padding: '12px 24px', borderRadius: '12px',
                  border: '1px solid var(--accent-mentalhealth)', background: 'transparent',
                  color: 'var(--accent-mentalhealth)', fontSize: '13px', fontWeight: 600, textDecoration: 'none',
                }}>
                  {isRTL ? '📋 برنامج الاكتئاب الكامل →' : '📋 Full Depression Program →'}
                </Link>
              </div>

              {/* Previous / Next Day Navigation */}
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <button
                  onClick={() => setActiveDay(Math.max(0, activeDay - 1))}
                  disabled={activeDay === 0}
                  style={{
                    padding: '8px 16px', borderRadius: '8px', cursor: activeDay === 0 ? 'default' : 'pointer',
                    border: '1px solid var(--border-secondary)', background: 'transparent',
                    color: 'var(--text-secondary)', fontSize: '13px', opacity: activeDay === 0 ? 0.4 : 1,
                  }}
                >
                  {isRTL ? 'اليوم السابق →' : '← Previous Day'}
                </button>
                <button
                  onClick={() => setActiveDay(Math.min(13, activeDay + 1))}
                  disabled={activeDay === 13}
                  style={{
                    padding: '8px 16px', borderRadius: '8px', cursor: activeDay === 13 ? 'default' : 'pointer',
                    border: 'none', background: 'var(--accent-mentalhealth-surface)',
                    color: 'var(--accent-mentalhealth)', fontSize: '13px', fontWeight: 600, opacity: activeDay === 13 ? 0.4 : 1,
                  }}
                >
                  {isRTL ? '← اليوم التالي' : 'Next Day →'}
                </button>
              </div>
            </div>
          </div>

          {/* Self-Assessment */}
          <div style={{
            background: 'var(--bg-card)', backdropFilter: 'blur(12px)',
            border: '1px solid var(--accent-mentalhealth)', borderRadius: '16px',
            padding: '28px', animation: 'fadeInUp 0.9s ease',
          }}>
            <h2 style={{ fontSize: '20px', fontWeight: 700, margin: '0 0 4px 0', color: 'var(--text-primary)' }}>{isRTL ? '📋 تقييم ذاتي سريع (PHQ-5)' : '📋 Quick Self-Assessment (PHQ-5)'}</h2>
            <p style={{ fontFamily: "'Cairo', sans-serif", fontSize: '14px', color: 'var(--text-muted)', margin: '0 0 8px 0', direction: 'rtl' as const }}>تقييم ذاتي سريع</p>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '20px' }}>
              {isRTL ? 'مبني على استبيان صحة المريض (Kroenke, Spitzer & Williams, 2001). ده أداة فحص مبدئي، مش تشخيص.' : 'Based on the Patient Health Questionnaire (Kroenke, Spitzer & Williams, 2001). This is a screening tool, not a diagnosis.'}
            </p>

            {!assessmentStarted ? (
              <div style={{ textAlign: 'center', padding: '30px 0' }}>
                <button
                  onClick={() => setAssessmentStarted(true)}
                  style={{
                    padding: '14px 36px', borderRadius: '12px', border: 'none',
                    background: 'var(--accent-mentalhealth)',
                    color: 'var(--text-inverse)', fontSize: '16px', fontWeight: 700, cursor: 'pointer',
                    transition: 'all 0.3s',
                  }}
                >
                  {isRTL ? '🩺 ابدأ التقييم الذاتي' : '🩺 Begin Self-Assessment'}
                </button>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '12px' }}>{isRTL ? 'بياخد حوالي دقيقتين • خاص تمامًا' : 'Takes approximately 2 minutes • Completely private'}</p>
              </div>
            ) : (
              <div>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '16px' }}>
                  {isRTL ? 'خلال الأسبوعين الماضيين، قد إيه ضايقتك الحاجات دي؟ (٠ = إطلاقًا، ٣ = تقريبًا كل يوم)' : 'Over the last 2 weeks, how often have you been bothered by the following? (0 = Not at all, 3 = Nearly every day)'}
                </p>
                {phqQuestions.map((q, qi) => (
                  <div key={qi} style={{ marginBottom: '16px' }}>
                    <div style={{ fontSize: '14px', color: 'var(--text-primary)', marginBottom: '8px' }}>{qi + 1}. {isRTL ? q.ar : q.en}</div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      {[{ v: 0, l: 'Not at all', lAr: 'إطلاقًا' }, { v: 1, l: 'Several days', lAr: 'عدة أيام' }, { v: 2, l: 'More than half', lAr: 'أكتر من النص' }, { v: 3, l: 'Nearly every day', lAr: 'تقريبًا كل يوم' }].map(opt => (
                        <button
                          key={opt.v}
                          className="phq-opt"
                          onClick={() => handleAnswer(qi, opt.v)}
                          style={{
                            flex: 1, padding: '8px 4px', borderRadius: '8px',
                            border: `1px solid ${answers[qi] === opt.v ? 'var(--accent-mentalhealth)' : 'var(--border-secondary)'}`,
                            background: answers[qi] === opt.v ? 'var(--accent-mentalhealth-surface)' : 'transparent',
                            color: answers[qi] === opt.v ? 'var(--accent-mentalhealth)' : 'var(--text-secondary)',
                            fontSize: '11px', cursor: 'pointer', transition: 'all 0.2s',
                          }}
                        >
                          {isRTL ? opt.lAr : opt.l}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
                {phqScore !== null && (
                  <div style={{
                    padding: '20px', borderRadius: '12px', marginTop: '16px',
                    background: `${getScoreLabel(phqScore).color}10`,
                    border: `1px solid ${getScoreLabel(phqScore).color}30`,
                    textAlign: 'center',
                  }}>
                    <div style={{ fontSize: '36px', fontWeight: 900, color: getScoreLabel(phqScore).color }}>{phqScore}/15</div>
                    <div style={{ fontSize: '16px', fontWeight: 700, color: getScoreLabel(phqScore).color }}>{getScoreLabel(phqScore).label}</div>
                    <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '8px' }}>
                      {isRTL ? 'ده أداة فحص مبدئي بس. للتقييم المتخصص، اتصل بخط الصحة النفسية المصري: 08008880700' : 'This is a screening tool only. For a professional assessment, contact the Egyptian Mental Health Hotline: 08008880700'}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
          <PageNavigation currentPath="/mental-health" />
        </div>
      </div>

      <PageAIChatbot
        pageTitle="Mental Health Hub — مركز الصحة النفسية"
        pageContext="Egyptian Awareness Library - Mental Health Hub: 21-day structured mental health program using evidence-based approaches including CBT, PHQ-9 screening, sleep hygiene, mindfulness, and Islamic coping frameworks tailored for the Egyptian context."
        systemPrompt={`You are the EAL Mental Health Support AI. You provide evidence-based mental health guidance tailored to the Egyptian cultural context.

EVIDENCE-BASED FRAMEWORKS:
1. CBT (Cognitive Behavioral Therapy): Identify → Challenge → Replace negative thought patterns
2. Behavioral Activation: Small steps against depression's inertia
3. MBSR (Mindfulness-Based Stress Reduction, Kabat-Zinn): Present-moment awareness
4. Mediterranean Diet for mood: 33% lower depression risk (Lassale et al., 2019)
5. Exercise protocol: 30 min moderate exercise = 25% serotonin boost (Craft & Perna, 2004)

ISLAMIC COPING TOOLKIT:
- Du'a for anxiety: Quran 94:5-6 "فإن مع العسر يسرا"
- Dhikr: "لا إله إلا أنت سبحانك إني كنت من الظالمين" (Yunus, 87)
- Tawakkul: trust + action (not passive fatalism)
- Congregational prayer: social connectedness + structure
- Prophet ﷺ's emotional expression: permissibility of weeping

EGYPTIAN RESOURCES:
- Crisis Line: 08008880700 (free, 24/7)
- Suicide Prevention: 131
- Behman Hospital: 02-25218888
- Egyptian Society of Psychiatry: espsy.org

RULES:
- Never diagnose
- Always validate emotions first
- If suicidal ideation: immediately provide crisis numbers
- Distinguish spiritual support from professional treatment`}
        suggestedQuestions={[
          'كيف أبدأ بتحسين صحتي النفسية؟',
          'ما الفرق بين الحزن والاكتئاب؟',
          'How does CBT help with negative thinking?',
          'What Islamic practices support mental wellbeing?',
        ]}
        accentColor="#10b981"
        accentColorRgb="16,185,129"
      />
    </>
  );
}
