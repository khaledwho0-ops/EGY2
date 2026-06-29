"use client";

/**
 * EvidenceAggregatorPanel
 * ─────────────────────────────────────────────────────────────────────
 * Calls GET /api/search/evidence?q=…&includePaid=0|1
 * Renders results grouped by source (OpenAlex / Semantic Scholar / etc.)
 * with tier badge, access tier, and a direct link to the real source URL.
 *
 * ONE LAW: never fabricates a result, never shows a placeholder number.
 * If the API fails or returns nothing, shows an explicit error state.
 */

import React, { useState, useCallback } from "react";
import { Search, ExternalLink, AlertCircle, Loader2, BookOpen, ChevronDown, ChevronUp } from "lucide-react";
import { useRTL } from "@/components/shared/rtl-provider";
import type { NormalizedAPIResponse } from "@/types";

// ── Source label mapping from tags ──────────────────────────────────────
const SOURCE_META: Record<
  string,
  { label: string; labelAr: string; color: string; accent: string }
> = {
  openalex:          { label: "OpenAlex",          labelAr: "أوبن أليكس",       color: "rgba(99,102,241,0.08)",  accent: "#6366f1" },
  "semantic-scholar":{ label: "Semantic Scholar",  labelAr: "سيمانتك سكولار",   color: "rgba(16,185,129,0.08)",  accent: "#10b981" },
  "europe-pmc":      { label: "Europe PMC",        labelAr: "يوروب PMC",         color: "rgba(245,158,11,0.08)",  accent: "#f59e0b" },
  doaj:              { label: "DOAJ",              labelAr: "دليل المجلات المفتوحة", color: "rgba(59,130,246,0.08)", accent: "#3b82f6" },
  arxiv:             { label: "arXiv",             labelAr: "أرXيف",             color: "rgba(239,68,68,0.08)",   accent: "#ef4444" },
  core:              { label: "CORE",              labelAr: "كور",               color: "rgba(20,184,166,0.08)",  accent: "#14b8a6" },
  crossref:          { label: "Crossref",          labelAr: "كروس ريف",          color: "rgba(168,85,247,0.08)",  accent: "#a855f7" },
};

function detectSource(tags: string[]): string {
  for (const key of Object.keys(SOURCE_META)) {
    if (tags.includes(key)) return key;
  }
  return "unknown";
}

// ── Trust-band badge ─────────────────────────────────────────────────
const TRUST_COLORS: Record<string, { bg: string; fg: string; label: string; labelAr: string }> = {
  A: { bg: "rgba(16,185,129,0.12)", fg: "#10b981", label: "Tier A — High trust", labelAr: "المستوى أ — ثقة عالية" },
  B: { bg: "rgba(245,158,11,0.12)", fg: "#f59e0b", label: "Tier B — Moderate",   labelAr: "المستوى ب — متوسط" },
  C: { bg: "rgba(239,68,68,0.12)",  fg: "#ef4444", label: "Tier C — Check",      labelAr: "المستوى ج — راجع" },
};

// ── Access-tier badge ────────────────────────────────────────────────
const ACCESS_COLORS: Record<string, { bg: string; fg: string }> = {
  free:    { bg: "rgba(16,185,129,0.1)",  fg: "#10b981" },
  mixed:   { bg: "rgba(245,158,11,0.1)",  fg: "#f59e0b" },
  paid:    { bg: "rgba(239,68,68,0.1)",   fg: "#ef4444" },
  unknown: { bg: "rgba(107,114,128,0.1)", fg: "#6b7280" },
};

// ── CEBM evidence-tier badge colour (BRAINS Layer C) ──────────────────
function tierColor(level: number | null): { bg: string; fg: string } {
  if (level === 1 || level === 2) return { bg: "rgba(16,185,129,0.12)", fg: "#10b981" }; // strongest
  if (level === 3) return { bg: "rgba(59,130,246,0.12)", fg: "#3b82f6" };
  if (level === 4) return { bg: "rgba(245,158,11,0.12)", fg: "#f59e0b" };
  return { bg: "rgba(107,114,128,0.12)", fg: "#9ca3af" }; // L5 or undetected
}

// ── Grouping helper ───────────────────────────────────────────────────
function groupBySource(results: NormalizedAPIResponse[]): Map<string, NormalizedAPIResponse[]> {
  const map = new Map<string, NormalizedAPIResponse[]>();
  for (const r of results) {
    const key = detectSource(r.tags);
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(r);
  }
  return map;
}

// ── Sub-component: single result card ────────────────────────────────
function ResultCard({
  result,
  isRTL,
  t,
}: {
  result: NormalizedAPIResponse;
  isRTL: boolean;
  t: (o: { en: string; ar: string }) => string;
}) {
  const [expanded, setExpanded] = useState(false);
  const trustMeta = TRUST_COLORS[result.trustBand] ?? TRUST_COLORS["C"];
  const accessMeta = result.accessTier ? ACCESS_COLORS[result.accessTier] ?? ACCESS_COLORS["unknown"] : null;
  const tier = result.evidenceTier;
  const tierMeta = tier ? tierColor(tier.cebmLevel) : null;

  return (
    <div
      style={{
        padding: "14px 18px",
        background: "var(--bg-base)",
        border: "1px solid var(--border)",
        borderRadius: 8,
        marginBottom: 10,
      }}
    >
      {/* Title row */}
      <div style={{ display: "flex", alignItems: "flex-start", gap: 10, flexWrap: "wrap" }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <a
            href={result.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontWeight: 600,
              fontSize: "0.9rem",
              color: "var(--accent-primary)",
              textDecoration: "none",
              wordBreak: "break-word",
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            {result.title}
            <ExternalLink size={12} style={{ flexShrink: 0, opacity: 0.7 }} />
          </a>
        </div>
        {/* Badges */}
        <div style={{ display: "flex", gap: 6, flexShrink: 0, flexWrap: "wrap", alignItems: "center" }}>
          <span
            style={{
              fontSize: "11px",
              fontWeight: 700,
              padding: "2px 8px",
              borderRadius: 12,
              background: trustMeta.bg,
              color: trustMeta.fg,
              whiteSpace: "nowrap",
            }}
          >
            {isRTL ? trustMeta.labelAr : trustMeta.label}
          </span>
          {accessMeta && result.accessTier && (
            <span
              style={{
                fontSize: "11px",
                fontWeight: 600,
                padding: "2px 8px",
                borderRadius: 12,
                background: accessMeta.bg,
                color: accessMeta.fg,
                whiteSpace: "nowrap",
              }}
            >
              {result.accessTier}
            </span>
          )}
          {tier && tierMeta && tier.design !== "Design not detected" && (
            <span
              title={
                isRTL
                  ? "تصميم الدراسة مُكتشَف آليًا من العنوان/الملخص (مستويات CEBM 2011) — مؤشّر وليس تقييمًا نقديًا رسميًا."
                  : "Study design auto-detected from the title/abstract (Oxford CEBM 2011 levels) — a hint, not a formal critical appraisal."
              }
              style={{
                fontSize: "11px",
                fontWeight: 700,
                padding: "2px 8px",
                borderRadius: 12,
                background: tierMeta.bg,
                color: tierMeta.fg,
                whiteSpace: "nowrap",
                cursor: "help",
              }}
            >
              {tier.cebmLevel ? `CEBM L${tier.cebmLevel} · ` : ""}
              {isRTL ? tier.designAr : tier.design}
            </span>
          )}
        </div>
      </div>

      {/* Source name + date */}
      <div style={{ marginTop: 6, fontSize: "0.78rem", color: "var(--text-muted)" }}>
        {result.sourceName}
        {result.publishedAt && result.publishedAt !== "Unknown date" && (
          <> · {result.publishedAt}</>
        )}
      </div>

      {/* Summary — collapsible */}
      {result.summary && (
        <div style={{ marginTop: 8 }}>
          <p
            style={{
              fontSize: "0.82rem",
              color: "var(--text-secondary)",
              lineHeight: 1.6,
              margin: 0,
              overflow: "hidden",
              display: "-webkit-box",
              WebkitLineClamp: expanded ? "unset" : 3,
              WebkitBoxOrient: "vertical",
            }}
          >
            {result.summary}
          </p>
          {result.summary.length > 180 && (
            <button
              onClick={() => setExpanded((v) => !v)}
              style={{
                marginTop: 4,
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "var(--accent-primary)",
                fontSize: "0.75rem",
                padding: 0,
                display: "flex",
                alignItems: "center",
                gap: 3,
              }}
            >
              {expanded
                ? t({ en: "Show less", ar: "أقل" })
                : t({ en: "Show more", ar: "المزيد" })}
              {expanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
            </button>
          )}
        </div>
      )}

      {/* Why recommended */}
      {result.whyRecommended && (
        <div
          style={{
            marginTop: 8,
            fontSize: "0.75rem",
            color: "var(--text-muted)",
            fontStyle: "italic",
          }}
        >
          {result.whyRecommended}
        </div>
      )}

      {/* Access notes */}
      {result.accessNotes && (
        <div
          style={{
            marginTop: 4,
            fontSize: "0.72rem",
            color: "var(--text-muted)",
            opacity: 0.75,
          }}
        >
          {result.accessNotes}
        </div>
      )}
    </div>
  );
}

// ── Main panel ────────────────────────────────────────────────────────
export function EvidenceAggregatorPanel() {
  const { isRTL, t } = useRTL();
  const dir = isRTL ? "rtl" : "ltr";
  const ff = isRTL ? "'Noto Kufi Arabic', sans-serif" : "inherit";

  const [query, setQuery] = useState("");
  const [includePaid, setIncludePaid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<NormalizedAPIResponse[] | null>(null);
  const [policy, setPolicy] = useState<string | null>(null);

  const search = useCallback(async () => {
    const q = query.trim();
    if (!q) return;
    setLoading(true);
    setError(null);
    setResults(null);
    setPolicy(null);
    try {
      const params = new URLSearchParams({ q, includePaid: includePaid ? "1" : "0" });
      const res = await fetch(`/api/search/evidence?${params.toString()}`);
      if (!res.ok) {
        let msg = `HTTP ${res.status}`;
        try {
          const body = await res.json();
          if (body?.error) msg = body.error;
        } catch { /* ignore parse failure */ }
        setError(msg);
        return;
      }
      const data = await res.json();
      if (!Array.isArray(data?.results)) {
        setError(
          t({
            en: "Unexpected response format from evidence API — cannot display results.",
            ar: "تنسيق استجابة غير متوقع من واجهة الأدلة — لا يمكن عرض النتائج.",
          })
        );
        return;
      }
      setResults(data.results as NormalizedAPIResponse[]);
      if (typeof data.policy === "string") setPolicy(data.policy);
    } catch (err) {
      setError(
        t({
          en: `Network error: ${err instanceof Error ? err.message : "Unknown error"}. Please try again.`,
          ar: `خطأ في الشبكة: ${err instanceof Error ? err.message : "خطأ غير معروف"}. يرجى المحاولة مرة أخرى.`,
        })
      );
    } finally {
      setLoading(false);
    }
  }, [query, includePaid, t]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") search();
  };

  const grouped = results ? groupBySource(results) : null;

  return (
    <div style={{ direction: dir, fontFamily: ff }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
        <BookOpen size={22} style={{ color: "var(--accent-cta)", flexShrink: 0 }} />
        <h2 style={{ fontSize: "var(--font-h3, 1.35rem)", margin: 0 }}>
          <span className="text-gradient">
            {t({ en: "Evidence Aggregator", ar: "مجمِّع الأدلة العلمية" })}
          </span>
        </h2>
      </div>
      <p style={{ color: "var(--text-muted)", marginBottom: 20, fontSize: "0.9rem", lineHeight: 1.7, maxWidth: 680 }}>
        {t({
          en: "Search across OpenAlex, Semantic Scholar, Europe PMC, DOAJ, arXiv, and CORE for open-access scholarly evidence. All results are attributed to their real source — no fabricated results, ever.",
          ar: "ابحث عبر أوبن أليكس وسيمانتك سكولار ويوروب PMC ودليل المجلات المفتوحة وأرXيف وكور للحصول على أدلة علمية مفتوحة المصدر. جميع النتائج منسوبة لمصدرها الحقيقي — بدون أي نتائج مختلقة.",
        })}
      </p>

      {/* Search row */}
      <div
        style={{
          display: "flex",
          gap: 8,
          flexWrap: "wrap",
          alignItems: "center",
          marginBottom: 12,
        }}
      >
        <div style={{ position: "relative", flex: 1, minWidth: 220 }}>
          <Search
            size={16}
            style={{
              position: "absolute",
              [isRTL ? "right" : "left"]: 12,
              top: "50%",
              transform: "translateY(-50%)",
              color: "var(--text-muted)",
              pointerEvents: "none",
            }}
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={t({
              en: "e.g. misinformation cognitive inoculation",
              ar: "مثال: المعلومات المضللة والتلقيح المعرفي",
            })}
            style={{
              width: "100%",
              padding: isRTL ? "10px 40px 10px 14px" : "10px 14px 10px 40px",
              borderRadius: 8,
              border: "1px solid var(--border)",
              background: "var(--bg-base)",
              color: "var(--text-base)",
              fontSize: "0.9rem",
              outline: "none",
              boxSizing: "border-box",
              direction: isRTL ? "rtl" : "ltr",
              fontFamily: ff,
            }}
            aria-label={t({ en: "Evidence search query", ar: "استعلام بحث الأدلة" })}
            disabled={loading}
          />
        </div>
        <button
          onClick={search}
          disabled={loading || !query.trim()}
          style={{
            padding: "10px 20px",
            borderRadius: 8,
            border: "none",
            background: "var(--accent-cta, #6366f1)",
            color: "#fff",
            fontWeight: 700,
            fontSize: "0.9rem",
            cursor: loading || !query.trim() ? "not-allowed" : "pointer",
            opacity: loading || !query.trim() ? 0.6 : 1,
            display: "flex",
            alignItems: "center",
            gap: 6,
            fontFamily: ff,
            flexShrink: 0,
          }}
        >
          {loading ? (
            <>
              <Loader2 size={15} style={{ animation: "spin 1s linear infinite" }} />
              {t({ en: "Searching…", ar: "جارٍ البحث…" })}
            </>
          ) : (
            t({ en: "Search", ar: "بحث" })
          )}
        </button>
      </div>

      {/* Include paid toggle */}
      <label
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 24,
          cursor: "pointer",
          fontSize: "0.82rem",
          color: "var(--text-secondary)",
          userSelect: "none",
        }}
      >
        <input
          type="checkbox"
          checked={includePaid}
          onChange={(e) => setIncludePaid(e.target.checked)}
          style={{ cursor: "pointer" }}
          disabled={loading}
        />
        {t({
          en: "Include Crossref metadata fallback (may link to paid content)",
          ar: "تضمين بيانات Crossref الوصفية (قد تؤدي إلى محتوى مدفوع)",
        })}
      </label>

      {/* Spin animation */}
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>

      {/* Loading skeleton */}
      {loading && (
        <div style={{ textAlign: "center", padding: "40px 0", color: "var(--text-muted)" }}>
          <Loader2 size={32} style={{ animation: "spin 1s linear infinite", margin: "0 auto 12px", display: "block" }} />
          <p style={{ margin: 0, fontFamily: ff }}>
            {t({ en: "Querying open-access databases…", ar: "جارٍ الاستعلام عن قواعد البيانات المفتوحة…" })}
          </p>
        </div>
      )}

      {/* Error — FAIL LOUD */}
      {!loading && error && (
        <div
          role="alert"
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: 10,
            padding: "14px 18px",
            borderRadius: 8,
            background: "rgba(239,68,68,0.08)",
            border: "1px solid rgba(239,68,68,0.25)",
            color: "#ef4444",
            marginBottom: 20,
          }}
        >
          <AlertCircle size={18} style={{ flexShrink: 0, marginTop: 1 }} />
          <div>
            <strong style={{ fontSize: "0.88rem" }}>
              {t({ en: "Evidence search failed — unverified", ar: "فشل البحث عن الأدلة — غير موثَّق" })}
            </strong>
            <p style={{ margin: "4px 0 0", fontSize: "0.82rem", opacity: 0.9 }}>{error}</p>
          </div>
        </div>
      )}

      {/* Empty state */}
      {!loading && !error && results !== null && results.length === 0 && (
        <div
          style={{
            padding: "28px 20px",
            textAlign: "center",
            borderRadius: 8,
            background: "var(--bg-base)",
            border: "1px dashed var(--border)",
            color: "var(--text-muted)",
            fontFamily: ff,
          }}
        >
          <p style={{ margin: 0, fontSize: "0.9rem" }}>
            {t({
              en: "No open-access results found for this query. Try different keywords or enable the Crossref fallback.",
              ar: "لم يتم العثور على نتائج مفتوحة المصدر لهذا الاستعلام. جرّب كلمات مفتاحية مختلفة أو فعِّل احتياطي Crossref.",
            })}
          </p>
        </div>
      )}

      {/* Results grouped by source */}
      {!loading && !error && grouped && grouped.size > 0 && (
        <div>
          {/* Policy banner */}
          {policy && (
            <div
              style={{
                marginBottom: 16,
                padding: "6px 14px",
                borderRadius: 6,
                background: "rgba(99,102,241,0.07)",
                border: "1px solid rgba(99,102,241,0.18)",
                fontSize: "0.78rem",
                color: "var(--text-muted)",
                display: "inline-block",
              }}
            >
              {t({ en: "Policy:", ar: "السياسة:" })} <strong>{policy}</strong>
            </div>
          )}

          {/* Total count */}
          <p style={{ fontSize: "0.82rem", color: "var(--text-muted)", marginBottom: 18 }}>
            {t({
              en: `${results!.length} open-access result${results!.length !== 1 ? "s" : ""} from ${grouped.size} source${grouped.size !== 1 ? "s" : ""}`,
              ar: `${results!.length} نتيجة مفتوحة المصدر من ${grouped.size} مصدر`,
            })}
          </p>

          {/* Source groups */}
          {Array.from(grouped.entries()).map(([sourceKey, items]) => {
            const meta = SOURCE_META[sourceKey] ?? {
              label: sourceKey,
              labelAr: sourceKey,
              color: "rgba(107,114,128,0.08)",
              accent: "#6b7280",
            };
            return (
              <div
                key={sourceKey}
                style={{
                  marginBottom: 24,
                  borderRadius: 10,
                  border: `1px solid ${meta.accent}33`,
                  background: meta.color,
                  overflow: "hidden",
                }}
              >
                {/* Group header */}
                <div
                  style={{
                    padding: "10px 18px",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    borderBottom: `1px solid ${meta.accent}22`,
                  }}
                >
                  <span
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: meta.accent,
                      flexShrink: 0,
                      display: "inline-block",
                    }}
                  />
                  <strong
                    style={{
                      fontSize: "0.88rem",
                      color: meta.accent,
                      fontFamily: ff,
                    }}
                  >
                    {isRTL ? meta.labelAr : meta.label}
                  </strong>
                  <span
                    style={{
                      marginInlineStart: "auto",
                      fontSize: "0.75rem",
                      color: "var(--text-muted)",
                      background: "var(--bg-base)",
                      borderRadius: 12,
                      padding: "2px 8px",
                      border: "1px solid var(--border)",
                    }}
                  >
                    {items.length} {t({ en: items.length !== 1 ? "results" : "result", ar: "نتيجة" })}
                  </span>
                </div>

                {/* Cards */}
                <div style={{ padding: "12px 16px 4px" }}>
                  {items.map((r) => (
                    <ResultCard key={r.id} result={r} isRTL={isRTL} t={t} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
