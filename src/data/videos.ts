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
      accessLevel: "premium",
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
      thumbnail: "https://apdojovideos.s3.ap-southeast-2.amazonaws.com/Whiteboard+1.jpg",
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
      }
  ];
  