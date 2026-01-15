import { cn } from "@/lib/utils";
import { Chunk } from "@/types/ui";

type TranscriptDisplayProps = {
  chunks: Chunk[];
};

export const TranscriptDisplay = ({ chunks }: TranscriptDisplayProps) => {
  if (!chunks || chunks.length === 0) {
    return <p>No transcript available.</p>;
  }

  return (
    <p className="leading-relaxed text-slate-700 ph-no-capture">
      {chunks.map((chunk, chunkIdx) => (
        <span key={chunkIdx}>
          <span
            className={cn(
              chunk.type === "filler" && "bg-orange-100 text-orange-700 rounded px-0.5"
            )}
          >
            {chunk.words.map(({ displayText }) => displayText).join(" ")}
          </span>
          {chunkIdx < chunks.length - 1 && " "}
        </span>
      ))}
    </p>
  );
};
