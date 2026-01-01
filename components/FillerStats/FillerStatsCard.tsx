import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

type FillerStatCardProps = {
  value: string | number;
  label: string;
  icon?: LucideIcon;
  variant?: "default" | "positive" | "negative" | "muted";
}

const variantStyles = {
  default: "text-gray-900",
  positive: "text-green-600",
  negative: "text-red-500",
  muted: "text-gray-400",
};

export function FillerStatCard({
  value,
  label,
  icon: Icon,
  variant = "default",
}: FillerStatCardProps) {
  return (
    <Card className="p-4 text-center">
      <p
        className={cn(
          "text-2xl font-bold flex items-center justify-center gap-1",
          variantStyles[variant]
        )}
      >
        {Icon && <Icon className="w-5 h-5" />}
        {value}
      </p>
      <p className="text-xs text-gray-500 mt-1">{label}</p>
    </Card>
  );
}
