import { Card } from "@/components/ui/Card";
import { chunkTranscript } from "@/utils/filler-helpers";
import { Filler } from "@/schema/filler";
import { NormalizedWord } from "@/types/domain";
import { TranscriptDisplay } from "./TranscriptDisplay";
import { useMemo } from "react";

type TranscriptProps = {
  transcriptText: string;
  duration: number;
  fillers: Filler[];
  words: NormalizedWord[];
};

export const Transcript = ({
  fillers,
  duration,
  words,
  transcriptText,
}: TranscriptProps) => {
  const chunks = useMemo(
    () => chunkTranscript(words, fillers),
    [words, fillers]
  );

  return (
    <section aria-labelledby="transcript-heading">
      <div className="flex justify-between items-center mb-4">
        <h2
          className="text-lg font-semibold text-gray-900"
          id="transcript-heading"
        >
          Transcript
        </h2>
        <span className="text-sm text-gray-500 bg-gray-100 px-2.5 py-1 rounded">
          {transcriptText.split(" ").length} word(s)
        </span>
      </div>

      <Card className="p-4">
        <div className="max-h-60 overflow-y-auto">
          <TranscriptDisplay chunks={chunks} />
        </div>
      </Card>

      <p className="flex items-center gap-2 text-xs text-gray-400 mt-2.5">
        <span
          aria-hidden="true"
          className="w-3.5 h-3.5 bg-yellow-200 rounded"
        />
        Highlighted words are detected fillers
      </p>
    </section>
  );
};
