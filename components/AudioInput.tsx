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
          className={`flex-1 cursor-pointer px-4 py-2.5 text-sm font-medium rounded-lg border transition-colors ${
            mode === "record"
              ? "bg-gray-900 border-gray-900 text-white"
              : "bg-white border-gray-200 text-gray-500 hover:bg-gray-50"
          }`}
          onClick={() => setMode("record")}
          role="tab"
        >
          Record Audio
        </button>
        <button
          aria-selected={mode === "upload"}
          className={`flex-1 cursor-pointer px-4 py-2.5 text-sm font-medium rounded-lg border transition-colors ${
            mode === "upload"
              ? "bg-gray-900 border-gray-900 text-white"
              : "bg-white border-gray-200 text-gray-500 hover:bg-gray-50"
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
