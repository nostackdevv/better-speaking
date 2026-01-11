import { Filler } from "@/schema/filler";
import type { FillerStatsType, NormalizedWord } from "@/types/domain";
import { useEffect, useState } from "react";
import { CustomTabs } from "@/components/ui/CustomTabs";
import { Transcript } from "@/components/transcription/Transcript";
import { BreakdownTab } from "./BreakdownTab";
import { HistoryTab } from "@/components/history/HistoryTab";

const TABS = [
  { id: "breakdown", label: "Breakdown" },
  { id: "transcript", label: "Transcript" },
  // { id: "history", label: "History" },
];

type TabbedResultsProps = {
  fillerStats: FillerStatsType;
  fillers: Filler[];
  onSeekAudio: (timestamp: number) => void;
  duration: number;
  transcriptText: string;
  words: NormalizedWord[];
  audioSrc?: string | Blob | File;
};

export const TabbedResults = ({
  fillerStats,
  fillers,
  onSeekAudio,
  duration,
  transcriptText,
  words,
  audioSrc,
}: TabbedResultsProps) => {
  const [activeTab, setActiveTab] = useState("transcript");

  useEffect(() => {
    if (fillerStats.totalFillers > 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setActiveTab("breakdown");
    }
  }, [fillerStats]);

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
          audioSrc={audioSrc}
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
