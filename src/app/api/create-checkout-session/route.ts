import { NextResponse } from 'next/server'
import Stripe from 'stripe'

type Subject = 'macro' | 'micro';
type ProductType = 'mcq' | 'frq';
type ExamType = '1' | '2' | '3';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not set in environment variables');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-02-24.acacia'
})

export async function POST(req: Request) {
  try {
    const url = new URL(req.url);
    const baseUrl = `${url.protocol}//${url.host}`;
    
    const { subject, productType, examType, cancelUrl } = await req.json() as { 
      subject: Subject; 
      productType: ProductType; 
      examType: ExamType;
      cancelUrl: string;
    };
    
    // Define product configurations
    const products = {
      macro: {
        mcq: {
          1: { name: 'AP Macroeconomics MCQ Exam 1', price: 1999 },
          2: { name: 'AP Macroeconomics MCQ Exam 2', price: 1999 },
          3: { name: 'AP Macroeconomics MCQ Exam 3', price: 1999 },
        },
        frq: {
          1: { name: 'AP Macroeconomics FRQ Exam 1', price: 999 },
          2: { name: 'AP Macroeconomics FRQ Exam 2', price: 999 },
          3: { name: 'AP Macroeconomics FRQ Exam 3', price: 999 },
        }
      },
      micro: {
        mcq: {
          1: { name: 'AP Microeconomics MCQ Exam 1', price: 1999 },
          2: { name: 'AP Microeconomics MCQ Exam 2', price: 1999 },
          3: { name: 'AP Microeconomics MCQ Exam 3', price: 1999 },
        },
        frq: {
          1: { name: 'AP Microeconomics FRQ Exam 1', price: 999 },
          2: { name: 'AP Microeconomics FRQ Exam 2', price: 999 },
          3: { name: 'AP Microeconomics FRQ Exam 3', price: 999 },
        }
      }
    };

    // Get the specific product
    const product = products[subject]?.[productType]?.[examType];
    if (!product) {
      throw new Error('Invalid subject, product type, or exam type');
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: product.name,
              description: `
                The ${product.name} is a comprehensive exam preparation tool that includes:
                ✓ Full access to all ${product.name} questions
                ✓ Detailed video explanations for each question
                ✓ Personalized study plan based on your results
                ✓ Performance analytics and progress tracking
                ✓ College Board® aligned content
                ✓ Lifetime access to exam materials
              `,
            },
            unit_amount: product.price,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${baseUrl}/success`,
      cancel_url: `${baseUrl}/purchase/${subject}-exams`,
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error('Detailed error in checkout session:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error message:', errorMessage);
    return NextResponse.json(
      { error: 'Error creating checkout session', details: errorMessage },
      { status: 500 }
    );
  }
}
