#!/usr/bin/python3

from typing import TypedDict, List
from langchain_openai import ChatOpenAI
from langgraph.graph import StateGraph
from langchain_core.messages import BaseMessage, HumanMessage


# 定义状态
class GraphState(TypedDict):
    messages: List[BaseMessage]


# 初始化 LLM
llm = ChatOpenAI(
    model="qwen3.5", api_key="ollama", base_url="http://localhost:11434/v1"
)


# 定义节点函数
def call_model(state: GraphState) -> GraphState:
    messages = state["messages"]
    response = llm.invoke(messages)
    return {"messages": messages + [response]}


# 创建图
workflow = StateGraph(GraphState)

# 添加节点
workflow.add_node("model", call_model)

# 添加边
workflow.add_edge("__start__", "model")
workflow.add_edge("model", "__end__")

# 编译图
app = workflow.compile()

# 运行图
result = app.invoke(
    {"messages": [HumanMessage(content="你是谁?")]}
)

print(result["messages"][-1].content)
