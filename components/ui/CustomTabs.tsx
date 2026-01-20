import { cn } from '@/lib/utils';

interface Tab {
  id: string;
  label: string;
}

type CustomTabsProps = {
  activeTab: string;
  onTabChange: (id: string) => void;
  tabs: Tab[];
};

export const CustomTabs = ({
  activeTab,
  onTabChange,
  tabs,
}: CustomTabsProps) => {
  return (
    <div className="mb-4 flex border-b border-slate-100">
      {tabs.map((tab) => (
        <button
          className={cn(
            'relative flex-1 cursor-pointer py-4 text-sm font-medium transition-colors',
            activeTab === tab.id
              ? 'text-slate-900'
              : 'text-slate-500 hover:text-slate-700'
          )}
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
        >
          {tab.label}
          {activeTab === tab.id && (
            <span className="absolute right-0 bottom-0 left-0 h-0.5 bg-orange-500" />
          )}
        </button>
      ))}
    </div>
  );
};
