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
    <p className="leading-relaxed text-gray-600">
      {chunks.map((chunk, chunkIdx) => (
        <span
          className={cn(
            chunk.type === "filler" && "bg-yellow-200 rounded px-0.5"
          )}
          key={chunkIdx}
        >
          {chunk.words.map(({ displayText }) => displayText).join(" ")}
          {chunkIdx < chunks.length - 1 && " "}
        </span>
      ))}
    </p>
  );
};
