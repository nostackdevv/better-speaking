import { TrendingDown, TrendingUp, Check } from "lucide-react";
import { FillerStatsType, ClarityResult } from "@/types/domain";
import { FillerStatCard } from "./FillerStatsCard";
import { Card } from "@/components/ui/Card";

type FillerStatsProps = {
  fillerStats: FillerStatsType;
  clarityScore: ClarityResult | null;
  duration: number;
  previousSession: {
    fillerCount: number;
  } | null;
};

export const FillerStats = ({
  fillerStats,
  clarityScore,
  previousSession,
}: FillerStatsProps) => {
  const { totalFillers, fillersPerMinute } = fillerStats;

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
        <div className="bg-linear-to-br from-green-500 to-emerald-500 rounded-2xl p-8 text-white text-center border-0 shadow-lg">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-10 h-10" />
          </div>
          <h2 className="text-3xl font-bold mb-2">Perfect!</h2>
          <p className="text-green-100 text-lg">
            No filler words detected in your speech
          </p>
        </div>
      </div>
    );
  }

  // const topFiller = topFillers[0];

  // Grade color mapping
  const gradeColors = {
    A: "#22c55e",
    B: "#3b82f6",
    C: "#eab308",
    D: "#f97316",
    F: "#ef4444",
  };

  // Grade label mapping
  const gradeLabels = {
    A: "Excellent",
    B: "Clear",
    C: "Good",
    D: "Fair",
    F: "Keep Practicing",
  };

  // Normal state - fillers detected
  return (
    <div className="space-y-3">
      {/* Clarity Score Card */}
      {clarityScore && (
        <Card className="p-8 text-center bg-linear-to-br from-slate-900 to-slate-800 border-0">
          <p className="text-sm font-medium text-slate-400 uppercase tracking-wide mb-2">
            Clarity Score (out of 100)
          </p>
          <p className="text-7xl font-bold text-white mb-3">
            {clarityScore.score}
          </p>
          <div
            className="inline-flex px-4 py-1.5 rounded-full text-sm font-semibold"
            style={{
              backgroundColor: gradeColors[clarityScore.grade],
              color: "#fff",
            }}
          >
            {clarityScore.grade} · {gradeLabels[clarityScore.grade]}
          </div>
        </Card>
      )}

      {/* Old Top Filler Card - Commented Out */}
      {/* <div className="bg-linear-to-br from-orange-500 via-rose-500 to-pink-500 rounded-2xl p-8 text-white text-center border-0 shadow-lg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32" />
        <div className="relative">
          <p className="text-orange-200 mb-2">Your top filler word</p>
          <h2 className="text-5xl font-bold mb-2">
            &quot;{topFiller.text}&quot;
          </h2>
          <p className="text-orange-100 text-lg">
            was used {topFiller.count} time{topFiller.count !== 1 ? "s" : ""}
          </p>
        </div>
      </div> */}

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
