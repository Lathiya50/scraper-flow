"use server";

import prisma from "@/lib/prisma";
import { FlowToExecutionPlan } from "@/lib/workflow/executionPlan";
import { CalculateWorkflowCost } from "@/lib/workflow/helpers";
import { WorkflowStatus } from "@/types/workflow";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function PublishWorkflow({
  id,
  flowDefinition,
}: {
  id: string;
  flowDefinition: string;
}) {
  const { userId } = await auth();
  if (!userId)
    throw new Error(
      "Authentication required. Please sign in to publish a workflow."
    );

  const workflow = await prisma.workflow.findUnique({
    where: {
      id,
      userId,
    },
  });
  if (!workflow) {
    throw new Error(
      "Workflow not found. The specified workflow may have been deleted or you don't have access to it."
    );
  }

  if (workflow.status !== WorkflowStatus.DRAFT) {
    throw new Error(
      "Invalid workflow status. Only draft workflows can be published."
    );
  }
  const flow = JSON.parse(flowDefinition);
  const result = FlowToExecutionPlan(flow.nodes, flow.edges);
  if (result.error) {
    throw new Error(`Invalid flow configuration: ${result.error}`);
  }

  if (!result.executionPlan) {
    throw new Error(
      "Failed to generate execution plan. Please check your workflow configuration."
    );
  }
  const creditsCost = CalculateWorkflowCost(flow.nodes);
  await prisma.workflow.update({
    where: {
      id,
      userId,
    },
    data: {
      definition: flowDefinition,
      executionPlan: JSON.stringify(result.executionPlan),
      creditsCost,
      status: WorkflowStatus.PUBLISHED,
    },
  });
  revalidatePath(`/workflows/${id}`);
}
