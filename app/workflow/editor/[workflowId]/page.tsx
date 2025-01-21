import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import React from "react";
import Editor from "../../_components/Editor";

async function EditorPage({ params }: { params: { workflowId: string } }) {
  const { workflowId } = params;
  const { userId } = await auth();

  if (!userId) {
    return <div>Unauthorized</div>;
  }

  const workflow = await prisma.workflow.findFirst({
    where: {
      id: workflowId,
      userId,
    },
  });

  if (!workflow) {
    return <div>Workflow not found</div>;
  }

  return <Editor workflow={workflow} />;
}

export default EditorPage;
