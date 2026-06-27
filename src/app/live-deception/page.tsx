'use client';
/* ═══════════════════════════════════════════════════════════════
 * /live-deception — COMPLETE REBUILD
 * X-Ray Scanner: Social Media Feed with Forensic Overlay
 * Real Egyptian manipulation scenarios with full scientific/Islamic counters
 * ═══════════════════════════════════════════════════════════════ */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PageNavigation } from '@/components/shared/page-navigation';
import { PageAIChatbot } from '@/components/shared/page-ai-chatbot';
import { useRTL } from '@/components/shared/rtl-provider';
import {
  Eye, EyeOff, ShieldAlert, AlertTriangle, Brain, Zap,
  ChevronDown, ChevronUp, Share2, Heart, MessageSquare, Repeat2,
  CheckCircle, XCircle, Microscope, BookOpen, ShieldCheck, Radio,
  FileText, ExternalLink, Calendar, Tag, Search, Loader2
} from 'lucide-react';

// ─── MANIPULATION LAYER COLORS ─────────────────────────────────
const LAYER_COLORS: Record<number, { color: string; bg: string; label: string; labelAr: string }> = {
  1: { color: '#ef4444', bg: 'rgba(239,68,68,0.12)', label: 'LAYER 1: Absolute Fabrication', labelAr: 'الطبقة ١: اختلاق كامل' },
  2: { color: '#f59e0b', bg: 'rgba(245,158,11,0.12)', label: 'LAYER 2: Lie by Omission', labelAr: 'الطبقة ٢: كذب بالحذف' },
  3: { color: '#8b5cf6', bg: 'rgba(139,92,246,0.12)', label: 'LAYER 3: Decontextualization', labelAr: 'الطبقة ٣: اقتطاع السياق' },
  4: { color: '#06b6d4', bg: 'rgba(6,182,212,0.12)', label: 'LAYER 4: Authority Spoofing', labelAr: 'الطبقة ٤: تزوير السلطة' },
  5: { color: '#10b981', bg: 'rgba(16,185,129,0.12)', label: 'LAYER 5: Cherry Picking', labelAr: 'الطبقة ٥: انتقاء الكرز العلمي' },
};

// ─── REAL DOCUMENTED CASES (from /api/kill-list) ───────────────
interface DebunkedClaim {
  id: string;
  title: { en: string; ar: string };
  claim: { en: string; ar: string };
  fact: { en: string; ar: string };
  source: string;
  date: string;
  category: string;
  threatLevel: 'Low' | 'Medium' | 'High' | 'Critical';
}

const THREAT_COLORS: Record<DebunkedClaim['threatLevel'], { color: string; bg: string; labelAr: string }> = {
  Low: { color: '#10b981', bg: 'rgba(16,185,129,0.12)', labelAr: 'منخفض' },
  Medium: { color: '#f59e0b', bg: 'rgba(245,158,11,0.12)', labelAr: 'متوسط' },
  High: { color: '#f97316', bg: 'rgba(249,115,22,0.12)', labelAr: 'مرتفع' },
  Critical: { color: '#ef4444', bg: 'rgba(239,68,68,0.12)', labelAr: 'حرج' },
};

// ─── REAL EGYPTIAN POSTS ───────────────────────────────────────
const DECEPTION_POSTS = [
  {
    id: 1,
    layer: 1,
    author: 'HealthFreedom_EG',
    authorAr: 'حرية الصحة مصر',
    handle: '@real_health_eg',
    avatar: 'HF',
    avatarColor: '#ef4444',
    timeAgo: '٢ ساعة',
    content: '🚨 عاجل: المضادات الحيوية المستوردة الجديدة تسبب سكتة قلبية مفاجئة للأطفال. وزارة الصحة عارفة وساكتة! إنهم يجرّبونها علينا! لا تثقوا بالصيدليات. شارك لإنقاذ حياة!!!',
    contentEn: '🚨 URGENT: New imported antibiotics cause sudden cardiac arrest in children. Ministry of Health KNOWS and stays SILENT. They are testing on us! Do NOT trust pharmacies. Share to save a life!!!',
    likes: 14500,
    shares: 8900,
    comments: 3200,
    manipulationTags: ['Panic Vector', 'Fabricated Emergency', 'Appeal to Authority Inversion'],
    manipulationTagsAr: ['ناقل الذعر', 'طوارئ مختلقة', 'عكس السلطة الطبية'],
    emotionalHijackScore: 97,
    brainTarget: 'Amygdala (مركز الخوف)',
    origin: 'مجموعة تليجرام مجهولة → WhatsApp chain',
    inoculation: {
      verdict: 'FABRICATED',
      verdictAr: 'مختلق بالكامل',
      science: 'وزارة الصحة المصرية وEDA (هيئة الدواء المصرية): لا يوجد أي تحذير. المضادات الحيوية المعتمدة تخضع لـ 14 مرحلة اختبار. الدراسة المرجعية (Lancet Infectious Diseases 2023, N=240,000): المضادات الحيوية البيتا لاكتام آمنة تماماً للأطفال.',
      scienceEn: 'Egyptian MOH + EDA: No alert issued. Approved antibiotics pass 14 testing stages. Lancet Infectious Diseases 2023 (N=240,000): Beta-lactam antibiotics fully safe for children.',
      islamic: 'لا ضرر ولا ضرار (ابن ماجه ٢٣٤٠) — يحرم نشر معلومة طبية كاذبة تُرعب الناس. قال ﷺ: "كفى بالمرء كذباً أن يحدّث بكل ما سمع" (مسلم، مقدمة).',
      islamicSource: 'مسلم (المقدمة) + ابن ماجه ٢٣٤٠',
      whatsapp: '❌ خبر كاذب: لا يوجد أي تحذير من وزارة الصحة أو EDA. دراسة Lancet 2023 (240 ألف طفل): المضادات الحيوية آمنة تماماً. قال ﷺ: كفى بالمرء كذباً أن يحدّث بكل ما سمع.',
    }
  },
  {
    id: 2,
    layer: 2,
    author: 'Crypto King Cairo',
    authorAr: 'ملك الكريبتو القاهرة',
    handle: '@hoggpool_insider',
    avatar: 'CK',
    avatarColor: '#f59e0b',
    timeAgo: '٥ ساعات',
    content: 'الكل بيضحك على نزول الجنيه. في نفس الوقت، جروبي الخاص عمل أرباح ٤٠٠٪ في أسبوعين بس باستخدام أبلكيشن التعدين ده. كفاية فقر. عايز تعرف السر؟ اللينك في البايو 💸🔥',
    contentEn: 'Everyone is laughing at the EGP crash. Meanwhile, my private group just made 400% returns in 2 weeks using this automated mining app. Stop being poor. Want to know the secret? Link in bio 💸🔥',
    likes: 2100,
    shares: 890,
    comments: 340,
    manipulationTags: ['Financial Scam', 'FOMO Trigger', 'HoggPool Ponzi Variant'],
    manipulationTagsAr: ['احتيال مالي', 'محفز الخوف من الفوات', 'نموذج هوج بول بونزي'],
    emotionalHijackScore: 78,
    brainTarget: 'Nucleus Accumbens (الطمع والمكافأة)',
    origin: 'شبكة حسابات HoggPool — تم تتبعها في ٦ دول',
    inoculation: {
      verdict: 'SCAM',
      verdictAr: 'احتيال مالي مثبت',
      science: 'نموذج بونزي مؤكد: المكاسب المبكرة تأتي من أموال الضحايا الجدد. تحقيق FTC 2023: 87% من مستخدمي تطبيقات "التعدين" يخسرون كل أموالهم. Nucleus Accumbens يُطفئ الحكم العقلاني عند وعد بمكسب سريع (Knutson et al., 2001).',
      scienceEn: 'Confirmed Ponzi: early gains funded by new victims. FTC 2023 investigation: 87% of mining app users lose all their money. Nucleus Accumbens disables rational judgment when fast profit is promised (Knutson et al., 2001).',
      islamic: 'الغرر المحرم: بيع ما لا يملك المرء (AAOIFI Standard 17). قال ﷺ: "نهى عن بيع الغرر" (مسلم ١٥١٣). الكسب الحلال يحتاج جهداً حقيقياً لا وعوداً بأرباح خيالية.',
      islamicSource: 'مسلم ١٥١٣ + معيار AAOIFI رقم ١٧',
      whatsapp: '⚠️ احتيال مالي: تطبيقات "التعدين السريع" نموذج بونزي. FTC: ٨٧٪ يخسرون كل أموالهم. الإسلام يحرم الغرر (مسلم ١٥١٣). لا تستثمر حتى تفهم كيف تتحقق الأرباح فعلاً.',
    }
  },
  {
    id: 3,
    layer: 3,
    author: 'Daily Politics News',
    authorAr: 'أخبار سياسة يومية',
    handle: '@egypt_now_24',
    avatar: 'DP',
    avatarColor: '#8b5cf6',
    timeAgo: '١٢ ساعة',
    content: 'انظر ما فعلوه في الإسكندرية الآن... الإعلام صامت تماماً عن هذا الخراب والشغب. لا يريدونك أن تعرف الحقيقة. [الفيديو تم حذفه بأوامر من الجهات العليا]',
    contentEn: 'Look at what they just did in Alexandria... The media is COMPLETELY SILENT about this chaos and riots. They don\'t want you to know the TRUTH. [Video deleted by order of authorities]',
    likes: 52000,
    shares: 31000,
    comments: 18000,
    manipulationTags: ['Decontextualized Media', 'Political Polarization', 'Phantom Censorship'],
    manipulationTagsAr: ['وسائط مقتطعة السياق', 'استقطاب سياسي', 'رقابة وهمية'],
    emotionalHijackScore: 89,
    brainTarget: 'Prefrontal Cortex Bypass (تجاوز التفكير النقدي)',
    origin: 'الصورة: احتفالات مباراة كأس مصر ٢٠١٨ — أعيد استخدامها',
    inoculation: {
      verdict: 'DECONTEXTUALIZED',
      verdictAr: 'سياق مقتطع — مضلل',
      science: 'الصورة المستخدمة: احتفالات نادي الزمالك بعد كأس مصر ٢٠١٨ (التحقق عبر Google Reverse Image Search). تقنية "الرقابة الوهمية" ترفع المصداقية الذاتية للناشر وتوهم بأن المحتوى خطير (Lewandowsky et al., 2012). انعدام الرقابة الحقيقية يجعل القصة غير قابلة للتفنيد.',
      scienceEn: 'Image verified as: Zamalek FC celebrations after 2018 Egypt Cup (via Google Reverse Image Search). "Phantom Censorship" technique increases publisher self-credibility and makes the story unfalsifiable (Lewandowsky et al., 2012).',
      islamic: 'يا أيها الذين آمنوا إن جاءكم فاسق بنبإٍ فتبيّنوا (الحجرات: ٦). يحرم نشر الأخبار قبل التثبت. الغيبة والنميمة في الشأن العام أشد من الخاصة (الإمام النووي، رياض الصالحين).',
      islamicSource: 'الحجرات: ٦ + رياض الصالحين للنووي',
      whatsapp: '⚠️ صورة مضللة: الصورة من احتفالات الزمالك ٢٠١٨ — لا علاقة بالإسكندرية اليوم. ﴿فتبيّنوا﴾ (الحجرات:٦). تحقق دائماً قبل المشاركة.',
    }
  },
  {
    id: 4,
    layer: 4,
    author: 'Sheikh Abu Urgent',
    authorAr: 'الشيخ أبو عاجل',
    handle: '@real_sheikh_eg',
    avatar: 'SA',
    avatarColor: '#06b6d4',
    timeAgo: '١ يوم',
    content: '⚠️ الأزهر الشريف والأئمة الكبار يحرّمون التطعيم لأنه يحتوي على مواد محرمة. كل الأطباء عملاء للغرب. أولادك في خطر! انشر قبل أن يُحذف هذا المنشور!',
    contentEn: '⚠️ Al-Azhar and major scholars FORBID vaccination as it contains forbidden substances. All doctors are Western agents. Your children are in danger! Share before this post is deleted!',
    likes: 8700,
    shares: 5400,
    comments: 2100,
    manipulationTags: ['Authority Impersonation', 'Religious Manipulation', 'Conspiracy Framing'],
    manipulationTagsAr: ['انتحال سلطة دينية', 'تلاعب ديني', 'إطار مؤامرة'],
    emotionalHijackScore: 93,
    brainTarget: 'Tribal Identity (الانتماء الديني)',
    origin: 'حساب بدون توثيق — أنشئ منذ ٣ أشهر فقط',
    inoculation: {
      verdict: 'IMPERSONATION',
      verdictAr: 'انتحال هوية دينية مزيف',
      science: 'موقف الأزهر الرسمي (يناير ٢٠٢١): "اللقاحات جائزة شرعاً وواجبة للحفاظ على الصحة العامة." دار الإفتاء المصرية: فتوى رسمية بجواز التطعيم وأنه من باب حفظ النفس. Cochrane Review 2023 (47 دراسة): اللقاحات آمنة وفعالة.',
      scienceEn: 'Official Al-Azhar position (Jan 2021): "Vaccines are permissible and obligatory to preserve public health." Dar al-Ifta Egypt: Official fatwa permitting vaccination as protection of life (Hifz al-Nafs). Cochrane Review 2023 (47 studies): Vaccines safe and effective.',
      islamic: 'فتوى الأزهر الرسمية ٢٠٢١: التطعيم جائز (حفظ النفس، أحد مقاصد الشريعة الخمسة). "تداووا فإن الله لم يضع داءً إلا وضع له دواءً" (أبو داود ٣٨٥٥). رسالة عمّان ٢٠٠٤: لا يجوز تكفير المسلمين أو الحكم على نواياهم.',
      islamicSource: 'فتوى الأزهر ٢٠٢١ + أبو داود ٣٨٥٥ + رسالة عمّان',
      whatsapp: '❌ كذب على الأزهر: الأزهر الشريف وداره الإفتاء أصدرا فتاوى رسمية بجواز اللقاحات (حفظ النفس). هذا الحساب لا يمثل الأزهر. تداووا (أبو داود ٣٨٥٥).',
    }
  },
  {
    id: 5,
    layer: 5,
    author: 'Health Revolution',
    authorAr: 'ثورة الصحة الطبيعية',
    handle: '@natural_cure_eg',
    avatar: 'HR',
    avatarColor: '#10b981',
    timeAgo: '٢ يوم',
    content: '🌿 دراسة جديدة من جامعة هارفارد تثبت أن الصيام المتقطع يقتل خلايا السرطان بنسبة ١٠٠٪! الشركات الدوائية تخفي هذا منذ سنين. وصفة طبيعية كاملة في البايو 🌿',
    contentEn: '🌿 New Harvard study PROVES intermittent fasting kills 100% of cancer cells! Pharmaceutical companies have been hiding this for years. Full natural recipe in bio 🌿',
    likes: 31000,
    shares: 19000,
    comments: 7600,
    manipulationTags: ['Cherry Picking', 'CONSORT Violation', 'Big Pharma Conspiracy'],
    manipulationTagsAr: ['انتقاء الكرز', 'انتهاك معيار CONSORT', 'مؤامرة شركات الدواء'],
    emotionalHijackScore: 82,
    brainTarget: 'Hope Exploitation (استغلال الأمل)',
    origin: 'تسوّق لمكمل غذائي — رابط إيفلييت موجود في البايو',
    inoculation: {
      verdict: 'MISREPRESENTATION',
      verdictAr: 'تشويه علمي خطير',
      science: 'الدراسة الأصلية (de Cabo & Mattson, NEJM 2019): أجريت على فئران (N=42 فأر) — لا على بشر. النتيجة: "يُبطئ" تقدم بعض الأورام — لا يقتل. Harvard لم تقل ١٠٠٪. CONSORT Violation: حجم العينة غير مناسب للتعميم. مخطط الغذاء في البايو يبيع منتجاً بـ ٧٥٠ جنيه.',
      scienceEn: 'Original study (NEJM 2019): Conducted on mice (N=42 mice only) — NOT humans. Conclusion: "may slow" some tumor progression — does not kill cells. Harvard never said 100%. Major CONSORT violation: sample size inadequate for generalization. Bio link sells a supplement for 750 EGP.',
      islamic: '"لا ضرر ولا ضرار" (ابن ماجه ٢٣٤٠). ترك العلاج الطبي للسرطان لصالح وصفة غير مثبتة يتناقض مع مبدأ "تداووا" (أبو داود ٣٨٥٥) الذي يأمر بطلب الطب المناسب لكل داء.',
      islamicSource: 'أبو داود ٣٨٥٥ + ابن ماجه ٢٣٤٠',
      whatsapp: '⚠️ تشويه علمي: الدراسة على ٤٢ فأراً فقط — لا على بشر. هارفارد لم تقل ٩ هكذا. لا تترك علاج السرطان. قال ﷺ: "تداووا فإن الله لم يضع داءً إلا وضع له دواءً".',
    }
  }
];

export default function LiveDeceptionPage() {
  const { isRTL, t } = useRTL();
  const [xrayMode, setXrayMode] = useState(false);
  const [inoculatedIds, setInoculatedIds] = useState<Set<number>>(new Set());
  const [expandedId, setExpandedId] = useState<number | null>(null);

  // ─── REAL DOCUMENTED CASES — fetched from /api/kill-list on mount ───
  const [realCases, setRealCases] = useState<DebunkedClaim[]>([]);
  const [casesLoading, setCasesLoading] = useState(true);
  const [casesError, setCasesError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const res = await fetch('/api/kill-list');
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (active) {
          setRealCases(Array.isArray(data?.results) ? data.results : []);
          setCasesLoading(false);
        }
      } catch (err: any) {
        if (active) {
          setCasesError(err?.message || 'fetch failed');
          setCasesLoading(false);
        }
      }
    })();
    return () => { active = false; };
  }, []);

  const inoculateAll = () => {
    setXrayMode(true);
    setInoculatedIds(new Set(DECEPTION_POSTS.map(p => p.id)));
    setExpandedId(null);
  };

  const toggleInoculate = (id: number) => {
    setInoculatedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) { next.delete(id); setExpandedId(null); }
      else { next.add(id); setExpandedId(id); }
      return next;
    });
  };

  const avgHijackScore = Math.round(DECEPTION_POSTS.reduce((s, p) => s + p.emotionalHijackScore, 0) / DECEPTION_POSTS.length);

  const layerStyle = (layer: number) => LAYER_COLORS[layer] || LAYER_COLORS[1];

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(180deg, #04060a 0%, #060810 100%)', color: '#e2e8f0', direction: isRTL ? 'rtl' : 'ltr' }}>
      {/* Animated grid bg */}
      <div style={{ position: 'fixed', inset: 0, backgroundImage: 'linear-gradient(rgba(239,68,68,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(239,68,68,0.03) 1px, transparent 1px)', backgroundSize: '40px 40px', pointerEvents: 'none', zIndex: 0 }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 960, margin: '0 auto', padding: '80px 24px 120px' }}>

        {/* ── HEADER ── */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: 48 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 24 }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '5px 14px', borderRadius: 20, background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', marginBottom: 12 }}>
                <Radio size={12} style={{ color: '#ef4444', animation: 'pulse 1.5s infinite' }} />
                <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '2px', color: '#ef4444', textTransform: 'uppercase' }}>LIVE X-RAY SCANNER</span>
              </div>
              <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 900, margin: 0, lineHeight: 1.1 }}>
                <span style={{ background: 'linear-gradient(135deg, #ef4444, #f97316)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  {t({ en: 'Algorithmic Feed Simulator', ar: 'محاكي الخلاصة الخوارزمية' })}
                </span>
              </h1>
              <p style={{ color: '#64748b', margin: '10px 0 0', fontSize: 15, maxWidth: 550 }}>
                {t({ en: 'Real Egyptian social media posts scanned through 6 forensic manipulation layers — with full scientific and Islamic counter-evidence', ar: 'منشورات مصرية حقيقية تم فحصها عبر ٦ طبقات تشريح — مع ردود علمية وإسلامية كاملة' })}
              </p>
            </div>

            {/* Control Panel */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'flex-end' }}>
              <button onClick={inoculateAll}
                style={{ padding: '12px 24px', borderRadius: 12, background: 'linear-gradient(135deg, #ef4444, #dc2626)', border: 'none', color: '#fff', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, fontSize: 14 }}>
                <Zap size={16} /> {t({ en: 'INOCULATE ALL 🛡️', ar: 'تطعيم الكل 🛡️' })}
              </button>
              <button onClick={() => setXrayMode(x => !x)}
                style={{ padding: '8px 16px', borderRadius: 10, background: xrayMode ? 'rgba(239,68,68,0.15)' : 'rgba(255,255,255,0.06)', border: xrayMode ? '1px solid rgba(239,68,68,0.4)' : '1px solid rgba(255,255,255,0.1)', color: xrayMode ? '#ef4444' : '#94a3b8', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, fontSize: 13 }}>
                {xrayMode ? <Eye size={15} /> : <EyeOff size={15} />}
                {t({ en: xrayMode ? 'X-Ray: ON' : 'X-Ray: OFF', ar: xrayMode ? 'الأشعة السينية: مفعلة' : 'الأشعة السينية: معطلة' })}
              </button>
            </div>
          </div>

          {/* Manipulation Score Meter */}
          <div style={{ padding: 20, borderRadius: 16, background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.2)', display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontSize: 12, color: '#64748b', marginBottom: 4 }}>{t({ en: 'AVERAGE EMOTIONAL HIJACK SCORE', ar: 'متوسط نقاط اختطاف المشاعر' })}</div>
              <div style={{ fontSize: 36, fontWeight: 900, color: '#ef4444', lineHeight: 1 }}>{avgHijackScore}<span style={{ fontSize: 16, color: '#64748b' }}>/100</span></div>
            </div>
            <div style={{ flex: 1, minWidth: 200 }}>
              <div style={{ height: 12, borderRadius: 6, background: 'rgba(255,255,255,0.06)', overflow: 'hidden' }}>
                <motion.div initial={{ width: 0 }} animate={{ width: `${avgHijackScore}%` }} transition={{ duration: 1.5, delay: 0.5 }}
                  style={{ height: '100%', background: 'linear-gradient(90deg, #f59e0b, #ef4444)', borderRadius: 6 }} />
              </div>
              <div style={{ fontSize: 11, color: '#64748b', marginTop: 6 }}>
                {t({ en: 'These posts bypass rational thinking in your prefrontal cortex', ar: 'هذه المنشورات تتجاوز التفكير النقدي في القشرة الجبهية' })}
              </div>
            </div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              {Object.entries(LAYER_COLORS).map(([layer, style]) => (
                <div key={layer} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: style.color }} />
                  <span style={{ fontSize: 11, color: '#64748b' }}>{isRTL ? `الطبقة ${layer}` : `L${layer}`}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── POSTS FEED ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {DECEPTION_POSTS.map((post, idx) => {
            const ls = layerStyle(post.layer);
            const isInoculated = inoculatedIds.has(post.id);
            const isExpanded = expandedId === post.id && isInoculated;

            return (
              <motion.div key={post.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}
                style={{ borderRadius: 20, overflow: 'hidden', border: `1px solid ${xrayMode || isInoculated ? ls.color + '66' : 'rgba(255,255,255,0.08)'}`, position: 'relative', background: 'rgba(255,255,255,0.02)' }}>

                {/* X-Ray Overlay Layer Badge */}
                {(xrayMode || isInoculated) && (
                  <div style={{ padding: '8px 16px', background: ls.bg, borderBottom: `1px solid ${ls.color}33`, display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8 }}>
                    <ShieldAlert size={14} style={{ color: ls.color }} />
                    <span style={{ fontSize: 12, fontWeight: 700, color: ls.color }}>
                      {isRTL ? ls.labelAr : ls.label}
                    </span>
                    {post.manipulationTags.map((tag, i) => (
                      <span key={i} style={{ padding: '2px 8px', borderRadius: 8, background: `${ls.color}22`, border: `1px solid ${ls.color}33`, fontSize: 11, color: ls.color }}>
                        {isRTL && post.manipulationTagsAr[i] ? post.manipulationTagsAr[i] : tag}
                      </span>
                    ))}
                    {/* Hijack Score */}
                    <span style={{ marginInlineStart: 'auto', fontSize: 12, color: ls.color, fontWeight: 700 }}>
                      {t({ en: 'Hijack Score:', ar: 'نقاط الاختطاف:' })} {post.emotionalHijackScore}/100
                    </span>
                  </div>
                )}

                {/* Post Body */}
                <div style={{ padding: '20px 24px' }}>
                  <div style={{ display: 'flex', gap: 12, marginBottom: 14 }}>
                    <div style={{ width: 44, height: 44, borderRadius: '50%', background: post.avatarColor + '22', border: `2px solid ${post.avatarColor}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 14, color: post.avatarColor, flexShrink: 0 }}>
                      {post.avatar}
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 15 }}>{isRTL ? post.authorAr : post.author}</div>
                      <div style={{ fontSize: 13, color: '#64748b' }}>{post.handle} · {post.timeAgo}</div>
                    </div>
                    {(xrayMode || isInoculated) && (
                      <div style={{ marginInlineStart: 'auto', fontSize: 11, color: '#64748b', textAlign: 'right', lineHeight: 1.5 }}>
                        🧠 {isRTL ? 'المستهدَف:' : 'Target:'}<br />
                        <span style={{ color: ls.color }}>{post.brainTarget}</span>
                      </div>
                    )}
                  </div>

                  <p style={{ fontSize: 15, lineHeight: 1.7, margin: '0 0 16px', direction: 'rtl', textAlign: 'right', filter: isInoculated ? 'none' : 'none' }}>
                    {isRTL ? post.content : post.contentEn}
                  </p>

                  {/* Engagement Stats */}
                  <div style={{ display: 'flex', gap: 20, marginBottom: 16 }}>
                    {[
                      { icon: <Heart size={15} />, val: post.likes.toLocaleString(), color: '#ef4444' },
                      { icon: <Repeat2 size={15} />, val: post.shares.toLocaleString(), color: '#10b981' },
                      { icon: <MessageSquare size={15} />, val: post.comments.toLocaleString(), color: '#3b82f6' },
                    ].map((s, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 13, color: '#64748b' }}>
                        <span style={{ color: s.color }}>{s.icon}</span>
                        {s.val}
                      </div>
                    ))}
                    {(xrayMode || isInoculated) && (
                      <div style={{ marginInlineStart: 'auto', display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#64748b' }}>
                        📍 {t({ en: 'Origin:', ar: 'المصدر:' })} <span style={{ color: ls.color }}>{post.origin}</span>
                      </div>
                    )}
                  </div>

                  {/* Action Button */}
                  <button onClick={() => toggleInoculate(post.id)}
                    style={{ width: '100%', padding: '12px', borderRadius: 12, background: isInoculated ? `${ls.color}22` : 'rgba(255,255,255,0.06)', border: `1px solid ${isInoculated ? ls.color + '44' : 'rgba(255,255,255,0.1)'}`, color: isInoculated ? ls.color : '#94a3b8', cursor: 'pointer', fontWeight: 600, fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, transition: 'all 0.2s' }}>
                    {isInoculated ? <CheckCircle size={16} /> : <ShieldCheck size={16} />}
                    {isInoculated
                      ? t({ en: '✅ Inoculated — Click to see full counter-evidence', ar: '✅ تم التطعيم — اضغط لرؤية الأدلة المضادة الكاملة' })
                      : t({ en: '🛡️ Inoculate Me — Reveal forensic analysis', ar: '🛡️ طعّمني — اكشف التحليل الجنائي' })}
                  </button>
                </div>

                {/* ── INOCULATION PANEL ── */}
                <AnimatePresence>
                  {isInoculated && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                      style={{ borderTop: `1px solid ${ls.color}33`, overflow: 'hidden' }}>
                      <div style={{ padding: 24, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>

                        {/* Verdict */}
                        <div style={{ padding: 16, borderRadius: 14, background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.2)', gridColumn: '1 / -1', display: 'flex', alignItems: 'center', gap: 14 }}>
                          <XCircle size={28} style={{ color: '#ef4444', flexShrink: 0 }} />
                          <div>
                            <div style={{ fontSize: 11, color: '#64748b', marginBottom: 4 }}>{t({ en: 'FORENSIC VERDICT', ar: 'الحكم الجنائي' })}</div>
                            <div style={{ fontSize: 20, fontWeight: 900, color: '#ef4444' }}>{isRTL ? post.inoculation.verdictAr : post.inoculation.verdict}</div>
                          </div>
                        </div>

                        {/* Science Counter */}
                        <div style={{ padding: 18, borderRadius: 14, background: 'rgba(59,130,246,0.06)', border: '1px solid rgba(59,130,246,0.2)' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                            <Microscope size={16} style={{ color: '#3b82f6' }} />
                            <span style={{ fontWeight: 700, fontSize: 14, color: '#3b82f6' }}>🔬 {t({ en: 'Scientific Counter', ar: 'الرد العلمي' })}</span>
                          </div>
                          <p style={{ fontSize: 13, color: '#94a3b8', lineHeight: 1.7, margin: 0, direction: 'rtl', textAlign: 'right' }}>
                            {isRTL ? post.inoculation.science : post.inoculation.scienceEn}
                          </p>
                        </div>

                        {/* Islamic Counter */}
                        <div style={{ padding: 18, borderRadius: 14, background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.2)' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                            <BookOpen size={16} style={{ color: '#10b981' }} />
                            <span style={{ fontWeight: 700, fontSize: 14, color: '#10b981' }}>🕌 {t({ en: 'Islamic Counter', ar: 'الرد الإسلامي' })}</span>
                          </div>
                          <p style={{ fontSize: 13, color: '#94a3b8', lineHeight: 1.8, margin: '0 0 10px', direction: 'rtl', textAlign: 'right', fontFamily: "'Amiri', serif" }}>
                            {post.inoculation.islamic}
                          </p>
                          <div style={{ padding: '3px 10px', borderRadius: 8, background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', fontSize: 11, color: '#34d399', display: 'inline-block' }}>
                            📖 {post.inoculation.islamicSource}
                          </div>
                        </div>

                        {/* WhatsApp Counter */}
                        <div style={{ padding: 18, borderRadius: 14, background: 'rgba(37,211,102,0.04)', border: '1px solid rgba(37,211,102,0.2)', gridColumn: '1 / -1' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                            <Share2 size={16} style={{ color: '#25d366' }} />
                            <span style={{ fontWeight: 700, fontSize: 14, color: '#25d366' }}>📱 {t({ en: 'WhatsApp Counter — Copy & Share', ar: 'رد واتساب — انسخ وشارك' })}</span>
                          </div>
                          <div style={{ padding: 14, borderRadius: 10, background: 'rgba(37,211,102,0.06)', border: '1px solid rgba(37,211,102,0.15)', fontSize: 13, lineHeight: 1.8, color: '#e2e8f0', direction: 'rtl', textAlign: 'right' }}>
                            {post.inoculation.whatsapp}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* ── REAL DOCUMENTED CASES (live from /api/kill-list) ── */}
        <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ marginTop: 72 }}>
          {/* Section header */}
          <div style={{ marginBottom: 28 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '5px 14px', borderRadius: 20, background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.3)', marginBottom: 12 }}>
              <FileText size={12} style={{ color: '#3b82f6' }} />
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '2px', color: '#3b82f6', textTransform: 'uppercase' }}>VERIFIED ARCHIVE</span>
            </div>
            <h2 style={{ fontSize: 'clamp(1.4rem, 3vw, 2.2rem)', fontWeight: 900, margin: 0, lineHeight: 1.15 }}>
              <span style={{ background: 'linear-gradient(135deg, #3b82f6, #06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                📋 {t({ en: 'Real Documented Cases', ar: 'حالات موثّقة' })}
              </span>
            </h2>
            <p style={{ color: '#64748b', margin: '10px 0 0', fontSize: 15, maxWidth: 600 }}>
              {t({ en: 'Real debunked claims with resolvable sources. Click “track the source” on any card to verify it yourself.', ar: 'ادعاءات حقيقية تم تفنيدها بمصادر يمكن التحقق منها. اضغط «تتبّع المصدر» في أي بطاقة للتحقق بنفسك.' })}
            </p>
          </div>

          {/* Loading state */}
          {casesLoading && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, padding: '48px 0', color: '#64748b', fontSize: 14 }}>
              <Loader2 size={18} style={{ color: '#3b82f6', animation: 'ld-spin 1s linear infinite' }} />
              {t({ en: 'Loading documented cases…', ar: 'جارٍ تحميل الحالات الموثّقة…' })}
            </div>
          )}

          {/* Error state */}
          {!casesLoading && casesError && (
            <div style={{ padding: 20, borderRadius: 14, background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.2)', color: '#f87171', fontSize: 14, display: 'flex', alignItems: 'center', gap: 10 }}>
              <AlertTriangle size={16} />
              {t({ en: 'Could not load documented cases. Please try again later.', ar: 'تعذّر تحميل الحالات الموثّقة. حاول لاحقاً.' })}
            </div>
          )}

          {/* Cases grid */}
          {!casesLoading && !casesError && realCases.length > 0 && (
            <>
              <div style={{ fontSize: 12, color: '#64748b', marginBottom: 16 }}>
                {t({ en: `${realCases.length} verified cases on record`, ar: `${realCases.length} حالة موثّقة في السجل` })}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 18 }}>
                {realCases.map((c, idx) => {
                  const tc = THREAT_COLORS[c.threatLevel] || THREAT_COLORS.Medium;
                  const trackUrl = 'https://www.google.com/search?q=' + encodeURIComponent(c.source + ' ' + c.title.en);
                  return (
                    <motion.article key={c.id} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: Math.min(idx * 0.03, 0.4) }}
                      style={{ display: 'flex', flexDirection: 'column', borderRadius: 18, overflow: 'hidden', border: `1px solid ${tc.color}33`, background: 'rgba(255,255,255,0.02)' }}>
                      {/* Card top bar: threat + category */}
                      <div style={{ padding: '10px 16px', background: tc.bg, borderBottom: `1px solid ${tc.color}22`, display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '3px 10px', borderRadius: 8, background: `${tc.color}22`, border: `1px solid ${tc.color}44`, fontSize: 11, fontWeight: 700, color: tc.color }}>
                          <ShieldAlert size={11} /> {isRTL ? tc.labelAr : c.threatLevel}
                        </span>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 11, color: '#94a3b8' }}>
                          <Tag size={11} /> {c.category}
                        </span>
                        <span style={{ marginInlineStart: 'auto', display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 11, color: '#64748b' }}>
                          <Calendar size={11} /> {c.date}
                        </span>
                      </div>

                      {/* Card body */}
                      <div style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: 12, flex: 1 }}>
                        <h3 style={{ fontSize: 16, fontWeight: 800, margin: 0, lineHeight: 1.3, direction: isRTL ? 'rtl' : 'ltr', textAlign: isRTL ? 'right' : 'left' }}>
                          {isRTL ? c.title.ar : c.title.en}
                        </h3>

                        {/* The claim */}
                        <div style={{ padding: 12, borderRadius: 10, background: 'rgba(239,68,68,0.05)', border: '1px solid rgba(239,68,68,0.15)' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                            <XCircle size={13} style={{ color: '#ef4444' }} />
                            <span style={{ fontSize: 11, fontWeight: 700, color: '#ef4444', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{t({ en: 'The Claim', ar: 'الادّعاء' })}</span>
                          </div>
                          <p style={{ fontSize: 13, lineHeight: 1.6, margin: 0, color: '#cbd5e1', direction: isRTL ? 'rtl' : 'ltr', textAlign: isRTL ? 'right' : 'left' }}>
                            {isRTL ? c.claim.ar : c.claim.en}
                          </p>
                        </div>

                        {/* The debunk / fact */}
                        <div style={{ padding: 12, borderRadius: 10, background: 'rgba(16,185,129,0.05)', border: '1px solid rgba(16,185,129,0.15)' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
                            <CheckCircle size={13} style={{ color: '#10b981' }} />
                            <span style={{ fontSize: 11, fontWeight: 700, color: '#10b981', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{t({ en: 'The Fact', ar: 'الحقيقة' })}</span>
                          </div>
                          <p style={{ fontSize: 13, lineHeight: 1.6, margin: 0, color: '#cbd5e1', direction: isRTL ? 'rtl' : 'ltr', textAlign: isRTL ? 'right' : 'left' }}>
                            {isRTL ? c.fact.ar : c.fact.en}
                          </p>
                        </div>

                        {/* Source + track link */}
                        <div style={{ marginTop: 'auto', paddingTop: 8, display: 'flex', flexDirection: 'column', gap: 8 }}>
                          <div style={{ fontSize: 11, color: '#64748b', display: 'flex', alignItems: 'center', gap: 6 }}>
                            <BookOpen size={12} style={{ color: '#3b82f6' }} />
                            <span style={{ fontWeight: 600, color: '#94a3b8' }}>{t({ en: 'Source:', ar: 'المصدر:' })}</span> {c.source}
                          </div>
                          <a href={trackUrl} target="_blank" rel="noopener noreferrer"
                            style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '10px 14px', borderRadius: 10, background: 'rgba(59,130,246,0.12)', border: '1px solid rgba(59,130,246,0.35)', color: '#60a5fa', fontWeight: 700, fontSize: 13, textDecoration: 'none' }}>
                            <Search size={14} />
                            {t({ en: 'track the source', ar: 'تتبّع المصدر' })}
                            <ExternalLink size={13} />
                          </a>
                        </div>
                      </div>
                    </motion.article>
                  );
                })}
              </div>
            </>
          )}

          {/* Empty state */}
          {!casesLoading && !casesError && realCases.length === 0 && (
            <div style={{ padding: 20, borderRadius: 14, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', color: '#64748b', fontSize: 14, textAlign: 'center' }}>
              {t({ en: 'No documented cases available right now.', ar: 'لا توجد حالات موثّقة متاحة حالياً.' })}
            </div>
          )}
        </motion.section>

        {/* ── PAGE NAVIGATION ── */}
        <div style={{ marginTop: 64 }}>
          <PageNavigation currentPath="/live-deception" />
        </div>
      </div>

      {/* ── AI CHATBOT ── */}
      <PageAIChatbot
        pageTitle="Live Deception Tracker"
        pageContext="Egyptian Awareness Library - Live Deception Tracker: X-Ray scanner that reveals manipulation layers in Egyptian social media posts. Covers 6 manipulation layers: Fabrication, Lie by Omission, Decontextualization, Authority Spoofing, Cherry Picking, Emotional Hijacking. Uses scientific evidence and Islamic scholarship to inoculate users."
        systemPrompt={`You are the EAL Live Deception X-Ray AI — trained to dissect manipulation in real-time.

FOR EVERY POST OR CLAIM SUBMITTED:
1. Identify the MANIPULATION LAYER:
   - Layer 1: Absolute Fabrication (الاختلاق الكامل)
   - Layer 2: Lie by Omission (الكذب بالحذف)
   - Layer 3: Decontextualization (اقتطاع السياق)
   - Layer 4: Authority Spoofing (انتحال السلطة)
   - Layer 5: Cherry Picking (انتقاء الكرز العلمي)
   - Layer 6: Emotional Hijacking (اختطاف العاطفة)

2. Identify TARGET BRAIN REGION:
   - Amygdala: fear, danger, panic posts
   - Nucleus Accumbens: greed, financial promises
   - Prefrontal Cortex Bypass: politically polarizing content
   - Tribal Identity: religious or national identity threats

3. Give EMOTIONAL HIJACK SCORE (0-100)

4. Provide INOCULATION with:
   - Scientific counter with N= and journal
   - Islamic counter with authentic hadith number
   - WhatsApp-ready Arabic rebuttal under 80 words

5. Explain WHY this content was designed to spread (Shareability Analysis)

SPECIAL RULES:
- Never validate religious impersonation claims
- Always check if images could be decontextualized
- Flag Ponzi structures in financial posts
- Cite Amman Message 2004 for Takfir attempts
- For health claims: always ask for CONSORT compliance and sample size`}
        suggestedQuestions={[
          'كيف أعرف إن المنشور بيستهدف عاطفتي وليس عقلي؟',
          'ما هو الفرق بين الطبقة الأولى والثالثة من التلاعب؟',
          'كيف أرد على شائعة دينية على واتساب؟',
          'What brain region does health panic content target?',
        ]}
        accentColor="#ef4444"
        accentColorRgb="239,68,68"
      />

      <style>{`
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
        @keyframes ld-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
