"use client";

import { useState } from "react";
import { Zap, Crown, Shuffle, Target, MessageCircle, User } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

const questionPrompts = {
  interview: [
    "Tell me about yourself and your background.",
    "What's your greatest professional achievement?",
    "Describe a challenge you faced and how you overcame it.",
    "Where do you see yourself in five years?",
    "Why should we hire you for this position?",
    "Tell me about a time you failed and what you learned.",
    "What motivates you to do your best work?",
    "Describe your ideal work environment.",
  ],
  presentation: [
    "Explain a complex topic from your field to a beginner.",
    "Pitch a product idea in 60 seconds.",
    "Summarize the key points of a recent project.",
    "Introduce yourself to a new team.",
    "Explain why your idea deserves funding.",
    "Present the results of your latest work.",
  ],
  social: [
    "What's the most interesting thing you've learned recently?",
    "Describe your perfect weekend.",
    "What's a hobby you're passionate about and why?",
    "Tell a story about a memorable travel experience.",
    "What book or movie has influenced you the most?",
    "If you could have dinner with anyone, who would it be?",
  ],
  impromptu: [
    "What would you do if you won the lottery tomorrow?",
    "Argue for or against social media.",
    "What's the most important invention of the last century?",
    "If you could change one thing about the world, what would it be?",
    "Describe your dream job without naming it.",
    "What advice would you give to your younger self?",
  ],
};

type ChallengePromptsProps = {
  onSelectPrompt: (prompt: string) => void;
  onWaitlistClick?: () => void;
};

export function ChallengePrompts({ onSelectPrompt, onWaitlistClick }: ChallengePromptsProps) {
  const [activeCategory, setActiveCategory] = useState<keyof typeof questionPrompts>("interview");

  const categories = [
    { id: "interview" as const, label: "Interview", icon: Target },
    { id: "presentation" as const, label: "Presentation", icon: MessageCircle },
    { id: "social" as const, label: "Social", icon: User },
    { id: "impromptu" as const, label: "Impromptu", icon: Zap },
  ];

  const getRandomPrompt = (category: keyof typeof questionPrompts) => {
    const prompts = questionPrompts[category];
    return prompts[Math.floor(Math.random() * prompts.length)];
  };

  const handleGetPrompt = () => {
    const prompt = getRandomPrompt(activeCategory);
    onSelectPrompt(prompt);
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-8">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-bold text-slate-900 flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-500" />
              Challenge Mode
            </h3>
            <p className="text-sm text-slate-500">Practice with real-world prompts</p>
          </div>
          <button
            onClick={onWaitlistClick}
            className="flex items-center gap-1.5 hover:opacity-80 transition-opacity cursor-pointer"
          >
            <Badge variant="pro">
              <Crown className="w-3 h-3" /> Pro
            </Badge>
            <Badge variant="comingSoon" className="text-[10px]">
              SOON
            </Badge>
          </button>
        </div>

        {/* Category Tabs */}
        <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all cursor-pointer flex items-center gap-2",
                activeCategory === cat.id
                  ? "bg-slate-900 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              )}
            >
              <cat.icon className="w-4 h-4" />
              {cat.label}
            </button>
          ))}
        </div>

        {/* Prompt Preview */}
        <div className="bg-linear-to-r from-slate-50 to-slate-100/50 rounded-xl p-4 mb-4">
          <p className="text-slate-700 font-medium">
            &quot;{questionPrompts[activeCategory][0]}&quot;
          </p>
        </div>

        {/* Action */}
        <Button variant="accent" className="w-full" onClick={handleGetPrompt}>
          <Shuffle className="w-4 h-4" />
          Get Random Prompt & Record
        </Button>
      </Card>
    </div>
  );
}
