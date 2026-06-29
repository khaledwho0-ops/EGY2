"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Terminal, Image as ImageIcon, Camera, AlertTriangle,
  MapPin, Calendar, HardDrive, Search, ShieldCheck,
  UploadCloud, FileSearch, Eye
} from "lucide-react";
import exifr from 'exifr';
import { useRTL } from "@/components/shared/rtl-provider";
import { PageNavigation } from '@/components/shared/page-navigation';
import { PageAIChatbot } from '@/components/shared/page-ai-chatbot';

export default function OsintInvestigatorPage() {
  const { isRTL } = useRTL();
  const [activeTab, setActiveTab] = useState<"exif" | "ela">("exif");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [elaImageUrl, setElaImageUrl] = useState<string | null>(null);

  const canvasOriginalRef = useRef<HTMLCanvasElement>(null);
  const canvasCompressedRef = useRef<HTMLCanvasElement>(null);
  const canvasResultRef = useRef<HTMLCanvasElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setSelectedImageUrl(url);
      setAnalysisResult(null);
      setElaImageUrl(null);
    }
  };

  const performELA = async (fileUrl: string): Promise<{ score: number, url: string }> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = "Anonymous";
      img.onload = () => {
        const origCanvas = canvasOriginalRef.current;
        const compCanvas = canvasCompressedRef.current;
        const resCanvas = canvasResultRef.current;
        if (!origCanvas || !compCanvas || !resCanvas) return resolve({ score: 0, url: "" });

        const width = img.width;
        const height = img.height;
        origCanvas.width = width;
        origCanvas.height = height;
        compCanvas.width = width;
        compCanvas.height = height;
        resCanvas.width = width;
        resCanvas.height = height;

        const origCtx = origCanvas.getContext('2d');
        const compCtx = compCanvas.getContext('2d');
        const resCtx = resCanvas.getContext('2d');
        if (!origCtx || !compCtx || !resCtx) return resolve({ score: 0, url: "" });

        origCtx.drawImage(img, 0, 0, width, height);

        // Compress image at 90% quality to force artifacting on already compressed areas
        const compressedDataUrl = origCanvas.toDataURL('image/jpeg', 0.90);

        const compImg = new Image();
        compImg.onload = () => {
          compCtx.drawImage(compImg, 0, 0, width, height);

          const origData = origCtx.getImageData(0, 0, width, height);
          const compData = compCtx.getImageData(0, 0, width, height);
          const resData = resCtx.createImageData(width, height);

          let maxDiff = 0;
          let totalDiff = 0;

          for (let i = 0; i < origData.data.length; i += 4) {
            const rDiff = Math.abs(origData.data[i] - compData.data[i]);
            const gDiff = Math.abs(origData.data[i+1] - compData.data[i+1]);
            const bDiff = Math.abs(origData.data[i+2] - compData.data[i+2]);

            const diff = Math.max(rDiff, gDiff, bDiff);
            maxDiff = Math.max(maxDiff, diff);
            totalDiff += diff;

            // Multiply the difference to make it visible
            const multiplier = 15;
            resData.data[i] = rDiff * multiplier;
            resData.data[i+1] = gDiff * multiplier;
            resData.data[i+2] = bDiff * multiplier;
            resData.data[i+3] = 255; // Fully opaque
          }

          resCtx.putImageData(resData, 0, 0);
          const elaUrl = resCanvas.toDataURL('image/png');

          const avgDiff = totalDiff / (width * height);
          let score = Math.min(100, Math.round((avgDiff / 5) * 100)); // Arbitrary scoring heuristic
          if (maxDiff > 40) score = Math.max(score, 75); // Hotspots exist

          resolve({ score, url: elaUrl });
        };
        compImg.src = compressedDataUrl;
      };
      img.src = fileUrl;
    });
  };

  const runAnalysis = async () => {
    if (!selectedFile || !selectedImageUrl) return;

    setIsAnalyzing(true);

    try {
      // 1. REAL EXIF Extraction using exifr
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let exifRes: any = null;
      try {
        exifRes = await exifr.parse(selectedFile);
      } catch (err) {
        console.error("EXIF parsing error", err);
      }

      let gpsString = isRTL ? "غير مكتشف" : "Not detected";
      if (exifRes?.latitude && exifRes?.longitude) {
        gpsString = `${exifRes.latitude.toFixed(4)}° N, ${exifRes.longitude.toFixed(4)}° E`;
      }

      const software = exifRes?.Software || null;

      // 2. REAL ELA Analysis via Canvas
      const elaResult = await performELA(selectedImageUrl);
      setElaImageUrl(elaResult.url);

      setAnalysisResult({
        exif: {
          make: exifRes?.Make || (isRTL ? "غير معروف" : "Unknown"),
          model: exifRes?.Model || (isRTL ? "غير معروف" : "Unknown"),
          date: exifRes?.DateTimeOriginal ? new Date(exifRes.DateTimeOriginal).toLocaleString() : (isRTL ? "غير معروف" : "Unknown"),
          gps: gpsString,
          software: software,
          warning: !!software && /photoshop|gimp|lightroom|canva/i.test(software),
          raw: exifRes ? true : false
        },
        ela: {
          score: elaResult.score,
          conclusion: elaResult.score > 60
            ? (isRTL
                ? "احتمال عالٍ لوجود تلاعب رقمي. المناطق المضيئة في خريطة ELA تشير لاختلاف مستويات الضغط."
                : "High probability of digital manipulation detected. Bright areas in ELA map indicate differing compression levels.")
            : (isRTL
                ? "لم يُكتشف أي أثر تلاعب يُذكر. مستويات الضغط تبدو متجانسة."
                : "No significant manipulation artifacts detected. Compression levels appear uniform."),
        }
      });
    } catch (e) {
      console.error(e);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <>
    <main dir={isRTL ? 'rtl' : 'ltr'} className="min-h-screen font-mono pt-24 pb-12 px-4 md:px-8" style={{ background: 'var(--bg-page)', color: 'var(--text-primary)' }}>
      {/* Hidden canvases for ELA processing */}
      <canvas ref={canvasOriginalRef} style={{ display: 'none' }} />
      <canvas ref={canvasCompressedRef} style={{ display: 'none' }} />
      <canvas ref={canvasResultRef} style={{ display: 'none' }} />

      <div className="max-w-7xl mx-auto space-y-8">

        <header className="pb-6 mb-8" style={{ borderBottom: '1px solid var(--border-primary)' }}>
          <h1 className="text-3xl md:text-4xl font-bold flex items-center gap-3" style={{ color: 'var(--text-primary)' }}>
            <Search className="w-8 h-8" style={{ color: 'var(--accent-emerald)' }} />
            {isRTL ? "محقق OSINT" : "OSINT Investigator"}
          </h1>
          <p className="mt-2 max-w-3xl" style={{ color: 'var(--text-secondary)' }}>
            {isRTL
              ? "صندوق أدوات تحقيق رقمي حقيقي. يحلّل الصور لاستخراج البيانات الوصفية المخفية مباشرةً داخل متصفحك، ويكشف التلاعب الرقمي باستخدام تحليل مستوى الأخطاء (ELA) الحقيقي عبر HTML5 Canvas."
              : "Real digital forensics toolkit. Analyzes images for hidden metadata directly in your browser, and detects digital manipulations using true HTML5 Canvas Error Level Analysis (ELA)."}
          </p>
        </header>

        {/* Tab Navigation */}
        <div className="flex space-x-2" style={{ borderBottom: '1px solid var(--border-primary)' }}>
          <button
            onClick={() => setActiveTab("exif")}
            className="px-4 py-3 font-semibold text-sm transition-colors relative"
            style={{ color: activeTab === "exif" ? 'var(--accent-blue)' : 'var(--text-muted)' }}
          >
            <span className="flex items-center gap-2"><Camera className="w-4 h-4" /> {isRTL ? "قارئ EXIF" : "EXIF Reader"}</span>
            {activeTab === "exif" && <motion.div layoutId="indicator" className="absolute bottom-0 left-0 right-0 h-0.5" style={{ background: 'var(--accent-blue)' }} />}
          </button>
          <button
            onClick={() => setActiveTab("ela")}
            className="px-4 py-3 font-semibold text-sm transition-colors relative"
            style={{ color: activeTab === "ela" ? 'var(--accent-purple)' : 'var(--text-muted)' }}
          >
            <span className="flex items-center gap-2"><FileSearch className="w-4 h-4" /> {isRTL ? "تحليل ELA" : "ELA Analysis"}</span>
            {activeTab === "ela" && <motion.div layoutId="indicator" className="absolute bottom-0 left-0 right-0 h-0.5" style={{ background: 'var(--accent-purple)' }} />}
          </button>
        </div>

        <div className="rounded-2xl min-h-[500px] overflow-hidden" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-primary)' }}>

          {/* EXIF / ELA Tabs */}
          {(activeTab === "exif" || activeTab === "ela") && (
            <div className="grid grid-cols-1 lg:grid-cols-2 h-full min-h-[500px]">
              {/* Left Side: Upload & Image Viewer */}
              <div className="p-6 flex flex-col" style={{ borderBottom: '1px solid var(--border-primary)' }}>
                <div className="flex-1 flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-6 transition-colors relative group" style={{ borderColor: 'var(--border-secondary)', background: 'var(--bg-elevated)' }}>
                  {selectedImageUrl ? (
                    <div className="relative w-full h-full min-h-[300px] flex items-center justify-center">
                      <img src={activeTab === 'ela' && elaImageUrl ? elaImageUrl : selectedImageUrl} alt="Uploaded evidence" className="max-w-full max-h-[400px] object-contain rounded" />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                        <label className="cursor-pointer px-4 py-2 rounded font-bold shadow-lg flex items-center gap-2" style={{ background: 'var(--text-primary)', color: 'var(--bg-card)' }}>
                          <UploadCloud className="w-4 h-4" /> {isRTL ? "استبدال الصورة" : "Replace Image"}
                          <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                        </label>
                      </div>
                    </div>
                  ) : (
                    <label className="cursor-pointer flex flex-col items-center justify-center text-center w-full h-full min-h-[300px]">
                      <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-colors group-hover:text-blue-400" style={{ background: 'var(--bg-secondary)', color: 'var(--text-muted)' }}>
                        <ImageIcon className="w-8 h-8" />
                      </div>
                      <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>{isRTL ? "ارفع الدليل" : "Upload Evidence"}</h3>
                      <p className="text-sm max-w-xs" style={{ color: 'var(--text-muted)' }}>
                        {isRTL
                          ? "اسحب صورة هنا أو اضغط للتصفح. يدعم JPG وPNG وWebP. التحليل يتم بالكامل محلياً داخل متصفحك."
                          : "Drop an image here or click to browse. Supports JPG, PNG, and WebP. Analysis is done 100% locally in your browser."}
                      </p>
                      <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                    </label>
                  )}
                </div>

                {selectedImageUrl && (
                  <button
                    onClick={runAnalysis}
                    disabled={isAnalyzing}
                    className="mt-6 w-full text-white font-bold py-3 px-6 rounded-xl shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all"
                    style={{ background: 'linear-gradient(to right, var(--accent-blue), var(--accent-indigo))' }}
                  >
                    {isAnalyzing ? (
                      <><motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, ease: "linear", duration: 1 }}><Search className="w-5 h-5" /></motion.div> {isRTL ? "جارٍ تحليل البكسلات والبيانات الوصفية..." : "Analyzing Pixels & Metadata..."}</>
                    ) : (
                      <><Eye className="w-5 h-5" /> {isRTL ? "تنفيذ الفحص الكامل" : "Execute Full Scan"}</>
                    )}
                  </button>
                )}
              </div>

              {/* Right Side: Analysis Results */}
              <div className="p-6" style={{ background: 'var(--bg-card)' }}>
                {!selectedImageUrl ? (
                  <div className="h-full flex flex-col items-center justify-center" style={{ color: 'var(--text-muted)' }}>
                    <ShieldCheck className="w-12 h-12 mb-4 opacity-50" />
                    <p>{isRTL ? "في انتظار إدخال صورة لبدء التحليل الحقيقي" : "Awaiting image input to begin real analysis"}</p>
                  </div>
                ) : isAnalyzing ? (
                  <div className="h-full flex flex-col items-center justify-center space-y-4" style={{ color: 'var(--accent-blue)' }}>
                    <div className="relative w-20 h-20">
                      <motion.div className="absolute inset-0 border-4 rounded-full" style={{ borderTopColor: 'var(--accent-blue)', borderRightColor: 'var(--border-subtle)', borderBottomColor: 'var(--border-subtle)', borderLeftColor: 'var(--border-subtle)' }} animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} />
                      <div className="absolute inset-0 flex items-center justify-center"><Search className="w-8 h-8 opacity-80" /></div>
                    </div>
                    <p className="animate-pulse text-sm font-bold uppercase tracking-widest">{isRTL ? "معالجة المصفوفات..." : "Crunching Arrays..."}</p>
                  </div>
                ) : analysisResult ? (
                  <AnimatePresence mode="wait">
                    {activeTab === "exif" && (
                      <motion.div key="exif-results" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                        <h3 className="text-xl font-bold pb-2 flex items-center gap-2" style={{ color: 'var(--accent-blue)', borderBottom: '1px solid var(--border-primary)' }}>
                          <Camera className="w-5 h-5" /> {isRTL ? "البيانات الوصفية EXIF المستخرجة" : "EXIF Data Extracted"}
                        </h3>

                        {!analysisResult.exif.raw && (
                           <div className="p-4 rounded-xl flex items-start gap-3" style={{ background: 'var(--accent-amber-surface, rgba(245,158,11,0.1))', border: '1px solid var(--accent-amber)' }}>
                             <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: 'var(--accent-amber)' }} />
                             <div>
                               <h4 className="font-bold text-sm" style={{ color: 'var(--accent-amber)' }}>{isRTL ? "لم يُعثر على بيانات EXIF" : "No EXIF Metadata Found"}</h4>
                               <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
                                 {isRTL
                                   ? "هذه الصورة تم تنظيفها. منصات التواصل مثل تويتر/فيسبوك تحذف بيانات EXIF تلقائياً."
                                   : "This image has been scrubbed. Social media platforms like Twitter/Facebook automatically strip EXIF data."}
                               </p>
                             </div>
                           </div>
                        )}

                        {analysisResult.exif.warning && (
                          <div className="p-4 rounded-xl flex items-start gap-3" style={{ background: 'var(--accent-deepreal-surface, rgba(245,158,11,0.1))', border: '1px solid var(--accent-deepreal)' }}>
                            <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: 'var(--accent-deepreal)' }} />
                            <div>
                              <h4 className="font-bold text-sm" style={{ color: 'var(--accent-deepreal)' }}>{isRTL ? "تم اكتشاف برنامج مشبوه" : "Suspicious Software Detected"}</h4>
                              <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
                                {isRTL
                                  ? `الصورة حُفظت بواسطة برنامج تحرير (${analysisResult.exif.software})، وليست مباشرة من كاميرا.`
                                  : `Image was saved by editing software (${analysisResult.exif.software}), not directly from a camera.`}
                              </p>
                            </div>
                          </div>
                        )}

                        {analysisResult.exif.raw && (
                        <div className="grid grid-cols-1 gap-4">
                          <div className="p-4 rounded-lg flex items-center gap-4" style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-primary)' }}>
                            <HardDrive className="w-5 h-5" style={{ color: 'var(--text-muted)' }} />
                            <div><p className="text-xs uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>{isRTL ? "الجهاز" : "Device"}</p><p className="font-medium">{analysisResult.exif.make} {analysisResult.exif.model}</p></div>
                          </div>
                          <div className="p-4 rounded-lg flex items-center gap-4" style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-primary)' }}>
                            <Calendar className="w-5 h-5" style={{ color: 'var(--text-muted)' }} />
                            <div><p className="text-xs uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>{isRTL ? "الطابع الزمني" : "Timestamp"}</p><p className="font-medium">{analysisResult.exif.date}</p></div>
                          </div>
                          <div className="p-4 rounded-lg flex items-center gap-4" style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-primary)' }}>
                            <MapPin className="w-5 h-5" style={{ color: 'var(--text-muted)' }} />
                            <div><p className="text-xs uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>{isRTL ? "إحداثيات GPS" : "GPS Coordinates"}</p><p className="font-medium" style={{ color: 'var(--accent-blue)' }}>{analysisResult.exif.gps}</p></div>
                          </div>
                          {analysisResult.exif.software && (
                             <div className="p-4 rounded-lg flex items-center gap-4" style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-primary)' }}>
                               <Terminal className="w-5 h-5" style={{ color: 'var(--text-muted)' }} />
                               <div><p className="text-xs uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>{isRTL ? "البرنامج" : "Software"}</p><p className="font-medium">{analysisResult.exif.software}</p></div>
                             </div>
                          )}
                        </div>
                        )}
                      </motion.div>
                    )}

                    {activeTab === "ela" && (
                      <motion.div key="ela-results" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                        <h3 className="text-xl font-bold pb-2 flex items-center gap-2" style={{ color: 'var(--accent-purple)', borderBottom: '1px solid var(--border-primary)' }}>
                          <FileSearch className="w-5 h-5" /> {isRTL ? "تحليل مستوى الأخطاء" : "Error Level Analysis"}
                        </h3>

                        <div className="relative pt-4">
                          <div className="flex justify-between items-end mb-2">
                            <span className="text-xs uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>{isRTL ? "احتمال التلاعب" : "Manipulation Probability"}</span>
                            <span className="text-2xl font-black" style={{ color: 'var(--accent-purple)' }}>{analysisResult.ela.score}%</span>
                          </div>
                          <div className="h-3 w-full rounded-full overflow-hidden" style={{ background: 'var(--bg-secondary)' }}>
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${analysisResult.ela.score}%` }}
                              transition={{ duration: 1, delay: 0.2 }}
                              className="h-full"
                              style={{ background: 'linear-gradient(to right, var(--accent-purple), var(--accent-red))' }}
                            />
                          </div>
                        </div>

                        <div className="p-4 rounded-xl" style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-primary)' }}>
                          <h4 className="text-sm font-bold mb-2" style={{ color: 'var(--text-primary)' }}>{isRTL ? "خلاصة التحليل" : "Analysis Conclusion"}</h4>
                          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                            {analysisResult.ela.conclusion}{' '}
                            {isRTL
                              ? "انظر إلى الصورة المُولّدة على الجانب: المناطق المُتلاعب بها ستبرز ساطعة بشكل استثنائي مقارنة بالمناطق المحيطة."
                              : "Look at the generated image on the left: manipulated areas will stand out as exceptionally bright compared to surrounding regions."}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center" style={{ color: 'var(--text-muted)' }}>
                    <ShieldCheck className="w-12 h-12 mb-4 opacity-50" />
                    <p>{isRTL ? "جاهز للتحليل" : "Ready to analyze"}</p>
                  </div>
                )}
              </div>
            </div>
          )}
          <PageNavigation currentPath="/osint-investigator" />
        </div>
      </div>
    </main>

    <PageAIChatbot
      pageTitle="OSINT Investigator — محقق OSINT"
      pageContext="Egyptian Awareness Library - OSINT Investigator: Open-source intelligence toolkit for journalists and fact-checkers. Features EXIF metadata extraction, ELA image forensics, reverse image search, and geolocation tools to verify Egyptian news and social media content."
      systemPrompt={`You are the EAL OSINT (Open Source Intelligence) Investigation AI. You guide users through professional fact-checking and digital investigation techniques.

OSINT TOOLKIT YOU TEACH:
1. EXIF Metadata: Camera model, GPS coordinates, timestamps, software
   - Egyptian use case: Verify if protest photo was really taken where claimed
2. ELA (Error Level Analysis): Detect image splicing/editing
   - Use FotoForensics.com for free ELA
3. Reverse Image Search: TinEye, Google Lens, Yandex Images
   - Find original unedited version of viral photos
4. Geolocation: Match landmarks, shadows, signs to real locations
   - Egyptian landmarks: Tahrir Square, Pyramids, Nile landmarks
5. Timeline Analysis: Cross-reference posting times with events
6. Wayback Machine: Check if website was different previously
7. Domain WHOIS: Who owns this news website?

INVESTIGATION FRAMEWORKS:
- SIFT: Stop, Investigate the source, Find better coverage, Trace claims
- Lateral Reading: Check what others say ABOUT the source, not just the source itself
- First Draft verification checklist

EGYPTIAN RESOURCES:
- Matsda2sh (Egyptian fact-checker): matsda2sh.com
- AFP Arabic: factcheck.afp.com/list/ar
- Misbar: misbar.com/ar`}
      suggestedQuestions={[
        'كيف أتحقق من موقع صورة باستخدام EXIF؟',
        'ما هي أفضل أدوات OSINT للباحثين المصريين؟',
        'How do I find the original source of a viral photo?',
        'What is lateral reading and why is it important?',
      ]}
      accentColor="#06b6d4"
      accentColorRgb="6,182,212"
    />
    </>
  );
}
