/**
 * Lesson notes for tutoring sessions. One document per lesson in `tutoringLessons`, keyed by the Cal.com
 * booking uid (the same id as its `tutoringBookings` document). Only the server reads or writes it; the
 * transcript is for the tutor only and is never sent to students or parents.
 */

export const TUTORING_LESSONS_COLLECTION = 'tutoringLessons';

/** Lesson notes the tutor writes (later drafted from the transcript). */
export interface LessonNotes {
  summary: string;
  topicsCovered: string;
  strengths: string;
  focusAreas: string;
  homework: string;
}

import {
  COURSE_CURRICULUM_OUTLINES,
  type CourseOutlineId,
  type CurriculumLessonOutline,
  type CurriculumUnitOutline,
} from '@/data/courseCurriculumOutline';

export const EMPTY_LESSON_NOTES: LessonNotes = {
  summary: '',
  topicsCovered: '',
  strengths: '',
  focusAreas: '',
  homework: '',
};

/** `label` is for the tutor; `familyLabel` is the heading students and families see. */
export const LESSON_NOTE_FIELDS: { key: keyof LessonNotes; label: string; familyLabel: string; hint: string }[] = [
  { key: 'summary', label: 'Summary', familyLabel: 'Summary', hint: 'A few sentences on how the lesson went.' },
  { key: 'topicsCovered', label: 'What we covered', familyLabel: 'What we covered', hint: 'Units, skills and question types, one per line.' },
  { key: 'strengths', label: 'Strengths', familyLabel: 'What went well', hint: 'What the student did well.' },
  { key: 'focusAreas', label: 'Needs work', familyLabel: 'What to work on', hint: 'Where they got stuck or made mistakes.' },
  { key: 'homework', label: 'Homework', familyLabel: 'Before next lesson', hint: 'What to do before the next lesson.' },
];

export const LESSON_COURSES = ['AP Macroeconomics', 'AP Microeconomics', 'AP Government', 'AP Statistics'] as const;
export type LessonCourse = (typeof LESSON_COURSES)[number];

const COURSE_OUTLINE_IDS: Record<LessonCourse, CourseOutlineId> = {
  'AP Macroeconomics': 'macro',
  'AP Microeconomics': 'micro',
  'AP Government': 'gov',
  'AP Statistics': 'stats',
};

/** The course's units and their numbered lessons (e.g. "3.2"), from the site's curriculum outline. */
export function courseUnits(course: LessonCourse): CurriculumUnitOutline[] {
  return COURSE_CURRICULUM_OUTLINES[COURSE_OUTLINE_IDS[course]].units;
}

export function findUnit(course: LessonCourse | null, unit: number | null): CurriculumUnitOutline | null {
  if (!course || unit === null) return null;
  return courseUnits(course).find((u) => u.unitNumber === unit) ?? null;
}

export function findLesson(
  course: LessonCourse | null,
  unit: number | null,
  lesson: string | null,
): CurriculumLessonOutline | null {
  if (!lesson) return null;
  return findUnit(course, unit)?.lessons.find((l) => l.lessonNumber === lesson) ?? null;
}

export function isLessonCourse(value: unknown): value is LessonCourse {
  return LESSON_COURSES.includes(value as LessonCourse);
}

/** The course a booking's title or answers name, if exactly one is named ("AP Economics" names none). */
export function detectCourse(text: string): LessonCourse | null {
  const t = text.toLowerCase();
  const found = new Set<LessonCourse>();
  if (/\bmacro/.test(t)) found.add('AP Macroeconomics');
  if (/\bmicro/.test(t)) found.add('AP Microeconomics');
  if (/\bgov|government|politics/.test(t)) found.add('AP Government');
  if (/\bstat/.test(t)) found.add('AP Statistics');
  return found.size === 1 ? [...found][0] : null;
}

/** How well the student handles a skill: 1 needs work, 2 developing, 3 solid. */
export type SkillLevel = 1 | 2 | 3;

export const SKILL_LEVELS: { level: SkillLevel; label: string }[] = [
  { level: 1, label: 'Needs work' },
  { level: 2, label: 'Developing' },
  { level: 3, label: 'Solid' },
];

/** A skill practiced in a lesson; the practice engine uses these to pick follow-up questions. */
export interface LessonSkill {
  skill: string;
  level: SkillLevel;
  /** Whether the level is the AI's estimate from the transcript or the tutor's own assessment. */
  assessedBy: 'ai' | 'tutor';
  /** The lesson's course; null when it isn't known yet. */
  course: LessonCourse | null;
  /** The AP unit, from the AI or the tutor; null when not set. */
  unit: number | null;
  /** The curriculum lesson number within the unit, such as "3.2"; null when not set. */
  lesson: string | null;
}

export const MAX_LESSON_SKILLS = 12;
export const MAX_SKILL_NAME_CHARS = 120;

/**
 * The valid skills in an untrusted list (from the AI draft or a request body), at most MAX_LESSON_SKILLS.
 * Skills with no name are dropped.
 */
export function sanitizeSkills(value: unknown, defaultAssessedBy: LessonSkill['assessedBy'] = 'tutor'): LessonSkill[] {
  const skills: LessonSkill[] = [];
  for (const item of Array.isArray(value) ? value : []) {
    if (!item || typeof item !== 'object') continue;
    const s = item as Record<string, unknown>;
    const skill = typeof s.skill === 'string' ? s.skill.trim().slice(0, MAX_SKILL_NAME_CHARS) : '';
    if (!skill) continue;
    const course = isLessonCourse(s.course) ? s.course : null;
    const lessonNumber = typeof s.lesson === 'string' ? s.lesson.trim() : '';
    // A lesson number like "3.2" also gives the unit when none was sent.
    const unitNumber = s.unit === null || s.unit === undefined ? Number(lessonNumber.split('.')[0]) : Number(s.unit);
    const validUnit = findUnit(course, Number.isInteger(unitNumber) ? unitNumber : null)?.unitNumber ?? null;
    const validLesson = findLesson(course, validUnit, lessonNumber)?.lessonNumber ?? null;
    const rawLevel = Number(s.level);
    const level: SkillLevel = rawLevel === 1 || rawLevel === 2 || rawLevel === 3 ? rawLevel : 2;
    const assessedBy = s.assessedBy === 'ai' || s.assessedBy === 'tutor' ? s.assessedBy : defaultAssessedBy;
    skills.push({ skill, level, assessedBy, course, unit: validUnit, lesson: validLesson });
    if (skills.length >= MAX_LESSON_SKILLS) break;
  }
  return skills;
}

/** Upper limits on saved text, to keep each document well under Firestore's 1 MB cap. */
export const MAX_TRANSCRIPT_CHARS = 400_000;
export const MAX_NOTE_CHARS = 10_000;

/** none: nothing written yet. draft: saved but not shared. shared: sent to the family. */
export type LessonNotesState = 'none' | 'draft' | 'shared';

/** Skill levels as families see them. */
export const FAMILY_SKILL_LABELS: Record<SkillLevel, string> = {
  1: 'Needs practice',
  2: 'Getting there',
  3: 'Strong',
};

/** File types a whiteboard upload can be, with the extension it's stored under. */
export const LESSON_BOARD_TYPES: Record<string, string> = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/webp': 'webp',
  'application/pdf': 'pdf',
};
export const MAX_LESSON_BOARDS = 10;
/** Under Vercel's 4.5 MB request limit. Large images are shrunk in the browser before upload. */
export const MAX_BOARD_BYTES = 4 * 1024 * 1024;
export const MAX_BOARD_CAPTION_CHARS = 200;

/**
 * A whiteboard snapshot (a Miro or Excalidraw export, or a pasted image) from a lesson. The file lives in
 * private storage at a path derived from the lesson and the id; it's only ever shown through short-lived links.
 */
export interface LessonBoard {
  id: string;
  /** The uploaded file's name, for the tutor. */
  name: string;
  contentType: string;
  caption: string;
}

/** A board with a short-lived link to view it (empty in stored snapshots; filled in when read). */
export interface LessonBoardView extends LessonBoard {
  url: string;
}

/** Reads stored boards defensively. */
export function readBoards(value: unknown): LessonBoard[] {
  if (!Array.isArray(value)) return [];
  return value.flatMap((item) => {
    const b = item as Record<string, unknown>;
    if (typeof b?.id !== 'string' || !/^[a-zA-Z0-9-]+$/.test(b.id)) return [];
    if (typeof b.contentType !== 'string' || !LESSON_BOARD_TYPES[b.contentType]) return [];
    return [
      {
        id: b.id,
        name: typeof b.name === 'string' ? b.name.slice(0, 200) : 'Whiteboard',
        contentType: b.contentType,
        caption: typeof b.caption === 'string' ? b.caption.slice(0, MAX_BOARD_CAPTION_CHARS) : '',
      },
    ];
  });
}

/**
 * The notes a family sees: a snapshot taken when the tutor shares, so later draft edits stay private until
 * they are shared again. Never includes the transcript.
 */
export interface SharedLessonNotes {
  notes: LessonNotes;
  skills: { skill: string; level: SkillLevel; lesson: string | null; lessonName: string | null }[];
  course: LessonCourse | null;
  sharedAt: string;
  boards: LessonBoardView[];
  /** The practice set sent with the notes: a link to it on the site. */
  practice: SharedPractice | null;
}

export interface SharedPractice {
  /** Site-relative link to the set, e.g. "/exam/custom?q=…". */
  path: string;
  count: number;
}

/** How many practice questions each skill gets, by how solid it is. */
export const PRACTICE_QUESTIONS_PER_LEVEL: Record<SkillLevel, number> = { 1: 4, 2: 2, 3: 1 };
export const MAX_PRACTICE_QUESTIONS = 12;

/** One question in a lesson's practice set, as the tutor reviews it. */
export interface PracticeQuestionView {
  id: number;
  lesson: string | null;
  lessonName: string | null;
  /** How solid the skill it targets is, from the lesson's skills. */
  level: SkillLevel | null;
  /** The question's opening text, for the tutor's review. */
  preview: string;
}

/** A practice set's result, from the student's submission. */
export interface PracticeResult {
  correct: number;
  total: number;
  submittedAt: string;
  studentName: string | null;
  byLesson: { lesson: string; lessonName: string | null; correct: number; total: number }[];
}

/** The lesson's practice set for the tutor: the proposed questions, gaps, and how the student did. */
export interface LessonPracticeView {
  include: boolean;
  questions: PracticeQuestionView[];
  /** Skills that didn't have enough questions in the bank. */
  gaps: { lesson: string; lessonName: string | null; wanted: number; found: number }[];
  builtAt: string;
  /** Set once the practice has been sent. */
  path: string | null;
  result: PracticeResult | null;
}

/** The family-facing snapshot of a lesson's current notes and skills. */
export function buildSharedNotes(
  notes: LessonNotes,
  skills: LessonSkill[],
  course: LessonCourse | null,
  sharedAt: string,
  boards: LessonBoard[] = [],
  practice: SharedPractice | null = null,
): SharedLessonNotes {
  return {
    boards: boards.map((b) => ({ ...b, url: '' })),
    practice,
    notes,
    skills: skills.map((s) => ({
      skill: s.skill,
      level: s.level,
      lesson: s.lesson,
      lessonName: findLesson(s.course, s.unit, s.lesson)?.name ?? null,
    })),
    course,
    sharedAt,
  };
}

/** Reads a stored snapshot defensively; null if it is missing or malformed. */
export function readSharedNotes(value: unknown): SharedLessonNotes | null {
  if (!value || typeof value !== 'object') return null;
  const v = value as Record<string, unknown>;
  if (typeof v.sharedAt !== 'string' || !v.notes || typeof v.notes !== 'object') return null;
  const rawNotes = v.notes as Record<string, unknown>;
  const notes = { ...EMPTY_LESSON_NOTES };
  for (const { key } of LESSON_NOTE_FIELDS) notes[key] = typeof rawNotes[key] === 'string' ? (rawNotes[key] as string) : '';
  const skills = (Array.isArray(v.skills) ? v.skills : []).flatMap((item) => {
    const s = item as Record<string, unknown>;
    const level = Number(s.level);
    if (typeof s.skill !== 'string' || (level !== 1 && level !== 2 && level !== 3)) return [];
    return [
      {
        skill: s.skill,
        level: level as SkillLevel,
        lesson: typeof s.lesson === 'string' ? s.lesson : null,
        lessonName: typeof s.lessonName === 'string' ? s.lessonName : null,
      },
    ];
  });
  return {
    notes,
    skills,
    course: isLessonCourse(v.course) ? v.course : null,
    sharedAt: v.sharedAt,
    boards: readBoards(v.boards).map((b) => ({ ...b, url: '' })),
    practice: readSharedPractice(v.practice),
  };
}

function readSharedPractice(value: unknown): SharedPractice | null {
  const p = value as Record<string, unknown> | null;
  if (!p || typeof p.path !== 'string' || !p.path.startsWith('/exam/custom?q=') || typeof p.count !== 'number') return null;
  return { path: p.path, count: p.count };
}

/** One booked session as the admin lesson list shows it. */
export interface AdminLessonListItem {
  bookingId: string;
  title: string;
  startTime: string | null;
  endTime: string | null;
  bookingStatus: string;
  studentName: string | null;
  studentEmail: string | null;
  /** The student's site account, when the booking was matched to one. */
  studentUserId: string | null;
  notesState: LessonNotesState;
  /** Shared, then edited since: the family still sees the earlier version. */
  editedSinceShare: boolean;
  hasTranscript: boolean;
}

/** A session with its lesson notes, for the admin lesson editor. */
export interface AdminLessonDetail extends AdminLessonListItem {
  transcript: string;
  notes: LessonNotes;
  skills: LessonSkill[];
  /** The lesson's course, from the booking when it names one, otherwise from the AI draft. */
  course: LessonCourse | null;
  courseSource: 'booking' | 'ai' | null;
  updatedAt: string | null;
  boards: LessonBoardView[];
  practice: LessonPracticeView | null;
  /** The no-login link to the sent notes, for texting. Null until the notes are sent. */
  shareLink: { token: string; enabled: boolean } | null;
  /** What the family currently sees, or null if never shared. */
  shared: (SharedLessonNotes & { sharedTo: string | null }) | null;
}
