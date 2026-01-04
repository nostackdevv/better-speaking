"use client";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AudioInput } from "@/components/audio/AudioInput";
import { Navbar } from "@/components/layout/Navbar";
import { ChallengePrompts } from "@/components/challenges/ChallengePrompts";
import { PromptCard } from "@/components/challenges/PromptCard";
import { HistoryPanel } from "@/components/history/HistoryPanel";
import { WaitlistModal } from "@/components/waitlist/WaitlistModal";

import { useState } from "react";
import { useTranscribeAudio } from "@/hooks/transcription/useTranscribeAudio";
import { useSessionHistory } from "@/hooks/storage/useSessionHistory";
import { FillerStats } from "@/components/analysis/FillerStats";
import { Button } from "@/components/ui/Button";
import { Share2, Shuffle, MessageCircle } from "lucide-react";
import { TabbedResults } from "@/components/analysis/TabbedResults";
import { AudioPlayer } from "@/components/audio/AudioPlayer";
import { ConfirmModal } from "@/components/ui/ConfirmModal";
import { Card } from "@/components/ui/Card";

export default function Home() {
  const [audioFile, setAudioFile] = useState<File | Blob>();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [activePrompt, setActivePrompt] = useState<string | null>(null);
  const [showHistory, setShowHistory] = useState(false);
  const [showUpgrade, setShowUpgrade] = useState(false);

  const {
    mutate: transcribeAudio,
    isPending: isTranscribing,
    data: transcriptResponse,
    reset: resetTranscription,
  } = useTranscribeAudio();

  const { sessions, addSession, getPreviousSession } = useSessionHistory();
  const previousSession = getPreviousSession();

  const mockUser = {
    name: "Sam",
    streak: 7,
    plan: "free" as const,
  };

  const handleUpload = async (file: File | Blob) => {
    if (!file) return;
    setAudioFile(file);
    transcribeAudio(file, {
      onSuccess: (data) => {
        // Save session to localStorage
        addSession({
          id: Date.now().toString(),
          date: new Date().toISOString(),
          duration: data.duration,
          fillerCount: data.fillerStats.totalFillers,
          fillersPerMin: data.fillerStats.fillersPerMinute,
          clarityScore: data.clarityScore?.score,
          topFiller: data.fillerStats.topFillers[0],
          wordCount: data.fillerStats.totalWords,
        });
      },
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
    setShowHistory(true);
  };

  const handleWaitlistClick = () => {
    setShowUpgrade(true);
  };

  const handleSelectPrompt = (prompt: string) => {
    setActivePrompt(prompt);
  };

  const handleNewPrompt = () => {
    // Generate a new random prompt from any category
    const categories = [
      "interview",
      "presentation",
      "social",
      "impromptu",
    ] as const;
    const randomCategory =
      categories[Math.floor(Math.random() * categories.length)];
    // This will be handled by the ChallengePrompts component
    setActivePrompt(null);
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 to-slate-100">
      <Navbar
        onHistoryClick={handleHistoryClick}
        onWaitlistClick={handleWaitlistClick}
        user={mockUser}
      />

      <div className="max-w-xl mx-auto px-4 pt-24 pb-12">
        <Header />

        <main>
          {!transcriptResponse && (
            <>
              {/* Active Prompt Card */}
              {/* {activePrompt && (
                <PromptCard
                  prompt={activePrompt}
                  onNewPrompt={handleNewPrompt}
                />
              )} */}

              <AudioInput
                isAnalyzing={isTranscribing}
                onUpload={handleUpload}
              />

              {/* Challenge Prompts Section */}
              <ChallengePrompts
                onSelectPrompt={handleSelectPrompt}
                onWaitlistClick={handleWaitlistClick}
              />
            </>
          )}

          {transcriptResponse && (
            <>
              <div className="pb-32">
                {/* Prompt Reminder Card */}
                {activePrompt && (
                  <Card className="mb-4 p-4 bg-teal-50 border-teal-200">
                    <div className="flex items-center gap-3">
                      <MessageCircle className="w-5 h-5 text-teal-600" />
                      <p className="text-sm text-teal-700">
                        <span className="font-medium">Prompt:</span>{" "}
                        {activePrompt}
                      </p>
                    </div>
                  </Card>
                )}

                <FillerStats
                  clarityScore={transcriptResponse.clarityScore}
                  duration={transcriptResponse.duration}
                  fillerStats={transcriptResponse.fillerStats}
                  previousSession={previousSession}
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
                  {activePrompt && (
                    <Button
                      className="flex-1"
                      onClick={handleNewPrompt}
                      variant="accent"
                    >
                      <Shuffle className="w-4 h-4" />
                      New Prompt
                    </Button>
                  )}
                  <Button className="flex-1" onClick={handleTryAgain}>
                    Try Again
                  </Button>
                </div>

                {/* Tabbed content */}
                <TabbedResults
                  audioSrc={audioFile}
                  duration={transcriptResponse.duration}
                  fillers={transcriptResponse.fillers}
                  fillerStats={transcriptResponse.fillerStats}
                  onSeekAudio={(time) => {}}
                  transcriptText={transcriptResponse.transcript}
                  words={transcriptResponse.words}
                />
              </div>
            </>
          )}
        </main>

        <Footer />
      </div>

      {/* History Panel */}
      <HistoryPanel
        isOpen={showHistory}
        onClose={() => setShowHistory(false)}
        sessions={sessions}
      />

      {showUpgrade && (
        <WaitlistModal
          isOpen={showUpgrade}
          onClose={() => setShowUpgrade(false)}
        />
      )}
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
