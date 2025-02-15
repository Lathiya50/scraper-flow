"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function GetWorkflowExecutionWithPhases(executionId: string) {
  const { userId } = await auth();
  if (!userId) throw new Error("unauthorized");
  return prisma.workflowExecution.findUnique({
    where: { userId, id: executionId },
    include: {
      phases: {
        orderBy: {
          number: "asc",
        },
      },
    },
  });
}
