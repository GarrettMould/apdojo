import Link from 'next/link'

export function ExamOptionsPreview() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-6">
        Master the AP Exam with Realistic Practice Tests!
      </h1>
      
      
      
      <div className="grid md:grid-cols-2 gap-6">
        <Link 
          href="/purchase/macro-exams"
          className="block p-8 bg-white border-2 border-black rounded-lg hover:bg-gray-50 hover:border-blue-500  transition-all"
        >
          <h2 className="text-2xl font-semibold text-center">
            Full AP Macro Practice Exams ➔
          </h2>
        </Link>

        <Link 
          href="/purchase/micro-exams"
          className="block p-8 bg-white border-2 border-black rounded-lg hover:bg-gray-50 hover:border-green-500 transition-all"
        >
          <h2 className="text-2xl font-semibold text-center">
            Full AP Micro Practice Exams ➔
          </h2>
        </Link>
      </div>
    </div>
  )
} 