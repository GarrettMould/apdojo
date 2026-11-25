/* eslint-disable @next/next/no-img-element -- whiteboards come from short-lived signed links, not next/image */
import { ArrowRight, ClipboardCheck, FileText, Sparkles, Target, type LucideIcon } from 'lucide-react';
import {
  FAMILY_SKILL_LABELS,
  LESSON_NOTE_FIELDS,
  type LessonBoardView,
  type LessonNotes,
  type SharedLessonNotes,
  type SkillLevel,
} from '@/lib/tutoringLessons';

const FAMILY_LABEL = Object.fromEntries(LESSON_NOTE_FIELDS.map((f) => [f.key, f.familyLabel])) as Record<keyof LessonNotes, string>;

const LEVEL_STYLE: Record<SkillLevel, { bar: string; text: string }> = {
  1: { bar: 'bg-red-400', text: 'text-red-700' },
  2: { bar: 'bg-amber-400', text: 'text-amber-700' },
  3: { bar: 'bg-emerald-500', text: 'text-emerald-700' },
};

/** A note field as lines, without any bullet characters the tutor typed. */
function lines(text: string): string[] {
  return text
    .split('\n')
    .map((line) => line.replace(/^\s*(?:[-•*]|\d+[.)])\s+/, '').trim())
    .filter(Boolean);
}

/** One line reads as a sentence; several read as a list. */
function NoteText({ text }: { text: string }) {
  const items = lines(text);
  if (items.length === 1) return <p className="text-sm leading-relaxed text-slate-700">{items[0]}</p>;
  return (
    <ul className="flex flex-col gap-2">
      {items.map((item, i) => (
        <li key={i} className="flex gap-2.5 text-sm leading-relaxed text-slate-700">
          <span className="mt-[0.55rem] h-1 w-1 shrink-0 rounded-full bg-slate-400" aria-hidden />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function Label({ children }: { children: string }) {
  return <h4 className="text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500">{children}</h4>;
}

function NoteCard({ icon: Icon, tint, title, text }: { icon: LucideIcon; tint: string; title: string; text: string }) {
  return (
    <section className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
      <h4 className="flex items-center gap-2 text-sm font-bold text-slate-900">
        <span className={`inline-flex h-7 w-7 items-center justify-center rounded-lg ${tint}`}>
          <Icon className="h-4 w-4" aria-hidden />
        </span>
        {title}
      </h4>
      <NoteText text={text} />
    </section>
  );
}

function Whiteboards({ boards }: { boards: LessonBoardView[] }) {
  return (
    <section className="flex flex-col gap-2.5">
      <Label>From the whiteboard</Label>
      <ul className={`grid gap-3 ${boards.length > 1 ? 'sm:grid-cols-2' : ''}`}>
        {boards.map((b) => (
          <li key={b.id}>
            <a
              href={b.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:border-slate-300 hover:shadow-[0_8px_20px_-10px_rgba(15,23,42,0.25)]"
            >
              {b.contentType === 'application/pdf' ? (
                <span className="flex aspect-[16/10] flex-col items-center justify-center gap-2 bg-slate-50 text-slate-500">
                  <FileText className="h-8 w-8" aria-hidden />
                  <span className="text-xs font-semibold">Open PDF</span>
                </span>
              ) : (
                <img
                  src={b.url}
                  alt={b.caption || 'Whiteboard from the lesson'}
                  className="aspect-[16/10] w-full bg-slate-50 object-contain"
                  loading="lazy"
                />
              )}
              {b.caption ? <span className="block border-t border-slate-100 px-3.5 py-2.5 text-sm text-slate-700">{b.caption}</span> : null}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

function SkillMeter({ level }: { level: SkillLevel }) {
  return (
    <span className="flex gap-1" aria-hidden>
      {[1, 2, 3].map((n) => (
        <span key={n} className={`h-1.5 w-5 rounded-full ${n <= level ? LEVEL_STYLE[level].bar : 'bg-slate-200'}`} />
      ))}
    </span>
  );
}

/**
 * A lesson's notes as the student and family see them. Used on My Bookings and in the tutor's preview and
 * sent view, so the tutor sees exactly what the family gets.
 */
export default function LessonNotesView({
  shared,
  tutorName = 'Garrett',
}: {
  shared: Pick<SharedLessonNotes, 'notes' | 'skills'> & {
    boards?: LessonBoardView[];
    practice?: SharedLessonNotes['practice'];
  };
  tutorName?: string;
}) {
  const { notes, skills } = shared;
  const summary = notes.summary.trim();
  const topics = lines(notes.topicsCovered);
  const hasStrengths = !!notes.strengths.trim();
  const hasFocus = !!notes.focusAreas.trim();
  const homework = notes.homework.trim();
  const practice = shared.practice ?? null;
  const boards = (shared.boards ?? []).filter((b) => b.url);

  return (
    <div className="flex flex-col gap-6">
      {summary ? (
        <figure className="rounded-2xl bg-[#f7f2e8] px-5 py-5 sm:px-6">
          <blockquote className="whitespace-pre-line text-[15px] leading-relaxed text-stone-800 sm:text-base">{summary}</blockquote>
          <figcaption className="mt-4 flex items-center gap-2.5 text-sm text-stone-600">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-stone-800 text-xs font-bold text-[#f7f2e8]">
              {tutorName.charAt(0)}
            </span>
            <span>
              <span className="font-semibold text-stone-800">{tutorName}</span>, your tutor
            </span>
          </figcaption>
        </figure>
      ) : null}

      {topics.length > 0 ? (
        <section className="flex flex-col gap-2.5">
          <Label>{FAMILY_LABEL.topicsCovered}</Label>
          <ul className="flex flex-wrap gap-2">
            {topics.map((topic, i) => (
              <li key={i} className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700">
                {topic}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {skills.length > 0 ? (
        <section className="flex flex-col gap-2.5">
          <Label>Skill check</Label>
          <ul className="divide-y divide-slate-100 rounded-2xl border border-slate-200 bg-white">
            {skills.map((s, i) => (
              <li key={`${i}-${s.skill}`} className="flex items-center justify-between gap-4 px-4 py-3 sm:px-5">
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-slate-900">{s.skill}</p>
                  {s.lesson ? (
                    <p className="mt-0.5 truncate text-xs text-slate-500">
                      <span className="tabular-nums">Lesson {s.lesson}</span>
                      {s.lessonName && s.lessonName !== s.skill ? ` · ${s.lessonName}` : null}
                    </p>
                  ) : null}
                </div>
                <div className="flex shrink-0 flex-col items-end gap-1.5">
                  <SkillMeter level={s.level} />
                  <span className={`text-xs font-semibold ${LEVEL_STYLE[s.level].text}`}>{FAMILY_SKILL_LABELS[s.level]}</span>
                </div>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {hasStrengths || hasFocus ? (
        <div className="grid gap-3 sm:grid-cols-2">
          {hasStrengths ? (
            <NoteCard icon={Sparkles} tint="bg-emerald-50 text-emerald-600" title={FAMILY_LABEL.strengths} text={notes.strengths} />
          ) : null}
          {hasFocus ? (
            <NoteCard icon={Target} tint="bg-amber-50 text-amber-600" title={FAMILY_LABEL.focusAreas} text={notes.focusAreas} />
          ) : null}
        </div>
      ) : null}

      {boards.length > 0 ? <Whiteboards boards={boards} /> : null}

      {homework || practice ? (
        <section className="flex gap-3.5 rounded-2xl border border-blue-100 bg-blue-50/60 p-4 sm:p-5">
          <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white">
            <ClipboardCheck className="h-5 w-5" aria-hidden />
          </span>
          <div className="flex min-w-0 flex-1 flex-col gap-2">
            <h4 className="text-sm font-bold text-slate-900">{FAMILY_LABEL.homework}</h4>
            {homework ? <NoteText text={homework} /> : null}
            {practice ? (
              <a
                href={practice.path}
                className="mt-1 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-white px-4 py-3 ring-1 ring-blue-100 transition hover:ring-blue-300"
              >
                <span>
                  <span className="block text-sm font-bold text-slate-900">Practice set · {practice.count} questions</span>
                  <span className="block text-xs text-slate-500">Picked for what we worked on. No account needed.</span>
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3.5 py-2 text-sm font-bold text-white">
                  Start practice <ArrowRight className="h-4 w-4" aria-hidden />
                </span>
              </a>
            ) : null}
          </div>
        </section>
      ) : null}
    </div>
  );
}
