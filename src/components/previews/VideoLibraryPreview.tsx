import { Play, X } from 'lucide-react'
import { videos } from "../../data/videos"
import { useState } from 'react'

const VideoCard = ({ title, description, tags, subject, videoUrl, thumbnail }: {
  title: string;
  description: string;
  tags: string[];
  subject: string;
  videoUrl: string;
  thumbnail?: string;
}) => {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <>
      <div className="w-full max-w-[320px] h-[28rem] bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden flex flex-col">
        {/* Thumbnail Container with Play Button Overlay */}
        <div className="relative w-full h-48 bg-gray-200 group">
          {thumbnail ? (
            <img 
              src={thumbnail} 
              alt={title} 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-200" />
          )}
          
          {/* Permanent play button overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 bg-black/50 rounded-full flex items-center justify-center">
              <Play className="w-6 h-6 text-white" />
            </div>
          </div>
          
          {/* Hover effect overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/20 transition-colors">
            <button 
              onClick={() => setShowVideo(true)}
              className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center transform scale-90 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all"
            >
              <Play className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6 flex flex-col flex-1">
          {/* Subject with colored dot */}
          <div className="flex items-center gap-2 mb-2">
            <div className={`w-2 h-2 rounded-full ${
              subject.includes('Macro') ? 'bg-blue-500' : 'bg-green-500'
            }`} />
            <p className="text-sm text-gray-900 font-medium">
              {subject}
            </p>
          </div>

          {/* Title with fixed height container */}
          <div className="h-14 mb-3 overflow-hidden">
            <h3 className="text-lg font-bold text-gray-900 line-clamp-2">
              {title}
            </h3>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">
            {description}
          </p>

          {/* Tags at bottom */}
          <div className="mt-auto flex gap-2 overflow-hidden">
            {tags.slice(0, 2).map((tag, index) => (
              <span 
                key={index} 
                className="px-2 py-1 bg-gray-100 rounded-md text-xs text-gray-600 whitespace-nowrap"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {showVideo && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setShowVideo(false)}
        >
          <div 
            className="relative bg-black rounded-lg overflow-hidden w-full max-w-4xl"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setShowVideo(false)}
              className="absolute top-2 right-2 md:top-4 md:right-4 text-white hover:text-gray-300 z-10"
            >
              <X className="w-6 h-6" />
            </button>
            <video 
              controls 
              autoPlay 
              className="w-full"
              playsInline
            >
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}
    </>
  )
}

const VideoLibraryPreview = () => {
  const previewVideos = videos.slice(0, 3)

  return (
    <div className="relative w-screen -ml-[50vw] left-1/2 bg-gray-50 mb-20 mt-20">
      <div className="w-full py-12 px-4 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-center gap-8 flex-wrap">
          {previewVideos.map((video) => (
            <div key={video.id} className="w-full md:w-auto flex justify-center">
              <VideoCard
                title={video.title}
                description={video.description}
                tags={video.tags}
                subject={video.subject}
                videoUrl={video.videoUrl}
                thumbnail={video.thumbnail}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default VideoLibraryPreview