"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRTL } from "@/components/shared/rtl-provider";
import { Terminal, Download, FileCode, CheckCircle2 } from "lucide-react";
import { PageNavigation } from '@/components/shared/page-navigation';

const SCRIPTS = [
  {
    id: "bot_hunter",
    name: "bot_hunter.py",
    url: "/scripts/bot_hunter.py",
    desc: { 
      en: "Scans social media API to identify coordinated bot patterns and inauthentic behavior.", 
      ar: "يفحص واجهة برمجة تطبيقات وسائل التواصل الاجتماعي لتحديد أنماط الروبوتات المنسقة." 
    },
    size: "2 KB"
  },
  {
    id: "ela_analyzer",
    name: "ela_analyzer.py",
    url: "/scripts/ela_analyzer.py",
    desc: { 
      en: "Offline Error Level Analysis (ELA) script to detect digital image manipulation via Pillow.", 
      ar: "نص تحليل مستوى الخطأ (ELA) دون اتصال للكشف عن تلاعب الصور الرقمية." 
    },
    size: "3 KB"
  },
  {
    id: "pdf_metadata",
    name: "pdf_metadata.py",
    url: "/scripts/pdf_metadata.py",
    desc: { 
      en: "Extracts hidden author, producer, and creation date metadata from PDFs.", 
      ar: "يستخرج البيانات الوصفية المخفية للمؤلف وتاريخ الإنشاء من ملفات PDF." 
    },
    size: "2 KB"
  }
];

export default function ToolsDownloadPage() {
  const { isRTL, t } = useRTL();
  const [downloaded, setDownloaded] = useState<string[]>([]);

  const handleDownload = (id: string, url: string, name: string) => {
    // True Download using standard a-tag
    const element = document.createElement("a");
    element.href = url;
    element.download = name;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    setDownloaded(prev => [...prev, id]);
  };

  return (
    <div style={{ paddingTop: "var(--navbar-height)", minHeight: "100vh", backgroundColor: "var(--bg-base)", direction: isRTL ? "rtl" : "ltr" }}>
      <div className="container" style={{ padding: "var(--space-xl) var(--space-lg)" }}>
        <nav style={{ marginBottom: 24 }}>
          <Link href="/dashboard" style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "var(--text-muted)", textDecoration: "none", fontSize: "0.9rem" }}>
            {isRTL ? "→" : "←"} {t({ en: "Back to Dashboard", ar: "العودة إلى لوحة القيادة" })}
          </Link>
        </nav>

        <div style={{ textAlign: "center", maxWidth: 800, margin: "0 auto 48px auto" }}>
          <Terminal size={48} style={{ color: "var(--accent-primary)", marginBottom: 16 }} />
          <h1 style={{ fontSize: "2.5rem", marginBottom: 16 }}>{t({ en: "Offline Verification Tools", ar: "أدوات التحقق دون اتصال" })}</h1>
          <p style={{ fontSize: "1.2rem", color: "var(--text-muted)", lineHeight: 1.6 }}>
            {t({ 
              en: "The truth shouldn't depend on our servers. Download these REAL Python scripts to run the EAL forensic capabilities locally on your own machine. We do not fake functionality.", 
              ar: "يجب ألا تعتمد الحقيقة على خوادمنا. قم بتنزيل هذه البرامج النصية (بايثون) الحقيقية لتشغيل قدرات الطب الشرعي محليًا." 
            })}
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24, maxWidth: 1000, margin: "0 auto" }}>
          {SCRIPTS.map(script => (
            <div key={script.id} style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)", padding: 24, display: "flex", flexDirection: "column" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                <div style={{ padding: 12, backgroundColor: "rgba(100,200,255,0.1)", borderRadius: "var(--radius-md)" }}>
                  <FileCode size={24} style={{ color: "var(--accent-primary)" }} />
                </div>
                <h3 style={{ margin: 0, fontSize: "1.2rem" }}>{script.name}</h3>
              </div>
              <p style={{ color: "var(--text-muted)", flex: 1, marginBottom: 24, lineHeight: 1.5 }}>
                {script.desc[isRTL ? 'ar' : 'en']}
              </p>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid var(--border)", paddingTop: 16 }}>
                <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>{script.size}</span>
                <button 
                  onClick={() => handleDownload(script.id, script.url, script.name)}
                  style={{ 
                    display: "flex", alignItems: "center", gap: 8, padding: "8px 16px",
                    backgroundColor: downloaded.includes(script.id) ? "rgba(100,200,100,0.1)" : "var(--accent-primary)",
                    color: downloaded.includes(script.id) ? "var(--accent-success)" : "var(--bg-base)",
                    border: "none", borderRadius: "var(--radius-full)", cursor: "pointer", fontWeight: 600
                  }}
                >
                  {downloaded.includes(script.id) ? (
                    <><CheckCircle2 size={16} /> {t({ en: "Downloaded", ar: "تم التنزيل" })}</>
                  ) : (
                    <><Download size={16} /> {t({ en: "Download", ar: "تنزيل" })}</>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 64, padding: 32, backgroundColor: "var(--bg-card)", borderRadius: "var(--radius-lg)", border: "1px dashed var(--border)", textAlign: "center", maxWidth: 800, margin: "64px auto 0" }}>
          <h3 style={{ margin: "0 0 16px 0", fontSize: "1.5rem" }}>{t({ en: "Requirements", ar: "المتطلبات" })}</h3>
          <p style={{ color: "var(--text-muted)", marginBottom: 12 }}>
            {t({ en: "You will need Python 3.9+ and pip installed.", ar: "ستحتاج إلى تثبيت Python 3.9+ و pip." })}
          </p>
          <pre style={{ backgroundColor: "#000", padding: 12, borderRadius: 8, color: "#0f0", display: "inline-block" }}>
            pip install requests tweepy Pillow PyPDF2
          </pre>
        </div>

      </div>
      <PageNavigation currentPath="/tools-download" />
    </div>
  );
}
