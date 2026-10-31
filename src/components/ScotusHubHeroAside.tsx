'use client';

import type { Question } from '@/data/questionBanks/types';

type VideoStill = {
  url: string;
  posterTimeSeconds?: number;
};

type ScotusHubHeroAsideProps = {
  caseName: string;
  videoUrl: string;
  posterTimeSeconds?: number;
  backVideo?: VideoStill;
  question: Question;
};

const LETTERS = ['A', 'B', 'C', 'D'] as const;

function StillFrame({ url, posterTimeSeconds }: VideoStill) {
  const posterAt = posterTimeSeconds && posterTimeSeconds > 0 ? posterTimeSeconds : 1;
  return (
    <video
      className="aspect-video w-full object-cover"
      muted
      playsInline
      preload="metadata"
      tabIndex={-1}
      src={`${url}#t=${posterAt}`}
      onLoadedMetadata={(e) => {
        try {
          e.currentTarget.currentTime = posterAt;
        } catch {
          /* seek can fail before data is ready */
        }
      }}
    />
  );
}

export function ScotusHubHeroAside({
  caseName,
  videoUrl,
  posterTimeSeconds,
  backVideo,
  question,
}: ScotusHubHeroAsideProps) {
  return (
    <div className="pointer-events-none relative select-none pr-2 pt-2" aria-hidden="true">
      {backVideo ? (
        <div className="absolute left-0 top-0 z-0 w-[94%] overflow-hidden rounded-2xl border border-black/10 shadow-md -rotate-[8deg]">
          <StillFrame url={backVideo.url} posterTimeSeconds={backVideo.posterTimeSeconds} />
        </div>
      ) : null}

      <div className="absolute -right-1 top-6 z-10 w-[96%] overflow-hidden rounded-2xl border border-black/10 shadow-lg rotate-[5deg]">
        <StillFrame url={videoUrl} posterTimeSeconds={posterTimeSeconds} />
      </div>

      <div className="relative z-20 mt-24 mr-8 rounded-2xl border border-gray-200 bg-white p-5 shadow-xl shadow-violet-900/10">
        <p className="text-xs font-bold uppercase tracking-wider text-violet-700">Try a question</p>
        <p className="mt-2 text-sm font-semibold leading-relaxed text-gray-950">{question.question}</p>
        <div className="mt-4 space-y-2">
          {question.options.map((option, optionIndex) => {
            const letter = LETTERS[optionIndex];
            if (!letter) return null;
            return (
              <div
                key={letter}
                className="flex items-start gap-2.5 rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm leading-snug"
              >
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gray-100 text-xs font-black text-gray-700">
                  {letter}
                </span>
                <span className="flex-1 text-gray-900">{option}</span>
              </div>
            );
          })}
        </div>
        <p className="mt-3 text-xs font-semibold text-gray-400">{caseName}</p>
      </div>
    </div>
  );
}
