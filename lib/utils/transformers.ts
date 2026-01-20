import { IdentifyFiller } from '@/lib/filler/classifier';
import { Filler } from '@/schema/filler';
import { NormalizedWord } from '@/types/domain';
import { DeepgramWord } from '@/types/external/deepgram';

export function normalizeDeepgramTranscript({
  transcript,
  words: dgWords,
}: {
  transcript: string;
  words: DeepgramWord[];
}): NormalizedWord[] {
  let searchStartIndex = 0;

  return dgWords.map((dgWord, index) => {
    const punctuatedWord = dgWord.punctuated_word ?? dgWord.word;

    // Find this word in the transcript, starting from where we left off
    const startChar = transcript.indexOf(punctuatedWord, searchStartIndex);
    const endChar = startChar + punctuatedWord.length;

    // Move search position forward for the next word
    searchStartIndex = endChar;

    return {
      index,
      displayText: punctuatedWord,
      startChar,
      endChar,
      confidence: dgWord.confidence,
    };
  });
}

export function normalizeFillerResponse(fillers: IdentifyFiller[]): Filler[] {
  return fillers.map(({ displayText, startIndex, confidence }) => ({
    displayText,
    startIndex,
    confidence,
  }));
}
