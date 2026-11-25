/**
 * Builds a student's progress report from what the site already saves. Server only.
 *
 * Sources, which don't overlap:
 * - users/{uid}/mcqAnswers: one doc per practice answer (unit MCQ practice). Older docs have no subject, so
 *   it's looked up from the question bank.
 * - userQuizHistory: unit tests, full exams, custom assignment links, drills and cheat-sheet quizzes, each
 *   with its questions and the student's answers. (assignmentResults repeats the custom links, so it's
 *   left out.)
 * - tutoringLessons: the tutor's skill ratings from lesson notes.
 */
import type { DocumentData, Firestore } from 'firebase-admin/firestore';
import {
  TUTORING_LESSONS_COLLECTION,
  courseUnits,
  findLesson,
  isLessonCourse,
  readSharedNotes,
  sanitizeSkills,
  type LessonCourse,
  type SkillLevel,
} from '@/lib/tutoringLessons';
import {
  RECENT_ANSWERS_PER_LESSON,
  masteryFor,
  type CourseProgress,
  type LessonProgress,
  type ProgressActivity,
  type StudentProgress,
} from '@/lib/studentProgress';

const DAY_MS = 24 * 60 * 60 * 1000;

const SUBJECT_COURSES: Record<string, LessonCourse> = {
  macro: 'AP Macroeconomics',
  ap_macroeconomics: 'AP Macroeconomics',
  micro: 'AP Microeconomics',
  ap_microeconomics: 'AP Microeconomics',
  gov: 'AP Government',
  ap_us_government: 'AP Government',
  stats: 'AP Statistics',
  ap_statistics: 'AP Statistics',
};

export function courseForSubject(subject: unknown): LessonCourse | null {
  return typeof subject === 'string' ? (SUBJECT_COURSES[subject] ?? null) : null;
}

/** Milliseconds from a Firestore Timestamp, Date, ISO string or number. */
export function toMillis(value: unknown): number | null {
  if (!value) return null;
  if (typeof value === 'number') return value;
  if (typeof value === 'string') {
    const ms = Date.parse(value);
    return Number.isNaN(ms) ? null : ms;
  }
  if (value instanceof Date) return value.getTime();
  const v = value as { toMillis?: () => number; _seconds?: number; seconds?: number };
  if (typeof v.toMillis === 'function') return v.toMillis();
  const seconds = v._seconds ?? v.seconds;
  return typeof seconds === 'number' ? seconds * 1000 : null;
}

const strings = (value: unknown): string[] => (Array.isArray(value) ? value.filter((v): v is string => typeof v === 'string') : []);

/** One answered question. */
interface AnswerEvent {
  course: LessonCourse;
  unit: number | null;
  lessons: string[];
  correct: boolean;
  at: number;
}

type QuestionIndex = Map<string, { course: LessonCourse; unit: number | null; lessons: string[] }[]>;

let questionIndex: Promise<QuestionIndex> | null = null;

/** Practice question id → where it belongs. Loaded only when an answer has no subject saved. */
function loadQuestionIndex(): Promise<QuestionIndex> {
  questionIndex ??= import('@/data/unitPracticeProblems/unitPracticeProblems').then(({ allQuestions }) => {
    const index: QuestionIndex = new Map();
    for (const q of allQuestions) {
      const course = courseForSubject(q.subject);
      if (!course) continue;
      const key = String(q.id);
      const list = index.get(key) ?? [];
      list.push({ course, unit: typeof q.unit === 'number' ? q.unit : null, lessons: strings(q.lessonIDS) });
      index.set(key, list);
    }
    return index;
  });
  return questionIndex;
}

/** The course of a practice answer saved without one: the bank question with its id, unit and lesson tags. */
function resolveCourse(index: QuestionIndex, questionId: unknown, unit: number | null, lessons: string[]): LessonCourse | null {
  const candidates = index.get(String(questionId)) ?? [];
  const matching = candidates.filter(
    (c) => (unit === null || c.unit === unit) && (lessons.length === 0 || lessons.some((l) => c.lessons.includes(l))),
  );
  const courses = new Set((matching.length ? matching : candidates).map((c) => c.course));
  return courses.size === 1 ? [...courses][0] : null;
}

/** The outline unit a lesson number like "3.2" belongs to, if the lesson exists in the course. */
function validLesson(course: LessonCourse, lesson: string): { unit: number; name: string } | null {
  const unit = Number.parseInt(lesson, 10);
  if (!Number.isFinite(unit)) return null;
  const found = findLesson(course, unit, lesson);
  return found ? { unit, name: found.name } : null;
}

interface TutorRating {
  course: LessonCourse;
  lesson: string;
  level: SkillLevel;
  at: number;
}

function buildCourse(course: LessonCourse, events: AnswerEvent[], ratings: TutorRating[], now: number): CourseProgress {
  // Newest first, so each lesson's first N answers are its most recent.
  const sorted = [...events].sort((a, b) => b.at - a.at);
  const byLesson = new Map<string, AnswerEvent[]>();
  const unitTotals = new Map<number, { answers: number; correct: number }>();

  for (const e of sorted) {
    const lessonUnits = new Set<number>();
    for (const lesson of e.lessons) {
      const valid = validLesson(course, lesson);
      if (!valid) continue;
      lessonUnits.add(valid.unit);
      const list = byLesson.get(lesson) ?? [];
      list.push(e);
      byLesson.set(lesson, list);
    }
    // Count the answer once per unit, from its lessons, or its own unit tag if it has no valid lesson.
    if (lessonUnits.size === 0 && e.unit !== null) lessonUnits.add(e.unit);
    for (const unit of lessonUnits) {
      const t = unitTotals.get(unit) ?? { answers: 0, correct: 0 };
      t.answers += 1;
      if (e.correct) t.correct += 1;
      unitTotals.set(unit, t);
    }
  }

  const latestRating = new Map<string, TutorRating>();
  for (const r of ratings) {
    const prev = latestRating.get(r.lesson);
    if (!prev || r.at > prev.at) latestRating.set(r.lesson, r);
  }

  const units = courseUnits(course).map((u) => {
    const lessons: LessonProgress[] = u.lessons.map((l) => {
      const answers = byLesson.get(l.lessonNumber) ?? [];
      const recent = answers.slice(0, RECENT_ANSWERS_PER_LESSON);
      const recentCorrect = recent.filter((e) => e.correct).length;
      const rating = latestRating.get(l.lessonNumber);
      return {
        lesson: l.lessonNumber,
        name: l.name,
        answers: answers.length,
        correct: answers.filter((e) => e.correct).length,
        recentAnswers: recent.length,
        recentCorrect,
        mastery: masteryFor(recent.length, recentCorrect),
        lastAnsweredAt: answers[0] ? new Date(answers[0].at).toISOString() : null,
        tutorLevel: rating?.level ?? null,
        tutorRatedAt: rating ? new Date(rating.at).toISOString() : null,
      };
    });
    const totals = unitTotals.get(u.unitNumber) ?? { answers: 0, correct: 0 };
    return { unit: u.unitNumber, name: u.unitName, answers: totals.answers, correct: totals.correct, lessons };
  });

  const rank = (l: LessonProgress) =>
    (l.mastery === 'struggling' ? 0 : l.mastery === 'developing' ? 1 : 2) + (l.tutorLevel === 1 ? -0.5 : 0);
  const focus = units
    .flatMap((u) => u.lessons)
    .filter(
      (l) =>
        l.mastery === 'struggling' ||
        l.mastery === 'developing' ||
        (l.tutorLevel !== null && l.tutorLevel < 3 && l.mastery !== 'strong'),
    )
    .sort((a, b) => rank(a) - rank(b) || a.recentCorrect / (a.recentAnswers || 1) - b.recentCorrect / (b.recentAnswers || 1))
    .slice(0, 6);

  return {
    course,
    answers: events.length,
    correct: events.filter((e) => e.correct).length,
    answersLast7Days: events.filter((e) => e.at >= now - 7 * DAY_MS).length,
    answersLast30Days: events.filter((e) => e.at >= now - 30 * DAY_MS).length,
    units,
    focus,
  };
}

/**
 * Who the report is for. The tutor sees ratings from every lesson, drafts included. The student sees only
 * ratings from notes that were sent, and lessons booked under another account match only a verified email.
 */
export type ProgressAudience = { audience: 'tutor' } | { audience: 'student'; verifiedEmail: string | null };

export async function buildStudentProgress(
  db: Firestore,
  uid: string,
  viewer: ProgressAudience = { audience: 'tutor' },
): Promise<StudentProgress> {
  const now = Date.now();
  const [userSnap, practiceSnap, quizSnap, lessonsByUid] = await Promise.all([
    db.collection('users').doc(uid).get(),
    db.collection('users').doc(uid).collection('mcqAnswers').get(),
    db.collection('userQuizHistory').where('userId', '==', uid).get(),
    db.collection(TUTORING_LESSONS_COLLECTION).where('studentUserId', '==', uid).get(),
  ]);
  // Lessons booked without the account (logged out) are matched by the account's email instead.
  const accountEmail =
    viewer.audience === 'student'
      ? viewer.verifiedEmail
      : typeof userSnap.data()?.email === 'string'
        ? (userSnap.data()?.email as string)
        : null;
  const lessonsByEmail = accountEmail
    ? await db.collection(TUTORING_LESSONS_COLLECTION).where('studentEmail', '==', accountEmail).get()
    : null;
  const lessonDocs = new Map([...lessonsByUid.docs, ...(lessonsByEmail?.docs ?? [])].map((d) => [d.id, d]));

  const events: AnswerEvent[] = [];
  const recent: ProgressActivity[] = [];
  let unplacedAnswers = 0;

  // Unit practice: one doc per answer.
  const practice = practiceSnap.docs.map((d) => d.data());
  const index = practice.some((a) => !courseForSubject(a.subject)) ? await loadQuestionIndex() : null;
  const practiceDays = new Map<string, ProgressActivity>();
  for (const a of practice) {
    const at = toMillis(a.timestamp);
    if (at === null || typeof a.isCorrect !== 'boolean') continue;
    const unit = typeof a.unitId === 'number' ? a.unitId : null;
    const lessons = strings(a.lessonIDS);
    const course = courseForSubject(a.subject) ?? (index ? resolveCourse(index, a.questionId, unit, lessons) : null);
    if (!course) {
      unplacedAnswers += 1;
      continue;
    }
    events.push({ course, unit, lessons, correct: a.isCorrect, at });

    // Practice shows in recent activity as one entry per course per day.
    const day = new Date(at).toISOString().slice(0, 10);
    const key = `${day}|${course}`;
    const entry = practiceDays.get(key) ?? { kind: 'practice', title: 'Unit practice', course, at: new Date(at).toISOString(), correct: 0, total: 0 };
    entry.total = (entry.total ?? 0) + 1;
    if (a.isCorrect) entry.correct = (entry.correct ?? 0) + 1;
    if (at > Date.parse(entry.at)) entry.at = new Date(at).toISOString();
    practiceDays.set(key, entry);
  }
  recent.push(...practiceDays.values());

  // Tests, exams, assignments and quizzes: each saved with its questions and answers.
  for (const doc of quizSnap.docs) {
    const entry = doc.data();
    const at = toMillis(entry.timestamp);
    if (at === null) continue;
    const answers = (entry.userAnswers ?? {}) as Record<string, unknown>;
    const questions = Array.isArray(entry.questions) ? (entry.questions as DocumentData[]) : [];
    const courseCounts = new Map<LessonCourse, number>();
    for (const q of questions) {
      const course = courseForSubject(q.subject);
      if (course) courseCounts.set(course, (courseCounts.get(course) ?? 0) + 1);
      const answer = answers[String(q.id)];
      if (typeof answer !== 'string' || !answer) continue; // skipped
      if (!course) {
        unplacedAnswers += 1;
        continue;
      }
      events.push({
        course,
        unit: typeof q.unit === 'number' ? q.unit : null,
        lessons: strings(q.lessonIDS),
        correct: answer === q.correctAnswer,
        at,
      });
    }
    const mainCourse = [...courseCounts.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] ?? null;
    const title = typeof entry.title === 'string' ? entry.title : 'Quiz';
    recent.push({
      kind: /test|exam/i.test(title) ? 'test' : 'quiz',
      title,
      course: mainCourse,
      at: new Date(at).toISOString(),
      correct: typeof entry.correctCount === 'number' ? entry.correctCount : null,
      total: typeof entry.totalQuestions === 'number' ? entry.totalQuestions : null,
    });
  }

  // The tutor's ratings, from every lesson's notes (drafts too: this report is for the tutor).
  const ratings: TutorRating[] = [];
  for (const doc of lessonDocs.values()) {
    const lesson = doc.data();
    const at = toMillis(lesson.lessonStartTime) ?? toMillis(lesson.updatedAt);
    if (at === null) continue;
    if (viewer.audience === 'student') {
      // Only what the family was sent.
      const shared = lesson.status === 'shared' ? readSharedNotes(lesson.shared) : null;
      if (!shared) continue;
      const course = isLessonCourse(shared.course) ? (shared.course as LessonCourse) : null;
      for (const s of shared.skills) {
        if (course && s.lesson) ratings.push({ course, lesson: s.lesson, level: s.level, at });
      }
      recent.push({ kind: 'lesson', title: 'Tutoring lesson', course, at: new Date(at).toISOString(), correct: null, total: null });
      continue;
    }
    const lessonCourse = isLessonCourse(lesson.course) ? (lesson.course as LessonCourse) : null;
    for (const s of sanitizeSkills(lesson.skills)) {
      const course = s.course ?? lessonCourse;
      if (course && s.lesson) ratings.push({ course, lesson: s.lesson, level: s.level, at });
    }
    recent.push({ kind: 'lesson', title: 'Tutoring lesson', course: lessonCourse, at: new Date(at).toISOString(), correct: null, total: null });
  }

  const courses = new Set<LessonCourse>([...events.map((e) => e.course), ...ratings.map((r) => r.course)]);
  const progress = [...courses]
    .map((course) =>
      buildCourse(
        course,
        events.filter((e) => e.course === course),
        ratings.filter((r) => r.course === course),
        now,
      ),
    )
    .sort((a, b) => b.answersLast30Days - a.answersLast30Days || b.answers - a.answers);

  const user = userSnap.data() ?? {};
  const name = [user.displayName, user.name, [user.firstName, user.lastName].filter(Boolean).join(' ')].find(
    (v): v is string => typeof v === 'string' && v.trim() !== '',
  );

  return {
    uid,
    name: name ?? null,
    email: typeof user.email === 'string' ? user.email : null,
    courses: progress,
    recent: recent.sort((a, b) => Date.parse(b.at) - Date.parse(a.at)).slice(0, 25),
    unplacedAnswers,
    generatedAt: new Date(now).toISOString(),
  };
}

/** Answers in the last N days, across practice and quizzes, for the student list. */
export async function recentAnswerCounts(db: Firestore, uid: string, now = Date.now()) {
  const since30 = new Date(now - 30 * DAY_MS);
  const since7 = now - 7 * DAY_MS;
  const [practice, quizzes] = await Promise.all([
    db.collection('users').doc(uid).collection('mcqAnswers').where('timestamp', '>=', since30).select('timestamp').get(),
    db.collection('userQuizHistory').where('userId', '==', uid).select('timestamp', 'userAnswers').get(),
  ]);
  let last7 = 0;
  let last30 = 0;
  for (const d of practice.docs) {
    last30 += 1;
    if ((toMillis(d.data().timestamp) ?? 0) >= since7) last7 += 1;
  }
  for (const d of quizzes.docs) {
    const at = toMillis(d.data().timestamp) ?? 0;
    if (at < since30.getTime()) continue;
    const n = Object.keys(d.data().userAnswers ?? {}).length;
    last30 += n;
    if (at >= since7) last7 += n;
  }
  return { last7, last30 };
}
