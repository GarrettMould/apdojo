'use client';

import { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Loader2, Play, X, ArrowRight, FileText, Pencil, Sparkles, PlayCircle, Star } from 'lucide-react';
import { useAuthContext } from '@/contexts/AuthContext';
import { topicBundles, TopicBundle } from '@/data/topicBundles';
import { useRouter } from 'next/navigation';
import { frqExams } from '@/data/frqQuestions';
import { SeasonPassHome } from '@/components/seasonPassHome';
// import { ReviewsSection } from '@/components/ReviewsSection';
// import { UniversityLogos } from '@/components/UniversityLogos';

// Reverted TopicCard to original design, with only the link href corrected
function TopicCard({ bundle }: { bundle: TopicBundle }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 text-center flex flex-col transition-shadow hover:shadow-2xl h-full">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">{bundle.title}</h3>
      
      {bundle.thumbnailUrl && (
        <Link href={`/videos/macro/${bundle.videoSlug}`} className="relative mb-6 cursor-pointer group rounded-lg overflow-hidden shadow-inner bg-gray-50 aspect-video block">
          <Image 
            src={bundle.thumbnailUrl} 
            alt={`Video thumbnail for ${bundle.title}`}
            layout="fill"
            objectFit="cover"
            className="transform group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/20 transition-colors duration-300">
            <div className="bg-black/50 w-14 h-14 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
              <Play className="w-7 h-7 text-white fill-white ml-1" />
            </div>
          </div>
        </Link>
      )}

      <div className="flex flex-col gap-3 mt-auto">
        <Link href={`/unitMCQPracticePage?subject=macro&mode=topic&lessonId=${bundle.lessonId}`} passHref>
          <Button 
            className="w-full font-semibold py-3 text-base rounded-lg text-white bg-blue-600 hover:bg-blue-700"
          >
            Practice MCQs
          </Button>
        </Link>
        <Link href={`/unit/${bundle.unit}`} passHref>
          <Button 
            className="w-full text-gray-700 font-semibold py-3 text-base rounded-lg" 
            variant="outline"
          >
            Cheat Sheet
          </Button>
        </Link>
      </div>
    </div>
  );
}


// Homepage for logged-out users - NOW CLEANED UP
function LoggedOutHomePage() {
  const [showMicroBanner, setShowMicroBanner] = useState(false);
  const router = useRouter();
  const { user, setShowLoginModal, setSelectedSubject, setRedirectOnLogin, selectedSubject } = useAuthContext();

  const handlePracticeFrqClick = () => {
    // For macro: Ample Reserves FRQ (id: 1)
    // For micro: Factor Markets FRQ (id: 2) - has video explanations
    const frqId = selectedSubject === 'macro' ? 1 : 2;
    const frqUrl = `/unitFRQpracticePage?frqId=${frqId}`;
    
    if (user) {
      router.push(frqUrl);
    } else {
      setRedirectOnLogin(frqUrl);
      setShowLoginModal(true);
    }
  };

  const thumbnailUrl = selectedSubject === 'micro' 
    ? '/images/frqPracticePage/U5FRQMicro.jpg' 
    : '/images/frqPracticePage/unit4MacroFRQCover.jpg';

  // Check localStorage on mount to see if banner was dismissed
  useEffect(() => {
    const dismissed = localStorage.getItem('microBannerDismissed');
    if (!dismissed) {
      setShowMicroBanner(true);
      
      // Auto-dismiss after 30 seconds
      const timer = setTimeout(() => {
        setShowMicroBanner(false);
        localStorage.setItem('microBannerDismissed', 'true');
      }, 30000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismissBanner = () => {
    setShowMicroBanner(false);
    localStorage.setItem('microBannerDismissed', 'true');
  };

  const handleBannerClick = () => {
    setSelectedSubject('micro');
    router.push('/unit/1');
  };

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      {/* AP Micro Banner */}
      {showMicroBanner && (
        <div 
          className="fixed top-16 left-0 right-0 z-40 shadow-lg transition-all duration-500 ease-out bg-gradient-to-r from-green-500 to-green-600"
        >
        <div className="max-w-7xl mx-auto px-4 py-2">
          <div className="flex items-center justify-center gap-4">
            <p className="text-xs md:text-sm font-medium text-white">
              AP Micro unit cheat sheets and MCQ practice problems now available! <span className="text-base md:text-lg">🎯</span>
            </p>
            <button
              onClick={handleBannerClick}
              className="px-3 py-1.5 text-sm font-medium text-white bg-white/10 border border-white/30 rounded-md hover:bg-white/20 whitespace-nowrap transition-colors flex items-center gap-2"
            >
              View Cheat Sheets
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={handleDismissBanner}
              className="ml-2 p-1 hover:bg-white/20 rounded-full transition-colors"
              aria-label="Dismiss banner"
            >
              <X className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      </div>
      )}
      {/* Topic Bundles Section */}
      <div className={`py-16 sm:py-24 bg-white ${showMicroBanner ? 'pt-24 sm:pt-28' : ''}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-5xl sm:text-6xl font-extrabold text-gray-900 mb-6">
              Become an FRQ Expert in the <span className={selectedSubject === 'micro' ? 'text-green-500' : 'text-blue-500'}>FRQ Dojo</span>
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Practice smarter with real AP-style questions, step-by-step feedback, and targeted skill-building.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left Column: FRQ Dojo Card */}
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 text-center flex flex-col transition-shadow hover:shadow-2xl h-full">
              <div className="relative mb-6 cursor-pointer group rounded-lg overflow-hidden shadow-inner bg-gray-50 aspect-video flex items-center justify-center">
                <Image
                  src={thumbnailUrl}
                  alt="FRQ Practice Placeholder"
                  layout="fill"
                  objectFit="cover"
                  className="transform group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="flex flex-col gap-3 mt-auto">
                <Button 
                  onClick={handlePracticeFrqClick}
                  className={`w-full font-semibold py-6 text-lg rounded-md text-white ${selectedSubject === 'micro' ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'}`}
                >
                  Try Now for Free
                </Button>
              </div>
            </div>

            {/* Right Column: Features & Review Card */}
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 h-full flex flex-col justify-center">
              <div className="space-y-8">
                <h3 className="text-3xl font-extrabold text-gray-900">
                  With <span className={selectedSubject === 'micro' ? 'text-green-500' : 'text-blue-500'}>FRQ Dojo</span> you can...
                </h3>
                
                {/* Features List */}
                <ul className="space-y-6">
                  <li className="flex items-center text-xl font-semibold text-gray-800">
                    <Pencil className={`w-7 h-7 ${selectedSubject === 'micro' ? 'text-green-500' : 'text-blue-500'} mr-4 flex-shrink-0`} />
                    <span>Draw Graphs</span>
                  </li>
                  <li className="flex items-center text-xl font-semibold text-gray-800">
                    <Sparkles className={`w-7 h-7 ${selectedSubject === 'micro' ? 'text-green-500' : 'text-blue-500'} mr-4 flex-shrink-0`} />
                    <span>Get Instant Feedback</span>
                  </li>
                  <li className="flex items-center text-xl font-semibold text-gray-800">
                    <PlayCircle className={`w-7 h-7 ${selectedSubject === 'micro' ? 'text-green-500' : 'text-blue-500'} mr-4 flex-shrink-0`} />
                    <span>Watch Video Walkthroughs</span>
                  </li>
                </ul>

                {/* Divider */}
                <div className="border-t border-gray-200" />

                {/* Student Review */}
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="font-semibold text-gray-900 text-sm">- Alex P.</p>
                  </div>
                  <p className="text-gray-700 italic">
                    "FRQ Dojo helped me learn the FRQs that I struggled with, with short videos and detailed feedback for my graphs."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Other Topics Section */}
      <div className="py-16 sm:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-extrabold text-gray-900">Explore Other Topics</h2>
            <p className="mt-4 text-lg text-gray-600">
              Practice MCQs and review cheat sheets for a variety of AP Macro topics.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {topicBundles.map((bundle) => (
              <TopicCard key={bundle.lessonId} bundle={bundle} />
            ))}
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      {/* <ReviewsSection /> */}

      {/* University Logos Section */}
      {/* <UniversityLogos /> */}
    </div>
  );
}

function HomePageLoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
    </div>
  );
}

export default function Home() {
  const { user, loading } = useAuthContext();

  if (loading) {
    return <HomePageLoadingFallback />;
  }
  
  return <SeasonPassHome />;
}