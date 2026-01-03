"use client";

import { useState } from "react";
import { Mic, Upload } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { AudioFileUpload } from "./AudioFileUpload";
import { AudioRecorder } from "./AudioRecorder";

export function AudioInput({
  isAnalyzing = false,
  onUpload,
}: {
  isAnalyzing?: boolean;
  onUpload?: (file: File | Blob) => void;
}) {
  const [mode, setMode] = useState<"record" | "upload">("record");

  const [selectedFile, setSelectedFile] = useState<File | Blob>();

  const handleAnalyze = (file: File | Blob) => {
    setSelectedFile(file);
    if (onUpload) {
      console.log("Selected file: onupload", file);
      onUpload(file);
    }
  };

  return (
    <Card className="p-6">
      {/* Mode Toggle */}
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
          onClick={() => setMode("record")}
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
          onClick={() => setMode("upload")}
          role="tab"
        >
          <Upload className="w-4 h-4" /> Upload
        </button>
      </div>

      {/* Record Mode */}
      {mode === "record" && <AudioRecorder isAnalyzing={isAnalyzing} onAnalyze={handleAnalyze} />}

      {/* Upload Mode */}
      {mode === "upload" && (
        <AudioFileUpload
          isAnalyzing={isAnalyzing}
          onAnalyze={handleAnalyze}
        />
      )}
    </Card>
  );
}
