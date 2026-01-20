import { LucideIcon } from 'lucide-react';

import { Card } from '@/components/ui/Card';
import { cn } from '@/lib/utils';

type FillerStatCardProps = {
  value: string | number;
  label: string;
  icon?: LucideIcon;
  variant?: 'default' | 'positive' | 'negative' | 'muted';
};

const variantStyles = {
  default: 'text-slate-900',
  positive: 'text-green-600',
  negative: 'text-red-500',
  muted: 'text-slate-300',
};

export function FillerStatCard({
  value,
  label,
  icon: Icon,
  variant = 'default',
}: FillerStatCardProps) {
  return (
    <Card className="p-5 text-center">
      <p
        className={cn(
          'flex items-center justify-center gap-1 text-3xl font-bold',
          variantStyles[variant]
        )}
      >
        {Icon && <Icon className="h-5 w-5" />}
        {value}
      </p>
      <p className="mt-1 text-xs text-slate-500">{label}</p>
    </Card>
  );
}
