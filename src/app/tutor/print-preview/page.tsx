'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { allQuestions } from '@/data/unitPracticeProblems/unitPracticeProblems';
import { frqExams, type FRQExam, type FRQQuestion, type FRQPart, type FRQSubPart } from '@/data/frqQuestions';
import { Question } from '@/data/questionBanks/types';
import { Printer, Loader2, AlertCircle } from 'lucide-react';
import Link from 'next/link';

/** Square area for graphing (draw questions). */
function GraphArea() {
  return (
    <div className="mt-2 w-full max-w-[280px] aspect-square border-2 border-black bg-white print:max-w-[240px]" />
  );
}

/** 3–4 solid black lines for short-answer text. */
function TextLines({ lineCount = 4 }: { lineCount?: number }) {
  return (
    <div className="mt-2 space-y-3">
      {Array.from({ length: lineCount }).map((_, i) => (
        <div key={i} className="border-b-2 border-black min-h-[1.5rem]" />
      ))}
    </div>
  );
}

/** Renders answer text: if it contains "Explanation:", splits with line break and bolds "Explanation:". */
function FormattedAnswer({ text }: { text: string }) {
  if (!text) return null;
  const explIdx = text.indexOf('Explanation:');
  if (explIdx >= 0) {
    const answerPart = text.slice(0, explIdx).trim();
    const explPart = text.slice(explIdx);
    return (
      <div className="space-y-2">
        <p className="text-slate-900 font-normal">{answerPart}</p>
        <p className="text-slate-900 font-normal">
          <span className="font-bold">Explanation:</span>
          {explPart.slice('Explanation:'.length)}
        </p>
      </div>
    );
  }
  return <p className="text-slate-900 font-normal">{text}</p>;
}

/** Renders explanation text: point breakdowns on separate lines with labels bold; "Explanation:" bold if present. */
function FormattedExplanation({ text }: { text: string }) {
  const segments = text.split(/(?=\d+ points?:)/i).filter(Boolean);
  if (segments.length > 1) {
    return (
      <div className="text-sm text-slate-600 space-y-1">
        {segments.map((seg, i) => {
          const colonIdx = seg.indexOf(':');
          const label = colonIdx >= 0 ? seg.slice(0, colonIdx + 1).trim() : '';
          const rest = colonIdx >= 0 ? seg.slice(colonIdx + 1).trim() : seg;
          return (
            <p key={i}>
              <span className="font-bold text-slate-700">{label}</span> {rest}
            </p>
          );
        })}
      </div>
    );
  }
  const explIdx = text.indexOf('Explanation:');
  if (explIdx >= 0) {
    return (
      <p className="text-sm text-slate-600">
        {text.slice(0, explIdx)}
        <span className="font-bold text-slate-700">Explanation:</span>
        {text.slice(explIdx + 'Explanation:'.length)}
      </p>
    );
  }
  return <p className="text-sm text-slate-600">{text}</p>;
}

/** Assignment header: AP Dojo + logo left, Name/Date/Class right. */
function AssignmentHeader({ compactPrint }: { compactPrint?: boolean }) {
  return (
    <header className={`pb-6 mb-6 border-b-2 border-slate-300 print:pb-4 print:mb-4 ${compactPrint ? 'print:!pb-1 print:!mb-1' : ''}`}>
      <div className={`flex items-start justify-between gap-6 ${compactPrint ? 'print:gap-3' : ''}`}>
        <div className="flex flex-col gap-1">
          <div className={`flex items-center gap-3 ${compactPrint ? 'print:gap-2' : ''}`}>
            <img
              src="/images/dojoIconJan26.svg"
              alt=""
              className={`w-12 h-12 print:w-10 print:h-10 ${compactPrint ? 'print:!w-8 print:!h-8' : ''}`}
            />
            <span className="text-xl font-black text-slate-900 print:text-lg">
              AP <span className="text-blue-600">Dojo</span>
            </span>
          </div>
          <p className="text-sm text-slate-600 print:text-xs">
            Practice Tests, MCQ, FRQ Practice at apdojo.com
          </p>
        </div>
        <div className={`flex flex-col gap-2 min-w-[180px] print:min-w-[160px] ${compactPrint ? 'print:!min-w-[120px] print:!gap-1' : ''}`}>
        <div className="flex items-baseline gap-2">
          <span className={`text-sm font-bold text-slate-700 w-12 flex-shrink-0 print:text-xs ${compactPrint ? 'print:!text-[10px]' : ''}`}>Name:</span>
          <div className={`flex-1 border-b-2 border-black min-h-[1.25rem] ${compactPrint ? 'print:!min-h-[0.875rem]' : ''}`} />
        </div>
        <div className="flex items-baseline gap-2">
          <span className={`text-sm font-bold text-slate-700 w-12 flex-shrink-0 print:text-xs ${compactPrint ? 'print:!text-[10px]' : ''}`}>Date:</span>
          <div className={`flex-1 border-b-2 border-black min-h-[1.25rem] ${compactPrint ? 'print:!min-h-[0.875rem]' : ''}`} />
        </div>
        <div className="flex items-baseline gap-2">
          <span className={`text-sm font-bold text-slate-700 w-12 flex-shrink-0 print:text-xs ${compactPrint ? 'print:!text-[10px]' : ''}`}>Class:</span>
          <div className={`flex-1 border-b-2 border-black min-h-[1.25rem] ${compactPrint ? 'print:!min-h-[0.875rem]' : ''}`} />
        </div>
      </div>
      </div>
    </header>
  );
}

function PrintPreviewContent() {
  const searchParams = useSearchParams();
  const [mcqQuestions, setMcqQuestions] = useState<Question[]>([]);
  const [frqExamsList, setFrqExamsList] = useState<FRQExam[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const qParam = searchParams.get('q');
      const fParam = searchParams.get('f');

      if (!qParam && !fParam) {
        setError('No assignment data in URL. Use the Tutor Builder to create a print assignment.');
        setLoading(false);
        return;
      }

      const questionsMap = new Map<number, Question>();
      allQuestions.forEach((q) => questionsMap.set(q.id, q));

      if (qParam) {
        try {
          const decoded = atob(qParam);
          const ids = decoded.split(',').map((id) => parseInt(id.trim(), 10)).filter((n) => !isNaN(n));
          const found: Question[] = [];
          const seen = new Set<number>();
          for (const id of ids) {
            if (seen.has(id)) continue;
            const q = questionsMap.get(id);
            if (q) {
              found.push(q);
              seen.add(id);
            }
          }
          setMcqQuestions(found);
        } catch {
          setError('Invalid question parameter.');
        }
      }

      if (fParam) {
        try {
          const decoded = atob(fParam);
          const indices = decoded.split(',').map((s) => parseInt(s.trim(), 10)).filter((n) => !isNaN(n) && n >= 0 && n < frqExams.length);
          setFrqExamsList(indices.map((i) => frqExams[i]).filter(Boolean));
        } catch {
          setError('Invalid FRQ parameter.');
        }
      }
    } catch (e) {
      setError('Could not load assignment.');
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [searchParams]);

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-indigo-600 mx-auto mb-4" />
          <p className="text-lg font-semibold text-slate-700">Loading assignment...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border-2 border-red-200 p-8 text-center">
          <AlertCircle className="w-14 h-14 text-red-600 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-slate-900 mb-2">Invalid link</h2>
          <p className="text-slate-600 mb-6">{error}</p>
          <Link
            href="/tutor/builder"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700"
          >
            Go to Tutor Builder
          </Link>
        </div>
      </div>
    );
  }

  const hasMcq = mcqQuestions.length > 0;
  const hasFrq = frqExamsList.length > 0;
  if (!hasMcq && !hasFrq) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border-2 border-amber-200 p-8 text-center">
          <AlertCircle className="w-14 h-14 text-amber-600 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-slate-900 mb-2">No content</h2>
          <p className="text-slate-600 mb-6">Add at least one MCQ or one FRQ set in the Tutor Builder.</p>
          <Link
            href="/tutor/builder"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700"
          >
            Go to Tutor Builder
          </Link>
        </div>
      </div>
    );
  }

  const isEmbed = searchParams.get('embed') === '1' || searchParams.get('embed') === 'true';
  const isAnswerKey = searchParams.get('answerKey') === '1' || searchParams.get('answerKey') === 'true';
  const frqOnly = !hasMcq && hasFrq;

  return (
    <div className={`min-h-screen bg-white ${frqOnly ? 'frq-only-print' : ''}`}>
      {/* Print toolbar - hidden when embedded (iframe) or when printing */}
      {!isEmbed && (
      <div className="sticky top-0 z-10 bg-slate-100 border-b border-slate-200 px-6 sm:px-8 py-3 flex items-center justify-between no-print">
        <Link
          href={`/tutor/builder${(() => {
            const q = searchParams.get('q');
            const f = searchParams.get('f');
            if (!q && !f) return '';
            const params = new URLSearchParams();
            if (q) params.set('q', q);
            if (f) params.set('f', f);
            return '?' + params.toString();
          })()}`}
          className="text-indigo-600 font-semibold hover:underline"
        >
          ← Back to Builder
        </Link>
        <div className="flex items-center gap-6">
          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] transition-all active:translate-y-0.5"
          >
            <Printer className="w-5 h-5" />
            Print / Save as PDF
          </button>
          <a
            href={`/tutor/print-preview?${(() => {
              const p = new URLSearchParams(searchParams.toString());
              p.set('answerKey', '1');
              return p.toString();
            })()}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 font-semibold hover:underline"
          >
            Answer Key
          </a>
        </div>
      </div>
      )}

      <div className={`max-w-3xl mx-auto px-6 py-8 print:py-4 print:px-4 print:pt-4 print-preview-content ${frqOnly ? 'print:pt-0' : ''}`}>
        <div className={frqOnly ? 'print-preview-header-compact' : ''}>
          <AssignmentHeader compactPrint={frqOnly} />
        </div>
        <h1 className={`text-2xl font-black text-slate-900 mb-6 print:mb-4 ${frqOnly ? 'print:mb-1' : ''}`}>
          {isAnswerKey ? 'Answer Key' : 'Assignment'}
        </h1>

        {/* Part 1: Multiple Choice */}
        {hasMcq && (
          <section className="mb-10 print:mb-8">
            <h2 className="text-lg font-bold text-slate-800 border-b-2 border-slate-300 pb-2 mb-4">
              Part 1: Multiple Choice
            </h2>
            {isAnswerKey ? (
              <div className="space-y-1 font-medium text-slate-900">
                {mcqQuestions.map((q, idx) => (
                  <p key={q.id}>
                    {idx + 1}. {q.correctAnswer}
                  </p>
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                {mcqQuestions.map((q, idx) => (
                  <div key={q.id} className="break-inside-avoid">
                    <p className="font-bold text-slate-900 mb-2">
                      {idx + 1}. {q.question}
                    </p>
                    {q.image && (
                      <div className="my-3 print:my-2">
                        <img
                          src={typeof q.image === 'string' ? q.image : (q.image as { src: string }).src}
                          alt="Question"
                          className="max-h-48 w-auto object-contain print:max-h-40"
                        />
                      </div>
                    )}
                    <ul className="list-none space-y-1 ml-2">
                      {q.options.map((opt, oi) => {
                        const letter = String.fromCharCode(65 + oi);
                        return (
                          <li key={oi} className="flex gap-2">
                            <span className="font-semibold flex-shrink-0 text-slate-600">
                              {letter}.
                            </span>
                            <span className="text-slate-800">{opt}</span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* Part 2: Free Response */}
        {hasFrq && (
          <section className={`mb-10 print:mb-8 ${frqOnly ? 'print:mb-4' : ''}`}>
            <h2 className={`text-lg font-bold text-slate-800 border-b-2 border-slate-300 pb-2 mb-4 ${frqOnly ? 'print:pb-1 print:mb-1' : ''}`}>
              Part 2: Free Response
            </h2>
            <div className={`space-y-8 ${frqOnly ? 'print:space-y-6' : ''}`}>
              {frqExamsList.map((exam, examIdx) => (
                <div key={examIdx} className={`break-inside-avoid ${frqOnly && examIdx === 0 ? 'frq-first-exam-print' : ''}`}>
                  <h3 className={`text-base font-bold text-slate-800 mb-3 ${frqOnly && examIdx === 0 ? 'print:!mb-1' : ''}`}>
                    {exam.examTitle.includes(' FRQ:')
                      ? exam.examTitle.split(' FRQ:')[0] + ' FRQ'
                      : exam.examTitle}
                  </h3>
                  {exam.questions.map((fq: FRQQuestion, qIdx: number) =>
                    isAnswerKey ? (
                      <div key={fq.id} className="mb-6 pl-2 border-l-2 border-slate-200 space-y-6">
                        <p className="font-bold text-slate-900 mb-2">
                          Question {qIdx + 1}. {fq.prompt}
                        </p>
                        {fq.parts.map((part: FRQPart) => {
                          if (part.answerType) {
                            const explanation = part.studentExplanation || part.gradingCriteria;
                            const answerSrc = part.referenceImageUrl
                              || (typeof part.answer === 'string' ? part.answer : null)
                              || (typeof part.answer === 'object' && part.answer && 'src' in part.answer ? (part.answer as { src: string }).src : null);
                            const hasPartLevelAnswer = part.answerType === 'draw' ? !!answerSrc : !!(typeof part.answer === 'string' && part.answer.trim());
                            const subpartsWithAnswers = part.subparts?.filter((sp) => sp.answerType) ?? [];
                            return (
                              <div key={part.label} className="space-y-3">
                                <p className="text-slate-800 font-bold">
                                  <span>{part.label}.</span> {part.text}
                                </p>
                                {part.subparts?.filter((sp) => !sp.answerType).length ? (
                                  <ul className="list-none ml-4 space-y-1 text-slate-700 font-bold">
                                    {part.subparts.filter((sp) => !sp.answerType).map((sp) => (
                                      <li key={sp.label}>
                                        <span>{part.label}{sp.label}.</span> {sp.text}
                                      </li>
                                    ))}
                                  </ul>
                                ) : null}
                                {hasPartLevelAnswer && (
                                  <div>
                                    {part.answerType === 'draw' && answerSrc ? (
                                      <img
                                        src={answerSrc}
                                        alt="Answer"
                                        className="max-w-[320px] max-h-64 object-contain border border-slate-200 rounded-lg"
                                      />
                                    ) : (
                                      <FormattedAnswer text={typeof part.answer === 'string' ? part.answer : ''} />
                                    )}
                                  </div>
                                )}
                                {explanation && (
                                  <div className="mt-3">
                                    <FormattedExplanation text={explanation} />
                                  </div>
                                )}
                                {subpartsWithAnswers.map((sp: FRQSubPart) => {
                                  const spExplanation = sp.studentExplanation || sp.gradingCriteria;
                                  const spRef = sp as FRQSubPart & { referenceImageUrl?: string };
                                  const spAnswerSrc = spRef.referenceImageUrl
                                    || (typeof sp.answer === 'string' ? sp.answer : null)
                                    || (typeof sp.answer === 'object' && sp.answer && 'src' in sp.answer ? (sp.answer as { src: string }).src : null);
                                  return (
                                    <div key={sp.label} className="space-y-3 mt-4 ml-2 pl-2 border-l-2 border-slate-100">
                                      <p className="text-slate-800 font-bold">
                                        <span>{part.label}{sp.label}.</span> {sp.text}
                                      </p>
                                      <div>
                                        {sp.answerType === 'draw' && spAnswerSrc ? (
                                          <img
                                            src={spAnswerSrc}
                                            alt="Answer"
                                            className="max-w-[320px] max-h-64 object-contain border border-slate-200 rounded-lg"
                                          />
                                        ) : (
                                          <FormattedAnswer text={typeof sp.answer === 'string' ? sp.answer : ''} />
                                        )}
                                      </div>
                                      {spExplanation && (
                                        <div className="mt-3">
                                          <FormattedExplanation text={spExplanation} />
                                        </div>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                            );
                          }
                          return (
                            <div key={part.label}>
                              {part.subparts?.filter((sp) => sp.answerType).map((sp: FRQSubPart) => {
                                const explanation = sp.studentExplanation || sp.gradingCriteria;
                                const spRef = sp as FRQSubPart & { referenceImageUrl?: string };
                                const answerSrc = spRef.referenceImageUrl
                                  || (typeof sp.answer === 'string' ? sp.answer : null)
                                  || (typeof sp.answer === 'object' && sp.answer && 'src' in sp.answer ? (sp.answer as { src: string }).src : null);
                                return (
                                  <div key={sp.label} className="space-y-3 mb-4">
                                    <p className="text-slate-800 font-bold">
                                      <span>{part.label}{sp.label}.</span> {sp.text}
                                    </p>
                                    <div>
                                      {sp.answerType === 'draw' && answerSrc ? (
                                        <img
                                          src={answerSrc}
                                          alt="Answer"
                                          className="max-w-[320px] max-h-64 object-contain border border-slate-200 rounded-lg"
                                        />
                                      ) : (
                                        <FormattedAnswer text={typeof sp.answer === 'string' ? sp.answer : ''} />
                                      )}
                                    </div>
                                    {explanation && (
                                      <div className="mt-3">
                                        <FormattedExplanation text={explanation} />
                                      </div>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div key={fq.id} className="mb-6 pl-2 border-l-2 border-slate-200">
                        <p className="font-semibold text-slate-900 mb-1">
                          Question {qIdx + 1}.
                        </p>
                        <p className="text-slate-900 mb-2">
                          {fq.prompt}
                        </p>
                        {fq.image && (
                          <div className="my-2">
                            <img
                              src={typeof fq.image === 'string' ? fq.image : (fq.image as { src?: string })?.src}
                              alt=""
                              className="max-h-40 w-auto object-contain"
                            />
                          </div>
                        )}
                        <div className="space-y-4 mt-3">
                          {fq.parts.map((part: FRQPart) => (
                            <div key={part.label}>
                              <p className="text-slate-800 font-medium">
                                <span className="font-bold">{part.label}.</span> {part.text}
                              </p>
                              {part.subparts?.length ? (
                                <ul className="list-none mt-2 ml-4 space-y-3">
                                  {part.subparts.map((sp: FRQSubPart) => (
                                    <li key={sp.label}>
                                      <p className="text-slate-700">
                                        <span className="font-bold">{sp.label}.</span> {sp.text}
                                      </p>
                                      {sp.answerType === 'draw' && <GraphArea />}
                                      {sp.answerType === 'text' && <TextLines />}
                                    </li>
                                  ))}
                                </ul>
                              ) : null}
                              {part.answerType === 'draw' && <GraphArea />}
                              {part.answerType === 'text' && !part.subparts?.length && <TextLines />}
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      <style jsx global>{`
        @media print {
          /* Remove browser header/footer (date, time, URL) by not reserving space for them */
          @page {
            margin: 0.5in;
            size: auto;
          }
          /* FRQ-only: tighter top margin so first question starts on page 1 */
          .frq-only-print .print-preview-content {
            padding-top: 0 !important;
          }
          .frq-only-print .print-preview-header-compact header {
            padding-bottom: 0.25rem !important;
            margin-bottom: 0.25rem !important;
          }
          .frq-only-print .print-preview-header-compact .flex.items-center.gap-3 span {
            font-size: 0.875rem !important;
          }
          .frq-only-print .print-preview-header-compact p.text-sm {
            font-size: 0.65rem !important;
            line-height: 1.2 !important;
          }
          .frq-only-print .frq-first-exam-print {
            margin-top: 0 !important;
            padding-top: 0 !important;
          }
          body {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          /* Hide web toolbar and any no-print elements */
          .no-print,
          [class*="print:hidden"] {
            display: none !important;
          }
          /* Ensure assignment starts on page 1 - remove padding/margin from layout wrappers */
          main {
            padding: 0 !important;
            margin: 0 !important;
          }
        }
      `}</style>
    </div>
  );
}

export default function PrintPreviewPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-100 flex items-center justify-center">
          <Loader2 className="w-10 h-10 animate-spin text-indigo-600" />
        </div>
      }
    >
      <PrintPreviewContent />
    </Suspense>
  );
}
