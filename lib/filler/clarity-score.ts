/**
 * Clarity Score Calculator
 *
 * Calculates a clarity score based on filler word usage and speech patterns.
 * The score ranges from 0-100 and includes a letter grade.
 *
 * Algorithm:
 * - Base score starts at 100
 * - Quadratic penalty for filler density (filler percentage), capped at 60
 * - Additional penalty for high fillers-per-minute rate (above 6 fpm), capped at 30
 * - Small bonus for sustained clean recordings (longer duration), max +5
 * - Penalties are capped to ensure scores don't go to 0 for high filler usage
 */

import type { FillerStatsType, ClarityResult } from "@/types/domain";

export function calculateClarityScore(
  stats: FillerStatsType,
  durationSeconds: number
): ClarityResult | null {
  const { fillerPercentage, fillersPerMinute, totalWords } = stats;

  // Guard: need enough words to score meaningfully
  if (totalWords < 20) return null;

  // Quadratic penalty for filler density, capped at 60
  const fillerPenalty = Math.min(Math.pow(fillerPercentage, 2) * 1.5, 60);

  // Penalty only if above average (6 fpm), capped at 30
  const fpmPenalty = Math.min(Math.max(0, fillersPerMinute - 6) * 2, 30);

  // Small bonus for longer clean recordings (max +5 at 2.5+ min)
  const durationMinutes = durationSeconds / 60;
  const durationBonus = Math.min(durationMinutes * 2, 5);

  const rawScore = 100 - fillerPenalty - fpmPenalty + durationBonus;
  const score = Math.min(Math.max(Math.round(rawScore), 0), 99);

  return {
    score,
    version: "clarity_v1",
    rawScore,
  };
}
