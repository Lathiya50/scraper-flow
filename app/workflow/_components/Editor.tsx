"use client";
import { Workflow } from "@prisma/client";
import React from "react";
import { ReactFlowProvider } from "@xyflow/react";
import FlowEditor from "./FlowEditor";

interface Props {
  workflow: Workflow;
}
export default function Editor(props: Props) {
  return (
    <ReactFlowProvider>
      <div className="flex flex-col h-full w-full overflow-auto">
        <section className="flex h-full overflow-auto">
          <FlowEditor workflow={props.workflow} />
        </section>
      </div>
    </ReactFlowProvider>
  );
}
