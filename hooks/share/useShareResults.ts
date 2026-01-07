import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

interface ShareResultsParams {
  score: number;
  fillers: number;
  words: number;
  duration: string;
  topFiller: string;
  grade: string;
}

interface ShareResultsReturn {
  shareResults: (params: ShareResultsParams) => Promise<void>;
  isSharing: boolean;
  error: Error | null;
}

const DEFAULT_CAPTION =
  "I just tracked how much filler words I use with speechdeck.app. Can you beat my score?";

export function useShareResults(): ShareResultsReturn {
  const [error, setError] = useState<Error | null>(null);

  const mutation = useMutation({
    mutationFn: async (params: ShareResultsParams) => {
      setError(null);

      const queryParams = new URLSearchParams({
        score: params.score.toString(),
        fillers: params.fillers.toString(),
        words: params.words.toString(),
        duration: params.duration,
        topFiller: params.topFiller,
        grade: params.grade,
      });

      const imageUrl = `/api/share-image?${queryParams.toString()}`;
      const response = await fetch(imageUrl);

      if (!response.ok) {
        throw new Error("Failed to generate share image");
      }

      const blob = await response.blob();
      const file = new File([blob], "speechdeck-results.png", {
        type: "image/png",
      });

      // Mobile: Native share with image + caption
      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({
          files: [file],
          text: DEFAULT_CAPTION,
        });
        return;
      }

      // Desktop: Copy image to clipboard
      if (navigator.clipboard?.write) {
        await navigator.clipboard.write([
          new ClipboardItem({ "image/png": blob }),
        ]);
        return;
      }

      // If neither share nor clipboard is available, throw error
      throw new Error("Sharing not supported on this device");
    },
    onError: (err: Error) => {
      // Don't treat user cancellation as an error
      if (err.name !== "AbortError") {
        setError(err);
      }
    },
  });

  return {
    shareResults: mutation.mutateAsync,
    isSharing: mutation.isPending,
    error,
  };
}
