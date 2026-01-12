import { Card } from "@/components/ui/Card";
import { splitTranscriptIntoChunks } from "@/utils/transcription/chunking";
import { Filler } from "@/schema/filler";
import { NormalizedWord } from "@/types/domain";
import { TranscriptDisplay } from "./TranscriptDisplay";
import { AudioPlayerCompact } from "@/components/audio/AudioPlayerCompact";
import { useMemo } from "react";

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
          <div className="mb-4 pb-4 border-b border-slate-100">
            <AudioPlayerCompact duration={duration} src={audioSrc} />
          </div>
        )}

        <div className="max-h-60 overflow-y-auto">
          <TranscriptDisplay chunks={chunks} />
        </div>
      </Card>

      <div className="flex justify-between items-center mt-1">
        <p className="flex items-center gap-2 text-xs text-slate-500 mt-2.5">
          <span
            aria-hidden="true"
            className="w-3.5 h-3.5 bg-orange-100 border border-orange-200 rounded"
          />
          Highlighted words are detected fillers
        </p>
        <span className="text-sm text-slate-600 bg-slate-100 px-2.5 py-1 rounded">
          {transcriptText.split(" ").length} word(s)
        </span>
      </div>
    </section>
  );
};
