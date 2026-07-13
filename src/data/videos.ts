export type Question = {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
  image?: string;
  explanation?: string;
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
      id: "mcq-explanations",
      title: "Unit 1 MCQ Explanations",
      description: "Comprehensive explanations for all Unit 1 MCQ questions with detailed breakdowns of key concepts.",
      videoSlug: "mcq-explanations",
      subjects: ["AP Macroeconomics"],
      unit: "1",
      lessonIDS: ["1.0"],
      tags: ["MCQ Explanations", "Unit 1", "Practice Questions"],
      videoUrl: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/Unit_MCQ_Explanations/Unit_MCQ_Explanations_U1",
      thumbnail: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/UnitMCQIcon.jpg",
      accessLevel: "free",
      questions: []
    },
    {
      id: "1",
      title: "Fiscal Policy & Long-Run Self-Adjustment",
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
      title: "Open Market Operations",
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
        title: "Shifters in the Foreign Exchange Market",
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
        title: "The Crowding Out Effect",
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
        title: "Policy Action and Currency Value",
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
        title: "Phillips Curve and AD-AS Graph (AD Shifts)",
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
        title: "Phillips Curve and AD-AS Graph (SRAS Shifts)",
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
        title: "It's All Connected: The Business Cycle Graph, The AD-AS Model, and the PPC",
        description: "Learn about the connection between the business cycles graph, the AS-AS graph, the a country's PPC",
        videoSlug: "business-cycle-ad-as-ppc-connections",
        subjects: ["AP Macroeconomics"],
        unit: "0",
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
        title: "Comparative Advantage Practice: Output Questions",
        description: "Learn how to identify and solve output comparative advantage questions",
        videoSlug: "comparative-advantage-output-questions",
        subjects: ["AP Macroeconomics", "AP Microeconomics"],
        lessonIDS: ["1.3", "1.4"], // 1.3 for macro, 1.4 for micro (since micro's 1.3 is PPC, not Comparative Advantage)
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
            correctAnswer: 1, 
            explanation: "Liz's opportunity cost of producing one bracelet is 0.60 necklaces. This is calculated by dividing the number of necklaces she could have produced (120) by the number of bracelets she could have produced (200) in the same amount of time."
          },
          {
            id: "2",
            text: "Who has the comparative advantage in the production of necklaces?",
            image: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/video9Q1.png",
            options: ["Liz", "Sam", "Neither has a comparative advantage"],
            correctAnswer: 0, 
            explanation: "Liz has the comparative advantage in the production of necklaces because she has the lower opportunity cost (1.67) compared to Sam's opportunity cost (2)."
          },
          {
            id: "3",
            text: "If Liz and Sam decided to specialize and trade, who should produces each item?",
            options: ["Sam should produce both items", "Liz should produce bracelets and Sam should produce necklaces", "Sam should produce both items", "Liz should produce necklaces and Sam should produce bracelets"],
            correctAnswer: 3, 
            explanation: "Liz should produce necklaces and Sam should produce bracelets. This is because Liz has the comparative advantage in the production of necklaces, and Sam has the comparative advantage in the production of bracelets. If both specialize and trade, they will both benefit from the trade."
          }
        ],
      }, 
      {
        id: "10",
        title: "Comparative Advantage Practice: Input Questions",
        description: "Learn how to identify and solve input comparative advantage questions",
        videoSlug: "comparative-advantage-input-questions",
        subjects: ["AP Macroeconomics", "AP Microeconomics"],
        unit: "1",
        lessonIDS: ["1.3", "1.4"], // 1.3 for macro, 1.4 for micro (since micro's 1.3 is PPC, not Comparative Advantage)
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
            correctAnswer: 0, 
            explanation: "The farmer has the comparative advantage in producing beef because his opportunity cost is lower than the rancher's. To produce 1 pound of beef, the farmer gvies up 2 bushels of wheat, while the rancher gives up 3 bushels of wheat."
          },
          {
            id: "2",
            text: "Two countries, Alpha and Beta, produce cars and computers. The table below shows the number of labor hours required to produce one unit of each good. Which country has a comparative advantage in producing computers?",
            image: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/video10Q2.png",
            options: ["Beta", "Alpha", "Neither, because both are equally efficient", "It is impossible to determine"],
            correctAnswer: 0, 
            explanation: "Beta has the comparative advantage in producing computers because for every 1 computer Beta produces, it gvies up the opportunity to produce 0.5 of a car, whereas Alpha gives up 2 cars for every 1 computer they produce."
          },
          {
            id: "3",
            text: "If Country X has the comparative advantage in producing lumber and Country Y has the comparative advantage in producing steel, then which of the following is true?",
            options: ["Country X must have the absolute advantage in producing lumber", "Country Y must have the absolute advantage in producing steel", "Country X gives up less steel when it produces a unit of lumber, compared to Country Y", "Country Y can produce more units of steel per hour than units of lumber per hour"],
            correctAnswer: 2,
            explanation: "To have a comparative advantage in a good, a country must have the lowest opportunity cost in producing that good. In this case, if Country X has the comparative advantage in producing lumber, it must give up less steel when it produces a unit of lumber than Country Y does when it produces a unit of steel."
          }
        ],
      }, 
      {
        id: "11",
        title: "Real v Nominal GDP - Example Problem",
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
        title: "Marginal Costs and Average Costs",
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
        title: "Marginal Product and Marginal Costs",
        description: "Understand the relationship between the MP curve and the MC curve",
        videoSlug: "marginal-product-marginal-costs",
        subjects: ["AP Microeconomics"],
        unit: "3",
        lessonIDS: [],
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
        title: "Scarcity",
        description: "Understand the fundamental problem of economics.",
        videoSlug: "scarcity-fundamental-problem",
        subjects: ["AP Microeconomics", "AP Macroeconomics"],
        unit: "1",
        lessonIDS: ["1.1"],
        tags: ["Scarcity"],
        videoUrl: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/1.1+-+Scarcity+(v2).mp4",
        thumbnail: "https://thumbnailslarge.s3.ap-southeast-2.amazonaws.com/1.1_TN.jpg",
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
            correctAnswer: 1, 
            explanation: "Economics is the study of how individiuals and groups deal with scarcity—the basic condition where unlimited human wants for goods and services exceed the limited resources available. This forces everyone to make choices about resource allocation."
          },
          {
            "id": "2",
            "text": "Which of the following would NOT be considered a 'factor of production' in economics?",
            "options": [
              "A forest used for lumber.",
              "The effort of a factory worker.",
              "A company's delivery truck.",
              "The money used to hire an employee."
            ],
            "correctAnswer": 3,
            "explanation": "In economics, money itself isn't considered a resource or a factor of production. Instead, it is used to acquire the factors of production, such as labor (the employee), land (the forest), or capital (the truck)."
          },
          {
            "id": "3",
            "text": "A factory building is an example of which factor of production?",
            "options": [
              "Land",
              "Labor",
              "Capital",
              "Entrepreneurship"
            ],
            "correctAnswer": 2,
            "explanation": "Capital refers to all human-made resources used to produce other goods and services. Factories and machines are examples of physical capital."
          }
        ],
      }, 
      {
        id: "15",
        title: "Demand",
        description: "Learn about the law of demand, demand curves, and demand schedules.",
        videoSlug: "demand-law-curves-schedules",
        subjects: ["AP Macroeconomics"],
        unit: "1",
        lessonIDS: ["1.4"],
        tags: ["Demand", "Law of Demand"],
        videoUrl: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/1.4+-+Demand+(v2).mp4",
        thumbnail: "https://thumbnailslarge.s3.ap-southeast-2.amazonaws.com/1.4_TN.jpg",
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
            correctAnswer: 2, 
            explanation: "The Law of Demand states that there is an inverse, or opposite, relationship between the price of a good and the quantity demanded. This means that as price falls, quantity demanded rises, and as price rises, quantity demanded falls."
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
            correctAnswer: 2, 
            explanation: "A change in the good's own price causes a change in the quantity demanded, which is a movement along the demand curve. It does not shift the curve. A decrease in price leads to an increase in the quantity demanded."
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
            correctAnswer: 3, 
            explanation: "An increase in the population leads to an increase in the number of potential buyers. The number of buyers is a non-price factor that shifts the demand curve. More buyers will increase demand at every price level, causing a rightward shift of the curve."
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
            correctAnswer: 0, 
            explanation: "Consumer expectations about future prices are a shifter of demand. If people expect a good to be cheaper in the future, they will reduce their demand for it today and wait to buy it later. A decrease in current demand is shown as a leftward shift of the demand curve."
          },
        ],
      }, 
      {
        id: "16",
        title: "The Circular Flow Model",
        description: "Learn about the circular flow model, the product and factor markets, and various leakages and injections.",
        videoSlug: "circular-flow-model-markets",
        subjects: ["AP Macroeconomics"],
        unit: "2",
        lessonIDS: ["2.1"],
        tags: ["Circular Flow Model", "Injections", "Leakages"],
        videoUrl: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/2.1+-+Circular+Flow+Model.mp4",
        thumbnail: "https://thumbnailslarge.s3.ap-southeast-2.amazonaws.com/2.1_TN_Circular_Flow.jpg",
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
        title: "Supply",
        description: "Learn about the law of supply, supply curves, and supply schedules.",
        videoSlug: "supply-law-curves-schedules",
        subjects: ["AP Macroeconomics"],
        unit: "1",
        lessonIDS: ["1.5"],
        tags: ["Supply", "Law of Supply"],
        videoUrl: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/1.5+-+Supply+(v2).mp4",
        thumbnail: "https://thumbnailslarge.s3.ap-southeast-2.amazonaws.com/1.5_TN.jpg",
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
            correctAnswer: 1, 
            explanation: "The Law of Supply states that there is a direct relationship between the price of a good and the quantity producers are willing to sell. As the price increases, producing the good becomes more profitable, creating an incentive for firms to increase their quantity supplied."
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
            correctAnswer: 2, 
            explanation: "A change in the good's own price causes a change in the quantity supplied, which is shown as a movement along the supply curve. An increase in price incentivizes producers to supply more, resulting in a movement up and to the right along the curve."
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
            correctAnswer: 0, 
            explanation: "Technology is a shifter of supply. Since computer chips are an input for computers, a technological innovation that lowers chip costs also lowers the production cost of computers. This makes producing computers more profitable at all price levels, causing an increase in supply, which is shown as a rightward shift of the supply curve."
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
            correctAnswer: 2, 
            explanation: "The price of inputs is a key shifter of supply. An increase in the cost of steel raises the overall cost of producing a car, making it less profitable at any given selling price. This will cause manufacturers to reduce their supply, which is shown as a leftward shift of the supply curve."
          },
        ],
      }, 
      {
        id: "18",
        title: "Unemployment",
        description: "Learn the three main types of unemployment, how to calculate a country's unemployment rate and labor force participation rate, and learn about the problem of discouraged workers.",
        videoSlug: "unemployment-rate-labor-force-participation-rate",
        subjects: ["AP Macroeconomics"],
        unit: "2",
        lessonIDS: ["2.3"],
        tags: ["Unemployment", "Natural Rate of Unemployment", "Labor Force Participation Rate", "Discouraged Workers"],
        videoUrl: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/2.3+-+Unemployment.mp4",
        thumbnail: "https://thumbnailslarge.s3.ap-southeast-2.amazonaws.com/2.3_TN.jpg",
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
        title: "Market Equilibrium, Disequilibrium, and Changes in Equilibrium",
        description: "Learn about market equilibrium, shortages and surpluses, and how shifts in supply and demand lead to changes in equilibrium.",
        videoSlug: "market-equilibrium-disequilibrium-changes-in-equilibrium",
        subjects: ["AP Macroeconomics"],
        unit: "1",
        lessonIDS: ["1.6"],
        tags: ["Market Equilibrium", "Disequilibrium", "Changes in Equilibrium", "Surplus", "Shortage"],
        videoUrl: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/1.6+-+Equilibrium.mp4",
        thumbnail: "https://thumbnailslarge.s3.ap-southeast-2.amazonaws.com/1.6_TN.jpg",
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
            correctAnswer: 1, 
            explanation: "When the price is above equilibrium, producers are willing to supply more of the good than consumers are willing to buy. This situation, where quantity supplied is greater than quantity demanded, is called a surplus."
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
            correctAnswer: 3, 
            explanation: "A new technology that lowers production costs will increase supply, shifting the supply curve to the right. When the supply curve shifts right, the new equilibrium point occurs at a lower price and a higher quantity."
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
            correctAnswer: 0, 
            explanation: "This is a double shift scenario. The increase in demand pushes the price up and quantity up. The decrease in supply pushes the price up and quantity down. Since both shifts cause the price to rise, the price will definitely increase. However, the effect on quantity is opposing, making the final change in quantity indeterminate."
          }
        ]
      },
      {
        id: "20",
        title: "Opportunity Cost and the Production Possibilities Curve",
        description: "Learn about opportunity cost, the production possibilities curve, and the concept of trade-offs.",
        videoSlug: "opportunity-cost-production-possibilities-curve",
        subjects: ["AP Macroeconomics"],
        unit: "1",
        lessonIDS: ["1.2"],
        tags: ["Opportunity Cost", "Production Possibilities Curve", "Trade-offs"],
        videoUrl: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/1.2+-+Opportunity+Cost+and+the+PPC.mp4",
        thumbnail: "https://thumbnailslarge.s3.ap-southeast-2.amazonaws.com/1.2_TN.jpg",
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
            correctAnswer: 2,
            explanation: "The line of the PPC represents the maximum possible efficient production. Any point inside the curve indicates that the economy is producing less than its potential, meaning some resources are unemployed or used inefficiently."
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
            correctAnswer: 1,
            explanation: "A bowed-out shape shows that resources are not perfectly adaptable between the production of the two goods. As you produce more of one good, you must give up increasingly larger amounts of the other, resulting in an increasing opportunity cost."
          },
          {
            id: "3",
            text: "A company can produce either 40 TVs and 30 sandwiches (Point A) or 30 TVs and 60 sandwiches (Point B). What is the opportunity cost of increasing sandwich production from 30 to 60?",
            options: [
              "30 sandwiches",
              "60 sandwiches",
              "10 TVs",
              "30 TVs"
            ],
            correctAnswer: 2,
            explanation: "Opportunity cost is what is given up to get something else. To increase sandwich production from 30 to 60, the company's TV production had to fall from 40 to 30. Therefore, the opportunity cost of those extra sandwiches is the 10 TVs that were given up."
          }
        ]
      },
      {
        id: "21",
        title: "The Circular Flow Model and GDP (Part 2)",
        description: "Learn about GDP, the expenditure approach to calculating GDP, and the income approach to calculating GDP.",
        videoSlug: "circular-flow-model-and-gdp-part-2",
        subjects: ["AP Macroeconomics"],
        unit: "2",
        lessonIDS: ["2.1"],
        tags: ["GDP", "Expenditure Approach", "Income Approach"],
        videoUrl: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/2.1+-+GDP.mp4",
        thumbnail: "https://thumbnailslarge.s3.ap-southeast-2.amazonaws.com/2.1_TN.jpg",
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
      {
        id: "22",
        title: "Price Indices and Inflation",
        description: "Learn about price inflation, deflation, disinflation, and price indices like the Consumer Price Index (CPI).",
        videoSlug: "price-indices-inflation-consumer-price-index",
        subjects: ["AP Macroeconomics"],
        unit: "2",
        lessonIDS: ["2.4"],
        tags: ["Price Indices", "Inflation", "Deflation", "Disinflation", "Consumer Price Index (CPI)"],
        videoUrl: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/2.4+-+Price+Indices+and+Inflation.mp4",
        thumbnail: "https://thumbnailslarge.s3.ap-southeast-2.amazonaws.com/2.4_TN.jpg",
        accessLevel: "free",
        questions:      [
          {
            id: "1",
            text: "Suppose the inflation rate in a country was 7% in 2023, 4% in 2024, and 2% in 2025. Which economic term best describes this trend?",
            options: [
              "Deflation",
              "Stagflation",
              "Hyperinflation",
              "Disinflation"
            ],
            correctAnswer: 3
          },
          {
            id: "2",
            text: "If the cost of a fixed market basket of goods was $400 in the base year and the cost of the same basket is $460 in the current year, what is the Consumer Price Index (CPI) for the current year?",
            options: [
              "87",
              "115",
              "15",
              "146"
            ],
            correctAnswer: 1
          },
          {
            id: "3",
            text: "Given that the Consumer Price Index (CPI) was 180 in Year 1 and 189 in Year 2, what was the inflation rate between the two years?",
            options: [
              "9%",
              "4.7%",
              "5%",
              "1.05%"
            ],
            correctAnswer: 2
          },
          {
            id: "4",
            text: "When the price of beef rises, consumers often buy more chicken as an alternative. Why does this behavior pose a challenge to the accuracy of the Consumer Price Index (CPI)?",
            options: [
              "The CPI does not account for changes in product quality, which is known as quality bias.",
              "The CPI's use of a fixed market basket does not account for consumer substitution, potentially overstating the cost of living.",
              "The CPI only tracks the prices of goods, not services like food preparation.",
              "The CPI does not include food and energy prices, which are too volatile."
            ],
            correctAnswer: 1
          },
          {
            id: "5",
            text: "A new laptop model is released that costs 10% more than the previous year's model, but it also includes a significantly faster processor and double the memory. This situation highlights which potential bias in the CPI?",
            options: [
              "Substitution bias",
              "Income bias",
              "Quality bias",
              "New product bias"
            ],
            correctAnswer: 2
          }
        ]
      },
      {
        id: "23",
        title: "Business Cycles",
        description: "Learn about the four phases of the business cycle, the concept of a natural rate of unemployment, and the relationship between RGDP and unemployment.",
        videoSlug: "business-cycles",
        subjects: ["AP Macroeconomics"],
        unit: "2",
        lessonIDS: ["2.7"],
        tags: ["Business Cycles", "Natural Rate of Unemployment", "Real GDP", "Unemployment"],
        videoUrl: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/2.7+-+Business+Cycles.mp4",
        thumbnail: "https://thumbnailslarge.s3.ap-southeast-2.amazonaws.com/2.7_TN.jpg",
        accessLevel: "free",
        questions:     [
          {
            id: "1",
            text: "An economy is experiencing a period where real GDP is consistently falling and the unemployment rate is rising. Which phase of the business cycle is this economy in?",
            options: [
              "Peak",
              "Expansion",
              "Trough",
              "Recession"
            ],
            correctAnswer: 3
          },
          {
            id: "2",
            text: "On the business cycle graph, the potential output line represents the level of real GDP that corresponds to:",
            options: [
              "zero unemployment.",
              "the peak of an expansion.",
              "the natural rate of unemployment.",
              "a period of rapid inflation."
            ],
            correctAnswer: 2
          },
          {
            id: "3",
            text: "If an economy's actual rate of unemployment is higher than its natural rate of unemployment, which of the following must be true?",
            options: [
              "The economy is experiencing an inflationary gap.",
              "The economy is operating at its potential output.",
              "The economy is experiencing a recessionary gap.",
              "The economy is at the peak of its business cycle."
            ],
            correctAnswer: 2
          },
          {
            id: "4",
            text: "A sudden surge in consumer confidence leads to a massive increase in spending, pushing the unemployment rate below its natural rate and causing prices to rise. This situation describes:",
            options: [
              "a recessionary gap.",
              "a trough.",
              "an inflationary gap.",
              "a period of stagflation."
            ],
            correctAnswer: 2
          },
          {
            id: "5",
            text: "The point on the business cycle model where an expansion ends and a contraction begins is known as the:",
            options: [
              "Trough",
              "Peak",
              "Recessionary Gap",
              "Inflationary Gap"
            ],
            correctAnswer: 1
          }
        ]
      },
      {
        id: "24",
        title: "Real v Nominal GDP",
        description: "Learn about the difference between real and nominal GDP, and how to use the GDP deflator to calculate real GDP.",
        videoSlug: "real-v-nominal-gdp",
        subjects: ["AP Macroeconomics"],
        unit: "2",
        lessonIDS: ["2.6"],
        tags: ["Real GDP", "Nominal GDP", "GDP Deflator"],
        videoUrl: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/2.6+-+Real+v+Nominal+GDP.mp4",
        thumbnail: "https://thumbnailslarge.s3.ap-southeast-2.amazonaws.com/2.6_TN.jpg",
        accessLevel: "free",
        questions:     [
          {
            id: "1",
            text: "If a country's nominal GDP increased by 7% in a year, while its real GDP only increased by 3%, what can be concluded?",
            options: [
              "The country's production of goods and services decreased.",
              "The country experienced an inflation rate of approximately 4%.",
              "The country's unemployment rate must have increased.",
              "The country experienced a deflation rate of approximately 4%."
            ],
            correctAnswer: 1
          },
          {
            id: "2",
            text: "An economy produces only two goods: books and pencils. In a given year, it produces 100 books at $20 each and 500 pencils at $1 each. What is the nominal GDP for that year?",
            options: [
              "$600",
              "$2,000",
              "$2,500",
              "$3,000"
            ],
            correctAnswer: 2
          },
          {
            id: "3",
            text: "In an economy that only produces computers, the base year is 2023, when 1,000 computers were sold at $800 each. In 2024, 1,100 computers were sold at $900 each. What is the real GDP for 2024?",
            options: [
              "$800,000",
              "$880,000",
              "$900,000",
              "$990,000"
            ],
            correctAnswer: 1
          },
          {
            id: "4",
            text: "If a country's nominal GDP is $1.2 trillion and its real GDP is $1.0 trillion, what is the value of the GDP deflator?",
            options: [
              "83",
              "100",
              "120",
              "20"
            ],
            correctAnswer: 2
          },
          {
            id: "5",
            text: "Real GDP is a more accurate measure of an economy's output than nominal GDP because it is adjusted for changes in:",
            options: [
              "the unemployment rate.",
              "income distribution.",
              "the overall price level.",
              "government spending."
            ],
            correctAnswer: 2
          }
        ]
      },
      {
        id: "25",
        title: "Limitations of GDP",
        description: "Learn about the limitations of GDP as a measure of economic well-being.",
        videoSlug: "limitations-of-gdp",
        subjects: ["AP Macroeconomics"],
        unit: "2",
        lessonIDS: ["2.2"],
        tags: ["GDP", "Limitations", "GDP per capita"],
        videoUrl: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/2.2+-+Limitations+of+GDP.mp4",
        thumbnail: "https://thumbnailslarge.s3.ap-southeast-2.amazonaws.com/2.2_TN.jpg",
        accessLevel: "free",
        questions:     [
          {
            id: "1",
            text: "Which of the following activities is excluded from GDP because it is a non-market transaction?",
            options: [
              "Hiring a professional plumber to fix a leaky pipe.",
              "A homeowner renovating their own kitchen without paid assistance.",
              "Purchasing materials from a hardware store for a home project.",
              "Paying a monthly subscription fee for a streaming service."
            ],
            correctAnswer: 1
          },
          {
            id: "2",
            text: "A large factory's air pollution leads to a rise in respiratory illnesses, resulting in increased healthcare spending. How do these events affect GDP?",
            options: [
              "GDP decreases to reflect the negative impact of pollution on public health.",
              "GDP is unchanged because the healthcare spending is just correcting a problem.",
              "GDP increases due to the rise in healthcare spending, while the negative effects of pollution are not directly measured.",
              "GDP only changes if the factory is shut down by the government."
            ],
            correctAnswer: 2
          },
          {
            id: "3",
            text: "A country's real GDP per capita has grown by 15% over the past decade. From this information, what can be concluded with certainty?",
            options: [
              "The standard of living has improved for every citizen in the country.",
              "The distribution of income within the country has become more equal.",
              "The average economic output per person in the country has increased.",
              "The country's environmental quality has improved alongside its economic growth."
            ],
            correctAnswer: 2
          }
        ]
      },
      {
        id: "26",
        title: "Costs of Inflation",
        description: "Learn about the costs of inflation, interest rates, and how unexpected inflation impacts borrowers and lenders.",
        videoSlug: "costs-of-inflation",
        subjects: ["AP Macroeconomics"],
        unit: "2",
        lessonIDS: ["2.5 "],
        tags: ["Inflation", "Interest Rates", "Borrowers", "Lenders"],
        videoUrl: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/2.5+-+Costs+of+Inflation.mp4",
        thumbnail: "https://thumbnailslarge.s3.ap-southeast-2.amazonaws.com/2.5_TN.jpg",
        accessLevel: "free",
        questions:     [
          {
            id: "1",
            text: "A bank issues fixed-rate loans at a nominal interest rate of 5%, based on an expected inflation rate of 2%. If the actual inflation rate turns out to be 4%, who benefits from this unexpectedly high inflation?",
            options: [
              "The bank that issued the loans.",
              "The borrowers who took out the fixed-rate loans.",
              "Individuals who keep their savings in cash.",
              "Both the borrowers and the bank are equally well-off."
            ],
            correctAnswer: 1
          },
          {
            id: "2",
            text: "If you deposit money into a savings account with a nominal interest rate of 3% and the inflation rate for the year is 2%, what is the real interest rate on your deposit?",
            options: [
              "5%",
              "1%",
              "1.5%",
              "-1%"
            ],
            correctAnswer: 1
          },
          {
            id: "3",
            text: "A business must frequently reprint its product catalogs and update its website to reflect rising prices. This is an example of which cost of inflation?",
            options: [
              "Loss of purchasing power",
              "Menu costs",
              "The Fisher Effect",
              "Unexpected inflation"
            ],
            correctAnswer: 1
          }
        ]
          
      },
    
      {
        id: "27",
        title: "Aggregate Demand",
        description: "Learn about the components of aggregate demand, the relationship between aggregate demand and the price level, and the impact of changes in aggregate demand on the economy.",
        videoSlug: "aggregate-demand",
        subjects: ["AP Macroeconomics"],
        unit: "3",
        lessonIDS: ["3.1"],
        tags: ["Aggregate Demand", "Price Level", "Changes in Aggregate Demand"],
        videoUrl: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/3.1+-+Aggregate+Demand.mp4",
        thumbnail: "https://thumbnailslarge.s3.ap-southeast-2.amazonaws.com/3.1_TN.jpg",
        accessLevel: "free",
        questions:     [
          {
            id: "1",
            text: "When the domestic price level in a country falls, its goods become cheaper for foreigners to buy. This leads to an increase in what component of aggregate demand?",
            options: [
              "Consumption",
              "Investment",
              "Government Spending",
              "Net Exports"
            ],
            correctAnswer: 3,
            explanation: "This describes the Net Export Effect. A lower domestic price level makes a country's exports more attractive to foreign buyers and makes imports less attractive to domestic consumers, thus increasing net exports (Exports - Imports)."
          },
          {
            id: "2",
            text: "Which of the following would cause a rightward shift of the Aggregate Demand (AD) curve?",
            options: [
              "A decrease in the overall price level.",
              "An increase in personal income taxes.",
              "An increase in consumer confidence leading to more household spending.",
              "A decrease in the money supply."
            ],
            correctAnswer: 2,
            explanation: "An increase in consumer confidence leads to higher household spending, which is an increase in the Consumption (C) component of aggregate demand. This non-price-level change shifts the entire AD curve to the right."
          },
          {
            id: "3",
            text: "Which of the following events would most likely cause the Aggregate Demand curve in the United States to shift to the left?",
            options: [
              "The U.S. government passes a bill to increase spending on infrastructure.",
              "The price level in the United States falls relative to other countries.",
              "Several major European nations, key trading partners of the U.S., fall into a recession.",
              "A technological breakthrough increases productivity."
            ],
            correctAnswer: 2,
            explanation: "When key trading partners fall into a recession, their citizens and businesses buy fewer goods, including those imported from the U.S. This decreases U.S. exports, which reduces Net Exports (NX) and shifts the U.S. Aggregate Demand curve to the left."
          },
          {
            id: "4",
            text: "A decrease in the overall price level causing interest rates to fall, which in turn stimulates more business spending on capital goods, is known as the:",
            options: [
              "Real Wealth Effect",
              "Interest Rate Effect",
              "Net Export Effect",
              "Multiplier Effect"
            ],
            correctAnswer: 1,
            explanation: "This is the Interest Rate Effect. A lower price level means households need less money for purchases and can save more. This increases the supply of loanable funds, lowering interest rates and encouraging more investment spending by businesses."
          }
        ]
          
      },
      {
        id: "28",
        title: "Multipliers",
        description: "Learn about the spending multiplier, the tax multiplier, and the affect of changes in government spending and taxes on the economy.",
        videoSlug: "multipliers",
        subjects: ["AP Macroeconomics"],
        unit: "3",
        lessonIDS: ["3.2"],
        tags: ["Spending Multiplier", "Tax Multiplier", "Government Spending", "Taxes"],
        videoUrl: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/3.2+-+Multipliers+.mp4",
        thumbnail: "https://thumbnailslarge.s3.ap-southeast-2.amazonaws.com/3.2_TN.jpg",
        accessLevel: "free",
        questions:     [
          {
            id: "1",
            text: "If a household receives an additional $1,000 of income and chooses to spend $700 and save $300, what is its Marginal Propensity to Save (MPS)?",
            options: [
              "0.3",
              "0.7",
              "3.33",
              "1.42"
            ],
            correctAnswer: 0,
            explanation: "The Marginal Propensity to Save (MPS) is the fraction of extra income that is saved. It is calculated as the change in savings ($300) divided by the change in income ($1,000), which equals 0.3."
          },
          {
            id: "2",
            text: "If the marginal propensity to consume (MPC) in an economy is 0.9, what is the value of the spending multiplier?",
            options: [
              "1.11",
              "9",
              "10",
              "0.1"
            ],
            correctAnswer: 2,
            explanation: "First, find the MPS: MPS = 1 - MPC = 1 - 0.9 = 0.1. The spending multiplier formula is 1 / MPS. Therefore, the multiplier is 1 / 0.1 = 10."
          },
          {
            id: "3",
            text: "Assuming an MPC of 0.8, what would be the maximum possible change in real GDP from a $20 billion increase in government spending?",
            options: [
              "A $16 billion increase.",
              "A $20 billion increase.",
              "An $80 billion increase.",
              "A $100 billion increase."
            ],
            correctAnswer: 3,
            explanation: "First, find the spending multiplier. If MPC=0.8, then MPS=0.2. The multiplier is 1/MPS = 1/0.2 = 5. The total change in GDP is the initial spending ($20B) times the multiplier (5), which equals $100 billion."
          },
          {
            id: "4",
            text: "Why is a $50 billion tax cut a less powerful policy for stimulating the economy than a $50 billion increase in government spending?",
            options: [
              "The tax cut is not subject to the multiplier effect.",
              "A portion of the tax cut will be saved by households rather than spent in the first round.",
              "Government spending is an injection, while a tax cut is a leakage from the economy.",
              "The tax multiplier is always a positive number."
            ],
            correctAnswer: 1,
            explanation: "With a government spending increase, the entire $50 billion is immediately injected into the economy as spending. With a tax cut, households receive the extra disposable income, but they will save a portion of it (determined by the MPS), so the initial round of new spending is smaller."
          }
        ]
          
      },
      {
        id: "29",
        title: "Short-Run Aggregate Supply",
        description: "Learn about the components of short-run aggregate supply, the relationship between short-run aggregate supply and the price level, and the impact of changes in short-run aggregate supply on the economy.",
        videoSlug: "short-run-aggregate-supply",
        subjects: ["AP Macroeconomics"],
        unit: "3",
        lessonIDS: ["3.3"],
        tags: ["Short-Run Aggregate Supply", "Price Level", "Changes in Short-Run Aggregate Supply"],
        videoUrl: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/3.3+-+Short-Run+Aggregate+Supply.mp4",
        thumbnail: "https://thumbnailslarge.s3.ap-southeast-2.amazonaws.com/3.3_TN.jpg",
        accessLevel: "free",
        questions:     [
          {
            id: "1",
            text: "What is the primary reason for the upward slope of the short-run aggregate supply (SRAS) curve?",
            options: [
              "As the price level rises, consumers have more purchasing power.",
              "In the short run, nominal wages and other input prices are 'sticky' or slow to adjust.",
              "Government regulations increase as the price level rises.",
              "The interest rate effect encourages more investment at higher price levels."
            ],
            correctAnswer: 1,
            explanation: "The SRAS curve slopes upward because nominal wages are 'sticky' in the short run. When the overall price level rises, firms receive higher prices for their goods, but their labor costs remain fixed. This increases profit margins, creating an incentive to produce more output."
          },
          {
            id: "2",
            text: "Which of the following would cause the short-run aggregate supply curve to shift to the left?",
            options: [
              "A decrease in the price of oil, a key input.",
              "A widespread increase in labor productivity due to new technology.",
              "An increase in government subsidies for businesses.",
              "A nationwide increase in the negotiated wages for workers."
            ],
            correctAnswer: 3,
            explanation: "A nationwide increase in wages raises the cost of production for many firms across the economy. This decrease in profitability leads firms to supply less output at any given price level, shifting the SRAS curve to the left."
          },
          {
            id: "3",
            text: "The widespread adoption of a new, more efficient internet infrastructure that boosts worker output across many industries would cause which of the following?",
            options: [
              "A rightward shift of the short-run aggregate supply curve.",
              "A leftward shift of the short-run aggregate supply curve.",
              "A movement up along the short-run aggregate supply curve.",
              "A leftward shift of the aggregate demand curve."
            ],
            correctAnswer: 0,
            explanation: "A boost in worker output is an increase in productivity. This lowers the per-unit cost of production for businesses, allowing them to supply more goods and services at every price level and shifting the SRAS curve to the right."
          },
          {
            id: "4",
            text: "If business leaders across the economy expect the general price level to be much higher in the near future, how will this affect the current short-run aggregate supply curve?",
            options: [
              "It will shift to the right, as businesses produce more in anticipation of higher profits.",
              "It will shift to the left, as businesses may withhold some production to sell later at higher prices.",
              "It will become steeper, as businesses react more quickly to price changes.",
              "It will not change, as expectations only affect aggregate demand."
            ],
            correctAnswer: 1,
            explanation: "If producers expect higher prices in the future, they have an incentive to reduce their supply in the present to sell their inventory later when it is more profitable. This collective action shifts the current SRAS curve to the left."
          }
        ]
          
      },
      {
        id: "30",
        title: "Long-Run Aggregate Supply",
        description: "Learn about the components of long-run aggregate supply, the (lack of a) relationship between long-run aggregate supply and the price level, and the causes of changes to the LRAS curve.",
        videoSlug: "long-run-aggregate-supply",
        subjects: ["AP Macroeconomics"],
        unit: "3",
        lessonIDS: ["3.4"],
        tags: ["Long-Run Aggregate Supply", "Price Level", "Changes in Long-Run Aggregate Supply"],
        videoUrl: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/3.4+-+Long-Run+Aggregate+Supply.mp4",
        thumbnail: "https://thumbnailslarge.s3.ap-southeast-2.amazonaws.com/3.4_TN.jpg",
        accessLevel: "free",
        questions:     [
          {
            id: "1",
            text: "The long-run aggregate supply (LRAS) curve is vertical because:",
            options: [
              "the government can always adjust its spending to maintain full employment.",
              "in the long run, the price level is fixed by the central bank.",
              "in the long run, wages and other input prices are flexible and fully adjust to changes in the price level.",
              "the multiplier effect is stronger in the long run than in the short run."
            ],
            correctAnswer: 2,
            explanation: "The LRAS is vertical because in the long run, an economy's ability to produce goods and services depends on its resources and technology, not the overall price level. Flexible wages and prices mean that changes in the price level do not change real profit incentives."
          },
          {
            id: "2",
            text: "Which of the following would cause a country's long-run aggregate supply (LRAS) curve to shift to the right?",
            options: [
              "A decrease in corporate income taxes.",
              "A widespread increase in the population's level of education and skills.",
              "An increase in aggregate demand.",
              "A decrease in the price of imported natural resources."
            ],
            correctAnswer: 1,
            explanation: "A more educated and skilled workforce represents an improvement in human capital. This increases the economy's overall productivity and its potential output, causing the LRAS curve to shift to the right."
          },
          {
            id: "3",
            text: "A devastating earthquake destroys a significant portion of a nation's infrastructure and factories. This event would cause:",
            options: [
              "the short-run aggregate supply curve to shift right.",
              "the aggregate demand curve to shift left.",
              "the long-run aggregate supply curve to shift left.",
              "a movement down along the long-run aggregate supply curve."
            ],
            correctAnswer: 2,
            explanation: "The destruction of infrastructure and factories represents a decrease in the nation's physical capital stock. This reduces the economy's productive capacity and potential output, causing a leftward shift of the LRAS curve."
          },
          {
            id: "4",
            text: "The level of output represented by the long-run aggregate supply curve is known as full-employment output. At this level of output, the economy is experiencing:",
            options: [
              "zero unemployment.",
              "only cyclical and frictional unemployment.",
              "the natural rate of unemployment.",
              "only structural and cyclical unemployment."
            ],
            correctAnswer: 2,
            explanation: "Full-employment output (or potential output) is the level of production an economy can sustain when unemployment is at its 'natural' rate, which includes frictional and structural unemployment but excludes cyclical unemployment."
          }
        ]
          
      },
      {
        id: "31",
        title: "Equilibrium in the AD-AS Model",
        description: "Learn about the full AD-AS model, the concept of short-run equilibrium, long-run equilibrium, and output gaps.",
        videoSlug: "equilibrium-in-the-ad-as-model",
        subjects: ["AP Macroeconomics"],
        unit: "3",
        lessonIDS: ["3.5"],
        tags: ["AD-AS Model", "Short-Run Equilibrium", "Long-Run Equilibrium", "Recessionary Gap", "Inflationary Gap"],
        videoUrl: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/3.5+-+Equilibrium+in+the+AD-AS+Model.mp4",
        thumbnail: "https://thumbnailslarge.s3.ap-southeast-2.amazonaws.com/3.5_TN.jpg",
        accessLevel: "free",
        questions:     [
          {
            id: "1",
            text: "Which of the following is true when an economy is in a state of long-run equilibrium?",
            options: [
              "The actual unemployment rate is equal to the natural rate of unemployment.",
              "The aggregate demand curve is vertical.",
              "Actual real GDP is greater than potential real GDP.",
              "The short-run aggregate supply curve is vertical."
            ],
            correctAnswer: 0,
            explanation: "Long-run equilibrium occurs when all three curves (AD, SRAS, LRAS) intersect at the same point. This means actual output equals potential output, and the actual unemployment rate is equal to the natural rate."
          },
          {
            id: "2",
            text: "If an economy's short-run equilibrium output is less than its potential output, what is the condition of the labor market?",
            options: [
              "The actual unemployment rate is less than the natural rate of unemployment.",
              "The labor force participation rate must be falling.",
              "The actual unemployment rate is higher than the natural rate of unemployment.",
              "There is no cyclical unemployment."
            ],
            correctAnswer: 2,
            explanation: "When an economy is in a recessionary gap (actual output < potential output), it is not using all of its resources efficiently. This includes labor, so the actual unemployment rate will be higher than the natural rate."
          },
          {
            id: "3",
            text: "In the AD-AS model, an inflationary gap is represented by a short-run equilibrium point where:",
            options: [
              "the SRAS curve has shifted to the left of the LRAS curve.",
              "the AD and SRAS curves intersect to the right of the LRAS curve.",
              "the AD and SRAS curves intersect to the left of the LRAS curve.",
              "the LRAS curve has shifted to the right."
            ],
            correctAnswer: 1,
            explanation: "An inflationary gap occurs when the economy is 'overheating' and producing at a level of output greater than its long-run potential. Graphically, this is shown by the intersection of AD and SRAS at a level of real GDP to the right of the vertical LRAS curve."
          },
          {
            id: "4",
            text: "The intersection of the aggregate demand curve and the short-run aggregate supply curve always determines the:",
            options: [
              "long-run economic growth rate and potential output.",
              "natural rate of unemployment and the long-run price level.",
              "current price level and current level of real GDP.",
              "rate of inflation and the size of the labor force."
            ],
            correctAnswer: 2,
            explanation: "The intersection of AD and SRAS represents the short-run equilibrium for the economy, indicating the current price level and the current amount of output (real GDP) that is being produced and purchased."
          }
        ]
          
      },
      {
        id: "32",
        title: "Changes in Equilibrium in the AD-AS Model",
        description: "Learn about how shifts of the AD curve and SRAS curve change the equilibrium in the AD-AS model.",
        videoSlug: "changes-in-equilibrium-in-the-ad-as-model",
        subjects: ["AP Macroeconomics"],
        unit: "3",
        lessonIDS: ["3.6"],
        tags: ["AD-AS Model", "Price Level", "Changes in Equilibrium"],
        videoUrl: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/3.6+-+Changes+in+Equilibrium+in+the+AD-AS+Model.mp4",
        thumbnail: "https://thumbnailslarge.s3.ap-southeast-2.amazonaws.com/3.6_TN.jpg",
        accessLevel: "free",
        questions:     [
          {
            id: "1",
            text: "A significant increase in household wealth due to a booming stock market would lead to what short-run change in the economy?",
            options: [
              "A decrease in the price level and a decrease in real GDP.",
              "An increase in the price level and a decrease in real GDP.",
              "A decrease in the price level and an increase in real GDP.",
              "An increase in the price level and an increase in real GDP."
            ],
            correctAnswer: 3,
            explanation: "Increased household wealth boosts consumer confidence and spending (C), which shifts the aggregate demand (AD) curve to the right. This leads to a higher short-run equilibrium price level and a higher level of real GDP."
          },
          {
            id: "2",
            text: "A period of high inflation combined with a recession (falling output) is known as stagflation. This is caused by:",
            options: [
              "a rightward shift of the aggregate demand curve.",
              "a leftward shift of the short-run aggregate supply curve.",
              "a leftward shift of the aggregate demand curve.",
              "a rightward shift of the short-run aggregate supply curve."
            ],
            correctAnswer: 1,
            explanation: "Stagflation (stagnant growth + inflation) is the result of a negative supply shock, which shifts the SRAS curve to the left. This leads to a higher equilibrium price level and a lower level of real GDP."
          },
          {
            id: "3",
            text: "Which of the following events would cause demand-pull inflation?",
            options: [
              "An increase in the price of energy resources.",
              "A large increase in government spending on national defense.",
              "A decrease in labor productivity.",
              "A significant increase in business taxes."
            ],
            correctAnswer: 1,
            explanation: "Demand-pull inflation is caused by a rightward shift of the aggregate demand curve. A large increase in government spending is a direct injection that shifts AD to the right, 'pulling' the price level up."
          },
          {
            id: "4",
            text: "If an economy's price level rises while its real GDP falls, this is most likely a case of:",
            options: [
              "cost-push inflation.",
              "demand-pull inflation.",
              "a positive supply shock.",
              "an increase in consumer confidence."
            ],
            correctAnswer: 0,
            explanation: "This combination of a higher price level and lower output is the signature outcome of a leftward shift in the short-run aggregate supply (SRAS) curve. This is known as cost-push inflation because rising input costs 'push' the price level higher."
          }
        ]
          
      },
      {
        id: "33",
        title: "Long-Run Self-Adjustment",
        description: "Learn about the process of long-run self-adjustment in the AD-AS model and how the economy returns to long-run equilibrium.",
        videoSlug: "long-run-self-adjustment",
        subjects: ["AP Macroeconomics"],
        unit: "3",
        lessonIDS: ["3.7"],
        tags: ["Long-Run Self-Adjustment", "SRAS", "Sticky Wages"],
        videoUrl: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/3.7+-+Long-Run+Self-Adjustment.mp4",
          thumbnail: "https://thumbnailslarge.s3.ap-southeast-2.amazonaws.com/3.7_TN.jpg",
        accessLevel: "free",
        questions:     [
          {
            id: "1",
            text: "The economy's long-run self-adjustment mechanism primarily relies on the flexibility of which of the following?",
            options: [
              "Government spending",
              "Nominal wages and other resource prices",
              "The money supply",
              "Consumer confidence"
            ],
            correctAnswer: 1,
            explanation: "Long-run self-adjustment occurs because nominal wages and other input prices eventually adjust to the overall price level, causing the SRAS curve to shift and guide the economy back to its long-run potential."
          },
          {
            id: "2",
            text: "If an economy is currently in an inflationary gap and the government takes no policy action, what will happen in the long run?",
            options: [
              "The aggregate demand curve will shift left as consumers spend less.",
              "The short-run aggregate supply curve will shift left as nominal wages rise.",
              "The long-run aggregate supply curve will shift right as potential grows.",
              "The short-run aggregate supply curve will shift right as technology improves."
            ],
            correctAnswer: 1,
            explanation: "In an inflationary gap, low unemployment leads to competition for workers, which drives up nominal wages. Higher wages are an increased cost of production, which shifts the SRAS curve to the left, returning the economy to long-run equilibrium at a higher price level."
          },
          {
            id: "3",
            text: "In the absence of government intervention, how does an economy self-correct from a recessionary gap?",
            options: [
              "Falling nominal wages shift the short-run aggregate supply curve to the right.",
              "Rising prices shift the aggregate demand curve to the right.",
              "Falling consumer confidence shifts the aggregate demand curve to the left.",
              "Rising wages shift the short-run aggregate supply curve to the left."
            ],
            correctAnswer: 0,
            explanation: "In a recessionary gap, high unemployment puts downward pressure on nominal wages. As wages fall, production becomes cheaper for firms, causing the short-run aggregate supply curve to shift to the right until the economy returns to full employment."
          },
          {
            id: "4",
            text: "After an economy experiences a negative demand shock and then self-adjusts back to long-run equilibrium, how will the new price level and output compare to the original equilibrium?",
            options: [
              "The price level will be higher, and output will be the same.",
              "The price level will be lower, and output will be lower.",
              "The price level will be lower, and output will be the same.",
              "The price level will be the same, and output will be the same."
            ],
            correctAnswer: 2,
            explanation: "A negative demand shock creates a recessionary gap. The self-adjustment process involves falling wages shifting the SRAS curve to the right. This returns the economy to its original potential output (Yf) but at a new, lower price level."
          }
        ]
          
      },
      {
        id: "35",
        title: "Fiscal Policy",
        description: "Learn about how the federal government uses spending and taxes to influence economic outcomes and help close output gaps.",
        videoSlug: "fiscal-policy",
        subjects: ["AP Macroeconomics"],
        unit: "3",
        lessonIDS: ["3.8"],
        tags: ["Fiscal Policy", "Government Spending", "Taxes", "Output Gaps"],
        videoUrl: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/3.8+-+Fiscal+Policy.mp4",
        thumbnail: "https://thumbnailslarge.s3.ap-southeast-2.amazonaws.com/3.8_TN.jpg",
        accessLevel: "free",
        questions:     [
          {
            id: "1",
            text: "If an economy is in a severe recession, which of the following represents an appropriate expansionary fiscal policy?",
            options: [
              "Increasing the money supply.",
              "Increasing corporate and personal income taxes.",
              "Decreasing government spending on infrastructure.",
              "Decreasing taxes and increasing government spending."
            ],
            correctAnswer: 3,
            explanation: "Expansionary fiscal policy is used to combat a recession by increasing aggregate demand. Both decreasing taxes (which increases consumption and investment) and increasing government spending directly shift the AD curve to the right."
          },
          {
            id: "2",
            text: "An economy is experiencing rapidly rising inflation, and the unemployment rate is well below the natural rate. Which of the following is an appropriate contractionary fiscal policy?",
            options: [
              "Decreasing government spending.",
              "Decreasing the reserve requirement for banks.",
              "Increasing the money supply.",
              "Decreasing personal income taxes."
            ],
            correctAnswer: 0,
            explanation: "Contractionary fiscal policy is used to slow down an overheating economy and fight inflation. Decreasing government spending is a direct way to reduce aggregate demand, shifting the AD curve to the left."
          },
          {
            id: "3",
            text: "If the government enacts a policy to increase taxes on both households and businesses, what will be the short-run effect on the price level, real GDP, and unemployment?",
            options: [
              "Price level increases, real GDP increases, unemployment decreases.",
              "Price level decreases, real GDP decreases, unemployment increases.",
              "Price level increases, real GDP decreases, unemployment increases.",
              "Price level decreases, real GDP increases, unemployment decreases."
            ],
            correctAnswer: 1,
            explanation: "Increasing taxes is a contractionary fiscal policy. It reduces disposable income for consumers (lowering C) and profits for businesses (lowering I), which shifts the aggregate demand curve to the left. This results in a lower price level, lower real GDP, and higher unemployment."
          },
          {
            id: "4",
            text: "Fiscal policy, enacted by the government, is a tool used to influence the economy primarily by shifting the:",
            options: [
              "short-run aggregate supply curve.",
              "long-run aggregate supply curve.",
              "production possibilities curve.",
              "aggregate demand curve."
            ],
            correctAnswer: 3,
            explanation: "The primary tools of fiscal policy—changes in government spending and taxes—are components of, or directly influence the components of, aggregate demand (C, I, G, NX). Therefore, fiscal policy's main effect is to shift the AD curve."
          }
        ]
          
      },
      {
        id: "34",
        title: "Automatic Stabilizers",
        description: "Learn about how automatic stabilizers help the economy self-correct to long-run equilibrium.",
        videoSlug: "automatic-stabilizers",
        subjects: ["AP Macroeconomics"],
        unit: "3",
        lessonIDS: ["3.9"],
        tags: ["Automatic Stabilizers", "Taxes", "Government Spending", "Output Gaps"],
        videoUrl: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/3.9+-+Automatic+Stabilizers.mp4",
        thumbnail: "https://thumbnailslarge.s3.ap-southeast-2.amazonaws.com/3.9_TN.jpg",
        accessLevel: "free",
        questions:     [
  {
    id: "1",
    text: "What is the key feature of an automatic stabilizer that distinguishes it from discretionary fiscal policy?",
    options: [
      "It only works to combat inflation, not recessions.",
      "It requires a new bill to be passed by Congress to take effect.",
      "It works to stabilize the economy without new, deliberate action from policymakers.",
      "It only affects the short-run aggregate supply curve."
    ],
    correctAnswer: 2,
    explanation: "Automatic stabilizers are built-in features of the tax and spending system that trigger automatically in response to changes in the economy, whereas discretionary policy involves lawmakers making explicit, new decisions."
  },
  {
    id: "2",
    text: "During an economic expansion when incomes are rising, how does a progressive income tax system act as an automatic stabilizer?",
    options: [
      "It automatically decreases tax rates, further stimulating the economy.",
      "It automatically increases tax revenues, which helps to dampen aggregate demand.",
      "It automatically increases government spending on social programs.",
      "It automatically shifts the short-run aggregate supply curve to the right."
    ],
    correctAnswer: 1,
    explanation: "In a progressive tax system, as people earn higher incomes during an expansion, they move into higher tax brackets. This automatically increases the amount of tax revenue collected by the government, which helps to slow down the growth of disposable income and dampen aggregate demand."
  },
  {
    id: "3",
    text: "Which of the following describes how an automatic stabilizer works during a recession?",
    options: [
      "Tax revenues rise as people work more hours to make up for lost income.",
      "Government spending on unemployment benefits increases as more people lose their jobs.",
      "The government passes a new infrastructure spending bill.",
      "Interest rates automatically fall, encouraging more investment."
    ],
    correctAnswer: 1,
    explanation: "During a recession, more people become unemployed and automatically become eligible for unemployment benefits. This increase in government transfer payments helps support household incomes and consumption, cushioning the downturn."
  },
  {
    id: "4",
    text: "Which of the following is an example of discretionary fiscal policy, NOT an automatic stabilizer?",
    options: [
      "A rise in unemployment insurance payments during a recession.",
      "A decrease in government tax receipts during a recession.",
      "A newly passed law that provides a one-time tax rebate to all citizens.",
      "A fall in unemployment insurance payments during an expansion."
    ],
    correctAnswer: 2,
    explanation: "A new law providing a one-time tax rebate is a deliberate, explicit action taken by lawmakers to influence the economy, which is the definition of discretionary fiscal policy. The other options describe changes that happen automatically based on existing laws."
  }
]
          
      },
      {
        id: "35",
        title: "Comparative Advantage and Trade",
        description: "Learn about how absolute advantage, comparative advantage, and how individuals and countries benefit from specialization and trade.",
        videoSlug: "comparative-advantage-and-trade",
        subjects: ["AP Macroeconomics"],
        unit: "1",
        lessonIDS: ["1.3"],
        tags: ["Comparative Advantage", "Trade", "Specialization", "Absolute Advantage"],
        videoUrl: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/1.3+-+Comparative+Advantage+and+Trade.mp4",
        thumbnail: "https://thumbnailslarge.s3.ap-southeast-2.amazonaws.com/1.3_TN.jpg",
        accessLevel: "free",
        questions: [
          {
            id: "1",
            text: "Which of the following best defines comparative advantage?",
            options: [
              "The ability to produce more of a good using fewer resources than another country.",
              "The ability to produce a good at a lower opportunity cost than another producer.",
              "The ability to trade goods without facing tariffs or quotas.",
              "The ability to use all available resources efficiently."
            ],
            correctAnswer: 1,
            explanation: "Comparative advantage exists when a producer can make a good at a lower opportunity cost than another, even if they do not have the absolute advantage."
          },
          {
            id: "2",
            text: "If Country A can produce either 10 tons of wheat or 20 tons of rice, and Country B can produce either 6 tons of wheat or 12 tons of rice, which country has the comparative advantage in wheat?",
            options: [
              "Country A, because it produces more wheat overall.",
              "Country A, because its opportunity cost of wheat is lower.",
              "Country B, because its opportunity cost of wheat is lower.",
              "Neither country, since they have identical opportunity costs."
            ],
            correctAnswer: 3,
            explanation: "Country A gives up 2 rice per wheat (20/10), while Country B gives up 2 rice per wheat (12/6). Since the opportunity cost is the same, neither has a comparative advantage in wheat."
          },
          {
            id: "3",
            text: "Which of the following outcomes is most likely when countries specialize according to comparative advantage and then trade?",
            options: [
              "Both countries consume at points beyond their production possibilities curves.",
              "One country benefits while the other loses resources.",
              "World output decreases because of specialization.",
              "Countries only consume what they produce domestically."
            ],
            correctAnswer: 0,
            explanation: "Trade based on comparative advantage allows countries to specialize and consume beyond their own PPCs, making both better off."
          },
          {
            id: "4",
            text: "Suppose an individual is more productive than others at both cooking and repairing cars. According to the principle of comparative advantage, this person should:",
            options: [
              "Do both tasks since they have the absolute advantage in both.",
              "Specialize in the task where they have the lower opportunity cost.",
              "Avoid specialization because they are already efficient at both.",
              "Specialize only if they can trade with someone who has an absolute advantage."
            ],
            correctAnswer: 1,
            explanation: "Even if one person has the absolute advantage in both tasks, comparative advantage tells us they should specialize in what they give up the least to produce."
          }
        ]
          
      },
      {
        id: "36",
        title: "Financial Assets",
        description: "Learn about different types of financial assets and how they are used to store and transfer wealth.",
        videoSlug: "financial-assets",
        subjects: ["AP Macroeconomics"],
        unit: "4",
        lessonIDS: ["4.1"],
        tags: ["Financial Assets", "Stock", "Bond", "Liquidity"],
        videoUrl: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/4.1+-+Financial+Assets.mp4",
        thumbnail: "https://thumbnailslarge.s3.ap-southeast-2.amazonaws.com/1.3_TN.jpg",
        accessLevel: "free",
        questions: [
          {
            id: "1",
            text: "A person's wealth is divided among the following: a savings account, shares of a publicly traded company (stock), and a collection of rare art. Which of the following ranks these assets from MOST liquid to LEAST liquid?",
            options: [
              "Art collection, company stock, savings account.",
              "Company stock, savings account, art collection.",
              "Savings account, company stock, art collection.",
              "Savings account, art collection, company stock."
            ],
            correctAnswer: 2,
            explanation: "Liquidity refers to how easily an asset can be converted into cash. A savings account is highly liquid. Company stock can be sold relatively quickly on the stock market but is less liquid than savings. A rare art collection is highly illiquid as finding a buyer at a fair price can take a long time."
          },
          {
            id: "2",
            text: "An individual decides to keep a large amount of their savings in a non-interest-bearing checking account for easy access. What is the primary opportunity cost of this decision?",
            options: [
              "The risk of the bank failing.",
              "The fees charged by the bank for the account.",
              "The erosion of value due to deflation.",
              "The interest that could have been earned by holding an interest-bearing asset like a bond."
            ],
            correctAnswer: 3,
            explanation: "The opportunity cost of holding wealth as cash is forgoing the potential returns from other financial assets. By keeping money in a non-interest-bearing account, the individual gives up the interest payments they could have received from an asset like a bond."
          },
          {
            id: "3",
            text: "If market interest rates for newly issued bonds fall from 5% to 3%, what will happen to the market price of a previously issued bond that has a fixed interest rate of 4%?",
            options: [
              "The price of the 4% bond will increase.",
              "The price of the 4% bond will decrease.",
              "The price of the 4% bond will not change.",
              "The 4% bond will be recalled by the issuer."
            ],
            correctAnswer: 0,
            explanation: "There is an inverse relationship between interest rates and the price of existing bonds. When new bonds are offering a lower rate (3%), an existing bond with a higher fixed rate (4%) becomes more attractive. This increased demand will drive up the market price of the older bond."
          }
        ]
          
      },
      {
        id: "37",
        title: "Nominal vs. Real Interest Rates",
        description: "Learn about the difference between nominal and real interest rates, how to calculate them, and the effects of inflation on interest rates.",
        videoSlug: "nominal-vs-real-interest-rates",
        subjects: ["AP Macroeconomics"],
        unit: "4",
        lessonIDS: ["4.2"],
        tags: ["Nominal Interest Rate", "Real Interest Rate", "Inflation", "Fisher Effect"],
        videoUrl: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/4.2+-+Nominal+vs.+Real+Interest+Rates.mp4",
        thumbnail: "https://thumbnailslarge.s3.ap-southeast-2.amazonaws.com/1.3_TN.jpg",
        accessLevel: "free",
        questions: [
          {
            id: "1",
            text: "A person deposits money in a savings account that pays a 4% nominal interest rate. If the economy experiences an inflation rate of 1.5% during that year, what is the real interest rate on the savings?",
            options: [
              "5.5%",
              "4%",
              "2.5%",
              "1.5%"
            ],
            correctAnswer: 2,
            explanation: "The real interest rate is the nominal interest rate minus the inflation rate. In this case, it is 4% (nominal rate) - 1.5% (inflation rate) = 2.5%."
          },
          {
            id: "2",
            text: "A company takes out a loan with a fixed nominal interest rate of 7%, expecting the inflation rate to be 2%. If the actual inflation rate turns out to be 5%, who is better off?",
            options: [
              "The company that borrowed the money.",
              "The bank that lent the money.",
              "Both parties are equally well off.",
              "The government."
            ],
            correctAnswer: 0,
            explanation: "Higher-than-expected inflation benefits borrowers. The company is repaying the loan with money that has less purchasing power than was anticipated, which lowers the real cost of borrowing. The bank (the lender) is worse off."
          },
          {
            id: "3",
            text: "A bank wants to earn a real return of 3% on its loans. If the bank anticipates that the inflation rate will be 2% over the next year, what is the minimum nominal interest rate it must charge?",
            options: [
              "1%",
              "2%",
              "3%",
              "5%"
            ],
            correctAnswer: 3,
            explanation: "The nominal interest rate must cover both the desired real return and the expected inflation. Using the formula: Nominal Rate = Real Rate + Expected Inflation, the bank must charge 3% + 2% = 5%."
          }
        ]
          
      },
      {
        id: "38",
        title: "Definition, Measurement, and Functions of Money",
        description: "Learn how money is defined, how it is measured, and the three key functions of money.",
        videoSlug: "definition-measurement-and-functions-of-money",
        subjects: ["AP Macroeconomics"],
        unit: "4",
        lessonIDS: ["4.3"],
        tags: ["Medium of Exchange", "Store of Value", "Unit of Account", "M1", "M2", "Money Supply"],
        videoUrl: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/4.3+-+Definition%2C+Measurement%2C+and+Functions+of+Money.mp4",
        thumbnail: "https://thumbnailslarge.s3.ap-southeast-2.amazonaws.com/1.3_TN.jpg",
        accessLevel: "free",
        questions: [
          {
            id: "1",
            text: "When a clothing store puts a price tag of $25 on a shirt, it is using money primarily as a:",
            options: [
              "store of value.",
              "medium of exchange.",
              "unit of account.",
              "form of barter."
            ],
            correctAnswer: 2,
            explanation: "A unit of account is the function of money that provides a common measure of value. By pricing the shirt in dollars, the store is using money as a standard way to communicate the item's value."
          },
          {
            id: "2",
            text: "When you purchase a movie ticket with cash, you are primarily using money as a:",
            options: [
              "unit of account.",
              "store of value.",
              "medium of exchange.",
              "financial asset."
            ],
            correctAnswer: 2,
            explanation: "A medium of exchange is an item that is widely accepted as payment for goods and services. Using cash to buy a ticket is a direct example of money facilitating this exchange."
          },
          {
            id: "3",
            text: "If an individual transfers $500 from their savings account to their checking account, what is the immediate impact on the M1 and M2 measures of the money supply?",
            options: [
              "M1 increases, and M2 stays the same.",
              "M1 decreases, and M2 increases.",
              "Both M1 and M2 increase.",
              "M1 stays the same, and M2 increases."
            ],
            correctAnswer: 0,
            explanation: "M1 includes checking accounts but not savings accounts. M2 includes everything in M1 plus savings accounts. Transferring money from savings to checking moves funds into M1, increasing its value. Since both accounts are already part of the broader M2 measure, M2 remains unchanged."
          },
          {
            id: "4",
            text: "Which of the following financial assets is NOT included in the M2 measure of the money supply?",
            options: [
              "Physical currency (cash).",
              "Savings account deposits.",
              "Shares of company stock.",
              "Money market accounts."
            ],
            correctAnswer: 2,
            explanation: "M2 includes cash, checking deposits, savings deposits, and other 'near money' assets. Financial assets like stocks and bonds are considered investments, not money, because they are not a direct medium of exchange and their value can fluctuate."
          }
        ]
          
      },
      {
        id: "39",
        title: "Banking and the Expansion of the Money Supply",
        description: "Learn about the fractional reserve banking system and how lending leads to the expansion of the money supply.",
        videoSlug: "banking-and-the-expansion-of-the-money-supply",
        subjects: ["AP Macroeconomics"],
        unit: "4",
        lessonIDS: ["4.4"],
        tags: ["Fractional Reserve Banking System", "Money Multiplier", "Money Supply"],
        videoUrl: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/4.4+-+Banking+and+the+Expansion+of+the+Money+Supply.mp4",
        thumbnail: "https://thumbnailslarge.s3.ap-southeast-2.amazonaws.com/1.3_TN.jpg",
        accessLevel: "free",
        questions: [
          {
            id: "1",
            text: "A customer deposits $2,000 into a checking account at a bank that has a required reserve ratio of 10%. How much must the bank keep as required reserves, and how much is available to be loaned out as excess reserves?",
            options: [
              "$2,000 required, $0 excess.",
              "$1,800 required, $200 excess.",
              "$1,000 required, $1,000 excess.",
              "$200 required, $1,800 excess."
            ],
            correctAnswer: 3,
            explanation: "Required reserves are the deposit amount multiplied by the required reserve ratio ($2,000 * 0.10 = $200). Excess reserves are the remaining amount that can be loaned out ($2,000 - $200 = $1,800)."
          },
          {
            id: "2",
            text: "If the required reserve ratio in a banking system is 20%, what is the maximum value of the money multiplier?",
            options: [
              "20",
              "5",
              "4",
              "0.8"
            ],
            correctAnswer: 1,
            explanation: "The money multiplier is calculated as 1 divided by the required reserve ratio. In this case, the calculation is 1 / 0.20 = 5."
          },
          {
            id: "3",
            text: "Alex deposits $100 of cash into a checking account. The required reserve ratio is 5%. What is the maximum possible change in the money supply as a result of this deposit?",
            options: [
              "$2,000",
              "$100",
              "$1,900",
              "$95"
            ],
            correctAnswer: 2,
            explanation: "First, find the initial excess reserves: $100 * (1 - 0.05) = $95. Next, find the money multiplier: 1 / 0.05 = 20. The maximum expansion is the initial excess reserves multiplied by the multiplier: $95 * 20 = $1,900."
          },
          {
            id: "4",
            text: "A person who was holding $500 in a piggy bank decides to deposit it into their checking account. What is the immediate effect on the M1 money supply?",
            options: [
              "M1 increases by $500.",
              "M1 decreases by $500.",
              "M1 remains unchanged.",
              "M1 increases by more than $500."
            ],
            correctAnswer: 2,
            explanation: "Both cash and checking account balances are part of the M1 money supply. This deposit is simply a transfer from one component of M1 (currency) to another (demand deposits). Therefore, the total value of M1 does not change at the moment of deposit."
          }
        ]
          
      },
      {
        id: "40",
        title: "The Money Market",
        description: "Learn about the money market graph, which depicts the relationship between nominal interest rates, the money supply, and the demand for money.",
        videoSlug: "the-money-market",
        subjects: ["AP Macroeconomics"],
        unit: "4",
        lessonIDS: ["4.5"],
        tags: ["Money Market", "Nominal Interest Rate", "Money Supply", "Demand for Money"],
        videoUrl: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/4.5+-+The+Money+Market+(v2+-+higher+volume).mp4",
        thumbnail: "https://thumbnailslarge.s3.ap-southeast-2.amazonaws.com/1.3_TN.jpg",
        accessLevel: "free",
        questions: [
          {
            id: "1",
            text: "The demand curve for money is downward sloping because:",
            options: [
              "a higher nominal interest rate reduces the purchasing power of money.",
              "the central bank increases the money supply when interest rates are high.",
              "a lower nominal interest rate decreases the opportunity cost of holding money.",
              "a higher price level requires people to hold more money for transactions."
            ],
            correctAnswer: 2,
            explanation: "When the nominal interest rate is low, the interest you give up by holding cash instead of an interest-bearing asset (like a bond) is small. This low opportunity cost makes people more willing to hold a larger quantity of money."
          },
          {
            id: "2",
            text: "If a country experiences significant inflation, causing the overall price level to rise, what is the expected impact in the money market?",
            options: [
              "The demand for money will shift to the right, increasing the nominal interest rate.",
              "The supply of money will shift to the right, decreasing the nominal interest rate.",
              "The demand for money will shift to the left, decreasing the nominal interest rate.",
              "The supply of money will shift to the left, increasing the nominal interest rate."
            ],
            correctAnswer: 0,
            explanation: "When the price level rises, people need more money to conduct their everyday transactions. This increases the demand for money, shifting the money demand curve to the right and leading to a higher equilibrium nominal interest rate."
          },
          {
            id: "3",
            text: "Which of the following would cause a rightward shift of the money demand curve?",
            options: [
              "A decrease in the nominal interest rate.",
              "An increase in the nominal interest rate.",
              "A decrease in the aggregate price level.",
              "An increase in real GDP."
            ],
            correctAnswer: 3,
            explanation: "An increase in real GDP means national income has risen, leading to more overall spending in the economy. To facilitate these additional transactions, people need to hold more liquid money, which shifts the money demand curve to the right."
          },
          {
            id: "4",
            text: "Which of the following best explains why the money supply curve is vertical?",
            options: [
              "The quantity of money supplied by the central bank is fixed at a given point in time and does not change based on the interest rate.",
              "The money supply can only be changed by an act of Congress.",
              "The interest rate is determined by the supply of money, but the supply of money is not determined by the interest rate.",
              "As the interest rate increases, the opportunity cost of holding money decreases, leading to a constant supply."
            ],
            correctAnswer: 0,
            explanation: "The money supply is determined by the central bank's policies, not by the prevailing market interest rate. Because the quantity is set by the central bank at a specific level, it is represented as a vertical line, perfectly inelastic with respect to the nominal interest rate."
          }
        ]
          
      },
      {
        id: "45",
        title: "Demand",
        description: "Learn about the law of demand, demand curves, and demand schedules.",
        videoSlug: "micro-demand-law-curves-schedules",
        subjects: ["AP Microeconomics"],
        unit: "2",
        lessonIDS: ["2.1"],
        tags: ["Demand", "Law of Demand"],
        videoUrl: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/ap_micro/2.1.mp4",
        accessLevel: "free",
        questions: [],
      },
      {
        id: "46",
        title: "Price Elasticity of Demand",
        description: "Learn about price elasticity of demand, how to calculate it, and factors that affect elasticity.",
        videoSlug: "micro-price-elasticity-of-demand",
        subjects: ["AP Microeconomics"],
        unit: "2",
        lessonIDS: ["2.3"],
        tags: ["Price Elasticity of Demand", "Elasticity"],
        videoUrl: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/ap_micro/2.3.mp4",
        accessLevel: "free",
        questions: [],
      },
      {
        id: "47",
        title: "Other Elasticities",
        description: "Learn about income elasticity, cross-price elasticity, and other measures of elasticity.",
        videoSlug: "micro-other-elasticities",
        subjects: ["AP Microeconomics"],
        unit: "2",
        lessonIDS: ["2.5"],
        tags: ["Elasticity", "Income Elasticity", "Cross-Price Elasticity"],
        videoUrl: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/ap_micro/2.5.mp4",
        accessLevel: "free",
        questions: [],
      },
      {
        id: "41",
        title: "Market Equilibrium and Consumer and Producer Surplus",
        description: "Learn about market equilibrium, consumer surplus, and producer surplus.",
        videoSlug: "micro-market-equilibrium-surplus",
        subjects: ["AP Microeconomics"],
        unit: "2",
        lessonIDS: ["2.6"],
        tags: ["Market Equilibrium", "Consumer Surplus", "Producer Surplus"],
        videoUrl: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/ap_micro/2.6.mp4",
        accessLevel: "free",
        questions: [],
      },
      {
        id: "42",
        title: "Market Disequilibrium and Changes in Equilibrium",
        description: "Learn about market disequilibrium, shortages, surpluses, and how shifts in supply and demand change equilibrium.",
        videoSlug: "micro-market-disequilibrium-changes-equilibrium",
        subjects: ["AP Microeconomics"],
        unit: "2",
        lessonIDS: ["2.7"],
        tags: ["Market Disequilibrium", "Changes in Equilibrium", "Shortage", "Surplus"],
        videoUrl: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/ap_micro/2.7.mp4",
        accessLevel: "free",
        questions: [],
      },
      {
        id: "43",
        title: "The Effects of Government Intervention in Markets",
        description: "Learn how government policies such as price controls and taxes affect markets.",
        videoSlug: "micro-government-intervention-markets",
        subjects: ["AP Microeconomics"],
        unit: "2",
        lessonIDS: ["2.8"],
        tags: ["Government Intervention", "Price Controls", "Taxes"],
        videoUrl: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/ap_micro/2.8.mp4",
        accessLevel: "free",
        questions: [],
      },
      {
        id: "44",
        title: "International Trade and Public Policy",
        description: "Learn about international trade, tariffs, and the effects of public policy on markets.",
        videoSlug: "micro-international-trade-public-policy",
        subjects: ["AP Microeconomics"],
        unit: "2",
        lessonIDS: ["2.9"],
        tags: ["International Trade", "Tariffs", "Public Policy"],
        videoUrl: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/ap_micro/2.9.mp4",
        accessLevel: "free",
        questions: [],
      },
      {
        id: "48",
        title: "The Production Function",
        description: "Learn about the production function, marginal product, and diminishing marginal returns.",
        videoSlug: "micro-production-function",
        subjects: ["AP Microeconomics"],
        unit: "3",
        lessonIDS: ["3.1"],
        tags: ["Production Function", "Marginal Product", "Diminishing Returns"],
        videoUrl: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/ap_micro/3.1.mp4",
        accessLevel: "free",
        questions: [],
      },
      {
        id: "49",
        title: "Long-Run Production Costs",
        description: "Learn about long-run production costs, economies of scale, and diseconomies of scale.",
        videoSlug: "micro-long-run-production-costs",
        subjects: ["AP Microeconomics"],
        unit: "3",
        lessonIDS: ["3.3"],
        tags: ["Long-Run Production Costs", "Economies of Scale"],
        videoUrl: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/ap_micro/3.3.mp4",
        accessLevel: "free",
        questions: [],
      },
      {
        id: "50",
        title: "Types of Profit",
        description: "Learn about accounting profit, economic profit, and the difference between explicit and implicit costs.",
        videoSlug: "micro-types-of-profit",
        subjects: ["AP Microeconomics"],
        unit: "3",
        lessonIDS: ["3.4"],
        tags: ["Profit", "Accounting Profit", "Economic Profit"],
        videoUrl: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/ap_micro/3.4.mp4",
        accessLevel: "free",
        questions: [],
      },
      {
        id: "51",
        title: "Profit Maximization",
        description: "Learn how firms maximize profit by producing where marginal revenue equals marginal cost.",
        videoSlug: "micro-profit-maximization",
        subjects: ["AP Microeconomics"],
        unit: "3",
        lessonIDS: ["3.5"],
        tags: ["Profit Maximization", "Marginal Revenue", "Marginal Cost"],
        videoUrl: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/ap_micro/3.5.mp4",
        accessLevel: "free",
        questions: [],
      },
      {
        id: "52",
        title: "Firms' Short-Run Decisions to Produce and Long-Run Decisions to Enter or Exit a Market",
        description: "Learn when firms produce in the short run, shut down, enter a market, or exit a market in the long run.",
        videoSlug: "micro-firm-short-run-long-run-decisions",
        subjects: ["AP Microeconomics"],
        unit: "3",
        lessonIDS: ["3.6"],
        tags: ["Shut Down Rule", "Entry", "Exit", "Short Run", "Long Run"],
        videoUrl: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/ap_micro/3.6.mp4",
        accessLevel: "free",
        questions: [],
      },
      {
        id: "53",
        title: "Perfect Competition",
        description: "Learn about perfectly competitive markets, price-taking firms, and long-run equilibrium.",
        videoSlug: "micro-perfect-competition",
        subjects: ["AP Microeconomics"],
        unit: "3",
        lessonIDS: ["3.7"],
        tags: ["Perfect Competition", "Price Taker", "Long-Run Equilibrium"],
        videoUrl: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/ap_micro/3.7.mp4",
        accessLevel: "free",
        questions: [],
      },
      {
        id: "54",
        title: "Monopoly",
        description: "Learn about monopoly markets, barriers to entry, and profit maximization for a monopolist.",
        videoSlug: "micro-monopoly",
        subjects: ["AP Microeconomics"],
        unit: "4",
        lessonIDS: ["4.2"],
        tags: ["Monopoly", "Barriers to Entry", "Profit Maximization"],
        videoUrl: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/ap_micro/4.2.mp4",
        accessLevel: "free",
        questions: [],
      },
      {
        id: "55",
        title: "Price Discrimination",
        description: "Learn about price discrimination, conditions required for it, and its effects on consumer and producer surplus.",
        videoSlug: "micro-price-discrimination",
        subjects: ["AP Microeconomics"],
        unit: "4",
        lessonIDS: ["4.3"],
        tags: ["Price Discrimination", "Consumer Surplus", "Producer Surplus"],
        videoUrl: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/ap_micro/4.3.mp4",
        accessLevel: "free",
        questions: [],
      },
      {
        id: "56",
        title: "Monopolistic Competition",
        description: "Learn about monopolistically competitive markets, product differentiation, and long-run equilibrium.",
        videoSlug: "micro-monopolistic-competition",
        subjects: ["AP Microeconomics"],
        unit: "4",
        lessonIDS: ["4.4"],
        tags: ["Monopolistic Competition", "Product Differentiation", "Long-Run Equilibrium"],
        videoUrl: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/ap_micro/4.4.mp4",
        accessLevel: "free",
        questions: [],
      },
      {
        id: "57",
        title: "Oligopoly and Game Theory",
        description: "Learn about oligopoly, interdependence between firms, and game theory strategies.",
        videoSlug: "micro-oligopoly-game-theory",
        subjects: ["AP Microeconomics"],
        unit: "4",
        lessonIDS: ["4.5"],
        tags: ["Oligopoly", "Game Theory", "Interdependence"],
        videoUrl: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/ap_micro/4.5.mp4",
        accessLevel: "free",
        questions: [],
      },
      {
        id: "58",
        title: "Introduction to Factor Markets",
        description: "Learn about factor markets, derived demand, and how firms hire resources.",
        videoSlug: "micro-introduction-factor-markets",
        subjects: ["AP Microeconomics"],
        unit: "5",
        lessonIDS: ["5.1"],
        tags: ["Factor Markets", "Derived Demand", "Labor"],
        videoUrl: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/ap_micro/5.1.mp4",
        accessLevel: "free",
        questions: [],
      },
      {
        id: "59",
        title: "Profit-Maximizing Behavior in Perfectly Competitive Factor Markets",
        description: "Learn how firms hire labor and other resources in perfectly competitive factor markets to maximize profit.",
        videoSlug: "micro-profit-maximizing-factor-markets",
        subjects: ["AP Microeconomics"],
        unit: "5",
        lessonIDS: ["5.3"],
        tags: ["Factor Markets", "Marginal Revenue Product", "Profit Maximization"],
        videoUrl: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/ap_micro/5.3.mp4",
        accessLevel: "free",
        questions: [],
      },
      {
        id: "60",
        title: "Monopsonistic Markets",
        description: "Learn about monopsony, wage determination, and inefficiency in labor markets with a single buyer.",
        videoSlug: "micro-monopsonistic-markets",
        subjects: ["AP Microeconomics"],
        unit: "5",
        lessonIDS: ["5.4"],
        tags: ["Monopsony", "Factor Markets", "Wages"],
        videoUrl: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/ap_micro/5.4.mp4",
        accessLevel: "free",
        questions: [],
      },
      {
        id: "61",
        title: "Socially Efficient and Inefficient Market Outcomes",
        description: "Learn about socially efficient outcomes, deadweight loss, and when markets fail to allocate resources efficiently.",
        videoSlug: "micro-socially-efficient-market-outcomes",
        subjects: ["AP Microeconomics"],
        unit: "6",
        lessonIDS: ["6.1"],
        tags: ["Market Efficiency", "Deadweight Loss", "Allocative Efficiency"],
        videoUrl: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/ap_micro/6.1.mp4",
        accessLevel: "free",
        questions: [],
      },
      {
        id: "62",
        title: "Externalities",
        description: "Learn about positive and negative externalities, marginal social benefit and cost, and corrective policies.",
        videoSlug: "micro-externalities",
        subjects: ["AP Microeconomics"],
        unit: "6",
        lessonIDS: ["6.2"],
        tags: ["Externalities", "Spillover Benefits", "Spillover Costs"],
        videoUrl: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/ap_micro/6.2.mp4",
        accessLevel: "free",
        questions: [],
      },
      {
        id: "63",
        title: "Public and Private Goods",
        description: "Learn the characteristics of public and private goods, free riders, and why markets underprovide public goods.",
        videoSlug: "micro-public-private-goods",
        subjects: ["AP Microeconomics"],
        unit: "6",
        lessonIDS: ["6.3"],
        tags: ["Public Goods", "Private Goods", "Free Rider Problem"],
        videoUrl: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/ap_micro/6.3.mp4",
        accessLevel: "free",
        questions: [],
      },
      {
        id: "64",
        title: "The Effects of Government Intervention in Different Market Structures",
        description: "Learn how taxes, subsidies, and regulation affect outcomes in different market structures.",
        videoSlug: "micro-government-intervention-market-structures",
        subjects: ["AP Microeconomics"],
        unit: "6",
        lessonIDS: ["6.4"],
        tags: ["Government Intervention", "Taxes", "Subsidies", "Regulation"],
        videoUrl: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/ap_micro/6.4.mp4",
        accessLevel: "free",
        questions: [],
      },
      {
        id: "65",
        title: "Inequality",
        description: "Learn about income inequality, the Lorenz curve, and policies that address distributional outcomes.",
        videoSlug: "micro-inequality",
        subjects: ["AP Microeconomics"],
        unit: "6",
        lessonIDS: ["6.5"],
        tags: ["Inequality", "Lorenz Curve", "Income Distribution"],
        videoUrl: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/ap_micro/6.5.mp4",
        accessLevel: "free",
        questions: [],
      },
      {
        id: "stats-u1-vid1",
        title: "1.6 & 1.9 - Describing and Comparing Distributions",
        description:
          "Learn how to describe one quantitative variable distributions and compare distributions across groups.",
        videoSlug: "stats-u1-describing-comparing-distributions",
        subjects: ["AP Statistics"],
        unit: "1",
        lessonIDS: ["1.6", "1.9"],
        tags: ["Distributions", "Unit 1", "Describing Data", "Comparing Distributions"],
        videoUrl:
          "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/stats/unit_1/stats_u1_vid1.mp4",
        accessLevel: "free",
        questions: [],
      },
      {
        id: "stats-u1-vid2",
        title: "1.11 - Random Sampling",
        description:
          "Learn how to design and use random sampling methods to select representative samples.",
        videoSlug: "stats-u1-random-sampling",
        subjects: ["AP Statistics"],
        unit: "1",
        lessonIDS: ["1.11"],
        tags: ["Random Sampling", "Unit 1", "Study Design"],
        videoUrl:
          "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/stats/unit_1/stats_u1_topic_1.11.mp4",
        accessLevel: "free",
        questions: [],
      },
      {
        id: "stats-u2-vid1",
        title: "2.2–2.6 - Two-Way Tables, Simulation & Probability",
        description:
          "Covers summary statistics for two categorical variables, simulation, introduction to probability, mutually exclusive events, and conditional probability.",
        videoSlug: "stats-u2-two-way-tables-through-conditional-probability",
        subjects: ["AP Statistics"],
        unit: "2",
        lessonIDS: ["2.2", "2.3", "2.4", "2.5", "2.6"],
        tags: ["Probability", "Unit 2", "Two-Way Tables", "Conditional Probability"],
        videoUrl:
          "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/stats/unit_2/stats_u2_topic_2.2_2.6.mp4",
        accessLevel: "free",
        questions: [],
      },
      {
        id: "stats-u2-vid2",
        title: "2.11 - The Normal Distribution",
        description:
          "Learn the properties of the normal distribution and how to use it in probability calculations.",
        videoSlug: "stats-u2-normal-distribution",
        subjects: ["AP Statistics"],
        unit: "2",
        lessonIDS: ["2.11"],
        tags: ["Normal Distribution", "Unit 2", "Probability Distributions"],
        videoUrl:
          "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/stats/unit_2/stats_u2_topic_2.11.mp4",
        accessLevel: "free",
        questions: [],
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
  