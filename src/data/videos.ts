export type Question = {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
}

export type Video = {
  id: string;
  title: string;
  description: string;
  subject: string;
  unit: string;
  videoUrl: string;
  thumbnail?: string;
  tags: string[];
  accessLevel: "free" | "premium";
  questions: Question[];
}

export const videos: Video[] = [
    {
      id: "1",
      title: "Fiscal Policy & Long-Run Self-Adjustment",
      description: "Learn about how an economy returns to long-run equilibrium from an output gap.",
      subject: "AP Macroeconomics",
      unit: "3",
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
      subject: "AP Macroeconomics",
      unit: "4",
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
        subject: "AP Macroeconomics", 
        unit: "6",
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
        subject: "AP Macroeconomics", 
        unit: "5",
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
        subject: "AP Macroeconomics", 
        unit: "6",
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
        subject: "AP Macroeconomics", 
        unit: "5",
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
        subject: "AP Macroeconomics", 
        unit: "5",
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
      }
  ];
  