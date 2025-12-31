import { cn } from "@/lib/utils";

type FillerHighlightProps = {
  children: React.ReactNode;
  className?: string;
};

export const FillerHighlight = ({
  children,
  className = "",
}: FillerHighlightProps) => {
  return (
    <mark
      className={cn(
        "bg-yellow-200 text-yellow-900 px-1 rounded font-medium",
        className
      )}
    >
      <span>{children} </span>
    </mark>
  );
};
