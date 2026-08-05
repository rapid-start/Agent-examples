import { Agent } from "@mastra/core/agent";
import { Mastra } from "@mastra/core";

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

const mastra = new Mastra({
    agents: { myAgent },
});

mastra.getAgent("myAgent").generate("你是谁？").then(function (res) {
    console.log(res.text);
});