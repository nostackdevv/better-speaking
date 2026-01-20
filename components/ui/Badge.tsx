import { cn } from '@/lib/utils';

type BadgeProps = {
  children: React.ReactNode;
  variant?:
    | 'default'
    | 'primary'
    | 'accent'
    | 'success'
    | 'warning'
    | 'pro'
    | 'comingSoon';
  className?: string;
};

export function Badge({
  children,
  variant = 'default',
  className = '',
}: BadgeProps) {
  const variants = {
    default: 'bg-slate-100 text-slate-600',
    primary: 'bg-orange-100 text-orange-700',
    accent: 'bg-teal-100 text-teal-700',
    success: 'bg-green-100 text-green-700',
    warning: 'bg-amber-100 text-amber-700',
    pro: 'bg-linear-to-r from-amber-400 to-orange-400 text-white',
    comingSoon: 'bg-slate-800 text-slate-200',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
