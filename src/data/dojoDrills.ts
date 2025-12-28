export type InteractiveActivityType = 'graph' | 'table' | 'monopoly' | 'comparative-advantage' | 'ppc-drill' | 'demand-change' | 'elasticity-revenue' | 'consumer-producer-surplus';

// Helper function to check if a drill applies to a subject
export function drillAppliesToSubject(drill: DojoDrill, subject: 'ap_macroeconomics' | 'ap_microeconomics'): boolean {
  // If subjects array is defined, use it
  if (drill.subjects && drill.subjects.length > 0) {
    return drill.subjects.includes(subject);
  }
  // Otherwise fall back to the old subject field
  return drill.subject === subject;
}

// Helper function to get the unit number for a drill for a specific subject
export function getDrillUnitForSubject(drill: DojoDrill, subject: 'ap_macroeconomics' | 'ap_microeconomics'): number | null {
  // If subjectUnits is defined, use it
  if (drill.subjectUnits && drill.subjectUnits[subject] !== undefined) {
    return drill.subjectUnits[subject];
  }
  // Otherwise fall back to the old unit field (only if the drill applies to this subject)
  if (drillAppliesToSubject(drill, subject)) {
    return drill.unit;
  }
  return null;
}

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
  subject: 'ap_macroeconomics' | 'ap_microeconomics'; // Deprecated: use subjects instead
  subjects?: Array<'ap_macroeconomics' | 'ap_microeconomics'>; // Array of subjects this drill applies to
  unit: number; // Deprecated: use subjectUnits instead
  subjectUnits?: Record<'ap_macroeconomics' | 'ap_microeconomics', number>; // Map each subject to its unit number
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
    completion: number; // XP for completing the drill (200)
    perMcqCorrect: number; // XP per correct MCQ (100, max 300 for all 3)
    total: number; // Total possible XP (500)
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
      comprehensionQuestions: [
        {
          id: 'gdp-comp-1',
          question: "Which formula is used to calculate nominal GDP?",
          options: [
            "Current Output × Base Year Price Level",
            "Current Output × Current Price Level",
            "Base Year Output × Current Price Level",
            "Current Output divided by the Inflation Rate"
          ],
          correctAnswer: 1, // B
          explanation: "Nominal GDP is calculated by taking the current output produced in a specific year and multiplying it by the current price level of that same year."
        },
        {
          id: 'gdp-comp-2',
          question: "What is the key difference between the formula to calculate nominal GDP and the formula to calculate real GDP?",
          options: [
            "Nominal GDP uses base year prices, while real GDP uses current prices.",
            "Nominal GDP accounts for inflation, while real GDP does not.",
            "Nominal GDP uses current prices, while real GDP uses base year prices.",
            "Nominal GDP measures production only, while real GDP measures prices only."
          ],
          correctAnswer: 2, // C
          explanation: "To calculate nominal GDP, you use the current price level. However, to calculate real GDP and filter out price changes, you multiply the current output by a constant base year price level."
        },
        {
          id: 'gdp-comp-3',
          question: "If a country's real GDP decreased from year 1 to year 2, but nominal GDP remained the same, which of the following must be true?",
          options: [
            "The price level decreased while production increased.",
            "Both the price level and production remained constant.",
            "The country produced more goods, but they were sold at lower prices.",
            "The price level increased while production decreased."
          ],
          correctAnswer: 3, // D
          explanation: "Real GDP measures actual production using constant prices; a decrease in real GDP means output (production) fell. For Nominal GDP (Price × Output) to remain the same despite a drop in Output, the Price level must have increased to offset the loss in production."
        }
      ]
    },
    stage2: {
      type: 'table',
      config: {}
    },
    stage3: {
      mcqIds: [17, 18, 19] // Replace with actual MCQ IDs
    },
    xpReward: {
      completion: 200,
      perMcqCorrect: 100,
      total: 500
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
      comprehensionQuestions: [
        {
          id: 'monopoly-comp-1',
          question: "Because a monopolist faces a downward-sloping demand curve, which of the following must occur if the firm wishes to sell a larger quantity of output?",
          options: [
            "It must lower the price of the product",
            "It must increase the price of the product",
            "It must increase its marketing budget",
            "It must reduce its production costs"
          ],
          correctAnswer: 0, // A
          explanation: "The downward-sloping demand curve dictates an inverse relationship between price and quantity. Unlike a competitive firm that can sell all it wants at the market price, a monopoly must reduce the price to induce consumers to buy a larger quantity."
        },
        {
          id: 'monopoly-comp-2',
          question: "Why does the marginal revenue curve for a single-price monopoly lie below its demand curve?",
          options: [
            "The firm faces constant returns to scale",
            "The firm must lower the price on all units to sell an additional unit",
            "The firm produces less efficient goods than competitive firms",
            "The government regulates the price the firm can charge"
          ],
          correctAnswer: 1, // B
          explanation: "To sell one more unit, a monopoly must lower the price not just for that new unit, but for all units sold. This loss of revenue on previous units means the additional revenue (marginal revenue) generated is less than the price charged for the new unit."
        },
        {
          id: 'monopoly-comp-3',
          question: "Suppose a monopoly sells 2 units at a price of 25 dollars each. To sell a 3rd unit, the firm must lower the price to 20 dollars for all customers. What is the marginal revenue of that 3rd unit?",
          options: [
            "10 dollars",
            "20 dollars",
            "25 dollars",
            "60 dollars"
          ],
          correctAnswer: 0, // A
          explanation: "Marginal Revenue is the change in Total Revenue. Initially, Total Revenue is $50 (2 units * $25). After lowering the price, Total Revenue becomes $60 (3 units * $20). The difference is $10 ($60 - $50 = $10)."
        }
      ]
    },
    stage2: {
      type: 'monopoly',
      config: {}
    },
    stage3: {
      mcqIds: [1150, 1151, 1152] // Replace with actual MCQ IDs
    },
    xpReward: {
      completion: 200,
      perMcqCorrect: 100,
      total: 500
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
      comprehensionQuestions: [
        {
          id: 'self-adj-comp-1',
          question: "What happens to nominal wages when an economy is facing a recessionary gap with a high number of unemployed workers?",
          options: [
            "They increase because firms must compete for scarce labor",
            "They remain fixed because of government price controls",
            "They decrease because there are many workers and few willing employers",
            "They fluctuate unpredictably due to market instability"
          ],
          correctAnswer: 2, // C
          explanation: "In a recessionary gap, there is a surplus of labor (unemployment). With many workers competing for few jobs, the natural market response is for nominal wages to drop."
        },
        {
          id: 'self-adj-comp-2',
          question: "In the self-adjustment process, how does a decrease in nominal wages affect the short run aggregate supply curve?",
          options: [
            "It causes the curve to shift to the right",
            "It causes the curve to shift to the left",
            "It causes a movement along the curve without shifting it",
            "It causes the curve to become vertical"
          ],
          correctAnswer: 0, // A
          explanation: "When nominal wages fall, the cost of production decreases. This encourages firms to hire more workers, which shifts the short run aggregate supply curve (SRAS) to the right, returning the economy to long-run equilibrium."
        },
        {
          id: 'self-adj-comp-3',
          question: "Which event immediately follows the existence of an output gap in the four-step process of self-adjustment described in the video?",
          options: [
            "Firms change their hiring patterns",
            "The short run aggregate supply curve shifts",
            "Aggregate demand increases or decreases",
            "Nominal wages begin to change"
          ],
          correctAnswer: 3, // D
          explanation: "The video outlines the order of events: first the economy is in an output gap, and as a direct result of that gap (either a shortage or surplus of labor), wages end up changing. Firms changing their hiring patterns happens after the wage adjustment."
        }
      ]
    },
    stage2: {
      type: 'graph',
      config: {}
    },
    stage3: {
      mcqIds: [100, 101, 102] // Replace with actual MCQ IDs
    },
    xpReward: {
      completion: 200,
      perMcqCorrect: 100,
      total: 500
    }
  },
  'absolute-and-comparative-advantage': {
    id: 'absolute-and-comparative-advantage',
    title: 'Absolute and Comparative Advantage',
    description: 'Master the concepts of absolute and comparative advantage to understand how countries benefit from specialization and trade.',
    videoUrl: 'https://apdojovideos.s3.ap-southeast-2.amazonaws.com/dojoDrills/dd_micro_1.4.mp4',
    subject: 'ap_macroeconomics', // Keep for backward compatibility
    subjects: ['ap_macroeconomics', 'ap_microeconomics'],
    unit: 1, // Keep for backward compatibility
    subjectUnits: {
      'ap_macroeconomics': 1,
      'ap_microeconomics': 1
    },
    lessonIds: ['1.3'],
    stage1: {
      videoUrl: 'https://apdojovideos.s3.ap-southeast-2.amazonaws.com/dojoDrills/dd_micro_1.4.mp4',
      comprehensionQuestions: [
        {
          id: 'comp-adv-comp-1',
          question: "When determining absolute advantage using a table that shows the number of labor hours required to produce a good, what specific value indicates that a producer has the advantage?",
          options: [
            "The larger number",
            "The smaller number",
            "The number closest to zero",
            "The number equal to the output"
          ],
          correctAnswer: 1, // B
          explanation: "The video explains that for input questions (like labor hours), you look for the smaller number because it means the producer uses fewer resources to make the product."
        },
        {
          id: 'comp-adv-comp-2',
          question: "According to the video, what calculation method should be used to find the opportunity cost when analyzing an output table?",
          options: [
            "Place the number for the other good on top of the ratio",
            "Place the number for the good itself on top of the ratio",
            "Multiply the two numbers together",
            "Subtract the smaller number from the larger number"
          ],
          correctAnswer: 0, // A
          explanation: "For output questions, the video provides the rule 'other on top,' meaning you form a ratio where the quantity of the alternative good is in the numerator."
        },
        {
          id: 'comp-adv-comp-3',
          question: "What is the result on a country's Production Possibilities Curve when it trades based on mutually beneficial terms?",
          options: [
            "The country can consume at a point outside of its curve",
            "The curve shifts inward to reflect specialization",
            "The curve shifts outward due to increased technology",
            "The country produces at a point inside the curve"
          ],
          correctAnswer: 0, // A
          explanation: "The video states that while a country is limited to producing along its curve, trading on mutually beneficial terms allows it to actually consume somewhere outside of its Production Possibilities Curve."
        }
      ]
    },
    stage2: {
      type: 'comparative-advantage',
      config: {
        type: 'input' as const,
        data: {
          headers: ['Country', 'Wheat', 'Cloth'],
          rows: [
            { country: 'USA', wheat: '10 hours', cloth: '5 hours' },
            { country: 'France', wheat: '20 hours', cloth: '15 hours' }
          ]
        },
        answers: {
          usaOpportunityCostWheat: '0.5', // 5/10 = 0.5 cloth per wheat
          franceOpportunityCostWheat: '0.75', // 15/20 = 0.75 cloth per wheat
          absoluteAdvantageCloth: 'USA' as const, // USA uses fewer hours (5 < 15)
          comparativeAdvantageWheat: 'USA' as const // USA has lower opp cost (0.5 < 0.75)
        }
      }
    },
    stage3: {
      mcqIds: [5, 6, 2084] // MCQs from ap macro unit 1, lesson 1.3
    },
    xpReward: {
      completion: 200,
      perMcqCorrect: 100,
      total: 500
    }
  },
  'supply-and-demand': {
    id: 'supply-and-demand',
    title: 'Supply & Demand',
    description: 'Master the fundamentals of supply and demand, including shifts versus movements along curves and market equilibrium.',
    videoUrl: 'https://apdojovideos.s3.ap-southeast-2.amazonaws.com/dojoDrills/dd_macro_1.6.mp4',
    subject: 'ap_macroeconomics', // Keep for backward compatibility
    subjects: ['ap_macroeconomics', 'ap_microeconomics'],
    unit: 1, // Keep for backward compatibility
    subjectUnits: {
      'ap_macroeconomics': 1,
      'ap_microeconomics': 2
    },
    lessonIds: ['1.6'],
    stage1: {
      videoUrl: 'https://apdojovideos.s3.ap-southeast-2.amazonaws.com/dojoDrills/dd_macro_1.6.mp4',
      comprehensionQuestions: [
        {
          id: 'supply-demand-comp-1',
          question: "Graphically, a change in the price of a good is represented by which of the following?",
          options: [
            "A shift of the demand curve to the right",
            "A shift of the supply curve to the left",
            "A movement along the existing supply or demand curve",
            "Simultaneous shifts of both the supply and demand curves"
          ],
          correctAnswer: 2, // C
          explanation: "A change in the price of the good itself causes a change in quantity demanded or quantity supplied, which is represented by moving along the existing curve. The curves themselves only shift when a non-price factor changes."
        },
        {
          id: 'supply-demand-comp-2',
          question: "If sellers expect the price of their product to drop significantly in the near future, how will they likely adjust their behavior in the current market?",
          options: [
            "They will decrease their current supply to wait for higher prices",
            "They will increase their current supply to sell before the price falls",
            "They will increase their demand for the product",
            "They will stop production entirely until the price stabilizes"
          ],
          correctAnswer: 1, // B
          explanation: "Sellers want to sell at the highest possible price. If they expect prices to fall next week, they are motivated to increase supply today to capture the current higher price before the drop occurs."
        },
        {
          id: 'supply-demand-comp-3',
          question: "When both the demand for and the supply of a good increase simultaneously, what is the certain impact on the market equilibrium?",
          options: [
            "The equilibrium quantity will increase",
            "The equilibrium price will increase",
            "The equilibrium quantity will decrease",
            "The equilibrium price will decrease"
          ],
          correctAnswer: 0, // A
          explanation: "An increase in demand pushes quantity up, and an increase in supply also pushes quantity up, so the equilibrium quantity definitely increases. However, demand pulls price up while supply pushes price down, making the change in price indeterminate without knowing the magnitude of the shifts."
        }
      ]
    },
    stage2: {
      type: 'demand-change',
      config: {
        scenario: 'People expect the price of this product to get WAY more expensive in the near future.',
        correctAnswer: 'shift'
      }
    },
    stage3: {
      mcqIds: [2124, 2125, 2126] // MCQs from ap macro unit 1, lesson 1.6
    },
    xpReward: {
      completion: 200,
      perMcqCorrect: 100,
      total: 500
    }
  },
  'ppc-and-opportunity-cost': {
    id: 'ppc-and-opportunity-cost',
    title: 'PPC and Opportunity Cost',
    description: 'Master the Production Possibilities Curve and understand how opportunity cost shapes economic decisions.',
    videoUrl: 'https://apdojovideos.s3.ap-southeast-2.amazonaws.com/dojoDrills/dd_macro_1.2.mp4',
    subject: 'ap_macroeconomics', // Keep for backward compatibility
    subjects: ['ap_macroeconomics', 'ap_microeconomics'],
    unit: 1, // Keep for backward compatibility
    subjectUnits: {
      'ap_macroeconomics': 1,
      'ap_microeconomics': 1
    },
    lessonIds: ['1.2'],
    stage1: {
      videoUrl: 'https://apdojovideos.s3.ap-southeast-2.amazonaws.com/dojoDrills/dd_macro_1.2.mp4',
      comprehensionQuestions: [
        {
          id: 'ppc-comp-1',
          question: "Why does a Production Possibilities Curve often have a 'bowed-out' shape rather than being a straight line?",
          options: [
            "Because resources are specialized and not perfectly adaptable between producing different goods.",
            "Because the population is shrinking, leading to reduced production capacity.",
            "Because opportunity costs are constant regardless of what is being produced.",
            "Because technology improves faster for one good than for the other."
          ],
          correctAnswer: 0, // A
          explanation: "A bowed-out curve indicates increasing opportunity costs. This occurs because resources are not easily adaptable; moving a resource from one industry to another where it is less efficient results in a significant loss of production for a relatively small gain."
        },
        {
          id: 'ppc-comp-2',
          question: "What does a point located *inside* the boundary of the Production Possibilities Curve represent?",
          options: [
            "A point of allocative efficiency where society is getting the most value.",
            "An unattainable point that requires better technology to reach.",
            "A state of underutilization where resources are not being used effectively.",
            "A point where opportunity costs are zero."
          ],
          correctAnswer: 2, // C
          explanation: "Any point within the curve represents 'underutilization,' meaning the society isn't using its resources effectively and could potentially produce more of both items without needing new resources."
        },
        {
          id: 'ppc-comp-3',
          question: "Which of the following scenarios would cause a country's PPC to shift outward, making previously unattainable points attainable?",
          options: [
            "A decrease in the working-age population.",
            "A decision to produce more consumer goods and fewer capital goods.",
            "Moving from a point inside the curve to a point on the curve.",
            "The discovery of new natural resources or an improvement in technology."
          ],
          correctAnswer: 3, // D
          explanation: "An outward shift occurs due to an increase in the factors of production. Specific drivers include developing better technology, finding new natural resources, or population growth."
        }
      ]
    },
    stage2: {
      type: 'ppc-drill',
      config: {}
    },
    stage3: {
      mcqIds: [2, 3, 4] // MCQs from ap macro unit 1, lesson 1.2
    },
    xpReward: {
      completion: 200,
      perMcqCorrect: 100,
      total: 500
    }
  },
  'elasticity-and-revenue': {
    id: 'elasticity-and-revenue',
    title: 'Elasticity and Revenue',
    description: 'Master the relationship between price elasticity of demand and total revenue by drawing demand curves.',
    videoUrl: 'https://apdojovideos.s3.ap-southeast-2.amazonaws.com/dojoDrills/dd_micro_elasticity.mp4',
    subject: 'ap_microeconomics',
    unit: 2,
    lessonIds: [],
    stage1: {
      videoUrl: 'https://apdojovideos.s3.ap-southeast-2.amazonaws.com/dojoDrills/dd_micro_elasticity.mp4',
      comprehensionQuestions: [
        {
          id: '1',
          question: 'A firm determines that the demand for its product is price inelastic. Based on the total revenue test, what strategy should the firm pursue if it wants to increase its total revenue?',
          options: [
            'Lower the price to attract significantly more customers.',
            'Raise the price, as the quantity demanded will decrease by a smaller percentage.',
            'Keep the price the same, as price changes do not affect revenue for inelastic goods.',
            'Increase the supply of the good to lower production costs.'
          ],
          correctAnswer: 1, // B
          explanation: 'When demand is inelastic (elasticity < 1), consumers are not very responsive to price changes. Therefore, raising the price leads to an increase in total revenue because the percentage increase in price outweighs the relatively small percentage decrease in the quantity of units sold.'
        },
        {
          id: '2',
          question: 'How does the time horizon available to a consumer affect the price elasticity of demand for a product?',
          options: [
            'Demand becomes more elastic as the time horizon increases.',
            'Demand becomes less elastic as the time horizon increases.',
            'The time horizon has no impact on elasticity, only the number of substitutes does.',
            'Demand becomes perfectly inelastic in the long run.'
          ],
          correctAnswer: 0, // A
          explanation: 'The amount of time a consumer has to make a decision is a key determinant of elasticity. When consumers have a longer time horizon (e.g., weeks or months), they can be more selective and find substitutes, making their demand more elastic compared to a situation where they need a good immediately.'
        },
        {
          id: '3',
          question: 'If a 20% increase in the price of a good leads to a 5% decrease in the quantity demanded, what is the elasticity coefficient and how is the demand classified?',
          options: [
            '4.0; Elastic',
            '0.25; Elastic',
            '4.0; Inelastic',
            '0.25; Inelastic'
          ],
          correctAnswer: 3, // D
          explanation: 'Price elasticity of demand is calculated as the absolute value of the percentage change in quantity divided by the percentage change in price ($5\\% / 20\\% = 0.25$). Since the resulting coefficient is less than 1, the demand for the good is classified as inelastic.'
        }
      ]
    },
    stage2: {
      type: 'elasticity-revenue',
      config: {
        scenario: 'A gas station increases the price of gasoline. Despite the price increase, drivers continue to purchase roughly the same amount because they have no close substitutes and need gasoline for their daily commute.',
        correctAnswer: 'inelastic'
      }
    },
    stage3: {
      mcqIds: [84, 2064, 2072] // Elasticity and total revenue test questions
    },
    xpReward: {
      completion: 200,
      perMcqCorrect: 100,
      total: 500
    }
  },
  'consumer-producer-surplus': {
    id: 'consumer-producer-surplus',
    title: 'Consumer Surplus and Producer Surplus',
    description: 'Identify Consumer Surplus and Producer Surplus areas on a supply and demand graph.',
    videoUrl: 'https://apdojovideos.s3.ap-southeast-2.amazonaws.com/dojoDrills/dd_micro_2.6.mp4',
    subject: 'ap_microeconomics',
    unit: 2,
    lessonIds: [],
    stage1: {
      videoUrl: 'https://apdojovideos.s3.ap-southeast-2.amazonaws.com/dojoDrills/dd_micro_2.6.mp4',
      comprehensionQuestions: [
        {
          id: '1',
          question: 'Which of the following best defines consumer surplus?',
          options: [
            'The difference between the price a producer is willing to accept and the price they actually receive.',
            'The difference between the maximum price a consumer is willing to pay and the price they actually pay.',
            'The sum of the quantity supplied and the quantity demanded at the equilibrium price.',
            'The area below the supply curve and above the equilibrium price.'
          ],
          correctAnswer: 1, // B
          explanation: 'Consumer surplus is defined as the difference between a consumer\'s willingness to pay (the maximum amount they would spend) and the actual market price they end up paying.'
        },
        {
          id: '2',
          question: 'Graphically, how is total producer surplus represented in a market without government intervention?',
          options: [
            'The area above the equilibrium price and below the demand curve.',
            'The area below the equilibrium price and above the supply curve.',
            'The total area between the supply and demand curves up to the quantity exchanged.',
            'The area below the supply curve and above the horizontal axis.'
          ],
          correctAnswer: 1, // B
          explanation: 'Producer surplus represents the benefit to sellers and is found graphically by measuring the area below the equilibrium price line and above the supply curve.'
        },
        {
          id: '3',
          question: 'When a binding price floor is imposed on a market, why is there a loss in total economic surplus?',
          options: [
            'Because consumers are forced to buy more goods than they want at the higher price.',
            'Because the quantity of goods actually exchanged in the market decreases.',
            'Because the government collects the surplus as tax revenue.',
            'Because producers lower their prices to compete for fewer customers.'
          ],
          correctAnswer: 1, // B
          explanation: 'A binding price floor raises the price above equilibrium, which reduces the quantity demanded by buyers. Since trades can only happen if someone is willing to buy, the quantity exchanged decreases. This reduction in trades creates deadweight loss, which represents the potential surplus from transactions that no longer occur.'
        }
      ]
    },
    stage2: {
      type: 'consumer-producer-surplus',
      config: {}
    },
    stage3: {
      mcqIds: [84, 2064, 2072] // Elasticity and total revenue test questions
    },
    xpReward: {
      completion: 200,
      perMcqCorrect: 100,
      total: 500
    }
  },
  'foreign-exchange-market': {
    id: 'foreign-exchange-market',
    title: 'The Foreign Exchange Market',
    description: 'Master the fundamentals of foreign exchange markets, currency appreciation and depreciation, and the factors that drive currency demand and supply.',
    videoUrl: 'https://apdojovideos.s3.ap-southeast-2.amazonaws.com/dojoDrills/dd_macro_6.3.mp4',
    subject: 'ap_macroeconomics',
    unit: 6,
    lessonIds: ['6.3'],
    stage1: {
      videoUrl: 'https://apdojovideos.s3.ap-southeast-2.amazonaws.com/dojoDrills/dd_macro_6.3.mp4',
      comprehensionQuestions: [
        {
          id: 'forex-comp-1',
          question: 'If United States citizens increase their demand for goods produced in Japan, how will this affect the supply of U.S. dollars and the demand for Japanese yen in the foreign exchange market?',
          options: [
            'Supply of U.S. dollars increases; Demand for Japanese yen increases.',
            'Supply of U.S. dollars decreases; Demand for Japanese yen increases.',
            'Supply of U.S. dollars increases; Demand for Japanese yen decreases.',
            'Supply of U.S. dollars decreases; Demand for Japanese yen decreases.'
          ],
          correctAnswer: 0, // A
          explanation: 'To purchase goods from Japan, U.S. citizens must exchange their dollars for yen. This simultaneous action increases the demand for the foreign currency (yen) while increasing the supply of the domestic currency (dollars) on the global market.'
        },
        {
          id: 'forex-comp-2',
          question: 'In a floating exchange rate system involving only the U.S. dollar and the Euro, if the Euro appreciates in value, what must necessarily happen to the U.S. dollar?',
          options: [
            'The U.S. dollar depreciates.',
            'The U.S. dollar also appreciates.',
            'The value of the U.S. dollar remains unchanged.',
            'The supply of the U.S. dollar shifts to the left.'
          ],
          correctAnswer: 0, // A
          explanation: 'Currencies in a floating exchange rate system function like a seesaw. If the value of one currency rises (appreciates) relative to another, the value of the other currency must fall (depreciate). It is impossible for both currencies to appreciate against one another simultaneously.'
        },
        {
          id: 'forex-comp-3',
          question: 'Which of the following best summarizes the two primary reasons why a demand for a foreign currency exists?',
          options: [
            'To pay for domestic government spending and to reduce inflation.',
            'To purchase foreign goods/services and to purchase foreign financial assets.',
            'To increase the domestic money supply and to lower interest rates.',
            'To decrease the trade deficit and to increase tariffs.'
          ],
          correctAnswer: 1, // B
          explanation: 'The demand for a foreign currency is derived from the desire to buy things denominated in that currency. This primarily includes purchasing foreign products (imports) or purchasing foreign financial assets, such as government bonds or stocks in foreign companies.'
        }
      ]
    },
    stage2: {
      type: 'graph',
      config: {}
    },
    stage3: {
      mcqIds: [0, 0, 0] // Replace with actual MCQ IDs from unit 6 foreign exchange questions
    },
    xpReward: {
      completion: 200,
      perMcqCorrect: 100,
      total: 500
    }
  },
  'phillips-curve-ad-as-graph': {
    id: 'phillips-curve-ad-as-graph',
    title: 'Phillips Curve & AD-AS Graph',
    description: 'Understanding the relationship between the Phillips Curve and the AD-AS model, including how changes in aggregate demand and supply affect inflation and unemployment.',
    videoUrl: 'https://apdojovideos.s3.ap-southeast-2.amazonaws.com/dojoDrills/dd_macro_5.2.mp4',
    subject: 'ap_macroeconomics',
    unit: 5,
    lessonIds: ['5.2'],
    stage1: {
      videoUrl: 'https://apdojovideos.s3.ap-southeast-2.amazonaws.com/dojoDrills/dd_macro_5.2.mp4',
      comprehensionQuestions: [
        {
          id: 'phillips-comp-1',
          question: 'If consumer optimism leads to an increase in Aggregate Demand, how is this change represented on the Short-Run Phillips Curve (SRPC)?',
          options: [
            'The SRPC shifts to the right.',
            'The SRPC shifts to the left.',
            'There is a movement upward and to the left along the SRPC.',
            'There is a movement downward and to the right along the SRPC.'
          ],
          correctAnswer: 2, // C
          explanation: 'An increase in Aggregate Demand leads to a higher price level (inflation) and higher output (lower unemployment). On the Phillips Curve, this inverse relationship is represented by a movement along the existing curve to a point with higher inflation and lower unemployment.'
        },
        {
          id: 'phillips-comp-2',
          question: 'How does a negative supply shock, such as a sudden decrease in the availability of oil, affect the Short-Run Phillips Curve?',
          options: [
            'The curve shifts to the right, indicating higher inflation and higher unemployment.',
            'The curve shifts to the left, indicating lower inflation and lower unemployment.',
            'There is a movement along the curve to the right, indicating higher unemployment but lower inflation.',
            'There is a movement along the curve to the left, indicating lower unemployment but higher inflation.'
          ],
          correctAnswer: 0, // A
          explanation: 'A negative supply shock shifts the Short-Run Aggregate Supply curve to the left, causing stagflation (higher price levels and lower output). Since both inflation and unemployment increase simultaneously, the inverse relationship of the SRPC breaks down, and the entire curve shifts to the right.'
        },
        {
          id: 'phillips-comp-3',
          question: 'What does the vertical shape of the Long-Run Phillips Curve (LRPC) indicate about the relationship between inflation and unemployment in the long run?',
          options: [
            'As inflation increases, unemployment decreases permanently.',
            'As inflation decreases, unemployment increases permanently.',
            'The economy produces at the natural rate of unemployment regardless of the inflation rate.',
            'The economy cannot sustain any level of inflation without causing hyperinflation.'
          ],
          correctAnswer: 2, // C
          explanation: 'In the long run, the economy returns to its potential output and the natural rate of unemployment. Changes in the money supply or price level may alter the inflation rate, but they do not create permanent jobs or change real output, resulting in a vertical LRPC at the natural rate of unemployment.'
        }
      ]
    },
    stage2: {
      type: 'graph',
      config: {}
    },
    stage3: {
      mcqIds: [0, 0, 0] // Replace with actual MCQ IDs from unit 5 Phillips Curve questions
    },
    xpReward: {
      completion: 200,
      perMcqCorrect: 100,
      total: 500
    }
  },
  'the-money-market-graph': {
    id: 'the-money-market-graph',
    title: 'The Money Market Graph',
    description: 'Master the money market graph, understanding money demand, money supply, and how the Federal Reserve influences interest rates.',
    videoUrl: 'https://apdojovideos.s3.ap-southeast-2.amazonaws.com/dojoDrills/dd_macro_4.5.mp4',
    subject: 'ap_macroeconomics',
    unit: 4,
    lessonIds: ['4.5'],
    stage1: {
      videoUrl: 'https://apdojovideos.s3.ap-southeast-2.amazonaws.com/dojoDrills/dd_macro_4.5.mp4',
      comprehensionQuestions: [
        {
          id: 'money-market-comp-1',
          question: 'Why is the money demand curve downward sloping?',
          options: [
            'As the price level rises, people need more money to purchase goods.',
            'As nominal interest rates increase, the opportunity cost of holding cash increases.',
            'As nominal interest rates decrease, banks are less willing to lend money.',
            'As the money supply increases, the value of the currency decreases.'
          ],
          correctAnswer: 1, // B
          explanation: 'The downward slope is due to the opportunity cost of holding liquid money. When interest rates are high, holding cash means missing out on the interest that could be earned in savings accounts or bonds. Therefore, at high interest rates, the quantity of money demanded is low.'
        },
        {
          id: 'money-market-comp-2',
          question: 'Which of the following changes would cause the money demand curve to shift to the right?',
          options: [
            'A decrease in the nominal interest rate.',
            'An increase in the price level or an increase in Real GDP.',
            'A decrease in the price level or a decrease in Real GDP.',
            'An open market purchase of bonds by the Federal Reserve.'
          ],
          correctAnswer: 1, // B
          explanation: 'Money demand shifts when people need more or less cash for transactions at every interest rate. An increase in the price level (goods are more expensive) or an increase in Real GDP (people have more income/wealth to spend) both increase the demand for liquid money.'
        },
        {
          id: 'money-market-comp-3',
          question: 'Which of the following best describes the shape and determinant of the money supply curve?',
          options: [
            'Upward sloping, determined by the willingness of banks to lend.',
            'Downward sloping, determined by the demand for loans.',
            'Vertical, determined by the policies of the Federal Reserve.',
            'Horizontal, determined by the target federal funds rate.'
          ],
          correctAnswer: 2, // C
          explanation: 'The money supply curve is vertical because the quantity of money in the economy is controlled by the central bank (the Federal Reserve), independent of the current nominal interest rate.'
        }
      ]
    },
    stage2: {
      type: 'graph',
      config: {}
    },
    stage3: {
      mcqIds: [0, 0, 0] // Replace with actual MCQ IDs from unit 4 money market questions
    },
    xpReward: {
      completion: 200,
      perMcqCorrect: 100,
      total: 500
    }
  },
  'monetary-policy': {
    id: 'monetary-policy',
    title: 'Monetary Policy',
    description: 'Master monetary policy tools and their effects on the money supply, interest rates, and aggregate demand.',
    videoUrl: 'https://apdojovideos.s3.ap-southeast-2.amazonaws.com/dojoDrills/dd_macro_4.6.mp4',
    subject: 'ap_macroeconomics',
    unit: 4,
    lessonIds: ['4.6'],
    stage1: {
      videoUrl: 'https://apdojovideos.s3.ap-southeast-2.amazonaws.com/dojoDrills/dd_macro_4.6.mp4',
      comprehensionQuestions: [
        {
          id: 'monetary-policy-comp-1',
          question: 'Which of the following best describes the effect of expansionary monetary policy on the economy?',
          options: [
            'The money supply decreases, nominal interest rates increase, and aggregate demand decreases.',
            'The money supply increases, nominal interest rates decrease, and aggregate demand increases.',
            'The money supply increases, nominal interest rates increase, and aggregate demand decreases.',
            'The money supply decreases, nominal interest rates decrease, and aggregate demand increases.'
          ],
          correctAnswer: 1, // B
          explanation: 'Expansionary policy aims to grow the economy. By shifting the money supply curve to the right (increasing money supply), the equilibrium nominal interest rate falls. Lower interest rates incentivize borrowing and spending, leading to an increase in aggregate demand.'
        },
        {
          id: 'monetary-policy-comp-2',
          question: 'How does a decrease in the required reserve ratio affect the money supply?',
          options: [
            'It decreases the money supply because banks must hold more money in their vaults.',
            'It increases the money supply because banks can lend out a larger percentage of deposits.',
            'It has no effect on the money supply, only on the interest rate banks charge each other.',
            'It decreases the money supply because it discourages individuals from depositing money.'
          ],
          correctAnswer: 1, // B
          explanation: 'The required reserve ratio determines the portion of deposits banks must keep. Lowering this ratio allows banks to lend out a greater fraction of every dollar deposited. These loans circulate through the economy, creating more deposits and loans, which expands the overall money supply.'
        },
        {
          id: 'monetary-policy-comp-3',
          question: 'According to the video, what is the impact of the Federal Reserve buying government bonds?',
          options: [
            'It removes money from the economy, decreasing the money supply (Selling makes it smaller).',
            'It injects money into the economy, increasing the money supply (Buy makes it bigger).',
            'It increases the discount rate, making borrowing more expensive for commercial banks.',
            'It forces commercial banks to increase their required reserves.'
          ],
          correctAnswer: 1, // B
          explanation: 'When the Fed buys government bonds from banks or investors, it pays for them with money. This transaction moves bonds into the Fed and moves liquid money out into the general economy, thereby increasing the money supply. A helpful mnemonic is \'Buy = Bigger\'.'
        }
      ]
    },
    stage2: {
      type: 'graph',
      config: {}
    },
    stage3: {
      mcqIds: [0, 0, 0] // Replace with actual MCQ IDs from unit 4 monetary policy questions
    },
    xpReward: {
      completion: 200,
      perMcqCorrect: 100,
      total: 500
    }
  }
};



