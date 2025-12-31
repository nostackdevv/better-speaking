import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

type WaveformProps = {
  isRecording: boolean;
  barCount?: number;
};

export const WaveForm = ({ isRecording, barCount = 32 }: WaveformProps) => {
  const [bars, setBars] = useState(() =>
    Array.from({ length: barCount }, () => Math.random() * 50 + 10)
  );

  useEffect(() => {
    if (!isRecording) return;

    const interval = setInterval(() => {
      setBars(Array.from({ length: barCount }, () => Math.random() * 50 + 10));
    }, 100);

    return () => clearInterval(interval);
  }, [isRecording, barCount]);

  return (
    <div
      className="flex items-center justify-center gap-1 h-16 w-full"
      aria-hidden="true"
    >
      {bars.map((height, i) => (
        <div
          key={i}
          className={cn(
            "w-1 bg-indigo-500 rounded-sm transition-all duration-100",
            isRecording ? "opacity-100" : "opacity-25"
          )}
          style={{ height: `${height}%` }}
        />
      ))}
    </div>
  );
};
