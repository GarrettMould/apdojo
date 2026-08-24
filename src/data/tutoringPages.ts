import type { CourseSubject } from '@/lib/courseSubject';
import { isCourseSubject, subjectOnboardingTitle } from '@/lib/courseSubject';

export interface TutoringTutor {
  id: string;
  name: string;
  title: string;
  /** Short headline under the name. */
  tagline: string;
  description: string;
  specialties: string[];
  /** Calendly (or booking) embed URL — placeholder until real links are set. */
  calendlyUrl: string;
  /** Initials shown in the avatar placeholder. */
  initials: string;
  /** Whether this person built the AP Dojo course for the subject. */
  isCourseCreator?: boolean;
}

export interface TutoringPageConfig {
  subject: CourseSubject;
  courseLabel: string;
  badge: string;
  headline: string;
  supporting: string;
  accentText: string;
  accentBg: string;
  /** Soft wash / chip backgrounds. */
  accentSoft: string;
  accentSoftText: string;
  /** Hero atmosphere gradient (inline style). */
  heroWash: string;
  /** Shared session details shown on the booking panel. */
  sessionLength: string;
  sessionFormat: string;
  sessionPrice: string;
  /** Featured tutor shown first; others appear in the picker below. */
  tutors: TutoringTutor[];
  howItWorks: string[];
}

const DEFAULT_CALENDLY = 'https://calendly.com/garrettmould/apdojo';

const HOW_IT_WORKS: string[] = [
  'Choose from a small roster of subject teachers — not a marketplace of random tutors',
  'Book a private live session on their calendar',
  'Bring the exact units, FRQs, or score goals you care about',
  'Leave with teacher-level feedback and a clear practice plan',
];

function accentFor(
  subject: CourseSubject
): Pick<
  TutoringPageConfig,
  'accentText' | 'accentBg' | 'accentSoft' | 'accentSoftText' | 'heroWash'
> {
  switch (subject) {
    case 'micro':
      return {
        accentText: 'text-emerald-800',
        accentBg: 'bg-emerald-600',
        accentSoft: 'bg-emerald-50',
        accentSoftText: 'text-emerald-800',
        heroWash:
          'radial-gradient(ellipse 80% 60% at 0% 0%, rgba(16,185,129,0.28), transparent 55%), radial-gradient(ellipse 50% 45% at 100% 10%, rgba(52,211,153,0.18), transparent 50%), linear-gradient(180deg, #ecfdf5 0%, #f8fafc 55%, #f8fafc 100%)',
      };
    case 'gov':
      return {
        accentText: 'text-indigo-800',
        accentBg: 'bg-indigo-600',
        accentSoft: 'bg-indigo-50',
        accentSoftText: 'text-indigo-800',
        heroWash:
          'radial-gradient(ellipse 80% 60% at 0% 0%, rgba(79,70,229,0.26), transparent 55%), radial-gradient(ellipse 50% 45% at 100% 10%, rgba(129,140,248,0.16), transparent 50%), linear-gradient(180deg, #eef2ff 0%, #f8fafc 55%, #f8fafc 100%)',
      };
    case 'stats':
      return {
        accentText: 'text-orange-800',
        accentBg: 'bg-orange-600',
        accentSoft: 'bg-orange-50',
        accentSoftText: 'text-orange-900',
        heroWash:
          'radial-gradient(ellipse 80% 60% at 0% 0%, rgba(234,88,12,0.28), transparent 55%), radial-gradient(ellipse 50% 45% at 100% 10%, rgba(251,146,60,0.2), transparent 50%), linear-gradient(180deg, #fff7ed 0%, #f8fafc 55%, #f8fafc 100%)',
      };
    case 'macro':
    default:
      return {
        accentText: 'text-sky-900',
        accentBg: 'bg-sky-600',
        accentSoft: 'bg-sky-50',
        accentSoftText: 'text-sky-900',
        heroWash:
          'radial-gradient(ellipse 80% 60% at 0% 0%, rgba(14,165,233,0.28), transparent 55%), radial-gradient(ellipse 50% 45% at 100% 10%, rgba(56,189,248,0.16), transparent 50%), linear-gradient(180deg, #e0f2fe 0%, #f8fafc 55%, #f8fafc 100%)',
      };
  }
}

/** Intentionally small rosters — premium, selective, teacher-led. */
const TUTORS_BY_SUBJECT: Record<CourseSubject, TutoringTutor[]> = {
  macro: [
    {
      id: 'jordan-hale',
      name: 'Jordan Hale',
      title: 'AP Macro teacher · Course creator',
      tagline: 'The person who built the Macro course — now in your session',
      description:
        'Jordan teaches AP Macro every year and designed AP Dojo’s Macro curriculum. Sessions dig into the exact graphs and FRQ moves the exam rewards — with the clarity of someone who wrote the materials.',
      specialties: ['AD-AS', 'Fiscal & monetary policy', 'FRQ graphing'],
      calendlyUrl: DEFAULT_CALENDLY,
      initials: 'JH',
      isCourseCreator: true,
    },
    {
      id: 'maya-chen',
      name: 'Maya Chen',
      title: 'AP Macro teacher',
      tagline: 'Classroom-tested help for stuck units',
      description:
        'Maya teaches Macro full-time. She’s the one you want when a unit feels foggy — she diagnoses misconceptions fast, then drills the question types that show up on unit tests and the AP exam.',
      specialties: ['Unit 3–4 deep dives', 'MCQ strategy', 'Exam review'],
      calendlyUrl: DEFAULT_CALENDLY,
      initials: 'MC',
    },
  ],
  micro: [
    {
      id: 'sam-ortiz',
      name: 'Sam Ortiz',
      title: 'AP Micro teacher · Course creator',
      tagline: 'Course creator. Classroom teacher. Your 1:1.',
      description:
        'Sam teaches AP Micro and built Dojo’s Micro course. Expect patient graph walkthroughs — costs, competition, monopoly, factor markets — with the same standards baked into every practice set on the site.',
      specialties: ['Cost curves', 'Market structures', 'FRQ setup'],
      calendlyUrl: DEFAULT_CALENDLY,
      initials: 'SO',
      isCourseCreator: true,
    },
    {
      id: 'riley-park',
      name: 'Riley Park',
      title: 'AP Micro teacher',
      tagline: 'Clarity first, then exam speed',
      description:
        'Riley teaches Micro and coaches students who need foundations rebuilt gently — then layered with timed MCQ and FRQ practice so every session ends with a concrete plan.',
      specialties: ['Elasticity', 'Externalities', 'Weekly study plans'],
      calendlyUrl: DEFAULT_CALENDLY,
      initials: 'RP',
    },
  ],
  gov: [
    {
      id: 'alex-rivera',
      name: 'Alex Rivera',
      title: 'AP Gov teacher · Course creator',
      tagline: 'Required cases from the teacher who built the course',
      description:
        'Alex teaches AP Gov and created Dojo’s Gov materials — including the SCOTUS case approach students use on the site. Ideal if you need cases to stick and comparison FRQs that match how readers score.',
      specialties: ['SCOTUS comparisons', 'Argument essay', 'Unit tests'],
      calendlyUrl: DEFAULT_CALENDLY,
      initials: 'AR',
      isCourseCreator: true,
    },
    {
      id: 'jordan-wells',
      name: 'Jordan Wells',
      title: 'AP Gov teacher',
      tagline: 'Institutions, rights, and FRQ frameworks',
      description:
        'Jordan teaches Government and Politics with clear frameworks for federalism, civil liberties, and institutions — then turns them into MCQ and FRQ practice that feels like the real exam.',
      specialties: ['Constitution', 'Civil rights', 'MCQ patterns'],
      calendlyUrl: DEFAULT_CALENDLY,
      initials: 'JW',
    },
  ],
  stats: [
    {
      id: 'casey-nguyen',
      name: 'Casey Nguyen',
      title: 'AP Stats teacher · Course creator',
      tagline: 'Inference from the teacher behind the Stats course',
      description:
        'Casey teaches AP Statistics and built Dojo’s Stats curriculum. Sessions demystify confidence intervals, significance tests, and chi-square — with FRQ writing that matches what readers actually score.',
      specialties: ['Inference', 'FRQ packs', 'Unit 3–5'],
      calendlyUrl: DEFAULT_CALENDLY,
      initials: 'CN',
      isCourseCreator: true,
    },
    {
      id: 'morgan-lee',
      name: 'Morgan Lee',
      title: 'AP Stats teacher',
      tagline: 'From formulas to fluent procedure choice',
      description:
        'Morgan teaches Stats and helps students stop memorizing formulas blindly — so they can choose the right procedure under time pressure and communicate it the way the rubric expects.',
      specialties: ['Probability', 'Sampling', 'Procedure choice'],
      calendlyUrl: DEFAULT_CALENDLY,
      initials: 'ML',
    },
  ],
};

export function getTutoringPageConfig(subject: CourseSubject): TutoringPageConfig {
  const accents = accentFor(subject);
  const courseLabel = subjectOnboardingTitle(subject);
  return {
    subject,
    courseLabel,
    badge: 'AP Dojo Tutoring',
    headline: 'Learn from the teachers behind the course.',
    supporting: `A small roster of ${courseLabel} teachers — including the course creators themselves. Private 1:1 sessions. No tutor marketplace. No filler.`,
    sessionLength: '60 minutes',
    sessionFormat: 'Private live video',
    sessionPrice: '$60',
    ...accents,
    tutors: TUTORS_BY_SUBJECT[subject],
    howItWorks: HOW_IT_WORKS,
  };
}

export function tutoringPagePath(subject: CourseSubject): string {
  return `/tutoring/${subject}`;
}

export function parseTutoringSubject(raw: string | null | undefined): CourseSubject | null {
  const v = (raw ?? '').trim().toLowerCase();
  return isCourseSubject(v) ? v : null;
}
