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
        <div className="w-full md:w-96 bg-white p-4 md:p-6 overflow-y-auto flex flex-col flex-1 md:flex-none">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 md:top-6 md:right-6 text-gray-900 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="mb-4 md:mb-6">
            <h3 className="font-extrabold text-xl md:text-2xl mb-1">
              AP <span className="text-blue-500">Dojo</span>
            </h3>
            <h4 className="font-bold text-lg md:text-xl">
              Comprehension Check
            </h4>
          </div>
          
          <div className="space-y-3 md:space-y-4 flex-1">
            {questions.map((question) => (
              <div 
                key={question.id}
                className="p-3 md:p-4 rounded border bg-gray-50 border-gray-200"
              >
                <p className="text-sm font-semibold mb-2 md:mb-3">{question.text}</p>
                <div className="space-y-1.5 md:space-y-2">
                  {question.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswerSelect(question.id, index)}
                      disabled={isSubmitted}
                      className={`w-full text-left p-2 md:p-2.5 rounded text-sm font-medium ${
                        isSubmitted
                          ? index === question.correctAnswer
                            ? 'bg-green-100 text-gray-900'
                            : index === submittedAnswers[question.id]
                              ? 'bg-red-100 text-gray-900'
                              : 'bg-white text-gray-900'
                          : selectedAnswers[question.id] === index
                            ? 'bg-blue-50 text-gray-900 border border-blue-200 bg-[repeating-linear-gradient(-45deg,transparent,transparent_10px,rgba(59,130,246,0.1)_10px,rgba(59,130,246,0.1)_11px)]'
                            : 'bg-white hover:bg-blue-50 transition-colors'
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
  );
}; 