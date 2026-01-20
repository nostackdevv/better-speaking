import OpenAI from 'openai';

import { config } from '@/lib/config';
import { IdentifyFillerResponseSchema } from '@/lib/filler/classifier';
import { FillerDetectionInput } from '@/lib/interfaces/filler-detector.interface';
import { FILLER_DETECTION_SYSTEM_PROMPT_V2 } from '@/lib/prompts/filler-detection.prompts';
import { normalizeFillerResponse } from '@/lib/utils/transformers';
import { Filler } from '@/schema/filler';

const openaiClient = new OpenAI({ apiKey: config.openai.apiKey });

export async function detectFillers(
  input: FillerDetectionInput
): Promise<Filler[]> {
  try {
    const response = await openaiClient.responses.create({
      model: config.openai.model,
      temperature: config.openai.temperature,
      instructions: FILLER_DETECTION_SYSTEM_PROMPT_V2,
      input: [
        {
          role: 'user',
          content: `Analyze this transcript and return the fillers as JSON:\n\n${JSON.stringify(
            input
          )}`,
        },
      ],
      text: {
        format: {
          type: 'json_object',
        },
      },
      max_output_tokens: config.openai.maxOutputTokens,
    });

    const outputText = response.output_text ?? '{}';
    const parsed = IdentifyFillerResponseSchema.parse(JSON.parse(outputText));
    return normalizeFillerResponse(parsed.fillers);
  } catch {
    return [];
  }
}
