import Image from 'next/image'
import Headshot from '../../public/images/Headshot.jpg'
import WyzantReviews from '../../public/images/WyzantReviews.png'

export function WyzantReviewsSection() {
  return (
    <div className="max-w-6xl mx-auto">
      <h3 className="text-4xl font-extrabold text-gray-900 text-center mb-16">
        Hundreds of hours of experience helping students achieve their AP goals
      </h3>
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
        <div className="relative w-48 h-48 rounded-full overflow-hidden flex-shrink-0 border-4 border-blue-100">
          <div className="absolute inset-0 translate-y-4">
            <Image
              src={Headshot}
              alt="Garrett's headshot"
              className="object-cover"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
            />
          </div>
        </div>
        <div className="max-w-4xl flex-1">
          <Image
            src={WyzantReviews}
            alt="Wyzant Reviews"
            className="w-full"
            priority
          />
        </div>
      </div>
    </div>
  )
}