'use client';

import { useState, useEffect } from 'react';
import { X, Brain, Check } from 'lucide-react';
import dojoIcon from "../../../public/images/dojoIcon.png"
import Image from 'next/image';
import type { StaticImageData } from 'next/image';
// import { allContent } from '@/data/allContent'; // Assuming you might remove this if Notion replaces it
import React from 'react';

// --- Notion Imports ---
import { NotionRenderer } from 'react-notion-x';
import type { ExtendedRecordMap } from 'notion-types';
// Required CSS for react-notion-x (import in your global CSS or layout)
// import 'react-notion-x/src/styles.css'; 
// --- End Notion Imports ---

type Question = {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
}

type ContentImage = {
  src: StaticImageData;
  caption: string;
  width?: string; // e.g., '100%', '500px', etc.
  height?: string;
  placement?: 'after-paragraph' | 'inline';
  paragraphId?: string; // To identify which paragraph to place it after
}

type CheatSheetSectionProps = {
  id: string;
  lessonIDS: string[];
  title: string;
  children: React.ReactNode;
  setShowQuiz: (show: boolean) => void;
  setIsLoading: (loading: boolean) => void;
  setQuestions: (questions: Question[]) => void;
  setSelectedAnswers: (answers: Record<string, number>) => void;
  setIsSubmitted: (submitted: boolean) => void;
  setActiveSection: (section: { id: string; lessonID: string; title: string } | null) => void;
  subject: string;
  images?: ContentImage[];
}

const CheatSheetSection = ({ 
  id, 
  lessonIDS, 
  title, 
  children,
  setShowQuiz,
  setIsLoading,
  setQuestions,
  setSelectedAnswers,
  setIsSubmitted,
  setActiveSection,
  subject,
  images
}: CheatSheetSectionProps) => {
  const handleSectionQuiz = async () => {
    const sectionElement = document.getElementById(id);
    if (sectionElement) {
      const sectionContent = sectionElement.textContent || '';
      setIsLoading(true);
      setShowQuiz(true);
      setActiveSection({ id, lessonID: lessonIDS[0], title });

      try {
        const response = await fetch('/api/generate-quiz', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            subject,
            content: sectionContent,
          }),
        });

        if (!response.ok) throw new Error('Failed to generate quiz');

        const data = await response.json();
        setQuestions(data.questions);
        setSelectedAnswers({});
        setIsSubmitted(false);
      } catch (error) {
        console.error('Error generating quiz:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const renderContent = (content: React.ReactNode, images: ContentImage[]) => {
    const contentArray = React.Children.toArray(content);
    const result: React.ReactNode[] = [];

    React.Children.forEach(content, (child, index) => {
      // Add the content
      result.push(child);

      // Check if any images should be placed after this paragraph
      const matchingImages = images?.filter(
        img => img.placement === 'after-paragraph' && 
        (img.paragraphId === (child as any).props?.id)
      );

      if (matchingImages?.length) {
        matchingImages.forEach(image => {
          result.push(
            <figure key={`figure-${image.src.src}`} className="my-6">
              <div 
                className="relative mx-auto" 
                style={{ 
                  width: image.width || '100%',
                  height: image.height || 'auto',
                  aspectRatio: '16/9'
                }}
              >
                <Image
                  src={image.src}
                  alt={image.caption}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 768px"
                />
              </div>
              <figcaption className="text-center text-sm text-gray-600 mt-2">
                {image.caption}
              </figcaption>
            </figure>
          );
        });
      }
    });

    // Add any remaining inline images at the end
    const inlineImages = images?.filter(img => !img.placement || img.placement === 'inline');
    if (inlineImages?.length) {
      result.push(
        <div className="mt-6 space-y-6">
          {inlineImages.map((image, index) => (
            <figure key={`figure-${index}`} className="my-6">
              <div 
                className="relative mx-auto" 
                style={{ 
                  width: image.width || '100%',
                  height: image.height || 'auto',
                  aspectRatio: '16/9'
                }}
              >
                <Image
                  src={image.src}
                  alt={image.caption}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 768px"
                />
              </div>
              <figcaption className="text-center text-sm text-gray-600 mt-2">
                {image.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      );
    }

    return result;
  };

  return (
    <div className="mb-16 border-b border-gray-100 pb-12" id={id}>
      <div className="flex items-baseline mb-6">
        <div className="flex items-center text-xl md:text-2xl font-black">
          {lessonIDS.map((lessonID) => (
            <span 
              key={lessonID} 
              className="text-gray-900"
            >
              {lessonID}
            </span>
          ))}
          <span className="text-gray-900 mx-2">—</span>
          <h2 className="text-blue-500">{title}</h2>
          <button
            onClick={handleSectionQuiz}
            className="ml-3 bg-blue-500 text-white p-2.5 rounded-full shadow-lg hover:bg-blue-600 transition-all duration-200 flex items-center gap-2 hover:scale-110"
            title="Generate quiz for this section"
          >
            <Brain className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="text-gray-700">
        {renderContent(children, images || [])}
      </div>
    </div>
  );
};

export default function QuizMeTester() {
  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectionCoords, setSelectionCoords] = useState<{ x: number; y: number } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [activeSection, setActiveSection] = useState<{ id: string; lessonID: string; title: string } | null>(null);
  const subject = 'macro'; // We can make this dynamic later

  // --- Notion State ---
  const [recordMap, setRecordMap] = useState<ExtendedRecordMap | null>(null);
  const [isNotionLoading, setIsNotionLoading] = useState(true);
  const [notionError, setNotionError] = useState<string | null>(null);
  // --- End Notion State ---

  // --- Fetch Notion Data ---
  useEffect(() => {
    const fetchNotionPage = async () => {
      // **** Replace with your actual Notion Page ID ****
      const pageId = '1d1978a4ef8380a3b5bad3b781cdfd94'; 
      
      if (!pageId) {
          setNotionError("Please set your Notion Page ID in the code.");
          setIsNotionLoading(false);
          console.error("Error: Notion Page ID not set.");
          return;
      }

      setIsNotionLoading(true);
      setNotionError(null);
      
      try {
        // Use a simple fetch to an API route that encapsulates notion-client logic
        // This is generally safer than exposing NotionAPI directly on the client
        const response = await fetch(`/api/get-notion-page?pageId=${pageId}`);
        
        // Get the raw text first
        const rawResponseText = await response.text();
        console.log("Raw API Response Text:", rawResponseText); 
        console.log("Response Status:", response.status);
        console.log("Response OK?:", response.ok);

        // Now, try to parse *only if* the response was okay
        if (!response.ok) {
          // Use the raw text in the error if possible
          throw new Error(`Error fetching Notion page: ${response.statusText} - ${rawResponseText.substring(0, 100)}`); 
        }
        
        // Attempt to parse the raw text
        const data = JSON.parse(rawResponseText); 
        setRecordMap(data);
        
      } catch (err: any) {
        console.error("Error fetching/parsing Notion page:", err);
        // The error might already include the raw text if parsing failed above
        setNotionError(err.message || 'Failed to load or parse Notion content.'); 
      } finally {
        setIsNotionLoading(false);
      }
    };

    fetchNotionPage();
  }, []); // Empty dependency array ensures this runs once on mount
  // --- End Fetch Notion Data ---

  const handleAnswerSelect = (questionId: string, answerIndex: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  // Handle text selection
  const handleTextSelection = () => {
    const selection = window.getSelection();
    
    if (selection && selection.toString().trim().length > 0) {
      // Get the coordinates of the selection
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      
      // Position the icon just to the right of the selection
      setSelectionCoords({
        x: rect.right + window.scrollX,
        y: rect.top + window.scrollY - 10 // Offset slightly above the selection
      });
    } else {
      setSelectionCoords(null);
    }
  };

  // Add and remove event listeners
  useEffect(() => {
    document.addEventListener('mouseup', handleTextSelection);
    document.addEventListener('keyup', handleTextSelection);
    
    return () => {
      document.removeEventListener('mouseup', handleTextSelection);
      document.removeEventListener('keyup', handleTextSelection);
    };
  }, []);

  const handleGenerateQuiz = async () => {
    const selection = window.getSelection();
    if (selection) {
      const selectedText = selection.toString().trim();
      if (!selectedText) return; // Don't generate if selection is empty

      setIsLoading(true); // Use general loading for quiz generation
      setShowQuiz(true);
      setSelectionCoords(null);
      selection.removeAllRanges();
      setActiveSection(null); // Reset active section when generating from selection

      try {
        const response = await fetch('/api/generate-quiz', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            subject,
            content: selectedText,
          }),
        });

        if (!response.ok) throw new Error('Failed to generate quiz');

        const data = await response.json();
        setQuestions(data.questions);
        setSelectedAnswers({});
        setIsSubmitted(false);
      } catch (error) {
        console.error('Error generating quiz:', error);
        // Optionally show an error message to the user in the quiz modal
        setQuestions([]); // Clear questions on error
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Add this effect to handle body scroll locking
  useEffect(() => {
    if (showQuiz) {
      // Lock scrolling when modal opens
      document.body.style.overflow = 'hidden';
    } else {
      // Re-enable scrolling when modal closes
      document.body.style.overflow = 'unset';
    }

    // Cleanup when component unmounts
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showQuiz]);

  return (
    <div className="min-h-screen bg-white" style={{ marginLeft: 'calc(-50vw + 50%)', marginRight: 'calc(-50vw + 50%)' }}>
      <div className="max-w-3xl mx-auto px-4 py-12">

        {/* --- Add the H1 Title Here --- */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-8 pb-2 border-b border-gray-200">
          AP Macroeconomics Unit 1 – <span className="text-blue-600">Basic Economic Concepts</span>
          </h1>
        {/* --- End H1 Title --- */}

        {/* --- Render Notion Content --- */}
        {isNotionLoading && (
           <div className="text-center py-10">Loading Notion Content...</div>
        )}
        {notionError && (
           <div className="text-center py-10 text-red-500">Error: {notionError}</div>
        )}
        {recordMap && (
          <NotionRenderer 
             recordMap={recordMap} 
             fullPage={true} // Assuming your Notion page content starts *after* the title
             darkMode={false} 
             // Add other NotionRenderer props as needed
          />
        )}
        {/* --- End Render Notion Content --- */}

        {/* --- Keep or remove existing CheatSheetSections --- */}
        {/* <div className="space-y-16"> */}
          {/* 
             If you want to keep the old sections *in addition* to Notion, 
             render them here. Otherwise, remove this part.
          */}
          {/* <CheatSheetSection id="scarcity" ... /> */}
          {/* <CheatSheetSection id="opportunity-cost-ppc" ... /> */}
          {/* ... other sections ... */}
        {/* </div> */}
        {/* --- End existing sections --- */}

      </div>

      {/* Floating Quiz Icon */}
      {selectionCoords && (
        <button
          onClick={handleGenerateQuiz}
          style={{
            position: 'absolute',
            left: `${selectionCoords.x}px`,
            top: `${selectionCoords.y}px`,
            transform: 'translate(-50%, -100%)',
          }}
          className="fixed z-50 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition-all duration-200 animate-fade-in flex items-center gap-2 hover:scale-110" // Added fixed and z-index
        >
          <Brain className="w-5 h-5" />
        </button>
      )}

      {/* Quiz Modal (keep as is) */}
      {showQuiz && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
          <div 
            className="relative bg-white rounded-xl overflow-hidden w-full max-w-xl max-h-[80vh] flex flex-col shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-white p-6 border-b z-20">
              <button
                onClick={() => {
                  setShowQuiz(false);
                  setActiveSection(null);
                }}
                className="absolute top-6 right-6 text-gray-900 hover:text-gray-600 transition-colors"
              >
                <X className="w-7 h-7" />
              </button>
              
              <div>
                <div className="flex items-center gap-4 mb-1">
                  <Image 
                    src={dojoIcon}
                    alt="Dojo Icon"
                    width={32}
                    height={32}
                    className="object-contain"
                  />
                  <h3 className="font-extrabold text-2xl">
                    AP <span className="text-blue-500">Dojo</span>
                  </h3>
                </div>
                <h4 className="font-bold text-xl">
                  {activeSection ? (
                    <>Generated Quiz - {activeSection.lessonID} - {activeSection.title}</>
                  ) : (
                    'Generated Quiz'
                  )}
                </h4>
              </div>
            </div>

            {/* Questions - Now in a scrollable container */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-6">
                {isLoading ? ( // Using general isLoading for quiz generation
                  <div className="flex flex-col items-center justify-center py-12">
                    <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                    <p className="mt-4 text-gray-600 font-medium">Generating your quiz...</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {questions.map((question) => (
                      <div 
                        key={question.id}
                        className="p-5 rounded-lg border bg-white shadow-sm hover:shadow-md transition-shadow"
                      >
                        <p className="text-base font-semibold mb-4 text-gray-900">{question.text}</p>

                        <div className="space-y-2.5">
                          {question.options.map((option, index) => (
                            <button
                              key={index}
                              onClick={() => handleAnswerSelect(question.id, index)}
                              disabled={isSubmitted}
                              className={`w-full text-left p-3.5 rounded-md text-sm font-medium transition-all duration-200 border ${
                                isSubmitted
                                  ? index === question.correctAnswer
                                    ? 'bg-blue-50 text-gray-900 shadow-sm border-blue-200' // Correct answer style
                                    : index === selectedAnswers[question.id]
                                      ? 'bg-red-50 text-gray-900 shadow-sm border-red-200' // Incorrect selected answer style
                                      : 'bg-gray-50 text-gray-900 border-transparent' // Other options style
                                  : selectedAnswers[question.id] === index
                                    ? 'bg-blue-50 text-gray-900 border-blue-200 shadow-sm' // Selected answer style
                                    : 'bg-gray-50 hover:bg-gray-100 hover:shadow-sm border-transparent' // Default button style
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <span className="flex-1 min-w-0 break-words pr-2">{option}</span>
                                <div className="flex-shrink-0">
                                  {isSubmitted && (
                                    index === question.correctAnswer 
                                      ? <Check className="w-5 h-5 text-blue-500" /> 
                                      : index === selectedAnswers[question.id] 
                                        ? <X className="w-5 h-5 text-red-500" /> // Show X for incorrect selected
                                        : null
                                  )}
                                </div>
                              </div>
                            </button>
                          ))}
                        </div>
                        {/* Optional: Add feedback display here if your API provides it */}
                      </div>
                    ))}
                    {questions.length === 0 && !isLoading && (
                       <div className="text-center py-10 text-gray-500">No quiz questions generated.</div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button - Now sticky at the bottom */}
            <div className="sticky bottom-0 bg-white border-t p-6 z-20">
              <button
                onClick={handleSubmit}
                disabled={isLoading || isSubmitted || Object.keys(selectedAnswers).length !== questions.length || questions.length === 0}
                className={`w-full py-2.5 rounded font-medium text-sm transition-colors
                  ${isSubmitted
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : (Object.keys(selectedAnswers).length === questions.length && questions.length > 0 && !isLoading)
                      ? 'bg-blue-500 text-white hover:bg-blue-600'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
              >
                {isSubmitted ? 'Submitted' : 'Submit'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


// Ensure necessary CSS is included for react-notion-x
// You might need to import these in your global CSS file or layout component:
// import 'react-notion-x/src/styles.css' // core styles
// import 'prismjs/themes/prism-tomorrow.css' // syntax highlighting
// import 'katex/dist/katex.min.css' // Used for math equations

// You'll also need an API route to fetch the Notion data securely

// --- Example API Route (e.g., src/app/api/get-notion-page/route.ts) ---
/*
import { NextResponse } from 'next/server';
import { NotionAPI } from 'notion-client';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const pageId = searchParams.get('pageId');

  if (!pageId) {
    return NextResponse.json({ error: 'Missing pageId parameter' }, { status: 400 });
  }

  try {
    const notion = new NotionAPI({
      // Optional: Provide authToken if you need to access private pages
      // authToken: process.env.NOTION_TOKEN_V2, 
      // activeUser: process.env.NOTION_ACTIVE_USER 
    });
    const recordMap = await notion.getPage(pageId);
    return NextResponse.json(recordMap);
  } catch (error: any) {
    console.error(`Error fetching Notion page ${pageId}:`, error);
    return NextResponse.json(
      { error: `Failed to fetch Notion page: ${error.message || 'Unknown error'}` },
      { status: 500 }
    );
  }
}
*/
