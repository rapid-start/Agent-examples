#!/usr/bin/python3

from deepagents import create_deep_agent
from langchain_openai import ChatOpenAI

llm = ChatOpenAI(
    model="qwen3.5", api_key="ollama", base_url="http://localhost:11434/v1"
)


def get_weather(city: str) -> str:
    """获取指定城市的天气。"""
    return f"{city}总是阳光明媚！"


agent = create_deep_agent(
    model=llm,
    tools=[get_weather],
    system_prompt="",
)

result = agent.invoke({"messages": [{"role": "user", "content": "南京的天气怎么样?"}]})

print(result["messages"][-1].content)
