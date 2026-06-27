export interface TranslatableString {
  en: string;
  ar: string;
}

export interface RoadmapItem {
  id: string;
  name: TranslatableString;
  href: string;
  scientificMechanics: TranslatableString;
  bestUseCases: TranslatableString;
  copyPasteScenario: string;
}

export interface RoadmapCategory {
  id: string;
  title: TranslatableString;
  description: TranslatableString;
  items: RoadmapItem[];
}

export const ROADMAP_DATA: RoadmapCategory[] = [
  {
    "id": "core-platform",
    "title": {
      "en": "Core Platform",
      "ar": "المنصة الأساسية"
    },
    "description": {
      "en": "The foundational interfaces of the Egyptian Awareness Library.",
      "ar": "الواجهات الأساسية لمكتبة الوعي المصرية."
    },
    "items": [
      {
        "id": "item-0-0",
        "href": "/",
        "name": {
          "en": "Home",
          "ar": "الرئيسية"
        },
        "scientificMechanics": {
          "en": "Applies evidence-based prebunking and digital literacy heuristics to fortify cognitive resilience within the Home domain.",
          "ar": "يطبق أساليب التفنيد الاستباقي المستندة إلى الأدلة ومهارات الوعي الرقمي لتعزيز المرونة المعرفية ضمن مجال Home."
        },
        "bestUseCases": {
          "en": "Ideal for daily inoculation exercises or when encountering questionable media narratives related to Home.",
          "ar": "مثالي لتمارين التلقيح المعرفي اليومية أو عند مواجهة روايات إعلامية مشكوك فيها تتعلق بـ Home."
        },
        "copyPasteScenario": "> INITIATE PROTOCOL: HOME\n> TARGET: Active vulnerability scanning\n> THREAT LEVEL: 1/5\n> ACTION: Deploying Home heuristics...\n> STATUS: Verified and secured."
      },
      {
        "id": "item-0-1",
        "href": "/project-vision",
        "name": {
          "en": "Project Anatomy",
          "ar": "هيكلة المشروع"
        },
        "scientificMechanics": {
          "en": "Applies evidence-based prebunking and digital literacy heuristics to fortify cognitive resilience within the Project Anatomy domain.",
          "ar": "يطبق أساليب التفنيد الاستباقي المستندة إلى الأدلة ومهارات الوعي الرقمي لتعزيز المرونة المعرفية ضمن مجال Project Anatomy."
        },
        "bestUseCases": {
          "en": "Ideal for daily inoculation exercises or when encountering questionable media narratives related to Project Anatomy.",
          "ar": "مثالي لتمارين التلقيح المعرفي اليومية أو عند مواجهة روايات إعلامية مشكوك فيها تتعلق بـ Project Anatomy."
        },
        "copyPasteScenario": "> INITIATE PROTOCOL: PROJECT_ANATOMY\n> TARGET: Active vulnerability scanning\n> THREAT LEVEL: 2/5\n> ACTION: Deploying Project Anatomy heuristics...\n> STATUS: Verified and secured."
      },
      {
        "id": "item-0-2",
        "href": "/dashboard",
        "name": {
          "en": "Dashboard",
          "ar": "لوحة القيادة"
        },
        "scientificMechanics": {
          "en": "Aggregates real-time threat intelligence and cognitive vulnerability metrics into a centralized visualization matrix for systemic oversight.",
          "ar": "يجمع معلومات التهديد في الوقت الفعلي ومقاييس الضعف المعرفي في مصفوفة تصور مركزية للرقابة المنهجية."
        },
        "bestUseCases": {
          "en": "Ideal for daily inoculation exercises or when encountering questionable media narratives related to Dashboard.",
          "ar": "مثالي لتمارين التلقيح المعرفي اليومية أو عند مواجهة روايات إعلامية مشكوك فيها تتعلق بـ Dashboard."
        },
        "copyPasteScenario": "> INITIATE PROTOCOL: DASHBOARD\n> TARGET: Active vulnerability scanning\n> THREAT LEVEL: 3/5\n> ACTION: Deploying Dashboard heuristics...\n> STATUS: Verified and secured."
      },
      {
        "id": "item-0-3",
        "href": "/guide",
        "name": {
          "en": "Guide",
          "ar": "الدليل"
        },
        "scientificMechanics": {
          "en": "Applies evidence-based prebunking and digital literacy heuristics to fortify cognitive resilience within the Guide domain.",
          "ar": "يطبق أساليب التفنيد الاستباقي المستندة إلى الأدلة ومهارات الوعي الرقمي لتعزيز المرونة المعرفية ضمن مجال Guide."
        },
        "bestUseCases": {
          "en": "Ideal for daily inoculation exercises or when encountering questionable media narratives related to Guide.",
          "ar": "مثالي لتمارين التلقيح المعرفي اليومية أو عند مواجهة روايات إعلامية مشكوك فيها تتعلق بـ Guide."
        },
        "copyPasteScenario": "> INITIATE PROTOCOL: GUIDE\n> TARGET: Active vulnerability scanning\n> THREAT LEVEL: 4/5\n> ACTION: Deploying Guide heuristics...\n> STATUS: Verified and secured."
      },
      {
        "id": "item-0-4",
        "href": "/onboarding",
        "name": {
          "en": "Tour / Onboarding",
          "ar": "الجولة التوجيهية"
        },
        "scientificMechanics": {
          "en": "Applies evidence-based prebunking and digital literacy heuristics to fortify cognitive resilience within the Tour / Onboarding domain.",
          "ar": "يطبق أساليب التفنيد الاستباقي المستندة إلى الأدلة ومهارات الوعي الرقمي لتعزيز المرونة المعرفية ضمن مجال Tour / Onboarding."
        },
        "bestUseCases": {
          "en": "Ideal for daily inoculation exercises or when encountering questionable media narratives related to Tour / Onboarding.",
          "ar": "مثالي لتمارين التلقيح المعرفي اليومية أو عند مواجهة روايات إعلامية مشكوك فيها تتعلق بـ Tour / Onboarding."
        },
        "copyPasteScenario": "> INITIATE PROTOCOL: TOUR___ONBOARDING\n> TARGET: Active vulnerability scanning\n> THREAT LEVEL: 5/5\n> ACTION: Deploying Tour / Onboarding heuristics...\n> STATUS: Verified and secured."
      },
      {
        "id": "item-0-5",
        "href": "#language",
        "name": {
          "en": "Language Select",
          "ar": "اختيار اللغة"
        },
        "scientificMechanics": {
          "en": "Applies evidence-based prebunking and digital literacy heuristics to fortify cognitive resilience within the Language Select domain.",
          "ar": "يطبق أساليب التفنيد الاستباقي المستندة إلى الأدلة ومهارات الوعي الرقمي لتعزيز المرونة المعرفية ضمن مجال Language Select."
        },
        "bestUseCases": {
          "en": "Ideal for daily inoculation exercises or when encountering questionable media narratives related to Language Select.",
          "ar": "مثالي لتمارين التلقيح المعرفي اليومية أو عند مواجهة روايات إعلامية مشكوك فيها تتعلق بـ Language Select."
        },
        "copyPasteScenario": "> INITIATE PROTOCOL: LANGUAGE_SELECT\n> TARGET: Active vulnerability scanning\n> THREAT LEVEL: 1/5\n> ACTION: Deploying Language Select heuristics...\n> STATUS: Verified and secured."
      },
      {
        "id": "item-0-6",
        "href": "/engines-guide",
        "name": {
          "en": "Master the Engines Guide 🧭",
          "ar": "دليل إتقان المحركات 🧭"
        },
        "scientificMechanics": {
          "en": "Applies evidence-based prebunking and digital literacy heuristics to fortify cognitive resilience within the Master the Engines Guide 🧭 domain.",
          "ar": "يطبق أساليب التفنيد الاستباقي المستندة إلى الأدلة ومهارات الوعي الرقمي لتعزيز المرونة المعرفية ضمن مجال Master the Engines Guide 🧭."
        },
        "bestUseCases": {
          "en": "Ideal for daily inoculation exercises or when encountering questionable media narratives related to Master the Engines Guide 🧭.",
          "ar": "مثالي لتمارين التلقيح المعرفي اليومية أو عند مواجهة روايات إعلامية مشكوك فيها تتعلق بـ Master the Engines Guide 🧭."
        },
        "copyPasteScenario": "> INITIATE PROTOCOL: MASTER_THE_ENGINES_GUIDE___\n> TARGET: Active vulnerability scanning\n> THREAT LEVEL: 2/5\n> ACTION: Deploying Master the Engines Guide 🧭 heuristics...\n> STATUS: Verified and secured."
      }
    ]
  },
  {
    "id": "deepreal-track",
    "title": {
      "en": "DeepReal Track",
      "ar": "مسار التحليل العميق"
    },
    "description": {
      "en": "Specialized forensic and orchestration nodes for DeepReal Track.",
      "ar": "عقد تحليلية متخصصة وإدارية لـ مسار التحليل العميق."
    },
    "items": [
      {
        "id": "item-1-0",
        "href": "/deepreal",
        "name": {
          "en": "DeepReal Hub",
          "ar": "مركز التحليل العميق"
        },
        "scientificMechanics": {
          "en": "Applies evidence-based prebunking and digital literacy heuristics to fortify cognitive resilience within the DeepReal Hub domain.",
          "ar": "يطبق أساليب التفنيد الاستباقي المستندة إلى الأدلة ومهارات الوعي الرقمي لتعزيز المرونة المعرفية ضمن مجال DeepReal Hub."
        },
        "bestUseCases": {
          "en": "Ideal for daily inoculation exercises or when encountering questionable media narratives related to DeepReal Hub.",
          "ar": "مثالي لتمارين التلقيح المعرفي اليومية أو عند مواجهة روايات إعلامية مشكوك فيها تتعلق بـ DeepReal Hub."
        },
        "copyPasteScenario": "> INITIATE PROTOCOL: DEEPREAL_HUB\n> TARGET: Active vulnerability scanning\n> THREAT LEVEL: 1/5\n> ACTION: Deploying DeepReal Hub heuristics...\n> STATUS: Verified and secured."
      },
      {
        "id": "item-1-1",
        "href": "/deepreal/exercise/day-1",
        "name": {
          "en": "DeepReal — Day 1",
          "ar": "DeepReal — اليوم 1"
        },
        "scientificMechanics": {
          "en": "Sequential micro-learning protocol utilizing spaced repetition to embed critical evaluation heuristics for module DeepReal — Day 1.",
          "ar": "بروتوكول تعلم مصغر متسلسل يستخدم التكرار المتباعد لترسيخ مهارات التقييم النقدي لوحدة DeepReal — Day 1."
        },
        "bestUseCases": {
          "en": "Daily structured habit-building exercise designed to gradually increase cognitive resilience over the curriculum period.",
          "ar": "تمرين يومي مهيكل لبناء العادات مصمم لزيادة المرونة المعرفية تدريجياً على مدار فترة المنهج."
        },
        "copyPasteScenario": "> INITIATE PROTOCOL: DEEPREAL___DAY_1\n> TARGET: Active vulnerability scanning\n> THREAT LEVEL: 2/5\n> ACTION: Deploying DeepReal — Day 1 heuristics...\n> STATUS: Verified and secured."
      },
      {
        "id": "item-1-2",
        "href": "/deepreal/exercise/day-2",
        "name": {
          "en": "DeepReal — Day 2",
          "ar": "DeepReal — اليوم 2"
        },
        "scientificMechanics": {
          "en": "Sequential micro-learning protocol utilizing spaced repetition to embed critical evaluation heuristics for module DeepReal — Day 2.",
          "ar": "بروتوكول تعلم مصغر متسلسل يستخدم التكرار المتباعد لترسيخ مهارات التقييم النقدي لوحدة DeepReal — Day 2."
        },
        "bestUseCases": {
          "en": "Daily structured habit-building exercise designed to gradually increase cognitive resilience over the curriculum period.",
          "ar": "تمرين يومي مهيكل لبناء العادات مصمم لزيادة المرونة المعرفية تدريجياً على مدار فترة المنهج."
        },
        "copyPasteScenario": "> INITIATE PROTOCOL: DEEPREAL___DAY_2\n> TARGET: Active vulnerability scanning\n> THREAT LEVEL: 3/5\n> ACTION: Deploying DeepReal — Day 2 heuristics...\n> STATUS: Verified and secured."
      },
      {
        "id": "item-1-3",
        "href": "/deepreal/exercise/day-3",
        "name": {
          "en": "DeepReal — Day 3",
          "ar": "DeepReal — اليوم 3"
        },
        "scientificMechanics": {
          "en": "Sequential micro-learning protocol utilizing spaced repetition to embed critical evaluation heuristics for module DeepReal — Day 3.",
          "ar": "بروتوكول تعلم مصغر متسلسل يستخدم التكرار المتباعد لترسيخ مهارات التقييم النقدي لوحدة DeepReal — Day 3."
        },
        "bestUseCases": {
          "en": "Daily structured habit-building exercise designed to gradually increase cognitive resilience over the curriculum period.",
          "ar": "تمرين يومي مهيكل لبناء العادات مصمم لزيادة المرونة المعرفية تدريجياً على مدار فترة المنهج."
        },
        "copyPasteScenario": "> INITIATE PROTOCOL: DEEPREAL___DAY_3\n> TARGET: Active vulnerability scanning\n> THREAT LEVEL: 4/5\n> ACTION: Deploying DeepReal — Day 3 heuristics...\n> STATUS: Verified and secured."
      },
      {
        "id": "item-1-4",
        "href": "/deepreal/exercise/day-4",
        "name": {
          "en": "DeepReal — Day 4",
          "ar": "DeepReal — اليوم 4"
        },
        "scientificMechanics": {
          "en": "Sequential micro-learning protocol utilizing spaced repetition to embed critical evaluation heuristics for module DeepReal — Day 4.",
          "ar": "بروتوكول تعلم مصغر متسلسل يستخدم التكرار المتباعد لترسيخ مهارات التقييم النقدي لوحدة DeepReal — Day 4."
        },
        "bestUseCases": {
          "en": "Daily structured habit-building exercise designed to gradually increase cognitive resilience over the curriculum period.",
          "ar": "تمرين يومي مهيكل لبناء العادات مصمم لزيادة المرونة المعرفية تدريجياً على مدار فترة المنهج."
        },
        "copyPasteScenario": "> INITIATE PROTOCOL: DEEPREAL___DAY_4\n> TARGET: Active vulnerability scanning\n> THREAT LEVEL: 5/5\n> ACTION: Deploying DeepReal — Day 4 heuristics...\n> STATUS: Verified and secured."
      },
      {
        "id": "item-1-5",
        "href": "/deepreal/exercise/day-5",
        "name": {
          "en": "DeepReal — Day 5",
          "ar": "DeepReal — اليوم 5"
        },
        "scientificMechanics": {
          "en": "Sequential micro-learning protocol utilizing spaced repetition to embed critical evaluation heuristics for module DeepReal — Day 5.",
          "ar": "بروتوكول تعلم مصغر متسلسل يستخدم التكرار المتباعد لترسيخ مهارات التقييم النقدي لوحدة DeepReal — Day 5."
        },
        "bestUseCases": {
          "en": "Daily structured habit-building exercise designed to gradually increase cognitive resilience over the curriculum period.",
          "ar": "تمرين يومي مهيكل لبناء العادات مصمم لزيادة المرونة المعرفية تدريجياً على مدار فترة المنهج."
        },
        "copyPasteScenario": "> INITIATE PROTOCOL: DEEPREAL___DAY_5\n> TARGET: Active vulnerability scanning\n> THREAT LEVEL: 1/5\n> ACTION: Deploying DeepReal — Day 5 heuristics...\n> STATUS: Verified and secured."
      },
      {
        "id": "item-1-6",
        "href": "/deepreal/exercise/day-6",
        "name": {
          "en": "DeepReal — Day 6",
          "ar": "DeepReal — اليوم 6"
        },
        "scientificMechanics": {
          "en": "Sequential micro-learning protocol utilizing spaced repetition to embed critical evaluation heuristics for module DeepReal — Day 6.",
          "ar": "بروتوكول تعلم مصغر متسلسل يستخدم التكرار المتباعد لترسيخ مهارات التقييم النقدي لوحدة DeepReal — Day 6."
        },
        "bestUseCases": {
          "en": "Daily structured habit-building exercise designed to gradually increase cognitive resilience over the curriculum period.",
          "ar": "تمرين يومي مهيكل لبناء العادات مصمم لزيادة المرونة المعرفية تدريجياً على مدار فترة المنهج."
        },
        "copyPasteScenario": "> INITIATE PROTOCOL: DEEPREAL___DAY_6\n> TARGET: Active vulnerability scanning\n> THREAT LEVEL: 2/5\n> ACTION: Deploying DeepReal — Day 6 heuristics...\n> STATUS: Verified and secured."
      },
      {
        "id": "item-1-7",
        "href": "/deepreal/exercise/day-7",
        "name": {
          "en": "DeepReal — Day 7",
          "ar": "DeepReal — اليوم 7"
        },
        "scientificMechanics": {
          "en": "Sequential micro-learning protocol utilizing spaced repetition to embed critical evaluation heuristics for module DeepReal — Day 7.",
          "ar": "بروتوكول تعلم مصغر متسلسل يستخدم التكرار المتباعد لترسيخ مهارات التقييم النقدي لوحدة DeepReal — Day 7."
        },
        "bestUseCases": {
          "en": "Daily structured habit-building exercise designed to gradually increase cognitive resilience over the curriculum period.",
          "ar": "تمرين يومي مهيكل لبناء العادات مصمم لزيادة المرونة المعرفية تدريجياً على مدار فترة المنهج."
        },
        "copyPasteScenario": "> INITIATE PROTOCOL: DEEPREAL___DAY_7\n> TARGET: Active vulnerability scanning\n> THREAT LEVEL: 3/5\n> ACTION: Deploying DeepReal — Day 7 heuristics...\n> STATUS: Verified and secured."
      },
      {
        "id": "item-1-8",
        "href": "/deepreal/exercise/day-8",
        "name": {
          "en": "DeepReal — Day 8",
          "ar": "DeepReal — اليوم 8"
        },
        "scientificMechanics": {
          "en": "Sequential micro-learning protocol utilizing spaced repetition to embed critical evaluation heuristics for module DeepReal — Day 8.",
          "ar": "بروتوكول تعلم مصغر متسلسل يستخدم التكرار المتباعد لترسيخ مهارات التقييم النقدي لوحدة DeepReal — Day 8."
        },
        "bestUseCases": {
          "en": "Daily structured habit-building exercise designed to gradually increase cognitive resilience over the curriculum period.",
          "ar": "تمرين يومي مهيكل لبناء العادات مصمم لزيادة المرونة المعرفية تدريجياً على مدار فترة المنهج."
        },
        "copyPasteScenario": "> INITIATE PROTOCOL: DEEPREAL___DAY_8\n> TARGET: Active vulnerability scanning\n> THREAT LEVEL: 4/5\n> ACTION: Deploying DeepReal — Day 8 heuristics...\n> STATUS: Verified and secured."
      },
      {
        "id": "item-1-9",
        "href": "/deepreal/exercise/day-9",
        "name": {
          "en": "DeepReal — Day 9",
          "ar": "DeepReal — اليوم 9"
        },
        "scientificMechanics": {
          "en": "Sequential micro-learning protocol utilizing spaced repetition to embed critical evaluation heuristics for module DeepReal — Day 9.",
          "ar": "بروتوكول تعلم مصغر متسلسل يستخدم التكرار المتباعد لترسيخ مهارات التقييم النقدي لوحدة DeepReal — Day 9."
        },
        "bestUseCases": {
          "en": "Daily structured habit-building exercise designed to gradually increase cognitive resilience over the curriculum period.",
          "ar": "تمرين يومي مهيكل لبناء العادات مصمم لزيادة المرونة المعرفية تدريجياً على مدار فترة المنهج."
        },
        "copyPasteScenario": "> INITIATE PROTOCOL: DEEPREAL___DAY_9\n> TARGET: Active vulnerability scanning\n> THREAT LEVEL: 5/5\n> ACTION: Deploying DeepReal — Day 9 heuristics...\n> STATUS: Verified and secured."
      },
      {
        "id": "item-1-10",
        "href": "/deepreal/exercise/day-10",
        "name": {
          "en": "DeepReal — Day 10",
          "ar": "DeepReal — اليوم 10"
        },
        "scientificMechanics": {
          "en": "Sequential micro-learning protocol utilizing spaced repetition to embed critical evaluation heuristics for module DeepReal — Day 10.",
          "ar": "بروتوكول تعلم مصغر متسلسل يستخدم التكرار المتباعد لترسيخ مهارات التقييم النقدي لوحدة DeepReal — Day 10."
        },
        "bestUseCases": {
          "en": "Daily structured habit-building exercise designed to gradually increase cognitive resilience over the curriculum period.",
          "ar": "تمرين يومي مهيكل لبناء العادات مصمم لزيادة المرونة المعرفية تدريجياً على مدار فترة المنهج."
        },
        "copyPasteScenario": "> INITIATE PROTOCOL: DEEPREAL___DAY_10\n> TARGET: Active vulnerability scanning\n> THREAT LEVEL: 1/5\n> ACTION: Deploying DeepReal — Day 10 heuristics...\n> STATUS: Verified and secured."
      },
      {
        "id": "item-1-11",
        "href": "/deepreal/exercise/day-11",
        "name": {
          "en": "DeepReal — Day 11",
          "ar": "DeepReal — اليوم 11"
        },
        "scientificMechanics": {
          "en": "Sequential micro-learning protocol utilizing spaced repetition to embed critical evaluation heuristics for module DeepReal — Day 11.",
          "ar": "بروتوكول تعلم مصغر متسلسل يستخدم التكرار المتباعد لترسيخ مهارات التقييم النقدي لوحدة DeepReal — Day 11."
        },
        "bestUseCases": {
          "en": "Daily structured habit-building exercise designed to gradually increase cognitive resilience over the curriculum period.",
          "ar": "تمرين يومي مهيكل لبناء العادات مصمم لزيادة المرونة المعرفية تدريجياً على مدار فترة المنهج."
        },
        "copyPasteScenario": "> INITIATE PROTOCOL: DEEPREAL___DAY_11\n> TARGET: Active vulnerability scanning\n> THREAT LEVEL: 2/5\n> ACTION: Deploying DeepReal — Day 11 heuristics...\n> STATUS: Verified and secured."
      },
      {
        "id": "item-1-12",
        "href": "/deepreal/exercise/day-12",
        "name": {
          "en": "DeepReal — Day 12",
          "ar": "DeepReal — اليوم 12"
        },
        "scientificMechanics": {
          "en": "Sequential micro-learning protocol utilizing spaced repetition to embed critical evaluation heuristics for module DeepReal — Day 12.",
          "ar": "بروتوكول تعلم مصغر متسلسل يستخدم التكرار المتباعد لترسيخ مهارات التقييم النقدي لوحدة DeepReal — Day 12."
        },
        "bestUseCases": {
          "en": "Daily structured habit-building exercise designed to gradually increase cognitive resilience over the curriculum period.",
          "ar": "تمرين يومي مهيكل لبناء العادات مصمم لزيادة المرونة المعرفية تدريجياً على مدار فترة المنهج."
        },
        "copyPasteScenario": "> INITIATE PROTOCOL: DEEPREAL___DAY_12\n> TARGET: Active vulnerability scanning\n> THREAT LEVEL: 3/5\n> ACTION: Deploying DeepReal — Day 12 heuristics...\n> STATUS: Verified and secured."
      },
      {
        "id": "item-1-13",
        "href": "/deepreal/exercise/day-13",
        "name": {
          "en": "DeepReal — Day 13",
          "ar": "DeepReal — اليوم 13"
        },
        "scientificMechanics": {
          "en": "Sequential micro-learning protocol utilizing spaced repetition to embed critical evaluation heuristics for module DeepReal — Day 13.",
          "ar": "بروتوكول تعلم مصغر متسلسل يستخدم التكرار المتباعد لترسيخ مهارات التقييم النقدي لوحدة DeepReal — Day 13."
        },
        "bestUseCases": {
          "en": "Daily structured habit-building exercise designed to gradually increase cognitive resilience over the curriculum period.",
          "ar": "تمرين يومي مهيكل لبناء العادات مصمم لزيادة المرونة المعرفية تدريجياً على مدار فترة المنهج."
        },
        "copyPasteScenario": "> INITIATE PROTOCOL: DEEPREAL___DAY_13\n> TARGET: Active vulnerability scanning\n> THREAT LEVEL: 4/5\n> ACTION: Deploying DeepReal — Day 13 heuristics...\n> STATUS: Verified and secured."
      },
      {
        "id": "item-1-14",
        "href": "/deepreal/exercise/day-14",
        "name": {
          "en": "DeepReal — Day 14",
          "ar": "DeepReal — اليوم 14"
        },
        "scientificMechanics": {
          "en": "Sequential micro-learning protocol utilizing spaced repetition to embed critical evaluation heuristics for module DeepReal — Day 14.",
          "ar": "بروتوكول تعلم مصغر متسلسل يستخدم التكرار المتباعد لترسيخ مهارات التقييم النقدي لوحدة DeepReal — Day 14."
        },
        "bestUseCases": {
          "en": "Daily structured habit-building exercise designed to gradually increase cognitive resilience over the curriculum period.",
          "ar": "تمرين يومي مهيكل لبناء العادات مصمم لزيادة المرونة المعرفية تدريجياً على مدار فترة المنهج."
        },
        "copyPasteScenario": "> INITIATE PROTOCOL: DEEPREAL___DAY_14\n> TARGET: Active vulnerability scanning\n> THREAT LEVEL: 5/5\n> ACTION: Deploying DeepReal — Day 14 heuristics...\n> STATUS: Verified and secured."
      },
      {
        "id": "item-1-15",
        "href": "/deepreal/game",
        "name": {
          "en": "DeepReal Game",
          "ar": "لعبة التحليل العميق"
        },
        "scientificMechanics": {
          "en": "Leverages interactive gamification and active inoculation theory to preemptively build cognitive immunity against DeepReal Game manipulation.",
          "ar": "يستخدم التلعيب التفاعلي ونظرية التلقيح النشط لبناء مناعة معرفية استباقية ضد أساليب التلاعب في DeepReal Game."
        },
        "bestUseCases": {
          "en": "Optimal for onboarding youth demographics and facilitating engaging, low-friction inoculation exercises.",
          "ar": "مثالي لدمج فئة الشباب وتسهيل تمارين التلقيح المعرفي التفاعلية والسلسة."
        },
        "copyPasteScenario": "> INITIATE PROTOCOL: DEEPREAL_GAME\n> TARGET: Active vulnerability scanning\n> THREAT LEVEL: 1/5\n> ACTION: Deploying DeepReal Game heuristics...\n> STATUS: Verified and secured."
      },
      {
        "id": "item-1-16",
        "href": "/bad-news",
        "name": {
          "en": "Bad News Game",
          "ar": "لعبة الأخبار السيئة"
        },
        "scientificMechanics": {
          "en": "Leverages interactive gamification and active inoculation theory to preemptively build cognitive immunity against Bad News Game manipulation.",
          "ar": "يستخدم التلعيب التفاعلي ونظرية التلقيح النشط لبناء مناعة معرفية استباقية ضد أساليب التلاعب في Bad News Game."
        },
        "bestUseCases": {
          "en": "Optimal for onboarding youth demographics and facilitating engaging, low-friction inoculation exercises.",
          "ar": "مثالي لدمج فئة الشباب وتسهيل تمارين التلقيح المعرفي التفاعلية والسلسة."
        },
        "copyPasteScenario": "> INITIATE PROTOCOL: BAD_NEWS_GAME\n> TARGET: Active vulnerability scanning\n> THREAT LEVEL: 2/5\n> ACTION: Deploying Bad News Game heuristics...\n> STATUS: Verified and secured."
      },
      {
        "id": "item-1-17",
        "href": "/fight-back",
        "name": {
          "en": "Fight Back",
          "ar": "الهجوم المضاد"
        },
        "scientificMechanics": {
          "en": "Tactical cognitive defense layer providing immediate, actionable counter-measures and prebunking scripts against specific adversarial attack vectors.",
          "ar": "طبقة دفاع معرفي تكتيكية توفر تدابير مضادة فورية وقابلة للتنفيذ ونصوص تفنيد استباقي ضد مسارات هجومية معادية محددة."
        },
        "bestUseCases": {
          "en": "Active defense protocol to be used immediately upon encountering a live threat vector matching the layer's profile.",
          "ar": "بروتوكول دفاع نشط يُستخدم فوراً عند مواجهة مسار تهديد مباشر يطابق الملف الشخصي للطبقة."
        },
        "copyPasteScenario": "> INITIATE PROTOCOL: FIGHT_BACK\n> TARGET: Active vulnerability scanning\n> THREAT LEVEL: 3/5\n> ACTION: Deploying Fight Back heuristics...\n> STATUS: Verified and secured."
      },
      {
        "id": "item-1-18",
        "href": "/reverse",
        "name": {
          "en": "Reverse Mode",
          "ar": "الوضع العكسي"
        },
        "scientificMechanics": {
          "en": "Applies evidence-based prebunking and digital literacy heuristics to fortify cognitive resilience within the Reverse Mode domain.",
          "ar": "يطبق أساليب التفنيد الاستباقي المستندة إلى الأدلة ومهارات الوعي الرقمي لتعزيز المرونة المعرفية ضمن مجال Reverse Mode."
        },
        "bestUseCases": {
          "en": "Ideal for daily inoculation exercises or when encountering questionable media narratives related to Reverse Mode.",
          "ar": "مثالي لتمارين التلقيح المعرفي اليومية أو عند مواجهة روايات إعلامية مشكوك فيها تتعلق بـ Reverse Mode."
        },
        "copyPasteScenario": "> INITIATE PROTOCOL: REVERSE_MODE\n> TARGET: Active vulnerability scanning\n> THREAT LEVEL: 4/5\n> ACTION: Deploying Reverse Mode heuristics...\n> STATUS: Verified and secured."
      },
      {
        "id": "item-1-19",
        "href": "/actions",
        "name": {
          "en": "Actions & Exercises",
          "ar": "المهام والتدريبات"
        },
        "scientificMechanics": {
          "en": "Applies evidence-based prebunking and digital literacy heuristics to fortify cognitive resilience within the Actions & Exercises domain.",
          "ar": "يطبق أساليب التفنيد الاستباقي المستندة إلى الأدلة ومهارات الوعي الرقمي لتعزيز المرونة المعرفية ضمن مجال Actions & Exercises."
        },
        "bestUseCases": {
          "en": "Ideal for daily inoculation exercises or when encountering questionable media narratives related to Actions & Exercises.",
          "ar": "مثالي لتمارين التلقيح المعرفي اليومية أو عند مواجهة روايات إعلامية مشكوك فيها تتعلق بـ Actions & Exercises."
        },
        "copyPasteScenario": "> INITIATE PROTOCOL: ACTIONS___EXERCISES\n> TARGET: Active vulnerability scanning\n> THREAT LEVEL: 5/5\n> ACTION: Deploying Actions & Exercises heuristics...\n> STATUS: Verified and secured."
      }
    ]
  },
  {
    "id": "mental-health",
    "title": {
      "en": "Mental Health",
      "ar": "الصحة النفسية"
    },
    "description": {
      "en": "Specialized forensic and orchestration nodes for Mental Health.",
      "ar": "عقد تحليلية متخصصة وإدارية لـ الصحة النفسية."
    },
    "items": [
      {
        "id": "item-2-0",
        "href": "/mental-health",
        "name": {
          "en": "Mental Health Hub",
          "ar": "مركز الصحة النفسية"
        },
        "scientificMechanics": {
          "en": "Applies cognitive behavioral principles and psychological safety frameworks to monitor and mitigate the mental toll of chronic exposure to adversarial narratives.",
          "ar": "يطبق مبادئ السلوك المعرفي وأطر السلامة النفسية لمراقبة وتخفيف العبء النفسي الناتج عن التعرض المزمن للروايات المعادية."
        },
        "bestUseCases": {
          "en": "Deployment recommended when users exhibit high cognitive fatigue or when navigating highly polarizing, emotionally charged content.",
          "ar": "يوصى بالنشر عندما يظهر المستخدمون إرهاقاً معرفياً عالياً أو عند التعامل مع محتوى شديد الاستقطاب والمشحون عاطفياً."
        },
        "copyPasteScenario": "> INITIATE PROTOCOL: MENTAL_HEALTH_HUB\n> TARGET: Active vulnerability scanning\n> THREAT LEVEL: 1/5\n> ACTION: Deploying Mental Health Hub heuristics...\n> STATUS: Verified and secured."
      },
      {
        "id": "item-2-1",
        "href": "/mental-health/exercise/day-1",
        "name": {
          "en": "Mental Health — Day 1",
          "ar": "Mental Health — اليوم 1"
        },
        "scientificMechanics": {
          "en": "Sequential micro-learning protocol utilizing spaced repetition to embed critical evaluation heuristics for module Mental Health — Day 1.",
          "ar": "بروتوكول تعلم مصغر متسلسل يستخدم التكرار المتباعد لترسيخ مهارات التقييم النقدي لوحدة Mental Health — Day 1."
        },
        "bestUseCases": {
          "en": "Daily structured habit-building exercise designed to gradually increase cognitive resilience over the curriculum period.",
          "ar": "تمرين يومي مهيكل لبناء العادات مصمم لزيادة المرونة المعرفية تدريجياً على مدار فترة المنهج."
        },
        "copyPasteScenario": "> INITIATE PROTOCOL: MENTAL_HEALTH___DAY_1\n> TARGET: Active vulnerability scanning\n> THREAT LEVEL: 2/5\n> ACTION: Deploying Mental Health — Day 1 heuristics...\n> STATUS: Verified and secured."
      },
      {
        "id": "item-2-2",
        "href": "/mental-health/exercise/day-2",
        "name": {
          "en": "Mental Health — Day 2",
          "ar": "Mental Health — اليوم 2"
        },
        "scientificMechanics": {
          "en": "Sequential micro-learning protocol utilizing spaced repetition to embed critical evaluation heuristics for module Mental Health — Day 2.",
          "ar": "بروتوكول تعلم مصغر متسلسل يستخدم التكرار المتباعد لترسيخ مهارات التقييم النقدي لوحدة Mental Health — Day 2."
        },
        "bestUseCases": {
          "en": "Daily structured habit-building exercise designed to gradually increase cognitive resilience over the curriculum period.",
          "ar": "تمرين يومي مهيكل لبناء العادات مصمم لزيادة المرونة المعرفية تدريجياً على مدار فترة المنهج."
        },
        "copyPasteScenario": "> INITIATE PROTOCOL: MENTAL_HEALTH___DAY_2\n> TARGET: Active vulnerability scanning\n> THREAT LEVEL: 3/5\n> ACTION: Deploying Mental Health — Day 2 heuristics...\n> STATUS: Verified and secured."
      },
      {
        "id": "item-2-3",
        "href": "/mental-health/exercise/day-3",
        "name": {
          "en": "Mental Health — Day 3",
          "ar": "Mental Health — اليوم 3"
        },
        "scientificMechanics": {
          "en": "Sequential micro-learning protocol utilizing spaced repetition to embed critical evaluation heuristics for module Mental Health — Day 3.",
          "ar": "بروتوكول تعلم مصغر متسلسل يستخدم التكرار المتباعد لترسيخ مهارات التقييم النقدي لوحدة Mental Health — Day 3."
        },
        "bestUseCases": {
          "en": "Daily structured habit-building exercise designed to gradually increase cognitive resilience over the curriculum period.",
          "ar": "تمرين يومي مهيكل لبناء العادات مصمم لزيادة المرونة المعرفية تدريجياً على مدار فترة المنهج."
        },
        "copyPasteScenario": "> INITIATE PROTOCOL: MENTAL_HEALTH___DAY_3\n> TARGET: Active vulnerability scanning\n> THREAT LEVEL: 4/5\n> ACTION: Deploying Mental Health — Day 3 heuristics...\n> STATUS: Verified and secured."
      },
      {
        "id": "item-2-4",
        "href": "/mental-health/exercise/day-4",
        "name": {
          "en": "Mental Health — Day 4",
          "ar": "Mental Health — اليوم 4"
        },
        "scientificMechanics": {
          "en": "Sequential micro-learning protocol utilizing spaced repetition to embed critical evaluation heuristics for module Mental Health — Day 4.",
          "ar": "بروتوكول تعلم مصغر متسلسل يستخدم التكرار المتباعد لترسيخ مهارات التقييم النقدي لوحدة Mental Health — Day 4."
        },
        "bestUseCases": {
          "en": "Daily structured habit-building exercise designed to gradually increase cognitive resilience over the curriculum period.",
          "ar": "تمرين يومي مهيكل لبناء العادات مصمم لزيادة المرونة المعرفية تدريجياً على مدار فترة المنهج."
        },
        "copyPasteScenario": "> INITIATE PROTOCOL: MENTAL_HEALTH___DAY_4\n> TARGET: Active vulnerability scanning\n> THREAT LEVEL: 5/5\n> ACTION: Deploying Mental Health — Day 4 heuristics...\n> STATUS: Verified and secured."
      },
      {
        "id": "item-2-5",
        "href": "/mental-health/exercise/day-5",
        "name": {
          "en": "Mental Health — Day 5",
          "ar": "Mental Health — اليوم 5"
        },
        "scientificMechanics": {
          "en": "Sequential micro-learning protocol utilizing spaced repetition to embed critical evaluation heuristics for module Mental Health — Day 5.",
          "ar": "بروتوكول تعلم مصغر متسلسل يستخدم التكرار المتباعد لترسيخ مهارات التقييم النقدي لوحدة Mental Health — Day 5."
        },
        "bestUseCases": {
          "en": "Daily structured habit-building exercise designed to gradually increase cognitive resilience over the curriculum period.",
          "ar": "تمرين يومي مهيكل لبناء العادات مصمم لزيادة المرونة المعرفية تدريجياً على مدار فترة المنهج."
        },
        "copyPasteScenario": "> INITIATE PROTOCOL: MENTAL_HEALTH___DAY_5\n> TARGET: Active vulnerability scanning\n> THREAT LEVEL: 1/5\n> ACTION: Deploying Mental Health — Day 5 heuristics...\n> STATUS: Verified and secured."
      },
      {
        "id": "item-2-6",
        "href": "/mental-health/exercise/day-6",
        "name": {
          "en": "Mental Health — Day 6",
          "ar": "Mental Health — اليوم 6"
        },
        "scientificMechanics": {
          "en": "Sequential micro-learning protocol utilizing spaced repetition to embed critical evaluation heuristics for module Mental Health — Day 6.",
          "ar": "بروتوكول تعلم مصغر متسلسل يستخدم التكرار المتباعد لترسيخ مهارات التقييم النقدي لوحدة Mental Health — Day 6."
        },
        "bestUseCases": {
          "en": "Daily structured habit-building exercise designed to gradually increase cognitive resilience over the curriculum period.",
          "ar": "تمرين يومي مهيكل لبناء العادات مصمم لزيادة المرونة المعرفية تدريجياً على مدار فترة المنهج."
        },
        "copyPasteScenario": "> INITIATE PROTOCOL: MENTAL_HEALTH___DAY_6\n> TARGET: Active vulnerability scanning\n> THREAT LEVEL: 2/5\n> ACTION: Deploying Mental Health — Day 6 heuristics...\n> STATUS: Verified and secured."
      },
      {
        "id": "item-2-7",
        "href": "/mental-health/exercise/day-7",
        "name": {
          "en": "Mental Health — Day 7",
          "ar": "Mental Health — اليوم 7"
        },
        "scientificMechanics": {
          "en": "Sequential micro-learning protocol utilizing spaced repetition to embed critical evaluation heuristics for module Mental Health — Day 7.",
          "ar": "بروتوكول تعلم مصغر متسلسل يستخدم التكرار المتباعد لترسيخ مهارات التقييم النقدي لوحدة Mental Health — Day 7."
        },
        "bestUseCases": {
          "en": "Daily structured habit-building exercise designed to gradually increase cognitive resilience over the curriculum period.",
          "ar": "تمرين يومي مهيكل لبناء العادات مصمم لزيادة المرونة المعرفية تدريجياً على مدار فترة المنهج."
        },
        "copyPasteScenario": "> INITIATE PROTOCOL: MENTAL_HEALTH___DAY_7\n> TARGET: Active vulnerability scanning\n> THREAT LEVEL: 3/5\n> ACTION: Deploying Mental Health — Day 7 heuristics...\n> STATUS: Verified and secured."
      },
      {
        "id": "item-2-8",
        "href": "/mental-health/exercise/day-8",
        "name": {
          "en": "Mental Health — Day 8",
          "ar": "Mental Health — اليوم 8"
        },
        "scientificMechanics": {
          "en": "Sequential micro-learning protocol utilizing spaced repetition to embed critical evaluation heuristics for module Mental Health — Day 8.",
          "ar": "بروتوكول تعلم مصغر متسلسل يستخدم التكرار المتباعد لترسيخ مهارات التقييم النقدي لوحدة Mental Health — Day 8."
        },
        "bestUseCases": {
          "en": "Daily structured habit-building exercise designed to gradually increase cognitive resilience over the curriculum period.",
          "ar": "تمرين يومي مهيكل لبناء العادات مصمم لزيادة المرونة المعرفية تدريجياً على مدار فترة المنهج."
        },
        "copyPasteScenario": "> INITIATE PROTOCOL: MENTAL_HEALTH___DAY_8\n> TARGET: Active vulnerability scanning\n> THREAT LEVEL: 4/5\n> ACTION: Deploying Mental Health — Day 8 heuristics...\n> STATUS: Verified and secured."
      },
      {
        "id": "item-2-9",
        "href": "/mental-health/exercise/day-9",
        "name": {
          "en": "Mental Health — Day 9",
          "ar": "Mental Health — اليوم 9"
        },
        "scientificMechanics": {
          "en": "Sequential micro-learning protocol utilizing spaced repetition to embed critical evaluation heuristics for module Mental Health — Day 9.",
          "ar": "بروتوكول تعلم مصغر متسلسل يستخدم التكرار المتباعد لترسيخ مهارات التقييم النقدي لوحدة Mental Health — Day 9."
        },
        "bestUseCases": {
          "en": "Daily structured habit-building exercise designed to gradually increase cognitive resilience over the curriculum period.",
          "ar": "تمرين يومي مهيكل لبناء العادات مصمم لزيادة المرونة المعرفية تدريجياً على مدار فترة المنهج."
        },
        "copyPasteScenario": "> INITIATE PROTOCOL: MENTAL_HEALTH___DAY_9\n> TARGET: Active vulnerability scanning\n> THREAT LEVEL: 5/5\n> ACTION: Deploying Mental Health — Day 9 heuristics...\n> STATUS: Verified and secured."
      },
      {
        "id": "item-2-10",
        "href": "/mental-health/exercise/day-10",
        "name": {
          "en": "Mental Health — Day 10",
          "ar": "Mental Health — اليوم 10"
        },
        "scientificMechanics": {
          "en": "Sequential micro-learning protocol utilizing spaced repetition to embed critical evaluation heuristics for module Mental Health — Day 10.",
          "ar": "بروتوكول تعلم مصغر متسلسل يستخدم التكرار المتباعد لترسيخ مهارات التقييم النقدي لوحدة Mental Health — Day 10."
        },
        "bestUseCases": {
          "en": "Daily structured habit-building exercise designed to gradually increase cognitive resilience over the curriculum period.",
          "ar": "تمرين يومي مهيكل لبناء العادات مصمم لزيادة المرونة المعرفية تدريجياً على مدار فترة المنهج."
        },
        "copyPasteScenario": "> INITIATE PROTOCOL: MENTAL_HEALTH___DAY_10\n> TARGET: Active vulnerability scanning\n> THREAT LEVEL: 1/5\n> ACTION: Deploying Mental Health — Day 10 heuristics...\n> STATUS: Verified and secured."
      },
      {
        "id": "item-2-11",
        "href": "/mental-health/exercise/day-11",
        "name": {
          "en": "Mental Health — Day 11",
          "ar": "Mental Health — اليوم 11"
        },
        "scientificMechanics": {
          "en": "Sequential micro-learning protocol utilizing spaced repetition to embed critical evaluation heuristics for module Mental Health — Day 11.",
          "ar": "بروتوكول تعلم مصغر متسلسل يستخدم التكرار المتباعد لترسيخ مهارات التقييم النقدي لوحدة Mental Health — Day 11."
        },
        "bestUseCases": {
          "en": "Daily structured habit-building exercise designed to gradually increase cognitive resilience over the curriculum period.",
          "ar": "تمرين يومي مهيكل لبناء العادات مصمم لزيادة المرونة المعرفية تدريجياً على مدار فترة المنهج."
        },
        "copyPasteScenario": "> INITIATE PROTOCOL: MENTAL_HEALTH___DAY_11\n> TARGET: Active vulnerability scanning\n> THREAT LEVEL: 2/5\n> ACTION: Deploying Mental Health — Day 11 heuristics...\n> STATUS: Verified and secured."
      },
      {
        "id": "item-2-12",
        "href": "/mental-health/exercise/day-12",
        "name": {
          "en": "Mental Health — Day 12",
          "ar": "Mental Health — اليوم 12"
        },
        "scientificMechanics": {
          "en": "Sequential micro-learning protocol utilizing spaced repetition to embed critical evaluation heuristics for module Mental Health — Day 12.",
          "ar": "بروتوكول تعلم مصغر متسلسل يستخدم التكرار المتباعد لترسيخ مهارات التقييم النقدي لوحدة Mental Health — Day 12."
        },
        "bestUseCases": {
          "en": "Daily structured habit-building exercise designed to gradually increase cognitive resilience over the curriculum period.",
          "ar": "تمرين يومي مهيكل لبناء العادات مصمم لزيادة المرونة المعرفية تدريجياً على مدار فترة المنهج."
        },
        "copyPasteScenario": "> INITIATE PROTOCOL: MENTAL_HEALTH___DAY_12\n> TARGET: Active vulnerability scanning\n> THREAT LEVEL: 3/5\n> ACTION: Deploying Mental Health — Day 12 heuristics...\n> STATUS: Verified and secured."
      },
      {
        "id": "item-2-13",
        "href": "/mental-health/exercise/day-13",
        "name": {
          "en": "Mental Health — Day 13",
          "ar": "Mental Health — اليوم 13"
        },
        "scientificMechanics": {
          "en": "Sequential micro-learning protocol utilizing spaced repetition to embed critical evaluation heuristics for module Mental Health — Day 13.",
          "ar": "بروتوكول تعلم مصغر متسلسل يستخدم التكرار المتباعد لترسيخ مهارات التقييم النقدي لوحدة Mental Health — Day 13."
        },
        "bestUseCases": {
          "en": "Daily structured habit-building exercise designed to gradually increase cognitive resilience over the curriculum period.",
          "ar": "تمرين يومي مهيكل لبناء العادات مصمم لزيادة المرونة المعرفية تدريجياً على مدار فترة المنهج."
        },
        "copyPasteScenario": "> INITIATE PROTOCOL: MENTAL_HEALTH___DAY_13\n> TARGET: Active vulnerability scanning\n> THREAT LEVEL: 4/5\n> ACTION: Deploying Mental Health — Day 13 heuristics...\n> STATUS: Verified and secured."
      },
      {
        "id": "item-2-14",
        "href": "/mental-health/exercise/day-14",
        "name": {
          "en": "Mental Health — Day 14",
          "ar": "Mental Health — اليوم 14"
        },
        "scientificMechanics": {
          "en": "Sequential micro-learning protocol utilizing spaced repetition to embed critical evaluation heuristics for module Mental Health — Day 14.",
          "ar": "بروتوكول تعلم مصغر متسلسل يستخدم التكرار المتباعد لترسيخ مهارات التقييم النقدي لوحدة Mental Health — Day 14."
        },
        "bestUseCases": {
          "en": "Daily structured habit-building exercise designed to gradually increase cognitive resilience over the curriculum period.",
          "ar": "تمرين يومي مهيكل لبناء العادات مصمم لزيادة المرونة المعرفية تدريجياً على مدار فترة المنهج."
        },
        "copyPasteScenario": "> INITIATE PROTOCOL: MENTAL_HEALTH___DAY_14\n> TARGET: Active vulnerability scanning\n> THREAT LEVEL: 5/5\n> ACTION: Deploying Mental Health — Day 14 heuristics...\n> STATUS: Verified and secured."
      },
      {
        "id": "item-2-15",
        "href": "/medical-life",
        "name": {
          "en": "Medical Life",
          "ar": "الحياة الطبية"
        },
        "scientificMechanics": {
          "en": "Applies evidence-based prebunking and digital literacy heuristics to fortify cognitive resilience within the Medical Life domain.",
          "ar": "يطبق أساليب التفنيد الاستباقي المستندة إلى الأدلة ومهارات الوعي الرقمي لتعزيز المرونة المعرفية ضمن مجال Medical Life."
        },
        "bestUseCases": {
          "en": "Ideal for daily inoculation exercises or when encountering questionable media narratives related to Medical Life.",
          "ar": "مثالي لتمارين التلقيح المعرفي اليومية أو عند مواجهة روايات إعلامية مشكوك فيها تتعلق بـ Medical Life."
        },
        "copyPasteScenario": "> INITIATE PROTOCOL: MEDICAL_LIFE\n> TARGET: Active vulnerability scanning\n> THREAT LEVEL: 1/5\n> ACTION: Deploying Medical Life heuristics...\n> STATUS: Verified and secured."
      }
    ]
  },
  {
    "id": "religion-hub",
    "title": {
      "en": "Religion Hub",
      "ar": "المركز الديني"
    },
    "description": {
      "en": "Specialized forensic and orchestration nodes for Religion Hub.",
      "ar": "عقد تحليلية متخصصة وإدارية لـ المركز الديني."
    },
    "items": [
      {
        "id": "item-3-0",
        "href": "/religion-hub",
        "name": {
          "en": "Religion Hub",
          "ar": "المركز الديني"
        },
        "scientificMechanics": {
          "en": "Contextualizes theological verification mechanics against radicalization vectors, anchoring psychological safety in verified doctrinal sources.",
          "ar": "يضع آليات التحقق اللاهوتي في سياقها ضد مسارات التطرف، ويرسخ السلامة النفسية في المصادر العقائدية الموثوقة."
        },
        "bestUseCases": {
          "en": "Essential for verifying claims cloaked in religious authority and preventing faith-based manipulation tactics.",
          "ar": "ضروري للتحقق من الادعاءات المغلفة بالسلطة الدينية ومنع تكتيكات التلاعب القائمة على العقيدة."
        },
        "copyPasteScenario": "> INITIATE PROTOCOL: RELIGION_HUB\n> TARGET: Active vulnerability scanning\n> THREAT LEVEL: 1/5\n> ACTION: Deploying Religion Hub heuristics...\n> STATUS: Verified and secured."
      },
      {
        "id": "item-3-1",
        "href": "/religion-hub/exercise/day-1",
        "name": {
          "en": "Religion Hub — Day 1",
          "ar": "Religion Hub — اليوم 1"
        },
        "scientificMechanics": {
          "en": "Sequential micro-learning protocol utilizing spaced repetition to embed critical evaluation heuristics for module Religion Hub — Day 1.",
          "ar": "بروتوكول تعلم مصغر متسلسل يستخدم التكرار المتباعد لترسيخ مهارات التقييم النقدي لوحدة Religion Hub — Day 1."
        },
        "bestUseCases": {
          "en": "Daily structured habit-building exercise designed to gradually increase cognitive resilience over the curriculum period.",
          "ar": "تمرين يومي مهيكل لبناء العادات مصمم لزيادة المرونة المعرفية تدريجياً على مدار فترة المنهج."
        },
        "copyPasteScenario": "> INITIATE PROTOCOL: RELIGION_HUB___DAY_1\n> TARGET: Active vulnerability scanning\n> THREAT LEVEL: 2/5\n> ACTION: Deploying Religion Hub — Day 1 heuristics...\n> STATUS: Verified and secured."
      },
      {
        "id": "item-3-2",
        "href": "/religion-hub/exercise/day-2",
        "name": {
          "en": "Religion Hub — Day 2",
          "ar": "Religion Hub — اليوم 2"
        },
        "scientificMechanics": {
          "en": "Sequential micro-learning protocol utilizing spaced repetition to embed critical evaluation heuristics for module Religion Hub — Day 2.",
          "ar": "بروتوكول تعلم مصغر متسلسل يستخدم التكرار المتباعد لترسيخ مهارات التقييم النقدي لوحدة Religion Hub — Day 2."
        },
        "bestUseCases": {
          "en": "Daily structured habit-building exercise designed to gradually increase cognitive resilience over the curriculum period.",
          "ar": "تمرين يومي مهيكل لبناء العادات مصمم لزيادة المرونة المعرفية تدريجياً على مدار فترة المنهج."
        },
        "copyPasteScenario": "> INITIATE PROTOCOL: RELIGION_HUB___DAY_2\n> TARGET: Active vulnerability scanning\n> THREAT LEVEL: 3/5\n> ACTION: Deploying Religion Hub — Day 2 heuristics...\n> STATUS: Verified and secured."
      },
      {
        "id": "item-3-3",
        "href": "/religion-hub/exercise/day-3",
        "name": {
          "en": "Religion Hub — Day 3",
          "ar": "Religion Hub — اليوم 3"
        },
        "scientificMechanics": {
          "en": "Sequential micro-learning protocol utilizing spaced repetition to embed critical evaluation heuristics for module Religion Hub — Day 3.",
          "ar": "بروتوكول تعلم مصغر متسلسل يستخدم التكرار المتباعد لترسيخ مهارات التقييم النقدي لوحدة Religion Hub — Day 3."
        },
        "bestUseCases": {
          "en": "Daily structured habit-building exercise designed to gradually increase cognitive resilience over the curriculum period.",
          "ar": "تمرين يومي مهيكل لبناء العادات مصمم لزيادة المرونة المعرفية تدريجياً على مدار فترة المنهج."
        },
        "copyPasteScenario": "> INITIATE PROTOCOL: RELIGION_HUB___DAY_3\n> TARGET: Active vulnerability scanning\n> THREAT LEVEL: 4/5\n> ACTION: Deploying Religion Hub — Day 3 heuristics...\n> STATUS: Verified and secured."
      },
      {
        "id": "item-3-4",
        "href": "/religion-hub/exercise/day-4",
        "name": {
          "en": "Religion Hub — Day 4",
          "ar": "Religion Hub — اليوم 4"
        },
        "scientificMechanics": {
          "en": "Sequential micro-learning protocol utilizing spaced repetition to embed critical evaluation heuristics for module Religion Hub — Day 4.",
          "ar": "بروتوكول تعلم مصغر متسلسل يستخدم التكرار المتباعد لترسيخ مهارات التقييم النقدي لوحدة Religion Hub — Day 4."
        },
        "bestUseCases": {
          "en": "Daily structured habit-building exercise designed to gradually increase cognitive resilience over the curriculum period.",
          "ar": "تمرين يومي مهيكل لبناء العادات مصمم لزيادة المرونة المعرفية تدريجياً على مدار فترة المنهج."
        },
        "copyPasteScenario": "> INITIATE PROTOCOL: RELIGION_HUB___DAY_4\n> TARGET: Active vulnerability scanning\n> THREAT LEVEL: 5/5\n> ACTION: Deploying Religion Hub — Day 4 heuristics...\n> STATUS: Verified and secured."
      },
      {
        "id": "item-3-5",
        "href": "/religion-hub/exercise/day-5",
        "name": {
          "en": "Religion Hub — Day 5",
          "ar": "Religion Hub — اليوم 5"
        },
        "scientificMechanics": {
          "en": "Sequential micro-learning protocol utilizing spaced repetition to embed critical evaluation heuristics for module Religion Hub — Day 5.",
          "ar": "بروتوكول تعلم مصغر متسلسل يستخدم التكرار المتباعد لترسيخ مهارات التقييم النقدي لوحدة Religion Hub — Day 5."
        },
        "bestUseCases": {
          "en": "Daily structured habit-building exercise designed to gradually increase cognitive resilience over the curriculum period.",
          "ar": "تمرين يومي مهيكل لبناء العادات مصمم لزيادة المرونة المعرفية تدريجياً على مدار فترة المنهج."
        },
        "copyPasteScenario": "> INITIATE PROTOCOL: RELIGION_HUB___DAY_5\n> TARGET: Active vulnerability scanning\n> THREAT LEVEL: 1/5\n> ACTION: Deploying Religion Hub — Day 5 heuristics...\n> STATUS: Verified and secured."
      },
      {
        "id": "item-3-6",
        "href": "/religion-hub/exercise/day-6",
        "name": {
          "en": "Religion Hub — Day 6",
          "ar": "Religion Hub — اليوم 6"
        },
        "scientificMechanics": {
          "en": "Sequential micro-learning protocol utilizing spaced repetition to embed critical evaluation heuristics for module Religion Hub — Day 6.",
          "ar": "بروتوكول تعلم مصغر متسلسل يستخدم التكرار المتباعد لترسيخ مهارات التقييم النقدي لوحدة Religion Hub — Day 6."
        },
        "bestUseCases": {
          "en": "Daily structured habit-building exercise designed to gradually increase cognitive resilience over the curriculum period.",
          "ar": "تمرين يومي مهيكل لبناء العادات مصمم لزيادة المرونة المعرفية تدريجياً على مدار فترة المنهج."
        },
        "copyPasteScenario": "> INITIATE PROTOCOL: RELIGION_HUB___DAY_6\n> TARGET: Active vulnerability scanning\n> THREAT LEVEL: 2/5\n> ACTION: Deploying Religion Hub — Day 6 heuristics...\n> STATUS: Verified and secured."
      },
      {
        "id": "item-3-7",
        "href": "/religion-hub/exercise/day-7",
        "name": {
          "en": "Religion Hub — Day 7",
          "ar": "Religion Hub — اليوم 7"
        },
        "scientificMechanics": {
          "en": "Sequential micro-learning protocol utilizing spaced repetition to embed critical evaluation heuristics for module Religion Hub — Day 7.",
          "ar": "بروتوكول تعلم مصغر متسلسل يستخدم التكرار المتباعد لترسيخ مهارات التقييم النقدي لوحدة Religion Hub — Day 7."
        },
        "bestUseCases": {
          "en": "Daily structured habit-building exercise designed to gradually increase cognitive resilience over the curriculum period.",
          "ar": "تمرين يومي مهيكل لبناء العادات مصمم لزيادة المرونة المعرفية تدريجياً على مدار فترة المنهج."
        },
        "copyPasteScenario": "> INITIATE PROTOCOL: RELIGION_HUB___DAY_7\n> TARGET: Active vulnerability scanning\n> THREAT LEVEL: 3/5\n> ACTION: Deploying Religion Hub — Day 7 heuristics...\n> STATUS: Verified and secured."
      },
      {
        "id": "item-3-8",
        "href": "/religion-hub/exercise/day-8",
        "name": {
          "en": "Religion Hub — Day 8",
          "ar": "Religion Hub — اليوم 8"
        },
        "scientificMechanics": {
          "en": "Sequential micro-learning protocol utilizing spaced repetition to embed critical evaluation heuristics for module Religion Hub — Day 8.",
          "ar": "بروتوكول تعلم مصغر متسلسل يستخدم التكرار المتباعد لترسيخ مهارات التقييم النقدي لوحدة Religion Hub — Day 8."
        },
        "bestUseCases": {
          "en": "Daily structured habit-building exercise designed to gradually increase cognitive resilience over the curriculum period.",
          "ar": "تمرين يومي مهيكل لبناء العادات مصمم لزيادة المرونة المعرفية تدريجياً على مدار فترة المنهج."
        },
        "copyPasteScenario": "> INITIATE PROTOCOL: RELIGION_HUB___DAY_8\n> TARGET: Active vulnerability scanning\n> THREAT LEVEL: 4/5\n> ACTION: Deploying Religion Hub — Day 8 heuristics...\n> STATUS: Verified and secured."
      },
      {
        "id": "item-3-9",
        "href": "/religion-hub/exercise/day-9",
        "name": {
          "en": "Religion Hub — Day 9",
          "ar": "Religion Hub — اليوم 9"
        },
        "scientificMechanics": {
          "en": "Sequential micro-learning protocol utilizing spaced repetition to embed critical evaluation heuristics for module Religion Hub — Day 9.",
          "ar": "بروتوكول تعلم مصغر متسلسل يستخدم التكرار المتباعد لترسيخ مهارات التقييم النقدي لوحدة Religion Hub — Day 9."
        },
        "bestUseCases": {
          "en": "Daily structured habit-building exercise designed to gradually increase cognitive resilience over the curriculum period.",
          "ar": "تمرين يومي مهيكل لبناء العادات مصمم لزيادة المرونة المعرفية تدريجياً على مدار فترة المنهج."
        },
        "copyPasteScenario": "> INITIATE PROTOCOL: RELIGION_HUB___DAY_9\n> TARGET: Active vulnerability scanning\n> THREAT LEVEL: 5/5\n> ACTION: Deploying Religion Hub — Day 9 heuristics...\n> STATUS: Verified and secured."
      },
      {
        "id": "item-3-10",
        "href": "/religion-hub/exercise/day-10",
        "name": {
          "en": "Religion Hub — Day 10",
          "ar": "Religion Hub — اليوم 10"
        },
        "scientificMechanics": {
          "en": "Sequential micro-learning protocol utilizing spaced repetition to embed critical evaluation heuristics for module Religion Hub — Day 10.",
          "ar": "بروتوكول تعلم مصغر متسلسل يستخدم التكرار المتباعد لترسيخ مهارات التقييم النقدي لوحدة Religion Hub — Day 10."
        },
        "bestUseCases": {
          "en": "Daily structured habit-building exercise designed to gradually increase cognitive resilience over the curriculum period.",
          "ar": "تمرين يومي مهيكل لبناء العادات مصمم لزيادة المرونة المعرفية تدريجياً على مدار فترة المنهج."
        },
        "copyPasteScenario": "> INITIATE PROTOCOL: RELIGION_HUB___DAY_10\n> TARGET: Active vulnerability scanning\n> THREAT LEVEL: 1/5\n> ACTION: Deploying Religion Hub — Day 10 heuristics...\n> STATUS: Verified and secured."
      },
      {
        "id": "item-3-11",
        "href": "/religion-hub/exercise/day-11",
        "name": {
          "en": "Religion Hub — Day 11",
          "ar": "Religion Hub — اليوم 11"
        },
        "scientificMechanics": {
          "en": "Sequential micro-learning protocol utilizing spaced repetition to embed critical evaluation heuristics for module Religion Hub — Day 11.",
          "ar": "بروتوكول تعلم مصغر متسلسل يستخدم التكرار المتباعد لترسيخ مهارات التقييم النقدي لوحدة Religion Hub — Day 11."
        },
        "bestUseCases": {
          "en": "Daily structured habit-building exercise designed to gradually increase cognitive resilience over the curriculum period.",
          "ar": "تمرين يومي مهيكل لبناء العادات مصمم لزيادة المرونة المعرفية تدريجياً على مدار فترة المنهج."
        },
        "copyPasteScenario": "> INITIATE PROTOCOL: RELIGION_HUB___DAY_11\n> TARGET: Active vulnerability scanning\n> THREAT LEVEL: 2/5\n> ACTION: Deploying Religion Hub — Day 11 heuristics...\n> STATUS: Verified and secured."
      },
      {
        "id": "item-3-12",
        "href": "/religion-hub/exercise/day-12",
        "name": {
          "en": "Religion Hub — Day 12",
          "ar": "Religion Hub — اليوم 12"
        },
        "scientificMechanics": {
          "en": "Sequential micro-learning protocol utilizing spaced repetition to embed critical evaluation heuristics for module Religion Hub — Day 12.",
          "ar": "بروتوكول تعلم مصغر متسلسل يستخدم التكرار المتباعد لترسيخ مهارات التقييم النقدي لوحدة Religion Hub — Day 12."
        },
        "bestUseCases": {
          "en": "Daily structured habit-building exercise designed to gradually increase cognitive resilience over the curriculum period.",
          "ar": "تمرين يومي مهيكل لبناء العادات مصمم لزيادة المرونة المعرفية تدريجياً على مدار فترة المنهج."
        },
        "copyPasteScenario": "> INITIATE PROTOCOL: RELIGION_HUB___DAY_12\n> TARGET: Active vulnerability scanning\n> THREAT LEVEL: 3/5\n> ACTION: Deploying Religion Hub — Day 12 heuristics...\n> STATUS: Verified and secured."
      },
      {
        "id": "item-3-13",
        "href": "/religion-hub/exercise/day-13",
        "name": {
          "en": "Religion Hub — Day 13",
          "ar": "Religion Hub — اليوم 13"
        },
        "scientificMechanics": {
          "en": "Sequential micro-learning protocol utilizing spaced repetition to embed critical evaluation heuristics for module Religion Hub — Day 13.",
          "ar": "بروتوكول تعلم مصغر متسلسل يستخدم التكرار المتباعد لترسيخ مهارات التقييم النقدي لوحدة Religion Hub — Day 13."
        },
        "bestUseCases": {
          "en": "Daily structured habit-building exercise designed to gradually increase cognitive resilience over the curriculum period.",
          "ar": "تمرين يومي مهيكل لبناء العادات مصمم لزيادة المرونة المعرفية تدريجياً على مدار فترة المنهج."
        },
        "copyPasteScenario": "> INITIATE PROTOCOL: RELIGION_HUB___DAY_13\n> TARGET: Active vulnerability scanning\n> THREAT LEVEL: 4/5\n> ACTION: Deploying Religion Hub — Day 13 heuristics...\n> STATUS: Verified and secured."
      },
      {
        "id": "item-3-14",
        "href": "/religion-hub/exercise/day-14",
        "name": {
          "en": "Religion Hub — Day 14",
          "ar": "Religion Hub — اليوم 14"
        },
        "scientificMechanics": {
          "en": "Sequential micro-learning protocol utilizing spaced repetition to embed critical evaluation heuristics for module Religion Hub — Day 14.",
          "ar": "بروتوكول تعلم مصغر متسلسل يستخدم التكرار المتباعد لترسيخ مهارات التقييم النقدي لوحدة Religion Hub — Day 14."
        },
        "bestUseCases": {
          "en": "Daily structured habit-building exercise designed to gradually increase cognitive resilience over the curriculum period.",
          "ar": "تمرين يومي مهيكل لبناء العادات مصمم لزيادة المرونة المعرفية تدريجياً على مدار فترة المنهج."
        },
        "copyPasteScenario": "> INITIATE PROTOCOL: RELIGION_HUB___DAY_14\n> TARGET: Active vulnerability scanning\n> THREAT LEVEL: 5/5\n> ACTION: Deploying Religion Hub — Day 14 heuristics...\n> STATUS: Verified and secured."
      },
      {
        "id": "item-3-15",
        "href": "/religion-hub/tools",
        "name": {
          "en": "Religious Verification Tools 🕌",
          "ar": "أدوات التحقق الديني 🕌"
        },
        "scientificMechanics": {
          "en": "Applies evidence-based prebunking and digital literacy heuristics to fortify cognitive resilience within the Religious Verification Tools 🕌 domain.",
          "ar": "يطبق أساليب التفنيد الاستباقي المستندة إلى الأدلة ومهارات الوعي الرقمي لتعزيز المرونة المعرفية ضمن مجال Religious Verification Tools 🕌."
        },
        "bestUseCases": {
          "en": "Ideal for daily inoculation exercises or when encountering questionable media narratives related to Religious Verification Tools 🕌.",
          "ar": "مثالي لتمارين التلقيح المعرفي اليومية أو عند مواجهة روايات إعلامية مشكوك فيها تتعلق بـ Religious Verification Tools 🕌."
        },
        "copyPasteScenario": "> INITIATE PROTOCOL: RELIGIOUS_VERIFICATION_TOOLS___\n> TARGET: Active vulnerability scanning\n> THREAT LEVEL: 1/5\n> ACTION: Deploying Religious Verification Tools 🕌 heuristics...\n> STATUS: Verified and secured."
      }
    ]
  },
  {
    "id": "assessment-research",
    "title": {
      "en": "Assessment & Research",
      "ar": "التقييم والأبحاث"
    },
    "description": {
      "en": "Specialized forensic and orchestration nodes for Assessment & Research.",
      "ar": "عقد تحليلية متخصصة وإدارية لـ التقييم والأبحاث."
    },
    "items": [
      {
        "id": "item-4-0",
        "href": "/assessment",
        "name": {
          "en": "Assessment (MIST-20)",
          "ar": "التقييم (MIST-20)"
        },
        "scientificMechanics": {
          "en": "Applies evidence-based prebunking and digital literacy heuristics to fortify cognitive resilience within the Assessment (MIST-20) domain.",
          "ar": "يطبق أساليب التفنيد الاستباقي المستندة إلى الأدلة ومهارات الوعي الرقمي لتعزيز المرونة المعرفية ضمن مجال Assessment (MIST-20)."
        },
        "bestUseCases": {
          "en": "Ideal for daily inoculation exercises or when encountering questionable media narratives related to Assessment (MIST-20).",
          "ar": "مثالي لتمارين التلقيح المعرفي اليومية أو عند مواجهة روايات إعلامية مشكوك فيها تتعلق بـ Assessment (MIST-20)."
        },
        "copyPasteScenario": "> INITIATE PROTOCOL: ASSESSMENT__MIST_20_\n> TARGET: Active vulnerability scanning\n> THREAT LEVEL: 1/5\n> ACTION: Deploying Assessment (MIST-20) heuristics...\n> STATUS: Verified and secured."
      },
      {
        "id": "item-4-1",
        "href": "/assessment",
        "name": {
          "en": "Baseline Assessment",
          "ar": "تقييم خط الأساس"
        },
        "scientificMechanics": {
          "en": "Applies evidence-based prebunking and digital literacy heuristics to fortify cognitive resilience within the Baseline Assessment domain.",
          "ar": "يطبق أساليب التفنيد الاستباقي المستندة إلى الأدلة ومهارات الوعي الرقمي لتعزيز المرونة المعرفية ضمن مجال Baseline Assessment."
        },
        "bestUseCases": {
          "en": "Ideal for daily inoculation exercises or when encountering questionable media narratives related to Baseline Assessment.",
          "ar": "مثالي لتمارين التلقيح المعرفي اليومية أو عند مواجهة روايات إعلامية مشكوك فيها تتعلق بـ Baseline Assessment."
        },
        "copyPasteScenario": "> INITIATE PROTOCOL: BASELINE_ASSESSMENT\n> TARGET: Active vulnerability scanning\n> THREAT LEVEL: 2/5\n> ACTION: Deploying Baseline Assessment heuristics...\n> STATUS: Verified and secured."
      },
      {
        "id": "item-4-2",
        "href": "/self-test-protocol",
        "name": {
          "en": "Self-Test Protocol",
          "ar": "بروتوكول الاختبار الذاتي"
        },
        "scientificMechanics": {
          "en": "Applies evidence-based prebunking and digital literacy heuristics to fortify cognitive resilience within the Self-Test Protocol domain.",
          "ar": "يطبق أساليب التفنيد الاستباقي المستندة إلى الأدلة ومهارات الوعي الرقمي لتعزيز المرونة المعرفية ضمن مجال Self-Test Protocol."
        },
        "bestUseCases": {
          "en": "Ideal for daily inoculation exercises or when encountering questionable media narratives related to Self-Test Protocol.",
          "ar": "مثالي لتمارين التلقيح المعرفي اليومية أو عند مواجهة روايات إعلامية مشكوك فيها تتعلق بـ Self-Test Protocol."
        },
        "copyPasteScenario": "> INITIATE PROTOCOL: SELF_TEST_PROTOCOL\n> TARGET: Active vulnerability scanning\n> THREAT LEVEL: 3/5\n> ACTION: Deploying Self-Test Protocol heuristics...\n> STATUS: Verified and secured."
      },
      {
        "id": "item-4-3",
        "href": "/critical-thinking",
        "name": {
          "en": "Critical Thinking",
          "ar": "التفكير النقدي"
        },
        "scientificMechanics": {
          "en": "Applies evidence-based prebunking and digital literacy heuristics to fortify cognitive resilience within the Critical Thinking domain.",
          "ar": "يطبق أساليب التفنيد الاستباقي المستندة إلى الأدلة ومهارات الوعي الرقمي لتعزيز المرونة المعرفية ضمن مجال Critical Thinking."
        },
        "bestUseCases": {
          "en": "Ideal for daily inoculation exercises or when encountering questionable media narratives related to Critical Thinking.",
          "ar": "مثالي لتمارين التلقيح المعرفي اليومية أو عند مواجهة روايات إعلامية مشكوك فيها تتعلق بـ Critical Thinking."
        },
        "copyPasteScenario": "> INITIATE PROTOCOL: CRITICAL_THINKING\n> TARGET: Active vulnerability scanning\n> THREAT LEVEL: 4/5\n> ACTION: Deploying Critical Thinking heuristics...\n> STATUS: Verified and secured."
      },
      {
        "id": "item-4-4",
        "href": "/knowledge-graph",
        "name": {
          "en": "Knowledge Graph",
          "ar": "شبكة المعرفة"
        },
        "scientificMechanics": {
          "en": "Applies evidence-based prebunking and digital literacy heuristics to fortify cognitive resilience within the Knowledge Graph domain.",
          "ar": "يطبق أساليب التفنيد الاستباقي المستندة إلى الأدلة ومهارات الوعي الرقمي لتعزيز المرونة المعرفية ضمن مجال Knowledge Graph."
        },
        "bestUseCases": {
          "en": "Ideal for daily inoculation exercises or when encountering questionable media narratives related to Knowledge Graph.",
          "ar": "مثالي لتمارين التلقيح المعرفي اليومية أو عند مواجهة روايات إعلامية مشكوك فيها تتعلق بـ Knowledge Graph."
        },
        "copyPasteScenario": "> INITIATE PROTOCOL: KNOWLEDGE_GRAPH\n> TARGET: Active vulnerability scanning\n> THREAT LEVEL: 5/5\n> ACTION: Deploying Knowledge Graph heuristics...\n> STATUS: Verified and secured."
      },
      {
        "id": "item-4-5",
        "href": "/stat-power",
        "name": {
          "en": "Statistical Power",
          "ar": "القوة الإحصائية"
        },
        "scientificMechanics": {
          "en": "Applies evidence-based prebunking and digital literacy heuristics to fortify cognitive resilience within the Statistical Power domain.",
          "ar": "يطبق أساليب التفنيد الاستباقي المستندة إلى الأدلة ومهارات الوعي الرقمي لتعزيز المرونة المعرفية ضمن مجال Statistical Power."
        },
        "bestUseCases": {
          "en": "Ideal for daily inoculation exercises or when encountering questionable media narratives related to Statistical Power.",
          "ar": "مثالي لتمارين التلقيح المعرفي اليومية أو عند مواجهة روايات إعلامية مشكوك فيها تتعلق بـ Statistical Power."
        },
        "copyPasteScenario": "> INITIATE PROTOCOL: STATISTICAL_POWER\n> TARGET: Active vulnerability scanning\n> THREAT LEVEL: 1/5\n> ACTION: Deploying Statistical Power heuristics...\n> STATUS: Verified and secured."
      }
    ]
  },
  {
    "id": "science-evidence",
    "title": {
      "en": "Science & Evidence",
      "ar": "العلم والأدلة"
    },
    "description": {
      "en": "Specialized forensic and orchestration nodes for Science & Evidence.",
      "ar": "عقد تحليلية متخصصة وإدارية لـ العلم والأدلة."
    },
    "items": [
      {
        "id": "item-5-0",
        "href": "/science",
        "name": {
          "en": "Science Hub",
          "ar": "مركز العلوم"
        },
        "scientificMechanics": {
          "en": "Applies evidence-based prebunking and digital literacy heuristics to fortify cognitive resilience within the Science Hub domain.",
          "ar": "يطبق أساليب التفنيد الاستباقي المستندة إلى الأدلة ومهارات الوعي الرقمي لتعزيز المرونة المعرفية ضمن مجال Science Hub."
        },
        "bestUseCases": {
          "en": "Ideal for daily inoculation exercises or when encountering questionable media narratives related to Science Hub.",
          "ar": "مثالي لتمارين التلقيح المعرفي اليومية أو عند مواجهة روايات إعلامية مشكوك فيها تتعلق بـ Science Hub."
        },
        "copyPasteScenario": "> INITIATE PROTOCOL: SCIENCE_HUB\n> TARGET: Active vulnerability scanning\n> THREAT LEVEL: 1/5\n> ACTION: Deploying Science Hub heuristics...\n> STATUS: Verified and secured."
      },
      {
        "id": "item-5-1",
        "href": "/evidence",
        "name": {
          "en": "Evidence Library",
          "ar": "مكتبة الأدلة"
        },
        "scientificMechanics": {
          "en": "Applies evidence-based prebunking and digital literacy heuristics to fortify cognitive resilience within the Evidence Library domain.",
          "ar": "يطبق أساليب التفنيد الاستباقي المستندة إلى الأدلة ومهارات الوعي الرقمي لتعزيز المرونة المعرفية ضمن مجال Evidence Library."
        },
        "bestUseCases": {
          "en": "Ideal for daily inoculation exercises or when encountering questionable media narratives related to Evidence Library.",
          "ar": "مثالي لتمارين التلقيح المعرفي اليومية أو عند مواجهة روايات إعلامية مشكوك فيها تتعلق بـ Evidence Library."
        },
        "copyPasteScenario": "> INITIATE PROTOCOL: EVIDENCE_LIBRARY\n> TARGET: Active vulnerability scanning\n> THREAT LEVEL: 2/5\n> ACTION: Deploying Evidence Library heuristics...\n> STATUS: Verified and secured."
      },
      {
        "id": "item-5-2",
        "href": "/sources",
        "name": {
          "en": "Sources Registry",
          "ar": "سجل المصادر"
        },
        "scientificMechanics": {
          "en": "Applies evidence-based prebunking and digital literacy heuristics to fortify cognitive resilience within the Sources Registry domain.",
          "ar": "يطبق أساليب التفنيد الاستباقي المستندة إلى الأدلة ومهارات الوعي الرقمي لتعزيز المرونة المعرفية ضمن مجال Sources Registry."
        },
        "bestUseCases": {
          "en": "Ideal for daily inoculation exercises or when encountering questionable media narratives related to Sources Registry.",
          "ar": "مثالي لتمارين التلقيح المعرفي اليومية أو عند مواجهة روايات إعلامية مشكوك فيها تتعلق بـ Sources Registry."
        },
        "copyPasteScenario": "> INITIATE PROTOCOL: SOURCES_REGISTRY\n> TARGET: Active vulnerability scanning\n> THREAT LEVEL: 3/5\n> ACTION: Deploying Sources Registry heuristics...\n> STATUS: Verified and secured."
      },
      {
        "id": "item-5-3",
        "href": "/philosophy",
        "name": {
          "en": "Philosophy",
          "ar": "الفلسفة"
        },
        "scientificMechanics": {
          "en": "Applies evidence-based prebunking and digital literacy heuristics to fortify cognitive resilience within the Philosophy domain.",
          "ar": "يطبق أساليب التفنيد الاستباقي المستندة إلى الأدلة ومهارات الوعي الرقمي لتعزيز المرونة المعرفية ضمن مجال Philosophy."
        },
        "bestUseCases": {
          "en": "Ideal for daily inoculation exercises or when encountering questionable media narratives related to Philosophy.",
          "ar": "مثالي لتمارين التلقيح المعرفي اليومية أو عند مواجهة روايات إعلامية مشكوك فيها تتعلق بـ Philosophy."
        },
        "copyPasteScenario": "> INITIATE PROTOCOL: PHILOSOPHY\n> TARGET: Active vulnerability scanning\n> THREAT LEVEL: 4/5\n> ACTION: Deploying Philosophy heuristics...\n> STATUS: Verified and secured."
      },
      {
        "id": "item-5-4",
        "href": "/ux-science",
        "name": {
          "en": "UX Science",
          "ar": "علم تجربة المستخدم"
        },
        "scientificMechanics": {
          "en": "Applies evidence-based prebunking and digital literacy heuristics to fortify cognitive resilience within the UX Science domain.",
          "ar": "يطبق أساليب التفنيد الاستباقي المستندة إلى الأدلة ومهارات الوعي الرقمي لتعزيز المرونة المعرفية ضمن مجال UX Science."
        },
        "bestUseCases": {
          "en": "Ideal for daily inoculation exercises or when encountering questionable media narratives related to UX Science.",
          "ar": "مثالي لتمارين التلقيح المعرفي اليومية أو عند مواجهة روايات إعلامية مشكوك فيها تتعلق بـ UX Science."
        },
        "copyPasteScenario": "> INITIATE PROTOCOL: UX_SCIENCE\n> TARGET: Active vulnerability scanning\n> THREAT LEVEL: 5/5\n> ACTION: Deploying UX Science heuristics...\n> STATUS: Verified and secured."
      },
      {
        "id": "item-5-5",
        "href": "/six-layers",
        "name": {
          "en": "Six Layers Deep Dive 🌀",
          "ar": "الغوص العميق في الطبقات الست 🌀"
        },
        "scientificMechanics": {
          "en": "Tactical cognitive defense layer providing immediate, actionable counter-measures and prebunking scripts against specific adversarial attack vectors.",
          "ar": "طبقة دفاع معرفي تكتيكية توفر تدابير مضادة فورية وقابلة للتنفيذ ونصوص تفنيد استباقي ضد مسارات هجومية معادية محددة."
        },
        "bestUseCases": {
          "en": "Active defense protocol to be used immediately upon encountering a live threat vector matching the layer's profile.",
          "ar": "بروتوكول دفاع نشط يُستخدم فوراً عند مواجهة مسار تهديد مباشر يطابق الملف الشخصي للطبقة."
        },
        "copyPasteScenario": "> INITIATE PROTOCOL: SIX_LAYERS_DEEP_DIVE___\n> TARGET: Active vulnerability scanning\n> THREAT LEVEL: 1/5\n> ACTION: Deploying Six Layers Deep Dive 🌀 heuristics...\n> STATUS: Verified and secured."
      },
      {
        "id": "item-5-6",
        "href": "/fallacy-engine",
        "name": {
          "en": "Fallacy Engine 🧠",
          "ar": "محرك المغالطات 🧠"
        },
        "scientificMechanics": {
          "en": "Applies evidence-based prebunking and digital literacy heuristics to fortify cognitive resilience within the Fallacy Engine 🧠 domain.",
          "ar": "يطبق أساليب التفنيد الاستباقي المستندة إلى الأدلة ومهارات الوعي الرقمي لتعزيز المرونة المعرفية ضمن مجال Fallacy Engine 🧠."
        },
        "bestUseCases": {
          "en": "Ideal for daily inoculation exercises or when encountering questionable media narratives related to Fallacy Engine 🧠.",
          "ar": "مثالي لتمارين التلقيح المعرفي اليومية أو عند مواجهة روايات إعلامية مشكوك فيها تتعلق بـ Fallacy Engine 🧠."
        },
        "copyPasteScenario": "> INITIATE PROTOCOL: FALLACY_ENGINE___\n> TARGET: Active vulnerability scanning\n> THREAT LEVEL: 2/5\n> ACTION: Deploying Fallacy Engine 🧠 heuristics...\n> STATUS: Verified and secured."
      },
      {
        "id": "item-5-7",
        "href": "/bias-detector",
        "name": {
          "en": "Bias Detector ⚖️",
          "ar": "مكتشف التحيز ⚖️"
        },
        "scientificMechanics": {
          "en": "Applies evidence-based prebunking and digital literacy heuristics to fortify cognitive resilience within the Bias Detector ⚖️ domain.",
          "ar": "يطبق أساليب التفنيد الاستباقي المستندة إلى الأدلة ومهارات الوعي الرقمي لتعزيز المرونة المعرفية ضمن مجال Bias Detector ⚖️."
        },
        "bestUseCases": {
          "en": "Ideal for daily inoculation exercises or when encountering questionable media narratives related to Bias Detector ⚖️.",
          "ar": "مثالي لتمارين التلقيح المعرفي اليومية أو عند مواجهة روايات إعلامية مشكوك فيها تتعلق بـ Bias Detector ⚖️."
        },
        "copyPasteScenario": "> INITIATE PROTOCOL: BIAS_DETECTOR___\n> TARGET: Active vulnerability scanning\n> THREAT LEVEL: 3/5\n> ACTION: Deploying Bias Detector ⚖️ heuristics...\n> STATUS: Verified and secured."
      },
      {
        "id": "item-5-8",
        "href": "/cognitive-lab",
        "name": {
          "en": "Cognitive Lab",
          "ar": "المختبر المعرفي"
        },
        "scientificMechanics": {
          "en": "Applies evidence-based prebunking and digital literacy heuristics to fortify cognitive resilience within the Cognitive Lab domain.",
          "ar": "يطبق أساليب التفنيد الاستباقي المستندة إلى الأدلة ومهارات الوعي الرقمي لتعزيز المرونة المعرفية ضمن مجال Cognitive Lab."
        },
        "bestUseCases": {
          "en": "Ideal for daily inoculation exercises or when encountering questionable media narratives related to Cognitive Lab.",
          "ar": "مثالي لتمارين التلقيح المعرفي اليومية أو عند مواجهة روايات إعلامية مشكوك فيها تتعلق بـ Cognitive Lab."
        },
        "copyPasteScenario": "> INITIATE PROTOCOL: COGNITIVE_LAB\n> TARGET: Active vulnerability scanning\n> THREAT LEVEL: 4/5\n> ACTION: Deploying Cognitive Lab heuristics...\n> STATUS: Verified and secured."
      },
      {
        "id": "item-5-9",
        "href": "/epistemology",
        "name": {
          "en": "Epistemology",
          "ar": "نظرية المعرفة"
        },
        "scientificMechanics": {
          "en": "Applies evidence-based prebunking and digital literacy heuristics to fortify cognitive resilience within the Epistemology domain.",
          "ar": "يطبق أساليب التفنيد الاستباقي المستندة إلى الأدلة ومهارات الوعي الرقمي لتعزيز المرونة المعرفية ضمن مجال Epistemology."
        },
        "bestUseCases": {
          "en": "Ideal for daily inoculation exercises or when encountering questionable media narratives related to Epistemology.",
          "ar": "مثالي لتمارين التلقيح المعرفي اليومية أو عند مواجهة روايات إعلامية مشكوك فيها تتعلق بـ Epistemology."
        },
        "copyPasteScenario": "> INITIATE PROTOCOL: EPISTEMOLOGY\n> TARGET: Active vulnerability scanning\n> THREAT LEVEL: 5/5\n> ACTION: Deploying Epistemology heuristics...\n> STATUS: Verified and secured."
      },
      {
        "id": "item-5-10",
        "href": "/health-data",
        "name": {
          "en": "Health Data",
          "ar": "البيانات الصحية"
        },
        "scientificMechanics": {
          "en": "Applies cognitive behavioral principles and psychological safety frameworks to monitor and mitigate the mental toll of chronic exposure to adversarial narratives.",
          "ar": "يطبق مبادئ السلوك المعرفي وأطر السلامة النفسية لمراقبة وتخفيف العبء النفسي الناتج عن التعرض المزمن للروايات المعادية."
        },
        "bestUseCases": {
          "en": "Deployment recommended when users exhibit high cognitive fatigue or when navigating highly polarizing, emotionally charged content.",
          "ar": "يوصى بالنشر عندما يظهر المستخدمون إرهاقاً معرفياً عالياً أو عند التعامل مع محتوى شديد الاستقطاب والمشحون عاطفياً."
        },
        "copyPasteScenario": "> INITIATE PROTOCOL: HEALTH_DATA\n> TARGET: Active vulnerability scanning\n> THREAT LEVEL: 1/5\n> ACTION: Deploying Health Data heuristics...\n> STATUS: Verified and secured."
      },
      {
        "id": "item-5-11",
        "href": "/media-library",
        "name": {
          "en": "Media Library",
          "ar": "مكتبة الوسائط"
        },
        "scientificMechanics": {
          "en": "Applies evidence-based prebunking and digital literacy heuristics to fortify cognitive resilience within the Media Library domain.",
          "ar": "يطبق أساليب التفنيد الاستباقي المستندة إلى الأدلة ومهارات الوعي الرقمي لتعزيز المرونة المعرفية ضمن مجال Media Library."
        },
        "bestUseCases": {
          "en": "Ideal for daily inoculation exercises or when encountering questionable media narratives related to Media Library.",
          "ar": "مثالي لتمارين التلقيح المعرفي اليومية أو عند مواجهة روايات إعلامية مشكوك فيها تتعلق بـ Media Library."
        },
        "copyPasteScenario": "> INITIATE PROTOCOL: MEDIA_LIBRARY\n> TARGET: Active vulnerability scanning\n> THREAT LEVEL: 2/5\n> ACTION: Deploying Media Library heuristics...\n> STATUS: Verified and secured."
      },
      {
        "id": "item-5-12",
        "href": "/paper-auditor",
        "name": {
          "en": "Paper Auditor",
          "ar": "مدقق الأبحاث"
        },
        "scientificMechanics": {
          "en": "Applies evidence-based prebunking and digital literacy heuristics to fortify cognitive resilience within the Paper Auditor domain.",
          "ar": "يطبق أساليب التفنيد الاستباقي المستندة إلى الأدلة ومهارات الوعي الرقمي لتعزيز المرونة المعرفية ضمن مجال Paper Auditor."
        },
        "bestUseCases": {
          "en": "Ideal for daily inoculation exercises or when encountering questionable media narratives related to Paper Auditor.",
          "ar": "مثالي لتمارين التلقيح المعرفي اليومية أو عند مواجهة روايات إعلامية مشكوك فيها تتعلق بـ Paper Auditor."
        },
        "copyPasteScenario": "> INITIATE PROTOCOL: PAPER_AUDITOR\n> TARGET: Active vulnerability scanning\n> THREAT LEVEL: 3/5\n> ACTION: Deploying Paper Auditor heuristics...\n> STATUS: Verified and secured."
      }
    ]
  },
  {
    "id": "ai-tools",
    "title": {
      "en": "AI & Tools",
      "ar": "الذكاء الاصطناعي والأدوات"
    },
    "description": {
      "en": "Specialized forensic and orchestration nodes for AI & Tools.",
      "ar": "عقد تحليلية متخصصة وإدارية لـ الذكاء الاصطناعي والأدوات."
    },
    "items": [
      {
        "id": "item-6-0",
        "href": "/chatbot",
        "name": {
          "en": "AI Chatbot",
          "ar": "روبوت المحادثة"
        },
        "scientificMechanics": {
          "en": "Deploys autonomous neural networks to parse large-scale disinformation campaigns and provide instantaneous, scalable counter-narrative generation.",
          "ar": "ينشر شبكات عصبية مستقلة لتحليل حملات التضليل واسعة النطاق وتوفير توليد سرد مضاد فوري وقابل للتطوير."
        },
        "bestUseCases": {
          "en": "Ideal for daily inoculation exercises or when encountering questionable media narratives related to AI Chatbot.",
          "ar": "مثالي لتمارين التلقيح المعرفي اليومية أو عند مواجهة روايات إعلامية مشكوك فيها تتعلق بـ AI Chatbot."
        },
        "copyPasteScenario": "> INITIATE PROTOCOL: AI_CHATBOT\n> TARGET: Active vulnerability scanning\n> THREAT LEVEL: 1/5\n> ACTION: Deploying AI Chatbot heuristics...\n> STATUS: Verified and secured."
      },
      {
        "id": "item-6-1",
        "href": "/prompt-lab",
        "name": {
          "en": "Prompt Lab",
          "ar": "مختبر الأوامر"
        },
        "scientificMechanics": {
          "en": "Applies evidence-based prebunking and digital literacy heuristics to fortify cognitive resilience within the Prompt Lab domain.",
          "ar": "يطبق أساليب التفنيد الاستباقي المستندة إلى الأدلة ومهارات الوعي الرقمي لتعزيز المرونة المعرفية ضمن مجال Prompt Lab."
        },
        "bestUseCases": {
          "en": "Ideal for daily inoculation exercises or when encountering questionable media narratives related to Prompt Lab.",
          "ar": "مثالي لتمارين التلقيح المعرفي اليومية أو عند مواجهة روايات إعلامية مشكوك فيها تتعلق بـ Prompt Lab."
        },
        "copyPasteScenario": "> INITIATE PROTOCOL: PROMPT_LAB\n> TARGET: Active vulnerability scanning\n> THREAT LEVEL: 2/5\n> ACTION: Deploying Prompt Lab heuristics...\n> STATUS: Verified and secured."
      },
      {
        "id": "item-6-2",
        "href": "/connect",
        "name": {
          "en": "Connect & APIs",
          "ar": "الربط والواجهات البرمجية"
        },
        "scientificMechanics": {
          "en": "Applies evidence-based prebunking and digital literacy heuristics to fortify cognitive resilience within the Connect & APIs domain.",
          "ar": "يطبق أساليب التفنيد الاستباقي المستندة إلى الأدلة ومهارات الوعي الرقمي لتعزيز المرونة المعرفية ضمن مجال Connect & APIs."
        },
        "bestUseCases": {
          "en": "Ideal for daily inoculation exercises or when encountering questionable media narratives related to Connect & APIs.",
          "ar": "مثالي لتمارين التلقيح المعرفي اليومية أو عند مواجهة روايات إعلامية مشكوك فيها تتعلق بـ Connect & APIs."
        },
        "copyPasteScenario": "> INITIATE PROTOCOL: CONNECT___APIS\n> TARGET: Active vulnerability scanning\n> THREAT LEVEL: 3/5\n> ACTION: Deploying Connect & APIs heuristics...\n> STATUS: Verified and secured."
      },
      {
        "id": "item-6-3",
        "href": "/drug-checker",
        "name": {
          "en": "Drug Checker",
          "ar": "فاحص الأدوية"
        },
        "scientificMechanics": {
          "en": "Applies evidence-based prebunking and digital literacy heuristics to fortify cognitive resilience within the Drug Checker domain.",
          "ar": "يطبق أساليب التفنيد الاستباقي المستندة إلى الأدلة ومهارات الوعي الرقمي لتعزيز المرونة المعرفية ضمن مجال Drug Checker."
        },
        "bestUseCases": {
          "en": "Ideal for daily inoculation exercises or when encountering questionable media narratives related to Drug Checker.",
          "ar": "مثالي لتمارين التلقيح المعرفي اليومية أو عند مواجهة روايات إعلامية مشكوك فيها تتعلق بـ Drug Checker."
        },
        "copyPasteScenario": "> INITIATE PROTOCOL: DRUG_CHECKER\n> TARGET: Active vulnerability scanning\n> THREAT LEVEL: 4/5\n> ACTION: Deploying Drug Checker heuristics...\n> STATUS: Verified and secured."
      },
      {
        "id": "item-6-4",
        "href": "/open-source",
        "name": {
          "en": "Open Source Code",
          "ar": "البرمجيات مفتوحة المصدر"
        },
        "scientificMechanics": {
          "en": "Applies evidence-based prebunking and digital literacy heuristics to fortify cognitive resilience within the Open Source Code domain.",
          "ar": "يطبق أساليب التفنيد الاستباقي المستندة إلى الأدلة ومهارات الوعي الرقمي لتعزيز المرونة المعرفية ضمن مجال Open Source Code."
        },
        "bestUseCases": {
          "en": "Ideal for daily inoculation exercises or when encountering questionable media narratives related to Open Source Code.",
          "ar": "مثالي لتمارين التلقيح المعرفي اليومية أو عند مواجهة روايات إعلامية مشكوك فيها تتعلق بـ Open Source Code."
        },
        "copyPasteScenario": "> INITIATE PROTOCOL: OPEN_SOURCE_CODE\n> TARGET: Active vulnerability scanning\n> THREAT LEVEL: 5/5\n> ACTION: Deploying Open Source Code heuristics...\n> STATUS: Verified and secured."
      },
      {
        "id": "item-6-5",
        "href": "/others-search",
        "name": {
          "en": "Others Search",
          "ar": "بحث إضافي"
        },
        "scientificMechanics": {
          "en": "Applies evidence-based prebunking and digital literacy heuristics to fortify cognitive resilience within the Others Search domain.",
          "ar": "يطبق أساليب التفنيد الاستباقي المستندة إلى الأدلة ومهارات الوعي الرقمي لتعزيز المرونة المعرفية ضمن مجال Others Search."
        },
        "bestUseCases": {
          "en": "Ideal for daily inoculation exercises or when encountering questionable media narratives related to Others Search.",
          "ar": "مثالي لتمارين التلقيح المعرفي اليومية أو عند مواجهة روايات إعلامية مشكوك فيها تتعلق بـ Others Search."
        },
        "copyPasteScenario": "> INITIATE PROTOCOL: OTHERS_SEARCH\n> TARGET: Active vulnerability scanning\n> THREAT LEVEL: 1/5\n> ACTION: Deploying Others Search heuristics...\n> STATUS: Verified and secured."
      },
      {
        "id": "item-6-6",
        "href": "/tools-download",
        "name": {
          "en": "Tools Download",
          "ar": "تحميل الأدوات"
        },
        "scientificMechanics": {
          "en": "Applies evidence-based prebunking and digital literacy heuristics to fortify cognitive resilience within the Tools Download domain.",
          "ar": "يطبق أساليب التفنيد الاستباقي المستندة إلى الأدلة ومهارات الوعي الرقمي لتعزيز المرونة المعرفية ضمن مجال Tools Download."
        },
        "bestUseCases": {
          "en": "Ideal for daily inoculation exercises or when encountering questionable media narratives related to Tools Download.",
          "ar": "مثالي لتمارين التلقيح المعرفي اليومية أو عند مواجهة روايات إعلامية مشكوك فيها تتعلق بـ Tools Download."
        },
        "copyPasteScenario": "> INITIATE PROTOCOL: TOOLS_DOWNLOAD\n> TARGET: Active vulnerability scanning\n> THREAT LEVEL: 2/5\n> ACTION: Deploying Tools Download heuristics...\n> STATUS: Verified and secured."
      },
      {
        "id": "item-6-7",
        "href": "/whatsapp-analyzer",
        "name": {
          "en": "WhatsApp Analyzer",
          "ar": "محلل واتساب"
        },
        "scientificMechanics": {
          "en": "Applies evidence-based prebunking and digital literacy heuristics to fortify cognitive resilience within the WhatsApp Analyzer domain.",
          "ar": "يطبق أساليب التفنيد الاستباقي المستندة إلى الأدلة ومهارات الوعي الرقمي لتعزيز المرونة المعرفية ضمن مجال WhatsApp Analyzer."
        },
        "bestUseCases": {
          "en": "Ideal for daily inoculation exercises or when encountering questionable media narratives related to WhatsApp Analyzer.",
          "ar": "مثالي لتمارين التلقيح المعرفي اليومية أو عند مواجهة روايات إعلامية مشكوك فيها تتعلق بـ WhatsApp Analyzer."
        },
        "copyPasteScenario": "> INITIATE PROTOCOL: WHATSAPP_ANALYZER\n> TARGET: Active vulnerability scanning\n> THREAT LEVEL: 3/5\n> ACTION: Deploying WhatsApp Analyzer heuristics...\n> STATUS: Verified and secured."
      }
    ]
  },
  {
    "id": "presentations",
    "title": {
      "en": "Presentations",
      "ar": "العروض التقديمية"
    },
    "description": {
      "en": "Specialized forensic and orchestration nodes for Presentations.",
      "ar": "عقد تحليلية متخصصة وإدارية لـ العروض التقديمية."
    },
    "items": [
      {
        "id": "item-7-0",
        "href": "/report",
        "name": {
          "en": "Presentation / Report",
          "ar": "عرض تقديمي / تقرير"
        },
        "scientificMechanics": {
          "en": "Compiles high-fidelity analytical reporting and data visualization to communicate systemic threats to executive stakeholders and supervisors.",
          "ar": "يجمع تقارير تحليلية عالية الدقة وتصورات للبيانات لإيصال التهديدات المنهجية للمسؤولين والمشرفين."
        },
        "bestUseCases": {
          "en": "Use when briefing stakeholders, publishing formal findings, or demonstrating the ROI of the awareness platform.",
          "ar": "يُستخدم عند إطلاع أصحاب المصلحة، أو نشر النتائج الرسمية، أو إثبات العائد على الاستثمار لمنصة الوعي."
        },
        "copyPasteScenario": "> INITIATE PROTOCOL: PRESENTATION___REPORT\n> TARGET: Active vulnerability scanning\n> THREAT LEVEL: 1/5\n> ACTION: Deploying Presentation / Report heuristics...\n> STATUS: Verified and secured."
      },
      {
        "id": "item-7-1",
        "href": "/report",
        "name": {
          "en": "Report Dashboard",
          "ar": "لوحة تقارير"
        },
        "scientificMechanics": {
          "en": "Aggregates real-time threat intelligence and cognitive vulnerability metrics into a centralized visualization matrix for systemic oversight.",
          "ar": "يجمع معلومات التهديد في الوقت الفعلي ومقاييس الضعف المعرفي في مصفوفة تصور مركزية للرقابة المنهجية."
        },
        "bestUseCases": {
          "en": "Use when briefing stakeholders, publishing formal findings, or demonstrating the ROI of the awareness platform.",
          "ar": "يُستخدم عند إطلاع أصحاب المصلحة، أو نشر النتائج الرسمية، أو إثبات العائد على الاستثمار لمنصة الوعي."
        },
        "copyPasteScenario": "> INITIATE PROTOCOL: REPORT_DASHBOARD\n> TARGET: Active vulnerability scanning\n> THREAT LEVEL: 2/5\n> ACTION: Deploying Report Dashboard heuristics...\n> STATUS: Verified and secured."
      },
      {
        "id": "item-7-2",
        "href": "/supervisor",
        "name": {
          "en": "Supervisor View",
          "ar": "واجهة المشرف"
        },
        "scientificMechanics": {
          "en": "Applies evidence-based prebunking and digital literacy heuristics to fortify cognitive resilience within the Supervisor View domain.",
          "ar": "يطبق أساليب التفنيد الاستباقي المستندة إلى الأدلة ومهارات الوعي الرقمي لتعزيز المرونة المعرفية ضمن مجال Supervisor View."
        },
        "bestUseCases": {
          "en": "Ideal for daily inoculation exercises or when encountering questionable media narratives related to Supervisor View.",
          "ar": "مثالي لتمارين التلقيح المعرفي اليومية أو عند مواجهة روايات إعلامية مشكوك فيها تتعلق بـ Supervisor View."
        },
        "copyPasteScenario": "> INITIATE PROTOCOL: SUPERVISOR_VIEW\n> TARGET: Active vulnerability scanning\n> THREAT LEVEL: 3/5\n> ACTION: Deploying Supervisor View heuristics...\n> STATUS: Verified and secured."
      },
      {
        "id": "item-7-3",
        "href": "/pricing-presentation",
        "name": {
          "en": "Pricing Presentation",
          "ar": "عرض التسعير"
        },
        "scientificMechanics": {
          "en": "Compiles high-fidelity analytical reporting and data visualization to communicate systemic threats to executive stakeholders and supervisors.",
          "ar": "يجمع تقارير تحليلية عالية الدقة وتصورات للبيانات لإيصال التهديدات المنهجية للمسؤولين والمشرفين."
        },
        "bestUseCases": {
          "en": "Use when briefing stakeholders, publishing formal findings, or demonstrating the ROI of the awareness platform.",
          "ar": "يُستخدم عند إطلاع أصحاب المصلحة، أو نشر النتائج الرسمية، أو إثبات العائد على الاستثمار لمنصة الوعي."
        },
        "copyPasteScenario": "> INITIATE PROTOCOL: PRICING_PRESENTATION\n> TARGET: Active vulnerability scanning\n> THREAT LEVEL: 4/5\n> ACTION: Deploying Pricing Presentation heuristics...\n> STATUS: Verified and secured."
      },
      {
        "id": "item-7-4",
        "href": "/project-vision",
        "name": {
          "en": "Project Vision",
          "ar": "رؤية المشروع"
        },
        "scientificMechanics": {
          "en": "Applies evidence-based prebunking and digital literacy heuristics to fortify cognitive resilience within the Project Vision domain.",
          "ar": "يطبق أساليب التفنيد الاستباقي المستندة إلى الأدلة ومهارات الوعي الرقمي لتعزيز المرونة المعرفية ضمن مجال Project Vision."
        },
        "bestUseCases": {
          "en": "Ideal for daily inoculation exercises or when encountering questionable media narratives related to Project Vision.",
          "ar": "مثالي لتمارين التلقيح المعرفي اليومية أو عند مواجهة روايات إعلامية مشكوك فيها تتعلق بـ Project Vision."
        },
        "copyPasteScenario": "> INITIATE PROTOCOL: PROJECT_VISION\n> TARGET: Active vulnerability scanning\n> THREAT LEVEL: 5/5\n> ACTION: Deploying Project Vision heuristics...\n> STATUS: Verified and secured."
      },
      {
        "id": "item-7-5",
        "href": "/publishing-plan",
        "name": {
          "en": "Publishing Plan",
          "ar": "خطة النشر"
        },
        "scientificMechanics": {
          "en": "Applies evidence-based prebunking and digital literacy heuristics to fortify cognitive resilience within the Publishing Plan domain.",
          "ar": "يطبق أساليب التفنيد الاستباقي المستندة إلى الأدلة ومهارات الوعي الرقمي لتعزيز المرونة المعرفية ضمن مجال Publishing Plan."
        },
        "bestUseCases": {
          "en": "Ideal for daily inoculation exercises or when encountering questionable media narratives related to Publishing Plan.",
          "ar": "مثالي لتمارين التلقيح المعرفي اليومية أو عند مواجهة روايات إعلامية مشكوك فيها تتعلق بـ Publishing Plan."
        },
        "copyPasteScenario": "> INITIATE PROTOCOL: PUBLISHING_PLAN\n> TARGET: Active vulnerability scanning\n> THREAT LEVEL: 1/5\n> ACTION: Deploying Publishing Plan heuristics...\n> STATUS: Verified and secured."
      },
      {
        "id": "item-7-6",
        "href": "/trailer",
        "name": {
          "en": "Trailer",
          "ar": "العرض الترويجي"
        },
        "scientificMechanics": {
          "en": "Deploys autonomous neural networks to parse large-scale disinformation campaigns and provide instantaneous, scalable counter-narrative generation.",
          "ar": "ينشر شبكات عصبية مستقلة لتحليل حملات التضليل واسعة النطاق وتوفير توليد سرد مضاد فوري وقابل للتطوير."
        },
        "bestUseCases": {
          "en": "Ideal for daily inoculation exercises or when encountering questionable media narratives related to Trailer.",
          "ar": "مثالي لتمارين التلقيح المعرفي اليومية أو عند مواجهة روايات إعلامية مشكوك فيها تتعلق بـ Trailer."
        },
        "copyPasteScenario": "> INITIATE PROTOCOL: TRAILER\n> TARGET: Active vulnerability scanning\n> THREAT LEVEL: 2/5\n> ACTION: Deploying Trailer heuristics...\n> STATUS: Verified and secured."
      },
      {
        "id": "item-7-7",
        "href": "/about",
        "name": {
          "en": "About",
          "ar": "حول المشروع"
        },
        "scientificMechanics": {
          "en": "Applies evidence-based prebunking and digital literacy heuristics to fortify cognitive resilience within the About domain.",
          "ar": "يطبق أساليب التفنيد الاستباقي المستندة إلى الأدلة ومهارات الوعي الرقمي لتعزيز المرونة المعرفية ضمن مجال About."
        },
        "bestUseCases": {
          "en": "Ideal for daily inoculation exercises or when encountering questionable media narratives related to About.",
          "ar": "مثالي لتمارين التلقيح المعرفي اليومية أو عند مواجهة روايات إعلامية مشكوك فيها تتعلق بـ About."
        },
        "copyPasteScenario": "> INITIATE PROTOCOL: ABOUT\n> TARGET: Active vulnerability scanning\n> THREAT LEVEL: 3/5\n> ACTION: Deploying About heuristics...\n> STATUS: Verified and secured."
      }
    ]
  },
  {
    "id": "defense-strategy",
    "title": {
      "en": "Defense Strategy",
      "ar": "استراتيجية الدفاع"
    },
    "description": {
      "en": "Specialized forensic and orchestration nodes for Defense Strategy.",
      "ar": "عقد تحليلية متخصصة وإدارية لـ استراتيجية الدفاع."
    },
    "items": [
      {
        "id": "item-8-0",
        "href": "/defense-main-plan",
        "name": {
          "en": "Defense Main Plan",
          "ar": "الخطة الدفاعية الرئيسية"
        },
        "scientificMechanics": {
          "en": "Deploys autonomous neural networks to parse large-scale disinformation campaigns and provide instantaneous, scalable counter-narrative generation.",
          "ar": "ينشر شبكات عصبية مستقلة لتحليل حملات التضليل واسعة النطاق وتوفير توليد سرد مضاد فوري وقابل للتطوير."
        },
        "bestUseCases": {
          "en": "Ideal for daily inoculation exercises or when encountering questionable media narratives related to Defense Main Plan.",
          "ar": "مثالي لتمارين التلقيح المعرفي اليومية أو عند مواجهة روايات إعلامية مشكوك فيها تتعلق بـ Defense Main Plan."
        },
        "copyPasteScenario": "> INITIATE PROTOCOL: DEFENSE_MAIN_PLAN\n> TARGET: Active vulnerability scanning\n> THREAT LEVEL: 1/5\n> ACTION: Deploying Defense Main Plan heuristics...\n> STATUS: Verified and secured."
      },
      {
        "id": "item-8-1",
        "href": "/defense-pages-map",
        "name": {
          "en": "Defense Pages Map",
          "ar": "خريطة الصفحات الدفاعية"
        },
        "scientificMechanics": {
          "en": "Applies evidence-based prebunking and digital literacy heuristics to fortify cognitive resilience within the Defense Pages Map domain.",
          "ar": "يطبق أساليب التفنيد الاستباقي المستندة إلى الأدلة ومهارات الوعي الرقمي لتعزيز المرونة المعرفية ضمن مجال Defense Pages Map."
        },
        "bestUseCases": {
          "en": "Ideal for daily inoculation exercises or when encountering questionable media narratives related to Defense Pages Map.",
          "ar": "مثالي لتمارين التلقيح المعرفي اليومية أو عند مواجهة روايات إعلامية مشكوك فيها تتعلق بـ Defense Pages Map."
        },
        "copyPasteScenario": "> INITIATE PROTOCOL: DEFENSE_PAGES_MAP\n> TARGET: Active vulnerability scanning\n> THREAT LEVEL: 2/5\n> ACTION: Deploying Defense Pages Map heuristics...\n> STATUS: Verified and secured."
      },
      {
        "id": "item-8-2",
        "href": "/defense-main-plan",
        "name": {
          "en": "Defense Q&A",
          "ar": "سؤال وجواب دفاعي"
        },
        "scientificMechanics": {
          "en": "Applies evidence-based prebunking and digital literacy heuristics to fortify cognitive resilience within the Defense Q&A domain.",
          "ar": "يطبق أساليب التفنيد الاستباقي المستندة إلى الأدلة ومهارات الوعي الرقمي لتعزيز المرونة المعرفية ضمن مجال Defense Q&A."
        },
        "bestUseCases": {
          "en": "Ideal for daily inoculation exercises or when encountering questionable media narratives related to Defense Q&A.",
          "ar": "مثالي لتمارين التلقيح المعرفي اليومية أو عند مواجهة روايات إعلامية مشكوك فيها تتعلق بـ Defense Q&A."
        },
        "copyPasteScenario": "> INITIATE PROTOCOL: DEFENSE_Q_A\n> TARGET: Active vulnerability scanning\n> THREAT LEVEL: 3/5\n> ACTION: Deploying Defense Q&A heuristics...\n> STATUS: Verified and secured."
      },
      {
        "id": "item-8-3",
        "href": "/defense-test",
        "name": {
          "en": "Defense Test",
          "ar": "اختبار الدفاع"
        },
        "scientificMechanics": {
          "en": "Applies evidence-based prebunking and digital literacy heuristics to fortify cognitive resilience within the Defense Test domain.",
          "ar": "يطبق أساليب التفنيد الاستباقي المستندة إلى الأدلة ومهارات الوعي الرقمي لتعزيز المرونة المعرفية ضمن مجال Defense Test."
        },
        "bestUseCases": {
          "en": "Ideal for daily inoculation exercises or when encountering questionable media narratives related to Defense Test.",
          "ar": "مثالي لتمارين التلقيح المعرفي اليومية أو عند مواجهة روايات إعلامية مشكوك فيها تتعلق بـ Defense Test."
        },
        "copyPasteScenario": "> INITIATE PROTOCOL: DEFENSE_TEST\n> TARGET: Active vulnerability scanning\n> THREAT LEVEL: 4/5\n> ACTION: Deploying Defense Test heuristics...\n> STATUS: Verified and secured."
      },
      {
        "id": "item-8-4",
        "href": "/kill-list",
        "name": {
          "en": "Myth Kill-List",
          "ar": "قائمة دحض الأساطير"
        },
        "scientificMechanics": {
          "en": "Applies evidence-based prebunking and digital literacy heuristics to fortify cognitive resilience within the Myth Kill-List domain.",
          "ar": "يطبق أساليب التفنيد الاستباقي المستندة إلى الأدلة ومهارات الوعي الرقمي لتعزيز المرونة المعرفية ضمن مجال Myth Kill-List."
        },
        "bestUseCases": {
          "en": "Ideal for daily inoculation exercises or when encountering questionable media narratives related to Myth Kill-List.",
          "ar": "مثالي لتمارين التلقيح المعرفي اليومية أو عند مواجهة روايات إعلامية مشكوك فيها تتعلق بـ Myth Kill-List."
        },
        "copyPasteScenario": "> INITIATE PROTOCOL: MYTH_KILL_LIST\n> TARGET: Active vulnerability scanning\n> THREAT LEVEL: 5/5\n> ACTION: Deploying Myth Kill-List heuristics...\n> STATUS: Verified and secured."
      },
      {
        "id": "item-8-5",
        "href": "/manipulation-cards",
        "name": {
          "en": "Manipulation Cards",
          "ar": "بطاقات التلاعب"
        },
        "scientificMechanics": {
          "en": "Applies evidence-based prebunking and digital literacy heuristics to fortify cognitive resilience within the Manipulation Cards domain.",
          "ar": "يطبق أساليب التفنيد الاستباقي المستندة إلى الأدلة ومهارات الوعي الرقمي لتعزيز المرونة المعرفية ضمن مجال Manipulation Cards."
        },
        "bestUseCases": {
          "en": "Ideal for daily inoculation exercises or when encountering questionable media narratives related to Manipulation Cards.",
          "ar": "مثالي لتمارين التلقيح المعرفي اليومية أو عند مواجهة روايات إعلامية مشكوك فيها تتعلق بـ Manipulation Cards."
        },
        "copyPasteScenario": "> INITIATE PROTOCOL: MANIPULATION_CARDS\n> TARGET: Active vulnerability scanning\n> THREAT LEVEL: 1/5\n> ACTION: Deploying Manipulation Cards heuristics...\n> STATUS: Verified and secured."
      },
      {
        "id": "item-8-6",
        "href": "/arabic-shield",
        "name": {
          "en": "Men's Shield",
          "ar": "درع الرجال"
        },
        "scientificMechanics": {
          "en": "Contextualizes theological verification mechanics against radicalization vectors, anchoring psychological safety in verified doctrinal sources.",
          "ar": "يضع آليات التحقق اللاهوتي في سياقها ضد مسارات التطرف، ويرسخ السلامة النفسية في المصادر العقائدية الموثوقة."
        },
        "bestUseCases": {
          "en": "Ideal for daily inoculation exercises or when encountering questionable media narratives related to Men's Shield.",
          "ar": "مثالي لتمارين التلقيح المعرفي اليومية أو عند مواجهة روايات إعلامية مشكوك فيها تتعلق بـ Men's Shield."
        },
        "copyPasteScenario": "> INITIATE PROTOCOL: MEN_S_SHIELD\n> TARGET: Active vulnerability scanning\n> THREAT LEVEL: 2/5\n> ACTION: Deploying Men's Shield heuristics...\n> STATUS: Verified and secured."
      },
      {
        "id": "item-8-7",
        "href": "/arabic-shield",
        "name": {
          "en": "Women's Shield",
          "ar": "درع النساء"
        },
        "scientificMechanics": {
          "en": "Contextualizes theological verification mechanics against radicalization vectors, anchoring psychological safety in verified doctrinal sources.",
          "ar": "يضع آليات التحقق اللاهوتي في سياقها ضد مسارات التطرف، ويرسخ السلامة النفسية في المصادر العقائدية الموثوقة."
        },
        "bestUseCases": {
          "en": "Ideal for daily inoculation exercises or when encountering questionable media narratives related to Women's Shield.",
          "ar": "مثالي لتمارين التلقيح المعرفي اليومية أو عند مواجهة روايات إعلامية مشكوك فيها تتعلق بـ Women's Shield."
        },
        "copyPasteScenario": "> INITIATE PROTOCOL: WOMEN_S_SHIELD\n> TARGET: Active vulnerability scanning\n> THREAT LEVEL: 3/5\n> ACTION: Deploying Women's Shield heuristics...\n> STATUS: Verified and secured."
      },
      {
        "id": "item-8-8",
        "href": "/layers/layer-1/fight",
        "name": {
          "en": "Layer 1 Fight Page ⚔️",
          "ar": "الطبقة 1 صفحة الهجوم ⚔️"
        },
        "scientificMechanics": {
          "en": "Tactical cognitive defense layer providing immediate, actionable counter-measures and prebunking scripts against specific adversarial attack vectors.",
          "ar": "طبقة دفاع معرفي تكتيكية توفر تدابير مضادة فورية وقابلة للتنفيذ ونصوص تفنيد استباقي ضد مسارات هجومية معادية محددة."
        },
        "bestUseCases": {
          "en": "Active defense protocol to be used immediately upon encountering a live threat vector matching the layer's profile.",
          "ar": "بروتوكول دفاع نشط يُستخدم فوراً عند مواجهة مسار تهديد مباشر يطابق الملف الشخصي للطبقة."
        },
        "copyPasteScenario": "> INITIATE PROTOCOL: LAYER_1_FIGHT_PAGE___\n> TARGET: Active vulnerability scanning\n> THREAT LEVEL: 4/5\n> ACTION: Deploying Layer 1 Fight Page ⚔️ heuristics...\n> STATUS: Verified and secured."
      },
      {
        "id": "item-8-9",
        "href": "/layers/layer-2/fight",
        "name": {
          "en": "Layer 2 Fight Page ⚔️",
          "ar": "الطبقة 2 صفحة الهجوم ⚔️"
        },
        "scientificMechanics": {
          "en": "Tactical cognitive defense layer providing immediate, actionable counter-measures and prebunking scripts against specific adversarial attack vectors.",
          "ar": "طبقة دفاع معرفي تكتيكية توفر تدابير مضادة فورية وقابلة للتنفيذ ونصوص تفنيد استباقي ضد مسارات هجومية معادية محددة."
        },
        "bestUseCases": {
          "en": "Active defense protocol to be used immediately upon encountering a live threat vector matching the layer's profile.",
          "ar": "بروتوكول دفاع نشط يُستخدم فوراً عند مواجهة مسار تهديد مباشر يطابق الملف الشخصي للطبقة."
        },
        "copyPasteScenario": "> INITIATE PROTOCOL: LAYER_2_FIGHT_PAGE___\n> TARGET: Active vulnerability scanning\n> THREAT LEVEL: 5/5\n> ACTION: Deploying Layer 2 Fight Page ⚔️ heuristics...\n> STATUS: Verified and secured."
      },
      {
        "id": "item-8-10",
        "href": "/layers/layer-3/fight",
        "name": {
          "en": "Layer 3 Fight Page ⚔️",
          "ar": "الطبقة 3 صفحة الهجوم ⚔️"
        },
        "scientificMechanics": {
          "en": "Tactical cognitive defense layer providing immediate, actionable counter-measures and prebunking scripts against specific adversarial attack vectors.",
          "ar": "طبقة دفاع معرفي تكتيكية توفر تدابير مضادة فورية وقابلة للتنفيذ ونصوص تفنيد استباقي ضد مسارات هجومية معادية محددة."
        },
        "bestUseCases": {
          "en": "Active defense protocol to be used immediately upon encountering a live threat vector matching the layer's profile.",
          "ar": "بروتوكول دفاع نشط يُستخدم فوراً عند مواجهة مسار تهديد مباشر يطابق الملف الشخصي للطبقة."
        },
        "copyPasteScenario": "> INITIATE PROTOCOL: LAYER_3_FIGHT_PAGE___\n> TARGET: Active vulnerability scanning\n> THREAT LEVEL: 1/5\n> ACTION: Deploying Layer 3 Fight Page ⚔️ heuristics...\n> STATUS: Verified and secured."
      },
      {
        "id": "item-8-11",
        "href": "/layers/layer-4/fight",
        "name": {
          "en": "Layer 4 Fight Page ⚔️",
          "ar": "الطبقة 4 صفحة الهجوم ⚔️"
        },
        "scientificMechanics": {
          "en": "Tactical cognitive defense layer providing immediate, actionable counter-measures and prebunking scripts against specific adversarial attack vectors.",
          "ar": "طبقة دفاع معرفي تكتيكية توفر تدابير مضادة فورية وقابلة للتنفيذ ونصوص تفنيد استباقي ضد مسارات هجومية معادية محددة."
        },
        "bestUseCases": {
          "en": "Active defense protocol to be used immediately upon encountering a live threat vector matching the layer's profile.",
          "ar": "بروتوكول دفاع نشط يُستخدم فوراً عند مواجهة مسار تهديد مباشر يطابق الملف الشخصي للطبقة."
        },
        "copyPasteScenario": "> INITIATE PROTOCOL: LAYER_4_FIGHT_PAGE___\n> TARGET: Active vulnerability scanning\n> THREAT LEVEL: 2/5\n> ACTION: Deploying Layer 4 Fight Page ⚔️ heuristics...\n> STATUS: Verified and secured."
      },
      {
        "id": "item-8-12",
        "href": "/layers/layer-5/fight",
        "name": {
          "en": "Layer 5 Fight Page ⚔️",
          "ar": "الطبقة 5 صفحة الهجوم ⚔️"
        },
        "scientificMechanics": {
          "en": "Tactical cognitive defense layer providing immediate, actionable counter-measures and prebunking scripts against specific adversarial attack vectors.",
          "ar": "طبقة دفاع معرفي تكتيكية توفر تدابير مضادة فورية وقابلة للتنفيذ ونصوص تفنيد استباقي ضد مسارات هجومية معادية محددة."
        },
        "bestUseCases": {
          "en": "Active defense protocol to be used immediately upon encountering a live threat vector matching the layer's profile.",
          "ar": "بروتوكول دفاع نشط يُستخدم فوراً عند مواجهة مسار تهديد مباشر يطابق الملف الشخصي للطبقة."
        },
        "copyPasteScenario": "> INITIATE PROTOCOL: LAYER_5_FIGHT_PAGE___\n> TARGET: Active vulnerability scanning\n> THREAT LEVEL: 3/5\n> ACTION: Deploying Layer 5 Fight Page ⚔️ heuristics...\n> STATUS: Verified and secured."
      },
      {
        "id": "item-8-13",
        "href": "/layers/layer-6/fight",
        "name": {
          "en": "Layer 6 Fight Page ⚔️",
          "ar": "الطبقة 6 صفحة الهجوم ⚔️"
        },
        "scientificMechanics": {
          "en": "Tactical cognitive defense layer providing immediate, actionable counter-measures and prebunking scripts against specific adversarial attack vectors.",
          "ar": "طبقة دفاع معرفي تكتيكية توفر تدابير مضادة فورية وقابلة للتنفيذ ونصوص تفنيد استباقي ضد مسارات هجومية معادية محددة."
        },
        "bestUseCases": {
          "en": "Active defense protocol to be used immediately upon encountering a live threat vector matching the layer's profile.",
          "ar": "بروتوكول دفاع نشط يُستخدم فوراً عند مواجهة مسار تهديد مباشر يطابق الملف الشخصي للطبقة."
        },
        "copyPasteScenario": "> INITIATE PROTOCOL: LAYER_6_FIGHT_PAGE___\n> TARGET: Active vulnerability scanning\n> THREAT LEVEL: 4/5\n> ACTION: Deploying Layer 6 Fight Page ⚔️ heuristics...\n> STATUS: Verified and secured."
      },
      {
        "id": "item-8-14",
        "href": "/layers/layer-7/fight",
        "name": {
          "en": "Layer 7 Fight Page ⚔️",
          "ar": "الطبقة 7 صفحة الهجوم ⚔️"
        },
        "scientificMechanics": {
          "en": "Tactical cognitive defense layer providing immediate, actionable counter-measures and prebunking scripts against specific adversarial attack vectors.",
          "ar": "طبقة دفاع معرفي تكتيكية توفر تدابير مضادة فورية وقابلة للتنفيذ ونصوص تفنيد استباقي ضد مسارات هجومية معادية محددة."
        },
        "bestUseCases": {
          "en": "Active defense protocol to be used immediately upon encountering a live threat vector matching the layer's profile.",
          "ar": "بروتوكول دفاع نشط يُستخدم فوراً عند مواجهة مسار تهديد مباشر يطابق الملف الشخصي للطبقة."
        },
        "copyPasteScenario": "> INITIATE PROTOCOL: LAYER_7_FIGHT_PAGE___\n> TARGET: Active vulnerability scanning\n> THREAT LEVEL: 5/5\n> ACTION: Deploying Layer 7 Fight Page ⚔️ heuristics...\n> STATUS: Verified and secured."
      },
      {
        "id": "item-8-15",
        "href": "/layers/layer-8/fight",
        "name": {
          "en": "Layer 8 Fight Page ⚔️",
          "ar": "الطبقة 8 صفحة الهجوم ⚔️"
        },
        "scientificMechanics": {
          "en": "Tactical cognitive defense layer providing immediate, actionable counter-measures and prebunking scripts against specific adversarial attack vectors.",
          "ar": "طبقة دفاع معرفي تكتيكية توفر تدابير مضادة فورية وقابلة للتنفيذ ونصوص تفنيد استباقي ضد مسارات هجومية معادية محددة."
        },
        "bestUseCases": {
          "en": "Active defense protocol to be used immediately upon encountering a live threat vector matching the layer's profile.",
          "ar": "بروتوكول دفاع نشط يُستخدم فوراً عند مواجهة مسار تهديد مباشر يطابق الملف الشخصي للطبقة."
        },
        "copyPasteScenario": "> INITIATE PROTOCOL: LAYER_8_FIGHT_PAGE___\n> TARGET: Active vulnerability scanning\n> THREAT LEVEL: 1/5\n> ACTION: Deploying Layer 8 Fight Page ⚔️ heuristics...\n> STATUS: Verified and secured."
      }
    ]
  },
  {
    "id": "innovation-lab",
    "title": {
      "en": "Innovation Lab",
      "ar": "مختبر الابتكار"
    },
    "description": {
      "en": "Specialized forensic and orchestration nodes for Innovation Lab.",
      "ar": "عقد تحليلية متخصصة وإدارية لـ مختبر الابتكار."
    },
    "items": [
      {
        "id": "item-9-0",
        "href": "/bias-fingerprint",
        "name": {
          "en": "Cognitive Bias Fingerprint",
          "ar": "بصمة التحيز المعرفي"
        },
        "scientificMechanics": {
          "en": "Applies evidence-based prebunking and digital literacy heuristics to fortify cognitive resilience within the Cognitive Bias Fingerprint domain.",
          "ar": "يطبق أساليب التفنيد الاستباقي المستندة إلى الأدلة ومهارات الوعي الرقمي لتعزيز المرونة المعرفية ضمن مجال Cognitive Bias Fingerprint."
        },
        "bestUseCases": {
          "en": "Ideal for daily inoculation exercises or when encountering questionable media narratives related to Cognitive Bias Fingerprint.",
          "ar": "مثالي لتمارين التلقيح المعرفي اليومية أو عند مواجهة روايات إعلامية مشكوك فيها تتعلق بـ Cognitive Bias Fingerprint."
        },
        "copyPasteScenario": "> INITIATE PROTOCOL: COGNITIVE_BIAS_FINGERPRINT\n> TARGET: Active vulnerability scanning\n> THREAT LEVEL: 1/5\n> ACTION: Deploying Cognitive Bias Fingerprint heuristics...\n> STATUS: Verified and secured."
      },
      {
        "id": "item-9-1",
        "href": "/inoculation-passport",
        "name": {
          "en": "Inoculation Passport",
          "ar": "جواز التلقيح المعرفي"
        },
        "scientificMechanics": {
          "en": "Applies evidence-based prebunking and digital literacy heuristics to fortify cognitive resilience within the Inoculation Passport domain.",
          "ar": "يطبق أساليب التفنيد الاستباقي المستندة إلى الأدلة ومهارات الوعي الرقمي لتعزيز المرونة المعرفية ضمن مجال Inoculation Passport."
        },
        "bestUseCases": {
          "en": "Ideal for daily inoculation exercises or when encountering questionable media narratives related to Inoculation Passport.",
          "ar": "مثالي لتمارين التلقيح المعرفي اليومية أو عند مواجهة روايات إعلامية مشكوك فيها تتعلق بـ Inoculation Passport."
        },
        "copyPasteScenario": "> INITIATE PROTOCOL: INOCULATION_PASSPORT\n> TARGET: Active vulnerability scanning\n> THREAT LEVEL: 2/5\n> ACTION: Deploying Inoculation Passport heuristics...\n> STATUS: Verified and secured."
      },
      {
        "id": "item-9-2",
        "href": "/arabic-shield",
        "name": {
          "en": "Arabic Manipulation Shield 🛡️",
          "ar": "درع التلاعب العربي 🛡️"
        },
        "scientificMechanics": {
          "en": "Contextualizes theological verification mechanics against radicalization vectors, anchoring psychological safety in verified doctrinal sources.",
          "ar": "يضع آليات التحقق اللاهوتي في سياقها ضد مسارات التطرف، ويرسخ السلامة النفسية في المصادر العقائدية الموثوقة."
        },
        "bestUseCases": {
          "en": "Ideal for daily inoculation exercises or when encountering questionable media narratives related to Arabic Manipulation Shield 🛡️.",
          "ar": "مثالي لتمارين التلقيح المعرفي اليومية أو عند مواجهة روايات إعلامية مشكوك فيها تتعلق بـ Arabic Manipulation Shield 🛡️."
        },
        "copyPasteScenario": "> INITIATE PROTOCOL: ARABIC_MANIPULATION_SHIELD____\n> TARGET: Active vulnerability scanning\n> THREAT LEVEL: 3/5\n> ACTION: Deploying Arabic Manipulation Shield 🛡️ heuristics...\n> STATUS: Verified and secured."
      },
      {
        "id": "item-9-3",
        "href": "/family-kit",
        "name": {
          "en": "Family Protection Kit",
          "ar": "مجموعة حماية الأسرة"
        },
        "scientificMechanics": {
          "en": "Applies evidence-based prebunking and digital literacy heuristics to fortify cognitive resilience within the Family Protection Kit domain.",
          "ar": "يطبق أساليب التفنيد الاستباقي المستندة إلى الأدلة ومهارات الوعي الرقمي لتعزيز المرونة المعرفية ضمن مجال Family Protection Kit."
        },
        "bestUseCases": {
          "en": "Ideal for daily inoculation exercises or when encountering questionable media narratives related to Family Protection Kit.",
          "ar": "مثالي لتمارين التلقيح المعرفي اليومية أو عند مواجهة روايات إعلامية مشكوك فيها تتعلق بـ Family Protection Kit."
        },
        "copyPasteScenario": "> INITIATE PROTOCOL: FAMILY_PROTECTION_KIT\n> TARGET: Active vulnerability scanning\n> THREAT LEVEL: 4/5\n> ACTION: Deploying Family Protection Kit heuristics...\n> STATUS: Verified and secured."
      },
      {
        "id": "item-9-4",
        "href": "/defense-test",
        "name": {
          "en": "Reaction Speed Test",
          "ar": "اختبار سرعة التفاعل"
        },
        "scientificMechanics": {
          "en": "Applies evidence-based prebunking and digital literacy heuristics to fortify cognitive resilience within the Reaction Speed Test domain.",
          "ar": "يطبق أساليب التفنيد الاستباقي المستندة إلى الأدلة ومهارات الوعي الرقمي لتعزيز المرونة المعرفية ضمن مجال Reaction Speed Test."
        },
        "bestUseCases": {
          "en": "Ideal for daily inoculation exercises or when encountering questionable media narratives related to Reaction Speed Test.",
          "ar": "مثالي لتمارين التلقيح المعرفي اليومية أو عند مواجهة روايات إعلامية مشكوك فيها تتعلق بـ Reaction Speed Test."
        },
        "copyPasteScenario": "> INITIATE PROTOCOL: REACTION_SPEED_TEST\n> TARGET: Active vulnerability scanning\n> THREAT LEVEL: 5/5\n> ACTION: Deploying Reaction Speed Test heuristics...\n> STATUS: Verified and secured."
      },
      {
        "id": "item-9-5",
        "href": "/certificate",
        "name": {
          "en": "Awareness Certificate",
          "ar": "شهادة الوعي"
        },
        "scientificMechanics": {
          "en": "Applies evidence-based prebunking and digital literacy heuristics to fortify cognitive resilience within the Awareness Certificate domain.",
          "ar": "يطبق أساليب التفنيد الاستباقي المستندة إلى الأدلة ومهارات الوعي الرقمي لتعزيز المرونة المعرفية ضمن مجال Awareness Certificate."
        },
        "bestUseCases": {
          "en": "Ideal for daily inoculation exercises or when encountering questionable media narratives related to Awareness Certificate.",
          "ar": "مثالي لتمارين التلقيح المعرفي اليومية أو عند مواجهة روايات إعلامية مشكوك فيها تتعلق بـ Awareness Certificate."
        },
        "copyPasteScenario": "> INITIATE PROTOCOL: AWARENESS_CERTIFICATE\n> TARGET: Active vulnerability scanning\n> THREAT LEVEL: 1/5\n> ACTION: Deploying Awareness Certificate heuristics...\n> STATUS: Verified and secured."
      },
      {
        "id": "item-9-6",
        "href": "/transformation",
        "name": {
          "en": "Before → After",
          "ar": "قبل ← بعد"
        },
        "scientificMechanics": {
          "en": "Applies evidence-based prebunking and digital literacy heuristics to fortify cognitive resilience within the Before → After domain.",
          "ar": "يطبق أساليب التفنيد الاستباقي المستندة إلى الأدلة ومهارات الوعي الرقمي لتعزيز المرونة المعرفية ضمن مجال Before → After."
        },
        "bestUseCases": {
          "en": "Ideal for daily inoculation exercises or when encountering questionable media narratives related to Before → After.",
          "ar": "مثالي لتمارين التلقيح المعرفي اليومية أو عند مواجهة روايات إعلامية مشكوك فيها تتعلق بـ Before → After."
        },
        "copyPasteScenario": "> INITIATE PROTOCOL: BEFORE___AFTER\n> TARGET: Active vulnerability scanning\n> THREAT LEVEL: 2/5\n> ACTION: Deploying Before → After heuristics...\n> STATUS: Verified and secured."
      },
      {
        "id": "item-9-7",
        "href": "/comb-tracker",
        "name": {
          "en": "COM-B Behavior Tracker",
          "ar": "متتبع سلوك COM-B"
        },
        "scientificMechanics": {
          "en": "Sequential micro-learning protocol utilizing spaced repetition to embed critical evaluation heuristics for module COM-B Behavior Tracker.",
          "ar": "بروتوكول تعلم مصغر متسلسل يستخدم التكرار المتباعد لترسيخ مهارات التقييم النقدي لوحدة COM-B Behavior Tracker."
        },
        "bestUseCases": {
          "en": "Ideal for daily inoculation exercises or when encountering questionable media narratives related to COM-B Behavior Tracker.",
          "ar": "مثالي لتمارين التلقيح المعرفي اليومية أو عند مواجهة روايات إعلامية مشكوك فيها تتعلق بـ COM-B Behavior Tracker."
        },
        "copyPasteScenario": "> INITIATE PROTOCOL: COM_B_BEHAVIOR_TRACKER\n> TARGET: Active vulnerability scanning\n> THREAT LEVEL: 3/5\n> ACTION: Deploying COM-B Behavior Tracker heuristics...\n> STATUS: Verified and secured."
      },
      {
        "id": "item-9-8",
        "href": "/threat-briefing",
        "name": {
          "en": "Daily Threat Briefing",
          "ar": "موجز التهديدات اليومي"
        },
        "scientificMechanics": {
          "en": "Deploys autonomous neural networks to parse large-scale disinformation campaigns and provide instantaneous, scalable counter-narrative generation.",
          "ar": "ينشر شبكات عصبية مستقلة لتحليل حملات التضليل واسعة النطاق وتوفير توليد سرد مضاد فوري وقابل للتطوير."
        },
        "bestUseCases": {
          "en": "Ideal for daily inoculation exercises or when encountering questionable media narratives related to Daily Threat Briefing.",
          "ar": "مثالي لتمارين التلقيح المعرفي اليومية أو عند مواجهة روايات إعلامية مشكوك فيها تتعلق بـ Daily Threat Briefing."
        },
        "copyPasteScenario": "> INITIATE PROTOCOL: DAILY_THREAT_BRIEFING\n> TARGET: Active vulnerability scanning\n> THREAT LEVEL: 4/5\n> ACTION: Deploying Daily Threat Briefing heuristics...\n> STATUS: Verified and secured."
      },
      {
        "id": "item-9-9",
        "href": "/misinfo-atlas",
        "name": {
          "en": "Egyptian Misinfo Atlas",
          "ar": "أطلس التضليل المصري"
        },
        "scientificMechanics": {
          "en": "Aggregates real-time threat intelligence and cognitive vulnerability metrics into a centralized visualization matrix for systemic oversight.",
          "ar": "يجمع معلومات التهديد في الوقت الفعلي ومقاييس الضعف المعرفي في مصفوفة تصور مركزية للرقابة المنهجية."
        },
        "bestUseCases": {
          "en": "Ideal for daily inoculation exercises or when encountering questionable media narratives related to Egyptian Misinfo Atlas.",
          "ar": "مثالي لتمارين التلقيح المعرفي اليومية أو عند مواجهة روايات إعلامية مشكوك فيها تتعلق بـ Egyptian Misinfo Atlas."
        },
        "copyPasteScenario": "> INITIATE PROTOCOL: EGYPTIAN_MISINFO_ATLAS\n> TARGET: Active vulnerability scanning\n> THREAT LEVEL: 5/5\n> ACTION: Deploying Egyptian Misinfo Atlas heuristics...\n> STATUS: Verified and secured."
      },
      {
        "id": "item-9-10",
        "href": "/dashboard",
        "name": {
          "en": "Effect Size Dashboard",
          "ar": "لوحة حجم التأثير"
        },
        "scientificMechanics": {
          "en": "Aggregates real-time threat intelligence and cognitive vulnerability metrics into a centralized visualization matrix for systemic oversight.",
          "ar": "يجمع معلومات التهديد في الوقت الفعلي ومقاييس الضعف المعرفي في مصفوفة تصور مركزية للرقابة المنهجية."
        },
        "bestUseCases": {
          "en": "Ideal for daily inoculation exercises or when encountering questionable media narratives related to Effect Size Dashboard.",
          "ar": "مثالي لتمارين التلقيح المعرفي اليومية أو عند مواجهة روايات إعلامية مشكوك فيها تتعلق بـ Effect Size Dashboard."
        },
        "copyPasteScenario": "> INITIATE PROTOCOL: EFFECT_SIZE_DASHBOARD\n> TARGET: Active vulnerability scanning\n> THREAT LEVEL: 1/5\n> ACTION: Deploying Effect Size Dashboard heuristics...\n> STATUS: Verified and secured."
      },
      {
        "id": "item-9-11",
        "href": "/peer-challenge",
        "name": {
          "en": "Peer Challenge Mode",
          "ar": "وضع تحدي الأقران"
        },
        "scientificMechanics": {
          "en": "Applies evidence-based prebunking and digital literacy heuristics to fortify cognitive resilience within the Peer Challenge Mode domain.",
          "ar": "يطبق أساليب التفنيد الاستباقي المستندة إلى الأدلة ومهارات الوعي الرقمي لتعزيز المرونة المعرفية ضمن مجال Peer Challenge Mode."
        },
        "bestUseCases": {
          "en": "Ideal for daily inoculation exercises or when encountering questionable media narratives related to Peer Challenge Mode.",
          "ar": "مثالي لتمارين التلقيح المعرفي اليومية أو عند مواجهة روايات إعلامية مشكوك فيها تتعلق بـ Peer Challenge Mode."
        },
        "copyPasteScenario": "> INITIATE PROTOCOL: PEER_CHALLENGE_MODE\n> TARGET: Active vulnerability scanning\n> THREAT LEVEL: 2/5\n> ACTION: Deploying Peer Challenge Mode heuristics...\n> STATUS: Verified and secured."
      },
      {
        "id": "item-9-12",
        "href": "/angry-debunkers",
        "name": {
          "en": "The Angry Debunkers 🔥",
          "ar": "المفندون الغاضبون 🔥"
        },
        "scientificMechanics": {
          "en": "Applies evidence-based prebunking and digital literacy heuristics to fortify cognitive resilience within the The Angry Debunkers 🔥 domain.",
          "ar": "يطبق أساليب التفنيد الاستباقي المستندة إلى الأدلة ومهارات الوعي الرقمي لتعزيز المرونة المعرفية ضمن مجال The Angry Debunkers 🔥."
        },
        "bestUseCases": {
          "en": "Ideal for daily inoculation exercises or when encountering questionable media narratives related to The Angry Debunkers 🔥.",
          "ar": "مثالي لتمارين التلقيح المعرفي اليومية أو عند مواجهة روايات إعلامية مشكوك فيها تتعلق بـ The Angry Debunkers 🔥."
        },
        "copyPasteScenario": "> INITIATE PROTOCOL: THE_ANGRY_DEBUNKERS___\n> TARGET: Active vulnerability scanning\n> THREAT LEVEL: 3/5\n> ACTION: Deploying The Angry Debunkers 🔥 heuristics...\n> STATUS: Verified and secured."
      },
      {
        "id": "item-9-13",
        "href": "/bad-news",
        "name": {
          "en": "Bad News Game 🌟",
          "ar": "لعبة الأخبار السيئة 🌟"
        },
        "scientificMechanics": {
          "en": "Leverages interactive gamification and active inoculation theory to preemptively build cognitive immunity against Bad News Game 🌟 manipulation.",
          "ar": "يستخدم التلعيب التفاعلي ونظرية التلقيح النشط لبناء مناعة معرفية استباقية ضد أساليب التلاعب في Bad News Game 🌟."
        },
        "bestUseCases": {
          "en": "Optimal for onboarding youth demographics and facilitating engaging, low-friction inoculation exercises.",
          "ar": "مثالي لدمج فئة الشباب وتسهيل تمارين التلقيح المعرفي التفاعلية والسلسة."
        },
        "copyPasteScenario": "> INITIATE PROTOCOL: BAD_NEWS_GAME___\n> TARGET: Active vulnerability scanning\n> THREAT LEVEL: 4/5\n> ACTION: Deploying Bad News Game 🌟 heuristics...\n> STATUS: Verified and secured."
      },
      {
        "id": "item-9-14",
        "href": "/osint-investigator",
        "name": {
          "en": "Live OSINT Investigator ⚡",
          "ar": "المحقق مفتوح المصدر المباشر ⚡"
        },
        "scientificMechanics": {
          "en": "Deploys advanced media provenance algorithms and metadata analysis to deconstruct synthetic or manipulated media vectors.",
          "ar": "ينشر خوارزميات متقدمة لتحليل مصدر الوسائط والبيانات الوصفية لتفكيك الوسائط المصطنعة أو المتلاعب بها."
        },
        "bestUseCases": {
          "en": "Critical for investigating suspected deepfakes, manipulated imagery, and tracing the origin of highly viral, unverified media.",
          "ar": "ضروري للتحقيق في التزييف العميق المشتبه به، والصور المتلاعب بها، وتتبع مصدر الوسائط الفيروسية غير المؤكدة."
        },
        "copyPasteScenario": "> INITIATE PROTOCOL: LIVE_OSINT_INVESTIGATOR__\n> TARGET: Active vulnerability scanning\n> THREAT LEVEL: 5/5\n> ACTION: Deploying Live OSINT Investigator ⚡ heuristics...\n> STATUS: Verified and secured."
      },
      {
        "id": "item-9-15",
        "href": "/forensic-image",
        "name": {
          "en": "DeepReal Media Forensics 👁️",
          "ar": "التحليل الجنائي للوسائط 👁️"
        },
        "scientificMechanics": {
          "en": "Deploys advanced media provenance algorithms and metadata analysis to deconstruct synthetic or manipulated media vectors.",
          "ar": "ينشر خوارزميات متقدمة لتحليل مصدر الوسائط والبيانات الوصفية لتفكيك الوسائط المصطنعة أو المتلاعب بها."
        },
        "bestUseCases": {
          "en": "Critical for investigating suspected deepfakes, manipulated imagery, and tracing the origin of highly viral, unverified media.",
          "ar": "ضروري للتحقيق في التزييف العميق المشتبه به، والصور المتلاعب بها، وتتبع مصدر الوسائط الفيروسية غير المؤكدة."
        },
        "copyPasteScenario": "> INITIATE PROTOCOL: DEEPREAL_MEDIA_FORENSICS____\n> TARGET: Active vulnerability scanning\n> THREAT LEVEL: 1/5\n> ACTION: Deploying DeepReal Media Forensics 👁️ heuristics...\n> STATUS: Verified and secured."
      },
      {
        "id": "item-9-16",
        "href": "/live-deception",
        "name": {
          "en": "Live Deception Monitor",
          "ar": "مراقب الخداع المباشر"
        },
        "scientificMechanics": {
          "en": "Applies evidence-based prebunking and digital literacy heuristics to fortify cognitive resilience within the Live Deception Monitor domain.",
          "ar": "يطبق أساليب التفنيد الاستباقي المستندة إلى الأدلة ومهارات الوعي الرقمي لتعزيز المرونة المعرفية ضمن مجال Live Deception Monitor."
        },
        "bestUseCases": {
          "en": "Ideal for daily inoculation exercises or when encountering questionable media narratives related to Live Deception Monitor.",
          "ar": "مثالي لتمارين التلقيح المعرفي اليومية أو عند مواجهة روايات إعلامية مشكوك فيها تتعلق بـ Live Deception Monitor."
        },
        "copyPasteScenario": "> INITIATE PROTOCOL: LIVE_DECEPTION_MONITOR\n> TARGET: Active vulnerability scanning\n> THREAT LEVEL: 2/5\n> ACTION: Deploying Live Deception Monitor heuristics...\n> STATUS: Verified and secured."
      },
      {
        "id": "item-9-17",
        "href": "/ai-agents",
        "name": {
          "en": "AI Agents Dashboard 🤖",
          "ar": "لوحة وكلاء الذكاء الاصطناعي 🤖"
        },
        "scientificMechanics": {
          "en": "Aggregates real-time threat intelligence and cognitive vulnerability metrics into a centralized visualization matrix for systemic oversight.",
          "ar": "يجمع معلومات التهديد في الوقت الفعلي ومقاييس الضعف المعرفي في مصفوفة تصور مركزية للرقابة المنهجية."
        },
        "bestUseCases": {
          "en": "Ideal for daily inoculation exercises or when encountering questionable media narratives related to AI Agents Dashboard 🤖.",
          "ar": "مثالي لتمارين التلقيح المعرفي اليومية أو عند مواجهة روايات إعلامية مشكوك فيها تتعلق بـ AI Agents Dashboard 🤖."
        },
        "copyPasteScenario": "> INITIATE PROTOCOL: AI_AGENTS_DASHBOARD___\n> TARGET: Active vulnerability scanning\n> THREAT LEVEL: 3/5\n> ACTION: Deploying AI Agents Dashboard 🤖 heuristics...\n> STATUS: Verified and secured."
      },
      {
        "id": "item-9-18",
        "href": "/global-alliance",
        "name": {
          "en": "Global Alliance 🌍",
          "ar": "التحالف العالمي 🌍"
        },
        "scientificMechanics": {
          "en": "Applies evidence-based prebunking and digital literacy heuristics to fortify cognitive resilience within the Global Alliance 🌍 domain.",
          "ar": "يطبق أساليب التفنيد الاستباقي المستندة إلى الأدلة ومهارات الوعي الرقمي لتعزيز المرونة المعرفية ضمن مجال Global Alliance 🌍."
        },
        "bestUseCases": {
          "en": "Ideal for daily inoculation exercises or when encountering questionable media narratives related to Global Alliance 🌍.",
          "ar": "مثالي لتمارين التلقيح المعرفي اليومية أو عند مواجهة روايات إعلامية مشكوك فيها تتعلق بـ Global Alliance 🌍."
        },
        "copyPasteScenario": "> INITIATE PROTOCOL: GLOBAL_ALLIANCE___\n> TARGET: Active vulnerability scanning\n> THREAT LEVEL: 4/5\n> ACTION: Deploying Global Alliance 🌍 heuristics...\n> STATUS: Verified and secured."
      },
      {
        "id": "item-9-19",
        "href": "/sovo",
        "name": {
          "en": "SOVO: Scientific Orchestrator 🧠",
          "ar": "SOVO: المنسق العلمي 🧠"
        },
        "scientificMechanics": {
          "en": "Applies evidence-based prebunking and digital literacy heuristics to fortify cognitive resilience within the SOVO: Scientific Orchestrator 🧠 domain.",
          "ar": "يطبق أساليب التفنيد الاستباقي المستندة إلى الأدلة ومهارات الوعي الرقمي لتعزيز المرونة المعرفية ضمن مجال SOVO: Scientific Orchestrator 🧠."
        },
        "bestUseCases": {
          "en": "Ideal for daily inoculation exercises or when encountering questionable media narratives related to SOVO: Scientific Orchestrator 🧠.",
          "ar": "مثالي لتمارين التلقيح المعرفي اليومية أو عند مواجهة روايات إعلامية مشكوك فيها تتعلق بـ SOVO: Scientific Orchestrator 🧠."
        },
        "copyPasteScenario": "> INITIATE PROTOCOL: SOVO__SCIENTIFIC_ORCHESTRATOR___\n> TARGET: Active vulnerability scanning\n> THREAT LEVEL: 5/5\n> ACTION: Deploying SOVO: Scientific Orchestrator 🧠 heuristics...\n> STATUS: Verified and secured."
      },
      {
        "id": "item-9-20",
        "href": "/blackbox",
        "name": {
          "en": "Blackbox Forensic Audit",
          "ar": "التدقيق الجنائي للصندوق الأسود"
        },
        "scientificMechanics": {
          "en": "Deploys advanced media provenance algorithms and metadata analysis to deconstruct synthetic or manipulated media vectors.",
          "ar": "ينشر خوارزميات متقدمة لتحليل مصدر الوسائط والبيانات الوصفية لتفكيك الوسائط المصطنعة أو المتلاعب بها."
        },
        "bestUseCases": {
          "en": "Critical for investigating suspected deepfakes, manipulated imagery, and tracing the origin of highly viral, unverified media.",
          "ar": "ضروري للتحقيق في التزييف العميق المشتبه به، والصور المتلاعب بها، وتتبع مصدر الوسائط الفيروسية غير المؤكدة."
        },
        "copyPasteScenario": "> INITIATE PROTOCOL: BLACKBOX_FORENSIC_AUDIT\n> TARGET: Active vulnerability scanning\n> THREAT LEVEL: 1/5\n> ACTION: Deploying Blackbox Forensic Audit heuristics...\n> STATUS: Verified and secured."
      },
      {
        "id": "item-9-21",
        "href": "/god-system",
        "name": {
          "en": "The God System 🏛️",
          "ar": "النظام السيادي 🏛️"
        },
        "scientificMechanics": {
          "en": "Applies evidence-based prebunking and digital literacy heuristics to fortify cognitive resilience within the The God System 🏛️ domain.",
          "ar": "يطبق أساليب التفنيد الاستباقي المستندة إلى الأدلة ومهارات الوعي الرقمي لتعزيز المرونة المعرفية ضمن مجال The God System 🏛️."
        },
        "bestUseCases": {
          "en": "Ideal for daily inoculation exercises or when encountering questionable media narratives related to The God System 🏛️.",
          "ar": "مثالي لتمارين التلقيح المعرفي اليومية أو عند مواجهة روايات إعلامية مشكوك فيها تتعلق بـ The God System 🏛️."
        },
        "copyPasteScenario": "> INITIATE PROTOCOL: THE_GOD_SYSTEM____\n> TARGET: Active vulnerability scanning\n> THREAT LEVEL: 2/5\n> ACTION: Deploying The God System 🏛️ heuristics...\n> STATUS: Verified and secured."
      },
      {
        "id": "item-9-22",
        "href": "/forensic-image",
        "name": {
          "en": "Forensic Image 👁️",
          "ar": "التحليل الجنائي للصور 👁️"
        },
        "scientificMechanics": {
          "en": "Deploys advanced media provenance algorithms and metadata analysis to deconstruct synthetic or manipulated media vectors.",
          "ar": "ينشر خوارزميات متقدمة لتحليل مصدر الوسائط والبيانات الوصفية لتفكيك الوسائط المصطنعة أو المتلاعب بها."
        },
        "bestUseCases": {
          "en": "Critical for investigating suspected deepfakes, manipulated imagery, and tracing the origin of highly viral, unverified media.",
          "ar": "ضروري للتحقيق في التزييف العميق المشتبه به، والصور المتلاعب بها، وتتبع مصدر الوسائط الفيروسية غير المؤكدة."
        },
        "copyPasteScenario": "> INITIATE PROTOCOL: FORENSIC_IMAGE____\n> TARGET: Active vulnerability scanning\n> THREAT LEVEL: 3/5\n> ACTION: Deploying Forensic Image 👁️ heuristics...\n> STATUS: Verified and secured."
      },
      {
        "id": "item-9-23",
        "href": "/forensic-c2pa",
        "name": {
          "en": "Forensic C2PA 🛡️",
          "ar": "التحقق الجنائي C2PA 🛡️"
        },
        "scientificMechanics": {
          "en": "Deploys advanced media provenance algorithms and metadata analysis to deconstruct synthetic or manipulated media vectors.",
          "ar": "ينشر خوارزميات متقدمة لتحليل مصدر الوسائط والبيانات الوصفية لتفكيك الوسائط المصطنعة أو المتلاعب بها."
        },
        "bestUseCases": {
          "en": "Critical for investigating suspected deepfakes, manipulated imagery, and tracing the origin of highly viral, unverified media.",
          "ar": "ضروري للتحقيق في التزييف العميق المشتبه به، والصور المتلاعب بها، وتتبع مصدر الوسائط الفيروسية غير المؤكدة."
        },
        "copyPasteScenario": "> INITIATE PROTOCOL: FORENSIC_C2PA____\n> TARGET: Active vulnerability scanning\n> THREAT LEVEL: 4/5\n> ACTION: Deploying Forensic C2PA 🛡️ heuristics...\n> STATUS: Verified and secured."
      },
      {
        "id": "item-9-24",
        "href": "/debate-sim",
        "name": {
          "en": "Socratic Debate Simulator",
          "ar": "محاكي النقاش السقراطي"
        },
        "scientificMechanics": {
          "en": "Leverages interactive gamification and active inoculation theory to preemptively build cognitive immunity against Socratic Debate Simulator manipulation.",
          "ar": "يستخدم التلعيب التفاعلي ونظرية التلقيح النشط لبناء مناعة معرفية استباقية ضد أساليب التلاعب في Socratic Debate Simulator."
        },
        "bestUseCases": {
          "en": "Optimal for onboarding youth demographics and facilitating engaging, low-friction inoculation exercises.",
          "ar": "مثالي لدمج فئة الشباب وتسهيل تمارين التلقيح المعرفي التفاعلية والسلسة."
        },
        "copyPasteScenario": "> INITIATE PROTOCOL: SOCRATIC_DEBATE_SIMULATOR\n> TARGET: Active vulnerability scanning\n> THREAT LEVEL: 5/5\n> ACTION: Deploying Socratic Debate Simulator heuristics...\n> STATUS: Verified and secured."
      },
      {
        "id": "item-9-25",
        "href": "/trend-hunter",
        "name": {
          "en": "Viral Trend Forensics",
          "ar": "تحليل الاتجاهات الفيروسية"
        },
        "scientificMechanics": {
          "en": "Deploys advanced media provenance algorithms and metadata analysis to deconstruct synthetic or manipulated media vectors.",
          "ar": "ينشر خوارزميات متقدمة لتحليل مصدر الوسائط والبيانات الوصفية لتفكيك الوسائط المصطنعة أو المتلاعب بها."
        },
        "bestUseCases": {
          "en": "Critical for investigating suspected deepfakes, manipulated imagery, and tracing the origin of highly viral, unverified media.",
          "ar": "ضروري للتحقيق في التزييف العميق المشتبه به، والصور المتلاعب بها، وتتبع مصدر الوسائط الفيروسية غير المؤكدة."
        },
        "copyPasteScenario": "> INITIATE PROTOCOL: VIRAL_TREND_FORENSICS\n> TARGET: Active vulnerability scanning\n> THREAT LEVEL: 1/5\n> ACTION: Deploying Viral Trend Forensics heuristics...\n> STATUS: Verified and secured."
      }
    ]
  }
];
