import z from 'zod';

const IdentifyFillerSchema = z.object({
  displayText: z.string(),
  startIndex: z.number(),
  confidence: z.number(),
});

export const IdentifyFillerResponseSchema = z.object({
  fillers: z.array(IdentifyFillerSchema),
});

export type IdentifyFiller = z.infer<typeof IdentifyFillerSchema>;
export type FillerResponse = z.infer<typeof IdentifyFillerResponseSchema>;
