import { Agent } from "@mastra/core/agent";
import { Memory } from "@mastra/memory";
import { logform } from "oipage/nodejs/logform/index.js";
import { LibSQLStore } from "@mastra/libsql";
import { Mastra } from "@mastra/core";

const myAgent = new Agent({
    id: 'memory-listMessages',
    name: 'memory listMessages',
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
        }
    }),
});

const mastra = new Mastra({
    agents: { myAgent },
    storage: new LibSQLStore({
        id: "memory-listMessages-storage",
        url: "file:./memory-listMessages.db",
    })
});

const threadId = "conversation-memory-listMessages";
const doit = () => {
    logform([{
        type: "input",
        label: "请输入："
    }]).then(result => {

        if (result[0] === "list") {
            const storage = mastra.getStorage();
            storage?.getStore("memory").then(memoryStore => {

                memoryStore?.listMessages({
                    threadId,
                    // threadId 参数也接受单个线程 ID 字符串或线程 ID 数组，以便从多个线程查询消息
                    // threadId: ["thread-1", "thread-2", "thread-3"], 
                    page: 0,
                    perPage: 100
                }).then((result: any) => {
                    // console.log(result);
                    console.log(JSON.stringify(result, null, 2));
                });

            });

        } else {

            (mastra.getAgent("myAgent").generate as any)(result[0], {
                memory: {
                    resource: "user-memory-listMessages",
                    thread: threadId,
                },
            }).then(function (res: any) {
                console.log(res.text);

                doit();
            });
        }
    });
};

doit();

