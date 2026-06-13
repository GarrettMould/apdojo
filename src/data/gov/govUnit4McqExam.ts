import type { Question } from '@/data/questionBanks/types';

/**
 * AP U.S. Government & Politics — Unit 4 **formal unit MCQ test** only
 * (`/unit-mcq-test/4?subject=gov`, pretty URL `/ap-gov-unit-4-mcq-test`).
 * IDs in 64xx range.
 *
 * Aligned with the 2023–2026 AP Gov CED Unit 4: American Political Ideologies and Beliefs.
 */
export const govUnit4McqTestQuestions: Question[] = [
  {
    id: 6401,
    subject: 'ap_us_government',
    unit: 4,
    lessonIDS: ['4.1'],
    unitName: 'American Political Ideologies and Beliefs',
    questionGroup: 'u4-concept-core-values',
    question:
      'A citizen believes that while the government should ensure a basic safety net, the primary responsibility for economic success lies with the individual’s own ambition and effort. This citizen’s belief system most closely aligns with:',
    image: null,
    options: [
      'The principle of equality of result.',
      'The tension between individualism and the role of the state.',
      'A preference for a command economy.',
      'The principle of rule of law over individual property rights.',
    ],
    correctAnswer: 'B',
    explanation:
      'The balance between individualism—the belief that one shapes their own destiny—and government assistance is a central tension in American political culture.',
  },
  {
    id: 6402,
    subject: 'ap_us_government',
    unit: 4,
    lessonIDS: ['4.5'],
    unitName: 'American Political Ideologies and Beliefs',
    questionGroup: 'u4-concept-polling-bias',
    question:
      'A news organization conducts a poll by calling landline telephones during business hours to ask about support for a new tax policy. Which of the following best explains a potential limitation of this data?',
    image: null,
    options: [
      'The sample is likely to suffer from non-response bias and underrepresent younger voters.',
      'The poll lacks a margin of error calculation.',
      'The question is neutral and unbiased, making the data highly credible.',
      'Benchmark polls are inherently more accurate than tracking polls.',
    ],
    correctAnswer: 'A',
    explanation:
      'Relying on landlines during work hours creates a sampling bias that systematically excludes working-age individuals and younger demographics, undermining the poll’s representative nature.',
  },
  {
    id: 6403,
    subject: 'ap_us_government',
    unit: 4,
    lessonIDS: ['4.2'],
    unitName: 'American Political Ideologies and Beliefs',
    questionGroup: 'u4-concept-socialization',
    question:
      'Which of the following scenarios best illustrates the "generational effect" on political socialization?',
    image: null,
    options: [
      'A person’s political views shift to the right as they enter retirement.',
      'A group of voters who came of age during the Great Depression consistently favoring a larger federal role in the economy throughout their lives.',
      'A student changing their party identification after taking a college course.',
      'A voter changing their stance on an issue due to a specific scandal involving a single candidate.',
    ],
    correctAnswer: 'B',
    explanation:
      'Generational effects involve shared experiences of a specific cohort (like the Depression or the Cold War) that shape their political attitudes for their entire lives.',
  },
  {
    id: 6404,
    subject: 'ap_us_government',
    unit: 4,
    lessonIDS: ['4.10'],
    unitName: 'American Political Ideologies and Beliefs',
    questionGroup: 'u4-concept-ideology-social',
    question: 'Which of the following policy positions would a modern American libertarian most likely support?',
    image: null,
    options: [
      'Stricter government regulations on the private sale of property.',
      'The legalization of most personal behaviors provided they do not infringe on the rights of others.',
      'Nationalized healthcare administered by the federal government.',
      'Increased federal spending on public education at the state level.',
    ],
    correctAnswer: 'B',
    explanation:
      'Libertarian ideology emphasizes individual liberty and minimal government intervention in both the marketplace and personal social choices.',
  },
  {
    id: 6405,
    subject: 'ap_us_government',
    unit: 4,
    lessonIDS: ['4.3'],
    unitName: 'American Political Ideologies and Beliefs',
    questionGroup: 'u4-concept-life-cycle',
    question:
      'A young person who prioritizes environmental protection and social equality begins to focus more on property taxes and retirement security as they enter their fifties. This is an example of:',
    image: null,
    options: ['A generational effect.', 'A life cycle effect.', 'Political realignment.', 'Globalization.'],
    correctAnswer: 'B',
    explanation:
      'Life cycle effects refer to changes in political attitudes as individuals move through different stages of life, such as aging and changing financial responsibilities.',
  },
  {
    id: 6406,
    subject: 'ap_us_government',
    unit: 4,
    lessonIDS: ['4.7'],
    unitName: 'American Political Ideologies and Beliefs',
    questionGroup: 'u4-text-party-ideology',
    question:
      'Questions 6-7 refer to the following summary.\n\nThe Democratic Party platform traditionally emphasizes a "social safety net," advocating for government-funded programs to support the vulnerable. In contrast, the Republican Party platform typically prioritizes "free enterprise," arguing that lower taxes and deregulation drive economic growth more effectively than government spending.\n\nWhich of the following political ideologies is best represented by the Republican Party’s position in this excerpt?',
    image: null,
    options: ['Liberalism', 'Conservatism', 'Socialism', 'Populism'],
    correctAnswer: 'B',
    explanation:
      'Modern American conservatism typically champions lower taxes, deregulation, and a reduced government role in the marketplace to foster private sector growth.',
  },
  {
    id: 6407,
    subject: 'ap_us_government',
    unit: 4,
    lessonIDS: ['4.9'],
    unitName: 'American Political Ideologies and Beliefs',
    questionGroup: 'u4-text-party-ideology',
    question:
      'Which of the following economic approaches would a supporter of the Democratic Party’s position described in the excerpt most likely favor?',
    image: null,
    options: [
      'Keynesian economic theory.',
      'Supply-side economic theory.',
      'Strict adherence to Laissez-faire capitalism.',
      'The elimination of all progressive tax brackets.',
    ],
    correctAnswer: 'A',
    explanation:
      'Keynesianism—which advocates for increased government spending to stimulate demand—aligns with the liberal ideological preference for government involvement in the economy.',
  },
  {
    id: 6408,
    subject: 'ap_us_government',
    unit: 4,
    lessonIDS: ['4.5'],
    unitName: 'American Political Ideologies and Beliefs',
    questionGroup: 'u4-concept-poll-method',
    question:
      'A campaign manager wants to ensure that a poll’s results are credible and minimize the margin of error. Which of the following is most essential?',
    image: null,
    options: [
      'Ensuring the poll reaches at least 50% of the entire population.',
      'Using random sampling methods to ensure every member of the population has an equal chance of being selected.',
      'Conducting the poll exclusively via social media to reach younger voters.',
      'Using biased, leading questions to reveal the "true" intent of the respondent.',
    ],
    correctAnswer: 'B',
    explanation:
      'Random sampling is the bedrock of scientific polling. Without it, the results are unlikely to accurately reflect the broader population.',
  },
  {
    id: 6409,
    subject: 'ap_us_government',
    unit: 4,
    lessonIDS: ['4.4'],
    unitName: 'American Political Ideologies and Beliefs',
    questionGroup: 'u4-concept-political-events',
    question:
      'How do major political events, such as the 9/11 attacks or the Great Recession, influence the political socialization of a population?',
    image: null,
    options: [
      'They force the government to dissolve all political parties.',
      'They act as external shocks that can shift the ideological focus of a generation or change the public’s view of government’s proper role.',
      'They ensure that all citizens will adopt the exact same ideology.',
      'They have no impact on political ideology, as socialization ends at age eighteen.',
    ],
    correctAnswer: 'B',
    explanation:
      'Political events are a form of socialization that can fundamentally alter how an entire generation views government authority, security, or economic policy.',
  },
  {
    id: 6410,
    subject: 'ap_us_government',
    unit: 4,
    lessonIDS: ['4.6'],
    unitName: 'American Political Ideologies and Beliefs',
    questionGroup: 'u4-concept-polling-veracity',
    question:
      'When evaluating the veracity of public opinion data reported during a presidential campaign, what should a political scientist prioritize?',
    image: null,
    options: [
      'The candidate’s own internal polls.',
      'The methodology, including sampling technique and the framing of the questions.',
      'The popularity of the news network reporting the data.',
      'Whether the data matches the anecdotal feelings of the voters in the scientist’s own neighborhood.',
    ],
    correctAnswer: 'B',
    explanation:
      'The credibility of any poll is determined by its methodology (sampling, margin of error, and wording) rather than the source or popularity.',
  },
  {
    id: 6411,
    subject: 'ap_us_government',
    unit: 4,
    lessonIDS: ['4.6'],
    unitName: 'American Political Ideologies and Beliefs',
    questionGroup: 'u4-concept-tracking-polls',
    question: 'Why would a campaign rely on tracking polls throughout an election season?',
    image: null,
    options: [
      'To provide the final election results before polls close.',
      'To monitor how public opinion on a candidate changes over time in response to campaign events.',
      'To exclusively identify the political views of voters in a single state.',
      'To bypass the need for scientific sampling methods.',
    ],
    correctAnswer: 'B',
    explanation:
      'Tracking polls are repeated over time to show shifts in public perception during a campaign, allowing managers to adjust their strategies.',
  },
  {
    id: 6421,
    subject: 'ap_us_government',
    unit: 4,
    lessonIDS: ['4.6'],
    unitName: 'American Political Ideologies and Beliefs',
    questionGroup: 'u4-stim-trust-in-gov',
    question:
      'A researcher uses the line graph to argue that the quality of public opinion polls measuring trust in government has declined since the 1960s because respondents today are less willing to answer honestly. Which of the following best evaluates this claim?',
    image: {
      src: 'https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com/unitTestImages/gov/unit_4/trust+in+federal+gov.svg',
      alt: 'Line graph showing public trust in the federal government over time since the 1960s',
    },
    options: [
      'The claim is valid because declining response rates in modern polling make all survey data from after 1980 statistically unreliable.',
      'The claim is not well supported because the consistent downward trend across multiple independent polling organizations over decades suggests the data reflects a genuine shift in public attitudes rather than a methodological problem.',
      'The claim is valid because social desirability bias causes respondents to overreport trust in government, meaning actual trust levels are even lower than the graph shows.',
      'The claim cannot be evaluated because public trust is a qualitative concept that cannot be accurately captured through survey research.',
    ],
    correctAnswer: 'B',
    explanation:
      'Consistent longitudinal data from multiple independent sources indicates a real decline in public confidence, rather than just a flaw in the polling methodology.',
  },
  {
    id: 6422,
    subject: 'ap_us_government',
    unit: 4,
    lessonIDS: ['4.1', '4.6'],
    unitName: 'American Political Ideologies and Beliefs',
    questionGroup: 'u4-stim-trust-in-gov',
    question:
      'Which of the following conclusions is best supported by the overall downward trend in public trust shown in the line graph?',
    image: {
      src: 'https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com/unitTestImages/gov/unit_4/trust+in+federal+gov.svg',
      alt: 'Line graph showing public trust in the federal government over time since the 1960s',
    },
    options: [
      'Declining trust in the federal government reflects growing public support for libertarian ideology and minimal government intervention.',
      'The long-term erosion of public confidence in federal institutions is likely to reduce citizens\' sense that their political participation can produce meaningful change.',
      'Political socialization through family and schools has become more effective at transmitting pro-government values to younger generations since the 1960s.',
      'The trend is best explained as a methodological artifact, since long-term polling comparisons are inherently unreliable due to changes in survey methodology over time.',
    ],
    correctAnswer: 'B',
    explanation:
      'Decreased institutional trust is strongly linked to lower levels of political efficacy, as citizens who doubt the government\'s integrity are less likely to believe their involvement can influence policy.',
  },
  {
    id: 6412,
    subject: 'ap_us_government',
    unit: 4,
    lessonIDS: ['4.2'],
    unitName: 'American Political Ideologies and Beliefs',
    questionGroup: 'u4-concept-socialization-family',
    question:
      'Which agent of political socialization is generally considered the most influential in the early development of a child’s political values?',
    image: null,
    options: ['The family.', 'Political interest groups.', 'The Federal Reserve.', 'Campaign commercials.'],
    correctAnswer: 'A',
    explanation:
      'The family is historically the first and most powerful influence on a person’s developing political values, providing a primary foundation for later views.',
  },
  {
    id: 6413,
    subject: 'ap_us_government',
    unit: 4,
    lessonIDS: ['4.8'],
    unitName: 'American Political Ideologies and Beliefs',
    questionGroup: 'u4-concept-policy-stability',
    question:
      'Public policies in the United States often reflect a balance between individual liberty and public order. An example of this balance is:',
    image: null,
    options: [
      'Allowing citizens to own weapons while also passing laws that restrict types of weapons in certain areas.',
      'The total abolition of all police forces to maximize individual freedom.',
      'The government mandating that all citizens agree on a single political ideology.',
      'The government banning all forms of speech that are critical of the ruling party.',
    ],
    correctAnswer: 'A',
    explanation:
      'This illustrates the inherent tension in American policy: protecting the 2nd Amendment (individual liberty) while simultaneously implementing measures to maintain public order (safety).',
  },
  {
    id: 6414,
    subject: 'ap_us_government',
    unit: 4,
    lessonIDS: ['4.1'],
    unitName: 'American Political Ideologies and Beliefs',
    questionGroup: 'u4-concept-core-values',
    question:
      'A state legislature passes a law requiring all citizens to obtain a permit before holding a public demonstration. A civil liberties group challenges the law, arguing it violates a foundational American value. Which core American value is most directly at stake?',
    image: null,
    options: [
      'Equality of result, because the permit requirement treats all citizens the same.',
      'Limited government, because the law expands state power over individual expression.',
      'Laissez-faire capitalism, because demonstrations are a form of economic activity.',
      'Popular sovereignty, because only elected officials should be allowed to demonstrate.',
    ],
    correctAnswer: 'B',
    explanation:
      'Limited government is the principle that state power should be constrained and not infringe on individual liberties. Requiring a permit to demonstrate is a direct expansion of government control over personal expression.',
  },
  {
    id: 6415,
    subject: 'ap_us_government',
    unit: 4,
    lessonIDS: ['4.2'],
    unitName: 'American Political Ideologies and Beliefs',
    questionGroup: 'u4-concept-socialization-media',
    question:
      'A teenager who primarily consumes political content through social media algorithms begins to hold increasingly extreme views compared to their parents. Which of the following best explains this divergence through the lens of political socialization?',
    image: null,
    options: [
      'The life cycle effect, because teenagers naturally adopt more extreme views as they age.',
      'The influence of a new socialization agent — social media — exposing the teenager to a narrower, more polarized information environment than traditional media.',
      'A generational effect, because all teenagers in this era will permanently hold more extreme views.',
      'Peer pressure from classmates overriding the family as the primary socialization agent.',
    ],
    correctAnswer: 'B',
    explanation:
      'Political socialization occurs through multiple agents. Social media algorithms can act as a powerful socialization force by creating information "bubbles" that reinforce extreme views, diverging from the family\'s influence.',
  },
  {
    id: 6416,
    subject: 'ap_us_government',
    unit: 4,
    lessonIDS: ['4.5'],
    unitName: 'American Political Ideologies and Beliefs',
    questionGroup: 'u4-concept-polling-bias',
    question:
      'A poll reports that 72% of Americans support stricter environmental regulations, with a margin of error of ±3%. A senator dismisses the poll, arguing it oversampled urban residents. Which of the following best evaluates the senator\'s critique?',
    image: null,
    options: [
      'The senator\'s critique is irrelevant because a margin of error of ±3% guarantees the sample is representative.',
      'The senator raises a valid methodological concern, because sampling bias toward urban residents could systematically overstate support for environmental regulation.',
      'The senator\'s critique is invalid because polls with large sample sizes are always accurate.',
      'The senator is correct that all polls overstate support for environmental regulation due to social desirability bias.',
    ],
    correctAnswer: 'B',
    explanation:
      'A margin of error addresses random sampling variation but does not correct for systematic sampling bias. If urban residents are overrepresented and hold distinct views on environmental policy, the poll\'s results may not reflect national opinion accurately.',
  },
  {
    id: 6417,
    subject: 'ap_us_government',
    unit: 4,
    lessonIDS: ['4.6'],
    unitName: 'American Political Ideologies and Beliefs',
    questionGroup: 'u4-concept-polling-types',
    question:
      'A campaign releases an internal poll two weeks before an election showing their candidate leading by 12 points. A week later, a neutral university releases a poll showing the same candidate leading by only 3 points. Which of the following best explains how a political scientist should interpret these results?',
    image: null,
    options: [
      'The campaign\'s internal poll is more accurate because it had access to more voter data.',
      'The university poll should be weighted more heavily because it comes from an independent source with transparent methodology, while internal campaign polls may reflect motivated reasoning.',
      'Both polls are equally valid because they were conducted in the same election cycle.',
      'Neither poll is reliable because they were conducted before Election Day.',
    ],
    correctAnswer: 'B',
    explanation:
      'Independent polls with transparent methodology are generally more credible than internal campaign polls, which may be subject to motivated reasoning, selective sampling, or strategic release.',
  },
  {
    id: 6418,
    subject: 'ap_us_government',
    unit: 4,
    lessonIDS: ['4.7'],
    unitName: 'American Political Ideologies and Beliefs',
    questionGroup: 'u4-concept-ideology-parties',
    question:
      'Over the past several decades, the ideological composition of both major political parties has become more homogeneous. Which of the following is the most likely consequence of this trend?',
    image: null,
    options: [
      'A decrease in partisan gridlock, because unified parties are more efficient at passing legislation.',
      'An increase in bipartisan compromise, because homogeneous parties share more policy goals.',
      'An increase in partisan polarization, making cross-party legislative compromise more difficult.',
      'A reduction in voter turnout, because homogeneous parties offer voters fewer meaningful choices.',
    ],
    correctAnswer: 'C',
    explanation:
      'As parties have become more ideologically sorted — with conservatives concentrated in the Republican Party and liberals in the Democratic Party — the ideological distance between them has grown, making compromise harder and gridlock more common.',
  },
  {
    id: 6419,
    subject: 'ap_us_government',
    unit: 4,
    lessonIDS: ['4.8'],
    unitName: 'American Political Ideologies and Beliefs',
    questionGroup: 'u4-concept-policymaking-ideology',
    question:
      'Question 19 refers to the following table.\n\nWhich of the following conclusions is best supported by this data?',
    image: null,
    tableData: {
      headers: ['Ideological identification', 'Policy position', 'Support'],
      rows: [
        ['Self-identified conservatives', 'Increasing defense spending', '68%'],
        ['Self-identified liberals', 'Expanding Medicaid eligibility', '71%'],
      ],
    },
    options: [
      'Political ideology has no measurable effect on policy preferences.',
      'A majority of all Americans support both defense spending and Medicaid expansion simultaneously.',
      'Self-identified ideological groups show distinct and predictable policy preferences consistent with their broader ideological frameworks.',
      'Conservatives and liberals agree on most major policy issues despite their ideological differences.',
    ],
    correctAnswer: 'C',
    explanation:
      'The data shows that conservatives and liberals hold predictable, distinct policy preferences — defense spending aligns with conservative priorities (national security, strong military), while Medicaid expansion aligns with liberal priorities (government role in healthcare access).',
  },
  {
    id: 6420,
    subject: 'ap_us_government',
    unit: 4,
    lessonIDS: ['4.3'],
    unitName: 'American Political Ideologies and Beliefs',
    questionGroup: 'u4-concept-demographic-opinion',
    question:
      'Research consistently shows that younger voters are more likely to support expansive government social programs than older voters. Which of the following best explains this pattern using concepts from political socialization?',
    image: null,
    options: [
      'Older voters have lower levels of education and are therefore less informed about social programs.',
      'Younger voters are more influenced by peer groups, which always favor liberal policies.',
      'A combination of life cycle effects — where younger people have less accumulated wealth and property to protect — and generational effects from coming of age in a period of rising economic inequality.',
      'Older voters consistently vote at lower rates, reducing the influence of their preferences on policy.',
    ],
    correctAnswer: 'C',
    explanation:
      'Both life cycle effects (younger people have different economic stakes) and generational effects (cohorts shaped by specific economic conditions) help explain age-based differences in policy preferences — a more nuanced explanation than simple partisanship.',
  },
];
