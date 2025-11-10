import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';
import { allQuestions } from '@/data/unitPracticeProblems/unitPracticeProblems';

export async function POST() {
  try {
    const macroQuestions = allQuestions.filter(q => q.subject === 'ap_macroeconomics');
    const microQuestions = allQuestions.filter(q => q.subject === 'ap_microeconomics');

    const randomMacroIndex = Math.floor(Math.random() * macroQuestions.length);
    const randomMicroIndex = Math.floor(Math.random() * microQuestions.length);

    const macroQuestion = macroQuestions[randomMacroIndex];
    const microQuestion = microQuestions[randomMicroIndex];

    const dailyQuestions = {
      macro: macroQuestion,
      micro: microQuestion,
      updatedAt: new Date().toISOString(),
    };

    await adminDb.collection('dailyQuestions').doc('current').set(dailyQuestions);

    return NextResponse.json({ success: true, questions: dailyQuestions });
  } catch (error) {
    console.error('Error setting question of the day:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}



