'use client';

import { MessageCircle, Share2, Shuffle } from 'lucide-react';

import { FillerStats } from '@/components/analysis/FillerStats';
import { FillerStatsSkeleton } from '@/components/analysis/FillerStatsSkeleton';
import { TabbedResults } from '@/components/analysis/TabbedResults';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { AnalyticsContextProvider } from '@/lib/analytics';
import { Filler } from '@/schema/filler';
import { ClarityResult, FillerStatsType, NormalizedWord } from '@/types/domain';

interface TranscriptResponse {
  transcript: string;
  words: NormalizedWord[];
  duration: number;
  fillers: Filler[] | null;
  fillerStats: FillerStatsType | null;
  clarityScore: ClarityResult | null;
}

interface ResultsViewProps {
  transcriptResponse: TranscriptResponse;
  audioFile: File | Blob | undefined;
  activePrompt: string | null;
  isComplete: boolean;
  onShare: () => void;
  onNewPrompt: () => void;
  onTryAgain: () => void;
  onSeekAudio?: () => void;
}

export function ResultsView({
  transcriptResponse,
  audioFile,
  activePrompt,
  isComplete,
  onShare,
  onNewPrompt,
  onTryAgain,
  onSeekAudio = () => {},
}: ResultsViewProps) {
  const { transcript, words, duration, fillerStats, clarityScore, fillers } =
    transcriptResponse;

  return (
    <AnalyticsContextProvider
      getProperties={(inherited) => ({
        ...inherited,
        source: [...(inherited.source ?? []), 'Results'],
      })}
    >
      <div className="pb-32">
        {activePrompt && (
          <Card className="mb-4 border-teal-200 bg-teal-50 p-4">
            <div className="flex items-center gap-3">
              <MessageCircle className="h-5 w-5 text-teal-600" />
              <p className="text-sm text-teal-700">
                <span className="font-medium">Prompt:</span> {activePrompt}
              </p>
            </div>
          </Card>
        )}

        {fillerStats ? (
          <FillerStats
            clarityScore={clarityScore ?? null}
            fillerStats={fillerStats}
          />
        ) : (
          <FillerStatsSkeleton />
        )}

        {isComplete && (
          <div className="mt-4 mb-6 flex gap-3">
            <Button className="flex-1" onClick={onShare} variant="outline">
              <Share2 className="h-4 w-4" />
              Share
            </Button>
            {activePrompt && (
              <Button className="flex-1" onClick={onNewPrompt} variant="accent">
                <Shuffle className="h-4 w-4" />
                New Prompt
              </Button>
            )}
            <Button className="flex-1" onClick={onTryAgain}>
              Try Again
            </Button>
          </div>
        )}

        <TabbedResults
          audioSrc={audioFile}
          duration={duration}
          fillers={fillers ?? []}
          fillerStats={
            fillerStats ?? {
              totalFillers: 0,
              totalWords: 0,
              fillerPercentage: 0,
              fillersPerMinute: 0,
              topFillers: [],
            }
          }
          onSeekAudio={onSeekAudio}
          transcriptText={transcript}
          words={words}
        />
      </div>
    </AnalyticsContextProvider>
  );
}
