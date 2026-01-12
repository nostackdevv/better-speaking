import { TranscriptionStreamData } from "@/types/api";
import { transcribeAudio } from "./deepgram.service";
import { detectFillers } from "./filler-detection.service";
import { normalizeDeepgramTranscript } from "@/lib/utils/transformers";
import { computeFillerStats } from "@/lib/filler/filler-stats";
import { calculateClarityScore } from "@/lib/filler/clarity-score";
import { TRANSCRIPT_DUMMY } from "@/dummy";

export function processAudioTranscriptionStream(audioFile: Blob) {
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      try {
        // Step 1: Convert to buffer
        const buffer = Buffer.from(await audioFile.arrayBuffer());

        // Step 2: Transcribe with Deepgram
        const { transcript, words, duration } = await transcribeAudio(buffer);

        // Check for empty transcript (no speech detected)
        if (!transcript || transcript.trim().length === 0) {
          const errorData = { step: "error", error: "no_speech_detected" };
          controller.enqueue(encoder.encode(JSON.stringify(errorData) + "\n"));
          controller.close();
          return;
        }

        const normalizedWords = normalizeDeepgramTranscript({
          transcript,
          words,
        });

        // Send transcript data immediately
        const transcriptData: TranscriptionStreamData = {
          step: "transcript",
          transcript,
          words: normalizedWords,
          duration,
        };
        controller.enqueue(encoder.encode(JSON.stringify(transcriptData) + "\n"));

        // Step 3: Detect fillers with OpenAI
        const fillers = await detectFillers({
          text: transcript,
          words: words.map(({ word }, index) => ({
            index,
            text: word,
          })),
        });

        // Send fillers data
        const fillersData: TranscriptionStreamData = {
          step: "fillers",
          fillers,
        };
        controller.enqueue(encoder.encode(JSON.stringify(fillersData) + "\n"));

        // Step 4: Compute statistics and clarity score
        const fillerStats = computeFillerStats({
          fillers,
          words: normalizedWords,
          duration,
        });
        const clarityScore = calculateClarityScore(fillerStats, duration);

        // Send final complete data
        const completeData: TranscriptionStreamData = {
          step: "complete",
          fillerStats,
          clarityScore,
          createdAt: new Date().toISOString(),
        };
        controller.enqueue(encoder.encode(JSON.stringify(completeData) + "\n"));

        controller.close();
      } catch (error) {
        controller.error(error);
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Transfer-Encoding": "chunked",
    },
  });
}

export function getDummyTranscriptionStream() {
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      // Step 1: Send transcript data
      const transcriptData: TranscriptionStreamData = {
        step: "transcript",
        transcript: TRANSCRIPT_DUMMY.transcript,
        words: TRANSCRIPT_DUMMY.words,
        duration: TRANSCRIPT_DUMMY.duration,
      };
      controller.enqueue(encoder.encode(JSON.stringify(transcriptData) + "\n"));

      // Step 2: Send fillers data
      const fillersData: TranscriptionStreamData = {
        step: "fillers",
        fillers: TRANSCRIPT_DUMMY.fillers,
      };
      controller.enqueue(encoder.encode(JSON.stringify(fillersData) + "\n"));

      // Step 3: Send complete data with stats
      const fillerStats = computeFillerStats({
        fillers: TRANSCRIPT_DUMMY.fillers,
        words: TRANSCRIPT_DUMMY.words,
        duration: TRANSCRIPT_DUMMY.duration,
      });
      const clarityScore = calculateClarityScore(
        fillerStats,
        TRANSCRIPT_DUMMY.duration
      );
      const completeData: TranscriptionStreamData = {
        step: "complete",
        fillerStats,
        clarityScore,
        createdAt: new Date().toISOString(),
      };
      controller.enqueue(encoder.encode(JSON.stringify(completeData) + "\n"));

      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Transfer-Encoding": "chunked",
    },
  });
}
