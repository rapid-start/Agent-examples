#!/usr/bin/python3

from langchain_openai import ChatOpenAI
from langchain_core.messages import HumanMessage, SystemMessage

# 初始化模型
llm = ChatOpenAI(
    model="qwen3.5", api_key="ollama", base_url="http://localhost:11434/v1"
)

# 发送消息
messages = [
    SystemMessage(content=""),
    HumanMessage(content="你是谁?"),
]

response = llm.invoke(messages)
print(response.content)
