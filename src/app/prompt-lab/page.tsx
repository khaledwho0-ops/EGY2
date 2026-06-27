"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lightbulb, Search, Tag, Copy, Check, Filter } from "lucide-react";
import { useRTL } from "@/components/shared/rtl-provider";
import { PageNavigation } from '@/components/shared/page-navigation';
import { PageAIChatbot } from '@/components/shared/page-ai-chatbot';

// Upgraded Prompt Lab with KEYHUNTER tags and categorization
const categories = ["All", "Fact-Checking", "OSINT", "Analysis", "Debunking"];
const tags = ["KEYHUNTER", "Deepfake", "Metadata", "Verification", "Source Analysis"];

const prompts = [
  {
    id: 1,
    title: "Verify Image Context",
    category: "Fact-Checking",
    tags: ["KEYHUNTER", "Verification"],
    content: "Extract and analyze the metadata from this image URL. Verify if the geographic coordinates match the claimed location in the user's post.",
    description: "A secure prompt to safely extract EXIF data without executing external code."
  },
  {
    id: 2,
    title: "Deepfake Detection Pass",
    category: "Debunking",
    tags: ["KEYHUNTER", "Deepfake", "Analysis"],
    content: "Analyze the provided transcript and visual descriptions for common deepfake artifacts: unnatural blinking, lighting inconsistencies, and audio desynchronization.",
    description: "Guides the AI to act as a forensic video analyst."
  },
  {
    id: 3,
    title: "Source Credibility Check",
    category: "OSINT",
    tags: ["Verification", "Source Analysis"],
    content: "Evaluate the credibility of the following domain based on its WHOIS history, bias rating (if available), and cross-referencing against known misinformation databases.",
    description: "Standard OSINT domain check prompt."
  },
  {
    id: 4,
    title: "Reverse Search Strategy",
    category: "OSINT",
    tags: ["KEYHUNTER", "Verification"],
    content: "Generate a list of search operators (dorks) to find the original source of the following quote, excluding social media platforms.",
    description: "Creates advanced Google Dorks for quote tracing."
  },
  {
    id: 5,
    title: "Logical Fallacy Breakdown",
    category: "Analysis",
    tags: ["Debunking", "Analysis"],
    content: "Identify any logical fallacies (e.g., ad hominem, straw man, false dilemma) in the following argumentative text. Explain why they are fallacious.",
    description: "Useful for breaking down rhetorical misinformation."
  }
];

export default function PromptLabPage() {
  const { isRTL, t } = useRTL();
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const filteredPrompts = prompts.filter(p => {
    const matchesCategory = activeCategory === "All" || p.category === activeCategory;
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleCopy = (id: number, content: string) => {
    navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className={`min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 pt-24 pb-12 px-4 ${isRTL ? 'font-arabic' : 'font-sans'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-6xl mx-auto space-y-8">
        
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 bg-amber-100 dark:bg-amber-500/20 rounded-xl">
                <Lightbulb className="w-8 h-8 text-amber-600 dark:text-amber-400" />
              </div>
              <h1 className="text-3xl font-bold">{isRTL ? "معمل الأوامر (Prompt Lab)" : "Prompt Lab"}</h1>
            </div>
            <p className="text-slate-500 dark:text-slate-400 max-w-xl mt-2">
              {isRTL 
                ? "مكتبة الأوامر الآمنة والموثوقة للتحقق من الحقائق وكشف التزييف. استخدم وسوم KEYHUNTER لأوامر متقدمة."
                : "A library of safe, evidence-based prompts for fact-checking and debunking. Look for KEYHUNTER tags for advanced capabilities."}
            </p>
          </div>

          <div className="relative w-full md:w-72">
            <Search className={`absolute ${isRTL ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400`} />
            <input 
              type="text" 
              placeholder={isRTL ? "البحث في الأوامر..." : "Search prompts..."}
              className={`w-full bg-slate-100 dark:bg-slate-800 border-none rounded-xl py-3 ${isRTL ? 'pr-10 pl-4' : 'pl-10 pr-4'} focus:ring-2 focus:ring-amber-500`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </header>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar Filters */}
          <div className="lg:w-64 flex-shrink-0 space-y-8">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4 flex items-center gap-2">
                <Filter className="w-4 h-4" /> Categories
              </h3>
              <div className="flex flex-col gap-2">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`text-left px-4 py-2.5 rounded-xl transition-all ${
                      activeCategory === category 
                        ? "bg-amber-500 text-white font-medium shadow-md shadow-amber-500/20" 
                        : "hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4 flex items-center gap-2">
                <Tag className="w-4 h-4" /> Popular Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {tags.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs rounded-full cursor-pointer hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Prompt Grid */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnimatePresence>
              {filteredPrompts.map(prompt => (
                <motion.div 
                  key={prompt.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 hover:border-amber-500/50 transition-colors flex flex-col group"
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">{prompt.title}</h3>
                    <button 
                      onClick={() => handleCopy(prompt.id, prompt.content)}
                      className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg hover:bg-amber-100 dark:hover:bg-amber-500/20 text-slate-500 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                      title="Copy Prompt"
                    >
                      {copiedId === prompt.id ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
                    </button>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {prompt.tags.map(tag => (
                      <span 
                        key={tag} 
                        className={`text-xs px-2.5 py-1 rounded-md font-medium ${
                          tag === "KEYHUNTER" 
                            ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border border-amber-200 dark:border-amber-800/50" 
                            : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                        }`}
                      >
                        {tag === "KEYHUNTER" ? "🔑 KEYHUNTER" : tag}
                      </span>
                    ))}
                  </div>

                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 flex-1">
                    {prompt.description}
                  </p>

                  <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-xl border border-slate-200 dark:border-slate-800 font-mono text-sm text-slate-700 dark:text-slate-300 leading-relaxed overflow-hidden relative">
                    <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-slate-50 dark:from-slate-950 to-transparent pointer-events-none" />
                    <span className="line-clamp-3 group-hover:line-clamp-none transition-all duration-300">
                      {prompt.content}
                    </span>
                  </div>
                </motion.div>
              ))}
              
              {filteredPrompts.length === 0 && (
                <div className="col-span-1 md:col-span-2 py-20 flex flex-col items-center justify-center text-slate-500">
                  <Search className="w-12 h-12 mb-4 opacity-30" />
                  <p>No prompts found matching your criteria.</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
      <PageNavigation currentPath="/prompt-lab" />

      <PageAIChatbot
        pageTitle="Adversarial Prompt Engineering Lab"
        pageContext="EAL Prompt Lab: Design, test, and optimize prompts for fact-checking, debunking, and analysis. Includes prompt templates, A/B testing, and adversarial resilience testing."
        systemPrompt={`[LAYER 1 - ROLE]: You are the EAL Prompt Engineering AI — an expert in designing adversarial-resistant prompts for fact-checking, Islamic scholarship, and misinformation analysis.

[LAYER 2 - PROMPT ENGINEERING TECHNIQUES]:
1. Chain-of-Thought (CoT) — Step-by-step reasoning
2. Few-Shot Learning — Examples before the query
3. Role Assignment — Persona-based system prompts
4. Adversarial Testing — Red-teaming prompts for robustness
5. Output Formatting — Structured JSON/markdown responses

[LAYER 3 - RULES]:
1. Help users craft effective prompts for EAL tools
2. Test prompts for adversarial vulnerabilities
3. Optimize prompts for Arabic and Egyptian dialect
4. Respond in the user's language`}
        suggestedQuestions={[
          'How do I write a fact-checking prompt?',
          'إزاي أعمل prompt لتحليل ادعاء صحي؟',
          'What is chain-of-thought prompting?',
          'Test this prompt for adversarial attacks',
        ]}
        accentColor="#f59e0b"
        accentColorRgb="245,158,11"
      />
    </div>
  );
}

