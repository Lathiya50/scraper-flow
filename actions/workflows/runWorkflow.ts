"use server";

import prisma from "@/lib/prisma";
import { FlowToExecutionPlan } from "@/lib/workflow/executionPlan";
import { ExecutionWorkflow } from "@/lib/workflow/executionWorkflow";
import { TaskRegistry } from "@/lib/workflow/task/registry";
import {
  WorkflowExecutionStatus,
  WorkflowExcetionTrigger,
  WorkflowExecutionPlan,
  ExecutionPhaseStatus,
  WorkflowStatus,
} from "@/types/workflow";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function RunWorkflow(form: {
  workflowId: string;
  flowDefinition?: string;
}) {
  const { userId } = await auth();
  if (!userId) throw new Error("unauthorized");
  const { workflowId, flowDefinition } = form;
  if (!workflowId) throw new Error("workflowId is required");

  const workflow = await prisma.workflow.findUnique({
    where: { userId, id: workflowId },
  });

  if (!workflow) throw new Error("workflow not found");

  let executionPlan: WorkflowExecutionPlan;
  let workflowDefinition = flowDefinition;

  if (workflow.status === WorkflowStatus.PUBLISHED) {
    if (!workflow.executionPlan)
      throw new Error("no execution plan found for published workflow");
    executionPlan = JSON.parse(workflow.executionPlan);
    workflowDefinition = workflow.definition;
  } else {
    //workflow is draft
    if (!flowDefinition) {
      throw new Error("flow definition is not defined");
    }
    const flow = JSON.parse(flowDefinition);
    const result = FlowToExecutionPlan(flow.nodes, flow.edges);

    if (result.error) throw new Error("flow definition is not valid");
    if (!result.executionPlan) throw new Error("no execution plan generated");

    executionPlan = result.executionPlan;
  }

  const execution = await prisma.workflowExecution.create({
    data: {
      workflowId,
      userId,
      status: WorkflowExecutionStatus.PENDING,
      startedAt: new Date(),
      trigger: WorkflowExcetionTrigger.MANUAL,
      definition: workflowDefinition,
      phases: {
        create: executionPlan.flatMap((phase) => {
          return phase.nodes.flatMap((node) => {
            return {
              userId,
              status: ExecutionPhaseStatus.CREATED,
              number: phase.phase,
              node: JSON.stringify(node),
              name: TaskRegistry[node.data.type].label,
            };
          });
        }),
      },
    },
    select: {
      id: true,
      phases: true,
    },
  });
  if (!execution) throw new Error("execution not created");
  ExecutionWorkflow(execution.id); // run this on background
  redirect(`/workflow/runs/${workflowId}/${execution.id}`);
}
