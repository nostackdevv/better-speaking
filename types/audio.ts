/**
 * @deprecated This file is kept for backward compatibility only.
 * Please import from the specific type files instead:
 * - @/types/api - For API request/response types
 * - @/types/domain - For core domain models
 * - @/types/ui - For frontend-specific types
 * - @/types/external/deepgram - For Deepgram API types
 */

// Re-export everything for backward compatibility
export type { DeepgramWord } from "./external/deepgram";
export type { NormalizedWord, FillerStatsType } from "./domain";
export type { TranscribeResponse, ApiError } from "./api";
export type { Chunk } from "./ui";
