"use server";

import prisma from "@/lib/prisma";
import { FlowToExecutionPlan } from "@/lib/workflow/executionPlan";
import { CalculateWorkflowCost } from "@/lib/workflow/helpers";
import { WorkflowStatus } from "@/types/workflow";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function UnpublishWorkflow(id: string) {
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

  if (workflow.status !== WorkflowStatus.PUBLISHED) {
    throw new Error(
      "Workflow is not published. Only published workflows can be unpublished."
    );
  }
  await prisma.workflow.update({
    where: {
      id,
      userId,
    },
    data: {
      status: WorkflowStatus.DRAFT,
      executionPlan: null,
      creditsCost: 0,
    },
  });
  revalidatePath(`/workflows/editor/${id}`);
}
