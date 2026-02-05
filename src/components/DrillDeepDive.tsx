'use client';

import { useState } from 'react';
import { dojoDrills, DojoDrill } from '@/data/dojoDrills';
import { allQuestions } from '@/data/unitPracticeProblems/unitPracticeProblems';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, XCircle } from 'lucide-react';
import DraggableGraph from './DraggableGraph';
import { DojoTable } from './DojoTable';
import { MonopolyRevenueVisualizer } from './MonopolyRevenueVisualizer';
import { CompAdvantageDrill, CompAdvantageProblem } from './CompAdvantageDrill';
import { GDPDrill } from './GDPDrill';
import { PPCDrill } from './PPCDrill';
import { DemandChangeDrill, DemandChangeScenario } from './DemandChangeDrill';
import { ElasticityRevenueDrill, ElasticityScenario } from './ElasticityRevenueDrill';
import { ConsumerProducerSurplusDrill } from './ConsumerProducerSurplusDrill';

interface DrillDeepDiveProps {
  drillId: string;
  backLink: string;
  backLinkText: string;
  stage2Content?: React.ReactNode; // Optional custom content for stage 2
  keyTakeaways?: React.ReactNode; // Optional custom key takeaways section
}

export function DrillDeepDive({ drillId, backLink, backLinkText, stage2Content, keyTakeaways }: DrillDeepDiveProps) {
  // State for comprehension questions
  const [compAnswers, setCompAnswers] = useState<Record<string, number | null>>({});
  const [compSubmitted, setCompSubmitted] = useState<Record<string, boolean>>({});

  // State for MCQ questions
  const [mcqAnswers, setMcqAnswers] = useState<Record<number, number | null>>({});
  const [mcqSubmitted, setMcqSubmitted] = useState<Record<number, boolean>>({});

  // State for interactive drill completion
  const [ppcLevel, setPpcLevel] = useState<1 | 2>(1);
  const [level1Ready, setLevel1Ready] = useState(false);

  const drill = dojoDrills[drillId];

  if (!drill) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Drill not found</p>
      </div>
    );
  }

  // Get MCQ questions for stage 3
  const subjectFilter = drill.subject === 'ap_macroeconomics' ? 'ap_macroeconomics' : 'ap_microeconomics';
  const mcqQuestions = drill.stage3.mcqIds
    .map(id => allQuestions.find(q => q.id === id && q.subject === subjectFilter))
    .filter((q): q is typeof allQuestions[0] => q !== undefined);

  const handleCompAnswer = (questionId: string, answerIndex: number) => {
    if (compSubmitted[questionId]) return;
    setCompAnswers(prev => ({ ...prev, [questionId]: answerIndex }));
    setCompSubmitted(prev => ({ ...prev, [questionId]: true }));
  };

  const handleMcqAnswer = (questionId: number, answerIndex: number) => {
    if (mcqSubmitted[questionId]) return;
    setMcqAnswers(prev => ({ ...prev, [questionId]: answerIndex }));
    setMcqSubmitted(prev => ({ ...prev, [questionId]: true }));
  };

  // Handler for interactive drill completion (no-op for deep-dive pages)
  const handleDrillComplete = () => {
    // Interactive drill completed - no action needed for deep-dive pages
  };

  // Get the appropriate interactive activity component
  const getActivityComponent = () => {
    if (!drill) return null;
    
    switch (drill.stage2.type) {
      case 'graph':
        return <DraggableGraph onComplete={handleDrillComplete} />;
      case 'table':
        return <GDPDrill onComplete={handleDrillComplete} />;
      case 'monopoly':
        return <MonopolyRevenueVisualizer onComplete={handleDrillComplete} />;
      case 'comparative-advantage':
        const problemData = drill.stage2.config as CompAdvantageProblem;
        if (problemData) {
          return <CompAdvantageDrill problem={problemData} onComplete={handleDrillComplete} />;
        }
        return null;
      case 'ppc-drill':
        return <PPCDrill onComplete={handleDrillComplete} currentLevel={ppcLevel} onLevel1Ready={() => setLevel1Ready(true)} />;
      case 'demand-change':
        const demandChangeData = drill.stage2.config as DemandChangeScenario;
        if (demandChangeData) {
          return <DemandChangeDrill problem={demandChangeData} onComplete={handleDrillComplete} />;
        }
        return null;
      case 'elasticity-revenue':
        const elasticityData = drill.stage2.config as ElasticityScenario;
        if (elasticityData) {
          return <ElasticityRevenueDrill problem={elasticityData} onComplete={handleDrillComplete} />;
        }
        return null;
      case 'consumer-producer-surplus':
        return <ConsumerProducerSurplusDrill onComplete={handleDrillComplete} />;
      default:
        return null;
    }
  };

  const formatTime = (seconds: number): string => {
    if (isNaN(seconds) || !isFinite(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-12 mt-12">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href={backLink} 
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6 group font-medium"
          >
            <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
            {backLinkText}
          </Link>
          
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-black mb-6 leading-tight">
            {drill.title}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl">
            {drill.description}
          </p>
        </div>

        {/* Stage 1: Video + Comprehension Check */}
        <section className="mb-16">
          <div className="bg-white border-2 border-black rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-8 mb-8">
            <h2 className="text-3xl font-bold text-black mb-4">
              Understanding {drill.title}
            </h2>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              {drill.description}
            </p>
            
            {/* Video */}
            <div className="my-8">
              <video 
                src={drill.stage1.videoUrl} 
                controls 
                className="w-full aspect-video rounded-lg shadow-md"
                preload="metadata"
              >
                Your browser does not support the video tag.
              </video>
            </div>

            {/* Comprehension Questions */}
            <div className="mt-8">
              <h3 className="text-2xl font-bold text-black mb-4">
                Key Concepts to Understand
              </h3>
              <div className="space-y-6">
                {drill.stage1.comprehensionQuestions.map((question, index) => {
                  const selectedAnswer = compAnswers[question.id] ?? null;
                  const isSubmitted = compSubmitted[question.id] ?? false;
                  const isCorrect = selectedAnswer === question.correctAnswer;

                  return (
                    <div 
                      key={question.id}
                      className="bg-gray-50 border-l-4 border-blue-600 rounded-r-lg p-6"
                    >
                      <h4 className="text-lg font-semibold text-black mb-3">
                        {index + 1}. {question.question}
                      </h4>
                      <ul className="space-y-2 mb-4">
                        {question.options.map((option, optIndex) => {
                          const isSelected = selectedAnswer === optIndex;
                          const isCorrectOption = optIndex === question.correctAnswer;
                          const showFeedback = isSubmitted;

                          return (
                            <li 
                              key={optIndex}
                              onClick={() => !isSubmitted && handleCompAnswer(question.id, optIndex)}
                              className={`p-3 rounded-lg cursor-pointer transition-all ${
                                !isSubmitted
                                  ? 'bg-white border-2 border-gray-200 hover:border-blue-400 hover:bg-blue-50'
                                  : isCorrectOption
                                  ? 'bg-green-50 border-2 border-green-500'
                                  : isSelected && !isCorrectOption
                                  ? 'bg-red-50 border-2 border-red-500'
                                  : 'bg-white border border-gray-200'
                              }`}
                            >
                              <span className="font-medium mr-2">
                                {String.fromCharCode(65 + optIndex)}.
                              </span>
                              <span className={
                                showFeedback && isCorrectOption
                                  ? 'text-green-800 font-semibold'
                                  : showFeedback && isSelected && !isCorrectOption
                                  ? 'text-red-800 font-semibold'
                                  : 'text-gray-700'
                              }>
                                {option}
                              </span>
                              {showFeedback && isCorrectOption && (
                                <CheckCircle2 className="w-5 h-5 text-green-600 inline-block ml-2" />
                              )}
                              {showFeedback && isSelected && !isCorrectOption && (
                                <XCircle className="w-5 h-5 text-red-600 inline-block ml-2" />
                              )}
                            </li>
                          );
                        })}
                      </ul>
                      {isSubmitted && (
                        <div className="mt-4 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg">
                          <p className="text-sm text-gray-700">
                            <strong className="text-blue-900">Explanation:</strong>{' '}
                            <span className="text-gray-700">{question.explanation}</span>
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Stage 2: Interactive Activity */}
        <section className="mb-16">
          <div className="bg-white border-2 border-black rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-8 mb-8">
            <h2 className="text-3xl font-bold text-black mb-4">
              Interactive Practice
            </h2>
            {stage2Content && (
              <div className="mb-6">
                {stage2Content}
              </div>
            )}
            <div className="mt-8 min-h-[500px] flex items-center justify-center">
              {getActivityComponent() || (
                <p className="text-gray-500">Interactive activity not available for this drill.</p>
              )}
            </div>
          </div>
        </section>

        {/* Stage 3: MCQ Practice Questions */}
        <section className="mb-16">
          <div className="bg-white border-2 border-black rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-8 mb-8">
            <h2 className="text-3xl font-bold text-black mb-4">
              Practice Questions: Test Your Understanding
            </h2>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              Apply what you've learned with these practice questions. These questions test your understanding of the key concepts.
            </p>

            <div className="space-y-8">
              {mcqQuestions.map((question, index) => {
                const selectedAnswer = mcqAnswers[question.id] ?? null;
                const isSubmitted = mcqSubmitted[question.id] ?? false;
                const isCorrect = selectedAnswer === question.correctAnswer;

                return (
                  <div 
                    key={question.id}
                    className="bg-gray-50 border-l-4 border-indigo-600 rounded-r-lg p-6"
                  >
                    <h3 className="text-xl font-semibold text-black mb-4">
                      Question {index + 1}
                    </h3>
                    <p className="text-lg text-gray-800 mb-4 font-medium">
                      {question.question}
                    </p>
                    
                    {question.image && (
                      <div className="my-6">
                        <Image
                          src={question.image.src}
                          alt={question.image.alt || 'Question diagram'}
                          width={600}
                          height={400}
                          className="w-full max-w-2xl h-auto object-contain rounded-lg shadow-md"
                        />
                      </div>
                    )}

                    <ul className="space-y-3 mb-4">
                      {question.options.map((option, optIndex) => {
                        const isSelected = selectedAnswer === optIndex;
                        const isCorrectOption = optIndex === question.correctAnswer;
                        const showFeedback = isSubmitted;

                        return (
                          <li 
                            key={optIndex}
                            onClick={() => !isSubmitted && handleMcqAnswer(question.id, optIndex)}
                            className={`p-3 rounded-lg cursor-pointer transition-all ${
                              !isSubmitted
                                ? 'bg-white border-2 border-gray-200 hover:border-indigo-400 hover:bg-indigo-50'
                                : isCorrectOption
                                ? 'bg-green-50 border-2 border-green-500'
                                : isSelected && !isCorrectOption
                                ? 'bg-red-50 border-2 border-red-500'
                                : 'bg-white border border-gray-200'
                            }`}
                          >
                            <span className="font-medium mr-2">
                              {String.fromCharCode(65 + optIndex)}.
                            </span>
                            <span className={
                              showFeedback && isCorrectOption
                                ? 'text-green-800 font-semibold'
                                : showFeedback && isSelected && !isCorrectOption
                                ? 'text-red-800 font-semibold'
                                : 'text-gray-700'
                            }>
                              {option}
                            </span>
                            {showFeedback && isCorrectOption && (
                              <CheckCircle2 className="w-5 h-5 text-green-600 inline-block ml-2" />
                            )}
                            {showFeedback && isSelected && !isCorrectOption && (
                              <XCircle className="w-5 h-5 text-red-600 inline-block ml-2" />
                            )}
                          </li>
                        );
                      })}
                    </ul>

                    {isSubmitted && question.explanation && (
                      <div className="mt-4 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg">
                        <p className="text-sm text-gray-700">
                          <strong className="text-blue-900">Explanation:</strong>{' '}
                          <span className="text-gray-700">{question.explanation}</span>
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Summary Section */}
        {keyTakeaways ? (
          <section className="mb-16">
            {keyTakeaways}
          </section>
        ) : (
          <section className="mb-16">
            <div className="bg-yellow-50 border-4 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-8">
              <h2 className="text-2xl font-black text-black mb-6">Key Takeaways</h2>
              <ul className="space-y-4">
                <li className="flex items-start gap-4">
                  <span className="text-2xl">📊</span>
                  <div>
                    <strong className="text-black">Master the fundamentals:</strong> Understanding these core concepts is essential for success in AP Economics.
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="text-2xl">✅</span>
                  <div>
                    <strong className="text-black">Practice makes perfect:</strong> Use the interactive exercises and practice questions to reinforce your understanding.
                  </div>
                </li>
              </ul>
            </div>
          </section>
        )}

      </div>
    </div>
  );
}
