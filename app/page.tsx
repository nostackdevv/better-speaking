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
import { useTranscribeAudioStream } from "@/hooks/transcription/useTranscribeAudioStream";
import { useSessionHistory } from "@/hooks/storage/useSessionHistory";
import { FillerStats } from "@/components/analysis/FillerStats";
import { FillerStatsSkeleton } from "@/components/analysis/FillerStatsSkeleton";
import { EmptyRecordingState } from "@/components/analysis/EmptyRecordingState";
import { Button } from "@/components/ui/Button";
import { Share2, Shuffle, MessageCircle, Clock } from "lucide-react";
import { ShareModal } from "@/components/ui/ShareModal";
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
  const [showShareModal, setShowShareModal] = useState(false);

  const { sessions, addSession, clearHistory } = useSessionHistory();

  const {
    mutate: transcribeAudio,
    isPending,
    isComplete,
    isNoSpeech,
    data: transcriptResponse,
    reset: resetTranscription,
  } = useTranscribeAudioStream({
    onComplete: (data) => {
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

  const handleUpload = async (file: File | Blob) => {
    if (!file) return;
    setAudioFile(file);
    transcribeAudio(file);
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
      />

      <div className="max-w-xl mx-auto px-4 pt-24 pb-12">
        <Header />
        {/* Daily Usage Badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-full shadow-sm">
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-orange-500" />
              <span className="text-xs font-semibold text-slate-700">
                5 free daily sessions
              </span>
            </div>
          </div>
        </div>

        <main>
          {!transcriptResponse.transcript && !isNoSpeech && (
            <>
              {/* Active Prompt Card */}
              {/* {activePrompt && (
                <PromptCard
                  prompt={activePrompt}
                  onNewPrompt={handleNewPrompt}
                />
              )} */}

              <AudioInput isAnalyzing={isPending} onUpload={handleUpload} />

              {/* Challenge Prompts Section */}
              <ChallengePrompts
                onSelectPrompt={handleSelectPrompt}
                onWaitlistClick={handleWaitlistClick}
              />
            </>
          )}

          {isNoSpeech && <EmptyRecordingState onRetry={handleConfirmReset} />}

          {transcriptResponse.transcript &&
            transcriptResponse.words &&
            transcriptResponse.duration !== undefined && (
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

                  {/* Show FillerStats only when complete */}
                  {transcriptResponse.fillerStats && (
                    <FillerStats
                      clarityScore={transcriptResponse.clarityScore ?? null}
                      fillerStats={transcriptResponse.fillerStats}
                    />
                  )}

                  {/* Show loading state while analyzing fillers */}
                  {!transcriptResponse.fillerStats && <FillerStatsSkeleton />}

                  {/* Action buttons - only show when complete */}
                  {isComplete && (
                    <div className="flex gap-3 mt-4 mb-6">
                      <Button
                        className="flex-1"
                        onClick={() => setShowShareModal(true)}
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
                  )}

                  {/* Tabbed content - show transcript immediately, fillers when available */}
                  <TabbedResults
                    audioSrc={audioFile}
                    duration={transcriptResponse.duration}
                    fillers={transcriptResponse.fillers ?? []}
                    fillerStats={
                      transcriptResponse.fillerStats ?? {
                        totalFillers: 0,
                        totalWords: 0,
                        fillerPercentage: 0,
                        fillersPerMinute: 0,
                        topFillers: [],
                      }
                    }
                    onSeekAudio={(time) => {}}
                    transcriptText={transcriptResponse.transcript}
                    words={transcriptResponse.words}
                  />
                </div>
              </>
            )}
        </main>
      </div>
      <div className="mt-20">
        <Footer />
      </div>

      {/* History Panel */}
      <HistoryPanel
        isOpen={showHistory}
        onClearHistory={clearHistory}
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
      {showShareModal &&
        transcriptResponse.duration !== undefined &&
        transcriptResponse.fillerStats && (
          <ShareModal
            data={{
              duration: transcriptResponse.duration,
              fillerStats: transcriptResponse.fillerStats,
              clarityScore: transcriptResponse.clarityScore ?? null,
            }}
            isOpen={showShareModal}
            onClose={() => setShowShareModal(false)}
          />
        )}
    </div>
  );
}
