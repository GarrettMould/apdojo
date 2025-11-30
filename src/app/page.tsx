'use client';

import { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Loader2, Play, X, ArrowRight, FileText } from 'lucide-react';
import { useAuthContext } from '@/contexts/AuthContext';
import { topicBundles, TopicBundle } from '@/data/topicBundles';
import { useRouter } from 'next/navigation';
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
  const { setSelectedSubject } = useAuthContext();

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
              <span className="text-blue-500">Pick a Topic.</span> Any Topic.
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Master <strong>AP Macroeconomics</strong> and <strong>AP Microeconomics</strong> with study resources designed to help you achieve top scores on your AP exams.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* FRQ Practice Card - First in grid */}
            {/* <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 text-center flex flex-col transition-shadow hover:shadow-2xl h-full">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">FRQ Practice</h3>
              
              <div className="relative mb-6 cursor-pointer group rounded-lg overflow-hidden shadow-inner bg-gray-50 aspect-video flex items-center justify-center">
                <div className="text-center p-6">
                  <FileText className="w-16 h-16 text-gray-400 mx-auto mb-3" />
                  <p className="text-sm text-gray-600 font-medium">Free Response Questions</p>
                </div>
              </div>

              <div className="flex flex-col gap-3 mt-auto">
                <Link href="/unitFRQpracticePage" passHref>
                  <Button 
                    className="w-full font-semibold py-3 text-base rounded-lg text-white bg-blue-600 hover:bg-blue-700"
                  >
                    Practice FRQ
                  </Button>
                </Link>
              </div>
            </div> */}
            
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
  
  return <LoggedOutHomePage />;
}
