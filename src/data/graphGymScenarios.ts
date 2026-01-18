// Graph Gym Scenarios Data
// Each scenario contains a question prompt, checklist items, and a sample answer image
// Scenarios are linked to lessons in the syllabus via lessonId and can track relevant topics

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
  toDoList?: string[]; // Optional array of to-do items to display as bullet points
  correctImage: string;
  videoExplanation?: string; // Optional video explanation URL
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
    description: "Draw the Demand, MR, MC, and ATC curves for a pure monopoly in long-run equilibrium.",
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
    description: "Draw a Production Possibilities Curve for Good X and Good Y. Show the effect of a new technology that improves the efficiency of producing Good X ONLY.",
    correctImage: "/images/graphs/macro/ppc-rotation-x.svg",
    checklist: [
      { id: 1, text: "Good Y intercept remains exactly at the original point" },
      { id: 2, text: "Good X intercept shifts outward to the right" },
      { id: 3, text: "The new curve is outside the old curve (showing growth for X)" },
      { id: 4, text: "Arrows clearly show a rotation/pivot, not a parallel shift" }
    ]
  }
];

