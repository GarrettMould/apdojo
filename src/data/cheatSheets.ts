export type Unit = {
    number: number;
    title: string;
    pdfUrl: string;
    subject: 'macro' | 'micro';
  }

export const macroUnits: Unit[] = [
    { number: 1, title: "Basic Economic Concepts", pdfUrl: "/cheat-sheets/macro/AP_Dojo_Macro_U1.pdf", subject: 'macro' },
    { number: 2, title: "Economic Indicators and the Business Cycle", pdfUrl: "/cheat-sheets/macro/AP_Dojo_Macro_U2.pdf", subject: 'macro' },
    { number: 3, title: "National Income and Price Determination", pdfUrl: "/cheat-sheets/macro/AP_Dojo_Macro_U3.pdf", subject: 'macro' },
    { number: 4, title: "Financial Sector", pdfUrl: "/cheat-sheets/macro/AP_Dojo_Macro_U4.pdf", subject: 'macro' },
    { number: 5, title: "Long-Run Consequences of Stabilization Policies", pdfUrl: "/cheat-sheets/macro/AP_Dojo_Macro_U5.pdf", subject: 'macro' },
    { number: 6, title: "Open Economy—International Trade and Finance", pdfUrl: "/cheat-sheets/macro/AP_Dojo_Macro_U6.pdf", subject: 'macro' },
  ];
  
export const microUnits: Unit[] = [
    { number: 1, title: "Basic Economic Concepts", pdfUrl: "/cheat-sheets/micro/AP_Dojo_Micro_U1.pdf", subject: 'micro' },
    { number: 2, title: "Supply and Demand", pdfUrl: "/cheat-sheets/micro/AP_Dojo_Micro_U2.pdf", subject: 'micro' },
    { number: 3, title: "Production, Cost, and the Perfect Competition Model", pdfUrl: "/cheat-sheets/micro/AP_Dojo_Micro_U3.pdf", subject: 'micro' },
    { number: 4, title: "Imperfect Competition", pdfUrl: "/cheat-sheets/micro/AP_Dojo_Micro_U4.pdf", subject: 'micro' },
    { number: 5, title: "Factor Markets", pdfUrl: "/cheat-sheets/micro/AP_Dojo_Micro_U5.pdf", subject: 'micro' },
    { number: 6, title: "Market Failure and the Role of Government", pdfUrl: "/cheat-sheets/micro/AP_Dojo_Micro_U6.pdf", subject: 'micro' },
  ];
  