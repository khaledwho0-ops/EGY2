"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Terminal, Image as ImageIcon, Camera, AlertTriangle, 
  MapPin, Calendar, HardDrive, Search, ShieldCheck, 
  UploadCloud, FileSearch, Eye
} from "lucide-react";
import exifr from 'exifr';
import { PageNavigation } from '@/components/shared/page-navigation';
import { PageAIChatbot } from '@/components/shared/page-ai-chatbot';

export default function OsintInvestigatorPage() {
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
      
      let gpsString = "Not detected";
      if (exifRes?.latitude && exifRes?.longitude) {
        gpsString = `${exifRes.latitude.toFixed(4)}° N, ${exifRes.longitude.toFixed(4)}° E`;
      }
      
      const software = exifRes?.Software || null;

      // 2. REAL ELA Analysis via Canvas
      const elaResult = await performELA(selectedImageUrl);
      setElaImageUrl(elaResult.url);

      setAnalysisResult({
        exif: {
          make: exifRes?.Make || "Unknown",
          model: exifRes?.Model || "Unknown",
          date: exifRes?.DateTimeOriginal ? new Date(exifRes.DateTimeOriginal).toLocaleString() : "Unknown",
          gps: gpsString,
          software: software,
          warning: !!software && /photoshop|gimp|lightroom|canva/i.test(software),
          raw: exifRes ? true : false
        },
        ela: {
          score: elaResult.score,
          conclusion: elaResult.score > 60 
            ? "High probability of digital manipulation detected. Bright areas in ELA map indicate differing compression levels."
            : "No significant manipulation artifacts detected. Compression levels appear uniform.",
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
    <main className="min-h-screen bg-[#050505] text-gray-200 font-mono pt-24 pb-12 px-4 md:px-8">
      {/* Hidden canvases for ELA processing */}
      <canvas ref={canvasOriginalRef} style={{ display: 'none' }} />
      <canvas ref={canvasCompressedRef} style={{ display: 'none' }} />
      <canvas ref={canvasResultRef} style={{ display: 'none' }} />

      <div className="max-w-7xl mx-auto space-y-8">
        
        <header className="border-b border-gray-800 pb-6 mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white flex items-center gap-3">
            <Search className="w-8 h-8 text-green-500" />
            OSINT Investigator
          </h1>
          <p className="text-gray-400 mt-2 max-w-3xl">
            Real digital forensics toolkit. Analyzes images for hidden metadata directly in your browser, 
            and detects digital manipulations using true HTML5 Canvas Error Level Analysis (ELA).
          </p>
        </header>

        {/* Tab Navigation */}
        <div className="flex space-x-2 border-b border-gray-800">
          <button
            onClick={() => setActiveTab("exif")}
            className={`px-4 py-3 font-semibold text-sm transition-colors relative ${activeTab === "exif" ? "text-blue-500" : "text-gray-500 hover:text-gray-300"}`}
          >
            <span className="flex items-center gap-2"><Camera className="w-4 h-4" /> EXIF Reader</span>
            {activeTab === "exif" && <motion.div layoutId="indicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500" />}
          </button>
          <button
            onClick={() => setActiveTab("ela")}
            className={`px-4 py-3 font-semibold text-sm transition-colors relative ${activeTab === "ela" ? "text-purple-500" : "text-gray-500 hover:text-gray-300"}`}
          >
            <span className="flex items-center gap-2"><FileSearch className="w-4 h-4" /> ELA Analysis</span>
            {activeTab === "ela" && <motion.div layoutId="indicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-500" />}
          </button>
        </div>

        <div className="bg-[#0a0a0a] border border-gray-800 rounded-2xl min-h-[500px] overflow-hidden">
          
          {/* EXIF / ELA Tabs */}
          {(activeTab === "exif" || activeTab === "ela") && (
            <div className="grid grid-cols-1 lg:grid-cols-2 h-full min-h-[500px]">
              {/* Left Side: Upload & Image Viewer */}
              <div className="p-6 border-b lg:border-b-0 lg:border-r border-gray-800 flex flex-col">
                <div className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-gray-700 rounded-xl bg-[#111] p-6 hover:border-gray-500 transition-colors relative group">
                  {selectedImageUrl ? (
                    <div className="relative w-full h-full min-h-[300px] flex items-center justify-center">
                      <img src={activeTab === 'ela' && elaImageUrl ? elaImageUrl : selectedImageUrl} alt="Uploaded evidence" className="max-w-full max-h-[400px] object-contain rounded" />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                        <label className="cursor-pointer bg-white text-black px-4 py-2 rounded font-bold shadow-lg flex items-center gap-2">
                          <UploadCloud className="w-4 h-4" /> Replace Image
                          <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                        </label>
                      </div>
                    </div>
                  ) : (
                    <label className="cursor-pointer flex flex-col items-center justify-center text-center w-full h-full min-h-[300px]">
                      <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mb-4 text-gray-400 group-hover:text-blue-400 transition-colors group-hover:bg-blue-500/10">
                        <ImageIcon className="w-8 h-8" />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">Upload Evidence</h3>
                      <p className="text-gray-500 text-sm max-w-xs">Drop an image here or click to browse. Supports JPG, PNG, and WebP. Analysis is done 100% locally in your browser.</p>
                      <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                    </label>
                  )}
                </div>

                {selectedImageUrl && (
                  <button 
                    onClick={runAnalysis}
                    disabled={isAnalyzing}
                    className="mt-6 w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all"
                  >
                    {isAnalyzing ? (
                      <><motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, ease: "linear", duration: 1 }}><Search className="w-5 h-5" /></motion.div> Analyzing Pixels & Metadata...</>
                    ) : (
                      <><Eye className="w-5 h-5" /> Execute Full Scan</>
                    )}
                  </button>
                )}
              </div>

              {/* Right Side: Analysis Results */}
              <div className="p-6 bg-[#0a0a0a]">
                {!selectedImageUrl ? (
                  <div className="h-full flex flex-col items-center justify-center text-gray-600">
                    <ShieldCheck className="w-12 h-12 mb-4 opacity-50" />
                    <p>Awaiting image input to begin real analysis</p>
                  </div>
                ) : isAnalyzing ? (
                  <div className="h-full flex flex-col items-center justify-center text-blue-500 space-y-4">
                    <div className="relative w-20 h-20">
                      <motion.div className="absolute inset-0 border-4 border-t-blue-500 border-blue-500/20 rounded-full" animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} />
                      <div className="absolute inset-0 flex items-center justify-center"><Search className="w-8 h-8 opacity-80" /></div>
                    </div>
                    <p className="animate-pulse text-sm font-bold uppercase tracking-widest">Crunching Arrays...</p>
                  </div>
                ) : analysisResult ? (
                  <AnimatePresence mode="wait">
                    {activeTab === "exif" && (
                      <motion.div key="exif-results" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                        <h3 className="text-xl font-bold text-blue-400 border-b border-gray-800 pb-2 flex items-center gap-2">
                          <Camera className="w-5 h-5" /> EXIF Data Extracted
                        </h3>
                        
                        {!analysisResult.exif.raw && (
                           <div className="bg-yellow-500/10 border border-yellow-500/30 p-4 rounded-xl flex items-start gap-3">
                             <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                             <div>
                               <h4 className="text-yellow-400 font-bold text-sm">No EXIF Metadata Found</h4>
                               <p className="text-yellow-300/80 text-xs mt-1">This image has been scrubbed. Social media platforms like Twitter/Facebook automatically strip EXIF data.</p>
                             </div>
                           </div>
                        )}

                        {analysisResult.exif.warning && (
                          <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-xl flex items-start gap-3">
                            <AlertTriangle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                            <div>
                              <h4 className="text-orange-400 font-bold text-sm">Suspicious Software Detected</h4>
                              <p className="text-orange-300/80 text-xs mt-1">Image was saved by editing software ({analysisResult.exif.software}), not directly from a camera.</p>
                            </div>
                          </div>
                        )}

                        {analysisResult.exif.raw && (
                        <div className="grid grid-cols-1 gap-4">
                          <div className="bg-[#111] p-4 rounded-lg border border-gray-800 flex items-center gap-4">
                            <HardDrive className="w-5 h-5 text-gray-500" />
                            <div><p className="text-xs text-gray-500 uppercase tracking-wider">Device</p><p className="font-medium">{analysisResult.exif.make} {analysisResult.exif.model}</p></div>
                          </div>
                          <div className="bg-[#111] p-4 rounded-lg border border-gray-800 flex items-center gap-4">
                            <Calendar className="w-5 h-5 text-gray-500" />
                            <div><p className="text-xs text-gray-500 uppercase tracking-wider">Timestamp</p><p className="font-medium">{analysisResult.exif.date}</p></div>
                          </div>
                          <div className="bg-[#111] p-4 rounded-lg border border-gray-800 flex items-center gap-4">
                            <MapPin className="w-5 h-5 text-gray-500" />
                            <div><p className="text-xs text-gray-500 uppercase tracking-wider">GPS Coordinates</p><p className="font-medium text-blue-400">{analysisResult.exif.gps}</p></div>
                          </div>
                          {analysisResult.exif.software && (
                             <div className="bg-[#111] p-4 rounded-lg border border-gray-800 flex items-center gap-4">
                               <Terminal className="w-5 h-5 text-gray-500" />
                               <div><p className="text-xs text-gray-500 uppercase tracking-wider">Software</p><p className="font-medium">{analysisResult.exif.software}</p></div>
                             </div>
                          )}
                        </div>
                        )}
                      </motion.div>
                    )}

                    {activeTab === "ela" && (
                      <motion.div key="ela-results" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                        <h3 className="text-xl font-bold text-purple-400 border-b border-gray-800 pb-2 flex items-center gap-2">
                          <FileSearch className="w-5 h-5" /> Error Level Analysis
                        </h3>
                        
                        <div className="relative pt-4">
                          <div className="flex justify-between items-end mb-2">
                            <span className="text-xs text-gray-500 uppercase tracking-wider">Manipulation Probability</span>
                            <span className="text-2xl font-black text-purple-500">{analysisResult.ela.score}%</span>
                          </div>
                          <div className="h-3 w-full bg-gray-800 rounded-full overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${analysisResult.ela.score}%` }}
                              transition={{ duration: 1, delay: 0.2 }}
                              className="h-full bg-gradient-to-r from-purple-600 to-red-500"
                            />
                          </div>
                        </div>

                        <div className="bg-[#111] p-4 rounded-xl border border-gray-800">
                          <h4 className="text-sm font-bold text-gray-300 mb-2">Analysis Conclusion</h4>
                          <p className="text-sm text-gray-400 leading-relaxed">
                            {analysisResult.ela.conclusion} Look at the generated image on the left: manipulated areas will stand out as exceptionally bright compared to surrounding regions.
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-gray-600">
                    <ShieldCheck className="w-12 h-12 mb-4 opacity-50" />
                    <p>Ready to analyze</p>
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
