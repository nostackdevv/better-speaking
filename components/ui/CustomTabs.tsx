import { cn } from "@/lib/utils";

interface Tab {
  id: string;
  label: string;
}

interface CustomTabsProps {
  activeTab: string;
  onTabChange: (id: string) => void;
  tabs: Tab[];
}

export const CustomTabs = ({
  activeTab,
  onTabChange,
  tabs,
}: CustomTabsProps) => {
  return (
    <div className="flex border-b border-gray-200 mb-4">
      {tabs.map((tab) => (
        <button
          className={cn(
            "flex-1 py-3 text-sm font-medium transition-colors cursor-pointer relative",
            activeTab === tab.id
              ? "text-gray-900"
              : "text-gray-500 hover:text-gray-700"
          )}
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
        >
          {tab.label}
          {activeTab === tab.id && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900" />
          )}
        </button>
      ))}
    </div>
  );
};
