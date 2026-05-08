import { KeyTerm } from './allContent';

export const keyTerms: KeyTerm[] = [
  {
    id: 'natural-rights',
    term: 'Natural Rights',
    definition:
      'Fundamental rights such as life, liberty, and property that all people possess.',
    subject: 'ap_us_government',
    unit: 1,
    lessonIDs: ['1.1'],
    subNotes: [
      'Application: These are “negative” rights because they restrict others or the government from interfering with you.',
    ],
  },
  {
    id: 'popular-sovereignty',
    term: 'Popular Sovereignty',
    definition: "The principle that the government's power comes from the consent of its people.",
    subject: 'ap_us_government',
    unit: 1,
    lessonIDs: ['1.1'],
    subNotes: ['Application: This is often expressed through free and fair elections.'],
  },
  {
    id: 'social-contract',
    term: 'Social Contract',
    definition:
      'An agreement where people give up some freedoms to maintain social order.',
    subject: 'ap_us_government',
    unit: 1,
    lessonIDs: ['1.1'],
    subNotes: [
      'Application: In the U.S., the Constitution serves as the formal social contract between the citizens and the state.',
    ],
  },
  {
    id: 'republicanism',
    term: 'Republicanism',
    definition:
      'A system where the people elect representatives to govern and make laws.',
    subject: 'ap_us_government',
    unit: 1,
    lessonIDs: ['1.2'],
    subNotes: [
      'Application: This is the basis of representative democracy as opposed to direct democracy.',
    ],
  },
  {
    id: 'limited-government',
    term: 'Limited Government',
    definition:
      "A political system where the government's power is restricted by a constitution.",
    subject: 'ap_us_government',
    unit: 1,
    lessonIDs: ['1.3'],
    subNotes: [
      'Application: The Bill of Rights is a primary example of a tool used to limit government reach.',
    ],
  },
  {
    id: 'participatory-democracy',
    term: 'Participatory Democracy',
    definition: 'A model emphasizing broad participation in politics and civil society.',
    subject: 'ap_us_government',
    unit: 1,
    lessonIDs: ['1.2'],
    subNotes: [
      'Application: Initiatives and referendums at the state level are modern examples.',
    ],
  },
  {
    id: 'pluralist-democracy',
    term: 'Pluralist Democracy',
    definition:
      'A model where group-based activism by nongovernmental interests strives for impact on decision making.',
    subject: 'ap_us_government',
    unit: 1,
    lessonIDs: ['1.2'],
    subNotes: [
      'Application: Interest groups like the Sierra Club or the NRA competing for influence in Washington.',
    ],
  },
  {
    id: 'elite-democracy',
    term: 'Elite Democracy',
    definition:
      'A model where a small group of informed and well-placed individuals influence the government.',
    subject: 'ap_us_government',
    unit: 1,
    lessonIDs: ['1.2'],
    subNotes: [
      'Application: The Electoral College is often cited as an elite-model buffer between the people and the presidency.',
    ],
  },
  {
    id: 'factions',
    term: 'Factions',
    definition:
      'Groups motivated by a common interest or passion that may be adverse to the rights of others.',
    subject: 'ap_us_government',
    unit: 1,
    lessonIDs: ['1.5'],
    subNotes: [
      'Application: James Madison argued in Federalist No. 10 that these are inevitable but can be managed by a large republic.',
    ],
  },
  {
    id: 'federalism',
    term: 'Federalism',
    definition:
      'The division of power between the national government and state governments.',
    subject: 'ap_us_government',
    unit: 1,
    lessonIDs: ['1.7', '1.8'],
    subNotes: [
      'Application: This creates multiple “access points” for citizens to influence policy at different levels.',
    ],
  },
  {
    id: 'exclusive-powers',
    term: 'Exclusive Powers',
    definition: 'Powers held only by one level of government.',
    subject: 'ap_us_government',
    unit: 1,
    lessonIDs: ['1.7'],
    subNotes: [
      'Application: The federal power to declare war or the state power to issue marriage licenses.',
    ],
  },
  {
    id: 'reserved-powers',
    term: 'Reserved Powers',
    definition:
      'Powers not delegated to the national government that are kept by the states.',
    subject: 'ap_us_government',
    unit: 1,
    lessonIDs: ['1.7'],
    subNotes: [
      'Application: Under the 10th Amendment, this includes things like public education and police powers.',
    ],
  },
  {
    id: 'concurrent-powers',
    term: 'Concurrent Powers',
    definition: 'Powers shared by both the federal and state governments.',
    subject: 'ap_us_government',
    unit: 1,
    lessonIDs: ['1.7'],
    subNotes: ['Application: The power to tax and the power to build roads.'],
  },
  {
    id: 'categorical-grants',
    term: 'Categorical Grants',
    definition:
      'Federal funding restricted to specific categories of expenditures.',
    subject: 'ap_us_government',
    unit: 1,
    lessonIDs: ['1.9'],
    subNotes: [
      'Application: Federal money given specifically for a Head Start program or a specific highway project.',
    ],
  },
  {
    id: 'block-grants',
    term: 'Block Grants',
    definition:
      'Federal funding with minimal restrictions provided to states for broad policy areas.',
    subject: 'ap_us_government',
    unit: 1,
    lessonIDs: ['1.9'],
    subNotes: [
      'Application: Money given for community development where the state decides which local projects to fund.',
    ],
  },
];

export interface GovSupremeCourtCase {
  id: string;
  caseName: string;
  year: number;
  unit: number;
  lessonIDs: string[];
  videoUrl?: string;
  summary: string;
  facts: string;
  constitutionalQuestion: string;
  holding: string;
  reasoning: string[];
}

export const govUnitSupremeCourtCases: Record<number, GovSupremeCourtCase[]> = {
  1: [
    {
      id: 'mcculloch-v-maryland-1819',
      caseName: 'McCulloch v. Maryland',
      year: 1819,
      unit: 1,
      lessonIDs: ['1.8'],
      videoUrl: '',
      summary:
        'Congress has implied powers under the Necessary and Proper Clause, and states cannot tax valid federal institutions.',
      facts: 'Congress created a national bank, and Maryland attempted to tax that bank.',
      constitutionalQuestion:
        "Can Congress create a bank even though it is not explicitly listed in Article I, and can a state tax a federal institution?",
      holding: 'The Court ruled in favor of the federal government.',
      reasoning: [
        'Necessary and Proper Clause supports implied federal powers when tied to enumerated powers.',
        'Supremacy Clause prevents states from undermining legitimate federal action.',
      ],
    },
    {
      id: 'united-states-v-lopez-1995',
      caseName: 'United States v. Lopez',
      year: 1995,
      unit: 1,
      lessonIDs: ['1.9'],
      videoUrl: '',
      summary:
        'Congress exceeded its Commerce Clause authority by criminalizing gun possession in school zones.',
      facts:
        'A student brought a gun to school and was charged under the federal Gun-Free School Zones Act.',
      constitutionalQuestion:
        'Does the Commerce Clause allow Congress to regulate gun possession in local school zones?',
      holding: 'The Court ruled in favor of Lopez and struck down the federal law.',
      reasoning: [
        'Carrying a gun in a school zone is non-economic activity.',
        'The statute lacked a sufficient connection to interstate commerce.',
        'The decision reaffirmed limits on federal power and preserved state sovereignty.',
      ],
    },
  ],
};

