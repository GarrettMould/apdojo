'use client';

import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { Check, X } from 'lucide-react';
import { Button } from "@/components/ui/button";

// Separate the header into its own component
function MockupHeader() {
  return (
    <div className="text-center mb-10">
      <h2 className="text-5xl font-extrabold tracking-tight text-gray-900 mb-4">
        Real-Time Feedback
      </h2>
      <p className="text-lg text-gray-600">
        Get instant feedback on your answers and detailed explanations
      </p>
    </div>
  );
}

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
    <div className="max-w-4xl mx-auto" ref={ref}>
      <motion.div 
        className="bg-white rounded-xl shadow-xl border border-gray-200 p-12 mb-12 mt-12"
        initial="initial"
        animate={controls}
        variants={{
          initial: { height: 'auto' },
          select: { height: 'auto' },
          showResult: { height: 'auto' },
          showExplanation: { height: 'auto' }
        }}
      >
        <MockupHeader />

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="mb-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="font-bold text-gray-900 text-sm">
                Question 1 of 60
              </span>
              <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-xs font-semibold">
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

          <div className="space-y-3">
            <p className="text-base font-medium">{sampleQuestion.text}</p>
          
            <div className="space-y-2">
              {sampleQuestion.options.map((option) => (
                <motion.div
                  key={option.id}
                  variants={{
                    initial: { 
                      backgroundColor: 'white',
                      borderColor: '#E5E7EB'
                    },
                    select: {
                      backgroundColor: option.id === sampleQuestion.selectedAnswer ? '#EBF5FF' : 'white',
                      borderColor: option.id === sampleQuestion.selectedAnswer ? '#3B82F6' : '#E5E7EB',
                      transition: { delay: 0.7 }
                    },
                    showResult: {
                      backgroundColor: 
                        option.id === sampleQuestion.correctAnswer ? '#F0FDF4' :
                        option.id === sampleQuestion.selectedAnswer ? '#FEF2F2' : 'white',
                      borderColor:
                        option.id === sampleQuestion.correctAnswer ? '#22C55E' :
                        option.id === sampleQuestion.selectedAnswer ? '#EF4444' : '#E5E7EB',
                      transition: { delay: 1.4 }
                    }
                  }}
                  initial="initial"
                  animate={controls}
                  className="p-3 border rounded"
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
                </motion.div>
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
                  showResult: { 
                    opacity: 1,
                    backgroundColor: 'white'
                  },
                  showExplanation: {
                    opacity: 1,
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
                  <div className="relative w-4 h-4">
                    <motion.span
                      variants={{
                        initial: { opacity: 1 },
                        showResult: { opacity: 1 },
                        showExplanation: { 
                          opacity: 0,
                          transition: { 
                            delay: 2.1,
                            duration: 0.2
                          }
                        }
                      }}
                      className="absolute inset-0 text-gray-400"
                    >
                      +
                    </motion.span>
                    <motion.span
                      variants={{
                        initial: { opacity: 0 },
                        showResult: { opacity: 0 },
                        showExplanation: { 
                          opacity: 1,
                          transition: { 
                            delay: 2.1,
                            duration: 0.2
                          }
                        }
                      }}
                      className="absolute inset-0 text-gray-400"
                    >
                      −
                    </motion.span>
                  </div>
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
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-gray-700">{sampleQuestion.explanation}</p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
