import { TrendingDown, TrendingUp, Check } from "lucide-react";
import { formatDuration } from "@/utils/helpers";
import { FillerStatsType } from "@/types/domain";
import { FillerStatCard } from "./FillerStatsCard";

type FillerStatsProps = {
  fillerStats: FillerStatsType;
  duration: number;
  previousSession: {
    fillerCount: number;
  } | null;
};

export const FillerStats = ({
  fillerStats,
  duration,
  previousSession,
}: FillerStatsProps) => {
  const { totalFillers, fillersPerMinute, topFillers } = fillerStats;

  const improvement = previousSession
    ? Math.round(
        ((previousSession.fillerCount - totalFillers) /
          previousSession.fillerCount) *
          100
      )
    : null;

  // Empty state - no fillers detected
  if (totalFillers === 0) {
    return (
      <div className="space-y-3">
        <div className="bg-linear-to-r from-green-500 to-emerald-500 rounded-xl p-6 text-white text-center">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8" />
          </div>
          <p className="text-2xl font-bold mb-1">Perfect! No filler words</p>
          <p className="text-green-100">
            You spoke clearly for {formatDuration(duration)}
          </p>
        </div>
      </div>
    );
  }

  const topFiller = topFillers[0];

  // Normal state - fillers detected
  return (
    <div className="space-y-3">
      <div className="bg-linear-to-r from-indigo-500 to-purple-500 rounded-xl p-5 text-white text-center">
        <p className="text-indigo-100 text-sm mb-1">
          Your most used filler word is
        </p>
        <p className="text-4xl font-bold">&quot;{topFiller.text}&quot;</p>
        {/* <p className="text-indigo-100 mt-1">
          It was used {topFiller.count} times
        </p> */}
      </div>

      <div className="grid grid-cols-3 gap-3">
        <FillerStatCard label="Total fillers" value={totalFillers} />
        <FillerStatCard
          label="Per minute"
          value={fillersPerMinute.toFixed(1)}
        />
        {improvement !== null ? (
          <FillerStatCard
            icon={improvement > 0 ? TrendingDown : TrendingUp}
            label={improvement > 0 ? "Improved" : "vs last"}
            value={`${Math.abs(improvement)}%`}
            variant={improvement > 0 ? "positive" : "negative"}
          />
        ) : (
          <FillerStatCard label="vs last" value="—" variant="muted" />
        )}
      </div>
    </div>
  );
};
