export type Unit = {
    number: number;
    title: string;
    description: string;
    pdfUrl: string;
    subject: 'macro' | 'micro';
    price: number; // Add price property
  }

export const macroUnits: Unit[] = [
    { number: 1, title: "Basic Economic Concepts", description: "Foundational economic ideas like scarcity, opportunity cost, and comparative advantage.", pdfUrl: "/cheat-sheets/macro/AP_Dojo_Macro_U1.pdf", subject: 'macro', price: 4.99 },
    { number: 2, title: "Economic Indicators and the Business Cycle", description: "Metrics like GDP, unemployment, and inflation that measure the health of an economy.", pdfUrl: "/cheat-sheets/macro/AP_Dojo_Macro_U2.pdf", subject: 'macro', price: 4.99 },
    { number: 3, title: "National Income and Price Determination", description: "Models of aggregate demand and supply that determine economic output and price levels.", pdfUrl: "/cheat-sheets/macro/AP_Dojo_Macro_U3.pdf", subject: 'macro', price: 4.99 },
    { number: 4, title: "Financial Sector", description: "The role of money, banking, interest rates, and financial markets in the economy.", pdfUrl: "/cheat-sheets/macro/AP_Dojo_Macro_U4.pdf", subject: 'macro', price: 4.99 },
    { number: 5, title: "Long-Run Consequences of Stabilization Policies", description: "The effects of fiscal and monetary policy on long-term economic growth and stability.", pdfUrl: "/cheat-sheets/macro/AP_Dojo_Macro_U5.pdf", subject: 'macro', price: 4.99 },
    { number: 6, title: "Open Economy—International Trade and Finance", description: "How international trade, finance, and exchange rates affect an economy.", pdfUrl: "/cheat-sheets/macro/AP_Dojo_Macro_U6.pdf", subject: 'macro', price: 4.99 },
  ];
  
export const microUnits: Unit[] = [
    { number: 1, title: "Basic Economic Concepts", description: "Core microeconomic principles including scarcity, trade-offs, and efficiency.", pdfUrl: "/cheat-sheets/micro/AP_Dojo_Micro_U1.pdf", subject: 'micro', price: 4.99 },
    { number: 2, title: "Supply and Demand", description: "The fundamental model of how prices and quantities are determined in a market.", pdfUrl: "/cheat-sheets/micro/AP_Dojo_Micro_U2.pdf", subject: 'micro', price: 4.99 },
    { number: 3, title: "Production, Cost, and the Perfect Competition Model", description: "How firms make decisions about production and pricing in competitive markets.", pdfUrl: "/cheat-sheets/micro/AP_Dojo_Micro_U3.pdf", subject: 'micro', price: 4.99 },
    { number: 4, title: "Imperfect Competition", description: "Market structures like monopoly and oligopoly where firms have market power.", pdfUrl: "/cheat-sheets/micro/AP_Dojo_Micro_U4.pdf", subject: 'micro', price: 4.99 },
    { number: 5, title: "Factor Markets", description: "The markets for labor, capital, and land, and how incomes are determined.", pdfUrl: "/cheat-sheets/micro/AP_Dojo_Micro_U5.pdf", subject: 'micro', price: 4.99 },
    { number: 6, title: "Market Failure and the Role of Government", description: "Situations where markets fail to allocate resources efficiently, and the role of government intervention.", pdfUrl: "/cheat-sheets/micro/AP_Dojo_Micro_U6.pdf", subject: 'micro', price: 4.99 },
  ];
  