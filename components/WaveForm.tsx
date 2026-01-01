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
      className="flex items-center justify-center gap-1 h-24 w-full mb-6"
      aria-hidden="true"
    >
      {bars.map((height, i) => (
        <div
          key={i}
          className={cn(
            "w-1.5 rounded-full transition-all",
            isRecording
              ? "bg-linear-to-t from-orange-500 to-rose-400"
              : "bg-slate-200"
          )}
          style={{
            height: `${isRecording ? height : 15 + Math.sin(i * 0.3) * 10}%`,
          }}
        />
      ))}
    </div>
  );
};
