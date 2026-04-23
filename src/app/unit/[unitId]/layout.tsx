import type { Metadata } from 'next';

// Keyword-rich, "Director Level" titles for each unit — both subjects
const UNIT_META: Record<'macro' | 'micro', Record<number, { title: string; description: string; keywords: string[] }>> = {
  macro: {
    1: {
      title: 'FREE AP Macro Unit 1 Cheat Sheet: Scarcity, PPC & Comparative Advantage (2026)',
      description: 'Free AP Macroeconomics Unit 1 cheat sheet covering scarcity, opportunity cost, the Production Possibilities Curve (PPC), absolute vs. comparative advantage, and specialization. Key terms, graphs, and practice questions included.',
      keywords: ['AP Macro Unit 1', 'PPC cheat sheet', 'comparative advantage AP Macro', 'scarcity opportunity cost', 'AP Macroeconomics Unit 1 review 2026'],
    },
    2: {
      title: 'FREE AP Macro Unit 2 Cheat Sheet: GDP, Unemployment & Inflation (2026)',
      description: 'Free AP Macroeconomics Unit 2 cheat sheet covering GDP calculation, the business cycle, types of unemployment, the natural rate, CPI, and inflation. Key terms, formulas, and practice questions included.',
      keywords: ['AP Macro Unit 2', 'GDP cheat sheet', 'unemployment AP Macro', 'CPI inflation AP Macro', 'AP Macroeconomics Unit 2 review 2026'],
    },
    3: {
      title: 'FREE AP Macro Unit 3 Cheat Sheet: AD-AS Model & Fiscal Policy (2026)',
      description: 'Free AP Macroeconomics Unit 3 cheat sheet covering the Aggregate Demand–Aggregate Supply (AD-AS) model, fiscal policy, multiplier effect, and short-run vs. long-run equilibrium. Graphs and practice questions included.',
      keywords: ['AP Macro Unit 3', 'AD-AS model cheat sheet', 'fiscal policy AP Macro', 'multiplier effect AP Macro', 'AP Macroeconomics Unit 3 review 2026'],
    },
    4: {
      title: 'FREE AP Macro Unit 4 Cheat Sheet: Ample Reserves, Banking & Interest Rates (2026)',
      description: 'Free AP Macroeconomics Unit 4 cheat sheet covering the ample reserves framework, money creation, the loanable funds market, monetary policy, and real vs. nominal interest rates. Graphs and practice questions included.',
      keywords: ['AP Macro Unit 4', 'ample reserves AP Macro', 'loanable funds market cheat sheet', 'monetary policy AP Macro', 'AP Macroeconomics Unit 4 review 2026'],
    },
    5: {
      title: 'FREE AP Macro Unit 5 Cheat Sheet: Phillips Curve, Crowding Out & Long-Run Growth (2026)',
      description: 'Free AP Macroeconomics Unit 5 cheat sheet covering the Phillips Curve, crowding out, supply-side policies, and long-run economic growth. Key graphs, formulas, and practice questions included.',
      keywords: ['AP Macro Unit 5', 'Phillips Curve cheat sheet', 'crowding out AP Macro', 'long-run growth AP Macro', 'AP Macroeconomics Unit 5 review 2026'],
    },
    6: {
      title: 'FREE AP Macro Unit 6 Cheat Sheet: Exchange Rates, Current Account & Balance of Payments (2026)',
      description: 'Free AP Macroeconomics Unit 6 cheat sheet covering the foreign exchange market, exchange rate determination, current account vs. capital account, and the balance of payments. Graphs and practice questions included.',
      keywords: ['AP Macro Unit 6', 'exchange rates AP Macro', 'balance of payments cheat sheet', 'current account AP Macro', 'AP Macroeconomics Unit 6 review 2026'],
    },
  },
  micro: {
    1: {
      title: 'FREE AP Micro Unit 1 Cheat Sheet: Scarcity, PPC & Comparative Advantage (2026)',
      description: 'Free AP Microeconomics Unit 1 cheat sheet covering scarcity, trade-offs, the Production Possibilities Curve (PPC), comparative advantage, and specialization. Key terms, graphs, and practice questions included.',
      keywords: ['AP Micro Unit 1', 'PPC cheat sheet microeconomics', 'comparative advantage AP Micro', 'scarcity AP Micro', 'AP Microeconomics Unit 1 review 2026'],
    },
    2: {
      title: 'FREE AP Micro Unit 2 Cheat Sheet: Supply, Demand, Elasticity & Price Controls (2026)',
      description: 'Free AP Microeconomics Unit 2 cheat sheet covering the law of supply and demand, price elasticity, income elasticity, consumer and producer surplus, and price ceilings and floors. Graphs and practice questions included.',
      keywords: ['AP Micro Unit 2', 'supply and demand cheat sheet', 'price elasticity AP Micro', 'consumer surplus AP Micro', 'AP Microeconomics Unit 2 review 2026'],
    },
    3: {
      title: 'FREE AP Micro Unit 3 Cheat Sheet: Perfect Competition, Costs & Production (2026)',
      description: 'Free AP Microeconomics Unit 3 cheat sheet covering production costs, marginal cost, average total cost, profit maximization, and the perfectly competitive firm. Key graphs, formulas, and practice questions included.',
      keywords: ['AP Micro Unit 3', 'perfect competition cheat sheet', 'marginal cost AP Micro', 'profit maximization AP Micro', 'AP Microeconomics Unit 3 review 2026'],
    },
    4: {
      title: 'FREE AP Micro Unit 4 Cheat Sheet: Monopoly, Oligopoly & Monopolistic Competition (2026)',
      description: 'Free AP Microeconomics Unit 4 cheat sheet covering monopoly pricing, deadweight loss, oligopoly, game theory, and monopolistic competition. Graphs and practice questions included.',
      keywords: ['AP Micro Unit 4', 'monopoly cheat sheet', 'oligopoly AP Micro', 'monopolistic competition AP Micro', 'AP Microeconomics Unit 4 review 2026'],
    },
    5: {
      title: 'FREE AP Micro Unit 5 Cheat Sheet: Labor Markets, MRP & Factor Markets (2026)',
      description: 'Free AP Microeconomics Unit 5 cheat sheet covering marginal revenue product (MRP), factor demand, labor markets, wage determination, and the monopsony. Key graphs and practice questions included.',
      keywords: ['AP Micro Unit 5', 'factor markets cheat sheet', 'MRP AP Micro', 'labor market AP Micro', 'AP Microeconomics Unit 5 review 2026'],
    },
    6: {
      title: 'FREE AP Micro Unit 6 Cheat Sheet: Externalities, Public Goods & Government Intervention (2026)',
      description: 'Free AP Microeconomics Unit 6 cheat sheet covering positive and negative externalities, Pigouvian taxes, public goods, income inequality, and the role of government. Graphs and practice questions included.',
      keywords: ['AP Micro Unit 6', 'externalities cheat sheet', 'public goods AP Micro', 'government intervention AP Micro', 'AP Microeconomics Unit 6 review 2026'],
    },
  },
};

export async function generateMetadata({ params }: { params: Promise<{ unitId: string }> | { unitId: string } }): Promise<Metadata> {
  const resolvedParams = params instanceof Promise ? await params : params;
  const unitId = parseInt(resolvedParams.unitId, 10);
  
  if (isNaN(unitId) || unitId < 1 || unitId > 6) {
    return {
      title: 'Unit Not Found | AP Dojo',
      description: 'The requested unit could not be found.',
    };
  }
  
  // Default to macro (macro always resolves first on shared URL)
  const meta = UNIT_META.macro[unitId];
  
  return {
    title: `${meta.title} | AP Dojo`,
    description: meta.description,
    keywords: [...meta.keywords, 'AP Dojo', 'AP economics cheat sheet', 'free AP study materials', 'AP exam prep 2026'].join(', '),
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: 'website',
      url: `https://apdojo.com/unit/${unitId}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
    },
    alternates: {
      canonical: `https://apdojo.com/unit/${unitId}`,
    },
  };
}

export default function UnitLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}



