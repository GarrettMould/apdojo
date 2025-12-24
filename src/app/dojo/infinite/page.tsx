'use client';

import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, X, FileText, Image as ImageIcon, Loader2, Check, Save, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Question } from '@/data/questionBanks/types';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useAuthContext } from '@/contexts/AuthContext';
// Question display will be inline

interface InfiniteDrillResult {
  conceptDetected: string;
  questions: Question[];
}

type LoadingStage = 'idle' | 'analyzing' | 'identifying' | 'generating' | 'complete';

export default function InfinitePracticePage() {
  const { user } = useAuthContext();
  const [inputMode, setInputMode] = useState<'image' | 'text'>('image');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [textInput, setTextInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [loadingStage, setLoadingStage] = useState<LoadingStage>('idle');
  const [result, setResult] = useState<InfiniteDrillResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [isConvertingPDF, setIsConvertingPDF] = useState(false);

  const handleFileSelect = useCallback((file: File) => {
    const isImage = file.type.startsWith('image/');
    const isPDF = file.type === 'application/pdf';
    
    if (file && (isImage || isPDF)) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      setError(null);
    } else {
      setError('Please select a valid image or PDF file');
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
    }
  }, [handleFileSelect]);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  }, []);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  }, [handleFileSelect]);

  const convertImageToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        resolve(result);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const convertPDFToImage = async (file: File): Promise<string> => {
    try {
      // Dynamically import pdfjs-dist
      const pdfjsLib = await import('pdfjs-dist');
      
      // Set worker source - use unpkg CDN for reliability
      if (typeof window !== 'undefined') {
        pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.js`;
      }
      
      // Read file as array buffer
      const arrayBuffer = await file.arrayBuffer();
      
      // Load PDF
      const pdf = await pdfjsLib.getDocument({ 
        data: arrayBuffer,
        useSystemFonts: true,
      }).promise;
      
      // Get first page
      const page = await pdf.getPage(1);
      
      // Set scale for rendering (higher = better quality)
      const scale = 2.0;
      const viewport = page.getViewport({ scale });
      
      // Create canvas
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      if (!context) {
        throw new Error('Could not get canvas context');
      }
      
      canvas.height = viewport.height;
      canvas.width = viewport.width;
      
      // Render PDF page to canvas
      const renderContext = {
        canvasContext: context,
        viewport: viewport,
      };
      
      await page.render(renderContext).promise;
      
      // Convert canvas to base64 image
      const imageDataUrl = canvas.toDataURL('image/png');
      return imageDataUrl;
    } catch (error) {
      console.error('Error converting PDF to image:', error);
      throw new Error('Failed to convert PDF to image. Please try converting your PDF to an image manually or use text input mode.');
    }
  };

  const handleGenerate = async () => {
    if (inputMode === 'image' && !imageFile) {
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
      // Simulate loading stages
      setTimeout(() => setLoadingStage('identifying'), 2000);
      setTimeout(() => setLoadingStage('generating'), 4000);

      let imageBase64: string | undefined;
      if (inputMode === 'image' && imageFile) {
        if (imageFile.type === 'application/pdf') {
          // Convert PDF to image
          setIsConvertingPDF(true);
          setLoadingStage('analyzing');
          try {
            imageBase64 = await convertPDFToImage(imageFile);
          } catch (pdfError: any) {
            setError(pdfError.message || 'Failed to process PDF. Please try converting it to an image manually or use text input mode.');
            setIsGenerating(false);
            setIsConvertingPDF(false);
            return;
          } finally {
            setIsConvertingPDF(false);
          }
        } else {
          // Regular image
          imageBase64 = await convertImageToBase64(imageFile);
        }
      }

      const response = await fetch('/api/infinite-drill', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          imageBase64: imageBase64,
          textInput: inputMode === 'text' ? textInput : undefined,
        }),
      });

      // Check content type before parsing
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        console.error('Non-JSON response received:', text.substring(0, 500));
        throw new Error('Server returned an invalid response. This might be a server error. Please check the console or try again.');
      }

      if (!response.ok) {
        try {
          const errorData = await response.json();
          throw new Error(errorData.error || `Server error: ${response.status}`);
        } catch (jsonError) {
          throw new Error(`Server error: ${response.status}. Please try again.`);
        }
      }

      const data = await response.json();
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

  const handleSaveToDashboard = async () => {
    if (!user || !result) {
      setError('Please log in to save drills');
      return;
    }

    setIsSaving(true);
    setError(null);

    try {
      await addDoc(collection(db, 'infiniteDrills'), {
        userId: user.uid,
        userEmail: user.email,
        conceptDetected: result.conceptDetected,
        questions: result.questions,
        createdAt: serverTimestamp(),
        imagePreview: imagePreview || null,
        textInput: textInput || null,
      });

      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err: any) {
      setError('Failed to save drill. Please try again.');
      console.error('Error saving drill:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    setImageFile(null);
    setImagePreview(null);
    setTextInput('');
    setResult(null);
    setError(null);
    setLoadingStage('idle');
    setSaved(false);
  };

  const canGenerate = inputMode === 'image' ? !!imageFile : !!textInput.trim();

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
            Infinite Practice Generator
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Upload a question you got wrong. We will generate 5 fresh ones just like it.
          </p>
        </div>

        {/* Input Section */}
        {!result && (
          <Card className="mb-8 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl">Input Your Question</CardTitle>
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
                    Image
                  </Button>
                  <Button
                    variant={inputMode === 'text' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => {
                      setInputMode('text');
                      setImageFile(null);
                      setImagePreview(null);
                      setError(null);
                    }}
                    className="flex items-center gap-2"
                  >
                    <FileText className="w-4 h-4" />
                    Text
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
                    imagePreview
                      ? 'border-gray-300 bg-gray-50'
                      : 'border-gray-400 bg-white hover:border-gray-500 hover:bg-gray-50'
                  }`}
                >
                  {imagePreview ? (
                    <div className="relative">
                      {imageFile?.type === 'application/pdf' ? (
                        <div className="max-w-full max-h-96 mx-auto rounded-lg shadow-lg bg-gray-100 p-8 flex flex-col items-center justify-center">
                          <FileText className="w-24 h-24 text-gray-400 mb-4" />
                          <p className="text-lg font-semibold text-gray-700 mb-2">
                            {imageFile.name}
                          </p>
                          <p className="text-sm text-gray-500 text-center">
                            PDF file ready to upload. First page will be converted to an image.
                          </p>
                        </div>
                      ) : (
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="max-w-full max-h-96 mx-auto rounded-lg shadow-lg"
                        />
                      )}
                      <button
                        onClick={() => {
                          setImageFile(null);
                          setImagePreview(null);
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
                        Drag & drop an image or PDF here, or click to select
                      </p>
                      <p className="text-sm text-gray-500 mb-4">
                        Supports JPG, PNG, GIF, PDF
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
                          <span>Select Image</span>
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
                  placeholder="Paste your question text here..."
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
                disabled={!canGenerate || isGenerating || isConvertingPDF}
                className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-6 text-lg"
                size="lg"
              >
                {isConvertingPDF ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Converting PDF...
                  </span>
                ) : isGenerating ? (
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
                        {loadingStage === 'analyzing' && 'Analyzing Graph...'}
                        {loadingStage === 'identifying' && 'Identifying Concept...'}
                        {loadingStage === 'generating' && 'Writing Scenarios...'}
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

        {/* Results */}
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Concept Detected Card */}
            <Card className="border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-gradient-to-r from-blue-50 to-purple-50">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-blue-600" />
                  Concept Detected: {result.conceptDetected}
                </CardTitle>
              </CardHeader>
            </Card>

            {/* Questions */}
            <div className="space-y-6">
              {result.questions.map((question, index) => (
                <Card
                  key={question.id}
                  className="border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
                >
                  <CardHeader>
                    <CardTitle className="text-xl">
                      Question {index + 1} of 5
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-lg font-semibold text-gray-900">
                        {question.question}
                      </p>
                      <div className="space-y-2">
                        {question.options.map((option, optIndex) => {
                          const letter = String.fromCharCode(65 + optIndex);
                          const isCorrect = letter === question.correctAnswer;
                          return (
                            <div
                              key={optIndex}
                              className={`p-3 rounded-lg border-2 ${
                                isCorrect
                                  ? 'bg-green-50 border-green-500'
                                  : 'bg-white border-gray-300'
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <span
                                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                                    isCorrect
                                      ? 'bg-green-500 text-white'
                                      : 'bg-gray-200 text-gray-700'
                                  }`}
                                >
                                  {letter}
                                </span>
                                <span className="flex-1">{option}</span>
                                {isCorrect && (
                                  <Check className="w-5 h-5 text-green-600" />
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      {question.explanation && (
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
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button
                onClick={handleSaveToDashboard}
                disabled={isSaving || saved || !user}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-6 text-lg"
                size="lg"
              >
                {saved ? (
                  <span className="flex items-center gap-2">
                    <Check className="w-5 h-5" />
                    Saved!
                  </span>
                ) : isSaving ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Saving...
                  </span>
                ) : !user ? (
                  'Log in to Save'
                ) : (
                  <span className="flex items-center gap-2">
                    <Save className="w-5 h-5" />
                    Save This Drill to My Dashboard
                  </span>
                )}
              </Button>
              <Button
                onClick={handleReset}
                variant="outline"
                className="px-8 border-4 border-black font-semibold py-6 text-lg"
                size="lg"
              >
                Generate New
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

