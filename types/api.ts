/**
 * API Types
 *
 * Type definitions for API requests and responses.
 * These types define the contract between the frontend and backend API endpoints.
 *
 * Used by: API routes, client-side API calls
 */

import { Filler } from '@/schema/filler';

import { NormalizedWord, FillerStatsType, ClarityResult } from './domain';

// Combined response (transcription + analysis)
export interface TranscribeResponse {
  transcript: string;
  words: NormalizedWord[];
  duration: number;
  fillers: Filler[];
  fillerStats: FillerStatsType;
  clarityScore: ClarityResult | null;
  createdAt: string;
}

// Transcription-only response
export interface TranscriptionOnlyResult {
  transcript: string;
  words: NormalizedWord[];
  duration: number;
  createdAt: string;
}

// Analysis request body
export interface AnalyzeRequest {
  transcript: string;
  words: { index: number; text: string }[];
  duration: number;
}

// Analysis-only response
export interface AnalysisResult {
  fillers: Filler[];
  fillerStats: FillerStatsType;
  clarityScore: ClarityResult | null;
  createdAt: string;
}

export interface WaitlistResponse {
  success: boolean;
  message: string;
}

export interface ApiError {
  error: string;
  message?: string;
  retryAfter?: number;
}
