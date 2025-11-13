export interface Review {
  text: string;
  author: string;
  lessonCount: number;
  title?: string;
}

export const reviews: Review[] = [
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
  }
]; 