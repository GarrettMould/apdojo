import { QuestionBank } from './types';
import macroSetOneQ1 from '../../../public/images/macroSetOneQ1.png';
import macroSetOneQ31 from '../../../public/images/macroSetOneQ31.png';	
import macroSetOneQ34 from '../../../public/images/macroSetOneQ34.png';
import macroSetOneQ37 from '../../../public/images/macroSetOneQ37.png';
import macroSetOneQ40 from '../../../public/images/macroSetOneQ40.png';
import macroSetOneQ41 from '../../../public/images/macroSetOneQ41.png';
import macroSetOneQ48 from '../../../public/images/macroSetOneQ48.png';
import macroSetOneQ53 from '../../../public/images/macroSetOneQ53.png';
import macroSetOneQ57 from '../../../public/images/macroSetOneQ57.png';
// Fisher-Yates shuffle function
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export const macroSetOneQuestions: QuestionBank = {
  name: "AP Macroeconomics",
  questions: shuffleArray([
    {
      "id": 1,
      "unit": 1,
      "unitName": "Basic Economic Concepts",
      "question": "The table shows the number of labor hours required to produce a unit of lumber or a unit of steel in the countries Beta and Gamma. Based on the table, which of the following statements is true?",
      "image": macroSetOneQ1,
      "options": [
        "Beta has the absolute advantage in the production of lumber",
        "Gamma should produce both goods and should not engage in trade with Beta",
        "Gamma has both an absolute and comparative advantage in the production of steel",
        "Beta has the comparative advantage in the production of steel",
        "Both countries should specialize in the production of the good in which they have the absolute advantage"
      ],
      "correctAnswer": "D",
      "explanation": "It takes Beta 30 hours to produce a unit of steel and 10 hours to produce a unit of lumber, which means that in the time it takes them to produce 1 unit of steel, they could have produced 3 units of lumber. It takes Gamma 20 hours to produce a unit of steel and 5 hours to produce a unit of lumber, which means that in the time it takes them to produce 1 unit of steel, they could have produced 4 units of lumber. This means that Beta has the lower opportunity cost in the production of steel, and thus has the comparative advantage in the production of steel."
    },
    {
      "id": 2,
      "unit": 1,
      "unitName": "Basic Economic Concepts",
      "question": "If a country can produce more of all goods with the same resources compared to another country, the country has:",
      "image": null,
      "options": [
        "Comparative advantage",
        "Absolute advantage",
        "Productive efficiency",
        "Allocative efficiency",
        "Opportunity cost advantage"
      ],
      "correctAnswer": "B",
      "explanation": "Absolute advantage occurs when a country can produce more of all goods with the same resources compared to another country. This differs from comparative advantage, which involves opportunity cost considerations."
    },
    {
      "id": 3,
      "unit": 1,
      "unitName": "Basic Economic Concepts",
      "question": "A country's production possibilities frontier shifts outward. This most likely results from:",
      "image": null,
      "options": [
        "An increase in unemployment",
        "A decrease in consumer spending",
        "Technological innovation",
        "A decrease in capital goods investment",
        "An increase in interest rates"
      ],
      "correctAnswer": "C",
      "explanation": "Technological innovation increases productivity and expands the production capacity of an economy, shifting the production possibilities frontier outward. This allows the economy to produce more output with the same resources."
    },
    {
      "id": 4,
      "unit": 1,
      "unitName": "Basic Economic Concepts",
      "question": "An economy is producing at a point inside its production possibilities frontier. This most likely indicates:",
      "image": null,
      "options": [
        "The economy is at full employment",
        "Resources are being allocated efficiently",
        "The economy is experiencing unemployment or underutilization of resources",
        "The economy has achieved productive efficiency",
        "The economy is growing at its maximum potential rate"
      ],
      "correctAnswer": "C",
      "explanation": "When an economy produces at a point inside its production possibilities frontier, it indicates that resources are not being fully utilized. This typically occurs during periods of unemployment or when productive resources are underutilized."
    },
    {
      "id": 5,
      "unit": 2,
      "unitName": "Economic Indicators and Business Cycles",
      "question": "If a country's nominal GDP is $500 billion and its GDP deflator is 125, what is its real GDP?",
      "image": null,
      "options": [
        "$400 billion",
        "$500 billion",
        "$625 billion",
        "$375 billion",
        "$525 billion"
      ],
      "correctAnswer": "A",
      "explanation": "Real GDP = (Nominal GDP ÷ GDP deflator) × 100. Real GDP = ($500 billion ÷ 125) × 100 = $400 billion. This calculation adjusts for inflation to determine output in constant dollars."
    },
    {
      "id": 6,
      "unit": 2,
      "unitName": "Economic Indicators and Business Cycles",
      "question": "During which phase of the business cycle is there typically high unemployment, falling output, and decreasing price levels?",
      "image": null,
      "options": [
        "Peak",
        "Recovery",
        "Expansion",
        "Recession",
        "Trough"
      ],
      "correctAnswer": "D",
      "explanation": "A recession is characterized by high unemployment, falling output, and often decreasing price levels. It's the contracting phase of the business cycle that occurs after a peak and before reaching a trough."
    },
    {
      "id": 7,
      "unit": 2,
      "unitName": "Economic Indicators and Business Cycles",
      "question": "Which of the following would NOT be counted in the calculation of a country's GDP?",
      "image": null,
      "options": [
        "A teacher's salary at a public school",
        "The purchase of a new factory machine",
        "The sale of a used car",
        "The construction of a new house",
        "The value of restaurant meals"
      ],
      "correctAnswer": "C",
      "explanation": "The sale of a used car would not be counted in GDP because it represents a transfer of an existing good rather than new production. GDP measures the market value of all final goods and services produced within a country in a specific time period."
    },
    {
      "id": 8,
      "unit": 2,
      "unitName": "Economic Indicators and Business Cycles",
      "question": "If the Consumer Price Index (CPI) increases from 180 to 189 over a year, what is the approximate inflation rate?",
      "image": null,
      "options": [
        "5%",
        "10%",
        "3%",
        "9%",
        "5%"
      ],
      "correctAnswer": "E",
      "explanation": "Inflation rate = ((New CPI - Old CPI) ÷ Old CPI) × 100 = ((189 - 180) ÷ 180) × 100 = (9 ÷ 180) × 100 = 0.05 × 100 = 5%"
    },
    {
      "id": 9,
      "unit": 3,
      "unitName": "National Income and Price Determination",
      "question": "In an economy, if the marginal propensity to consume (MPC) is 0.8, what is the value of the tax multiplier?",
      "image": null,
      "options": [
        "0.8",
        "4",
        "5",
        "8",
        "-4"
      ],
      "correctAnswer": "E",
      "explanation": "The tax multiplier equals -(MPC ÷ (1 - MPC)). When MPC = 0.8, the tax multiplier is -(0.8 ÷ (1 - 0.8)) = -(0.8 ÷ 0.2) = -4. This means each dollar of additional taxes reduces total GDP by $4."
    },
    {
      "id": 10,
      "unit": 2,
      "unitName": "Economic Indicators and Business Cycles",
      "question": "In the circular flow diagram of a market economy, which of the following demands factors of production, such as labor and capital?",
      "image": null,
      "options": [
        "firms",
        "government",
        "households",
        "financial institutions",
        "foreign countries"
      ],
      "correctAnswer": "A",
      "explanation": "In the circular flow diagram of a market economy, firms demand factors of production, such as labor and capital. Households supply these factors."
    },
    {
      "id": 11,
      "unit": 3,
      "unitName": "National Income and Price Determination",
      "question": "Which of the following is true when wages in an economy are sticky?",
      "image": null,
      "options": [
        "A decrease in the price level will lead to an increase in production",
        "The aggregate demand curve is vertical",
        "A change in price level will have no impact on output in the short run",
        "The short-run aggregate supply curve is upward sloping",
        "Changes in the price level will lead to immediate adjustments to nominal wages"
      ],
      "correctAnswer": "D",
      "explanation": "When wages are sticky, they do not adjust quickly to changes in the price level. This means that there is a positive relationship between the price level and output in the short run, because firms can increase production and hire more workers without immediately facing higher labor costs.",
    },
    {
      "id": 12,
      "unit": 3,
      "unitName": "National Income and Price Determination",
      "question": "A decrease in business taxes would most directly affect which component of aggregate demand?",
      "image": null,
      "options": [
        "Consumption",
        "Investment",
        "Government spending",
        "Net exports",
        "Transfer payments"
      ],
      "correctAnswer": "B",
      "explanation": "A decrease in business taxes would most directly affect investment, as lower taxes increase after-tax profits and returns on investment, encouraging businesses to expand capital expenditures."
    },
    {
      "id": 13,
      "unit": 3,
      "unitName": "National Income and Price Determination",
      "question": "Which of the following would cause a rightward shift of the aggregate demand curve?",
      "image": null,
      "options": [
        "An increase in interest rates",
        "A decrease in government spending",
        "An increase in consumer confidence",
        "A decrease in the money supply",
        "An increase in income taxes"
      ],
      "correctAnswer": "C",
      "explanation": "An increase in consumer confidence would lead to higher consumption spending, shifting the aggregate demand curve rightward. Higher consumer confidence typically leads to increased spending and economic activity."
    },
    {
      "id": 14,
      "unit": 3,
      "unitName": "National Income and Price Determination",
      "question": "In a recessionary gap, actual GDP is:",
      "image": null,
      "options": [
        "Equal to potential GDP",
        "Less than potential GDP",
        "Greater than potential GDP",
        "Equal to equilibrium GDP",
        "Greater than equilibrium GDP"
      ],
      "correctAnswer": "B",
      "explanation": "In a recessionary gap, actual GDP is less than potential GDP. This gap indicates underutilization of resources in the economy and typically coincides with high unemployment."
    },
    {
      "id": 15,
      "unit": 4,
      "unitName": "Financial Sector",
      "question": "If a bank has $50 million in deposits and the required reserve ratio is 10%, what is the maximum amount of new loans the bank can make?",
      "image": null,
      "options": [
        "$5 million",
        "$45 million",
        "$50 million",
        "$10 million",
        "$100 million"
      ],
      "correctAnswer": "B",
      "explanation": "With $50 million in deposits and a 10% reserve requirement, the bank must keep $5 million in reserves. Therefore, it can lend out a maximum of $45 million ($50 million - $5 million)."
    },
    {
      "id": 16,
      "unit": 4,
      "unitName": "Financial Sector",
      "question": "A central bank aims to combat high inflation. Which combination of monetary policy tools would be most effective?",
      "image": null,
      "options": [
        "Lower discount rate and buy government securities",
        "Raise discount rate and sell government securities",
        "Lower reserve requirements and buy government securities",
        "Raise reserve requirements and lower discount rate",
        "Lower discount rate and raise reserve requirements"
      ],
      "correctAnswer": "B",
      "explanation": "To combat high inflation, the central bank would implement contractionary monetary policy by raising the discount rate (making borrowing more expensive) and selling government securities (reducing the money supply)."
    },
    {
      "id": 17,
      "unit": 4,
      "unitName": "Financial Sector",
      "question": "If the money multiplier is 4 and the central bank increases reserves by $25 billion, by how much could the money supply potentially increase?",
      "image": null,
      "options": [
        "$25 billion",
        "$50 billion",
        "$75 billion",
        "$100 billion",
        "$125 billion"
      ],
      "correctAnswer": "D",
      "explanation": "When the money multiplier is 4, each dollar of reserves can potentially create $4 in the money supply. So, a $25 billion increase in reserves could potentially increase the money supply by $25 billion × 4 = $100 billion."
    },
    {
      "id": 18,
      "unit": 4,
      "unitName": "Financial Sector",
      "question": "Open market operations involve the central bank:",
      "image": null,
      "options": [
        "Changing the discount rate",
        "Modifying reserve requirements",
        "Buying or selling government securities",
        "Printing new currency",
        "Setting interest rate ceilings"
      ],
      "correctAnswer": "C",
      "explanation": "Open market operations involve the central bank buying or selling government securities in the open market to influence the money supply and interest rates. This is the primary tool of monetary policy in modern economies."
    },
    {
      "id": 19,
      "unit": 4,
      "unitName": "Financial Sector",
      "question": "If the price level increases while real GDP remains constant, which of the following will most likely occur?",
      "image": null,
      "options": [
        "Money demand decreases and nominal interest rates fall",
        "Money demand increases and nomainal interest rates rise",
        "Money demand remains constant and nominal interest rates rise",
        "Money demand increases and real interest rates fall",
        "Money demand decreases and nominal interest rates remain constant"
      ],
      "correctAnswer": "B",
      "explanation": "When the price level increases and real GDP remains constant, the demand for money increases as people need more money for transactions. With a fixed money supply, this increased demand for money leads to higher interest rates."
    },
    {
      "id": 20,
      "unit": 4,
      "unitName": "Financial Sector",
      "question": "Barbara has $100 in her wallet and $100 in her checking account. If the price level doubles, which of the following will happen to her wealth?",
      "image": null,
      "options": [
        "Her real wealth will double",
        "Her real wealth will halve",
        "Her real wealth will remain unchanged",
        "Her nominal wage will decrease",
        "Her real wage will remain unchanged"
      ],
      "correctAnswer": "B",
      "explanation": "When the price level doubles, the purchasing power of her money decreases. Her real wealth, measured in terms of goods and services she can buy, will halve."
    },
    {
      "id": 21,
      "unit": 5,
      "unitName": "Long-Run Consequences of Stabilization Policies",
      "question": "According to the Solow growth model, which of the following would lead to higher long-run economic growth?",
      "image": null,
      "options": [
        "An increase in government transfer payments",
        "An increase in the savings rate",
        "A decrease in labor force participation",
        "A decrease in capital investment",
        "An increase in consumption"
      ],
      "correctAnswer": "B",
      "explanation": "In the Solow growth model, an increase in the savings rate leads to more capital formation, which contributes to higher economic growth in the long run. This increases the capital-to-labor ratio and raises output per worker."
    },
    {
      "id": 22,
      "unit": 5,
      "unitName": "Long-Run Consequences of Stabilization Policies",
      "question": "A decrease in which of the following would move a balanced government budget to a surplus?",
      "image": null,
      "options": [
        "Currency issued by the treasury",
        "Income taxes",
        "Government transfer payments",
        "Private investment",
        "Consumption spending"
      ],
      "correctAnswer": "C",
      "explanation": "A decrease in government transfer payments would reduce the amount of money the government spends, moving the budget to a surplus. (Transfer payments are government spending that is not directly used to purchase goods and services, such as Social Security and unemployment benefits.)"
    },
    {
      "id": 23,
      "unit": 5,
      "unitName": "Long-Run Consequences of Stabilization Policies",
      "question": "Which of the following would most likely shift the long-run aggregate supply curve to the right?",
      "image": null,
      "options": [
        "An increase in minimum wage laws",
        "Higher business taxes",
        "More restrictive immigration policies",
        "Improved technology and education",
        "Higher energy prices"
      ],
      "correctAnswer": "D",
      "explanation": "Improved technology and education enhance productivity and increase the economy's production capacity, shifting the long-run aggregate supply curve to the right. This represents economic growth in terms of increased potential output."
    },
    {
      "id": 24,
      "unit": 5,
      "unitName": "Long-Run Consequences of Stabilization Policies",
      "question": "In the context of the Phillips curve, which of the following represents the long-run relationship between inflation and unemployment?",
      "image": null,
      "options": [
        "A negative relationship at all levels of inflation",
        "A positive relationship at all levels of inflation",
        "A vertical line at the natural rate of unemployment",
        "A horizontal line at the target inflation rate",
        "A downward-sloping curve regardless of time horizon"
      ],
      "correctAnswer": "C",
      "explanation": "The long-run Phillips curve is a vertical line at the natural rate of unemployment, indicating that there is no long-run tradeoff between inflation and unemployment. Attempts to maintain unemployment below its natural rate will only lead to accelerating inflation."
    },
    {
      "id": 25,
      "unit": 5,
      "unitName": "Long-Run Consequences of Stabilization Policies",
      "question": "Regular government borrowing to finance budget deficits can lead to:",
      "image": null,
      "options": [
        "A surplus in the country's current account",
        "Higher real interest rates and decreased economic growth",
        "Higher tax revenues in the short run",
        "A decrease in national debt",
        "Increase personal consumption and private investment"
      ],
      "correctAnswer": "B",
      "explanation": "Regular government borrowing to finance budget deficits can lead to higher interest rates and lower private investment. This can limit economic growth in the long run."
    },
    {
      "id": 26,
      "unit": 6,
      "unitName": "Open Economy-International Trade and Finance",
      "question": "What would likely happen to a country's currency value if its interest rates rise relative to other countries, all else being equal?",
      "image": null,
      "options": [
        "Its currency would depreciate",
        "Its currency would appreciate",
        "Its currency value would remain unchanged",
        "Its currency would become more volatile",
        "Its currency would experience inflation "
      ],
      "correctAnswer": "B",
      "explanation": "Higher domestic interest rates attract foreign investors seeking better returns, increasing demand for the domestic currency. This increased demand causes the currency to appreciate relative to other currencies, all else being equal."
    },
    {
      "id": 27,
      "unit": 6,
      "unitName": "Open Economy-International Trade and Finance",
      "question": "If a country has a current account deficit, it must have:",
      "image": null,
      "options": [
        "A budget surplus",
        "A financial account surplus",
        "Decreasing foreign exchange reserves",
        "Increasing domestic interest rates",
        "A trade surplus"
      ],
      "correctAnswer": "B",
      "explanation": "If a country has a current account deficit, it must have a financial account surplus to balance its international payments. This means more capital is flowing into the country than out of it, offsetting the deficit in the current account."
    },
    {
      "id": 28,
      "unit": 6,
      "unitName": "Open Economy-International Trade and Finance",
      "question": "A quota on imported steel would most likely result in:",
      "image": null,
      "options": [
        "Lower domestic steel prices",
        "Higher domestic steel prices",
        "Increased steel imports",
        "Lower profits for domestic steel producers",
        "Greater efficiency in the global steel market"
      ],
      "correctAnswer": "B",
      "explanation": "A quota on imported steel restricts the supply of foreign steel in the domestic market, leading to higher domestic steel prices. This benefits domestic producers at the expense of domestic consumers and economic efficiency."
    },
    {
      "id": 29,
      "unit": 6,
      "unitName": "Open Economy-International Trade and Finance",
      "question": "If the exchange rate changes from $1 = €0.80 to $1 = €0.70, what has happened?",
      "image": null,
      "options": [
        "The dollar has appreciated against the euro",
        "The dollar has depreciated against the euro",
        "The euro has remained stable against the dollar",
        "The euro and dollar have both depreciated",
        "The exchange rate has reached purchasing power parity"
      ],
      "correctAnswer": "B",
      "explanation": "When the exchange rate changes from $1 = €0.80 to $1 = €0.70, it means that $1 now buys fewer euros than before. This indicates that the dollar has depreciated against the euro, or equivalently, the euro has appreciated against the dollar."
    },
    {
      "id": 30,
      "unit": 1,
      "unitName": "Basic Economic Concepts",
      "question": "The concept of comparative advantage suggests that countries should:",
      "image": null,
      "options": [
        "Produce all goods they can make more efficiently than other countries",
        "Specialize in producing goods with the lowest absolute cost",
        "Specialize in producing goods with the lowest opportunity cost",
        "Avoid trade with more developed economies",
        "Impose tariffs on goods they can produce domestically"
      ],
      "correctAnswer": "C",
      "explanation": "The concept of comparative advantage suggests that countries should specialize in producing goods for which they have the lowest opportunity cost compared to other goods, and then trade with other countries. This leads to greater overall economic efficiency and higher total output."
    },
    {
      "id": 31,
      "unit": 1,
      "unitName": "Basic Economic Concepts",
      "question": "Which of the following is most likely to cause the shift seen on the graph below?",
      "image": macroSetOneQ31,
      "options": [
        "A sudden reduction in the availability of a key resource",
        "A decrease in business taxes",
        "Contractionary monetary policy",
        "A higher marginal propensity to save",
        "A decrease in business confidence about future economic conditions"
      ],
      "correctAnswer": "A",
      "explanation": "A sudden reduction in the availability of a key resource would shift the short-run aggregate supply curve to the left, causing a decrease in output and an increase in price level. This is also known as stagflation."
    },
    {
      "id": 32,
      "unit": 1,
      "unitName": "Basic Economic Concepts",
      "question": "In the market for apples, which of the following changes will decrease the equilibrium price of apples?",
      "image": null,
      "options": [
        "An increase in the wages of apple pickers",
        "An decrease in the price of fertilizer used in apple production",
        "A consumption tax on apple juice",
        "Stricter government regulations on apple production",
        "Increased public awareness of the health benefits of apples"
      ],
      "correctAnswer": "B",
      "explanation": "A decrease in the price of fertilizer used in apple production would reduce the cost of apple production, shifting the short-run aggregate supply curve to the right and causing a decrease in the equilibrium price of apples."
    },
    {
      "id": 33,
      "unit": 2,
      "unitName": "Economic Indicators and Business Cycles",
      "question": "Which of the following would be included in the calculation of GDP by the expenditure approach?",
      "image": null,
      "options": [
        "Interest paid on government bonds",
        "Social Security benefits paid to retirees",
        "The purchase of previously issued corporate stock",
        "A $5,000 used car purchased from a neighbor",
        "A company's purchase of new production equipment"
      ],
      "correctAnswer": "E",
      "explanation": "The purchase of new production equipment is a form of investment spending, which is included in GDP using the expenditure approach. The expenditure approach sums consumption, investment, government spending, and net exports."
    },
    {
      "id": 34,
      "unit": 2,
      "unitName": "Economic Indicators and Business Cycles",
      "question": "Use the table below to calculate the labor force participation rate of this economy:",
      "image": macroSetOneQ34,
      "options": [
        "60%",
        "50%",
        "45%",
        "70%",
        "80%"
      ],
      "correctAnswer": "D",
      "explanation": "Labor force participation rate = (Labor force ÷ Total working age population) × 100 = (168 million ÷ 240 million) × 100 = 70%."
    },
    {
      "id": 35,
      "unit": 2,
      "unitName": "Economic Indicators and Business Cycles",
      "question": "In an economy of 100 people, if 5 unemployed people give up looking for work, which of the following changes will occur?",
      "image": null,
      "options": [
        "The unemployment rate will decrease and the labor force participation rate will increase",
        "The unemployment rate will increase and the labor force participation rate will decrease",
        "Both the unemployment rate and the labor force participation rate will decrease",
        "Both the unemployment rate and the labor force participation rate will increase",
        "The unemployment rate and the labor force participation rate will remain unchanged"
      ],
      "correctAnswer": "A",
      "explanation": "When 5 unemployed people give up looking for work, they are no longer counted as unemployed. This reduces the unemployment rate. Since the labor force par."
    },
    {
      "id": 36,
      "unit": 3,
      "unitName": "National Income and Price Determination",
      "question": "If the US government increases spending on infrastructure by $50 billion with no change in taxes, what would be the immediate impact on aggregate demand if the marginal propensity to consume is 0.8?",
      "image": null,
      "options": [
        "$40 billion increase",
        "$50 billion increase",
        "$100 billion increase",
        "$250 billion increase",
        "$200 billion increase"
      ],
      "correctAnswer": "B",
      "explanation": "The immediate impact of a $50 billion increase in government spending is a rightward shift of the aggregate demand curve by exactly $50 billion. The multiplier effect occurs over subsequent rounds of spending, not immediately."
    },
    {
      "id": 37,
      "unit": 3,
      "unitName": "National Income and Price Determination",
      "question": "At which of the following points is the economy's actual unemployment rate less than the natural rate of unemployment?",
      "image": macroSetOneQ37,
      "options": [
        "Point S and Point U",
        "Point R and Point V",
        "Point U and Point W",
        "Point T and Point W",
        "Point S and Point T"
      ],
      "correctAnswer": "B",
      "explanation": "When an economy is in an expansionary gap, shown on the business cycle graph by."
    },
    {
      "id": 38,
      "unit": 3,
      "unitName": "National Income and Price Determination",
      "question": "If any economy's actual output falls below potential output and no policy action is taken, how will the economy adjust in the long run?",
      "image": null,
      "options": [
        "Long-run aggregate supply will shift to the right",
        "Nominal wages will rise and aggregate demand will shift to the right",
        "Nominal wages will fall and short-run aggregate supply will shift to the right",
        "The economy will not return to long-run equilibrium without policy intervention",
        "Aggregate demand will shift to the left and the price level will decrease"
      ],
      "correctAnswer": "C",
      "explanation": "When actual output falls below potential output, the economy will adjust in the long run through changes in nominal wages and short-run aggregate supply. As unemployment rises, nominal wages will fall. Businesses will then be willing to hire more employees and short-run aggregate supply will shift to the right."
    },
    {
      "id": 39,
      "unit": 4,
      "unitName": "Financial Sector",
      "question": "A country's velocity of money is 5, and its real GDP is $4 trillion. If the price level is 1.2, what is the money supply according to the equation of exchange?",
      "image": null,
      "options": [
        "$3.6 trillion",
        "$960 billion",
        "$24 trillion",
        "$1.2 trillion",
        "$4.8 trillion"
      ],
      "correctAnswer": "B",
      "explanation": "Using the equation of exchange, MV = PY, where M is money supply, V is velocity, P is price level, and Y is real GDP. Rearranging, M = PY/V = (1.2 × $4 trillion)/5 = $4.8 trillion/5 = $960 billion."
    },
    {
      "id": 40,
      "unit": 4,
      "unitName": "Financial Sector",
      "question": "Suppose Fernando deposits $1,000 into his checking account at Appalacian Bank. Based on the bank's balance sheet below, how much of this new deposit must be held in reserves?",
      "image": macroSetOneQ40,
      "options": [
        "$350",
        "$150",
        "$600",
        "$300",
        "$400"
      ],
      "correctAnswer": "B",
      "explanation": "Appalacian Bank has $100,000 in demand deposits and $15,000 in required reserves, meaning the required reserve ratio is 15%. That means that Appalacian Bank must the bank must hold 15% of Fernando's new deposit ($1,000 * 0.15 = $150)"
    },
    {
      "id": 41,
      "unit": 5,
      "unitName": "Long-Run Consequences of Stabilization Policies",
      "question": "A movement from point A to point B on the short-run Phillips curve can be attributed to:",
      "image": macroSetOneQ41,
      "options": [
        "An increase in aggregate demand",
        "A decrease in aggregate demand",
        "An increase in short-run aggregate supply",
        "An increase in the government budget surplus",
        "An increase in the economy's natural rate of unemployment"
      ],
      "correctAnswer": "A",
      "explanation": "A movement from point A to point B on the short-run Phillips curve shows an increase in inflation and a decrease in unemployment, which can be attributed to an increase in aggregate demand."
    },
    {
      "id": 42,
      "unit": 4,
      "unitName": "Financial Sector",
      "question": "Assume the nominal interest rate on a 30-year fixed-rate mortgage loan is 7 percent. If the expected inflation rate is 3 percent, the expected real interest rate is",
      "image": null,
      "options": [
        "10%",
        "4%",
        "7%",
        "3%",
        "1%",
      ],
      "correctAnswer": "B",
      "explanation": "The expected real interest rate is calculated as the nominal interest rate minus the expected inflation rate. So, 7% - 3% = 4%."
    },
    {
      "id": 43,
      "unit": 4,
      "unitName": "Financial Sector",
      "question": "When Lisa took out a fixed-rate car loan, she was charged 10 percent interest. If the expected inflation rate was 2 percent, but the actual inflation rate was 4 percent, which of the following is true?",
      "image": null,
      "options": [
        "Lisa benefits from the higher inflation rate as she pays a higher real interest rate",
        "The bank benefits from the higher inflation rate as it receives a higher real interest rate",
        "Lisa is unaffected by the higher inflation rate",
        "Lisa is worse off because she pays a higher real interest rate",
        "Lisa benefits from the higher inflation rate as she pays a lower real interest rate"
      ],
      "correctAnswer": "E",
      "explanation": "Lisa benefits from the higher inflation rate as she pays a lower real interest rate, Lisa expected to pay a real interest rate of 8% (10% - 2% = 8%) but actually pays a real interest rate of 6% (10% - 4% = 6%)."
    },
    {
      "id": 44,
      "unit": 5,
      "unitName": "Long-Run Consequences of Stabilization Policies",
      "question": "If the natural rate of unemployment is 5% and actual unemployment is 3%, according to the expectations-augmented Phillips curve, what will likely happen to inflation over time?",
      "image": null,
      "options": [
        "Inflation will decrease",
        "Inflation will remain stable",
        "Inflation will increase at a constant rate",
        "Inflation will accelerate",
        "Inflation will approach zero"
      ],
      "correctAnswer": "D",
      "explanation": "According to the expectations-augmented Phillips curve, when actual unemployment (3%) is below the natural rate (5%), inflation will accelerate over time. This occurs because expectations adjust upward as workers and firms continuously try to keep up with rising prices."
    },
    {
        "id": 45,
        "unit": 5,
        "unitName": "Long-Run Consequences of Stabilization Policies",
        "question": "If the government provides incentives to encourage private household savings, which of the following short-run changes will occur in the loanable funds market?",
        "image": null,
        "options": [
          "The supply and demand for loanable funds will increase",
          "The demand for loanable funds will increase and real interest rates will rise",
          "The supply of loanable funds will increase and real interest rates will fall",
          "There will be an indeterminate effect on real interest rates",
          "There will be a crowding-out effect and business investment will decrease"
        ],
        "correctAnswer": "C",
        "explanation": "If the government provides incentives to encourage private household savings, households will save more money, increasing the supply of loanable funds available in the economy and decreasing real interest rates."
      },
      {
        "id": 46,
        "unit": 6,
        "unitName": "Open Economy-International Trade and Finance",
        "question": "What would most likely result from a currency depreciation in a country with a free-floating exchange rate?",
        "image": null,
        "options": [
          "More expensive exports and cheaper imports",
          "Cheaper exports and more expensive imports",
          "No change in the price of exports or imports",
          "More expensive exports and more expensive imports",
          "Cheaper exports and cheaper imports"
        ],
        "correctAnswer": "B",
        "explanation": "When a country's currency depreciates, its exports become cheaper for foreigners to buy (boosting export volumes), while imports become more expensive for domestic consumers (reducing import volumes). This typically improves the country's trade balance."
      },
      {
        "id": 47,
        "unit": 6,
        "unitName": "Open Economy-International Trade and Finance",
        "question": "The appreciation of the Euro relative to the U.S. dollar seen in the graph below would most likely be caused by:",
        "image": null,
        "options": [
          "A rise in the real income of Europeans",
          "Consecutive budget surpluses by government in the European Union",
          "A recession in the United States",
          "A rise in relative real interest rates in Europe",
          "Accelerating inflation in Europe"
        ],
        "correctAnswer": "D",
        "explanation": "A rise in relative real interest rates in Europe would make European financial assets (government bonds) more attractive to foreign investors, leading to more demand for Euros and an appreciation of the currency."
      },
      {
        "id": 48,
        "unit": 6,
        "unitName": "Open Economy-International Trade and Finance",
        "question": "The diagram shows the US Dollar - Japanese Yen foreign exchange market. If the current exchange rate is 200 yen for 1 dollar, which of the following describes the current state of the foreign exchange market and what will happen to the value of the US dollar?",
        "image": macroSetOneQ48,
        "options": [
          "There is a surplus of dollars and the dollar will depreciate",
          "There is a surplus of dollars and the dollar will appreciate",
          "There is a shortage of yen and the yen will depreciate",
          "There is a surplus of yen and the yen will appreciate",
          "There is a shortage of dollars and the dollar will appreciate"
        ],
        "correctAnswer": "A",
        "explanation": "The current exchange rate is 200 yen for 1 dollar, which is higher than the equilibrium exchange rate of 150 yen for 1 dollar. Holders of US dollars will want to sell their dollars and buy yen, but holders of yen will not want to sell their yen and buy dollars. This will create a surplus of dollars and the dollar will depreciate back to the equilibrium exchange rate of 150 yen for 1 dollar."
      },
      {
        "id": 49,
        "unit": 2,
        "unitName": "Economic Indicators and Business Cycles",
        "question": "Using 2006 as a base year, the CPI in 2007 was 110, and the CPI in 2008 was 115. What was the rate of inflation between 2007 and 2008?",
        "image": null,
        "options": [
          "4.5%",
          "5%",
          "10%",
          "15%",
          "20%"
        ],
        "correctAnswer": "A",
        "explanation": "The rate of inflation between 2007 and 2008 was (115 - 110) / 110 = 4.5%. To find the rate of inflation using two CPI values, use the formula: (CPI New - CPI Old) / CPI Old * 100."
      },
      {
        "id": 50,
        "unit": 6,
        "unitName": "Economic Indicators and Business Cycles",
        "question": "Which of the following is NOT a country's current account?",
        "image": null,
        "options": [
          "Net exports",
          "Trade balance",
          "Financial capital inflows",
          "Net income from abroad",
          "Net unilateral transfers"
        ],
        "correctAnswer": "C",
        "explanation": "Financial capital inflows are recorded in the capital account, not the current account. The current account records international transactions in goods, services, and income."
      },
      {
        "id": 51,
        "unit": 1,
        "unitName": "Basic Economic Concepts",
        "question": "A rightward shift of a product's demand curve could be caused by:",
        "image": null,
        "options": [
          "An increase in the price of the product",
          "A decrease in consumer incomes, if the product is normal",
          "An increase in the price of a complementary good",
          "A decrease in the price of a substitute good",
          "An expectation that the product's price will fall in the future"
        ],
        "correctAnswer": "D",
        "explanation": "A decrease in the price of a substitute good would cause consumers to shift away from that good and toward the product in question, increasing demand for the product and shifting its demand curve rightward."
      },
      {
        "id": 52,
        "unit": 4,
        "unitName": "Financial Sector",
        "question": "In an ample reserve banking system, which of the following monetary policy actions would be most effective at fighting inflation?",
        "image": null,
        "options": [
          "Increasing the required reserve ratio",
          "Increasing the interest on reserves rate",
          "Buying government securities",
          "Increasing income taxes",
          "Reducing government spending"
        ],
        "correctAnswer": "B",
        "explanation": "The interest of reserves rate is the interest rate that the Federal Reserve pays commerical banks for saving their money at the Federal Reserve. By increasing the IOR rate, the Federal Reserve can encourage commerical banks to hold more money in reserves, which will reduce the money supply and help fight inflation.",
      },
      {
        "id": 53,
        "unit": 3,
        "unitName": "National Income and Price Determination",
        "question": "Following a shift in the aggregate demand curve from AD1 to AD2, which of the following best characterizes the state of the economy?",
        "image": macroSetOneQ53,
        "options": [
          "The economy is experiencing a recessionary gap",
          "Actual unemployment is higher than the natural rate of unemployment",
          "Actual output is higher than potential output",
          "The economy is currently at full employment",
          "The economy is experiencing cost-push inflation"
        ],
        "correctAnswer": "C",
        "explanation": "When the aggregate demand curve shifts from AD1 to AD2, the actual output (found where AD2 intersects with SRAS) is greater than potential output (found at the LRAS curve). This is also known as an inflationary gap."
      },
      {
        "id": 54,
        "unit": 5,
        "unitName": "Long-Run Consequences of Stabilization Policies",
        "question": "Which of the following is LEAST likely to impact long-term economic growth?",
        "image": null,
        "options": [
          "An increase in education funding",
          "The development of new technologies",
          "Subsidies for business research and development",
          "Stable geopolitical conditions and a lack of war",
          "The removal of a tax on cigarettes"
        ],
        "correctAnswer": "E",
        "explanation": "The removal of a tax on cigarettes may lead to an increase in consumption, but it is unlikely to have a long-term impact on economic growth. The other options, like subsidies to encourage investment, stable geopolitical conditions, and increased education funding are all likely to have a positive impact on long-term economic growth.",
      },
      {
        "id": 55,
        "unit": 4,
        "unitName": "Financial Sector",
        "question": "Which of the following would most likely lead to an increase in the money supply?",
        "image": null,
        "options": [
          "The Federal Reserve increasing the discount rate",
          "The Federal Reserve selling government securities",
          "The Federal Reserve raising reserve requirements",
          "The Federal Reserve purchasing government securities",
          "Banks increasing their excess reserves"
        ],
        "correctAnswer": "D",
        "explanation": "When the Federal Reserve purchases government securities in open market operations, it pays for them by crediting banks' reserve accounts, which increases bank reserves and enables banks to make more loans, expanding the money supply through the money creation process."
      },
      {
        "id": 56,
        "unit": 4,
        "unitName": "Financial Sector",
        "question": "In the loanable funds market, an increase in government borrowing with no change in taxes would most likely cause:",
        "image": null,
        "options": [
          "Interest rates to fall and investment to increase",
          "Interest rates to rise and investment to decrease",
          "Interest rates to rise and investment to increase",
          "Interest rates to fall and investment to decrease",
          "No change in interest rates or investment"
        ],
        "correctAnswer": "B",
        "explanation": "In the loanable funds market, increased government borrowing increases the demand for loanable funds, pushing up interest rates. Higher interest rates reduce private investment spending, demonstrating the crowding-out effect of government borrowing."
      },
      {
        "id": 57,
        "unit": 4,
        "unitName": "Financial Sector",
        "question": "Which of the following is true for an economy with a current output level at Point A?",
        "image": macroSetOneQ57,
        "options": [
          "The economy is experiencing a recessionary gap and the central bank should sell government securities to restore the economy to long-run equilibrium",
          "The economy is experiencing an inflationary gap and the central bank should sell government securities to restore the economy to long-run equilibrium",
          "The economy is experiencing a recessionary gap and the central bank should lower the discount rate to restore the economy to long-run equilibrium",
          "The economy is experiencing an recessionary gap and the central bank should increase government spending to restore the economy to long-run equilibrium",
          "The economy is currently at full employment and the central bank should not intervene"
        ],
        "correctAnswer": "C",
        "explanation": "At Point A, the economy is experiencing a recessionary gap. The central bank should use expansionary monetary policy to restore the economy to long-run equilibrium. Lowering the discount rate will increase the money supply, which will shift the aggregate demand curve rightward, restoring the economy to long-run equilibrium."
      },
      {
        "id": 58,
        "unit": 5,
        "unitName": "Long-Run Consequences of Stabilization Policies",
        "question": "In an economy experiencing high unemployment and low inflation, which policy combination would be most appropriate according to mainstream macroeconomic theory?",
        "image": null,
        "options": [
          "Expansionary fiscal policy and contractionary monetary policy",
          "Contractionary fiscal policy and expansionary monetary policy",
          "Expansionary fiscal policy and expansionary monetary policy",
          "Contractionary fiscal policy and contractionary monetary policy",
          "Supply-side policies only"
        ],
        "correctAnswer": "C",
        "explanation": "In an economy with high unemployment and low inflation, expansionary fiscal policy (increased government spending or tax cuts) and expansionary monetary policy (lower interest rates) would both help stimulate aggregate demand and reduce unemployment without creating significant inflation concerns."
      },
      {
        "id": 59,
        "unit": 3,
        "unitName": "National Income and Price Determination",
        "question": "If investment decreases by $20 billion and the marginal propensity to consume is 0.75, what will be the total change in equilibrium GDP?",
        "image": null,
        "options": [
          "$15 billion decrease",
          "$20 billion decrease",
          "$60 billion decrease",
          "$80 billion decrease",
          "$100 billion decrease"
        ],
        "correctAnswer": "D",
        "explanation": "With an MPC of 0.75, the spending multiplier equals 1/(1-0.75) = 1/0.25 = 4. Therefore, a $20 billion decrease in investment will cause equilibrium GDP to decrease by $20 billion × 4 = $80 billion."
      },
      {
        "id": 60,
        "unit": 2,
        "unitName": "Economic Indicators and Business Cycles",
        "question": "Which of the following is a limitation of GDP as a measure of economic well-being?",
        "image": null,
        "options": [
          "It includes both final goods and services",
          "It measures both consumption and investment",
          "It excludes non-market activities like household work",
          "It includes both private and public sector output",
          "It measures production within a country's borders"
        ],
        "correctAnswer": "C",
        "explanation": "A key limitation of GDP as a measure of economic well-being is that it excludes non-market activities like household work, childcare, and volunteer services. This means GDP underestimates total economic activity and does not fully capture societal welfare."
      }
  ])
};