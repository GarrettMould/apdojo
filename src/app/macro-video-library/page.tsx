import Link from 'next/link';
import { videos as allVideos } from '@/data/videos';
import { ArrowRight } from 'lucide-react';

// Get the 7 most recent macro videos by id
const macroVideos = allVideos
  .filter(v => v.subjects.includes('AP Macroeconomics'))
  .sort((a, b) => parseInt(b.id) - parseInt(a.id))
  .slice(0, 7);

export default function MacroVideoLibrary() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-start py-12">
      {/* Title and arrow link */}
      <div className="flex items-center gap-3 mb-12">
        <h1
          className="text-3xl font-extrabold text-gray-900"
          style={{ fontFamily: '"Comic Sans MS", "Comic Sans", cursive' }}
        >
          Discover more AP macro resources
        </h1>
        <Link href="/macro-resources-placeholder" className="ml-2 group flex items-center">
          <ArrowRight className="w-8 h-8 text-blue-600 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {/* Video grid */}
      <div className="w-full max-w-2xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-center">
        {macroVideos.map(video => (
          <Link
            key={video.id}
            href={`/videos/macro/${video.videoSlug}`}
            className="group flex flex-col items-center cursor-pointer"
            style={{ textDecoration: 'none' }}
          >
            <img
              src={video.thumbnail || '/images/placeholder-thumb.png'}
              alt={video.title}
              className="w-64 h-40 object-cover rounded-lg shadow-md group-hover:scale-105 transition-transform duration-200"
            />
          </Link>
        ))}
      </div>
    </div>
  );
} 