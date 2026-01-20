import { Check } from 'lucide-react';

import { Card } from '@/components/ui/Card';
import { getArchetype } from '@/constants/archetypes';
import { FillerStatsType, ClarityResult } from '@/types/domain';

import { FillerStatCard } from './FillerStatsCard';

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
        <div className="rounded-2xl border-0 bg-linear-to-br from-green-500 to-emerald-500 p-8 text-center text-white shadow-lg">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-white/20">
            <Check className="h-10 w-10" />
          </div>
          <h2 className="mb-2 text-3xl font-bold">Perfect!</h2>
          <p className="text-lg text-green-100">
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
        <Card className="border-0 bg-linear-to-br from-slate-900 to-slate-800 p-8 text-center">
          <p className="mb-2 text-sm font-medium tracking-wide text-slate-400 uppercase">
            Clarity Score (100)
          </p>
          <p className="mb-3 text-7xl font-bold text-white">
            {clarityScore.score}
          </p>
          <div
            className="inline-flex rounded-full px-4 py-1.5 text-sm font-semibold"
            style={{
              backgroundColor: getArchetype(clarityScore.score).color,
              color: '#fff',
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
