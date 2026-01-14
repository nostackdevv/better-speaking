import OpenAI from "openai";
import { config } from "@/lib/config";
import { Filler } from "@/schema/filler";
import { FillerDetectionInput } from "@/lib/interfaces/filler-detector.interface";
import { IdentifyFillerResponseSchema } from "@/lib/filler/classifier";
import { normalizeFillerResponse } from "@/lib/utils/transformers";
import { FILLER_DETECTION_SYSTEM_PROMPT_V2 } from "@/lib/prompts/filler-detection.prompts";

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
          role: "user",
          content: `Analyze this transcript and return the fillers as JSON:\n\n${JSON.stringify(
            input
          )}`,
        },
      ],
      text: {
        format: {
          type: "json_object",
        },
      },
      max_output_tokens: config.openai.maxOutputTokens,
    });

    const outputText = response.output_text ?? "{}";
    const parsed = IdentifyFillerResponseSchema.parse(JSON.parse(outputText));
    return normalizeFillerResponse(parsed.fillers);
  } catch (error) {
    console.error("Filler detection failed:", error);
    return [];
  }
}
