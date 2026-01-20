'use client';

import React, { useState } from 'react';
import { ArrowRightCircle, PenTool, PlayCircle, CheckCircle, ChevronLeft, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ExamTutorialModalProps {
  onClose: () => void;
}

interface TutorialStep {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

const tutorialSteps: TutorialStep[] = [
  {
    title: 'Move Through Exam',
    description: 'Navigate questions quickly or swipe on mobile.',
    icon: ArrowRightCircle,
  },
  {
    title: 'Thinking Pad',
    description: 'Jot down graphs and math directly on the screen.',
    icon: PenTool,
  },
  {
    title: 'Video Explanations',
    description: 'Stuck? Watch a specific breakdown for every single question.',
    icon: PlayCircle,
  },
  {
    title: 'Ready to Begin?',
    description: 'Good luck. Your time starts now.',
    icon: CheckCircle,
  },
];

export function ExamTutorialModal({ onClose }: ExamTutorialModalProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleClose();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleClose = () => {
    onClose();
  };

  const currentStepData = tutorialSteps[currentStep];
  const IconComponent = currentStepData.icon;
  const isLastStep = currentStep === tutorialSteps.length - 1;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="bg-white rounded-xl border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 max-w-md w-full relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close tutorial"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content Area */}
        <div className="text-center mb-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {/* Icon */}
              <div className="flex justify-center">
                <div className="p-4 rounded-full bg-gray-100">
                  <IconComponent className="w-16 h-16 text-gray-900" />
                </div>
              </div>

              {/* Title */}
              <h2 className="text-2xl font-extrabold text-gray-900">
                {currentStepData.title}
              </h2>

              {/* Description */}
              <p className="text-gray-600 text-lg">
                {currentStepData.description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer Navigation */}
        <div className="flex items-center justify-between">
          {/* Back Button */}
          <button
            onClick={handleBack}
            disabled={currentStep === 0}
            className={`flex items-center gap-2 px-4 py-2 rounded-md font-semibold transition-colors ${
              currentStep === 0
                ? 'opacity-0 pointer-events-none'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            Back
          </button>

          {/* Dots Indicator */}
          <div className="flex gap-2">
            {tutorialSteps.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentStep(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  index === currentStep
                    ? 'bg-gray-900 w-8'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to step ${index + 1}`}
              />
            ))}
          </div>

          {/* Next/Get Started Button */}
          <button
            onClick={handleNext}
            className={`px-6 py-2 rounded-md font-bold text-white transition-all ${
              isLastStep
                ? 'bg-green-500 hover:bg-green-600 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] border-2 border-black'
                : 'bg-gray-900 hover:bg-gray-800'
            }`}
          >
            {isLastStep ? 'Get Started' : 'Next'}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
















