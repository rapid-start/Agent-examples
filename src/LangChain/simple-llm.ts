import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";

// 初始化模型（连接到本地 Ollama 服务）
const llm = new ChatOpenAI({
    model: "qwen3.5",
    apiKey: "ollama",
    configuration: {
        baseURL: "http://localhost:11434/v1",
    },
});

// 发送消息
const messages = [
    new SystemMessage(""),
    new HumanMessage("你是谁？"),
];

llm.invoke(messages).then((response: any) => {
    console.log(response.content);
});