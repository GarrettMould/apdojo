'use client';

import { useState, useEffect, Suspense } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { QuizHistoryEntry, restoreTableData } from '@/lib/quizHistory';
import { Question } from '@/data/questionBanks/types';
import { Check, X, ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { StaticImageData } from 'next/image';

function QuizReviewContent() {
  const params = useParams();
  const router = useRouter();
  const [quizEntry, setQuizEntry] = useState<QuizHistoryEntry | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuizHistory = async () => {
      if (!params.id || typeof params.id !== 'string') {
        setError('Invalid quiz ID');
        setLoading(false);
        return;
      }

      try {
        const docRef = doc(db, 'userQuizHistory', params.id);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
          setError('Quiz not found');
          setLoading(false);
          return;
        }

        const data = docSnap.data();
        // Restore tableData format if present
        if (data.questions && Array.isArray(data.questions)) {
          data.questions = data.questions.map((q: any) => {
            if (q.tableData) {
              q.tableData = restoreTableData(q.tableData);
            }
            return q;
          });
        }
        setQuizEntry({
          id: docSnap.id,
          ...data,
        } as QuizHistoryEntry);
      } catch (err) {
        console.error('Error fetching quiz history:', err);
        setError('Failed to load quiz history');
      } finally {
        setLoading(false);
      }
    };

    fetchQuizHistory();
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-lg font-semibold text-gray-700">Loading quiz review...</p>
        </div>
      </div>
    );
  }

  if (error || !quizEntry) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white border-4 border-red-600 rounded-lg shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 text-center">
          <X className="w-16 h-16 text-red-600 mx-auto mb-4" />
          <h2 className="text-2xl font-black text-black mb-4">Error</h2>
          <p className="text-gray-700 font-semibold mb-6">{error || 'Quiz not found'}</p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-black rounded-lg border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-blue-700 active:translate-y-1 transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
            Go Back
          </Link>
        </div>
      </div>
    );
  }

  const formatDate = (timestamp: any) => {
    if (!timestamp) return 'Recently';
    if (timestamp.toDate) {
      return new Date(timestamp.toDate()).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    }
    return 'Recently';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Dashboard</span>
          </Link>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{quizEntry.title}</h1>
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-2">
                <span className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold text-lg">
                  Score: {quizEntry.score}%
                </span>
              </div>
              <div className="text-gray-700 font-medium">
                {quizEntry.correctCount} / {quizEntry.totalQuestions} correct
              </div>
              <div className="text-sm text-gray-500">
                Taken: {formatDate(quizEntry.timestamp)}
              </div>
            </div>
          </div>
        </div>

        {/* Questions Review */}
        <div className="space-y-8">
          {quizEntry.questions.map((question, index) => {
            // Try multiple key formats for compatibility
            const selectedAnswer =
              quizEntry.userAnswers[question.id.toString()] ||
              quizEntry.userAnswers[String(question.id)] ||
              quizEntry.userAnswers[question.id] ||
              null;
            const isCorrect = selectedAnswer === question.correctAnswer;

            return (
              <div
                key={question.id}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
              >
                {/* Question Header */}
                <div className="p-4 border-b border-gray-100">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-500">Question {index + 1}</span>
                    <span
                      className={`px-3 py-1 rounded-sm text-sm font-medium ${
                        isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {isCorrect ? 'Correct' : 'Incorrect'}
                    </span>
                  </div>
                  <p className="flex-1 text-base md:text-lg font-medium font-serif leading-relaxed text-gray-800">
                    {question.question}
                  </p>
                </div>

                {/* Question Image */}
                {question.image && (
                  <div className="p-4 border-b border-gray-100">
                    <div className="flex justify-center">
                      <img
                        src={
                          typeof question.image === 'string'
                            ? question.image
                            : (question.image as StaticImageData).src
                        }
                        alt="Question"
                        className="max-h-[300px] object-contain rounded-lg border border-gray-200"
                      />
                    </div>
                  </div>
                )}

                {/* Table Data */}
                {question.tableData && (
                  <div className="p-4 border-b border-gray-100">
                    <div className="flex justify-center">
                      <div className="flex items-center gap-4">
                        {question.tableData.playerNames && (
                          <div className="flex items-center justify-center h-full w-16">
                            <p className="transform -rotate-90 whitespace-nowrap text-center font-bold text-lg text-gray-900 leading-tight">
                              {question.tableData.playerNames.row.split(' ')[0]}
                              <br />
                              {question.tableData.playerNames.row.split(' ').slice(1).join(' ')}
                            </p>
                          </div>
                        )}
                        <div className="flex-1">
                          {question.tableData.playerNames && (
                            <p className="text-center font-bold text-lg text-gray-900 mb-2">
                              {question.tableData.playerNames.column}
                            </p>
                          )}
                          <table className="min-w-full border-collapse border border-black">
                            <thead className="bg-white">
                              <tr>
                                {question.tableData.headers.map((header) => (
                                  <th
                                    key={header}
                                    className="border border-black px-4 py-3 text-center text-base font-bold text-gray-900"
                                  >
                                    {header}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody className="bg-white">
                              {question.tableData.rows.map((row, rowIndex) => (
                                <tr key={rowIndex}>
                                  {row.map((cell, cellIndex) => {
                                    const isRowHeader =
                                      question.tableData?.rowHeaders && cellIndex === 0;
                                    return (
                                      <td
                                        key={cellIndex}
                                        className={`border border-black px-4 py-3 text-center text-base ${
                                          isRowHeader ? 'font-bold' : ''
                                        }`}
                                      >
                                        {cell}
                                      </td>
                                    );
                                  })}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Answer Options */}
                <div className="p-4 space-y-3">
                  {question.optionTableHeaders ? (
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr>
                            <th className="w-12 p-2"></th>
                            {question.optionTableHeaders.map((header, idx) => (
                              <th
                                key={idx}
                                className="px-4 py-3 text-center font-semibold text-sm text-gray-700 border-b-2 border-gray-300"
                              >
                                {header}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {question.options.map((option, idx) => {
                            const letter = String.fromCharCode(65 + idx);
                            const isSelected = selectedAnswer === letter;
                            const isCorrectAnswer = question.correctAnswer === letter;
                            const optionValues = option.split(' | ');

                            return (
                              <tr
                                key={idx}
                                className={`cursor-default transition-all duration-200 ${
                                  isCorrectAnswer
                                    ? 'bg-green-50'
                                    : isSelected && !isCorrectAnswer
                                    ? 'bg-red-50'
                                    : 'bg-white'
                                }`}
                              >
                                <td className="p-3">
                                  <div
                                    className={`w-8 h-8 flex items-center justify-center rounded-lg border-2 font-semibold text-sm ${
                                      isCorrectAnswer
                                        ? 'bg-green-600 border-green-600 text-white'
                                        : isSelected && !isCorrectAnswer
                                        ? 'bg-red-600 border-red-600 text-white'
                                        : 'bg-white border-gray-300 text-gray-600'
                                    }`}
                                  >
                                    {letter}
                                  </div>
                                </td>
                                {optionValues.map((value, valIdx) => (
                                  <td
                                    key={valIdx}
                                    className={`px-4 py-3 text-center text-sm border-b border-gray-200 ${
                                      isCorrectAnswer
                                        ? 'text-green-900'
                                        : isSelected && !isCorrectAnswer
                                        ? 'text-red-900'
                                        : 'text-gray-700'
                                    }`}
                                  >
                                    {value.trim()}
                                  </td>
                                ))}
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    question.options.map((option, idx) => {
                      const letter = String.fromCharCode(65 + idx);
                      const isSelected = selectedAnswer === letter;
                      const isCorrectAnswer = question.correctAnswer === letter;

                      return (
                        <div
                          key={idx}
                          className={`w-full text-left p-3 rounded-lg text-sm font-medium border flex items-center gap-3 cursor-default ${
                            isCorrectAnswer
                              ? 'bg-green-50 text-gray-900 shadow-sm border-green-200'
                              : isSelected && !isCorrectAnswer
                              ? 'bg-red-50 text-gray-900 shadow-sm border-red-200'
                              : 'bg-transparent text-gray-900 border-gray-200'
                          }`}
                        >
                          {/* Letter bubble */}
                          <span
                            className={`w-6 h-6 flex items-center justify-center rounded-full border text-xs font-medium flex-shrink-0 ${
                              isCorrectAnswer
                                ? 'bg-green-100 border-green-300 text-green-700'
                                : isSelected && !isCorrectAnswer
                                ? 'bg-red-100 border-red-300 text-red-700'
                                : 'bg-white border-gray-300 text-gray-500'
                            }`}
                          >
                            {letter}
                          </span>
                          {/* Option Text */}
                          <span className="flex-1 text-sm text-gray-800">{option}</span>
                          {/* Feedback Icon */}
                          {(isCorrectAnswer || (isSelected && !isCorrectAnswer)) && (
                            <div className="flex-shrink-0">
                              {isCorrectAnswer ? (
                                <Check className="w-5 h-5 text-green-500" />
                              ) : (
                                <X className="w-5 h-5 text-red-500" />
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })
                  )}
                </div>

                {/* Explanation */}
                {question.explanation && selectedAnswer && (
                  <div className="p-4 border-t border-gray-100">
                    <div className="mt-3 p-3 bg-blue-50 border-l-4 border-blue-400 rounded">
                      <p className="text-sm text-gray-800 leading-relaxed">
                        <strong>Explanation:</strong> {question.explanation}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function QuizHistoryReviewPage() {
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
      <QuizReviewContent />
    </Suspense>
  );
}

