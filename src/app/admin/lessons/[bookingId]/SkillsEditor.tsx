'use client';

import { useEffect, useRef, useState, type FormEvent, type ReactNode, type RefObject } from 'react';
import { Check, ChevronDown, Pencil, Plus, Sparkles, Trash2 } from 'lucide-react';
import {
  MAX_LESSON_SKILLS,
  MAX_SKILL_NAME_CHARS,
  SKILL_LEVELS,
  courseUnits,
  findLesson,
  type LessonCourse,
  type LessonSkill,
  type SkillLevel,
} from '@/lib/tutoringLessons';
import { dojoButtonPrimary, dojoInput } from '../dojoStyles';

/**
 * Skills sit on a warm beige base; the level shows as a colored dot and a faint tint in the border, so a
 * row of skills reads calmly instead of as solid blocks of color.
 */
const LEVEL_STYLES: Record<SkillLevel, { pill: string; dot: string; option: string }> = {
  1: { pill: 'bg-[#f7f2e8] text-stone-800 ring-[#e9cfc4] hover:bg-[#f1eadc]', dot: 'bg-red-500', option: 'hover:bg-red-50' },
  2: { pill: 'bg-[#f7f2e8] text-stone-800 ring-[#eadbb8] hover:bg-[#f1eadc]', dot: 'bg-amber-400', option: 'hover:bg-amber-50' },
  3: {
    pill: 'bg-[#f7f2e8] text-stone-800 ring-[#cfdcc2] hover:bg-[#f1eadc]',
    dot: 'bg-emerald-500',
    option: 'hover:bg-emerald-50',
  },
};

type SkillFields = Pick<LessonSkill, 'skill' | 'level' | 'unit' | 'lesson'>;

function Dot({ level, size = 'h-2.5 w-2.5' }: { level: SkillLevel; size?: string }) {
  return <span className={`${size} shrink-0 rounded-full ${LEVEL_STYLES[level].dot}`} aria-hidden />;
}

/** Closes a popover or modal on Escape or a click outside `ref`. */
function useDismiss(open: boolean, close: () => void, ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close();
    const onClick = (e: MouseEvent) => ref.current && !ref.current.contains(e.target as Node) && close();
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onClick);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onClick);
    };
  }, [open, close, ref]);
}

/** "3.2" for a skill tied to a lesson, "Unit 3" for one tied only to a unit. */
function curriculumTag(skill: LessonSkill): string | null {
  if (skill.lesson) return skill.lesson;
  if (skill.unit !== null) return `Unit ${skill.unit}`;
  return null;
}

function MenuItem({ icon, onClick, children }: { icon: ReactNode; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      role="menuitem"
      onClick={onClick}
      className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm font-medium text-slate-600 hover:bg-slate-100"
    >
      {icon} {children}
    </button>
  );
}

function SkillPill({
  skill,
  onLevel,
  onEdit,
  onRemove,
}: {
  skill: LessonSkill;
  onLevel: (level: SkillLevel) => void;
  onEdit: () => void;
  onRemove: () => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useDismiss(open, () => setOpen(false), ref);
  const tag = curriculumTag(skill);
  const lessonName = findLesson(skill.course, skill.unit, skill.lesson)?.name;

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
        title={lessonName ? `${skill.lesson} ${lessonName}` : undefined}
        className={`inline-flex items-center gap-2 rounded-lg py-2 pl-3 pr-2.5 text-sm font-semibold ring-1 ring-inset transition ${LEVEL_STYLES[skill.level].pill}`}
      >
        <Dot level={skill.level} />
        {skill.skill}
        {tag ? <span className="text-xs font-medium tabular-nums opacity-60">{tag}</span> : null}
        {skill.assessedBy === 'ai' ? <Sparkles className="h-3.5 w-3.5 opacity-50" aria-label="AI estimate" /> : null}
      </button>

      {open ? (
        <div
          role="menu"
          className="absolute left-0 top-full z-20 mt-2 w-56 rounded-xl border border-slate-200 bg-white p-1.5 shadow-[0_10px_30px_-10px_rgba(15,23,42,0.25)]"
        >
          {skill.assessedBy === 'ai' ? (
            <p className="px-3 pb-1.5 pt-1 text-[11px] font-bold uppercase tracking-[0.12em] text-slate-400">
              AI estimate · your call
            </p>
          ) : null}
          {SKILL_LEVELS.map((option) => (
            <button
              key={option.level}
              type="button"
              role="menuitemradio"
              aria-checked={skill.level === option.level}
              onClick={() => {
                onLevel(option.level);
                setOpen(false);
              }}
              className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm font-medium text-slate-800 ${LEVEL_STYLES[option.level].option}`}
            >
              <Dot level={option.level} />
              <span className="flex-1">{option.label}</span>
              {skill.level === option.level ? <Check className="h-4 w-4 text-slate-500" aria-hidden /> : null}
            </button>
          ))}
          <div className="my-1 border-t border-slate-100" />
          <MenuItem
            icon={<Pencil className="h-3.5 w-3.5" aria-hidden />}
            onClick={() => {
              setOpen(false);
              onEdit();
            }}
          >
            Edit
          </MenuItem>
          <MenuItem icon={<Trash2 className="h-3.5 w-3.5" aria-hidden />} onClick={onRemove}>
            Remove
          </MenuItem>
        </div>
      ) : null}
    </div>
  );
}

/** A native select styled like the inputs, with its own chevron. */
function Select({
  label,
  value,
  onChange,
  disabled,
  children,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  children: ReactNode;
}) {
  return (
    <label className="flex min-w-0 flex-col gap-1.5">
      <span className="text-xs font-bold text-slate-700">{label}</span>
      <span className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className={`${dojoInput} appearance-none truncate pr-9 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400`}
        >
          {children}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden />
      </span>
    </label>
  );
}

function SkillModal({
  course,
  initial,
  editing,
  onSave,
  onClose,
}: {
  course: LessonCourse | null;
  initial: SkillFields;
  editing: boolean;
  onSave: (skill: SkillFields) => void;
  onClose: () => void;
}) {
  const [name, setName] = useState(initial.skill);
  const [level, setLevel] = useState<SkillLevel>(initial.level);
  const [unit, setUnit] = useState<number | null>(initial.unit);
  const [lesson, setLesson] = useState<string | null>(initial.lesson);
  const ref = useRef<HTMLFormElement>(null);
  useDismiss(true, onClose, ref);

  const units = course ? courseUnits(course) : [];
  const unitLessons = units.find((u) => u.unitNumber === unit)?.lessons ?? [];
  const lessonName = unitLessons.find((l) => l.lessonNumber === lesson)?.name ?? '';
  // With no name typed, the chosen lesson's name is used.
  const finalName = name.trim() || lessonName;

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (finalName) onSave({ skill: finalName.slice(0, MAX_SKILL_NAME_CHARS), level, unit, lesson });
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-900/30 p-4 backdrop-blur-[2px]">
      <form
        ref={ref}
        onSubmit={submit}
        role="dialog"
        aria-modal="true"
        aria-labelledby="skill-modal-title"
        className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-[0_24px_60px_-16px_rgba(15,23,42,0.35)] sm:p-7"
      >
        {course ? <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-blue-600">{course}</p> : null}
        <h3 id="skill-modal-title" className="mt-1 text-xl font-black tracking-tight text-slate-900">
          {editing ? 'Edit skill' : 'Add a skill'}
        </h3>
        <p className="mt-1 text-sm text-slate-500">
          {course
            ? 'Tag it to a lesson so follow-up practice matches it.'
            : 'The subject isn’t known yet, so units and lessons aren’t available. Draft notes with AI first to tag them.'}
        </p>

        <div className="mt-5 flex flex-col gap-4">
          {course ? (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Select
                label="Unit"
                value={unit === null ? '' : String(unit)}
                onChange={(v) => {
                  setUnit(v ? Number(v) : null);
                  setLesson(null);
                }}
              >
                <option value="">Choose a unit</option>
                {units.map((u) => (
                  <option key={u.unitNumber} value={u.unitNumber}>
                    Unit {u.unitNumber} · {u.unitName}
                  </option>
                ))}
              </Select>
              <Select label="Lesson" value={lesson ?? ''} onChange={(v) => setLesson(v || null)} disabled={unit === null}>
                <option value="">{unit === null ? 'Choose a unit first' : 'Whole unit'}</option>
                {unitLessons.map((l) => (
                  <option key={l.lessonNumber} value={l.lessonNumber}>
                    {l.lessonNumber} · {l.name}
                  </option>
                ))}
              </Select>
            </div>
          ) : null}

          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-bold text-slate-700">
              Skill{' '}
              {lessonName && !name.trim() ? (
                <span className="font-normal text-slate-400">· leave blank to use the lesson name</span>
              ) : null}
            </span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={MAX_SKILL_NAME_CHARS}
              placeholder={lessonName || 'e.g. Tax multiplier'}
              autoFocus={!course || editing}
              className={dojoInput}
            />
          </label>

          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-bold text-slate-700">How solid is it?</span>
            <div className="grid grid-cols-3 gap-2" role="radiogroup" aria-label="Level">
              {SKILL_LEVELS.map((option) => (
                <button
                  key={option.level}
                  type="button"
                  role="radio"
                  aria-checked={level === option.level}
                  onClick={() => setLevel(option.level)}
                  className={`flex items-center justify-center gap-1.5 rounded-lg px-2 py-2.5 text-xs font-semibold transition ${
                    level === option.level
                      ? 'bg-[#f7f2e8] text-stone-900 ring-2 ring-inset ring-stone-400'
                      : 'text-slate-500 ring-1 ring-inset ring-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <Dot level={option.level} size="h-2 w-2" />
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-7 flex justify-end gap-2">
          <button type="button" onClick={onClose} className="rounded-xl px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100">
            Cancel
          </button>
          <button type="submit" disabled={!finalName} className={dojoButtonPrimary}>
            {editing ? 'Save skill' : 'Add skill'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default function SkillsEditor({
  skills,
  course,
  onChange,
}: {
  skills: LessonSkill[];
  /** The lesson's course; the unit and lesson lists come from it. */
  course: LessonCourse | null;
  onChange: (skills: LessonSkill[]) => void;
}) {
  /** The index of the skill being edited, 'new' while adding, or null when the modal is closed. */
  const [modal, setModal] = useState<number | 'new' | null>(null);
  const last = skills[skills.length - 1];
  const editingSkill = typeof modal === 'number' ? skills[modal] : null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      {skills.map((s, i) => (
        <SkillPill
          key={`${i}-${s.skill}`}
          skill={s}
          onLevel={(level) => onChange(skills.map((p, j) => (j === i ? { ...p, level, assessedBy: 'tutor' } : p)))}
          onEdit={() => setModal(i)}
          onRemove={() => onChange(skills.filter((_, j) => j !== i))}
        />
      ))}
      {skills.length < MAX_LESSON_SKILLS ? (
        <button
          type="button"
          onClick={() => setModal('new')}
          className="inline-flex items-center gap-1.5 rounded-lg border border-dashed border-stone-300 px-3 py-2 text-sm font-semibold text-stone-500 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
        >
          <Plus className="h-4 w-4" aria-hidden /> Add skill
        </button>
      ) : null}

      {modal !== null ? (
        <SkillModal
          course={course}
          editing={editingSkill !== null}
          initial={
            editingSkill ?? {
              skill: '',
              level: 2,
              // New skills start in the last skill's unit, since a lesson usually stays in one unit.
              unit: last && last.course === course ? last.unit : null,
              lesson: null,
            }
          }
          onClose={() => setModal(null)}
          onSave={(values) => {
            if (editingSkill) {
              const levelChanged = values.level !== editingSkill.level;
              onChange(
                skills.map((p, j) => (j === modal ? { ...p, ...values, course: p.course ?? course, assessedBy: levelChanged ? 'tutor' : p.assessedBy } : p)),
              );
            } else {
              onChange([...skills, { ...values, assessedBy: 'tutor', course }]);
            }
            setModal(null);
          }}
        />
      ) : null}
    </div>
  );
}
