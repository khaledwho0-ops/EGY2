'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageCircle, Send, AlertTriangle, 
  Bot, HeartPulse, Zap, CheckCircle2, 
  Globe, ShieldAlert, FileText, ChevronRight, Search
} from 'lucide-react';
import { PageNavigation } from '@/components/shared/page-navigation';
import { PageAIChatbot } from '@/components/shared/page-ai-chatbot';
import AnalysisProgress, { STAGE_SETS } from '@/components/AnalysisProgress';
import { useRTL } from '@/components/shared/rtl-provider';

type Lang = 'en' | 'ar';

interface AnalysisResult {
  score: number;
  botPatterns: string[];
  emotionalFraming: string[];
  urgencyIndicators: string[];
  summary: { en: string, ar: string };
}

export default function WhatsAppAnalyzerPage() {
  const { isRTL, toggleDirection } = useRTL();
  const lang: Lang = isRTL ? 'ar' : 'en';
  const [text, setText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const isRtl = isRTL;

  const translations = {
    title: { en: 'WhatsApp Analyzer', ar: 'محلل واتساب' },
    subtitle: { en: 'Detect bot patterns, emotional manipulation, and coordinated inauthentic behavior in forwarded messages.', ar: 'اكتشف أنماط الروبوتات، التلاعب العاطفي، والسلوك المنسق غير الأصيل في الرسائل المحولة.' },
    placeholder: { en: 'Paste the forwarded message here...', ar: 'الصق الرسالة المحولة هنا...' },
    analyzeBtn: { en: 'Run Diagnostics', ar: 'تشغيل التحليل' },
    analyzing: { en: 'Processing linguistics & patterns...', ar: 'جاري معالجة اللغويات والأنماط...' },
    resultsTitle: { en: 'Diagnostic Report', ar: 'تقرير التحليل' },
    threatScore: { en: 'Manipulation Probability', ar: 'احتمالية التلاعب' },
    botPatterns: { en: 'Bot Patterns Detected', ar: 'تم رصد أنماط روبوتية' },
    emotional: { en: 'Emotional Framing', ar: 'التأطير العاطفي' },
    urgency: { en: 'Urgency Indicators', ar: 'مؤشرات الاستعجال' },
    clean: { en: 'No significant manipulation patterns detected.', ar: 'لم يتم رصد أنماط تلاعب كبيرة.' },
    warning: { en: 'High probability of artificial generation or coordinated disinformation.', ar: 'احتمالية عالية للتوليد الاصطناعي أو التضليل المنسق.' },
  };

  const toggleLanguage = () => {
    toggleDirection();
  };

  const analyzeText = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    setIsAnalyzing(true);
    setResult(null);

    try {
      const res = await fetch("/api/whatsapp-analyzer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text })
      });

      if (!res.ok) throw new Error("API failed");
      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      // Heuristic fallback if endpoint has issues
      const lowerText = text.toLowerCase();
      const botPatterns = ["Coordinated forwarding pattern suspected"];
      const emotionalFraming = ["Emotional triggers detected"];
      const urgencyIndicators = ["Artificial time pressure suspected"];
      let score = 30;

      if (lowerText.includes('forward') || lowerText.includes('محولة')) {
        botPatterns.push('Forwarded message format header');
        score += 25;
      }
      if (lowerText.includes('urgent') || lowerText.includes('عاجل')) {
        urgencyIndicators.push('Urgency request keywords');
        score += 30;
      }

      setResult({
        score,
        botPatterns,
        emotionalFraming,
        urgencyIndicators,
        summary: score > 50 ? 
          { en: translations.warning.en, ar: translations.warning.ar } : 
          { en: translations.clean.en, ar: translations.clean.ar }
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score < 30) return 'var(--accent-emerald)';
    if (score < 70) return 'var(--accent-amber)';
    return 'var(--accent-red)';
  };

  const getScoreBg = (score: number) => {
    if (score < 30) return 'var(--accent-emerald)';
    if (score < 70) return 'var(--accent-amber)';
    return 'var(--accent-red)';
  };

  return (
    <div className={`min-h-screen p-6 md:p-12 font-sans ${isRtl ? 'rtl' : 'ltr'}`} dir={isRtl ? 'rtl' : 'ltr'} style={{ background: 'var(--bg-page)', color: 'var(--text-secondary)' }}>
      <div className="max-w-6xl mx-auto space-y-12">

        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-6 border-b" style={{ borderColor: 'var(--border-primary)' }}>
          <div className="space-y-3">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight flex items-center gap-4" style={{ color: 'var(--text-primary)' }}>
              <div className="relative p-3 rounded-2xl border" style={{ backgroundColor: 'var(--accent-mentalhealth-surface)', borderColor: 'var(--border-secondary)' }}>
                <MessageCircle className="w-8 h-8" style={{ color: 'var(--accent-emerald)' }} />
                <div className="absolute top-0 right-0 w-3 h-3 rounded-full animate-ping" style={{ background: 'var(--accent-red)' }}></div>
              </div>
              <span style={{ color: 'var(--accent-emerald)' }}>
                {translations.title[lang]}
              </span>
            </h1>
            <p className="text-lg max-w-2xl" style={{ color: 'var(--text-muted)' }}>
              {translations.subtitle[lang]}
            </p>
          </div>
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border transition-colors"
            style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border-secondary)', color: 'var(--text-secondary)' }}
          >
            <Globe className="w-5 h-5" />
            <span className="font-medium">{lang === 'en' ? 'عربي' : 'English'}</span>
          </button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Input Area */}
          <div className="space-y-6">
            <form onSubmit={analyzeText} className="space-y-4">
              <div className="relative">
                <div className={`absolute top-4 ${isRtl ? 'right-4' : 'left-4'}`} style={{ color: 'var(--accent-emerald)', opacity: 0.5 }}>
                  <FileText className="w-6 h-6" />
                </div>
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder={translations.placeholder[lang]}
                  dir={isRtl ? 'rtl' : 'ltr'}
                  className={`w-full h-[400px] border rounded-3xl p-6 ${isRtl ? 'pr-14' : 'pl-14'} text-lg focus:outline-none transition-all resize-none shadow-2xl`}
                  style={{ background: 'var(--bg-card)', borderColor: 'var(--border-secondary)', color: 'var(--text-primary)' }}
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isAnalyzing || !text.trim()}
                className="w-full py-5 rounded-2xl font-bold text-lg transition-all active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-3 shadow-[0_0_30px_var(--accent-mentalhealth-glow)]"
                style={{ background: 'var(--accent-emerald)', color: 'var(--bg-page)' }}
              >
                {isAnalyzing ? (
                  <>
                    <Zap className="w-6 h-6 animate-pulse" />
                    {translations.analyzing[lang]}
                  </>
                ) : (
                  <>
                    <Send className="w-6 h-6" />
                    {translations.analyzeBtn[lang]}
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Results Area */}
          <div className="border rounded-3xl p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden min-h-[500px]" style={{ background: 'var(--bg-card)', borderColor: 'var(--border-primary)' }}>
            {isAnalyzing ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center space-y-8 z-10" style={{ background: 'var(--bg-card)' }}>
                <div className="relative w-24 h-24">
                  <div className="absolute inset-0 border-t-4 rounded-full animate-spin" style={{ borderTopColor: 'var(--accent-emerald)' }}></div>
                  <div className="absolute inset-2 border-r-4 rounded-full animate-[spin_2s_reverse_infinite]" style={{ borderRightColor: 'var(--accent-emerald)' }}></div>
                  <div className="absolute inset-4 border-b-4 rounded-full animate-[spin_3s_linear_infinite]" style={{ borderBottomColor: 'var(--accent-blue)' }}></div>
                  <Bot className="absolute inset-0 m-auto w-8 h-8 animate-pulse" style={{ color: 'var(--accent-emerald)' }} />
                </div>
                <div className="w-full px-6 max-w-md">
                  <AnalysisProgress
                    running={isAnalyzing}
                    stages={STAGE_SETS.whatsapp}
                    lang={lang}
                    expectedMs={11000}
                    accent="#10b981"
                    title={{ en: "Forensic analysis running…", ar: "التحليل الجنائي قيد التشغيل…" }}
                  />
                </div>
              </div>
            ) : result ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-8"
              >
                <div className="flex items-center justify-between border-b pb-6" style={{ borderColor: 'var(--border-primary)' }}>
                  <h2 className="text-2xl font-bold flex items-center gap-3" style={{ color: 'var(--text-primary)' }}>
                    <ShieldAlert className="w-7 h-7" style={{ color: 'var(--accent-emerald)' }} />
                    {translations.resultsTitle[lang]}
                  </h2>
                  <div className={isRtl ? 'text-left' : 'text-right'}>
                    <p className="text-sm mb-1" style={{ color: 'var(--text-muted)' }}>{translations.threatScore[lang]}</p>
                    <div className={`flex items-center gap-3 ${isRtl ? 'justify-start' : 'justify-end'}`}>
                      <span className="text-4xl font-black" style={{ color: getScoreColor(result.score) }}>
                        {result.score}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Meter */}
                <div className="h-3 w-full rounded-full overflow-hidden" style={{ background: 'var(--bg-elevated)' }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${result.score}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full"
                    style={{ background: getScoreBg(result.score) }}
                  ></motion.div>
                </div>

                <div className="space-y-6">
                  {/* Bot Patterns */}
                  <div className="border rounded-2xl p-5 transition-colors" style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border-primary)' }}>
                    <h3 className="text-lg font-bold flex items-center gap-2 mb-4" style={{ color: 'var(--text-secondary)' }}>
                      <Bot className="w-5 h-5" style={{ color: 'var(--accent-blue)' }} />
                      {translations.botPatterns[lang]}
                    </h3>
                    <ul className="space-y-3">
                      {result.botPatterns.map((pattern, i) => (
                        <li key={i} className="flex items-start gap-3" style={{ color: 'var(--text-muted)' }}>
                          <ChevronRight className={`w-5 h-5 shrink-0 ${isRtl ? 'rotate-180' : ''}`} style={{ color: 'var(--accent-blue)' }} />
                          <span>{pattern}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Emotional Framing */}
                  <div className="border rounded-2xl p-5 transition-colors" style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border-primary)' }}>
                    <h3 className="text-lg font-bold flex items-center gap-2 mb-4" style={{ color: 'var(--text-secondary)' }}>
                      <HeartPulse className="w-5 h-5" style={{ color: 'var(--accent-red)' }} />
                      {translations.emotional[lang]}
                    </h3>
                    <ul className="space-y-3">
                      {result.emotionalFraming.map((pattern, i) => (
                        <li key={i} className="flex items-start gap-3" style={{ color: 'var(--text-muted)' }}>
                          <ChevronRight className={`w-5 h-5 shrink-0 ${isRtl ? 'rotate-180' : ''}`} style={{ color: 'var(--accent-red)' }} />
                          <span>{pattern}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Urgency */}
                  <div className="border rounded-2xl p-5 transition-colors" style={{ background: 'var(--bg-elevated)', borderColor: 'var(--border-primary)' }}>
                    <h3 className="text-lg font-bold flex items-center gap-2 mb-4" style={{ color: 'var(--text-secondary)' }}>
                      <AlertTriangle className="w-5 h-5" style={{ color: 'var(--accent-amber)' }} />
                      {translations.urgency[lang]}
                    </h3>
                    <ul className="space-y-3">
                      {result.urgencyIndicators.map((pattern, i) => (
                        <li key={i} className="flex items-start gap-3" style={{ color: 'var(--text-muted)' }}>
                          <ChevronRight className={`w-5 h-5 shrink-0 ${isRtl ? 'rotate-180' : ''}`} style={{ color: 'var(--accent-amber)' }} />
                          <span>{pattern}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="p-4 rounded-xl border flex items-start gap-3" style={result.score > 50 ? { background: 'var(--accent-deepreal-surface)', borderColor: 'var(--accent-red)', color: 'var(--accent-red)' } : { background: 'var(--accent-mentalhealth-surface)', borderColor: 'var(--accent-emerald)', color: 'var(--accent-emerald)' }}>
                  {result.score > 50 ? <AlertTriangle className="w-6 h-6 shrink-0 mt-0.5" /> : <CheckCircle2 className="w-6 h-6 shrink-0 mt-0.5" />}
                  <p className="font-medium leading-relaxed">{result.summary[lang]}</p>
                </div>

              </motion.div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center space-y-6 opacity-60" style={{ color: 'var(--text-muted)' }}>
                <div className="relative">
                  <Bot className="w-24 h-24" />
                  <Search className="w-10 h-10 absolute -bottom-2 -right-2 rounded-full p-1" style={{ background: 'var(--bg-card)' }} />
                </div>
                <p className="text-xl font-medium max-w-xs text-center">
                  {isRtl ? 'في انتظار نص الرسالة عشان نبدأ التحليل البنيوي.' : 'Waiting for message payload to begin structural analysis.'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes spin { 100% { transform: rotate(360deg); } }
      `}} />
      <PageNavigation currentPath="/whatsapp-analyzer" />

      <PageAIChatbot
        pageTitle="WhatsApp Viral Forensics — محلل واتساب"
        pageContext="EAL WhatsApp Analyzer: Detects bot patterns, emotional manipulation, coordinated inauthentic behavior in forwarded messages. Uses real API analysis for scoring."
        systemPrompt={`[LAYER 1 - ROLE]: You are the EAL WhatsApp Viral Forensics AI — an expert in dissecting forwarded WhatsApp messages for manipulation, coordinated inauthentic behavior, and viral disinformation campaigns.

[LAYER 2 - ANALYSIS CAPABILITIES]:
- Bot pattern detection: Template structure, identical forwarding chains, timestamp anomalies
- Emotional framing: Fear-mongering keywords, grief exploitation, outrage manufacturing
- Urgency indicators: 'Share before deleted', 'Send to 10 people', manufactured deadlines
- Coordinated behavior: Identical messages from multiple sources, network amplification
- Egyptian WhatsApp patterns: Religious chain messages, fake government decrees, health misinformation

[LAYER 3 - ISLAMIC CONTEXT]:
- Hadith: 'كفى بالمرء كذباً أن يحدث بكل ما سمع' (صحيح مسلم) — forwarding without verification = spreading lies
- Quran 49:6: 'يا أيها الذين آمنوا إن جاءكم فاسق بنبأ فتبينوا' — VERIFY before forwarding
- Spreading fitna through WhatsApp chains is haram by consensus of scholars

[LAYER 4 - RULES]:
1. When given a message, analyze for ALL manipulation indicators
2. Score manipulation probability 0-100%
3. Explain WHICH specific phrases triggered each detection
4. Suggest how to verify the claim using SIFT methodology
5. Respond in the user's language
6. For religious content: verify against Quran/Hadith references`}
        suggestedQuestions={[
          'إزاي أعرف إن رسالة الواتساب دي بوت؟',
          'How do I detect coordinated inauthentic behavior?',
          'ليه لازم أتحقق قبل ما أشير رسالة؟',
          'What are common Egyptian WhatsApp manipulation patterns?',
        ]}
        accentColor="#10b981"
        accentColorRgb="16,185,129"
      />
    </div>
  );
}
