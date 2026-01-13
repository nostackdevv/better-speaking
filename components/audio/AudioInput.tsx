"use client";

import { useState } from "react";
import { Mic, Upload } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { AudioFileUpload } from "./AudioFileUpload";
import { AudioRecorder } from "./AudioRecorder";
import Link from "next/link";
import { AnalyticsContextProvider, useAnalyticsContext } from "@/lib/analytics";

export function AudioInput({
  isAnalyzing = false,
  onUpload,
}: {
  isAnalyzing?: boolean;
  onUpload?: (file: File | Blob) => void;
}) {
  const { track } = useAnalyticsContext();
  const [mode, setMode] = useState<"record" | "upload">("record");

  const handleModeChange = (newMode: "record" | "upload") => {
    if (newMode !== mode) {
      track((inherited) => ({
        name: "mode_switched",
        properties: {
          ...inherited,
          from: mode,
          to: newMode,
        },
      }));
      setMode(newMode);
    }
  };

  const handleAnalyze = (file: File | Blob) => {
    if (onUpload) {
      onUpload(file);
    }
  };

  return (
    <AnalyticsContextProvider
      getProperties={(inherited) => ({
        ...inherited,
        source: [...(inherited.source ?? []), "Audio Input"],
      })}
    >
      <Card className="p-6">
        <div
          aria-label="Audio input method"
          className="flex gap-2 mb-6 bg-slate-100 p-1.5 rounded-xl max-w-xs mx-auto"
          role="tablist"
        >
          <button
            aria-selected={mode === "record"}
            className={`flex-1 cursor-pointer px-4 py-2 text-sm font-semibold rounded-lg transition-all flex items-center justify-center gap-2 ${
              mode === "record"
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            }`}
            onClick={() => handleModeChange("record")}
            role="tab"
          >
            <Mic className="w-4 h-4" /> Record
          </button>
          <button
            aria-selected={mode === "upload"}
            className={`flex-1 cursor-pointer px-4 py-2 text-sm font-semibold rounded-lg transition-all flex items-center justify-center gap-2 ${
              mode === "upload"
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            }`}
            onClick={() => handleModeChange("upload")}
            role="tab"
          >
            <Upload className="w-4 h-4" /> Upload
          </button>
        </div>

        {mode === "record" && (
          <AudioRecorder isAnalyzing={isAnalyzing} onAnalyze={handleAnalyze} />
        )}

        {mode === "upload" && (
          <AudioFileUpload isAnalyzing={isAnalyzing} onAnalyze={handleAnalyze} />
        )}
        <div className="text-xs text-slate-500 text-center space-y-0.5 mt-3">
          <p>Your audio is processed securely and never stored.</p>
          <p>
            <Link
              className="text-orange-500 hover:underline font-medium"
              href="/legal/privacy"
            >
              Learn how we protect your privacy
            </Link>
          </p>
        </div>
      </Card>
    </AnalyticsContextProvider>
  );
}
