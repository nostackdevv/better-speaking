import { X, Mic, Square, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { WaveForm } from "./WaveForm";
import { formatSecondsToTimestamp } from "@/utils/formatters";
import { useAudioRecorder } from "@/hooks/ui/useAudioRecorder";

type AudioRecorderProps = {
  onAnalyze: (blob: Blob) => void;
};

export const AudioRecorder = ({ onAnalyze }: AudioRecorderProps) => {
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

  const handleAnalyze = () => {
    if (recordedBlob) {
      onAnalyze(recordedBlob);
    }
  };

  if (status === "recorded") {
    return (
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3 p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <div className="flex items-center justify-center w-10 h-10 bg-indigo-100 rounded-lg">
            <Mic aria-hidden="true" className="w-5 h-5 text-indigo-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900">Recording</p>
            <p className="text-xs text-gray-500">{formatSecondsToTimestamp(duration)}</p>
          </div>
          <button
            aria-label="Discard recording"
            className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded-md transition-colors cursor-pointer"
            onClick={resetRecording}
            type="button"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        {audioUrl && <audio className="w-full" controls src={audioUrl} />}
        <Button onClick={handleAnalyze}>Analyze Recording</Button>
      </div>
    );
  }

  return (
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

      <WaveForm isRecording={status === "recording"} />

      <div
        aria-live="polite"
        className="text-4xl font-semibold text-gray-900 tabular-nums"
      >
        {formatSecondsToTimestamp(duration)}
      </div>

      {status === "idle" ? (
        <Button onClick={startRecording}>
          <span className="flex items-center justify-center gap-2">
            <Mic className="w-5 h-5" />
            Start Recording
          </span>
        </Button>
      ) : (
        <Button onClick={stopRecording} variant="secondary">
          <span className="flex items-center justify-center gap-2">
            <Square className="w-4 h-4 fill-current" />
            Stop Recording
          </span>
        </Button>
      )}
    </div>
  );
};
