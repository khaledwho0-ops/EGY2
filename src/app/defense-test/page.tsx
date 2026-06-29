'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { PageNavigation } from '@/components/shared/page-navigation';
import { useRTL } from '@/components/shared/rtl-provider';

const questions = [
  {
    q: 'You see a WhatsApp forward claiming "Egyptian doctors discovered a cure for diabetes." What is your FIRST step?',
    qAr: 'ترى رسالة على واتساب تدعي "أطباء مصريون اكتشفوا علاج للسكر." ما هي خطوتك الأولى؟',
    options: ['Share it immediately to help others', 'STOP — pause before reacting emotionally', 'Check if it has many likes/shares', 'Ask a friend if they heard about it'],
    correct: 1,
    explanation: 'The SIFT method starts with STOP. Emotional manipulation relies on urgency. Per Wineburg & McGrew (2019, Stanford History Education Group), pausing before sharing reduces misinformation spread by 50%. The WHO also warns against "viral cure" claims (WHO Infodemic Management).',
  },
  {
    q: 'A Facebook post shows a screenshot of a "PubMed study" proving a health claim. The screenshot is blurry and shows no DOI. This is most likely:',
    qAr: 'منشور على فيسبوك يعرض لقطة شاشة لدراسة "PubMed" تثبت ادعاء صحي. الصورة غير واضحة وبدون DOI.',
    options: ['Reliable — PubMed is trustworthy', 'Fabricated evidence — no verifiable source', 'Partially true — screenshots can be trusted', 'Needs more likes to be confirmed'],
    correct: 1,
    explanation: 'Without a verifiable DOI or PMID, a screenshot of a "study" is unfalsifiable. The FLICC taxonomy classifies this as "Fake Expert" technique. Legitimate studies have DOIs (Digital Object Identifiers) traceable on PubMed.gov. Always search for the actual paper.',
  },
  {
    q: 'Which logical fallacy is this? "You can\'t trust Dr. Ahmed\'s vaccine safety data because he once got a parking ticket."',
    qAr: 'ما هي المغالطة المنطقية هنا؟ "لا يمكنك الوثوق ببيانات الدكتور أحمد لأنه حصل على مخالفة مرور."',
    options: ['Cherry-picking', 'Ad hominem attack', 'Straw man argument', 'False dichotomy'],
    correct: 1,
    explanation: 'This is an ad hominem fallacy — attacking the person rather than their argument. A parking ticket is irrelevant to vaccine safety data quality. The FLICC taxonomy (Cook, 2020) classifies personal attacks as a sub-technique of "Logical Fallacies."',
  },
  {
    q: 'What does ELA (Error Level Analysis) detect in digital images?',
    qAr: 'ما الذي يكتشفه تحليل مستوى الخطأ (ELA) في الصور الرقمية؟',
    options: ['Whether the photographer was professional', 'Regions that have been digitally manipulated', 'The camera brand used', 'When the photo was taken'],
    correct: 1,
    explanation: 'ELA highlights areas of an image with different compression levels. Manipulated regions show different error levels compared to the rest of the image. This is a core technique in digital forensics used alongside EXIF metadata analysis and C2PA manifest validation.',
  },
  {
    q: 'A claim says "100% of Egyptian youth agree that..." What cognitive bias does this trigger?',
    qAr: 'ادعاء يقول "١٠٠٪ من الشباب المصري يوافقون على..." ما التحيز المعرفي المستهدف؟',
    options: ['Anchoring bias', 'Bandwagon effect (social proof)', 'Dunning-Kruger effect', 'Recency bias'],
    correct: 1,
    explanation: 'The bandwagon effect (social proof) makes people more likely to adopt beliefs if they think "everyone" agrees. Using "100%" is a red flag — no survey achieves universal agreement. WHO Infodemic guidelines specifically warn against fabricated consensus claims.',
  },
  {
    q: 'In Islamic scholarship, what is the correct way to verify a hadith claim made online?',
    qAr: 'في العلم الإسلامي، ما هي الطريقة الصحيحة للتحقق من حديث منشور على الإنترنت؟',
    options: ['Accept it if it sounds spiritually moving', 'Cross-reference with authenticated collections (Bukhari, Muslim) via Sunnah.com', 'Check how many people shared it', 'Trust it if an influencer posted it'],
    correct: 1,
    explanation: 'Hadith authentication requires checking the isnad (chain of narrators) and cross-referencing with authenticated collections. Sunnah.com provides searchable access to Sahih al-Bukhari, Sahih Muslim, and other major collections. The science of hadith criticism (ilm al-rijal) was developed by scholars like Ibn Hajar al-Asqalani.',
  },
  {
    q: 'You encounter a deepfake video of a public figure. Which method is MOST reliable for detection?',
    qAr: 'صادفت فيديو مزيف لشخصية عامة. ما هي الطريقة الأكثر موثوقية للكشف؟',
    options: ['Watching it multiple times carefully', 'rPPG blood flow analysis and frequency domain analysis', 'Asking friends if it looks fake', 'Checking the upload date'],
    correct: 1,
    explanation: 'Remote Photoplethysmography (rPPG) analyzes subtle skin color changes from blood flow that deepfakes cannot replicate. Combined with frequency domain analysis (detecting GAN artifacts), this approach achieves >93% detection accuracy. Visual inspection alone is insufficient for modern deepfakes.',
  },
  {
    q: 'According to the WHO mhGAP guidelines, what is the FIRST thing to do when someone expresses suicidal thoughts?',
    qAr: 'وفقاً لإرشادات WHO mhGAP، ما أول شيء يجب فعله عندما يعبر شخص عن أفكار انتحارية؟',
    options: ['Tell them to "just be positive"', 'Listen non-judgmentally and assess safety', 'Leave them alone to calm down', 'Immediately call the police'],
    correct: 1,
    explanation: 'The WHO mhGAP Intervention Guide (2016) emphasizes non-judgmental listening and safety assessment as the first response. In Egypt, the crisis hotline is 08008880700. Never dismiss suicidal ideation or leave the person alone. Professional help should be sought immediately.',
  },
  {
    q: 'A news article cites "top scientists" without naming any. This is an example of:',
    qAr: 'مقال إخباري يستشهد بـ "كبار العلماء" بدون تسمية أي منهم. هذا مثال على:',
    options: ['Good journalism', 'Appeal to false authority (FLICC: Fake Experts)', 'Reliable expert consensus', 'Statistical evidence'],
    correct: 1,
    explanation: 'The FLICC taxonomy identifies "Fake Experts" as a key misinformation technique. Unnamed "top scientists" or "leading researchers" are unfalsifiable authority appeals. Legitimate reporting names researchers, cites specific institutions, and provides DOIs for referenced studies.',
  },
  {
    q: 'What is "prebunking" and how does it relate to inoculation theory?',
    qAr: 'ما هو "التحصين المسبق" وكيف يرتبط بنظرية التلقيح؟',
    options: ['Debunking claims after they spread', 'Proactively exposing people to weakened misinformation to build resistance', 'Banning all social media', 'Only trusting government sources'],
    correct: 1,
    explanation: 'Prebunking, based on inoculation theory (McGuire, 1961; van der Linden, 2022), works like a vaccine: exposing people to weakened forms of misinformation builds cognitive antibodies. Google/Jigsaw\'s prebunking campaigns showed 5-10% improvement in misinformation identification (Roozenbeek et al., 2022).',
  },
];

export default function DefenseTestPage() {
  const { isRTL } = useRTL();
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [timer, setTimer] = useState(30);
  const [answers, setAnswers] = useState<(number | null)[]>([]);

  const handleTimeout = useCallback(() => {
    if (!answered) {
      setAnswered(true);
      setAnswers(prev => [...prev, null]);
    }
  }, [answered]);

  useEffect(() => {
    if (finished || answered) return;
    if (timer <= 0) { handleTimeout(); return; }
    const t = setTimeout(() => setTimer(s => s - 1), 1000);
    return () => clearTimeout(t);
  }, [timer, finished, answered, handleTimeout]);

  const selectAnswer = (idx: number) => {
    if (answered) return;
    setSelected(idx);
    setAnswered(true);
    const isCorrect = idx === questions[currentQ].correct;
    if (isCorrect) setScore(s => s + 1);
    setAnswers(prev => [...prev, idx]);
  };

  const nextQuestion = () => {
    if (currentQ + 1 >= questions.length) {
      setFinished(true);
    } else {
      setCurrentQ(q => q + 1);
      setSelected(null);
      setAnswered(false);
      setTimer(30);
    }
  };

  const restart = () => {
    setCurrentQ(0);
    setSelected(null);
    setAnswered(false);
    setScore(0);
    setFinished(false);
    setTimer(30);
    setAnswers([]);
  };

  const pct = Math.round((score / questions.length) * 100);
  const q = questions[currentQ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Cairo:wght@400;600;700;800&display=swap');
        @keyframes dtFadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes dtPulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } }
        @keyframes dtShake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-6px); } 75% { transform: translateX(6px); } }
        .dt-option:hover { transform: translateX(4px); background: var(--bg-secondary) !important; }
        .dt-option-correct { border-color: var(--accent-emerald) !important; background: var(--accent-mentalhealth-surface) !important; }
        .dt-option-wrong { border-color: var(--accent-red) !important; background: rgba(239,68,68,0.1) !important; animation: dtShake 0.4s ease-out; }
      `}</style>
      <main dir={isRTL ? 'rtl' : 'ltr'} style={{ minHeight: '100vh', background: 'var(--bg-page)', color: 'var(--text-primary)', fontFamily: 'Inter, sans-serif', padding: '40px 24px 80px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          {/* Header */}
          <header style={{ textAlign: 'center', marginBottom: 40, animation: 'dtFadeIn 0.6s ease-out' }}>
            <div style={{
              display: 'inline-flex', width: 80, height: 80, borderRadius: 24, fontSize: 40,
              alignItems: 'center', justifyContent: 'center', marginBottom: 16,
              background: 'linear-gradient(135deg, var(--accent-red), var(--accent-amber))',
              boxShadow: '0 0 40px rgba(239,68,68,0.4)',
            }}>🛡️</div>
            <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 900, margin: '0 0 8px', background: 'linear-gradient(135deg, var(--accent-red), var(--accent-amber), var(--accent-emerald))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              {isRTL ? 'اختبار الجاهزية الدفاعية' : 'Defense Readiness Test'}
            </h1>
            <p style={{ fontFamily: 'Cairo, sans-serif', fontSize: '1.1rem', color: 'var(--text-muted)', direction: isRTL ? 'ltr' : 'rtl', fontWeight: 700 }}>
              {isRTL ? 'Defense Readiness Test' : 'اختبار الجاهزية الدفاعية'}
            </p>
          </header>

          {!finished ? (
            <>
              {/* Progress Bar */}
              <div style={{ marginBottom: 24, animation: 'dtFadeIn 0.4s ease-out' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 700 }}>{isRTL ? 'سؤال' : 'Question'} {currentQ + 1} / {questions.length}</span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 700 }}>{isRTL ? 'النتيجة' : 'Score'}: {score}/{currentQ + (answered ? 1 : 0)}</span>
                </div>
                <div style={{ height: 8, borderRadius: 4, background: 'var(--bg-secondary)' }}>
                  <div style={{ height: '100%', borderRadius: 4, width: `${((currentQ + (answered ? 1 : 0)) / questions.length) * 100}%`, background: 'linear-gradient(90deg, var(--accent-blue), var(--accent-indigo))', transition: 'width 0.5s' }} />
                </div>
              </div>

              {/* Timer */}
              <div style={{
                display: 'flex', justifyContent: 'center', marginBottom: 24,
              }}>
                <div style={{
                  width: 64, height: 64, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: timer <= 10 ? 'rgba(239,68,68,0.15)' : 'rgba(59,130,246,0.15)',
                  border: `2px solid ${timer <= 10 ? 'var(--accent-red)' : timer <= 20 ? 'var(--accent-amber)' : 'var(--accent-blue)'}`,
                  fontSize: '1.3rem', fontWeight: 900,
                  color: timer <= 10 ? 'var(--accent-red)' : timer <= 20 ? 'var(--accent-amber)' : 'var(--accent-blue)',
                  animation: timer <= 5 && !answered ? 'dtPulse 0.5s ease-in-out infinite' : 'none',
                  transition: 'all 0.3s',
                }}>
                  {answered ? '✓' : timer}
                </div>
              </div>

              {/* Question Card */}
              <div style={{
                background: 'var(--bg-card)', backdropFilter: 'blur(12px)', borderRadius: 20,
                border: '1px solid var(--border-primary)', padding: 32, marginBottom: 24,
                animation: 'dtFadeIn 0.5s ease-out',
              }}>
                <h2 style={{ fontSize: '1.15rem', fontWeight: 700, lineHeight: 1.6, marginBottom: 8, fontFamily: isRTL ? 'Cairo, sans-serif' : 'Inter, sans-serif', direction: isRTL ? 'rtl' : 'ltr', textAlign: isRTL ? 'right' : 'left' }}>{isRTL ? q.qAr : q.q}</h2>
                <p style={{ fontFamily: isRTL ? 'Inter, sans-serif' : 'Cairo, sans-serif', fontSize: '0.9rem', color: 'var(--text-muted)', direction: isRTL ? 'ltr' : 'rtl', lineHeight: 1.7, textAlign: isRTL ? 'left' : 'right' }}>{isRTL ? q.q : q.qAr}</p>
              </div>

              {/* Options */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
                {q.options.map((opt, i) => {
                  let cls = 'dt-option';
                  if (answered && i === q.correct) cls += ' dt-option-correct';
                  else if (answered && i === selected && i !== q.correct) cls += ' dt-option-wrong';
                  return (
                    <button
                      key={i}
                      className={cls}
                      onClick={() => selectAnswer(i)}
                      disabled={answered}
                      style={{
                        padding: '16px 20px', borderRadius: 14, textAlign: isRTL ? 'right' : 'left', cursor: answered ? 'default' : 'pointer',
                        background: 'var(--bg-elevated)', border: '1px solid var(--border-primary)',
                        color: 'var(--text-primary)', fontSize: '0.9rem', fontWeight: 600, transition: 'all 0.3s',
                        display: 'flex', alignItems: 'center', gap: 12, fontFamily: 'Inter, sans-serif',
                      }}
                    >
                      <span style={{
                        width: 32, height: 32, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center',
                        background: answered && i === q.correct ? 'var(--accent-mentalhealth-surface)' : answered && i === selected ? 'rgba(239,68,68,0.2)' : 'var(--bg-secondary)',
                        color: answered && i === q.correct ? 'var(--accent-emerald)' : answered && i === selected ? 'var(--accent-red)' : 'var(--text-muted)',
                        fontWeight: 800, fontSize: '0.8rem', flexShrink: 0,
                      }}>
                        {answered && i === q.correct ? '✓' : answered && i === selected ? '✗' : String.fromCharCode(65 + i)}
                      </span>
                      {opt}
                    </button>
                  );
                })}
              </div>

              {/* Explanation */}
              {answered && (
                <div style={{
                  background: selected === q.correct ? 'rgba(16,185,129,0.05)' : 'rgba(239,68,68,0.05)',
                  border: `1px solid ${selected === q.correct ? 'rgba(16,185,129,0.2)' : 'rgba(239,68,68,0.2)'}`,
                  borderRadius: 16, padding: 24, marginBottom: 24, animation: 'dtFadeIn 0.4s ease-out',
                }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 800, color: selected === q.correct ? 'var(--accent-emerald)' : 'var(--accent-red)', marginBottom: 8 }}>
                    {selected === q.correct ? (isRTL ? '✅ إجابة صح!' : '✅ Correct!') : selected === null ? (isRTL ? '⏰ خلص الوقت!' : '⏰ Time\'s up!') : (isRTL ? '❌ إجابة غلط' : '❌ Incorrect')}
                  </div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>{q.explanation}</p>
                </div>
              )}

              {/* Next Button */}
              {answered && (
                <div style={{ textAlign: 'center' }}>
                  <button onClick={nextQuestion} style={{
                    padding: '14px 40px', borderRadius: 12, border: 'none', fontWeight: 800, fontSize: '1rem',
                    background: 'linear-gradient(135deg, var(--accent-blue), var(--accent-indigo))', color: '#fff', cursor: 'pointer',
                    boxShadow: '0 0 20px rgba(59,130,246,0.3)', transition: 'all 0.3s',
                  }}>
                    {currentQ + 1 >= questions.length ? (isRTL ? '🏁 شوف النتيجة' : '🏁 See Results') : (isRTL ? 'السؤال اللي بعده ←' : 'Next Question →')}
                  </button>
                </div>
              )}
            </>
          ) : (
            /* Final Score Card */
            <div style={{
              background: 'var(--bg-card)', backdropFilter: 'blur(12px)', borderRadius: 24,
              border: '1px solid var(--border-primary)', padding: 48, textAlign: 'center',
              animation: 'dtFadeIn 0.6s ease-out',
            }}>
              <div style={{ fontSize: 64, marginBottom: 16 }}>{pct >= 80 ? '🏆' : pct >= 60 ? '🛡️' : pct >= 40 ? '📚' : '⚠️'}</div>
              <h2 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: 8, background: pct >= 80 ? 'linear-gradient(135deg, var(--accent-emerald), var(--accent-blue))' : pct >= 60 ? 'linear-gradient(135deg, var(--accent-blue), var(--accent-indigo))' : 'linear-gradient(135deg, var(--accent-amber), var(--accent-red))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                {score} / {questions.length}
              </h2>
              <p style={{ fontSize: '1.3rem', fontWeight: 800, color: pct >= 80 ? 'var(--accent-emerald)' : pct >= 60 ? 'var(--accent-blue)' : pct >= 40 ? 'var(--accent-amber)' : 'var(--accent-red)', marginBottom: 8 }}>
                {isRTL
                  ? (pct >= 80 ? 'حصن معرفي — مدافع من النخبة!' : pct >= 60 ? 'دفاع قوي — كمّل شحذ مهاراتك!' : pct >= 40 ? 'لسه بتطوّر — محتاج تدريب أكتر' : 'معرّض للخطر — ابدأ المنهج!')
                  : (pct >= 80 ? 'Cognitive Fortress — Elite Defender!' : pct >= 60 ? 'Solid Defense — Keep Sharpening!' : pct >= 40 ? 'Developing — More Training Needed' : 'Vulnerable — Start the Curriculum!')}
              </p>
              <p style={{ fontFamily: isRTL ? 'Inter, sans-serif' : 'Cairo, sans-serif', fontSize: '1rem', color: 'var(--text-muted)', direction: isRTL ? 'ltr' : 'rtl', marginBottom: 32 }}>
                {isRTL
                  ? (pct >= 80 ? 'Cognitive Fortress — Elite Defender!' : pct >= 60 ? 'Solid Defense — Keep Sharpening!' : pct >= 40 ? 'Developing — More Training Needed' : 'Vulnerable — Start the Curriculum!')
                  : (pct >= 80 ? 'حصن معرفي — مدافع نخبوي!' : pct >= 60 ? 'دفاع قوي — استمر في التطوير!' : pct >= 40 ? 'قيد التطوير — تحتاج المزيد من التدريب' : 'معرض للخطر — ابدأ المنهج!')}
              </p>

              {/* Score Breakdown */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginBottom: 32, flexWrap: 'wrap' }}>
                <div style={{ padding: '12px 20px', borderRadius: 12, background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)' }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--accent-emerald)' }}>{score}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-caption)' }}>{isRTL ? 'صح' : 'Correct'}</div>
                </div>
                <div style={{ padding: '12px 20px', borderRadius: 12, background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)' }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--accent-red)' }}>{questions.length - score}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-caption)' }}>{isRTL ? 'غلط' : 'Incorrect'}</div>
                </div>
                <div style={{ padding: '12px 20px', borderRadius: 12, background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)' }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--accent-blue)' }}>{pct}%</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-caption)' }}>{isRTL ? 'النتيجة' : 'Score'}</div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
                <button onClick={restart} style={{
                  padding: '14px 32px', borderRadius: 12, border: 'none', fontWeight: 800, fontSize: '0.95rem',
                  background: 'linear-gradient(135deg, var(--accent-blue), var(--accent-indigo))', color: '#fff', cursor: 'pointer',
                }}>
                  {isRTL ? '🔄 أعِد الاختبار' : '🔄 Retake Test'}
                </button>
                <Link href="/explore" style={{
                  padding: '14px 32px', borderRadius: 12, fontWeight: 700, fontSize: '0.95rem', textDecoration: 'none',
                  background: 'var(--bg-elevated)', color: 'var(--text-primary)', border: '1px solid var(--border-primary)',
                  display: 'inline-block',
                }}>
                  {isRTL ? '📚 استكشف أكتر' : '📚 Explore More'}
                </Link>
              </div>
            </div>
          )}

          {/* Back Link */}
          <div style={{ textAlign: 'center', marginTop: 48 }}>
            <Link href="/explore" style={{ color: 'var(--text-caption)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 600 }}>
              {isRTL ? 'الرجوع للاستكشاف →' : '← Back to Explore'}
            </Link>
          </div>

          <PageNavigation currentPath="/defense-pages-map" />
        </div>
      </main>
    </>
  );
}
