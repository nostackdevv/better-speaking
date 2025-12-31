import OpenAI from "openai";
import z from "zod";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

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

const IdentifyFillerSchema = z.object({
  type: z.enum(["single", "phrase"]),
  displayText: z.string(),
  index: z.union([z.number(), z.array(z.number())]),
  confidence: z.number(),
});

export const IdentifyFillerResponseSchema = z.object({
  fillers: z.array(IdentifyFillerSchema),
});

export type IdentifyFiller = z.infer<typeof IdentifyFillerSchema>;
export type FillerResponse = z.infer<typeof IdentifyFillerResponseSchema>;

interface IdentifyFillersParams {
  text: string;
  words: { index: number; text: string }[];
}

export const identifyFillers = async ({
  text,
  words,
}: IdentifyFillersParams): Promise<FillerResponse> => {
  try {
    const response = await openai.responses.create({
      model: "gpt-4.1",
      temperature: 0,
      instructions: SYSTEM_PROMPT,
      input: [
        {
          role: "user",
          content: `Analyze this transcript and return the fillers as JSON:\n\n${JSON.stringify(
            { text, words }
          )}`,
        },
      ],
      text: {
        format: {
          type: "json_object",
        },
      },
      max_output_tokens: 512,
    });
    const outputText = response.output_text ?? "{}";
    return JSON.parse(outputText);
  } catch (error) {
    console.error("Filler classification failed:", error);
    return { fillers: [] };
  }
};
