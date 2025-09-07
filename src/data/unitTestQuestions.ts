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
    explanation: "A movement along the supply curve occurs when the price of the good itself changes. In this case, an increase in the market price of coffee beans causes producers to supply more, resulting in a movement along the supply curve. Changes in technology, number of producers, or taxes shift the supply curve instead.",
    explanationVideo: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/Unit_MCQ_Explanations/U1Q1.mp4"
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
    "explanation": "Because the economy is fully utilizing its resources, producing more widgets requires shifting resources away from trinket production. As a result, the production of trinkets decreases, illustrating the concept of opportunity cost.",
    explanationVideo: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/Unit_MCQ_Explanations/U1Q2.mp4"
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
    "explanation": "Scarcity exists because resources are limited while wants are unlimited. All three scenarios demonstrate scarcity - the student has limited time, the business has limited capital, and the government has limited tax revenue. Each must make choices about resource allocation.",
    explanationVideo: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/Unit_MCQ_Explanations/U1Q3.mp4"
  },
  {
    "id": 1003,
    "subject": "ap_macroeconomics",
    "unit": 1,
    "lessonIDS": ["1.3"],
    "unitName": "Basic Economic Concepts",
    "question": "Country Alpha can produce either 150 cars or 200 computers. Country Beta can produce either 80 cars or 160 computers. Which statement is correct?",
    "image": null,
    "options": [
      "Country Beta has a comparative advantage in cars.",
      "Country Alpha has a comparative advantage in computers.",
      "Both countries should specialize in the same good.",
      "Country Alpha has an absolute advantage in both goods.",
      "Neither country has a comparative advantage."
    ],
    "correctAnswer": "D",
    "explanation": "Country Alpha can produce more of both goods (150 cars vs 80 cars, 200 computers vs 160 computers), giving it an absolute advantage in both.",
    explanationVideo: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/Unit_MCQ_Explanations/U1Q4.mp4"
  },
  {
    "id": 1004,
    "subject": "ap_macroeconomics",
    "unit": 1,
    "lessonIDS": ["1.4"],
    "unitName": "Basic Economic Concepts",
    "question": "If the price of coffee increases significantly, which of the following would most likely happen, assuming coffee and tea are substitutes?",
    "image": null,
    "options": [
      "Demand for coffee would decrease.",
      "Demand for tea would increase.",
      "Demand for tea would remain unchanged.",
      "Demand for tea would increase.",
      "Supply of tea would decrease."
    ],
    "correctAnswer": "D",
    "explanation": "When the price of coffee increases, consumers will likely substitute tea for coffee, causing an increase in the demand for tea. This is a classic example of the substitution effect in consumer behavior.",
    explanationVideo: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/Unit_MCQ_Explanations/U1Q5.mp4"
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
    "explanation": "A leftward shift in supply indicates a decrease in supply. Higher wages increase production costs, making it more expensive to produce electric vehicles at each price level, thus reducing supply.",
    explanationVideo: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/Unit_MCQ_Explanations/U1Q6.mp4"
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
      "A nation must possess both comparative and absolute advantage in a good to benefit from trade.",
      "Specialization and trade shift a nation's production possibilities curve outward.",
      "Countries are able to consume at levels beyond their production possibilities curve.", 
      "Gains from trade occur only when countries specialize in goods where they hold an absolute advantage.",
      "Through specialization and trade, a nation produces a combination of goods that lies outside its production possibilities curve."
    ],
    "correctAnswer": "C",
    "explanation": "Specialization and trade allow countries to consume combinations of goods beyond their production possibilities curve because they can trade for goods they do not produce as efficiently. Option B is incorrect because only comparative advantage is necessary, not absolute advantage. Option C is incorrect because specialization and trade do not shift the PPC itself, they allow consumption beyond it. Option D is wrong since absolute advantage alone does not determine gains from trade. Option E misstates the effect—trade changes consumption possibilities, not production.",
    explanationVideo: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/Unit_MCQ_Explanations/U1Q7.mp4"
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
    explanation: "At price P1, quantity demanded exceeds quantity supplied, meaning there is a shortage. In competitive markets, shortages place upward pressure on prices until equilibrium is restored.",
    explanationVideo: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/Unit_MCQ_Explanations/U1Q8.mp4"
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
    explanation: "A leftward shift of supply represents a decrease in supply. With demand constant, this raises equilibrium price and lowers equilibrium quantity.",
    explanationVideo: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/Unit_MCQ_Explanations/U1Q9.mp4"
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
      "Lower wages for workers and reduced consumer confidence.",// Correct
      "A rise in input prices and a decrease in population.",
      "Technological improvements and a decline in consumer preferences.",
      "An increase in subsidies for producers and higher interest rates reducing demand.",
      "An increase in the cost of raw materials and a rise in consumer income.",
    ],
    correctAnswer: "E",
    explanation: "A rightward shift in demand occurs when consumer demand rises (such as from higher incomes), while a leftward shift in supply occurs when it becomes more costly to produce (such as from higher input costs).",
    explanationVideo: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/Unit_MCQ_Explanations/U1Q10.mp4"
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
    explanation: "Alpha has a lower opportunity cost of producing oranges (1.33 potatoes per orange) compared to Beta (2 potatoes per orange), so Alpha will specialize in oranges. Beta will specialize in potatoes and import oranges from Alpha.",
    explanationVideo: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/Unit_MCQ_Explanations/U1Q11.mp4"
  }, 
  {
    id: 1011,
    subject: "ap_macroeconomics",
    unit: 1,
    lessonIDS: ["1.3"],
    unitName: "Basic Economic Concepts",
    question: "Based on the PPCs for Gondwana and Pangea shown below, which country has the comparative advantage in producing trinkets?",
    image: { src: "/images/unitTestImages/Q1011.svg", alt: "PPC comparison graph" },
    options: [
      "Gondwana",
      "Pangea",            // Correct
      "Both countries",
      "Neither country",
      "The country with the absolute advantage in trinkets"
    ],
    correctAnswer: "B",
    explanation: "Comparative advantage is determined by lower opportunity cost. From the graph, Gondwana's intercepts are 120 widgets and 60 trinkets, so the opportunity cost of 1 trinket is 120/60 = 2 widgets. Pangea's intercepts are 80 widgets and 100 trinkets, so its cost per trinket is 80/100 = 0.8 widgets. Because 0.8 < 2, Pangea has the comparative advantage in producing trinkets.",
    explanationVideo: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/Unit_MCQ_Explanations/U1Q12.mp4"
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
    explanation: "When both demand and supply increase, equilibrium quantity definitely rises. However, the effect on equilibrium price depends on which shift is larger. If demand increases more, price rises; if supply increases more, price falls. Therefore, the change in equilibrium price is indeterminate.",
    explanationVideo: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/Unit_MCQ_Explanations/U1Q13.mp4"
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
    explanation: "A movement along the demand curve occurs when the price of the good itself changes. In this case, a decrease in the price of bottled water increases the quantity demanded. Changes in income, prices of related goods, or the number of consumers shift the demand curve rather than causing movement along it.",
    explanationVideo: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/Unit_MCQ_Explanations/U1Q14.mp4"
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
      "Country A cannot produce as much wheat as Country B.",
      "Country A can produce wheat at a lower opportunity cost than Country B.",
      "Country A should trade wheat for goods it produces less efficiently.",
      "Country A can produce more wheat than Country B using the same amount of resources.",
      "Country A and Country B produce the same amount of wheat with equal resources."
    ],
    correctAnswer: "D",
    explanation: "Absolute advantage occurs when a country can produce more of a good than another country using the same quantity of resources. In this case, Country A produces 10 tons of wheat with 5 workers, more than Country B's 8 tons with the same number of workers.",
    explanationVideo: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/Unit_MCQ_Explanations/U1Q15.mp4"
  },
  
  // Unit 2: Economic Indicators and the Business Cycle
  {
    id: 1026,
    subject: "ap_macroeconomics",
    unit: 2,
    lessonIDS: ["2.4"],
    unitName: "Economic Indicators and the Business Cycle",
    question: "The table below shows the Consumer Price Index for selected years. What was the inflation rate between 1994 and 1995?",
    image: { src: "/images/unitTestImages/unit2/unit2CPI.svg", alt: "Consumer Price Index table" },
    options: [
      "2.4%",
      "3.2%",
      "4.0%",
      "5.2%"
    ],
    correctAnswer: "B",
     explanationVideo: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/Unit_MCQ_Explanations/U2Q1.mp4"
  }, 
  {
    id: 1016,
    subject: "ap_macroeconomics",
    unit: 2,
    lessonIDS: ["2.1"],
    unitName: "Economic Indicators and the Business Cycle",
    question: "Which of the following would be included in the calculation of GDP?",
    image: null,
    options: [
      "A used car sold by a private individual",
      "A new car produced and sold by a manufacturer",
      "Government transfer payments to retirees",
      "The sale of stocks and bonds",
      "Unpaid household work"
    ],
    correctAnswer: "B",
    explanation: "GDP includes only the value of final goods and services produced within a country's borders in a given time period. A new car produced and sold counts, but used car sales, transfer payments, financial transactions, and unpaid work do not.",
    explanationVideo: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/Unit_MCQ_Explanations/U2Q2.mp4"
  },
  {
    id: 1021,
    subject: "ap_macroeconomics",
    unit: 2,
    lessonIDS: ["2.3"],
    unitName: "Economic Indicators and the Business Cycle",
    question: "The table below shows labor market data for Country X. Based on the information provided, which of the following is true?",
    image: { src: "/images/unitTestImages/unit2/unit2UE.svg", alt: "Labor market data for Country X" },
    options: [
      "Country X has an unemployment rate of 20%",
      "Country X has a labor force participation rate of 75%",
      "Country X has an actual rate of unemployment that is greater than the natural rate of unemployment",
      "The labor force in Country X equals 310",
      "The discouraged workers in Country X contribute to the unemployment rate"
    ],
    correctAnswer: "B",
    explanation: "The labor force participation rate is the labor force divided by the adult population. In this case, the labor force is 300 and the adult population is 400, so the labor force participation rate is 300/400 = 75%.",
    explanationVideo: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/Unit_MCQ_Explanations/U2Q3.mp4"
  },
  {
    id: 1017,
    subject: "ap_macroeconomics",
    unit: 2,
    lessonIDS: ["2.2"],
    unitName: "Economic Indicators and the Business Cycle",
    question: "Which of the following is a limitation of using GDP as a measure of economic well-being?",
    image: null,
    options: [
      "GDP does not account for inflation",
      "GDP measures total output accurately",
      "GDP accounts for income distribution",
      "GDP includes only market transactions",
      "GDP includes environmental costs"
    ],
    correctAnswer: "D",
    explanation: "GDP only measures market transactions and excludes important factors like unpaid household work, volunteer work, and the underground economy, which limits its ability to fully measure economic well-being.",
    explanationVideo: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/Unit_MCQ_Explanations/U2Q4.mp4"
  },
  {
    "id": 1018,
    "subject": "ap_macroeconomics",
    "unit": 2,
    "lessonIDS": ["2.3"],
    "unitName": "Economic Indicators and the Business Cycle",
    "question": "If the number of discouraged workers increases, what happens to the unemployment rate and the labor force participation rate?",
    "image": null,
    "options": [
      "The unemployment rate increases and the labor force participation rate increases",
      "The unemployment rate remains unchanged and the labor force participation rate decreases",
      "The unemployment rate decreases and the labor force participation rate decreases",
      "The unemployment rate decreases and the labor force participation rate remains unchanged",
      "The unemployment rate becomes zero and the labor force participation rate decreases"
    ],
    "correctAnswer": "C",
    "explanation": "Discouraged workers stop looking for work, so they are no longer counted in the labor force. This reduces both the numerator (unemployed) and the denominator (labor force) of the unemployment rate, causing the unemployment rate to decrease. At the same time, the labor force participation rate decreases because fewer people are counted as part of the labor force.",
    explanationVideo: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/Unit_MCQ_Explanations/U2Q5.mp4"
  },
  {
    id: 1019,
    subject: "ap_macroeconomics",
    unit: 2,
    lessonIDS: ["2.4"],
    unitName: "Economic Indicators and the Business Cycle",
    question: "The Consumer Price Index (CPI) in an economy was 150 in 1995, 165 in 1996, 174 in 1997, and 180 in 1998. Which of the following is true about inflation during this period?",
    image: null,
    options: [
      "The economy experienced deflation between 1997 and 1998.",
      "The economy experienced disinflation from 1996 to 1998.",
      "The economy experienced constant inflation of 10% per year.",
      "The economy experienced hyperinflation after 1997.",
      "The economy experienced deflation between 1995 and 1996."
    ],
    correctAnswer: "B",
    explanation: "Inflation was positive each year (prices increased), but the rate of inflation slowed down. From 1995 to 1996, inflation was 10%. From 1996 to 1997, it was 5%, and from 1997 to 1998, it was 3%. A slowing inflation rate is called disinflation.",
    explanationVideo: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/Unit_MCQ_Explanations/U2Q6.mp4"
  },
  {
    id: 1020,
    subject: "ap_macroeconomics",
    unit: 2,
    lessonIDS: ["2.7"],
    unitName: "Economic Indicators and the Business Cycle",
    question: "During the expansion phase of the business cycle, which of the following typically occurs?",
    image: null,
    options: [
      "Unemployment increases",
      "Real GDP decreases",
      "Consumer spending increases",
      "Business investment decreases",
      "Price levels fall"
    ],
    correctAnswer: "C",
    explanation: "During the expansion phase, economic activity increases, leading to higher employment, rising real GDP, increased consumer spending, and higher business investment. Price levels typically rise rather than fall.",
    explanationVideo: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/Unit_MCQ_Explanations/U2Q7.mp4"
  }, 
  {
    id: 1022,
    subject: "ap_macroeconomics",
    unit: 2,
    lessonIDS: ["2.6"],
    unitName: "Economic Indicators and the Business Cycle",
    question: "According to the data in the table below, in which year was real gross domestic product (RGDP) the largest?",
    image: { src: "/images/unitTestImages/unit2/unit2GDPDeflator.svg", alt: "RGDP data table" },
    options: [
      "1975",
      "1976",
      "1977",
      "1978",
      "1979"
    ],
    correctAnswer: "E"
  }, 
  {
    id: 1023,
    subject: "ap_macroeconomics",
    unit: 2,
    lessonIDS: ["2.6"],
    unitName: "Economic Indicators and the Business Cycle",
    question: "Country X produces only t-shirts and sweaters. The following table provides information about the prices and quantities of both products in two years. \n\nAssuming year 1 is the base year, what is the nominal and real gross domestic product (GDP) in year 2?",
    image: { src: "/images/unitTestImages/unit2/unit2GDP.svg", alt: "Price and quantity data for t-shirts and sweaters" },
    options: [
      "$3,390; $2,750",
      "$2,600; $3,200",
      "$3,390; $2,600",
      "$2,750; $3,390",
      "$3,200; $2,750",
    ],
    correctAnswer: "A"
  }, 
  {
    id: 1024,
    subject: "ap_macroeconomics",
    unit: 2,
    lessonIDS: ["2.1"],
    unitName: "Economic Indicators and the Business Cycle",
    question: "The table below shows the total expenditures for Country X in 2009, in billions of dollars. Calculate Country X’s GDP in 2009 using the expenditure approach.",
    image: { src: "/images/unitTestImages/unit2/unit2GDPTable.svg", alt: "Total expenditures for Country X" },
    options: [
      "685 billion",
      "760 billion",
      "750 billion",
      "625 billion",
      "600 billion"
    ],
    correctAnswer: "D"
  }, 
  {
    id: 1027,
    subject: "ap_macroeconomics",
    unit: 2,
    lessonIDS: ["2.1"],
    unitName: "Economic Indicators and the Business Cycle",
    question: "In the circular flow model of an open economy, which of the following represents a leakage?",
    image: null,
    options: [
      "Business investment in new capital",
      "Exports purchased by foreign buyers",
      "Government spending on infrastructure",
      "Household savings in financial markets",
      "Firms borrowing funds to purchase equipment"
    ],
    correctAnswer: "D",
    explanation: "In the circular flow model, leakages are withdrawals from the spending stream, including savings, taxes, and imports. Household savings in financial markets are a leakage, while business investment, government spending, and exports are injections.",
    explanationVideo: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/Unit_MCQ_Explanations/U2Q11.mp4"
  }, 
  {
    id: 1028,
    subject: "ap_macroeconomics",
    unit: 2,
    lessonIDS: ["2.4"],
    unitName: "Economic Indicators and the Business Cycle",
    image: null,
    question: "In Country Z, the Consumer Price Index (CPI) was 120 in Year 1 and 132 in Year 2. During the same period, the average nominal wage rose from $600 in Year 1 to $690 in Year 2. By what percentage did the average real wage change from Year 1 to Year 2?",
    options: [
      "Decreased by 2%",
      "Increased by 5%",
      "Increased by 2%",
      "Increased by 10%", 
      "No change"
    ],
    correctAnswer: "B",
    explanation: "Inflation = (132 − 120) ÷ 120 × 100 = 10%. Nominal wage growth = (690 − 600) ÷ 600 × 100 = 15%. Real wage growth = 15% − 10% = 5%.",
    explanationVideo: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/Unit_MCQ_Explanations/U2Q12.mp4"
  }, 
  {
    id: 1029,
    subject: "ap_macroeconomics",
    unit: 2,
    lessonIDS: ["2.1"],
    unitName: "Economic Indicators and the Business Cycle",
    question: "Which of the following scenarios best describes an economy producing at the natural rate of unemployment?",
    image: null,
    options: [
      "The unemployment rate is 0%, and all workers who want a job have one.",
      "The economy is experiencing cyclical unemployment due to a recession.",
      "The economy has frictional and structural unemployment but no cyclical unemployment.",
      "The labor force participation rate has fallen, so the measured unemployment rate is artificially low.",
      "The unemployment rate is equal to the inflation rate, indicating long-run equilibrium."
    ],
    correctAnswer: "C",
    explanation: "The natural rate of unemployment includes frictional and structural unemployment but excludes cyclical unemployment. Therefore, the correct answer is the scenario where the economy has frictional and structural unemployment but no cyclical unemployment.",
    explanationVideo: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/Unit_MCQ_Explanations/U2Q13.mp4"
  }, 
  {
    id: 1030,
    subject: "ap_macroeconomics",
    unit: 2,
    lessonIDS: ["2.4"],
    unitName: "Economic Indicators and the Business Cycle",
    question: "In a given year, an economy’s real GDP was 500, and the inflation rate was 4%. Based on this information, what must be true about nominal GDP in that year?",
    image: null,
    options: [
      "Nominal GDP was less than 500",
      "Nominal GDP was exactly 500",
      "Nominal GDP was greater than 500",
      "Nominal GDP decreased compared to the previous year",
      "There is not enough information to determine nominal GDP"
    ],
    correctAnswer: "C",
    explanation: "Nominal GDP includes the effects of price changes, while real GDP adjusts for inflation. Since the inflation rate is positive (4%), nominal GDP must be greater than real GDP. Therefore, nominal GDP was greater than 500.",
    explanationVideo: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/Unit_MCQ_Explanations/U2Q14.mp4"
  }, 
  {
    id: 1025,
    subject: "ap_macroeconomics",
    unit: 2,
    lessonIDS: ["2.7"],
    unitName: "Economic Indicators and the Business Cycle",
    question: "Which of the following is true about an economy currently at point U on the business cycle graph?",
    image: { src: "/images/unitTestImages/unit2/unit2BusinessCycles.svg", alt: "Business cycle graph" },
    options: [
      "Actual RGDP is less than the potential GDP",
      "The economy is producing at full employment",
      "The economy is in an inflationary gap",
      "There is no cyclical unemployment",
      "Actual unemployment is less than the natural rate of unemployment"
    ],
    correctAnswer: "A"
  }, 

  // Unit 3: National Income and Price Determination
  {
    id: 1031,
    subject: "ap_macroeconomics",
    unit: 3,
    lessonIDS: ["3.2"],
    unitName: "National Income and Price Determination",
    question: "Rafael's marginal propensity to save equals 0.25. In 2007 Rafael saved $4,000 of his $20,000 disposable income. If in 2008, his disposable income increased to $30,000, his savings increased by",
    image: null,
    options: [
      "$4,000",
      "$2,000",
      "$3,500",
      "$7,500",
      "$2,500"
    ],
    correctAnswer: "E",
    explanationVideo: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/Unit_MCQ_Explanations/U3Q1.mp4"
  },
  {
    id: 1032,
    subject: "ap_macroeconomics",
    unit: 3,
    lessonIDS: ["3.3"],
    unitName: "National Income and Price Determination",
    question: "Under what circumstances would the short-run aggregate supply curve be vertical?",
    image: null,
    options: [
      "When nominal wages are sticky and adjust slowly to changes in the price level",
      "When the actual inflation rate is greater than the expected inflation rate",
      "When businesses expect wages to increase in the near future",
      "When nominal wages adjust immediately to changes in the price level",
      "When nominal wages fall in a recessionary gap"
    ],
    correctAnswer: "D",
    explanationVideo: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/Unit_MCQ_Explanations/U3Q2.mp4"
  },
  {
    id: 1033,
    subject: "ap_macroeconomics",
    unit: 3,
    lessonIDS: ["3.3"],
    unitName: "National Income and Price Determination",
    question: "A simultaneous increase in the price level and the unemployment rate could be caused by which of the following?",
    image: null,
    options: [
      "An increase in consumer confidence and spending",
      "The development of new technology that increases productivity",
      "A sudden decrease in government spending",
      "Contractionary monetary policy",
      "The unavailability of key economic resources"
    ],
    correctAnswer: "E",
    explanationVideo: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/Unit_MCQ_Explanations/U3Q3.mp4"
  },
  {
    id: 1034,
    subject: "ap_macroeconomics",
    unit: 3,
    lessonIDS: ["3.8"],
    unitName: "National Income and Price Determination",
    question: "Contractionary fiscal policy will impact RGDP, the price level, and unemployment in which of the following ways?",
    image: null,
    options: [
      "RGDP increases, the price level decreases, and unemployment increases",
      "RGDP increases, the price level increases, and unemployment increases",
      "RGDP decreases, the price level decreases, and unemployment increases",
      "RGDP decreases, the price level decreases, and unemployment decreases",
      "RGDP decreases, the price level increases, and unemployment decreases"
    ],
    correctAnswer: "C",
    explanationVideo: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/Unit_MCQ_Explanations/U3Q4.mp4"
  },
  {
    id: 1035,
    subject: "ap_macroeconomics",
    unit: 3,
    lessonIDS: ["3.4"],
    unitName: "National Income and Price Determination",
    question: "Which of the following will remain unchanged when the price level increases?",
    image: null,
    options: [
      "Nominal output",
      "Short-run Aggregate quantity supplied",
      "Inflationary expectations",
      "Long-run aggregate supply",
      "Real wages"
    ],
    correctAnswer: "D",
    explanationVideo: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/Unit_MCQ_Explanations/U3Q5.mp4"
  },
  {
    id: 1036,
    subject: "ap_macroeconomics",
    unit: 3,
    lessonIDS: ["3.7"],
    unitName: "National Income and Price Determination",
    question: "Which of the following statements about the AD-AS model is true?",
    image: null,
    options: [
      "An economy is in a recessionary gap when actual output is greater than potential output",
      "Long-run aggregate supply shifts to the right when price level decreases",
      "Inflationary expectations",
      "When an economy is in an inflationary gap, actual unemployment is less than the natural rate of unemployment",
      "Long-equilibrium can always be found where the aggregate demand curve and the short-run aggregate supply curve intersect"
    ],
    correctAnswer: "D",
    explanationVideo: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/Unit_MCQ_Explanations/U3Q6.mp4"
  },
  {
    id: 1037,
    subject: "ap_macroeconomics",
    unit: 3,
    lessonIDS: ["3.8"],
    unitName: "National Income and Price Determination",
    question: "If government policy makers use expansionary fiscal policy to stimulate economic growth, which of the following will most likely happen in the short run?",
    image: null,
    options: [
      "Nominal interest rates will decrease and the price level will increase",
      "Real output will increase and unemployment will decrease",
      "Nominal interest rates will decrease and unemployment will remain constant",
      "The price level will increase and real output will remain unchanged",
      "Unemployment will decrease and real interest rates will fall"
    ],
    correctAnswer: "B",
    explanationVideo: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/Unit_MCQ_Explanations/U3Q7.mp4"
  },
  {
    id: 1038,
    subject: "ap_macroeconomics",
    unit: 3,
    lessonIDS: ["3.6"],
    unitName: "National Income and Price Determination",
    question: "In the absence of any policy action, an economy in an inflationary gap will return to long-run equilibrium through the process of",
    image: null,
    options: [
      "Increasing nominal wages which lead to a decrease in short-run aggregate supply",
      "Decreasing nominal wages which lead to an increase in short-run aggregate supply",
      "Increasing nominal wages which lead to an increase in aggregate demand",
      "Decreasing nominal wages which lead to a decrease in aggregate demand",
      "Increasing nominal wages which lead to a decrease in long-run aggregate supply"
    ],
    correctAnswer: "A",
    explanationVideo: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/Unit_MCQ_Explanations/U3Q8.mp4"
  },
  {
    id: 1039,
    subject: "ap_macroeconomics",
    unit: 3,
    lessonIDS: ["3.2"],
    unitName: "National Income and Price Determination",
    question: "Assume that a nation has a potential output of $350 billion USD, an actual output of $300 billion USD, and a marginal propensity to save (MPS) of 0.25. To close the output gap, the government should take which of the following fiscal policy actions?",
    image: null,
    options: [
      "Increase government spending by $50 billion USD",
      "Increase government spending by $12.5 billion USD",
      "Decrease taxes by $12.5 billion USD",
      "Decreasing taxes by $50 billion USD",
      "Increase government spending by $37 billion USD"
    ],
    correctAnswer: "B",
    explanationVideo: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/Unit_MCQ_Explanations/U3Q9.mp4"
  },
  {
    id: 1040,
    subject: "ap_macroeconomics",
    unit: 3,
    lessonIDS: ["3.1"],
    unitName: "National Income and Price Determination",
    question: "Which of the following explains why there is an inverse relationship between aggregate demand and the price level?",
    image: null,
    options: [
      "As the price level rises, government spending automatically decreases, lowering aggregate demand.",
      "As the price level rises, workers supply more labor, which reduces aggregate demand.",
      "As the price level rises, the long-run aggregate supply curve shifts to the left.",
      "As the price level rises, the money supply contracts, causing lower aggregate demand.",
      "As the price level rises, the purchasing power of money falls, reducing consumption spending."
    ],
    correctAnswer: "E",
    explanationVideo: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/Unit_MCQ_Explanations/U3Q10.mp4"
  }, 
  {
    id: 1041,
    subject: "ap_macroeconomics",
    unit: 3,
    lessonIDS: ["3.1"],
    unitName: "National Income and Price Determination",
    question: "Which of the following combinations of fiscal policy actions would help return the economy to full-employment output?",
    image: { src: "/images/unitTestImages/unit3/U3ID1041.svg", alt: "Total expenditures for Country X" },
    options: [
      "Decrease government spending and increase taxes.",
      "Increase government spending and increase taxes.",
      "Increase government spending and decrease taxes.",
      "Increase government spending and increase interest rates.",
      "Decrease government spending and decrease taxes."
    ],
    correctAnswer: "A",
    explanationVideo: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/Unit_MCQ_Explanations/U3Q11.mp4"
  }, 
  {
    id: 1042,
    subject: "ap_macroeconomics",
    unit: 3,
    lessonIDS: ["3.3"],
    unitName: "National Income and Price Determination",
    question: "The shift shown on the diagram below could have been caused by:",
    image: { src: "/images/unitTestImages/unit3/U3ID1042.svg", alt: "Total expenditures for Country X" },
    options: [
      "An increase in government deficit spending.",
      "A rise in wages across the country.",
      "Decreased levels of consumer and business confidence.",
      "An increase in business subsidies and a reduction in business taxes",
      "A increase in the natural rate of unemployment"
    ],
    correctAnswer: "D",
    explanationVideo: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/Unit_MCQ_Explanations/U3Q12.mp4"
  }, 
  {
    id: 1043,
    subject: "ap_macroeconomics",
    unit: 3,
    lessonIDS: ["3.7"],
    unitName: "National Income and Price Determination",
    question: "Suppose the economy is initially at point T, in long-run equilibrium. If consumer confidence increases and aggregate demand rises, which sequence of points best represents the short-run and long-run changes in the economy?",
    image: { src: "/images/unitTestImages/unit3/U3ID1043.svg", alt: "Total expenditures for Country X" },
    options: [
      "T → R → S",
      "T → U → S",
      "T → V → S",
      "T → S → U",
      "T → U → V"
    ],
    correctAnswer: "B"
  }, 

  {
    id: 1044,
    subject: "ap_macroeconomics",
    unit: 3,
    lessonIDS: ["3.5"],
    unitName: "National Income and Price Determination",
    question: "Based on the AD–AS model shown, which of the following correctly describes the economy’s short-run equilibrium?",
  image: { src: "/images/unitTestImages/unit3/U3ID1044.svg", alt: "AD-AS model example" },
  options: [
    "The economy is producing at full employment with no cyclical unemployment.",
    "A rightward shift of short-run aggregate supply has reduced both prices and unemployment.",
    "Aggregate demand has shifted right, leading to higher prices and greater output than potential GDP.",
    "Actual output is below potential output, and the economy is experiencing a recessionary gap.",
    "Actual output exceeds potential output, and the economy is in an inflationary gap."
  ],
    correctAnswer: "D"
  }, 
  {
    id: 1045,
    subject: "ap_macroeconomics",
    unit: 3,
    lessonIDS: ["3.2"],
    unitName: "National Income and Price Determination",
    question: "Suppose the European Union, a major trading partner of the United States, enters a recession. Which of the following shifts on the aggregate demand–aggregate supply graph best illustrates the effect on the U.S. economy?",
  image: { src: "/images/unitTestImages/unit3/U3ID1045.svg", alt: "AD-AS model example" },
  options: [
    "A shift from AD1 to AD2",
    "A shift from AD2 to AD1",
    "A shift from SRAS1 to SRAS2",
    "A shift from SRAS2 to SRAS1",
    "This situation will cause a movement along the AD curve, rather than a shift of the curve"
  ],
    correctAnswer: "B"
  }, 
  {
    id: 1046,
    subject: "ap_macroeconomics",
    unit: 4,
    lessonIDS: ["4.1"],
    unitName: "Financial Sector",
    question: "Which of the following lists the financial assets in order from most liquid to least liquid?"
,
  image: null,
  options: [
    "Cash → Bonds → Savings Account → Certificate of Deposit",
    "Cash → Certificate of Deposit → Savings Account → Bonds",
    "Cash → Savings Account → Certificate of Deposit → Bonds",
    "Savings Account → Cash → Bonds → Certificate of Deposit",
    "Bonds → Certificate of Deposit → Savings Account → Cash"
  ],
    correctAnswer: "C"
  }, 
{
    id: 1047,
    subject: "ap_macroeconomics",
    unit: 4,
    lessonIDS: ["4.1"],
    unitName: "Financial Sector",
    question: "The relationship between the nominal interest rate and the quantity of money demanded can be described as:"
,
  image: null,
  options: [
    "Direct, because as nominal interest rates increase, the quantity of money demanded increases",
    "Indirect, because as the nominal interest rate decreases, the quantity of money demanded decreases",
    "Direct, because as the nominal interest rate decreases, the quantity of money demanded increases",
    "Indirect, because as the nominal interest rate increases, the quantity of money demanded decreases",
    "There is no relationship, because changes in the nominal interest rate money supply"
  ],
    correctAnswer: "D"
  }, 
{
    id: 1048,
    subject: "ap_macroeconomics",
    unit: 4,
    lessonIDS: ["4.2"],
    unitName: "Financial Sector",
    question: "When the actual inflation rate is greater than the expected inflation rate, which of the following will be true?"
,
  image: null,
  options: [
  "The actual real interest rate will be greater than the expected real interest rate",
  "The actual real interest rate will be negative",
  "Borrowers will gain at the expense of lenders",
  "Lenders will gain at the expense of borrowers",
  "The nominal interest rate will fall below zero"
],
    correctAnswer: "C"
  }, 
{
    id: 1049,
    subject: "ap_macroeconomics",
    unit: 4,
    lessonIDS: ["4.2"],
    unitName: "Financial Sector",
    question: "Liam takes out a one-year fixed-rate loan at a nominal interest rate of 5%. The expected inflation rate is 3%, but the actual inflation rate is 1%. Which of the following is true?",
image: null,
options: [
  "The expected real interest rate was 2%, and the actual real interest rate was 4%",
  "The expected real interest rate was 3%, and the actual real interest rate was 2%",
  "The expected real interest rate was 4%, and the actual real interest rate was 2%",
  "The expected real interest rate was 5%, and the actual real interest rate was 1%",
  "The expected real interest rate was 1%, and the actual real interest rate was 3%"
],
    correctAnswer: "A"
  }, 
{
    id: 1050,
    subject: "ap_macroeconomics",
    unit: 4,
    lessonIDS: ["4.3"],
    unitName: "Financial Sector",
    question: "Which of the following is included in the monetary base but not in M1?",
  image: null,
  options: [
    "Currency and coins that households and firms use for everyday transactions",
    "Checking account deposits that can be withdrawn at any time using checks or debit cards",
    "Reserves that commercial banks are required or choose to hold at the Federal Reserve",
    "Traveler’s checks that individuals purchase to use as a secure form of payment when traveling",
    "Savings deposits and small time deposits that can be converted into cash but are not used directly for spending"
  ],
    correctAnswer: "C"
  }, 
{
    id: 1051,
    subject: "ap_macroeconomics",
    unit: 4,
    lessonIDS: ["4.3"],
    unitName: "Financial Sector",
    question: "Sofia is comparing the prices of two different laptops. One costs $1,000 and the other costs $1,200. By using prices to evaluate which laptop gives her better value, Sofia is using money primarily as which of the following?",
  image: null,
  options: [
    "A source of liquidity",
    "A medium of exchange",
    "A unit of account",
    "A store of value",
    "A measure of wealth",
  ],
    correctAnswer: "C"
}, 
{
    id: 1052,
    subject: "ap_macroeconomics",
    unit: 4,
    lessonIDS: ["4.4"],
    unitName: "Financial Sector",
    question: "Ms. Stephanie withdraws $2,000 from her checking account and uses that money to purchase a new bicycle. What is the immediate impact of her withdrawal on the money aggregate measures of M1 and M2?",
  image: null,
  options: [
    "M1 increases, M2 remains unchanged",
    "M1 decreases, M2 decreases",
    "M1 increases, M2 increases",
    "M1 decreases, M2 remains unchanged", 
    "M1 remains unchanged, M2 remains unchanged"
  ],
    correctAnswer: "E"
}, 
{
    id: 1053,
    subject: "ap_macroeconomics",
    unit: 4,
    lessonIDS: ["4.5"],
    unitName: "Financial Sector",
    question: "An increase in national income will cause which of the following changes on the money market graph?",
  image: null,
  options: [
    "The money demand curve will shift to the right and the nominal interest rate will decrease",
    "The money demand curve will shift to the left and the nominal interest rate will decrease",
    "The money demand curve will shift to the right and the nominal interest rate will increase",
    "The money supply curve will shift to the left and the nominal interest rate will increase", 
    "The money supply curve will shift to the right and the nominal interest rate will decrease"
  ],
    correctAnswer: "C"
}, 
{
    id: 1054,
    subject: "ap_macroeconomics",
    unit: 4,
    lessonIDS: ["4.6"],
    unitName: "Financial Sector",
    question: "If the central bank of a country sells government bonds in the open market, what will be the likely effect on the nominal interest rate, aggregate demand, and the unemployment rate?",
  image: null,
  options: [
    "Increase, Increase, Decrease",
    "Increase, Decrease, Decrease",
    "Increase, Decrease, Increase",
    "Decrease, Increase, Increase", 
    "Decrease, Decrease, Decrease",
  ],
    correctAnswer: "C"
}, 
{
    id: 1055,
    subject: "ap_macroeconomics",
    unit: 4,
    lessonIDS: ["4.6"],
    unitName: "Financial Sector",
    question: "An economy is experiencing a recessionary gap, with actual output below full-employment output. Which action by the central bank would help close this gap?",
  image: null,
  options: [
    "Increase the required reserve ratio",
    "Increase government spending",
    "Buy government bonds in the open market",
    "Reduce income taxes", 
    "Decrease the interest on reserves rate",
  ],
    correctAnswer: "E"
}, 
{
    id: 1056,
    subject: "ap_macroeconomics",
    unit: 4,
    lessonIDS: ["4.5"],
    unitName: "Financial Sector",
    question: "Suppose that a customer deposits $1,000 into a checking account at a commercial bank. If the required reserve ratio is 20%, what is the value of the money multiplier and the maximum potential increase in the money supply resulting from this deposit?",
  image: null,
  options: [
    "Multiplier = 4; Max increase = $3,000",
    "Multiplier = 4; Max increase = $4,000",
    "Multiplier = 5; Max increase = $4,000",
    "Multiplier = 5; Max increase = $5,000",
    "Multiplier = 10; Max increase = $10,000"
  ],
    correctAnswer: "B"
}, 
{
    id: 1057,
    subject: "ap_macroeconomics",
    unit: 4,
    lessonIDS: ["4.7"],
    unitName: "Financial Sector",
    question: "Which of the following is true about the loanable funds market?",
  image: null,
  options: [
    "There will be a shortage of loanable funds when the actual real interest is higher than the equilibrium real interest rate",
    "The supply of loanable funds is determined by a country's central bank",
    "The demand for loanable funds comes primarily from households who want to save for retirement",
    "An increase in the real interest rate would cause a decrease in the quantity of loanable funds demanded",
    "An increase in government budget deficits will increase the supply of loanable funds available to private borrowers"
  ],
    correctAnswer: "D"
}, 
{
    id: 1058,
    subject: "ap_macroeconomics",
    unit: 4,
    lessonIDS: ["4.6"],
    unitName: "Financial Sector",
    question: "The money market graph below shows an increase in the money supply. Which of the following best describes the resulting impact on investment spending and aggregate demand in the short run?",
  image: { src: "/images/unitTestImages/unit4/U4ID1057.svg", alt: "Money market graph example" },
    options: [
    "Investment spending will decrease, and aggregate demand will shift to the left.",
    "Investment spending will increase, and aggregate demand will shift to the right.",
    "Investment spending will remain unchanged, while aggregate demand will increase due to higher consumer confidence.",
    "Investment spending will increase, but aggregate demand will remain unchanged because higher interest rates offset the effect.",
    "Investment spending will decrease, but aggregate demand will remain unchanged because government spending is constant."
  ],
    correctAnswer: "B"
}, 
{
    id: 1059,
    subject: "ap_macroeconomics",
    unit: 4,
    lessonIDS: ["4.7"],
    unitName: "Financial Sector",
    question: "At a real interest rate of 6 percent, which of the following will occur in the loanable funds market shown?",
  image: { src: "/images/unitTestImages/unit4/U4ID1058.svg", alt: "Loanable funds market example" },
  options: [
    "There will be a surplus of loanable funds because the quantity supplied exceeds the quantity demanded.",
    "There will be a shortage of loanable funds because the quantity demanded exceeds the quantity supplied.",
    "The market will be in equilibrium because 6 percent equals the natural real interest rate.",
    "Both the demand and supply of loanable funds will decrease as savers and borrowers leave the market.",
    "The government will need to intervene to reduce the interest rate to the equilibrium level."
],
    correctAnswer: "A"
}, 
{
    id: 1060,
    subject: "ap_macroeconomics",
    unit: 4,
    lessonIDS: ["4.6"],
    unitName: "Financial Sector",
    question: "In which of the following situations would the central bank implement the contractionary monetary policy shown on the ample reserves graph below?",
  image: { src: "/images/unitTestImages/unit4/U4ID1059.svg", alt: "Ample Reserves graph example" },
  options: [
    "When prolonged government budget deficits lead to a crowding out effect",
    "When the economy is in a recession with high cyclical unemployment",
    "When unemployment is rising due to a negative demand shock",
    "When long-run aggregate supply decreases because of reduced productivity",
"When actual output exceeds full-employment output, creating inflationary pressure"
  ],
    correctAnswer: "E"
},
{
    id: 1061,
    subject: "ap_macroeconomics",
    unit: 4,
    lessonIDS: ["4.6"],
    unitName: "Financial Sector",
    question: "The table below shows the assets and liabilities of First City Bank, a commercial bank. If the required reserve ratio is 20%, what is the amount of excess reserves and what is the maximum potential change to the money supply if First City Bank lends out all of its excess reserves?",
  image: { src: "/images/unitTestImages/unit4/U4ID1060.svg", alt: "Bank balance sheet example" },
  options: [
    "Excess reserves = $10,000; Maximum change = $50,000",
    "Excess reserves = $2,000; Maximum change = $10,000",
    "Excess reserves = $8,000; Maximum change = $40,000",
    "Excess reserves = $6,000; Maximum change = $30,000",
    "Excess reserves = $4,000; Maximum change = $20,000"
  ],
  correctAnswer: "D"
},  
{
    id: 1062,
    subject: "ap_macroeconomics",
    unit: 4,
    lessonIDS: ["4.7"],
    unitName: "Financial Sector",
    question: "Which of the following could have caused the increase in demand for loanable funds shown on the graph below?",
  image: { src: "/images/unitTestImages/unit4/U4ID1061.svg", alt: "Loanable funds market example" },
  options: [
    "A decrease in business investment spending due to lower expected profits",
    "An increase in the government budget deficit",
    "An increase in household savings rates across the economy",
    "A decrease in borrowing by firms due to higher corporate taxes",
    "A decrease in consumer borrowing caused by tighter credit standards"
  ],
  correctAnswer: "B"
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
