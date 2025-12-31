/**
 * External Service Types - Deepgram
 *
 * Type definitions for the Deepgram Speech-to-Text API.
 * These types match the structure of data returned from Deepgram's API.
 *
 * Used by: Deepgram service layer
 * Documentation: https://developers.deepgram.com/
 */

export interface DeepgramWord {
  word: string;
  start: number;
  end: number;
  confidence: number;
  punctuated_word?: string;
}
