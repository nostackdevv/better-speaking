import { useRef, useState, useCallback, RefObject } from "react";

type AudioPlayerState = {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  isLoading: boolean;
  error: string | null;
};

type AudioProps = {
  ref: RefObject<HTMLAudioElement | null>;
  onLoadedMetadata: (e: React.SyntheticEvent<HTMLAudioElement>) => void;
  onTimeUpdate: (e: React.SyntheticEvent<HTMLAudioElement>) => void;
  onEnded: () => void;
  onError: (e: React.SyntheticEvent<HTMLAudioElement>) => void;
  onPlay: () => void;
  onPause: () => void;
};

type UseAudioPlayerReturn = AudioPlayerState & {
  audioProps: AudioProps;
  play: () => void;
  pause: () => void;
  toggle: () => void;
  seek: (time: number) => void;
};

export const useAudioPlayer = (): UseAudioPlayerReturn => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [state, setState] = useState<AudioPlayerState>({
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    isLoading: true,
    error: null,
  });

  const handleLoadedMetadata = useCallback(
    (e: React.SyntheticEvent<HTMLAudioElement>) => {
      const audio = e.currentTarget;
      if (!audio) return;

      setState((prev) => ({
        ...prev,
        duration: audio.duration,
        isLoading: false,
      }));
    },
    []
  );

  const handleTimeUpdate = useCallback(
    (e: React.SyntheticEvent<HTMLAudioElement>) => {
      const audio = e.currentTarget;
      if (!audio) return;

      setState((prev) => ({
        ...prev,
        currentTime: audio.currentTime,
      }));
    },
    []
  );

  const handleEnded = useCallback(() => {
    setState((prev) => ({
      ...prev,
      isPlaying: false,
      currentTime: 0,
    }));
  }, []);

  const handleError = useCallback(
    (e: React.SyntheticEvent<HTMLAudioElement>) => {
      const audio = e.currentTarget;
      const errorMessage = audio?.error?.message || "Failed to load audio";

      console.error("Audio error:", audio?.error);

      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }));
    },
    []
  );

  const handlePlay = useCallback(() => {
    setState((prev) => ({ ...prev, isPlaying: true }));
  }, []);

  const handlePause = useCallback(() => {
    setState((prev) => ({ ...prev, isPlaying: false }));
  }, []);

  const play = useCallback(() => {
    audioRef.current?.play();
  }, []);

  const pause = useCallback(() => {
    audioRef.current?.pause();
  }, []);

  const toggle = useCallback(() => {
    if (state.isPlaying) {
      pause();
    } else {
      play();
    }
  }, [state.isPlaying, play, pause]);

  const seek = useCallback((time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  }, []);

  const audioProps: AudioProps = {
    ref: audioRef,
    onLoadedMetadata: handleLoadedMetadata,
    onTimeUpdate: handleTimeUpdate,
    onEnded: handleEnded,
    onError: handleError,
    onPlay: handlePlay,
    onPause: handlePause,
  };

  return {
    ...state,
    audioProps,
    play,
    pause,
    toggle,
    seek,
  };
};
