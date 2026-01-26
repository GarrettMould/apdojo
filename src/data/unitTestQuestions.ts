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
        "The production of trinkets will decrease if more resources become available."
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
      "Demand for tea would decrease.",
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

  // Unit 2 Micro: Supply and Demand
  {
    id: 2001,
    unit: 2,
    subject: "ap_microeconomics",
    lessonIDS: ["2.1"],
    unitName: "Supply and Demand",
    question: "Which of the following changes would most likely result in a decrease in the demand for printed books?",
    image: null,
    options: [
      "A significant decrease in the price of e-books, a substitute good.",
      "A decrease in the price of paper used to make books.",
      "An increase in consumer income, assuming books are a normal good.",
      "An increase in the price of bookmarks, a complementary good.",
      "An expectation that the price of printed books will rise next month."
    ],
    correctAnswer: "A",
    explanation: "Demand shifts when a determinant changes. E-books are a substitute for printed books. If the price of a substitute decreases, consumers will switch to the cheaper alternative, decreasing the demand for the original good (printed books)."
  },
  {
    id: 2002,
    unit: 2,
    subject: "ap_microeconomics",
    lessonIDS: ["2.2"],
    unitName: "Supply and Demand",
    question: "If the government provides a subsidy to corn farmers, what will be the immediate impact on the supply curve for corn?",
    image: null,
    options: [
      "Movement up along the supply curve.",
      "The supply curve will shift to the left.",
      "The supply curve will remain unchanged, but demand will increase.",
      "The supply curve will shift to the right.",
      "Movement down along the supply curve."
    ],
    correctAnswer: "D",
    explanation: "A subsidy effectively lowers the cost of production for farmers. This incentivizes them to produce more at every price level, causing the supply curve to shift to the right."
  },
  {
    id: 2003,
    unit: 2,
    subject: "ap_microeconomics",
    lessonIDS: ["2.3"],
    unitName: "Supply and Demand",
    question: "A 10% increase in the price of a specific brand of cereal leads to a 25% decrease in the quantity demanded. The price elasticity of demand for this cereal is:",
    image: null,
    options: [
      "Inelastic",
      "Elastic",
      "Unit elastic",
      "Perfectly elastic",
      "Perfectly inelastic"
    ],
    correctAnswer: "B",
    explanation: "Price Elasticity of Demand (PED) is calculated as % Change in Quantity Demanded / % Change in Price. Here, 25% / 10% = 2.5. Since the coefficient (2.5) is greater than 1, demand is elastic."
  },
  {
    id: 2004,
    unit: 2,
    subject: "ap_microeconomics",
    lessonIDS: ["2.5"],
    unitName: "Supply and Demand",
    question: "If the cross-price elasticity of demand between Good A and Good B is negative, then Good A and Good B are:",
    image: null,
    options: [
      "Complements",
      "Substitutes",
      "Normal goods",
      "Inferior goods",
      "Unrelated goods"
    ],
    correctAnswer: "A",
    explanation: "A negative cross-price elasticity means that an increase in the price of Good B causes a decrease in the demand for Good A. This inverse relationship defines complementary goods (e.g., hot dogs and buns)."
  },
  {
    id: 2005,
    unit: 2,
    subject: "ap_microeconomics",
    lessonIDS: ["2.6"],
    unitName: "Supply and Demand",
    question: "In a competitive market for coffee, the equilibrium price is $3.00. If the market price is currently set at $5.00, which of the following will occur?",
    image: null,
    options: [
      "A shortage will develop, driving the price up.",
      "The supply curve will shift right to restore equilibrium.",
      "A surplus will develop, driving the price down.",
      "The demand curve will shift left to restore equilibrium.",
      "The market will remain in equilibrium at the higher price."
    ],
    correctAnswer: "C",
    explanation: "When the current price ($5.00) is above the equilibrium price ($3.00), the quantity supplied exceeds the quantity demanded. This excess supply is called a surplus, which puts downward pressure on the price until it returns to equilibrium."
  },
  {
    id: 2006,
    unit: 2,
    subject: "ap_microeconomics",
    lessonIDS: ["2.7"],
    unitName: "Supply and Demand",
    question: "Assume that for a particular good, the demand increases while the supply decreases simultaneously. What is the certain impact on the equilibrium price and quantity?",
    image: null,
    "optionTableHeaders": ["Equilibrium Price", "Equilibrium Quantity"],
    "options": [
      "Increase | Increase",
      "Decrease | Decrease",
      "Indeterminate | Decrease",
      "Indeterminate | Increase",
      "Increase | Indeterminate"
    ],
    correctAnswer: "E",
    explanation: "An increase in demand pushes price up and quantity up. A decrease in supply pushes price up and quantity down. Since both shifts push price up, the price definitely increases. However, the effect on quantity opposes each other, making the change in quantity indeterminate without knowing the magnitude of the shifts."
  },
  {
    id: 2007,
    unit: 2,
    subject: "ap_microeconomics",
    lessonIDS: ["2.7"],
    unitName: "Supply and Demand",
    question: "Which of the following combinations of events could have caused the shifts seen on the graph below?",
    image: { src: "/images/unitTestImages/Q2007.svg", alt: "Graph showing both demand and supply curves shifting left" },
    options: [
      "Consumer income increases (assuming a normal good) and technology improves.",
      "The price of a substitute decreases and the cost of raw materials decreases.",
      "The price of a complementary good increases and the government increases taxes on producers.",
      "An effective marketing campaign helps the product and the number of sellers decreases.",
      "Consumer income decreases (assuming an inferior good) and wages for workers increase."
    ],
    correctAnswer: "C",
    explanation: "The graph shows both the Demand curve and the Supply curve shifting to the left (decreasing). An increase in the price of a complementary good would cause Demand to decrease (shift left). An increase in taxes acts as an increased cost of production, causing Supply to decrease (shift left)."
  },
  {
    id: 2008,
    unit: 2,
    subject: "ap_microeconomics",
    lessonIDS: ["2.8"],
    unitName: "Supply and Demand",
    question: "Which of the following scenarios would result in the smallest decrease in total economic surplus if a new per-unit tax were imposed?",
    image: null,
    options: [
      "Supply is perfectly elastic, and demand is elastic.",
      "Supply and demand are both perfectly elastic.",
      "Supply is unit elastic, and demand is unit elastic.",
      "Supply and demand are both highly inelastic.",
      "Supply is elastic, and demand is perfectly elastic."
    ],
    correctAnswer: "D",
    explanation: "Deadweight loss occurs because taxes reduce the quantity traded below the equilibrium level. When supply and demand are highly inelastic, consumers and producers are very unresponsive to price changes. This means the quantity traded drops very little after the tax is applied, resulting in a very small deadweight loss triangle."
  },
  {
    id: 2009,
    unit: 2,
    subject: "ap_microeconomics",
    lessonIDS: ["2.8"],
    unitName: "Supply and Demand",
    question: "If the government imposes a binding price ceiling on the rental housing market (rent control), which of the following is the most likely long-run consequence?",
    image: null,
    options: [
      "A surplus of available apartments.",
      "A shortage of available apartments.",
      "An increase in the quality of rental units.",
      "An increase in producer surplus for landlords.",
      "Allocative efficiency in the housing market."
    ],
    correctAnswer: "B",
    explanation: "A binding price ceiling is set below the equilibrium price. At this artificially low price, the quantity demanded by renters exceeds the quantity supplied by landlords, resulting in a persistent shortage."
  },
  {
    id: 2010,
    unit: 2,
    subject: "ap_microeconomics",
    lessonIDS: ["2.8"],
    unitName: "Supply and Demand",
    question: "Suppose the price elasticity of demand for a good is 0.4 and the price elasticity of supply is 0.8. If the government imposes a per-unit tax on producers, which of the following describes the distribution of the tax burden?",
    image: null,
    options: [
      "Producers will pay the majority of the tax.",
      "Consumers will pay the majority of the tax.",
      "The tax burden will be split equally.",
      "Producers will pay the entire tax.",
      "The government will absorb the cost of the tax."
    ],
    correctAnswer: "B",
    explanation: "The burden of a tax falls more heavily on the side of the market that is more inelastic (less responsive to price changes). Here, demand (0.4) is more inelastic than supply (0.8). Therefore, consumers are less able to leave the market and will bear the majority of the tax burden."
  },
  {
    id: 2011,
    unit: 2,
    subject: "ap_microeconomics",
    lessonIDS: ["2.8"],
    unitName: "Supply and Demand",
    question: "The graph below illustrates the impact of a per-unit tax on a market. By how much does consumer surplus decrease as a result of the tax?",
    image: { src: "/images/unitTestImages/Q2011.svg", alt: "Graph showing tax impact on consumer surplus" },
    options: [
      "$100",
      "$200",
      "$250",
      "$400",
      "$450"
    ],
    correctAnswer: "C",
    explanation: "Consumer surplus is the area below the demand curve and above the price consumers pay. Before the tax, the price is $40 and quantity is 30, so CS is the triangle 0.5 * (70-40) * 30 = $450. After the tax, consumers pay $50 and buy 20 units, so new CS is 0.5 * (70-50) * 20 = $200. The decrease is $450 - $200 = $250. Alternatively, you can calculate the area of the trapezoid between the prices of $40 and $50: (($30 + $20)/2) * $10 = $250."
  },
  {
    id: 2012,
    unit: 2,
    subject: "ap_microeconomics",
    lessonIDS: ["2.8"],
    unitName: "Supply and Demand",
    question: "Using the same graph, calculate the total tax revenue generated by this policy and the resulting deadweight loss.",
    image: { src: "/images/unitTestImages/Q2012.svg", alt: "Graph showing tax revenue and deadweight loss" },
    optionTableHeaders: ["Tax Revenue", "Deadweight Loss"],
    options: [
      "$200 | $50",
      "$400 | $100",
      "$400 | $200",
      "$600 | $100",
      "$1000 | $50"
    ],
    correctAnswer: "B",
    explanation: "Tax Revenue is calculated as the Tax Per Unit × New Quantity. The vertical distance between the curves at Q=20 is $20 ($50 - $30), and the quantity sold is 20. Thus, Revenue = $20 * 20 = $400. Deadweight Loss is the area of the triangle formed by the reduction in quantity (from 30 to 20) and the tax wedge ($20). Area = 0.5 * (30-20) * ($50-$30) = 0.5 * 10 * 20 = $100."
  },
  {
    id: 2013,
    unit: 2,
    subject: "ap_microeconomics",
    lessonIDS: ["2.8"],
    unitName: "Supply and Demand",
    question: "Assume the market is currently in equilibrium at P2 and Q2. If the government implements a binding price floor at P3, which of the following correctly describes the market outcome?",
    image: { src: "/images/unitTestImages/Q2013.svg", alt: "Graph showing price floor at P3" },
    options: [
      "A shortage equal to Q3 - Q1.",
      "A surplus equal to Q3 - Q1.",
      "A surplus equal to Q3 - Q2.",
      "The market remains in equilibrium at Q2.",
      "A shortage equal to Q2 - Q1."
    ],
    correctAnswer: "B",
    explanation: "A price floor set above the equilibrium price (at P3) is binding. At this higher price, producers are willing to supply Q3, but consumers only demand Q1. This creates an excess supply, or surplus, equal to the difference between quantity supplied and quantity demanded (Q3 - Q1)."
  },
  {
    id: 2014,
    unit: 2,
    subject: "ap_microeconomics",
    lessonIDS: ["2.9"],
    unitName: "Supply and Demand",
    question: "A country opens its domestic market for steel to international trade. The world price for steel is lower than the domestic equilibrium price. Which of the following will occur?",
    image: null,
    options: [
      "The country will export steel.",
      "The quantity of steel produced domestically will increase.",
      "Domestic producer surplus will decrease.",
      "Domestic consumer surplus will decrease.",
      "The total economic surplus in the domestic market will decrease."
    ],
    correctAnswer: "C",
    explanation: "Since the world price is lower, the country will import steel. Domestic consumers benefit from lower prices (CS increases), but domestic producers lose because they must sell at the lower world price, reducing their surplus."
  },
  {
    id: 2015,
    unit: 2,
    subject: "ap_microeconomics",
    lessonIDS: ["2.9"],
    unitName: "Supply and Demand",
    question: "The graph below depicts a domestic market after a tariff has been imposed, raising the world price (Pw) to the tariff price (Pt). Which areas on the graph represent the deadweight loss caused by this tariff?",
    image: { src: "/images/unitTestImages/Q2015.svg", alt: "Graph showing tariff impact with deadweight loss" },
    options: [
      "MNRQ",
      "MLN",
      "MLN + OMQ",
      "OMQ + RNP",
      "MNRQ + RNP"
    ],
    correctAnswer: "D",
    explanation: "The deadweight loss from a tariff is composed of two distinct efficiency losses. Triangle OMQ represents the production inefficiency (resources used to produce goods domestically at a higher cost than the world price). Triangle RNP represents the consumption inefficiency (lost consumer surplus from consumers who value the good more than the world price but less than the tariff price)."
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

  // Unit 3 Micro: Production, Cost, and the Perfect Competition Model
  {
    id: 3001,
    unit: 3,
    subject: "ap_microeconomics",
    lessonIDS: ["3.1"],
    unitName: "Production, Cost, and the Perfect Competition Model",
    question: "The graph below shows the Total Product (TP) curve for a firm in the short run. Which of the following is true about the firm's production at output quantity Q3?",
    image: { src: "/images/unitTestImages/Q3001.svg", alt: "Total Product curve graph" },
    options: [
      "Marginal Product is zero.",
      "Marginal Product is at its maximum.",
      "Average Product is negative.",
      "Diminishing marginal returns have not yet set in.",
      "Total Product is increasing at an increasing rate."
    ],
    correctAnswer: "A",
    explanation: "The slope of the Total Product (TP) curve represents the Marginal Product (MP). At quantity Q3, the TP curve reaches its peak (the slope is flat). Therefore, the Marginal Product at this point is zero."
  },
  {
    id: 3006,
    unit: 3,
    subject: "ap_microeconomics",
    lessonIDS: ["3.1"],
    unitName: "Production, Cost, and the Perfect Competition Model",
    question: "The table below shows the total production of widgets for a firm as it adds workers. Based on the data, with the addition of which worker does the firm first experience diminishing marginal returns?",
    image: null,
    tableData: {
      headers: ["Workers", "Total Output"],
      rows: [
        ["0", "0"],
        ["1", "10"],
        ["2", "25"],
        ["3", "35"],
        ["4", "42"],
        ["5", "45"]
      ]
    },
    options: [
      "The 5th worker",
      "The 4th worker",
      "The 2nd worker",
      "The 1st worker",
      "The 3rd worker"
    ],
    correctAnswer: "E",
    explanation: "Calculate the Marginal Product (MP) for each worker. Worker 1: 10-0=10. Worker 2: 25-10=15. Worker 3: 35-25=10. Worker 4: 42-35=7. The MP increases from worker 1 to 2 (10 to 15), but decreases when the 3rd worker is added (15 down to 10). Therefore, diminishing marginal returns set in with the 3rd worker."
  },
  {
    id: 3007,
    unit: 3,
    subject: "ap_microeconomics",
    lessonIDS: ["3.1"],
    unitName: "Production, Cost, and the Perfect Competition Model",
    question: "Which of the following describes the relationship between the Marginal Product (MP) and Average Product (AP) curves?",
    image: null,
    options: [
      "The MP curve intersects the AP curve at the maximum of the AP curve.",
      "The MP curve intersects the AP curve at the maximum of the MP curve.",
      "When MP is greater than AP, AP is falling.",
      "When MP is less than AP, AP is rising.",
      "MP and AP are always parallel to each other."
    ],
    correctAnswer: "A",
    explanation: "Mathematically, the marginal value pulls the average. If the marginal is above the average, it pulls the average up. If the marginal is below the average, it pulls it down. Therefore, the only time the average is neither rising nor falling (at its peak) is when the marginal equals the average."
  },
  {
    id: 3002,
    unit: 3,
    subject: "ap_microeconomics",
    lessonIDS: ["3.2"],
    unitName: "Production, Cost, and the Perfect Competition Model",
    question: "The graph below displays the short-run cost curves for a firm. Which of the labeled points are NOT part of the firm's short-run supply curve?",
    image: { src: "/images/unitTestImages/Q3002.svg", alt: "Short-run cost curves graph" },
    options: [
      "F and K",
      "I and J",
      "J and K",
      "H and I",
      "I, J, and K"
    ],
    correctAnswer: "A",
    explanation: "The firm's short-run supply curve is the portion of the Marginal Cost (MC) curve that lies above the minimum Average Variable Cost (AVC) curve (the shutdown point). Point F is on the MC curve but below the shutdown point (I), so the firm would produce zero output rather than produce at F. Point K lies on the AVC curve, not the MC curve, so it does not represent a profit-maximizing supply point."
  },
  {
    id: 3008,
    unit: 3,
    subject: "ap_microeconomics",
    lessonIDS: ["3.2"],
    unitName: "Production, Cost, and the Perfect Competition Model",
    question: "Which of the following statements about short-run cost curves is true?",
    image: null,
    options: [
      "The distance between ATC and Average Variable Cost (AVC) increases as output increases.",
      "Total Fixed Costs increase as output increases.",
      "The Average Fixed Cost (AFC) curve is U-shaped.",
      "Marginal Cost is always greater than Average Total Cost.",
      "The Marginal Cost (MC) curve intersects the Average Total Cost (ATC) curve at its minimum."
    ],
    correctAnswer: "E",
    explanation: "Just like with MP and AP, the Marginal Cost curve intersects the average cost curves (ATC and AVC) at their minimum points. If MC is below ATC, ATC falls; if MC is above ATC, ATC rises."
  },
  {
    id: 3009,
    unit: 3,
    subject: "ap_microeconomics",
    lessonIDS: ["3.2"],
    unitName: "Production, Cost, and the Perfect Competition Model",
    question: "As a firm increases its output in the short run, what happens to the vertical distance between the Average Total Cost (ATC) and Average Variable Cost (AVC) curves?",
    image: null,
    options: [
      "It decreases because Average Fixed Cost (AFC) declines as output rises.",
      "It stays constant because fixed costs do not change.",
      "It increases because of diminishing marginal returns.",
      "It is zero because ATC equals AVC in the long run.",
      "It fluctuates randomly."
    ],
    correctAnswer: "A",
    explanation: "ATC = AVC + AFC. Therefore, the vertical gap between ATC and AVC is exactly equal to the Average Fixed Cost. Since Total Fixed Cost is constant, dividing it by an increasing quantity (Q) results in a continuously decreasing AFC."
  },
  {
    id: 3003,
    unit: 3,
    subject: "ap_microeconomics",
    lessonIDS: ["3.3"],
    unitName: "Production, Cost, and the Perfect Competition Model",
    question: "The graph below illustrates the Long-Run Average Cost (LRAC) curve. If the firm is currently producing at a quantity greater than Q2 and decides to double its inputs, which of the following outcomes will occur?",
    image: { src: "/images/unitTestImages/Q3003.svg", alt: "Long-Run Average Cost curve graph" },
    options: [
      "Output will double.",
      "Output will less than double.",
      "Output will more than double.",
      "Average total cost will decrease.",
      "The firm will experience increasing returns to scale."
    ],
    correctAnswer: "B",
    explanation: "To the right of Q2, the Long-Run Average Cost (LRAC) curve is sloping upward, indicating Diseconomies of Scale. This means that as the firm scales up, costs rise faster than output. Therefore, if inputs are doubled (cost doubles), output must increase by less than double for the average cost per unit to rise."
  },
  {
    id: 3010,
    unit: 3,
    subject: "ap_microeconomics",
    lessonIDS: ["3.3"],
    unitName: "Production, Cost, and the Perfect Competition Model",
    question: "If a firm doubles its inputs and finds that its output increases by more than double, the firm is experiencing:",
    image: null,
    options: [
      "Diminishing marginal returns.",
      "Constant returns to scale.",
      "Diseconomies of scale.",
      "Economies of scale.",
      "Decreasing returns to scale."
    ],
    correctAnswer: "D",
    explanation: "Economies of scale (or increasing returns to scale) occur when output increases by a larger proportion than the increase in inputs. This typically leads to a downward-sloping Long-Run Average Cost (LRAC) curve."
  },
  {
    id: 3011,
    unit: 3,
    subject: "ap_microeconomics",
    lessonIDS: ["3.4"],
    unitName: "Production, Cost, and the Perfect Competition Model",
    question: "Sarah quits her job where she earned $50,000 a year to start a bakery. The table below lists her first year's financial data. What is Sarah's Accounting Profit for the first year?",
    image: null,
    tableData: {
      headers: ["Item", "Amount"],
      rows: [
        ["Total Revenue from Sales", "$150,000"],
        ["Cost of Ingredients (Flour, Sugar, etc.)", "$40,000"],
        ["Wages paid to employees", "$30,000"],
        ["Rent for bakery space", "$20,000"],
        ["Forgone Salary", "$50,000"]
      ]
    },
    options: [
      "$10,000",
      "$150,000",
      "$60,000",
      "$110,000",
      "$90,000"
    ],
    correctAnswer: "C",
    explanation: "Accounting Profit only considers explicit costs (money actually paid out). Accounting Profit = Total Revenue - Explicit Costs. \nExplicit Costs = Ingredients ($40k) + Wages ($30k) + Rent ($20k) = $90,000. \n$150,000 (Revenue) - $90,000 (Explicit Costs) = $60,000. \n(Note: Economic profit would subtract the forgone salary, resulting in $10,000)."
  },
  {
    id: 3012,
    unit: 3,
    subject: "ap_microeconomics",
    lessonIDS: ["3.5"],
    unitName: "Production, Cost, and the Perfect Competition Model",
    question: "A profit-maximizing firm should always produce the quantity where:",
    image: null,
    options: [
      "Total Revenue is maximized.",
      "Marginal Revenue equals Marginal Cost.",
      "Average Total Cost is minimized.",
      "Price equals Average Variable Cost.",
      "Marginal Revenue is greater than Marginal Cost."
    ],
    correctAnswer: "B",
    explanation: "The profit-maximizing rule is MR = MC. As long as the revenue from selling one more unit (MR) is greater than the cost of producing it (MC), the firm adds to its profit. It stops exactly where they are equal."
  },
  {
    id: 3005,
    unit: 3,
    subject: "ap_microeconomics",
    lessonIDS: ["3.6"],
    unitName: "Production, Cost, and the Perfect Competition Model",
    question: "The graph below shows the short run production costs for a perfectly competitive firm. Which of the following events could have caused the shift seen on the graph?",
    image: { src: "/images/unitTestImages/Q3005.svg", alt: "Perfect competition cost curve shift graph" },
    options: [
      "An increase in the price of a substitute good.",
      "A decrease in consumer income (assuming the good is normal).",
      "A technological breakdown that reduces industry supply.",
      "The entry of new firms into the market.",
      "A decrease in the marginal product of labor."
    ],
    correctAnswer: "A",
    explanation: "For a perfectly competitive firm, Marginal Revenue is equal to the market price. The upward shift indicates that the market price has increased. An increase in the price of a substitute good would increase the market demand for this good, shifting the market demand curve to the right and raising the equilibrium price."
  },
  {
    id: 3013,
    unit: 3,
    subject: "ap_microeconomics",
    lessonIDS: ["3.6"],
    unitName: "Production, Cost, and the Perfect Competition Model",
    question: "A perfectly competitive firm sells its product at a market price of $10 per unit. At its current profit-maximizing quantity, the Average Variable Cost is $8 and the Average Total Cost is $12. In the short run, this firm should:",
    image: null,
    options: [
      "Shut down immediately because it is making an economic loss.",
      "Raise its price to $12 to cover all costs.",
      "Continue producing because the price exceeds the Average Variable Cost.",
      "Exit the market immediately to eliminate fixed costs.",
      "Decrease output to zero to stop paying variable costs."
    ],
    correctAnswer: "C",
    explanation: "Even though the firm is making a loss (Price $10 < ATC $12), it should continue to produce because the Price ($10) is higher than the Average Variable Cost ($8). By producing, the firm covers all its variable costs and contributes $2 per unit towards its fixed costs. If it shuts down, it would lose the entire amount of its fixed costs, which would be a greater loss."
  },
  {
    id: 3004,
    unit: 3,
    subject: "ap_microeconomics",
    lessonIDS: ["3.7"],
    unitName: "Production, Cost, and the Perfect Competition Model",
    question: "The graph below shows a perfectly competitive firm currently operating at price P2 in the short run. How will this market adjust to long-run equilibrium?",
    image: { src: "/images/unitTestImages/Q3004.svg", alt: "Perfect competition loss graph" },
    options: [
      "Firms will exit the market, shifting the market supply curve to the left, raising the price.",
      "Firms will enter the market, shifting the market supply curve to the right, lowering the price.",
      "Firms will increase production to lower their Average Total Cost.",
      "Demand for the product will decrease as consumers switch to cheaper substitutes.",
      "The firm will shut down immediately because Price is below ATC."
    ],
    correctAnswer: "A",
    explanation: "At price P2, the price line (MR) is below the Average Total Cost (ATC) curve, indicating that the firm is incurring an economic loss. In the long run, firms will exit the industry to avoid these losses. As firms exit, the market supply decreases (shifts left), which drives the equilibrium price up until normal profits are restored."
  },
  {
    id: 3014,
    unit: 3,
    subject: "ap_microeconomics",
    lessonIDS: ["3.7"],
    unitName: "Production, Cost, and the Perfect Competition Model",
    question: "Which of the following is a key characteristic of a perfectly competitive market?",
    image: null,
    options: [
      "Firms sell differentiated products.",
      "There are many buyers and sellers producing identical products.",
      "There are high barriers to entry and exit.",
      "Individual firms are price makers.",
      "Firms earn positive economic profits in the long run."
    ],
    correctAnswer: "B",
    explanation: "Perfect competition is defined by having many small firms, identical (homogeneous) products, perfect information, and no barriers to entry or exit. This makes firms \"price takers.\""
  },
  {
    id: 3015,
    unit: 3,
    subject: "ap_microeconomics",
    lessonIDS: ["3.7"],
    unitName: "Production, Cost, and the Perfect Competition Model",
    question: "If perfectly competitive firms are earning positive economic profits in the short run, what will happen in the long run?",
    image: null,
    options: [
      "The government will impose taxes to reduce the profits.",
      "The market demand will decrease as consumers lose interest.",
      "Firms will increase their advertising to maintain profits.",
      "Firms will enter the industry, shifting supply right and lowering the price.",
      "Firms will exit the industry, shifting supply left and raising the price."
    ],
    correctAnswer: "D",
    explanation: "Positive economic profits act as a signal for new firms to enter the market (since there are no barriers). As new firms enter, the market supply curve shifts to the right. This drives the equilibrium price down until economic profits return to zero."
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
},
{
    id: 1063,
    subject: "ap_macroeconomics",
    unit: 5,
    lessonIDS: ["5.1"],
    unitName: "Long-Run Consequences of Stabilization Policies",
    question: "Which of the following combinations of fiscal and monetary policy will have an indeterminate effect on interest rates and cause a decrease in unemployment? ",
    image: null,
    options: [
      "contractionary fiscal policy and contractionary monetary policy",
      "contractionary fiscal policy and expansionary monetary policy",
      "expansionary fiscal policy and contractionary monetary policy",
      "expansionary fiscal policy and expansionary monetary policy",
      "expansionary fiscal policy and an absence of monetary policy"
    ],
    correctAnswer: "D"
  },
  {
    id: 1064,
    subject: "ap_macroeconomics",
    unit: 5,
    lessonIDS: ["5.1"],
    unitName: "National Income and Price Determination",
    question: "With a central bank acting within a limited reserves banking system, which combination of fiscal and monetary policy actions will lead to an increase in RGDP in the short-run?",
    image: null,
    options: [
      "Decreasing the discount rate and increasing government deficit spending",
      "Increasing the required reserve ratio and decreasing income taxes",
      "Buying government securities in the open market and increasing income taxes",
      "Selling government securities in the open market and increasing government spending",
      "Increasing the discount rate and increasing income taxes"
    ],
    correctAnswer: "A"
  },
  {
    id: 1065,
    subject: "ap_macroeconomics",
    unit: 5,
    lessonIDS: ["5.1"],
    unitName: "National Income and Price Determination",
    question: "If a country uses a combination of contractionary monetary policy and expansionary fiscal policy, nominal interest rates and unemployment would most likely be affected in which of the following ways in the short-run?",
    image: null,
    options: [
      "Nominal interest rates increase, unemployment increases",
      "Nominal interest rates increase, indeterminate change in unemployment",
      "Indeterminate change in nominal interest rates, unemployment decreases",
      "Indeterminate change in nominal interest rates, unemployment increases",
      "Nominal interest rates decrease, unemployment increases"
    ],
    correctAnswer: "B"
  },
  {
    id: 1066,
    subject: "ap_macroeconomics",
    unit: 5,
    lessonIDS: ["5.2"],
    unitName: "National Income and Price Determination",
    question: "Which of the following is true about the Phillips Curve?",
    image: null,
    options: [
      "It shows the direct relationship between inflation and unemployment in both the short-run and the long-run",
      "It shows the direct relationship between inflation and unemployment in the short-run, and the lack of a relationship between inflation and unemployment in the long-run",
      "An upward movement along the short-run Phillips Curve indicates higher levels of inflation and lower levels of unemployment",
      "A shift of the aggregate demand curve in the AD-AS graph corresponds to a shift of short-run Phillips Curve",
      "The short-run Phillips curve represents a country's natural rate of unemployment"
    ],
    correctAnswer: "C"
  },
{
    id: 1067,
    subject: "ap_macroeconomics",
    unit: 5,
    lessonIDS: ["5.2"],
    unitName: "National Income and Price Determination",
    question: "If a country experiences an increase in labor costs due to demographic changes and net emigration, how will the short-run Phillips curve be affected?",
    image: null,
    options: [
      "A leftward shift of the short-run Phillips curve",
      "A rightward shift of the short-run Phillips curve",
      "A downward movement along the short-run Phillips curve",
      "An upward movement along the short-run Phillips curve",
      "A leftward shift of the long-run Phillips curve"
    ],
    correctAnswer: "B"
  },
{
    id: 1068,
    subject: "ap_macroeconomics",
    unit: 5,
    lessonIDS: ["5.3"],
    unitName: "National Income and Price Determination",
    question: "If real output is $5,000, the price level is 4, and the velocity of money is 5, then the money supply is",
    image: null,
    options: [
      "$250",
      "$1,000",
      "$2,500",
      "$4,000",
      "$20,000"
    ],
    correctAnswer: "D"
  },
{
    id: 1069,
    subject: "ap_macroeconomics",
    unit: 5,
    lessonIDS: ["5.3"],
    unitName: "National Income and Price Determination",
    question: "In the long run, a decrease in the money supply will cause aggregate demand to shift in which direction, and what will be the resulting effect on the price level and real output?",
    image: null,
    options: [
      "Leftward; lower price level and lower real output",
      "Leftward; lower price level and unchanged real output",
      "Leftward; unchanged price level and lower real output",
      "Rightward; higher price level and higher real output",
      "Rightward; unchanged price level and higher real output"
    ],
    correctAnswer: "B"
  },

{
    id: 1070,
    subject: "ap_macroeconomics",
    unit: 5,
    lessonIDS: ["5.3"],
    unitName: "National Income and Price Determination",
    question: "Which of the following best describes the long-run effect of an increase in the growth rate of the money supply?",
    image: null,
    options: [
      "It increases potential real output",
      "It decrease the natural rate of unemployment",
      "It increases the price level and increases real output",
      "It increases the price level and does not affect real output",
      "It increases the price level and decrease real output"
    ],
    correctAnswer: "D"
  },
{
    id: 1071,
    subject: "ap_macroeconomics",
    unit: 5,
    lessonIDS: ["5.4"],
    unitName: "National Income and Price Determination",
    question: "If a government that initially has a balanced budget increases government spending and reduces taxes at the same time, which of the following will occur?",
    image: null,
    options: [
      "The government will continue to have a balanced budget, and aggregate demand will not change.",
      "The government will run a budget deficit, and aggregate demand will increase.",
      "The government will run a budget surplus, and aggregate demand will increase.",
      "The government will run a budget deficit, but aggregate demand will decrease.",
      "The government will continue to have a balanced budget, and aggregate demand will decrease."
    ],
    correctAnswer: "B"
  },
{
    id: 1072,
    subject: "ap_macroeconomics",
    unit: 5,
    lessonIDS: ["5.4"],
    unitName: "National Income and Price Determination",
    question: "Which of the following is true regarding a country’s national debt?",
    image: null,
    options: [
      "The national debt decreases whenever the government runs a budget deficit.",
      "If the government runs a budget surplus in a given year, the national debt will be eliminated.",
      "The national debt is accumulation of past budget deficits.",
      "The national debt is the same as the trade deficit since both measure imbalances in the economy.",
      "The national debt does not increase during periods of inflation."
    ],
    correctAnswer: "C"
  },
{
    id: 1073,
    subject: "ap_macroeconomics",
    unit: 5,
    lessonIDS: ["5.6"],
    unitName: "National Income and Price Determination",
    question: "Economic growth is shown by which of the following?",
    image: null,
    options: [
      "A rightward shift of the aggregate demand curve.",
      "A leftward shift of the aggregate supply curve.",
      "A movement from a within the PPC to a point along the PPC.",
      "An upward movement along the long-run aggregate supply curve.",
      "A rightward shift of the long-run aggregate supply curve."
    ],
    correctAnswer: "E"
  },
{
    id: 1074,
    subject: "ap_macroeconomics",
    unit: 5,
    lessonIDS: ["5.6"],
    unitName: "National Income and Price Determination",
    question: "Which of the following will most likely lead to long-run economic growth?",
    image: null,
    options: [
      "High levels of emigration.",
      "High levels of investment in science and technology research.",
      "High levels of consumption spending.",
      "Low levels of unemployment.",
      "Low level of foreign direct investment (FDI)."
    ],
    correctAnswer: "B"
  },
{
    id: 1075,
    subject: "ap_macroeconomics",
    unit: 5,
    lessonIDS: ["5.7"],
    unitName: "National Income and Price Determination",
    question: "To encourage economic growth over the long-run, the government can do which of the following EXCEPT:",
    image: null,
    options: [
      "Invest in education and worker development programs",
      "Implement an investment tax credit",
      "Enact policies that protect intellectual property.",
      "Increase transfer payments such as unemployment benefits.",
      "Invest in infrastructure such as roads, ports, and communication systems."
    ],
    correctAnswer: "D"
  },
{
    id: 1076,
    subject: "ap_macroeconomics",
    unit: 5,
    lessonIDS: ["5.7"],
    unitName: "National Income and Price Determination",
    question: "Supply-side economic policies, such as a reduction in business taxes and regulations, will have which of the following effects in the short run?",
  image: null,
  options: [
    "Shift the short-run aggregate supply curve to the left, decreasing the price level and decreasing real GDP.",
    "Shift the short-run aggregate supply curve to the right, decreasing the price level and increasing real GDP.",
    "Shift the short-run aggregate supply curve to the right, increasing both the price level and real GDP.",
    "Shift the short-run aggregate supply curve to the left, increasing the price level and decreasing real GDP.",
    "Leave the short-run aggregate supply curve unchanged, but shift the aggregate demand curve to the right."
  ],
  correctAnswer: "B"
  },
  {
    id: 1077,
    subject: "ap_macroeconomics",
    unit: 6,
    lessonIDS: ["6.1"],
    unitName: "Open Economy",
    question: "Suppose an economy has a current account surplus of +130 million USD. Which of the following must be true?",
    image: null,
    options: [
      "It must show a surplus in the capital account.",
      "The trade balance must be negative.",
      "The capital account must show a deficit.",
      "Exports of goods and services must be less than imports.",
      "Financial inflows exceed outflows in the capital account."
    ],
    correctAnswer: "C"
  },
  {
    id: 1078,
    subject: "ap_macroeconomics",
    unit: 6,
    lessonIDS: ["6.1"],
    unitName: "Open Economy",
    question: "The country of Bosnia recorded exports of $50 million in 2007 and imports of $70 million. Which of the following is true about Bosnia's balance of payments account?",
    image: null,
    options: [
      "Bosnia’s trade balance is in deficit since imports exceed exports.",
      "Bosnia’s current account must show a surplus.",
      "The current account balance is negative because the country imports more than it exports.",
      "The capital and financial account must be in surplus to offset the current account deficit.",
      "The capital and financial account must also be in deficit when the trade balance is negative."
    ],
    correctAnswer: "A"
  },
  {
    id: 1079,
    subject: "ap_macroeconomics",
    unit: 6,
    lessonIDS: ["6.2"],
    unitName: "Open Economy",
    question: "The current exchange rate is 4.5 Swedish kronor per Japanese yen. If a product costs 12 Japanese yen, what is the cost of the product in Swedish kronor?",
    image: null,
    options: [
      "48 kronor",
      "50 kronor",
      "54 kronor",
      "56 kronor",
      "60 kronor"
    ],
    correctAnswer: "C"
  },
  {
    id: 1080,
    subject: "ap_macroeconomics",
    unit: 6,
    lessonIDS: ["6.2"],
    unitName: "Open Economy",
    question: "In 2005, the exchange rate was 40 Thai baht per 1 U.S. dollar. By 2010, the exchange rate was 32 Thai baht per 1 U.S. dollar. Based on these exchange rates, which of the following statements is correct?",
    image: null,
    options: [
      "Both the Thai baht and the U.S. dollar appreciated.",
      "Both the Thai baht and the U.S. dollar depreciated.",
      "The Thai baht depreciated, and the U.S. dollar appreciated.",
      "The Thai baht appreciated, and the U.S. dollar depreciated.",
      "Neither currency experienced appreciation or depreciation."
    ],
    correctAnswer: "D"
  },
  {
    id: 1081,
    subject: "ap_macroeconomics",
    unit: 6,
    lessonIDS: ["6.3"],
    unitName: "Open Economy",
    question: "Suppose the equilibrium exchange rate is 100 Japanese yen per 1 U.S. dollar. If the current exchange rate in the market is 90 yen per dollar, what will be the likely outcome in the foreign exchange market?",
    image: null,
    options: [
      "There will be a surplus of dollars, causing the dollar to depreciate toward equilibrium.",
      "There will be a shortage of dollars, causing the dollar to appreciate toward equilibrium.",
      "There will be a shortage of yen, causing the yen to depreciate further.",
      "There will be a surplus of yen, causing the yen to appreciate further.",
      "Neither currency will adjust because exchange rates are fixed in the short run."
    ],
    correctAnswer: "B"
  },
  {
    id: 1082,
    subject: "ap_macroeconomics",
    unit: 6,
    lessonIDS: ["6.3"],
    unitName: "Open Economy",
    question: "In the foreign exchange market for euros against U.S. dollars, if the supply of euros decreases, which of the following will occur?",
    image: null,
    options: [
      "The euro will appreciate relative to the dollar, and more euros will be exchanged.",
      "The euro will depreciate relative to the dollar, and fewer euros will be exchanged.",
      "The euro will depreciate relative to the dollar, and more euros will be exchanged.",
      "The euro will depreciate relative to the dollar, and more euros will be exchanged.",
      "The euro will appreciate relative to the dollar, and fewer euros will be exchanged."
    ],
    correctAnswer: "E"
  },
  {
    id: 1083,
    subject: "ap_macroeconomics",
    unit: 6,
    lessonIDS: ["6.4"],
    unitName: "Open Economy",
    question: "The central bank of Japan buys government bonds on the open market. In the short run, how will this most likely affect international financial capital flows and the value of the Japanese yen?",
    image: null,
    options: [
      "Financial capital inflows to Japan will increase, and the yen will appreciate.",
      "Financial capital outflows from Japan will increase, and the yen will depreciate.",
      "Financial capital inflows to Japan will decrease, and the yen will depreciate.",
      "Financial capital outflows from Japan will decrease, and the yen will appreciate.",
      "Financial capital inflows to Japan will increase, and the yen will depreciate."
    ],
    correctAnswer: "B"
  },
  {
    id: 1084,
    subject: "ap_macroeconomics",
    unit: 6,
    lessonIDS: ["6.4"],
    unitName: "Open Economy",
    question: "The government of Brazil increases spending on infrastructure projects as part of an expansionary fiscal policy. In the short run, how will this most likely affect international financial capital flows and the value of the Brazilian real?",
    image: null,
    options: [
      "Financial capital inflows to Brazil will fall, and the real will depreciate.",
      "Financial capital outflows from Brazil will rise, but the real will appreciate.",
      "Financial capital inflows to Brazil will rise, but the real will depreciate.",
      "Financial capital outflows from Brazil will rise, and the real will depreciate.",
      "Financial capital inflows to Brazil will rise, and the real will appreciate.",
    ],
    correctAnswer: "E"
  },
  {
    id: 1085,
    subject: "ap_macroeconomics",
    unit: 6,
    lessonIDS: ["6.4"],
    unitName: "Open Economy",
    question: "Which of the following is most likely to cause a decrease in the international value of the British pound?",
    image: null,
    options: [
      "Reduced government spending in the United Kingdom",
      "Lower real interest rates abroad",
      "Contractionary monetary policy in the United Kingdom",
      "Lower real interest rates in the United Kingdom",
      "Falling inflation rates in the United Kingdom"
    ],
    correctAnswer: "D"
  },
  {
    id: 1086,
    subject: "ap_macroeconomics",
    unit: 6,
    lessonIDS: ["6.5"],
    unitName: "Open Economy",
    question: "Suppose the Japanese yen depreciates relative to the Canadian dollar. Holding everything else constant, what will most likely happen to Japan’s net      exports?",
    image: null,
    options: [
      "Japan’s exports will decrease, and imports will increase, reducing net exports.",
      "Japan’s exports will increase, and imports will decrease, increasing net exports.",
      "Japan’s exports will decrease, but imports will remain unchanged, reducing net exports.",
      "Japan’s exports will increase, but imports will remain unchanged, leaving net exports unchanged.",
      "Japan’s exports and imports will both remain unchanged, leaving net exports unchanged."
    ],
    correctAnswer: "B"
  },
  {
    id: 1087,
    subject: "ap_macroeconomics",
    unit: 6,
    lessonIDS: ["6.5"],
    unitName: "Open Economy",
    question: "If the value of the Mexican peso decreases relative to the United States dollar, which of the following groups will most likely benefit?",
    image: null,
    options: [
      "Mexican exporters",
      "United States exporters",
      "Mexican consumers of imported goods",
      "Foreign investors holding peso-denominated assets",
      "United States tourists in Mexico"
    ],
    correctAnswer: "A"
  },
  {
    id: 1088,
    subject: "ap_macroeconomics",
    unit: 6,
    lessonIDS: ["6.6"],
    unitName: "Open Economy",
    question: "If real interest rates increase in Japan relative to real interest rates in South Korea, which of the following will most likely occur?",
    image: null,
    options: [
      "Financial capital will flow from Japan to South Korea, appreciating the won relative to the yen.",
      "Financial capital will flow into both Japan and South Korea, leaving exchange rates unchanged.",
      "Financial capital will flow from South Korea to Japan, appreciating the yen relative to the won.",
      "Financial capital will flow from South Korea to Japan, depreciating the yen relative to the won.",
      "Financial capital will flow into South Korea, appreciating the yen relative to the won."
    ],
    correctAnswer: "C"
  },

  // Unit 4 Micro: Imperfect Competition
  {
    id: 4001,
    unit: 4,
    subject: "ap_microeconomics",
    lessonIDS: ["4.1"],
    unitName: "Imperfect Competition",
    question: "For a single-price monopolist facing a downward-sloping demand curve, why is marginal revenue always less than price?",
    image: null,
    options: [
      "Because the monopolist must lower the price on all previous units to sell an additional unit.",
      "Because the monopolist has no control over the market price.",
      "Because the monopolist experiences diseconomies of scale.",
      "Because the demand curve is perfectly elastic.",
      "Because the monopolist taxes the consumers."
    ],
    correctAnswer: "A",
    explanation: "To sell one more unit, a monopoly must lower the price. However, they cannot just lower the price for that one new buyer; they must lower the price for all units sold (assuming they cannot price discriminate). This loss of revenue on the previous units pulls the marginal revenue below the price of the new unit.",
  },
  {
    id: 4002,
    unit: 4,
    subject: "ap_microeconomics",
    lessonIDS: ["4.1"],
    unitName: "Imperfect Competition",
    question: "What is the primary source of market power for a monopoly?",
    image: null,
    options: [
      "The ability to produce at the minimum efficient scale.",
      "High barriers to entry that prevent competition.",
      "A perfectly elastic demand curve.",
      "Government regulation that enforces a price ceiling.",
      "The existence of many close substitutes."
    ],
    correctAnswer: "B",
    explanation: "Market power is the ability to set price above marginal cost. In a monopoly, this power is sustained by high barriers to entry (such as patents, control of resources, or economies of scale) that prevent other firms from entering the market and driving profits down.",
  },
  {
    id: 4003,
    unit: 4,
    subject: "ap_microeconomics",
    lessonIDS: ["4.2"],
    unitName: "Imperfect Competition",
    question: "The graph below depicts a profit-maximizing single-price monopoly. Which of the following combinations correctly identifies the area of Consumer Surplus and Deadweight Loss?",
    image: { src: "/images/unitTestImages/Q4003.svg", alt: "Monopoly graph with labels" },
    optionTableHeaders: ["Consumer Surplus", "Deadweight Loss"],
    options: [
      "Area P5-P4-C | Area C-I-E",
      "Area P5-P4-C | Area C-E-H",
      "Area P5-P1-I | Area C-I-E",
      "Area P4-P1-I-C | Area D-I-F",
      "Area P5-P3-D | Area C-E-H"
    ],
    correctAnswer: "A",
    explanation: "Consumer Surplus is the area below the Demand curve and above the market price (P4). This corresponds to the triangle P5-P4-C. Deadweight Loss is the loss of total surplus resulting from producing less than the socially optimal quantity (where P=MC at point E). The DWL is the triangle between the Demand curve and the Marginal Cost curve from the monopoly quantity (Q1) to the socially optimal quantity (Q2), which is the area C-I-E.",
  },
  {
    id: 4004,
    unit: 4,
    subject: "ap_microeconomics",
    lessonIDS: ["4.2"],
    unitName: "Imperfect Competition",
    question: "Compared to a perfectly competitive industry with the same costs, a single-price monopoly will result in:",
    image: null,
    options: [
      "Higher price and higher quantity.",
      "Lower price and lower quantity.",
      "Higher price and lower quantity.",
      "Lower price and higher quantity.",
      "The same price and quantity."
    ],
    correctAnswer: "C",
    explanation: "A monopoly restricts output to where MR = MC (which is less than the competitive Q where P = MC) and charges a higher price based on what the market will bear. This results in a higher price and lower quantity than the competitive equilibrium.",
  },
  {
    id: 4005,
    unit: 4,
    subject: "ap_microeconomics",
    lessonIDS: ["4.2"],
    unitName: "Imperfect Competition",
    question: "If a government regulator forces a natural monopoly to set its price equal to its Average Total Cost, what will be the result?",
    image: null,
    options: [
      "The firm will earn zero economic profit.",
      "The firm will incur an economic loss and require a subsidy.",
      "The firm will achieve allocative efficiency.",
      "The firm will maximize its total revenue.",
      "The firm will produce less than the unregulated monopoly quantity."
    ],
    correctAnswer: "A",
    explanation: "Fair-return pricing sets P = ATC. At this point, Total Revenue equals Total Cost, meaning the firm earns a normal profit (zero economic profit). This allows the firm to stay in business without a subsidy, though it is still not allocatively efficient (P > MC).",
  },
  {
    id: 4006,
    unit: 4,
    subject: "ap_microeconomics",
    lessonIDS: ["4.3"],
    unitName: "Imperfect Competition",
    question: "Refer to the graph below. Suppose the monopoly begins to practice perfect price discrimination. To maximize profit, what quantity will the firm produce?",
    image: { src: "/images/unitTestImages/Q4006.svg", alt: "Monopoly graph with labels" },
    options: [
      "Q1",
      "Q2",
      "Q3",
      "Between Q1 and Q2",
      "Zero"
    ],
    correctAnswer: "B",
    explanation: "If a monopolist can perfectly price discriminate, their Marginal Revenue (MR) curve becomes identical to the Demand curve (D). They will continue to sell units as long as the price (willingness to pay) is greater than or equal to the Marginal Cost. This means they will produce until Demand intersects Marginal Cost at point E, resulting in quantity Q2.",
  },
  {
    id: 4007,
    unit: 4,
    subject: "ap_microeconomics",
    lessonIDS: ["4.3"],
    unitName: "Imperfect Competition",
    question: "Which of the following is a key similarity between a perfectly competitive firm in long-run equilibrium and a perfectly price-discriminating monopolist?",
    image: null,
    options: [
      "Both earn zero economic profit in the long run.",
      "Both charge a single price to all consumers.",
      "Both have a marginal revenue curve that is below the demand curve.",
      "Both produce at the minimum of their Average Total Cost curve.",
      "Both produce the allocatively efficient quantity of output."
    ],
    correctAnswer: "E",
    explanation: "Allocative efficiency occurs where Price equals Marginal Cost (P = MC). In perfect competition, this happens naturally. A perfectly price-discriminating monopolist charges every consumer their maximum willingness to pay, meaning the marginal revenue curve becomes the demand curve. They produce until Price (Demand) equals MC, achieving the same socially optimal quantity as perfect competition.",
  },
  {
    id: 4008,
    unit: 4,
    subject: "ap_microeconomics",
    lessonIDS: ["4.3"],
    unitName: "Imperfect Competition",
    question: "Which of the following conditions is necessary for a firm to successfully practice price discrimination?",
    image: null,
    options: [
      "The firm must be a price taker.",
      "The firm must have constant marginal costs.",
      "The firm must be able to prevent the resale of its product.",
      "All consumers must have the exact same price elasticity of demand.",
      "The firm must be regulated by the government."
    ],
    correctAnswer: "C",
    explanation: "If resale is possible (arbitrage), customers who buy the product at a low price could simply resell it to customers with a high willingness to pay, undercutting the firm. Therefore, preventing resale is essential for maintaining different prices for different groups.",
  },
  {
    id: 4009,
    unit: 4,
    subject: "ap_microeconomics",
    lessonIDS: ["4.4"],
    unitName: "Imperfect Competition",
    question: "The graph below shows the short-run cost and revenue curves for a profit-maximizing monopolistically competitive firm. Which of the following statements is true regarding the firm's current status and long-run adjustment?",
    image: { src: "/images/unitTestImages/Q4009.svg", alt: "Monopolistically competitive firm graph" },
    options: [
      "The firm is currently in long-run equilibrium.",
      "The firm is earning an economic loss, firms will exit, and the demand curve will shift right.",
      "The firm is earning an economic profit, new firms will enter, and the demand curve will shift left.",
      "The firm is earning an economic profit, new firms will enter, and the firm's cost curves will shift down.",
      "The firm is productively efficient but allocatively inefficient."
    ],
    correctAnswer: "C",
    explanation: "The graph shows that at the profit-maximizing quantity (where MR=MC), the Price (on the Demand curve) is greater than the Average Total Cost (ATC). This indicates positive economic profit. In monopolistic competition, barriers to entry are low. Therefore, this profit will attract new firms selling close substitutes. As new firms enter, the demand for this specific firm's product will decrease, shifting the Demand curve to the left until normal profit is restored.",
  },
  {
    id: 4010,
    unit: 4,
    subject: "ap_microeconomics",
    lessonIDS: ["4.4"],
    unitName: "Imperfect Competition",
    question: "Monopolistically competitive markets are considered allocatively inefficient because in equilibrium:",
    image: null,
    options: [
      "Firms produce less than the quantity where average total cost is minimized.",
      "The product is homogeneous.",
      "Firms earn zero economic profit.",
      "There are too many firms in the industry.",
      "Price is greater than marginal cost."
    ],
    correctAnswer: "E",
    explanation: "Allocative efficiency requires that Price equals Marginal Cost (P = MC). Because monopolistically competitive firms sell differentiated products, they face a downward-sloping demand curve and charge a markup. Consequently, Price is greater than Marginal Cost, leading to a deadweight loss.",
  },
  {
    id: 4011,
    unit: 4,
    subject: "ap_microeconomics",
    lessonIDS: ["4.4"],
    unitName: "Imperfect Competition",
    question: "In the long run, a monopolistically competitive firm will have 'excess capacity.' This means that the firm:",
    image: null,
    options: [
      "Produces a quantity where Price equals Marginal Cost.",
      "Produces a quantity less than the output that minimizes Average Total Cost.",
      "Produces more than the market demands.",
      "Could increase profits by raising its price.",
      "Has a vertical supply curve."
    ],
    correctAnswer: "B",
    explanation: "Excess capacity refers to the difference between the actual output produced and the output that would minimize average total cost (productive efficiency). Monopolistically competitive firms produce on the downward-sloping portion of their ATC curve, meaning they could produce more at a lower average cost, but choose not to because marginal revenue would be negative.",
  },
  {
    id: 4012,
    unit: 4,
    subject: "ap_microeconomics",
    lessonIDS: ["4.5"],
    unitName: "Imperfect Competition",
    question: "Two competing soft drink companies, FizzCo and PopInc, are deciding whether to maintain their current prices or lower them to gain market share. The payoff matrix below shows the daily profits for each firm. Based on the matrix, which of the following is true?",
    image: null,
    tableData: {
      playerNames: {
        row: "FizzCo",
        column: "PopInc"
      },
      rowHeaders: true,
      headers: ["", "Maintain Price", "Lower Price"],
      rows: [
        ["Maintain Price", "($1,000, $1,000)", "($400, $1,500)"],
        ["Lower Price", "($1,500, $400)", "($600, $600)"]
      ]
    },
    options: [
      "FizzCo has a dominant strategy to Maintain Price.",
      "PopInc has a dominant strategy to Maintain Price.",
      "Both firms have a dominant strategy to Lower Price.",
      "Neither firm has a dominant strategy.",
      "FizzCo has a dominant strategy to Lower Price, but PopInc does not."
    ],
    correctAnswer: "C",
    explanation: "To find the dominant strategy, look at the choices for each firm independently. \nFor FizzCo: If PopInc maintains, FizzCo compares $1,000 (Maintain) vs $1,500 (Lower). Lower is better. If PopInc lowers, FizzCo compares $400 (Maintain) vs $600 (Lower). Lower is better. FizzCo has a dominant strategy to Lower.\nFor PopInc: If FizzCo maintains, PopInc compares $1,000 (Maintain) vs $1,500 (Lower). Lower is better. If FizzCo lowers, PopInc compares $400 (Maintain) vs $600 (Lower). Lower is better. PopInc also has a dominant strategy to Lower.",
  },
  {
    id: 4013,
    unit: 4,
    subject: "ap_microeconomics",
    lessonIDS: ["4.5"],
    unitName: "Imperfect Competition",
    question: "Two electronics firms, TechA and TechB, are deciding whether to release a Standard model or a Premium model of their new tablet. The payoffs represent millions of dollars in profit. Assuming the firms play simultaneously and act rationally, what is the Nash Equilibrium?",
    image: null,
    tableData: {
      playerNames: {
        row: "TechA",
        column: "TechB"
      },
      rowHeaders: true,
      headers: ["", "Standard", "Premium"],
      rows: [
        ["Standard", "(50, 40)", "(60, 30)"],
        ["Premium", "(40, 80)", "(70, 70)"]
      ]
    },
    options: [
      "TechA: Standard, TechB: Standard",
      "TechA: Standard, TechB: Premium",
      "TechA: Premium, TechB: Standard",
      "TechA: Premium, TechB: Premium",
      "There is no Nash Equilibrium in this game."
    ],
    correctAnswer: "A",
    explanation: "A Nash Equilibrium occurs when neither player has an incentive to switch strategies given the other player's choice.\n1. Check TechA: If B plays Standard, A chooses Standard (50 > 40). If B plays Premium, A chooses Premium (70 > 60). (No dominant strategy).\n2. Check TechB: If A plays Standard, B chooses Standard (40 > 30). If A plays Premium, B chooses Standard (80 > 70). TechB has a dominant strategy to play Standard.\n3. Outcome: Since TechB will always play Standard, TechA will respond to that by playing Standard (50 > 40). \n- TechA (Standard, Standard) = 50 vs 40 -> Standard.\n- TechB (Standard, Standard) = 40 vs 30 -> Standard.\nSo (Standard, Standard) is a Nash Equilibrium.",
  },
  {
    id: 4014,
    unit: 4,
    subject: "ap_microeconomics",
    lessonIDS: ["4.5"],
    unitName: "Imperfect Competition",
    question: "Which of the following characteristics is unique to an oligopoly market structure?",
    image: null,
    options: [
      "Allocative efficiency in the long run.",
      "Mutual interdependence among firms.",
      "A single seller with no close substitutes.",
      "Easy entry and exit.",
      "A horizontal demand curve for the individual firm."
    ],
    correctAnswer: "B",
    explanation: "Oligopolies are characterized by a few large firms. Because there are so few of them, the actions of one firm (changing price or output) directly affect the profits of the others. This strategic dependence is called mutual interdependence.",
  },
  {
    id: 4015,
    unit: 4,
    subject: "ap_microeconomics",
    lessonIDS: ["4.5"],
    unitName: "Imperfect Competition",
    question: "Cartels are often unstable in the long run because:",
    image: null,
    options: [
      "It is illegal to raise prices.",
      "Individual members have an incentive to cheat by increasing output to capture more profit.",
      "The market demand curve becomes perfectly inelastic.",
      "New firms cannot enter the market.",
      "They automatically achieve allocative efficiency."
    ],
    correctAnswer: "B",
    explanation: "While the cartel as a group maximizes profit by restricting output, an individual member can earn even more profit by secretly increasing their own production while the others hold back. If every member acts on this incentive to cheat, the cartel collapses.",
  },

  // Unit 5 Micro: Factor Markets
  // Lesson 5.1: Introduction to Factor Markets
  {
    id: 5001,
    unit: 5,
    subject: "ap_microeconomics",
    lessonIDS: ["5.1"],
    unitName: "Factor Markets",
    question: "Assume that advancements in fertilizer technology allow farm laborers to be more productive. Which of the following graphs illustrates the effect of this change on a single firm hiring farm labor in a perfectly competitive market?",
    image: { src: "/images/unitTestImages/unit5/unit5_labor_shifts_stacked.png", alt: "Stacked graphs showing different labor market scenarios" },
    options: [
      "Graph 1 (Top)",
      "Graph 2 (Second down)",
      "Graph 3 (Third down)",
      "Graph 4 (Fourth down)",
      "Graph 5 (Bottom)"
    ],
    optionImages: [
      { src: "/images/unitTestImages/unit5/labor_graph_1.png", alt: "Graph 1 option" },
      { src: "/images/unitTestImages/unit5/labor_graph_2.png", alt: "Graph 2 option" },
      { src: "/images/unitTestImages/unit5/labor_graph_3.png", alt: "Graph 3 option" },
      { src: "/images/unitTestImages/unit5/labor_graph_4.png", alt: "Graph 4 option" },
      { src: "/images/unitTestImages/unit5/labor_graph_5.png", alt: "Graph 5 option" }
    ],
    correctAnswer: "B",
    explanation: "Technological advancements increase the productivity of workers (Marginal Product). The demand for labor is derived from the Marginal Revenue Product (MRP), which is calculated as Marginal Product (MP) × Product Price (P). An increase in productivity shifts the MRP curve to the right (as shown in the second graph), leading the firm to hire more workers at the current wage rate.",
    videoExplanation: null
  },
  {
    id: 5002,
    unit: 5,
    subject: "ap_microeconomics",
    lessonIDS: ["5.1"],
    unitName: "Factor Markets",
    question: "A firm sells its product in a perfectly competitive market for a price of $10 per unit and hires labor in a perfectly competitive labor market. The daily wage rate for a worker is $50. Based on the production data in the table below, how many workers should the firm hire to maximize its profit?",
    image: null,
    tableData: {
      headers: ["Number of Workers", "Total Product"],
      rows: [
        ["0", "0"],
        ["1", "10"],
        ["2", "18"],
        ["3", "24"],
        ["4", "28"],
        ["5", "30"]
      ]
    },
    options: [
      "1",
      "2",
      "3",
      "4",
      "5"
    ],
    correctAnswer: "C",
    explanation: "To maximize profit, a firm hires workers up to the point where the Marginal Revenue Product (MRP) equals the Marginal Resource Cost (MRC/Wage). \n1. Calculate Marginal Product (MP): \n   - Worker 1: 10 - 0 = 10\n   - Worker 2: 18 - 10 = 8\n   - Worker 3: 24 - 18 = 6\n   - Worker 4: 28 - 24 = 4\n2. Calculate MRP (MP × Price $10):\n   - Worker 1: 10 × $10 = $100\n   - Worker 2: 8 × $10 = $80\n   - Worker 3: 6 × $10 = $60\n   - Worker 4: 4 × $10 = $40\n3. Compare to Wage ($50):\n   - Worker 1: $100 > $50 (Hire)\n   - Worker 2: $80 > $50 (Hire)\n   - Worker 3: $60 > $50 (Hire)\n   - Worker 4: $40 < $50 (Do not hire)\nThe firm stops hiring at the 3rd worker.",
    videoExplanation: null
  },
  {
    id: 5003,
    unit: 5,
    subject: "ap_microeconomics",
    lessonIDS: ["5.1"],
    unitName: "Factor Markets",
    question: "Refer to the table in the previous question. Assume an increase in consumer demand for the product raises the market price to $15 per unit. If the market wage rate remains constant at $50, what is the new profit-maximizing number of workers?",
    image: null,
    tableData: {
      headers: ["Number of Workers", "Total Product"],
      rows: [
        ["0", "0"],
        ["1", "10"],
        ["2", "18"],
        ["3", "24"],
        ["4", "28"],
        ["5", "30"]
      ]
    },
    options: [
      "2",
      "3",
      "4",
      "5",
      "6"
    ],
    correctAnswer: "C",
    explanation: "With the price increase to $15, the Marginal Revenue Product (MRP) for each worker increases. \n- 3rd Worker: MP is 6. New MRP = 6 × $15 = $90. ($90 > $50 Wage -> Hire).\n- 4th Worker: MP is 4. New MRP = 4 × $15 = $60. ($60 > $50 Wage -> Hire).\n- 5th Worker: MP is 2. New MRP = 2 × $15 = $30. ($30 < $50 Wage -> Do Not Hire).\nThe firm should now hire 4 workers.",
    videoExplanation: null
  },
  {
    id: 5004,
    unit: 5,
    subject: "ap_microeconomics",
    lessonIDS: ["5.1"],
    unitName: "Factor Markets",
    question: "Which of the following scenarios best illustrates the concept of 'derived demand'?",
    image: null,
    options: [
      "Consumers buy more smartphones because the price has decreased.",
      "An automobile manufacturer hires more assembly line workers because the demand for its cars has increased.",
      "A worker chooses to work more hours because the wage rate has risen.",
      "A software company buys faster computers to increase the productivity of its programmers.",
      "The government increases the minimum wage to help low-income families."
    ],
    correctAnswer: "B",
    explanation: "Derived demand means that the demand for a resource (labor, capital, land) depends entirely on the demand for the good or service that resource helps produce. Firms do not want workers for the sake of having workers; they want them because they produce the cars that customers are buying.",
    videoExplanation: null
  },
  {
    id: 5005,
    unit: 5,
    subject: "ap_microeconomics",
    lessonIDS: ["5.1"],
    unitName: "Factor Markets",
    question: "Which of the following events would cause the Marginal Revenue Product (MRP) curve for labor to shift to the right?",
    image: null,
    options: [
      "A decrease in the price of the final good produced by the labor.",
      "A decrease in the wage rate.",
      "An increase in the productivity of labor due to better training.",
      "An increase in the cost of raw materials.",
      "A decrease in the demand for the final product."
    ],
    correctAnswer: "C",
    explanation: "MRP is calculated as Marginal Product (MP) × Product Price (P). Therefore, an increase in either the productivity of the worker (MP) or the price of the good (P) will increase the MRP, shifting the curve to the right.",
    videoExplanation: null
  },
  // Lesson 5.2: Changes in Factor Demand and Factor Supply
  {
    id: 5006,
    unit: 5,
    subject: "ap_microeconomics",
    lessonIDS: ["5.2"],
    unitName: "Factor Markets",
    question: "Assume the supply of available certified welders decreases due to stricter licensing requirements. How will this change affect the number of welders hired and the Marginal Revenue Product (MRP) of the last welder hired in the new equilibrium?",
    image: null,
    optionTableHeaders: ["Number of Welders Hired", "MRP of Last Welder"],
    options: [
      "Increase | Decrease",
      "Decrease | Increase",
      "Decrease | Decrease",
      "Increase | Increase",
      "No Change | Increase"
    ],
    correctAnswer: "B",
    explanation: "A decrease in the supply of labor shifts the supply curve left, driving the equilibrium wage up and the quantity of workers hired down. As the firm moves up the labor demand curve (which is the MRP curve) to a lower quantity, the marginal revenue product of the last worker hired is higher (due to the law of diminishing marginal returns—fewer workers means higher marginal product).",
    videoExplanation: null
  },
  {
    id: 5007,
    unit: 5,
    subject: "ap_microeconomics",
    lessonIDS: ["5.2"],
    unitName: "Factor Markets",
    question: "Which of the following would cause the market supply curve for accountants to shift to the left?",
    image: null,
    options: [
      "An increase in the salaries paid to accountants.",
      "An increase in the salaries paid to financial analysts (a substitute job).",
      "A decrease in the cost of obtaining an accounting degree.",
      "An increase in the demand for accounting services.",
      "An increase in the number of students graduating with accounting degrees."
    ],
    correctAnswer: "B",
    explanation: "Labor supply shifts when the willingness or ability of workers to enter the profession changes. If a substitute profession (financial analyst) offers higher wages, potential accountants will switch careers to become analysts. This decreases the supply of accountants, shifting the curve to the left.",
    videoExplanation: null
  },
  // Lesson 5.3: Profit-Maximizing Amount of Labor
  {
    id: 5008,
    unit: 5,
    subject: "ap_microeconomics",
    lessonIDS: ["5.3"],
    unitName: "Factor Markets",
    question: "In a competitive labor market, if the government imposes a binding minimum wage, what is the expected impact on the quantity of labor demanded and supplied?",
    image: null,
    options: [
      "A shortage of labor will occur.",
      "The market will reach a new equilibrium with higher employment.",
      "The quantity of labor demanded will increase.",
      "The supply of labor will decrease.",
      "A surplus of labor will result."
    ],
    correctAnswer: "E",
    explanation: "A binding price floor is set above the equilibrium wage. At this higher wage, more workers are willing to work (quantity supplied increases), but firms are willing to hire fewer workers (quantity demanded decreases). The result is that Quantity Supplied > Quantity Demanded, creating a surplus of labor, also known as unemployment.",
    videoExplanation: null
  },
  {
    id: 5009,
    unit: 5,
    subject: "ap_microeconomics",
    lessonIDS: ["5.3"],
    unitName: "Factor Markets",
    question: "Which of the following correctly describes the labor supply curve faced by an individual firm in a perfectly competitive labor market versus the labor supply curve for the market as a whole?",
    image: null,
    optionTableHeaders: ["Individual Firm's Labor Supply", "Market Labor Supply"],
    options: [
      "Perfectly Elastic | Upward Sloping",
      "Upward Sloping | Perfectly Elastic",
      "Perfectly Inelastic | Downward Sloping",
      "Downward Sloping | Upward Sloping",
      "Upward Sloping | Upward Sloping"
    ],
    correctAnswer: "A",
    explanation: "In a perfectly competitive labor market, the market supply curve is upward sloping (higher wages attract more workers). However, the individual firm is a 'wage taker.' It can hire as many workers as it wants at the market equilibrium wage, but none at a lower wage. Therefore, the supply curve faced by the individual firm is perfectly elastic (horizontal) at the market wage.",
    videoExplanation: null
  },
  {
    id: 5010,
    unit: 5,
    subject: "ap_microeconomics",
    lessonIDS: ["5.3"],
    unitName: "Factor Markets",
    question: "Why is the firm's demand curve for labor downward sloping?",
    image: null,
    options: [
      "Because the wage rate decreases as the firm hires more workers.",
      "Because the price of the product must be lowered to sell more output.",
      "Because of the Law of Diminishing Marginal Returns.",
      "Because the firm is a monopsony.",
      "Because capital is a perfect substitute for labor."
    ],
    correctAnswer: "C",
    explanation: "The labor demand curve is the Marginal Revenue Product (MRP) curve. MRP = Marginal Product (MP) × Price. As a firm hires more workers in the short run, the Marginal Product of each additional worker eventually decreases (Law of Diminishing Marginal Returns). This causes the MRP to fall, resulting in a downward-sloping demand curve.",
    videoExplanation: null
  },
  // Lesson 5.4: Monopsonistic Markets
  {
    id: 5011,
    unit: 5,
    subject: "ap_microeconomics",
    lessonIDS: ["5.4"],
    unitName: "Factor Markets",
    question: "The graph above shows the cost and revenue curves for a firm in a labor market. Which of the following correctly identifies the profit-maximizing wage rate and quantity of labor if the firm acts as a monopsony, compared to the wage and quantity if the market were perfectly competitive?",
    image: { src: "/images/unitTestImages/unit5/unit5_monopsony_graph.png", alt: "Monopsony labor market graph" },
    optionTableHeaders: ["Monopsony Outcome", "Competitive Outcome"],
    options: [
      "Wage P2, Quantity Q2 | Wage P3, Quantity Q3",
      "Wage P4, Quantity Q2 | Wage P3, Quantity Q3",
      "Wage P1, Quantity Q1 | Wage P2, Quantity Q2",
      "Wage P5, Quantity Q2 | Wage P4, Quantity Q4",
      "Wage P3, Quantity Q3 | Wage P2, Quantity Q2"
    ],
    correctAnswer: "A",
    explanation: "A profit-maximizing monopsony hires labor where the Marginal Resource Cost (MRC) equals the Marginal Revenue Product (Demand). On the graph, MRC intersects Demand at quantity **Q2**. The firm then pays the wage indicated by the Supply curve at that quantity, which is **P2**. In a perfectly competitive labor market, equilibrium is determined where Market Supply intersects Market Demand, resulting in quantity **Q3** and wage **P3**.",
    videoExplanation: null
  },
  {
    id: 5012,
    unit: 5,
    subject: "ap_microeconomics",
    lessonIDS: ["5.4"],
    unitName: "Factor Markets",
    question: "Refer to the graph above. Suppose the government imposes a price floor at P2. Compared to the unregulated monopsony outcome, how will the wage rate and the number of workers hired change?",
    image: { src: "/images/unitTestImages/unit5/unit5_monopsony_graph.png", alt: "Monopsony labor market graph" },
    options: [
      "Wage Rate: Increases | Quantity Hired: Increases",
      "Wage Rate: Increases | Quantity Hired: Decreases",
      "Wage Rate: Decreases | Quantity Hired: Increases",
      "Wage Rate: Unchanged | Quantity Hired: Unchanged",
      "Wage Rate: Increases | Quantity Hired: Unchanged"
    ],
    correctAnswer: "A",
    explanation: "The unregulated monopsony pays wage P2 and hires Q2 workers. If a price floor is set at P3 (the competitive equilibrium price), the firm becomes a price taker at that wage rate. The firm's new Marginal Resource Cost (MRC) is equal to the minimum wage (P3) up to the supply limit. The firm will hire workers until the new MRC (P3) equals the Marginal Revenue Product (Demand). This intersection occurs at Q3. Therefore, both the wage rate (P2 to P3) and the quantity of workers hired (Q2 to Q3) will increase.",
    videoExplanation: null
  },
  {
    id: 5013,
    unit: 5,
    subject: "ap_microeconomics",
    lessonIDS: ["5.4"],
    unitName: "Factor Markets",
    question: "Why does the Marginal Resource Cost (MRC) curve lie above the labor supply curve for a monopsonist?",
    image: null,
    options: [
      "Because the firm can price discriminate and pay different wages to different workers.",
      "Because the supply of labor is perfectly elastic.",
      "Because the firm hires labor in a perfectly competitive market.",
      "Because to hire an additional worker, the firm must raise the wage for that worker and all currently employed workers.",
      "Because the marginal product of labor is diminishing."
    ],
    correctAnswer: "D",
    explanation: "A monopsony is the sole buyer of labor and faces the upward-sloping market supply curve. To attract one more worker, it must offer a higher wage. However, it cannot pay the new worker more than the existing workers (assuming no discrimination), so it must raise the wage for *everyone*. This extra cost makes the marginal cost of hiring the next worker higher than the wage paid to that worker.",
    videoExplanation: null
  },
  // Lesson 5.5: Least-Cost Rule
  {
    id: 5014,
    unit: 5,
    subject: "ap_microeconomics",
    lessonIDS: ["5.5"],
    unitName: "Factor Markets",
    question: "A firm sells its output in a perfectly competitive market and hires two inputs, capital and labor, in perfectly competitive factor markets. The product price is $10 per unit, the wage is $200 per day, and the marginal product of capital is 8 units per day. If the firm is choosing the least-cost combination of labor and capital, the firm's marginal product of labor and the price of capital must be equal to which of the following?",
    image: null,
    optionTableHeaders: ["Marginal Product of Labor", "Price of Capital"],
    options: [
      "20 | $80",
      "20 | $8",
      "5 | $80",
      "5 | $40",
      "25 | $100"
    ],
    correctAnswer: "A",
    explanation: "To minimize costs (and maximize profit in a perfectly competitive market), the firm employs inputs where the Marginal Revenue Product (MRP) equals the factor price. \n1. Find Marginal Product of Labor ($MP_L$): We know Wage ($P_L$) = $MRP_L = P_{product} \times MP_L$. \n   $200 = $10 \times MP_L \rightarrow MP_L = 20$.\n2. Find Price of Capital ($P_K$): We know $P_K = MRP_K = P_{product} \times MP_K$.\n   $P_K = $10 \times 8 = $80.\nAlternatively, you can check the least-cost rule: $MP_L/P_L = MP_K/P_K \rightarrow 20/200 = 8/80 = 0.1$.",
    videoExplanation: null
  }
];

// Helper function to get unit test questions for a specific unit
// Optionally filter by subject to ensure macro and micro questions don't mix
export const getUnitTestQuestions = (
  unitNumber: number,
  subject?: 'ap_macroeconomics' | 'ap_microeconomics'
): QuestionType[] => {
  return unitTestQuestions.filter(q => 
    q.unit === unitNumber && 
    (!subject || q.subject === subject)
  );
};

// Export individual unit tests
export const unit1TestQuestions = getUnitTestQuestions(1);
export const unit2TestQuestions = getUnitTestQuestions(2);
export const unit3TestQuestions = getUnitTestQuestions(3);
export const unit4TestQuestions = getUnitTestQuestions(4);
export const unit5TestQuestions = getUnitTestQuestions(5);
export const unit6TestQuestions = getUnitTestQuestions(6);
