import type { Question } from '@/data/questionBanks/types';

/**
 * Text-only AP Statistics MCQs for the full MCQ exam (scenario reading, inference, study design),
 * written so the exam's mix matches the real Section I. No images.
 */

const U1 = 'Exploring One-Variable Data and Collecting Data';
const U2 = 'Probability, Random Variables, and Probability Distributions';
const U3 = 'Inference for Categorical Data: Proportions';
const U4 = 'Inference for Quantitative Data: Means';
const U5 = 'Regression Analysis';

export const statsFullMcqExamTextQuestions: Question[] = [
  {
    id: 9801,
    subject: 'ap_statistics',
    unit: 1,
    lessonIDS: ['1.13'],
    unitName: U1,
    question:
      'A greenhouse manager wants to compare two fertilizers, X and Y, on the final height of tomato plants. She has 40 seedlings of the same variety to place on two long benches. One bench is next to a south-facing window and receives much more sunlight than the other. She puts 20 seedlings on each bench and then, within each bench, uses a random number generator to assign 10 seedlings to Fertilizer X and the other 10 to Fertilizer Y. Heights are measured after eight weeks. Compared with randomly assigning all 40 seedlings to the two fertilizers without regard to bench, what is the main advantage of the manager\'s design?',
    image: null,
    options: [
      'It guarantees that no other variable in the greenhouse can be confounded with the type of fertilizer used.',
      'It makes random assignment of fertilizers within each bench unnecessary.',
      'It keeps sunlight differences between the benches from adding variability to the fertilizer comparison.',
      'It ensures that each fertilizer is given to the same number of seedlings, which assigning all 40 seedlings at random could not do.',
      'It allows the manager to conclude that the results apply to tomato plants grown in any greenhouse.',
    ],
    correctAnswer: 'C',
    explanation:
      'Blocking by bench means the two fertilizers are compared among seedlings that get similar sunlight, so sunlight differences are removed from the comparison and a real fertilizer effect is easier to detect. A completely randomized design can also give each fertilizer exactly 20 seedlings, so equal group sizes are not the advantage. Blocking does not guarantee that every confounding variable is eliminated, and it does not extend the conclusion beyond this greenhouse.',
    videoExplanation: null,
  },
  {
    id: 9802,
    subject: 'ap_statistics',
    unit: 1,
    lessonIDS: ['1.12'],
    unitName: U1,
    question:
      'A high school principal wants to estimate the proportion of students who believe the school\'s new phone policy is fair. She selects a simple random sample of 120 students and asks each selected student to come to her office, where she personally hands out a paper survey and waits while it is completed. The first question reads, "Most students agree that limiting phones helps everyone focus. Do you think the phone policy is fair?" All 120 students return the survey, and 78% answer "yes." Which of the following is the most likely source of bias in this survey?',
    image: null,
    options: [
      'Response bias, because the wording and the principal\'s presence may lead students to answer untruthfully',
      'Nonresponse bias, because students who disagree with the policy may have refused to complete it',
      'Voluntary response bias, because students chose whether to take part in the survey',
      'Convenience sampling bias, because the principal surveyed only students she could reach easily',
      'Sampling variability, because a sample of 120 students is too small to estimate the proportion',
    ],
    correctAnswer: 'A',
    explanation:
      'The question tells students what the "right" answer is, and answering in front of the principal adds pressure, so responses are likely to be distorted. That is response bias. Every selected student returned the survey and the students were chosen randomly, so nonresponse, voluntary response and convenience sampling do not apply, and a small sample produces variability rather than bias.',
    videoExplanation: null,
  },
  {
    id: 9803,
    subject: 'ap_statistics',
    unit: 1,
    lessonIDS: ['1.12'],
    unitName: U1,
    question:
      'A county health department wants to estimate the proportion of adult county residents who received a flu shot this season. Staff select a simple random sample of 500 addresses from the list of homes that receive county water bills. A questionnaire is mailed to each selected address, to be completed by any one adult living there. Some people claim that the results may not be representative of all adult county residents. Which of the following is NOT a legitimate concern about this procedure?',
    image: null,
    options: [
      'Adults who live in rental units where the landlord pays the water bill may be underrepresented in the sample.',
      'Adults who live in households with many other adults may be underrepresented in the sample.',
      'Residents with strong opinions about flu shots may be more likely to return the questionnaire.',
      'Adults who do not have a permanent home address may be excluded from the sample.',
      'Children under 18 who live in the county are not included in the sample.',
    ],
    correctAnswer: 'E',
    explanation:
      'The population of interest is adult residents, so leaving out children is not a flaw. The other statements describe real problems: landlord-paid water bills and lack of a permanent address cause undercoverage, one response per address gives adults in large households a smaller chance of being heard, and people with strong feelings may be more likely to respond.',
    videoExplanation: null,
  },
  {
    id: 9804,
    subject: 'ap_statistics',
    unit: 1,
    lessonIDS: ['1.13'],
    unitName: U1,
    question:
      'A physical therapist posts a flyer asking runners from the campus running club to volunteer for a study of two recovery routines. Sixty club members volunteer. The therapist uses a random number generator to assign 30 of the volunteers to Routine 1 and the other 30 to Routine 2. After two weeks, runners using Routine 2 report significantly lower muscle soreness than runners using Routine 1 (p-value = 0.01). Which of the following is the most appropriate conclusion?',
    image: null,
    options: [
      'Routine 2 reduces soreness for all runners, because the volunteers were randomly assigned to the routines.',
      'No conclusion about cause and effect is possible, because the runners were volunteers and were not randomly selected from the club.',
      'Routine 2 caused lower soreness among these volunteers, but the results cannot be extended to all runners.',
      'The difference is probably due to chance, because a sample of 60 runners is too small to detect a difference.',
      'Routine 2 caused lower soreness for all members of the running club, but not necessarily for runners outside the club.',
    ],
    correctAnswer: 'C',
    explanation:
      'Random assignment lets the therapist conclude that the routine caused the difference, but only for the kind of runners who volunteered, because they were not randomly selected from a larger population. Random selection, not random assignment, is what allows results to be generalized. Nothing in the problem suggests the result is due to chance, since the p-value is small.',
    videoExplanation: null,
  },
  {
    id: 9805,
    subject: 'ap_statistics',
    unit: 2,
    lessonIDS: ['2.10'],
    unitName: U2,
    question:
      'A quality inspector knows that 8% of the circuit boards produced by a machine are defective, and that whether one board is defective is independent of whether any other board is defective. The inspector randomly selects 10 boards from a very large shipment. Which of the following expressions gives the probability that at least 2 of the 10 boards are defective?',
    image: null,
    options: [
      'C(10, 2)(0.08)²(0.92)⁸',
      '1 − (0.92)¹⁰',
      '1 − [(0.92)¹⁰ + (0.08)(0.92)⁹]',
      '1 − (0.92)¹⁰ − 10(0.08)(0.92)⁹',
      '(0.92)¹⁰ + 10(0.08)(0.92)⁹ + C(10, 2)(0.08)²(0.92)⁸',
    ],
    correctAnswer: 'D',
    explanation:
      '"At least 2" is the complement of "0 or 1 defective," so subtract P(X = 0) = (0.92)¹⁰ and P(X = 1) = 10(0.08)(0.92)⁹ from 1. Leaving out the coefficient 10 undercounts the ways to get exactly one defective board, and the other expressions give exactly 2, at least 1, or at most 2.',
    videoExplanation: null,
  },
  {
    id: 9806,
    subject: 'ap_statistics',
    unit: 2,
    lessonIDS: ['2.12'],
    unitName: U2,
    question:
      'The time it takes a delivery driver to complete a certain route is strongly skewed to the right, with a mean of 52 minutes and a standard deviation of 18 minutes. A dispatcher selects a random sample of 100 completed routes (far fewer than 10% of all completions of this route) and computes the sample mean time, x̄. Which of the following best describes the sampling distribution of x̄?',
    image: null,
    options: [
      'Skewed to the right with mean 52 minutes and standard deviation 18 minutes',
      'Approximately normal with mean 52 minutes and standard deviation 0.18 minutes',
      'Approximately normal with mean 52 minutes and standard deviation 1.8 minutes',
      'Approximately normal with a mean less than 52 minutes, because averaging pulls in the long right tail',
      'Its shape cannot be described, because the central limit theorem applies only when the population is normal',
    ],
    correctAnswer: 'C',
    explanation:
      'The mean of x̄ equals the population mean, 52, and its standard deviation is 18/√100 = 1.8. Because the sample size is large, the central limit theorem makes the sampling distribution approximately normal even though the population is skewed; the theorem matters precisely because populations are often not normal. Averaging reduces spread but does not move the center, and dividing by n instead of √n gives 0.18.',
    videoExplanation: null,
  },
  {
    id: 9807,
    subject: 'ap_statistics',
    unit: 2,
    lessonIDS: ['2.7'],
    unitName: U2,
    question:
      'At a bakery, a customer buys bread with probability 0.50 and a pastry with probability 0.40. For a randomly selected customer, let A be the event that the customer buys bread and let B be the event that the customer buys a pastry. Suppose the probability that a customer buys both bread and a pastry is 0.20. Consider the following statements.\n\nI. Events A and B are independent.\nII. Events A and B are mutually exclusive.\nIII. Given that a customer bought a pastry, the probability that the customer also bought bread is 0.50.\n\nWhich of the statements must be true?',
    image: null,
    options: ['I and III only', 'I only', 'II only', 'II and III only', 'I, II, and III'],
    correctAnswer: 'A',
    explanation:
      'P(A and B) = 0.20 equals P(A)P(B) = 0.50(0.40), so the events are independent, and P(A | B) = 0.20/0.40 = 0.50, which equals P(A). Mutually exclusive events cannot occur together, so P(A and B) would be 0, which is not the case here. Independence and mutual exclusivity are different ideas.',
    videoExplanation: null,
  },
  {
    id: 9808,
    subject: 'ap_statistics',
    unit: 2,
    lessonIDS: ['2.4'],
    unitName: U2,
    question:
      'A basketball player makes 80% of her free throws in the long run, and her shots can be treated as independent. During tonight\'s game she misses her first four free throws. Which of the following statements is correct?',
    image: null,
    options: [
      'She is due to make her next several free throws, so her next shot is more likely than 80% to go in.',
      'Her chance of making the next free throw is now lower than 80% because she is not shooting well tonight.',
      'Over many future free throws, her four misses will be cancelled out by extra makes, so her overall rate will return to exactly 80%.',
      'Her chance on the next shot is still 0.80, and her success rate settles near 0.80 only over many attempts.',
      'The four misses show that her true probability of making a free throw is less than 0.80.',
    ],
    correctAnswer: 'D',
    explanation:
      'Because the shots are independent, earlier misses do not change the probability of the next shot, and a probability describes what happens in the long run, not in a short streak. Over many shots the four misses are not cancelled out by extra makes; they are simply swamped by the large number of later attempts, so the rate gets close to 0.80 without needing to return to it exactly. Believing she is "due" is the gambler\'s fallacy, and concluding her true probability dropped after four misses treats a short run as if it must match the long-run value.',
    videoExplanation: null,
  },
  {
    id: 9809,
    subject: 'ap_statistics',
    unit: 3,
    lessonIDS: ['3.3'],
    unitName: U3,
    question:
      'A polling organization selects a simple random sample of 600 adults in a state and asks whether they support a ballot measure to expand public transit. In the sample, 54% say they support the measure. The conditions for inference are met, and the organization reports a 95 percent confidence interval for the proportion of all adults in the state who support the measure of (0.50, 0.58). Which of the following is a correct interpretation of the interval?',
    image: null,
    options: [
      'There is a 0.95 probability that the true proportion of supporters lies between 0.50 and 0.58.',
      'We are 95% confident that the proportion of all adults in the state who support the measure is between 0.50 and 0.58.',
      'Between 50% and 58% of the 600 adults in the sample support the measure.',
      'In 95% of all random samples of 600 adults from this state, the sample proportion will be between 0.50 and 0.58.',
      'If another random sample of 600 adults is selected, there is a 95% chance that its sample proportion will fall between 0.50 and 0.58.',
    ],
    correctAnswer: 'B',
    explanation:
      'The interval estimates a population parameter, so the correct statement is about the proportion of all adults in the state, and the 95% describes the success rate of the method. Once the interval is computed, the true proportion either is or is not inside it, so it is not a probability about that interval. The sample proportion is exactly 0.54, and the interval says nothing about where other sample proportions will fall.',
    videoExplanation: null,
  },
  {
    id: 9810,
    subject: 'ap_statistics',
    unit: 3,
    lessonIDS: ['3.6'],
    unitName: U3,
    question:
      'A baker claims that at least 90% of the loaves she bakes are fully baked in the center. A health inspector randomly selects 150 loaves from a large day\'s production and finds that 128 of them are fully baked. The inspector tests H₀: p = 0.90 versus Hₐ: p < 0.90, where p is the proportion of all loaves that are fully baked, and obtains a p-value of 0.028. Which of the following is a correct interpretation of this p-value?',
    image: null,
    options: [
      'The probability that the baker\'s claim is true is 0.028.',
      'If the true proportion of fully baked loaves is less than 0.90, there is a 0.028 probability of getting a sample result this low.',
      'Of the 150 loaves in the sample, 2.8% were not fully baked.',
      'There is a 2.8% chance that the inspector has made a Type I error.',
      'If 90% of all loaves are fully baked, the probability of getting a sample proportion as small as 128/150 or smaller by chance is 0.028.',
    ],
    correctAnswer: 'E',
    explanation:
      'A p-value is calculated assuming the null hypothesis is true: it is the probability of a result at least as extreme as the one observed if p really is 0.90. It is not the probability that the null hypothesis is true, and it is not computed assuming the alternative. The Type I error probability is the significance level chosen in advance, not the p-value.',
    videoExplanation: null,
  },
  {
    id: 9811,
    subject: 'ap_statistics',
    unit: 3,
    lessonIDS: ['3.8'],
    unitName: U3,
    question:
      'A district health office tests H₀: p = 0.40 versus Hₐ: p > 0.40, where p is the proportion of residents who have received a booster shot. The office will reject H₀ if the p-value is less than the significance level α = 0.05. Suppose that, unknown to the office, H₀ is actually true and p really is 0.40. What is the probability that the office will reject H₀?',
    image: null,
    options: ['0.025', '0.05', '0.40', '0.95', 'It cannot be determined from the information given.'],
    correctAnswer: 'B',
    explanation:
      'Rejecting a true null hypothesis is a Type I error, and its probability equals the significance level, 0.05, no matter what the sample size is. The value 0.025 would split α across two tails, 0.40 is just the hypothesized proportion, and 0.95 is 1 − α, the probability of correctly failing to reject. The probability can be determined because H₀ being true fixes the sampling distribution.',
    videoExplanation: null,
  },
  {
    id: 9812,
    subject: 'ap_statistics',
    unit: 3,
    lessonIDS: ['3.3'],
    unitName: U3,
    question:
      'A city planner wants to estimate the proportion of commuters who would use a new shuttle service. She wants a 90% confidence interval with a margin of error of at most 0.04. A small earlier study found that 35% of commuters said they would use the shuttle. Which of the following inequalities can be solved for the sample size n needed for the new study?',
    image: null,
    options: [
      '1.645√(0.35(0.65)/n) ≤ 0.04',
      '1.960√(0.35(0.65)/n) ≤ 0.04',
      '1.645(0.35(0.65)/n) ≤ 0.04',
      '1.645√(0.35(0.65)/n) ≤ 0.08',
      '1.645√(0.35/n) ≤ 0.04',
    ],
    correctAnswer: 'A',
    explanation:
      'The margin of error for a proportion is z*√(p̂(1 − p̂)/n), with z* = 1.645 for 90% confidence, p̂ = 0.35 from the earlier study, and the result set at most 0.04. Using 1.960 is the value for 95% confidence, leaving off the square root or the factor (1 − p̂) changes the formula, and 0.08 is the width of the interval, not the margin of error.',
    videoExplanation: null,
  },
  {
    id: 9813,
    subject: 'ap_statistics',
    unit: 3,
    lessonIDS: ['3.5'],
    unitName: U3,
    question:
      'A transit agency states that 85% of its buses arrive on time. A rider advocacy group believes the true proportion is lower than the agency claims and plans to test the claim using a random sample of bus arrivals. Let p be the proportion of all of the agency\'s buses that arrive on time. Which of the following pairs of hypotheses is appropriate for the group\'s test?',
    image: null,
    options: [
      'H₀: p̂ = 0.85, Hₐ: p̂ < 0.85',
      'H₀: p = 0.85, Hₐ: p ≠ 0.85',
      'H₀: p = 0.85, Hₐ: p > 0.85',
      'H₀: p = 0.85, Hₐ: p < 0.85',
      'H₀: p < 0.85, Hₐ: p = 0.85',
    ],
    correctAnswer: 'D',
    explanation:
      'The null hypothesis states the agency\'s claim as an equality about the population parameter p, and the alternative reflects the group\'s suspicion that the proportion is lower, which is a one-sided, less-than alternative. Hypotheses are about parameters, not the sample statistic p̂, and the equality always belongs in the null, not the alternative.',
    videoExplanation: null,
  },
  {
    id: 9814,
    subject: 'ap_statistics',
    unit: 4,
    lessonIDS: ['4.9'],
    unitName: U4,
    question:
      'A warehouse manager wants to know whether the mean number of items packed per hour differs between the morning shift and the evening shift. She randomly selects 18 workers from the morning shift and 20 different workers from the evening shift, and records the number of items each selected worker packs during one hour. Dotplots of the two samples are roughly symmetric with no outliers. Which of the following is the most appropriate procedure for investigating the manager\'s question?',
    image: null,
    options: [
      'A matched-pairs t-test for a mean difference',
      'A two-sample t-test for a difference between two population means',
      'A one-sample t-test for a population mean',
      'A two-sample z-test for a difference between two population proportions',
      'A chi-square test of independence',
    ],
    correctAnswer: 'B',
    explanation:
      'The data are quantitative and come from two independent groups of different workers, so a two-sample t-test for a difference in means fits. A matched-pairs test requires each observation in one group to be naturally linked to one in the other, and the proportion and chi-square procedures are for categorical data.',
    videoExplanation: null,
  },
  {
    id: 9815,
    subject: 'ap_statistics',
    unit: 4,
    lessonIDS: ['4.8'],
    unitName: U4,
    question:
      'A researcher selects independent random samples of students who sleep at least 8 hours on school nights and students who sleep less than 6 hours on school nights, and measures each student\'s reaction time in milliseconds. The conditions for inference are met, and a 95 percent confidence interval for μ₈ − μ₆, the difference in mean reaction times (at least 8 hours minus less than 6 hours), is (−38, 12). Which of the following is the best conclusion?',
    image: null,
    options: [
      'The data provide convincing evidence that the two population mean reaction times are equal.',
      'The data provide convincing evidence that students who sleep less have a lower mean reaction time.',
      'There is a 95% probability that the difference in the two sample means is between −38 and 12.',
      'The interval should not contain negative values, so there must be an error in the calculation of the interval.',
      'Because 0 is in the interval, the data do not provide convincing evidence of a difference in the population means.',
    ],
    correctAnswer: 'E',
    explanation:
      'Zero is a plausible value for the difference in population means, so the study does not give convincing evidence of a difference. That is not the same as showing the means are equal, and negative values are perfectly possible because the interval estimates μ₈ − μ₆. The sample means are known exactly, so the interval is not a probability statement about them.',
    videoExplanation: null,
  },
  {
    id: 9816,
    subject: 'ap_statistics',
    unit: 4,
    lessonIDS: ['4.2'],
    unitName: U4,
    question:
      'A biologist measures the lifespan, in days, of 12 beetles randomly selected from a very large laboratory population. A dotplot of the 12 lifespans is strongly skewed to the right with one extreme high value. The biologist plans to construct a 95 percent confidence interval for the population mean lifespan using a one-sample t-interval. Which of the following best explains why the t-interval may not be appropriate for these data?',
    image: null,
    options: [
      'Because the sample size is less than 30, a z-interval must be used instead of a t-interval for the mean.',
      'Because the sample is skewed, the sample mean is a biased estimator of the population mean lifespan.',
      'With only 12 observations, the central limit theorem cannot ensure a normal sampling distribution, and the skewness suggests a non-normal population.',
      'Because of the extreme value, the 10% condition for sampling without replacement is violated here.',
      'Because skewed data have no standard deviation, the standard error of the mean cannot be computed.',
    ],
    correctAnswer: 'C',
    explanation:
      'The t-interval\'s stated confidence level depends on the sampling distribution of x̄ being approximately normal. With only 12 observations and clear skewness and an outlier, there is no guarantee of that, so the actual confidence level may be off. The sample mean is unbiased regardless of shape, the 10% condition involves population size, and a standard deviation can always be computed.',
    videoExplanation: null,
  },
  {
    id: 9817,
    subject: 'ap_statistics',
    unit: 3,
    lessonIDS: ['3.12'],
    unitName: U3,
    question:
      'A company randomly assigns 400 customers to receive a paper coupon and, separately, 360 other customers to receive an emailed coupon. In the paper group, 120 customers redeem the coupon, and in the email group, 90 customers redeem it. The company wants to test H₀: p₁ = p₂ versus Hₐ: p₁ ≠ p₂, where p₁ and p₂ are the proportions of all customers who would redeem the paper and emailed coupons. The standard error in the test statistic is computed using a combined (pooled) sample proportion from both groups. Which of the following best explains why the combined proportion is used?',
    image: null,
    options: [
      'The two groups must have equal sample sizes for the test to be valid, and combining them makes the sizes equal.',
      'The null hypothesis assumes one common proportion, so combining the samples gives the best estimate of it.',
      'Combining the groups guarantees that the test statistic will follow a t-distribution with n₁ + n₂ − 2 degrees of freedom.',
      'The individual sample proportions cannot be calculated separately when the groups are assigned at random.',
      'Using the combined proportion makes the test statistic larger, which makes it easier to reject H₀.',
    ],
    correctAnswer: 'B',
    explanation:
      'When H₀: p₁ = p₂ is assumed true, there is only one common proportion, and pooling both samples gives the most information for estimating it. The test does not require equal sample sizes, it uses a z (normal) model, not a t-distribution, and each sample proportion can certainly be computed separately; pooling does not change the result in a way that favors rejection.',
    videoExplanation: null,
  },
  {
    id: 9818,
    subject: 'ap_statistics',
    unit: 3,
    lessonIDS: ['3.7'],
    unitName: U3,
    question:
      'A school\'s website states that 30% of its students ride the bus to school. A member of the student council believes the true proportion is greater than 30%. She selects a simple random sample of 200 students (far fewer than 10% of the student body) and finds that 72 of them ride the bus. She tests H₀: p = 0.30 versus Hₐ: p > 0.30 at the significance level α = 0.05, where p is the proportion of all students at the school who ride the bus. The conditions for inference are met. Which of the following gives the test statistic, the p-value, and the correct conclusion?',
    image: null,
    options: [
      'z ≈ 0.13, p-value ≈ 0.45; fail to reject H₀, since there is not convincing evidence that more than 30% of students ride the bus',
      'z ≈ 1.77, p-value ≈ 0.039; reject H₀, since there is convincing evidence that more than 30% of students ride the bus',
      'z ≈ 1.85, p-value ≈ 0.064; fail to reject H₀, since there is not convincing evidence that more than 30% of students ride the bus',
      'z ≈ 1.85, p-value ≈ 0.968; fail to reject H₀, since there is not convincing evidence that more than 30% of students ride the bus',
      'z ≈ 1.85, p-value ≈ 0.032; reject H₀, since there is convincing evidence that more than 30% of students ride the bus',
    ],
    correctAnswer: 'E',
    explanation:
      'The sample proportion is 72/200 = 0.36, and the standard error under H₀ uses p₀ = 0.30: √(0.30(0.70)/200) ≈ 0.0324, so z ≈ 0.06/0.0324 ≈ 1.85. The alternative is p > 0.30, so the p-value is the upper-tail area, about 0.032, which is less than 0.05. Using p̂ in the standard error, leaving n out of the standard error, using both tails, or using the lower tail each gives a wrong value.',
    videoExplanation: null,
  },
  {
    id: 9819,
    subject: 'ap_statistics',
    unit: 4,
    lessonIDS: ['4.5'],
    unitName: U4,
    question:
      'A bakery states that the mean weight of its loaves is 500 grams. A consumer agency suspects the loaves weigh less than that. The agency weighs a random sample of 16 loaves selected from a large day\'s production and finds a sample mean of 489 grams and a sample standard deviation of 20 grams. A dotplot of the 16 weights shows no strong skewness or outliers. The agency tests H₀: μ = 500 versus Hₐ: μ < 500, where μ is the mean weight of all of the bakery\'s loaves. Which of the following is closest to the p-value of the test?',
    image: null,
    options: ['0.014', '0.022', '0.044', '0.956', '0.978'],
    correctAnswer: 'B',
    explanation:
      'The test statistic is t = (489 − 500)/(20/√16) = −2.20 with 15 degrees of freedom, and because the alternative is one-sided (less than), the p-value is the lower-tail area, about 0.022. Using the standard normal distribution instead of t gives 0.014, a two-sided test gives 0.044, and the large values come from using the wrong tail or the complement of the two-sided p-value.',
    videoExplanation: null,
  },
  {
    id: 9820,
    subject: 'ap_statistics',
    unit: 1,
    lessonIDS: ['1.11'],
    unitName: U1,
    question:
      'A school district has 12 high schools and wants to estimate the mean number of hours per week that its students spend at a job. Two sampling plans are proposed. In Plan 1, the district randomly selects 3 of the 12 high schools and surveys every student at the 3 selected schools. In Plan 2, the district lists the students at each of the 12 high schools and randomly selects 25 students from each school\'s list. Which of the following correctly identifies the sampling method used in each plan?',
    image: null,
    options: [
      'Plan 1 is a stratified random sample, and Plan 2 is a cluster sample.',
      'Plan 1 is a simple random sample, and Plan 2 is a stratified random sample.',
      'Plan 1 is a cluster sample, and Plan 2 is a simple random sample.',
      'Plan 1 is a cluster sample, and Plan 2 is a stratified random sample.',
      'Plan 1 is a stratified random sample, and Plan 2 is a simple random sample.',
    ],
    correctAnswer: 'D',
    explanation:
      'In Plan 1 the schools are groups that are chosen at random and every student in a chosen group is surveyed, which is a cluster sample. In Plan 2 the students are first divided into groups (schools) and a random sample is taken from every group, which is a stratified random sample. A simple random sample would select students from the whole district list with no grouping, so neither plan is one.',
    videoExplanation: null,
  },
  {
    id: 9821,
    subject: 'ap_statistics',
    unit: 5,
    lessonIDS: ['5.2'],
    unitName: U5,
    question:
      'In a study of 25 high school students, the correlation between the number of hours per week a student spends playing video games and the student\'s grade point average (GPA) is r = −0.70. Which of the following is the best interpretation of this result?',
    image: null,
    options: [
      'Seventy percent of the variation in GPA is explained by the linear relationship with hours of gaming.',
      'Playing video games causes a student\'s GPA to decrease by 70%.',
      'There is a moderately strong negative linear association, but this alone does not show that gaming lowers GPA.',
      'The association would be weaker if GPA were measured on a 100-point scale instead of a 4-point scale.',
      'The slope of the least-squares line for predicting GPA from hours of gaming is −0.70.',
    ],
    correctAnswer: 'C',
    explanation:
      'A correlation of −0.70 describes the direction (negative), form (linear) and strength (moderately strong) of an association, and by itself it does not establish causation. The percent of variation explained is r², about 49%, not 70%, r does not change when the units of a variable are rescaled, and the slope depends on the standard deviations of both variables as well as r.',
    videoExplanation: null,
  },
  {
    id: 9822,
    subject: 'ap_statistics',
    unit: 2,
    lessonIDS: ['2.1'],
    unitName: U2,
    question:
      'A school counselor surveys 60 sophomores and 140 seniors and asks each student to choose a main plan for after graduation: attend college, work full time, join the military, or undecided. The counselor wants to compare the distribution of plans for the two classes. Which of the following displays would be the most appropriate for this purpose?',
    image: null,
    options: [
      'A single pie chart showing the plans of all 200 students combined',
      'Two histograms, one for each class, showing the number of students in each plan',
      'A segmented bar chart showing the percent of each class that chose each plan',
      'A scatterplot of the number of sophomores against the number of seniors for each plan',
      'Side-by-side bar graphs showing the number of students in each class who chose each plan',
    ],
    correctAnswer: 'C',
    explanation:
      'Because the classes have different sizes, comparing raw counts is misleading, so the comparison should be made with percents (relative frequencies) within each class, which a segmented bar chart does. A pie chart of all students hides the class difference, a histogram is for quantitative data, and a scatterplot is for two quantitative variables.',
    videoExplanation: null,
  },
];
