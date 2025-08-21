import dojoIcon from "../../public/images/dojoIcon.png"

interface Question {
  id: number;
  unit: number;
  unitName: string;
  correctAnswer: string;
}

interface UnitPerformance {
  unit: number;
  unitName: string;
  correct: number;
  total: number;
  percentage: number;
}

interface AssessmentResultsPanelProps {
  totalQuestions: number;
  correctAnswers: number;
  questions: Question[];
  answers: Record<number, string>;
  examType: 'micro' | 'macro';
}

export function AssessmentResultsPanel({ 
  totalQuestions, 
  correctAnswers, 
  questions,
  answers,
  examType
}: AssessmentResultsPanelProps) {
  const percentage = Math.round((correctAnswers / totalQuestions) * 100);

  // Calculate performance for each unit
  const getUnitPerformance = (): UnitPerformance[] => {
    const unitStats = new Map<number, UnitPerformance>();

    questions.forEach(question => {
      const existing = unitStats.get(question.unit) || {
        unit: question.unit,
        unitName: question.unitName,
        correct: 0,
        total: 0,
        percentage: 0
      };

      existing.total += 1;
      if (answers[question.id] === question.correctAnswer) {
        existing.correct += 1;
      }
      existing.percentage = Math.round((existing.correct / existing.total) * 100);

      unitStats.set(question.unit, existing);
    });

    return Array.from(unitStats.values());
  };

  const unitPerformance = getUnitPerformance();
  const sortedUnits = [...unitPerformance].sort((a, b) => a.percentage - b.percentage);
  
  const weakestUnits = sortedUnits.slice(0, 2);
  const strongestUnits = sortedUnits.slice(-2);

  return (
    <div className="bg-white rounded-lg shadow-xl p-8">
      {/* New Header Section */}
      <div className="flex items-center gap-3 mb-6">
        <img src={dojoIcon.src} alt="AP Dojo Logo" className="w-8 h-8" />
        <h1 className="text-xl font-extrabold tracking-tight text-gray-900">AP Dojo Exam Feedback</h1>
      </div>

      {/* Overall Score */}
      <div className="flex flex-col space-y-6">
        <div className="rounded-lg border border-gray-200 overflow-hidden">
          <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
            <h2 className="font-semibold text-gray-900">Assessment Results</h2>
          </div>
          <div className="p-4 bg-white">
            <div className="flex items-center gap-6">
              <div className="bg-blue-50 text-blue-800 px-4 py-2 rounded-md font-semibold text-lg">
                Score: {percentage}%
              </div>
              <div className="text-gray-600 font-medium">
                {correctAnswers} correct out of {totalQuestions}
              </div>
            </div>
          </div>
        </div>

        {/* Unit Analysis */}
        <div className="rounded-lg border border-gray-200 overflow-hidden">
          <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
            <h3 className="font-semibold text-gray-900">Performance by Unit</h3>
          </div>
          <div className="p-4 bg-white">
            <div className="grid md:grid-cols-2 gap-4">
              {/* Areas for Improvement */}
              <div className="space-y-3">
                <h4 className="font-bold text-gray-900">Areas for Improvement</h4>
                {weakestUnits.map(unit => (
                  <div key={unit.unit} className="rounded-lg border border-gray-200 p-4 h-[108px]">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center flex-shrink-0">
                        {unit.unit}
                      </div>
                      <div className="min-w-0">
                        <div className="font-medium text-gray-900 line-clamp-2">{unit.unitName}</div>
                        <div className="text-sm text-gray-600 mt-1">
                          Score: {unit.percentage}% ({unit.correct}/{unit.total} correct)
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Strongest Areas */}
              <div className="space-y-3">
                <h4 className="font-bold text-gray-900">Strongest Areas</h4>
                {strongestUnits.map(unit => (
                  <div key={unit.unit} className="rounded-lg border border-gray-200 p-4 h-[108px]">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center flex-shrink-0">
                        {unit.unit}
                      </div>
                      <div className="min-w-0">
                        <div className="font-medium text-gray-900 line-clamp-2">{unit.unitName}</div>
                        <div className="text-sm text-gray-600 mt-1">
                          Score: {unit.percentage}% ({unit.correct}/{unit.total} correct)
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Study Resources */}
        <div className="rounded-lg border border-blue-200 overflow-hidden">
          <div className="bg-blue-50 px-4 py-3 border-b border-blue-200">
            <h3 className="font-semibold text-gray-900">Recommended Study Resources</h3>
          </div>
          <div className="p-4 bg-white">
            <div className="grid md:grid-cols-2 gap-4">
              {weakestUnits.map(unit => (
                <a
                  key={unit.unit}
                  href={`/unit-study-guides`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50/50 transition-all"
                >
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">Unit {unit.unit} Study Guide</div>
                    <div className="text-sm text-gray-600">{unit.unitName}</div>
                  </div>
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
