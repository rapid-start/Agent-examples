import { Agent } from "@mastra/core/agent";
import { Memory } from "@mastra/memory";
import { logform } from "oipage/nodejs/logform/index.js";
import { LibSQLStore } from "@mastra/libsql";

const myAgent = new Agent({
    id: 'memory-agent',
    name: 'Memory Agent',
    // instructions: `记住，你的名字是小猫`, // 你的名字是什么？
    instructions: ``,
    model: {
        providerId: "ollama",
        modelId: "qwen3.5",
        apiKey: "ollama",
        url: "http://127.0.0.1:11434/v1",
    },
    memory: new Memory({
        options: {
            lastMessages: 20,
        },
        storage: new LibSQLStore({
            id: 'memory-agent-storage',
            url: "file:./memory-agent.db",
        })
    }),
});

const doit = () => {
    logform([{
        type: "input",
        label: "请输入："
    }]).then((result:any) => {
        myAgent.generate(result[0], {

            // 在 agent 调用期间，包含同时具有 resource 和 thread 的 memory 对象来跟踪消息历史。
            // resource：用户或实体的稳定标识符。
            // thread：隔离特定对话或会话的 ID。
            memory: {
                resource: "user-memory-agent",
                thread: "conversation-memory-agent",
            },
        }).then(function (res) {
            console.log(res.text);

            doit();
        });
    });
};

doit();

