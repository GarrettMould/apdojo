export interface FRQSubPart {
  label: string;
  text: string;
  answerType?: 'draw' | 'text';
  answer?: string | any;
  gradingCriteria?: string; // Detailed instructions for AI grader (not shown to students)
  studentExplanation?: string; // Student-friendly explanation shown in UI
  videoUrl?: string;
  videoAspectRatio?: 'vertical' | 'horizontal';
  pointValue?: number;
  referenceImageUrl?: string; // Reference image for drawing comparison (answer key)
}

export interface FRQPart {
  label: string;
  text: string;
  answerType?: 'draw' | 'text'; // Made optional
  answer?: string | any;
  subparts?: FRQSubPart[];
  gradingCriteria?: string; // Detailed instructions for AI grader (not shown to students)
  studentExplanation?: string; // Student-friendly explanation shown in UI
  videoUrl?: string;
  videoAspectRatio?: 'vertical' | 'horizontal';
  pointValue?: number;
  referenceImageUrl?: string; // Reference image for drawing comparison (answer key)
  templateImageUrl?: string; // Template image to show as background in drawing pad
}

// Interface for the table data within an FRQ
export interface FRQTableData {
  headers: string[];
  rows: (string | number)[][];
  rowHeaders?: boolean; // Optional: to treat the first cell of each row as a header
  playerNames?: { row: string; column: string }; // To label the axes of a matrix
}

export interface FRQQuestion {
  id: number;
  subject: ('macro' | 'micro') | ('macro' | 'micro')[];
  title: string;
  questionNumber: number;
  prompt: string;
  image?: string | any;
  tableData?: FRQTableData;
  parts: FRQPart[];
  difficulty?: 'easy' | 'medium' | 'hard' | 'extreme';
  expertTip?: string;
  isLocked?: boolean;
}

export interface FRQExam {
  examTitle: string;
  thumbnailUrl: string;
  unit: number;
  questions: FRQQuestion[];
}

// Define image paths - some are placeholders for now
const OUTPUTLOW = '/images/frqPracticePage/OUTPUTLOW.svg';
const PRDOWN = '/images/frqPracticePage/PRDOWN.svg';
const microUnit5FRQA1D = '/images/frqPracticePage/microUnit5Set1D.jpg';
const microUnit5FRQA1E = '/images/frqPracticePage/microUnit5Set1E.jpg';
const macroSetOneFRQA5APlaceholder = '/images/frqPracticePage/logo.png';
const macroSetOneFRQA5CPlaceholder = '/images/frqPracticePage/logo.png';
const macroMoneyMarketBuy = '/images/frqPracticePage/macroMoneyMarketBuy.png';
const macroLoanableFundsFiscal = '/images/frqPracticePage/macroLoanableFundsFiscal.png';
const macroUnit4Set1A = '/images/frqPracticePage/macroUnit4Set1A.jpg';
const macroUnit4Set1C = '/images/frqPracticePage/macroUnit4Set1C.jpg';

export const macroUnit4Set1: FRQExam = {
  examTitle: "AP Macroeconomics Unit 4 FRQ: Ample Reserves",
  thumbnailUrl: "/images/frqPracticePage/unit4MacroFRQCover.jpg",
  unit: 4,
  questions: [
    {
      id: 1,
      subject: 'macro',
      title: 'Unit 4 FRQ - Ample Reserves',
      questionNumber: 4,
      difficulty: 'medium',
      prompt: "Assume the economy of Northland is currently operating below full employment and the banking system has ample reserves.",
      expertTip: "Many monetary policy tools designed for a limited reserves system, like changing the required reserve ratio, are ineffective in an ample reserves system. The Fed's primary tools in an ample reserves system are administered interest rates.",
      image: null,
      parts: [
        {
          label: "A",
          pointValue: 2,
          text: "Draw a correctly labeled graph of the long-run aggregate supply, short-run aggregate supply, and aggregate demand curves, and show each of the following.",
          answerType: "draw" as const,
          answer: macroUnit4Set1A,
          referenceImageUrl: "/images/frqPracticePage/macroUnit4Set1A.jpg",
          gradingCriteria: "2 points: Graph correctly shows LRAS (vertical), SRAS (upward sloping), and AD (downward sloping) curves with properly labeled axes (Real GDP/Output on X-axis, Price Level on Y-axis). Current equilibrium (Y1, PL1) is shown at the intersection of AD and SRAS, positioned to the left of LRAS. Full-employment output (Yf) is labeled on the LRAS curve. 1 point: Graph shows most elements correctly but is missing one key component (e.g., missing axis labels, incorrect curve slopes, or missing equilibrium labels). 0 points: Graph does not meet the criteria or is completely incorrect.",
          videoUrl: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/frqExplanations/U4V1.mp4",
          subparts: [
            {
              label: "i",
              text: "Current equilibrium real output and price level, labeled Y1 and PL1, respectively.",
              // No answerType - this is informational only, provides context for the drawing
              answer: "The graph should show the intersection of AD and SRAS (Y1 and PL1) to the left of the LRAS curve.",
              gradingCriteria: "2 points: Correctly identifies and labels the current equilibrium point (Y1, PL1) at the intersection of AD and SRAS, positioned to the left of LRAS. 1 point: Identifies the equilibrium but labels are missing or incorrectly positioned. 0 points: Does not correctly identify or label the equilibrium.",
            },
            {
              label: "ii",
              text: "Full-employment output, labeled Yf.",
              // No answerType - this is informational only, provides context for the drawing
              answer: "Yf should be labeled at the vertical LRAS curve, to the right of Y1.",
              gradingCriteria: "2 points: Correctly labels Yf at the vertical LRAS curve, positioned to the right of Y1. 1 point: Labels Yf but position is incorrect relative to Y1 or LRAS. 0 points: Does not correctly label Yf.",
            }
          ]
        },
        {
          label: "B",
          pointValue: 1,
          text: "Identify one specific monetary policy action the central bank would take to restore full employment.",
          answerType: "text" as const,
          answer: "Decrease the interest on reserves (IOR) rate.",
          videoUrl: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/frqExplanations/U4V2.mp4",
        },
        {
          label: "C",
          pointValue: 2,
          text: "Draw a correctly labeled graph of the reserve market and show the effect of the monetary policy action identified in part (B) on the policy rate.",
          answerType: "draw" as const,
          answer: macroUnit4Set1C,
          gradingCriteria: "2 points: Graph correctly shows the reserve market with properly labeled axes (Reserves/Quantity of Reserves on X-axis, Interest Rate/Policy Rate on Y-axis). Demand for reserves curve and supply of reserves curve are shown. The effect of decreasing IOR is correctly illustrated (supply curve shifts down or demand shifts appropriately), resulting in a decrease in the policy rate. 1 point: Graph shows most elements correctly but is missing one key component (e.g., missing axis labels, incorrect curve representation, or missing policy effect). 0 points: Graph does not meet the criteria or is completely incorrect.",
          videoUrl: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/frqExplanations/U4V3.mp4",
          referenceImageUrl: "/images/frqPracticePage/macroUnit4Set1C.jpg",
        },
        {
          label: "D",
          pointValue: 1,
          text: "Based on the change in the policy rate shown in part (C), will the quantity of investment demanded increase, decrease, or stay the same?",
          answerType: "text" as const,
          answer: "Increase. Explanation: The decrease in the policy rate reduces the cost of borrowing, which incentivizes businesses to increase investment spending.",
          videoUrl: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/frqExplanations/U4V4.mp4",
        },
        {
          label: "E",
          pointValue: 2,
          text: "Assume the Northlandian government decides to implement a fiscal policy to restore full employment instead of monetary policy. If the government increases spending, how will this affect the national debt? Explain.",
          answerType: "text" as const,
          answer: "The national debt will increase. Explanation: Increased government spending, assuming tax revenue remains constant or does not increase proportionately, will lead to a budget deficit, which is financed by borrowing, thereby adding to the national debt.",
          videoUrl: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/frqExplanations/U4V5.mp4",
        }
      ]
    },
  ]
};

export const microUnit5Set1: FRQExam = {
  examTitle: "AP Microeconomics Unit 5 FRQ: Factor Markets",
  thumbnailUrl: "/images/frqPracticePage/U5FRQMicro.jpg",
  unit: 5,
  questions: [
    {
      id: 2,
      subject: 'micro',
      title: 'Unit 5 FRQ - Factor Markets',
      questionNumber: 1,
      prompt: "The table below shows the daily production data for a firm operating in a perfectly competitive product market and a perfectly competitive labor market. The firm sells its product for $10 per unit, and the market wage rate for workers is $150 per day.",
      expertTip: "The profit-maximizing rule for hiring is MRP = MRC. A common mistake is stopping at the last worker where MRP is greater than MRC, instead of the one where they are equal. If MRP is still greater, you should hire the next worker!",
      image: null,
      tableData: {
        headers: ["Number of Workers", "Total Product"],
        rows: [
          [0, 0],
          [1, 20],
          [2, 45],
          [3, 65],
          [4, 80],
          [5, 90],
          [6, 95]
        ]
      },
      parts: [
        {
          label: "A",
          pointValue: 2,
          text: "Identify the number of workers at which diminishing marginal returns first sets in. Explain.",
          answerType: "text" as const,
          answer: "Diminishing marginal returns set in with the 3rd worker. Explanation: The marginal product (MP) of the 2nd worker is 25 (45 - 20), while the MP of the 3rd worker is 20 (65 - 45). Since 20 < 25, marginal product has begun to decrease.",
          videoUrl: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/frqExplanations/ID2QA.mp4",
          videoAspectRatio: 'vertical',
        },
        {
          label: "B",
          pointValue: 2,
          text: "Should the firm hire the 3rd worker? Explain using marginal analysis.",
          answerType: "text" as const,
          answer: "Yes, the firm should hire the 3rd worker. Explanation: The Marginal Revenue Product (MRP) of the 3rd worker is $200 (MP of 20 units * $10 price). The Marginal Resource Cost (MRC) is the wage of $150. Since MRP ($200) > MRC ($150), hiring the worker adds to total profit.",
          videoUrl: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/frqExplanations/ID2QB.mp4",
          videoAspectRatio: 'vertical',
        },
        {
          label: "C",
          pointValue: 1,
          text: "Calculate the profit-maximizing number of workers this firm should hire.",
          answerType: "text" as const,
          answer: "4 workers. Explanation: At 4 workers, the MP is 15 (80 - 65). The MRP is $150 (15 * $10). The MRC is $150. The firm hires up to the point where MRP = MRC.",
          videoUrl: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/frqExplanations/ID2QC.mp4",
          videoAspectRatio: 'vertical',
        },
        {
          label: "D",
          pointValue: 2,
          text: "Draw a correctly labeled graph of the labor market and the firm side-by-side.",
          answerType: "draw" as const,
          answer: microUnit5FRQA1D,
          referenceImageUrl: microUnit5FRQA1D,
          videoUrl: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/frqExplanations/ID2QD.mp4",
          videoAspectRatio: 'vertical',
          subparts: [
            {
               label: "i",
               text: "Show the equilibrium wage (We) and quantity (Qe) in the market, and the wage (We) and quantity (Qf) for the firm.",
            },
            {
               label: "ii",
               text: "Ensure the firm's graph clearly labels the demand for labor (MRP) and the supply of labor (MRC).",
            }
          ]
        },
        {
          label: "E",
          pointValue: 2,
          text: "Assume the government implements a new regulation that limits the number of workers certified to work in this specific industry.",
          // answerType and answer removed from parent
          subparts: [
            {
              label: "i",
              pointValue: 2,
              text: "Show the impact of this change on your graphs in part (D).",
              answerType: "draw" as const,
              answer: microUnit5FRQA1E,
              referenceImageUrl: microUnit5FRQA1E,
              videoUrl: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/frqExplanations/ID2QE.mp4",
              videoAspectRatio: 'vertical',
            },
            {
              label: "ii",
              pointValue: 2,
              text: "What happens to the profit-maximizing quantity of workers hired by the firm? Explain.",
              answerType: "text" as const,
              answer: "The profit-maximizing quantity of workers will decrease. Explanation: The regulation decreases the market supply of labor, shifting the market supply curve left and increasing the equilibrium wage (We). Because the firm is a wage taker, its MRC shifts upward. The new higher MRC intersects the MRP curve at a lower quantity of labor.",
            }
          ]
        }
      ]
    }
  ]
};

export const microUnit4Set2: FRQExam = {
  examTitle: "AP Microeconomics Unit 4 FRQ: Game Theory",
  thumbnailUrl: '/images/frqPracticePage/microUnit4Set3.svg', // Using existing image as fallback
  unit: 4,
  questions: [
    {
      id: 3,
      subject: 'micro',
      title: 'Unit 4 FRQ - Game Theory',
      questionNumber: 1,
      prompt: "Two rival coffee shops, 'Stacey's Coffee' and 'Daily Grind,' are the only two coffee providers in a small town. They are considering whether to launch a new advertising campaign or not. The payoff matrix below shows the daily profits for each firm based on their decision. The first entry in each cell represents the profit for Stacey's Coffee, and the second entry represents the profit for Daily Grind.",
      expertTip: "When identifying a dominant strategy, you must check one player's choices against ALL of the other player's possible actions. Don't just assume a strategy is dominant after checking one scenario.",
      image: undefined, 
      tableData: {
        headers: ["", "Advertise", "Do Not Advertise"],
        rows: [
          ["Advertise", "$500, $500", "$1,000, $200"],
          ["Do Not Advertise", "$200, $1,000", "$800, $800"]
        ],
        rowHeaders: true,
        playerNames: {
          row: "Stacey's Coffee",
          column: "Daily Grind"
        }
      },
      parts: [
        {
          label: "A",
          pointValue: 1,
          text: "If 'Stacey's Coffee' chooses to Advertise and 'Daily Grind' chooses Not to Advertise, what is the daily profit for 'Daily Grind'?",
          answerType: "text",
          answer: "$200. Explanation: This corresponds to the top-right cell of the matrix. Stacey's Coffee earns $1,000 and Daily Grind earns $200.",
        },
        {
          label: "B",
          pointValue: 2,
          text: "Does 'Daily Grind' have a dominant strategy? Explain using specific values from the payoff matrix.",
          answerType: "text",
          answer: "Yes, Daily Grind has a dominant strategy to Advertise. Explanation: If Stacey's Coffee chooses to Advertise, Daily Grind is better off Advertising ($500) than Not Advertising ($200). If Stacey's Coffee chooses Not to Advertise, Daily Grind is better off Advertising ($1,000) than Not Advertising ($800). Since Advertising yields a higher payoff regardless of the opponent's choice, it is a dominant strategy.",
        },
        {
          label: "C",
          pointValue: 2,
          text: "Identify the Nash Equilibrium for this game. Explain why this outcome is a Nash Equilibrium.",
          answerType: "text",
          answer: "The Nash Equilibrium is for both firms to Advertise (Stacey's Coffee: $500, Daily Grind: $500). Explanation: At this outcome, neither firm has an incentive to deviate. If Stacey's Coffee switches to 'Not Advertise', their profit falls from $500 to $200. If Daily Grind switches to 'Not Advertise', their profit falls from $500 to $200.",
        },
        {
          label: "D",
          pointValue: 1,
          text: "Suppose the two firms agree to cooperate and form a cartel to maximize their combined profits. If both firms stick to the agreement, what will be the profit for 'Stacey's Coffee'?",
          answerType: "text",
          answer: "$800. Explanation: To maximize combined profits, both firms would agree to 'Not Advertise', resulting in the bottom-right cell where both earn $800.",
        }
      ]
    }
  ]
};

export const macroUnit4Set3: FRQExam = {
  examTitle: "AP Macroeconomics Unit 4 FRQ: The Banking System",
  thumbnailUrl: "/images/frqPracticePage/unit4MacroFRQCover.jpg",
  unit: 4,
  questions: [
    {
      id: 4,
      subject: 'macro',
      title: 'Unit 4 FRQ - Banking & Money Creation',
      questionNumber: 1,
      prompt: "The central bank purchases $10,000 worth of government bonds from Sarah, who deposits the entire proceeds into her checking account at 'First City Bank.' The banking system has limited reserves, and the required reserve ratio is 20%.",
      expertTip: "When calculating the 'Maximum Change in Money Supply', remember to determine if the injection is 'new money' (like a Fed purchase) or existing currency deposited. A Fed purchase adds entirely new reserves to the system, triggering the full multiplier effect.",
      image: undefined,
      tableData: undefined,
      parts: [
        {
          label: "A",
          pointValue: 2,
          text: "What is the amount by which First City Bank's liabilities have changed as a result of Sarah's deposit? Explain.",
          answerType: "text",
          answer: "Liabilities increased by $10,000. Explanation: When Sarah deposits the money, the bank now owes that money back to her on demand. Therefore, the demand deposit (a liability to the bank) increases by the full amount of the deposit.",
        },
        {
          label: "B",
          pointValue: 1,
          text: "Calculate the change in excess reserves for First City Bank immediately after the deposit. Show your work.",
          answerType: "text",
          answer: "$8,000. Explanation: The required reserves are 20% of $10,000, which equals $2,000. Excess reserves = Total Reserves - Required Reserves. $10,000 - $2,000 = $8,000.",
        },
        {
          label: "C",
          pointValue: 1,
          text: "What is the dollar value of the maximum amount of new loans First City Bank can initially make as a result of this deposit?",
          answerType: "text",
          answer: "$8,000. Explanation: A single bank can only lend out its excess reserves. Since First City Bank has $8,000 in excess reserves calculated in part (b), this is the maximum amount they can initially lend.",
        },
        {
          label: "D",
          pointValue: 1,
          text: "Based on the central bank's open-market purchase of bonds, calculate the maximum amount by which the money supply can change throughout the entire banking system. Show your work.",
          answerType: "text",
          answer: "$50,000. Explanation: The money multiplier is 1 / Reserve Ratio (1 / 0.20 = 5). Since the Central Bank purchase injected $10,000 of new monetary base into the system, the total maximum change is the Initial Injection x Money Multiplier ($10,000 x 5 = $50,000).",
        },
        {
          label: "E",
          pointValue: 2,
          text: "How will the central bank's purchase of bonds described in the prompt affect the nominal interest rate in the short run? Explain.",
          answerType: "text",
          answer: "The nominal interest rate will decrease. Explanation: The central bank's purchase of bonds increases the money supply. An increase in the money supply shifts the vertical money supply curve to the right, lowering the equilibrium nominal interest rate.",
        }
      ]
    }
  ]
};

export const macroUnit4Set4: FRQExam = {
  examTitle: "AP Macroeconomics Unit 4 FRQ: Inflationary Gaps and Ample Reserves",
  thumbnailUrl: "/images/frqPracticePage/unit4MacroFRQCover.jpg",
  unit: 4,
  questions: [
    {
      id: 101,
      subject: 'macro',
      title: 'FRQ 1 - Inflationary Gaps and Ample Reserves',
      questionNumber: 1,
      prompt: "Assume that the economy of Zephyria is currently operating above full employment.",
      expertTip: "In an ample reserves framework, the central bank relies on administered interest rates (like the Interest on Reserve Balances, or IORB) rather than open market operations to steer the policy rate.",
      image: null,
      parts: [
        {
          label: "A",
          pointValue: 2,
          text: "Draw a correctly labeled graph of long-run aggregate supply, short-run aggregate supply, and aggregate demand, and show each of the following.",
          answerType: "draw" as const,
          answer: "The graph should show a downward-sloping AD curve, an upward-sloping SRAS curve, and a vertical LRAS curve. The AD and SRAS curves must intersect to the right of the LRAS curve to illustrate the inflationary gap.",
          referenceImageUrl: "https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com/flippables/adas_inflationary.jpg",
          subparts: [
            { label: "i", text: "Current equilibrium output and price level, labeled as Y1 and PL1." },
            { label: "ii", text: "Full-employment output, labeled as Yf." }
          ]
        },
        {
          label: "B",
          pointValue: 1,
          text: "Assume the banking system in Zephyria has ample reserves and that the central bank targets a new policy rate to reach full employment. Should the central bank increase or decrease its administered interest rates?",
          answerType: "text" as const,
          answer: "Increase. (Explanation: To close an inflationary gap, the central bank needs to implement contractionary monetary policy by raising the policy rate. In an ample reserves system, this is done by increasing administered rates like the Interest on Reserve Balances (IORB).)"
        },
        {
          label: "C",
          pointValue: 3,
          text: "Given the central bank action you identified in part (B), draw a correctly labeled graph of the reserve market and show the effect on the policy rate.",
          answerType: "draw" as const,
          answer: "The graph should have the Policy Rate on the vertical axis and Quantity of Reserves on the horizontal axis. It must show a downward-sloping demand curve that becomes horizontal, and a vertical supply curve intersecting the horizontal portion of the demand curve. The horizontal portion of the demand curve must shift upward, showing an increase in the equilibrium policy rate.",
          referenceImageUrl: "https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com/flippables/ample_contractionary.jpg"
        },
        {
          label: "D",
          pointValue: 4,
          text: "The policy makers pursue a fiscal policy rather than the monetary policy in part (B). Assume that the marginal propensity to consume is 0.75 and the value of the inflationary gap is $400 billion.",
          answerType: "text" as const,
          subparts: [
            {
              label: "i",
              pointValue: 2,
              text: "If the government changes its spending without changing taxes to eliminate the inflationary gap, calculate the minimum required change in government spending. Show your work.",
              answerType: "text" as const,
              answer: "The spending multiplier is 1 / (1 - 0.75) = 4. To close a $400 billion inflationary gap, aggregate demand must decrease by $400 billion. The required change in government spending is -$400 billion / 4 = -$100 billion. The government must decrease spending by $100 billion."
            },
            {
              label: "ii",
              pointValue: 2,
              text: "If the government changes taxes without changing government spending to eliminate the inflationary gap, will the absolute value of the minimum required change in taxes be greater than, smaller than, or equal to the absolute value of the minimum required change in government spending in part (D)(i)? Explain.",
              answerType: "text" as const,
              answer: "Greater than. Explanation: The absolute value of the tax multiplier (-0.75 / 0.25 = -3) is smaller than the spending multiplier (4). Because a portion of any tax increase is paid out of household savings rather than coming entirely from reduced consumption, a larger initial tax increase is required to achieve the exact same total impact on aggregate demand."
            }
          ]
        },
        {
          label: "E",
          pointValue: 4,
          text: "Assume the government raises income tax rates to eliminate the inflationary gap. Will each of the following increase, decrease, or stay the same?",
          answerType: "text" as const,
          subparts: [
            {
              label: "i",
              pointValue: 2,
              text: "Aggregate demand. Explain.",
              answerType: "text" as const,
              answer: "Decrease. Raising income tax rates decreases disposable income for households, which leads to a decrease in consumer spending, shifting aggregate demand to the left."
            },
            {
              label: "ii",
              pointValue: 2,
              text: "Long-run aggregate supply. Explain.",
              answerType: "text" as const,
              answer: "Stay the same. A change in income taxes primarily affects aggregate demand in the standard short-run macroeconomic model and does not inherently change the quantity or quality of resources or technology that determine the long-run productive capacity of the economy."
            }
          ]
        }
      ]
    }
  ]
};

/** Standalone FRQ set so "Exogenous Shocks and Contractionary Policy" appears as its own option in the tutor builder. */
export const macroUnit4Set5: FRQExam = {
  examTitle: "AP Macroeconomics Unit 4 FRQ: Exogenous Shocks and Contractionary Policy",
  thumbnailUrl: "/images/frqPracticePage/unit4MacroFRQCover.jpg",
  unit: 4,
  questions: [
    {
      id: 102,
      subject: 'macro',
      title: 'FRQ 2 - Exogenous Shocks and Contractionary Policy',
      questionNumber: 1,
      prompt: "Assume that the economy of Oceana is currently in equilibrium at a level of real output equal to its potential output.",
      expertTip: "When a trading partner's income rises, their demand for imports increases, which boosts the home country's exports. To offset a resulting inflationary gap in an ample reserves regime, the central bank must raise its administered rates.",
      image: null,
      parts: [
        {
          label: "A",
          pointValue: 3,
          text: "Draw a correctly labeled graph of aggregate demand, short-run aggregate supply, and long-run aggregate supply for Oceana, and show each of the following.",
          answerType: "draw" as const,
          answer: "The graph must show AD, SRAS, and LRAS all intersecting at a single point.",
          referenceImageUrl: "https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com/flippables/ad-as-lre.jpg",
          subparts: [
            { label: "i", text: "The current equilibrium real output, labeled Y1, and price level, labeled PL1." },
            { label: "ii", text: "The full-employment output, labeled Yf." }
          ]
        },
        {
          label: "B",
          pointValue: 4,
          text: "Now assume that the economy of Terrania, a major trading partner of Oceana, experiences a rapid economic expansion and an increase in national income. On your graph from part (A), show the effect of Terrania's increase in national income on each of the following in Oceana in the short run.",
          answerType: "draw" as const,
          answer: "The graph should show AD shifting right; new equilibrium at Y2 and PL2 to the right of LRAS. Aggregate demand shifts right because Terrania's higher income increases its demand for Oceana's exports.",
          referenceImageUrl: "https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com/flippables/adas_inflationary.jpg",
          subparts: [
            { label: "i", text: "Aggregate demand." },
            { label: "ii", text: "Real output and price level, labeled as Y2 and PL2." }
          ]
        },
        {
          label: "C",
          pointValue: 1,
          text: "The central bank of Oceana wishes to offset the effect of Terrania's increase in national income on Oceana's price level. Assume the banking system in Oceana has ample reserves. What monetary policy action should the central bank of Oceana take?",
          answerType: "text" as const,
          answer: "The central bank should increase its administered interest rates (specifically, the Interest on Reserve Balances)."
        },
        {
          label: "D",
          pointValue: 3,
          text: "Draw a correctly labeled graph of the reserve market for Oceana, and show the effect of the monetary policy action you identified in part (C) on the policy rate in the short run.",
          answerType: "draw" as const,
          answer: "The graph should feature the Policy Rate on the vertical axis and Quantity of Reserves on the horizontal axis. It must show a downward-sloping demand curve with a horizontal segment, and a vertical supply curve intersecting the horizontal segment. The action is shown by shifting the horizontal portion of the demand curve upward, resulting in a higher equilibrium policy rate.",
          referenceImageUrl: "https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com/flippables/ample_contractionary.jpg"
        }
      ]
    }
  ]
};

export const macroUnit2Set1: FRQExam = {
  examTitle: "AP Macroeconomics Unit 2 FRQ: Economic Indicators",
  thumbnailUrl: "/images/frqPracticePage/unit4MacroFRQCover.jpg",
  unit: 2,
  questions: [
    {
      id: 5,
      subject: 'macro',
      title: 'Unit 2 FRQ - GDP & Inflation Data',
      questionNumber: 1,
      prompt: "The countries of Highland and Lowland experienced the economic conditions described in the tables below.",
      expertTip: "Remember the order of operations for per capita calculations: First, 'deflate' the Nominal GDP to get Real GDP. Only THEN divide by the population.",
      image: undefined,
      tableData: {
        headers: ["Country", "Year", "GDP Deflator", "Nominal GDP", "Population"],
        rows: [
          ["Highland", "1", "100", "$500", "50"],
          ["Highland", "2", "120", "$720", "60"],
          ["Lowland", "1", "100", "$200", "20"],
          ["Lowland", "2", "125", "$500", "25"]
        ],
        // Note: You may need to adjust how your frontend renders this based on the split-table style in the image, 
        // or just render two separate small tables.
      },
      parts: [
        {
          label: "A",
          pointValue: 1,
          text: "Calculate each of the following for Year 2. Show your work.",
          subparts: [
            {
              label: "i",
              pointValue: 1,
              text: "Real GDP per capita for Highland",
              answerType: "text",
              answer: "$10. Explanation: First, calculate Real GDP: ($720 / 120) * 100 = $600. Then, divide by population: $600 / 60 = $10."
            },
            {
              label: "ii",
              pointValue: 1,
              text: "Real GDP per capita for Lowland",
              answerType: "text",
              answer: "$16. Explanation: First, calculate Real GDP: ($500 / 125) * 100 = $400. Then, divide by population: $400 / 25 = $16."
            }
          ]
        },
        {
          label: "B",
          pointValue: 2,
          text: "If Highland and Lowland have the same velocity of money in Year 2, which country must have the higher money supply in Year 2? Explain.",
          answerType: "text",
          answer: "Highland. Explanation: According to the equation of exchange (MV = PY), if Velocity (V) is constant, the Money Supply (M) is determined by Nominal GDP (PY). Since Highland has a higher Nominal GDP in Year 2 ($720) compared to Lowland ($500), Highland must have the higher money supply."
        },
        {
          label: "C",
          pointValue: 2,
          text: "Calculate each of the following in Year 2. Show your work.",
          subparts: [
            {
              label: "i",
              pointValue: 1,
              text: "The inflation rate in Highland",
              answerType: "text",
              answer: "20%. Explanation: ((120 - 100) / 100) * 100 = 20%."
            },
            {
              label: "ii",
              pointValue: 1,
              text: "The inflation rate in Lowland",
              answerType: "text",
              answer: "25%. Explanation: ((125 - 100) / 100) * 100 = 25%."
            }
          ]
        },
        {
          label: "D",
          pointValue: 2,
          text: "Based on your answer to part (c), if the nominal interest rate is the same for both nations in Year 2, which nation experiences the higher real interest rate in Year 2? Explain.",
          answerType: "text",
          answer: "Highland. Explanation: Real Interest Rate = Nominal Interest Rate - Inflation Rate. Since Highland has a lower inflation rate (20%) than Lowland (25%), subtracting a smaller number from the same nominal rate results in a higher real interest rate for Highland."
        },
        {
          label: "E",
          pointValue: 2,
          text: "Based on your answer to part (c)(ii), if the expected inflation rate in Lowland in Year 2 was 10%, what would be the effect on real GDP as the economy adjusts to its long-run equilibrium? Explain.",
          answerType: "text",
          answer: "Real GDP will decrease. Explanation: Since the actual inflation rate (25%) was higher than expected (10%), the economy is operating in an inflationary gap (output is above full employment). In the long run, nominal wages and input costs will increase to match the higher price levels, shifting the Short-Run Aggregate Supply (SRAS) curve to the left, returning Real GDP to the lower full-employment level."
        }
      ]
    }
  ]
};

export const macroUnit3Set1: FRQExam = {
  examTitle: "AP Macroeconomics Unit 3 FRQ: National Income & Price Determination",
  thumbnailUrl: "/images/frqPracticePage/unit4MacroFRQCover.jpg", // Using a relevant placeholder
  unit: 3,
  questions: [
    {
      id: 6,
      subject: 'macro',
      title: 'Unit 3 FRQ - Inflationary Gap & Multipliers',
      questionNumber: 1,
      prompt: "The economy of 'Veridia' is currently operating in short-run equilibrium with an actual Real GDP of $600 billion. The full-employment level of output is $500 billion. The Marginal Propensity to Consume (MPC) for Veridia is 0.8.",
      expertTip: "When calculating fiscal policy changes, always check the direction of the gap first. For an inflationary gap, you need contractionary policy (Decrease G or Increase T). Also, remember that the Tax Multiplier is always one less in absolute value than the Spending Multiplier.",
      image: undefined,
      tableData: undefined,
      parts: [
        {
          label: "A",
          pointValue: 2,
          text: "Draw a correctly labeled graph of the long-run aggregate supply, short-run aggregate supply, and aggregate demand curves.",
          answerType: "draw",
          answer: "The graph should show the AD and SRAS curves intersecting to the RIGHT of the vertical LRAS curve. The intersection point is labeled Y1 ($600B) and PL1. The vertical LRAS line is labeled Yf ($500B).",
          referenceImageUrl: "/images/frqPracticePage/macroUnit3Set1A.jpg",
          subparts: [
            {
              label: "i",
              text: "Label the current equilibrium output as Y1.",
            },
            {
              label: "ii",
              text: "Label the full-employment output as Yf.",
            }
          ]
        },
        {
          label: "B",
          pointValue: 1,
          text: "Identify one specific fiscal policy action the government could take to close the output gap.",
          answerType: "text",
          answer: "Decrease government spending OR Increase taxes. (Either action is contractionary and will shift AD to the left).",
        },
        {
          label: "C",
          pointValue: 1,
          text: "Based on the fiscal policy action identified in Part B, will the real interest rate in Veridia increase, decrease, or stay the same? Explain.",
          answerType: "text",
          answer: "Decrease. Explanation: Contractionary fiscal policy reduces the government deficit (or increases the surplus), which decreases the demand for loanable funds (or increases the supply of loanable funds). This lowers the equilibrium real interest rate.",
        },
        {
          label: "D",
          pointValue: 1,
          text: "Based on the change in the real interest rate identified in Part C, will financial capital inflows to Veridia increase, decrease, or stay the same?",
          answerType: "text",
          answer: "Decrease. Explanation: Lower real interest rates make Veridian financial assets less attractive to foreign investors compared to assets in other countries, reducing the flow of financial capital into Veridia.",
        },
        {
          label: "E",
          pointValue: 1,
          text: "Calculate the minimum change in taxes required to close the inflationary gap completely. Show your work.",
          answerType: "text",
          answer: "Increase taxes by $25 billion. Explanation: The inflationary gap is $100 billion ($600B - $500B). The Tax Multiplier is -MPC/MPS = -0.8/0.2 = -4. To reduce GDP by $100 billion: Change in GDP = Tax Change * Tax Multiplier -> -$100 = Change in Taxes * -4 -> Change in Taxes = $25 billion.",
        },
        {
          label: "F",
          pointValue: 1,
          text: "Suppose that the government of Veridia took no action at all and the economy self-adjusted in the long run. Show that change on your graph from part A.",
          answerType: "draw",
          answer: "The Short-Run Aggregate Supply (SRAS) curve shifts to the left. Explanation: Because the economy is operating beyond full employment, the unemployment rate is extremely low. This causes nominal wages (and other input costs) to increase. As production costs rise, firms decrease supply, shifting the SRAS curve to the left until real output returns to Yf at full employment. The new equilibrium occurs where the shifted SRAS curve intersects AD at the vertical LRAS line (Yf).",
          referenceImageUrl: "/images/frqPracticePage/macroUnit3Set1F.jpg",
        }
      ]
    }
  ]
};

export const macroUnit5Set1: FRQExam = {
  examTitle: "AP Macroeconomics Unit 5 FRQ: The Phillips Curve",
  thumbnailUrl: "/images/frqPracticePage/unit4MacroFRQCover.jpg",
  unit: 5,
  questions: [
    {
      id: 7,
      subject: 'macro',
      title: 'Unit 5 FRQ - Phillips Curve and Interest Rates',
      questionNumber: 1,
      prompt: "Agraria is a country currently operating at full employment. Below is a short run Phillips curve that represents Agraria's current economic situation.",
      expertTip: "Remember that the Short-Run Phillips Curve (SRPC) shifts in the opposite direction of the Short-Run Aggregate Supply (SRAS) curve. An adverse supply shock shifts SRAS to the left, which corresponds to a rightward shift of the SRPC.",
      image: undefined,
      tableData: undefined,
      parts: [
        {
          label: "A",
          pointValue: 2,
          text: "Draw a correctly labeled graph of a short-run Phillips curve (SRPC).",
          answerType: "draw",
          answer: "The graph should have the 'Inflation Rate' on the vertical axis and the 'Unemployment Rate' on the horizontal axis. A downward-sloping curve should be labeled 'SRPC'. The long-run Phillips curve (LRPC) should be drawn as a vertical line at the natural rate of unemployment. Point 'X' should be located at the intersection of the SRPC and LRPC, representing the current state of the economy at full employment.",
          templateImageUrl: "/images/frqPracticePage/macroUnit5Set1TEMPLATE.jpg",
          subparts: [
            {
              label: "i",
              text: "On your graph, label a point 'X' that represents the current state of the economy at full employment.",
            },
            {
              label: "ii",
              text: "Your graph should include both the short-run Phillips curve (SRPC) and the long-run Phillips curve (LRPC).",
            }
          ]
        },
        {
          label: "B",
          pointValue: 2,
          text: "Assume that Agraria experiences a severe drought that significantly reduces crop yields, creating an adverse supply shock. On your graph from part (a), show the effect of this shock on the Phillips Curve graph.",
          answerType: "draw",
          answer: "The adverse supply shock leads to stagflation (higher inflation and higher unemployment). This is represented by a rightward (or upward) shift of the entire SRPC curve. The new curve should be labeled 'SRPC2'. The LRPC remains unchanged as it represents the natural rate of unemployment.",
        },
        {
          label: "D",
          pointValue: 1,
          text: "As a result of the higher inflation caused by the supply shock in part (b), will the nominal interest rate on new loans increase, decrease, or remain unchanged in the short run? Explain.",
          answerType: "text",
          answer: "Increase. Explanation: Lenders will demand a higher nominal interest rate to compensate for the loss of purchasing power caused by higher anticipated inflation (the Fisher Effect).",
        },
        {
          label: "E",
          pointValue: 1,
          text: "Suppose that prior to the drought, the nominal interest rate was 6% and the expected inflation rate was 2%. Following the drought, the expected inflation rate rises to 5%. Assuming the real interest rate remains unchanged, calculate the new nominal interest rate.",
          answerType: "text",
          answer: "9%. Explanation: First, find the real interest rate: Real Rate = Nominal Rate - Expected Inflation = 6% - 2% = 4%. Then, use the new expected inflation rate to find the new nominal rate: New Nominal Rate = Real Rate + New Expected Inflation = 4% + 5% = 9%.",
        }
      ]
    }
  ]
};

export const macroUnit5Set2: FRQExam = {
  examTitle: "AP Macroeconomics Unit 5 FRQ: Short-Run & Long-Run Phillips Curves",
  thumbnailUrl: "/images/frqPracticePage/unit4MacroFRQCover.jpg", // You can link a screenshot of a table here if you have one
  unit: 5,
  questions: [
    {
      id: 8,
      subject: 'macro',
      title: 'Unit 5 FRQ - SRPC and Long-Run Adjustments',
      questionNumber: 1,
      prompt: "Assume that the table below shows the unemployment and inflation data in the country of 'Zephyria' as a result of a recent shift in aggregate demand.",
      expertTip: "Pay close attention to the direction of movement. If Unemployment goes DOWN while Inflation goes UP, this is a movement ALONG the curve (Demand Pull). If both go UP, the curve itself has shifted (Cost Push/Stagflation).",
      image: undefined,
      tableData: {
        headers: ["Period", "Unemployment Rate", "Inflation Rate"],
        rows: [
          ["Year 1", "6%", "2%"],
          ["Year 2", "3%", "7%"]
        ],
        // Note: Year 1 represents equilibrium (approx), Year 2 represents an overheating economy.
      },
      parts: [
        {
          label: "A",
          pointValue: 2,
          text: "Draw a correctly labeled graph of a short-run Phillips curve for Zephyria. Plot the data points for Year 1 and Year 2, labeling them as Point X and Point Y, respectively.",
          answerType: "draw",
          answer: "The graph should show a downward-sloping SRPC. Point X should be lower on the curve (High Unemp: 6%, Low Inf: 2%). Point Y should be higher on the curve (Low Unemp: 3%, High Inf: 7%). This illustrates a movement up and to the left along the curve.",
        },
        {
          label: "B",
          pointValue: 2,
          text: "Assume that the government of Zephyria takes no policy action to address the economic conditions in Year 2. In the long run, will the short-run Phillips curve (SRPC) shift to the right, shift to the left, or remain the same? Explain.",
          answerType: "text",
          answer: "Shift to the right. Explanation: In Year 2, the actual inflation rate (7%) is higher than the expected inflation rate (which was likely closer to 2%). As workers and firms adjust their inflationary expectations upward, they will negotiate higher nominal wages. This increase in input costs shifts the Short-Run Aggregate Supply (SRAS) left, which corresponds to a rightward (upward) shift of the SRPC.",
        },
        {
          label: "C",
          pointValue: 1,
          text: "Assume that the natural rate of unemployment in Zephyria is 6 percent. On your graph from part (a), draw the long-run Phillips curve and label it as LRPC.",
          answerType: "draw",
          answer: "The LRPC should be drawn as a vertical line at the 6% unemployment mark on the horizontal axis. It should pass through Point X (from part A) if that point represented the natural rate conditions.",
        },
        {
          label: "D",
          pointValue: 1,
          text: "Identify one specific fiscal policy action that the government could have taken in Year 2 to help reduce the inflation rate.",
          answerType: "text",
          answer: "Decrease Government Spending OR Increase Taxes. (Contractionary fiscal policy reduces Aggregate Demand, moving the economy down the SRPC back towards the natural rate).",
        }
      ]
    }
  ]
};

export const macroUnit1Set2: FRQExam = {
  examTitle: "AP Macroeconomics Unit 1 FRQ: Comparative Advantage & Trade",
  thumbnailUrl: "/images/frqPracticePage/unit4MacroFRQCover.jpg", 
  unit: 1,
  questions: [
    {
      id: 9, 
      subject: ['macro', 'micro'],
      title: 'Unit 1 FRQ - Comparative Advantage & PPC',
      questionNumber: 1,
      prompt: "The graph below shows the production possibilities curves for two countries, Novus and Vetus. Novus can produce 80 units of Cotton or 40 units of Wool. Vetus can produce 40 units of Cotton or 120 units of Wool. Assume constant opportunity costs for both nations.",
      expertTip: "To find the Opportunity Cost, always put the 'Other' good On Top (OOO). For example, to find the cost of 1 unit of Cotton, divide the maximum Wool by the maximum Cotton.",
      // You can insert the SVG component code provided below into your image renderer here
      image: '/images/frqPracticePage/macroUnit1Set2.svg', 
      parts: [
        {
          label: "A",
          pointValue: 2,
          text: "Which country has an absolute advantage in the production of Cotton and which has an absolute advantage in the production of Wool? Explain how you determined your answer.",
          answerType: "text",
          answer: "Novus has the absolute advantage in Cotton (80 > 40). Vetus has the absolute advantage in Wool (120 > 40). Absolute advantage is determined by which country can produce more of a good with the same resources.",
        },
        {
          label: "B",
          pointValue: 2,
          text: "Which country has the comparative advantage in Cotton?",
          answerType: "text",
          answer: "Novus has the comparative advantage. Explanation: For Novus, 1 unit of Cotton costs 0.5 units of Wool (40/80). For Vetus, 1 unit of Cotton costs 3 units of Wool (120/40). Since 0.5 < 3, Novus gives up less to produce Cotton.",
        },
        {
          label: "C",
          pointValue: 1,
          text: "Identify a specific numerical value for the terms of trade that would be beneficial for both countries to accept.",
          answerType: "text",
          answer: "1 unit of Cotton for 1 unit of Wool (or any number between 0.5 and 3). Explanation: Novus will only sell Cotton if they get more than 0.5 units of Wool. Vetus will only buy Cotton if they pay less than 3 units of Wool.",
        },
        {
          label: "D",
          pointValue: 1,
          text: "Assume that Novus experiences a major recession leading to high unemployment. How would this change be represented on the graph for Novus? Explain.",
          answerType: "text",
          answer: "It would be represented by a point inside the curve. Explanation: A recession/unemployment does not shift the PPC (production *possibilities*) curve itself, because the country's capacity hasn't changed. It indicates that the country is producing inefficiently, inside its frontier.",
        }
      ]
    }
  ]
};

export const macroUnit4Set2: FRQExam = {
  examTitle: "AP Macroeconomics Unit 4 FRQ: Monetary vs. Fiscal Policy",
  thumbnailUrl: "/images/frqPracticePage/unit4MacroFRQCover.jpg",
  unit: 4,
  questions: [
    {
      id: 10,
      subject: 'macro',
      title: 'Unit 4 FRQ - Policy Mix & Interest Rates',
      questionNumber: 1,
      prompt: "Assume the economy of 'Bellaterra' is currently operating with a recessionary gap.",
      expertTip: "A classic trap is confusing the Money Market with Loanable Funds. Use the Money Market (Vertical Supply) for Central Bank actions (Nominal Rates). Use Loanable Funds (Upward Supply) for Government Budget/Savings changes (Real Rates).",
      image: undefined,
      parts: [
        {
          label: "A",
          pointValue: 1,
          text: "Identify the specific open market operation the central bank of Bellaterra should use to close the output gap.",
          answerType: "text",
          answer: "Buy government bonds (or Buy securities). Explanation: Buying bonds injects reserves into the banking system, increasing the money supply.",
        },
        {
          label: "B",
          pointValue: 2,
          text: "Draw a correctly labeled graph of the money market and show the impact of the monetary policy action identified in part (A) on the equilibrium nominal interest rate.",
          answerType: "draw",
          answer: macroMoneyMarketBuy, // Image shows Vertical MS shifting Right. Nominal IR decreases.
          referenceImageUrl: "/images/frqPracticePage/macroUnit4Set2B.jpg",
          subparts: [
            
          ]
        },
        {
          label: "C",
          pointValue: 2,
          text: "Based on the change in the nominal interest rate in part (B), will each of the following increase, decrease, or stay the same in the short run?",
          subparts: [
            {
              label: "i",
              text: "Price Level",
              answerType: "text",
              answer: "Increase. Explanation: Lower interest rates stimulate investment and consumption, increasing Aggregate Demand, which drives up the price level."
            },
            {
              label: "ii",
              text: "Real Output",
              answerType: "text",
              answer: "Increase. Explanation: The increase in Aggregate Demand moves the economy toward full employment, increasing real GDP."
            },
            {
              label: "iii",
              text: "Unemployment Rate",
              answerType: "text",
              answer: "Decrease. Explanation: As real output increases, firms hire more workers to meet the demand, lowering cyclical unemployment."
            }
          ]
        },
        {
          label: "D",
          pointValue: 2,
          text: "Now assume that instead of the central bank action, the government of Bellaterra decides to increase government spending and decrease taxes to close the recessionary gap. Draw a correctly labeled graph of the loanable funds market and show the impact of this fiscal policy action on the real interest rate.",
          answerType: "draw",
          answer: macroLoanableFundsFiscal, // Image shows Demand for LF shifting Right OR Supply of LF shifting Left. RIR Increases.
          referenceImageUrl: "/images/frqPracticePage/macroUnit4Set2D.jpg",
          subparts: [
           
          ]
        }
      ]
    }
  ]
};

export const macroUnit6Set2: FRQExam = {
  examTitle: "AP Macroeconomics Unit 6 FRQ: Capital Flight & Exchange Rate Intervention",
  thumbnailUrl: "/images/frqPracticePage/unit4MacroFRQCover.jpg",
  unit: 6,
  questions: [
    {
      id: 11,
      subject: 'macro',
      title: 'Unit 6 FRQ - Political Instability & Stabilization',
      questionNumber: 1,
      prompt: "The country of 'Caldonia' is currently experiencing significant political instability, causing foreign investors to lose confidence in the safety of financial assets within the country. The currency of Caldonia is the 'Caldon', and the central bank holds reserves of the 'Euro', the currency of its major trading partner.",
      expertTip: "When analyzing 'Capital Flight' (money leaving a country due to fear), remember the dual-shift effect in Forex: Demand for the domestic currency falls (investors leave) AND Supply of the domestic currency rises (locals move money out). Both drive the value down. For Loanable Funds, capital flight decreases the Supply of Loanable funds, driving interest rates UP.",
      image: undefined,
      parts: [
        {
          label: "A",
          pointValue: 1,
          text: "Based on the political instability described, will the demand for the Caldon increase, decrease, or stay the same? Explain.",
          answerType: "text",
          answer: "Decrease. Explanation: Foreign investors, fearing risk, will sell Caldonian assets and convert their money back into their own currencies. This reduces the demand for the Caldon in the foreign exchange market.",
        },
        {
          label: "B",
          pointValue: 2,
          text: "Draw correctly labeled side-by-side graphs of the foreign exchange market for the Caldon and the foreign exchange market for the Euro. Show the effect of the political instability on the equilibrium exchange rates.",
          answerType: "draw",
          answer: "The graph for the Caldon should have the 'Exchange Rate (Euros/Caldon)' on the vertical axis and 'Quantity of Caldons' on the horizontal axis. It should show a downward-sloping Demand curve and an upward-sloping Supply curve. The Demand curve must shift to the LEFT (labeled D1 to D2), representing foreign investors exiting the market. The new equilibrium point shows a LOWER exchange rate (depreciation) and a lower quantity of Caldons traded. The graph for the Euro should have the 'Exchange Rate (Caldons/Euro)' on the vertical axis and 'Quantity of Euros' on the horizontal axis. It should show a downward-sloping Demand curve and an upward-sloping Supply curve. The Demand curve must shift to the RIGHT (labeled D1 to D2), representing increased demand for Euros as investors flee Caldonian assets. The new equilibrium point shows a HIGHER exchange rate (appreciation of the Euro) and a higher quantity of Euros traded.",
          subparts: [
            {
               label: "i",
               text: "Did the Caldon appreciate or depreciate relative to the Euro?",
               answerType: "text",
               answer: "Depreciate. The decrease in demand lowers the equilibrium price of the Caldon.",
            }
          ]
        },
        {
          label: "C",
          pointValue: 1,
          text: "Based on the outflow of financial capital from Caldonia, what will happen to the real interest rate in Caldonia? Explain.",
          answerType: "text",
          answer: "Increase. Explanation: The outflow of financial capital represents a decrease in the Supply of Loanable Funds within Caldonia (money is leaving the banking system). A leftward shift of the Supply curve raises the equilibrium real interest rate.",
        },
        {
          label: "D",
          pointValue: 1,
          text: "Based on the change in the exchange rate identified in part (B), what will happen to Caldonia's Net Exports? Explain.",
          answerType: "text",
          answer: "Increase. Explanation: Because the Caldon has depreciated, Caldonian goods appear cheaper to foreigners, increasing exports. Conversely, foreign goods appear more expensive to Caldonians, decreasing imports. Since Net Exports = Exports - Imports, Xn increases.",
        },
        {
          label: "E",
          pointValue: 1,
          text: "Assume the Central Bank of Caldonia wants to return the exchange rate to its pre-crisis level. To achieve this, should the Central Bank buy Euros or sell Euros? Explain.",
          answerType: "text",
          answer: "Sell Euros. Explanation: To increase the value of the Caldon (appreciate it), the Central Bank needs to increase the demand for the Caldon. They do this by entering the market, selling their foreign reserves (Euros) and using the proceeds to buy Caldons.",
        }
      ]
    }
  ]
};

export const macroUnit2Set2: FRQExam = {
  examTitle: "AP Macroeconomics Unit 2 FRQ: CPI and Inflation",
  thumbnailUrl: "/images/frqPracticePage/unit4MacroFRQCover.jpg",
  unit: 2,
  questions: [
    {
      id: 12,
      subject: 'macro',
      title: 'Unit 2 FRQ - Price Indices & Real Income',
      questionNumber: 1,
      prompt: "The nation of 'Arcadia' produces only three consumer goods: textbooks, calculators, and notebooks. The table below shows the quantities of these goods in the market basket and their prices in Year 1 and Year 2.",
      expertTip: "Remember: The Market Basket Quantity is fixed. You use the SAME quantities for both years when calculating the total cost. Inflation is simply the percentage change in the CPI from one year to the next.",
      image: undefined,
      tableData: {
        headers: ["Product", "Market Basket Quantity", "Year 1 Price", "Year 2 Price"],
        rows: [
          ["Textbooks", "2", "$35.00", "$45.00"],
          ["Calculators", "1", "$20.00", "$20.00"],
          ["Notebooks", "10", "$3.00", "$4.00"]
        ]
      },
      parts: [
        {
          label: "A",
          pointValue: 2,
          text: "Calculate the cost of the market basket of goods in Year 1 and in Year 2. Show your work.",
          answerType: "text",
          answer: "Year 1: $120. Year 2: $150. Explanation: \nYear 1 Cost = (2 * $35) + (1 * $20) + (10 * $3) = $70 + $20 + $30 = $120. \nYear 2 Cost = (2 * $45) + (1 * $20) + (10 * $4) = $90 + $20 + $40 = $150.",
        },
        {
          label: "B",
          pointValue: 2,
          text: "Use Year 1 as the base year to calculate the price indices (CPI) for Year 1 and Year 2. Show your work.",
          answerType: "text",
          answer: "Year 1 CPI: 100. Year 2 CPI: 125. Explanation: \nCPI = (Cost of Basket in Current Year / Cost of Basket in Base Year) * 100. \nYear 1: ($120 / $120) * 100 = 100. \nYear 2: ($150 / $120) * 100 = 125.",
        },
        {
          label: "C",
          pointValue: 1,
          text: "Calculate the inflation rate between Year 1 and Year 2.",
          answerType: "text",
          answer: "25%. Explanation: Inflation Rate = ((Year 2 CPI - Year 1 CPI) / Year 1 CPI) * 100 = ((125 - 100) / 100) * 100 = 25%.",
        },
        {
          label: "D",
          pointValue: 1,
          text: "In order for a citizen of Arcadia to maintain the same standard of living between Year 1 and Year 2, what percentage change in nominal income would be needed? Explain.",
          answerType: "text",
          answer: "25%. Explanation: Since the cost of living (the price level) increased by 25%, nominal income must increase by the same percentage to maintain purchasing power.",
        },
        {
          label: "E",
          pointValue: 1,
          text: "Assume that the average nominal wage in Arcadia increased by 20% between Year 1 and Year 2. Did the real wage increase, decrease, or stay the same? Explain.",
          answerType: "text",
          answer: "Decrease. Explanation: The real wage is the nominal wage adjusted for inflation. Since the price level rose by 25% while nominal wages only rose by 20%, the purchasing power of the wage (real wage) decreased.",
        }
      ]
    }
  ]
};
export const macroUnit3Set4: FRQExam = {
  examTitle: "AP Macroeconomics Unit 3 FRQ: Inflationary Gaps & Long-Run Growth",
  thumbnailUrl: "/images/frqPracticePage/unit4MacroFRQCover.jpg",
  unit: 3,
  questions: [
    {
      id: 13,
      subject: 'macro',
      title: 'Unit 3 FRQ - Inflationary Gap & Crowding In',
      questionNumber: 1,
      prompt: "The economy of 'Aestiva' is currently operating above full-employment output.",
      expertTip: "Pay close attention to the chain reaction in long-run growth questions: Fiscal Policy -> Budget Balance -> Loanable Funds Market -> Real Interest Rate -> Investment Spending (Capital Stock) -> Long-Run Growth (LRAS).",
      image: undefined,
      parts: [
        {
          label: "A",
          pointValue: 2,
          text: "Draw a correctly labeled graph of the long-run aggregate supply, short-run aggregate supply, and aggregate demand curves.",
          answerType: "draw",
          referenceImageUrl: "/images/frqPracticePage/macroUnit3Set4key.png",
          subparts: [
            {
              label: "i",
              text: "Label the current short-run equilibrium real output as Y1 and the current price level as PL1.",
            },
            {
              label: "ii",
              text: "Label the full-employment output as Yf.",
            }
          ],
          answer: `
**POINTS:** 2 Points Total.
**GRAPH REQUIREMENTS:**
1. Vertical LRAS curve labeled Yf.
2. Downward-sloping AD and Upward-sloping SRAS.
**CRITICAL CHECK:** The intersection of AD and SRAS (labeled Y1/PL1) MUST be to the RIGHT of the LRAS curve (Inflationary Gap).
**SCORING:** 1 point for correct curves/labels. 1 point for showing the correct gap (Y1 > Yf).

### SPECIAL INSTRUCTIONS FOR GRAPH GRADING (VISION ANALYSIS)

When analyzing a hand-drawn graph, you must perform a strict GEOMETRIC CHECK before awarding points.

1. **Identify the Vertical Line:**
   - Locate the vertical line.
   - CHECK LABEL: Is it labeled "LRAS" (Long Run Aggregate Supply)?
   - If it is labeled "SRAS" or "AD", the graph is WRONG. Score 0.

2. **Identify the Intersection (Equilibrium):**
   - Locate where the downward sloping line (AD) crosses the upward sloping line (SRAS).
   - CHECK POSITION: Is this intersection to the LEFT or RIGHT of the vertical line?
   - **Right** = Inflationary Gap.
   - **Left** = Recessionary Gap.
   - **On the Line** = Full Employment.

3. **Hallucination Check:**
   - Do not assume the student drew it correctly.
   - If the labels are messy/swapped (e.g., vertical line is SRAS), mark it INCORRECT immediately.
   - Explicitly output in your thought process: "I see a vertical line labeled [Read Label]. I see an intersection at [Position]."
          `,
        },
        {
          label: "B",
          pointValue: 1,
          text: "Assume that the government budget is currently balanced. In the absence of any discretionary policy action, will the government budget move into surplus, deficit, or remain in balance as a result of the economic conditions identified in part (a)? Explain.",
          answerType: "text",
          answer: `
**ASSERTION:** Move into SURPLUS.
**REQUIRED LOGIC:** Student must explain AUTOMATIC STABILIZERS.
- Logic A: High income/output leads to INCREASED tax revenues (income taxes).
- Logic B: Low unemployment leads to DECREASED transfer payments (unemployment benefits).
**FORBIDDEN LOGIC:** Do NOT accept "Government cuts spending" or "Government raises taxes." The prompt says "absence of discretionary action." The change must be automatic.
          `,
        },
        {
          label: "C",
          pointValue: 2,
          text: "On your graph in part (a), show how the economy will adjust in the long run in the absence of any discretionary policy action.",
          answerType: "draw",
          answer: `
**POINTS:** 2 Points Total.
**GRAPH CHECK:** Short-Run Aggregate Supply (SRAS) must shift to the LEFT until it intersects AD at the LRAS line.
**EXPLANATION CHECK:** Student must explain that NOMINAL WAGES (or input costs) will INCREASE due to the high demand for labor/resources (or expectations of higher inflation).
**SCORING:** 1 point for the graph shift. 1 point for the correct reasoning (wages rising).
          `,
        },
        {
          label: "D",
          pointValue: 1,
          text: "Now assume instead the government decides to increase taxes to close the inflationary gap. What effect will this policy have on the national debt?",
          answerType: "text",
          answer: `
**ASSERTION:** The National Debt will DECREASE (or stop growing).
**REQUIRED LOGIC:** Higher taxes increase government revenue. If the budget was balanced, this creates a SURPLUS. A surplus allows the government to pay down existing debt.
          `,
        },
        {
          label: "E",
          pointValue: 2,
          text: "Draw a correctly labeled graph of the loanable funds market and show the effect of the change in the national debt identified in part (d) on the equilibrium real interest rate.",
          answerType: "draw",
          answer: `
**POINTS:** 2 Points Total.
**ASSERTION:** Real Interest Rate DECREASES.
**GRAPH CHECK:**
- Option A (Demand Shift): Demand for Loanable Funds (DLF) shifts LEFT (Government borrows less).
- Option B (Supply Shift): Supply of Loanable Funds (SLF) shifts RIGHT (Government saves more/National Savings increase).
**SCORING:** 1 point for correct curve shift. 1 point for showing lower equilibrium Real Interest Rate.
          `,
        },
        {
          label: "F",
          pointValue: 2,
          text: "Based on the change in the equilibrium real interest rate identified in part (e), what will happen to the rate of economic growth in the country in the long run? Explain.",
          answerType: "text",
          answer: `
**POINTS:** 2 Points Total.
**ASSERTION:** Economic growth will INCREASE.
**REQUIRED LOGIC:** The student must link the LOWER Real Interest Rate to INCREASED INVESTMENT SPENDING (I).
**KEYWORD CHECK:** They MUST mention that this leads to an increase in "Capital Stock," "Physical Capital," or "Productive Capacity."
**FORBIDDEN LOGIC:** Do NOT award the explanation point if they say growth is caused by "Consumer Spending" or "Aggregate Demand" shifting right. Long-run growth is about Capital Accumulation (LRAS), not spending.
          `,
        }
      ]
    }
  ]
};

export const macroUnit2Set4: FRQExam = {
  examTitle: "AP Macroeconomics Unit 2 FRQ: Labor Calculations & Economic Growth",
  thumbnailUrl: "/images/frqPracticePage/unit4MacroFRQCover.jpg", 
  unit: 2,
  questions: [
    {
      id: 14,
      subject: 'macro',
      title: 'Unit 2 FRQ - LFPR and Human Capital',
      questionNumber: 1,
      prompt: "The table below provides labor-market statistics for the country of 'Meridia' for the most recent year.",
      expertTip: "Be careful with the 'Adult Population' calculation. It is the sum of the Labor Force AND those Not in the Labor Force. Do not forget to add the 'Not in the labor force' number when calculating the Participation Rate divisor.",
      image: undefined,
      tableData: {
        headers: ["Category", "Number of People"],
        rows: [
          ["Employed", "180,000"],
          ["Frictionally Unemployed", "8,000"],
          ["Structurally Unemployed", "7,000"],
          ["Cyclically Unemployed", "5,000"],
          ["Not in the labor force", "50,000"]
        ]
      },
      parts: [
        {
          label: "A",
          pointValue: 2,
          text: "Calculate the unemployment rate in Meridia. Show your work.",
          answerType: "text",
          answer: "10%. Explanation: First, find the Labor Force: 180,000 (Employed) + 20,000 (Total Unemployed: 8k+7k+5k) = 200,000. Unemployment Rate = (20,000 / 200,000) * 100 = 10%.",
        },
        {
          label: "B",
          pointValue: 2,
          text: "Calculate the Labor Force Participation Rate (LFPR) in Meridia. Show your work.",
          answerType: "text",
          answer: "80%. Explanation: Adult Population = Labor Force (200,000) + Not in Labor Force (50,000) = 250,000. LFPR = (200,000 / 250,000) * 100 = 80%.",
        },
        {
          label: "C",
          pointValue: 2,
          text: "Draw a correctly labeled graph of the production possibilities curve (PPC) for Meridia, with Consumer Goods on the horizontal axis and Capital Goods on the vertical axis. Indicate a point on your graph, labeled 'X', that reflects the current state of the economy.",
          answerType: "draw",
          answer: "The graph should show a standard concave PPC. Point X must be plotted INSIDE the curve. Explanation: Because there is positive Cyclical Unemployment (5,000 people), the economy is not utilizing all of its resources efficiently.",
          referenceImageUrl: "/images/frqPracticePage/macroUnit2Set4C.jpg",
        },
        {
          label: "D",
          pointValue: 1,
          text: "Assume the government of Meridia implements a new national education program that significantly improves the technical skills of the workforce. Show the effect of this policy on your graph in part (C).",
          answerType: "draw",
          answer: "The entire PPC shifts outward (to the right). Explanation: Improving the quality of labor (human capital) increases the productive capacity of the economy, allowing Meridia to produce more of both Capital and Consumer goods.",
          referenceImageUrl: "/images/frqPracticePage/macroUnit2Set4D.jpg",
        }
      ]
    }
  ]
};

export const macroUnit3Set3: FRQExam = {
  examTitle: "AP Macroeconomics Unit 3 FRQ: Self-Adjustment & Automatic Stabilizers",
  thumbnailUrl: "/images/frqPracticePage/unit4MacroFRQCover.jpg",
  unit: 3,
  questions: [
    {
      id: 15,
      subject: 'macro',
      title: 'Unit 3 FRQ - Long-Run Adjustment',
      questionNumber: 1,
      prompt: "The economy of 'Prosperia' is currently operating at a level of real output that exceeds its potential real gross domestic product.",
      expertTip: "Keynesians prefer Fiscal Policy. Classical economists prefer Self-Adjustment. When asked about 'No Policy Action,' you must think like a Classical economist: The economy fixes itself because WAGES are flexible in the long run. In an inflationary gap, wages go UP. In a recession, wages go DOWN.",
      image: undefined,
      parts: [
        {
          label: "A",
          pointValue: 2,
          text: "Draw a correctly labeled graph of the long-run aggregate supply, short-run aggregate supply, and aggregate demand curves.",
          answerType: "draw",
          answer: "The graph should show the downward-sloping AD curve intersecting the upward-sloping SRAS curve to the RIGHT of the vertical LRAS curve. The intersection point is labeled Y1 and PL1. The vertical LRAS line is labeled Yf, and Y1 > Yf.",
          referenceImageUrl: "/images/frqPracticePage/macroUnit3Set3 1.jpg",
          subparts: [
            {
              label: "i",
              text: "Label the current equilibrium real output as Y1 and the current price level as PL1.",
            },
            {
              label: "ii",
              text: "Label the full-employment output as Yf.",
            }
          ]
        },
        {
          label: "B",
          pointValue: 2,
          text: "Assume that the policymakers in Prosperia take no fiscal or monetary policy actions to close the output gap. Explain how the economy will adjust to full employment in the long run.",
          answerType: "text",
          answer: "The Short-Run Aggregate Supply (SRAS) curve will shift to the left. Explanation: Because the economy is operating beyond full employment, the unemployment rate is extremely low. This causes nominal wages (and other input costs) to increase. As production costs rise, firms decrease supply, shifting the SRAS curve to the left until real output returns to Yf.",
          referenceImageUrl: "/images/frqPracticePage/macroUnit3Set3 2.jpg",
        },
        {
          label: "C",
          pointValue: 1,
          text: "Identify one automatic stabilizer in the economy of Prosperia and explain how it helps moderate the inflationary gap described in the prompt.",
          answerType: "text",
          answer: "Progressive Income Taxes. Explanation: As nominal incomes rise due to the inflationary gap, households move into higher tax brackets and pay a larger percentage of their income in taxes. This decreases disposable income and dampens consumption spending, preventing Aggregate Demand from increasing as much as it otherwise would.",
        },
        {
          label: "D",
          pointValue: 1,
          text: "As a result of the automatic stabilizer identified in part (C), will the government budget of Prosperia move toward a deficit, a surplus, or remain balanced? Explain.",
          answerType: "text",
          answer: "Move toward a surplus. Explanation: During an expansionary period, tax revenues increase (due to higher incomes) while transfer payments (like unemployment benefits) decrease. This combination increases government revenue and decreases spending, moving the budget toward a surplus.",
        },
        {
          label: "E",
          pointValue: 1,
          text: "Suppose the government decides not to wait for self-adjustment and instead uses discretionary fiscal policy to close the gap. If they successfully restore full employment, how will the resulting price level compare to the price level that would have occurred under the self-adjustment process described in part (B)?",
          answerType: "text",
          answer: "The price level will be lower. Explanation: Discretionary fiscal policy (cutting spending or raising taxes) shifts Aggregate Demand to the left, which lowers the price level. The self-adjustment process involves shifting SRAS to the left, which raises the price level.",
        }
      ]
    }
  ]
};

export const macroUnit5Set3: FRQExam = {
  examTitle: "AP Macroeconomics Unit 5 FRQ: Monetary Neutrality & Quantity Theory",
  thumbnailUrl: "/images/frqPracticePage/unit4MacroFRQCover.jpg",
  unit: 5,
  questions: [
    {
      id: 16,
      subject: 'macro',
      title: 'Unit 5 FRQ - Quantity Theory of Money',
      questionNumber: 1,
      prompt: "The economy of 'Monetaria' is currently in long-run equilibrium. The central bank of Monetaria decides to increase the money supply significantly by purchasing government bonds.",
      expertTip: "Remember 'Monetary Neutrality': In the long run, changes in the money supply affect nominal variables (Prices, Nominal Wages) but do NOT affect real variables (Real GDP, Real Interest Rates, Unemployment).",
      image: undefined,
      parts: [
        {
          label: "A",
          pointValue: 2,
          text: "Draw a correctly labeled graph of the money market and show the effect of the central bank's action on the nominal interest rate in the short run.",
          answerType: "draw",
          answer: "The graph should have Nominal Interest Rate on the Y-axis and Quantity of Money on the X-axis. The Money Supply (MS) curve is vertical. The MS curve shifts to the right, causing the equilibrium nominal interest rate to decrease.",
        },
        {
          label: "B",
          pointValue: 1,
          text: "Based on the change in the nominal interest rate identified in part (A), what will happen to the price level and real gross domestic product (GDP) in the short run? Explain.",
          answerType: "text",
          answer: "Both will increase. Explanation: Lower interest rates stimulate Investment and Consumption spending. This increases Aggregate Demand, which raises both the Price Level and Real GDP in the short run.",
        },
        {
          label: "C",
          pointValue: 2,
          text: "Assume that the velocity of money is constant. According to the Quantity Theory of Money, if the money supply increases by 10% and real GDP remains constant in the long run, what will be the percentage change in the price level?",
          answerType: "text",
          answer: "10%. Explanation: The Equation of Exchange is M x V = P x Y. If V (Velocity) and Y (Real GDP) are constant, then a percentage change in M (Money Supply) results in an equal percentage change in P (Price Level).",
        },
        {
          label: "D",
          pointValue: 1,
          text: "In the long run, will the real interest rate increase, decrease, or remain the same? Explain.",
          answerType: "text",
          answer: "Remain the same. Explanation: In the long run, money is neutral. While nominal interest rates may change due to inflation expectations (Fisher Effect), the real interest rate is determined by the supply and demand for loanable funds (real factors like savings and investment), which return to their original levels.",
        },
        {
          label: "E",
          pointValue: 1,
          text: "Assume the nominal GDP of Monetaria is $500 billion and the money supply is $100 billion. Calculate the velocity of money.",
          answerType: "text",
          answer: "5. Explanation: MV = Nominal GDP. 100 * V = 500. V = 500 / 100 = 5.",
        }
      ]
    }
  ]
};

export const macroUnit6Set3: FRQExam = {
  examTitle: "AP Macroeconomics Unit 6 FRQ: Balance of Payments",
  thumbnailUrl: "/images/frqPracticePage/unit4MacroFRQCover.jpg",
  unit: 6,
  questions: [
    {
      id: 17,
      subject: 'macro',
      title: 'Unit 6 FRQ - Balance of Payments Accounts',
      questionNumber: 1,
      prompt: "The table below shows the international transactions for the country of 'Atlas' for a specific year. Amounts are in billions of dollars.",
      expertTip: "The Balance of Payments must always sum to zero. Therefore, Current Account + Financial/Capital Account = 0. If the Current Account is in deficit, the Financial Account must be in surplus (and vice versa).",
      image: undefined,
      tableData: {
        headers: ["Transaction", "Amount (Billions)"],
        rows: [
          ["Exports of Goods and Services", "+$400"],
          ["Imports of Goods and Services", "-$500"],
          ["Net Investment Income", "+$50"],
          ["Net Unilateral Transfers", "-$20"],
          ["Purchase of Foreign Assets by Atlas Residents", "-$100"],
          ["Purchase of Atlas Assets by Foreigners", "+$170"]
        ]
      },
      parts: [
        {
          label: "A",
          pointValue: 2,
          text: "Calculate the balance on the Current Account for Atlas. Show your work.",
          answerType: "text",
          answer: "-$70 Billion (Deficit). Explanation: Current Account = (Exports - Imports) + Net Investment Income + Net Unilateral Transfers. ($400 - $500) + $50 + (-$20) = -100 + 50 - 20 = -$70 Billion.",
        },
        {
          label: "B",
          pointValue: 2,
          text: "Calculate the balance on the Financial Account (Capital Account) for Atlas. Show your work.",
          answerType: "text",
          answer: "+$70 Billion (Surplus). Explanation: Financial Account = Inflow of Foreign Capital - Outflow of Domestic Capital. (Purchase of Atlas Assets by Foreigners) - (Purchase of Foreign Assets by Atlas Residents) = $170 - $100 = +$70 Billion.",
        },
        {
          label: "C",
          pointValue: 1,
          text: "Based on your calculations in parts (A) and (B), is the Balance of Payments for Atlas balanced? Explain.",
          answerType: "text",
          answer: "Yes. Explanation: The sum of the Current Account (-$70) and the Financial Account (+$70) is zero, indicating the balance of payments accounts are balanced.",
        },
        {
          label: "D",
          pointValue: 1,
          text: "Now assume that national income in Atlas increases significantly relative to the rest of the world. How will this affect the Trade Balance component of the Current Account? Explain.",
          answerType: "text",
          answer: "The Trade Balance will decrease (move toward deficit). Explanation: As national income rises, Atlas consumers have more disposable income and will purchase more goods, including imports. An increase in imports, holding exports constant, decreases the trade balance (Exports - Imports).",
        },
        {
          label: "E",
          pointValue: 2,
          text: "Draw a correctly labeled graph of the foreign exchange market for Atlas's currency, the 'Atlas Dollar', and show the effect of the increase in national income identified in part (D) on the value of the Atlas Dollar.",
          answerType: "draw",
          answer: "The graph should show the Supply of Atlas Dollars shifting to the Right. (Alternatively, Demand for Atlas Dollars could shift left if analyzing relative price levels, but income usually targets Supply of domestic currency). Explanation: To buy more imports, Atlas residents must supply more Atlas Dollars to the forex market to exchange for foreign currency. The increase in Supply causes the equilibrium exchange rate (Value of the Atlas Dollar) to depreciate.",
        }
      ]
    }
  ]
};

export const macroUnit6Set1: FRQExam = {
  examTitle: "AP Macroeconomics FRQ: Foreign Exchange",
  thumbnailUrl: "/images/frqPracticePage/logo.png",
  unit: 6,
  questions: [
    {
      id: 18,
      subject: 'macro',
      title: 'Unit 6 FRQ - Foreign Exchange Market',
      questionNumber: 5,
      difficulty: 'hard',
      prompt: "Canada and Mexico are major trading partners and the exchange rate between the Canadian dollar and the Mexican peso is determined in a flexible foreign exchange market.",
      expertTip: "Remember the 'mirror effect' in Forex markets. An action that increases the demand for one currency must cause an increase in the supply of the other currency. You can't just shift one graph!",
      image: null,
      parts: [
        {
          label: "A",
          pointValue: 2,
          text: "Assume that Mexican consumers develop a strong preference for Canadian-made electric vehicles. Draw a correctly labeled graph of the foreign exchange market for the Canadian dollar, and show the effect of this change in tastes on the equilibrium exchange rate for the Canadian dollar.",
          answerType: "draw",
          answer: macroSetOneFRQA5APlaceholder,
          subparts: [
             {
               label: "i",
               pointValue: 1,
               text: "Explanation of graph shift:",
               answerType: "text",
               answer: "The demand for Canadian dollars will increase (shift right). To purchase Canadian electric vehicles, Mexican consumers must first exchange their pesos for Canadian dollars. This increased demand causes the Canadian dollar to appreciate."
             }
          ]
        },
        {
          label: "B",
          pointValue: 2,
          text: "Will each of the following increase, decrease, or stay the same as a result of the change in tastes described in part (a)?",
          subparts: [
            {
              label: "i",
              pointValue: 1,
              text: "Canada's net exports. Explain.",
              answerType: "text",
              answer: "Increase. The change in tastes results in higher demand for Canadian exports. Since exports are a positive component of net exports (Exports - Imports), Canada's net exports will increase."
            },
            {
              label: "ii",
              pointValue: 1,
              text: "Unemployment in Canada. Explain.",
              answerType: "text",
              answer: "Decrease. The increase in net exports causes Aggregate Demand (AD) in Canada to increase. A rightward shift in AD leads to higher real output and a lower cyclical unemployment rate."
            },
            {
              label: "iii",
              pointValue: 1,
              text: "Canada's long-run aggregate supply.",
              answerType: "text",
              answer: "Stay the same. A change in consumer tastes or aggregate demand does not affect the productive capacity (resources, technology, capital stock) of the economy in the long run."
            }
          ]
        },
        {
          label: "C",
          pointValue: 2,
          text: "The Mexican government increases deficit spending to fund infrastructure projects. Draw a correctly labeled graph of the loanable funds market in Mexico, and show the effect of the increase in deficit spending on the equilibrium real interest rate.",
          answerType: "draw",
          answer: macroSetOneFRQA5CPlaceholder, 
        },
        {
          label: "D",
          pointValue: 1,
          text: "Based on the change in the equilibrium real interest rate identified in part (c), what will happen to financial capital flows to Mexico?",
          answerType: "text",
          answer: "Financial capital flows to Mexico will increase. Foreign investors seek higher returns, and the higher real interest rate in Mexico makes Mexican financial assets more attractive compared to assets in other countries.",
        },
        {
          label: "E",
          pointValue: 2,
          text: "Based on your answer to part (d), what will happen to the international value of the Mexican peso in the foreign exchange market? Explain.",
          answerType: "text",
          answer: "The Mexican peso will appreciate. As foreign investors exchange their currency for pesos to invest in Mexican financial assets, the demand for the peso increases (and/or the supply of pesos decreases), raising its value."
        },
        {
          label: "F",
          pointValue: 2,
          text: "Based on your answer to part (e), will the central bank of Mexico buy or sell pesos in the foreign exchange market to stabilize the dollar/peso exchange rate? Explain.",
          answerType: "text",
          answer: "Sell pesos. To counteract the appreciation of the peso, the central bank must increase the supply of pesos in the market. Selling pesos (and buying foreign currency) shifts the supply curve right, lowering the value of the peso."
        }
      ]
    }
  ]
};




export const microUnit2Set5: FRQExam = {
  examTitle: "AP Microeconomics Unit 2 FRQ: Tax Calculation and Allocative Efficiency",
  thumbnailUrl: "/images/frqPracticePage/microUnit2Set2.svg", // Using existing image as fallback
  unit: 2,
  questions: [
    {
      id: 19,
      subject: 'micro',
      title: 'Unit 2 FRQ - Tax Wedge and Deadweight Loss',
      questionNumber: 1,
      prompt: "The graph below shows the market for Boutique Backpacks, both before and after a per unit tax is imposed.",
      expertTip: "Total Economic Surplus is the sum of CS and PS. The most efficient outcome maximizes this area. Any tax creates a wedge, shrinks the surplus, and results in Deadweight Loss.",
      image: '/images/frqPracticePage/microUnit2Set5.svg', 
      parts: [
        {
          label: "A",
          pointValue: 1,
          text: "Calculate the Consumer Surplus (CS) before the tax is imposed. Show your work.",
          answerType: "text" as const,
          answer: "$600. Explanation: CS = 0.5 x Base x Height. CS = 0.5 x ($80 - $50) x 40 = $600.",
        },
        {
          label: "B",
          text: "Now assume a $20 per unit tax is imposed on the market for Boutique Backpacks.",
          subparts: [
            {
              label: "i",
              pointValue: 2,
              text: "Calculate the Deadweight Loss (DWL) as a result of the tax. Show your work.",
              answerType: "text" as const,
              answer: "$100. Explanation: DWL = 0.5 x (40 - 30) x $20 = $100.",
            },
            {
              label: "ii",
              pointValue: 1,
              text: "Calculate total Tax Revenue (TR) generated by the tax.",
              answerType: "text" as const,
              answer: "$600. Explanation: TR = $20 x 30 = $600.",
            },
            {
              label: "iii",
              pointValue: 2,
              text: "Calculate Producer Surplus (PS) after the tax is imposed. Show your work.",
              answerType: "text" as const,
              answer: "$300. Explanation: The price producers receive is $60 - $20 = $40. PS = 0.5 x 30 x ($40 - $20) = $300.",
            }
          ]
        },
        {
          label: "C",
          pointValue: 1,
          text: "What is the new price that consumers pay?",
          answerType: "text" as const,
          answer: "$60. Explanation: The tax incidence is shared between consumers and producers. Consumers pay $60 and producers receive $40.",
        },
        {
          label: "D",
          pointValue: 2,
          text: "Assuming no externalities, how does the tax affect allocative efficiency? Explain.",
          answerType: "text" as const,
          answer: "Allocative efficiency decreases. Explanation: Allocative efficiency falls because the tax causes the market to produce less than the efficient output where QS = QD. The lost trades generate deadweight loss, which means the market is no longer fully efficient.",
        }
      ]
    }
  ]
};

export const microUnit1Set1: FRQExam = {
  examTitle: "AP Microeconomics Unit 1 FRQ: Production Possibilities & Opportunity Cost",
  thumbnailUrl: "/images/frqPracticePage/unit1MicroFRQCover.jpg", // Placeholder
  unit: 1,
  questions: [
    {
      id: 20,
      subject: 'micro',
      title: 'Unit 1 FRQ - PPC Construction & Efficiency',
      questionNumber: 1,
      prompt: "The data provided in the table below describe a bakery's daily production possibilities for croissants and bagels.",
      expertTip: "Pay close attention to the numbers to determine the shape of the curve. If the Opportunity Cost is constant (1-for-1 trade-off), the line is straight. If you have to give up increasing amounts of one good to get the other, the curve is bowed out (concave).",
      image: undefined,
      tableData: {
        headers: ["Croissants", "0", "20", "40", "60", "80"],
        rows: [
          ["Bagels", "100", "90", "70", "40", "0"]
        ]
      },
      parts: [
        {
          label: "A",
          pointValue: 2,
          text: "Draw a correctly labeled graph of the bakery's production possibilities curve (PPC) with croissants on the horizontal axis and bagels on the vertical axis. Plot the specific points from the table on your graph.",
          answerType: "draw",
          answer: "The graph should have 'Bagels' on the Y-axis and 'Croissants' on the X-axis. The curve connecting the points (0,100), (20,90), (40,70), (60,40), and (80,0) should be concave (bowed out) from the origin.",
        },
        {
          label: "B",
          pointValue: 2,
          text: "Is the opportunity cost of producing croissants increasing, decreasing, or constant? Explain using numbers from the table.",
          answerType: "text",
          answer: "Increasing. Explanation: As the bakery produces more croissants, they must give up increasing amounts of bagels. The first 20 croissants cost 10 bagels (100-90). The next 20 croissants cost 20 bagels (90-70). The final 20 croissants cost 40 bagels (40-0). Since the amount given up is rising, opportunity cost is increasing.",
        },
        {
          label: "C",
          pointValue: 1,
          text: "The bakery is currently producing 40 croissants and 70 bagels. Calculate the opportunity cost of increasing croissant production to 60 croissants. Show your work.",
          answerType: "text",
          answer: "30 Bagels. Explanation: At 40 croissants, the bakery produces 70 bagels. At 60 croissants, the bakery produces 40 bagels. The opportunity cost is the difference: 70 - 40 = 30 bagels.",
        },
        {
          label: "D",
          pointValue: 1,
          text: "Would it be efficient for the bakery to produce 40 croissants and 40 bagels? Explain using numbers in the table.",
          answerType: "text",
          answer: "No (Inefficient). Explanation: According to the table, if the bakery produces 40 croissants, it is capable of producing 70 bagels. Producing only 40 bagels means resources are being underutilized (or unemployment exists), placing the point inside the PPC.",
        },
        {
          label: "E",
          pointValue: 1,
          text: "Assume that the demand for bagels increases significantly in the town where the bakery operates. How will this change be represented on your graph in part (a)? Explain.",
          answerType: "text",
          answer: "It will not shift the curve. Explanation: A change in demand does not change the productive capacity (resources or technology) of the bakery. It would be represented by a movement along the curve to a point with a higher quantity of bagels and fewer croissants, but the PPC itself remains stationary.",
        }
      ]
    }
  ]
};




export const microUnit2Set2: FRQExam = {
  examTitle: "AP Microeconomics Unit 2 FRQ: International Trade and Tariffs",
  thumbnailUrl: "/images/frqPracticePage/microUnit2Set2.svg", // Using existing image as fallback
  unit: 2,
  questions: [
    {
      id: 25,
      subject: 'micro',
      title: 'Unit 2 FRQ - Import Tariffs',
      questionNumber: 1,
      prompt: "The diagram below shows the domestic supply and demand for Good Z in the country of Novadia. ",
      expertTip: "To calculate Tariff Revenue, you first need to find the new quantity of imports. Imports = Quantity Demanded - Quantity Supplied at the tariff price (Pt). Then multiply by the tariff amount (Pt - Pw).",
      image: '/images/frqPracticePage/microUnit2Set2.svg',
      parts: [
        {
          label: "A",
          pointValue: 2,
          text: "At the world price of Pw = $40, does Novadia export or import Good Z? Indicate the quantity of imports or exports.",
          answerType: "text" as const,
          answer: "Novadia Imports 120 units. Explanation: At Pw ($40), the domestic quantity demanded (Point W) is 150 units, and the domestic quantity supplied (Point S) is 30 units. Imports = 150 - 30 = 120.",
        },
        {
          label: "B",
          pointValue: 2,
          text: "After the tariff is imposed, the price rises to Pt = $60. Calculate the value of each of the following in Novadia:",
          subparts: [
            {
              label: "i",
              pointValue: 1,
              text: "Consumer surplus",
              answerType: "text" as const,
              answer: "$5,400. Explanation: Consumer surplus is the area of the triangle above the price that consumers pay and below the demand curve. The base of the triangle is 120 units. The height of the triangle is $150 - 60 = $90. The area of the triangle is 0.5 * base * height = 0.5 *120 * 90 = $5,400.",
            },
            {
              label: "ii",
              pointValue: 1,
              text: "Producer surplus",
              answerType: "text" as const,
              answer: "$900. Explanation: Producer surplus is the area of the triangle below the price that producers receive and above the supply curve. The base of the triangle is 60 units. The height of the triangle is $60 - 30 = $30. The area of the triangle is 0.5 * base * height = 0.5 *60 * 30 = $900.",
            },
          ]
        },
        {
          label: "C",
          pointValue: 1,
          text: "Indicate how employment in the domestic industry that produces Good Z is affected by the tariff. Explain.",
          answerType: "text" as const,
          answer: "Employment increases. Explanation: At the higher tariff price (Pt), domestic production increases from 30 units (Point S) to 60 units (Point T). Domestic firms hire more workers to increase output.",
        },
        {
          label: "D",
          pointValue: 2,
          text: "Calculate the total Tariff Revenue collected by the Novadian government. Show your work.",
          answerType: "text" as const,
          answer: "$1,200. Explanation: The new quantity of imports at Pt is 120 (Point V) - 60 (Point T) = 60 units. The tariff per unit is $60 - $40 = $20. Revenue = 60 units * $20/unit = $1,200.",
        },
        {
          label: "E",
          pointValue: 1,
          text: "Based on the change in domestic production caused by the tariff, explain one potential long-run consequence of this policy on the efficiency of Novadia's economy.",
          answerType: "text" as const,
          answer: "Decreased long-run efficiency. Explanation: The tariff causes Novadia to shift resources toward producing Good Z, even though it has a comparative disadvantage (indicated by the high domestic cost). This inefficient allocation of resources creates a Deadweight Loss and reduces total economic surplus.",
        },
      ],
    },
  ],
};

export const microUnit2Set6: FRQExam = {
  examTitle: "AP Microeconomics Unit 2 FRQ: Utility Maximization",
  thumbnailUrl: "/images/frqPracticePage/microUnit2Set2.svg", // Using existing image as fallback
  unit: 2,
  questions: [
    {
      id: 26,
      subject: 'micro',
      title: 'Unit 2 FRQ - Consumer Choice Theory',
      questionNumber: 1,
      prompt: "Janice is a consumer who spends her income on hamburgers and sodas. The table below shows the marginal benefit she receives from consuming each additional unit of hamburgers and sodas. Each hamburger costs $6 and each soda costs $3.",
      expertTip: "Utility maximization occurs when the marginal benefit per dollar (MB/P) is equal for the last unit of each good consumed. If MBx/Px > MBy/Py, the consumer should switch spending to Good X.",
      image: undefined,
      tableData: {
        headers: ["Quantity", "Marginal Benefit of Hamburgers", "Marginal Benefit of Sodas"],
        rows: [
          ["1", "$24", "$12"],
          ["2", "$18", "$9"],
          ["3", "$12", "$6"],
          ["4", "$6", "$3"],
          ["5", "$2", "$1"]
        ]
      },
      parts: [
        {
          label: "A",
          pointValue: 1,
          text: "Calculate the total benefit Janice receives from consuming a combination of 2 hamburgers and 2 sodas.",
          answerType: "text" as const,
          answer: "$63. Explanation: Sum the marginal benefits of the first 2 units of each good. Hamburgers: $24 + $18 = $42. Sodas: $12 + $9 = $21. Total Benefit = $42 + $21 = $63.",
        },
        {
          label: "B", 
          pointValue: 2,
          text: "Calculate Janice's total consumer surplus if she chooses to consume 3 sodas. Show your work.",
          answerType: "text" as const,
          answer: "$18. Explanation: Consumer Surplus is the difference between marginal benefit and Price for each unit consumed. 1st Soda: $12 - $3 = $9 2nd Soda: $9 - $3 = $6 3rd Soda: $6 - $3 = $3 Total CS = $9 + $6 + $3 = $18.",
        },
        {
          label: "C",
          text: "Now assume that Janice has a budget of $18 to spend on hamburgers and sodas.",
          subparts: [
            {
              label: "i",
              pointValue: 2,
              text: "Janice spends her entire budget of $18 buying 1 hamburger and 4 sodas. Explain why this combination does not maximize her utility. Use marginal analysis to explain your answer.",
              answerType: "text" as const,
              answer: "This is not optimal because the marginal benefit per dollar is higher for hamburgers than for sodas. MB/P for the 1st Hamburger = $24 / $6 = 4. MB/P for the 4th Soda = $3 / $3 = 1. Since 4 > 1, Janice gains more utility per dollar from hamburgers. To maximize utility, she should consume more hamburgers and fewer sodas.",
            },
            {
              label: "ii",
              pointValue: 2,
              text: "What is the utility-maximizing combination of hamburgers and sodas Janice should purchase with her $18 budget?",
              answerType: "text" as const,
              answer: "2 Hamburgers and 2 Sodas. Explanation: Cost: (2 * $6) + (2 * $3) = $12 + $6 = $18. Marginal analysis check: MB/P of 2nd Hamburger = $18 / $6 = 3. MB/P of 2nd Soda = $9 / $3 = 3. Since MB/P is equal (3 = 3) and the budget is fully spent, this is the optimal combination.",
            }
          ]
        }
      ]
    }
  ]
};

export const microUnit3Set2: FRQExam = {
  examTitle: "AP Microeconomics Unit 3 FRQ: Perfect Competition and Government Intervention",
  thumbnailUrl: "/images/frqPracticePage/U3FRQMicroCover.jpg",
  unit: 3,
  questions: [
    {
      id: 27,
      subject: 'micro',
      title: 'Unit 3 FRQ - Perfect Competition Shocks',
      questionNumber: 1,
      prompt: "Copper is a metal used extensively in electronics and wiring. Assume the market for copper is perfectly competitive and is currently operating in long-run equilibrium.",
      expertTip: "Remember: A lump-sum tax acts like a Fixed Cost. It shifts the ATC curve upward but does NOT change the Marginal Cost (MC) curve. Since the profit-maximizing quantity is determined where MR = MC, a lump-sum tax does NOT change the quantity produced in the short run.",
      image: undefined, // Placeholder
      parts: [
        {
          label: "A",
          pointValue: 2,
          text: "Draw correctly labeled side-by-side graphs for the copper market and a representative copper firm. On your graphs show each of the following.",
          answerType: "draw",
          subparts: [
            {
              label: "i",
              text: "The equilibrium price and quantity in the copper market, labeled PM and QM, respectively.",
              answer: "Market graph should show downward sloping D and upward sloping S intersecting at PM and QM."
            },
            {
              label: "ii",
              text: "The profit-maximizing quantity produced by the representative firm earning zero economic profit, labeled QF.",
              answer: "Firm graph should show a horizontal Demand/MR curve at PM. The MC curve intersects MR at QF. The minimum of the ATC curve must tangent the Demand curve at QF (Zero Economic Profit)."
            }
          ]
        },
        {
          label: "B",
          pointValue: 2,
          text: "Assume there is a severe global recession that reduces consumer income, and copper is a normal good. On your graphs in part (a), show what will happen to each of the following in the short run.",
          answerType: "draw",
          subparts: [
            {
              label: "i",
              text: "The market price and quantity of copper, labeled P2 and Q2.",
              answer: "The Market Demand curve shifts to the left. The new intersection establishes a lower price P2 and lower quantity Q2."
            },
            {
              label: "ii",
              text: "The area of the profit or loss earned by the representative copper firm, shaded completely.",
              answer: "On the Firm graph, the MR curve shifts down to P2. The new quantity is where P2 = MC. The shaded area is the rectangle between the new Price (P2) and the ATC curve at that quantity (Loss)."
            }
          ]
        },
        {
          label: "C",
          pointValue: 2,
          text: "Instead of the recession, assume the government sets a binding price floor in the copper market. Draw a new correctly labeled graph for the copper market and show each of the following.",
          answerType: "draw",
          subparts: [
            {
              label: "i",
              text: "The binding price floor, labeled PF.",
              answer: "The graph should show a horizontal line labeled PF drawn above the equilibrium price."
            },
            {
              label: "ii",
              text: "The quantity of copper purchased by consumers, labeled QD, and the quantity supplied by producers, labeled QS.",
              answer: "QD is the point where PF intersects the Demand curve. QS is the point where PF intersects the Supply curve. (QS > QD, indicating a surplus)."
            }
          ]
        },
        {
          label: "D",
          pointValue: 1,
          text: "Gold is a substitute in production for copper (mines can easily switch between extracting copper or gold). If the price of gold increases significantly, what will happen to the supply of copper? Explain.",
          answerType: "text",
          answer: "The supply of copper will decrease. Explanation: Since gold is now more profitable to extract, mining firms will reallocate resources from copper mines to gold mines, shifting the copper supply curve to the left."
        },
        {
          label: "E",
          pointValue: 1,
          text: "Assume the government imposes a lump-sum tax on all copper producers to pay for environmental cleanup. Identify the effect of this tax on the firm's profit-maximizing quantity in the short run. Explain.",
          answerType: "text",
          answer: "The quantity will remain the same. Explanation: A lump-sum tax increases Fixed Costs, which shifts the Average Total Cost (ATC) curve upward, but does NOT affect Marginal Cost (MC). Since the profit-maximizing rule is MR = MC, and neither MR nor MC has changed, the optimal quantity (QF) remains unchanged."
        }
      ]
    }
  ]
};


export const microUnit3Set3: FRQExam = {
  examTitle: "AP Microeconomics Unit 3 FRQ: Perfect Competition and Cost Curves",
  thumbnailUrl: "/images/frqPracticePage/U3FRQMicroCover.jpg",
  unit: 3,
  questions: [
    {
      id: 28,
      subject: 'micro',
      title: 'Unit 3 FRQ - Perfect Competition and Costs',
      questionNumber: 1,
      prompt: "The market for Avocados is perfectly competitive and is currently operating in long-run equilibrium.",
      expertTip: "Distinguish between Lump-Sum and Per-Unit. A Lump-Sum tax/subsidy changes Fixed Costs (moves ATC only). A Per-Unit tax/subsidy changes Variable Costs (moves MC and ATC). Only changes to MC affect the profit-maximizing quantity.",
      image: null,
      parts: [
        {
          label: "A",
          pointValue: 2,
          text: "Draw correctly labeled side-by-side graphs for the avocado market and a firm that produces avocados. On your graphs show each of the following.",
          answerType: "draw",
          referenceImageUrl: "/images/frqPracticePage/microUnit3Set3A.jpg",
          subparts: [
            {
              label: "i",
              text: "The equilibrium price and quantity in the market, labeled Pm and Qm.",
              answer: "The market graph shows a downward sloping Demand curve and upward sloping Supply curve intersecting. The equilibrium price is labeled Pm and quantity is labeled Qm."
            },
            {
              label: "ii",
              text: "The profit-maximizing price and quantity for the firm, labeled Pf and Qf.",
              answer: "The firm graph shows a horizontal Demand/MR curve at the price Pm (so Pf equals Pm). The Marginal Cost (MC) curve intersects the MR curve at quantity Qf. The minimum of the Average Total Cost (ATC) curve touches the Demand curve at Qf, indicating zero economic profit."
            }
          ]
        },
        {
          label: "B",
          pointValue: 2,
          text: "A new medical study is published showing that eating avocados significantly improves memory. On your graphs in part (a), show the effect of this study on the market and the firm in the short run.",
          answerType: "draw",
          referenceImageUrl: "/images/frqPracticePage/microUnit3Set3B.jpg",
          subparts: [
            {
              label: "ii",
              text: "Shade the area of economic profit or loss for the avacado firm.",
              answerType: "draw",
              answer: "On the firm graph, the MR curve shifts upward to the new price P2. The firm produces where P2 equals MC. The shaded area is the rectangle defined by the new quantity, the new price P2 (top), and the ATC curve value at that quantity (bottom). This represents an economic profit.",
              referenceImageUrl: "/images/frqPracticePage/microUnit3Set3BII.jpg"
            }
          ]
        },
        {
          label: "C",
          pointValue: 1,
          text: "The government decides to provide a lump-sum subsidy to all avocado producers to support agriculture. What happens to the profit-maximizing quantity produced by the avacado firm in the short run? Explain.",
          answerType: "text",
          answer: "The quantity remains the same. Explanation: A lump-sum subsidy reduces Fixed Costs, which shifts the Average Total Cost (ATC) curve downward. However, it does not change Marginal Cost (MC). Since the firm maximizes profit where MR equals MC, and neither curve has shifted, the quantity Qf does not change."
        },
        {
          label: "D",
          pointValue: 1,
          text: "Instead of the subsidy, assume the price of water, a variable input for growing avocados, increases. What happens to the profit-maximizing quantity produced by the representative farmer in the short run? Explain.",
          answerType: "text",
          answer: "The quantity decreases. Explanation: An increase in the price of a variable input increases Marginal Cost (MC). The MC curve shifts upward (and to the left). The new intersection of MR and MC occurs at a lower quantity."
        },
        {
          label: "E",
          pointValue: 1,
          text: "Following the increase in the price of water from part (D), what will happen to the market supply curve for avocados? Explain.",
          answerType: "text",
          answer: "The market supply curve will shift to the left. Explanation: The market supply curve is the horizontal summation of all individual firms' Marginal Cost curves (above AVC). Since the MC curve for every firm shifted up/left due to the higher variable cost, the entire market supply decreases."
        }
      ]
    }
  ]
};


export const microUnit3Set4: FRQExam = {
  examTitle: "AP Microeconomics Unit 3 FRQ: Short-Run Cost Curves",
  thumbnailUrl: "/images/frqPracticePage/U3FRQMicroCover.jpg",
  unit: 3,
  questions: [
    {
      id: 29,
      subject: 'micro',
      title: 'Unit 3 FRQ - Cost Curves and Shutdown Point',
      questionNumber: 1,
      prompt: "The graph below shows the short-run cost structure of a firm in a perfectly competitive industry.",
      expertTip: "Remember the 'Nike Swoosh' shapes. Marginal Cost (MC) cuts through the minimum points of both Average Total Cost (ATC) and Average Variable Cost (AVC). The vertical distance between ATC and AVC represents Average Fixed Cost (AFC), which gets smaller as output increases.",
      image: '/images/frqPracticePage/microUnit3Set4.svg',
      parts: [
        {
          label: "A",
          pointValue: 3,
          text: "Identify the cost curves that are denoted by each of the following labels.",
          subparts: [
            {
              label: "i",
              text: "Curve 1",
              answerType: "text",
              answer: "Marginal Cost (MC). Explanation: It intersects the minimum points of both the ATC and AVC curves."
            },
            {
              label: "ii",
              text: "Curve 2",
              answerType: "text",
              answer: "Average Total Cost (ATC). Explanation: It is U-shaped and lies above the AVC curve."
            },
            {
              label: "iii",
              text: "Curve 3",
              answerType: "text",
              answer: "Average Variable Cost (AVC). Explanation: It is U-shaped and lies below the ATC curve, getting closer to ATC as output increases."
            }
          ]
        },
        {
          label: "B",
          pointValue: 2,
          text: "Explain why Curve 1 does each of the following as output increases.",
          subparts: [
            {
              label: "i",
              text: "Initially decreases",
              answerType: "text",
              answer: "Specialization (or Increasing Marginal Returns). Explanation: As the first few units of variable input are added to fixed inputs, workers can specialize, causing marginal product to rise and marginal cost to fall."
            },
            {
              label: "ii",
              text: "Finally increases",
              answerType: "text",
              answer: "Diminishing Marginal Returns. Explanation: As more units of variable input are added to a fixed amount of capital/land, the marginal product of the variable input eventually falls, causing the marginal cost of producing additional units to rise."
            }
          ]
        },
        {
          label: "C",
          pointValue: 1,
          text: "What measure of cost is represented by the vertical distance between Curve 2 and Curve 3?",
          answerType: "text",
          answer: "Average Fixed Cost (AFC). Explanation: ATC = AVC + AFC. Therefore, the difference between ATC and AVC is AFC."
        },
        {
          label: "D",
          pointValue: 1,
          text: "Explain why the vertical distance between Curve 2 and Curve 3 decreases as output increases.",
          answerType: "text",
          answer: "Spreading of Fixed Costs. Explanation: Total Fixed Cost is constant. As output (Q) increases, Average Fixed Cost (TFC / Q) becomes smaller and smaller, causing the gap between ATC and AVC to narrow."
        },
        {
          label: "E",
          pointValue: 1,
          text: "Identify the price point at which the firm will shut down in the short run. Explain why.",
          answerType: "text",
          answer: "Price P2 (where MC intersects AVC). Explanation: This is the Shutdown Point. If the price falls below minimum Average Variable Cost (AVC), the firm cannot cover its variable costs of operation. It loses less money by shutting down (loss = Fixed Costs) than by operating (loss = Fixed Costs + portion of Variable Costs). Note: Based on standard diagrams, the shutdown price is the minimum of Curve 3 (AVC)."
        }
      ]
    }
  ]
};


export const microUnit4Set1: FRQExam = {
  examTitle: "AP Microeconomics Unit 4 FRQ: Monopoly and Price Discrimination",
  thumbnailUrl: "/images/U4FRQMicroCover.jpg",
  unit: 4,
  questions: [
    {
      id: 30,
      subject: 'micro',
      title: 'Unit 4 FRQ - Monopoly Behavior',
      questionNumber: 1,
      prompt: "Solaris Tech holds a patent for a revolutionary solar battery, giving it monopoly power in the market. Solaris Tech currently charges a single price to all consumers and earns positive economic profits.",
      expertTip: "A single-price monopolist produces where MR = MC and charges a price from the Demand curve. However, a Perfect Price Discriminator has a Marginal Revenue curve that is identical to the Demand curve. They produce until P = MC, eliminating Deadweight Loss but also eliminating Consumer Surplus.",
      parts: [
        {
          label: "A",
          pointValue: 1,
          text: "Explain why the demand curve lies above the marginal revenue curve for Solaris Tech.",
          answerType: "text",
          answer: "To sell an additional unit of output, the monopolist must lower the price on all units sold, not just the last one. Therefore, the additional revenue generated (Marginal Revenue) is always less than the price charged for that unit (Demand)."
        },
        {
          label: "B",
          pointValue: 2,
          text: "Using a correctly labeled graph for Solaris Tech, show each of the following.",
          answerType: "draw",
          answer: "The graph should show: (i) The intersection of the downward sloping Marginal Revenue (MR) curve and the Marginal Cost (MC) curve, with the quantity corresponding to this intersection on the X-axis labeled Q*. (ii) Go up from Q* to the Demand curve, then across to the Y-axis to label P*. (iii) The shaded rectangle for economic profits is bounded by the quantity Q*, the price P* on the top, and the Average Total Cost (ATC) curve on the bottom.",
          subparts: [
            {
              label: "i",
              text: "The profit-maximizing level of output, labeled Q*",
              answer: "The intersection of the downward sloping Marginal Revenue (MR) curve and the Marginal Cost (MC) curve. The quantity corresponding to this intersection on the X-axis is Q*."
            },
            {
              label: "ii",
              text: "The profit-maximizing price, labeled P*",
              answer: "Go up from Q* to the Demand curve, then across to the Y-axis to label P*."
            },
            {
              label: "iii",
              text: "Economic profits, as a shaded area",
              answer: "The shaded rectangle is bounded by the quantity Q*, the price P* on the top, and the Average Total Cost (ATC) curve on the bottom."
            }
          ]
        },
        {
          label: "C",
          pointValue: 2,
          text: "If Solaris Tech wants to maximize its total revenues instead of profits, using the graph from part (b) show the following.",
          subparts: [
            {
              label: "i",
              text: "Revenue-maximizing level of output, labeled Qr",
              answerType: "draw",
              answer: "Qr is located where the Marginal Revenue (MR) curve crosses the horizontal axis (where MR = 0)."
            },
            {
              label: "ii",
              text: "Revenue-maximizing price, labeled Pr",
              answerType: "draw",
              answer: "Go up from Qr to the Demand curve, then across to the Y-axis to label Pr."
            }
          ]
        },
        {
          label: "D",
          pointValue: 1,
          text: "Given your answer in part (b), indicate whether Solaris Tech is producing the allocatively efficient level of output. Explain.",
          answerType: "text",
          answer: "No. Explanation: Allocative efficiency occurs where Price equals Marginal Cost (P = MC). At the profit-maximizing quantity Q*, the price charged (from the Demand curve) is greater than the Marginal Cost. Therefore, resources are underallocated to the production of solar batteries."
        },
        {
          label: "E",
          pointValue: 2,
          text: "Suppose that Solaris Tech develops the ability to perfectly price discriminate.",
          subparts: [
            {
              label: "i",
              text: "What happens to the number of units sold compared to the single-price equilibrium? Explain.",
              answerType: "text",
              answer: "The number of units sold increases. Explanation: A perfectly price discriminating monopolist continues to sell units as long as the price a consumer is willing to pay is greater than or equal to the marginal cost. They will produce up to the quantity where Demand intersects Marginal Cost."
            },
            {
              label: "ii",
              text: "What happens to consumer surplus? Explain.",
              answerType: "text",
              answer: "Consumer surplus decreases to zero. Explanation: Since the firm charges every individual consumer exactly their maximum willingness to pay, there is no difference between the price paid and the consumer's value. The entire surplus is captured by the monopolist as profit."
            }
          ]
        }
      ]
    }
  ]
};


export const microUnit4Set3: FRQExam = {
  examTitle: "AP Microeconomics Unit 4 FRQ: Monopolistic Competition",
  thumbnailUrl: "/images/U4FRQMicroCover.jpg",
  unit: 4,
  questions: [
    {
      id: 31,
      subject: 'micro',
      title: 'Unit 4 FRQ - Monopolistic Competition',
      questionNumber: 1,
      prompt: "Luna Lighting operates in a monopolistically competitive market producing designer lamps. The graph above shows the cost and revenue curves for the firm.",
      expertTip: "In monopolistic competition, 'Short-Run Profit' attracts new firms. This entry increases the number of substitutes, causing the Demand curve for the existing firm to shift to the LEFT until it is tangent to the ATC curve (Zero Profit).",
      image: '/images/frqPracticePage/microUnit4Set3.svg',
      parts: [
        {
          label: "A",
          pointValue: 2,
          text: "Is Luna Lighting currently in long-run equilibrium? Explain.",
          answerType: "text",
          answer: "No. Explanation: The firm is currently earning positive economic profits because the price (on the Demand curve) is greater than the Average Total Cost (ATC) at the profit-maximizing quantity. In long-run equilibrium for monopolistic competition, the firm would earn zero economic profit (Price equals ATC)."
        },
        {
          label: "B",
          pointValue: 2,
          text: "Using the graph above, identify each of the following.",
          subparts: [
            {
              label: "i",
              text: "The profit-maximizing price",
              answerType: "text",
              answer: "$25. Explanation: The profit-maximizing price is found by locating the quantity where MR = MC, then going up to the Demand curve. The price value read from the vertical axis at that point is $25."
            },
            {
              label: "ii",
              text: "The profit-maximizing quantity",
              answerType: "text",
              answer: "30 units. Explanation: The profit-maximizing quantity is where the Marginal Revenue (MR) curve intersects the Marginal Cost (MC) curve. This quantity value read from the horizontal axis is 30 units."
            },
            {
              label: "iii",
              text: "Calculate the total consumer surplus at the profit-maximizing level of output. Show your work.",
              answerType: "text",
              answer: "225. Explanation: Consumer Surplus = (1/2) × (Maximum Willingness to Pay - Price) × Quantity. At the profit-maximizing output of 30 units and price of $25, with a maximum willingness to pay of $40 (vertical intercept of Demand curve), Consumer Surplus = (1/2) × ($40 - $25) × 30 = (1/2) × $15 × 30 = 0.5 × 450 = 225."
            }
          ]
        },
        {
          label: "C",
          pointValue: 2,
          text: "If Luna Lighting wants to maximize its total revenues instead of profits, identify the revenue-maximizing quantity and price.",
          answerType: "text",
          answer: "Revenue-maximizing quantity: Qr (where MR = 0). Revenue-maximizing price: Pr (found by going up from Qr to the Demand curve). Explanation: Total revenue is maximized where Marginal Revenue equals zero. This occurs where the MR curve intersects the horizontal axis. The corresponding price is found by going vertically from this quantity up to the Demand curve, then horizontally to the price axis. The revenue-maximizing quantity is greater than the profit-maximizing quantity (Q*), and the revenue-maximizing price is lower than the profit-maximizing price (P*).",
        },
        {
          label: "D",
          pointValue: 1,
          text: "Given your answer in part (b), indicate whether Luna Lighting is producing the allocatively efficient level of output. Explain.",
          answerType: "text",
          answer: "No. Explanation: Allocative efficiency occurs where Price equals Marginal Cost (P = MC). At the profit-maximizing level of output Q*, the price charged is greater than the Marginal Cost. This means the firm is underproducing relative to the social optimum, creating deadweight loss."
        },
        {
          label: "E",
          pointValue: 1,
          text: "What will happen to the demand curve for Luna Lighting's lamps as the market adjusts to the long-run equilibrium? Explain.",
          answerType: "text",
          answer: "The demand curve will shift to the left. Explanation: Because Luna Lighting is earning short-run economic profits, new firms will enter the market producing close substitutes. This increases competition, reducing the market share for Luna Lighting and lowering the demand for its specific product until profits fall to zero."
        }
      ]
    }
  ]
};


export const microUnit5Set2: FRQExam = {
  examTitle: "AP Microeconomics Unit 5 FRQ: Monopsony and Minimum Wage",
  thumbnailUrl: "/images/U5FRQMicroCover.jpg",
  unit: 5,
  questions: [
    {
      id: 32,
      subject: 'micro',
      title: 'Unit 5 FRQ - Monopsony Labor Market',
      questionNumber: 1,
      prompt: "The graph above shows the Marginal Revenue Product, Marginal Resource Cost, and Supply of Labor curves for a firm that is the sole employer in a small town.",
      expertTip: "A monopsony creates a 'wage gap' because it pays workers less than their Marginal Revenue Product. Minimum wage laws can theoretically increase employment in a monopsony by fixing the marginal cost of labor, making the firm a wage-taker up to a certain point.",
      image: '/images/frqPracticePage/microUnit5Set2.svg',
      parts: [
        {
          label: "A",
          pointValue: 2,
          text: "Identify the profit-maximizing quantity of labor and the wage rate the monopsony will pay. Explain how you determined your answer.",
          answerType: "text",
          answer: "Quantity: 75 workers. Wage: $10. Explanation: The firm maximizes profit where the Marginal Resource Cost (MRC) equals the Marginal Revenue Product (Demand). This intersection occurs at 75 workers. The firm then pays the wage indicated by the Supply curve at that quantity, which is $10."
        },
        {
          label: "B",
          pointValue: 2,
          text: "Explain why the Marginal Resource Cost (MRC) curve lies above the Supply of Labor curve for this firm.",
          answerType: "text",
          answer: "Because the firm must raise wages to hire additional workers. Explanation: To attract an additional worker, the monopsony must offer a higher wage than the previous rate. However, it must also pay this higher wage to all existing workers. This means the marginal cost of the new worker includes their wage plus the raises given to all other employees, making MRC higher than the wage rate shown on the supply curve."
        },
        {
          label: "C",
          pointValue: 2,
          text: "Suppose this firm operated in a perfectly competitive labor market instead. Identify the profit-maximizing quantity of labor and the equilibrium wage rate.",
          answerType: "text",
          answer: "Quantity: 125 workers. Wage: $20. Explanation: In a perfectly competitive market, equilibrium is determined where the Market Supply of Labor equals the Market Demand for Labor. The curves intersect at 125 workers and a wage of $20."
        },
        {
          label: "D",
          pointValue: 2,
          text: "Assume the government imposes a binding minimum wage of $20. Will the number of workers hired by the firm increase, decrease, or stay the same? Identify the new quantity of workers hired.",
          answerType: "text",
          answer: "Increase to 125 workers. Explanation: The minimum wage makes the firm a wage-taker at $20. The firm's new Marginal Resource Cost curve becomes horizontal at $20 up to the point where it hits the supply curve (at 125 workers). Since the firm maximizes profit where the new MRC ($20) equals MRP (Demand), and MRP is $20 at 125 workers, the firm will hire 125 workers."
        }
      ]
    }
  ]
};


export const microUnit5Set3: FRQExam = {
  examTitle: "AP Microeconomics Unit 5 FRQ: Perfectly Competitive Labor Markets",
  thumbnailUrl: "/images/U5FRQMicroCover.jpg",
  unit: 5,
  questions: [
    {
      id: 33,
      subject: 'micro',
      title: 'Unit 5 FRQ - Labor Market Shocks',
      questionNumber: 1,
      prompt: "Construction workers in the city of Buildburg operate in a perfectly competitive labor market. Klien's Construction is one of many firms that hire construction workers in this market.",
      expertTip: "In a perfectly competitive labor market, the firm is a wage taker. This means the Market determines the wage, and the Firm's Supply of Labor curve is perfectly elastic (horizontal) at that wage rate. Also remember that the Firm's Demand for Labor is its MRP curve.",
      image: undefined,
      parts: [
        {
          label: "A",
          pointValue: 2,
          text: "Draw correctly labeled side-by-side graphs for the labor market for construction workers and Klien's Construction.",
          answerType: "draw",
          answer: "The market graph shows a downward-sloping Demand curve and an upward-sloping Supply curve intersecting at We and Qe. The firm graph shows a downward-sloping Marginal Revenue Product (MRP) curve and a horizontal Marginal Resource Cost (MRC) curve (Supply of Labor) at the level of We. The firm's wage Wf is equal to We. The firm hires quantity qf where MRP intersects MRC.",
          referenceImageUrl: "/images/frqPracticePage/microUnit5Set3A.jpg",
          subparts: [
            {
              label: "i",
              text: "Show the market equilibrium wage, labeled We, and quantity, labeled Qe."
            },
            {
              label: "ii",
              text: "On the graph for the firm, show the wage paid by the firm, labeled Wf, and the quantity of workers hired, labeled Qf."
            }
          ]
        },
        {
          label: "B",
          pointValue: 1,
          text: "Is the equilibrium wage paid by Klien's Construction greater than, less than, or equal to the marginal resource cost of the last worker hired?",
          answerType: "text",
          answer: "Equal to. Explanation: In a perfectly competitive labor market, the firm is a wage taker, meaning the additional cost of hiring one more worker (MRC) is constant and equal to the market wage rate."
        },
        {
          label: "C",
          pointValue: 1,
          text: "Explain why the marginal revenue product curve for Klien's Construction is shaped the way it is.",
          answerType: "text",
          answer: "The curve is downward sloping because of the Law of Diminishing Marginal Returns. As the firm hires more workers, the marginal product of each additional worker eventually decreases. Since MRP equals Marginal Product times Price, and the price of the output is constant in perfect competition, the falling Marginal Product causes MRP to decrease as quantity increases."
        },
        {
          label: "D",
          pointValue: 3,
          text: "Assume that an unbearably hot summer causes a large portion of construction workers to seek alternative work in indoor industries. Show the impact of this change on your graphs in part (A) and answer the following.",
          answerType: "draw",
          referenceImageUrl: "/images/frqPracticePage/microUnit5Set3D.jpg",
          subparts: [
            {
              label: "i",
              text: "Show the shift on the labor market graph and label the new equilibrium wage W2."
            },
            {
              label: "ii",
              text: "As a result of the change in the market, what happens to the number of workers hired by Klien's Construction? Explain.",
              answerType: "text",
              answer: "The number of workers decreases. Explanation: The firm takes the new, higher market wage W2 as its new Marginal Resource Cost. This shifts the horizontal MRC curve upward. The new MRC intersects the downward-sloping MRP curve at a lower quantity of labor."
            },
            {
              label: "iii",
              text: "Is the marginal revenue product of the last worker hired greater than, less than, or equal to the marginal revenue product of the last worker hired prior to the hot summer? Explain.",
              answerType: "text",
              answer: "Greater than. Explanation: The firm maximizes profit by hiring where MRP equals the Wage (MRC). Since the new market wage W2 is higher than the original wage We, the firm stops hiring at a point where the MRP is equal to that higher wage. Additionally, hiring fewer workers means the marginal product of the last worker is higher due to diminishing returns."
            }
          ]
        }
      ]
    }
  ]
};



export const microUnit6Set1: FRQExam = {
  examTitle: "AP Microeconomics Unit 6 FRQ: Market Failure and Externalities",
  thumbnailUrl: "/images/U6FRQMicroCover.jpg",
  unit: 6,
  questions: [
    {
      id: 34,
      subject: 'micro',
      title: 'Unit 6 FRQ - Externality Graph',
      questionNumber: 1,
      prompt: "The graph below illustrates the market for Good Z, and shows the Marginal Private Benefit (MPB), Marginal Private Cost (MPC), Marginal Social Benefit (MSB), and Marginal Social Cost (MSC).",
      expertTip: "Always identify the type of externality by looking at the divergence. If MSB is above MPB, it is a Positive Consumption Externality (spillover benefit). The vertical distance between the two curves represents the Marginal External Benefit (MEB).",
      image: '/images/frqPracticePage/microUnit6Set1.svg',
      parts: [
        {
          label: "A",
          pointValue: 2,
          text: "Identify the market equilibrium price and quantity, and the socially optimal price and quantity.",
          subparts: [
            {
              label: "i",
              text: "Market Equilibrium price and quantity",
              answerType: "text",
              answer: "Price: $10. Quantity: Q1. Explanation: The private market ignores external benefits and operates where Marginal Private Benefit (MPB) equals Marginal Private Cost (MPC)."
            },
            {
              label: "ii",
              text: "Socially Optimal price and quantity",
              answerType: "text",
              answer: "Price: $12. Quantity: Q2. Explanation: The social optimum occurs where Marginal Social Benefit (MSB) equals Marginal Social Cost (MSC). This includes the spillover benefits to society."
            }
          ]
        },
        {
          label: "B",
          pointValue: 1,
          text: "Calculate the Marginal External Benefit (MEB) at the market equilibrium quantity. Show your work.",
          answerType: "text",
          answer: "$3. Explanation: The Marginal External Benefit is the vertical difference between the MSB curve and the MPB curve. At Q1, the MSB is $13 and the MPB is $10. MEB = $13 - $10 = $3."
        },
        {
          label: "C",
          pointValue: 2,
          text: "Identify a policy the government could use to correct the externality and achieve the socially efficient quantity. Include the specific tax or subsidy amount needed.",
          answerType: "text",
          answer: "A per-unit subsidy of $3. Explanation: To internalize a positive externality, the government should provide a subsidy equal to the Marginal External Benefit ($3). This lowers the effective price for consumers or increases the benefit, shifting the MPB curve upward (or MPC downward) until the market outcome aligns with Q2."
        },
        {
          label: "D",
          pointValue: 1,
          text: "If the government takes no action and leaves the market unregulated, does deadweight loss exist? Explain using the values from the graph.",
          answerType: "text",
          answer: "Yes. Explanation: At the market quantity Q1, the Marginal Social Benefit ($13) is greater than the Marginal Social Cost ($10). This means society values the next unit more than it costs to produce. By stopping at Q1 instead of Q2, society misses out on net benefits (welfare), creating deadweight loss represented by the area of the triangle between Q1 and Q2."
        }
      ]
    }
  ]
};

export const microUnit6Set2: FRQExam = {
  examTitle: "AP Microeconomics Unit 6 FRQ: Social Benefit and Cost Analysis",
  thumbnailUrl: "/images/U6FRQMicroCover.jpg",
  unit: 6,
  questions: [
    {
      id: 35,
      subject: 'micro',
      title: 'Unit 6 FRQ - Optimal Provision of Public Goods',
      questionNumber: 1,
      prompt: "The town of Lakewood is deciding how many free public Wi-Fi hotspots to install. The table below shows the Total Social Benefit (TSB) and Total Social Cost (TSC) associated with various numbers of hotspots.",
      expertTip: "To find the optimal quantity, you must calculate the Marginal Social Benefit (MSB) and Marginal Social Cost (MSC) for each unit. The optimal quantity is where MSB equals MSC. If they are never exactly equal, stop at the last unit where MSB is greater than MSC.",
      image: undefined,
      tableData: {
        headers: ["Number of Hotspots", "Total Social Benefit ($)", "Total Social Cost ($)"],
        rows: [
          ["0", "0", "0"],
          ["1", "100", "20"],
          ["2", "190", "50"],
          ["3", "270", "90"],
          ["4", "340", "140"],
          ["5", "400", "200"],
          ["6", "450", "270"]
        ]
      },
      parts: [
        {
          label: "A",
          pointValue: 1,
          text: "Calculate the Marginal Social Benefit (MSB) of the 3rd hotspot. Show your work.",
          answerType: "text",
          answer: "$80. Explanation: Marginal Social Benefit is the change in Total Social Benefit resulting from one additional unit. MSB = TSB of 3 units - TSB of 2 units = 270 - 190 = 80."
        },
        {
          label: "B",
          pointValue: 2,
          text: "Identify the socially optimal number of hotspots to install. Explain using marginal analysis.",
          answerType: "text",
          answer: "5 hotspots. Explanation: The socially optimal quantity occurs where the Marginal Social Benefit equals the Marginal Social Cost. For the 5th unit, the MSB is $60 (400 - 340) and the MSC is $60 (200 - 140). Since MSB = MSC at 5 units, this is the optimal quantity."
        },
        {
          label: "C",
          pointValue: 3,
          text: "Assume the state government imposes a $20 regulatory fee for each hotspot installed, up to the fifth unit. The fee is paid by the town, increasing the marginal social cost of installing hotspots.",
          subparts: [
            {
              label: "i",
              text: "Calculate the new Marginal Social Cost (MSC) of the 4th hotspot.",
              answerType: "text",
              answer: "$70. Explanation: The original MSC of the 4th unit was $50 (140 - 90). The new fee adds $20 to the marginal cost of that unit. New MSC = 50 + 20 = 70."
            },
            {
              label: "ii",
              text: "What is the new socially optimal quantity of hotspots? Explain.",
              answerType: "text",
              answer: "4 hotspots. Explanation: With the fee, the MSC of the 4th unit becomes $70, which equals the MSB of the 4th unit ($70). The MSC of the 5th unit becomes $80 (Original 60 + 20), which is greater than the MSB of the 5th unit ($60). Therefore, the town should stop at 4 units."
            }
          ]
        },
        {
          label: "D",
          pointValue: 1,
          text: "If the town installs the 6th hotspot, would the net benefit to society increase, decrease, or stay the same compared to the 5th hotspot (assuming no government fees)? Explain.",
          answerType: "text",
          answer: "Decrease. Explanation: For the 6th hotspot, the Marginal Social Benefit is $50 (450 - 400) and the Marginal Social Cost is $70 (270 - 200). Since the cost of the 6th unit ($70) is greater than the benefit it provides ($50), installing it reduces the total net benefit to society."
        }
      ]
    }
  ]
};

export const frqExams: FRQExam[] = [
  macroUnit4Set1,
  macroUnit4Set3,
  macroUnit2Set1,
  macroUnit3Set1,
  macroUnit5Set1,
  macroUnit5Set2,
  macroUnit1Set2,
  macroUnit4Set2,
  macroUnit4Set4,
  macroUnit4Set5,
  macroUnit6Set2,
  macroUnit2Set2,
  macroUnit3Set3,
  macroUnit3Set4,
  macroUnit2Set4,
  macroUnit5Set3,
  macroUnit6Set3,
  microUnit5Set1,
  microUnit4Set2,
  macroUnit6Set1,
  microUnit2Set5,
  microUnit2Set2,
  microUnit2Set6,
  microUnit3Set2,
  microUnit3Set3, 
  microUnit3Set4,
  microUnit4Set1,
  microUnit4Set3, 
  microUnit5Set2,  
  microUnit5Set3,
  microUnit6Set1, 
  microUnit6Set2
];
