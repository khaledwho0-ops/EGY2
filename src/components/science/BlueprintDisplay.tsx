"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import { useRTL } from "@/components/shared/rtl-provider";
import { Layers } from "lucide-react";

interface BlueprintDisplayProps {
  markdownContent: string;
  title: string;
  engineNumber: number;
}

export function BlueprintDisplay({ markdownContent, title, engineNumber }: BlueprintDisplayProps) {
  const { isRTL, t } = useRTL();

  return (
    <div className={`min-h-screen bg-slate-50 text-slate-800 relative font-sans overflow-hidden pt-20 pb-32 transition-colors duration-500 ${isRTL ? 'rtl' : 'ltr'}`}>
      {/* Soft Background Pattern matching the roadmap */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: `radial-gradient(#CBD5E1 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
        }}
      />
      <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-blue-50/80 to-transparent pointer-events-none" />

      <div className="container relative z-10 mx-auto px-4 max-w-4xl">
        {/* Header matching Global Roadmap style */}
        <div className="text-center mb-16 relative pt-8">
          <div className="inline-flex items-center justify-center p-4 rounded-3xl bg-white border border-slate-200 mb-6 shadow-sm">
            <Layers size={40} className="text-blue-500" />
          </div>
          <div className="text-sm font-bold text-blue-500 tracking-widest uppercase mb-4">
            {t({ en: `ENGINE ${engineNumber}`, ar: `محرك ${engineNumber}` })}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-slate-900">
            {title}
          </h1>
        </div>

        {/* The Document Container */}
        <div className="bg-white border border-slate-200/80 p-8 md:p-16 rounded-[2.5rem] shadow-xl relative z-20">
          <article className="prose prose-slate prose-blue max-w-none prose-headings:font-bold prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-a:text-blue-600 hover:prose-a:text-blue-500 prose-p:leading-relaxed prose-table:border prose-td:border-slate-200 prose-th:border-slate-200 prose-th:bg-slate-50 prose-img:rounded-xl">
            <ReactMarkdown>
              {markdownContent}
            </ReactMarkdown>
          </article>
        </div>
      </div>
    </div>
  );
}
