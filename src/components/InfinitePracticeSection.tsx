'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Upload, FileText, Image as ImageIcon, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Question } from '@/data/questionBanks/types';
import { useAuthContext } from '@/contexts/AuthContext';
import { useCreditSystem } from '@/hooks/useCreditSystem';
import { LoginModal, SignupModal } from '@/components/AuthModals';
import { storage } from '@/lib/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useRouter } from 'next/navigation';

interface InfiniteDrillResult {
  conceptDetected: string;
  questions: Question[];
}

type LoadingStage = 'idle' | 'analyzing' | 'identifying' | 'generating' | 'complete';

interface InfinitePracticeSectionProps {
  previewMode?: boolean; // If true, disable functionality and show login modal
  onModalOpenChange?: (isOpen: boolean) => void; // Callback to notify parent when modal opens/closes
}

export function InfinitePracticeSection({ previewMode = false, onModalOpenChange }: InfinitePracticeSectionProps = {}) {
  const { user, setShowLoginModal, setRedirectOnLogin, selectedSubject } = useAuthContext();
  const router = useRouter();
  const { consumeLifetimeCredit, getCreditStatus, isPremium } = useCreditSystem();
  const [inputMode, setInputMode] = useState<'image' | 'text'>('image');
  const [fileData, setFileData] = useState<{ file: File; preview: string; base64: string } | null>(null);
  const [textInput, setTextInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [loadingStage, setLoadingStage] = useState<LoadingStage>('idle');
  const [result, setResult] = useState<InfiniteDrillResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showCreditConfirmModal, setShowCreditConfirmModal] = useState(false);
  const [showLoginModal, setShowLoginModalState] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showLoginToTryModal, setShowLoginToTryModal] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState(false);

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleFileSelect = useCallback(async (file: File) => {
    if (previewMode && !user) {
      setShowLoginToTryModal(true);
      onModalOpenChange?.(true);
      return;
    }
    
    const isImage = file.type.startsWith('image/');
    const isPDF = file.type === 'application/pdf';
    
    // Check file size (limit to 15MB - files will be uploaded to Firebase Storage)
    const maxSize = 15 * 1024 * 1024; // 15MB
    if (file.size > maxSize) {
      setError(`File is too large. Please use a file smaller than 15MB (approx. 10 pages). Current size: ${(file.size / 1024 / 1024).toFixed(2)}MB`);
      return;
    }
    
    if (file && (isImage || isPDF)) {
      try {
        // For preview: convert to base64 for images, use placeholder for PDFs
        const preview = isImage ? await convertFileToBase64(file) : 'pdf-placeholder';
        
        setFileData({
          file,
          preview,
          base64: '' // No longer needed, but keeping for compatibility
        });
        setError(null);
      } catch (err) {
        setError('Failed to process file');
      }
    } else {
      setError('Please select a valid image or PDF file');
    }
  }, [previewMode, user, onModalOpenChange]);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (previewMode && !user) {
      setShowLoginToTryModal(true);
      onModalOpenChange?.(true);
      return;
    }
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  }, [handleFileSelect, previewMode, user, onModalOpenChange]);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  }, []);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (previewMode && !user) {
      e.preventDefault();
      setShowLoginToTryModal(true);
      onModalOpenChange?.(true);
      return;
    }
    const file = e.target.files?.[0];
    if (file) handleFileSelect(file);
  }, [handleFileSelect, previewMode, user, onModalOpenChange]);

  const handleGenerate = async () => {
    if (!user) {
      setShowLoginModalState(true);
      return;
    }

    const creditStatus = getCreditStatus();
    const { lifetimeAiGenerations } = creditStatus;

    if (!isPremium && lifetimeAiGenerations === 0) {
      setError('You have no credits remaining. Join the Dojo for unlimited access!');
      return;
    }

    if (!isPremium && lifetimeAiGenerations > 0) {
      setShowCreditConfirmModal(true);
      return;
    }

    await proceedWithGeneration();
  };

  const proceedWithGeneration = async () => {
    if (inputMode === 'image' && !fileData) {
      setError('Please upload an image or PDF');
      return;
    }
    if (inputMode === 'text' && !textInput.trim()) {
      setError('Please enter some text');
      return;
    }

    setIsGenerating(true);
    setError(null);
    setLoadingStage('analyzing');
    setUploadProgress(0);
    setIsUploading(false);

    try {
      let fileUrl: string | undefined = undefined;
      let mimeType: string | undefined = undefined;

      // If image mode, upload to Firebase Storage first
      if (inputMode === 'image' && fileData) {
        // Ensure user is authenticated before uploading
        if (!user) {
          throw new Error('You must be logged in to upload files');
        }
        
        setIsUploading(true);
        setLoadingStage('analyzing'); // Show "Uploading..." state
        
        try {
          // Create a unique file path using authenticated user's UID
          const timestamp = Date.now();
          const fileExtension = fileData.file.name.split('.').pop() || 'file';
          const fileName = `${user.uid}/${timestamp}.${fileExtension}`;
          const storageRef = ref(storage, `infinite-drill-uploads/${fileName}`);
          
          // Upload file - Firebase SDK will automatically use the authenticated user's token
          await uploadBytes(storageRef, fileData.file);
          
          // Get download URL
          fileUrl = await getDownloadURL(storageRef);
          mimeType = fileData.file.type;
          
          setIsUploading(false);
          setUploadProgress(100);
        } catch (uploadError: any) {
          setIsUploading(false);
          console.error('Firebase Storage upload error:', uploadError);
          
          // Provide more specific error messages
          let errorMessage = 'Failed to upload file. Please try again.';
          if (uploadError.code === 'storage/unauthorized') {
            errorMessage = 'You do not have permission to upload files. Please ensure you are logged in.';
          } else if (uploadError.code === 'storage/canceled') {
            errorMessage = 'Upload was canceled. Please try again.';
          } else if (uploadError.message) {
            errorMessage = `Upload failed: ${uploadError.message}`;
          }
          
          throw new Error(errorMessage);
        }
      }

      const stageTimer1 = setTimeout(() => {
        setLoadingStage('identifying');
      }, 2000);
      const stageTimer2 = setTimeout(() => {
        setLoadingStage('generating');
      }, 4000);

      const payload = {
        textInput: inputMode === 'text' ? textInput : undefined,
        fileUrl: fileUrl, // Send URL instead of base64
        mimeType: mimeType
      };

      const response = await fetch('/api/infinite-drill', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        // Try to parse error response, but handle non-JSON responses
        let errData;
        try {
          errData = await response.json();
        } catch (parseError) {
          // If response is not JSON, get text instead
          const errorText = await response.text();
          throw new Error(errorText || `Server error (${response.status}). Please try again.`);
        }
        throw new Error(errData.error || 'Failed to generate');
      }

      const data = await response.json();
      
      clearTimeout(stageTimer1);
      clearTimeout(stageTimer2);
      
      // Consume credit if not premium
      if (!isPremium) {
        const creditResult = await consumeLifetimeCredit();
        if (!creditResult.success) {
          setError('Failed to consume credit. Please try again.');
          setIsGenerating(false);
          return;
        }
      }
      
      setResult(data);
      setLoadingStage('complete');
    } catch (err: any) {
      console.error('Error generating questions:', err);
      setError(err.message || 'Failed to generate practice questions. Please try again.');
      setLoadingStage('idle');
      setIsUploading(false);
      setUploadProgress(0);
    } finally {
      setIsGenerating(false);
    }
  };

  const canGenerate = inputMode === 'image' ? !!fileData : !!textInput.trim();

  // Redirect to /dojo/infinite after successful login when modal was shown
  useEffect(() => {
    if (user && showLoginToTryModal) {
      setShowLoginToTryModal(false);
      onModalOpenChange?.(false);
      router.push('/dojo/infinite');
    }
  }, [user, showLoginToTryModal, router, onModalOpenChange]);

  return (
    <>
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModalState(false)}
        switchToSignup={() => {
          setShowLoginModalState(false);
          setShowSignupModal(true);
        }}
        onAuthSuccess={() => {
          setShowLoginModalState(false);
        }}
      />
      
      <SignupModal
        isOpen={showSignupModal}
        onClose={() => setShowSignupModal(false)}
        switchToLogin={() => {
          setShowSignupModal(false);
          setShowLoginModalState(true);
        }}
        onAuthSuccess={() => {
          setShowSignupModal(false);
        }}
      />

      {showCreditConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="bg-white border-4 border-black rounded-3xl shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-8 max-w-md w-full text-center relative"
          >
            <h3 className="text-3xl font-black text-gray-900 mb-4">
              Use Your Free Credit?
            </h3>
            <div className="flex justify-center mb-4">
              <Image
                src="/images/fire.png"
                alt="Fire"
                width={80}
                height={80}
                className="w-20 h-20"
              />
            </div>
            <p className="text-gray-700 mb-6">
              You're about to use your one free AI generation credit. After this, you'll need to join the Dojo for unlimited access.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => setShowCreditConfirmModal(false)}
                className="flex-1 px-6 py-3 border-4 border-black rounded-xl font-bold text-gray-900 hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  setShowCreditConfirmModal(false);
                  await proceedWithGeneration();
                }}
                className="flex-1 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-xl transition-colors"
              >
                Confirm
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Login to Generate Free Quiz Modal */}
      {showLoginToTryModal && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 z-[100] flex items-center justify-center p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowLoginToTryModal(false);
              onModalOpenChange?.(false);
            }
          }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="bg-white border-4 border-black rounded-3xl shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-8 max-w-md w-full text-center relative"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-3xl font-black text-gray-900 mb-4">
              Log in to Generate a Free Quiz!
            </h3>
            <p className="text-gray-700 mb-6">
              Create an account to start generating custom AP-style questions from your notes.
            </p>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => {
                  setShowLoginToTryModal(false);
                  onModalOpenChange?.(false);
                  setRedirectOnLogin('/dojo/infinite');
                  setShowLoginModal(true);
                }}
                className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors"
              >
                Log In
              </button>
              <button
                onClick={() => {
                  setShowLoginToTryModal(false);
                  onModalOpenChange?.(false);
                }}
                className="w-full px-6 py-3 border-4 border-black rounded-xl font-bold text-gray-900 hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </div>
      )}

      <div 
        className={`mb-16 ${previewMode && !user ? 'cursor-pointer' : ''}`}
        onClick={() => {
          if (previewMode && !user) {
            setShowLoginToTryModal(true);
            onModalOpenChange?.(true);
          }
        }}
      >
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-4">
            Turn Notes into <span className="text-blue-500">Quizzes</span>, Dojo Style
          </h2>
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
                  <div
                    onDrop={previewMode && !user ? undefined : handleDrop}
                    onDragOver={previewMode && !user ? undefined : handleDragOver}
                    className="border-4 border-dashed border-gray-400 rounded-xl p-12 text-center hover:border-blue-500 transition-colors cursor-pointer bg-white"
                    onClick={(e) => {
                      if (previewMode && !user) {
                        e.stopPropagation();
                        setShowLoginToTryModal(true);
                        onModalOpenChange?.(true);
                      } else {
                        document.getElementById('file-input')?.click();
                      }
                    }}
                  >
                    <input
                      id="file-input"
                      type="file"
                      accept="image/*,.pdf"
                      onChange={handleFileInput}
                      className="hidden"
                      disabled={previewMode && !user}
                    />
                    {fileData ? (
                      <div className="space-y-4">
                        <div className="relative max-w-md mx-auto">
                          {fileData.file.type === 'application/pdf' ? (
                            <div className="bg-gray-100 p-8 rounded-lg">
                              <FileText className="w-16 h-16 mx-auto text-gray-400" />
                              <p className="mt-2 text-sm font-medium text-gray-600">{fileData.file.name}</p>
                            </div>
                          ) : (
                            <Image
                              src={fileData.preview}
                              alt="Preview"
                              width={400}
                              height={300}
                              className="rounded-lg mx-auto max-h-64 object-contain"
                            />
                          )}
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setFileData(null);
                          }}
                          className="text-sm text-red-600 hover:text-red-800 font-semibold"
                        >
                          Remove File
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <Upload className="w-16 h-16 mx-auto text-gray-400" />
                        <div>
                          <p className="text-lg font-semibold text-gray-900 mb-1">
                            Drop your notes here or click to upload
                          </p>
                          <p className="text-sm text-gray-600">
                            Supports images and PDFs
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-4">
                    <textarea
                      value={textInput}
                      onChange={(e) => setTextInput(e.target.value)}
                      placeholder="Paste your notes here..."
                      className="w-full min-h-[200px] p-4 border-4 border-gray-300 rounded-xl font-medium focus:outline-none focus:border-blue-500 resize-y"
                    />
                  </div>
                )}

                {error && (
                  <div className="mt-4 p-4 bg-red-50 border-2 border-red-200 rounded-lg">
                    <p className="text-red-800 text-sm font-semibold">{error}</p>
                  </div>
                )}

                <div className="mt-6">
                  <Button
                    onClick={handleGenerate}
                    disabled={!canGenerate || isGenerating}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-6 text-lg rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    size="lg"
                  >
                    {isGenerating ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="w-5 h-5 animate-spin" />
                        {loadingStage === 'analyzing' && 'Analyzing your notes...'}
                        {loadingStage === 'identifying' && 'Identifying concepts...'}
                        {loadingStage === 'generating' && 'Generating questions...'}
                      </span>
                    ) : (
                      'Generate Questions'
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Results Section */}
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Concept Detected: {result.conceptDetected}
              </h3>
              <p className="text-gray-600">
                {result.questions.length} questions generated
              </p>
            </div>
            <div className="text-center">
              <Button
                onClick={() => window.location.href = '/dojo/infinite'}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl"
              >
                View Full Quiz
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </>
  );
}

