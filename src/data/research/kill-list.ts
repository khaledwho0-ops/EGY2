export interface DebunkedClaim {
  id: string;
  title: {
    en: string;
    ar: string;
  };
  claim: {
    en: string;
    ar: string;
  };
  fact: {
    en: string;
    ar: string;
  };
  source: string;
  date: string;
  category: string;
  threatLevel: 'Low' | 'Medium' | 'High' | 'Critical';
}

export const killList: DebunkedClaim[] = [
  {
    id: 'claim-001',
    title: {
      en: 'Microchips in Vaccines',
      ar: 'شرائح دقيقة في اللقاحات'
    },
    claim: {
      en: 'COVID-19 vaccines contain trackable microchips designed by global elites to monitor citizens.',
      ar: 'لقاحات كوفيد-19 تحتوي على شرائح تتبع مصممة من قبل النخب العالمية لمراقبة المواطنين.'
    },
    fact: {
      en: 'Vaccines do not contain microchips. The ingredients are public, consisting of mRNA, lipids, salts, and sugars. The needle used for injection is too small for a microchip.',
      ar: 'اللقاحات لا تحتوي على شرائح دقيقة. المكونات علنية وتتكون من mRNA، دهون، أملاح، وسكريات. الإبرة المستخدمة للحقن أصغر من أن تمرر شريحة.'
    },
    source: 'World Health Organization (WHO)',
    date: '2021-05-14',
    category: 'Health',
    threatLevel: 'Critical'
  },
  {
    id: 'claim-002',
    title: {
      en: '5G Causes COVID-19',
      ar: 'شبكات الجيل الخامس تسبب كوفيد-19'
    },
    claim: {
      en: '5G mobile networks spread the coronavirus by suppressing the immune system.',
      ar: 'شبكات الجيل الخامس المحمولة تنشر فيروس كورونا من خلال إضعاف جهاز المناعة.'
    },
    fact: {
      en: 'Viruses cannot travel on radio waves/mobile networks. COVID-19 is spreading in many countries that do not have 5G mobile networks.',
      ar: 'لا يمكن للفيروسات الانتقال عبر موجات الراديو/شبكات الهاتف. كوفيد-19 ينتشر في العديد من الدول التي لا تملك شبكات الجيل الخامس.'
    },
    source: 'International Telecommunication Union',
    date: '2020-04-20',
    category: 'Technology',
    threatLevel: 'High'
  },
  {
    id: 'claim-003',
    title: {
      en: 'Fake Moon Landing',
      ar: 'الهبوط المزيف على القمر'
    },
    claim: {
      en: 'The 1969 Apollo 11 moon landing was staged in a Hollywood studio.',
      ar: 'هبوط أبولو 11 على سطح القمر عام 1969 تم تصويره في استوديو في هوليوود.'
    },
    fact: {
      en: 'Thousands of photos, videos, moon rocks, and retroreflectors left on the moon surface (still used today for laser ranging) prove the landing occurred.',
      ar: 'آلاف الصور والفيديوهات وصخور القمر والعواكس التي تُركت على سطح القمر (ولا تزال تستخدم حتى اليوم) تثبت حدوث الهبوط.'
    },
    source: 'NASA',
    date: '1969-07-20',
    category: 'History',
    threatLevel: 'Low'
  },
  {
    id: 'claim-004',
    title: {
      en: 'Climate Change is a Hoax',
      ar: 'تغير المناخ خدعة'
    },
    claim: {
      en: 'Global warming is a fabricated concept to force countries into economic disadvantage.',
      ar: 'الاحتباس الحراري مفهوم مفبرك لإجبار الدول على التراجع الاقتصادي.'
    },
    fact: {
      en: 'Decades of empirical data from global space and science agencies show unprecedented warming trends correlated with human greenhouse gas emissions.',
      ar: 'عقود من البيانات التجريبية من وكالات الفضاء والعلوم العالمية تظهر اتجاهات احترار غير مسبوقة مرتبطة بانبعاثات الغازات الدفيئة البشرية.'
    },
    source: 'Intergovernmental Panel on Climate Change (IPCC)',
    date: '2023-03-20',
    category: 'Environment',
    threatLevel: 'Critical'
  },
  {
    id: 'claim-005',
    title: {
      en: 'Bleach Cures Autism',
      ar: 'المبيض يعالج التوحد'
    },
    claim: {
      en: 'Drinking Miracle Mineral Supplement (MMS), which is industrial bleach, can cure autism in children.',
      ar: 'شرب المكمل المعدني المعجزة (MMS)، وهو مبيض صناعي، يمكن أن يعالج التوحد لدى الأطفال.'
    },
    fact: {
      en: 'MMS is chlorine dioxide (bleach). Ingesting it causes severe vomiting, life-threatening low blood pressure, and acute liver failure. It does not cure autism.',
      ar: 'MMS هو ثاني أكسيد الكلور (مبيض). ابتلاعه يسبب قيئاً شديداً وانخفاضاً مميتاً في ضغط الدم وفشل كبدي حاد. ولا يعالج التوحد.'
    },
    source: 'Food and Drug Administration (FDA)',
    date: '2019-08-12',
    category: 'Health',
    threatLevel: 'Critical'
  },
  {
    id: 'claim-006',
    title: { en: 'Herbs Cure Diabetes — Insulin Is a Lie', ar: 'الأعشاب تشفي السكري — والإنسولين كذبة' },
    claim: {
      en: 'Type-1 and type-2 diabetes can be permanently cured with a herbal mix, so insulin and prescribed medication are unnecessary.',
      ar: 'مرض السكري من النوعين الأول والثاني يمكن شفاؤه نهائيًا بخلطة أعشاب، فلا حاجة للإنسولين أو الأدوية الموصوفة.'
    },
    fact: {
      en: 'Type-1 diabetes requires lifelong insulin — stopping it causes fatal diabetic ketoacidosis. Type-2 can be managed and sometimes put into remission with diet and weight loss, but no herb cures it. The Egyptian Ministry of Health and the WHO warn against abandoning prescribed treatment.',
      ar: 'السكري من النوع الأول يحتاج إنسولين مدى الحياة — وإيقافه يسبب حماضًا كيتونيًا قاتلًا. النوع الثاني يمكن التحكم فيه وأحيانًا إدخاله في هدأة بالحمية وإنقاص الوزن، لكن لا عشب يشفيه. تحذّر وزارة الصحة المصرية ومنظمة الصحة العالمية من ترك العلاج الموصوف.'
    },
    source: 'World Health Organization (WHO) + Egyptian Ministry of Health',
    date: '2022-11-14',
    category: 'Health',
    threatLevel: 'Critical'
  },
  {
    id: 'claim-007',
    title: { en: 'A Common Food Cures Cancer', ar: 'طعام شائع يشفي السرطان' },
    claim: {
      en: 'Eating large amounts of a specific fruit or herb (such as lemon, garlic, or soursop) cures cancer and can replace chemotherapy.',
      ar: 'تناول كميات كبيرة من فاكهة أو عشب معيّن (كالليمون أو الثوم أو القشطة) يشفي السرطان ويمكن أن يحل محل العلاج الكيماوي.'
    },
    fact: {
      en: 'No food cures cancer. The US National Cancer Institute and the WHO confirm that while a healthy diet lowers risk, no fruit or herb treats existing cancer. Abandoning evidence-based treatment for these claims costs lives.',
      ar: 'لا يوجد طعام يشفي السرطان. يؤكد المعهد الوطني الأمريكي للسرطان ومنظمة الصحة العالمية أن النظام الغذائي الصحي يقلل الخطر، لكن لا فاكهة ولا عشب يعالج سرطانًا قائمًا. وترك العلاج المثبت لهذه الادعاءات يكلّف الأرواح.'
    },
    source: 'US National Cancer Institute (NCI) + WHO',
    date: '2023-02-04',
    category: 'Health',
    threatLevel: 'Critical'
  },
  {
    id: 'claim-008',
    title: { en: 'Vaccines Cause Infertility', ar: 'اللقاحات تسبب العقم' },
    claim: {
      en: 'COVID-19 and childhood vaccines secretly cause infertility, especially in girls.',
      ar: 'لقاحات كوفيد-19 ولقاحات الأطفال تسبب العقم سرًّا، خاصة للفتيات.'
    },
    fact: {
      en: 'Large studies and pregnancy registries show no effect of vaccines on fertility. The Egyptian Drug Authority (EDA) and the WHO confirm vaccines do not cause infertility; this is a recurring fabrication.',
      ar: 'الدراسات الكبيرة وسجلات الحمل لا تُظهر أي تأثير للقاحات على الخصوبة. تؤكد هيئة الدواء المصرية ومنظمة الصحة العالمية أن اللقاحات لا تسبب العقم؛ وهو ادعاء مفبرك متكرر.'
    },
    source: 'World Health Organization (WHO) + Egyptian Drug Authority (EDA)',
    date: '2021-09-10',
    category: 'Health',
    threatLevel: 'High'
  },
  {
    id: 'claim-009',
    title: { en: 'The MMR Vaccine Causes Autism', ar: 'لقاح الحصبة (MMR) يسبب التوحد' },
    claim: {
      en: 'The measles-mumps-rubella (MMR) vaccine causes autism in children.',
      ar: 'لقاح الحصبة والنكاف والحصبة الألمانية (MMR) يسبب التوحد لدى الأطفال.'
    },
    fact: {
      en: 'This originated in a 1998 paper that was retracted for fraud and whose author lost his medical license. Dozens of studies covering millions of children find no link between MMR and autism.',
      ar: 'نشأ هذا من ورقة بحثية عام 1998 سُحبت بسبب التزوير وفقد كاتبها رخصته الطبية. عشرات الدراسات التي شملت ملايين الأطفال لا تجد أي صلة بين اللقاح والتوحد.'
    },
    source: 'The Lancet (retraction, 2010) + WHO',
    date: '2010-02-02',
    category: 'Health',
    threatLevel: 'Critical'
  },
  {
    id: 'claim-010',
    title: { en: 'The Banks Will Freeze Your Savings', ar: 'البنوك ستجمّد مدخراتك' },
    claim: {
      en: 'A viral message warns that banks are about to freeze all accounts and the currency will become worthless overnight — withdraw everything now.',
      ar: 'رسالة منتشرة تحذّر أن البنوك على وشك تجميد كل الحسابات وأن العملة ستفقد قيمتها بين ليلة وضحاها — اسحب كل أموالك الآن.'
    },
    fact: {
      en: 'These bank-run messages are a recurring panic tactic. The Central Bank of Egypt has repeatedly stated that deposits are protected and no freeze is planned; mass panic withdrawals are exactly what harms savers.',
      ar: 'رسائل سحب الودائع هذه أسلوب ذعر متكرر. صرّح البنك المركزي المصري مرارًا بأن الودائع محمية ولا يوجد تجميد مزمع؛ والسحب الجماعي الذعر هو بالضبط ما يضر المدّخرين.'
    },
    source: 'Central Bank of Egypt',
    date: '2023-01-11',
    category: 'Finance',
    threatLevel: 'High'
  },
  {
    id: 'claim-011',
    title: { en: 'An App That Guarantees 400% Returns', ar: 'تطبيق يضمن أرباحًا 400%' },
    claim: {
      en: 'A mobile investment or mining app guarantees doubling your money in weeks with no risk.',
      ar: 'تطبيق استثمار أو تعدين على الهاتف يضمن مضاعفة أموالك خلال أسابيع بلا أي مخاطرة.'
    },
    fact: {
      en: 'Guaranteed high returns with no risk is the defining sign of a Ponzi scheme — early payouts come from money paid by new victims until it collapses. The US FTC reports that the vast majority of users lose everything.',
      ar: 'ضمان أرباح عالية بلا مخاطرة هو العلامة الفارقة لمخطط بونزي — الأرباح المبكرة تأتي من أموال الضحايا الجدد حتى ينهار. تفيد لجنة التجارة الفيدرالية الأمريكية بأن الغالبية العظمى من المستخدمين يخسرون كل شيء.'
    },
    source: 'US Federal Trade Commission (FTC)',
    date: '2023-06-01',
    category: 'Finance',
    threatLevel: 'High'
  },
  {
    id: 'claim-012',
    title: { en: 'A Tea or Pill That Melts Fat', ar: 'شاي أو حبوب تذيب الدهون' },
    claim: {
      en: 'A detox tea or slimming supplement melts body fat and flushes out toxins with no diet or exercise.',
      ar: 'شاي تخسيس أو مكمل تنحيف يذيب دهون الجسم ويطرد السموم دون حمية أو رياضة.'
    },
    fact: {
      en: 'The body detoxifies itself through the liver and kidneys; no product is needed. Detox and rapid-slimming products are not proven to work, and some contain hidden, dangerous laxatives or stimulants flagged by the FDA.',
      ar: 'الجسم ينقّي نفسه عبر الكبد والكلى؛ ولا حاجة لأي منتج. منتجات الديتوكس والتنحيف السريع غير مثبتة الفعالية، وبعضها يحتوي على ملينات أو منبهات خفية خطيرة حذّرت منها هيئة الغذاء والدواء.'
    },
    source: 'US Food and Drug Administration (FDA)',
    date: '2022-05-19',
    category: 'Health',
    threatLevel: 'Medium'
  },
  {
    id: 'claim-013',
    title: { en: 'Spiritual Healing Alone Cures Illness — Skip the Doctor', ar: 'العلاج الروحاني وحده يشفي المرض — ولا داعي للطبيب' },
    claim: {
      en: 'Recitation and spiritual healing alone are enough to cure mental illness or cancer, so medical treatment is unnecessary.',
      ar: 'الرقية والعلاج الروحاني وحدهما يكفيان لشفاء المرض النفسي أو السرطان، فلا حاجة للعلاج الطبي.'
    },
    fact: {
      en: 'Faith and medicine are not opposed. Al-Azhar scholars affirm that seeking treatment is consistent with — and can be obligatory under — preserving life (hifz al-nafs). The WHO and the Egyptian Ministry of Health urge combining spiritual support WITH evidence-based care, never replacing it.',
      ar: 'الإيمان والطب ليسا متعارضين. يؤكد علماء الأزهر أن طلب العلاج متوافق مع مقصد حفظ النفس بل قد يكون واجبًا. وتحث منظمة الصحة العالمية ووزارة الصحة المصرية على الجمع بين الدعم الروحي والعلاج المبني على الأدلة، لا استبداله.'
    },
    source: 'Al-Azhar Islamic Research Academy + WHO',
    date: '2021-07-22',
    category: 'Religion',
    threatLevel: 'High'
  },
  {
    id: 'claim-014',
    title: { en: 'Aliens Built the Pyramids', ar: 'الفضائيون بنوا الأهرامات' },
    claim: {
      en: 'The ancient Egyptians could not have built the pyramids; they were built by aliens or a lost advanced civilization.',
      ar: 'المصريون القدماء لم يكن بإمكانهم بناء الأهرامات؛ بل بناها الفضائيون أو حضارة متقدمة مفقودة.'
    },
    fact: {
      en: 'Archaeology shows exactly how Egyptians built them: workers towns and tombs at Giza, quarry marks, copper tools, construction ramps, and administrative papyri (the Diary of Merer) document the labor. The claim erases a genuine Egyptian achievement.',
      ar: 'علم الآثار يوضح بدقة كيف بناها المصريون: مدن وعمال ومقابر العمال في الجيزة، وعلامات المحاجر، والأدوات النحاسية، والمنحدرات، وبرديات إدارية (يوميات مرر) توثّق العمل. والادعاء يمحو إنجازًا مصريًا حقيقيًا.'
    },
    source: 'Egyptian Ministry of Tourism & Antiquities',
    date: '2020-10-15',
    category: 'History',
    threatLevel: 'Medium'
  },
  {
    id: 'claim-015',
    title: { en: 'A Common Product Is Secretly Contaminated', ar: 'منتج شائع ملوّث سرًّا' },
    claim: {
      en: 'A forwarded message warns that a specific brand of food, milk, or medicine is poisoned and the authorities are hiding it — stop using it and share immediately.',
      ar: 'رسالة محوّلة تحذّر أن صنفًا معينًا من الطعام أو اللبن أو الدواء مسموم وأن الجهات تخفي ذلك — توقّف عن استخدامه وشاركها فورًا.'
    },
    fact: {
      en: 'These chain messages almost never name a verifiable source. The Egyptian Drug Authority and the National Food Safety Authority publish real recalls publicly; the absence of an official alert means the claim is unverified — check the official source before sharing.',
      ar: 'رسائل السلاسل هذه نادرًا ما تذكر مصدرًا يمكن التحقق منه. تنشر هيئة الدواء المصرية والهيئة القومية لسلامة الغذاء حالات السحب الحقيقية علنًا؛ وغياب تحذير رسمي يعني أن الادعاء غير مؤكد — تحقّق من المصدر الرسمي قبل المشاركة.'
    },
    source: 'Egyptian Drug Authority (EDA) + National Food Safety Authority',
    date: '2023-04-08',
    category: 'Health',
    threatLevel: 'Medium'
  },
  {
    id: 'claim-016',
    title: { en: 'Sunscreen Causes Cancer', ar: 'واقي الشمس يسبب السرطان' },
    claim: {
      en: 'Sunscreen is more dangerous than the sun and actually causes skin cancer.',
      ar: 'واقي الشمس أخطر من الشمس نفسها ويسبب سرطان الجلد فعليًا.'
    },
    fact: {
      en: 'Regular sunscreen use reduces the risk of skin cancers and sunburn. Health authorities including the WHO recommend it as part of sun protection; the claim inverts the evidence.',
      ar: 'الاستخدام المنتظم لواقي الشمس يقلل خطر سرطانات الجلد وحروق الشمس. توصي به الجهات الصحية ومنها منظمة الصحة العالمية ضمن الوقاية من الشمس؛ والادعاء يقلب الدليل رأسًا على عقب.'
    },
    source: 'World Health Organization (WHO)',
    date: '2022-07-03',
    category: 'Health',
    threatLevel: 'Medium'
  },
  {
    id: 'claim-017',
    title: { en: 'An Eclipse Harms Unborn Babies', ar: 'الكسوف يؤذي الأجنّة' },
    claim: {
      en: 'A solar or lunar eclipse emits rays that deform or harm unborn babies, so pregnant women must hide indoors and avoid knives.',
      ar: 'كسوف الشمس أو خسوف القمر يبعث أشعة تشوّه أو تؤذي الأجنّة، فيجب على الحوامل الاختباء في البيوت وتجنّب السكاكين.'
    },
    fact: {
      en: 'An eclipse is simply a shadow alignment of the sun, moon, and earth; it emits no special harmful rays. There is no astronomical or medical mechanism for harm to a fetus.',
      ar: 'الكسوف ليس إلا اصطفاف ظل بين الشمس والقمر والأرض؛ ولا يبعث أي أشعة ضارة خاصة. ولا يوجد أي تفسير فلكي أو طبي لإيذاء الجنين.'
    },
    source: 'NASA (eclipse science)',
    date: '2024-04-08',
    category: 'Science',
    threatLevel: 'Low'
  }
];
