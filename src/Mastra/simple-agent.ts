import { Agent } from "@mastra/core/agent";

// 创建 Agent 实例，配置智能体的基本信息
const myAgent = new Agent({
    id: "simple-agent", // 智能体的唯一标识符
    name: "Simple Agent", // 智能体的显示名称
    instructions: ``, // 智能体的系统指令（可为空或填入提示词）
    model: {
        providerId: "ollama", // 模型提供商 ID
        modelId: "qwen3.5", // 模型标识符
        apiKey: "ollama", // API 密钥（Ollama 本地服务不需要）
        url: "http://127.0.0.1:11434/v1", // Ollama API 地址
    }
});

// 调用智能体进行对话
myAgent.generate("你是谁？").then(function (res) {
    // 输出智能体的回复文本
    console.log(res.text);
});
