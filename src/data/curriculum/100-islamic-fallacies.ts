// Source: classical usul al-fiqh literature, kalam (Islamic theology), and tafsir methodology.
// Seed names: src/data/prompts/fallacies.ts ids 99–100 (Tashbih, Ta'til).
// All entries are documented categories in established Islamic scholarly tradition.
// References: Ibn Taymiyya "Dar' Ta'arud al-'Aql wa-l-Naql"; al-Shafi'i "al-Risala";
// al-Ghazali "al-Mustasfa"; al-Suyuti "al-Itqan fi 'Ulum al-Qur'an";
// Kamali "Principles of Islamic Jurisprudence" (3rd ed., 2003);
// Hallaq "A History of Islamic Legal Theories" (Cambridge, 1997).
//
// ONE LAW NOTE: 28 real entries are produced. Padding to 100 with invented names would
// violate the project's One Law. The array name is kept as "islamicFallacies" and the
// type as IslamicFallacy to preserve importer compatibility.

export interface IslamicFallacy {
  id: string;
  name: string;
  nameAR: string;
  description: string;
  descriptionAR: string;
  example: string;
  source: string;
}

export const islamicFallacies: IslamicFallacy[] = [
  // ── Theological / Aqida errors ────────────────────────────────────
  {
    id: 'if-1',
    name: 'Tashbih (Anthropomorphic Overreach)',
    nameAR: 'التشبيه',
    description: 'Interpreting divine attributes in a way that likens Allah to created beings, treating descriptions of divine characteristics as identical in nature to human characteristics.',
    descriptionAR: 'تفسير الصفات الإلهية بما يُشبِّه الله بالمخلوقين.',
    example: 'Insisting that "hand" in scriptural descriptions of Allah must literally mean a human-like physical limb.',
    source: 'Ibn Taymiyya, "Dar\' Ta\'arud al-\'Aql wa-l-Naql"; Kamali, "Principles of Islamic Jurisprudence", 3rd ed. 2003, Ch. 2'
  },
  {
    id: 'if-2',
    name: "Ta'til (Denial of Attributes)",
    nameAR: 'التعطيل',
    description: 'Negating divine attributes entirely to avoid anthropomorphism, stripping scripture of its affirmed meanings — the opposite error to Tashbih.',
    descriptionAR: 'نفي الصفات الإلهية كليًا تفاديًا للتشبيه، مما يُفرِّغ النص من معانيه المُثبَتة.',
    example: 'Claiming Allah has no attributes whatsoever, treating all Quranic descriptions as purely metaphorical with no real referent.',
    source: 'Ibn Taymiyya, "Dar\' Ta\'arud al-\'Aql wa-l-Naql"; al-Ghazali, "al-Iqtisad fi al-I\'tiqad"'
  },
  {
    id: 'if-3',
    name: "Takfir Without Conditions (Takfir Bila Shurutihi)",
    nameAR: 'التكفير بلا شروطه',
    description: 'Declaring a Muslim to be an unbeliever without fulfilling the established scholarly conditions — establishing proof, removing impediments, and excluding valid scholarly interpretive difference.',
    descriptionAR: 'الحكم بالكفر على مسلم دون استيفاء الشروط العلمية المقررة.',
    example: 'Labeling a fellow Muslim an apostate based on a single contested statement without reference to scholarly conditions or context.',
    source: 'Ibn Taymiyya, "Majmu\' al-Fatawa", vol. 12; Kamali, "Principles of Islamic Jurisprudence", Ch. 14'
  },
  {
    id: 'if-4',
    name: "Bid'a Hasana Denial",
    nameAR: 'إنكار البدعة الحسنة',
    description: 'Treating every innovation in religious practice as necessarily forbidden, ignoring the classical scholarly distinction between blameworthy innovation (bid\'a sayyi\'a) and praiseworthy innovation (bid\'a hasana) established by al-Shafi\'i and later scholars.',
    descriptionAR: 'اعتبار كل إحداث في الدين محرمًا مع إغفال تمييز العلماء بين البدعة المذمومة والحسنة.',
    example: 'Prohibiting the compilation of Quran into a single volume on grounds of it being an "innovation", ignoring that the companions accepted it as beneficial.',
    source: 'Al-Nawawi, "Tahdhib al-Asma\'"; Kamali, "Principles of Islamic Jurisprudence", 3rd ed., Ch. 8'
  },
  // ── Hadith methodology errors ─────────────────────────────────────
  {
    id: 'if-5',
    name: "Fabricated Hadith Citation (Riwaya Mawdu'a)",
    nameAR: 'الاستدلال بالحديث الموضوع',
    description: 'Invoking a fabricated (mawdu\') hadith as a religious ruling or moral instruction, treating rejected narrations as authoritative.',
    descriptionAR: 'الاستدلال بحديث موضوع مكذوب في الأحكام الشرعية أو الترغيب.',
    example: 'Citing "اطلبوا العلم ولو في الصين" as a binding prophetic hadith when its chain is absent and most muhaddithin classify it as mawdu\'.',
    source: 'Al-Suyuti, "al-La\'ali al-Masnu\'a fi al-Ahadith al-Mawdu\'a"; al-Albani, "Silsilat al-Ahadith al-Da\'ifa"'
  },
  {
    id: 'if-6',
    name: "Da'if Hadith in Theology or Rulings",
    nameAR: 'الاحتجاج بالحديث الضعيف في العقيدة والأحكام',
    description: 'Using a weak (da\'if) hadith as evidence for a theological belief or a mandatory legal ruling, when the scholarly consensus permits da\'if hadith only for supererogatory acts and virtue reports under strict conditions.',
    descriptionAR: 'الاحتجاج بالحديث الضعيف في تأسيس حكم شرعي أو عقيدة.',
    example: 'Deriving a mandatory ruling from a single-chain narration that scholars have graded da\'if.',
    source: 'Ibn Hajar al-\'Asqalani, "Nuzhat al-Nazar"; Kamali, "Principles of Islamic Jurisprudence", Ch. 3'
  },
  {
    id: 'if-7',
    name: 'Isnad-Only Validation (Ignoring Matn Critique)',
    nameAR: 'الاكتفاء بصحة الإسناد دون نقد المتن',
    description: 'Treating a hadith as authentic purely because its chain (isnad) is sound, ignoring the classical requirement to also examine the text (matn) for anomalies, contradictions with stronger reports, or logical impossibility.',
    descriptionAR: 'القبول بالحديث على أساس صحة الإسناد فحسب دون فحص المتن.',
    example: 'Accepting a narration with a sound chain that contains a detail contradicting an established principle, without applying matn criticism.',
    source: 'Ibn al-Qayyim, "al-Manar al-Munif"; Hallaq, "A History of Islamic Legal Theories", Cambridge 1997'
  },
  {
    id: 'if-8',
    name: 'Single Narrator Fabrication Ignored',
    nameAR: 'إهمال الانفراد المريب',
    description: 'Accepting a hadith reported by a single narrator (gharib) on a matter of great import without subjecting the single transmission to heightened scrutiny.',
    descriptionAR: 'قبول حديث غريب في أمر عظيم دون فحص خاص للانفراد.',
    example: 'Building a theological position exclusively on a hadith with a single transmitter whose sole narration contradicts the wider corpus.',
    source: 'Al-Shafi\'i, "al-Risala", §§ on khabar al-wahid; Kamali, "Principles of Islamic Jurisprudence", Ch. 3'
  },
  // ── Quranic hermeneutics / Tafsir errors ──────────────────────────
  {
    id: 'if-9',
    name: "Tafsir Bil-Ra'y (Exegesis Solely by Opinion)",
    nameAR: 'التفسير بالرأي المجرد',
    description: 'Interpreting Quranic verses based purely on personal opinion or contemporary assumptions without grounding in classical Arabic lexicology, hadith, companion reports, or scholarly consensus.',
    descriptionAR: 'تفسير آيات القرآن بالرأي المجرد دون مراعاة اللغة والأثر وأقوال العلماء.',
    example: 'Explaining a Quranic verse on a legal matter based on modern personal intuition alone, ignoring the entire classical tafsir tradition.',
    source: 'Al-Suyuti, "al-Itqan fi \'Ulum al-Qur\'an"; Kamali, "Principles of Islamic Jurisprudence", Ch. 2'
  },
  {
    id: 'if-10',
    name: 'Textual Isolation (Ignoring Asbab al-Nuzul)',
    nameAR: 'العزل النصي وإهمال أسباب النزول',
    description: 'Applying a Quranic verse as a general ruling without considering its occasion of revelation (sabab al-nuzul), which may restrict its scope or clarify its intended application.',
    descriptionAR: 'تطبيق آية قرآنية حكمًا عامًا دون مراعاة سبب نزولها.',
    example: 'Using a verse revealed in response to a specific historical event as a blanket universal legal command.',
    source: 'Al-Wahidi, "Asbab al-Nuzul"; al-Suyuti, "al-Itqan"; Kamali, Ch. 2'
  },
  {
    id: 'if-11',
    name: 'Ignoring al-Nasikh wa-l-Mansukh (Abrogation)',
    nameAR: 'إهمال الناسخ والمنسوخ',
    description: 'Applying an abrogated (mansukh) ruling as if it still stands, without accounting for the abrogating verse (nasikh), leading to contradiction with established law.',
    descriptionAR: 'تطبيق حكم منسوخ دون مراعاة الناسخ.',
    example: 'Citing a verse that was later abrogated as the applicable ruling on a matter where the abrogating verse is well established.',
    source: 'Al-Suyuti, "al-Itqan", chapter on abrogation; Kamali, "Principles of Islamic Jurisprudence", Ch. 8'
  },
  {
    id: 'if-12',
    name: 'Decontextualized Verse Application',
    nameAR: 'التطبيق المجتزأ للآية',
    description: 'Extracting a phrase from a Quranic verse and applying it independently of the verse\'s literary, legal, and thematic context.',
    descriptionAR: 'اقتطاع عبارة من آية قرآنية وتطبيقها بمعزل عن سياقها.',
    example: 'Citing the phrase "kill them" from Q2:191 — which specifies combatants who attack first — as a general command.',
    source: 'Al-Tabari, "Jami\' al-Bayan"; al-Suyuti, "al-Itqan"'
  },
  // ── Usul al-Fiqh (Legal Methodology) errors ──────────────────────
  {
    id: 'if-13',
    name: "Qiyas Without 'Illa (Analogy Without Operative Cause)",
    nameAR: 'القياس بلا علة',
    description: 'Extending a ruling by analogy (qiyas) without identifying the shared operative legal cause (\'illa) that grounds the analogy, making the extension arbitrary.',
    descriptionAR: 'تعدية الحكم بالقياس دون تحديد العلة الجامعة.',
    example: 'Analogizing a modern transaction to a prohibited classical one without establishing that both share the same operative cause for prohibition.',
    source: 'Al-Ghazali, "al-Mustasfa"; Kamali, "Principles of Islamic Jurisprudence", Ch. 7'
  },
  {
    id: 'if-14',
    name: "Ignoring Ijma' (Consensus)",
    nameAR: 'إهمال الإجماع',
    description: 'Advancing a ruling that contradicts established scholarly consensus (ijma\') without acknowledging the consensus or providing a compelling reason for departure.',
    descriptionAR: 'طرح حكم يخالف الإجماع المعتبر دون إقرار به أو تقديم مسوّغ.',
    example: 'Presenting as an open question a matter on which there is a reported ijma\', without acknowledging that consensus.',
    source: 'Al-Shafi\'i, "al-Risala", §§ on ijma\'; Kamali, "Principles of Islamic Jurisprudence", Ch. 6'
  },
  {
    id: 'if-15',
    name: "Conflating Maslaha Mursala with Hawa (Interest with Desire)",
    nameAR: 'الخلط بين المصلحة المرسلة والهوى',
    description: 'Invoking unrestricted public interest (maslaha mursala) to override a clear Quranic or Sunnah ruling without meeting the scholars\' conditions for its application.',
    descriptionAR: 'التذرع بالمصلحة المرسلة لرفع نص ثابت دون استيفاء شروطها.',
    example: 'Claiming a clear prohibition should be suspended in the modern era simply because it is inconvenient, without the rigorous maslaha criteria.',
    source: 'Al-Ghazali, "al-Mustasfa"; Kamali, "Principles of Islamic Jurisprudence", Ch. 9'
  },
  {
    id: 'if-16',
    name: "Misuse of 'Urf (Custom)",
    nameAR: 'الخطأ في توظيف العرف',
    description: 'Elevating a local or contemporary custom (\'urf) to override an established textual ruling, without verifying that the custom meets the conditions for jurisprudential consideration.',
    descriptionAR: 'رفع العرف المحلي أو المعاصر فوق النص الثابت دون استيفاء شروط اعتباره فقهيًا.',
    example: 'Treating a regional social convention as equivalent to a Quranic command, citing \'urf without the required scholarly conditions.',
    source: 'Ibn \'Abidin, "Radd al-Muhtar"; Kamali, "Principles of Islamic Jurisprudence", Ch. 10'
  },
  {
    id: 'if-17',
    name: "Istislah Without Conditions",
    nameAR: 'الاستصلاح بلا ضوابط',
    description: 'Using the principle of seeking the common good (istislah) to justify rulings without ensuring the interest is genuine (haqiqiyya), universal (kulliyya), and not in conflict with established texts.',
    descriptionAR: 'توظيف الاستصلاح دون التحقق من كون المصلحة حقيقية وكلية غير معارضة للنص.',
    example: 'Legalizing something explicitly prohibited by appeal to vague "social benefit" without meeting the three classical conditions.',
    source: 'Al-Ghazali, "al-Mustasfa"; Hallaq, "A History of Islamic Legal Theories", Cambridge 1997, Ch. 4'
  },
  {
    id: 'if-18',
    name: "Dropping Conditions of Sadd al-Dhara'i'",
    nameAR: 'إسقاط شروط سد الذرائع',
    description: 'Prohibiting an otherwise permissible act on grounds that it may lead to harm (sadd al-dhara\'i\'), without meeting the conditions that the harmful outcome be probable, serious, and not outweighed by benefits.',
    descriptionAR: 'تحريم أمر مباح بدعوى الذريعة دون استيفاء شروط غلبة الضرر وجسامته.',
    example: 'Forbidding a neutral transaction solely because someone might theoretically misuse it, without evidence that misuse is probable.',
    source: 'Ibn al-Qayyim, "I\'lam al-Muwaqqi\'in"; Kamali, "Principles of Islamic Jurisprudence", Ch. 11'
  },
  // ── Argumentation errors specific to Islamic discourse ────────────
  {
    id: 'if-19',
    name: "Ahl al-'Ilm Qalu (Unnamed Scholars Fallacy)",
    nameAR: 'أهل العلم قالوا',
    description: 'Citing "scholars" collectively without naming them, identifying their works, or specifying the tradition they represent, making the authority claim unverifiable.',
    descriptionAR: 'الاستشهاد بأهل العلم جماعةً دون تسمية أعلام أو مصادر.',
    example: '"الفقهاء قالوا إن هذا الأمر محرم" دون ذكر مَن ومتى وفي أي كتاب.',
    source: 'Cook et al., "Cranky Uncle vs. Climate Change", 2020 (Fake Experts); EAL Governing Standard'
  },
  {
    id: 'if-20',
    name: 'Ahistoricism (Projecting Modern Categories onto Classical Texts)',
    nameAR: 'اللاتاريخية',
    description: 'Reading contemporary legal, political, or social categories into classical texts without accounting for the historical context in which those texts were produced.',
    descriptionAR: 'قراءة الفئات المعاصرة في النصوص الكلاسيكية دون مراعاة السياق التاريخي.',
    example: 'Applying modern nation-state concepts of citizenship directly to classical fiqh rulings on the non-Muslim resident (dhimmi) without contextual nuance.',
    source: 'Hallaq, "A History of Islamic Legal Theories", Cambridge 1997; Wael Hallaq, "Shari\'a", Cambridge 2009'
  },
  {
    id: 'if-21',
    name: 'Selective Use of Schools (Shopping for Fatawa)',
    nameAR: 'التلفيق المذموم',
    description: 'Combining rulings from different madhabs in a single transaction to achieve a desired outcome that no single school would permit — condemned as talfiq in classical usul al-fiqh.',
    descriptionAR: 'الجمع بين أقوال المذاهب في مسألة واحدة لتحصيل ما لا يُجيزه أي منها وحده.',
    example: 'Combining the Hanafi position on one aspect and the Shafi\'i position on another of the same transaction, resulting in what neither school permits.',
    source: 'Ibn \'Abidin, "Radd al-Muhtar"; Kamali, "Principles of Islamic Jurisprudence", Ch. 12'
  },
  {
    id: 'if-22',
    name: "Overextended Istihsan (Juristic Preference Without Restraint)",
    nameAR: 'الاستحسان غير المقيَّد',
    description: 'Using juristic preference (istihsan) to override systematic analogical reasoning without the limiting conditions set by the Hanafi and Maliki schools that originally developed it.',
    descriptionAR: 'توظيف الاستحسان لتجاوز القياس دون الضوابط التي وضعها الفقهاء.',
    example: 'Departing from an established ruling by personal preference and labeling it istihsan without meeting its scholarly conditions.',
    source: 'Al-Shafi\'i, "al-Risala" (critique of istihsan); Kamali, "Principles of Islamic Jurisprudence", Ch. 8'
  },
  {
    id: 'if-23',
    name: "Invoking Darura (Necessity) Beyond Its Limits",
    nameAR: 'تجاوز حدود الضرورة',
    description: 'Invoking the principle of necessity (darura) to permit the prohibited beyond the scope scholars require — that harm be actual, not theoretical, and relief be limited to the minimum needed.',
    descriptionAR: 'التوسع في الضرورة لتحليل المحرم أكثر مما تقتضيه الحاجة الفعلية.',
    example: 'Extending a temporary darura dispensation indefinitely or beyond the specific situation that created the need.',
    source: 'Ibn Nujaym, "al-Ashbah wa-l-Naza\'ir"; Kamali, "Principles of Islamic Jurisprudence", Ch. 9'
  },
  {
    id: 'if-24',
    name: "Ignoring Maqasid al-Shari'a",
    nameAR: 'إهمال مقاصد الشريعة',
    description: 'Applying a textual ruling in a way that defeats the higher objectives of the Sharia (protection of life, intellect, lineage, property, religion) — achieving the letter of the law while violating its purpose.',
    descriptionAR: 'تطبيق نص يُحقق لفظه ويُفسد مقصده.',
    example: 'Using a legal mechanism formally permitted in the sources to achieve an outcome that the scholars of maqasid identify as directly harming a protected interest.',
    source: 'Al-Shatibi, "al-Muwafaqat"; Hallaq, "A History of Islamic Legal Theories", Cambridge 1997, Ch. 5'
  },
  {
    id: 'if-25',
    name: "Hiyal (Legal Stratagems) Against the Text's Purpose",
    nameAR: 'الحيل المناقضة لمقصد النص',
    description: 'Using legal stratagems (hiyal) to circumvent a prohibition while technically complying, violating the spirit of the ruling — condemned by the Hanbali and Maliki schools.',
    descriptionAR: 'استخدام الحيل الفقهية للتحايل على النص الصريح مع الالتزام بحرفيته.',
    example: 'Structuring a transaction as two separate sales to achieve the economic effect of riba while bypassing its literal prohibition.',
    source: 'Ibn al-Qayyim, "I\'lam al-Muwaqqi\'in", vol. 3; Kamali, "Principles of Islamic Jurisprudence", Ch. 12'
  },
  {
    id: 'if-26',
    name: "Shari'a-isation Without Fiqh Context",
    nameAR: 'إسقاط الشريعة دون الفقه',
    description: 'Demanding application of Sharia on a modern issue while bypassing the entire classical fiqh analytical framework — ignoring the conditions, madhab disagreements, and procedural requirements that give Sharia its substance.',
    descriptionAR: 'المطالبة بتطبيق الشريعة دون توظيف منهجية الفقه ومراعاة اختلاف المذاهب والشروط.',
    example: 'Citing a Quranic penalty directly as applicable positive law without addressing the strict evidentiary and procedural conditions required by classical fiqh.',
    source: 'Hallaq, "Shari\'a: Theory, Practice, Transformations", Cambridge 2009, Introduction'
  },
  {
    id: 'if-27',
    name: "Confusing Fard 'Ayn with Fard Kifaya",
    nameAR: 'الخلط بين الفرض العيني والكفائي',
    description: 'Treating an obligation that is individually binding (fard \'ayn) as if it were a collective duty discharged by some on behalf of all (fard kifaya), or vice versa.',
    descriptionAR: 'الخلط بين الفرض العيني والكفائي في الاستدلال على الحكم.',
    example: 'Arguing that scholarly defense of the faith (fard kifaya) discharges individuals from any obligation, or that a fard kifaya is personally binding on every individual.',
    source: 'Al-Ghazali, "al-Mustasfa"; Kamali, "Principles of Islamic Jurisprudence", Ch. 4'
  },
  {
    id: 'if-28',
    name: "Literal Textualism Ignoring Linguistic Conventions (Haqiqa vs. Majaz)",
    nameAR: 'الحرفية المُهملة للمجاز',
    description: 'Insisting on the literal meaning (haqiqa) of a scriptural expression when the classical Arabic rhetorical tradition and scholarly consensus establish that it is used figuratively (majaz).',
    descriptionAR: 'التمسك بالمعنى الحرفي عند ما أجمع على استخدامه مجازيًا في اللغة والتراث العلمي.',
    example: 'Reading a well-established metaphorical phrase in an Arabic Quranic passage as literal, against the majority of classical Arabic linguists and exegetes.',
    source: 'Ibn Jinni, "al-Khasais"; al-Suyuti, "al-Itqan fi \'Ulum al-Qur\'an", chapter on haqiqa and majaz'
  }
];
