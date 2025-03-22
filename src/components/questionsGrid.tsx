'use client'

import { conceptChecks } from '@/data/conceptChecks'
import { ArrowRight, X, ChevronRight } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'

// Move QuestionCard outside of QuestionsGrid
const QuestionCard = ({ 
  question, 
  tags, 
  relevantLessons,
  onQuestionClick 
}: { 
  question: string; 
  tags: string[];
  relevantLessons: string[];
  onQuestionClick: (question: string, tags: string[], relevantLessons: string[]) => void;
}) => {
  const tagsContainerRef = useRef<HTMLDivElement>(null);
  const [visibleTags, setVisibleTags] = useState<string[]>([]);

  useEffect(() => {
    if (!tagsContainerRef.current) return;
    
    const container = tagsContainerRef.current;
    const containerWidth = container.clientWidth;
    
    const measureDiv = document.createElement('div');
    measureDiv.style.visibility = 'hidden';
    measureDiv.style.position = 'absolute';
    measureDiv.style.whiteSpace = 'nowrap';
    document.body.appendChild(measureDiv);

    measureDiv.innerHTML = `
      <span class="px-2 py-1 bg-gray-100 rounded-md text-xs text-gray-600">
        ${tags[0]}
      </span>
    `;
    const firstTagWidth = measureDiv.firstElementChild?.getBoundingClientRect().width || 0;

    let secondTagWidth = 0;
    if (tags.length > 1) {
      measureDiv.innerHTML = `
        <span class="px-2 py-1 bg-gray-100 rounded-md text-xs text-gray-600">
          ${tags[1]}
        </span>
      `;
      secondTagWidth = measureDiv.firstElementChild?.getBoundingClientRect().width || 0;
    }

    document.body.removeChild(measureDiv);

    const gapWidth = 8;
    const totalWidth = firstTagWidth + gapWidth + secondTagWidth;
    
    if (totalWidth <= containerWidth && tags.length > 1) {
      setVisibleTags([tags[0], tags[1]]);
    } else {
      setVisibleTags([tags[0]]);
    }
  }, [tags]);

  return (
    <div className="w-96 h-48 bg-white rounded-lg shadow-md border-2 border-grey-500 p-6 flex flex-col">
      <div ref={tagsContainerRef} className="flex gap-2 mb-3 h-7 overflow-hidden">
        {visibleTags.map((tag, index) => (
          <span 
            key={index}
            className="px-2 py-1 bg-gray-100 rounded-md text-xs text-gray-600 whitespace-nowrap"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="h-12 overflow-hidden mb-3">
        <p className="text-sm font-bold text-gray-900 line-clamp-2">
          {question}
        </p>
      </div>

      <div className="mt-auto flex gap-2">
        <input
          type="text"
          className="flex-1 px-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type your answer..."
          onClick={(e) => {
            e.preventDefault()
            onQuestionClick(question, tags, relevantLessons)
          }}
          readOnly
        />
        <button className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export function QuestionsGrid() {
  // First, define the helper functions
  const getAllMacroQuestions = () => {
    const allQuestions: Array<{
      text: string;
      tags: string[];
      relevantLessons: string[];
    }> = [];
    
    Object.values(conceptChecks.macroeconomics).forEach(unit => {
      unit.questions.forEach(question => {
        allQuestions.push(question);
      });
    });
    
    return allQuestions;
  };

  const getRandomQuestions = (count: number) => {
    const allQuestions = getAllMacroQuestions();
    const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  };

  // Then declare state variables
  const [randomQuestions] = useState(() => getRandomQuestions(12));
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [activeQuestion, setActiveQuestion] = useState<{ 
    question: string; 
    tags: string[];
    relevantLessons: string[];
  } | null>(null);
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitAnswer = async () => {
    if (!currentAnswer.trim() || !activeQuestion) return

    setIsSubmitting(true)
    setFeedback(null)

    try {
      console.log('Sending request with:', {
        question: activeQuestion.question,
        userAnswer: currentAnswer,
        tags: activeQuestion.tags,
      })

      const response = await fetch('/api/check-answer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: activeQuestion.question,
          userAnswer: currentAnswer,
          tags: activeQuestion.tags,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        console.error('API Error:', {
          status: response.status,
          statusText: response.statusText,
          data: errorData
        })
        throw new Error(`API error: ${response.status} ${response.statusText}`)
      }

      const data = await response.json()
      console.log('Received response:', data)
      setFeedback(data.feedback)
      
      setAnswers(prev => ({
        ...prev,
        [activeQuestion.question]: currentAnswer
      }))
    } catch (error) {
      console.error('Detailed error:', error)
      setFeedback('Sorry, there was an error checking your answer. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleQuestionClick = (question: string, tags: string[], relevantLessons: string[]) => {
    setActiveQuestion({ question, tags, relevantLessons });
  };

  return (
    <>
      <div className="w-full py-12 mr-72">
        {/* First Row */}
        <div className="flex justify-center gap-8 mb-8">
          {randomQuestions.slice(0, 4).map((question, index) => (
            <QuestionCard 
              key={`row1-${index}`}
              question={question.text}
              tags={question.tags}
              relevantLessons={question.relevantLessons}
              onQuestionClick={handleQuestionClick}
            />
          ))}
        </div>

        {/* Second Row */}
        <div className="flex justify-center gap-8 mb-8">
          {randomQuestions.slice(4, 8).map((question, index) => (
            <QuestionCard 
              key={`row2-${index}`}
              question={question.text}
              tags={question.tags}
              relevantLessons={question.relevantLessons}
              onQuestionClick={handleQuestionClick}
            />
          ))}
        </div>

        {/* Third Row */}
        <div className="flex justify-center gap-8">
          {randomQuestions.slice(8, 12).map((question, index) => (
            <QuestionCard 
              key={`row3-${index}`}
              question={question.text}
              tags={question.tags}
              relevantLessons={question.relevantLessons}
              onQuestionClick={handleQuestionClick}
            />
          ))}
        </div>
      </div>

      {/* Updated Modal */}
      {activeQuestion && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => {
            setActiveQuestion(null)
            setFeedback(null)
            setCurrentAnswer('')
          }}
        >
          <div 
            className="w-[32rem] max-h-[90vh] bg-white rounded-lg shadow-xl flex flex-col relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="flex flex-col">
                {/* Tags */}
                <div className="flex gap-2 mb-4">
                  {activeQuestion.tags.map((tag, index) => (
                    <span 
                      key={index} 
                      className="px-2 py-1 bg-gray-100 rounded-md text-xs text-gray-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Question */}
                <div className="mb-6">
                  <p className="text-lg font-bold text-gray-900">
                    {activeQuestion.question}
                  </p>
                </div>

                {/* Answer Input and Submit */}
                <div className="flex gap-2 mb-6">
                  <input
                    type="text"
                    className={`flex-1 px-4 py-3 border border-gray-200 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      feedback ? 'bg-gray-50 cursor-not-allowed' : ''
                    }`}
                    placeholder="Type your answer..."
                    value={currentAnswer}
                    onChange={(e) => setCurrentAnswer(e.target.value)}
                    disabled={feedback !== null}
                    autoFocus
                  />
                  <button 
                    className={`px-4 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors ${
                      isSubmitting || feedback ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    onClick={handleSubmitAnswer}
                    disabled={isSubmitting || feedback !== null}
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <ArrowRight className="w-5 h-5 stroke-[3]" />
                    )}
                  </button>
                </div>

                {/* Feedback Sections */}
                {feedback && (
                  <div className="space-y-6">
                    {/* AI Tutor Feedback */}
                    <div className="rounded-lg border border-gray-200 overflow-hidden">
                      <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
                        <h3 className="font-semibold text-gray-900">AI Tutor Feedback</h3>
                      </div>
                      <div className="p-4 bg-white">
                        <div 
                          className="text-gray-700 prose prose-sm max-w-none"
                          dangerouslySetInnerHTML={{ __html: feedback || '' }}
                        />
                      </div>
                    </div>

                    {/* Topics to Review - Now only shows after feedback exists */}
                    <div className="rounded-lg border border-blue-200 overflow-hidden">
                      <div className="bg-blue-50 px-4 py-2 border-b border-blue-200">
                        <h3 className="font-semibold text-gray-900">Topics to Review</h3>
                      </div>
                      <div className="p-4 bg-white">
                        <ul className="space-y-2">
                          {activeQuestion.relevantLessons.map((lesson, index) => (
                            <li 
                              key={index}
                              className="text-sm text-gray-700 flex items-center gap-2 hover:text-blue-600 transition-colors cursor-pointer"
                            >
                              <div className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                              {lesson}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Sticky footer */}
            <div className="flex-shrink-0 bg-blue-500 py-6 px-4 rounded-b-lg">
              <a 
                href="#" 
                className="flex items-center justify-center gap-2 transition-transform hover:translate-x-1 group"
              >
                <span className="text-md font-bold text-white">
                  Explore more AP Macroeconomics questions
                </span>
                <ChevronRight className="w-5 h-5 text-white stroke-[3]" />
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
