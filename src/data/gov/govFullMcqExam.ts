import type { Question } from '@/data/questionBanks/types';

/**
 * AP U.S. Government & Politics — full-length MCQ practice exam (55 questions).
 * IDs 6601-6655 (6401-6455 belong to the Unit 4 MCQ test). Graphic stimuli live in S3 under
 * unitTestImages/gov/final_exam_mcq/.
 *
 * Stimulus sets say "this question and the next N" rather than fixed question numbers, so the set
 * still reads correctly if questions are reordered or reused in practice.
 */
export const govFullMcqExamQuestions: Question[] = [
  {
    id: 6601,
    subject: 'ap_us_government',
    unit: 2,
    lessonIDS: ['2.1'],
    unitName: 'Interactions Among Branches of Government',
    questionGroup: 'u2-ind-chamber-powers',
    question:
      'Congress is considering two measures: a bill to raise federal income tax rates and a treaty negotiated with a foreign government. Which of the following accurately describes the constitutional process for each?',
    image: null,
    options: [
      'The tax bill must originate in the Senate, and the treaty must be approved by a majority of the House.',
      'The tax bill must originate in the House, and the treaty must be approved by two-thirds of the Senate.',
      'The tax bill may originate in either chamber, and the treaty must be approved by two-thirds of both chambers.',
      'The tax bill must originate in the House, and the treaty takes effect once signed, with the Senate serving in an advisory role.',
    ],
    correctAnswer: 'B',
    explanation:
      'The Origination Clause (Article I, Section 7) requires revenue bills to begin in the House, while only the Senate gives advice and consent to treaties, which takes a two-thirds vote of senators present. Choice C wrongly gives the House a role in approving treaties.',
  },
  {
    id: 6602,
    subject: 'ap_us_government',
    unit: 2,
    lessonIDS: ['2.2'],
    unitName: 'Interactions Among Branches of Government',
    questionGroup: 'u2-ind-filibuster',
    question:
      'A bill supported by 55 of the 100 senators is blocked from a final vote after opponents keep debate going on the Senate floor, and a motion to end debate receives only 55 votes. Which of the following best explains why the bill did not receive a vote?',
    image: null,
    options: [
      'Ending debate on most bills takes three-fifths of the Senate, so a determined minority can block a final vote on a bill.',
      'The Senate Rules Committee refused to issue a rule that would set time limits for debate and amendments on the bill.',
      'A bill must receive the support of two-thirds of senators before it can leave the Senate floor and be sent to the House.',
      'The president announced a veto threat, and Senate rules bar a final vote on a bill that the president has promised to veto.',
    ],
    correctAnswer: 'A',
    explanation:
      'Cloture, the procedure that ends a filibuster, takes three-fifths of the Senate (60 votes) on most legislation, so 55 is not enough. Choice B is wrong because the Senate has no equivalent of the House Rules Committee\'s special rules; Senate debate is usually limited by cloture or by unanimous consent agreements. Choice D is wrong because no Senate rule blocks a vote on a bill that faces a veto threat.',
  },
  {
    id: 6603,
    subject: 'ap_us_government',
    unit: 2,
    lessonIDS: ['2.2'],
    unitName: 'Interactions Among Branches of Government',
    questionGroup: 'u2-ind-logrolling',
    question:
      'A representative from a farming district agrees to vote for a bill funding urban public transit, and in return a representative from a large city agrees to vote for a bill increasing crop subsidies. Which of the following best describes this arrangement?',
    image: null,
    options: [
      'Oversight, in which members of Congress review how executive agencies carry out the laws',
      'Casework, in which members help constituents navigate problems with federal agencies',
      'Pork-barrel spending, in which a member directs federal money to projects in a home district',
      'Logrolling, in which members trade votes to pass legislation that matters to each of them',
    ],
    correctAnswer: 'D',
    explanation:
      'Logrolling is a vote trade between members. Pork-barrel spending (C) is about targeting funds to a district, but the scenario centers on the exchange of support between two members.',
  },
  {
    id: 6604,
    subject: 'ap_us_government',
    unit: 2,
    lessonIDS: ['2.2'],
    unitName: 'Interactions Among Branches of Government',
    questionGroup: 'u2-ind-discharge',
    question:
      'A majority of House members support a bill, but the chair of the committee holding it has refused to schedule it for a vote. Which of the following procedures could supporters use to bring the bill to the House floor?',
    image: null,
    options: [
      'A cloture petition signed by sixty members of the House to end debate',
      'A motion to recommit, which returns a bill on the floor to the committee that reported it',
      'A discharge petition signed by a majority of the members of the House',
      'A conference committee report approved by the leaders of both parties',
    ],
    correctAnswer: 'C',
    explanation:
      'A discharge petition signed by a majority of the House (218 members) forces a bill out of committee. Cloture (A) is a Senate procedure for ending debate, a motion to recommit (B) sends a bill back to committee rather than moving it out, and conference committees (D) reconcile bills that have already passed both chambers.',
  },
  {
    id: 6605,
    subject: 'ap_us_government',
    unit: 2,
    lessonIDS: ['2.4', '2.5'],
    unitName: 'Interactions Among Branches of Government',
    questionGroup: 'u2-ind-exec-agreement',
    question:
      'A president reaches an agreement with an allied nation to cooperate on cybersecurity and does not submit it to the Senate for approval. How does this type of agreement differ from a treaty?',
    image: null,
    options: [
      'It must be approved by a majority vote in both chambers of Congress rather than by two-thirds of the Senate.',
      'It skips the two-thirds Senate vote, although a later president can reverse it more easily than a treaty.',
      'It carries the same legal permanence as a treaty, so later administrations are bound by it once it is signed.',
      'It applies to the executive agencies that carry it out but is not binding on the United States as a nation.',
    ],
    correctAnswer: 'B',
    explanation:
      'An executive agreement made on the president\'s own authority skips the two-thirds Senate vote, but it is less durable than a treaty because a later president can end it more easily. Choice A describes a congressional-executive agreement, which Congress approves by majority votes, and choice C is wrong because executive agreements lack a treaty\'s permanence.',
  },
  {
    id: 6606,
    subject: 'ap_us_government',
    unit: 2,
    lessonIDS: ['2.4', '2.5'],
    unitName: 'Interactions Among Branches of Government',
    questionGroup: 'u2-ind-veto-override',
    question:
      'The president vetoes a bill. With every member of both chambers present and voting, 300 of the 435 House members and 62 of the 100 senators vote to override. What is the result?',
    image: null,
    options: [
      'The veto is overridden because a majority of each chamber voted to override.',
      'The veto is overridden because the House, where the bill began, reached the threshold.',
      'The veto stands because the House vote fell below the number needed for an override.',
      'The veto stands because the Senate vote fell short of the two-thirds needed for an override.',
    ],
    correctAnswer: 'D',
    explanation:
      'An override requires a two-thirds vote of the members present and voting in each chamber; with full attendance that is 290 in the House (300 meets this) and 67 in the Senate (62 falls short). Choice A confuses the override threshold with a simple majority.',
  },
  {
    id: 6607,
    subject: 'ap_us_government',
    unit: 2,
    lessonIDS: ['2.7'],
    unitName: 'Interactions Among Branches of Government',
    questionGroup: 'u2-ind-bully-pulpit',
    question:
      'A president gives a televised address urging citizens to contact their members of Congress in support of a stalled bill. Which of the following best describes this exercise of presidential power?',
    image: null,
    options: [
      'An informal power, using the visibility of the office to build public pressure on Congress',
      'A formal power, recommending measures to Congress as authorized by Article II',
      'A formal power, calling Congress into extraordinary session to consider the bill',
      'An informal power, withholding information from Congress to protect executive communications',
    ],
    correctAnswer: 'A',
    explanation:
      'Appealing directly to the public to pressure legislators is the informal "bully pulpit" power. The constitutional power to recommend measures (B) is exercised through communication to Congress, such as the State of the Union, not appeals to citizens.',
  },
  {
    id: 6608,
    subject: 'ap_us_government',
    unit: 5,
    lessonIDS: ['5.3'],
    unitName: 'Political Participation',
    questionGroup: 'u5-ind-party-linkage',
    question:
      'A statewide organization holds a convention to adopt a platform, nominates a slate of people who will appear on the general election ballot under its name, and sends volunteers to register residents in low-turnout neighborhoods. Which of the following best describes the organization and its role?',
    image: null,
    options: [
      'An interest group, which links citizens to government by advocating for policy positions on a narrow set of issues',
      'A political party, which links citizens to government by contesting races for office and mobilizing supporters',
      'A political action committee, which links citizens to government by pooling donations to support favored candidates',
      'A social movement, which links citizens to government through protests aimed at shifting public opinion on an issue',
    ],
    correctAnswer: 'B',
    explanation:
      'Nominating candidates who run under the organization\'s own label, writing a platform, and mobilizing voters are functions of a political party acting as a linkage institution. Choice A is wrong because interest groups may endorse and support candidates, but they do not nominate their own candidates to appear on the ballot under the group\'s name.',
  },
  {
    id: 6609,
    subject: 'ap_us_government',
    unit: 2,
    lessonIDS: ['2.11', '2.9'],
    unitName: 'Interactions Among Branches of Government',
    questionGroup: 'u2-ind-judicial-restraint',
    question:
      'In a concurring opinion, a Supreme Court justice writes that courts should be reluctant to substitute their own judgment for that of legislatures and should rarely overturn earlier decisions of the Court. Which of the following best describes this judicial philosophy?',
    image: null,
    options: [
      'Judicial activism, in which judges use their rulings to correct what they see as policy failures by the other branches',
      'Judicial restraint, in which judges limit their own role in shaping policy and adhere to stare decisis in later cases',
      'Judicial independence, in which judges are insulated from political pressure by life tenure',
      'Judicial review, in which courts evaluate whether laws and executive actions are constitutional',
    ],
    correctAnswer: 'B',
    explanation:
      'Judicial restraint holds that courts should defer to elected officials and respect precedent (stare decisis). Judicial activism (A) is the opposite approach, in which judges are more willing to overturn laws and precedent to shape policy.',
  },
  {
    id: 6610,
    subject: 'ap_us_government',
    unit: 2,
    lessonIDS: ['2.11'],
    unitName: 'Interactions Among Branches of Government',
    questionGroup: 'u2-ind-statute-response',
    question:
      'After the Supreme Court interprets a federal statute more narrowly than Congress intended, Congress passes a new law clarifying what the statute means. This is best described as an example of which of the following?',
    image: null,
    options: [
      'The judiciary using judicial review to strike down a federal law as unconstitutional',
      'The legislative branch using impeachment to remove federal judges from office',
      'The legislative branch proposing an amendment to reverse a constitutional ruling',
      'A legislative check on the judiciary exercised through the ordinary lawmaking process',
    ],
    correctAnswer: 'D',
    explanation:
      'Congress can answer a statutory interpretation it disagrees with by passing a new law, a legislative check on the courts. A constitutional amendment (C) is the route only when the ruling rests on the Constitution rather than a statute.',
  },
  {
    id: 6611,
    subject: 'ap_us_government',
    unit: 2,
    lessonIDS: ['2.13'],
    unitName: 'Interactions Among Branches of Government',
    questionGroup: 'u2-ind-rulemaking',
    question:
      'Congress passes a law requiring cleaner air and gives a federal agency authority to set specific emission limits. The agency publishes proposed limits, accepts public comments, and then issues final rules that carry the force of law. Which of the following best describes the agency\'s action?',
    image: null,
    options: [
      'Rulemaking under authority delegated by Congress to fill in the details of a broad statute',
      'A legislative veto, in which Congress overrules an agency decision after the agency issues it',
      'Use of executive order authority drawn directly from the president\'s constitutional powers',
      'Congressional oversight, in which a committee investigates how an agency has carried out a law',
    ],
    correctAnswer: 'A',
    explanation:
      'Agencies make rules with the force of law when Congress delegates that authority. Oversight (D) is Congress reviewing the agency, not the agency writing regulations.',
  },
  {
    id: 6612,
    subject: 'ap_us_government',
    unit: 2,
    lessonIDS: ['2.12'],
    unitName: 'Interactions Among Branches of Government',
    questionGroup: 'u2-ind-iron-triangle',
    question:
      'A House committee that funds a federal agency, the agency itself, and an industry group that lobbies on the agency\'s policies maintain a stable relationship in which each supports the goals of the others. Which of the following best describes this relationship?',
    image: null,
    options: [
      'Pluralism, in which many competing interests have roughly equal influence over agency decisions',
      'An issue network, in which many temporary participants join a debate and then drift away',
      'An iron triangle, a lasting alliance of policy actors that tends to shut out competing interests',
      'Bureaucratic discretion, in which an agency chooses how to apply a law without outside input',
    ],
    correctAnswer: 'C',
    explanation:
      'This describes an iron triangle: a stable, mutually beneficial alliance. An issue network (B) is looser and includes changing participants such as experts and media.',
  },
  {
    id: 6613,
    subject: 'ap_us_government',
    unit: 1,
    lessonIDS: ['1.3'],
    unitName: 'Foundations of American Democracy',
    questionGroup: 'u1-ind-fed10-brutus-merger',
    question:
      'A state legislature is debating whether to merge five small neighboring counties into one large regional government. Applying the arguments of Federalist No. 10 and Brutus No. 1, which of the following correctly predicts how each author would respond?',
    image: null,
    options: [
      'Federalist No. 10 would favor it because a larger population dilutes factions; Brutus No. 1 would also favor it because larger governments protect rights more reliably.',
      'Federalist No. 10 would oppose it because factions are easier to control in a small community; Brutus No. 1 would oppose it because distant representatives lose touch with citizens.',
      'Federalist No. 10 would favor it because a larger, more diverse population makes faction dominance harder; Brutus No. 1 would oppose it because distant representatives lose touch with citizens.',
      'Federalist No. 10 would oppose it because representatives of a large area lack accountability; Brutus No. 1 would favor it because a large republic unites citizens with similar interests.',
    ],
    correctAnswer: 'C',
    explanation:
      'Madison argued that an extended republic with many interests makes it harder for any single faction to form a majority, while the Anti-Federalist author of Brutus No. 1 argued that a large republic separates representatives from the people. Choice D reverses the authors\' positions, since Brutus held that republics work best when citizens share similar interests and are close to their government.',
  },
  {
    id: 6614,
    subject: 'ap_us_government',
    unit: 1,
    lessonIDS: ['1.8'],
    unitName: 'Foundations of American Democracy',
    questionGroup: 'u1-ind-lopez-knife',
    question:
      'Congress passes a law making it a federal crime to possess a knife with a blade longer than four inches on the grounds of any public school. The statute does not regulate any commercial activity, and Congress included no findings linking school knife possession to interstate commerce. A student charged under the law challenges its constitutionality. Based on United States v. Lopez (1995), how is the Supreme Court most likely to rule?',
    image: null,
    options: [
      'It will strike down the law because school knife possession is not economic activity and has too weak a link to interstate commerce.',
      'It will uphold the law because school violence reduces educational quality, which in the long run affects the national economy and so interstate commerce.',
      'It will uphold the law because the Necessary and Proper Clause lets Congress pass criminal laws that help states keep their schools safe.',
      'It will uphold the law because the Supremacy Clause makes federal criminal laws prevail over the weapons policies of local school districts.',
    ],
    correctAnswer: 'A',
    explanation:
      'In Lopez the Court held that Congress exceeded its Commerce Clause power by banning gun possession in school zones, a noneconomic activity with no substantial link to interstate commerce. Choice B repeats the government\'s argument that the Court rejected, since it would let Congress regulate almost any activity.',
  },
  {
    id: 6615,
    subject: 'ap_us_government',
    unit: 1,
    lessonIDS: ['1.2'],
    unitName: 'Foundations of American Democracy',
    questionGroup: 'u1-ind-elite-model',
    question:
      'In a mid-sized city, a small circle of wealthy developers, bankers, and owners of the largest local employers meets privately to set the city\'s priorities. The elected council usually approves their proposals, and most residents rarely attend meetings or contact officials. Which model of democracy does this situation best illustrate?',
    image: null,
    options: [
      'Pluralist democracy, in which many competing organized groups bargain to shape policy',
      'Participatory democracy, in which broad citizen involvement drives local decisions',
      'Direct democracy, in which residents vote on each policy through ballot measures',
      'Elite democracy, in which a small, resourceful group dominates policy decisions',
    ],
    correctAnswer: 'D',
    explanation:
      'Elite democracy holds that a small group with wealth and organization shapes policy while most citizens are not engaged. Pluralist democracy (A) would require many groups of varied strength competing, not one narrow circle setting priorities.',
  },
  {
    id: 6616,
    subject: 'ap_us_government',
    unit: 1,
    lessonIDS: ['1.8'],
    unitName: 'Foundations of American Democracy',
    questionGroup: 'u1-ind-mcculloch-license',
    question:
      'Congress creates a federal corporation to sell flood insurance, citing its power to regulate interstate commerce. A state then passes a law requiring any corporation chartered by Congress to buy a $5 million annual state license before it may operate in the state. Based on McCulloch v. Maryland (1819), how would a court most likely rule?',
    image: null,
    options: [
      'The state law is invalid, because Congress may create the corporation as a necessary and proper means and states may not burden it.',
      'The state law is valid, because the Tenth Amendment reserves to the states the power to charter and license corporations in their borders.',
      'The federal corporation is invalid, because Article I does not list chartering corporations among the powers granted to Congress.',
      'The state law is valid, because taxing is a concurrent power, so states may impose fees on any business operating within their borders.',
    ],
    correctAnswer: 'A',
    explanation:
      'McCulloch held that the Necessary and Proper Clause gives Congress implied powers to carry out its enumerated powers, and that under the Supremacy Clause a state may not tax or burden a legitimate federal institution. Choice D is wrong because McCulloch held that a state may not tax or burden the operations of a legitimate federal institution, even though taxing is otherwise a concurrent power.',
  },
  {
    id: 6617,
    subject: 'ap_us_government',
    unit: 3,
    lessonIDS: ['3.2'],
    unitName: 'Civil Liberties and Civil Rights',
    questionGroup: 'u3-ind-engel-loudspeaker',
    question:
      'A public school board invites a different local clergy member each week to deliver a short prayer over the school\'s loudspeaker at the start of homeroom. Students who object may wait in the hallway until the prayer ends. A parent sues the district. Based on Engel v. Vitale (1962), how would a court most likely rule?',
    image: null,
    options: [
      'The practice is constitutional, because students who object may leave the room, so no student is required to take part in the prayer.',
      'The practice is unconstitutional, because school sponsorship of prayer violates the Establishment Clause even if taking part is voluntary.',
      'The practice is constitutional, because the prayer is given by a private clergy member rather than by a teacher or other school employee.',
      'The practice is unconstitutional, because the Free Exercise Clause forbids public schools from permitting religious speech during class hours.',
    ],
    correctAnswer: 'B',
    explanation:
      'Engel held that government-sponsored prayer in public schools violates the Establishment Clause even when it is nondenominational and students may decline to participate. Choice A is wrong because Engel rejected the argument that making participation voluntary cures the school\'s sponsorship of the prayer.',
  },
  {
    id: 6618,
    subject: 'ap_us_government',
    unit: 3,
    lessonIDS: ['3.8'],
    unitName: 'Civil Liberties and Civil Rights',
    questionGroup: 'u3-ind-gideon-felony',
    question:
      'A man who cannot afford a lawyer is charged with a felony in a state court. The judge refuses to appoint counsel, noting that the state\'s own law provides lawyers only in capital cases. Which of the following arguments is the man\'s strongest basis for challenging the refusal under Gideon v. Wainwright (1963)?',
    image: null,
    options: [
      'The Fifth Amendment protects defendants from being forced to speak at trial, which requires an attorney to be present for defendants.',
      'The Eighth Amendment bars cruel and unusual punishment, so a defendant too poor to hire a lawyer cannot be convicted without one.',
      'The Sixth Amendment right to counsel binds the federal government, so the man must ask Congress to extend it to state courts.',
      'The Sixth Amendment right to counsel reaches the states through the Fourteenth Amendment, so a lawyer must be provided.',
    ],
    correctAnswer: 'D',
    explanation:
      'Gideon held that the Sixth Amendment right to counsel is incorporated through the Fourteenth Amendment\'s Due Process Clause, so states must provide lawyers to poor felony defendants. Choice C reflects the pre-incorporation view that the Bill of Rights restrained only the national government.',
  },
  {
    id: 6619,
    subject: 'ap_us_government',
    unit: 3,
    lessonIDS: ['3.12', '3.10'],
    unitName: 'Civil Liberties and Civil Rights',
    questionGroup: 'u3-ind-brown-library',
    question:
      'In 1957, a city runs separate public libraries for Black and white residents. The city shows that the two buildings have similar collections, hours, and staff, and argues that the arrangement is therefore lawful. Black residents sue to use the branch nearest their homes. Which ruling would be most consistent with the reasoning of Brown v. Board of Education (1954)?',
    image: null,
    options: [
      'The arrangement is lawful, because the city provides facilities of comparable quality, as Plessy v. Ferguson (1896) permits.',
      'The arrangement is lawful, because Brown concerned public schools and does not reach other services that a city provides.',
      'The arrangement is unlawful, because government-imposed racial separation denies equal protection even when facilities match.',
      'The arrangement is unlawful, because Title II of the Civil Rights Act bars racial segregation in places of public accommodation.',
    ],
    correctAnswer: 'C',
    explanation:
      'Brown held that state-mandated racial segregation is inherently unequal and violates the Fourteenth Amendment\'s Equal Protection Clause, and courts soon applied that reasoning to other public facilities. Choice D is wrong because the Civil Rights Act was not passed until 1964, after the events in this case.',
  },
  {
    id: 6620,
    subject: 'ap_us_government',
    unit: 3,
    lessonIDS: ['3.2'],
    unitName: 'Civil Liberties and Civil Rights',
    questionGroup: 'u3-ind-yoder-school',
    question:
      'A state requires all children to attend school until age 16. A family belonging to a long-established religious community with a traditional agricultural way of life objects, arguing that formal schooling after eighth grade conflicts with its faith. The community trains its teenagers in farming and household skills. Based on Wisconsin v. Yoder (1972), how is the Court most likely to rule?',
    image: null,
    options: [
      'For the state, because the Establishment Clause forbids exempting a religious group from laws that bind other families.',
      'For the state, because the government\'s interest in educating children outweighs religious objections in most cases.',
      'For the family, because the Establishment Clause bars public schools from teaching material that conflicts with its religion.',
      'For the family, because the Free Exercise Clause protects the community\'s sincere practice absent a compelling state interest.',
    ],
    correctAnswer: 'D',
    explanation:
      'In Yoder the Court held that compulsory attendance past eighth grade burdened Amish free exercise rights and that the state\'s interest did not justify it for a community that provided vocational training. Choice A confuses the two religion clauses, since an exemption protecting free exercise does not establish a religion.',
  },
  {
    id: 6621,
    subject: 'ap_us_government',
    unit: 3,
    lessonIDS: ['3.11'],
    unitName: 'Civil Liberties and Civil Rights',
    questionGroup: 'u3-ind-cra-1964',
    question:
      'A privately owned restaurant in a southern state refused in 1966 to serve customers because of their race. The owner argued that the Fourteenth Amendment\'s Equal Protection Clause restricts only governments. Which of the following correctly identifies the federal law that prohibited the restaurant\'s practice and the power Congress used to enact it?',
    image: null,
    options: [
      'The Civil Rights Act of 1875, which Congress based on its power to enforce the Fourteenth Amendment.',
      'The Voting Rights Act of 1965, which Congress based on its power to enforce the Fifteenth Amendment.',
      'The Civil Rights Act of 1964, which Congress based on its power to regulate interstate commerce.',
      'The Fair Housing Act of 1968, which Congress based on its power to regulate interstate commerce.',
    ],
    correctAnswer: 'C',
    explanation:
      'Title II of the Civil Rights Act of 1964 banned discrimination in public accommodations and was upheld under the Commerce Clause. Choice A names an 1875 law that the Court struck down in the Civil Rights Cases (1883), and choice D names a 1968 law that did not yet exist in 1966.',
  },
  {
    id: 6622,
    subject: 'ap_us_government',
    unit: 3,
    lessonIDS: ['3.3'],
    unitName: 'Civil Liberties and Civil Rights',
    questionGroup: 'u3-ind-schenck-leaflets',
    question:
      'During a war, a man prints and mails leaflets to men who have been drafted, urging them to refuse to report for military service. He is convicted under a federal law that makes it a crime to obstruct military recruitment. Based on Schenck v. United States (1919), how would the Supreme Court most likely rule on his First Amendment challenge?',
    image: null,
    options: [
      'The conviction stands, because in wartime the leaflets created a clear and present danger of a harm that Congress may prevent.',
      'The conviction is overturned, because political speech criticizing government policy receives absolute First Amendment protection.',
      'The conviction stands, because the First Amendment protects spoken words but not printed materials sent through the mail.',
      'The conviction is overturned, because the First Amendment bars Congress from passing any law about military recruitment.',
    ],
    correctAnswer: 'A',
    explanation:
      'In Schenck the Court upheld a conviction for distributing anti-draft leaflets, holding that speech is not protected when it creates a "clear and present danger" of bringing about evils that Congress has a right to prevent, a danger the Court found greater in wartime. Choice B is wrong because free speech has never been treated as absolute; the Court later narrowed the standard in Brandenburg v. Ohio (1969), but Schenck itself upheld the conviction.',
  },
  {
    id: 6623,
    subject: 'ap_us_government',
    unit: 4,
    lessonIDS: ['4.9', '4.10'],
    unitName: 'American Political Ideologies and Beliefs',
    questionGroup: 'u4-ind-libertarian',
    question:
      'A candidate for state office campaigns on eliminating most business regulations, cutting taxes sharply, and legalizing recreational drug use. Which ideology does this combination of positions best reflect?',
    image: null,
    options: [
      'Conservative, because the candidate wants limited regulation of business along with a government role in promoting traditional social norms.',
      'Libertarian, because the candidate favors a minimal role for government in both the economy and in people\'s personal lives.',
      'Liberal, because the candidate wants to protect civil liberties along with an active government role in correcting market outcomes.',
      'Socialist, because the candidate wants broad personal freedom along with government ownership of the major industries.',
    ],
    correctAnswer: 'B',
    explanation:
      'Libertarians favor minimal government in both the economic and social spheres. Choice A is wrong because conservatives generally support limited economic regulation but also back government action to uphold traditional social values.',
  },
  {
    id: 6624,
    subject: 'ap_us_government',
    unit: 4,
    lessonIDS: ['4.6'],
    unitName: 'American Political Ideologies and Beliefs',
    questionGroup: 'u4-ind-poll-sampling',
    question:
      'A website posts a link to an online poll asking visitors whether they support a proposed city tax, and 70 percent of the 1,000 people who respond say yes. A city official claims the result shows what residents as a whole believe. Which of the following is the strongest criticism of that claim?',
    image: null,
    options: [
      'With about 1,000 respondents, the sample is too small for a poll of any city to produce a meaningful margin of error.',
      'The poll counted the views of residents who pay the tax, so the views of other residents of the city were left out of the results.',
      'A single poll cannot show a trend, so the result is unreliable until the same question is asked again over several months.',
      'Respondents chose themselves instead of being randomly picked, so the sample may not represent the city\'s residents.',
    ],
    correctAnswer: 'D',
    explanation:
      'Public opinion polls rely on random sampling so every resident has a similar chance to be chosen; a self-selected sample can be biased. Choice A is wrong because a properly randomized sample of about 1,000 can yield a small margin of error.',
  },
  {
    id: 6625,
    subject: 'ap_us_government',
    unit: 2,
    lessonIDS: ['2.5', '2.11'],
    unitName: 'Interactions Among Branches of Government',
    questionGroup: 'u2-ind-scotus-confirmation',
    question:
      'A Supreme Court justice retires while the president\'s party holds 49 of the 100 Senate seats. The president\'s nominee testifies before the Senate Judiciary Committee, and on the final floor vote 52 senators vote to confirm and 48 vote against. Which of the following best describes the result?',
    image: null,
    options: [
      'The nominee is confirmed, because a majority of the senators voting is enough to approve a Supreme Court nomination.',
      'The nominee is rejected, because ending debate on a Supreme Court nomination requires the votes of at least sixty senators.',
      'The nominee is rejected, because judicial appointments, like treaties, require the consent of two-thirds of the Senate.',
      'The nominee is approved by the Senate but must also win a majority vote in the House before taking a seat on the Court.',
    ],
    correctAnswer: 'A',
    explanation:
      'Confirmation of a presidential nominee takes a majority of senators voting, and since 2017 Senate rules also let a simple majority end debate on Supreme Court nominations. Choice B describes the 60-vote cloture threshold that applied to Supreme Court nominations before the Senate changed its rules in 2017.',
  },
  {
    id: 6626,
    subject: 'ap_us_government',
    unit: 5,
    lessonIDS: ['5.11'],
    unitName: 'Political Participation',
    questionGroup: 'u5-ind-citizens-united',
    question:
      'A nonprofit corporation uses money from its general treasury to produce and air television ads urging voters to oppose a candidate for Congress. The corporation does not coordinate with the candidate\'s opponent. Based on the Supreme Court\'s decision in Citizens United v. FEC (2010), which of the following is most accurate?',
    image: null,
    options: [
      'The ads can be banned, because the Court held that corporations have no First Amendment rights and may not spend money to influence elections.',
      'The ads are allowed if the corporation first forms a political action committee and stays within the hard-money limits on contributions.',
      'The ads are protected political speech, and the government may not limit independent political spending by corporations or unions.',
      'The ads are allowed, because the Court ruled that corporations may give unlimited sums directly to the campaign of a candidate.',
    ],
    correctAnswer: 'C',
    explanation:
      'Citizens United held that the First Amendment protects independent political expenditures by corporations, which opened the way for super PACs. Choice D is wrong because limits on direct contributions to candidates remain in place.',
  },
  {
    id: 6627,
    subject: 'ap_us_government',
    unit: 5,
    lessonIDS: ['5.6'],
    unitName: 'Political Participation',
    questionGroup: 'u5-ind-free-rider',
    question:
      'A national association of independent pharmacies lobbies for a law raising the payments that pharmacies receive from Medicaid. Any increase it wins will go to every independent pharmacy, whether or not it belongs to the association. To build its membership, the association begins offering members discounted insurance, a trade magazine, and training credits. Which of the following best explains this strategy?',
    image: null,
    options: [
      'Building an iron triangle by offering services that win the support of agency officials and the staff of key committees',
      'Offering selective benefits to overcome the free-rider problem that discourages pharmacies from paying to join',
      'Engaging in electioneering by using benefits to mobilize pharmacy owners to vote for candidates the group endorses',
      'Conducting grassroots lobbying by giving pharmacy owners resources to contact their own members of Congress',
    ],
    correctAnswer: 'B',
    explanation:
      'Because a policy win benefits all pharmacies, many have an incentive to free ride; benefits available only to members, called selective benefits, give them a reason to join. Choice D is wrong because grassroots lobbying means mobilizing members to pressure officials, while these benefits are aimed at recruiting and keeping members.',
  },
  {
    id: 6628,
    subject: 'ap_us_government',
    unit: 5,
    lessonIDS: ['5.1'],
    unitName: 'Political Participation',
    questionGroup: 'u5-ind-voting-age',
    question:
      'A state legislature passes a law setting 20 as the minimum age to vote in state and local elections, while 18- and 19-year-olds may still vote in federal elections. Supporters argue that each state controls the qualifications for its own elections. Which of the following is the strongest argument that the law is unconstitutional?',
    image: null,
    options: [
      'The Voting Rights Act of 1965 requires each state to adopt for its own elections the voting age that Congress sets for federal races.',
      'The Supremacy Clause requires states to apply federal voter qualifications to the elections they run for state and local offices.',
      'The Twenty-fourth Amendment bars states from placing conditions on the right to vote, and a minimum age is a condition of that kind.',
      'The Twenty-sixth Amendment bars both the national government and the states from denying the vote to citizens 18 or older due to age.',
    ],
    correctAnswer: 'D',
    explanation:
      'The Twenty-sixth Amendment (1971) bars the United States or any state from denying the vote on account of age to citizens 18 or older, so it covers state and local elections. Choice A is wrong because the Voting Rights Act of 1965 targeted racial discrimination, and when Congress later tried to set the voting age by statute, the Court in Oregon v. Mitchell (1970) held it could not do so for state elections.',
  },
  {
    id: 6629,
    subject: 'ap_us_government',
    unit: 5,
    lessonIDS: ['5.5', '5.8'],
    unitName: 'Political Participation',
    questionGroup: 'u5-ind-third-party',
    question:
      'In a presidential election, a third-party candidate wins 12 percent of the national popular vote but receives no electoral votes. Which of the following best explains this outcome?',
    image: null,
    options: [
      'The Twelfth Amendment requires a candidate to win the popular vote in a majority of states before receiving any electoral votes.',
      'Most states give all their electoral votes to the statewide winner, which disadvantages candidates who finish third in each state.',
      'States divide their electoral votes in proportion to each candidate\'s share of the vote, which splits support among many candidates.',
      'Federal law denies electoral votes to any candidate who wins less than 15 percent of the national popular vote in the election.',
    ],
    correctAnswer: 'B',
    explanation:
      'Winner-take-all allocation of electors in nearly every state means a candidate with widely spread support but no state plurality earns no electoral votes. Choice C is wrong because no state divides its electors proportionally; Maine and Nebraska award some by congressional district, and the rest use winner-take-all.',
  },
  {
    id: 6630,
    subject: 'ap_us_government',
    unit: 5,
    lessonIDS: ['5.8'],
    unitName: 'Political Participation',
    questionGroup: 'u5-ind-closed-primary',
    question:
      'A voter registered as unaffiliated lives in a state that holds closed primaries. She wants to help choose one party\'s nominee for president. Which of the following is most accurate about her situation?',
    image: null,
    options: [
      'She may vote in either party\'s primary, because the Constitution guarantees citizens a vote in each party\'s nomination process and convention.',
      'She will be assigned to a party automatically, based on the party whose candidates she supported in earlier general elections.',
      'She generally must register with that party by the state\'s deadline to participate, whereas an open primary would let her pick a ballot.',
      'She may pick either party\'s ballot on primary day, because closed primaries bar members of rival parties but not unaffiliated voters.',
    ],
    correctAnswer: 'C',
    explanation:
      'In a closed primary, participation is typically limited to voters registered with the party, while open primaries let voters choose a party\'s ballot without prior affiliation. Choice A is wrong because primaries are run under state law and party rules, and the Constitution does not guarantee a vote in a party\'s nomination.',
  },
  {
    id: 6631,
    subject: 'ap_us_government',
    unit: 5,
    lessonIDS: ['5.2'],
    unitName: 'Political Participation',
    questionGroup: 'g-quant-a',
    question:
      'This question and the next two refer to the following chart. Based on the chart, which of the following statements is accurate?',
    image: {
      src: 'https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com/unitTestImages/gov/final_exam_mcq/g_quant_a_turnout_by_age.svg',
      alt: 'Grouped bar chart titled \'Voter Turnout by Age Group: Presidential vs. Midterm Election (Hypothetical data for practice)\'. For ages 18-29, 30-44, 45-64 and 65+, turnout in the presidential election is 48, 58, 68 and 76 percent; in the midterm election it is 29, 42, 56 and 67 percent.',
    },
    options: [
      'The drop from presidential-election turnout to midterm-election turnout was largest for the 65+ group.',
      'In both types of election, turnout was higher for each age group than for the next younger group.',
      'Midterm turnout among ages 45-64 was higher than presidential turnout among ages 30-44.',
      'Midterm turnout among ages 65+ was higher than presidential turnout among ages 45-64.',
    ],
    correctAnswer: 'B',
    explanation:
      'In both series the bars rise from 18-29 to 65+ (48, 58, 68, 76 and 29, 42, 56, 67). Choice A is wrong because the 65+ drop (9 points) is the smallest; the 18-29 drop (19 points) is the largest.',
  },
  {
    id: 6632,
    subject: 'ap_us_government',
    unit: 5,
    lessonIDS: ['5.2'],
    unitName: 'Political Participation',
    questionGroup: 'g-quant-a',
    question:
      'Which of the following best explains the difference between presidential and midterm turnout that appears for every age group in the chart?',
    image: {
      src: 'https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com/unitTestImages/gov/final_exam_mcq/g_quant_a_turnout_by_age.svg',
      alt: 'Grouped bar chart titled \'Voter Turnout by Age Group: Presidential vs. Midterm Election (Hypothetical data for practice)\'. For ages 18-29, 30-44, 45-64 and 65+, turnout in the presidential election is 48, 58, 68 and 76 percent; in the midterm election it is 29, 42, 56 and 67 percent.',
    },
    options: [
      'Federal law sets earlier voter registration deadlines for midterm elections than for presidential elections, which keeps many citizens from voting.',
      'Most states require photo identification in midterm but not presidential elections, which discourages participation across age groups.',
      'Many citizens regard congressional contests as less important than state and local contests, so they skip midterm ballots.',
      'Presidential races draw heavier campaign spending and media attention, which motivates more eligible citizens to vote.',
    ],
    correctAnswer: 'D',
    explanation:
      'The high-profile presidential contest raises awareness and mobilization, so turnout is higher across all age groups. Choice A is wrong because registration deadlines are set by state law (within a federal 30-day maximum for federal elections) and do not differ between midterm and presidential elections.',
  },
  {
    id: 6633,
    subject: 'ap_us_government',
    unit: 5,
    lessonIDS: ['5.2'],
    unitName: 'Political Participation',
    questionGroup: 'g-quant-a',
    question:
      'Based on the turnout differences among age groups shown in the chart, which of the following is the most likely effect on candidates and elected officials?',
    image: {
      src: 'https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com/unitTestImages/gov/final_exam_mcq/g_quant_a_turnout_by_age.svg',
      alt: 'Grouped bar chart titled \'Voter Turnout by Age Group: Presidential vs. Midterm Election (Hypothetical data for practice)\'. For ages 18-29, 30-44, 45-64 and 65+, turnout in the presidential election is 48, 58, 68 and 76 percent; in the midterm election it is 29, 42, 56 and 67 percent.',
    },
    options: [
      'Candidates have an electoral incentive to emphasize the policy concerns of older citizens, who turn out at higher rates.',
      'Candidates build their strategy around party identification, so differences in turnout among age groups have little influence on their messages.',
      'Because campaigns must reach the voters least likely to vote, parties direct most of their policy proposals toward the youngest age group.',
      'Higher turnout among older citizens leads the census to give their states additional House seats in the next apportionment.',
    ],
    correctAnswer: 'A',
    explanation:
      'Officials who want to win elections tend to respond to groups that vote at the highest rates, here ages 45-64 and 65+. Choice C is wrong because campaigns focus on likely voters rather than the least likely, and choice D is wrong because House seats are apportioned by total population, not turnout.',
  },
  {
    id: 6634,
    subject: 'ap_us_government',
    unit: 4,
    lessonIDS: ['4.6'],
    unitName: 'American Political Ideologies and Beliefs',
    questionGroup: 'g-quant-b',
    question:
      'This question and the next one refer to the following table. Based on the table, which of the following statements is accurate?',
    image: {
      src: 'https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com/unitTestImages/gov/final_exam_mcq/g_quant_b_policy_opinion_table.svg',
      alt: 'Table titled \'Support for a Federal Paid Family Leave Program, by Party Identification and Ideology (Hypothetical data for practice)\'. Percent support/oppose/not sure: Democrats 78/14/8, Independents 56/31/13, Republicans 37/53/10, Liberals 84/9/7, Moderates 61/27/12, Conservatives 33/57/10. Footnote: Survey of 1,200 adults; margin of error +/- 3 percentage points.',
    },
    options: [
      'Support for the program among liberals was lower than support among Democrats overall.',
      'Moderates were less likely than Independents to say they support the program.',
      'Most Independents supported the program, but most Republicans opposed it.',
      'Republicans\' rate of opposition was higher than Democrats\' rate of support for the program.',
    ],
    correctAnswer: 'C',
    explanation:
      'Independents were at 56 percent support and Republicans were at 53 percent opposed. Choice B is wrong because moderates (61 percent) were more supportive than Independents (56 percent).',
  },
  {
    id: 6635,
    subject: 'ap_us_government',
    unit: 4,
    lessonIDS: ['4.6', '4.7'],
    unitName: 'American Political Ideologies and Beliefs',
    questionGroup: 'g-quant-b',
    question:
      'Based on a comparison of the party identification and ideology sections of the table, which of the following is best supported?',
    image: {
      src: 'https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com/unitTestImages/gov/final_exam_mcq/g_quant_b_policy_opinion_table.svg',
      alt: 'Table titled \'Support for a Federal Paid Family Leave Program, by Party Identification and Ideology (Hypothetical data for practice)\'. Percent support/oppose/not sure: Democrats 78/14/8, Independents 56/31/13, Republicans 37/53/10, Liberals 84/9/7, Moderates 61/27/12, Conservatives 33/57/10. Footnote: Survey of 1,200 adults; margin of error +/- 3 percentage points.',
    },
    options: [
      'Ideology is a much weaker predictor of support than party identification, since liberals and Democrats differ by more than 20 points.',
      'Support in each party group is close to support in the matching ideological group, suggesting party and ideology tend to line up.',
      'Republicans and conservatives hold opposite views of the program, which shows that ideology and party identification are unrelated.',
      'Independents are far more likely than moderates to be unsure about the program, which shows that moderates follow party leaders.',
    ],
    correctAnswer: 'B',
    explanation:
      'Support among Democrats (78), Independents (56), and Republicans (37) is within 6 points of support among liberals (84), moderates (61), and conservatives (33), so party identification and ideology tend to line up. Choice A is wrong because liberals and Democrats differ by only 6 points, and choice C is wrong because majorities of both Republicans (53) and conservatives (57) oppose the program.',
  },
  {
    id: 6636,
    subject: 'ap_us_government',
    unit: 5,
    lessonIDS: ['5.8'],
    unitName: 'Political Participation',
    questionGroup: 'g-quant-c',
    question:
      'This question and the next one refer to the following map of a hypothetical election. Based on the map, which of the following accurately describes the outcome of the hypothetical election?',
    image: {
      src: 'https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com/unitTestImages/gov/final_exam_mcq/g_quant_c_electoral_map.svg',
      alt: 'Tile map titled \'Electoral Votes by State: Hypothetical Election, Candidate X vs. Candidate Y\', showing ten fictional states. Each tile gives the state\'s electoral votes and its popular vote in thousands. States won by Candidate X (dark tiles): Alder 14 EV (X 1,550 / Y 1,450), Cedar 11 EV (X 1,300 / Y 1,250), Elm 18 EV (X 2,000 / Y 1,950), Fir 4 EV (X 350 / Y 300), Maple 10 EV (X 1,200 / Y 1,150). States won by Candidate Y (light tiles): Birch 9 EV (X 600 / Y 1,100), Dogwood 6 EV (X 400 / Y 800), Hickory 12 EV (X 800 / Y 1,500), Juniper 8 EV (X 550 / Y 1,050), Oak 8 EV (X 500 / Y 1,000). A note reads \'51 of 100 electoral votes needed to win.\' Footnote: \'Hypothetical data for practice. Fictional states; vote totals in thousands. Each state awards all of its electoral votes to its statewide winner.\'',
    },
    options: [
      'Candidate X won 6 of the 10 states, which produced a majority of the electoral votes.',
      'Candidate Y won more electoral votes than Candidate X because Y won more states.',
      'Candidate X won exactly 51 electoral votes, the minimum needed to win the election.',
      'Candidate X won 57 of the 100 electoral votes, more than the 51 needed to win.',
    ],
    correctAnswer: 'D',
    explanation:
      'Adding the dark tiles gives Candidate X 14 + 11 + 18 + 4 + 10 = 57 electoral votes, more than the 51 needed. Choice A is wrong because each candidate won five of the ten states.',
  },
  {
    id: 6637,
    subject: 'ap_us_government',
    unit: 5,
    lessonIDS: ['5.8'],
    unitName: 'Political Participation',
    questionGroup: 'g-quant-c',
    question:
      'Based on the vote counts in the map, which of the following best describes the relationship between the popular vote and the electoral vote in this election?',
    image: {
      src: 'https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com/unitTestImages/gov/final_exam_mcq/g_quant_c_electoral_map.svg',
      alt: 'Tile map titled \'Electoral Votes by State: Hypothetical Election, Candidate X vs. Candidate Y\', showing ten fictional states. Each tile gives the state\'s electoral votes and its popular vote in thousands. States won by Candidate X (dark tiles): Alder 14 EV (X 1,550 / Y 1,450), Cedar 11 EV (X 1,300 / Y 1,250), Elm 18 EV (X 2,000 / Y 1,950), Fir 4 EV (X 350 / Y 300), Maple 10 EV (X 1,200 / Y 1,150). States won by Candidate Y (light tiles): Birch 9 EV (X 600 / Y 1,100), Dogwood 6 EV (X 400 / Y 800), Hickory 12 EV (X 800 / Y 1,500), Juniper 8 EV (X 550 / Y 1,050), Oak 8 EV (X 500 / Y 1,000). A note reads \'51 of 100 electoral votes needed to win.\' Footnote: \'Hypothetical data for practice. Fictional states; vote totals in thousands. Each state awards all of its electoral votes to its statewide winner.\'',
    },
    options: [
      'Candidate X won its states by narrow margins while Y won its states by wide margins, so Y led the popular vote but X won the electoral vote.',
      'Candidate X won the popular vote in a majority of the ten states, and carrying a majority of the states produced X\'s electoral vote majority.',
      'Candidate Y won more popular votes and a majority of the electoral votes, because Y carried the states with the most electoral votes.',
      'Candidate X won more popular votes overall by carrying the most populous states, so the electoral vote matched the popular vote result.',
    ],
    correctAnswer: 'A',
    explanation:
      'X carried Alder, Cedar, Elm, Fir, and Maple by 50,000 to 100,000 votes each, while Y carried its five states by 400,000 to 700,000 each, so Y leads the popular vote (11,550 to 9,250 thousand) but winner-take-all gives X 57 electoral votes. Choice D is wrong because adding the tiles shows that X received fewer popular votes than Y.',
  },
  {
    id: 6638,
    subject: 'ap_us_government',
    unit: 4,
    lessonIDS: ['4.6'],
    unitName: 'American Political Ideologies and Beliefs',
    questionGroup: 'g-quant-d',
    question:
      'This question and the next two refer to the following graph. Based on the graph, which of the following statements is accurate?',
    image: {
      src: 'https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com/unitTestImages/gov/final_exam_mcq/g_quant_d_approval_trends.svg',
      alt: 'Line graph titled \'Presidential and Congressional Approval Over One Term (Hypothetical data for practice)\' with two lines across eight readings, Jan Y1 through Jul Y4. Presidential approval: 61, 55, 50, 46, 44, 43, 57, 52 percent. Congressional approval: 32, 29, 26, 24, 22, 20, 24, 22 percent. Dashed vertical markers show midterm elections (Nov, Year 2) and the start of a foreign crisis (Sep, Year 3).',
    },
    options: [
      'Congressional approval was higher than presidential approval in at least one of the eight readings shown on the graph.',
      'Presidential approval reached its lowest point in the reading for January of Year 4, after the foreign crisis began.',
      'Presidential approval fell in each reading through July of Year 3, then rose 14 points by January of Year 4.',
      'By July of Year 4, presidential approval had returned to the same level it had reached in January of Year 1.',
    ],
    correctAnswer: 'C',
    explanation:
      'Approval went 61, 55, 50, 46, 44, 43, then 57, a 14-point rise. Choice B is wrong because the lowest reading (43) was in July of Year 3.',
  },
  {
    id: 6639,
    subject: 'ap_us_government',
    unit: 4,
    lessonIDS: ['4.4'],
    unitName: 'American Political Ideologies and Beliefs',
    questionGroup: 'g-quant-d',
    question:
      'The rise in presidential approval between July of Year 3 and January of Year 4 is most consistent with which of the following?',
    image: {
      src: 'https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com/unitTestImages/gov/final_exam_mcq/g_quant_d_approval_trends.svg',
      alt: 'Line graph titled \'Presidential and Congressional Approval Over One Term (Hypothetical data for practice)\' with two lines across eight readings, Jan Y1 through Jul Y4. Presidential approval: 61, 55, 50, 46, 44, 43, 57, 52 percent. Congressional approval: 32, 29, 26, 24, 22, 20, 24, 22 percent. Dashed vertical markers show midterm elections (Nov, Year 2) and the start of a foreign crisis (Sep, Year 3).',
    },
    options: [
      'Midterm elections that strengthened the president\'s party in Congress, which typically produce an immediate jump in presidential approval.',
      'A honeymoon effect, in which approval of a president is highest right after taking office and then falls steadily.',
      'A Supreme Court ruling expanding presidential power, which typically raises public approval of the president.',
      'A rally-around-the-flag effect, in which public support for the president temporarily increases during an international crisis.',
    ],
    correctAnswer: 'D',
    explanation:
      'The jump follows the marked foreign crisis, matching the pattern in which the public rallies around the president. Choice A is wrong because the marked midterm elections came earlier, between July of Year 2 and January of Year 3, when approval was still falling, and choice B describes the early-term decline, not a late-term rise.',
  },
  {
    id: 6640,
    subject: 'ap_us_government',
    unit: 5,
    lessonIDS: ['5.9'],
    unitName: 'Political Participation',
    questionGroup: 'g-quant-d',
    question:
      'Given the congressional approval levels shown in the graph, which of the following best explains why most House incumbents who seek reelection win?',
    image: {
      src: 'https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com/unitTestImages/gov/final_exam_mcq/g_quant_d_approval_trends.svg',
      alt: 'Line graph titled \'Presidential and Congressional Approval Over One Term (Hypothetical data for practice)\' with two lines across eight readings, Jan Y1 through Jul Y4. Presidential approval: 61, 55, 50, 46, 44, 43, 57, 52 percent. Congressional approval: 32, 29, 26, 24, 22, 20, 24, 22 percent. Dashed vertical markers show midterm elections (Nov, Year 2) and the start of a foreign crisis (Sep, Year 3).',
    },
    options: [
      'Voters who disapprove of Congress usually leave their House ballots blank, so the votes that are counted favor incumbents.',
      'Approval of Congress tracks presidential approval, so voters who dislike Congress tend to blame the president rather than their own members.',
      'Many voters rate Congress poorly as an institution but view their own representative favorably because of constituent service.',
      'Gerrymandering causes approval of Congress to fall, while the same districts guarantee the incumbent a majority in each election.',
    ],
    correctAnswer: 'C',
    explanation:
      'Voters distinguish the institution from their own member, who offers casework and district projects, creating an incumbency advantage. Choice D is wrong because gerrymandering does not drive down approval of Congress and no district guarantees a win.',
  },
  {
    id: 6641,
    subject: 'ap_us_government',
    unit: 1,
    lessonIDS: ['1.7'],
    unitName: 'Foundations of American Democracy',
    questionGroup: 'g-quant-e',
    question:
      'This question and the next one refer to the following infographic. According to the infographic, which of the following is accurate?',
    image: {
      src: 'https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com/unitTestImages/gov/final_exam_mcq/g_quant_e_state_budget_infographic.svg',
      alt: 'Infographic titled \'Where State Z\'s $80 Billion General Fund Comes From (Hypothetical data for practice)\'. Sources: state income and sales taxes 50% ($40.0B), federal grants 32% ($25.6B), fees, tolls and other 18% ($14.4B). Federal grants by type: categorical $12.8B, block $9.6B, other $3.2B. A callout notes that to receive full federal highway funds State Z must set a minimum drinking age of 21. A definitions panel reads: \'Categorical grant: Money for a specific purpose, with detailed federal rules. Block grant: Money for a broad policy area, with more state discretion.\' Footnote: \'Hypothetical data for practice. State Z is fictional.\'',
    },
    options: [
      'Federal grants supply a larger share than fees and other revenue but a smaller share than state taxes.',
      'Block grants are the largest type of federal grant to State Z, totaling about $12.8 billion of the total.',
      'State income and sales taxes provide about $25.6 billion of the money in State Z\'s general fund.',
      'Federal grants provide more than half of the money in the general fund of State Z each year.',
    ],
    correctAnswer: 'A',
    explanation:
      'Federal grants (32 percent) fall between state taxes (50 percent) and fees and other revenue (18 percent). Choice B is wrong because categorical grants ($12.8 billion) are larger than block grants ($9.6 billion).',
  },
  {
    id: 6642,
    subject: 'ap_us_government',
    unit: 1,
    lessonIDS: ['1.7', '1.8'],
    unitName: 'Foundations of American Democracy',
    questionGroup: 'g-quant-e',
    question:
      'The highway-funds condition described in the infographic is best understood as an example of which of the following features of federalism?',
    image: {
      src: 'https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com/unitTestImages/gov/final_exam_mcq/g_quant_e_state_budget_infographic.svg',
      alt: 'Infographic titled \'Where State Z\'s $80 Billion General Fund Comes From (Hypothetical data for practice)\'. Sources: state income and sales taxes 50% ($40.0B), federal grants 32% ($25.6B), fees, tolls and other 18% ($14.4B). Federal grants by type: categorical $12.8B, block $9.6B, other $3.2B. A callout notes that to receive full federal highway funds State Z must set a minimum drinking age of 21. A definitions panel reads: \'Categorical grant: Money for a specific purpose, with detailed federal rules. Block grant: Money for a broad policy area, with more state discretion.\' Footnote: \'Hypothetical data for practice. State Z is fictional.\'',
    },
    options: [
      'The reserved powers of the states under the Tenth Amendment, which bar Congress from attaching conditions to funds it gives to states.',
      'The national government attaching requirements to grant money to influence state policy through its power to spend.',
      'A federal mandate, in which Congress orders states to take an action and provides no federal money to pay for it.',
      'The Supremacy Clause, which lets the national government take over a state\'s budget whenever state and national laws conflict.',
    ],
    correctAnswer: 'B',
    explanation:
      'Federal grants with conditions encourage states to adopt national policy goals in exchange for money. Choice C is wrong because a mandate is an order without funding, whereas here money is offered if the state complies.',
  },
  {
    id: 6643,
    subject: 'ap_us_government',
    unit: 1,
    lessonIDS: ['1.6'],
    unitName: 'Foundations of American Democracy',
    questionGroup: 'g-text-1',
    question:
      'This question and the next three refer to the following excerpt.\n\n"If men were angels, no government would be necessary. If angels were to govern men, neither external nor internal controls on government would be necessary. In framing a government which is to be administered by men over men, the great difficulty lies in this: you must first enable the government to control the governed; and in the next place oblige it to control itself. A dependence on the people is, no doubt, the primary control on the government; but experience has taught mankind the necessity of auxiliary precautions."\n—James Madison, Federalist No. 51, 1788\n\nWhich of the following best states the central claim of the excerpt?',
    image: null,
    options: [
      'Government becomes unnecessary once citizens are educated enough to govern themselves without elected leaders.',
      'A government must be kept too weak to control the governed, so that it cannot become a threat to liberty.',
      'Government must have real power, but that power must be restrained both by the voters and by additional safeguards.',
      'Regular elections give the people sufficient protection against abuse of power, so further safeguards are unnecessary.',
    ],
    correctAnswer: 'C',
    explanation:
      'Madison argues that government must be strong enough to govern yet be controlled, first by the people and also by "auxiliary precautions." Choice D is wrong because he calls dependence on the people only the primary control and still requires additional safeguards.',
  },
  {
    id: 6644,
    subject: 'ap_us_government',
    unit: 1,
    lessonIDS: ['1.6'],
    unitName: 'Foundations of American Democracy',
    questionGroup: 'g-text-1',
    question: 'Which assumption about government underlies the argument in the excerpt?',
    image: null,
    options: [
      'Because those who hold power are not perfectly virtuous, institutions must be designed to restrain them.',
      'Most citizens lack the ability to choose capable officials, so voters should have a limited role in government.',
      'Officials chosen by the people will usually act in the public interest, so structural limits are a minor concern.',
      'A national government is more dangerous than a state government, so most power should remain with the states.',
    ],
    correctAnswer: 'A',
    explanation:
      'Madison\'s opening comparison to angels assumes that real officials are fallible, which is why both elections and internal controls are needed. Choice C reverses his reasoning by treating structural limits as unimportant.',
  },
  {
    id: 6645,
    subject: 'ap_us_government',
    unit: 1,
    lessonIDS: ['1.6'],
    unitName: 'Foundations of American Democracy',
    questionGroup: 'g-text-1',
    question:
      'A group is drafting a charter for a new city. Which of the following provisions would best reflect the reasoning in the excerpt?',
    image: null,
    options: [
      'A single elected council writes the city\'s laws, enforces them, and decides disputes under them, which avoids deadlock among offices.',
      'The mayor appoints the council members and the judges, which ensures that city officials work together smoothly and efficiently.',
      'Voters elect city officials at regular intervals, and the charter adds no further limits on what those officials may do.',
      'The council passes ordinances, the mayor may veto them, and an independent court may strike down ordinances that violate the charter.',
    ],
    correctAnswer: 'D',
    explanation:
      'Veto power and judicial review let parts of government check one another, the kind of "auxiliary precaution" Madison describes. Choice C relies only on elections, which Madison calls the primary control but not a sufficient one.',
  },
  {
    id: 6646,
    subject: 'ap_us_government',
    unit: 1,
    lessonIDS: ['1.3', '1.6'],
    unitName: 'Foundations of American Democracy',
    questionGroup: 'g-text-1',
    question:
      'Which of the following arguments would the author of Brutus No. 1 most likely make in response to the view expressed in the excerpt?',
    image: null,
    options: [
      'A single strong president would protect liberty better than separate institutions, so dividing power among branches is unnecessary.',
      'Broad national powers, such as the Necessary and Proper and Supremacy Clauses, will swallow the states despite internal checks.',
      'A written bill of rights is unnecessary because the structure of the new government already protects individual liberty.',
      'Government will be safest once national power over the states is expanded enough to prevent the rise of regional factions.',
    ],
    correctAnswer: 'B',
    explanation:
      'Brutus, an Anti-Federalist, warned that the Necessary and Proper and Supremacy Clauses would let national power absorb the states despite structural checks. Choice C is a Federalist argument (Hamilton, Federalist No. 84), not Brutus\'s.',
  },
  {
    id: 6647,
    subject: 'ap_us_government',
    unit: 3,
    lessonIDS: ['3.3'],
    unitName: 'Civil Liberties and Civil Rights',
    questionGroup: 'g-text-2',
    question:
      'This question and the next two refer to the following excerpt.\n\n"First, a school, in relation to off-campus speech, will rarely stand in loco parentis. . . . Geographically speaking, off-campus speech will normally fall within the zone of parental, rather than school-related, responsibility. Second, from the student speaker\'s perspective, regulations of off-campus speech, when coupled with regulations of on-campus speech, include all the speech a student utters during the full 24-hour day. That means courts must be more skeptical of a school\'s efforts to regulate off-campus speech, for doing so may mean the student cannot engage in that kind of speech at all. . . . Third, the school itself has an interest in protecting a student\'s unpopular expression, especially when the expression takes place off campus."\n—Justice Stephen Breyer, majority opinion, Mahanoy Area School District v. B.L., 2021\n(In loco parentis means "in the place of a parent.")\n\nWhich statement best expresses the central claim of the excerpt?',
    image: null,
    options: [
      'Schools should have broad authority to punish student speech that harms the school\'s reputation, wherever it occurs.',
      'Schools have less authority over student speech that occurs off campus, so courts should be skeptical when schools punish it.',
      'Public school students have limited constitutional rights, so courts should defer to administrators on questions of discipline.',
      'Student speech off campus is entirely beyond the reach of school discipline, no matter its content or its effect on the school.',
    ],
    correctAnswer: 'B',
    explanation:
      'The Court lists features of off-campus speech, such as its falling within parents\' rather than the school\'s responsibility, that reduce a school\'s authority and call for more skepticism from courts. Choice D goes too far, since the excerpt asks courts to be more skeptical of such regulation, not to forbid it entirely.',
  },
  {
    id: 6648,
    subject: 'ap_us_government',
    unit: 3,
    lessonIDS: ['3.3'],
    unitName: 'Civil Liberties and Civil Rights',
    questionGroup: 'g-text-2',
    question:
      'Which of the following statements would a defender of broad school authority over student speech most likely make in response to the excerpt?',
    image: null,
    options: [
      'Courts rather than school officials should decide whether a student\'s off-campus post caused enough disruption to justify discipline.',
      'Off-campus speech normally falls within the zone of parental responsibility, so schools should leave it to parents to address.',
      'Student posts about school staff are protected speech that administrators may not punish, whether written at home or at school.',
      'Posts aimed at classmates can disrupt school as much as classroom speech does, so where a post is written should not matter.',
    ],
    correctAnswer: 'D',
    explanation:
      'A defender of broad authority would argue that online speech can disrupt school just as classroom speech does, rejecting the excerpt\'s emphasis on where the speech takes place. Choice B restates the Court\'s own reasoning rather than responding to it.',
  },
  {
    id: 6649,
    subject: 'ap_us_government',
    unit: 3,
    lessonIDS: ['3.3'],
    unitName: 'Civil Liberties and Civil Rights',
    questionGroup: 'g-text-2',
    question:
      'A public high school suspends a student for a weekend social media post criticizing the school\'s dress code. Classmates discuss the post at lunch, but classes proceed normally. How would the reasoning in the excerpt, together with Tinker v. Des Moines (1969), most likely apply to the suspension?',
    image: null,
    options: [
      'As likely unconstitutional, because the school cannot show that the post materially disrupted school activities.',
      'As constitutional, because a post about school policy falls within the authority of school administrators to regulate.',
      'As constitutional, because speech by minors on social media falls outside the protection of the First Amendment.',
      'As unconstitutional, because the Court has held that students\' speech rights in school are equal to those of adults.',
    ],
    correctAnswer: 'A',
    explanation:
      'Tinker allows schools to restrict student speech that materially and substantially disrupts school operations, nothing here shows such disruption, and the excerpt adds that off-campus speech calls for even more skepticism. Choice D overstates Tinker, which recognizes that schools may regulate student speech more than the government may regulate adults.',
  },
  {
    id: 6650,
    subject: 'ap_us_government',
    unit: 2,
    lessonIDS: ['2.8'],
    unitName: 'Interactions Among Branches of Government',
    questionGroup: 'g-visual-1',
    question:
      'This question and the next one refer to the following cartoon.\n\nWhich of the following best describes the point of the cartoon?',
    image: {
      src: 'https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com/unitTestImages/gov/final_exam_mcq/g_visual_1_cartoon_judicial_review.svg',
      alt: 'Political cartoon. On the right, a judge in a black robe sits behind a tall bench labeled "SUPREME COURT". An open book labeled "U.S. CONSTITUTION" lies on the bench. The judge holds a large dark rubber stamp over a sheet of paper labeled "ACT OF CONGRESS", which already carries a bold "VOID" mark. On the left, a small figure in a suit sits at a desk piled with papers, under a banner labeled "CONGRESS", looking up at the judge. The caption reads "Reviewed and returned."',
    },
    options: [
      'Congress has the power to override Supreme Court rulings by passing a new law that replaces them.',
      'The president has the authority to cancel laws that Congress has passed and the courts uphold.',
      'Federal courts can invalidate acts of Congress that conflict with the Constitution.',
      'The Supreme Court must approve acts of Congress before they can become law.',
    ],
    correctAnswer: 'C',
    explanation:
      'The judge stamps "VOID" on an Act of Congress beside the Constitution, which depicts judicial review. Choice A reverses the relationship shown, since the Court is the one checking Congress.',
  },
  {
    id: 6651,
    subject: 'ap_us_government',
    unit: 2,
    lessonIDS: ['2.8'],
    unitName: 'Interactions Among Branches of Government',
    questionGroup: 'g-visual-1',
    question:
      'The power depicted in the cartoon was first asserted by the Supreme Court in which of the following circumstances?',
    image: {
      src: 'https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com/unitTestImages/gov/final_exam_mcq/g_visual_1_cartoon_judicial_review.svg',
      alt: 'Political cartoon. On the right, a judge in a black robe sits behind a tall bench labeled "SUPREME COURT". An open book labeled "U.S. CONSTITUTION" lies on the bench. The judge holds a large dark rubber stamp over a sheet of paper labeled "ACT OF CONGRESS", which already carries a bold "VOID" mark. On the left, a small figure in a suit sits at a desk piled with papers, under a banner labeled "CONGRESS", looking up at the judge. The caption reads "Reviewed and returned."',
    },
    options: [
      'The Court ruled that part of a federal law about its jurisdiction conflicted with Article III and refused to enforce it.',
      'The Court upheld the creation of a national bank, finding that Congress has implied powers beyond those listed in the Constitution.',
      'The Court ordered a sitting president to turn over evidence for a criminal case, rejecting a claim of executive privilege.',
      'The Court overruled a state court, finding that federal courts may review state court decisions on questions of federal law.',
    ],
    correctAnswer: 'A',
    explanation:
      'In Marbury v. Madison (1803) the Court held that a section of the Judiciary Act of 1789 was unconstitutional, establishing judicial review of federal law. Choice B describes McCulloch v. Maryland, which concerns implied powers rather than striking down a law.',
  },
  {
    id: 6652,
    subject: 'ap_us_government',
    unit: 2,
    lessonIDS: ['2.3'],
    unitName: 'Interactions Among Branches of Government',
    questionGroup: 'g-visual-2',
    question:
      'This question and the next one refer to the following maps.\n\nWhich of the following is best supported by a comparison of Map A and Map B?',
    image: {
      src: 'https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com/unitTestImages/gov/final_exam_mcq/g_visual_2_map_fictional_state_redistricting.svg',
      alt: 'Two schematic maps of a rectangular "Fictional State" with four congressional districts, each labeled with a population of 250,000. Map A, "Before redistricting", shows four rectangular districts in a 2-by-2 grid: District 1 northwest, District 2 northeast, District 3 southwest, District 4 southeast. Port City is a dot in District 3 and Capital City is a dot in District 2. Map B, "After redistricting", keeps four districts but redraws District 2 as a long, thin band that starts as a block around Port City in the southwest, runs east along the southern part of the state, then turns north along the eastern edge of the state to a block around Capital City in the northeast corner. In both maps District 2 is drawn with diagonal stripes, so in Map B it reads as one long, narrow, horseshoe-shaped strip. Districts 1, 3 and 4 are redrawn around it.',
    },
    options: [
      'Redistricting cut the number of districts from four to three by folding District 2 into its neighbors.',
      'The new districts differ widely in population, with District 2 holding far more residents than the others.',
      'District 2 became more compact because it now serves a single urban area rather than two.',
      'District 2 was redrawn as a long, narrow shape linking two distant cities, unlike its earlier compact form.',
    ],
    correctAnswer: 'D',
    explanation:
      'Map B shows District 2 stretching in a narrow band from Port City to Capital City, while Map A shows it as a compact block. Choice B is wrong because every district is labeled with the same population of 250,000.',
  },
  {
    id: 6653,
    subject: 'ap_us_government',
    unit: 2,
    lessonIDS: ['2.3'],
    unitName: 'Interactions Among Branches of Government',
    questionGroup: 'g-visual-2',
    question:
      'Suppose voters sue, claiming that the legislature drew the new District 2 in Map B mainly to separate voters by race. Based on Shaw v. Reno and the maps, which of the following is most accurate?',
    image: {
      src: 'https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com/unitTestImages/gov/final_exam_mcq/g_visual_2_map_fictional_state_redistricting.svg',
      alt: 'Two schematic maps of a rectangular "Fictional State" with four congressional districts, each labeled with a population of 250,000. Map A, "Before redistricting", shows four rectangular districts in a 2-by-2 grid: District 1 northwest, District 2 northeast, District 3 southwest, District 4 southeast. Port City is a dot in District 3 and Capital City is a dot in District 2. Map B, "After redistricting", keeps four districts but redraws District 2 as a long, thin band that starts as a block around Port City in the southwest, runs east along the southern part of the state, then turns north along the eastern edge of the state to a block around Capital City in the northeast corner. In both maps District 2 is drawn with diagonal stripes, so in Map B it reads as one long, narrow, horseshoe-shaped strip. Districts 1, 3 and 4 are redrawn around it.',
    },
    options: [
      'The suit cannot proceed, because the Court has held that drawing district lines is a political question that federal courts may not review.',
      'The suit may proceed, because a district so irregular that it appears drawn to separate voters by race can be challenged under the Equal Protection Clause.',
      'The suit should succeed because the Constitution requires congressional districts to be compact, regular in shape, and free of narrow extensions.',
      'The suit should succeed because Map B shows districts of unequal population, which violates the principle of one person, one vote established in Baker v. Carr.',
    ],
    correctAnswer: 'B',
    explanation:
      'Shaw v. Reno (1993) held that an extremely irregular district that appears to be drawn on the basis of race can be challenged under the Equal Protection Clause. Choice D fails because the maps label all four districts with equal populations, so there is no one person, one vote violation. Choice A is wrong because, although Rucho v. Common Cause (2019) held that partisan gerrymandering claims are political questions, racial gerrymandering claims like this one remain reviewable under the Equal Protection Clause, as Shaw shows.',
  },
  {
    id: 6654,
    subject: 'ap_us_government',
    unit: 4,
    lessonIDS: ['4.2'],
    unitName: 'American Political Ideologies and Beliefs',
    questionGroup: 'g-visual-3',
    question:
      'This question and the next one refer to the following infographic.\n\nWhich of the following conclusions is best supported by the infographic?',
    image: {
      src: 'https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com/unitTestImages/gov/final_exam_mcq/g_visual_3_infographic_political_information_sources.svg',
      alt: 'Infographic titled "Where Do Americans Get Their Political Information?" with the note "HYPOTHETICAL DATA for exam use only". Two horizontal 100 percent bars show the main source of political information. Ages 18-29: social media 46%, television news 14%, newspapers 8%, family and friends 20%, other 12%. Ages 65 and older: social media 9%, television news 52%, newspapers 21%, family and friends 12%, other 6%. The larger segments are labeled with the source name (for example "Social media 46%" and "Television news 52%"), the Newspapers segments are drawn with diagonal stripes, and a legend identifies all five sources.',
    },
    options: [
      'A majority of adults aged 18-29 name social media as their main source of political information today.',
      'Family and friends are the leading source of political information for adults aged 65 and older.',
      'Social media is named over five times as often by adults aged 18-29 as by adults aged 65 and older.',
      'Adults aged 65 and older name newspapers more often than they name television news as a main source.',
    ],
    correctAnswer: 'C',
    explanation:
      'The infographic gives 46% versus 9% for social media, a ratio of about 5.1 to 1. Choice A is wrong because 46% is a plurality, not a majority.',
  },
  {
    id: 6655,
    subject: 'ap_us_government',
    unit: 4,
    lessonIDS: ['4.2'],
    unitName: 'American Political Ideologies and Beliefs',
    questionGroup: 'g-visual-3',
    question:
      'Political scientists identify the media as an agent of political socialization. Which claim about political socialization is best supported by the infographic?',
    image: {
      src: 'https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com/unitTestImages/gov/final_exam_mcq/g_visual_3_infographic_political_information_sources.svg',
      alt: 'Infographic titled "Where Do Americans Get Their Political Information?" with the note "HYPOTHETICAL DATA for exam use only". Two horizontal 100 percent bars show the main source of political information. Ages 18-29: social media 46%, television news 14%, newspapers 8%, family and friends 20%, other 12%. Ages 65 and older: social media 9%, television news 52%, newspapers 21%, family and friends 12%, other 6%. The larger segments are labeled with the source name (for example "Social media 46%" and "Television news 52%"), the Newspapers segments are drawn with diagonal stripes, and a legend identifies all five sources.',
    },
    options: [
      'Media socialization works through different channels for different ages, with social media more prominent for younger adults.',
      'Family and friends have replaced the media as the leading agent of political socialization for both age groups.',
      'Heavy social media use causes younger adults to adopt political beliefs that are more liberal than those older adults hold.',
      'Older adults are less affected by media socialization because they rely mostly on traditional news outlets.',
    ],
    correctAnswer: 'A',
    explanation:
      'The data show that younger and older adults name different media channels, consistent with the media shaping beliefs through different routes. Choice C is unsupported because the infographic contains no data on ideology and cannot show cause.',
  },
];
