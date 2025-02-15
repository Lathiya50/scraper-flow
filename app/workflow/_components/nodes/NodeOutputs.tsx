"use client";
import { cn } from "@/lib/utils";
import { TaskParam } from "@/types/TaskType";
import { Handle, Position } from "@xyflow/react";
import React from "react";
import { ColorForHandle } from "./common";

interface Props {
  children: React.ReactNode;
}
function NodeOutputs({ children }: Props) {
  return <div className="flex flex-col divide-y gap-1">{children}</div>;
}

export default NodeOutputs;

export function NodeOutput({ output }: { output: TaskParam }) {
  return (
    <div className="flex justify-end relative p-3 bg-secondary">
      <p className="text-xs text-muted-foreground"> {output.name}</p>
      <Handle
        id={output.name}
        type="source"
        position={Position.Right}
        className={cn(
          "!bg-muted-foreground !border-2 !border-background !-right-2 !w-4 !h-4",
          ColorForHandle[output.type]
        )}
      />
    </div>
  );
}
