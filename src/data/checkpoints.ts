export interface Checkpoint {
  lessonId: string;
  subject: 'ap_microeconomics' | 'ap_macroeconomics';
  unit: number;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

// AP Microeconomics Checkpoints
export const microCheckpoints: Checkpoint[] = [
  // Unit 1 Checkpoints
  {
    lessonId: '1.1',
    subject: 'ap_microeconomics',
    unit: 1,
    question: 'What is the fundamental economic problem that exists because resources are limited but wants are unlimited?',
    options: [
      'Opportunity cost',
      'Scarcity',
      'Trade-offs',
      'Factors of production'
    ],
    correctAnswer: 'B',
    explanation: 'Scarcity is the fundamental economic problem that forces individuals and societies to make choices. It exists because resources are limited but wants are unlimited.'
  },
  {
    lessonId: '1.2',
    subject: 'ap_microeconomics',
    unit: 1,
    question: 'What is the value of the next best alternative that must be given up when making a choice?',
    options: [
      'Explicit cost',
      'Opportunity cost',
      'Implicit cost',
      'Total cost'
    ],
    correctAnswer: 'B',
    explanation: 'Opportunity cost is the value of the next best alternative forgone when making a choice. It is a key concept in economic decision-making.'
  },
  {
    lessonId: '1.3',
    subject: 'ap_microeconomics',
    unit: 1,
    question: 'On a Production Possibilities Curve (PPC), points inside the curve represent:',
    options: [
      'Efficient production',
      'Inefficient production',
      'Unattainable production',
      'Maximum production'
    ],
    correctAnswer: 'B',
    explanation: 'Points inside the PPC represent inefficient production, meaning resources are not being used to their full potential. Points on the curve are efficient, and points outside are unattainable.'
  },
  {
    lessonId: '1.4',
    subject: 'ap_microeconomics',
    unit: 1,
    question: 'What determines what countries should specialize in for trade?',
    options: [
      'Absolute advantage',
      'Comparative advantage',
      'Terms of trade',
      'Production possibilities'
    ],
    correctAnswer: 'B',
    explanation: 'Comparative advantage, based on opportunity cost, determines what countries should specialize in. A country should produce the good for which it has the lower opportunity cost.'
  },
  {
    lessonId: '1.5',
    subject: 'ap_microeconomics',
    unit: 1,
    question: 'Cost-benefit analysis aims to maximize:',
    options: [
      'Total benefits',
      'Total costs',
      'Net benefits (Total Benefits - Total Costs)',
      'Marginal benefits'
    ],
    correctAnswer: 'C',
    explanation: 'Rational decision-making in cost-benefit analysis aims to maximize net benefits, which is the difference between total benefits and total costs.'
  },
  {
    lessonId: '1.6',
    subject: 'ap_microeconomics',
    unit: 1,
    question: 'According to marginal analysis, you should continue an activity as long as:',
    options: [
      'Marginal Benefit > Marginal Cost',
      'Marginal Benefit ≥ Marginal Cost',
      'Marginal Benefit < Marginal Cost',
      'Total Benefit > Total Cost'
    ],
    correctAnswer: 'B',
    explanation: 'The rule of marginal analysis states that you should continue an activity as long as Marginal Benefit (MB) ≥ Marginal Cost (MC). Stop when MB < MC.'
  },
  
  // Unit 2 Checkpoints (already exist, keeping them)
  {
    lessonId: '2.1',
    subject: 'ap_microeconomics',
    unit: 2,
    question: 'According to the law of demand, what happens to the quantity demanded when the price of a good increases?',
    options: [
      'Quantity demanded increases',
      'Quantity demanded decreases',
      'Quantity demanded remains unchanged',
      'Quantity demanded may increase or decrease depending on the good'
    ],
    correctAnswer: 'B',
    explanation: 'The law of demand states that as price increases, quantity demanded decreases (and vice versa). This inverse relationship is explained by the substitution effect and income effect.'
  },
  {
    lessonId: '2.2',
    subject: 'ap_microeconomics',
    unit: 2,
    question: 'According to the law of supply, what happens to the quantity supplied when the price of a good increases?',
    options: [
      'Quantity supplied increases',
      'Quantity supplied decreases',
      'Quantity supplied remains unchanged',
      'Quantity supplied may increase or decrease depending on the good'
    ],
    correctAnswer: 'A',
    explanation: 'The law of supply states that as price increases, quantity supplied increases (and vice versa). This direct relationship occurs due to profit motive and opportunity cost.'
  },
  {
    lessonId: '2.3',
    subject: 'ap_microeconomics',
    unit: 2,
    question: 'If the price elasticity of demand (PED) is 0.5, demand is:',
    options: [
      'Elastic',
      'Inelastic',
      'Unit elastic',
      'Perfectly elastic'
    ],
    correctAnswer: 'B',
    explanation: 'When |PED| < 1, demand is inelastic. This means consumers are relatively unresponsive to price changes. A price increase leads to a smaller decrease in quantity demanded.'
  },
  {
    lessonId: '2.4',
    subject: 'ap_microeconomics',
    unit: 2,
    question: 'If the price elasticity of supply (PES) is greater than 1, supply is:',
    options: [
      'Elastic',
      'Inelastic',
      'Unit elastic',
      'Perfectly inelastic'
    ],
    correctAnswer: 'A',
    explanation: 'When PES > 1, supply is elastic. This means producers are very responsive to price changes. A price increase leads to a larger increase in quantity supplied.'
  },
  {
    lessonId: '2.5',
    subject: 'ap_microeconomics',
    unit: 2,
    question: 'If the cross-price elasticity of demand between two goods is positive, the goods are:',
    options: [
      'Substitutes',
      'Complements',
      'Unrelated goods',
      'Normal goods'
    ],
    correctAnswer: 'A',
    explanation: 'A positive cross-price elasticity means that when the price of one good increases, the demand for the other good increases. This indicates the goods are substitutes (e.g., Coke and Pepsi).'
  },
  {
    lessonId: '2.6',
    subject: 'ap_microeconomics',
    unit: 2,
    question: 'Market equilibrium occurs where:',
    options: [
      'Quantity demanded equals quantity supplied',
      'Price is at its maximum',
      'Demand equals supply',
      'Consumer surplus equals producer surplus'
    ],
    correctAnswer: 'A',
    explanation: 'Market equilibrium occurs where the quantity demanded equals the quantity supplied at a specific price. This happens at the intersection of the demand and supply curves.'
  },
  {
    lessonId: '2.7',
    subject: 'ap_microeconomics',
    unit: 2,
    question: 'A shortage occurs when:',
    options: [
      'Quantity supplied exceeds quantity demanded',
      'Quantity demanded exceeds quantity supplied',
      'Price is at equilibrium',
      'Supply exceeds demand'
    ],
    correctAnswer: 'B',
    explanation: 'A shortage (also called excess demand) occurs when quantity demanded (Qd) exceeds quantity supplied (Qs) at the current price. This happens when price is below equilibrium.'
  },
  {
    lessonId: '2.8',
    subject: 'ap_microeconomics',
    unit: 2,
    question: 'A binding price ceiling must be set:',
    options: [
      'Above the equilibrium price',
      'Below the equilibrium price',
      'At the equilibrium price',
      'At any price level'
    ],
    correctAnswer: 'B',
    explanation: 'A price ceiling is a maximum price. To be binding (effective), it must be set below the equilibrium price. This creates a shortage (Qd > Qs) and reduces total surplus.'
  },
  {
    lessonId: '2.9',
    subject: 'ap_microeconomics',
    unit: 2,
    question: 'A tariff on imported goods will:',
    options: [
      'Increase the quantity imported',
      'Decrease the quantity imported',
      'Have no effect on quantity imported',
      'Eliminate all imports'
    ],
    correctAnswer: 'B',
    explanation: 'A tariff is a tax on imported goods that increases their price. This reduces the quantity imported because the higher price makes imports less attractive compared to domestic goods.'
  },
  
  // Unit 3 Checkpoints
  {
    lessonId: '3.1',
    subject: 'ap_microeconomics',
    unit: 3,
    question: 'The law of diminishing marginal returns states that as more units of a variable input are added to a fixed input:',
    options: [
      'Total product will decrease',
      'Marginal product will eventually decline',
      'Average product will always increase',
      'Fixed costs will decrease'
    ],
    correctAnswer: 'B',
    explanation: 'The law of diminishing marginal returns states that as more units of a variable input are added to a fixed input, the marginal product of the variable input will eventually decline. This occurs only in the short run.'
  },
  {
    lessonId: '3.2',
    subject: 'ap_microeconomics',
    unit: 3,
    question: 'Marginal Cost (MC) intersects Average Total Cost (ATC) at:',
    options: [
      'The maximum point of ATC',
      'The minimum point of ATC',
      'The point where ATC equals zero',
      'The point where MC equals zero'
    ],
    correctAnswer: 'B',
    explanation: 'The MC curve intersects the ATC curve at its minimum point. This is a key relationship in cost curves.'
  },
  {
    lessonId: '3.3',
    subject: 'ap_microeconomics',
    unit: 3,
    question: 'When long-run average total cost falls as output increases, the firm experiences:',
    options: [
      'Diseconomies of scale',
      'Economies of scale',
      'Constant returns to scale',
      'Diminishing marginal returns'
    ],
    correctAnswer: 'B',
    explanation: 'Economies of scale occur when long-run average total cost (LRATC) falls as output increases. This happens due to specialization and bulk purchasing.'
  },
  {
    lessonId: '3.4',
    subject: 'ap_microeconomics',
    unit: 3,
    question: 'Economic profit equals:',
    options: [
      'Total Revenue - Explicit Costs',
      'Total Revenue - Implicit Costs',
      'Total Revenue - (Explicit Costs + Implicit Costs)',
      'Total Revenue - Fixed Costs'
    ],
    correctAnswer: 'C',
    explanation: 'Economic profit equals Total Revenue minus both explicit costs and implicit costs (opportunity costs). Accounting profit only subtracts explicit costs.'
  },
  {
    lessonId: '3.5',
    subject: 'ap_microeconomics',
    unit: 3,
    question: 'A profit-maximizing firm produces where:',
    options: [
      'Total Revenue equals Total Cost',
      'Marginal Revenue equals Marginal Cost',
      'Average Revenue equals Average Cost',
      'Price equals Average Total Cost'
    ],
    correctAnswer: 'B',
    explanation: 'A profit-maximizing firm produces where Marginal Revenue (MR) equals Marginal Cost (MC). This is the fundamental rule for profit maximization.'
  },
  {
    lessonId: '3.6',
    subject: 'ap_microeconomics',
    unit: 3,
    question: 'In the short run, a firm should shut down if:',
    options: [
      'Price is less than Average Total Cost',
      'Price is less than Average Variable Cost',
      'Price is less than Marginal Cost',
      'Total Revenue is less than Total Cost'
    ],
    correctAnswer: 'B',
    explanation: 'In the short run, a firm should shut down if Price < Average Variable Cost (AVC). If Price ≥ AVC but < ATC, the firm should continue operating in the short run even if it incurs losses.'
  },
  {
    lessonId: '3.7',
    subject: 'ap_microeconomics',
    unit: 3,
    question: 'In perfect competition, the demand curve for an individual firm is:',
    options: [
      'Downward sloping',
      'Upward sloping',
      'Perfectly elastic (horizontal)',
      'Perfectly inelastic (vertical)'
    ],
    correctAnswer: 'C',
    explanation: 'In perfect competition, each firm is a price taker and faces a perfectly elastic (horizontal) demand curve at the market price. The firm can sell any quantity at the market price.'
  },
  
  // Unit 4 Checkpoints
  {
    lessonId: '4.1',
    subject: 'ap_microeconomics',
    unit: 4,
    question: 'Imperfectly competitive markets are characterized by:',
    options: [
      'Many firms and identical products',
      'Few firms or differentiated products',
      'Perfect information',
      'Free entry and exit'
    ],
    correctAnswer: 'B',
    explanation: 'Imperfectly competitive markets include monopoly, monopolistic competition, and oligopoly. They are characterized by few firms or differentiated products, unlike perfect competition.'
  },
  {
    lessonId: '4.2',
    subject: 'ap_microeconomics',
    unit: 4,
    question: 'A monopolist produces where:',
    options: [
      'Price equals Marginal Cost',
      'Marginal Revenue equals Marginal Cost',
      'Price equals Average Total Cost',
      'Total Revenue is maximized'
    ],
    correctAnswer: 'B',
    explanation: 'Like all profit-maximizing firms, a monopolist produces where MR = MC. However, because the monopolist faces a downward-sloping demand curve, Price > MR at the profit-maximizing quantity.'
  },
  {
    lessonId: '4.3',
    subject: 'ap_microeconomics',
    unit: 4,
    question: 'Price discrimination allows a monopolist to:',
    options: [
      'Charge the same price to all consumers',
      'Charge different prices to different consumers based on willingness to pay',
      'Increase consumer surplus',
      'Eliminate deadweight loss'
    ],
    correctAnswer: 'B',
    explanation: 'Price discrimination occurs when a firm charges different prices to different consumers based on their willingness to pay. This allows the firm to capture more consumer surplus.'
  },
  {
    lessonId: '4.4',
    subject: 'ap_microeconomics',
    unit: 4,
    question: 'Monopolistic competition is characterized by:',
    options: [
      'One firm with no close substitutes',
      'Many firms selling identical products',
      'Many firms selling differentiated products',
      'Few firms with significant barriers to entry'
    ],
    correctAnswer: 'C',
    explanation: 'Monopolistic competition has many firms selling differentiated products. Each firm has some market power due to product differentiation, but entry is relatively easy.'
  },
  {
    lessonId: '4.5',
    subject: 'ap_microeconomics',
    unit: 4,
    question: 'In game theory, a Nash equilibrium occurs when:',
    options: [
      'All players choose their dominant strategy',
      'No player can improve their outcome by unilaterally changing their strategy',
      'All players cooperate',
      'One player has a dominant strategy'
    ],
    correctAnswer: 'B',
    explanation: 'A Nash equilibrium occurs when no player can improve their outcome by unilaterally changing their strategy, given what the other players are doing.'
  },
  
  // Unit 5 Checkpoints
  {
    lessonId: '5.1',
    subject: 'ap_microeconomics',
    unit: 5,
    question: 'Factor markets involve the exchange of:',
    options: [
      'Final goods and services',
      'Resources (land, labor, capital)',
      'Consumer products',
      'Government services'
    ],
    correctAnswer: 'B',
    explanation: 'Factor markets are where resources (factors of production) like land, labor, and capital are bought and sold. Firms demand these resources to produce goods and services.'
  },
  {
    lessonId: '5.2',
    subject: 'ap_microeconomics',
    unit: 5,
    question: 'An increase in the demand for a product will:',
    options: [
      'Decrease the demand for the factors used to produce it',
      'Increase the demand for the factors used to produce it',
      'Have no effect on factor demand',
      'Only affect the supply of factors'
    ],
    correctAnswer: 'B',
    explanation: 'An increase in product demand increases the marginal revenue product (MRP) of factors, which increases the derived demand for those factors.'
  },
  {
    lessonId: '5.3',
    subject: 'ap_microeconomics',
    unit: 5,
    question: 'In a perfectly competitive factor market, a profit-maximizing firm hires labor until:',
    options: [
      'Wage equals Average Product',
      'Wage equals Marginal Revenue Product',
      'Wage equals Total Product',
      'Wage equals Average Revenue Product'
    ],
    correctAnswer: 'B',
    explanation: 'A profit-maximizing firm in a perfectly competitive factor market hires labor until the wage (factor price) equals the Marginal Revenue Product (MRP) of labor.'
  },
  {
    lessonId: '5.4',
    subject: 'ap_microeconomics',
    unit: 5,
    question: 'A monopsony is a market structure with:',
    options: [
      'Many buyers and many sellers',
      'One seller and many buyers',
      'One buyer and many sellers',
      'One buyer and one seller'
    ],
    correctAnswer: 'C',
    explanation: 'A monopsony is a market structure with a single buyer (monopsonist) and many sellers. In labor markets, this means one employer and many workers.'
  },
  
  // Unit 6 Checkpoints
  {
    lessonId: '6.1',
    subject: 'ap_microeconomics',
    unit: 6,
    question: 'A socially efficient market outcome occurs where:',
    options: [
      'Marginal Private Benefit equals Marginal Private Cost',
      'Marginal Social Benefit equals Marginal Social Cost',
      'Total Benefit equals Total Cost',
      'Average Benefit equals Average Cost'
    ],
    correctAnswer: 'B',
    explanation: 'Social efficiency occurs where Marginal Social Benefit (MSB) equals Marginal Social Cost (MSC). This maximizes total surplus and accounts for all costs and benefits, including externalities.'
  },
  {
    lessonId: '6.2',
    subject: 'ap_microeconomics',
    unit: 6,
    question: 'A negative externality occurs when:',
    options: [
      'The social cost is less than the private cost',
      'The social cost is greater than the private cost',
      'The social benefit equals the private benefit',
      'There is no external effect'
    ],
    correctAnswer: 'B',
    explanation: 'A negative externality occurs when the production or consumption of a good imposes costs on third parties, making Marginal Social Cost (MSC) > Marginal Private Cost (MPC).'
  },
  {
    lessonId: '6.3',
    subject: 'ap_microeconomics',
    unit: 6,
    question: 'Public goods are characterized by:',
    options: [
      'Rivalry and excludability',
      'Non-rivalry and excludability',
      'Rivalry and non-excludability',
      'Non-rivalry and non-excludability'
    ],
    correctAnswer: 'D',
    explanation: 'Public goods are non-rivalrous (one person\'s consumption doesn\'t reduce availability) and non-excludable (people cannot be prevented from using them). Examples include national defense and streetlights.'
  },
  {
    lessonId: '6.4',
    subject: 'ap_microeconomics',
    unit: 6,
    question: 'Government intervention in markets with externalities can:',
    options: [
      'Only create deadweight loss',
      'Correct market failures and improve efficiency',
      'Only benefit producers',
      'Never improve outcomes'
    ],
    correctAnswer: 'B',
    explanation: 'Government intervention through taxes, subsidies, or regulations can correct market failures caused by externalities, moving the market toward the socially efficient outcome.'
  },
  {
    lessonId: '6.5',
    subject: 'ap_microeconomics',
    unit: 6,
    question: 'Income inequality measures:',
    options: [
      'The distribution of wealth in an economy',
      'The distribution of income among individuals or households',
      'The total income in an economy',
      'The average income in an economy'
    ],
    correctAnswer: 'B',
    explanation: 'Income inequality measures how income is distributed among individuals or households in an economy. It shows the gap between high-income and low-income earners.'
  }
];

// AP Macroeconomics Checkpoints
export const macroCheckpoints: Checkpoint[] = [
  // Unit 1 Checkpoints
  {
    lessonId: '1.1',
    subject: 'ap_macroeconomics',
    unit: 1,
    question: 'What is the fundamental problem of economics where there are not enough resources to fulfill all wants and needs?',
    options: [
      'Opportunity cost',
      'Scarcity',
      'Trade-offs',
      'Factors of production'
    ],
    correctAnswer: 'B',
    explanation: 'Scarcity is the fundamental problem of economics. It forces individuals and societies to make choices because resources are limited but wants and needs are unlimited.'
  },
  {
    lessonId: '1.2',
    subject: 'ap_macroeconomics',
    unit: 1,
    question: 'On a Production Possibilities Curve (PPC), points on the curve represent:',
    options: [
      'Inefficient use of resources',
      'Efficient use of resources',
      'Unattainable production',
      'Economic growth'
    ],
    correctAnswer: 'B',
    explanation: 'Points on the PPC represent efficient use of resources, meaning all resources are being used to their full potential. Points inside are inefficient, and points outside are unattainable.'
  },
  {
    lessonId: '1.3',
    subject: 'ap_macroeconomics',
    unit: 1,
    question: 'What determines what countries should specialize in for mutually beneficial trade?',
    options: [
      'Absolute advantage',
      'Comparative advantage',
      'Terms of trade',
      'Production capacity'
    ],
    correctAnswer: 'B',
    explanation: 'Comparative advantage, based on opportunity cost, determines specialization. A country should produce the good for which it has the lower opportunity cost, even if it doesn\'t have an absolute advantage.'
  },
  {
    lessonId: '1.4',
    subject: 'ap_macroeconomics',
    unit: 1,
    question: 'According to the law of demand, there is:',
    options: [
      'A direct relationship between price and quantity demanded',
      'An inverse relationship between price and quantity demanded',
      'No relationship between price and quantity demanded',
      'A relationship that depends on the good'
    ],
    correctAnswer: 'B',
    explanation: 'The law of demand states there is an inverse relationship between price and quantity demanded. As price increases, quantity demanded decreases, and vice versa.'
  },
  {
    lessonId: '1.5',
    subject: 'ap_macroeconomics',
    unit: 1,
    question: 'According to the law of supply, there is:',
    options: [
      'A direct relationship between price and quantity supplied',
      'An inverse relationship between price and quantity supplied',
      'No relationship between price and quantity supplied',
      'A relationship that depends on the good'
    ],
    correctAnswer: 'A',
    explanation: 'The law of supply states there is a direct relationship between price and quantity supplied. As price increases, quantity supplied increases, and vice versa.'
  },
  {
    lessonId: '1.6',
    subject: 'ap_macroeconomics',
    unit: 1,
    question: 'A shortage occurs when:',
    options: [
      'Quantity supplied exceeds quantity demanded',
      'Quantity demanded exceeds quantity supplied',
      'Price is at equilibrium',
      'Supply equals demand'
    ],
    correctAnswer: 'B',
    explanation: 'A shortage (excess demand) occurs when quantity demanded exceeds quantity supplied at the current price. This happens when price is below the equilibrium price.'
  },
  
  // Unit 2 Checkpoints
  {
    lessonId: '2.1',
    subject: 'ap_macroeconomics',
    unit: 2,
    question: 'GDP measures:',
    options: [
      'The total income earned by all citizens',
      'The total value of all final goods and services produced within a country in a given time period',
      'The total wealth of a country',
      'The total exports of a country'
    ],
    correctAnswer: 'B',
    explanation: 'Gross Domestic Product (GDP) measures the total market value of all final goods and services produced within a country\'s borders in a specific time period.'
  },
  {
    lessonId: '2.2',
    subject: 'ap_macroeconomics',
    unit: 2,
    question: 'GDP does NOT include:',
    options: [
      'Final goods and services',
      'Intermediate goods',
      'Government spending',
      'Investment spending'
    ],
    correctAnswer: 'B',
    explanation: 'GDP only includes final goods and services to avoid double counting. Intermediate goods (goods used to produce other goods) are excluded.'
  },
  {
    lessonId: '2.3',
    subject: 'ap_macroeconomics',
    unit: 2,
    question: 'The unemployment rate is calculated as:',
    options: [
      'Unemployed / Total Population',
      'Unemployed / Labor Force',
      'Employed / Labor Force',
      'Labor Force / Total Population'
    ],
    correctAnswer: 'B',
    explanation: 'The unemployment rate = (Number of Unemployed / Labor Force) × 100. The labor force includes both employed and unemployed people actively seeking work.'
  },
  {
    lessonId: '2.4',
    subject: 'ap_macroeconomics',
    unit: 2,
    question: 'Inflation is measured by:',
    options: [
      'The Consumer Price Index (CPI)',
      'The unemployment rate',
      'Real GDP',
      'Nominal GDP'
    ],
    correctAnswer: 'A',
    explanation: 'Inflation is measured by price indices like the Consumer Price Index (CPI), which tracks changes in the price of a basket of goods and services over time.'
  },
  {
    lessonId: '2.5',
    subject: 'ap_macroeconomics',
    unit: 2,
    question: 'Unexpected inflation hurts:',
    options: [
      'Borrowers',
      'Lenders',
      'Both borrowers and lenders equally',
      'Neither borrowers nor lenders'
    ],
    correctAnswer: 'B',
    explanation: 'Unexpected inflation hurts lenders because they are repaid with dollars that have less purchasing power than expected. Borrowers benefit because they repay with less valuable dollars.'
  },
  {
    lessonId: '2.6',
    subject: 'ap_macroeconomics',
    unit: 2,
    question: 'Real GDP adjusts nominal GDP for:',
    options: [
      'Population changes',
      'Price level changes (inflation)',
      'Unemployment',
      'Interest rates'
    ],
    correctAnswer: 'B',
    explanation: 'Real GDP adjusts nominal GDP for changes in the price level (inflation), allowing economists to measure actual changes in output rather than changes due to price increases.'
  },
  {
    lessonId: '2.7',
    subject: 'ap_macroeconomics',
    unit: 2,
    question: 'A recession is typically defined as:',
    options: [
      'Two consecutive quarters of negative GDP growth',
      'High unemployment',
      'High inflation',
      'A decrease in the money supply'
    ],
    correctAnswer: 'A',
    explanation: 'A recession is typically defined as two consecutive quarters (six months) of negative real GDP growth, indicating a decline in economic activity.'
  },
  
  // Unit 3 Checkpoints
  {
    lessonId: '3.1',
    subject: 'ap_macroeconomics',
    unit: 3,
    question: 'Aggregate Demand (AD) shows the relationship between:',
    options: [
      'Price level and quantity of a single good demanded',
      'Price level and total quantity of all goods and services demanded',
      'Income and consumption',
      'Interest rates and investment'
    ],
    correctAnswer: 'B',
    explanation: 'Aggregate Demand shows the relationship between the price level and the total quantity of all goods and services demanded in an economy. It slopes downward due to the wealth effect, interest rate effect, and foreign trade effect.'
  },
  {
    lessonId: '3.2',
    subject: 'ap_macroeconomics',
    unit: 3,
    question: 'The spending multiplier is greater than 1 because:',
    options: [
      'Initial spending creates additional rounds of spending',
      'Government spending is always efficient',
      'Taxes reduce spending',
      'Consumers save all their income'
    ],
    correctAnswer: 'A',
    explanation: 'The spending multiplier is greater than 1 because initial spending (like government spending) creates income for others, who then spend part of that income, creating additional rounds of spending.'
  },
  {
    lessonId: '3.3',
    subject: 'ap_macroeconomics',
    unit: 3,
    question: 'Short-Run Aggregate Supply (SRAS) slopes upward because:',
    options: [
      'Higher prices increase profits, encouraging more production',
      'Higher prices decrease production',
      'Wages adjust immediately to price changes',
      'Resources are always fully employed'
    ],
    correctAnswer: 'A',
    explanation: 'SRAS slopes upward because when the price level rises, firms\' profits increase (if input costs don\'t rise immediately), encouraging them to produce more output.'
  },
  {
    lessonId: '3.4',
    subject: 'ap_macroeconomics',
    unit: 3,
    question: 'Long-Run Aggregate Supply (LRAS) is vertical because:',
    options: [
      'Prices are fixed in the long run',
      'In the long run, output is determined by available resources and technology, not price level',
      'The economy always operates at full employment',
      'Wages adjust immediately'
    ],
    correctAnswer: 'B',
    explanation: 'LRAS is vertical because in the long run, output is determined by the quantity and quality of resources and technology, not by the price level. All prices and wages adjust fully.'
  },
  {
    lessonId: '3.5',
    subject: 'ap_macroeconomics',
    unit: 3,
    question: 'Equilibrium in the AD-AS model occurs where:',
    options: [
      'AD intersects SRAS',
      'AD intersects LRAS',
      'SRAS intersects LRAS',
      'AD, SRAS, and LRAS all intersect at the same point'
    ],
    correctAnswer: 'A',
    explanation: 'Short-run equilibrium occurs where AD intersects SRAS. Long-run equilibrium occurs where AD, SRAS, and LRAS all intersect at the same point.'
  },
  {
    lessonId: '3.6',
    subject: 'ap_macroeconomics',
    unit: 3,
    question: 'An increase in government spending will shift:',
    options: [
      'AD to the right',
      'AD to the left',
      'SRAS to the right',
      'LRAS to the right'
    ],
    correctAnswer: 'A',
    explanation: 'An increase in government spending increases aggregate demand, shifting the AD curve to the right. This increases both price level and real GDP in the short run.'
  },
  {
    lessonId: '3.7',
    subject: 'ap_macroeconomics',
    unit: 3,
    question: 'Long-run self-adjustment occurs when:',
    options: [
      'The economy automatically returns to full employment through wage and price adjustments',
      'The government intervenes to restore equilibrium',
      'The central bank changes interest rates',
      'Exports increase'
    ],
    correctAnswer: 'A',
    explanation: 'Long-run self-adjustment is the automatic process where the economy returns to full employment (LRAS) through adjustments in wages and prices, without government intervention.'
  },
  {
    lessonId: '3.8',
    subject: 'ap_macroeconomics',
    unit: 3,
    question: 'Expansionary fiscal policy involves:',
    options: [
      'Increasing taxes and decreasing government spending',
      'Decreasing taxes and/or increasing government spending',
      'Increasing interest rates',
      'Decreasing the money supply'
    ],
    correctAnswer: 'B',
    explanation: 'Expansionary fiscal policy involves decreasing taxes and/or increasing government spending to stimulate aggregate demand and increase real GDP.'
  },
  {
    lessonId: '3.9',
    subject: 'ap_macroeconomics',
    unit: 3,
    question: 'Automatic stabilizers:',
    options: [
      'Require government action to take effect',
      'Automatically adjust to stabilize the economy without new legislation',
      'Only work during recessions',
      'Only work during expansions'
    ],
    correctAnswer: 'B',
    explanation: 'Automatic stabilizers (like progressive taxes and unemployment benefits) automatically adjust to stabilize the economy during business cycles without requiring new legislation.'
  },
  
  // Unit 4 Checkpoints
  {
    lessonId: '4.1',
    subject: 'ap_macroeconomics',
    unit: 4,
    question: 'Financial assets represent:',
    options: [
      'Physical goods',
      'Claims on future income or payments',
      'Current consumption',
      'Government services'
    ],
    correctAnswer: 'B',
    explanation: 'Financial assets (like stocks, bonds, and money) represent claims on future income or payments. They are not physical goods but rather financial instruments.'
  },
  {
    lessonId: '4.2',
    subject: 'ap_macroeconomics',
    unit: 4,
    question: 'The real interest rate equals:',
    options: [
      'Nominal interest rate + Inflation rate',
      'Nominal interest rate - Inflation rate',
      'Nominal interest rate × Inflation rate',
      'Nominal interest rate / Inflation rate'
    ],
    correctAnswer: 'B',
    explanation: 'Real interest rate = Nominal interest rate - Inflation rate. The real rate reflects the purchasing power of interest earned, adjusted for inflation.'
  },
  {
    lessonId: '4.3',
    subject: 'ap_macroeconomics',
    unit: 4,
    question: 'Money serves as:',
    options: [
      'Only a medium of exchange',
      'A medium of exchange, unit of account, and store of value',
      'Only a store of value',
      'Only a unit of account'
    ],
    correctAnswer: 'B',
    explanation: 'Money serves three functions: medium of exchange (used to buy goods), unit of account (measure of value), and store of value (holds value over time).'
  },
  {
    lessonId: '4.4',
    subject: 'ap_macroeconomics',
    unit: 4,
    question: 'Fractional reserve banking allows banks to:',
    options: [
      'Hold all deposits as reserves',
      'Lend out a portion of deposits, creating money',
      'Only lend government money',
      'Avoid holding any reserves'
    ],
    correctAnswer: 'B',
    explanation: 'Fractional reserve banking allows banks to hold only a fraction of deposits as reserves and lend out the rest. This lending process creates new money in the economy.'
  },
  {
    lessonId: '4.5',
    subject: 'ap_macroeconomics',
    unit: 4,
    question: 'In the money market, the demand for money is:',
    options: [
      'Positively related to interest rates',
      'Negatively related to interest rates',
      'Unrelated to interest rates',
      'Always constant'
    ],
    correctAnswer: 'B',
    explanation: 'The demand for money is negatively related to interest rates. Higher interest rates increase the opportunity cost of holding money, so people hold less money.'
  },
  {
    lessonId: '4.6',
    subject: 'ap_macroeconomics',
    unit: 4,
    question: 'Expansionary monetary policy involves:',
    options: [
      'Increasing the money supply to decrease interest rates',
      'Decreasing the money supply to increase interest rates',
      'Increasing taxes',
      'Decreasing government spending'
    ],
    correctAnswer: 'A',
    explanation: 'Expansionary monetary policy involves increasing the money supply, which decreases interest rates, encouraging borrowing and spending to stimulate the economy.'
  },
  {
    lessonId: '4.7',
    subject: 'ap_macroeconomics',
    unit: 4,
    question: 'In the loanable funds market, an increase in savings will:',
    options: [
      'Decrease the supply of loanable funds',
      'Increase the supply of loanable funds, decreasing interest rates',
      'Increase demand for loanable funds',
      'Have no effect on interest rates'
    ],
    correctAnswer: 'B',
    explanation: 'An increase in savings increases the supply of loanable funds, shifting the supply curve to the right, which decreases the equilibrium interest rate.'
  },
  
  // Unit 5 Checkpoints
  {
    lessonId: '5.1',
    subject: 'ap_macroeconomics',
    unit: 5,
    question: 'Both expansionary fiscal and monetary policy in the short run will:',
    options: [
      'Decrease real GDP and increase price level',
      'Increase real GDP and increase price level',
      'Increase real GDP and decrease price level',
      'Have no effect on real GDP or price level'
    ],
    correctAnswer: 'B',
    explanation: 'Both expansionary fiscal and monetary policy increase aggregate demand in the short run, leading to increases in both real GDP and the price level.'
  },
  {
    lessonId: '5.2',
    subject: 'ap_macroeconomics',
    unit: 5,
    question: 'The Phillips Curve shows the relationship between:',
    options: [
      'Inflation and GDP',
      'Inflation and unemployment',
      'Interest rates and investment',
      'Money supply and prices'
    ],
    correctAnswer: 'B',
    explanation: 'The Phillips Curve shows the inverse relationship between inflation and unemployment in the short run. Lower unemployment is associated with higher inflation.'
  },
  {
    lessonId: '5.3',
    subject: 'ap_macroeconomics',
    unit: 5,
    question: 'According to the quantity theory of money, an increase in the money supply will lead to:',
    options: [
      'No change in prices',
      'An increase in prices (inflation)',
      'A decrease in prices',
      'An increase in output only'
    ],
    correctAnswer: 'B',
    explanation: 'The quantity theory of money states that in the long run, an increase in the money supply leads to proportional increases in the price level (inflation), not increases in real output.'
  },
  {
    lessonId: '5.4',
    subject: 'ap_macroeconomics',
    unit: 5,
    question: 'Government budget deficits occur when:',
    options: [
      'Government spending equals tax revenue',
      'Government spending exceeds tax revenue',
      'Tax revenue exceeds government spending',
      'The national debt decreases'
    ],
    correctAnswer: 'B',
    explanation: 'A budget deficit occurs when government spending exceeds tax revenue in a given year. Budget surpluses occur when tax revenue exceeds spending.'
  },
  {
    lessonId: '5.5',
    subject: 'ap_macroeconomics',
    unit: 5,
    question: 'Crowding out occurs when:',
    options: [
      'Government spending increases private investment',
      'Government borrowing increases interest rates, reducing private investment',
      'Taxes decrease consumption',
      'Exports increase'
    ],
    correctAnswer: 'B',
    explanation: 'Crowding out occurs when government borrowing to finance deficits increases interest rates, which reduces private investment spending.'
  },
  {
    lessonId: '5.6',
    subject: 'ap_macroeconomics',
    unit: 5,
    question: 'Economic growth is shown by:',
    options: [
      'An increase in nominal GDP',
      'An increase in real GDP per capita',
      'An increase in the price level',
      'A decrease in unemployment only'
    ],
    correctAnswer: 'B',
    explanation: 'Economic growth is measured by increases in real GDP per capita, which reflects increases in the standard of living and productive capacity of an economy.'
  },
  {
    lessonId: '5.7',
    subject: 'ap_macroeconomics',
    unit: 5,
    question: 'Policies that promote economic growth include:',
    options: [
      'Increasing taxes on investment',
      'Investing in education and infrastructure',
      'Reducing research and development',
      'Limiting international trade'
    ],
    correctAnswer: 'B',
    explanation: 'Policies that promote economic growth include investing in human capital (education), physical capital (infrastructure), technology, and maintaining institutions that support growth.'
  },
  
  // Unit 6 Checkpoints
  {
    lessonId: '6.1',
    subject: 'ap_macroeconomics',
    unit: 6,
    question: 'The balance of payments accounts track:',
    options: [
      'Only exports and imports',
      'All international transactions between a country and the rest of the world',
      'Only financial flows',
      'Only trade in goods'
    ],
    correctAnswer: 'B',
    explanation: 'The balance of payments accounts track all international transactions, including trade in goods and services, financial flows, and transfers between a country and the rest of the world.'
  },
  {
    lessonId: '6.2',
    subject: 'ap_macroeconomics',
    unit: 6,
    question: 'An appreciation of a currency means:',
    options: [
      'The currency becomes less valuable relative to other currencies',
      'The currency becomes more valuable relative to other currencies',
      'The currency\'s value stays the same',
      'Inflation increases'
    ],
    correctAnswer: 'B',
    explanation: 'Currency appreciation occurs when a currency becomes more valuable relative to other currencies. It takes fewer units of the appreciating currency to buy one unit of another currency.'
  },
  {
    lessonId: '6.3',
    subject: 'ap_macroeconomics',
    unit: 6,
    question: 'In the foreign exchange market, an increase in demand for a currency will:',
    options: [
      'Decrease the exchange rate',
      'Increase the exchange rate (appreciate the currency)',
      'Have no effect on the exchange rate',
      'Only affect imports'
    ],
    correctAnswer: 'B',
    explanation: 'An increase in demand for a currency in the foreign exchange market increases its price (exchange rate), causing the currency to appreciate.'
  },
  {
    lessonId: '6.4',
    subject: 'ap_macroeconomics',
    unit: 6,
    question: 'An increase in a country\'s interest rates will typically:',
    options: [
      'Cause its currency to depreciate',
      'Cause its currency to appreciate',
      'Have no effect on the exchange rate',
      'Only affect domestic prices'
    ],
    correctAnswer: 'B',
    explanation: 'Higher interest rates attract foreign investment, increasing demand for the country\'s currency, which causes the currency to appreciate.'
  },
  {
    lessonId: '6.5',
    subject: 'ap_macroeconomics',
    unit: 6,
    question: 'When a country\'s currency appreciates, its net exports typically:',
    options: [
      'Increase',
      'Decrease',
      'Remain unchanged',
      'Become zero'
    ],
    correctAnswer: 'B',
    explanation: 'Currency appreciation makes exports more expensive for foreigners and imports cheaper for domestic consumers, leading to a decrease in net exports.'
  },
  {
    lessonId: '6.6',
    subject: 'ap_macroeconomics',
    unit: 6,
    question: 'Higher real interest rates in a country will:',
    options: [
      'Discourage capital inflows',
      'Encourage capital inflows',
      'Have no effect on capital flows',
      'Only affect domestic investment'
    ],
    correctAnswer: 'B',
    explanation: 'Higher real interest rates make a country\'s financial assets more attractive to foreign investors, encouraging capital inflows (money flowing into the country).'
  }
];

// Helper function to get checkpoint for a specific lesson
export function getCheckpointForLesson(
  lessonId: string,
  subject: 'ap_microeconomics' | 'ap_macroeconomics',
  unit: number
): Checkpoint | undefined {
  const checkpoints = subject === 'ap_microeconomics' ? microCheckpoints : macroCheckpoints;
  return checkpoints.find(cp => cp.lessonId === lessonId && cp.unit === unit && cp.subject === subject);
}
