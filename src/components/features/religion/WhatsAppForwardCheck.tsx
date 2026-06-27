"use client";
import React, { useState } from 'react';
import { NasikhMansukhRegistry, NasikhMansukhRecord } from '../../../lib/religion/nasikh-mansukh';
import { AsbabRegistry, AsbabAlNuzulRecord } from '../../../lib/religion/asbab';

// Map of common Arabic surah names to their numbers.
// Covers the most frequently forwarded surahs; others must be referenced numerically.
const SURAH_NAME_MAP: Record<string, number> = {
  'الفاتحة': 1, 'البقرة': 2, 'آل عمران': 3, 'النساء': 4, 'المائدة': 5,
  'الأنعام': 6, 'الأعراف': 7, 'الأنفال': 8, 'التوبة': 9, 'يونس': 10,
  'هود': 11, 'يوسف': 12, 'الرعد': 13, 'إبراهيم': 14, 'الحجر': 15,
  'النحل': 16, 'الإسراء': 17, 'الكهف': 18, 'مريم': 19, 'طه': 20,
  'الأنبياء': 21, 'الحج': 22, 'المؤمنون': 23, 'النور': 24, 'الفرقان': 25,
  'الشعراء': 26, 'النمل': 27, 'القصص': 28, 'العنكبوت': 29, 'الروم': 30,
  'لقمان': 31, 'السجدة': 32, 'الأحزاب': 33, 'سبأ': 34, 'فاطر': 35,
  'يس': 36, 'الصافات': 37, 'ص': 38, 'الزمر': 39, 'غافر': 40,
  'فصلت': 41, 'الشورى': 42, 'الزخرف': 43, 'الدخان': 44, 'الجاثية': 45,
  'الأحقاف': 46, 'محمد': 47, 'الفتح': 48, 'الحجرات': 49, 'ق': 50,
  'الذاريات': 51, 'الطور': 52, 'النجم': 53, 'القمر': 54, 'الرحمن': 55,
  'الواقعة': 56, 'الحديد': 57, 'المجادلة': 58, 'الحشر': 59, 'الممتحنة': 60,
  'الصف': 61, 'الجمعة': 62, 'المنافقون': 63, 'التغابن': 64, 'الطلاق': 65,
  'التحريم': 66, 'الملك': 67, 'القلم': 68, 'الحاقة': 69, 'المعارج': 70,
  'نوح': 71, 'الجن': 72, 'المزمل': 73, 'المدثر': 74, 'القيامة': 75,
  'الإنسان': 76, 'المرسلات': 77, 'النبأ': 78, 'النازعات': 79, 'عبس': 80,
  'التكوير': 81, 'الانفطار': 82, 'المطففين': 83, 'الانشقاق': 84, 'البروج': 85,
  'الطارق': 86, 'الأعلى': 87, 'الغاشية': 88, 'الفجر': 89, 'البلد': 90,
  'الشمس': 91, 'الليل': 92, 'الضحى': 93, 'الشرح': 94, 'التين': 95,
  'العلق': 96, 'القدر': 97, 'البينة': 98, 'الزلزلة': 99, 'العاديات': 100,
  'القارعة': 101, 'التكاثر': 102, 'العصر': 103, 'الهمزة': 104, 'الفيل': 105,
  'قريش': 106, 'الماعون': 107, 'الكوثر': 108, 'الكافرون': 109, 'النصر': 110,
  'المسد': 111, 'الإخلاص': 112, 'الفلق': 113, 'الناس': 114,
};

/**
 * Extract the first surah:ayah reference from arbitrary Arabic/Latin text.
 * Tried patterns (in order):
 *   1. Numeric  "2:240"  or  "2/240"
 *   2. Arabic   "سورة البقرة آية 240"  /  "البقرة 240"
 *   3. Surah-name + ayah keyword  "البقرة:240"
 * Returns null when no recognisable reference is present.
 */
function extractAyahReference(text: string): { surah: number; ayah: number } | null {
  // Pattern 1 — numeric reference, e.g. "2:240" or "2/240"
  const numericMatch = text.match(/\b(\d{1,3})[:/](\d{1,3})\b/);
  if (numericMatch) {
    const s = parseInt(numericMatch[1], 10);
    const a = parseInt(numericMatch[2], 10);
    if (s >= 1 && s <= 114 && a >= 1) return { surah: s, ayah: a };
  }

  // Pattern 2 — Arabic surah name followed by an ayah number
  // Accepts: "سورة X آية N", "سورة X N", "X آية N", "X:N"
  const arabicAyahKeyword = /(?:سورة\s+)?([^\d\n،,،.؟?!]+?)(?:\s+آية|\s*[:：]\s*)(\d{1,3})/u;
  const arabicMatch = text.match(arabicAyahKeyword);
  if (arabicMatch) {
    const rawName = arabicMatch[1].trim().replace(/^سورة\s+/u, '');
    const ayah = parseInt(arabicMatch[2], 10);
    if (rawName in SURAH_NAME_MAP && ayah >= 1) {
      return { surah: SURAH_NAME_MAP[rawName], ayah };
    }
  }

  // Pattern 3 — surah name then bare number (e.g. "البقرة 240")
  for (const [name, num] of Object.entries(SURAH_NAME_MAP)) {
    const re = new RegExp(`${name}\\s+(\\d{1,3})`, 'u');
    const m = text.match(re);
    if (m) {
      const ayah = parseInt(m[1], 10);
      if (ayah >= 1) return { surah: num, ayah };
    }
  }

  return null;
}

export const WhatsAppForwardCheck: React.FC = () => {
  const [viralText, setViralText] = useState('');
  const [analysisResult, setAnalysisResult] = useState<
    | { found: false }
    | { found: true; surah: number; ayah: number; abrogation: NasikhMansukhRecord; context: AsbabAlNuzulRecord; fallacyDetected: string }
  >(null as any);

  const runAnalysis = () => {
    const ref = extractAyahReference(viralText);

    if (!ref) {
      setAnalysisResult({ found: false });
      return;
    }

    const abrogationStatus = NasikhMansukhRegistry.checkAyahStatus(ref.surah, ref.ayah);
    const contextStatus = AsbabRegistry.getContext(ref.surah, ref.ayah);

    // Only render a verdict when both registries have a real sourced entry
    if (!abrogationStatus.found || !contextStatus.found) {
      setAnalysisResult({ found: false });
      return;
    }

    setAnalysisResult({
      found: true,
      surah: ref.surah,
      ayah: ref.ayah,
      abrogation: abrogationStatus,
      context: contextStatus,
      fallacyDetected: abrogationStatus.status === 'Mansukh' ? 'Qur\'an out-of-context (taqti\' al-ayah)' : 'None',
    });
  };

  return (
    <div className="p-8 max-w-3xl mx-auto bg-slate-50 rounded-xl shadow border border-slate-200">
      <h2 className="text-2xl font-bold text-slate-800 mb-4">Wednesday Protocol: WhatsApp Forward Check</h2>
      <textarea
        className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-emerald-500 min-h-[150px]"
        placeholder="Paste the viral forwarded message here..."
        value={viralText}
        onChange={(e) => setViralText(e.target.value)}
      />

      <button
        onClick={runAnalysis}
        className="mt-4 px-6 py-2 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700"
      >
        Run Takhrij & Context Analysis
      </button>

      {analysisResult && !analysisResult.found && (
        <div className="mt-8 p-6 bg-amber-50 border border-amber-300 rounded-lg">
          <p className="font-semibold text-amber-800">
            لم يتم العثور على مرجع آية / no ayah reference found
          </p>
          <p className="text-amber-700 text-sm mt-1">
            الرجاء التأكد من وجود رقم السورة والآية في النص المُلصق (مثال: 2:240 أو &quot;البقرة آية 240&quot;).
            Please ensure the pasted text contains a surah and ayah reference (e.g. 2:240 or &quot;Al-Baqarah ayah 240&quot;).
          </p>
        </div>
      )}

      {analysisResult && analysisResult.found && (
        <div className="mt-8 p-6 bg-white border border-slate-200 rounded-lg space-y-4">
          <h3 className="text-xl font-bold text-red-700">Forensic Results</h3>
          <p className="text-xs text-slate-400">
            Reference extracted: {analysisResult.surah}:{analysisResult.ayah}
          </p>
          <div className="p-4 bg-slate-50 border-l-4 border-emerald-500 rounded">
            <p className="font-semibold text-slate-700">Makki-Madani Context:</p>
            <p className="text-slate-600">{analysisResult.context.classification} — {analysisResult.context.revelationContext}</p>
          </div>
          <div className="p-4 bg-slate-50 border-l-4 border-blue-500 rounded">
            <p className="font-semibold text-slate-700">Nasikh-Mansukh Status:</p>
            <p className="text-slate-600">{analysisResult.abrogation.status} (Verified via scholarly consensus)</p>
            {analysisResult.abrogation.abrogatedBy && (
              <p className="text-sm text-slate-500 mt-1">Abrogated by: {analysisResult.abrogation.abrogatedBy}</p>
            )}
          </div>
          <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded">
            <p className="font-semibold text-red-800">Detected Fallacy:</p>
            <p className="text-red-700">{analysisResult.fallacyDetected}</p>
          </div>
        </div>
      )}
    </div>
  );
};
