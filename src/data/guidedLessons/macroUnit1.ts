import type { GuidedLessonContent } from './types';

const EQ = 'Equilibrium, Disequilibrium, and Changes in Equilibrium 1 copy';

/** AP Macro Unit 1: Basic Economic Concepts. */
export const macroUnit1GuidedLessons: GuidedLessonContent[] = [
  {
    lessonId: '1.1',
    unit: 1,
    slug: 'scarcity',
    brief:
      'Scarcity is the basic problem of economics: our wants are unlimited, but the resources we use to satisfy them are limited. Because of scarcity, every person, business and government has to make choices about how to use what it has.\n\n' +
      'Resources are the inputs used to make goods and services. Economists group them into four factors of production: land (natural resources), labor (human effort), capital (human-made tools, machines and buildings used to produce other things) and entrepreneurship (bringing the other three together and taking the risk). Money is not capital in economics; it only buys resources.\n\n' +
      'Microeconomics studies how individuals and firms deal with scarcity. Macroeconomics studies how whole economies deal with it. Every economy has to answer the same questions: what to produce, how to produce it, and who gets it. In a market economy, buyers and sellers answer those questions through prices; in a command economy, the government decides.',
    coreQuestion:
      'Explain what scarcity is and why it forces every economy to make choices. Then name the four factors of production and give one real example of any of them.',
    rubric: [
      {
        id: 'scarcity',
        criterion: 'Defines scarcity as limited resources compared with unlimited wants.',
      },
      {
        id: 'choice',
        criterion:
          'Explains that because resources are limited, an economy cannot have everything it wants, so it must choose what to produce and give up other things.',
      },
      {
        id: 'factors',
        criterion:
          'Names all four factors of production (land, labor, capital, entrepreneurship) and gives one correct example of one of them (money or stocks do not count as capital).',
      },
    ],
    passMark: 3,
    modelAnswer:
      'Scarcity means our wants are unlimited but the resources available to satisfy them are limited. Since an economy can never produce everything people want, it has to choose what to make, and choosing one thing means giving up something else. The four factors of production are land, labor, capital and entrepreneurship. For example, a delivery truck is capital, because it is a human-made tool used to produce a service.',
    walkthrough: [
      {
        kicker: 'The basic problem',
        title: 'Limited resources, unlimited wants',
        boards: ['scarcity 7'],
        terms: ['Scarcity'],
        note: 'Scarcity is not the same as being poor. Even the richest person or country cannot have everything it wants.',
      },
      {
        kicker: 'The basic problem',
        title: 'Everyone has to choose',
        boards: ['scarcity 10'],
        terms: ['Microeconomics', 'Macroeconomics'],
        note: 'A government chooses between education, defense and infrastructure. A person chooses how to spend a paycheck. A company chooses which products to make.',
      },
      {
        kicker: 'Resources',
        title: 'Resources are inputs',
        boards: ['scarcity 13', 'scarcity 15'],
        terms: ['Resources', 'Factors of Production'],
      },
      {
        kicker: 'The four factors',
        title: 'Land and labor',
        boards: ['scarcity 16', 'scarcity 17'],
        terms: ['Land', 'Labor'],
      },
      {
        kicker: 'The four factors',
        title: 'Capital and entrepreneurship',
        boards: ['scarcity 18', 'scarcity 19'],
        terms: ['Capital', 'Physical Capital', 'Human Capital', 'Entrepreneurship'],
        note: 'Money is not capital. Capital is the machine, building or tool the money buys.',
      },
      {
        kicker: 'Who decides',
        title: 'What, how and for whom',
        boards: [],
        terms: [],
        note: 'Every economy must decide what to produce, how to produce it and who gets it. In a market economy, buyers and sellers decide through prices. In a command economy, the government decides.',
      },
    ],
    checkQuestionIds: [1, 147, 148],
  },
  {
    lessonId: '1.2',
    unit: 1,
    slug: 'production-possibilities-curve',
    brief:
      'Because of scarcity, every choice has an opportunity cost: the value of the next best alternative you give up. The production possibilities curve (PPC) shows this for a whole economy. It shows every combination of two goods the economy can make when it uses all of its resources efficiently.\n\n' +
      'Points on the curve are efficient. Points inside the curve mean resources are unemployed or wasted. Points outside the curve are unattainable with current resources and technology. Moving along the curve to get more of one good means giving up some of the other, and the amount given up is the opportunity cost.\n\n' +
      'A straight-line PPC means constant opportunity cost: resources are equally good at making both goods. A curve that bows out means increasing opportunity cost: resources are specialized, so each extra unit of one good costs more and more of the other.\n\n' +
      'The whole PPC shifts out when the economy gains more or better resources or better technology. That is economic growth. It shifts in after events like natural disasters or war. A fall in unemployment does not shift the curve; it moves the economy from inside the curve toward it.',
    coreQuestion:
      'A country produces only robots and corn. Explain what a point inside its PPC means and what a point on the curve means. Then explain why the PPC would be bowed out rather than a straight line.',
    rubric: [
      {
        id: 'points',
        criterion:
          'States that a point inside the curve means resources are unemployed or used inefficiently, and a point on the curve means all resources are used efficiently (productive efficiency).',
      },
      {
        id: 'shape',
        criterion:
          'Explains that a bowed-out PPC shows increasing opportunity cost because resources are not equally suited (not perfectly adaptable) to producing both goods.',
      },
    ],
    passMark: 2,
    modelAnswer:
      'A point inside the PPC means the country is not using all of its resources or is using them inefficiently, for example because of unemployment. A point on the curve means it is using all of its resources efficiently, so it can only make more of one good by giving up some of the other. The PPC is bowed out because resources are not equally good at making robots and corn. As the country makes more corn, it has to move resources that are better at making robots, so each extra unit of corn costs more robots. That is increasing opportunity cost.',
    walkthrough: [
      {
        kicker: 'Opportunity cost',
        title: 'Every choice gives something up',
        boards: [],
        terms: ['Trade-off', 'Opportunity Cost'],
        note: 'Opportunity cost is only the next best alternative, not everything you could have done. If you study instead of working a shift, the cost is the wages you did not earn.',
      },
      {
        kicker: 'The PPC',
        title: 'The curve shows maximum potential output',
        boards: ['PPC 2'],
        terms: ['Production Possibilities Curve (PPC)'],
        note: 'Moving from L to M means more corn and fewer robots. The robots given up are the opportunity cost of the extra corn.',
      },
      {
        kicker: 'Reading points',
        title: 'On, inside and outside the curve',
        boards: ['PPC 5'],
        terms: ['Underutilization', 'Unattainable Point', 'Allocative Efficiency'],
        note: 'Every point on the curve is productively efficient. Only one of them is allocatively efficient: the mix society values most.',
      },
      {
        kicker: 'The shape',
        title: 'Bowed out: increasing opportunity cost',
        boards: ['PPC 3'],
        terms: ['Increasing Opportunity Cost'],
      },
      {
        kicker: 'The shape',
        title: 'Straight line: constant opportunity cost',
        boards: ['PPC 4'],
        terms: ['Constant Opportunity Cost'],
      },
      {
        kicker: 'Shifts',
        title: 'What moves the whole curve',
        boards: ['PPC 6'],
        terms: ['Outward Shift (PPC)', 'Inward Shift (PPC)'],
        note: 'Lower unemployment does not shift the curve. It moves the economy from a point inside toward the curve.',
      },
    ],
    checkQuestionIds: [2108, 2129, 4],
  },
  {
    lessonId: '1.3',
    unit: 1,
    slug: 'comparative-advantage',
    videoId: '35',
    brief:
      'Absolute advantage means being able to produce more of a good with the same resources, or the same amount with fewer resources. Comparative advantage means being able to produce a good at a lower opportunity cost. A country can have an absolute advantage in both goods, but it can never have a comparative advantage in both.\n\n' +
      'There are two kinds of problems. In an output problem, the table shows how much each producer can make, for example tons per year. To find the opportunity cost of one good, divide the other good by it ("other over itself"). In an input problem, the table shows the resources needed per unit, for example hours per unit. Divide the good by the other ("itself over other").\n\n' +
      'Each producer should specialize in the good where it has the comparative advantage and trade for the other. For trade to help both sides, the terms of trade must fall between the two producers\' opportunity costs. When that happens, both can consume combinations beyond their own PPCs.',
    coreQuestion:
      'In one year, Mexico can produce 4 tons of apples or 16 tons of corn. The USA can produce 10 tons of apples or 20 tons of corn. Which country has the comparative advantage in apples? Show the opportunity costs and explain what each country should specialize in.',
    rubric: [
      {
        id: 'costs',
        criterion:
          'Calculates the opportunity cost of 1 ton of apples correctly for both countries: Mexico 4 corn and the USA 2 corn.',
      },
      {
        id: 'advantage',
        criterion:
          'Concludes the USA has the comparative advantage in apples because its opportunity cost is lower, and says the USA should specialize in apples while Mexico specializes in corn.',
      },
    ],
    passMark: 2,
    modelAnswer:
      'For Mexico, 1 ton of apples costs 16 ÷ 4 = 4 tons of corn. For the USA, 1 ton of apples costs 20 ÷ 10 = 2 tons of corn. The USA gives up less corn for each ton of apples, so it has the comparative advantage in apples. The USA should specialize in apples and Mexico should specialize in corn (Mexico\'s corn costs only 0.25 apples per ton compared with 0.5 for the USA), and then they should trade.',
    walkthrough: [
      {
        kicker: 'Two kinds of advantage',
        title: 'Absolute advantage',
        boards: ['ComparativeA 15'],
        terms: ['Absolute Advantage'],
      },
      {
        kicker: 'Two kinds of advantage',
        title: 'Comparative advantage',
        boards: ['ComparativeA 20'],
        terms: ['Comparative Advantage'],
        note: 'Comparative advantage decides who should specialize, even when one producer is better at everything.',
      },
      {
        kicker: 'Two kinds of problems',
        title: 'Output or input?',
        boards: ['ComparativeA 1'],
        terms: [],
        note: 'First check the units. Amounts produced (tons per year) means an output problem. Resources needed (hours per unit) means an input problem.',
      },
      {
        kicker: 'Output problems',
        title: 'Other over itself',
        boards: ['ComparativeA 24', 'ComparativeA 31'],
        terms: ['Output Problem'],
        note: 'Mexico: 1 apple costs 16 ÷ 4 = 4 corn. USA: 1 apple costs 20 ÷ 10 = 2 corn. The USA has the lower cost, so it has the comparative advantage in apples.',
      },
      {
        kicker: 'Input problems',
        title: 'Itself over other',
        boards: ['ComparativeA 25', 'ComparativeA 2'],
        terms: ['Input Problem'],
      },
      {
        kicker: 'Input problems',
        title: 'Working one out',
        boards: ['ComparativeA 3'],
        terms: [],
        note: 'Canada: 1 coffee costs 4 ÷ 8 = 0.5 wheat. Brazil: 1 coffee costs 2 ÷ 6 = 0.33 wheat. Brazil has the comparative advantage in coffee.',
      },
      {
        kicker: 'Gains from trade',
        title: 'Specialize, then trade',
        boards: [],
        terms: ['Terms of Trade'],
        note: 'Terms of trade between the two opportunity costs leave both sides better off. Each can then consume beyond its own PPC.',
      },
    ],
    checkQuestionIds: [5, 2089, 2087],
  },
  {
    lessonId: '1.4',
    unit: 1,
    slug: 'demand',
    videoId: '15',
    brief:
      'Demand is the willingness and ability of consumers to buy a good at each possible price. The law of demand says that when the price of a good rises, the quantity demanded falls, and when the price falls, the quantity demanded rises. That inverse relationship is why the demand curve slopes down.\n\n' +
      'Keep two ideas apart. A change in the good\'s own price causes a change in quantity demanded: a movement along the curve. A change in anything else causes a change in demand: the whole curve shifts. A shift right is an increase in demand; a shift left is a decrease.\n\n' +
      'The five shifters of demand are tastes and preferences, the prices of related goods, income, the number of buyers and buyers\' expectations. Related goods can be substitutes (if tuna gets more expensive, demand for sardines rises) or complements (if hot dogs get more expensive, demand for buns falls). Higher income raises demand for normal goods and lowers it for inferior goods.',
    coreQuestion:
      'Explain the difference between a change in quantity demanded and a change in demand. Then explain what happens to the demand for movie tickets if the price of streaming subscriptions (a substitute) rises.',
    rubric: [
      {
        id: 'difference',
        criterion:
          'Explains that a change in the good\'s own price causes a change in quantity demanded (a movement along the curve), while a change in a non-price factor causes a change in demand (a shift of the curve).',
      },
      {
        id: 'application',
        criterion:
          'States that demand for movie tickets increases (shifts right) because streaming is a substitute and has become relatively more expensive.',
      },
    ],
    passMark: 2,
    modelAnswer:
      'A change in quantity demanded happens only when the price of the good itself changes, so consumers move along the same demand curve. A change in demand happens when a non-price factor changes, such as income or the price of a related good, so the whole demand curve shifts. If streaming subscriptions get more expensive, some people switch to the movies instead, because the two are substitutes. Demand for movie tickets increases and the demand curve shifts right.',
    walkthrough: [
      {
        kicker: 'What demand means',
        title: 'Willing and able to buy',
        boards: ['Demand 6'],
        terms: ['Demand'],
      },
      {
        kicker: 'What demand means',
        title: 'The law of demand',
        boards: ['Demand 8', 'Demand 10'],
        terms: ['Law of Demand', 'Demand Schedule'],
      },
      {
        kicker: 'What demand means',
        title: 'The demand curve slopes down',
        boards: ['Demand 9'],
        terms: ['Demand Curve'],
      },
      {
        kicker: 'Movement or shift?',
        title: 'A change in price moves along the curve',
        boards: ['Demand 12'],
        terms: [],
        note: 'If the good\'s own price changes, the curve stays put. Only the quantity demanded changes.',
      },
      {
        kicker: 'Movement or shift?',
        title: 'Anything else shifts the curve',
        boards: ['Demand 13', 'shifts1'],
        terms: [],
      },
      {
        kicker: 'The five shifters',
        title: 'What shifts demand',
        boards: ['Demand 15'],
        terms: ['Determinants of Demand'],
      },
      {
        kicker: 'The five shifters',
        title: 'Tastes and the prices of related goods',
        boards: ['Demand 18', 'Demand'],
        terms: ['Substitutes', 'Complements'],
        note: 'Tuna and sardines are substitutes, so when tuna gets more expensive, demand for sardines rises.',
      },
      {
        kicker: 'The five shifters',
        title: 'Income',
        boards: ['Demand 27'],
        terms: ['Normal Good', 'Inferior Good'],
        note: 'A raise lets people buy more cars (a normal good) and fewer bus tickets (an inferior good).',
      },
      {
        kicker: 'The five shifters',
        title: 'Number of buyers and expectations',
        boards: ['Demand 30', 'Demand 33'],
        terms: [],
        note: 'If buyers expect home prices to fall soon, they wait, so demand falls today.',
      },
    ],
    checkQuestionIds: [7, 2127, 2128],
  },
  {
    lessonId: '1.5',
    unit: 1,
    slug: 'supply',
    brief:
      'Supply is the willingness and ability of sellers to provide a good at each possible price. The law of supply says that when the price rises, the quantity supplied rises too, because selling becomes more profitable. That positive relationship is why the supply curve slopes up.\n\n' +
      'Just like demand, keep two ideas apart. A change in the good\'s own price causes a change in quantity supplied: a movement along the curve. A change in anything else causes a change in supply: the whole curve shifts. A shift right is an increase in supply; a shift left is a decrease.\n\n' +
      'The main shifters of supply are the cost of inputs, technology, the number of sellers, sellers\' expectations, the prices of other goods the seller could make, and government action such as taxes, subsidies and regulations. Anything that makes production cheaper or easier increases supply; anything that makes it costlier decreases supply.',
    coreQuestion:
      'Explain the difference between a change in quantity supplied and a change in supply. Then explain what happens to the supply of T-shirts if the price of cotton rises.',
    rubric: [
      {
        id: 'difference',
        criterion:
          'Explains that a change in the good\'s own price causes a change in quantity supplied (a movement along the curve), while a change in a non-price factor causes a change in supply (a shift of the curve).',
      },
      {
        id: 'application',
        criterion:
          'States that the supply of T-shirts decreases (shifts left) because cotton is an input, so production costs rise.',
      },
    ],
    passMark: 2,
    modelAnswer:
      'A change in quantity supplied happens only when the price of the good itself changes, so sellers move along the same supply curve. A change in supply happens when a non-price factor changes, like input costs or technology, so the whole supply curve shifts. Cotton is an input for T-shirts, so when cotton gets more expensive it costs more to make each shirt. The supply of T-shirts decreases and the supply curve shifts left.',
    walkthrough: [
      {
        kicker: 'What supply means',
        title: 'Willing and able to sell',
        boards: ['supply 4'],
        terms: ['Supply'],
      },
      {
        kicker: 'What supply means',
        title: 'The law of supply',
        boards: ['supply 5', 'supply 13'],
        terms: ['Law of Supply', 'Supply Schedule'],
        note: 'A higher price makes selling more profitable, so sellers offer more.',
      },
      {
        kicker: 'What supply means',
        title: 'The supply curve slopes up',
        boards: ['supply 10'],
        terms: ['Supply Curve'],
      },
      {
        kicker: 'Movement or shift?',
        title: 'A change in price moves along the curve',
        boards: ['supply 15'],
        terms: [],
      },
      {
        kicker: 'Movement or shift?',
        title: 'Anything else shifts the curve',
        boards: ['supply 17', 'supply 19'],
        terms: [],
      },
      {
        kicker: 'The shifters',
        title: 'What shifts supply',
        boards: ['supply 21'],
        terms: ['Determinants of Supply', 'Technology'],
        note: 'Technology belongs on this list too. Better technology makes production cheaper, so supply increases.',
      },
      {
        kicker: 'The shifters',
        title: 'Cost of inputs and number of sellers',
        boards: ['supply 24', 'supply 27'],
        terms: ['Resource/Input Prices', 'Number of Sellers'],
        note: 'Pricier cotton means fewer T-shirts at every price. A storm that wipes out orchards means fewer apple sellers.',
      },
      {
        kicker: 'The shifters',
        title: 'Expectations and prices of other goods',
        boards: ['supply 30', 'supply 33'],
        terms: ['Expectations', 'Prices of Other Goods'],
        note: 'If sellers expect prices to fall, they sell more now. If pears become more profitable, farmers grow fewer apples.',
      },
      {
        kicker: 'The shifters',
        title: 'Government action',
        boards: ['supply 36'],
        terms: ['Government Actions', 'Subsidy'],
        note: 'A tax raises the cost of selling and decreases supply. A subsidy lowers it and increases supply.',
      },
    ],
    checkQuestionIds: [8, 2131, 2132],
  },
  {
    lessonId: '1.6',
    unit: 1,
    slug: 'market-equilibrium',
    brief:
      'A market is in equilibrium where the demand and supply curves cross: the price at which quantity demanded equals quantity supplied. At that price, everyone who wants to buy can buy and everyone who wants to sell can sell.\n\n' +
      'If the price is above equilibrium, quantity supplied is greater than quantity demanded, so there is a surplus. Sellers cut prices to get rid of unsold goods, and the price falls back toward equilibrium. If the price is below equilibrium, quantity demanded is greater than quantity supplied, so there is a shortage. Buyers compete for the limited goods, and the price rises.\n\n' +
      'When demand or supply shifts, the equilibrium changes. An increase in demand raises both price and quantity. An increase in supply lowers price and raises quantity. When both curves shift at once, one of the two results (price or quantity) is clear and the other is indeterminate, because it depends on which shift is bigger.',
    coreQuestion:
      'The price of ice cream is set above the equilibrium price. Explain what happens in the market and how it returns to equilibrium. Then explain what happens to the equilibrium price and quantity of ice cream if consumer incomes rise and ice cream is a normal good.',
    rubric: [
      {
        id: 'surplus',
        criterion:
          'States that a price above equilibrium creates a surplus (quantity supplied is greater than quantity demanded), and the price falls until the market reaches equilibrium.',
      },
      {
        id: 'shift',
        criterion:
          'States that higher income increases demand for a normal good (demand shifts right), so equilibrium price and quantity both increase.',
      },
    ],
    passMark: 2,
    modelAnswer:
      'At a price above equilibrium, sellers want to sell more ice cream than buyers want to buy, so quantity supplied is greater than quantity demanded and there is a surplus. Sellers lower the price to sell the extra ice cream, and the price keeps falling until quantity demanded equals quantity supplied. If incomes rise and ice cream is a normal good, demand increases and the demand curve shifts right. The equilibrium price and the equilibrium quantity both increase.',
    walkthrough: [
      {
        kicker: 'Equilibrium',
        title: 'Where the curves cross',
        boards: [`${EQ} 12`, `${EQ} 7`],
        terms: ['Market Equilibrium', 'Equilibrium Price', 'Equilibrium Quantity'],
      },
      {
        kicker: 'Disequilibrium',
        title: 'Above and below the equilibrium price',
        boards: [`${EQ} 13`],
        terms: ['Disequilibrium'],
        note: 'Above the equilibrium price, quantity supplied is bigger. Below it, quantity demanded is bigger.',
      },
      {
        kicker: 'Disequilibrium',
        title: 'Surplus: the price is too high',
        boards: [`${EQ} 15`],
        terms: ['Surplus'],
        note: 'At $5, sellers offer 75 cones but buyers want only 25. Sellers cut prices to clear the extra 50.',
      },
      {
        kicker: 'Disequilibrium',
        title: 'Shortage: the price is too low',
        boards: [`${EQ} 16`],
        terms: ['Shortage'],
        note: 'At $1, buyers want 75 cones but sellers offer only 25. Buyers compete for them and push the price up.',
      },
      {
        kicker: 'Back to equilibrium',
        title: 'Prices move the market back',
        boards: [`${EQ} 11`],
        terms: [],
        note: 'Surpluses push prices down and shortages push them up, until quantity demanded equals quantity supplied again.',
      },
      {
        kicker: 'Changes in equilibrium',
        title: 'A demand shift',
        boards: [`${EQ} 18`],
        terms: [],
        note: 'News that ice cream causes cancer decreases demand. Price and quantity both fall.',
      },
      {
        kicker: 'Changes in equilibrium',
        title: 'A supply shift',
        boards: [],
        terms: [],
        note: 'If a disease wipes out dairy cows, the supply of ice cream decreases (shifts left). The equilibrium price rises and the equilibrium quantity falls.',
      },
      {
        kicker: 'Changes in equilibrium',
        title: 'Double shifts',
        boards: [`${EQ} 23`],
        terms: ['Indeterminate Change'],
        note: 'Demand and supply both decrease, so quantity definitely falls. Price could go either way: it depends on which curve shifts more.',
      },
    ],
    checkQuestionIds: [2125, 2126, 10],
  },
];
