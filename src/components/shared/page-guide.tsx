'use client';

// PAGE GUIDE — inline, collapsed-by-default "examples & how to use" panel.
// Mounted ONCE in the root layout; renders only when the current route has an
// entry in src/data/page-guides.ts (returns null otherwise). Honors the layout's
// "de-distraction" philosophy: no floating bubble, no auto-open, no toast.

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { getPageGuide } from '@/data/page-guides';

export function PageGuide() {
  const pathname = usePathname();
  const guide = getPageGuide(pathname || '');
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState<'en' | 'ar'>('en');
  const [copied, setCopied] = useState<number | null>(null);

  if (!guide) return null;
  const ar = lang === 'ar';
  const t = (en: string, a: string) => (ar ? a : en);
  const copy = (text: string, i: number) => {
    try {
      navigator.clipboard?.writeText(text);
      setCopied(i);
      setTimeout(() => setCopied(null), 1500);
    } catch { /* clipboard blocked */ }
  };

  const border = '1px solid var(--border-primary, #21262d)';
  const muted = 'var(--text-muted, #8b949e)';
  const text = 'var(--text-primary, #e6edf3)';

  return (
    <section dir={ar ? 'rtl' : 'ltr'} aria-label="Examples and use cases for this page" style={{ maxWidth: 980, margin: '24px auto', padding: '0 22px' }}>
      <div style={{ border, borderRadius: 16, background: 'var(--surface-1, rgba(255,255,255,0.02))', overflow: 'hidden' }}>
        <button onClick={() => setOpen((o) => !o)} aria-expanded={open}
          style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, background: 'transparent', border: 'none', cursor: 'pointer', padding: '14px 18px', color: text, font: 'inherit', textAlign: ar ? 'right' : 'left' }}>
          <span style={{ fontWeight: 700, fontSize: 15 }}>
            💡 {t('Examples & how to use this page', 'أمثلة وكيفية استخدام الصفحة')}
            {guide.title ? ` — ${ar ? (guide.titleAr || guide.title) : guide.title}` : ''}
          </span>
          <span style={{ display: 'flex', gap: 10, alignItems: 'center', flexShrink: 0 }}>
            <span onClick={(e) => { e.stopPropagation(); setLang(ar ? 'en' : 'ar'); }} role="button" aria-label="Toggle language"
              style={{ fontSize: 12, color: muted, border, borderRadius: 8, padding: '2px 8px' }}>{ar ? 'EN' : 'ع'}</span>
            <span style={{ color: muted, fontSize: 18 }}>{open ? '−' : '+'}</span>
          </span>
        </button>

        {open && (
          <div style={{ padding: '4px 18px 18px' }}>
            {guide.scenarios?.length ? (
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: muted, margin: '8px 0', fontWeight: 700 }}>
                  {t('Ready-to-try examples', 'أمثلة جاهزة للتجربة')}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {guide.scenarios.map((s, i) => (
                    <div key={i} style={{ border, borderRadius: 10, padding: '10px 12px', background: 'var(--surface-2, rgba(255,255,255,0.03))' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, alignItems: 'flex-start' }}>
                        <div style={{ fontSize: 14, color: text, lineHeight: 1.5 }}>{ar ? (s.pasteAr || s.paste) : s.paste}</div>
                        <button onClick={() => copy(ar ? (s.pasteAr || s.paste) : s.paste, i)}
                          style={{ flexShrink: 0, fontSize: 12, border, borderRadius: 8, padding: '4px 10px', background: 'transparent', color: muted, cursor: 'pointer' }}>
                          {copied === i ? t('Copied ✓', 'اتنسخ ✓') : t('Copy', 'نسخ')}
                        </button>
                      </div>
                      {(ar ? s.noteAr : s.note) ? <div style={{ fontSize: 12, color: muted, marginTop: 6 }}>{ar ? s.noteAr : s.note}</div> : null}
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            {guide.useCases?.length ? (
              <div>
                <div style={{ fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', color: muted, margin: '8px 0', fontWeight: 700 }}>
                  {t('How it helps / how to apply', 'كيف تساعدك / كيف تطبّقها')}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {guide.useCases.map((u, i) => (
                    <div key={i} style={{ fontSize: 13.5, color: text, lineHeight: 1.6 }}>
                      <div>✅ {ar ? u.helpAr : u.help}</div>
                      <div style={{ color: muted, marginTop: 2 }}>↪ {ar ? u.applyAr : u.apply}</div>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        )}
      </div>
    </section>
  );
}

export default PageGuide;
