import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import type { FillerStatsType } from "@/types/domain";

type BreakdownTabProps = {
  fillerStats: FillerStatsType;
}

export const BreakdownTab = ({ fillerStats }: BreakdownTabProps) => {
  const { fillerPercentage, topFillers, totalFillers } = fillerStats;
  const maxCount = topFillers[0]?.count ?? 0;

  return (
    <div className="space-y-4">
      <Card className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-600">Filler words were</span>
          <span className="text-lg font-bold text-amber-600">
            {fillerPercentage.toFixed(1)}%
          </span>
        </div>
        <ProgressBar value={fillerPercentage} />
        <p className="text-xs text-gray-400 mt-2">of your total speech</p>
      </Card>

      {totalFillers > 0 && (
        <Card className="overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100">
            <h3 className="font-semibold text-gray-900">Your filler words</h3>
          </div>

          <ul>
            {topFillers.map((filler, index) => (
              <li
                className="flex items-center gap-3 px-4 py-3 border-b border-gray-50 last:border-b-0"
                key={filler.text}
              >
                <span className="w-6 h-6 rounded-full bg-gray-100 text-xs font-semibold text-gray-500 flex items-center justify-center">
                  {index + 1}
                </span>
                <span className="flex-1 text-sm font-medium text-gray-800">
                  {filler.text}
                </span>
                <ProgressBar
                  className="w-24"
                  color="indigo"
                  max={maxCount}
                  size="sm"
                  value={filler.count}
                />
                <span className="w-10 text-sm font-bold text-gray-900 text-right">
                  {filler.count}×
                </span>
              </li>
            ))}
          </ul>
        </Card>
      )}

      {topFillers[0] && (
        <Card className="p-4 bg-amber-50 border-amber-200">
          <p className="text-sm text-amber-800">
            <span className="font-semibold">💡 Tip:</span> Try pausing instead
            of saying &quot;{topFillers[0].text}&quot;. A brief silence sounds
            more confident.
          </p>
        </Card>
      )}
    </div>
  );
};
