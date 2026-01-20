import { z } from 'zod';

export const FillerSchema = z.object({
  startIndex: z
    .number()
    .int()
    .min(0)
    .describe('Starting word index (0-indexed) in the transcript'),
  displayText: z
    .string()
    .describe('The filler word or phrase as it appears in the transcript'),
  confidence: z.number().min(0).max(1).describe('Confidence score from 0 to 1'),
});

export const FillerResponseSchema = z.object({
  fillers: z.array(FillerSchema),
});

export type Filler = z.infer<typeof FillerSchema>;
export type FillerResponse = z.infer<typeof FillerResponseSchema>;
