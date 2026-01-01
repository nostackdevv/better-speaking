"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { AudioFileUpload } from "./AudioFileUpload";
import { AudioRecorder } from "./AudioRecorder";

export function AudioInput({
  onUpload,
}: {
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
    <Card className="p-5">
      {/* Mode Toggle */}
      <div
        aria-label="Audio input method"
        className="flex gap-2 mb-5"
        role="tablist"
      >
        <button
          aria-selected={mode === "record"}
          className={`flex-1 cursor-pointer px-4 py-2.5 text-sm font-medium rounded-xl border-2 transition-all ${
            mode === "record"
              ? "bg-slate-900 border-slate-900 text-white shadow-sm"
              : "bg-white border-slate-200 text-slate-500 hover:bg-slate-50 hover:border-slate-300"
          }`}
          onClick={() => setMode("record")}
          role="tab"
        >
          Record Audio
        </button>
        <button
          aria-selected={mode === "upload"}
          className={`flex-1 cursor-pointer px-4 py-2.5 text-sm font-medium rounded-xl border-2 transition-all ${
            mode === "upload"
              ? "bg-slate-900 border-slate-900 text-white shadow-sm"
              : "bg-white border-slate-200 text-slate-500 hover:bg-slate-50 hover:border-slate-300"
          }`}
          onClick={() => setMode("upload")}
          role="tab"
        >
          Upload File
        </button>
      </div>

      {/* Record Mode */}
      {mode === "record" && <AudioRecorder onAnalyze={handleAnalyze} />}

      {/* Upload Mode */}
      {mode === "upload" && (
        <AudioFileUpload
          onAnalyze={handleAnalyze}
        />
      )}
    </Card>
  );
}
