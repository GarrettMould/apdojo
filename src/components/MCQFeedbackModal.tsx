import { Check, X } from 'lucide-react';
import { useEffect, useState } from 'react';

interface MCQFeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  question: string;
  selectedAnswer?: string;
  correctAnswer?: string;
  feedback: {
    status: 'incorrect' | 'partial' | 'correct';
    message: string;
  };
  studyResources: {
    title: string;
    type: 'video' | 'notes' | 'practice';
    link: string;
  }[];
  subject: 'micro' | 'macro';
  unitNumber: number;
}

export function MCQFeedbackModal({
  isOpen,
  onClose,
  question,
  selectedAnswer,
  correctAnswer,
  feedback,
  studyResources,
  subject,
  unitNumber
}: MCQFeedbackModalProps) {
  const [currentSubject, setCurrentSubject] = useState<'micro' | 'macro'>(subject);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const getStudyGuideLink = () => {
    return `/unit-study-guides`;
  };

  const toggleSubject = () => {
    setCurrentSubject(prev => prev === 'micro' ? 'macro' : 'micro');
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className="w-[32rem] max-h-[90vh] bg-white rounded-lg shadow-xl flex flex-col relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex-1 overflow-y-auto p-8">
          <div className="flex flex-col space-y-6">
            {/* Question */}
            <div>
              <p className="text-lg font-bold text-gray-900">
                {question}
              </p>
            </div>

            {/* Selected Answer */}
            {selectedAnswer && (
              <div>
                <div className={`p-4 rounded-lg border ${
                  selectedAnswer === correctAnswer
                    ? 'bg-green-50 border-green-200'
                    : 'bg-red-50 border-red-200'
                }`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      selectedAnswer === correctAnswer
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {selectedAnswer === correctAnswer
                        ? <Check className="w-5 h-5" />
                        : <X className="w-5 h-5" />
                      }
                    </div>
                    <p className="font-medium">
                      {selectedAnswer}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Correct Answer (if user's answer was wrong) */}
            {correctAnswer && selectedAnswer !== correctAnswer && (
              <div>
                <div className="p-4 rounded-lg bg-green-50 border border-green-200">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center">
                      <Check className="w-5 h-5" />
                    </div>
                    <p className="font-medium">
                      {correctAnswer}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Why This Answer */}
            <div className="rounded-lg border border-gray-200 overflow-hidden">
              <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                <h3 className="font-semibold text-gray-900">Why This Answer</h3>
              </div>
              <div className="p-4 bg-white">
                <div 
                  className="text-gray-700 prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: feedback.message }}
                />
              </div>
            </div>

            {/* Study Resources */}
            <div className="rounded-lg border border-blue-200 overflow-hidden">
              <div className="bg-blue-50 px-4 py-3 border-b border-blue-200">
                <h3 className="font-semibold text-gray-900">Study Concepts</h3>
              </div>
              <div className="p-4 bg-white">
                <ul className="space-y-3">
                  {/* Render each study resource */}
                  {studyResources.map((resource, index) => (
                    <li key={index} className="flex items-center gap-3 text-sm">
                      <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                        {resource.type === 'video' ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            className="w-4 h-4 text-blue-600"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14m0-4v4m0-4L9 7m6 3L9 13m0-6v6"
                            />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            className="w-4 h-4 text-blue-600"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                            />
                          </svg>
                        )}
                      </div>
                      <a 
                        href={resource.link} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-blue-600 hover:text-blue-800 font-medium"
                      >
                        {resource.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Close button */}
            <button
              onClick={onClose}
              className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 