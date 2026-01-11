import { AlertCircle, Mic } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

interface EmptyRecordingStateProps {
  onRetry: () => void;
}

export function EmptyRecordingState({ onRetry }: EmptyRecordingStateProps) {
  return (
    <div className="max-w-2xl mx-auto">
      <Card className="p-8 text-center">
        {/* Icon */}
        <div className="w-20 h-20 bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <AlertCircle className="w-10 h-10 text-slate-400" />
        </div>

        {/* Heading */}
        <h2 className="text-2xl font-bold text-slate-900 mb-3">
          No speech detected
        </h2>

        {/* Description */}
        <p className="text-slate-500 mb-6 max-w-md mx-auto leading-relaxed">
          We couldn&apos;t detect any speech in your recording. This usually
          happens when:
        </p>

        {/* Reasons List */}
        <div className="bg-slate-50 rounded-xl p-5 mb-8 max-w-md mx-auto">
          <div className="space-y-3 text-left">
            {[
              "The microphone wasn't working properly",
              "The audio was too quiet to pick up",
              "The recording was mostly silence",
            ].map((reason, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2 flex-shrink-0" />
                <span className="text-slate-600 text-sm">{reason}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <Button onClick={onRetry} size="lg" className="w-full sm:w-auto">
          <Mic className="w-5 h-5" />
          Try Recording Again
        </Button>

        {/* Help text */}
        <p className="text-xs text-slate-400 mt-6">
          Make sure to speak clearly into your microphone and check your audio
          settings
        </p>
      </Card>
    </div>
  );
}
