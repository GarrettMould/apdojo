import Image from 'next/image';
import Headshot from '../../public/images/Headshot.jpg';
import WyzantReviews from '../../public/images/WyzantReviews.png';

export function WyzantReviewsSection({
  title = 'Hundreds of hours of experience helping students achieve their AP goals',
  showTitle = true,
}: {
  title?: string;
  showTitle?: boolean;
}) {
  return (
    <div className="w-full">
      {showTitle && (
        <h3 className="text-3xl sm:text-4xl font-black text-gray-900 text-center mb-8 leading-tight">
          {title}
        </h3>
      )}
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-10">
        <div className="relative w-44 h-44 sm:w-48 sm:h-48 rounded-full overflow-hidden flex-shrink-0 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] bg-white">
          <div className="absolute inset-0 translate-y-4">
            <Image
              src={Headshot}
              alt="Garrett's headshot"
              className="object-cover"
              fill
              sizes="(max-width: 768px) 176px, 192px"
              priority
            />
          </div>
        </div>
        <div className="w-full flex-1">
          <Image
            src={WyzantReviews}
            alt="Wyzant reviews"
            className="w-full h-auto"
            priority
          />
        </div>
      </div>
    </div>
  );
}