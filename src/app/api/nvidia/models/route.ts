import { NextResponse } from "next/server";

/**
 * NVIDIA Models List API Route
 * ════════════════════════════════════════════════════
 * GET /api/nvidia/models
 *
 * Returns the list of available NVIDIA NIM models with metadata.
 * Used by the NVIDIA Hub page to display model cards.
 */

// NOTE: no `runtime = "edge"` — the edge runtime hangs indefinitely in this local
// dev setup (HTTP 000). This route only returns static JSON, so it runs on the
// default Node runtime like the sibling nvidia routes (content-safety/chat/complete).

const NVIDIA_MODELS = [
  {
    id: "nvidia/nemotron-3-ultra-550b-a55b",
    name: "Nemotron-3 Ultra 550B",
    provider: "NVIDIA",
    description: "Flagship 550B-parameter reasoning engine. Powers GOD-System, Debate-Sim, Paper-Auditor, and all complex analysis tasks.",
    descriptionAr: "محرك الاستدلال الرائد بـ 550 مليار معامل. يشغّل نظام GOD، محاكي المناظرة، مدقق الأوراق البحثية.",
    category: "reasoning",
    parameters: "550B (55B active MoE)",
    accentColor: "#76B900",
    icon: "brain",
    primary: true,
  },
  {
    id: "deepseek-ai/deepseek-v4-flash",
    name: "DeepSeek V4 Flash",
    provider: "DeepSeek AI",
    description: "Lightning-fast inference engine. Powers Chatbot, Fallacy-Engine, Quick Debunks, and real-time interaction.",
    descriptionAr: "محرك استدلال فائق السرعة. يشغّل الشات بوت، محرك المغالطات، التفنيد السريع.",
    category: "fast-inference",
    parameters: "MoE Architecture",
    accentColor: "#00D4FF",
    icon: "zap",
    primary: false,
  },
  {
    id: "deepseek-ai/deepseek-v4-pro",
    name: "DeepSeek V4 Pro",
    provider: "DeepSeek AI",
    description: "Deep reasoning model. Powers Scientific Literacy modules, Complex Analysis, and research-grade evaluation.",
    descriptionAr: "نموذج الاستدلال العميق. يشغّل وحدات محو الأمية العلمية والتحليل المعقد.",
    category: "deep-reasoning",
    parameters: "MoE Architecture",
    accentColor: "#9945FF",
    icon: "cpu",
    primary: false,
  },
  {
    id: "nvidia/nemotron-3.5-content-safety",
    name: "Nemotron-3.5 Content Safety",
    provider: "NVIDIA",
    description: "Real-time content moderation across 12 languages including Arabic. Sub-5ms latency for safe/unsafe classification.",
    descriptionAr: "تصفية المحتوى في الوقت الفعلي عبر 12 لغة بما فيها العربية. زمن استجابة أقل من 5 مللي ثانية.",
    category: "safety",
    parameters: "4B",
    accentColor: "#FF6B35",
    icon: "shield",
    primary: false,
  },
  {
    id: "nvidia/synthetic-video-detector",
    name: "Synthetic Video Detector",
    provider: "NVIDIA",
    description: "Enterprise-grade deepfake and AI-generated video detection. Powers the DeepReal forensic module.",
    descriptionAr: "كشف الفيديوهات المزيفة والمولّدة بالذكاء الاصطناعي على مستوى المؤسسات.",
    category: "forensic",
    parameters: "Specialized",
    accentColor: "#FF3366",
    icon: "eye",
    primary: false,
  },
  {
    id: "google/gemma-4-31b-it",
    name: "Gemma 4 31B",
    provider: "Google",
    description: "Versatile reasoning model from Google. Multi-task analysis and reasoning fallback.",
    descriptionAr: "نموذج استدلال متعدد الاستخدامات من جوجل. تحليل متعدد المهام واحتياطي الاستدلال.",
    category: "reasoning",
    parameters: "31B",
    accentColor: "#4285F4",
    icon: "sparkles",
    primary: false,
  },
  {
    id: "mistralai/mistral-medium-3.5-128b",
    name: "Mistral Medium 3.5 128B",
    provider: "Mistral AI",
    description: "Powerful coding and structured output model. 128B parameters with excellent JSON support.",
    descriptionAr: "نموذج قوي للبرمجة والمخرجات المنظمة. 128 مليار معامل مع دعم ممتاز لـ JSON.",
    category: "coding",
    parameters: "128B",
    accentColor: "#FF7000",
    icon: "code",
    primary: false,
  },
  {
    id: "moonshotai/kimi-k2.6",
    name: "Kimi K2.6",
    provider: "Moonshot AI",
    description: "Multimodal analysis model. Vision + text understanding for comprehensive content analysis.",
    descriptionAr: "نموذج تحليل متعدد الوسائط. فهم الرؤية والنص لتحليل شامل للمحتوى.",
    category: "multimodal",
    parameters: "MoE",
    accentColor: "#00C9A7",
    icon: "layers",
    primary: false,
  },
  {
    id: "z-ai/glm-5.1",
    name: "GLM 5.1",
    provider: "Zhipu AI",
    description: "Agentic AI workflows model. Function calling and tool-use specialist.",
    descriptionAr: "نموذج سير العمل الذكي. متخصص في استدعاء الوظائف واستخدام الأدوات.",
    category: "agentic",
    parameters: "Large",
    accentColor: "#6366F1",
    icon: "bot",
    primary: false,
  },
];

export async function GET() {
  return NextResponse.json({
    models: NVIDIA_MODELS,
    totalModels: NVIDIA_MODELS.length,
    baseUrl: "https://integrate.api.nvidia.com/v1",
    provider: "NVIDIA NIM",
    configured: !!process.env.NVIDIA_API_KEY,
  });
}
