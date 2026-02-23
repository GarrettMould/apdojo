'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Play, Clock, BookOpen, Users, BarChart3, Printer, Loader2, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { getPublicAssignmentTemplates, type PublicAssignmentTemplate } from '@/lib/assignments';
import { useAuthContext } from '@/contexts/AuthContext';
import { TeacherSignupModal } from '@/components/TeacherSignupModal';

function TeachersPageContent() {
  const { user, userData, loadingUserData } = useAuthContext();
  const router = useRouter();
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [publicTemplates, setPublicTemplates] = useState<PublicAssignmentTemplate[]>([]);
  const [loadingTemplates, setLoadingTemplates] = useState(false);
  const [templatesPage, setTemplatesPage] = useState(0);
  const [templateModalTemplate, setTemplateModalTemplate] = useState<PublicAssignmentTemplate | null>(null);

  const isTeacher = user && userData?.teacher === true;

  // Redirect logged-in teachers to tutor builder
  useEffect(() => {
    if (!loadingUserData && isTeacher) {
      router.replace('/tutor/builder');
    }
  }, [loadingUserData, isTeacher, router]);

  useEffect(() => {
    setLoadingTemplates(true);
    getPublicAssignmentTemplates()
      .then(setPublicTemplates)
      .catch(() => setPublicTemplates([]))
      .finally(() => setLoadingTemplates(false));
  }, []);

  const handleActionClick = () => {
    setShowSignupModal(true);
  };

  if (loadingUserData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <Loader2 className="w-10 h-10 animate-spin text-indigo-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Student Results link - triggers modal */}
      <div className="w-full flex justify-end px-6 pt-6 pb-4">
        <button
          type="button"
          onClick={handleActionClick}
          className="flex items-center gap-2 text-indigo-700 font-bold hover:text-indigo-800 transition-colors"
        >
          <BarChart3 className="w-5 h-5" />
          Student Results
        </button>
      </div>

      <div className="max-w-6xl mx-auto px-6">
        <section className="py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">
              Create Your Assignment
            </h1>
            <p className="text-xl text-slate-600 font-semibold max-w-2xl mx-auto">
              Choose how you want to deliver your assignment—live in class, link for homework, or a printable PDF
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
            <button
              type="button"
              onClick={handleActionClick}
              className="group relative flex flex-col p-8 bg-white rounded-3xl shadow-xl hover:shadow-2xl border-2 border-green-600 transition-all transform hover:-translate-y-1"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-2xl bg-green-600 flex items-center justify-center shadow-lg">
                  <Play className="w-8 h-8 text-white" fill="white" />
                </div>
                <h2 className="text-2xl font-black text-slate-900 group-hover:text-green-600 transition-colors">
                  Live Session
                </h2>
              </div>
              <p className="text-base text-slate-700 font-semibold mb-4 leading-relaxed">
                Launch a real-time session for synchronous class activities. Perfect for bell-ringers, warm-ups, and interactive lessons.
              </p>
              <div className="flex items-center gap-2 text-sm font-bold text-green-600 mt-auto">
                <Users className="w-4 h-4" />
                <span>Real-time participation</span>
              </div>
            </button>

            <button
              type="button"
              onClick={handleActionClick}
              className="group relative flex flex-col p-8 bg-white rounded-3xl shadow-xl hover:shadow-2xl border-2 border-blue-600 transition-all transform hover:-translate-y-1"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg">
                  <Clock className="w-8 h-8 text-white" fill="white" />
                </div>
                <h2 className="text-2xl font-black text-slate-900 group-hover:text-blue-600 transition-colors">
                  Homework
                </h2>
              </div>
              <p className="text-base text-slate-700 font-semibold mb-4 leading-relaxed">
                Generate a shareable link for asynchronous assignments. Students complete at their own pace, anytime, anywhere.
              </p>
              <div className="flex items-center gap-2 text-sm font-bold text-blue-600 mt-auto">
                <BookOpen className="w-4 h-4" />
                <span>Self-paced learning</span>
              </div>
            </button>

            <button
              type="button"
              onClick={handleActionClick}
              className="group relative flex flex-col p-8 bg-white rounded-3xl shadow-xl hover:shadow-2xl border-2 border-amber-600 transition-all transform hover:-translate-y-1"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-2xl bg-amber-600 flex items-center justify-center shadow-lg">
                  <Printer className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-black text-slate-900 group-hover:text-amber-600 transition-colors">
                  Print Homework
                </h2>
              </div>
              <p className="text-base text-slate-700 font-semibold mb-4 leading-relaxed">
                Build a PDF assignment from MCQs and FRQs. MCQs appear first, then free-response with space to write and draw.
              </p>
              <div className="flex items-center gap-2 text-sm font-bold text-amber-600 mt-auto">
                <Printer className="w-4 h-4" />
                <span>Save as PDF</span>
              </div>
            </button>
          </div>
        </section>

        <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-indigo-700 mb-8 md:mb-10 text-center">
          Short on time? Grab a pre-made drill:
        </h2>

        {loadingTemplates ? (
          <div className="flex justify-center py-16 gap-4 w-full">
            <Loader2 className="w-10 h-10 animate-spin text-indigo-600" />
            <span className="font-semibold text-slate-600 text-lg">Loading...</span>
          </div>
        ) : (() => {
          const mcqAndGraphGymTemplates = publicTemplates.filter(
            (t) => t.assignmentType === 'mcq' || t.assignmentType === 'graphGym'
          );
          if (mcqAndGraphGymTemplates.length === 0) {
            return (
              <div className="py-16 text-center text-slate-600 font-semibold text-lg w-full mb-20">
                No custom assignments yet.
              </div>
            );
          }
          const TEMPLATES_PER_PAGE = 3;
          const totalPages = Math.ceil(mcqAndGraphGymTemplates.length / TEMPLATES_PER_PAGE);
          const start = templatesPage * TEMPLATES_PER_PAGE;
          const visibleTemplates = mcqAndGraphGymTemplates.slice(start, start + TEMPLATES_PER_PAGE);
          return (
            <div className="w-full mb-20 space-y-4">
              {visibleTemplates.map((template) => {
                const title =
                  template.assignmentName ??
                  template.templateTitle ??
                  `${template.subject === 'ap_macroeconomics' ? 'Macro' : 'Micro'} – ${template.assignmentType === 'mcq' ? 'MCQ' : 'Graph Gym'}`;
                const topic = template.templateTopic ?? (template.subject === 'ap_macroeconomics' ? 'Macro' : 'Micro');
                return (
                  <button
                    key={template.id}
                    type="button"
                    onClick={() => setTemplateModalTemplate(template)}
                    className="w-full flex flex-row items-center justify-between text-left p-6 sm:p-8 bg-white border-2 border-slate-200 rounded-lg shadow-md hover:shadow-lg hover:border-indigo-300 transition-all min-h-[120px]"
                  >
                    <div className="min-w-0 flex-1 pr-4">
                      <span className="text-xl md:text-2xl font-bold text-indigo-700 leading-tight block mb-1 line-clamp-1">
                        {title}
                      </span>
                      <p className="text-base font-semibold text-indigo-700">
                        {topic} · {template.totalQuestions} question
                        {template.totalQuestions !== 1 ? 's' : ''}
                      </p>
                    </div>
                    <span className="flex-shrink-0 text-indigo-600 font-bold text-base whitespace-nowrap">
                      Use This →
                    </span>
                  </button>
                );
              })}
              {totalPages > 1 && (
                <div className="flex justify-center gap-4 pt-2">
                  <button
                    type="button"
                    onClick={() => setTemplatesPage((p) => Math.max(0, p - 1))}
                    disabled={templatesPage === 0}
                    className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-300 transition-all text-slate-700"
                    aria-label="Previous templates"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setTemplatesPage((p) => Math.min(totalPages - 1, p + 1))}
                    disabled={templatesPage >= totalPages - 1}
                    className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-300 transition-all text-slate-700"
                    aria-label="Next templates"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>
              )}
            </div>
          );
        })()}

        <div className="max-w-5xl mx-auto py-12 mb-12">
          <h2 className="text-4xl md:text-5xl font-black text-blue-500 text-center mb-12">
            How to use the Tutor Builder
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-3xl shadow-xl p-8 flex flex-col min-h-[280px]">
              <h3 className="text-xl font-bold text-emerald-600 mb-2 flex items-center gap-3">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full border-2 border-emerald-600 text-emerald-600 font-bold text-lg flex-shrink-0">
                  1
                </span>
                Choose your mode
              </h3>
              <p className="text-base font-bold text-black mb-4">Explore</p>
              <p className="text-base text-slate-600 flex-1 leading-relaxed">
                Pick <span className="font-bold text-emerald-600">live activities</span> or{' '}
                <span className="font-bold text-emerald-600">asynchronous assignments</span> to match how you want to
                run class—bell-ringers, homework, or both.
              </p>
            </div>
            <div className="bg-white rounded-3xl shadow-xl p-8 flex flex-col min-h-[280px]">
              <h3 className="text-xl font-bold text-blue-500 mb-2 flex items-center gap-3">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full border-2 border-blue-500 text-blue-500 font-bold text-lg flex-shrink-0">
                  2
                </span>
                Create and Share
              </h3>
              <p className="text-base font-bold text-black mb-4">Build</p>
              <p className="text-base text-slate-600 flex-1 leading-relaxed">
                Choose from our library of <span className="font-bold text-blue-500">MCQs</span>,{' '}
                <span className="font-bold text-blue-500">Graphing Exercises</span>, or interactive activities. Share a
                link or launch a live session.
              </p>
            </div>
            <div className="bg-white rounded-3xl shadow-xl p-8 flex flex-col min-h-[280px]">
              <h3 className="text-xl font-bold text-violet-600 mb-2 flex items-center gap-3">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full border-2 border-violet-600 text-violet-600 font-bold text-lg flex-shrink-0">
                  3
                </span>
                Track Results
              </h3>
              <p className="text-base font-bold text-black mb-4">Review</p>
              <p className="text-base text-slate-600 flex-1 leading-relaxed">
                See <span className="font-bold text-violet-600">detailed progress</span> for every student. Review scores,
                completion, and question-level data in one place.
              </p>
            </div>
          </div>
        </div>

        {/* Template modal: Live or Homework - both trigger signup modal */}
        {templateModalTemplate && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
            onClick={() => setTemplateModalTemplate(null)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="template-modal-title"
          >
            <div
              className="bg-slate-100 rounded-3xl shadow-2xl max-w-2xl w-full p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative mb-8">
                <h2 id="template-modal-title" className="text-2xl font-black text-black text-center">
                  How would you like to assign this?
                </h2>
                <button
                  type="button"
                  onClick={() => setTemplateModalTemplate(null)}
                  className="absolute top-1/2 right-0 -translate-y-1/2 p-2 rounded-full hover:bg-slate-200 text-slate-600 transition-colors"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <button
                  type="button"
                  onClick={() => {
                    setTemplateModalTemplate(null);
                    setShowSignupModal(true);
                  }}
                  className="group relative flex flex-col p-8 bg-white rounded-3xl shadow-xl hover:shadow-2xl border-2 border-green-600 transition-all transform hover:-translate-y-1"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-2xl bg-green-600 flex items-center justify-center shadow-lg">
                      <Play className="w-8 h-8 text-white" fill="white" />
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 group-hover:text-green-600 transition-colors">
                      Live Session
                    </h3>
                  </div>
                  <p className="text-base text-slate-700 font-semibold mb-4 leading-relaxed">
                    Launch a real-time session for synchronous class activities.
                  </p>
                  <div className="flex items-center gap-2 text-sm font-bold text-green-600 mt-auto">
                    <Users className="w-4 h-4" />
                    <span>Real-time participation</span>
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setTemplateModalTemplate(null);
                    setShowSignupModal(true);
                  }}
                  className="group relative flex flex-col p-8 bg-white rounded-3xl shadow-xl hover:shadow-2xl border-2 border-blue-600 transition-all transform hover:-translate-y-1"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg">
                      <Clock className="w-8 h-8 text-white" fill="white" />
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 group-hover:text-blue-600 transition-colors">
                      Homework
                    </h3>
                  </div>
                  <p className="text-base text-slate-700 font-semibold mb-4 leading-relaxed">
                    Generate a shareable link for asynchronous assignments.
                  </p>
                  <div className="flex items-center gap-2 text-sm font-bold text-blue-600 mt-auto">
                    <BookOpen className="w-4 h-4" />
                    <span>Self-paced learning</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <TeacherSignupModal isOpen={showSignupModal} onClose={() => setShowSignupModal(false)} />
    </div>
  );
}

export default function TeachersPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
          <Loader2 className="w-10 h-10 animate-spin text-indigo-600" />
        </div>
      }
    >
      <TeachersPageContent />
    </Suspense>
  );
}
