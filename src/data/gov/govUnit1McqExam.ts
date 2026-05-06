import type { Question } from '@/data/questionBanks/types';

/**
 * AP U.S. Government & Politics — Unit 1 practice exam (MCQ only).
 * IDs in 6xxx range to avoid collisions with econ unit tests.
 *
 * Passages / excerpts (constitutional text, Primary Source, attribution line):
 * put the excerpt first, then a blank line (`\n\n`), then the prompt stem. UI renders excerpt
 * in italics with a vertical rule (`ApGovQuestionText`).
 */
export const govUnit1McqQuestions: Question[] = [
  {
    id: 6001,
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
      'Hamilton argues that state governments are "unfit" for national governance and that federal powers are "too limited." This aligns with the Federalist position that a stronger central government was necessary. (A) describes the Articles of Confederation\'s structure, which Hamilton critiqued. (C) and (D) are Anti-Federalist leanings.',
  },
  {
    id: 6002,
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
      'Madison argues that you cannot remove the causes of faction (liberty) without destroying democracy; instead, you must control the effects. A large republic makes it difficult for a unified majority faction to form. (B) is rejected by Madison as prone to "turbulence." (D) is seen as impossible by Madison.',
  },
  {
    id: 6003,
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
      'Concurrent powers are powers shared by both the state and federal governments. Taxation is the most common example. (A) and (D) involve exclusive powers (treaties and coining money are federal). (C) involves separation of powers between branches.',
  },
  {
    id: 6004,
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
      'McCulloch established that the "Necessary and Proper Clause" allowed Congress to create a national bank to carry out its enumerated fiscal powers. (A) limited federal power under the Commerce Clause. (C) established judicial review.',
  },
  {
    id: 6005,
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
      'Anti-Federalists feared that the Supremacy Clause, combined with the Necessary and Proper Clause, would give the federal government "absolute and uncontrollable power" over the states (as argued in Brutus No. 1).',
  },
  {
    id: 6006,
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
      'The Great Compromise settled the debate between large and small states by creating a House (population-based) and a Senate (equal representation). (D) refers to the Three-Fifths Compromise.',
  },
  {
    id: 6007,
    subject: 'ap_us_government',
    unit: 1,
    lessonIDS: ['1.7'],
    unitName: 'Foundations of American Democracy',
    question:
      'The federal government provides a grant to a state for "transportation," but allows the state significant discretion in how to spend the money—whether on highways, rail, or bridges. This is an example of:',
    image: null,
    options: [
      'A categorical grant',
      'A block grant',
      'An unfunded mandate',
      'Revenue sharing',
    ],
    correctAnswer: 'B',
    explanation:
      'Block grants are federal funds provided for broad purposes with fewer "strings attached," favoring state discretion. (A) categorical grants are narrow and specific.',
  },
  {
    id: 6008,
    subject: 'ap_us_government',
    unit: 1,
    lessonIDS: ['1.8'],
    unitName: 'Foundations of American Democracy',
    question:
      "In United States v. Lopez (1995), the Supreme Court's ruling limited the scope of which constitutional provision?",
    image: null,
    options: [
      'The Tenth Amendment',
      'The Supremacy Clause',
      'The Commerce Clause',
      'The Full Faith and Credit Clause',
    ],
    correctAnswer: 'C',
    explanation:
      'The Court ruled that Congress exceeded its authority under the Commerce Clause by passing the Gun-Free School Zones Act, stating that carrying a gun in a school zone is not an economic activity.',
  },
  {
    id: 6009,
    subject: 'ap_us_government',
    unit: 1,
    lessonIDS: ['1.2'],
    unitName: 'Foundations of American Democracy',
    question: 'Which of the following best describes the "Elite" model of democracy?',
    image: null,
    options: [
      'Policy is the result of competition between diverse interest groups.',
      'Citizens participate directly in the day-to-day operations of government.',
      'A small number of wealthy and well-educated individuals influence most policy decisions.',
      'State governments serve as "laboratories of democracy."',
    ],
    correctAnswer: 'C',
    explanation:
      'Elite democracy emphasizes limited participation, where power is concentrated in the hands of a distinct class of societal and economic leaders.',
  },
  {
    id: 6010,
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
      'Madison is explaining how the internal structure of the government prevents one branch from becoming too powerful by giving each branch the power and motive to "check" the others.',
  },
  {
    id: 6011,
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
      'Brutus argues that a large republic separates the people from their leaders, allowing a small, powerful group (elites) to rule in their own interest.',
  },
  {
    id: 6012,
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
      'Under the Articles, states acted as sovereign entities and often placed tariffs on one another; the national government had no authority to regulate this trade.',
  },
  {
    id: 6013,
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
      'Popular sovereignty is the principle that the authority of a government is created and sustained by the consent of its people.',
  },
  {
    id: 6014,
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
      'This is the standard process established in Article V and used for 26 of the 27 amendments.',
  },
  {
    id: 6015,
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
      'Both Lopez and Brutus No. 1 emphasize the limits of national power and the importance of preserving state authority.',
  },
  {
    id: 6016,
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
      'The appointment power allows the executive to influence the long-term ideological direction of the courts. (A), (C), and (D) are not constitutional powers.',
  },
  {
    id: 6017,
    subject: 'ap_us_government',
    unit: 1,
    lessonIDS: ['1.3'],
    unitName: 'Foundations of American Democracy',
    question:
      'The influence of factious leaders may kindle a flame within their particular States, but will be unable to spread a general conflagration through the other States. —Federalist No. 10\n\nWhich of the following summarizes Madison’s argument?',
    image: null,
    options: [
      'State governments are better at handling local rebellions.',
      'A large republic prevents local factions from controlling the entire nation.',
      'Factions are harmless as long as they stay within state borders.',
      'The Bill of Rights is necessary to prevent factious leaders.',
    ],
    correctAnswer: 'B',
    explanation:
      'Madison argued that the geographic size and diversity of a large republic make it unlikely for one faction to gain a national majority.',
  },
  {
    id: 6018,
    subject: 'ap_us_government',
    unit: 1,
    lessonIDS: ['1.7'],
    unitName: 'Foundations of American Democracy',
    question:
      'A state government passes a law requiring all students to pass a civics exam to graduate, despite no federal requirement. This is an example of:',
    image: null,
    options: ['An exclusive power.', 'An implied power.', 'A reserved power.', 'A delegated power.'],
    correctAnswer: 'C',
    explanation:
      'Under the Tenth Amendment, powers not delegated to the federal government (like education) are reserved to the states.',
  },
  {
    id: 6019,
    subject: 'ap_us_government',
    unit: 1,
    lessonIDS: ['1.4'],
    unitName: 'Foundations of American Democracy',
    question:
      'The lack of a national executive under the Articles of Confederation most directly led to:',
    image: null,
    options: [
      'The inability of the federal government to enforce its laws.',
      'Frequent overreach by the national bureaucracy.',
      'The Supreme Court becoming too powerful.',
      'Excessive taxation of the states by the national government.',
    ],
    correctAnswer: 'A',
    explanation:
      'Without an executive branch, there was no mechanism to ensure that states complied with the resolutions or laws passed by the Confederation Congress.',
  },
  {
    id: 6020,
    subject: 'ap_us_government',
    unit: 1,
    lessonIDS: ['1.5'],
    unitName: 'Foundations of American Democracy',
    question: 'Which of the following was a direct consequence of the Great Compromise?',
    image: null,
    options: [
      'The President is elected by the House of Representatives.',
      'Small states have disproportionate influence in the Senate compared to their population.',
      'The Three-Fifths Compromise was abolished.',
      'Large states have equal representation in the House.',
    ],
    correctAnswer: 'B',
    explanation:
      'Equal representation in the Senate (two per state) gives voters in small states more relative power in that chamber than voters in large states.',
  },
  {
    id: 6021,
    subject: 'ap_us_government',
    unit: 1,
    lessonIDS: ['1.7'],
    unitName: 'Foundations of American Democracy',
    question:
      'Members of Congress who favor a strong federal oversight role in education policy would most likely support:',
    image: null,
    options: [
      'Block grants for "educational improvements."',
      'Categorical grants with strict reporting requirements.',
      'Unfunded mandates to reduce the federal deficit.',
      'Revenue sharing with no strings attached.',
    ],
    correctAnswer: 'B',
    explanation:
      'Categorical grants allow the federal government to ensure funds are used for specific, federally-defined objectives.',
  },
  {
    id: 6022,
    subject: 'ap_us_government',
    unit: 1,
    lessonIDS: ['1.8'],
    unitName: 'Foundations of American Democracy',
    question:
      'The government of the United States, then, though limited in its powers, is supreme; and its laws... form the supreme law of the land. —McCulloch v. Maryland\n\nThis statement most directly reinforces:',
    image: null,
    options: [
      'The Tenth Amendment',
      'The Supremacy Clause',
      'The Commerce Clause',
      'The Due Process Clause',
    ],
    correctAnswer: 'B',
    explanation:
      'Chief Justice Marshall explicitly cited the Supremacy Clause to argue that state laws (like a tax) cannot interfere with legitimate federal institutions.',
  },
  {
    id: 6023,
    subject: 'ap_us_government',
    unit: 1,
    lessonIDS: ['1.6'],
    unitName: 'Foundations of American Democracy',
    question:
      'If Congress is unhappy with a Supreme Court ruling that a law is unconstitutional, they can:',
    image: null,
    options: [
      'Fire the Chief Justice.',
      'Pass a law saying the Supreme Court was wrong.',
      'Begin the process to amend the Constitution.',
      'Ask the President to ignore the ruling.',
    ],
    correctAnswer: 'C',
    explanation:
      'Formal amendments (Article V) can change the underlying text of the Constitution that the Court interpreted, effectively circumventing a ruling.',
  },
  {
    id: 6024,
    subject: 'ap_us_government',
    unit: 1,
    lessonIDS: ['1.1'],
    unitName: 'Foundations of American Democracy',
    question: 'The Declaration of Independence is best described as:',
    image: null,
    options: [
      'A blueprint for the new federal government.',
      'A list of grievances and a philosophical justification for revolution.',
      'A treaty between the 13 colonies and France.',
      'The document that established the first American political parties.',
    ],
    correctAnswer: 'B',
    explanation:
      'It utilizes natural rights philosophy to explain why the colonies were justified in breaking away from British rule.',
  },
  {
    id: 6025,
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
      'A policy failed at the federal level can be pursued at the state level (and vice versa) due to the divided nature of sovereignty.',
  },
  {
    id: 6026,
    subject: 'ap_us_government',
    unit: 1,
    lessonIDS: ['1.6'],
    unitName: 'Foundations of American Democracy',
    question:
      'In the compound republic of America, the power surrendered by the people is first divided between two distinct governments... —Federalist No. 51\n\nThe "compound republic" refers to:',
    image: null,
    options: [
      'Separation of powers',
      'Federalism',
      'Bicameralism',
      'The Electoral College',
    ],
    correctAnswer: 'B',
    explanation: 'Madison is describing the split of power between the National and State governments.',
  },
  {
    id: 6027,
    subject: 'ap_us_government',
    unit: 1,
    lessonIDS: ['1.8'],
    unitName: 'Foundations of American Democracy',
    question:
      'In McCulloch v. Maryland, the Court ruled that Maryland could not tax the national bank because:',
    image: null,
    options: [
      'The power to tax is a reserved power.',
      'The power to tax involves the power to destroy.',
      'Banks are exempt from all taxes.',
      'Maryland did not have a constitution.',
    ],
    correctAnswer: 'B',
    explanation:
      'Marshall argued that if states could tax federal entities, they could effectively tax them out of existence, violating federal supremacy.',
  },
  {
    id: 6028,
    subject: 'ap_us_government',
    unit: 1,
    lessonIDS: ['1.5'],
    unitName: 'Foundations of American Democracy',
    question: 'The Three-Fifths Compromise had the most significant impact on:',
    image: null,
    options: [
      'The number of Senators from Southern states.',
      'The balance of power in the House of Representatives.',
      'The selection of Supreme Court justices.',
      'The speed of the amendment process.',
    ],
    correctAnswer: 'B',
    explanation:
      'It increased the Southern states\' population count, giving them more seats in the House and more votes in the Electoral College.',
  },
  {
    id: 6029,
    subject: 'ap_us_government',
    unit: 1,
    lessonIDS: ['1.3'],
    unitName: 'Foundations of American Democracy',
    question:
      'Brutus No. 1 argued that a large republic would lead to "factions" that would:',
    image: null,
    options: [
      'Constantly clash and prevent the government from functioning.',
      'Easily be managed by the many levels of government.',
      'Ensure that minority rights were always protected.',
      'Be less dangerous than in a small republic.',
    ],
    correctAnswer: 'A',
    explanation:
      'Anti-Federalists believed that a large, diverse nation would be ungovernable because interests would be too varied to find common ground.',
  },
  {
    id: 6030,
    subject: 'ap_us_government',
    unit: 1,
    lessonIDS: ['1.4'],
    unitName: 'Foundations of American Democracy',
    question:
      "Shays' Rebellion contributed to the call for a Constitutional Convention because it:",
    image: null,
    options: [
      'Showed that state governments were too powerful.',
      'Revealed that the national government could not protect citizens from domestic unrest.',
      'Proved that the British were still a threat.',
      'Demonstrated that the people were ready for direct democracy.',
    ],
    correctAnswer: 'B',
    explanation:
      'The inability of the Confederation to quickly raise a force to stop the uprising in Massachusetts proved that the Articles were too weak to maintain order.',
  },
  {
    id: 6031,
    subject: 'ap_us_government',
    unit: 1,
    lessonIDS: ['1.7'],
    unitName: 'Foundations of American Democracy',
    questionGroup: 'u1-stim-fiscal-federalism',
    question:
      'Questions 1-2 refer to the following table.\n\nFederal Grants-in-Aid to State and Local Governments (2010-2020)\nCategory | 2010 (Billions) | 2015 (Billions) | 2020 (Billions)\nHealth (Medicaid, etc.) | $273 | $350 | $448\nIncome Security | $112 | $105 | $108\nEducation & Training | $101 | $62 | $68\nTransportation | $61 | $63 | $69\n\nWhich of the following constitutional principles is best illustrated by the data in the table?',
    image: null,
    options: [
      'The separation of powers between the executive and legislative branches.',
      'The shift toward a unitary system of government in the United States.',
      'The use of fiscal federalism to influence state policy.',
      'The protection of state sovereignty through the Tenth Amendment.',
    ],
    correctAnswer: 'C',
    explanation:
      'The table highlights billions in grants-in-aid, a core tool of fiscal federalism in which the national government funds states (often with conditions) to shape policy outcomes. (B) is incorrect because the U.S. remains federal, not unitary. (D) is incorrect because grants are a federal leverage mechanism, not primarily a protection of state sovereignty.',
  },
  {
    id: 6032,
    subject: 'ap_us_government',
    unit: 1,
    lessonIDS: ['1.7'],
    unitName: 'Foundations of American Democracy',
    questionGroup: 'u1-stim-fiscal-federalism',
    question:
      'Questions 1-2 refer to the following table.\n\nFederal Grants-in-Aid to State and Local Governments (2010-2020)\nCategory | 2010 (Billions) | 2015 (Billions) | 2020 (Billions)\nHealth (Medicaid, etc.) | $273 | $350 | $448\nIncome Security | $112 | $105 | $108\nEducation & Training | $101 | $62 | $68\nTransportation | $61 | $63 | $69\n\nBased on the data in the table, which of the following is a likely consequence of the trend in health spending?',
    image: null,
    options: [
      'States have gained more discretion over healthcare policy through block grants.',
      'The federal government has increased its influence over state healthcare systems via categorical grants.',
      'The Supreme Court has limited the federal government’s power to regulate intrastate commerce.',
      'Revenue sharing has become the primary method of funding state health initiatives.',
    ],
    correctAnswer: 'B',
    explanation:
      'Health is the largest and fastest-growing grants category in the table, and major health programs such as Medicaid are generally structured as categorical grants that let the federal government set policy conditions. (A) is incorrect because this trend does not indicate a move to block grants. (D) is incorrect because general revenue sharing is not the dominant contemporary tool.',
  },
  {
    id: 6033,
    subject: 'ap_us_government',
    unit: 1,
    lessonIDS: ['1.2'],
    unitName: 'Foundations of American Democracy',
    questionGroup: 'u1-stim-brutus',
    question:
      'Questions 3-4 refer to the following excerpt.\n\n"It is natural to a republic to have only a small territory, otherwise it cannot long subsist. In a large republic there are men of large fortunes, and consequently of less moderation; there are trusts too great to be placed in any single subject; he has interests of his own; he soon begins to think that he may be happy, great and glorious, by oppressing his fellow citizens..."\n—Brutus No. 1\n\nWhich of the following statements best summarizes the author’s argument in the excerpt?',
    image: null,
    options: [
      'A strong central government is necessary to protect citizens from the "mischiefs of faction."',
      'Large republics are superior because they refine and enlarge public views.',
      'A centralized government over a large territory will inevitably lead to tyranny.',
      'Wealthy citizens are the most capable of governing a large and diverse nation.',
    ],
    correctAnswer: 'C',
    explanation:
      'Brutus warns that in a large republic, concentrated power and unequal wealth can lead rulers to oppress citizens; this is a classic Anti-Federalist fear of distant centralized authority. (A) and (B) reflect Federalist arguments associated with Madison, not Brutus.',
  },
  {
    id: 6034,
    subject: 'ap_us_government',
    unit: 1,
    lessonIDS: ['1.2'],
    unitName: 'Foundations of American Democracy',
    questionGroup: 'u1-stim-brutus',
    question:
      'Questions 3-4 refer to the following excerpt.\n\n"It is natural to a republic to have only a small territory, otherwise it cannot long subsist. In a large republic there are men of large fortunes, and consequently of less moderation; there are trusts too great to be placed in any single subject; he has interests of his own; he soon begins to think that he may be happy, great and glorious, by oppressing his fellow citizens..."\n—Brutus No. 1\n\nWhich of the following models of representative democracy is the author advocating for by emphasizing "small territory"?',
    image: null,
    options: [
      'Participatory democracy',
      'Pluralist democracy',
      'Elite democracy',
      'Procedural democracy',
    ],
    correctAnswer: 'A',
    explanation:
      'By stressing small republics and close citizen-government connection, Brutus aligns with participatory democracy, where citizens are more directly involved and representatives remain closer to constituents. (B) is more consistent with Madisonian pluralist logic in large republics.',
  },
  {
    id: 6035,
    subject: 'ap_us_government',
    unit: 1,
    lessonIDS: ['1.8'],
    unitName: 'Foundations of American Democracy',
    questionGroup: 'u1-stim-tenth-amendment',
    question:
      'Questions 5-6 refer to the following excerpt.\n\n"The powers not delegated to the United States by the Constitution, nor prohibited by it to the States, are reserved to the States respectively, or to the people."\n—The Tenth Amendment\n\nThe principle outlined in the excerpt above was most directly used by the Supreme Court in which of the following cases?',
    image: null,
    options: [
      'McCulloch v. Maryland (1819)',
      'Marbury v. Madison (1803)',
      'United States v. Lopez (1995)',
      'Baker v. Carr (1962)',
    ],
    correctAnswer: 'C',
    explanation:
      'In United States v. Lopez, the Court limited Congress’s Commerce Clause reach and reinforced that certain police powers remain with states, echoing Tenth Amendment federalism concerns. (A) generally expanded national power under Necessary and Proper and Supremacy reasoning.',
  },
  {
    id: 6036,
    subject: 'ap_us_government',
    unit: 1,
    lessonIDS: ['1.7'],
    unitName: 'Foundations of American Democracy',
    questionGroup: 'u1-stim-tenth-amendment',
    question:
      'Questions 5-6 refer to the following excerpt.\n\n"The powers not delegated to the United States by the Constitution, nor prohibited by it to the States, are reserved to the States respectively, or to the people."\n—The Tenth Amendment\n\nWhich of the following pairs of constitutional provisions creates the most tension with the amendment cited in the excerpt?',
    image: null,
    options: [
      'The Commerce Clause and the Necessary and Proper Clause.',
      'The Free Exercise Clause and the Establishment Clause.',
      'The Full Faith and Credit Clause and the Privileges and Immunities Clause.',
      'The Advice and Consent Clause and the Vesting Clause.',
    ],
    correctAnswer: 'A',
    explanation:
      'The Tenth Amendment reserves undelegated powers to states, while Congress often relies on the Commerce Clause plus Necessary and Proper Clause to justify broader national legislation. That recurring overlap creates a central federalism tension.',
  },
];
