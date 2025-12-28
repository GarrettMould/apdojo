export interface Review {
  text: string;
  author: string;
  lessonCount?: number; // For old tutoring reviews
  badge?: string; // For new platform reviews (e.g., "Parent", "Student")
  title?: string;
}

// Old tutoring session reviews (kept for backward compatibility)
export const tutoringReviews: Review[] = [
  {
    text: "Garrett accomplished a lot with our son in 2 hours whose regular teacher really does not provide examples. Our son found him very helpful to explain the material better. Highly recommend!",
    author: "Allison",
    lessonCount: 10,
    title: "Wonderful!"
  },
  {
    text: "My kid was doing AP Macro online at school and felt some difficulty with some of the content. We find Garrett really professional and helpful; he always prepares well for the lesson and explains the content easily. I really like his teaching style—not only teaching but also including some AP past exam practice during lectures. My daughter really enjoys her lessons with Garrett. We already talked about making a schedule for my kid's AP Micro lesson with Garrett for the coming fall. Highly recommended.",
    author: "I-Wen",
    lessonCount: 15,
    title: "AP Macro exam preparation"
  },
  {
    text: "Garrett comes really well prepared for tutoring session. He helped my son with AP Economics. He has good knowledge of the material and is able to communicate very well.",
    author: "Siddharth",
    lessonCount: 3,
    title: "Good with content and tutoring skills"
  },
  {
    text: "Garrett is teaching me AP Macroeconomics and is very thorough with the topic. He knows AP curriculum very well and has a method to help one prepare for the AP Test.",
    author: "Shashi",
    lessonCount: 26,
    title: "Very knowledgeable teacher and has a very strong grasp on the AP Macro curriculum"
  },
  {
    text: "Garrett is working with my son on the AP Macroeconomics class. They had few sessions at the end of the year and now plan to work through the spring semester. My son likes working with Garrett. He receives help he needs!",
    author: "Margarita",
    lessonCount: 12,
    title: "Very knowledgeable and engaging tutor"
  },
  {
    text: "Garrett is a very knowledgeable and patient tutor. He always comes to the sessions very well prepared. He is very flexible and tries to accommodate my daughter's schedule. With his help my daughter got a A for AP Macro. I highly recommend Garrett！",
    author: "Jen",
    lessonCount: 7,
    title: "Knowledgeable tutor"
  },
  {
    text: "My daughter struggled with understanding supply and demand curves in AP Micro. Garrett broke down the concepts in a way that finally made sense to her. He uses real-world examples that help her connect the theory to practice. Her confidence has improved significantly, and she's now doing much better on her tests. Garrett is patient, clear, and really knows how to teach economics.",
    author: "Priyanka S.",
    lessonCount: 8,
    title: "Excellent at breaking down complex concepts"
  },
  {
    text: "We started working with Garrett for AP Macro exam prep about 6 weeks before the test. He created a structured study plan and covered all the key topics systematically. My son went from being nervous about the exam to feeling confident. Garrett's practice problems and explanations were exactly what he needed. Highly recommend for anyone preparing for the AP exam!",
    author: "Alina SD.",
    lessonCount: 9,
    title: "Great exam preparation"
  },
  {
    text: "Garrett has been tutoring my son in both AP Macro and AP Micro this year. What I appreciate most is how he adapts his teaching to my son's learning style. He's patient when needed and challenges him when appropriate. My son's grades have improved from a B- to an A-, and more importantly, he actually understands the material now.",
    author: "Sunita R.",
    lessonCount: 18,
    title: "Adaptive teaching style"
  },
  {
    text: "I was really struggling with the AD-AS model and fiscal policy in AP Macro. Garrett explained it step by step and used diagrams that finally clicked for me. He's very organized and always prepared with practice questions. After just a few sessions, I felt much more confident. Garrett is definitely the best tutor I've worked with!",
    author: "Meldev",
    lessonCount: 5,
    title: "Helped me understand difficult topics"
  },
  {
    text: "Garrett has been working with my daughter on AP Microeconomics for the past semester. She was initially overwhelmed by all the graphs and concepts, but Garrett has a way of making everything clear and manageable. He's very responsive to questions and always follows up to make sure she understands. Her teacher has noticed a significant improvement in her work.",
    author: "Li Chen",
    lessonCount: 14,
    title: "Clear explanations and great follow-up"
  },
  {
    text: "We found Garrett through a recommendation and couldn't be happier. He's been helping my son with AP Macro, focusing on the areas where he was struggling most. Garrett is professional, punctual, and really knows the AP curriculum inside and out. My son's test scores have improved dramatically, and he's actually enjoying economics now!",
    author: "Rohit.",
    lessonCount: 11,
    title: "Professional and effective"
  },
  {
    text: "Garrett helped me prepare for my AP Micro exam, and I couldn't have done it without him. He covered all the units thoroughly and gave me great strategies for the exam. His explanations of market structures and externalities were particularly helpful. I ended up getting a 5 on the exam! I'm so grateful for his help.",
    author: "Michelle.",
    lessonCount: 13,
    title: "Achieved a 5 on the AP exam!"
  },
  {
    text: "My son was falling behind in AP Macro and we were worried he might not pass. Garrett came in and turned things around completely. He's very patient and explains things in multiple ways until my son understands. Garrett also helped him with study strategies and time management. My son passed the class and is now much more confident. We're planning to continue with AP Micro next year!",
    author: "Kristal.",
    lessonCount: 16,
    title: "Turned things around completely"
  },
  {
    text: "Garrett is an outstanding tutor. He's been working with my daughter on AP Micro, and she's gone from struggling to excelling. What sets him apart is how well he prepares for each session and how he connects the concepts to real-world applications. My daughter says his explanations are the clearest she's heard. Highly recommend!",
    author: "Kim Y.",
    lessonCount: 10,
    title: "Outstanding tutor"
  }
];

// New platform reviews for season pass product page
export const reviews: Review[] = [
  {
    text: "My son learned more on AP Dojo in 2 hours than he did in weeks of regular class. His teacher doesn't provide enough examples, but this platform explains the material perfectly. It's concise, clear, and actually helpful.",
    author: "Allison",
    badge: "Parent",
    title: "Better than his regular teacher"
  },
  {
    text: "My kid was struggling with her online AP Macro class. AP Dojo was the perfect supplement—the lessons are professional, concise, and focused purely on the exam. I love that many of the hardest questions came with video explanations.",
    author: "I-Wen",
    badge: "Parent",
    title: "Perfect supplement to school"
  },
  {
    text: "The step-by-step simulations made the AD-AS diagrams actually make sense. The platform is super organized, and having practice questions right next to the graphs is a game-changer. Definitely the best resource I've found.",
    author: "Meldev",
    badge: "Student",
    title: "Finally understand the graphs"
  },
  {
    text: "I couldn't have prepped for AP Micro without this site. It covered every unit thoroughly, and the exam strategies were spot on. The explanations for market structures were particularly helpful. I ended up getting a 5 on the exam!",
    author: "Michelle",
    badge: "Student (Score: 5)",
    title: "Achieved a 5 on the exam!"
  },
  {
    text: "My daughter struggled with supply and demand curves, but AP Dojo's interactive graphs finally made it click. Being able to actually move the lines and see the shifts in real-time helped her connect theory to practice.",
    author: "Priyanka S.",
    badge: "Parent",
    title: "Interactive graphs are amazing"
  },
  {
    text: "We bought the Season Pass about 6 weeks before the AP exam. The structured 'Belt System' was exactly what my son needed—it covers all the key topics systematically without wasting time. He went from nervous to confident.",
    author: "Alina SD.",
    badge: "Parent",
    title: "Great for last-minute prep"
  },
  {
    text: "My son was falling behind in Macro and we were worried he wouldn't pass. AP Dojo turned things around completely. The platform explains concepts in multiple ways—video, text, and graph—until it clicks.",
    author: "Kristal",
    badge: "Parent",
    title: "Turned things around completely"
  },
  {
    text: "An outstanding resource. My daughter has gone from struggling to excelling in AP Micro. What sets AP Dojo apart is how well-structured the modules are. She says the explanations are clearer than her textbook.",
    author: "Kim Y.",
    badge: "Parent",
    title: "Clearer than the textbook"
  },
  {
    text: "My daughter was initially overwhelmed by all the graphs, but AP Dojo has a way of making everything clear. The 'Concept Checks' after every video ensure she actually gets it before moving on. Her teacher has noticed a huge improvement.",
    author: "Li Chen",
    badge: "Parent",
    title: "Great follow-up and structure"
  },
  {
    text: "I was struggling with fiscal policy, but AP Dojo explained it step-by-step. The diagrams finally clicked for me. It's very organized and always prepared with practice questions. After just a few modules, I felt much more confident.",
    author: "Jen",
    badge: "Student",
    title: "Confidence improved significantly"
  }
]; 