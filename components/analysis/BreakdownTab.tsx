import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import type { FillerStatsType } from "@/types/domain";

type BreakdownTabProps = {
  fillerStats: FillerStatsType;
};

export const BreakdownTab = ({ fillerStats }: BreakdownTabProps) => {
  const { fillerPercentage, topFillers, totalFillers } = fillerStats;
  const maxCount = topFillers[0]?.count ?? 0;

  const mostUsedFiller = topFillers[0]?.text;

  return (
    <div className="space-y-4">
      {mostUsedFiller && (
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
          <p className="text-slate-700 leading-relaxed">
            Watch out for{" "}
            <span className="px-2 py-0.5 bg-orange-100 text-orange-700 rounded font-semibold">
              {mostUsedFiller}
            </span>{" "}
            — it&apos;s your most common filler.
            <span className="font-semibold text-slate-900">
              {" "}
              {fillerPercentage.toFixed(1)}%
            </span>{" "}
            of your total words were fillers
          </p>
        </div>
      )}

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
