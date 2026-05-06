import type { CourseSubject } from '@/lib/courseSubject';
import { COURSE_CURRICULUM_OUTLINES, type CourseOutlineId } from '@/data/courseCurriculumOutline';

export type TutorStarterChoice = { label: string; prompt: string };

/** When outline is missing or a unit has very few lessons. */
export const FALLBACK_TUTOR_STARTERS: TutorStarterChoice[] = [
  {
    label: 'Practice question',
    prompt: "I'd like a practice AP-style question based on what we just discussed.",
  },
  {
    label: 'Simpler breakdown',
    prompt:
      'Please break this down step by step in simpler language—smaller chunks at a time until I can follow.',
  },
  {
    label: 'How this unit is tested',
    prompt:
      'How does this unit usually show up on the AP exam—in what forms, and what mistakes do students commonly make?',
  },
];

/** Short button label derived from AP lesson titles (comma / “and” / parenthetical trimmed). */
function chipLabelFromLessonName(name: string): string {
  let s = name.trim();
  const andMatch = /\s+and\s+/i.exec(s);
  if (andMatch && andMatch.index !== undefined && andMatch.index >= 5 && andMatch.index < 60) {
    s = s.slice(0, andMatch.index).trim();
  }
  const comma = s.indexOf(',');
  if (comma > 10 && comma < s.length - 5 && s.length > 38) {
    s = s.slice(0, comma).trim();
  }
  const paren = s.indexOf('(');
  if (paren >= 12) {
    s = s.slice(0, paren).trim();
  }
  if (s.length > 40) {
    const sp = s.lastIndexOf(' ', 37);
    s = sp > 10 ? s.slice(0, sp).trimEnd() : `${s.slice(0, 36).trim()}…`;
  }
  return s;
}

/** Three spread lesson indices covering early / mid / late ideas in the unit. */
export function tutorStarterLessonIndices(lessonCount: number): number[] {
  const n = lessonCount;
  if (n <= 0) return [];
  let a: number;
  let b: number;
  let c: number;
  if (n === 1) {
    return [0];
  }
  if (n === 2) {
    return [0, 1];
  }
  if (n === 3) {
    return [0, 1, 2];
  }
  if (n <= 5) {
    a = 0;
    b = Math.max(1, Math.floor((n - 1) / 2));
    c = n - 1;
  } else {
    a = Math.min(2, n - 4);
    b = Math.floor(n * 0.55);
    c = n - 1;
  }

  const out: number[] = [];
  for (const idx of [a, b, c]) {
    const j = Math.max(0, Math.min(n - 1, idx));
    if (!out.includes(j)) out.push(j);
  }
  let pad = 0;
  while (out.length < 3 && pad < n) {
    if (!out.includes(pad)) out.push(pad);
    pad++;
  }
  return out.slice(0, 3).sort((x, y) => x - y);
}

/**
 * Exactly three clickable starters for first tutor message — real lesson strands for this unit.
 */
export function getTutorWelcomeStarterChoices(
  subject: CourseSubject,
  unitNumber: number,
  unitTitle?: string | null
): TutorStarterChoice[] {
  const outline = COURSE_CURRICULUM_OUTLINES[subject as CourseOutlineId];
  const unit = outline.units.find((u) => u.unitNumber === unitNumber);

  const meta = [`Unit ${unitNumber}`, unit?.unitName ?? unitTitle].filter(Boolean).join(' · ');

  if (!unit || unit.lessons.length === 0) {
    return FALLBACK_TUTOR_STARTERS;
  }

  const idxs = tutorStarterLessonIndices(unit.lessons.length);
  const lessonPicks = idxs.map((i) => unit.lessons[i]);

  const seen = new Set<string>();
  const choices: TutorStarterChoice[] = [];

  for (const lesson of lessonPicks) {
    const full = lesson.name.trim();
    const labelBase = chipLabelFromLessonName(full);
    const label = seen.has(labelBase)
      ? `${labelBase} (${lesson.lessonNumber})`
      : labelBase;
    seen.add(labelBase);

    const prompt = `${meta}: please tutor me on **${full}**. Give a tight overview for the AP exam, link it to neighboring ideas in this unit, then note two common misconceptions.`;

    choices.push({
      label: label.length > 42 ? `${label.slice(0, 39)}…` : label,
      prompt,
    });
  }

  /** Units with only one or two lessons borrow generic starters until we have three chips. */
  let f = 0;
  while (choices.length < 3 && f < FALLBACK_TUTOR_STARTERS.length) {
    const row = FALLBACK_TUTOR_STARTERS[f]!;
    choices.push({
      label: row.label,
      prompt: `${meta}: ${row.prompt}`,
    });
    f++;
  }

  return choices.slice(0, 3);
}
