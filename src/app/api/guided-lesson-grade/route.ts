import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';
import { auth as adminAuth, db as adminDb } from '@/lib/firebase-admin';
import { GEMINI_REASONING_MODEL } from '@/lib/geminiModels';
import { hasValidSeasonPass } from '@/lib/utils';
import { getGuidedLessonContent } from '@/data/guidedLessons';
import { buildGuidedGradePrompt, parseGuidedGrade } from '@/lib/guidedLessonGrader';
import {
  GUIDED_FINAL_MAX_ATTEMPTS,
  guidedLessonProgressKey,
  type GuidedGradeResult,
  type GuidedLessonProgressEntry,
} from '@/lib/guidedLessonProgress';

export const runtime = 'nodejs';
export const maxDuration = 30;

const MAX_ANSWER_CHARS = 2000;
/** Per-user cap across all guided lessons, both rounds. */
const DAILY_GRADING_LIMIT = 60;

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get('authorization') || req.headers.get('Authorization');
  const bearerToken =
    authHeader && authHeader.startsWith('Bearer ') ? authHeader.slice('Bearer '.length).trim() : '';
  if (!bearerToken || !adminAuth || !adminDb) {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  }
  const db = adminDb;

  let uid = '';
  try {
    uid = (await adminAuth.verifyIdToken(bearerToken)).uid;
  } catch {
    return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
  }

  let body: { lessonId?: unknown; round?: unknown; answer?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }
  const lesson = typeof body.lessonId === 'string' ? getGuidedLessonContent(body.lessonId) : null;
  const round = body.round === 'first' || body.round === 'final' ? body.round : null;
  const answer = typeof body.answer === 'string' ? body.answer.trim() : '';
  if (!lesson || !round || !answer || answer.length > MAX_ANSWER_CHARS) {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  const userRef = db.collection('users').doc(uid);
  const today = new Date().toISOString().slice(0, 10);

  // Season Pass check + daily cap, counted before the model call so failures still count.
  try {
    const verdict = await db.runTransaction(async (tx) => {
      const snap = await tx.get(userRef);
      const data = snap.data();
      if (!hasValidSeasonPass(data, 'macro')) return 'forbidden' as const;
      const usage = data?.guidedGradingUsage as { date?: string; count?: number } | undefined;
      const count = usage?.date === today ? usage.count ?? 0 : 0;
      if (count >= DAILY_GRADING_LIMIT) return 'limited' as const;
      tx.set(userRef, { guidedGradingUsage: { date: today, count: count + 1 } }, { merge: true });
      return 'ok' as const;
    });
    if (verdict === 'forbidden') {
      return NextResponse.json({ error: 'A Macro Season Pass is required.' }, { status: 403 });
    }
    if (verdict === 'limited') {
      return NextResponse.json(
        { error: 'You’ve reached today’s grading limit. Try again tomorrow.' },
        { status: 429 },
      );
    }
  } catch (err) {
    console.error('[guided-lesson-grade] user check failed', err);
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error('[guided-lesson-grade] GEMINI_API_KEY is not set');
    return NextResponse.json({ error: 'Grading is unavailable right now.' }, { status: 500 });
  }

  // Gemini 3.x thinking tokens count against maxOutputTokens, so leave headroom; retry once on a cut-off reply.
  const model = new GoogleGenerativeAI(apiKey).getGenerativeModel({
    model: GEMINI_REASONING_MODEL,
    generationConfig: { temperature: 0.2, maxOutputTokens: 4096, responseMimeType: 'application/json' },
  });
  let grade: ReturnType<typeof parseGuidedGrade> = null;
  for (let attempt = 1; attempt <= 2 && !grade; attempt++) {
    const started = Date.now();
    try {
      const result = await model.generateContent(buildGuidedGradePrompt(lesson, round, answer));
      const usage = result.response.usageMetadata;
      grade = parseGuidedGrade(result.response.text(), lesson);
      // Cost log: token counts per call; multiply by the model's current per-token price.
      console.log(
        JSON.stringify({
          event: 'guided_lesson_grade',
          uid,
          lessonId: lesson.lessonId,
          round,
          attempt,
          parsed: grade !== null,
          model: GEMINI_REASONING_MODEL,
          promptTokens: usage?.promptTokenCount ?? null,
          outputTokens: usage?.candidatesTokenCount ?? null,
          totalTokens: usage?.totalTokenCount ?? null,
          ms: Date.now() - started,
        }),
      );
    } catch (err) {
      console.error('[guided-lesson-grade] model call failed', err);
    }
  }
  if (!grade) {
    return NextResponse.json({ error: 'Grading didn’t work this time. Please try again.' }, { status: 502 });
  }

  const earned = grade.points.filter((p) => p.earned).length;
  const key = guidedLessonProgressKey('macro', lesson.lessonId);
  const now = new Date().toISOString();

  if (round === 'first') {
    const passed = earned === lesson.rubric.length;
    if (passed) {
      await userRef.set(
        { guidedLessonProgress: { [key]: { status: 'passed', passedVia: 'first', updatedAt: now } } },
        { merge: true },
      );
    }
    const response: GuidedGradeResult = { round, points: grade.points, summary: grade.summary, passed };
    return NextResponse.json(response);
  }

  const passed = earned >= lesson.passMark;
  const entry = await db.runTransaction(async (tx) => {
    const snap = await tx.get(userRef);
    const prev = (snap.data()?.guidedLessonProgress?.[key] ?? null) as GuidedLessonProgressEntry | null;
    const finalAttempts = (prev?.finalAttempts ?? 0) + 1;
    const status: GuidedLessonProgressEntry['status'] =
      passed || prev?.status === 'passed'
        ? 'passed'
        : finalAttempts >= GUIDED_FINAL_MAX_ATTEMPTS
          ? 'reviewed'
          : undefined;
    const next: Record<string, unknown> = { finalAttempts, updatedAt: now };
    if (status) next.status = status;
    if (passed && prev?.status !== 'passed') next.passedVia = 'final';
    tx.set(userRef, { guidedLessonProgress: { [key]: next } }, { merge: true });
    return { finalAttempts, status };
  });

  const attemptsLeft = Math.max(0, GUIDED_FINAL_MAX_ATTEMPTS - entry.finalAttempts);
  const response: GuidedGradeResult = {
    round,
    points: grade.points,
    summary: grade.summary,
    passed,
    attemptsLeft,
    status: entry.status,
    modelAnswer: passed || attemptsLeft === 0 ? lesson.modelAnswer : undefined,
  };
  return NextResponse.json(response);
}
