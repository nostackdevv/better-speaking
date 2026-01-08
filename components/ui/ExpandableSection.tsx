import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

type ExpandableSectionProps = {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
};

export const ExpandableSection = ({
  title,
  children,
  defaultOpen = false,
}: ExpandableSectionProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-slate-200 last:border-0">
      <button
        className="w-full py-4 flex items-center justify-between text-left hover:bg-slate-50 px-4 -mx-4 rounded-lg transition-colors cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-slate-400" />
        ) : (
          <ChevronDown className="w-5 h-5 text-slate-400" />
        )}
      </button>
      {isOpen && (
        <div className="pb-6 text-slate-600 leading-relaxed">{children}</div>
      )}
    </div>
  );
};
