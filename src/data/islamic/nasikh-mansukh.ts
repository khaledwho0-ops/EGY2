export interface AbrogatedVerse {
  id: string;
  verseRef: string;
  surah: number;
  ayah: number;
  abrogatedBy: string;
  type: "ruling_only" | "recitation_only" | "both";
  context: {
    en: string;
    ar: string;
  };
  explanation: {
    en: string;
    ar: string;
  };
  reference: string;
}

export const nasikhMansukhData: AbrogatedVerse[] = [
  {
    id: "NM_001",
    verseRef: "2:240",
    surah: 2,
    ayah: 240,
    abrogatedBy: "2:234",
    type: "ruling_only",
    context: {
      en: "The original inheritance ruling concerning widows, which obliged husbands to leave a bequest of maintenance and housing for a full year.",
      ar: "الحكم الأصلي المتعلق بميراث الأرامل، والذي أوجب على الأزواج الوصية بنفقة وسكنى لمدة عام كامل."
    },
    explanation: {
      en: "This ruling was abrogated by Surah Al-Baqarah (2:234), which shortened the waiting period (Iddah) of the widow to four months and ten days, and the inheritance portions defined in Surah An-Nisa (4:12).",
      ar: "تم نسخ هذا الحكم بآية سورة البقرة (2:234) التي حددت عدة الأرملة بأربعة أشهر وعشرة أيام، وبأنصبة الميراث المحددة في سورة النساء (4:12)."
    },
    reference: "Tafsir Ibn Kathir / Al-Jassas (Ahkam al-Quran)"
  },
  {
    id: "NM_002",
    verseRef: "2:180",
    surah: 2,
    ayah: 180,
    abrogatedBy: "4:11, 4:12",
    type: "ruling_only",
    context: {
      en: "The obligation to write a bequest (wasiyyah) for parents and close relatives when death approaches.",
      ar: "وجوب الوصية للوالدين والأقربين عند اقتراب الموت."
    },
    explanation: {
      en: "Abrogated by the detailed inheritance portions (Mirath) revealed in Surah An-Nisa (4:11-12) and the Prophetic statement 'There is no bequest for an heir'.",
      ar: "نسخت بآيات المواريث المفصلة في سورة النساء (4:11-12) وقول الرسول ﷺ: 'لا وصية لوارث'."
    },
    reference: "Sunan al-Tirmidhi / Tafsir al-Qurtubi"
  },
  {
    id: "NM_003",
    verseRef: "2:184",
    surah: 2,
    ayah: 184,
    abrogatedBy: "2:185",
    type: "ruling_only",
    context: {
      en: "The choice between fasting during Ramadan or feeding a poor person (Fidyah) for those who are able to fast.",
      ar: "التخيير بين الصيام في رمضان أو إطعام مسكين (فدية) لمن يطيق الصيام."
    },
    explanation: {
      en: "This voluntary option was abrogated by Surah Al-Baqarah (2:185), making fasting mandatory for all healthy, non-traveling adults: 'So whoever sights the month, let him fast it.'",
      ar: "تم نسخ هذا التخيير بسورة البقرة (2:185) التي جعلت الصيام فرضاً عينياً على كل صحيح مقيم: 'فَمَن شَهِدَ مِنكُمُ الشَّهْرَ فَلْيَصُمْهُ'."
    },
    reference: "Sahih al-Bukhari / Tafsir al-Tabari"
  },
  {
    id: "NM_004",
    verseRef: "8:65",
    surah: 8,
    ayah: 65,
    abrogatedBy: "8:66",
    type: "ruling_only",
    context: {
      en: "The obligation of twenty patient Muslim fighters to stand firm against two hundred enemies (a ratio of 1 to 10).",
      ar: "وجوب ثبات عشرين مقاتلاً صابراً من المسلمين أمام مئتين من الأعداء (نسبة 1 إلى 10)."
    },
    explanation: {
      en: "Abrogated by the subsequent verse (8:66) which lightened the burden due to weakness, requiring firmness at a ratio of 1 to 2 (one hundred against two hundred).",
      ar: "نسخت بالآية التالية مباشرة (8:66) التي خففت هذا العبء لمراعاة الضعف، فأوجبت الثبات بنسبة 1 إلى 2 (مئة أمام مئتين)."
    },
    reference: "Sahih al-Bukhari / Tafsir Ibn Kathir"
  },
  {
    id: "NM_005",
    verseRef: "58:12",
    surah: 58,
    ayah: 12,
    abrogatedBy: "58:13",
    type: "ruling_only",
    context: {
      en: "The command for believers to give charity (Sadaqah) before holding a private consultation with the Prophet ﷺ.",
      ar: "الأمر بتقديم صدقة قبل مناجاة الرسول ﷺ."
    },
    explanation: {
      en: "Abrogated by the next verse (58:13) because the believers found it difficult: 'Are you afraid that you should spend charity before your consultation? ... Then perform prayer and give Zakat...'",
      ar: "نسخت بالآية التالية (58:13) لمشقة ذلك على المؤمنين: 'أَأَشْفَقْتُمْ أَن تُقَدِّمُوا بَيْنَ يَدَيْ نَجْوَاكُمْ صَدَقَاتٍ... فَأَقِيمُوا الصَّلَاةَ وَآتُوا الزَّكَاةَ'."
    },
    reference: "Tafsir al-Jalalayn / Sunan al-Nasa'i"
  },
  {
    id: "NM_006",
    verseRef: "2:115",
    surah: 2,
    ayah: 115,
    abrogatedBy: "2:144",
    type: "ruling_only",
    context: {
      en: "Permission to face any direction in prayer ('Wherever you turn, there is the face of Allah').",
      ar: "إباحة استقبال أي جهة في الصلاة ('فَأَيْنَمَا تُوَلُّوا فَثَمَّ وَجْهُ اللَّهِ')."
    },
    explanation: {
      en: "This general permission was abrogated by Surah Al-Baqarah (2:144), which mandated facing the Sacred Mosque (Al-Masjid Al-Haram) in Makkah for all formal prayers.",
      ar: "نسخ هذا الحكم العام بآية سورة البقرة (2:144) التي فرضت استقبال المسجد الحرام بمكة في جميع الصلوات المكتوبة."
    },
    reference: "Tafsir al-Tabari"
  },
  {
    id: "NM_007",
    verseRef: "4:15",
    surah: 4,
    ayah: 15,
    abrogatedBy: "24:2",
    type: "ruling_only",
    context: {
      en: "The initial penalty for women guilty of unlawful sexual intercourse (adultery/fornication), which was confinement in their homes until death.",
      ar: "العقوبة الأولية للنساء اللاتي يأتين بالفاحشة وهي الإمساك في البيوت حتى الموت."
    },
    explanation: {
      en: "Abrogated by Surah An-Nur (24:2), which instituted flogging of one hundred stripes for unmarried offenders, and the Sunnah which established stoning for married offenders.",
      ar: "نسخت بآية سورة النور (24:2) التي حددت الجلد مئة جلدة لغير المحصن، والسنة التي أوجبت الرجم للمحصن."
    },
    reference: "Sahih Muslim / Tafsir al-Qurtubi"
  },
  {
    id: "NM_008",
    verseRef: "3:200",
    surah: 3,
    ayah: 200,
    abrogatedBy: "None",
    type: "ruling_only",
    context: {
      en: "Not abrogated, but commonly misidentified. Enforces patience and steadfastness.",
      ar: "غير منسوخ، ولكن يتم خلطه بالمنسوخ أحياناً. يأمر بالصبر والمصابرة ورابطة الإيمان."
    },
    explanation: {
      en: "This verse is a Muhkam (clear, non-abrogated) ruling detailing the perpetual obligation of spiritual and physical readiness.",
      ar: "هذه الآية محكمة غير منسوخة، توضح فرضية الثبات والصبر والرباط الدائمين."
    },
    reference: "Al-Nasikh wal-Mansukh by Ibn Hazm"
  }
];

export function checkAbrogation(surah: number, ayah: number): AbrogatedVerse | undefined {
  return nasikhMansukhData.find(
    (item) => item.surah === surah && item.ayah === ayah
  );
}
