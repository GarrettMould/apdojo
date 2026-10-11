'use client';

import type { CourseSubject } from '@/lib/courseSubject';
import { BasicFourFunctionCalculator } from '@/components/exam/BasicFourFunctionCalculator';
import { StatsExamCalculatorPanel } from '@/components/exam/StatsExamCalculatorPanel';

type Props = {
  examType: CourseSubject;
  accentClassName: string;
};

/** Calculator pane for FullExam tools panel — Desmos for Stats, basic otherwise. */
export function ExamToolsCalculator({ examType, accentClassName }: Props) {
  if (examType === 'stats') {
    return <StatsExamCalculatorPanel accentClassName={accentClassName} />;
  }
  return <BasicFourFunctionCalculator accentClassName={accentClassName} />;
}
