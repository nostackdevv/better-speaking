"use client";

import { Shuffle } from "lucide-react";
import { practicePrompts, type PracticePrompt } from "@/lib/constants/practicePrompts";
import { useState } from "react";

type PromptSelectorProps = {
  className?: string;
};

const getRandomPrompt = () => {
  const randomIndex = Math.floor(Math.random() * practicePrompts.length);
  return practicePrompts[randomIndex];
};

export const PromptSelector = ({ className = "" }: PromptSelectorProps) => {
  const [selectedPrompt, setSelectedPrompt] = useState<PracticePrompt>(getRandomPrompt);

  const getNextPrompt = () => {
    const available = practicePrompts.filter((p) => p !== selectedPrompt);
    const randomIndex = Math.floor(Math.random() * available.length);
    return available[randomIndex];
  };

  const handleShuffle = () => {
    setSelectedPrompt(getRandomPrompt());
  };

  return (
    <div className={`${className}`}>
      <p className="text-xs text-slate-400 text-center mb-2">
        Need inspiration? Try this prompt:
      </p>
      <div className="flex items-center justify-center gap-2 px-4">
        <p className="text-slate-500 text-center text-xs leading-relaxed flex-1 max-w-md">
          {selectedPrompt}
        </p>
        <button
          onClick={handleShuffle}
          className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all hover:scale-105 shrink-0"
          title="Get a different prompt"
          aria-label="Get a different prompt"
        >
          <Shuffle className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
