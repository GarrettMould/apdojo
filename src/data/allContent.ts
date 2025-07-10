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

  // AP Macroeconomics Unit 1 Key Terms
  {
    id: 'scarcity-macro',
    term: 'Scarcity',
    definition: 'The fundamental economic problem that exists because there are limited resources and unlimited wants.',
    subject: 'ap_macroeconomics',
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
    id: 'opportunity-cost-macro',
    term: 'Opportunity Cost',
    definition: 'The next best alternative that must be given up when making a choice.',
    subject: 'ap_macroeconomics',
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
    id: 'factors-of-production-macro',
    term: 'Factors of Production',
    definition: 'The resources used to produce goods and services: land, labor, capital, and entrepreneurship.',
    subject: 'ap_macroeconomics',
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
    id: 'production-possibilities-curve-macro',
    term: 'Production Possibilities Curve (PPC)',
    definition: 'A model that shows alternative ways an economy can use its scarce resources.',
    subject: 'ap_macroeconomics',
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
    id: 'comparative-advantage-macro',
    term: 'Comparative Advantage',
    definition: 'When a country can produce a good at a lower opportunity cost than another country.',
    subject: 'ap_macroeconomics',
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
    id: 'absolute-advantage-macro',
    term: 'Absolute Advantage',
    definition: 'When a country can produce more of a good with the same resources as another country.',
    subject: 'ap_macroeconomics',
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
    id: 'specialization-macro',
    term: 'Specialization',
    definition: 'When individuals, businesses, or nations focus on producing a narrow range of products to maximize efficiency.',
    subject: 'ap_macroeconomics',
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
    id: 'economic-interdependence',
    term: 'Economic Interdependence',
    definition: 'A situation where producers in one nation depend on others for goods and services they do not produce.',
    subject: 'ap_macroeconomics',
    unit: 1,
    lessonIDs: ['1.3'],
    subNotes: [
      'Countries rely on each other for goods',
      'Result of specialization and trade',
      'Increases efficiency and living standards',
      'Can create vulnerability to external shocks'
    ]
  },
  {
    id: 'terms-of-trade',
    term: 'Terms of Trade',
    definition: 'The rate at which one good can be exchanged for another between countries.',
    subject: 'ap_macroeconomics',
    unit: 1,
    lessonIDs: ['1.3'],
    subNotes: [
      'Determines the benefits of trade',
      'Based on opportunity costs',
      'Must be between the two countries\' opportunity costs',
      'Both countries must benefit from trade'
    ]
  },
  {
    id: 'demand-macro',
    term: 'Demand',
    definition: 'The different quantities of goods and services consumers are willing and able to purchase at various price levels.',
    subject: 'ap_macroeconomics',
    unit: 1,
    lessonIDs: ['1.4'],
    subNotes: [
      'Shows relationship between price and quantity',
      'Downward sloping due to law of demand',
      'Can shift due to non-price factors',
      'Represents consumer preferences and constraints'
    ]
  },
  {
    id: 'quantity-demanded-macro',
    term: 'Quantity Demanded',
    definition: 'The number of people willing and able to buy a good or service at a certain price.',
    subject: 'ap_macroeconomics',
    unit: 1,
    lessonIDs: ['1.4'],
    subNotes: [
      'Specific quantity at a specific price',
      'Changes when price changes (movement along curve)',
      'Different from demand (entire curve)',
      'Shows consumer response to price'
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
    definition: 'A situation where the quantity demanded ($Q_d$) exceeds the quantity supplied ($Q_s$) at the current price ($Q_d > Q_s$). Occurs when the price is below equilibrium.',
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
    definition: 'A situation where the quantity supplied ($Q_s$) exceeds the quantity demanded ($Q_d$) at the current price ($Q_s > Q_d$). Occurs when the price is above equilibrium.',
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
    definition: 'A measure of how responsive the quantity demanded of a good is to a change in its price. Calculated as: $PED = \\frac{\% \\Delta Q_d}{\% \\Delta P}$.',
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
    definition: 'When the percentage change in quantity demanded is greater than the percentage change in price ($|PED| > 1$). Consumers are relatively responsive to price changes.',
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
    definition: 'When the percentage change in quantity demanded is less than the percentage change in price ($|PED| < 1$). Consumers are relatively unresponsive to price changes.',
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
    definition: 'When the percentage change in quantity demanded is equal to the percentage change in price ($|PED| = 1$).',
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
    definition: 'When the quantity demanded does not change regardless of the price ($PED = 0$). The demand curve is vertical.',
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
    definition: 'When any increase in price causes the quantity demanded to drop to zero ($|PED| = \\infty$). The demand curve is horizontal.',
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
    definition: 'A method to determine price elasticity of demand by examining how total revenue ($TR = P \\times Q$) changes when price changes. If P and TR move opposite, demand is elastic. If P and TR move together, demand is inelastic. If TR is constant, demand is unit elastic.',
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
    definition: 'A measure of how responsive the quantity supplied of a good is to a change in its price. Calculated as: $PES = \\frac{\% \\Delta Q_s}{\% \\Delta P}$.',
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
    definition: 'When the percentage change in quantity supplied is greater than the percentage change in price ($PES > 1$). Producers are relatively responsive to price changes.',
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
    definition: 'When the percentage change in quantity supplied is less than the percentage change in price ($PES < 1$). Producers are relatively unresponsive to price changes.',
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
    definition: 'A measure of how responsive the quantity demanded of a good is to a change in consumer income. Calculated as: $YED = \\frac{\% \\Delta Q_d}{\% \\Delta Income}$. Positive for normal goods, negative for inferior goods.',
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
    definition: 'A measure of how responsive the quantity demanded of one good is to a change in the price of another good. Calculated as: $XED = \\frac{\% \\Delta Q_{d, Good A}}{\% \\Delta P_{Good B}}$. Positive for substitutes, negative for complements, zero for unrelated goods.',
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
    definition: 'The sum of consumer surplus and producer surplus ($TS = CS + PS$). It represents the total welfare or benefit to society from market transactions and is maximized at market equilibrium.',
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
    definition: 'A legally established maximum price that can be charged for a good or service. To be binding (effective), it must be set below the equilibrium price, typically leading to a shortage ($Q_d > Q_s$).',
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
    definition: 'A legally established minimum price that can be charged for a good or service. To be binding (effective), it must be set above the equilibrium price, typically leading to a surplus ($Q_s > Q_d$).',
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
  // AP Macroeconomics Unit 3 Key Terms
  {
    id: 'ad-as-model',
    term: 'AD-AS Model',
    definition: 'Shows short-run and long-run changes in an economy\'s output (RGDP) and price level (PL).',
    subject: 'ap_macroeconomics',
    unit: 3,
    lessonIDs: ['3.1'],
    subNotes: [
      'Combines Aggregate Demand and Aggregate Supply',
      'Shows relationship between RGDP and Price Level',
      'Used to analyze economic fluctuations',
      'Key tool for understanding business cycles'
    ]
  },
  {
    id: 'aggregate-demand',
    term: 'Aggregate Demand (AD)',
    definition: 'Represents total demand for domestically produced goods in an economy (AD = C + I + G + Nx).',
    subject: 'ap_macroeconomics',
    unit: 3,
    lessonIDs: ['3.1'],
    subNotes: [
      'AD = C + I + G + Nx (Consumption + Investment + Government + Net Exports)',
      'Downward sloping due to wealth, interest rate, and exchange rate effects',
      'Shifts due to non-price level factors',
      'Represents total spending in the economy'
    ]
  },
  {
    id: 'short-run-aggregate-supply',
    term: 'Short-Run Aggregate Supply (SRAS)',
    definition: 'Represents quantity of goods and services firms are willing to produce at different price levels in the short-run.',
    subject: 'ap_macroeconomics',
    unit: 3,
    lessonIDs: ['3.1'],
    subNotes: [
      'Upward sloping due to sticky wages and prices',
      'Shows relationship between PL and RGDP in short run',
      'Shifts due to changes in resource prices, productivity',
      'Assumes some prices and wages are fixed'
    ]
  },
  {
    id: 'long-run-aggregate-supply',
    term: 'Long-Run Aggregate Supply (LRAS)',
    definition: 'Represents potential output that an economy can produce if it fully utilizes its productive resources (at full employment).',
    subject: 'ap_macroeconomics',
    unit: 3,
    lessonIDs: ['3.1'],
    subNotes: [
      'Vertical line at full employment output (Yf)',
      'Independent of price level in long run',
      'Shifts due to changes in resources, technology, institutions',
      'Represents economy\'s productive capacity'
    ]
  },
  {
    id: 'movements-along-curve',
    term: 'Movements Along Curve',
    definition: 'Caused by a change in price level; for AD and SRAS, this does not shift the curves.',
    subject: 'ap_macroeconomics',
    unit: 3,
    lessonIDs: ['3.1'],
    subNotes: [
      'Caused by changes in price level only',
      'Do not shift the curves themselves',
      'Represent quantity changes along existing curves',
      'Different from shifts which move entire curves'
    ]
  },
  {
    id: 'shifts-of-the-curve',
    term: 'Shifts of the Curve',
    definition: 'Caused by non-price factors (e.g., expectations, productivity, resource prices, etc.).',
    subject: 'ap_macroeconomics',
    unit: 3,
    lessonIDs: ['3.1'],
    subNotes: [
      'Caused by non-price level factors',
      'Move entire curves left or right',
      'Change equilibrium at all price levels',
      'Examples: technology, expectations, resource prices'
    ]
  },
  {
    id: 'real-wealth-effect',
    term: 'Real Wealth Effect',
    definition: 'As PL decreases, purchasing power increases, increasing C, shifting AD right.',
    subject: 'ap_macroeconomics',
    unit: 3,
    lessonIDs: ['3.1'],
    subNotes: [
      'Lower PL increases real value of wealth',
      'Higher real wealth increases consumption',
      'One reason AD curve slopes downward',
      'Works through money holdings and assets'
    ]
  },
  {
    id: 'interest-rate-effect',
    term: 'Interest Rate Effect',
    definition: 'As PL decreases, interest rates fall, increasing I, shifting AD right.',
    subject: 'ap_macroeconomics',
    unit: 3,
    lessonIDs: ['3.1'],
    subNotes: [
      'Lower PL reduces demand for money',
      'Lower money demand reduces interest rates',
      'Lower interest rates increase investment',
      'One reason AD curve slopes downward'
    ]
  },
  {
    id: 'exchange-rate-effect',
    term: 'Exchange Rate Effect',
    definition: 'As PL decreases, domestic goods become cheaper for foreigners, increasing Nx.',
    subject: 'ap_macroeconomics',
    unit: 3,
    lessonIDs: ['3.1'],
    subNotes: [
      'Lower PL makes domestic goods cheaper abroad',
      'Increases exports and decreases imports',
      'Increases net exports (Nx)',
      'One reason AD curve slopes downward'
    ]
  },
  {
    id: 'recessionary-gap',
    term: 'Recessionary Gap',
    definition: 'Occurs when actual output is less than potential output (Y < Yf).',
    subject: 'ap_macroeconomics',
    unit: 3,
    lessonIDs: ['3.2'],
    subNotes: [
      'Actual RGDP < Potential RGDP (Y < Yf)',
      'Economy operating below full employment',
      'High unemployment, unused resources',
      'Can be closed with expansionary policies'
    ]
  },
  {
    id: 'inflationary-gap',
    term: 'Inflationary Gap',
    definition: 'Occurs when actual output exceeds potential output (Y > Yf).',
    subject: 'ap_macroeconomics',
    unit: 3,
    lessonIDs: ['3.2'],
    subNotes: [
      'Actual RGDP > Potential RGDP (Y > Yf)',
      'Economy operating above full employment',
      'Low unemployment, inflationary pressure',
      'Can be closed with contractionary policies'
    ]
  },
  {
    id: 'long-run-equilibrium',
    term: 'Long-Run Equilibrium',
    definition: 'Occurs where AD, SRAS, and LRAS intersect; the economy is at full employment.',
    subject: 'ap_macroeconomics',
    unit: 3,
    lessonIDs: ['3.2'],
    subNotes: [
      'All three curves intersect at same point',
      'Economy at full employment (Y = Yf)',
      'No inflationary or recessionary gap',
      'Natural rate of unemployment prevails'
    ]
  },
  {
    id: 'self-adjustment',
    term: 'Self-Adjustment',
    definition: 'In the long-run, the economy will naturally adjust to full employment (Yf) through changes in wages and resource prices.',
    subject: 'ap_macroeconomics',
    unit: 3,
    lessonIDs: ['3.2'],
    subNotes: [
      'Economy naturally returns to full employment',
      'Works through wage and price adjustments',
      'Takes time due to sticky wages and prices',
      'Classical economists emphasize this mechanism'
    ]
  },
  {
    id: 'stagflation',
    term: 'Stagflation',
    definition: 'A combination of high inflation, high unemployment, and low economic output, typically caused by a leftward shift in SRAS.',
    subject: 'ap_macroeconomics',
    unit: 3,
    lessonIDs: ['3.2'],
    subNotes: [
      'Stagnation + Inflation occurring simultaneously',
      'Caused by supply-side shocks (leftward SRAS shift)',
      'Examples: oil price shocks, natural disasters',
      'Difficult to address with traditional policies'
    ]
  },
  {
    id: 'expansionary-fiscal-policy',
    term: 'Expansionary Fiscal Policy',
    definition: 'Used to close a recessionary gap; includes increasing government spending or decreasing taxes.',
    subject: 'ap_macroeconomics',
    unit: 3,
    lessonIDs: ['3.3'],
    subNotes: [
      'Increases government spending or decreases taxes',
      'Shifts AD curve to the right',
      'Used to close recessionary gaps',
      'Can increase budget deficit'
    ]
  },
  {
    id: 'contractionary-fiscal-policy',
    term: 'Contractionary Fiscal Policy',
    definition: 'Used to close an inflationary gap; includes decreasing government spending or increasing taxes.',
    subject: 'ap_macroeconomics',
    unit: 3,
    lessonIDs: ['3.3'],
    subNotes: [
      'Decreases government spending or increases taxes',
      'Shifts AD curve to the left',
      'Used to close inflationary gaps',
      'Can reduce budget deficit'
    ]
  },
  {
    id: 'expansionary-monetary-policy',
    term: 'Expansionary Monetary Policy',
    definition: 'Used to close a recessionary gap by increasing money supply and lowering interest rates.',
    subject: 'ap_macroeconomics',
    unit: 3,
    lessonIDs: ['3.3'],
    subNotes: [
      'Increases money supply and lowers interest rates',
      'Shifts AD curve to the right',
      'Used to close recessionary gaps',
      'Conducted by Federal Reserve'
    ]
  },
  {
    id: 'contractionary-monetary-policy',
    term: 'Contractionary Monetary Policy',
    definition: 'Used to close an inflationary gap by decreasing money supply and raising interest rates.',
    subject: 'ap_macroeconomics',
    unit: 3,
    lessonIDs: ['3.3'],
    subNotes: [
      'Decreases money supply and raises interest rates',
      'Shifts AD curve to the left',
      'Used to close inflationary gaps',
      'Conducted by Federal Reserve'
    ]
  },
  {
    id: 'double-shifts',
    term: 'Double Shifts',
    definition: 'When both AD and SRAS shift simultaneously; the change in PL or RGDP may be indeterminate.',
    subject: 'ap_macroeconomics',
    unit: 3,
    lessonIDs: ['3.3'],
    subNotes: [
      'Both AD and SRAS shift at same time',
      'Effect on PL and RGDP may be unclear',
      'Need to know relative magnitudes of shifts',
      'Common in real-world economic events'
    ]
  },
  {
    id: 'price-level',
    term: 'Price Level (PL)',
    definition: 'Average level of prices in the economy.',
    subject: 'ap_macroeconomics',
    unit: 3,
    lessonIDs: ['3.1'],
    subNotes: [
      'Average of all prices in the economy',
      'Measured by price indices (CPI, GDP deflator)',
      'Y-axis of AD-AS model',
      'Different from individual good prices'
    ]
  },
  {
    id: 'rgdp',
    term: 'RGDP',
    definition: 'Real Gross Domestic Product; measures actual output adjusted for inflation.',
    subject: 'ap_macroeconomics',
    unit: 3,
    lessonIDs: ['3.1'],
    subNotes: [
      'GDP adjusted for inflation',
      'Measures actual output, not just dollar value',
      'X-axis of AD-AS model',
      'Key measure of economic performance'
    ]
  },
  {
    id: 'yf',
    term: 'Yf',
    definition: 'Full employment output; level of output when economy is using all resources efficiently.',
    subject: 'ap_macroeconomics',
    unit: 3,
    lessonIDs: ['3.1', '3.2'],
    subNotes: [
      'Full employment level of output',
      'Economy using all resources efficiently',
      'Natural rate of unemployment prevails',
      'Vertical line where LRAS is located'
    ]
  },
  {
    id: 'sticky-wages',
    term: 'Sticky Wages',
    definition: 'Wages that do not adjust quickly to changes in economic conditions, leading to slow self-adjustment.',
    subject: 'ap_macroeconomics',
    unit: 3,
    lessonIDs: ['3.2'],
    subNotes: [
      'Wages don\'t adjust quickly to economic changes',
      'Causes SRAS to slope upward',
      'Slows down self-adjustment process',
      'Due to contracts, minimum wage, efficiency wages'
    ]
  }
  // Add terms for other units here...
];

export const allContent = { 
    macroeconomics: { 
        
    }
    // You could potentially nest whiteboardImages here too, if preferred:
    // whiteboardImages: whiteboardImages 
}