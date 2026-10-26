import { Agent } from "@mastra/core/agent";
import { z } from "zod";

const myAgent = new Agent({
    id: "simple-agent",
    name: "Simple Agent",
    instructions: ``,
    model: {
        providerId: "ollama",
        modelId: "qwen3.5",
        apiKey: "ollama",
        url: "http://127.0.0.1:11434/v1",
    }
});

myAgent.generate("如何度过愉快的一天，给出几个方案", {
    structuredOutput: {
        schema: z.array(z.object({
            label: z.string("方案名称"),
            content: z.string("具体描述")
        }))
    }
}).then(function (res) {
    console.log(res.object);
});
