import type { Question } from '@/data/questionBanks/types';

/**
 * AP Micro table MCQ batch (v2).
 * Numeric IDs use a leading 2 as the v2 marker: 25001–25051.
 * Merged into practice via unitPracticeProblems microUnit* arrays.
 * Preview page: /micro-mcq-preview
 */
export const microTableMcqPreviewQuestions: Question[] = [
  {
    id: 25001,
    subject: 'ap_microeconomics',
    unit: 1,
    lessonIDS: ['1.3'],
    unitName: 'Basic Economic Concepts',
    question:
      "The table below shows the maximum output Ana can produce in one hour if she devotes all of her time to one good.\n\nWhat is Ana's opportunity cost of producing one pizza?",
    image: null,
    tableData: {
      headers: ['Good', 'Maximum Output per Hour'],
      rows: [
        ['Pizzas', '8'],
        ['Salads', '24'],
      ],
    },
    options: [
      '1/3 of a salad.',
      '1 salad.',
      '2 salads.',
      '3 salads.',
      '8 salads.',
    ],
    correctAnswer: 'D',
    explanation:
      'Opportunity cost is what must be given up. To produce 8 pizzas, Ana gives up 24 salads. The opportunity cost of 1 pizza is 24/8 = 3 salads.',
    videoExplanation: null,
  },
  {
    id: 25002,
    subject: 'ap_microeconomics',
    unit: 1,
    lessonIDS: ['1.3'],
    unitName: 'Basic Economic Concepts',
    question:
      "The table below shows the hours of labor each country needs to produce one ton of each good.\n\nWhat is Norland's opportunity cost of producing one ton of cloth?",
    image: null,
    tableData: {
      headers: ['Country', 'Hours per Ton of Wheat', 'Hours per Ton of Cloth'],
      rows: [
        ['Norland', '4', '6'],
        ['Sudland', '2', '8'],
      ],
    },
    options: [
      '0.67 tons of wheat.',
      '1.5 tons of wheat.',
      '2 tons of wheat.',
      '4 tons of wheat.',
      '6 tons of wheat.',
    ],
    correctAnswer: 'B',
    explanation:
      'This table gives inputs (hours), so divide the hours needed for the good by the hours needed for the other good. Norland uses 6 hours for a ton of cloth. In those 6 hours it could produce 6/4 = 1.5 tons of wheat. The opportunity cost of 1 ton of cloth is 1.5 tons of wheat.',
    videoExplanation: null,
  },
  {
    id: 25003,
    subject: 'ap_microeconomics',
    unit: 1,
    lessonIDS: ['1.4'],
    unitName: 'Comparative Advantage and Gains from Trade',
    question:
      'The table below shows the maximum output each country can produce in one month if it devotes all of its resources to one good.\n\nWhich of the following statements is true?',
    image: null,
    tableData: {
      headers: ['Country', 'Cars', 'Boats'],
      rows: [
        ['Hartland', '30', '60'],
        ['Mirland', '10', '40'],
      ],
    },
    options: [
      'Mirland has an absolute advantage in producing boats.',
      'Hartland has a comparative advantage in producing boats.',
      'Mirland has a comparative advantage in producing boats.',
      'Hartland has a comparative advantage in producing both goods.',
      'Mirland should specialize in producing cars.',
    ],
    correctAnswer: 'C',
    explanation:
      'Hartland has an absolute advantage in both goods because it produces more of each. Compare opportunity costs of a boat: Hartland gives up 30/60 = 0.5 cars, and Mirland gives up 10/40 = 0.25 cars. Mirland has the lower opportunity cost, so it has the comparative advantage in boats.',
    videoExplanation: null,
  },
  {
    id: 25004,
    subject: 'ap_microeconomics',
    unit: 1,
    lessonIDS: ['1.4'],
    unitName: 'Comparative Advantage and Gains from Trade',
    question:
      'The table below shows the hours of labor needed to produce one unit of each good in two countries.\n\nWhich of the following statements is correct?',
    image: null,
    tableData: {
      headers: ['Country', 'Hours per Bushel of Corn', 'Hours per Pound of Coffee'],
      rows: [
        ['Alpha', '2', '4'],
        ['Beta', '6', '8'],
      ],
    },
    options: [
      'Alpha has a comparative advantage in coffee because it uses fewer hours per pound.',
      'Beta has an absolute advantage in producing coffee.',
      'Alpha has a comparative advantage in both goods.',
      'Beta has a comparative advantage in corn.',
      'Alpha has a comparative advantage in corn, and Beta has a comparative advantage in coffee.',
    ],
    correctAnswer: 'E',
    explanation:
      'Alpha uses fewer hours for both goods, so it has an absolute advantage in both. Opportunity cost of corn: Alpha = 2/4 = 0.5 pounds of coffee, Beta = 6/8 = 0.75 pounds of coffee. Alpha has the lower opportunity cost of corn, so Alpha has the comparative advantage in corn. Because the two countries cannot both have the lower opportunity cost of the same good, Beta has the comparative advantage in coffee.',
    videoExplanation: null,
  },
  {
    id: 25005,
    subject: 'ap_microeconomics',
    unit: 1,
    lessonIDS: ['1.4'],
    unitName: 'Comparative Advantage and Gains from Trade',
    question:
      'The table below shows the maximum output of phones or tablets that each country can produce in one year using all of its resources.\n\nIf the countries specialize according to comparative advantage, which of the following terms of trade would benefit both countries?',
    image: null,
    tableData: {
      headers: ['Country', 'Phones', 'Tablets'],
      rows: [
        ['Zeda', '40', '20'],
        ['Yora', '30', '45'],
      ],
    },
    options: [
      '1 phone for 0.25 tablets',
      '1 phone for 0.4 tablets',
      '1 phone for 1 tablet',
      '1 phone for 1.75 tablets',
      '1 phone for 2 tablets',
    ],
    correctAnswer: 'C',
    explanation:
      'Opportunity cost of 1 phone: Zeda = 20/40 = 0.5 tablets. Yora = 45/30 = 1.5 tablets. Zeda has the comparative advantage in phones. For both countries to gain, the price of a phone must fall between 0.5 and 1.5 tablets. Only 1 tablet is in that range.',
    videoExplanation: null,
  },
  {
    id: 25006,
    subject: 'ap_microeconomics',
    unit: 1,
    lessonIDS: ['1.4'],
    unitName: 'Comparative Advantage and Gains from Trade',
    question:
      'The table below shows the output each country can produce in one day if it devotes the whole day to a single good. Each country has 10 days of labor available.\n\nIf each country specializes completely in the good for which it has the comparative advantage, what is the total combined output of the two countries?',
    image: null,
    tableData: {
      headers: ['Country', 'Wheat per Day', 'Cloth per Day'],
      rows: [
        ['Country A', '6', '3'],
        ['Country B', '2', '4'],
      ],
    },
    options: [
      '30 wheat and 40 cloth.',
      '60 wheat and 40 cloth.',
      '60 wheat and 30 cloth.',
      '20 wheat and 40 cloth.',
      '60 wheat and 20 cloth.',
    ],
    correctAnswer: 'B',
    explanation:
      'Opportunity cost of 1 wheat: Country A = 3/6 = 0.5 cloth. Country B = 4/2 = 2 cloth. Country A has the comparative advantage in wheat and Country B in cloth. Country A produces 6 x 10 = 60 wheat. Country B produces 4 x 10 = 40 cloth.',
    videoExplanation: null,
  },
  {
    id: 25007,
    subject: 'ap_microeconomics',
    unit: 1,
    lessonIDS: ['1.5'],
    unitName: 'Basic Economic Concepts',
    question:
      "The table below shows Maya's total benefit, in dollars, from eating slices of pizza at lunch.\n\nWhat is Maya's marginal benefit from the fourth slice?",
    image: null,
    tableData: {
      headers: ['Slices of Pizza', 'Total Benefit ($)'],
      rows: [
        ['1', '12'],
        ['2', '22'],
        ['3', '30'],
        ['4', '36'],
        ['5', '40'],
      ],
    },
    options: ['$4', '$6', '$8', '$30', '$36'],
    correctAnswer: 'B',
    explanation:
      'Marginal benefit is the change in total benefit from one more unit. MB of the fourth slice = 36 - 30 = $6.',
    videoExplanation: null,
  },
  {
    id: 25008,
    subject: 'ap_microeconomics',
    unit: 1,
    lessonIDS: ['1.5'],
    unitName: 'Basic Economic Concepts',
    question:
      "The table below shows Maya's total benefit, in dollars, from eating slices of pizza at lunch. Each slice costs $7.\n\nHow many slices should Maya eat to maximize her net benefit?",
    image: null,
    tableData: {
      headers: ['Slices of Pizza', 'Total Benefit ($)'],
      rows: [
        ['1', '12'],
        ['2', '22'],
        ['3', '30'],
        ['4', '36'],
        ['5', '40'],
      ],
    },
    options: ['1 slice.', '2 slices.', '3 slices.', '4 slices.', '5 slices.'],
    correctAnswer: 'C',
    explanation:
      'Marginal benefits are $12, $10, $8, $6, and $4 for slices 1 through 5. Maya should keep eating as long as marginal benefit is at least the $7 marginal cost. The third slice has MB = $8, which is greater than $7. The fourth slice has MB = $6, which is less than $7. She should eat 3 slices.',
    videoExplanation: null,
  },
  {
    id: 25009,
    subject: 'ap_microeconomics',
    unit: 1,
    lessonIDS: ['1.5'],
    unitName: 'Basic Economic Concepts',
    question:
      'The table below shows the marginal benefit a student receives from each additional hour of practice for a music exam.\n\nWhat is the total benefit the student receives from the first four hours of practice?',
    image: null,
    tableData: {
      headers: ['Hour of Practice', 'Marginal Benefit ($)'],
      rows: [
        ['1', '50'],
        ['2', '40'],
        ['3', '30'],
        ['4', '20'],
        ['5', '10'],
      ],
    },
    options: ['$20', '$80', '$120', '$140', '$150'],
    correctAnswer: 'D',
    explanation:
      'Total benefit is the sum of the marginal benefits. 50 + 40 + 30 + 20 = $140.',
    videoExplanation: null,
  },
  {
    id: 25010,
    subject: 'ap_microeconomics',
    unit: 1,
    lessonIDS: ['1.5'],
    unitName: 'Basic Economic Concepts',
    question:
      'The table below shows the marginal benefit a student receives from each additional hour of practice for a music exam. Each hour of practice has a marginal cost of $25.\n\nWhat is the maximum net benefit the student can earn from practicing?',
    image: null,
    tableData: {
      headers: ['Hour of Practice', 'Marginal Benefit ($)'],
      rows: [
        ['1', '50'],
        ['2', '40'],
        ['3', '30'],
        ['4', '20'],
        ['5', '10'],
      ],
    },
    options: ['$30', '$45', '$60', '$75', '$120'],
    correctAnswer: 'B',
    explanation:
      'Practice as long as marginal benefit is at least $25. Hours 1, 2, and 3 qualify (MB of 50, 40, and 30). Total benefit = $120. Total cost = 3 x $25 = $75. Net benefit = $120 - $75 = $45. A fourth hour has MB of $20 and would lower net benefit.',
    videoExplanation: null,
  },
  {
    id: 25011,
    subject: 'ap_microeconomics',
    unit: 1,
    lessonIDS: ['1.6'],
    unitName: 'Basic Economic Concepts',
    question:
      "Jordan has $8 to spend on apples and bread. Apples cost $2 each and bread costs $1 per loaf. The table below shows his marginal utility from each additional unit of each good.\n\nWhich bundle maximizes Jordan's total utility?",
    image: null,
    tableData: {
      headers: ['Unit', 'MU of Apples', 'MU of Bread'],
      rows: [
        ['1', '20', '14'],
        ['2', '16', '12'],
        ['3', '12', '10'],
        ['4', '8', '8'],
        ['5', '4', '6'],
        ['6', '0', '4'],
      ],
    },
    options: [
      '1 apple and 6 loaves of bread.',
      '2 apples and 3 loaves of bread.',
      '3 apples and 2 loaves of bread.',
      '2 apples and 4 loaves of bread.',
      '4 apples and 0 loaves of bread.',
    ],
    correctAnswer: 'D',
    explanation:
      'Utility is maximized when MU/P is equal across goods and all income is spent. MU/P for apples: 10, 8, 6, 4, 2, 0. MU/P for bread: 14, 12, 10, 8, 6, 4. At 2 apples and 4 loaves, MU/P is 8 for both goods. Spending is 2($2) + 4($1) = $8, which uses all of his income.',
    videoExplanation: null,
  },
  {
    id: 25012,
    subject: 'ap_microeconomics',
    unit: 1,
    lessonIDS: ['1.6'],
    unitName: 'Basic Economic Concepts',
    question:
      'A consumer spends all of her income on Good X and Good Y. The table below shows the price of each good and her marginal utility from the last unit consumed.\n\nTo maximize her total utility, the consumer should:',
    image: null,
    tableData: {
      headers: ['Good', 'Price', 'Marginal Utility of Last Unit'],
      rows: [
        ['Good X', '$4', '24'],
        ['Good Y', '$3', '12'],
      ],
    },
    options: [
      'Buy more of Good Y and less of Good X.',
      'Buy more of both goods.',
      'Buy more of Good X and less of Good Y.',
      'Make no change because she is already maximizing utility.',
      'Buy less of both goods.',
    ],
    correctAnswer: 'C',
    explanation:
      'Compare marginal utility per dollar. Good X: 24/4 = 6. Good Y: 12/3 = 4. Good X gives more utility per dollar, so she should shift spending toward X. As she buys more X, its MU falls, and as she buys less Y, its MU rises, until MU/P is equal.',
    videoExplanation: null,
  },
  {
    id: 25013,
    subject: 'ap_microeconomics',
    unit: 2,
    lessonIDS: ['2.8'],
    unitName: 'Supply and Demand',
    question:
      'The table below shows the market demand schedule for a good.\n\nIf the market price is $4, what is the total consumer surplus?',
    image: null,
    tableData: {
      headers: ['Price', 'Quantity Demanded'],
      rows: [
        ['$10', '0'],
        ['$8', '2'],
        ['$6', '4'],
        ['$4', '6'],
        ['$2', '8'],
        ['$0', '10'],
      ],
    },
    options: ['$6', '$12', '$18', '$24', '$36'],
    correctAnswer: 'C',
    explanation:
      'At a price of $4, 6 units are sold. Consumer surplus is the triangle between the demand curve and the price. The maximum price on the demand curve is $10, so the height of the triangle is $10 - $4 = $6. Consumer surplus = 1/2 x 6 x 6 = $18.',
    videoExplanation: null,
  },
  {
    id: 25014,
    subject: 'ap_microeconomics',
    unit: 2,
    lessonIDS: ['2.8'],
    unitName: 'Supply and Demand',
    question:
      'The table below shows the market demand schedule for a good.\n\nIf the market price is $6, what is the total consumer surplus?',
    image: null,
    tableData: {
      headers: ['Price', 'Quantity Demanded'],
      rows: [
        ['$10', '0'],
        ['$8', '2'],
        ['$6', '4'],
        ['$4', '6'],
        ['$2', '8'],
        ['$0', '10'],
      ],
    },
    options: ['$4', '$8', '$12', '$16', '$24'],
    correctAnswer: 'B',
    explanation:
      'At a price of $6, 4 units are sold. The height of the consumer surplus triangle is $10 - $6 = $4. Consumer surplus = 1/2 x 4 x 4 = $8.',
    videoExplanation: null,
  },
  {
    id: 25015,
    subject: 'ap_microeconomics',
    unit: 2,
    lessonIDS: ['2.8'],
    unitName: 'Supply and Demand',
    question:
      'Five buyers each want to purchase one unit of a good. The table below shows the maximum price each buyer is willing to pay.\n\nIf the market price is $5, what is total consumer surplus?',
    image: null,
    tableData: {
      headers: ['Buyer', 'Willingness to Pay'],
      rows: [
        ['Ann', '$10'],
        ['Ben', '$8'],
        ['Cal', '$6'],
        ['Dee', '$4'],
        ['Eli', '$2'],
      ],
    },
    options: ['$5', '$9', '$12', '$15', '$30'],
    correctAnswer: 'B',
    explanation:
      'Only buyers whose willingness to pay is at least $5 will buy: Ann, Ben, and Cal. Their surpluses are $10 - $5 = $5, $8 - $5 = $3, and $6 - $5 = $1. Total consumer surplus = $9.',
    videoExplanation: null,
  },
  {
    id: 25016,
    subject: 'ap_microeconomics',
    unit: 2,
    lessonIDS: ['2.4'],
    unitName: 'Supply and Demand',
    question:
      'The table below shows the price and quantity demanded of a good at two points on a demand curve.\n\nUsing the midpoint method, what is the price elasticity of demand (in absolute value) between these two points?',
    image: null,
    tableData: {
      headers: ['P1', 'Q1', 'P2', 'Q2'],
      rows: [['$6', '20', '$4', '40']],
    },
    options: ['0.60', '0.67', '1.00', '1.67', '2.00'],
    correctAnswer: 'D',
    explanation:
      'Percentage change in quantity = (40 - 20) / ((40 + 20)/2) = 20/30 = 66.7%. Percentage change in price = (4 - 6) / ((4 + 6)/2) = -2/5 = -40%. Elasticity = 66.7 / 40 = 1.67. Demand is elastic.',
    videoExplanation: null,
  },
  {
    id: 25017,
    subject: 'ap_microeconomics',
    unit: 2,
    lessonIDS: ['2.4'],
    unitName: 'Supply and Demand',
    question:
      'The table below shows the price and quantity demanded of a good at two points on a demand curve.\n\nUsing the midpoint method, what is the price elasticity of demand (in absolute value) between these two points, and is demand elastic or inelastic over this range?',
    image: null,
    tableData: {
      headers: ['P1', 'Q1', 'P2', 'Q2'],
      rows: [['$8', '120', '$10', '100']],
    },
    options: [
      '0.82; inelastic',
      '0.82; elastic',
      '1.22; elastic',
      '1.22; inelastic',
      '1.00; unit elastic',
    ],
    correctAnswer: 'A',
    explanation:
      'Percentage change in quantity = (100 - 120) / 110 = -18.18%. Percentage change in price = (10 - 8) / 9 = 22.22%. Elasticity = 18.18 / 22.22 = 0.82. Because this is less than 1, demand is inelastic.',
    videoExplanation: null,
  },
  {
    id: 25018,
    subject: 'ap_microeconomics',
    unit: 2,
    lessonIDS: ['2.4'],
    unitName: 'Supply and Demand',
    question:
      'The table below shows the price and quantity demanded of a good at two points on a demand curve.\n\nBetween these two points, demand is:',
    image: null,
    tableData: {
      headers: ['P1', 'Q1', 'P2', 'Q2'],
      rows: [['$10', '50', '$8', '70']],
    },
    options: [
      'Inelastic, because total revenue increased when price fell.',
      'Elastic, because total revenue increased when price fell.',
      'Inelastic, because quantity demanded increased.',
      'Unit elastic, because total revenue stayed the same.',
      'Elastic, because total revenue fell when price fell.',
    ],
    correctAnswer: 'B',
    explanation:
      'Total revenue at the first point is $10 x 50 = $500. At the second point it is $8 x 70 = $560. Total revenue rose when price fell, so demand is elastic. Midpoint check: %ΔQ = 20/60 = 33.3%, %ΔP = 2/9 = 22.2%, and elasticity = 1.5.',
    videoExplanation: null,
  },
  {
    id: 25019,
    subject: 'ap_microeconomics',
    unit: 2,
    lessonIDS: ['2.5'],
    unitName: 'Supply and Demand',
    question:
      'The table below shows how the quantity of tea demanded changed when the price of coffee increased.\n\nUsing the midpoint method, what is the cross-price elasticity of demand between tea and coffee, and what does it suggest about the goods?',
    image: null,
    tableData: {
      headers: ['Price of Coffee', 'Quantity of Tea Demanded'],
      rows: [
        ['$2', '100'],
        ['$3', '120'],
      ],
    },
    options: [
      '0.45; the goods are substitutes.',
      '0.45; the goods are complements.',
      '-0.45; the goods are substitutes.',
      '2.20; the goods are complements.',
      '2.20; the goods are substitutes.',
    ],
    correctAnswer: 'A',
    explanation:
      'Percentage change in quantity of tea = 20/110 = 18.18%. Percentage change in price of coffee = 1/2.5 = 40%. Cross-price elasticity = 18.18 / 40 = 0.45. A positive value means that when the price of coffee rises, the demand for tea rises, so the goods are substitutes.',
    videoExplanation: null,
  },
  {
    id: 25020,
    subject: 'ap_microeconomics',
    unit: 2,
    lessonIDS: ['2.5'],
    unitName: 'Supply and Demand',
    question:
      "The table below shows how a household's quantity demanded of Good Z changed when its income increased.\n\nUsing the midpoint method, what is the income elasticity of demand, and how is Good Z classified?",
    image: null,
    tableData: {
      headers: ['Income', 'Quantity of Good Z Demanded'],
      rows: [
        ['$40,000', '50'],
        ['$60,000', '40'],
      ],
    },
    options: [
      '0.56; a normal good.',
      '-0.56; an inferior good.',
      '-1.80; an inferior good.',
      '1.80; a normal good.',
      '-0.56; a normal good.',
    ],
    correctAnswer: 'B',
    explanation:
      'Percentage change in quantity = -10/45 = -22.2%. Percentage change in income = 20/50 = 40%. Income elasticity = -22.2 / 40 = -0.56. A negative income elasticity means demand falls as income rises, so Good Z is an inferior good.',
    videoExplanation: null,
  },
  {
    id: 25021,
    subject: 'ap_microeconomics',
    unit: 3,
    lessonIDS: ['3.1'],
    unitName: 'Production, Cost, and the Perfect Competition Model',
    question:
      'The table below shows the total output of a firm as it hires more workers.\n\nWhat is the marginal product of the third worker?',
    image: null,
    tableData: {
      headers: ['Workers', 'Total Output'],
      rows: [
        ['0', '0'],
        ['1', '10'],
        ['2', '24'],
        ['3', '36'],
        ['4', '44'],
        ['5', '48'],
        ['6', '48'],
      ],
    },
    options: ['8', '12', '14', '24', '36'],
    correctAnswer: 'B',
    explanation:
      'Marginal product is the change in total output from hiring one more worker. MP of the third worker = 36 - 24 = 12.',
    videoExplanation: null,
  },
  {
    id: 25022,
    subject: 'ap_microeconomics',
    unit: 3,
    lessonIDS: ['3.1'],
    unitName: 'Production, Cost, and the Perfect Competition Model',
    question:
      'The table below shows the total output of a firm as it hires more workers.\n\nWith which worker does diminishing marginal returns begin?',
    image: null,
    tableData: {
      headers: ['Workers', 'Total Output'],
      rows: [
        ['0', '0'],
        ['1', '10'],
        ['2', '24'],
        ['3', '36'],
        ['4', '44'],
        ['5', '48'],
        ['6', '48'],
      ],
    },
    options: [
      'The first worker.',
      'The second worker.',
      'The third worker.',
      'The fourth worker.',
      'The sixth worker.',
    ],
    correctAnswer: 'C',
    explanation:
      'Marginal products are 10, 14, 12, 8, 4, and 0 for workers 1 through 6. Marginal product rises through the second worker, then falls for the first time with the third worker (12 < 14). Diminishing marginal returns begin with the third worker.',
    videoExplanation: null,
  },
  {
    id: 25023,
    subject: 'ap_microeconomics',
    unit: 3,
    lessonIDS: ['3.1'],
    unitName: 'Production, Cost, and the Perfect Competition Model',
    question:
      'The table below shows the total output of a firm as it hires more workers.\n\nWhat is the average product of labor when the firm employs 4 workers?',
    image: null,
    tableData: {
      headers: ['Workers', 'Total Output'],
      rows: [
        ['0', '0'],
        ['1', '10'],
        ['2', '24'],
        ['3', '36'],
        ['4', '44'],
        ['5', '48'],
        ['6', '48'],
      ],
    },
    options: ['44', '11', '8', '4', '12'],
    correctAnswer: 'B',
    explanation:
      'Average product of labor = total output / number of workers = 44/4 = 11.',
    videoExplanation: null,
  },
  {
    id: 25024,
    subject: 'ap_microeconomics',
    unit: 3,
    lessonIDS: ['3.1'],
    unitName: 'Production, Cost, and the Perfect Competition Model',
    question:
      'The table below shows the marginal product of each additional worker at a bakery.\n\nWhat is the total output when the bakery employs 4 workers?',
    image: null,
    tableData: {
      headers: ['Worker', 'Marginal Product'],
      rows: [
        ['1', '12'],
        ['2', '16'],
        ['3', '14'],
        ['4', '10'],
        ['5', '6'],
      ],
    },
    options: ['10', '13', '42', '52', '58'],
    correctAnswer: 'D',
    explanation:
      'Total output is the sum of the marginal products of all workers hired. 12 + 16 + 14 + 10 = 52.',
    videoExplanation: null,
  },
  {
    id: 25025,
    subject: 'ap_microeconomics',
    unit: 3,
    lessonIDS: ['3.2'],
    unitName: 'Production, Cost, and the Perfect Competition Model',
    question:
      "The table below shows a firm's short-run costs.\n\nWhat is the average variable cost when the firm produces 3 units?",
    image: null,
    tableData: {
      headers: ['Quantity', 'Total Fixed Cost', 'Total Variable Cost'],
      rows: [
        ['0', '$100', '$0'],
        ['1', '$100', '$40'],
        ['2', '$100', '$70'],
        ['3', '$100', '$120'],
        ['4', '$100', '$190'],
      ],
    },
    options: ['$30.00', '$40.00', '$50.00', '$73.33', '$120.00'],
    correctAnswer: 'B',
    explanation:
      'Average variable cost = total variable cost / quantity = $120 / 3 = $40.',
    videoExplanation: null,
  },
  {
    id: 25026,
    subject: 'ap_microeconomics',
    unit: 3,
    lessonIDS: ['3.2'],
    unitName: 'Production, Cost, and the Perfect Competition Model',
    question:
      "The table below shows a firm's short-run costs.\n\nWhat is the marginal cost of producing the fourth unit?",
    image: null,
    tableData: {
      headers: ['Quantity', 'Total Fixed Cost', 'Total Variable Cost'],
      rows: [
        ['0', '$100', '$0'],
        ['1', '$100', '$40'],
        ['2', '$100', '$70'],
        ['3', '$100', '$120'],
        ['4', '$100', '$190'],
      ],
    },
    options: ['$47.50', '$50.00', '$70.00', '$72.50', '$190.00'],
    correctAnswer: 'C',
    explanation:
      'Marginal cost is the change in total cost from producing one more unit. Fixed cost does not change, so MC = change in variable cost = $190 - $120 = $70.',
    videoExplanation: null,
  },
  {
    id: 25027,
    subject: 'ap_microeconomics',
    unit: 3,
    lessonIDS: ['3.2'],
    unitName: 'Production, Cost, and the Perfect Competition Model',
    question:
      "The table below shows a firm's short-run costs.\n\nWhat is the average total cost when the firm produces 4 units?",
    image: null,
    tableData: {
      headers: ['Quantity', 'Total Fixed Cost', 'Total Variable Cost'],
      rows: [
        ['0', '$100', '$0'],
        ['1', '$100', '$40'],
        ['2', '$100', '$70'],
        ['3', '$100', '$120'],
        ['4', '$100', '$190'],
      ],
    },
    options: ['$47.50', '$52.50', '$70.00', '$72.50', '$290.00'],
    correctAnswer: 'D',
    explanation:
      'Total cost = total fixed cost + total variable cost = $100 + $190 = $290. Average total cost = $290 / 4 = $72.50.',
    videoExplanation: null,
  },
  {
    id: 25028,
    subject: 'ap_microeconomics',
    unit: 3,
    lessonIDS: ['3.2'],
    unitName: 'Production, Cost, and the Perfect Competition Model',
    question:
      "The table below shows a firm's average costs at one level of output.\n\nWhat is the firm's total fixed cost?",
    image: null,
    tableData: {
      headers: ['Quantity', 'Average Total Cost', 'Average Variable Cost'],
      rows: [['5', '$20', '$14']],
    },
    options: ['$6', '$14', '$30', '$70', '$100'],
    correctAnswer: 'C',
    explanation:
      'Average fixed cost = ATC - AVC = $20 - $14 = $6. Total fixed cost = AFC x quantity = $6 x 5 = $30.',
    videoExplanation: null,
  },
  {
    id: 25029,
    subject: 'ap_microeconomics',
    unit: 3,
    lessonIDS: ['3.2'],
    unitName: 'Production, Cost, and the Perfect Competition Model',
    question:
      "The table below shows information about a firm's costs.\n\nWhat is the firm's average total cost when it produces 5 units?",
    image: null,
    tableData: {
      headers: ['Quantity', 'Average Total Cost', 'Marginal Cost of Last Unit'],
      rows: [
        ['4', '$30', '$25'],
        ['5', '?', '$40'],
      ],
    },
    options: ['$30', '$32', '$35', '$40', '$160'],
    correctAnswer: 'B',
    explanation:
      'Total cost at 4 units = $30 x 4 = $120. Total cost at 5 units = $120 + $40 = $160. Average total cost at 5 units = $160 / 5 = $32. ATC rises because the marginal cost ($40) is above the old ATC ($30).',
    videoExplanation: null,
  },
  {
    id: 25030,
    subject: 'ap_microeconomics',
    unit: 3,
    lessonIDS: ['3.5'],
    unitName: 'Production, Cost, and the Perfect Competition Model',
    question:
      "A perfectly competitive firm faces a market price of $24. The table below shows its total cost at each level of output.\n\nWhat quantity maximizes the firm's profit, and what is the profit at that quantity?",
    image: null,
    tableData: {
      headers: ['Quantity', 'Total Cost'],
      rows: [
        ['0', '$30'],
        ['1', '$50'],
        ['2', '$65'],
        ['3', '$78'],
        ['4', '$94'],
        ['5', '$115'],
        ['6', '$143'],
      ],
    },
    options: [
      '3 units; a loss of $6.',
      '4 units; a profit of $2.',
      '5 units; a profit of $5.',
      '6 units; a profit of $1.',
      '5 units; a profit of $120.',
    ],
    correctAnswer: 'C',
    explanation:
      'Marginal costs are $20, $15, $13, $16, $21, and $28. A price-taking firm produces until MC would exceed price ($24). The fifth unit has MC = $21, which is below $24. The sixth unit has MC = $28, which is above $24. The firm produces 5 units. Profit = total revenue - total cost = $24 x 5 - $115 = $120 - $115 = $5.',
    videoExplanation: null,
  },
  {
    id: 25031,
    subject: 'ap_microeconomics',
    unit: 4,
    lessonIDS: ['4.5'],
    unitName: 'Imperfect Competition',
    question:
      "Two firms simultaneously choose to charge a high price or a low price. The payoff matrix below shows each firm's profit in millions of dollars.\n\nWhat is the Nash equilibrium of this game?",
    image: null,
    tableData: {
      headers: ['', 'Firm B: High Price', 'Firm B: Low Price'],
      rows: [
        ['Firm A: High Price', 'A: $10, B: $10', 'A: $2, B: $14'],
        ['Firm A: Low Price', 'A: $14, B: $2', 'A: $5, B: $5'],
      ],
    },
    options: [
      'Both firms charge a high price.',
      'Firm A charges a high price and Firm B charges a low price.',
      'Firm A charges a low price and Firm B charges a high price.',
      'Both firms charge a low price.',
      'There is no Nash equilibrium.',
    ],
    correctAnswer: 'D',
    explanation:
      'If Firm B charges a high price, Firm A earns $14 with a low price versus $10 with a high price. If Firm B charges a low price, Firm A earns $5 versus $2. A low price is a dominant strategy for Firm A, and by symmetry for Firm B. The Nash equilibrium is both firms charging a low price, even though both would earn more if they both charged a high price.',
    videoExplanation: null,
  },
  {
    id: 25032,
    subject: 'ap_microeconomics',
    unit: 4,
    lessonIDS: ['4.5'],
    unitName: 'Imperfect Competition',
    question:
      "Two firms simultaneously decide whether to advertise. The payoff matrix below shows each firm's profit in millions of dollars.\n\nWhich of the following statements is true?",
    image: null,
    tableData: {
      headers: ['', 'Firm B: Advertise', 'Firm B: Do Not Advertise'],
      rows: [
        ['Firm A: Advertise', 'A: $8, B: $4', 'A: $12, B: $5'],
        ['Firm A: Do Not Advertise', 'A: $5, B: $9', 'A: $7, B: $6'],
      ],
    },
    options: [
      'Neither firm has a dominant strategy, so there is no Nash equilibrium.',
      'Both firms have a dominant strategy to advertise.',
      'Firm B has a dominant strategy not to advertise.',
      'Firm A has a dominant strategy to advertise, and the Nash equilibrium is for Firm A to advertise and Firm B not to advertise.',
      'Firm A has a dominant strategy to advertise, and the Nash equilibrium is for both firms to advertise.',
    ],
    correctAnswer: 'D',
    explanation:
      "Firm A earns more by advertising whether B advertises ($8 vs $5) or not ($12 vs $7), so advertising is dominant for A. Firm B has no dominant strategy: if A advertises, B prefers not to advertise ($5 vs $4), but if A does not advertise, B prefers to advertise ($9 vs $6). Since A will advertise, B's best response is not to advertise. The Nash equilibrium is (A advertises, B does not).",
    videoExplanation: null,
  },
  {
    id: 25033,
    subject: 'ap_microeconomics',
    unit: 4,
    lessonIDS: ['4.5'],
    unitName: 'Imperfect Competition',
    question:
      "Two firms simultaneously decide whether to enter a small market that can profitably support only one firm. The payoff matrix below shows each firm's profit in millions of dollars.\n\nHow many pure strategy Nash equilibria does this game have?",
    image: null,
    tableData: {
      headers: ['', 'Firm B: Enter', 'Firm B: Stay Out'],
      rows: [
        ['Firm A: Enter', 'A: -$5, B: -$5', 'A: $10, B: $0'],
        ['Firm A: Stay Out', 'A: $0, B: $10', 'A: $0, B: $0'],
      ],
    },
    options: ['0', '1', '2', '3', '4'],
    correctAnswer: 'C',
    explanation:
      'Check each cell for a profitable deviation. (Enter, Enter): either firm would do better by staying out (0 > -5), so it is not an equilibrium. (Stay Out, Stay Out): either firm would do better by entering (10 > 0), so it is not an equilibrium. (Enter, Stay Out) and (Stay Out, Enter): neither firm can do better by switching. There are 2 Nash equilibria.',
    videoExplanation: null,
  },
  {
    id: 25034,
    subject: 'ap_microeconomics',
    unit: 4,
    lessonIDS: ['4.2'],
    unitName: 'Imperfect Competition',
    question:
      'A monopolist faces the demand and total cost schedule shown in the table below.\n\nWhat price should the monopolist charge to maximize profit?',
    image: null,
    tableData: {
      headers: ['Quantity', 'Price', 'Total Cost'],
      rows: [
        ['1', '$10', '$4'],
        ['2', '$9', '$7'],
        ['3', '$8', '$11'],
        ['4', '$7', '$16'],
        ['5', '$6', '$22'],
      ],
    },
    options: ['$6', '$7', '$8', '$9', '$10'],
    correctAnswer: 'C',
    explanation:
      'Total revenue is $10, $18, $24, $28, and $30. Marginal revenue is $10, $8, $6, $4, and $2. Marginal cost is $4, $3, $4, $5, and $6. The monopolist produces as long as MR is at least MC. The third unit has MR = $6 and MC = $4, so it is produced. The fourth unit has MR = $4 and MC = $5, so it is not. The profit-maximizing quantity is 3, and the demand curve gives a price of $8.',
    videoExplanation: null,
  },
  {
    id: 25035,
    subject: 'ap_microeconomics',
    unit: 4,
    lessonIDS: ['4.2'],
    unitName: 'Imperfect Competition',
    question:
      'A monopolist faces the demand and total cost schedule shown in the table below.\n\nWhat is the maximum profit the monopolist can earn?',
    image: null,
    tableData: {
      headers: ['Quantity', 'Price', 'Total Cost'],
      rows: [
        ['1', '$10', '$4'],
        ['2', '$9', '$7'],
        ['3', '$8', '$11'],
        ['4', '$7', '$16'],
        ['5', '$6', '$22'],
      ],
    },
    options: ['$6', '$8', '$11', '$12', '$13'],
    correctAnswer: 'E',
    explanation:
      'The profit-maximizing quantity is where MR is at least MC, which is 3 units. At 3 units, total revenue = $8 x 3 = $24 and total cost = $11. Profit = $24 - $11 = $13. Checking other quantities: 1 unit earns $6, 2 units earn $11, 4 units earn $12, and 5 units earn $8.',
    videoExplanation: null,
  },
  {
    id: 25036,
    subject: 'ap_microeconomics',
    unit: 4,
    lessonIDS: ['4.1'],
    unitName: 'Imperfect Competition',
    question:
      'The table below shows the market shares of the four firms in an industry.\n\nWhat is the Herfindahl-Hirschman Index (HHI) for this industry?',
    image: null,
    tableData: {
      headers: ['Firm', 'Market Share'],
      rows: [
        ['Firm A', '40%'],
        ['Firm B', '30%'],
        ['Firm C', '20%'],
        ['Firm D', '10%'],
      ],
    },
    options: ['100', '1,000', '2,000', '3,000', '10,000'],
    correctAnswer: 'D',
    explanation:
      'HHI is the sum of the squared market shares (in percentage points). 40^2 + 30^2 + 20^2 + 10^2 = 1,600 + 900 + 400 + 100 = 3,000.',
    videoExplanation: null,
  },
  {
    id: 25037,
    subject: 'ap_microeconomics',
    unit: 5,
    lessonIDS: ['5.5'],
    unitName: 'Factor Markets',
    question:
      "A firm uses labor and capital to produce output. The table below shows the marginal product and price of each input at the firm's current input mix.\n\nTo produce its current level of output at the lowest cost, the firm should:",
    image: null,
    tableData: {
      headers: ['Input', 'Marginal Product', 'Price of Input'],
      rows: [
        ['Labor', '20', '$5'],
        ['Capital', '30', '$10'],
      ],
    },
    options: [
      'Use more capital and less labor.',
      'Use more labor and less capital.',
      'Use more of both inputs.',
      'Make no change because costs are already minimized.',
      'Use less of both inputs.',
    ],
    correctAnswer: 'B',
    explanation:
      'Cost is minimized when MP/P is equal across inputs. Labor: 20/5 = 4 units of output per dollar. Capital: 30/10 = 3 units of output per dollar. Labor gives more output per dollar, so the firm should use more labor and less capital.',
    videoExplanation: null,
  },
  {
    id: 25038,
    subject: 'ap_microeconomics',
    unit: 5,
    lessonIDS: ['5.5'],
    unitName: 'Factor Markets',
    question:
      'A firm uses labor and capital to produce output. The table below shows the marginal product and price of each input at the firm\'s current input mix.\n\nWhich of the following is true?',
    image: null,
    tableData: {
      headers: ['Input', 'Marginal Product', 'Price of Input'],
      rows: [
        ['Labor', '24', '$6'],
        ['Capital', '40', '$10'],
      ],
    },
    options: [
      'The firm should use more labor and less capital.',
      'The firm should use more capital and less labor.',
      'The firm should use more of both inputs to cut costs.',
      'The firm is already using the cost-minimizing combination of inputs.',
      'The firm should use less of both inputs.',
    ],
    correctAnswer: 'D',
    explanation:
      'Labor: MP/P = 24/6 = 4. Capital: MP/P = 40/10 = 4. The ratios are equal, so the firm is already producing its current output at the lowest possible cost.',
    videoExplanation: null,
  },
  {
    id: 25039,
    subject: 'ap_microeconomics',
    unit: 5,
    lessonIDS: ['5.3'],
    unitName: 'Factor Markets',
    question:
      'A firm sells its output in a perfectly competitive market at a price of $5 per unit. The table below shows total output at different numbers of workers.\n\nWhat is the marginal revenue product of the fourth worker?',
    image: null,
    tableData: {
      headers: ['Workers', 'Total Output'],
      rows: [
        ['1', '10'],
        ['2', '18'],
        ['3', '24'],
        ['4', '28'],
        ['5', '30'],
      ],
    },
    options: ['$4', '$5', '$20', '$28', '$140'],
    correctAnswer: 'C',
    explanation:
      'The marginal product of the fourth worker is 28 - 24 = 4 units. Marginal revenue product = MP x output price = 4 x $5 = $20.',
    videoExplanation: null,
  },
  {
    id: 25040,
    subject: 'ap_microeconomics',
    unit: 5,
    lessonIDS: ['5.3'],
    unitName: 'Factor Markets',
    question:
      'A firm sells its output in a perfectly competitive market at a price of $5 per unit and hires labor in a perfectly competitive labor market at a wage of $15 per worker. The table below shows total output at different numbers of workers.\n\nHow many workers should the firm hire to maximize profit?',
    image: null,
    tableData: {
      headers: ['Workers', 'Total Output'],
      rows: [
        ['1', '10'],
        ['2', '18'],
        ['3', '24'],
        ['4', '28'],
        ['5', '30'],
      ],
    },
    options: [
      '1 worker.',
      '2 workers.',
      '3 workers.',
      '4 workers.',
      '5 workers.',
    ],
    correctAnswer: 'D',
    explanation:
      'Marginal products are 10, 8, 6, 4, and 2, so MRP = MP x $5 is $50, $40, $30, $20, and $10. The firm hires workers as long as MRP is at least the wage of $15. The fourth worker has MRP = $20, which is above $15. The fifth worker has MRP = $10, which is below $15. The firm hires 4 workers.',
    videoExplanation: null,
  },
  {
    id: 25041,
    subject: 'ap_microeconomics',
    unit: 5,
    lessonIDS: ['5.4'],
    unitName: 'Factor Markets',
    question:
      'A firm is the only employer of labor in a town, so it must raise the wage to hire more workers. The table below shows the wage required to hire each number of workers.\n\nWhat is the marginal resource cost (marginal factor cost) of the third worker?',
    image: null,
    tableData: {
      headers: ['Workers', 'Wage per Worker'],
      rows: [
        ['1', '$10'],
        ['2', '$12'],
        ['3', '$14'],
        ['4', '$16'],
        ['5', '$18'],
      ],
    },
    options: ['$14', '$18', '$22', '$26', '$42'],
    correctAnswer: 'B',
    explanation:
      'Total labor cost with 2 workers = 2 x $12 = $24. Total labor cost with 3 workers = 3 x $14 = $42. Marginal resource cost of the third worker = $42 - $24 = $18. It exceeds the wage ($14) because the higher wage must be paid to all workers, not only the new one.',
    videoExplanation: null,
  },
  {
    id: 25042,
    subject: 'ap_microeconomics',
    unit: 5,
    lessonIDS: ['5.4'],
    unitName: 'Factor Markets',
    question:
      'A firm is the only employer of labor in a town. The table below shows the wage required to hire each number of workers and the marginal revenue product of each worker.\n\nHow many workers will the firm hire, and what wage will it pay?',
    image: null,
    tableData: {
      headers: ['Workers', 'Wage per Worker', 'Marginal Revenue Product'],
      rows: [
        ['1', '$10', '$30'],
        ['2', '$12', '$26'],
        ['3', '$14', '$22'],
        ['4', '$16', '$18'],
        ['5', '$18', '$14'],
      ],
    },
    options: [
      '4 workers at a wage of $16.',
      '3 workers at a wage of $22.',
      '5 workers at a wage of $18.',
      '2 workers at a wage of $12.',
      '3 workers at a wage of $14.',
    ],
    correctAnswer: 'E',
    explanation:
      "Total labor cost is $10, $24, $42, $64, and $90, so marginal resource cost is $10, $14, $18, $22, and $26. A monopsonist hires until MRP = MRC. The third worker has MRP = $22, which is above MRC = $18. The fourth worker has MRP = $18, which is below MRC = $22. The firm hires 3 workers and pays the wage on the supply curve for 3 workers, which is $14.",
    videoExplanation: null,
  },
  {
    id: 25043,
    subject: 'ap_microeconomics',
    unit: 6,
    lessonIDS: ['6.5'],
    unitName: 'Market Failure and the Role of Government',
    question:
      'The table below shows the income tax paid by three households at different income levels.\n\nThis tax is best described as:',
    image: null,
    tableData: {
      headers: ['Income', 'Tax Paid'],
      rows: [
        ['$20,000', '$2,000'],
        ['$50,000', '$5,000'],
        ['$100,000', '$10,000'],
      ],
    },
    options: [
      'A progressive tax.',
      'A regressive tax.',
      'A proportional tax.',
      'A lump-sum tax.',
      'A negative income tax.',
    ],
    correctAnswer: 'C',
    explanation:
      'Each household pays 10% of its income ($2,000/$20,000, $5,000/$50,000, and $10,000/$100,000). When the percentage of income paid stays the same at every income level, the tax is proportional.',
    videoExplanation: null,
  },
  {
    id: 25044,
    subject: 'ap_microeconomics',
    unit: 6,
    lessonIDS: ['6.5'],
    unitName: 'Market Failure and the Role of Government',
    question:
      'The table below shows the tax paid by three households at different income levels.\n\nThis tax is best described as:',
    image: null,
    tableData: {
      headers: ['Income', 'Tax Paid'],
      rows: [
        ['$20,000', '$3,000'],
        ['$40,000', '$5,200'],
        ['$80,000', '$8,000'],
      ],
    },
    options: [
      'A progressive tax.',
      'A regressive tax.',
      'A proportional tax.',
      'A lump-sum tax.',
      'A marginal tax.',
    ],
    correctAnswer: 'B',
    explanation:
      'The share of income paid is 15% ($3,000/$20,000), 13% ($5,200/$40,000), and 10% ($8,000/$80,000). The percentage paid falls as income rises, so the tax is regressive.',
    videoExplanation: null,
  },
  {
    id: 25045,
    subject: 'ap_microeconomics',
    unit: 6,
    lessonIDS: ['6.5'],
    unitName: 'Market Failure and the Role of Government',
    question:
      'The table below shows the tax paid by three households at different income levels.\n\nThis tax is best described as:',
    image: null,
    tableData: {
      headers: ['Income', 'Tax Paid'],
      rows: [
        ['$25,000', '$1,500'],
        ['$50,000', '$5,000'],
        ['$100,000', '$15,000'],
      ],
    },
    options: [
      'A regressive tax.',
      'A progressive tax.',
      'A proportional tax.',
      'A lump-sum tax.',
      'An excise tax.',
    ],
    correctAnswer: 'B',
    explanation:
      'The share of income paid is 6% ($1,500/$25,000), 10% ($5,000/$50,000), and 15% ($15,000/$100,000). The percentage paid rises as income rises, so the tax is progressive.',
    videoExplanation: null,
  },
  {
    id: 25046,
    subject: 'ap_microeconomics',
    unit: 6,
    lessonIDS: ['6.5'],
    unitName: 'Market Failure and the Role of Government',
    question:
      'The table below shows the total income tax a household pays at two income levels.\n\nWhat is the marginal tax rate on income between $40,000 and $50,000?',
    image: null,
    tableData: {
      headers: ['Income', 'Total Tax Paid'],
      rows: [
        ['$40,000', '$6,000'],
        ['$50,000', '$8,000'],
      ],
    },
    options: ['12%', '15%', '16%', '20%', '25%'],
    correctAnswer: 'D',
    explanation:
      'The marginal tax rate is the change in tax divided by the change in income. ($8,000 - $6,000) / ($50,000 - $40,000) = $2,000 / $10,000 = 20%. The average tax rate at $50,000 is only 16% ($8,000/$50,000).',
    videoExplanation: null,
  },
  {
    id: 25047,
    subject: 'ap_microeconomics',
    unit: 6,
    lessonIDS: ['6.2'],
    unitName: 'Market Failure and the Role of Government',
    question:
      'A good generates a negative externality. The table below shows the marginal private benefit (MPB), marginal private cost (MPC), and marginal external cost for each unit.\n\nHow many units are produced in the unregulated market, and how many units are socially efficient?',
    image: null,
    tableData: {
      headers: ['Quantity', 'MPB', 'MPC', 'Marginal External Cost'],
      rows: [
        ['1', '$10', '$2', '$2'],
        ['2', '$8', '$4', '$2'],
        ['3', '$6', '$6', '$2'],
        ['4', '$4', '$8', '$2'],
        ['5', '$2', '$10', '$2'],
      ],
    },
    options: [
      'Market: 3 units; efficient: 2 units.',
      'Market: 2 units; efficient: 3 units.',
      'Market: 3 units; efficient: 4 units.',
      'Market: 4 units; efficient: 3 units.',
      'Market: 3 units; efficient: 3 units.',
    ],
    correctAnswer: 'A',
    explanation:
      'The unregulated market ignores the external cost and produces where MPB = MPC, which is 3 units. Marginal social cost = MPC + marginal external cost = $4, $6, $8, $10, and $12. The efficient quantity is where MPB = MSC. The second unit has MPB = $8 and MSC = $6, so it is worth producing. The third unit has MPB = $6 and MSC = $8, so it is not. The efficient quantity is 2 units, so the market overproduces.',
    videoExplanation: null,
  },
  {
    id: 25048,
    subject: 'ap_microeconomics',
    unit: 6,
    lessonIDS: ['6.2'],
    unitName: 'Market Failure and the Role of Government',
    question:
      'A good generates a negative externality. The table below shows the marginal private benefit (MPB), marginal private cost (MPC), and marginal external cost for each unit.\n\nWhat per-unit tax would cause the market to produce the socially efficient quantity?',
    image: null,
    tableData: {
      headers: ['Quantity', 'MPB', 'MPC', 'Marginal External Cost'],
      rows: [
        ['1', '$10', '$2', '$2'],
        ['2', '$8', '$4', '$2'],
        ['3', '$6', '$6', '$2'],
        ['4', '$4', '$8', '$2'],
        ['5', '$2', '$10', '$2'],
      ],
    },
    options: ['$0.50', '$1', '$2', '$4', '$6'],
    correctAnswer: 'C',
    explanation:
      'A corrective (Pigouvian) tax equals the marginal external cost, which is $2 per unit. The tax raises the private cost to MPC + $2 = MSC, so the market quantity falls to the efficient level of 2 units.',
    videoExplanation: null,
  },
  {
    id: 25049,
    subject: 'ap_microeconomics',
    unit: 6,
    lessonIDS: ['6.2'],
    unitName: 'Market Failure and the Role of Government',
    question:
      'A good generates a negative externality. The table below shows the marginal private benefit (MPB), marginal private cost (MPC), and marginal external cost for each unit.\n\nWhat is the deadweight loss from the unregulated market outcome?',
    image: null,
    tableData: {
      headers: ['Quantity', 'MPB', 'MPC', 'Marginal External Cost'],
      rows: [
        ['1', '$10', '$2', '$2'],
        ['2', '$8', '$4', '$2'],
        ['3', '$6', '$6', '$2'],
        ['4', '$4', '$8', '$2'],
        ['5', '$2', '$10', '$2'],
      ],
    },
    options: ['$1', '$2', '$4', '$6', '$8'],
    correctAnswer: 'B',
    explanation:
      'The market produces 3 units but the efficient quantity is 2 units. The third unit has marginal social cost of $6 + $2 = $8 and marginal benefit of $6. The deadweight loss is the extra social cost minus the benefit, $8 - $6 = $2.',
    videoExplanation: null,
  },
  {
    id: 25050,
    subject: 'ap_microeconomics',
    unit: 6,
    lessonIDS: ['6.2'],
    unitName: 'Market Failure and the Role of Government',
    question:
      'A good generates a positive externality. The table below shows the marginal private benefit (MPB), marginal external benefit, and marginal cost (MC) for each unit.\n\nHow many units does the unregulated market produce, how many are socially efficient, and what per-unit subsidy would lead the market to the efficient quantity?',
    image: null,
    tableData: {
      headers: ['Quantity', 'MPB', 'Marginal External Benefit', 'MC'],
      rows: [
        ['1', '$12', '$4', '$7'],
        ['2', '$10', '$4', '$7'],
        ['3', '$8', '$4', '$7'],
        ['4', '$6', '$4', '$7'],
        ['5', '$4', '$4', '$7'],
        ['6', '$2', '$4', '$7'],
      ],
    },
    options: [
      'Market: 3 units; efficient: 5 units; subsidy of $7.',
      'Market: 5 units; efficient: 3 units; tax of $4.',
      'Market: 3 units; efficient: 4 units; subsidy of $2.',
      'Market: 3 units; efficient: 5 units; subsidy of $4.',
      'Market: 4 units; efficient: 6 units; subsidy of $4.',
    ],
    correctAnswer: 'D',
    explanation:
      'The market produces where MPB = MC. The third unit has MPB = $8, above MC = $7. The fourth has MPB = $6, below MC. The market produces 3 units. Marginal social benefit = MPB + external benefit = $16, $14, $12, $10, $8, and $6. The fifth unit has MSB = $8, above MC = $7. The sixth has MSB = $6, below MC. The efficient quantity is 5 units. A subsidy equal to the marginal external benefit ($4 per unit) moves the market to the efficient quantity.',
    videoExplanation: null,
  },
  {
    id: 25051,
    subject: 'ap_microeconomics',
    unit: 6,
    lessonIDS: ['6.3'],
    unitName: 'Market Failure and the Role of Government',
    question:
      "A town is deciding how many units of a public good to provide. Two residents, X and Y, are the only users. The table below shows each resident's marginal benefit from each additional unit. Each unit costs $9 to provide.\n\nHow many units should the town provide to be economically efficient?",
    image: null,
    tableData: {
      headers: ['Unit', 'Marginal Benefit to X', 'Marginal Benefit to Y'],
      rows: [
        ['1', '$8', '$6'],
        ['2', '$6', '$4'],
        ['3', '$4', '$2'],
        ['4', '$2', '$0'],
      ],
    },
    options: ['1 unit.', '2 units.', '3 units.', '4 units.', '0 units.'],
    correctAnswer: 'B',
    explanation:
      "For a public good, the marginal social benefit is the sum of everyone's marginal benefit because all residents consume the same unit. MSB is $14, $10, $6, and $2 for units 1 through 4. Provide units while MSB is at least the $9 marginal cost. The second unit has MSB = $10, which is above $9. The third unit has MSB = $6, which is below $9. The efficient quantity is 2 units.",
    videoExplanation: null,
  },
];
