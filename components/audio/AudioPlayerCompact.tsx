import { Pause, Play } from 'lucide-react';
import { ChangeEvent, useMemo } from 'react';

import { useAudioPlayer } from '@/hooks/audio/useAudioPlayer';
import { formatSecondsToTimestamp } from '@/utils/formatters';

type AudioPlayerCompactProps = {
  src: string | Blob | File;
  duration: number;
};

export const AudioPlayerCompact = ({
  src,
  duration,
}: AudioPlayerCompactProps) => {
  const { isPlaying, currentTime, isLoading, error, toggle, seek, audioProps } =
    useAudioPlayer();

  const audioSrc = useMemo(() => {
    if (typeof src === 'string') {
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
          aria-label={isPlaying ? 'Pause' : 'Play'}
          className="flex h-10 w-10 flex-shrink-0 cursor-pointer items-center justify-center rounded-full bg-slate-800 text-white transition-colors hover:bg-slate-700 disabled:opacity-50"
          disabled={isLoading}
          onClick={toggle}
          type="button"
        >
          {isPlaying ? (
            <Pause className="h-4 w-4" />
          ) : (
            <Play className="ml-0.5 h-4 w-4" />
          )}
        </button>

        <div className="relative flex-1">
          <div className="relative h-1 rounded-full bg-slate-200">
            <div
              className="absolute inset-y-0 left-0 h-full rounded-full bg-slate-400"
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

        <span className="min-w-10 shrink-0 text-right text-xs text-slate-500 tabular-nums">
          {formatSecondsToTimestamp(currentTime)} /{' '}
          {formatSecondsToTimestamp(duration)}
        </span>
      </div>
    </>
  );
};
