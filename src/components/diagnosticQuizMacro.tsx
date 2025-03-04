'use client'

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"

// Add this interface at the top with other imports
interface Answers {
  [key: number]: string;
}

interface MacroQuestion {
  id: number;
  unit: number;
  unitName: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

// Questions data embedded directly in component
const macroQuestions: MacroQuestion[] = [
  {
    id: 1,
    unit: 1,
    unitName: "Basic Economic Concepts",
    question: "If an economy's production possibilities frontier becomes steeper as it moves from point A to point B, this indicates that",
    options: [
      "resources are becoming more specialized",
      "the economy is becoming more efficient",
      "opportunity costs are increasing",
      "technology is improving",
      "resources are being underutilized"
    ],
    correctAnswer: "C",
    explanation: "A steeper section of the PPF indicates that opportunity costs are rising because resources are becoming less adaptable to producing the alternative good."
  },
  {
    id: 2,
    unit: 2,
    unitName: "Economic Indicators and the Business Cycle",
    question: "Which measurement would most accurately reflect improvements in a country's standard of living over a 10-year period?",
    options: [
      "Real GDP per capita",
      "Nominal GDP growth rate",
      "Total population growth",
      "Aggregate consumer spending",
      "National unemployment rate"
    ],
    correctAnswer: "A",
    explanation: "Real GDP per capita accounts for both inflation and population changes, making it the best measure of how the average person's economic well-being has changed over time."
  },
  {
    id: 3,
    unit: 3,
    unitName: "National Income and Price Determination",
    question: "In an economy with a marginal propensity to consume of 0.8, if businesses increase investment spending by $50 billion, what is the maximum possible increase in equilibrium GDP, assuming no crowding out?",
    options: [
      "$40 billion",
      "$100 billion",
      "$200 billion",
      "$250 billion",
      "$400 billion"
    ],
    correctAnswer: "D",
    explanation: "Using the spending multiplier formula (1/(1-MPC) = 1/(1-0.8) = 5), multiply the initial change ($50B) by 5 to get $250B maximum change in GDP."
  },
  {
    id: 4,
    unit: 4,
    unitName: "Financial Sector",
    question: "If a commercial bank has $100,000 in new deposits and the required reserve ratio is 10%, what is the maximum amount of new loans this single bank can create?",
    options: [
      "$10,000",
      "$90,000",
      "$100,000",
      "$900,000",
      "$1,000,000"
    ],
    correctAnswer: "B",
    explanation: "With a 10% reserve requirement, the bank must keep $10,000 in reserves and can lend out the remaining $90,000. This represents the maximum amount this single bank can lend from the new deposits."
  },
  {
    id: 5,
    unit: 5,
    unitName: "Long-Run Consequences of Stabilization Policies",
    question: "If the central bank doubles the money supply while the economy is operating at full employment, what will be the long-run effect on real output and prices?",
    options: [
      "Real output and prices will both double",
      "Real output will double while prices remain stable",
      "Prices will double while real output remains stable",
      "Real output will increase by 50% and prices by 50%",
      "Both will increase but by less than double"
    ],
    correctAnswer: "C",
    explanation: "Due to the classical dichotomy and monetary neutrality in the long run, changes in the money supply only affect nominal variables. The price level will double while real output remains unchanged."
  },
  {
    id: 6,
    unit: 6,
    unitName: "Open Economy - International Trade and Finance",
    question: "A tech company in Country A develops software for clients in Country B. Which of the following statements is correct regarding this transaction?",
    options: [
      "It increases Country A's financial account surplus",
      "It increases Country A's current account surplus",
      "It decreases Country A's trade deficit",
      "It has no effect on either country's balance of payments",
      "It increases Country A's capital account deficit"
    ],
    correctAnswer: "B",
    explanation: "Software development services exported to another country count as a service export, which increases the current account surplus of the exporting country (Country A)."
  },
  {
    id: 7,
    unit: 1,
    unitName: "Basic Economic Concepts",
    question: "Marcus recently graduated from a coding bootcamp but cannot find work because employers in his area are primarily seeking candidates with traditional computer science degrees. Marcus's situation best represents",
    options: [
      "cyclical unemployment",
      "structural unemployment",
      "frictional unemployment",
      "seasonal unemployment",
      "natural unemployment"
    ],
    correctAnswer: "B",
    explanation: "This represents structural unemployment because there's a mismatch between Marcus's skills/qualifications and what employers are seeking in the labor market."
  },
  {
    id: 8,
    unit: 2,
    unitName: "Economic Indicators and the Business Cycle",
    question: "A restaurant chain purchases new kitchen equipment for $500,000 and increases its food inventory by $50,000. How will these transactions affect the components of GDP?",
    options: [
      "Investment increases by $500,000 only",
      "Investment increases by $50,000 only",
      "Investment increases by $550,000",
      "Consumption increases by $550,000",
      "Consumption increases by $500,000 and investment by $50,000"
    ],
    correctAnswer: "C",
    explanation: "Both the equipment purchase ($500,000) and inventory increase ($50,000) count as investment in GDP calculations, for a total investment increase of $550,000."
  },
  {
    id: 9,
    unit: 3,
    unitName: "National Income and Price Determination",
    question: "If the government increases infrastructure spending by $200 billion, which of the following would most likely reduce the size of the resulting multiplier effect?",
    options: [
      "A decrease in tax rates",
      "An increase in transfer payments",
      "A decrease in interest rates",
      "An increase in interest rates",
      "A decrease in imports"
    ],
    correctAnswer: "D",
    explanation: "Higher interest rates would lead to crowding out of private investment, reducing the size of the multiplier effect from the government spending increase."
  },
  {
    id: 10,
    unit: 4,
    unitName: "Financial Sector",
    question: "If nominal GDP is $800 billion, money velocity is 4, and the price level is 2, what must be the money supply?",
    options: [
      "$100 billion",
      "$200 billion",
      "$400 billion",
      "$1,600 billion",
      "$3,200 billion"
    ],
    correctAnswer: "A",
    explanation: "Using MV = PY, solve for M: M = PY/V = ($800B × 2)/4 = $100B"
  },
  {
    id: 11,
    unit: 5,
    unitName: "Long-Run Consequences of Stabilization Policies",
    question: "An economy has experienced steadily increasing inflation for several years. Workers have begun demanding annual cost-of-living adjustments in their contracts. This behavior will most likely result in",
    options: [
      "decreased unemployment",
      "a more effective Phillips curve trade-off",
      "reduced inflation expectations",
      "a self-fulfilling inflation cycle",
      "improved real wage rates"
    ],
    correctAnswer: "D",
    explanation: "When workers build inflation expectations into wage demands, it creates a wage-price spiral that can perpetuate inflation, making it self-fulfilling."
  },
  {
    id: 12,
    unit: 6,
    unitName: "Open Economy - International Trade and Finance",
    question: "If investors become concerned about Country X's economic stability, which of the following is most likely to occur in the short run?",
    options: [
      "Country X's currency will appreciate",
      "Country X's currency will depreciate",
      "Country X's exports will decrease",
      "Country X's trade surplus will increase",
      "Country X's interest rates will decrease"
    ],
    correctAnswer: "B",
    explanation: "When investors lose confidence in a country's economy, they typically move their investments elsewhere, leading to a decrease in demand for that country's currency and causing it to depreciate."
  }, 
  {
    id: 13,
    unit: 1,
    unitName: "Basic Economic Concepts",
    question: "A small island nation currently uses all its resources to produce either coconuts or fish. If a new fishing technology is introduced that only affects fish production, the production possibilities frontier will",
    options: [
      "shift outward only along the fish axis",
      "shift outward evenly along both axes",
      "become steeper at all points",
      "become flatter at all points",
      "shift inward along the coconut axis"
    ],
    correctAnswer: "A",
    explanation: "Since the technological improvement only affects fish production, the PPF will shift outward asymmetrically, with the fish axis extending further while the coconut intercept remains unchanged."
  },
  {
    id: 14,
    unit: 2,
    unitName: "Economic Indicators and the Business Cycle",
    question: "During a recession, which of the following combinations is most likely to occur?",
    options: [
      "Rising GDP and falling unemployment",
      "Rising inventories and falling orders",
      "Rising investment and falling interest rates",
      "Rising exports and falling imports",
      "Rising productivity and falling costs"
    ],
    correctAnswer: "B",
    explanation: "During a recession, businesses typically experience unwanted inventory accumulation as consumer spending falls, while new orders decrease due to pessimistic economic expectations."
  },
  {
    id: 15,
    unit: 3,
    unitName: "National Income and Price Determination",
    question: "If household wealth suddenly decreases due to a stock market decline, which of the following is most likely to occur?",
    options: [
      "Aggregate demand will increase",
      "The saving rate will decrease",
      "Consumption spending will decrease",
      "Investment spending will increase",
      "Government spending will decrease"
    ],
    correctAnswer: "C",
    explanation: "A decline in household wealth creates a negative wealth effect, causing households to reduce consumption spending as they feel poorer."
  },
  {
    id: 16,
    unit: 4,
    unitName: "Financial Sector",
    question: "A central bank aims to reduce inflation. Which combination of monetary policy tools would be most effective?",
    options: [
      "Lower discount rate and buy government securities",
      "Raise discount rate and sell government securities",
      "Lower reserve requirements and buy government securities",
      "Raise reserve requirements and lower discount rate",
      "Lower discount rate and raise reserve requirements"
    ],
    correctAnswer: "B",
    explanation: "To reduce inflation, the central bank would use contractionary monetary policy: raising the discount rate to discourage borrowing and selling government securities to reduce the money supply."
  },
  {
    id: 17,
    unit: 5,
    unitName: "Long-Run Consequences of Stabilization Policies",
    question: "A government implements policies to improve education and worker training programs. This would most directly affect which curve?",
    options: [
      "Short-run aggregate supply",
      "Aggregate demand",
      "Long-run aggregate supply",
      "Short-run Phillips curve",
      "Money demand curve"
    ],
    correctAnswer: "C",
    explanation: "Improving education and worker training enhances labor productivity and increases the economy's productive capacity, shifting the long-run aggregate supply curve right."
  },
  {
    id: 18,
    unit: 6,
    unitName: "Open Economy - International Trade and Finance",
    question: "If Country Y's inflation rate increases while its trading partners' inflation rates remain stable, what will likely happen to Country Y's net exports?",
    options: [
      "Increase due to higher domestic prices",
      "Increase due to currency appreciation",
      "Decrease due to relative price changes",
      "Remain unchanged due to sticky prices",
      "Decrease due to currency appreciation"
    ],
    correctAnswer: "C",
    explanation: "Higher inflation makes Country Y's goods relatively more expensive than those of its trading partners, reducing exports and increasing imports, thus decreasing net exports."
  },
  {
    id: 19,
    unit: 1,
    unitName: "Basic Economic Concepts",
    question: "An economy is producing inside its production possibilities frontier. This most likely indicates",
    options: [
      "efficient resource allocation",
      "technological improvement",
      "unemployed resources",
      "unlimited wants",
      "economic growth"
    ],
    correctAnswer: "C",
    explanation: "Production inside the PPF indicates that the economy is not using all available resources efficiently, typically due to unemployment of resources."
  },
  {
    id: 20,
    unit: 2,
    unitName: "Economic Indicators and the Business Cycle",
    question: "If nominal GDP increases by 8% and the GDP deflator increases by 3%, the real GDP growth rate is",
    options: [
      "11%",
      "5%",
      "3%",
      "2.67%",
      "-5%"
    ],
    correctAnswer: "B",
    explanation: "Real GDP growth can be calculated by subtracting the inflation rate from nominal GDP growth: 8% - 3% = 5% real GDP growth."
  },
  {
    id: 21,
    unit: 3,
    unitName: "National Income and Price Determination",
    question: "A decrease in business taxes would most likely result in",
    options: [
      "decreased aggregate demand and increased aggregate supply",
      "increased aggregate demand and decreased aggregate supply",
      "increased aggregate demand and increased aggregate supply",
      "decreased aggregate demand and decreased aggregate supply",
      "no change in either aggregate demand or supply"
    ],
    correctAnswer: "C",
    explanation: "Lower business taxes increase both aggregate demand (through increased business spending and investment) and aggregate supply (through lower production costs)."
  },
  {
    id: 22,
    unit: 4,
    unitName: "Financial Sector",
    question: "If people suddenly prefer to hold more currency relative to deposits, this will likely cause",
    options: [
      "an increase in the money multiplier",
      "a decrease in the money multiplier",
      "an increase in bank reserves",
      "an increase in the money supply",
      "no change in the money supply"
    ],
    correctAnswer: "B",
    explanation: "When people hold more currency relative to deposits, banks have fewer deposits to lend out, reducing the money multiplier and the banking system's ability to create money."
  },
  {
    id: 23,
    unit: 5,
    unitName: "Long-Run Consequences of Stabilization Policies",
    question: "In an economy experiencing stagflation, which policy combination would be most appropriate?",
    options: [
      "Expansionary fiscal policy and expansionary monetary policy",
      "Contractionary fiscal policy and expansionary monetary policy",
      "Supply-side policies and contractionary monetary policy",
      "Supply-side policies and expansionary monetary policy",
      "Contractionary fiscal policy and contractionary monetary policy"
    ],
    correctAnswer: "D",
    explanation: "Stagflation requires addressing both inflation and stagnation. Supply-side policies help increase production and reduce costs, while expansionary monetary policy helps combat the stagnation."
  },
  {
    id: 24,
    unit: 6,
    unitName: "Open Economy - International Trade and Finance",
    question: "A government imposes a new tariff on imported steel. This will most directly lead to",
    options: [
      "increased domestic steel prices and increased steel imports",
      "decreased domestic steel prices and decreased steel production",
      "increased domestic steel prices and increased domestic production",
      "decreased domestic steel prices and increased steel imports",
      "no change in domestic prices or production"
    ],
    correctAnswer: "C",
    explanation: "A tariff raises the price of imported steel, allowing domestic producers to raise their prices while increasing production to meet the shift in demand toward domestic steel."
  },
  {
    id: 25,
    unit: 2,
    unitName: "Economic Indicators and the Business Cycle",
    question: "Which scenario would NOT be counted in the current year's GDP calculation?",
    options: [
      "A restaurant purchases new kitchen equipment",
      "A family purchases a newly built home",
      "A collector purchases a classic car built in 1965",
      "A farmer sells crops harvested this year",
      "A factory adds to its inventory of finished goods"
    ],
    correctAnswer: "C",
    explanation: "The purchase of a used good (the classic car) is not counted in GDP because it was counted when originally produced. Only the dealer's markup (service) would be included."
  },
  {
    id: 26,
    unit: 3,
    unitName: "National Income and Price Determination",
    question: "When consumption increases by $400 billion following a $500 billion increase in disposable income, the marginal propensity to",
    options: [
      "consume is 0.8 and save is 0.2",
      "consume is 0.2 and save is 0.8",
      "consume is 1.25 and save is -0.25",
      "save is 0.8 and consume is 0.2",
      "consume and save are both 0.5"
    ],
    correctAnswer: "A",
    explanation: "The MPC is calculated as change in consumption divided by change in disposable income: $400B/$500B = 0.8. Since MPC + MPS = 1, the MPS must be 0.2."
  },
  {
    id: 27,
    unit: 4,
    unitName: "Financial Sector",
    question: "If market interest rates rise above the interest paid on bank deposits, individuals are most likely to",
    options: [
      "increase their checking account balances",
      "decrease their purchase of bonds",
      "increase their savings account balances",
      "decrease their holdings of currency",
      "decrease their bank deposits in favor of bonds"
    ],
    correctAnswer: "E",
    explanation: "When market interest rates exceed bank deposit rates, individuals tend to withdraw money from bank accounts to purchase higher-yielding bonds, seeking better returns."
  },
  {
    id: 28,
    unit: 5,
    unitName: "Long-Run Consequences of Stabilization Policies",
    question: "A nation's natural rate of unemployment would most likely decrease if",
    options: [
      "unemployment benefits were increased",
      "job search websites became more efficient",
      "labor unions gained more bargaining power",
      "minimum wage laws were strengthened",
      "worker protection regulations increased"
    ],
    correctAnswer: "B",
    explanation: "More efficient job search methods reduce frictional unemployment by helping workers find jobs more quickly, thereby lowering the natural rate of unemployment."
  },
  {
    id: 29,
    unit: 6,
    unitName: "Open Economy - International Trade and Finance",
    question: "If a country's currency appreciates, which group would most likely benefit?",
    options: [
      "Domestic exporters selling abroad",
      "Domestic tourism companies",
      "Domestic consumers buying imports",
      "Foreign companies selling in the domestic market",
      "Domestic companies competing with imports"
    ],
    correctAnswer: "C",
    explanation: "Currency appreciation makes foreign goods cheaper for domestic consumers, benefiting those who purchase imported goods."
  },
  {
    id: 30,
    unit: 1,
    unitName: "Basic Economic Concepts",
    question: "In a competitive labor market, if the wage rate is above the equilibrium level, which of the following will occur?",
    options: [
      "A shortage of workers will develop",
      "A surplus of workers will develop",
      "The demand for labor will increase",
      "The supply of labor will decrease",
      "Unemployment will decrease"
    ],
    correctAnswer: "B",
    explanation: "When wages are above equilibrium, more people want to work than firms want to hire, creating a surplus of workers (unemployment)."
  }
];


const diagnosticQuizMacro = () => {
  const [selectedQuestions, setSelectedQuestions] = useState<MacroQuestion[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [showResults, setShowResults] = useState(false);
  const [explanations, setExplanations] = useState<{[key: number]: boolean}>({});
  const [showDetailedResults, setShowDetailedResults] = useState(false);

  const selectRandomQuestions = () => {
    const questionsByUnit = macroQuestions.reduce((acc: Record<string, MacroQuestion[]>, question) => {
      if (!acc[question.unit]) {
        acc[question.unit] = [];
      }
      acc[question.unit].push(question);
      return acc;
    }, {});

    let selected: MacroQuestion[] = [];
    Object.values(questionsByUnit).forEach(unitQuestions => {
      const shuffled = [...unitQuestions].sort(() => Math.random() - 0.5);
      selected.push(...shuffled.slice(0, 2));
    });

    if (selected.length < 12) {
      const remainingNeeded = 12 - selected.length;
      const usedIds = new Set(selected.map(q => q.id));
      const remaining = macroQuestions.filter(q => !usedIds.has(q.id));
      const additionalQuestions = remaining
        .sort(() => Math.random() - 0.5)
        .slice(0, remainingNeeded);
      selected.push(...additionalQuestions);
    }

    return selected.sort(() => Math.random() - 0.5);
  };

  useEffect(() => {
    setSelectedQuestions(selectRandomQuestions());
  }, []);

  // Update score calculation
  const calculateScore = () => {
    let correct = 0;
    Object.keys(answers).forEach(questionId => {
      const id = parseInt(questionId);
      const question = selectedQuestions[id];
      if (answers[id] === question.correctAnswer) {
        correct++;
      }
    });
    return (correct / selectedQuestions.length) * 100;
  };

  const handleAnswer = (questionId: number, answerIndex: number) => {
    setAnswers({
      ...answers,
      [questionId]: String.fromCharCode(65 + answerIndex)  // Converts 0->A, 1->B, etc.
    });
  };

  // Update the main quiz view to use selectedQuestions
  const question = selectedQuestions[currentQuestion];

  // Add this function to toggle explanations
  const toggleExplanation = (index: number) => {
    setExplanations(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  // Don't render until questions are selected
  if (selectedQuestions.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-6 border rounded-lg shadow-sm">
      {!showResults ? (
        // Quiz taking interface
        <>
          <div className="mb-4">
            <h2 className="text-2xl font-bold">AP Macro Diagnostic Quiz</h2>
          </div>
          <div>
            <div className="mb-4">
              <div className="text-sm text-gray-500">
                Question {currentQuestion + 1} of {selectedQuestions.length} 
                <span className="ml-2 bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-semibold">
                  Unit {question.unit}
                </span>
              </div>
            </div>
            
            <div className="mb-6">
              <p className="text-lg font-medium">{question.question}</p>
            </div>

            <div className="space-y-3 mb-8">
              {question.options.map((option, index) => (
                <div
                  key={index}
                  className={`p-3 border rounded cursor-pointer hover:bg-gray-50 
                    ${answers[currentQuestion] === String.fromCharCode(65 + index) ? 'border-blue-500 bg-blue-50' : ''}`}
                  onClick={() => handleAnswer(currentQuestion, index)}
                >
                  <span className="font-semibold mr-2">{String.fromCharCode(97 + index)})</span>
                  {option}
                </div>
              ))}
            </div>

            <div className="flex justify-between mt-4">
              <Button 
                onClick={() => setCurrentQuestion(currentQuestion - 1)}
                disabled={currentQuestion === 0}
                className="px-6 py-3 text-lg" // Larger button
              >
                Previous
              </Button>
              {currentQuestion === selectedQuestions.length - 1 ? (
                <Button 
                  onClick={() => setShowResults(true)}
                  className="px-6 py-3 text-lg bg-green-600 hover:bg-green-700" // Larger button
                >
                  Submit Quiz
                </Button>
              ) : (
                <Button 
                  onClick={() => setCurrentQuestion(currentQuestion + 1)}
                  className="px-6 py-3 text-lg" // Larger button
                >
                  Next
                </Button>
              )}
            </div>
          </div>
        </>
      ) : (
        // Results interface
        <div>
          <h2 className="text-2xl font-bold mb-4">Quiz Results</h2>
          <p className="text-xl mb-6">
            <span className="font-bold">Your Score: </span>
            <span className="font-normal">
              {Object.values(answers).filter((answer, index) => 
                answer === selectedQuestions[index].correctAnswer
              ).length}/12 ({Math.round(calculateScore())}%)
            </span>
          </p>
          
          <div className="flex gap-4 mb-6">
            <Button 
              onClick={() => setShowDetailedResults(!showDetailedResults)}
              className="px-6 py-3 text-lg"
            >
              {showDetailedResults ? 'Hide Results' : 'View Results'}
            </Button>

            <Button 
              onClick={() => {
                console.log("Generate study plan");
              }}
              className="px-6 py-3 text-lg bg-blue-600 hover:bg-blue-700"
            >
              Get Personalized Study Plan
            </Button>
          </div>
          
          {showDetailedResults && (
            <div className="space-y-6">
              {selectedQuestions.map((q, index) => {
                const isCorrect = answers[index] === q.correctAnswer;
                
                return (
                  <div key={index} className={`p-4 rounded-lg border ${isCorrect ? 'bg-green-50' : 'bg-red-50'}`}>
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-bold text-lg mb-2">Question {index + 1}</p>
                        <p className="mb-2">{q.question}</p>
                        <p className="mb-1"><span className="font-bold">Your Answer:</span> {q.options[answers[index].charCodeAt(0) - 65]}</p>
                        <p className={`font-semibold ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                          {isCorrect ? (
                            <span className="font-bold">Correct!</span>
                          ) : (
                            <>
                              <span className="font-bold">Correct answer: </span>
                              <span className="font-normal">{q.options[q.correctAnswer.charCodeAt(0) - 65]}</span>
                            </>
                          )}
                        </p>
                      </div>
                    </div>
                    
                    <Button
                      onClick={() => toggleExplanation(index)}
                      variant="outline"
                      className="mt-2"
                    >
                      {explanations[index] ? 'Hide' : 'Show'} Explanation
                    </Button>
                    
                    {explanations[index] && (
                      <div className="mt-2 p-3 bg-gray-50 rounded">
                        {q.explanation}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default diagnosticQuizMacro;