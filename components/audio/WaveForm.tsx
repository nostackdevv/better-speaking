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
      aria-hidden="true"
      className="flex items-center justify-center gap-1 h-16 w-full mb-4"
    >
      {bars.map((height, i) => (
        <div
          className={cn(
            "w-1 rounded-full transition-all",
            isRecording ? "bg-orange-600" : "bg-slate-200"
          )}
          key={i}
          style={{
            height: `${isRecording ? height : 15 + Math.sin(i * 0.3) * 10}%`,
          }}
        />
      ))}
    </div>
  );
};
