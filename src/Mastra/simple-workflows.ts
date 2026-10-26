import { createWorkflow, createStep } from "@mastra/core/workflows";
import { z } from "zod";

// https://mastra.org.cn/docs/workflows/overview

// 创建工作流步骤
const step1 = createStep({
    id: "step-1",
    inputSchema: z.object({
        message: z.string()
    }),
    outputSchema: z.object({
        formatted: z.string()
    }),
    execute: async ({ inputData }) => {
        const { message } = inputData;

        return {
            // 输入内容大写
            formatted: message.toUpperCase()
        };
    }
});

// 创建工作流
const simpleWorkflow = createWorkflow({
    id: "simple-workflows",
    inputSchema: z.object({
        message: z.string()
    }),
    outputSchema: z.object({ // 工作流整体出口的类型
        formatted: z.string()
    })
})
    .then(step1)
    .commit();

// 运行工作流
simpleWorkflow.createRun().then(run => {

    run.start({
        inputData: {
            message: "zxl20070701"
        }
    }).then(res => {
        if (res.status === "success") {
            console.log(res.result);
        }
    });

});