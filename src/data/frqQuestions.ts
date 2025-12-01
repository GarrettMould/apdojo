export interface FRQSubPart {
  label: string;
  text: string;
  answerType: 'draw' | 'text';
  answer?: string | any;
  gradingCriteria?: string;
  videoUrl?: string;
}

export interface FRQPart {
  label: string;
  text: string;
  answerType?: 'draw' | 'text'; // Made optional
  answer?: string | any;
  subparts?: FRQSubPart[];
  gradingCriteria?: string;
  videoUrl?: string;
}

export interface FRQQuestion {
  questionNumber: number;
  prompt: string;
  image?: string | null;
  tableData?: {
    headers: string[];
    rows: (string | number)[][];
  };
  parts: FRQPart[];
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

export const frqExams: FRQExam[] = [
  // Exam 1: Macro Unit 4
  {
    examTitle: "AP Macroeconomics Unit 4 FRQ: Ample Reserves",
    thumbnailUrl: "/images/unit4MacroFRQCover.jpg",
    questions: [
      {
        questionNumber: 4,
        prompt: "Assume the economy of Northland is currently operating below full employment and the banking system has ample reserves.",
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
                answerType: "text" as const,
                answer: "The graph should show the intersection of AD and SRAS (Y1 and PL1) to the left of the LRAS curve.",
                gradingCriteria: "2 points: Correctly identifies and labels the current equilibrium point (Y1, PL1) at the intersection of AD and SRAS, positioned to the left of LRAS. 1 point: Identifies the equilibrium but labels are missing or incorrectly positioned. 0 points: Does not correctly identify or label the equilibrium.",
              },
              {
                label: "ii",
                text: "Full-employment output, labeled Yf.",
                answerType: "text" as const,
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
    ],
  },
  // Exam 2: Micro Unit 5
  {
    examTitle: "AP Microeconomics Unit 5 FRQ: Factor Markets",
    thumbnailUrl: "/images/U5FRQMicro.jpg",
    questions: [
      {
        questionNumber: 1,
        prompt: "The table below shows the daily production data for a firm operating in a perfectly competitive product market and a perfectly competitive labor market. The firm sells its product for $10 per unit, and the market wage rate for workers is $150 per day.",
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
          },
          {
            label: "B",
            text: "Should the firm hire the 3rd worker? Explain using marginal analysis.",
            answerType: "text" as const,
            answer: "Yes, the firm should hire the 3rd worker. Explanation: The Marginal Revenue Product (MRP) of the 3rd worker is $200 (MP of 20 units * $10 price). The Marginal Resource Cost (MRC) is the wage of $150. Since MRP ($200) > MRC ($150), hiring the worker adds to total profit.",
          },
          {
            label: "C",
            text: "Calculate the profit-maximizing number of workers this firm should hire.",
            answerType: "text" as const,
            answer: "4 workers. Explanation: At 4 workers, the MP is 15 (80 - 65). The MRP is $150 (15 * $10). The MRC is $150. The firm hires up to the point where MRP = MRC.",
          },
          {
            label: "D",
            text: "Draw a correctly labeled graph of the labor market and the firm side-by-side. Show the equilibrium wage (We) and quantity (Qe) in the market, and the wage (We) and quantity (Qf) for the firm.",
            answerType: "draw" as const,
            answer: microUnit5FRQA1D,
            subparts: [
              {
                 label: "i",
                 text: "Ensure the firm's graph clearly labels the demand for labor (MRP) and the supply of labor (MRC).",
                 answerType: "text" as const,
                 answer: "The firm's graph should show a downward-sloping MRP curve and a horizontal MRC curve (perfectly elastic supply of labor) at the market wage We."
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
  }
];
