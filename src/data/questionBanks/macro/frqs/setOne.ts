import macroSetOneFRQ2 from '../../../../../public/images/macroSetOneFRQ2.png';
import macroSetOneFRQA1A from '../../../../../public/images/macroSetOneFRQA1A.png';
import macroSetOneFRQA1E from '../../../../../public/images/macroSetOneFRQA1E.png';
import macroSetOneFRQA3CI from '../../../../../public/images/macroSetOneFRQA3CI.png';
import macroSetOneFRQA3CII from '../../../../../public/images/macroSetOneFRQA3CII.png';


export const frqSetOneQuestions = {
  examTitle: "AP Macroeconomics FRQ Exam 1",
    questions: [
      {
        questionNumber: 1,
        prompt: "Assume that Japan is in a recession and the government has a balanced budget.",
        image: null,
        parts: [
          {
            label: "A",
            text: "Draw a single correctly labeled AD-AS graph for Japan and label the current equilibrium output as Y* and the current price level PL*",
            answerType: "draw",
            answer: macroSetOneFRQA1A,
            subparts: [
              {
                label: "i",
                text: "Is the actual unemployment rate in Japan higher than, lower than, or equal to the natural rate of unemployment?", 
                answerType: "text",
                answer: "The actual unemployment rate in Japan is higher than the natural rate of unemployment.",
              },
              {
                label: "ii",
                text: "If no discretionary fiscal policy action is taken, will the government budget remain balanced, move into surplus, or move into deficit? Explain.",
                answerType: "text",
                answer: "The government budget will move into deficit. Even without any discretionary fiscal policy action, automatic stabilizers will cause the government budget to move into deficit. These automatic stabilizers include increased spending on unemployment benefits and other social programs, as well as decreased tax revenue due to lower income levels.",
              }
            ]
          },
          {
            label: "B",
            text: "Assume the banking system has ample reserves. Identify one monetary policy action that the central bank could use to close the output gap.",
            answerType: "text",
            answer: "Potential answers include: lowering the policy rate, lowering the interest on reserves rate, or engaging in open market operations to purchase government bonds.",
          },
          {
            label: "C",
            text: "What impact will the monetary policy action in part B) have on the nominal interest rate in the country?",
            answerType: "text",
            answer: "The nominal interest rate will decrease.",
          },
          {
            label: "D",
            text: "Assuming the monetary policy action causes inflation, what will happen to the real interest rate in the country?",
            answerType: "text",
            answer: "The real interest rate will decrease. RIR = NIR - inflation rate. The central bank's policy action will cause the nominal interest rate to decrease. Assuming that the inflation rate increases, real interest rates will decrease.",
          },
          {
            label: "E",
            text: "Based on the change in real interest rates from part D), show the change that will occur in the foreign exchange market for the Japanese Yen.",
            answerType: "draw",
            answer: macroSetOneFRQA1E,
          }
        ]
      },
      {
        questionNumber: 2,
        prompt: "The data provided in the tables below are from two countries, Omegaland and Deltaville.",
        image: macroSetOneFRQ2,
        parts: [
          {
            label: "A",
            text: "Calculate each of the following for Year 2. Show your work.", 
            answerType: null,
            subparts: [
              {
                label: "i",
                text: "Real GDP for Omegaland",
                answerType: "text",
                answer: "$1,200. Explanation: Real GDP = (nominal GDP / GDP deflator) * 100.",
              },
              {
                label: "ii",
                text: "Real GDP for Deltaville",
                answerType: "text",
                answer: "$2,095. Explanation: Real GDP = (nominal GDP / GDP deflator) * 100.",
              }
            ]
          },
          {
            label: "B",
            text: "Calculate each of the following for Year 2. Show your work.",
            answerType: null,
            subparts: [
              {
                label: "i",
                text: "The inflation rate in Omegaland",
                answerType: "text",
                answer: "10%. Explanation: Inflation rate = ((GDP deflator in Year 2 - GDP deflator in Year 1) / GDP deflator in Year 1) * 100.",
              },
              {
                label: "ii",
                text: "The inflation rate in Deltaville",
                answerType: "text",
                answer: "5%. Explanation: Inflation rate = ((GDP deflator in Year 2 - GDP deflator in Year 1) / GDP deflator in Year 1) * 100.",
              }
            ]
          },
          {
            label: "C",
            text: "If the nominal interest rate in Year 2 was 14% in Omegaland and 8% in Deltaville, which country had the higher real interest rate? Explain.",
            answerType: "text",
            answer: "Omegaland had the higher real interest rate. Explanation: RIR = NIR - inflation rate. Omegaland's RIR = 14% - 10% = 4%, while Deltaville's real interest rate = 8% - 5% = 3%.",
      },{
        label: "D",
        text: "If nominal wages in Omegaland increased by 5% from Year 1 to Year 2, did real wages in Omegaland increase, decrease, or stay the same? Explain.",
        answerType: "text",
        answer: "Real wages in Omegaland decreased. Explanation: Real wages = nominal wages - inflation rate. Nominal wages increased by 5%, but the inflation rate was 10%, so real wages decreased.",
  }]
    },
      
      {
        questionNumber: 3,
        prompt: "Assume that the banking system has limited reserves at that banks must hold a minimum of 10% of their deposits as reserves. Now suppose that the country’s central bank purchases $5 billion worth of government bonds from commercial banks.",
        image: null,
        parts: [
          {
            label: "A",
            text: "Calculate the maximum potential change to the money supply as a result of this central bank bond purchase and state the direction of the change. Show your work.",
            answerType: "text",
            answer: "The money supply will increase by $50 billion. Explanation: The money multiplier is (1 / required reserve ratio). The required reserve ratio is 10%, so the money multiplier is 1 / 0.1 = 10. The maximum potential change to the money supply = Money Multiplier x Initial Change to Reserves. In this example, the formula looks like this: Maximum Potential Change to Money Supply = 10 x $5 billion = $50 billion.",
          },
          {
            label: "B",
            text: "State whether each of the following variables will increase, decrease, or remain unchanged. ",
            answerType: null,
            subparts: [
              {
                label: "i",
                text: "Nominal interest rates",
                answerType: "text",
                answer: "Nominal interest rates will decrease.",
              },
              {
                label: "ii",
                text: "Price level",
                answerType: "text",
                answer: "Price level will increase.",
              },
              {
                label: "iii",
                text: "Real GDP",
                answerType: "text",
                answer: "Real GDP will increase.",
              },
              {
                label: "iv",
                text: "Unemployment rate",
                answerType: "text",
                answer: "Unemployment rate will decrease.",
              }
            ]
          }, 
          {
            label: "C",
            text: "Assume that the economy was in a recessionary gap prior to the central bank policy and that the central bank policy leads the economy back to long-run equilibrium.",
            answerType: null,
            subparts: [
              {
                label: "i",
                text: "Draw a single correctly labeled graph of both the short-run Phillips curve and the long-run Phillips curve. Label the short-run equilibrium prior to the central bank’s policy action as Point X.",
                  answerType: "draw",
                  answer: macroSetOneFRQA3CI,
              },
              {
                label: "ii",
                text: "Add a point, Y, to the graph above that represents the country’s short-run equilibrium after the central bank’s policy action.",
                answerType: null,
                answer: macroSetOneFRQA3CII,
              }
            ]
          }
        ]
      }
    ]
  };
  