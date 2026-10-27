import type { Question } from '@/data/questionBanks/types';

const S3 = 'https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com/unit_mcq_images/ap_gov';

const FEDERAL_GRANTS = {
  src: `${S3}/u1_7001.svg`,
  alt: 'Line graph of federal grants to state and local governments by function, 2000 to 2023, in billions of dollars. Health rises from about 127 to about 648; income security from about 59 to about 149; education from about 19 to about 106.',
};

const MARIJUANA_LAWS_MAP = {
  src: `${S3}/u1_7003.svg`,
  alt: 'Map of the United States shading each state as legal for adult use, medical use only, or CBD/low-THC only.',
};

const MANDATORY_DISCRETIONARY = {
  src: `${S3}/u2_7006.svg`,
  alt: 'Stacked area chart of mandatory spending, discretionary spending, and net interest as a percent of federal outlays, selected years 1970 to 2023. Mandatory is about 31 percent in 1970 and 61 percent in 2023.',
};

const HOUSE_MARGINS = {
  src: `${S3}/u2_7008.svg`,
  alt: 'Grid of 435 squares, one per 2022 House election, shaded by margin of victory: more than 10 points, 5 to 10 points, and fewer than 5 points.',
};

const MARIJUANA_SUPPORT = {
  src: `${S3}/u3_7011.svg`,
  alt: 'Line graph of the percent of U.S. adults who say marijuana use should be legal in Gallup polls, 1969 to 2023, rising from 12 percent to 70 percent.',
};

const DEATH_PENALTY_MAP = {
  src: `${S3}/u3_7013.svg`,
  alt: 'Map of the United States shading each state as authorizing the death penalty, having a governor-imposed moratorium, or having abolished it.',
};

const TRUST_BY_AGE = {
  src: `${S3}/u4_7016.svg`,
  alt: 'Bar chart of the percent of adults who trust the federal government in 2013 by age group: ages 18 to 29, 29 percent; 30 to 49, 17; 50 to 64, 16; 65 and older, 15.',
};

const IDEOLOGY_SPENDING = {
  src: `${S3}/u4_7018.svg`,
  alt: 'Grouped bar chart of the percent of conservatives, moderates, and liberals who favor increased spending on defense, Medicaid, and environmental protection (illustrative data).',
};

const TURNOUT_PRES_MIDTERM = {
  src: `${S3}/u5_7020.svg`,
  alt: 'Grouped bar chart of voter turnout in paired presidential and midterm elections from 2004 to 2022; presidential turnout is higher in every pair.',
};

const VOTER_ID_MAP = {
  src: `${S3}/u5_7022.svg`,
  alt: 'Map of the United States shading each state as requiring photo ID, accepting non-photo ID, or requiring no ID document to vote in person.',
};

/**
 * Stimulus-based AP Gov practice MCQs (IDs 7001–7024).
 * Merged into live practice by unit via `govMcqPractice.ts`.
 */
export const govStimulusMcqPracticeQuestions: Question[] = [
  {
    id: 7001,
    subject: 'ap_us_government',
    unit: 1,
    lessonIDS: ['1.9'],
    unitName: 'Foundations of American Democracy',
    questionGroup: 'u1-stim-grants-trend',
    question:
      'Which of the following conclusions is best supported by the data in the graph?',
    image: FEDERAL_GRANTS,
    options: [
      'Federal grants for health increased in every year shown.',
      'Federal grants for education were larger than federal grants for income security in every year shown.',
      'Between 2000 and 2023, federal grants for health grew by more dollars than federal grants for education and income security combined.',
      'Federal grants for income security grew by a larger percentage than federal grants for health between 2000 and 2023.',
    ],
    correctAnswer: 'C',
    explanation:
      'Health grants rose by roughly $520 billion, while education and income security together rose by under $180 billion. The health line dips in several years (for example, around 2006 and 2011-2012), and income security stayed above education throughout.',
  },
  {
    id: 7002,
    subject: 'ap_us_government',
    unit: 1,
    lessonIDS: ['1.9'],
    unitName: 'Foundations of American Democracy',
    questionGroup: 'u1-stim-grants-conditions',
    question:
      'Much of the growth in federal health grants shown in the graph reflects spending on Medicaid, a program that states administer under federal rules. Which of the following is the most likely effect of this trend on state governments?',
    image: FEDERAL_GRANTS,
    options: [
      'State governments become more tied to federal requirements because categorical grants come with conditions.',
      'State governments gain greater independence from federal regulation because they receive more federal money.',
      'State governments are released from the Tenth Amendment because federal money replaces state revenue.',
      'Congress loses its power to place conditions on state spending because grants are entitlements.',
    ],
    correctAnswer: 'A',
    explanation:
      'Categorical grants and joint programs such as Medicaid come with federal conditions, so more federal money generally means more federal influence over state policy. This is fiscal (cooperative) federalism: Congress uses its spending power to shape state action.',
  },
  {
    id: 7003,
    subject: 'ap_us_government',
    unit: 1,
    lessonIDS: ['1.9'],
    unitName: 'Foundations of American Democracy',
    questionGroup: 'u1-stim-marijuana-map-read',
    question: 'Which of the following statements is accurate based on the map?',
    image: MARIJUANA_LAWS_MAP,
    options: [
      'Every state that allows medical use also allows adult recreational use.',
      'Only states in the Midwest have legalized adult recreational use.',
      'Most states in the South have legalized adult recreational use, while every state in the West and Northeast allows only medical or CBD/low-THC use.',
      'Most states in the West and Northeast allow adult recreational use, while most states in the South allow only medical or CBD/low-THC use.',
    ],
    correctAnswer: 'D',
    explanation:
      'The darkest states cluster in the West and Northeast, while most southern states are shaded as medical-only or CBD/low-THC. Many medical-use states do not allow adult recreational use, so the first option misreads the map.',
  },
  {
    id: 7004,
    subject: 'ap_us_government',
    unit: 1,
    lessonIDS: ['1.8', '1.9'],
    unitName: 'Foundations of American Democracy',
    questionGroup: 'u1-stim-marijuana-labs',
    question:
      'The differences among states shown in the map are most directly an example of which of the following?',
    image: MARIJUANA_LAWS_MAP,
    options: [
      'The national government requiring every state to adopt a uniform policy.',
      'States acting as "laboratories of democracy" by trying different policies on the same issue.',
      'Selective incorporation of a Bill of Rights protection against the states.',
      'The Supreme Court using judicial review to strike down state laws.',
    ],
    correctAnswer: 'B',
    explanation:
      'Under federalism, states can experiment with different approaches to the same problem. Justice Brandeis described this as states serving as "laboratories of democracy." The map shows variation, not a uniform national rule.',
  },
  {
    id: 7005,
    subject: 'ap_us_government',
    unit: 1,
    lessonIDS: ['1.7', '1.8'],
    unitName: 'Foundations of American Democracy',
    questionGroup: 'u1-stim-marijuana-federal-state',
    question:
      'Federal law still classifies marijuana as an illegal controlled substance. Which of the following best explains why states can nonetheless differ in how they treat marijuana, as shown in the map?',
    image: MARIJUANA_LAWS_MAP,
    options: [
      'The Supremacy Clause allows state laws to override conflicting federal statutes, so a state that legalizes marijuana thereby repeals the federal Controlled Substances Act inside its borders.',
      'The Tenth Amendment reserves general police powers to the states, and the federal government cannot force state officials to enforce federal drug laws.',
      'The Commerce Clause prevents Congress from regulating the drug market.',
      'Federal law does not apply to individuals in states that have legalized marijuana.',
    ],
    correctAnswer: 'B',
    explanation:
      'States control most criminal law under their police powers and may decline to enforce federal drug laws (anti-commandeering). Federal law, however, still applies: under Gonzales v. Raich (2005) Congress may regulate marijuana under the Commerce Clause, and the Supremacy Clause means federal law prevails in a conflict.',
  },
  {
    id: 7006,
    subject: 'ap_us_government',
    unit: 2,
    lessonIDS: ['2.2'],
    unitName: 'Interactions Among Branches of Government',
    questionGroup: 'u2-stim-spending-read',
    question: 'Which of the following is an accurate reading of the graph?',
    image: MANDATORY_DISCRETIONARY,
    options: [
      'Mandatory spending increased as a share of outlays between every pair of years shown.',
      'Net interest was the second-largest category of federal spending in every year shown.',
      'Mandatory spending made up a larger share of federal outlays in 2023 than in 1970.',
      'Discretionary spending decreased in dollar amount in every period shown.',
    ],
    correctAnswer: 'C',
    explanation:
      'Mandatory spending rose from about 31% of outlays in 1970 to about 61% in 2023. It fell between 2020 and 2023, so it did not rise in every period. Net interest was the smallest category in every year shown, and the graph shows shares of outlays, not dollar amounts.',
  },
  {
    id: 7007,
    subject: 'ap_us_government',
    unit: 2,
    lessonIDS: ['2.2'],
    unitName: 'Interactions Among Branches of Government',
    questionGroup: 'u2-stim-spending-constraint',
    question:
      'Given the composition of federal spending shown in the graph, which of the following best explains why Congress cannot easily balance the budget by cutting only discretionary programs?',
    image: MANDATORY_DISCRETIONARY,
    options: [
      'The Constitution forbids Congress from reducing discretionary spending.',
      'The president controls mandatory spending through the impoundment power and can cancel Social Security and Medicare outlays without any action by Congress.',
      'Discretionary spending is determined by the Federal Reserve.',
      'Mandatory spending and net interest are set by existing law and are not subject to the annual appropriations process.',
    ],
    correctAnswer: 'D',
    explanation:
      'Programs such as Social Security and Medicare, along with interest owed on the debt, continue under permanent law unless Congress changes the law itself. Congress sets discretionary spending each year through appropriations, but that category is a shrinking share of the total.',
  },
  {
    id: 7008,
    subject: 'ap_us_government',
    unit: 2,
    lessonIDS: ['2.3'],
    unitName: 'Interactions Among Branches of Government',
    questionGroup: 'u2-stim-house-margins-read',
    question: 'Which of the following is supported by the graphic?',
    image: HOUSE_MARGINS,
    options: [
      'More than 80 percent of House elections in 2022 were decided by more than 10 points.',
      'About one quarter of House elections were decided by fewer than 10 points.',
      'Elections decided by fewer than 5 points were the most common category.',
      'Most House elections in 2022 were closely contested.',
    ],
    correctAnswer: 'A',
    explanation:
      'About 360 of 435 elections (roughly 83%) were decided by more than 10 points. Only 75 were decided by 10 points or fewer (about 17%), and just 40 by fewer than 5 points.',
  },
  {
    id: 7009,
    subject: 'ap_us_government',
    unit: 2,
    lessonIDS: ['2.3'],
    unitName: 'Interactions Among Branches of Government',
    questionGroup: 'u2-stim-house-margins-primary',
    question:
      'Which of the following is the most likely consequence of the pattern shown in the graphic?',
    image: HOUSE_MARGINS,
    options: [
      'In many districts the party primary, not the general election, is the real contest for the seat.',
      'General elections become the most important source of competition for most House members.',
      'Members of Congress become more responsive to voters in the opposing party.',
      'Third-party candidates win a majority of House seats.',
    ],
    correctAnswer: 'A',
    explanation:
      'When one party reliably wins a district, the winner is often decided in the primary, where a smaller and more ideological electorate votes. This can encourage candidates to appeal to their party base rather than to the political middle.',
  },
  {
    id: 7010,
    subject: 'ap_us_government',
    unit: 2,
    lessonIDS: ['2.3'],
    unitName: 'Interactions Among Branches of Government',
    questionGroup: 'u2-stim-house-margins-shaw',
    question:
      'The graphic shows that many House districts are lopsided. States draw district lines after each census. Which of the following is a limit the Supreme Court has placed on how states draw those lines?',
    image: HOUSE_MARGINS,
    options: [
      'A state must use a nonpartisan commission to draw its districts.',
      'A state must draw districts so that every House election is competitive.',
      'A state may redraw its districts only once every twenty years.',
      'A state may not draw districts predominantly on the basis of race without a compelling justification.',
    ],
    correctAnswer: 'D',
    explanation:
      'In Shaw v. Reno (1993) the Court held that districts drawn predominantly by race can violate the Equal Protection Clause. The Constitution and the Court do not require commissions or competitive districts, and states set their own redistricting procedures within these limits.',
  },
  {
    id: 7011,
    subject: 'ap_us_government',
    unit: 3,
    lessonIDS: ['3.10'],
    unitName: 'Civil Liberties and Civil Rights',
    questionGroup: 'u3-stim-marijuana-support-read',
    question: 'Which of the following statements is supported by the graph?',
    image: MARIJUANA_SUPPORT,
    options: [
      'Support for legalization increased in every poll after 1995, including a steady rise with no dips between 2010 and 2016.',
      'Since about 2013, support for legalizing marijuana has stayed above 50 percent in every poll shown.',
      'A majority of adults supported legalization by 2010.',
      'Support for legalization was higher in 1985 than in 1977.',
    ],
    correctAnswer: 'B',
    explanation:
      'Every point from about 2013 onward is above 50%. Support dipped in 2012 and 2014, was only 46% in 2010, and was lower in 1985 (23%) than in 1977 (28%).',
  },
  {
    id: 7012,
    subject: 'ap_us_government',
    unit: 3,
    lessonIDS: ['3.10', '1.9'],
    unitName: 'Civil Liberties and Civil Rights',
    questionGroup: 'u3-stim-marijuana-support-federalism',
    question:
      "Despite the level of national support shown in the graph, marijuana remains illegal for adult use in many states. Which of the following best explains this?",
    image: MARIJUANA_SUPPORT,
    options: [
      'National opinion polls are legally binding only on the federal government.',
      'The Supreme Court has ruled that marijuana cannot be legalized without a constitutional amendment, so state statutes and ballot initiatives that permit adult use have no legal effect.',
      "Under federalism, each state's laws respond to its own voters and officials, so national opinion does not produce a single uniform law.",
      'Public opinion has no effect on public policy in the United States.',
    ],
    correctAnswer: 'C',
    explanation:
      'Most criminal and health policy is made at the state level. Shifts in opinion can influence state legislatures and ballot initiatives, but outcomes vary from state to state. Polls do not bind any government, and the Court has not barred states from legalizing.',
  },
  {
    id: 7013,
    subject: 'ap_us_government',
    unit: 3,
    lessonIDS: ['3.6'],
    unitName: 'Civil Liberties and Civil Rights',
    questionGroup: 'u3-stim-death-penalty-read',
    question: 'Which of the following statements is accurate based on the map?',
    image: DEATH_PENALTY_MAP,
    options: [
      'A majority of states have abolished the death penalty.',
      'No state in the western United States has abolished the death penalty.',
      'All states with a governor-imposed moratorium are in the Northeast.',
      'Every state on the Gulf of Mexico authorizes the death penalty.',
    ],
    correctAnswer: 'D',
    explanation:
      'Texas, Louisiana, Mississippi, Alabama, and Florida are all shaded as authorized. 23 of 50 states have abolished the death penalty, which is fewer than half. Washington, Colorado, Alaska, and Hawaii in the West have abolished it, and the moratorium states are California, Oregon, Ohio, and Pennsylvania.',
  },
  {
    id: 7014,
    subject: 'ap_us_government',
    unit: 3,
    lessonIDS: ['3.6'],
    unitName: 'Civil Liberties and Civil Rights',
    questionGroup: 'u3-stim-death-penalty-evolving',
    question:
      'In interpreting the Eighth Amendment\'s ban on "cruel and unusual punishment," courts have looked to the "evolving standards of decency." Which of the following would a court most likely consider as evidence of an evolving standard?',
    image: DEATH_PENALTY_MAP,
    options: [
      "The president's personal opinion of the punishment.",
      'The number of states that have abolished the punishment or stopped using it.',
      'Only the punishments that were commonly used in 1791.',
      'The rate at which the federal Bureau of Prisons operates facilities.',
    ],
    correctAnswer: 'B',
    explanation:
      'Under the "evolving standards of decency" approach, courts examine contemporary practice, including state legislation, and the Court has done so in cases limiting the death penalty. A map like this one shows how much state practice varies.',
  },
  {
    id: 7015,
    subject: 'ap_us_government',
    unit: 3,
    lessonIDS: ['3.6', '3.7'],
    unitName: 'Civil Liberties and Civil Rights',
    questionGroup: 'u3-stim-death-penalty-federalism',
    question:
      'Which of the following best explains why the death penalty can differ so much across the states shown?',
    image: DEATH_PENALTY_MAP,
    options: [
      'States control most criminal law under their police powers, but must still respect Eighth Amendment limits that apply to them through the Fourteenth Amendment.',
      'The Eighth Amendment applies only to the federal government, so states are free of its limits and may adopt any criminal punishment their legislatures prefer, including those the Court has barred.',
      'The Supreme Court has ruled the death penalty unconstitutional in every state.',
      'Congress sets the criminal punishments for all state crimes.',
    ],
    correctAnswer: 'A',
    explanation:
      "Criminal punishment is largely a state matter, which is why policies vary. The Eighth Amendment, however, has been incorporated through the Fourteenth Amendment's Due Process Clause and limits state punishments. The Court upheld the death penalty in Gregg v. Georgia (1976), and Congress does not set punishments for state crimes.",
  },
  {
    id: 7016,
    subject: 'ap_us_government',
    unit: 4,
    lessonIDS: ['4.1', '4.6'],
    unitName: 'American Political Ideologies and Beliefs',
    questionGroup: 'u4-stim-trust-age-read',
    question: 'Which of the following is supported by the graph?',
    image: TRUST_BY_AGE,
    options: [
      'Adults ages 65 and older were the most trusting age group.',
      'A majority of adults ages 18-29 said they trust the federal government.',
      'Adults ages 18-29 were more likely to say they trust the federal government than any older age group shown.',
      'The gap between adults ages 30-49 and ages 65+ was larger than the gap between adults ages 18-29 and ages 30-49.',
    ],
    correctAnswer: 'C',
    explanation:
      'The 18-29 bar (29%) is higher than every other group (17%, 16%, and 15%). Even the highest bar is well under half. The gap between ages 18-29 and 30-49 (12 points) is much larger than the gap between ages 30-49 and 65+ (2 points).',
  },
  {
    id: 7017,
    subject: 'ap_us_government',
    unit: 4,
    lessonIDS: ['4.1', '4.2'],
    unitName: 'American Political Ideologies and Beliefs',
    questionGroup: 'u4-stim-trust-age-limits',
    question:
      'Which of the following conclusions is NOT supported by the data in the graph?',
    image: TRUST_BY_AGE,
    options: [
      'In 2013, trust in the federal government was below 50 percent in every age group shown.',
      'As individuals grow older, they become less trusting of the federal government.',
      'In 2013, the youngest adults expressed more trust in the federal government than older adults did.',
      'In 2013, adults ages 50-64 and 65+ expressed similar levels of trust.',
    ],
    correctAnswer: 'B',
    explanation:
      "A single survey compares different age groups at one moment. It cannot show whether people's views change as they age (a life-cycle effect) or whether each generation formed its views in a different era (a generational effect). Following the same people over time would be needed to tell the two apart.",
  },
  {
    id: 7018,
    subject: 'ap_us_government',
    unit: 4,
    lessonIDS: ['4.8', '4.9'],
    unitName: 'American Political Ideologies and Beliefs',
    questionGroup: 'u4-stim-ideology-read',
    question: 'Which of the following statements is accurate based on the graph?',
    image: IDEOLOGY_SPENDING,
    options: [
      'Moderates were the group most likely to favor increasing defense spending.',
      'Liberals were more likely than conservatives to oppose increasing spending on Medicaid.',
      'Conservatives were more supportive of increasing environmental protection spending than moderates were.',
      'A larger share of conservatives than liberals favored increasing spending on defense.',
    ],
    correctAnswer: 'D',
    explanation:
      'About 62% of conservatives favored more defense spending, compared with 25% of liberals. Moderates (45%) fell between them on defense. On Medicaid and the environment, liberals were the most supportive of increases.',
  },
  {
    id: 7019,
    subject: 'ap_us_government',
    unit: 4,
    lessonIDS: ['4.7', '4.8'],
    unitName: 'American Political Ideologies and Beliefs',
    questionGroup: 'u4-stim-ideology-limits',
    question:
      'Which of the following is the best interpretation of the fact that some conservatives support increased spending on environmental protection?',
    image: IDEOLOGY_SPENDING,
    options: [
      'Ideology is a useful predictor of issue positions, but individuals do not always hold every position associated with their ideology.',
      "Ideology has no relationship to a person's views on policy issues.",
      'Those respondents must identify with the Democratic Party rather than the Republican Party, because a conservative who favors any environmental spending is, by definition, not a conservative.',
      'Survey results that show any overlap between groups are invalid.',
    ],
    correctAnswer: 'A',
    explanation:
      'Ideology and issue positions are strongly related but not perfectly so. Ideology is also not the same as party identification: some people who describe themselves as conservative hold views that do not match their ideological label on particular issues.',
  },
  {
    id: 7020,
    subject: 'ap_us_government',
    unit: 5,
    lessonIDS: ['5.2'],
    unitName: 'Political Participation',
    questionGroup: 'u5-stim-turnout-read',
    question: 'Which of the following is supported by the graph?',
    image: TURNOUT_PRES_MIDTERM,
    options: [
      'Midterm turnout increased in every election cycle shown.',
      'Turnout in the 2018 midterm was higher than turnout in any presidential election shown, which means midterm electorates were larger than presidential electorates throughout the period.',
      'In each pair of elections shown, turnout in the presidential year exceeded turnout in the following midterm by at least 10 percentage points.',
      'Presidential turnout decreased in each successive election shown.',
    ],
    correctAnswer: 'C',
    explanation:
      'The smallest gap is 2016 (about 60%) versus 2018 (about 50%), a difference of about 10 points; the other gaps are about 20 points. Midterm turnout fell between 2008-2010 and 2012-2014, and the highest midterm figure (about 50%) is below every presidential figure shown.',
  },
  {
    id: 7021,
    subject: 'ap_us_government',
    unit: 5,
    lessonIDS: ['5.2', '2.3'],
    unitName: 'Political Participation',
    questionGroup: 'u5-stim-turnout-midterm-electorate',
    question:
      'Which of the following is the most likely consequence of the difference in turnout shown in the graph?',
    image: TURNOUT_PRES_MIDTERM,
    options: [
      'Presidential elections are decided by a smaller and more partisan group of voters than midterm elections, because higher-turnout contests always produce a narrower and more ideological electorate.',
      'Midterm elections produce more representative electorates than presidential elections.',
      "Midterm electorates tend to be older and more partisan than presidential electorates, which can contribute to losses for the president's party.",
      'Turnout differences have no effect on which candidates win.',
    ],
    correctAnswer: 'C',
    explanation:
      "When fewer people vote, the electorate is more likely to skew toward older, higher-income, and more strongly partisan voters. The president's party has lost House seats in most midterm elections, including 2006, 2010, 2014, 2018, and 2022.",
  },
  {
    id: 7022,
    subject: 'ap_us_government',
    unit: 5,
    lessonIDS: ['5.1'],
    unitName: 'Political Participation',
    questionGroup: 'u5-stim-voter-id-read',
    question: 'Which of the following statements is accurate based on the map?',
    image: VOTER_ID_MAP,
    options: [
      'None of the three Pacific coast states in the lower 48 (Washington, Oregon, and California) requires photo identification to vote in person.',
      'A majority of states require photo identification to vote in person, and every Pacific coast state in the lower 48 is among the states with the strictest photo ID rules.',
      'Every state that requires some form of ID requires a photo ID.',
      'Every state in the Midwest requires an ID document to vote in person.',
    ],
    correctAnswer: 'A',
    explanation:
      'Washington is shaded as accepting non-photo ID, and California and Oregon are shaded as not requiring an ID document. The photo ID states number fewer than half of the 50, and several states (for example Arizona and Colorado) accept non-photo ID.',
  },
  {
    id: 7023,
    subject: 'ap_us_government',
    unit: 5,
    lessonIDS: ['5.1', '1.9'],
    unitName: 'Political Participation',
    questionGroup: 'u5-stim-voter-id-federalism',
    question:
      'Which of the following best explains why voter identification requirements differ so widely among the states shown?',
    image: VOTER_ID_MAP,
    options: [
      'The Supreme Court has held that all voter identification laws are unconstitutional, so any state that still requires an ID is acting in open defiance of a nationwide Court ban.',
      'The Tenth Amendment prevents Congress from regulating elections in any way.',
      'Federal law requires each state to follow the standard of its neighboring states.',
      'The Constitution gives states primary authority to set the time, place, and manner of elections, subject to regulation by Congress.',
    ],
    correctAnswer: 'D',
    explanation:
      'Article I, Section 4 (the Elections Clause) lets state legislatures regulate elections, with Congress able to alter those rules. The Court upheld a state photo ID law in Crawford v. Marion County (2008), and Congress has used its power in laws such as the National Voter Registration Act.',
  },
  {
    id: 7024,
    subject: 'ap_us_government',
    unit: 5,
    lessonIDS: ['5.1', '5.2'],
    unitName: 'Political Participation',
    questionGroup: 'u5-stim-voter-id-barriers',
    question:
      'Which of the following arguments would opponents of strict photo identification requirements most likely make?',
    image: VOTER_ID_MAP,
    options: [
      'Voter identification requirements will increase turnout among all eligible voters, because requiring documents makes registration and Election Day voting easier for people who currently lack identification.',
      'Some eligible voters, such as older, low-income, or rural citizens, may lack the required ID, and obtaining it can impose costs that reduce participation.',
      'States should be prohibited from setting any rules for voter registration.',
      'Photo identification is already required by the Constitution.',
    ],
    correctAnswer: 'B',
    explanation:
      'Opponents argue that ID rules create barriers for eligible voters who lack documents. Supporters respond that ID rules protect election integrity and public confidence. The Constitution does not itself require voter ID.',
  },
];

export const govStimulusByUnit = (unit: number) =>
  govStimulusMcqPracticeQuestions.filter((q) => q.unit === unit);
