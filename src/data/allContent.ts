import scarcity_example from "../../public/images/scarcity_example.jpg"
import ppc_constant_opp_cost from "../../public/images/ppc_constant_opp_cost.jpg"
import ppc_constant_opp_cost_2 from "../../public/images/ppc_constant_opp_cost_2.jpg"
import ppc_increasing_opp_cost from "../../public/images/ppc_increasing_opp_cost.jpg"
import ppc_increasing_opp_cost_2 from "../../public/images/ppc_increasing _opp_cost_2.jpg"

// Define the interface for a whiteboard image
export interface WhiteboardImage {
  id: string; // Could be filename or a unique ID
  subject: 'ap_microeconomics' | 'ap_macroeconomics';
  unit: number;
  lessonIDs: string[];
  imageUrl: string; // The URL pointing to the image in S3
  title?: string; // Optional title/description
  // Potentially add upload date, creator, etc.
}

// Array of whiteboard image data
export const whiteboardImages: WhiteboardImage[] = [
  {
    id: '1',
    subject: 'ap_microeconomics',
    unit: 2,
    lessonIDs: ['2.8'],
    imageUrl: 'https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com/apmicro_unit2_pricefloor.jpg',
    title: 'Price Floors'
  },
  {
    id: '2',
    subject: 'ap_microeconomics',
    unit: 2,
    lessonIDs: ['2.9'],
    imageUrl: 'https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com/apmicro_unit2_tariffs.jpg',
    title: 'Tariffs'
  },
  {
    id: '3',
    subject: 'ap_microeconomics',
    unit: 3,
    lessonIDs: ['3.2'],
    imageUrl: 'https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com/apmicro_unit3_averageandmarginalcosts.jpg',
    title: 'Average and Marginal Costs'
  },
  {
    id: '4',
    subject: 'ap_microeconomics',
    unit: 3,
    lessonIDs: ['3.3'],
    imageUrl: 'https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com/apmicro_unit3_lrpc.jpg',
    title: 'Long Run Production Costs'
  },

  {
    id: '5',
    subject: 'ap_microeconomics',
    unit: 3,
    lessonIDs: ['3.1'],
    imageUrl: 'https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com/apmicro_unit3_marginalproductmarginalcost.jpg',
    title: 'Marginal Product and Marginal Cost'
  },
  {
    id: '6',
    subject: 'ap_microeconomics',
    unit: 2,
    lessonIDs: ['2.1'],
    imageUrl: 'https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com/apmicro_unit2_lawofdemand.jpg',
    title: 'Law of Demand'
  },
  {
    id: '7',
    subject: 'ap_microeconomics',
    unit: 2,
    lessonIDs: ['2.1'],
    imageUrl: 'https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com/apmicro_unit2_lawofsupply.jpg',
    title: 'Law of Supply'
  },

  {
    id: '8',
    subject: 'ap_microeconomics',
    unit: 2,
    lessonIDs: ['2.7'],
    imageUrl: 'https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com/apmicro_unit2_pricefloor.jpg',
    title: 'Price Floor'
  },
  {
    id: '9',
    subject: 'ap_microeconomics',
    unit: 2,
    lessonIDs: ['2.7'],
    imageUrl: 'https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com/apmicro_unit2_priceceiling.jpg',
    title: 'Price Ceiling'
  },
  {
    id: '10',
    subject: 'ap_microeconomics',
    unit: 2,
    lessonIDs: ['2.6'],
    imageUrl: 'https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com/apmicro_unit2_producersurplus.jpg',
    title: 'Producer Surplus'
  },
  {
    id: '11',
    subject: 'ap_microeconomics',
    unit: 2,
    lessonIDs: ['2.6'],
    imageUrl: 'https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com/apmicro_unit2_consumersurplus.jpg',
    title: 'Consumer Surplus'
  },

  {
    id: '12',
    subject: 'ap_microeconomics',
    unit: 2,
    lessonIDs: ['2.5'],
    imageUrl: 'https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com/apmicro_unit2_crosspriceelasticity.jpg',
    title: 'Cross Price Elasticity'
  },
  {
    id: '13',
    subject: 'ap_microeconomics',
    unit: 2,
    lessonIDs: ['2.3'],
    imageUrl: 'https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com/apmicro_unit2_demandelasticity.jpg',
    title: 'Demand Elasticity'
  },
  {
    id: '14',
    subject: 'ap_microeconomics',
    unit: 2,
    lessonIDs: ['2.5'],
    imageUrl: 'https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com/apmicro_unit2_incomeelasticity.jpg',
    title: 'Income Elasticity'
  },
  {
    id: '15',
    subject: 'ap_microeconomics',
    unit: 2,
    lessonIDs: ['2.6'],
    imageUrl: 'https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com/apmicro_unit2_totalsurplus.jpg',
    title: 'Total Surplus'
  },

  // ... more whiteboard objects can be added here
];

// --- Key Term Interface and Data --- 
export interface KeyTerm {
  id: string;
  term: string;
  definition: string;
  subject: 'ap_microeconomics' | 'ap_macroeconomics';
  unit: number;
  lessonIDs: string[];
}

export const keyTerms: KeyTerm[] = [
  // AP Microeconomics Unit 2 Key Terms
  {
    id: 'demand',
    term: 'Demand',
    definition: 'The relationship between the price of a good or service and the quantity consumers are willing and able to purchase at various prices during a specific time period, ceteris paribus.',
    subject: 'ap_microeconomics',
    unit: 2,
    lessonIDs: ['2.1']
  },
  {
    id: 'law-of-demand',
    term: 'Law of Demand',
    definition: 'The principle that, ceteris paribus, as the price of a good or service increases, the quantity demanded will decrease, and vice versa, resulting in a downward-sloping demand curve.',
    subject: 'ap_microeconomics',
    unit: 2,
    lessonIDs: ['2.1']
  },
   {
    id: 'determinants-of-demand',
    term: 'Determinants of Demand',
    definition: 'Factors other than price that shift the demand curve. These include: Tastes/Preferences, Income, Prices of Related Goods (Substitutes & Complements), Number of Buyers, and Expectations (TIPSE).',
    subject: 'ap_microeconomics',
    unit: 2,
    lessonIDs: ['2.1']
  },
  {
    id: 'normal-good',
    term: 'Normal Good',
    definition: 'A good for which demand increases as consumer income rises, and demand decreases as consumer income falls (positive income elasticity).',
    subject: 'ap_microeconomics',
    unit: 2,
    lessonIDs: ['2.1', '2.5']
  },
  {
    id: 'inferior-good',
    term: 'Inferior Good',
    definition: 'A good for which demand decreases as consumer income rises, and demand increases as consumer income falls (negative income elasticity).',
    subject: 'ap_microeconomics',
    unit: 2,
    lessonIDs: ['2.1', '2.5']
  },
  {
    id: 'substitutes',
    term: 'Substitutes',
    definition: 'Two goods for which an increase in the price of one leads to an increase in the demand for the other (positive cross-price elasticity).',
    subject: 'ap_microeconomics',
    unit: 2,
    lessonIDs: ['2.1', '2.5']
  },
  {
    id: 'complements',
    term: 'Complements',
    definition: 'Two goods for which an increase in the price of one leads to a decrease in the demand for the other (negative cross-price elasticity). Goods often consumed together.',
    subject: 'ap_microeconomics',
    unit: 2,
    lessonIDs: ['2.1', '2.5']
  },
  {
    id: 'supply',
    term: 'Supply',
    definition: 'The relationship between the price of a good or service and the quantity producers are willing and able to sell at various prices during a specific time period, ceteris paribus.',
    subject: 'ap_microeconomics',
    unit: 2,
    lessonIDs: ['2.2']
  },
  {
    id: 'law-of-supply',
    term: 'Law of Supply',
    definition: 'The principle that, ceteris paribus, as the price of a good or service increases, the quantity supplied will increase, and vice versa, resulting in an upward-sloping supply curve.',
    subject: 'ap_microeconomics',
    unit: 2,
    lessonIDs: ['2.2']
  },
  {
    id: 'determinants-of-supply',
    term: 'Determinants of Supply',
    definition: 'Factors other than price that shift the supply curve. These include: Resource/Input Prices, Technology, Prices of Other Goods (in production), Number of Sellers, Expectations, and Government Actions (Taxes/Subsidies).',
    subject: 'ap_microeconomics',
    unit: 2,
    lessonIDs: ['2.2']
  },
  {
    id: 'market-equilibrium',
    term: 'Market Equilibrium',
    definition: 'The state where the quantity demanded equals the quantity supplied at a specific price (the equilibrium price). The market clears, and there is no tendency for the price to change.',
    subject: 'ap_microeconomics',
    unit: 2,
    lessonIDs: ['2.6', '2.7']
  },
  {
    id: 'equilibrium-price',
    term: 'Equilibrium Price',
    definition: 'The price at which quantity demanded equals quantity supplied in a market. Also known as the market-clearing price (P* or Pe).',
    subject: 'ap_microeconomics',
    unit: 2,
    lessonIDs: ['2.6', '2.7']
  },
  {
    id: 'equilibrium-quantity',
    term: 'Equilibrium Quantity',
    definition: 'The quantity of a good or service bought and sold at the equilibrium price (Q* or Qe).',
    subject: 'ap_microeconomics',
    unit: 2,
    lessonIDs: ['2.6', '2.7']
  },
  {
    id: 'shortage',
    term: 'Shortage',
    definition: 'A situation where the quantity demanded ($Q_d$) exceeds the quantity supplied ($Q_s$) at the current price ($Q_d > Q_s$). Occurs when the price is below equilibrium.',
    subject: 'ap_microeconomics',
    unit: 2,
    lessonIDs: ['2.7', '2.8']
  },
  {
    id: 'surplus',
    term: 'Surplus',
    definition: 'A situation where the quantity supplied ($Q_s$) exceeds the quantity demanded ($Q_d$) at the current price ($Q_s > Q_d$). Occurs when the price is above equilibrium.',
    subject: 'ap_microeconomics',
    unit: 2,
    lessonIDs: ['2.7', '2.8']
  },
  {
    id: 'price-elasticity-of-demand',
    term: 'Price Elasticity of Demand (PED)',
    definition: 'A measure of how responsive the quantity demanded of a good is to a change in its price. Calculated as: $PED = \\frac{\% \\Delta Q_d}{\% \\Delta P}$.',
    subject: 'ap_microeconomics',
    unit: 2,
    lessonIDs: ['2.3']
  },
  {
    id: 'elastic-demand',
    term: 'Elastic Demand',
    definition: 'When the percentage change in quantity demanded is greater than the percentage change in price ($|PED| > 1$). Consumers are relatively responsive to price changes.',
    subject: 'ap_microeconomics',
    unit: 2,
    lessonIDs: ['2.3']
  },
  {
    id: 'inelastic-demand',
    term: 'Inelastic Demand',
    definition: 'When the percentage change in quantity demanded is less than the percentage change in price ($|PED| < 1$). Consumers are relatively unresponsive to price changes.',
    subject: 'ap_microeconomics',
    unit: 2,
    lessonIDs: ['2.3']
  },
  {
    id: 'unit-elastic-demand',
    term: 'Unit Elastic Demand',
    definition: 'When the percentage change in quantity demanded is equal to the percentage change in price ($|PED| = 1$).',
    subject: 'ap_microeconomics',
    unit: 2,
    lessonIDs: ['2.3']
  },
  {
    id: 'perfectly-inelastic-demand',
    term: 'Perfectly Inelastic Demand',
    definition: 'When the quantity demanded does not change regardless of the price ($PED = 0$). The demand curve is vertical.',
    subject: 'ap_microeconomics',
    unit: 2,
    lessonIDs: ['2.3']
  },
  {
    id: 'perfectly-elastic-demand',
    term: 'Perfectly Elastic Demand',
    definition: 'When any increase in price causes the quantity demanded to drop to zero ($|PED| = \\infty$). The demand curve is horizontal.',
    subject: 'ap_microeconomics',
    unit: 2,
    lessonIDs: ['2.3']
  },
   {
    id: 'total-revenue-test',
    term: 'Total Revenue Test',
    definition: 'A method to determine price elasticity of demand by examining how total revenue ($TR = P \\times Q$) changes when price changes. If P and TR move opposite, demand is elastic. If P and TR move together, demand is inelastic. If TR is constant, demand is unit elastic.',
    subject: 'ap_microeconomics',
    unit: 2,
    lessonIDs: ['2.3']
  },
  {
    id: 'price-elasticity-of-supply',
    term: 'Price Elasticity of Supply (PES)',
    definition: 'A measure of how responsive the quantity supplied of a good is to a change in its price. Calculated as: $PES = \\frac{\% \\Delta Q_s}{\% \\Delta P}$.',
    subject: 'ap_microeconomics',
    unit: 2,
    lessonIDs: ['2.4']
  },
   {
    id: 'elastic-supply',
    term: 'Elastic Supply',
    definition: 'When the percentage change in quantity supplied is greater than the percentage change in price ($PES > 1$). Producers are relatively responsive to price changes.',
    subject: 'ap_microeconomics',
    unit: 2,
    lessonIDs: ['2.4']
  },
  {
    id: 'inelastic-supply',
    term: 'Inelastic Supply',
    definition: 'When the percentage change in quantity supplied is less than the percentage change in price ($PES < 1$). Producers are relatively unresponsive to price changes.',
    subject: 'ap_microeconomics',
    unit: 2,
    lessonIDs: ['2.4']
  },
  {
    id: 'income-elasticity-of-demand',
    term: 'Income Elasticity of Demand (YED)',
    definition: 'A measure of how responsive the quantity demanded of a good is to a change in consumer income. Calculated as: $YED = \\frac{\% \\Delta Q_d}{\% \\Delta Income}$. Positive for normal goods, negative for inferior goods.',
    subject: 'ap_microeconomics',
    unit: 2,
    lessonIDs: ['2.5']
  },
  {
    id: 'cross-price-elasticity-of-demand',
    term: 'Cross-Price Elasticity of Demand (XED)',
    definition: 'A measure of how responsive the quantity demanded of one good is to a change in the price of another good. Calculated as: $XED = \\frac{\% \\Delta Q_{d, Good A}}{\% \\Delta P_{Good B}}$. Positive for substitutes, negative for complements, zero for unrelated goods.',
    subject: 'ap_microeconomics',
    unit: 2,
    lessonIDs: ['2.5']
  },
  {
    id: 'consumer-surplus',
    term: 'Consumer Surplus (CS)',
    definition: 'The difference between the maximum price consumers are willing to pay for a unit of a good and the price they actually pay (market price). Represented graphically by the area below the demand curve and above the market price.',
    subject: 'ap_microeconomics',
    unit: 2,
    lessonIDs: ['2.6']
  },
  {
    id: 'producer-surplus',
    term: 'Producer Surplus (PS)',
    definition: 'The difference between the price producers actually receive for a unit of a good (market price) and the minimum price they are willing to accept (marginal cost). Represented graphically by the area above the supply curve and below the market price.',
    subject: 'ap_microeconomics',
    unit: 2,
    lessonIDs: ['2.6']
  },
   {
    id: 'total-surplus',
    term: 'Total Surplus (TS)',
    definition: 'The sum of consumer surplus and producer surplus ($TS = CS + PS$). It represents the total welfare or benefit to society from market transactions and is maximized at market equilibrium.',
    subject: 'ap_microeconomics',
    unit: 2,
    lessonIDs: ['2.6', '2.8']
  },
  {
    id: 'price-ceiling',
    term: 'Price Ceiling',
    definition: 'A legally established maximum price that can be charged for a good or service. To be binding (effective), it must be set below the equilibrium price, typically leading to a shortage ($Q_d > Q_s$).',
    subject: 'ap_microeconomics',
    unit: 2,
    lessonIDs: ['2.8']
  },
  {
    id: 'price-floor',
    term: 'Price Floor',
    definition: 'A legally established minimum price that can be charged for a good or service. To be binding (effective), it must be set above the equilibrium price, typically leading to a surplus ($Q_s > Q_d$).',
    subject: 'ap_microeconomics',
    unit: 2,
    lessonIDs: ['2.8']
  },
  {
    id: 'excise-tax',
    term: 'Excise Tax',
    definition: 'A per-unit tax levied on the production or sale of a specific good or service. It shifts the supply curve upward (or demand curve downward), increases the price buyers pay, decreases the price sellers receive, reduces the equilibrium quantity, and creates deadweight loss.',
    subject: 'ap_microeconomics',
    unit: 2,
    lessonIDs: ['2.8']
  },
  {
    id: 'tax-incidence',
    term: 'Tax Incidence',
    definition: 'The distribution of the burden of a tax between buyers and sellers. The incidence depends on the relative price elasticities of demand and supply; the more inelastic side bears a larger share of the tax burden.',
    subject: 'ap_microeconomics',
    unit: 2,
    lessonIDs: ['2.8']
  },
   {
    id: 'subsidy',
    term: 'Subsidy',
    definition: 'A government payment to buyers or sellers, usually on a per-unit basis, intended to encourage production or consumption. It effectively lowers the cost for producers (shifting supply right) or the price for consumers (shifting demand right), increasing quantity and potentially creating deadweight loss if it pushes quantity beyond the efficient level.',
    subject: 'ap_microeconomics',
    unit: 2,
    lessonIDs: ['2.8']
  },
  {
    id: 'deadweight-loss',
    term: 'Deadweight Loss (DWL)',
    definition: 'The loss of total surplus (combined consumer and producer surplus) that results from a market distortion, such as a tax, price control, or externality, which prevents the market from reaching the efficient equilibrium quantity.',
    subject: 'ap_microeconomics',
    unit: 2,
    lessonIDs: ['2.8']
  },
   {
    id: 'quantity-control',
    term: 'Quantity Control (Quota)',
    definition: 'An upper limit set by the government on the quantity of a good that can be bought or sold. Leads to inefficiencies such as deadweight loss and incentives for illegal activities.',
    subject: 'ap_microeconomics',
    unit: 2,
    lessonIDs: ['2.8'] // Often discussed alongside price controls and taxes
  }
  // Add terms for other units here...
];

export const allContent = { 
    macroeconomics: { 
        
    }
    // You could potentially nest whiteboardImages here too, if preferred:
    // whiteboardImages: whiteboardImages 
}