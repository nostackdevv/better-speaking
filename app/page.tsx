'use client';

import { Clock } from 'lucide-react';
import { useState } from 'react';

import { EmptyRecordingState } from '@/components/analysis/EmptyRecordingState';
import { ResultsView } from '@/components/analysis/ResultsView';
import { AudioInput } from '@/components/audio/AudioInput';
import { ChallengePrompts } from '@/components/challenges/ChallengePrompts';
import { HistoryPanel } from '@/components/history/HistoryPanel';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { Navbar } from '@/components/layout/Navbar';
import { ConfirmModal } from '@/components/ui/ConfirmModal';
import { ShareModal } from '@/components/ui/ShareModal';
import { WaitlistModal } from '@/components/waitlist/WaitlistModal';
import { getArchetype } from '@/constants/archetypes';
import { useSessionHistory } from '@/hooks/storage/useSessionHistory';
import { useTranscribeAndAnalyze } from '@/hooks/transcription/useTranscribeAndAnalyze';
import { AnalyticsContextProvider, useAnalyticsContext } from '@/lib/analytics';

function HomeContent() {
  const { track } = useAnalyticsContext();
  const [audioFile, setAudioFile] = useState<File | Blob>();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [activePrompt, setActivePrompt] = useState<string | null>(null);
  const [showHistory, setShowHistory] = useState(false);
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [waitlistTrigger, setWaitlistTrigger] = useState<
    'pro_badge' | 'challenge_mode' | 'feature_gate'
  >('pro_badge');

  const { sessions, addSession, clearHistory } = useSessionHistory();

  const {
    mutate: transcribeAudio,
    isPending,
    isComplete,
    isNoSpeech,
    isError,
    error,
    data: transcriptResponse,
    reset: resetTranscription,
  } = useTranscribeAndAnalyze({
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
        name: 'analysis_completed',
        properties: {
          ...inherited,
          inputSource: audioFile instanceof File ? 'upload' : 'recording',
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
    if (transcriptResponse?.clarityScore) {
      const archetype = getArchetype(transcriptResponse.clarityScore.score);
      track((inherited) => ({
        name: 'try_again_clicked',
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
      name: 'history_opened',
      properties: {
        ...inherited,
        sessionCount: sessions.length,
      },
    }));
    setShowHistory(true);
  };

  const handleWaitlistClick = (
    trigger: 'pro_badge' | 'challenge_mode' | 'feature_gate' = 'pro_badge'
  ) => {
    setWaitlistTrigger(trigger);
    track((inherited) => ({
      name: 'waitlist_modal_opened',
      properties: {
        ...inherited,
        trigger,
      },
    }));
    setShowUpgrade(true);
  };

  const handleShareClick = () => {
    const score = transcriptResponse?.clarityScore?.score ?? 0;
    const archetype = getArchetype(score);
    track((inherited) => ({
      name: 'share_modal_opened',
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
        onWaitlistClick={() => handleWaitlistClick('pro_badge')}
      />

      <div className="mx-auto max-w-xl px-4 pt-24 pb-12">
        <Header />
        <div className="mb-6 flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 shadow-sm">
            <div className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-orange-500" />
              <span className="text-xs font-semibold text-slate-700">
                5 free daily sessions
              </span>
            </div>
          </div>
        </div>

        <main>
          {isError && error && (
            <div
              className="mb-4 rounded-lg border border-red-200 bg-red-50 p-4"
              role="alert"
            >
              <p className="font-medium text-red-800">
                {error.error || 'An error occurred'}
              </p>
              {error.message && (
                <p className="mt-1 text-sm text-red-600">{error.message}</p>
              )}
            </div>
          )}

          {isNoSpeech && <EmptyRecordingState onRetry={handleConfirmReset} />}

          {transcriptResponse && (
            <ResultsView
              activePrompt={activePrompt}
              audioFile={audioFile}
              isComplete={isComplete}
              onNewPrompt={handleNewPrompt}
              onShare={handleShareClick}
              onTryAgain={handleTryAgain}
              transcriptResponse={{
                transcript: transcriptResponse.transcript,
                words: transcriptResponse.words,
                duration: transcriptResponse.duration,
                fillers: transcriptResponse.fillers,
                fillerStats: transcriptResponse.fillerStats,
                clarityScore: transcriptResponse.clarityScore,
              }}
            />
          )}

          {!transcriptResponse && !isNoSpeech && (
            <>
              <AudioInput isAnalyzing={isPending} onUpload={handleUpload} />
              <ChallengePrompts
                onSelectPrompt={handleSelectPrompt}
                onWaitlistClick={() => handleWaitlistClick('challenge_mode')}
              />
            </>
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
      {showShareModal && transcriptResponse && (
        <ShareModal
          data={{
            duration: transcriptResponse.duration,
            fillerStats: transcriptResponse.fillerStats,
            clarityScore: transcriptResponse.clarityScore,
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
        source: [...(inherited.source ?? []), 'Home'],
      })}
    >
      <HomeContent />
    </AnalyticsContextProvider>
  );
}
