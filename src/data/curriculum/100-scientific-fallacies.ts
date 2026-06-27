// Source: src/data/prompts/fallacies.ts (scientificFallacies array, ids 1–98).
// Names are seeded directly from that file; descriptions are standard methodology definitions.
// References: Ioannidis (PLoS Med 2005), Simmons et al. (Psych Sci 2011), Rothman & Greenland
// "Modern Epidemiology" 3rd ed. 2008, Cook et al. "Cranky Uncle" 2020, and FLICC taxonomy.
// 98 REAL entries produced. Ids 99–100 from the seed were Islamic entries (Tashbih / Ta'til)
// and belong in 100-islamic-fallacies.ts; they are not included here.

export interface ScientificFallacy {
  id: string;
  name: string;
  nameAR: string;
  description: string;
  descriptionAR: string;
  example: string;
  source: string;
}

export const scientificFallacies: ScientificFallacy[] = [
  // ── Statistical fallacies (1–33) ─────────────────────────────────
  {
    id: 'sf-1',
    name: 'P-Hacking',
    nameAR: 'اختراق قيمة p',
    description: 'Manipulating analytical choices — through variable selection, sample trimming, or repeated testing — until the p-value crosses the significance threshold.',
    descriptionAR: 'التلاعب بالخيارات التحليلية حتى تنخفض قيمة p دون عتبة الدلالة.',
    example: 'Testing 30 covariates and reporting only the subgroup analysis that reached p < 0.05.',
    source: 'Simmons, Nelson & Simonsohn, "False-Positive Psychology", Psychological Science 2011'
  },
  {
    id: 'sf-2',
    name: 'HARKing',
    nameAR: 'صياغة الفرضية بعد الاطلاع على النتائج',
    description: 'Presenting hypotheses generated after examining the data as if they were pre-specified before data collection.',
    descriptionAR: 'تقديم فرضيات تولّدت بعد تحليل البيانات على أنها كانت محددة مسبقًا.',
    example: 'Observing a pattern in data and then writing the paper as if that pattern was the original research question.',
    source: 'Kerr, "HARKing", Personality and Social Psychology Review 1998'
  },
  {
    id: 'sf-3',
    name: 'Garden-of-Forking-Paths',
    nameAR: 'حديقة المسارات المتشعبة',
    description: 'The inflated false-positive rate arising from undisclosed analyst degrees of freedom — the many plausible but unreported analytical variants tried.',
    descriptionAR: 'معدل الإيجابيات الكاذبة المرتفع الناتج عن درجات حرية غير مُفصَح عنها في التحليل.',
    example: 'An analysis reaches significance partly because the researcher unconsciously chose among many defensible model specifications.',
    source: 'Gelman & Loken, "The Statistical Crisis in Science", American Scientist 2014'
  },
  {
    id: 'sf-4',
    name: 'Multiple Comparisons Without Correction',
    nameAR: 'مقارنات متعددة دون تصحيح',
    description: 'Testing many hypotheses simultaneously at the same α level without applying a family-wise or false discovery rate correction.',
    descriptionAR: 'اختبار فرضيات متعددة دون تعديل مستوى الدلالة للعائلة.',
    example: 'Comparing 20 outcomes between groups without Bonferroni or FDR adjustment, expecting roughly one false positive.',
    source: 'Dunn, "Multiple Comparisons Among Means", JASA 1961; Benjamini & Hochberg, JRSS 1995'
  },
  {
    id: 'sf-5',
    name: 'Regression to the Mean',
    nameAR: 'الانحدار نحو المتوسط',
    description: 'Attributing a treatment effect to a change that is actually the natural statistical tendency of extreme measurements to move toward the population average on retest.',
    descriptionAR: 'إسناد تحسن إلى علاج بينما هو في الحقيقة ميل إحصائي طبيعي للقيم المتطرفة.',
    example: 'Patients chosen because their condition was worst show improvement at follow-up; improvement credited to treatment.',
    source: 'Galton, "Regression Towards Mediocrity", 1886; Bland & Altman, BMJ 1994'
  },
  {
    id: 'sf-6',
    name: "Simpson's Paradox",
    nameAR: 'مفارقة سيمبسون',
    description: 'An aggregate trend that reverses when data are stratified by a confounding variable, producing misleading conclusions from undifferentiated totals.',
    descriptionAR: 'اتجاه إجمالي ينعكس عند تقسيم البيانات حسب متغير مُربِك.',
    example: 'A treatment appears effective overall, but is less effective than the control in every subgroup when analyzed separately.',
    source: 'Simpson, "The interpretation of interaction in contingency tables", JRSS 1951'
  },
  {
    id: 'sf-7',
    name: 'Ecological Fallacy',
    nameAR: 'المغالطة البيئية',
    description: 'Drawing conclusions about individuals from group-level aggregate data.',
    descriptionAR: 'استنتاج صفات أفراد من بيانات إجمالية على مستوى المجموعات.',
    example: 'Regions with higher average income have lower disease rates; concluding that wealthy individuals within those regions have lower risk.',
    source: 'Robinson, "Ecological Correlations and the Behavior of Individuals", American Sociological Review 1950'
  },
  {
    id: 'sf-8',
    name: 'Atomistic Fallacy',
    nameAR: 'المغالطة الذرية',
    description: 'Drawing conclusions about groups or higher-level structures solely from individual-level data, ignoring emergent group phenomena.',
    descriptionAR: 'استنتاج صفات المجموعات من بيانات الأفراد فحسب متجاهلًا الظواهر الجماعية.',
    example: 'Studying individual financial decisions to draw policy conclusions about market-level dynamics.',
    source: 'Schwartz, "The Fallacy of the Ecological Fallacy", AJPH 1994'
  },
  {
    id: 'sf-9',
    name: 'Survivorship Bias',
    nameAR: 'تحيز الناجين',
    description: 'Analyzing only cases that passed a selection filter, ignoring eliminated cases, producing an unrepresentative view.',
    descriptionAR: 'تحليل الحالات التي اجتازت عملية انتقاء فحسب دون مراعاة الحالات المستبعدة.',
    example: 'Studying only successful ventures to identify success factors, while ignoring failed ventures with similar characteristics.',
    source: 'Wald, "A Method of Estimating Plane Vulnerability", 1943; Taleb, "The Black Swan", 2007'
  },
  {
    id: 'sf-10',
    name: 'Selection Bias',
    nameAR: 'تحيز الانتقاء',
    description: 'Systematic distortion caused by a non-random selection mechanism that makes the study sample unrepresentative of the target population.',
    descriptionAR: 'تشويه منهجي ناتج عن آلية انتقاء غير عشوائية تجعل العينة غير ممثلة للمجتمع.',
    example: 'Using only volunteers for a clinical trial in a condition where those willing to volunteer differ systematically from non-volunteers.',
    source: 'Rothman & Greenland, "Modern Epidemiology", 3rd ed., 2008'
  },
  {
    id: 'sf-11',
    name: 'Sampling Bias',
    nameAR: 'تحيز العينة',
    description: 'A subset of sampling bias where the method of drawing samples systematically over- or under-represents certain population segments.',
    descriptionAR: 'نوع من تحيز الانتقاء يجعل طريقة أخذ العينات تُمثِّل بعض شرائح المجتمع أكثر أو أقل من الواقع.',
    example: 'Telephone surveys in an era when only affluent households had landlines over-represent affluent respondents.',
    source: 'Rothman & Greenland, "Modern Epidemiology", 3rd ed., 2008'
  },
  {
    id: 'sf-12',
    name: 'Volunteer Bias',
    nameAR: 'تحيز المتطوعين',
    description: 'The systematic difference between those who volunteer for a study and the general population, limiting generalizability.',
    descriptionAR: 'الفرق المنهجي بين المتطوعين للمشاركة في دراسة والمجتمع العام، مما يُقيِّد التعميم.',
    example: 'Health-conscious individuals tend to volunteer for wellness studies, making outcomes appear better than population-wide rates.',
    source: 'Rothman & Greenland, "Modern Epidemiology", 3rd ed., 2008'
  },
  {
    id: 'sf-13',
    name: 'Publication Bias',
    nameAR: 'تحيز النشر',
    description: 'The distortion of the available literature caused by the selective publication of positive or significant results over null or negative ones.',
    descriptionAR: 'تشوه الأدبيات المتاحة بسبب ميل النشر للنتائج الإيجابية.',
    example: 'A meta-analysis of all registered trials reveals that the published literature overstates an effect because null results were not published.',
    source: 'Dickersin, "The Existence of Publication Bias", JAMA 1990'
  },
  {
    id: 'sf-14',
    name: 'Funnel-Plot Asymmetry Ignored',
    nameAR: 'تجاهل عدم تناظر قمع التوزيع',
    description: 'Failure to assess or report publication bias in a meta-analysis using funnel-plot or statistical tests for small-study effects.',
    descriptionAR: 'إغفال تقييم تحيز النشر في التحليل التجميعي.',
    example: 'A meta-analysis pools data without checking for the characteristic funnel asymmetry that signals missing small null studies.',
    source: 'Egger et al., "Bias in meta-analysis detected by a simple, graphical test", BMJ 1997'
  },
  {
    id: 'sf-15',
    name: 'Effect-Size Omission',
    nameAR: 'إهمال حجم الأثر',
    description: 'Reporting statistical significance without reporting the magnitude of the effect, making practical importance impossible to judge.',
    descriptionAR: 'الاكتفاء بالإبلاغ عن الدلالة الإحصائية دون ذكر حجم الأثر.',
    example: 'A study reports p < 0.001 for a difference that translates to a fraction of a point on a clinical scale.',
    source: 'Cohen, "Statistical Power Analysis for the Behavioral Sciences", 2nd ed. 1988'
  },
  {
    id: 'sf-16',
    name: 'Confidence Interval Misreading',
    nameAR: 'قراءة خاطئة لفترة الثقة',
    description: 'Treating a 95% CI as the range within which the true value lies with 95% probability rather than as a statement about a repeated-sampling procedure.',
    descriptionAR: 'تفسير فترة الثقة 95% على أنها تحتوي على القيمة الحقيقية بهذا الاحتمال.',
    example: 'Claiming that the true population mean is "95% likely to be" inside a particular computed interval.',
    source: 'Morey et al., "The Fallacy of Placing Confidence in Confidence Intervals", Psychonomic Bulletin & Review 2016'
  },
  {
    id: 'sf-17',
    name: 'Statistical Significance Misuse',
    nameAR: 'إساءة استخدام الدلالة الإحصائية',
    description: 'Treating a p-value threshold as proof of truth, clinical importance, or replicability rather than as a tool for controlling long-run Type I error rates.',
    descriptionAR: 'التعامل مع عتبة قيمة p كدليل على الصحة أو الأهمية.',
    example: 'A result with p = 0.049 described as "scientifically proven" while a result with p = 0.051 is dismissed.',
    source: 'Wasserstein & Lazar, "The ASA statement on p-values", The American Statistician 2016'
  },
  {
    id: 'sf-18',
    name: 'Bayes-Factor Misuse',
    nameAR: 'إساءة استخدام عامل بايز',
    description: 'Misinterpreting Bayes factors — e.g., treating BF10 > 3 as strong evidence without acknowledging prior sensitivity.',
    descriptionAR: 'سوء تفسير عوامل بايز دون مراعاة الحساسية للنموذج المسبق.',
    example: 'Reporting a Bayes factor as definitive without disclosing that the conclusion changes with a different prior.',
    source: 'Dienes, "Using Bayes to get the most out of non-significant results", Frontiers in Psychology 2014'
  },
  {
    id: 'sf-19',
    name: 'Likelihood Ratio Confusion',
    nameAR: 'الخلط في نسبة الإمكانية',
    description: 'Misusing likelihood ratios — treating a ratio of likelihoods as a posterior probability without applying Bayes\' theorem.',
    descriptionAR: 'سوء استخدام نسب الإمكانية بالتعامل معها كاحتمالات خلفية دون تطبيق نظرية بايز.',
    example: 'A diagnostic test likelihood ratio reported as if it directly gave the probability of disease.',
    source: 'Goodman, "Toward Evidence-Based Medical Statistics", Annals of Internal Medicine 1999'
  },
  {
    id: 'sf-20',
    name: 'Prior Misuse',
    nameAR: 'الإفادة الخاطئة من الاحتمال المسبق',
    description: 'Selecting a prior distribution in Bayesian analysis that is implausibly strong or convenient, unduly influencing the posterior to a favored conclusion.',
    descriptionAR: 'اختيار توزيع احتمالي مسبق قوي أو ملائم بشكل غير معقول يوجّه النتيجة.',
    example: 'Choosing an extremely informative prior that guarantees the result favored by the analyst.',
    source: 'Gelman et al., "Bayesian Data Analysis", 3rd ed. 2013'
  },
  {
    id: 'sf-21',
    name: 'Frequentist–Bayesian Conflation',
    nameAR: 'الخلط بين التكراري والبايزي',
    description: 'Mixing frequentist concepts (p-values, confidence intervals) with Bayesian concepts (posterior probability, credible intervals) in ways that are statistically incoherent.',
    descriptionAR: 'خلط المفاهيم التكرارية مع البايزية بطرق غير متسقة إحصائيًا.',
    example: 'Describing a p-value as "the probability the null hypothesis is true".',
    source: 'Goodman, "Toward Evidence-Based Medical Statistics", Annals of Internal Medicine 1999'
  },
  {
    id: 'sf-22',
    name: 'Stopping-Rule Manipulation',
    nameAR: 'التلاعب بقاعدة الإيقاف',
    description: 'Failing to pre-specify the stopping rule for data collection, allowing the analyst to stop when a desired result is achieved.',
    descriptionAR: 'عدم تحديد قاعدة الإيقاف مسبقًا لجمع البيانات، مما يتيح التوقف عند تحقق النتيجة المرغوبة.',
    example: 'Collecting data and testing after each participant until p < 0.05 is reached, then stopping.',
    source: 'Simmons et al., "False-Positive Psychology", Psychological Science 2011'
  },
  {
    id: 'sf-23',
    name: 'Optional Stopping (Sequential Testing)',
    nameAR: 'الإيقاف الاختياري',
    description: 'Testing at multiple interim points without a valid sequential testing procedure, inflating the Type I error rate.',
    descriptionAR: 'إجراء اختبارات متوسطة متعددة دون إجراء اختبار متسلسل صحيح، مما يُضخم معدل الخطأ.',
    example: 'Examining results at 50, 100, and 200 participants without adjusting α for the multiple looks.',
    source: 'Armitage, McPherson & Rowe, "Repeated significance tests on accumulating data", JRSS 1969'
  },
  {
    id: 'sf-24',
    name: "Researcher Degrees of Freedom (Hidden)",
    nameAR: 'درجات حرية الباحث الخفية',
    description: 'The undisclosed latitude researchers have in data collection and analysis that inflates the false-positive rate even without conscious dishonesty.',
    descriptionAR: 'الخيارات غير المُفصَح عنها المتاحة للباحث في التحليل والتي تُضخم النتائج الكاذبة.',
    example: 'Choosing covariate inclusion, outlier exclusion, and dependent-variable operationalization after seeing the data.',
    source: 'Simmons et al., "False-Positive Psychology", Psychological Science 2011'
  },
  {
    id: 'sf-25',
    name: 'Ad Hoc Outlier Exclusion',
    nameAR: 'استبعاد المتطرفات بعد الوقائع',
    description: 'Removing outliers post-hoc without a pre-specified rule, in a manner that improves the desired result.',
    descriptionAR: 'استبعاد القيم الشاذة بعد رؤية البيانات دون قاعدة محددة مسبقًا.',
    example: 'Removing three data points that push the result below significance and reporting results without them.',
    source: 'Simmons et al., "False-Positive Psychology", Psychological Science 2011'
  },
  {
    id: 'sf-26',
    name: 'Data Dredging',
    nameAR: 'التنقيب في البيانات',
    description: 'Exhaustively searching a dataset for any statistically significant pattern without a prior hypothesis, treating discovered patterns as confirmatory findings.',
    descriptionAR: 'البحث المنهجي عن أي نمط ذي دلالة في مجموعة بيانات دون فرضية مسبقة.',
    example: 'Testing all pairwise correlations in a large dataset and reporting the significant ones as discoveries.',
    source: 'Ioannidis, "Why Most Published Research Findings Are False", PLoS Medicine 2005'
  },
  {
    id: 'sf-27',
    name: 'Multiple-Imputation Misuse',
    nameAR: 'إساءة استخدام التضمين المتعدد',
    description: 'Applying multiple imputation to handle missing data without meeting its assumptions, or using single imputation and treating results as if variance were fully accounted for.',
    descriptionAR: 'تطبيق التضمين المتعدد دون استيفاء افتراضاته، أو استخدام التضمين المفرد كأنه كافٍ.',
    example: 'Imputing missing outcome data using a method that violates the missing-at-random assumption without sensitivity analysis.',
    source: 'Sterne et al., "Multiple imputation for missing data in epidemiological and clinical research", BMJ 2009'
  },
  {
    id: 'sf-28',
    name: 'Missing Data Mechanism Ignored',
    nameAR: 'إهمال آلية البيانات المفقودة',
    description: 'Assuming data are missing completely at random (MCAR) and using complete-case analysis when data are missing at random (MAR) or not at random (MNAR).',
    descriptionAR: 'افتراض أن البيانات مفقودة عشوائيًا تامًا واستخدام تحليل الحالات الكاملة فحسب.',
    example: 'Analyzing only participants who completed all follow-up visits while drop-outs are non-randomly distributed by severity.',
    source: 'Little & Rubin, "Statistical Analysis with Missing Data", 2nd ed. 2002'
  },
  {
    id: 'sf-29',
    name: 'ITT/PP Confusion',
    nameAR: 'الخلط بين تحليل القصد بالعلاج وبروتوكول المشاركين',
    description: 'Conflating intention-to-treat (ITT) and per-protocol (PP) analyses, or using PP analysis without reporting ITT, producing biased efficacy estimates.',
    descriptionAR: 'الخلط بين تحليل القصد بالعلاج وتحليل بروتوكول المشاركين أو الاقتصار على الأخير.',
    example: 'A trial reports only per-protocol results that exclude non-adherers, overstating the treatment benefit.',
    source: 'Hollis & Campbell, "What is meant by intention to treat analysis?", BMJ 1999'
  },
  {
    id: 'sf-30',
    name: 'Subgroup Fishing',
    nameAR: 'الصيد في المجموعات الفرعية',
    description: 'Testing many subgroup hypotheses without correction and reporting only the subgroup showing a significant effect as if it were a pre-specified finding.',
    descriptionAR: 'اختبار مجموعات فرعية عديدة دون تصحيح والإبلاغ فقط عن المجموعة ذات الدلالة.',
    example: 'Testing treatment effects in 12 subgroups and reporting the one that is significant as a primary finding.',
    source: 'Rothwell, "Subgroup analysis in randomised controlled trials: importance, indications, and interpretation", Lancet 2005'
  },
  {
    id: 'sf-31',
    name: 'Garden-Path Interaction',
    nameAR: 'التفاعل المضلل',
    description: 'Post-hoc identification and reporting of an interaction term in a model that was not pre-specified, treating it as a confirmatory finding.',
    descriptionAR: 'تحديد حدِّ تفاعل في النموذج بعد الوقائع والإبلاغ عنه كنتيجة مؤكِّدة.',
    example: 'After a null overall result, searching for any interaction with demographic variables and reporting the first that is significant.',
    source: 'Gelman & Loken, "The Statistical Crisis in Science", American Scientist 2014'
  },
  {
    id: 'sf-32',
    name: 'Confounding Ignored',
    nameAR: 'إهمال المُربِك',
    description: 'Failing to measure, control for, or acknowledge a third variable that is associated with both the exposure and the outcome, producing a spurious association.',
    descriptionAR: 'إغفال قياس أو ضبط متغير ثالث مرتبط بكل من العرض والنتيجة.',
    example: 'Finding a correlation between two variables and attributing causation without controlling for obvious confounders.',
    source: 'Rothman & Greenland, "Modern Epidemiology", 3rd ed., 2008'
  },
  {
    id: 'sf-33',
    name: 'Collider Bias',
    nameAR: 'تحيز الجامع',
    description: 'Conditioning on a common effect (collider) of two variables, which induces a spurious association between them even when they are independent.',
    descriptionAR: 'التكييف على متغير هو أثر مشترك لمتغيرين، مما يُنشئ ارتباطًا وهميًا بينهما.',
    example: 'Studying only hospitalized patients when both the exposure and a competing illness cause hospitalization, creating a spurious negative correlation.',
    source: 'Hernán, Hernández-Díaz & Robins, "A structural approach to selection bias", Epidemiology 2004'
  },
  // ── Methodological fallacies (34–68) ─────────────────────────────
  {
    id: 'sf-34',
    name: 'Lack of Randomisation',
    nameAR: 'غياب العشوائية',
    description: 'Using a non-randomised design and drawing causal conclusions as if randomisation had controlled for all confounders.',
    descriptionAR: 'استخدام تصميم غير عشوائي واستخلاص استنتاجات سببية.',
    example: 'Comparing groups formed by self-selection and attributing differences to the intervention.',
    source: 'Cochrane Handbook for Systematic Reviews of Interventions, v6 (Higgins et al., 2022)'
  },
  {
    id: 'sf-35',
    name: 'Lack of Blinding',
    nameAR: 'غياب التعمية',
    description: 'Failing to blind participants, assessors, or analysts in a trial where knowledge of group assignment can influence outcomes or measurements.',
    descriptionAR: 'إغفال تعمية المشاركين أو المقيِّمين في تجربة حيث المعرفة بالمجموعة تؤثر على النتائج.',
    example: 'Outcome assessors who know which group participants are in rate outcomes more favorably for the treatment group.',
    source: 'Cochrane Handbook for Systematic Reviews, v6'
  },
  {
    id: 'sf-36',
    name: 'Hawthorne Effect Ignored',
    nameAR: 'تجاهل أثر هوثورن',
    description: 'Failing to account for the tendency of people to change behavior because they know they are being observed, which can inflate apparent treatment effects.',
    descriptionAR: 'إغفال ميل الناس لتغيير سلوكهم لمعرفتهم بأنهم تحت المراقبة.',
    example: 'Participants in a monitored health program improve simply because of monitoring, not because of the program content.',
    source: 'Adair, "The Hawthorne Effect: A Reconsideration", Journal of Applied Psychology 1984'
  },
  {
    id: 'sf-37',
    name: 'Allocation Concealment Failure',
    nameAR: 'إخفاق إخفاء التخصيص',
    description: 'Failure to conceal the random allocation sequence from those who enroll participants, allowing them to predict group assignment and introduce selection bias.',
    descriptionAR: 'إخفاق في إخفاء تسلسل التخصيص العشوائي عمّن يُسجِّلون المشاركين.',
    example: 'An open allocation sequence allows recruiters to delay enrolling patients they prefer to steer to a specific arm.',
    source: 'Cochrane Handbook for Systematic Reviews, v6'
  },
  {
    id: 'sf-38',
    name: 'Intention-to-Treat Violation',
    nameAR: 'انتهاك تحليل القصد بالعلاج',
    description: 'Excluding randomised participants from the analysis based on post-randomisation events (e.g., non-compliance), violating the ITT principle.',
    descriptionAR: 'استبعاد مشاركين بعد التعشية من التحليل بسبب أحداث لاحقة.',
    example: 'Excluding non-compliant participants from a drug trial, biasing the result toward apparent efficacy.',
    source: 'Hollis & Campbell, BMJ 1999'
  },
  {
    id: 'sf-39',
    name: 'Per-Protocol Cherry-Pick',
    nameAR: 'انتقائية تحليل البروتوكول',
    description: 'Reporting per-protocol analysis without ITT analysis when per-protocol results are more favorable, selectively presenting evidence.',
    descriptionAR: 'الإبلاغ عن تحليل البروتوكول فحسب عند كونه أفضل من تحليل القصد بالعلاج.',
    example: 'Publishing the per-protocol result with a 30% efficacy improvement while the ITT result is near-null.',
    source: 'Hollis & Campbell, BMJ 1999'
  },
  {
    id: 'sf-40',
    name: 'Endpoint Switching',
    nameAR: 'تبديل نقاط النهاية',
    description: 'Changing the primary outcome after seeing the data, or reporting a secondary outcome as if it were the primary, to obtain a significant result.',
    descriptionAR: 'تغيير النتيجة الأولية بعد الاطلاع على البيانات أو الإبلاغ عن نتيجة ثانوية كأنها أولية.',
    example: 'A trial pre-registered with mortality as primary endpoint reports a quality-of-life secondary endpoint when mortality is non-significant.',
    source: 'Chan et al., "Outcome reporting bias in randomized trials", JAMA 2004'
  },
  {
    id: 'sf-41',
    name: 'Surrogate Endpoint Overreach',
    nameAR: 'المبالغة في تفسير نقطة النهاية الوكيلة',
    description: 'Treating improvement in a biomarker (surrogate endpoint) as equivalent to an improvement in the clinical outcome it is meant to represent.',
    descriptionAR: 'التعامل مع تحسن مؤشر بيولوجي كأنه تحسن في النتيجة السريرية ذاتها.',
    example: 'A drug lowers a laboratory marker significantly; concluding it reduces clinical disease events.',
    source: 'Fleming & DeMets, "Surrogate End Points in Clinical Trials", Annals of Internal Medicine 1996'
  },
  {
    id: 'sf-42',
    name: 'Composite Endpoint Dilution',
    nameAR: 'تخفيف نقطة النهاية المركبة',
    description: 'Combining outcomes of very different clinical importance into a composite endpoint, so that effects on minor components can mask null effects on major ones.',
    descriptionAR: 'دمج نتائج ذات أهمية سريرية متباينة في نقطة نهاية مركبة.',
    example: 'A composite of death, hospitalization, and clinic visit shows significance driven entirely by the clinic-visit component.',
    source: 'Montori et al., "Validity of composite end points in randomized controlled trials", BMJ 2005'
  },
  {
    id: 'sf-43',
    name: 'Pseudo-Replication',
    nameAR: 'التكرار الزائف',
    description: 'Treating non-independent observations as independent replicates, inflating apparent sample size and statistical power.',
    descriptionAR: 'التعامل مع ملاحظات غير مستقلة كأنها تكرارات مستقلة.',
    example: 'Treating multiple measurements from the same biological specimen as independent data points.',
    source: 'Hurlbert, "Pseudoreplication and the Design of Ecological Field Experiments", Ecological Monographs 1984'
  },
  {
    id: 'sf-44',
    name: 'Non-Independence Violated',
    nameAR: 'انتهاك الاستقلالية',
    description: 'Applying statistical tests that assume independence to clustered or nested data, underestimating standard errors.',
    descriptionAR: 'تطبيق اختبارات تفترض الاستقلالية على بيانات مجمَّعة أو متداخلة.',
    example: 'Analyzing students nested within classrooms without accounting for classroom-level clustering.',
    source: 'Murray, "Design and analysis of community trials", American Journal of Public Health 1998'
  },
  {
    id: 'sf-45',
    name: 'Generalisation Beyond Sample',
    nameAR: 'التعميم خارج العينة',
    description: 'Extending study conclusions to populations, settings, or time periods not represented in the sample.',
    descriptionAR: 'تمديد نتائج الدراسة إلى مجتمعات أو بيئات أو فترات زمنية لا تمثلها العينة.',
    example: 'A study conducted on university students is used to make claims about the general adult population.',
    source: 'Rothman & Greenland, "Modern Epidemiology", 3rd ed., 2008'
  },
  {
    id: 'sf-46',
    name: 'Lack of Replication',
    nameAR: 'غياب التكرار',
    description: 'Treating a single study as sufficient proof of a phenomenon without independent replication.',
    descriptionAR: 'التعامل مع دراسة واحدة كدليل كافٍ على ظاهرة ما دون تكرار مستقل.',
    example: 'A single positive study is widely cited as establishing a fact without noting that several replications failed.',
    source: 'Open Science Collaboration, "Estimating the reproducibility of psychological science", Science 2015'
  },
  {
    id: 'sf-47',
    name: 'Underpowered Study',
    nameAR: 'الدراسة ضعيفة الحساسية',
    description: 'Conducting a study with insufficient statistical power to reliably detect the effect of interest, making null results uninformative and positive results unreliable.',
    descriptionAR: 'إجراء دراسة ذات قدرة إحصائية غير كافية لاكتشاف الأثر المطلوب.',
    example: 'A clinical trial with only 20 participants per arm is described as showing "no significant effect", implying no effect exists.',
    source: 'Button et al., "Power failure: why small sample size undermines the reliability of neuroscience", Nature Reviews Neuroscience 2013'
  },
  {
    id: 'sf-48',
    name: 'Over-Powered Nuisance Significance',
    nameAR: 'الدلالة الزائفة بسبب فرط القدرة',
    description: 'In very large samples, trivially small and clinically irrelevant differences reach statistical significance, misleading readers about practical importance.',
    descriptionAR: 'في العينات الكبيرة جدًا، تصل الفوارق البالغة الصغر إلى الدلالة الإحصائية مُضلِّلةً القراء.',
    example: 'A survey of millions finds a statistically significant but practically negligible 0.1-point difference on a 100-point scale.',
    source: 'Cohen, "Statistical Power Analysis", 1988; Wasserstein & Lazar, The American Statistician 2016'
  },
  {
    id: 'sf-49',
    name: 'Multiple Testing Within-Family',
    nameAR: 'الاختبارات المتعددة داخل العائلة',
    description: 'Testing multiple endpoints within the same study without family-wise error correction, inflating the chance of at least one false positive.',
    descriptionAR: 'اختبار نقاط نهاية متعددة ضمن نفس الدراسة دون تصحيح للخطأ العائلي.',
    example: 'A trial assessing five outcomes without a pre-specified primary outcome or correction for multiple comparisons.',
    source: 'Hochberg & Tamhane, "Multiple Comparison Procedures", 1987'
  },
  {
    id: 'sf-50',
    name: 'Multiple Testing Across-Family',
    nameAR: 'الاختبارات المتعددة عبر العائلات',
    description: 'Performing significance tests across multiple independent studies or datasets and selecting favorable results without accounting for cross-family inflation.',
    descriptionAR: 'إجراء اختبارات الدلالة عبر دراسات متعددة مستقلة مع انتقاء النتائج المواتية.',
    example: 'Running the same analysis on ten different cohorts and reporting only the cohort with p < 0.05.',
    source: 'Ioannidis, "Why Most Published Research Findings Are False", PLoS Medicine 2005'
  },
  {
    id: 'sf-51',
    name: 'Post-Hoc Stratification',
    nameAR: 'التقسيم الطبقي بأثر رجعي',
    description: 'Dividing data into subgroups after observing the data to find a group in which the effect is significant, without pre-specification.',
    descriptionAR: 'تقسيم البيانات إلى مجموعات فرعية بعد رؤيتها للعثور على مجموعة ذات دلالة.',
    example: 'After a null overall result, stratifying by age and reporting the subgroup where the result is significant.',
    source: 'Rothwell, Lancet 2005'
  },
  {
    id: 'sf-52',
    name: 'Post-Hoc Matching',
    nameAR: 'المطابقة بأثر رجعي',
    description: 'Matching comparison groups on observed characteristics after seeing outcomes, in a way that introduces new bias.',
    descriptionAR: 'مطابقة مجموعات المقارنة على الخصائص الملحوظة بعد رؤية النتائج.',
    example: 'Matching treated and untreated individuals on covariates selected because they improve the desired result rather than for causal reasons.',
    source: 'Rosenbaum & Rubin, "The central role of the propensity score", Biometrika 1983'
  },
  {
    id: 'sf-53',
    name: 'Causal Language in Observational Data',
    nameAR: 'لغة سببية في بيانات رصدية',
    description: 'Using causal verbs ("reduces", "causes", "leads to") when describing results from observational studies that cannot establish causation.',
    descriptionAR: 'استخدام أفعال سببية عند وصف نتائج دراسات رصدية لا تستطيع إثبات العلية.',
    example: 'An observational study reports "consumption of X causes a 20% reduction in risk" without experimental evidence.',
    source: 'Hernán, "The C-Word: Scientific Euphemisms Do Not Improve Causal Inference", AJPH 2018'
  },
  {
    id: 'sf-54',
    name: 'Reverse Causation Ignored',
    nameAR: 'إهمال العلية العكسية',
    description: 'Assuming that the exposure caused the outcome when the outcome may have caused or preceded the exposure.',
    descriptionAR: 'افتراض أن العرض تسبب في النتيجة بينما قد تكون النتيجة هي التي سببت العرض.',
    example: 'People who exercise more have better mental health; concluding exercise improves mental health without ruling out that mentally healthier people exercise more.',
    source: 'Rothman & Greenland, "Modern Epidemiology", 3rd ed., 2008'
  },
  {
    id: 'sf-55',
    name: 'Mediator–Moderator Confusion',
    nameAR: 'الخلط بين الوسيط والمُعدِّل',
    description: 'Treating a variable that lies on the causal pathway (mediator) as a confounder to be controlled for, or confusing moderation with mediation.',
    descriptionAR: 'التعامل مع متغير يقع على المسار السببي كما لو كان مُربِكًا أو الخلط بين الوساطة والتعديل.',
    example: 'Controlling for a mediating variable that explains the effect, thereby eliminating the causal signal.',
    source: 'Baron & Kenny, "The Moderator-Mediator Variable Distinction", JPSP 1986'
  },
  {
    id: 'sf-56',
    name: 'Lurking Variable',
    nameAR: 'المتغير المتربص',
    description: 'An unmeasured variable that drives a spurious association between two measured variables.',
    descriptionAR: 'متغير غير مقيس يُحدث ارتباطًا وهميًا بين متغيرين مقيسين.',
    example: 'Ice cream sales correlate with drowning rates; the lurking variable is summer temperature driving both.',
    source: 'Freedman, Pisani & Purves, "Statistics", 4th ed. 2007'
  },
  {
    id: 'sf-57',
    name: 'Conditioning on a Collider',
    nameAR: 'الاشتراط على الجامع',
    description: 'Introducing bias by including a collider variable in regression or by restricting the sample to a level of a collider.',
    descriptionAR: 'إدخال تحيز بإدراج متغير جامع في الانحدار أو تقييد العينة إلى مستواه.',
    example: 'Studying a disease only in hospitalized patients when both the exposure and a competing cause of hospitalization are colliders.',
    source: 'Hernán et al., "A structural approach to selection bias", Epidemiology 2004'
  },
  {
    id: 'sf-58',
    name: "Berkson's Paradox",
    nameAR: 'مفارقة بيركسون',
    description: 'A form of selection bias in hospital-based studies where two conditions appear negatively correlated in hospital patients even when they are unrelated in the general population.',
    descriptionAR: 'نوع من تحيز الاختيار في الدراسات المستشفوية حيث يبدو حالتان مترابطتان سلبًا رغم كونهما مستقلتين.',
    example: 'Two diseases appear negatively correlated among hospitalized patients because having either makes hospitalization more likely.',
    source: 'Berkson, "Limitations of the Application of Fourfold Table Analysis", Biometrics 1946'
  },
  {
    id: 'sf-59',
    name: "Lord's Paradox",
    nameAR: 'مفارقة لورد',
    description: 'Two equally valid analytical approaches (ANCOVA vs. change-score analysis) give conflicting conclusions because they answer subtly different causal questions.',
    descriptionAR: 'نهجان تحليليان صحيحان يعطيان استنتاجات متعارضة لأنهما يجيبان على أسئلة سببية مختلفة.',
    example: 'An analysis of pre-post data on two groups reaches opposite conclusions depending on whether change scores or ANCOVA is used.',
    source: 'Lord, "A paradox in the interpretation of group comparisons", Psychological Bulletin 1967'
  },
  {
    id: 'sf-60',
    name: 'Mendelian Randomisation Misuse',
    nameAR: 'إساءة استخدام التوزيع العشوائي المندلي',
    description: 'Applying Mendelian randomisation without verifying its core assumptions (relevance, independence, exclusion restriction), drawing invalid causal conclusions.',
    descriptionAR: 'تطبيق التوزيع العشوائي المندلي دون التحقق من افتراضاته الأساسية.',
    example: 'Using a genetic instrument that has pleiotropic effects as if it exclusively affects the exposure of interest.',
    source: 'Lawlor et al., "Mendelian randomization: Using genes as instruments", Statistics in Medicine 2008'
  },
  {
    id: 'sf-61',
    name: 'Instrumental Variable Invalid',
    nameAR: 'متغير أداتي غير صالح',
    description: 'Using an instrument that violates one or more of the IV assumptions — particularly the exclusion restriction — biasing the causal estimate.',
    descriptionAR: 'استخدام متغير أداتي ينتهك أحد افتراضاته الأساسية.',
    example: 'Using a variable as an instrument that directly affects the outcome through a pathway other than the exposure.',
    source: 'Angrist & Pischke, "Mostly Harmless Econometrics", 2009'
  },
  {
    id: 'sf-62',
    name: 'Difference-in-Differences Parallel Trends Violated',
    nameAR: 'انتهاك افتراض الاتجاهات المتوازية في الفوارق في الفوارق',
    description: 'Applying difference-in-differences without validating the parallel pre-treatment trends assumption, invalidating the causal estimate.',
    descriptionAR: 'تطبيق أسلوب الفوارق في الفوارق دون التحقق من افتراض الاتجاهات المتوازية.',
    example: 'Treatment and control groups had diverging pre-treatment trends, making the DiD estimate uninterpretable causally.',
    source: 'Angrist & Pischke, "Mostly Harmless Econometrics", 2009'
  },
  {
    id: 'sf-63',
    name: 'RDD Bandwidth Shopping',
    nameAR: 'تسوق عرض النطاق في تصميم انقطاع الانحدار',
    description: 'Selecting the bandwidth in a regression discontinuity design post-hoc to achieve a desired result rather than using principled selection.',
    descriptionAR: 'اختيار عرض النطاق في تصميم انقطاع الانحدار بأثر رجعي لتحقيق نتيجة مرغوبة.',
    example: 'Trying multiple bandwidth choices and reporting only the one that gives a significant discontinuity estimate.',
    source: 'Cattaneo, Idrobo & Titiunik, "A Practical Introduction to Regression Discontinuity Designs", 2020'
  },
  {
    id: 'sf-64',
    name: 'Synthetic Control Mis-Specified',
    nameAR: 'التحكم الاصطناعي مسيء التحديد',
    description: 'Constructing a synthetic control unit from donor pools that do not match the pre-treatment outcome trajectory, invalidating counterfactual inference.',
    descriptionAR: 'بناء وحدة تحكم اصطناعية من مجموعات لا تتطابق مع مسار النتيجة قبل العلاج.',
    example: 'Using a synthetic control whose pre-treatment trends diverge substantially from the treated unit\'s trends.',
    source: 'Abadie, Diamond & Hainmueller, "Synthetic Control Methods for Comparative Case Studies", JASA 2010'
  },
  {
    id: 'sf-65',
    name: 'ML Leakage',
    nameAR: 'تسرب التعلم الآلي',
    description: 'Using information from the test set during training (or preprocessing), causing optimistic performance estimates that do not generalise.',
    descriptionAR: 'استخدام معلومات من مجموعة الاختبار أثناء التدريب.',
    example: 'Normalizing features using statistics computed on the full dataset before splitting into train and test sets.',
    source: 'Kaufman et al., "Leakage in Data Mining: Formulation, Detection, and Avoidance", ACM TKDD 2012'
  },
  {
    id: 'sf-66',
    name: 'ML Test/Train Contamination',
    nameAR: 'تلوث مجموعتي الاختبار والتدريب',
    description: 'Overlap between training and test data causing inflated accuracy metrics that are not reflective of real-world performance.',
    descriptionAR: 'التداخل بين بيانات التدريب والاختبار مما يُعطي مقاييس دقة مُضخَّمة.',
    example: 'Including the same time-series observations in both the training and test windows of a time-series forecasting model.',
    source: 'Kaufman et al., ACM TKDD 2012'
  },
  {
    id: 'sf-67',
    name: 'Cross-Validation Leakage',
    nameAR: 'تسرب التحقق المتقاطع',
    description: 'Applying preprocessing or feature selection to the full dataset before cross-validation, causing information from test folds to contaminate training folds.',
    descriptionAR: 'تطبيق المعالجة المسبقة على مجموعة البيانات الكاملة قبل التحقق المتقاطع.',
    example: 'Selecting features using variance thresholds computed on all folds, then cross-validating on the selected features.',
    source: 'Cawley & Talbot, "On Over-fitting in Model Selection and Subsequent Selection Bias in Performance Evaluation", JMLR 2010'
  },
  {
    id: 'sf-68',
    name: 'Hyper-Parameter Peeking',
    nameAR: 'التلصص على المعاملات الفائقة',
    description: 'Selecting model hyper-parameters by evaluating on the test set rather than a held-out validation set, causing overfitting to the test set.',
    descriptionAR: 'اختيار المعاملات الفائقة باستخدام مجموعة الاختبار بدلًا من مجموعة التحقق.',
    example: 'Tuning the regularisation parameter by optimising test-set performance rather than cross-validation performance.',
    source: 'Hastie, Tibshirani & Friedman, "The Elements of Statistical Learning", 2nd ed. 2009'
  },
  // ── Communication & framing (69–98) ─────────────────────────────
  {
    id: 'sf-69',
    name: 'Cherry-Picking Results',
    nameAR: 'انتقاء النتائج',
    description: 'Selectively reporting favorable findings from a study while omitting unfavorable ones.',
    descriptionAR: 'الإبلاغ الانتقائي عن النتائج المواتية مع حجب غيرها.',
    example: 'Reporting the one positive secondary endpoint from a trial whose primary endpoint was null.',
    source: 'Cook et al., "Cranky Uncle vs. Climate Change", 2020 (FLICC: Cherry-Picking)'
  },
  {
    id: 'sf-70',
    name: 'Citation Laundering',
    nameAR: 'غسيل الاستشهادات',
    description: 'Citing a credible secondary source that itself cites a flawed or retracted primary source, laundering the flawed evidence through the credible intermediary.',
    descriptionAR: 'الاستشهاد بمصدر ثانوي موثوق يستشهد بدوره بمصدر أولي معيب أو مسحوب.',
    example: 'Citing a well-regarded review that inadvertently relied on a later-retracted study, inheriting its flawed data.',
    source: 'Ioannidis, PLoS Medicine 2005'
  },
  {
    id: 'sf-71',
    name: 'Predatory Journal Abuse',
    nameAR: 'استغلال مجلات الافتراس',
    description: 'Publishing in a fee-charging journal that lacks genuine peer review, then citing the paper as if it had undergone rigorous scientific scrutiny.',
    descriptionAR: 'النشر في مجلة مفترسة لا تخضع للتحكيم الحقيقي ثم الاستشهاد بها كأنها علم محكَّم.',
    example: 'A claim is supported by citing a paper in a journal that accepted it within 24 hours without peer review.',
    source: 'Beall, "Predatory journals: Ban this publish and pay model", Nature 2012'
  },
  {
    id: 'sf-72',
    name: 'Press-Release Inflation',
    nameAR: 'تضخيم البيان الصحفي',
    description: 'A press release or news coverage that overstates or misrepresents the strength and scope of a study\'s findings.',
    descriptionAR: 'بيان صحفي أو تغطية إعلامية تبالغ في نتائج الدراسة.',
    example: 'A study showing a modest correlation is headlined as "scientists discover the cause of X".',
    source: 'Sumner et al., "The association between exaggeration in health related science news and academic press releases", BMJ 2014'
  },
  {
    id: 'sf-73',
    name: 'Headline Contradicts Abstract',
    nameAR: 'التناقض بين العنوان والملخص',
    description: 'A paper\'s title or headline makes a claim stronger or more definitive than what the abstract and results actually support.',
    descriptionAR: 'يدّعي عنوان الورقة شيئًا أقوى مما تدعمه النتائج الفعلية.',
    example: 'A paper titled "X causes Y" whose results section shows only an observational correlation.',
    source: 'Sumner et al., BMJ 2014'
  },
  {
    id: 'sf-74',
    name: 'Causal Headline from Correlational Study',
    nameAR: 'عنوان سببي من دراسة ارتباطية',
    description: 'Reporting an observational correlation using causal language in the headline, misleading readers about what the study established.',
    descriptionAR: 'تقديم ارتباط رصدي بلغة سببية في العنوان.',
    example: '"Eating X reduces risk of Y by 30%", when the study was a cross-sectional survey unable to establish causation.',
    source: 'Hernán, AJPH 2018'
  },
  {
    id: 'sf-75',
    name: 'Animal-to-Human Extrapolation',
    nameAR: 'التعميم من الحيوان إلى الإنسان',
    description: 'Drawing conclusions about human health from animal model results without acknowledging the substantial translational uncertainty.',
    descriptionAR: 'استخلاص نتائج صحية بشرية من نماذج حيوانية دون الإشارة إلى عدم اليقين الترجمي.',
    example: 'A compound that cures a disease in mice is reported as a potential human cure without clinical data.',
    source: 'Pound et al., "Where is the evidence that animal research benefits humans?", BMJ 2004'
  },
  {
    id: 'sf-76',
    name: 'Cell-Line-to-Organism Extrapolation',
    nameAR: 'التعميم من خط خلوي إلى كائن حي',
    description: 'Drawing clinical conclusions from in vitro cell-line experiments, ignoring pharmacokinetics, systemic effects, and the difference between cells in a dish and cells in a living organism.',
    descriptionAR: 'استخلاص نتائج سريرية من تجارب مختبرية على خطوط خلوية.',
    example: 'A compound that kills cancer cells in a Petri dish is reported as a potential cure without acknowledging the vast gap to clinical translation.',
    source: 'Pound et al., BMJ 2004'
  },
  {
    id: 'sf-77',
    name: 'Mechanism Overreach',
    nameAR: 'المبالغة في تفسير الآلية',
    description: 'Assuming that identifying a plausible biological mechanism is sufficient evidence that an intervention works at the clinical level.',
    descriptionAR: 'الافتراض بأن تحديد آلية بيولوجية محتملة يكفي كدليل على فاعلية التدخل سريريًا.',
    example: 'A substance blocks a known disease pathway in vitro; concluding it must therefore treat the disease clinically.',
    source: 'Fleming & DeMets, Annals of Internal Medicine 1996'
  },
  {
    id: 'sf-78',
    name: 'Dose-Response Misrepresentation',
    nameAR: 'تحريف علاقة الجرعة بالاستجابة',
    description: 'Presenting a dose-response relationship in a misleading way — e.g., showing only part of the curve, using a non-linear scale, or omitting the threshold.',
    descriptionAR: 'تقديم علاقة الجرعة بالاستجابة بطريقة مضللة.',
    example: 'Plotting only the portion of a dose-response curve where the effect increases, omitting the plateau or reversal at higher doses.',
    source: 'Rothman & Greenland, "Modern Epidemiology", 3rd ed., 2008'
  },
  {
    id: 'sf-79',
    name: 'RR vs AR Conflation',
    nameAR: 'الخلط بين الخطر النسبي والخطر المطلق',
    description: 'Reporting relative risk (RR) without absolute risk (AR), making small absolute risk changes appear large and clinically important.',
    descriptionAR: 'الإبلاغ عن الخطر النسبي دون الخطر المطلق.',
    example: 'An intervention "halves the risk" when baseline risk is 0.02%, so absolute reduction is 0.01% — clinically negligible.',
    source: 'Gigerenzer, "How to make cognitive illusions disappear", European Review of Social Psychology 1991'
  },
  {
    id: 'sf-80',
    name: 'Number-Needed-to-Treat Omission',
    nameAR: 'إهمال العدد اللازم للعلاج',
    description: 'Failing to report the NNT, which translates treatment effects into clinically intuitive units, leaving readers unable to judge practical importance.',
    descriptionAR: 'الإغفال عن الإبلاغ عن العدد اللازم لعلاج مريض.',
    example: 'A treatment with a statistically significant effect is described without the NNT of 500, which reveals its very limited clinical utility.',
    source: 'Laupacis, Sackett & Roberts, "An assessment of clinically useful measures of the consequences of treatment", NEJM 1988'
  },
  {
    id: 'sf-81',
    name: 'Absolute vs Relative Risk Swap',
    nameAR: 'الخلط بين الخطر المطلق والنسبي',
    description: 'Presenting the same data as either a large relative risk reduction or a small absolute risk reduction depending on which framing is more persuasive.',
    descriptionAR: 'تقديم نفس البيانات كتخفيض نسبي كبير أو تخفيض مطلق صغير وفق الأنسب إقناعًا.',
    example: 'In one context reporting "50% risk reduction" (relative); in another reporting "1 in 10,000 fewer cases" (absolute) — same finding, different impressions.',
    source: 'Gigerenzer, European Review of Social Psychology 1991'
  },
  {
    id: 'sf-82',
    name: 'Forest Plot Misreading',
    nameAR: 'قراءة خاطئة للمخطط الغابي',
    description: 'Misinterpreting a forest plot — e.g., treating the width of the confidence interval rather than the point estimate as the effect, or misreading the diamond.',
    descriptionAR: 'سوء قراءة المخطط الغابي في التحليل التجميعي.',
    example: 'Reporting a meta-analysis as showing a significant pooled effect when the pooled diamond crosses the null line.',
    source: 'Lewis & Clarke, "Forest plots: trying to see the wood and the trees", BMJ 2001'
  },
  {
    id: 'sf-83',
    name: 'P-Value as Effect Size',
    nameAR: 'قيمة p كحجم أثر',
    description: 'Treating a smaller p-value as indicating a larger or more important effect, when p-values are primarily a function of sample size.',
    descriptionAR: 'التعامل مع قيمة p الأصغر كدليل على أثر أكبر أو أهم.',
    example: 'Ranking treatments by p-value rather than by effect size or NNT.',
    source: 'Wasserstein & Lazar, The American Statistician 2016'
  },
  {
    id: 'sf-84',
    name: 'Eyeballing CI Overlap as Test',
    nameAR: 'تقدير تداخل فترات الثقة بالعين كاختبار',
    description: 'Inferring that two groups do not differ significantly because their confidence intervals overlap (or do differ because they do not), when this visual check is not equivalent to a formal test.',
    descriptionAR: 'الاستنتاج من تداخل فترات الثقة بصريًا كأنه اختبار رسمي.',
    example: 'Concluding two estimates differ because their 95% CIs do not overlap, when the correct test of the difference is non-significant.',
    source: 'Cumming & Finch, "Inference by Eye", American Psychologist 2005'
  },
  {
    id: 'sf-85',
    name: 'Pseudo-Significance',
    nameAR: 'الدلالة الزائفة',
    description: 'A result that appears statistically significant but arises from methodological artifacts (bias, p-hacking, multiple testing) rather than a real effect.',
    descriptionAR: 'نتيجة تبدو ذات دلالة إحصائية لكنها تنشأ عن عيوب منهجية لا عن أثر حقيقي.',
    example: 'A significant p-value that survives initial reporting but collapses in pre-registered replications.',
    source: 'Ioannidis, PLoS Medicine 2005'
  },
  {
    id: 'sf-86',
    name: 'Pseudo-Replication in Figures',
    nameAR: 'التكرار الزائف في الأشكال',
    description: 'Presenting the same data in multiple figure panels or in multiple papers to create the impression of independent replication.',
    descriptionAR: 'عرض نفس البيانات في لوحات أشكال متعددة أو ورقات متعددة لإيحاء بالتكرار المستقل.',
    example: 'Different figure panels in a paper each showing a subset of the same dataset labeled as separate experiments.',
    source: 'Bik et al., "The Prevalence of Inappropriate Image Duplication in Biomedical Research Publications", mBio 2016'
  },
  {
    id: 'sf-87',
    name: 'Image Duplication',
    nameAR: 'تكرار الصورة',
    description: 'Using the same image (micrograph, blot, or figure) to represent different experimental conditions, whether by accident or intent.',
    descriptionAR: 'استخدام الصورة ذاتها لتمثيل حالات تجريبية مختلفة.',
    example: 'The same micrograph image appears in two figures purporting to show results from different treatment groups.',
    source: 'Bik et al., mBio 2016'
  },
  {
    id: 'sf-88',
    name: 'Western Blot Duplication',
    nameAR: 'تكرار التحليل الكهربائي الغربي',
    description: 'Reusing or manipulating Western blot images to misrepresent experimental results, a specific and common form of research misconduct in molecular biology.',
    descriptionAR: 'إعادة استخدام أو تلاعب في صور التحليل الكهربائي الغربي لتحريف النتائج.',
    example: 'A band from one lane is copied and inserted into a different experimental lane to fabricate a result.',
    source: 'Bik et al., mBio 2016'
  },
  {
    id: 'sf-89',
    name: 'Plagiarism by Paraphrase',
    nameAR: 'السرقة الأدبية بإعادة الصياغة',
    description: 'Closely paraphrasing another\'s work without attribution, to circumvent literal plagiarism detection while still presenting others\' ideas as one\'s own.',
    descriptionAR: 'إعادة صياغة عمل الآخرين دون ذكر المصدر.',
    example: 'A manuscript reproduces the structure and key phrases of a prior paper\'s methods section with minor word changes and no citation.',
    source: 'Committee on Publication Ethics (COPE) guidelines'
  },
  {
    id: 'sf-90',
    name: 'Salami-Slicing Publication',
    nameAR: 'تشريح البيانات للنشر',
    description: 'Dividing a single study\'s results into the smallest publishable units to maximize the number of publications, inflating apparent evidence volume.',
    descriptionAR: 'تقسيم نتائج دراسة واحدة إلى أصغر وحدات قابلة للنشر لتضخيم عدد الأوراق.',
    example: 'A clinical trial\'s 12-month and 24-month results published as separate papers without cross-referencing.',
    source: 'COPE guidelines; Rennie & Flanagin, "Authorship! Authorship!", JAMA 1994'
  },
  {
    id: 'sf-91',
    name: 'Self-Citation Cartel',
    nameAR: 'كارتل الاستشهاد الذاتي',
    description: 'Coordinated or excessive self-citation to artificially inflate citation metrics, distorting assessments of research impact.',
    descriptionAR: 'الاستشهاد الذاتي المنسق أو المفرط لتضخيم مؤشرات الاقتباس.',
    example: 'A group of researchers agree to cite each other\'s work regardless of relevance to boost impact factors.',
    source: 'Ioannidis et al., "A standardized citation metrics author database", PLoS Biology 2019'
  },
  {
    id: 'sf-92',
    name: 'Cite-Stacking',
    nameAR: 'تكديس الاستشهادات',
    description: 'Citing a long list of references for a claim when none of them individually strongly supports it, creating a misleading impression of broad evidential support.',
    descriptionAR: 'إدراج قائمة طويلة من المراجع لادعاء مع عدم دعم أي منها له بقوة.',
    example: 'A claim is footnoted with 15 references, none of which directly supports the specific claim being made.',
    source: 'Ioannidis, PLoS Medicine 2005'
  },
  {
    id: 'sf-93',
    name: 'Predatory Conference Laundering',
    nameAR: 'غسيل نتائج عبر مؤتمرات الافتراس',
    description: 'Presenting work at a fee-charging conference with no peer review and then citing the resulting proceedings as a peer-reviewed scientific source.',
    descriptionAR: 'تقديم عمل في مؤتمر مفترس ثم الاستشهاد بوقائعه كمصدر علمي محكَّم.',
    example: 'An unpublished manuscript is presented at a predatory conference and then cited as "conference proceedings" to give it apparent scientific standing.',
    source: 'Beall, Nature 2012'
  },
  {
    id: 'sf-94',
    name: 'Diploma Mill Citation',
    nameAR: 'الاستشهاد بشهادات من مطاحن الدرجات',
    description: 'Citing credentials or theses from unaccredited institutions (diploma mills) as equivalent academic authority to legitimate university degrees.',
    descriptionAR: 'الاستشهاد بشهادات من مؤسسات غير معتمدة كسلطة أكاديمية مكافئة.',
    example: 'A "PhD" from an unaccredited online institution is listed as an academic authority on a health topic.',
    source: 'Cook et al., "Cranky Uncle vs. Climate Change", 2020 (Fake Experts)'
  },
  {
    id: 'sf-95',
    name: 'Retraction Ignored Citation',
    nameAR: 'الاستشهاد بأبحاث مسحوبة',
    description: 'Citing a retracted paper as if it still represents valid scientific evidence, spreading conclusions that have been officially withdrawn.',
    descriptionAR: 'الاستشهاد بورقة بحثية مسحوبة كأنها لا تزال تمثل دليلًا علميًا صحيحًا.',
    example: 'A study on a vaccine-disease link that was retracted for fraud continues to be cited in literature and media.',
    source: 'Retraction Watch; COPE guidelines'
  },
  {
    id: 'sf-96',
    name: 'Preprint Cited as Peer-Reviewed',
    nameAR: 'الاستشهاد بالنسخة الأولية كبحث محكَّم',
    description: 'Presenting a preprint (not yet peer-reviewed) as equivalent to a published, peer-reviewed article.',
    descriptionAR: 'تقديم نسخة ما قبل النشر كما لو كانت مقالة محكَّمة ومنشورة.',
    example: 'Media reports cite a preprint as establishing a fact without noting it has not been peer reviewed or that its conclusions may change.',
    source: 'Fraser et al., "Preprinting the COVID-19 pandemic", bioRxiv 2020'
  },
  {
    id: 'sf-97',
    name: 'Twitter Thread Cited as Study',
    nameAR: 'الاستشهاد بخيط تغريدات كدراسة',
    description: 'Treating a social-media thread, viral post, or blog as equivalent scientific evidence to a peer-reviewed study.',
    descriptionAR: 'التعامل مع منشور على وسائل التواصل أو مدونة كدليل علمي مكافئ لدراسة محكَّمة.',
    example: 'A claim is supported by linking to a Twitter thread rather than to a peer-reviewed publication.',
    source: 'Cook et al., "Cranky Uncle vs. Climate Change", 2020 (Fake Experts)'
  },
  {
    id: 'sf-98',
    name: 'AI-Hallucinated Citation',
    nameAR: 'الاستشهاد بمصادر مولَّدة بالذكاء الاصطناعي',
    description: 'Using a bibliographic reference fabricated by an AI language model — complete with plausible-sounding authors, title, and journal — as if it were a real published paper.',
    descriptionAR: 'استخدام مرجع ببليوغرافي اخترعه نموذج لغوي بالذكاء الاصطناعي كأنه ورقة منشورة فعلًا.',
    example: 'A written argument cites a paper whose details were invented by an AI chatbot; the paper does not exist.',
    source: 'EAL Governing Standard, One Law: no claim without a real resolvable source; Walters, "Fabricated citations", Law Library Journal 2023'
  }
];
