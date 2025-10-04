import {openai} from "@ai-sdk/openai";
import {streamText} from "ai";

export async function POST(req: Request){
    const {data } = await req.json();

    const result = streamText({
        model: openai("gpt-4o"),
        prompt: `Based in this data: ${data}, provide a summary with insights and suggestions 
        for the business.`,
    });

    return result.toTextStreamResponse();
}
