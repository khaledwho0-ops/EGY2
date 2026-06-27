"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Info, Filter, Network, Maximize2, ShieldAlert, CheckCircle, HelpCircle } from "lucide-react";
import * as d3 from "d3";
import { ALL_KEYHUNTER_ENTRIES } from "@/data/keyhunter";
import { PageNavigation } from '@/components/shared/page-navigation';

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
  const [activeNodeId, setActiveNodeId] = useState<string | null>(null);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const [nodes, setNodes] = useState<GraphNode[]>([]);
  const [links, setLinks] = useState<GraphLink[]>([]);

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

    const link = g.append("g")
      .attr("stroke", "#4b5563")
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
        if (d.type === 'root') return "#E040FB";
        if (d.group === 'deepreal') return "#00BCD4";
        if (d.group === 'mental-health') return "#8BC34A";
        return "#FF9800";
      })
      .attr("stroke", "#fff")
      .attr("stroke-width", 2)
      .style("cursor", "pointer")
      .on("click", (event, d) => setActiveNodeId(d.id));

    nodeGroup.append("text")
      .text(d => d.label)
      .attr("x", 12)
      .attr("y", 4)
      .attr("fill", "#F5EEF8")
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
  }, [filteredNodes.length, links.length, filter, searchTerm]);

  const activeNodeData = nodes.find(n => n.id === activeNodeId);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pt-24 pb-12 px-4 font-sans">
      <div className="max-w-[1600px] mx-auto">
        <header className="mb-8">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black tracking-tight mb-4 flex items-center gap-3"
            style={{ color: "#F5EEF8" }}
          >
            <Network className="w-10 h-10 text-blue-500" />
            KEYHUNTER Knowledge Graph
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg max-w-2xl"
          >
            Explore the interconnected web of the 42 KeyHunter entries.
            Discover expert terminology, hidden semantics, and structured debunking models.
          </motion.p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6 flex flex-col max-h-[800px]">
            <div className="bg-gray-900/50 backdrop-blur-md p-6 rounded-2xl border border-gray-800 shrink-0">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Search className="w-5 h-5" />
                Search & Filter
              </h3>
              
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search keywords..."
                  className="w-full bg-gray-800 border border-gray-700 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-white"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium text-gray-400 mb-2 flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  Node Types
                </h4>
                {["all", "topic", "hub", "root"].map((type) => (
                  <button
                    key={type}
                    onClick={() => setFilter(type)}
                    className={`w-full text-left px-4 py-2 rounded-lg text-sm transition-all ${
                      filter === type
                        ? "bg-blue-600 text-white font-medium"
                        : "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white"
                    }`}
                  >
                    {type.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            <AnimatePresence>
              {activeNodeData && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-gray-900/80 p-6 rounded-2xl border border-gray-700 shadow-xl flex-1 overflow-y-auto"
                >
                  <div className="flex justify-between items-start mb-4 sticky top-0 bg-gray-900/90 pt-2 pb-2 backdrop-blur z-10">
                    <h3 className="text-lg font-bold text-white">KEYHUNTER Node</h3>
                    <button
                      onClick={() => setActiveNodeId(null)}
                      className="text-gray-400 hover:text-white"
                    >
                      &times;
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="p-4 rounded-xl border border-blue-500 bg-blue-500/10">
                      <p className="text-xl font-bold text-white">{activeNodeData.label}</p>
                      <p className="text-sm text-gray-400 uppercase tracking-widest mt-1">
                        Type: {activeNodeData.type} | Group: {activeNodeData.group}
                      </p>
                    </div>
                    
                    {activeNodeData.entry && (
                      <div className="space-y-4 mt-6 text-sm text-gray-300">
                        <div>
                          <strong className="text-blue-400 block mb-1">Layer 1: Core Keywords</strong>
                          <ul className="list-disc pl-5 opacity-90">
                            {activeNodeData.entry.coreKeywords?.map((k: string, i: number) => <li key={i}>{k}</li>)}
                          </ul>
                        </div>
                        <div>
                          <strong className="text-purple-400 block mb-1">Layer 2: Expert Keywords</strong>
                          <ul className="list-disc pl-5 opacity-90">
                            {activeNodeData.entry.expertKeywords?.map((k: string, i: number) => <li key={i}>{k}</li>)}
                          </ul>
                        </div>
                        <div>
                          <strong className="text-red-400 block mb-1">Layer 3: Hidden Terms</strong>
                          <ul className="list-disc pl-5 opacity-90">
                            {activeNodeData.entry.hiddenTerms?.map((k: string, i: number) => <li key={i}>{k}</li>)}
                          </ul>
                        </div>
                        <div>
                          <strong className="text-yellow-400 block mb-1">Layer 4: Threat Phrases</strong>
                          <ul className="list-disc pl-5 opacity-90">
                            {activeNodeData.entry.threatKeywords?.map((k: string, i: number) => <li key={i}>{k}</li>)}
                          </ul>
                        </div>
                        {activeNodeData.entry.source && (
                          <div className="mt-4 pt-4 border-t border-gray-700 text-xs text-gray-500">
                            <strong>Source:</strong> {activeNodeData.entry.source}
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
            className="lg:col-span-3 bg-[#05010A] rounded-3xl border border-gray-800 relative overflow-hidden flex items-center justify-center min-h-[600px] h-[80vh]" 
            ref={containerRef}
            style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, #1A0F24 0%, #05010A 100%)' }}
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
                className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors border border-gray-700"
              >
                <Maximize2 className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            
            <svg ref={svgRef} className="absolute inset-0 w-full h-full cursor-move" />

            {/* Empty State */}
            {filteredNodes.length === 0 && (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500 pointer-events-none z-20">
                <Search className="w-12 h-12 mb-4 opacity-50" />
                <p>No nodes found matching your criteria</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <PageNavigation currentPath="/knowledge-graph" />
    </div>
  );
}
