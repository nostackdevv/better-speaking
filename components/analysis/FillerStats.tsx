import { Check } from "lucide-react";

import { Card } from "@/components/ui/Card";
import { getArchetype } from "@/constants/archetypes";
import { FillerStatsType, ClarityResult } from "@/types/domain";

import { FillerStatCard } from "./FillerStatsCard";

type FillerStatsProps = {
  fillerStats: FillerStatsType;
  clarityScore: ClarityResult | null;
};

export const FillerStats = ({
  fillerStats,
  clarityScore,
}: FillerStatsProps) => {
  const { totalFillers, fillersPerMinute } = fillerStats;

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

  // Normal state - fillers detected
  return (
    <div className="space-y-3">
      {/* Clarity Score Card */}
      {clarityScore && (
        <Card className="p-8 text-center bg-linear-to-br from-slate-900 to-slate-800 border-0">
          <p className="text-sm font-medium text-slate-400 uppercase tracking-wide mb-2">
            Clarity Score (100)
          </p>
          <p className="text-7xl font-bold text-white mb-3">
            {clarityScore.score}
          </p>
          <div
            className="inline-flex px-4 py-1.5 rounded-full text-sm font-semibold"
            style={{
              backgroundColor: getArchetype(clarityScore.score).color,
              color: "#fff",
            }}
          >
            {getArchetype(clarityScore.score).label}
          </div>
        </Card>
      )}

      <div className="grid grid-cols-3 gap-3">
        <FillerStatCard label="Total fillers" value={totalFillers} />
        <FillerStatCard
          label="Fillers per minute"
          value={Math.round(fillersPerMinute)}
        />
        <FillerStatCard label="Total words" value={fillerStats.totalWords} />
      </div>
    </div>
  );
};
