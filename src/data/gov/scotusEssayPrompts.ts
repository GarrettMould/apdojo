export type ScotusEssayPrompt = {
  id: string;
  topic: string;
  requiredCase: string;
  nonRequiredCase: string;
  scenario: string;
  tasks: [string, string, string];
  /** The "Story" for Point B */
  caseFacts: string;
  /** The "Anchor" for Point A */
  constitutionalClause: string;
  /** The "Bridge" for Point C */
  comparisonPoints: string;
  /** Self-assessment for Point D */
  rubricChecklist: string[];
};

export const scotusEssayPrompts: ScotusEssayPrompt[] = [
  {
    id: 'mcculloch-v-maryland',
    topic: 'Federalism & The Supremacy Clause',
    requiredCase: 'McCulloch v. Maryland (1819)',
    nonRequiredCase: 'Arizona v. United States (2012)',
    scenario:
      'In 2010, Arizona enacted S.B. 1070, a state law intended to discourage illegal immigration. One provision made it a state crime for an immigrant to be in the state without carrying registration documents. The federal government sued, arguing that immigration is an exclusive national power. Arizona argued that the state had a "reserved power" to protect its citizens when federal enforcement was lacking. In its decision, the Supreme Court struck down the state-level penalties, holding that the federal government possesses "broad, undoubted power over the subject of immigration" and that federal law preempts state law in this field.',
    tasks: [
      'Identify the constitutional clause that is common to both McCulloch v. Maryland and Arizona v. United States.',
      'Describe the facts of the required case, McCulloch v. Maryland, and Explain how those facts led to a similar holding in Arizona v. United States regarding the balance of power.',
      'Explain how the holding in Arizona v. United States illustrates the principle of federalism.',
    ],
    caseFacts:
      'Maryland attempted to tax a branch of the Second Bank of the U.S. to curb federal power; the Court ruled that states cannot tax federal instruments as federal law is supreme.',
    constitutionalClause: 'Supremacy Clause (Article VI)',
    comparisonPoints:
      'In McCulloch, the Court prevented a state from interfering with a federal bank; similarly, in Arizona, the Court prevented a state from interfering with federal immigration authority.',
    rubricChecklist: [
      'Identified Supremacy Clause',
      'Described McCulloch facts (Bank tax)',
      'Linked federal preemption to both cases',
      'Connected to the division of power in Federalism',
    ],
  },
  {
    id: 'united-states-v-lopez',
    topic: 'Federalism & The Commerce Clause',
    requiredCase: 'United States v. Lopez (1995)',
    nonRequiredCase: 'United States v. Morrison (2000)',
    scenario:
      'In 1994, Congress passed the Violence Against Women Act (VAWA). One provision of the act allowed victims of gender-motivated violence to sue their attackers for damages in federal court. Christy Brzonkala, a student at Virginia Tech, sued her alleged attackers under this act. The defendants argued that Congress did not have the authority to pass the law because it dealt with crime and safety—areas traditionally left to the states. The federal government argued that violence against women significantly affected the national economy. The Supreme Court struck down the provision, holding that gender-motivated crimes of violence are not, in any sense, economic activity and thus do not fall under federal authority.',
    tasks: [
      'Identify the constitutional clause that is common to both United States v. Lopez and United States v. Morrison.',
      'Describe the holding in the required case, United States v. Lopez, and Explain how the facts in United States v. Morrison led to a similar holding.',
      'Explain how the decision in United States v. Morrison reflects the democratic ideal of limited government.',
    ],
    caseFacts:
      'A student was charged under the Gun-Free School Zones Act; the Court ruled Congress exceeded its power because carrying a gun in school is not an economic activity.',
    constitutionalClause: 'Commerce Clause (Article I, Section 8)',
    comparisonPoints:
      'In both cases, the Court created a limit on federal power, ruling that "non-economic" local activities (guns in schools and gender-motivated violence) cannot be regulated via the Commerce Clause.',
    rubricChecklist: [
      'Identified Commerce Clause',
      'Described Lopez holding (not economic activity)',
      'Linked "non-economic" crimes to federal overreach',
      'Explained how this limits the scope of federal power',
    ],
  },
  {
    id: 'tinker-v-des-moines',
    topic: 'Student Speech',
    requiredCase: 'Tinker v. Des Moines (1969)',
    nonRequiredCase: 'Morse v. Frederick (2007)',
    scenario:
      'During an Olympic Torch Relay event in Juneau, Alaska, student Joseph Frederick unfurled a banner that read "BONG HiTS 4 JESUS" as the cameras passed. Principal Deborah Morse confiscated the banner and suspended Frederick for ten days, claiming the banner promoted illegal drug use, which violated school policy. Frederick sued, arguing that his message was protected symbolic speech. The Supreme Court ruled 5-4 in favor of the school, holding that schools may take steps to safeguard those in their care from speech that can reasonably be regarded as encouraging illegal drug use, which undermines the school’s educational mission.',
    tasks: [
      'Identify the civil liberty that is common to both Tinker v. Des Moines and Morse v. Frederick.',
      'Describe the facts in the required case, Tinker v. Des Moines, and Explain how the facts in Morse v. Frederick led to a different holding.',
      'Explain how the decision in Morse v. Frederick illustrates the Court’s need to balance individual rights and social order.',
    ],
    caseFacts:
      'Students were suspended for wearing black armbands to protest the Vietnam War; the Court ruled that students have free speech rights unless it causes a substantial disruption.',
    constitutionalClause: 'First Amendment: Freedom of Speech',
    comparisonPoints:
      'In Tinker, the speech was protected political protest that did not cause disruption. In Morse, the speech was restricted because the Court found a "compelling interest" in preventing drug promotion at school.',
    rubricChecklist: [
      'Identified Freedom of Speech',
      'Described Tinker armband facts',
      'Contrasted political speech vs. drug safety exception',
      'Explained the "Substantial Disruption" vs "Educational Mission"',
    ],
  },
  {
    id: 'wisconsin-v-yoder',
    topic: 'The Free Exercise Clause',
    requiredCase: 'Wisconsin v. Yoder (1972)',
    nonRequiredCase: 'Church of the Lukumi Babalu Aye v. City of Hialeah (1993)',
    scenario:
      'The Church of the Lukumi Babalu Aye practiced the Santeria religion, which involves ritual animal sacrifice. When the church announced plans to open a worship center in Hialeah, Florida, the city council passed several ordinances banning the "unnecessary" killing of animals for ritual purposes. The ordinances allowed for exceptions such as kosher slaughter and hunting. The Church sued, claiming the laws targeted their religious practice. The Supreme Court ruled unanimously in favor of the Church, holding that because the laws specifically targeted religious activity while allowing secular killing, they were not "neutral" and violated the First Amendment.',
    tasks: [
      'Identify the First Amendment clause that is common to both Wisconsin v. Yoder and Church of the Lukumi Babalu Aye v. City of Hialeah.',
      'Describe the holding in the required case, Wisconsin v. Yoder, and Explain how the facts in Church of the Lukumi Babalu Aye resulted in a similar holding.',
      'Explain how the decision in Church of the Lukumi Babalu Aye illustrates the Court’s role in protecting minority rights.',
    ],
    caseFacts:
      'Amish parents refused to send children to high school; the Court ruled the Free Exercise Clause protected their right to religious practice over the state’s education interest.',
    constitutionalClause: 'First Amendment: Free Exercise Clause',
    comparisonPoints:
      'In both cases, the Court protected religious practitioners from laws that significantly burdened their faith. In Lukumi, the Court specifically checked a government attempt to target a "non-traditional" minority religion.',
    rubricChecklist: [
      'Identified Free Exercise Clause',
      'Described Yoder holding (Amish exemption)',
      'Linked government burden on religious practice',
      'Explained protection of unpopular minority beliefs',
    ],
  },
];
