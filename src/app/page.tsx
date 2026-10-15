'use client';

import { useAuthContext } from "@/contexts/AuthContext";
import { CourseProvider } from "@/contexts/CourseContext";
import { SeasonPassHome } from "@/components/seasonPassHome";
import dynamic from "next/dynamic";

function HomePageLoadingFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-gray-50 to-white">
      <div className="flex flex-col items-center gap-3 text-gray-600">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-gray-800" />
        <p className="text-sm font-medium">Loading your dashboard...</p>
      </div>
    </div>
  );
}

const TutorBuilderPage = dynamic(() => import("@/app/tutor/builder/page"), {
  loading: HomePageLoadingFallback,
});

const DojoDashboard = dynamic(
  () => import("@/components/DojoDashboard").then((m) => m.DojoDashboard),
  { loading: HomePageLoadingFallback }
);

function Home() {
  const { user, userData, loadingUserData } = useAuthContext();

  // Logged-out visitors (and the first paint, before Firebase answers) see the
  // marketing page immediately. Once a user is confirmed, wait for their
  // profile so teachers and students land on the right page.
  if (user && loadingUserData) {
    return <HomePageLoadingFallback />;
  }

  if (user && userData?.teacher === true) {
    return <TutorBuilderPage />;
  }

  if (user) {
    return (
      <CourseProvider>
        <DojoDashboard />
      </CourseProvider>
    );
  }

  return <SeasonPassHome />;
}

export default Home;
