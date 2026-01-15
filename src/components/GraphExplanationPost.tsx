'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Check, X, ArrowRight, Pen, ArrowRightCircle, CheckCircle, CheckCircle2, XCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { GraphExplanationPost as GraphExplanationPostType } from '@/types/blogPost';
import { EmbeddedGraphGym } from '@/components/EmbeddedGraphGym';
import { Button } from '@/components/ui/button';
import { allQuestions } from '@/data/unitPracticeProblems/unitPracticeProblems';
import katex from 'katex';
import 'katex/dist/katex.min.css';

// Dynamic imports for interactive components
const DraggableGraph = dynamic(() => import('@/components/DraggableGraph').then(mod => mod.default), { ssr: false });
const BlogComprehensionCheck = dynamic(() => import('@/components/BlogComprehensionCheck').then(mod => ({ default: mod.BlogComprehensionCheck })), { ssr: false });

interface GraphExplanationPostProps {
  post: GraphExplanationPostType;
}

export function GraphExplanationPost({ post }: GraphExplanationPostProps) {
  const [mcqAnswers, setMcqAnswers] = useState<Record<number, number | null>>({});
  const [mcqFeedback, setMcqFeedback] = useState<Record<number, boolean>>({});
  const [currentMcqIndex, setCurrentMcqIndex] = useState(0);

  const handleMcqSelect = (questionId: number, optionIndex: number) => {
    // On click, immediately show feedback
    setMcqAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
    setMcqFeedback(prev => ({
      ...prev,
      [questionId]: true
    }));
  };

  const handleNextMcq = () => {
    if (currentMcqIndex < post.mcqQuestions.length - 1) {
      setCurrentMcqIndex(prev => prev + 1);
    }
  };

  const handlePreviousMcq = () => {
    if (currentMcqIndex > 0) {
      setCurrentMcqIndex(prev => prev - 1);
    }
  };

  const getLetter = (index: number) => String.fromCharCode(65 + index);

  // Component to render HTML content with KaTeX math rendering
  function ContentWithMath({ content }: { content: string }) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (!containerRef.current) return;

      // Process the HTML content to render math formulas
      const processMathInHTML = (html: string): string => {
        // First, protect currency dollar signs by temporarily replacing them
        // Match $ followed by digits (with optional commas and decimal point)
        const currencyPlaceholder = '___CURRENCY_SIGN___';
        const currencyMatches: string[] = [];
        let processed = html.replace(/\$(\d[\d,]*\.?\d*)/g, (match) => {
          currencyMatches.push(match);
          return currencyPlaceholder;
        });

        // Pattern to match $$...$$ (display math) - non-greedy, across newlines
        const displayMathPattern = /\$\$([\s\S]*?)\$\$/g;
        // Pattern to match $...$ (inline math) - but not $$...$$
        const inlineMathPattern = /(?<!\$)\$(?!\$)([^$\n]+?)\$(?!\$)/g;

        // First, process display math ($$...$$)
        processed = processed.replace(displayMathPattern, (match, mathContent) => {
          try {
            // The mathContent already has the correct backslashes from the regex capture
            const rendered = katex.renderToString(mathContent.trim(), {
              throwOnError: false,
              displayMode: true,
              strict: false,
            });
            return `<div class="my-4 text-center">${rendered}</div>`;
          } catch (error) {
            console.error('KaTeX rendering error:', error);
            return match; // Return original if rendering fails
          }
        });

        // Then, process inline math ($...$)
        processed = processed.replace(inlineMathPattern, (match, mathContent) => {
          try {
            // The mathContent already has the correct backslashes from the regex capture
            const rendered = katex.renderToString(mathContent.trim(), {
              throwOnError: false,
              displayMode: false,
              strict: false,
            });
            return rendered;
          } catch (error) {
            console.error('KaTeX rendering error:', error);
            return match; // Return original if rendering fails
          }
        });

        // Restore currency dollar signs
        let currencyIndex = 0;
        processed = processed.replace(new RegExp(currencyPlaceholder.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), () => {
          return currencyMatches[currencyIndex++] || '$';
        });

        return processed;
      };

      // Process and set the HTML content
      const processedContent = processMathInHTML(content.trim());
      containerRef.current.innerHTML = processedContent;
    }, [content]);

    return <div ref={containerRef} />;
  }

  // Get practice question for BlogComprehensionCheck if practiceQuestionId exists
  const practiceQuestion = post.practiceQuestionId 
    ? allQuestions.find(q => q.id === post.practiceQuestionId) 
    : null;

  return (
    <article className="max-w-4xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <section className="mb-12">
        {/* Subject Subheading with highlight effect - On Top */}
        <h2 className="text-2xl sm:text-3xl font-black text-black mb-4 leading-tight relative inline-block">
          <span className="relative z-10">
            {post.subject === 'macro' ? 'AP Macroeconomics' : 'AP Microeconomics'}
          </span>
          <span className="absolute bottom-1 left-0 right-0 h-4 bg-yellow-300 -z-0" style={{ transform: 'skew(-12deg)' }}></span>
        </h2>

        {/* Headline - No highlight */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-black mb-6 leading-tight">
          {post.headline}
        </h1>

        {/* Intro - Large lead text */}
        <p className="text-xl text-gray-700 leading-relaxed font-medium mb-8">
          {post.intro}
        </p>
      </section>

      {/* Full Content - Rest of the text with inline images */}
      {post.content && (
        <section className="mb-12">
          <div className="prose prose-xl max-w-none prose-black text-xl [&_p]:leading-relaxed [&_p]:mb-6 [&_h2]:mb-4 [&_h2]:mt-12 [&_h2]:text-3xl [&_h2]:font-bold [&_ul]:mb-6 [&_li]:mb-2 [&_img]:my-8 [&_img]:rounded-lg [&_img]:border-2 [&_img]:border-gray-300">
            <ContentWithMath content={post.content} />
          </div>
        </section>
      )}

      {/* Key Determinants - Notebook Style (optional) */}
      {post.keyDeterminants && post.keyDeterminants.length > 0 && (
        <section className="mb-12">
          <div className="bg-yellow-50 border-4 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-8">
            <h2 className="text-2xl font-black text-black mb-6">Key Takeaways</h2>
            <ul className="space-y-4">
              {post.keyDeterminants.map((determinant, index) => (
                <li key={index} className="flex items-start gap-4">
                  <ArrowRightCircle className="w-6 h-6 text-black flex-shrink-0 mt-0.5" />
                  <span className="text-base text-black leading-relaxed font-medium">{determinant}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Embedded Graph Gym Challenge */}
      {post.graphGymChallenge && (
        <section className="mb-12">
          <div className="mb-4">
            <h2 className="text-3xl font-black text-black mb-2">Stop Reading. Start Drawing.</h2>
            <p className="text-lg text-gray-700 font-medium">
              Interactive Graph Gym Challenge - Try it right here!
            </p>
          </div>
          <EmbeddedGraphGym 
            scenarioId={post.graphGymChallenge.scenarioId} 
            prompt={post.graphGymChallenge.prompt}
            subject={post.subject}
          />
        </section>
      )}

      {/* Interactive MCQ Widget - One at a Time */}
      {post.mcqQuestions.length > 0 && (
        <section className="mb-12">
          <h2 className="text-3xl font-black text-black mb-8">Check Your Understanding</h2>
          
          {(() => {
            const currentMcq = post.mcqQuestions[currentMcqIndex];
            const selectedAnswer = mcqAnswers[currentMcq.id] ?? null;
            const showFeedback = mcqFeedback[currentMcq.id] ?? false;
            const isCorrect = selectedAnswer === currentMcq.correctAnswer;
            const isSelected = selectedAnswer !== null;

            return (
              <div className="bg-white border-4 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-6">
                {/* Question Progress Indicator */}
                <div className="flex items-center justify-between mb-6 pb-4 border-b-4 border-black">
                  <h3 className="text-xl font-black text-black">
                    Question {currentMcqIndex + 1} of {post.mcqQuestions.length}
                  </h3>
                  <div className="flex items-center gap-2">
                    {post.mcqQuestions.map((_, idx) => (
                      <div
                        key={idx}
                        className={`w-3 h-3 rounded-full border-2 border-black ${
                          idx === currentMcqIndex
                            ? 'bg-black'
                            : mcqFeedback[post.mcqQuestions[idx].id]
                            ? 'bg-green-400'
                            : 'bg-white'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Question Text */}
                <p className="text-lg text-black mb-6 font-medium leading-relaxed">
                  {currentMcq.question}
                </p>
                
                {/* Answer Options - Matching Quiz Me styling */}
                <div className="space-y-2 mb-6">
                  {currentMcq.options.map((option, optIndex) => {
                    const optionLetter = getLetter(optIndex);
                    const isCorrectAnswer = optIndex === currentMcq.correctAnswer;
                    const isSelected = selectedAnswer === optIndex;
                    
                    // Determine styling based on state (matching Quiz Me)
                    let optionStyle = 'bg-white border-gray-300';
                    if (showFeedback) {
                      if (isCorrectAnswer) {
                        optionStyle = 'bg-green-50 border-green-500';
                      } else if (isSelected && !isCorrectAnswer) {
                        optionStyle = 'bg-red-50 border-red-500';
                      }
                    } else if (isSelected) {
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
                        onClick={!showFeedback ? () => handleMcqSelect(currentMcq.id, optIndex) : undefined}
                      >
                        <div className="flex items-center gap-3">
                          {!showFeedback ? (
                            <>
                              <input
                                type="radio"
                                name={`question-${currentMcq.id}`}
                                value={optionLetter}
                                checked={isSelected}
                                onChange={() => handleMcqSelect(currentMcq.id, optIndex)}
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
                                    : isSelected && !isCorrectAnswer
                                    ? 'bg-red-500 text-white'
                                    : 'bg-gray-200 text-gray-700'
                                }`}
                              >
                                {optionLetter}
                              </span>
                              <span className="flex-1 text-gray-900">{option}</span>
                              {isCorrectAnswer && (
                                <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0" />
                              )}
                              {isSelected && !isCorrectAnswer && (
                                <XCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
                              )}
                            </>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Speech Bubble Explanation - Only shows after answer */}
                {showFeedback && isSelected && (
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
                      <p className="text-base text-black font-medium leading-relaxed">
                        {currentMcq.explanation}
                      </p>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between gap-4 pt-4 border-t-4 border-black">
                  <button
                    onClick={handlePreviousMcq}
                    disabled={currentMcqIndex === 0}
                    className={`px-6 py-3 rounded-xl border-4 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-y-1 font-black text-base flex items-center gap-2 ${
                      currentMcqIndex === 0
                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        : 'bg-white text-black'
                    }`}
                  >
                    <ArrowRight className="w-5 h-5 rotate-180" />
                    Previous
                  </button>
                  
                  <button
                    onClick={handleNextMcq}
                    disabled={currentMcqIndex >= post.mcqQuestions.length - 1}
                    className={`px-6 py-3 rounded-xl border-4 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:-translate-y-1 font-black text-base flex items-center gap-2 ${
                      currentMcqIndex >= post.mcqQuestions.length - 1
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


      {/* DraggableGraph Component */}
      {post.draggableGraph && (
        <section className="mb-12">
          <div className="bg-white border-4 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-6">
            <DraggableGraph />
          </div>
        </section>
      )}

      {/* BlogComprehensionCheck Component */}
      {practiceQuestion && (
        <section className="mb-12">
          <BlogComprehensionCheck question={practiceQuestion} />
        </section>
      )}

      {/* Related Topics - Sticker Grid */}
      {post.relatedTopics.length > 0 && (
        <section className="mb-12">
          <h2 className="text-3xl font-black text-black mb-6">Related Topics</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {post.relatedTopics.map((topic, index) => (
              <Link
                key={index}
                href={`/blog/${topic.slug}`}
                className="bg-white border-4 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all p-6 group"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="font-black text-black text-lg group-hover:text-blue-600 transition-colors">
                    {topic.title}
                  </span>
                  <ArrowRight className="w-5 h-5 text-black group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}

