"use client";

import React, { useState, useMemo, useEffect } from "react";
import { 
  Database, Search, Filter, ShieldAlert, ArrowRight, ExternalLink, 
  RefreshCw, FileText, CheckCircle, AlertTriangle, Info, BookOpen, Clock 
} from "lucide-react";
import Link from "next/link";
import type { NormalizedAPIResponse } from "@/types";
import { PageNavigation } from '@/components/shared/page-navigation';
import { PageAIChatbot } from '@/components/shared/page-ai-chatbot';
import ToolGuide from '@/components/ToolGuide';

type SortOption = "relevance" | "year_desc" | "year_asc";
type SourceOption = "openalex" | "semantic-scholar" | "europe-pmc" | "doaj" | "crossref" | "arxiv" | "core";

const SOURCE_OPTIONS: { id: SourceOption; label: string; desc: string }[] = [
  { id: "openalex", label: "OpenAlex", desc: "Open global index of scholarly works" },
  { id: "semantic-scholar", label: "Semantic Scholar", desc: "AI-driven scientific literature search" },
  { id: "europe-pmc", label: "Europe PMC", desc: "Life sciences and biomedical research" },
  { id: "doaj", label: "DOAJ", desc: "Directory of Open Access Journals" },
  { id: "crossref", label: "Crossref", desc: "Digital Object Identifier (DOI) index" },
  { id: "arxiv", label: "arXiv", desc: "Preprints in physics, math, and computer science" },
  { id: "core", label: "CORE", desc: "World's largest aggregator of open access research" },
];

const SUGGESTED_SEARCHES = [
  "mRNA vaccines long term effects",
  "Climate change global temperature models",
  "Quantum computing encryption vulnerabilities",
  "Artificial intelligence cognitive bias",
  "Microplastics human blood brain barrier"
];

export default function EvidencePage() {
  const [query, setQuery] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<NormalizedAPIResponse[]>([]);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  
  // Filters and Sorts
  const [activeSources, setActiveSources] = useState<Set<SourceOption>>(new Set(SOURCE_OPTIONS.map(s => s.id)));
  const [sortBy, setSortBy] = useState<SortOption>("relevance");
  const [showOnlyOA, setShowOnlyOA] = useState(false);

  useEffect(() => {
    // Load search history from local storage if available
    try {
      const history = localStorage.getItem("eal_evidence_history");
      if (history) {
        setSearchHistory(JSON.parse(history));
      }
    } catch (e) {
      console.warn("Could not load search history", e);
    }
  }, []);

  const saveToHistory = (newQuery: string) => {
    const updated = [newQuery, ...searchHistory.filter(q => q !== newQuery)].slice(0, 5);
    setSearchHistory(updated);
    try {
      localStorage.setItem("eal_evidence_history", JSON.stringify(updated));
    } catch (e) {
      console.warn("Could not save search history", e);
    }
  };

  const handleSearch = async (e?: React.FormEvent, explicitQuery?: string) => {
    if (e) e.preventDefault();
    const searchQuery = explicitQuery || query;
    if (!searchQuery.trim()) return;

    if (explicitQuery) setQuery(explicitQuery);
    
    setLoading(true);
    setError(null);
    setHasSearched(true);
    saveToHistory(searchQuery);
    
    try {
      const res = await fetch(`/api/search/evidence?q=${encodeURIComponent(searchQuery)}`);
      if (!res.ok) {
        throw new Error(`Error: ${res.status}`);
      }
      const data = await res.json();
      setResults(data.results || []);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch evidence from global repositories. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const toggleSource = (source: SourceOption) => {
    setActiveSources(prev => {
      const next = new Set(prev);
      if (next.has(source)) {
        next.delete(source);
      } else {
        next.add(source);
      }
      return next;
    });
  };

  const selectAllSources = () => {
    setActiveSources(new Set(SOURCE_OPTIONS.map(s => s.id)));
  };

  const clearAllSources = () => {
    setActiveSources(new Set());
  };

  const filteredAndSortedResults = useMemo(() => {
    let final = results.filter(r => {
      // API returns tags like ["openalex", "scholarly-discovery", ...]
      const hasActiveSource = Array.from(activeSources).some(src => r.tags?.includes(src));
      const matchesOA = showOnlyOA ? r.openAccess === true : true;
      return hasActiveSource && matchesOA;
    });

    if (sortBy === "year_desc") {
      final = final.sort((a, b) => parseInt(b.publishedAt || "0") - parseInt(a.publishedAt || "0"));
    } else if (sortBy === "year_asc") {
      final = final.sort((a, b) => parseInt(a.publishedAt || "0") - parseInt(b.publishedAt || "0"));
    }
    // relevance keeps original array order from the API which is already sorted by score

    return final;
  }, [results, activeSources, sortBy, showOnlyOA]);

  return (
    <div style={{ paddingTop: "var(--navbar-height)", minHeight: "100vh", backgroundColor: "var(--bg-base)" }}>
      {/* HEADER SECTION */}
      <div className="container" style={{ padding: "var(--space-xl) var(--space-lg)", paddingBottom: "var(--space-md)" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <Database size={32} style={{ color: "var(--accent-cta)" }} />
            <div>
              <h1 style={{ fontSize: "var(--font-h2)", margin: 0 }}>
                <span className="text-gradient">Evidence Board</span>
                <span style={{ fontSize: "var(--font-h3)", color: "var(--text-muted)", marginLeft: 12, fontWeight: "normal" }}>
                  منصة الأدلة العلمية
                </span>
              </h1>
              <p style={{ color: "var(--text-muted)", margin: "4px 0 0 0", fontSize: "1.05rem" }}>
                Scientific consensus aggregator querying 7 global open-access repositories to verify claims.
              </p>
            </div>
          </div>
          
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 8 }}>
            <Link href="/angry-debunkers" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 16px", backgroundColor: "rgba(255,100,100,0.1)", color: "var(--accent-danger)", borderRadius: "var(--radius-md)", textDecoration: "none", fontWeight: 500, border: "1px solid rgba(255,100,100,0.2)" }}>
              <ShieldAlert size={16} /> Analyze a specific claim <ArrowRight size={16} />
            </Link>
            <Link href="/fight-back" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 16px", backgroundColor: "rgba(100,200,255,0.1)", color: "var(--accent-primary)", borderRadius: "var(--radius-md)", textDecoration: "none", fontWeight: 500, border: "1px solid rgba(100,200,255,0.2)" }}>
              <ShieldAlert size={16} /> Defense arsenal <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: "0 var(--space-lg) var(--space-2xl) var(--space-lg)", display: "flex", gap: 32, flexDirection: "column" }}>

        {/* HOW-TO GUIDE */}
        <ToolGuide
          titleEn="How to use the Evidence Board"
          titleAr="كيفية استخدام منصة الأدلة"
          accent="#3b82f6"
          lang="en"
          whoBenefits={{
            en: "Before you forward a 'miracle cure' or a scary health claim from WhatsApp or Facebook, paste its topic here. The tool ranks how STRONG the real evidence behind it is — from a single person's story (anecdote, the weakest) up to randomized trials and Cochrane systematic reviews (the strongest). It pulls live results from 7 global research databases so you can see what scientists actually found, not what a viral post claims.",
            ar: "قبل أن تعيد إرسال «علاج معجزة» أو ادعاء صحي مخيف من واتساب أو فيسبوك، اكتب موضوعه هنا. تُرتّب الأداة مدى قوة الدليل الحقيقي وراءه — من قصة شخص واحد (حكاية فردية، الأضعف) وصولًا إلى التجارب العشوائية المضبوطة ومراجعات كوكرين المنهجية (الأقوى). تسحب نتائج حية من 7 قواعد بيانات بحثية عالمية لترى ما توصّل إليه العلماء فعلًا، لا ما يدّعيه منشور منتشر.",
          }}
          steps={[
            {
              en: "Type the claim's topic in the search box (e.g. 'garlic cancer', 'intermittent fasting diabetes') — keep it to a few keywords, not a whole sentence.",
              ar: "اكتب موضوع الادعاء في خانة البحث (مثل «الثوم والسرطان» أو «الصيام المتقطع والسكري») — اجعلها بضع كلمات مفتاحية، لا جملة كاملة.",
            },
            {
              en: "Press Search. The tool queries 7 open databases and lists real papers, newest or most relevant first.",
              ar: "اضغط بحث. تستعلم الأداة من 7 قواعد بيانات مفتوحة وتعرض أبحاثًا حقيقية، الأحدث أو الأكثر صلة أولًا.",
            },
            {
              en: "Read the Trust Band on each result: Band A = high-quality peer-reviewed evidence, Band C = weak/unverified. The claim is only as strong as the BEST evidence behind it.",
              ar: "اقرأ نطاق الثقة على كل نتيجة: النطاق A = دليل عالي الجودة محكّم، النطاق C = ضعيف/غير مؤكد. قوة الادعاء بقوة أفضل دليل وراءه.",
            },
            {
              en: "Open 'View Full Text' to read the source yourself. If the only 'evidence' for a viral cure is anecdotes and no trials show up, that is your answer.",
              ar: "افتح «النص الكامل» لتقرأ المصدر بنفسك. إذا كان «الدليل» الوحيد لعلاج منتشر مجرد حكايات ولا تظهر أي تجارب، فهذه هي إجابتك.",
            },
          ]}
          scenarios={[
            { label: "'Garlic cures cancer' WhatsApp claim", labelAr: "ادعاء «الثوم يعالج السرطان»", input: "garlic cancer treatment", tag: "health" },
            { label: "'Lemon & baking soda beats chemo'", labelAr: "«الليمون وبيكربونات الصودا أقوى من الكيماوي»", input: "sodium bicarbonate lemon cancer therapy", tag: "health" },
            { label: "'Insulin is a lie, fasting cures diabetes'", labelAr: "«الإنسولين كذبة، الصيام يشفي السكري»", input: "intermittent fasting type 2 diabetes", tag: "health" },
            { label: "'Vaccines cause autism' forward", labelAr: "رسالة «اللقاحات تسبب التوحد»", input: "vaccines autism MMR", tag: "vaccines" },
          ]}
          onTry={(input) => handleSearch(undefined, input)}
        />

        {/* SEARCH SECTION */}
        <div style={{ backgroundColor: "var(--bg-card)", padding: 24, borderRadius: "var(--radius-lg)", border: "1px solid var(--border)", boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
          <form onSubmit={handleSearch} style={{ display: "flex", gap: 12, marginBottom: 16 }}>
            <div style={{ position: "relative", flex: 1 }}>
              <Search size={22} style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
              <input 
                type="text" 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search scientific evidence (e.g. mRNA vaccines, climate change)..."
                style={{
                  width: "100%",
                  padding: "16px 16px 16px 52px",
                  fontSize: "1.1rem",
                  backgroundColor: "var(--bg-base)",
                  border: "2px solid var(--border)",
                  borderRadius: "var(--radius-md)",
                  color: "var(--text-base)",
                  transition: "border-color 0.2s"
                }}
              />
            </div>
            <button 
              type="submit" 
              disabled={loading || !query.trim()}
              style={{
                padding: "0 32px",
                backgroundColor: "var(--accent-cta)",
                color: "#fff",
                border: "none",
                borderRadius: "var(--radius-md)",
                fontWeight: 600,
                fontSize: "1.05rem",
                cursor: (loading || !query.trim()) ? "not-allowed" : "pointer",
                opacity: (loading || !query.trim()) ? 0.7 : 1,
                display: "flex",
                alignItems: "center",
                gap: 8,
                transition: "opacity 0.2s, transform 0.1s"
              }}
            >
              {loading ? <RefreshCw className="spin" size={20} /> : <Search size={20} />}
              {loading ? "Searching..." : "Search"}
            </button>
          </form>

          {/* Quick Suggestions */}
          {!hasSearched && (
            <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap", marginTop: 24 }}>
              <span style={{ fontSize: "0.9rem", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: 6 }}>
                <Clock size={16} /> Suggestions:
              </span>
              {SUGGESTED_SEARCHES.map(s => (
                <button
                  key={s}
                  onClick={() => handleSearch(undefined, s)}
                  style={{
                    padding: "6px 12px",
                    backgroundColor: "transparent",
                    border: "1px solid var(--border)",
                    borderRadius: 20,
                    fontSize: "0.85rem",
                    color: "var(--text-base)",
                    cursor: "pointer",
                    transition: "background-color 0.2s"
                  }}
                  className="hover-bg-base"
                >
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: 32, alignItems: "start" }}>
          
          {/* SIDEBAR FILTERS */}
          <aside style={{ backgroundColor: "var(--bg-card)", padding: 24, borderRadius: "var(--radius-lg)", border: "1px solid var(--border)", position: "sticky", top: 100 }}>
            <div style={{ marginBottom: 32 }}>
              <h3 style={{ fontSize: "0.95rem", color: "var(--text-base)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 16, display: "flex", alignItems: "center", gap: 8, fontWeight: 600 }}>
                <Filter size={18} style={{ color: "var(--accent-cta)" }}/> Active Sources
              </h3>
              
              <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
                <button onClick={selectAllSources} style={{ flex: 1, padding: "4px", fontSize: "0.8rem", background: "var(--bg-base)", border: "1px solid var(--border)", borderRadius: 4, cursor: "pointer" }}>Select All</button>
                <button onClick={clearAllSources} style={{ flex: 1, padding: "4px", fontSize: "0.8rem", background: "var(--bg-base)", border: "1px solid var(--border)", borderRadius: 4, cursor: "pointer" }}>Clear All</button>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {SOURCE_OPTIONS.map(src => (
                  <label key={src.id} style={{ display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer", userSelect: "none" }}>
                    <input 
                      type="checkbox" 
                      checked={activeSources.has(src.id)}
                      onChange={() => toggleSource(src.id)}
                      style={{ accentColor: "var(--accent-cta)", marginTop: 4, width: 16, height: 16 }}
                    />
                    <div>
                      <div style={{ fontSize: "0.95rem", fontWeight: 500, color: "var(--text-base)" }}>{src.label}</div>
                      <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginTop: 2 }}>{src.desc}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: 32 }}>
              <h3 style={{ fontSize: "0.95rem", color: "var(--text-base)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 16, fontWeight: 600 }}>Options</h3>
              
              <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", userSelect: "none", marginBottom: 16 }}>
                <input 
                  type="checkbox" 
                  checked={showOnlyOA}
                  onChange={(e) => setShowOnlyOA(e.target.checked)}
                  style={{ accentColor: "var(--accent-cta)", width: 16, height: 16 }}
                />
                <span style={{ fontSize: "0.95rem", color: "var(--text-base)" }}>Only Open Access (OA)</span>
              </label>

              <label style={{ display: "block", fontSize: "0.95rem", color: "var(--text-base)" }}>
                Sort Results:
                <select 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  style={{
                    width: "100%",
                    marginTop: 8,
                    padding: "10px 12px",
                    backgroundColor: "var(--bg-base)",
                    border: "1px solid var(--border)",
                    borderRadius: "var(--radius-sm)",
                    color: "var(--text-base)",
                    cursor: "pointer"
                  }}
                >
                  <option value="relevance">Relevance (Default)</option>
                  <option value="year_desc">Year (Newest First)</option>
                  <option value="year_asc">Year (Oldest First)</option>
                </select>
              </label>
            </div>

            <div style={{ padding: 16, backgroundColor: "var(--bg-base)", borderRadius: "var(--radius-md)", border: "1px solid var(--border)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, color: "var(--accent-primary)", marginBottom: 8, fontWeight: 600, fontSize: "0.9rem" }}>
                <Info size={16} /> Trust Bands
              </div>
              <ul style={{ margin: 0, paddingLeft: 20, fontSize: "0.8rem", color: "var(--text-muted)", display: "flex", flexDirection: "column", gap: 6 }}>
                <li><strong style={{ color: "var(--accent-success)" }}>Band A:</strong> High trust. Peer-reviewed, open access, or highly cited.</li>
                <li><strong style={{ color: "var(--accent-warning)" }}>Band B:</strong> Moderate. Preprints or moderately cited works.</li>
                <li><strong style={{ color: "var(--accent-danger)" }}>Band C:</strong> Caution. Unverified full-text or low citations.</li>
              </ul>
            </div>
          </aside>

          {/* MAIN CONTENT AREA */}
          <main>
            {loading && (
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div style={{ padding: 24, backgroundColor: "var(--bg-card)", borderRadius: "var(--radius-md)", border: "1px solid var(--border)", display: "flex", gap: 16, alignItems: "center" }}>
                  <RefreshCw className="spin" size={24} style={{ color: "var(--accent-cta)" }}/>
                  <span style={{ fontSize: "1.1rem", color: "var(--text-base)" }}>Interrogating global databases...</span>
                </div>
                {[1, 2, 3, 4].map(i => (
                  <div key={i} style={{ height: 180, backgroundColor: "var(--bg-card)", borderRadius: "var(--radius-md)", border: "1px solid var(--border)", animation: "pulse 1.5s infinite ease-in-out" }} />
                ))}
              </div>
            )}

            {!loading && error && (
              <div style={{ padding: "48px 32px", textAlign: "center", backgroundColor: "rgba(255,50,50,0.05)", border: "1px solid var(--accent-danger)", borderRadius: "var(--radius-md)", color: "var(--accent-danger)" }}>
                <AlertTriangle size={64} style={{ margin: "0 auto 24px" }} />
                <h3 style={{ fontSize: "1.5rem", marginBottom: 12 }}>Search Failed</h3>
                <p style={{ fontSize: "1.1rem", maxWidth: 500, margin: "0 auto 24px" }}>{error}</p>
                <button 
                  onClick={() => handleSearch()}
                  style={{ padding: "12px 32px", backgroundColor: "var(--accent-danger)", color: "#fff", border: "none", borderRadius: "var(--radius-md)", cursor: "pointer", fontSize: "1.1rem", fontWeight: 600 }}
                >
                  Retry Search
                </button>
              </div>
            )}

            {!loading && !error && hasSearched && filteredAndSortedResults.length === 0 && (
              <div style={{ padding: "64px 24px", textAlign: "center", backgroundColor: "var(--bg-card)", borderRadius: "var(--radius-lg)", border: "2px dashed var(--border)" }}>
                <FileText size={64} style={{ margin: "0 auto 24px", color: "var(--text-muted)", opacity: 0.5 }} />
                <h3 style={{ fontSize: "1.5rem", marginBottom: 12, color: "var(--text-base)" }}>No evidence found</h3>
                <p style={{ color: "var(--text-muted)", fontSize: "1.1rem", maxWidth: 400, margin: "0 auto" }}>
                  We couldn't find any scientific evidence matching your query. Try using broader search terms or enabling more source repositories.
                </p>
              </div>
            )}

            {!loading && !error && filteredAndSortedResults.length > 0 && (
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: 16, borderBottom: "1px solid var(--border)" }}>
                  <h2 style={{ fontSize: "1.2rem", margin: 0, display: "flex", alignItems: "center", gap: 8 }}>
                    <BookOpen size={20} style={{ color: "var(--accent-primary)" }}/> 
                    Search Results <span style={{ color: "var(--text-muted)", fontWeight: "normal", fontSize: "1rem" }}>({filteredAndSortedResults.length})</span>
                  </h2>
                </div>

                {filteredAndSortedResults.map((result) => {
                  let trustColor = "var(--text-muted)";
                  if (result.trustBand === "A") trustColor = "var(--accent-success)";
                  if (result.trustBand === "B") trustColor = "var(--accent-warning)";
                  if (result.trustBand === "C") trustColor = "var(--accent-danger)";

                  return (
                    <div key={result.id} style={{ 
                      padding: 24, 
                      backgroundColor: "var(--bg-card)", 
                      borderRadius: "var(--radius-md)", 
                      border: "1px solid var(--border)", 
                      display: "flex", 
                      flexDirection: "column", 
                      gap: 16,
                      boxShadow: "0 2px 10px rgba(0,0,0,0.02)",
                      transition: "transform 0.2s, box-shadow 0.2s"
                    }}
                    className="result-card"
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 24 }}>
                        <h3 style={{ fontSize: "1.25rem", margin: 0, color: "var(--accent-cta)", lineHeight: 1.4, flex: 1 }}>
                          <a href={result.url} target="_blank" rel="noopener noreferrer" style={{ color: "inherit", textDecoration: "none" }}>
                            {result.title}
                          </a>
                        </h3>
                        
                        <div style={{ display: "flex", gap: 8, flexShrink: 0, flexDirection: "column", alignItems: "flex-end" }}>
                          <span style={{ padding: "6px 12px", backgroundColor: `${trustColor}15`, color: trustColor, border: `1px solid ${trustColor}40`, borderRadius: "var(--radius-sm)", fontSize: "0.8rem", fontWeight: 700, display: "flex", alignItems: "center", gap: 6 }}>
                            {result.trustBand === "A" ? <CheckCircle size={14} /> : null}
                            Band {result.trustBand}
                          </span>
                          
                          {result.openAccess && (
                            <span style={{ padding: "4px 8px", backgroundColor: "rgba(100,200,100,0.1)", color: "var(--accent-success)", border: "1px solid rgba(100,200,100,0.3)", borderRadius: "var(--radius-sm)", fontSize: "0.75rem", fontWeight: 600 }}>
                              Open Access
                            </span>
                          )}
                        </div>
                      </div>

                      <div style={{ fontSize: "0.95rem", color: "var(--text-muted)", display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
                        <span style={{ fontWeight: 600, color: "var(--text-base)" }}>{result.sourceName}</span>
                        <span>•</span>
                        <span>Published: {result.publishedAt}</span>
                      </div>

                      <p style={{ fontSize: "1rem", lineHeight: 1.6, color: "var(--text-base)", margin: 0, backgroundColor: "var(--bg-base)", padding: 16, borderRadius: "var(--radius-sm)", borderLeft: "4px solid var(--border)" }}>
                        {result.summary}
                      </p>

                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 8, paddingTop: 16, borderTop: "1px solid var(--border)" }}>
                        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                          {result.tags?.map(tag => (
                            <span key={tag} style={{ fontSize: "0.75rem", padding: "4px 10px", backgroundColor: "var(--bg-base)", borderRadius: 16, border: "1px solid var(--border)", color: "var(--text-muted)" }}>
                              #{tag}
                            </span>
                          ))}
                        </div>
                        
                        <a href={result.url} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.95rem", color: "var(--accent-primary)", textDecoration: "none", fontWeight: 600, padding: "8px 16px", backgroundColor: "rgba(100,200,255,0.05)", borderRadius: "var(--radius-sm)", border: "1px solid rgba(100,200,255,0.2)" }}>
                          View Full Text <ExternalLink size={16} />
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </main>
        </div>
        
        {/* DISCLAIMER */}
        <div style={{ marginTop: 64, padding: 24, textAlign: "center", borderTop: "1px solid var(--border)", color: "var(--text-muted)", fontSize: "0.9rem", backgroundColor: "var(--bg-card)", borderRadius: "var(--radius-lg)" }}>
          <p style={{ maxWidth: 800, margin: "0 auto", lineHeight: 1.6 }}>
            <strong>Disclaimer:</strong> Evidence aggregation is provided for educational and verification purposes only. It does not constitute medical, legal, or professional advice. The Egyptian Awareness Library algorithms prioritize open-access, peer-reviewed sources but cannot guarantee the validity of every individual paper. Always consult qualified professionals for critical decisions.
          </p>
        </div>

      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes pulse {
          0% { opacity: 0.6; }
          50% { opacity: 0.2; }
          100% { opacity: 0.6; }
        }
        .spin {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .hover-bg-base:hover {
          background-color: var(--bg-card) !important;
          border-color: var(--text-muted) !important;
        }
        .result-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.06) !important;
        }
        @media (max-width: 768px) {
          .container {
            flex-direction: column !important;
          }
          aside {
            position: static !important;
          }
        }
      `}} />
      <PageNavigation currentPath="/evidence" />

      <PageAIChatbot
        pageTitle="Evidence Pyramid — هرم الأدلة"
        pageContext="Egyptian Awareness Library - Evidence Pyramid: Interactive visualization of the hierarchy of scientific evidence, from anecdotal claims at the base to systematic reviews and meta-analyses at the top. Includes 7 academic databases with live search."
        systemPrompt={`You are the EAL Evidence Quality AI. You help users understand and navigate the scientific evidence hierarchy.

EVIDENCE PYRAMID (bottom to top):
1. ANECDOTE / CASE REPORT: "My uncle was cured by X" — N=1, no controls
2. CASE SERIES: Several similar cases, no comparison group
3. CROSS-SECTIONAL: Snapshot in time, correlation only
4. COHORT STUDY: Follow groups over time, can show association
5. CASE-CONTROL: Compare cases to matched controls, look back in time
6. RCT (Randomized Controlled Trial): Gold standard for causation
7. SYSTEMATIC REVIEW + META-ANALYSIS: Combines all RCTs, highest evidence

KEY CONCEPTS:
- Correlation ≠ Causation (Bradford Hill criteria for causation)
- Confidence Interval: the range of uncertainty
- Effect Size: practical significance vs statistical significance
- NNT (Number Needed to Treat): how many patients to treat to see 1 benefit
- GRADE framework: evidence quality rating system

EGYPTIAN CONTEXT:
- Arabic-language research: PubMed Arabic papers, EBSCO Arabic
- Egyptian Journal of Internal Medicine, Journal of the Egyptian Society of Cardiology
- Al-Azhar Medical Journal (peer-reviewed, ISSN: 0258-0586)
- Always ask: Is this replicated in Egyptian/MENA populations?`}
        suggestedQuestions={[
          'ما هو أعلى مستوى من هرم الأدلة؟',
          'ما الفرق بين الارتباط والسببية؟',
          'What is a systematic review and why does it matter?',
          'How do I read a scientific paper critically?',
        ]}
        accentColor="#3b82f6"
        accentColorRgb="59,130,246"
      />
    </div>
  );
}
