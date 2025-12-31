/**
 * UI Types
 *
 * Type definitions specific to the frontend user interface.
 * These types are used for rendering components and managing UI state.
 * Not used on the backend.
 *
 * Used by: React components, UI utilities
 */

import { NormalizedWord } from "./domain";

export interface Chunk {
  type: "normal" | "filler";
  fillerId?: number;
  words: NormalizedWord[];
}
