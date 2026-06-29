"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Info, Filter, Network, Maximize2, ShieldAlert, CheckCircle, HelpCircle } from "lucide-react";
import * as d3 from "d3";
import { ALL_KEYHUNTER_ENTRIES } from "@/data/keyhunter";
import { PageNavigation } from '@/components/shared/page-navigation';
import { useRTL } from "@/components/shared/rtl-provider";

// Resolve a CSS custom property to its computed value (so D3 SVG can re-theme).
function cssVar(name: string, fallback: string): string {
  if (typeof window === "undefined") return fallback;
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return v || fallback;
}

// Define D3 Node and Link Types
interface GraphNode extends d3.SimulationNodeDatum {
  id: string;
  type: string;
  label: string;
  status: string;
  group: string;
  entry?: any;
}

interface GraphLink extends d3.SimulationLinkDatum<GraphNode> {
  source: string | GraphNode;
  target: string | GraphNode;
}

export default function KnowledgeGraphPage() {
  const { isRTL } = useRTL();
  const [activeNodeId, setActiveNodeId] = useState<string | null>(null);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const [nodes, setNodes] = useState<GraphNode[]>([]);
  const [links, setLinks] = useState<GraphLink[]>([]);
  // Bumped whenever the global theme (data-theme on <html>) changes, so D3 re-themes.
  const [themeVersion, setThemeVersion] = useState(0);

  useEffect(() => {
    const obs = new MutationObserver(() => setThemeVersion(v => v + 1));
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme", "class"] });
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    // Generate graph from KEYHUNTER entries
    const generatedNodes: GraphNode[] = [];
    const generatedLinks: GraphLink[] = [];

    // Central Node
    generatedNodes.push({ id: "ROOT", type: "root", label: "KEYHUNTER Nexus", status: "verified", group: "root" });

    // MVP Hubs
    ["deepreal", "mental-health", "religion-hub"].forEach(mvp => {
      generatedNodes.push({ id: `HUB_${mvp}`, type: "hub", label: mvp.toUpperCase().replace("-", " "), status: "neutral", group: mvp });
      generatedLinks.push({ source: "ROOT", target: `HUB_${mvp}` });
    });

    ALL_KEYHUNTER_ENTRIES.forEach(entry => {
      // Entry Node
      generatedNodes.push({
        id: entry.id,
        type: "topic",
        label: entry.topic,
        status: "verified",
        group: entry.mvp,
        entry: entry
      });
      generatedLinks.push({ source: `HUB_${entry.mvp}`, target: entry.id });
    });

    setNodes(generatedNodes);
    setLinks(generatedLinks);
  }, []);

  const filteredNodes = nodes.filter(
    (n) =>
      (filter === "all" || n.type === filter || (filter === "claim" && n.type === "topic")) &&
      n.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    if (!svgRef.current || !containerRef.current || nodes.length === 0) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    // Setup zoom
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.1, 4])
      .on("zoom", (e) => {
        g.attr("transform", e.transform);
      });
    svg.call(zoom);

    const g = svg.append("g");

    // Filtered links
    const visibleNodeIds = new Set(filteredNodes.map(n => n.id));
    const activeLinks = links.filter(l => {
      const srcId = typeof l.source === 'string' ? l.source : (l.source as GraphNode).id;
      const tgtId = typeof l.target === 'string' ? l.target : (l.target as GraphNode).id;
      return visibleNodeIds.has(srcId) && visibleNodeIds.has(tgtId);
    });

    // Deep copy for simulation
    const simNodes = filteredNodes.map(d => ({ ...d }));
    const simLinks = activeLinks.map(d => ({ ...d }));

    const simulation = d3.forceSimulation<GraphNode>(simNodes)
      .force("link", d3.forceLink<GraphNode, GraphLink>(simLinks).id(d => d.id).distance(80))
      .force("charge", d3.forceManyBody().strength(-80))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collision", d3.forceCollide().radius(25))
      .alphaDecay(0.08)
      .velocityDecay(0.5)
      .alphaMin(0.01);

    // Resolve theme colors so the D3 graph re-themes with the global switch.
    const colorBorder = cssVar("--border-secondary", "#4b5563");
    const colorRoot = cssVar("--accent-purple", "#E040FB");
    const colorDeepreal = cssVar("--accent-deepreal", "#00BCD4");
    const colorMental = cssVar("--accent-mentalhealth", "#8BC34A");
    const colorReligion = cssVar("--accent-religionhub", "#FF9800");
    const colorNodeStroke = cssVar("--bg-page", "#fff");
    const colorText = cssVar("--text-primary", "#F5EEF8");

    const link = g.append("g")
      .attr("stroke", colorBorder)
      .attr("stroke-opacity", 0.6)
      .selectAll("line")
      .data(simLinks)
      .join("line")
      .attr("stroke-width", 2);

    const nodeGroup = g.append("g")
      .selectAll("g")
      .data(simNodes)
      .join("g")
      .call(d3.drag<any, any>()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended)
      );

    nodeGroup.append("circle")
      .attr("r", d => d.type === 'root' ? 24 : d.type === 'hub' ? 16 : 10)
      .attr("fill", d => {
        if (d.type === 'root') return colorRoot;
        if (d.group === 'deepreal') return colorDeepreal;
        if (d.group === 'mental-health') return colorMental;
        return colorReligion;
      })
      .attr("stroke", colorNodeStroke)
      .attr("stroke-width", 2)
      .style("cursor", "pointer")
      .on("click", (event, d) => setActiveNodeId(d.id));

    nodeGroup.append("text")
      .text(d => d.label)
      .attr("x", 12)
      .attr("y", 4)
      .attr("fill", colorText)
      .style("font-size", d => d.type === 'root' ? "14px" : "10px")
      .style("pointer-events", "none");

    simulation.on("tick", () => {
      link
        .attr("x1", d => (d.source as GraphNode).x!)
        .attr("y1", d => (d.source as GraphNode).y!)
        .attr("x2", d => (d.target as GraphNode).x!)
        .attr("y2", d => (d.target as GraphNode).y!);

      nodeGroup.attr("transform", d => `translate(${d.x},${d.y})`);
    });

    function dragstarted(event: any, d: GraphNode) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event: any, d: GraphNode) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(event: any, d: GraphNode) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

    return () => {
      simulation.stop();
    };
  }, [filteredNodes.length, links.length, filter, searchTerm, themeVersion]);

  const activeNodeData = nodes.find(n => n.id === activeNodeId);

  return (
    <div
      className="min-h-screen pt-24 pb-12 px-4 font-sans"
      style={{ background: "var(--bg-page)", color: "var(--text-primary)" }}
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="max-w-[1600px] mx-auto">
        <header className="mb-8">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black tracking-tight mb-4 flex items-center gap-3"
            style={{ color: "var(--text-primary)" }}
          >
            <Network className="w-10 h-10" style={{ color: "var(--accent-blue)" }} />
            {isRTL ? "شبكة كي-هنتر المعرفية" : "KEYHUNTER Knowledge Graph"}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg max-w-2xl"
            style={{ color: "var(--text-secondary)" }}
          >
            {isRTL
              ? "استكشف الشبكة المترابطة لمدخلات كي-هنتر الـ42. اكتشف المصطلحات المتخصصة، والدلالات الخفية، ونماذج التفنيد المنظمة."
              : "Explore the interconnected web of the 42 KeyHunter entries. Discover expert terminology, hidden semantics, and structured debunking models."}
          </motion.p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6 flex flex-col max-h-[800px]">
            <div
              className="backdrop-blur-md p-6 rounded-2xl shrink-0"
              style={{ background: "var(--bg-card)", border: "1px solid var(--border-primary)" }}
            >
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Search className="w-5 h-5" />
                {isRTL ? "بحث وفلترة" : "Search & Filter"}
              </h3>

              <div className="relative mb-6">
                <Search
                  className={`absolute top-1/2 transform -translate-y-1/2 w-4 h-4 ${isRTL ? "right-3" : "left-3"}`}
                  style={{ color: "var(--text-muted)" }}
                />
                <input
                  type="text"
                  placeholder={isRTL ? "ابحث بالكلمات المفتاحية..." : "Search keywords..."}
                  className={`w-full rounded-xl py-2 pr-4 text-sm focus:outline-none focus:ring-2 transition-all ${isRTL ? "pr-10 pl-4 text-right" : "pl-10"}`}
                  style={{
                    background: "var(--bg-elevated)",
                    border: "1px solid var(--border-secondary)",
                    color: "var(--text-primary)",
                  }}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium mb-2 flex items-center gap-2" style={{ color: "var(--text-secondary)" }}>
                  <Filter className="w-4 h-4" />
                  {isRTL ? "أنواع العُقد" : "Node Types"}
                </h4>
                {["all", "topic", "hub", "root"].map((type) => {
                  const labels: Record<string, string> = {
                    all: isRTL ? "الكل" : "ALL",
                    topic: isRTL ? "موضوع" : "TOPIC",
                    hub: isRTL ? "محور" : "HUB",
                    root: isRTL ? "الجذر" : "ROOT",
                  };
                  const isActive = filter === type;
                  return (
                    <button
                      key={type}
                      onClick={() => setFilter(type)}
                      className={`w-full px-4 py-2 rounded-lg text-sm transition-all ${isRTL ? "text-right" : "text-left"} ${isActive ? "font-medium" : ""}`}
                      style={{
                        background: isActive ? "var(--accent-cta)" : "var(--bg-elevated)",
                        color: isActive ? "#fff" : "var(--text-secondary)",
                      }}
                    >
                      {labels[type]}
                    </button>
                  );
                })}
              </div>
            </div>

            <AnimatePresence>
              {activeNodeData && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="p-6 rounded-2xl shadow-xl flex-1 overflow-y-auto"
                  style={{ background: "var(--bg-card)", border: "1px solid var(--border-secondary)" }}
                >
                  <div
                    className="flex justify-between items-start mb-4 sticky top-0 pt-2 pb-2 backdrop-blur z-10"
                    style={{ background: "var(--bg-card)" }}
                  >
                    <h3 className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>
                      {isRTL ? "عُقدة كي-هنتر" : "KEYHUNTER Node"}
                    </h3>
                    <button
                      onClick={() => setActiveNodeId(null)}
                      style={{ color: "var(--text-secondary)" }}
                    >
                      &times;
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div
                      className="p-4 rounded-xl"
                      style={{ border: "1px solid var(--accent-blue)", background: "var(--bg-elevated)" }}
                    >
                      <p className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>{activeNodeData.label}</p>
                      <p className="text-sm uppercase tracking-widest mt-1" style={{ color: "var(--text-muted)" }}>
                        {isRTL
                          ? `النوع: ${activeNodeData.type} | المجموعة: ${activeNodeData.group}`
                          : `Type: ${activeNodeData.type} | Group: ${activeNodeData.group}`}
                      </p>
                    </div>

                    {activeNodeData.entry && (
                      <div className="space-y-4 mt-6 text-sm" style={{ color: "var(--text-secondary)" }}>
                        <div>
                          <strong className="block mb-1" style={{ color: "var(--accent-blue)" }}>
                            {isRTL ? "الطبقة 1: الكلمات الأساسية" : "Layer 1: Core Keywords"}
                          </strong>
                          <ul className={`list-disc opacity-90 ${isRTL ? "pr-5" : "pl-5"}`}>
                            {activeNodeData.entry.coreKeywords?.map((k: string, i: number) => <li key={i}>{k}</li>)}
                          </ul>
                        </div>
                        <div>
                          <strong className="block mb-1" style={{ color: "var(--accent-purple)" }}>
                            {isRTL ? "الطبقة 2: كلمات الخبراء" : "Layer 2: Expert Keywords"}
                          </strong>
                          <ul className={`list-disc opacity-90 ${isRTL ? "pr-5" : "pl-5"}`}>
                            {activeNodeData.entry.expertKeywords?.map((k: string, i: number) => <li key={i}>{k}</li>)}
                          </ul>
                        </div>
                        <div>
                          <strong className="block mb-1" style={{ color: "var(--accent-red)" }}>
                            {isRTL ? "الطبقة 3: المصطلحات الخفية" : "Layer 3: Hidden Terms"}
                          </strong>
                          <ul className={`list-disc opacity-90 ${isRTL ? "pr-5" : "pl-5"}`}>
                            {activeNodeData.entry.hiddenTerms?.map((k: string, i: number) => <li key={i}>{k}</li>)}
                          </ul>
                        </div>
                        <div>
                          <strong className="block mb-1" style={{ color: "var(--accent-amber)" }}>
                            {isRTL ? "الطبقة 4: عبارات التهديد" : "Layer 4: Threat Phrases"}
                          </strong>
                          <ul className={`list-disc opacity-90 ${isRTL ? "pr-5" : "pl-5"}`}>
                            {activeNodeData.entry.threatKeywords?.map((k: string, i: number) => <li key={i}>{k}</li>)}
                          </ul>
                        </div>
                        {activeNodeData.entry.source && (
                          <div className="mt-4 pt-4 text-xs" style={{ borderTop: "1px solid var(--border-secondary)", color: "var(--text-muted)" }}>
                            <strong>{isRTL ? "المصدر:" : "Source:"}</strong> {activeNodeData.entry.source}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Graph Area */}
          <div
            className="lg:col-span-3 rounded-3xl relative overflow-hidden flex items-center justify-center min-h-[600px] h-[80vh]"
            ref={containerRef}
            style={{
              border: "1px solid var(--border-primary)",
              background: "var(--bg-elevated)",
              backgroundImage: 'radial-gradient(circle at 50% 50%, var(--bg-elevated) 0%, var(--bg-page) 100%)',
            }}
          >
            <div className="absolute top-4 right-4 z-10 flex gap-2">
              <button 
                onClick={() => {
                  if(svgRef.current && containerRef.current) {
                    const svg = d3.select(svgRef.current);
                    svg.transition().duration(750).call(
                      d3.zoom<SVGSVGElement, unknown>().transform, 
                      d3.zoomIdentity,
                      d3.zoomTransform(svg.node()!).invert([containerRef.current.clientWidth / 2, containerRef.current.clientHeight / 2])
                    );
                  }
                }}
                className="p-2 rounded-lg transition-colors"
                style={{ background: "var(--bg-card)", border: "1px solid var(--border-secondary)" }}
                title={isRTL ? "إعادة ضبط التكبير" : "Reset zoom"}
              >
                <Maximize2 className="w-5 h-5" style={{ color: "var(--text-secondary)" }} />
              </button>
            </div>

            <svg ref={svgRef} className="absolute inset-0 w-full h-full cursor-move" />

            {/* Empty State */}
            {filteredNodes.length === 0 && (
              <div
                className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-20"
                style={{ color: "var(--text-muted)" }}
              >
                <Search className="w-12 h-12 mb-4 opacity-50" />
                <p>{isRTL ? "لا توجد عُقد مطابقة لمعايير البحث" : "No nodes found matching your criteria"}</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <PageNavigation currentPath="/knowledge-graph" />
    </div>
  );
}
