import { MessageCircle, Shuffle } from "lucide-react";
import { Card } from "@/components/ui/Card";

type PromptCardProps = {
  prompt: string;
  onNewPrompt: () => void;
};

export function PromptCard({ prompt, onNewPrompt }: PromptCardProps) {
  return (
    <Card className="mb-6 p-5 bg-linear-to-r from-slate-50 to-slate-100/50 border-slate-200">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-teal-100 flex items-center justify-center flex-shrink-0">
            <MessageCircle className="w-5 h-5 text-teal-600" />
          </div>
          <div>
            <p className="text-xs font-medium text-teal-600 uppercase tracking-wide mb-1">
              Your Prompt
            </p>
            <p className="text-lg font-medium text-slate-800">{prompt}</p>
          </div>
        </div>
        <button
          onClick={onNewPrompt}
          className="p-2 text-slate-400 hover:text-slate-600 hover:bg-white rounded-lg transition-colors cursor-pointer"
          title="New prompt"
        >
          <Shuffle className="w-5 h-5" />
        </button>
      </div>
    </Card>
  );
}
