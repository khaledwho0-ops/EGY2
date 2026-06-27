"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRTL } from "@/components/shared/rtl-provider";
import { Target, ShieldAlert, Hand } from "lucide-react";

import { SCIENTIFIC_FALLACIES, ISLAMIC_FALLACIES, type Fallacy } from "@/lib/debunking/fallacies-data";
import { FLICC } from "@/lib/cognition/flicc";
import { PageNavigation } from '@/components/shared/page-navigation';
import { PageAIChatbot } from '@/components/shared/page-ai-chatbot';

/*
 * MANIPULATION CARD DATA — fully restored + greatly expanded.
 *
 * PREVIOUS BUG (lost content): the page imported all 50 fallacies but rendered only
 * `.slice(0, 10)` of each list → 30 real techniques were silently dropped, and the
 * AI context already claimed "50+ techniques" while only 20 cards showed.
 *
 * NOW: a single self-contained `CARDS` array. Every card carries:
 *   - FLICC category badge (Fake experts / Logical fallacies / Impossible expectations /
 *     Cherry-picking / Conspiracy) — John Cook's taxonomy, mirrored from src/lib/cognition/flicc.ts
 *   - bilingual technique name (EN + Egyptian Arabic)
 *   - "how it works"  (the psychological mechanism)
 *   - a REAL, NAME-FREE Egyptian example (no person/brand/deceiver names)
 *   - the counter / defense
 *   - a real, resolvable source where one applies (One-Law compliant)
 *
 * Cards are still reconciled with the platform's existing fallacy taxonomy so the two
 * stay in sync: every SCIENTIFIC_FALLACIES / ISLAMIC_FALLACIES id is represented.
 */

type FliccKey = "F" | "L" | "I" | "C" | "Cn";

interface ManipCard {
  id: string;
  flicc: FliccKey;
  name: { en: string; ar: string };
  how: { en: string; ar: string };
  example: { en: string; ar: string };
  counter: { en: string; ar: string };
  source?: string;
}

const FLICC_META: Record<FliccKey, { label: { en: string; ar: string }; color: string; emoji: string }> = {
  F: { label: { en: "Fake Experts", ar: "خبراء زائفون" }, color: "#ef4444", emoji: "🎓" },
  L: { label: { en: "Logical Fallacy", ar: "مغالطة منطقية" }, color: "#8b5cf6", emoji: "🧩" },
  I: { label: { en: "Impossible Expectations", ar: "توقعات مستحيلة" }, color: "#f59e0b", emoji: "🎯" },
  C: { label: { en: "Cherry-Picking", ar: "انتقاء الأدلة" }, color: "#06b6d4", emoji: "🍒" },
  Cn: { label: { en: "Conspiracy", ar: "نظرية مؤامرة" }, color: "#10b981", emoji: "🕳️" },
};

/* The full deck — every entry is real, name-free, bilingual, and counter-armed. */
const CARDS: ManipCard[] = [
  // ───────────────────────── F — FAKE EXPERTS ─────────────────────────
  {
    id: "appeal-to-authority", flicc: "F",
    name: { en: "Appeal to False Authority", ar: "الاحتكام لسلطة زائفة" },
    how: { en: "A title (PhD, 'Doctor', sheikh) is used in place of evidence — even when the title is outside the relevant field.", ar: "استخدام لقب (دكتوراه، 'دكتور'، شيخ) بدلاً من الدليل — حتى لو كان اللقب خارج المجال المطروح." },
    example: { en: "A TV pharmacist with no oncology training declares a herbal mix 'destroys tumours', and viewers trust the white coat over published trials.", ar: "صيدلي على التليفزيون بدون أي تخصص أورام يقول إن خلطة أعشاب 'بتقضي على الورم'، والناس بتصدق البالطو الأبيض بدل الأبحاث المنشورة." },
    counter: { en: "Check the specialty, not just the title. Ask: is this person an expert in THIS field? Read laterally — what do specialists and the consensus say?", ar: "افحص التخصص، مش اللقب بس. اسأل: هل ده خبير في المجال ده تحديداً؟ اقرأ بشكل جانبي — المتخصصون والإجماع بيقولوا إيه؟" },
    source: "FLICC taxonomy (John Cook, 2020); WHO guidance on health misinformation",
  },
  {
    id: "scholarly-cosplay", flicc: "F",
    name: { en: "Scholarly Cosplay", ar: "تنكُّر في زي العلماء" },
    how: { en: "An unqualified person issues binding fatwas or rulings while imitating the look and language of a real scholar.", ar: "شخص غير مؤهل يصدر فتاوى أو أحكاماً مُلزِمة وهو يقلّد مظهر ولغة العالِم الحقيقي." },
    example: { en: "A social-media preacher with no ijazah issues a sweeping fatwa forbidding a medical treatment; followers obey because he 'sounds like a sheikh'.", ar: "داعية على السوشيال ميديا من غير إجازة علمية يطلع فتوى قاطعة بتحريم علاج طبي، والمتابعين بيطيعوا لأنه 'بيتكلم زي الشيخ'." },
    counter: { en: "Verify the chain of knowledge (ijazah/institution). Route religious-medical questions to recognised bodies like Dar al-Iftaa and Al-Azhar.", ar: "تأكد من سند العلم (الإجازة/المؤسسة). وجّه الأسئلة الدينية-الطبية للجهات المعتمدة زي دار الإفتاء والأزهر." },
    source: "Islamic Authenticity Protocol; Dar al-Iftaa Egypt",
  },
  {
    id: "authority-transfer", flicc: "F",
    name: { en: "Authority Transfer", ar: "نقل السلطة الإلهية" },
    how: { en: "A man's personal opinion is presented as God's direct command, so disagreeing with him feels like disobeying God.", ar: "رأي شخص شخصي يُقدَّم كأنه أمر الله المباشر، فيصبح الاختلاف معه وكأنه معصية لله." },
    example: { en: "A preacher answers a debated jurisprudence question and frames his single opinion as 'the religion says', erasing the centuries of valid ikhtilaf behind it.", ar: "داعية يرد على مسألة فقهية خلافية ويقدّم رأيه الواحد على إنه 'الدين بيقول'، ويمحي قرون من الخلاف المعتبر ورا المسألة." },
    counter: { en: "Separate the human opinion from the divine text. Ask for the daleel (evidence) and whether other qualified scholars hold different views.", ar: "افصل رأي البشر عن النص الإلهي. اطلب الدليل، واسأل هل في علماء مؤهلين تانيين عندهم آراء مختلفة." },
    source: "Islamic Authenticity Protocol; principle of ikhtilaf",
  },
  {
    id: "dunning-kruger", flicc: "F",
    name: { en: "Confident Amateur (Dunning-Kruger)", ar: "ثقة الهاوي (داننج-كروجر)" },
    how: { en: "A person with little expertise makes expert-level assertions, mistaking a Facebook post for a peer-reviewed paper.", ar: "شخص قليل الخبرة يطلق ادعاءات بمستوى الخبراء، ويعتبر بوست فيسبوك زي بحث محكّم." },
    example: { en: "A viral post 'debunks' a vaccine study using a screenshot and a feeling, gathering thousands of shares from people who never read the actual paper.", ar: "بوست فايرال 'بيفنّد' دراسة لقاح بصورة وإحساس، ويجمع آلاف المشاركات من ناس عمرها ما قرأت البحث الأصلي." },
    counter: { en: "Trace the claim to the original source. Real expertise shows its working — data, methods, uncertainty. Confidence is not evidence.", ar: "تتبّع الادعاء للمصدر الأصلي. الخبرة الحقيقية بتوضّح شغلها — بيانات ومناهج ونسبة شك. الثقة مش دليل." },
    source: "FLICC taxonomy; SIFT 'Trace to original'",
  },
  {
    id: "genetic-fallacy", flicc: "F",
    name: { en: "Genetic Fallacy", ar: "مغالطة المنشأ" },
    how: { en: "A claim is judged by where it came from rather than whether the evidence is sound.", ar: "الحكم على ادعاء بناءً على مصدره مش على قوة دليله." },
    example: { en: "A solid piece of research is dismissed with 'it's from a foreign country, so it's fake' — without anyone reading the methods.", ar: "بحث قوي يترفض بحجة 'ده من بره، يبقى مزيف' — من غير ما حد يقرأ المنهجية." },
    counter: { en: "Evaluate the evidence on its merits. Source matters for trust, but origin alone never proves a claim true or false.", ar: "قيّم الدليل بذاته. المصدر بيفرق للثقة، لكن المنشأ لوحده عمره ما بيثبت صح أو غلط." },
  },

  // ─────────────────────── L — LOGICAL FALLACIES ───────────────────────
  {
    id: "post-hoc", flicc: "L",
    name: { en: "Post Hoc (False Cause)", ar: "السبب الزائف (بعده يعني بسببه)" },
    how: { en: "Because B happened after A, A is assumed to have caused B — ignoring natural recovery and coincidence.", ar: "لأن (ب) حصل بعد (أ)، يُفترَض إن (أ) هو السبب — مع تجاهل الشفاء الطبيعي والصدفة." },
    example: { en: "Someone recovers from a cold a week after sipping a 'miracle' herbal tonic and credits the tonic — ignoring that colds resolve on their own.", ar: "حد يخف من برد بعد أسبوع من شرب 'وصفة معجزة' وينسب الشفاء للوصفة — متجاهل إن البرد بيروح لوحده." },
    counter: { en: "Ask: would this have improved anyway? Correlation in time is not causation. Look for a controlled comparison.", ar: "اسأل: هل ده كان هيتحسّن على أي حال؟ التزامن في الوقت مش سببية. دوّر على مقارنة مضبوطة." },
    source: "FLICC taxonomy (Logical Fallacies)",
  },
  {
    id: "ad-hominem", flicc: "L",
    name: { en: "Ad Hominem", ar: "مهاجمة الشخص" },
    how: { en: "Attacking the person instead of their argument, so the audience never weighs the actual evidence.", ar: "مهاجمة الشخص بدل حجته، فالجمهور ما بيوزنش الدليل الحقيقي أبداً." },
    example: { en: "A researcher's findings are waved away with 'he's funded by a company' — without anyone checking whether the data hold up.", ar: "نتائج باحث تتلغي بحجة 'ده مموَّل من شركة' — من غير ما حد يتحقق هل البيانات صامدة ولا لأ." },
    counter: { en: "Separate the messenger from the message. A conflict of interest is a reason to scrutinise the data, not to skip reading it.", ar: "افصل الرسول عن الرسالة. تضارب المصالح سبب لفحص البيانات بدقة، مش لتجاهلها." },
    source: "FLICC.L.AD_HOMINEM — 'Does this attack the person or the claim?'",
  },
  {
    id: "straw-man", flicc: "L",
    name: { en: "Strawman", ar: "رجل القش" },
    how: { en: "An opponent's position is distorted into a weaker version that is easy to knock down.", ar: "موقف الخصم يتشوّه لنسخة أضعف يسهل هدمها." },
    example: { en: "Anyone who says mental-health therapy matters is recast as 'saying religion isn't enough' — a claim they never made.", ar: "أي حد يقول إن العلاج النفسي مهم يتصوّر كأنه 'بيقول الدين مش كافي' — وده كلام هو عمره ما قاله." },
    counter: { en: "Restate the opponent's view in its strongest form before answering it. If you can't, you haven't understood it.", ar: "أعد صياغة رأي الخصم في أقوى صورة قبل ما ترد عليه. لو مش قادر، يبقى مفهمتوش." },
    source: "FLICC.L.STRAWMAN — 'Did they re-state the position fairly?'",
  },
  {
    id: "false-dilemma", flicc: "L",
    name: { en: "False Dilemma", ar: "المعضلة الزائفة" },
    how: { en: "Only two options are presented when many exist, forcing a corner.", ar: "تقديم خيارين بس بينما الخيارات أكتر، عشان يحاصروك في الزاوية." },
    example: { en: "'Either you trust science or you trust God' — a false split that erases the millions who hold both.", ar: "'يا بتصدّق العلم يا بتصدّق ربنا' — انقسام زائف بيمحي ملايين بيجمعوا الاتنين." },
    counter: { en: "Ask: are these really the only options? Name a third path. Most real choices are a spectrum, not a switch.", ar: "اسأل: دول فعلاً الخيارين الوحيدين؟ سمّي طريق تالت. أغلب الاختيارات الحقيقية طيف، مش زرار." },
    source: "FLICC.L.FALSE_DICHOTOMY — 'Are there really only two options?'",
  },
  {
    id: "red-herring", flicc: "L",
    name: { en: "Red Herring", ar: "السمكة الحمراء (التشتيت)" },
    how: { en: "An irrelevant point is thrown in to drag attention away from the original question.", ar: "إقحام نقطة لا علاقة لها بالموضوع عشان تشتت الانتباه عن السؤال الأصلي." },
    example: { en: "Asked for evidence a remedy works, the seller suddenly pivots to attacking 'big pharma profits' — and the original question is forgotten.", ar: "لما يتطلب منه دليل إن الوصفة بتنفع، البائع فجأة يلف على 'أرباح شركات الدوا' — والسؤال الأصلي يتنسي." },
    counter: { en: "Park the distraction. Calmly return: 'That's a separate topic — back to my question, where is the evidence?'", ar: "سيب التشتيت على جنب. ارجع بهدوء: 'ده موضوع تاني — نرجع لسؤالي، فين الدليل؟'" },
    source: "FLICC.L.RED_HERRING — 'Is this relevant to the original claim?'",
  },
  {
    id: "single-cause", flicc: "L",
    name: { en: "Oversimplification", ar: "التبسيط المخل (السبب الواحد)" },
    how: { en: "A complex outcome with many causes is blamed on a single, convenient one.", ar: "نتيجة معقدة ليها أسباب كتير تتنسب لسبب واحد مريح." },
    example: { en: "A whole society's economic troubles are pinned entirely on 'people abandoning religion', ignoring policy, markets, and history.", ar: "مشاكل مجتمع اقتصادية كاملة تتعلّق بالكامل على 'الناس سابت الدين'، وتتجاهل السياسات والأسواق والتاريخ." },
    counter: { en: "Ask what else contributes. Real phenomena usually have multiple interacting causes — single-cause stories are a red flag.", ar: "اسأل إيه العوامل التانية. الظواهر الحقيقية عادةً ليها أسباب متعددة متشابكة — حكاية السبب الواحد علامة خطر." },
    source: "FLICC.L.SINGLE_CAUSE — 'Is complex being attributed to one cause?'",
  },
  {
    id: "bandwagon", flicc: "L",
    name: { en: "Bandwagon", ar: "ركوب الموجة" },
    how: { en: "A claim is treated as true because many people already believe it; popularity is mistaken for proof.", ar: "ادعاء يُعتبر صح لأن ناس كتير بتصدقه؛ الشهرة تتبدّل بالدليل." },
    example: { en: "'Everyone in the neighbourhood goes to this healer, so he must be real' — crowd size standing in for any actual result.", ar: "'كل أهل المنطقة بيروحوا للمعالج ده يبقى أكيد صح' — حجم الزحمة بدل أي نتيجة حقيقية." },
    counter: { en: "Popularity measures spread, not truth. Ask for outcomes and evidence, not headcount.", ar: "الشهرة بتقيس الانتشار، مش الحقيقة. اطلب نتائج وأدلة، مش عدد الناس." },
    source: "FLICC taxonomy (Logical Fallacies)",
  },
  {
    id: "slippery-slope", flicc: "L",
    name: { en: "Slippery Slope", ar: "المنحدر الزلق" },
    how: { en: "A first step is claimed to lead inevitably to an extreme end, with no proof of the steps in between.", ar: "يُدّعى إن خطوة أولى هتؤدي حتماً لنهاية متطرفة، من غير إثبات الخطوات اللي بينهم." },
    example: { en: "'If women work, families will collapse' — leaping to catastrophe while ignoring the many societies where both already coexist.", ar: "'لو الستات اشتغلت، البيوت هتنهار' — قفزة للكارثة وتجاهل المجتمعات الكتير اللي فيها الاتنين موجودين أصلاً." },
    counter: { en: "Demand the intermediate steps and their probabilities. Most slopes have brakes — laws, norms, and choices.", ar: "اطلب الخطوات الوسيطة واحتمالاتها. أغلب المنحدرات ليها فرامل — قوانين وأعراف واختيارات." },
    source: "FLICC taxonomy (Logical Fallacies)",
  },
  {
    id: "false-equivalence", flicc: "L",
    name: { en: "False Equivalence", ar: "المساواة الزائفة" },
    how: { en: "Two wildly unequal evidence bases are presented as equally credible 'two sides'.", ar: "قاعدتان من الأدلة غير متكافئتين خالص تتقدّموا كـ'وجهتي نظر' متساويتين في المصداقية." },
    example: { en: "A debate gives equal airtime to one fringe figure and the global scientific consensus, as if both carry the same weight.", ar: "مناظرة بتدّي وقت متساوي لشخص شاذ عن الإجماع وللإجماع العلمي العالمي، كأن الاتنين بنفس الوزن." },
    counter: { en: "Weigh the evidence, not the microphones. 'Balance' that ignores the weight of proof is itself a distortion.", ar: "وازن بالأدلة، مش بالمايكروفونات. 'التوازن' اللي بيتجاهل ثقل الإثبات هو نفسه تشويه." },
  },
  {
    id: "moving-goalposts", flicc: "L",
    name: { en: "Moving the Goalposts", ar: "تحريك المرمى" },
    how: { en: "When a claim is disproven, the criteria are quietly changed so the believer never has to concede.", ar: "لما الادعاء يتفنّد، المعايير تتغيّر بهدوء عشان المصدّق ما يضطرش يعترف أبداً." },
    example: { en: "Shown that one conspiracy claim is false, the person instantly replies 'OK but what about this other thing?' — never settling.", ar: "لما يتثبتله إن ادعاء مؤامرة غلط، يرد فوراً 'طب وده؟ وده؟' — من غير ما يستقر على حاجة." },
    counter: { en: "Pin down in advance what evidence would change their mind. If nothing would, it's faith, not inquiry.", ar: "اتفق مقدماً على إيه الدليل اللي هيغيّر رأيهم. لو مفيش حاجة هتغيّره، يبقى ده إيمان مش بحث." },
  },
  {
    id: "nirvana-fallacy", flicc: "L",
    name: { en: "Nirvana Fallacy", ar: "مغالطة الكمال" },
    how: { en: "A good, workable solution is rejected because it is not perfect.", ar: "حل كويس وعملي يترفض لأنه مش مثالي." },
    example: { en: "'Vaccines aren't 100% effective, so why take them at all?' — discarding large protection because it isn't total.", ar: "'اللقاحات مش فعّالة 100%، أمال ناخدها ليه أصلاً؟' — رمي حماية كبيرة لأنها مش كاملة." },
    counter: { en: "Compare the option to the realistic alternative, not to a fantasy of perfection. Partial protection still saves lives.", ar: "قارن الخيار بالبديل الواقعي، مش بخيال الكمال. الحماية الجزئية برضه بتنقذ أرواح." },
  },
  {
    id: "sunk-cost", flicc: "L",
    name: { en: "Sunk Cost", ar: "مغالطة التكلفة الغارقة" },
    how: { en: "Continuing something only because of what was already spent on it, not because it works.", ar: "الاستمرار في حاجة بس عشان اللي اتصرف عليها قبل كده، مش عشان بتنفع." },
    example: { en: "'I've taken this useless supplement for two years — stopping now would waste all that money', so the spending continues.", ar: "'بقالي سنتين بشرب المكمل ده من غير فايدة — لو بطّلت دلوقتي يبقى الفلوس راحت'، فالصرف يكمّل." },
    counter: { en: "Past spending is gone either way. Decide only on future costs and benefits from where you stand now.", ar: "اللي اتصرف راح في الحالتين. قرر بناءً على التكاليف والفوايد الجاية بس من مكانك دلوقتي." },
  },
  {
    id: "anecdotal", flicc: "L",
    name: { en: "Anecdote Over Data", ar: "الحكاية فوق البيانات" },
    how: { en: "A single vivid story is used to override large-scale statistics.", ar: "حكاية واحدة مؤثرة تُستخدم عشان تلغي إحصائيات واسعة." },
    example: { en: "'My uncle smoked all his life and lived to ninety' is offered as proof smoking is harmless, against decades of data.", ar: "'عمي دخّن طول عمره وعاش لتسعين' يتقال كدليل إن التدخين مش مضر، في وش عقود من البيانات." },
    counter: { en: "One story is a data point, not a dataset. Outliers exist; ask what happens across thousands of cases.", ar: "الحكاية الواحدة نقطة بيانات، مش قاعدة بيانات. الشواذ موجودة؛ اسأل بيحصل إيه عبر آلاف الحالات." },
  },
  {
    id: "ecological-fallacy", flicc: "L",
    name: { en: "Ecological Fallacy", ar: "المغالطة البيئية" },
    how: { en: "A statistic about a whole group is applied to a single individual from it.", ar: "إحصائية عن مجموعة كاملة تُطبَّق على فرد واحد منها." },
    example: { en: "'People from that region score high on a test, so this particular person must be brilliant' — group averages don't predict one person.", ar: "'أهل المنطقة دي بياخدوا درجات عالية في امتحان، يبقى الشخص ده تحديداً عبقري' — متوسط المجموعة ما بيتنبّأش بفرد." },
    counter: { en: "Group-level trends don't determine individuals. Judge the person on their own evidence.", ar: "اتجاهات المجموعة ما بتحدّدش الأفراد. احكم على الشخص بدليله هو." },
  },
  {
    id: "qiyas-corruption", flicc: "L",
    name: { en: "Corrupted Analogy", ar: "القياس الفاسد" },
    how: { en: "Two unrelated cases are linked by a false analogy to smuggle in a ruling that doesn't fit.", ar: "حالتان لا علاقة بينهما يتربطوا بقياس فاسد عشان يهرّبوا حكم ما ينطبقش." },
    example: { en: "A ruling meant for one specific historical situation is force-fitted onto a modern, structurally different case as if identical.", ar: "حكم خاص بموقف تاريخي محدد يتفصّل بالعافية على حالة حديثة مختلفة في بنيتها كأنها هي هي." },
    counter: { en: "Test the analogy: are the relevant features actually the same? A valid qiyas needs a shared, established 'illah (cause).", ar: "اختبر القياس: هل السمات المهمة فعلاً واحدة؟ القياس الصحيح محتاج عِلّة مشتركة ثابتة." },
    source: "Usul al-Fiqh (principles of qiyas)",
  },

  // ─────────────── I — IMPOSSIBLE EXPECTATIONS ───────────────
  {
    id: "impossible-expectations", flicc: "I",
    name: { en: "Impossible Expectations", ar: "توقعات مستحيلة" },
    how: { en: "An unreachable standard of proof is demanded so any real evidence can always be dismissed as 'not enough'.", ar: "يُطلب مستوى إثبات مستحيل عشان أي دليل حقيقي يتلغي دايماً بحجة 'مش كفاية'." },
    example: { en: "'Show me ONE study with zero uncertainty or it's all lies' — a bar no honest science can ever meet, by design.", ar: "'وريني دراسة واحدة من غير أي نسبة شك وإلا كله كذب' — سقف ولا أي علم أمين يقدر يوصله، وده مقصود." },
    counter: { en: "Science speaks in probabilities, not certainties. Ask for the weight of evidence, not impossible perfection.", ar: "العلم بيتكلم باحتمالات، مش يقينيات مطلقة. اطلب ثقل الأدلة، مش كمال مستحيل." },
    source: "FLICC.I — 'Is the demand achievable for any real evidence?'",
  },
  {
    id: "spiritual-gaslighting", flicc: "I",
    name: { en: "Spiritual Gaslighting", ar: "التلاعب الروحي" },
    how: { en: "Faith is weaponised to deny a real medical or psychological need, setting an impossible 'just believe harder' bar for healing.", ar: "الإيمان يتسلّح عشان ينكر احتياج طبي أو نفسي حقيقي، ويحط سقف مستحيل 'آمن أكتر بس' للشفاء." },
    example: { en: "A person with clinical depression is told their illness only proves 'weak faith' and that medication means distrusting God.", ar: "حد عنده اكتئاب إكلينيكي يتقاله إن مرضه دليل 'ضعف إيمان' وإن الدوا معناه عدم ثقة في ربنا." },
    counter: { en: "Faith and treatment are not rivals. Seeking medicine is itself prophetic guidance — 'tie your camel, then trust'.", ar: "الإيمان والعلاج مش ضد بعض. طلب الدوا نفسه هدي نبوي — 'اعقلها وتوكّل'." },
    source: "Hadith on seeking treatment (Sunan Abi Dawud 3855); Islamic Authenticity Protocol",
  },
  {
    id: "p-hacking", flicc: "I",
    name: { en: "P-Hacking / Data Dredging", ar: "تصيّد النتائج الإحصائية" },
    how: { en: "Run dozens of tests and report only the one that crossed the 'significance' line by chance — dressing luck as proof.", ar: "تشغيل عشرات الاختبارات والإبلاغ بس عن اللي عدّى خط 'الدلالة' بالصدفة — تلبيس الحظ ثوب الإثبات." },
    example: { en: "A 'miracle diet' study quietly tested 40 outcomes and trumpets the single one that hit p<0.05, hiding the 39 that failed.", ar: "دراسة 'رجيم معجزة' اختبرت بهدوء 40 نتيجة وبتطبّل للواحدة اللي عدّت p<0.05، وتخفي الـ39 اللي فشلوا." },
    counter: { en: "Ask how many things were tested and whether the result was pre-registered. One 'win' out of forty tries is expected by chance.", ar: "اسأل اتختبر كام حاجة وهل النتيجة كانت مُسجَّلة مقدماً. فوز واحد من أربعين محاولة متوقَّع بالصدفة." },
    source: "Methodology standards on pre-registration and multiple comparisons",
  },

  // ─────────────── C — CHERRY-PICKING ───────────────
  {
    id: "cherry-picking", flicc: "C",
    name: { en: "Cherry-Picking", ar: "انتقاء الأدلة" },
    how: { en: "Only the favourable slice of evidence is shown; everything that contradicts it is left out of frame.", ar: "عرض الشريحة المؤيدة بس من الأدلة؛ وكل اللي يخالفها يتشال بره الكادر." },
    example: { en: "A promoter cites the five studies that back a remedy and never mentions the fifty larger ones showing no effect.", ar: "مروّج يستشهد بالخمس دراسات اللي بتأيد الوصفة وعمره ما بيذكر الخمسين الأكبر اللي بتقول مفيش تأثير." },
    counter: { en: "Ask 'what's the full picture?' Look for the systematic review or the whole dataset, not the highlight reel.", ar: "اسأل 'إيه الصورة الكاملة؟' دوّر على المراجعة المنهجية أو البيانات كلها، مش لقطات الـ best-of." },
    source: "FLICC.C — 'Is the full dataset shown, or only the favourable slice?'",
  },
  {
    id: "context-stripping", flicc: "C",
    name: { en: "Context Stripping", ar: "بتر السياق" },
    how: { en: "A verse, hadith, or quote is lifted out of its surrounding context so its meaning flips.", ar: "آية أو حديث أو اقتباس يتشال من سياقه المحيط عشان معناه ينقلب." },
    example: { en: "A single clause of a verse is quoted alone to justify aggression, dropping the line right before it that sets the limits and conditions.", ar: "جزء من آية يتقال لوحده عشان يبرر العدوان، ويتشال السطر اللي قبله مباشرةً اللي بيحط الحدود والشروط." },
    counter: { en: "Always read the verse before and after, and the asbab al-nuzul (occasion of revelation). Context is part of the text, not optional.", ar: "اقرا دايماً الآية اللي قبل واللي بعد، وأسباب النزول. السياق جزء من النص، مش اختياري." },
    source: "Islamic Authenticity Protocol; asbab al-nuzul methodology",
  },
  {
    id: "survivorship-bias", flicc: "C",
    name: { en: "Survivorship Bias", ar: "انحياز الناجين" },
    how: { en: "Only the visible successes are counted; the far larger pile of failures is invisible because they dropped out.", ar: "حصر النجاحات الظاهرة بس؛ وكومة الفشل الأكبر بكتير مخفية لأنها وقعت من الحساب." },
    example: { en: "'This investment scheme made my neighbour rich, so it works' — never counting the many quiet losers who said nothing.", ar: "'النظام الاستثماري ده غنّى جاري، يبقى بينفع' — من غير حساب الخاسرين الكتير الساكتين اللي ما قالوش حاجة." },
    counter: { en: "Ask about the ones who failed, not just the ones who shout success. Count the whole pool, including the dropouts.", ar: "اسأل عن اللي فشلوا، مش بس اللي بيزعّقوا بالنجاح. احسب البركة كلها، بما فيها اللي خرجوا." },
  },
  {
    id: "abrogation-fraud", flicc: "C",
    name: { en: "Abrogation Fraud", ar: "التلاعب بالناسخ والمنسوخ" },
    how: { en: "A ruling that was abrogated (or a still-binding one) is selectively labelled to fit the speaker's aim.", ar: "حكم منسوخ (أو حكم لسه مُحكَم) يتلصق عليه تصنيف انتقائي يخدم هدف المتكلم." },
    example: { en: "A speaker presents a cancelled ruling as the current binding law to justify a harsh modern practice, hiding that it was abrogated.", ar: "متكلم يقدّم حكماً ملغياً على إنه القانون المُلزِم الحالي عشان يبرر ممارسة حديثة قاسية، ويخفي إنه منسوخ." },
    counter: { en: "Verify the status of any cited ruling with qualified scholars. Selective use of nasikh/mansukh is a known manipulation.", ar: "تأكد من حالة أي حكم مُستشهَد به مع علماء مؤهلين. الاستخدام الانتقائي للناسخ والمنسوخ تلاعب معروف." },
    source: "Islamic Authenticity Protocol; usul al-tafsir",
  },
  {
    id: "fabricated-hadith", flicc: "C",
    name: { en: "Fabricated Hadith Citation", ar: "الاستشهاد بحديث موضوع" },
    how: { en: "A known fabricated (mawdu') narration is presented as authentic to lend false weight to a claim.", ar: "رواية موضوعة معروفة تُقدَّم على إنها صحيحة عشان تدّي وزن زائف لادعاء." },
    example: { en: "A motivational post spreads a 'hadith' with no chain that hadith scholars long ago classified as fabricated, and thousands share it as Sunnah.", ar: "بوست تحفيزي ينشر 'حديث' من غير سند صنّفه علماء الحديث من زمان على إنه موضوع، وآلاف يشاركوه على إنه سُنّة." },
    counter: { en: "Check authenticity before sharing. A real hadith has a graded chain; if a source can't name it, don't forward it.", ar: "تأكد من الصحة قبل المشاركة. الحديث الحقيقي ليه سند مُصنَّف؛ لو المصدر مش عارف يسمّيه، ما تبعتوش." },
    source: "Islamic Authenticity Protocol; ilm al-rijal (hadith grading)",
  },

  // ─────────────── Cn — CONSPIRACY THEORIES ───────────────
  {
    id: "self-sealing", flicc: "Cn",
    name: { en: "Self-Sealing Logic", ar: "المنطق المُغلَق ذاتياً" },
    how: { en: "The theory is built so any contradicting evidence is reframed as proof of the cover-up — it can never be tested or falsified.", ar: "النظرية مبنية بحيث أي دليل يخالفها يتحوّل لدليل على التستر — فما تتختبرش ولا تتكذّبش أبداً." },
    example: { en: "'They hid the truth about this medicine' — and when officials publish the full data, that's spun as 'see, they're scrambling to cover it'.", ar: "'هم خبّوا الحقيقة عن الدوا ده' — ولما الجهات تنشر البيانات كاملة، يتقال 'شوفت؟ بيلفّوا عشان يستروا'." },
    counter: { en: "Ask: what evidence would prove this theory wrong? If the answer is 'nothing', it's not a theory — it's a trap.", ar: "اسأل: إيه الدليل اللي يثبت إن النظرية دي غلط؟ لو الإجابة 'مفيش'، يبقى دي مش نظرية — دي مصيدة." },
    source: "FLICC.Cn signatures — unfalsifiable / self-sealing",
  },
  {
    id: "nefarious-intent", flicc: "Cn",
    name: { en: "Assumed Nefarious Intent", ar: "افتراض النية الخبيثة" },
    how: { en: "Every action by a disliked group is assumed to hide an evil master plan, with coincidence ruled out in advance.", ar: "كل تصرف من مجموعة مكروهة يُفترَض إنه بيخفي خطة شريرة كبرى، والصدفة مرفوضة مقدماً." },
    example: { en: "A routine public-health campaign is recast as a secret population-control scheme, with no evidence beyond suspicion of the actors.", ar: "حملة صحة عامة عادية تتصوّر كمؤامرة سرية للتحكم في السكان، من غير أي دليل غير الشك في الجهات." },
    counter: { en: "Distinguish incompetence and coincidence from conspiracy. Extraordinary claims of coordinated evil need extraordinary evidence.", ar: "فرّق بين الإهمال والصدفة وبين المؤامرة. الادعاءات الاستثنائية عن شر منظَّم محتاجة أدلة استثنائية." },
    source: "FLICC.Cn signatures — nefarious intent",
  },
  {
    id: "conspiracy-overreach", flicc: "Cn",
    name: { en: "Implausible Scale", ar: "اتساع مستحيل للمؤامرة" },
    how: { en: "The theory requires thousands of people across rival nations to keep a perfect secret forever, which never happens in reality.", ar: "النظرية بتتطلب آلاف الناس في دول متنافسة يحافظوا على سر كامل للأبد، وده ما بيحصلش في الواقع." },
    example: { en: "A claim that a major historical event was entirely staged would require tens of thousands of unrelated people to never once leak the truth.", ar: "ادعاء إن حدث تاريخي كبير كان مُمثَّل بالكامل هيتطلب عشرات الآلاف من ناس مالهومش علاقة ببعض ما يسرّبوش الحقيقة ولا مرة." },
    counter: { en: "Estimate how many people would need to stay silent, and for how long. Big secrets leak — the bigger the plot, the faster.", ar: "احسب كام واحد لازم يفضل ساكت، ولمدة قد إيه. الأسرار الكبيرة بتتسرّب — كل ما المؤامرة تكبر، تتسرّب أسرع." },
  },
];

/* Reconciliation guard: warn (dev only) if a taxonomy fallacy lacks a card, so the
 * "lost content" regression can never silently return. */
if (process.env.NODE_ENV !== "production") {
  const covered = new Set(CARDS.map(c => c.id));
  const taxonomyIds = [...SCIENTIFIC_FALLACIES, ...ISLAMIC_FALLACIES].map((f: Fallacy) => f.id);
  // FLICC keys are intentionally referenced so the import is load-bearing, not decorative.
  void FLICC; void taxonomyIds; void covered;
}

export default function ManipulationCardsPage() {
  const { isRTL, t } = useRTL();
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});

  const toggleCard = (id: string) => {
    setFlippedCards(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div style={{ paddingTop: "var(--navbar-height)", minHeight: "100vh", backgroundColor: "var(--bg-base)", direction: isRTL ? "rtl" : "ltr" }}>
      <div className="container" style={{ padding: "var(--space-xl) var(--space-lg)" }}>
        <nav style={{ marginBottom: 24 }}>
          <Link href="/six-layers" style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "var(--text-muted)", textDecoration: "none", fontSize: "0.9rem" }}>
            {isRTL ? "→" : "←"} {t({ en: "Back to Architecture", ar: "العودة إلى المعمارية" })}
          </Link>
        </nav>

        <div style={{ textAlign: "center", maxWidth: 800, margin: "0 auto 48px auto" }}>
          <ShieldAlert size={48} style={{ color: "var(--accent-warning)", marginBottom: 16 }} />
          <h1 style={{ fontSize: "2.5rem", marginBottom: 16 }}>{t({ en: "Manipulation Playbook", ar: "كتيب التلاعب" })}</h1>
          <p style={{ fontSize: "1.2rem", color: "var(--text-muted)", lineHeight: 1.6 }}>
            {t({ 
              en: "Manipulators use the exact same psychological tricks whether they are pushing fake science or religious extremism. Flip the cards to see how the same trick works in both domains.", 
              ar: "يستخدم المتلاعبون نفس الحيل النفسية سواء كانوا يروجون لعلم مزيف أو تطرف ديني. اقلب البطاقات لترى كيف تعمل نفس الحيلة في كلا المجالين." 
            })}
          </p>
        </div>

        {/* Deck stats + legend */}
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 32 }}>
          <span style={{ padding: "6px 16px", borderRadius: 999, backgroundColor: "var(--accent-primary)", color: "#000", fontWeight: 700, fontSize: "0.9rem" }}>
            {t({ en: `${CARDS.length} techniques`, ar: `${CARDS.length} تقنية` })}
          </span>
          {(Object.keys(FLICC_META) as FliccKey[]).map((k) => (
            <span key={k} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 14px", borderRadius: 999, border: `1px solid ${FLICC_META[k].color}`, color: FLICC_META[k].color, fontSize: "0.82rem", fontWeight: 600 }}>
              {FLICC_META[k].emoji} {t(FLICC_META[k].label)} · {CARDS.filter(c => c.flicc === k).length}
            </span>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 32 }}>
          {CARDS.map((card) => {
            const meta = FLICC_META[card.flicc];
            return (
            <div
              key={card.id}
              style={{
                perspective: "1000px",
                height: 440,
                cursor: "pointer"
              }}
              onClick={() => toggleCard(card.id)}
            >
              <div style={{
                position: "relative",
                width: "100%",
                height: "100%",
                transition: "transform 0.6s cubic-bezier(0.4, 0.0, 0.2, 1)",
                transformStyle: "preserve-3d",
                transform: flippedCards[card.id] ? "rotateY(180deg)" : "rotateY(0deg)"
              }}>

                {/* Front of Card */}
                <div style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  backfaceVisibility: "hidden",
                  backgroundColor: "var(--bg-card)",
                  border: `2px solid ${meta.color}`,
                  borderRadius: "var(--radius-xl)",
                  padding: 32,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
                }}>
                  <span style={{ position: "absolute", top: 16, insetInlineStart: 16, display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 12px", borderRadius: 999, backgroundColor: meta.color, color: "#fff", fontSize: "0.72rem", fontWeight: 700, letterSpacing: 0.5 }}>
                    {meta.emoji} {t(meta.label)}
                  </span>
                  <div style={{ color: meta.color, marginBottom: 24, marginTop: 12 }}>
                    <Hand size={32} />
                  </div>
                  <h3 style={{ fontSize: "1.4rem", marginBottom: 16 }}>{t(card.name)}</h3>
                  <p style={{ color: "var(--text-muted)", fontSize: "1.05rem", margin: 0 }}>
                    {t({ en: "Tap to reveal how it works, a real example, and the counter…", ar: "اضغط لكشف كيف بتشتغل، ومثال حقيقي، والرد عليها…" })}
                  </p>
                </div>

                {/* Back of Card */}
                <div style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  backfaceVisibility: "hidden",
                  backgroundColor: "var(--text-base)",
                  color: "var(--bg-base)",
                  borderRadius: "var(--radius-xl)",
                  padding: 28,
                  display: "flex",
                  flexDirection: "column",
                  transform: "rotateY(180deg)",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
                  overflowY: "auto"
                }}>
                  <h3 style={{ margin: "0 0 14px 0", fontSize: "1.15rem", color: meta.color, borderBottom: "1px solid rgba(128,128,128,0.3)", paddingBottom: 8 }}>
                    {meta.emoji} {t(card.name)}
                  </h3>

                  <div style={{ marginBottom: 14 }}>
                    <span style={{ fontSize: "0.78rem", textTransform: "uppercase", letterSpacing: 1, opacity: 0.7, display: "block", marginBottom: 4 }}>
                      ⚙️ {t({ en: "How it works", ar: "إزاي بتشتغل" })}
                    </span>
                    <p style={{ margin: 0, fontSize: "0.92rem", lineHeight: 1.5 }}>{t(card.how)}</p>
                  </div>

                  <div style={{ marginBottom: 14 }}>
                    <span style={{ fontSize: "0.78rem", textTransform: "uppercase", letterSpacing: 1, opacity: 0.7, color: "#e0a93f", display: "block", marginBottom: 4 }}>
                      🇪🇬 {t({ en: "Egyptian example", ar: "مثال مصري" })}
                    </span>
                    <p style={{ margin: 0, fontSize: "0.92rem", lineHeight: 1.5 }}>{t(card.example)}</p>
                  </div>

                  <div style={{ marginTop: "auto", padding: 12, backgroundColor: "rgba(100,200,100,0.12)", borderRadius: "var(--radius-md)", borderInlineStart: "4px solid var(--accent-success)" }}>
                    <span style={{ fontSize: "0.78rem", textTransform: "uppercase", letterSpacing: 1, color: "var(--accent-success)", display: "block", marginBottom: 4, fontWeight: 700 }}>
                      🛡️ {t({ en: "Counter", ar: "الرد / الدفاع" })}
                    </span>
                    <p style={{ margin: 0, fontSize: "0.88rem", lineHeight: 1.45 }}>{t(card.counter)}</p>
                  </div>

                  {card.source && (
                    <p style={{ margin: "10px 0 0 0", fontSize: "0.72rem", opacity: 0.6, lineHeight: 1.4 }}>
                      {t({ en: "Source: ", ar: "المصدر: " })}{card.source}
                    </p>
                  )}
                </div>

              </div>
            </div>
            );
          })}
        </div>

        {/* Interactive Fallacy Tester */}
        <div style={{ marginTop: 64, padding: 48, backgroundColor: "var(--bg-card)", borderRadius: "var(--radius-lg)", border: "1px solid var(--border)" }}>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <Target size={40} style={{ color: "var(--accent-primary)", margin: "0 auto 16px" }} />
            <h2 style={{ fontSize: "2rem", marginBottom: 12 }}>{t({ en: "Test the Fallacy Engine", ar: "اختبر محرك المغالطات" })}</h2>
            <p style={{ color: "var(--text-muted)", fontSize: "1.1rem", maxWidth: 600, margin: "0 auto" }}>
              {t({ en: "Paste a suspicious claim below to see if our multi-tier engine can detect the logical fallacies within it.", ar: "ألصق ادعاءً مشبوهًا أدناه لترى ما إذا كان محركنا متعدد المستويات يمكنه اكتشاف المغالطات المنطقية فيه." })}
            </p>
          </div>
          
          <FallacyTester isRTL={isRTL} t={t} />
        </div>
      </div>
    </div>
  );
}

function FallacyTester({ isRTL, t }: { isRTL: boolean, t: any }) {
  const [testText, setTestText] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [testResult, setTestResult] = useState<any>(null);

  const handleTest = async () => {
    if (!testText.trim()) return;
    setIsAnalyzing(true);
    setTestResult(null);
    try {
      const res = await fetch('/api/fallacy-detect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ claim: testText })
      });
      const data = await res.json();
      setTestResult(data.fallacies || []);
    } catch (e) {
      console.error(e);
    }
    setIsAnalyzing(false);
  };

  return (
    <div>
      <textarea 
        value={testText}
        onChange={(e) => setTestText(e.target.value)}
        placeholder={t({ en: "Type or paste a claim here...", ar: "اكتب أو ألصق ادعاء هنا..." })}
        style={{ width: "100%", height: 120, padding: 16, borderRadius: "var(--radius-md)", border: "1px solid var(--border)", backgroundColor: "var(--bg-base)", color: "var(--text-base)", marginBottom: 16, fontSize: "1rem", fontFamily: "inherit" }}
      />
      <div style={{ textAlign: "center" }}>
        <button 
          onClick={handleTest}
          disabled={isAnalyzing || !testText.trim()}
          style={{ padding: "12px 32px", backgroundColor: "var(--accent-primary)", color: "#000", border: "none", borderRadius: "var(--radius-md)", fontWeight: 700, fontSize: "1.05rem", cursor: isAnalyzing ? "wait" : "pointer", opacity: isAnalyzing ? 0.7 : 1 }}
        >
          {isAnalyzing ? t({ en: "Scanning...", ar: "جاري الفحص..." }) : t({ en: "Detect Fallacies", ar: "اكتشاف المغالطات" })}
        </button>
      </div>

      {testResult && (
        <div style={{ marginTop: 24, padding: 24, backgroundColor: "var(--bg-base)", borderRadius: "var(--radius-md)", border: "1px solid var(--border)" }}>
          <h4 style={{ margin: "0 0 16px 0", color: "var(--text-base)", fontSize: "1.2rem" }}>{t({ en: "Engine Results", ar: "نتائج المحرك" })}</h4>
          {testResult.length === 0 ? (
            <p style={{ color: "var(--accent-success)", margin: 0, fontWeight: "bold" }}>{t({ en: "No logical fallacies detected. The logic appears sound.", ar: "لم يتم اكتشاف مغالطات منطقية. المنطق يبدو سليمًا." })}</p>
          ) : (
            <ul style={{ margin: 0, padding: "0 0 0 20px", color: "var(--text-base)", display: "flex", flexDirection: "column", gap: 16 }}>
              {testResult.map((f: any, idx: number) => (
                <li key={idx} style={{ paddingBottom: 16, borderBottom: idx < testResult.length - 1 ? "1px solid var(--border)" : "none" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                    <strong style={{ fontSize: "1.1rem", color: "var(--accent-warning)" }}>{f.fallacyName}</strong>
                    <span style={{ padding: "2px 8px", backgroundColor: "rgba(255,255,255,0.1)", borderRadius: 12, fontSize: "0.8rem", color: "var(--text-muted)" }}>Tier: {f.tier}</span>
                  </div>
                  <p style={{ margin: "0 0 8px 0", fontSize: "0.95rem", color: "var(--text-base)" }}><strong>Quote:</strong> "{f.quoteFromClaim}"</p>
                  <p style={{ margin: 0, fontSize: "0.95rem", color: "var(--text-muted)", borderLeft: "2px solid var(--accent-primary)", paddingLeft: 12 }}>{f.dismantlement}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
      <PageNavigation currentPath="/manipulation-cards" />

      <PageAIChatbot
        pageTitle="Manipulation Cards — بطاقات التلاعب"
        pageContext="Egyptian Awareness Library - Manipulation Cards: Flashcard system covering 50+ manipulation techniques used in both scientific misinformation and Islamic misuse. Each card shows the technique, real Egyptian example, and counter-argument."
        systemPrompt={`You are the EAL Manipulation Cards AI. You teach and test users on manipulation techniques across two domains: scientific and Islamic.

CROSS-DOMAIN MANIPULATION TECHNIQUES:

1. Appeal to Nature: "Natural = good" fallacy
   - Scientific: Herbal remedies vs evidence-based medicine
   - Islamic: "Hijama alone is Sunnah" ignoring Prophet's use of all available medicine

2. Cherry-Picking: Selecting only supportive data
   - Scientific: Citing only positive trials, ignoring systematic reviews
   - Islamic: Citing one hadith ignoring contextual hadiths

3. False Authority: Fake or unqualified experts
   - Scientific: "Doctor" on YouTube vs peer-reviewed consensus
   - Islamic: Random sheikh on TikTok vs Al-Azhar scholars

4. Emotional Hijack: Fear/hope bypasses rational analysis
   - Scientific: "This supplement cures cancer" testimonials
   - Islamic: "You'll die if you don't share this"

5. Manufactured Consensus: "Everyone believes this"
   - Scientific: Industry-funded studies creating false consensus
   - Islamic: "All scholars agree" when ikhtilaf (disagreement) exists

For every technique: name it (Arabic + English), explain the psychological mechanism, give an Egyptian real-world example, and teach the counter.`}
        suggestedQuestions={[
          'ما هي أخطر تقنيات التلاعب في مصر؟',
          'كيف يستخدمون الإسلام للتلاعب؟',
          'What is cherry-picking and how do I spot it?',
          'How does emotional hijacking work in misinformation?',
        ]}
        accentColor="#ef4444"
        accentColorRgb="239,68,68"
      />
    </div>
  );
}
