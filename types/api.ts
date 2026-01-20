/**
 * API Types
 *
 * Type definitions for API requests and responses.
 * These types define the contract between the frontend and backend API endpoints.
 *
 * Used by: API routes, client-side API calls
 */

import { Filler } from "@/schema/filler";

import { NormalizedWord, FillerStatsType, ClarityResult } from "./domain";

export interface TranscribeResponse {
  transcript: string;
  words: NormalizedWord[];
  duration: number;
  fillers: Filler[];
  fillerStats: FillerStatsType;
  clarityScore: ClarityResult | null;
  createdAt: string;
}

export type TranscriptionStreamData =
  | {
      step: "transcript";
      transcript: string;
      words: NormalizedWord[];
      duration: number;
    }
  | {
      step: "fillers";
      fillers: Filler[];
    }
  | {
      step: "complete";
      fillerStats: FillerStatsType;
      clarityScore: ClarityResult | null;
      createdAt: string;
    }
  | {
      step: "error";
      error: string;
    };

export interface WaitlistResponse {
  success: boolean;
  message: string;
}

export interface ApiError {
  error: string;
  message?: string;
  retryAfter?: number;
}
