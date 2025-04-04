import { Check, X } from 'lucide-react';
import { useEffect } from 'react';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  question: string;
  selectedAnswer?: string;
  correctAnswer?: string;
  feedback: {
    status: 'incorrect' | 'partial' | 'correct';
    message: string;
  };
  unit: number;
}

export function FeedbackModal({
  isOpen,
  onClose,
  question,
  selectedAnswer,
  correctAnswer,
  feedback,
  unit
}: FeedbackModalProps) {
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

            {/* Your Answer */}
            {selectedAnswer && (
              <div className="rounded-lg border border-gray-200 overflow-hidden">
                <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                  <h3 className="font-semibold text-gray-900">Your Answer</h3>
                </div>
                <div className="p-4 bg-white">
                  <p className="text-gray-700">
                    {selectedAnswer}
                  </p>
                </div>
              </div>
            )}

            {/* AI Tutor Feedback with Progress Bar */}
            <div className="rounded-lg border border-gray-200 overflow-hidden">
              <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900">AI Tutor Feedback</h3>
                  <FeedbackProgressBar status={feedback.status} />
                </div>
              </div>
              <div className="p-4 bg-white">
                <div 
                  className="text-gray-700 prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: feedback.message }}
                />
              </div>
            </div>

            {/* Study Resources - Keep plural but only show cheat sheet for now */}
            <div className="rounded-lg border border-blue-200 overflow-hidden">
              <div className="bg-blue-50 px-4 py-3 border-b border-blue-200">
                <h3 className="font-semibold text-gray-900">Study Resources</h3>
              </div>
              <div className="p-4 bg-white">
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-sm">
                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                      <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <a 
                      href={getStudyGuideLink(unit)} 
                      className="text-blue-600 hover:text-blue-800 font-medium"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Unit {unit}: Cheat Sheet
                    </a>
                  </li>
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

// Make sure this component is defined in the same file or imported
const FeedbackProgressBar = ({ status }: { status: 'incorrect' | 'partial' | 'correct' }) => {
  const bars = [
    { filled: status === 'incorrect' || status === 'partial' || status === 'correct' },
    { filled: status === 'partial' || status === 'correct' },
    { filled: status === 'correct' }
  ];

  const getColor = (status: 'incorrect' | 'partial' | 'correct') => {
    switch (status) {
      case 'incorrect': return 'bg-red-500';
      case 'partial': return 'bg-yellow-500';
      case 'correct': return 'bg-green-500';
    }
  };

  return (
    <div className="flex gap-1.5">
      {bars.map((bar, index) => (
        <div 
          key={index}
          className={`h-2 w-12 rounded-full transition-all duration-300 ${
            bar.filled 
              ? getColor(status) 
              : 'bg-gray-200'
          }`}
        />
      ))}
    </div>
  );
};

// Add this function
const getStudyGuideLink = (unit: number) => {
  return `/study-guides/macro-${unit}`;
}; 