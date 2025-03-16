import microSetOneFRQ1 from '../../../../../public/images/microSetOneFRQ1.png';
import microSetOneFRQ1A2A from '../../../../../public/images/microSetOneFRQ1A2A.png';
import microSetOneFRQ1A3A from '../../../../../public/images/microSetOneFRQ1A3A.png';

export const frqSetOneQuestions = {
  examTitle: "AP Microeconomics FRQ Exam 1",
    questions: [
      {
        questionNumber: 1,
        prompt: "The table below shows the estimated total costs and benefits of opening additional locations for Sammy's Subs, a franchise sandwich shop.",
        image: microSetOneFRQ1,
        parts: [
          {
            label: "A",
            text: "Calculate the total net benefit of opening a fourth location. Show your work.",
            answerType: "text",
            answer: "$45,000. Total Net Benefit = Total Benefits – Total Costs = $140,000 – $95,000.",
            
          },
          {
            label: "B",
            text: "Calculate the marginal benefit of opening a fifth location. Show your work.",
            answerType: "text",
            answer: "$10,000. Marginal Benefit = TB at 5th location – TB at 4th location = $150,000 – $140,000",
          },
          {
            label: "C",
            text: "Should Sammy's Subs open a third location? Explain.",
            answerType: "text",
            answer: "Yes, because the marginal benefit ($30,000) is greater than the marginal cost ($20,000), meaning the company would gain from opening the third location.",
          },
          {
            label: "D",
            text: "What is the optimal number of additional locations for Sammy's Subs to open? Explain your answer using marginal analysis.",
            answerType: "text",
            answer: "The optimal number of locations is 4, because at this point, MB = MC ($20,000). A firm should continue expanding until MB = MC to maximize net benefit. As long as MB > MC, the firm should expand. Once MC > MB, the costs outweigh the benefits and the firm should stop expanding.",
          },
          {
            label: "E",
            text: "Suppose that the government proposes a new law that would impose a $1,000 tax on food shops in the area. Assuming the total benefits remain constant, will the optimal number of locations increase, decrease, or remain the same?",
            answerType: "text",
            answer: "The optimal number of locations will decrease from 4 to 3. The tax will increase the marginal cost of each location by $1,000, so for the 4th location, MC > MB. Therefore, the firm should stop after the 3rd location, while MB is still greater than MC.",
          }
        ]
      },
      {
        questionNumber: 2,
        prompt: "Ahmad Co. is a typical firm that produces agricultural products in a perfectly competitive market. The firm is currently in short-run equilibrium earning negative economic profit.",
        parts: [
          {
            label: "A",
            text: "Draw the short-run production cost curves for Ahmad Co. in its current equilibrium. Clearly label the firm's marginal cost (MC), average total cost (ATC), and marginal revenue (MR). Indicate the firm's loss on the graph.", 
            answerType: "draw",
            answer: microSetOneFRQ1A2A,
          },
          {
            label: "B",
            text: "Can Ahmad Co. raise the price of the good it is selling to increase profits? Explain.",
            answerType: "text",
            answer: "No, because Ahmad Co. is a price taker in a perfectly competitive market. If a single firm in a perfectly competitive market raises their price, consumers will stop buying from them. Ahmad Co. has no power to raise the price of their good.",
          },
          {
            label: "C",
            text: "If all firms in the market are currently earning similar economic losses, explain the change that will take place in the market and what impact this will have on Ahmad Co.'s marginal revenue.",
            answerType: "text",
            answer: "In the long-run, some firms will exit the market, causing the market supply curve to shift leftward. This will lead to a higher equilibrium price in the market and a higher marginal revenue for Ahmad Co.",
      },
      {
        label: "D",
        text: "Assume the government introduces a per-unit subsidy for firms producing agricultural products. State whether each of the following will increase, decrease, or remain the same.",
        answerType: null,
            subparts: [
              {
                label: "i",
                text: "Marginal costs",
                answerType: "text",
                answer: "Decrease",
              },
              {
                label: "ii",
                text: "Average total costs",
                answerType: "text",
                answer: "Decrease",
              },
              {
                label: "iii",
                text: "Marginal revenue",
                answerType: "text",
                answer: "Remain the same",
              }
            ]
      }
  ]
    },
      
      {
        questionNumber: 3,
        prompt: "Assume that Summit Peaks Ski Resort is the only major employer of ski instructors in a remote mountain town, making it a monopsony in the labor market for ski instructors.",
        parts: [
          {
            label: "A",
            text: "Using a correctly labeled graph of the labor market for ski instructors at Summit Peaks, draw and label the firm's marginal factor cost (MFC) curve, the labor supply curve, and the firm's demand curve for labor. Indicate the quantity of labor hired and the wage paid in monopsony equilibrium.",
            answerType: "draw",
            answer: microSetOneFRQ1A3A,
          },
          {
            label: "B",
            text: "Explain why the marginal factor cost (MFC) curve lies above the labor supply curve for Summit Peaks.",
            answerType: "text",
            answer: "The MFC curve lies above the labor supply curve because the firm must pay a higher wage to attract more labor. When the firm hires an additional worker at a higher wage rate, it must pay the other workers the same higher rate, meaning the MFC of one additional worker is the wage you must pay that additional worker, plus the additional wage you must pay to all the previous workers hired.",     }, 
          {
            label: "C",
            text: " Suppose that Summit Peaks Ski Resort experiences an increase in demand for ski lessons. Explain how this change in demand will impact each of the following.",
            answerType: null,
            subparts: [
              {
                label: "i",
                text: "The price of ski lessons",
                answerType: "text",
                answer: "The price of ski lessons will increase due to the increase in demand.",	
              },
              {
                label: "ii",
                text: "The marginal revenue product of labor",
                answerType: "text",
                answer: "The marginal revenue product of labor will increase because the increase in demand for ski lessons will lead to a higher price for ski lessons, which will increase the marginal revenue product of labor. MRP = MR * MP, so if MR increases, MRP will increase.",
              }
            ]
          },
          {
            label: "D",
            text: "Assume that the market for ski instructors becomes perfectly competitive instead of monopsonistic. What will happen to the equilibrium wage and quantity of labor hired? Explain.",
            answerType: "text",
            answer: "When the market for ski instructors becomes perfectly competitive, the equilibrium wage will increase, and the quantity of labor hired will also increase compared to the monopsony outcome. In a perfectly competitive labor market, there is more competition for labor, so the wage rate will increase, and the quantity of labor hired will increase.",
          }, 
        ]
      }
    ]
  };
  