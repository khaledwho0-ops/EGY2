"use client";

import React from "react";
import { motion } from "framer-motion";
import { Award, BookOpen, Building2, Newspaper, Database, AlertOctagon } from "lucide-react";

const tiers = [
  {
    level: "TIER S",
    title: "Living Authoritative Bodies",
    desc: "WHO • Cochrane • UNESCO • IPCC • IAU • Al-Azhar Observatory & Dar al-Iftāʾ al-Miṣriyya • Vatican Dicasteries • National Academies • IFCN-signatory fact-checkers",
    icon: Award,
    color: "from-amber-400 to-yellow-600",
    bg: "bg-amber-950/20",
    border: "border-amber-500/30",
    width: "w-[90%] md:w-[60%]"
  },
  {
    level: "TIER 1",
    title: "Peer-Reviewed Primary Evidence (with GRADE)",
    desc: "Cochrane Systematic Reviews → Meta-analyses → RCTs → Cohorts. (e.g., NEJM, Lancet, Nature, Science, JAMA)",
    icon: BookOpen,
    color: "from-emerald-400 to-emerald-600",
    bg: "bg-emerald-950/20",
    border: "border-emerald-500/30",
    width: "w-[95%] md:w-[70%]"
  },
  {
    level: "TIER 2",
    title: "Credentialed Secondary",
    desc: "Government health agencies (CDC, ECDC, MoH Egypt). University medical centers. Classical religious commentaries with established chains (Tabari, Qurtubi, Bukhari/Muslim with grading).",
    icon: Building2,
    color: "from-cyan-400 to-cyan-600",
    bg: "bg-cyan-950/20",
    border: "border-cyan-500/30",
    width: "w-[100%] md:w-[80%]"
  },
  {
    level: "TIER 3",
    title: "Quality Journalism Under Editorial Code",
    desc: "Reuters • AP • BBC (with caveats) • Peer-reviewed history journals. Outlets with public corrections policy + named editors.",
    icon: Newspaper,
    color: "from-blue-400 to-blue-600",
    bg: "bg-blue-950/20",
    border: "border-blue-500/30",
    width: "w-[100%] md:w-[90%]"
  },
  {
    level: "TIER 4",
    title: "Aggregators / Encyclopedias",
    desc: "Wikipedia as JUMP-OFF only — read its CITATIONS, not its text.",
    icon: Database,
    color: "from-slate-400 to-slate-600",
    bg: "bg-slate-900/50",
    border: "border-slate-700",
    width: "w-full"
  },
  {
    level: "TIER 5",
    title: "Social Media & AI Generation",
    desc: "Social media, anonymous claims, AI-generated text. TREAT AS ZERO EVIDENCE. Always require lateral verification.",
    icon: AlertOctagon,
    color: "from-rose-500 to-red-600",
    bg: "bg-rose-950/20",
    border: "border-rose-500/30",
    width: "w-full"
  }
];

export function SourcePyramid() {
  return (
    <div className="w-full py-12 flex flex-col items-center">
      <div className="text-center mb-10 max-w-2xl">
        <h3 className="text-3xl font-bold text-white mb-3 tracking-tight">The Source Hierarchy</h3>
        <p className="text-slate-400">The mental pyramid every user must internalize. The Cochrane evidence hierarchy adapted for the broader information ecosystem.</p>
      </div>

      <div className="w-full max-w-4xl flex flex-col items-center gap-3 relative">
        {/* Central visual spine */}
        <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px bg-gradient-to-b from-amber-500 via-cyan-500 to-rose-500 opacity-20 z-0"></div>

        {tiers.map((tier, idx) => (
          <motion.div
            key={tier.level}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className={`${tier.width} relative z-10`}
          >
            <div className={`p-5 rounded-2xl border ${tier.border} ${tier.bg} backdrop-blur-sm flex flex-col md:flex-row items-start md:items-center gap-4 group hover:scale-[1.01] transition-transform`}>
              
              {/* Badge */}
              <div className="flex-shrink-0 flex items-center justify-center w-16 h-16 rounded-xl bg-slate-950/50 border border-slate-800 shadow-inner">
                <tier.icon className={`w-8 h-8 text-transparent bg-clip-text bg-gradient-to-br ${tier.color}`} />
                {/* SVG gradient workaround for Lucide icons */}
                <svg width="0" height="0">
                  <linearGradient id={`grad-${idx}`} x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop stopColor="currentColor" offset="0%" />
                    <stop stopColor="currentColor" offset="100%" />
                  </linearGradient>
                </svg>
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <span className={`px-2.5 py-0.5 rounded-md text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r ${tier.color} shadow-lg`}>
                    {tier.level}
                  </span>
                  <h4 className="text-lg font-bold text-slate-200">{tier.title}</h4>
                </div>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {tier.desc}
                </p>
              </div>

            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
