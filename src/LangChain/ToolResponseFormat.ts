import { ChatOpenAI } from "@langchain/openai";
import { createAgent } from "langchain";
import * as z from "zod";

const llm = new ChatOpenAI({
    model: "qwen3.5",
    apiKey: "ollama",
    configuration: {
        baseURL: "http://localhost:11434/v1",
    },
});

const agent = createAgent({
    model: llm,
    tools: [],
    responseFormat: z.object({
        answer: z.string().describe("最终回答"),
        confidence: z.number().describe("置信度，0~1 之间"),
    }),
});

agent.invoke({
    messages: [{ role: "user", content: "南京属于哪个省？" }],
}).then((result: any) => {

    // 结构化输出会出现在 structuredResponse 字段里
    console.log(result.structuredResponse);

});

