/**
 * Domain Types
 *
 * Core domain models and data structures used throughout the application.
 * These types represent the business logic entities and are shared between
 * frontend and backend.
 *
 * Used by: Services, components, API routes, utilities
 */

export interface NormalizedWord {
  index: number;
  displayText: string;
  startChar: number;
  endChar: number;
  confidence: number;
}

export interface FillerStatsType {
  totalFillers: number;
  totalWords: number;
  fillerPercentage: number;
  fillersPerMinute: number;
  topFillers: { text: string; count: number }[];
}
