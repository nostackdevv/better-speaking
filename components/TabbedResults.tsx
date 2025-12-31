import { Filler } from "@/schema/filler";
import type { FillerStatsType, NormalizedWord } from "@/types/domain";
import { useState } from "react";
import { CustomTabs } from "@/components/ui/CustomTabs";
import { Transcript } from "./Transcript/Transcript";
import { BreakdownTab } from "./BreakdownTab";
import { HistoryTab } from "./HistoryTab";

const TABS = [
  { id: "breakdown", label: "Breakdown" },
  { id: "transcript", label: "Transcript" },
  // { id: "history", label: "History" },
];

interface TabbedResultsProps {
  fillerStats: FillerStatsType;
  fillers: Filler[];
  onSeekAudio: (timestamp: number) => void;
  duration: number;
  transcriptText: string;
  words: NormalizedWord[];
}

export const TabbedResults = ({
  fillerStats,
  fillers,
  onSeekAudio,
  duration,
  transcriptText,
  words,
}: TabbedResultsProps) => {
  const [activeTab, setActiveTab] = useState("breakdown");

  return (
    <div>
      <CustomTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
        tabs={TABS}
      />

      {activeTab === "breakdown" && <BreakdownTab fillerStats={fillerStats} />}
      {activeTab === "transcript" && (
        <Transcript
          duration={duration}
          fillers={fillers}
          transcriptText={transcriptText}
          words={words}
        />
      )}
      {/* {activeTab === "history" && <HistoryTab />} */}
    </div>
  );
};
