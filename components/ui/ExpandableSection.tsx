import { ChevronDown, ChevronUp } from "lucide-react";
import React, { useState } from "react";

type ExpandableSectionProps = {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  id?: string;
};

export const ExpandableSection = ({
  title,
  children,
  defaultOpen = false,
  id,
}: ExpandableSectionProps) => {
  const [isOpen, setIsOpen] = useState(() => {
    if (typeof window !== "undefined" && id && window.location.hash === `#${id}`) {
      return true;
    }
    return defaultOpen;
  });

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsOpen(!isOpen);
    if (id) {
      window.history.replaceState(null, "", `#${id}`);
    }
  };

  const header = (
    <button
      className="w-full py-4 flex items-center justify-between text-left hover:bg-slate-50 px-4 -mx-4 rounded-lg transition-colors cursor-pointer"
      onClick={handleClick}
      type="button"
    >
      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      {isOpen ? (
        <ChevronUp className="w-5 h-5 text-slate-400" />
      ) : (
        <ChevronDown className="w-5 h-5 text-slate-400" />
      )}
    </button>
  );

  return (
    <div className="border-b border-slate-200 last:border-0 scroll-mt-4" id={id}>
      {id ? (
        <a className="block" href={`#${id}`} onClick={(e) => e.preventDefault()}>
          {header}
        </a>
      ) : (
        header
      )}
      {isOpen && (
        <div className="pb-6 text-slate-600 leading-relaxed">{children}</div>
      )}
    </div>
  );
};
