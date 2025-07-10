'use client';

import { useState, useRef, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { X, Check, ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { videos as allVideos, Video as VideoType } from '@/data/videos';
import { useAuthContext } from '@/contexts/AuthContext';
import { LoginModal, SignupModal, SelectPlanModal } from '@/components/AuthModals';
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

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showSelectPlanModal, setShowSelectPlanModal] = useState(false);

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
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Authentication Required</h1>
          <p className="text-gray-600 mb-6">Please log in or sign up to access this video.</p>
          <div className="flex gap-4 justify-center">
            <button 
              onClick={() => setShowLoginModal(true)}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Login
            </button>
            <button 
              onClick={() => setShowSignupModal(true)}
              className="px-6 py-2 bg-white text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    );
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

  const handleAuthSuccess = () => {
    setShowLoginModal(false);
    setShowSignupModal(false);
    setShowSelectPlanModal(false);
  };

  // Find related videos (same subject, different videos, limit to 3)
  const getRelatedVideos = () => {
    const currentSubject = subject === 'macro' ? 'AP Macroeconomics' : 'AP Microeconomics';
    return allVideos
      .filter(v => 
        v.videoSlug !== videoSlug && 
        v.subjects.includes(currentSubject)
      )
      .slice(0, 3);
  };

  const relatedVideos = getRelatedVideos();

  return (
    <>
      <LoginModal 
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        switchToSignup={() => { 
          setShowLoginModal(false); 
          setShowSignupModal(true); 
        }}
        onAuthSuccess={handleAuthSuccess}
      />
      <SignupModal 
        isOpen={showSignupModal}
        onClose={() => setShowSignupModal(false)}
        switchToLogin={() => { 
          setShowSignupModal(false); 
          setShowLoginModal(true); 
        }}
        onAuthSuccess={handleAuthSuccess}
      />
      <SelectPlanModal 
        isOpen={showSelectPlanModal}
        onClose={() => setShowSelectPlanModal(false)}
        switchToLogin={() => { 
          setShowSelectPlanModal(false); 
          setShowLoginModal(true); 
        }}
        switchToSignup={() => { 
          setShowSelectPlanModal(false); 
          setShowSignupModal(true); 
        }}
      />

      <div className="min-h-screen bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-4 h-fit">
          {/* Video Section */}
          <div className="lg:col-span-3">
            <div className="bg-black">
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
            <div className="mt-2 p-4 lg:p-6 border-r border-gray-200">
              <h1 className="text-2xl font-bold text-gray-800 mb-2">{video.title}</h1>
              <p className="text-gray-600 mb-4">Unit {video.unit} - {video.subjects.join(', ')}</p>
              {video.description && (
                <p className="text-gray-700 leading-relaxed">{video.description}</p>
              )}
            </div>

            {/* Related Videos */}
            {relatedVideos.length > 0 && (
              <div className="p-6 lg:p-8 border-r border-gray-200 border-t border-gray-200">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Related Videos</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {relatedVideos.map((relatedVideo) => (
                    <Link
                      key={relatedVideo.id}
                      href={`/videos/${subject}/${relatedVideo.videoSlug}`}
                      className="group block bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200 overflow-hidden"
                    >
                      <div className="aspect-video bg-gray-100 relative overflow-hidden">
                        {relatedVideo.thumbnail ? (
                          <img
                            src={relatedVideo.thumbnail}
                            alt={relatedVideo.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-200">
                            <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                              <svg className="w-6 h-6 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                              </svg>
                            </div>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center">
                          <div className="w-10 h-10 bg-white bg-opacity-90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            <svg className="w-5 h-5 text-gray-800" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                            </svg>
                          </div>
                        </div>
                      </div>
                      <div className="p-3">
                        <h3 className="font-semibold text-sm text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
                          {relatedVideo.title}
                        </h3>
                        <p className="text-xs text-gray-600 mt-1">Unit {relatedVideo.unit}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Questions Sidebar */}
          <div className="lg:col-span-1 border-l border-gray-200 bg-white flex flex-col h-fit">
            <div className="pt-6 pb-4 lg:pt-8 lg:pb-6 px-4 lg:px-6 border-b border-gray-200 bg-gray-50 flex-shrink-0">
              <h3 className="text-xl font-bold text-gray-800 mb-1">Comprehension Check</h3>
              <p className="text-sm text-gray-600">
                Test your understanding with these questions
              </p>
            </div>

            <div className="pt-0 pb-4 lg:pb-6 px-4 lg:px-6 overflow-y-auto">
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