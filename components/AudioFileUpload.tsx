import React, { useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { Upload, FileAudio, Trash } from "lucide-react";
import { formatBytesToSize } from "@/utils/formatters";
import {
  validateClientAudioFile,
  MAX_FILE_SIZE,
} from "@/utils/audio/validators";
import { Button } from "@/components/ui/Button";

type AudioFileUploadProps = {
  onAnalyze?: (file: File) => void;
  accept?: string;
  maxSize?: number;
}

export function AudioFileUpload({
  onAnalyze,
  accept = ".mp3,.wav,.m4a",
  maxSize = MAX_FILE_SIZE,
}: AudioFileUploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleAudioFileUpload = (file: File) => {
    const validationError = validateClientAudioFile(file, maxSize);
    if (validationError) {
      setError(validationError);
      return;
    }
    setError(null);
    setSelectedFile(file);
  };

  const handleDeleteAudio = () => {
    setSelectedFile(null);
    setError(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleAudioFileUpload(file);
    }
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick();
    }
  };

  if (selectedFile) {
    return (
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3 p-4 bg-gray-50 border border-gray-200 rounded-lg">
          <div className="flex items-center justify-center w-10 h-10 bg-indigo-100 rounded-lg">
            <FileAudio aria-hidden="true" className="w-5 h-5 text-indigo-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {selectedFile.name}
            </p>
            <p className="text-xs text-gray-500">
              {formatBytesToSize(selectedFile.size)}
            </p>
          </div>
          <button
            aria-label="Delete audio file"
            className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded-md transition-colors cursor-pointer"
            onClick={handleDeleteAudio}
            type="button"
          >
            <Trash className="w-4 h-4" />
          </button>
        </div>
        <Button onClick={() => onAnalyze?.(selectedFile)}>
          Analyze Recording
        </Button>
      </div>
    );
  }

  return (
    <div>
      <div
        aria-label="Upload audio file"
        className={cn(
          "flex flex-col items-center p-8 border-2 border-dashed rounded-lg cursor-pointer transition-colors",
          "border-gray-300 hover:border-gray-400"
        )}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
      >
        <Upload
          aria-hidden="true"
          className={cn("w-10 h-10 mb-3 transition-colors", "text-gray-400")}
        />
        <p className="font-medium text-gray-700">Drop your audio file here </p>
        <p className="text-sm text-gray-500 mt-1">or click to browse</p>
        <p className="text-xs text-gray-400 mt-3">MP3, WAV, M4A • Max 10MB</p>

        <input
          accept={accept}
          aria-hidden="true"
          className="hidden"
          onChange={handleInputChange}
          ref={inputRef}
          type="file"
        />
      </div>

      {error && (
        <p className="text-sm text-red-500 mt-2" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
