import { Filler } from '@/schema/filler';

export interface Word {
  index: number;
  text: string;
}

export interface FillerDetectionInput {
  text: string;
  words: Word[];
}

export interface IFillerDetector {
  detect(input: FillerDetectionInput): Promise<Filler[]>;
}
