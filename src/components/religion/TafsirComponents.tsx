"use client";
import { useState } from "react";
import { motion } from "framer-motion";

export function Stripped({ versesOnly }: { versesOnly: string }) {
  return (
    <div className="stripped-verse mb-6" style={{ background: "#fef2f2", color: "#450a0a", padding: "1rem", borderLeft: "4px solid #ef4444" }}>
      <h3 className="font-bold" style={{ color: "#b91c1c" }}>The Decontextualized Snippet:</h3>
      <p className="text-xl leading-relaxed" style={{ color: "#450a0a" }}>« {versesOnly} »</p>
    </div>
  );
}

export function Reveal({ children }: { children: React.ReactNode }) {
  const [revealed, setRevealed] = useState(false);
  return (
    <div className="reveal-container">
      {!revealed && (
        <button 
          onClick={() => setRevealed(true)}
          className="bg-blue-600 text-white px-6 py-2 rounded-md font-bold mb-8 w-full"
        >
          Reveal Full Context
        </button>
      )}
      {revealed && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          {children}
        </motion.div>
      )}
    </div>
  );
}

export function Contextual({ verses }: { verses: string[] }) {
  return (
    <div className="contextual-verses mb-6">
      <h3 className="font-bold mb-2">The Full Context:</h3>
      <div className="flex flex-col gap-2 p-4 bg-white border rounded">
        {verses.map((v, i) => (
          <p key={i} className="text-lg">« {v} »</p>
        ))}
      </div>
    </div>
  );
}

export function AsbabSection({ asbab }: { asbab: string }) {
  return (
    <div className="asbab bg-amber-50 p-4 mb-6 border-r-4 border-amber-500">
      <h3 className="font-bold">Asbāb al-Nuzūl (Context of Revelation):</h3>
      <p>{asbab}</p>
    </div>
  );
}

export function CommentaryGrid({ commentaries }: { commentaries: any[] }) {
  return (
    <div className="commentary-grid grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      {commentaries.map(c => (
        <div key={c.authority} className="p-4 border rounded bg-white">
          <h4 className="font-bold text-emerald-800">{c.authority}</h4>
          <p className="text-sm mt-2">{c.text}</p>
        </div>
      ))}
    </div>
  );
}

export function MaqasidCheck({ verses }: { verses: string[] }) {
  return (
    <div className="maqasid bg-green-50 p-4 mb-6 border-r-4 border-green-500">
      <h3 className="font-bold">Maqāṣid al-Sharīʿah:</h3>
      <p>This ruling contextually preserves Life (Nafs) and Religion (Din).</p>
    </div>
  );
}

export function UserReflection({ prompt }: { prompt: string }) {
  return (
    <div className="user-reflection bg-slate-100 p-4 rounded border">
      <h3 className="font-bold mb-2">Cognitive Reflection:</h3>
      <label className="block mb-2 font-medium">{prompt}</label>
      <textarea className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500" rows={3}></textarea>
    </div>
  );
}
