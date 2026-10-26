import { Agent } from "@mastra/core/agent";
import { Memory } from "@mastra/memory";
import { logform } from "oipage/nodejs/logform/index.js";
import { LibSQLStore } from "@mastra/libsql";
import { Mastra } from "@mastra/core";

const myAgent = new Agent({
    id: 'memory-agent',
    name: 'Memory Agent',
    // instructions: `记住，你的名字是小花`, // 你的名字是什么？
    instructions: ``,
    model: {
        providerId: "ollama",
        modelId: "qwen3.5",
        apiKey: "ollama",
        url: "http://127.0.0.1:11434/v1",
    },
    memory: new Memory({
        options: { // https://mastra.org.cn/reference/memory/memory-class#options-parameters
            lastMessages: 20,
        }
    }),
});

const mastra = new Mastra({
    agents: { myAgent },
    storage: new LibSQLStore({
        id: 'memory-mastra-storage',
        url: "file:./memory-mastra.db",
    })
});

const doit = () => {
    logform([{
        type: "input",
        label: "请输入："
    }]).then((result: any) => {
        mastra.getAgent("myAgent").generate(result[0], {
            memory: {
                resource: "user-memory-mastra",
                thread: "conversation-memory-mastra",
            },
        }).then(function (res) {
            console.log(res.text);

            doit();
        });
    });
};

doit();

