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
    }, 
      {
        "id": 177,
        "subject": "ap_microeconomics",
        "unit": 3,
        "lessonIDS": ["3.1"],
        "unitName": "Production, Cost, and the Perfect Competition Model",
        "question": "When a firm hires additional units of a variable input, like labor, while keeping fixed inputs constant, the marginal product of the variable input eventually decreases. This concept is known as:",
        "image": null,
        "options": [
          "Diseconomies of scale affecting long-run costs", // Slightly lengthened
          "The law of diminishing marginal utility",
          "The law of diminishing marginal product", // Correct
          "Constant returns to scale in production", // Slightly lengthened
          "Decreasing marginal cost"
        ],
        "correctAnswer": "C",
        "explanation": "The law of diminishing marginal product states that as more units of a variable input are added to fixed inputs, the additional output produced from each new unit of the variable input will eventually decline."
      },
      {
        "id": 178,
        "subject": "ap_microeconomics",
        "unit": 3,
        "lessonIDS": ["3.2"],
        "unitName": "Production, Cost, and the Perfect Competition Model",
        "question": "Which cost measure is calculated by dividing the change in total cost by the change in output?",
        "image": null,
        "options": [
          "Average fixed cost per unit",
          "Average variable cost of production",
          "Average total cost overall",
          "Marginal cost", // Correct
          "Total variable cost for all units"
        ],
        "correctAnswer": "D",
        "explanation": "Marginal cost (MC) is the additional cost incurred from producing one more unit of output. It is calculated as the change in total cost divided by the change in quantity (output)."
      },
      {
        "id": 179,
        "subject": "ap_microeconomics",
        "unit": 3,
        "lessonIDS": ["3.2"],
        "unitName": "Production, Cost, and the Perfect Competition Model",
        "question": "A firm's total fixed costs are $1,000. If the firm produces 100 units of output, and its average variable cost is $5, what is its average total cost?",
        "image": null,
        "options": [
          "$5",
          "$10",
          "$15", // Correct
          "$50",
          "$105"
        ],
        "correctAnswer": "C",
        "explanation": "Average Fixed Cost (AFC) = Total Fixed Cost / Quantity = $1,000 / 100 = $10. Average Total Cost (ATC) = Average Fixed Cost (AFC) + Average Variable Cost (AVC) = $10 + $5 = $15." // Lengths are numbers, inherently balanced.
      },
      {
        "id": 180,
        "subject": "ap_microeconomics",
        "unit": 3,
        "lessonIDS": ["3.2"],
        "unitName": "Production, Cost, and the Perfect Competition Model",
        "question": "As a firm increases its output in the short run, its average fixed cost will:",
        "image": null,
        "options": [
          "Remain constant regardless of output level",
          "Increase continuously due to rising total costs",
          "Decrease continuously", // Correct
          "Decrease initially, then increase reflecting diminishing returns",
          "Increase initially, then decrease as capacity is reached"
        ],
        "correctAnswer": "C",
        "explanation": "Average fixed cost (AFC) is calculated as Total Fixed Cost (TFC) divided by Quantity (Q). Since TFC is constant in the short run, AFC must decrease as Q increases because the constant fixed cost is spread over more units of output."
      },
      {
        "id": 181,
        "subject": "ap_microeconomics",
        "unit": 3,
        "lessonIDS": ["3.2"],
        "unitName": "Production, Cost, and the Perfect Competition Model",
        "question": "If a firm's marginal cost is less than its average variable cost, and output increases, what will happen to the average variable cost?",
        "image": null,
        "options": [
          "Average variable cost will increase rapidly.",
          "Average variable cost will decrease.", // Correct
          "Average variable cost will remain constant.",
          "Average variable cost will equal the marginal cost exactly.",
          "The effect on average variable cost cannot be determined."
        ],
        "correctAnswer": "B",
        "explanation": "When the marginal cost (the cost of the next unit) is below the current average variable cost, producing that next unit pulls the average down. Therefore, average variable cost will decrease." // Lengths seem reasonably balanced.
      },
      {
        "id": 182,
        "subject": "ap_microeconomics",
        "unit": 3,
        "lessonIDS": ["3.3"],
        "unitName": "Production, Cost, and the Perfect Competition Model",
        "question": "Diseconomies of scale occur when a firm increases all its inputs, and its output:",
        "image": null,
        "options": [
          "Increases by the same percentage as the inputs.",
          "Increases by a larger percentage than the inputs.",
          "Increases by a smaller percentage than the inputs.", // Correct
          "Remains constant despite input increases.",
          "Decreases due to management inefficiency." // Lengthened plausible distractor
        ],
        "correctAnswer": "C",
        "explanation": "Diseconomies of scale exist when increasing all inputs by a certain percentage leads to a smaller percentage increase in output. This results in rising long-run average total costs, often due to coordination problems in large organizations."
      },
      {
        "id": 183,
        "subject": "ap_microeconomics",
        "unit": 3,
        "lessonIDS": ["3.3"],
        "unitName": "Production, Cost, and the Perfect Competition Model",
        "question": "Which of the following best describes the long run in production and cost analysis?",
        "image": null,
        "options": [
          "A specific period, usually defined as one fiscal year.",
          "A period where only labor and material inputs can be changed.",
          "A period where technology is fixed but the scale of operation can vary.",
          "A period where all inputs, including plant size and capital, are variable.", // Correct (slightly longer)
          "A period sufficiently short that fixed costs are irrelevant."
        ],
        "correctAnswer": "D",
        "explanation": "The long run is defined as a time horizon long enough for a firm to vary all of its inputs, including its scale of operations (plant size, capital stock). There are no fixed inputs in the long run."
      },
      {
        "id": 184,
        "subject": "ap_microeconomics",
        "unit": 3,
        "lessonIDS": ["3.4"],
        "unitName": "Production, Cost, and the Perfect Competition Model",
        "question": "A firm's total revenue is $500,000. Its explicit costs are $300,000. The owner could have earned $150,000 working elsewhere. What is the firm's economic profit?",
        "image": null,
        "options": [
          "$50,000", // Correct
          "$150,000",
          "$200,000",
          "$350,000",
          "$650,000"
        ],
        "correctAnswer": "A",
        "explanation": "Economic Profit = Total Revenue - Explicit Costs - Implicit Costs. Implicit costs represent the opportunity cost of resources used, such as the owner's forgone salary ($150,000). Economic Profit = $500,000 - $300,000 - $150,000 = $50,000." // Lengths are numbers, inherently balanced.
      },
      {
        "id": 185,
        "subject": "ap_microeconomics",
        "unit": 3,
        "lessonIDS": ["3.4"],
        "unitName": "Production, Cost, and the Perfect Competition Model",
        "question": "Accounting profit is typically defined as total revenue minus:",
        "image": null,
        "options": [
          "Implicit opportunity costs only",
          "Explicit costs only", // Correct
          "Both explicit costs and implicit opportunity costs", // Lengthened distractor
          "Marginal costs associated with the last unit produced",
          "Variable costs incurred during production"
        ],
        "correctAnswer": "B",
        "explanation": "Accounting profit considers only the explicit, out-of-pocket costs incurred by a firm (like wages, rent, materials). It does not subtract implicit costs, which are the opportunity costs of using owner-supplied resources."
      },
      {
        "id": 186,
        "subject": "ap_microeconomics",
        "unit": 3,
        "lessonIDS": ["3.5"],
        "unitName": "Production, Cost, and the Perfect Competition Model",
        "question": "To maximize profit, a firm should produce the quantity of output where:",
        "image": null,
        "options": [
          "Total revenue is exactly equal to total cost.",
          "Marginal revenue equals marginal cost.", // Correct
          "Average total cost reaches its lowest possible point.",
          "Price charged equals the average total cost.",
          "Total revenue generated is maximized."
        ],
        "correctAnswer": "B",
        "explanation": "The universal rule for profit maximization is to produce up to the point where the additional revenue from selling one more unit (Marginal Revenue, MR) equals the additional cost of producing that unit (Marginal Cost, MC)."
      },
      {
        "id": 187,
        "subject": "ap_microeconomics",
        "unit": 3,
        "lessonIDS": ["3.7"],
        "unitName": "Production, Cost, and the Perfect Competition Model",
        "question": "Which of the following is a defining characteristic of a perfectly competitive industry?",
        "image": null,
        "options": [
          "Substantial barriers preventing new firms from entering.",
          "Firms sell highly differentiated and unique products.",
          "A small number of large firms dominate the market.",
          "Each individual firm faces a downward-sloping demand curve.",
          "Firms produce a standardized or homogeneous product." // Correct
        ],
        "correctAnswer": "E",
        "explanation": "Perfect competition requires several conditions, including a large number of small firms, easy entry and exit, and firms producing identical (homogeneous) products, making them perfect substitutes for each other." // Balanced lengths.
      },
      {
        "id": 188,
        "subject": "ap_microeconomics",
        "unit": 3,
        "lessonIDS": ["3.7"],
        "unitName": "Production, Cost, and the Perfect Competition Model",
        "question": "For a perfectly competitive firm, the demand curve it faces is:",
        "image": null,
        "options": [
          "Perfectly inelastic, vertical at the market quantity",
          "Unit elastic across its entire range",
          "Perfectly elastic", // Correct
          "Downward sloping, same as the market demand curve",
          "Upward sloping, reflecting increasing costs"
        ],
        "correctAnswer": "C",
        "explanation": "A perfectly competitive firm is a price taker, meaning it can sell all it wants at the prevailing market price but nothing at a higher price. This translates to a perfectly elastic (horizontal) demand curve at the market price."
      },
      {
        "id": 189,
        "subject": "ap_microeconomics",
        "unit": 3,
        "lessonIDS": ["3.5", "3.7"],
        "unitName": "Production, Cost, and the Perfect Competition Model",
        "question": "A perfectly competitive firm maximizes profit by producing the quantity where:",
        "image": null,
        "options": [
          "Market price equals its average fixed cost.",
          "Market price equals its average variable cost.",
          "Market price equals its marginal cost.", // Correct
          "Marginal revenue equals average total cost.",
          "Total revenue equals total variable cost."
        ],
        "correctAnswer": "C",
        "explanation": "The general profit maximization rule is MR = MC. For a perfectly competitive firm, price equals marginal revenue (P = MR) because the firm is a price taker. Therefore, the profit-maximizing condition for a perfectly competitive firm is P = MC."
      },
      {
        "id": 190,
        "subject": "ap_microeconomics",
        "unit": 3,
        "lessonIDS": ["3.6"],
        "unitName": "Production, Cost, and the Perfect Competition Model",
        "question": "In the short run, a perfectly competitive firm will choose to shut down and produce zero output if the market price is less than its minimum:",
        "image": null,
        "options": [
          "Marginal cost for the first unit.",
          "Average total cost.",
          "Average fixed cost.",
          "Average variable cost.", // Correct
          "Total cost at the potential shutdown point."
        ],
        "correctAnswer": "D",
        "explanation": "The shutdown rule states that a firm should cease production in the short run if the price falls below the minimum average variable cost (AVC). At prices below minimum AVC, the firm cannot even cover its variable costs per unit, and its losses would be smaller if it shut down (losing only its fixed costs)."
      },
      {
        "id": 191,
        "subject": "ap_microeconomics",
        "unit": 3,
        "lessonIDS": ["3.6"],
        "unitName": "Production, Cost, and the Perfect Competition Model",
        "question": "If a perfectly competitive firm is producing where price is $10, average total cost is $12, and average variable cost is $8, the firm is:",
        "image": null,
        "options": [
          "Earning an economic profit and should increase output.",
          "Incurring a loss but should continue to operate in the short run.", // Correct (Longer)
          "Incurring a loss and should shut down immediately to minimize losses.", // Lengthened distractor
          "Breaking even, earning precisely zero economic profit.",
          "Earning an accounting profit but possibly an economic loss."
        ],
        "correctAnswer": "B",
        "explanation": "The firm is incurring a loss because Price ($10) is less than Average Total Cost ($12). However, since Price ($10) is greater than Average Variable Cost ($8), the firm is covering its variable costs and contributing $2 per unit towards its fixed costs. Shutting down would mean losing all fixed costs, so continuing to operate minimizes losses in the short run." // Revised options for length balance.
      },
      {
        "id": 192,
        "subject": "ap_microeconomics",
        "unit": 3,
        "lessonIDS": ["3.7"],
        "unitName": "Production, Cost, and the Perfect Competition Model",
        "question": "In a perfectly competitive market in long-run equilibrium, which of the following is true for a typical firm?",
        "image": null,
        "options": [
          "Price equals minimum average total cost.", // Correct
          "Economic profits are positive, encouraging entry.",
          "Price is significantly greater than marginal cost.",
          "Average total cost is greater than marginal cost.",
          "Firms are operating with considerable excess capacity."
        ],
        "correctAnswer": "A",
        "explanation": "Due to free entry and exit, economic profits are driven to zero in the long run for perfectly competitive firms. This occurs at the output level where price equals marginal cost equals the minimum point of the average total cost curve (P = MC = min ATC). This point also represents productive efficiency."
      },
      {
        "id": 193,
        "subject": "ap_microeconomics",
        "unit": 3,
        "lessonIDS": ["3.7"],
        "unitName": "Production, Cost, and the Perfect Competition Model",
        "question": "If perfectly competitive firms are currently earning positive economic profits, what will happen in the long run?",
        "image": null,
        "options": [
          "Existing firms will exit the industry due to high competition.", // Lengthened distractor
          "New firms will enter the industry, increasing market supply and decreasing market price.", // Correct (Longer)
          "The market demand curve will shift significantly to the left.",
          "Firms will reduce their output levels voluntarily.",
          "The long-run average total cost curve for all firms will shift upward."
        ],
        "correctAnswer": "B",
        "explanation": "Positive economic profits act as a signal, attracting new firms to enter the perfectly competitive industry due to the absence of entry barriers. This entry increases the market supply, which pushes the market price down until economic profits return to zero (normal profit)." // Adjusted lengths.
      },
      {
        "id": 194,
        "subject": "ap_microeconomics",
        "unit": 3,
        "lessonIDS": ["3.6", "3.7"],
        "unitName": "Production, Cost, and the Perfect Competition Model",
        "question": "The short-run supply curve for a perfectly competitive firm is represented by the portion of its:",
        "image": null,
        "options": [
          "Average total cost curve located above its marginal cost curve.",
          "Average variable cost curve located above its marginal cost curve.",
          "Marginal cost curve above minimum average variable cost.", // Correct
          "Marginal cost curve above minimum average total cost.",
          "Average fixed cost curve as output increases."
        ],
        "correctAnswer": "C",
        "explanation": "A perfectly competitive firm produces where P = MC, as long as P is greater than or equal to its minimum AVC (the shutdown point). Therefore, the firm's short-run supply curve is its marginal cost curve above the minimum point of the average variable cost curve."
      },
      {
        "id": 195,
        "subject": "ap_microeconomics",
        "unit": 3,
        "lessonIDS": ["3.2"],
        "unitName": "Production, Cost, and the Perfect Competition Model",
        "question": "If a firm's total cost is $500 when it produces 10 units and $540 when it produces 11 units, the marginal cost of the 11th unit is:",
        "image": null,
        "options": [
          "$40", // Correct
          "$49.09",
          "$50",
          "$54",
          "$540"
        ],
        "correctAnswer": "A",
        "explanation": "Marginal cost is the change in total cost resulting from producing one additional unit. MC = Change in TC / Change in Q = ($540 - $500) / (11 - 10) = $40 / 1 = $40." // Lengths are numbers, inherently balanced.
      },
      {
        "id": 196,
        "subject": "ap_microeconomics",
        "unit": 3,
        "lessonIDS": ["3.7"],
        "unitName": "Production, Cost, and the Perfect Competition Model",
        "question": "Assume a perfectly competitive market is in long-run equilibrium. If market demand permanently decreases, what will happen to the number of firms and the equilibrium price in the long run?",
        "image": null,
        "options": [
          "Number of firms increases; Price increases.",
          "Number of firms decreases; Price returns to the original level.", // Correct
          "Number of firms stays the same; Price decreases.",
          "Number of firms increases; Price decreases.",
          "Number of firms decreases; Price decreases permanently below the original level." // Lengthened distractor
        ],
        "correctAnswer": "B",
        "explanation": "A decrease in demand lowers the market price, causing short-run losses for firms. In the long run, firms will exit the industry due to these losses. Exit decreases market supply, causing the price to rise back up towards the original minimum average total cost level, restoring zero economic profit for the remaining firms."
      },
        {
          "id": 197,
          "subject": "ap_microeconomics",
          "unit": 2,
          "lessonIDS": ["2.1"],
          "unitName": "Supply and Demand",
          "question": "If consumer incomes decrease and good Z is an inferior good, which change will occur in the market for good Z?",
          "image": null,
          "options": [
            "Demand will decrease.",
            "Demand will increase.", // Correct
            "Supply will decrease.",
            "Supply will increase.",
            "Both demand and supply will decrease significantly." // Longer distractor
          ],
          "correctAnswer": "B",
          "explanation": "An inferior good is one for which demand increases as consumer income decreases. Therefore, a decrease in consumer incomes will cause the demand curve for good Z to shift to the right."
        },
        {
          "id": 198,
          "subject": "ap_microeconomics",
          "unit": 2,
          "lessonIDS": ["2.1"],
          "unitName": "Supply and Demand",
          "question": "Consider the market for smartphones. If the price of wireless earbuds, a complement to smartphones, increases sharply, what is the likely impact on the demand for smartphones?",
          "image": null,
          "options": [
            "Demand for smartphones increases.",
            "Demand for smartphones decreases.", // Correct
            "Quantity demanded for smartphones increases.",
            "Quantity demanded for smartphones decreases.",
            "No impact on smartphone demand occurs."
          ],
          "correctAnswer": "B",
          "explanation": "Complementary goods are consumed together. If the price of a complement (wireless earbuds) increases, the overall cost of using the related good (smartphones with earbuds) rises, leading to a decrease in demand for smartphones (a leftward shift of the demand curve)."
        },
        {
          "id": 199,
          "subject": "ap_microeconomics",
          "unit": 2,
          "lessonIDS": ["2.2"],
          "unitName": "Supply and Demand",
          "question": "Which of the following events would cause a rightward shift in the supply curve for cotton?",
          "image": null,
          "options": [
            "An increase in the price of cotton.",
            "A decrease in the price of fertilizer used to grow cotton.", // Correct
            "A decrease in the number of cotton farmers.",
            "An increase in the wages paid to cotton pickers.",
            "The expectation of much higher cotton prices next year." // Longer distractor
          ],
          "correctAnswer": "B",
          "explanation": "A decrease in the price of an input (like fertilizer) lowers production costs. This makes producers willing to supply more cotton at every price, shifting the supply curve to the right."
        },
        {
          "id": 200,
          "subject": "ap_microeconomics",
          "unit": 2,
          "lessonIDS": ["2.7"],
          "unitName": "Supply and Demand",
          "question": "If the current market price for a good is above the equilibrium price, which situation exists and what will happen?",
          "image": null,
          "options": [
            "A shortage exists, and the price will tend to rise.",
            "A surplus exists, and the price will tend to fall.", // Correct
            "Equilibrium exists, and the price will remain constant.",
            "A shortage exists, and the price will tend to fall.",
            "A surplus exists, and the price will tend to rise."
          ],
          "correctAnswer": "B",
          "explanation": "When the market price is above equilibrium, the quantity supplied exceeds the quantity demanded, resulting in a surplus. Market forces (sellers competing to sell excess inventory) will push the price down toward the equilibrium level."
        },
        {
          "id": 201,
          "subject": "ap_microeconomics",
          "unit": 2,
          "lessonIDS": ["2.3"],
          "unitName": "Supply and Demand",
          "question": "If the price elasticity of demand for gasoline is 0.2, a 10% increase in the price of gasoline will cause the quantity demanded to:",
          "image": null,
          "options": [
            "Decrease by 0.2%",
            "Decrease by 2%", // Correct
            "Decrease by 5%",
            "Decrease by 20%",
            "Increase by 2%"
          ],
          "correctAnswer": "B",
          "explanation": "Price elasticity of demand (PED) = % Change in Quantity Demanded / % Change in Price. Rearranging, % Change in Quantity Demanded = PED * % Change in Price. So, % Change in Qd = 0.2 * 10% = 2%. Since price increased, quantity demanded decreases."
        },
        {
          "id": 202,
          "subject": "ap_microeconomics",
          "unit": 2,
          "lessonIDS": ["2.3"],
          "unitName": "Supply and Demand",
          "question": "A local pizza restaurant finds that when it lowers its price per pizza from $12 to $10, its total revenue increases. This indicates that, in this price range, the demand for its pizza is:",
          "image": null,
          "options": [
            "Price inelastic",
            "Price elastic", // Correct
            "Unit price elastic",
            "Perfectly price inelastic",
            "Derived demand"
          ],
          "correctAnswer": "B",
          "explanation": "According to the total revenue test, if price decreases and total revenue increases, demand must be price elastic (PED > 1). The percentage increase in quantity demanded is larger than the percentage decrease in price."
        },
        {
          "id": 203,
          "subject": "ap_microeconomics",
          "unit": 2,
          "lessonIDS": ["2.3"],
          "unitName": "Supply and Demand",
          "question": "Which of the following goods is likely to have the most price inelastic demand?",
          "image": null,
          "options": [
            "A specific brand of luxury sports car",
            "Airline tickets for a vacation planned months in advance",
            "Insulin for a person with diabetes", // Correct
            "Gourmet coffee beans",
            "A specific type of breakfast cereal with many competitors" // Longer distractor
          ],
          "correctAnswer": "C",
          "explanation": "Demand tends to be more inelastic for goods that are necessities and have few close substitutes. Insulin is a necessity for diabetics with very few, if any, substitutes, making its demand highly price inelastic."
        },
        {
          "id": 204,
          "subject": "ap_microeconomics",
          "unit": 2,
          "lessonIDS": ["2.4"],
          "unitName": "Supply and Demand",
          "question": "If the price elasticity of supply for handmade wooden chairs is 0.8, and the price increases by 20%, the quantity supplied will:",
          "image": null,
          "options": [
            "Increase by 8%",
            "Increase by 16%", // Correct
            "Increase by 20%",
            "Increase by 25%",
            "Decrease by 16%"
          ],
          "correctAnswer": "B",
          "explanation": "Price elasticity of supply (PES) = % Change in Quantity Supplied / % Change in Price. Rearranging, % Change in Quantity Supplied = PES * % Change in Price. So, % Change in Qs = 0.8 * 20% = 16%. Since price increased, quantity supplied increases."
        },
        {
          "id": 205,
          "subject": "ap_microeconomics",
          "unit": 2,
          "lessonIDS": ["2.5"],
          "unitName": "Supply and Demand",
          "question": "The cross-price elasticity of demand between peanut butter and jelly is likely to be:",
          "image": null,
          "options": [
            "Positive, because they are substitutes.",
            "Negative, because they are complements.", // Correct
            "Zero, because they are unrelated.",
            "Positive, because they are both normal goods.",
            "Negative, because one is an inferior good."
          ],
          "correctAnswer": "B",
          "explanation": "Peanut butter and jelly are typically consumed together, making them complements. An increase in the price of one (e.g., peanut butter) would lead to a decrease in the quantity demanded of the other (jelly). Complements have a negative cross-price elasticity."
        },
        {
          "id": 206,
          "subject": "ap_microeconomics",
          "unit": 2,
          "lessonIDS": ["2.5"],
          "unitName": "Supply and Demand",
          "question": "If a 5% increase in consumer income leads to a 10% decrease in the quantity demanded of canned soup, what is the income elasticity of demand for canned soup, and what type of good is it?",
          "image": null,
          "options": [
            "Income elasticity is 0.5; it is a normal good.",
            "Income elasticity is -0.5; it is an inferior good.",
            "Income elasticity is 2; it is a normal good.",
            "Income elasticity is -2; it is an inferior good.", // Correct
            "Income elasticity is -2; it is a substitute good."
          ],
          "correctAnswer": "D",
          "explanation": "Income Elasticity of Demand = % Change in Quantity Demanded / % Change in Income = -10% / +5% = -2. Since the income elasticity is negative, canned soup is an inferior good (demand decreases as income increases)."
        },
        {
          "id": 207,
          "subject": "ap_microeconomics",
          "unit": 2,
          "lessonIDS": ["2.6"],
          "unitName": "Supply and Demand",
          "question": "Consumer surplus in a market is represented graphically by the area:",
          "image": null,
          "options": [
            "Below the demand curve and above the supply curve.",
            "Above the demand curve and below the equilibrium price.",
            "Below the equilibrium price and above the supply curve.",
            "Below the demand curve and above the equilibrium price.", // Correct
            "Between the supply and demand curves, to the right of equilibrium."
          ],
          "correctAnswer": "D",
          "explanation": "Consumer surplus measures the benefit buyers receive from participating in a market. It is the difference between what they are willing to pay (represented by the height of the demand curve) and what they actually pay (the market price), summed over all units purchased. Graphically, this is the area below the demand curve and above the market price."
        },
        {
          "id": 208,
          "subject": "ap_microeconomics",
          "unit": 2,
          "lessonIDS": ["2.6"],
          "unitName": "Supply and Demand",
          "question": "If the market price of a concert ticket is $50, but a consumer is willing to pay up to $80, this consumer's individual consumer surplus is:",
          "image": null,
          "options": [
            "$30", // Correct
            "$50",
            "$80",
            "$130",
            "$0"
          ],
          "correctAnswer": "A",
          "explanation": "Consumer surplus for an individual is the difference between their willingness to pay and the actual price paid. In this case, $80 (willingness to pay) - $50 (price) = $30."
        },
        {
          "id": 209,
          "subject": "ap_microeconomics",
          "unit": 2,
          "lessonIDS": ["2.8"],
          "unitName": "Supply and Demand",
          "question": "An effective (binding) price ceiling imposed on a competitive market will typically result in:",
          "image": null,
          "options": [
            "A surplus of the good.",
            "A shortage of the good.", // Correct
            "An increase in the quantity supplied.",
            "A decrease in the quantity demanded.",
            "The market reaching equilibrium efficiently." // Longer distractor
          ],
          "correctAnswer": "B",
          "explanation": "An effective price ceiling is set below the equilibrium price. At this artificially low price, the quantity demanded exceeds the quantity supplied, creating a market shortage."
        },
        {
          "id": 210,
          "subject": "ap_microeconomics",
          "unit": 2,
          "lessonIDS": ["2.8"],
          "unitName": "Supply and Demand",
          "question": "Suppose the government imposes a per-unit excise tax on the producers of widgets. How will this tax affect the market equilibrium price and quantity?",
          "image": null,
          "options": [
            "Price increases; Quantity increases.",
            "Price decreases; Quantity decreases.",
            "Price increases; Quantity decreases.", // Correct
            "Price decreases; Quantity increases.",
            "Price remains constant; Quantity decreases."
          ],
          "correctAnswer": "C",
          "explanation": "A per-unit tax on producers effectively increases their cost of production, shifting the supply curve to the left (or upward). This leads to a higher equilibrium price paid by consumers and a lower equilibrium quantity traded in the market."
        },
        {
          "id": 211,
          "subject": "ap_microeconomics",
          "unit": 2,
          "lessonIDS": ["2.9"],
          "unitName": "Supply and Demand",
          "question": "If a country imposes a tariff on imported sugar, which group is most likely to benefit in that country?",
          "image": null,
          "options": [
            "Domestic consumers of sugar.",
            "Foreign producers of sugar.",
            "Domestic producers of sugar.", // Correct
            "Workers in industries that use sugar as an input.",
            "The government of the exporting country."
          ],
          "correctAnswer": "C",
          "explanation": "A tariff on imported sugar raises the domestic price of sugar. This benefits domestic sugar producers because they can now sell their sugar at a higher price and face less competition from imports, leading to an increase in their producer surplus."
        },
        {
          "id": 212,
          "subject": "ap_microeconomics",
          "unit": 2,
          "lessonIDS": ["2.9"],
          "unitName": "Supply and Demand",
          "question": "Compared to free trade, imposing a binding import quota on a good will generally lead to:",
          "image": null,
          "options": [
            "A lower domestic price and higher consumer surplus.",
            "A lower domestic price and lower producer surplus.",
            "A higher domestic price and lower total economic surplus.", // Correct
            "A higher domestic price and higher total economic surplus.",
            "No change in domestic price but lower imports."
          ],
          "correctAnswer": "C",
          "explanation": "A binding import quota restricts the quantity of a good that can be imported. This reduction in supply raises the domestic price of the good. While domestic producers benefit, the loss in consumer surplus typically outweighs the gain in producer surplus (and any quota rent), resulting in a decrease in total economic surplus and a deadweight loss."
        },
        {
          "id": 213,
          "subject": "ap_microeconomics",
          "unit": 2,
          "lessonIDS": ["2.8"],
          "unitName": "Supply and Demand",
          "question": "If the demand for a product is perfectly inelastic and the supply curve is upward sloping, who bears the entire burden of a per-unit excise tax imposed on sellers?",
          "image": null,
          "options": [
            "Sellers bear the entire burden.",
            "Buyers bear the entire burden.", // Correct
            "The burden is shared equally.",
            "The government bears the burden.",
            "The burden cannot be determined."
          ],
          "correctAnswer": "B",
          "explanation": "Perfectly inelastic demand means consumers will buy the same quantity regardless of the price. When a tax is imposed on sellers, they can pass the full amount of the tax onto consumers in the form of a higher price without losing any sales quantity. Therefore, buyers bear the entire tax burden."
        },
        {
          "id": 214,
          "subject": "ap_microeconomics",
          "unit": 2,
          "lessonIDS": ["2.6", "2.8"],
          "unitName": "Supply and Demand",
          "question": "The imposition of an effective price floor on agricultural products typically leads to:",
          "image": null,
          "options": [
            "A decrease in producer surplus and a market shortage.",
            "An increase in producer surplus for those who sell, but a market surplus overall.", // Correct
            "A decrease in the quantity supplied by farmers.",
            "An increase in consumer surplus due to lower effective prices.",
            "An elimination of deadweight loss in the market."
          ],
          "correctAnswer": "B",
          "explanation": "An effective price floor is set above the equilibrium price, causing quantity supplied to exceed quantity demanded (a surplus). Sellers who can sell at the higher price benefit (increased producer surplus for them), but overall market efficiency decreases (deadweight loss), and consumer surplus decreases."
        },
        {
          "id": 215,
          "subject": "ap_microeconomics",
          "unit": 2,
          "lessonIDS": ["2.7", "2.2", "2.1"],
          "unitName": "Supply and Demand",
          "question": "Consider the market for electric cars. If the government offers a significant subsidy to buyers of electric cars, while simultaneously the cost of batteries (a key input) decreases, what is the expected effect on the equilibrium price and quantity of electric cars?",
          "image": null,
          "options": [
            "Price will increase; Quantity will increase.",
            "Price will decrease; Quantity will decrease.",
            "Price effect is indeterminate; Quantity will increase.", // Correct
            "Price will increase; Quantity effect is indeterminate.",
            "Price will decrease; Quantity effect is indeterminate."
          ],
          "correctAnswer": "C",
          "explanation": "The buyer subsidy increases demand (shifts right), putting upward pressure on price and quantity. The decrease in battery costs increases supply (shifts right), putting downward pressure on price and upward pressure on quantity. Both effects increase equilibrium quantity. However, the effect on equilibrium price is indeterminate because the demand shift pushes price up while the supply shift pushes price down."
        },
        {
          "id": 216,
          "subject": "ap_microeconomics",
          "unit": 2,
          "lessonIDS": ["2.6"],
          "unitName": "Supply and Demand",
          "question": "Total economic surplus in a market is maximized when:",
          "image": null,
          "options": [
            "Producer surplus is maximized, regardless of consumer surplus.",
            "Consumer surplus is maximized, regardless of producer surplus.",
            "The market produces the quantity where marginal benefit equals marginal cost.", // Correct
            "The government intervenes with price controls.",
            "The price elasticity of demand equals the price elasticity of supply."
          ],
          "correctAnswer": "C",
          "explanation": "Total economic surplus, the sum of consumer surplus and producer surplus, represents the total net benefit to society from market activity. This surplus is maximized at the competitive equilibrium quantity where the marginal benefit to consumers equals the marginal cost to producers, indicating allocative efficiency."
        }, 
          {
            "id": 217,
            "subject": "ap_microeconomics",
            "unit": 5,
            "lessonIDS": ["5.1"],
            "unitName": "Factor Markets",
            "question": "The demand for accountants is considered a derived demand primarily because it depends on the:",
            "image": null,
            "options": [
              "Supply of accounting graduates.",
              "Willingness of individuals to become accountants.",
              "Demand for the accounting services accountants provide.", // Correct
              "Cost of accounting software and technology.",
              "Wage rate paid to experienced accountants."
            ],
            "correctAnswer": "C",
            "explanation": "Derived demand means the demand for a factor of production (like accountants' labor) is derived from the demand for the good or service that factor produces (accounting services)."
          },
          {
            "id": 218,
            "subject": "ap_microeconomics",
            "unit": 5,
            "lessonIDS": ["5.1"],
            "unitName": "Factor Markets",
            "question": "Which term refers to the additional output produced when one more unit of a variable input, such as labor, is employed?",
            "image": null,
            "options": [
              "Average product",
              "Marginal revenue product",
              "Marginal product", // Correct
              "Total product",
              "Marginal factor cost"
            ],
            "correctAnswer": "C",
            "explanation": "Marginal product (specifically, marginal product of labor in this case) measures the change in total output resulting from hiring one additional unit of labor."
          },
          {
            "id": 219,
            "subject": "ap_microeconomics",
            "unit": 5,
            "lessonIDS": ["5.1", "5.3"],
            "unitName": "Factor Markets",
            "question": "For a firm selling its product in a perfectly competitive market, the marginal revenue product of an input is calculated by multiplying the input's marginal product by the:",
            "image": null,
            "options": [
              "Input's price",
              "Average total cost",
              "Average variable cost",
              "Product's price", // Correct
              "Marginal cost of the product"
            ],
            "correctAnswer": "D",
            "explanation": "Marginal Revenue Product (MRP) is the change in total revenue from employing one more unit of an input. MRP = Marginal Product (MP) x Marginal Revenue (MR). In a perfectly competitive product market, MR equals the product's price (P). Therefore, MRP = MP x P."
          },
          {
            "id": 220,
            "subject": "ap_microeconomics",
            "unit": 5,
            "lessonIDS": ["5.3"],
            "unitName": "Factor Markets",
            "question": "A profit-maximizing firm hires inputs in a competitive factor market up to the point where the input's:",
            "image": null,
            "options": [
              "Marginal product equals its price.",
              "Marginal revenue product equals its price (marginal factor cost).", // Correct
              "Average product equals its price.",
              "Marginal product equals marginal revenue product.",
              "Price equals the firm's marginal revenue."
            ],
            "correctAnswer": "B",
            "explanation": "The profit-maximization rule for hiring inputs is to employ units until the Marginal Revenue Product (MRP) of the input equals its Marginal Factor Cost (MFC). In a perfectly competitive factor market, the MFC is simply the market price (e.g., wage rate) of the input."
          },
          {
            "id": 221,
            "subject": "ap_microeconomics",
            "unit": 5,
            "lessonIDS": ["5.2"],
            "unitName": "Factor Markets",
            "question": "An increase in the productivity of labor, perhaps due to technological advancements, will cause which change in the labor market?",
            "image": null,
            "options": [
              "A decrease in the supply of labor.",
              "An increase in the supply of labor.",
              "A decrease in the demand for labor.",
              "An increase in the demand for labor.", // Correct
              "A decrease in both demand and supply of labor."
            ],
            "correctAnswer": "D",
            "explanation": "Increased labor productivity means each worker produces more output (higher Marginal Product). This increases the Marginal Revenue Product (MRP = MP x P) of labor, causing the demand curve for labor (which is the MRP curve) to shift to the right."
          },
          {
            "id": 222,
            "subject": "ap_microeconomics",
            "unit": 5,
            "lessonIDS": ["5.2"],
            "unitName": "Factor Markets",
            "question": "Which of the following events would most likely lead to a decrease in the equilibrium wage rate for coal miners?",
            "image": null,
            "options": [
              "An increase in the demand for coal.",
              "A decrease in the supply of coal miners due to stricter safety regulations.",
              "An increase in the price of natural gas, a substitute energy source.",
              "A decrease in the demand for coal due to environmental concerns.", // Correct
              "An increase in the productivity of coal miners."
            ],
            "correctAnswer": "D",
            "explanation": "A decrease in the demand for the final product (coal) leads to a decrease in the derived demand for the labor used to produce it (coal miners). This leftward shift in the labor demand curve results in a lower equilibrium wage rate and lower employment."
          },
          {
            "id": 223,
            "subject": "ap_microeconomics",
            "unit": 5,
            "lessonIDS": ["5.3"],
            "unitName": "Factor Markets",
            "question": "Suppose a firm uses labor and capital. The price of labor is $20, and its marginal product is 40 units. The price of capital is $50. To minimize costs for its current output level, the marginal product of capital should be:",
            "image": null,
            "options": [
              "20 units",
              "40 units",
              "50 units",
              "80 units",
              "100 units" // Correct
            ],
            "correctAnswer": "E",
            "explanation": "The least-cost combination rule states that MP_L / P_L = MP_K / P_K. Plugging in the values: 40 / $20 = MP_K / $50. This simplifies to 2 = MP_K / $50. Solving for MP_K gives MP_K = 2 * $50 = 100 units."
          },
          {
            "id": 224,
            "subject": "ap_microeconomics",
            "unit": 5,
            "lessonIDS": ["5.3"],
            "unitName": "Factor Markets",
            "question": "A firm is employing labor and capital such that the marginal product per dollar spent on labor is 5 utils, and the marginal product per dollar spent on capital is 3 utils. To minimize costs while producing the same output, the firm should:",
            "image": null,
            "options": [
              "Use more labor and less capital.", // Correct
              "Use less labor and more capital.",
              "Use less of both inputs.",
              "Use more of both inputs.",
              "Make no change to input usage." // Short distractor
            ],
            "correctAnswer": "A",
            "explanation": "The least-cost rule requires the marginal product per dollar spent to be equal across all inputs (MP_L/P_L = MP_K/P_K). Since the MP per dollar for labor (5) is greater than for capital (3), the firm gets more 'bang for its buck' from labor. It should substitute towards labor and away from capital until the ratios are equal."
          },
          {
            "id": 225,
            "subject": "ap_microeconomics",
            "unit": 5,
            "lessonIDS": ["5.4"],
            "unitName": "Factor Markets",
            "question": "Which market structure is characterized by a single buyer of a specific factor of production?",
            "image": null,
            "options": [
              "Monopoly",
              "Oligopoly",
              "Perfect competition",
              "Monopolistic competition",
              "Monopsony" // Correct
            ],
            "correctAnswer": "E",
            "explanation": "A monopsony is a market structure where there is only one buyer for a particular input (factor of production). This gives the buyer significant market power over the price paid for the input."
          },
          {
            "id": 226,
            "subject": "ap_microeconomics",
            "unit": 5,
            "lessonIDS": ["5.4"],
            "unitName": "Factor Markets",
            "question": "For a monopsonistic employer, the marginal factor cost (MFC) of labor is:",
            "image": null,
            "options": [
              "Equal to the wage rate.",
              "Less than the wage rate.",
              "Greater than the wage rate.", // Correct
              "Equal to the marginal revenue product.",
              "Perfectly elastic."
            ],
            "correctAnswer": "C",
            "explanation": "Because a monopsonist faces an upward-sloping labor supply curve, it must offer a higher wage to attract additional workers. Crucially, it must pay this higher wage to all existing workers as well, not just the new one. This makes the cost of hiring one more worker (MFC) greater than the wage paid to that worker."
          },
          {
            "id": 227,
            "subject": "ap_microeconomics",
            "unit": 5,
            "lessonIDS": ["5.4"],
            "unitName": "Factor Markets",
            "question": "Compared to a perfectly competitive labor market, a monopsonist will hire:",
            "image": null,
            "options": [
              "More workers and pay a higher wage.",
              "More workers and pay a lower wage.",
              "Fewer workers and pay a higher wage.",
              "Fewer workers and pay a lower wage.", // Correct
              "The same number of workers but pay a lower wage."
            ],
            "correctAnswer": "D",
            "explanation": "A monopsonist maximizes profit by hiring where MRP = MFC. Since MFC is above the labor supply curve, this intersection occurs at a lower quantity of labor compared to the competitive outcome (where MRP = Supply = Wage). The monopsonist then pays the lower wage indicated by the supply curve at that reduced quantity."
          },
          {
            "id": 228,
            "subject": "ap_microeconomics",
            "unit": 5,
            "lessonIDS": ["5.1", "5.3"],
            "unitName": "Factor Markets",
            "question": "A firm produces widgets using labor. The marginal product of the 5th worker is 10 widgets per hour. Widgets sell for $3 each in a competitive market. What is the marginal revenue product of the 5th worker?",
            "image": null,
            "options": [
              "$3 per hour",
              "$10 per hour",
              "$13 per hour",
              "$30 per hour", // Correct
              "$3.33 per hour"
            ],
            "correctAnswer": "D",
            "explanation": "Marginal Revenue Product (MRP) = Marginal Product (MP) x Price (P). MRP = 10 widgets/hour * $3/widget = $30 per hour."
          },
          {
            "id": 229,
            "subject": "ap_microeconomics",
            "unit": 5,
            "lessonIDS": ["5.3"],
            "unitName": "Factor Markets",
            "question": "If a firm hires labor in a perfectly competitive market where the wage is $25 per hour, and the marginal revenue product of the last worker hired is $20 per hour, the firm should:",
            "image": null,
            "options": [
              "Hire more workers to increase profit.",
              "Hire fewer workers to increase profit.", // Correct
              "Keep the same number of workers as profits are maximized.",
              "Increase the price of its product.",
              "Decrease the wage rate it pays."
            ],
            "correctAnswer": "B",
            "explanation": "A firm maximizes profit by hiring labor until MRP = Wage (MFC). Here, MRP ($20) < Wage ($25). The cost of the last worker ($25) is greater than the revenue they generate ($20). The firm should reduce employment until MRP equals the wage."
          },
          {
            "id": 230,
            "subject": "ap_microeconomics",
            "unit": 5,
            "lessonIDS": ["5.2"],
            "unitName": "Factor Markets",
            "question": "Which factor would likely increase the elasticity of demand for labor in a particular industry?",
            "image": null,
            "options": [
              "A decrease in the elasticity of demand for the final product.",
              "A smaller proportion of total costs accounted for by labor.",
              "Greater difficulty in substituting capital for labor.",
              "A longer time period being considered.", // Correct
              "A decrease in the number of substitute inputs available." // Longer distractor
            ],
            "correctAnswer": "D",
            "explanation": "The demand for labor is generally more elastic in the long run than in the short run. Over longer periods, firms have more time to adjust production processes and substitute between inputs (like capital and labor) in response to wage changes."
          },
          {
            "id": 231,
            "subject": "ap_microeconomics",
            "unit": 5,
            "lessonIDS": ["5.2"],
            "unitName": "Factor Markets",
            "question": "If the government mandates new safety training for all construction workers, increasing their skills and productivity, how might this impact the labor market for these workers?",
            "image": null,
            "options": [
              "Demand increases, Supply decreases, Wage effect indeterminate.",
              "Demand increases, Supply may increase or decrease, Wage likely increases.", // Correct ( nuanced )
              "Demand decreases, Supply increases, Wage decreases.",
              "Demand decreases, Supply decreases, Wage effect indeterminate.",
              "Demand and Supply remain unchanged, Wage decreases."
            ],
            "correctAnswer": "B",
            "explanation": "Increased productivity shifts the labor demand curve right (higher MRP). The training might increase the desirability/qualification (shifting supply left) or attract more workers (shifting supply right). However, the strong increase in demand due to higher productivity generally leads to an increase in the equilibrium wage, regardless of the exact supply shift."
          },
          {
            "id": 232,
            "subject": "ap_microeconomics",
            "unit": 5,
            "lessonIDS": ["5.3"],
            "unitName": "Factor Markets",
            "question": "A firm uses capital (K) and labor (L). Currently, MPk/Pk > MPl/Pl. To produce the same output at a lower cost, the firm should use:",
            "image": null,
            "options": [
              "More K and more L.",
              "Less K and less L.",
              "More K and less L.", // Correct
              "Less K and more L.",
              "The current combination, as it is already optimal."
            ],
            "correctAnswer": "C",
            "explanation": "The condition MPk/Pk > MPl/Pl means the firm gets more marginal product per dollar spent on capital than on labor. To minimize cost for a given output, the firm should substitute towards the relatively more productive input (per dollar) and away from the relatively less productive input. Thus, it should use more capital and less labor."
          },
          {
            "id": 233,
            "subject": "ap_microeconomics",
            "unit": 5,
            "lessonIDS": ["5.4"],
            "unitName": "Factor Markets",
            "question": "A key difference between a firm hiring labor in a perfectly competitive market versus a monopsony market is that the monopsonist faces:",
            "image": null,
            "options": [
              "A perfectly elastic labor supply curve.",
              "A marginal factor cost curve below the labor supply curve.",
              "An upward-sloping labor supply curve.", // Correct (and MFC above it)
              "A downward-sloping marginal revenue product curve.", // Both face this
              "A need to pay workers their marginal revenue product."
            ],
            "correctAnswer": "C",
            "explanation": "A perfectly competitive firm faces a perfectly elastic (horizontal) labor supply at the market wage. A monopsonist, being the sole buyer, faces the entire upward-sloping market labor supply curve, meaning it must raise wages to attract more workers."
          },
          {
            "id": 234,
            "subject": "ap_microeconomics",
            "unit": 5,
            "lessonIDS": ["5.2"],
            "unitName": "Factor Markets",
            "question": "If the price of capital, a substitute input for labor, decreases significantly, what is the likely effect on the demand for labor?",
            "image": null,
            "options": [
              "Demand for labor will increase due to the output effect.",
              "Demand for labor will decrease due to the substitution effect.", // Correct (primary effect)
              "Demand for labor will remain unchanged.",
              "Supply of labor will decrease.",
              "The effect is indeterminate without knowing the output effect's strength." // Longer, plausible distractor
            ],
            "correctAnswer": "B",
            "explanation": "When the price of a substitute input (capital) falls, firms have an incentive to substitute away from the relatively more expensive input (labor) towards the cheaper input (capital). This substitution effect causes the demand for labor to decrease (shift left)."
          },
          {
            "id": 235,
            "subject": "ap_microeconomics",
            "unit": 5,
            "lessonIDS": ["5.3"],
            "unitName": "Factor Markets",
            "question": "Consider a firm where the marginal product of the last worker hired is 5 units, the product price is $10, and the wage rate is $60. This firm is:",
            "image": null,
            "options": [
              "Maximizing profit.",
              "Hiring too much labor.", // Correct
              "Hiring too little labor.",
              "Experiencing diminishing marginal product.", // Likely true, but not the hiring decision issue
              "Operating in a monopsony market."
            ],
            "correctAnswer": "B",
            "explanation": "The firm's Marginal Revenue Product (MRP) = MP x P = 5 x $10 = $50. The Marginal Factor Cost (MFC) is the wage rate, $60. Since MRP ($50) < MFC ($60), the cost of the last worker exceeds the revenue generated. The firm should hire fewer workers."
          },
          {
            "id": 236,
            "subject": "ap_microeconomics",
            "unit": 5,
            "lessonIDS": ["5.2"],
            "unitName": "Factor Markets",
            "question": "An increase in immigration into a country is likely to affect the labor market by:",
            "image": null,
            "options": [
              "Increasing labor demand and increasing wages.",
              "Decreasing labor demand and decreasing wages.",
              "Increasing labor supply and decreasing wages.", // Correct
              "Decreasing labor supply and increasing wages.",
              "Increasing both labor demand and labor supply, making the wage effect indeterminate." // Longer distractor
            ],
            "correctAnswer": "C",
            "explanation": "Immigration increases the number of available workers at any given wage rate, shifting the labor supply curve to the right. Assuming labor demand remains unchanged, this leads to a lower equilibrium wage rate and higher equilibrium employment."
          }, 
            {
              "id": 237,
              "subject": "ap_microeconomics",
              "unit": 4,
              "lessonIDS": ["4.1"],
              "unitName": "Imperfect Competition",
              "question": "Which characteristic distinguishes imperfectly competitive firms from perfectly competitive firms?",
              "image": null,
              "options": [
                "The goal of profit maximization.",
                "The existence of marginal costs.",
                "The ability to influence the market price of their product.", // Correct
                "Operation in the short run versus the long run.",
                "The presence of variable inputs in production."
              ],
              "correctAnswer": "C",
              "explanation": "Perfectly competitive firms are price takers, meaning they accept the market price. Imperfectly competitive firms (monopoly, oligopoly, monopolistic competition) have some degree of market power, allowing them to influence price."
            },
            {
              "id": 238,
              "subject": "ap_microeconomics",
              "unit": 4,
              "lessonIDS": ["4.2"],
              "unitName": "Imperfect Competition",
              "question": "Significant barriers to entry are a key characteristic of which market structure?",
              "image": null,
              "options": [
                "Perfect competition only.",
                "Monopolistic competition only.",
                "Both perfect competition and monopolistic competition.",
                "Oligopoly and monopoly.", // Correct
                "Monopolistic competition and oligopoly."
              ],
              "correctAnswer": "D",
              "explanation": "Barriers to entry, which prevent or discourage new firms from entering a market, are defining features of both oligopoly (significant barriers) and monopoly (high or complete barriers). Perfect and monopolistic competition feature low or no significant barriers to entry."
            },
            {
              "id": 239,
              "subject": "ap_microeconomics",
              "unit": 4,
              "lessonIDS": ["4.2"],
              "unitName": "Imperfect Competition",
              "question": "For a single-price monopolist, why is the marginal revenue curve always below the demand curve?",
              "image": null,
              "options": [
                "Because the monopolist must increase the price on all previous units to sell more.",
                "Because the firm faces perfectly elastic demand from consumers.",
                "Because marginal cost is increasing.",
                "Because the monopolist must lower the price on all units to sell an additional unit.", // Correct
                "Because average total cost is decreasing due to economies of scale." // Longer distractor
              ],
              "correctAnswer": "D",
              "explanation": "A monopolist faces the downward-sloping market demand curve. To sell one more unit, it must lower the price not only for that unit but for all preceding units as well (price effect). This means the additional revenue gained (marginal revenue) is less than the price of the last unit sold."
            },
            {
              "id": 240,
              "subject": "ap_microeconomics",
              "unit": 4,
              "lessonIDS": ["4.2"],
              "unitName": "Imperfect Competition",
              "question": "A profit-maximizing single-price monopolist will set its output level where:",
              "image": null,
              "options": [
                "Price equals marginal cost.",
                "Marginal revenue equals marginal cost.", // Correct
                "Demand equals average total cost.",
                "Marginal revenue equals zero.",
                "Price equals minimum average total cost."
              ],
              "correctAnswer": "B",
              "explanation": "Like all profit-maximizing firms, a monopolist produces the quantity where marginal revenue (MR) equals marginal cost (MC). The price is then determined by finding the point on the demand curve corresponding to that quantity."
            },
            {
              "id": 241,
              "subject": "ap_microeconomics",
              "unit": 4,
              "lessonIDS": ["4.2"],
              "unitName": "Imperfect Competition",
              "question": "Compared to the socially optimal (allocatively efficient) level of output, a single-price monopolist typically produces:",
              "image": null,
              "options": [
                "More output and charges a lower price.",
                "Less output and charges a higher price.", // Correct
                "The same output but charges a higher price.",
                "Less output and charges the same price.",
                "More output and charges a higher price."
              ],
              "correctAnswer": "B",
              "explanation": "Allocative efficiency occurs where Price (reflecting marginal benefit) equals Marginal Cost. A single-price monopolist maximizes profit where MR = MC, which occurs at a lower quantity than where P = MC. The monopolist then charges a price higher than MC, leading to underproduction relative to the social optimum and deadweight loss."
            },
            {
              "id": 242,
              "subject": "ap_microeconomics",
              "unit": 4,
              "lessonIDS": ["4.2"],
              "unitName": "Imperfect Competition",
              "question": "A natural monopoly exists when, over the relevant range of market demand:",
              "image": null,
              "options": [
                "Marginal cost is decreasing.",
                "Average total cost is decreasing.", // Correct
                "The demand curve is perfectly inelastic.",
                "Marginal revenue is positive.",
                "Barriers to entry are created by government patents."
              ],
              "correctAnswer": "B",
              "explanation": "A natural monopoly arises when economies of scale are so significant that one firm can supply the entire market at a lower average total cost than two or more firms could. This implies the long-run average total cost curve is downward sloping over the entire range of market demand."
            },
            {
              "id": 243,
              "subject": "ap_microeconomics",
              "unit": 4,
              "lessonIDS": ["4.3"],
              "unitName": "Imperfect Competition",
              "question": "Which condition is necessary for a firm to practice price discrimination?",
              "image": null,
              "options": [
                "The firm must be perfectly competitive.",
                "The firm must face identical demand curves from all customer groups.",
                "The firm must be able to prevent resale of its product between customer groups.", // Correct
                "The firm must be experiencing economies of scale.",
                "The firm must produce where marginal revenue equals zero."
              ],
              "correctAnswer": "C",
              "explanation": "To successfully price discriminate, a firm needs market power, the ability to segment its customers based on willingness to pay (different elasticities), and crucially, the ability to prevent low-price buyers from reselling the product to high-price buyers (arbitrage)."
            },
            {
              "id": 244,
              "subject": "ap_microeconomics",
              "unit": 4,
              "lessonIDS": ["4.3"],
              "unitName": "Imperfect Competition",
              "question": "A firm that engages in perfect price discrimination charges each customer:",
              "image": null,
              "options": [
                "A price equal to marginal cost.",
                "A price equal to average total cost.",
                "The same price, maximizing total revenue.",
                "Their maximum willingness to pay.", // Correct
                "A price based on the elasticity of supply."
              ],
              "correctAnswer": "D",
              "explanation": "Perfect price discrimination involves charging every single customer the highest price they are willing to pay for each unit consumed. This allows the firm to capture all consumer surplus as profit and produce the allocatively efficient quantity."
            },
            {
              "id": 245,
              "subject": "ap_microeconomics",
              "unit": 4,
              "lessonIDS": ["4.4"],
              "unitName": "Imperfect Competition",
              "question": "Which market structure is characterized by many firms selling differentiated products with easy entry and exit?",
              "image": null,
              "options": [
                "Perfect competition",
                "Monopoly",
                "Oligopoly",
                "Monopolistic competition", // Correct
                "Monopsony"
              ],
              "correctAnswer": "D",
              "explanation": "Monopolistic competition features a large number of firms, low barriers to entry and exit (similar to perfect competition), but crucially, firms sell products that are differentiated through branding, features, or location, giving them some degree of market power."
            },
            {
              "id": 246,
              "subject": "ap_microeconomics",
              "unit": 4,
              "lessonIDS": ["4.4"],
              "unitName": "Imperfect Competition",
              "question": "In long-run equilibrium, a monopolistically competitive firm produces an output level where:",
              "image": null,
              "options": [
                "Price equals marginal cost and average total cost is minimized.",
                "Price equals marginal cost and economic profit is positive.",
                "Price equals average total cost, and price is greater than marginal cost.", // Correct
                "Marginal revenue equals average total cost and economic profit is zero.",
                "Price equals minimum average variable cost and profits are maximized."
              ],
              "correctAnswer": "C",
              "explanation": "Due to easy entry, monopolistically competitive firms earn zero economic profit in the long run, meaning price equals average total cost (P = ATC). However, because they face a downward-sloping demand curve due to product differentiation, they maximize profit where MR = MC, which occurs at an output where P > MC. They also typically operate with excess capacity (not at minimum ATC)."
            },
            {
              "id": 247,
              "subject": "ap_microeconomics",
              "unit": 4,
              "lessonIDS": ["4.4"],
              "unitName": "Imperfect Competition",
              "question": "Product differentiation is a key characteristic of which market structure(s)?",
              "image": null,
              "options": [
                "Perfect competition only.",
                "Monopoly only.",
                "Monopolistic competition and oligopoly.", // Correct
                "Perfect competition and monopolistic competition.",
                "Oligopoly and monopoly."
              ],
              "correctAnswer": "C",
              "explanation": "Product differentiation, where firms distinguish their products from competitors' through branding, quality, features, or service, is central to monopolistic competition. It can also exist in oligopolies, although some oligopolies may feature homogeneous products."
            },
            {
              "id": 248,
              "subject": "ap_microeconomics",
              "unit": 4,
              "lessonIDS": ["4.4"],
              "unitName": "Imperfect Competition",
              "question": "Excess capacity in monopolistic competition refers to the fact that firms, in long-run equilibrium, produce:",
              "image": null,
              "options": [
                "More output than is allocatively efficient.",
                "Less output than the level that minimizes average total cost.", // Correct
                "More output than the level that minimizes average total cost.",
                "An output level where marginal cost exceeds price.",
                "An output level where price equals marginal cost exactly."
              ],
              "correctAnswer": "B",
              "explanation": "In long-run equilibrium, a monopolistically competitive firm operates where P = ATC on the downward-sloping portion of its ATC curve, not at the minimum point of ATC. This means it produces less output than the quantity that would achieve productive efficiency (minimum ATC), resulting in excess capacity."
            },
            {
              "id": 249,
              "subject": "ap_microeconomics",
              "unit": 4,
              "lessonIDS": ["4.5"],
              "unitName": "Imperfect Competition",
              "question": "The most distinguishing characteristic of oligopoly is:",
              "image": null,
              "options": [
                "A single seller dominating the entire market.",
                "Firms selling completely identical products with no differentiation.",
                "The absence of any significant barriers to entry or exit.",
                "Firms recognizing their strategic interdependence.", // Correct
                "Demand being perfectly elastic for each individual firm."
              ],
              "correctAnswer": "D",
              "explanation": "Oligopoly is defined by a few dominant firms where each firm's actions (regarding price, output, advertising) significantly affect its rivals, and each firm considers these rivals' potential reactions when making decisions. This is known as strategic interdependence."
            },
            {
              "id": 250,
              "subject": "ap_microeconomics",
              "unit": 4,
              "lessonIDS": ["4.5"],
              "unitName": "Imperfect Competition",
              "question": "A group of firms that formally agree to coordinate their production and pricing decisions to act like a monopolist is called:",
              "image": null,
              "options": [
                "A monopsony",
                "A natural monopoly",
                "A cartel", // Correct
                "A monopolistically competitive group",
                "A perfectly competitive alliance"
              ],
              "correctAnswer": "C",
              "explanation": "A cartel is an explicit agreement among competing firms, typically in an oligopoly, to fix prices, limit output, or divide markets, effectively attempting to act collectively as a monopoly to maximize joint profits. Such agreements are often illegal."
            },
            {
              "id": 251,
              "subject": "ap_microeconomics",
              "unit": 4,
              "lessonIDS": ["4.5"],
              "unitName": "Imperfect Competition",
              "question": "In game theory, a dominant strategy is one that:",
              "image": null,
              "options": [
                "Guarantees the highest possible payoff for both players combined.",
                "Is the best choice for a player regardless of the strategy chosen by the other player.", // Correct
                "Leads to a Nash equilibrium only if both players have one.",
                "Involves cooperating with the other player to achieve a mutually beneficial outcome.",
                "Changes depending on the rival player's anticipated move." // Longer distractor
              ],
              "correctAnswer": "B",
              "explanation": "A dominant strategy exists for a player if that strategy yields a better payoff than any other strategy they could choose, no matter what strategy the opposing player selects."
            },
            {
              "id": 252,
              "subject": "ap_microeconomics",
              "unit": 4,
              "lessonIDS": ["4.5"],
              "unitName": "Imperfect Competition",
              "question": "A Nash equilibrium in a game occurs when:",
              "image": null,
              "options": [
                "Each player chooses their dominant strategy, if available.",
                "The sum of the payoffs for all players is maximized.",
                "No player can improve their outcome by unilaterally changing their strategy, given the other players' strategies.", // Correct
                "One player forces the other player into making a suboptimal choice.",
                "Both players agree to cooperate before making their choices."
              ],
              "correctAnswer": "C",
              "explanation": "A Nash equilibrium represents a stable outcome where each player is doing the best they can (maximizing their own payoff) given the actions of all other players. No player has an incentive to deviate from their chosen strategy alone."
            },
            {
              "id": 253,
              "subject": "ap_microeconomics",
              "unit": 4,
              "lessonIDS": ["4.1"],
              "unitName": "Imperfect Competition",
              "question": "Allocative inefficiency in imperfectly competitive markets arises primarily because:",
              "image": null,
              "options": [
                "Firms earn zero economic profit in the long run.",
                "Firms fail to minimize average total cost.",
                "Price is greater than marginal cost at the profit-maximizing output.", // Correct
                "Marginal revenue is equal to price for these firms.",
                "Significant barriers to entry prevent competition completely." // Longer distractor
              ],
              "correctAnswer": "C",
              "explanation": "Allocative efficiency occurs when resources are allocated such that Price (representing marginal social benefit) equals Marginal Cost. Imperfectly competitive firms maximize profit where MR = MC, but because their demand curve is downward sloping (P > MR), they produce where P > MC, meaning the value society places on the last unit exceeds the cost of producing it."
            },
            {
              "id": 254,
              "subject": "ap_microeconomics",
              "unit": 4,
              "lessonIDS": ["4.2"],
              "unitName": "Imperfect Competition",
              "question": "A single-price monopolist maximizes total revenue when it produces the quantity where:",
              "image": null,
              "options": [
                "Marginal revenue equals marginal cost.",
                "Marginal revenue equals zero.", // Correct
                "Price equals marginal cost.",
                "Average total cost is minimized.",
                "Demand is unit elastic." // Closely related, but MR=0 is the direct rule
              ],
              "correctAnswer": "B",
              "explanation": "Total revenue is maximized when producing one more unit adds zero additional revenue, which means marginal revenue (MR) is equal to zero. This typically occurs at the midpoint of a linear demand curve, where demand is unit elastic."
            },
            {
              "id": 255,
              "subject": "ap_microeconomics",
              "unit": 4,
              "lessonIDS": ["4.4"],
              "unitName": "Imperfect Competition",
              "question": "Compared to a perfectly competitive firm in long-run equilibrium, a monopolistically competitive firm in long-run equilibrium will charge:",
              "image": null,
              "options": [
                "A lower price and produce more output.",
                "The same price and produce the same output.",
                "A higher price and produce less output.", // Correct
                "A higher price and produce the same output.",
                "A lower price and produce less output."
              ],
              "correctAnswer": "C",
              "explanation": "Both firms earn zero economic profit in the long run (P=ATC). However, the monopolistically competitive firm faces a downward-sloping demand curve and operates with excess capacity (not at min ATC), resulting in P > MC and typically a lower quantity and higher price compared to the perfectly competitive outcome where P = MC = min ATC."
            },
            {
              "id": 256,
              "subject": "ap_microeconomics",
              "unit": 4,
              "lessonIDS": ["4.5"],
              "unitName": "Imperfect Competition",
              "question": "Interdependence among firms is a key feature primarily associated with which market structure?",
              "image": null,
              "options": [
                "Perfect competition",
                "Monopoly",
                "Oligopoly", // Correct
                "Monopolistic competition",
                "Natural monopoly"
              ],
              "correctAnswer": "C",
              "explanation": "Strategic interdependence, where firms must consider the actions and reactions of their few competitors when making decisions about price, output, or advertising, is the hallmark of an oligopoly."
            }, 
              {
                "id": 257,
                "subject": "ap_macroeconomics",
                "unit": 6,
                "lessonIDS": ["6.1"],
                "unitName": "Open Economy - International Trade and Finance",
                "question": "Which of the following transactions would be recorded as a debit in the United States current account?",
                "image": null,
                "options": [
                  "A U.S. resident purchases souvenirs while traveling in France.", // Correct
                  "A French company buys software from a U.S. developer.",
                  "The U.S. government receives interest payments on loans made to other countries.",
                  "A German tourist pays for a hotel stay in New York City.",
                  "A U.S. resident receives a dividend payment from a foreign company."
                ],
                "correctAnswer": "A",
                "explanation": "The current account records flows of goods, services, income, and transfers. Spending by U.S. residents on foreign goods or services (like tourism abroad) represents an import of services and is recorded as a debit (outflow of funds) in the U.S. current account."
              },
              {
                "id": 258,
                "subject": "ap_macroeconomics",
                "unit": 6,
                "lessonIDS": ["6.1"],
                "unitName": "Open Economy - International Trade and Finance",
                "question": "A country's balance on the financial account (formerly capital and financial account) is primarily determined by the difference between:",
                "image": null,
                "options": [
                  "Exports and imports of goods.",
                  "Exports and imports of services.",
                  "Income received from abroad and income paid to foreigners.",
                  "Its sales of assets to foreigners and its purchases of assets from foreigners.", // Correct
                  "Net unilateral transfers."
                ],
                "correctAnswer": "D",
                "explanation": "The financial account records transactions involving the purchase and sale of financial and real assets, such as stocks, bonds, and direct investments. A surplus occurs when foreign purchases of domestic assets exceed domestic purchases of foreign assets (a net capital inflow)."
              },
              {
                "id": 259,
                "subject": "ap_macroeconomics",
                "unit": 6,
                "lessonIDS": ["6.1"],
                "unitName": "Open Economy - International Trade and Finance",
                "question": "If a country has a financial account surplus, it implies that:",
                "image": null,
                "options": [
                  "Its exports exceed its imports.",
                  "Its current account must also be in surplus.",
                  "It is experiencing a net financial capital inflow.", // Correct
                  "It is experiencing a net financial capital outflow.",
                  "Its net investment income from abroad is positive."
                ],
                "correctAnswer": "C",
                "explanation": "A financial account surplus means that the inflow of funds from foreigners buying the country's assets is greater than the outflow of funds from residents buying foreign assets. This represents a net inflow of financial capital."
              },
              {
                "id": 260,
                "subject": "ap_macroeconomics",
                "unit": 6,
                "lessonIDS": ["6.2"],
                "unitName": "Open Economy - International Trade and Finance",
                "question": "If the exchange rate between the US dollar and the Japanese yen changes from $1 = 110 yen to $1 = 100 yen, which of the following has occurred?",
                "image": null,
                "options": [
                  "The dollar has appreciated.",
                  "The yen has depreciated.",
                  "The dollar has depreciated.", // Correct
                  "Both currencies have appreciated.",
                  "Relative price levels must have changed." // Longer distractor
                ],
                "correctAnswer": "C",
                "explanation": "Previously, $1 could buy 110 yen. Now, $1 can only buy 100 yen. This means the dollar has weakened, or depreciated, relative to the yen. Conversely, the yen has appreciated relative to the dollar."
              },
              {
                "id": 261,
                "subject": "ap_macroeconomics",
                "unit": 6,
                "lessonIDS": ["6.3"],
                "unitName": "Open Economy - International Trade and Finance",
                "question": "An increase in consumer preference in the United States for goods produced in Mexico will affect the foreign exchange market by:",
                "image": null,
                "options": [
                  "Increasing the supply of US dollars and decreasing the demand for Mexican pesos.",
                  "Increasing the demand for US dollars and increasing the supply of Mexican pesos.",
                  "Increasing the supply of US dollars and increasing the demand for Mexican pesos.", // Correct
                  "Decreasing the demand for US dollars and decreasing the supply of Mexican pesos.",
                  "Causing no change in either market initially." // Short distractor
                ],
                "correctAnswer": "C",
                "explanation": "To buy more Mexican goods, US consumers need pesos. They supply US dollars to the foreign exchange market to buy pesos. This increases the supply of dollars and simultaneously increases the demand for pesos."
              },
              {
                "id": 262,
                "subject": "ap_macroeconomics",
                "unit": 6,
                "lessonIDS": ["6.3"],
                "unitName": "Open Economy - International Trade and Finance",
                "question": "Which of the following would most likely cause the demand curve for the Euro to shift to the left in the foreign exchange market?",
                "image": null,
                "options": [
                  "An increase in real interest rates within the Eurozone.",
                  "A decrease in incomes in the United States.", // Correct
                  "An increase in European preferences for US goods.",
                  "Expectations that the Euro will appreciate in the future.",
                  "A decrease in the European price level relative to the US."
                ],
                "correctAnswer": "B",
                "explanation": "A decrease in incomes in the United States would lead US consumers to buy fewer goods overall, including fewer imports from the Eurozone. This reduced demand for European goods translates into a decreased demand for Euros needed to purchase them, shifting the demand curve for Euros left."
              },
              {
                "id": 263,
                "subject": "ap_macroeconomics",
                "unit": 6,
                "lessonIDS": ["6.4"],
                "unitName": "Open Economy - International Trade and Finance",
                "question": "If the inflation rate in Country A is significantly higher than in Country B, what is the expected effect on the nominal exchange rate between their currencies under a flexible exchange rate system?",
                "image": null,
                "options": [
                  "Country A's currency will appreciate.",
                  "Country B's currency will depreciate.",
                  "Country A's currency will depreciate.", // Correct
                  "The exchange rate will remain stable due to purchasing power parity.",
                  "Both currencies will depreciate against a third currency." // Longer distractor
                ],
                "correctAnswer": "C",
                "explanation": "Higher inflation in Country A makes its goods relatively more expensive. This reduces foreign demand for A's goods (decreasing demand for A's currency) and increases A's residents' demand for relatively cheaper foreign goods (increasing supply of A's currency). Both effects cause Country A's currency to depreciate."
              },
              {
                "id": 264,
                "subject": "ap_macroeconomics",
                "unit": 6,
                "lessonIDS": ["6.4", "4.6"],
                "unitName": "Open Economy - International Trade and Finance",
                "question": "Expansionary monetary policy conducted by the U.S. Federal Reserve will most likely lead to which combination of effects on U.S. real interest rates and the international value of the dollar?",
                "image": null,
                "options": [
                  "Interest rates decrease; Dollar appreciates.",
                  "Interest rates decrease; Dollar depreciates.", // Correct
                  "Interest rates increase; Dollar appreciates.",
                  "Interest rates increase; Dollar depreciates.",
                  "Interest rates unchanged; Dollar depreciates."
                ],
                "correctAnswer": "B",
                "explanation": "Expansionary monetary policy lowers nominal and real interest rates in the short run. Lower real interest rates reduce the demand for U.S. assets by foreign investors (decreasing demand for dollars) and increase U.S. investors' demand for foreign assets (increasing supply of dollars), causing the dollar to depreciate."
              },
              {
                "id": 265,
                "subject": "ap_macroeconomics",
                "unit": 6,
                "lessonIDS": ["6.4", "3.8"],
                "unitName": "Open Economy - International Trade and Finance",
                "question": "An increase in government budget deficit spending financed by borrowing tends to cause which sequence of effects in an open economy?",
                "image": null,
                "options": [
                  "Lower real interest rates, capital outflow, currency depreciation.",
                  "Lower real interest rates, capital inflow, currency appreciation.",
                  "Higher real interest rates, capital outflow, currency depreciation.",
                  "Higher real interest rates, capital inflow, currency appreciation.", // Correct
                  "No change in real interest rates, but currency depreciation."
                ],
                "correctAnswer": "D",
                "explanation": "Increased government borrowing increases the demand for loanable funds, raising real interest rates. Higher real interest rates attract foreign financial capital (inflow), increasing the demand for the domestic currency and causing it to appreciate."
              },
              {
                "id": 266,
                "subject": "ap_macroeconomics",
                "unit": 6,
                "lessonIDS": ["6.6"],
                "unitName": "Open Economy - International Trade and Finance",
                "question": "Which of the following describes a financial capital inflow for the United States?",
                "image": null,
                "options": [
                  "A U.S. company builds a factory in Mexico.",
                  "A U.S. resident buys bonds issued by the German government.",
                  "A Japanese bank purchases U.S. Treasury bonds.", // Correct
                  "A U.S. tourist spends money in Italy.",
                  "The U.S. sends foreign aid to Egypt."
                ],
                "correctAnswer": "C",
                "explanation": "A financial capital inflow occurs when foreign entities purchase domestic assets. A Japanese bank buying U.S. Treasury bonds represents foreigners acquiring U.S. financial assets, resulting in an inflow of funds to the U.S. financial account."
              },
              {
                "id": 267,
                "subject": "ap_macroeconomics",
                "unit": 6,
                "lessonIDS": ["6.5"],
                "unitName": "Open Economy - International Trade and Finance",
                "question": "If the U.S. dollar appreciates relative to the currencies of its major trading partners, what is the likely impact on U.S. aggregate demand?",
                "image": null,
                "options": [
                  "Aggregate demand will increase due to higher export revenues.",
                  "Aggregate demand will decrease due to a fall in net exports.", // Correct
                  "Aggregate demand will remain unchanged, but SRAS will shift left.",
                  "Aggregate demand will increase due to cheaper imports boosting consumption.",
                  "Aggregate demand will decrease due to resulting higher interest rates." // Longer distractor
                ],
                "correctAnswer": "B",
                "explanation": "An appreciating dollar makes U.S. exports more expensive for foreigners (decreasing exports) and makes imports cheaper for U.S. residents (increasing imports). The resulting decrease in net exports (X-M) reduces aggregate demand."
              },
              {
                "id": 268,
                "subject": "ap_macroeconomics",
                "unit": 6,
                "lessonIDS": ["6.5"],
                "unitName": "Open Economy - International Trade and Finance",
                "question": "A depreciation of a country's currency is likely to have what effect on its domestic price level in the short run?",
                "image": null,
                "options": [
                  "Decrease the price level due to cheaper imports.",
                  "Increase the price level due to increased aggregate demand.", // Correct
                  "Have no effect on the domestic price level.",
                  "Decrease the price level due to lower export demand.",
                  "Increase the price level only if the central bank intervenes."
                ],
                "correctAnswer": "B",
                "explanation": "Currency depreciation makes exports cheaper and imports more expensive, leading to an increase in net exports. This rise in net exports boosts aggregate demand, putting upward pressure on the domestic price level in the short run."
              },
              {
                "id": 269,
                "subject": "ap_macroeconomics",
                "unit": 6,
                "lessonIDS": ["6.4", "6.6"],
                "unitName": "Open Economy - International Trade and Finance",
                "question": "An increase in real interest rates in the United States relative to other countries would likely lead to:",
                "image": null,
                "options": [
                  "A surplus in the U.S. current account.",
                  "A decrease in the demand for U.S. dollars.",
                  "An increase in U.S. financial capital outflows.",
                  "An increase in the demand for U.S. financial assets by foreigners.", // Correct
                  "Depreciation of the U.S. dollar."
                ],
                "correctAnswer": "D",
                "explanation": "Higher real returns make U.S. financial assets (like bonds) more attractive to foreign investors compared to assets elsewhere. This increased attractiveness leads to greater demand for these U.S. assets, resulting in financial capital inflows."
              },
              {
                "id": 270,
                "subject": "ap_macroeconomics",
                "unit": 6,
                "lessonIDS": ["6.1"],
                "unitName": "Open Economy - International Trade and Finance",
                "question": "Net exports are calculated as:",
                "image": null,
                "options": [
                  "Imports minus exports.",
                  "Exports minus imports.", // Correct
                  "Exports plus imports.",
                  "Capital inflows minus capital outflows.",
                  "Current account balance minus financial account balance."
                ],
                "correctAnswer": "B",
                "explanation": "Net exports (NX), a component of both the current account and the calculation of GDP via the expenditures approach, is defined as the value of a country's total exports minus the value of its total imports."
              },
              {
                "id": 271,
                "subject": "ap_macroeconomics",
                "unit": 6,
                "lessonIDS": ["6.3"],
                "unitName": "Open Economy - International Trade and Finance",
                "question": "If the demand for British pounds decreases in the foreign exchange market, while the supply remains constant, the pound will:",
                "image": null,
                "options": [
                  "Appreciate relative to other currencies.",
                  "Depreciate relative to other currencies.", // Correct
                  "Remain unchanged in value.",
                  "Cause British interest rates to rise.",
                  "Lead to an increase in British exports automatically." // Longer distractor
                ],
                "correctAnswer": "B",
                "explanation": "A decrease in demand for a currency, holding supply constant, means fewer entities want to buy that currency at any given exchange rate. This reduced demand leads to a fall in the equilibrium price (exchange rate) of the currency, meaning it depreciates."
              },
              {
                "id": 272,
                "subject": "ap_macroeconomics",
                "unit": 6,
                "lessonIDS": ["6.2"],
                "unitName": "Open Economy - International Trade and Finance",
                "question": "Suppose 1 Euro costs 1.10 US dollars. If a bottle of French wine costs 20 Euros in Paris, what is its cost in US dollars?",
                "image": null,
                "options": [
                  "$18.18",
                  "$20.00",
                  "$21.10",
                  "$22.00", // Correct
                  "$31.00"
                ],
                "correctAnswer": "D",
                "explanation": "To find the dollar cost, multiply the price in Euros by the dollar cost per Euro: Cost in USD = Price in Euros * (USD/Euro) = 20 Euros * ($1.10 / 1 Euro) = $22.00."
              },
              {
                "id": 273,
                "subject": "ap_macroeconomics",
                "unit": 6,
                "lessonIDS": ["6.4"],
                "unitName": "Open Economy - International Trade and Finance",
                "question": "Assume flexible exchange rates. If Country Z experiences rapid technological progress leading to faster economic growth than its trading partners, its currency is likely to:",
                "image": null,
                "options": [
                  "Appreciate due to increased demand for its exports.",
                  "Depreciate due to increased demand for imports.", // Correct (Income effect often dominates)
                  "Appreciate due to increased capital inflows seeking higher returns.",
                  "Depreciate due to lower relative interest rates.",
                  "The effect is indeterminate as growth affects both imports and capital flows." // Highly plausible distractor
                ],
                "correctAnswer": "B",
                "explanation": "Faster economic growth increases incomes in Country Z. Higher incomes typically lead to increased demand for all goods, including imports. To buy more imports, residents supply more of their own currency, causing it to depreciate (this income effect often outweighs effects from exports or capital flows in basic models)."
              },
              {
                "id": 274,
                "subject": "ap_macroeconomics",
                "unit": 6,
                "lessonIDS": ["6.5"],
                "unitName": "Open Economy - International Trade and Finance",
                "question": "If the Japanese yen depreciates relative to the US dollar, which group would benefit the most?",
                "image": null,
                "options": [
                  "US consumers buying Japanese cars.", // Correct
                  "Japanese consumers buying US electronics.",
                  "US tourists planning trips to Japan.", // Benefits, but consumers buying goods is more direct
                  "Japanese firms exporting goods to the US.", // Benefits, but US consumers get cheaper goods
                  "US firms exporting goods to Japan."
                ],
                "correctAnswer": "A",
                "explanation": "When the yen depreciates, it takes fewer dollars to buy a yen. This makes Japanese goods cheaper for US consumers, increasing their purchasing power for those goods."
              },
              {
                "id": 275,
                "subject": "ap_macroeconomics",
                "unit": 6,
                "lessonIDS": ["6.1"],
                "unitName": "Open Economy - International Trade and Finance",
                "question": "Which of the following is recorded as a credit in the U.S. Financial Account?",
                "image": null,
                "options": [
                  "U.S. imports of French wine.",
                  "A U.S. company pays dividends to its German shareholders.",
                  "A Mexican company purchases a manufacturing plant in the U.S.", // Correct
                  "A U.S. tourist spends money in Japan.",
                  "The U.S. government provides aid to Egypt."
                ],
                "correctAnswer": "C",
                "explanation": "The financial account records purchases/sales of assets. When a foreign entity (Mexican company) buys a U.S. asset (manufacturing plant - a form of foreign direct investment), it represents a financial capital inflow to the U.S. and is recorded as a credit in the U.S. financial account."
              },
              {
                "id": 276,
                "subject": "ap_macroeconomics",
                "unit": 6,
                "lessonIDS": ["6.3", "6.4"],
                "unitName": "Open Economy - International Trade and Finance",
                "question": "If investors widely expect the British pound to depreciate in the near future, what is the likely immediate impact in the foreign exchange market?",
                "image": null,
                "options": [
                  "Increased demand for pounds, causing appreciation.",
                  "Increased supply of pounds, causing depreciation.", // Correct
                  "Decreased demand for pounds and decreased supply, effect indeterminate.",
                  "Increased demand for pounds and increased supply, effect indeterminate.",
                  "No change until the depreciation actually occurs."
                ],
                "correctAnswer": "B",
                "explanation": "If investors expect the pound to depreciate (lose value), those holding pounds will try to sell them before the value drops, increasing the supply of pounds. Simultaneously, those considering buying pounds will wait, decreasing the demand. Both effects put downward pressure on the pound's current exchange rate, leading to immediate depreciation."
              }, 
                {
                  "id": 277,
                  "subject": "ap_macroeconomics",
                  "unit": 5,
                  "lessonIDS": ["5.1"],
                  "unitName": "Long-Run Consequences of Stabilization Policies",
                  "question": "If a government pursues expansionary fiscal policy while the central bank simultaneously undertakes contractionary monetary policy, what is the likely effect on real interest rates and real GDP in the short run?",
                  "image": null,
                  "options": [
                    "Real interest rates decrease; Real GDP increases.",
                    "Real interest rates increase; Real GDP effect is indeterminate.", // Correct
                    "Real interest rates decrease; Real GDP decreases.",
                    "Real interest rates increase; Real GDP increases.",
                    "Real interest rates indeterminate; Real GDP decreases." // Longer distractor
                  ],
                  "correctAnswer": "B",
                  "explanation": "Expansionary fiscal policy (increased spending/lower taxes) tends to increase real interest rates (via loanable funds market) and increase real GDP (via AD). Contractionary monetary policy (selling bonds/raising administered rates) increases real interest rates and decreases real GDP (via AD). Both policies raise interest rates. The effect on real GDP is indeterminate as the policies push it in opposite directions."
                },
                {
                  "id": 278,
                  "subject": "ap_macroeconomics",
                  "unit": 5,
                  "lessonIDS": ["5.1"],
                  "unitName": "Long-Run Consequences of Stabilization Policies",
                  "question": "Which combination of fiscal and monetary policy actions would unambiguously lead to a decrease in aggregate demand in the short run?",
                  "image": null,
                  "options": [
                    "Decreasing taxes and buying government securities.",
                    "Increasing government spending and selling government securities.",
                    "Decreasing government spending and selling government securities.", // Correct
                    "Decreasing government spending and buying government securities.",
                    "Increasing taxes and buying government securities."
                  ],
                  "correctAnswer": "C",
                  "explanation": "Decreasing government spending is contractionary fiscal policy, reducing aggregate demand. Selling government securities (open market sale) is contractionary monetary policy, increasing interest rates and reducing investment/consumption, thus reducing aggregate demand. Both actions reduce aggregate demand."
                },
                {
                  "id": 279,
                  "subject": "ap_macroeconomics",
                  "unit": 5,
                  "lessonIDS": ["5.2"],
                  "unitName": "Long-Run Consequences of Stabilization Policies",
                  "question": "A movement downward and to the right along a stable short-run Phillips curve is typically associated with:",
                  "image": null,
                  "options": [
                    "An increase in aggregate demand.",
                    "A decrease in aggregate demand.", // Correct
                    "An adverse supply shock.",
                    "A favorable supply shock.",
                    "An increase in expected inflation."
                  ],
                  "correctAnswer": "B",
                  "explanation": "The short-run Phillips curve shows an inverse relationship between inflation and unemployment. A decrease in aggregate demand leads to lower inflation and higher unemployment, corresponding to a movement downward and to the right along the SRPC."
                },
                {
                  "id": 280,
                  "subject": "ap_macroeconomics",
                  "unit": 5,
                  "lessonIDS": ["5.2"],
                  "unitName": "Long-Run Consequences of Stabilization Policies",
                  "question": "Which of the following would cause the short-run Phillips curve to shift to the right?",
                  "image": null,
                  "options": [
                    "A decrease in the expected inflation rate.",
                    "An increase in aggregate demand.",
                    "An increase in the natural rate of unemployment.", // Correct (or adverse supply shock)
                    "A decrease in aggregate demand.",
                    "A favorable supply shock like falling oil prices." // Longer distractor
                  ],
                  "correctAnswer": "C",
                  "explanation": "A rightward shift of the SRPC means a higher inflation rate is associated with any given unemployment rate, or higher unemployment for any given inflation rate. This can be caused by an increase in expected inflation or an adverse supply shock. An increase in the natural rate of unemployment would also shift the LRPC right, implying the SRPC must also shift right to intersect it."
                },
                {
                  "id": 281,
                  "subject": "ap_macroeconomics",
                  "unit": 5,
                  "lessonIDS": ["5.2"],
                  "unitName": "Long-Run Consequences of Stabilization Policies",
                  "question": "The concept illustrated by the vertical long-run Phillips curve is that:",
                  "image": null,
                  "options": [
                    "There is a permanent trade-off between inflation and unemployment.",
                    "Monetary policy can permanently reduce unemployment below the natural rate.",
                    "In the long run, the unemployment rate returns to the natural rate regardless of the stable inflation rate.", // Correct
                    "Fiscal policy has no impact on inflation or unemployment in the long run.",
                    "The natural rate of unemployment decreases as inflation increases."
                  ],
                  "correctAnswer": "C",
                  "explanation": "The vertical LRPC at the natural rate of unemployment indicates that in the long run, when expected inflation adjusts to actual inflation, there is no trade-off between inflation and unemployment. Expansionary policies may temporarily reduce unemployment below the natural rate but only at the cost of accelerating inflation."
                },
                {
                  "id": 282,
                  "subject": "ap_macroeconomics",
                  "unit": 5,
                  "lessonIDS": ["5.2"],
                  "unitName": "Long-Run Consequences of Stabilization Policies",
                  "question": "Stagflation, a combination of high inflation and high unemployment, is typically caused by:",
                  "image": null,
                  "options": [
                    "A decrease in aggregate demand.",
                    "An increase in aggregate demand.",
                    "A favorable supply shock.",
                    "An adverse supply shock.", // Correct
                    "Expansionary monetary policy."
                  ],
                  "correctAnswer": "D",
                  "explanation": "An adverse supply shock, such as a sharp increase in oil prices, shifts the short-run aggregate supply curve leftward. This leads to a higher price level (inflation) and lower output (higher unemployment) simultaneously, a condition known as stagflation. This corresponds to a rightward shift of the SRPC."
                },
                {
                  "id": 283,
                  "subject": "ap_macroeconomics",
                  "unit": 5,
                  "lessonIDS": ["5.3"],
                  "unitName": "Long-Run Consequences of Stabilization Policies",
                  "question": "According to the quantity theory of money, if velocity is constant and real GDP grows by 3%, a 5% increase in the money supply will lead to an inflation rate of approximately:",
                  "image": null,
                  "options": [
                    "2%", // Correct
                    "3%",
                    "5%",
                    "8%",
                    "-2%"
                  ],
                  "correctAnswer": "A",
                  "explanation": "Using the equation of exchange in growth rates (%ΔM + %ΔV = %ΔP + %ΔY), with %ΔV = 0, we have %ΔM = %ΔP + %ΔY. Plugging in the values: 5% = %ΔP + 3%. Therefore, the inflation rate (%ΔP) is 5% - 3% = 2%."
                },
                {
                  "id": 284,
                  "subject": "ap_macroeconomics",
                  "unit": 5,
                  "lessonIDS": ["5.3"],
                  "unitName": "Long-Run Consequences of Stabilization Policies",
                  "question": "If nominal GDP is $20 trillion and the money supply is $4 trillion, the velocity of money is:",
                  "image": null,
                  "options": [
                    "0.2",
                    "4",
                    "5", // Correct
                    "16",
                    "80"
                  ],
                  "correctAnswer": "C",
                  "explanation": "The equation of exchange is MV = PY, where PY is nominal GDP. Rearranging, Velocity (V) = Nominal GDP / Money Supply (M). V = $20 trillion / $4 trillion = 5."
                },
                {
                  "id": 285,
                  "subject": "ap_macroeconomics",
                  "unit": 5,
                  "lessonIDS": ["5.4"],
                  "unitName": "Long-Run Consequences of Stabilization Policies",
                  "question": "The government budget is balanced when:",
                  "image": null,
                  "options": [
                    "The national debt is zero.",
                    "Government outlays equal tax revenues.", // Correct
                    "The money supply equals money demand.",
                    "Exports equal imports.",
                    "The current account equals the financial account."
                  ],
                  "correctAnswer": "B",
                  "explanation": "A balanced budget occurs in a given fiscal year when the government's total spending (purchases plus transfer payments) is exactly equal to its total tax revenues."
                },
                {
                  "id": 286,
                  "subject": "ap_macroeconomics",
                  "unit": 5,
                  "lessonIDS": ["5.4"],
                  "unitName": "Long-Run Consequences of Stabilization Policies",
                  "question": "If a government begins with no debt and runs a budget deficit of $100 billion in year 1 and a budget surplus of $50 billion in year 2, what is the national debt at the end of year 2?",
                  "image": null,
                  "options": [
                    "$0",
                    "$50 billion", // Correct
                    "$100 billion",
                    "$150 billion",
                    "-$50 billion"
                  ],
                  "correctAnswer": "B",
                  "explanation": "The national debt is the accumulation of past deficits minus surpluses. Starting at $0, adding a $100 billion deficit brings the debt to $100 billion. Then, a $50 billion surplus reduces the debt by that amount. Debt at end of Year 2 = $100 billion - $50 billion = $50 billion."
                },
                {
                  "id": 287,
                  "subject": "ap_macroeconomics",
                  "unit": 5,
                  "lessonIDS": ["5.5"],
                  "unitName": "Long-Run Consequences of Stabilization Policies",
                  "question": "Increased government borrowing to finance budget deficits leads to the crowding-out effect by:",
                  "image": null,
                  "options": [
                    "Decreasing the money supply and raising nominal interest rates.",
                    "Increasing the demand for loanable funds and raising real interest rates.", // Correct
                    "Decreasing aggregate demand and lowering real interest rates.",
                    "Increasing the supply of loanable funds and lowering real interest rates.",
                    "Shifting the short-run Phillips curve outwards."
                  ],
                  "correctAnswer": "B",
                  "explanation": "Government borrowing adds to the demand for loanable funds. This increased demand shifts the demand curve rightward, leading to higher equilibrium real interest rates. These higher rates discourage, or 'crowd out,' private investment spending."
                },
                {
                  "id": 288,
                  "subject": "ap_macroeconomics",
                  "unit": 5,
                  "lessonIDS": ["5.5"],
                  "unitName": "Long-Run Consequences of Stabilization Policies",
                  "question": "Which component of aggregate demand is most likely to be negatively affected by the crowding-out effect?",
                  "image": null,
                  "options": [
                    "Consumption spending",
                    "Investment spending", // Correct
                    "Government spending",
                    "Net exports",
                    "Transfer payments"
                  ],
                  "correctAnswer": "B",
                  "explanation": "The crowding-out effect operates through higher real interest rates caused by government borrowing. Higher interest rates make it more expensive for businesses to borrow for capital projects, thus primarily reducing gross private domestic investment spending."
                },
                {
                  "id": 289,
                  "subject": "ap_macroeconomics",
                  "unit": 5,
                  "lessonIDS": ["5.6"],
                  "unitName": "Long-Run Consequences of Stabilization Policies",
                  "question": "Which factor contributes most directly to increasing labor productivity and fostering long-run economic growth?",
                  "image": null,
                  "options": [
                    "An increase in the aggregate price level.",
                    "A decrease in nominal wages.",
                    "An increase in the stock of physical capital per worker.", // Correct
                    "Expansionary monetary policy.",
                    "An increase in government transfer payments." // Longer distractor
                  ],
                  "correctAnswer": "C",
                  "explanation": "Labor productivity (output per worker) increases when workers have more or better tools, machinery, and infrastructure (physical capital) to work with. Increases in physical capital per worker are a key driver of long-run economic growth."
                },
                {
                  "id": 290,
                  "subject": "ap_macroeconomics",
                  "unit": 5,
                  "lessonIDS": ["5.6"],
                  "unitName": "Long-Run Consequences of Stabilization Policies",
                  "question": "Long-run economic growth is represented graphically by a:",
                  "image": null,
                  "options": [
                    "Rightward shift of the aggregate demand curve.",
                    "Movement up along the short-run aggregate supply curve.",
                    "Rightward shift of the long-run aggregate supply curve.", // Correct
                    "Leftward shift of the short-run Phillips curve.",
                    "Downward shift of the production possibilities curve."
                  ],
                  "correctAnswer": "C",
                  "explanation": "Long-run economic growth signifies an increase in the economy's potential output. This is shown as a rightward shift in the vertical long-run aggregate supply (LRAS) curve and an outward shift of the production possibilities curve."
                },
                {
                  "id": 291,
                  "subject": "ap_macroeconomics",
                  "unit": 5,
                  "lessonIDS": ["5.7"],
                  "unitName": "Long-Run Consequences of Stabilization Policies",
                  "question": "Policies such as investment tax credits or reduced corporate income taxes are primarily intended to promote long-run economic growth by:",
                  "image": null,
                  "options": [
                    "Increasing short-run aggregate demand significantly.",
                    "Decreasing the natural rate of unemployment directly.",
                    "Encouraging investment in physical capital and technology.", // Correct
                    "Reducing the government budget deficit immediately.",
                    "Shifting the short-run Phillips curve downwards." // Shorter distractor
                  ],
                  "correctAnswer": "C",
                  "explanation": "These are examples of supply-side fiscal policies. By reducing the cost or increasing the after-tax return on investment, they aim to incentivize firms to acquire more physical capital and adopt new technologies, thereby increasing potential output and fostering long-run growth (shifting LRAS right)."
                },
                {
                  "id": 292,
                  "subject": "ap_macroeconomics",
                  "unit": 5,
                  "lessonIDS": ["5.1"],
                  "unitName": "Long-Run Consequences of Stabilization Policies",
                  "question": "If expansionary fiscal policy increases real GDP, while contractionary monetary policy decreases real GDP, what is the overall impact on real GDP when both policies are enacted simultaneously?",
                  "image": null,
                  "options": [
                    "Real GDP increases.",
                    "Real GDP decreases.",
                    "Real GDP remains unchanged.",
                    "The effect on real GDP is indeterminate.", // Correct
                    "Nominal GDP increases but real GDP decreases."
                  ],
                  "correctAnswer": "D",
                  "explanation": "Expansionary fiscal policy shifts aggregate demand right, increasing real GDP. Contractionary monetary policy shifts aggregate demand left, decreasing real GDP. Since the two policies push real GDP in opposite directions, the net effect is uncertain without knowing the relative magnitudes of the policies."
                },
                {
                  "id": 293,
                  "subject": "ap_macroeconomics",
                  "unit": 5,
                  "lessonIDS": ["5.2"],
                  "unitName": "Long-Run Consequences of Stabilization Policies",
                  "question": "If policymakers attempt to maintain the unemployment rate below the natural rate of unemployment through persistent increases in aggregate demand, the likely long-run result will be:",
                  "image": null,
                  "options": [
                    "A permanent reduction in unemployment.",
                    "A decrease in the price level.",
                    "An accelerating rate of inflation.", // Correct
                    "A leftward shift in the long-run Phillips curve.",
                    "Deflation and stable unemployment rates." // Longer distractor
                  ],
                  "correctAnswer": "C",
                  "explanation": "While expansionary AD policy can temporarily push unemployment below the NRU, this leads to rising inflation expectations. To keep unemployment low, policymakers must continually increase AD faster, leading to ever-higher (accelerating) inflation in the long run, with unemployment eventually returning to the NRU."
                },
                {
                  "id": 294,
                  "subject": "ap_macroeconomics",
                  "unit": 5,
                  "lessonIDS": ["5.4"],
                  "unitName": "Long-Run Consequences of Stabilization Policies",
                  "question": "Which statement accurately describes the relationship between the government budget deficit and the national debt?",
                  "image": null,
                  "options": [
                    "The national debt is the deficit measured over one year.",
                    "The deficit is the total accumulation of past debts.",
                    "A budget surplus decreases the national debt.", // Correct
                    "A balanced budget eliminates the national debt.",
                    "The national debt only includes borrowing from foreign countries."
                  ],
                  "correctAnswer": "C",
                  "explanation": "The national debt represents the total amount owed by the government from all past borrowing (accumulated deficits minus any accumulated surpluses). A budget surplus (tax revenues exceed outlays) in a given year allows the government to pay down some of its existing debt, thus reducing the national debt."
                },
                {
                  "id": 295,
                  "subject": "ap_macroeconomics",
                  "unit": 5,
                  "lessonIDS": ["5.6"],
                  "unitName": "Long-Run Consequences of Stabilization Policies",
                  "question": "Which of the following government policies would be most likely to increase long-run economic growth?",
                  "image": null,
                  "options": [
                    "Increasing unemployment benefits.",
                    "Providing subsidies for education and research.", // Correct
                    "Imposing higher tariffs on imported capital goods.",
                    "Increasing consumption taxes.",
                    "Reducing the length of patents for new inventions."
                  ],
                  "correctAnswer": "B",
                  "explanation": "Long-run economic growth depends on factors like human capital accumulation and technological progress. Subsidies for education enhance human capital (skills), while subsidies for research and development encourage technological advancements, both contributing to a higher potential output (shifting LRAS right)."
                },
                {
                  "id": 296,
                  "subject": "ap_macroeconomics",
                  "unit": 5,
                  "lessonIDS": ["5.3"],
                  "unitName": "Long-Run Consequences of Stabilization Policies",
                  "question": "The velocity of money is best defined as:",
                  "image": null,
                  "options": [
                    "The rate at which the central bank prints currency.",
                    "The average number of times a unit of money changes hands in transactions for final goods and services.", // Correct
                    "The required reserve ratio set by the central bank for commercial banks.",
                    "The rate of growth of real GDP adjusted for inflation changes.",
                    "The speed at which inflation erodes purchasing power." // Longer distractor
                  ],
                  "correctAnswer": "B",
                  "explanation": "Velocity measures how quickly money circulates within the economy to facilitate transactions included in nominal GDP. A higher velocity implies each dollar is used more frequently during a given period."
                }, 
                  {
                    "id": 297,
                    "subject": "ap_macroeconomics",
                    "unit": 4,
                    "lessonIDS": ["4.1"],
                    "unitName": "Financial Sector",
                    "question": "Which of the following best describes the primary difference between a bond and a stock?",
                    "image": null,
                    "options": [
                      "A bond represents ownership, while a stock represents debt.",
                      "A bond typically pays dividends, while a stock pays interest.",
                      "A stock represents ownership (equity), while a bond represents debt (a loan).", // Correct
                      "Stocks are issued only by governments, bonds only by corporations.",
                      "Bonds offer higher potential returns but greater risk than stocks."
                    ],
                    "correctAnswer": "C",
                    "explanation": "A stock represents partial ownership (equity) in a corporation, giving the holder potential voting rights and a claim on profits (dividends). A bond represents a loan made by an investor to a borrower (corporation or government), which obligates the borrower to repay the principal plus periodic interest payments."
                  },
                  {
                    "id": 298,
                    "subject": "ap_macroeconomics",
                    "unit": 4,
                    "lessonIDS": ["4.1"],
                    "unitName": "Financial Sector",
                    "question": "Liquidity, in the context of financial assets, refers to the:",
                    "image": null,
                    "options": [
                      "Total value of the asset.",
                      "Expected rate of return on the asset.",
                      "Ease with which an asset can be converted into a medium of exchange without significant loss of value.", // Correct
                      "Risk associated with holding the asset.",
                      "Interest rate paid by the asset."
                    ],
                    "correctAnswer": "C",
                    "explanation": "Liquidity measures how quickly and easily an asset can be converted into cash (the most common medium of exchange) with minimal loss of its purchasing power or value."
                  },
                  {
                    "id": 299,
                    "subject": "ap_macroeconomics",
                    "unit": 4,
                    "lessonIDS": ["4.2"],
                    "unitName": "Financial Sector",
                    "question": "If the nominal interest rate is 8% and the expected inflation rate is 3%, the expected real interest rate is approximately:",
                    "image": null,
                    "options": [
                      "3%",
                      "5%", // Correct
                      "8%",
                      "11%",
                      "-5%"
                    ],
                    "correctAnswer": "B",
                    "explanation": "The expected real interest rate is approximately equal to the nominal interest rate minus the expected inflation rate. Real Interest Rate ≈ Nominal Interest Rate - Expected Inflation Rate = 8% - 3% = 5%."
                  },
                  {
                    "id": 300,
                    "subject": "ap_macroeconomics",
                    "unit": 4,
                    "lessonIDS": ["4.2"],
                    "unitName": "Financial Sector",
                    "question": "Suppose you took out a loan with a fixed nominal interest rate. If the actual inflation rate ends up being higher than what was expected when the loan was made, who benefits?",
                    "image": null,
                    "options": [
                      "The borrower benefits.", // Correct
                      "The lender benefits.",
                      "Both benefit equally.",
                      "Neither benefits.",
                      "The government benefits through higher taxes."
                    ],
                    "correctAnswer": "A",
                    "explanation": "Higher-than-expected inflation means the borrower repays the loan with dollars that have less purchasing power than anticipated. This reduces the real value of the loan repayment, benefiting the borrower at the expense of the lender, who receives back less valuable dollars."
                  },
                  {
                    "id": 301,
                    "subject": "ap_macroeconomics",
                    "unit": 4,
                    "lessonIDS": ["4.3"],
                    "unitName": "Financial Sector",
                    "question": "Using money to compare the market values of different goods and services best illustrates which function of money?",
                    "image": null,
                    "options": [
                      "Medium of exchange",
                      "Store of value",
                      "Unit of account", // Correct
                      "Standard of deferred payment",
                      "Measure of liquidity"
                    ],
                    "correctAnswer": "C",
                    "explanation": "The unit of account function of money allows us to measure and compare the values of diverse goods and services using a common denominator (e.g., dollars, euros), simplifying economic calculations and comparisons."
                  },
                  {
                    "id": 302,
                    "subject": "ap_macroeconomics",
                    "unit": 4,
                    "lessonIDS": ["4.3"],
                    "unitName": "Financial Sector",
                    "question": "Which of the following assets is included in the M1 measure of the money supply?",
                    "image": null,
                    "options": [
                      "Savings accounts",
                      "Small-denomination time deposits (CDs)",
                      "Money market mutual funds held by individuals",
                      "Currency held by the public and checkable deposits.", // Correct
                      "Corporate bonds held by commercial banks." // Longer distractor
                    ],
                    "correctAnswer": "D",
                    "explanation": "M1 is the narrowest measure of money supply, including the most liquid assets used for transactions: currency in circulation, checkable deposits (demand deposits), and traveler's checks."
                  },
                  {
                    "id": 303,
                    "subject": "ap_macroeconomics",
                    "unit": 4,
                    "lessonIDS": ["4.4"],
                    "unitName": "Financial Sector",
                    "question": "A commercial bank's reserves are considered which part of its balance sheet?",
                    "image": null,
                    "options": [
                      "An asset", // Correct
                      "A liability",
                      "Net worth",
                      "A contra-asset",
                      "Owner's equity"
                    ],
                    "correctAnswer": "A",
                    "explanation": "Reserves (both required and excess), whether held as vault cash or deposits at the central bank, are assets for a commercial bank because they represent funds the bank owns or has claim to."
                  },
                  {
                    "id": 304,
                    "subject": "ap_macroeconomics",
                    "unit": 4,
                    "lessonIDS": ["4.4"],
                    "unitName": "Financial Sector",
                    "question": "If the required reserve ratio is 20%, and a bank has $100,000 in demand deposits and $30,000 in total reserves, how much are its excess reserves?",
                    "image": null,
                    "options": [
                      "$10,000", // Correct
                      "$20,000",
                      "$30,000",
                      "$70,000",
                      "$130,000"
                    ],
                    "correctAnswer": "A",
                    "explanation": "Required Reserves = Required Reserve Ratio * Demand Deposits = 0.20 * $100,000 = $20,000. Excess Reserves = Total Reserves - Required Reserves = $30,000 - $20,000 = $10,000."
                  },
                  {
                    "id": 305,
                    "subject": "ap_macroeconomics",
                    "unit": 4,
                    "lessonIDS": ["4.4"],
                    "unitName": "Financial Sector",
                    "question": "Assuming banks hold no excess reserves and individuals hold no currency, if the required reserve ratio is 10%, what is the maximum possible expansion of the money supply resulting from a $1,000 new deposit into the banking system?",
                    "image": null,
                    "options": [
                      "$100",
                      "$1,000",
                      "$9,000",
                      "$10,000", // Correct (Total MS); or $9,000 if asking for *increase*
                      "$900"
                    ],
                    "correctAnswer": "D", // Assuming question asks for total potential money supply based on the deposit
                    "explanation": "The simple money multiplier is 1 / Required Reserve Ratio = 1 / 0.10 = 10. The maximum potential money supply that can be supported by the initial $1,000 deposit (which becomes reserves) is Multiplier * Initial Deposit = 10 * $1,000 = $10,000. (Note: If the question asked for the *increase* or *change*, it would be $9,000, as the initial $1,000 was already money)."
                  },
                  {
                    "id": 306,
                    "subject": "ap_macroeconomics",
                    "unit": 4,
                    "lessonIDS": ["4.5"],
                    "unitName": "Financial Sector",
                    "question": "The opportunity cost of holding money in the form of cash increases when:",
                    "image": null,
                    "options": [
                      "The nominal interest rate decreases.",
                      "The nominal interest rate increases.", // Correct
                      "The price level decreases.",
                      "The money supply increases.",
                      "Consumer confidence declines sharply." // Longer distractor
                    ],
                    "correctAnswer": "B",
                    "explanation": "The opportunity cost of holding money (which typically earns no interest) is the interest income forgone by not holding interest-bearing assets (like bonds). When nominal interest rates rise, the potential interest income given up increases, thus raising the opportunity cost of holding cash."
                  },
                  {
                    "id": 307,
                    "subject": "ap_macroeconomics",
                    "unit": 4,
                    "lessonIDS": ["4.5"],
                    "unitName": "Financial Sector",
                    "question": "In the money market model, an increase in the aggregate price level will typically lead to:",
                    "image": null,
                    "options": [
                      "A decrease in money demand and a lower nominal interest rate.",
                      "An increase in money supply and a lower nominal interest rate.",
                      "An increase in money demand and a higher nominal interest rate.", // Correct
                      "A decrease in money supply and a higher nominal interest rate.",
                      "No change in money demand but a higher nominal interest rate."
                    ],
                    "correctAnswer": "C",
                    "explanation": "A higher price level increases the amount of money needed for transactions. This increases the demand for money (shifts the MD curve right). Holding the money supply constant, this leads to a higher equilibrium nominal interest rate."
                  },
                  {
                    "id": 308,
                    "subject": "ap_macroeconomics",
                    "unit": 4,
                    "lessonIDS": ["4.6"],
                    "unitName": "Financial Sector",
                    "question": "Which of the following is an example of contractionary monetary policy by a central bank?",
                    "image": null,
                    "options": [
                      "Decreasing the discount rate.",
                      "Buying government securities on the open market.",
                      "Decreasing the required reserve ratio.",
                      "Selling government securities on the open market.", // Correct
                      "Lowering administered interest rates like the interest on reserves." // Longer distractor
                    ],
                    "correctAnswer": "D",
                    "explanation": "Contractionary monetary policy aims to decrease the money supply and raise interest rates to curb inflation. Selling government securities (bonds) removes reserves from the banking system, reducing banks' ability to lend and thus contracting the money supply."
                  },
                  {
                    "id": 309,
                    "subject": "ap_macroeconomics",
                    "unit": 4,
                    "lessonIDS": ["4.6"],
                    "unitName": "Financial Sector",
                    "question": "In a banking system with ample reserves, the primary tool used by the central bank to influence the policy interest rate (like the federal funds rate) is typically:",
                    "image": null,
                    "options": [
                      "Changing the required reserve ratio.",
                      "Large-scale open market operations.",
                      "Adjusting administered interest rates such as the interest rate on reserves.", // Correct
                      "Changing the M1 money supply target.",
                      "Setting foreign exchange rate targets."
                    ],
                    "correctAnswer": "C",
                    "explanation": "In an ample reserves system, traditional open market operations are less effective for fine-tuning the policy rate. Instead, central banks primarily manage the policy rate by adjusting administered rates like the interest paid on reserve balances (IORB) or the rate offered on overnight reverse repurchase agreements (ON RRP), which influence banks' incentives to lend or hold reserves."
                  },
                  {
                    "id": 310,
                    "subject": "ap_macroeconomics",
                    "unit": 4,
                    "lessonIDS": ["4.6", "5.1"],
                    "unitName": "Financial Sector",
                    "question": "A decrease in the money supply engineered by the central bank is likely to cause which effect in the short run?",
                    "image": null,
                    "options": [
                      "Lower nominal interest rates and increased aggregate demand.",
                      "Higher nominal interest rates and decreased aggregate demand.", // Correct
                      "Higher nominal interest rates and increased aggregate demand.",
                      "Lower nominal interest rates and decreased aggregate demand.",
                      "No change in interest rates but decreased aggregate supply."
                    ],
                    "correctAnswer": "B",
                    "explanation": "A decrease in the money supply (MS shifts left) leads to higher nominal interest rates in the money market. Higher interest rates discourage investment and interest-sensitive consumption, causing aggregate demand to decrease (shift left)."
                  },
                  {
                    "id": 311,
                    "subject": "ap_macroeconomics",
                    "unit": 4,
                    "lessonIDS": ["4.7"],
                    "unitName": "Financial Sector",
                    "question": "The demand curve for loanable funds is downward sloping primarily because as the real interest rate falls:",
                    "image": null,
                    "options": [
                      "Private saving increases.",
                      "Government budget deficits decrease.",
                      "The expected profitability of investment projects increases.",
                      "More potential investment projects become profitable to undertake.", // Correct
                      "Foreign capital inflows decrease significantly." // Longer distractor
                    ],
                    "correctAnswer": "D",
                    "explanation": "The real interest rate represents the cost of borrowing for firms undertaking investment projects. As the real interest rate falls, more projects that previously had an expected rate of return below the interest rate now become profitable, increasing the quantity of loanable funds demanded for investment."
                  },
                  {
                    "id": 312,
                    "subject": "ap_macroeconomics",
                    "unit": 4,
                    "lessonIDS": ["4.7"],
                    "unitName": "Financial Sector",
                    "question": "An increase in household saving would affect the loanable funds market by:",
                    "image": null,
                    "options": [
                      "Increasing the demand for loanable funds and increasing the real interest rate.",
                      "Decreasing the demand for loanable funds and decreasing the real interest rate.",
                      "Increasing the supply of loanable funds and decreasing the real interest rate.", // Correct
                      "Decreasing the supply of loanable funds and increasing the real interest rate.",
                      "Increasing both supply and demand, leaving the real interest rate unchanged."
                    ],
                    "correctAnswer": "C",
                    "explanation": "Household saving is a primary source of the supply of loanable funds. An increase in saving shifts the supply curve for loanable funds to the right, leading to a lower equilibrium real interest rate and a higher equilibrium quantity of funds loaned."
                  },
                  {
                    "id": 313,
                    "subject": "ap_macroeconomics",
                    "unit": 4,
                    "lessonIDS": ["4.7", "5.5"],
                    "unitName": "Financial Sector",
                    "question": "If a government increases its borrowing to finance infrastructure spending, what is the likely impact on the loanable funds market and private investment?",
                    "image": null,
                    "options": [
                      "Demand for funds decreases, real interest rate falls, private investment increases.",
                      "Supply of funds increases, real interest rate falls, private investment increases.",
                      "Demand for funds increases, real interest rate rises, private investment decreases.", // Correct
                      "Supply of funds decreases, real interest rate rises, private investment decreases.",
                      "Demand and supply increase equally, no change in real interest rate or investment."
                    ],
                    "correctAnswer": "C",
                    "explanation": "Government borrowing increases the demand for loanable funds (shifts demand right). This leads to a higher real interest rate. The higher real interest rate increases the cost of borrowing for private firms, causing a decrease in private investment spending (crowding out)."
                  },
                  {
                    "id": 314,
                    "subject": "ap_macroeconomics",
                    "unit": 4,
                    "lessonIDS": ["4.1"],
                    "unitName": "Financial Sector",
                    "question": "Which type of financial asset represents a claim to partial ownership in a corporation?",
                    "image": null,
                    "options": [
                      "Corporate bond",
                      "Government bond",
                      "Stock", // Correct
                      "Certificate of Deposit (CD)",
                      "Savings account"
                    ],
                    "correctAnswer": "C",
                    "explanation": "Stock represents equity or ownership in a corporation. Bondholders are creditors (lenders) to the corporation, while stockholders are part owners."
                  },
                  {
                    "id": 315,
                    "subject": "ap_macroeconomics",
                    "unit": 4,
                    "lessonIDS": ["4.4"],
                    "unitName": "Financial Sector",
                    "question": "If the simple money multiplier is 4, what is the required reserve ratio?",
                    "image": null,
                    "options": [
                      "4%",
                      "10%",
                      "15%",
                      "20%",
                      "25%" // Correct
                    ],
                    "correctAnswer": "E",
                    "explanation": "The simple money multiplier is calculated as 1 / Required Reserve Ratio (RRR). If the multiplier is 4, then 4 = 1 / RRR. Solving for RRR gives RRR = 1 / 4 = 0.25, or 25%."
                  },
                  {
                    "id": 316,
                    "subject": "ap_macroeconomics",
                    "unit": 4,
                    "lessonIDS": ["4.7"],
                    "unitName": "Financial Sector",
                    "question": "A decrease in foreign financial capital inflows into a country will affect its loanable funds market by:",
                    "image": null,
                    "options": [
                      "Increasing the supply of loanable funds, lowering the real interest rate.",
                      "Decreasing the supply of loanable funds, raising the real interest rate.", // Correct
                      "Increasing the demand for loanable funds, raising the real interest rate.",
                      "Decreasing the demand for loanable funds, lowering the real interest rate.",
                      "Having no significant impact on the domestic loanable funds market." // Longer distractor
                    ],
                    "correctAnswer": "B",
                    "explanation": "Financial capital inflows from abroad represent a source of saving available to the domestic loanable funds market, thus contributing to the supply of loanable funds. A decrease in these inflows shifts the supply curve for loanable funds to the left, resulting in a higher equilibrium real interest rate."
                  }, 
                    {
                      "id": 317,
                      "subject": "ap_macroeconomics",
                      "unit": 3,
                      "lessonIDS": ["3.1"],
                      "unitName": "National Income and Price Determination",
                      "question": "The interest rate effect suggests that the aggregate demand curve slopes downward because a lower price level leads to:",
                      "image": null,
                      "options": [
                        "Increased real wealth, stimulating consumption spending.",
                        "Lower interest rates, stimulating investment spending.", // Correct
                        "Increased exports as domestic goods become relatively cheaper.",
                        "Decreased money demand and decreased aggregate quantity demanded.",
                        "Higher government spending due to automatic stabilizers."
                      ],
                      "correctAnswer": "B",
                      "explanation": "The interest rate effect posits that a lower price level reduces the demand for money, which lowers the nominal interest rate. Lower interest rates encourage borrowing for investment and some types of consumption, thus increasing the aggregate quantity of goods and services demanded."
                    },
                    {
                      "id": 318,
                      "subject": "ap_macroeconomics",
                      "unit": 3,
                      "lessonIDS": ["3.1"],
                      "unitName": "National Income and Price Determination",
                      "question": "Which of the following would cause a leftward shift of the aggregate demand curve?",
                      "image": null,
                      "options": [
                        "An increase in consumer confidence about future income.",
                        "A decrease in income taxes.",
                        "An increase in government spending on infrastructure.",
                        "A decrease in net export spending.", // Correct
                        "An increase in the overall price level." // Movement along curve
                      ],
                      "correctAnswer": "D",
                      "explanation": "A decrease in net export spending, caused by factors like decreased foreign income or an appreciation of the domestic currency, reduces overall demand for domestically produced goods and services, shifting the aggregate demand curve to the left."
                    },
                    {
                      "id": 319,
                      "subject": "ap_macroeconomics",
                      "unit": 3,
                      "lessonIDS": ["3.3"],
                      "unitName": "National Income and Price Determination",
                      "question": "The short-run aggregate supply curve is upward sloping primarily because:",
                      "image": null,
                      "options": [
                        "Potential output increases as the price level rises.",
                        "Nominal wages and other input prices are often fixed or slow to adjust in the short run.", // Correct
                        "The spending multiplier increases as the price level rises.",
                        "Higher price levels reduce the real interest rate.",
                        "Technology improves quickly when prices rise." // Shorter distractor
                      ],
                      "correctAnswer": "B",
                      "explanation": "In the short run, many input costs, especially nominal wages, are 'sticky'. When the overall price level rises, output prices increase relative to these sticky input costs, making production more profitable and inducing firms to increase their quantity supplied."
                    },
                    {
                      "id": 320,
                      "subject": "ap_macroeconomics",
                      "unit": 3,
                      "lessonIDS": ["3.3"],
                      "unitName": "National Income and Price Determination",
                      "question": "Which of the following events would cause the short-run aggregate supply curve to shift to the left?",
                      "image": null,
                      "options": [
                        "A decrease in the expected price level.",
                        "An increase in labor productivity.",
                        "A widespread increase in nominal wages.", // Correct
                        "A decrease in corporate income taxes.",
                        "A fall in the aggregate price level." // Movement along curve
                      ],
                      "correctAnswer": "C",
                      "explanation": "An increase in nominal wages raises the cost of production for firms across the economy. At any given output price level, firms are willing to supply less output, causing the short-run aggregate supply curve to shift to the left."
                    },
                    {
                      "id": 321,
                      "subject": "ap_macroeconomics",
                      "unit": 3,
                      "lessonIDS": ["3.4"],
                      "unitName": "National Income and Price Determination",
                      "question": "The long-run aggregate supply curve is vertical at the level of potential output because in the long run:",
                      "image": null,
                      "options": [
                        "Aggregate demand is constant.",
                        "The money supply is fixed.",
                        "All input prices are fully flexible and adjust to changes in the price level.", // Correct
                        "Technology limits the amount that can be produced.",
                        "Government spending equals tax revenue exactly." // Longer distractor
                      ],
                      "correctAnswer": "C",
                      "explanation": "In the long run, all prices, including nominal wages and other input costs, are assumed to be fully flexible. Therefore, changes in the overall price level do not affect the economy's underlying productive capacity (potential output), which depends on resources, technology, and institutions. The LRAS curve is vertical at potential output."
                    },
                    {
                      "id": 322,
                      "subject": "ap_macroeconomics",
                      "unit": 3,
                      "lessonIDS": ["3.5"],
                      "unitName": "National Income and Price Determination",
                      "question": "If an economy's short-run equilibrium output is greater than its potential output, the economy is experiencing:",
                      "image": null,
                      "options": [
                        "A recessionary gap.",
                        "An inflationary gap.", // Correct
                        "Long-run equilibrium.",
                        "Stagflation.",
                        "Zero cyclical unemployment."
                      ],
                      "correctAnswer": "B",
                      "explanation": "An inflationary gap occurs when the short-run equilibrium level of real GDP is above the economy's potential output level (full-employment output). This implies that the unemployment rate is below the natural rate."
                    },
                    {
                      "id": 323,
                      "subject": "ap_macroeconomics",
                      "unit": 3,
                      "lessonIDS": ["3.7"],
                      "unitName": "National Income and Price Determination",
                      "question": "Assume an economy is in long-run equilibrium. A sudden increase in consumer optimism leads to a short-run increase in aggregate demand. Without government intervention, how will the economy adjust back to long-run equilibrium?",
                      "image": null,
                      "options": [
                        "Nominal wages will fall, shifting SRAS right.",
                        "Nominal wages will rise, shifting SRAS left.", // Correct
                        "The LRAS curve will shift to the right.",
                        "Aggregate demand will automatically shift back left.",
                        "The price level will fall continuously."
                      ],
                      "correctAnswer": "B",
                      "explanation": "The increase in AD creates an inflationary gap (output above potential, low unemployment). The tight labor market puts upward pressure on nominal wages. As wages rise, production costs increase, causing the SRAS curve to shift leftward until the economy returns to potential output at a higher price level."
                    },
                    {
                      "id": 324,
                      "subject": "ap_macroeconomics",
                      "unit": 3,
                      "lessonIDS": ["3.2"],
                      "unitName": "National Income and Price Determination",
                      "question": "If the marginal propensity to save (MPS) is 0.2, what is the value of the simple spending multiplier?",
                      "image": null,
                      "options": [
                        "0.2",
                        "0.8",
                        "1.25",
                        "4",
                        "5" // Correct
                      ],
                      "correctAnswer": "E",
                      "explanation": "The simple spending multiplier is calculated as 1 / MPS. Given MPS = 0.2, the multiplier is 1 / 0.2 = 5."
                    },
                    {
                      "id": 325,
                      "subject": "ap_macroeconomics",
                      "unit": 3,
                      "lessonIDS": ["3.2"],
                      "unitName": "National Income and Price Determination",
                      "question": "Assume the marginal propensity to consume (MPC) is 0.8. A $100 billion decrease in lump-sum taxes will lead to a maximum increase in real GDP of:",
                      "image": null,
                      "options": [
                        "$80 billion",
                        "$100 billion",
                        "$400 billion", // Correct
                        "$500 billion",
                        "$125 billion"
                      ],
                      "correctAnswer": "C",
                      "explanation": "The tax multiplier is -MPC / (1 - MPC) = -MPC / MPS. Here, MPC = 0.8, so MPS = 0.2. Tax multiplier = -0.8 / 0.2 = -4. A decrease in taxes of $100 billion will increase real GDP by: (-$100 billion) * (-4) = +$400 billion."
                    },
                    {
                      "id": 326,
                      "subject": "ap_macroeconomics",
                      "unit": 3,
                      "lessonIDS": ["3.8"],
                      "unitName": "National Income and Price Determination",
                      "question": "Which of the following represents an expansionary fiscal policy action?",
                      "image": null,
                      "options": [
                        "Increasing the reserve requirement.",
                        "Decreasing government spending on defense.",
                        "Increasing personal income tax rates.",
                        "Decreasing personal income tax rates.", // Correct
                        "Selling government bonds by the central bank."
                      ],
                      "correctAnswer": "D",
                      "explanation": "Expansionary fiscal policy aims to increase aggregate demand, typically during a recession. Decreasing personal income taxes increases households' disposable income, leading to higher consumption spending and shifting AD to the right."
                    },
                    {
                      "id": 327,
                      "subject": "ap_macroeconomics",
                      "unit": 3,
                      "lessonIDS": ["3.8"],
                      "unitName": "National Income and Price Determination",
                      "question": "If an economy is experiencing high inflation due to excess aggregate demand, an appropriate discretionary fiscal policy response would be to:",
                      "image": null,
                      "options": [
                        "Increase government spending.",
                        "Decrease income taxes.",
                        "Increase income taxes or decrease government spending.", // Correct
                        "Decrease the money supply.",
                        "Increase transfer payments."
                      ],
                      "correctAnswer": "C",
                      "explanation": "To combat demand-pull inflation (caused by excess AD), contractionary fiscal policy is needed. This involves either increasing taxes (to reduce disposable income and consumption) or decreasing government spending, both of which shift the AD curve to the left."
                    },
                    {
                      "id": 328,
                      "subject": "ap_macroeconomics",
                      "unit": 3,
                      "lessonIDS": ["3.6"],
                      "unitName": "National Income and Price Determination",
                      "question": "A simultaneous increase in both aggregate demand and short-run aggregate supply will necessarily result in:",
                      "image": null,
                      "options": [
                        "An increase in the price level.",
                        "A decrease in the price level.",
                        "An increase in real GDP.", // Correct
                        "A decrease in real GDP.",
                        "No change in the price level but lower real GDP." // Longer distractor
                      ],
                      "correctAnswer": "C",
                      "explanation": "An increase in aggregate demand (rightward shift) pushes both price level and real GDP up. An increase in short-run aggregate supply (rightward shift) pushes price level down and real GDP up. Since both shifts increase real GDP, the overall effect on real GDP is unambiguously an increase. The effect on the price level is indeterminate."
                    },
                    {
                      "id": 329,
                      "subject": "ap_macroeconomics",
                      "unit": 3,
                      "lessonIDS": ["3.6"],
                      "unitName": "National Income and Price Determination",
                      "question": "Which of the following would lead to a decrease in the aggregate price level but an increase in real GDP in the short run?",
                      "image": null,
                      "options": [
                        "A decrease in aggregate demand.",
                        "An increase in aggregate demand.",
                        "A decrease in short-run aggregate supply.",
                        "An increase in short-run aggregate supply.", // Correct
                        "A decrease in long-run aggregate supply."
                      ],
                      "correctAnswer": "D",
                      "explanation": "An increase in short-run aggregate supply (a rightward shift), perhaps due to falling input prices or increased productivity, leads to a lower equilibrium price level and a higher equilibrium real GDP."
                    },
                    {
                      "id": 330,
                      "subject": "ap_macroeconomics",
                      "unit": 3,
                      "lessonIDS": ["3.9"],
                      "unitName": "National Income and Price Determination",
                      "question": "Which of the following is the best example of an automatic stabilizer in fiscal policy?",
                      "image": null,
                      "options": [
                        "A decision by Congress to cut taxes during a recession.",
                        "The central bank buying bonds to lower interest rates.",
                        "Unemployment benefits increasing as more people lose jobs during a recession.", // Correct
                        "A law passed to increase defense spending.",
                        "Tariffs automatically rising when imports increase."
                      ],
                      "correctAnswer": "C",
                      "explanation": "Automatic stabilizers are features of the tax and transfer system that automatically work counter-cyclically without requiring new legislation. When unemployment rises during a recession, government spending on unemployment benefits automatically increases, cushioning the fall in aggregate demand."
                    },
                    {
                      "id": 331,
                      "subject": "ap_macroeconomics",
                      "unit": 3,
                      "lessonIDS": ["3.9"],
                      "unitName": "National Income and Price Determination",
                      "question": "During an economic expansion with rising incomes, a progressive income tax system acts as an automatic stabilizer by:",
                      "image": null,
                      "options": [
                        "Automatically increasing government spending.",
                        "Automatically decreasing the national debt.",
                        "Automatically increasing tax revenues and dampening aggregate demand.", // Correct
                        "Automatically decreasing tax revenues and boosting aggregate demand.",
                        "Requiring legislative action to change tax rates." // Shorter distractor
                      ],
                      "correctAnswer": "C",
                      "explanation": "In a progressive tax system, as incomes rise during an expansion, individuals move into higher tax brackets, and overall tax revenue increases automatically. This withdrawal of purchasing power slightly dampens the growth in aggregate demand, acting as a stabilizing force."
                    },
                    {
                      "id": 332,
                      "subject": "ap_macroeconomics",
                      "unit": 3,
                      "lessonIDS": ["3.2"],
                      "unitName": "National Income and Price Determination",
                      "question": "If the marginal propensity to save is 0.1, and autonomous investment spending increases by $50 billion, the maximum possible change in real GDP will be:",
                      "image": null,
                      "options": [
                        "An increase of $5 billion.",
                        "A decrease of $50 billion.",
                        "An increase of $450 billion.",
                        "An increase of $500 billion.", // Correct
                        "An increase of $50 billion."
                      ],
                      "correctAnswer": "D",
                      "explanation": "The spending multiplier is 1 / MPS = 1 / 0.1 = 10. The maximum change in real GDP is the multiplier times the initial change in autonomous spending: 10 * $50 billion = $500 billion increase."
                    },
                    {
                      "id": 333,
                      "subject": "ap_macroeconomics",
                      "unit": 3,
                      "lessonIDS": ["3.1"],
                      "unitName": "National Income and Price Determination",
                      "question": "A decrease in business inventories is counted as:",
                      "image": null,
                      "options": [
                        "Positive investment spending.",
                        "Negative investment spending.", // Correct
                        "An increase in consumption.",
                        "A decrease in government purchases.",
                        "Not part of GDP calculation."
                      ],
                      "correctAnswer": "B",
                      "explanation": "Investment (I) in the GDP expenditure approach includes changes in business inventories. A decrease in inventories means businesses sold more than they produced in that period, so the change in inventories is negative, reducing the investment component of GDP."
                    },
                    {
                      "id": 334,
                      "subject": "ap_macroeconomics",
                      "unit": 3,
                      "lessonIDS": ["3.8"],
                      "unitName": "National Income and Price Determination",
                      "question": "Contractionary fiscal policy is most appropriate when the economy is experiencing:",
                      "image": null,
                      "options": [
                        "High unemployment and low inflation.",
                        "A recessionary gap.",
                        "High inflation and low unemployment.", // Correct
                        "Stagflation.",
                        "A balanced budget."
                      ],
                      "correctAnswer": "C",
                      "explanation": "Contractionary fiscal policy (increasing taxes, decreasing government spending) aims to reduce aggregate demand. This is appropriate when the economy is experiencing demand-pull inflation (high inflation typically associated with output above potential and low unemployment)."
                    },
                    {
                      "id": 335,
                      "subject": "ap_macroeconomics",
                      "unit": 3,
                      "lessonIDS": ["3.7"],
                      "unitName": "National Income and Price Determination",
                      "question": "Which of the following best describes the process of long-run self-correction if an economy is operating with a recessionary gap?",
                      "image": null,
                      "options": [
                        "Nominal wages rise, shifting SRAS left.",
                        "Aggregate demand increases automatically.",
                        "Nominal wages fall, shifting SRAS right.", // Correct
                        "Potential output decreases.",
                        "Prices fall, causing AD to shift right significantly." // Longer distractor
                      ],
                      "correctAnswer": "C",
                      "explanation": "In a recessionary gap, unemployment is high, putting downward pressure on nominal wages. As wages fall over time, firms' production costs decrease, shifting the SRAS curve to the right, moving the economy back toward potential output."
                    },
                    {
                      "id": 336,
                      "subject": "ap_macroeconomics",
                      "unit": 3,
                      "lessonIDS": ["3.3"],
                      "unitName": "National Income and Price Determination",
                      "question": "A significant improvement in production technology across many industries will likely affect the aggregate supply curves by:",
                      "image": null,
                      "options": [
                        "Shifting SRAS left and LRAS left.",
                        "Shifting SRAS right and LRAS right.", // Correct
                        "Shifting SRAS right but leaving LRAS unchanged.",
                        "Shifting LRAS right but leaving SRAS unchanged.",
                        "Shifting SRAS left but LRAS right."
                      ],
                      "correctAnswer": "B",
                      "explanation": "Technological improvements increase productivity, lowering production costs in the short run (shifting SRAS right) and increasing the economy's overall potential output in the long run (shifting LRAS right)."
                    }
                ]
              
            
          
        
      
    
    
  
  
