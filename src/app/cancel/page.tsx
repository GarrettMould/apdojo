export default function CancelPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md p-8 bg-white rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Payment Cancelled</h1>
        <p className="mb-4">Your payment was cancelled. You can try again when you're ready.</p>
        <a href="/exam" className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Return to Exam
        </a>
      </div>
    </div>
  );
} 