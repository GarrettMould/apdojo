// --- Key Term Interface and Data --- 
export interface KeyTerm {
    id: string;
    term: string;
    definition: string;
    subject: 'ap_microeconomics' | 'ap_macroeconomics';
    unit: number;
    lessonIDs: string[];
    subNotes?: string[]; // Optional array of bullet point notes
    image?: {
      url: string;
      alt: string;
      caption?: string;
    }; // Optional image with URL, alt text, and optional caption
  }
export const keyTerms: KeyTerm[] = [
    // AP Microeconomics Unit 1 Key Terms
    {
      id: 'scarcity',
      term: 'Scarcity',
      definition: 'The fundamental economic problem that exists because there are limited resources and unlimited wants.',
      subject: 'ap_microeconomics',
      unit: 1,
      lessonIDs: ['1.1'],
      subNotes: [
        'The basic economic problem',
        'Forces individuals and societies to make choices',
        'Exists because resources are limited but wants are unlimited',
        'Applies to all economic decisions'
      ]
    },
    {
      id: 'opportunity-cost',
      term: 'Opportunity Cost',
      definition: 'The next best alternative that must be given up when making a choice.',
      subject: 'ap_microeconomics',
      unit: 1,
      lessonIDs: ['1.1', '1.2'],
      subNotes: [
        'The value of the next best alternative forgone',
        'Not just monetary cost, but all sacrificed alternatives',
        'Key concept in economic decision-making',
        'Helps evaluate the true cost of choices'
      ]
    },
    {
      id: 'factors-of-production',
      term: 'Factors of Production',
      definition: 'The resources used to produce goods and services: land, labor, capital, and entrepreneurship.',
      subject: 'ap_microeconomics',
      unit: 1,
      lessonIDs: ['1.1'],
      subNotes: [
        'Land: natural resources',
        'Labor: human effort and skills',
        'Capital: human-made resources',
        'Entrepreneurship: organizing and risk-taking'
      ]
    },
    {
      id: 'production-possibilities-curve',
      term: 'Production Possibilities Curve (PPC)',
      definition: 'A model that shows alternative ways an economy can use its scarce resources.',
      subject: 'ap_microeconomics',
      unit: 1,
      lessonIDs: ['1.2'],
      subNotes: [
        'Shows maximum possible combinations of two goods',
        'Points on the curve represent efficient production',
        'Points inside represent inefficient production',
        'Points outside are unattainable with current resources'
      ],
      image: {
        url: 'https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com/ppc_constant_opp_cost.jpg',
        alt: 'Production Possibilities Curve showing trade-offs between two goods'
      }
    },
    {
      id: 'comparative-advantage',
      term: 'Comparative Advantage',
      definition: 'When a country can produce a good at a lower opportunity cost than another country.',
      subject: 'ap_microeconomics',
      unit: 1,
      lessonIDs: ['1.3'],
      subNotes: [
        'Based on opportunity cost, not absolute advantage',
        'Determines what countries should specialize in',
        'Basis for mutually beneficial trade',
        'Allows countries to consume beyond their PPC'
      ]
    },
    {
      id: 'absolute-advantage',
      term: 'Absolute Advantage',
      definition: 'When a country can produce more of a good with the same resources as another country.',
      subject: 'ap_microeconomics',
      unit: 1,
      lessonIDs: ['1.3'],
      subNotes: [
        'Based on productivity, not opportunity cost',
        'Less important than comparative advantage for trade',
        'Measures efficiency in production',
        'Does not determine trade patterns'
      ]
    },
    {
      id: 'specialization',
      term: 'Specialization',
      definition: 'When individuals, businesses, or nations focus on producing a narrow range of products to maximize efficiency.',
      subject: 'ap_microeconomics',
      unit: 1,
      lessonIDs: ['1.3'],
      subNotes: [
        'Focusing on what you do best',
        'Increases productivity and efficiency',
        'Basis for trade and economic growth',
        'Allows for economies of scale'
      ]
    },
    {
      id: 'economic-systems',
      term: 'Economic Systems',
      definition: 'The method used by a society to produce and distribute goods and services.',
      subject: 'ap_microeconomics',
      unit: 1,
      lessonIDs: ['1.1'],
      subNotes: [
        'Traditional: based on customs and traditions',
        'Command: government controls production',
        'Market: individuals make economic decisions',
        'Mixed: combination of market and government'
      ]
    },
    {
      id: 'free-market-economy',
      term: 'Free Market Economy',
      definition: 'An economic system where individuals own resources and make economic decisions with minimal government involvement.',
      subject: 'ap_microeconomics',
      unit: 1,
      lessonIDs: ['1.1'],
      subNotes: [
        'Private ownership of resources',
        'Decisions made by individuals and firms',
        'Prices determined by supply and demand',
        'Limited government intervention'
      ]
    },
    {
      id: 'invisible-hand',
      term: 'Invisible Hand',
      definition: 'The concept that self-interest and competition guide free markets to efficiently allocate resources (coined by Adam Smith).',
      subject: 'ap_microeconomics',
      unit: 1,
      lessonIDs: ['1.1'],
      subNotes: [
        'Self-interest promotes social welfare',
        'Competition ensures efficiency',
        'No central planning needed',
        'Foundation of market economics'
      ]
    },
  






  
    // AP Microeconomics Unit 2 Key Terms
    {
      id: 'demand',
      term: 'Demand',
      definition: 'The relationship between the price of a good or service and the quantity consumers are willing and able to purchase at various prices during a specific time period, ceteris paribus.',
      subject: 'ap_microeconomics',
      unit: 2,
      lessonIDs: ['2.1'],
      subNotes: [
        'Demand is a schedule showing quantities at various prices',
        'Demand represents willingness AND ability to pay',
        'Demand is always downward sloping (Law of Demand)',
        'Demand can shift due to non-price factors'
      ]
    },
    {
      id: 'law-of-demand',
      term: 'Law of Demand',
      definition: 'The principle that, ceteris paribus, as the price of a good or service increases, the quantity demanded will decrease, and vice versa, resulting in a downward-sloping demand curve.',
      subject: 'ap_microeconomics',
      unit: 2,
      lessonIDs: ['2.1'],
      subNotes: [
        'Price and quantity demanded have an inverse relationship',
        'The demand curve always slopes downward from left to right',
        'This relationship holds true for most goods and services',
        'Exceptions include Giffen goods and Veblen goods'
      ],
      image: {
        url: 'https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com/apmicro_unit2_lawofdemand.jpg',
        alt: 'Demand curve showing inverse relationship between price and quantity'
      }
    },
     {
      id: 'determinants-of-demand',
      term: 'Determinants of Demand',
      definition: 'Factors other than price that shift the demand curve. These include: Tastes/Preferences, Income, Prices of Related Goods (Substitutes & Complements), Number of Buyers, and Expectations (TIPSE).',
      subject: 'ap_microeconomics',
      unit: 2,
      lessonIDs: ['2.1'],
      subNotes: [
        'Tastes/Preferences: Changes in consumer preferences can shift demand',
        'Income: Higher income typically increases demand for normal goods',
        'Prices of Related Goods: Substitutes and complements affect demand',
        'Number of Buyers: More buyers in the market increases demand',
        'Expectations: Future price expectations can affect current demand'
      ]
    },
    {
      id: 'normal-good',
      term: 'Normal Good',
      definition: 'A good for which demand increases as consumer income rises, and demand decreases as consumer income falls (positive income elasticity).',
      subject: 'ap_microeconomics',
      unit: 2,
      lessonIDs: ['2.1', '2.5'],
      subNotes: [
        'Examples include most goods: cars, electronics, clothing',
        'Has positive income elasticity of demand',
        'Demand curve shifts right when income increases',
        'Demand curve shifts left when income decreases'
      ]
    },
    {
      id: 'inferior-good',
      term: 'Inferior Good',
      definition: 'A good for which demand decreases as consumer income rises, and demand increases as consumer income falls (negative income elasticity).',
      subject: 'ap_microeconomics',
      unit: 2,
      lessonIDs: ['2.1', '2.5'],
      subNotes: [
        'Examples include ramen noodles, used cars, public transportation',
        'Has negative income elasticity of demand',
        'Demand curve shifts left when income increases',
        'Demand curve shifts right when income decreases'
      ]
    },
    {
      id: 'substitutes',
      term: 'Substitutes',
      definition: 'Two goods for which an increase in the price of one leads to an increase in the demand for the other (positive cross-price elasticity).',
      subject: 'ap_microeconomics',
      unit: 2,
      lessonIDs: ['2.1', '2.5'],
      subNotes: [
        'Examples: Coke and Pepsi, butter and margarine',
        'Have positive cross-price elasticity of demand',
        'Price increase of one shifts demand for the other right',
        'Consumers can easily switch between them'
      ]
    },
    {
      id: 'complements',
      term: 'Complements',
      definition: 'Two goods for which an increase in the price of one leads to a decrease in the demand for the other (negative cross-price elasticity). Goods often consumed together.',
      subject: 'ap_microeconomics',
      unit: 2,
      lessonIDs: ['2.1', '2.5'],
      subNotes: [
        'Examples: peanut butter and jelly, cars and gasoline',
        'Have negative cross-price elasticity of demand',
        'Price increase of one shifts demand for the other left',
        'Goods are consumed together as a bundle'
      ]
    },
    {
      id: 'supply',
      term: 'Supply',
      definition: 'The relationship between the price of a good or service and the quantity producers are willing and able to sell at various prices during a specific time period, ceteris paribus.',
      subject: 'ap_microeconomics',
      unit: 2,
      lessonIDs: ['2.2'],
      image: {
        url: 'https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com/apmicro_unit2_lawofsupply.jpg',
        alt: 'Supply curve showing direct relationship between price and quantity'
      }
    },
    {
      id: 'law-of-supply',
      term: 'Law of Supply',
      definition: 'The principle that, ceteris paribus, as the price of a good or service increases, the quantity supplied will increase, and vice versa, resulting in an upward-sloping supply curve.',
      subject: 'ap_microeconomics',
      unit: 2,
      lessonIDs: ['2.2'],
      subNotes: [
        'Price and quantity supplied have a direct relationship',
        'The supply curve always slopes upward from left to right',
        'Higher prices provide incentive for producers to supply more',
        'This relationship holds true for most goods and services'
      ]
    },
    {
      id: 'determinants-of-supply',
      term: 'Determinants of Supply',
      definition: 'Factors other than price that shift the supply curve. These include: Resource/Input Prices, Technology, Prices of Other Goods (in production), Number of Sellers, Expectations, and Government Actions (Taxes/Subsidies).',
      subject: 'ap_microeconomics',
      unit: 2,
      lessonIDs: ['2.2'],
      subNotes: [
        'Resource Prices: Higher input costs shift supply left',
        'Technology: Better technology shifts supply right',
        'Number of Sellers: More sellers shifts supply right',
        'Government Actions: Taxes shift supply left, subsidies shift right'
      ]
    },
    {
      id: 'resource-input-prices',
      term: 'Resource/Input Prices',
      definition: 'The cost of factors of production (land, labor, capital, entrepreneurship) used to produce goods and services. Changes in these costs shift the supply curve.',
      subject: 'ap_microeconomics',
      unit: 2,
      lessonIDs: ['2.2'],
      subNotes: [
        'Higher input costs shift supply curve left (decrease supply)',
        'Lower input costs shift supply curve right (increase supply)',
        'Examples: wages, raw materials, energy costs, rent',
        'Directly affects production costs and profitability'
      ]
    },
    {
      id: 'technology',
      term: 'Technology',
      definition: 'The methods, processes, and techniques used to produce goods and services. Improvements in technology can increase productivity and shift the supply curve.',
      subject: 'ap_microeconomics',
      unit: 2,
      lessonIDs: ['2.2'],
      subNotes: [
        'Better technology shifts supply curve right (increase supply)',
        'Increases productivity and reduces production costs',
        'Examples: automation, new machinery, improved processes',
        'Allows more output with same or fewer inputs'
      ]
    },
    {
      id: 'prices-of-other-goods',
      term: 'Prices of Other Goods',
      definition: 'The prices of alternative goods that producers could produce instead. Changes in these prices can affect the supply of the current good.',
      subject: 'ap_microeconomics',
      unit: 2,
      lessonIDs: ['2.2'],
      subNotes: [
        'Higher prices of alternatives shift supply left (decrease supply)',
        'Lower prices of alternatives shift supply right (increase supply)',
        'Producers switch to more profitable alternatives',
        'Examples: corn vs. soybeans, beef vs. chicken'
      ]
    },
    {
      id: 'number-of-sellers',
      term: 'Number of Sellers',
      definition: 'The quantity of firms or producers in a market. Changes in the number of sellers directly affect the total supply in the market.',
      subject: 'ap_microeconomics',
      unit: 2,
      lessonIDs: ['2.2'],
      subNotes: [
        'More sellers shift supply curve right (increase supply)',
        'Fewer sellers shift supply curve left (decrease supply)',
        'Each seller contributes to total market supply',
        'Examples: new firms entering, existing firms exiting'
      ]
    },
    {
      id: 'expectations',
      term: 'Expectations',
      definition: 'Producers\' beliefs about future market conditions, including prices, costs, and demand. These expectations can influence current supply decisions.',
      subject: 'ap_microeconomics',
      unit: 2,
      lessonIDs: ['2.2'],
      subNotes: [
        'Expected higher future prices shift supply left (decrease current supply)',
        'Expected lower future prices shift supply right (increase current supply)',
        'Producers may hold inventory or rush to sell',
        'Examples: seasonal expectations, economic forecasts'
      ]
    },
    {
      id: 'government-actions',
      term: 'Government Actions',
      definition: 'Policies and regulations implemented by government that affect production costs or incentives, including taxes, subsidies, regulations, and trade policies.',
      subject: 'ap_microeconomics',
      unit: 2,
      lessonIDs: ['2.2'],
      subNotes: [
        'Taxes shift supply curve left (decrease supply)',
        'Subsidies shift supply curve right (increase supply)',
        'Regulations can increase costs and decrease supply',
        'Examples: excise taxes, production subsidies, environmental regulations'
      ]
    },
    {
      id: 'market-equilibrium',
      term: 'Market Equilibrium',
      definition: 'The state where the quantity demanded equals the quantity supplied at a specific price (the equilibrium price). The market clears, and there is no tendency for the price to change.',
      subject: 'ap_microeconomics',
      unit: 2,
      lessonIDs: ['2.6', '2.7'],
      subNotes: [
        'Occurs where demand and supply curves intersect',
        'No shortage or surplus at equilibrium',
        'Market automatically moves toward equilibrium',
        'Efficient allocation of resources occurs here'
      ]
    },
    {
      id: 'equilibrium-price',
      term: 'Equilibrium Price',
      definition: 'The price at which quantity demanded equals quantity supplied in a market. Also known as the market-clearing price (P* or Pe).',
      subject: 'ap_microeconomics',
      unit: 2,
      lessonIDs: ['2.6', '2.7'],
      subNotes: [
        'Also called market-clearing price',
        'Eliminates both shortage and surplus',
        'Determined by intersection of D and S curves',
        'Can change when curves shift'
      ]
    },
    {
      id: 'equilibrium-quantity',
      term: 'Equilibrium Quantity',
      definition: 'The quantity of a good or service bought and sold at the equilibrium price (Q* or Qe).',
      subject: 'ap_microeconomics',
      unit: 2,
      lessonIDs: ['2.6', '2.7'],
      subNotes: [
        'Also called market-clearing quantity',
        'Maximizes total surplus in the market',
        'All willing buyers and sellers are satisfied',
        'No excess demand or supply exists'
      ]
    },
    {
      id: 'shortage',
      term: 'Shortage',
      definition: 'A situation where the quantity demanded (Qd) exceeds the quantity supplied (Qs) at the current price (Qd > Qs). Occurs when the price is below equilibrium.',
      subject: 'ap_microeconomics',
      unit: 2,
      lessonIDs: ['2.7', '2.8'],
      subNotes: [
        'Also called excess demand',
        'Creates upward pressure on price',
        'Some consumers cannot buy the good',
        'Market will adjust toward equilibrium'
      ]
    },
    {
      id: 'surplus',
      term: 'Surplus',
      definition: 'A situation where the quantity supplied (Qs) exceeds the quantity demanded (Qd) at the current price (Qs > Qd). Occurs when the price is above equilibrium.',
      subject: 'ap_microeconomics',
      unit: 2,
      lessonIDs: ['2.7', '2.8'],
      subNotes: [
        'Also called excess supply',
        'Creates downward pressure on price',
        'Some producers cannot sell their goods',
        'Market will adjust toward equilibrium'
      ]
    },
    {
      id: 'price-elasticity-of-demand',
      term: 'Price Elasticity of Demand (PED)',
      definition: 'A measure of how responsive the quantity demanded of a good is to a change in its price. Calculated as: PED = (% change in Qd) / (% change in P).',
      subject: 'ap_microeconomics',
      unit: 2,
      lessonIDs: ['2.3'],
      image: {
        url: 'https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com/apmicro_unit2_demandelasticity.jpg',
        alt: 'Demand elasticity diagram showing different elasticity ranges'
      }
    },
    {
      id: 'elastic-demand',
      term: 'Elastic Demand',
      definition: 'When the percentage change in quantity demanded is greater than the percentage change in price (|PED| > 1). Consumers are relatively responsive to price changes.',
      subject: 'ap_microeconomics',
      unit: 2,
      lessonIDs: ['2.3'],
      subNotes: [
        '|PED| > 1 (absolute value greater than 1)',
        'Consumers are very responsive to price changes',
        'Examples: luxury goods, goods with many substitutes',
        'Price increase leads to larger decrease in quantity demanded'
      ]
    },
    {
      id: 'inelastic-demand',
      term: 'Inelastic Demand',
      definition: 'When the percentage change in quantity demanded is less than the percentage change in price (|PED| < 1). Consumers are relatively unresponsive to price changes.',
      subject: 'ap_microeconomics',
      unit: 2,
      lessonIDs: ['2.3'],
      subNotes: [
        '|PED| < 1 (absolute value less than 1)',
        'Consumers are not very responsive to price changes',
        'Examples: necessities, goods with few substitutes',
        'Price increase leads to smaller decrease in quantity demanded'
      ]
    },
    {
      id: 'unit-elastic-demand',
      term: 'Unit Elastic Demand',
      definition: 'When the percentage change in quantity demanded is equal to the percentage change in price (|PED| = 1).',
      subject: 'ap_microeconomics',
      unit: 2,
      lessonIDs: ['2.3'],
      subNotes: [
        '|PED| = 1 (absolute value equals 1)',
        'Percentage change in Qd equals percentage change in P',
        'Total revenue remains constant when price changes',
        'Rare in practice but important theoretical concept'
      ]
    },
    {
      id: 'perfectly-inelastic-demand',
      term: 'Perfectly Inelastic Demand',
      definition: 'When the quantity demanded does not change regardless of the price (PED = 0). The demand curve is vertical.',
      subject: 'ap_microeconomics',
      unit: 2,
      lessonIDs: ['2.3'],
      subNotes: [
        'PED = 0 (no change in quantity when price changes)',
        'Demand curve is perfectly vertical',
        'Examples: life-saving medications, essential goods',
        'Consumers will pay any price for the good'
      ]
    },
    {
      id: 'perfectly-elastic-demand',
      term: 'Perfectly Elastic Demand',
      definition: 'When any increase in price causes the quantity demanded to drop to zero (|PED| = ∞). The demand curve is horizontal.',
      subject: 'ap_microeconomics',
      unit: 2,
      lessonIDs: ['2.3'],
      subNotes: [
        '|PED| = ∞ (infinite elasticity)',
        'Demand curve is perfectly horizontal',
        'Examples: perfectly competitive markets, identical goods',
        'Any price increase causes quantity demanded to fall to zero'
      ]
    },
     {
      id: 'total-revenue-test',
      term: 'Total Revenue Test',
      definition: 'A method to determine price elasticity of demand by examining how total revenue (TR = P × Q) changes when price changes. If P and TR move opposite, demand is elastic. If P and TR move together, demand is inelastic. If TR is constant, demand is unit elastic.',
      subject: 'ap_microeconomics',
      unit: 2,
      lessonIDs: ['2.3'],
      subNotes: [
        'P and TR move in opposite directions = elastic demand',
        'P and TR move in same direction = inelastic demand',
        'TR stays constant = unit elastic demand',
        'Useful when elasticity formula is not available'
      ]
    },
    {
      id: 'price-elasticity-of-supply',
      term: 'Price Elasticity of Supply (PES)',
      definition: 'A measure of how responsive the quantity supplied of a good is to a change in its price. Calculated as: PES = (% change in Qs) / (% change in P).',
      subject: 'ap_microeconomics',
      unit: 2,
      lessonIDs: ['2.4'],
      subNotes: [
        'Measures producer responsiveness to price changes',
        'PES = %ΔQs / %ΔP (no absolute value needed)',
        'Always positive due to Law of Supply',
        'Depends on time period and production flexibility'
      ]
    },
     {
      id: 'elastic-supply',
      term: 'Elastic Supply',
      definition: 'When the percentage change in quantity supplied is greater than the percentage change in price (PES > 1). Producers are relatively responsive to price changes.',
      subject: 'ap_microeconomics',
      unit: 2,
      lessonIDs: ['2.4'],
      subNotes: [
        'PES > 1 (greater than 1)',
        'Producers are very responsive to price changes',
        'Examples: goods with flexible production, long time periods',
        'Price increase leads to larger increase in quantity supplied'
      ]
    },
    {
      id: 'inelastic-supply',
      term: 'Inelastic Supply',
      definition: 'When the percentage change in quantity supplied is less than the percentage change in price (PES < 1). Producers are relatively unresponsive to price changes.',
      subject: 'ap_microeconomics',
      unit: 2,
      lessonIDs: ['2.4'],
      subNotes: [
        'PES < 1 (less than 1)',
        'Producers are not very responsive to price changes',
        'Examples: goods with fixed production, short time periods',
        'Price increase leads to smaller increase in quantity supplied'
      ]
    },
    {
      id: 'income-elasticity-of-demand',
      term: 'Income Elasticity of Demand (YED)',
      definition: 'A measure of how responsive the quantity demanded of a good is to a change in consumer income. Calculated as: YED = (% change in Qd) / (% change in Income). Positive for normal goods, negative for inferior goods.',
      subject: 'ap_microeconomics',
      unit: 2,
      lessonIDs: ['2.5'],
      image: {
        url: 'https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com/apmicro_unit2_incomeelasticity.jpg',
        alt: 'Income elasticity diagram showing normal vs inferior goods'
      }
    },
    {
      id: 'cross-price-elasticity-of-demand',
      term: 'Cross-Price Elasticity of Demand (XED)',
      definition: 'A measure of how responsive the quantity demanded of one good is to a change in the price of another good. Calculated as: XED = (% change in Qd of Good A) / (% change in P of Good B). Positive for substitutes, negative for complements, zero for unrelated goods.',
      subject: 'ap_microeconomics',
      unit: 2,
      lessonIDs: ['2.5'],
      image: {
        url: 'https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com/apmicro_unit2_crosspriceelasticity.jpg',
        alt: 'Cross price elasticity diagram showing relationship between goods'
      }
    },
    {
      id: 'consumer-surplus',
      term: 'Consumer Surplus (CS)',
      definition: 'The difference between the maximum price consumers are willing to pay for a unit of a good and the price they actually pay (market price). Represented graphically by the area below the demand curve and above the market price.',
      subject: 'ap_microeconomics',
      unit: 2,
      lessonIDs: ['2.6'],
      subNotes: [
        'Area below demand curve and above market price',
        'Measures consumer benefit from market transactions',
        'Increases when price decreases',
        'Decreases when price increases'
      ],
      image: {
        url: 'https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com/apmicro_unit2_consumersurplus.jpg',
        alt: 'Consumer surplus diagram showing area below demand curve and above price'
      }
    },
    {
      id: 'producer-surplus',
      term: 'Producer Surplus (PS)',
      definition: 'The difference between the price producers actually receive for a unit of a good (market price) and the minimum price they are willing to accept (marginal cost). Represented graphically by the area above the supply curve and below the market price.',
      subject: 'ap_microeconomics',
      unit: 2,
      lessonIDs: ['2.6'],
      subNotes: [
        'Area above supply curve and below market price',
        'Measures producer benefit from market transactions',
        'Increases when price increases',
        'Decreases when price decreases'
      ],
      image: {
        url: 'https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com/apmicro_unit2_producersurplus.jpg',
        alt: 'Producer surplus diagram showing area above supply curve and below price'
      }
    },
     {
      id: 'total-surplus',
      term: 'Total Surplus (TS)',
      definition: 'The sum of consumer surplus and producer surplus (TS = CS + PS). It represents the total welfare or benefit to society from market transactions and is maximized at market equilibrium.',
      subject: 'ap_microeconomics',
      unit: 2,
      lessonIDs: ['2.6', '2.8'],
      subNotes: [
        'TS = CS + PS (sum of both surpluses)',
        'Maximized at market equilibrium',
        'Measures total welfare to society',
        'Any market distortion reduces total surplus'
      ],
      image: {
        url: 'https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com/apmicro_unit2_totalsurplus.jpg',
        alt: 'Total surplus diagram showing combined consumer and producer surplus'
      }
    },
    {
      id: 'price-ceiling',
      term: 'Price Ceiling',
      definition: 'A legally established maximum price that can be charged for a good or service. To be binding (effective), it must be set below the equilibrium price, typically leading to a shortage (Qd > Qs).',
      subject: 'ap_microeconomics',
      unit: 2,
      lessonIDs: ['2.8'],
      subNotes: [
        'Must be below equilibrium price to be binding',
        'Creates shortage (excess demand)',
        'Examples: rent controls, price caps on utilities',
        'Reduces total surplus and creates deadweight loss'
      ],
      image: {
        url: 'https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com/apmicro_unit2_priceceiling.jpg',
        alt: 'Price ceiling diagram showing maximum price and resulting shortage'
      }
    },
    {
      id: 'price-floor',
      term: 'Price Floor',
      definition: 'A legally established minimum price that can be charged for a good or service. To be binding (effective), it must be set above the equilibrium price, typically leading to a surplus (Qs > Qd).',
      subject: 'ap_microeconomics',
      unit: 2,
      lessonIDs: ['2.8'],
      subNotes: [
        'Must be above equilibrium price to be binding',
        'Creates surplus (excess supply)',
        'Examples: minimum wage, agricultural price supports',
        'Reduces total surplus and creates deadweight loss'
      ],
      image: {
        url: 'https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com/apmicro_unit2_pricefloor.jpg',
        alt: 'Price floor diagram showing minimum price and resulting surplus'
      }
    },
    {
      id: 'excise-tax',
      term: 'Excise Tax',
      definition: 'A per-unit tax levied on the production or sale of a specific good or service. It shifts the supply curve upward (or demand curve downward), increases the price buyers pay, decreases the price sellers receive, reduces the equilibrium quantity, and creates deadweight loss.',
      subject: 'ap_microeconomics',
      unit: 2,
      lessonIDs: ['2.8'],
      subNotes: [
        'Per-unit tax on specific goods (not income tax)',
        'Shifts supply curve up by amount of tax',
        'Increases price buyers pay, decreases price sellers receive',
        'Creates deadweight loss and reduces total surplus'
      ]
    },
    {
      id: 'tax-incidence',
      term: 'Tax Incidence',
      definition: 'The distribution of the burden of a tax between buyers and sellers. The incidence depends on the relative price elasticities of demand and supply; the more inelastic side bears a larger share of the tax burden.',
      subject: 'ap_microeconomics',
      unit: 2,
      lessonIDs: ['2.8'],
      subNotes: [
        'More inelastic side bears larger tax burden',
        'Inelastic demand = consumers pay more of tax',
        'Inelastic supply = producers pay more of tax',
        'Tax burden is independent of who legally pays the tax'
      ]
    },
     {
      id: 'subsidy',
      term: 'Subsidy',
      definition: 'A government payment to buyers or sellers, usually on a per-unit basis, intended to encourage production or consumption. It effectively lowers the cost for producers (shifting supply right) or the price for consumers (shifting demand right), increasing quantity and potentially creating deadweight loss if it pushes quantity beyond the efficient level.',
      subject: 'ap_microeconomics',
      unit: 2,
      lessonIDs: ['2.8'],
      subNotes: [
        'Government payment to encourage production/consumption',
        'Shifts supply curve right or demand curve right',
        'Increases equilibrium quantity',
        'Can create deadweight loss if over-subsidized'
      ]
    },
    {
      id: 'deadweight-loss',
      term: 'Deadweight Loss (DWL)',
      definition: 'The loss of total surplus (combined consumer and producer surplus) that results from a market distortion, such as a tax, price control, or externality, which prevents the market from reaching the efficient equilibrium quantity.',
      subject: 'ap_microeconomics',
      unit: 2,
      lessonIDs: ['2.8'],
      subNotes: [
        'Loss of total surplus due to market inefficiency',
        'Triangle area between supply and demand curves',
        'Created by taxes, price controls, quotas, externalities',
        'Represents value of mutually beneficial trades that don\'t occur'
      ]
    },
     {
      id: 'quantity-control',
      term: 'Quantity Control (Quota)',
      definition: 'An upper limit set by the government on the quantity of a good that can be bought or sold. Leads to inefficiencies such as deadweight loss and incentives for illegal activities.',
      subject: 'ap_microeconomics',
      unit: 2,
      lessonIDs: ['2.8'],
      subNotes: [
        'Government limit on quantity bought/sold',
        'Creates artificial scarcity and higher prices',
        'Examples: fishing quotas, import quotas',
        'Leads to deadweight loss and black market activity'
      ]
    }, 
    {
      id: 'production-function',
      term: 'The Production Function',
      definition: 'The relationship between the quantity of inputs (factors of production) used to make a good and the quantity of output of that good.',
      subject: 'ap_microeconomics',
      unit: 3,
      lessonIDs: ['3.1'],
      subNotes: [
        'Short Run: At least one input (usually capital) is fixed.',
        'Long Run: All inputs are variable.'
      ]
    },
    {
      id: 'marginal-product',
      term: 'Marginal Product (MP)',
      definition: 'The additional output produced by hiring one more unit of a variable input (like one more worker).',
      subject: 'ap_microeconomics',
      unit: 3,
      lessonIDs: ['3.1'],
      subNotes: [
        'Formula: Change in Total Product / Change in Inputs',
        'MP intersects Average Product (AP) at the maximum point of AP.'
      ]
    },
    {
      id: 'law-of-diminishing-marginal-returns',
      term: 'Law of Diminishing Marginal Returns',
      definition: 'A principle stating that as more units of a variable input are added to a fixed input, the marginal product of the variable input will eventually decline.',
      subject: 'ap_microeconomics',
      unit: 3,
      lessonIDs: ['3.1'],
      subNotes: [
        'This explains why the Marginal Cost (MC) curve eventually slopes upward.',
        'Occurs only in the short run because of fixed resources.'
      ]
    },
  
    // Lesson 3.2: Short-Run Production Costs
    {
      id: 'fixed-vs-variable-costs',
      term: 'Fixed vs. Variable Costs',
      definition: 'Fixed costs do not change with output (e.g., rent), while variable costs increase as output increases (e.g., wages, raw materials).',
      subject: 'ap_microeconomics',
      unit: 3,
      lessonIDs: ['3.2'],
      subNotes: [
        'Total Cost (TC) = Total Fixed Cost (TFC) + Total Variable Cost (TVC)'
      ]
    },
    {
      id: 'marginal-cost',
      term: 'Marginal Cost (MC)',
      definition: 'The additional cost incurred by producing one more unit of output.',
      subject: 'ap_microeconomics',
      unit: 3,
      lessonIDs: ['3.2'],
      subNotes: [
        'Formula: Change in Total Cost / Change in Quantity',
        'The MC curve looks like a Nike swoosh (checks mark).',
        'MC crosses ATC and AVC at their minimum points.'
      ]
    },
    {
      id: 'average-total-cost',
      term: 'Average Total Cost (ATC)',
      definition: 'The total cost divided by the quantity of output produced.',
      subject: 'ap_microeconomics',
      unit: 3,
      lessonIDs: ['3.2'],
      subNotes: [
        'Formula: TC / Q  or  AFC + AVC',
        'The curve is U-shaped due to economies of scale and diminishing returns.'
      ]
    },
    {
      id: 'average-variable-cost',
      term: 'Average Variable Cost (AVC)',
      definition: 'The variable cost divided by the quantity of output produced.',
      subject: 'ap_microeconomics',
      unit: 3,
      lessonIDs: ['3.2'],
      subNotes: [
        'Formula: TVC / Q',
        'Gets closer to ATC as output increases because Average Fixed Cost (AFC) declines.'
      ]
    },
  
    // Lesson 3.3: Long-Run Production Costs
    {
      id: 'economies-of-scale',
      term: 'Economies of Scale',
      definition: 'When long-run average total cost falls as the quantity of output increases.',
      subject: 'ap_microeconomics',
      unit: 3,
      lessonIDs: ['3.3'],
      subNotes: [
        'Occurs due to specialization and bulk purchasing.',
        'Represented by the downward-sloping portion of the LRATC curve.'
      ]
    },
    {
      id: 'diseconomies-of-scale',
      term: 'Diseconomies of Scale',
      definition: 'When long-run average total cost rises as the quantity of output increases.',
      subject: 'ap_microeconomics',
      unit: 3,
      lessonIDs: ['3.3'],
      subNotes: [
        'Occurs due to coordination problems and bureaucracy in very large firms.',
        'Represented by the upward-sloping portion of the LRATC curve.'
      ]
    },
  
    // Lesson 3.4: Types of Profit
    {
      id: 'accounting-vs-economic-profit',
      term: 'Accounting vs. Economic Profit',
      definition: 'Accounting profit considers only explicit costs (out-of-pocket). Economic profit considers both explicit and implicit costs (opportunity costs).',
      subject: 'ap_microeconomics',
      unit: 3,
      lessonIDs: ['3.4'],
      subNotes: [
        'Economic Profit = Total Revenue - (Explicit Costs + Implicit Costs)',
        'A firm can have positive accounting profit but zero economic profit.'
      ]
    },
    {
      id: 'normal-profit',
      term: 'Normal Profit',
      definition: 'When economic profit is zero. This means the firm is covering all costs, including the opportunity cost of the owner\'s time and capital.',
      subject: 'ap_microeconomics',
      unit: 3,
      lessonIDs: ['3.4'],
      subNotes: [
        'This is the long-run equilibrium condition for perfectly competitive firms.'
      ]
    },
  
    // Lesson 3.5: Profit Maximization
    {
      id: 'profit-maximization-rule',
      term: 'Profit Maximization Rule',
      definition: 'To maximize profit (or minimize loss), a firm should produce the quantity where Marginal Revenue equals Marginal Cost.',
      subject: 'ap_microeconomics',
      unit: 3,
      lessonIDs: ['3.5'],
      subNotes: [
        'Rule: Produce where MR = MC',
        'If MR > MC, produce more.',
        'If MC > MR, produce less.'
      ]
    },
  
    // Lesson 3.6: Firms' Short-Run and Long-Run Decisions
    {
      id: 'shutdown-rule',
      term: 'Shutdown Rule',
      definition: 'In the short run, a firm should shut down (produce quantity zero) if the price falls below the minimum Average Variable Cost (AVC).',
      subject: 'ap_microeconomics',
      unit: 3,
      lessonIDs: ['3.6'],
      subNotes: [
        'If P < AVC, the firm loses more by producing than by shutting down.',
        'If P > AVC but P < ATC, the firm produces at a loss to cover some fixed costs.'
      ]
    },
    {
      id: 'barriers-to-entry',
      term: 'Barriers to Entry',
      definition: 'Obstacles that prevent new firms from entering a market, such as patents, high start-up costs, or control of resources.',
      subject: 'ap_microeconomics',
      unit: 3,
      lessonIDs: ['3.6'],
      subNotes: [
        'Perfect competition has NO barriers to entry (free entry and exit).'
      ]
    },
  
    // Lesson 3.7: Perfect Competition
    {
      id: 'perfect-competition-characteristics',
      term: 'Characteristics of Perfect Competition',
      definition: 'A market structure with many small firms, identical products, and easy entry/exit.',
      subject: 'ap_microeconomics',
      unit: 3,
      lessonIDs: ['3.7'],
      subNotes: [
        'Firms are "Price Takers" (they cannot set their own price).',
        'Demand for the individual firm is perfectly elastic (horizontal).'
      ]
    },
    {
      id: 'mr-darp',
      term: 'Mr. DARP',
      definition: 'Acronym for the horizontal line facing a perfectly competitive firm.',
      subject: 'ap_microeconomics',
      unit: 3,
      lessonIDs: ['3.7'],
      subNotes: [
        'Marginal Revenue = Demand = Average Revenue = Price',
        'P = MR = AR = D'
      ]
    },
    {
      id: 'long-run-equilibrium-pc',
      term: 'Long-Run Equilibrium (Perfect Competition)',
      definition: 'The situation where firms enter or exit the market until economic profit is zero.',
      subject: 'ap_microeconomics',
      unit: 3,
      lessonIDs: ['3.7'],
      subNotes: [
        'Price equals minimum ATC (Productive Efficiency).',
        'Price equals MC (Allocative Efficiency).',
        'No incentive for firms to enter or leave.'
      ]
    },
    {
      id: 'productive-efficiency',
      term: 'Productive Efficiency',
      definition: 'Producing a good in the least costly way; producing at the minimum of the Average Total Cost (ATC) curve.',
      subject: 'ap_microeconomics',
      unit: 3,
      lessonIDs: ['3.7'],
      subNotes: [
        'Perfectly competitive firms achieve this in the long run.'
      ]
    },
    {
      id: 'allocative-efficiency',
      term: 'Allocative Efficiency',
      definition: 'Producing the amount of goods that society most desires; producing where Price equals Marginal Cost (P = MC).',
      subject: 'ap_microeconomics',
      unit: 3,
      lessonIDs: ['3.7'],
      subNotes: [
        'Perfectly competitive firms achieve this in both the short run and long run.'
      ]
    }, 
    {
      id: 'factors-of-production',
      term: 'Factors of Production',
      definition: 'The resources used to produce goods and services: Land, Labor, Capital, and Entrepreneurship.',
      subject: 'ap_microeconomics',
      unit: 5,
      lessonIDs: ['5.1'],
      subNotes: [
        'Labor: Human effort used in production (wages).',
        'Land: Natural resources (rent).',
        'Capital: Tools and machinery (interest).',
        'Entrepreneurship: Risk-taking and innovation (profit).'
      ]
    },
    {
      id: 'factor-market',
      term: 'Factor Market',
      definition: 'The market where the factors of production (resources) are bought and sold.',
      subject: 'ap_microeconomics',
      unit: 5,
      lessonIDs: ['5.1'],
      subNotes: [
        'Households supply resources (Supply curve).',
        'Firms demand resources (Demand curve).'
      ]
    },
    {
      id: 'derived-demand',
      term: 'Derived Demand',
      definition: 'The concept that the demand for a resource is determined by the demand for the good or service that resource produces.',
      subject: 'ap_microeconomics',
      unit: 5,
      lessonIDs: ['5.1'],
      subNotes: [
        'If the demand for pizza goes up, the demand for pizza chefs goes up.',
        'Resource demand is NOT independent.'
      ]
    },
  
    // Lesson 5.2: Changes in Factor Demand and Factor Supply
    {
      id: 'marginal-revenue-product',
      term: 'Marginal Revenue Product (MRP)',
      definition: 'The additional revenue generated by hiring one more unit of a resource (e.g., one more worker).',
      subject: 'ap_microeconomics',
      unit: 5,
      lessonIDs: ['5.2', '5.3'],
      subNotes: [
        'Formula: Marginal Product (MP) x Price of the Good (P).',
        'Represents the Factor Demand Curve for the firm.'
      ]
    },
    {
      id: 'marginal-factor-cost',
      term: 'Marginal Factor Cost (MFC)',
      definition: 'The additional cost incurred by hiring one more unit of a resource.',
      subject: 'ap_microeconomics',
      unit: 5,
      lessonIDs: ['5.2', '5.3'],
      subNotes: [
        'Also known as Marginal Resource Cost (MRC).',
        'Formula: Change in Total Resource Cost / Change in Quantity of Resource.',
        'In a perfectly competitive labor market, MFC equals the Wage.'
      ]
    },
    {
      id: 'shifters-labor-demand',
      term: 'Shifters of Labor Demand',
      definition: 'Factors that shift the MRP curve (Demand for Labor).',
      subject: 'ap_microeconomics',
      unit: 5,
      lessonIDs: ['5.2'],
      subNotes: [
        'Change in Price of the Product (P↑ → MRP↑).',
        'Change in Productivity (MP↑ → MRP↑).',
        'Change in Price of Related Resources (Substitutes/Complements).'
      ]
    },
    {
      id: 'shifters-labor-supply',
      term: 'Shifters of Labor Supply',
      definition: 'Factors that shift the supply of labor curve.',
      subject: 'ap_microeconomics',
      unit: 5,
      lessonIDs: ['5.2'],
      subNotes: [
        'Education and Training.',
        'Availability of alternative opportunities.',
        'Migration and Population changes.',
        'Changes in leisure preferences.'
      ]
    },
  
    // Lesson 5.3: Profit Maximization in Factor Markets
    {
      id: 'hiring-rule',
      term: 'Profit-Maximizing Hiring Rule',
      definition: 'A firm should continue to hire resources as long as the additional revenue brought in by the resource is greater than or equal to the additional cost.',
      subject: 'ap_microeconomics',
      unit: 5,
      lessonIDs: ['5.3'],
      subNotes: [
        'Formula: Hire where MRP = MFC (or MRP = MRC).',
        'Works just like MR = MC for output.'
      ]
    },
    {
      id: 'perfectly-competitive-labor-market',
      term: 'Perfectly Competitive Labor Market',
      definition: 'A labor market with many small firms hiring, many workers with identical skills, and constant wages.',
      subject: 'ap_microeconomics',
      unit: 5,
      lessonIDs: ['5.3'],
      subNotes: [
        'Firms are "Wage Takers".',
        'The firm\'s supply of labor is perfectly elastic (horizontal) at the market wage.'
      ]
    },
    {
      id: 'least-cost-rule',
      term: 'Least-Cost Rule (Cost Minimization)',
      definition: 'The optimal combination of two different resources (like Labor and Capital) to produce a specific output at the lowest cost.',
      subject: 'ap_microeconomics',
      unit: 5,
      lessonIDs: ['5.3'],
      subNotes: [
        'Formula: (MP of Labor / Price of Labor) = (MP of Capital / Price of Capital).',
        'Basically, get the same "bang for your buck" from the last dollar spent on each resource.'
      ]
    },
  
    // Lesson 5.4: Monopsonic Markets
    {
      id: 'monopsony',
      term: 'Monopsony',
      definition: 'A market structure where there is only a single buyer of a resource (e.g., a "company town" where one factory hires everyone).',
      subject: 'ap_microeconomics',
      unit: 5,
      lessonIDs: ['5.4'],
      subNotes: [
        'The firm is a "Wage Maker".',
        'To hire more workers, the firm must raise the wage for ALL workers, not just the new one.'
      ]
    },
    {
      id: 'monopsony-graph',
      term: 'Monopsony Graphing',
      definition: 'In a monopsony, the Marginal Factor Cost (MFC) curve lies above the Supply curve.',
      subject: 'ap_microeconomics',
      unit: 5,
      lessonIDs: ['5.4'],
      subNotes: [
        'Quantity hired is determined where MRP = MFC.',
        'Wage paid is determined by the Supply curve at that quantity (Wage < MRP).',
        'Result: Monopsonies hire fewer workers and pay lower wages than competitive markets.'
      ]
    }, 
    {
      id: 'market-failure',
      term: 'Market Failure',
      definition: 'A situation where the free market fails to satisfy society’s wants or allocates resources inefficiently.',
      subject: 'ap_microeconomics',
      unit: 6,
      lessonIDs: ['6.1'],
      subNotes: [
        'The private market outcome does not equal the socially optimal outcome.',
        'Result: The government must intervene to fix the inefficiency.'
      ]
    },
    {
      id: 'socially-optimal-quantity',
      term: 'Socially Optimal Quantity',
      definition: 'The quantity of output where society’s total welfare is maximized.',
      subject: 'ap_microeconomics',
      unit: 6,
      lessonIDs: ['6.1', '6.2'],
      subNotes: [
        'Occurs where Marginal Social Benefit (MSB) equals Marginal Social Cost (MSC).',
        'This is the allocatively efficient point.'
      ]
    },
  
    // Lesson 6.2: Externalities
    {
      id: 'externality',
      term: 'Externality',
      definition: 'A third-party cost or benefit resulting from a transaction between a buyer and a seller.',
      subject: 'ap_microeconomics',
      unit: 6,
      lessonIDs: ['6.2'],
      subNotes: [
        'Can be positive (benefit) or negative (cost).',
        'Causes the market to fail because the private decision-makers do not consider these external effects.'
      ]
    },
    {
      id: 'negative-externality',
      term: 'Negative Externality',
      definition: 'A situation where production or consumption imposes a cost on a third party (e.g., pollution, smoking).',
      subject: 'ap_microeconomics',
      unit: 6,
      lessonIDs: ['6.2'],
      subNotes: [
        'Marginal Social Cost (MSC) > Marginal Private Cost (MPC).',
        'The market Overproduces (Q_market > Q_social).',
        'Fix: Per-unit Tax.'
      ]
    },
    {
      id: 'positive-externality',
      term: 'Positive Externality',
      definition: 'A situation where production or consumption creates a benefit for a third party (e.g., vaccines, education).',
      subject: 'ap_microeconomics',
      unit: 6,
      lessonIDs: ['6.2'],
      subNotes: [
        'Marginal Social Benefit (MSB) > Marginal Private Benefit (MPB).',
        'The market Underproduces (Q_market < Q_social).',
        'Fix: Per-unit Subsidy.'
      ]
    },
    {
      id: 'marginal-social-cost',
      term: 'Marginal Social Cost (MSC)',
      definition: 'The total cost to society of producing one more unit of a good.',
      subject: 'ap_microeconomics',
      unit: 6,
      lessonIDs: ['6.2'],
      subNotes: [
        'Formula: Marginal Private Cost (MPC) + Marginal External Cost.'
      ]
    },
    {
      id: 'marginal-social-benefit',
      term: 'Marginal Social Benefit (MSB)',
      definition: 'The total benefit to society of consuming one more unit of a good.',
      subject: 'ap_microeconomics',
      unit: 6,
      lessonIDs: ['6.2'],
      subNotes: [
        'Formula: Marginal Private Benefit (MPB) + Marginal External Benefit.'
      ]
    },
  
    // Lesson 6.3: Public and Private Goods
    {
      id: 'public-good',
      term: 'Public Good',
      definition: 'A good that is both non-excludable and non-rival in consumption.',
      subject: 'ap_microeconomics',
      unit: 6,
      lessonIDs: ['6.3'],
      subNotes: [
        'Examples: National defense, public parks, streetlights.',
        'The free market tends to underproduce these due to the Free Rider Problem.'
      ]
    },
    {
      id: 'non-exclusion',
      term: 'Non-Excludable',
      definition: 'A characteristic of a good where it is impossible (or very costly) to prevent people who haven\'t paid from using it.',
      subject: 'ap_microeconomics',
      unit: 6,
      lessonIDs: ['6.3'],
      subNotes: [
        'Example: You can\'t stop someone from enjoying the light from a streetlight.'
      ]
    },
    {
      id: 'shared-consumption',
      term: 'Shared Consumption (Non-Rival)',
      definition: 'A characteristic of a good where one person\'s use of the good does not reduce its usefulness to others.',
      subject: 'ap_microeconomics',
      unit: 6,
      lessonIDs: ['6.3'],
      subNotes: [
        'Example: Me watching a fireworks show doesn\'t stop you from watching it.'
      ]
    },
    {
      id: 'free-rider-problem',
      term: 'Free Rider Problem',
      definition: 'An issue where individuals benefit from a public good without paying for it, leading to underproduction by private firms.',
      subject: 'ap_microeconomics',
      unit: 6,
      lessonIDs: ['6.3'],
      subNotes: [
        'Since firms cannot profit from free riders, the government must provide the good using tax revenue.'
      ]
    },
  
    // Lesson 6.4: The Effects of Government Intervention
    {
      id: 'antitrust-laws',
      term: 'Antitrust Laws',
      definition: 'Legislation designed to prevent monopolies and promote competition.',
      subject: 'ap_microeconomics',
      unit: 6,
      lessonIDs: ['6.4'],
      subNotes: [
        'Used to break up monopolies or stop mergers that would hurt consumers.',
        'Example: The Sherman Antitrust Act.'
      ]
    },
    {
      id: 'per-unit-tax-subsidy-policy',
      term: 'Per-Unit Taxes and Subsidies',
      definition: 'Government tools used to correct externalities by shifting the private cost or benefit curves.',
      subject: 'ap_microeconomics',
      unit: 6,
      lessonIDs: ['6.4', '6.2'],
      subNotes: [
        'Taxing a negative externality shifts MPC up to meet MSC.',
        'Subsidizing a positive externality shifts MPB up to meet MSB.'
      ]
    },
    {
      id: 'lump-sum-vs-per-unit',
      term: 'Lump Sum vs. Per Unit',
      definition: 'The distinction between one-time fixed interventions and variable interventions.',
      subject: 'ap_microeconomics',
      unit: 6,
      lessonIDs: ['6.4'],
      subNotes: [
        'Lump Sum (Tax/Subsidy): Affects Fixed Costs. Changes Profit, but NOT Quantity or Price.',
        'Per Unit (Tax/Subsidy): Affects Variable Costs (MC). Changes Profit, Quantity, AND Price.'
      ]
    },
  
    // Lesson 6.5: Inequality
    {
      id: 'income-inequality',
      term: 'Income Inequality',
      definition: 'The unequal distribution of household income across the population.',
      subject: 'ap_microeconomics',
      unit: 6,
      lessonIDs: ['6.5'],
      subNotes: [
        'The government can measure this using the Lorenz Curve and Gini Coefficient.'
      ]
    },
    {
      id: 'lorenz-curve',
      term: 'Lorenz Curve',
      definition: 'A graph that visually represents income inequality.',
      subject: 'ap_microeconomics',
      unit: 6,
      lessonIDs: ['6.5'],
      subNotes: [
        'Plots the cumulative percentage of the population against the cumulative percentage of total income.',
        'The "banana" shape between the line of perfect equality and the Lorenz curve represents the degree of inequality.'
      ]
    },
    {
      id: 'gini-coefficient',
      term: 'Gini Coefficient',
      definition: 'A statistical measure of income inequality ranging from 0 to 1.',
      subject: 'ap_microeconomics',
      unit: 6,
      lessonIDs: ['6.5'],
      subNotes: [
        '0 = Perfect Equality (everyone has same income).',
        '1 = Perfect Inequality (one person has all the income).',
        'Formula: Area A / (Area A + Area B).'
      ]
    },
    {
      id: 'progressive-tax',
      term: 'Progressive Tax',
      definition: 'A tax system where the tax rate increases as income increases.',
      subject: 'ap_microeconomics',
      unit: 6,
      lessonIDs: ['6.5'],
      subNotes: [
        'Helps reduce income inequality.',
        'Example: Current US Income Tax system.'
      ]
    },
    {
      id: 'regressive-tax',
      term: 'Regressive Tax',
      definition: 'A tax system where the tax rate decreases as income increases (or takes a larger percentage of income from the poor).',
      subject: 'ap_microeconomics',
      unit: 6,
      lessonIDs: ['6.5'],
      subNotes: [
        'Increases income inequality.',
        'Example: Sales tax (hits lower income earners harder as a % of their income).'
      ]
    },
    {
      id: 'proportional-tax',
      term: 'Proportional Tax (Flat Tax)',
      definition: 'A tax system where the tax rate remains the same regardless of income.',
      subject: 'ap_microeconomics',
      unit: 6,
      lessonIDs: ['6.5'],
      subNotes: [
        'Example: A flat 20% tax on everyone.'
      ]
    }, 
    {
      id: 'absolute-advantage',
      term: 'Absolute Advantage',
      definition: 'The ability to produce more of a good than another producer, given the same resources.',
      subject: 'ap_microeconomics',
      unit: 1,
      lessonIDs: ['1.4'],
      subNotes: [
        'Focuses on productivity.',
        'A country can have an absolute advantage in both goods.'
      ]
    },
    {
      id: 'comparative-advantage',
      term: 'Comparative Advantage',
      definition: 'The ability to produce a good at a lower opportunity cost than another producer.',
      subject: 'ap_microeconomics',
      unit: 1,
      lessonIDs: ['1.4'],
      subNotes: [
        'Focuses on opportunity cost.',
        'A country cannot have a comparative advantage in both goods (mathematically impossible).',
        'This is the basis for mutually beneficial trade.'
      ]
    },
    {
      id: 'terms-of-trade',
      term: 'Terms of Trade',
      definition: 'The rate at which one good can be exchanged for another in trade.',
      subject: 'ap_microeconomics',
      unit: 1,
      lessonIDs: ['1.4'],
      subNotes: [
        'To be mutually beneficial, the terms must lie between both parties’ opportunity costs.',
        'Example: If Country A cost is 1X for 2Y, and Country B cost is 1X for 4Y, a fair trade is 1X for 3Y.'
      ]
    },
  
    // Lesson 1.5: Cost-Benefit Analysis
    {
      id: 'cost-benefit-analysis',
      term: 'Cost-Benefit Analysis',
      definition: 'A systematic approach to estimating the strengths and weaknesses of alternatives to determine the best option.',
      subject: 'ap_microeconomics',
      unit: 1,
      lessonIDs: ['1.5'],
      subNotes: [
        'Rational agents choose the option where Net Benefit (Total Benefit - Total Cost) is maximized.'
      ]
    },
    {
      id: 'explicit-costs',
      term: 'Explicit Costs',
      definition: 'Direct, out-of-pocket payments for inputs (e.g., wages, rent, materials).',
      subject: 'ap_microeconomics',
      unit: 1,
      lessonIDs: ['1.5'],
      subNotes: [
        'These are clearly seen on a receipt.'
      ]
    },
    {
      id: 'implicit-costs',
      term: 'Implicit Costs',
      definition: 'The opportunity costs of using resources that the firm or individual already owns (e.g., forgone salary, forgone interest).',
      subject: 'ap_microeconomics',
      unit: 1,
      lessonIDs: ['1.5'],
      subNotes: [
        'These are not recorded in accounting books but are crucial for economic decisions.'
      ]
    },
    {
      id: 'total-net-benefits',
      term: 'Total Net Benefits',
      definition: 'The difference between the total benefits and the total costs of an action.',
      subject: 'ap_microeconomics',
      unit: 1,
      lessonIDs: ['1.5'],
      subNotes: [
        'Rational decision-making aims to maximize this value.'
      ]
    },
  
    // Lesson 1.6: Marginal Analysis and Consumer Choice
    {
      id: 'marginal-analysis',
      term: 'Marginal Analysis',
      definition: 'Decision-making based on incremental changes; comparing the additional benefit of an action to the additional cost.',
      subject: 'ap_microeconomics',
      unit: 1,
      lessonIDs: ['1.6'],
      subNotes: [
        'Rule: Continue an activity as long as Marginal Benefit (MB) ≥ Marginal Cost (MC).'
      ]
    },
    {
      id: 'utility',
      term: 'Utility',
      definition: 'A measure of satisfaction or happiness derived from consuming a good or service.',
      subject: 'ap_microeconomics',
      unit: 1,
      lessonIDs: ['1.6'],
      subNotes: [
        'Measured in hypothetical units called "utils".'
      ]
    },
    {
      id: 'total-utility',
      term: 'Total Utility',
      definition: 'The total amount of satisfaction obtained from consuming a specific quantity of a good.',
      subject: 'ap_microeconomics',
      unit: 1,
      lessonIDs: ['1.6'],
      subNotes: [
        'It increases at a decreasing rate due to diminishing marginal utility.'
      ]
    },
    {
      id: 'marginal-utility',
      term: 'Marginal Utility (MU)',
      definition: 'The additional satisfaction gained from consuming one more unit of a good.',
      subject: 'ap_microeconomics',
      unit: 1,
      lessonIDs: ['1.6'],
      subNotes: [
        'Formula: Change in Total Utility / Change in Quantity.'
      ]
    },
    {
      id: 'law-diminishing-marginal-utility',
      term: 'Law of Diminishing Marginal Utility',
      definition: 'The principle that as a consumer consumes more of a good, the additional satisfaction (marginal utility) from each subsequent unit decreases.',
      subject: 'ap_microeconomics',
      unit: 1,
      lessonIDs: ['1.6'],
      subNotes: [
        'Explains why the demand curve slopes downward.',
        'Example: The first slice of pizza is great, the fifth slice is just okay.'
      ]
    },
    {
      id: 'utility-maximization-rule',
      term: 'Utility Maximization Rule',
      definition: 'To maximize total utility with a limited budget, a consumer should allocate their income so that the marginal utility per dollar spent is the same for every good.',
      subject: 'ap_microeconomics',
      unit: 1,
      lessonIDs: ['1.6'],
      subNotes: [
        'Formula: (MUx / Px) = (MUy / Py)',
        'If (MUx / Px) > (MUy / Py), the consumer should buy more X and less Y.'
      ]
    }, 
    {
      id: 'imperfect-competition',
      term: 'Imperfect Competition',
      definition: 'A market structure that fails to meet the conditions of perfect competition, where firms have some control over the price.',
      subject: 'ap_microeconomics',
      unit: 4,
      lessonIDs: ['4.1'],
      subNotes: [
        'Includes Monopoly, Oligopoly, and Monopolistic Competition.',
        'Firms are "Price Makers" rather than "Price Takers".',
        'The Demand curve for the firm is downward sloping.'
      ]
    },
  
    // Lesson 4.2: Monopoly
    {
      id: 'monopoly',
      term: 'Monopoly',
      definition: 'A market structure where there is only one large firm (the firm is the market) producing a unique product.',
      subject: 'ap_microeconomics',
      unit: 4,
      lessonIDs: ['4.2'],
      subNotes: [
        'Characteristics: High barriers to entry, "price makers".',
        'Marginal Revenue (MR) is less than Demand (Price).',
        'There are no close substitutes for the good.'
      ]
    },
    {
      id: 'monopoly-graph-mr',
      term: 'Marginal Revenue in Monopoly',
      definition: 'The additional revenue from selling one more unit. In a monopoly, the MR curve lies below the Demand curve.',
      subject: 'ap_microeconomics',
      unit: 4,
      lessonIDs: ['4.2'],
      subNotes: [
        'To sell more units, the firm must lower the price on ALL units sold, not just the last one.',
        'MR < Price at every quantity after the first unit.'
      ]
    },
    {
      id: 'elasticity-monopoly',
      term: 'Elasticity and Total Revenue (Monopoly)',
      definition: 'A monopoly will only produce in the elastic range of the demand curve.',
      subject: 'ap_microeconomics',
      unit: 4,
      lessonIDs: ['4.2'],
      subNotes: [
        'Elastic Range: MR > 0. Total Revenue increases as Price decreases.',
        'Inelastic Range: MR < 0. Total Revenue decreases as Price decreases.',
        'Total Revenue is maximized where MR = 0 (Unit Elastic).'
      ]
    },
    {
      id: 'monopoly-inefficiency',
      term: 'Inefficiency of Monopoly',
      definition: 'Monopolies are inefficient because they charge a higher price and produce a lower quantity than perfectly competitive markets.',
      subject: 'ap_microeconomics',
      unit: 4,
      lessonIDs: ['4.2'],
      subNotes: [
        'Allocatively Inefficient: Price > Marginal Cost (P > MC).',
        'Productive Inefficient: Price > Minimum ATC.',
        'Creates Deadweight Loss (DWL).'
      ]
    },
    {
      id: 'natural-monopoly',
      term: 'Natural Monopoly',
      definition: 'A distinct type of monopoly where one firm can produce the socially optimal quantity at the lowest cost due to economies of scale.',
      subject: 'ap_microeconomics',
      unit: 4,
      lessonIDs: ['4.2'],
      subNotes: [
        'The ATC curve falls over the relevant range of production.',
        'It is better to have one firm because two firms would have higher average costs.'
      ]
    },
    {
      id: 'regulating-monopoly',
      term: 'Regulating Monopolies',
      definition: 'Government price controls used to reduce the inefficiency of natural monopolies.',
      subject: 'ap_microeconomics',
      unit: 4,
      lessonIDs: ['4.2'],
      subNotes: [
        'Socially Optimal Price: Set P = MC (Allocative Efficiency). May cause a loss for the firm.',
        'Fair Return Price: Set P = ATC (Normal Profit). Firm breaks even.'
      ]
    },
  
    // Lesson 4.3: Price Discrimination
    {
      id: 'price-discrimination',
      term: 'Price Discrimination',
      definition: 'The practice of selling the same product to different buyers at different prices based on their willingness to pay.',
      subject: 'ap_microeconomics',
      unit: 4,
      lessonIDs: ['4.3'],
      subNotes: [
        'Conditions: Firm must have market power, be able to segregate the market, and prevent resale.',
        'Result: Converts Consumer Surplus into Profit.',
        'Perfect Price Discrimination: MR = Demand. No Deadweight Loss. Allocatively Efficient.'
      ]
    },
  
    // Lesson 4.4: Monopolistic Competition
    {
      id: 'monopolistic-competition',
      term: 'Monopolistic Competition',
      definition: 'A market structure with many sellers offering differentiated products.',
      subject: 'ap_microeconomics',
      unit: 4,
      lessonIDs: ['4.4'],
      subNotes: [
        'Characteristics: Relatively large number of sellers, easy entry and exit, non-price competition (advertising).',
        'Products are substitutes but not identical (e.g., fast food, furniture).'
      ]
    },
    {
      id: 'differentiation',
      term: 'Product Differentiation',
      definition: 'Strategies used by firms to distinguish their products from competitors, such as branding, quality, or features.',
      subject: 'ap_microeconomics',
      unit: 4,
      lessonIDs: ['4.4'],
      subNotes: [
        'Gives the firm some control over price (Demand is downward sloping but highly elastic).'
      ]
    },
    {
      id: 'long-run-monopolistic-competition',
      term: 'Long-Run Equilibrium (Monopolistic Competition)',
      definition: 'In the long run, firms enter or exit until economic profit is zero.',
      subject: 'ap_microeconomics',
      unit: 4,
      lessonIDs: ['4.4'],
      subNotes: [
        'Entry/Exit shifts the Demand curve.',
        'Equilibrium: Price = ATC (Normal Profit), but Price > MC (Inefficient).',
        'Demand is tangent to the ATC curve.'
      ]
    },
    {
      id: 'excess-capacity',
      term: 'Excess Capacity',
      definition: 'The gap between the minimum ATC output and the profit-maximizing output.',
      subject: 'ap_microeconomics',
      unit: 4,
      lessonIDs: ['4.4'],
      subNotes: [
        'The firm could produce at a lower cost but holds back production to maximize profit.'
      ]
    },
  
    // Lesson 4.5: Oligopoly and Game Theory
    {
      id: 'oligopoly',
      term: 'Oligopoly',
      definition: 'A market structure dominated by a few large producers.',
      subject: 'ap_microeconomics',
      unit: 4,
      lessonIDs: ['4.5'],
      subNotes: [
        'Characteristics: High barriers to entry, identical or differentiated products.',
        'Key Feature: Mutual Interdependence (decisions depend on competitors).'
      ]
    },
    {
      id: 'game-theory',
      term: 'Game Theory',
      definition: 'The study of how people/firms behave in strategic situations.',
      subject: 'ap_microeconomics',
      unit: 4,
      lessonIDs: ['4.5'],
      subNotes: [
        'Used to analyze the pricing and output decisions of oligopolies.'
      ]
    },
    {
      id: 'dominant-strategy',
      term: 'Dominant Strategy',
      definition: 'The best move to make regardless of what your opponent does.',
      subject: 'ap_microeconomics',
      unit: 4,
      lessonIDs: ['4.5'],
      subNotes: [
        'Not all games have a dominant strategy.',
        'How to identify:',
        'For Player 1: Check each row - if one row has higher payoffs than another in every column, that row is dominant.',
        'For Player 2: Check each column - if one column has higher payoffs than another in every row, that column is dominant.',
        'A strategy is dominant if it yields a better payoff than all other strategies, regardless of opponent\'s choice.'
      ]
    },
    {
      id: 'nash-equilibrium',
      term: 'Nash Equilibrium',
      definition: 'The outcome that occurs when both firms make decisions simultaneously and have no incentive to change.',
      subject: 'ap_microeconomics',
      unit: 4,
      lessonIDs: ['4.5'],
      subNotes: [
        'The "optimal" outcome given the rival\'s choice.',
        'How to identify:',
        'Step 1: For each cell, check if Player 1\'s payoff is the highest in that column (best response to Player 2\'s strategy).',
        'Step 2: For the same cell, check if Player 2\'s payoff is the highest in that row (best response to Player 1\'s strategy).',
        'If both conditions are true, that cell is a Nash equilibrium.',
        'A Nash equilibrium can exist even if neither player has a dominant strategy.'
      ]
    },
    {
      id: 'collusion-cartel',
      term: 'Collusion / Cartel',
      definition: 'A group of producers that create an agreement to fix prices high, effectively acting as a monopoly.',
      subject: 'ap_microeconomics',
      unit: 4,
      lessonIDs: ['4.5'],
      subNotes: [
        'They restrict output to maximize collective profit.',
        'Cartels are unstable because firms have an incentive to cheat (lower price) to gain market share.'
      ]
    }
    // Add terms for other units here...
  ];