import { Play, X } from 'lucide-react'
import { videos } from "../../data/videos"
import { useState } from 'react'
import { VideoModal } from '@/components/VideoModal'

const VideoCard = ({ title, description, tags, subject, unit, videoUrl, thumbnail, questions }: {
  title: string;
  description: string;
  tags: string[];
  subject: string;
  unit: string;
  videoUrl: string;
  thumbnail?: string;
  questions: any[];
}) => {
  const [showVideo, setShowVideo] = useState(false);

  // Updated helper function to include AP
  const getShortSubject = (subject: string) => {
    return subject.toLowerCase().includes('macro') ? 'AP Macro' : 'AP Micro';
  };

  return (
    <>
      <div className="w-full max-w-[320px] h-[28rem] bg-white rounded-xl shadow-lg overflow-hidden flex flex-col">
        {/* Thumbnail Container with Play Button Overlay */}
        <div className="relative w-full h-48 bg-gray-100 group">
          {/* Add subtle pattern background */}
          <div className="absolute inset-0 opacity-10" 
            style={{ 
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='6' height='6' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%239C92AC' fill-opacity='0.4' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E")` 
            }} 
          />
          
          {thumbnail ? (
            <img 
              src={thumbnail} 
              alt={title} 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-gray-400">No thumbnail</div>
            </div>
          )}
          
          {/* Updated play button overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/20 to-transparent">
            <div className="w-12 h-12 bg-blue-500/90 rounded-full flex items-center justify-center border-2 border-blue-500">
              <Play className="w-6 h-6 text-white fill-current" />
            </div>
          </div>
          
          {/* Updated hover effect overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/40 transition-colors">
            <button 
              onClick={() => setShowVideo(true)}
              className="w-14 h-14 bg-blue-500/90 rounded-full flex items-center justify-center transform scale-90 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all shadow-lg border-2 border-blue-500"
            >
              <Play className="w-7 h-7 text-white fill-current" />
            </button>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6 flex flex-col flex-1 border-t border-gray-100">
          {/* Subject + Unit tag with AP included */}
          <div className="mb-3">
            <span className="inline-flex px-2.5 py-1 rounded-md text-sm font-medium bg-blue-50 text-blue-500">
              {getShortSubject(subject)} • Unit {unit}
            </span>
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
        <VideoModal
          videoUrl={videoUrl}
          questions={questions}
          onClose={() => setShowVideo(false)}
        />
      )}
    </>
  )
}

const VideoLibraryPreview = () => {
  const previewVideos = videos.slice(0, 3)

  return (
    <div className="relative w-screen -ml-[50vw] left-1/2 bg-gray-50 mb-20 mt-20">
      <div className="w-full py-12 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-extrabold tracking-tight drop-shadow-sm leading-tight mb-4">
            <span className="text-blue-500">Master</span> Tough Topics with Ease
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Understandcomplex economic concepts with AP Dojo`s simple explanations. Plus, test your understanding with practice problems after each video!
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row justify-center gap-8 flex-wrap">
          {previewVideos.map((video) => (
            <div key={video.id} className="w-full md:w-auto flex justify-center">
              <VideoCard
                title={video.title}
                description={video.description}
                tags={video.tags}
                subject={video.subject}
                unit={video.unit}
                videoUrl={video.videoUrl}
                thumbnail={video.thumbnail}
                questions={video.questions}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default VideoLibraryPreview