/* eslint-disable @next/next/no-img-element -- FRQ figures are static imports or URLs, printed at natural size */
import type { FRQPart, FRQSubPart, FRQTableData } from '@/data/frqQuestions';
import { frqImageSrc, frqTotalPoints, type CourseFrq, type FrqCourse } from '@/lib/frqSet';

const COURSE_NAMES: Record<FrqCourse, string> = { macro: 'AP Macroeconomics', micro: 'AP Microeconomics' };

/** "A" → "(a)", "i" → "(i)", as the AP exam labels parts. */
const label = (l: string) => `(${l.toLowerCase()})`;

/** One printed sheet; each starts on a new page when printed. */
function Sheet({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <section
      className={`mx-auto w-full max-w-[8.5in] bg-white px-10 py-12 font-serif text-[15px] leading-relaxed text-black shadow-[0_1px_4px_rgba(0,0,0,0.12)] print:max-w-none print:break-after-page print:px-0 print:py-0 print:shadow-none ${className}`}
    >
      {children}
    </section>
  );
}

function AnswerLines({ count }: { count: number }) {
  return (
    <div className="mt-3 flex flex-col" aria-hidden>
      {Array.from({ length: count }, (_, i) => (
        <span key={i} className="h-8 border-b border-black/60" />
      ))}
    </div>
  );
}

/** A blank graph frame: a box with vertical and horizontal axes to draw on. */
function GraphFrame() {
  return (
    <div className="mt-3 h-56 w-full max-w-md border border-black/70 p-4" aria-hidden>
      <div className="h-full w-full border-b-2 border-l-2 border-black" />
    </div>
  );
}

function FrqTable({ data }: { data: FRQTableData }) {
  return (
    <div className="my-4 overflow-x-auto">
      {data.playerNames ? <p className="mb-1 text-center">{data.playerNames.column}</p> : null}
      <table className="mx-auto border-collapse">
        <thead>
          <tr>
            {data.headers.map((h, i) => (
              <th key={i} className="border border-black px-3 py-1.5 font-normal">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.rows.map((row, ri) => (
            <tr key={ri}>
              {row.map((cell, ci) => (
                <td key={ci} className="border border-black px-3 py-1.5 text-center">
                  {String(cell)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function AnswerSpace({ part, lines }: { part: Pick<FRQPart, 'answerType'>; lines: number }) {
  if (part.answerType === 'draw') return <GraphFrame />;
  if (part.answerType === 'text') return <AnswerLines count={lines} />;
  return null;
}

function SubpartBlock({ sp }: { sp: FRQSubPart }) {
  return (
    <div className="mt-3 pl-6">
      <p className="whitespace-pre-line">
        <span className="mr-2">{label(sp.label)}</span>
        {sp.text}
      </p>
      <AnswerSpace part={sp} lines={3} />
    </div>
  );
}

function FrqSheet({ q, number }: { q: CourseFrq; number: number }) {
  const image = frqImageSrc(q.image);
  return (
    <Sheet>
      <div className="mb-5 flex items-baseline justify-between border-b border-black pb-2">
        <p className="text-lg font-bold">Question {number}</p>
        <p className="text-sm">
          {q.title} · {frqTotalPoints(q)} points
        </p>
      </div>
      <p className="whitespace-pre-line">{q.prompt}</p>
      {image ? <img src={image} alt="" className="mx-auto my-4 max-h-72 max-w-full" /> : null}
      {q.tableData ? <FrqTable data={q.tableData} /> : null}
      <div className="mt-4 flex flex-col gap-5">
        {q.parts.map((part) => (
          <div key={part.label} className="break-inside-avoid">
            <p className="whitespace-pre-line">
              <span className="mr-2">{label(part.label)}</span>
              {part.text}
            </p>
            <AnswerSpace part={part} lines={part.subparts?.length ? 3 : 5} />
            {(part.subparts ?? []).map((sp) => (
              <SubpartBlock key={sp.label} sp={sp} />
            ))}
          </div>
        ))}
      </div>
    </Sheet>
  );
}

/** The written answer for the scoring guide, when the data has one as text. */
function answerText(p: { answer?: unknown; studentExplanation?: string }): string | null {
  if (typeof p.answer === 'string' && p.answer.trim()) return p.answer.trim();
  if (typeof p.studentExplanation === 'string' && p.studentExplanation.trim()) return p.studentExplanation.trim();
  return null;
}

function ScoringGuide({ questions }: { questions: CourseFrq[] }) {
  return (
    <Sheet>
      <p className="mb-1 text-2xl font-bold">Scoring Guide</p>
      <p className="mb-6 border-b border-black pb-3 text-sm">Model answers for each part. Award each point only when the answer shows what’s described.</p>
      <div className="flex flex-col gap-6">
        {questions.map((q, i) => (
          <div key={q.id} className="break-inside-avoid">
            <p className="font-bold">
              Question {i + 1}: {q.title}
            </p>
            {q.parts.map((part) => {
              const a = answerText(part);
              return (
                <div key={part.label} className="mt-2 pl-4">
                  {a ? (
                    <p className="whitespace-pre-line text-[14px]">
                      <span className="mr-2">{label(part.label)}</span>
                      {part.pointValue ? <span className="mr-2 text-[12px]">[{part.pointValue} pt]</span> : null}
                      {a}
                    </p>
                  ) : part.answerType === 'draw' ? (
                    <p className="text-[14px]">
                      <span className="mr-2">{label(part.label)}</span>Graph: see the practice page for the model graph.
                    </p>
                  ) : null}
                  {(part.subparts ?? []).map((sp) => {
                    const sa = answerText(sp);
                    return sa ? (
                      <p key={sp.label} className="mt-1 whitespace-pre-line pl-5 text-[14px]">
                        <span className="mr-2">{label(sp.label)}</span>
                        {sp.pointValue ? <span className="mr-2 text-[12px]">[{sp.pointValue} pt]</span> : null}
                        {sa}
                      </p>
                    ) : null;
                  })}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </Sheet>
  );
}

/**
 * The printable FRQ packet: a cover, one FRQ per page with answer space and graph frames, then (optionally)
 * the scoring guide. Styled like an AP exam booklet; each sheet starts a new page when printed.
 */
export function FrqPacketPages({
  course,
  questions,
  scopeLabel,
  includeScoringGuide,
  coverCount,
}: {
  course: FrqCourse;
  questions: CourseFrq[];
  /** e.g. "All units" or "Unit 3". */
  scopeLabel: string;
  includeScoringGuide: boolean;
  /** The count printed on the cover, when only some pages are shown (the preview). */
  coverCount?: number;
}) {
  return (
    <div className="flex flex-col gap-6 print:block">
      <Sheet className="flex min-h-[9in] flex-col items-center justify-center text-center print:min-h-[9.5in]">
        <p className="text-sm uppercase tracking-[0.3em]">AP Dojo</p>
        <p className="mt-6 text-4xl font-bold">{COURSE_NAMES[course]}</p>
        <p className="mt-2 text-2xl">Free-Response Practice</p>
        <p className="mt-6 text-lg">
          {scopeLabel} · {coverCount ?? questions.length} questions
        </p>
        <div className="mx-auto mt-10 h-px w-40 bg-black" />
        <p className="mt-10 max-w-md text-[15px]">
          Answer every part of each question. Show your work, and draw and label graphs clearly in the frames provided.
        </p>
        <div className="mt-16 flex w-full max-w-md flex-col gap-8 text-left">
          <p className="border-b border-black pb-1">Name:</p>
          <p className="border-b border-black pb-1">Date:</p>
        </div>
      </Sheet>
      {questions.map((q, i) => (
        <FrqSheet key={q.id} q={q} number={i + 1} />
      ))}
      {includeScoringGuide ? <ScoringGuide questions={questions} /> : null}
    </div>
  );
}
