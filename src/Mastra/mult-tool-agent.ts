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
        get_current_time: createTool({
            id: "get_current_time",
            description: "获取当前系统时间",
            inputSchema: z.object({}),
            execute: async () => {
                console.log("调用工具get_current_time");
                const time = new Date().toLocaleString("zh-CN");
                return { time };
            },
        }),
        get_location: createTool({
            id: "get_location",
            description: "获取当前位置信息",
            inputSchema: z.object({}),
            execute: async () => {
                console.log("调用工具get_location");
                return { location: "南京" };
            },
        }),
        show_info: createTool({
            id: "show_info",
            description: "显示用户信息，需要先获取时间和位置信息",
            inputSchema: z.object({
                time: z.string().describe("当前时间，通过调用get_current_time获取"),
                location: z.string().describe("当前位置，通过调用get_location获取")
            }),
            execute: async (result) => {
                console.log("调用工具show_info", result);
            },
        })
    },
});

myAgent.generate("显示用户信息").then(function (res) {
    console.log(res.text);
});