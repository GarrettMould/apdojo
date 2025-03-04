import { useState, useEffect } from 'react';

const ExamDayCountdown = () => {
  const [showMacro, setShowMacro] = useState(true);
  
  // 2025 AP Exam Dates
  const macroExamDate = new Date('2025-05-09');
  const microExamDate = new Date('2025-05-05');

  const calculateDaysUntil = (examDate: Date) => {
    const today = new Date();
    const diffTime = examDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setShowMacro(prev => !prev);
    }, 5000); // Switch every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4 text-center">
      <h2 className="text-3xl font-semibold text-blue-600 transition-opacity duration-500">
        Countdown to AP {showMacro ? 'Macro' : 'Micro'} Exam: {' '}
        {showMacro 
          ? calculateDaysUntil(macroExamDate) 
          : calculateDaysUntil(microExamDate)
        } days
      </h2>
    </div>
  );
};

export default ExamDayCountdown;
