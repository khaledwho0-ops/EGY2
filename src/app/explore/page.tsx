'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { PageNavigation } from '@/components/shared/page-navigation';

interface Tool {
  path: string;
  name: string;        // plain, clear title
  method?: string;     // the real method / instrument tag (hybrid naming)
  desc: string;
  isNew?: boolean;
}

interface Category {
  id: string;
  emoji: string;
  titleEn: string;
  titleAr: string;
  gradient: string;
  glow: string;
  badge: string;
  tools: Tool[];
}

const CATEGORIES: Category[] = [
  {
    id: 'curriculum',
    emoji: '🧠',
    titleEn: 'Cognitive Immunity Curriculum',
    titleAr: 'منهج التحصين المعرفي',
    gradient: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
    glow: 'rgba(99,102,241,0.35)',
    badge: '#6366f1',
    tools: [
      { path: '/curriculum/phase0', name: 'Phase 0 — Baseline Calibration', method: 'pre-inoculation diagnostics', desc: 'Weeks 1–4 — establish your starting cognitive-immunity baseline before any training.' },
      { path: '/curriculum/phase1', name: 'Phase 1 — Immunity Induction', method: 'attenuated-exposure inoculation', desc: 'Weeks 5–8 — controlled exposure that builds resistance to misinformation.' },
      { path: '/curriculum/phase2', name: 'Phase 2 — Evidence & Reasoning', method: 'Bayesian + systematic review', desc: 'Weeks 9–16 — read evidence like a scientist; interpret studies and reviews.' },
      { path: '/curriculum/phase3', name: 'Phase 3 — Islamic Epistemology', method: 'Hadith science + Maqasid', desc: 'Weeks 17–20 — Isnad methodology and Maqasid-based critical analysis.' },
      { path: '/curriculum/phase4', name: 'Phase 4 — Capstone', method: 'synthesis + certification', desc: 'Weeks 21–24 — a synthesis project and the cognitive-immunity certificate.' },
      { path: '/cognitive-lab', name: 'Cognitive Lab', method: 'dual-process (Kahneman) drills', desc: 'Hands-on reasoning challenges using System-1 / System-2 theory.' },
      { path: '/fallacy-engine', name: 'Fallacy Detector', method: 'FLICC taxonomy (Cook)', desc: '100+ logical fallacies classified by the FLICC taxonomy, with Egyptian cases.' },
      { path: '/manipulation-cards', name: 'Manipulation Techniques', method: 'FLICC + Cialdini cards', desc: 'A card deck of persuasion and dark-pattern techniques with real examples.' },
      { path: '/bad-news', name: 'Prebunking Game', method: 'active inoculation (Bad News)', desc: 'Learn manipulation by playing the manipulator — the validated inoculation game.' },
      { path: '/reaction-test', name: 'Reaction Test', method: 'System-1 trigger-speed', desc: 'Measure how fast emotional triggers hijack your judgement.' },
      { path: '/inoculation-passport', name: 'Immunity Passport', method: '6-domain competency record', desc: 'A WHO-inspired evolving record of your competency across six domains.' },
      { path: '/epistemology', name: 'Epistemology', method: 'Popper → Al-Ghazali', desc: 'The foundations of how we know what we know — linked to where each applies.' },
      { path: '/critical-thinking', name: 'Critical Thinking', method: 'Socratic method + Bloom', desc: 'Structured critical analysis using the Socratic method and Bloom’s taxonomy.' },
      { path: '/peer-challenge', name: 'Peer Challenge', method: 'scored real/fake discernment', desc: 'Competitive fact-checking with scored verification accuracy.' },
      { path: '/cognition-curriculum', name: 'Cognition Curriculum (140 Days)', method: '8 evidence-based mechanics', desc: 'The full 140-day mind-building course — calibration, self-explanation, active inoculation, argument-mapping.', isNew: true },
    ],
  },
  {
    id: 'defense',
    emoji: '⚡',
    titleEn: 'Live Defense Tools',
    titleAr: 'أدوات الدفاع الحيّ',
    gradient: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
    glow: 'rgba(245,158,11,0.35)',
    badge: '#f59e0b',
    tools: [
      { path: '/angry-debunkers', name: 'Claim Debunker', method: 'truth-sandwich + 8-layer', desc: 'Paste a viral claim; get a cited debunk structured as a truth sandwich.' },
      { path: '/swarm-debate', name: 'AI Debate Panel', method: '5 adversary archetypes', desc: 'Argue against five manipulator archetypes to harden your reasoning.' },
      { path: '/debate-sim', name: 'Debate Practice', method: 'Aristotelian 1-on-1', desc: 'A one-on-one AI argumentation arena that hides a fallacy for you to spot.' },
      { path: '/osint-investigator', name: 'OSINT Investigator', method: 'open-source intelligence search', desc: 'Trace a claim across open sources and synthesise a sourced report.' },
      { path: '/whatsapp-analyzer', name: 'WhatsApp Analyzer', method: 'viral-message scoring', desc: 'Deconstruct a forwarded message and score its manipulation cues.' },
      { path: '/arabic-shield', name: 'Arabic Text Analyzer', method: 'Arabic NLP manipulation cues', desc: 'Detect fear, urgency, conspiracy, and polarisation in Arabic text.' },
      { path: '/bias-detector', name: 'Bias Detector', method: 'dual-process (Kahneman)', desc: 'Identify cognitive biases in an argument using dual-process theory.' },
      { path: '/bias-fingerprint', name: 'Bias Profile', method: 'self-assessment', desc: 'Build your personal bias profile from a short real self-assessment.' },
      { path: '/blackbox', name: 'Claim Audit', method: 'anonymous, multi-engine', desc: 'Submit a claim anonymously for a multi-engine evidence audit.' },
      { path: '/fight-back', name: 'Counter-Narrative Toolkit', method: 'truth-sandwich rebuttals', desc: 'Evidence-based rebuttals you can paste back into the conversation.' },
      { path: '/live-deception', name: 'Algorithmic Feed Simulator', method: 'filter-bubble / rabbit-hole', desc: 'See how a recommendation algorithm radicalises a feed, step by step.', isNew: true },
      { path: '/kill-list', name: 'Active Threats Registry', method: 'documented Egyptian campaigns', desc: 'The most dangerous active Egyptian misinformation campaigns, sourced.', isNew: true },
    ],
  },
  {
    id: 'forensics',
    emoji: '🔬',
    titleEn: 'Digital Media Forensics',
    titleAr: 'الطب الشرعي الرقمي',
    gradient: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)',
    glow: 'rgba(6,182,212,0.35)',
    badge: '#06b6d4',
    tools: [
      { path: '/deepreal-forensics', name: 'Media Forensics Suite', method: 'ELA + EXIF + C2PA', desc: 'Multi-layer authentication of images and video.' },
      { path: '/forensic-image', name: 'Image Forensics', method: 'EXIF + JPEG quantization', desc: 'Inspect an image’s metadata and compression for signs of manipulation.' },
      { path: '/forensic-c2pa', name: 'Provenance Verifier', method: 'C2PA Content Credentials', desc: 'Verify a file’s cryptographic chain-of-custody.' },
      { path: '/deepreal', name: 'Forensics Dashboard', method: 'multi-engine orchestration', desc: 'A central dashboard that orchestrates the forensic engines.' },
      { path: '/deepreal-upload', name: 'Media Upload Analyzer', method: '4-layer forensic pipeline', desc: 'Drag-and-drop a file for real-time analysis through the pipeline.' },
      { path: '/paper-auditor', name: 'Paper Auditor', method: 'p-hacking / integrity check', desc: 'Audit a research paper’s integrity, including p-hacking signals.' },
      { path: '/reverse', name: 'Manipulation Reverse-Engineering', method: 'branching campaign deconstruction', desc: 'Deconstruct a manipulation campaign — map its tactic chain across truth, mental-health, and religious coercion.' },
      { path: '/check-image', name: 'Image Authenticity Check', method: 'OCR + forensic scan', desc: 'Quick check of an image for text extraction and signs of manipulation.' },
      { path: '/deepreal/game', name: 'DeepReal Game', method: 'spot-the-fake gameplay', desc: 'A gamified round of telling real media from manipulated.', isNew: true },
    ],
  },
  {
    id: 'islamic',
    emoji: '🕌',
    titleEn: 'Islamic Verification Tools',
    titleAr: 'أدوات التحقق الإسلامية',
    gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    glow: 'rgba(16,185,129,0.35)',
    badge: '#10b981',
    tools: [
      { path: '/religion-hub', name: 'Islamic Verification Hub', method: 'Maqasid al-Shariah', desc: 'All Islamic verification tools, unified under the Maqasid framework.' },
      { path: '/religion-hub/tools/hadith-check', name: 'Hadith Authenticator', method: 'Isnad / Ilm al-Rijal', desc: 'Sahih/Da’if grading with full narrator-chain analysis.' },
      { path: '/religion-hub/tools/fatwa-context', name: 'Fatwa Context', method: 'Usul al-Fiqh, multi-madhhab', desc: 'Place a fatwa in its full scholarly, multi-school context.' },
      { path: '/religion-hub/tools/sectarian-detector', name: 'Sectarian Bias Detector', method: 'ta’assub detection', desc: 'Detect hidden sectarian bias in religious content.' },
      { path: '/religion-hub/tools/authority-verifier', name: 'Scholar Credential Check', method: 'ijazah chain', desc: 'Verify a scholar’s ijazah chain, institution, and specialisation.' },
      { path: '/religion-hub/tools/quran-context', name: 'Quran Context Check', method: 'Asbab al-Nuzul + tafsir', desc: 'Verify a Quranic citation in its proper revelatory context.' },
      { path: '/religion-hub/tools/zakat-calculator', name: 'Zakat Calculator', method: 'live nisab (gold/silver)', desc: 'Zakat computation using live gold/silver prices.' },
      { path: '/religion-hub/tools/mawarith', name: 'Inheritance Calculator', method: 'Al-Mawarith (An-Nisa 4:11–12)', desc: 'Exact inheritance distribution per the Quranic shares.' },
      { path: '/religion-hub/tools/halal-finance', name: 'Halal Finance Screen', method: 'AAOIFI: riba / gharar / maysir', desc: 'Screen a financial product against AAOIFI Shariah standards.' },
      { path: '/sovo', name: 'Claim Verification', method: 'multi-source synthesis', desc: 'Synthesise a verdict from parallel scientific and scholarly evidence.', isNew: true },
      { path: '/religion-hub/maqasid', name: 'Maqasid Reasoning Tool', method: 'Maqasid al-Shariah analysis', desc: 'Weigh a claim against the higher objectives of Sharia (preservation of life, intellect, faith…).' },
      { path: '/religion-hub/quran', name: 'Quran Context Explorer', method: 'Asbab al-Nuzul + tafsir', desc: 'Explore a verse in its revelatory and interpretive context.' },
      { path: '/religion-hub/whatsapp', name: 'Religious WhatsApp Analyzer', method: 'forwarded-message scoring', desc: 'Score a forwarded religious message for manipulation and misattribution.' },
      { path: '/religion-hub/tools', name: 'Islamic Tools Index', method: 'all Islamic tools', desc: 'The index of every Islamic verification tool.' },
    ],
  },
  {
    id: 'science',
    emoji: '🔭',
    titleEn: 'Scientific Evidence Tools',
    titleAr: 'أدوات الأدلة العلمية',
    gradient: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
    glow: 'rgba(139,92,246,0.35)',
    badge: '#8b5cf6',
    tools: [
      { path: '/science', name: 'Statistics Lab', method: 'p-hacking · Simpson · base-rate', desc: '33 exercises exposing the most common statistical deceptions.' },
      { path: '/stat-power', name: 'Statistical Power Analyzer', method: 'Cohen’s d · α/β error', desc: 'Evaluate a study’s robustness: sample size and effect size.' },
      { path: '/evidence', name: 'Evidence Hierarchy', method: 'Oxford CEBM levels', desc: 'Rank how strong the evidence behind a claim is, anecdote → meta-analysis.' },
      { path: '/drug-checker', name: 'Drug Claim Checker', method: 'FDA / WHO / PubMed', desc: 'Cross-reference a medication claim against the evidence bases.' },
      { path: '/health-data', name: 'Health Data Dashboard', method: 'WHO + CAPMAS stats', desc: 'Egyptian health dashboards built on verified statistics.' },
      { path: '/medical-life', name: 'Clinical Literacy', method: 'PICO · NNT · CIs', desc: 'Read a research paper like a clinician — the key concepts explained.' },
      { path: '/ux-science', name: 'Dark Patterns & Nudges', method: 'Thaler/Sunstein nudge theory', desc: 'Spot deceptive UX and understand choice architecture.' },
      { path: '/others-search', name: 'Fact-Check Search', method: 'Google FC · ClaimBuster · Snopes', desc: 'Search several fact-check databases in parallel.' },
      { path: '/evidence-search', name: 'Evidence Aggregator', method: '7 APIs + Cohere rerank', desc: 'Search peer-reviewed evidence across OpenAlex, Semantic Scholar, Crossref, EuropePMC, DOAJ and more.', isNew: true },
    ],
  },
  {
    id: 'ai',
    emoji: '✨',
    titleEn: 'AI Tools',
    titleAr: 'أدوات الذكاء الاصطناعي',
    gradient: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)',
    glow: 'rgba(251,191,36,0.35)',
    badge: '#f59e0b',
    tools: [
      { path: '/nvidia-hub', name: 'AI Model Hub', method: 'NVIDIA NIM models', desc: 'Direct access to the specialised NVIDIA NIM models.' },
      { path: '/ai-editor', name: 'AI Interface Builder', method: 'natural-language → UI', desc: 'Generate an investigation interface from a plain-language prompt.' },
      { path: '/chatbot', name: 'AI Assistant', method: 'multi-model rotator', desc: 'A 24/7 assistant with Egyptian context, on a Gemini-first rotator.' },
      { path: '/ai-agents', name: 'AI Research Agents', method: '5 parallel agents', desc: 'Five parallel agents for deep multi-source research.', isNew: true },
      { path: '/prompt-lab', name: 'Prompt Lab', method: 'adversarial prompt testing', desc: 'Craft, test, and save adversarial investigation prompts.' },
      { path: '/god-system', name: 'Deception Analysis', method: '8-layer: claim → verdict', desc: 'Layered analysis: claim → evidence → bias → source → verdict.', isNew: true },
    ],
  },
  {
    id: 'dashboard',
    emoji: '📊',
    titleEn: 'Assessment & Analytics',
    titleAr: 'التقييم والتحليل',
    gradient: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
    glow: 'rgba(59,130,246,0.35)',
    badge: '#3b82f6',
    tools: [
      { path: '/dashboard', name: 'Progress Dashboard', method: 'XP · competency · streak', desc: 'Your progression, competency badges, and streak analytics.' },
      { path: '/assessment', name: 'MIST-20 Assessment', method: 'Maertens et al. 2021', desc: 'The validated psychometric test for misinformation susceptibility.' },
      { path: '/baseline', name: 'Baseline Diagnostic', method: 'pre-intervention immunity', desc: 'Establish your starting cognitive-immunity level.' },
      { path: '/certificate', name: 'Immunity Certificate', method: 'verifiable, self-issued', desc: 'A verifiable certificate of cognitive-immunity competency (methodology-published).' },
      { path: '/self-test-protocol', name: 'Monthly Re-Test', method: 'spaced-repetition re-eval', desc: 'A spaced-repetition protocol to re-check your immunity.' },
      { path: '/inoculation-passport', name: 'Immunity Passport', method: '6-domain competency', desc: 'An evolving competency record across six immunity domains.' },
      { path: '/supervisor', name: 'Cohort Console', method: 'cohort analytics + compliance', desc: 'Institutional analytics: cohort effectiveness and compliance.', isNew: true },
      { path: '/dashboard/cohort', name: 'Cohort Efficacy Dashboard', method: 'Cohen’s dz · 95% CI', desc: 'Pre/post effect sizes across a cohort, with the distrust-drift guard.' },
      { path: '/instruments/mist', name: 'MIST-20 Instrument', method: 'Maertens et al. 2021', desc: 'The raw validated MIST-20 misinformation-susceptibility instrument.' },
      { path: '/passport', name: 'Inoculation Passport', method: 'competency record', desc: 'Your evolving inoculation passport across the six immunity domains.' },
    ],
  },
  {
    id: 'community',
    emoji: '🌍',
    titleEn: 'Community & Live Tracking',
    titleAr: 'المجتمع والتتبّع الحيّ',
    gradient: 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)',
    glow: 'rgba(16,185,129,0.3)',
    badge: '#10b981',
    tools: [
      { path: '/family-kit', name: 'Family Toolkit', method: 'age-adapted media literacy', desc: 'Media-literacy tools adapted by age for the whole household.' },
      { path: '/womens-shield', name: 'Women’s Defense Guide', method: 'gender-targeted manipulation', desc: 'Manipulation targeting women — beauty, health, marriage misinformation.' },
      { path: '/mens-shield', name: 'Men’s Defense Guide', method: 'male-targeted scams', desc: 'Misinformation targeting men — financial scams, radicalisation, health myths.' },
      { path: '/connect', name: 'Community Network', method: 'peer fact-checking', desc: 'Peer-to-peer fact-checking cooperation.' },
      { path: '/global-alliance', name: 'Global Alliance', method: 'cross-border fact-checking', desc: 'International fact-checking partnerships and tracking.' },
      { path: '/threat-map', name: 'Threat Map', method: 'geographic severity heatmap', desc: 'Geographic tracking of Egyptian misinformation with severity heatmaps.', isNew: true },
      { path: '/threat-briefing', name: 'Daily Threat Briefing', method: 'top-campaigns digest', desc: 'A daily digest of the top active campaigns.', isNew: true },
      { path: '/rumor-heatmap', name: 'Spread Heatmap', method: 'geo/temporal diffusion', desc: 'How a viral rumour spreads in space and time.', isNew: true },
      { path: '/trend-hunter', name: 'Trend Radar', method: 'live Google Trends + archive', desc: 'Live Egypt trends plus a documented misinfo archive.', isNew: true },
      { path: '/misinfo-atlas', name: 'Misinformation Atlas', method: '8-layer taxonomy + archive', desc: 'A taxonomy and historical archive of debunked Egyptian claims.' },
    ],
  },
  {
    id: 'platform',
    emoji: '📖',
    titleEn: 'Platform & Resources',
    titleAr: 'المنصة والموارد',
    gradient: 'linear-gradient(135deg, #64748b 0%, #475569 100%)',
    glow: 'rgba(100,116,139,0.3)',
    badge: '#94a3b8',
    tools: [
      { path: '/platform-guide', name: 'How-To Guide', method: 'interactive walkthrough', desc: 'How to use everything — an interactive walkthrough.' },
      { path: '/competition-demo', name: 'Live AI Demo', method: 'engine showcase', desc: 'A showcase of the AI engines in action.' },
      { path: '/master-roadmap', name: '144-Day Roadmap', method: 'full journey map', desc: 'Your complete cognitive-immunisation journey, mapped.' },
      { path: '/why-us', name: 'The Evidence Base', method: 'peer-reviewed methodology', desc: 'The peer-reviewed evidence behind the platform’s methods.' },
      { path: '/impact', name: 'Measured Impact', method: 'effect sizes', desc: 'Evidence of effectiveness, reported with effect sizes.' },
      { path: '/philosophy', name: 'Philosophy', method: 'the One-Law', desc: 'The intellectual and ethical foundation of EAL.' },
      { path: '/about', name: 'About', method: '', desc: 'Our team, mission, and origin story.' },
      { path: '/open-source', name: 'Open Source', method: 'code · data · research', desc: 'Our code, data, and research — open access.' },
      { path: '/sources', name: 'Bibliography', method: 'peer-reviewed references', desc: 'The full bibliography and academic references.' },
      { path: '/tools-download', name: 'Offline Toolkits', method: 'PDFs + extension', desc: 'Downloadable toolkits, PDFs, and the browser extension.' },
      { path: '/the-descent', name: 'The Descent', method: 'immersive scrollytelling', desc: 'A cinematic, scroll-driven journey into how deception is built — and defended.', isNew: true },
      { path: '/', name: 'Home', method: 'platform entry', desc: 'The platform home page.' },
      { path: '/welcome', name: 'Welcome / Project Anatomy', method: 'orientation', desc: 'What this platform is and how it all fits together.' },
      { path: '/onboarding', name: 'Tour / Onboarding', method: 'guided first run', desc: 'A guided tour of the platform for first-time users.' },
      { path: '/guide', name: 'Quick Guide', method: 'orientation', desc: 'A short guide to getting started.' },
      { path: '/engines-guide', name: 'Master the Engines', method: 'engine deep-dive', desc: 'How each verification engine works and when to use it.' },
      { path: '/explore', name: 'Explore All Tools', method: 'this catalog', desc: 'The full searchable catalog of every tool and page.' },
      { path: '/curriculum', name: 'Curriculum Home', method: 'journey index', desc: 'The entry point to the full multi-phase curriculum.' },
      { path: '/features', name: 'Features Overview', method: 'capability map', desc: 'An overview of the platform’s capabilities.' },
      { path: '/demo', name: 'Demo Dashboard', method: 'showcase', desc: 'A demo dashboard of the platform in action.' },
      { path: '/media-library', name: 'Media Library', method: 'assets + clips', desc: 'A library of media assets and example clips.' },
      { path: '/language-select', name: 'Language Select', method: 'EN / عربي', desc: 'Choose your language and dialect.' },
      { path: '/report', name: 'Report a Claim', method: 'public submission', desc: 'Submit a claim or campaign for review.' },
      { path: '/transparency', name: 'Transparency', method: 'governance', desc: 'How the platform is governed and held accountable.' },
      { path: '/methodology', name: 'Methodology', method: 'how we verify', desc: 'The published methodology behind every verdict.' },
      { path: '/corrections', name: 'Corrections Log', method: 'public corrections', desc: 'Every correction we have made, on the record.' },
      { path: '/project-vision', name: 'Project Vision', method: 'mission', desc: 'The long-term vision for the project.' },
      { path: '/publishing-plan', name: 'Publishing Plan', method: 'roadmap', desc: 'The plan for publishing content and research.' },
      { path: '/defense-main-plan', name: 'Defense Main Plan', method: 'strategy', desc: 'The master defensive strategy of the platform.' },
      { path: '/presentation', name: 'Presentation', method: 'deck', desc: 'The platform presentation deck.' },
      { path: '/pricing-presentation', name: 'Pricing', method: 'plans', desc: 'Pricing and plan options.' },
      { path: '/trailer', name: 'Trailer', method: 'intro video', desc: 'A short trailer introducing the platform.' },
    ],
  },
  {
    id: 'mentalhealth',
    emoji: '💚',
    titleEn: 'Mental Health & Wellbeing',
    titleAr: 'الصحة النفسية والعافية',
    gradient: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
    glow: 'rgba(16,185,129,0.35)',
    badge: '#10b981',
    tools: [
      { path: '/mental-health', name: 'Mental Health Literacy', method: 'WHO mhGAP · 14-day', desc: 'A 14-day evidence-based mental-health education program.' },
      { path: '/mental-health/depression', name: 'Depression Screening', method: 'PHQ-9 + crisis lines', desc: 'Validated depression screening with Egyptian crisis support and safety steps.' },
      { path: '/knowledge-graph', name: 'Knowledge Graph', method: 'concept relationships', desc: 'An interactive map of concepts across all immunity domains.' },
      { path: '/comb-tracker', name: 'Behavior Tracker', method: 'COM-B (Michie et al.)', desc: 'Track behaviour change via Capability-Opportunity-Motivation.' },
      { path: '/effect-dashboard', name: 'Effect-Size Dashboard', method: 'Cohen’s d ≥ 0.52', desc: 'Quantify your learning impact against the medium-effect threshold.' },
      { path: '/transformation', name: 'Pre/Post Gains', method: 'statistical pre/post', desc: 'Visualise your measurable gains with statistical evidence.' },
      { path: '/six-layers', name: 'ADDIE+ Framework', method: '6-layer instructional design', desc: 'The extended ADDIE instructional-design framework behind the curriculum.' },
    ],
  },
];

const STATS = [
  { value: `${CATEGORIES.reduce((n, c) => n + c.tools.length, 0)}`, label: 'Tools & Pages' },
  { value: '86', label: 'API Routes' },
  { value: `${CATEGORIES.length}`, label: 'Categories' },
  { value: '140-day', label: 'Cognition Course' },
];

const CATEGORY_ALL = 'all';

export default function ExplorePage() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState(CATEGORY_ALL);

  const q = search.toLowerCase().trim();

  const filteredCategories = useMemo(() => {
    return CATEGORIES
      .filter(cat => activeCategory === CATEGORY_ALL || cat.id === activeCategory)
      .map(cat => ({
        ...cat,
        tools: q
          ? cat.tools.filter(t =>
              t.name.toLowerCase().includes(q) ||
              (t.method ?? '').toLowerCase().includes(q) ||
              t.desc.toLowerCase().includes(q) ||
              t.path.toLowerCase().includes(q)
            )
          : cat.tools,
      }))
      .filter(cat => cat.tools.length > 0);
  }, [q, activeCategory]);

  const totalVisible = filteredCategories.reduce((acc, c) => acc + c.tools.length, 0);

  const catColors: Record<string, string> = {
    curriculum: '99,102,241', defense: '245,158,11', forensics: '6,182,212',
    islamic: '16,185,129', science: '139,92,246', ai: '251,191,36',
    dashboard: '59,130,246', community: '16,185,129', platform: '100,116,139',
    mentalhealth: '16,185,129',
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Cairo:wght@400;600;700;900&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #020617; }
        .ex-root { min-height: 100vh; background: #020617; color: #e2e8f0; font-family: 'Inter', system-ui, sans-serif; padding-bottom: 6rem; }
        .ex-hero { position: relative; overflow: hidden; padding: 5rem 1.5rem 4rem; text-align: center; }
        .ex-hero-bg { position: absolute; inset: 0; background: linear-gradient(135deg, #020617 0%, #0f172a 40%, #1e1b4b 70%, #020617 100%); z-index: 0; }
        .ex-hero-grid { position: absolute; inset: 0; z-index: 1; background-image: linear-gradient(rgba(148,163,184,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.04) 1px, transparent 1px); background-size: 40px 40px; }
        .ex-hero-glow { position: absolute; inset: 0; z-index: 1; background: radial-gradient(ellipse 70% 50% at 20% 20%, rgba(99,102,241,0.25) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 80% 80%, rgba(6,182,212,0.18) 0%, transparent 60%), radial-gradient(ellipse 50% 60% at 50% 50%, rgba(139,92,246,0.1) 0%, transparent 70%); }
        .ex-hero-orb1 { position: absolute; width: 600px; height: 600px; top: -200px; left: -200px; z-index: 1; background: radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%); border-radius: 50%; animation: orbFloat1 8s ease-in-out infinite; }
        .ex-hero-orb2 { position: absolute; width: 500px; height: 500px; bottom: -150px; right: -150px; z-index: 1; background: radial-gradient(circle, rgba(6,182,212,0.1) 0%, transparent 70%); border-radius: 50%; animation: orbFloat2 10s ease-in-out infinite; }
        @keyframes orbFloat1 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(30px,-20px); } }
        @keyframes orbFloat2 { 0%,100% { transform: translate(0,0); } 50% { transform: translate(-20px,25px); } }
        .ex-hero-content { position: relative; z-index: 2; max-width: 900px; margin: 0 auto; }
        .ex-badge { display: inline-flex; align-items: center; gap: 0.4rem; background: rgba(99,102,241,0.15); border: 1px solid rgba(99,102,241,0.4); color: #a5b4fc; padding: 0.35rem 1.1rem; border-radius: 999px; font-size: 0.78rem; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; margin-bottom: 1.5rem; animation: fadeInDown 0.6s ease both; }
        @keyframes fadeInDown { from { opacity:0; transform:translateY(-10px); } to { opacity:1; transform:translateY(0); } }
        .ex-title { font-size: clamp(2.2rem, 6vw, 4rem); font-weight: 900; line-height: 1.08; background: linear-gradient(135deg, #f8fafc 0%, #c7d2fe 40%, #7dd3fc 80%, #a78bfa 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; margin-bottom: 0.75rem; animation: fadeInDown 0.6s 0.1s ease both; }
        .ex-subtitle { font-size: 1.05rem; color: #94a3b8; margin-bottom: 0.5rem; animation: fadeInDown 0.6s 0.2s ease both; }
        .ex-subtitle-ar { font-family: 'Cairo', sans-serif; font-size: 1.1rem; color: #7dd3fc; opacity: 0.75; direction: rtl; margin-bottom: 2rem; animation: fadeInDown 0.6s 0.25s ease both; }
        .ex-stats { display: flex; justify-content: center; flex-wrap: wrap; gap: 1rem 2rem; animation: fadeInDown 0.6s 0.3s ease both; }
        .ex-stat { display: flex; align-items: center; gap: 0.5rem; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 999px; padding: 0.4rem 1.1rem; }
        .ex-stat-value { font-size: 1.05rem; font-weight: 800; background: linear-gradient(135deg, #7dd3fc, #c4b5fd); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .ex-stat-label { font-size: 0.78rem; color: #64748b; }
        .ex-controls { max-width: 1200px; margin: 0 auto; padding: 2.5rem 1.25rem 1rem; }
        .ex-search-wrap { position: relative; margin-bottom: 1.5rem; }
        .ex-search-icon { position: absolute; left: 1.1rem; top: 50%; transform: translateY(-50%); font-size: 1rem; color: #475569; pointer-events: none; }
        .ex-search { width: 100%; padding: 0.95rem 3.5rem 0.95rem 3rem; background: rgba(15,23,42,0.85); border: 1px solid rgba(148,163,184,0.12); border-radius: 14px; color: #e2e8f0; font-size: 1rem; font-family: 'Inter', sans-serif; outline: none; backdrop-filter: blur(16px); transition: border-color 0.2s, box-shadow 0.2s; }
        .ex-search::placeholder { color: #475569; }
        .ex-search:focus { border-color: rgba(99,102,241,0.5); box-shadow: 0 0 0 4px rgba(99,102,241,0.1), 0 0 30px rgba(99,102,241,0.08); }
        .ex-search-clear { position: absolute; right: 0.85rem; top: 50%; transform: translateY(-50%); background: rgba(99,102,241,0.2); border: none; color: #a5b4fc; border-radius: 8px; padding: 0.25rem 0.6rem; cursor: pointer; font-size: 0.75rem; font-weight: 600; transition: background 0.15s; }
        .ex-search-clear:hover { background: rgba(99,102,241,0.35); }
        .ex-tabs { display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 0.5rem; }
        .ex-tab { display: flex; align-items: center; gap: 0.3rem; padding: 0.45rem 0.95rem; border-radius: 999px; font-size: 0.8rem; font-weight: 600; border: 1px solid rgba(255,255,255,0.1); background: rgba(255,255,255,0.03); color: #94a3b8; cursor: pointer; transition: all 0.18s ease; white-space: nowrap; }
        .ex-tab:hover { background: rgba(255,255,255,0.08); border-color: rgba(255,255,255,0.2); color: #e2e8f0; }
        .ex-tab.active { background: rgba(99,102,241,0.2); border-color: rgba(99,102,241,0.5); color: #a5b4fc; box-shadow: 0 0 16px rgba(99,102,241,0.15); }
        .ex-main { max-width: 1200px; margin: 0 auto; padding: 1rem 1.25rem 2rem; }
        .ex-cat { margin-bottom: 3.5rem; animation: catFadeIn 0.5s ease both; }
        @keyframes catFadeIn { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
        .ex-cat-header { display: flex; align-items: flex-start; gap: 1rem; margin-bottom: 1.5rem; padding-bottom: 1rem; border-bottom: 1px solid rgba(255,255,255,0.06); position: relative; }
        .ex-cat-icon { width: 52px; height: 52px; border-radius: 14px; display: flex; align-items: center; justify-content: center; font-size: 1.6rem; flex-shrink: 0; }
        .ex-cat-text { flex: 1; }
        .ex-cat-en { font-size: 1.25rem; font-weight: 800; color: #f1f5f9; margin-bottom: 0.2rem; }
        .ex-cat-ar { font-family: 'Cairo', sans-serif; font-size: 0.9rem; direction: rtl; opacity: 0.7; }
        .ex-cat-count { font-size: 0.75rem; color: #64748b; margin-left: auto; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.08); padding: 0.25rem 0.65rem; border-radius: 999px; white-space: nowrap; align-self: flex-start; }
        .ex-tools-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 0.85rem; }
        .ex-card { position: relative; overflow: hidden; background: rgba(15,23,42,0.7); border: 1px solid rgba(148,163,184,0.09); border-radius: 14px; padding: 1rem 1.1rem; text-decoration: none; transition: transform 0.22s ease, border-color 0.22s ease, box-shadow 0.22s ease, background 0.22s ease; backdrop-filter: blur(12px); display: block; cursor: pointer; }
        .ex-card:hover { transform: translateY(-4px); box-shadow: 0 12px 40px rgba(0,0,0,0.35), 0 0 30px rgba(var(--card-rgb), 0.15); background: rgba(15,23,42,0.9); }
        .ex-card-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.55rem; }
        .ex-card-badge { display: inline-flex; align-items: center; font-size: 0.65rem; font-weight: 700; padding: 0.18rem 0.55rem; border-radius: 999px; letter-spacing: 0.04em; text-transform: uppercase; color: #fff; opacity: 0.9; }
        .ex-card-new { background: linear-gradient(135deg, #f59e0b, #ef4444); color: #fff; font-size: 0.6rem; font-weight: 800; padding: 0.18rem 0.5rem; border-radius: 999px; letter-spacing: 0.05em; text-transform: uppercase; animation: pulse 2s ease-in-out infinite; }
        @keyframes pulse { 0%,100% { box-shadow: 0 0 0 0 rgba(245,158,11,0.4); } 50% { box-shadow: 0 0 0 6px rgba(245,158,11,0); } }
        .ex-card-name { font-size: 0.92rem; font-weight: 700; color: #f1f5f9; margin-bottom: 0.18rem; line-height: 1.3; position: relative; }
        .ex-card-method { font-size: 0.68rem; font-weight: 600; letter-spacing: 0.02em; margin-bottom: 0.32rem; position: relative; opacity: 0.85; }
        .ex-card-desc { font-size: 0.78rem; color: #64748b; line-height: 1.5; position: relative; }
        .ex-card-path { font-size: 0.68rem; color: #334155; margin-top: 0.5rem; font-family: monospace; position: relative; }
        .ex-card:hover .ex-card-path { color: #475569; }
        .ex-card:hover .ex-card-desc { color: #94a3b8; }
        .ex-card:hover .ex-card-name { color: #fff; }
        .ex-card-line { position: absolute; bottom: 0; left: 0; right: 0; height: 2px; border-radius: 0 0 14px 14px; opacity: 0; transition: opacity 0.25s; }
        .ex-card:hover .ex-card-line { opacity: 1; }
        .ex-no-results { text-align: center; padding: 5rem 1rem; color: #475569; }
        .ex-no-results-emoji { font-size: 3.5rem; margin-bottom: 1rem; }
        .ex-no-results-text { font-size: 1rem; }
        @media (max-width: 768px) { .ex-hero { padding: 3.5rem 1rem 3rem; } .ex-tools-grid { grid-template-columns: 1fr; } .ex-controls, .ex-main { padding-left: 0.85rem; padding-right: 0.85rem; } .ex-title { font-size: 2.2rem; } .ex-stat-label { display: none; } }
        ::-webkit-scrollbar { width: 6px; } ::-webkit-scrollbar-track { background: #0f172a; } ::-webkit-scrollbar-thumb { background: #334155; border-radius: 3px; }
      `}</style>

      <div className="ex-root">
        <header className="ex-hero">
          <div className="ex-hero-bg" />
          <div className="ex-hero-grid" />
          <div className="ex-hero-glow" />
          <div className="ex-hero-orb1" />
          <div className="ex-hero-orb2" />
          <div className="ex-hero-content">
            <div className="ex-badge">🗺️ Complete Platform Map</div>
            <h1 className="ex-title">Egyptian Awareness Library</h1>
            <p className="ex-subtitle">Every tool and page on the platform — named for what it does and the method behind it.</p>
            <p className="ex-subtitle-ar">كل أداة وكل صفحة على المنصّة — باسمٍ يوضّح وظيفتها والمنهج العلمي خلفها</p>
            <div className="ex-stats">
              {STATS.map(s => (
                <div key={s.label} className="ex-stat">
                  <span className="ex-stat-value">{s.value}</span>
                  <span className="ex-stat-label">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </header>

        <div className="ex-controls">
          <div className="ex-search-wrap">
            <span className="ex-search-icon">🔎</span>
            <input
              className="ex-search"
              type="text"
              placeholder="Search the tools… (e.g. 'hadith', 'deepfake', 'debate', 'bias', 'evidence')"
              value={search}
              onChange={e => setSearch(e.target.value)}
              aria-label="Search all platform tools"
            />
            {search ? (
              <button className="ex-search-clear" onClick={() => setSearch('')}>✕ Clear</button>
            ) : null}
          </div>
          <div className="ex-tabs">
            <button className={`ex-tab${activeCategory === CATEGORY_ALL ? ' active' : ''}`} onClick={() => setActiveCategory(CATEGORY_ALL)}>
              🌐 All
            </button>
            {CATEGORIES.map(cat => (
              <button key={cat.id} className={`ex-tab${activeCategory === cat.id ? ' active' : ''}`} onClick={() => setActiveCategory(cat.id)}>
                {cat.emoji} {cat.titleEn.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        <main className="ex-main">
          {filteredCategories.length === 0 ? (
            <div className="ex-no-results">
              <div className="ex-no-results-emoji">🔍</div>
              <div className="ex-no-results-text">No tools match &quot;<strong>{search}</strong>&quot;. Try a different keyword.</div>
            </div>
          ) : (
            filteredCategories.map((cat, catIdx) => {
              const rgb = catColors[cat.id] || '99,102,241';
              return (
                <div key={cat.id} className="ex-cat" style={{ animationDelay: `${catIdx * 0.05}s` }}>
                  <div className="ex-cat-header">
                    <div className="ex-cat-icon" style={{ background: cat.gradient, boxShadow: `0 4px 20px ${cat.glow}` }}>{cat.emoji}</div>
                    <div className="ex-cat-text">
                      <div className="ex-cat-en">{cat.titleEn}</div>
                      <div className="ex-cat-ar" style={{ color: cat.badge }}>{cat.titleAr}</div>
                    </div>
                    <div className="ex-cat-count">{cat.tools.length} tools</div>
                  </div>
                  <div className="ex-tools-grid">
                    {cat.tools.map((tool) => (
                      <Link key={tool.path} href={tool.path} className="ex-card" style={{ ['--card-rgb' as string]: rgb }}>
                        <div className="ex-card-line" style={{ background: cat.gradient }} />
                        <div className="ex-card-top">
                          <span className="ex-card-badge" style={{ background: cat.gradient }}>{cat.emoji} {cat.titleEn.split(' ')[0]}</span>
                          {tool.isNew && <span className="ex-card-new">🔥 NEW</span>}
                        </div>
                        <div className="ex-card-name">{tool.name}</div>
                        {tool.method ? <div className="ex-card-method" style={{ color: cat.badge }}>· {tool.method}</div> : null}
                        <div className="ex-card-desc">{tool.desc}</div>
                        <div className="ex-card-path">{tool.path}</div>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })
          )}
          {filteredCategories.length > 0 && (
            <p style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.78rem', color: '#334155' }}>
              Showing {totalVisible} tools across {filteredCategories.length} categories{search ? ` matching "${search}"` : ''}
            </p>
          )}
        </main>
        <PageNavigation currentPath="/explore" />
      </div>
    </>
  );
}
