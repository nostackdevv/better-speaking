import { cn } from "@/lib/utils";

type ProgressBarProps = {
  value: number;
  max?: number;
  color?: "amber" | "indigo";
  className?: string;
  size?: "sm" | "md";
}

export const ProgressBar = ({
  value,
  max = 100,
  color = "amber",
  className,
  size = "md",
}: ProgressBarProps) => {
  const percentage = (value / max) * 100;
  const colors = {
    amber: "bg-amber-500",
    indigo: "bg-indigo-500",
  };
  const sizes = {
    sm: "h-1.5",
    md: "h-2",
  };

  return (
    <div
      className={cn(
        "bg-gray-100 rounded-full overflow-hidden",
        sizes[size],
        className
      )}
    >
      <div
        className={cn("h-full rounded-full transition-all", colors[color])}
        style={{ width: `${Math.min(percentage, 100)}%` }}
      />
    </div>
  );
};
