import { Card } from '@/components/ui/Card';

export const FillerStatsSkeleton = () => {
  return (
    <div className="space-y-3">
      {/* Clarity Score Card Skeleton */}
      <Card className="border-0 bg-linear-to-br from-slate-900 to-slate-800 p-8 text-center">
        <p className="mb-4 text-sm font-medium text-slate-400">
          Detecting filler words...
        </p>
        <div className="mx-auto mb-3 h-20 w-28 animate-pulse rounded bg-slate-700" />
        <div className="mx-auto h-8 w-24 animate-pulse rounded-full bg-slate-700" />
      </Card>

      {/* Stats Grid Skeleton */}
      <div className="grid grid-cols-3 gap-3">
        {[1, 2, 3].map((i) => (
          <Card className="animate-pulse p-4 text-center" key={i}>
            <div className="mx-auto mb-2 h-8 w-12 rounded bg-slate-200" />
            <div className="mx-auto h-3 w-16 rounded bg-slate-200" />
          </Card>
        ))}
      </div>
    </div>
  );
};
