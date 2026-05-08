export type ScotusEssayPrompt = {
  id: string;
  topic: string;
  requiredCase: string;
  nonRequiredCase: string;
  scenario: string;
  tasks: [string, string, string];
};

export const scotusEssayPrompts: ScotusEssayPrompt[] = [
  {
    id: 'mcculloch-v-maryland',
    topic: 'Federalism & The Supremacy Clause',
    requiredCase: 'McCulloch v. Maryland (1819)',
    nonRequiredCase: 'Arizona v. United States (2012)',
    scenario:
      'Arizona passed S.B. 1070, creating state-level penalties for immigrants who failed to carry registration documents. The federal government sued, arguing immigration is a federal matter. The Court struck down three provisions, holding that federal law preempts conflicting state law in areas of federal authority.',
    tasks: [
      'Identify the constitutional clause that is common to both McCulloch v. Maryland and Arizona v. United States.',
      'Explain how the facts in McCulloch and Arizona led to a similar holding regarding the balance of power.',
      'Explain how the holding in Arizona illustrates the principle of federalism.',
    ],
  },
  {
    id: 'united-states-v-lopez',
    topic: 'Federalism & The Commerce Clause',
    requiredCase: 'United States v. Lopez (1995)',
    nonRequiredCase: 'United States v. Morrison (2000)',
    scenario:
      'The Violence Against Women Act allowed victims of gender-motivated violence to sue in federal court. Congress argued this was valid under the Commerce Clause because such violence affects the economy. The Court struck the provision, holding that gender-motivated violent crime is not economic activity.',
    tasks: [
      'Identify the constitutional clause that is common to both United States v. Lopez and United States v. Morrison.',
      'Explain how the facts in Morrison led to a similar holding as in United States v. Lopez.',
      'Explain how the decision in Morrison reflects the democratic ideal of limited government.',
    ],
  },
  {
    id: 'engel-v-vitale',
    topic: 'The Establishment Clause (Public Funds)',
    requiredCase: 'Engel v. Vitale (1962)',
    nonRequiredCase: 'Lemon v. Kurtzman (1971)',
    scenario:
      'Pennsylvania and Rhode Island passed laws allowing states to fund aspects of religious-school education, including salaries and instructional materials for secular subjects. The Court struck them down and created the Lemon test to prevent excessive government entanglement with religion.',
    tasks: [
      'Identify the First Amendment clause that is common to both Engel v. Vitale and Lemon v. Kurtzman.',
      'Explain how the facts in both cases led to the Court\'s ruling that the government actions were unconstitutional.',
      'Explain how the holding in Lemon impacts the wall of separation between church and state.',
    ],
  },
  {
    id: 'wisconsin-v-yoder',
    topic: 'The Free Exercise Clause',
    requiredCase: 'Wisconsin v. Yoder (1972)',
    nonRequiredCase: 'Church of the Lukumi Babalu Aye, Inc. v. City of Hialeah (1993)',
    scenario:
      'A Florida city passed ordinances prohibiting ritual animal slaughter after a Santeria church announced plans to open. The Court unanimously ruled the ordinances were not neutral or generally applicable because they targeted a religious practice.',
    tasks: [
      'Identify the First Amendment clause that is common to both Wisconsin v. Yoder and Church of the Lukumi Babalu Aye.',
      'Explain how the facts in both cases resulted in holdings that protected citizens\' rights.',
      'Explain how the decision in Lukumi Babalu Aye illustrates the Court\'s role in protecting minority rights.',
    ],
  },
  {
    id: 'schenck-v-united-states',
    topic: 'Free Speech (Dangerous Advocacy)',
    requiredCase: 'Schenck v. United States (1919)',
    nonRequiredCase: 'Brandenburg v. Ohio (1969)',
    scenario:
      'A Ku Klux Klan leader was convicted under an Ohio law prohibiting advocacy of crime, sabotage, violence, or terrorism for political reform. The Court overturned the conviction, ruling that inflammatory speech is protected unless directed to inciting imminent lawless action.',
    tasks: [
      'Identify the civil liberty that is common to both Schenck v. United States and Brandenburg v. Ohio.',
      'Explain how the facts in Schenck and Brandenburg led to different holdings regarding limits of government power.',
      'Explain how the decision in Brandenburg reflects a shift toward more expansive protection of civil liberties.',
    ],
  },
  {
    id: 'tinker-v-des-moines',
    topic: 'Student Speech',
    requiredCase: 'Tinker v. Des Moines (1969)',
    nonRequiredCase: 'Morse v. Frederick (2007)',
    scenario:
      'At a school-sanctioned event, a student displayed a banner reading "Bong Hits 4 Jesus." The principal suspended the student. The Court ruled for the school, holding that schools may restrict student speech reasonably seen as encouraging illegal drug use.',
    tasks: [
      'Identify the civil liberty that is common to both Tinker v. Des Moines and Morse v. Frederick.',
      'Explain how the facts in Morse v. Frederick led to a different holding than in Tinker v. Des Moines.',
      'Explain how the decision in Morse illustrates the Court\'s need to balance individual rights and social order.',
    ],
  },
  {
    id: 'new-york-times-v-united-states',
    topic: 'Prior Restraint & The Press',
    requiredCase: 'New York Times Co. v. United States (1971)',
    nonRequiredCase: 'Hazelwood School District v. Kuhlmeier (1988)',
    scenario:
      'A high school principal removed two pages from a school newspaper due to articles on teen pregnancy and divorce. The Court held officials may exercise editorial control over school-sponsored student speech when tied to legitimate pedagogical concerns.',
    tasks: [
      'Identify the constitutional liberty common to both New York Times v. United States and Hazelwood v. Kuhlmeier.',
      'Explain how the facts in New York Times v. United States and Hazelwood led to different holdings regarding prior restraint.',
      'Explain how the holding in Hazelwood relates to limited government in a school setting.',
    ],
  },
  {
    id: 'brown-v-board-of-education',
    topic: 'Equal Protection (De Facto Segregation)',
    requiredCase: 'Brown v. Board of Education (1954)',
    nonRequiredCase: 'Swann v. Charlotte-Mecklenburg Board of Education (1971)',
    scenario:
      'After Brown, Charlotte schools remained segregated due to housing patterns. A federal court ordered busing to integrate schools. The Court upheld broad federal remedial power once constitutional violations are shown.',
    tasks: [
      'Identify the constitutional clause that is the basis for both Brown and Swann.',
      'Explain how the facts in Swann led to a holding that enforced Brown.',
      'Explain how the decision in Swann relates to federalism.',
    ],
  },
  {
    id: 'shaw-v-reno',
    topic: 'Racial Gerrymandering',
    requiredCase: 'Shaw v. Reno (1993)',
    nonRequiredCase: 'Miller v. Johnson (1995)',
    scenario:
      'Georgia\'s 11th District stretched unusually to connect distant communities as a max-Black district. The Court struck it down, ruling that when race is the predominant factor in districting, strict scrutiny applies and the plan must be narrowly tailored to a compelling interest.',
    tasks: [
      'Identify the constitutional clause common to both Shaw v. Reno and Miller v. Johnson.',
      'Explain how the facts in both cases produced similar holdings.',
      'Explain how the decision in Miller relates to the democratic ideal of republicanism.',
    ],
  },
  {
    id: 'gideon-v-wainwright',
    topic: 'Selective Incorporation (6th Amendment)',
    requiredCase: 'Gideon v. Wainwright (1963)',
    nonRequiredCase: 'Betts v. Brady (1942)',
    scenario:
      'In Betts, an indigent defendant in Maryland was denied counsel and the Court held appointment was not always required. In Gideon, the Court reversed this approach and required states to provide counsel in felony cases under the Sixth Amendment via the Fourteenth Amendment.',
    tasks: [
      'Identify the constitutional clause used to incorporate rights in both Betts v. Brady and Gideon v. Wainwright.',
      'Explain how the facts in Gideon resulted in the Court overturning Betts.',
      'Explain how Gideon illustrates selective incorporation.',
    ],
  },
  {
    id: 'mcdonald-v-chicago',
    topic: 'The 2nd Amendment',
    requiredCase: 'McDonald v. Chicago (2010)',
    nonRequiredCase: 'District of Columbia v. Heller (2008)',
    scenario:
      'D.C. banned unregistered firearms and effectively prohibited handgun registration. The Court held the Second Amendment protects an individual right to possess a firearm for self-defense in the home in federal enclaves, setting the foundation for incorporation against states.',
    tasks: [
      'Identify the constitutional amendment common to both McDonald v. Chicago and District of Columbia v. Heller.',
      'Explain how the holding in Heller provided the legal basis for McDonald.',
      'Explain how McDonald reflects federalism.',
    ],
  },
  {
    id: 'citizens-united-v-fec',
    topic: 'Campaign Finance',
    requiredCase: 'Citizens United v. FEC (2010)',
    nonRequiredCase: 'Buckley v. Valeo (1976)',
    scenario:
      'Congress enacted campaign-finance limits. The Court in Buckley upheld contribution limits but struck spending limits on candidates\' own money, treating spending as speech. Citizens United extended this logic by expanding constitutional protection for independent political expenditures.',
    tasks: [
      'Identify the First Amendment clause common to Citizens United v. FEC and Buckley v. Valeo.',
      'Explain how Buckley\'s money-is-speech logic led to Citizens United.',
      'Explain how Citizens United illustrates pluralist democracy.',
    ],
  },
  {
    id: 'marbury-v-madison',
    topic: 'Judicial Review & Executive Power',
    requiredCase: 'Marbury v. Madison (1803)',
    nonRequiredCase: 'United States v. Nixon (1974)',
    scenario:
      'During Watergate, President Nixon refused to release tapes, citing executive privilege. The Court held privilege exists but is not absolute and cannot block evidence in a criminal trial.',
    tasks: [
      'Identify the constitutional power established in Marbury that the Court exercised in United States v. Nixon.',
      'Explain how Marbury enabled the Court to rule against the president in Nixon.',
      'Explain how Nixon reflects checks and balances.',
    ],
  },
  {
    id: 'baker-v-carr',
    topic: 'One Person, One Vote',
    requiredCase: 'Baker v. Carr (1962)',
    nonRequiredCase: 'Reynolds v. Sims (1964)',
    scenario:
      'Alabama had not redrawn legislative districts since 1901 despite major population shifts, producing districts with huge disparities. The Court held that under the Fourteenth Amendment, both chambers of a bicameral state legislature must be apportioned by population.',
    tasks: [
      'Identify the constitutional clause common to Baker v. Carr and Reynolds v. Sims.',
      'Explain how Baker opened the door to Reynolds.',
      'Explain how Reynolds relates to popular sovereignty.',
    ],
  },
  {
    id: 'roe-v-wade',
    topic: 'The Right to Privacy',
    requiredCase: 'Roe v. Wade (1973)',
    nonRequiredCase: 'Griswold v. Connecticut (1965)',
    scenario:
      'Connecticut banned the use of contraceptive methods. In Griswold, the Court struck the law down and recognized privacy zones derived from Bill of Rights protections. Roe later relied on that privacy precedent in evaluating abortion regulation.',
    tasks: [
      'Identify the constitutional amendment or implied right common to Roe v. Wade and Griswold v. Connecticut.',
      'Explain how Griswold established precedent used in Roe.',
      'Explain how Griswold reflects the democratic ideal of natural rights.',
    ],
  },
];

