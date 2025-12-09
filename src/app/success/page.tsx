export default function SuccessPage() {
  return (
    <div className="max-w-4xl mx-auto py-16 px-4">
      <div className="bg-white rounded-xl shadow-lg p-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Thank you for your purchase!
        </h1>
        <p className="text-gray-600 mb-6">
          You now have full access to all questions and explanations.
        </p>
        <a
          href="/"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Return to Exam
        </a>
      </div>
    </div>
  );
} 