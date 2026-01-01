import React, { useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { Upload, FileAudio, Trash } from "lucide-react";
import { formatBytesToSize } from "@/utils/formatters";
import {
  validateClientAudioFile,
  MAX_FILE_SIZE,
} from "@/utils/audio/validators";
import { Button } from "@/components/ui/Button";
import { AudioItemCard } from "@/components/ui/AudioItemCard";

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
        <AudioItemCard
          icon={FileAudio}
          onRemove={handleDeleteAudio}
          removeIcon={Trash}
          removeLabel="Delete audio file"
          subtitle={formatBytesToSize(selectedFile.size)}
          title={selectedFile.name}
          truncateTitle
        />
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
          "group flex flex-col items-center py-16 px-8 border-2 border-dashed rounded-2xl cursor-pointer transition-all",
          "border-slate-300 hover:border-orange-400 hover:bg-orange-50/30"
        )}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
      >
        <div className="w-20 h-20 rounded-2xl bg-slate-100 group-hover:bg-orange-100 flex items-center justify-center mb-4 transition-colors">
          <Upload
            aria-hidden="true"
            className="w-10 h-10 text-slate-400 group-hover:text-orange-500 transition-colors"
          />
        </div>
        <p className="font-semibold text-slate-700 mb-1 text-lg">Drop your audio file here</p>
        <p className="text-slate-500 mb-4">or click to browse</p>
        <p className="text-xs text-slate-400 bg-white px-3 py-1.5 rounded-full border border-slate-200">
          MP3, WAV, M4A • Max 10MB
        </p>

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
