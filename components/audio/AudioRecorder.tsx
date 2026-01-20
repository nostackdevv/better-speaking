"use client";

import { Mic, Square, AlertCircle, Loader2 } from "lucide-react";

import { AudioItemCard } from "@/components/history/AudioItemCard";
import { Button } from "@/components/ui/Button";
import { useAudioRecorder } from "@/hooks/audio/useAudioRecorder";
import { AnalyticsContextProvider, useAnalyticsContext } from "@/lib/analytics";
import { formatSecondsToTimestamp } from "@/utils/formatters";

import { PromptSelector } from "./PromptSelector";
import { WaveForm } from "./WaveForm";

type AudioRecorderProps = {
  isAnalyzing?: boolean;
  onAnalyze: (blob: Blob) => void;
};

export const AudioRecorder = ({
  isAnalyzing = false,
  onAnalyze,
}: AudioRecorderProps) => {
  const { track } = useAnalyticsContext();
  const {
    status,
    duration,
    recordedBlob,
    audioUrl,
    error,
    startRecording,
    stopRecording,
    resetRecording,
  } = useAudioRecorder();

  const handleStartRecording = () => {
    track((inherited) => ({
      name: "recording_started",
      properties: {
        ...inherited,
        inputSource: "microphone",
      },
    }));
    startRecording();
  };

  const handleStopRecording = () => {
    track((inherited) => ({
      name: "recording_completed",
      properties: {
        ...inherited,
        duration,
        isValidDuration: duration >= 10 && duration <= 120,
      },
    }));
    stopRecording();
  };

  const handleDiscard = () => {
    const reason =
      duration < 10 ? "too_short" : duration > 120 ? "too_long" : "user_action";
    track((inherited) => ({
      name: "recording_discarded",
      properties: {
        ...inherited,
        duration,
        reason,
      },
    }));
    resetRecording();
  };

  const handleAnalyze = () => {
    if (recordedBlob) {
      track((inherited) => ({
        name: "analysis_started",
        properties: {
          ...inherited,
          inputSource: "recording",
          duration,
        },
      }));
      onAnalyze(recordedBlob);
    }
  };

  if (status === "recorded") {
    const isValidDuration = duration >= 10 && duration <= 120;
    const isTooShort = duration < 10;
    const isTooLong = duration > 120;

    return (
      <AnalyticsContextProvider
        getProperties={(inherited) => ({
          ...inherited,
          source: [...(inherited.source ?? []), "Audio Recorder"],
        })}
      >
        <div className="flex flex-col gap-3">
          <AudioItemCard
            icon={Mic}
            onRemove={handleDiscard}
            removeLabel="Discard recording"
            subtitle={formatSecondsToTimestamp(duration)}
            title="Recording"
          />
          {audioUrl && <audio className="w-full" controls src={audioUrl} />}

          {isTooShort && (
            <div
              className="flex items-center gap-2 p-3 text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-lg"
              role="alert"
            >
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>
                Recording must be at least 10 seconds (currently {duration}s)
              </span>
            </div>
          )}

          {isTooLong && (
            <div
              className="flex items-center gap-2 p-3 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg"
              role="alert"
            >
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>Recording exceeds maximum length of 2 minutes</span>
            </div>
          )}

          <Button
            disabled={!isValidDuration || isAnalyzing}
            onClick={handleAnalyze}
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              "Analyze Recording"
            )}
          </Button>
        </div>
      </AnalyticsContextProvider>
    );
  }

  return (
    <AnalyticsContextProvider
      getProperties={(inherited) => ({
        ...inherited,
        source: [...(inherited.source ?? []), "Audio Recorder"],
      })}
    >
      <div className="flex flex-col items-center gap-4">
        {error && (
          <div
            className="flex items-center gap-2 p-3 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg w-full"
            role="alert"
          >
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <PromptSelector className="" />

        <WaveForm isRecording={status === "recording"} />

        <div
          aria-live="polite"
          className="text-5xl font-bold text-slate-900 tabular-nums mb-6"
        >
          {formatSecondsToTimestamp(duration)}
        </div>

        {status === "idle" ? (
          <button
            className="w-20 h-20 rounded-full bg-orange-600 hover:bg-orange-500 flex items-center justify-center cursor-pointer transition-all shadow-lg shadow-orange-500/30 hover:scale-105"
            onClick={handleStartRecording}
          >
            <Mic className="w-8 h-8 text-white" />
          </button>
        ) : (
          <button
            className="w-20 h-20 rounded-full bg-slate-900 hover:bg-slate-800 flex items-center justify-center cursor-pointer transition-all shadow-lg hover:scale-105"
            onClick={handleStopRecording}
          >
            <Square className="w-7 h-7 text-white fill-white" />
          </button>
        )}

        <p className="text-sm text-slate-400 mt-4">
          {status === "idle"
            ? "Tap to start • 10s – 2 mins"
            : "Recording must be between 10 secs to 2 mins"}
        </p>
      </div>
    </AnalyticsContextProvider>
  );
};
