import { Question as QuestionType } from '@/data/questionBanks/types';

// Import the macroSetTwoQuestions from the macroSetTwo.ts file
import { macroSetTwoQuestions } from '../questionBanks/macro/mcqs/macroSetTwo';
import allQS139 from "../../../public/images/allQS139.png"
import allQS140 from "../../../public/images/allQS140.png"
import allQS141 from "../../../public/images/allQS141.png"
import allQS142 from "../../../public/images/allQS142.png"
import allQS143 from "../../../public/images/allQS143.png"
import allQS144 from "../../../public/images/allQS144.png"
import allQS145 from "../../../public/images/allQS145.png"
import allQS146 from "../../../public/images/allQS146.png"
// Create arrays for each unit
const unit1Questions = macroSetTwoQuestions.questions.filter(q => q.unit === 1);
const unit2Questions = macroSetTwoQuestions.questions.filter(q => q.unit === 2);
const unit3Questions = macroSetTwoQuestions.questions.filter(q => q.unit === 3);
const unit4Questions = macroSetTwoQuestions.questions.filter(q => q.unit === 4);
const unit5Questions = macroSetTwoQuestions.questions.filter(q => q.unit === 5);
const unit6Questions = macroSetTwoQuestions.questions.filter(q => q.unit === 6);



const macroUnit1Questions = [
  {
    "id": 1,
    "unit": 1,
    "lessonIDS": ["1.1"], 
    "unitName": "Basic Economic Concepts",
    "question": "The fundamental problem of economics that arises from limited resources and unlimited wants is known as:",
    "image": null,
    "options": [
      "Opportunity cost.",
      "Comparative advantage.",
      "Scarcity.",
      "Equilibrium.",
      "Efficiency."
    ],
    "correctAnswer": "C",
    "explanation": "Scarcity is the core economic problem referring to the conflict between society's unlimited wants and its limited resources, necessitating choices about resource allocation."
  },
  {
    "id": 2,
    "unit": 1,
    "lessonIDS": ["1.2"], 
    "unitName": "Basic Economic Concepts",
    "question": "The value of the best alternative forgone when a choice is made is called:",
    "image": null,
    "options": [
      "Explicit cost.",
      "Marginal cost.",
      "Scarcity.",
      "Opportunity cost.",
      "Comparative cost."
    ],
    "correctAnswer": "D",
    "explanation": "Opportunity cost is the value of the next best alternative that must be sacrificed when making a decision. It highlights the trade-offs inherent in every choice."
  },
  {
    "id": 3,
    "unit": 1,
    "lessonIDS": ["1.2"], 
    "unitName": "Basic Economic Concepts",
    "question": "A point located inside the Production Possibilities Curve (PPC) indicates that:",
    "image": null,
    "options": [
      "The economy is operating at full employment.",
      "Resources are being used inefficiently or are unemployed.",
      "The economy has experienced economic growth.",
      "The combination of goods is unattainable with current resources.",
      "The economy is producing beyond its capacity."
    ],
    "correctAnswer": "B",
    "explanation": "Points inside the PPC represent attainable production levels but signify inefficiency, meaning resources (like labor or capital) are either unemployed or not being used to their full potential."
  },
  {
    "id": 4,
    "unit": 1,
    "lessonIDS": ["1.2"], 
    "unitName": "Basic Economic Concepts",
    "question": "Which of the following would cause an outward shift of a nation's Production Possibilities Curve (PPC)?",
    "image": null,
    "options": [
      "A decrease in unemployment.",
      "An increase in the general price level.",
      "A natural disaster destroying resources.",
      "An improvement in technology applicable to production.",
      "A shift in consumer preferences."
    ],
    "correctAnswer": "D",
    "explanation": "An outward shift of the PPC signifies economic growth. This can result from increases in resource availability (land, labor, capital) or improvements in technology that allow more output to be produced with the same resources."
  },
  {
    "id": 5,
    "unit": 1,
    "lessonIDS": ["1.3"], 
    "unitName": "Basic Economic Concepts",
    "question": "Country A can produce 10 cars or 20 computers. Country B can produce 8 cars or 12 computers. Which country has the comparative advantage in producing cars?",
    "image": null,
    "options": [
      "Country A.",
      "Country B.",
      "Neither country.",
      "Both countries.",
      "Cannot be determined from the information given."
    ],
    "correctAnswer": "B",
    "explanation": "To find comparative advantage, calculate opportunity costs. Country A's opportunity cost of 1 car is 2 computers (20/10). Country B's opportunity cost of 1 car is 1.5 computers (12/8). Since Country B has the lower opportunity cost for cars, it has the comparative advantage."
  },
  {
    "id": 6,
    "unit": 1,
    "lessonIDS": ["1.3"], 
    "unitName": "Basic Economic Concepts",
    "question": "Specialization and trade based on comparative advantage lead to:",
    "image": null,
    "options": [
      "Increased scarcity.",
      "A decrease in total world production.",
      "Higher opportunity costs for all nations.",
      "An increase in total world production and consumption possibilities.",
      "A shift inward of the Production Possibilities Curve for trading nations."
    ],
    "correctAnswer": "D",
    "explanation": "When countries specialize in goods where they have a lower opportunity cost (comparative advantage) and trade, global efficiency increases. This results in higher total world output and allows countries to consume beyond their individual production possibilities."
  },
  {
    "id": 7,
    "unit": 1,
    "lessonIDS": ["1.4"], 
    "unitName": "Basic Economic Concepts",
    "question": "According to the law of demand, an increase in the price of a good, ceteris paribus, leads to:",
    "image": null,
    "options": [
      "An increase in the quantity demanded.",
      "A decrease in demand.",
      "A decrease in the quantity demanded.",
      "An increase in demand.",
      "No change in quantity demanded."
    ],
    "correctAnswer": "C",
    "explanation": "The law of demand describes the inverse relationship between price and quantity demanded, holding other factors constant. When the price of a good rises, consumers typically buy less of it."
  },
  {
    "id": 8,
    "unit": 1,
    "lessonIDS": ["1.5"], 
    "unitName": "Basic Economic Concepts",
    "question": "Which of the following would cause the supply curve for smartphones to shift to the right?",
    "image": null,
    "options": [
      "An increase in the wages of smartphone factory workers.",
      "A decrease in the price of smartphones.",
      "An improvement in the technology used to produce smartphones.",
      "An expectation by sellers that smartphone prices will rise significantly next month.",
      "An increase in taxes on smartphone producers."
    ],
    "correctAnswer": "C",
    "explanation": "A rightward shift in supply indicates an increase in supply. Technological improvements often lower production costs, enabling firms to supply more at each price level."
  },
  {
    "id": 9,
    "unit": 1,
    "lessonIDS": ["1.6"], 
    "unitName": "Basic Economic Concepts",
    "question": "In a competitive market, equilibrium is achieved when:",
    "image": null,
    "options": [
      "There is a surplus of the good.",
      "There is a shortage of the good.",
      "The price is set by the government.",
      "Quantity supplied equals quantity demanded.",
      "Demand equals supply."
    ],
    "correctAnswer": "D",
    "explanation": "Market equilibrium occurs at the price where the amount producers are willing to sell (quantity supplied) is exactly equal to the amount consumers are willing to buy (quantity demanded). There is no tendency for the price to change at this point."
  },
  {
    "id": 10,
    "unit": 1,
    "lessonIDS": ["1.4", "1.6"], 
    "unitName": "Basic Economic Concepts",
    "question": "If consumer incomes increase and gasoline is a normal good, what will happen in the market for gasoline, ceteris paribus?",
    "image": null,
    "options": [
      "Equilibrium price will decrease, and equilibrium quantity will increase.",
      "Equilibrium price will increase, and equilibrium quantity will decrease.",
      "Equilibrium price and quantity will both decrease.",
      "Equilibrium price and quantity will both increase.",
      "Equilibrium price will increase, and equilibrium quantity will remain unchanged."
    ],
    "correctAnswer": "D",
    "explanation": "For a normal good, higher consumer incomes lead to an increase in demand (a rightward shift of the demand curve). This increase in demand causes both the equilibrium price and the equilibrium quantity to rise."
  }
]


const macroUnit2Questions = [
  {
    "id": 11,
    "unit": 2,
    "lessonIDS": ["2.4"],
    "unitName": "Economic Indicators and the Business Cycle",
    "question": "If the Consumer Price Index (CPI) was 150 in Year 1 and 165 in Year 2, the inflation rate between Year 1 and Year 2 was:",
    "image": null,
    "options": [
      "9.1%",
      "10.0%",
      "15.0%",
      "16.5%",
      "5.0%"
    ],
    "correctAnswer": "B",
    "explanation": "The formula for the inflation rate is: Inflation Rate = [(CPI Year 2 - CPI Year 1) / CPI Year 1] x 100. So, Inflation Rate = [(165 - 150) / 150] x 100 = (15 / 150) x 100 = 0.1 x 100 = 10.0%."
  },
  {
    "id": 12,
    "unit": 2,
    "lessonIDS": ["2.3"],
    "unitName": "Economic Indicators and the Business Cycle",
    "question": "Suppose an economy has an adult population of 250 million, 150 million employed, and 10 million unemployed. The labor force participation rate is:",
    "image": null,
    "options": [
      "4.0%",
      "60.0%",
      "64.0%",
      "93.75%",
      "6.25%"
    ],
    "correctAnswer": "C",
    "explanation": "First, find the labor force: Labor Force = Employed + Unemployed = 150 million + 10 million = 160 million. Then, calculate the Labor Force Participation Rate: LFPR = (Labor Force / Adult Population) x 100 = (160 million / 250 million) x 100 = 0.64 x 100 = 64.0%."
  },
  {
    "id": 13,
    "unit": 2,
    "lessonIDS": ["2.6"],
    "unitName": "Economic Indicators and the Business Cycle",
    "question": "If Nominal GDP is $15 trillion and Real GDP is $12 trillion, the GDP Deflator is:",
    "image": null,
    "options": [
      "80",
      "100",
      "115",
      "125",
      "150"
    ],
    "correctAnswer": "D",
    "explanation": "The formula for the GDP Deflator is: GDP Deflator = (Nominal GDP / Real GDP) x 100. So, GDP Deflator = ($15 trillion / $12 trillion) x 100 = 1.25 x 100 = 125."
  },
  {
    "id": 14,
    "unit": 2,
    "lessonIDS": ["2.3", "2.7"],
    "unitName": "Economic Indicators and the Business Cycle",
    "question": "A worker who is laid off due to a downturn in the business cycle represents which type of unemployment?",
    "image": null,
    "options": [
      "Frictional unemployment",
      "Structural unemployment",
      "Cyclical unemployment",
      "Seasonal unemployment",
      "Natural unemployment"
    ],
    "correctAnswer": "C",
    "explanation": "Cyclical unemployment is directly related to the health of the economy. It rises during recessions (downturns) when firms lay off workers due to decreased demand and falls during economic expansions."
  },
  {
    "id": 15,
    "unit": 2,
    "lessonIDS": ["2.4"],
    "unitName": "Economic Indicators and the Business Cycle",
    "question": "Assume the market basket cost $200 in the base year and $250 in the current year. The Consumer Price Index (CPI) for the current year is:",
    "image": null,
    "options": [
      "80",
      "100",
      "120",
      "125",
      "250"
    ],
    "correctAnswer": "D",
    "explanation": "The formula for CPI is: CPI = (Cost of Basket in Current Year / Cost of Basket in Base Year) x 100. So, CPI = ($250 / $200) x 100 = 1.25 x 100 = 125."
  },
  {
    "id": 16,
    "unit": 2,
    "lessonIDS": ["2.2"],
    "unitName": "Economic Indicators and the Business Cycle",
    "question": "Which of the following is a limitation of using GDP as a measure of a country's overall well-being?",
    "image": null,
    "options": [
      "It includes the value of intermediate goods.",
      "It fails to account for the distribution of income.",
      "It double counts transfer payments.",
      "It only measures the production of goods, not services.",
      "It adjusts for changes in the price level."
    ],
    "correctAnswer": "B",
    "explanation": "GDP is an aggregate measure and does not reveal how income is distributed. A high GDP could mask significant income inequality, which affects overall societal well-being. Other limitations include ignoring leisure time, environmental quality, and non-market activities."
  },
  {
    "id": 17,
    "unit": 2,
    "lessonIDS": ["2.6"],
    "unitName": "Economic Indicators and the Business Cycle",
    "question": "If Nominal GDP is $10 trillion and the GDP Deflator is 125, Real GDP is:",
    "image": null,
    "options": [
      "$8 trillion",
      "$10 trillion",
      "$12.5 trillion",
      "$125 trillion",
      "$7.5 trillion"
    ],
    "correctAnswer": "A",
    "explanation": "The formula relating these is: Real GDP = (Nominal GDP / GDP Deflator) x 100. So, Real GDP = ($10 trillion / 125) x 100 = $0.08 trillion x 100 = $8 trillion."
  },
  {
    "id": 18,
    "unit": 2,
    "lessonIDS": ["2.3"],
    "unitName": "Economic Indicators and the Business Cycle",
    "question": "If an economy has 10 million people unemployed and 190 million people employed, the unemployment rate is:",
    "image": null,
    "options": [
      "5.0%",
      "5.26%",
      "10.0%",
      "19.0%",
      "4.76%"
    ],
    "correctAnswer": "A",
    "explanation": "First, find the labor force: Labor Force = Employed + Unemployed = 190 million + 10 million = 200 million. Then, calculate the Unemployment Rate: UR = (# Unemployed / Labor Force) x 100 = (10 million / 200 million) x 100 = 0.05 x 100 = 5.0%."
  },
  {
    "id": 19,
    "unit": 2,
    "lessonIDS": ["2.2"],
    "unitName": "Economic Indicators and the Business Cycle",
    "question": "Gross Domestic Product (GDP) fails to account for which of the following?",
    "image": null,
    "options": [
      "The production of services.",
      "The value of non-market activities, such as household production.",
      "Investment spending by businesses.",
      "Government purchases of goods and services.",
      "Net exports."
    ],
    "correctAnswer": "B",
    "explanation": "GDP measures the market value of final goods and services produced. It excludes non-market transactions like unpaid household work, volunteer work, and illegal activities, which can be substantial."
  },
  {
    "id": 20,
    "unit": 2,
    "lessonIDS": ["2.4"],
    "unitName": "Economic Indicators and the Business Cycle",
    "question": "The Consumer Price Index (CPI) tends to overstate the true rate of inflation primarily because it:",
    "image": null,
    "options": [
      "Includes the price of imported goods.",
      "Does not fully account for consumers' ability to substitute towards cheaper goods.",
      "Uses a base year that is too far in the past.",
      "Excludes the price of services.",
      "Fails to account for changes in nominal wages."
    ],
    "correctAnswer": "B",
    "explanation": "The CPI uses a fixed basket of goods and services. When prices change, consumers often substitute away from more expensive items towards cheaper ones. The CPI's fixed basket doesn't capture this substitution effect, leading to an overestimation of the cost of living increase (substitution bias)."
  },
  {
    "id": 21,
    "unit": 2,
    "lessonIDS": ["2.6"],
    "unitName": "Economic Indicators and the Business Cycle",
    "question": "If Real GDP was $10 trillion in Year 1 and $10.5 trillion in Year 2, the economic growth rate between Year 1 and Year 2 was:",
    "image": null,
    "options": [
      "0.5%",
      "5.0%",
      "10.0%",
      "10.5%",
      "-5.0%"
    ],
    "correctAnswer": "B",
    "explanation": "The economic growth rate is the percentage change in Real GDP. Growth Rate = [(Real GDP Year 2 - Real GDP Year 1) / Real GDP Year 1] x 100 = [($10.5T - $10T) / $10T] x 100 = ($0.5T / $10T) x 100 = 0.05 x 100 = 5.0%."
  },
  {
    "id": 22,
    "unit": 2,
    "lessonIDS": ["2.1", "2.6"],
    "unitName": "Economic Indicators and the Business Cycle",
    "question": "An economy produces only apples and bananas. In one year, 100 apples are sold at $1 each, and 50 bananas are sold at $2 each. Nominal GDP for that year is:",
    "image": null,
    "options": [
      "$100",
      "$150",
      "$200",
      "$300",
      "$50"
    ],
    "correctAnswer": "C",
    "explanation": "Nominal GDP is the market value of all final goods and services produced. Calculate the value of each good and sum them: Nominal GDP = (Price_Apples x Quantity_Apples) + (Price_Bananas x Quantity_Bananas) = ($1 x 100) + ($2 x 50) = $100 + $100 = $200."
  },
  {
    "id": 23,
    "unit": 2,
    "lessonIDS": ["2.6"],
    "unitName": "Economic Indicators and the Business Cycle",
    "question": "By definition, the value of a price index, such as the CPI or GDP Deflator, in the base year is always equal to:",
    "image": null,
    "options": [
      "0",
      "1",
      "10",
      "100",
      "The inflation rate."
    ],
    "correctAnswer": "D",
    "explanation": "Price indices are benchmarked to a base year. In the base year, the index compares the cost of the basket (or overall prices) to itself, resulting in a value of (Cost / Cost) x 100 = 100."
  },
  {
    "id": 24,
    "unit": 2,
    "lessonIDS": ["2.3"],
    "unitName": "Economic Indicators and the Business Cycle",
    "question": "Which of the following individuals would be officially classified as unemployed?",
    "image": null,
    "options": [
      "A person working part-time who wants a full-time job.",
      "A discouraged worker who has stopped looking for a job.",
      "A full-time student not looking for work.",
      "A retiree receiving a pension.",
      "A person who was laid off last week and is actively seeking a new job."
    ],
    "correctAnswer": "E",
    "explanation": "The official definition of unemployed requires a person to be jobless, available for work, and actively seeking work within the past four weeks. Discouraged workers (B) are not actively seeking. Part-time workers (A) are considered employed. Students (C) and retirees (D) not seeking work are not in the labor force."
  },
  {
    "id": 25,
    "unit": 2,
    "lessonIDS": ["2.5"],
    "unitName": "Economic Indicators and the Business Cycle",
    "question": "Which group is most likely to be negatively impacted by unanticipated inflation?",
    "image": null,
    "options": [
      "Borrowers with fixed-interest rate loans.",
      "Individuals whose wages are indexed to the CPI.",
      "The government, due to increased tax revenue.",
      "Lenders providing loans at fixed interest rates.",
      "Owners of real estate."
    ],
    "correctAnswer": "D",
    "explanation": "Unanticipated inflation reduces the purchasing power of money repaid in the future. Lenders receiving fixed interest payments find that the real value of those payments is lower than expected, hurting their returns. Borrowers with fixed rates benefit by repaying loans with less valuable dollars."
  }
]


const macroUnit3Questions = [
  {
    "id": 26,
    "unit": 3,
    "lessonIDS": ["3.1"],
    "unitName": "National Income and Price Determination",
    "question": "Which of the following events would most likely cause the aggregate demand curve to shift to the right?",
    "image": null,
    "options": [
      "A decrease in household wealth",
      "An increase in interest rates",
      "An increase in expected future inflation",
      "A decrease in government transfer payments",
      "An appreciation of the domestic currency"
    ],
    "correctAnswer": "C",
    "explanation": "If households expect higher inflation in the future, they are incentivized to increase current consumption spending now, shifting AD to the right. Other options decrease AD (A, B, D) or decrease net exports, thus decreasing AD (E)."
  },
  {
    "id": 27,
    "unit": 3,
    "lessonIDS": ["3.2"],
    "unitName": "National Income and Price Determination",
    "question": "If the marginal propensity to save (MPS) is 0.2, and the government increases spending by $100 billion with no change in taxes, what is the maximum possible change in real GDP?",
    "image": null,
    "options": [
      "Increase by $50 billion",
      "Decrease by $100 billion",
      "Increase by $200 billion",
      "Increase by $400 billion",
      "Increase by $500 billion"
    ],
    "correctAnswer": "E",
    "explanation": "The spending multiplier is 1 / MPS = 1 / 0.2 = 5. The maximum change in GDP is the multiplier times the initial change in spending: 5 * $100 billion = $500 billion increase."
  },
  {
    "id": 28,
    "unit": 3,
    "lessonIDS": ["3.3"],
    "unitName": "National Income and Price Determination",
    "question": "Suppose there is a significant increase in the internationally traded price of energy, a major input for production in Country X. How would this likely affect the short-run aggregate supply (SRAS) and the price level in Country X?",
    "image": null,
    "options": [
      "SRAS shifts right, Price level decreases",
      "SRAS shifts left, Price level increases",
      "SRAS shifts right, Price level increases",
      "SRAS shifts left, Price level decreases",
      "No change in SRAS, Price level increases"
    ],
    "correctAnswer": "B",
    "explanation": "An increase in the price of a key input like energy increases production costs for firms. This leads to a decrease (leftward shift) in the SRAS curve, resulting in a higher price level and lower output in the short run."
  },
  {
    "id": 29,
    "unit": 3,
    "lessonIDS": ["3.5", "3.7", "2.3"],
    "unitName": "National Income and Price Determination",
    "question": "An economy's actual real GDP is currently $500 billion, while its potential real GDP (full employment output) is estimated to be $550 billion. Based on this information, which of the following is most likely true regarding the unemployment rate?",
    "image": null,
    "options": [
      "The unemployment rate is equal to the natural rate of unemployment.",
      "The unemployment rate is below the natural rate of unemployment.",
      "The unemployment rate is above the natural rate of unemployment.",
      "The unemployment rate is zero.",
      "The relationship between the output gap and unemployment cannot be determined."
    ],
    "correctAnswer": "C",
    "explanation": "When actual output ($500b) is below potential output ($550b), the economy is in a recessionary gap, indicating cyclical unemployment exists. Therefore, the actual unemployment rate is above the natural rate of unemployment (which corresponds to full employment/potential output)."
  },
  {
    "id": 30,
    "unit": 3,
    "lessonIDS": ["3.6", "3.8"],
    "unitName": "National Income and Price Determination",
    "question": "Assume an economy is initially in long-run equilibrium. The government then significantly increases its spending on infrastructure projects without changing taxes. In the short run, what is the most likely impact on the price level and real GDP?",
    "image": null,
    "options": [
      "Price level decreases, Real GDP decreases",
      "Price level increases, Real GDP decreases",
      "Price level decreases, Real GDP increases",
      "Price level increases, Real GDP increases",
      "No change in price level, Real GDP increases"
    ],
    "correctAnswer": "D",
    "explanation": "Increased government spending is expansionary fiscal policy, shifting the Aggregate Demand (AD) curve to the right. Moving along the upward-sloping Short-Run Aggregate Supply (SRAS) curve, this leads to a higher price level and higher real GDP in the short run."
  },
  {
    "id": 31,
    "unit": 3,
    "lessonIDS": ["3.6"],
    "unitName": "National Income and Price Determination",
    "question": "Which of the following scenarios would lead to an increase in real GDP and a decrease in the price level in the short run?",
    "image": null,
    "options": [
       "A decrease in government spending",
       "A widespread technological advancement",
       "An increase in consumer confidence",
       "An increase in the expected price level",
       "A decrease in net exports"
    ],
    "correctAnswer": "B",
    "explanation": "A widespread technological advancement increases productivity, shifting the Short-Run Aggregate Supply (SRAS) curve to the right. This leads to higher real GDP and a lower price level."
  },
  {
    "id": 32,
    "unit": 3,
    "lessonIDS": ["3.7"],
    "unitName": "National Income and Price Determination",
    "question": "If an economy is experiencing an inflationary gap (actual output > potential output), how will the economy typically self-adjust back to long-run equilibrium assuming no government intervention?",
    "image": null,
    "options": [
      "Nominal wages will fall, shifting SRAS right.",
      "Nominal wages will rise, shifting SRAS left.",
      "Productivity will increase, shifting LRAS right.",
      "Consumer confidence will fall, shifting AD left.",
      "Interest rates will fall, shifting AD right."
    ],
    "correctAnswer": "B",
    "explanation": "In an inflationary gap, high demand for resources leads to rising input costs, particularly nominal wages. As nominal wages increase, the SRAS curve shifts to the left, eventually restoring the economy to long-run equilibrium at potential output but with a higher price level."
  },
  {
    "id": 33,
    "unit": 3,
    "lessonIDS": ["3.8"],
    "unitName": "National Income and Price Determination",
    "question": "To combat a severe recession, policymakers decide to implement discretionary fiscal policy. Which of the following actions represents an appropriate expansionary fiscal policy?",
    "image": null,
    "options": [
      "Increasing income tax rates",
      "Decreasing government spending on education",
      "Passing legislation to increase transfer payments (e.g., unemployment benefits)",
      "Selling government bonds to the public",
      "Increasing the required reserve ratio for banks"
    ],
    "correctAnswer": "C",
    "explanation": "Expansionary fiscal policy aims to increase aggregate demand during a recession. Increasing transfer payments puts more disposable income in the hands of households, boosting consumption and shifting AD to the right. Options A and B are contractionary fiscal policy. Options D and E relate to monetary policy."
  },
  {
    "id": 34,
    "unit": 3,
    "lessonIDS": ["3.9"],
    "unitName": "National Income and Price Determination",
    "question": "During an economic expansion, the nation's progressive income tax system results in automatically higher tax revenues. This phenomenon is an example of:",
    "image": null,
    "options": [
      "Contractionary discretionary fiscal policy",
      "Expansionary discretionary fiscal policy",
      "An automatic stabilizer dampening the expansion",
      "A shift in the long-run aggregate supply curve",
      "The money multiplier effect"
    ],
    "correctAnswer": "C",
    "explanation": "Automatic stabilizers work without specific legislative action. In a progressive tax system, as incomes rise during an expansion, people move into higher tax brackets, and tax revenues increase automatically. This withdraws spending power from the economy, slightly dampening the expansion, acting as a stabilizer."
  },
  {
    "id": 35,
    "unit": 3,
    "lessonIDS": ["3.3", "3.7"],
    "unitName": "National Income and Price Determination",
    "question": "A negative demand shock hits an economy, pushing it into a recession. Nominal wages are observed to be 'sticky' downwards. What is a likely consequence of these sticky nominal wages during the recession?",
    "image": null,
    "options": [
      "A rapid return to full employment as firms quickly lower wages.",
      "An immediate increase in the aggregate price level.",
      "A prolonged period of unemployment above the natural rate.",
      "A shift of the Long-Run Aggregate Supply (LRAS) curve to the left.",
      "A decrease in the effectiveness of automatic stabilizers."
    ],
    "correctAnswer": "C",
    "explanation": "Sticky nominal wages mean that wages do not fall easily even when aggregate demand decreases (reducing the demand for labor). Firms facing lower demand and unable to cut nominal wages may instead reduce employment significantly, leading to higher and potentially more persistent cyclical unemployment (actual unemployment above the natural rate) than if wages were flexible downwards."
  }
]


const macroUnit4Questions = [
  {
    "id": 36,
    "unit": 4,
    "lessonIDS": ["4.1"],
    "unitName": "Financial Sector",
    "question": "Which statement best describes a key difference between bonds and stocks?",
    "image": null,
    "options": [
      "Bonds represent ownership in a corporation, while stocks represent debt.",
      "Bondholders receive dividend payments, while stockholders receive interest payments.",
      "Stocks generally offer a fixed return, while bond returns fluctuate with company profits.",
      "Bonds represent a loan to an entity (government or corporation), while stocks represent partial ownership.",
      "Selling bonds increases a company's equity, while issuing stock increases its liabilities."
    ],
    "correctAnswer": "D",
    "explanation": "A bond is essentially an IOU, representing debt that must be repaid with interest. A stock represents equity or ownership in a corporation, giving the holder a claim on profits (dividends)."
  },
  {
    "id": 37,
    "unit": 4,
    "lessonIDS": ["4.2"],
    "unitName": "Financial Sector",
    "question": "If the nominal interest rate on a one-year loan is 5% and the expected inflation rate for that year is 3%, what is the expected real interest rate?",
    "image": null,
    "options": [
      "-2%",
      "2%",
      "3%",
      "5%",
      "8%"
    ],
    "correctAnswer": "B",
    "explanation": "The approximate real interest rate is calculated as the nominal interest rate minus the inflation rate: Real Interest Rate ≈ Nominal Interest Rate - Inflation Rate = 5% - 3% = 2%."
  },
  {
    "id": 38,
    "unit": 4,
    "lessonIDS": ["4.2"],
    "unitName": "Financial Sector",
    "question": "According to the Fisher effect, if lenders expect a higher rate of inflation in the future, they will likely:",
    "image": null,
    "options": [
      "Decrease the nominal interest rate they charge.",
      "Increase the nominal interest rate they charge.",
      "Decrease the real interest rate they expect to earn.",
      "Keep the nominal interest rate constant.",
      "Lend only to the government."
    ],
    "correctAnswer": "B",
    "explanation": "The Fisher effect suggests that nominal interest rates adjust to incorporate expected inflation. To maintain their desired real return, lenders will demand higher nominal interest rates when they anticipate higher inflation."
  },
  {
    "id": 39,
    "unit": 4,
    "lessonIDS": ["4.3"],
    "unitName": "Financial Sector",
    "question": "When you use cash to buy groceries, money is primarily functioning as a:",
    "image": null,
    "options": [
      "Store of value",
      "Unit of account",
      "Medium of exchange",
      "Standard of deferred payment",
      "Financial asset"
    ],
    "correctAnswer": "C",
    "explanation": "Using money to directly purchase goods and services demonstrates its role as a medium of exchange – an intermediary instrument used to facilitate transactions, avoiding the need for barter."
  },
  {
    "id": 40, 
    "unit": 4,
    "lessonIDS": ["4.3"],
    "unitName": "Financial Sector",
    "question": "Which statement best distinguishes the M1 measure of the money supply from M2?",
    "image": null,
    "options": [
      "M1 includes savings accounts, while M2 does not.",
      "M2 includes demand deposits, while M1 does not.",
      "M1 primarily includes assets used directly as a medium of exchange, while M2 adds near monies.",
      "M2 excludes currency and coin in circulation.",
      "M1 includes small-denomination time deposits (CDs)."
    ],
    "correctAnswer": "C",
    "explanation": "M1 consists of the most liquid forms of money used for transactions (currency, demand deposits, traveler's checks). M2 includes all of M1 plus less liquid assets ('near monies') like savings deposits, small CDs, and money market mutual funds, which serve more as a store of value but can be easily converted."
  },
  {
    "id": 41,
    "unit": 4,
    "lessonIDS": ["4.4"],
    "unitName": "Financial Sector",
    "question": "Suppose the required reserve ratio is 10%. If Sarah deposits $1,000 cash into her checking account at First Bank, what is the maximum possible increase in the total money supply from this single deposit?",
    "image": null,
    "options": [
      "$100",
      "$900",
      "$1,000",
      "$9,000",
      "$10,000"
    ],
    "correctAnswer": "D",
    "explanation": "When cash held by the public ($1000) is deposited, it becomes reserves. The bank must hold 10% ($100) but can lend out 90% ($900). This $900 initiates the money multiplier process. The simple money multiplier is 1 / RRR = 1 / 0.10 = 10. The maximum potential *increase* in checkable deposits is Initial Excess Reserves * Multiplier = $900 * 10 = $9,000. Since the initial $1000 cash was already part of M1 (currency), depositing it doesn't change M1 initially, but the subsequent lending *does*. The $9,000 represents the new checkable deposits created through lending."
  },
  {
    "id": 42,
    "unit": 4,
    "lessonIDS": ["4.4"],
    "unitName": "Financial Sector",
    "question": "Assume the required reserve ratio is 20%. If the central bank buys $50 million worth of government bonds from the public, what is the maximum possible change in the money supply?",
    "image": null,
    "options": [
      "Increase by $10 million",
      "Increase by $50 million",
      "Increase by $200 million",
      "Increase by $250 million",
      "Decrease by $50 million"
    ],
    "correctAnswer": "D",
    "explanation": "When the central bank buys bonds from the public, the payment injects new reserves into the banking system. The money multiplier is 1 / RRR = 1 / 0.20 = 5. The maximum potential change in the money supply (specifically checkable deposits) is the change in reserves times the multiplier: $50 million * 5 = $250 million increase."
  },
  {
    "id": 43,
    "unit": 4,
    "lessonIDS": ["4.4"],
    "unitName": "Financial Sector",
    "question": "The actual expansion of the money supply following a new deposit or open market operation is often less than the maximum potential expansion primarily because:",
    "image": null,
    "options": [
      "The required reserve ratio is too high.",
      "Banks may choose to hold excess reserves.",
      "The central bank frequently changes the discount rate.",
      "People prefer holding stocks to holding cash.",
      "The government increases taxes."
    ],
    "correctAnswer": "B",
    "explanation": "The simple money multiplier assumes banks lend out all excess reserves and that all loaned money is redeposited into the banking system. In reality, banks may hold excess reserves (not lend everything out) and individuals/firms may hold onto some cash (currency drain), both reducing the actual multiplier effect."
  },
  {
    "id": 44,
    "unit": 4,
    "lessonIDS": ["4.5"],
    "unitName": "Financial Sector",
    "question": "If the overall price level in the economy increases, what is the likely short-run impact on the money demand curve and the nominal interest rate, ceteris paribus?",
    "image": null,
    "options": [
      "Money demand shifts left, nominal interest rate decreases.",
      "Money demand shifts right, nominal interest rate increases.",
      "Money demand shifts right, nominal interest rate decreases.",
      "Money demand shifts left, nominal interest rate increases.",
      "Money supply shifts right, nominal interest rate decreases."
    ],
    "correctAnswer": "B",
    "explanation": "A higher price level increases the amount of money needed for transactions (transactions demand for money). This shifts the money demand curve to the right. Assuming the money supply is held constant by the central bank, this increase in demand leads to a higher equilibrium nominal interest rate."
  },
  {
    "id": 45,
    "unit": 4,
    "lessonIDS": ["4.5", "4.6"],
    "unitName": "Financial Sector",
    "question": "If the central bank conducts an open market sale of government bonds (in a traditional, limited reserves system), what is the expected impact on the money supply and the nominal interest rate?",
    "image": null,
    "options": [
      "Money supply increases, nominal interest rate decreases.",
      "Money supply decreases, nominal interest rate increases.",
      "Money supply increases, nominal interest rate increases.",
      "Money supply decreases, nominal interest rate decreases.",
      "No change in money supply, nominal interest rate increases."
    ],
    "correctAnswer": "B",
    "explanation": "Selling bonds removes reserves from the banking system as banks/public pay the central bank. This leads to a decrease in the money supply (shifts MS left in the traditional model). With less money available relative to demand, the price of holding money (the nominal interest rate) increases."
  },
  {
    "id": 46,
    "unit": 4,
    "lessonIDS": ["4.6", "3.8"],
    "unitName": "Financial Sector",
    "question": "Country X is experiencing a significant recessionary gap. If its central bank operates under an ample reserves system, which monetary policy action would be most appropriate to stimulate the economy?",
    "image": null,
    "options": [
      "Increasing the required reserve ratio.",
      "Selling government securities in the open market.",
      "Increasing the interest rate paid on reserve balances (IORB).",
      "Decreasing the administered interest rates, such as the discount rate or IORB.",
      "Increasing income taxes."
    ],
    "correctAnswer": "D",
    "explanation": "In an ample reserves system, the central bank influences the federal funds rate (and other short-term rates) primarily by adjusting administered rates. To stimulate the economy (address a recession), the central bank would lower these rates (like IORB, discount rate, ON RRP rate) to encourage borrowing and spending, shifting AD right. Selling securities (B) or increasing IORB (C) are contractionary. Increasing RRR (A) is largely irrelevant in ample reserves. Increasing taxes (E) is contractionary fiscal policy."
  },
  {
    "id": 47,
    "unit": 4,
    "lessonIDS": ["4.6"],
    "unitName": "Financial Sector",
    "question": "If a central bank operating in an ample reserves framework observes rising inflation well above its target, which policy action is most suitable?",
    "image": null,
    "options": [
      "Lowering the interest on reserve balances (IORB) rate.",
      "Conducting large-scale open market purchases.",
      "Raising the overnight reverse repurchase agreement (ON RRP) rate.",
      "Decreasing the discount rate.",
      "Decreasing the required reserve ratio."
    ],
    "correctAnswer": "C",
    "explanation": "To combat inflation in an ample reserves system, the central bank needs to raise interest rates to dampen aggregate demand. It achieves this by increasing its administered rates. Raising the ON RRP rate sets a higher floor for the federal funds rate, making borrowing more expensive. Lowering IORB (A) or the discount rate (D) would be expansionary. OMO purchases (B) add reserves, potentially loosening conditions. RRR (E) is not the primary tool."
  },
  {
    "id": 48,
    "unit": 4,
    "lessonIDS": ["4.6"],
    "unitName": "Financial Sector",
    "question": "In an ample reserves system, how does the central bank typically use the overnight reverse repurchase agreement (ON RRP) facility rate?",
    "image": null,
    "options": [
      "To directly control the M2 money supply.",
      "To set a ceiling on the federal funds rate.",
      "To act as a floor for the federal funds rate, influencing short-term market rates.",
      "To determine the required reserve ratio for banks.",
      "To finance government budget deficits."
    ],
    "correctAnswer": "C",
    "explanation": "The ON RRP rate is offered to certain non-bank financial institutions. Since they can always earn this rate from the central bank risk-free overnight, they are unlikely to lend funds in the market (like the federal funds market) for less. This helps establish a floor under the policy rate (the federal funds rate)."
  },
  {
    "id": 49,
    "unit": 4,
    "lessonIDS": ["4.7", "5.5"],
    "unitName": "Financial Sector",
    "question": "If the government significantly increases its borrowing to finance large budget deficits, what is the likely impact in the loanable funds market?",
    "image": null,
    "options": [
      "Demand for loanable funds decreases, real interest rate decreases.",
      "Supply of loanable funds increases, real interest rate decreases.",
      "Demand for loanable funds increases, real interest rate increases.",
      "Supply of loanable funds decreases, real interest rate increases.",
      "Demand and supply of loanable funds both increase, real interest rate remains unchanged."
    ],
    "correctAnswer": "C",
    "explanation": "Government borrowing adds to the overall demand for loanable funds. This shifts the demand curve for loanable funds to the right. Assuming the supply curve remains unchanged or shifts less, the equilibrium real interest rate will increase. This can lead to crowding out of private investment."
  },
  {
    "id": 50,
    "unit": 4,
    "lessonIDS": ["4.7"],
    "unitName": "Financial Sector",
    "question": "A wave of optimism sweeps through the business community, leading firms to expect higher future profits from new projects. How would this likely affect the loanable funds market?",
    "image": null,
    "options": [
      "Decrease the demand for loanable funds, lowering the real interest rate.",
      "Increase the demand for loanable funds, raising the real interest rate.",
      "Decrease the supply of loanable funds, raising the real interest rate.",
      "Increase the supply of loanable funds, lowering the real interest rate.",
      "Increase the supply and decrease the demand for loanable funds."
    ],
    "correctAnswer": "B",
    "explanation": "Increased business optimism about future profits makes firms more willing to undertake investment projects. To finance these projects, they increase their borrowing, which shifts the demand curve for loanable funds to the right. This leads to a higher equilibrium real interest rate, ceteris paribus."
  }
]


const macroUnit5Questions = [
  {
    "id": 51,
    "unit": 5,
    "lessonIDS": ["5.1"],
    "unitName": "Long-Run Consequences of Stabilization Policies",
    "question": "Suppose an economy is in a recession. Policymakers implement expansionary fiscal policy (e.g., increased government spending) while the central bank simultaneously implements contractionary monetary policy (e.g., raising administered rates). What is the most likely combined effect on real output and real interest rates in the short run?",
    "image": null,
    "options": [
      "Real output increases, Real interest rates decrease",
      "Real output decreases, Real interest rates increase",
      "Real output effect is indeterminate, Real interest rates increase",
      "Real output increases, Real interest rate effect is indeterminate",
      "Real output decreases, Real interest rate effect is indeterminate"
    ],
    "correctAnswer": "C",
    "explanation": "Expansionary fiscal policy increases AD, pushing output up. Contractionary monetary policy decreases AD (or slows its growth), pushing output down. The net effect on output is indeterminate. Both policies tend to increase real interest rates: fiscal policy increases demand for loanable funds, and monetary policy increases the cost of borrowing."
  },
  {
    "id": 52,
    "unit": 5,
    "lessonIDS": ["5.1"],
    "unitName": "Long-Run Consequences of Stabilization Policies",
    "question": "To combat high inflation, a country enacts contractionary fiscal policy (e.g., tax increases) and contractionary monetary policy (e.g., selling bonds/raising administered rates). What is the most likely short-run impact on real output and the price level?",
    "image": null,
    "options": [
      "Real output increases, Price level decreases",
      "Real output decreases, Price level increases",
      "Real output effect is indeterminate, Price level decreases",
      "Real output decreases, Price level decreases",
      "Real output increases, Price level effect is indeterminate"
    ],
    "correctAnswer": "D",
    "explanation": "Both contractionary fiscal and monetary policies aim to decrease aggregate demand (AD). A decrease in AD leads to lower real output and a lower price level in the short run."
  },
  {
    "id": 53,
    "unit": 5,
    "lessonIDS": ["5.1", "5.5"],
    "unitName": "Long-Run Consequences of Stabilization Policies",
    "question": "If the government pursues expansionary fiscal policy while the central bank holds the money supply constant (or uses limited reserves tools), what is the likely impact on real interest rates and private investment?",
    "image": null,
    "options": [
      "Real interest rates decrease, Private investment increases",
      "Real interest rates increase, Private investment decreases",
      "Real interest rates decrease, Private investment decreases",
      "Real interest rates increase, Private investment increases",
      "No change in real interest rates or private investment"
    ],
    "correctAnswer": "B",
    "explanation": "Expansionary fiscal policy (increased borrowing) increases the demand for loanable funds, raising the real interest rate. A higher real interest rate makes borrowing more expensive for firms, leading to a decrease in private investment spending (crowding out)."
  },
  {
    "id": 54,
    "unit": 5,
    "lessonIDS": ["5.1"],
    "unitName": "Long-Run Consequences of Stabilization Policies",
    "question": "Consider an economy operating below full employment. Policymakers pursue expansionary fiscal policy and expansionary monetary policy simultaneously. What is the most likely combined effect on real output and real interest rates in the short run?",
    "image": null,
    "options": [
      "Real output increases, Real interest rates decrease",
      "Real output decreases, Real interest rates increase",
      "Real output effect is indeterminate, Real interest rates decrease",
      "Real output increases, Real interest rate effect is indeterminate",
      "Real output decreases, Real interest rate effect is indeterminate"
    ],
    "correctAnswer": "D",
    "explanation": "Both expansionary policies increase aggregate demand, leading to an increase in real output. However, expansionary fiscal policy tends to increase real interest rates (more government borrowing), while expansionary monetary policy tends to decrease interest rates (easier credit). The net effect on real interest rates is indeterminate."
  },
  {
    "id": 55,
    "unit": 5,
    "lessonIDS": ["5.2"],
    "unitName": "Long-Run Consequences of Stabilization Policies",
    "question": "An increase in aggregate demand that causes inflation will, in the short run, lead to which of the following on a standard Phillips curve diagram?",
    "image": null,
    "options": [
      "A movement upwards along the short-run Phillips curve (SRPC)",
      "A movement downwards along the short-run Phillips curve (SRPC)",
      "A rightward shift of the short-run Phillips curve (SRPC)",
      "A leftward shift of the short-run Phillips curve (SRPC)",
      "A rightward shift of the long-run Phillips curve (LRPC)"
    ],
    "correctAnswer": "A",
    "explanation": "The SRPC shows an inverse relationship between inflation and unemployment. An increase in AD leads to higher output (lower unemployment) and a higher price level (higher inflation). This corresponds to a movement up and to the left along a stable SRPC."
  },
  {
    "id": 56,
    "unit": 5,
    "lessonIDS": ["5.2"],
    "unitName": "Long-Run Consequences of Stabilization Policies",
    "question": "If workers and firms come to expect a higher rate of inflation, how will this affect the Phillips curve diagram?",
    "image": null,
    "options": [
      "Movement downwards along the SRPC",
      "Movement upwards along the SRPC",
      "The SRPC will shift upwards/rightwards",
      "The SRPC will shift downwards/leftwards",
      "The LRPC will shift leftwards"
    ],
    "correctAnswer": "C",
    "explanation": "Higher expected inflation gets built into wage negotiations and price setting. This means that for any given unemployment rate, the actual inflation rate will be higher. This is represented by an upward (or rightward) shift of the SRPC."
  },
  {
    "id": 57,
    "unit": 5,
    "lessonIDS": ["5.2"],
    "unitName": "Long-Run Consequences of Stabilization Policies",
    "question": "The long-run Phillips curve (LRPC) is vertical at the natural rate of unemployment because:",
    "image": null,
    "options": [
      "The unemployment rate never changes in the long run.",
      "In the long run, there is no trade-off between inflation and unemployment.",
      "Fiscal policy becomes ineffective in the long run.",
      "Monetary policy only affects inflation in the long run.",
      "Potential GDP always grows faster than inflation."
    ],
    "correctAnswer": "B",
    "explanation": "In the long run, the economy operates at its potential output, corresponding to the natural rate of unemployment, regardless of the rate of inflation. Expected inflation fully adjusts to actual inflation, meaning any attempt to hold unemployment below the natural rate through demand stimulus will only lead to accelerating inflation, not permanently lower unemployment."
  },
  {
    "id": 58,
    "unit": 5,
    "lessonIDS": ["5.2", "3.3"],
    "unitName": "Long-Run Consequences of Stabilization Policies",
    "question": "A sudden, sharp increase in energy prices (an adverse supply shock) would likely cause which shift in the Phillips curve analysis?",
    "image": null,
    "options": [
      "Movement down along the SRPC",
      "Shift the SRPC upward/rightward",
      "Shift the SRPC downward/leftward",
      "Shift the LRPC rightward",
      "Shift the LRPC leftward"
    ],
    "correctAnswer": "B",
    "explanation": "An adverse supply shock (like rising oil prices) shifts the Short-Run Aggregate Supply (SRAS) curve leftward. This leads to stagflation: higher inflation and higher unemployment simultaneously. On the Phillips curve diagram, this is represented by an upward/rightward shift of the SRPC, indicating a worse trade-off (or combination) of inflation and unemployment."
  },
  {
    "id": 59,
    "unit": 5,
    "lessonIDS": ["5.3"],
    "unitName": "Long-Run Consequences of Stabilization Policies",
    "question": "According to the quantity theory of money, if the money supply (M) is $2,000 billion, the velocity of money (V) is 4, and real GDP (Y) is $4,000 billion, what is the aggregate price level (P)?",
    "image": null,
    "options": [
      "0.5",
      "1.0",
      "2.0",
      "4.0",
      "8.0"
    ],
    "correctAnswer": "C",
    "explanation": "The quantity theory equation is M * V = P * Y. Plugging in the values: $2,000 * 4 = P * $4,000. This simplifies to $8,000 = P * $4,000. Solving for P: P = $8,000 / $4,000 = 2.0."
  },
  {
    "id": 60,
    "unit": 5,
    "lessonIDS": ["5.3"],
    "unitName": "Long-Run Consequences of Stabilization Policies",
    "question": "Assuming the velocity of money and real GDP are constant, the quantity theory of money suggests that a 10% increase in the money supply will lead to:",
    "image": null,
    "options": [
      "A 10% decrease in the price level.",
      "No change in the price level.",
      "A 10% increase in the price level.",
      "A 10% increase in real GDP.",
      "A 10% decrease in the velocity of money."
    ],
    "correctAnswer": "C",
    "explanation": "The equation is M * V = P * Y. If V and Y are constant, then any percentage change in M must be matched by an equal percentage change in P to keep the equation balanced. Therefore, a 10% increase in M leads to a 10% increase in P (inflation)."
  },
  {
    "id": 61,
    "unit": 5,
    "lessonIDS": ["5.3"],
    "unitName": "Long-Run Consequences of Stabilization Policies",
    "question": "In the context of the quantity theory of money (MV=PY), the velocity of money (V) represents:",
    "image": null,
    "options": [
      "The speed at which the central bank prints money.",
      "The average number of times a unit of money is spent on final goods and services in a year.",
      "The required reserve ratio set by the central bank.",
      "The rate of growth of real GDP.",
      "The sensitivity of investment spending to interest rates."
    ],
    "correctAnswer": "B",
    "explanation": "Velocity (V) measures how quickly money circulates through the economy in the purchase of final goods and services (nominal GDP, P*Y). A higher velocity means each dollar is used more frequently in transactions during a given period."
  },
  {
    "id": 62,
    "unit": 5,
    "lessonIDS": ["5.4"],
    "unitName": "Long-Run Consequences of Stabilization Policies",
    "question": "Which statement accurately describes the difference between the government budget deficit and the national debt?",
    "image": null,
    "options": [
      "The deficit is the total amount owed, while the debt is the annual shortfall.",
      "The debt is measured annually, while the deficit is a cumulative total.",
      "The deficit is the excess of government spending over tax revenue in a given year, while the debt is the accumulation of past deficits.",
      "The deficit includes state and local borrowing, while the debt only includes federal borrowing.",
      "The debt causes inflation, while the deficit causes unemployment."
    ],
    "correctAnswer": "C",
    "explanation": "The budget deficit is a flow variable, representing the shortfall between government outlays and revenues over a specific period (usually a fiscal year). The national debt is a stock variable, representing the total accumulated amount of money the government owes from all past borrowing (deficits minus any surpluses)."
  },
  {
    "id": 63,
    "unit": 5,
    "lessonIDS": ["5.4", "5.5"],
    "unitName": "Long-Run Consequences of Stabilization Policies",
    "question": "A potential long-run concern associated with persistent, large government budget deficits is that they can lead to:",
    "image": null,
    "options": [
      "Lower real interest rates and increased private investment.",
      "A decrease in the national debt.",
      "Higher real interest rates and the crowding out of private investment.",
      "An appreciation of the domestic currency, boosting net exports.",
      "A decrease in the demand for loanable funds."
    ],
    "correctAnswer": "C",
    "explanation": "Persistent large deficits require significant government borrowing, increasing the demand for loanable funds. This drives up real interest rates, making it more expensive for private firms to borrow and invest, potentially slowing down capital accumulation and long-run economic growth (crowding out)."
  },
  {
    "id": 64,
    "unit": 5,
    "lessonIDS": ["5.5"],
    "unitName": "Long-Run Consequences of Stabilization Policies",
    "question": "The 'crowding out' effect refers to the negative impact of:",
    "image": null,
    "options": [
      "Expansionary monetary policy on net exports.",
      "Increased government spending on the money supply.",
      "Government budget deficits on private investment spending.",
      "Inflation expectations on the short-run Phillips curve.",
      "Imports on domestic production."
    ],
    "correctAnswer": "C",
    "explanation": "Crowding out describes the situation where increased government borrowing (to finance deficits) drives up real interest rates, which in turn reduces (crowds out) private investment spending that would have otherwise occurred."
  },
  {
    "id": 65,
    "unit": 5,
    "lessonIDS": ["5.5", "5.6"],
    "unitName": "Long-Run Consequences of Stabilization Policies",
    "question": "How does the crowding out effect potentially impact long-run economic growth?",
    "image": null,
    "options": [
      "It increases long-run growth by stimulating aggregate demand.",
      "It decreases long-run growth by reducing private capital formation.",
      "It has no impact on long-run growth, only short-run fluctuations.",
      "It increases long-run growth by lowering inflation.",
      "It decreases long-run growth by increasing the money supply."
    ],
    "correctAnswer": "B",
    "explanation": "Long-run economic growth depends heavily on factors like capital accumulation, technological progress, and human capital. By reducing private investment (capital formation), crowding out can lead to a smaller capital stock in the future, thereby hindering the economy's long-run growth potential (slowing the outward shift of LRAS/PPC)."
  },
  {
    "id": 66,
    "unit": 5,
    "lessonIDS": ["5.6"],
    "unitName": "Long-Run Consequences of Stabilization Policies",
    "question": "Which of the following factors would most likely lead to an increase in long-run economic growth?",
    "image": null,
    "options": [
      "A persistent increase in government transfer payments.",
      "A sustained increase in the aggregate price level.",
      "An increase in tariffs on imported capital goods.",
      "Significant advancements in technology and increased labor productivity.",
      "A decrease in the national saving rate."
    ],
    "correctAnswer": "D",
    "explanation": "Long-run economic growth is represented by an outward shift of the LRAS curve and the Production Possibilities Curve. This is driven by increases in the quantity or quality of resources (labor, capital, natural resources) or improvements in technology, which enhance labor productivity."
  },
  {
    "id": 67,
    "unit": 5,
    "lessonIDS": ["5.7", "3.8"],
    "unitName": "Long-Run Consequences of Stabilization Policies",
    "question": "Supply-side fiscal policies, such as targeted tax cuts on business investment or research and development, are primarily intended to:",
    "image": null,
    "options": [
      "Increase aggregate demand in the short run.",
      "Decrease short-run aggregate supply.",
      "Increase long-run aggregate supply and promote economic growth.",
      "Reduce the national debt.",
      "Stabilize the short-run Phillips curve."
    ],
    "correctAnswer": "C",
    "explanation": "While potentially having short-run demand effects, the main goal of supply-side fiscal policies is to encourage investment, innovation, and productivity improvements. These actions aim to increase the economy's productive capacity, shifting the long-run aggregate supply (LRAS) curve to the right and fostering long-term economic growth."
  }
]


const macroUnit6Questions = [
  {
    "id": 68,
    "unit": 6,
    "lessonIDS": ["6.1"],
    "unitName": "Open Economy - International Trade and Finance",
    "question": "Which of the following transactions would be recorded as a credit (+) in the U.S. Current Account?",
    "image": null,
    "options": [
      "A U.S. resident purchases a smartphone made in South Korea.",
      "A U.S. company pays dividends to a foreign shareholder.",
      "A French tourist spends money visiting national parks in the U.S.",
      "A U.S. investor buys bonds issued by the Japanese government.",
      "The U.S. government sends foreign aid to another country."
    ],
    "correctAnswer": "C",
    "explanation": "The Current Account records trade in goods and services, investment income, and net transfers. Spending by foreign tourists in the U.S. represents an export of services for the U.S., which is a credit (inflow of funds) in the Current Account. A is an import (debit), B is investment income paid out (debit), D is a financial account outflow (debit), E is a transfer payment out (debit)."
  },
  {
    "id": 69,
    "unit": 6,
    "lessonIDS": ["6.1"],
    "unitName": "Open Economy - International Trade and Finance",
    "question": "A U.S. based technology company builds a new factory in Ireland. How would this transaction be recorded in the U.S. balance of payments?",
    "image": null,
    "options": [
      "Credit (+) in the Current Account",
      "Debit (-) in the Current Account",
      "Credit (+) in the Financial Account",
      "Debit (-) in the Financial Account",
      "Credit (+) in the Capital Account (transfer)"
    ],
    "correctAnswer": "D",
    "explanation": "The Financial Account records transactions involving the purchase or sale of assets (like factories, stocks, bonds). When a U.S. company invests abroad (acquires a foreign asset - the factory), it represents an outflow of capital from the U.S., recorded as a debit (-) in the U.S. Financial Account (specifically under direct investment)."
  },
  {
    "id": 70,
    "unit": 6,
    "lessonIDS": ["6.1"],
    "unitName": "Open Economy - International Trade and Finance",
    "question": "If a country has a current account deficit, which of the following must be true, assuming no statistical discrepancy?",
    "image": null,
    "options": [
      "It must also have a financial account deficit.",
      "It must have a financial account surplus.",
      "It must be exporting more goods than it imports.",
      "It must be experiencing currency appreciation.",
      "Its net investment income must be positive."
    ],
    "correctAnswer": "B",
    "explanation": "The balance of payments must sum to zero (Current Account + Financial Account + Capital Account = 0). Ignoring the typically small Capital Account, this means Current Account + Financial Account ≈ 0. Therefore, if the Current Account is in deficit (negative), the Financial Account must be in surplus (positive), indicating a net inflow of capital/funds from abroad."
  },
  {
    "id": 71,
    "unit": 6,
    "lessonIDS": ["6.2"],
    "unitName": "Open Economy - International Trade and Finance",
    "question": "Suppose the exchange rate between the U.S. Dollar (USD) and the Thai Baht (THB) is $1 = 35 THB. A handmade scarf costs 700 THB in Bangkok. How much would the scarf cost in U.S. dollars?",
    "image": null,
    "options": [
      "$10",
      "$20",
      "$35",
      "$70",
      "$24,500"
    ],
    "correctAnswer": "B",
    "explanation": "To find the cost in USD, divide the price in THB by the exchange rate (THB per USD): Cost in USD = Cost in THB / (THB/USD) = 700 THB / (35 THB/$1) = $20."
  },
  {
    "id": 72,
    "unit": 6,
    "lessonIDS": ["6.2"],
    "unitName": "Open Economy - International Trade and Finance",
    "question": "If the exchange rate changes from €1 = $1.10 to €1 = $1.20, which of the following has occurred?",
    "image": null,
    "options": [
      "The Euro has depreciated against the Dollar.",
      "The Dollar has appreciated against the Euro.",
      "The Euro has appreciated against the Dollar.",
      "Both currencies have depreciated.",
      "The exchange rate has become fixed."
    ],
    "correctAnswer": "C",
    "explanation": "Since one Euro (€) can now buy more U.S. Dollars ($1.20 compared to $1.10), the Euro has become stronger or appreciated relative to the Dollar. Conversely, the Dollar has depreciated relative to the Euro (it now takes more dollars to buy one euro)."
  },
  {
    "id": 73,
    "unit": 6,
    "lessonIDS": ["6.3"],
    "unitName": "Open Economy - International Trade and Finance",
    "question": "Assume the market for the British Pound (£) is in equilibrium. If consumer tastes in the United States shift strongly in favor of British goods and services, what will happen in the foreign exchange market for pounds?",
    "image": null,
    "options": [
      "The demand for pounds will decrease, causing the pound to depreciate.",
      "The supply of pounds will increase, causing the pound to depreciate.",
      "The demand for pounds will increase, causing the pound to appreciate.",
      "The supply of pounds will decrease, causing the pound to appreciate.",
      "Both demand and supply of pounds will decrease."
    ],
    "correctAnswer": "C",
    "explanation": "U.S. consumers wanting more British goods need pounds to buy them. This increases the demand for pounds in the foreign exchange market. An increase in demand, ceteris paribus, leads to an increase in the price of the pound (appreciation)."
  },
  {
    "id": 74,
    "unit": 6,
    "lessonIDS": ["6.3"],
    "unitName": "Open Economy - International Trade and Finance",
    "question": "If real income in the United States increases significantly while real income in Japan remains stable, what is the likely impact on the supply of U.S. dollars in the foreign exchange market and the value of the dollar relative to the Japanese Yen (¥)?",
    "image": null,
    "options": [
      "Supply of dollars decreases; Dollar appreciates",
      "Supply of dollars increases; Dollar depreciates",
      "Supply of dollars increases; Dollar appreciates",
      "Supply of dollars decreases; Dollar depreciates",
      "Demand for dollars increases; Dollar appreciates"
    ],
    "correctAnswer": "B",
    "explanation": "Higher real income in the U.S. leads to increased demand for all goods, including imports from Japan. To buy Japanese goods, U.S. residents need to supply dollars to the foreign exchange market to obtain yen. This increases the supply of dollars, which, ceteris paribus, causes the dollar to depreciate relative to the yen."
  },
  {
    "id": 75,
    "unit": 6,
    "lessonIDS": ["6.3", "6.4"],
    "unitName": "Open Economy - International Trade and Finance",
    "question": "Suppose the foreign exchange market for the Mexican Peso (MXN) experiences a simultaneous increase in demand and decrease in supply. What is the definitive impact on the value of the Peso?",
    "image": null,
    "options": [
      "The Peso will depreciate.",
      "The Peso will appreciate.",
      "The value of the Peso will remain unchanged.",
      "The impact on the Peso's value is indeterminate.",
      "The quantity traded will decrease."
    ],
    "correctAnswer": "B",
    "explanation": "An increase in demand for the Peso pushes its value up. A decrease in the supply of the Peso also pushes its value up (makes it scarcer). Since both shifts exert upward pressure on the price (value) of the Peso, the Peso will definitively appreciate. The effect on the equilibrium quantity traded is indeterminate."
  },
  {
    "id": 76,
    "unit": 6,
    "lessonIDS": ["6.4", "6.6", "4.6"],
    "unitName": "Open Economy - International Trade and Finance",
    "question": "If the U.S. Federal Reserve pursues expansionary monetary policy, leading to lower real interest rates in the U.S. compared to other countries, what is the likely impact on international capital flows and the value of the U.S. dollar?",
    "image": null,
    "options": [
      "Capital inflows increase; Dollar appreciates",
      "Capital outflows increase; Dollar depreciates",
      "Capital inflows decrease; Dollar appreciates",
      "Capital outflows decrease; Dollar depreciates",
      "No significant impact on capital flows or the dollar"
    ],
    "correctAnswer": "B",
    "explanation": "Lower real interest rates in the U.S. make U.S. assets less attractive to foreign investors (decreasing capital inflows) and make foreign assets more attractive to U.S. investors (increasing capital outflows). The net effect is increased capital outflow. This increases the supply of dollars (as U.S. investors sell dollars to buy foreign currency) and decreases the demand for dollars (as foreign investors demand fewer dollars), causing the dollar to depreciate."
  },
  {
    "id": 77,
    "unit": 6,
    "lessonIDS": ["6.4", "6.6", "3.8"],
    "unitName": "Open Economy - International Trade and Finance",
    "question": "Suppose the Canadian government implements significant contractionary fiscal policy, leading to lower real interest rates and slower economic growth in Canada. What is the likely effect on financial capital flows and the value of the Canadian Dollar (CAD)?",
    "image": null,
    "options": [
      "Net capital inflow; CAD appreciates",
      "Net capital outflow; CAD depreciates",
      "Net capital inflow; CAD depreciates",
      "Net capital outflow; CAD appreciates",
      "Indeterminate effect on capital flows and CAD value"
    ],
    "correctAnswer": "B",
    "explanation": "Contractionary fiscal policy (less government borrowing) tends to lower real interest rates, making Canadian assets less attractive (net capital outflow). Slower economic growth might also reduce investment opportunities, further encouraging outflow. Increased capital outflow leads to an increased supply of CAD and decreased demand for CAD, causing the Canadian Dollar to depreciate."
  },
  {
    "id": 78,
    "unit": 6,
    "lessonIDS": ["6.4"],
    "unitName": "Open Economy - International Trade and Finance",
    "question": "If the inflation rate in Country A is persistently higher than the inflation rate in Country B, what is likely to happen to the exchange rate between their currencies, according to purchasing power parity concepts?",
    "image": null,
    "options": [
      "Country A's currency will appreciate relative to Country B's currency.",
      "Country B's currency will depreciate relative to Country A's currency.",
      "Country A's currency will depreciate relative to Country B's currency.",
      "The exchange rate will remain fixed.",
      "Both currencies will appreciate against gold."
    ],
    "correctAnswer": "C",
    "explanation": "Higher inflation in Country A means its goods are becoming relatively more expensive. This reduces foreign demand for Country A's goods (reducing demand for its currency) and increases Country A's demand for relatively cheaper goods from Country B (increasing supply of its currency). Both effects cause Country A's currency to depreciate relative to Country B's currency."
  },
  {
    "id": 79,
    "unit": 6,
    "lessonIDS": ["6.5"],
    "unitName": "Open Economy - International Trade and Finance",
    "question": "If the U.S. dollar significantly appreciates against the Euro, what is the most likely impact on U.S. net exports?",
    "image": null,
    "options": [
      "U.S. net exports will increase.",
      "U.S. net exports will decrease.",
      "U.S. net exports will remain unchanged.",
      "U.S. exports will increase, and imports will decrease.",
      "Both U.S. exports and imports will increase."
    ],
    "correctAnswer": "B",
    "explanation": "An appreciation of the dollar makes U.S. goods more expensive for Europeans (decreasing U.S. exports) and makes European goods cheaper for Americans (increasing U.S. imports). Since Net Exports = Exports - Imports, the decrease in exports and increase in imports leads to a decrease in U.S. net exports."
  },
  {
    "id": 80,
    "unit": 6,
    "lessonIDS": ["6.5"],
    "unitName": "Open Economy - International Trade and Finance",
    "question": "Suppose the Japanese Yen depreciates significantly relative to the currencies of its major trading partners. How will this likely affect Japan's exports and imports?",
    "image": null,
    "options": [
      "Exports decrease, Imports increase",
      "Exports increase, Imports decrease",
      "Exports decrease, Imports decrease",
      "Exports increase, Imports increase",
      "No change in exports or imports"
    ],
    "correctAnswer": "B",
    "explanation": "A depreciation of the Yen makes Japanese goods cheaper for foreigners, leading to an increase in Japan's exports. It also makes foreign goods more expensive for Japanese residents, leading to a decrease in Japan's imports. This combination tends to increase Japan's net exports."
  },
  {
    "id": 81,
    "unit": 6,
    "lessonIDS": ["6.6"],
    "unitName": "Open Economy - International Trade and Finance",
    "question": "An increase in the real interest rates in the United States, relative to the rest of the world, would most likely lead to:",
    "image": null,
    "options": [
      "An increase in U.S. net capital outflow.",
      "A decrease in foreign demand for U.S. financial assets.",
      "An increase in U.S. net capital inflow.",
      "A depreciation of the U.S. dollar.",
      "A decrease in the U.S. financial account surplus."
    ],
    "correctAnswer": "C",
    "explanation": "Higher real returns on U.S. financial assets make them more attractive to both foreign and domestic investors. This encourages foreigners to invest more in the U.S. (increased capital inflow) and discourages U.S. residents from investing abroad (decreased capital outflow). The net result is an increase in net capital inflow (a larger financial account surplus or smaller deficit)."
  },
  {
    "id": 82,
    "unit": 6,
    "lessonIDS": ["6.6", "6.1"],
    "unitName": "Open Economy - International Trade and Finance",
    "question": "A significant net inflow of financial capital into a country corresponds directly to which of the following in its balance of payments?",
    "image": null,
    "options": [
      "A surplus in the current account.",
      "A deficit in the current account.",
      "A surplus in the financial account.",
      "A deficit in the financial account.",
      "An increase in net exports."
    ],
    "correctAnswer": "C",
    "explanation": "Net capital inflow means that foreigners are purchasing more of the country's assets than residents are purchasing of foreign assets. This inflow of funds is recorded as a credit (+) balance, or a surplus, in the financial account."
  }
]



// Microeconomics Unit 2 Practice Problems
const microUnit2Questions = [
  {
    "id": 83,
    "unit": 2,
    "lessonIDS": ["2.2"],
    "unitName": "Supply and Demand",
    "question": "Which of the following would cause an increase in the supply of gasoline?",
    "image": null,
    "options": [
      "An increase in the price of crude oil",
      "A decrease in the number of sellers of gasoline",
      "An improvement in the technology used to refine gasoline",
      "An expectation by sellers that gasoline prices will be higher in the future",
      "An increase in the tax on gasoline"
    ],
    "correctAnswer": "C",
    "explanation": "An improvement in technology lowers production costs, making sellers willing to supply more at each price, thus increasing supply (shifting the supply curve right)."
  },
  {
    "id": 84,
    "unit": 2,
    "lessonIDS": ["2.3"],
    "unitName": "Supply and Demand",
    "question": "If the price of a good decreases and total revenue increases, the demand for the good is:",
    "image": null,
    "options": [
      "elastic",
      "inelastic",
      "unit elastic",
      "perfectly elastic",
      "perfectly inelastic"
    ],
    "correctAnswer": "A",
    "explanation": "When demand is elastic (PED > 1), a decrease in price leads to a proportionally larger increase in quantity demanded, causing total revenue (P x Q) to increase."
  },
  {
    "id": 85,
    "unit": 2,
    "lessonIDS": ["2.8"],
    "unitName": "Supply and Demand",
    "question": "Which of the following is true of a price ceiling that is set below the equilibrium price?",
    "image": null,
    "options": [
      "It will result in a surplus",
      "It will result in a shortage",
      "It will have no effect on the market",
      "It will increase producer surplus",
      "It will lead to a decrease in quantity demanded"
    ],
    "correctAnswer": "B",
    "explanation": "A price ceiling set below the equilibrium price is binding. At this lower price, quantity demanded exceeds quantity supplied, resulting in a shortage."
  },
  {
    "id": 86,
    "unit": 2,
    "lessonIDS": ["2.5"],
    "unitName": "Supply and Demand",
    "question": "The cross-price elasticity of demand between good X and good Y is -2. This indicates that good X and good Y are:",
    "image": null,
    "options": [
      "substitutes",
      "complements",
      "normal goods",
      "inferior goods",
      "unrelated goods"
    ],
    "correctAnswer": "B",
    "explanation": "A negative cross-price elasticity of demand means that as the price of one good increases, the quantity demanded of the other good decreases. This relationship defines complementary goods."
  },
  {
    "id": 87,
    "unit": 2,
    "lessonIDS": ["2.6"],
    "unitName": "Supply and Demand",
    "question": "Consumer surplus is best described as the:",
    "image": null,
    "options": [
      "difference between the price buyers pay and the price sellers receive",
      "total value of goods purchased by consumers",
      "difference between the maximum price buyers are willing to pay and the actual price",
      "sum of the individual surpluses of all producers in the market",
      "area above the supply curve and below the market price"
    ],
    "correctAnswer": "C",
    "explanation": "Consumer surplus represents the net benefit to buyers, calculated as the difference between their willingness to pay for a good and the price they actually pay."
  },
  {
    "id": 88,
    "unit": 2,
    "lessonIDS": ["2.8"],
    "unitName": "Supply and Demand",
    "question": "A tax on the sellers of a good will cause the:",
    "image": null,
    "options": [
      "demand curve to shift to the left",
      "demand curve to shift to the right",
      "supply curve to shift to the left",
      "supply curve to shift to the right",
      "equilibrium price to decrease"
    ],
    "correctAnswer": "C",
    "explanation": "A tax imposed on sellers increases their costs of production, leading to a decrease in supply, which is represented by a leftward shift of the supply curve."
  },
  {
    "id": 89,
    "unit": 2,
    "lessonIDS": ["2.1"],
    "unitName": "Supply and Demand",
    "question": "Which of the following would cause a decrease in the demand for coffee?",
    "image": null,
    "options": [
      "An increase in the price of tea, a substitute for coffee",
      "A decrease in the price of sugar, a complement to coffee",
      "An increase in consumer income, assuming coffee is a normal good",
      "A decrease in the expected future price of coffee",
      "An increase in the population"
    ],
    "correctAnswer": "D",
    "explanation": "If consumers expect the price of coffee to fall in the future, they will likely reduce their current demand, waiting to buy at the lower expected price."
  },
  {
    "id": 90,
    "unit": 2,
    "lessonIDS": ["2.4"],
    "unitName": "Supply and Demand",
    "question": "The price elasticity of supply measures how much:",
    "image": null,
    "options": [
      "the quantity demanded changes in response to a change in price",
      "the quantity supplied changes in response to a change in price",
      "the price changes in response to a change in demand",
      "the price changes in response to a change in supply",
      "the income of consumers changes in response to a change in price"
    ],
    "correctAnswer": "B",
    "explanation": "Price elasticity of supply measures the responsiveness of the quantity supplied of a good or service to a change in its price."
  },
  {
    "id": 91,
    "unit": 2,
    "lessonIDS": ["2.6", "2.7"],
    "unitName": "Supply and Demand",
    "question": "If a market is in equilibrium, which of the following is true?",
    "image": null,
    "options": [
      "There is no consumer surplus",
      "There is no producer surplus",
      "Quantity demanded equals quantity supplied",
      "Price is above the equilibrium price",
      "Quantity demanded is greater than quantity supplied"
    ],
    "correctAnswer": "C",
    "explanation": "Market equilibrium occurs at the price where the quantity consumers are willing and able to buy is exactly equal to the quantity producers are willing and able to sell."
  },
  {
    "id": 92,
    "unit": 2,
    "lessonIDS": ["2.8"],
    "unitName": "Supply and Demand",
    "question": "A binding price floor will lead to:",
    "image": null,
    "options": [
      "A shortage",
      "A surplus",
      "An increase in demand",
      "A decrease in supply",
      "Market equilibrium"
    ],
    "correctAnswer": "B",
    "explanation": "A binding price floor is set above the equilibrium price. At this higher price, quantity supplied exceeds quantity demanded, resulting in a surplus."
  }
]


// Microeconomics Unit 3 Practice Problems
const microUnit3Questions = [
  {
    "id": 93,
    "unit": 3,
    "lessonIDS": ["3.1"],
    "unitName": "Production, Cost, and the Perfect Competition Model",
    "question": "The law of diminishing marginal product states that:",
    "image": null,
    "options": [
      "Total output decreases as more input is added",
      "Average product eventually decreases as more input is added",
      "Marginal product eventually decreases as more variable input is added to a fixed input",
      "Total cost eventually increases as output increases",
      "Marginal cost eventually decreases as output increases"
    ],
    "correctAnswer": "C",
    "explanation": "Diminishing marginal product occurs in the short run when adding successive units of a variable input (like labor) to a fixed input (like capital) results in smaller and smaller increases in total output. The marginal product of the variable input eventually declines."
  },
  {
    "id": 94,
    "unit": 3,
    "lessonIDS": ["3.2"],
    "unitName": "Production, Cost, and the Perfect Competition Model",
    "question": "Which statement accurately describes the relationship between marginal cost (MC) and average total cost (ATC)?",
    "image": null,
    "options": [
      "If MC > ATC, then ATC must be falling",
      "If MC < ATC, then ATC must be rising",
      "MC equals ATC when ATC is at its maximum",
      "MC intersects ATC at the minimum point of ATC",
      "ATC is always greater than MC"
    ],
    "correctAnswer": "D",
    "explanation": "The marginal cost curve intersects the average total cost curve at the lowest point of the ATC curve. When MC is below ATC, it pulls ATC down; when MC is above ATC, it pulls ATC up."
  },
  {
    "id": 95,
    "unit": 3,
    "lessonIDS": ["3.2"],
    "unitName": "Production, Cost, and the Perfect Competition Model",
    "question": "Marginal cost is defined as the change in:",
    "image": null,
    "options": [
      "Total revenue resulting from selling one more unit",
      "Total cost resulting from producing one more unit",
      "Average total cost resulting from producing one more unit",
      "Average variable cost resulting from producing one more unit",
      "Fixed cost resulting from producing one more unit"
    ],
    "correctAnswer": "B",
    "explanation": "Marginal cost (MC) is the additional cost incurred from producing one more unit of output. It is calculated as the change in total cost divided by the change in quantity (ΔTC / ΔQ)."
  },
  {
    "id": 96,
    "unit": 3,
    "lessonIDS": ["3.3"],
    "unitName": "Production, Cost, and the Perfect Competition Model",
    "question": "A firm experiences economies of scale when:",
    "image": null,
    "options": [
      "Its long-run average total cost decreases as output increases",
      "Its short-run average total cost decreases as output increases",
      "Its marginal cost is increasing",
      "Its total fixed costs are decreasing",
      "It doubles inputs and more than doubles output"
    ],
    "correctAnswer": "A",
    "explanation": "Economies of scale occur when a firm's long-run average total cost (LRATC) falls as it increases its scale of production. This is represented by the downward-sloping portion of the LRATC curve."
  },
  {
    "id": 97,
    "unit": 3,
    "lessonIDS": ["3.4"],
    "unitName": "Production, Cost, and the Perfect Competition Model",
    "question": "Economic profit differs from accounting profit because economic profit accounts for:",
    "image": null,
    "options": [
      "Only explicit costs",
      "Only implicit costs",
      "Both explicit and implicit costs",
      "Total revenue minus variable costs",
      "Fixed costs only"
    ],
    "correctAnswer": "C",
    "explanation": "Accounting profit subtracts only explicit (out-of-pocket) costs from total revenue. Economic profit subtracts both explicit costs and implicit costs (the opportunity costs of resources used) from total revenue."
  },
  {
    "id": 98,
    "unit": 3,
    "lessonIDS": ["3.5"],
    "unitName": "Production, Cost, and the Perfect Competition Model",
    "question": "A profit-maximizing firm in any market structure will produce the quantity of output where:",
    "image": null,
    "options": [
      "Marginal revenue equals average total cost",
      "Price equals marginal cost",
      "Marginal revenue equals marginal cost",
      "Total revenue is maximized",
      "Average total cost is minimized"
    ],
    "correctAnswer": "C",
    "explanation": "The fundamental rule for profit maximization is to produce up to the point where the revenue generated by the last unit sold (marginal revenue, MR) is equal to the cost of producing that last unit (marginal cost, MC)."
  },
  {
    "id": 99,
    "unit": 3,
    "lessonIDS": ["3.6"],
    "unitName": "Production, Cost, and the Perfect Competition Model",
    "question": "In the short run, a perfectly competitive firm should shut down and produce zero output if:",
    "image": null,
    "options": [
      "Price is less than average total cost",
      "Price is less than average variable cost",
      "Marginal revenue is less than marginal cost",
      "Economic profit is zero",
      "Accounting profit is negative"
    ],
    "correctAnswer": "B",
    "explanation": "The short-run shutdown rule states that a firm should cease production if the market price falls below its minimum average variable cost (P < min AVC). At such a price, the firm cannot even cover its variable costs per unit."
  },
  {
    "id": 100,
    "unit": 3,
    "lessonIDS": ["3.7"],
    "unitName": "Production, Cost, and the Perfect Competition Model",
    "question": "Which of the following is NOT a characteristic of a perfectly competitive market?",
    "image": null,
    "options": [
      "A large number of buyers and sellers",
      "Firms sell differentiated products",
      "Free entry and exit for firms",
      "Firms are price takers",
      "Perfect information for buyers and sellers"
    ],
    "correctAnswer": "B",
    "explanation": "Perfectly competitive markets are characterized by firms selling identical (homogeneous) products. Product differentiation is a feature of monopolistic competition."
  },
  {
    "id": 101,
    "unit": 3,
    "lessonIDS": ["3.7"],
    "unitName": "Production, Cost, and the Perfect Competition Model",
    "question": "In long-run equilibrium, a perfectly competitive firm produces at the output level where:",
    "image": null,
    "options": [
      "Price > Average Total Cost",
      "Price < Average Variable Cost",
      "Marginal Revenue > Marginal Cost",
      "Price = Marginal Cost = Minimum Average Total Cost",
      "Economic Profit > 0"
    ],
    "correctAnswer": "D",
    "explanation": "In the long run, free entry and exit drive economic profits to zero in perfect competition. This occurs where firms produce at the minimum point of their average total cost curve, and price equals both marginal cost and minimum average total cost (P = MC = min ATC)."
  },
  {
    "id": 102,
    "unit": 3,
    "lessonIDS": ["3.6", "3.7"],
    "unitName": "Production, Cost, and the Perfect Competition Model",
    "question": "If a perfectly competitive firm is earning positive economic profit in the short run, then:",
    "image": null,
    "options": [
      "Price must be less than average total cost",
      "Price must be equal to average total cost",
      "Price must be greater than average total cost",
      "The firm should exit the market",
      "New firms will exit the market"
    ],
    "correctAnswer": "C",
    "explanation": "Positive economic profit means total revenue exceeds total cost (explicit + implicit). For a perfectly competitive firm (where P = MR), this occurs when the market price is greater than the average total cost at the profit-maximizing quantity (where P = MC)."
  }
]


// Microeconomics Unit 4 Practice Problems
const microUnit4Questions = [
  {
    "id": 103,
    "unit": 4,
    "lessonIDS": ["4.1", "4.2"],
    "unitName": "Imperfect Competition",
    "question": "Unlike a perfectly competitive firm, a single-price monopolist:",
    "image": null,
    "options": [
      "Can earn positive economic profit in the long run",
      "Faces a perfectly elastic demand curve",
      "Maximizes profit where P = MC",
      "Is productively efficient in the long run",
      "Has no market power"
    ],
    "correctAnswer": "A",
    "explanation": "Significant barriers to entry in a monopoly prevent new firms from entering the market, allowing the monopolist to potentially earn positive economic profits even in the long run. Perfectly competitive firms earn zero economic profit in the long run due to free entry."
  },
  {
    "id": 104,
    "unit": 4,
    "lessonIDS": ["4.2"],
    "unitName": "Imperfect Competition",
    "question": "A single-price monopolist determines its profit-maximizing output level by producing where:",
    "image": null,
    "options": [
      "Price equals marginal cost (P = MC)",
      "Marginal revenue equals marginal cost (MR = MC)",
      "Average total cost is minimized (min ATC)",
      "Price equals average total cost (P = ATC)",
      "Total revenue is maximized (MR = 0)"
    ],
    "correctAnswer": "B",
    "explanation": "The universal profit-maximization rule for all firms, including monopolies, is to produce the quantity where marginal revenue (MR) equals marginal cost (MC). The price is then determined by the demand curve at that quantity."
  },
  {
    "id": 105,
    "unit": 4,
    "lessonIDS": ["4.2"],
    "unitName": "Imperfect Competition",
    "question": "For a single-price monopolist, marginal revenue is less than price (MR < P) because:",
    "image": null,
    "options": [
      "The firm faces a perfectly elastic demand curve",
      "The firm must lower the price on all units sold to sell an additional unit",
      "The firm's marginal cost is increasing",
      "The firm is a price taker",
      "Total revenue increases as price decreases"
    ],
    "correctAnswer": "B",
    "explanation": "A monopolist faces the market demand curve, which is downward sloping. To sell more output, it must lower the price for every unit it sells, not just the last one. This 'price effect' on all previous units makes MR less than the price."
  },
  {
    "id": 106,
    "unit": 4,
    "lessonIDS": ["4.2"],
    "unitName": "Imperfect Competition",
    "question": "Compared to a perfectly competitive market outcome, a single-price monopoly produces:",
    "image": null,
    "options": [
      "More output and charges a lower price",
      "Less output and charges a higher price",
      "The same output but charges a higher price",
      "Less output but charges the same price",
      "An allocatively efficient quantity"
    ],
    "correctAnswer": "B",
    "explanation": "Monopolies maximize profit by producing less output (where MR=MC, and P > MC) and charging a higher price than would occur in perfect competition (where P=MC). This leads to allocative inefficiency and deadweight loss."
  },
  {
    "id": 107,
    "unit": 4,
    "lessonIDS": ["4.3"],
    "unitName": "Imperfect Competition",
    "question": "Which of the following is necessary for a firm to practice price discrimination?",
    "image": null,
    "options": [
      "The firm must be in a perfectly competitive market",
      "The firm must be able to prevent the resale of its product",
      "The firm must face a perfectly elastic demand curve",
      "The firm must produce at minimum average total cost",
      "The firm must have identical demand curves across customer groups"
    ],
    "correctAnswer": "B",
    "explanation": "Successful price discrimination requires market power, the ability to segment customers based on differing price elasticities of demand, and the ability to prevent arbitrage (low-price buyers reselling to high-price buyers)."
  },
  {
    "id": 108,
    "unit": 4,
    "lessonIDS": ["4.3"],
    "unitName": "Imperfect Competition",
    "question": "If a monopolist can engage in perfect price discrimination, then:",
    "image": null,
    "options": [
      "Consumer surplus is maximized",
      "Deadweight loss is maximized",
      "Total output decreases compared to a single-price monopoly",
      "The monopolist captures all consumer surplus as profit",
      "The demand curve becomes the marginal revenue curve"
    ],
    "correctAnswer": "D",
    "explanation": "Under perfect price discrimination, the firm charges each consumer their maximum willingness to pay. This eliminates consumer surplus entirely and transfers it to the producer as economic profit. Output expands to the allocatively efficient level (where P=MC for the last unit), eliminating deadweight loss."
  },
  {
    "id": 109,
    "unit": 4,
    "lessonIDS": ["4.4"],
    "unitName": "Imperfect Competition",
    "question": "Which market structure is characterized by many firms selling differentiated products and facing easy entry and exit?",
    "image": null,
    "options": [
      "Perfect competition",
      "Monopoly",
      "Oligopoly",
      "Monopolistic competition",
      "Monopsony"
    ],
    "correctAnswer": "D",
    "explanation": "Monopolistic competition features a large number of firms, similar to perfect competition, but with differentiated products (giving firms some market power) and free entry/exit."
  },
  {
    "id": 110,
    "unit": 4,
    "lessonIDS": ["4.4"],
    "unitName": "Imperfect Competition",
    "question": "In the long run, a monopolistically competitive firm produces where:",
    "image": null,
    "options": [
      "Price equals marginal cost and average total cost is minimized",
      "Price equals marginal cost and economic profit is positive",
      "Price equals average total cost, but price is greater than marginal cost",
      "Marginal revenue equals average total cost",
      "Price equals minimum average variable cost"
    ],
    "correctAnswer": "C",
    "explanation": "Free entry ensures monopolistically competitive firms earn zero economic profit in the long run (P = ATC). However, because they face a downward-sloping demand curve due to product differentiation, their profit-maximizing output (where MR=MC) occurs where P > MC, indicating allocative inefficiency. They also typically operate with excess capacity (not at min ATC)."
  },
  {
    "id": 111,
    "unit": 4,
    "lessonIDS": ["4.5"],
    "unitName": "Imperfect Competition",
    "question": "The defining characteristic of an oligopoly is:",
    "image": null,
    "options": [
      "A single seller dominates the market",
      "Firms sell identical products",
      "Barriers to entry are non-existent",
      "Firms are interdependent and consider rivals' actions",
      "Firms are price takers"
    ],
    "correctAnswer": "D",
    "explanation": "Oligopoly is characterized by a few dominant firms where the actions of one firm (regarding price, output, advertising, etc.) significantly impact the others, leading to strategic interdependence."
  },
  {
    "id": 112,
    "unit": 4,
    "lessonIDS": ["4.5"],
    "unitName": "Imperfect Competition",
    "question": "In game theory, a Nash equilibrium occurs when:",
    "image": null,
    "options": [
      "Both players choose their dominant strategy, if one exists",
      "Each player chooses the strategy that maximizes their payoff, regardless of the other player's choice",
      "Each player chooses their best strategy, given the strategy chosen by the other player(s)",
      "The sum of the players' payoffs is maximized",
      "One player forces the other into a suboptimal outcome"
    ],
    "correctAnswer": "C",
    "explanation": "A Nash equilibrium is a set of strategies, one for each player, such that no player has an incentive to unilaterally change their strategy, given the strategies chosen by the other players. It represents a stable outcome in a strategic interaction."
  }
]

// Microeconomics Unit 5 Practice Problems
const microUnit5Questions = [
  {
    "id": 113,
    "unit": 5,
    "lessonIDS": ["5.1"],
    "unitName": "Factor Markets",
    "question": "The demand for labor is called a derived demand because it depends on:",
    "image": null,
    "options": [
      "The supply of labor",
      "The wage rate",
      "The demand for the product that labor produces",
      "The marginal product of labor",
      "Government regulations"
    ],
    "correctAnswer": "C",
    "explanation": "The demand for factors of production, like labor, is derived from the demand for the goods and services they are used to create. If demand for the final product increases, the demand for the labor needed to make it also increases."
  },
  {
    "id": 114,
    "unit": 5,
    "lessonIDS": ["5.1", "5.3"],
    "unitName": "Factor Markets",
    "question": "Marginal Revenue Product (MRP) of labor is calculated as:",
    "image": null,
    "options": [
      "Marginal Product of Labor (MPL) divided by the wage rate",
      "Marginal Product of Labor (MPL) times the price of the output",
      "Change in total revenue divided by the change in the wage rate",
      "Total revenue divided by the quantity of labor",
      "Price of the output times the quantity of labor"
    ],
    "correctAnswer": "B",
    "explanation": "MRP represents the additional revenue a firm earns from hiring one more unit of labor. It is the Marginal Product of Labor (MPL) multiplied by the Marginal Revenue (MR) from selling the additional output. In perfectly competitive output markets, MR equals Price (P), so MRP = MPL x P."
  },
  {
    "id": 115,
    "unit": 5,
    "lessonIDS": ["5.3"],
    "unitName": "Factor Markets",
    "question": "A firm operating in perfectly competitive product and factor markets will hire labor until the:",
    "image": null,
    "options": [
      "Marginal product of labor equals the wage rate",
      "Marginal revenue product of labor equals the wage rate",
      "Price of the output equals the wage rate",
      "Average product of labor equals the wage rate",
      "Marginal cost equals the wage rate"
    ],
    "correctAnswer": "B",
    "explanation": "Firms maximize profit by hiring factors up to the point where the additional revenue from the factor (MRP) equals the additional cost of the factor (Marginal Factor Cost, MFC). In a perfectly competitive labor market, MFC equals the market wage rate (W). Thus, the firm hires until MRP = W."
  },
  {
    "id": 116,
    "unit": 5,
    "lessonIDS": ["5.2"],
    "unitName": "Factor Markets",
    "question": "Which of the following would cause the demand curve for autoworkers to shift to the right?",
    "image": null,
    "options": [
      "A decrease in the price of cars",
      "A decrease in the productivity of autoworkers",
      "An increase in the demand for cars",
      "An increase in the wage rate for autoworkers",
      "An increase in the supply of autoworkers"
    ],
    "correctAnswer": "C",
    "explanation": "Since the demand for labor is derived from the demand for the product, an increase in the demand for cars (the product) will increase the demand for autoworkers (the labor), shifting the labor demand curve to the right."
  },
  {
    "id": 117,
    "unit": 5,
    "lessonIDS": ["5.2"],
    "unitName": "Factor Markets",
    "question": "An increase in the supply of labor could be caused by:",
    "image": null,
    "options": [
      "An increase in the demand for the product labor produces",
      "A decrease in the wage rate",
      "An increase in immigration or population growth",
      "A decrease in labor productivity",
      "An increase in the price of capital (a substitute factor)"
    ],
    "correctAnswer": "C",
    "explanation": "Factors that increase the number of available workers at any given wage rate, such as increased immigration, population growth, or changes in preferences towards work, will shift the labor supply curve to the right (increase supply)."
  },
  {
    "id": 118,
    "unit": 5,
    "lessonIDS": ["5.3"],
    "unitName": "Factor Markets",
    "question": "To minimize costs for a given level of output, a firm should employ factors of production such that the:",
    "image": null,
    "options": [
      "Marginal product per dollar spent is equal across all factors",
      "Total product is maximized",
      "Marginal product of each factor is equal",
      "Marginal revenue product of each factor is equal",
      "Price of each factor is equal"
    ],
    "correctAnswer": "A",
    "explanation": "The least-cost combination rule states that cost is minimized when the last dollar spent on each factor yields the same amount of marginal product. Mathematically, this is MPL / PL = MPK / PK, where L is labor and K is capital."
  },
  {
    "id": 119,
    "unit": 5,
    "lessonIDS": ["5.4"],
    "unitName": "Factor Markets",
    "question": "A market structure in which there is only one buyer of a factor of production is called:",
    "image": null,
    "options": [
      "Monopoly",
      "Oligopoly",
      "Monopolistic competition",
      "Perfect competition",
      "Monopsony"
    ],
    "correctAnswer": "E",
    "explanation": "Monopsony is the factor market equivalent of a monopoly (single seller) in the product market. It refers to a market with a single buyer of an input, such as a dominant employer in a small town."
  },
  {
    "id": 120,
    "unit": 5,
    "lessonIDS": ["5.4"],
    "unitName": "Factor Markets",
    "question": "For a monopsonist employer, the marginal factor cost (MFC) of labor is greater than the wage rate because:",
    "image": null,
    "options": [
      "The firm must pay a higher wage to attract more workers, and this higher wage applies to all workers hired",
      "The firm faces a perfectly elastic supply of labor",
      "The marginal revenue product of labor is decreasing",
      "The firm is a price taker in the labor market",
      "The supply curve of labor is downward sloping"
    ],
    "correctAnswer": "A",
    "explanation": "A monopsonist faces the entire upward-sloping market labor supply curve. To hire one more worker, it must raise the wage not only for that worker but for all existing workers as well. This makes the marginal factor cost (the cost of hiring one more worker) exceed the wage rate."
  },
  {
    "id": 121,
    "unit": 5,
    "lessonIDS": ["5.4"],
    "unitName": "Factor Markets",
    "question": "A monopsonist maximizes profit by hiring labor up to the point where:",
    "image": null,
    "options": [
      "Marginal revenue product equals the wage rate (MRP = W)",
      "Marginal revenue product equals marginal factor cost (MRP = MFC)",
      "Marginal factor cost equals the wage rate (MFC = W)",
      "Marginal product equals the wage rate (MP = W)",
      "Marginal product equals marginal factor cost (MP = MFC)"
    ],
    "correctAnswer": "B",
    "explanation": "The profit-maximizing rule for hiring inputs is always MRP = MFC. For a monopsonist, the MFC is greater than the wage rate (W), so they hire where MRP = MFC, and then determine the wage to pay based on the labor supply curve at that quantity."
  },
  {
    "id": 122,
    "unit": 5,
    "lessonIDS": ["5.4"],
    "unitName": "Factor Markets",
    "question": "Compared to a perfectly competitive labor market outcome, a monopsonist will hire:",
    "image": null,
    "options": [
      "More workers at a higher wage",
      "More workers at a lower wage",
      "Fewer workers at a higher wage",
      "Fewer workers at a lower wage",
      "The same number of workers at a lower wage"
    ],
    "correctAnswer": "D",
    "explanation": "Because the monopsonist equates MRP with the higher MFC curve (which lies above the supply curve), it chooses a quantity of labor that is lower than the competitive quantity. The wage paid is determined by the supply curve at this lower quantity, resulting in a lower wage than in a competitive market."
  }
]


// Microeconomics Unit 6 Practice Problems
const microUnit6Questions = [
  {
    "id": 123,
    "unit": 6,
    "lessonIDS": ["6.1"],
    "unitName": "Market Failure and the Role of Government",
    "question": "Allocative efficiency in a market occurs when:",
    "image": null,
    "options": [
      "Economic profit is zero",
      "Output is produced at minimum average total cost",
      "The marginal benefit to society equals the marginal cost to society",
      "Firms are price takers",
      "Total revenue is maximized"
    ],
    "correctAnswer": "C",
    "explanation": "Allocative efficiency means resources are distributed to produce the mix of goods and services most desired by society. This occurs when the marginal social benefit (MSB) of the last unit produced equals its marginal social cost (MSC)."
  },
  {
    "id": 124,
    "unit": 6,
    "lessonIDS": ["6.2"],
    "unitName": "Market Failure and the Role of Government",
    "question": "The presence of a negative externality in production leads to a market outcome where:",
    "image": null,
    "options": [
      "The market produces less than the socially optimal quantity",
      "The market price is higher than the socially optimal price",
      "The marginal social cost is less than the marginal private cost",
      "The market produces more than the socially optimal quantity",
      "There is no deadweight loss"
    ],
    "correctAnswer": "D",
    "explanation": "When a negative externality exists (e.g., pollution), the social cost (MSC) of production exceeds the private cost (MPC). The unregulated market produces where MPB = MPC, resulting in an output level greater than the socially optimal level (where MSB = MSC), leading to overproduction and deadweight loss."
  },
  {
    "id": 125,
    "unit": 6,
    "lessonIDS": ["6.2"],
    "unitName": "Market Failure and the Role of Government",
    "question": "Which of the following government actions could correct for a positive externality in consumption?",
    "image": null,
    "options": [
      "Imposing a per-unit tax on consumers",
      "Imposing a price floor above the equilibrium price",
      "Providing a per-unit subsidy to consumers",
      "Granting a monopoly to the producer",
      "Banning the consumption of the good"
    ],
    "correctAnswer": "C",
    "explanation": "A positive externality in consumption (e.g., vaccinations) means the social benefit (MSB) exceeds the private benefit (MPB). A per-unit subsidy to consumers effectively increases their private benefit, shifting the demand curve rightward towards the socially optimal quantity where MSB = MSC."
  },
  {
    "id": 126,
    "unit": 6,
    "lessonIDS": ["6.1", "6.2"],
    "unitName": "Market Failure and the Role of Government",
    "question": "The socially optimal quantity of a good is produced where:",
    "image": null,
    "options": [
      "Marginal private benefit equals marginal private cost",
      "Marginal social benefit equals marginal social cost",
      "Total social benefit is maximized",
      "Average social cost is minimized",
      "Producer surplus equals consumer surplus"
    ],
    "correctAnswer": "B",
    "explanation": "The socially optimal, or allocatively efficient, quantity occurs where the marginal benefit to society (MSB) from consuming the last unit is exactly equal to the marginal cost to society (MSC) of producing that last unit. This point maximizes total social surplus."
  },
  {
    "id": 127,
    "unit": 6,
    "lessonIDS": ["6.3"],
    "unitName": "Market Failure and the Role of Government",
    "question": "A public good, such as national defense, is characterized by being:",
    "image": null,
    "options": [
      "Rivalrous and excludable",
      "Non-rivalrous and excludable",
      "Rivalrous and non-excludable",
      "Non-rivalrous and non-excludable",
      "Produced only by the government"
    ],
    "correctAnswer": "D",
    "explanation": "Public goods possess two key characteristics: non-rivalry (one person's use does not prevent others from using it) and non-excludability (it is impractical or impossible to prevent non-payers from benefiting)."
  },
  {
    "id": 128,
    "unit": 6,
    "lessonIDS": ["6.3"],
    "unitName": "Market Failure and the Role of Government",
    "question": "The free-rider problem associated with public goods arises because:",
    "image": null,
    "options": [
      "The marginal cost of providing the good to an additional user is zero",
      "Individuals can benefit from the good without paying for it",
      "The government produces the good inefficiently",
      "Private firms can earn large profits from public goods",
      "The good is rivalrous in consumption"
    ],
    "correctAnswer": "B",
    "explanation": "Since people cannot be easily excluded from consuming a public good, they have an incentive to let others pay for it while still enjoying the benefits. This free-riding leads to under-provision by private markets, often necessitating government provision."
  },
  {
    "id": 129,
    "unit": 6,
    "lessonIDS": ["6.4"],
    "unitName": "Market Failure and the Role of Government",
    "question": "Consider a monopoly. The imposition of a per-unit tax on the monopolist's output will typically lead to:",
    "image": null,
    "options": [
      "A decrease in price and an increase in output",
      "An increase in price and an increase in output",
      "A decrease in price and a decrease in output",
      "An increase in price and a decrease in output",
      "No change in price or output"
    ],
    "correctAnswer": "D",
    "explanation": "A per-unit tax acts like an increase in marginal cost (MC) for the monopolist. The MC curve shifts upward/leftward. The monopolist will find the new profit-maximizing quantity where MR intersects the new, higher MC curve. This results in a lower quantity and, moving up the demand curve, a higher price."
  },
  {
    "id": 130,
    "unit": 6,
    "lessonIDS": ["6.4"],
    "unitName": "Market Failure and the Role of Government",
    "question": "If the government imposes a lump-sum tax (a fixed amount regardless of output) on a profit-maximizing monopolist, how will this affect the monopolist's output and price in the short run?",
    "image": null,
    "options": [
      "Output increases, price decreases",
      "Output decreases, price increases",
      "Output and price remain unchanged",
      "Output remains unchanged, price increases",
      "Output decreases, price remains unchanged"
    ],
    "correctAnswer": "C",
    "explanation": "A lump-sum tax affects only fixed costs, not marginal costs (MC) or marginal revenue (MR). Since the profit-maximizing output level is determined where MR = MC, and neither of these curves shifts, the monopolist's output and price will not change in the short run. The tax will, however, reduce the monopolist's total profit."
  },
  {
    "id": 131,
    "unit": 6,
    "lessonIDS": ["6.5"],
    "unitName": "Market Failure and the Role of Government",
    "question": "The Lorenz curve is used by economists to illustrate:",
    "image": null,
    "options": [
      "The relationship between tax rates and tax revenue",
      "The distribution of income within a society",
      "The trade-off between inflation and unemployment",
      "The production possibilities of an economy",
      "The deadweight loss from taxation"
    ],
    "correctAnswer": "B",
    "explanation": "The Lorenz curve plots the cumulative percentage of total income received against the cumulative percentage of households/individuals, starting from the lowest income. The further the curve bows away from the line of perfect equality, the greater the income inequality."
  },
  {
    "id": 132,
    "unit": 6,
    "lessonIDS": ["6.5"],
    "unitName": "Market Failure and the Role of Government",
    "question": "A Gini coefficient of 0 represents:",
    "image": null,
    "options": [
      "Perfect income inequality",
      "Perfect income equality",
      "The highest level of economic efficiency",
      "A situation where only one person earns all the income",
      "A negative externality"
    ],
    "correctAnswer": "B",
    "explanation": "The Gini coefficient is a numerical measure of income inequality derived from the Lorenz curve, ranging from 0 (perfect equality, where everyone has the same income) to 1 (perfect inequality, where one person has all the income)."
  },
  {
    "id": 133,
    "unit": 6,
    "lessonIDS": ["6.3"],
    "unitName": "Market Failure and the Role of Government",
    "question": "The 'Tragedy of the Commons' typically arises when a resource is:",
    "image": null,
    "options": [
      "Non-rivalrous and non-excludable", // Removed (Public Good)
      "Rivalrous and excludable",         // Removed (Private Good)
      "Non-rivalrous and excludable",     // Removed (Club Good)
      "Rivalrous and non-excludable",     // Removed (Common Resource)
      "Owned and managed exclusively by the government"
    ],
    "correctAnswer": "D",
    "explanation": "The Tragedy of the Commons describes the overuse and potential depletion of a common resource, which is defined by being rivalrous but non-excludable." // Removed internal parentheses
  },
  {
    "id": 134,
    "unit": 6,
    "lessonIDS": ["6.2"],
    "unitName": "Market Failure and the Role of Government",
    "question": "If the production of technology yields positive externalities, an unregulated competitive market will tend to produce:", // Removed (knowledge spillovers)
    "image": null,
    "options": [
      "More than the socially optimal quantity of technology.",
      "Less than the socially optimal quantity of technology.",
      "Exactly the socially optimal quantity of technology.",
      "A quantity where marginal private cost equals marginal social benefit.",
      "Zero output due to high private costs."
    ],
    "correctAnswer": "B",
    "explanation": "With a positive production externality, the marginal social cost is lower than the marginal private cost. The market produces where marginal private benefit equals marginal private cost, which is less than the socially optimal quantity where marginal social benefit equals marginal social cost. The market underproduces the good." // Reworded slightly to remove acronyms in parentheses
  },
  {
    "id": 135,
    "unit": 6,
    "lessonIDS": ["6.2"],
    "unitName": "Market Failure and the Role of Government",
    "question": "According to the Coase Theorem, private bargaining between parties can lead to an efficient resolution of externality problems if:",
    "image": null,
    "options": [
      "The government imposes a corrective tax.",
      "There are many parties involved in the negotiation.",
      "Property rights are clearly defined and transaction costs are low.",
      "The externality is positive rather than negative.",
      "One party has significantly more information than the other."
    ],
    "correctAnswer": "C",
    "explanation": "The Coase Theorem posits that private solutions to externalities are possible and efficient if property rights are well-defined and enforceable, and the costs associated with bargaining are negligible." // Removed (transaction costs)
  },
  {
    "id": 136,
    "unit": 6,
    "lessonIDS": ["6.3"],
    "unitName": "Market Failure and the Role of Government",
    "question": "To determine the economy's marginal social benefit curve for a public good, one should:",
    "image": null,
    "options": [
      "Horizontally sum the individual marginal benefit curves.",
      "Vertically sum the individual marginal benefit curves.",
      "Average the individual marginal benefit curves.",
      "Take the highest individual marginal benefit curve.",
      "Sum the total benefits provided by the good."
    ],
    "correctAnswer": "B",
    "explanation": "Because a public good is non-rivalrous, the total willingness to pay for any given quantity is found by adding up the marginal benefits of all individuals at that quantity. This corresponds to a vertical summation of individual demand or marginal benefit curves." // Reworded slightly to remove parentheses
  },
  {
    "id": 137,
    "unit": 6,
    "lessonIDS": ["6.5"],
    "unitName": "Market Failure and the Role of Government",
    "question": "A tax system in which high-income earners pay a larger percentage of their income in taxes than low-income earners is described as:",
    "image": null,
    "options": [
      "Regressive",
      "Proportional",
      "Progressive",
      "Lump-sum",
      "Consumption-based"
    ],
    "correctAnswer": "C",
    "explanation": "A progressive tax system is characterized by an average tax rate that increases as taxable income increases. High-income individuals pay a proportionally larger share of their income in taxes." // No changes needed
  },
  {
    "id": 138,
    "unit": 6,
    "lessonIDS": ["6.2"],
    "unitName": "Market Failure and the Role of Government",
    "question": "Suppose the consumption of sugary drinks generates negative health externalities not fully considered by consumers. In an unregulated market, the equilibrium quantity of sugary drinks consumed will be:",
    "image": null,
    "options": [
      "Equal to the socially optimal quantity.",
      "Less than the socially optimal quantity.",
      "Greater than the socially optimal quantity.",
      "Determined solely by production costs.",
      "Zero, due to health concerns."
    ],
    "correctAnswer": "C",
    "explanation": "With a negative consumption externality, the marginal social benefit is lower than the marginal private benefit because the externality imposes costs on society. The market equilibrium occurs where marginal private benefit equals marginal social cost, or marginal private cost if no production externality exists. This results in a quantity consumed that is greater than the socially optimal quantity where marginal social benefit equals marginal social cost." // Reworded slightly to remove acronyms in parentheses and clarify the MPC part.
  }, 
  {
    "id": 139,
    "subject": "ap_microeconomics",
    "unit": 6,
    "lessonIDS": ["6.2", "6.4"], // Covers Externalities and Government Intervention
    "unitName": "Market Failure and the Role of Government",
    "question": "The graph above illustrates a market with an externality. To achieve the socially optimal level of output, the government could impose which of the following?",
    "image": allQS139, // Use imported variable
    "options": [
      "A per-unit tax equal to P1.",
      "A per-unit subsidy equal to P1 - P3.",
      "A per-unit tax equal to P1 - P3.",
      "A price ceiling set at P3.",
      "A price floor set at P1."
    ],
    "correctAnswer": "C",
    "explanation": "The graph shows a negative production externality because the marginal social cost (MSC) is greater than the marginal private cost (MPC). The market equilibrium quantity (where MPB=MPC) is greater than the socially optimal quantity (where MSB=MSC). To correct this overproduction, the government can impose a per-unit tax equal to the marginal external cost at the optimal quantity. This cost is represented by the vertical distance between MSC and MPC at the optimal quantity, which is equal to P1 - P3."
  }, 
  {
    "id": 140,
    "subject": "ap_microeconomics",
    "unit": 6,
    "lessonIDS": ["6.2"], // Focuses on identifying types of externalities
    "unitName": "Market Failure and the Role of Government",
    "question": "Which of the following economic activities is most likely represented by the market conditions shown in the graph?",
    "image": allQS140, // Use imported variable
    "options": [
      "A chemical factory polluting a river during its production process.",
      "An individual receiving a vaccination that helps prevent the spread of disease.",
      "A company conducting research and development that creates knowledge benefiting other firms.",
      "The market for basic haircuts where production and consumption primarily affect only buyers and sellers.",
      "An individual playing loud music late at night that disturbs neighbors."
    ],
    "correctAnswer": "A",
    "explanation": "The graph shows that the marginal social cost (MSC) is greater than the marginal private cost (MPC), while marginal social benefit (MSB) equals marginal private benefit (MPB). This indicates a negative externality in production. Option A, factory pollution, is a classic example where the production process imposes external costs on society (pollution) that are not reflected in the firm's private costs."
  }, 
  {
    "id": 141,
    "subject": "ap_microeconomics",
    "unit": 6,
    "lessonIDS": ["6.2", "6.4"], // Covers Externalities and Government Intervention
    "unitName": "Market Failure and the Role of Government",
    "question": "Based on the relationships between the curves shown in the diagram below, which government action would most likely move the market outcome closer to the socially optimal quantity?",
    "image": allQS141, // Use imported variable
    "options": [
      "Imposing a per-unit tax on producers.",
      "Granting a per-unit subsidy to consumers.",
      "Implementing a binding price floor in the market.",
      "Implementing a binding price ceiling in the market.",
      "Taxing the external benefits generated."
    ],
    "correctAnswer": "B",
    "explanation": "The graph shows that the marginal social benefit (MSB) is greater than the marginal private benefit (MPB), indicating a positive externality in consumption. The market equilibrium (where MPB intersects MPC) results in a quantity below the socially optimal level (where MSB intersects MSC/MPC). To correct this under-consumption, the government can provide a per-unit subsidy to consumers, effectively increasing the marginal private benefit and shifting the demand curve towards the MSB curve, thus encouraging consumption towards the optimal quantity."
  }
];

export const allQuestions: QuestionType[] = [
  // --- AP Macroeconomics Questions ---

  // Unit 1: Basic Economic Concepts
  {
    "id": 1,
    "subject": "ap_macroeconomics",
    "unit": 1,
    "lessonIDS": ["1.1"],
    "unitName": "Basic Economic Concepts",
    "question": "The fundamental problem of economics that arises from limited resources and unlimited wants is known as:",
    "image": null,
    "options": [
      "Opportunity cost.",
      "Comparative advantage.",
      "Scarcity.",
      "Equilibrium.",
      "Efficiency."
    ],
    "correctAnswer": "C",
    "explanation": "Scarcity is the core economic problem referring to the conflict between society's unlimited wants and its limited resources, necessitating choices about resource allocation."
  },
  {
    "id": 2,
    "subject": "ap_macroeconomics",
    "unit": 1,
    "lessonIDS": ["1.2"],
    "unitName": "Basic Economic Concepts",
    "question": "The value of the best alternative forgone when a choice is made is called:",
    "image": null,
    "options": [
      "Explicit cost.",
      "Marginal cost.",
      "Scarcity.",
      "Opportunity cost.",
      "Comparative cost."
    ],
    "correctAnswer": "D",
    "explanation": "Opportunity cost is the value of the next best alternative that must be sacrificed when making a decision. It highlights the trade-offs inherent in every choice."
  },
  {
    "id": 3,
    "subject": "ap_macroeconomics",
    "unit": 1,
    "lessonIDS": ["1.2"],
    "unitName": "Basic Economic Concepts",
    "question": "A point located inside the Production Possibilities Curve (PPC) indicates that:",
    "image": null,
    "options": [
      "The economy is operating at full employment.",
      "Resources are being used inefficiently or are unemployed.",
      "The economy has experienced economic growth.",
      "The combination of goods is unattainable with current resources.",
      "The economy is producing beyond its capacity."
    ],
    "correctAnswer": "B",
    "explanation": "Points inside the PPC represent attainable production levels but signify inefficiency, meaning resources (like labor or capital) are either unemployed or not being used to their full potential."
  },
  {
    "id": 4,
    "subject": "ap_macroeconomics",
    "unit": 1,
    "lessonIDS": ["1.2"],
    "unitName": "Basic Economic Concepts",
    "question": "Which of the following would cause an outward shift of a nation's Production Possibilities Curve (PPC)?",
    "image": null,
    "options": [
      "A decrease in unemployment.",
      "An increase in the general price level.",
      "A natural disaster destroying resources.",
      "An improvement in technology applicable to production.",
      "A shift in consumer preferences."
    ],
    "correctAnswer": "D",
    "explanation": "An outward shift of the PPC signifies economic growth. This can result from increases in resource availability (land, labor, capital) or improvements in technology that allow more output to be produced with the same resources."
  },
  {
    "id": 5,
    "subject": "ap_macroeconomics",
    "unit": 1,
    "lessonIDS": ["1.3"],
    "unitName": "Basic Economic Concepts",
    "question": "Country A can produce 10 cars or 20 computers. Country B can produce 8 cars or 12 computers. Which country has the comparative advantage in producing cars?",
    "image": null,
    "options": [
      "Country A.",
      "Country B.",
      "Neither country.",
      "Both countries.",
      "Cannot be determined from the information given."
    ],
    "correctAnswer": "B",
    "explanation": "To find comparative advantage, calculate opportunity costs. Country A's opportunity cost of 1 car is 2 computers (20/10). Country B's opportunity cost of 1 car is 1.5 computers (12/8). Since Country B has the lower opportunity cost for cars, it has the comparative advantage."
  },
  {
    "id": 6,
    "subject": "ap_macroeconomics",
    "unit": 1,
    "lessonIDS": ["1.3"],
    "unitName": "Basic Economic Concepts",
    "question": "Specialization and trade based on comparative advantage lead to:",
    "image": null,
    "options": [
      "Increased scarcity.",
      "A decrease in total world production.",
      "Higher opportunity costs for all nations.",
      "An increase in total world production and consumption possibilities.",
      "A shift inward of the Production Possibilities Curve for trading nations."
    ],
    "correctAnswer": "D",
    "explanation": "When countries specialize in goods where they have a lower opportunity cost (comparative advantage) and trade, global efficiency increases. This results in higher total world output and allows countries to consume beyond their individual production possibilities."
  },
  {
    "id": 7,
    "subject": "ap_macroeconomics",
    "unit": 1,
    "lessonIDS": ["1.4"],
    "unitName": "Basic Economic Concepts",
    "question": "According to the law of demand, an increase in the price of a good, ceteris paribus, leads to:",
    "image": null,
    "options": [
      "An increase in the quantity demanded.",
      "A decrease in demand.",
      "A decrease in the quantity demanded.",
      "An increase in demand.",
      "No change in quantity demanded."
    ],
    "correctAnswer": "C",
    "explanation": "The law of demand describes the inverse relationship between price and quantity demanded, holding other factors constant. When the price of a good rises, consumers typically buy less of it."
  },
  {
    "id": 8,
    "subject": "ap_macroeconomics",
    "unit": 1,
    "lessonIDS": ["1.5"],
    "unitName": "Basic Economic Concepts",
    "question": "Which of the following would cause the supply curve for smartphones to shift to the right?",
    "image": null,
    "options": [
      "An increase in the wages of smartphone factory workers.",
      "A decrease in the price of smartphones.",
      "An improvement in the technology used to produce smartphones.",
      "An expectation by sellers that smartphone prices will rise significantly next month.",
      "An increase in taxes on smartphone producers."
    ],
    "correctAnswer": "C",
    "explanation": "A rightward shift in supply indicates an increase in supply. Technological improvements often lower production costs, enabling firms to supply more at each price level."
  },
  {
    "id": 9,
    "subject": "ap_macroeconomics",
    "unit": 1,
    "lessonIDS": ["1.6"],
    "unitName": "Basic Economic Concepts",
    "question": "In a competitive market, equilibrium is achieved when:",
    "image": null,
    "options": [
      "There is a surplus of the good.",
      "There is a shortage of the good.",
      "The price is set by the government.",
      "Quantity supplied equals quantity demanded.",
      "Demand equals supply."
    ],
    "correctAnswer": "D",
    "explanation": "Market equilibrium occurs at the price where the amount producers are willing to sell (quantity supplied) is exactly equal to the amount consumers are willing to buy (quantity demanded). There is no tendency for the price to change at this point."
  },
  {
    "id": 10,
    "subject": "ap_macroeconomics",
    "unit": 1,
    "lessonIDS": ["1.4", "1.6"],
    "unitName": "Basic Economic Concepts",
    "question": "If consumer incomes increase and gasoline is a normal good, what will happen in the market for gasoline, ceteris paribus?",
    "image": null,
    "options": [
      "Equilibrium price will decrease, and equilibrium quantity will increase.",
      "Equilibrium price will increase, and equilibrium quantity will decrease.",
      "Equilibrium price and quantity will both decrease.",
      "Equilibrium price and quantity will both increase.",
      "Equilibrium price will increase, and equilibrium quantity will remain unchanged."
    ],
    "correctAnswer": "D",
    "explanation": "For a normal good, higher consumer incomes lead to an increase in demand (a rightward shift of the demand curve). This increase in demand causes both the equilibrium price and the equilibrium quantity to rise."
  },

  // Unit 2: Economic Indicators and the Business Cycle
  {
    "id": 11,
    "subject": "ap_macroeconomics",
    "unit": 2,
    "lessonIDS": ["2.4"],
    "unitName": "Economic Indicators and the Business Cycle",
    "question": "If the Consumer Price Index (CPI) was 150 in Year 1 and 165 in Year 2, the inflation rate between Year 1 and Year 2 was:",
    "image": null,
    "options": [
      "9.1%",
      "10.0%",
      "15.0%",
      "16.5%",
      "5.0%"
    ],
    "correctAnswer": "B",
    "explanation": "The formula for the inflation rate is: Inflation Rate = [(CPI Year 2 - CPI Year 1) / CPI Year 1] x 100. So, Inflation Rate = [(165 - 150) / 150] x 100 = (15 / 150) x 100 = 0.1 x 100 = 10.0%."
  },
  {
    "id": 12,
    "subject": "ap_macroeconomics",
    "unit": 2,
    "lessonIDS": ["2.3"],
    "unitName": "Economic Indicators and the Business Cycle",
    "question": "Suppose an economy has an adult population of 250 million, 150 million employed, and 10 million unemployed. The labor force participation rate is:",
    "image": null,
    "options": [
      "4.0%",
      "60.0%",
      "64.0%",
      "93.75%",
      "6.25%"
    ],
    "correctAnswer": "C",
    "explanation": "First, find the labor force: Labor Force = Employed + Unemployed = 150 million + 10 million = 160 million. Then, calculate the Labor Force Participation Rate: LFPR = (Labor Force / Adult Population) x 100 = (160 million / 250 million) x 100 = 0.64 x 100 = 64.0%."
  },
  {
    "id": 13,
    "subject": "ap_macroeconomics",
    "unit": 2,
    "lessonIDS": ["2.6"],
    "unitName": "Economic Indicators and the Business Cycle",
    "question": "If Nominal GDP is $15 trillion and Real GDP is $12 trillion, the GDP Deflator is:",
    "image": null,
    "options": [
      "80",
      "100",
      "115",
      "125",
      "150"
    ],
    "correctAnswer": "D",
    "explanation": "The formula for the GDP Deflator is: GDP Deflator = (Nominal GDP / Real GDP) x 100. So, GDP Deflator = ($15 trillion / $12 trillion) x 100 = 1.25 x 100 = 125."
  },
  {
    "id": 14,
    "subject": "ap_macroeconomics",
    "unit": 2,
    "lessonIDS": ["2.3", "2.7"],
    "unitName": "Economic Indicators and the Business Cycle",
    "question": "A worker who is laid off due to a downturn in the business cycle represents which type of unemployment?",
    "image": null,
    "options": [
      "Frictional unemployment",
      "Structural unemployment",
      "Cyclical unemployment",
      "Seasonal unemployment",
      "Natural unemployment"
    ],
    "correctAnswer": "C",
    "explanation": "Cyclical unemployment is directly related to the health of the economy. It rises during recessions (downturns) when firms lay off workers due to decreased demand and falls during economic expansions."
  },
  {
    "id": 15,
    "subject": "ap_macroeconomics",
    "unit": 2,
    "lessonIDS": ["2.4"],
    "unitName": "Economic Indicators and the Business Cycle",
    "question": "Assume the market basket cost $200 in the base year and $250 in the current year. The Consumer Price Index (CPI) for the current year is:",
    "image": null,
    "options": [
      "80",
      "100",
      "120",
      "125",
      "250"
    ],
    "correctAnswer": "D",
    "explanation": "The formula for CPI is: CPI = (Cost of Basket in Current Year / Cost of Basket in Base Year) x 100. So, CPI = ($250 / $200) x 100 = 1.25 x 100 = 125."
  },
  {
    "id": 16,
    "subject": "ap_macroeconomics",
    "unit": 2,
    "lessonIDS": ["2.2"],
    "unitName": "Economic Indicators and the Business Cycle",
    "question": "Which of the following is a limitation of using GDP as a measure of a country's overall well-being?",
    "image": null,
    "options": [
      "It includes the value of intermediate goods.",
      "It fails to account for the distribution of income.",
      "It double counts transfer payments.",
      "It only measures the production of goods, not services.",
      "It adjusts for changes in the price level."
    ],
    "correctAnswer": "B",
    "explanation": "GDP is an aggregate measure and does not reveal how income is distributed. A high GDP could mask significant income inequality, which affects overall societal well-being. Other limitations include ignoring leisure time, environmental quality, and non-market activities."
  },
  {
    "id": 17,
    "subject": "ap_macroeconomics",
    "unit": 2,
    "lessonIDS": ["2.6"],
    "unitName": "Economic Indicators and the Business Cycle",
    "question": "If Nominal GDP is $10 trillion and the GDP Deflator is 125, Real GDP is:",
    "image": null,
    "options": [
      "$8 trillion",
      "$10 trillion",
      "$12.5 trillion",
      "$125 trillion",
      "$7.5 trillion"
    ],
    "correctAnswer": "A",
    "explanation": "The formula relating these is: Real GDP = (Nominal GDP / GDP Deflator) x 100. So, Real GDP = ($10 trillion / 125) x 100 = $0.08 trillion x 100 = $8 trillion."
  },
  {
    "id": 18,
    "subject": "ap_macroeconomics",
    "unit": 2,
    "lessonIDS": ["2.3"],
    "unitName": "Economic Indicators and the Business Cycle",
    "question": "If an economy has 10 million people unemployed and 190 million people employed, the unemployment rate is:",
    "image": null,
    "options": [
      "5.0%",
      "5.26%",
      "10.0%",
      "19.0%",
      "4.76%"
    ],
    "correctAnswer": "A",
    "explanation": "First, find the labor force: Labor Force = Employed + Unemployed = 190 million + 10 million = 200 million. Then, calculate the Unemployment Rate: UR = (# Unemployed / Labor Force) x 100 = (10 million / 200 million) x 100 = 0.05 x 100 = 5.0%."
  },
  {
    "id": 19,
    "subject": "ap_macroeconomics",
    "unit": 2,
    "lessonIDS": ["2.2"],
    "unitName": "Economic Indicators and the Business Cycle",
    "question": "Gross Domestic Product (GDP) fails to account for which of the following?",
    "image": null,
    "options": [
      "The production of services.",
      "The value of non-market activities, such as household production.",
      "Investment spending by businesses.",
      "Government purchases of goods and services.",
      "Net exports."
    ],
    "correctAnswer": "B",
    "explanation": "GDP measures the market value of final goods and services produced. It excludes non-market transactions like unpaid household work, volunteer work, and illegal activities, which can be substantial."
  },
  {
    "id": 20,
    "subject": "ap_macroeconomics",
    "unit": 2,
    "lessonIDS": ["2.4"],
    "unitName": "Economic Indicators and the Business Cycle",
    "question": "The Consumer Price Index (CPI) tends to overstate the true rate of inflation primarily because it:",
    "image": null,
    "options": [
      "Includes the price of imported goods.",
      "Does not fully account for consumers' ability to substitute towards cheaper goods.",
      "Uses a base year that is too far in the past.",
      "Excludes the price of services.",
      "Fails to account for changes in nominal wages."
    ],
    "correctAnswer": "B",
    "explanation": "The CPI uses a fixed basket of goods and services. When prices change, consumers often substitute away from more expensive items towards cheaper ones. The CPI's fixed basket doesn't capture this substitution effect, leading to an overestimation of the cost of living increase (substitution bias)."
  },
  {
    "id": 21,
    "subject": "ap_macroeconomics",
    "unit": 2,
    "lessonIDS": ["2.6"],
    "unitName": "Economic Indicators and the Business Cycle",
    "question": "If Real GDP was $10 trillion in Year 1 and $10.5 trillion in Year 2, the economic growth rate between Year 1 and Year 2 was:",
    "image": null,
    "options": [
      "0.5%",
      "5.0%",
      "10.0%",
      "10.5%",
      "-5.0%"
    ],
    "correctAnswer": "B",
    "explanation": "The economic growth rate is the percentage change in Real GDP. Growth Rate = [(Real GDP Year 2 - Real GDP Year 1) / Real GDP Year 1] x 100 = [($10.5T - $10T) / $10T] x 100 = ($0.5T / $10T) x 100 = 0.05 x 100 = 5.0%."
  },
  {
    "id": 22,
    "subject": "ap_macroeconomics",
    "unit": 2,
    "lessonIDS": ["2.1", "2.6"],
    "unitName": "Economic Indicators and the Business Cycle",
    "question": "An economy produces only apples and bananas. In one year, 100 apples are sold at $1 each, and 50 bananas are sold at $2 each. Nominal GDP for that year is:",
    "image": null,
    "options": [
      "$100",
      "$150",
      "$200",
      "$300",
      "$50"
    ],
    "correctAnswer": "C",
    "explanation": "Nominal GDP is the market value of all final goods and services produced. Calculate the value of each good and sum them: Nominal GDP = (Price_Apples x Quantity_Apples) + (Price_Bananas x Quantity_Bananas) = ($1 x 100) + ($2 x 50) = $100 + $100 = $200."
  },
  {
    "id": 23,
    "subject": "ap_macroeconomics",
    "unit": 2,
    "lessonIDS": ["2.6"],
    "unitName": "Economic Indicators and the Business Cycle",
    "question": "By definition, the value of a price index, such as the CPI or GDP Deflator, in the base year is always equal to:",
    "image": null,
    "options": [
      "0",
      "1",
      "10",
      "100",
      "The inflation rate."
    ],
    "correctAnswer": "D",
    "explanation": "Price indices are benchmarked to a base year. In the base year, the index compares the cost of the basket (or overall prices) to itself, resulting in a value of (Cost / Cost) x 100 = 100."
  },
  {
    "id": 24,
    "subject": "ap_macroeconomics",
    "unit": 2,
    "lessonIDS": ["2.3"],
    "unitName": "Economic Indicators and the Business Cycle",
    "question": "Which of the following individuals would be officially classified as unemployed?",
    "image": null,
    "options": [
      "A person working part-time who wants a full-time job.",
      "A discouraged worker who has stopped looking for a job.",
      "A full-time student not looking for work.",
      "A retiree receiving a pension.",
      "A person who was laid off last week and is actively seeking a new job."
    ],
    "correctAnswer": "E",
    "explanation": "The official definition of unemployed requires a person to be jobless, available for work, and actively seeking work within the past four weeks. Discouraged workers (B) are not actively seeking. Part-time workers (A) are considered employed. Students (C) and retirees (D) not seeking work are not in the labor force."
  },
  {
    "id": 25,
    "subject": "ap_macroeconomics",
    "unit": 2,
    "lessonIDS": ["2.5"],
    "unitName": "Economic Indicators and the Business Cycle",
    "question": "Which group is most likely to be negatively impacted by unanticipated inflation?",
    "image": null,
    "options": [
      "Borrowers with fixed-interest rate loans.",
      "Individuals whose wages are indexed to the CPI.",
      "The government, due to increased tax revenue.",
      "Lenders providing loans at fixed interest rates.",
      "Owners of real estate."
    ],
    "correctAnswer": "D",
    "explanation": "Unanticipated inflation reduces the purchasing power of money repaid in the future. Lenders receiving fixed interest payments find that the real value of those payments is lower than expected, hurting their returns. Borrowers with fixed rates benefit by repaying loans with less valuable dollars."
  },

  // Unit 3: National Income and Price Determination
  {
    "id": 26,
    "subject": "ap_macroeconomics",
    "unit": 3,
    "lessonIDS": ["3.1"],
    "unitName": "National Income and Price Determination",
    "question": "Which of the following events would most likely cause the aggregate demand curve to shift to the right?",
    "image": null,
    "options": [
      "A decrease in household wealth",
      "An increase in interest rates",
      "An increase in expected future inflation",
      "A decrease in government transfer payments",
      "An appreciation of the domestic currency"
    ],
    "correctAnswer": "C",
    "explanation": "If households expect higher inflation in the future, they are incentivized to increase current consumption spending now, shifting AD to the right. Other options decrease AD (A, B, D) or decrease net exports, thus decreasing AD (E)."
  },
  {
    "id": 27,
    "subject": "ap_macroeconomics",
    "unit": 3,
    "lessonIDS": ["3.2"],
    "unitName": "National Income and Price Determination",
    "question": "If the marginal propensity to save (MPS) is 0.2, and the government increases spending by $100 billion with no change in taxes, what is the maximum possible change in real GDP?",
    "image": null,
    "options": [
      "Increase by $50 billion",
      "Decrease by $100 billion",
      "Increase by $200 billion",
      "Increase by $400 billion",
      "Increase by $500 billion"
    ],
    "correctAnswer": "E",
    "explanation": "The spending multiplier is 1 / MPS = 1 / 0.2 = 5. The maximum change in GDP is the multiplier times the initial change in spending: 5 * $100 billion = $500 billion increase."
  },
  {
    "id": 28,
    "subject": "ap_macroeconomics",
    "unit": 3,
    "lessonIDS": ["3.3"],
    "unitName": "National Income and Price Determination",
    "question": "Suppose there is a significant increase in the internationally traded price of energy, a major input for production in Country X. How would this likely affect the short-run aggregate supply (SRAS) and the price level in Country X?",
    "image": null,
    "options": [
      "SRAS shifts right, Price level decreases",
      "SRAS shifts left, Price level increases",
      "SRAS shifts right, Price level increases",
      "SRAS shifts left, Price level decreases",
      "No change in SRAS, Price level increases"
    ],
    "correctAnswer": "B",
    "explanation": "An increase in the price of a key input like energy increases production costs for firms. This leads to a decrease (leftward shift) in the SRAS curve, resulting in a higher price level and lower output in the short run."
  },
  {
    "id": 29,
    "subject": "ap_macroeconomics",
    "unit": 3,
    "lessonIDS": ["3.5", "3.7", "2.3"],
    "unitName": "National Income and Price Determination",
    "question": "An economy's actual real GDP is currently $500 billion, while its potential real GDP (full employment output) is estimated to be $550 billion. Based on this information, which of the following is most likely true regarding the unemployment rate?",
    "image": null,
    "options": [
      "The unemployment rate is equal to the natural rate of unemployment.",
      "The unemployment rate is below the natural rate of unemployment.",
      "The unemployment rate is above the natural rate of unemployment.",
      "The unemployment rate is zero.",
      "The relationship between the output gap and unemployment cannot be determined."
    ],
    "correctAnswer": "C",
    "explanation": "When actual output ($500b) is below potential output ($550b), the economy is in a recessionary gap, indicating cyclical unemployment exists. Therefore, the actual unemployment rate is above the natural rate of unemployment (which corresponds to full employment/potential output)."
  },
  {
    "id": 30,
    "subject": "ap_macroeconomics",
    "unit": 3,
    "lessonIDS": ["3.6", "3.8"],
    "unitName": "National Income and Price Determination",
    "question": "Assume an economy is initially in long-run equilibrium. The government then significantly increases its spending on infrastructure projects without changing taxes. In the short run, what is the most likely impact on the price level and real GDP?",
    "image": null,
    "options": [
      "Price level decreases, Real GDP decreases",
      "Price level increases, Real GDP decreases",
      "Price level decreases, Real GDP increases",
      "Price level increases, Real GDP increases",
      "No change in price level, Real GDP increases"
    ],
    "correctAnswer": "D",
    "explanation": "Increased government spending is expansionary fiscal policy, shifting the Aggregate Demand (AD) curve to the right. Moving along the upward-sloping Short-Run Aggregate Supply (SRAS) curve, this leads to a higher price level and higher real GDP in the short run."
  },
  {
    "id": 31,
    "subject": "ap_macroeconomics",
    "unit": 3,
    "lessonIDS": ["3.6"],
    "unitName": "National Income and Price Determination",
    "question": "Which of the following scenarios would lead to an increase in real GDP and a decrease in the price level in the short run?",
    "image": null,
    "options": [
       "A decrease in government spending",
       "A widespread technological advancement",
       "An increase in consumer confidence",
       "An increase in the expected price level",
       "A decrease in net exports"
    ],
    "correctAnswer": "B",
    "explanation": "A widespread technological advancement increases productivity, shifting the Short-Run Aggregate Supply (SRAS) curve to the right. This leads to higher real GDP and a lower price level."
  },
  {
    "id": 32,
    "subject": "ap_macroeconomics",
    "unit": 3,
    "lessonIDS": ["3.7"],
    "unitName": "National Income and Price Determination",
    "question": "If an economy is experiencing an inflationary gap (actual output > potential output), how will the economy typically self-adjust back to long-run equilibrium assuming no government intervention?",
    "image": null,
    "options": [
      "Nominal wages will fall, shifting SRAS right.",
      "Nominal wages will rise, shifting SRAS left.",
      "Productivity will increase, shifting LRAS right.",
      "Consumer confidence will fall, shifting AD left.",
      "Interest rates will fall, shifting AD right."
    ],
    "correctAnswer": "B",
    "explanation": "In an inflationary gap, high demand for resources leads to rising input costs, particularly nominal wages. As nominal wages increase, the SRAS curve shifts to the left, eventually restoring the economy to long-run equilibrium at potential output but with a higher price level."
  },
  {
    "id": 33,
    "subject": "ap_macroeconomics",
    "unit": 3,
    "lessonIDS": ["3.8"],
    "unitName": "National Income and Price Determination",
    "question": "To combat a severe recession, policymakers decide to implement discretionary fiscal policy. Which of the following actions represents an appropriate expansionary fiscal policy?",
    "image": null,
    "options": [
      "Increasing income tax rates",
      "Decreasing government spending on education",
      "Passing legislation to increase transfer payments (e.g., unemployment benefits)",
      "Selling government bonds to the public",
      "Increasing the required reserve ratio for banks"
    ],
    "correctAnswer": "C",
    "explanation": "Expansionary fiscal policy aims to increase aggregate demand during a recession. Increasing transfer payments puts more disposable income in the hands of households, boosting consumption and shifting AD to the right. Options A and B are contractionary fiscal policy. Options D and E relate to monetary policy."
  },
  {
    "id": 34,
    "subject": "ap_macroeconomics",
    "unit": 3,
    "lessonIDS": ["3.9"],
    "unitName": "National Income and Price Determination",
    "question": "During an economic expansion, the nation's progressive income tax system results in automatically higher tax revenues. This phenomenon is an example of:",
    "image": null,
    "options": [
      "Contractionary discretionary fiscal policy",
      "Expansionary discretionary fiscal policy",
      "An automatic stabilizer dampening the expansion",
      "A shift in the long-run aggregate supply curve",
      "The money multiplier effect"
    ],
    "correctAnswer": "C",
    "explanation": "Automatic stabilizers work without specific legislative action. In a progressive tax system, as incomes rise during an expansion, people move into higher tax brackets, and tax revenues increase automatically. This withdraws spending power from the economy, slightly dampening the expansion, acting as a stabilizer."
  },
  {
    "id": 35,
    "subject": "ap_macroeconomics",
    "unit": 3,
    "lessonIDS": ["3.3", "3.7"],
    "unitName": "National Income and Price Determination",
    "question": "A negative demand shock hits an economy, pushing it into a recession. Nominal wages are observed to be 'sticky' downwards. What is a likely consequence of these sticky nominal wages during the recession?",
    "image": null,
    "options": [
      "A rapid return to full employment as firms quickly lower wages.",
      "An immediate increase in the aggregate price level.",
      "A prolonged period of unemployment above the natural rate.",
      "A shift of the Long-Run Aggregate Supply (LRAS) curve to the left.",
      "A decrease in the effectiveness of automatic stabilizers."
    ],
    "correctAnswer": "C",
    "explanation": "Sticky nominal wages mean that wages do not fall easily even when aggregate demand decreases (reducing the demand for labor). Firms facing lower demand and unable to cut nominal wages may instead reduce employment significantly, leading to higher and potentially more persistent cyclical unemployment (actual unemployment above the natural rate) than if wages were flexible downwards."
  },

  // Unit 4: Financial Sector
  {
    "id": 36,
    "subject": "ap_macroeconomics",
    "unit": 4,
    "lessonIDS": ["4.1"],
    "unitName": "Financial Sector",
    "question": "Which statement best describes a key difference between bonds and stocks?",
    "image": null,
    "options": [
      "Bonds represent ownership in a corporation, while stocks represent debt.",
      "Bondholders receive dividend payments, while stockholders receive interest payments.",
      "Stocks generally offer a fixed return, while bond returns fluctuate with company profits.",
      "Bonds represent a loan to an entity (government or corporation), while stocks represent partial ownership.",
      "Selling bonds increases a company's equity, while issuing stock increases its liabilities."
    ],
    "correctAnswer": "D",
    "explanation": "A bond is essentially an IOU, representing debt that must be repaid with interest. A stock represents equity or ownership in a corporation, giving the holder a claim on profits (dividends)."
  },
  {
    "id": 37,
    "subject": "ap_macroeconomics",
    "unit": 4,
    "lessonIDS": ["4.2"],
    "unitName": "Financial Sector",
    "question": "If the nominal interest rate on a one-year loan is 5% and the expected inflation rate for that year is 3%, what is the expected real interest rate?",
    "image": null,
    "options": [
      "-2%",
      "2%",
      "3%",
      "5%",
      "8%"
    ],
    "correctAnswer": "B",
    "explanation": "The approximate real interest rate is calculated as the nominal interest rate minus the inflation rate: Real Interest Rate ≈ Nominal Interest Rate - Inflation Rate = 5% - 3% = 2%."
  },
  {
    "id": 38,
    "subject": "ap_macroeconomics",
    "unit": 4,
    "lessonIDS": ["4.2"],
    "unitName": "Financial Sector",
    "question": "According to the Fisher effect, if lenders expect a higher rate of inflation in the future, they will likely:",
    "image": null,
    "options": [
      "Decrease the nominal interest rate they charge.",
      "Increase the nominal interest rate they charge.",
      "Decrease the real interest rate they expect to earn.",
      "Keep the nominal interest rate constant.",
      "Lend only to the government."
    ],
    "correctAnswer": "B",
    "explanation": "The Fisher effect suggests that nominal interest rates adjust to incorporate expected inflation. To maintain their desired real return, lenders will demand higher nominal interest rates when they anticipate higher inflation."
  },
  {
    "id": 39,
    "subject": "ap_macroeconomics",
    "unit": 4,
    "lessonIDS": ["4.3"],
    "unitName": "Financial Sector",
    "question": "When you use cash to buy groceries, money is primarily functioning as a:",
    "image": null,
    "options": [
      "Store of value",
      "Unit of account",
      "Medium of exchange",
      "Standard of deferred payment",
      "Financial asset"
    ],
    "correctAnswer": "C",
    "explanation": "Using money to directly purchase goods and services demonstrates its role as a medium of exchange – an intermediary instrument used to facilitate transactions, avoiding the need for barter."
  },
  {
    "id": 40,
    "subject": "ap_macroeconomics",
    "unit": 4,
    "lessonIDS": ["4.3"],
    "unitName": "Financial Sector",
    "question": "Which statement best distinguishes the M1 measure of the money supply from M2?",
    "image": null,
    "options": [
      "M1 includes savings accounts, while M2 does not.",
      "M2 includes demand deposits, while M1 does not.",
      "M1 primarily includes assets used directly as a medium of exchange, while M2 adds near monies.",
      "M2 excludes currency and coin in circulation.",
      "M1 includes small-denomination time deposits (CDs)."
    ],
    "correctAnswer": "C",
    "explanation": "M1 consists of the most liquid forms of money used for transactions (currency, demand deposits, traveler's checks). M2 includes all of M1 plus less liquid assets ('near monies') like savings deposits, small CDs, and money market mutual funds, which serve more as a store of value but can be easily converted."
  },
  {
    "id": 41,
    "subject": "ap_macroeconomics",
    "unit": 4,
    "lessonIDS": ["4.4"],
    "unitName": "Financial Sector",
    "question": "Suppose the required reserve ratio is 10%. If Sarah deposits $1,000 cash into her checking account at First Bank, what is the maximum possible increase in the total money supply from this single deposit?",
    "image": null,
    "options": [
      "$100",
      "$900",
      "$1,000",
      "$9,000",
      "$10,000"
    ],
    "correctAnswer": "D",
    "explanation": "When cash held by the public ($1000) is deposited, it becomes reserves. The bank must hold 10% ($100) but can lend out 90% ($900). This $900 initiates the money multiplier process. The simple money multiplier is 1 / RRR = 1 / 0.10 = 10. The maximum potential *increase* in checkable deposits is Initial Excess Reserves * Multiplier = $900 * 10 = $9,000. Since the initial $1000 cash was already part of M1 (currency), depositing it doesn't change M1 initially, but the subsequent lending *does*. The $9,000 represents the new checkable deposits created through lending."
  },
  {
    "id": 42,
    "subject": "ap_macroeconomics",
    "unit": 4,
    "lessonIDS": ["4.4"],
    "unitName": "Financial Sector",
    "question": "Assume the required reserve ratio is 20%. If the central bank buys $50 million worth of government bonds from the public, what is the maximum possible change in the money supply?",
    "image": null,
    "options": [
      "Increase by $10 million",
      "Increase by $50 million",
      "Increase by $200 million",
      "Increase by $250 million",
      "Decrease by $50 million"
    ],
    "correctAnswer": "D",
    "explanation": "When the central bank buys bonds from the public, the payment injects new reserves into the banking system. The money multiplier is 1 / RRR = 1 / 0.20 = 5. The maximum potential change in the money supply (specifically checkable deposits) is the change in reserves times the multiplier: $50 million * 5 = $250 million increase."
  },
  {
    "id": 43,
    "subject": "ap_macroeconomics",
    "unit": 4,
    "lessonIDS": ["4.4"],
    "unitName": "Financial Sector",
    "question": "The actual expansion of the money supply following a new deposit or open market operation is often less than the maximum potential expansion primarily because:",
    "image": null,
    "options": [
      "The required reserve ratio is too high.",
      "Banks may choose to hold excess reserves.",
      "The central bank frequently changes the discount rate.",
      "People prefer holding stocks to holding cash.",
      "The government increases taxes."
    ],
    "correctAnswer": "B",
    "explanation": "The simple money multiplier assumes banks lend out all excess reserves and that all loaned money is redeposited into the banking system. In reality, banks may hold excess reserves (not lend everything out) and individuals/firms may hold onto some cash (currency drain), both reducing the actual multiplier effect."
  },
  {
    "id": 44,
    "subject": "ap_macroeconomics",
    "unit": 4,
    "lessonIDS": ["4.5"],
    "unitName": "Financial Sector",
    "question": "If the overall price level in the economy increases, what is the likely short-run impact on the money demand curve and the nominal interest rate, ceteris paribus?",
    "image": null,
    "options": [
      "Money demand shifts left, nominal interest rate decreases.",
      "Money demand shifts right, nominal interest rate increases.",
      "Money demand shifts right, nominal interest rate decreases.",
      "Money demand shifts left, nominal interest rate increases.",
      "Money supply shifts right, nominal interest rate decreases."
    ],
    "correctAnswer": "B",
    "explanation": "A higher price level increases the amount of money needed for transactions (transactions demand for money). This shifts the money demand curve to the right. Assuming the money supply is held constant by the central bank, this increase in demand leads to a higher equilibrium nominal interest rate."
  },
  {
    "id": 45,
    "subject": "ap_macroeconomics",
    "unit": 4,
    "lessonIDS": ["4.5", "4.6"],
    "unitName": "Financial Sector",
    "question": "If the central bank conducts an open market sale of government bonds (in a traditional, limited reserves system), what is the expected impact on the money supply and the nominal interest rate?",
    "image": null,
    "options": [
      "Money supply increases, nominal interest rate decreases.",
      "Money supply decreases, nominal interest rate increases.",
      "Money supply increases, nominal interest rate increases.",
      "Money supply decreases, nominal interest rate decreases.",
      "No change in money supply, nominal interest rate increases."
    ],
    "correctAnswer": "B",
    "explanation": "Selling bonds removes reserves from the banking system as banks/public pay the central bank. This leads to a decrease in the money supply (shifts MS left in the traditional model). With less money available relative to demand, the price of holding money (the nominal interest rate) increases."
  },
  {
    "id": 46,
    "subject": "ap_macroeconomics",
    "unit": 4,
    "lessonIDS": ["4.6", "3.8"],
    "unitName": "Financial Sector",
    "question": "Country X is experiencing a significant recessionary gap. If its central bank operates under an ample reserves system, which monetary policy action would be most appropriate to stimulate the economy?",
    "image": null,
    "options": [
      "Increasing the required reserve ratio.",
      "Selling government securities in the open market.",
      "Increasing the interest rate paid on reserve balances (IORB).",
      "Decreasing the administered interest rates, such as the discount rate or IORB.",
      "Increasing income taxes."
    ],
    "correctAnswer": "D",
    "explanation": "In an ample reserves system, the central bank influences the federal funds rate (and other short-term rates) primarily by adjusting administered rates. To stimulate the economy (address a recession), the central bank would lower these rates (like IORB, discount rate, ON RRP rate) to encourage borrowing and spending, shifting AD right. Selling securities (B) or increasing IORB (C) are contractionary. Increasing RRR (A) is largely irrelevant in ample reserves. Increasing taxes (E) is contractionary fiscal policy."
  },
  {
    "id": 47,
    "subject": "ap_macroeconomics",
    "unit": 4,
    "lessonIDS": ["4.6"],
    "unitName": "Financial Sector",
    "question": "If a central bank operating in an ample reserves framework observes rising inflation well above its target, which policy action is most suitable?",
    "image": null,
    "options": [
      "Lowering the interest on reserve balances (IORB) rate.",
      "Conducting large-scale open market purchases.",
      "Raising the overnight reverse repurchase agreement (ON RRP) rate.",
      "Decreasing the discount rate.",
      "Decreasing the required reserve ratio."
    ],
    "correctAnswer": "C",
    "explanation": "To combat inflation in an ample reserves system, the central bank needs to raise interest rates to dampen aggregate demand. It achieves this by increasing its administered rates. Raising the ON RRP rate sets a higher floor for the federal funds rate, making borrowing more expensive. Lowering IORB (A) or the discount rate (D) would be expansionary. OMO purchases (B) add reserves, potentially loosening conditions. RRR (E) is not the primary tool."
  },
  {
    "id": 48,
    "subject": "ap_macroeconomics",
    "unit": 4,
    "lessonIDS": ["4.6"],
    "unitName": "Financial Sector",
    "question": "In an ample reserves system, how does the central bank typically use the overnight reverse repurchase agreement (ON RRP) facility rate?",
    "image": null,
    "options": [
      "To directly control the M2 money supply.",
      "To set a ceiling on the federal funds rate.",
      "To act as a floor for the federal funds rate, influencing short-term market rates.",
      "To determine the required reserve ratio for banks.",
      "To finance government budget deficits."
    ],
    "correctAnswer": "C",
    "explanation": "The ON RRP rate is offered to certain non-bank financial institutions. Since they can always earn this rate from the central bank risk-free overnight, they are unlikely to lend funds in the market (like the federal funds market) for less. This helps establish a floor under the policy rate (the federal funds rate)."
  },
  {
    "id": 49,
    "subject": "ap_macroeconomics",
    "unit": 4,
    "lessonIDS": ["4.7", "5.5"],
    "unitName": "Financial Sector",
    "question": "If the government significantly increases its borrowing to finance large budget deficits, what is the likely impact in the loanable funds market?",
    "image": null,
    "options": [
      "Demand for loanable funds decreases, real interest rate decreases.",
      "Supply of loanable funds increases, real interest rate decreases.",
      "Demand for loanable funds increases, real interest rate increases.",
      "Supply of loanable funds decreases, real interest rate increases.",
      "Demand and supply of loanable funds both increase, real interest rate remains unchanged."
    ],
    "correctAnswer": "C",
    "explanation": "Government borrowing adds to the overall demand for loanable funds. This shifts the demand curve for loanable funds to the right. Assuming the supply curve remains unchanged or shifts less, the equilibrium real interest rate will increase. This can lead to crowding out of private investment."
  },
  {
    "id": 50,
    "subject": "ap_macroeconomics",
    "unit": 4,
    "lessonIDS": ["4.7"],
    "unitName": "Financial Sector",
    "question": "A wave of optimism sweeps through the business community, leading firms to expect higher future profits from new projects. How would this likely affect the loanable funds market?",
    "image": null,
    "options": [
      "Decrease the demand for loanable funds, lowering the real interest rate.",
      "Increase the demand for loanable funds, raising the real interest rate.",
      "Decrease the supply of loanable funds, raising the real interest rate.",
      "Increase the supply of loanable funds, lowering the real interest rate.",
      "Increase the supply and decrease the demand for loanable funds."
    ],
    "correctAnswer": "B",
    "explanation": "Increased business optimism about future profits makes firms more willing to undertake investment projects. To finance these projects, they increase their borrowing, which shifts the demand curve for loanable funds to the right. This leads to a higher equilibrium real interest rate, ceteris paribus."
  },

  // Unit 5: Long-Run Consequences of Stabilization Policies
  {
    "id": 51,
    "subject": "ap_macroeconomics",
    "unit": 5,
    "lessonIDS": ["5.1"],
    "unitName": "Long-Run Consequences of Stabilization Policies",
    "question": "Suppose an economy is in a recession. Policymakers implement expansionary fiscal policy (e.g., increased government spending) while the central bank simultaneously implements contractionary monetary policy (e.g., raising administered rates). What is the most likely combined effect on real output and real interest rates in the short run?",
    "image": null,
    "options": [
      "Real output increases, Real interest rates decrease",
      "Real output decreases, Real interest rates increase",
      "Real output effect is indeterminate, Real interest rates increase",
      "Real output increases, Real interest rate effect is indeterminate",
      "Real output decreases, Real interest rate effect is indeterminate"
    ],
    "correctAnswer": "C",
    "explanation": "Expansionary fiscal policy increases AD, pushing output up. Contractionary monetary policy decreases AD (or slows its growth), pushing output down. The net effect on output is indeterminate. Both policies tend to increase real interest rates: fiscal policy increases demand for loanable funds, and monetary policy increases the cost of borrowing."
  },
  {
    "id": 52,
    "subject": "ap_macroeconomics",
    "unit": 5,
    "lessonIDS": ["5.1"],
    "unitName": "Long-Run Consequences of Stabilization Policies",
    "question": "To combat high inflation, a country enacts contractionary fiscal policy (e.g., tax increases) and contractionary monetary policy (e.g., selling bonds/raising administered rates). What is the most likely short-run impact on real output and the price level?",
    "image": null,
    "options": [
      "Real output increases, Price level decreases",
      "Real output decreases, Price level increases",
      "Real output effect is indeterminate, Price level decreases",
      "Real output decreases, Price level decreases",
      "Real output increases, Price level effect is indeterminate"
    ],
    "correctAnswer": "D",
    "explanation": "Both contractionary fiscal and monetary policies aim to decrease aggregate demand (AD). A decrease in AD leads to lower real output and a lower price level in the short run."
  },
  {
    "id": 53,
    "subject": "ap_macroeconomics",
    "unit": 5,
    "lessonIDS": ["5.1", "5.5"],
    "unitName": "Long-Run Consequences of Stabilization Policies",
    "question": "If the government pursues expansionary fiscal policy while the central bank holds the money supply constant (or uses limited reserves tools), what is the likely impact on real interest rates and private investment?",
    "image": null,
    "options": [
      "Real interest rates decrease, Private investment increases",
      "Real interest rates increase, Private investment decreases",
      "Real interest rates decrease, Private investment decreases",
      "Real interest rates increase, Private investment increases",
      "No change in real interest rates or private investment"
    ],
    "correctAnswer": "B",
    "explanation": "Expansionary fiscal policy (increased borrowing) increases the demand for loanable funds, raising the real interest rate. A higher real interest rate makes borrowing more expensive for firms, leading to a decrease in private investment spending (crowding out)."
  },
  {
    "id": 54,
    "subject": "ap_macroeconomics",
    "unit": 5,
    "lessonIDS": ["5.1"],
    "unitName": "Long-Run Consequences of Stabilization Policies",
    "question": "Consider an economy operating below full employment. Policymakers pursue expansionary fiscal policy and expansionary monetary policy simultaneously. What is the most likely combined effect on real output and real interest rates in the short run?",
    "image": null,
    "options": [
      "Real output increases, Real interest rates decrease",
      "Real output decreases, Real interest rates increase",
      "Real output effect is indeterminate, Real interest rates decrease",
      "Real output increases, Real interest rate effect is indeterminate",
      "Real output decreases, Real interest rate effect is indeterminate"
    ],
    "correctAnswer": "D",
    "explanation": "Both expansionary policies increase aggregate demand, leading to an increase in real output. However, expansionary fiscal policy tends to increase real interest rates (more government borrowing), while expansionary monetary policy tends to decrease interest rates (easier credit). The net effect on real interest rates is indeterminate."
  },
  {
    "id": 55,
    "subject": "ap_macroeconomics",
    "unit": 5,
    "lessonIDS": ["5.2"],
    "unitName": "Long-Run Consequences of Stabilization Policies",
    "question": "An increase in aggregate demand that causes inflation will, in the short run, lead to which of the following on a standard Phillips curve diagram?",
    "image": null,
    "options": [
      "A movement upwards along the short-run Phillips curve (SRPC)",
      "A movement downwards along the short-run Phillips curve (SRPC)",
      "A rightward shift of the short-run Phillips curve (SRPC)",
      "A leftward shift of the short-run Phillips curve (SRPC)",
      "A rightward shift of the long-run Phillips curve (LRPC)"
    ],
    "correctAnswer": "A",
    "explanation": "The SRPC shows an inverse relationship between inflation and unemployment. An increase in AD leads to higher output (lower unemployment) and a higher price level (higher inflation). This corresponds to a movement up and to the left along a stable SRPC."
  },
  {
    "id": 56,
    "subject": "ap_macroeconomics",
    "unit": 5,
    "lessonIDS": ["5.2"],
    "unitName": "Long-Run Consequences of Stabilization Policies",
    "question": "If workers and firms come to expect a higher rate of inflation, how will this affect the Phillips curve diagram?",
    "image": null,
    "options": [
      "Movement downwards along the SRPC",
      "Movement upwards along the SRPC",
      "The SRPC will shift upwards/rightwards",
      "The SRPC will shift downwards/leftwards",
      "The LRPC will shift leftwards"
    ],
    "correctAnswer": "C",
    "explanation": "Higher expected inflation gets built into wage negotiations and price setting. This means that for any given unemployment rate, the actual inflation rate will be higher. This is represented by an upward (or rightward) shift of the SRPC."
  },
  {
    "id": 57,
    "subject": "ap_macroeconomics",
    "unit": 5,
    "lessonIDS": ["5.2"],
    "unitName": "Long-Run Consequences of Stabilization Policies",
    "question": "The long-run Phillips curve (LRPC) is vertical at the natural rate of unemployment because:",
    "image": null,
    "options": [
      "The unemployment rate never changes in the long run.",
      "In the long run, there is no trade-off between inflation and unemployment.",
      "Fiscal policy becomes ineffective in the long run.",
      "Monetary policy only affects inflation in the long run.",
      "Potential GDP always grows faster than inflation."
    ],
    "correctAnswer": "B",
    "explanation": "In the long run, the economy operates at its potential output, corresponding to the natural rate of unemployment, regardless of the rate of inflation. Expected inflation fully adjusts to actual inflation, meaning any attempt to hold unemployment below the natural rate through demand stimulus will only lead to accelerating inflation, not permanently lower unemployment."
  },
  {
    "id": 58,
    "subject": "ap_macroeconomics",
    "unit": 5,
    "lessonIDS": ["5.2", "3.3"],
    "unitName": "Long-Run Consequences of Stabilization Policies",
    "question": "A sudden, sharp increase in energy prices (an adverse supply shock) would likely cause which shift in the Phillips curve analysis?",
    "image": null,
    "options": [
      "Movement down along the SRPC",
      "Shift the SRPC upward/rightward",
      "Shift the SRPC downward/leftward",
      "Shift the LRPC rightward",
      "Shift the LRPC leftward"
    ],
    "correctAnswer": "B",
    "explanation": "An adverse supply shock (like rising oil prices) shifts the Short-Run Aggregate Supply (SRAS) curve leftward. This leads to stagflation: higher inflation and higher unemployment simultaneously. On the Phillips curve diagram, this is represented by an upward/rightward shift of the SRPC, indicating a worse trade-off (or combination) of inflation and unemployment."
  },
  {
    "id": 59,
    "subject": "ap_macroeconomics",
    "unit": 5,
    "lessonIDS": ["5.3"],
    "unitName": "Long-Run Consequences of Stabilization Policies",
    "question": "According to the quantity theory of money, if the money supply (M) is $2,000 billion, the velocity of money (V) is 4, and real GDP (Y) is $4,000 billion, what is the aggregate price level (P)?",
    "image": null,
    "options": [
      "0.5",
      "1.0",
      "2.0",
      "4.0",
      "8.0"
    ],
    "correctAnswer": "C",
    "explanation": "The quantity theory equation is M * V = P * Y. Plugging in the values: $2,000 * 4 = P * $4,000. This simplifies to $8,000 = P * $4,000. Solving for P: P = $8,000 / $4,000 = 2.0."
  },
  {
    "id": 60,
    "subject": "ap_macroeconomics",
    "unit": 5,
    "lessonIDS": ["5.3"],
    "unitName": "Long-Run Consequences of Stabilization Policies",
    "question": "Assuming the velocity of money and real GDP are constant, the quantity theory of money suggests that a 10% increase in the money supply will lead to:",
    "image": null,
    "options": [
      "A 10% decrease in the price level.",
      "No change in the price level.",
      "A 10% increase in the price level.",
      "A 10% increase in real GDP.",
      "A 10% decrease in the velocity of money."
    ],
    "correctAnswer": "C",
    "explanation": "The equation is M * V = P * Y. If V and Y are constant, then any percentage change in M must be matched by an equal percentage change in P to keep the equation balanced. Therefore, a 10% increase in M leads to a 10% increase in P (inflation)."
  },
  {
    "id": 61,
    "subject": "ap_macroeconomics",
    "unit": 5,
    "lessonIDS": ["5.3"],
    "unitName": "Long-Run Consequences of Stabilization Policies",
    "question": "In the context of the quantity theory of money (MV=PY), the velocity of money (V) represents:",
    "image": null,
    "options": [
      "The speed at which the central bank prints money.",
      "The average number of times a unit of money is spent on final goods and services in a year.",
      "The required reserve ratio set by the central bank.",
      "The rate of growth of real GDP.",
      "The sensitivity of investment spending to interest rates."
    ],
    "correctAnswer": "B",
    "explanation": "Velocity (V) measures how quickly money circulates through the economy in the purchase of final goods and services (nominal GDP, P*Y). A higher velocity means each dollar is used more frequently in transactions during a given period."
  },
  {
    "id": 62,
    "subject": "ap_macroeconomics",
    "unit": 5,
    "lessonIDS": ["5.4"],
    "unitName": "Long-Run Consequences of Stabilization Policies",
    "question": "Which statement accurately describes the difference between the government budget deficit and the national debt?",
    "image": null,
    "options": [
      "The deficit is the total amount owed, while the debt is the annual shortfall.",
      "The debt is measured annually, while the deficit is a cumulative total.",
      "The deficit is the excess of government spending over tax revenue in a given year, while the debt is the accumulation of past deficits.",
      "The deficit includes state and local borrowing, while the debt only includes federal borrowing.",
      "The debt causes inflation, while the deficit causes unemployment."
    ],
    "correctAnswer": "C",
    "explanation": "The budget deficit is a flow variable, representing the shortfall between government outlays and revenues over a specific period (usually a fiscal year). The national debt is a stock variable, representing the total accumulated amount of money the government owes from all past borrowing (deficits minus any surpluses)."
  },
  {
    "id": 63,
    "subject": "ap_macroeconomics",
    "unit": 5,
    "lessonIDS": ["5.4", "5.5"],
    "unitName": "Long-Run Consequences of Stabilization Policies",
    "question": "A potential long-run concern associated with persistent, large government budget deficits is that they can lead to:",
    "image": null,
    "options": [
      "Lower real interest rates and increased private investment.",
      "A decrease in the national debt.",
      "Higher real interest rates and the crowding out of private investment.",
      "An appreciation of the domestic currency, boosting net exports.",
      "A decrease in the demand for loanable funds."
    ],
    "correctAnswer": "C",
    "explanation": "Persistent large deficits require significant government borrowing, increasing the demand for loanable funds. This drives up real interest rates, making it more expensive for private firms to borrow and invest, potentially slowing down capital accumulation and long-run economic growth (crowding out)."
  },
  {
    "id": 64,
    "subject": "ap_macroeconomics",
    "unit": 5,
    "lessonIDS": ["5.5"],
    "unitName": "Long-Run Consequences of Stabilization Policies",
    "question": "The 'crowding out' effect refers to the negative impact of:",
    "image": null,
    "options": [
      "Expansionary monetary policy on net exports.",
      "Increased government spending on the money supply.",
      "Government budget deficits on private investment spending.",
      "Inflation expectations on the short-run Phillips curve.",
      "Imports on domestic production."
    ],
    "correctAnswer": "C",
    "explanation": "Crowding out describes the situation where increased government borrowing (to finance deficits) drives up real interest rates, which in turn reduces (crowds out) private investment spending that would have otherwise occurred."
  },
  {
    "id": 65,
    "subject": "ap_macroeconomics",
    "unit": 5,
    "lessonIDS": ["5.5", "5.6"],
    "unitName": "Long-Run Consequences of Stabilization Policies",
    "question": "How does the crowding out effect potentially impact long-run economic growth?",
    "image": null,
    "options": [
      "It increases long-run growth by stimulating aggregate demand.",
      "It decreases long-run growth by reducing private capital formation.",
      "It has no impact on long-run growth, only short-run fluctuations.",
      "It increases long-run growth by lowering inflation.",
      "It decreases long-run growth by increasing the money supply."
    ],
    "correctAnswer": "B",
    "explanation": "Long-run economic growth depends heavily on factors like capital accumulation, technological progress, and human capital. By reducing private investment (capital formation), crowding out can lead to a smaller capital stock in the future, thereby hindering the economy's long-run growth potential (slowing the outward shift of LRAS/PPC)."
  },
  {
    "id": 66,
    "subject": "ap_macroeconomics",
    "unit": 5,
    "lessonIDS": ["5.6"],
    "unitName": "Long-Run Consequences of Stabilization Policies",
    "question": "Which of the following factors would most likely lead to an increase in long-run economic growth?",
    "image": null,
    "options": [
      "A persistent increase in government transfer payments.",
      "A sustained increase in the aggregate price level.",
      "An increase in tariffs on imported capital goods.",
      "Significant advancements in technology and increased labor productivity.",
      "A decrease in the national saving rate."
    ],
    "correctAnswer": "D",
    "explanation": "Long-run economic growth is represented by an outward shift of the LRAS curve and the Production Possibilities Curve. This is driven by increases in the quantity or quality of resources (labor, capital, natural resources) or improvements in technology, which enhance labor productivity."
  },
  {
    "id": 67,
    "subject": "ap_macroeconomics",
    "unit": 5,
    "lessonIDS": ["5.7", "3.8"],
    "unitName": "Long-Run Consequences of Stabilization Policies",
    "question": "Supply-side fiscal policies, such as targeted tax cuts on business investment or research and development, are primarily intended to:",
    "image": null,
    "options": [
      "Increase aggregate demand in the short run.",
      "Decrease short-run aggregate supply.",
      "Increase long-run aggregate supply and promote economic growth.",
      "Reduce the national debt.",
      "Stabilize the short-run Phillips curve."
    ],
    "correctAnswer": "C",
    "explanation": "While potentially having short-run demand effects, the main goal of supply-side fiscal policies is to encourage investment, innovation, and productivity improvements. These actions aim to increase the economy's productive capacity, shifting the long-run aggregate supply (LRAS) curve to the right and fostering long-term economic growth."
  },

  // Unit 6: Open Economy - International Trade and Finance
  {
    "id": 68,
    "subject": "ap_macroeconomics",
    "unit": 6,
    "lessonIDS": ["6.1"],
    "unitName": "Open Economy - International Trade and Finance",
    "question": "Which of the following transactions would be recorded as a credit (+) in the U.S. Current Account?",
    "image": null,
    "options": [
      "A U.S. resident purchases a smartphone made in South Korea.",
      "A U.S. company pays dividends to a foreign shareholder.",
      "A French tourist spends money visiting national parks in the U.S.",
      "A U.S. investor buys bonds issued by the Japanese government.",
      "The U.S. government sends foreign aid to another country."
    ],
    "correctAnswer": "C",
    "explanation": "The Current Account records trade in goods and services, investment income, and net transfers. Spending by foreign tourists in the U.S. represents an export of services for the U.S., which is a credit (inflow of funds) in the Current Account. A is an import (debit), B is investment income paid out (debit), D is a financial account outflow (debit), E is a transfer payment out (debit)."
  },
  {
    "id": 69,
    "subject": "ap_macroeconomics",
    "unit": 6,
    "lessonIDS": ["6.1"],
    "unitName": "Open Economy - International Trade and Finance",
    "question": "A U.S. based technology company builds a new factory in Ireland. How would this transaction be recorded in the U.S. balance of payments?",
    "image": null,
    "options": [
      "Credit (+) in the Current Account",
      "Debit (-) in the Current Account",
      "Credit (+) in the Financial Account",
      "Debit (-) in the Financial Account",
      "Credit (+) in the Capital Account (transfer)"
    ],
    "correctAnswer": "D",
    "explanation": "The Financial Account records transactions involving the purchase or sale of assets (like factories, stocks, bonds). When a U.S. company invests abroad (acquires a foreign asset - the factory), it represents an outflow of capital from the U.S., recorded as a debit (-) in the U.S. Financial Account (specifically under direct investment)."
  },
  {
    "id": 70,
    "subject": "ap_macroeconomics",
    "unit": 6,
    "lessonIDS": ["6.1"],
    "unitName": "Open Economy - International Trade and Finance",
    "question": "If a country has a current account deficit, which of the following must be true, assuming no statistical discrepancy?",
    "image": null,
    "options": [
      "It must also have a financial account deficit.",
      "It must have a financial account surplus.",
      "It must be exporting more goods than it imports.",
      "It must be experiencing currency appreciation.",
      "Its net investment income must be positive."
    ],
    "correctAnswer": "B",
    "explanation": "The balance of payments must sum to zero (Current Account + Financial Account + Capital Account = 0). Ignoring the typically small Capital Account, this means Current Account + Financial Account ≈ 0. Therefore, if the Current Account is in deficit (negative), the Financial Account must be in surplus (positive), indicating a net inflow of capital/funds from abroad."
  },
  {
    "id": 71,
    "subject": "ap_macroeconomics",
    "unit": 6,
    "lessonIDS": ["6.2"],
    "unitName": "Open Economy - International Trade and Finance",
    "question": "Suppose the exchange rate between the U.S. Dollar (USD) and the Thai Baht (THB) is $1 = 35 THB. A handmade scarf costs 700 THB in Bangkok. How much would the scarf cost in U.S. dollars?",
    "image": null,
    "options": [
      "$10",
      "$20",
      "$35",
      "$70",
      "$24,500"
    ],
    "correctAnswer": "B",
    "explanation": "To find the cost in USD, divide the price in THB by the exchange rate (THB per USD): Cost in USD = Cost in THB / (THB/USD) = 700 THB / (35 THB/$1) = $20."
  },
  {
    "id": 72,
    "subject": "ap_macroeconomics",
    "unit": 6,
    "lessonIDS": ["6.2"],
    "unitName": "Open Economy - International Trade and Finance",
    "question": "If the exchange rate changes from €1 = $1.10 to €1 = $1.20, which of the following has occurred?",
    "image": null,
    "options": [
      "The Euro has depreciated against the Dollar.",
      "The Dollar has appreciated against the Euro.",
      "The Euro has appreciated against the Dollar.",
      "Both currencies have depreciated.",
      "The exchange rate has become fixed."
    ],
    "correctAnswer": "C",
    "explanation": "Since one Euro (€) can now buy more U.S. Dollars ($1.20 compared to $1.10), the Euro has become stronger or appreciated relative to the Dollar. Conversely, the Dollar has depreciated relative to the Euro (it now takes more dollars to buy one euro)."
  },
  {
    "id": 73,
    "subject": "ap_macroeconomics",
    "unit": 6,
    "lessonIDS": ["6.3"],
    "unitName": "Open Economy - International Trade and Finance",
    "question": "Assume the market for the British Pound (£) is in equilibrium. If consumer tastes in the United States shift strongly in favor of British goods and services, what will happen in the foreign exchange market for pounds?",
    "image": null,
    "options": [
      "The demand for pounds will decrease, causing the pound to depreciate.",
      "The supply of pounds will increase, causing the pound to depreciate.",
      "The demand for pounds will increase, causing the pound to appreciate.",
      "The supply of pounds will decrease, causing the pound to appreciate.",
      "Both demand and supply of pounds will decrease."
    ],
    "correctAnswer": "C",
    "explanation": "U.S. consumers wanting more British goods need pounds to buy them. This increases the demand for pounds in the foreign exchange market. An increase in demand, ceteris paribus, leads to an increase in the price of the pound (appreciation)."
  },
  {
    "id": 74,
    "subject": "ap_macroeconomics",
    "unit": 6,
    "lessonIDS": ["6.3"],
    "unitName": "Open Economy - International Trade and Finance",
    "question": "If real income in the United States increases significantly while real income in Japan remains stable, what is the likely impact on the supply of U.S. dollars in the foreign exchange market and the value of the dollar relative to the Japanese Yen (¥)?",
    "image": null,
    "options": [
      "Supply of dollars decreases; Dollar appreciates",
      "Supply of dollars increases; Dollar depreciates",
      "Supply of dollars increases; Dollar appreciates",
      "Supply of dollars decreases; Dollar depreciates",
      "Demand for dollars increases; Dollar appreciates"
    ],
    "correctAnswer": "B",
    "explanation": "Higher real income in the U.S. leads to increased demand for all goods, including imports from Japan. To buy Japanese goods, U.S. residents need to supply dollars to the foreign exchange market to obtain yen. This increases the supply of dollars, which, ceteris paribus, causes the dollar to depreciate relative to the yen."
  },
  {
    "id": 75,
    "subject": "ap_macroeconomics",
    "unit": 6,
    "lessonIDS": ["6.3", "6.4"],
    "unitName": "Open Economy - International Trade and Finance",
    "question": "Suppose the foreign exchange market for the Mexican Peso (MXN) experiences a simultaneous increase in demand and decrease in supply. What is the definitive impact on the value of the Peso?",
    "image": null,
    "options": [
      "The Peso will depreciate.",
      "The Peso will appreciate.",
      "The value of the Peso will remain unchanged.",
      "The impact on the Peso's value is indeterminate.",
      "The quantity traded will decrease."
    ],
    "correctAnswer": "B",
    "explanation": "An increase in demand for the Peso pushes its value up. A decrease in the supply of the Peso also pushes its value up (makes it scarcer). Since both shifts exert upward pressure on the price (value) of the Peso, the Peso will definitively appreciate. The effect on the equilibrium quantity traded is indeterminate."
  },
  {
    "id": 76,
    "subject": "ap_macroeconomics",
    "unit": 6,
    "lessonIDS": ["6.4", "6.6", "4.6"],
    "unitName": "Open Economy - International Trade and Finance",
    "question": "If the U.S. Federal Reserve pursues expansionary monetary policy, leading to lower real interest rates in the U.S. compared to other countries, what is the likely impact on international capital flows and the value of the U.S. dollar?",
    "image": null,
    "options": [
      "Capital inflows increase; Dollar appreciates",
      "Capital outflows increase; Dollar depreciates",
      "Capital inflows decrease; Dollar appreciates",
      "Capital outflows decrease; Dollar depreciates",
      "No significant impact on capital flows or the dollar"
    ],
    "correctAnswer": "B",
    "explanation": "Lower real interest rates in the U.S. make U.S. assets less attractive to foreign investors (decreasing capital inflows) and make foreign assets more attractive to U.S. investors (increasing capital outflows). The net effect is increased capital outflow. This increases the supply of dollars (as U.S. investors sell dollars to buy foreign currency) and decreases the demand for dollars (as foreign investors demand fewer dollars), causing the dollar to depreciate."
  },
  {
    "id": 77,
    "subject": "ap_macroeconomics",
    "unit": 6,
    "lessonIDS": ["6.4", "6.6", "3.8"],
    "unitName": "Open Economy - International Trade and Finance",
    "question": "Suppose the Canadian government implements significant contractionary fiscal policy, leading to lower real interest rates and slower economic growth in Canada. What is the likely effect on financial capital flows and the value of the Canadian Dollar (CAD)?",
    "image": null,
    "options": [
      "Net capital inflow; CAD appreciates",
      "Net capital outflow; CAD depreciates",
      "Net capital inflow; CAD depreciates",
      "Net capital outflow; CAD appreciates",
      "Indeterminate effect on capital flows and CAD value"
    ],
    "correctAnswer": "B",
    "explanation": "Contractionary fiscal policy (less government borrowing) tends to lower real interest rates, making Canadian assets less attractive (net capital outflow). Slower economic growth might also reduce investment opportunities, further encouraging outflow. Increased capital outflow leads to an increased supply of CAD and decreased demand for CAD, causing the Canadian Dollar to depreciate."
  },
  {
    "id": 78,
    "subject": "ap_macroeconomics",
    "unit": 6,
    "lessonIDS": ["6.4"],
    "unitName": "Open Economy - International Trade and Finance",
    "question": "If the inflation rate in Country A is persistently higher than the inflation rate in Country B, what is likely to happen to the exchange rate between their currencies, according to purchasing power parity concepts?",
    "image": null,
    "options": [
      "Country A's currency will appreciate relative to Country B's currency.",
      "Country B's currency will depreciate relative to Country A's currency.",
      "Country A's currency will depreciate relative to Country B's currency.",
      "The exchange rate will remain fixed.",
      "Both currencies will appreciate against gold."
    ],
    "correctAnswer": "C",
    "explanation": "Higher inflation in Country A means its goods are becoming relatively more expensive. This reduces foreign demand for Country A's goods (reducing demand for its currency) and increases Country A's demand for relatively cheaper goods from Country B (increasing supply of its currency). Both effects cause Country A's currency to depreciate relative to Country B's currency."
  },
  {
    "id": 79,
    "subject": "ap_macroeconomics",
    "unit": 6,
    "lessonIDS": ["6.5"],
    "unitName": "Open Economy - International Trade and Finance",
    "question": "If the U.S. dollar significantly appreciates against the Euro, what is the most likely impact on U.S. net exports?",
    "image": null,
    "options": [
      "U.S. net exports will increase.",
      "U.S. net exports will decrease.",
      "U.S. net exports will remain unchanged.",
      "U.S. exports will increase, and imports will decrease.",
      "Both U.S. exports and imports will increase."
    ],
    "correctAnswer": "B",
    "explanation": "An appreciation of the dollar makes U.S. goods more expensive for Europeans (decreasing U.S. exports) and makes European goods cheaper for Americans (increasing U.S. imports). Since Net Exports = Exports - Imports, the decrease in exports and increase in imports leads to a decrease in U.S. net exports."
  },
  {
    "id": 80,
    "subject": "ap_macroeconomics",
    "unit": 6,
    "lessonIDS": ["6.5"],
    "unitName": "Open Economy - International Trade and Finance",
    "question": "Suppose the Japanese Yen depreciates significantly relative to the currencies of its major trading partners. How will this likely affect Japan's exports and imports?",
    "image": null,
    "options": [
      "Exports decrease, Imports increase",
      "Exports increase, Imports decrease",
      "Exports decrease, Imports decrease",
      "Exports increase, Imports increase",
      "No change in exports or imports"
    ],
    "correctAnswer": "B",
    "explanation": "A depreciation of the Yen makes Japanese goods cheaper for foreigners, leading to an increase in Japan's exports. It also makes foreign goods more expensive for Japanese residents, leading to a decrease in Japan's imports. This combination tends to increase Japan's net exports."
  },
  {
    "id": 81,
    "subject": "ap_macroeconomics",
    "unit": 6,
    "lessonIDS": ["6.6"],
    "unitName": "Open Economy - International Trade and Finance",
    "question": "An increase in the real interest rates in the United States, relative to the rest of the world, would most likely lead to:",
    "image": null,
    "options": [
      "An increase in U.S. net capital outflow.",
      "A decrease in foreign demand for U.S. financial assets.",
      "An increase in U.S. net capital inflow.",
      "A depreciation of the U.S. dollar.",
      "A decrease in the U.S. financial account surplus."
    ],
    "correctAnswer": "C",
    "explanation": "Higher real returns on U.S. financial assets make them more attractive to both foreign and domestic investors. This encourages foreigners to invest more in the U.S. (increased capital inflow) and discourages U.S. residents from investing abroad (decreased capital outflow). The net result is an increase in net capital inflow (a larger financial account surplus or smaller deficit)."
  },
  {
    "id": 82,
    "subject": "ap_macroeconomics",
    "unit": 6,
    "lessonIDS": ["6.6", "6.1"],
    "unitName": "Open Economy - International Trade and Finance",
    "question": "A significant net inflow of financial capital into a country corresponds directly to which of the following in its balance of payments?",
    "image": null,
    "options": [
      "A surplus in the current account.",
      "A deficit in the current account.",
      "A surplus in the financial account.",
      "A deficit in the financial account.",
      "An increase in net exports."
    ],
    "correctAnswer": "C",
    "explanation": "Net capital inflow means that foreigners are purchasing more of the country's assets than residents are purchasing of foreign assets. This inflow of funds is recorded as a credit (+) balance, or a surplus, in the financial account."
  },

  // --- AP Microeconomics Questions ---

  // Unit 2: Supply and Demand
  {
    "id": 83,
    "subject": "ap_microeconomics",
    "unit": 2,
    "lessonIDS": ["2.2"],
    "unitName": "Supply and Demand",
    "question": "Which of the following would cause an increase in the supply of gasoline?",
    "image": null,
    "options": [
      "An increase in the price of crude oil",
      "A decrease in the number of sellers of gasoline",
      "An improvement in the technology used to refine gasoline",
      "An expectation by sellers that gasoline prices will be higher in the future",
      "An increase in the tax on gasoline"
    ],
    "correctAnswer": "C",
    "explanation": "An improvement in technology lowers production costs, making sellers willing to supply more at each price, thus increasing supply (shifting the supply curve right)."
  },
  {
    "id": 84,
    "subject": "ap_microeconomics",
    "unit": 2,
    "lessonIDS": ["2.3"],
    "unitName": "Supply and Demand",
    "question": "If the price of a good decreases and total revenue increases, the demand for the good is:",
    "image": null,
    "options": [
      "elastic",
      "inelastic",
      "unit elastic",
      "perfectly elastic",
      "perfectly inelastic"
    ],
    "correctAnswer": "A",
    "explanation": "When demand is elastic (PED > 1), a decrease in price leads to a proportionally larger increase in quantity demanded, causing total revenue (P x Q) to increase."
  },
  {
    "id": 85,
    "subject": "ap_microeconomics",
    "unit": 2,
    "lessonIDS": ["2.8"],
    "unitName": "Supply and Demand",
    "question": "Which of the following is true of a price ceiling that is set below the equilibrium price?",
    "image": null,
    "options": [
      "It will result in a surplus",
      "It will result in a shortage",
      "It will have no effect on the market",
      "It will increase producer surplus",
      "It will lead to a decrease in quantity demanded"
    ],
    "correctAnswer": "B",
    "explanation": "A price ceiling set below the equilibrium price is binding. At this lower price, quantity demanded exceeds quantity supplied, resulting in a shortage."
  },
  {
    "id": 86,
    "subject": "ap_microeconomics",
    "unit": 2,
    "lessonIDS": ["2.5"],
    "unitName": "Supply and Demand",
    "question": "The cross-price elasticity of demand between good X and good Y is -2. This indicates that good X and good Y are:",
    "image": null,
    "options": [
      "substitutes",
      "complements",
      "normal goods",
      "inferior goods",
      "unrelated goods"
    ],
    "correctAnswer": "B",
    "explanation": "A negative cross-price elasticity of demand means that as the price of one good increases, the quantity demanded of the other good decreases. This relationship defines complementary goods."
  },
  {
    "id": 87,
    "subject": "ap_microeconomics",
    "unit": 2,
    "lessonIDS": ["2.6"],
    "unitName": "Supply and Demand",
    "question": "Consumer surplus is best described as the:",
    "image": null,
    "options": [
      "difference between the price buyers pay and the price sellers receive",
      "total value of goods purchased by consumers",
      "difference between the maximum price buyers are willing to pay and the actual price",
      "sum of the individual surpluses of all producers in the market",
      "area above the supply curve and below the market price"
    ],
    "correctAnswer": "C",
    "explanation": "Consumer surplus represents the net benefit to buyers, calculated as the difference between their willingness to pay for a good and the price they actually pay."
  },
  {
    "id": 88,
    "subject": "ap_microeconomics",
    "unit": 2,
    "lessonIDS": ["2.8"],
    "unitName": "Supply and Demand",
    "question": "A tax on the sellers of a good will cause the:",
    "image": null,
    "options": [
      "demand curve to shift to the left",
      "demand curve to shift to the right",
      "supply curve to shift to the left",
      "supply curve to shift to the right",
      "equilibrium price to decrease"
    ],
    "correctAnswer": "C",
    "explanation": "A tax imposed on sellers increases their costs of production, leading to a decrease in supply, which is represented by a leftward shift of the supply curve."
  },
  {
    "id": 89,
    "subject": "ap_microeconomics",
    "unit": 2,
    "lessonIDS": ["2.1"],
    "unitName": "Supply and Demand",
    "question": "Which of the following would cause a decrease in the demand for coffee?",
    "image": null,
    "options": [
      "An increase in the price of tea, a substitute for coffee",
      "A decrease in the price of sugar, a complement to coffee",
      "An increase in consumer income, assuming coffee is a normal good",
      "A decrease in the expected future price of coffee",
      "An increase in the population"
    ],
    "correctAnswer": "D",
    "explanation": "If consumers expect the price of coffee to fall in the future, they will likely reduce their current demand, waiting to buy at the lower expected price."
  },
  {
    "id": 90,
    "subject": "ap_microeconomics",
    "unit": 2,
    "lessonIDS": ["2.4"],
    "unitName": "Supply and Demand",
    "question": "The price elasticity of supply measures how much:",
    "image": null,
    "options": [
      "the quantity demanded changes in response to a change in price",
      "the quantity supplied changes in response to a change in price",
      "the price changes in response to a change in demand",
      "the price changes in response to a change in supply",
      "the income of consumers changes in response to a change in price"
    ],
    "correctAnswer": "B",
    "explanation": "Price elasticity of supply measures the responsiveness of the quantity supplied of a good or service to a change in its price."
  },
  {
    "id": 91,
    "subject": "ap_microeconomics",
    "unit": 2,
    "lessonIDS": ["2.6", "2.7"],
    "unitName": "Supply and Demand",
    "question": "If a market is in equilibrium, which of the following is true?",
    "image": null,
    "options": [
      "There is no consumer surplus",
      "There is no producer surplus",
      "Quantity demanded equals quantity supplied",
      "Price is above the equilibrium price",
      "Quantity demanded is greater than quantity supplied"
    ],
    "correctAnswer": "C",
    "explanation": "Market equilibrium occurs at the price where the quantity consumers are willing and able to buy is exactly equal to the quantity producers are willing and able to sell."
  },
  {
    "id": 92,
    "subject": "ap_microeconomics",
    "unit": 2,
    "lessonIDS": ["2.8"],
    "unitName": "Supply and Demand",
    "question": "A binding price floor will lead to:",
    "image": null,
    "options": [
      "A shortage",
      "A surplus",
      "An increase in demand",
      "A decrease in supply",
      "Market equilibrium"
    ],
    "correctAnswer": "B",
    "explanation": "A binding price floor is set above the equilibrium price. At this higher price, quantity supplied exceeds quantity demanded, resulting in a surplus."
  },

  // Unit 3: Production, Cost, and the Perfect Competition Model
  {
    "id": 93,
    "subject": "ap_microeconomics",
    "unit": 3,
    "lessonIDS": ["3.1"],
    "unitName": "Production, Cost, and the Perfect Competition Model",
    "question": "The law of diminishing marginal product states that:",
    "image": null,
    "options": [
      "Total output decreases as more input is added",
      "Average product eventually decreases as more input is added",
      "Marginal product eventually decreases as more variable input is added to a fixed input",
      "Total cost eventually increases as output increases",
      "Marginal cost eventually decreases as output increases"
    ],
    "correctAnswer": "C",
    "explanation": "Diminishing marginal product occurs in the short run when adding successive units of a variable input (like labor) to a fixed input (like capital) results in smaller and smaller increases in total output. The marginal product of the variable input eventually declines."
  },
  {
    "id": 94,
    "subject": "ap_microeconomics",
    "unit": 3,
    "lessonIDS": ["3.2"],
    "unitName": "Production, Cost, and the Perfect Competition Model",
    "question": "Which statement accurately describes the relationship between marginal cost (MC) and average total cost (ATC)?",
    "image": null,
    "options": [
      "If MC > ATC, then ATC must be falling",
      "If MC < ATC, then ATC must be rising",
      "MC equals ATC when ATC is at its maximum",
      "MC intersects ATC at the minimum point of ATC",
      "ATC is always greater than MC"
    ],
    "correctAnswer": "D",
    "explanation": "The marginal cost curve intersects the average total cost curve at the lowest point of the ATC curve. When MC is below ATC, it pulls ATC down; when MC is above ATC, it pulls ATC up."
  },
  {
    "id": 95,
    "subject": "ap_microeconomics",
    "unit": 3,
    "lessonIDS": ["3.2"],
    "unitName": "Production, Cost, and the Perfect Competition Model",
    "question": "Marginal cost is defined as the change in:",
    "image": null,
    "options": [
      "Total revenue resulting from selling one more unit",
      "Total cost resulting from producing one more unit",
      "Average total cost resulting from producing one more unit",
      "Average variable cost resulting from producing one more unit",
      "Fixed cost resulting from producing one more unit"
    ],
    "correctAnswer": "B",
    "explanation": "Marginal cost (MC) is the additional cost incurred from producing one more unit of output. It is calculated as the change in total cost divided by the change in quantity (ΔTC / ΔQ)."
  },
  {
    "id": 96,
    "subject": "ap_microeconomics",
    "unit": 3,
    "lessonIDS": ["3.3"],
    "unitName": "Production, Cost, and the Perfect Competition Model",
    "question": "A firm experiences economies of scale when:",
    "image": null,
    "options": [
      "Its long-run average total cost decreases as output increases",
      "Its short-run average total cost decreases as output increases",
      "Its marginal cost is increasing",
      "Its total fixed costs are decreasing",
      "It doubles inputs and more than doubles output"
    ],
    "correctAnswer": "A",
    "explanation": "Economies of scale occur when a firm's long-run average total cost (LRATC) falls as it increases its scale of production. This is represented by the downward-sloping portion of the LRATC curve."
  },
  {
    "id": 97,
    "subject": "ap_microeconomics",
    "unit": 3,
    "lessonIDS": ["3.4"],
    "unitName": "Production, Cost, and the Perfect Competition Model",
    "question": "Economic profit differs from accounting profit because economic profit accounts for:",
    "image": null,
    "options": [
      "Only explicit costs",
      "Only implicit costs",
      "Both explicit and implicit costs",
      "Total revenue minus variable costs",
      "Fixed costs only"
    ],
    "correctAnswer": "C",
    "explanation": "Accounting profit subtracts only explicit (out-of-pocket) costs from total revenue. Economic profit subtracts both explicit costs and implicit costs (the opportunity costs of resources used) from total revenue."
  },
  {
    "id": 98,
    "subject": "ap_microeconomics",
    "unit": 3,
    "lessonIDS": ["3.5"],
    "unitName": "Production, Cost, and the Perfect Competition Model",
    "question": "A profit-maximizing firm in any market structure will produce the quantity of output where:",
    "image": null,
    "options": [
      "Marginal revenue equals average total cost",
      "Price equals marginal cost",
      "Marginal revenue equals marginal cost",
      "Total revenue is maximized",
      "Average total cost is minimized"
    ],
    "correctAnswer": "C",
    "explanation": "The fundamental rule for profit maximization is to produce up to the point where the revenue generated by the last unit sold (marginal revenue, MR) is equal to the cost of producing that last unit (marginal cost, MC)."
  },
  {
    "id": 99,
    "subject": "ap_microeconomics",
    "unit": 3,
    "lessonIDS": ["3.6"],
    "unitName": "Production, Cost, and the Perfect Competition Model",
    "question": "In the short run, a perfectly competitive firm should shut down and produce zero output if:",
    "image": null,
    "options": [
      "Price is less than average total cost",
      "Price is less than average variable cost",
      "Marginal revenue is less than marginal cost",
      "Economic profit is zero",
      "Accounting profit is negative"
    ],
    "correctAnswer": "B",
    "explanation": "The short-run shutdown rule states that a firm should cease production if the market price falls below its minimum average variable cost (P < min AVC). At such a price, the firm cannot even cover its variable costs per unit."
  },
  {
    "id": 100,
    "subject": "ap_microeconomics",
    "unit": 3,
    "lessonIDS": ["3.7"],
    "unitName": "Production, Cost, and the Perfect Competition Model",
    "question": "Which of the following is NOT a characteristic of a perfectly competitive market?",
    "image": null,
    "options": [
      "A large number of buyers and sellers",
      "Firms sell differentiated products",
      "Free entry and exit for firms",
      "Firms are price takers",
      "Perfect information for buyers and sellers"
    ],
    "correctAnswer": "B",
    "explanation": "Perfectly competitive markets are characterized by firms selling identical (homogeneous) products. Product differentiation is a feature of monopolistic competition."
  },
  {
    "id": 101,
    "subject": "ap_microeconomics",
    "unit": 3,
    "lessonIDS": ["3.7"],
    "unitName": "Production, Cost, and the Perfect Competition Model",
    "question": "In long-run equilibrium, a perfectly competitive firm produces at the output level where:",
    "image": null,
    "options": [
      "Price > Average Total Cost",
      "Price < Average Variable Cost",
      "Marginal Revenue > Marginal Cost",
      "Price = Marginal Cost = Minimum Average Total Cost",
      "Economic Profit > 0"
    ],
    "correctAnswer": "D",
    "explanation": "In the long run, free entry and exit drive economic profits to zero in perfect competition. This occurs where firms produce at the minimum point of their average total cost curve, and price equals both marginal cost and minimum average total cost (P = MC = min ATC)."
  },
  {
    "id": 102,
    "subject": "ap_microeconomics",
    "unit": 3,
    "lessonIDS": ["3.6", "3.7"],
    "unitName": "Production, Cost, and the Perfect Competition Model",
    "question": "If a perfectly competitive firm is earning positive economic profit in the short run, then:",
    "image": null,
    "options": [
      "Price must be less than average total cost",
      "Price must be equal to average total cost",
      "Price must be greater than average total cost",
      "The firm should exit the market",
      "New firms will exit the market"
    ],
    "correctAnswer": "C",
    "explanation": "Positive economic profit means total revenue exceeds total cost (explicit + implicit). For a perfectly competitive firm (where P = MR), this occurs when the market price is greater than the average total cost at the profit-maximizing quantity (where P = MC)."
  },

  // Unit 4: Imperfect Competition
  {
    "id": 103,
    "subject": "ap_microeconomics",
    "unit": 4,
    "lessonIDS": ["4.1", "4.2"],
    "unitName": "Imperfect Competition",
    "question": "Unlike a perfectly competitive firm, a single-price monopolist:",
    "image": null,
    "options": [
      "Can earn positive economic profit in the long run",
      "Faces a perfectly elastic demand curve",
      "Maximizes profit where P = MC",
      "Is productively efficient in the long run",
      "Has no market power"
    ],
    "correctAnswer": "A",
    "explanation": "Significant barriers to entry in a monopoly prevent new firms from entering the market, allowing the monopolist to potentially earn positive economic profits even in the long run. Perfectly competitive firms earn zero economic profit in the long run due to free entry."
  },
  {
    "id": 104,
    "subject": "ap_microeconomics",
    "unit": 4,
    "lessonIDS": ["4.2"],
    "unitName": "Imperfect Competition",
    "question": "A single-price monopolist determines its profit-maximizing output level by producing where:",
    "image": null,
    "options": [
      "Price equals marginal cost (P = MC)",
      "Marginal revenue equals marginal cost (MR = MC)",
      "Average total cost is minimized (min ATC)",
      "Price equals average total cost (P = ATC)",
      "Total revenue is maximized (MR = 0)"
    ],
    "correctAnswer": "B",
    "explanation": "The universal profit-maximization rule for all firms, including monopolies, is to produce the quantity where marginal revenue (MR) equals marginal cost (MC). The price is then determined by the demand curve at that quantity."
  },
  {
    "id": 105,
    "subject": "ap_microeconomics",
    "unit": 4,
    "lessonIDS": ["4.2"],
    "unitName": "Imperfect Competition",
    "question": "For a single-price monopolist, marginal revenue is less than price (MR < P) because:",
    "image": null,
    "options": [
      "The firm faces a perfectly elastic demand curve",
      "The firm must lower the price on all units sold to sell an additional unit",
      "The firm's marginal cost is increasing",
      "The firm is a price taker",
      "Total revenue increases as price decreases"
    ],
    "correctAnswer": "B",
    "explanation": "A monopolist faces the market demand curve, which is downward sloping. To sell more output, it must lower the price for every unit it sells, not just the last one. This 'price effect' on all previous units makes MR less than the price."
  },
  {
    "id": 106,
    "subject": "ap_microeconomics",
    "unit": 4,
    "lessonIDS": ["4.2"],
    "unitName": "Imperfect Competition",
    "question": "Compared to a perfectly competitive market outcome, a single-price monopoly produces:",
    "image": null,
    "options": [
      "More output and charges a lower price",
      "Less output and charges a higher price",
      "The same output but charges a higher price",
      "Less output but charges the same price",
      "An allocatively efficient quantity"
    ],
    "correctAnswer": "B",
    "explanation": "Monopolies maximize profit by producing less output (where MR=MC, and P > MC) and charging a higher price than would occur in perfect competition (where P=MC). This leads to allocative inefficiency and deadweight loss."
  },
  {
    "id": 107,
    "subject": "ap_microeconomics",
    "unit": 4,
    "lessonIDS": ["4.3"],
    "unitName": "Imperfect Competition",
    "question": "Which of the following is necessary for a firm to practice price discrimination?",
    "image": null,
    "options": [
      "The firm must be in a perfectly competitive market",
      "The firm must be able to prevent the resale of its product",
      "The firm must face a perfectly elastic demand curve",
      "The firm must produce at minimum average total cost",
      "The firm must have identical demand curves across customer groups"
    ],
    "correctAnswer": "B",
    "explanation": "Successful price discrimination requires market power, the ability to segment customers based on differing price elasticities of demand, and the ability to prevent arbitrage (low-price buyers reselling to high-price buyers)."
  },
  {
    "id": 108,
    "subject": "ap_microeconomics",
    "unit": 4,
    "lessonIDS": ["4.3"],
    "unitName": "Imperfect Competition",
    "question": "If a monopolist can engage in perfect price discrimination, then:",
    "image": null,
    "options": [
      "Consumer surplus is maximized",
      "Deadweight loss is maximized",
      "Total output decreases compared to a single-price monopoly",
      "The monopolist captures all consumer surplus as profit",
      "The demand curve becomes the marginal revenue curve"
    ],
    "correctAnswer": "D",
    "explanation": "Under perfect price discrimination, the firm charges each consumer their maximum willingness to pay. This eliminates consumer surplus entirely and transfers it to the producer as economic profit. Output expands to the allocatively efficient level (where P=MC for the last unit), eliminating deadweight loss."
  },
  {
    "id": 109,
    "subject": "ap_microeconomics",
    "unit": 4,
    "lessonIDS": ["4.4"],
    "unitName": "Imperfect Competition",
    "question": "Which market structure is characterized by many firms selling differentiated products and facing easy entry and exit?",
    "image": null,
    "options": [
      "Perfect competition",
      "Monopoly",
      "Oligopoly",
      "Monopolistic competition",
      "Monopsony"
    ],
    "correctAnswer": "D",
    "explanation": "Monopolistic competition features a large number of firms, similar to perfect competition, but with differentiated products (giving firms some market power) and free entry/exit."
  },
  {
    "id": 110,
    "subject": "ap_microeconomics",
    "unit": 4,
    "lessonIDS": ["4.4"],
    "unitName": "Imperfect Competition",
    "question": "In the long run, a monopolistically competitive firm produces where:",
    "image": null,
    "options": [
      "Price equals marginal cost and average total cost is minimized",
      "Price equals marginal cost and economic profit is positive",
      "Price equals average total cost, but price is greater than marginal cost",
      "Marginal revenue equals average total cost",
      "Price equals minimum average variable cost"
    ],
    "correctAnswer": "C",
    "explanation": "Free entry ensures monopolistically competitive firms earn zero economic profit in the long run (P = ATC). However, because they face a downward-sloping demand curve due to product differentiation, their profit-maximizing output (where MR=MC) occurs where P > MC, indicating allocative inefficiency. They also typically operate with excess capacity (not at min ATC)."
  },
  {
    "id": 111,
    "subject": "ap_microeconomics",
    "unit": 4,
    "lessonIDS": ["4.5"],
    "unitName": "Imperfect Competition",
    "question": "The defining characteristic of an oligopoly is:",
    "image": null,
    "options": [
      "A single seller dominates the market",
      "Firms sell identical products",
      "Barriers to entry are non-existent",
      "Firms are interdependent and consider rivals' actions",
      "Firms are price takers"
    ],
    "correctAnswer": "D",
    "explanation": "Oligopoly is characterized by a few dominant firms where the actions of one firm (regarding price, output, advertising, etc.) significantly impact the others, leading to strategic interdependence."
  },
  {
    "id": 112,
    "subject": "ap_microeconomics",
    "unit": 4,
    "lessonIDS": ["4.5"],
    "unitName": "Imperfect Competition",
    "question": "In game theory, a Nash equilibrium occurs when:",
    "image": null,
    "options": [
      "Both players choose their dominant strategy, if one exists",
      "Each player chooses the strategy that maximizes their payoff, regardless of the other player's choice",
      "Each player chooses their best strategy, given the strategy chosen by the other player(s)",
      "The sum of the players' payoffs is maximized",
      "One player forces the other into a suboptimal outcome"
    ],
    "correctAnswer": "C",
    "explanation": "A Nash equilibrium is a set of strategies, one for each player, such that no player has an incentive to unilaterally change their strategy, given the strategies chosen by the other players. It represents a stable outcome in a strategic interaction."
  },

  // Unit 5: Factor Markets
  {
    "id": 113,
    "subject": "ap_microeconomics",
    "unit": 5,
    "lessonIDS": ["5.1"],
    "unitName": "Factor Markets",
    "question": "The demand for labor is called a derived demand because it depends on:",
    "image": null,
    "options": [
      "The supply of labor",
      "The wage rate",
      "The demand for the product that labor produces",
      "The marginal product of labor",
      "Government regulations"
    ],
    "correctAnswer": "C",
    "explanation": "The demand for factors of production, like labor, is derived from the demand for the goods and services they are used to create. If demand for the final product increases, the demand for the labor needed to make it also increases."
  },
  {
    "id": 114,
    "subject": "ap_microeconomics",
    "unit": 5,
    "lessonIDS": ["5.1", "5.3"],
    "unitName": "Factor Markets",
    "question": "Marginal Revenue Product (MRP) of labor is calculated as:",
    "image": null,
    "options": [
      "Marginal Product of Labor (MPL) divided by the wage rate",
      "Marginal Product of Labor (MPL) times the price of the output",
      "Change in total revenue divided by the change in the wage rate",
      "Total revenue divided by the quantity of labor",
      "Price of the output times the quantity of labor"
    ],
    "correctAnswer": "B",
    "explanation": "MRP represents the additional revenue a firm earns from hiring one more unit of labor. It is the Marginal Product of Labor (MPL) multiplied by the Marginal Revenue (MR) from selling the additional output. In perfectly competitive output markets, MR equals Price (P), so MRP = MPL x P."
  },
  {
    "id": 115,
    "subject": "ap_microeconomics",
    "unit": 5,
    "lessonIDS": ["5.3"],
    "unitName": "Factor Markets",
    "question": "A firm operating in perfectly competitive product and factor markets will hire labor until the:",
    "image": null,
    "options": [
      "Marginal product of labor equals the wage rate",
      "Marginal revenue product of labor equals the wage rate",
      "Price of the output equals the wage rate",
      "Average product of labor equals the wage rate",
      "Marginal cost equals the wage rate"
    ],
    "correctAnswer": "B",
    "explanation": "Firms maximize profit by hiring factors up to the point where the additional revenue from the factor (MRP) equals the additional cost of the factor (Marginal Factor Cost, MFC). In a perfectly competitive labor market, MFC equals the market wage rate (W). Thus, the firm hires until MRP = W."
  },
  {
    "id": 116,
    "subject": "ap_microeconomics",
    "unit": 5,
    "lessonIDS": ["5.2"],
    "unitName": "Factor Markets",
    "question": "Which of the following would cause the demand curve for autoworkers to shift to the right?",
    "image": null,
    "options": [
      "A decrease in the price of cars",
      "A decrease in the productivity of autoworkers",
      "An increase in the demand for cars",
      "An increase in the wage rate for autoworkers",
      "An increase in the supply of autoworkers"
    ],
    "correctAnswer": "C",
    "explanation": "Since the demand for labor is derived from the demand for the product, an increase in the demand for cars (the product) will increase the demand for autoworkers (the labor), shifting the labor demand curve to the right."
  },
  {
    "id": 117,
    "subject": "ap_microeconomics",
    "unit": 5,
    "lessonIDS": ["5.2"],
    "unitName": "Factor Markets",
    "question": "An increase in the supply of labor could be caused by:",
    "image": null,
    "options": [
      "An increase in the demand for the product labor produces",
      "A decrease in the wage rate",
      "An increase in immigration or population growth",
      "A decrease in labor productivity",
      "An increase in the price of capital (a substitute factor)"
    ],
    "correctAnswer": "C",
    "explanation": "Factors that increase the number of available workers at any given wage rate, such as increased immigration, population growth, or changes in preferences towards work, will shift the labor supply curve to the right (increase supply)."
  },
  {
    "id": 118,
    "subject": "ap_microeconomics",
    "unit": 5,
    "lessonIDS": ["5.3"],
    "unitName": "Factor Markets",
    "question": "To minimize costs for a given level of output, a firm should employ factors of production such that the:",
    "image": null,
    "options": [
      "Marginal product per dollar spent is equal across all factors",
      "Total product is maximized",
      "Marginal product of each factor is equal",
      "Marginal revenue product of each factor is equal",
      "Price of each factor is equal"
    ],
    "correctAnswer": "A",
    "explanation": "The least-cost combination rule states that cost is minimized when the last dollar spent on each factor yields the same amount of marginal product. Mathematically, this is MPL / PL = MPK / PK, where L is labor and K is capital."
  },
  {
    "id": 119,
    "subject": "ap_microeconomics",
    "unit": 5,
    "lessonIDS": ["5.4"],
    "unitName": "Factor Markets",
    "question": "A market structure in which there is only one buyer of a factor of production is called:",
    "image": null,
    "options": [
      "Monopoly",
      "Oligopoly",
      "Monopolistic competition",
      "Perfect competition",
      "Monopsony"
    ],
    "correctAnswer": "E",
    "explanation": "Monopsony is the factor market equivalent of a monopoly (single seller) in the product market. It refers to a market with a single buyer of an input, such as a dominant employer in a small town."
  },
  {
    "id": 120,
    "subject": "ap_microeconomics",
    "unit": 5,
    "lessonIDS": ["5.4"],
    "unitName": "Factor Markets",
    "question": "For a monopsonist employer, the marginal factor cost (MFC) of labor is greater than the wage rate because:",
    "image": null,
    "options": [
      "The firm must pay a higher wage to attract more workers, and this higher wage applies to all workers hired",
      "The firm faces a perfectly elastic supply of labor",
      "The marginal revenue product of labor is decreasing",
      "The firm is a price taker in the labor market",
      "The supply curve of labor is downward sloping"
    ],
    "correctAnswer": "A",
    "explanation": "A monopsonist faces the entire upward-sloping market labor supply curve. To hire one more worker, it must raise the wage not only for that worker but for all existing workers as well. This makes the marginal factor cost (the cost of hiring one more worker) exceed the wage rate."
  },
  {
    "id": 121,
    "subject": "ap_microeconomics",
    "unit": 5,
    "lessonIDS": ["5.4"],
    "unitName": "Factor Markets",
    "question": "A monopsonist maximizes profit by hiring labor up to the point where:",
    "image": null,
    "options": [
      "Marginal revenue product equals the wage rate (MRP = W)",
      "Marginal revenue product equals marginal factor cost (MRP = MFC)",
      "Marginal factor cost equals the wage rate (MFC = W)",
      "Marginal product equals the wage rate (MP = W)",
      "Marginal product equals marginal factor cost (MP = MFC)"
    ],
    "correctAnswer": "B",
    "explanation": "The profit-maximizing rule for hiring inputs is always MRP = MFC. For a monopsonist, the MFC is greater than the wage rate (W), so they hire where MRP = MFC, and then determine the wage to pay based on the labor supply curve at that quantity."
  },
  {
    "id": 122,
    "subject": "ap_microeconomics",
    "unit": 5,
    "lessonIDS": ["5.4"],
    "unitName": "Factor Markets",
    "question": "Compared to a perfectly competitive labor market outcome, a monopsonist will hire:",
    "image": null,
    "options": [
      "More workers at a higher wage",
      "More workers at a lower wage",
      "Fewer workers at a higher wage",
      "Fewer workers at a lower wage",
      "The same number of workers at a lower wage"
    ],
    "correctAnswer": "D",
    "explanation": "Because the monopsonist equates MRP with the higher MFC curve (which lies above the supply curve), it chooses a quantity of labor that is lower than the competitive quantity. The wage paid is determined by the supply curve at this lower quantity, resulting in a lower wage than in a competitive market."
  },

  // Unit 6: Market Failure and the Role of Government
  {
    "id": 123,
    "subject": "ap_microeconomics",
    "unit": 6,
    "lessonIDS": ["6.1"],
    "unitName": "Market Failure and the Role of Government",
    "question": "Allocative efficiency in a market occurs when:",
    "image": null,
    "options": [
      "Economic profit is zero",
      "Output is produced at minimum average total cost",
      "The marginal benefit to society equals the marginal cost to society",
      "Firms are price takers",
      "Total revenue is maximized"
    ],
    "correctAnswer": "C",
    "explanation": "Allocative efficiency means resources are distributed to produce the mix of goods and services most desired by society. This occurs when the marginal social benefit (MSB) of the last unit produced equals its marginal social cost (MSC)."
  },
  {
    "id": 124,
    "subject": "ap_microeconomics",
    "unit": 6,
    "lessonIDS": ["6.2"],
    "unitName": "Market Failure and the Role of Government",
    "question": "The presence of a negative externality in production leads to a market outcome where:",
    "image": null,
    "options": [
      "The market produces less than the socially optimal quantity",
      "The market price is higher than the socially optimal price",
      "The marginal social cost is less than the marginal private cost",
      "The market produces more than the socially optimal quantity",
      "There is no deadweight loss"
    ],
    "correctAnswer": "D",
    "explanation": "When a negative externality exists (e.g., pollution), the social cost (MSC) of production exceeds the private cost (MPC). The unregulated market produces where MPB = MPC, resulting in an output level greater than the socially optimal level (where MSB = MSC), leading to overproduction and deadweight loss."
  },
  {
    "id": 125,
    "subject": "ap_microeconomics",
    "unit": 6,
    "lessonIDS": ["6.2"],
    "unitName": "Market Failure and the Role of Government",
    "question": "Which of the following government actions could correct for a positive externality in consumption?",
    "image": null,
    "options": [
      "Imposing a per-unit tax on consumers",
      "Imposing a price floor above the equilibrium price",
      "Providing a per-unit subsidy to consumers",
      "Granting a monopoly to the producer",
      "Banning the consumption of the good"
    ],
    "correctAnswer": "C",
    "explanation": "A positive externality in consumption (e.g., vaccinations) means the social benefit (MSB) exceeds the private benefit (MPB). A per-unit subsidy to consumers effectively increases their private benefit, shifting the demand curve rightward towards the socially optimal quantity where MSB = MSC."
  },
  {
    "id": 126,
    "subject": "ap_microeconomics",
    "unit": 6,
    "lessonIDS": ["6.1", "6.2"],
    "unitName": "Market Failure and the Role of Government",
    "question": "The socially optimal quantity of a good is produced where:",
    "image": null,
    "options": [
      "Marginal private benefit equals marginal private cost",
      "Marginal social benefit equals marginal social cost",
      "Total social benefit is maximized",
      "Average social cost is minimized",
      "Producer surplus equals consumer surplus"
    ],
    "correctAnswer": "B",
    "explanation": "The socially optimal, or allocatively efficient, quantity occurs where the marginal benefit to society (MSB) from consuming the last unit is exactly equal to the marginal cost to society (MSC) of producing that last unit. This point maximizes total social surplus."
  },
  {
    "id": 127,
    "subject": "ap_microeconomics",
    "unit": 6,
    "lessonIDS": ["6.3"],
    "unitName": "Market Failure and the Role of Government",
    "question": "A public good, such as national defense, is characterized by being:",
    "image": null,
    "options": [
      "Rivalrous and excludable",
      "Non-rivalrous and excludable",
      "Rivalrous and non-excludable",
      "Non-rivalrous and non-excludable",
      "Produced only by the government"
    ],
    "correctAnswer": "D",
    "explanation": "Public goods possess two key characteristics: non-rivalry (one person's use does not prevent others from using it) and non-excludability (it is impractical or impossible to prevent non-payers from benefiting)."
  },
  {
    "id": 128,
    "subject": "ap_microeconomics",
    "unit": 6,
    "lessonIDS": ["6.3"],
    "unitName": "Market Failure and the Role of Government",
    "question": "The free-rider problem associated with public goods arises because:",
    "image": null,
    "options": [
      "The marginal cost of providing the good to an additional user is zero",
      "Individuals can benefit from the good without paying for it",
      "The government produces the good inefficiently",
      "Private firms can earn large profits from public goods",
      "The good is rivalrous in consumption"
    ],
    "correctAnswer": "B",
    "explanation": "Since people cannot be easily excluded from consuming a public good, they have an incentive to let others pay for it while still enjoying the benefits. This free-riding leads to under-provision by private markets, often necessitating government provision."
  },
  {
    "id": 129,
    "subject": "ap_microeconomics",
    "unit": 6,
    "lessonIDS": ["6.4"],
    "unitName": "Market Failure and the Role of Government",
    "question": "Consider a monopoly. The imposition of a per-unit tax on the monopolist's output will typically lead to:",
    "image": null,
    "options": [
      "A decrease in price and an increase in output",
      "An increase in price and an increase in output",
      "A decrease in price and a decrease in output",
      "An increase in price and a decrease in output",
      "No change in price or output"
    ],
    "correctAnswer": "D",
    "explanation": "A per-unit tax acts like an increase in marginal cost (MC) for the monopolist. The MC curve shifts upward/leftward. The monopolist will find the new profit-maximizing quantity where MR intersects the new, higher MC curve. This results in a lower quantity and, moving up the demand curve, a higher price."
  },
  {
    "id": 130,
    "subject": "ap_microeconomics",
    "unit": 6,
    "lessonIDS": ["6.4"],
    "unitName": "Market Failure and the Role of Government",
    "question": "If the government imposes a lump-sum tax (a fixed amount regardless of output) on a profit-maximizing monopolist, how will this affect the monopolist's output and price in the short run?",
    "image": null,
    "options": [
      "Output increases, price decreases",
      "Output decreases, price increases",
      "Output and price remain unchanged",
      "Output remains unchanged, price increases",
      "Output decreases, price remains unchanged"
    ],
    "correctAnswer": "C",
    "explanation": "A lump-sum tax affects only fixed costs, not marginal costs (MC) or marginal revenue (MR). Since the profit-maximizing output level is determined where MR = MC, and neither of these curves shifts, the monopolist's output and price will not change in the short run. The tax will, however, reduce the monopolist's total profit."
  },
  {
    "id": 131,
    "subject": "ap_microeconomics",
    "unit": 6,
    "lessonIDS": ["6.5"],
    "unitName": "Market Failure and the Role of Government",
    "question": "The Lorenz curve is used by economists to illustrate:",
    "image": null,
    "options": [
      "The relationship between tax rates and tax revenue",
      "The distribution of income within a society",
      "The trade-off between inflation and unemployment",
      "The production possibilities of an economy",
      "The deadweight loss from taxation"
    ],
    "correctAnswer": "B",
    "explanation": "The Lorenz curve plots the cumulative percentage of total income received against the cumulative percentage of households/individuals, starting from the lowest income. The further the curve bows away from the line of perfect equality, the greater the income inequality."
  },
  {
    "id": 132,
    "subject": "ap_microeconomics",
    "unit": 6,
    "lessonIDS": ["6.5"],
    "unitName": "Market Failure and the Role of Government",
    "question": "A Gini coefficient of 0 represents:",
    "image": null,
    "options": [
      "Perfect income inequality",
      "Perfect income equality",
      "The highest level of economic efficiency",
      "A situation where only one person earns all the income",
      "A negative externality"
    ],
    "correctAnswer": "B",
    "explanation": "The Gini coefficient is a numerical measure of income inequality derived from the Lorenz curve, ranging from 0 (perfect equality, where everyone has the same income) to 1 (perfect inequality, where one person has all the income)."
  }, 
  {
    "id": 133,
    "subject": "ap_microeconomics",
    "unit": 6,
    "lessonIDS": ["6.3"],
    "unitName": "Market Failure and the Role of Government",
    "question": "The 'Tragedy of the Commons' typically arises when a resource is:",
    "image": null,
    "options": [
      "Non-rivalrous and non-excludable", // Removed (Public Good)
      "Rivalrous and excludable",         // Removed (Private Good)
      "Non-rivalrous and excludable",     // Removed (Club Good)
      "Rivalrous and non-excludable",     // Removed (Common Resource)
      "Owned and managed exclusively by the government"
    ],
    "correctAnswer": "D",
    "explanation": "The Tragedy of the Commons describes the overuse and potential depletion of a common resource, which is defined by being rivalrous but non-excludable." // Removed internal parentheses
  },
  {
    "id": 134,
    "subject": "ap_microeconomics",
    "unit": 6,
    "lessonIDS": ["6.2"],
    "unitName": "Market Failure and the Role of Government",
    "question": "If the production of technology yields positive externalities, an unregulated competitive market will tend to produce:", // Removed (knowledge spillovers)
    "image": null,
    "options": [
      "More than the socially optimal quantity of technology.",
      "Less than the socially optimal quantity of technology.",
      "Exactly the socially optimal quantity of technology.",
      "A quantity where marginal private cost equals marginal social benefit.",
      "Zero output due to high private costs."
    ],
    "correctAnswer": "B",
    "explanation": "With a positive production externality, the marginal social cost is lower than the marginal private cost. The market produces where marginal private benefit equals marginal private cost, which is less than the socially optimal quantity where marginal social benefit equals marginal social cost. The market underproduces the good." // Reworded slightly to remove acronyms in parentheses
  },
  {
    "id": 135,
    "subject": "ap_microeconomics",
    "unit": 6,
    "lessonIDS": ["6.2"],
    "unitName": "Market Failure and the Role of Government",
    "question": "According to the Coase Theorem, private bargaining between parties can lead to an efficient resolution of externality problems if:",
    "image": null,
    "options": [
      "The government imposes a corrective tax.",
      "There are many parties involved in the negotiation.",
      "Property rights are clearly defined and transaction costs are low.",
      "The externality is positive rather than negative.",
      "One party has significantly more information than the other."
    ],
    "correctAnswer": "C",
    "explanation": "The Coase Theorem posits that private solutions to externalities are possible and efficient if property rights are well-defined and enforceable, and the costs associated with bargaining are negligible." // Removed (transaction costs)
  },
  {
    "id": 136,
    "subject": "ap_microeconomics",
    "unit": 6,
    "lessonIDS": ["6.3"],
    "unitName": "Market Failure and the Role of Government",
    "question": "To determine the economy's marginal social benefit curve for a public good, one should:",
    "image": null,
    "options": [
      "Horizontally sum the individual marginal benefit curves.",
      "Vertically sum the individual marginal benefit curves.",
      "Average the individual marginal benefit curves.",
      "Take the highest individual marginal benefit curve.",
      "Sum the total benefits provided by the good."
    ],
    "correctAnswer": "B",
    "explanation": "Because a public good is non-rivalrous, the total willingness to pay for any given quantity is found by adding up the marginal benefits of all individuals at that quantity. This corresponds to a vertical summation of individual demand or marginal benefit curves." // Reworded slightly to remove parentheses
  },
  {
    "id": 137,
    "subject": "ap_microeconomics",
    "unit": 6,
    "lessonIDS": ["6.5"],
    "unitName": "Market Failure and the Role of Government",
    "question": "A tax system in which high-income earners pay a larger percentage of their income in taxes than low-income earners is described as:",
    "image": null,
    "options": [
      "Regressive",
      "Proportional",
      "Progressive",
      "Lump-sum",
      "Consumption-based"
    ],
    "correctAnswer": "C",
    "explanation": "A progressive tax system is characterized by an average tax rate that increases as taxable income increases. High-income individuals pay a proportionally larger share of their income in taxes." // No changes needed
  },
  {
    "id": 138,
    "subject": "ap_microeconomics",
    "unit": 6,
    "lessonIDS": ["6.2"],
    "unitName": "Market Failure and the Role of Government",
    "question": "Suppose the consumption of sugary drinks generates negative health externalities not fully considered by consumers. In an unregulated market, the equilibrium quantity of sugary drinks consumed will be:",
    "image": null,
    "options": [
      "Equal to the socially optimal quantity.",
      "Less than the socially optimal quantity.",
      "Greater than the socially optimal quantity.",
      "Determined solely by production costs.",
      "Zero, due to health concerns."
    ],
    "correctAnswer": "C",
    "explanation": "With a negative consumption externality, the marginal social benefit is lower than the marginal private benefit because the externality imposes costs on society. The market equilibrium occurs where marginal private benefit equals marginal social cost, or marginal private cost if no production externality exists. This results in a quantity consumed that is greater than the socially optimal quantity where marginal social benefit equals marginal social cost." // Reworded slightly to remove acronyms in parentheses and clarify the MPC part.
  }, 
  {
    "id": 139,
    "subject": "ap_microeconomics",
    "unit": 6,
    "lessonIDS": ["6.2", "6.4"], // Covers Externalities and Government Intervention
    "unitName": "Market Failure and the Role of Government",
    "question": "The graph above illustrates a market with an externality. To achieve the socially optimal level of output, the government could impose which of the following?",
    "image": allQS139,
    "options": [
      "A per-unit tax equal to P1.",
      "A per-unit subsidy equal to P1 - P3.",
      "A per-unit tax equal to P1 - P3.",
      "A price ceiling set at P3.",
      "A price floor set at P1."
    ],
    "correctAnswer": "C",
    "explanation": "The graph shows a negative production externality because the marginal social cost (MSC) is greater than the marginal private cost (MPC). The market equilibrium quantity (where MPB=MPC) is greater than the socially optimal quantity (where MSB=MSC). To correct this overproduction, the government can impose a per-unit tax equal to the marginal external cost at the optimal quantity. This cost is represented by the vertical distance between MSC and MPC at the optimal quantity, which is equal to P1 - P3."
  }, 
  {
    "id": 140,
    "subject": "ap_microeconomics",
    "unit": 6,
    "lessonIDS": ["6.2"], // Focuses on identifying types of externalities
    "unitName": "Market Failure and the Role of Government",
    "question": "Which of the following economic activities is most likely represented by the market conditions shown in the graph?",
    "image": allQS140, 
    "options": [
      "A chemical factory polluting a river during its production process.",
      "An individual receiving a vaccination that helps prevent the spread of disease.",
      "A company conducting research and development that creates knowledge benefiting other firms.",
      "The market for basic haircuts where production and consumption primarily affect only buyers and sellers.",
      "An individual playing loud music late at night that disturbs neighbors."
    ],
    "correctAnswer": "A",
    "explanation": "The graph shows that the marginal social cost (MSC) is greater than the marginal private cost (MPC), while marginal social benefit (MSB) equals marginal private benefit (MPB). This indicates a negative externality in production. Option A, factory pollution, is a classic example where the production process imposes external costs on society (pollution) that are not reflected in the firm's private costs."
  }, 
  {
    "id": 141,
    "subject": "ap_microeconomics",
    "unit": 6,
    "lessonIDS": ["6.2", "6.4"], // Covers Externalities and Government Intervention
    "unitName": "Market Failure and the Role of Government",
    "question": "Based on the relationships between the curves shown in the diagram above, which government action would most likely move the market outcome closer to the socially optimal quantity?",
    "image": allQS141,
    "options": [
      "Imposing a per-unit tax on producers.",
      "Granting a per-unit subsidy to consumers.",
      "Implementing a binding price floor in the market.",
      "Implementing a binding price ceiling in the market.",
      "Taxing the external benefits generated."
    ],
    "correctAnswer": "B",
    "explanation": "The graph shows that the marginal social benefit (MSB) is greater than the marginal private benefit (MPB), indicating a positive externality in consumption. The market equilibrium (where MPB intersects MPC) results in a quantity below the socially optimal level (where MSB intersects MSC/MPC). To correct this under-consumption, the government can provide a per-unit subsidy to consumers, effectively increasing the marginal private benefit and shifting the demand curve towards the MSB curve, thus encouraging consumption towards the optimal quantity."
  }, 
  {
    "id": 142,
    "subject": "ap_macroeconomics",
    "unit": 5, // Phillips Curve is typically in Unit 5
    "lessonIDS": ["5.2"], // Corresponds to Phillips Curve topic
    "unitName": "Long-Run Consequences of Stabilization Policies",
    "question": "Based on the Phillips curve diagram above, which of the following is true for an economy currently operating at point B?",
    "image": allQS142, // Reference to the image file
    "options": [
      "The economy is operating at the natural rate of unemployment.",
      "The economy is experiencing an inflationary gap.",
      "The actual unemployment rate is higher than the natural rate of unemployment.",
      "An increase in expected inflation has shifted the short-run Phillips curve upwards.",
      "Nominal wages are rising rapidly due to high aggregate demand."
    ],
    "correctAnswer": "C",
    "explanation": "The Long-Run Phillips Curve (LRPC) is vertical at the natural rate of unemployment (NRU). Point A represents long-run equilibrium where the economy is at the NRU. Point B lies on the Short-Run Phillips Curve (SRPC) to the right of the LRPC, indicating that the actual unemployment rate at point B is greater than the natural rate of unemployment. This situation corresponds to a recessionary gap."
  }, 
  {
    "id": 143,
    "subject": "ap_macroeconomics",
    "unit": 4, // Money Market and Monetary Policy are typically in Unit 4
    "lessonIDS": ["4.5", "4.6"], // Covers Money Market and Monetary Policy Tools
    "unitName": "Financial Sector",
    "question": "Which of the following monetary policy actions by a central bank could cause the change in the money market illustrated by the shift from MS1 to MS2 in the graph above?",
    "image": allQS143, // Reference to the image file
    "options": [
      "Increasing the required reserve ratio.",
      "Increasing the discount rate.",
      "Selling government securities on the open market.",
      "Buying government securities on the open market.",
      "Increasing the interest rate paid on reserves."
    ],
    "correctAnswer": "D",
    "explanation": "The graph shows an increase in the money supply, represented by the rightward shift from MS1 to MS2. This leads to a lower nominal interest rate. Buying government securities (bonds) on the open market is an expansionary monetary policy action. When the central bank buys bonds, it pays for them by crediting the reserves of commercial banks, increasing the monetary base and enabling banks to increase lending, which expands the money supply."
  }, 
  {
    "id": 144,
    "subject": "ap_macroeconomics",
    "unit": 4, // Banks and Money Creation are typically in Unit 4
    "lessonIDS": ["4.4"], // Corresponds to Money Creation / Bank Balance Sheets
    "unitName": "Financial Sector",
    "question": "Assume the required reserve ratio is 10 percent. Based on the bank's balance sheet shown above, what is the maximum amount of additional loans this bank can currently make?",
    "image": allQS144, // Reference to the image file
    "options": [
      "$20,000",
      "$40,000",
      "$60,000",
      "$140,000",
      "$200,000"
    ],
    "correctAnswer": "B",
    "explanation": "First, calculate the required reserves: 10% of Demand Deposits ($200,000) = 0.10 * $200,000 = $20,000. Next, find the excess reserves by subtracting required reserves from actual reserves: Excess Reserves = Actual Reserves - Required Reserves = $60,000 - $20,000 = $40,000. A bank can lend out its excess reserves, so the maximum amount of additional loans is $40,000."
  }, 
  {
    "id": 145,
    "subject": "ap_macroeconomics",
    "unit": 3, // AD-AS model and Automatic Stabilizers are typically in Unit 3
    "lessonIDS": ["3.5", "3.9"], // Identifying Gaps and Automatic Stabilizers
    "unitName": "National Income and Price Determination",
    "question": "The AD-AS model above depicts an economy experiencing a recessionary gap. In this situation, how would automatic stabilizers, such as the income tax system and unemployment benefits, affect the economy?",
    "image": allQS145, // Reference to the image file
    "options": [
      "They would automatically increase tax revenues and decrease transfer payments, worsening the recession.",
      "They would automatically decrease tax revenues and increase transfer payments, lessening the severity of the recession.",
      "They would require the central bank to automatically decrease the money supply.",
      "They would require the legislature to enact new tax cuts or spending programs.",
      "They would likely have no significant impact during a recessionary gap."
    ],
    "correctAnswer": "B",
    "explanation": "The graph shows a recessionary gap because the short-run equilibrium (intersection of AD and SRAS) is at a Real GDP level below the Long-Run Aggregate Supply (LRAS). Automatic stabilizers work counter-cyclically without new legislative action. During a recession, incomes fall, leading to lower income tax collections. Simultaneously, unemployment rises, leading to increased government spending on unemployment benefits (a transfer payment). Both lower taxes and higher transfers help support disposable income and consumption, thus cushioning the fall in aggregate demand and lessening the severity of the recession."
  }, 
  {
    "id": 146,
    "subject": "ap_macroeconomics",
    "unit": 2, // GDP calculation is typically in Unit 2
    "lessonIDS": ["2.1"], // Corresponds to Calculating GDP
    "unitName": "Economic Indicators and the Business Cycle",
    "question": "Based on the data provided in the table for the year 2019 (in billions of dollars), what was the Gross Domestic Product (GDP) calculated using the expenditure approach?",
    "image": allQS146, // Reference to the image file
    "options": [
      "$590 billion",
      "$605 billion",
      "$630 billion",
      "$670 billion",
      "$690 billion"
    ],
    "correctAnswer": "A",
    "explanation": "The expenditure approach calculates GDP using the formula: GDP = Consumption (C) + Private Investment (I) + Government Spending (G) + Net Exports (NX). Net Exports (NX) = Exports (X) - Imports (M). Using the data: NX = $25 - $40 = -$15 billion. Therefore, GDP = $450 + $75 + $80 + (-$15) = $590 billion. Taxes are not directly included in the expenditure calculation of GDP."
  }, 
      // --- Unit 1: Basic Economic Concepts ---
    {
      "id": 147,
      "subject": "ap_macroeconomics",
      "unit": 1,
      "lessonIDS": ["1.1"],
      "unitName": "Basic Economic Concepts",
      "question": "Which of the following best represents the factor of production known as 'capital' in economics?",
      "image": null,
      "options": [
        "Money held by businesses.",
        "Shares of stock in a company.",
        "Machinery and equipment used to produce goods.",
        "Unskilled labor available in the workforce.",
        "Naturally occurring mineral deposits."
      ],
      "correctAnswer": "C",
      "explanation": "In economics, capital refers to manufactured goods used to produce other goods and services. Machinery, tools, equipment, and factory buildings are examples of physical capital. Money and stocks are financial assets, labor is human effort, and mineral deposits are natural resources or land."
    },
    {
      "id": 148,
      "subject": "ap_macroeconomics",
      "unit": 1,
      "lessonIDS": ["1.1"],
      "unitName": "Basic Economic Concepts",
      "question": "In a pure market economy, the fundamental questions of what to produce, how to produce, and for whom to produce are primarily answered by:",
      "image": null,
      "options": [
        "Government planning committees.",
        "Traditional customs and beliefs.",
        "The interactions of individual buyers and sellers in markets.",
        "The decisions of the largest corporations.",
        "International trade organizations."
      ],
      "correctAnswer": "C",
      "explanation": "A key characteristic of a market economy is decentralized decision-making. Prices and quantities are determined by the forces of supply and demand, reflecting the voluntary choices of individual consumers and producers responding to price signals."
    },
    {
      "id": 149,
      "subject": "ap_macroeconomics",
      "unit": 1,
      "lessonIDS": ["1.3"],
      "unitName": "Basic Economic Concepts",
      "question": "Country X can produce 50 units of wheat or 25 units of cloth. Country Y can produce 60 units of wheat or 20 units of cloth. Which country has the absolute advantage in producing wheat?",
      "image": null,
      "options": [
        "Country X",
        "Country Y",
        "Both countries",
        "Neither country",
        "Cannot be determined"
      ],
      "correctAnswer": "B",
      "explanation": "Absolute advantage refers to the ability to produce more of a good or service using the same amount of resources or the same amount using fewer resources. Country Y can produce 60 units of wheat, while Country X can produce only 50. Therefore, Country Y has the absolute advantage in wheat production."
    },
    {
      "id": 150,
      "subject": "ap_macroeconomics",
      "unit": 1,
      "lessonIDS": ["1.3"],
      "unitName": "Basic Economic Concepts",
      "question": "If two countries specialize based on comparative advantage and engage in trade, which of the following is likely to occur?",
      "image": null,
      "options": [
        "The global production possibilities frontier will shift inward.",
        "Each country will produce less of the good in which it has a comparative advantage.",
        "Both countries can potentially consume combinations of goods outside their individual production possibilities curves.",
        "Opportunity costs for both countries will increase.",
        "One country will benefit significantly, while the other will likely be worse off."
      ],
      "correctAnswer": "C",
      "explanation": "Trade allows countries to consume beyond their own production capabilities. By specializing in goods where they have a lower opportunity cost, meaning comparative advantage, and trading for other goods, both countries can achieve higher levels of consumption than would be possible in isolation."
    },
    {
      "id": 151,
      "subject": "ap_macroeconomics",
      "unit": 1,
      "lessonIDS": ["1.1", "1.4", "1.5"],
      "unitName": "Basic Economic Concepts",
      "question": "In the simple circular flow model, households supply which of the following to the factor market?",
      "image": null,
      "options": [
        "Goods and services",
        "Factors of production such as labor, land, capital, and entrepreneurship",
        "Money payments for goods and services",
        "Taxes",
        "Savings"
      ],
      "correctAnswer": "B",
      "explanation": "In the circular flow model, households own the factors of production. They supply these factors like their labor, land they own, capital they provide, or entrepreneurial skills to firms through the factor market in exchange for income like wages, rent, interest, or profit."
    },
  
    // --- Unit 2: Economic Indicators and the Business Cycle ---
    {
      "id": 152,
      "subject": "ap_macroeconomics",
      "unit": 2,
      "lessonIDS": ["2.1"],
      "unitName": "Economic Indicators and the Business Cycle",
      "question": "Which of the following is included in the calculation of Gross Domestic Product using the income approach?",
      "image": null,
      "options": [
        "Household consumption spending",
        "Government transfer payments",
        "Wages and salaries paid to workers",
        "Private investment spending",
        "Value of intermediate goods"
      ],
      "correctAnswer": "C",
      "explanation": "The income approach calculates GDP by summing all the incomes earned from producing goods and services within a country. This includes wages and salaries which are compensation of employees, rent, interest, and profits. Consumption, investment, and government purchases are part of the expenditure approach. Transfer payments and intermediate goods are excluded from GDP calculations."
    },
    {
      "id": 153,
      "subject": "ap_macroeconomics",
      "unit": 2,
      "lessonIDS": ["2.3"],
      "unitName": "Economic Indicators and the Business Cycle",
      "question": "If a significant number of unemployed individuals stop looking for work because they believe jobs are not available, how does this affect the official unemployment rate and the labor force participation rate?",
      "image": null,
      "options": [
        "Unemployment rate increases; Labor force participation rate increases.",
        "Unemployment rate decreases; Labor force participation rate decreases.",
        "Unemployment rate increases; Labor force participation rate decreases.",
        "Unemployment rate decreases; Labor force participation rate increases.",
        "Both rates remain unchanged."
      ],
      "correctAnswer": "B",
      "explanation": "Individuals who are not actively seeking work are classified as not in the labor force, even if they want a job; these are sometimes called discouraged workers. When they stop looking, they are no longer counted as unemployed, causing the unemployment rate which is Unemployed divided by Labor Force to decrease. Since they also leave the labor force, the labor force participation rate which is Labor Force divided by Adult Population also decreases."
    },
    {
      "id": 154,
      "subject": "ap_macroeconomics",
      "unit": 2,
      "lessonIDS": ["2.5"],
      "unitName": "Economic Indicators and the Business Cycle",
      "question": "The costs associated with businesses frequently changing their listed prices due to high and variable inflation are known as:",
      "image": null,
      "options": [
        "Shoe-leather costs",
        "Menu costs",
        "Unit-of-account costs",
        "Substitution bias costs",
        "Wealth redistribution costs"
      ],
      "correctAnswer": "B",
      "explanation": "Menu costs refer to the real costs incurred by firms when they have to update price lists, menus, catalogs, and other postings due to inflation. Shoe-leather costs relate to the time and effort people spend trying to counteract inflation's effect on holding money."
    },
    {
      "id": 155,
      "subject": "ap_macroeconomics",
      "unit": 2,
      "lessonIDS": ["2.6"],
      "unitName": "Economic Indicators and the Business Cycle",
      "question": "If the nominal wage increases by 5% and the overall price level increases by 3%, the real wage has:",
      "image": null,
      "options": [
        "Increased by 2%",
        "Increased by 8%",
        "Decreased by 2%",
        "Decreased by 8%",
        "Remained unchanged"
      ],
      "correctAnswer": "A",
      "explanation": "The real wage reflects the purchasing power of the nominal wage. It is calculated approximately as the percentage change in the nominal wage minus the percentage change in the price level or inflation rate. Real Wage Change is approximately the percentage change in Nominal Wage minus the percentage change in Price Level equals 5% minus 3% equals 2% increase."
    },
    {
      "id": 156,
      "subject": "ap_macroeconomics",
      "unit": 2,
      "lessonIDS": ["2.7"],
      "unitName": "Economic Indicators and the Business Cycle",
      "question": "Which phase of the business cycle is characterized by falling real GDP, rising unemployment, and declining business profits?",
      "image": null,
      "options": [
        "Peak",
        "Expansion",
        "Trough",
        "Contraction or Recession",
        "Recovery"
      ],
      "correctAnswer": "D",
      "explanation": "A contraction, or recession, is the phase of the business cycle where economic activity declines. This is typically marked by falling real GDP, increasing unemployment rates as firms lay off workers, and reduced profits due to lower sales."
    },
  
    // --- Unit 3: National Income and Price Determination ---
    {
      "id": 157,
      "subject": "ap_macroeconomics",
      "unit": 3,
      "lessonIDS": ["3.1"],
      "unitName": "National Income and Price Determination",
      "question": "Which of the following effects helps explain the downward slope of the aggregate demand curve?",
      "image": null,
      "options": [
        "The substitution effect",
        "The sticky-wage effect",
        "The interest-rate effect",
        "The diminishing marginal product effect",
        "The multiplier effect"
      ],
      "correctAnswer": "C",
      "explanation": "The downward slope of the AD curve is explained by the wealth effect, the interest-rate effect, and the exchange-rate effect. The interest-rate effect suggests that a lower price level reduces the demand for money, lowering the interest rate, which stimulates investment spending and thus increases the quantity of goods and services demanded."
    },
    {
      "id": 158,
      "subject": "ap_macroeconomics",
      "unit": 3,
      "lessonIDS": ["3.2"],
      "unitName": "National Income and Price Determination",
      "question": "If the marginal propensity to consume is 0.75, what is the value of the simple tax multiplier?",
      "image": null,
      "options": [
        "4",
        "-4",
        "3",
        "-3",
        "1.33"
      ],
      "correctAnswer": "D",
      "explanation": "The simple tax multiplier measures the change in aggregate demand resulting from a change in lump-sum taxes. Its formula is negative MPC divided by MPS, where MPS is 1 minus MPC. Given MPC = 0.75, MPS = 1 minus 0.75 = 0.25. Tax Multiplier = negative 0.75 divided by 0.25 = negative 3."
    },
    {
      "id": 159,
      "subject": "ap_macroeconomics",
      "unit": 3,
      "lessonIDS": ["3.2", "3.8"],
      "unitName": "National Income and Price Determination",
      "question": "If the government increases both its spending and taxes by the same amount, say $50 billion, what is the expected impact on aggregate demand according to the balanced-budget multiplier concept?",
      "image": null,
      "options": [
        "Aggregate demand will increase by more than $50 billion.",
        "Aggregate demand will increase by exactly $50 billion.",
        "Aggregate demand will remain unchanged.",
        "Aggregate demand will decrease by exactly $50 billion.",
        "Aggregate demand will decrease by more than $50 billion."
      ],
      "correctAnswer": "B",
      "explanation": "The balanced-budget multiplier states that an equal increase or decrease in government spending and net taxes leads to an increase or decrease in aggregate demand equal to the size of the change in spending or taxes. The multiplier value is 1 because the spending multiplier is larger in absolute value than the tax multiplier by exactly one."
    },
    {
      "id": 160,
      "subject": "ap_macroeconomics",
      "unit": 3,
      "lessonIDS": ["3.4"],
      "unitName": "National Income and Price Determination",
      "question": "Which of the following would cause a shift in the Long-Run Aggregate Supply curve to the right?",
      "image": null,
      "options": [
        "An increase in the aggregate price level.",
        "A decrease in nominal wages.",
        "An increase in government spending.",
        "An increase in the economy's stock of physical capital.",
        "A decrease in consumer confidence."
      ],
      "correctAnswer": "D",
      "explanation": "The LRAS curve represents the economy's potential output, which depends on the availability and productivity of its resources like land, labor, capital, and technology. An increase in the stock of physical capital, such as machinery or infrastructure, enhances productive capacity, shifting the LRAS curve to the right."
    },
    {
      "id": 161,
      "subject": "ap_macroeconomics",
      "unit": 3,
      "lessonIDS": ["3.7"],
      "unitName": "National Income and Price Determination",
      "question": "If an economy is operating in a recessionary gap and there is no government intervention, how is the economy expected to return to long-run equilibrium according to the flexible wage theory?",
      "image": null,
      "options": [
        "Nominal wages will rise, shifting SRAS left.",
        "Aggregate demand will automatically increase.",
        "Nominal wages will fall, shifting SRAS right.",
        "The LRAS curve will shift to the left.",
        "The central bank will decrease the money supply."
      ],
      "correctAnswer": "C",
      "explanation": "In a recessionary gap, high unemployment puts downward pressure on nominal wages. As wages fall, production costs decrease, causing the Short-Run Aggregate Supply curve to shift to the right, eventually restoring the economy to long-run equilibrium at potential output, possibly at a lower price level."
    },
  
    // --- Unit 4: Financial Sector ---
    {
      "id": 162,
      "subject": "ap_macroeconomics",
      "unit": 4,
      "lessonIDS": ["4.3"],
      "unitName": "Financial Sector",
      "question": "Which of the following is included in the M1 measure of the money supply but NOT in M2?",
      "image": null,
      "options": [
        "Savings deposits",
        "Small-denomination time deposits",
        "Money market mutual funds",
        "Demand deposits",
        "None of the above; M1 is a subset of M2."
      ],
      "correctAnswer": "E",
      "explanation": "M1 includes the most liquid forms of money: currency in circulation, demand deposits, traveler's checks, and other checkable deposits. M2 includes all of M1 PLUS less liquid assets like savings deposits, small-time deposits, and money market mutual funds for individuals. Therefore, everything in M1 is also in M2."
    },
    { // REPLACEMENT for original 163 (Deposit Insurance)
      "id": 163,
      "subject": "ap_macroeconomics",
      "unit": 4,
      "lessonIDS": ["4.4"],
      "unitName": "Financial Sector",
      "question": "Suppose a bank has $100,000 in demand deposits, actual reserves of $15,000, and the required reserve ratio is 10%. If a customer withdraws $1,000 in cash, what is the immediate effect on the bank's excess reserves?",
      "image": null,
      "options": [
        "Excess reserves decrease by $100.",
        "Excess reserves decrease by $900.",
        "Excess reserves decrease by $1,000.",
        "Excess reserves increase by $900.",
        "Excess reserves remain unchanged."
      ],
      "correctAnswer": "B",
      "explanation": "Initially, required reserves are 10% of $100,000 = $10,000. Initial excess reserves are $15,000 - $10,000 = $5,000. After the $1,000 cash withdrawal, demand deposits fall to $99,000 and actual reserves fall to $14,000. New required reserves are 10% of $99,000 = $9,900. New excess reserves are $14,000 - $9,900 = $4,100. The change in excess reserves is $4,100 - $5,000 = -$900."
    },
    { // REPLACEMENT for original 164 (CB Independence)
      "id": 164,
      "subject": "ap_macroeconomics",
      "unit": 4,
      "lessonIDS": ["4.7", "6.6"], // Links LF Market and Capital Flows
      "unitName": "Financial Sector",
      "question": "If international investors perceive increased risk in a country and rapidly sell off their financial assets located there, this capital flight will most likely affect the country's market for loanable funds by:",
      "image": null,
      "options": [
        "Decreasing the supply of loanable funds and increasing the real interest rate.",
        "Increasing the supply of loanable funds and decreasing the real interest rate.",
        "Decreasing the demand for loanable funds and decreasing the real interest rate.",
        "Increasing the demand for loanable funds and increasing the real interest rate.",
        "Having no effect on the loanable funds market."
      ],
      "correctAnswer": "A",
      "explanation": "Capital flight represents a decrease in capital inflows or an increase in capital outflows. This reduces the funds available for lending within the country, decreasing the supply of loanable funds. A leftward shift in the supply of loanable funds leads to a higher equilibrium real interest rate and a lower equilibrium quantity of funds loaned."
    },
    {
      "id": 165,
      "subject": "ap_macroeconomics",
      "unit": 4,
      "lessonIDS": ["4.7"],
      "unitName": "Financial Sector",
      "question": "Which of the following would most likely cause an increase in the supply of loanable funds?",
      "image": null,
      "options": [
        "An increase in government budget deficits.",
        "An increase in perceived business investment opportunities.",
        "An increase in private saving rates.",
        "An increase in expected inflation.",
        "A decrease in capital inflows from abroad."
      ],
      "correctAnswer": "C",
      "explanation": "The supply of loanable funds primarily comes from saving, both private and public. An increase in the private saving rate means households are saving more at any given real interest rate, shifting the supply curve for loanable funds to the right."
    },
    {
      "id": 166,
      "subject": "ap_macroeconomics",
      "unit": 5, 
      "lessonIDS": ["5.3"],
      "unitName": "Financial Sector",
      "question": "According to the quantity theory of money, if the money supply grows by 6%, the velocity of money is constant, and real GDP grows by 2%, the inflation rate will be approximately:",
      "image": null,
      "options": [
        "2%",
        "3%",
        "4%",
        "6%",
        "8%"
      ],
      "correctAnswer": "C",
      "explanation": "The equation of exchange in growth rates states that the percentage change in Money Supply plus the percentage change in Velocity equals the percentage change in Price Level plus the percentage change in Real GDP. If velocity is constant, its percentage change is 0. So, percentage change in Money Supply equals percentage change in Price Level plus percentage change in Real GDP. Plugging in the values: 6% = percentage change in Price Level + 2%. Solving for the inflation rate gives 4%."
    },
  
    // --- Unit 5: Long-Run Consequences of Stabilization Policies ---
    {
      "id": 167,
      "subject": "ap_macroeconomics",
      "unit": 5,
      "lessonIDS": ["5.2"],
      "unitName": "Long-Run Consequences of Stabilization Policies",
      "question": "The Non-Accelerating Inflation Rate of Unemployment is generally understood to be the same as:",
      "image": null,
      "options": [
        "Zero unemployment.",
        "The cyclical rate of unemployment.",
        "The structural rate of unemployment.",
        "The natural rate of unemployment.",
        "The frictional rate of unemployment."
      ],
      "correctAnswer": "D",
      "explanation": "The Non-Accelerating Inflation Rate of Unemployment, or NAIRU, represents the unemployment rate consistent with stable inflation in the long run. It is equivalent to the natural rate of unemployment, which includes frictional and structural unemployment but excludes cyclical unemployment."
    },
    {
      "id": 168,
      "subject": "ap_macroeconomics",
      "unit": 5,
      "lessonIDS": ["5.2"],
      "unitName": "Long-Run Consequences of Stabilization Policies",
      "question": "If an economy is operating to the left of its long-run Phillips curve, it indicates that:",
      "image": null,
      "options": [
        "The economy is in long-run equilibrium.",
        "The economy is experiencing a recessionary gap.",
        "The actual unemployment rate is below the natural rate of unemployment.",
        "Expected inflation is equal to actual inflation.",
        "There has been a favorable supply shock."
      ],
      "correctAnswer": "C",
      "explanation": "The long-run Phillips curve is vertical at the natural rate of unemployment. Operating to the left of this curve means the current unemployment rate is lower than the natural rate, which corresponds to an inflationary gap where output is above potential."
    },
    { // REPLACEMENT for original 169 (Debt-to-GDP)
      "id": 169,
      "subject": "ap_macroeconomics",
      "unit": 5,
      "lessonIDS": ["5.2"],
      "unitName": "Long-Run Consequences of Stabilization Policies",
      "question": "Which of the following events would most likely cause the short-run Phillips curve to shift downwards or to the left?",
      "image": null,
      "options": [
        "An increase in aggregate demand.",
        "An increase in expected inflation.",
        "A decrease in aggregate demand.",
        "A decrease in expected inflation.",
        "An adverse supply shock, such as rising oil prices."
      ],
      "correctAnswer": "D",
      "explanation": "A downward or leftward shift of the short-run Phillips curve indicates that for any given unemployment rate, the inflation rate is lower, or for any given inflation rate, the unemployment rate is lower. This is primarily caused by a decrease in expected inflation or a positive supply shock."
    },
    { // REPLACEMENT for original 170 (Laffer Curve)
      "id": 170,
      "subject": "ap_macroeconomics",
      "unit": 5,
      "lessonIDS": ["5.5"],
      "unitName": "Long-Run Consequences of Stabilization Policies",
      "question": "The 'crowding out' effect suggests that an increase in government budget deficit spending financed through borrowing will lead to:",
      "image": null,
      "options": [
        "Lower real interest rates and increased private investment.",
        "Higher real interest rates and decreased private investment.",
        "An increase in the supply of loanable funds and lower real interest rates.",
        "A decrease in aggregate demand and lower price levels.",
        "An appreciation of the domestic currency and increased net exports."
      ],
      "correctAnswer": "B",
      "explanation": "Crowding out occurs when increased government borrowing to finance deficits increases the demand for loanable funds. This drives up the real interest rate, making it more costly for private firms to borrow and invest, thus potentially reducing private investment spending."
    },
    { // REPLACEMENT for original 171 (Ricardian Equivalence)
      "id": 171,
      "subject": "ap_macroeconomics",
      "unit": 5,
      "lessonIDS": ["5.6"],
      "unitName": "Long-Run Consequences of Stabilization Policies",
      "question": "An increase in which of the following is most likely to enhance labor productivity and contribute to long-run economic growth?",
      "image": null,
      "options": [
        "The general price level.",
        "Government transfer payments.",
        "The amount of physical capital per worker.",
        "Cyclical unemployment.",
        "Nominal wages."
      ],
      "correctAnswer": "C",
      "explanation": "Long-run economic growth is driven by increases in labor productivity. Providing workers with more and better physical capital such as tools, machinery, and infrastructure directly increases the amount of output they can produce per hour worked, thus boosting productivity and potential GDP."
    },
  
    // --- Unit 6: Open Economy - International Trade and Finance ---
    {
      "id": 172,
      "subject": "ap_macroeconomics",
      "unit": 6,
      "lessonIDS": ["6.1"],
      "unitName": "Open Economy - International Trade and Finance",
      "question": "Which of the following transactions would typically be recorded in a country's Capital Account section of the Balance of Payments?",
      "image": null,
      "options": [
        "Export of software services.",
        "Purchase of foreign stocks by domestic residents.",
        "Payment of dividends to foreign investors.",
        "Debt forgiveness granted to a foreign government.",
        "Import of merchandise goods."
      ],
      "correctAnswer": "D",
      "explanation": "The Capital Account, typically very small for most countries, primarily records non-produced, non-financial asset transfers and capital transfers like debt forgiveness or migrants' financial transfers. Exports and imports of goods and services and income payments like dividends are in the Current Account. Purchases of financial assets like stocks or bonds are in the Financial Account."
    },
    {
      "id": 173,
      "subject": "ap_macroeconomics",
      "unit": 6,
      "lessonIDS": ["6.2", "6.3"],
      "unitName": "Open Economy - International Trade and Finance",
      "question": "Under a freely floating or flexible exchange rate system, the value of a country's currency is primarily determined by:",
      "image": null,
      "options": [
        "The country's central bank.",
        "The supply and demand for the currency in the foreign exchange market.",
        "An international agreement setting fixed parities.",
        "The country's trade balance.",
        "The level of gold reserves held by the country."
      ],
      "correctAnswer": "B",
      "explanation": "In a floating exchange rate system, the exchange rate adjusts continuously based on the market forces of supply and demand for the currency relative to other currencies, without direct intervention by the central bank to maintain a specific rate."
    },
    {
      "id": 174,
      "subject": "ap_macroeconomics",
      "unit": 6,
      "lessonIDS": ["6.3", "4.6"],
      "unitName": "Open Economy - International Trade and Finance",
      "question": "If the central bank of Country Z wants to prevent its currency from appreciating against the currency of Country W under a managed float system, it should:",
      "image": null,
      "options": [
        "Buy its own currency using foreign currency.",
        "Sell its own currency and buy foreign currency.",
        "Increase domestic interest rates.",
        "Impose tariffs on imports from Country W.",
        "Decrease government spending."
      ],
      "correctAnswer": "B",
      "explanation": "To prevent its currency from appreciating or getting stronger, the central bank needs to increase the supply of its currency in the foreign exchange market. Selling its own currency increases its supply, putting downward pressure on its value, while simultaneously buying foreign currency."
    },
    {
      "id": 175,
      "subject": "ap_macroeconomics",
      "unit": 6,
      "lessonIDS": ["6.6"],
      "unitName": "Open Economy - International Trade and Finance",
      "question": "Besides relative interest rates, which factor is likely to cause a significant increase in net financial capital inflows into a country?",
      "image": null,
      "options": [
        "Increased political instability in the country.",
        "Expectations of future depreciation of the country's currency.",
        "Increased perceived riskiness of the country's assets.",
        "Strong expectations of future economic growth and profitability in the country.",
        "High domestic inflation rates relative to other countries."
      ],
      "correctAnswer": "D",
      "explanation": "Foreign investors are attracted to countries where they expect high returns and relatively low risk. Strong prospects for economic growth and corporate profitability make a country's assets like stocks and direct investments more attractive, leading to increased capital inflows."
    },
    {
      "id": 176,
      "subject": "ap_macroeconomics",
      "unit": 6,
      "lessonIDS": ["1.3", "6.5"],
      "unitName": "Open Economy - International Trade and Finance",
      "question": "The imposition of a protective tariff on imported goods is most likely to cause which of the following in the short run in the country imposing the tariff?",
      "image": null,
      "options": [
        "A decrease in the price of domestically produced substitute goods.",
        "An increase in imports of the good.",
        "A decrease in domestic production of the good.",
        "An increase in the price consumers pay for the imported good.",
        "An appreciation of the country's currency."
      ],
      "correctAnswer": "D",
      "explanation": "A tariff is a tax on imported goods. This tax increases the cost of importing the good, leading to a higher price paid by domestic consumers for the imported item. It also tends to decrease the quantity of imports and increase domestic production of substitute goods."
    }
  
  
];
