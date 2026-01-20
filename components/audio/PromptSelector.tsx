'use client';

import { Shuffle } from 'lucide-react';
import { useState, useEffect } from 'react';

import {
  practicePrompts,
  type PracticePrompt,
} from '@/lib/constants/practicePrompts';

type PromptSelectorProps = {
  className?: string;
};

const getRandomPrompt = () => {
  const randomIndex = Math.floor(Math.random() * practicePrompts.length);
  return practicePrompts[randomIndex];
};

export const PromptSelector = ({ className = '' }: PromptSelectorProps) => {
  const [selectedPrompt, setSelectedPrompt] = useState<PracticePrompt>(
    practicePrompts[0]
  );

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSelectedPrompt(getRandomPrompt());
  }, []);

  const handleShuffle = () => {
    const available = practicePrompts.filter((p) => p !== selectedPrompt);
    const randomIndex = Math.floor(Math.random() * available.length);
    setSelectedPrompt(available[randomIndex]);
  };

  return (
    <div className={`${className}`}>
      <p className="mb-2 text-center text-xs text-slate-400">
        Need inspiration? Try this prompt:
      </p>
      <div className="flex items-center justify-center gap-2 px-4">
        <p className="max-w-md flex-1 text-center text-xs leading-relaxed text-slate-500">
          {selectedPrompt}
        </p>
        <button
          aria-label="Get a different prompt"
          className="shrink-0 rounded-lg p-1.5 text-slate-400 transition-all hover:scale-105 hover:bg-slate-100 hover:text-slate-600"
          onClick={handleShuffle}
          title="Get a different prompt"
        >
          <Shuffle className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};
