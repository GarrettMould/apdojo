import Link from 'next/link'

export function ExamOptionsPreview() {
  return (
    <div className="py-12">
      <h1 className="text-5xl font-extrabold tracking-tight text-center mb-8 max-w-2xl mx-auto leading-tight">
        Master the AP Exam with Realistic Practice Tests!
      </h1>
      
      <div className="flex flex-col items-center gap-4 max-w-xl mx-auto">
        <Link 
          href="/purchase/macro-exams"
          className="w-full p-6 bg-white border-2 border-black rounded-lg hover:bg-gray-50 hover:border-blue-500 transition-all"
        >
          <h2 className="text-2xl font-semibold text-center">
            Full AP Macro Practice Exams 
          </h2>
        </Link>

        <Link 
          href="/purchase/micro-exams"
          className="w-full p-6 bg-white border-2 border-black rounded-lg hover:bg-gray-50 hover:border-green-500 transition-all"
        >
          <h2 className="text-2xl font-semibold text-center">
            Full AP Micro Practice Exams 
          </h2>
        </Link>
      </div>
    </div>
  )
} 