export interface FRQSubPart {
  label: string;
  text: string;
  answerType?: 'draw' | 'text';
  answer?: string | any;
  gradingCriteria?: string;
  videoUrl?: string;
  videoAspectRatio?: 'vertical' | 'horizontal';
  pointValue?: number;
}

export interface FRQPart {
  label: string;
  text: string;
  answerType?: 'draw' | 'text'; // Made optional
  answer?: string | any;
  subparts?: FRQSubPart[];
  gradingCriteria?: string;
  videoUrl?: string;
  videoAspectRatio?: 'vertical' | 'horizontal';
  pointValue?: number;
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
const OUTPUTLOW = '/images/OUTPUTLOW.svg';
const PRDOWN = '/images/PRDOWN.svg';
const microUnit5FRQA1D = '/images/ID2QD.svg';
const microUnit5FRQA1E = '/images/ID2QE.svg';
const macroSetOneFRQA5APlaceholder = '/images/logo.png';
const macroSetOneFRQA5CPlaceholder = '/images/logo.png';
const macroMoneyMarketBuy = '/images/macroMoneyMarketBuy.png';
const macroLoanableFundsFiscal = '/images/macroLoanableFundsFiscal.png';

export const ampleReservesExam: FRQExam = {
  examTitle: "AP Macroeconomics Unit 4 FRQ: Ample Reserves",
  thumbnailUrl: "/images/unit4MacroFRQCover.jpg",
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
          answer: OUTPUTLOW,
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
          answer: PRDOWN,
          gradingCriteria: "2 points: Graph correctly shows the reserve market with properly labeled axes (Reserves/Quantity of Reserves on X-axis, Interest Rate/Policy Rate on Y-axis). Demand for reserves curve and supply of reserves curve are shown. The effect of decreasing IOR is correctly illustrated (supply curve shifts down or demand shifts appropriately), resulting in a decrease in the policy rate. 1 point: Graph shows most elements correctly but is missing one key component (e.g., missing axis labels, incorrect curve representation, or missing policy effect). 0 points: Graph does not meet the criteria or is completely incorrect.",
          videoUrl: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/frqExplanations/U4V3.mp4",
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

export const factorMarketsExam: FRQExam = {
  examTitle: "AP Microeconomics Unit 5 FRQ: Factor Markets",
  thumbnailUrl: "/images/U5FRQMicro.jpg",
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
          text: "Draw a correctly labeled graph of the labor market and the firm side-by-side. Show the equilibrium wage (We) and quantity (Qe) in the market, and the wage (We) and quantity (Qf) for the firm.",
          answerType: "draw" as const,
          answer: microUnit5FRQA1D,
          videoUrl: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/frqExplanations/ID2QD.mp4",
          videoAspectRatio: 'vertical',
          subparts: [
            {
               label: "i",
               text: "Ensure the firm's graph clearly labels the demand for labor (MRP) and the supply of labor (MRC).",
            }
          ]
        },
        {
          label: "E",
          pointValue: 2,
          text: "Assume the government implements a new regulation that limits the number of workers certified to work in this specific industry. Show the impact of this change on your graphs in part (D).",
          // answerType and answer removed from parent
          subparts: [
            {
              label: "i",
              pointValue: 2,
              text: "Show the impact of this change on your graphs in part (D).",
              answerType: "draw" as const,
              answer: microUnit5FRQA1E,
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

export const microGameTheoryExam: FRQExam = {
  examTitle: "AP Microeconomics Unit 4 FRQ: Game Theory",
  thumbnailUrl: '/images/microGameTheoryMatrix.png',
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

export const macroBankingExam: FRQExam = {
  examTitle: "AP Macroeconomics Unit 4 FRQ: The Banking System",
  thumbnailUrl: "/images/unit4MacroFRQCover.jpg",
  unit: 4,
  questions: [
    {
      id: 5,
      subject: 'macro',
      title: 'Unit 4 FRQ - Banking & Money Creation',
      questionNumber: 1,
      prompt: "The central bank purchases $10,000 worth of government bonds from Sarah, who deposits the entire proceeds into her checking account at 'Regional Bank.' The banking system has limited reserves, and the required reserve ratio is 20%.",
      expertTip: "When calculating the 'Maximum Change in Money Supply', remember to determine if the injection is 'new money' (like a Fed purchase) or existing currency deposited. A Fed purchase adds entirely new reserves to the system, triggering the full multiplier effect.",
      image: undefined,
      tableData: undefined,
      parts: [
        {
          label: "A",
          pointValue: 2,
          text: "What is the amount by which Regional Bank's liabilities have changed as a result of Sarah's deposit? Explain.",
          answerType: "text",
          answer: "Liabilities increased by $10,000. Explanation: When Sarah deposits the money, the bank now owes that money back to her on demand. Therefore, the demand deposit (a liability to the bank) increases by the full amount of the deposit.",
        },
        {
          label: "B",
          pointValue: 1,
          text: "Calculate the change in excess reserves for Regional Bank immediately after the deposit. Show your work.",
          answerType: "text",
          answer: "$8,000. Explanation: The required reserves are 20% of $10,000, which equals $2,000. Excess reserves = Total Reserves - Required Reserves. $10,000 - $2,000 = $8,000.",
        },
        {
          label: "C",
          pointValue: 1,
          text: "What is the dollar value of the maximum amount of new loans Regional Bank can initially make as a result of this deposit?",
          answerType: "text",
          answer: "$8,000. Explanation: A single bank can only lend out its excess reserves. Since Regional Bank has $8,000 in excess reserves calculated in part (b), this is the maximum amount they can initially lend.",
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

export const macroUnit2DataExam: FRQExam = {
  examTitle: "AP Macroeconomics Unit 2 FRQ: Economic Indicators",
  thumbnailUrl: "/images/unit4MacroFRQCover.jpg",
  unit: 2,
  questions: [
    {
      id: 6,
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

export const macroUnit3Exam: FRQExam = {
  examTitle: "AP Macroeconomics Unit 3 FRQ: National Income & Price Determination",
  thumbnailUrl: "/images/unit4MacroFRQCover.jpg", // Using a relevant placeholder
  unit: 3,
  questions: [
    {
      id: 7,
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
          text: "Draw a correctly labeled graph of the long-run aggregate supply, short-run aggregate supply, and aggregate demand curves. Label the current equilibrium output as Y1 and the full-employment output as Yf.",
          answerType: "draw",
          answer: "The graph should show the AD and SRAS curves intersecting to the RIGHT of the vertical LRAS curve. The intersection point is labeled Y1 ($600B) and PL1. The vertical LRAS line is labeled Yf ($500B).",
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
          text: "Assume instead that the government decides to change government spending to close the gap. Calculate the minimum change in government spending required to close the gap completely.",
          answerType: "text",
          answer: "Decrease spending by $20 billion. Explanation: The Spending Multiplier is 1/MPS = 1/0.2 = 5. To reduce GDP by $100 billion: Change in GDP = Spending Change * Spending Multiplier -> -$100 = Spending Change * 5 -> Spending Change = -$20 billion.",
        }
      ]
    }
  ]
};

export const macroUnit5Set1: FRQExam = {
  examTitle: "AP Macroeconomics Unit 5 FRQ: The Phillips Curve",
  thumbnailUrl: "/images/unit4MacroFRQCover.jpg",
  unit: 5,
  questions: [
    {
      id: 8,
      subject: 'macro',
      title: 'Unit 5 FRQ - Phillips Curve and Interest Rates',
      questionNumber: 1,
      prompt: "Inflation and unemployment are two critical economic indicators that policymakers closely monitor. The relationship between them is often analyzed using the Phillips curve framework. Assume the economy of 'Agraria' is currently operating at its full-employment level of output.",
      expertTip: "Remember that the Short-Run Phillips Curve (SRPC) shifts in the opposite direction of the Short-Run Aggregate Supply (SRAS) curve. An adverse supply shock shifts SRAS to the left, which corresponds to a rightward shift of the SRPC.",
      image: undefined,
      tableData: undefined,
      parts: [
        {
          label: "A",
          pointValue: 2,
          text: "Draw a correctly labeled graph of a short-run Phillips curve (SRPC). On your graph, label a point 'A' that represents the current state of the economy at full employment.",
          answerType: "draw",
          answer: "The graph should have the 'Inflation Rate' on the vertical axis and the 'Unemployment Rate' on the horizontal axis. A downward-sloping curve should be labeled 'SRPC'. Point 'A' should be located on the SRPC at a point that corresponds to the natural rate of unemployment (LRPC intersection, if drawn).",
        },
        {
          label: "B",
          pointValue: 2,
          text: "Assume that Agraria experiences a severe drought that significantly reduces crop yields, creating an adverse supply shock. On your graph from part (a), show the effect of this shock on the short-run Phillips curve.",
          answerType: "draw",
          answer: "The adverse supply shock leads to stagflation (higher inflation and higher unemployment). This is represented by a rightward (or upward) shift of the entire SRPC curve. The new curve should be labeled 'SRPC2'.",
        },
        {
          label: "C",
          pointValue: 2,
          text: "On your graph from part (a), draw the long-run Phillips curve (LRPC). Explain what the LRPC represents.",
          answerType: "draw",
          answer: "The LRPC should be drawn as a vertical line at the natural rate of unemployment. Explanation: The vertical LRPC indicates that in the long run, there is no trade-off between inflation and unemployment. The economy gravitates toward its natural rate of unemployment regardless of the inflation rate, as expectations adjust.",
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
  thumbnailUrl: "/images/unit4MacroFRQCover.jpg", // You can link a screenshot of a table here if you have one
  unit: 5,
  questions: [
    {
      id: 9,
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
          text: "Draw a correctly labeled graph of a short-run Phillips curve for Zephyria. Plot the data points for Year 1 and Year 2, labeling them as Point 1 and Point 2, respectively.",
          answerType: "draw",
          answer: "The graph should show a downward-sloping SRPC. Point 1 should be lower on the curve (High Unemp: 6%, Low Inf: 2%). Point 2 should be higher on the curve (Low Unemp: 3%, High Inf: 7%). This illustrates a movement up and to the left along the curve.",
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
          answer: "The LRPC should be drawn as a vertical line at the 6% unemployment mark on the horizontal axis. It should pass through Point 1 (from part A) if that point represented the natural rate conditions.",
        },
        {
          label: "D",
          pointValue: 1,
          text: "Identify one specific fiscal policy action that the government could have taken in Year 2 to return the unemployment rate to the natural rate immediately, rather than waiting for the long-run adjustment.",
          answerType: "text",
          answer: "Decrease Government Spending OR Increase Taxes. (Contractionary fiscal policy reduces Aggregate Demand, moving the economy down the SRPC back towards the natural rate).",
        }
      ]
    }
  ]
};

export const macroUnit1Set2: FRQExam = {
  examTitle: "AP Macroeconomics Unit 1 FRQ: Comparative Advantage & Trade",
  thumbnailUrl: "/images/unit4MacroFRQCover.jpg", 
  unit: 1,
  questions: [
    {
      id: 10, 
      subject: ['macro', 'micro'],
      title: 'Unit 1 FRQ - Comparative Advantage & PPC',
      questionNumber: 1,
      prompt: "The graph below shows the production possibilities curves for two countries, Novus and Vetus. Novus can produce 80 units of Cotton or 40 units of Wool. Vetus can produce 40 units of Cotton or 120 units of Wool. Assume constant opportunity costs for both nations.",
      expertTip: "To find the Opportunity Cost, always put the 'Other' good On Top (OOO). For example, to find the cost of 1 unit of Cotton, divide the maximum Wool by the maximum Cotton.",
      // You can insert the SVG component code provided below into your image renderer here
      image: '/images/macroUnit1Set2.svg', 
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
          text: "Calculate the opportunity cost of producing one unit of Cotton for each country. Based on these calculations, which country has the comparative advantage in Cotton?",
          answerType: "text",
          answer: "Novus has the comparative advantage. Explanation: For Novus, 1 unit of Cotton costs 0.5 units of Wool (40/80). For Vetus, 1 unit of Cotton costs 3 units of Wool (120/40). Since 0.5 < 3, Novus gives up less to produce Cotton.",
        },
        {
          label: "C",
          pointValue: 1,
          text: "Identify a specific numerical value for the terms of trade (exchange rate) of Cotton for Wool that would be beneficial for both countries to accept.",
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
  thumbnailUrl: "/images/unit4MacroFRQCover.jpg",
  unit: 4,
  questions: [
    {
      id: 11,
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
          subparts: [
           
          ]
        }
      ]
    }
  ]
};

export const macroUnit6Set2: FRQExam = {
  examTitle: "AP Macroeconomics Unit 6 FRQ: Capital Flight & Exchange Rate Intervention",
  thumbnailUrl: "/images/unit4MacroFRQCover.jpg",
  unit: 6,
  questions: [
    {
      id: 12,
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
          text: "Draw a correctly labeled graph of the foreign exchange market for the Caldon. Show the effect of the political instability on the equilibrium exchange rate.",
          answerType: "draw",
          answer: "The graph should have the 'Exchange Rate (Euros/Caldon)' on the vertical axis and 'Quantity of Caldons' on the horizontal axis. It should show a downward-sloping Demand curve and an upward-sloping Supply curve. The Demand curve must shift to the LEFT (labeled D1 to D2), representing foreign investors exiting the market. The new equilibrium point shows a LOWER exchange rate (depreciation) and a lower quantity of Caldons traded.",
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
          text: "Assume the Central Bank of Caldonia wants to return the exchange rate to its pre-crisis level. To achieve this, should the Central Bank buy or sell its reserves of the Euro? Explain.",
          answerType: "text",
          answer: "Sell Euros. Explanation: To increase the value of the Caldon (appreciate it), the Central Bank needs to increase the demand for the Caldon. They do this by entering the market, selling their foreign reserves (Euros) and using the proceeds to buy Caldons.",
        }
      ]
    }
  ]
};

export const macroUnit2Set2: FRQExam = {
  examTitle: "AP Macroeconomics Unit 2 FRQ: CPI and Inflation",
  thumbnailUrl: "/images/unit4MacroFRQCover.jpg",
  unit: 2,
  questions: [
    {
      id: 13,
      subject: 'macro',
      title: 'Unit 2 FRQ - Price Indices & Real Income',
      questionNumber: 1,
      prompt: "The nation of 'Arcadia' produces only three consumer goods: textbooks, calculators, and notebooks. The table below shows the quantities of these goods in the market basket and their prices in Year 1 and Year 2.",
      expertTip: "Remember: The Market Basket Quantity is fixed. You use the SAME quantities for both years when calculating the total cost. Inflation is simply the percentage change in the CPI from one year to the next.",
      image: undefined,
      tableData: {
        headers: ["Product", "Market Basket Quantity", "Year 1 Price", "Year 2 Price"],
        rows: [
          ["Textbooks", "2", "$30.00", "$40.00"],
          ["Calculators", "1", "$20.00", "$20.00"],
          ["Notebooks", "10", "$2.00", "$5.00"]
        ]
      },
      parts: [
        {
          label: "A",
          pointValue: 2,
          text: "Calculate the cost of the market basket of goods in Year 1 and in Year 2. Show your work.",
          answerType: "text",
          answer: "Year 1: $100. Year 2: $150. Explanation: \nYear 1 Cost = (2 * $30) + (1 * $20) + (10 * $2) = $60 + $20 + $20 = $100. \nYear 2 Cost = (2 * $40) + (1 * $20) + (10 * $5) = $80 + $20 + $50 = $150.",
        },
        {
          label: "B",
          pointValue: 2,
          text: "Use Year 1 as the base year to calculate the price indices (CPI) for Year 1 and Year 2. Show your work.",
          answerType: "text",
          answer: "Year 1 CPI: 100. Year 2 CPI: 150. Explanation: \nCPI = (Cost of Basket in Current Year / Cost of Basket in Base Year) * 100. \nYear 1: ($100 / $100) * 100 = 100. \nYear 2: ($150 / $100) * 100 = 150.",
        },
        {
          label: "C",
          pointValue: 1,
          text: "Calculate the inflation rate between Year 1 and Year 2.",
          answerType: "text",
          answer: "50%. Explanation: Inflation Rate = ((Year 2 CPI - Year 1 CPI) / Year 1 CPI) * 100 = ((150 - 100) / 100) * 100 = 50%.",
        },
        {
          label: "D",
          pointValue: 1,
          text: "In order for a citizen of Arcadia to maintain the same standard of living between Year 1 and Year 2, what percentage change in nominal income would be needed? Explain.",
          answerType: "text",
          answer: "50%. Explanation: Since the cost of living (the price level) increased by 50%, nominal income must increase by the same percentage to maintain purchasing power.",
        },
        {
          label: "E",
          pointValue: 1,
          text: "Assume that the average nominal wage in Arcadia increased by 20% between Year 1 and Year 2. Did the real wage increase, decrease, or stay the same? Explain.",
          answerType: "text",
          answer: "Decrease. Explanation: The real wage is the nominal wage adjusted for inflation. Since the price level rose by 50% while nominal wages only rose by 20%, the purchasing power of the wage (real wage) decreased.",
        }
      ]
    }
  ]
};
export const macroUnit3Set4: FRQExam = {
  examTitle: "AP Macroeconomics Unit 3 FRQ: Inflationary Gaps & Long-Run Growth",
  thumbnailUrl: "/images/unit4MacroFRQCover.jpg",
  unit: 3,
  questions: [
    {
      id: 15,
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
          text: "Draw a correctly labeled graph of the long-run aggregate supply, short-run aggregate supply, and aggregate demand curves. Label the current short-run equilibrium real output as Y1 and the current price level as PL1. Label the full-employment output as Yf.",
          answerType: "draw",
          answer: "The graph should show a vertical LRAS curve at Yf. The downward-sloping AD and upward-sloping SRAS curves should intersect to the RIGHT of the LRAS curve. The intersection is labeled Y1 and PL1.",
        },
        {
          label: "B",
          pointValue: 1,
          text: "Assume that the government budget is currently balanced. In the absence of any discretionary policy action, will the government budget move into surplus, deficit, or remain in balance as a result of the economic conditions identified in part (a)? Explain.",
          answerType: "text",
          answer: "Move into surplus. Explanation: Because the economy is operating above full employment (high income/low unemployment), automatic stabilizers will kick in. Tax revenues (income taxes) will increase, and transfer payments (unemployment benefits) will decrease, naturally creating a budget surplus.",
        },
        {
          label: "C",
          pointValue: 2,
          text: "On your graph in part (a), show how the economy will adjust in the long run in the absence of any discretionary policy action.",
          answerType: "draw",
          answer: "The Short-Run Aggregate Supply (SRAS) curve shifts to the left. Explanation: Over time, nominal wages and input costs will rise due to the high demand for labor and resources. This increases the cost of production, shifting SRAS left until it intersects AD at the long-run aggregate supply curve (Yf).",
        },
        {
          label: "D",
          pointValue: 1,
          text: "Now assume instead the government decides to increase taxes to close the inflationary gap. What effect will this policy have on the national debt?",
          answerType: "text",
          answer: "The national debt will decrease (or grow at a slower rate). Explanation: Increasing taxes increases government revenue, moving the budget toward a surplus, which allows the government to pay down existing debt.",
        },
        {
          label: "E",
          pointValue: 2,
          text: "Draw a correctly labeled graph of the loanable funds market and show the effect of the change in the national debt identified in part (d) on the equilibrium real interest rate.",
          answerType: "draw",
          answer: "The graph should show the Demand for Loanable Funds shifting to the LEFT (or Supply shifting to the RIGHT). Explanation: As the government borrows less (or saves more/pays down debt), the demand for loanable funds decreases. This results in a lower equilibrium real interest rate.",
        },
        {
          label: "F",
          pointValue: 2,
          text: "Based on the change in the equilibrium real interest rate identified in part (e), what will happen to the rate of economic growth in the country in the long run? Explain.",
          answerType: "text",
          answer: "Economic growth will increase. Explanation: A lower real interest rate reduces the cost of borrowing for firms, which incentivizes Investment spending (I) on physical capital. An increase in the capital stock leads to an increase in the long-run productive capacity (LRAS shifts right) of the economy.",
        }
      ]
    }
  ]
};

export const macroUnit2Set4: FRQExam = {
  examTitle: "AP Macroeconomics Unit 2 FRQ: Labor Calculations & Economic Growth",
  thumbnailUrl: "/images/unit4MacroFRQCover.jpg", 
  unit: 2,
  questions: [
    {
      id: 16,
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
        },
        {
          label: "D",
          pointValue: 1,
          text: "Assume the government of Meridia implements a new national education program that significantly improves the technical skills of the workforce. Show the effect of this policy on your graph in part (C).",
          answerType: "draw",
          answer: "The entire PPC shifts outward (to the right). Explanation: Improving the quality of labor (human capital) increases the productive capacity of the economy, allowing Meridia to produce more of both Capital and Consumer goods.",
        }
      ]
    }
  ]
};

export const macroUnit3Set3: FRQExam = {
  examTitle: "AP Macroeconomics Unit 3 FRQ: Self-Adjustment & Automatic Stabilizers",
  thumbnailUrl: "/images/unit4MacroFRQCover.jpg",
  unit: 3,
  questions: [
    {
      id: 14,
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
          text: "Draw a correctly labeled graph of the long-run aggregate supply, short-run aggregate supply, and aggregate demand curves. Label the current equilibrium real output as Y1 and the current price level as PL1. Label the full-employment output as Yf.",
          answerType: "draw",
          answer: "The graph should show the downward-sloping AD curve intersecting the upward-sloping SRAS curve to the RIGHT of the vertical LRAS curve. The intersection point is labeled Y1 and PL1. The vertical LRAS line is labeled Yf, and Y1 > Yf.",
        },
        {
          label: "B",
          pointValue: 2,
          text: "Assume that the policymakers in Prosperia take no fiscal or monetary policy actions to close the output gap. Explain how the economy will adjust to full employment in the long run.",
          answerType: "text",
          answer: "The Short-Run Aggregate Supply (SRAS) curve will shift to the left. Explanation: Because the economy is operating beyond full employment, the unemployment rate is extremely low. This causes nominal wages (and other input costs) to increase. As production costs rise, firms decrease supply, shifting the SRAS curve to the left until real output returns to Yf.",
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
  thumbnailUrl: "/images/unit4MacroFRQCover.jpg",
  unit: 5,
  questions: [
    {
      id: 17,
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
  thumbnailUrl: "/images/unit4MacroFRQCover.jpg",
  unit: 6,
  questions: [
    {
      id: 18,
      subject: 'macro',
      title: 'Unit 6 FRQ - Balance of Payments Accounts',
      questionNumber: 1,
      prompt: "The table below shows the international transactions for the country of 'Tradevia' for a specific year. Amounts are in billions of dollars.",
      expertTip: "The Balance of Payments must always sum to zero. Therefore, Current Account + Financial/Capital Account = 0. If the Current Account is in deficit, the Financial Account must be in surplus (and vice versa).",
      image: undefined,
      tableData: {
        headers: ["Transaction", "Amount (Billions)"],
        rows: [
          ["Exports of Goods and Services", "+$400"],
          ["Imports of Goods and Services", "-$500"],
          ["Net Investment Income", "+$50"],
          ["Net Unilateral Transfers", "-$20"],
          ["Purchase of Foreign Assets by Tradevians", "-$100"],
          ["Purchase of Tradevian Assets by Foreigners", "+$170"]
        ]
      },
      parts: [
        {
          label: "A",
          pointValue: 2,
          text: "Calculate the balance on the Current Account for Tradevia. Show your work.",
          answerType: "text",
          answer: "-$70 Billion (Deficit). Explanation: Current Account = (Exports - Imports) + Net Investment Income + Net Unilateral Transfers. ($400 - $500) + $50 + (-$20) = -100 + 50 - 20 = -$70 Billion.",
        },
        {
          label: "B",
          pointValue: 2,
          text: "Calculate the balance on the Financial Account (Capital Account) for Tradevia. Show your work.",
          answerType: "text",
          answer: "+$70 Billion (Surplus). Explanation: Financial Account = Inflow of Foreign Capital - Outflow of Domestic Capital. (Purchase of Tradevian Assets by Foreigners) - (Purchase of Foreign Assets by Tradevians) = $170 - $100 = +$70 Billion.",
        },
        {
          label: "C",
          pointValue: 1,
          text: "Based on your calculations in parts (A) and (B), is the Balance of Payments for Tradevia balanced? Explain.",
          answerType: "text",
          answer: "Yes. Explanation: The sum of the Current Account (-$70) and the Financial Account (+$70) is zero, indicating the balance of payments accounts are balanced.",
        },
        {
          label: "D",
          pointValue: 1,
          text: "Now assume that national income in Tradevia increases significantly relative to the rest of the world. How will this affect the Trade Balance component of the Current Account? Explain.",
          answerType: "text",
          answer: "The Trade Balance will decrease (move toward deficit). Explanation: As national income rises, Tradevian consumers have more disposable income and will purchase more goods, including imports. An increase in imports, holding exports constant, decreases the trade balance (Exports - Imports).",
        },
        {
          label: "E",
          pointValue: 2,
          text: "Draw a correctly labeled graph of the foreign exchange market for Tradevia's currency, the 'Trad', and show the effect of the increase in national income identified in part (D) on the value of the Trad.",
          answerType: "draw",
          answer: "The graph should show the Supply of Trads shifting to the Right. (Alternatively, Demand for Trads could shift left if analyzing relative price levels, but income usually targets Supply of domestic currency). Explanation: To buy more imports, Tradevians must supply more Trads to the forex market to exchange for foreign currency. The increase in Supply causes the equilibrium exchange rate (Value of the Trad) to depreciate.",
        }
      ]
    }
  ]
};

export const foreignExchangeFRQExam: FRQExam = {
  examTitle: "AP Macroeconomics FRQ: Foreign Exchange",
  thumbnailUrl: "/images/logo.png",
  unit: 6,
  questions: [
    {
      id: 4,
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
          text: "Assume instead that the Mexican government increases deficit spending to fund infrastructure projects. Draw a correctly labeled graph of the loanable funds market in Mexico, and show the effect of the increase in deficit spending on the equilibrium real interest rate.",
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

export const frqExams: FRQExam[] = [
  ampleReservesExam,
  macroBankingExam,
  macroUnit2DataExam,
  macroUnit3Exam,
  macroUnit5Set1,
  macroUnit5Set2,
  macroUnit1Set2,
  macroUnit4Set2,
  macroUnit6Set2,
  macroUnit2Set2,
  macroUnit3Set3,
  macroUnit3Set4,
  macroUnit2Set4,
  macroUnit5Set3,
  macroUnit6Set3,
  factorMarketsExam,
  microGameTheoryExam,
  foreignExchangeFRQExam
];
