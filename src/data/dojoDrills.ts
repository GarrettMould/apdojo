export type InteractiveActivityType = 'graph' | 'table' | 'monopoly' | 'comparative-advantage' | 'ppc-drill';

export interface ComprehensionQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number; // Index of correct answer (0-based)
  explanation?: string;
}

export interface Stage1ComprehensionCheck {
  questions: ComprehensionQuestion[];
}

export interface Stage2InteractiveActivity {
  type: InteractiveActivityType;
  config?: Record<string, any>; // For activity-specific settings
}

export interface DojoDrill {
  id: string; // unique identifier (slug)
  title: string;
  description: string; // for the card display
  videoUrl: string;
  subject: 'ap_macroeconomics' | 'ap_microeconomics';
  unit: number;
  lessonIds: string[];
  
  // Stage 1: Video + Comprehension Check
  stage1: {
    videoUrl: string;
    comprehensionQuestions: ComprehensionQuestion[];
  };
  
  // Stage 2: Interactive Activity
  stage2: Stage2InteractiveActivity;
  
  // Stage 3: MCQs
  stage3: {
    mcqIds: [number, number, number]; // Exactly 3 MCQ IDs from unitPracticeProblems
  };
  
  // XP rewards
  xpReward: {
    completion: number; // XP for completing the drill (20)
    perMcqCorrect: number; // XP per correct MCQ (10, max 30 for all 3)
    total: number; // Total possible XP (50)
  };
}

// Lorem ipsum comprehension questions for Stage 1
const createComprehensionQuestions = (): ComprehensionQuestion[] => [
  {
    id: 'comp-1',
    question: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua?',
    options: [
      'Ut enim ad minim veniam',
      'Duis aute irure dolor in reprehenderit',
      'Excepteur sint occaecat cupidatat',
      'Sed ut perspiciatis unde omnis'
    ],
    correctAnswer: 0,
    explanation: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
  },
  {
    id: 'comp-2',
    question: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat?',
    options: [
      'Duis aute irure dolor in reprehenderit',
      'Excepteur sint occaecat cupidatat non proident',
      'Sed ut perspiciatis unde omnis iste natus',
      'At vero eos et accusamus et iusto odio'
    ],
    correctAnswer: 1,
    explanation: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
  },
  {
    id: 'comp-3',
    question: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur?',
    options: [
      'Excepteur sint occaecat cupidatat non proident',
      'Sed ut perspiciatis unde omnis iste natus error',
      'At vero eos et accusamus et iusto odio dignissimos',
      'Temporibus autem quibusdam et aut officiis debitis'
    ],
    correctAnswer: 2,
    explanation: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
  }
];

export const dojoDrills: Record<string, DojoDrill> = {
  'nominal-vs-real-gdp-explained': {
    id: 'nominal-vs-real-gdp-explained',
    title: 'Nominal vs Real GDP Explained',
    description: 'Understanding the difference between real growth and inflation using the gradeflation analogy.',
    videoUrl: 'https://apdojovideos.s3.ap-southeast-2.amazonaws.com/dojoDrills/dd_macro_2.6.mp4',
    subject: 'ap_macroeconomics',
    unit: 2,
    lessonIds: [],
    stage1: {
      videoUrl: 'https://apdojovideos.s3.ap-southeast-2.amazonaws.com/dojoDrills/dd_macro_2.6.mp4',
      comprehensionQuestions: createComprehensionQuestions()
    },
    stage2: {
      type: 'table',
      config: {}
    },
    stage3: {
      mcqIds: [17, 18, 19] // Replace with actual MCQ IDs
    },
    xpReward: {
      completion: 20,
      perMcqCorrect: 10,
      total: 50
    }
  },
  'monopoly-marginal-revenue': {
    id: 'monopoly-marginal-revenue',
    title: 'Why Marginal Revenue Falls Faster Than Demand',
    description: 'Understanding why monopolists must lower prices on all previous units to sell one more—and why that makes MR fall faster than demand.',
    videoUrl: 'https://apdojovideos.s3.ap-southeast-2.amazonaws.com/dojoDrills/dd_micro_4.2.mp4',
    subject: 'ap_microeconomics',
    unit: 4,
    lessonIds: [],
    stage1: {
      videoUrl: 'https://apdojovideos.s3.ap-southeast-2.amazonaws.com/dojoDrills/dd_micro_4.2.mp4',
      comprehensionQuestions: createComprehensionQuestions()
    },
    stage2: {
      type: 'monopoly',
      config: {}
    },
    stage3: {
      mcqIds: [1150, 1151, 1152] // Replace with actual MCQ IDs
    },
    xpReward: {
      completion: 20,
      perMcqCorrect: 10,
      total: 50
    }
  },
  'the-economy-fixes-itself-long-run-self-adjustment': {
    id: 'the-economy-fixes-itself-long-run-self-adjustment',
    title: 'The Economy Fixes Itself: Long-Run Self-Adjustment',
    description: 'Understanding how the economy automatically returns to full employment through wage adjustments—without government intervention.',
    videoUrl: 'https://apdojovideos.s3.ap-southeast-2.amazonaws.com/dojoDrills/dd_macro_3.7.mp4',
    subject: 'ap_macroeconomics',
    unit: 3,
    lessonIds: [],
    stage1: {
      videoUrl: 'https://apdojovideos.s3.ap-southeast-2.amazonaws.com/dojoDrills/dd_macro_3.7.mp4',
      comprehensionQuestions: createComprehensionQuestions()
    },
    stage2: {
      type: 'graph',
      config: {}
    },
    stage3: {
      mcqIds: [100, 101, 102] // Replace with actual MCQ IDs
    },
    xpReward: {
      completion: 20,
      perMcqCorrect: 10,
      total: 50
    }
  },
  'absolute-and-comparative-advantage': {
    id: 'absolute-and-comparative-advantage',
    title: 'Absolute and Comparative Advantage',
    description: 'Master the concepts of absolute and comparative advantage to understand how countries benefit from specialization and trade.',
    videoUrl: 'https://apdojovideos.s3.ap-southeast-2.amazonaws.com/dojoDrills/dd_macro_1.3.mp4',
    subject: 'ap_macroeconomics',
    unit: 1,
    lessonIds: ['1.3'],
    stage1: {
      videoUrl: 'https://apdojovideos.s3.ap-southeast-2.amazonaws.com/dojoDrills/dd_macro_1.3.mp4',
      comprehensionQuestions: createComprehensionQuestions()
    },
    stage2: {
      type: 'comparative-advantage',
      config: {
        type: 'input' as const,
        data: {
          headers: ['Country', 'Wheat', 'Cloth'],
          rows: [
            { country: 'USA', wheat: '10 hours', cloth: '5 hours' },
            { country: 'France', wheat: '20 hours', cloth: '10 hours' }
          ]
        },
        answers: {
          usaOpportunityCostWheat: '0.5', // 5/10 = 0.5 cloth per wheat
          franceOpportunityCostWheat: '0.5', // 10/20 = 0.5 cloth per wheat
          absoluteAdvantageCloth: 'USA' as const, // USA uses fewer hours (5 < 10)
          comparativeAdvantageWheat: 'USA' as const // Same OC, but typically USA if equal
        }
      }
    },
    stage3: {
      mcqIds: [5, 6, 2084] // MCQs from ap macro unit 1, lesson 1.3
    },
    xpReward: {
      completion: 20,
      perMcqCorrect: 10,
      total: 50
    }
  },
  'ppc-and-opportunity-cost': {
    id: 'ppc-and-opportunity-cost',
    title: 'PPC and Opportunity Cost',
    description: 'Master the Production Possibilities Curve and understand how opportunity cost shapes economic decisions.',
    videoUrl: 'https://apdojovideos.s3.ap-southeast-2.amazonaws.com/dojoDrills/dd_macro_1.3.mp4',
    subject: 'ap_macroeconomics',
    unit: 1,
    lessonIds: ['1.2'],
    stage1: {
      videoUrl: 'https://apdojovideos.s3.ap-southeast-2.amazonaws.com/dojoDrills/dd_macro_1.3.mp4',
      comprehensionQuestions: createComprehensionQuestions()
    },
    stage2: {
      type: 'ppc-drill',
      config: {}
    },
    stage3: {
      mcqIds: [2, 3, 4] // MCQs from ap macro unit 1, lesson 1.2
    },
    xpReward: {
      completion: 20,
      perMcqCorrect: 10,
      total: 50
    }
  }
};

