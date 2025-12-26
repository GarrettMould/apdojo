'use client';

import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, X, FileText, Image as ImageIcon, Loader2, Check, Sparkles, CheckCircle2, XCircle, RefreshCw, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Question } from '@/data/questionBanks/types';
import { useAuthContext } from '@/contexts/AuthContext';
import { saveQuizResult } from '@/lib/quizHistory';

// --- TYPES ---
interface InfiniteDrillResult {
  conceptDetected: string;
  questions: Question[];
}

type LoadingStage = 'idle' | 'analyzing' | 'identifying' | 'generating' | 'complete';

function InfinitePracticePage() {
  const { user } = useAuthContext();
  const [inputMode, setInputMode] = useState<'image' | 'text'>('image');
  const [fileData, setFileData] = useState<{ file: File; preview: string; base64: string } | null>(null);
  const [textInput, setTextInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [loadingStage, setLoadingStage] = useState<LoadingStage>('idle');
  const [result, setResult] = useState<InfiniteDrillResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(new Set());
  const [loadingQuestionIndex, setLoadingQuestionIndex] = useState(0); // Track which question card to show during loading

  // Helper: Convert any file to Base64
  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleFileSelect = useCallback(async (file: File) => {
    const isImage = file.type.startsWith('image/');
    const isPDF = file.type === 'application/pdf';
    
    if (file && (isImage || isPDF)) {
      try {
        const base64 = await convertFileToBase64(file);
        
        // For preview: if it's an image, use the base64. If PDF, use a placeholder logic or the base64 (browser can't always display PDF base64 in img tag)
        const preview = isImage ? base64 : 'pdf-placeholder';
        
        setFileData({
          file,
          preview,
          base64
        });
        setError(null);
      } catch (err) {
        setError('Failed to process file');
      }
    } else {
      setError('Please select a valid image or PDF file');
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  }, [handleFileSelect]);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  }, []);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileSelect(file);
  }, [handleFileSelect]);

  const handleGenerate = async () => {
    if (inputMode === 'image' && !fileData) {
      setError('Please upload an image or PDF');
      return;
    }
    if (inputMode === 'text' && !textInput.trim()) {
      setError('Please enter question text');
      return;
    }

    setIsGenerating(true);
    setError(null);
    setResult(null);
    setLoadingStage('analyzing');
    setLoadingQuestionIndex(0);

    try {
      // Cosmetic loading stages with question cycling
      const stageTimer1 = setTimeout(() => {
        setLoadingStage('identifying');
        setLoadingQuestionIndex(1);
      }, 2000);
      const stageTimer2 = setTimeout(() => {
        setLoadingStage('generating');
        setLoadingQuestionIndex(2);
      }, 4000);
      const stageTimer3 = setTimeout(() => setLoadingQuestionIndex(3), 6000);
      const stageTimer4 = setTimeout(() => setLoadingQuestionIndex(4), 8000);

      const payload = {
        textInput: inputMode === 'text' ? textInput : undefined,
        imageBase64: inputMode === 'image' ? fileData?.base64 : undefined,
        mimeType: inputMode === 'image' ? fileData?.file.type : undefined
      };

      const response = await fetch('/api/infinite-drill', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'Failed to generate');
      }

      const data = await response.json();
      
      clearTimeout(stageTimer1);
      clearTimeout(stageTimer2);
      clearTimeout(stageTimer3);
      clearTimeout(stageTimer4);
      
      setResult(data);
      setLoadingStage('complete');
      setCurrentQuestionIndex(0);
      setLoadingQuestionIndex(0);
      setShowExplanation(false);
      setAnsweredQuestions(new Set());
      setUserAnswers({});
      setIsSubmitted(false);
    } catch (err: any) {
      console.error('Error generating questions:', err);
      setError(err.message || 'Failed to generate practice questions. Please try again.');
      setLoadingStage('idle');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleReset = () => {
    setFileData(null);
    setTextInput('');
    setResult(null);
    setError(null);
    setLoadingStage('idle');
    setUserAnswers({});
    setIsSubmitted(false);
    setCurrentQuestionIndex(0);
    setShowExplanation(false);
    setAnsweredQuestions(new Set());
  };

  const handleAnswerSelect = (questionId: string, answer: string) => {
    if (!result) return;
    const question = result.questions.find(q => String(q.id) === questionId);
    if (!question) return;
    
    // Only allow selection if question hasn't been answered yet
    if (answeredQuestions.has(question.id || 0)) return;
    
    setUserAnswers(prev => ({ ...prev, [questionId]: answer }));
    setAnsweredQuestions(prev => new Set(prev).add(question.id || 0));
    setShowExplanation(false);
  };

  const handleShowExplanation = () => {
    setShowExplanation(true);
  };

  const handleNextQuestion = async () => {
    if (!result) return;
    
    if (currentQuestionIndex < result.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setShowExplanation(false);
    } else {
      // All questions answered, show final results
      setIsSubmitted(true);
      
      // Save quiz history
      if (user && result.questions.length > 0 && Object.keys(userAnswers).length > 0) {
        try {
          const correctCount = result.questions.filter(q => userAnswers[String(q.id)] === q.correctAnswer).length;
          const totalQuestions = result.questions.length;
          const score = Math.round((correctCount / totalQuestions) * 100);
          
          // Convert userAnswers keys to match question IDs (ensure consistency)
          const normalizedAnswers: Record<string, string> = {};
          result.questions.forEach((q) => {
            const answerKey = String(q.id);
            if (userAnswers[answerKey]) {
              normalizedAnswers[q.id.toString()] = userAnswers[answerKey];
            }
          });

          await saveQuizResult({
            userId: user.uid,
            type: 'infinite-drill',
            title: result.conceptDetected || 'Infinite Practice Drill',
            score,
            correctCount,
            totalQuestions,
            questions: result.questions,
            userAnswers: normalizedAnswers,
          });
          console.log('[Infinite Drill] Saved quiz history');
        } catch (error) {
          console.error('[Infinite Drill] Error saving quiz history:', error);
        }
      }
    }
  };

  const canGenerate = inputMode === 'image' ? !!fileData : !!textInput.trim();

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
            Infinite Practice Generator
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Upload your class notes, diagrams, or PDFs. We generate AP-style questions instantly.
          </p>
        </div>

        {/* Input Section */}
        {!result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="mb-8 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <CardTitle className="text-3xl font-black text-gray-900 mb-1">
                      Ready to Practice?
                    </CardTitle>
                    <p className="text-sm text-gray-600">
                      Upload your notes or paste text to generate custom AP questions
                    </p>
                  </div>
                  <Button
                    variant={inputMode === 'text' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => {
                      setInputMode('text');
                      setFileData(null);
                      setError(null);
                    }}
                    className={`flex items-center gap-2 font-semibold transition-all ${
                      inputMode === 'text'
                        ? 'bg-blue-600 text-white shadow-md hover:bg-blue-700'
                        : 'bg-white border-2 border-gray-300 hover:border-blue-500'
                    }`}
                  >
                    <FileText className="w-4 h-4" />
                    Text Input
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {inputMode === 'image' ? (
                <motion.div
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  className={`border-4 border-dashed rounded-xl p-16 text-center transition-colors relative overflow-hidden cursor-pointer ${
                    fileData
                      ? 'border-blue-400 bg-gradient-to-br from-blue-50 to-purple-50'
                      : 'border-blue-300 bg-white hover:border-blue-500 hover:bg-gradient-to-br hover:from-blue-50 hover:to-purple-50'
                  }`}
                >
                    {/* Animated background pattern */}
                    <div className="absolute inset-0 opacity-5">
                      <div className="absolute inset-0" style={{
                        backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
                        backgroundSize: '20px 20px'
                      }} />
                    </div>
                    
                    {fileData ? (
                      <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="relative z-10"
                      >
                        {fileData.file.type === 'application/pdf' ? (
                          <div className="max-w-full h-64 mx-auto rounded-xl shadow-xl bg-gradient-to-br from-blue-100 to-purple-100 border-4 border-blue-300 p-8 flex flex-col items-center justify-center">
                            <motion.div
                              animate={{ rotate: [0, 5, -5, 0] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            >
                              <FileText className="w-24 h-24 text-blue-600 mb-4" />
                            </motion.div>
                            <p className="text-lg font-bold text-gray-800 mb-2 truncate w-full max-w-full px-4 text-center">
                              {fileData.file.name}
                            </p>
                            <p className="text-sm font-semibold text-blue-700 text-center">
                              ✓ PDF Ready for Analysis
                            </p>
                          </div>
                        ) : (
                          <img
                            src={fileData.preview}
                            alt="Preview"
                            className="max-w-full max-h-96 mx-auto rounded-xl shadow-xl object-contain border-4 border-blue-200"
                          />
                        )}
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => {
                            setFileData(null);
                          }}
                          className="absolute top-4 right-4 bg-red-500 text-white rounded-full p-3 hover:bg-red-600 transition-colors shadow-lg z-20"
                        >
                          <X className="w-5 h-5" />
                        </motion.button>
                      </motion.div>
                    ) : (
                      <div className="relative z-10">
                        <motion.div
                          animate={{ y: [0, -10, 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <Upload className="w-20 h-20 mx-auto text-blue-500 mb-6" />
                        </motion.div>
                        <h3 className="text-2xl font-black text-gray-900 mb-3">
                          Drag & Drop Your Notes
                        </h3>
                        <p className="text-lg font-semibold text-gray-700 mb-2">
                          Images, PDFs, or any study material
                        </p>
                        <p className="text-sm text-gray-600 mb-6">
                          We'll analyze your content and generate custom AP-style questions instantly
                        </p>
                        <input
                          type="file"
                          accept="image/*,application/pdf"
                          onChange={handleFileInput}
                          className="hidden"
                          id="image-upload"
                        />
                        <label htmlFor="image-upload">
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Button
                              asChild
                              className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3 text-lg shadow-lg border-2 border-blue-700"
                            >
                              <span className="flex items-center gap-2">
                                <Upload className="w-5 h-5" />
                                Select File
                              </span>
                            </Button>
                          </motion.div>
                        </label>
                      </div>
                    )}
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="relative"
                  >
                    <div className="absolute top-4 left-4 flex items-center gap-2 text-gray-500">
                      <FileText className="w-5 h-5" />
                      <span className="text-sm font-semibold">Text Input</span>
                    </div>
                    <textarea
                      value={textInput}
                      onChange={(e) => {
                        setTextInput(e.target.value);
                        setError(null);
                      }}
                      placeholder="Paste your notes, a topic, or any content here...

Example: 'Explain the causes of the Great Depression and how fiscal policy was used to address it...'"
                      className="w-full min-h-[300px] p-6 pt-12 border-4 border-blue-300 rounded-xl font-mono text-sm focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-200 resize-y bg-white shadow-inner"
                    />
                    <div className="mt-2 text-xs text-gray-500 flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      <span>We'll extract key concepts and generate questions from your text</span>
                    </div>
                  </motion.div>
                )}

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 p-4 bg-red-50 border-4 border-red-300 rounded-xl"
                  >
                    <p className="text-red-700 font-semibold text-sm flex items-center gap-2">
                      <XCircle className="w-4 h-4" />
                      {error}
                    </p>
                  </motion.div>
                )}

                <motion.div
                  whileHover={canGenerate && !isGenerating ? { scale: 1.02 } : {}}
                  whileTap={canGenerate && !isGenerating ? { scale: 0.98 } : {}}
                  className="mt-6"
                >
                  <Button
                    onClick={handleGenerate}
                    disabled={!canGenerate || isGenerating}
                    className={`w-full font-black py-6 text-xl border-4 transition-all ${
                      canGenerate && !isGenerating
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-blue-800 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]'
                        : 'bg-gray-400 text-gray-600 border-gray-500 cursor-not-allowed'
                    }`}
                    size="lg"
                  >
                    {isGenerating ? (
                      <span className="flex items-center gap-3">
                        <Loader2 className="w-6 h-6 animate-spin" />
                        Generating Questions...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        <Sparkles className="w-6 h-6" />
                        Generate 5 Practice Questions
                      </span>
                    )}
                  </Button>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Loading State - Show Question Cards with Skeleton, cycling through */}
        <AnimatePresence mode="wait">
          {isGenerating && (
            <motion.div
              key={loadingQuestionIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <Card className="border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative">
                <CardHeader>
                  <CardTitle className="text-xl">
                    Question {loadingQuestionIndex + 1} of 5
                  </CardTitle>
                  <p className="text-sm text-gray-600 mt-1">
                    {loadingStage === 'analyzing' && 'Analyzing content...'}
                    {loadingStage === 'identifying' && 'Identifying concepts...'}
                    {loadingStage === 'generating' && 'Generating questions...'}
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Animated Text Bars for Question */}
                    <div className="space-y-3">
                      <motion.div
                        className="h-6 bg-gray-200 rounded-lg"
                        animate={{
                          width: ['100%', '95%', '100%', '98%', '100%'],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                      />
                      <motion.div
                        className="h-6 bg-gray-200 rounded-lg"
                        animate={{
                          width: ['98%', '100%', '96%', '100%', '97%'],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: 'easeInOut',
                          delay: 0.2,
                        }}
                      />
                      <motion.div
                        className="h-6 bg-gray-200 rounded-lg"
                        animate={{
                          width: ['96%', '100%', '94%', '100%', '99%'],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: 'easeInOut',
                          delay: 0.4,
                        }}
                      />
                      <motion.div
                        className="h-6 bg-gray-200 rounded-lg w-3/4"
                        animate={{
                          width: ['75%', '80%', '70%', '78%', '75%'],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: 'easeInOut',
                          delay: 0.6,
                        }}
                      />
                    </div>

                    {/* Animated Text Bars for Options */}
                    <div className="space-y-2 mt-6">
                      {[1, 2, 3, 4].map((i) => (
                        <motion.div
                          key={i}
                          className="h-12 bg-gray-100 rounded-lg border-2 border-gray-200"
                          animate={{
                            opacity: [0.6, 1, 0.6],
                          }}
                          transition={{
                            duration: 1.2,
                            repeat: Infinity,
                            ease: 'easeInOut',
                            delay: i * 0.15,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results Display - Identical to your original code */}
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Concept Detected Card */}
            <Card className="border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-gradient-to-r from-blue-50 to-purple-50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Sparkles className="w-6 h-6 text-blue-600" />
                    Concept Detected: {result.conceptDetected}
                  </CardTitle>
                  <button
                    onClick={handleReset}
                    className="p-2 rounded-lg hover:bg-blue-100 transition-colors"
                    title="Generate New Questions"
                  >
                    <RefreshCw className="w-6 h-6 text-blue-600" />
                  </button>
                </div>
              </CardHeader>
            </Card>

            {/* Progress Bar */}
            {!isSubmitted && (
              <div className="mb-6 flex items-center gap-3">
                <div className="flex-1 bg-gray-200 rounded-full h-4 border border-gray-300">
                  <motion.div
                    className="bg-blue-600 h-4 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${((answeredQuestions.size) / result.questions.length) * 100}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <span className="text-sm font-semibold text-gray-700 whitespace-nowrap">
                  {answeredQuestions.size}/{result.questions.length}
                </span>
              </div>
            )}

            {/* Single Question Display */}
            {!isSubmitted && result.questions[currentQuestionIndex] && (() => {
              const question = result.questions[currentQuestionIndex];
              const questionId = String(question.id || `q${currentQuestionIndex}`);
              const userAnswer = userAnswers[questionId];
              const isAnswered = answeredQuestions.has(question.id || 0);
              const isCorrect = userAnswer === question.correctAnswer;

              return (
                <Card className="border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative">
                  <CardHeader>
                    <CardTitle className="text-xl">
                      Question {currentQuestionIndex + 1} of {result.questions.length}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-lg font-semibold text-gray-900">
                        {question.question}
                      </p>
                      {question.tableData && (
                        <div className="my-4 overflow-x-auto">
                          <table className="min-w-full border-collapse border border-black">
                            <thead className="bg-white">
                              <tr>
                                {question.tableData.headers.map((header, headerIndex) => (
                                  <th 
                                    key={headerIndex} 
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
                                    const isRowHeader = question.tableData?.rowHeaders && cellIndex === 0;
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
                      )}
                      <div className="space-y-2">
                        {question.options.map((option, optIndex) => {
                          const letter = String.fromCharCode(65 + optIndex);
                          const isSelected = userAnswer === letter;
                          const isCorrectAnswer = letter === question.correctAnswer;
                          
                          // Determine styling based on state
                          let optionStyle = 'bg-white border-gray-300';
                          if (isAnswered) {
                            if (isCorrectAnswer) {
                              optionStyle = 'bg-green-50 border-green-500';
                            } else if (isSelected && !isCorrectAnswer) {
                              optionStyle = 'bg-red-50 border-red-500';
                            }
                          } else if (isSelected) {
                            optionStyle = 'bg-blue-50 border-blue-500';
                          }

                          return (
                            <motion.div
                              key={optIndex}
                              initial={false}
                              animate={isAnswered && isCorrectAnswer ? { scale: [1, 1.05, 1] } : {}}
                              transition={{ duration: 0.3 }}
                              className={`p-3 rounded-lg border-2 transition-colors ${optionStyle} ${
                                !isAnswered ? 'cursor-pointer hover:bg-blue-50 hover:border-blue-300' : ''
                              }`}
                              onClick={!isAnswered ? () => handleAnswerSelect(questionId, letter) : undefined}
                            >
                              <div className="flex items-center gap-3">
                                {!isAnswered ? (
                                  <>
                                    <input
                                      type="radio"
                                      name={questionId}
                                      value={letter}
                                      checked={isSelected}
                                      onChange={() => handleAnswerSelect(questionId, letter)}
                                      className="w-5 h-5 text-blue-600 flex-shrink-0"
                                      onClick={(e) => e.stopPropagation()}
                                    />
                                    <span className="flex-1 text-gray-900">{option}</span>
                                  </>
                                ) : (
                                  <>
                                    <span
                                      className={`w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0 ${
                                        isCorrectAnswer
                                          ? 'bg-green-500 text-white'
                                          : isSelected
                                          ? 'bg-red-500 text-white'
                                          : 'bg-gray-200 text-gray-700'
                                      }`}
                                    >
                                      {letter}
                                    </span>
                                    <span className="flex-1 text-gray-900">{option}</span>
                                    {isCorrectAnswer && (
                                      <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0" />
                                    )}
                                    {isSelected && !isCorrectAnswer && (
                                      <XCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
                                    )}
                                  </>
                                )}
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>

                      {/* Explanation Section - Show based on answer correctness */}
                      {isAnswered && (() => {
                        // If incorrect, show explanation automatically
                        if (!isCorrect) {
                          return (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              transition={{ duration: 0.3 }}
                              className="mt-6 pt-6 border-t border-gray-200"
                            >
                              {/* Explanation */}
                              {question.explanation && (
                                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                                  <h4 className="font-semibold text-gray-900 mb-2 text-sm">Explanation</h4>
                                  <p className="text-gray-900">{question.explanation}</p>
                                </div>
                              )}
                            </motion.div>
                          );
                        }
                        
                        // If correct, show explanation as a link
                        if (isCorrect && question.explanation) {
                          return (
                            <div className="mt-6 pt-6 border-t border-gray-200">
                              <button
                                onClick={handleShowExplanation}
                                className="text-blue-600 hover:text-blue-800 font-semibold text-sm flex items-center gap-2 underline"
                              >
                                <Lightbulb className="w-4 h-4" />
                                View Explanation
                              </button>
                              {/* Show explanation if it exists and was requested */}
                              {showExplanation && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: 'auto' }}
                                  transition={{ duration: 0.3 }}
                                  className="mt-4"
                                >
                                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                                    <h4 className="font-semibold text-gray-900 mb-2 text-sm">Explanation</h4>
                                    <p className="text-gray-900">{question.explanation}</p>
                                  </div>
                                </motion.div>
                              )}
                            </div>
                          );
                        }
                        
                        return null;
                      })()}
                    </div>
                  </CardContent>

                  {/* Bottom: Navigation Buttons */}
                  {isAnswered && (
                    <div className="px-6 pb-6">
                      <div className="flex gap-4">
                        <button
                          onClick={() => {
                            if (currentQuestionIndex > 0) {
                              setCurrentQuestionIndex(prev => prev - 1);
                              setShowExplanation(false);
                            }
                          }}
                          disabled={currentQuestionIndex === 0}
                          className="flex-1 px-6 py-4 border-4 border-black rounded-xl font-black text-lg bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:translate-y-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                        >
                          Previous
                        </button>
                        <button
                          onClick={handleNextQuestion}
                          className="flex-1 px-6 py-4 border-4 border-black rounded-xl font-black text-lg bg-black text-white hover:bg-gray-900 transition-all active:translate-y-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                        >
                          {currentQuestionIndex === result.questions.length - 1 ? 'View Results' : 'Next'}
                        </button>
                      </div>
                    </div>
                  )}
                </Card>
              );
            })()}

            {/* Final Results */}
            {isSubmitted && (
              <div className="p-6 bg-gray-100 rounded-lg border-2 border-gray-300">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                  Quiz Complete!
                </h3>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-semibold text-gray-900">
                    Score: {result.questions.filter(q => userAnswers[String(q.id || '')] === q.correctAnswer).length} / {result.questions.length}
                  </span>
                  <span className="text-lg font-semibold text-gray-900">
                    {Math.round((result.questions.filter(q => userAnswers[String(q.id || '')] === q.correctAnswer).length / result.questions.length) * 100)}%
                  </span>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default InfinitePracticePage;
export { InfinitePracticePage };