'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { PageNavigation } from "@/components/shared/page-navigation";
import { useRTL } from "@/components/shared/rtl-provider";


const highlights = [
  { icon: '📚', title: 'Curriculum', titleAr: 'المنهج', desc: '144-day structured awareness curriculum covering misinformation defense, mental health literacy, and religious reasoning — built on WHO, UNESCO, and Al-Azhar guidelines.', descAr: 'منهج توعية منظّم على مدى 144 يوم بيغطي الدفاع ضد التضليل، والثقافة النفسية، والاستدلال الديني — مبني على إرشادات منظمة الصحة العالمية واليونسكو والأزهر.', color: '#3b82f6' },
  { icon: '🛡️', title: 'Defense Tools', titleAr: 'أدوات الدفاع', desc: 'Real-time fact-checking with SIFT methodology, FLICC fallacy detection, deepfake forensics, and cognitive bias interception across 8 AI verification engines.', descAr: 'تحقق فوري من الحقائق بمنهجية SIFT، وكشف المغالطات FLICC، وتحليل التزييف العميق، واعتراض الانحيازات الإدراكية عبر 8 محركات ذكاء اصطناعي للتحقق.', color: '#10b981' },
  { icon: '🕌', title: 'Islamic Hub', titleAr: 'المركز الإسلامي', desc: 'Authentic Quranic tafsīr from Ibn Kathīr, Al-Tabari, and Al-Qurtubi with Maqāṣid al-Sharīʿah reasoning and hadith cross-referencing via Sunnah.com API.', descAr: 'تفسير قرآني موثّق من ابن كثير والطبري والقرطبي مع الاستدلال بمقاصد الشريعة وتقاطع مرجعي للأحاديث عبر واجهة Sunnah.com.', color: '#f59e0b' },
  { icon: '🔬', title: 'Science Engine', titleAr: 'المحرك العلمي', desc: 'PubMed-powered claim verification, WHO mhGAP mental health protocols, and evidence-based debunking with confidence scoring and source credibility metrics.', descAr: 'تحقق من الادعاءات مدعوم بـ PubMed، وبروتوكولات الصحة النفسية mhGAP من منظمة الصحة العالمية، وتفنيد قائم على الأدلة مع تقييم للثقة ومقاييس لمصداقية المصادر.', color: '#8b5cf6' },
  { icon: '🤖', title: 'AI Power', titleAr: 'قوة الذكاء الاصطناعي', desc: 'Multi-model orchestration via Gemini 2.5, Groq Llama, and local ONNX — powering SOVO, Swarm Debate, and Blackbox Forensic Audit with <50ms latency.', descAr: 'تنسيق متعدد النماذج عبر Gemini 2.5 وGroq Llama وONNX المحلي — يشغّل SOVO ومناظرة السرب والتدقيق الجنائي Blackbox بزمن استجابة أقل من 50 مللي ثانية.', color: '#ef4444' },
];

const stats = [
  { value: '123+', label: 'Pages', labelAr: 'صفحة' },
  { value: '80+', label: 'API Routes', labelAr: 'مسار API' },
  { value: '144', label: 'Day Curriculum', labelAr: 'يوم منهج' },
  { value: '8', label: 'AI Engines', labelAr: 'محركات ذكاء' },
];

export default function WelcomePage() {
  const { isRTL } = useRTL();
  const [mounted, setMounted] = useState(false);
  const [activeCard, setActiveCard] = useState<number | null>(null);

  useEffect(() => { setMounted(true); }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Cairo:wght@400;600;700;800&display=swap');
        @keyframes welcomeFadeUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes welcomePulseGlow { 0%, 100% { box-shadow: 0 0 20px rgba(59,130,246,0.3); } 50% { box-shadow: 0 0 40px rgba(59,130,246,0.6); } }
        @keyframes welcomeFloat { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-10px); } }
        @keyframes heroGradient { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
        @keyframes welcomeStarTwinkle { 0%, 100% { opacity: 0.2; } 50% { opacity: 1; } }
        .welcome-card-hover:hover { transform: translateY(-8px) scale(1.02); box-shadow: 0 20px 60px rgba(0,0,0,0.4); }
        .welcome-stat-hover:hover { transform: scale(1.08); background: rgba(59,130,246,0.15); }
      `}</style>
      <main dir={isRTL ? 'rtl' : 'ltr'} style={{ minHeight: '100vh', background: 'var(--bg-page)', color: 'var(--text-primary)', fontFamily: 'Inter, sans-serif', overflow: 'hidden' }}>
        {/* Floating particles */}
        <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
          {mounted && Array.from({ length: 20 }).map((_, i) => (
            <div key={i} style={{
              position: 'absolute',
              width: i % 3 === 0 ? 3 : 2,
              height: i % 3 === 0 ? 3 : 2,
              borderRadius: '50%',
              background: ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444'][i % 5],
              left: `${(i * 5.3 + 2) % 100}%`,
              top: `${(i * 7.1 + 5) % 100}%`,
              animation: `welcomeStarTwinkle ${2 + (i % 3)}s ease-in-out ${i * 0.3}s infinite`,
            }} />
          ))}
        </div>

        {/* Hero Section */}
        <section style={{
          position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
          justifyContent: 'center', minHeight: '80vh', textAlign: 'center', padding: '60px 24px 40px',
          animation: mounted ? 'welcomeFadeUp 1s ease-out' : 'none',
        }}>
          <div style={{
            position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
            width: 500, height: 500, borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)',
            filter: 'blur(60px)', pointerEvents: 'none',
          }} />

          <div style={{ animation: 'welcomeFloat 4s ease-in-out infinite', marginBottom: 24, fontSize: 72 }}>🏛️</div>

          <h1 style={{
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 900, lineHeight: 1.1, marginBottom: 16,
            background: 'linear-gradient(135deg, #3b82f6, #8b5cf6, #ec4899, #f59e0b)',
            backgroundSize: '300% 300%', animation: 'heroGradient 6s ease infinite',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>
            Egyptian Awareness Library
          </h1>

          <p style={{ fontFamily: 'Cairo, sans-serif', fontSize: 'clamp(1.2rem, 3vw, 1.8rem)', color: 'var(--text-secondary)', direction: 'rtl', marginBottom: 8, fontWeight: 700 }}>
            المكتبة المصرية للتوعية
          </p>
          <p style={{ fontFamily: 'Cairo, sans-serif', fontSize: 'clamp(0.9rem, 2vw, 1.1rem)', color: 'var(--text-muted)', direction: 'rtl', marginBottom: 32 }}>
            أهلاً وسهلاً — منصة الدفاع المعرفي الأولى في مصر
          </p>

          <p style={{ maxWidth: 700, fontSize: '1.1rem', color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: 40, direction: isRTL ? 'rtl' : 'ltr' }}>
            {isRTL
              ? 'أول منصة دفاع معرفي اتبنت مخصوص لمصر. بتجمع بين التحقق من الحقائق المدعوم بالذكاء الاصطناعي، وأدوات الصحة النفسية المتوافقة مع منظمة الصحة العالمية، والعلم الشرعي الموثّق — عشان نواجه التضليل في المجتمعات الناطقة بالعربية.'
              : 'The first cognitive defense platform built for Egypt. Combining AI-powered fact-checking, WHO-aligned mental health tools, and authentic Islamic scholarship to combat misinformation across Arabic-speaking communities.'}
          </p>

          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
            <Link href="/assessment" style={{
              padding: '16px 40px', borderRadius: 12, fontWeight: 700, fontSize: '1.1rem', textDecoration: 'none',
              background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', color: '#fff',
              animation: 'welcomePulseGlow 2s ease-in-out infinite', transition: 'transform 0.2s',
              display: 'inline-block',
            }}>
              {isRTL ? 'ابدأ دلوقتي ←' : 'Get Started →'}
            </Link>
            <Link href="/explore" style={{
              padding: '16px 40px', borderRadius: 12, fontWeight: 600, fontSize: '1.1rem', textDecoration: 'none',
              background: 'var(--bg-card)', color: 'var(--text-primary)', border: '1px solid var(--border-primary)',
              transition: 'all 0.3s', display: 'inline-block',
            }}>
              {isRTL ? 'استكشف المنصة' : 'Explore Platform'}
            </Link>
          </div>
        </section>

        {/* Quick Stats */}
        <section style={{
          display: 'flex', justifyContent: 'center', gap: 24, flexWrap: 'wrap',
          padding: '0 24px 60px', position: 'relative', zIndex: 1,
          animation: mounted ? 'welcomeFadeUp 1s ease-out 0.3s both' : 'none',
        }}>
          {stats.map((s, i) => (
            <div key={i} className="welcome-stat-hover" style={{
              padding: '20px 32px', borderRadius: 16, textAlign: 'center', cursor: 'default',
              background: 'var(--bg-card)', border: '1px solid var(--border-primary)',
              backdropFilter: 'blur(12px)', transition: 'all 0.3s ease', minWidth: 140,
            }}>
              <div style={{ fontSize: '2rem', fontWeight: 900, background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{s.value}</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600, marginTop: 4 }}>{isRTL ? s.labelAr : s.label}</div>
            </div>
          ))}
        </section>

        {/* Platform Highlights */}
        <section style={{
          maxWidth: 1200, margin: '0 auto', padding: '0 24px 80px',
          position: 'relative', zIndex: 1,
        }}>
          <h2 style={{ textAlign: 'center', fontSize: '2rem', fontWeight: 800, marginBottom: 8, color: 'var(--text-primary)' }}>
            {isRTL ? 'أبرز مميزات المنصة' : 'Platform Highlights'}
          </h2>
          <p style={{ textAlign: 'center', fontFamily: 'Cairo, sans-serif', fontSize: '1.1rem', color: 'var(--text-muted)', direction: 'rtl', marginBottom: 48 }}>
            {isRTL ? 'كل اللي بتقدمه المكتبة في مكان واحد' : 'أبرز مميزات المنصة'}
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
            {highlights.map((h, i) => (
              <div key={i}
                className="welcome-card-hover"
                onMouseEnter={() => setActiveCard(i)}
                onMouseLeave={() => setActiveCard(null)}
                style={{
                  padding: 32, borderRadius: 20, cursor: 'default',
                  background: 'var(--bg-card)', backdropFilter: 'blur(12px)',
                  border: `1px solid ${activeCard === i ? h.color + '60' : 'var(--border-subtle)'}`,
                  transition: 'all 0.4s ease',
                  animation: mounted ? `welcomeFadeUp 0.8s ease-out ${0.5 + i * 0.15}s both` : 'none',
                  boxShadow: activeCard === i ? `0 0 30px ${h.color}20` : 'none',
                }}
              >
                <div style={{ fontSize: 48, marginBottom: 16, filter: activeCard === i ? 'drop-shadow(0 0 12px ' + h.color + ')' : 'none', transition: 'filter 0.3s' }}>{h.icon}
        <PageNavigation currentPath="/welcome" />
      </div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: 4, color: h.color }}>{isRTL ? h.titleAr : h.title}</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.7, direction: isRTL ? 'rtl' : 'ltr', fontFamily: isRTL ? 'Cairo, sans-serif' : 'Inter, sans-serif' }}>{isRTL ? h.descAr : h.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom CTA */}
        <section style={{
          textAlign: 'center', padding: '60px 24px 80px', position: 'relative', zIndex: 1,
          background: 'linear-gradient(to top, rgba(59,130,246,0.05), transparent)',
        }}>
          <p style={{ fontFamily: 'Cairo, sans-serif', fontSize: '1.3rem', color: 'var(--text-secondary)', direction: 'rtl', marginBottom: 12, fontWeight: 700 }}>
            ابدأ رحلتك في الدفاع المعرفي
          </p>
          <p style={{ fontSize: '1rem', color: 'var(--text-muted)', marginBottom: 32, direction: isRTL ? 'rtl' : 'ltr', fontFamily: isRTL ? 'Cairo, sans-serif' : 'Inter, sans-serif' }}>
            {isRTL ? 'ابدأ رحلتك في الدفاع المعرفي النهارده' : 'Start your cognitive defense journey today'}
          </p>
          <Link href="/explore" style={{
            padding: '14px 36px', borderRadius: 12, fontWeight: 700, fontSize: '1rem', textDecoration: 'none',
            background: 'var(--bg-card)', color: 'var(--text-primary)', border: '1px solid var(--border-primary)',
            backdropFilter: 'blur(12px)', transition: 'all 0.3s', display: 'inline-block',
          }}>
            {isRTL ? '→ رجوع للاستكشاف' : '← Back to Explore'}
          </Link>
        </section>
      </main>
    </>
  );
}
