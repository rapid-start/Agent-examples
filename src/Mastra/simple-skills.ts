import { Workspace, LocalFilesystem, LocalSandbox } from '@mastra/core/workspace';
import { Agent } from "@mastra/core/agent";

// https://mastra.ai/docs/workspace/skills

const workspace = new Workspace({
    filesystem: new LocalFilesystem({ basePath: './workspace' }),
    sandbox: new LocalSandbox({
        workingDirectory: './workspace',
    }),

    skills: [

        // 请先把 https://github.com/oi-contrib/VISLite/tree/master/skills/vislite-lib 复制到 ./workspace/skills/vislite-lib
        "./skills"
    ],
});

const myAgent = new Agent({
    id: "simple-agent",
    name: "Simple Agent",
    instructions: ``,
    model: {
        providerId: "ollama",
        modelId: "qwen3.5",
        apiKey: "ollama",
        url: "http://127.0.0.1:11434/v1",
    },
    workspace
});

myAgent.generate(`在 ./circle.js 中，生成使用VISLite绘制红色圆形的代码`).then(function (res) {
    console.log(res.text);
});
