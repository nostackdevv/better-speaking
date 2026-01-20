import { AlertCircle, Mic } from 'lucide-react';

import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

interface EmptyRecordingStateProps {
  onRetry: () => void;
}

export function EmptyRecordingState({ onRetry }: EmptyRecordingStateProps) {
  return (
    <div className="mx-auto max-w-2xl">
      <Card className="p-8 text-center">
        {/* Icon */}
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200">
          <AlertCircle className="h-10 w-10 text-slate-400" />
        </div>

        {/* Heading */}
        <h2 className="mb-3 text-2xl font-bold text-slate-900">
          No speech detected
        </h2>

        {/* Description */}
        <p className="mx-auto mb-6 max-w-md leading-relaxed text-slate-500">
          We couldn&apos;t detect any speech in your recording. This usually
          happens when:
        </p>

        {/* Reasons List */}
        <div className="mx-auto mb-8 max-w-md rounded-xl bg-slate-50 p-5">
          <div className="space-y-3 text-left">
            {[
              "The microphone wasn't working properly",
              'The audio was too quiet to pick up',
              'The recording was mostly silence',
            ].map((reason, i) => (
              <div className="flex items-start gap-3" key={i}>
                <div className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-slate-400" />
                <span className="text-sm text-slate-600">{reason}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <Button className="w-full sm:w-auto" onClick={onRetry} size="lg">
          <Mic className="h-5 w-5" />
          Try Recording Again
        </Button>

        {/* Help text */}
        <p className="mt-6 text-xs text-slate-400">
          Make sure to speak clearly into your microphone and check your audio
          settings
        </p>
      </Card>
    </div>
  );
}
