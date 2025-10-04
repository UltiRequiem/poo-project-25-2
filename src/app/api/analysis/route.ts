import {openai} from "@ai-sdk/openai";
import {generateText} from "ai";

export async function POST(req: Request){
    const {data } = await req.json();

    const result = await generateText({
        model: openai("gpt-4o"),
        prompt: `Based in this data: ${data}, provide a summary with insights and suggestions 
        for the business. Do not use markdown, use plain text. It should be a conscise paragraph.`,
    });

    return new Response (result.text);
}
