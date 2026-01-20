import { cn } from '@/lib/utils';
import { formatDuration } from '@/utils/formatters';

interface Session {
  date: string;
  duration: number;
  fillerCount: number;
  fillersPerMin: number;
  trend: number;
}

type SessionItemProps = {
  session: Session;
  showBorder?: boolean;
};

export const SessionItem = ({
  session,
  showBorder = true,
}: SessionItemProps) => {
  const isImproved = session.trend < 0;

  return (
    <div
      className={cn(
        'flex items-center justify-between px-4 py-3',
        showBorder && 'border-b border-gray-100'
      )}
    >
      <div className="flex items-center gap-3">
        <div
          className={cn(
            'flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold',
            isImproved
              ? 'bg-green-100 text-green-600'
              : 'bg-red-100 text-red-500'
          )}
        >
          {isImproved ? '↓' : '↑'}
        </div>
        <div>
          <p className="text-sm font-medium text-gray-900">{session.date}</p>
          <p className="text-xs text-gray-500">
            {formatDuration(session.duration)}
          </p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-sm font-bold text-gray-900">
          {session.fillerCount} fillers
        </p>
        <p className="text-xs text-gray-500">{session.fillersPerMin}/min</p>
      </div>
    </div>
  );
};
