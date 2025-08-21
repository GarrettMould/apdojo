import { Question as QuestionType } from '@/data/questionBanks/types';

// Unit Test Questions - Dedicated questions specifically for unit assessments
// Using IDs 1000+ to ensure uniqueness across all question files

export const unitTestQuestions: QuestionType[] = [
  // Unit 1: Basic Economic Concepts
  {
    id: 1014,
    subject: "ap_macroeconomics",
    unit: 1,
    lessonIDS: ["1.5"],
    unitName: "Basic Economic Concepts",
    question: "Which of the following changes would most likely result in a movement from point A to point B along the supply curve for coffee beans?",
    image: { src: "/images/unitTestImages/Q1014.svg", alt: "Supply curve diagram" },
    options: [
      "A decrease in consumer demand for coffee beans",
      "An increase in the market price of coffee beans",
      "An improvement in coffee bean farming technology",
      "A decrease in the number of coffee bean farmers",
      "An increase in taxes on coffee bean production"
    ],
    correctAnswer: "B",
    explanation: "A movement along the supply curve occurs when the price of the good itself changes. In this case, an increase in the market price of coffee beans causes producers to supply more, resulting in a movement along the supply curve. Changes in technology, number of producers, or taxes shift the supply curve instead."
  }, 
  {
    "id": 1001,
    "subject": "ap_macroeconomics",
    "unit": 1,
    "lessonIDS": ["1.2"],
    "unitName": "Basic Economic Concepts",
    "question": "Assume an economy is currently using all of its resources to efficiently produce two goods, widgets and trinkets. As more widgets are produced, what happens to the production trinkets?",
    "image": null,
    "options": [
      "The production of trinkets increases.",
      "The production of trinkets decreases.",
      "The production of trinkets remains unchanged.",
      "The production of trinkets first increases, then decreases.",
      "The production of trinkets will increase if more resources become available."
    ],
    "correctAnswer": "B",
    "explanation": "Because the economy is fully utilizing its resources, producing more widgets requires shifting resources away from trinket production. As a result, the production of trinkets decreases, illustrating the concept of opportunity cost."
  },
  {
    "id": 1002,
    "subject": "ap_macroeconomics",
    "unit": 1,
    "lessonIDS": ["1.1"],
    "unitName": "Basic Economic Concepts",
    "question": "Which of the following best illustrates the concept of scarcity in economics?",
    "image": null,
    "options": [
      "A student choosing between studying for an exam or going to a movie.",
      "A business deciding whether to expand or save money.",
      "A government choosing between building roads or schools.",
      "All of the above.",
      "None of the above."
    ],
    "correctAnswer": "D",
    "explanation": "Scarcity exists because resources are limited while wants are unlimited. All three scenarios demonstrate scarcity - the student has limited time, the business has limited capital, and the government has limited tax revenue. Each must make choices about resource allocation."
  },
  {
    "id": 1003,
    "subject": "ap_macroeconomics",
    "unit": 1,
    "lessonIDS": ["1.3"],
    "unitName": "Basic Economic Concepts",
    "question": "Country Alpha can produce either 100 cars or 200 computers. Country Beta can produce either 80 cars or 160 computers. Which statement is correct?",
    "image": null,
    "options": [
      "Country Alpha has an absolute advantage in both goods.",
      "Country Beta has a comparative advantage in cars.",
      "Country Alpha has a comparative advantage in computers.",
      "Both countries should specialize in the same good.",
      "Neither country has a comparative advantage."
    ],
    "correctAnswer": "A",
    "explanation": "Country Alpha can produce more of both goods (100 cars vs 80 cars, 200 computers vs 160 computers), giving it an absolute advantage in both. However, to determine comparative advantage, we need to calculate opportunity costs for each good."
  },
  {
    "id": 1004,
    "subject": "ap_macroeconomics",
    "unit": 1,
    "lessonIDS": ["1.4"],
    "unitName": "Basic Economic Concepts",
    "question": "If the price of coffee increases significantly, what would most likely happen to the demand for tea, assuming they are substitutes?",
    "image": null,
    "options": [
      "Demand for tea would decrease.",
      "Demand for tea would increase.",
      "Demand for tea would remain unchanged.",
      "Supply of tea would increase.",
      "Supply of tea would decrease."
    ],
    "correctAnswer": "B",
    "explanation": "When the price of coffee increases, consumers will likely substitute tea for coffee, causing an increase in the demand for tea. This is a classic example of the substitution effect in consumer behavior."
  },
  {
    "id": 1005,
    "subject": "ap_macroeconomics",
    "unit": 1,
    "lessonIDS": ["1.5"],
    "unitName": "Basic Economic Concepts",
    "question": "Which of the following would cause the supply curve for electric vehicles to shift to the left?",
    "image": null,
    "options": [
      "A decrease in the price of electric vehicle batteries.",
      "An increase in government subsidies for electric vehicle production.",
      "A rise in the wages of electric vehicle factory workers.",
      "An improvement in electric vehicle production technology.",
      "A decrease in consumer demand for electric vehicles."
    ],
    "correctAnswer": "C",
    "explanation": "A leftward shift in supply indicates a decrease in supply. Higher wages increase production costs, making it more expensive to produce electric vehicles at each price level, thus reducing supply."
  },
  {
    "id": 1006, 
    "subject": "ap_microeconomics",
    "unit": 1,
    "lessonIDS": ["1.3"],
    "unitName": "Basic Economic Concepts",
    "question": "Which of the following best describes the effect of specialization and trade on an economy?",
    "image": null,
    "options": [
      "Countries are able to consume at levels beyond their production possibilities curve.", // Correct
      "A nation must possess both comparative and absolute advantage in a good to benefit from trade.",
      "Specialization and trade shift a nation's production possibilities curve outward.",
      "Gains from trade occur only when countries specialize in goods where they hold an absolute advantage.",
      "Through specialization and trade, a nation produces a combination of goods that lies outside its production possibilities curve."
    ],
    "correctAnswer": "A",
    "explanation": "Specialization and trade allow countries to consume combinations of goods beyond their production possibilities curve because they can trade for goods they do not produce as efficiently. Option B is incorrect because only comparative advantage is necessary, not absolute advantage. Option C is incorrect because specialization and trade do not shift the PPC itself, they allow consumption beyond it. Option D is wrong since absolute advantage alone does not determine gains from trade. Option E misstates the effect—trade changes consumption possibilities, not production."
  }, 
  {
    id: 1007,
    subject: "ap_microeconomics",
    unit: 1,
    lessonIDS: ["1.6"],
    unitName: "Basic Economic Concepts",
    question: "Consider a standard supply and demand graph for a particular good. At the price level labeled P1, which of the following outcomes is most likely?",
    image: { src: "/images/unitTestImages/Q1007.svg", alt: "Supply and demand graph" },
    options: [
      "A surplus exists, causing upward pressure on price.", 
      "A shortage exists, causing downward pressure on price.", 
      "Both demand and supply will immediately shift in opposite directions.", 
      "A shortage exists, causing upward pressure on price.", // Correct
      "A surplus exists, causing downward pressure on price."
    ],
    correctAnswer: "D",
    explanation: "At price P1, quantity demanded exceeds quantity supplied, meaning there is a shortage. In competitive markets, shortages place upward pressure on prices until equilibrium is restored."
  },
  {
    id: 1008,
    subject: "ap_macroeconomics",
    unit: 1,
    lessonIDS: ["1.5"],
    unitName: "Basic Economic Concepts",
    question: "The graph below shows a decrease in supply as the result of unavailable key resources. Which of the following best describes the change in equilibrium price and equilibrium quantity?",
    image: { src: "/images/unitTestImages/Q1008.svg", alt: "Supply curve shift graph" }, 
    options: [
      "Equilibrium price increases and equilibrium quantity decreases.", // Correct
      "Equilibrium price decreases and equilibrium quantity increases.",
      "Both equilibrium price and equilibrium quantity increase.",
      "Both equilibrium price and equilibrium quantity decrease.",
      "Equilibrium price remains constant while equilibrium quantity decreases."
    ],
    correctAnswer: "A",
    explanation: "A leftward shift of supply represents a decrease in supply. With demand constant, this raises equilibrium price and lowers equilibrium quantity."
  },
  {
    id: 1009,
    subject: "ap_macroeconomics",
    unit: 1,
    lessonIDS: ["1.6"],
    unitName: "Basic Economic Concepts",
    question: "Which of the following combinations of events could explain the shifts shown in the graph below?",
    image: { src: "/images/unitTestImages/Q1009.svg", alt: "Demand and supply shifts graph" },
    options: [
      "Consumer incomes rise and the cost of raw materials increases.", // Correct
      "A fall in input prices and a decrease in population.",
      "Technological improvements and a decline in consumer preferences.",
      "An increase in subsidies for producers and higher interest rates reducing demand.",
      "Lower wages for workers and reduced consumer confidence."
    ],
    correctAnswer: "A",
    explanation: "A rightward shift in demand occurs when consumer demand rises (such as from higher incomes), while a leftward shift in supply occurs when it becomes more costly to produce (such as from higher input costs)."
  }, 
  {
    id: 1010,
    subject: "ap_macroeconomics",
    unit: 1,
    lessonIDS: ["1.3"],
    unitName: "Basic Economic Concepts",
    question: "The table above shows the maximum output of oranges and potatoes in one year for Alpha and Beta. If both countries specialize according to comparative advantage and trade, which country will import oranges?",
    image: { src: "/images/unitTestImages/Q1010.svg", alt: "Production possibilities table" },
    options: [
      "Neither country, since both have an absolute advantage in at least one good.",
      "Both countries will import oranges.",
      "Alpha, because it gives up more potatoes to produce oranges.",
      "Beta, because it gives up more potatoes to produce oranges.", // Correct
      "There is not enough information to determine trade patterns."
    ],
    correctAnswer: "D",
    explanation: "Alpha has a lower opportunity cost of producing oranges (1.33 potatoes per orange) compared to Beta (2 potatoes per orange), so Alpha will specialize in oranges. Beta will specialize in potatoes and import oranges from Alpha."
  }, 
  {
    id: 1011,
    subject: "ap_macroeconomics",
    unit: 1,
    lessonIDS: ["1.3"],
    unitName: "Basic Economic Concepts",
    question: "Based on the PPCs for Gondwana and Pangea shown above, which country has the comparative advantage in producing trinkets?",
    image: { src: "/images/unitTestImages/Q1011.svg", alt: "PPC comparison graph" },
    options: [
      "Gondwana",
      "Pangea",            // Correct
      "Both countries",
      "Neither country",
      "The country with the absolute advantage in trinkets"
    ],
    correctAnswer: "B",
    explanation: "Comparative advantage is determined by lower opportunity cost. From the graph, Gondwana's intercepts are 120 widgets and 60 trinkets, so the opportunity cost of 1 trinket is 120/60 = 2 widgets. Pangea's intercepts are 80 widgets and 100 trinkets, so its cost per trinket is 80/100 = 0.8 widgets. Because 0.8 < 2, Pangea has the comparative advantage in producing trinkets."
  }, 
  {
    id: 1012,
    subject: "ap_macroeconomics",
    unit: 1,
    lessonIDS: ["1.6"],
    unitName: "Basic Economic Concepts",
    question: "Suppose the demand for electric scooters rises due to a new urban commuting trend, while the supply of electric scooters also increases because of improvements in production technology. How will the equilibrium price and quantity of electric scooters be affected?",
    image: null,
    options: [
      "Equilibrium price increases, equilibrium quantity increases.",
      "Equilibrium price decreases, equilibrium quantity increases.",
      "Equilibrium price is indeterminate, equilibrium quantity increases.",
      "Equilibrium price decreases, equilibrium quantity decreases.",
      "Equilibrium price and quantity remain unchanged."
    ],
    correctAnswer: "C",
    explanation: "When both demand and supply increase, equilibrium quantity definitely rises. However, the effect on equilibrium price depends on which shift is larger. If demand increases more, price rises; if supply increases more, price falls. Therefore, the change in equilibrium price is indeterminate."
  }, 
  {
    id: 1013,
    subject: "ap_macroeconomics",
    unit: 1,
    lessonIDS: ["1.4"],
    unitName: "Basic Economic Concepts",
    question: "Which of the following would lead to a movement along the demand curve for bottled water, resulting in an increase in the quantity demanded?",
    image: null,
    options: [
      "An increase in consumers' income",
      "An increase in the price of soda, a substitute good",
      "An increase in the price of reusable water bottles, a complementary good",
      "A decrease in the price of bottled water",
      "A decrease in the number of consumers buying bottled water"
    ],
    correctAnswer: "D",
    explanation: "A movement along the demand curve occurs when the price of the good itself changes. In this case, a decrease in the price of bottled water increases the quantity demanded. Changes in income, prices of related goods, or the number of consumers shift the demand curve rather than causing movement along it."
  }, 

  {
    id: 1015,
    subject: "ap_macroeconomics",
    unit: 1,
    lessonIDS: ["1.4"],
    unitName: "Basic Economic Concepts",
    question: "Country A can produce 10 tons of wheat using 5 workers, while Country B can produce 8 tons of wheat using 5 workers. Which of the following best describes what it means for Country A to have an absolute advantage in wheat production?",
    image: null,
    options: [
      "Country A can produce more wheat than Country B using the same amount of resources.",
      "Country A can produce wheat at a lower opportunity cost than Country B.",
      "Country A should trade wheat for goods it produces less efficiently.",
      "Country A cannot produce as much wheat as Country B.",
      "Country A and Country B produce the same amount of wheat with equal resources."
    ],
    correctAnswer: "A",
    explanation: "Absolute advantage occurs when a country can produce more of a good than another country using the same quantity of resources. In this case, Country A produces 10 tons of wheat with 5 workers, more than Country B's 8 tons with the same number of workers."
  }
];

// Helper function to get unit test questions for a specific unit
export const getUnitTestQuestions = (unitNumber: number): QuestionType[] => {
  return unitTestQuestions.filter(q => q.unit === unitNumber);
};

// Export individual unit tests
export const unit1TestQuestions = getUnitTestQuestions(1);
export const unit2TestQuestions = getUnitTestQuestions(2);
export const unit3TestQuestions = getUnitTestQuestions(3);
export const unit4TestQuestions = getUnitTestQuestions(4);
export const unit5TestQuestions = getUnitTestQuestions(5);
export const unit6TestQuestions = getUnitTestQuestions(6);
