#!/usr/bin/python3

from deepagents import create_deep_agent
from langchain_openai import ChatOpenAI

llm = ChatOpenAI(
    model="qwen3.5", api_key="ollama", base_url="http://localhost:11434/v1"
)

agent = create_deep_agent(
    model=llm,
    tools=[],
    system_prompt="",
)

result = agent.invoke({"messages": [{"role": "user", "content": "你是谁?"}]})

print(result["messages"][-1].content)
