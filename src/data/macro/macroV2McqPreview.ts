import type { Question } from '@/data/questionBanks/types';

/**
 * AP Macro table MCQ batch. IDs in the 26xxx range (unit digit in the third place: 262xx unit 2 … 266xx unit 6).
 * Merged into live practice via the macro unit arrays in unitPracticeProblems.ts.
 * Preview page: /macro-mcq-preview
 */
export const macroV2McqPreviewQuestions: Question[] = [
  {
    "id": 26201,
    "unit": 2,
    "lessonIDS": [
      "2.3"
    ],
    "unitName": "Economic Indicators and the Business Cycle",
    "question": "The table shows data for the adult civilian noninstitutional population of an economy. What is the unemployment rate?",
    "image": null,
    "tableData": {
      "headers": [
        "Category",
        "Number of People (thousands)"
      ],
      "rows": [
        [
          "Employed",
          "150"
        ],
        [
          "Unemployed (actively seeking work)",
          "10"
        ],
        [
          "Not in the labor force",
          "40"
        ]
      ]
    },
    "options": [
      "5.00%",
      "6.25%",
      "6.67%",
      "8.00%",
      "25.00%"
    ],
    "correctAnswer": "B",
    "explanation": "The labor force is the employed plus the unemployed: 150 + 10 = 160. Unemployment rate = 10/160 = 6.25%. People who are not in the labor force are not counted. Using 150 as the denominator (6.67%) leaves out the unemployed.",
    "videoExplanation": null,
    "subject": "ap_macroeconomics"
  },
  {
    "id": 26202,
    "unit": 2,
    "lessonIDS": [
      "2.3"
    ],
    "unitName": "Economic Indicators and the Business Cycle",
    "question": "The table shows data for the adult civilian noninstitutional population of an economy. What is the labor force participation rate?",
    "image": null,
    "tableData": {
      "headers": [
        "Category",
        "Number of People (thousands)"
      ],
      "rows": [
        [
          "Employed",
          "150"
        ],
        [
          "Unemployed (actively seeking work)",
          "10"
        ],
        [
          "Not in the labor force",
          "40"
        ]
      ]
    },
    "options": [
      "20.00%",
      "75.00%",
      "80.00%",
      "93.75%",
      "95.00%"
    ],
    "correctAnswer": "C",
    "explanation": "Labor force participation rate = labor force / adult population = 160/200 = 80%. The value 75% is the employment-population ratio (150/200).",
    "videoExplanation": null,
    "subject": "ap_macroeconomics"
  },
  {
    "id": 26203,
    "unit": 2,
    "lessonIDS": [
      "2.3"
    ],
    "unitName": "Economic Indicators and the Business Cycle",
    "question": "The table shows labor market data for an economy in two years. The unemployment rate fell from about 6.67% in Year 1 to about 3.45% in Year 2. Which of the following best explains the decrease in the unemployment rate?",
    "image": null,
    "tableData": {
      "headers": [
        "Category (thousands)",
        "Year 1",
        "Year 2"
      ],
      "rows": [
        [
          "Employed",
          "140",
          "140"
        ],
        [
          "Unemployed",
          "10",
          "5"
        ],
        [
          "Not in the labor force",
          "50",
          "55"
        ]
      ]
    },
    "options": [
      "Some unemployed workers stopped looking for work and left the labor force.",
      "Employment increased because firms hired more workers.",
      "The labor force grew because more people started looking for work.",
      "The population of the economy decreased.",
      "The natural rate of unemployment fell to zero."
    ],
    "correctAnswer": "A",
    "explanation": "Employment stayed at 140 thousand, so no new jobs were created. The number of unemployed fell from 10 to 5 and the number not in the labor force rose from 50 to 55, so the unemployed workers became discouraged and stopped looking. The labor force shrank from 150 to 145, which lowers the unemployment rate.",
    "videoExplanation": null,
    "subject": "ap_macroeconomics"
  },
  {
    "id": 26204,
    "unit": 2,
    "lessonIDS": [
      "2.3"
    ],
    "unitName": "Economic Indicators and the Business Cycle",
    "question": "The table describes three workers who are currently unemployed. Which of the following correctly identifies the type of unemployment for Alicia, Ben, and Carla in that order?",
    "image": null,
    "tableData": {
      "headers": [
        "Worker",
        "Situation"
      ],
      "rows": [
        [
          "Alicia",
          "Was laid off when a recession reduced demand for the products her firm makes."
        ],
        [
          "Ben",
          "Quit his job to search for a better one in another city."
        ],
        [
          "Carla",
          "Lost her job as a typewriter repair technician because technology made the skill obsolete."
        ]
      ]
    },
    "options": [
      "Structural, cyclical, frictional",
      "Frictional, structural, cyclical",
      "Cyclical, structural, frictional",
      "Cyclical, frictional, structural",
      "Frictional, cyclical, structural"
    ],
    "correctAnswer": "D",
    "explanation": "Alicia lost her job because of weak overall demand in a recession, which is cyclical unemployment. Ben is between jobs while searching, which is frictional unemployment. Carla's skills no longer match the jobs available because of technological change, which is structural unemployment.",
    "videoExplanation": null,
    "subject": "ap_macroeconomics"
  },
  {
    "id": 26205,
    "unit": 2,
    "lessonIDS": [
      "2.3"
    ],
    "unitName": "Economic Indicators and the Business Cycle",
    "question": "The table breaks down the unemployment rate of an economy by type. What is the natural rate of unemployment?",
    "image": null,
    "tableData": {
      "headers": [
        "Type of Unemployment",
        "Rate"
      ],
      "rows": [
        [
          "Frictional",
          "2.5%"
        ],
        [
          "Structural",
          "2.0%"
        ],
        [
          "Cyclical",
          "3.0%"
        ],
        [
          "Total (actual unemployment rate)",
          "7.5%"
        ]
      ]
    },
    "options": [
      "2.0%",
      "3.0%",
      "5.5%",
      "7.5%",
      "4.5%"
    ],
    "correctAnswer": "E",
    "explanation": "The natural rate of unemployment is the sum of frictional and structural unemployment: 2.5% + 2.0% = 4.5%. Cyclical unemployment is the difference between the actual rate and the natural rate.",
    "videoExplanation": null,
    "subject": "ap_macroeconomics"
  },
  {
    "id": 26206,
    "unit": 2,
    "lessonIDS": [
      "2.3",
      "2.7"
    ],
    "unitName": "Economic Indicators and the Business Cycle",
    "question": "Using the unemployment data in the table, which of the following best describes the economy?",
    "image": null,
    "tableData": {
      "headers": [
        "Type of Unemployment",
        "Rate"
      ],
      "rows": [
        [
          "Frictional",
          "2.5%"
        ],
        [
          "Structural",
          "2.0%"
        ],
        [
          "Cyclical",
          "3.0%"
        ],
        [
          "Total (actual unemployment rate)",
          "7.5%"
        ]
      ]
    },
    "options": [
      "It is in a recessionary gap, and real GDP is below potential output.",
      "It is in an inflationary gap, and real GDP is above potential output.",
      "It is at full employment, and real GDP equals potential output.",
      "It is in a recessionary gap because the natural rate of unemployment is 7.5%.",
      "It is in an inflationary gap because cyclical unemployment is positive."
    ],
    "correctAnswer": "A",
    "explanation": "The actual unemployment rate (7.5%) is above the natural rate (4.5%), so cyclical unemployment is 3.0%. That means the economy is producing below its potential output, which is a recessionary gap.",
    "videoExplanation": null,
    "subject": "ap_macroeconomics"
  },
  {
    "id": 26207,
    "unit": 2,
    "lessonIDS": [
      "2.4"
    ],
    "unitName": "Economic Indicators and the Business Cycle",
    "question": "The table shows a market basket and the price of each item in the base year and in the current year. What is the CPI in the current year?",
    "image": null,
    "tableData": {
      "headers": [
        "Item",
        "Quantity in Basket",
        "Price in Base Year",
        "Price in Current Year"
      ],
      "rows": [
        [
          "Pizza",
          "5",
          "$8",
          "$10"
        ],
        [
          "Gasoline (gallons)",
          "10",
          "$3",
          "$3.60"
        ],
        [
          "Movie tickets",
          "2",
          "$15",
          "$17"
        ]
      ]
    },
    "options": [
      "100",
      "110",
      "117",
      "120",
      "125"
    ],
    "correctAnswer": "D",
    "explanation": "The basket cost in the base year is 5($8) + 10($3) + 2($15) = $100. In the current year it costs 5($10) + 10($3.60) + 2($17) = $50 + $36 + $34 = $120. CPI = (120/100) × 100 = 120.",
    "videoExplanation": null,
    "subject": "ap_macroeconomics"
  },
  {
    "id": 26208,
    "unit": 2,
    "lessonIDS": [
      "2.4"
    ],
    "unitName": "Economic Indicators and the Business Cycle",
    "question": "The table shows the CPI for two years. What is the inflation rate between 2023 and 2024?",
    "image": null,
    "tableData": {
      "headers": [
        "Year",
        "CPI"
      ],
      "rows": [
        [
          "2023",
          "250.0"
        ],
        [
          "2024",
          "258.0"
        ]
      ]
    },
    "options": [
      "2.0%",
      "3.0%",
      "3.2%",
      "8.0%",
      "103.2%"
    ],
    "correctAnswer": "C",
    "explanation": "Inflation rate = (258 - 250)/250 × 100 = 3.2%. The value 8.0 is the change in the index, not the percentage change.",
    "videoExplanation": null,
    "subject": "ap_macroeconomics"
  },
  {
    "id": 26209,
    "unit": 2,
    "lessonIDS": [
      "2.4"
    ],
    "unitName": "Economic Indicators and the Business Cycle",
    "question": "The table shows a worker's nominal hourly wage and the CPI in two years. What is the worker's real hourly wage in Year 2, measured in base-year dollars?",
    "image": null,
    "tableData": {
      "headers": [
        "Year",
        "Nominal Hourly Wage",
        "CPI (base year = 100)"
      ],
      "rows": [
        [
          "Year 1",
          "$20",
          "100"
        ],
        [
          "Year 2",
          "$24",
          "120"
        ]
      ]
    },
    "options": [
      "$4.00",
      "$20.00",
      "$24.00",
      "$28.80",
      "$120.00"
    ],
    "correctAnswer": "B",
    "explanation": "Real wage = (nominal wage / CPI) × 100 = ($24/120) × 100 = $20. The real wage is unchanged from Year 1, because the 20% rise in the nominal wage exactly offset the 20% rise in prices.",
    "videoExplanation": null,
    "subject": "ap_macroeconomics"
  },
  {
    "id": 26210,
    "unit": 2,
    "lessonIDS": [
      "2.4"
    ],
    "unitName": "Economic Indicators and the Business Cycle",
    "question": "A worker earns the nominal salary shown in a year when the CPI is as shown (base year = 100). What is the worker's real salary in base-year dollars?",
    "image": null,
    "tableData": {
      "headers": [
        "Year",
        "Nominal Annual Salary",
        "CPI (base year = 100)"
      ],
      "rows": [
        [
          "Current Year",
          "$50,000",
          "125"
        ]
      ]
    },
    "options": [
      "$6,250",
      "$50,000",
      "$62,500",
      "$75,000",
      "$40,000"
    ],
    "correctAnswer": "E",
    "explanation": "Real salary = (nominal salary / CPI) × 100 = ($50,000/125) × 100 = $40,000. Multiplying by the CPI instead would give $62,500.",
    "videoExplanation": null,
    "subject": "ap_macroeconomics"
  },
  {
    "id": 26211,
    "unit": 2,
    "lessonIDS": [
      "2.4"
    ],
    "unitName": "Economic Indicators and the Business Cycle",
    "question": "The table shows the CPI for four consecutive years. Which of the following best describes the economy during these years?",
    "image": null,
    "tableData": {
      "headers": [
        "Year",
        "CPI"
      ],
      "rows": [
        [
          "Year 1",
          "100"
        ],
        [
          "Year 2",
          "108"
        ],
        [
          "Year 3",
          "114"
        ],
        [
          "Year 4",
          "118"
        ]
      ]
    },
    "options": [
      "Disinflation, because the price level rose each year but at a decreasing rate.",
      "Deflation, because the price level fell each year.",
      "Inflation that is accelerating each year.",
      "Stagflation, because prices rose while output fell.",
      "Hyperinflation, because the CPI is increasing."
    ],
    "correctAnswer": "A",
    "explanation": "Inflation was (108-100)/100 = 8.0% in Year 2, (114-108)/108 ≈ 5.6% in Year 3, and (118-114)/114 ≈ 3.5% in Year 4. The price level kept rising, but the inflation rate fell, which is disinflation. Deflation would require the price level itself to fall.",
    "videoExplanation": null,
    "subject": "ap_macroeconomics"
  },
  {
    "id": 26212,
    "unit": 2,
    "lessonIDS": [
      "2.6"
    ],
    "unitName": "Economic Indicators and the Business Cycle",
    "question": "An economy produces only computers and bread. The table shows the quantities and prices for two years. Year 1 is the base year. What is nominal GDP in Year 2?",
    "image": null,
    "tableData": {
      "headers": [
        "Year",
        "Computers (Quantity)",
        "Computer Price",
        "Bread (Quantity)",
        "Bread Price"
      ],
      "rows": [
        [
          "Year 1 (base year)",
          "10",
          "$100",
          "50",
          "$2.00"
        ],
        [
          "Year 2",
          "12",
          "$110",
          "60",
          "$2.50"
        ]
      ]
    },
    "options": [
      "1,100",
      "1,320",
      "1,470",
      "1,500",
      "1,560"
    ],
    "correctAnswer": "C",
    "explanation": "Nominal GDP = current prices × current quantities = 12($110) + 60($2.50) = $1,320 + $150 = $1,470.",
    "videoExplanation": null,
    "subject": "ap_macroeconomics"
  },
  {
    "id": 26213,
    "unit": 2,
    "lessonIDS": [
      "2.6"
    ],
    "unitName": "Economic Indicators and the Business Cycle",
    "question": "An economy produces only computers and bread. The table shows the quantities and prices for two years. Year 1 is the base year. What is real GDP in Year 2, measured in base-year prices?",
    "image": null,
    "tableData": {
      "headers": [
        "Year",
        "Computers (Quantity)",
        "Computer Price",
        "Bread (Quantity)",
        "Bread Price"
      ],
      "rows": [
        [
          "Year 1 (base year)",
          "10",
          "$100",
          "50",
          "$2.00"
        ],
        [
          "Year 2",
          "12",
          "$110",
          "60",
          "$2.50"
        ]
      ]
    },
    "options": [
      "1,100",
      "1,320",
      "1,200",
      "1,470",
      "1,540"
    ],
    "correctAnswer": "B",
    "explanation": "Real GDP uses base-year prices with Year 2 quantities: 12($100) + 60($2) = $1,200 + $120 = $1,320.",
    "videoExplanation": null,
    "subject": "ap_macroeconomics"
  },
  {
    "id": 26214,
    "unit": 2,
    "lessonIDS": [
      "2.6"
    ],
    "unitName": "Economic Indicators and the Business Cycle",
    "question": "An economy produces only computers and bread. The table shows the quantities and prices for two years. Year 1 is the base year. What is the percentage change in real GDP from Year 1 to Year 2?",
    "image": null,
    "tableData": {
      "headers": [
        "Year",
        "Computers (Quantity)",
        "Computer Price",
        "Bread (Quantity)",
        "Bread Price"
      ],
      "rows": [
        [
          "Year 1 (base year)",
          "10",
          "$100",
          "50",
          "$2.00"
        ],
        [
          "Year 2",
          "12",
          "$110",
          "60",
          "$2.50"
        ]
      ]
    },
    "options": [
      "10%",
      "33.6%",
      "36%",
      "20%",
      "120%"
    ],
    "correctAnswer": "D",
    "explanation": "Year 1 GDP (base year) = 10($100) + 50($2) = $1,100. Real GDP in Year 2 = $1,320. Growth = (1,320 - 1,100)/1,100 = 20%. The value 33.6% is the growth of nominal GDP, which includes the effect of higher prices.",
    "videoExplanation": null,
    "subject": "ap_macroeconomics"
  },
  {
    "id": 26215,
    "unit": 2,
    "lessonIDS": [
      "2.6"
    ],
    "unitName": "Economic Indicators and the Business Cycle",
    "question": "An economy produces only computers and bread. The table shows the quantities and prices for two years. Year 1 is the base year. What is the GDP deflator in Year 2?",
    "image": null,
    "tableData": {
      "headers": [
        "Year",
        "Computers (Quantity)",
        "Computer Price",
        "Bread (Quantity)",
        "Bread Price"
      ],
      "rows": [
        [
          "Year 1 (base year)",
          "10",
          "$100",
          "50",
          "$2.00"
        ],
        [
          "Year 2",
          "12",
          "$110",
          "60",
          "$2.50"
        ]
      ]
    },
    "options": [
      "100.0",
      "120.0",
      "133.6",
      "147.0",
      "111.4"
    ],
    "correctAnswer": "E",
    "explanation": "GDP deflator = (nominal GDP / real GDP) × 100 = (1,470/1,320) × 100 ≈ 111.4.",
    "videoExplanation": null,
    "subject": "ap_macroeconomics"
  },
  {
    "id": 26216,
    "unit": 2,
    "lessonIDS": [
      "2.6"
    ],
    "unitName": "Economic Indicators and the Business Cycle",
    "question": "The table shows nominal GDP and the GDP deflator for an economy over three years. What is real GDP in Year 3, in billions of base-year dollars?",
    "image": null,
    "tableData": {
      "headers": [
        "Year",
        "Nominal GDP (billions)",
        "GDP Deflator (base year = 100)"
      ],
      "rows": [
        [
          "Year 1",
          "$2,000",
          "100"
        ],
        [
          "Year 2",
          "$2,310",
          "105"
        ],
        [
          "Year 3",
          "$2,520",
          "120"
        ]
      ]
    },
    "options": [
      "2,100",
      "2,200",
      "2,400",
      "2,520",
      "3,024"
    ],
    "correctAnswer": "A",
    "explanation": "Real GDP = (nominal GDP / GDP deflator) × 100 = (2,520/120) × 100 = 2,100. Multiplying nominal GDP by the deflator would give 3,024.",
    "videoExplanation": null,
    "subject": "ap_macroeconomics"
  },
  {
    "id": 26217,
    "unit": 2,
    "lessonIDS": [
      "2.6"
    ],
    "unitName": "Economic Indicators and the Business Cycle",
    "question": "The table shows nominal GDP and the GDP deflator for an economy over three years. Which of the following is true between Year 2 and Year 3?",
    "image": null,
    "tableData": {
      "headers": [
        "Year",
        "Nominal GDP (billions)",
        "GDP Deflator (base year = 100)"
      ],
      "rows": [
        [
          "Year 1",
          "$2,000",
          "100"
        ],
        [
          "Year 2",
          "$2,310",
          "105"
        ],
        [
          "Year 3",
          "$2,520",
          "120"
        ]
      ]
    },
    "options": [
      "Real GDP increased by about 9.1% because nominal GDP increased by about 9.1%.",
      "Real GDP decreased by about 4.5% even though nominal GDP increased.",
      "Real GDP increased by about 14.3% because the price level increased by about 14.3%.",
      "Real GDP did not change because the price level and nominal GDP both rose.",
      "Real GDP decreased by about 14.3% because the price level increased."
    ],
    "correctAnswer": "B",
    "explanation": "Real GDP in Year 2 = (2,310/105) × 100 = 2,200. Real GDP in Year 3 = (2,520/120) × 100 = 2,100. The change is (2,100 - 2,200)/2,200 ≈ -4.5%. Nominal GDP rose because prices rose by more than output fell.",
    "videoExplanation": null,
    "subject": "ap_macroeconomics"
  },
  {
    "id": 26218,
    "unit": 2,
    "lessonIDS": [
      "2.1"
    ],
    "unitName": "Economic Indicators and the Business Cycle",
    "question": "The table shows the components of spending in an economy. What is GDP using the expenditure approach?",
    "image": null,
    "tableData": {
      "headers": [
        "Component",
        "Amount (billions)"
      ],
      "rows": [
        [
          "Consumption",
          "$600"
        ],
        [
          "Gross private domestic investment",
          "$150"
        ],
        [
          "Government purchases",
          "$200"
        ],
        [
          "Exports",
          "$80"
        ],
        [
          "Imports",
          "$100"
        ]
      ]
    },
    "options": [
      "830",
      "950",
      "930",
      "1,030",
      "1,130"
    ],
    "correctAnswer": "C",
    "explanation": "GDP = C + I + G + (X - M) = 600 + 150 + 200 + (80 - 100) = $930 billion. Ignoring net exports gives $950 billion.",
    "videoExplanation": null,
    "subject": "ap_macroeconomics"
  },
  {
    "id": 26219,
    "unit": 2,
    "lessonIDS": [
      "2.1"
    ],
    "unitName": "Economic Indicators and the Business Cycle",
    "question": "The table shows the components of spending in an economy. What is the value of net exports?",
    "image": null,
    "tableData": {
      "headers": [
        "Component",
        "Amount (billions)"
      ],
      "rows": [
        [
          "Consumption",
          "$600"
        ],
        [
          "Gross private domestic investment",
          "$150"
        ],
        [
          "Government purchases",
          "$200"
        ],
        [
          "Exports",
          "$80"
        ],
        [
          "Imports",
          "$100"
        ]
      ]
    },
    "options": [
      "-$100 billion",
      "$20 billion",
      "$80 billion",
      "-$20 billion",
      "$180 billion"
    ],
    "correctAnswer": "D",
    "explanation": "Net exports = exports - imports = $80 billion - $100 billion = -$20 billion. A negative value means the economy imports more than it exports.",
    "videoExplanation": null,
    "subject": "ap_macroeconomics"
  },
  {
    "id": 26220,
    "unit": 2,
    "lessonIDS": [
      "2.1"
    ],
    "unitName": "Economic Indicators and the Business Cycle",
    "question": "The table lists several items from a country's national accounts. What is GDP using the expenditure approach?",
    "image": null,
    "tableData": {
      "headers": [
        "Item",
        "Amount (billions)"
      ],
      "rows": [
        [
          "Personal consumption expenditures",
          "$700"
        ],
        [
          "Gross private domestic investment",
          "$180"
        ],
        [
          "Government purchases of goods and services",
          "$250"
        ],
        [
          "Government transfer payments",
          "$120"
        ],
        [
          "Exports",
          "$90"
        ],
        [
          "Imports",
          "$110"
        ]
      ]
    },
    "options": [
      "1,130",
      "1,220",
      "1,230",
      "1,340",
      "1,110"
    ],
    "correctAnswer": "E",
    "explanation": "GDP = C + I + G + (X - M) = 700 + 180 + 250 + (90 - 110) = $1,110 billion. Government transfer payments are not payments for newly produced goods and services, so they are not part of G or GDP.",
    "videoExplanation": null,
    "subject": "ap_macroeconomics"
  },
  {
    "id": 26221,
    "unit": 2,
    "lessonIDS": [
      "2.1",
      "2.2"
    ],
    "unitName": "Economic Indicators and the Business Cycle",
    "question": "The table lists several transactions that occurred in one year in an economy. What is the total value of these transactions that is counted in that year's GDP?",
    "image": null,
    "tableData": {
      "headers": [
        "Transaction",
        "Amount"
      ],
      "rows": [
        [
          "A household buys a newly built car from a dealer.",
          "$30,000"
        ],
        [
          "A household buys a used car from a neighbor.",
          "$8,000"
        ],
        [
          "A household buys shares of stock.",
          "$5,000"
        ],
        [
          "A firm buys new machinery for its factory.",
          "$200,000"
        ],
        [
          "The government pays Social Security benefits.",
          "$1,200"
        ],
        [
          "A city buys new school buses.",
          "$90,000"
        ]
      ]
    },
    "options": [
      "$290,000",
      "$320,000",
      "$321,200",
      "$328,000",
      "$334,200"
    ],
    "correctAnswer": "B",
    "explanation": "GDP counts only final goods and services produced in the current year. The new car ($30,000) is consumption, the new machinery ($200,000) is investment, and the school buses ($90,000) are government purchases: $320,000. Used goods, stock purchases, and transfer payments are excluded.",
    "videoExplanation": null,
    "subject": "ap_macroeconomics"
  },
  {
    "id": 26301,
    "unit": 3,
    "lessonIDS": [
      "3.2"
    ],
    "unitName": "National Income and Price Determination",
    "question": "The table shows consumption at different levels of disposable income for an economy. What is the marginal propensity to consume (MPC)?",
    "image": null,
    "tableData": {
      "headers": [
        "Disposable Income",
        "Consumption"
      ],
      "rows": [
        [
          "$1,000",
          "$900"
        ],
        [
          "$1,200",
          "$1,060"
        ],
        [
          "$1,400",
          "$1,220"
        ],
        [
          "$1,600",
          "$1,380"
        ]
      ]
    },
    "options": [
      "0.2",
      "0.6",
      "0.8",
      "0.9",
      "1.25"
    ],
    "correctAnswer": "C",
    "explanation": "MPC = change in consumption / change in disposable income = (1,060 - 900)/(1,200 - 1,000) = 160/200 = 0.8. The value 0.9 is the average propensity to consume at an income of $1,000.",
    "videoExplanation": null,
    "subject": "ap_macroeconomics"
  },
  {
    "id": 26302,
    "unit": 3,
    "lessonIDS": [
      "3.2"
    ],
    "unitName": "National Income and Price Determination",
    "question": "The table shows consumption at different levels of disposable income for an economy. What is the marginal propensity to save (MPS)?",
    "image": null,
    "tableData": {
      "headers": [
        "Disposable Income",
        "Consumption"
      ],
      "rows": [
        [
          "$1,000",
          "$900"
        ],
        [
          "$1,200",
          "$1,060"
        ],
        [
          "$1,400",
          "$1,220"
        ],
        [
          "$1,600",
          "$1,380"
        ]
      ]
    },
    "options": [
      "0.2",
      "0.1",
      "0.5",
      "0.8",
      "5.0"
    ],
    "correctAnswer": "A",
    "explanation": "MPC + MPS = 1, so MPS = 1 - 0.8 = 0.2. The value 5.0 is the multiplier, 1/MPS.",
    "videoExplanation": null,
    "subject": "ap_macroeconomics"
  },
  {
    "id": 26303,
    "unit": 3,
    "lessonIDS": [
      "3.2"
    ],
    "unitName": "National Income and Price Determination",
    "question": "The table shows consumption at different levels of disposable income for an economy. What is the level of saving when disposable income is $1,400?",
    "image": null,
    "tableData": {
      "headers": [
        "Disposable Income",
        "Consumption"
      ],
      "rows": [
        [
          "$1,000",
          "$900"
        ],
        [
          "$1,200",
          "$1,060"
        ],
        [
          "$1,400",
          "$1,220"
        ],
        [
          "$1,600",
          "$1,380"
        ]
      ]
    },
    "options": [
      "$140",
      "$200",
      "$1,220",
      "$180",
      "$1,400"
    ],
    "correctAnswer": "D",
    "explanation": "Saving = disposable income - consumption = $1,400 - $1,220 = $180.",
    "videoExplanation": null,
    "subject": "ap_macroeconomics"
  },
  {
    "id": 26304,
    "unit": 3,
    "lessonIDS": [
      "3.2"
    ],
    "unitName": "National Income and Price Determination",
    "question": "The table shows consumption at different levels of disposable income for an economy. What is the average propensity to consume (APC) when disposable income is $1,200?",
    "image": null,
    "tableData": {
      "headers": [
        "Disposable Income",
        "Consumption"
      ],
      "rows": [
        [
          "$1,000",
          "$900"
        ],
        [
          "$1,200",
          "$1,060"
        ],
        [
          "$1,400",
          "$1,220"
        ],
        [
          "$1,600",
          "$1,380"
        ]
      ]
    },
    "options": [
      "0.12",
      "0.80",
      "1.13",
      "1.25",
      "0.88"
    ],
    "correctAnswer": "E",
    "explanation": "APC = consumption / disposable income = 1,060/1,200 ≈ 0.88. The MPC is 0.80, which measures the change in consumption for a change in income, not the average.",
    "videoExplanation": null,
    "subject": "ap_macroeconomics"
  },
  {
    "id": 26305,
    "unit": 3,
    "lessonIDS": [
      "3.2"
    ],
    "unitName": "National Income and Price Determination",
    "question": "The table shows consumption at different levels of disposable income for an economy. Assuming the relationship between consumption and disposable income is linear, what is the level of autonomous consumption (consumption when disposable income is zero)?",
    "image": null,
    "tableData": {
      "headers": [
        "Disposable Income",
        "Consumption"
      ],
      "rows": [
        [
          "$1,000",
          "$900"
        ],
        [
          "$1,200",
          "$1,060"
        ],
        [
          "$1,400",
          "$1,220"
        ],
        [
          "$1,600",
          "$1,380"
        ]
      ]
    },
    "options": [
      "$0",
      "$100",
      "$900",
      "$1,000",
      "$1,200"
    ],
    "correctAnswer": "B",
    "explanation": "Consumption = a + 0.8(DI). At DI = $1,000, 900 = a + 0.8(1,000), so a = $100.",
    "videoExplanation": null,
    "subject": "ap_macroeconomics"
  },
  {
    "id": 26306,
    "unit": 3,
    "lessonIDS": [
      "3.2"
    ],
    "unitName": "National Income and Price Determination",
    "question": "The table shows consumption at different levels of disposable income for an economy. Using the MPC from the table, what is the maximum increase in real GDP that would result from a $20 billion increase in government spending?",
    "image": null,
    "tableData": {
      "headers": [
        "Disposable Income",
        "Consumption"
      ],
      "rows": [
        [
          "$1,000",
          "$900"
        ],
        [
          "$1,200",
          "$1,060"
        ],
        [
          "$1,400",
          "$1,220"
        ],
        [
          "$1,600",
          "$1,380"
        ]
      ]
    },
    "options": [
      "$16 billion",
      "$20 billion",
      "$80 billion",
      "$100 billion",
      "$400 billion"
    ],
    "correctAnswer": "D",
    "explanation": "The spending multiplier is 1/MPS = 1/0.2 = 5. The change in GDP is 5 × $20 billion = $100 billion. A multiplier of 4 (MPC/MPS) is the size of the tax multiplier.",
    "videoExplanation": null,
    "subject": "ap_macroeconomics"
  },
  {
    "id": 26307,
    "unit": 3,
    "lessonIDS": [
      "3.2"
    ],
    "unitName": "National Income and Price Determination",
    "question": "The table shows consumption at different levels of disposable income for an economy. Using the MPC from the table, what is the maximum increase in real GDP that would result from a $10 billion decrease in lump-sum taxes?",
    "image": null,
    "tableData": {
      "headers": [
        "Disposable Income",
        "Consumption"
      ],
      "rows": [
        [
          "$1,000",
          "$900"
        ],
        [
          "$1,200",
          "$1,060"
        ],
        [
          "$1,400",
          "$1,220"
        ],
        [
          "$1,600",
          "$1,380"
        ]
      ]
    },
    "options": [
      "$8 billion",
      "$10 billion",
      "$40 billion",
      "$50 billion",
      "$100 billion"
    ],
    "correctAnswer": "C",
    "explanation": "The tax multiplier is -MPC/MPS = -0.8/0.2 = -4. A $10 billion tax cut raises GDP by 4 × $10 billion = $40 billion. The tax multiplier is smaller than the spending multiplier because part of the tax cut is saved.",
    "videoExplanation": null,
    "subject": "ap_macroeconomics"
  },
  {
    "id": 26308,
    "unit": 3,
    "lessonIDS": [
      "3.2"
    ],
    "unitName": "National Income and Price Determination",
    "question": "The table shows new spending in each round after the government increases its spending by $100 on a project. What is the value of the spending multiplier?",
    "image": null,
    "tableData": {
      "headers": [
        "Round",
        "New Spending"
      ],
      "rows": [
        [
          "1",
          "$100.00"
        ],
        [
          "2",
          "$75.00"
        ],
        [
          "3",
          "$56.25"
        ],
        [
          "4",
          "$42.19"
        ]
      ]
    },
    "options": [
      "0.75",
      "1.33",
      "3.0",
      "5.0",
      "4.0"
    ],
    "correctAnswer": "E",
    "explanation": "Each round of spending is 75% of the previous round, so the MPC = 0.75. The multiplier = 1/(1 - MPC) = 1/0.25 = 4.0.",
    "videoExplanation": null,
    "subject": "ap_macroeconomics"
  },
  {
    "id": 26309,
    "unit": 3,
    "lessonIDS": [
      "3.2"
    ],
    "unitName": "National Income and Price Determination",
    "question": "The table shows new spending in each round after the government increases its spending by $100 on a project. If the pattern continues, what is the total increase in spending after all rounds?",
    "image": null,
    "tableData": {
      "headers": [
        "Round",
        "New Spending"
      ],
      "rows": [
        [
          "1",
          "$100.00"
        ],
        [
          "2",
          "$75.00"
        ],
        [
          "3",
          "$56.25"
        ],
        [
          "4",
          "$42.19"
        ]
      ]
    },
    "options": [
      "$400",
      "$100",
      "$175",
      "$300",
      "$750"
    ],
    "correctAnswer": "A",
    "explanation": "The multiplier is 1/(1 - 0.75) = 4, so the total change in spending is 4 × $100 = $400. The sum of just the first two rounds is $175.",
    "videoExplanation": null,
    "subject": "ap_macroeconomics"
  },
  {
    "id": 26310,
    "unit": 3,
    "lessonIDS": [
      "3.2",
      "3.8"
    ],
    "unitName": "National Income and Price Determination",
    "question": "The table shows data for an economy that is in a recessionary gap. By how much should the government increase its spending, assuming no other changes, to close the output gap?",
    "image": null,
    "tableData": {
      "headers": [
        "Measure",
        "Value"
      ],
      "rows": [
        [
          "Potential real GDP",
          "$2,000 billion"
        ],
        [
          "Actual real GDP",
          "$1,800 billion"
        ],
        [
          "Marginal propensity to consume (MPC)",
          "0.75"
        ]
      ]
    },
    "options": [
      "$50 billion",
      "$66.7 billion",
      "$150 billion",
      "$200 billion",
      "$800 billion"
    ],
    "correctAnswer": "A",
    "explanation": "The output gap is $2,000 billion - $1,800 billion = $200 billion. The spending multiplier is 1/(1 - 0.75) = 4, so the required increase in government spending is $200 billion / 4 = $50 billion.",
    "videoExplanation": null,
    "subject": "ap_macroeconomics"
  },
  {
    "id": 26311,
    "unit": 3,
    "lessonIDS": [
      "3.2"
    ],
    "unitName": "National Income and Price Determination",
    "question": "In an economy, the government makes the policy changes shown in the table. What is the maximum change in real GDP?",
    "image": null,
    "tableData": {
      "headers": [
        "Policy Change",
        "Amount"
      ],
      "rows": [
        [
          "Increase in government spending",
          "$50 billion"
        ],
        [
          "Increase in lump-sum taxes",
          "$50 billion"
        ],
        [
          "Marginal propensity to consume (MPC)",
          "0.8"
        ]
      ]
    },
    "options": [
      "$0",
      "$50 billion",
      "$200 billion",
      "$250 billion",
      "$450 billion"
    ],
    "correctAnswer": "B",
    "explanation": "The spending effect is 5 × $50 billion = +$250 billion. The tax effect is -4 × $50 billion = -$200 billion. The net change is +$50 billion, which equals the change in government spending (the balanced budget multiplier is 1).",
    "videoExplanation": null,
    "subject": "ap_macroeconomics"
  },
  {
    "id": 26401,
    "unit": 4,
    "lessonIDS": [
      "4.4"
    ],
    "unitName": "Financial Sector",
    "question": "The table shows the balance sheet of a commercial bank. The required reserve ratio is 10%. What are the bank's excess reserves?",
    "image": null,
    "tableData": {
      "headers": [
        "Assets",
        "Amount",
        "Liabilities",
        "Amount"
      ],
      "rows": [
        [
          "Reserves",
          "$80",
          "Checkable deposits",
          "$500"
        ],
        [
          "Loans",
          "$420",
          "",
          ""
        ]
      ]
    },
    "options": [
      "$0",
      "$50",
      "$30",
      "$80",
      "$420"
    ],
    "correctAnswer": "C",
    "explanation": "Required reserves = 10% × $500 = $50. Excess reserves = actual reserves - required reserves = $80 - $50 = $30.",
    "videoExplanation": null,
    "subject": "ap_macroeconomics"
  },
  {
    "id": 26402,
    "unit": 4,
    "lessonIDS": [
      "4.4"
    ],
    "unitName": "Financial Sector",
    "question": "The table shows the balance sheet of a commercial bank. The required reserve ratio is 10%. If the bank lends out all of its excess reserves, what will the value of its loans be?",
    "image": null,
    "tableData": {
      "headers": [
        "Assets",
        "Amount",
        "Liabilities",
        "Amount"
      ],
      "rows": [
        [
          "Reserves",
          "$80",
          "Checkable deposits",
          "$500"
        ],
        [
          "Loans",
          "$420",
          "",
          ""
        ]
      ]
    },
    "options": [
      "$30",
      "$420",
      "$500",
      "$450",
      "$830"
    ],
    "correctAnswer": "D",
    "explanation": "Excess reserves are $30. Lending them out raises loans from $420 to $420 + $30 = $450, and reserves fall to the required $50.",
    "videoExplanation": null,
    "subject": "ap_macroeconomics"
  },
  {
    "id": 26403,
    "unit": 4,
    "lessonIDS": [
      "4.4"
    ],
    "unitName": "Financial Sector",
    "question": "The table shows the balance sheet of a commercial bank. The required reserve ratio is 10%. Assuming that banks lend out all excess reserves and no currency is held outside banks, what is the maximum total increase in checkable deposits in the banking system that can result from this bank's excess reserves?",
    "image": null,
    "tableData": {
      "headers": [
        "Assets",
        "Amount",
        "Liabilities",
        "Amount"
      ],
      "rows": [
        [
          "Reserves",
          "$80",
          "Checkable deposits",
          "$500"
        ],
        [
          "Loans",
          "$420",
          "",
          ""
        ]
      ]
    },
    "options": [
      "$30",
      "$150",
      "$500",
      "$3,000",
      "$300"
    ],
    "correctAnswer": "E",
    "explanation": "The money multiplier is 1/required reserve ratio = 1/0.10 = 10. The maximum change in deposits = excess reserves × multiplier = $30 × 10 = $300.",
    "videoExplanation": null,
    "subject": "ap_macroeconomics"
  },
  {
    "id": 26404,
    "unit": 4,
    "lessonIDS": [
      "4.4",
      "4.6"
    ],
    "unitName": "Financial Sector",
    "question": "The table shows the balance sheet of a commercial bank before any central bank action. The required reserve ratio is 10%. The central bank buys $40 of securities from this bank. What is the maximum amount of new loans this bank can make after the purchase?",
    "image": null,
    "tableData": {
      "headers": [
        "Assets",
        "Amount",
        "Liabilities",
        "Amount"
      ],
      "rows": [
        [
          "Reserves",
          "$100",
          "Checkable deposits",
          "$1,000"
        ],
        [
          "Securities",
          "$200",
          "",
          ""
        ],
        [
          "Loans",
          "$700",
          "",
          ""
        ]
      ]
    },
    "options": [
      "$0",
      "$40",
      "$100",
      "$140",
      "$400"
    ],
    "correctAnswer": "B",
    "explanation": "The purchase raises reserves from $100 to $140. Required reserves are still 10% × $1,000 = $100, so excess reserves are $40. The bank can lend $40.",
    "videoExplanation": null,
    "subject": "ap_macroeconomics"
  },
  {
    "id": 26405,
    "unit": 4,
    "lessonIDS": [
      "4.4",
      "4.6"
    ],
    "unitName": "Financial Sector",
    "question": "The table shows the balance sheet of a commercial bank before any central bank action. The required reserve ratio is 10%. The central bank buys $40 of securities from this bank. Assuming banks lend out all excess reserves and no currency is held outside banks, what is the maximum total increase in the money supply?",
    "image": null,
    "tableData": {
      "headers": [
        "Assets",
        "Amount",
        "Liabilities",
        "Amount"
      ],
      "rows": [
        [
          "Reserves",
          "$100",
          "Checkable deposits",
          "$1,000"
        ],
        [
          "Securities",
          "$200",
          "",
          ""
        ],
        [
          "Loans",
          "$700",
          "",
          ""
        ]
      ]
    },
    "options": [
      "$40",
      "$100",
      "$360",
      "$400",
      "$1,000"
    ],
    "correctAnswer": "D",
    "explanation": "Excess reserves rise by $40 and the money multiplier is 1/0.10 = 10, so the maximum increase in the money supply is $40 × 10 = $400.",
    "videoExplanation": null,
    "subject": "ap_macroeconomics"
  },
  {
    "id": 26406,
    "unit": 4,
    "lessonIDS": [
      "4.4"
    ],
    "unitName": "Financial Sector",
    "question": "A customer deposits $2,000 in cash in Bank A. The table shows the change in Bank A's balance sheet. The required reserve ratio is 20%. How much of the new reserves are excess reserves?",
    "image": null,
    "tableData": {
      "headers": [
        "Assets (change)",
        "Amount",
        "Liabilities (change)",
        "Amount"
      ],
      "rows": [
        [
          "Reserves",
          "+$2,000",
          "Checkable deposits",
          "+$2,000"
        ]
      ]
    },
    "options": [
      "$1,600",
      "$400",
      "$2,000",
      "$8,000",
      "$10,000"
    ],
    "correctAnswer": "A",
    "explanation": "Required reserves on the new deposit = 20% × $2,000 = $400. Excess reserves = $2,000 - $400 = $1,600.",
    "videoExplanation": null,
    "subject": "ap_macroeconomics"
  },
  {
    "id": 26407,
    "unit": 4,
    "lessonIDS": [
      "4.4"
    ],
    "unitName": "Financial Sector",
    "question": "A customer deposits $2,000 in cash in Bank A. The table shows the change in Bank A's balance sheet. The required reserve ratio is 20%, and all banks lend out all excess reserves. What is the maximum total amount of new loans the banking system can create from this deposit?",
    "image": null,
    "tableData": {
      "headers": [
        "Assets (change)",
        "Amount",
        "Liabilities (change)",
        "Amount"
      ],
      "rows": [
        [
          "Reserves",
          "+$2,000",
          "Checkable deposits",
          "+$2,000"
        ]
      ]
    },
    "options": [
      "$1,600",
      "$2,000",
      "$8,000",
      "$10,000",
      "$12,000"
    ],
    "correctAnswer": "C",
    "explanation": "Excess reserves are $1,600 and the money multiplier is 1/0.20 = 5. The maximum total new loans are $1,600 × 5 = $8,000.",
    "videoExplanation": null,
    "subject": "ap_macroeconomics"
  },
  {
    "id": 26408,
    "unit": 4,
    "lessonIDS": [
      "4.4",
      "4.6"
    ],
    "unitName": "Financial Sector",
    "question": "The table shows a bank's balance sheet when the required reserve ratio is 20%. The central bank lowers the required reserve ratio to 10%. By how much do the bank's excess reserves change as a result, and what is the new amount of excess reserves?",
    "image": null,
    "tableData": {
      "headers": [
        "Assets",
        "Amount",
        "Liabilities",
        "Amount"
      ],
      "rows": [
        [
          "Reserves",
          "$200",
          "Checkable deposits",
          "$1,000"
        ],
        [
          "Loans",
          "$800",
          "",
          ""
        ]
      ]
    },
    "options": [
      "They rise from $0 to $200.",
      "They rise from $100 to $200.",
      "They stay at $0.",
      "They fall from $200 to $100.",
      "They rise from $0 to $100."
    ],
    "correctAnswer": "E",
    "explanation": "At a 20% ratio, required reserves = $200, so excess reserves were $0. At a 10% ratio, required reserves = $100, so excess reserves = $200 - $100 = $100.",
    "videoExplanation": null,
    "subject": "ap_macroeconomics"
  },
  {
    "id": 26409,
    "unit": 4,
    "lessonIDS": [
      "4.3"
    ],
    "unitName": "Financial Sector",
    "question": "The table lists items from the balance sheet of a commercial bank. Which of the following is a liability of the bank?",
    "image": null,
    "tableData": {
      "headers": [
        "Item on a Bank's Balance Sheet",
        "Amount"
      ],
      "rows": [
        [
          "Reserves",
          "$60"
        ],
        [
          "Government bonds",
          "$100"
        ],
        [
          "Loans to customers",
          "$340"
        ],
        [
          "Checkable deposits",
          "$500"
        ]
      ]
    },
    "options": [
      "Checkable deposits, because the bank owes this money to its depositors.",
      "Reserves, because the bank is required to hold them.",
      "Loans to customers, because the bank has lent out the money.",
      "Government bonds, because the bank has to pay interest on them.",
      "None of the items, because every item on the list is an asset."
    ],
    "correctAnswer": "A",
    "explanation": "A liability is something the bank owes. Checkable deposits are owed to depositors. Reserves, loans, and government bonds are assets because they are owned by the bank or owed to the bank.",
    "videoExplanation": null,
    "subject": "ap_macroeconomics"
  },
  {
    "id": 26410,
    "unit": 4,
    "lessonIDS": [
      "4.3"
    ],
    "unitName": "Financial Sector",
    "question": "The table shows the components of the money supply in an economy. What is M1?",
    "image": null,
    "tableData": {
      "headers": [
        "Component",
        "Amount (billions)"
      ],
      "rows": [
        [
          "Currency in circulation",
          "$150"
        ],
        [
          "Checkable deposits",
          "$600"
        ],
        [
          "Savings accounts",
          "$900"
        ],
        [
          "Small time deposits",
          "$300"
        ]
      ]
    },
    "options": [
      "$150 billion",
      "$600 billion",
      "$750 billion",
      "$1,650 billion",
      "$1,950 billion"
    ],
    "correctAnswer": "C",
    "explanation": "M1 consists of currency in circulation and checkable deposits: $150 billion + $600 billion = $750 billion. Savings accounts and small time deposits are included in M2.",
    "videoExplanation": null,
    "subject": "ap_macroeconomics"
  },
  {
    "id": 26411,
    "unit": 4,
    "lessonIDS": [
      "4.3"
    ],
    "unitName": "Financial Sector",
    "question": "The table shows the components of the money supply in an economy. What is M2?",
    "image": null,
    "tableData": {
      "headers": [
        "Component",
        "Amount (billions)"
      ],
      "rows": [
        [
          "Currency in circulation",
          "$150"
        ],
        [
          "Checkable deposits",
          "$600"
        ],
        [
          "Savings accounts",
          "$900"
        ],
        [
          "Small time deposits",
          "$300"
        ]
      ]
    },
    "options": [
      "$750 billion",
      "$900 billion",
      "$1,650 billion",
      "$1,950 billion",
      "$2,250 billion"
    ],
    "correctAnswer": "D",
    "explanation": "M2 includes M1 plus savings accounts and small time deposits: $750 + $900 + $300 = $1,950 billion.",
    "videoExplanation": null,
    "subject": "ap_macroeconomics"
  },
  {
    "id": 26412,
    "unit": 4,
    "lessonIDS": [
      "4.2"
    ],
    "unitName": "Financial Sector",
    "question": "The table shows the nominal interest rate on a loan and the inflation rate in two years. What is the real interest rate in Year 2?",
    "image": null,
    "tableData": {
      "headers": [
        "Year",
        "Nominal Interest Rate",
        "Inflation Rate"
      ],
      "rows": [
        [
          "Year 1",
          "7%",
          "3%"
        ],
        [
          "Year 2",
          "7%",
          "5%"
        ]
      ]
    },
    "options": [
      "-2%",
      "2%",
      "4%",
      "7%",
      "12%"
    ],
    "correctAnswer": "B",
    "explanation": "Real interest rate = nominal interest rate - inflation rate = 7% - 5% = 2%. In Year 1 the real interest rate was 4%, so lenders earned less in real terms in Year 2.",
    "videoExplanation": null,
    "subject": "ap_macroeconomics"
  },
  {
    "id": 26501,
    "unit": 5,
    "lessonIDS": [
      "5.3"
    ],
    "unitName": "Long-Run Consequences of Stabilization Policies",
    "question": "The table shows data for an economy. Using the equation of exchange, MV = PY, what is the price level?",
    "image": null,
    "tableData": {
      "headers": [
        "Money Supply (M)",
        "Velocity (V)",
        "Real Output (Y)"
      ],
      "rows": [
        [
          "$500",
          "4",
          "1,000"
        ]
      ]
    },
    "options": [
      "0.50",
      "1.25",
      "4.00",
      "8.00",
      "2.00"
    ],
    "correctAnswer": "E",
    "explanation": "P = MV/Y = ($500 × 4)/1,000 = 2.00.",
    "videoExplanation": null,
    "subject": "ap_macroeconomics"
  },
  {
    "id": 26502,
    "unit": 5,
    "lessonIDS": [
      "5.3"
    ],
    "unitName": "Long-Run Consequences of Stabilization Policies",
    "question": "The table shows data for an economy. According to the quantity theory of money, what is nominal GDP?",
    "image": null,
    "tableData": {
      "headers": [
        "Money Supply (M)",
        "Velocity (V)",
        "Real Output (Y)"
      ],
      "rows": [
        [
          "$500",
          "4",
          "1,000"
        ]
      ]
    },
    "options": [
      "$500",
      "$1,000",
      "$2,000",
      "$2,500",
      "$4,000"
    ],
    "correctAnswer": "C",
    "explanation": "Nominal GDP = PY = MV = $500 × 4 = $2,000.",
    "videoExplanation": null,
    "subject": "ap_macroeconomics"
  },
  {
    "id": 26503,
    "unit": 5,
    "lessonIDS": [
      "5.3"
    ],
    "unitName": "Long-Run Consequences of Stabilization Policies",
    "question": "The table shows data for an economy. What is the velocity of money?",
    "image": null,
    "tableData": {
      "headers": [
        "Money Supply (M)",
        "Price Level (P)",
        "Real Output (Y)"
      ],
      "rows": [
        [
          "$200",
          "2",
          "500"
        ]
      ]
    },
    "options": [
      "0.4",
      "5.0",
      "2.5",
      "10.0",
      "25.0"
    ],
    "correctAnswer": "B",
    "explanation": "From MV = PY, V = PY/M = (2 × 500)/$200 = 5.0. Each dollar is spent an average of 5 times per year on final goods and services.",
    "videoExplanation": null,
    "subject": "ap_macroeconomics"
  },
  {
    "id": 26504,
    "unit": 5,
    "lessonIDS": [
      "5.3"
    ],
    "unitName": "Long-Run Consequences of Stabilization Policies",
    "question": "The table shows data for an economy, with the value of real output missing. What is real output (Y)?",
    "image": null,
    "tableData": {
      "headers": [
        "Money Supply (M)",
        "Velocity (V)",
        "Price Level (P)",
        "Real Output (Y)"
      ],
      "rows": [
        [
          "$600",
          "3",
          "1.5",
          "?"
        ]
      ]
    },
    "options": [
      "400",
      "900",
      "2,700",
      "1,200",
      "3,600"
    ],
    "correctAnswer": "D",
    "explanation": "From MV = PY, Y = MV/P = ($600 × 3)/1.5 = 1,200.",
    "videoExplanation": null,
    "subject": "ap_macroeconomics"
  },
  {
    "id": 26505,
    "unit": 5,
    "lessonIDS": [
      "5.3"
    ],
    "unitName": "Long-Run Consequences of Stabilization Policies",
    "question": "The table shows data for an economy in two years. Real output and velocity are constant. What is the price level in Year 2?",
    "image": null,
    "tableData": {
      "headers": [
        "Year",
        "Money Supply (M)",
        "Velocity (V)",
        "Real Output (Y)",
        "Price Level (P)"
      ],
      "rows": [
        [
          "Year 1",
          "$1,000",
          "5",
          "2,000",
          "2.50"
        ],
        [
          "Year 2",
          "$1,100",
          "5",
          "2,000",
          "?"
        ]
      ]
    },
    "options": [
      "2.75",
      "2.50",
      "2.60",
      "3.00",
      "5.50"
    ],
    "correctAnswer": "A",
    "explanation": "P = MV/Y = ($1,100 × 5)/2,000 = 2.75.",
    "videoExplanation": null,
    "subject": "ap_macroeconomics"
  },
  {
    "id": 26506,
    "unit": 5,
    "lessonIDS": [
      "5.3"
    ],
    "unitName": "Long-Run Consequences of Stabilization Policies",
    "question": "The table shows data for an economy in two years. Real output and velocity are constant. What is the inflation rate between Year 1 and Year 2?",
    "image": null,
    "tableData": {
      "headers": [
        "Year",
        "Money Supply (M)",
        "Velocity (V)",
        "Real Output (Y)",
        "Price Level (P)"
      ],
      "rows": [
        [
          "Year 1",
          "$1,000",
          "5",
          "2,000",
          "2.50"
        ],
        [
          "Year 2",
          "$1,100",
          "5",
          "2,000",
          "?"
        ]
      ]
    },
    "options": [
      "2.5%",
      "5.0%",
      "11.0%",
      "27.5%",
      "10.0%"
    ],
    "correctAnswer": "E",
    "explanation": "The price level rose from 2.50 to 2.75, so inflation = (2.75 - 2.50)/2.50 = 10%. This equals the 10% growth of the money supply, since V and Y did not change.",
    "videoExplanation": null,
    "subject": "ap_macroeconomics"
  },
  {
    "id": 26507,
    "unit": 5,
    "lessonIDS": [
      "5.3"
    ],
    "unitName": "Long-Run Consequences of Stabilization Policies",
    "question": "The table shows the annual growth rates of the variables in the equation of exchange for an economy. Approximately what is the annual inflation rate?",
    "image": null,
    "tableData": {
      "headers": [
        "Variable",
        "Annual Growth Rate"
      ],
      "rows": [
        [
          "Money supply (M)",
          "8%"
        ],
        [
          "Velocity (V)",
          "0%"
        ],
        [
          "Real output (Y)",
          "3%"
        ]
      ]
    },
    "options": [
      "0%",
      "3%",
      "5%",
      "8%",
      "11%"
    ],
    "correctAnswer": "C",
    "explanation": "In growth-rate form, %ΔM + %ΔV = %ΔP + %ΔY. So inflation ≈ 8% + 0% - 3% = 5%.",
    "videoExplanation": null,
    "subject": "ap_macroeconomics"
  },
  {
    "id": 26508,
    "unit": 5,
    "lessonIDS": [
      "5.3"
    ],
    "unitName": "Long-Run Consequences of Stabilization Policies",
    "question": "The table shows the annual growth rates of the variables in the equation of exchange for an economy. Approximately what is the annual inflation rate?",
    "image": null,
    "tableData": {
      "headers": [
        "Variable",
        "Annual Growth Rate"
      ],
      "rows": [
        [
          "Money supply (M)",
          "10%"
        ],
        [
          "Velocity (V)",
          "-2%"
        ],
        [
          "Real output (Y)",
          "4%"
        ]
      ]
    },
    "options": [
      "4%",
      "6%",
      "8%",
      "10%",
      "16%"
    ],
    "correctAnswer": "A",
    "explanation": "%ΔP = %ΔM + %ΔV - %ΔY = 10% + (-2%) - 4% = 4%. A falling velocity offsets part of the growth in the money supply.",
    "videoExplanation": null,
    "subject": "ap_macroeconomics"
  },
  {
    "id": 26509,
    "unit": 5,
    "lessonIDS": [
      "5.3"
    ],
    "unitName": "Long-Run Consequences of Stabilization Policies",
    "question": "The table shows the money supply, velocity, and real output in an economy before and after the central bank doubles the money supply. Velocity and real output are unchanged. What happens to the price level?",
    "image": null,
    "tableData": {
      "headers": [
        "Variable",
        "Before",
        "After"
      ],
      "rows": [
        [
          "Money supply (M)",
          "$500",
          "$1,000"
        ],
        [
          "Velocity (V)",
          "4",
          "4"
        ],
        [
          "Real output (Y)",
          "1,000",
          "1,000"
        ],
        [
          "Price level (P)",
          "2.0",
          "?"
        ]
      ]
    },
    "options": [
      "It rises from 2.0 to 3.0.",
      "It rises from 2.0 to 4.0.",
      "It stays at 2.0.",
      "It rises from 2.0 to 8.0.",
      "It falls from 2.0 to 1.0."
    ],
    "correctAnswer": "B",
    "explanation": "Before: P = ($500 × 4)/1,000 = 2.0. After: P = ($1,000 × 4)/1,000 = 4.0. With V and Y constant, the price level rises in proportion to the money supply, which is the quantity theory's prediction that money is neutral in the long run.",
    "videoExplanation": null,
    "subject": "ap_macroeconomics"
  },
  {
    "id": 26510,
    "unit": 5,
    "lessonIDS": [
      "5.3"
    ],
    "unitName": "Long-Run Consequences of Stabilization Policies",
    "question": "The table shows the annual growth rates of the variables in the equation of exchange for a country whose central bank is financing government spending by printing money. Approximately what is the annual inflation rate?",
    "image": null,
    "tableData": {
      "headers": [
        "Variable",
        "Annual Growth Rate"
      ],
      "rows": [
        [
          "Money supply (M)",
          "50%"
        ],
        [
          "Velocity (V)",
          "0%"
        ],
        [
          "Real output (Y)",
          "2%"
        ]
      ]
    },
    "options": [
      "2%",
      "25%",
      "50%",
      "48%",
      "52%"
    ],
    "correctAnswer": "D",
    "explanation": "%ΔP ≈ %ΔM + %ΔV - %ΔY = 50% + 0% - 2% = 48%. When the money supply grows much faster than real output, the result is high inflation.",
    "videoExplanation": null,
    "subject": "ap_macroeconomics"
  },
  {
    "id": 26601,
    "unit": 6,
    "lessonIDS": [
      "6.1"
    ],
    "unitName": "Open Economy - International Trade and Finance",
    "question": "The table shows the components of the current account of a country in a year. What is the balance on goods (the merchandise trade balance)?",
    "image": null,
    "tableData": {
      "headers": [
        "Item",
        "Amount (billions)"
      ],
      "rows": [
        [
          "Exports of goods",
          "$500"
        ],
        [
          "Imports of goods",
          "$620"
        ],
        [
          "Exports of services",
          "$200"
        ],
        [
          "Imports of services",
          "$150"
        ],
        [
          "Net investment income from abroad",
          "$30"
        ],
        [
          "Net transfers",
          "-$20"
        ]
      ]
    },
    "options": [
      "-$70 billion",
      "-$60 billion",
      "$50 billion",
      "$1,120 billion",
      "-$120 billion"
    ],
    "correctAnswer": "E",
    "explanation": "Balance on goods = exports of goods - imports of goods = $500 - $620 = -$120 billion, a trade deficit in goods.",
    "videoExplanation": null,
    "subject": "ap_macroeconomics"
  },
  {
    "id": 26602,
    "unit": 6,
    "lessonIDS": [
      "6.1"
    ],
    "unitName": "Open Economy - International Trade and Finance",
    "question": "The table shows the components of the current account of a country in a year. What is the balance on goods and services?",
    "image": null,
    "tableData": {
      "headers": [
        "Item",
        "Amount (billions)"
      ],
      "rows": [
        [
          "Exports of goods",
          "$500"
        ],
        [
          "Imports of goods",
          "$620"
        ],
        [
          "Exports of services",
          "$200"
        ],
        [
          "Imports of services",
          "$150"
        ],
        [
          "Net investment income from abroad",
          "$30"
        ],
        [
          "Net transfers",
          "-$20"
        ]
      ]
    },
    "options": [
      "-$120 billion",
      "-$70 billion",
      "-$60 billion",
      "-$20 billion",
      "$50 billion"
    ],
    "correctAnswer": "B",
    "explanation": "Goods: 500 - 620 = -120. Services: 200 - 150 = +50. The balance on goods and services = -120 + 50 = -$70 billion.",
    "videoExplanation": null,
    "subject": "ap_macroeconomics"
  },
  {
    "id": 26603,
    "unit": 6,
    "lessonIDS": [
      "6.1"
    ],
    "unitName": "Open Economy - International Trade and Finance",
    "question": "The table shows the components of the current account of a country in a year. What is the balance on the current account?",
    "image": null,
    "tableData": {
      "headers": [
        "Item",
        "Amount (billions)"
      ],
      "rows": [
        [
          "Exports of goods",
          "$500"
        ],
        [
          "Imports of goods",
          "$620"
        ],
        [
          "Exports of services",
          "$200"
        ],
        [
          "Imports of services",
          "$150"
        ],
        [
          "Net investment income from abroad",
          "$30"
        ],
        [
          "Net transfers",
          "-$20"
        ]
      ]
    },
    "options": [
      "-$120 billion",
      "-$70 billion",
      "-$60 billion",
      "$50 billion",
      "$60 billion"
    ],
    "correctAnswer": "C",
    "explanation": "Current account = balance on goods and services + net investment income + net transfers = -70 + 30 + (-20) = -$60 billion.",
    "videoExplanation": null,
    "subject": "ap_macroeconomics"
  },
  {
    "id": 26604,
    "unit": 6,
    "lessonIDS": [
      "6.1"
    ],
    "unitName": "Open Economy - International Trade and Finance",
    "question": "The table shows the components of the current account of a country in a year. Assuming that the statistical discrepancy is zero, what is the balance on the financial (capital) account?",
    "image": null,
    "tableData": {
      "headers": [
        "Item",
        "Amount (billions)"
      ],
      "rows": [
        [
          "Exports of goods",
          "$500"
        ],
        [
          "Imports of goods",
          "$620"
        ],
        [
          "Exports of services",
          "$200"
        ],
        [
          "Imports of services",
          "$150"
        ],
        [
          "Net investment income from abroad",
          "$30"
        ],
        [
          "Net transfers",
          "-$20"
        ]
      ]
    },
    "options": [
      "-$60 billion",
      "$0",
      "$30 billion",
      "$60 billion",
      "$120 billion"
    ],
    "correctAnswer": "D",
    "explanation": "The current account and the financial account must sum to zero. A current account deficit of $60 billion means the country is financing its extra imports by borrowing from abroad, so the financial account has a surplus of +$60 billion.",
    "videoExplanation": null,
    "subject": "ap_macroeconomics"
  },
  {
    "id": 26605,
    "unit": 6,
    "lessonIDS": [
      "6.1"
    ],
    "unitName": "Open Economy - International Trade and Finance",
    "question": "The table describes four international transactions. Which of the following transactions are recorded in the financial account?",
    "image": null,
    "tableData": {
      "headers": [
        "Transaction",
        "Description"
      ],
      "rows": [
        [
          "A",
          "A U.S. household buys a car made in Japan."
        ],
        [
          "B",
          "A Japanese investor buys U.S. Treasury bonds."
        ],
        [
          "C",
          "A U.S. company builds a new factory in Mexico."
        ],
        [
          "D",
          "A U.S. resident sends money to relatives in Canada."
        ]
      ]
    },
    "options": [
      "B and C only",
      "A and D only",
      "A and B only",
      "C and D only",
      "A, B, C, and D"
    ],
    "correctAnswer": "A",
    "explanation": "The financial account records purchases of financial and real assets across borders. The Japanese purchase of U.S. Treasury bonds (B) is a capital inflow, and the U.S. company building a factory in Mexico (C) is a capital outflow. The car import (A) and the transfer to relatives (D) are current account items.",
    "videoExplanation": null,
    "subject": "ap_macroeconomics"
  },
  {
    "id": 26606,
    "unit": 6,
    "lessonIDS": [
      "6.1"
    ],
    "unitName": "Open Economy - International Trade and Finance",
    "question": "The table describes four international transactions. Which of the following transactions are recorded as debits (payments to foreigners) in the current account?",
    "image": null,
    "tableData": {
      "headers": [
        "Transaction",
        "Description"
      ],
      "rows": [
        [
          "A",
          "A U.S. household buys a car made in Japan."
        ],
        [
          "B",
          "A Japanese investor buys U.S. Treasury bonds."
        ],
        [
          "C",
          "A U.S. company builds a new factory in Mexico."
        ],
        [
          "D",
          "A U.S. resident sends money to relatives in Canada."
        ]
      ]
    },
    "options": [
      "B and C only",
      "A and B only",
      "B and D only",
      "C and D only",
      "A and D only"
    ],
    "correctAnswer": "E",
    "explanation": "Imports of goods (A) and transfers sent abroad (D) are payments to foreigners and are current account debits. The other two transactions are financial account items.",
    "videoExplanation": null,
    "subject": "ap_macroeconomics"
  },
  {
    "id": 26607,
    "unit": 6,
    "lessonIDS": [
      "6.2"
    ],
    "unitName": "Open Economy - International Trade and Finance",
    "question": "The table shows the exchange rate between the U.S. dollar and the euro in two years. Which of the following correctly describes the change in the value of the dollar between Year 1 and Year 2?",
    "image": null,
    "tableData": {
      "headers": [
        "Year",
        "Euros per U.S. Dollar"
      ],
      "rows": [
        [
          "Year 1",
          "0.90"
        ],
        [
          "Year 2",
          "0.80"
        ]
      ]
    },
    "options": [
      "The dollar depreciated because each dollar buys fewer euros.",
      "The dollar appreciated because each dollar buys fewer euros.",
      "The dollar appreciated because the euro per dollar rate decreased.",
      "The dollar depreciated because each dollar buys more euros.",
      "The value of the dollar did not change because the rate is a ratio."
    ],
    "correctAnswer": "A",
    "explanation": "In Year 1 one dollar bought 0.90 euros, and in Year 2 it buys only 0.80 euros. The dollar is worth less in terms of euros, so it depreciated and the euro appreciated.",
    "videoExplanation": null,
    "subject": "ap_macroeconomics"
  },
  {
    "id": 26608,
    "unit": 6,
    "lessonIDS": [
      "6.2"
    ],
    "unitName": "Open Economy - International Trade and Finance",
    "question": "The table shows the exchange rate between the U.S. dollar and the euro in two years. In Year 2, what is the price in euros of a U.S.-made good that costs $50?",
    "image": null,
    "tableData": {
      "headers": [
        "Year",
        "Euros per U.S. Dollar"
      ],
      "rows": [
        [
          "Year 1",
          "0.90"
        ],
        [
          "Year 2",
          "0.80"
        ]
      ]
    },
    "options": [
      "€45",
      "€40",
      "€50",
      "€56.25",
      "€62.50"
    ],
    "correctAnswer": "B",
    "explanation": "Price in euros = $50 × 0.80 euros per dollar = €40. In Year 1 the same good cost $50 × 0.90 = €45, so it became cheaper for European buyers.",
    "videoExplanation": null,
    "subject": "ap_macroeconomics"
  },
  {
    "id": 26609,
    "unit": 6,
    "lessonIDS": [
      "6.2"
    ],
    "unitName": "Open Economy - International Trade and Finance",
    "question": "The table shows the exchange rate between the U.S. dollar and the euro in two years. In Year 2, what is the price in dollars of a European-made good that costs €100?",
    "image": null,
    "tableData": {
      "headers": [
        "Year",
        "Euros per U.S. Dollar"
      ],
      "rows": [
        [
          "Year 1",
          "0.90"
        ],
        [
          "Year 2",
          "0.80"
        ]
      ]
    },
    "options": [
      "$80",
      "$90",
      "$111.11",
      "$125",
      "$180"
    ],
    "correctAnswer": "D",
    "explanation": "Price in dollars = €100 / 0.80 euros per dollar = $125. In Year 1 the price was €100/0.90 ≈ $111.11, so the good became more expensive for U.S. buyers.",
    "videoExplanation": null,
    "subject": "ap_macroeconomics"
  },
  {
    "id": 26610,
    "unit": 6,
    "lessonIDS": [
      "6.2",
      "6.5"
    ],
    "unitName": "Open Economy - International Trade and Finance",
    "question": "The table shows the exchange rate between the U.S. dollar and the euro in two years. Holding everything else constant, what is the most likely effect of the change in the exchange rate on U.S. exports, U.S. imports, and U.S. net exports?",
    "image": null,
    "tableData": {
      "headers": [
        "Year",
        "Euros per U.S. Dollar"
      ],
      "rows": [
        [
          "Year 1",
          "0.90"
        ],
        [
          "Year 2",
          "0.80"
        ]
      ]
    },
    "options": [
      "Exports decrease, imports increase, and net exports decrease.",
      "Exports increase, imports increase, and net exports are unchanged.",
      "Exports increase, imports decrease, and net exports increase.",
      "Exports decrease, imports decrease, and net exports increase.",
      "Exports and imports are unchanged, and net exports are unchanged."
    ],
    "correctAnswer": "C",
    "explanation": "The depreciation of the dollar makes U.S. goods cheaper for foreigners (exports rise) and foreign goods more expensive for Americans (imports fall). Net exports rise.",
    "videoExplanation": null,
    "subject": "ap_macroeconomics"
  },
  {
    "id": 26611,
    "unit": 6,
    "lessonIDS": [
      "6.6",
      "6.5"
    ],
    "unitName": "Open Economy - International Trade and Finance",
    "question": "The table shows real interest rates in two regions. Holding everything else constant, which of the following is the most likely result in the foreign exchange market?",
    "image": null,
    "tableData": {
      "headers": [
        "Region",
        "Real Interest Rate Last Year",
        "Real Interest Rate This Year"
      ],
      "rows": [
        [
          "United States",
          "2%",
          "4%"
        ],
        [
          "Euro area",
          "2%",
          "2%"
        ]
      ]
    },
    "options": [
      "The U.S. dollar depreciates, and U.S. net exports increase.",
      "The U.S. dollar appreciates, and U.S. net exports increase.",
      "The U.S. dollar depreciates, and U.S. net exports decrease.",
      "The U.S. dollar and U.S. net exports do not change.",
      "The U.S. dollar appreciates, and U.S. net exports decrease."
    ],
    "correctAnswer": "E",
    "explanation": "Higher U.S. real interest rates attract foreign financial capital, which increases the demand for dollars and causes the dollar to appreciate. An appreciated dollar makes U.S. exports more expensive and imports cheaper, so net exports decrease.",
    "videoExplanation": null,
    "subject": "ap_macroeconomics"
  }
];
