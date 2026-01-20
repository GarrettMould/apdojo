'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { getBeltProgress } from '@/lib/beltSystem';

// BeltHUD Component - EXACT COPY from unitMCQS.tsx
interface BeltHUDProps {
  currentXP: number;
  nextBeltXP: number | null;
  currentBelt: { name: string; color: string; textColor: string };
  percent: number;
}

const BeltHUD = ({ currentXP, nextBeltXP, currentBelt, percent }: BeltHUDProps) => {
  const getBeltImage = () => {
    if (currentBelt.name === 'White Belt') {
      return '/images/beltNewWhite.svg';
    } else if (currentBelt.name === 'Yellow Belt') {
      return '/images/beltNewYellow.svg';
    } else if (currentBelt.name === 'Green Belt') {
      return '/images/beltNewGreen.svg';
    } else if (currentBelt.name === 'Purple Belt') {
      return '/images/beltNewPurple.svg';
    } else if (currentBelt.name === 'Black Belt') {
      return '/images/beltNewBlack.svg';
    } else {
      return '/images/beltNewWhite.svg';
    }
  };

  return (
    <div className="w-full flex items-center gap-4 mb-6">
      <div className="flex items-center">
        <Image
          src={getBeltImage()}
          alt={currentBelt.name}
          width={40}
          height={40}
          className="h-10 w-auto"
        />
      </div>
      <div className="flex-1 relative">
        <div className="h-6 bg-gray-200 border-2 border-black rounded-full overflow-hidden relative">
          <motion.div
            className={`h-full ${currentBelt.color === 'bg-yellow-400' ? 'bg-yellow-400' : currentBelt.color === 'bg-green-600' ? 'bg-green-600' : currentBelt.color === 'bg-purple-600' ? 'bg-purple-600' : currentBelt.color === 'bg-gray-900' ? 'bg-gray-900' : 'bg-gray-100'}`}
            initial={{ width: 0 }}
            animate={{ width: `${percent}%` }}
            transition={{ duration: 0.3 }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs font-bold text-gray-900 z-10">
              {currentXP.toLocaleString()} / {nextBeltXP ? nextBeltXP.toLocaleString() : 'MAX'} XP
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

// QuestionArena Component - EXACT COPY from unitMCQS.tsx
interface QuestionArenaProps {
  question: {
    question: string;
    options: string[];
  };
}

const QuestionArena = ({ question }: QuestionArenaProps) => {
  return (
    <div className="space-y-8">
      <div className="space-y-6">
        <div className="text-2xl font-black leading-tight text-gray-900 prose prose-lg max-w-none">
          <p className="mb-4">{question.question}</p>
        </div>
      </div>

      <div className="space-y-4">
        {question.options.map((option, optIndex) => {
          const letter = String.fromCharCode(65 + optIndex);
          
          return (
            <button
              key={optIndex}
              className="w-full text-left p-6 border-4 rounded-xl cursor-pointer transition-all bg-transparent border-gray-100 hover:border-black"
            >
              <div className="flex items-center gap-4">
                <span className="w-8 h-8 flex items-center justify-center rounded-full border-2 text-sm font-bold flex-shrink-0 bg-white border-gray-300 text-gray-600">
                  {letter}
                </span>
                <span className="flex-1 text-lg font-medium text-gray-900">{option}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export function MCQPracticePreview() {
  const router = useRouter();

  const handleCardClick = () => {
    router.push('/unitMCQPracticePage?subject=macro&mode=singleUnit&unit=1');
  };

  // Sample question matching the image
  const sampleQuestion = {
    question: "In a competitive market, equilibrium is achieved when:",
    options: [
      "There is a surplus of the good.",
      "There is a shortage of the good.",
      "The price is set by the government.",
      "Quantity supplied equals quantity demanded.",
      "Demand equals supply.",
    ],
  };

  // Calculate belt progress for preview (0 XP = White Belt)
  const beltProgress = getBeltProgress(0);
  const { currentBelt, nextBelt, percent, nextBeltXP } = beltProgress;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      onClick={handleCardClick}
      className="w-full h-full flex flex-col bg-white border-4 border-black rounded-3xl shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-8 sm:p-10 cursor-pointer hover:shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] transition-all"
    >
      {/* Top Row: BeltHUD - EXACT COPY */}
      <BeltHUD
        currentXP={0}
        nextBeltXP={nextBeltXP}
        currentBelt={currentBelt}
        percent={percent}
      />

      {/* Center: QuestionArena - EXACT COPY */}
      <div className="flex-grow flex flex-col">
        <QuestionArena question={sampleQuestion} />
      </div>

      {/* Bottom: Navigation Buttons - EXACT COPY */}
      <div className="flex gap-4 mt-8">
        <button
          disabled={true}
          className="flex-1 px-6 py-4 border-4 border-black rounded-xl font-black text-lg bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:translate-y-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
        >
          Previous
        </button>
        <button
          className="flex-1 px-6 py-4 border-4 border-black rounded-xl font-black text-lg bg-black text-white hover:bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:translate-y-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
        >
          Next
        </button>
      </div>
    </motion.div>
  );
}
