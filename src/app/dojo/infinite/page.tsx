'use client';

import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, X, FileText, Image as ImageIcon, Loader2, Check, Sparkles, CheckCircle2, XCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Question } from '@/data/questionBanks/types';

// --- TYPES ---
interface InfiniteDrillResult {
  conceptDetected: string;
  questions: Question[];
}

type LoadingStage = 'idle' | 'analyzing' | 'identifying' | 'generating' | 'complete';

export default function InfinitePracticePage() {
  const [inputMode, setInputMode] = useState<'image' | 'text'>('image');
  const [fileData, setFileData] = useState<{ file: File; preview: string; base64: string } | null>(null);
  const [textInput, setTextInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [loadingStage, setLoadingStage] = useState<LoadingStage>('idle');
  const [result, setResult] = useState<InfiniteDrillResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

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

    try {
      // Cosmetic loading stages
      const stageTimer1 = setTimeout(() => setLoadingStage('identifying'), 2000);
      const stageTimer2 = setTimeout(() => setLoadingStage('generating'), 4500);

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
      
      setResult(data);
      setLoadingStage('complete');
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
  };

  const handleAnswerSelect = (questionId: string, answer: string) => {
    if (!isSubmitted) {
      setUserAnswers(prev => ({ ...prev, [questionId]: answer }));
    }
  };

  const handleSubmit = () => {
    if (!result) return;
    
    // Check if all questions are answered
    const allAnswered = result.questions.every(q => userAnswers[q.id || '']);
    if (!allAnswered) {
      setError('Please answer all questions before submitting');
      return;
    }
    
    setIsSubmitted(true);
    setError(null);
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
          <Card className="mb-8 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl">Input Source</CardTitle>
                <div className="flex gap-2">
                  <Button
                    variant={inputMode === 'image' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => {
                      setInputMode('image');
                      setTextInput('');
                      setError(null);
                    }}
                    className="flex items-center gap-2"
                  >
                    <ImageIcon className="w-4 h-4" />
                    File Upload
                  </Button>
                  <Button
                    variant={inputMode === 'text' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => {
                      setInputMode('text');
                      setFileData(null);
                      setError(null);
                    }}
                    className="flex items-center gap-2"
                  >
                    <FileText className="w-4 h-4" />
                    Text Input
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {inputMode === 'image' ? (
                <div
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  className={`border-4 border-dashed rounded-lg p-12 text-center transition-colors ${
                    fileData
                      ? 'border-gray-300 bg-gray-50'
                      : 'border-gray-400 bg-white hover:border-gray-500 hover:bg-gray-50'
                  }`}
                >
                  {fileData ? (
                    <div className="relative">
                      {fileData.file.type === 'application/pdf' ? (
                        <div className="max-w-full h-64 mx-auto rounded-lg shadow-lg bg-blue-50 border border-blue-200 p-8 flex flex-col items-center justify-center">
                          <FileText className="w-24 h-24 text-blue-500 mb-4" />
                          <p className="text-lg font-semibold text-gray-700 mb-2 truncate w-full max-w-full px-4 text-center">
                            {fileData.file.name}
                          </p>
                          <p className="text-sm text-gray-500 text-center">
                            PDF Ready for Analysis
                          </p>
                        </div>
                      ) : (
                        <img
                          src={fileData.preview}
                          alt="Preview"
                          className="max-w-full max-h-96 mx-auto rounded-lg shadow-lg object-contain"
                        />
                      )}
                      <button
                        onClick={() => {
                          setFileData(null);
                        }}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  ) : (
                    <>
                      <Upload className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                      <p className="text-lg font-semibold text-gray-700 mb-2">
                        Drag & drop an image or PDF here
                      </p>
                      <p className="text-sm text-gray-500 mb-4">
                        We scan your notes to build custom questions
                      </p>
                      <input
                        type="file"
                        accept="image/*,application/pdf"
                        onChange={handleFileInput}
                        className="hidden"
                        id="image-upload"
                      />
                      <label htmlFor="image-upload">
                        <Button asChild variant="outline" className="cursor-pointer">
                          <span>Select File</span>
                        </Button>
                      </label>
                    </>
                  )}
                </div>
              ) : (
                <textarea
                  value={textInput}
                  onChange={(e) => {
                    setTextInput(e.target.value);
                    setError(null);
                  }}
                  placeholder="Paste your notes or a topic here (e.g., 'Explain the causes of the Great Depression')..."
                  className="w-full min-h-[300px] p-4 border-4 border-gray-300 rounded-lg font-mono text-sm focus:outline-none focus:border-blue-500 resize-y"
                />
              )}

              {error && (
                <div className="mt-4 p-4 bg-red-50 border-2 border-red-200 rounded-lg">
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}

              <Button
                onClick={handleGenerate}
                disabled={!canGenerate || isGenerating}
                className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-6 text-lg"
                size="lg"
              >
                {isGenerating ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Generating...
                  </span>
                ) : (
                  'Generate 5 Practice Questions'
                )}
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Loading State */}
        <AnimatePresence>
          {isGenerating && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mb-8"
            >
              <Card className="border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
                      <p className="text-lg font-semibold text-gray-900">
                        {loadingStage === 'analyzing' && 'Analyzing Content...'}
                        {loadingStage === 'identifying' && 'Extracting Concepts...'}
                        {loadingStage === 'generating' && 'Writing AP Questions...'}
                      </p>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <motion.div
                        className="bg-blue-600 h-2 rounded-full"
                        initial={{ width: '0%' }}
                        animate={{
                          width:
                            loadingStage === 'analyzing'
                              ? '33%'
                              : loadingStage === 'identifying'
                              ? '66%'
                              : '100%',
                        }}
                        transition={{ duration: 0.5 }}
                      />
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

            {/* Questions */}
            <div className="space-y-6">
              {result.questions.map((question, index) => {
                const questionId = String(question.id || `q${index}`);
                const userAnswer = userAnswers[questionId];
                const isCorrect = userAnswer === question.correctAnswer;
                const showResults = isSubmitted;

                return (
                  <Card
                    key={questionId}
                    className={`border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] ${
                      showResults
                        ? isCorrect
                          ? 'bg-green-50/30'
                          : 'bg-red-50/30'
                        : ''
                    }`}
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-xl">
                          Question {index + 1} of 5
                        </CardTitle>
                        {showResults && (
                          <div className="flex items-center gap-2">
                            {isCorrect ? (
                              <>
                                <CheckCircle2 className="w-6 h-6 text-green-600" />
                                <span className="text-green-600 font-semibold">Correct!</span>
                              </>
                            ) : (
                              <>
                                <XCircle className="w-6 h-6 text-red-600" />
                                <span className="text-red-600 font-semibold">Incorrect</span>
                              </>
                            )}
                          </div>
                        )}
                      </div>
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
                            if (showResults) {
                              if (isCorrectAnswer) {
                                optionStyle = 'bg-green-50 border-green-500';
                              } else if (isSelected && !isCorrectAnswer) {
                                optionStyle = 'bg-red-50 border-red-500';
                              }
                            } else if (isSelected) {
                              optionStyle = 'bg-blue-50 border-blue-500';
                            }

                            return (
                              <div
                                key={optIndex}
                                className={`p-3 rounded-lg border-2 transition-colors ${optionStyle} ${
                                  !showResults ? 'cursor-pointer hover:bg-blue-50 hover:border-blue-300' : ''
                                }`}
                                onClick={!showResults ? () => handleAnswerSelect(questionId, letter) : undefined}
                              >
                                <div className="flex items-center gap-3">
                                  {!showResults ? (
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
                                        <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                                      )}
                                      {isSelected && !isCorrectAnswer && (
                                        <X className="w-5 h-5 text-red-600 flex-shrink-0" />
                                      )}
                                    </>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                        {showResults && question.explanation && (
                          <div className="mt-4 p-4 bg-blue-50 border-2 border-blue-200 rounded-lg">
                            <p className="text-sm font-semibold text-blue-900 mb-1">
                              Explanation:
                            </p>
                            <p className="text-sm text-blue-800">
                              {question.explanation}
                            </p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              {!isSubmitted ? (
                <Button
                  onClick={handleSubmit}
                  disabled={result.questions.some(q => !userAnswers[String(q.id || '')])}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-6 text-lg"
                  size="lg"
                >
                  Submit Answers
                </Button>
              ) : (
                <div className="p-4 bg-gray-100 rounded-lg border-2 border-gray-300">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-lg font-semibold text-gray-900">
                      Score: {result.questions.filter(q => userAnswers[String(q.id || '')] === q.correctAnswer).length} / {result.questions.length}
                    </span>
                    <span className="text-sm text-gray-600">
                      {Math.round((result.questions.filter(q => userAnswers[String(q.id || '')] === q.correctAnswer).length / result.questions.length) * 100)}%
                    </span>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}