// Graph Gym Scenarios Data
// Each scenario contains a question prompt, checklist items, and a sample answer image
// Scenarios are linked to lessons in the syllabus via lessonId and can track relevant topics

const MICRO_IMAGE_BASE = "https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com/flippables/micro/";
const MACRO_IMAGE_BASE = "https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com/flippables/";

export interface ChecklistItem {
  id: number;
  text: string;
}

export interface GraphGymScenario {
  id: number; // Unique numeric ID starting from 1
  subject: 'macro' | 'micro' | ('macro' | 'micro')[]; // Subject(s) this scenario belongs to - can be single or array
  lessonId: string; // Lesson ID from syllabus (e.g., "4.2" for Unit 4, Lesson 2)
  topics: string[]; // Array of relevant topics covered in this scenario
  difficulty: 'easy' | 'medium' | 'hard'; // Difficulty level of the scenario
  title: string;
  description: string;
  instruction?: string; // Optional instruction text displayed in the title section
  tip?: string; // Optional tip text that can be revealed
  toDoList?: string[]; // Optional array of to-do items to display as bullet points
  correctImage: string;
  videoExplanation?: string; // Optional video explanation URL
  checklist: ChecklistItem[];
  slug: string; // URL keywords (1-2 words) for the scenario, e.g., "monopoly" or "money-market"
}

export const graphGymScenarios: GraphGymScenario[] = [
  {
    id: 1,
    subject: 'micro',
    lessonId: "4.2", // Monopoly lesson in Microeconomics Unit 4
    topics: ["Monopoly", "Long Run Equilibrium", "Profit Maximization", "Market Structure"],
    difficulty: 'medium',
    title: "Long Run Equilibrium in a Pure Monopoly",
    slug: "monopoly",
    description: "Draw the Demand, MR, MC, and ATC curves for a pure monopoly in long-run equilibrium.",
    instruction: "Use the graphing tool below to identify the profit-maximizing quantity.",
    tip: "Remember: In a monopoly, the profit-maximizing quantity is where MR = MC, but the price is set on the demand curve above that quantity. The allocatively efficient quantity is where MC = Demand.",
    toDoList: [
      "Label the profit-maximizing price and quantity",
      "Show the allocatively efficient quantity",
      "Shade in the area that represents economic profit or losses"
    ],
    correctImage: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/graphGym/wb1.jpg",
    checklist: [
      { id: 1, text: "Profit-maximizing quantity is where MR intersects MC" },
      { id: 2, text: "Price is set on the Demand curve directly above the MR=MC intersection" },
      { id: 3, text: "Allocatively efficient quantity is labeled where MC intersects Demand" },
      { id: 4, text: "ATC < P at the profit-maximizing quantity and area of profit is correctly shaded" }
    ]
  },
  {
    id: 2,
    subject: 'micro',
    lessonId: "2.6",
    topics: ["Market Equilibrium", "Surplus", "Allocative Efficiency"],
    difficulty: 'easy',
    title: "Consumer and Producer Surplus",
    slug: "surplus",
    description: "Draw a standard supply and demand graph showing market equilibrium.",
    toDoList: [
      "Label the areas of consumer surplus",
      "Label the areas of producer surplus",
      "Mark the equilibrium price (Pe) and quantity (Qe)"
    ],
    correctImage: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/graphGym/wb2.jpg",
    checklist: [
      { id: 1, text: "Equilibrium Price (Pe) and Quantity (Qe) are correctly labeled at the intersection" },
      { id: 2, text: "Consumer Surplus is the area below Demand and above the equilibrium Price" },
      { id: 3, text: "Producer Surplus is the area above Supply and below the equilibrium Price" },
      { id: 4, text: "Demand is downward-sloping and Supply is upward-sloping" }
    ]
  },
  {
    id: 3,
    subject: 'micro',
    lessonId: "2.8",
    topics: ["Tax Incidence", "Excise Tax", "Deadweight Loss"],
    difficulty: 'medium',
    title: "Effect of an Excise Tax",
    slug: "excise-tax",
    description: "Show a market where an excise tax is placed on producers.",
    toDoList: [
      "Label the new supply curve",
      "Label the price paid by consumers (Pc)",
      "Label the price received by producers (Pp)",
      "Shade the area of deadweight loss"
    ],
    correctImage: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/graphGym/wb3.jpg",
    checklist: [
      { id: 1, text: "New Supply curve is shifted vertically upward by the tax amount" },
      { id: 2, text: "Price paid by consumers (Pc) is labeled at the new equilibrium intersection" },
      { id: 3, text: "Price received by producers (Pp) is labeled on the original supply curve directly below the new equilibrium" },
      { id: 4, text: "Deadweight loss triangle is correctly shaded between the new and old quantities" }
    ]
  },
  {
    id: 4,
    subject: 'micro',
    lessonId: "3.7",
    topics: ["Perfect Competition", "Short Run Profit", "Side-by-Side Graph"],
    difficulty: 'medium',
    title: "Perfectly Competitive Firm earning Profit",
    slug: "perfect-competition",
    description: "Draw a side-by-side graph of a perfectly competitive market and a single firm earning short-run economic profit.",
    toDoList: [
      "Show the market graph on the left",
      "Show the firm graph on the right",
      "Label the profit-maximizing quantity",
      "Shade or label the area of economic profit, if any"
    ],
    correctImage: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/graphGym/wb4.jpg",
    checklist: [
      { id: 1, text: "Market graph sets the price where Market Supply equals Market Demand" },
      { id: 2, text: "Firm's Demand curve is horizontal (perfectly elastic) at the market price (MR=D=AR=P)" },
      { id: 3, text: "Profit-maximizing quantity is labeled where the firm's MC equals MR" },
      { id: 4, text: "Economic profit area is shaded (Price is above ATC at the profit-maximizing quantity)" }
    ]
  },
  {
    id: 5,
    subject: 'micro',
    lessonId: "4.4",
    topics: ["Monopolistic Competition", "Long Run Equilibrium", "Excess Capacity"],
    difficulty: 'medium',
    title: "Monopolistic Competition in the Long Run",
    slug: "monopolistic-competition",
    description: "Draw a monopolistically competitive firm in long-run equilibrium.",
    toDoList: [
      "Show that the firm is earning zero economic profit",
      "Label the profit-maximizing quantity and price",
      "Label the allocatively efficient quantity"
    ],
    correctImage: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/graphGym/wb5.jpg",
    checklist: [
      { id: 1, text: "Profit-maximizing quantity is where MR intersects MC" },
      { id: 2, text: "Price is set on the Demand curve above the intersection, tangent to the ATC curve (Zero Profit)" },
      { id: 3, text: "Allocatively efficient quantity is labeled where MC intersects Demand" },
      { id: 4, text: "Demand and MR curves are both downward sloping, with MR below Demand" }
    ]
  },
  {
    id: 6,
    subject: 'micro',
    lessonId: "5.3",
    topics: ["Labor Market", "Perfectly Competitive Factor Market", "MRP", "MRC"],
    difficulty: 'hard',
    title: "Competitive Labor Market and Firm",
    slug: "labor-market",
    description: "Draw a side-by-side graph for a perfectly competitive labor market and an individual firm hiring labor.",
    toDoList: [
      "Show the market graph on the left",
      "Show the firm graph on the right",
      "Label the equilibrium wage in the market",
      "Label the quantity of labor hired by the firm"
    ],
    correctImage: "/images/graphs/micro/labor-market.svg",
    checklist: [
      { id: 1, text: "Market graph shows the intersection of Labor Supply and Labor Demand establishing the equilibrium wage" },
      { id: 2, text: "Firm's Supply of Labor (MRC) is horizontal at the market wage" },
      { id: 3, text: "Firm's Demand for Labor (MRP) is downward sloping" },
      { id: 4, text: "Quantity of labor hired by the firm is where MRP equals MRC" }
    ]
  },
  {
    id: 7,
    subject: 'micro',
    lessonId: "5.4",
    topics: ["Monopsony", "Wage Maker", "Factor Market Failure"],
    difficulty: 'hard',
    title: "Monopsony in the Labor Market",
    slug: "monopsony",
    description: "Draw the MFC (MRC), Supply, and MRP curves for a monopsonist.",
    toDoList: [
      "Label the quantity of labor hired (Qm)",
      "Label the wage rate paid (Wm)",
      "Show the quantity of workers that would be hired in a perfectly competitive market"
    ],
    correctImage: "/images/graphs/micro/monopsony.svg",
    checklist: [
      { id: 1, text: "MFC (MRC) curve is above the Supply of labor curve" },
      { id: 2, text: "Quantity hired (Qm) is labeled where MFC equals MRP" },
      { id: 3, text: "Wage (Wm) is labeled on the Supply curve directly below the MFC=MRP intersection" },
      { id: 4, text: "Competitive quantity is indicated where Supply intersects MRP" }
    ]
  },
  {
    id: 8,
    subject: 'micro',
    lessonId: "6.2",
    topics: ["Negative Externality", "Marginal Social Cost", "Market Failure"],
    difficulty: 'medium',
    title: "Negative Production Externality",
    slug: "negative-externality",
    description: "Draw a market with a negative production externality (like pollution).",
    toDoList: [
      "Label the market quantity (Qm)",
      "Label the socially optimal quantity (Qs)",
      "Show the MSC curve above the MPC curve",
      "Shade the deadweight loss area"
    ],
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
    slug: "positive-externality",
    description: "Draw a market with a positive consumption externality.",
    toDoList: [
      "Label the market equilibrium quantity",
      "Label the socially optimal quantity",
      "Show the MSB curve above the MPB curve",
      "Shade the deadweight loss area"
    ],
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
    slug: "natural-monopoly",
    description: "Draw a natural monopoly with declining ATC.",
    toDoList: [
      "Label the socially optimal price (P=MC)",
      "Label the fair-return price (P=ATC)",
      "Show that P=MC results in a loss",
      "Label the quantities at each price level"
    ],
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
    slug: "ad-as",
    description: "Draw the AD, SRAS, and LRAS curves showing an economy in long-run equilibrium.",
    toDoList: [
      "Show all three curves intersecting at the same point",
      "Label the full employment output (Yf)",
      "Label the equilibrium price level",
      "Ensure LRAS is vertical at Yf"
    ],
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
    slug: "recessionary-gap",
    description: "Draw an AD-AS graph showing an economy currently producing at an output level below full employment.",
    toDoList: [
      "Label the full employment output (Yf)",
      "Label the actual output (Y1)",
      "Show the short-run equilibrium",
      "Indicate the recessionary gap"
    ],
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
    slug: "inflationary-gap",
    description: "Draw an AD-AS graph showing an economy currently producing at an output level above full employment.",
    toDoList: [
      "Label the full employment output (Yf)",
      "Label the actual output (Y1)",
      "Show the short-run equilibrium",
      "Indicate the inflationary gap"
    ],
    correctImage: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/graphGym/wb13.jpg",
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
    slug: "money-market",
    description: "Draw the Money Supply and Money Demand curves. Show the effect of an expansionary monetary policy (Open Market Purchase).",
    toDoList: [
      "Show the initial equilibrium",
      "Show the Money Supply shift",
      "Label the new equilibrium interest rate",
      "Label the new quantity of money"
    ],
    correctImage: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/graphGym/wb14.jpg",
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
    slug: "loanable-funds",
    description: "Draw the Supply and Demand for Loanable Funds. Show the effect of increased government deficit spending.",
    toDoList: [
      "Show the initial equilibrium",
      "Show the Demand shift",
      "Label the new equilibrium real interest rate",
      "Label the new quantity of loanable funds"
    ],
    correctImage: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/graphGym/wb15.jpg",
    checklist: [
      { id: 1, text: "Demand for loanable funds shifts to the right" },
      { id: 2, text: "Real Interest Rate (rir) increases on the y-axis" },
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
    slug: "phillips-curve",
    description: "Draw the SRPC and LRPC.",
    toDoList: [
      "Label the point showing an economy in long-run equilibrium",
      "Show the natural rate of unemployment (5%)",
      "Show where SRPC and LRPC intersect",
      "Label the inflation and unemployment rates at equilibrium"
    ],
    correctImage: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/graphGym/wb16.jpg",
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
    slug: "stagflation",
    description: "Show the effect of a negative supply shock (e.g., oil prices) on the Short-Run Phillips Curve.",
    toDoList: [
      "Show the initial SRPC",
      "Show the SRPC shift",
      "Label point A (before) and point B (after)",
      "Indicate that both inflation and unemployment increase"
    ],
    correctImage: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/graphGym/wb17.jpg",
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
    slug: "forex-market",
    description: "Draw the Supply and Demand for US Dollars. Show the effect of increased European demand for US goods.",
    toDoList: [
      "Show the initial equilibrium",
      "Show the Demand shift",
      "Label the new equilibrium exchange rate",
      "Label the new quantity of USD exchanged"
    ],
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
    slug: "economic-growth",
    description: "Draw a PPC for two goods. Show how an improvement in technology shifts the curve to represent economic growth.",
    toDoList: [
      "Show the original PPC",
      "Show the new PPC after growth",
      "Label both axes with specific goods",
      "Indicate that both maximum outputs increase"
    ],
    correctImage: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/graphGym/wb19.jpg",
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
    slug: "contractionary-monetary-policy",
    description: "Show how an Open Market Sale of bonds affects the Money Market graph.",
    toDoList: [
      "Show the initial equilibrium",
      "Show the Money Supply shift",
      "Label the new equilibrium interest rate",
      "Label the new quantity of money"
    ],
    correctImage: "/images/graphs/macro/money-market-contraction.svg",
    checklist: [
      { id: 1, text: "Money Supply (Sm) shifts to the left" },
      { id: 2, text: "Nominal interest rate (ir) increases" },
      { id: 3, text: "Quantity of money (Qm) decreases" },
      { id: 4, text: "Intersection point moves upward along the Demand curve" }
    ]
  },

  // --- MICROECONOMICS (21-30) ---
  {
    id: 21,
    subject: 'micro',
    lessonId: "2.5",
    topics: ["International Trade", "Tariffs", "Deadweight Loss"],
    difficulty: 'hard',
    title: "Effect of a Tariff on Trade",
    slug: "tariff",
    description: "Draw a domestic supply and demand graph for an imported good. Show the World Price (Pw) and a Tariff Price (Pt). Label domestic production, imports, and the area of deadweight loss.",
    correctImage: "/images/graphs/micro/tariff-trade.svg",
    checklist: [
      { id: 1, text: "World Price line is below domestic equilibrium" },
      { id: 2, text: "Tariff Price line is above World Price but below equilibrium" },
      { id: 3, text: "Imports decrease (distance between Qd and Qs shrinks)" },
      { id: 4, text: "Deadweight loss triangles (efficiency loss) are shaded" }
    ]
  },
  {
    id: 22,
    subject: 'micro',
    lessonId: "2.8",
    topics: ["Subsidies", "Market Efficiency", "Consumer/Producer Benefit"],
    difficulty: 'medium',
    title: "Per-Unit Subsidy Impact",
    slug: "subsidy",
    description: "Draw a market in equilibrium. Show the shift caused by a per-unit subsidy given to producers. Label the price consumers pay, the price producers receive, and the cost to the government.",
    correctImage: "/images/graphs/micro/subsidy.svg",
    checklist: [
      { id: 1, text: "Supply shifts vertically downward (right) by subsidy amount" },
      { id: 2, text: "Price consumers pay (Pc) is lower than original equilibrium" },
      { id: 3, text: "Price producers keep (Pp) is Pc + Subsidy" },
      { id: 4, text: "Government cost area is the rectangle (Subsidy * Q_new)" }
    ]
  },
  {
    id: 23,
    subject: 'micro',
    lessonId: "6.2",
    topics: ["Externalities", "Market Failure", "Deadweight Loss"],
    difficulty: 'hard',
    title: "Positive Production Externality",
    slug: "positive-production-externality",
    description: "Draw a market where production creates a spillover benefit (e.g., honeybees). Draw the MPC, MSC, MPB, and MSB curves. Identify the market Q and socially optimal Q.",
    correctImage: "/images/graphs/micro/positive-prod-externality.svg",
    checklist: [
      { id: 1, text: "MSC curve is below the MPC (Supply) curve" },
      { id: 2, text: "Market Q is where MPC = MPB" },
      { id: 3, text: "Socially Optimal Q is where MSC = MSB" },
      { id: 4, text: "Market underproduces (Market Q < Social Q)" }
    ]
  },
  {
    id: 24,
    subject: 'micro',
    lessonId: "2.8",
    topics: ["Price Controls", "Shortage", "Market Intervention"],
    difficulty: 'easy',
    title: "Binding Price Ceiling",
    slug: "price-ceiling",
    description: "Draw a market for rental apartments with a binding price ceiling. Label the quantity demanded, quantity supplied, and the resulting shortage.",
    correctImage: "/images/graphs/micro/price-ceiling.svg",
    checklist: [
      { id: 1, text: "Ceiling price line is drawn below the equilibrium price" },
      { id: 2, text: "Quantity Demanded (Qd) > Quantity Supplied (Qs)" },
      { id: 3, text: "The horizontal distance between Qs and Qd is labeled 'Shortage'" },
      { id: 4, text: "Deadweight loss area is identified" }
    ]
  },
  {
    id: 25,
    subject: 'micro',
    lessonId: "4.3",
    topics: ["Price Discrimination", "Monopoly", "Efficiency"],
    difficulty: 'hard',
    title: "Perfect Price Discrimination",
    slug: "price-discrimination",
    description: "Draw a monopoly practicing perfect (first-degree) price discrimination. Label the profit-maximizing quantity and the area of economic profit.",
    correctImage: "/images/graphs/micro/perfect-price-discrim.svg",
    checklist: [
      { id: 1, text: "Marginal Revenue (MR) curve merges with the Demand curve" },
      { id: 2, text: "Firm produces where P = MC (Allocatively Efficient quantity)" },
      { id: 3, text: "Consumer Surplus is zero (entire area is Profit/Surplus transfer)" },
      { id: 4, text: "Economic Profit is the entire area between Demand and ATC" }
    ]
  },
  {
    id: 26,
    subject: 'micro',
    lessonId: "3.7",
    topics: ["Perfect Competition", "Long Run Equilibrium", "Efficiency"],
    difficulty: 'medium',
    title: "Long-Run Equilibrium in Perfect Competition",
    slug: "perfect-competition-long-run",
    description: "Draw side-by-side graphs for the Market and a Representative Firm in long-run equilibrium.",
    correctImage: "/images/graphs/micro/pc-long-run.svg",
    checklist: [
      { id: 1, text: "Market sets price (P) where S = D" },
      { id: 2, text: "Firm takes price (P = MR = D = AR)" },
      { id: 3, text: "Firm produces where MC = MR" },
      { id: 4, text: "ATC curve sits tangent to the demand line at the quantity (Zero Profit)" }
    ]
  },
  {
    id: 27,
    subject: 'micro',
    lessonId: "4.4",
    topics: ["Monopolistic Competition", "Short Run Loss"],
    difficulty: 'medium',
    title: "Monopolistic Competition (Loss)",
    slug: "monopolistic-competition-loss",
    description: "Draw a monopolistically competitive firm suffering a short-run loss. Label the loss area.",
    correctImage: "/images/graphs/micro/monop-comp-loss.svg",
    checklist: [
      { id: 1, text: "Demand and MR are downward sloping (MR below Demand)" },
      { id: 2, text: "Produce where MR = MC" },
      { id: 3, text: "ATC curve is above the price at the profit-maximizing quantity" },
      { id: 4, text: "Rectangular area of loss is correctly shaded" }
    ]
  },
  {
    id: 28,
    subject: 'micro',
    lessonId: "3.1",
    topics: ["Production Function", "Marginal Product", "Diminishing Returns"],
    difficulty: 'medium',
    title: "Total and Marginal Product",
    slug: "product-curves",
    description: "Draw two stacked graphs: one for Total Product (TP) and one for Marginal Product (MP). Align the stages of production.",
    correctImage: "/images/graphs/micro/product-curves.svg",
    checklist: [
      { id: 1, text: "TP increases at an increasing rate, then decreasing rate, then falls" },
      { id: 2, text: "MP peaks at the inflection point of TP" },
      { id: 3, text: "MP crosses the x-axis (is zero) when TP is at its maximum" },
      { id: 4, text: "Diminishing Marginal Returns starts when MP begins to fall" }
    ]
  },
  {
    id: 29,
    subject: 'micro',
    lessonId: "6.2",
    topics: ["Externalities", "Negative Consumption", "Taxation"],
    difficulty: 'medium',
    title: "Negative Consumption Externality",
    slug: "negative-consumption-externality",
    description: "Draw a market for cigarettes (negative consumption externality). Show the MPB, MSB, and MPC curves. Identify the deadweight loss.",
    correctImage: "/images/graphs/micro/neg-cons-externality.svg",
    checklist: [
      { id: 1, text: "MSB curve is below the MPB (Demand) curve" },
      { id: 2, text: "Market Q is where MPB = MPC" },
      { id: 3, text: "Socially Optimal Q is lower, where MSB = MPC" },
      { id: 4, text: "Deadweight loss points toward the social optimum (left)" }
    ]
  },
  {
    id: 30,
    subject: 'micro',
    lessonId: "5.2",
    topics: ["Factor Markets", "Labor Supply", "Wages"],
    difficulty: 'easy',
    title: "Shift in Market Labor Supply",
    slug: "labor-supply-shift",
    description: "Draw a competitive labor market. Show the effect of increased immigration on the equilibrium wage and employment level.",
    correctImage: "/images/graphs/micro/labor-supply-shift.svg",
    checklist: [
      { id: 1, text: "Supply of Labor shifts to the right" },
      { id: 2, text: "Equilibrium Wage Rate decreases" },
      { id: 3, text: "Quantity of Labor employed increases" },
      { id: 4, text: "Axes labeled Wage and Quantity of Labor" }
    ]
  },

  // --- MACROECONOMICS (31-40) ---
  {
    id: 31,
    subject: 'macro',
    lessonId: "4.6",
    topics: ["Monetary Policy", "Ample Reserves", "Interest Rates"],
    difficulty: 'hard',
    title: "Market for Reserves (Ample)",
    slug: "reserves-market",
    description: "Draw the market for reserves in an ample reserves regime. Show the effect of the Fed administering a rate hike.",
    correctImage: "/images/graphs/macro/ample-reserves-hike.svg",
    checklist: [
      { id: 1, text: "Reserve Demand is downward sloping then becomes horizontal" },
      { id: 2, text: "Reserve Supply is a vertical line intersecting the horizontal portion of Demand" },
      { id: 3, text: "Interest on Reserves (IOR) moves up" },
      { id: 4, text: "Policy Rate (FFR) follows the IOR upward" }
    ]
  },
  {
    id: 32,
    subject: 'macro',
    lessonId: "4.7",
    topics: ["Loanable Funds", "Deficit Spending", "Crowding Out"],
    difficulty: 'medium',
    title: "Loanable Funds: Crowding Out",
    slug: "crowding-out",
    description: "Draw the Loanable Funds market. Show the impact of increased government deficit spending.",
    correctImage: "/images/graphs/macro/loanable-funds-deficit.svg",
    checklist: [
      { id: 1, text: "Demand for Loanable Funds shifts to the right" },
      { id: 2, text: "Real Interest Rate increases" },
      { id: 3, text: "Quantity of loans increases" },
      { id: 4, text: "Higher interest rate represents the Crowding Out effect" }
    ]
  },
  {
    id: 33,
    subject: 'macro',
    lessonId: "6.4",
    topics: ["Capital Flow", "Loanable Funds", "Interest Rates"],
    difficulty: 'hard',
    title: "Financial Capital Inflow",
    slug: "capital-inflow",
    description: "Draw the Loanable Funds market for Country A. Show the effect of investors from Country B moving their savings into Country A.",
    correctImage: "/images/graphs/macro/lf-capital-inflow.svg",
    checklist: [
      { id: 1, text: "Supply of Loanable Funds shifts to the right" },
      { id: 2, text: "Real Interest Rate decreases" },
      { id: 3, text: "Total quantity of investment/loans increases" },
      { id: 4, text: "Axes labeled Real Interest Rate and Quantity of Loanable Funds" }
    ]
  },
  {
    id: 34,
    subject: 'macro',
    lessonId: "3.6",
    topics: ["AD-AS", "Self-Correction", "Long Run"],
    difficulty: 'hard',
    title: "Self-Correction of an Inflationary Gap",
    slug: "self-correction-inflationary-gap",
    description: "Draw an economy in an inflationary gap. Show the long-run self-adjustment mechanism without government intervention.",
    correctImage: "/images/graphs/macro/self-correct-inflation.svg",
    checklist: [
      { id: 1, text: "Initial equilibrium (AD/SRAS) is to the right of LRAS" },
      { id: 2, text: "SRAS shifts to the left (nominal wages rise)" },
      { id: 3, text: "New equilibrium is at the intersection of AD and LRAS" },
      { id: 4, text: "Price Level increases, Real GDP returns to Full Employment" }
    ]
  },
  {
    id: 35,
    subject: 'macro',
    lessonId: "1.3",
    topics: ["PPC", "Opportunity Cost", "Efficiency"],
    difficulty: 'easy',
    title: "Constant vs. Increasing Opportunity Cost",
    slug: "opportunity-cost",
    description: "Draw two small PPC graphs. Graph A should show Constant Opportunity Cost. Graph B should show Increasing Opportunity Cost.",
    correctImage: "/images/graphs/macro/ppc-shapes.svg",
    checklist: [
      { id: 1, text: "Graph A is a straight downward-sloping line" },
      { id: 2, text: "Graph B is a bowed-out (concave) curve" },
      { id: 3, text: "Axes are labeled with two different goods" },
      { id: 4, text: "Points inside the curve represent inefficiency" }
    ]
  },
  {
    id: 36,
    subject: 'macro',
    lessonId: "3.2",
    topics: ["Investment", "Interest Rates", "Aggregate Demand"],
    difficulty: 'easy',
    title: "Investment Demand Curve",
    slug: "investment-demand",
    description: "Draw the Investment Demand curve. Identify what happens to the quantity of investment if the interest rate drops.",
    correctImage: "/images/graphs/macro/investment-demand.svg",
    checklist: [
      { id: 1, text: "Downward sloping curve" },
      { id: 2, text: "Y-axis labeled 'Real Interest Rate', X-axis 'Quantity of Investment'" },
      { id: 3, text: "Lower interest rate corresponds to higher Investment (movement along curve)" },
      { id: 4, text: "Inverse relationship is clearly shown" }
    ]
  },
  {
    id: 37,
    subject: 'macro',
    lessonId: "3.4",
    topics: ["AD-AS", "Inflation", "Cost-Push"],
    difficulty: 'medium',
    title: "Cost-Push Inflation (Stagflation)",
    slug: "cost-push-inflation",
    description: "Draw an AD-AS graph showing the impact of a negative supply shock (e.g., oil prices rise).",
    correctImage: "/images/graphs/macro/stagflation.svg",
    checklist: [
      { id: 1, text: "SRAS curve shifts to the left" },
      { id: 2, text: "Price Level increases" },
      { id: 3, text: "Real GDP decreases" },
      { id: 4, text: "Equilibrium is now to the left of LRAS (Recessionary Gap)" }
    ]
  },
  {
    id: 38,
    subject: 'macro',
    lessonId: "6.6",
    topics: ["Foreign Exchange", "Interest Rates", "Appreciation"],
    difficulty: 'hard',
    title: "Forex: Interest Rate Differential",
    slug: "forex-interest-rate",
    description: "Draw the market for the U.S. Dollar. Show the impact if U.S. interest rates become higher than those in Europe.",
    correctImage: "/images/graphs/macro/forex-interest-rates.svg",
    checklist: [
      { id: 1, text: "Demand for Dollars shifts to the right (inflow of capital)" },
      { id: 2, text: "Supply of Dollars shifts to the left (less outflow)" },
      { id: 3, text: "Equilibrium Exchange Rate rises (Appreciation)" },
      { id: 4, text: "Y-axis labeled 'Euros per Dollar'" }
    ]
  },
  {
    id: 40,
    subject: 'macro',
    lessonId: "5.3",
    topics: ["Phillips Curve", "Inflation Expectations", "Short Run"],
    difficulty: 'medium',
    title: "Shift in the Phillips Curve",
    slug: "phillips-curve-shift",
    description: "Draw the Short-Run Phillips Curve (SRPC). Show what happens if inflation expectations increase.",
    correctImage: "/images/graphs/macro/srpc-shift.svg",
    checklist: [
      { id: 1, text: "Initial SRPC is downward sloping" },
      { id: 2, text: "SRPC shifts to the right (upward)" },
      { id: 3, text: "Higher inflation rate at the same unemployment rate" },
      { id: 4, text: "Axes labeled Inflation Rate and Unemployment Rate" }
    ]
  }, 
  {
    id: 41,
    subject: 'micro',
    lessonId: "2.8",
    topics: ["Taxes", "Tax Incidence", "Demand Shift"],
    difficulty: 'medium',
    title: "Excise Tax on Consumers",
    slug: "excise-tax-2",
    description: "Draw a competitive market in equilibrium. Show the impact of a per-unit excise tax levied on producers.",
    toDoList: [
      "Label the new quantity exchanged (Qt)",
      "Label the total price paid by consumers (Pc)",
      "Label the net price received by producers (Pp)",
      "Shade the specific area representing the consumer's tax burden and the area representing the producer's tax burden"
    ],
    correctImage: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/graphGym/wb41.jpg",
    videoExplanation: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/graphGym/explanation41.mp4",
    checklist: [
      { id: 1, text: "Demand curve shifts vertically downward by the amount of the tax" },
      { id: 2, text: "New intersection determines Producer Price (Pp) and Quantity (Qt)" },
      { id: 3, text: "Consumer Price (Pc) is labeled on the original Demand curve directly above Qt" },
      { id: 4, text: "Rectangles for Consumer Burden (Pc to Pe) and Producer Burden (Pe to Pp) are shaded" }
    ]
  },
  {
    id: 42,
    subject: 'micro',
    lessonId: "2.8",
    topics: ["Price Controls", "Surplus", "Deadweight Loss"],
    difficulty: 'medium',
    title: "Welfare Analysis of a Price Floor",
    slug: "price-floor-welfare",
    description: "Draw a market with a binding price floor. Visually identify the Consumer Surplus (CS), Producer Surplus (PS), and Deadweight Loss (DWL) resulting from this intervention.",
    correctImage: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/graphGym/wb42.jpg",
    videoExplanation: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/graphGym/explanation42.mp4",
    checklist: [
      { id: 1, text: "Price Floor is drawn above the equilibrium price" },
      { id: 2, text: "Consumer Surplus is the small triangle above the floor price" },
      { id: 3, text: "Producer Surplus is the trapezoid below the floor price and above Supply" },
      { id: 4, text: "Deadweight Loss is the triangle pointing to the equilibrium" }
    ]
  },
  {
    id: 43,
    subject: 'micro',
    lessonId: "2.5",
    topics: ["International Trade", "Tariffs", "Welfare"],
    difficulty: 'hard',
    title: "Welfare Effects of a Tariff",
    slug: "tariff-welfare",
    description: "Draw a domestic market importing goods at the World Price (Pw). Show a Tariff (Pt) imposed above the world price. Label the new domestic quantity supplied (Qs) and domestic quantity demanded (Qd) at the tariff price. Shade the rectangular area representing the government's tariff revenue and the two separate areas representing deadweight loss.",
    correctImage: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/graphGym/wb43.jpg",
    videoExplanation: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/graphGym/explanation43.mp4",
    checklist: [
      { id: 1, text: "Tariff Price (Pt) line is drawn above World Price (Pw) but below equilibrium" },
      { id: 2, text: "New Domestic Quantity Supplied (Qs) and Quantity Demanded (Qd) are labeled on the x-axis" },
      { id: 3, text: "Tariff Revenue rectangle (width is Qd - Qs, height is Pt - Pw) is shaded" },
      { id: 4, text: "Two separate triangles (representing production and consumption inefficiency) are shaded as Deadweight Loss" }
    ]
  },
  {
    id: 44,
    subject: 'micro',
    lessonId: "6.2",
    topics: ["Externalities", "Negative Production", "Corrective Tax"],
    difficulty: 'medium',
    title: "Correcting a Negative Production Externality",
    slug: "negative-externality-2",
    description: "Draw a market where production causes pollution. Show the specific Per-Unit Tax required to fix this market failure and achieve the socially optimal quantity.",
    correctImage: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/graphGym/wb44.jpg",
    videoExplanation: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/graphGym/explanation44.mp4",
    checklist: [
      { id: 1, text: "Marginal Social Cost (MSC) is above Marginal Private Cost (MPC)" },
      { id: 2, text: "Socially optimal quantity is where MSC intersects Demand (MSB)" },
      { id: 3, text: "Per-unit tax is equal to the vertical distance between MSC and MPC" },
      { id: 4, text: "New supply curve (with tax) aligns with the MSC curve" }
    ]
  },
  {
    id: 45,
    subject: 'micro',
    lessonId: "6.2",
    topics: ["Externalities", "Positive Consumption", "Subsidies"],
    difficulty: 'medium',
    title: "Positive Consumption Externality",
    slug: "positive-consumption-externality",
    description: "Draw a market for flu shots, which generates a marginal external benefit on consumption. Label the Market Quantity, Socially Optimal Quantity, and the area of Deadweight Loss if left unregulated.",
    correctImage: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/graphGym/wb45.jpg",
    videoExplanation: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/graphGym/explanation45.mp4",
    checklist: [
      { id: 1, text: "Marginal Social Benefit (MSB) is above Marginal Private Benefit (MPB)" },
      { id: 2, text: "Market Quantity is where MPB intersects Supply (MPC)" },
      { id: 3, text: "Socially Optimal Quantity is higher, where MSB intersects Supply" },
      { id: 4, text: "Deadweight Loss triangle points toward the social optimum (right)" }
    ]
  }, 
  {
    id: 46,
    subject: 'micro',
    lessonId: "3.7",
    topics: ["Perfect Competition", "Long Run Equilibrium", "Efficiency"],
    difficulty: 'medium',
    title: "Short-Run Equilibrium in Perfect Competition",
    slug: "perfect-competition-2",
    description: "Draw side-by-side graphs for the market and a representative firm earning economic losses in the short run. Show how the firm returns to long-run equilibrium.",
    correctImage: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/graphGym/wb46.jpg",
    checklist: [
      { id: 1, text: "Initial firm graph shows economic losses (P < ATC)" },
      { id: 3, text: "Market graphs shows decrease in supply (shift left)" },
      { id: 4, text: "Firm MR increases to a point where P = ATC (zero economic profit)" }
    ]
  },
    {
      id: 47,
      subject: 'macro',
      lessonId: "4.6",
      topics: ["Loanable Funds", "Fiscal Policy", "Crowding Out", "Capital Flows"],
      difficulty: 'hard',
      title: "Crowding Out with International Capital Flows",
      slug: "crowding-out-2",
      description: "Draw the Loanable Funds Market. Show the impact of expansionary fiscal policy. Then, show the secondary effect of international capital inflows seeking higher returns.",
      toDoList: [
        "Shift the Demand for Loanable Funds to the right (Deficit Spending)",
        "Show the initial increase in Real Interest Rate",
        "Shift the Supply of Loanable Funds to the right (Capital Inflow)",
        "Show the final indeterminate effect on Quantity of Loans"
      ],
      correctImage: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/graphGym/wb47.jpg",
      checklist: [
        { id: 1, text: "Initial Demand shift increases Real Interest Rate" },
        { id: 2, text: "Higher interest rate attracts foreign capital, shifting Supply right" },
        { id: 3, text: "Final Real Interest Rate is lower than the initial spike but higher than original equilibrium (partial crowding out)" },
        { id: 4, text: "Quantity of Loanable Funds increases in both steps" }
      ]
    },
    {
      id: 48,
      subject: 'macro',
      lessonId: "6.6",
      topics: ["Foreign Exchange", "Interest Rates", "Net Exports", "AD-AS"],
      difficulty: 'hard',
      title: "Monetary Policy Transmission to Net Exports",
      slug: "monetary-policy",
      description: "This is a two-part graph scenario. First, draw the Money Market showing contractionary monetary policy. Second, draw the Foreign Exchange Market for the USD showing the result of their monetary policy.",
      toDoList: [
        "Money Market: Shift Supply Left, Nominal Interest Rate Up",
        "Forex Market: Shift Demand for USD Right and Supply of USD Left",
        "Show the appreciation of the US Dollar",
        "Explain/Label the resulting decrease in Net Exports"
      ],
      correctImage: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/graphGym/wb48.jpg",
      checklist: [
        { id: 1, text: "Money Supply decreases, raising Interest Rates" },
        { id: 2, text: "Higher rates increase Demand for USD (Capital Inflow)" },
        { id: 3, text: "Higher rates decrease Supply of USD (Less Capital Outflow)" },
        { id: 4, text: "Equilibrium Exchange Rate rises (Appreciation)" }
      ]
    },
    {
      id: 49,
      subject: 'macro',
      lessonId: "5.3",
      topics: ["Phillips Curve", "Long Run Adjustment", "Inflation Expectations"],
      difficulty: 'hard',
      title: "Long-Run Adjustment on the Phillips Curve",
      slug: "phillips-curve-2",
      description: "Draw an economy in a short-run equilibrium with high inflation. Show the movement to the long-run equilibrium as inflation expectations adjust.",
      toDoList: [
        "Plot initial point on SRPC1 to the left of LRPC (Inflationary Gap)",
        "Shift SRPC to the right/up to show increased inflation expectations",
        "Plot final point on the new SRPC and LRPC",
        "Show that Unemployment returns to the Natural Rate (NRU)"
      ],
      correctImage: "/images/graphs/macro/phillips-curve-adjustment.svg",
      checklist: [
        { id: 1, text: "Initial point is at low unemployment, high inflation" },
        { id: 2, text: "SRPC shifts right as expected inflation rises" },
        { id: 3, text: "Final point is at the intersection of new SRPC and LRPC" },
        { id: 4, text: "Final inflation rate is higher than initial" }
      ]
    },
    {
      id: 50,
      subject: 'macro',
      lessonId: "3.5",
      topics: ["AD-AS Model", "Stagflation", "Self-Correction"],
      difficulty: 'hard',
      title: "Self-Correction from Stagflation",
      slug: "self-correction-stagflation",
      description: "Draw an economy experiencing stagflation. Show the long-run self-correction mechanism assuming no government intervention.",
      toDoList: [
        "Draw initial SRAS shift to the left (Stagflation)",
        "Label the Recessionary Gap",
        "Shift SRAS back to the right (Wages fall due to high unemployment)",
        "Return to original Long-Run Equilibrium"
      ],
      correctImage: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/graphGym/wb50.jpg",
      checklist: [
        { id: 1, text: "Initial equilibrium has higher Price Level and lower GDP" },
        { id: 2, text: "High unemployment puts downward pressure on nominal wages" },
        { id: 3, text: "SRAS shifts right as input costs fall" },
        { id: 4, text: "Economy returns to Yf at the original Price Level" }
      ]
    },
    {
      id: 51,
      subject: 'macro',
      lessonId: "4.6",
      topics: ["Ample Reserves", "Administered Rates", "Monetary Policy"],
      difficulty: 'hard',
      title: "Ample Reserves Market: Ceiling and Floor",
      slug: "ample-reserves-market",
      description: "Draw the Market for Reserves in an ample regime. Show the equilibrium Federal Funds Rate (FFR). Suppose the actual output in the economy is greater than the natural rate of output.",
      toDoList: [
        "Identify the monetary policy tool that the central bank is using to close the output gap.",
        "Show the impact of the monetary policy actions on the policy rate.",
      ],
      correctImage: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/graphGym/wb51.jpg",
      checklist: [
        { id: 1, text: "Drew a vertical supply of reserves curve intersecting the lower horizontal section of the reserve demand curve."  },
        { id: 2, text: "Drew a Z-shaped demand curve for reserves, with the upper horizontal section representing the discount rate and the lower horizontal section representing the interest on reserves." },
        { id: 3, text: "Identified that the central bank raises the discount rate and / or interest on reserves to close the output gap." },
        { id: 4, text: "Showed the discount rate and / or interest on reserves being raised." },
      
      ]
    }, 
    {
    id: 52,
    subject: ['macro', 'micro'], // PPC is Unit 1 in both Macro and Micro, available for both
    lessonId: "1.3",
    topics: ["PPC", "Economic Growth", "Technology Shocks"],
    difficulty: 'medium',
    title: "Specific Technological Growth",
    slug: "technological-growth",
    description: "Draw a Production Possibilities Curve for Good X and Good Y. Show the effect of a new technology that improves the efficiency of producing Good X ONLY.",
    correctImage: "/images/graphs/macro/ppc-rotation-x.svg",
    checklist: [
      { id: 1, text: "Good Y intercept remains exactly at the original point" },
      { id: 2, text: "Good X intercept shifts outward to the right" },
      { id: 3, text: "The new curve is outside the old curve (showing growth for X)" },
      { id: 4, text: "Arrows clearly show a rotation/pivot, not a parallel shift" }
    ]
  },
  {
    id: 53,
    subject: 'micro',
    lessonId: "6.1",
    topics: ["Natural Monopoly", "Price Regulation", "Fair Return", "Allocative Efficiency"],
    difficulty: 'hard',
    title: "Regulating a Natural Monopoly (Constant MC)",
    slug: "natural-monopoly-regulation",
    description: "Draw a Natural Monopoly that faces constant marginal costs. Label the profit-maximizing quantity (Qm) and price (Pm), and the Fair-Return price (Pfr) and quantity (Qfr).",
    correctImage: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/graphGym/wb53.jpg",
    checklist: [
      { id: 1, text: "MC is a horizontal line (Constant Marginal Cost)" },
      { id: 2, text: "ATC is downward sloping and located above the MC curve" },
      { id: 3, text: "Profit-Max (Qm, Pm) is where MR = MC, price set on Demand" },
      { id: 4, text: "Fair-Return (Qfr, Pfr) is labeled where Demand intersects ATC (Zero Profit)" }
    ]
  },

  // --- AP MICRO: Additional graphing scenarios (54–72) ---
  {
    id: 54,
    subject: 'micro',
    lessonId: "2.2",
    topics: ["Elasticity", "Supply and Demand", "Inelastic Demand", "Elastic Supply"],
    difficulty: 'easy',
    title: "Inelastic Demand and Elastic Supply",
    slug: "inelastic-demand-elastic-supply",
    description: "Draw a supply and demand curve for a good that has relatively inelastic demand and relatively elastic supply.",
    // Mapped to inelastic_demand_elastic_supply.jpg
    correctImage: `${MICRO_IMAGE_BASE}inelastic_demand_elastic_supply.jpg`,
    checklist: [
      { id: 1, text: "Demand curve is steep (relatively inelastic)" },
      { id: 2, text: "Supply curve is flat (relatively elastic)" },
      { id: 3, text: "Axes labeled Price and Quantity" },
      { id: 4, text: "Equilibrium is clearly shown at the intersection" }
    ]
  },
  {
    id: 55,
    subject: 'micro',
    lessonId: "2.2",
    topics: ["Elasticity", "Perfectly Inelastic Demand"],
    difficulty: 'easy',
    title: "Perfectly Inelastic Demand",
    slug: "perfectly-inelastic-demand",
    description: "Draw the demand curve for a product with perfectly inelastic demand.",
    // Mapped to perfectly_inelastic_demand.jpg
    correctImage: `${MICRO_IMAGE_BASE}perfectly_inelastic_demand.jpg`,
    checklist: [
      { id: 1, text: "Demand curve is a vertical line" },
      { id: 2, text: "Quantity does not change when price changes" },
      { id: 3, text: "Axes labeled Price and Quantity" },
      { id: 4, text: "Curve is clearly labeled as Demand" }
    ]
  },
  {
    id: 56,
    subject: 'micro',
    lessonId: "2.8",
    topics: ["Per-Unit Tax", "Tax Revenue", "Deadweight Loss"],
    difficulty: 'medium',
    title: "Per-Unit Tax: Tax Revenue and DWL",
    slug: "per-unit-tax-revenue-dwl",
    description: "Draw a supply and demand curve and show the impact of a per unit tax on the product. Label total tax revenue and deadweight loss.",
    // Mapped to tax_revenue_dwl.jpg
    correctImage: `${MICRO_IMAGE_BASE}tax_revenue_dwl.jpg`,
    checklist: [
      { id: 1, text: "Supply curve shifts vertically upward by the tax amount" },
      { id: 2, text: "Total tax revenue rectangle is labeled (tax × quantity exchanged)" },
      { id: 3, text: "Deadweight loss triangle is labeled" },
      { id: 4, text: "New equilibrium quantity is less than original" }
    ]
  },
  {
    id: 57,
    subject: 'micro',
    lessonId: "2.6",
    topics: ["Market Equilibrium", "Consumer Surplus", "Producer Surplus"],
    difficulty: 'easy',
    title: "Equilibrium with CS and PS",
    slug: "equilibrium-cs-ps",
    description: "Draw a supply and demand graph showing a market in equilibrium. Label total consumer surplus and total producer surplus.",
    // Mapped to consumer_producer_surplus.jpg
    correctImage: `${MICRO_IMAGE_BASE}consumer_producer_surplus.jpg`,
    checklist: [
      { id: 1, text: "Equilibrium price and quantity are at the intersection of S and D" },
      { id: 2, text: "Total consumer surplus is labeled (area below demand, above price)" },
      { id: 3, text: "Total producer surplus is labeled (area above supply, below price)" },
      { id: 4, text: "Supply and demand curves are correctly drawn" }
    ]
  },
  {
    id: 58,
    subject: 'micro',
    lessonId: "2.8",
    topics: ["Per-Unit Tax", "Consumer Surplus", "Producer Surplus", "Tax Revenue", "DWL"],
    difficulty: 'medium',
    title: "Per-Unit Tax: Welfare After Tax",
    slug: "per-unit-tax-welfare",
    description: "Draw a supply and demand curve and show the impact of a per unit tax on the product. Label consumer surplus, producer surplus, total tax revenue and DWL after the tax.",
    // Mapped to tax_fully_labelled.jpg (Matches 'Welfare After Tax' scope)
    correctImage: `${MICRO_IMAGE_BASE}tax_fully_labelled.jpg`,
    checklist: [
      { id: 1, text: "Supply shifts up by the tax; new equilibrium is shown" },
      { id: 2, text: "Consumer surplus after tax is labeled" },
      { id: 3, text: "Producer surplus after tax is labeled" },
      { id: 4, text: "Total tax revenue and DWL are labeled" }
    ]
  },
  {
    id: 59,
    subject: 'micro',
    lessonId: "2.5",
    topics: ["Tariff", "International Trade", "CS", "PS", "Tax Revenue", "DWL", "Imports"],
    difficulty: 'hard',
    title: "Domestic Market with Tariff",
    slug: "tariff-domestic-market",
    description: "Draw the supply and demand curves for a domestic market after a tariff has been placed on imported goods. Label CS, PS, total tax revenue, DWL, and show the quantity imported.",
    // Mapped to tariff_fully_labelled.jpg
    correctImage: `${MICRO_IMAGE_BASE}tariff_fully_labelled.jpg`,
    checklist: [
      { id: 1, text: "World price and tariff-inclusive price (or domestic equilibrium) are shown" },
      { id: 2, text: "CS, PS, total tax (tariff) revenue, and DWL are labeled" },
      { id: 3, text: "Quantity imported is clearly indicated" },
      { id: 4, text: "Domestic supply and demand curves are drawn correctly" }
    ]
  },
  {
    id: 60,
    subject: 'micro',
    lessonId: "2.8",
    topics: ["Price Floor", "Binding", "Qd", "Qs", "Surplus"],
    difficulty: 'easy',
    title: "Binding Price Floor",
    slug: "binding-price-floor",
    description: "Add a binding price floor to a supply and demand graph. Show the impact on Qd and Qs.",
    // Mapped to price_floor.jpg
    correctImage: `${MICRO_IMAGE_BASE}price_floor.jpg`,
    checklist: [
      { id: 1, text: "Price floor is a horizontal line above equilibrium price" },
      { id: 2, text: "Quantity demanded (Qd) is labeled at the floor price" },
      { id: 3, text: "Quantity supplied (Qs) is labeled at the floor price" },
      { id: 4, text: "Qs > Qd (surplus) is clearly shown" }
    ]
  },
  {
    id: 61,
    subject: 'micro',
    lessonId: "2.8",
    topics: ["Price Ceiling", "Binding", "Qd", "Qs", "Shortage"],
    difficulty: 'easy',
    title: "Binding Price Ceiling (Qd and Qs)",
    slug: "binding-price-ceiling-qd-qs",
    description: "Add a binding price ceiling to a supply and demand graph. Show the impact on Qd and Qs.",
    // Mapped to price_ceiling.jpg
    correctImage: `${MICRO_IMAGE_BASE}price_ceiling.jpg`,
    checklist: [
      { id: 1, text: "Price ceiling is a horizontal line below equilibrium price" },
      { id: 2, text: "Quantity demanded (Qd) is labeled at the ceiling price" },
      { id: 3, text: "Quantity supplied (Qs) is labeled at the ceiling price" },
      { id: 4, text: "Qd > Qs (shortage) is clearly shown" }
    ]
  },
  {
    id: 62,
    subject: 'micro',
    lessonId: "2.8",
    topics: ["Price Ceiling", "Consumer Surplus", "Producer Surplus", "DWL"],
    difficulty: 'medium',
    title: "Binding Price Ceiling: CS, PS, and DWL",
    slug: "binding-price-ceiling-welfare",
    description: "Add a binding price ceiling to a supply and demand graph. Label the new CS, PS, and DWL.",
    // Mapped to price_ceiling_surplus_dwl.jpg
    correctImage: `${MICRO_IMAGE_BASE}price_ceiling_surplus_dwl.jpg`,
    checklist: [
      { id: 1, text: "Binding price ceiling is drawn below equilibrium" },
      { id: 2, text: "New consumer surplus (CS) is labeled" },
      { id: 3, text: "New producer surplus (PS) is labeled" },
      { id: 4, text: "Deadweight loss (DWL) is labeled" }
    ]
  },
  {
    id: 63,
    subject: 'micro',
    lessonId: "3.7",
    topics: ["Perfect Competition", "Increasing-Cost Industry", "Market and Firm", "Supply and Demand Shift"],
    difficulty: 'hard',
    title: "PC Firm in Increasing-Cost Industry",
    slug: "pc-increasing-cost-industry",
    description: "Draw the market and firm graphs for a perfectly competitive firm in an increasing-cost industry. Show the impact on the product price as both market supply and demand increase.",
    // Mapped to increasing_cost_industry.jpg
    correctImage: `${MICRO_IMAGE_BASE}increasing_cost_industry.jpg`,
    checklist: [
      { id: 1, text: "Market graph shows both supply and demand shifting" },
      { id: 2, text: "Firm graph is consistent with the new market price" },
      { id: 3, text: "Impact on product price is clearly shown (indeterminate or as appropriate)" },
      { id: 4, text: "Market and firm graphs are drawn side by side" }
    ]
  },
  {
    id: 64,
    subject: 'micro',
    lessonId: "5.3",
    topics: ["Labor Market", "Perfect Competition", "Market and Firm"],
    difficulty: 'medium',
    title: "Perfectly Competitive Labor Market",
    slug: "pc-labor-market",
    description: "Draw the market and firm graphs for a perfectly competitive labor market.",
    // Mapped to perfectly_comp_labor_market.jpg
    correctImage: `${MICRO_IMAGE_BASE}perfectly_comp_labor_market.jpg`,
    checklist: [
      { id: 1, text: "Market graph shows labor supply and labor demand with equilibrium wage" },
      { id: 2, text: "Firm graph shows MRC (horizontal) and MRP (downward sloping)" },
      { id: 3, text: "Quantity of labor hired by firm is where MRP = MRC" },
      { id: 4, text: "Axes are labeled (Wage, Quantity of Labor)" }
    ]
  },
  {
    id: 65,
    subject: 'micro',
    lessonId: "4.2",
    topics: ["Monopoly", "Long-Run Equilibrium", "Economic Profit"],
    difficulty: 'medium',
    title: "Single-Price Monopoly Long-Run Equilibrium",
    slug: "monopoly-lr-profit",
    description: "Draw the short-run production cost curves for a single-price monopoly in long-run equilibrium. Shade in the area that represents the firm's total economic profit.",
    // Mapped to monopoly_econ_profit.jpg
    correctImage: `${MICRO_IMAGE_BASE}monopoly_econ_profit.jpg`,
    checklist: [
      { id: 1, text: "D, MR, MC, and ATC are drawn" },
      { id: 2, text: "Profit-maximizing quantity is where MR = MC" },
      { id: 3, text: "Price is on the demand curve above that quantity" },
      { id: 4, text: "Area of total economic profit is shaded" }
    ]
  },
  {
    id: 66,
    subject: 'micro',
    lessonId: "4.2",
    topics: ["Monopoly", "Labor Costs", "Profit Maximization"],
    difficulty: 'medium',
    title: "Monopoly: Increase in Labor Costs",
    slug: "monopoly-labor-cost-increase",
    description: "Show the impact of an increase in labor costs on a single-price monopoly. Label the original profit-maximizing price and quantity, as well as the new profit-maximizing price and quantity.",
    // Mapped to mc_curve_increase.jpg
    correctImage: `${MICRO_IMAGE_BASE}mc_curve_increase.jpg`,
    checklist: [
      { id: 1, text: "Original profit-maximizing price and quantity are labeled" },
      { id: 2, text: "MC and/or ATC shift to reflect higher labor costs" },
      { id: 3, text: "New profit-maximizing price and quantity are labeled" },
      { id: 4, text: "New quantity is lower; new price is higher (typical result)" }
    ]
  },
  {
    id: 67,
    subject: 'micro',
    lessonId: "4.4",
    topics: ["Monopolistic Competition", "Long-Run Equilibrium", "Allocative Efficiency"],
    difficulty: 'medium',
    title: "Monopolistically Competitive Firm Long-Run Equilibrium",
    slug: "monop-comp-lr-equilibrium",
    description: "Draw the short-run production cost curves for a monopolistically competitive firm in long-run equilibrium. Label the profit-maximizing price and quantity, as well as the allocatively efficient quantity.",
    // Mapped to monopolistic_comp_lre.jpg
    correctImage: `${MICRO_IMAGE_BASE}monopolistic_comp_lre.jpg`,
    checklist: [
      { id: 1, text: "D, MR, MC, and ATC are drawn" },
      { id: 2, text: "Profit-maximizing P and Q are where MR = MC, price on D" },
      { id: 3, text: "Allocatively efficient quantity is where MC = D" },
      { id: 4, text: "Zero economic profit (P = ATC at profit-max quantity)" }
    ]
  },
  {
    id: 68,
    subject: 'micro',
    lessonId: "3.7",
    topics: ["Perfect Competition", "Short-Run", "Positive Economic Profit"],
    difficulty: 'medium',
    title: "PC Firm Earning Positive Economic Profit",
    slug: "pc-positive-profit",
    description: "Draw the short-run production cost curves for a perfectly competitive firm that is earning positive economic profit in the short-run.",
    // Mapped to perfect_comp_profit.jpg
    correctImage: `${MICRO_IMAGE_BASE}perfect_comp_profit.jpg`,
    checklist: [
      { id: 1, text: "Horizontal demand (P = MR = AR) at market price" },
      { id: 2, text: "MC, ATC, and AVC are drawn" },
      { id: 3, text: "Profit-maximizing quantity is where MC = MR" },
      { id: 4, text: "P > ATC at that quantity; economic profit area is shown" }
    ]
  },
  {
    id: 69,
    subject: 'micro',
    lessonId: "3.7",
    topics: ["Perfect Competition", "Short-Run", "Economic Losses"],
    difficulty: 'medium',
    title: "PC Firm Earning Economic Losses",
    slug: "pc-economic-losses",
    description: "Draw the short-run production cost curves for a perfectly competitive firm that is earning economic losses in the short-run.",
    // Mapped to perfect_comp_losses.jpg
    correctImage: `${MICRO_IMAGE_BASE}perfect_comp_losses.jpg`,
    checklist: [
      { id: 1, text: "Horizontal demand (P = MR) at market price" },
      { id: 2, text: "MC, ATC, and AVC are drawn" },
      { id: 3, text: "Profit-maximizing quantity is where MC = MR" },
      { id: 4, text: "P < ATC at that quantity; loss area is shown" }
    ]
  },
  {
    id: 70,
    subject: 'micro',
    lessonId: "3.7",
    topics: ["Perfect Competition", "Number of Sellers", "Market and Firm"],
    difficulty: 'medium',
    title: "PC Industry: Reduction in Number of Sellers",
    slug: "pc-fewer-sellers",
    description: "Draw the market and firm graphs for a perfectly competitive industry. Show the impact of reduction in the number of sellers in the market.",
    // Mapped to perfect_comp_supply_decrease.jpg
    correctImage: `${MICRO_IMAGE_BASE}perfect_comp_supply_decrease.jpg`,
    checklist: [
      { id: 1, text: "Market supply curve shifts left (fewer sellers)" },
      { id: 2, text: "New equilibrium price increases, quantity decreases" },
      { id: 3, text: "Firm graph shows the new higher price (horizontal D)" },
      { id: 4, text: "Market and firm graphs are consistent" }
    ]
  },
  {
    id: 71,
    subject: 'micro',
    lessonId: "6.2",
    topics: ["Positive Externality", "Flu Shots", "MPB", "MPC", "MSB", "MSC", "DWL"],
    difficulty: 'medium',
    title: "Flu Shots: Marginal External Benefit",
    slug: "flu-shots-external-benefit",
    description: "Suppose that getting the flu shot generates marginal external benefit for society. Draw a graph that shows the marginal private benefit (MPB), marginal private cost (MPC), marginal social benefit (MSB), and marginal social cost (MSC) in the market for flu shots. Label deadweight loss.",
    // Mapped to positive_consumption_externality.jpg
    correctImage: `${MICRO_IMAGE_BASE}positive_consumption_externality.jpg`,
    checklist: [
      { id: 1, text: "MPB and MPC (supply) are drawn" },
      { id: 2, text: "MSB is above MPB; MSC equals MPC (or is drawn appropriately)" },
      { id: 3, text: "Market quantity and socially optimal quantity are identifiable" },
      { id: 4, text: "Deadweight loss is labeled" }
    ]
  },
  {
    id: 72,
    subject: 'micro',
    lessonId: "6.2",
    topics: ["Negative Externality", "Production", "Qpm", "Qso", "Ppm", "Pso"],
    difficulty: 'medium',
    title: "Negative Production Externality (Qpm, Qso, Ppm, Pso)",
    slug: "negative-production-externality-labels",
    description: "Draw the market graph for a product that generates a negative externality during production. Label the private market quantity (Qpm), the socially optimal quantity (Qso), the private market price (Ppm) and the socially optimal price (Pso).",
    // Mapped to negative_production_externality.jpg
    correctImage: `${MICRO_IMAGE_BASE}negative_production_externality.jpg`,
    checklist: [
      { id: 1, text: "MSC is above MPC (supply)" },
      { id: 2, text: "Private market quantity (Qpm) and price (Ppm) are labeled" },
      { id: 3, text: "Socially optimal quantity (Qso) and price (Pso) are labeled" },
      { id: 4, text: "Qpm > Qso; market overproduces without intervention" }
    ]
  }, 
  {
    id: 73,
    subject: 'macro',
    lessonId: "1.2",
    topics: ["PPC", "Economic Growth", "Technology"],
    difficulty: 'easy',
    title: "PPC: Improved Technology",
    slug: "ppc-improved-technology",
    description: "How do you show the effect of improved technology on a country's production possibilities?",
    correctImage: `${MACRO_IMAGE_BASE}ppc_outward_shift.jpg`,
    checklist: [
      { id: 1, text: "PPC shifts outward (to the right)" },
      { id: 2, text: "Axes labeled with two different goods" },
      { id: 3, text: "Show that previously unattainable points are now attainable" }
    ]
  },
  {
    id: 74,
    subject: 'macro',
    lessonId: "1.2",
    topics: ["PPC", "Recession", "Disaster"],
    difficulty: 'easy',
    title: "PPC: Natural Disaster",
    slug: "ppc-natural-disaster",
    description: "How do you show the effects of a large-scale natural disaster on the PPC?",
    correctImage: `${MACRO_IMAGE_BASE}ppc_inward_shift.jpg`,
    checklist: [
      { id: 1, text: "PPC shifts inward (to the left)" },
      { id: 2, text: "Represents a destruction of resources (Land/Capital)" },
      { id: 3, text: "Productive capacity decreases" }
    ]
  },
  {
    id: 75,
    subject: 'macro',
    lessonId: "1.2",
    topics: ["PPC", "Inefficiency", "Unemployment"],
    difficulty: 'easy',
    title: "PPC: Inefficiency",
    slug: "ppc-inefficiency",
    description: "How do you show on a PPC that a country is producing inefficiently (underutilizing resources)?",
    correctImage: `${MACRO_IMAGE_BASE}underutilization.jpg`,
    checklist: [
      { id: 1, text: "Draw a point inside the PPC curve" },
      { id: 2, text: "Label the point (e.g., Point A)" },
      { id: 3, text: "Curve remains stationary (resources are not destroyed, just unused)" }
    ]
  },
  {
    id: 76,
    subject: 'macro',
    lessonId: "1.4",
    topics: ["Supply and Demand", "Demand Shift", "Substitutes"],
    difficulty: 'easy',
    title: "Demand Increase (Substitutes)",
    slug: "demand-increase-substitutes",
    description: "How do you show the effect of a rise in the price of a substitute good on demand for the original good?",
    correctImage: `${MACRO_IMAGE_BASE}demand_increase.jpg`,
    checklist: [
      { id: 1, text: "Demand curve shifts to the right" },
      { id: 2, text: "Equilibrium price increases" },
      { id: 3, text: "Equilibrium quantity increases" }
    ]
  },
  {
    id: 77,
    subject: 'macro',
    lessonId: "1.6",
    topics: ["Market Equilibrium", "Surplus", "Price Controls"],
    difficulty: 'medium',
    title: "Market Surplus",
    slug: "market-surplus",
    description: "How do you show a surplus on a supply and demand graph?",
    correctImage: `${MACRO_IMAGE_BASE}surplus.jpg`,
    checklist: [
      { id: 1, text: "Draw a price line ABOVE the equilibrium price" },
      { id: 2, text: "Label Quantity Supplied (Qs) on the Supply curve" },
      { id: 3, text: "Label Quantity Demanded (Qd) on the Demand curve" },
      { id: 4, text: "Identify the horizontal gap where Qs > Qd" }
    ]
  },

  // ——— Unit 3: AD/AS Model ———
  {
    id: 78,
    subject: 'macro',
    lessonId: "3.1",
    topics: ["AD-AS", "Aggregate Demand", "Consumer Confidence"],
    difficulty: 'medium',
    title: "Increase in Aggregate Demand",
    slug: "ad-increase",
    description: "How do you show an increase in aggregate demand on an AD-AS graph?",
    correctImage: `${MACRO_IMAGE_BASE}ad_increase.jpg`,
    checklist: [
      { id: 1, text: "AD curve shifts to the right" },
      { id: 2, text: "Price Level (PL) increases" },
      { id: 3, text: "Real GDP (Y) increases" }
    ]
  },
  {
    id: 79,
    subject: 'macro',
    lessonId: "3.3",
    topics: ["AD-AS", "SRAS", "Input Costs"],
    difficulty: 'medium',
    title: "Decrease in SRAS (Supply Shock)",
    slug: "sras-decrease",
    description: "How do you show a decrease in short-run aggregate supply on an AD-AS graph?",
    correctImage: `${MACRO_IMAGE_BASE}sras_decrease.jpg`,
    checklist: [
      { id: 1, text: "SRAS curve shifts to the left" },
      { id: 2, text: "Price Level increases (Inflation)" },
      { id: 3, text: "Real GDP decreases (Recession)" }
    ]
  },
  {
    id: 80,
    subject: 'macro',
    lessonId: "3.5",
    topics: ["AD-AS", "Recessionary Gap", "Output Gap"],
    difficulty: 'hard',
    title: "Recessionary Gap",
    slug: "recessionary-gap",
    description: "How do you show a recessionary gap on an AD-AS graph?",
    correctImage: `${MACRO_IMAGE_BASE}recessionary_gap.jpg`,
    checklist: [
      { id: 1, text: "Draw LRAS (Vertical) at Full Employment (Yf)" },
      { id: 2, text: "Draw AD and SRAS intersecting to the LEFT of LRAS" },
      { id: 3, text: "Label current output (Y1) below potential output (Yf)" }
    ]
  },
  {
    id: 81,
    subject: 'macro',
    lessonId: "3.5",
    topics: ["AD-AS", "Inflationary Gap", "Overheating"],
    difficulty: 'hard',
    title: "Inflationary Gap",
    slug: "inflationary-gap",
    description: "Draw the AD-AS graph of a country with actual output greater than potential output.",
    correctImage: `${MACRO_IMAGE_BASE}adas_inflationary.jpg`,
    checklist: [
      { id: 1, text: "Draw LRAS (Vertical) at Full Employment (Yf)" },
      { id: 2, text: "Draw AD and SRAS intersecting to the RIGHT of LRAS" },
      { id: 3, text: "Label current output (Y1) above potential output (Yf)" }
    ]
  },
  {
    id: 82,
    subject: 'macro',
    lessonId: "3.6",
    topics: ["AD-AS", "Stagflation", "Cost-Push Inflation"],
    difficulty: 'hard',
    title: "Stagflation",
    slug: "stagflation",
    description: "How do you show stagflation on an AD-AS graph?",
    correctImage: `${MACRO_IMAGE_BASE}stagflation.jpg`,
    checklist: [
      { id: 1, text: "SRAS shifts left (negative supply shock)" },
      { id: 2, text: "Price Level rises (Inflation)" },
      { id: 3, text: "Real GDP falls (Stagnation/Recession)" }
    ]
  },
  {
    id: 83,
    subject: 'macro',
    lessonId: "3.7",
    topics: ["AD-AS", "Long Run Adjustment", "Self-Correction"],
    difficulty: 'hard',
    title: "Long-Run Self-Adjustment (Recession)",
    slug: "lr-adjustment-recession",
    description: "How do you show long-run self-adjustment from a recessionary gap?",
    correctImage: `${MACRO_IMAGE_BASE}long_run_adjustment_recessionary.jpg`,
    checklist: [
      { id: 1, text: "Start with intersection to the left of LRAS" },
      { id: 2, text: "Shift SRAS to the RIGHT" },
      { id: 3, text: "New intersection is at LRAS (Full Employment)" },
      { id: 4, text: "Price Level decreases" }
    ]
  },

  // ——— Unit 4: Financial Sector ———
  {
    id: 84,
    subject: 'macro',
    lessonId: "4.5",
    topics: ["Money Market", "Money Supply", "Monetary Policy"],
    difficulty: 'medium',
    title: "Money Market: Increased Money Supply",
    slug: "money-supply-increase",
    description: "How do you show an increase in the money supply on a money market graph?",
    correctImage: `${MACRO_IMAGE_BASE}money_supply_increase.jpg`,
    checklist: [
      { id: 1, text: "Vertical Money Supply (MS) curve shifts right" },
      { id: 2, text: "Nominal Interest Rate decreases" },
      { id: 3, text: "Money Demand (MD) remains unchanged" }
    ]
  },
  {
    id: 85,
    subject: 'macro',
    lessonId: "4.5",
    topics: ["Money Market", "Money Demand", "Price Level"],
    difficulty: 'medium',
    title: "Money Market: Increased Price Level",
    slug: "money-demand-price-level",
    description: "Show how an increase in the general price level impacts money demand.",
    correctImage: `${MACRO_IMAGE_BASE}money_demand_increase.jpg`,
    checklist: [
      { id: 1, text: "Money Demand (MD) curve shifts right" },
      { id: 2, text: "Nominal Interest Rate increases" },
      { id: 3, text: "People need more cash to buy same goods" }
    ]
  },
  {
    id: 86,
    subject: 'macro',
    lessonId: "4.7",
    topics: ["Loanable Funds", "Deficit Spending", "Crowding Out"],
    difficulty: 'hard',
    title: "Loanable Funds: Deficit Spending",
    slug: "lf-deficit-spending",
    description: "How do you show the impact of government deficit spending on a loanable funds graph?",
    correctImage: `${MACRO_IMAGE_BASE}lf_demand_increase.jpg`,
    checklist: [
      { id: 1, text: "Demand for Loanable Funds shifts right" },
      { id: 2, text: "Real Interest Rate increases" },
      { id: 3, text: "Quantity of funds loaned increases" }
    ]
  },
  {
    id: 87,
    subject: 'macro',
    lessonId: "4.7",
    topics: ["Loanable Funds", "Political Instability", "Capital Flight"],
    difficulty: 'medium',
    title: "Loanable Funds: Political Instability",
    slug: "lf-political-instability",
    description: "Show the impact of political instability on the loanable funds graph.",
    correctImage: `${MACRO_IMAGE_BASE}lf_supply_decrease.jpg`,
    checklist: [
      { id: 1, text: "Supply of Loanable Funds shifts left" },
      { id: 2, text: "Real Interest Rate increases" },
      { id: 3, text: "Investment decreases" }
    ]
  },

  // ——— Unit 5: Stabilization Policies ———
  {
    id: 88,
    subject: 'macro',
    lessonId: "5.2",
    topics: ["Phillips Curve", "Fiscal Policy", "Short Run"],
    difficulty: 'hard',
    title: "SRPC: Expansionary Policy",
    slug: "srpc-expansionary-policy",
    description: "Show the impact of expansionary fiscal policy on the short run Phillips curve.",
    correctImage: `${MACRO_IMAGE_BASE}srpc_downward_move.jpg`,
    checklist: [
      { id: 1, text: "Move along the SRPC curve UP and to the LEFT" },
      { id: 2, text: "Unemployment decreases" },
      { id: 3, text: "Inflation increases" }
    ]
  },
  {
    id: 89,
    subject: 'macro',
    lessonId: "5.2",
    topics: ["Phillips Curve", "Inflation Expectations", "Shifts"],
    difficulty: 'hard',
    title: "SRPC: Inflationary Expectations",
    slug: "srpc-inflation-expectations",
    description: "Show the impact of an increase in inflationary expectations on the SRPC.",
    correctImage: `${MACRO_IMAGE_BASE}srpc_right_shift.jpg`,
    checklist: [
      { id: 1, text: "SRPC shifts UP (or Right)" },
      { id: 2, text: "Inflation is higher at every unemployment rate" },
      { id: 3, text: "LRPC remains vertical" }
    ]
  },
  {
    id: 90,
    subject: 'macro',
    lessonId: "5.2",
    topics: ["Phillips Curve", "Long Run Equilibrium"],
    difficulty: 'medium',
    title: "Phillips Curve Equilibrium",
    slug: "phillips-equilibrium",
    description: "Draw the LRPC and SRPC for a country currently in long-run equilibrium.",
    correctImage: `${MACRO_IMAGE_BASE}phillips_equilibrium.jpg`,
    checklist: [
      { id: 1, text: "Draw vertical LRPC at Natural Rate of Unemployment" },
      { id: 2, text: "Draw downward sloping SRPC" },
      { id: 3, text: "Intersection occurs exactly on the LRPC" }
    ]
  },

  // ——— Unit 6: International Trade ———
  {
    id: 91,
    subject: 'macro',
    lessonId: "6.2",
    topics: ["Forex", "Exchange Rates", "Market Equilibrium"],
    difficulty: 'medium',
    title: "Forex Market Equilibrium",
    slug: "forex-market",
    description: "Draw the forex market for USD and CAD.",
    correctImage: `${MACRO_IMAGE_BASE}forex_market.jpg`,
    checklist: [
      { id: 1, text: "Vertical Axis: CAD/USD (Price of USD)" },
      { id: 2, text: "Horizontal Axis: Quantity of USD" },
      { id: 3, text: "Supply slopes up; Demand slopes down" }
    ]
  },
  {
    id: 92,
    subject: 'macro',
    lessonId: "6.4",
    topics: ["Forex", "Monetary Policy", "Depreciation"],
    difficulty: 'hard',
    title: "Forex: Expansionary Monetary Policy",
    slug: "forex-monetary-expansion",
    description: "Show expansionary monetary policy on a forex market graph (domestic currency).",
    correctImage: `${MACRO_IMAGE_BASE}forex_demand_decrease.jpg`,
    checklist: [
      { id: 1, text: "Lower interest rates cause capital outflow" },
      { id: 2, text: "Demand for currency shifts Left (Decreases)" },
      { id: 3, text: "Currency Depreciates (Value falls)" }
    ]
  },
  {
    id: 93,
    subject: 'macro',
    lessonId: "6.6",
    topics: ["Forex", "Interest Rates", "Capital Flows"],
    difficulty: 'hard',
    title: "Forex: Interest Rate Differential",
    slug: "forex-interest-rates",
    description: "Show the impact of an increase in interest rates on the value of the YEN relative to the EURO.",
    correctImage: `${MACRO_IMAGE_BASE}forex_market_shifts.jpg`,
    checklist: [
      { id: 1, text: "Higher rates attract capital inflow" },
      { id: 2, text: "Demand for Yen shifts Right (Increases)" },
      { id: 3, text: "Yen Appreciates (Value rises)" }
    ]
  }
];

