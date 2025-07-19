'use client';

import { useState, useRef, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { X, Check, ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { videos as allVideos, Video as VideoType } from '@/data/videos';
import { useAuthContext } from '@/contexts/AuthContext';
import { AuthGate } from '@/components/AuthGate';
import dojoIcon from "../../../../../public/images/dojoIcon.png";
import { use } from 'react';

type Question = {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
  image?: string;
}

interface VideoPageProps {
  params: Promise<{
    subject: string;
    videoSlug: string;
  }>;
}

export default function VideoPage({ params }: VideoPageProps) {
  const { subject, videoSlug } = use(params);
  const router = useRouter();
  const { user } = useAuthContext();
  
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [submittedAnswers, setSubmittedAnswers] = useState<Record<string, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [expandedImage, setExpandedImage] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Find the video by slug
  const video = allVideos.find(v => v.videoSlug === videoSlug);
  
  // Debug logging
  console.log('Looking for video with slug:', videoSlug);
  console.log('Available slugs:', allVideos.map(v => v.videoSlug));
  console.log('Found video:', video);
  console.log('Subject:', subject);
  console.log('Video subjects:', video?.subjects);
  
  // If video not found or subject doesn't match, redirect
  if (!video || !video.subjects.includes(subject === 'macro' ? 'AP Macroeconomics' : 'AP Microeconomics')) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Video Not Found</h1>
          <p className="text-gray-600 mb-6">The video you're looking for doesn't exist or isn't available for this subject.</p>
          <Link 
            href={`/videos/${subject}`}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Video Library
          </Link>
        </div>
      </div>
    );
  }

  // Check if user is authenticated
  if (!user) {
    return <AuthGate />;
  }

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

  const handleImageClick = (imageUrl: string) => {
    setExpandedImage(imageUrl);
  };



  return (
    <>
      <div className="h-screen bg-white overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-4 h-full">
          {/* Video Section */}
          <div className="lg:col-span-3 flex flex-col h-full">
            <div className="bg-black flex-shrink-0">
              <video 
                ref={videoRef}
                controls 
                autoPlay 
                className="w-full aspect-video"
                playsInline
              >
                <source src={video.videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            
            {/* Video Info */}
            <div className="p-4 lg:p-6 border-r border-gray-200 flex-shrink-0">
              <h1 className="text-2xl font-bold text-gray-800 mb-2">{video.title}</h1>
              <p className="text-gray-600 mb-4">Unit {video.unit} - {video.subjects.join(', ')}</p>
              {video.description && (
                <p className="text-gray-700 leading-relaxed">{video.description}</p>
              )}
            </div>
          </div>

          {/* Questions Sidebar */}
          <div className="lg:col-span-1 border-l border-gray-200 bg-white flex flex-col h-full">
            <div className="pt-6 pb-4 lg:pt-8 lg:pb-6 px-4 lg:px-6 border-b border-gray-200 bg-gray-50 flex-shrink-0">
              <h3 className="text-xl font-bold text-gray-800 mb-1">Comprehension Check</h3>
              <p className="text-sm text-gray-600">
                Test your understanding with these questions
              </p>
            </div>

            <div className="flex-1 pt-0 pb-4 lg:pb-6 px-4 lg:px-6 overflow-y-auto">
              {video.questions && video.questions.length > 0 ? (
                <div className="space-y-0">
                  {video.questions.map((question, questionIndex) => (
                    <div 
                      key={question.id}
                      className={`${questionIndex === 0 ? 'p-3' : 'pt-4 pb-3 px-3'} border-b border-gray-200 -mx-4 lg:-mx-6 px-4 lg:px-6 ${questionIndex === video.questions.length - 1 ? 'border-b-0' : ''}`}
                    >
                      <p className={`text-base font-semibold ${questionIndex === 0 ? 'mb-2' : 'mb-3'} text-gray-900`}>
                        <span className="inline-flex w-6 h-6 bg-blue-100 text-blue-600 rounded-full text-sm font-bold items-center justify-center mr-3">
                          {questionIndex + 1}
                        </span>
                        {question.text}
                      </p>
                      
                      {question.image && (
                        <div 
                          onClick={() => handleImageClick(question.image!)}
                          className="cursor-pointer transition-transform hover:scale-[1.02] active:scale-[0.98] mb-4"
                        >
                          <img 
                            src={question.image} 
                            alt="Question diagram"
                            className="w-full rounded-md border border-gray-200"
                          />
                        </div>
                      )}

                      <div className="space-y-2">
                        {question.options.map((option, index) => (
                          <button
                            key={index}
                            onClick={() => handleAnswerSelect(question.id, index)}
                            disabled={isSubmitted}
                            className={`w-full text-left p-3 rounded-md text-sm font-medium transition-all duration-200 border ${
                              isSubmitted
                                ? index === question.correctAnswer
                                  ? 'bg-green-50 text-gray-900 shadow-sm border-green-200'
                                  : index === selectedAnswers[question.id]
                                    ? 'bg-red-50 text-gray-900 shadow-sm border-red-200'
                                    : 'bg-gray-50 text-gray-900 border-transparent'
                                : selectedAnswers[question.id] === index
                                  ? 'bg-blue-50 text-gray-900 border-blue-200 shadow-sm'
                                  : 'bg-white hover:bg-gray-50 hover:shadow-sm border-gray-200'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <span className="w-6 h-6 flex items-center justify-center rounded-full bg-white border border-gray-200 text-gray-600 font-medium text-sm">
                                {String.fromCharCode(65 + index)}
                              </span>
                              <span className="flex-1 min-w-0 break-words pr-2">{option}</span>
                              <div className="flex-shrink-0">
                                {isSubmitted && (
                                  index === question.correctAnswer 
                                    ? <Check className="w-5 h-5 text-green-500" /> 
                                    : index === selectedAnswers[question.id] 
                                      ? <X className="w-5 h-5 text-red-500" />
                                      : null
                                )}
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                  
                  {/* Submit Button */}
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitted || Object.keys(selectedAnswers).length !== video.questions.length}
                    className={`w-full py-3 rounded-lg font-medium text-sm transition-colors
                      ${isSubmitted
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : Object.keys(selectedAnswers).length === video.questions.length
                          ? 'bg-blue-600 text-white hover:bg-blue-700'
                          : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      }`}
                  >
                    {isSubmitted ? 'Submitted' : 'Submit Answers'}
                  </button>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">No comprehension questions available for this video.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Image Expansion Modal */}
        {expandedImage && (
          <div 
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setExpandedImage(null)}
          >
            <button
              onClick={() => setExpandedImage(null)}
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
            >
              <X className="w-8 h-8" />
            </button>
            <div 
              className="relative max-w-[90vw] max-h-[90vh]"
              onClick={e => e.stopPropagation()}
            >
              <img
                src={expandedImage || ''}
                alt="Expanded diagram"
                className="w-full h-full object-contain rounded-lg"
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
} 