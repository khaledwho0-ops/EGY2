"use client";
import { PageNavigation } from '@/components/shared/page-navigation';
import dynamic from "next/dynamic";
const SourcePyramid3D = dynamic(
  () => import("@/components/pyramid/SourcePyramid").then(mod => mod.SourcePyramid3D),
  { ssr: false }
);
import { FortressTour } from "@/components/onboarding/Tour";
import { MaqasidReasoningCheck } from "@/components/religion/MaqasidCheck";
import { CalmRoot, Reveal } from "@/components/calm/CalmReveal";
import Link from "next/link";
import { useRTL } from "@/components/shared/rtl-provider";
import { ConceptExplainer } from "@/components/shared/concept-explainer";

export default function DemoDashboard() {
  const { isRTL, t } = useRTL();

  const impacts = [
    {
      code: "NAFS",
      effect: "harms",
      explanation: t({
        en: "Physical beating during 'ruqyah' endangers bodily integrity.",
        ar: "الضرب الجسدي أثناء 'الرقية' يعرّض سلامة الجسد للخطر.",
      }),
    },
    {
      code: "MAL",
      effect: "harms",
      explanation: t({
        en: "Exorbitant fees exploit the vulnerable.",
        ar: "الرسوم الباهظة تستغل الضعفاء.",
      }),
    },
    {
      code: "DIN",
      effect: "harms",
      explanation: t({
        en: "Encourages reliance on practitioners instead of direct supplication.",
        ar: "يشجع الاعتماد على الممارسين بدلاً من الدعاء المباشر.",
      }),
    },
  ];

  return (
    <CalmRoot>
      <FortressTour />
      <div className="min-h-screen bg-gray-50 text-gray-900 font-sans p-8" dir={isRTL ? "rtl" : "ltr"}>
        <Reveal delay={0.1}>
          <div className="max-w-6xl mx-auto">
            <header className="mb-12 text-center">
              <h1 className="text-4xl font-extrabold text-slate-800 mb-4">
                {t({ en: "Cognitive Fortress Dashboard", ar: "لوحة تحكم الحصن المعرفي" })}
              </h1>
              <p className="text-lg text-slate-600">
                {t({
                  en: "The unyielding architecture of the Egyptian Awareness Library — a comprehensive defense system against misinformation.",
                  ar: "البنية الراسخة لمكتبة الوعي المصرية — نظام دفاع شامل ضد المعلومات المضللة.",
                })}
              </p>
              <div className="mt-3 flex justify-center gap-3 flex-wrap">
                <ConceptExplainer term={t({ en: "Cognitive Fortress", ar: "الحصن المعرفي" })} explanation={t({ en: "A multi-layered defense system inspired by inoculation theory (Van der Linden, 2020) — pre-emptive exposure to weakened misinformation arguments to build psychological resistance.", ar: "نظام دفاع متعدد الطبقات مستوحى من نظرية التلقيح (فان در ليندن، 2020) — التعرض الوقائي لحجج مضللة ضعيفة لبناء المقاومة النفسية." })} type="scientific" />
                <ConceptExplainer term={t({ en: "Maqāṣid al-Sharīʿah", ar: "مقاصد الشريعة" })} explanation={t({ en: "The five higher objectives of Islamic law: preservation of Religion (dīn), Life (nafs), Intellect (ʿaql), Lineage (nasl), and Wealth (māl) — as formulated by Imam al-Shāṭibī (d. 1388).", ar: "الأهداف الخمسة العليا للشريعة الإسلامية: حفظ الدين والنفس والعقل والنسل والمال — كما صاغها الإمام الشاطبي (ت. 1388)." })} type="islamic" />
              </div>

              <div className="mt-8 flex justify-center gap-4 flex-wrap">
                <Link href="/religion-hub/hadith/lessons" className="px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition shadow">
                  {t({ en: "View Hadith Literacy", ar: "عرض محو أمية الحديث" })}
                </Link>
                <Link href="/mental-health/depression" className="px-6 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 transition shadow">
                  {t({ en: "View Mental Health Crisis Interrupt", ar: "عرض مقاطعة أزمة الصحة النفسية" })}
                </Link>
                <Link href="/science" className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition shadow">
                  {t({ en: "Science Hub", ar: "مركز العلوم" })}
                </Link>
              </div>
            </header>

            <div className="grid md:grid-cols-2 gap-12">
              <section id="pyramid" className="bg-white p-6 rounded-xl shadow-lg border border-slate-100">
                <h2 className="text-2xl font-bold mb-4 text-slate-800 border-b pb-2">
                  {t({ en: "The Source Pyramid", ar: "هرم المصادر" })}
                </h2>
                <p className="text-sm text-slate-500 mb-6">
                  {t({
                    en: "Interactive 3D representation of the Cochrane tiers of evidence — from systematic reviews (highest) to anecdotal reports (lowest).",
                    ar: "تمثيل ثلاثي الأبعاد تفاعلي لمستويات كوكرين للأدلة — من المراجعات المنهجية (الأعلى) إلى التقارير الشخصية (الأدنى).",
                  })}
                </p>
                <SourcePyramid3D highlightTier="1" />
              </section>

              <section id="mist-card" className="bg-white p-6 rounded-xl shadow-lg border border-slate-100 flex flex-col justify-center items-center text-center">
                <h2 className="text-2xl font-bold mb-4 text-slate-800">
                  {t({ en: "MIST Vulnerability Check", ar: "فحص الضعف MIST" })}
                </h2>
                <p className="text-slate-600 mb-4 max-w-sm">
                  {t({
                    en: "Take the 2-minute test to see which manipulation techniques you are most susceptible to.",
                    ar: "أجرِ الاختبار لمدة دقيقتين لمعرفة أي تقنيات تلاعب أنت الأكثر عرضة لها.",
                  })}
                </p>
                <ConceptExplainer term="MIST-20" explanation={t({ en: "Misinformation Susceptibility Test — a validated 20-item scale by Maertens et al. (2023) measuring individual vulnerability to fake news across veracity discernment and response bias dimensions.", ar: "اختبار القابلية للمعلومات المضللة — مقياس مصادق عليه من 20 عنصراً بواسطة مارتنز وآخرون (2023) يقيس الضعف الفردي أمام الأخبار الكاذبة." })} type="scientific" />
                <Link href="/assessment" className="mt-4 px-8 py-3 bg-blue-600 text-white rounded-full shadow-md font-bold hover:bg-blue-700 transition">
                  {t({ en: "Start MIST", ar: "ابدأ اختبار MIST" })}
                </Link>
              </section>

              <section id="sift-bar" className="md:col-span-2 bg-white p-6 rounded-xl shadow-lg border border-slate-100">
                <h2 className="text-2xl font-bold mb-4 text-slate-800 border-b pb-2">
                  {t({ en: "Maqāṣid Reasoning Tool (Anti-Exploitation)", ar: "أداة التفكير المقاصدي (مكافحة الاستغلال)" })}
                </h2>
                <p className="text-sm text-slate-500 mb-6">
                  {t({
                    en: "Analysis of a fraudulent Ruqyah practitioner based on the 5 objectives of Sharīʿah — protecting religion, life, intellect, lineage, and wealth.",
                    ar: "تحليل معالج رقية مزيف بناءً على مقاصد الشريعة الخمسة — حفظ الدين والنفس والعقل والنسل والمال.",
                  })}
                </p>
                <MaqasidReasoningCheck impacts={impacts} />
              </section>
            </div>

            <div className="mt-12">
              <PageNavigation currentPath="/demo" />
            </div>
          </div>
        </Reveal>
      </div>
    </CalmRoot>
  );
}
