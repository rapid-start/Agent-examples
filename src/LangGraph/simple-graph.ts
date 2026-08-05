import { StateGraph, Annotation } from "@langchain/langgraph";
import { BaseMessage, HumanMessage } from "@langchain/core/messages";
import { ChatOpenAI } from "@langchain/openai";

// 初始化 ChatOpenAI 模型，连接到本地 Ollama 服务
const llm = new ChatOpenAI({
    model: "qwen3.5",
    apiKey: "ollama",
    configuration: {
        baseURL: "http://localhost:11434/v1",
    },
});

// 使用 Annotation 定义状态 schema，StateGraph 通过它自动管理状态
// messages 字段用于存储对话历史，是一个 BaseMessage 类型的数组
const GraphState = Annotation.Root({
    messages: Annotation<BaseMessage[]>,
});

// 节点函数：调用 LLM 生成回复
// 接收当前状态（包含所有历史消息），返回更新后的状态（追加 LLM 回复）
async function callModel(state: typeof GraphState.State): Promise<Partial<typeof GraphState.State>> {
    const messages = state.messages;
    const response = await llm.invoke(messages);
    return { messages: [...messages, response] };
}

// 创建 StateGraph 工作流
const workflow = new StateGraph(GraphState)
    .addNode("model", callModel) // 添加一个名为 "model" 的节点，节点逻辑是 callModel 函数
    .addEdge("__start__", "model") // "__start__" 是 LangGraph 内置的起始节点，将流程导向 "model" 节点
    .addEdge("model", "__end__"); // "model" 节点执行完后，将流程导向 "__end__" 结束节点

// 编译工作流为可执行的 app
const app = workflow.compile();

// 调用编译后的 app，传入初始状态（用户消息）
app.invoke({
    messages: [new HumanMessage("你是谁?")],
}).then((result: any) => {
    // 打印 LLM 回复的内容（取消息数组的最后一个元素）
    console.log(result.messages[result.messages.length - 1].content);
});
