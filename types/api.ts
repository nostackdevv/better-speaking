/**
 * API Types
 *
 * Type definitions for API requests and responses.
 * These types define the contract between the frontend and backend API endpoints.
 *
 * Used by: API routes, client-side API calls
 */

import { Filler } from "@/schema/filler";
import { NormalizedWord, FillerStatsType } from "./domain";

export interface TranscribeResponse {
  transcript: string;
  words: NormalizedWord[];
  duration: number;
  fillers: Filler[];
  fillerStats: FillerStatsType;
  createdAt: string;
}

export interface ApiError {
  error: string;
}
