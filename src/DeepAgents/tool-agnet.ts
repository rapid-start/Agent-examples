import { createDeepAgent } from "deepagents";
import { ChatOpenAI } from "@langchain/openai";
import { tool } from "langchain";
import * as z from "zod";

const llm = new ChatOpenAI({
    model: "qwen3.5",
    apiKey: "ollama",
    configuration: {
        baseURL: "http://localhost:11434/v1",
    },
});

// 使用 tool() 定义工具：name + description + zod schema
const getWeather = tool(
    async ({ city }) => `${city}总是阳光明媚！`,
    {
        name: "get_weather",
        description: "获取指定城市的天气。",
        schema: z.object({
            city: z.string().describe("城市名称"),
        }),
    }
);

const agent = createDeepAgent({
    model: llm,
    tools: [getWeather],
    systemPrompt: "",
});

// 运行代理
agent.invoke({
    messages: [{ role: "user", content: "南京的天气怎么样？" }],
}).then((result: any) => {
    console.log(result.messages[result.messages.length - 1].content);
});
