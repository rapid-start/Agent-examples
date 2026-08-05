import { createDeepAgent } from "deepagents";
import { ChatOpenAI } from "@langchain/openai";

// 初始化 ChatOpenAI 模型，连接到本地 Ollama 服务
const llm = new ChatOpenAI({
    model: "qwen3.5",
    apiKey: "ollama",
    configuration: {
        baseURL: "http://localhost:11434/v1",
    },
});

// DeepAgent 的系统提示词（可留空或自定义研究指令）
const researchInstructions = "";

// 使用 deepagents 库创建 DeepAgent 实例
const agent = createDeepAgent({
  model: llm, // 指定使用的 LLM 模型
  tools: [], // 工具列表（此处为空，表示纯对话模式）
  systemPrompt: researchInstructions, // 系统提示词，控制智能体行为
});

// 调用智能体进行对话
agent.invoke({
  messages: [{ role: "user", content: "你是谁?" }], // 用户消息
}).then(result => {
    // 打印智能体回复（取消息数组的最后一个元素）
    console.log(result.messages[result.messages.length - 1].content);
})
