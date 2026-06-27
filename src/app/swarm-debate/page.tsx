'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { PageNavigation } from '@/components/shared/page-navigation';
import { PageAIChatbot } from '@/components/shared/page-ai-chatbot';
import ToolGuide from '@/components/ToolGuide';

// ── Types ─────────────────────────────────────────────────────────────────────

type Lang = 'en' | 'ar';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface RoundResult {
  /** The AI's counter-argument (the manipulative claim this round) */
  aiClaim: string;
  /** Fallacy the AI used (revealed after user submits rebuttal) */
  fallacyUsed: string;
  fallacyDescription: string;
  /** User's rebuttal text */
  userRebuttal: string;
  /** Whether user's rebuttal text explicitly named the fallacy */
  userNamedFallacy: boolean;
}

// ── Static data ───────────────────────────────────────────────────────────────

const archetypes = [
  {
    id: 'ad-hominem',
    emoji: '😤',
    color: '#ef4444',
    badge: 'AGGRESSOR',
    name: { en: 'Ad-Hominem Attacker', ar: 'المهاجم الشخصي' },
    style: {
      en: 'Attacks the person, not the argument. Discredits credentials, questions motives, uses character assassination.',
      ar: 'يهاجم الشخص لا الحجة. يشكك في المصداقية ويستخدم تشويه الشخصية بدلاً من الرد على الفكرة.',
    },
    counter: {
      en: 'Expose the logical disconnect: "That says nothing about whether the claim is true or false."',
      ar: 'افصل بين المهاجِم والفكرة: "هذا لا علاقة له بصحة أو خطأ الادعاء."',
    },
  },
  {
    id: 'cherry-picker',
    emoji: '🍒',
    color: '#f59e0b',
    badge: 'DECEIVER',
    name: { en: 'Cherry-Picker', ar: 'انتقائي الأدلة' },
    style: {
      en: 'Selects only supporting data while hiding contradicting evidence. Uses out-of-context statistics and truncated quotes.',
      ar: 'يختار فقط البيانات الداعمة ويخفي الأدلة المضادة. يستخدم إحصاءات خارج سياقها.',
    },
    counter: {
      en: 'Ask for the full dataset. Point out what was omitted and why that matters.',
      ar: 'اطلب مجموعة البيانات الكاملة. وضّح ما تم إغفاله ولماذا يهمّ.',
    },
  },
  {
    id: 'false-authority',
    emoji: '🧔',
    color: '#8b5cf6',
    badge: 'IMPERSONATOR',
    name: { en: 'False Authority', ar: 'شيخ السلطة الزائفة' },
    style: {
      en: 'Claims unearned religious or scientific authority. Misquotes scholars, fabricates consensus, appeals to unnamed "top scientists."',
      ar: 'يدّعي سلطة دينية أو علمية لا يملكها. يزور الاقتباسات ويختلق إجماعًا.',
    },
    counter: {
      en: 'Verify credentials. Cross-reference with primary sources and named scholars.',
      ar: 'تحقق من المؤهلات. راجع المصادر الأولية والعلماء المسمّيين.',
    },
  },
  {
    id: 'conspiracy-framer',
    emoji: '👁️',
    color: '#06b6d4',
    badge: 'PARANOID',
    name: { en: 'Conspiracy Framer', ar: 'مُصَوِّر المؤامرة' },
    style: {
      en: 'Weaves unfalsifiable conspiracy narratives. Uses "just asking questions" tactics and dismisses all evidence as "part of the cover-up."',
      ar: 'يبني روايات مؤامرة لا يمكن دحضها. يستخدم أسلوب "فقط أطرح أسئلة" ويرفض كل الأدلة بحجة التعتيم.',
    },
    counter: {
      en: 'Demand a falsifiable prediction. Apply Occam\'s Razor: what is the simplest explanation?',
      ar: 'اطلب تنبؤًا قابلاً للاختبار. طبّق مبدأ أوكام: ما أبسط تفسير ممكن؟',
    },
  },
  {
    id: 'deepfake-skeptic',
    emoji: '🤖',
    color: '#10b981',
    badge: 'DENIER',
    name: { en: 'Deepfake Skeptic', ar: 'المشكك بالتزييف' },
    style: {
      en: 'Uses AI and deepfake doubt to dismiss authentic evidence while spreading manipulated content.',
      ar: 'يوظّف شكّ التزييف لرفض الأدلة الحقيقية بينما ينشر هو محتوى مُلاعَبًا به.',
    },
    counter: {
      en: 'Use C2PA metadata verification and ELA image forensic analysis to authenticate original media.',
      ar: 'استخدم التحقق من بيانات C2PA وتحليل ELA للتحقق من أصالة الوسائط.',
    },
  },
];

const SCENARIOS = [
  {
    label: { en: "Garlic & lemon 'cure' cancer", ar: "الثوم والليمون «يعالجان» السرطان" },
    tag: 'health',
    input: "The viral claim that a daily mix of garlic, lemon and honey on an empty stomach cures cancer and that hospitals hide this so they can keep selling chemotherapy.",
  },
  {
    label: { en: "Insulin is a 'lie' / diet only", ar: "الإنسولين «كذبة»" },
    tag: 'health',
    input: "The diet-influencer claim that insulin and diabetes medication are a pharmaceutical lie, and that any diabetic can quit their medicine completely just by following a specific eating plan.",
  },
  {
    label: { en: "Screenshot fatwa, no chain", ar: "فتوى بصورة بلا سند" },
    tag: 'religion',
    input: "A forwarded screenshot of a 'fatwa' declaring something forbidden, with no named scholar, no source, and no chain — presented as the agreed position of all scholars.",
  },
  {
    label: { en: "Edited clip = 'official admits it'", ar: "مقطع مُعدّل «اعتراف رسمي»" },
    tag: 'media',
    input: "A short edited video clip circulating as proof that an official 'admitted' a hidden plan, where the quote is cut off mid-sentence and the full context is never shown.",
  },
];

const T = {
  title:        { en: 'AI Debate Panel',                    ar: 'لجنة المناظرة' },
  subtitle:     { en: '5 adversary archetypes, each using a different manipulation tactic. Identify the fallacy and respond with evidence.',
                  ar: '٥ نماذج خصم، كلٌّ يستخدم أسلوب تلاعب مختلفًا. حدّد المغالطة وردّ بالأدلة.' },
  enterClaim:   { en: 'Enter a claim to debate',            ar: 'أدخل ادعاءً للمناظرة' },
  placeholder:  { en: 'e.g., "Vaccines cause autism…"',    ar: 'مثال: «اللقاحات تسبب التوحد…»' },
  startBtn:     { en: '⚔️ Start Debate',                   ar: '⚔️ ابدأ المناظرة' },
  retreatBtn:   { en: 'End Session',                        ar: 'إنهاء الجلسة' },
  aiClaim:      { en: "Opponent's claim:",                  ar: 'ادعاء الخصم:' },
  yourRebuttal: { en: 'Your rebuttal:',                     ar: 'ردّك:' },
  rebuttalPH:   { en: 'Identify the fallacy and counter the claim…', ar: 'حدّد المغالطة وردّ على الادعاء…' },
  submitBtn:    { en: 'Submit Rebuttal',                    ar: 'أرسل ردّك' },
  loading:      { en: 'Opponent is forming a response…',   ar: 'الخصم يُصيغ ردًّا…' },
  error:        { en: '⚠ Could not reach debate engine. Check your connection and try again.', ar: '⚠ تعذّر الوصول إلى محرك المناظرة. تحقق من الاتصال وأعد المحاولة.' },
  roundLabel:   { en: 'Round',                              ar: 'الجولة' },
  fallacyWas:   { en: 'Fallacy used:',                      ar: 'المغالطة المستخدمة:' },
  namedIt:      { en: '✓ You identified the fallacy!',      ar: '✓ لقد حددت المغالطة!' },
  missedIt:     { en: '✗ Fallacy not identified in rebuttal', ar: '✗ لم تذكر المغالطة في ردّك' },
  debateTopic:  { en: 'Topic:',                             ar: 'موضوع النقاش:' },
  rulesTitle:   { en: 'Debate Rules',                       ar: 'قواعد المناظرة' },
  archLabel:    { en: 'Archetype:',                         ar: 'النموذج:' },
  counterLabel: { en: 'Counter strategy:',                  ar: 'استراتيجية الرد:' },
  styleLabel:   { en: 'Tactic:',                            ar: 'الأسلوب:' },
  langToggle:   { en: 'عربي',                               ar: 'English' },
};

const RULES: { en: string; ar: string }[] = [
  { en: 'Use SIFT: Stop, Investigate source, Find coverage, Trace claims.', ar: 'استخدم SIFT: توقف، تحقق من المصدر، ابحث عن تغطية، تتبّع الادعاء.' },
  { en: 'Identify the specific fallacy to show you understood the tactic.', ar: 'حدّد المغالطة بالاسم لتُثبت أنك فهمت الأسلوب.' },
  { en: 'FLICC: Fake experts · Logical fallacies · Impossible expectations · Cherry-picking · Conspiracy theories.', ar: 'FLICC: خبراء وهميون · مغالطات منطقية · توقعات مستحيلة · انتقاء الأدلة · نظريات المؤامرة.' },
  { en: 'Answer in the same language the opponent uses.', ar: 'أجب بنفس لغة الخصم.' },
];

// ── Component ─────────────────────────────────────────────────────────────────

export default function SwarmDebatePage() {
  const [lang, setLang] = useState<Lang>('en');
  const isRtl = lang === 'ar';

  const [topic, setTopic] = useState('');
  const [activeArchIdx, setActiveArchIdx] = useState(0);
  const [inSession, setInSession] = useState(false);

  // conversation history sent to the API
  const [messages, setMessages] = useState<Message[]>([]);
  // current round counter
  const [round, setRound] = useState(0);
  // the current AI claim waiting for a user rebuttal
  const [currentClaim, setCurrentClaim] = useState<{ text: string; fallacyUsed: string; fallacyDescription: string } | null>(null);
  // user's typed rebuttal
  const [rebuttal, setRebuttal] = useState('');
  // loading / error state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // log of past rounds
  const [roundLog, setRoundLog] = useState<RoundResult[]>([]);

  const t = (key: keyof typeof T) => T[key][lang];

  // ── Helpers ────────────────────────────────────────────────────────────────

  /** Fetch one AI counter-claim from the debate-sim endpoint */
  const fetchAIClaim = async (history: Message[]): Promise<{ text: string; fallacyUsed: string; fallacyDescription: string }> => {
    const res = await fetch('/api/debate-sim', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: history }),
    });
    if (!res.ok) {
      const errBody = await res.json().catch(() => ({}));
      throw new Error(errBody?.error || `HTTP ${res.status}`);
    }
    const data = await res.json();
    if (!data.response) throw new Error('Empty response from debate engine');
    return {
      text: data.response as string,
      fallacyUsed: (data.fallacyUsed as string) || 'Unknown fallacy',
      fallacyDescription: (data.fallacyDescription as string) || '',
    };
  };

  /** Check whether the user's rebuttal text names the fallacy (case-insensitive partial match) */
  const checkNamed = (rebuttalText: string, fallacyName: string): boolean => {
    const normalise = (s: string) => s.toLowerCase().replace(/[^a-z0-9؀-ۿ ]/g, '');
    // Match on first significant word of the fallacy name (e.g. "ad hominem" → "ad hominem")
    const key = normalise(fallacyName).split(' ').slice(0, 3).join(' ');
    return normalise(rebuttalText).includes(key);
  };

  // ── Session lifecycle ──────────────────────────────────────────────────────

  const startSession = async (inputTopic: string) => {
    if (!inputTopic.trim()) return;
    setInSession(true);
    setRound(0);
    setMessages([]);
    setRoundLog([]);
    setRebuttal('');
    setError(null);
    setCurrentClaim(null);
    // First turn: feed the topic as the opening user message
    const seed: Message[] = [{ role: 'user', content: inputTopic }];
    setMessages(seed);
    await requestNextClaim(seed);
  };

  const requestNextClaim = async (history: Message[]) => {
    setLoading(true);
    setError(null);
    try {
      const claim = await fetchAIClaim(history);
      setCurrentClaim(claim);
      setRound(r => r + 1);
    } catch (err: any) {
      setError(err?.message || 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  const submitRebuttal = async () => {
    if (!rebuttal.trim() || !currentClaim) return;
    const named = checkNamed(rebuttal, currentClaim.fallacyUsed);
    const completed: RoundResult = {
      aiClaim: currentClaim.text,
      fallacyUsed: currentClaim.fallacyUsed,
      fallacyDescription: currentClaim.fallacyDescription,
      userRebuttal: rebuttal,
      userNamedFallacy: named,
    };
    setRoundLog(prev => [completed, ...prev]);
    const updatedMessages: Message[] = [
      ...messages,
      { role: 'assistant', content: currentClaim.text },
      { role: 'user', content: rebuttal },
    ];
    setMessages(updatedMessages);
    setRebuttal('');
    setCurrentClaim(null);
    await requestNextClaim(updatedMessages);
  };

  const endSession = () => {
    setInSession(false);
    setTopic('');
    setMessages([]);
    setRoundLog([]);
    setCurrentClaim(null);
    setRebuttal('');
    setError(null);
    setRound(0);
  };

  const loadScenario = (input: string) => {
    setTopic(input);
    startSession(input);
  };

  // ── Render helpers ─────────────────────────────────────────────────────────

  const arch = archetypes[activeArchIdx];

  // ── JSX ────────────────────────────────────────────────────────────────────

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Cairo:wght@400;600;700;800&display=swap');
        @keyframes debateFadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes debateFloat { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
        .arch-card { transition: transform 0.2s ease, box-shadow 0.2s ease; }
        .arch-card:hover { transform: scale(1.04); box-shadow: 0 12px 40px rgba(0,0,0,0.4); }
        .arch-card:focus { outline: 2px solid #ef4444; outline-offset: 2px; }
      `}</style>

      <main
        dir={isRtl ? 'rtl' : 'ltr'}
        style={{
          minHeight: '100vh', background: '#020617', color: '#e2e8f0',
          fontFamily: isRtl ? 'Cairo, sans-serif' : 'Inter, sans-serif',
          padding: '40px 24px 80px',
        }}
      >
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>

          {/* ── Header ─────────────────────────────────────────────── */}
          <header style={{ textAlign: 'center', marginBottom: 40, animation: 'debateFadeIn 0.5s ease-out' }}>
            {/* lang toggle */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
              <button
                onClick={() => setLang(l => l === 'en' ? 'ar' : 'en')}
                style={{
                  padding: '6px 18px', borderRadius: 8, border: '1px solid rgba(255,255,255,0.12)',
                  background: 'rgba(255,255,255,0.05)', color: '#94a3b8', cursor: 'pointer',
                  fontSize: '0.85rem', fontWeight: 700,
                }}
              >
                {t('langToggle')}
              </button>
            </div>

            <div style={{
              display: 'inline-flex', width: 72, height: 72, borderRadius: 20, fontSize: 36,
              alignItems: 'center', justifyContent: 'center', marginBottom: 14,
              background: 'linear-gradient(135deg, #ef4444, #f97316)',
              boxShadow: '0 0 36px rgba(239,68,68,0.35)',
            }}>⚔️</div>

            <h1 style={{
              fontSize: 'clamp(1.8rem,5vw,3rem)', fontWeight: 900, margin: '0 0 6px',
              background: 'linear-gradient(135deg, #ef4444, #f97316, #f59e0b)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            }}>
              {t('title')}
            </h1>

            <p style={{ color: '#64748b', maxWidth: 600, margin: '10px auto 0', lineHeight: 1.7, fontSize: '1rem' }}>
              {t('subtitle')}
            </p>
          </header>

          {/* ── Pre-session: ToolGuide + claim input ──────────────── */}
          {!inSession && (
            <>
              <ToolGuide
                titleEn="How to use the Debate Arena"
                titleAr="كيفية استخدام ساحة المناظرة"
                accent="#ef4444"
                lang={lang}
                whoBenefits={{
                  en: "Anyone who wants to practise spotting manipulation tactics before a real argument. Each round, an AI archetype fires a manipulative claim at you — identify the fallacy and craft a rebuttal to score.",
                  ar: "كل من يريد التدرب على اكتشاف أساليب التلاعب قبل مواجهتها في الواقع. في كل جولة، يطلق نموذج ذكاء اصطناعي ادعاءً تلاعبيًّا — حدّد المغالطة وأعدّ ردًّا.",
                }}
                steps={[
                  { en: "Type the claim you want to debate, or load a ready example below.", ar: "اكتب الادعاء الذي تريد مناظرته، أو اختر مثالًا جاهزًا أدناه." },
                  { en: "Choose which archetype archetype you want to face from the panel.", ar: "اختر النموذج الذي تريد مواجهته من اللوحة." },
                  { en: "Read the AI's manipulative counter-claim carefully.", ar: "اقرأ ادعاء الخصم بعناية." },
                  { en: "Type your rebuttal — name the fallacy to earn full credit.", ar: "اكتب ردّك — سمِّ المغالطة لتحصل على التقييم الكامل." },
                ]}
                scenarios={SCENARIOS.map(s => ({
                  label: s.label.en, labelAr: s.label.ar, tag: s.tag, input: s.input,
                }))}
                onTry={loadScenario}
              />

              {/* Claim input */}
              <div style={{
                background: 'rgba(15,23,42,0.8)', backdropFilter: 'blur(12px)', borderRadius: 20,
                border: '1px solid rgba(239,68,68,0.2)', padding: 28, marginBottom: 28,
                animation: 'debateFadeIn 0.5s ease-out 0.15s both',
              }}>
                <label style={{
                  display: 'block', fontSize: '0.8rem', color: '#94a3b8', fontWeight: 700,
                  marginBottom: 10, textTransform: 'uppercase', letterSpacing: 1,
                }}>
                  {t('enterClaim')}
                </label>
                <textarea
                  value={topic}
                  onChange={e => setTopic(e.target.value)}
                  placeholder={t('placeholder')}
                  rows={3}
                  style={{
                    width: '100%', padding: 12, borderRadius: 10, border: '1px solid rgba(255,255,255,0.1)',
                    background: 'rgba(0,0,0,0.3)', color: '#e2e8f0', fontSize: '0.95rem',
                    outline: 'none', resize: 'vertical', boxSizing: 'border-box',
                    fontFamily: isRtl ? 'Cairo, sans-serif' : 'Inter, sans-serif',
                    direction: isRtl ? 'rtl' : 'ltr',
                  }}
                />
                <button
                  onClick={() => startSession(topic)}
                  disabled={!topic.trim()}
                  style={{
                    marginTop: 14, padding: '12px 32px', borderRadius: 10, border: 'none',
                    fontWeight: 800, fontSize: '0.95rem',
                    background: topic.trim() ? 'linear-gradient(135deg, #ef4444, #f97316)' : 'rgba(255,255,255,0.06)',
                    color: topic.trim() ? '#fff' : '#475569',
                    cursor: topic.trim() ? 'pointer' : 'not-allowed',
                    boxShadow: topic.trim() ? '0 0 20px rgba(239,68,68,0.3)' : 'none',
                    transition: 'all 0.25s',
                  }}
                >
                  {t('startBtn')}
                </button>
              </div>

              {/* Archetype selector (informational pre-session) */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px,1fr))', gap: 14, marginBottom: 28 }}>
                {archetypes.map((a, i) => (
                  <button
                    key={a.id}
                    className="arch-card"
                    onClick={() => setActiveArchIdx(i)}
                    style={{
                      padding: '20px 16px', borderRadius: 18, cursor: 'pointer',
                      textAlign: isRtl ? 'right' : 'center',
                      background: 'rgba(15,23,42,0.8)', backdropFilter: 'blur(12px)',
                      border: `1px solid ${activeArchIdx === i ? a.color + '60' : 'rgba(255,255,255,0.06)'}`,
                      boxShadow: activeArchIdx === i ? `0 0 18px ${a.color}25` : 'none',
                      animation: `debateFadeIn 0.5s ease-out ${0.2 + i * 0.08}s both`,
                    }}
                  >
                    <div style={{ fontSize: 40, marginBottom: 8, textAlign: 'center', animation: 'debateFloat 3s ease-in-out infinite', animationDelay: `${i * 0.3}s` }}>{a.emoji}</div>
                    <span style={{ display: 'inline-block', padding: '2px 8px', borderRadius: 5, background: `${a.color}20`, color: a.color, fontSize: '0.6rem', fontWeight: 800, letterSpacing: 1, marginBottom: 6 }}>{a.badge}</span>
                    <div style={{ fontSize: '0.9rem', fontWeight: 800, color: a.color, marginBottom: 2 }}>{a.name[lang]}</div>
                    {activeArchIdx === i && (
                      <div style={{ marginTop: 10, textAlign: isRtl ? 'right' : 'left' }}>
                        <p style={{ fontSize: '0.72rem', color: '#94a3b8', lineHeight: 1.5, marginBottom: 6 }}>
                          <strong style={{ color: '#e2e8f0' }}>{t('styleLabel')}</strong> {a.style[lang]}
                        </p>
                        <p style={{ fontSize: '0.72rem', color: '#10b981', lineHeight: 1.5 }}>
                          <strong>{t('counterLabel')}</strong> {a.counter[lang]}
                        </p>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </>
          )}

          {/* ── Active session ────────────────────────────────────── */}
          {inSession && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: 24 }}>

              {/* Main column */}
              <div>
                {/* Session header bar */}
                <div style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  flexWrap: 'wrap', gap: 12, padding: '14px 20px', borderRadius: 14,
                  background: 'rgba(15,23,42,0.8)', backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255,255,255,0.06)', marginBottom: 20,
                }}>
                  <div>
                    <span style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>{t('roundLabel')}</span>
                    <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#f59e0b' }}>{round}</div>
                  </div>
                  <div style={{ flex: 1, maxWidth: 340 }}>
                    <span style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 600 }}>{t('debateTopic')}</span>
                    <div style={{ fontSize: '0.8rem', color: '#cbd5e1', marginTop: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {topic.slice(0, 80)}{topic.length > 80 ? '…' : ''}
                    </div>
                  </div>
                  <button
                    onClick={endSession}
                    style={{
                      padding: '7px 18px', borderRadius: 8, border: '1px solid rgba(239,68,68,0.3)',
                      background: 'rgba(239,68,68,0.08)', color: '#ef4444', cursor: 'pointer',
                      fontWeight: 700, fontSize: '0.78rem',
                    }}
                  >
                    {t('retreatBtn')}
                  </button>
                </div>

                {/* Current claim / rebuttal panel */}
                <div style={{
                  background: 'rgba(15,23,42,0.8)', backdropFilter: 'blur(12px)', borderRadius: 18,
                  border: '1px solid rgba(239,68,68,0.15)', padding: 28, marginBottom: 24,
                }}>
                  {loading && (
                    <div style={{ textAlign: 'center', padding: '36px 0', color: '#94a3b8' }}>
                      <div style={{
                        width: 36, height: 36, borderRadius: '50%', margin: '0 auto 14px',
                        border: '3px solid rgba(239,68,68,0.2)', borderTopColor: '#ef4444',
                        animation: 'spin 0.8s linear infinite',
                      }} />
                      <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
                      <p style={{ fontSize: '0.9rem' }}>{t('loading')}</p>
                    </div>
                  )}

                  {error && (
                    <div style={{
                      padding: 16, borderRadius: 12, background: 'rgba(239,68,68,0.1)',
                      border: '1px solid rgba(239,68,68,0.3)', color: '#fca5a5',
                      fontSize: '0.9rem', lineHeight: 1.6,
                    }}>
                      {t('error')}
                      <div style={{ fontSize: '0.75rem', color: '#ef4444', marginTop: 6 }}>{error}</div>
                      <button
                        onClick={() => requestNextClaim(messages)}
                        style={{
                          marginTop: 12, padding: '8px 20px', borderRadius: 8, border: 'none',
                          background: 'rgba(239,68,68,0.2)', color: '#fca5a5', cursor: 'pointer', fontWeight: 700,
                        }}
                      >
                        Retry / أعد المحاولة
                      </button>
                    </div>
                  )}

                  {!loading && !error && currentClaim && (
                    <>
                      {/* AI claim box */}
                      <div style={{ marginBottom: 20 }}>
                        <span style={{ fontSize: '0.75rem', color: '#ef4444', fontWeight: 800, textTransform: 'uppercase', letterSpacing: 0.8 }}>
                          {t('aiClaim')}
                        </span>
                        <div style={{
                          marginTop: 8, padding: 16, borderRadius: 12,
                          background: 'rgba(239,68,68,0.07)', border: '1px solid rgba(239,68,68,0.2)',
                          color: '#fcd9d9', fontSize: '0.95rem', lineHeight: 1.7,
                          direction: 'ltr', // AI responds in the topic language; let natural direction handle it
                        }}>
                          {currentClaim.text}
                        </div>
                      </div>

                      {/* Rebuttal input */}
                      <div>
                        <label style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 800, textTransform: 'uppercase', letterSpacing: 0.8 }}>
                          {t('yourRebuttal')}
                        </label>
                        <textarea
                          value={rebuttal}
                          onChange={e => setRebuttal(e.target.value)}
                          placeholder={t('rebuttalPH')}
                          rows={4}
                          style={{
                            width: '100%', marginTop: 8, padding: 12, borderRadius: 10,
                            border: '1px solid rgba(16,185,129,0.2)', background: 'rgba(0,0,0,0.3)',
                            color: '#e2e8f0', fontSize: '0.95rem', outline: 'none',
                            resize: 'vertical', boxSizing: 'border-box',
                            fontFamily: isRtl ? 'Cairo, sans-serif' : 'Inter, sans-serif',
                            direction: isRtl ? 'rtl' : 'ltr',
                          }}
                        />
                        <button
                          onClick={submitRebuttal}
                          disabled={!rebuttal.trim()}
                          style={{
                            marginTop: 12, padding: '11px 28px', borderRadius: 10, border: 'none',
                            fontWeight: 800, fontSize: '0.9rem',
                            background: rebuttal.trim() ? 'linear-gradient(135deg, #10b981, #059669)' : 'rgba(255,255,255,0.05)',
                            color: rebuttal.trim() ? '#fff' : '#475569',
                            cursor: rebuttal.trim() ? 'pointer' : 'not-allowed',
                            transition: 'all 0.2s',
                          }}
                        >
                          {t('submitBtn')}
                        </button>
                      </div>
                    </>
                  )}
                </div>

                {/* Round log */}
                {roundLog.length > 0 && (
                  <div>
                    {roundLog.map((r, i) => (
                      <div
                        key={i}
                        style={{
                          background: 'rgba(15,23,42,0.7)', borderRadius: 14,
                          border: '1px solid rgba(255,255,255,0.05)', padding: 18, marginBottom: 14,
                          opacity: i === 0 ? 1 : 0.65,
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, flexWrap: 'wrap', gap: 8 }}>
                          <span style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>
                            {t('roundLabel')} {roundLog.length - i}
                          </span>
                          <span style={{
                            padding: '3px 10px', borderRadius: 6,
                            background: r.userNamedFallacy ? 'rgba(16,185,129,0.15)' : 'rgba(239,68,68,0.1)',
                            color: r.userNamedFallacy ? '#10b981' : '#ef4444',
                            fontSize: '0.7rem', fontWeight: 800,
                          }}>
                            {r.userNamedFallacy ? t('namedIt') : t('missedIt')}
                          </span>
                        </div>

                        <div style={{ fontSize: '0.78rem', color: '#64748b', marginBottom: 4 }}>
                          <strong style={{ color: '#f59e0b' }}>{t('fallacyWas')}</strong> {r.fallacyUsed}
                          {r.fallacyDescription ? <span style={{ color: '#475569' }}> — {r.fallacyDescription}</span> : null}
                        </div>

                        <div style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: 6, borderTop: '1px solid rgba(255,255,255,0.04)', paddingTop: 8 }}>
                          <strong style={{ color: '#ef4444', fontSize: '0.7rem' }}>{t('aiClaim')}</strong>{' '}
                          <span style={{ fontStyle: 'italic' }}>{r.aiClaim.slice(0, 120)}{r.aiClaim.length > 120 ? '…' : ''}</span>
                        </div>
                        <div style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: 4 }}>
                          <strong style={{ color: '#10b981', fontSize: '0.7rem' }}>{t('yourRebuttal')}</strong>{' '}
                          {r.userRebuttal.slice(0, 120)}{r.userRebuttal.length > 120 ? '…' : ''}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Sidebar: rules + active archetype */}
              <div>
                <div style={{
                  background: 'rgba(15,23,42,0.8)', backdropFilter: 'blur(12px)', borderRadius: 18,
                  border: '1px solid rgba(255,255,255,0.06)', padding: 22, marginBottom: 18,
                  position: 'sticky', top: 24,
                }}>
                  <h3 style={{ fontSize: '0.95rem', fontWeight: 800, marginBottom: 4 }}>📋 {t('rulesTitle')}</h3>
                  <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', marginBottom: 14 }} />
                  {RULES.map((rule, i) => (
                    <div key={i} style={{ display: 'flex', gap: 8, padding: '7px 0', borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                      <span style={{ color: '#f59e0b', fontSize: '0.75rem', marginTop: 1 }}>›</span>
                      <span style={{ fontSize: '0.75rem', color: '#94a3b8', lineHeight: 1.5 }}>{rule[lang]}</span>
                    </div>
                  ))}
                </div>

                {/* Archetype selector (in-session) */}
                <div style={{
                  background: 'rgba(15,23,42,0.8)', backdropFilter: 'blur(12px)', borderRadius: 18,
                  border: `1px solid ${arch.color}30`, padding: 20,
                }}>
                  <span style={{ fontSize: '0.65rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase' }}>{t('archLabel')}</span>
                  <div style={{ fontSize: 36, textAlign: 'center', margin: '8px 0' }}>{arch.emoji}</div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 800, color: arch.color, textAlign: 'center', marginBottom: 10 }}>{arch.name[lang]}</div>
                  <p style={{ fontSize: '0.72rem', color: '#94a3b8', lineHeight: 1.5, marginBottom: 8 }}>
                    <strong style={{ color: '#e2e8f0' }}>{t('styleLabel')}</strong> {arch.style[lang]}
                  </p>
                  <p style={{ fontSize: '0.72rem', color: '#10b981', lineHeight: 1.5 }}>
                    <strong>{t('counterLabel')}</strong> {arch.counter[lang]}
                  </p>
                  {/* Quick-switch archetypes */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 12 }}>
                    {archetypes.map((a, i) => (
                      <button
                        key={a.id}
                        onClick={() => setActiveArchIdx(i)}
                        title={a.name[lang]}
                        style={{
                          fontSize: 18, background: activeArchIdx === i ? `${a.color}25` : 'rgba(255,255,255,0.04)',
                          border: `1px solid ${activeArchIdx === i ? a.color + '50' : 'rgba(255,255,255,0.06)'}`,
                          borderRadius: 8, padding: '4px 7px', cursor: 'pointer',
                        }}
                      >
                        {a.emoji}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── Back link ─────────────────────────────────────────── */}
          <div style={{ textAlign: 'center', marginTop: 48 }}>
            <Link href="/explore" style={{ color: '#64748b', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 600 }}>
              ← Back to Explore
            </Link>
            <PageNavigation currentPath="/swarm-debate" />
          </div>

        </div>
      </main>

      <PageAIChatbot
        pageTitle="AI Debate Panel — لجنة المناظرة"
        pageContext="EAL Swarm Debate: Practice identifying manipulation tactics and logical fallacies deployed by 5 AI archetypes (Ad-Hominem, Cherry-Picker, False Authority, Conspiracy Framer, Deepfake Skeptic). Each round the AI fires a real fallacy-embedded claim; the user must identify and rebut it."
        systemPrompt={`[LAYER 1 - ROLE]: You are the EAL Debate Coach — an expert in adversarial argumentation, logical fallacy identification, and debate strategy.

[LAYER 2 - THE 5 ARCHETYPES]:
1. Ad-Hominem Attacker — attacks the person, not the argument. Counter: expose the logical disconnect.
2. Cherry-Picker — selects only supporting data. Counter: request the full dataset, cite omitted evidence.
3. False Authority — claims unearned religious/scientific authority. Counter: verify credentials, cross-reference primary sources.
4. Conspiracy Framer — unfalsifiable narratives. Counter: demand falsifiable predictions, apply Occam's Razor.
5. Deepfake Skeptic — uses AI doubt to dismiss evidence. Counter: C2PA metadata verification, ELA forensics.

[LAYER 3 - FLICC FRAMEWORK]:
F = Fake Experts, L = Logical Fallacies, I = Impossible Expectations, C = Cherry-Picking, C = Conspiracy Theories

[LAYER 4 - RULES]:
1. Help users identify which fallacy they are facing.
2. Suggest specific counter-strategies.
3. Teach SIFT: Stop, Investigate source, Find coverage, Trace claims.
4. Give qualitative feedback on rebuttals — never fabricate a numeric score.
5. Respond in the user's language.`}
        suggestedQuestions={[
          'إزاي أرد على حد بيهاجمني شخصياً مش بيرد على كلامي؟',
          'How do I counter cherry-picked statistics?',
          'ما الفرق بين التشكيك المشروع ونظرية المؤامرة؟',
          'How to verify if a sheikh is qualified to give fatwa?',
        ]}
        accentColor="#ef4444"
        accentColorRgb="239,68,68"
      />
    </>
  );
}
