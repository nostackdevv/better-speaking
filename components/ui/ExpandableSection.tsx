import { ChevronDown, ChevronUp } from 'lucide-react';
import React, { useState } from 'react';

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
    if (
      typeof window !== 'undefined' &&
      id &&
      window.location.hash === `#${id}`
    ) {
      return true;
    }
    return defaultOpen;
  });

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsOpen(!isOpen);
    if (id) {
      window.history.replaceState(null, '', `#${id}`);
    }
  };

  const header = (
    <button
      className="-mx-4 flex w-full cursor-pointer items-center justify-between rounded-lg px-4 py-4 text-left transition-colors hover:bg-slate-50"
      onClick={handleClick}
      type="button"
    >
      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
      {isOpen ? (
        <ChevronUp className="h-5 w-5 text-slate-400" />
      ) : (
        <ChevronDown className="h-5 w-5 text-slate-400" />
      )}
    </button>
  );

  return (
    <div
      className="scroll-mt-4 border-b border-slate-200 last:border-0"
      id={id}
    >
      {id ? (
        <a
          className="block"
          href={`#${id}`}
          onClick={(e) => e.preventDefault()}
        >
          {header}
        </a>
      ) : (
        header
      )}
      {isOpen && (
        <div className="pb-6 leading-relaxed text-slate-600">{children}</div>
      )}
    </div>
  );
};
