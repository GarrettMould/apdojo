import type { Question } from '@/data/questionBanks/types';

/**
 * AP U.S. Government & Politics — Unit 1 **formal unit MCQ test** only (`/unit-mcq-test/1?subject=gov`, pretty URL).
 * IDs in 61xx range; practice pool uses 60xx in `govUnit1McqPractice.ts`.
 *
 * Passages / excerpts: excerpt first, then `\n\n`, then the stem (`ApGovQuestionText`).
 */
export const govUnit1McqTestQuestions: Question[] = [
  {
    id: 6101,
    subject: 'ap_us_government',
    unit: 1,
    lessonIDS: ['1.1'],
    unitName: 'Foundations of American Democracy',
    question:
      'Governments are instituted among Men, deriving their just powers from the consent of the governed... —Declaration of Independence\n\nThis quote most clearly embodies which of the following political principles?',
    image: null,
    options: ['Limited Government', 'Popular Sovereignty', 'Checks and Balances', 'Republicanism'],
    correctAnswer: 'B',
    explanation:
      'Popular sovereignty is the principle that the authority of a government is created and sustained by the consent of its people, as explicitly stated in the phrase "consent of the governed."',
  },
  {
    id: 6102,
    subject: 'ap_us_government',
    unit: 1,
    lessonIDS: ['1.2'],
    unitName: 'Foundations of American Democracy',
    question:
      'In Federalist No. 10, James Madison argues that the "mischiefs of faction" can be controlled by:',
    image: null,
    options: [
      'Removing the liberty of citizens to form interest groups.',
      'Creating a direct democracy where every citizen votes on every issue.',
      'A large republic that filters public views through elected representatives.',
      'Ensuring an equal distribution of property among all citizens.',
    ],
    correctAnswer: 'C',
    explanation:
      'Madison argues that a large republic makes it difficult for a unified majority faction to form and that representative government "refines" public views.',
  },
  {
    id: 6103,
    subject: 'ap_us_government',
    unit: 1,
    lessonIDS: ['1.3'],
    unitName: 'Foundations of American Democracy',
    question:
      'An Anti-Federalist would likely have viewed the "Supremacy Clause" in Article VI of the Constitution as:',
    image: null,
    options: [
      'A necessary tool to prevent states from ignoring federal laws.',
      'A dangerous grant of power that could lead to the elimination of state sovereignty.',
      'A safeguard for individual liberties through the Bill of Rights.',
      'A means to ensure that the executive branch remained subordinate to the legislature.',
    ],
    correctAnswer: 'B',
    explanation:
      'Anti-Federalists, as seen in Brutus No. 1, feared the Supremacy Clause would eventually grant the national government "absolute and uncontrollable power" over the states.',
  },
  {
    id: 6104,
    subject: 'ap_us_government',
    unit: 1,
    lessonIDS: ['1.4'],
    unitName: 'Foundations of American Democracy',
    question:
      'The small size of the several states, and the nature of their governments, would render them unfit for the national government. . . . The people of America have been taught by experience but not by theory, that the powers of the federal government are too limited. —Alexander Hamilton, 1780\n\nBased on the text, which of the following statements would the author most likely support?',
    image: null,
    options: [
      'The creation of a unicameral legislature where each state has one vote.',
      'The strengthening of the central government to address national concerns.',
      'The preservation of the Articles of Confederation with minor amendments.',
      'The expansion of reserved powers to ensure state sovereignty.',
    ],
    correctAnswer: 'B',
    explanation:
      'Hamilton argues federal powers are "too limited," reflecting the Federalist desire to replace the weak Articles of Confederation with a stronger central authority.',
  },
  {
    id: 6105,
    subject: 'ap_us_government',
    unit: 1,
    lessonIDS: ['1.5'],
    unitName: 'Foundations of American Democracy',
    question: 'Which of the following was a direct result of the "Great (Connecticut) Compromise"?',
    image: null,
    options: [
      'The establishment of a three-branch government.',
      'A bicameral legislature with different methods of representation in each house.',
      'The inclusion of a Bill of Rights to protect individual liberties.',
      'The agreement that enslaved persons would count as 60% of a person for representation.',
    ],
    correctAnswer: 'B',
    explanation:
      'The Great Compromise created a bicameral legislature with a population-based House and an equally representative Senate.',
  },
  {
    id: 6106,
    subject: 'ap_us_government',
    unit: 1,
    lessonIDS: ['1.6'],
    unitName: 'Foundations of American Democracy',
    question:
      'Ambition must be made to counteract ambition. The interest of the man must be connected with the constitutional rights of the place. —Federalist No. 51\n\nThis quote is describing which of the following principles?',
    image: null,
    options: ['Federalism', 'Popular Sovereignty', 'Separation of Powers and Checks and Balances', 'Judicial Activism'],
    correctAnswer: 'C',
    explanation:
      'Madison explains that by dividing power and giving each branch the "ambition" to protect its own area, the system naturally checks itself against tyranny.',
  },
  {
    id: 6107,
    subject: 'ap_us_government',
    unit: 1,
    lessonIDS: ['1.7'],
    unitName: 'Foundations of American Democracy',
    question:
      'Which of the following scenarios best illustrates the concept of a "concurrent power" under the U.S. Constitution?',
    image: null,
    options: [
      'The federal government negotiates a trade treaty with China while California passes a law regulating local businesses.',
      'The Internal Revenue Service (IRS) collects income taxes at the same time the state of Ohio collects a state sales tax.',
      'The President sends troops to a foreign conflict, and the Supreme Court rules on the constitutionality of a law.',
      'The state of Florida conducts a primary election while the federal government coins new currency.',
    ],
    correctAnswer: 'B',
    explanation:
      'Concurrent powers are those exercised by both levels of government. Both the federal and state governments have the power to tax.',
  },
  {
    id: 6108,
    subject: 'ap_us_government',
    unit: 1,
    lessonIDS: ['1.8'],
    unitName: 'Foundations of American Democracy',
    question:
      'The Congress shall have Power... To make all Laws which shall be necessary and proper for carrying into Execution the foregoing Powers... —Article I, Section 8, Clause 18\n\nWhich of the following Supreme Court cases most directly expanded federal power based on this clause?',
    image: null,
    options: [
      'United States v. Lopez (1995)',
      'McCulloch v. Maryland (1819)',
      'Marbury v. Madison (1803)',
      'Baker v. Carr (1962)',
    ],
    correctAnswer: 'B',
    explanation:
      'McCulloch v. Maryland established that the Necessary and Proper Clause allowed Congress to create a national bank to carry out its enumerated powers.',
  },
  {
    id: 6109,
    subject: 'ap_us_government',
    unit: 1,
    lessonIDS: ['1.2'],
    unitName: 'Foundations of American Democracy',
    question:
      'In so extensive a republic, the great officers of government would soon become above the control of the people... —Brutus No. 1\n\nWhich model of representative democracy is the author most concerned will dominate in a large republic?',
    image: null,
    options: ['Participatory democracy', 'Pluralist democracy', 'Elite democracy', 'Direct democracy'],
    correctAnswer: 'C',
    explanation:
      'Brutus argued that in a large territory, leaders would be detached from the people, leading to an elite class ruling for their own benefit.',
  },
  {
    id: 6110,
    subject: 'ap_us_government',
    unit: 1,
    lessonIDS: ['1.4'],
    unitName: 'Foundations of American Democracy',
    question:
      'Under the Articles of Confederation, the national government faced significant challenges in resolving trade disputes between states because:',
    image: null,
    options: [
      'The national judiciary frequently overrode state laws.',
      'The central government lacked the power to regulate interstate commerce.',
      'The executive branch used its veto power to block trade agreements.',
      'The Bill of Rights prevented federal interference in business.',
    ],
    correctAnswer: 'B',
    explanation:
      'The lack of power to regulate interstate commerce was a major weakness of the Articles, leading to "trade wars" and tariffs between states.',
  },
  {
    id: 6111,
    subject: 'ap_us_government',
    unit: 1,
    lessonIDS: ['1.5'],
    unitName: 'Foundations of American Democracy',
    question: 'Which of the following is the most common method for amending the U.S. Constitution?',
    image: null,
    options: [
      'Proposed by 2/3 of state legislatures and ratified by 3/4 of Congress.',
      'Proposed by a national convention and ratified by popular vote.',
      'Proposed by 2/3 of both houses of Congress and ratified by 3/4 of state legislatures.',
      'Proposed by the President and ratified by the Supreme Court.',
    ],
    correctAnswer: 'C',
    explanation:
      'Under Article V, the most frequent path is a 2/3 vote in both houses of Congress followed by ratification by 3/4 of state legislatures.',
  },
  {
    id: 6112,
    subject: 'ap_us_government',
    unit: 1,
    lessonIDS: ['1.6'],
    unitName: 'Foundations of American Democracy',
    question:
      'Which of the following is an example of the executive branch checking the power of the judicial branch?',
    image: null,
    options: [
      'The President can veto a Supreme Court decision.',
      'The President nominates federal judges and justices.',
      'The President can remove a justice for "bad behavior."',
      'The President can declare a law unconstitutional.',
    ],
    correctAnswer: 'B',
    explanation:
      'The power to appoint judges (with Senate advice and consent) allows the President to check the judicial branch by influencing its long-term ideological composition.',
  },
  {
    id: 6113,
    subject: 'ap_us_government',
    unit: 1,
    lessonIDS: ['1.7'],
    unitName: 'Foundations of American Democracy',
    question:
      'The federal government provides a grant to a state for "transportation," but allows the state significant discretion in how to spend the money—whether on highways, rail, or bridges. This is an example of:',
    image: null,
    options: ['A categorical grant', 'A block grant', 'An unfunded mandate', 'Revenue sharing'],
    correctAnswer: 'B',
    explanation:
      'Block grants are broad grants with few "strings attached," giving states the discretion to decide how to allocate funds within a general policy area.',
  },
  {
    id: 6114,
    subject: 'ap_us_government',
    unit: 1,
    lessonIDS: ['1.8'],
    unitName: 'Foundations of American Democracy',
    question:
      "The Supreme Court's ruling in United States v. Lopez (1995) had the most in common with the philosophy of:",
    image: null,
    options: [
      'The Federalists in Federalist No. 10.',
      'The Anti-Federalists in Brutus No. 1.',
      'The majority opinion in McCulloch v. Maryland.',
      'The authors of the Declaration of Independence.',
    ],
    correctAnswer: 'B',
    explanation:
      'Lopez restricted federal power in favor of state sovereignty, echoing the Anti-Federalist concerns about an overreaching central government expressed in Brutus No. 1.',
  },
  {
    id: 6115,
    subject: 'ap_us_government',
    unit: 1,
    lessonIDS: ['1.9'],
    unitName: 'Foundations of American Democracy',
    question: 'Federalism increases "access points" for interest groups because:',
    image: null,
    options: [
      'It consolidates all policymaking into one location.',
      'It allows groups to lobby at the local, state, and national levels.',
      'It ensures that only elite groups can influence the government.',
      'It requires interest groups to be non-partisan.',
    ],
    correctAnswer: 'B',
    explanation:
      'Federalism divides power between levels of government, creating multiple opportunities (access points) for interest groups to influence policy at different stages.',
  },
];
