export const conceptChecks = {
    macroeconomics: {
      1: {
        title: "Basic Economic Concepts",
        questions: [
          {
            text: "What is the opportunity cost of attending college?",
            tags: ["opportunity cost", "trade-offs", "scarcity"],
            relevantLessons: ["1.1 - Scarcity", "1.2 - Opportunity Cost and Production Possibilities Curve"],
            unit: 1
          },
          {
            text: "What does a production possibilities curve (PPC) illustrate?",
            tags: ["ppc", "trade-offs", "efficiency"], 
            relevantLessons: ["1.2 - Opportunity Cost and Production Possibilities Curve"],
            unit: 1
          }, 
          {
            text: "What does it mean if a country is operating at a point inside its production possibilities curve?",
            tags: ["ppc", "trade-offs", "efficiency"], 
            relevantLessons: ["1.2 - Opportunity Cost and Production Possibilities Curve"],
            unit: 1
          }, 
          {
            text: "What does it mean if a country has a comparative advantage in producing a good?",
            tags: ["comparative advantage", "international trade"],
            relevantLessons: ["1.3 - Comparative Advantage and Trade"],
            unit: 1
          }
        ]
      },
      2: {
        title: "Economic Indicators and the Business Cycle",
        questions: [
          {
            text: "What is one limitation of using the Consumer Price Index (CPI) to measure inflation?",
            tags: ["inflation", "cpi"],
            relevantLessons: ["2.4 - Price Indices and Inflation"],
            unit: 2
          }, 
          {
            text: "If a country's nominal GDP increases from Year 1 to Year 2, but their real GDP remains the same, what can we infer about the change in price level and production in the country?",
            tags: ["gdp", "real vs nominal", "economic growth"],
            relevantLessons: ["2.6 - Real vs. Nominal GDP"],
            unit: 2
          },
          {
            text: "If a large number of unemployed workers become discouraged workers, how will this affect the unemployment rate?",
            tags: ["unemployment", "business cycle"],
            relevantLessons: ["2.3 - Unemployment"],
            unit: 2
          }, 
          {
            text: "Are personal savings considered a leakage or injection according to the circular flow model of income?",
            tags: ["ciricular flow model", "GDP"],
            relevantLessons: ["2.1 - Circular Flow and GDP"],
            unit: 2
          }, 
          {
            text: "If Toyota - a Japenese car company - produces vehicles in a factory in America, which country's GDP does this production count towards? Explain.",
            tags: ["ciricular flow model", "GDP"],
            relevantLessons: ["2.1 - Circular Flow and GDP"],
            unit: 2
          }, 
          {
            text: "Why do government transfer payments, such as social security payments to retirees, not count towards a country's GDP?",
            tags: ["GDP", "Government Spending"],
            relevantLessons: ["2.1 - Circular Flow and GDP"],
            unit: 2
          }, 
          {
            text: "How does unemployment and RGDP change during the contractionary phase of a business cycle?",
            tags: ["Business Cycles", "Unemployment", "RGDP"],
            relevantLessons: ["2.7 - Business Cycles"],
            unit: 2
          }
        ]
      }, 
      3: { 
        title: "National Income and Price Determination ",
        questions: [
          {
            text: "What happens to purchasing power when the price level increases?",
            tags: ["inflation", "aggregate demand"],
            relevantLessons: ["3.1 - Aggregate Demand"],
            unit: 3
          }, 
          {
            text: "What is the relationship between the aggregate demand curve and the price level?",
            tags: ["aggregate demand", "price level"],
            relevantLessons: ["3.1 - Aggregate Demand"],
            unit: 3
          }, 
          {
            text: "How will an increase in the price level affect a country's net exports?. Explain.",
            tags: ["aggregate demand", "price level", "net exports"],
            relevantLessons: ["3.1 - Aggregate Demand"],
            unit: 3
          }, 
          {
            text: "What will happen to a country's spending multiplier if the marginal propensity to consume (MPC) decreases?",
            tags: ["mpc", "spending multiplier", "gdp"],
            relevantLessons: ["3.2 - Spending and Tax Multipliers"],
            unit: 3
          }, 
          {
            text: "Why will a $1 billion increase in government spending have a total impact on GDP of more than $1 billion?",
            tags: ["spending multiplier", "gdp", "fiscal policy"],
            relevantLessons: ["3.2 - Spending and Tax Multipliers"],
            unit: 3
          }, 
          {
            text: "Why is the short-run aggregate supply curve upward sloping? Use 'sticky wages' in your explanation.",
            tags: ["aggregate supply", "sticky wages"],
            relevantLessons: ["3.3 - Short-Run Aggregate Supply (SRAS)"],
            unit: 3
          }
        ]
      }, 
      4: {
        title: "Financial Sector",
        questions: [
          {
            text: "What are the three functions of money?",
            tags: ["money", "financial sector"],
            relevantLessons: ["4.1 - Financial Assets"],
            unit: 4
          },
          {
            text: "How does an increase in the reserve requirement affect the money supply?",
            tags: ["reserve requirement", "money supply"],
            relevantLessons: ["4.4 - Fractional Reserve Banking and the Money Multiplier"],
            unit: 4
          },
          {
            text: "What happens to interest rates when the central bank conducts an open market purchase of government bonds?",
            tags: ["monetary policy", "interest rates"],
            relevantLessons: ["4.6 - Monetary Policy"],
            unit: 4
          },
          {
            text: "What is the difference between real and nominal interest rates?",
            tags: ["interest rates", "inflation"],
            relevantLessons: ["4.5 - The Loanable Funds Market"],
            unit: 4
          },
          {
            text: "How does an increase in government borrowing affect the loanable funds market?",
            tags: ["loanable funds market", "crowding out"],
            relevantLessons: ["4.5 - The Loanable Funds Market"],
            unit: 4
          }
        ]
      },
      5: {
        title: "Long-Run Consequences of Stabilization Policies",
        questions: [
          {
            text: "What are the long-run effects of expansionary monetary policy?",
            tags: ["monetary policy", "inflation"],
            relevantLessons: ["5.2 - Money Growth and Inflation"],
            unit: 5
          },
          {
            text: "How does an increase in the national debt impact future economic growth?",
            tags: ["national debt", "economic growth"],
            relevantLessons: ["5.1 - Fiscal Policy and Economic Growth"],
            unit: 5
          },
          {
            text: "What role do automatic stabilizers play in the economy?",
            tags: ["fiscal policy", "automatic stabilizers"],
            relevantLessons: ["5.3 - Automatic Stabilizers"],
            unit: 5
          },
          {
            text: "How does a supply-side shock affect long-run aggregate supply (LRAS)?",
            tags: ["aggregate supply", "supply-side economics"],
            relevantLessons: ["5.4 - Supply-Side Policies"],
            unit: 5
          },
          {
            text: "What is the Phillips Curve and what does it illustrate about inflation and unemployment?",
            tags: ["Phillips Curve", "inflation", "unemployment"],
            relevantLessons: ["5.5 - The Phillips Curve"],
            unit: 5
          }
        ]
      },
      6: {
        title: "Open Economy: International Trade and Finance",
        questions: [
          {
            text: "How does an increase in the interest rate affect capital inflows and the exchange rate?",
            tags: ["exchange rate", "capital inflows"],
            relevantLessons: ["6.2 - Exchange Rates"],
            unit: 6
          },
          {
            text: "What are the effects of a depreciation of the domestic currency on net exports?",
            tags: ["exchange rate", "net exports"],
            relevantLessons: ["6.3 - The Foreign Exchange Market"],
            unit: 6
          },
          {
            text: "How does a trade surplus impact the financial (capital) account balance?",
            tags: ["balance of payments", "trade surplus"],
            relevantLessons: ["6.1 - Balance of Payments"],
            unit: 6
          },
          {
            text: "What is the difference between a fixed and floating exchange rate system?",
            tags: ["exchange rate", "monetary policy"],
            relevantLessons: ["6.2 - Exchange Rates"],
            unit: 6
          },
          {
            text: "How does an increase in the money supply affect the foreign exchange market?",
            tags: ["monetary policy", "foreign exchange"],
            relevantLessons: ["6.3 - The Foreign Exchange Market"],
            unit: 6
          }
        ]
      }
    },
    microeconomics: {
      unit1: {
        title: "Basic Economic Concepts",
        questions: [
          {
            text: "How could marginal analysis help someone determine the optimal number of hours to study for an exam?",
            tags: ["marginal analysis", "decision-making", "cost-benefit"],
            relevantLessons: ["1.5 - Cost-Benefit Analysis", "1.6 - Marginal Analysis and Consumer Choice"],
            unit: 1
          }
        ]
      },
      unit2: {
        title: "Supply and Demand",
        questions: [
          {
            text: "What happens to the equilibrium price when there is a simultaneous increase in demand and a decrease in supply?",
            tags: ["equilibrium", "supply shift", "demand shift"], 
            relevantLessons: ["2.1 - Demand", "2.2 - Supply", "2.7 - Market Disequilibrium and Changes in Equilibrium"],
            unit: 2
          }
        ]
      }
    }
  };
  