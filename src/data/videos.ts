export type Question = {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
  image?: string;
}

export type Video = {
  id: string;
  title: string;
  description: string;
  videoSlug: string;
  subjects: string[];
  unit: string;
  videoUrl: string;
  thumbnail?: string;
  tags: string[];
  accessLevel: "free" | "premium";
  questions: Question[];
  lessonIDS: string[];
}

export const videos: Video[] = [
    {
      id: "1",
      title: "3.8: Fiscal Policy & Long-Run Self-Adjustment",
      description: "Learn about how an economy returns to long-run equilibrium from an output gap.",
      videoSlug: "fiscal-policy-long-run-self-adjustment",
      subjects: ["AP Macroeconomics"],
      unit: "3",
      lessonIDS: ["3.8", "3.7"],
      tags: ["Fiscal Policy", "Long-Run Self-Adjustment"],
      videoUrl: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/fiscalpolicylrsa.mp4",
      thumbnail: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/Whiteboard+2.jpg",
      accessLevel: "free",
      questions: [
        {
          id: "1",
          text: "Fiscal policy impacts which of the following curves on the AD/AS graph?",
          options: ["SRAS", "LRAS", "AD", "Money supply"],
          correctAnswer: 2
        },
        {
          id: "2",
          text: "Long-run self-adjusment occurs due to a shift in which of the following curves on the AD/AS graph?",
          options: ["LRAS", "SRAS", "Money supply", "AD"],
          correctAnswer: 1
        },
        {
          id: "3",
          text: "Which of the following explains how an economy could return to long-run equilibrium from a recessionary gap?",
          options: ["Contractionary fiscal policy increases AD", "Expansionary fiscal policy decreases AD", "A decrease in wages leads to more hiring and a decrease in production", "A decrease in wages leads to more hiring and an increase in production"],
          correctAnswer: 3
        }
      ]
    },
    {
      id: "2",
      title: "4.6: Open Market Operations",
      description: "Learn how buying and selling government bonds actually leads to changes in the money supply.",
      videoSlug: "open-market-operations",
      subjects: ["AP Macroeconomics"],
      unit: "4",
      lessonIDS: ["4.6"],
      tags: ["Open Market Operations", "Monetary Policy"],
      videoUrl: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/openmarketoperations.mp4",
      thumbnail: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/OMOThumbnail.jpg",
      accessLevel: "free",
      questions: [
        {
          id: "1",
          text: "When the central bank purchases government bonds from a commerical bank, what happens to the money supply?",
          options: ["It increases", "It decreases", "It stays the same", "There is no effect on the money supply"],
          correctAnswer: 0
        },
        {
          id: "2",
          text: "Which of the following actions would the central bank likely take when the economy is experiencing high inflation?",
          options: ["Buy government bonds", "Sell government bonds"],
          correctAnswer: 1
        },
        {
          id: "3",
          text: "What is one economic consequence of the central bank buying government bonds?",
          options: ["It increases interest rates", "It increases the price level", "It increases unemployment", "It decreases SRAS"],
          correctAnswer: 1
        }
      ],
    }, 
    {
        id: "3",
        title: "6.6: Shifters in the Foreign Exchange Market",
        description: "Learn how to conceptually understand the shifts in the foreign exchange market.",
        videoSlug: "foreign-exchange-market-shifters",
        subjects: ["AP Macroeconomics"],
        unit: "6",
        lessonIDS: ["6.6"],
        tags: ["Forex Market", "Interest Rates"],
        videoUrl: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/forex.mp4",
        thumbnail: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/Whiteboard.jpg",
        accessLevel: "free",
        questions: [
          {
            id: "1",
            text: "Which of the following might lead to an increase in demand for the British Pound?",
            options: ["An increase in the British money supply", "An increase in British income taxes", "An increase in British real interest rates relative to other countries", "An economic recession in Britain"],
            correctAnswer: 0
          },
          {
            id: "2",
            text: "The exchange rate (Peso/Dollar) shows which of the following?",
            options: ["How many dollars you can get with a single Peso", "How many Pesos you can get with a single Dollar"],
            correctAnswer: 1
          },
          {
            id: "3",
            text: "An increase in demand for the US dollar by holders of the Japenese Yen will cause which of the following?",
            options: ["An increase in supply of the Yen in the foreign exchange market and the appreciation of the Yen", "A decrease in supply of the Yen in the foreign exchange market and the appreciation of the Yen", "An increase in supply of the Yen in the foreign exchange market and the depreciation of the Yen", "A decrease in supply of the Yen in the foreign exchange market and the depreciation of the Yen"],
            correctAnswer: 2
          }
        ],
      }, 
      {
        id: "4",
        title: "5.5: The Crowding Out Effect",
        description: "Learn how government borrowing can lead to a decrease in private investment.",
        videoSlug: "crowding-out-effect",
        subjects: ["AP Macroeconomics"],
        unit: "5",
        lessonIDS: ["5.5"],
        tags: ["Crowding Out", "Interest Rates", "Investment"],
        videoUrl: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/crowding+out+effect.mp4",
        thumbnail: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/CrowdingOutEffectThumbnail.jpg",
        accessLevel: "free",
        questions: [
          {
            id: "1",
            text: "Which of the following will move the federal government budget towards a deficit?",
            options: ["Expansionary monetary policy", "Expansionary fiscal policy", "Contractionary fiscal policy", "Contractionary monetary policy"],
            correctAnswer: 1
          },
          {
            id: "2",
            text: "The relationship between RIR and investment spending can be best described by which of the following?",
            options: ["An inverse relationship - higher interest rates leads to higher levels of investment spending", "A direct relationship - higher interest rates leads to higher levels of investment spending", "An inverse relationship - lower interest rates leads to higher levels of investment spending", "A direct relationship - lower interest rates leads to lower levels of investment spending"],
            correctAnswer: 2
          },
          {
            id: "3",
            text: "Which of the following will lead to a decrease in the demand for loanable funds?",
            options: ["An increase in taxes for a country that previously had a balanced federal budget", "A decrease in taxes for a country that previously had a balanced federal budget", "An increase in government spending for a country that previously had a balanced federal budget", "An increase in investment spending due to higher levels of expected profits"],
            correctAnswer: 0
          }
        ],
      }, 
      {
        id: "5",
        title: "6.4: Policy Action and Currency Value",
        description: "Learn how fiscal and monetary policy actions can lead to changes in the value of a currency.",
        videoSlug: "policy-action-currency-value",
        subjects: ["AP Macroeconomics"],
        unit: "6",
        lessonIDS: ["6.4"],
        tags: ["Forex Market", "Fiscal Policy", "Monetary Policy"],
        videoUrl: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/policy+action+and+currency+Value.mp4",
        thumbnail: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/policy+action+forex+thumbnail.jpg",
        accessLevel: "free",
        questions: [
          {
            id: "1",
            text: "Expansionary monetary policy will impact nominal interest rates and real interest rates in which of the following ways?",
            options: ["NIR will decrease and RIR will increase", "NIR will increase and RIR will decrease", "Both NIR and RIR will increase", "Both NIR and RIR will decrease"],
            correctAnswer: 3
          },
          {
            id: "2",
            text: "If a country's government implements contractionary fiscal policy, what will happen to the value of its currency?",
            options: ["The currency will depreciate", "The currency will appreciate"],
            correctAnswer: 1
          },
          {
            id: "3",
            text: "If a country implements both expansionary fiscal policy and expansionary monetary policy, what will happen to the RIR and RGDP?",
            options: ["A decrease in RIR and an increase in RGDP", "An indeterminate change in RIR and an increase in RGDP", "An increase in RIR and a decrease in RGDP", "An indeterminate change in both RIR and RGDP"],
            correctAnswer: 1
          }
        ],
      }, 
      {
        id: "6",
        title: "5.2: Phillips Curve and AD-AS Graph (AD Shifts)",
        description: "Learn about the connection between the Phillips Curve and the AD-AS graph",
        videoSlug: "phillips-curve-ad-as-ad-shifts",
        subjects: ["AP Macroeconomics"],
        unit: "5",
        lessonIDS: ["5.2"],
        tags: ["Phillips Curve", "AD-AS", "Monetary Policy", "Fiscal Policy"],
        videoUrl: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/phillips+curve+ad+as+ad+shift.mp4",
        thumbnail: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/PhillipsCurveADASGraphThumbnail.jpg",
        accessLevel: "free",
        questions: [
          {
            id: "1",
            text: "Which of the following will lead to an upward movement along the short-run Phillips Curve?",
            options: ["A decrease in net exports", "An increase in personal income taxes", "The purchase of government bonds by the central bank", "A sudden increase in input prices"],
            correctAnswer: 2
          },
          {
            id: "2",
            text: "A downward movement along the short-run Phillips Curve represents which of the following?",
            options: ["An increase in inflation and a decrease in unemployment", "A decrease in both inflation and unemployment", "A decrease in inflation and an increase in unemployment", "An increase in both inflation and unemployment"],
            correctAnswer: 2
          },
          {
            id: "3",
            text: "An inflationary gap on the AD-AS graph corresponds to which of the following on the Phillips Curve?",
            options: ["A short-run equilibrium to the right of the LRPC", "A short-run equilibrium at the intersection of SRPC and LRPC", "a short-run equilibrium along the LRPC and above the SRPC", "A short-run equilibrium to the left of the LRPC"],
            correctAnswer: 3
          }
        ],
      }, 
      {
        id: "7",
        title: "5.2:Phillips Curve and AD-AS Graph (SRAS Shifts)",
        description: "Learn about the connection between the Phillips Curve and the AD-AS graph",
        videoSlug: "phillips-curve-ad-as-sras-shifts",
        subjects: ["AP Macroeconomics"],
        unit: "5",
        lessonIDS: ["5.2"],
        tags: ["Phillips Curve", "AD-AS", "Monetary Policy", "Fiscal Policy"],
        videoUrl: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/phillips+curve+ad+as+sras+shift.mp4",
        thumbnail: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/PhillipsCurveADASGraphThumbnail.jpg",
        accessLevel: "free",
        questions: [
          {
            id: "1",
            text: "A leftward shift of the SRPC indicated which of the following changes to the inflation rate and unemployment rate?",
            options: ["A decrease in inflation and an increase in unemployment", "A increase in both inflation and unemployment", "An decrease in both inflation and unemployment", "A decrease in inflation and an increase in unemployment"],
            correctAnswer: 2
          },
          {
            id: "2",
            text: "Which of the following best describes how an economy in an inflationary gap will return the long-run equilibrium in the absence of the any policy action?",
            options: ["AD will shift left and the SRPC will shift right", "SRAS will shift left and the SRPC will shift right", "AD will shift left and there will be an upwards movement along the SRPC", "SRAS will shift right and the SRPC will shift left"],
            correctAnswer: 1
          },
          {
            id: "3",
            text: "A sudden increase in input prices will cause which of the following changes on the Phillips Curve?",
            options: ["A rightward shift of the SRPC", "A leftward shift of the LRPC", "A leftward shift of the SRPC", "A downward movement along the SRPC"],
            correctAnswer: 0
          }
        ],
      }, 
      {
        id: "8",
        title: "2.7:It's All Connected: The Business Cycle Graph, The AD-AS Model, and the PPC",
        description: "Learn about the connection between the business cycles graph, the AS-AS graph, the a country's PPC",
        videoSlug: "business-cycle-ad-as-ppc-connections",
        subjects: ["AP Macroeconomics"],
        unit: "2",
        lessonIDS: ["2.7"],
        tags: ["Business Cycles", "AD-AS", "PPC"],
        videoUrl: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/its+all+connected.mp4",
        thumbnail: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/biz+cycles+thumbnail.jpg",
        accessLevel: "free",
        questions: [
          {
            id: "1",
            text: "Which of the following is true when an economy is in the expansion phase of the business cycle?",
            options: ["Unemployment is increasing and output is falling", "The price has has already peaked", "Unemployment is falling and output is increasing", "Both unemployment and output are increasing"],
            correctAnswer: 2
          },
          {
            id: "2",
            text: "The trough on the business cycle corresponds to which of the following on the AD-AS graph?",
            options: ["An inflationary gap", "Long-run equilibrium", "Underutilization", "Recessionary gap"],
            correctAnswer: 3
          },
          {
            id: "3",
            text: "How can a country experiencing a recessionary gap be represented on a production possibilities curve (PPC)?",
  options: [
    "A point on the PPC, indicating full employment of resources",
    "A point outside the PPC, indicating overproduction",
    "A point inside the PPC, indicating underutilization of resources",
    "A shift of the PPC outward, indicating long-run economic growth"
  ],
            correctAnswer: 2
          }
        ],
      }, 
      {
        id: "9",
        title: "1.3: Comparative Advantage: Output Questions",
        description: "Learn how to identify and solve output comparative advantage questions",
        videoSlug: "comparative-advantage-output-questions",
        subjects: ["AP Macroeconomics", "AP Microeconomics"],
        lessonIDS: ["1.3"],
        unit: "1",
        tags: ["Comparative Advantage", "Opportunity Cost"],
        videoUrl: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/comp+adv+output.mp4",
        thumbnail: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/comp+adv+output+thumbnail.jpg",
        accessLevel: "free",
        questions: [
          {
            id: "1",
            text: "What is Liz's opportunity cost of producing one bracelet?",
            image: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/video9Q1.png",
            options: ["1.67 necklaces", "0.60 necklaces", "0.75 bracelets", "1.5 necklaces"],
            correctAnswer: 1
          },
          {
            id: "2",
            text: "Who has the comparative advantage in the production of necklaces?",
            image: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/video9Q1.png",
            options: ["Liz", "Sam", "Neither has a comparative advantage"],
            correctAnswer: 0
          },
          {
            id: "3",
            text: "If Liz and Sam decided to specialize and trade, who should produces each item?",
            options: ["Sam should produce both items", "Liz should produce bracelets and Sam should produce necklaces", "Sam should produce both items", "Liz should produce necklaces and Sam should produce bracelets"],
            correctAnswer: 3
          }
        ],
      }, 
      {
        id: "10",
        title: "1.3: Comparative Advantage: Input Questions",
        description: "Learn how to identify and solve input comparative advantage questions",
        videoSlug: "comparative-advantage-input-questions",
        subjects: ["AP Macroeconomics", "AP Microeconomics"],
        unit: "1",
        lessonIDS: ["1.3"],
        tags: ["Comparative Advantage", "Opportunity Cost"],
        videoUrl: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/comp+adv+inpt.mp4",
        thumbnail: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/comp+adv+input+thumbnail.jpg",
        accessLevel: "free",
        questions: [
          {
            id: "1",
            text: "The table below should the number of labor hours it takes a farmer and a rancher to produce one bushel of wheat or one pound of beef. Who has the comparative advantage in producing beef?",
            image: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/video10Q1.png",
            options: ["The farmer", "The rancher", "Neither, because they have the same opportunity cost", "It is impossible to determine"],
            correctAnswer: 0
          },
          {
            id: "2",
            text: "Two countries, Alpha and Beta, produce cars and computers. The table below shows the number of labor hours required to produce one unit of each good. Which country has a comparative advantage in producing computers?",
            image: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/video10Q2.png",
            options: ["Beta", "Alpha", "Neither, because both are equally efficient", "It is impossible to determine"],
            correctAnswer: 1
          },
          {
            id: "3",
            text: "If Country X has the comparative advantage in producing lumber and Country Y has the comparative advantage in producing steel, then which of the following is true?",
            options: ["Country X must have the absolute advantage in producing lumber", "Country Y must have the absolute advantage in producing steel", "Country X gives up less steel when it produces a unit of lumber", "Country Y can produce more units of steel per hour than units of lumber per hour"],
            correctAnswer: 2
          }
        ],
      }, 
      {
        id: "11",
        title: "2.6: Nominal vs. Real GDP",
        description: "Understand the key difference between nominal and real GDP",
        videoSlug: "nominal-vs-real-gdp",
        subjects: ["AP Macroeconomics"],
        unit: "2",
        lessonIDS: ["2.6"],
        tags: ["GDP", "Inflation"],
        videoUrl: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/ngdp+and+rgdp.mp4",
        thumbnail: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/real+nom+gdp+thumbnail.jpg",
        accessLevel: "free",
        questions: [
          {
            id: "1",
            text: "Which of the following best describes the difference between nominal GDP and real GDP?",
            options: [
              "Nominal GDP is adjusted for inflation, while real GDP is not.",
              "Real GDP is measured using current prices, while nominal GDP is measured using constant prices.",
              "Nominal GDP is measured using current prices, while real GDP is measured using constant prices.",
              "Real GDP will always be less than nominal GDP."
            ],
            correctAnswer: 2
          },
          {
            id: "2",
            text: "If nominal GDP increases but real GDP remains unchanged, what must have happened?",
            options: [
              "Output increased while prices remained constant.",
              "Both output and prices increased.",
              "Output remained constant while prices increased.",
              "There was deflation in the economy."
            ],
            correctAnswer: 2
          },
          {
            id: "3",
            text: "The table below shows the price and quantity of apples and bananas produced in Fruitland over two years. Using Year 1 as the base year, calculate Fruitland`s RGDP in Year 2.",
            image: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/video11Q3.png",
            options: ["$265", "$136.5", "$255", "$177.50"],
            correctAnswer: 3
          }
        ],
      }, 
      {
        id: "12",
        title: "3.2: Marginal Costs and Average Costs",
        description: "Steph Curry helps us understand the relationship between marginal costs and average costs",
        videoSlug: "marginal-costs-average-costs",
        subjects: ["AP Microeconomics"],
        unit: "3",
        lessonIDS: ["3.2"],
        tags: ["Marginal Costs", "Short-Run Production"],
        videoUrl: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/marginal+and+average.mp4",
        thumbnail: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/TN_marginal_average_costs.jpg",
        accessLevel: "free",
        questions: [
          {
            id: "1",
            text: "When a firm produces 10 units of output, its marginal cost is $45 and its average total cost is $49. Which of the following is true?",
            options: [
              "If the firm reduces output to 9 units, ATC will increase",
              "If the firm reduces output to 9 units, AFC will increase.",
              "If the firm increases output to 11 units, MC will remain constant.",
              "If the firm increases output to 11 units, marginal revenue will increase."
            ],
            correctAnswer: 0
          },
          {
            id: "2",
            text: "Why does marginal cost (MC) intersect average total cost (ATC) at its lowest point?",
            options: [
              "Because MC increases as output increases.",
              "Because ATC is always greater than MC.",
              "Because when MC is below ATC, it pulls the average down, and when it`s above, it pulls the average up.",
              "Because when MC is below ATC, it pulls the average up, and when it`s above, it pulls the average down."
            ],
            correctAnswer: 2
          },
          {
            id: "3",
            text: "A firm's average total cost (ATC) at 20 units is $12. If the marginal cost (MC) of the 21st unit is less than $12, what will happen to ATC?",
            options: ["It will increase", "It will decrease", "It will remain constant", "It depends on the fixed costs"],
            correctAnswer: 3
          }
        ],
      }, 
      {
        id: "13",
        title: "3.1: Marginal Product and Marginal Costs",
        description: "Understand the relationship between the MP curve and the MC curve",
        videoSlug: "marginal-product-marginal-costs",
        subjects: ["AP Microeconomics"],
        unit: "3",
        lessonIDS: ["3.1"],
        tags: ["Specialization", "Diminishing Returns"],
        videoUrl: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/marginalproductmarginalcost.mp4",
        thumbnail: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/TN_marginal_product_marginal_costs.jpg",
        accessLevel: "free",
        questions: [
          {
            id: "1",
            text: "Which of the following best explains the relationship between Marginal Product (MP) and Marginal Cost (MC)?",
            options: [
              "When MP increases, MC increases",
              "When MP decreases, MC stays constant",
              "When MP increases, MC decreases",
              "There is no relationship between MP and MC"
            ],
            correctAnswer: 2
          },
          {
            id: "2",
            text: "Suppose a worker adds 4 units of output to total product. The wage paid to the worker is $40. Is labor is the only variable cost, what is the marginal cost (MC) of each unit produced by this worker?",
            options: [
              "$10",
              "$4",
              "$16",
              "$40"
            ],
            correctAnswer: 0
          },
          {
            id: "3",
            text: "Assuming labor is the only variable cost, at what point do marginal costs begin to increase?  ",
            image: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/video13Q3.png",
            options: ["At the 2nd worker", "At the 3rd worker", "At the 5th worker", "At the 6th worker"],
            correctAnswer: 1
          }
        ],
      }, 
      {
        id: "14",
        title: "1.1: Scarcity",
        description: "Understand the fundamental problem of economics.",
        videoSlug: "scarcity-fundamental-problem",
        subjects: ["AP Microeconomics", "AP Macroeconomics"],
        unit: "1",
        lessonIDS: ["1.1"],
        tags: ["Scarcity"],
        videoUrl: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/1.1+-+Scarcity.mp4",
        thumbnail: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/1.1+-+Scarcity+-+TN",
        accessLevel: "free",
        questions: [
          {  
            id: "1",
            text: "The fundamental problem of economics is that:",
            options: [
              "Governments do not collect enough in taxes to cover spending.",
              "Resources are limited, but human wants and needs are unlimited.",
              "Companies must specialize in producing specific goods rather than diversifying.",
              "An individual's income is insufficient to purchase everything they desire."
            ],
            correctAnswer: 1
          },
          {
            id: "2",
            text: "Which of the following topics is most likely to be studied in macroeconomics?",
            options: [
              "The production decisions of a single technology company.",
              "How an individual student allocates their time between various activities.",
              "The effect of a government borrowing to cover a budget deficit on the national economy.",
              "The market forces determining the price of cellular phones."
            ],
            correctAnswer: 2
          },
          {
            id: "2",
            text: "Which of the following is the best example of an economy facing the problem of scarcity?",
            options: [
              "A company decides to produce laptops instead of phones.",
              "A student chooses to study for an exam instead of going out with friends.",
              "A government must decide between funding new roads or increasing military spending due to a limited budget.",
              "A consumer chooses a less expensive brand of phone to save money."
            ],
            correctAnswer: 2
          },
        ],
      }, 
      {
        id: "15",
        title: "1.4: Demand",
        description: "Learn about the law of demand, demand curves, and demand schedules.",
        videoSlug: "demand-law-curves-schedules",
        subjects: ["AP Macroeconomics"],
        unit: "1",
        lessonIDS: ["1.4"],
        tags: ["Demand", "Law of Demand"],
        videoUrl: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/1.4+-+Demand.mp4",
        thumbnail: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/1.4+-+Demand+-+TN.png",
        accessLevel: "free",
        questions: [
          {
            id: "1",
            text: "The law of demand establishes which of the following relationships?",
            options: [
              "A direct relationship between price and quantity demanded.",
              "An inverse relationship between income and quantity demanded.",
              "An inverse relationship between price and quantity demanded.",
              "A direct relationship between price and demand."
            ],
            correctAnswer: 2
          },
          {
            id: "2",
            text: "A decrease in the price of a popular video game will most likely lead to which of the following?",
            options: [
              "A rightward shift of the demand curve for the video game.",
              "A leftward shift of the demand curve for the video game.",
              "An increase in the quantity demanded for the video game.",
              "A decrease in the quantity demanded for the video game."
            ],
            correctAnswer: 2
          },
          {
            id: "3",
            text: "If a country's population increases significantly, how would this affect the market demand curve for a normal good like housing?",
            options: [
              "The demand curve will shift to the left.",
              "There will be a movement down along the demand curve.",
              "There will be a movement up along the demand curve.",
              "The demand curve will shift to the right."
            ],
            correctAnswer: 3
          },
          {
            id: "4",
            text: "If consumers widely expect the price of new cars to decrease significantly in the next six months, which of the following will most likely happen to the demand for cars today?",
            options: [
              "The demand curve for cars will shift to the left.",
              "The demand curve for cars will shift to the right.",
              "The quantity demanded for cars will increase.",
              "Demand will not change, but quantity supplied will decrease."
            ],
            correctAnswer: 0
          },
        ],
      }, 
      {
        id: "16",
        title: "2.1: The Circular Flow Model",
        description: "Learn about the circular flow model, the product and factor markets, and various leakages and injections.",
        videoSlug: "circular-flow-model-markets",
        subjects: ["AP Macroeconomics"],
        unit: "2",
        lessonIDS: ["2.1"],
        tags: ["Circular Flow Model", "Injections", "Leakages"],
        videoUrl: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/2.1+-+Circular+Flow+Model.mp4",
        thumbnail: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/2.1+-+Circular+Flow+Model+-+TN.png",
        accessLevel: "free",
        questions: [
          {
            id: "1",
            text: "In the factor market, which of the following is true?",
            options: [
              "Households purchase goods and services from firms.",
              "Firms provide goods and services to households.",
              "Households supply labor and other resources to firms.",
              "Firms pay taxes to the government."
            ],
            correctAnswer: 2
          },
          {
            id: "2",
            text: "In the circular flow model, which of the following is considered an 'injection'?",
            options: [
              "Household savings.",
              "Taxes paid to the government.",
              "Spending on imported goods.",
              "Government spending."
            ],
            correctAnswer: 3
          },
          {
            id: "3",
            text: "In the circular flow model, which sector is primarily responsible for channeling household savings back into the flow as business investment?",
            options: [
              "The government",
              "The product market",
              "The factor market",
              "The financial sector"
            ],
            correctAnswer: 3
          }
        ],
      }, 
      {
        id: "17",
        title: "1.5: Supply",
        description: "Learn about the law of supply, supply curves, and supply schedules.",
        videoSlug: "supply-law-curves-schedules",
        subjects: ["AP Macroeconomics"],
        unit: "1",
        lessonIDS: ["1.5"],
        tags: ["Supply", "Law of Supply"],
        videoUrl: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/1.5+-+Supply.mp4",
        thumbnail: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/1.5+-+Supply+-+TN.png",
        accessLevel: "free",
        questions: [
          {
            id: "1",
            text: "The law of supply indicates that, all other things being equal:",
            options: [
              "An increase in the price of a good will decrease the quantity supplied.",
              "An increase in the price of a good will increase the quantity supplied.",
              "An increase in the cost of an input will increase the supply of the good.",
              "A decrease in the price of a good will cause the supply curve to shift to the left."
            ],
            correctAnswer: 1
          },
          {
            id: "2",
            text: "An increase in the market price of automobiles will cause which of the following to occur in the short run?",
            options: [
              "A rightward shift of the supply curve for automobiles.",
              "A leftward shift of the supply curve for automobiles.",
              "A movement up along the supply curve for automobiles.",
              "A movement down along the supply curve for automobiles."
            ],
            correctAnswer: 2
          },
          {
            id: "3",
            text: "A technological innovation that lowers the cost of producing computer chips will have what effect on the market for computers?",
            options: [
              "It will cause the supply curve for computers to shift to the right.",
              "It will cause the supply curve for computers to shift to the left.",
              "It will cause the demand curve for computers to shift to the right.",
              "It will cause a decrease in the quantity supplied of computers."
            ],
            correctAnswer: 0
          },
          {
            id: "4",
            text: "If the cost of steel, a key input in car manufacturing, increases significantly, what will be the likely effect on the supply of cars?",
            options: [
              "The quantity of cars supplied will increase.",
              "The supply curve for cars will shift to the right.",
              "The supply curve for cars will shift to the left.",
              "The demand curve for cars will shift to the left."
            ],
            correctAnswer: 2
          },
        ],
      }, 
      {
        id: "18",
        title: "2.3: Unemployment",
        description: "Learn the three main types of unemployment, how to calculate a country's unemployment rate and labor force participation rate, and learn about the problem of discouraged workers.",
        videoSlug: "unemployment-rate-labor-force-participation-rate",
        subjects: ["AP Macroeconomics"],
        unit: "2",
        lessonIDS: ["2.3"],
        tags: ["Unemployment", "Natural Rate of Unemployment", "Labor Force Participation Rate", "Discouraged Workers"],
        videoUrl: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/2.3+-+Unemployment.mp4",
        thumbnail: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/2.3+-+Unemployment+-+TN.png",
        accessLevel: "free",
        questions: [
          
  {
    id: "1",
    text: "A recent college graduate who is actively searching for their first job is experiencing which type of unemployment?",
    options: [
      "Structural unemployment",
      "Cyclical unemployment",
      "Seasonal unemployment",
      "Frictional unemployment"
    ],
    correctAnswer: 3
  },
  {
    id: "2",
    text: "Which type of unemployment is caused by a downturn in the business cycle, such as a recession?",
    options: [
      "Frictional unemployment",
      "Structural unemployment",
      "Cyclical unemployment",
      "Natural unemployment"
    ],
    correctAnswer: 2
  },
  {
    id: "3",
    text: "A country has a total working-age population of 200 million. The labor force is 150 million, and 7.5 million people are unemployed. What is the unemployment rate?",
    options: [
      "3.75%",
      "5%",
      "7.5%",
      "10%"
    ],
    correctAnswer: 1
  },
  {
      id: "4",
    text: "In an economy with an adult population of 200 million, 120 million people are employed and 10 million are unemployed. What is the labor force participation rate?",
    options: [
      "55%",
      "60%",
      "65%",
      "70%"
    ],
    correctAnswer: 2
  }
        ],
      },
      {
        id: "19",
        title: "1.6: Market Equilibrium, Disequilibrium, and Changes in Equilibrium",
        description: "Learn about market equilibrium, shortages and surpluses, and how shifts in supply and demand lead to changes in equilibrium.",
        videoSlug: "market-equilibrium-disequilibrium-changes-in-equilibrium",
        subjects: ["AP Macroeconomics"],
        unit: "1",
        lessonIDS: ["1.6"],
        tags: ["Market Equilibrium", "Disequilibrium", "Changes in Equilibrium", "Surplus", "Shortage"],
        videoUrl: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/1.6+-+Equilibrium.mp4",
        thumbnail: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/1.6+-+TN.png",
        accessLevel: "free",
        questions:      [
          {
            id: "1",
            text: "If the current market price for a good is set above the equilibrium price, which of the following will occur?",
            options: [
              "A shortage, because quantity demanded exceeds quantity supplied.",
              "A surplus, because quantity supplied exceeds quantity demanded.",
              "An increase in demand to meet the higher price.",
              "A decrease in supply to restore equilibrium."
            ],
            correctAnswer: 1
          },
          {
            id: "2",
            text: "A new technology lowers the cost of producing solar panels. What is the expected impact on the equilibrium price and quantity in the market for solar panels?",
            options: [
              "Price will increase, Quantity will increase.",
              "Price will decrease, Quantity will decrease.",
              "Price will increase, Quantity will decrease.",
              "Price will decrease, Quantity will increase."
            ],
            correctAnswer: 3
          },
          {
            id: "3",
            text: "Suppose consumers' incomes increase, leading to a higher demand for new cars. At the same time, the cost of steel for manufacturing cars rises, decreasing supply. What is the effect on the equilibrium price and quantity of new cars?",
            options: [
              "Price will increase, and the change in quantity is indeterminate.",
              "Price will decrease, and the change in quantity is indeterminate.",
              "Quantity will increase, and the change in price is indeterminate.",
              "Quantity will decrease, and the change in price is indeterminate."
            ],
            correctAnswer: 0
          }
        ]
      },
      {
        id: "20",
        title: "1.2: Opportunity Cost and the Production Possibilities Curve",
        description: "Learn about opportunity cost, the production possibilities curve, and the concept of trade-offs.",
        videoSlug: "opportunity-cost-production-possibilities-curve",
        subjects: ["AP Macroeconomics"],
        unit: "1",
        lessonIDS: ["1.2"],
        tags: ["Opportunity Cost", "Production Possibilities Curve", "Trade-offs"],
        videoUrl: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/1.2+-+Opportunity+Cost+and+the+PPC.mp4",
        thumbnail: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/1.2+-+TN.png",
        accessLevel: "free",
        questions:      [
          {
            id: "1",
            text: "According to the Production Possibilities Curve (PPC) model, a point located inside the curve represents:",
            options: [
              "An unattainable level of production.",
              "An efficient use of all available resources.",
              "An inefficient use of resources or underutilization.",
              "Economic growth from new technology."
            ],
            correctAnswer: 2
          },
          {
            id: "2",
            text: "A production possibilities curve that is 'bowed-out' from the origin signifies which of the following concepts?",
            options: [
              "Constant opportunity cost",
              "Increasing opportunity cost",
              "Economic recession",
              "Allocative efficiency"
            ],
            correctAnswer: 1
          },
          {
            id: "3",
            text: "A company can produce either 40 phones and 30 burgers (Point A) or 30 phones and 60 burgers (Point B). What is the opportunity cost of increasing burger production from 30 to 60?",
            options: [
              "30 burgers",
              "60 burgers",
              "10 phones",
              "30 phones"
            ],
            correctAnswer: 2
          }
        ]
      },
      {
        id: "21",
        title: "2.1: The Circular Flow Model and GDP (Part 2)",
        description: "Learn about GDP, the expenditure approach to calculating GDP, and the income approach to calculating GDP.",
        videoSlug: "circular-flow-model-and-gdp-part-2",
        subjects: ["AP Macroeconomics"],
        unit: "2",
        lessonIDS: ["2.1"],
        tags: ["GDP", "Expenditure Approach", "Income Approach"],
        videoUrl: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/2.1+-+GDP.mp4",
        thumbnail: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/2.1+-+(GDP)+-+TN.png",
        accessLevel: "free",
        questions:      [
          {
            id: "1",
            text: "Which of the following would be counted as part of the current year's Gross Domestic Product (GDP) for the United States?",
            options: [
              "The sale of a used college textbook from one student to another.",
              "A Social Security payment received by a retired individual.",
              "The purchase of domestically produced steel by a bicycle manufacturer.",
              "A haircut service provided by a stylist in New York City."
            ],
            correctAnswer: 3
          },
          {
            id: "2",
            text: "Within the expenditure approach to GDP, which of the following transactions is classified under Investment (I)?",
            options: [
              "The U.S. government purchasing a new fleet of naval ships.",
              "A construction company buying a new crane.",
              "A family buying a new refrigerator for their home.",
              "An individual purchasing 100 shares of a tech company's stock."
            ],
            correctAnswer: 1
          },
          {
            id: "3",
            text: "When calculating GDP using the expenditure approach, what is the primary reason for subtracting the value of imports?",
            options: [
              "To ensure that spending on foreign-produced goods is not counted as domestic production.",
              "Because imports are generally considered economically harmful to domestic industries.",
              "To account for the tariff revenue the government earns from foreign goods.",
              "Because the value of imports is already included in the income approach."
            ],
            correctAnswer: 0
          },
          {
            id: "4",
            text: "An economy produces the following in a year: Consumption: $500B; Investment: $150B; Value of Stocks Traded: $80B; Government Spending: $200B; Exports: $50B; Imports: $70B. What is its Gross Domestic Product (GDP)?",
            options: [
              "$880B",
              "$910B",
              "$830B",
              "$970B"
            ],
            correctAnswer: 2
          }
        ]
      },

      
  ];
  
const macroUnitVideos = videos
  .filter(v => v.unit === '1' && v.subjects.includes('AP Macroeconomics'))
  .sort((a, b) => {
    // Extract the first lessonID and compare as floats
    const aLesson = a.lessonIDS[0] ? parseFloat(a.lessonIDS[0]) : 0;
    const bLesson = b.lessonIDS[0] ? parseFloat(b.lessonIDS[0]) : 0;
    return aLesson - bLesson;
  });
  