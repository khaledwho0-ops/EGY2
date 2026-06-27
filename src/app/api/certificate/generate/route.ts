import { NextResponse } from 'next/server';
import { createHash, createHmac, randomBytes, randomUUID } from 'crypto';
import { kvStore } from '@/lib/db/kv-store';

export const runtime = 'nodejs';
export const maxDuration = 30;

// ============================================================
// COGNITIVE IMMUNITY CERTIFICATE — issuance + REAL verification
//
// ⚖️ The One-Law applied to the credential itself (no fake credentials):
//  • This is a "Cognitive Immunity / Science-Literacy Certificate — self-issued,
//    methodology-published," NOT an accredited academic degree.
//  • The signature is tamper-EVIDENT (recomputable HMAC), not "tamper-proof".
//  • The MIST-20 score is read SERVER-SIDE from the user's persisted record
//    (kvStore `mist:<uid>:latest`), NEVER trusted from the request body — a user
//    cannot self-issue by POSTing a perfect score. (Other inputs are flagged as
//    not-yet-server-verified; full server recompute of XP/passport is the next step.)
//  • Every issued cert is PERSISTED at `cert:<uuid>` so it can be looked up,
//    verified (HMAC recompute), name-matched (anti-impersonation), and revoked.
//    Unknown IDs return verified:false (404). A name mismatch fails verification.
//  • The MIST item set is currently a PILOT instrument (placeholder items), so the
//    cert is labeled accordingly until the validated Maertens MIST-20 is loaded.
// ============================================================

const EAL_CURRICULUM_VERSION = 'EAL-24W-v1.0.0';

// No hardcoded forgeable default. Use the env secret in production; in dev fall
// back to a per-process random secret (unforgeable, but signatures won't survive a
// restart unless EAL_SIGNING_SECRET is set — verification then fails-evident, which
// is correct: an unverifiable cert must read as unverifiable, not silently "valid").
const EAL_SIGNING_SECRET: string =
  process.env.EAL_SIGNING_SECRET ||
  (() => {
    console.warn(
      '[Certificate] EAL_SIGNING_SECRET is not set — using a random per-process secret. ' +
        'Set EAL_SIGNING_SECRET for stable, restart-surviving certificate verification.',
    );
    return randomBytes(32).toString('hex');
  })();

const MINIMUM_FINAL_SCORE = 0.9;

const THRESHOLDS = {
  mist20_minimum: 90, // C2: MIST-20 ≥ 90% (read server-side)
  socratic_minimum: 95,
  logical_coherence_min: 32,
  fallacy_detection_min: 32,
  eis_max: 0.3,
  exercise_completion: 1.0,
};

interface CertificateRequest {
  userId: string;
  userName: string;
  userNameAr?: string;
  scores: {
    xpTotal: number;
    xpMax: number;
    passportLevel: number;
    mist20Final?: number; // ignored — overridden by the server-side MIST record
    socraticSwarm: number;
    logicalCoherence: number;
    fallacyDetection: number;
    forwardDefenseVerifications: number;
    forwardDefenseRequired: number;
    exerciseCompletionRate: number;
    eisSustained?: number;
  };
}

interface StoredMist {
  veracityDiscernment?: number; // 0-20
  realNewsBias?: number;
  fakeNewsAccept?: number;
}

interface CertRecord {
  uuid: string;
  holderName: string;
  holderNameAr: string;
  holderNameHash: string;
  finalScore: number;
  issuedAt: string;
  curriculumVersion: string;
  program: string;
  tier: 'Distinction' | 'Pass';
  band: { en: string; ar: string };
  subScores: {
    mist20: number;
    veracityDiscernment: number | null;
    realNewsBias: number | null;
    passportLevel: number;
    socraticSwarm: number;
  };
  serverVerified: { mist20: boolean; otherInputs: boolean };
  signature: string;
  revoked: boolean;
}

function computeFinalScore(s: CertificateRequest['scores'], mist20: number): number {
  return (
    0.3 * (s.xpTotal / s.xpMax) +
    0.25 * (s.passportLevel / 5) +
    0.2 * (mist20 / 100) +
    0.15 * (s.socraticSwarm / 100) +
    0.1 * (s.forwardDefenseVerifications / s.forwardDefenseRequired)
  );
}

function checkCriteria(s: CertificateRequest['scores'], mist20: number): string[] {
  const failed: string[] = [];
  if (s.exerciseCompletionRate < THRESHOLDS.exercise_completion)
    failed.push(`C1: Exercise completion ${(s.exerciseCompletionRate * 100).toFixed(1)}% < 100% required`);
  if (mist20 < THRESHOLDS.mist20_minimum)
    failed.push(`C2: MIST-20 (server-measured) ${mist20}% < ${THRESHOLDS.mist20_minimum}% required`);
  if (s.socraticSwarm < THRESHOLDS.socratic_minimum)
    failed.push(`C3: Socratic Swarm ${s.socraticSwarm}/100 < ${THRESHOLDS.socratic_minimum} required`);
  if (s.logicalCoherence < THRESHOLDS.logical_coherence_min)
    failed.push(`C3: Logical coherence ${s.logicalCoherence}/35 < ${THRESHOLDS.logical_coherence_min} required`);
  if (s.fallacyDetection < THRESHOLDS.fallacy_detection_min)
    failed.push(`C3: Fallacy detection ${s.fallacyDetection}/35 < ${THRESHOLDS.fallacy_detection_min} required`);
  if (s.eisSustained !== undefined && s.eisSustained > THRESHOLDS.eis_max)
    failed.push(`C3: Emotional regulation EIS ${s.eisSustained.toFixed(2)} > ${THRESHOLDS.eis_max}`);
  return failed;
}

function hashName(name: string): string {
  return createHash('sha256').update(name.trim().toLowerCase()).digest('hex').slice(0, 32);
}

// The canonical, signed payload for a cert record — what the HMAC protects.
function certPayload(r: { uuid: string; holderNameHash: string; finalScore: number; issuedAt: string }): string {
  return `${r.uuid}||${r.holderNameHash}||${r.finalScore.toFixed(6)}||${r.issuedAt}||${EAL_CURRICULUM_VERSION}`;
}

function sign(payload: string): string {
  const hash = createHash('sha256').update(payload).digest('hex');
  const hmac = createHmac('sha256', EAL_SIGNING_SECRET).update(payload).digest('hex');
  return `sha256:${hash.slice(0, 16)}:hmac:${hmac.slice(0, 16)}`;
}

function scoreBand(finalScore: number): { en: string; ar: string } {
  if (finalScore >= 0.95) return { en: 'Distinction', ar: 'امتياز' };
  return { en: 'Pass', ar: 'ناجح' };
}

// ───────────────────────────────────────────────────────────────
// POST — issue a certificate (server-side MIST, persisted, signed)
// ───────────────────────────────────────────────────────────────
export async function POST(req: Request) {
  try {
    const body: CertificateRequest = await req.json();
    if (!body.userId || !body.userName || !body.scores) {
      return NextResponse.json({ error: 'Missing required fields: userId, userName, scores' }, { status: 400 });
    }

    // SERVER-SIDE MIST — read the persisted score; never trust the body.
    const storedMist = await kvStore.get<StoredMist>(`mist:${body.userId}:latest`);
    if (!storedMist || typeof storedMist.veracityDiscernment !== 'number') {
      return NextResponse.json(
        {
          eligible: false,
          failedCriteria: [
            'C2: No server-side MIST-20 record found for this user. Take the MIST-20 assessment first — a Cognitive Immunity Certificate cannot be issued without a measured immunity score.',
          ],
          message_en: 'No measured MIST-20 record found. Complete the assessment first.',
          message_ar: 'لا يوجد سجل مقاس لاختبار MIST-20. يرجى إجراء التقييم أولاً.',
        },
        { status: 200 },
      );
    }

    const mist20 = Math.round((storedMist.veracityDiscernment / 20) * 100);
    const finalScore = computeFinalScore(body.scores, mist20);
    const failed = checkCriteria(body.scores, mist20);
    if (finalScore < MINIMUM_FINAL_SCORE) failed.push(`C5: FinalScore ${(finalScore * 100).toFixed(2)}% < 90% required`);

    if (failed.length > 0) {
      return NextResponse.json(
        {
          eligible: false,
          finalScorePercent: parseFloat((finalScore * 100).toFixed(2)),
          mist20ServerMeasured: mist20,
          failedCriteria: failed,
          message_en: 'Certificate cannot be issued yet. Complete the failed criteria.',
          message_ar: 'لا يمكن إصدار الشهادة بعد. يرجى استيفاء المعايير المطلوبة.',
        },
        { status: 200 },
      );
    }

    // Issue + PERSIST.
    const issuedAt = new Date().toISOString();
    const uuid = randomUUID();
    const holderNameHash = hashName(body.userName);
    const band = scoreBand(finalScore);
    const signature = sign(certPayload({ uuid, holderNameHash, finalScore, issuedAt }));

    const record: CertRecord = {
      uuid,
      holderName: body.userName,
      holderNameAr: body.userNameAr || body.userName,
      holderNameHash,
      finalScore,
      issuedAt,
      curriculumVersion: EAL_CURRICULUM_VERSION,
      program: 'EAL Cognitive Immunity Program (pilot)',
      tier: finalScore >= 0.95 ? 'Distinction' : 'Pass',
      band,
      subScores: {
        mist20,
        veracityDiscernment: storedMist.veracityDiscernment ?? null,
        realNewsBias: typeof storedMist.realNewsBias === 'number' ? storedMist.realNewsBias : null,
        passportLevel: body.scores.passportLevel,
        socraticSwarm: body.scores.socraticSwarm,
      },
      serverVerified: { mist20: true, otherInputs: false },
      signature,
      revoked: false,
    };
    await kvStore.set(`cert:${uuid}`, record);

    return NextResponse.json(
      {
        eligible: true,
        certificateId: uuid,
        verifyUrl: `/verify/${uuid}`,
        issuedAt,
        holder: { name: record.holderName, nameAr: record.holderNameAr },
        tier: record.tier,
        band,
        finalScorePercent: parseFloat((finalScore * 100).toFixed(2)),
        subScores: record.subScores,
        serverVerified: record.serverVerified,
        cryptographic: { algorithm: 'SHA-256 + HMAC-SHA256', signature, integrity: 'tamper-evident' },
        displayData: {
          title_en: 'Cognitive Immunity Certificate',
          title_ar: 'شهادة الحصانة المعرفية',
          subtitle_en: 'Science-Literacy & Misinformation Resistance — self-issued, methodology-published',
          subtitle_ar: 'محو الأمية العلمية ومقاومة التضليل — ذاتية الإصدار، منشورة المنهجية',
          scope_en:
            'A self-issued cognitive-immunity credential (not an accredited degree). It certifies a server-measured MIST-20 immunity score under the published EAL methodology. The MIST item set is a pilot instrument pending the validated Maertens MIST-20.',
          scope_ar:
            'شهادة حصانة معرفية ذاتية الإصدار (وليست درجة أكاديمية معتمدة). تشهد بمستوى حصانة مقاس عبر اختبار MIST-20 وفق منهجية EAL المنشورة. مجموعة أسئلة MIST تجريبية بانتظار النسخة المُعتمدة.',
        },
        message_en: 'Certificate issued and persisted. Verify it at the public link.',
        message_ar: 'تم إصدار الشهادة وحفظها. تحقق منها عبر الرابط العام.',
      },
      { status: 200 },
    );
  } catch (error) {
    console.error('[Certificate API] Error:', error);
    return NextResponse.json(
      { error: 'Certificate generation failed', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 },
    );
  }
}

// ───────────────────────────────────────────────────────────────
// GET — REAL verification: look up the persisted record by UUID,
// recompute the HMAC, optionally name-match. Unknown id → 404.
//   /api/certificate/generate?id=<uuid>[&name=<holder name>]
// ───────────────────────────────────────────────────────────────
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  const name = searchParams.get('name');
  if (!id) return NextResponse.json({ verified: false, error: 'Missing id parameter' }, { status: 400 });

  const record = await kvStore.get<CertRecord>(`cert:${id}`);
  if (!record) {
    return NextResponse.json(
      { verified: false, reason: 'No certificate exists with this ID.' },
      { status: 404 },
    );
  }

  const expectedSig = sign(certPayload(record));
  const tamperOk = expectedSig === record.signature;

  let nameMatch: boolean | null = null;
  if (name) nameMatch = hashName(name) === record.holderNameHash;

  const verified = tamperOk && !record.revoked && (nameMatch === null || nameMatch === true);

  return NextResponse.json(
    {
      verified,
      revoked: record.revoked,
      tamperState: tamperOk ? 'intact' : 'ALTERED — does not match the original signature',
      nameMatch,
      // Minimal disclosure (PRD §6.2): name, title, date, band, tamper hash.
      holder: { name: record.holderName, nameAr: record.holderNameAr },
      title_en: 'Cognitive Immunity Certificate',
      title_ar: 'شهادة الحصانة المعرفية',
      program: record.program,
      tier: record.tier,
      band: record.band,
      issuedAt: record.issuedAt,
      curriculumVersion: record.curriculumVersion,
      tamperHash: record.signature,
      subScores: { mist20: record.subScores?.mist20, realNewsBias: record.subScores?.realNewsBias },
      note_en: 'Self-issued credential under the published EAL methodology — not an accredited degree.',
      note_ar: 'شهادة ذاتية الإصدار وفق منهجية EAL المنشورة — وليست درجة معتمدة.',
    },
    { status: 200 },
  );
}
