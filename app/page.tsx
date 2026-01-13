"use client";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AudioInput } from "@/components/audio/AudioInput";
import { Navbar } from "@/components/layout/Navbar";
import { ChallengePrompts } from "@/components/challenges/ChallengePrompts";
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
import { ConfirmModal } from "@/components/ui/ConfirmModal";
import { Card } from "@/components/ui/Card";
import { AnalyticsContextProvider, useAnalyticsContext } from "@/lib/analytics";
import { getArchetype } from "@/constants/archetypes";

function HomeContent() {
  const { track } = useAnalyticsContext();
  const [audioFile, setAudioFile] = useState<File | Blob>();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [activePrompt, setActivePrompt] = useState<string | null>(null);
  const [showHistory, setShowHistory] = useState(false);
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [waitlistTrigger, setWaitlistTrigger] = useState<
    "pro_badge" | "challenge_mode" | "feature_gate"
  >("pro_badge");

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

      const archetype = getArchetype(data.clarityScore?.score ?? 0);
      track((inherited) => ({
        name: "analysis_completed",
        properties: {
          ...inherited,
          inputSource: audioFile instanceof File ? "upload" : "recording",
          duration: data.duration,
          clarityScore: data.clarityScore?.score ?? 0,
          archetype: archetype.label,
          totalFillers: data.fillerStats.totalFillers,
          totalWords: data.fillerStats.totalWords,
          fillerPercentage: data.fillerStats.fillerPercentage,
          fillersPerMinute: data.fillerStats.fillersPerMinute,
          topFiller: data.fillerStats.topFillers[0]?.text,
          isPerfect: data.fillerStats.totalFillers === 0,
        },
      }));
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
    if (transcriptResponse.clarityScore) {
      const archetype = getArchetype(transcriptResponse.clarityScore.score);
      track((inherited) => ({
        name: "try_again_clicked",
        properties: {
          ...inherited,
          previousScore: transcriptResponse.clarityScore?.score ?? 0,
          previousArchetype: archetype.label,
        },
      }));
    }
    setShowConfirmModal(false);
    setAudioFile(undefined);
    resetTranscription();
  };

  const handleCancelReset = () => {
    setShowConfirmModal(false);
  };

  const handleHistoryClick = () => {
    track((inherited) => ({
      name: "history_opened",
      properties: {
        ...inherited,
        sessionCount: sessions.length,
      },
    }));
    setShowHistory(true);
  };

  const handleWaitlistClick = (
    trigger: "pro_badge" | "challenge_mode" | "feature_gate" = "pro_badge"
  ) => {
    setWaitlistTrigger(trigger);
    track((inherited) => ({
      name: "waitlist_modal_opened",
      properties: {
        ...inherited,
        trigger,
      },
    }));
    setShowUpgrade(true);
  };

  const handleShareClick = () => {
    const score = transcriptResponse.clarityScore?.score ?? 0;
    const archetype = getArchetype(score);
    track((inherited) => ({
      name: "share_modal_opened",
      properties: {
        ...inherited,
        clarityScore: score,
        archetype: archetype.label,
      },
    }));
    setShowShareModal(true);
  };

  const handleSelectPrompt = (prompt: string) => {
    setActivePrompt(prompt);
  };

  const handleNewPrompt = () => {
    setActivePrompt(null);
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-slate-50 to-slate-100">
      <Navbar
        onHistoryClick={handleHistoryClick}
        onWaitlistClick={() => handleWaitlistClick("pro_badge")}
      />

      <div className="max-w-xl mx-auto px-4 pt-24 pb-12">
        <Header />
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
              <AudioInput isAnalyzing={isPending} onUpload={handleUpload} />
              <ChallengePrompts
                onSelectPrompt={handleSelectPrompt}
                onWaitlistClick={() => handleWaitlistClick("challenge_mode")}
              />
            </>
          )}

          {isNoSpeech && <EmptyRecordingState onRetry={handleConfirmReset} />}

          {transcriptResponse.transcript &&
            transcriptResponse.words &&
            transcriptResponse.duration !== undefined && (
              <AnalyticsContextProvider
                getProperties={(inherited) => ({
                  ...inherited,
                  source: [...(inherited.source ?? []), "Results"],
                })}
              >
                <div className="pb-32">
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

                  {transcriptResponse.fillerStats && (
                    <FillerStats
                      clarityScore={transcriptResponse.clarityScore ?? null}
                      fillerStats={transcriptResponse.fillerStats}
                    />
                  )}

                  {!transcriptResponse.fillerStats && <FillerStatsSkeleton />}

                  {isComplete && (
                    <div className="flex gap-3 mt-4 mb-6">
                      <Button
                        className="flex-1"
                        onClick={handleShareClick}
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
                    onSeekAudio={() => {}}
                    transcriptText={transcriptResponse.transcript}
                    words={transcriptResponse.words}
                  />
                </div>
              </AnalyticsContextProvider>
            )}
        </main>
      </div>
      <div className="mt-20">
        <Footer />
      </div>

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
          trigger={waitlistTrigger}
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

export default function Home() {
  return (
    <AnalyticsContextProvider
      getProperties={(inherited) => ({
        ...inherited,
        source: [...(inherited.source ?? []), "Home"],
      })}
    >
      <HomeContent />
    </AnalyticsContextProvider>
  );
}
