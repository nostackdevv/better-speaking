"use client";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AudioInput } from "@/components/AudioInput";
import { Transcript } from "@/components/Transcript/Transcript";

import { useState } from "react";
import { TranscribeResponse } from "@/types/api";
import { useTranscribeAudio } from "@/hooks/queries/useTranscribeAudio";
import { FillerStats } from "@/components/FillerStats/FillerStats";
import { Button } from "@/components/ui/Button";
import { Share2 } from "lucide-react";
import { TabbedResults } from "@/components/TabbedResults";
import { AudioPlayer } from "@/components/ui/AudioPlayer";

export default function Home() {
  const [audioFile, setAudioFile] = useState<File | Blob>();
  const {
    mutate: transcribeAudio,
    isPending: isTranscribing,
    data: transcriptResponse,
  } = useTranscribeAudio();

  const handleUpload = async (file: File | Blob) => {
    if (!file) return;
    setAudioFile(file);
    transcribeAudio(file, {
      onSuccess: () => {},
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-xl mx-auto px-4 py-6">
        <Header />

        <main>
          {!transcriptResponse && <AudioInput onUpload={handleUpload} />}
          {transcriptResponse && (
            <>
              {/* <Transcript
                duration={transcriptResponse.duration}
                fillers={transcriptResponse.fillers}
                transcriptText={transcriptResponse.transcript}
                words={transcriptResponse.words}
              /> */}
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
                  <Button className="flex-1" onClick={() => {}}>
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
    </div>
  );
}
