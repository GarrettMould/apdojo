'use client';

import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { Check, X } from 'lucide-react';
import { Button } from "@/components/ui/button";

export default function LiveTestMockup() {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.5,
    triggerOnce: true
  });

  const sampleQuestion = {
    text: "In the short-run Phillips curve model, which of the following would most likely cause a movement along the curve from a point of low unemployment and high inflation to high unemployment and low inflation?",
    unit: "Unit 5",
    options: [
      { id: 'a', text: 'An increase in government spending' },
      { id: 'b', text: 'Contractionary monetary policy' },
      { id: 'c', text: 'A decrease in income tax rates' },
      { id: 'd', text: 'An increase in worker productivity' },
    ],
    selectedAnswer: 'a',
    correctAnswer: 'b',
    explanation: 'Contractionary monetary policy (higher interest rates) reduces aggregate demand, which leads to lower inflation but higher unemployment - a movement along the short-run Phillips curve. The other options either shift the curve or move in the opposite direction.'
  };

  useEffect(() => {
    let isMounted = true;

      const sequence = async () => {
      try {
        if (!controls || !isMounted) return;

        // Initial delay
        await new Promise(resolve => setTimeout(resolve, 300));
        
        if (!isMounted) return;
        await controls.start('select');
        
        if (!isMounted) return;
        await new Promise(resolve => setTimeout(resolve, 700));
        await controls.start('showResult');
        
        if (!isMounted) return;
        await new Promise(resolve => setTimeout(resolve, 700));
        await controls.start('showExplanation');
      } catch (error) {
        console.error('Animation sequence error:', error);
      }
      };

    if (inView) {
      sequence();
    }

    return () => {
      isMounted = false;
    };
  }, [inView, controls]);

  return (
    <div className="max-w-4xl mx-auto pointer-events-none" ref={ref}>
      <div className="text-center mb-10">
        <h2 className="text-6xl font-extrabold tracking-tight drop-shadow-sm leading-tight mb-6">
          Full <span className="text-blue-500">AP Exams</span> with Feedback
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
          Practice with complete AP-style tests and get instant, detailed feedback on every question
        </p>
        <Button 
          className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-6 text-lg font-semibold rounded-lg"
          onClick={() => window.location.href = '/purchase/exams'}
        >
          Practice Tests
        </Button>
      </div>

      <motion.div 
        className="bg-white rounded-xl shadow-xl border border-gray-200 p-12 mb-12"
        initial="initial"
        animate={controls}
        variants={{
          initial: { height: 'auto' },
          select: { height: 'auto' },
          showResult: { height: 'auto' },
          showExplanation: { height: 'auto' }
        }}
      >
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <span className="font-bold text-gray-900">
                  Question 1 of 60
                </span>
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-semibold">
                  {sampleQuestion.unit}
                </span>
              </div>
              <motion.span
                variants={{
                  initial: { opacity: 0 },
                  showResult: { 
                    opacity: 1,
                    transition: { delay: 1.4 }
                  }
                }}
                initial="initial"
                animate={controls}
                className="px-3 py-1 rounded-sm text-sm font-medium bg-red-100 text-red-800"
              >
                Incorrect
              </motion.span>
            </div>
          </div>

          <div className="p-6">
            <div className="space-y-4">
              <p className="text-lg font-medium">{sampleQuestion.text}</p>
              
              <div className="space-y-3">
                {sampleQuestion.options.map((option) => (
                  <motion.button
                    key={option.id}
                    variants={{
                      initial: { 
                        backgroundColor: '#F9FAFB',
                        borderColor: 'transparent'
                      },
                      select: {
                        backgroundColor: option.id === sampleQuestion.selectedAnswer ? '#EBF5FF' : '#F9FAFB',
                        borderColor: option.id === sampleQuestion.selectedAnswer ? '#BFDBFE' : 'transparent',
                        transition: { delay: 0.7 }
                      },
                      showResult: {
                        backgroundColor: 
                          option.id === sampleQuestion.correctAnswer ? '#F0FDF4' :
                          option.id === sampleQuestion.selectedAnswer ? '#FEF2F2' : '#F9FAFB',
                        borderColor:
                          option.id === sampleQuestion.correctAnswer ? '#86EFAC' :
                          option.id === sampleQuestion.selectedAnswer ? '#FCA5A5' : 'transparent',
                        transition: { delay: 1.4 }
                      }
                    }}
                    initial="initial"
                    animate={controls}
                    className="w-full text-left p-3 md:p-3.5 rounded-md text-sm font-medium transition-all duration-200 border pointer-events-none"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-start gap-2 w-[85%]">
                        <span className="text-gray-700 mt-0.5">
                          {option.id})
                        </span>
                        <span className={option.id === sampleQuestion.correctAnswer ? 'font-medium' : ''}>
                          {option.text}
                        </span>
                      </div>
                      {(option.id === sampleQuestion.correctAnswer || 
                        (option.id === sampleQuestion.selectedAnswer && option.id !== sampleQuestion.correctAnswer)) && (
                        <motion.div 
                          className="flex-shrink-0"
                          variants={{
                            initial: { opacity: 0 },
                            select: { opacity: 0 },
                            showResult: { 
                              opacity: 1,
                              transition: { delay: 1.4 }
                            }
                          }}
                        >
                          {option.id === sampleQuestion.correctAnswer ? (
                            <Check className="w-4 h-4 text-green-600" />
                          ) : (
                            <X className="w-4 h-4 text-red-600" />
                          )}
                        </motion.div>
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            <motion.div
              variants={{
                initial: { height: 0, opacity: 0, margin: 0 },
                select: { height: 0, opacity: 0, margin: 0 },
                showResult: { 
                  height: 'auto', 
                  opacity: 1, 
                  marginTop: '1.5rem',
                  transition: { delay: 1.4 }
                }
              }}
              initial="initial"
              animate={controls}
              className="overflow-hidden"
            >
              <div className="relative group">
                <motion.div
                  variants={{
                    initial: { opacity: 0 },
                    select: { opacity: 0 },
                    showResult: { opacity: 1 },
                    showExplanation: {
                      backgroundColor: '#F3F4F6',
                      transition: { 
                        backgroundColor: {
                          duration: 0.2,
                          delay: 2.1
                        }
                      }
                    }
                  }}
                >
                  <Button
                    variant="outline"
                    className="w-full justify-between pointer-events-none"
                  >
                    Show Explanation
                    <span className="text-gray-400">+</span>
                  </Button>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              variants={{
                initial: { height: 0, opacity: 0, margin: 0 },
                select: { height: 0, opacity: 0, margin: 0 },
                showResult: { height: 0, opacity: 0, margin: 0 },
                showExplanation: {
                  height: 'auto',
                  opacity: 1,
                  marginTop: '1rem',
                  transition: { 
                    height: { duration: 0.2, delay: 2.1 },
                    opacity: { duration: 0.2, delay: 2.3 },
                    margin: { duration: 0.2, delay: 2.1 }
                  }
                }
              }}
              initial="initial"
              animate={controls}
              className="overflow-hidden"
            >
              <div className="mt-4 p-4 bg-blue-50 rounded-lg text-blue-800">
                {sampleQuestion.explanation}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
