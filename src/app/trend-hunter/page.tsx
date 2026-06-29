'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  TrendingUp, Radar, Search, ExternalLink, Clock, Flame, Zap,
  BookOpen, ChevronDown, ChevronUp, Info, Archive, AlertTriangle, RefreshCw
} from 'lucide-react';
import { useRTL } from '@/components/shared/rtl-provider';
import { PageNavigation } from '@/components/shared/page-navigation';
import { PageAIChatbot } from '@/components/shared/page-ai-chatbot';

// ─── Types matching the REAL API contracts ──────────────────────────────────
// GET /api/hunter/trends  → { success, data: [{ title, traffic, pubDate }] }  (LIVE Google Trends RSS, geo=EG)
// GET /api/kill-list      → { results: DebunkedClaim[] }                       (documented, dated debunks)
interface LiveTrend {
  title: string;
  traffic: string;
  pubDate: string;
}

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

type ThreatLevel = DebunkedClaim['threatLevel'];

const THREAT_STYLES: Record<ThreatLevel, { bg: string; border: string; text: string }> = {
  Critical: { bg: 'rgba(239,68,68,0.1)', border: 'rgba(239,68,68,0.4)', text: '#ef4444' },
  High: { bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.4)', text: '#f59e0b' },
  Medium: { bg: 'rgba(99,102,241,0.12)', border: 'rgba(99,102,241,0.4)', text: '#818cf8' },
  Low: { bg: 'rgba(16,185,129,0.1)', border: 'rgba(16,185,129,0.4)', text: '#10b981' },
};

const THREAT_LABEL_AR: Record<ThreatLevel, string> = {
  Critical: 'خطر بالغ',
  High: 'خطر مرتفع',
  Medium: 'خطر متوسط',
  Low: 'خطر منخفض',
};

// Parse "Mon, 19 Jun 2026 14:10:00 -0700" → localized short date, gracefully.
function formatDate(raw: string, isRtl: boolean): string {
  if (!raw) return '';
  const d = new Date(raw);
  if (isNaN(d.getTime())) return raw;
  try {
    return d.toLocaleDateString(isRtl ? 'ar-EG' : 'en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  } catch {
    return raw;
  }
}

export default function TrendHunterPage() {
  const { isRTL: isRtl } = useRTL();

  // ── LIVE Google Trends (Egypt) ──
  const [trends, setTrends] = useState<LiveTrend[]>([]);
  const [trendsLoading, setTrendsLoading] = useState(true);
  const [trendsError, setTrendsError] = useState<string | null>(null);
  const [fetchedAt, setFetchedAt] = useState<Date | null>(null);

  // ── Documented misinfo archive (kill-list) ──
  const [archive, setArchive] = useState<DebunkedClaim[]>([]);
  const [archiveLoading, setArchiveLoading] = useState(true);
  const [archiveError, setArchiveError] = useState<string | null>(null);
  const [archiveFilter, setArchiveFilter] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const loadTrends = async () => {
    setTrendsLoading(true);
    setTrendsError(null);
    try {
      const res = await fetch('/api/hunter/trends?geo=EG');
      if (!res.ok) throw new Error(`status ${res.status}`);
      const data = await res.json();
      if (!data.success) throw new Error(data.error || 'unknown');
      setTrends(Array.isArray(data.data) ? data.data : []);
      setFetchedAt(new Date());
    } catch (e: any) {
      setTrendsError(isRtl ? 'تعذّر جلب تريندات جوجل المباشرة الآن' : 'Could not fetch live Google Trends right now');
    } finally {
      setTrendsLoading(false);
    }
  };

  const loadArchive = async () => {
    setArchiveLoading(true);
    setArchiveError(null);
    try {
      const res = await fetch('/api/kill-list');
      if (!res.ok) throw new Error(`status ${res.status}`);
      const data = await res.json();
      setArchive(Array.isArray(data.results) ? data.results : []);
    } catch (e: any) {
      setArchiveError(isRtl ? 'تعذّر تحميل أرشيف الادعاءات الموثقة' : 'Could not load the documented claims archive');
    } finally {
      setArchiveLoading(false);
    }
  };

  useEffect(() => {
    loadTrends();
    loadArchive();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Real categories straight from the data — no invention.
  const categories = useMemo(() => {
    const set = new Set(archive.map((c) => c.category));
    return ['all', ...Array.from(set)];
  }, [archive]);

  const filteredArchive = archiveFilter === 'all'
    ? archive
    : archive.filter((c) => c.category === archiveFilter);

  // Real date span of the archive (honest "historical layer" labelling).
  const archiveSpan = useMemo(() => {
    if (archive.length === 0) return null;
    const times = archive.map((c) => new Date(c.date).getTime()).filter((t) => !isNaN(t));
    if (times.length === 0) return null;
    const min = new Date(Math.min(...times)).getFullYear();
    const max = new Date(Math.max(...times)).getFullYear();
    return min === max ? `${min}` : `${min}–${max}`;
  }, [archive]);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-page)', color: 'var(--text-primary)', direction: isRtl ? 'rtl' : 'ltr' }}>
      {/* Animated Radar Background */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 0 }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}>
          {[800, 600, 400, 200].map((size, i) => (
            <div key={i} style={{ position: 'absolute', width: size, height: size, top: -size / 2, left: -size / 2, borderRadius: '50%', border: '1px solid rgba(245,158,11,0.05)', boxShadow: i === 0 ? '0 0 80px rgba(245,158,11,0.03)' : 'none' }} />
          ))}
        </div>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, rgba(245,158,11,0.3), transparent)', animation: 'scan 4s linear infinite' }} />
      </div>

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 1280, margin: '0 auto', padding: '80px 24px 120px' }}>

        {/* ── HEADER ── */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: 32, textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 16px', borderRadius: 20, background: 'var(--accent-deepreal-surface)', border: '1px solid var(--accent-deepreal-glow)', marginBottom: 20 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent-deepreal)', boxShadow: '0 0 8px var(--accent-deepreal)', display: 'inline-block', animation: 'pulse 2s infinite' }} />
            <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--accent-deepreal)' }}>
              {isRtl ? 'تريندات مصر المباشرة + الأرشيف' : 'LIVE EGYPT TRENDS + ARCHIVE'}
            </span>
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 900, letterSpacing: '-1px', margin: '0 0 16px', lineHeight: 1.1 }}>
            <span style={{ background: 'linear-gradient(135deg, #f59e0b, #fbbf24, #fcd34d)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              TREND HUNTER
            </span>
            <br />
            <span style={{ fontSize: '0.55em', color: 'var(--text-secondary)', WebkitTextFillColor: 'var(--text-secondary)' }}>صيّاد التريند</span>
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: 16, maxWidth: 640, margin: '0 auto 16px', lineHeight: 1.6 }}>
            {isRtl
              ? 'طبقتان من البيانات الحقيقية: تريندات جوجل المباشرة الآن في مصر، وأرشيف موثّق لادعاءات تم تفنيدها بمصادر رسمية.'
              : "Two layers of real data: what Egypt is searching right now on Google Trends, plus a documented archive of claims debunked by official sources."}
          </p>

          {/* Differentiation note vs /live-deception */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 16px', borderRadius: 12, background: 'var(--accent-religionhub-surface)', border: '1px solid var(--accent-religionhub-glow)', fontSize: 13, color: 'var(--accent-indigo)', maxWidth: 720 }}>
            <Info size={15} style={{ flexShrink: 0 }} />
            <span>
              {isRtl
                ? 'هذه الصفحة = تريندات عامة حقيقية من جوجل. أمّا /live-deception فهي محاكاة تعليمية لكيفية صناعة التلاعب — وليست بيانات بحث فعلية.'
                : 'This page = real public trends from Google. /live-deception is an educational simulation of how manipulation is engineered — not actual search data.'}
            </span>
          </div>
        </motion.div>

        {/* ════════════════════ LAYER 1: LIVE GOOGLE TRENDS ════════════════════ */}
        <section style={{ marginBottom: 56 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 8 }}>
            <h2 style={{ display: 'flex', alignItems: 'center', gap: 10, margin: 0, fontSize: 20, fontWeight: 800, color: 'var(--text-primary)' }}>
              <TrendingUp size={22} style={{ color: 'var(--accent-deepreal)' }} />
              {isRtl ? 'الطبقة الأولى: تريندات مصر الآن' : 'Layer 1 — Egypt Trending Now'}
            </h2>
            <button
              onClick={loadTrends}
              disabled={trendsLoading}
              style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '7px 14px', borderRadius: 10, background: 'var(--accent-deepreal-surface)', border: '1px solid var(--accent-deepreal-glow)', color: 'var(--accent-deepreal)', fontSize: 13, fontWeight: 600, cursor: trendsLoading ? 'wait' : 'pointer' }}
            >
              <RefreshCw size={14} style={{ animation: trendsLoading ? 'spin 1s linear infinite' : 'none' }} />
              {isRtl ? 'تحديث' : 'Refresh'}
            </button>
          </div>

          {/* Honest live-source label */}
          <p style={{ fontSize: 13, color: 'var(--text-muted)', margin: '0 0 20px', lineHeight: 1.6, display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
            <Clock size={14} />
            {isRtl
              ? 'مصدر مباشر: Google Trends RSS (geo=EG)، يُحدَّث كل ~5 دقائق. هذه تريندات اللحظة الحالية فقط — وليست سجلاً لسنة كاملة (للتاريخ راجع الأرشيف بالأسفل).'
              : 'Live source: Google Trends RSS (geo=EG), refreshed ~every 5 min. These are current-moment trends only — NOT a full-year history (see the archive below for history).'}
            {fetchedAt && (
              <span style={{ color: 'var(--text-caption)' }}>
                · {isRtl ? 'آخر جلب' : 'fetched'} {fetchedAt.toLocaleTimeString(isRtl ? 'ar-EG' : 'en-GB')}
              </span>
            )}
          </p>

          {trendsLoading && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: 24, color: 'var(--text-secondary)', fontSize: 14 }}>
              <Radar size={18} style={{ color: 'var(--accent-deepreal)', animation: 'spin 1.4s linear infinite' }} />
              {isRtl ? 'جارٍ مسح تريندات جوجل المباشرة...' : 'Scanning live Google Trends...'}
            </div>
          )}

          {trendsError && !trendsLoading && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: 16, borderRadius: 12, background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.2)', color: 'var(--accent-red)', fontSize: 14 }}>
              <AlertTriangle size={16} /> {trendsError}
            </div>
          )}

          {!trendsLoading && !trendsError && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 14 }}>
              {trends.map((trend, i) => {
                const trendsUrl = `https://trends.google.com/trends/explore?geo=EG&q=${encodeURIComponent(trend.title)}`;
                const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(trend.title)}`;
                return (
                  <motion.div
                    key={`${trend.title}-${i}`}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: Math.min(i * 0.04, 0.4) }}
                    style={{ padding: 18, borderRadius: 16, background: 'var(--bg-card)', border: '1px solid var(--accent-deepreal-glow)', display: 'flex', flexDirection: 'column', gap: 12 }}
                  >
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                      <span style={{ fontSize: 13, fontWeight: 800, color: 'var(--accent-deepreal)', background: 'var(--accent-deepreal-surface)', borderRadius: 8, padding: '2px 9px', flexShrink: 0 }}>
                        #{i + 1}
                      </span>
                      <span style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.4, wordBreak: 'break-word' }}>
                        {trend.title}
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', fontSize: 12, color: 'var(--text-muted)' }}>
                      {trend.traffic && trend.traffic !== 'Unknown' && (
                        <span style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--accent-deepreal)', fontWeight: 600 }}>
                          <Flame size={13} /> {trend.traffic} {isRtl ? 'بحث' : 'searches'}
                        </span>
                      )}
                      {trend.pubDate && (
                        <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                          <Clock size={12} /> {formatDate(trend.pubDate, isRtl)}
                        </span>
                      )}
                    </div>

                    {/* Trackable links per live trend */}
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 'auto' }}>
                      <a href={trendsUrl} target="_blank" rel="noopener noreferrer"
                        style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '6px 12px', borderRadius: 9, background: 'var(--accent-deepreal-surface)', border: '1px solid var(--accent-deepreal-glow)', color: 'var(--accent-deepreal)', fontSize: 12, fontWeight: 600, textDecoration: 'none' }}>
                        <TrendingUp size={13} /> {isRtl ? 'تتبّع على جوجل تريندز' : 'Track on Trends'}
                      </a>
                      <a href={searchUrl} target="_blank" rel="noopener noreferrer"
                        style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '6px 12px', borderRadius: 9, background: 'var(--bg-elevated)', border: '1px solid var(--border-primary)', color: 'var(--text-secondary)', fontSize: 12, fontWeight: 600, textDecoration: 'none' }}>
                        <Search size={13} /> {isRtl ? 'بحث' : 'Search'} <ExternalLink size={11} />
                      </a>
                    </div>
                  </motion.div>
                );
              })}
              {trends.length === 0 && (
                <div style={{ gridColumn: '1 / -1', padding: 24, color: 'var(--text-muted)', fontSize: 14 }}>
                  {isRtl ? 'لا توجد تريندات متاحة في هذه اللحظة. جرّب التحديث.' : 'No trends available at this moment. Try refreshing.'}
                </div>
              )}
            </div>
          )}
        </section>

        {/* ════════════════════ LAYER 2: DOCUMENTED MISINFO ARCHIVE ════════════════════ */}
        <section>
          <h2 style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '0 0 8px', fontSize: 20, fontWeight: 800, color: 'var(--text-primary)' }}>
            <Archive size={22} style={{ color: 'var(--accent-religionhub)' }} />
            {isRtl ? 'الطبقة الثانية: أرشيف الادعاءات الموثّقة' : 'Layer 2 — Documented Misinfo Archive'}
          </h2>
          <p style={{ fontSize: 13, color: 'var(--text-muted)', margin: '0 0 20px', lineHeight: 1.6, display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
            <BookOpen size={14} />
            {isRtl
              ? 'الطبقة التاريخية: ادعاءات مُفنَّدة موثّقة بمصدر رسمي وتاريخ لكل منها'
              : 'The historical layer: debunked claims, each carrying an official source and a date'}
            {archiveSpan && (
              <span style={{ color: 'var(--accent-religionhub)', fontWeight: 600 }}>
                · {isRtl ? `يمتد عبر ${archiveSpan}` : `spanning ${archiveSpan}`}
              </span>
            )}
            {archive.length > 0 && (
              <span style={{ color: 'var(--text-caption)' }}>· {archive.length} {isRtl ? 'حالة' : 'cases'}</span>
            )}
          </p>

          {/* Category filter — built from REAL data */}
          {!archiveLoading && !archiveError && archive.length > 0 && (
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
              {categories.map((cat) => (
                <button key={cat} onClick={() => setArchiveFilter(cat)}
                  style={{ padding: '7px 16px', borderRadius: 20, fontSize: 13, fontWeight: 600, cursor: 'pointer', background: archiveFilter === cat ? 'var(--accent-religionhub-surface)' : 'var(--bg-elevated)', border: archiveFilter === cat ? '1px solid var(--accent-religionhub-glow)' : '1px solid var(--border-primary)', color: archiveFilter === cat ? 'var(--accent-religionhub)' : 'var(--text-secondary)' }}>
                  {cat === 'all' ? (isRtl ? 'الكل' : 'All') : cat}
                </button>
              ))}
            </div>
          )}

          {archiveLoading && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: 24, color: 'var(--text-secondary)', fontSize: 14 }}>
              <Radar size={18} style={{ color: 'var(--accent-religionhub)', animation: 'spin 1.4s linear infinite' }} />
              {isRtl ? 'جارٍ تحميل الأرشيف الموثّق...' : 'Loading documented archive...'}
            </div>
          )}

          {archiveError && !archiveLoading && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: 16, borderRadius: 12, background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.2)', color: 'var(--accent-red)', fontSize: 14 }}>
              <AlertTriangle size={16} /> {archiveError}
            </div>
          )}

          {!archiveLoading && !archiveError && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {filteredArchive.map((claim, idx) => {
                const ts = THREAT_STYLES[claim.threatLevel] || THREAT_STYLES.Medium;
                const isExpanded = expandedId === claim.id;
                return (
                  <motion.div key={claim.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: Math.min(idx * 0.05, 0.4) }}
                    style={{ borderRadius: 18, background: 'var(--bg-card)', border: `1px solid ${ts.border}`, overflow: 'hidden' }}>
                    <div style={{ padding: '20px 24px' }}>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 12, alignItems: 'center' }}>
                        <span style={{ padding: '3px 10px', borderRadius: 12, fontSize: 11, fontWeight: 700, letterSpacing: '0.5px', background: ts.bg, border: `1px solid ${ts.border}`, color: ts.text }}>
                          {isRtl ? THREAT_LABEL_AR[claim.threatLevel] : claim.threatLevel.toUpperCase()}
                        </span>
                        <span style={{ padding: '3px 10px', borderRadius: 12, fontSize: 11, fontWeight: 600, background: 'var(--accent-religionhub-surface)', border: '1px solid var(--accent-religionhub-glow)', color: 'var(--accent-religionhub)' }}>
                          {claim.category}
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: 'var(--text-muted)' }}>
                          <Clock size={12} /> {formatDate(claim.date, isRtl)}
                        </span>
                      </div>

                      <h3 style={{ margin: '0 0 8px', fontSize: 'clamp(15px, 2vw, 18px)', fontWeight: 700, lineHeight: 1.4, color: 'var(--text-primary)' }}>
                        {isRtl ? claim.title.ar : claim.title.en}
                      </h3>
                      <p style={{ margin: '0 0 14px', fontSize: 14, lineHeight: 1.7, color: 'var(--text-secondary)' }}>
                        <span style={{ color: 'var(--accent-red)', fontWeight: 700 }}>✗ {isRtl ? 'الادعاء:' : 'Claim:'} </span>
                        {isRtl ? claim.claim.ar : claim.claim.en}
                      </p>

                      <button
                        onClick={() => setExpandedId(isExpanded ? null : claim.id)}
                        style={{ padding: '8px 16px', borderRadius: 10, background: 'var(--accent-mentalhealth-surface)', border: '1px solid var(--accent-mentalhealth-glow)', color: 'var(--accent-mentalhealth)', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 600 }}
                      >
                        {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        {isRtl ? 'الحقيقة والمصدر' : 'The Fact & Source'}
                      </button>
                    </div>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                          style={{ borderTop: '1px solid var(--border-subtle)', overflow: 'hidden' }}>
                          <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 14 }}>
                            <div style={{ padding: 18, borderRadius: 14, background: 'var(--accent-mentalhealth-surface)', border: '1px solid var(--accent-mentalhealth-glow)' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                                <BookOpen size={17} style={{ color: 'var(--accent-mentalhealth)' }} />
                                <span style={{ fontWeight: 700, fontSize: 14, color: 'var(--accent-mentalhealth)' }}>{isRtl ? 'الحقيقة' : 'The Fact'}</span>
                              </div>
                              <p style={{ fontSize: 14, color: 'var(--text-primary)', lineHeight: 1.8, margin: 0 }}>
                                {isRtl ? claim.fact.ar : claim.fact.en}
                              </p>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--text-secondary)', flexWrap: 'wrap' }}>
                              <span style={{ padding: '5px 12px', borderRadius: 9, background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.25)', color: 'var(--accent-blue)', fontWeight: 600 }}>
                                {isRtl ? 'المصدر:' : 'Source:'} {claim.source}
                              </span>
                              <a
                                href={`https://www.google.com/search?q=${encodeURIComponent((isRtl ? claim.title.en : claim.title.en) + ' ' + claim.source)}`}
                                target="_blank" rel="noopener noreferrer"
                                style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '5px 12px', borderRadius: 9, background: 'var(--bg-elevated)', border: '1px solid var(--border-primary)', color: 'var(--text-secondary)', fontSize: 12, fontWeight: 600, textDecoration: 'none' }}
                              >
                                <Search size={12} /> {isRtl ? 'تحقّق من المصدر' : 'Verify source'} <ExternalLink size={11} />
                              </a>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
              {filteredArchive.length === 0 && archive.length > 0 && (
                <div style={{ padding: 24, color: 'var(--text-muted)', fontSize: 14 }}>
                  {isRtl ? 'لا توجد حالات في هذا التصنيف.' : 'No cases in this category.'}
                </div>
              )}
            </div>
          )}
        </section>

        {/* ── PAGE NAVIGATION ── */}
        <div style={{ marginTop: 56 }}>
          <PageNavigation currentPath="/trend-hunter" />
        </div>
      </div>

      {/* ── AI CHATBOT ── */}
      <PageAIChatbot
        pageTitle="Trend Hunter — صيّاد التريند"
        pageContext="Egyptian Awareness Library — Trend Hunter. Two real data layers: (1) LIVE Google Trends RSS for Egypt (geo=EG, current-moment trends, refreshed ~every 5 min, NOT a full-year history) via GET /api/hunter/trends; (2) a documented misinformation archive of debunked claims, each with a real official source and date, via GET /api/kill-list. This page shows REAL public trend data and REAL documented debunks — it is distinct from /live-deception, which is an educational simulation of manipulation, not real search data."
        systemPrompt={`You are the EAL Trend Hunter assistant for Egypt.

GROUNDING — ONE LAW (binding):
- Only state facts that carry a REAL, resolvable source. NEVER fabricate statistics, study names, sample sizes, p-values, sources, or numbers.
- If you do not have a real source for a claim, say so plainly and suggest how the user could verify it (e.g. official health/finance authorities, peer-reviewed databases).
- Keep examples NAME-FREE: do not name specific people, brands, or accused deceivers.

WHAT THIS PAGE SHOWS:
1. LIVE layer — Google Trends RSS for Egypt: what people are searching RIGHT NOW. This is current-moment data, not a year-long record. Help users interpret a trend and how to track it (Google Trends explore, plain search).
2. ARCHIVE layer — documented debunked claims, each with an official source (e.g. WHO, FDA, IPCC, ITU) and a date. Use these as the historical record of recurring misinformation.

HOW TO HELP:
- When asked whether a trending topic might be misinformation, explain how to check it against reliable sources; do not invent a verdict you cannot source.
- Distinguish clearly between "this is trending" (popularity) and "this is true/false" (accuracy) — popularity is not evidence.
- Respond in Egyptian Arabic if asked in Arabic, English if asked in English.`}
        suggestedQuestions={[
          'إيه الفرق بين إن موضوع يبقى تريند وإنه يبقى حقيقي؟',
          'إزاي أتحقق من خبر منتشر قبل ما أشاركه؟',
          'How do I track a trending topic on Google Trends?',
          'What official sources can verify a health rumor?',
        ]}
        accentColor="#f59e0b"
        accentColorRgb="245,158,11"
      />

      <style>{`
        @keyframes scan { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
      `}</style>
    </div>
  );
}
