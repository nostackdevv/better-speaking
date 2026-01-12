import { Pause, Play } from "lucide-react";
import { ChangeEvent, useMemo } from "react";
import { useAudioPlayer } from "@/hooks/audio/useAudioPlayer";
import { formatSecondsToTimestamp } from "@/utils/formatters";

type AudioPlayerCompactProps = {
  src: string | Blob | File;
  duration: number;
};

export const AudioPlayerCompact = ({ src, duration }: AudioPlayerCompactProps) => {
  const {
    isPlaying,
    currentTime,
    isLoading,
    error,
    toggle,
    seek,
    audioProps,
  } = useAudioPlayer();

  const audioSrc = useMemo(() => {
    if (typeof src === "string") {
      return src;
    }
    const url = URL.createObjectURL(src);
    return url;
  }, [src]);

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  const handleSeek = (e: ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    seek(time);
  };

  if (error) {
    return (
      <div className="flex items-center gap-3">
        <p className="text-xs text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <>
      <audio {...audioProps} src={audioSrc} />

      <div className="flex items-center gap-3">
        <button
          aria-label={isPlaying ? "Pause" : "Play"}
          className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-white cursor-pointer hover:bg-slate-700 transition-colors flex-shrink-0 disabled:opacity-50"
          disabled={isLoading}
          onClick={toggle}
          type="button"
        >
          {isPlaying ? (
            <Pause className="w-4 h-4" />
          ) : (
            <Play className="w-4 h-4 ml-0.5" />
          )}
        </button>

        <div className="flex-1 relative">
          <div className="relative h-1 bg-slate-200 rounded-full">
            <div
              className="absolute inset-y-0 left-0 h-full bg-slate-400 rounded-full"
              style={{ width: `${progress}%` }}
            />
            <input
              className="absolute inset-0 h-full w-full cursor-pointer appearance-none bg-transparent [&::-webkit-slider-thumb]:h-2.5 [&::-webkit-slider-thumb]:w-2.5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-slate-500 [&::-webkit-slider-thumb]:hover:bg-slate-600"
              disabled={isLoading}
              max={duration || 0}
              min={0}
              onChange={handleSeek}
              step={0.1}
              type="range"
              value={currentTime}
            />
          </div>
        </div>

        <span className="text-xs text-slate-500 tabular-nums shrink-0 min-w-10 text-right">
          {formatSecondsToTimestamp(currentTime)} /{" "}
          {formatSecondsToTimestamp(duration)}
        </span>
      </div>
    </>
  );
};
