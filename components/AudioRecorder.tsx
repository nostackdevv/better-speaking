import { Mic, Square, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { WaveForm } from "./WaveForm";
import { formatSecondsToTimestamp } from "@/utils/formatters";
import { useAudioRecorder } from "@/hooks/ui/useAudioRecorder";
import { AudioItemCard } from "@/components/ui/AudioItemCard";

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
        <AudioItemCard
          icon={Mic}
          onRemove={resetRecording}
          removeLabel="Discard recording"
          subtitle={formatSecondsToTimestamp(duration)}
          title="Recording"
        />
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
        className="text-5xl font-bold text-slate-900 tabular-nums mb-6"
      >
        {formatSecondsToTimestamp(duration)}
      </div>

      {status === "idle" ? (
        <button
          onClick={startRecording}
          className="w-20 h-20 rounded-full bg-linear-to-br from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 flex items-center justify-center cursor-pointer transition-all shadow-lg shadow-orange-500/30 hover:scale-105"
        >
          <Mic className="w-8 h-8 text-white" />
        </button>
      ) : (
        <button
          onClick={stopRecording}
          className="w-20 h-20 rounded-full bg-slate-900 hover:bg-slate-800 flex items-center justify-center cursor-pointer transition-all shadow-lg hover:scale-105"
        >
          <Square className="w-7 h-7 text-white fill-white" />
        </button>
      )}

      <p className="text-sm text-slate-400 mt-4">
        {status === "idle" ? "Tap to start recording" : "Tap to stop"}
      </p>
    </div>
  );
};
