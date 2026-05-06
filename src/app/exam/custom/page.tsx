'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { allQuestions } from '@/data/unitPracticeProblems/unitPracticeProblems';
import { Question, QuestionBank } from '@/data/questionBanks/types';
import { FullExam } from '@/components/FullExam';
import { AlertCircle, Home, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

function CustomExamContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [questionBank, setQuestionBank] = useState<QuestionBank | null>(null);
  const [examType, setExamType] = useState<'macro' | 'micro' | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const encodedParam = searchParams.get('q');
      
      if (!encodedParam) {
        setError('No questions parameter found in URL.');
        setIsLoading(false);
        return;
      }

      // Decode Base64
      let decodedString: string;
      try {
        decodedString = atob(encodedParam);
      } catch (e) {
        setError('Invalid link format. The encoded parameter is corrupted.');
        setIsLoading(false);
        return;
      }

      // Split into array of IDs
      const ids = decodedString.split(',').map(id => parseInt(id.trim())).filter(id => !isNaN(id));

      if (ids.length === 0) {
        setError('No valid question IDs found in the link.');
        setIsLoading(false);
        return;
      }

      // Create a Map to store questions by ID (ensures uniqueness and fast lookup)
      const questionsMap = new Map<number, Question>();
      allQuestions.forEach(q => {
        if (!questionsMap.has(q.id)) {
          questionsMap.set(q.id, q);
        }
      });

      // Filter questions in the order of IDs from the link, ensuring uniqueness
      const filteredQuestions: Question[] = [];
      const foundIds = new Set<number>();
      
      for (const id of ids) {
        if (!foundIds.has(id)) {
          const question = questionsMap.get(id);
          if (question) {
            filteredQuestions.push(question);
            foundIds.add(id);
          }
        }
      }

      if (filteredQuestions.length === 0) {
        setError('No questions found matching the provided IDs.');
        setIsLoading(false);
        return;
      }

      // Determine exam type from questions (use the first question's subject)
      const firstQuestion = filteredQuestions[0];
      const determinedExamType: 'macro' | 'micro' = firstQuestion.subject === 'ap_macroeconomics' ? 'macro' : 'micro';

      // Create QuestionBank
      const bank: QuestionBank = {
        name: 'Dojo Challenge',
        questions: filteredQuestions
      };

      setQuestionBank(bank);
      setExamType(determinedExamType);
      setError(null);
    } catch (e) {
      setError('An unexpected error occurred while processing the assignment link.');
      console.error('Error processing custom exam:', e);
    } finally {
      setIsLoading(false);
    }
  }, [searchParams]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-lg font-semibold text-gray-700">Loading assignment...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full bg-white border-4 border-red-600 rounded-lg shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 text-center"
        >
          <AlertCircle className="w-16 h-16 text-red-600 mx-auto mb-4" />
          <h2 className="text-2xl font-black text-black mb-4">Corrupted Link</h2>
          <p className="text-gray-700 font-semibold mb-6">{error}</p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-black rounded-lg border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-blue-700 active:translate-y-1 transition-all"
          >
            <Home className="w-5 h-5" />
            Go Home
          </Link>
        </motion.div>
      </div>
    );
  }

  if (!questionBank || !examType) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg font-semibold text-gray-700">Unable to load assignment.</p>
        </div>
      </div>
    );
  }

  // Get the encoded parameter and preview mode to pass to FullExam
  const encodedParam = searchParams.get('q');
  const isPreviewMode = searchParams.get('preview') === '1' || searchParams.get('preview') === 'true';

  return (
    <FullExam
      questionBank={questionBank}
      examType={examType}
      questionType="mcq"
      examNumber="custom"
      isCustomAssignment={true}
      isUnitTest={true}
      assignmentLinkId={encodedParam || undefined}
      isPreviewMode={isPreviewMode}
    />
  );
}

export default function CustomExamPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
            <p className="text-lg font-semibold text-gray-700">Loading...</p>
          </div>
        </div>
      }
    >
      <CustomExamContent />
    </Suspense>
  );
}

