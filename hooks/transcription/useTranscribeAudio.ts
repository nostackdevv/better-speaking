import { ApiError, TranscribeResponse } from "@/types/api";
import { useMutation } from "@tanstack/react-query";

export function useTranscribeAudio() {
  return useMutation<TranscribeResponse, ApiError, File | Blob>({
    mutationFn: async (file: File | Blob) => {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/transcribe", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData: ApiError = await response.json();
        throw errorData;
      }

      const data: TranscribeResponse = await response.json();
      return data;
    },
  });
}
