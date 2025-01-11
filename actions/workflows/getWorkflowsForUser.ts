"use server";

import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export async function GetWorkflowsForUser() {
  const { userId, redirectToSignIn } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }
  //   if (!userId) return redirectToSignIn()
  return prisma.workflow.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "asc",
    },
  });
}
