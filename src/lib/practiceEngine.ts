/**
 * Builds a lesson's follow-up practice set from the MCQ bank, aimed at the skills the tutor rated: more
 * questions on red skills, fewer on yellow, one check on green. Server only.
 *
 * The set is served by the existing custom assignment page (/exam/custom?q=…), which looks questions up by
 * id, first match in `allQuestions`. Ids repeat across courses, so only questions that are their id's first
 * match are used: the student always sees the question the tutor approved.
 */
import { randomBytes } from 'node:crypto';
import type { Firestore } from 'firebase-admin/firestore';
import type { Question } from '@/data/questionBanks/types';
import {
  MAX_PRACTICE_QUESTIONS,
  PRACTICE_QUESTIONS_PER_LEVEL,
  findLesson,
  type LessonCourse,
  type LessonPracticeView,
  type LessonSkill,
  type PracticeQuestionView,
  type PracticeResult,
  type SkillLevel,
} from '@/lib/tutoringLessons';
import { courseForSubject, toMillis } from '@/lib/studentProgressServer';

/** Questions answered correctly this recently are skipped while there are others to use. */
const RECENTLY_CORRECT_MS = 60 * 24 * 60 * 60 * 1000;

/** What's stored on the lesson doc as `practice`. */
export interface StoredPractice {
  include: boolean;
  questionIds: number[];
  builtAt: string;
  gaps: LessonPracticeView['gaps'];
  /** The assignment link created when the set was sent, and the questions it was made for. */
  linkId?: string;
  encodedParam?: string;
  linkQuestionIds?: number[];
}

export function readStoredPractice(value: unknown): StoredPractice | null {
  const p = value as Record<string, unknown> | null;
  if (!p || !Array.isArray(p.questionIds)) return null;
  return {
    include: p.include !== false,
    questionIds: p.questionIds.filter((n): n is number => typeof n === 'number'),
    builtAt: typeof p.builtAt === 'string' ? p.builtAt : new Date(0).toISOString(),
    gaps: Array.isArray(p.gaps)
      ? p.gaps.flatMap((g) => {
          const x = g as Record<string, unknown>;
          return typeof x?.lesson === 'string' && typeof x.wanted === 'number' && typeof x.found === 'number'
            ? [{ lesson: x.lesson, lessonName: typeof x.lessonName === 'string' ? x.lessonName : null, wanted: x.wanted, found: x.found }]
            : [];
        })
      : [],
    ...(typeof p.linkId === 'string' ? { linkId: p.linkId } : {}),
    ...(typeof p.encodedParam === 'string' ? { encodedParam: p.encodedParam } : {}),
    ...(Array.isArray(p.linkQuestionIds) ? { linkQuestionIds: p.linkQuestionIds.filter((n) => typeof n === 'number') } : {}),
  };
}

let bank: Promise<Map<number, Question>> | null = null;

/** Question id → the question the custom assignment page will show for it. */
function loadBank(): Promise<Map<number, Question>> {
  bank ??= import('@/data/unitPracticeProblems/unitPracticeProblems').then(({ allQuestions }) => {
    const byId = new Map<number, Question>();
    for (const q of allQuestions) if (!byId.has(q.id)) byId.set(q.id, q);
    return byId;
  });
  return bank;
}

function usable(q: Question, course: LessonCourse): boolean {
  return (
    courseForSubject(q.subject) === course &&
    !q.isTest &&
    Array.isArray(q.options) &&
    q.options.length >= 2 &&
    typeof q.correctAnswer === 'string' &&
    q.correctAnswer.length > 0
  );
}

/** Questions for one skill: its lesson's questions, or its unit's when the skill is a whole unit. */
function poolFor(questions: Question[], skill: Pick<LessonSkill, 'lesson' | 'unit'>): Question[] {
  if (skill.lesson) return questions.filter((q) => q.lessonIDS?.includes(skill.lesson as string));
  if (skill.unit !== null) return questions.filter((q) => q.unit === skill.unit);
  return [];
}

function shuffle<T>(list: T[]): T[] {
  const a = [...list];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Question ids the student got right recently, from practice and quizzes. */
async function recentlyCorrect(db: Firestore, uid: string | null): Promise<Set<number>> {
  const ids = new Set<number>();
  if (!uid) return ids;
  const since = Date.now() - RECENTLY_CORRECT_MS;
  const [practice, quizzes] = await Promise.all([
    db.collection('users').doc(uid).collection('mcqAnswers').where('timestamp', '>=', new Date(since)).get(),
    db.collection('userQuizHistory').where('userId', '==', uid).get(),
  ]);
  for (const d of practice.docs) {
    const a = d.data();
    if (a.isCorrect === true && typeof a.questionId === 'number') ids.add(a.questionId);
  }
  for (const d of quizzes.docs) {
    const entry = d.data();
    if ((toMillis(entry.timestamp) ?? 0) < since) continue;
    const answers = (entry.userAnswers ?? {}) as Record<string, unknown>;
    for (const q of Array.isArray(entry.questions) ? entry.questions : []) {
      if (typeof q?.id === 'number' && answers[String(q.id)] === q.correctAnswer) ids.add(q.id);
    }
  }
  return ids;
}

/** Picks `wanted` questions from a pool: unseen-or-missed first, then recently correct ones if short. */
function pick(pool: Question[], wanted: number, chosen: Set<number>, avoid: Set<number>): Question[] {
  const fresh = shuffle(pool.filter((q) => !chosen.has(q.id) && !avoid.has(q.id)));
  const repeats = shuffle(pool.filter((q) => !chosen.has(q.id) && avoid.has(q.id)));
  return [...fresh, ...repeats].slice(0, wanted);
}

export async function buildPracticeSet(
  db: Firestore,
  { course, skills, studentUid }: { course: LessonCourse; skills: LessonSkill[]; studentUid: string | null },
): Promise<{ questionIds: number[]; gaps: LessonPracticeView['gaps'] }> {
  const questions = [...(await loadBank()).values()].filter((q) => usable(q, course));
  const avoid = await recentlyCorrect(db, studentUid);
  const chosen = new Set<number>();
  const order: number[] = [];
  const gaps: LessonPracticeView['gaps'] = [];

  // Weakest skills first, so they get their questions before the cap.
  const targets = [...skills].filter((s) => s.lesson || s.unit !== null).sort((a, b) => a.level - b.level);
  for (const skill of targets) {
    const room = MAX_PRACTICE_QUESTIONS - order.length;
    if (room <= 0) break;
    const wanted = Math.min(PRACTICE_QUESTIONS_PER_LEVEL[skill.level], room);
    const picked = pick(poolFor(questions, skill), wanted, chosen, avoid);
    for (const q of picked) {
      chosen.add(q.id);
      order.push(q.id);
    }
    if (picked.length < wanted && skill.lesson) {
      gaps.push({
        lesson: skill.lesson,
        lessonName: findLesson(course, skill.unit, skill.lesson)?.name ?? null,
        wanted,
        found: picked.length,
      });
    }
  }
  return { questionIds: order, gaps };
}

/** Replaces one question with another for the same skill, or returns null if there's no other. */
export async function swapPracticeQuestion(
  db: Firestore,
  {
    course,
    skills,
    studentUid,
    questionIds,
    questionId,
  }: { course: LessonCourse; skills: LessonSkill[]; studentUid: string | null; questionIds: number[]; questionId: number },
): Promise<number[] | null> {
  const byId = await loadBank();
  const current = byId.get(questionId);
  if (!current) return null;
  const questions = [...byId.values()].filter((q) => usable(q, course));
  const skill =
    skills.find((s) => s.lesson && current.lessonIDS?.includes(s.lesson)) ??
    skills.find((s) => !s.lesson && s.unit === current.unit);
  const pool = skill ? poolFor(questions, skill) : questions.filter((q) => q.lessonIDS?.some((l) => current.lessonIDS?.includes(l)));
  const [replacement] = pick(pool, 1, new Set(questionIds), await recentlyCorrect(db, studentUid));
  if (!replacement) return null;
  return questionIds.map((id) => (id === questionId ? replacement.id : id));
}

/** The skill (lesson) a question was picked for, from the lesson's skills. */
function skillFor(q: Question | undefined, skills: LessonSkill[]): LessonSkill | undefined {
  if (!q) return undefined;
  return skills.find((s) => s.lesson && q.lessonIDS?.includes(s.lesson)) ?? skills.find((s) => !s.lesson && s.unit === q.unit);
}

function previewText(q: Question | undefined): string {
  const text = typeof q?.question === 'string' ? q.question.replace(/\s+/g, ' ').trim() : '';
  return text.length > 160 ? `${text.slice(0, 157)}…` : text || 'Question';
}

export async function practiceQuestionViews(
  questionIds: number[],
  skills: LessonSkill[],
  course: LessonCourse | null,
): Promise<PracticeQuestionView[]> {
  const byId = await loadBank();
  return questionIds.map((id) => {
    const q = byId.get(id);
    const skill = skillFor(q, skills);
    const lesson = skill?.lesson ?? q?.lessonIDS?.[0] ?? null;
    const unit = lesson ? Number.parseInt(lesson, 10) : null;
    return {
      id,
      lesson,
      lessonName: lesson ? (findLesson(course, unit, lesson)?.name ?? null) : null,
      level: (skill?.level ?? null) as SkillLevel | null,
      preview: previewText(q),
    };
  });
}

/**
 * The custom assignment link code for a set: the question ids in base64, plus a letter-only marker the page
 * ignores (it keeps only numbers), so every set's code is unique and its results can't mix with another's.
 */
export function practiceEncodedParam(questionIds: number[]): string {
  const marker = `p${randomBytes(6).toString('hex').replace(/[0-9]/g, (d) => 'abcdefghij'[Number(d)])}`;
  return Buffer.from(`${questionIds.join(',')},${marker}`).toString('base64');
}

export function practicePath(encodedParam: string): string {
  return `/exam/custom?q=${encodeURIComponent(encodedParam)}`;
}

/** The student's latest submission for the set's link, if any. */
export async function practiceResult(
  db: Firestore,
  linkId: string,
  skills: LessonSkill[],
  course: LessonCourse | null,
): Promise<PracticeResult | null> {
  const snap = await db.collection('assignmentResults').where('assignmentLinkId', '==', linkId).get();
  const latest = snap.docs
    .map((d) => d.data())
    .sort((a, b) => (toMillis(b.submittedAt) ?? 0) - (toMillis(a.submittedAt) ?? 0))[0];
  if (!latest) return null;
  const byId = await loadBank();
  const byLesson = new Map<string, { correct: number; total: number }>();
  for (const r of Array.isArray(latest.questionResults) ? latest.questionResults : []) {
    const q = byId.get(Number(r.questionId));
    const lesson = skillFor(q, skills)?.lesson ?? q?.lessonIDS?.[0];
    if (!lesson) continue;
    const t = byLesson.get(lesson) ?? { correct: 0, total: 0 };
    t.total += 1;
    if (r.isCorrect === true) t.correct += 1;
    byLesson.set(lesson, t);
  }
  return {
    correct: typeof latest.correctCount === 'number' ? latest.correctCount : 0,
    total: typeof latest.totalQuestions === 'number' ? latest.totalQuestions : 0,
    submittedAt: new Date(toMillis(latest.submittedAt) ?? Date.now()).toISOString(),
    studentName: typeof latest.studentName === 'string' ? latest.studentName : null,
    byLesson: [...byLesson.entries()].map(([lesson, t]) => ({
      lesson,
      lessonName: findLesson(course, Number.parseInt(lesson, 10), lesson)?.name ?? null,
      ...t,
    })),
  };
}

/** The practice view for the tutor's editor. */
export async function practiceView(
  db: Firestore,
  stored: StoredPractice | null,
  skills: LessonSkill[],
  course: LessonCourse | null,
): Promise<LessonPracticeView | null> {
  if (!stored) return null;
  const [questions, result] = await Promise.all([
    practiceQuestionViews(stored.questionIds, skills, course),
    stored.linkId ? practiceResult(db, stored.linkId, skills, course) : null,
  ]);
  return {
    include: stored.include,
    questions,
    gaps: stored.gaps,
    builtAt: stored.builtAt,
    path: stored.encodedParam ? practicePath(stored.encodedParam) : null,
    result,
  };
}

/** Hand-picked additions can go past the automatic set's size, up to this. */
export const MAX_PRACTICE_WITH_PICKS = 20;

/** A bank question as the tutor browses it to add by hand. */
export interface BankQuestionView {
  id: number;
  lessons: string[];
  text: string;
  options: string[];
}

/** The course's usable bank questions for one lesson (or a whole unit), for picking by hand. */
export async function bankQuestions(
  course: LessonCourse,
  filter: { lesson: string | null; unit: number | null },
): Promise<BankQuestionView[]> {
  const questions = [...(await loadBank()).values()].filter((q) => usable(q, course));
  const matching = filter.lesson
    ? questions.filter((q) => q.lessonIDS?.includes(filter.lesson as string))
    : filter.unit !== null
      ? questions.filter((q) => q.unit === filter.unit)
      : [];
  return matching.map((q) => ({
    id: q.id,
    lessons: q.lessonIDS ?? [],
    text: typeof q.question === 'string' ? q.question.replace(/\s+/g, ' ').trim() : 'Question',
    options: (q.options ?? []).map((o) => (typeof o === 'string' ? o : String(o))),
  }));
}

/** Whether a question can go in this course's practice set (it's served as itself, and isn't a test question). */
export async function isPracticeQuestion(course: LessonCourse, id: number): Promise<boolean> {
  const q = (await loadBank()).get(id);
  return !!q && usable(q, course);
}
