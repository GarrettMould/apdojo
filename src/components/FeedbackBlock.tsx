'use client';

import React from 'react';
import { Star, ChevronDown, ChevronUp } from 'lucide-react';
import { InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';

// Define the shape of the part/subpart object
interface AnswerablePart {
  label: string;
  answer?: string | any;
  gradingCriteria?: string; // Used for AI grading (not shown to students)
  studentExplanation?: string; // Student-friendly explanation (shown in UI)
  pointValue?: number;
}

// Define the shape of the feedback object
interface Feedback {
  score: number;
  feedback: string;
}

interface FeedbackBlockProps {
  feedback: Feedback;
  part: AnswerablePart;
  answerKey: string;
  showAnswers: Record<string, boolean>;
  toggleAnswer: (key: string) => void;
}

const renderWithMath = (text: string) => {
  if (typeof text !== 'string') return text;

  // This regex splits the string by expressions enclosed in $, capturing the content inside.
  const parts = text.split(/\$(.*?)\$/g);

  return (
    <>
      {parts.map((part, index) => {
        // Odd-indexed parts are the captured math expressions.
        if (index % 2 === 1) {
          return <InlineMath key={index} math={part} />;
        }
        // Even-indexed parts are the surrounding text.
        return <span key={index}>{part}</span>;
      })}
    </>
  );
};

const formatAnswerText = (text: string) => {
  const parts = text.split(/Explanation: ?/i);
  if (parts.length === 2) {
    return (
      <>
        {renderWithMath(parts[0].trim())}
        <br />
        <br />
        <span className="font-bold">Explanation:</span> {renderWithMath(parts[1].trim())}
      </>
    );
  }
  return renderWithMath(text);
};

export const FeedbackBlock: React.FC<FeedbackBlockProps> = ({ feedback, part, answerKey, showAnswers, toggleAnswer }) => {
  const criteriaKey = `criteria-${answerKey}`;
  const maxScore = part.pointValue !== undefined ? part.pointValue : 2; // Default to 2 if not provided
  const scoreOptions = Array.from({ length: maxScore + 1 }, (_, i) => i); // Creates [0, 1] or [0, 1, 2]

  return (
    <div className="mt-3 space-y-4">
      {/* AP-Style Score Selector */}
      <div className="rounded-lg p-4 bg-gray-50 border border-gray-200">
        <div className="mb-4">
          <p className="text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">
            AP Exam Score
          </p>
          <div className="flex gap-2">
            {scoreOptions.map((score) => {
              const isSelected = feedback.score === score;
              // Color logic: For 0/1 point questions, 1 is green. For 0/1/2 point questions, 1 is yellow, 2 is green.
              let colorClass = '';
              if (isSelected) {
                if (score === 0) {
                  colorClass = 'bg-red-100 border-red-500 text-red-700';
                } else if (score === 1) {
                  // If maxScore is 1, then score 1 is full credit (green). Otherwise, it's partial (yellow).
                  colorClass = maxScore === 1 
                    ? 'bg-green-100 border-green-500 text-green-700'
                    : 'bg-yellow-100 border-yellow-500 text-yellow-700';
                } else {
                  // score === 2, always green (full credit)
                  colorClass = 'bg-green-100 border-green-500 text-green-700';
                }
              } else {
                colorClass = 'bg-white border-gray-300 text-gray-500 hover:border-gray-400';
              }
              
              return (
                <button
                  key={score}
                  className={`flex-1 py-3 px-4 rounded-lg border-2 font-semibold text-lg transition-all ${colorClass}`}
                >
                  {score}
                </button>
              );
            })}
          </div>
          <p className="text-xs text-gray-600 mt-2 text-center">
            {feedback.score === 0 && 'No credit - Does not meet criteria'}
            {feedback.score === 1 && maxScore === 1 && 'Full credit - Meets all criteria'}
            {feedback.score === 1 && maxScore > 1 && 'Partial credit - Some understanding shown'}
            {feedback.score === 2 && 'Full credit - Meets all criteria'}
          </p>
        </div>

        {/* Feedback Section */}
        {feedback.feedback && (
          <div className="mt-3 pt-3 border-t border-gray-200">
            <p className="text-sm text-gray-800 leading-relaxed">
              {feedback.feedback}
            </p>
          </div>
        )}
      </div>

      {/* Answer Display */}
      {part.answer && (
        <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
          <p className="text-xs font-semibold text-green-800 mb-2 uppercase tracking-wide">Correct Answer:</p>
          {typeof part.answer === 'string' && part.answer.startsWith('/images/') ? (
            <div className="flex justify-center">
              <img
                src={part.answer}
                alt={`Answer for part ${part.label}`}
                className="max-w-2xl w-full h-auto rounded-lg border border-green-200"
              />
            </div>
          ) : (
            <div className="text-gray-800 whitespace-pre-wrap">{formatAnswerText(part.answer)}</div>
          )}
        </div>
      )}

      {/* Student Explanation (Expandable) - Shows student-friendly explanation, not detailed grading criteria */}
      {(part.studentExplanation || part.gradingCriteria) && (
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <button
            onClick={() => toggleAnswer(criteriaKey)}
            className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 transition-colors text-left"
          >
            <span className="text-sm font-medium text-gray-700">View Grading Criteria</span>
            {showAnswers[criteriaKey] ? (
              <ChevronUp className="w-4 h-4 text-gray-500 flex-shrink-0" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-500 flex-shrink-0" />
            )}
          </button>
          {showAnswers[criteriaKey] && (
            <div className="p-4 bg-white border-t border-gray-200">
              <p className="text-xs font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                Grading Criteria
              </p>
              <div className="text-sm text-gray-800 leading-relaxed space-y-3">
                {/* Show studentExplanation if available, otherwise fall back to gradingCriteria */}
                {part.studentExplanation ? (
                  <p className="text-gray-800 whitespace-pre-wrap">{part.studentExplanation}</p>
                ) : (
                  // Fallback: try to parse gradingCriteria if no studentExplanation exists
                  part.gradingCriteria?.split(/(?=\d+ points?:)/).map((section, idx) => {
                    if (!section.trim()) return null;
                    const match = section.match(/^(\d+ points?:)\s*(.+)$/);
                    if (match) {
                      const [, scoreLabel, description] = match;
                      return (
                        <div key={idx} className={idx > 0 ? 'pt-3 border-t border-gray-200' : ''}>
                          <p className="text-gray-800">
                            <span className="font-bold text-gray-900">{scoreLabel}</span> {description.trim()}
                          </p>
                        </div>
                      );
                    }
                    return <p key={idx}>{section.trim()}</p>;
                  })
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
