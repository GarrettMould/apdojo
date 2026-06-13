import type { Question } from '@/data/questionBanks/types';

/**
 * AP U.S. Government & Politics — Unit 3 **formal unit MCQ test** only
 * (`/unit-mcq-test/3?subject=gov`, pretty URL `/ap-gov-unit-3-mcq-test`).
 * IDs in 63xx range. Text-based stimulus passages open the test.
 *
 * Aligned with the 2023–2026 AP Gov CED Unit 3: Civil Liberties and Civil Rights.
 */
export const govUnit3McqTestQuestions: Question[] = [
  {
    id: 6301,
    subject: 'ap_us_government',
    unit: 3,
    lessonIDS: ['3.10'],
    unitName: 'Civil Liberties and Civil Rights',
    questionGroup: 'u3-stim-birmingham',
    question:
      'Questions 1-2 refer to the following excerpt.\n\n"You express a great deal of anxiety over our willingness to break laws. This is certainly a legitimate concern. Since we so diligently urge people to obey the Supreme Court’s decision of 1954 outlawing segregation in the public schools, at first glance it may seem paradoxical for us consciously to break laws. One may well ask: "How can you advocate breaking some laws and obeying others?" The answer lies in the fact that there are two types of laws: just and unjust. I would be the first to advocate obeying just laws. One has not only a legal but a moral responsibility to obey just laws. Conversely, one has a moral responsibility to disobey unjust laws."\n—Dr. Martin Luther King Jr., "Letter from a Birmingham Jail," 1963\n\nBased on the excerpt, which of the following best summarizes King’s argument regarding the obligation of citizens in a democracy?',
    image: null,
    options: [
      'Citizens should adhere to all laws, regardless of their content, to ensure social order.',
      'Unjust laws are only valid if they are passed by a legislative majority.',
      'Citizens have a moral imperative to challenge laws that violate human dignity or constitutional rights.',
      'The Supreme Court is the only entity with the authority to declare a law unjust.',
    ],
    correctAnswer: 'C',
    explanation:
      'King argues that there is a moral distinction between just and unjust laws, and that citizens have a moral responsibility to resist those that are unjust.',
  },
  {
    id: 6302,
    subject: 'ap_us_government',
    unit: 3,
    lessonIDS: ['3.10'],
    unitName: 'Civil Liberties and Civil Rights',
    questionGroup: 'u3-stim-birmingham',
    question:
      'King’s argument in the excerpt serves as a philosophical justification for which of the following democratic concepts?',
    image: null,
    options: [
      'Participatory democracy through nonviolent civil disobedience.',
      'Elite democracy through legal challenges in the Supreme Court.',
      'Pluralist democracy through the lobbying of congressional committees.',
      'Limited government through the strict adherence to state-level ordinances.',
    ],
    correctAnswer: 'A',
    explanation:
      'King advocates for the people to participate directly in the democratic process by using nonviolent civil disobedience to highlight and change systemic injustice.',
  },
  {
    id: 6303,
    subject: 'ap_us_government',
    unit: 3,
    lessonIDS: ['3.11'],
    unitName: 'Civil Liberties and Civil Rights',
    questionGroup: 'u3-stim-14th-amend',
    question:
      'Question 3 refers to the following excerpt.\n\n"No State shall make or enforce any law which shall abridge the privileges or immunities of citizens of the United States; nor shall any State deprive any person of life, liberty, or property, without due process of law; nor deny to any person within its jurisdiction the equal protection of the laws."\n—Fourteenth Amendment, 1868\n\nWhich of the following constitutional doctrines is most clearly supported by the text of the Fourteenth Amendment?',
    image: null,
    options: [
      'The doctrine of total state sovereignty.',
      'The doctrine of selective incorporation of the Bill of Rights.',
      'The doctrine of implied presidential emergency powers.',
      'The doctrine of absolute judicial restraint.',
    ],
    correctAnswer: 'B',
    explanation:
      'The 14th Amendment’s Due Process and Equal Protection clauses are the constitutional foundations the Supreme Court uses to apply Bill of Rights protections to state governments.',
  },
  {
    id: 6307,
    subject: 'ap_us_government',
    unit: 3,
    lessonIDS: ['3.3'],
    unitName: 'Civil Liberties and Civil Rights',
    questionGroup: 'u3-stim-1st-amend',
    question:
      'Question 4 refers to the following excerpt.\n\n"Congress shall make no law... abridging the freedom of speech, or of the press; or the right of the people peaceably to assemble, and to petition the Government for a redress of grievances."\n—First Amendment, 1791\n\nWhich of the following scenarios would constitute a direct violation of the protections listed above?',
    image: null,
    options: [
      'A city council denies a permit for a protest because they disagree with the protesters’ message.',
      'A school district requires all students to wear uniforms.',
      'The federal government imposes a tax on all commercial radio advertisements.',
      'A local library requires library cards to check out materials.',
    ],
    correctAnswer: 'A',
    explanation:
      'The government cannot deny a permit based on the *content* of the message; this is a violation of the freedom of assembly and speech.',
  },
  {
    id: 6309,
    subject: 'ap_us_government',
    unit: 3,
    lessonIDS: ['3.8'],
    unitName: 'Civil Liberties and Civil Rights',
    questionGroup: 'u3-stim-5th-amend',
    question:
      'Questions 5-6 refer to the following excerpt.\n\n"No person... shall be compelled in any criminal case to be a witness against himself, nor be deprived of life, liberty, or property, without due process of law."\n—Fifth Amendment, 1791\n\nWhich of the following Supreme Court cases further refined the rights mentioned in this excerpt regarding police interrogation?',
    image: null,
    options: [
      'Gideon v. Wainwright (1963)',
      'Miranda v. Arizona (1966)',
      'New York Times Co. v. United States (1971)',
      'Tinker v. Des Moines (1969)',
    ],
    correctAnswer: 'B',
    explanation:
      'The Miranda rule requires police to inform suspects of their right against self-incrimination (5th Amendment) and the right to counsel (6th Amendment).',
  },
  {
    id: 6310,
    subject: 'ap_us_government',
    unit: 3,
    lessonIDS: ['3.8'],
    unitName: 'Civil Liberties and Civil Rights',
    questionGroup: 'u3-stim-5th-amend',
    question:
      'How does the Due Process clause of the Fifth Amendment apply to the federal government compared to the Fourteenth Amendment’s application to the states?',
    image: null,
    options: [
      'The Fifth Amendment protects the accused from the national government, while the Fourteenth Amendment protects the accused from state governments.',
      'The Fifth Amendment only applies to civil cases, whereas the Fourteenth Amendment applies to all cases.',
      'They are identical in wording and have no difference in application.',
      'The Fourteenth Amendment supersedes and completely replaces the Fifth Amendment.',
    ],
    correctAnswer: 'A',
    explanation:
      'The 5th Amendment constrains the federal government, and the 14th Amendment, through selective incorporation, constrains the states.',
  },
  {
    id: 6312,
    subject: 'ap_us_government',
    unit: 3,
    lessonIDS: ['3.7'],
    unitName: 'Civil Liberties and Civil Rights',
    questionGroup: 'u3-concept-incorporation',
    question:
      'A state law prohibits the carrying of firearms in public spaces. A citizen challenges the law, arguing it violates the Second Amendment. Which of the following constitutional doctrines would the Supreme Court most likely use to evaluate this claim against the state government?',
    image: null,
    options: [
      'The Supremacy Clause, because federal law automatically overrides state law',
      "Selective incorporation via the 14th Amendment's Due Process Clause, because the Second Amendment has been incorporated against the states",
      'The Necessary and Proper Clause, because gun regulation is implied in federal power',
      'The 10th Amendment, because states retain exclusive authority over public safety',
    ],
    correctAnswer: 'B',
    explanation:
      'Because the Second Amendment has been incorporated against the states through the 14th Amendment’s Due Process Clause, the Court evaluates state gun laws under that framework—not through the Supremacy Clause or reserved state powers alone.',
  },
  {
    id: 6316,
    subject: 'ap_us_government',
    unit: 3,
    lessonIDS: ['3.3'],
    unitName: 'Civil Liberties and Civil Rights',
    questionGroup: 'u3-concept-time-place-manner',
    question:
      'A city ordinance prohibits the use of amplified sound in a public park between 10pm and 7am. A political group argues this violates their First Amendment rights. Which of the following best describes the constitutionality of this ordinance?',
    image: null,
    options: [
      'Unconstitutional, because the government can never restrict speech in a public forum',
      'Unconstitutional, because the restriction targets the political content of the group\'s message',
      'Constitutional, because it is a content-neutral time, place, and manner restriction that serves a significant government interest',
      'Constitutional, because political speech in public parks receives no First Amendment protection',
    ],
    correctAnswer: 'C',
    explanation:
      'A content-neutral regulation of when and how speech occurs in a public forum is permissible if it serves a significant government interest and leaves open alternative channels for expression.',
  },
  {
    id: 6317,
    subject: 'ap_us_government',
    unit: 3,
    lessonIDS: ['3.4'],
    unitName: 'Civil Liberties and Civil Rights',
    questionGroup: 'u3-concept-prior-restraint',
    question:
      'A newspaper obtains classified documents revealing government misconduct and plans to publish them. The federal government seeks a court order to block publication. This action is best described as:',
    image: null,
    options: [
      'A legitimate exercise of executive war powers that courts must defer to',
      'Prior restraint, which carries a heavy presumption of unconstitutionality under First Amendment doctrine',
      'A valid application of the exclusionary rule to protect national security',
      'An example of symbolic speech regulation, which receives reduced constitutional protection',
    ],
    correctAnswer: 'B',
    explanation:
      'Government censorship before publication is prior restraint; the Supreme Court has held that such orders face a heavy presumption against their constitutionality, as in *New York Times Co. v. United States*.',
  },
  {
    id: 6318,
    subject: 'ap_us_government',
    unit: 3,
    lessonIDS: ['3.5'],
    unitName: 'Civil Liberties and Civil Rights',
    questionGroup: 'u3-concept-second-amendment',
    question:
      'Which pair of Supreme Court cases established, first, that the Second Amendment protects an individual right to bear arms, and second, that this right applies to state governments?',
    image: null,
    options: [
      'Tinker v. Des Moines and Gideon v. Wainwright',
      'District of Columbia v. Heller and McDonald v. Chicago',
      'Miranda v. Arizona and Mapp v. Ohio',
      'Brown v. Board of Education and Engel v. Vitale',
    ],
    correctAnswer: 'B',
    explanation:
      '*Heller* (2008) recognized an individual Second Amendment right, and *McDonald* (2010) incorporated that right against the states via the 14th Amendment.',
  },
  {
    id: 6321,
    subject: 'ap_us_government',
    unit: 3,
    lessonIDS: ['3.8'],
    unitName: 'Civil Liberties and Civil Rights',
    questionGroup: 'u3-concept-exclusionary-rule',
    question:
      'Police officers enter a home without a warrant and discover evidence of a crime. At trial, the prosecution attempts to use this evidence. Under which doctrine would the defense most likely move to have the evidence excluded?',
    image: null,
    options: [
      'The doctrine of selective incorporation, because state police violated a federal standard',
      'The exclusionary rule, because evidence obtained through an unconstitutional search cannot be used in court',
      'Substantive due process, because the law criminalizing the behavior is itself unjust',
      'The doctrine of prior restraint, because the government acted before a judicial determination of guilt',
    ],
    correctAnswer: 'B',
    explanation:
      'The exclusionary rule bars prosecutors from using evidence obtained through unconstitutional searches and seizures, deterring Fourth Amendment violations by law enforcement.',
  },
  {
    id: 6336,
    subject: 'ap_us_government',
    unit: 3,
    lessonIDS: ['3.6', '3.8'],
    unitName: 'Civil Liberties and Civil Rights',
    questionGroup: 'u3-stim-death-penalty-trend',
    question:
      'Based on the line graph, which of the following best explains the long-term decline in public support for the death penalty since 1994?',
    image: {
      src: 'https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com/unitTestImages/gov/unit_3/public+support+death+penality.svg',
      alt: 'Line graph showing public support for the death penalty over time since 1994',
    },
    options: [
      'The Supreme Court ruled capital punishment unconstitutional for all crimes in 1994, which shifted public opinion.',
      'Shifting public attitudes about cruel and unusual punishment, increased awareness of wrongful convictions, and changing social norms have contributed to declining support over time.',
      'Congress passed legislation banning the death penalty in federal cases, which influenced state-level public opinion.',
      'The decline reflects a generational effect in which all Americans born after 1980 oppose capital punishment.',
    ],
    correctAnswer: 'B',
    explanation:
      'Public opinion on social issues is multifaceted; the decline in support for capital punishment is attributed to a variety of factors, including the exoneration of death row inmates via DNA evidence and changing perspectives on what constitutes a fair and humane justice system.',
  },
  {
    id: 6337,
    subject: 'ap_us_government',
    unit: 3,
    lessonIDS: ['3.6', '3.8'],
    unitName: 'Civil Liberties and Civil Rights',
    questionGroup: 'u3-stim-death-penalty-trend',
    question:
      'The trend shown in the line graph most directly relates to which constitutional principle debated in Eighth Amendment jurisprudence?',
    image: {
      src: 'https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com/unitTestImages/gov/unit_3/public+support+death+penality.svg',
      alt: 'Line graph showing public support for the death penalty over time since 1994',
    },
    options: [
      'The incorporation doctrine, which requires states to apply federal standards for capital punishment.',
      'The principle of evolving standards of decency, in which the Supreme Court considers shifting public opinion when evaluating whether a punishment constitutes cruel and unusual punishment.',
      'The due process clause, which requires unanimous jury verdicts before a death sentence can be imposed.',
      'The equal protection clause, which prohibits the application of the death penalty to any protected class.',
    ],
    correctAnswer: 'B',
    explanation:
      'The Supreme Court has long held that the Eighth Amendment\'s prohibition against "cruel and unusual punishment" must draw its meaning from the "evolving standards of decency that mark the progress of a maturing society," often looking to public opinion and legislative trends as indicators.',
  },
  {
    id: 6323,
    subject: 'ap_us_government',
    unit: 3,
    lessonIDS: ['3.9'],
    unitName: 'Civil Liberties and Civil Rights',
    questionGroup: 'u3-concept-substantive-due-process',
    question: 'How does "substantive due process" differ from "procedural due process"?',
    image: null,
    options: [
      "Substantive due process focuses on the fairness of the laws themselves, while procedural focuses on the fairness of the government's methods.",
      'Substantive due process only applies to the federal government, while procedural applies to states.',
      'Substantive due process is only used in civil cases, while procedural is only used in criminal cases.',
      'There is no difference; the terms are legally interchangeable.',
    ],
    correctAnswer: 'A',
    explanation:
      'Substantive due process examines the content and validity of the law itself, whereas procedural due process examines the steps taken during enforcement.',
  },
  {
    id: 6338,
    subject: 'ap_us_government',
    unit: 3,
    lessonIDS: ['3.9', '3.11'],
    unitName: 'Civil Liberties and Civil Rights',
    questionGroup: 'u3-stim-same-sex-marriage',
    question:
      'Based on the line graph, which of the following constitutional developments best explains the sharp increase in public support for the legal recognition of same-sex marriage between 2003 and 2015?',
    image: {
      src: 'https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com/unitTestImages/gov/unit_3/same+sex+marriage.svg',
      alt: 'Line graph showing public support for legal recognition of same-sex marriage over time',
    },
    options: [
      'The Supreme Court\'s decision in Engel v. Vitale expanded the right to privacy to include personal relationship choices.',
      'The Supreme Court\'s use of the Due Process and Equal Protection Clauses to strike down laws restricting same-sex relationships reflected and reinforced a broader shift in public attitudes toward equal treatment under the law.',
      'Congress passed the Defense of Marriage Act in 1996, which accelerated public support for same-sex marriage by drawing national attention to the issue.',
      'The incorporation of the First Amendment\'s free exercise clause to the states required state governments to recognize same-sex marriages performed in other states.',
    ],
    correctAnswer: 'B',
    explanation:
      'Judicial decisions like Obergefell v. Hodges used the Due Process and Equal Protection clauses to protect marriage rights, mirroring and encouraging the trend of increasing public acceptance for equality.',
  },
  {
    id: 6339,
    subject: 'ap_us_government',
    unit: 3,
    lessonIDS: ['3.10'],
    unitName: 'Civil Liberties and Civil Rights',
    questionGroup: 'u3-stim-same-sex-marriage',
    question:
      'The trend shown in the line graph best illustrates which of the following dynamics between social movements and government action in the United States?',
    image: {
      src: 'https://apdojowhiteboards.s3.ap-southeast-2.amazonaws.com/unitTestImages/gov/unit_3/same+sex+marriage.svg',
      alt: 'Line graph showing public support for legal recognition of same-sex marriage over time',
    },
    options: [
      'The Supreme Court consistently leads public opinion by striking down discriminatory laws before a majority of Americans support change.',
      'Public opinion has no measurable effect on Supreme Court decisions because justices are insulated from political pressure through lifetime appointments.',
      'Organized social movements can shift public opinion over time, creating political pressure that eventually influences both legislative and judicial responses, consistent with the pluralist model of democracy.',
      'The data demonstrates that civil liberties expansions occur exclusively through constitutional amendments rather than through judicial reinterpretation of existing clauses.',
    ],
    correctAnswer: 'C',
    explanation:
      'The rising trend in public support reflects decades of advocacy by social movements, demonstrating how grassroots efforts act as linkage institutions that eventually influence judicial and policy outcomes.',
  },
  {
    id: 6327,
    subject: 'ap_us_government',
    unit: 3,
    lessonIDS: ['3.12'],
    unitName: 'Civil Liberties and Civil Rights',
    questionGroup: 'u3-concept-brown-v-board',
    question:
      'A state law requires children to attend racially separate public schools, provided the facilities receive comparable funding. Parents sue, arguing the law violates the Equal Protection Clause. Which precedent would their attorneys most likely cite, and why?',
    image: null,
    options: [
      'Plessy v. Ferguson (1896), because the state has ensured truly equal facilities',
      'Brown v. Board of Education (1954), because separate public schools are inherently unequal regardless of physical conditions',
      'Shaw v. Reno (1993), because the law draws electoral district lines based on race',
      'Engel v. Vitale (1962), because the state is imposing religious practices in schools',
    ],
    correctAnswer: 'B',
    explanation:
      'Brown held that state-mandated racial segregation in public education violates the Equal Protection Clause because separate facilities are inherently unequal—directly undermining the separate-but-equal logic the state invokes in this scenario.',
  },
  {
    id: 6333,
    subject: 'ap_us_government',
    unit: 3,
    lessonIDS: ['3.7'],
    unitName: 'Civil Liberties and Civil Rights',
    questionGroup: 'u3-concept-incorporation-process',
    question:
      'The Supreme Court ruled in Gitlow v. New York (1925) that the First Amendment applies to state governments. This decision is historically significant because it:',
    image: null,
    options: [
      'Established that the Bill of Rights was always intended to apply automatically to all levels of government',
      "Marked one of the earliest applications of selective incorporation, using the 14th Amendment's Due Process Clause to extend a federal right to the states",
      'Overturned the precedent set by Brown v. Board of Education regarding state authority',
      'Granted Congress the authority to pass laws directly regulating state court procedures',
    ],
    correctAnswer: 'B',
    explanation:
      '*Gitlow* was an early incorporation case in which the Court used the 14th Amendment’s Due Process Clause to apply a Bill of Rights protection—the freedom of speech—to state governments.',
  },
];

/** Dropped from the Unit 3 test — retained for reference or future use. */
export const extras: Question[] = [
  {
    id: 6304,
    subject: 'ap_us_government',
    unit: 3,
    lessonIDS: ['3.11'],
    unitName: 'Civil Liberties and Civil Rights',
    questionGroup: 'u3-stim-14th-amend',
    question:
      'The Equal Protection Clause of the Fourteenth Amendment has most often been used by the Supreme Court to:',
    image: null,
    options: [
      'Protect the economic interests of large corporations against state regulation.',
      'Invalidate state-mandated segregation and discriminatory voting practices.',
      'Grant the federal government power to regulate interstate commerce.',
      'Ensure that religious organizations do not receive tax-exempt status.',
    ],
    correctAnswer: 'B',
    explanation:
      'The Equal Protection Clause is the standard used to challenge laws that discriminate based on characteristics such as race, origin, or gender (e.g., *Brown v. Board*).',
  },
  {
    id: 6305,
    subject: 'ap_us_government',
    unit: 3,
    lessonIDS: ['3.7'],
    unitName: 'Civil Liberties and Civil Rights',
    questionGroup: 'u3-stim-art-confed',
    question:
      'Questions 5-6 refer to the following excerpt.\n\n"Each state retains its sovereignty, freedom and independence, and every power, jurisdiction and right, which is not by this confederation expressly delegated to the United States, in Congress assembled."\n—Articles of Confederation, Article II, 1781\n\nHow does the provision above contrast with the civil rights protections provided by the modern national government?',
    image: null,
    options: [
      'Under the Articles, the national government had supreme authority to enforce civil rights, whereas today, states have exclusive control.',
      'The Articles prioritized state sovereignty, while the modern national government uses the Fourteenth Amendment to enforce civil rights nationwide.',
      'The Articles established a robust Bill of Rights that prohibited state discrimination, while the current Constitution does not.',
      'The Articles created a national court system, which the modern Constitution abolished.',
    ],
    correctAnswer: 'B',
    explanation:
      'The Articles emphasized state independence over national authority. The modern era uses the 14th Amendment to grant the national government power to protect rights *against* state actions.',
  },
  {
    id: 6306,
    subject: 'ap_us_government',
    unit: 3,
    lessonIDS: ['3.7'],
    unitName: 'Civil Liberties and Civil Rights',
    questionGroup: 'u3-stim-art-confed',
    question:
      'Which constitutional amendment was specifically created to address the limitation of state power suggested by the "sovereignty" language in the Articles of Confederation?',
    image: null,
    options: [
      'The First Amendment',
      'The Tenth Amendment',
      'The Fourteenth Amendment',
      'The Twenty-Seventh Amendment',
    ],
    correctAnswer: 'C',
    explanation:
      'The 14th Amendment serves as a limit on state power, specifically countering the concept that states have absolute sovereignty to deny rights to their citizens.',
  },
  {
    id: 6308,
    subject: 'ap_us_government',
    unit: 3,
    lessonIDS: ['3.4'],
    unitName: 'Civil Liberties and Civil Rights',
    questionGroup: 'u3-stim-1st-amend',
    question:
      'The "freedom of the press" clause is intended to ensure that the press remains free to act as a(n):',
    image: null,
    options: [
      'Official arm of the executive branch to spread policy news.',
      'Watchdog that can hold government officials accountable without fear of retribution.',
      'Filter that only publishes information approved by Congress.',
      'Private entity that does not need to report accurate information to the public.',
    ],
    correctAnswer: 'B',
    explanation:
      'The freedom of the press is fundamental to a democracy because it allows for the investigation and critique of government action without fear of prior restraint.',
  },
  {
    id: 6311,
    subject: 'ap_us_government',
    unit: 3,
    lessonIDS: ['3.1'],
    unitName: 'Civil Liberties and Civil Rights',
    questionGroup: 'u3-concept-bill-of-rights',
    question: 'The primary purpose of the Bill of Rights is to:',
    image: null,
    options: [
      'Outline the specific responsibilities of the judicial branch.',
      'Protect individual liberties and rights against arbitrary government interference.',
      'Define the powers granted to the states within a federalist system.',
      'Establish the procedure for how a bill becomes a law.',
    ],
    correctAnswer: 'B',
    explanation:
      'The Bill of Rights was explicitly designed as a set of amendments to restrict government power and secure individual freedoms from federal overreach.',
  },
  {
    id: 6313,
    subject: 'ap_us_government',
    unit: 3,
    lessonIDS: ['3.2'],
    unitName: 'Civil Liberties and Civil Rights',
    questionGroup: 'u3-concept-establishment-clause',
    question: 'The Establishment Clause of the First Amendment is interpreted to mean that:',
    image: null,
    options: [
      'The government may choose one religion as the official state religion.',
      'The government cannot create a national church or favor one religion over another.',
      'All religious institutions are exempt from federal taxation.',
      'Private schools must adhere to the same curriculum as public schools.',
    ],
    correctAnswer: 'B',
    explanation:
      'The Establishment Clause creates a "wall of separation" between church and state, prohibiting the government from sanctioning or favoring religious practice.',
  },
  {
    id: 6314,
    subject: 'ap_us_government',
    unit: 3,
    lessonIDS: ['3.2'],
    unitName: 'Civil Liberties and Civil Rights',
    questionGroup: 'u3-concept-free-exercise',
    question: 'According to the Free Exercise Clause, individuals are entitled to:',
    image: null,
    options: [
      'Financial support from the government for religious construction.',
      'Practice their religious beliefs as they see fit, provided the actions do not harm public order or safety.',
      'Exemptions from all federal laws if those laws conflict with their faith.',
      'Deny services to others regardless of federal anti-discrimination statutes.',
    ],
    correctAnswer: 'B',
    explanation:
      'While religious *belief* is absolute, religious *actions* are subject to legal limitations if they violate a compelling state interest or threaten public safety.',
  },
  {
    id: 6315,
    subject: 'ap_us_government',
    unit: 3,
    lessonIDS: ['3.3'],
    unitName: 'Civil Liberties and Civil Rights',
    questionGroup: 'u3-concept-symbolic-speech',
    question:
      'Which of the following types of speech receives the highest level of protection under First Amendment jurisprudence?',
    image: null,
    options: [
      'Defamatory speech (slander/libel).',
      'Obscenity.',
      'Symbolic speech (nonverbal action that communicates an idea).',
      'Fighting words likely to provoke immediate violence.',
    ],
    correctAnswer: 'C',
    explanation:
      'Symbolic speech is protected under the First Amendment; by contrast, obscenity, defamation, and fighting words are considered exceptions to free speech protection.',
  },
  {
    id: 6319,
    subject: 'ap_us_government',
    unit: 3,
    lessonIDS: ['3.6'],
    unitName: 'Civil Liberties and Civil Rights',
    questionGroup: 'u3-concept-eighth-amendment',
    question:
      'The Eighth Amendment’s protection against "cruel and unusual punishment" is most frequently debated in the context of:',
    image: null,
    options: [
      'The length of prison sentences for non-violent drug offenses.',
      'The application of the death penalty.',
      'The conditions of juvenile detention centers.',
      'The use of solitary confinement for political prisoners.',
    ],
    correctAnswer: 'B',
    explanation:
      'The legality of capital punishment is the primary constitutional battleground for Eighth Amendment claims regarding "cruel and unusual" standards.',
  },
  {
    id: 6320,
    subject: 'ap_us_government',
    unit: 3,
    lessonIDS: ['3.8'],
    unitName: 'Civil Liberties and Civil Rights',
    questionGroup: 'u3-concept-procedural-due-process',
    question: 'Which of the following is a key requirement of procedural due process?',
    image: null,
    options: [
      'The government must provide a unanimous verdict for all criminal trials.',
      'The government must follow established, non-arbitrary procedures before depriving a person of life, liberty, or property.',
      'The government must provide financial compensation for all legal expenses incurred by the accused.',
      'The government must bypass traditional court trials for matters involving national security.',
    ],
    correctAnswer: 'B',
    explanation:
      'Procedural due process focuses on the "how" of government action; it ensures the methods used by officials to deprive rights are fair and not arbitrary.',
  },
  {
    id: 6322,
    subject: 'ap_us_government',
    unit: 3,
    lessonIDS: ['3.9'],
    unitName: 'Civil Liberties and Civil Rights',
    questionGroup: 'u3-concept-right-privacy',
    question:
      'The Supreme Court has interpreted the Due Process Clause of the Fourteenth Amendment to imply a right to privacy. Which of the following is a result of that interpretation?',
    image: null,
    options: [
      'The right of the government to collect digital metadata without a warrant.',
      'The right to protection from self-incrimination.',
      'The recognition of unenumerated rights, such as those addressed in Griswold v. Connecticut.',
      'The requirement that all citizens must have medical insurance.',
    ],
    correctAnswer: 'C',
    explanation:
      'While the word "privacy" does not appear in the Constitution, the Court has used substantive due process to recognize it as an unenumerated right.',
  },
  {
    id: 6324,
    subject: 'ap_us_government',
    unit: 3,
    lessonIDS: ['3.10'],
    unitName: 'Civil Liberties and Civil Rights',
    questionGroup: 'u3-concept-equal-protection',
    question: 'The "Equal Protection Clause" of the Fourteenth Amendment is the primary legal basis for:',
    image: null,
    options: [
      'Combating discrimination based on race, gender, and other protected characteristics.',
      'Regulating interstate commerce.',
      'Establishing the federal income tax.',
      'Managing the election process for the Electoral College.',
    ],
    correctAnswer: 'A',
    explanation:
      'The Equal Protection Clause serves as the constitutional backbone for civil rights, prohibiting states from denying any person equal protection under the law.',
  },
  {
    id: 6325,
    subject: 'ap_us_government',
    unit: 3,
    lessonIDS: ['3.10'],
    unitName: 'Civil Liberties and Civil Rights',
    questionGroup: 'u3-concept-birmingham-jail',
    question:
      'Dr. Martin Luther King Jr.’s "Letter from a Birmingham Jail" was a pivotal document in the civil rights movement because it:',
    image: null,
    options: [
      'Argued that citizens have a moral duty to disobey unjust laws through nonviolent direct action.',
      'Demanded an immediate constitutional amendment to abolish the Supreme Court.',
      'Advocated for violent revolution to dismantle segregated institutions.',
      'Requested that Congress immediately dissolve the separation of church and state.',
    ],
    correctAnswer: 'A',
    explanation:
      'The letter provides a philosophical defense of civil disobedience and the nonviolent approach to challenging systemic racial injustice.',
  },
  {
    id: 6326,
    subject: 'ap_us_government',
    unit: 3,
    lessonIDS: ['3.11'],
    unitName: 'Civil Liberties and Civil Rights',
    questionGroup: 'u3-concept-civil-rights-acts',
    question:
      'Which of the following is a primary difference between the Civil Rights Act of 1964 and the Voting Rights Act of 1965?',
    image: null,
    options: [
      'The Civil Rights Act focused on public accommodations and employment, while the Voting Rights Act targeted racial discrimination in voting.',
      'The Civil Rights Act only applied to the North, while the Voting Rights Act only applied to the South.',
      'The Civil Rights Act established a national education curriculum, while the Voting Rights Act regulated campaign finance.',
      'The Civil Rights Act required constitutional amendments, while the Voting Rights Act was passed by executive order.',
    ],
    correctAnswer: 'A',
    explanation:
      'The Civil Rights Act of 1964 largely addressed private/public discrimination in trade and hiring, while the Voting Rights Act specifically addressed barriers to the franchise.',
  },
  {
    id: 6328,
    subject: 'ap_us_government',
    unit: 3,
    lessonIDS: ['3.13'],
    unitName: 'Civil Liberties and Civil Rights',
    questionGroup: 'u3-concept-affirmative-action',
    question:
      'Affirmative action policies in higher education have been constitutionally debated under which framework?',
    image: null,
    options: [
      'The Necessary and Proper Clause.',
      'The Equal Protection Clause of the Fourteenth Amendment.',
      'The Fourth Amendment’s protection against search and seizure.',
      'The First Amendment’s Freedom of Assembly.',
    ],
    correctAnswer: 'B',
    explanation:
      'The core legal debate in affirmative action is whether race-conscious admissions violate the Equal Protection Clause by discriminating against other groups.',
  },
  {
    id: 6329,
    subject: 'ap_us_government',
    unit: 3,
    lessonIDS: ['3.1'],
    unitName: 'Civil Liberties and Civil Rights',
    questionGroup: 'u3-concept-ninth-amendment',
    question: 'What is the constitutional significance of the Ninth Amendment?',
    image: null,
    options: [
      'It reserves all powers not delegated to the federal government to the states.',
      'It states that the existence of specific rights in the Constitution does not deny other rights retained by the people.',
      'It clarifies the definition of citizenship.',
      'It outlines the process for presidential succession.',
    ],
    correctAnswer: 'B',
    explanation:
      'The Ninth Amendment is a vital safeguard that prevents the government from arguing that because a right isn’t explicitly listed, it doesn’t exist.',
  },
  {
    id: 6330,
    subject: 'ap_us_government',
    unit: 3,
    lessonIDS: ['3.6'],
    unitName: 'Civil Liberties and Civil Rights',
    questionGroup: 'u3-concept-compelling-interest',
    question:
      "In the debate over civil liberties and public order, the government is most likely to limit an individual's rights when:",
    image: null,
    options: [
      'The individual is a member of a political party that does not hold the majority.',
      "The individual's actions create a clear danger to the safety of others or the general welfare.",
      'The individual is participating in a protest that is critical of the president.',
      'The individual’s beliefs are considered unconventional by the public.',
    ],
    correctAnswer: 'B',
    explanation:
      'The Supreme Court uses the "compelling interest" test; if an individual’s action poses a direct threat to public safety, the government can restrict that specific action.',
  },
  {
    id: 6331,
    subject: 'ap_us_government',
    unit: 3,
    lessonIDS: ['3.11'],
    unitName: 'Civil Liberties and Civil Rights',
    questionGroup: 'u3-concept-title-ix',
    question: 'Title IX of the Education Amendments Act of 1972 is best known for:',
    image: null,
    options: [
      'Requiring all schools to teach religious studies.',
      'Prohibiting sex-based discrimination in any education program or activity receiving federal funding.',
      'Forcing state governments to fund private religious schools.',
      'Mandating that all students pass a federal test to graduate.',
    ],
    correctAnswer: 'B',
    explanation:
      'Title IX prevents institutions from excluding individuals from participation in or denying them benefits of educational programs based on sex.',
  },
  {
    id: 6332,
    subject: 'ap_us_government',
    unit: 3,
    lessonIDS: ['3.10'],
    unitName: 'Civil Liberties and Civil Rights',
    questionGroup: 'u3-concept-14th-amendment',
    question:
      'Which constitutional interpretation has most significantly influenced the power of the federal government to enforce civil rights protections against the states?',
    image: null,
    options: [
      'The interpretation of the Fourteenth Amendment’s Due Process and Equal Protection Clauses.',
      'The interpretation of the Seventh Amendment’s right to a jury trial.',
      'The interpretation of the Third Amendment’s prohibition on quartering soldiers.',
      'The interpretation of the Twenty-Second Amendment’s term limits.',
    ],
    correctAnswer: 'A',
    explanation:
      'The 14th Amendment effectively created a national standard for civil rights that states cannot violate, greatly expanding federal judicial power.',
  },
  {
    id: 6335,
    subject: 'ap_us_government',
    unit: 3,
    lessonIDS: ['3.10'],
    unitName: 'Civil Liberties and Civil Rights',
    questionGroup: 'u3-concept-social-movements',
    question: 'A "social movement" is best defined as:',
    image: null,
    options: [
      'A government-created agency tasked with public outreach.',
      'A large, informal grouping of individuals and organizations focused on specific political or social issues to bring about change.',
      'A formal political party running candidates for office.',
      'An elite group of lobbyists working in Washington, D.C.',
    ],
    correctAnswer: 'B',
    explanation:
      'Social movements are decentralized, collective efforts (like the Women’s Rights or LGBTQ+ movements) that pressure the government for change from the outside.',
  },
  // Original versions of revised active questions:
  // 6312 — selective incorporation (definitional)
  // 6316 — time, place, manner (definitional)
  // 6317 — prior restraint (definitional)
  // 6318 — Second Amendment (McDonald-only explanation)
  // 6321 — exclusionary rule (problematic distractor D)
  // 6333 — selective incorporation process (definitional)
];
