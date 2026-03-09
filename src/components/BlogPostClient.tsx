'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { BlogContentWithKeyTerms } from './BlogContentWithKeyTerms';
import { SidebarScrollTriggeredBox } from './SidebarScrollTriggeredBox';
import { processBlogContent } from '@/utils/processBlogContent';
import { processMathContent } from '@/utils/processMathContent';
import { EmbeddedGraphGym } from '@/components/EmbeddedGraphGym';
import { allQuestions } from '@/data/unitPracticeProblems/unitPracticeProblems';
import type { Question } from '@/data/questionBanks/types';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, XCircle, CheckCircle, X } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AudioPlayer } from '@/components/AudioPlayer';

interface BlogPostClientProps {
  content: React.ReactNode;
  subject?: 'ap_microeconomics' | 'ap_macroeconomics';
  unit?: number;
  practiceUrl?: string;
  images?: string[];
  videoUrl?: string | null;
  audioUrl?: string | null;
  graphGymScenarioId?: number;
  graphGymPrompt?: string;
  practiceQuestionIds?: number[];
}

/**
 * Client component that wraps blog content and manages scroll-triggered practice box
 * The practice box appears in the sidebar at the scroll position where trigger fires
 */
export function BlogPostClient({
  content,
  subject = 'ap_macroeconomics',
  unit,
  practiceUrl = '/unitFRQpracticePage',
  images = [],
  videoUrl = null,
  audioUrl = null,
  graphGymScenarioId,
  graphGymPrompt,
  practiceQuestionIds = []
}: BlogPostClientProps) {
  // Process content to replace [IMAGE:N] placeholders with actual images
  const processedContent = processBlogContent(content, images);
  
  // Process content to render KaTeX math formulas
  const mathProcessedContent = processMathContent(processedContent);

  const practiceQuestions = useMemo<Question[]>(() => {
    return practiceQuestionIds
      .map((id) => allQuestions.find((q) => q.id === id))
      .filter((q): q is Question => Boolean(q));
  }, [practiceQuestionIds]);

  const [currentMcqIndex, setCurrentMcqIndex] = useState(0);
  const [mcqAnswers, setMcqAnswers] = useState<Record<number, number | null>>({});
  const [mcqFeedback, setMcqFeedback] = useState<Record<number, boolean>>({});

  const getLetter = (index: number) => String.fromCharCode(65 + index);

  const handleMcqSelect = (questionId: number, optionIndex: number) => {
    // On click, immediately show feedback (match GraphExplanationPost)
    setMcqAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
    setMcqFeedback((prev) => ({ ...prev, [questionId]: true }));
  };

  const handleNextMcq = () => {
    if (currentMcqIndex < practiceQuestions.length - 1) {
      setCurrentMcqIndex((prev) => prev + 1);
    }
  };

  const handlePreviousMcq = () => {
    if (currentMcqIndex > 0) {
      setCurrentMcqIndex((prev) => prev - 1);
    }
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        .blog-content p:first-of-type::first-letter {
          font-size: 4rem;
          font-weight: bold;
          float: left;
          line-height: 1;
          margin-right: 0.5rem;
          margin-top: 0.1rem;
          color: #000000;
        }
      `}} />
      <div className="blog-content prose prose-xl max-w-none prose-black text-xl [&_p]:leading-relaxed [&_p]:mb-6 [&_h2]:mb-4 [&_h2]:mt-12 [&_h2]:text-3xl [&_h2]:font-bold [&_h3]:mb-4 [&_h3]:mt-10 [&_h3]:text-2xl [&_h3]:font-bold [&_ul]:mb-6 [&_li]:mb-2 [&_img]:my-8 [&_img]:rounded-lg [&_img]:border-2 [&_img]:border-gray-300">
        {/* Video at the start of the blog if available */}
        {videoUrl && (
          <div className="mb-12 -mx-4 sm:-mx-8">
            <video src={videoUrl} controls className="w-full aspect-video rounded-lg shadow-lg" playsInline>
              Your browser does not support the video tag.
            </video>
          </div>
        )}

        {/* Audio at the start of the blog if available */}
        {audioUrl && (
          <div className="mb-6">
            <AudioPlayer src={audioUrl} className="w-full" />
          </div>
        )}

        <BlogContentWithKeyTerms subject={subject}>{mathProcessedContent}</BlogContentWithKeyTerms>
        {/* Trigger that makes practice box appear in sidebar at this scroll position */}
        <SidebarScrollTriggeredBox practiceUrl={practiceUrl} />
      </div>

      {/* Embedded Graph Gym (if configured) */}
      {graphGymScenarioId && graphGymPrompt && (
        <section className="mt-12 mb-12">
          <div className="mb-4">
            <h2 className="text-3xl font-black text-black mb-2">Stop Reading. Start Drawing.</h2>
            <p className="text-lg text-gray-700 font-medium">Try the Graph Gym challenge right here.</p>
          </div>
          <EmbeddedGraphGym
            scenarioId={graphGymScenarioId}
            prompt={graphGymPrompt}
            subject={subject === 'ap_macroeconomics' ? 'macro' : 'micro'}
          />
        </section>
      )}

      {/* Comprehension checks (if configured) */}
      {practiceQuestions.length > 0 && (
        <section className="mb-12">
          {(() => {
            const subjectParam = subject === 'ap_macroeconomics' ? 'macro' : 'micro';
            const unitLabel = typeof unit === 'number' && unit > 0 ? unit : null;
            const href = unitLabel
              ? `/unitMCQPracticePage?subject=${subjectParam}&mode=custom&units=${unitLabel}`
              : `/select-practice-units?subject=${subjectParam}`;

            return (
              <div className="mb-8 bg-white border-4 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <p className="text-lg font-black text-black">
                    Want to try more{unitLabel ? ` Unit ${unitLabel}` : ''} MCQs?
                  </p>
                  <p className="text-sm text-gray-700 font-medium">
                    Check out the MCQ Practice Page.
                  </p>
                </div>
                <Button
                  asChild
                  className="bg-blue-600 hover:bg-blue-700 text-white font-black py-3 px-5 rounded-xl border-4 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-y-1"
                >
                  <Link href={href}>
                    Go to MCQ Practice <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
              </div>
            );
          })()}

          <h2 className="text-3xl font-black text-black mb-8">Check Your Understanding</h2>

          {(() => {
            const currentQ = practiceQuestions[currentMcqIndex];
            if (!currentQ) return null;

            const selectedAnswer = mcqAnswers[currentQ.id] ?? null;
            const showFeedback = mcqFeedback[currentQ.id] ?? false;
            const correctIndex = Math.max(0, String(currentQ.correctAnswer).toUpperCase().charCodeAt(0) - 65);
            const isCorrect = selectedAnswer === correctIndex;
            const isSelected = selectedAnswer !== null;

            return (
              <div className="bg-white border-4 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-6">
                {/* Question Progress Indicator */}
                <div className="flex items-center justify-between mb-6 pb-4 border-b-4 border-black">
                  <h3 className="text-xl font-black text-black">
                    Question {currentMcqIndex + 1} of {practiceQuestions.length}
                  </h3>
                  <div className="flex items-center gap-2">
                    {practiceQuestions.map((q, idx) => (
                      <div
                        key={q.id}
                        className={`w-3 h-3 rounded-full border-2 border-black ${
                          idx === currentMcqIndex ? 'bg-black' : mcqFeedback[q.id] ? 'bg-green-400' : 'bg-white'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Question Text */}
                <p className="text-lg text-black mb-6 font-medium leading-relaxed">{currentQ.question}</p>

                {/* Question graph/image when present */}
                {currentQ.image && (
                  <div className="my-6 flex justify-center">
                    <Image
                      src={typeof currentQ.image === 'string' ? currentQ.image : (currentQ.image as { src: string }).src}
                      alt="Question diagram"
                      width={560}
                      height={360}
                      className="rounded-lg border-2 border-black bg-white max-w-full w-full"
                      style={{ objectFit: 'contain' }}
                    />
                  </div>
                )}

                {/* Answer Options */}
                <div className="space-y-2 mb-6">
                  {currentQ.options.map((option, optIndex) => {
                    const optionLetter = getLetter(optIndex);
                    const isCorrectAnswer = optIndex === correctIndex;
                    const isThisSelected = selectedAnswer === optIndex;

                    let optionStyle = 'bg-white border-gray-300';
                    if (showFeedback) {
                      if (isCorrectAnswer) optionStyle = 'bg-green-50 border-green-500';
                      else if (isThisSelected && !isCorrectAnswer) optionStyle = 'bg-red-50 border-red-500';
                    } else if (isThisSelected) {
                      optionStyle = 'bg-blue-50 border-blue-500';
                    }

                    return (
                      <motion.div
                        key={optIndex}
                        initial={false}
                        animate={showFeedback && isCorrectAnswer ? { scale: [1, 1.05, 1] } : {}}
                        transition={{ duration: 0.3 }}
                        className={`p-3 rounded-lg border-2 transition-colors ${optionStyle} ${
                          !showFeedback ? 'cursor-pointer hover:bg-blue-50 hover:border-blue-300' : ''
                        }`}
                        onClick={!showFeedback ? () => handleMcqSelect(currentQ.id, optIndex) : undefined}
                      >
                        <div className="flex items-center gap-3">
                          {!showFeedback ? (
                            <>
                              <input
                                type="radio"
                                name={`question-${currentQ.id}`}
                                value={optionLetter}
                                checked={isThisSelected}
                                onChange={() => handleMcqSelect(currentQ.id, optIndex)}
                                className="w-5 h-5 text-blue-600 flex-shrink-0"
                                onClick={(e) => e.stopPropagation()}
                              />
                              <span className="flex-1 text-gray-900">{option}</span>
                            </>
                          ) : (
                            <>
                              <span
                                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0 ${
                                  isCorrectAnswer
                                    ? 'bg-green-500 text-white'
                                    : isThisSelected && !isCorrectAnswer
                                      ? 'bg-red-500 text-white'
                                      : 'bg-gray-200 text-gray-700'
                                }`}
                              >
                                {optionLetter}
                              </span>
                              <span className="flex-1 text-gray-900">{option}</span>
                              {isCorrectAnswer && <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0" />}
                              {isThisSelected && !isCorrectAnswer && (
                                <XCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
                              )}
                            </>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Explanation bubble */}
                {showFeedback && isSelected && currentQ.explanation && (
                  <div className="relative mt-6 mb-6">
                    <div
                      className={`bg-white border-4 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-6 relative ${
                        isCorrect ? 'border-green-400' : 'border-red-400'
                      }`}
                    >
                      <div className="flex items-start gap-3 mb-3">
                        {isCorrect ? (
                          <>
                            <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                            <span className="font-black text-green-900 text-lg">Correct!</span>
                          </>
                        ) : (
                          <>
                            <X className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                            <span className="font-black text-red-900 text-lg">Incorrect</span>
                          </>
                        )}
                      </div>
                      <p className="text-base text-black font-medium leading-relaxed">{currentQ.explanation}</p>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons (match screenshot) */}
                <div className="flex items-center justify-between gap-4 pt-4 border-t-4 border-black">
                  <button
                    onClick={handlePreviousMcq}
                    disabled={currentMcqIndex === 0}
                    className={`px-6 py-3 rounded-xl border-4 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-y-1 font-black text-base flex items-center gap-2 ${
                      currentMcqIndex === 0 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-white text-black'
                    }`}
                  >
                    <ArrowRight className="w-5 h-5 rotate-180" />
                    Previous
                  </button>

                  <button
                    onClick={handleNextMcq}
                    disabled={currentMcqIndex >= practiceQuestions.length - 1}
                    className={`px-6 py-3 rounded-xl border-4 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-y-1 font-black text-base flex items-center gap-2 ${
                      currentMcqIndex >= practiceQuestions.length - 1
                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        : 'bg-white text-black'
                    }`}
                  >
                    Next
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            );
          })()}
        </section>
      )}
    </>
  );
}

