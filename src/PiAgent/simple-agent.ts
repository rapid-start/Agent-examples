import { completeSimple } from "@earendil-works/pi-ai";

// 使用 completeSimple 创建简单的智能体调用
// 参数1：模型配置，定义如何连接到 LLM 服务
completeSimple({
    id: "qwen3.5", // 模型标识符
    name: "", // 模型名称（可为空）
    api: "openai-completions", // 使用 OpenAI 兼容的 API 格式
    provider: "", // 提供商（Ollama 为空表示使用通用 provider）
    baseUrl: "http://localhost:11434/v1", // Ollama 服务的 API 地址
    reasoning: false, // 是否启用推理模式（qwen3.5 支持思维链但此处关闭）
    input: ["text"] as const, // 输入类型为纯文本
    cost: { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 }, // 成本配置（本地部署设为0）
    contextWindow: 128000, // 上下文窗口大小（qwen3.5 支持 128k tokens）
    maxTokens: 32000 // 最大输出 tokens 数
}, {
    // 参数2：消息内容，包含角色和文本
    messages: [
        { role: "user", content: "你是谁?", timestamp: Date.now() }
    ],
}, {
    apiKey: "ollama" // API 密钥（Ollama 本地服务通常不需要）
}).then(response => {
    // 遍历响应内容块，输出文本类型的内容
    for (const block of response.content) {
        if (block.type === "text") {
            console.log(block.text);
        }
    }

    // 打印 token 使用量和停止原因
    console.log(`\nTokens: ${response.usage.totalTokens}`);
    console.log(`Stop reason: ${response.stopReason}`);
});
