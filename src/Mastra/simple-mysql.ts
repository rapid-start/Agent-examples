import { Agent } from "@mastra/core/agent";
import { Mastra } from "@mastra/core";
import { Memory } from "@mastra/memory";
import { MySQLStore } from "@mastra/mysql";

const myAgent = new Agent({
    id: "simple-mysql",
    name: "Simple MySQL",
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
            generateTitle: false
        }
    }),
});

const mastra = new Mastra({
    agents: { myAgent },
    storage: new MySQLStore({
        host: "localhost",
        port: 3306,
        user: "root",
        password: "123456",
        database: "simple_mysql_db",
    })
});

mastra.getAgent("myAgent").generate("你是谁？", {
    memory: {
        thread: "thread-1",  // 会话线程ID，用于标识同一段对话，必须提供，用于保存对话记录
        resource: "user-1"  // 资源ID，用于标识资源所有者，可选，用于区分不同资源
    }
}).then(res => {
    console.log(res.text);
}).catch(error => {
    console.error("执行出错:", error);
}).finally(() => {
    mastra.shutdown();
});