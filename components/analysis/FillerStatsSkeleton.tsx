import { Card } from "@/components/ui/Card";

export const FillerStatsSkeleton = () => {
  return (
    <div className="space-y-3">
      {/* Clarity Score Card Skeleton */}
      <Card className="p-8 text-center bg-linear-to-br from-slate-900 to-slate-800 border-0">
        <p className="text-sm font-medium text-slate-400 mb-4">
          Detecting filler words...
        </p>
        <div className="h-20 w-28 bg-slate-700 rounded mx-auto mb-3 animate-pulse" />
        <div className="h-8 w-24 bg-slate-700 rounded-full mx-auto animate-pulse" />
      </Card>

      {/* Stats Grid Skeleton */}
      <div className="grid grid-cols-3 gap-3">
        {[1, 2, 3].map((i) => (
          <Card className="p-4 text-center animate-pulse" key={i}>
            <div className="h-8 w-12 bg-slate-200 rounded mx-auto mb-2" />
            <div className="h-3 w-16 bg-slate-200 rounded mx-auto" />
          </Card>
        ))}
      </div>
    </div>
  );
};
