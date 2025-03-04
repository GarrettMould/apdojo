'use client'
import { useState } from 'react'

// Mock data - replace with real data later
const videos = [
  { id: 1, title: "Supply and Demand", description: "Learn the fundamentals of market equilibrium", tags: ["Micro", "Macro"] },
  { id: 2, title: "GDP Calculation", description: "Step-by-step guide to calculating GDP", tags: ["Macro"] },
  { id: 3, title: "Monetary Policy", description: "How the Federal Reserve influences the economy", tags: ["Macro"] },
  { id: 4, title: "Fiscal Policy", description: "Government spending and taxation effects", tags: ["Macro"] },
  { id: 5, title: "Phillips Curve", description: "Understanding inflation and unemployment relationship", tags: ["Macro"] },
  { id: 6, title: "Exchange Rates", description: "How currency markets work", tags: ["Macro"] },
]

export function VideoLibraryPreview() {
  const [startIndex, setStartIndex] = useState(0)
  const videosPerPage = 3
  
  const handleNext = () => {
    setStartIndex((prevIndex) => 
      (prevIndex + 1) >= videos.length ? 0 : prevIndex + 1
    )
  }

  const handlePrev = () => {
    setStartIndex((prevIndex) => 
      prevIndex === 0 ? videos.length - 1 : prevIndex - 1
    )
  }

  const getCurrentVideos = () => {
    const result = []
    for (let i = 0; i < videosPerPage; i++) {
      const index = (startIndex + i) % videos.length
      result.push(videos[index])
    }
    return result
  }

  const currentVideos = getCurrentVideos()

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-12">Popular Videos</h2>
      
      <div className="relative px-24">
        <button 
          onClick={handlePrev}
          className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-bold text-2xl"
        >
          <span className="rotate-180">➔</span>
        </button>
        
        <button 
          onClick={handleNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-bold text-2xl"
        >
          ➔
        </button>

        {/* Video Grid */}
        <div className="grid grid-cols-3 gap-8">
          {currentVideos.map((video) => (
            <div 
              key={video.id}
              className="group cursor-pointer transition-transform hover:scale-105"
            >
              {/* Video Placeholder */}
              <div className="aspect-video bg-gray-200 mb-4 rounded-lg overflow-hidden">
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  Video Preview
                </div>
              </div>
              
              {/* Video Info */}
              <h3 className="font-semibold text-lg mb-2 group-hover:text-blue-600">
                {video.title}
              </h3>
              <div className="flex gap-1 mb-2">
                {video.tags.map(tag => (
                  <span 
                    key={tag}
                    className={`text-sm px-2 py-0.5 rounded ${
                      tag === 'Macro' 
                        ? 'bg-blue-100 text-blue-600' 
                        : 'bg-green-100 text-green-600'
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <p className="text-sm text-gray-600">
                {video.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 