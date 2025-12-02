export interface FRQSubPart {
  label: string;
  text: string;
  answerType?: 'draw' | 'text';
  answer?: string | any;
  gradingCriteria?: string;
  videoUrl?: string;
  videoAspectRatio?: 'vertical' | 'horizontal';
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
  subject: 'macro' | 'micro';
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
  questions: FRQQuestion[];
}

// Define image paths - some are placeholders for now
const OUTPUTLOW = '/images/OUTPUTLOW.svg';
const PRDOWN = '/images/PRDOWN.svg';
const microUnit5FRQA1D = '/images/ID2QD.svg';
const microUnit5FRQA1E = '/images/ID2QE.svg';
const macroSetOneFRQA5APlaceholder = '/images/logo.png';
const macroSetOneFRQA5CPlaceholder = '/images/logo.png';

export const ampleReservesExam: FRQExam = {
  examTitle: "AP Macroeconomics Unit 4 FRQ: Ample Reserves",
  thumbnailUrl: "/images/unit4MacroFRQCover.jpg",
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
          text: "Identify one specific monetary policy action the central bank would take to restore full employment.",
          answerType: "text" as const,
          answer: "Decrease the interest on reserves (IOR) rate.",
          videoUrl: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/frqExplanations/U4V2.mp4",
        },
        {
          label: "C",
          text: "Draw a correctly labeled graph of the reserve market and show the effect of the monetary policy action identified in part (B) on the policy rate.",
          answerType: "draw" as const,
          answer: PRDOWN,
          gradingCriteria: "2 points: Graph correctly shows the reserve market with properly labeled axes (Reserves/Quantity of Reserves on X-axis, Interest Rate/Policy Rate on Y-axis). Demand for reserves curve and supply of reserves curve are shown. The effect of decreasing IOR is correctly illustrated (supply curve shifts down or demand shifts appropriately), resulting in a decrease in the policy rate. 1 point: Graph shows most elements correctly but is missing one key component (e.g., missing axis labels, incorrect curve representation, or missing policy effect). 0 points: Graph does not meet the criteria or is completely incorrect.",
          videoUrl: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/frqExplanations/U4V3.mp4",
        },
        {
          label: "D",
          text: "Based on the change in the policy rate shown in part (C), will the quantity of investment demanded increase, decrease, or stay the same?",
          answerType: "text" as const,
          answer: "Increase. Explanation: The decrease in the policy rate reduces the cost of borrowing, which incentivizes businesses to increase investment spending.",
          videoUrl: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/frqExplanations/U4V4.mp4",
        },
        {
          label: "E",
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
          text: "Identify the number of workers at which diminishing marginal returns first sets in. Explain.",
          answerType: "text" as const,
          answer: "Diminishing marginal returns set in with the 3rd worker. Explanation: The marginal product (MP) of the 2nd worker is 25 (45 - 20), while the MP of the 3rd worker is 20 (65 - 45). Since 20 < 25, marginal product has begun to decrease.",
          videoUrl: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/frqExplanations/ID2QA.mp4",
          videoAspectRatio: 'vertical',
        },
        {
          label: "B",
          text: "Should the firm hire the 3rd worker? Explain using marginal analysis.",
          answerType: "text" as const,
          answer: "Yes, the firm should hire the 3rd worker. Explanation: The Marginal Revenue Product (MRP) of the 3rd worker is $200 (MP of 20 units * $10 price). The Marginal Resource Cost (MRC) is the wage of $150. Since MRP ($200) > MRC ($150), hiring the worker adds to total profit.",
          videoUrl: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/frqExplanations/ID2QB.mp4",
          videoAspectRatio: 'vertical',
        },
        {
          label: "C",
          text: "Calculate the profit-maximizing number of workers this firm should hire.",
          answerType: "text" as const,
          answer: "4 workers. Explanation: At 4 workers, the MP is 15 (80 - 65). The MRP is $150 (15 * $10). The MRC is $150. The firm hires up to the point where MRP = MRC.",
          videoUrl: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/frqExplanations/ID2QC.mp4",
          videoAspectRatio: 'vertical',
        },
        {
          label: "D",
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
          text: "Assume the government implements a new regulation that limits the number of workers certified to work in this specific industry. Show the impact of this change on your graphs in part (D).",
          // answerType and answer removed from parent
          subparts: [
            {
              label: "i",
              text: "Show the impact of this change on your graphs in part (D).",
              answerType: "draw" as const,
              answer: microUnit5FRQA1E,
              videoUrl: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/frqExplanations/ID2QE.mp4",
              videoAspectRatio: 'vertical',
            },
            {
              label: "ii",
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
          text: "If 'Stacey's Coffee' chooses to Advertise and 'Daily Grind' chooses Not to Advertise, what is the daily profit for 'Daily Grind'?",
          answerType: "text",
          answer: "$200. Explanation: This corresponds to the top-right cell of the matrix. Stacey's Coffee earns $1,000 and Daily Grind earns $200.",
        },
        {
          label: "B",
          text: "Does 'Daily Grind' have a dominant strategy? Explain using specific values from the payoff matrix.",
          answerType: "text",
          answer: "Yes, Daily Grind has a dominant strategy to Advertise. Explanation: If Stacey's Coffee chooses to Advertise, Daily Grind is better off Advertising ($500) than Not Advertising ($200). If Stacey's Coffee chooses Not to Advertise, Daily Grind is better off Advertising ($1,000) than Not Advertising ($800). Since Advertising yields a higher payoff regardless of the opponent's choice, it is a dominant strategy.",
        },
        {
          label: "C",
          text: "Identify the Nash Equilibrium for this game. Explain why this outcome is a Nash Equilibrium.",
          answerType: "text",
          answer: "The Nash Equilibrium is for both firms to Advertise (Stacey's Coffee: $500, Daily Grind: $500). Explanation: At this outcome, neither firm has an incentive to deviate. If Stacey's Coffee switches to 'Not Advertise', their profit falls from $500 to $200. If Daily Grind switches to 'Not Advertise', their profit falls from $500 to $200.",
        },
        {
          label: "D",
          text: "Suppose the two firms agree to cooperate and form a cartel to maximize their combined profits. If both firms stick to the agreement, what will be the profit for 'Stacey's Coffee'?",
          answerType: "text",
          answer: "$800. Explanation: To maximize combined profits, both firms would agree to 'Not Advertise', resulting in the bottom-right cell where both earn $800.",
        }
      ]
    }
  ]
};

export const macroBankingExam = {
  examTitle: "AP Macroeconomics Unit 4 FRQ: The Banking System",
  thumbnailUrl: "/images/unit4MacroFRQCover.jpg",
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
          text: "What is the amount by which Regional Bank's liabilities have changed as a result of Sarah's deposit? Explain.",
          answerType: "text",
          answer: "Liabilities increased by $10,000. Explanation: When Sarah deposits the money, the bank now owes that money back to her on demand. Therefore, the demand deposit (a liability to the bank) increases by the full amount of the deposit.",
        },
        {
          label: "B",
          text: "Calculate the change in excess reserves for Regional Bank immediately after the deposit. Show your work.",
          answerType: "text",
          answer: "$8,000. Explanation: The required reserves are 20% of $10,000, which equals $2,000. Excess reserves = Total Reserves - Required Reserves. $10,000 - $2,000 = $8,000.",
        },
        {
          label: "C",
          text: "What is the dollar value of the maximum amount of new loans Regional Bank can initially make as a result of this deposit? Explain.",
          answerType: "text",
          answer: "$8,000. Explanation: A single bank can only lend out its excess reserves. Since Regional Bank has $8,000 in excess reserves calculated in part (b), this is the maximum amount they can initially lend.",
        },
        {
          label: "D",
          text: "Based on the central bank's open-market purchase of bonds, calculate the maximum amount by which the money supply can change throughout the entire banking system. Show your work.",
          answerType: "text",
          answer: "$50,000. Explanation: The money multiplier is 1 / Reserve Ratio (1 / 0.20 = 5). Since the Central Bank purchase injected $10,000 of new monetary base into the system, the total maximum change is the Initial Injection x Money Multiplier ($10,000 x 5 = $50,000).",
        },
        {
          label: "E",
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
          text: "Calculate each of the following for Year 2. Show your work.",
          subparts: [
            {
              label: "i",
              text: "Real GDP per capita for Highland",
              answerType: "text",
              answer: "$10. Explanation: First, calculate Real GDP: ($720 / 120) * 100 = $600. Then, divide by population: $600 / 60 = $10."
            },
            {
              label: "ii",
              text: "Real GDP per capita for Lowland",
              answerType: "text",
              answer: "$16. Explanation: First, calculate Real GDP: ($500 / 125) * 100 = $400. Then, divide by population: $400 / 25 = $16."
            }
          ]
        },
        {
          label: "B",
          text: "If Highland and Lowland have the same velocity of money in Year 2, which country must have the higher money supply in Year 2? Explain.",
          answerType: "text",
          answer: "Highland. Explanation: According to the equation of exchange (MV = PY), if Velocity (V) is constant, the Money Supply (M) is determined by Nominal GDP (PY). Since Highland has a higher Nominal GDP in Year 2 ($720) compared to Lowland ($500), Highland must have the higher money supply."
        },
        {
          label: "C",
          text: "Calculate each of the following in Year 2. Show your work.",
          subparts: [
            {
              label: "i",
              text: "The inflation rate in Highland",
              answerType: "text",
              answer: "20%. Explanation: ((120 - 100) / 100) * 100 = 20%."
            },
            {
              label: "ii",
              text: "The inflation rate in Lowland",
              answerType: "text",
              answer: "25%. Explanation: ((125 - 100) / 100) * 100 = 25%."
            }
          ]
        },
        {
          label: "D",
          text: "Based on your answer to part (c), if the nominal interest rate is the same for both nations in Year 2, which nation experiences the higher real interest rate in Year 2? Explain.",
          answerType: "text",
          answer: "Highland. Explanation: Real Interest Rate = Nominal Interest Rate - Inflation Rate. Since Highland has a lower inflation rate (20%) than Lowland (25%), subtracting a smaller number from the same nominal rate results in a higher real interest rate for Highland."
        },
        {
          label: "E",
          text: "Based on your answer to part (c)(ii), if the expected inflation rate in Lowland in Year 2 was 10%, what would be the effect on real GDP as the economy adjusts to its long-run equilibrium? Explain.",
          answerType: "text",
          answer: "Real GDP will decrease. Explanation: Since the actual inflation rate (25%) was higher than expected (10%), the economy is operating in an inflationary gap (output is above full employment). In the long run, nominal wages and input costs will increase to match the higher price levels, shifting the Short-Run Aggregate Supply (SRAS) curve to the left, returning Real GDP to the lower full-employment level."
        }
      ]
    }
  ]
};

export const foreignExchangeFRQExam: FRQExam = {
  examTitle: "AP Macroeconomics FRQ: Foreign Exchange",
  thumbnailUrl: "/images/logo.png",
  questions: [
    {
      id: 4,
      subject: 'macro',
      title: 'Unit 6 FRQ - Foreign Exchange Market',
      questionNumber: 5,
      difficulty: 'hard',
      isLocked: true,
      prompt: "Canada and Mexico are major trading partners and the exchange rate between the Canadian dollar and the Mexican peso is determined in a flexible foreign exchange market.",
      expertTip: "Remember the 'mirror effect' in Forex markets. An action that increases the demand for one currency must cause an increase in the supply of the other currency. You can't just shift one graph!",
      image: null,
      parts: [
        {
          label: "A",
          text: "Assume that Mexican consumers develop a strong preference for Canadian-made electric vehicles. Draw a correctly labeled graph of the foreign exchange market for the Canadian dollar, and show the effect of this change in tastes on the equilibrium exchange rate for the Canadian dollar.",
          answerType: "draw",
          answer: macroSetOneFRQA5APlaceholder,
          subparts: [
             {
               label: "i",
               text: "Explanation of graph shift:",
               answerType: "text",
               answer: "The demand for Canadian dollars will increase (shift right). To purchase Canadian electric vehicles, Mexican consumers must first exchange their pesos for Canadian dollars. This increased demand causes the Canadian dollar to appreciate."
             }
          ]
        },
        {
          label: "B",
          text: "Will each of the following increase, decrease, or stay the same as a result of the change in tastes described in part (a)?",
          subparts: [
            {
              label: "i",
              text: "Canada's net exports. Explain.",
              answerType: "text",
              answer: "Increase. The change in tastes results in higher demand for Canadian exports. Since exports are a positive component of net exports (Exports - Imports), Canada's net exports will increase."
            },
            {
              label: "ii",
              text: "Unemployment in Canada. Explain.",
              answerType: "text",
              answer: "Decrease. The increase in net exports causes Aggregate Demand (AD) in Canada to increase. A rightward shift in AD leads to higher real output and a lower cyclical unemployment rate."
            },
            {
              label: "iii",
              text: "Canada's long-run aggregate supply.",
              answerType: "text",
              answer: "Stay the same. A change in consumer tastes or aggregate demand does not affect the productive capacity (resources, technology, capital stock) of the economy in the long run."
            }
          ]
        },
        {
          label: "C",
          text: "Assume instead that the Mexican government increases deficit spending to fund infrastructure projects. Draw a correctly labeled graph of the loanable funds market in Mexico, and show the effect of the increase in deficit spending on the equilibrium real interest rate.",
          answerType: "draw",
          answer: macroSetOneFRQA5CPlaceholder, 
        },
        {
          label: "D",
          text: "Based on the change in the equilibrium real interest rate identified in part (c), what will happen to financial capital flows to Mexico?",
          answerType: "text",
          answer: "Financial capital flows to Mexico will increase. Foreign investors seek higher returns, and the higher real interest rate in Mexico makes Mexican financial assets more attractive compared to assets in other countries.",
        },
        {
          label: "E",
          text: "Based on your answer to part (d), what will happen to the international value of the Mexican peso in the foreign exchange market? Explain.",
          answerType: "text",
          answer: "The Mexican peso will appreciate. As foreign investors exchange their currency for pesos to invest in Mexican financial assets, the demand for the peso increases (and/or the supply of pesos decreases), raising its value."
        },
        {
          label: "F",
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
  macroUnit2DataExam,
  factorMarketsExam,
  microGameTheoryExam,
  foreignExchangeFRQExam
];
