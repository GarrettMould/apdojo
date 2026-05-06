/**
 * Course curriculum outline only: unit numbers/names and lesson numbers/names.
 * No key terms, PDFs, images, MCQs, FRQs, or other instructional content.
 *
 * Not wired into the app yet — use as the canonical shape when consolidating
 * `cheatSheets` / `lessons` or adding new courses.
 */

export type CourseOutlineId = 'macro' | 'micro' | 'gov';

/** CED-style lesson id (e.g. "3.2") plus display name only. */
export interface CurriculumLessonOutline {
  lessonNumber: string;
  name: string;
}

export interface CurriculumUnitOutline {
  unitNumber: number;
  unitName: string;
  lessons: CurriculumLessonOutline[];
}

export interface CourseCurriculumOutline {
  courseId: CourseOutlineId;
  /** Short label for UI (not full AP exam title). */
  displayName: string;
  units: CurriculumUnitOutline[];
}

export const macroCurriculumOutline: CourseCurriculumOutline = {
  courseId: 'macro',
  displayName: 'AP Macroeconomics',
  units: [
    {
      unitNumber: 1,
      unitName: 'Basic Economic Concepts',
      lessons: [
        { lessonNumber: '1.1', name: 'Scarcity' },
        { lessonNumber: '1.2', name: 'Opportunity Cost and the Production Possibilities Curve (PPC)' },
        { lessonNumber: '1.3', name: 'Comparative Advantage and Gains from Trade' },
        { lessonNumber: '1.4', name: 'Demand' },
        { lessonNumber: '1.5', name: 'Supply' },
        { lessonNumber: '1.6', name: 'Market Equilibrium, Disequilibrium, and Changes in Equilibrium' },
      ],
    },
    {
      unitNumber: 2,
      unitName: 'Economic Indicators and the Business Cycle',
      lessons: [
        { lessonNumber: '2.1', name: 'The Circular Flow and GDP' },
        { lessonNumber: '2.2', name: 'Limitations of GDP' },
        { lessonNumber: '2.3', name: 'Unemployment' },
        { lessonNumber: '2.4', name: 'Price Indices and Inflation' },
        { lessonNumber: '2.5', name: 'Costs of Inflation' },
        { lessonNumber: '2.6', name: 'Real v. Nominal GDP' },
        { lessonNumber: '2.7', name: 'Business Cycles' },
      ],
    },
    {
      unitNumber: 3,
      unitName: 'National Income and Price Determination',
      lessons: [
        { lessonNumber: '3.1', name: 'Aggregate Demand (AD)' },
        { lessonNumber: '3.2', name: 'Multipliers' },
        { lessonNumber: '3.3', name: 'Short-Run Aggregate Supply (SRAS)' },
        { lessonNumber: '3.4', name: 'Long-Run Aggregate Supply (LRAS)' },
        { lessonNumber: '3.5', name: 'Equilibrium in the Aggregate Demand - Aggregate Supply (AD-AS) Model' },
        { lessonNumber: '3.6', name: 'Changes in the AD-AS Model in the Short Run' },
        { lessonNumber: '3.7', name: 'Long-Run Self-Adjustment' },
        { lessonNumber: '3.8', name: 'Fiscal Policy' },
        { lessonNumber: '3.9', name: 'Automatic Stabilizers' },
      ],
    },
    {
      unitNumber: 4,
      unitName: 'Financial Sector',
      lessons: [
        { lessonNumber: '4.1', name: 'Financial Assets' },
        { lessonNumber: '4.2', name: 'Nominal v. Real Interest Rates' },
        { lessonNumber: '4.3', name: 'Definition, Measurement, and Functions of Money' },
        { lessonNumber: '4.4', name: 'Banking and the Expansion of the Money Supply' },
        { lessonNumber: '4.5', name: 'The Money Market' },
        { lessonNumber: '4.6', name: 'Monetary Policy' },
        { lessonNumber: '4.7', name: 'The Loanable Funds Market' },
      ],
    },
    {
      unitNumber: 5,
      unitName: 'Long-Run Consequences of Stabilization Policies',
      lessons: [
        { lessonNumber: '5.1', name: 'Fiscal and Monetary Policy Actions in the Short Run' },
        { lessonNumber: '5.2', name: 'The Phillips Curve' },
        { lessonNumber: '5.3', name: 'Money Growth and Inflation' },
        { lessonNumber: '5.4', name: 'Government Deficits and the National Debt' },
        { lessonNumber: '5.5', name: 'Crowding Out' },
        { lessonNumber: '5.6', name: 'Economic Growth' },
        { lessonNumber: '5.7', name: 'Public Policy and Economic Growth' },
      ],
    },
    {
      unitNumber: 6,
      unitName: 'Open Economy—International Trade and Finance',
      lessons: [
        { lessonNumber: '6.1', name: 'Balance of Payments Accounts' },
        { lessonNumber: '6.2', name: 'Exchange Rates' },
        { lessonNumber: '6.3', name: 'The Foreign Exchange Market' },
        { lessonNumber: '6.4', name: 'Effect of Changes in Policies and Economic Conditions on the Foreign Exchange Market' },
        { lessonNumber: '6.5', name: 'Changes in the Foreign Exchange Market and Net Exports' },
        { lessonNumber: '6.6', name: 'Real Interest Rates and International Capital Flows' },
      ],
    },
  ],
};

export const microCurriculumOutline: CourseCurriculumOutline = {
  courseId: 'micro',
  displayName: 'AP Microeconomics',
  units: [
    {
      unitNumber: 1,
      unitName: 'Basic Economic Concepts',
      lessons: [
        { lessonNumber: '1.1', name: 'Scarcity' },
        { lessonNumber: '1.2', name: 'Resource Allocation and Economic Systems' },
        { lessonNumber: '1.3', name: 'Production Possibilities Curve' },
        { lessonNumber: '1.4', name: 'Comparative Advantage and Trade' },
        { lessonNumber: '1.5', name: 'Cost-Benefit Analysis' },
        { lessonNumber: '1.6', name: 'Marginal Analysis and Consumer Choice' },
      ],
    },
    {
      unitNumber: 2,
      unitName: 'Supply and Demand',
      lessons: [
        { lessonNumber: '2.1', name: 'Demand' },
        { lessonNumber: '2.2', name: 'Supply' },
        { lessonNumber: '2.3', name: 'Price Elasticity of Demand' },
        { lessonNumber: '2.4', name: 'Price Elasticity of Supply' },
        { lessonNumber: '2.5', name: 'Other Elasticities' },
        { lessonNumber: '2.6', name: 'Market Equilibrium and Consumer and Producer Surplus' },
        { lessonNumber: '2.7', name: 'Market Disequilibrium and Changes in Equilibrium' },
        { lessonNumber: '2.8', name: 'The Effects of Government Intervention in Markets' },
        { lessonNumber: '2.9', name: 'International Trade and Public Policy' },
      ],
    },
    {
      unitNumber: 3,
      unitName: 'Production, Cost, and the Perfect Competition Model',
      lessons: [
        { lessonNumber: '3.1', name: 'The Production Function' },
        { lessonNumber: '3.2', name: 'Short-Run Production Costs' },
        { lessonNumber: '3.3', name: 'Long-Run Production Costs' },
        { lessonNumber: '3.4', name: 'Types of Profit' },
        { lessonNumber: '3.5', name: 'Profit Maximization' },
        {
          lessonNumber: '3.6',
          name: "Firms' Short-Run Decisions to Produce and Long-Run Decisions to Enter or Exit a Market",
        },
        { lessonNumber: '3.7', name: 'Perfect Competition' },
      ],
    },
    {
      unitNumber: 4,
      unitName: 'Imperfect Competition',
      lessons: [
        { lessonNumber: '4.1', name: 'Introduction to Imperfectly Competitive Markets' },
        { lessonNumber: '4.2', name: 'Monopoly' },
        { lessonNumber: '4.3', name: 'Price Discrimination' },
        { lessonNumber: '4.4', name: 'Monopolistic Competition' },
        { lessonNumber: '4.5', name: 'Oligopoly and Game Theory' },
      ],
    },
    {
      unitNumber: 5,
      unitName: 'Factor Markets',
      lessons: [
        { lessonNumber: '5.1', name: 'Introduction to Factor Markets' },
        { lessonNumber: '5.2', name: 'Changes in Factor Demand and Factor Supply' },
        {
          lessonNumber: '5.3',
          name: 'Profit-Maximizing Behavior in Perfectly Competitive Factor Markets',
        },
        { lessonNumber: '5.4', name: 'Monopsonistic Markets' },
      ],
    },
    {
      unitNumber: 6,
      unitName: 'Market Failure and the Role of Government',
      lessons: [
        { lessonNumber: '6.1', name: 'Socially Efficient and Inefficient Market Outcomes' },
        { lessonNumber: '6.2', name: 'Externalities' },
        { lessonNumber: '6.3', name: 'Public and Private Goods' },
        {
          lessonNumber: '6.4',
          name: 'The Effects of Government Intervention in Different Market Structures',
        },
        { lessonNumber: '6.5', name: 'Inequality' },
      ],
    },
  ],
};

export const govCurriculumOutline: CourseCurriculumOutline = {
  courseId: 'gov',
  displayName: 'AP U.S. Government and Politics',
  units: [
    {
      unitNumber: 1,
      unitName: 'Foundations of American Democracy',
      lessons: [
        { lessonNumber: '1.1', name: 'Ideals of Democracy' },
        { lessonNumber: '1.2', name: 'Types of Democracy' },
        { lessonNumber: '1.3', name: 'Government Power and Individual Rights' },
        { lessonNumber: '1.4', name: 'Challenges of the Articles of Confederation' },
        { lessonNumber: '1.5', name: 'Ratification of the U.S. Constitution' },
        { lessonNumber: '1.6', name: 'Principles of American Government' },
        { lessonNumber: '1.7', name: 'Relationship Between the States and National Government' },
        { lessonNumber: '1.8', name: 'Constitutional Interpretations of Federalism' },
        { lessonNumber: '1.9', name: 'Federalism in Action' },
      ],
    },
    {
      unitNumber: 2,
      unitName: 'Interactions Among Branches of Government',
      lessons: [
        { lessonNumber: '2.1', name: 'Congress: The Senate and the House of Representatives' },
        { lessonNumber: '2.2', name: 'Structures, Powers, and Functions of Congress' },
        { lessonNumber: '2.3', name: 'Congressional Behavior' },
        { lessonNumber: '2.4', name: 'Roles and Powers of the President' },
        { lessonNumber: '2.5', name: 'Checks on the Presidency' },
        { lessonNumber: '2.6', name: 'Expansion of Presidential Power' },
        { lessonNumber: '2.7', name: 'Presidential Communication' },
        { lessonNumber: '2.8', name: 'The Judicial Branch' },
        { lessonNumber: '2.9', name: 'The Role of the Judicial Branch' },
        { lessonNumber: '2.10', name: 'The Court in Action' },
        { lessonNumber: '2.11', name: 'Checks on the Judicial Branch' },
        { lessonNumber: '2.12', name: 'The Bureaucracy' },
        { lessonNumber: '2.13', name: 'Discretionary and Rulemaking Authority' },
        { lessonNumber: '2.14', name: 'Holding the Bureaucracy Accountable' },
        { lessonNumber: '2.15', name: 'Policy and the Branches of Government' },
      ],
    },
    {
      unitNumber: 3,
      unitName: 'Civil Liberties and Civil Rights',
      lessons: [
        { lessonNumber: '3.1', name: 'The Bill of Rights' },
        { lessonNumber: '3.2', name: 'First Amendment: Freedom of Religion' },
        { lessonNumber: '3.3', name: 'First Amendment: Freedom of Speech' },
        { lessonNumber: '3.4', name: 'First Amendment: Freedom of the Press' },
        { lessonNumber: '3.5', name: 'Second Amendment: Right to Bear Arms' },
        { lessonNumber: '3.6', name: 'Amendments: Balancing Individual Freedom with Public Order and Safety' },
        { lessonNumber: '3.7', name: 'Selective Incorporation' },
        { lessonNumber: '3.8', name: 'Amendments: Due Process and the Rights of the Accused' },
        { lessonNumber: '3.9', name: 'Amendments: Due Process and the Right to Privacy' },
        { lessonNumber: '3.10', name: 'Social Movements and Equal Protection' },
        { lessonNumber: '3.11', name: 'Government Responses to Social Movements' },
        { lessonNumber: '3.12', name: 'Balancing Minority and Majority Rights' },
        { lessonNumber: '3.13', name: 'Affirmative Action' },
      ],
    },
    {
      unitNumber: 4,
      unitName: 'American Political Ideologies and Beliefs',
      lessons: [
        { lessonNumber: '4.1', name: 'American Attitudes About Government and Politics' },
        { lessonNumber: '4.2', name: 'Political Socialization' },
        { lessonNumber: '4.3', name: 'Changes in Ideology' },
        { lessonNumber: '4.4', name: 'Influence of Political Events on Ideology' },
        { lessonNumber: '4.5', name: 'Measuring Public Opinion' },
        { lessonNumber: '4.6', name: 'Evaluating Public Opinion Data' },
        { lessonNumber: '4.7', name: 'Ideologies of Political Parties' },
        { lessonNumber: '4.8', name: 'Ideology and Policymaking' },
        { lessonNumber: '4.9', name: 'Ideology and Economic Policy' },
        { lessonNumber: '4.10', name: 'Ideology and Social Policy' },
      ],
    },
    {
      unitNumber: 5,
      unitName: 'Political Participation',
      lessons: [
        { lessonNumber: '5.1', name: 'Voting Rights and Models of Voting Behavior' },
        { lessonNumber: '5.2', name: 'Voter Turnout' },
        { lessonNumber: '5.3', name: 'Political Parties' },
        { lessonNumber: '5.4', name: 'How and Why Political Parties Change and Adapt' },
        { lessonNumber: '5.5', name: 'Third-Party Politics' },
        { lessonNumber: '5.6', name: 'Interest Groups Influencing Policymaking' },
        { lessonNumber: '5.7', name: 'Groups Influencing Policy Outcomes' },
        { lessonNumber: '5.8', name: 'Electing a President' },
        { lessonNumber: '5.9', name: 'Congressional Elections' },
        { lessonNumber: '5.10', name: 'Modern Campaigns' },
        { lessonNumber: '5.11', name: 'Campaign Finance' },
        { lessonNumber: '5.12', name: 'The Media' },
        { lessonNumber: '5.13', name: 'Changing Media' },
      ],
    },
  ],
};

/** Lookup by course id. */
export const COURSE_CURRICULUM_OUTLINES: Record<CourseOutlineId, CourseCurriculumOutline> = {
  macro: macroCurriculumOutline,
  micro: microCurriculumOutline,
  gov: govCurriculumOutline,
};
