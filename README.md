# Agent-examples
若干智能体开源框架相关产品开发的代码练习，使用TypeScript、Python3等开发

<p>
    <a href="https://github.com/rapid-start/Agent-examples" target='_blank'>
        <img alt="GitHub repo stars" src="https://img.shields.io/github/stars/rapid-start/Agent-examples">
    </a>
    <a href="https://github.com/rapid-start/Agent-examples">
        <img src="https://img.shields.io/github/forks/rapid-start/Agent-examples" alt="forks">
    </a>
    <a href="https://github.com/rapid-start/Agent-examples/issues">
        <img src="https://img.shields.io/github/issues/rapid-start/Agent-examples" alt="issue">
    </a>
    <a href="https://gitee.com/rapid-start/Agent-examples" target='_blank'>
        <img alt="Gitee repo stars" src="https://gitee.com/rapid-start/Agent-examples/badge/star.svg">
    </a>
    <a href="https://gitee.com/rapid-start/Agent-examples">
        <img src="https://gitee.com/rapid-start/Agent-examples/badge/fork.svg" alt="forks">
    </a>
</p>

## 如何使用？

### Python3

> python3版本：3.14.5

首先，需要安装：

```
pip3 install -r requirements.txt
```

比如我们想运行 src/LangChain/simple-llm.py ，直接：

```
python3 src/LangChain/simple-llm.py
```

### TypeScript

> Node.js版本：20.20.2

首先，需要安装：

```
npm install
```

比如我们想运行 src/LangGraph/simple-agent.ts ，直接：

```
npm run dev :src/LangGraph/simple-agent.ts
```

## 框架介绍

### LangChain

> typescript: https://docs.langchain.com/oss/javascript/langchain/overview

> python3: https://docs.langchain.com/oss/python/langchain/overview

一个用于构建 LLM 应用的框架，可以把模型调用升级为可组合、可控制、可扩展的应用系统。

解决的不是怎么调模型，而是：

- 多步骤推理如何组织
- 外部数据如何接入
- 工具如何被模型安全调用
- 上下文如何被长期管理

### LangGraph

> typescript: https://docs.langchain.com/oss/javascript/langgraph/overview

> python3: https://docs.langchain.com/oss/python/langgraph/overview

由 LangChain 团队开发的一个低层级 Agent 编排框架，专为构建有状态（Stateful）、长时运行的 AI 工作流而设计。

与传统的线性 LLM 调用链不同，LangGraph 将工作流建模为有向图（Directed Graph）：

- 节点（Node）：执行具体操作的函数（如调用 LLM、执行工具、处理数据）
- 边（Edge）：定义节点之间的流转路径，支持条件分支
- 状态（State）：在整个工作流中共享并传递的数据

### Deep Agents

> typescript: https://docs.langchain.com/oss/javascript/deepagents/overview

> python3: https://docs.langchain.com/oss/python/deepagents/overview

专注于深度任务分解和执行的智能体框架。

### Mastra

> typescript: https://mastra.ai/docs

用于构建 AI 驱动的应用程序和智能体，采用现代 TypeScript 堆栈的框架。

### Pi Agent

> typescript: https://pi.dev/docs/latest

极简主义的开源 AI Agent 框架，仅保留 ‌read、write、edit、bash‌ 四个基础工具。它被设计为一个轻量级、可扩展的“智能体内核”，不预设功能边界，而是让用户根据需求自行定制。

Pi Agent 作为 [OpenClaw](https://openclaw.deeptoai.com/zh-CN/docs/building-agent-framework-with-pi) 的底层执行引擎

## 版权

MIT License

Copyright (c) [zxl20070701](https://zxl20070701.github.io/notebook/home.html) 走一步，再走一步