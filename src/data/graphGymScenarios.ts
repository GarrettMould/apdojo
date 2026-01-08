// Graph Gym Scenarios Data
// Each scenario contains a question prompt, checklist items, and a sample answer image
// Scenarios are linked to lessons in the syllabus via lessonId and can track relevant topics

export interface ChecklistItem {
  id: number;
  text: string;
}

export interface GraphGymScenario {
  id: number; // Unique numeric ID starting from 1
  subject: 'macro' | 'micro'; // Subject this scenario belongs to
  lessonId: string; // Lesson ID from syllabus (e.g., "4.2" for Unit 4, Lesson 2)
  topics: string[]; // Array of relevant topics covered in this scenario
  difficulty: 'easy' | 'medium' | 'hard'; // Difficulty level of the scenario
  title: string;
  description: string;
  correctImage: string;
  checklist: ChecklistItem[];
}

export const graphGymScenarios: GraphGymScenario[] = [
  {
    id: 1,
    subject: 'micro',
    lessonId: "4.2", // Monopoly lesson in Microeconomics Unit 4
    topics: ["Monopoly", "Long Run Equilibrium", "Profit Maximization", "Market Structure"],
    difficulty: 'medium',
    title: "Long Run Equilibrium in a Pure Monopoly",
    description: "Draw the Demand, MR, MC, and ATC curves. Label the profit-maximizing price and quantity.",
    correctImage: "https://placehold.co/600x400?text=Correct+Graph",
    checklist: [
      { id: 1, text: "MR intersects MC (Profit Max)" },
      { id: 2, text: "Price is set at Demand Curve" },
      { id: 3, text: "ATC is tangent to Demand (Zero Profit)" },
      { id: 4, text: "All curves are properly labeled" }
    ]
  },
  {
    id: 2,
    subject: 'micro',
    lessonId: "2.6",
    topics: ["Market Equilibrium", "Surplus", "Allocative Efficiency"],
    difficulty: 'easy',
    title: "Consumer and Producer Surplus",
    description: "Draw a standard supply and demand graph. Label the areas of consumer surplus, producer surplus, and total economic surplus at the equilibrium price.",
    correctImage: "/images/graphs/micro/surplus-equilibrium.svg",
    checklist: [
      { id: 1, text: "Demand is downward-sloping and Supply is upward-sloping" },
      { id: 2, text: "Consumer Surplus is the triangle below Demand and above Price" },
      { id: 3, text: "Producer Surplus is the triangle above Supply and below Price" },
      { id: 4, text: "Equilibrium Price (Pe) and Quantity (Qe) are labeled" }
    ]
  },
  {
    id: 3,
    subject: 'micro',
    lessonId: "2.8",
    topics: ["Tax Incidence", "Excise Tax", "Deadweight Loss"],
    difficulty: 'medium',
    title: "Effect of an Excise Tax",
    description: "Show a market where an excise tax is placed on producers. Label the new supply curve, price paid by consumers, price received by producers, and the area of deadweight loss.",
    correctImage: "/images/graphs/micro/excise-tax.svg",
    checklist: [
      { id: 1, text: "Supply shifts vertically upward by the amount of the tax" },
      { id: 2, text: "Price paid by consumers (Pc) is labeled at the new equilibrium" },
      { id: 3, text: "Price received by producers (Pp) is labeled on the original supply curve" },
      { id: 4, text: "Deadweight loss triangle is correctly shaded" }
    ]
  },
  {
    id: 4,
    subject: 'micro',
    lessonId: "3.7",
    topics: ["Perfect Competition", "Short Run Profit", "Side-by-Side Graph"],
    difficulty: 'medium',
    title: "Perfectly Competitive Firm earning Profit",
    description: "Draw a side-by-side graph of a perfectly competitive market and a single firm earning short-run economic profit.",
    correctImage: "/images/graphs/micro/perfect-comp-profit.svg",
    checklist: [
      { id: 1, text: "Market price is transferred to the firm as a horizontal MR=D=A=P line" },
      { id: 2, text: "Firm produces where MR = MC" },
      { id: 3, text: "ATC is below the Price at the profit-maximizing quantity" },
      { id: 4, text: "Profit area is correctly shaded or labeled" }
    ]
  },
  {
    id: 5,
    subject: 'micro',
    lessonId: "4.4",
    topics: ["Monopolistic Competition", "Long Run Equilibrium", "Excess Capacity"],
    difficulty: 'medium',
    title: "Monopolistic Competition in the Long Run",
    description: "Draw a monopolistically competitive firm in long-run equilibrium. Ensure the firm is earning zero economic profit.",
    correctImage: "/images/graphs/micro/monop-comp-long-run.svg",
    checklist: [
      { id: 1, text: "MR is below Demand and both are downward sloping" },
      { id: 2, text: "ATC is tangent to the Demand curve at the profit-maximizing quantity" },
      { id: 3, text: "The quantity is less than the productively efficient quantity (Excess Capacity)" },
      { id: 4, text: "Price is set on the Demand curve above the MR=MC intersection" }
    ]
  },
  {
    id: 6,
    subject: 'micro',
    lessonId: "5.3",
    topics: ["Labor Market", "Perfectly Competitive Factor Market", "MRP", "MRC"],
    difficulty: 'hard',
    title: "Competitive Labor Market and Firm",
    description: "Draw a side-by-side graph for a perfectly competitive labor market and an individual firm hiring labor.",
    correctImage: "/images/graphs/micro/labor-market.svg",
    checklist: [
      { id: 1, text: "Market graph shows upward Supply and downward Demand (MRP)" },
      { id: 2, text: "Firm graph shows a horizontal Supply curve (MRC = Wage)" },
      { id: 3, text: "Firm's Demand for labor (MRP) is downward sloping" },
      { id: 4, text: "Firm hires where MRC = MRP" }
    ]
  },
  {
    id: 7,
    subject: 'micro',
    lessonId: "5.4",
    topics: ["Monopsony", "Wage Maker", "Factor Market Failure"],
    difficulty: 'hard',
    title: "Monopsony in the Labor Market",
    description: "Draw the MFC (MRC), Supply, and MRP curves for a monopsonist. Label the quantity of labor hired and the wage rate paid.",
    correctImage: "/images/graphs/micro/monopsony.svg",
    checklist: [
      { id: 1, text: "MFC curve is above the Supply of labor curve" },
      { id: 2, text: "Quantity (Qm) is determined where MFC = MRP" },
      { id: 3, text: "Wage (Wm) is labeled on the Supply curve below the MFC=MRP intersection" },
      { id: 4, text: "Both axis are labeled correctly (Wage and Quantity of Labor)" }
    ]
  },
  {
    id: 8,
    subject: 'micro',
    lessonId: "6.2",
    topics: ["Negative Externality", "Marginal Social Cost", "Market Failure"],
    difficulty: 'medium',
    title: "Negative Production Externality",
    description: "Draw a market with a negative production externality (like pollution). Label the market quantity and the socially optimal quantity.",
    correctImage: "/images/graphs/micro/negative-externality.svg",
    checklist: [
      { id: 1, text: "MSC curve is above the MPC (Supply) curve" },
      { id: 2, text: "Market quantity (Qm) is where MPC = MSB" },
      { id: 3, text: "Socially optimal quantity (Qs) is where MSC = MSB" },
      { id: 4, text: "Deadweight loss triangle points toward the social optimum" }
    ]
  },
  {
    id: 9,
    subject: 'micro',
    lessonId: "6.2",
    topics: ["Positive Externality", "Marginal Social Benefit", "Underconsumption"],
    difficulty: 'medium',
    title: "Positive Consumption Externality",
    description: "Draw a market with a positive consumption externality. Label the market equilibrium and the deadweight loss.",
    correctImage: "/images/graphs/micro/positive-externality.svg",
    checklist: [
      { id: 1, text: "MSB curve is above the MPB (Demand) curve" },
      { id: 2, text: "Market quantity (Qm) is less than socially optimal quantity (Qs)" },
      { id: 3, text: "MSC (Supply) intersects MSB at the social optimum" },
      { id: 4, text: "Deadweight loss triangle points toward the social optimum" }
    ]
  },
  {
    id: 10,
    subject: 'micro',
    lessonId: "4.3",
    topics: ["Natural Monopoly", "Price Regulation", "Fair Return"],
    difficulty: 'hard',
    title: "Natural Monopoly Regulation",
    description: "Draw a natural monopoly with declining ATC. Label the socially optimal price and the fair-return price.",
    correctImage: "/images/graphs/micro/natural-monopoly.svg",
    checklist: [
      { id: 1, text: "ATC is downward sloping and above MC throughout the relevant range" },
      { id: 2, text: "Socially optimal price (P=MC) results in a loss" },
      { id: 3, text: "Fair-return price is labeled where P = ATC" },
      { id: 4, text: "Demand and MR are both downward sloping" }
    ]
  },
  {
    id: 11,
    subject: 'macro',
    lessonId: "3.1",
    topics: ["AD-AS Model", "Equilibrium", "Full Employment"],
    difficulty: 'easy',
    title: "Long Run Equilibrium (Full Employment)",
    description: "Draw the AD, SRAS, and LRAS curves showing an economy in long-run equilibrium.",
    correctImage: "/images/graphs/macro/full-employment.svg",
    checklist: [
      { id: 1, text: "LRAS is a vertical line at Yf" },
      { id: 2, text: "AD, SRAS, and LRAS all intersect at the same point" },
      { id: 3, text: "Price Level (PL) and Real GDP (Y) are on the axes" },
      { id: 4, text: "All curves are properly labeled" }
    ]
  },
  {
    id: 12,
    subject: 'macro',
    lessonId: "3.4",
    topics: ["Recessionary Gap", "Short Run Equilibrium", "AD-AS"],
    difficulty: 'medium',
    title: "Economy in a Recessionary Gap",
    description: "Draw an AD-AS graph showing an economy currently producing at an output level below full employment.",
    correctImage: "/images/graphs/macro/recessionary-gap.svg",
    checklist: [
      { id: 1, text: "Short-run equilibrium (AD=SRAS) is to the left of the LRAS" },
      { id: 2, text: "Full employment output (Yf) is labeled at LRAS" },
      { id: 3, text: "Actual output (Y1) is labeled at the intersection" },
      { id: 4, text: "Recessionary gap is clearly visible" }
    ]
  },
  {
    id: 13,
    subject: 'macro',
    lessonId: "3.4",
    topics: ["Inflationary Gap", "Short Run Equilibrium", "AD-AS"],
    difficulty: 'medium',
    title: "Economy in an Inflationary Gap",
    description: "Draw an AD-AS graph showing an economy currently producing at an output level above full employment.",
    correctImage: "/images/graphs/macro/inflationary-gap.svg",
    checklist: [
      { id: 1, text: "Short-run equilibrium (AD=SRAS) is to the right of the LRAS" },
      { id: 2, text: "Full employment output (Yf) is labeled at LRAS" },
      { id: 3, text: "Actual output (Y1) is labeled at the intersection" },
      { id: 4, text: "Inflationary gap is clearly visible" }
    ]
  },
  {
    id: 14,
    subject: 'macro',
    lessonId: "4.5",
    topics: ["Money Market", "Interest Rates", "Monetary Policy"],
    difficulty: 'medium',
    title: "The Money Market",
    description: "Draw the Money Supply and Money Demand curves. Show the effect of an expansionary monetary policy (Open Market Purchase).",
    correctImage: "/images/graphs/macro/money-market.svg",
    checklist: [
      { id: 1, text: "Money Supply (Sm) is a vertical line" },
      { id: 2, text: "Money Demand (Dm) is downward sloping" },
      { id: 3, text: "Money Supply shifts to the right" },
      { id: 4, text: "Nominal Interest Rate (ir) decreases on the y-axis" }
    ]
  },
  {
    id: 15,
    subject: 'macro',
    lessonId: "4.6",
    topics: ["Loanable Funds", "Real Interest Rates", "Crowding Out"],
    difficulty: 'hard',
    title: "The Loanable Funds Market",
    description: "Draw the Supply and Demand for Loanable Funds. Show the effect of increased government deficit spending.",
    correctImage: "/images/graphs/macro/loanable-funds.svg",
    checklist: [
      { id: 1, text: "Demand for loanable funds shifts to the right" },
      { id: 2, text: "Real Interest Rate (r) increases on the y-axis" },
      { id: 3, text: "Quantity of loanable funds increases on the x-axis" },
      { id: 4, text: "Axes are labeled 'Real Interest Rate' and 'Quantity of Loanable Funds'" }
    ]
  },
  {
    id: 16,
    subject: 'macro',
    lessonId: "5.2",
    topics: ["Phillips Curve", "Inflation", "Unemployment"],
    difficulty: 'hard',
    title: "Short Run and Long Run Phillips Curves",
    description: "Draw the SRPC and LRPC. Label the point showing an economy in long-run equilibrium with 5% natural unemployment.",
    correctImage: "/images/graphs/macro/phillips-curve.svg",
    checklist: [
      { id: 1, text: "LRPC is vertical at the Natural Rate of Unemployment (NRU)" },
      { id: 2, text: "SRPC is downward-sloping" },
      { id: 3, text: "Inflation rate is on the y-axis and Unemployment rate is on the x-axis" },
      { id: 4, text: "The point of equilibrium is at the intersection of SRPC and LRPC" }
    ]
  },
  {
    id: 17,
    subject: 'macro',
    lessonId: "5.2",
    topics: ["Phillips Curve", "Stagflation", "Supply Shock"],
    difficulty: 'hard',
    title: "SRPC Shift (Stagflation)",
    description: "Show the effect of a negative supply shock (e.g., oil prices) on the Short-Run Phillips Curve.",
    correctImage: "/images/graphs/macro/phillips-curve-shift.svg",
    checklist: [
      { id: 1, text: "SRPC shifts to the right" },
      { id: 2, text: "Shift indicates higher inflation and higher unemployment simultaneously" },
      { id: 3, text: "LRPC remains in the same position" },
      { id: 4, text: "Labels clearly show the move from point A to point B" }
    ]
  },
  {
    id: 18,
    subject: 'macro',
    lessonId: "6.3",
    topics: ["Foreign Exchange", "Currency Appreciation", "Forex Market"],
    difficulty: 'hard',
    title: "Foreign Exchange Market (USD)",
    description: "Draw the Supply and Demand for US Dollars. Show the effect of increased European demand for US goods.",
    correctImage: "/images/graphs/macro/forex-usd.svg",
    checklist: [
      { id: 1, text: "Demand for USD shifts to the right" },
      { id: 2, text: "Exchange Rate (e.g., Euro/USD) increases on the y-axis" },
      { id: 3, text: "Quantity of USD is on the x-axis" },
      { id: 4, text: "Labels show that the Dollar has appreciated" }
    ]
  },
  {
    id: 19,
    subject: 'macro',
    lessonId: "2.1",
    topics: ["Production Possibilities Curve", "Economic Growth", "Opportunity Cost"],
    difficulty: 'easy',
    title: "Economic Growth on the PPC",
    description: "Draw a PPC for two goods. Show how an increase in the quality of resources shifts the curve to represent economic growth.",
    correctImage: "/images/graphs/macro/ppc-growth.svg",
    checklist: [
      { id: 1, text: "Curve shifts outward (to the right)" },
      { id: 2, text: "Bowed-out shape represents increasing opportunity costs" },
      { id: 3, text: "Both intercepts on the axes increase" },
      { id: 4, text: "Axes are labeled with two specific goods" }
    ]
  },
  {
    id: 20,
    subject: 'macro',
    lessonId: "4.5",
    topics: ["Money Market", "Contractionary Policy", "Interest Rates"],
    difficulty: 'medium',
    title: "Contractionary Monetary Policy",
    description: "Show how an Open Market Sale of bonds affects the Money Market graph.",
    correctImage: "/images/graphs/macro/money-market-contraction.svg",
    checklist: [
      { id: 1, text: "Money Supply (Sm) shifts to the left" },
      { id: 2, text: "Nominal interest rate (ir) increases" },
      { id: 3, text: "Quantity of money (Qm) decreases" },
      { id: 4, text: "Intersection point moves upward along the Demand curve" }
    ]
  }
];

