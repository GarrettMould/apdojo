import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { PencilSquareIcon, CalculatorIcon, ClockIcon } from '@heroicons/react/24/outline';

interface AnswerOption {
  id: string;
  text: string;
}

export default function LiveTestMockup() {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.5,
    triggerOnce: true
  });

  const sampleQuestion = {
    text: "What is the derivative of f(x) = x²?",
    options: [
      { id: 'a', text: 'f\'(x) = 2x' },
      { id: 'b', text: 'f\'(x) = x' },
      { id: 'c', text: 'f\'(x) = 2' },
      { id: 'd', text: 'f\'(x) = x²' },
    ],
    selectedAnswer: 'b', // The wrong answer that will be "selected" in the animation
    correctAnswer: 'a',
    explanation: 'The derivative of x² can be found using the power rule: d/dx(x^n) = nx^(n-1). Here, n=2, so we get 2x^(2-1) = 2x^1 = 2x.'
  };

  useEffect(() => {
    if (inView) {
      const sequence = async () => {
        // Wait a bit before starting
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Select the answer
        await controls.start('select');
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Show correct/incorrect
        await controls.start('showResult');
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Show explanation
        await controls.start('showExplanation');
      };
      sequence();
    }
  }, [inView, controls]);

  return (
    <div className="max-w-4xl mx-auto p-6" ref={ref}>
      {/* Header with tools */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-4">
          <div className="p-2 rounded-lg">
            <PencilSquareIcon className="w-6 h-6" />
          </div>
          <div className="p-2 rounded-lg">
            <CalculatorIcon className="w-6 h-6" />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <ClockIcon className="w-6 h-6 text-gray-600" />
          <span className="font-mono">45:00</span>
        </div>
      </div>

      {/* Question content */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">{sampleQuestion.text}</h2>
        
        <div className="space-y-3">
          {sampleQuestion.options.map((option) => (
            <motion.div
              key={option.id}
              variants={{
                initial: { backgroundColor: 'white' },
                select: {
                  backgroundColor: option.id === sampleQuestion.selectedAnswer ? '#EBF5FF' : 'white',
                  transition: { delay: 1 }
                },
                showResult: {
                  backgroundColor: 
                    option.id === sampleQuestion.correctAnswer ? '#F0FDF4' :
                    option.id === sampleQuestion.selectedAnswer ? '#FEF2F2' : 'white',
                  borderColor:
                    option.id === sampleQuestion.correctAnswer ? '#22C55E' :
                    option.id === sampleQuestion.selectedAnswer ? '#EF4444' : '#E5E7EB',
                  transition: { delay: 2 }
                }
              }}
              initial="initial"
              animate={controls}
              className="w-full text-left p-4 rounded-lg border border-gray-200"
            >
              <span className="font-medium">{option.id.toUpperCase()}.</span> {option.text}
            </motion.div>
          ))}
        </div>

        {/* Explanation Section */}
        <motion.div
          variants={{
            initial: { opacity: 0, height: 0 },
            showExplanation: {
              opacity: 1,
              height: 'auto',
              transition: { delay: 3, duration: 0.5 }
            }
          }}
          initial="initial"
          animate={controls}
          className="mt-6 pt-6 border-t overflow-hidden"
        >
          <div className="mb-4">
            <span className="font-medium text-red-600">Incorrect</span>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-medium mb-2">Explanation:</h3>
            <p className="text-gray-700">{sampleQuestion.explanation}</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
