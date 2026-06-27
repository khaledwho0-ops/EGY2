/**
 * EAL xAPI Statement Engine
 * 
 * Implements xAPI (Experience API / Tin Can) 1.0.3 statement emission
 * as required by 3.txt §5.5, §12 (SCORM 1.2/2004 + xAPI).
 * 
 * Verbs: experienced | passed | failed | mastered
 * Objects: route URLs (e.g. /curriculum/phase0, /fallacy-engine, etc.)
 * Results: score + duration + completion + success
 * 
 * Persists to:
 * 1. localStorage (offline-first for the user's device)
 * 2. /api/supervisor/lrs (server-side LRS for Supervisor Dashboard)
 * 3. supervisor-dashboard.tsx (real-time telemetry via React context)
 * 
 * @see https://xapi.com/statements-101/
 * @see 3.txt §5.5 — Telemetry & Adaptive Difficulty
 * @see 3.txt §12 — SCORM 1.2/2004 + xAPI
 */

// ─── Types ─────────────────────────────────────────────────
export type XAPIVerb = 'experienced' | 'passed' | 'failed' | 'mastered' | 'launched' | 'progressed';

export interface XAPIScore {
  raw: number;       // Raw score (0–max)
  min: number;       // Minimum possible
  max: number;       // Maximum possible
  scaled: number;    // Normalized 0.0–1.0
}

export interface XAPIResult {
  score?: XAPIScore;
  completion: boolean;
  success: boolean;
  duration?: string; // ISO 8601 duration: e.g. "PT4M30S"
  response?: string; // User's final answer or response summary
  extensions?: Record<string, unknown>; // EAL-specific extensions
}

export interface XAPIObject {
  id: string;        // Activity IRI (e.g. https://eal.platform/activities/fallacy-engine)
  definition: {
    name: { en?: string; ar?: string };
    description: { en?: string; ar?: string };
    type: 'http://adlnet.gov/expapi/activities/assessment'
       | 'http://adlnet.gov/expapi/activities/lesson'
       | 'http://adlnet.gov/expapi/activities/module'
       | 'http://adlnet.gov/expapi/activities/course'
       | 'http://id.tincanapi.com/activitytype/exercise';
    moreInfo?: string;
  };
}

export interface XAPIStatement {
  id: string;           // UUID v4
  actor: {
    objectType: 'Agent';
    name: string;
    mbox: string;       // mailto:userId@eal.platform
    account?: { homePage: string; name: string };
  };
  verb: {
    id: string;         // IRI for verb
    display: { en: string; ar?: string };
  };
  object: XAPIObject;
  result?: XAPIResult;
  context?: {
    registration?: string;  // Course/curriculum registration UUID
    contextActivities?: {
      parent?: XAPIObject[];
      grouping?: XAPIObject[];
    };
    extensions?: Record<string, unknown>;
  };
  timestamp: string;    // ISO 8601
  stored?: string;      // ISO 8601 (set by LRS)
  authority?: { objectType: 'Agent'; name: string; mbox: string };
}

// ─── Verb IRIs (xAPI standard) ──────────────────────────────
const VERB_IRIS: Record<XAPIVerb, { id: string; en: string; ar: string }> = {
  experienced: {
    id: 'http://adlnet.gov/expapi/verbs/experienced',
    en: 'experienced',
    ar: 'مرّ بتجربة'
  },
  passed: {
    id: 'http://adlnet.gov/expapi/verbs/passed',
    en: 'passed',
    ar: 'اجتاز'
  },
  failed: {
    id: 'http://adlnet.gov/expapi/verbs/failed',
    en: 'failed',
    ar: 'لم يجتز'
  },
  mastered: {
    id: 'http://adlnet.gov/expapi/verbs/mastered',
    en: 'mastered',
    ar: 'أتقن'
  },
  launched: {
    id: 'http://adlnet.gov/expapi/verbs/launched',
    en: 'launched',
    ar: 'أطلق'
  },
  progressed: {
    id: 'http://adlnet.gov/expapi/verbs/progressed',
    en: 'progressed',
    ar: 'تقدّم'
  }
};

// ─── EAL Activity Registry (from 3.txt route list) ──────────
export const EAL_ACTIVITIES: Record<string, XAPIObject> = {
  '/curriculum/phase0': {
    id: 'https://eal.platform/activities/curriculum/phase0',
    definition: {
      name: { en: 'Phase 0: Psychological Calibration', ar: 'المرحلة 0: التهيئة النفسية' },
      description: { en: '28-day cognitive baseline and calibration program', ar: 'برنامج تأسيس معرفي 28 يوماً' },
      type: 'http://adlnet.gov/expapi/activities/module',
    }
  },
  '/curriculum/phase1': {
    id: 'https://eal.platform/activities/curriculum/phase1',
    definition: {
      name: { en: 'Phase 1: Foundational Cognition', ar: 'المرحلة 1: الإدراك الأساسي' },
      description: { en: '100 logical fallacies + 40 logic constructs + 30 heuristics', ar: '100 مغالطة منطقية + 40 بنية منطقية + 30 تجريدة' },
      type: 'http://adlnet.gov/expapi/activities/module',
    }
  },
  '/curriculum/phase2': {
    id: 'https://eal.platform/activities/curriculum/phase2',
    definition: {
      name: { en: 'Phase 2: Scientific Literacy', ar: 'المرحلة 2: الثقافة العلمية' },
      description: { en: '100 scientific fallacies + GOD-System 7-layer protocol', ar: '100 مغالطة علمية + بروتوكول GOD المكون من 7 طبقات' },
      type: 'http://adlnet.gov/expapi/activities/module',
    }
  },
  '/curriculum/phase3': {
    id: 'https://eal.platform/activities/curriculum/phase3',
    definition: {
      name: { en: 'Phase 3: Islamic Literacy', ar: 'المرحلة 3: الثقافة الإسلامية' },
      description: { en: '100 Islamic fallacies + 50 Islamic fundamentals', ar: '100 مغالطة إسلامية + 50 أساساً إسلامياً' },
      type: 'http://adlnet.gov/expapi/activities/module',
    }
  },
  '/curriculum/phase4': {
    id: 'https://eal.platform/activities/curriculum/phase4',
    definition: {
      name: { en: 'Phase 4: Inoculation & Live Defense', ar: 'المرحلة 4: التحصين والدفاع الحي' },
      description: { en: 'Live battle-card sprint through all 38 platform nodes', ar: 'جولة دفاعية حية عبر 38 عقدة في المنصة' },
      type: 'http://adlnet.gov/expapi/activities/module',
    }
  },
  '/fallacy-engine': {
    id: 'https://eal.platform/activities/fallacy-engine',
    definition: {
      name: { en: 'Fallacy Engine', ar: 'محرك المغالطات' },
      description: { en: '3-tier Regex→TF-IDF→LLM fallacy detection', ar: 'كشف المغالطات بثلاث طبقات' },
      type: 'http://adlnet.gov/expapi/activities/assessment',
    }
  },
  '/reaction-test': {
    id: 'https://eal.platform/activities/reaction-test',
    definition: {
      name: { en: 'Reaction Test', ar: 'اختبار ردة الفعل' },
      description: { en: 'Emotional impulsivity latency measurement', ar: 'قياس الاندفاع العاطفي' },
      type: 'http://id.tincanapi.com/activitytype/exercise',
    }
  },
  '/paper-auditor': {
    id: 'https://eal.platform/activities/paper-auditor',
    definition: {
      name: { en: 'Paper Auditor', ar: 'مدقق الأبحاث' },
      description: { en: 'Scientific paper p-hacking and methodology audit', ar: 'تدقيق الأبحاث العلمية للكشف عن التلاعب الإحصائي' },
      type: 'http://adlnet.gov/expapi/activities/assessment',
    }
  },
  '/swarm-debate': {
    id: 'https://eal.platform/activities/swarm-debate',
    definition: {
      name: { en: 'Socratic Swarm Debate', ar: 'نقاش السرب السقراطي' },
      description: { en: '5 simultaneous AI debaters — Socratic defense final', ar: '5 محاورين بالذكاء الاصطناعي — الدفاع السقراطي النهائي' },
      type: 'http://adlnet.gov/expapi/activities/assessment',
    }
  },
  '/inoculation-passport': {
    id: 'https://eal.platform/activities/inoculation-passport',
    definition: {
      name: { en: 'Inoculation Passport', ar: 'جواز التحصين' },
      description: { en: 'Level 1–5 cognitive immunity passport', ar: 'جواز الحصانة المعرفية المستوى 1–5' },
      type: 'http://adlnet.gov/expapi/activities/lesson',
    }
  },
  '/religion-hub/tools/hadith-check': {
    id: 'https://eal.platform/activities/hadith-check',
    definition: {
      name: { en: 'Hadith Check', ar: 'فحص الحديث' },
      description: { en: 'Takhrij and hadith authentication tool', ar: 'أداة التخريج والتحقق من الحديث' },
      type: 'http://id.tincanapi.com/activitytype/exercise',
    }
  },
};

// ─── UUID Generator ─────────────────────────────────────────
function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

// ─── Duration formatter ──────────────────────────────────────
function formatDuration(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  let duration = 'PT';
  if (h > 0) duration += `${h}H`;
  if (m > 0) duration += `${m}M`;
  if (s > 0 || duration === 'PT') duration += `${s}S`;
  return duration;
}

// ─── Main XAPIEngine class ───────────────────────────────────
export class XAPIEngine {
  private userId: string;
  private userName: string;
  private registrationId: string;
  private lrsEndpoint: string;

  constructor(userId: string, userName: string) {
    this.userId = userId;
    this.userName = userName;
    this.registrationId = generateUUID();
    this.lrsEndpoint = '/api/supervisor/lrs';
  }

  /**
   * Build a complete xAPI statement
   */
  buildStatement(
    verb: XAPIVerb,
    activityPath: string,
    result?: Omit<XAPIResult, 'completion' | 'success'> & { completion?: boolean; success?: boolean },
    extensions?: Record<string, unknown>
  ): XAPIStatement {
    const activity = EAL_ACTIVITIES[activityPath] || this.buildGenericActivity(activityPath);
    const verbDef = VERB_IRIS[verb];

    return {
      id: generateUUID(),
      actor: {
        objectType: 'Agent',
        name: this.userName,
        mbox: `mailto:${this.userId}@eal.platform`,
        account: {
          homePage: 'https://eal.platform',
          name: this.userId,
        }
      },
      verb: {
        id: verbDef.id,
        display: { en: verbDef.en, ar: verbDef.ar },
      },
      object: activity,
      result: result ? {
        score: result.score,
        completion: result.completion ?? (verb === 'passed' || verb === 'mastered'),
        success: result.success ?? (verb === 'passed' || verb === 'mastered'),
        duration: result.duration,
        response: result.response,
        extensions: {
          ...result.extensions,
          'https://eal.platform/extensions/eis': extensions?.eis,
          'https://eal.platform/extensions/passport_level': extensions?.passportLevel,
        }
      } : undefined,
      context: {
        registration: this.registrationId,
        contextActivities: {
          grouping: [{ id: 'https://eal.platform/courses/sovereign-24week', definition: { name: { en: 'EAL Sovereign 24-Week Curriculum', ar: 'المنهج السيادي 24 أسبوعاً' }, description: { en: 'Egyptian Awareness Library — Full Curriculum', ar: 'المكتبة المصرية للوعي — المنهج الكامل' }, type: 'http://adlnet.gov/expapi/activities/course' } }]
        },
        extensions: {
          'https://eal.platform/extensions/curriculum_version': 'EAL-24W-v1.0.0',
          'https://eal.platform/extensions/platform': 'Egyptian Awareness Library',
          ...extensions,
        }
      },
      timestamp: new Date().toISOString(),
    };
  }

  private buildGenericActivity(path: string): XAPIObject {
    return {
      id: `https://eal.platform/activities${path}`,
      definition: {
        name: { en: path.replace(/\//g, ' ').trim() },
        description: { en: `EAL activity: ${path}` },
        type: 'http://adlnet.gov/expapi/activities/lesson',
      }
    };
  }

  /**
   * Emit an xAPI statement — stores locally + sends to LRS
   */
  async emit(
    verb: XAPIVerb,
    activityPath: string,
    result?: Parameters<XAPIEngine['buildStatement']>[2],
    extensions?: Record<string, unknown>
  ): Promise<void> {
    const statement = this.buildStatement(verb, activityPath, result, extensions);

    // 1. Store in localStorage for offline-first
    try {
      const existing = JSON.parse(localStorage.getItem('eal_xapi_statements') || '[]');
      existing.push(statement);
      // Keep last 500 statements
      if (existing.length > 500) existing.splice(0, existing.length - 500);
      localStorage.setItem('eal_xapi_statements', JSON.stringify(existing));
    } catch { /* localStorage not available (SSR) */ }

    // 2. Send to server LRS (non-blocking)
    try {
      fetch(this.lrsEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(statement),
        keepalive: true,
      }).catch(() => { /* LRS may be offline — localStorage is fallback */ });
    } catch { /* Ignore network errors */ }
  }

  // ─── Convenience helpers per 3.txt verbs ──────────────────

  /** User started/viewed an activity */
  async experienced(path: string, durationSeconds?: number): Promise<void> {
    await this.emit('experienced', path, {
      completion: false,
      success: false,
      duration: durationSeconds ? formatDuration(durationSeconds) : undefined,
    });
  }

  /** User passed an assessment (score ≥ 80% for Bloom L3) */
  async passed(path: string, raw: number, max: number, durationSeconds?: number, response?: string): Promise<void> {
    await this.emit('passed', path, {
      score: { raw, min: 0, max, scaled: raw / max },
      completion: true,
      success: true,
      duration: durationSeconds ? formatDuration(durationSeconds) : undefined,
      response,
    });
  }

  /** User failed an assessment */
  async failed(path: string, raw: number, max: number, durationSeconds?: number): Promise<void> {
    await this.emit('failed', path, {
      score: { raw, min: 0, max, scaled: raw / max },
      completion: true,
      success: false,
      duration: durationSeconds ? formatDuration(durationSeconds) : undefined,
    });
  }

  /** User mastered (≥ 95% or Bloom L5+) */
  async mastered(path: string, raw: number, max: number, durationSeconds?: number): Promise<void> {
    await this.emit('mastered', path, {
      score: { raw, min: 0, max, scaled: raw / max },
      completion: true,
      success: true,
      duration: durationSeconds ? formatDuration(durationSeconds) : undefined,
    }, { mastery: true });
  }

  /** Get all stored statements from localStorage */
  getStoredStatements(): XAPIStatement[] {
    try {
      return JSON.parse(localStorage.getItem('eal_xapi_statements') || '[]');
    } catch {
      return [];
    }
  }

  /** Compute exercise completion rate from stored statements */
  getCompletionRate(requiredActivities: string[]): number {
    const statements = this.getStoredStatements();
    const completedSet = new Set(
      statements
        .filter(s => s.result?.completion === true)
        .map(s => s.object.id.replace('https://eal.platform/activities', ''))
    );
    const completed = requiredActivities.filter(a => completedSet.has(a)).length;
    return completed / requiredActivities.length;
  }
}

// ─── React Hook ──────────────────────────────────────────────
// Usage: const xapi = useXAPI(); xapi.passed('/fallacy-engine', 8, 10);
export function createXAPIEngine(userId: string, userName: string): XAPIEngine {
  return new XAPIEngine(userId, userName);
}
