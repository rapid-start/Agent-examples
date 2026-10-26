import { Agent } from "@mastra/core/agent";
import { createTool } from "@mastra/core/tools";
import { z } from "zod";

const myAgent = new Agent({
    id: "tool-agent",
    name: "Tool Agent",
    instructions: ``,
    model: {
        providerId: "ollama",
        modelId: "qwen3.5",
        apiKey: "ollama",
        url: "http://127.0.0.1:11434/v1",
    },
    tools: {
        readFile: createTool({
            id: "read-file",
            description: "读取文件内容",
            inputSchema: z.object({
                filepath: z.string().describe("文件路径"),
            }),
            outputSchema: z.string(),
            execute: async (params) => {
                return require("oipage/nodejs/disk/index").readPlain(params.filepath);
            },
        })
    },
});

myAgent.generate("告诉我 ./AUTHORS.txt 的内容").then(function (res) {
    console.log(res.text);
});