import { useState, useRef, useEffect } from 'react';
import { X } from 'lucide-react';

type Question = {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
}

type VideoModalProps = {
  videoUrl: string;
  questions: Question[];
  onClose: () => void;
}

export const VideoModal = ({ videoUrl, questions, onClose }: VideoModalProps) => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [submittedAnswers, setSubmittedAnswers] = useState<Record<string, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Add useEffect to handle body scroll locking
  useEffect(() => {
    // Lock scrolling when component mounts
    document.body.style.overflow = 'hidden';
    
    // Cleanup: restore scrolling when component unmounts
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleAnswerSelect = (questionId: string, answerIndex: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
  };

  const handleSubmit = () => {
    setSubmittedAnswers(selectedAnswers);
    setIsSubmitted(true);
  };

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-0 md:p-4"
      onClick={onClose}
    >
      <div 
        className="relative bg-black rounded-lg overflow-hidden w-full h-full md:h-[80vh] flex flex-col md:flex-row"
        onClick={e => e.stopPropagation()}
      >
        {/* Video Section */}
        <div className="flex-none h-[40vh] md:h-auto md:flex-1 relative">
          <video 
            ref={videoRef}
            controls 
            autoPlay 
            className="w-full h-full"
            playsInline
          >
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Questions Sidebar */}
        <div className="w-full md:w-96 bg-white flex flex-col flex-1 md:flex-none">
          {/* Fixed Header */}
          <div className="sticky top-0 bg-white p-4 md:p-6 border-b z-10">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 md:top-6 md:right-6 text-gray-900 hover:text-gray-600 transition-colors"
            >
              <X className="w-7 h-7" />
            </button>
            
            <div>
              <h3 className="font-extrabold text-xl md:text-2xl mb-1">
                AP <span className="text-blue-500">Dojo</span>
              </h3>
              <h4 className="font-bold text-lg md:text-xl">
                Comprehension Check
              </h4>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6">
            <div className="space-y-3 md:space-y-4">
              {questions.map((question) => (
                <div 
                  key={question.id}
                  className="p-4 md:p-5 rounded-lg border bg-white shadow-sm hover:shadow-md transition-shadow"
                >
                  <p className="text-base font-semibold mb-3 md:mb-4 text-gray-900">{question.text}</p>
                  <div className="space-y-2 md:space-y-2.5">
                    {question.options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleAnswerSelect(question.id, index)}
                        disabled={isSubmitted}
                        className={`w-full text-left p-3 md:p-3.5 rounded-md text-sm font-medium transition-all duration-200 border ${
                          isSubmitted
                            ? index === question.correctAnswer
                              ? 'bg-green-100 text-gray-900 shadow-sm border-transparent'
                              : index === submittedAnswers[question.id]
                                ? 'bg-red-100 text-gray-900 shadow-sm border-transparent'
                                : 'bg-gray-50 text-gray-900 border-transparent'
                            : selectedAnswers[question.id] === index
                              ? 'bg-blue-50 text-gray-900 border-blue-200 shadow-sm'
                              : 'bg-gray-50 hover:bg-gray-100 hover:shadow-sm border-transparent'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={isSubmitted || Object.keys(selectedAnswers).length !== questions.length}
              className={`mt-4 md:mt-6 w-full py-2.5 rounded font-medium text-sm
                ${isSubmitted
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : Object.keys(selectedAnswers).length === questions.length
                    ? 'bg-blue-500 text-white hover:bg-blue-600'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
            >
              {isSubmitted ? 'Submitted' : 'Submit'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}; 