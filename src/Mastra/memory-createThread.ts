import { Agent } from "@mastra/core/agent";
import { Mastra } from "@mastra/core";
import { Memory } from "@mastra/memory";
import { LibSQLStore } from "@mastra/libsql";

const myAgent = new Agent({
    id: "createThread-agent",
    name: "createThread Agent",
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
            id: 'createThread-agent-storage',
            url: "file:./createThread-agent.db",
        })
    }),
});

const mastra = new Mastra({
    agents: { myAgent }
});

const agent = mastra.getAgent('myAgent');
agent.getMemory().then(memory => {

    memory?.createThread({

        // 用同一个threadId拉取完整历史上下文，对话无缝接续
        // threadId: "", // 自定义ID，不传自动生成，可选

        resourceId: 'createThread-001',
        title: 'createThread Test Thread',
        metadata: { // 会话附加标签，可选
            source: 'test-createThread',
            purpose: 'createThread-testing',
        },
    }).then(thread => {

        agent.generate("你是谁？", {
            memory: {
                thread: thread!.id,
                resource: thread!.resourceId,
            },
        }).then(function (res) {
            console.log(res.text);

            // {
            //     id: 'f49dfd96-7da3-432a-bfc0-9f5f7e86d670',
            //     title: 'createThread Test Thread',
            //     resourceId: 'createThread-001',
            //     createdAt: 2026-06-12T09:35:04.253Z,
            //     updatedAt: 2026-06-12T09:35:04.253Z,
            //     metadata: { source: 'test-createThread', purpose: 'createThread-testing' }
            // }
            console.log(thread);

        });

    });

});