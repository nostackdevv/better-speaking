import { Filler } from '@/schema/filler';
import { FillerStatsType, NormalizedWord } from '@/types/domain';

interface ComputeFillerStatsParams {
  fillers: Filler[];
  words: NormalizedWord[];
  duration: number; // in seconds
}

export function computeFillerStats({
  fillers,
  words,
  duration,
}: ComputeFillerStatsParams): FillerStatsType {
  const totalFillers = fillers.length;
  const totalWords = words.length;

  // Avoid division by zero
  const durationMinutes = duration / 60;
  const fillersPerMinute =
    durationMinutes > 0 ? totalFillers / durationMinutes : 0;

  const fillerPercentage =
    totalWords > 0 ? (totalFillers / totalWords) * 100 : 0;

  // Count occurrences of each filler (case-insensitive)
  const counts = new Map<string, number>();
  for (const filler of fillers) {
    const key = filler.displayText.toLowerCase();
    counts.set(key, (counts.get(key) || 0) + 1);
  }

  // Sort by count descending, take top 5
  const topFillers = [...counts.entries()]
    .map(([text, count]) => ({ text, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  return {
    totalFillers,
    totalWords,
    fillerPercentage: roundToOneDecimal(fillerPercentage),
    fillersPerMinute: roundToOneDecimal(fillersPerMinute),
    topFillers,
  };
}

function roundToOneDecimal(value: number): number {
  return Math.round(value * 10) / 10;
}
