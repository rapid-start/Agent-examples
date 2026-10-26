import { createWorkflow, createStep } from "@mastra/core/workflows";
import { z } from "zod";
import { Mastra } from "@mastra/core";
import { LibSQLStore } from "@mastra/libsql";

// 创建工作流步骤
const step1 = createStep({
    id: "step-1",
    inputSchema: z.object({
        applyId: z.string()
    }),
    suspendSchema: z.object({
        applyId: z.string(),
        applyReason: z.string()
    }),
    resumeSchema: z.object({
        approved: z.boolean(),
        comment: z.string().optional(),
        auditorId: z.string()
    }),
    outputSchema: z.object({
        pass: z.string(),
        remark: z.string().optional()
    }),

    execute: async ({ inputData, suspend, resumeData }) => {

        // 已恢复，拿到外部回填的审批结果
        if (resumeData) {
            return {
                pass: resumeData.approved ? "true" : "false",
                remark: resumeData.comment
            };
        }

        // 首次执行，触发挂起
        return suspend({
            applyId: inputData.applyId,
            applyReason: "大额申请待审核"
        });

    }
});

// 创建工作流
const runWorkflowd = createWorkflow({
    id: "run-workflowd",
    inputSchema: z.object({
        applyId: z.string()
    }),
    outputSchema: z.object({
        pass: z.string(),
        remark: z.string()
    })
})
    .then(step1)
    .commit();

// 配置 Mastra 实例和存储
const mastra = new Mastra({
    workflows: { runWorkflowd },
    storage: new LibSQLStore({
        id: "run-workflow-storage",
        url: "file:./run-workflow.db",
    })
});


// 运行工作流
const workflow = mastra.getWorkflow("runWorkflowd");
workflow.createRun({
    // runId: "0000001" // 写死或者自己生成runId
}).then(run => {

    // console.log(run);

    run.start({
        inputData: {
            applyId: "APL001"
        }
    }).then(res => {
        if (res.status === "success") {
            console.log(res.result);
        } else if (res.status === "suspended") {
            // console.log("工作流已挂起", res);

            // 恢复旧的run实例
            mastra.getWorkflow("runWorkflowd").createRun({
                // runId: "0000001"
                runId: run.runId
            }).then(run2 => {

                run2.resume({
                    resumeData: {
                        approved: true,
                        auditorId: "admin_01",
                        comment: "审核通过"
                    }
                }).then(() => {
                    console.log("审批完成");
                });

            });

        }
    });

});
