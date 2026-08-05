import { createAgent } from "langchain";
import { ChatOpenAI } from "@langchain/openai";

// 初始化 ChatOpenAI 模型，连接到本地 Ollama 服务
const llm = new ChatOpenAI({
    model: "qwen3.5",
    apiKey: "ollama",
    configuration: {
        baseURL: "http://localhost:11434/v1",
    },
});

// 使用 langchain 的 createAgent 创建智能体
const agent = createAgent({
    model: llm, // 指定使用的 LLM 模型
    tools: [], // 工具列表（此处为空，表示纯对话模式）
});

// 调用智能体进行对话
agent.invoke({
    messages: [{ role: "user", content: "你是谁?" }], // 用户消息
}).then((result: any) => {
    // 打印智能体回复（取消息数组的最后一个元素）
    console.log(result.messages[result.messages.length - 1].content);
});
