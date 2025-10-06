"use server";

import { openai } from "@ai-sdk/openai";
import { createStreamableValue } from "@ai-sdk/rsc";
import { streamText } from "ai";

export async function generate(data: string) {
  const stream = createStreamableValue("");

  (async () => {
    const { textStream } = streamText({
      model: openai("gpt-4o"),
      prompt: `Based in this data: ${JSON.stringify(
        data
      )}, provide a summary with insights and suggestions 
            for the business. Do not use markdown, use plain text. It should be a kinda long ass paragraph.
            Use Spanish. Be specific, mention specific products of the business.`,
    });

    for await (const delta of textStream) {
      stream.update(delta);
    }

    stream.done();
  })();

  return { output: stream.value };
}
