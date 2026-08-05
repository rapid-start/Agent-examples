#!/usr/bin/python3

from langchain_openai import ChatOpenAI
from langchain.agents import create_agent

llm = ChatOpenAI(
    model="qwen3.5", api_key="ollama", base_url="http://localhost:11434/v1"
)

agent = create_agent(
    model=llm,
    tools=[],
    system_prompt="",
)

# 运行代理
result = agent.invoke({"messages": [{"role": "user", "content": "你是谁？"}]})

print(result["messages"][-1].content_blocks)
