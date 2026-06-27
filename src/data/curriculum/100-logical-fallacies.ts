// Source: standard logic textbooks; fallacy names seeded from src/data/prompts/fallacies.ts
// All 100 entries are established, named fallacies from classical and informal logic literature.
// Descriptions follow standard academic definitions (Hurley, "A Concise Introduction to Logic";
// Walton, "Informal Logic"; Hamblin, "Fallacies").
// Examples are illustrative and name-free.

export interface LogicalFallacy {
  id: string;
  name: string;
  nameAR: string;
  description: string;
  descriptionAR: string;
  example: string;
  source: string;
}

export const logicalFallacies: LogicalFallacy[] = [
  // ── Formal fallacies ──────────────────────────────────────────────
  {
    id: 'lf-1',
    name: 'Affirming the Consequent',
    nameAR: 'تأكيد التالي',
    description: 'Inferring the antecedent from the truth of the consequent in a conditional. Form: if P then Q; Q; therefore P.',
    descriptionAR: 'استنتاج المقدّمة من صحة التالي في الشرطية. الصورة: إذا كان ب فـج؛ ج إذًا ب.',
    example: 'If it rained the ground is wet; the ground is wet; therefore it rained — ignoring other causes of wetness.',
    source: 'Hurley, "A Concise Introduction to Logic", 14th ed., §3.4'
  },
  {
    id: 'lf-2',
    name: 'Denying the Antecedent',
    nameAR: 'نفي المقدّمة',
    description: 'Inferring the denial of the consequent from the denial of the antecedent. Form: if P then Q; not-P; therefore not-Q.',
    descriptionAR: 'استنتاج نفي التالي من نفي المقدّمة. الصورة: إذا كان ب فـج؛ ليس ب؛ إذًا ليس ج.',
    example: 'If a person studies they pass; this person did not study; therefore they will not pass — ignoring that they might pass by other means.',
    source: 'Hurley, "A Concise Introduction to Logic", 14th ed., §3.4'
  },
  {
    id: 'lf-3',
    name: 'Affirming a Disjunct',
    nameAR: 'تأكيد أحد طرفي الفصل',
    description: 'In an inclusive disjunction, concluding the falsity of one disjunct from the truth of the other. Form: P or Q; P; therefore not-Q.',
    descriptionAR: 'في الفصل الشامل، استنتاج كذب أحد الطرفين من صدق الآخر.',
    example: 'Either the engine failed or the fuel ran out; the engine failed; therefore the fuel did not run out — but both could be true.',
    source: 'Hurley, "A Concise Introduction to Logic", 14th ed., §3.4'
  },
  {
    id: 'lf-4',
    name: 'Denying a Conjunct',
    nameAR: 'نفي أحد طرفي العطف',
    description: 'Inferring the truth of one conjunct from the denial of the conjunction plus the denial of the other conjunct — invalid when the negation is of "both".',
    descriptionAR: 'استنتاج خاطئ من رفع الاقتران.',
    example: 'It is not the case that both conditions are met; condition A is not met; therefore condition B is met — invalid inference.',
    source: 'Hurley, "A Concise Introduction to Logic", 14th ed., §3.4'
  },
  {
    id: 'lf-5',
    name: 'Undistributed Middle',
    nameAR: 'الحد الأوسط غير المنتشر',
    description: 'In a categorical syllogism, the middle term is not distributed in either premise, so no valid link between subject and predicate is established.',
    descriptionAR: 'في القياس الحملي، لا يكون الحد الأوسط مُوزَّعًا في أي من المقدمتين.',
    example: 'All doctors are educated; all lawyers are educated; therefore all doctors are lawyers — the middle term "educated" covers both but does not link them.',
    source: 'Aristotle, "Prior Analytics" I.4; Hurley §5.2'
  },
  {
    id: 'lf-6',
    name: 'Illicit Major',
    nameAR: 'الحد الأكبر المُخِل',
    description: 'The major term is distributed in the conclusion but not in the major premise, producing an invalid generalization.',
    descriptionAR: 'يُوزَّع الحد الأكبر في النتيجة لكن لا يُوزَّع في المقدمة الكبرى.',
    example: 'All experts are skilled; no novices are experts; therefore no novices are skilled — "skilled" is distributed in the conclusion but not the premise.',
    source: 'Hurley, "A Concise Introduction to Logic", 14th ed., §5.2'
  },
  {
    id: 'lf-7',
    name: 'Illicit Minor',
    nameAR: 'الحد الأصغر المُخِل',
    description: 'The minor term is distributed in the conclusion but not in the minor premise.',
    descriptionAR: 'يُوزَّع الحد الأصغر في النتيجة لكن لا يُوزَّع في المقدمة الصغرى.',
    example: 'All cats are mammals; all cats are animals; therefore all animals are mammals — "animals" is distributed in the conclusion but not the premise.',
    source: 'Hurley, "A Concise Introduction to Logic", 14th ed., §5.2'
  },
  {
    id: 'lf-8',
    name: 'Four-Term Fallacy (Quaternio Terminorum)',
    nameAR: 'مغالطة الحدود الأربعة',
    description: 'A syllogism that appears to have three terms but actually uses a fourth because one term is used equivocally in two different senses.',
    descriptionAR: 'قياس يبدو ذا ثلاثة حدود لكنه في الواقع يحتوي على أربعة لأن أحد الحدود مستخدم بمعنيين.',
    example: 'The law of nature governs all things; governments enforce the law; therefore governments enforce all things — "law" shifts meaning.',
    source: 'Hurley, "A Concise Introduction to Logic", 14th ed., §5.2'
  },
  {
    id: 'lf-9',
    name: 'Existential Fallacy',
    nameAR: 'المغالطة الوجودية',
    description: 'Drawing an existential conclusion (asserting something exists) from universal premises that make no existential commitment.',
    descriptionAR: 'استنتاج وجودي من مقدمات كلية لا تتضمن التزامًا وجوديًا.',
    example: 'All unicorns are horned; all unicorns are white; therefore some white things are horned — assumes unicorns exist.',
    source: 'Hurley, "A Concise Introduction to Logic", 14th ed., §5.3'
  },
  {
    id: 'lf-10',
    name: 'Fallacy of Necessity (Modal Scope Fallacy)',
    nameAR: 'مغالطة الضرورة',
    description: 'Confusing necessity de dicto (a statement is necessarily true) with necessity de re (a thing necessarily has a property).',
    descriptionAR: 'الخلط بين الضرورة اللفظية والضرورة الواقعية.',
    example: 'The number of planets is necessarily odd (because that proposition is necessarily expressed as it is) — confuses logical with empirical necessity.',
    source: 'Quine, "Reference and Modality", 1953; Hurley §8.6'
  },
  {
    id: 'lf-11',
    name: 'Masked Man Fallacy',
    nameAR: 'مغالطة الرجل المُقنَّع',
    description: 'Inferring that two descriptions refer to different things merely because one knows something under one description and not the other; violates the indiscernibility of identicals in intensional contexts.',
    descriptionAR: 'استنتاج أن وصفين يشيران إلى شيئين مختلفين لمجرد الجهل بأن أحد الأوصاف يصف نفس الشيء.',
    example: 'Someone knows the masked figure but not his true identity — this does not prove they are different people.',
    source: 'Quine, "Word and Object", 1960; Hurley §8.6'
  },
  {
    id: 'lf-12',
    name: 'Conjunction Fallacy',
    nameAR: 'مغالطة الاقتران',
    description: 'Judging the probability of a conjunction of two events as higher than the probability of either event alone — violates the probability axiom P(A∧B) ≤ P(A).',
    descriptionAR: 'الحكم بأن احتمال تزامن حدثين أعلى من احتمال أي منهما منفردًا.',
    example: 'Believing it is more likely that a described person is both a bank teller and an activist than just a bank teller.',
    source: 'Tversky & Kahneman, "Extensional versus intuitive reasoning", Psychological Review 1983'
  },
  {
    id: 'lf-13',
    name: 'Base-Rate Neglect',
    nameAR: 'إهمال المعدل الأساسي',
    description: 'Ignoring the prior probability (base rate) of an event when evaluating evidence, leading to overestimation of conditional probabilities.',
    descriptionAR: 'تجاهل الاحتمال السابق عند تقييم الأدلة.',
    example: 'A test for a rare disease is 99% accurate; a positive result is assumed almost certain infection, ignoring that the disease affects 1 in 10,000.',
    source: 'Kahneman & Tversky, "On the psychology of prediction", Psychological Review 1973'
  },
  {
    id: 'lf-14',
    name: "Gambler's Fallacy",
    nameAR: 'مغالطة القمار',
    description: 'Believing that independent random events become more or less likely based on previous outcomes.',
    descriptionAR: 'الاعتقاد بأن الأحداث العشوائية المستقلة تتأثر بنتائجها السابقة.',
    example: 'After five coin tosses all landing heads, assuming tails is "due" on the next toss.',
    source: 'Tversky & Kahneman, "Belief in the law of small numbers", Psychological Bulletin 1971'
  },
  {
    id: 'lf-15',
    name: 'Hot-Hand Fallacy',
    nameAR: 'مغالطة اليد الساخنة',
    description: 'Incorrectly believing that a person who has succeeded several times in a random sequence is more likely to succeed again, treating a random streak as skill-based momentum.',
    descriptionAR: 'الاعتقاد بأن سلسلة نجاحات عشوائية دليل على زخم مستمر.',
    example: 'Assuming a person who has guessed correctly three times in a row is on a "hot streak" and will continue to guess correctly.',
    source: 'Gilovich, Vallone & Tversky, "The hot hand in basketball", Cognitive Psychology 1985'
  },
  {
    id: 'lf-16',
    name: "Prosecutor's Fallacy (Inverse Probability)",
    nameAR: 'مغالطة المدعي العام',
    description: 'Confusing P(evidence | innocent) with P(innocent | evidence); treating the probability of the evidence given an assumption as the probability of the assumption given the evidence.',
    descriptionAR: 'الخلط بين احتمال الدليل بفرض البراءة واحتمال البراءة بوجود الدليل.',
    example: 'A DNA match with 1-in-a-million odds of coincidence is presented as meaning there is only a 1-in-a-million chance of innocence.',
    source: 'Thompson & Schumann, "Interpretation of statistical evidence", Law and Human Behavior 1987'
  },
  {
    id: 'lf-17',
    name: "Defendant's Fallacy",
    nameAR: 'مغالطة المتهم',
    description: 'Arguing that because the population matching certain evidence is large, the probability of guilt is low — the inverse of the prosecutor\'s fallacy.',
    descriptionAR: 'الاستدلال بأن كثرة مَن يتطابقون مع دليل ما يجعل احتمال الإدانة منخفضًا.',
    example: 'There are thousands of people with the same blood type in this city, so the match cannot point to me.',
    source: 'Thompson & Schumann, "Interpretation of statistical evidence", Law and Human Behavior 1987'
  },
  {
    id: 'lf-18',
    name: 'Conjunction–Disjunction Confusion',
    nameAR: 'الخلط بين العطف والفصل',
    description: 'Treating "and" as interchangeable with "or" in logical propositions, producing invalid inferences.',
    descriptionAR: 'التعامل مع الاقتران والفصل كأنهما متكافئان.',
    example: 'Claiming that needing food and water means needing food or water satisfies the requirement.',
    source: 'Hurley, "A Concise Introduction to Logic", 14th ed., §6.1'
  },
  {
    id: 'lf-19',
    name: 'Fallacy of the Single Case',
    nameAR: 'مغالطة الحالة الواحدة',
    description: 'Generalizing a universal claim from a single anecdote or example without statistical basis.',
    descriptionAR: 'تعميم ادعاء شامل من حالة واحدة دون أساس إحصائي.',
    example: 'One person recovered from an illness without treatment, therefore the illness always resolves on its own.',
    source: 'Walton, "Informal Logic: A Pragmatic Approach", 2nd ed., §4.3'
  },
  {
    id: 'lf-20',
    name: 'Conjunction–Disjunction Ambiguity (Scope)',
    nameAR: 'غموض نطاق الاقتران والفصل',
    description: 'Ambiguity arising from unclear scope of logical connectives within a compound statement.',
    descriptionAR: 'غموض ناتج عن عدم وضوح نطاق الروابط المنطقية.',
    example: 'All A and B or C must comply — unclear whether the "or" applies within the group or selectively.',
    source: 'Hurley, "A Concise Introduction to Logic", 14th ed., §2.3'
  },
  // ── Informal — relevance ──────────────────────────────────────────
  {
    id: 'lf-21',
    name: 'Ad Hominem (Abusive)',
    nameAR: 'الهجوم الشخصي المسيء',
    description: 'Rejecting an argument by attacking the character or personal traits of the person making it, rather than addressing the argument itself.',
    descriptionAR: 'رفض الحجة بالهجوم على شخص صاحبها بدلًا من معالجة الحجة ذاتها.',
    example: 'Dismissing a proposal because the person who made it was once found to be dishonest in an unrelated matter.',
    source: 'Walton, "Ad Hominem Arguments", 1998; Hamblin, "Fallacies", 1970'
  },
  {
    id: 'lf-22',
    name: 'Ad Hominem (Circumstantial)',
    nameAR: 'الهجوم الشخصي الظرفي',
    description: 'Dismissing a claim by pointing to the personal circumstances or interests of the claimant, implying bias rather than refuting the argument.',
    descriptionAR: 'رد الحجة بالإشارة إلى ظروف المتكلم الشخصية دون مناقشة الحجة.',
    example: 'Saying a researcher\'s finding should be ignored because they receive funding from an industry — relevant as a disclosure but not a refutation.',
    source: 'Walton, "Ad Hominem Arguments", 1998'
  },
  {
    id: 'lf-23',
    name: 'Tu Quoque',
    nameAR: 'أنت أيضًا',
    description: 'Deflecting criticism by pointing out that the critic behaves similarly, rather than addressing the substance of the criticism.',
    descriptionAR: 'تحويل الانتقاد بالإشارة إلى أن الناقد يتصرف بالطريقة نفسها.',
    example: 'Responding to an argument against deception by noting that the critic has also been deceptive in the past.',
    source: 'Walton, "Informal Logic", 2008, §6.4'
  },
  {
    id: 'lf-24',
    name: 'Genetic Fallacy',
    nameAR: 'المغالطة الجينية / النسبية',
    description: 'Evaluating a claim as true or false based solely on its origin rather than on its content or evidence.',
    descriptionAR: 'تقييم الادعاء على أساس مصدره فحسب دون النظر في مضمونه.',
    example: 'Accepting a medical fact because it comes from a particular tradition rather than assessing the evidence.',
    source: 'Hurley, "A Concise Introduction to Logic", 14th ed., §3.3'
  },
  {
    id: 'lf-25',
    name: 'Poisoning the Well',
    nameAR: 'تسميم البئر',
    description: 'Preemptively discrediting a source before any argument is heard, making it impossible for any response to be considered valid.',
    descriptionAR: 'تشويه مصداقية مصدر ما قبل سماع حجته حتى يستحيل الرد.',
    example: 'Telling an audience that a forthcoming speaker lies about everything, so nothing they say should be believed.',
    source: 'Walton, "Informal Logic", 2008, §6.5'
  },
  {
    id: 'lf-26',
    name: 'Appeal to False Authority',
    nameAR: 'الاحتجاج بسلطة زائفة',
    description: 'Citing an authority on a topic outside their area of genuine expertise, or citing credentials without domain relevance.',
    descriptionAR: 'الاستشهاد بخبير في موضوع يخرج عن نطاق تخصصه الحقيقي.',
    example: 'Invoking a celebrity athlete\'s endorsement as evidence that a nutritional supplement is medically sound.',
    source: 'Walton, "Appeal to Expert Opinion", 1997'
  },
  {
    id: 'lf-27',
    name: 'Appeal to Popularity (Ad Populum)',
    nameAR: 'الاحتجاج بالشعبية',
    description: 'Treating the widespread acceptance of a claim as evidence of its truth.',
    descriptionAR: 'اعتبار كثرة قائلي الادعاء دليلًا على صحته.',
    example: 'Most people in this region believe this remedy works, so it must be effective.',
    source: 'Hurley, "A Concise Introduction to Logic", 14th ed., §3.3'
  },
  {
    id: 'lf-28',
    name: 'Appeal to Tradition',
    nameAR: 'الاحتجاج بالتقليد',
    description: 'Arguing that a practice is correct or good because it is old or traditional, without evaluating its merits.',
    descriptionAR: 'الاستدلال على صحة شيء بمجرد قِدَمه أو تقليديته.',
    example: 'We should continue using this outdated procedure because it has been done this way for generations.',
    source: 'Hurley, "A Concise Introduction to Logic", 14th ed., §3.3'
  },
  {
    id: 'lf-29',
    name: 'Appeal to Novelty',
    nameAR: 'الاحتجاج بالحداثة',
    description: 'Treating something as better or truer simply because it is new, without evaluating its merits.',
    descriptionAR: 'اعتبار شيء أفضل أو أصح بمجرد كونه جديدًا.',
    example: 'This new approach must be superior to the old one simply because it was developed recently.',
    source: 'Hurley, "A Concise Introduction to Logic", 14th ed., §3.3'
  },
  {
    id: 'lf-30',
    name: 'Appeal to Nature',
    nameAR: 'الاحتجاج بالطبيعة',
    description: 'Inferring that something is good, safe, or correct because it is "natural", or bad because it is "unnatural".',
    descriptionAR: 'الاستدلال على جودة الشيء أو سلامته بمجرد كونه "طبيعيًا".',
    example: 'This herbal compound is safe to use because it is completely natural, unlike synthetic medicines.',
    source: 'Hurley, "A Concise Introduction to Logic", 14th ed., §3.3'
  },
  {
    id: 'lf-31',
    name: 'Appeal to Emotion (General)',
    nameAR: 'الاحتجاج بالعاطفة',
    description: 'Using emotional language or imagery to sway judgment in place of evidence or argument.',
    descriptionAR: 'استخدام اللغة العاطفية أو الصور العاطفية بدلًا من الأدلة.',
    example: 'Describing a policy in language designed to provoke outrage rather than presenting data on its effects.',
    source: 'Walton, "The Place of Emotion in Argument", 1992'
  },
  {
    id: 'lf-32',
    name: 'Appeal to Fear',
    nameAR: 'الاحتجاج بالخوف',
    description: 'Using the threat of dire consequences to pressure acceptance of a conclusion, rather than providing evidence.',
    descriptionAR: 'استخدام التهديد بعواقب وخيمة لدفع القبول بنتيجة.',
    example: 'If you question this authority, terrible things will happen to you — therefore do not question it.',
    source: 'Walton, "The Place of Emotion in Argument", 1992'
  },
  {
    id: 'lf-33',
    name: 'Appeal to Pity',
    nameAR: 'الاحتجاج بالشفقة',
    description: 'Invoking sympathy for the speaker or another party to gain acceptance of a conclusion unrelated to the evidence.',
    descriptionAR: 'إثارة الشفقة لكسب القبول بنتيجة لا علاقة لها بالدليل.',
    example: 'This claimant has suffered greatly, so we should accept their account as accurate.',
    source: 'Hurley, "A Concise Introduction to Logic", 14th ed., §3.3'
  },
  {
    id: 'lf-34',
    name: 'Appeal to Spite',
    nameAR: 'الاحتجاج بالحقد',
    description: 'Using spite or hostility toward a party as a reason to reject their position, regardless of the position\'s merits.',
    descriptionAR: 'استخدام الحقد على طرف ما سببًا لرفض موقفه بصرف النظر عن مزاياه.',
    example: 'We should reject this proposal simply because it was put forward by a rival group we dislike.',
    source: 'Hurley, "A Concise Introduction to Logic", 14th ed., §3.3'
  },
  {
    id: 'lf-35',
    name: 'Appeal to Flattery',
    nameAR: 'الاحتجاج بالإطراء',
    description: 'Using excessive praise of the audience or interlocutor to gain acceptance of a position.',
    descriptionAR: 'استخدام المديح المبالغ فيه لاستمالة الجمهور نحو قبول موقف.',
    example: 'As intelligent and discerning people, you will surely see the wisdom in this proposal.',
    source: 'Hurley, "A Concise Introduction to Logic", 14th ed., §3.3'
  },
  {
    id: 'lf-36',
    name: 'Appeal to Ignorance (Ad Ignorantiam)',
    nameAR: 'الاحتجاج بالجهل',
    description: 'Arguing that a claim is true because it has not been proven false, or false because it has not been proven true.',
    descriptionAR: 'الاستدلال على صحة ادعاء بعدم إثبات خطئه.',
    example: 'No one has proven that this practice is harmful, so it must be safe.',
    source: 'Hurley, "A Concise Introduction to Logic", 14th ed., §3.3'
  },
  {
    id: 'lf-37',
    name: 'Appeal to Consequences',
    nameAR: 'الاحتجاج بالنتائج',
    description: 'Arguing that a claim must be true or false based on the desirability of its consequences rather than on evidence.',
    descriptionAR: 'الاستدلال على صحة أو خطأ ادعاء بناءً على مدى استحسان نتائجه.',
    example: 'This medical theory must be true because if it were false, the consequences for public health would be devastating.',
    source: 'Walton, "Informal Logic", 2008, §7.1'
  },
  {
    id: 'lf-38',
    name: 'Argument from Incredulity',
    nameAR: 'الحجة من عدم التصديق',
    description: 'Claiming something must be false (or explained by a favored alternative) because the claimant personally cannot conceive how it could be true.',
    descriptionAR: 'ادعاء خطأ شيء لمجرد عدم قدرة الشخص على تصور كيفية صحته.',
    example: 'I cannot imagine how a complex structure could form without conscious design, therefore it must have been designed.',
    source: 'Hurley, "A Concise Introduction to Logic", 14th ed., §3.3'
  },
  {
    id: 'lf-39',
    name: 'Argument from Silence',
    nameAR: 'الحجة من الصمت',
    description: 'Drawing a positive or negative conclusion from the absence of evidence, when the absence is not itself informative.',
    descriptionAR: 'استنتاج إيجابي أو سلبي من غياب الدليل حين لا يكون الغياب معلوماتيًا.',
    example: 'There is no record of this event being disputed, therefore it must have happened exactly as described.',
    source: 'Walton, "Informal Logic", 2008, §7.2'
  },
  {
    id: 'lf-40',
    name: 'Straw Man',
    nameAR: 'رجل القش',
    description: 'Misrepresenting an opponent\'s argument in a weakened or distorted form in order to refute the misrepresentation rather than the actual argument.',
    descriptionAR: 'تشويه حجة الخصم في صورة أضعف لدحض الصورة المشوَّهة لا الحجة الأصلية.',
    example: 'Someone advocates for stricter safety regulations; the counterargument says they want to ban all industry activity.',
    source: 'Walton, "The Straw Man Fallacy", in "Fallacies: Classical and Contemporary Readings", 1995'
  },
  {
    id: 'lf-41',
    name: 'Red Herring',
    nameAR: 'التشتيت',
    description: 'Introducing irrelevant information to divert attention from the actual issue.',
    descriptionAR: 'إدخال معلومات غير ذات صلة لصرف الانتباه عن القضية الفعلية.',
    example: 'When challenged on a policy detail, changing the subject to the opponent\'s general character.',
    source: 'Walton, "Informal Logic", 2008, §7.3'
  },
  {
    id: 'lf-42',
    name: 'Whataboutism',
    nameAR: 'ماذا عن؟',
    description: 'Responding to a criticism by raising a different perceived wrongdoing of the critic rather than addressing the criticism itself.',
    descriptionAR: 'الرد على انتقاد بطرح خطأ آخر منسوب للناقد عوضًا عن معالجة الانتقاد.',
    example: 'In response to criticism of a specific action, asking why the critic does not first address comparable actions of others.',
    source: 'Walton, "Informal Logic", 2008; see also tu quoque'
  },
  {
    id: 'lf-43',
    name: 'Two Wrongs Make a Right',
    nameAR: 'خطآن يصنعان صوابًا',
    description: 'Justifying a wrong action by pointing to a comparable wrong action committed by another party.',
    descriptionAR: 'تبرير فعل خاطئ بالإشارة إلى فعل خاطئ مماثل ارتكبه طرف آخر.',
    example: 'It is acceptable to breach this person\'s privacy because they have breached others\' privacy in the past.',
    source: 'Hurley, "A Concise Introduction to Logic", 14th ed., §3.3'
  },
  {
    id: 'lf-44',
    name: 'Bandwagon (Ad Populum Variant)',
    nameAR: 'العصبة / ركوب الموجة',
    description: 'Pressuring someone to adopt a position on the grounds that "everyone is doing it" or that it is the popular current trend.',
    descriptionAR: 'الضغط على شخص لتبني موقف بذريعة أن الجميع يفعله.',
    example: 'All our competitors have adopted this approach, so we must adopt it too, regardless of its merits.',
    source: 'Hurley, "A Concise Introduction to Logic", 14th ed., §3.3'
  },
  {
    id: 'lf-45',
    name: 'Argumentum ad Baculum (Appeal to Force)',
    nameAR: 'الحجة بالقوة / العصا',
    description: 'Using threats or coercion to compel acceptance of a conclusion rather than evidence.',
    descriptionAR: 'استخدام التهديد أو الإكراه لدفع قبول النتيجة بدلًا من الأدلة.',
    example: 'You should agree with this position, or you will find your employment situation very difficult.',
    source: 'Walton, "Informal Logic", 2008, §7.4'
  },
  // ── Informal — presumption ────────────────────────────────────────
  {
    id: 'lf-46',
    name: 'Begging the Question (Petitio Principii)',
    nameAR: 'المصادرة على المطلوب',
    description: 'Using the conclusion as a premise in the argument, either explicitly or in disguised form.',
    descriptionAR: 'استخدام النتيجة ذاتها مقدمةً في الحجة.',
    example: 'This text is reliable because it says so itself, and it is reliable so we trust what it says.',
    source: 'Aristotle, "Sophistical Refutations", 168b; Walton, "Begging the Question", 1991'
  },
  {
    id: 'lf-47',
    name: 'Circular Reasoning',
    nameAR: 'الاستدلال الدائري',
    description: 'A form of begging the question where the support for a claim relies on the claim itself, forming a loop.',
    descriptionAR: 'شكل من المصادرة يعتمد فيه الدليل على الادعاء ذاته.',
    example: 'We know this source is authoritative because all authoritative sources cite it, and they cite it because it is authoritative.',
    source: 'Walton, "Begging the Question", 1991'
  },
  {
    id: 'lf-48',
    name: 'Loaded Question',
    nameAR: 'السؤال المحمَّل',
    description: 'Asking a question that contains a hidden assumption the respondent has not accepted, forcing a damaging admission regardless of the answer.',
    descriptionAR: 'سؤال يتضمن افتراضًا مسبقًا لم يقبله المُجاب.',
    example: '"Have you stopped falsifying your results?" — assumes falsification regardless of yes or no.',
    source: 'Walton, "Informal Logic", 2008, §8.1'
  },
  {
    id: 'lf-49',
    name: 'Complex Question',
    nameAR: 'السؤال المركَّب',
    description: 'Posing a single question that conflates two or more questions, demanding a single answer for what requires separate answers.',
    descriptionAR: 'طرح سؤال يجمع بين سؤالين أو أكثر يستلزم كل منهما إجابة مستقلة.',
    example: '"Is this proposal both effective and ethical?" — effectiveness and ethics need separate evaluation.',
    source: 'Walton, "Informal Logic", 2008, §8.1'
  },
  {
    id: 'lf-50',
    name: 'False Dilemma',
    nameAR: 'المعضلة الزائفة',
    description: 'Presenting a situation as having only two options when other alternatives exist.',
    descriptionAR: 'تقديم موقف على أنه لا يتيح إلا خيارين بينما توجد بدائل أخرى.',
    example: 'You are either fully with us or against us — ruling out any nuanced or partial position.',
    source: 'Hurley, "A Concise Introduction to Logic", 14th ed., §3.3'
  },
  {
    id: 'lf-51',
    name: 'False Trilemma',
    nameAR: 'المعضلة الثلاثية الزائفة',
    description: 'Presenting three options as exhaustive when additional alternatives exist.',
    descriptionAR: 'تقديم ثلاثة خيارات على أنها شاملة بينما توجد خيارات إضافية.',
    example: 'You can work fast, cheap, or good — pick two; ignoring approaches that optimize all three.',
    source: 'Walton, "Informal Logic", 2008, §5.5'
  },
  {
    id: 'lf-52',
    name: 'Black-or-White Fallacy',
    nameAR: 'مغالطة الأسود أو الأبيض',
    description: 'Treating a continuous spectrum of possibilities as if it had only two extreme poles.',
    descriptionAR: 'التعامل مع طيف متصل من الاحتمالات كما لو كان له قطبان متطرفان فحسب.',
    example: 'A policy is either completely beneficial or completely harmful — ignoring gradations.',
    source: 'Hurley, "A Concise Introduction to Logic", 14th ed., §3.3'
  },
  {
    id: 'lf-53',
    name: 'Hasty Generalization',
    nameAR: 'التعميم المتسرع',
    description: 'Drawing a broad general conclusion from a small or unrepresentative sample.',
    descriptionAR: 'استنتاج عام واسع من عينة صغيرة أو غير ممثلة.',
    example: 'Encountering two instances of a behavior and concluding it is universal.',
    source: 'Hurley, "A Concise Introduction to Logic", 14th ed., §3.3'
  },
  {
    id: 'lf-54',
    name: 'Sweeping Generalization (Dicto Simpliciter)',
    nameAR: 'التعميم الكاسح',
    description: 'Applying a general rule to a specific case to which exceptions clearly apply, without acknowledging the exception.',
    descriptionAR: 'تطبيق قاعدة عامة على حالة بعينها رغم وجود استثناء واضح.',
    example: 'All nutrients are necessary for health; excessive intake of this nutrient is therefore healthy.',
    source: 'Hurley, "A Concise Introduction to Logic", 14th ed., §3.3'
  },
  {
    id: 'lf-55',
    name: 'Fallacy of Composition',
    nameAR: 'مغالطة التركيب',
    description: 'Inferring that a whole has a property because its parts have that property.',
    descriptionAR: 'استنتاج أن الكل يملك صفة لأن أجزاءه تملكها.',
    example: 'Each component of a machine is lightweight; therefore the assembled machine is lightweight.',
    source: 'Hurley, "A Concise Introduction to Logic", 14th ed., §3.3'
  },
  {
    id: 'lf-56',
    name: 'Fallacy of Division',
    nameAR: 'مغالطة التقسيم',
    description: 'Inferring that the parts of a whole have a property because the whole has it.',
    descriptionAR: 'استنتاج أن أجزاء الكل تملك صفة لأن الكل يملكها.',
    example: 'This organization is highly effective; therefore every individual member is highly effective.',
    source: 'Hurley, "A Concise Introduction to Logic", 14th ed., §3.3'
  },
  {
    id: 'lf-57',
    name: 'Slippery Slope (Causal)',
    nameAR: 'المنحدر الزلق (السببي)',
    description: 'Asserting that one event will inevitably lead through a chain of causal steps to an extreme and undesirable outcome, without providing evidence for each step.',
    descriptionAR: 'الادعاء بأن حدثًا واحدًا سيقود حتمًا عبر سلسلة سببية إلى نتيجة قصوى وغير مرغوبة دون دليل على كل حلقة.',
    example: 'Allowing this minor regulatory relaxation will lead inevitably to complete deregulation and catastrophic harm.',
    source: 'Walton, "Slippery Slope Arguments", 1992'
  },
  {
    id: 'lf-58',
    name: 'Slippery Slope (Precedential)',
    nameAR: 'المنحدر الزلق (السابقة)',
    description: 'Arguing that accepting a case will set a precedent requiring acceptance of progressively more extreme cases.',
    descriptionAR: 'الاستدلال بأن قبول حالة سيخلق سابقة تستلزم قبول حالات متطرفة متزايدة.',
    example: 'Granting this exemption will mean we must grant progressively broader exemptions until the rule is meaningless.',
    source: 'Walton, "Slippery Slope Arguments", 1992'
  },
  {
    id: 'lf-59',
    name: 'Post Hoc Ergo Propter Hoc',
    nameAR: 'بعده، لذا بسببه',
    description: 'Inferring that because B followed A, A caused B, without additional evidence of a causal relationship.',
    descriptionAR: 'استنتاج أن ب تلا أ يعني أن أ تسبب في ب دون دليل على العلاقة السببية.',
    example: 'Symptoms improved after taking a supplement, so the supplement must have caused the improvement.',
    source: 'Hurley, "A Concise Introduction to Logic", 14th ed., §3.3'
  },
  {
    id: 'lf-60',
    name: 'Cum Hoc Ergo Propter Hoc',
    nameAR: 'معه، لذا بسببه',
    description: 'Inferring causation from correlation: because A and B occur together, A causes B.',
    descriptionAR: 'استنتاج السببية من الارتباط: لأن أ و ب يتزامنان، إذًا أ يسبب ب.',
    example: 'Countries with higher chocolate consumption have more Nobel Prize winners; therefore chocolate causes intellectual achievement.',
    source: 'Hurley, "A Concise Introduction to Logic", 14th ed., §3.3'
  },
  {
    id: 'lf-61',
    name: 'Texas Sharpshooter',
    nameAR: 'الرامي التكساسي الماهر',
    description: 'Selecting or clustering data after the fact to find a pattern, then claiming the pattern was predicted or meaningful.',
    descriptionAR: 'انتقاء البيانات أو تجميعها بأثر رجعي لإيجاد نمط ثم الادعاء بمعناه.',
    example: 'Examining outcomes across many variables and highlighting only those that form an apparent pattern.',
    source: 'Gould, "Bully for Brontosaurus", 1991; standard epidemiological teaching'
  },
  {
    id: 'lf-62',
    name: 'Survivorship Bias',
    nameAR: 'تحيز الناجين',
    description: 'Drawing conclusions only from cases that "survived" a selection process, ignoring the cases that did not, producing an unrepresentative sample.',
    descriptionAR: 'استخلاص نتائج من الحالات التي "نجت" من عملية انتقاء دون أخذ الحالات الفاشلة بالاعتبار.',
    example: 'Studying only successful ventures to learn the keys to success, ignoring the larger number of failed ventures with similar characteristics.',
    source: 'Wald, "A Method of Estimating Plane Vulnerability", 1943 (classic case); Taleb, "The Black Swan", 2007'
  },
  {
    id: 'lf-63',
    name: 'No-True-Scotsman',
    nameAR: 'لا اسكتلندي حقيقي',
    description: 'Defending a universal generalization by redefining membership in the category to exclude counter-examples, rather than revising the claim.',
    descriptionAR: 'الدفاع عن تعميم شامل بإعادة تعريف الفئة لاستبعاد الأمثلة المضادة.',
    example: 'No real adherent of this view would do X; when shown that one did, responding: then they were never a real adherent.',
    source: 'Flew, "Thinking About Thinking", 1975'
  },
  {
    id: 'lf-64',
    name: 'Moving the Goalposts',
    nameAR: 'تحريك أعمدة المرمى',
    description: 'Raising the evidentiary or argumentative bar each time a demanded criterion is met, to avoid conceding a point.',
    descriptionAR: 'رفع معيار الإثبات في كل مرة يُستوفى فيها المعيار السابق.',
    example: 'First requiring one type of evidence; when provided, requiring a different type; when that is provided, requiring yet another.',
    source: 'Walton, "Informal Logic", 2008'
  },
  {
    id: 'lf-65',
    name: 'Special Pleading',
    nameAR: 'الاستثناء الخاص غير المبرر',
    description: 'Applying a double standard by demanding an exemption from a rule for oneself or one\'s favored position without a principled reason for the exemption.',
    descriptionAR: 'تطبيق معيار مزدوج بالمطالبة باستثناء من قاعدة دون مبرر منطقي.',
    example: 'Insisting that a general standard of evidence applies to all claims except the claims one personally holds.',
    source: 'Hurley, "A Concise Introduction to Logic", 14th ed., §3.3'
  },
  // ── Informal — ambiguity ──────────────────────────────────────────
  {
    id: 'lf-66',
    name: 'Equivocation',
    nameAR: 'المشترك اللفظي',
    description: 'Using a word in two different senses within the same argument, making the argument appear valid while it is not.',
    descriptionAR: 'استخدام كلمة بمعنيين مختلفين في نفس الحجة لإيهام الصحة.',
    example: 'Laws of nature are rigid; therefore we cannot alter the laws governing social behavior.',
    source: 'Aristotle, "Sophistical Refutations", 165b; Hurley §3.3'
  },
  {
    id: 'lf-67',
    name: 'Amphiboly',
    nameAR: 'الغموض التركيبي',
    description: 'Drawing an inference from a grammatically ambiguous statement by selecting the interpretation most favorable to the desired conclusion.',
    descriptionAR: 'استنتاج من جملة غامضة نحويًا باختيار التفسير الملائم للنتيجة المرادة.',
    example: 'An announcement says "students must submit forms or pay the fee by Friday" — ambiguous whether both or either.',
    source: 'Hurley, "A Concise Introduction to Logic", 14th ed., §3.3'
  },
  {
    id: 'lf-68',
    name: 'Fallacy of Accent',
    nameAR: 'مغالطة التشديد',
    description: 'Changing the meaning of a statement by shifting stress onto different words or taking words out of their emphasized context.',
    descriptionAR: 'تغيير معنى جملة بتحويل التأكيد إلى كلمات مختلفة.',
    example: 'Taking a quote where emphasis falls on one clause and removing that emphasis to change its meaning.',
    source: 'Hurley, "A Concise Introduction to Logic", 14th ed., §3.3'
  },
  {
    id: 'lf-69',
    name: 'Reification (Hypostatisation)',
    nameAR: 'الاستشياء / التجسيد',
    description: 'Treating an abstract concept as if it were a concrete entity that can act or be acted upon.',
    descriptionAR: 'التعامل مع مفهوم مجرد كما لو كان كيانًا ملموسًا قادرًا على الفعل.',
    example: '"Society demands that we do this" — attributing agency to an abstraction.',
    source: 'Hurley, "A Concise Introduction to Logic", 14th ed., §3.3'
  },
  {
    id: 'lf-70',
    name: 'Composition–Division Ambiguity',
    nameAR: 'غموض التركيب والتقسيم',
    description: 'Ambiguity arising when it is unclear whether a property is attributed to a whole or to its parts.',
    descriptionAR: 'غموض ناتج عن عدم وضوح هل الصفة منسوبة للكل أم لأجزائه.',
    example: '"The team is talented" could mean each member is individually talented, or they work well together.',
    source: 'Hurley, "A Concise Introduction to Logic", 14th ed., §3.3'
  },
  {
    id: 'lf-71',
    name: 'Quoting Out of Context',
    nameAR: 'الاقتباس خارج السياق',
    description: 'Presenting a quotation in a context different from the one intended by the original author, distorting its meaning.',
    descriptionAR: 'عرض اقتباس في سياق يختلف عما قصده صاحبه الأصلي.',
    example: 'Using a fragment of a sentence that has been qualified by a later clause as if the qualification did not exist.',
    source: 'Walton, "Informal Logic", 2008'
  },
  {
    id: 'lf-72',
    name: 'Definitional Retreat',
    nameAR: 'التراجع التعريفي',
    description: 'Shifting the meaning of a key term when a claim is challenged, so the claim becomes untestable or trivially true.',
    descriptionAR: 'تغيير معنى مصطلح رئيسي عند الطعن في ادعاء لجعله غير قابل للاختبار.',
    example: 'After a prediction fails, claiming the term used was meant in a different, more limited sense.',
    source: 'Walton, "Informal Logic", 2008'
  },
  {
    id: 'lf-73',
    name: 'Etymological Fallacy',
    nameAR: 'المغالطة الاشتقاقية',
    description: 'Arguing that the current meaning of a word must be its original etymological meaning, ignoring how meanings evolve.',
    descriptionAR: 'الاستدلال بأن المعنى الحالي للكلمة لا بد أن يكون معناها الاشتقاقي الأصلي.',
    example: 'Insisting a word must mean exactly what its Latin root meant, despite centuries of semantic shift.',
    source: 'Pinker, "The Language Instinct", 1994; standard linguistics'
  },
  {
    id: 'lf-74',
    name: 'Continuum Fallacy',
    nameAR: 'مغالطة الاستمرارية',
    description: 'Arguing that because a distinction cannot be drawn with perfect precision, no distinction exists at all.',
    descriptionAR: 'الاستدلال على عدم وجود فرق لأنه لا يمكن رسم خط فاصل دقيق.',
    example: 'Since there is no precise boundary between youth and adulthood, there is no difference between them.',
    source: 'Walton, "Informal Logic", 2008; Sorensen, "Vagueness and Contradiction", 2001'
  },
  {
    id: 'lf-75',
    name: 'False Analogy',
    nameAR: 'القياس الزائف',
    description: 'Drawing a conclusion by comparing two situations that are superficially similar but differ in relevant ways.',
    descriptionAR: 'استنتاج من مقارنة بين حالتين متشابهتين شكليًا لكن تختلفان في وجوه جوهرية.',
    example: 'The human brain is like a computer; computers can be upgraded; therefore the human brain can be directly upgraded.',
    source: 'Walton, "Informal Logic", 2008, §9.3'
  },
  {
    id: 'lf-76',
    name: 'Faulty Comparison',
    nameAR: 'المقارنة الخاطئة',
    description: 'Comparing two things that are not comparable on the relevant dimension, reaching an invalid conclusion.',
    descriptionAR: 'مقارنة شيئين لا يمكن مقارنتهما على البُعد المعني.',
    example: 'Comparing the absolute number of incidents in a large population with those in a small one as if they were equivalent rates.',
    source: 'Walton, "Informal Logic", 2008'
  },
  {
    id: 'lf-77',
    name: 'Misleading Vividness',
    nameAR: 'الإيحاء المضلل',
    description: 'Giving more weight to a striking, vivid anecdote than to substantial statistical evidence.',
    descriptionAR: 'إعطاء وزن أكبر لقصة مشوِّقة من الإحصاءات الجوهرية.',
    example: 'One dramatic personal account is treated as more persuasive than data from a large controlled study.',
    source: 'Hurley, "A Concise Introduction to Logic", 14th ed., §3.3'
  },
  {
    id: 'lf-78',
    name: 'Anecdotal Evidence',
    nameAR: 'الدليل الاستئناسي',
    description: 'Using isolated personal experiences or a small number of cases as if they constituted significant evidence for a general conclusion.',
    descriptionAR: 'استخدام تجارب شخصية معزولة كأدلة كافية لاستنتاج عام.',
    example: 'Claiming a treatment works based on the experience of one or two individuals without controlled study.',
    source: 'Hurley, "A Concise Introduction to Logic", 14th ed., §3.3'
  },
  {
    id: 'lf-79',
    name: 'Cherry-Picking',
    nameAR: 'الانتقائية',
    description: 'Selectively citing evidence that supports one\'s conclusion while ignoring contrary evidence.',
    descriptionAR: 'انتقاء الأدلة الداعمة للادعاء وتجاهل الأدلة المعارضة.',
    example: 'Presenting several studies that support a hypothesis while omitting numerous studies that contradict it.',
    source: 'Cook et al., "Cranky Uncle vs. Climate Change", 2020; standard research methodology'
  },
  {
    id: 'lf-80',
    name: 'Suppressed Evidence',
    nameAR: 'الدليل المكبوت',
    description: 'Constructing an apparently sound argument by omitting known evidence that would undermine or reverse the conclusion.',
    descriptionAR: 'بناء حجة تبدو سليمة عبر إغفال أدلة معروفة تُضعف النتيجة.',
    example: 'Reporting that a substance is correlated with a positive outcome while suppressing data showing confounding factors or negative outcomes.',
    source: 'Walton, "Informal Logic", 2008'
  },
  // ── Statistical & methodological ─────────────────────────────────
  {
    id: 'lf-81',
    name: 'P-Hacking',
    nameAR: 'اختراق قيمة p',
    description: 'Manipulating data analysis — through outcome switching, selective reporting, or repeated testing — until a p-value falls below the significance threshold.',
    descriptionAR: 'التلاعب بالتحليل الإحصائي حتى تنخفض قيمة p دون عتبة الدلالة.',
    example: 'Testing dozens of subgroups and only reporting the one that reached significance.',
    source: 'Simmons, Nelson & Simonsohn, "False-Positive Psychology", Psychological Science 2011'
  },
  {
    id: 'lf-82',
    name: 'HARKing (Hypothesizing After Results are Known)',
    nameAR: 'صياغة الفرضية بعد الاطلاع على النتائج',
    description: 'Presenting a hypothesis as if it were formulated before the study when it was actually generated after observing the data.',
    descriptionAR: 'تقديم فرضية على أنها صيغت قبل الدراسة بينما وُلدت بعد رؤية البيانات.',
    example: 'Noticing a pattern in collected data and then writing a paper framing that pattern as the original hypothesis.',
    source: 'Kerr, "HARKing: Hypothesizing After the Results are Known", Personality and Social Psychology Review 1998'
  },
  {
    id: 'lf-83',
    name: 'Garden of Forking Paths',
    nameAR: 'حديقة المسارات المتشعبة',
    description: 'The inflated false-positive rate arising from the many undisclosed analytical choices (model specification, outlier treatment, etc.) that could have been made differently.',
    descriptionAR: 'معدل النتائج الإيجابية الكاذبة المرتفع الناتج عن الاختيارات التحليلية غير المُفصَح عنها.',
    example: 'An analysis reaching significance because the researcher unconsciously chose among many plausible models the one that worked.',
    source: 'Gelman & Loken, "The Statistical Crisis in Science", American Scientist 2014'
  },
  {
    id: 'lf-84',
    name: 'Multiple Comparisons Without Correction',
    nameAR: 'المقارنات المتعددة دون تصحيح',
    description: 'Testing many hypotheses simultaneously without adjusting the significance threshold, so spurious findings appear by chance.',
    descriptionAR: 'اختبار فرضيات متعددة في آنٍ دون تعديل عتبة الدلالة، مما يُنتج نتائج وهمية بالصدفة.',
    example: 'Testing 20 hypotheses each at p < 0.05 without correction, expecting on average one false positive.',
    source: 'Dunn, "Multiple Comparisons Among Means", JASA 1961; standard biostatistics'
  },
  {
    id: 'lf-85',
    name: 'Regression to the Mean',
    nameAR: 'الانحدار نحو المتوسط',
    description: 'Mistaking a natural statistical tendency of extreme scores to move closer to the average on retesting for a real treatment effect.',
    descriptionAR: 'الخلط بين ميل الدرجات المتطرفة للاقتراب من المتوسط عند إعادة القياس وأثر علاجي حقيقي.',
    example: 'Patients selected because their condition was at its worst improve on retesting; improvement attributed to a treatment.',
    source: 'Galton, "Regression Towards Mediocrity", Journal of the Anthropological Institute 1886; Bland & Altman, BMJ 1994'
  },
  {
    id: 'lf-86',
    name: "Simpson's Paradox (Neglect of)",
    nameAR: 'تجاهل مفارقة سيمبسون',
    description: 'A trend appearing in aggregate data reverses when the data are broken down by subgroups; ignoring this produces misleading aggregate conclusions.',
    descriptionAR: 'اتجاه يظهر في البيانات الإجمالية يعكس اتجاهه عند تحليل المجموعات الفرعية.',
    example: 'An overall positive correlation between two variables disappears or reverses when controlling for a confounding third variable.',
    source: 'Simpson, "The interpretation of interaction in contingency tables", JRSS 1951'
  },
  {
    id: 'lf-87',
    name: 'Ecological Fallacy',
    nameAR: 'المغالطة البيئية',
    description: 'Drawing conclusions about individuals from data aggregated at the group or population level.',
    descriptionAR: 'استنتاج صفات أفراد من بيانات إجمالية على مستوى المجموعات.',
    example: 'Finding that regions with higher income have lower disease rates, then concluding wealthy individuals within those regions have lower risk.',
    source: 'Robinson, "Ecological Correlations and the Behavior of Individuals", American Sociological Review 1950'
  },
  {
    id: 'lf-88',
    name: 'Atomistic Fallacy',
    nameAR: 'المغالطة الذرية',
    description: 'Drawing conclusions about groups or higher-level entities solely from individual-level data, ignoring group-level phenomena.',
    descriptionAR: 'استنتاج صفات المجموعات فحسب من بيانات الأفراد متجاهلًا الظواهر الجماعية.',
    example: 'Concluding that a neighbourhood has no poverty problem because each individual studied appears to manage financially.',
    source: 'Schwartz, "The Fallacy of the Ecological Fallacy", American Journal of Public Health 1994'
  },
  {
    id: 'lf-89',
    name: 'Ignoring Confounding',
    nameAR: 'إهمال المُربِك',
    description: 'Attributing an effect to a variable without accounting for a third variable correlated with both, creating a spurious association.',
    descriptionAR: 'إسناد أثر لمتغير دون مراعاة متغير ثالث مرتبط بكليهما.',
    example: 'Observing that people who carry lighters are more likely to develop lung disease, concluding lighters cause disease, ignoring smoking.',
    source: 'Rothman & Greenland, "Modern Epidemiology", 3rd ed., 2008'
  },
  {
    id: 'lf-90',
    name: 'Selection Bias',
    nameAR: 'تحيز الانتقاء',
    description: 'Systematic error introduced when the sample studied is not representative of the population of interest, due to the process by which participants are selected.',
    descriptionAR: 'خطأ منهجي ناتج عن أن العينة المدروسة لا تمثل المجتمع الأصلي.',
    example: 'Surveying only people who voluntarily attend a clinic to estimate the prevalence of a condition in the general population.',
    source: 'Rothman & Greenland, "Modern Epidemiology", 3rd ed., 2008'
  },
  {
    id: 'lf-91',
    name: 'Publication Bias',
    nameAR: 'تحيز النشر',
    description: 'The distortion of the scientific literature caused by the tendency to publish positive or significant results while negative or null results remain unpublished.',
    descriptionAR: 'تشوه الأدبيات العلمية الناتج عن ميل النشر للنتائج الإيجابية وتجاهل السلبية.',
    example: 'A literature review concludes a treatment is effective because only the trials that showed effects were published.',
    source: 'Dickersin, "The Existence of Publication Bias and Risk Factors for Its Occurrence", JAMA 1990'
  },
  {
    id: 'lf-92',
    name: 'Ignoring Funnel-Plot Asymmetry',
    nameAR: 'تجاهل عدم تناظر قمع التوزيع',
    description: 'Failing to assess or report publication bias in a meta-analysis using visual or statistical funnel-plot tests.',
    descriptionAR: 'إغفال تقييم تحيز النشر في التحليل التجميعي عبر اختبارات قمع التوزيع.',
    example: 'A meta-analysis reports a pooled effect without testing whether small, null studies are systematically missing.',
    source: 'Egger et al., "Bias in meta-analysis detected by a simple, graphical test", BMJ 1997'
  },
  {
    id: 'lf-93',
    name: 'Misuse of Statistical Significance',
    nameAR: 'إساءة استخدام الدلالة الإحصائية',
    description: 'Treating a p-value threshold as a measure of the truth, importance, or practical relevance of a finding rather than as a tool for controlling error rates.',
    descriptionAR: 'التعامل مع عتبة قيمة p كمقياس للصحة أو الأهمية بدلًا من كونها أداة للسيطرة على معدلات الخطأ.',
    example: 'Describing a result as "scientifically proven" because it crossed the p < 0.05 threshold, regardless of effect size.',
    source: 'Wasserstein & Lazar, "The ASA statement on p-values", The American Statistician 2016'
  },
  {
    id: 'lf-94',
    name: 'Confidence Interval Misreading',
    nameAR: 'قراءة خاطئة لفترة الثقة',
    description: 'Misinterpreting a 95% confidence interval as the range in which the true parameter lies with 95% probability, rather than as the outcome of a procedure that captures the true value 95% of the time across repeated studies.',
    descriptionAR: 'سوء تفسير فترة الثقة 95% على أنها تحتوي على القيمة الحقيقية بهذه الاحتمالية.',
    example: 'Claiming that the true value definitely lies within the stated interval based on a single study.',
    source: 'Morey et al., "The Fallacy of Placing Confidence in Confidence Intervals", Psychonomic Bulletin & Review 2016'
  },
  {
    id: 'lf-95',
    name: 'Effect-Size Omission',
    nameAR: 'إهمال حجم الأثر',
    description: 'Reporting only statistical significance without reporting the effect size, leaving readers unable to judge the practical or clinical importance of a finding.',
    descriptionAR: 'الاقتصار على الإبلاغ عن الدلالة الإحصائية دون حجم الأثر.',
    example: 'A study reports a statistically significant difference without reporting that the difference is clinically negligible in absolute terms.',
    source: 'Wasserstein & Lazar, "The ASA statement on p-values", The American Statistician 2016; Cohen, "Statistical Power Analysis", 1988'
  },
  // ── Egyptian-dialect & Islamic-rhetoric fallacies ─────────────────
  {
    id: 'lf-96',
    name: 'أهل العلم قالوا (Appeal to Unnamed Scholars)',
    nameAR: 'أهل العلم قالوا',
    description: 'Citing "scholars" or "experts" collectively without identifying them, making the appeal unverifiable — a culturally prevalent variant of the false-authority fallacy.',
    descriptionAR: 'الاستشهاد بـ"أهل العلم" جماعةً دون تسميتهم، مما يجعل الاستناد غير قابل للتحقق.',
    example: 'أهل العلم قالوا إن هذا الأمر محسوم — دون ذكر مَن، ومتى، وفي أي مرجع.',
    source: 'Cook, "Cranky Uncle vs. Climate Change", 2020 (Fake Experts); FLICC taxonomy'
  },
  {
    id: 'lf-97',
    name: 'حديث منتشر (Widespread-Report Fallacy)',
    nameAR: 'حديث منتشر',
    description: 'Treating widespread circulation of an unverified claim on social media as evidence of its authenticity or religious authority.',
    descriptionAR: 'اعتبار انتشار ادعاء غير موثق على وسائل التواصل دليلًا على صحته أو سلطته الدينية.',
    example: 'الحديث ده بيتتقل في كل الجروبات — يبقى لازم يكون صح.',
    source: 'Islamic Authenticity Protocol (EAL governing standard); hadith-verification methodology'
  },
  {
    id: 'lf-98',
    name: 'الكل بيقول (Everyone-Says-So)',
    nameAR: 'الكل بيقول',
    description: 'Treating universal colloquial consensus as epistemic evidence — an ad populum variant common in Egyptian informal reasoning.',
    descriptionAR: 'اعتبار الإجماع العامي الكلامي دليلًا معرفيًا — نوع من الاحتجاج بالشعبية سائد في الأسلوب المصري.',
    example: 'الكل بيقول إن العلاج ده ناجح — يعني لازم يكون فيه فايدة.',
    source: 'Hurley §3.3 (Ad Populum); FLICC taxonomy'
  },
  {
    id: 'lf-99',
    name: 'ده كلام كفر (Accusation-of-Heresy Silencer)',
    nameAR: 'ده كلام كفر',
    description: 'Shutting down inquiry or debate by labelling a question or alternative view as impiety or unbelief, rather than engaging with its substance.',
    descriptionAR: 'إسكات الاستفسار أو الرأي المخالف بتصنيفه كفرًا دون معالجة مضمونه.',
    example: 'سؤال علمي عن حادثة تاريخية يُرد عليه بـ"ده كلام كفر" بدل الإجابة بالدليل.',
    source: 'Argumentum ad baculum variant; EAL governing standard §8-Layer taxonomy'
  },
  {
    id: 'lf-100',
    name: 'السلف ما عملوش كده (Appeal to Ancestral Practice)',
    nameAR: 'السلف ما عملوش كده',
    description: 'Rejecting a practice or idea solely on the grounds that early generations did not do it, conflating historical absence of practice with prohibition.',
    descriptionAR: 'رفض ممارسة أو فكرة بمجرد أن الأجيال الأولى لم تفعلها، مع الخلط بين غياب الممارسة تاريخيًا والتحريم.',
    example: 'رفض استخدام وسيلة تعليمية حديثة بحجة أن السلف ما استخدموهاش — دون النظر في المقاصد والمصلحة.',
    source: 'Appeal to tradition (Hurley §3.3); usul al-fiqh: istishab must be distinguished from explicit prohibition'
  }
];
