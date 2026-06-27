"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Film, Tv, CheckCircle, XCircle, AlertCircle, Search, ChevronRight } from "lucide-react";
import { PageNavigation } from '@/components/shared/page-navigation';

type MediaType = "movie" | "show" | "documentary";
type AccuracyRating = "high" | "mixed" | "low";

interface MediaItem {
  id: number;
  title: string;
  type: MediaType;
  year: string;
  image: string;
  accuracy: AccuracyRating;
  description: string;
  truthAnalysis: {
    claim: string;
    verdict: boolean;
    explanation: string;
  }[];
}

const mediaLibrary: MediaItem[] = [
  {
    id: 1,
    title: "The Mummy (1999)",
    type: "movie",
    year: "1999",
    image: "https://images.unsplash.com/photo-1600521011406-8d374465bda6?auto=format&fit=crop&q=80&w=400",
    accuracy: "low",
    description: "Action-adventure film following an American adventurer and a British librarian who accidentally awaken a cursed high priest.",
    truthAnalysis: [
      { claim: "Imhotep was a cursed high priest", verdict: false, explanation: "Imhotep was a revered polymath, architect of the step pyramid, and later deified as a god of medicine." },
      { claim: "The Book of the Dead was solid gold and cursed", verdict: false, explanation: "It was a collection of funerary texts written on papyrus to assist the dead in the afterlife, not a cursed magical artifact." },
    ]
  },
  {
    id: 2,
    title: "Secrets of the Saqqara Tomb",
    type: "documentary",
    year: "2020",
    image: "https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&q=80&w=400",
    accuracy: "high",
    description: "Follows a team of local archaeologists excavating unseen passages, shafts, and tombs in Saqqara.",
    truthAnalysis: [
      { claim: "Wahtye was a high-ranking priest", verdict: true, explanation: "Hieroglyphs confirm he was a high priest of purification during the Fifth Dynasty." },
      { claim: "Mummified lion cubs were found", verdict: true, explanation: "The team discovered an incredibly rare mummified lion cub, verifying ancient texts about lion worship." }
    ]
  },
  {
    id: 3,
    title: "Moon Knight",
    type: "show",
    year: "2022",
    image: "https://images.unsplash.com/photo-1501413840742-5cb098528994?auto=format&fit=crop&q=80&w=400",
    accuracy: "mixed",
    description: "A mercenary with dissociative identity disorder is drawn into a deadly mystery involving Egyptian gods.",
    truthAnalysis: [
      { claim: "Khonshu is the Egyptian god of the Moon", verdict: true, explanation: "Khonshu (Khonsu) was indeed the ancient Egyptian god of the moon, associated with time and healing." },
      { claim: "Ammit judges souls before death", verdict: false, explanation: "Ammit was the 'Devourer of the Dead', only consuming hearts that failed the weighing against the feather of Ma'at after death." }
    ]
  }
];

export default function MediaLibraryPage() {
  const [activeItem, setActiveItem] = useState<MediaItem | null>(null);
  const [filter, setFilter] = useState<"all" | MediaType>("all");

  const filteredMedia = mediaLibrary.filter(item => filter === "all" || item.type === filter);

  const getAccuracyColor = (accuracy: AccuracyRating) => {
    switch(accuracy) {
      case "high": return "text-green-500 bg-green-500/10 border-green-500/20";
      case "mixed": return "text-yellow-500 bg-yellow-500/10 border-yellow-500/20";
      case "low": return "text-red-500 bg-red-500/10 border-red-500/20";
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-200 pt-24 pb-12 px-4 md:px-8 font-sans selection:bg-indigo-500/30">
      <div className="max-w-7xl mx-auto space-y-8">
        
        <header className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12 border-b border-neutral-800 pb-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4 flex items-center gap-4">
              <Film className="w-10 h-10 text-indigo-500" />
              Media Truth Library
            </h1>
            <p className="text-neutral-400 text-lg max-w-2xl">
              Cross-reference popular films, shows, and documentaries about Egypt with rigorous historical truth analysis.
            </p>
          </div>
          
          <div className="flex gap-2">
            {(["all", "movie", "show", "documentary"] as const).map(type => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-all ${
                  filter === type 
                    ? "bg-indigo-600 text-white" 
                    : "bg-neutral-900 text-neutral-400 hover:bg-neutral-800 hover:text-white"
                }`}
              >
                {type}s
              </button>
            ))}
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Media Grid */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 h-fit">
            <AnimatePresence>
              {filteredMedia.map(item => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  onClick={() => setActiveItem(item)}
                  className={`flex gap-4 p-4 rounded-2xl cursor-pointer transition-all border ${
                    activeItem?.id === item.id 
                      ? "bg-neutral-800/80 border-indigo-500/50 shadow-[0_0_30px_rgba(99,102,241,0.1)]" 
                      : "bg-neutral-900/50 border-neutral-800 hover:bg-neutral-800 hover:border-neutral-700"
                  }`}
                >
                  <div className="w-24 h-32 rounded-xl overflow-hidden flex-shrink-0 bg-neutral-800 relative">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                    <div className="absolute top-2 left-2 p-1 bg-black/60 backdrop-blur rounded-md">
                      {item.type === "movie" ? <Film className="w-3 h-3 text-white" /> : 
                       item.type === "show" ? <Tv className="w-3 h-3 text-white" /> : 
                       <Play className="w-3 h-3 text-white" />}
                    </div>
                  </div>
                  
                  <div className="flex flex-col justify-center">
                    <h3 className="text-lg font-bold text-white mb-1">{item.title}</h3>
                    <p className="text-sm text-neutral-400 mb-3">{item.year} • <span className="capitalize">{item.type}</span></p>
                    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider w-fit border ${getAccuracyColor(item.accuracy)}`}>
                      {item.accuracy === "high" ? <CheckCircle className="w-3 h-3" /> : 
                       item.accuracy === "mixed" ? <AlertCircle className="w-3 h-3" /> : 
                       <XCircle className="w-3 h-3" />}
                      {item.accuracy} Accuracy
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Analysis Viewer */}
          <div className="lg:col-span-7">
            {activeItem ? (
              <motion.div
                key={activeItem.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden sticky top-24 shadow-2xl"
              >
                <div className="h-64 relative">
                  <img src={activeItem.image} alt={activeItem.title} className="w-full h-full object-cover opacity-40" />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 to-transparent" />
                  <div className="absolute bottom-6 left-8 right-8">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="px-3 py-1 bg-white/10 backdrop-blur text-white text-xs font-bold uppercase rounded-full border border-white/20">
                        {activeItem.type}
                      </span>
                      <span className="text-neutral-300 font-medium">{activeItem.year}</span>
                    </div>
                    <h2 className="text-4xl font-black text-white">{activeItem.title}</h2>
                  </div>
                </div>

                <div className="p-8 space-y-8">
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                      <Search className="w-5 h-5 text-indigo-400" /> Synopsis
                    </h3>
                    <p className="text-neutral-400 leading-relaxed">{activeItem.description}</p>
                  </div>

                  <div>
                    <h3 className="text-xl font-black text-white mb-4 border-b border-neutral-800 pb-2">Truth Analysis</h3>
                    <div className="space-y-4">
                      {activeItem.truthAnalysis.map((analysis, i) => (
                        <div key={i} className="bg-neutral-950 rounded-xl p-5 border border-neutral-800">
                          <div className="flex items-start gap-4 mb-3">
                            {analysis.verdict ? (
                              <div className="p-2 bg-green-500/10 rounded-lg text-green-500 flex-shrink-0 mt-1">
                                <CheckCircle className="w-5 h-5" />
                              </div>
                            ) : (
                              <div className="p-2 bg-red-500/10 rounded-lg text-red-500 flex-shrink-0 mt-1">
                                <XCircle className="w-5 h-5" />
                              </div>
                            )}
                            <div>
                              <p className="text-sm font-bold text-neutral-500 uppercase tracking-wider mb-1">Claim in Media</p>
                              <p className="text-white text-lg font-medium">{analysis.claim}</p>
                            </div>
                          </div>
                          <div className="pl-14">
                            <div className="flex gap-2">
                              <ChevronRight className="w-5 h-5 text-neutral-600 flex-shrink-0" />
                              <p className="text-neutral-400">{analysis.explanation}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="bg-neutral-900 border border-neutral-800 border-dashed rounded-3xl h-[600px] flex flex-col items-center justify-center text-neutral-500">
                <Tv className="w-16 h-16 mb-4 opacity-20" />
                <p className="text-lg font-medium">Select a title to view the truth analysis</p>
              </div>
            )}
          </div>

        </div>
      </div>
      <PageNavigation currentPath="/media-library" />
    </div>
  );
}
