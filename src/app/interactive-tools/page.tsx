import Link from 'next/link'

const tools = [
  {
    title: 'Flashcards',
    subject: ['macro', 'micro'],
    description: 'Study key economics concepts with interactive flashcards',
    icon: '🎴',
    href: '/interactive-tools/flashcards',
    available: true
  },
  {
    title: 'GDP Calculator',
    subject: ['macro'],
    description: 'Explore how changes in price and quantity affect Real vs. Nominal GDP using Coffee Land\'s economy',
    icon: '📊',
    href: '/interactive-tools/gdp-calculator',
    available: true
  },
  {
    title: 'Supply & Demand Simulator',
    subject: ['macro', 'micro'],
    description: 'Visualize how markets respond to changes in supply and demand',
    icon: '📈',
    href: '/interactive-tools/supply-demand',
    available: false
  },
  {
    title: 'Phillips Curve Plotter',
    subject: ['macro'],
    description: 'Explore the relationship between inflation and unemployment',
    icon: '📊',
    href: '/interactive-tools/phillips-curve',
    available: false
  },
  // Add more tools as needed
]

export default function InteractiveToolsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 mt-12">
      <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 text-center mb-12">
        Interactive <span className="text-blue-500">Study Tools</span>
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool) => (
          <div
            key={tool.title}
            className={`relative group rounded-lg border bg-white p-6 transition-all duration-200 ${
              tool.available 
                ? 'hover:shadow-lg hover:scale-105 cursor-pointer' 
                : 'opacity-75'
            }`}
          >
            {tool.available ? (
              <Link href={tool.href} className="block">
                <div className="flex flex-col h-full">
                  <div className="text-4xl mb-4">{tool.icon}</div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-bold">{tool.title}</h3>
                    <div className="flex gap-1">
                      {tool.subject.map((subj) => (
                        <span
                          key={subj}
                          className={`text-xs px-2 py-0.5 rounded font-medium ${
                            subj === 'macro'
                              ? 'bg-blue-100 text-blue-700'
                              : 'bg-green-100 text-green-700'
                          }`}
                        >
                          {subj === 'macro' ? 'Macro' : 'Micro'}
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-600">{tool.description}</p>
                  <div className="mt-4 text-blue-600 font-semibold group-hover:text-blue-700">
                    Try it now →
                  </div>
                </div>
              </Link>
            ) : (
              <div className="flex flex-col h-full">
                <div className="text-4xl mb-4">{tool.icon}</div>
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-xl font-bold">{tool.title}</h3>
                  <div className="flex gap-1">
                    {tool.subject.map((subj) => (
                      <span
                        key={subj}
                        className={`text-xs px-2 py-0.5 rounded font-medium ${
                          subj === 'macro'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-green-100 text-green-700'
                        }`}
                      >
                        {subj === 'macro' ? 'Macro' : 'Micro'}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-gray-600">{tool.description}</p>
                <div className="mt-4 text-gray-500 font-semibold">
                  Coming Soon
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
} 