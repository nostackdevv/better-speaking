import { Pause, Play } from "lucide-react";
import { ChangeEvent, useMemo } from "react";

import { useAudioPlayer } from "@/hooks/audio/useAudioPlayer";
import { formatSecondsToTimestamp } from "@/utils/formatters";

type AudioPlayerProps = {
  src: string | Blob | File;
};

export const AudioPlayer = ({ src }: AudioPlayerProps) => {
  const {
    isPlaying,
    currentTime,
    duration,
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
      <div className="w-full bg-white px-4 py-3">
        <p className="text-center text-sm text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto">
      <audio {...audioProps} src={audioSrc} />

      <div className="relative mb-4 h-1 w-full">
        <div className="absolute inset-0 rounded-full bg-gray-200" />
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-gray-400"
          style={{ width: `${progress}%` }}
        />
        <input
          className="absolute inset-0 h-full w-full cursor-pointer appearance-none bg-transparent [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gray-400"
          disabled={isLoading}
          max={duration || 0}
          min={0}
          onChange={handleSeek}
          step={0.1}
          type="range"
          value={currentTime}
        />
      </div>

      <div className="flex items-center justify-between">
        <span className="min-w-10 text-sm text-gray-500">
          {formatSecondsToTimestamp(currentTime)}
        </span>

        <button
          aria-label={isPlaying ? "Pause" : "Play"}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-600 text-white transition-colors hover:bg-gray-700 disabled:opacity-50"
          disabled={isLoading}
          onClick={toggle}
          type="button"
        >
          {isPlaying ? (
            <Pause className="h-5 w-5" fill="currentColor" />
          ) : (
            <Play className="h-5 w-5 translate-x-0.5" fill="currentColor" />
          )}
        </button>

        <span className="min-w-10 text-right text-sm text-gray-500">
          {formatSecondsToTimestamp(duration)}
        </span>
      </div>
    </div>
  );
};
