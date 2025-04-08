export const conceptChecks = {
    macroeconomics: {
      1: {
        title: "Basic Economic Concepts",
        questions: [
          {
            text: "What is the opportunity cost of attending college?",
            tags: ["opportunity cost", "trade-offs", "scarcity"],
            lessonIDS: ["1.1", "1.2"],
            unit: 1
          },
          {
            text: "What does a production possibilities curve (PPC) illustrate?",
            tags: ["ppc", "trade-offs", "efficiency"], 
            lessonIDS: ["1.2"],
            unit: 1
          }, 
          {
            text: "What does it mean if a country is operating at a point inside its production possibilities curve?",
            tags: ["ppc", "trade-offs", "efficiency"], 
            lessonIDS: ["1.2"],
            unit: 1
          }, 
          {
            text: "What does it mean if a country has a comparative advantage in producing a good?",
            tags: ["comparative advantage", "international trade"],
            lessonIDS: ["1.3"],
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
            lessonIDS: ["2.4"],
            unit: 2
          }, 
          {
            text: "If a country's nominal GDP increases from Year 1 to Year 2, but their real GDP remains the same, what can we infer about the change in price level and production in the country?",
            tags: ["gdp", "real vs nominal", "economic growth"],
            lessonIDS: ["2.6"],
            unit: 2
          },
          {
            text: "If a large number of unemployed workers become discouraged workers, how will this affect the unemployment rate?",
            tags: ["unemployment", "business cycle"],
            lessonIDS: ["2.3"],
            unit: 2
          }, 
          {
            text: "Are personal savings considered a leakage or injection according to the circular flow model of income?",
            tags: ["ciricular flow model", "GDP"],
            lessonIDS: ["2.1"],
            unit: 2
          }, 
          {
            text: "If Toyota - a Japenese car company - produces vehicles in a factory in America, which country's GDP does this production count towards? Explain.",
            tags: ["ciricular flow model", "GDP"],
            lessonIDS: ["2.1"],
            unit: 2
          }, 
          {
            text: "Why do government transfer payments, such as social security payments to retirees, not count towards a country's GDP?",
            tags: ["GDP", "Government Spending"],
            lessonIDS: ["2.1"],
            unit: 2
          }, 
          {
            text: "How does unemployment and RGDP change during the contractionary phase of a business cycle?",
            tags: ["Business Cycles", "Unemployment", "RGDP"],
            lessonIDS: ["2.7"],
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
            lessonIDS: ["3.1"],
            unit: 3
          }, 
          {
            text: "What is the relationship between the aggregate demand curve and the price level?",
            tags: ["aggregate demand", "price level"],
            lessonIDS: ["3.1"],
            unit: 3
          }, 
          {
            text: "How will an increase in the price level affect a country's net exports?. Explain.",
            tags: ["aggregate demand", "price level", "net exports"],
            lessonIDS: ["3.1"],
            unit: 3
          }, 
          {
            text: "What will happen to a country's spending multiplier if the marginal propensity to consume (MPC) decreases?",
            tags: ["mpc", "spending multiplier", "gdp"],
            lessonIDS: ["3.2"],
            unit: 3
          }, 
          {
            text: "Why will a $1 billion increase in government spending have a total impact on GDP of more than $1 billion?",
            tags: ["spending multiplier", "gdp", "fiscal policy"],
            lessonIDS: ["3.2"],
            unit: 3
          }, 
          {
            text: "Why is the short-run aggregate supply curve upward sloping? Use 'sticky wages' in your explanation.",
            tags: ["aggregate supply", "sticky wages"],
            lessonIDS: ["3.3"],
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
            lessonIDS: ["4.1"],
            unit: 4
          },
          {
            text: "How does an increase in the reserve requirement affect the money supply?",
            tags: ["reserve requirement", "money supply"],
            lessonIDS: ["4.4"],
            unit: 4
          },
          {
            text: "What happens to interest rates when the central bank conducts an open market purchase of government bonds?",
            tags: ["monetary policy", "interest rates"],
            lessonIDS: ["4.6"],
            unit: 4
          },
          {
            text: "What is the difference between real and nominal interest rates?",
            tags: ["interest rates", "inflation"],
            lessonIDS: ["4.5"],
            unit: 4
          },
          {
            text: "How does an increase in government borrowing affect the loanable funds market?",
            tags: ["loanable funds market", "crowding out"],
            lessonIDS: ["4.5"],
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
            lessonIDS: ["5.2"],
            unit: 5
          },
          {
            text: "How does an increase in the national debt impact future economic growth?",
            tags: ["national debt", "economic growth"],
            lessonIDS: ["5.1"],
            unit: 5
          },
          {
            text: "What role do automatic stabilizers play in the economy?",
            tags: ["fiscal policy", "automatic stabilizers"],
            lessonIDS: ["5.3"],
            unit: 5
          },
          {
            text: "How does a supply-side shock affect long-run aggregate supply (LRAS)?",
            tags: ["aggregate supply", "supply-side economics"],
            lessonIDS: ["5.4"],
            unit: 5
          },
          {
            text: "What is the Phillips Curve and what does it illustrate about inflation and unemployment?",
            tags: ["Phillips Curve", "inflation", "unemployment"],
            lessonIDS: ["5.5"],
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
            lessonIDS: ["6.2"],
            unit: 6
          },
          {
            text: "What are the effects of a depreciation of the domestic currency on net exports?",
            tags: ["exchange rate", "net exports"],
            lessonIDS: ["6.3"],
            unit: 6
          },
          {
            text: "How does a trade surplus impact the financial (capital) account balance?",
            tags: ["balance of payments", "trade surplus"],
            lessonIDS: ["6.1"],
            unit: 6
          },
          {
            text: "What is the difference between a fixed and floating exchange rate system?",
            tags: ["exchange rate", "monetary policy"],
            lessonIDS: ["6.2"],
            unit: 6
          },
          {
            text: "How does an increase in the money supply affect the foreign exchange market?",
            tags: ["monetary policy", "foreign exchange"],
            lessonIDS: ["6.3"],
            unit: 6
          }
        ]
      }
    },
    microeconomics: {
      1: {
        title: "Basic Economic Concepts",
        questions: [
          {
            text: "What does it mean for a country to have a comparative advantage in the production of a good?",
            tags: ["comparative advantage", "trade", "opportunity cost"],
            lessonIDS: ["1.4"],
            unit: 1
          },
          {
            text: "How is the allocation of resources determined in a market economy?",
            tags: ["economic systems", "resource allocation", "scarcity"],
            lessonIDS: ["1.1", "1.2"],
            unit: 1
          },
          {
            text: "What does a bowed out production possibilities curve represent in terms of opportunity cost?",
            tags: ["ppc", "opportunity cost"],
            lessonIDS: ["1.3", "1.2"],
            unit: 1
          },
          {
            text: "Finish the sentence: According to marginal analysis, a person should continue to consume additional units of a good until...",
            tags: ["marginal utility", "consumer choice", "diminishing returns"],
            lessonIDS: ["1.6"],
            unit: 1
          },
          {
            text: "At the current level of consumption, Lidia's marginal utility per dollar for Good X is 5 and her marginal utility per dollar for Good Y is 3. How should Lidia change her consumption of Good X and Good Y to maximize utility?",
            tags: ["budget constraint", "consumer choice", "indifference curve"],
            lessonIDS: ["1.6"],
            unit: 1
          }
        ]
      },
      2: {
        title: "Supply and Demand",
        questions: [
          {
            text: "What is consumer surplus, and how is it represented on a demand curve?",
            tags: ["consumer surplus", "demand curve", "economic welfare"],
            lessonIDS: ["2.1", "2.7", "2.8"],
            unit: 2
          },
          {
            text: "What is producer surplus, and how does it differ from consumer surplus?",
            tags: ["producer surplus", "supply curve", "surplus"],
            lessonIDS: ["2.1", "2.7", "2.8"],
            unit: 2
          },
          {
            text: "How do price floors and price ceilings lead to inefficiencies in a market?",
            tags: ["price floors", "price ceilings", "market inefficiency"],
            lessonIDS: ["2.8"],
            unit: 2
          },
          {
            text: "Suppose the country of Econland engages in international trade and the world price for steel is lower than the domestic price. If the government imposes tariffs on steel imports, what will happen to domestic consumer surplus and domestic produder surplus in Econland?",
            tags: ["tariffs", "consumer surplus", "producer surplus"],
            lessonIDS: ["2.9"],
            unit: 2
          },
          {
            text: "Will total revenue increase or decrease when a firm selling a good with an elastic demand raises the price?",
            tags: ["elasticity", "total revenue"],
            lessonIDS: ["2.3"],
            unit: 2
          }, 
          {
            text: "Explain two factors that influence the demand elasticity of a good.",
            tags: ["elasticity", "demand"],
            lessonIDS: ["2.3"],
            unit: 2
          }, 
          {
            text: "What is deadweight loss?",
            tags: ["elasticity", "demand"],
            lessonIDS: ["2.7", "2.8"],
            unit: 2
          }, 
          {
            text: "Will the implementation of a binding price floor lead to an increase or decrease in producer surplus? Explain.",
            tags: ["elasticity", "demand"],
            lessonIDS: ["2.8"],
            unit: 2
          }
        ]
      },
      3: {
        title: "Production, Cost, and the Perfect Competition Model",
        questions: [
          {
            text: "What does `the short-run` refer to in microeconomics?",
            tags: ["short-run production"],
            lessonIDS: ["3.1", "3.2"],
            unit: 3
          },
          {
            text: "When marginal product is positive, what impact does adding another input have on total product?",
            tags: ["marginal product", "total produce"],
            lessonIDS: ["3.1"],
            unit: 3
          },
          {
            text: "If the average product of labor is falling, is the marginal product of labor greater than, less than, or equal to the average product of labor?",
            tags: ["marginal product", "average product"],
            lessonIDS: ["3.1"],
            unit: 3
          },
          {
            text: "If a perfectly competitive firm is producing at a point where price = $15, average total cost = $20, and average variable cost = $10 should they continue producing or shut down in the short-run?",
            tags: ["shut-down rule"],
            lessonIDS: ["3.6"],
            unit: 3
          }, 
          {
            text: "Explain why perfectly competitive firms have a perfectly elastic product demand curve.",
            tags: ["perfect competition", "elasticity"],
            lessonIDS: ["3.7"],
            unit: 3
          }, 
          {
            text: "Perfectly competitive firms producing rice are currently earning economic profits in the short-run. Explain what will happen in the market and how this will result in firms earning zero economic profits in the long-run.",
            tags: ["perfect competition"],
            lessonIDS: ["3.7"],
            unit: 3
          }, 
          {
            text: "Explain the difference between `short-run production` and `long-run production` in microeconomics.",
            tags: ["short-run production", "long-run production"],
            lessonIDS: ["3.2", "3.3"],
            unit: 3
          }, 
          {
            text: "Why might a firm experience economies of scale?",
            tags: ["long-run production costs", "economies of scale"],
            lessonIDS: ["3.3"],
            unit: 3
          }, 
        ]
      },
      4: {
        title: "Imperfect Competition",
        questions: [
          {
            text: "Why is MR < D for a single-price monopoly?",
            tags: ["monopoly", "marginal revenue"],
            lessonIDS: ["4.2"],
            unit: 4
          },
          {
            text: "What are barriers to entry? Of the four market structures - perfect competition, monopolistic competition, oligopolies, and monopolies - which markets structures have high barriers to entry?",
            tags: ["barriers to entry"],
            lessonIDS: ["4.1"],
            unit: 4
          },
          {
            text: "How does product differentiation lead to market power in monopolistic competition?",
            tags: ["monopolistic competition", "differentiation"],
            lessonIDS: ["4.4"],
            unit: 4
          },
          {
            text: "If a single-price monopoly starts perfectly price discriminating, what will happen to consumer surplus?",
            tags: ["monopoly", "price discrimination"],
            lessonIDS: ["4.3"],
            unit: 4
          }, 
          {
            text: "What is the key difference between perfectly competitive firms and monopolistically competitive firms?",
            tags: ["perfect competition", "monopolistic competition"],
            lessonIDS: ["4.1", "4.4"],
            unit: 4
          }
        ]
      },
      5: {
        title: "Factor Markets",
        questions: [
          {
            text: "Explain how an increase in worker productivity will impact marginal revenue product (MRP) and the demand for those workers?",
            tags: ["marginal product of labor", "demand for labor", "labor market"],
            lessonIDS: ["5.1"],
            unit: 5
          },
          {
            text: "Explain the concept of derived demand and provide an example.",
            tags: ["derived demand", "demand for labor"],
            lessonIDS: ["5.1"],
            unit: 5
          },
          {
            text: "Finish this sentence: A profit-maximizing firm will continue to hire additional units of labor until...",
            tags: ["profit-maximization"],
            lessonIDS: ["5.3"],
            unit: 5
          },
          {
            text: "Supply the government in Econland makes it more difficult to receive a medical license. How will this impact the labor market for doctors? Your answer should state the shift that will occur of the labor market graph, as well as the change in the equilibrium wage rate.",
            tags: ["labor market", "wage determination"],
            lessonIDS: ["5.2"],
            unit: 5
          }, 
          {
            text: "What is a monopsonistic labor market? How does the equilibrium wage rate in this type of labor market compare to the equilibrium wage rate in a perfectly competitive labor market?",
            tags: ["monopsony"],
            lessonIDS: ["5.4"],
            unit: 5
          }
        ]
      },
      6: {
        title: "Market Failure and the Role of Government",
        questions: [
          {
            text: "What is a negative externality, and how might the government correct this externality?",
            tags: ["negative externality", "market failure"],
            lessonIDS: ["6.1", "6.2"],
            unit: 6
          },
          {
            text: "A per-unit subsidy could be used to correct what type of externality?",
            tags: ["government intervention", "subsidies"],
            lessonIDS: ["6.2", "6.3"],
            unit: 6
          },
          {
            text: "How might the government use marginal analysis to determine whether or not to build a new shipping port? Your answer should refer to marginal social benefit and marginal social cost.",
            tags: ["positive externality", "market failure", "subsidy"],
            lessonIDS: ["6.1"],
            unit: 6
          },
          {
            text: "What is the role of government in providing public goods and how does it address the free rider problem?",
            tags: ["public goods", "free rider problem", "government intervention"],
            lessonIDS: ["6.3"],
            unit: 6
          }, 
          {
            text: "What is `fair return pricing` and how does it impact the economic profits of natural monopolies?",
            tags: ["government intervention", "natural monopoly"],
            lessonIDS: ["6.1"],
            unit: 6
          }, 
          {
            text: "What are progressive taxes and how can they be used to reduce wealth inequality?",
            tags: ["inequality", "taxes"],
            lessonIDS: ["6.5"],
            unit: 6
          }
        ]
      }
    }
};
  