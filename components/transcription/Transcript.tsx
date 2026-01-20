import { useMemo } from 'react';

import { AudioPlayerCompact } from '@/components/audio/AudioPlayerCompact';
import { Card } from '@/components/ui/Card';
import { Filler } from '@/schema/filler';
import { NormalizedWord } from '@/types/domain';
import { splitTranscriptIntoChunks } from '@/utils/transcription/chunking';

import { TranscriptDisplay } from './TranscriptDisplay';

type TranscriptProps = {
  transcriptText: string;
  duration: number;
  fillers: Filler[];
  words: NormalizedWord[];
  audioSrc?: string | Blob | File;
};

export const Transcript = ({
  fillers,
  duration,
  words,
  transcriptText,
  audioSrc,
}: TranscriptProps) => {
  const chunks = useMemo(
    () => splitTranscriptIntoChunks(words, fillers),
    [words, fillers]
  );

  return (
    <section aria-labelledby="transcript-heading">
      <Card className="p-4">
        {audioSrc && (
          <div className="mb-4 border-b border-slate-100 pb-4">
            <AudioPlayerCompact duration={duration} src={audioSrc} />
          </div>
        )}

        <div className="max-h-60 overflow-y-auto">
          <TranscriptDisplay chunks={chunks} />
        </div>
      </Card>

      <div className="mt-1 flex items-center justify-between">
        <p className="mt-2.5 flex items-center gap-2 text-xs text-slate-500">
          <span
            aria-hidden="true"
            className="h-3.5 w-3.5 rounded border border-orange-200 bg-orange-100"
          />
          Highlighted words are detected fillers
        </p>
        <span className="rounded bg-slate-100 px-2.5 py-1 text-sm text-slate-600">
          {transcriptText.split(' ').length} word(s)
        </span>
      </div>
    </section>
  );
};
