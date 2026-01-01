"use client";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AudioInput } from "@/components/AudioInput";
import { Navbar } from "@/components/Navbar";

import { useState } from "react";
import { useTranscribeAudio } from "@/hooks/queries/useTranscribeAudio";
import { FillerStats } from "@/components/FillerStats/FillerStats";
import { Button } from "@/components/ui/Button";
import { Share2 } from "lucide-react";
import { TabbedResults } from "@/components/TabbedResults";
import { AudioPlayer } from "@/components/ui/AudioPlayer";
import { ConfirmModal } from "@/components/ui/ConfirmModal";

export default function Home() {
  const [audioFile, setAudioFile] = useState<File | Blob>();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const {
    mutate: transcribeAudio,
    isPending: isTranscribing,
    data: transcriptResponse,
    reset: resetTranscription,
  } = useTranscribeAudio();

  const mockUser = {
    name: "Sam",
    streak: 7,
    plan: "free" as const,
  };

  const handleUpload = async (file: File | Blob) => {
    if (!file) return;
    setAudioFile(file);
    transcribeAudio(file, {
      onSuccess: () => {},
    });
  };

  const handleTryAgain = () => {
    setShowConfirmModal(true);
  };

  const handleConfirmReset = () => {
    setShowConfirmModal(false);
    setAudioFile(undefined);
    resetTranscription();
  };

  const handleCancelReset = () => {
    setShowConfirmModal(false);
  };

  const handleHistoryClick = () => {
    console.log("History clicked");
  };

  const handleUpgradeClick = () => {
    console.log("Upgrade clicked");
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 to-slate-100">
      <Navbar
        user={mockUser}
        onHistoryClick={handleHistoryClick}
        onUpgradeClick={handleUpgradeClick}
      />

      <div className="max-w-xl mx-auto px-4 pt-24 pb-12">
        <Header />

        <main>
          {!transcriptResponse && <AudioInput onUpload={handleUpload} />}
          {transcriptResponse && (
            <>
              <div className="pb-32">
                <FillerStats
                  duration={transcriptResponse.duration}
                  fillerStats={transcriptResponse.fillerStats}
                  previousSession={null}
                />

                {/* Action buttons */}
                <div className="flex gap-3 mt-4 mb-6">
                  <Button
                    className="flex-1"
                    onClick={() => {}}
                    variant="outline"
                  >
                    <Share2 className="w-4 h-4" />
                    Share
                  </Button>
                  <Button className="flex-1" onClick={handleTryAgain}>
                    Try Again
                  </Button>
                </div>

                {/* Tabbed content */}
                <TabbedResults
                  duration={transcriptResponse.duration}
                  fillers={transcriptResponse.fillers}
                  fillerStats={transcriptResponse.fillerStats}
                  onSeekAudio={(time) => {}}
                  transcriptText={transcriptResponse.transcript}
                  words={transcriptResponse.words}
                />

                <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 z-50">
                  {transcriptResponse && audioFile && (
                    <AudioPlayer src={audioFile} />
                  )}
                </div>
              </div>
            </>
          )}
        </main>

        <Footer />
      </div>

      {showConfirmModal && (
        <ConfirmModal
          isOpen={showConfirmModal}
          onCancel={handleCancelReset}
          onConfirm={handleConfirmReset}
        />
      )}
    </div>
  );
}
