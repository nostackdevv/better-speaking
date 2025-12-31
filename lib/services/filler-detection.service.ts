import OpenAI from "openai";
import { config } from "@/lib/config";
import { Filler } from "@/schema/filler";
import { FillerDetectionInput } from "@/lib/interfaces/filler-detector.interface";
import { IdentifyFillerResponseSchema } from "@/lib/filler/classifier";
import { normalizeFillerResponse } from "@/lib/utils/transformers";

const openaiClient = new OpenAI({ apiKey: config.openai.apiKey });

const SYSTEM_PROMPT = `
You are a precise speech filler detection system.

Your job is to analyze the transcript text and identify filler words or filler phrases.

You MUST:
- Use the provided "transcript.text" for semantic context.
- Use ONLY the provided "transcript.words" array to reference words.
- NEVER invent words or indices that are not present in transcript.words.
- Treat indexes as absolute and do not modify them.
- Only label real conversational fillers (hesitation / padding), such as:
  - Single: "um", "uh", "er", "ah"
  - Phrases: "you know", "I guess", "sort of", "kind of", "I mean"
  - Contextual fillers when used as hesitation: "like", "actually", "basically", "just"
- If you are not clearly sure a token is a filler, DO NOT label it (prefer low false positives).
- If there are no fillers, return { "fillers": [] }.

You MUST answer in valid JSON only (no extra text, no markdown).

Output JSON shape:

{
  "fillers": [
    {
      "type": "single" | "phrase",
      "displayText": "string",
      "index": number | number[],
      "confidence": number
    }
  ]
}
`;

export async function detectFillers(
  input: FillerDetectionInput
): Promise<Filler[]> {
  try {
    const response = await openaiClient.responses.create({
      model: config.openai.model,
      temperature: config.openai.temperature,
      instructions: SYSTEM_PROMPT,
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
