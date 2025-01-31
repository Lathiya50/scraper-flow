import React from "react";
import { cn } from "@/lib/utils";
import { TaskParam } from "@/types/TaskType";
import { Handle, Position } from "@xyflow/react";
import NodeParamField from "./NodeParamField";

interface Props {
  input: TaskParam;
  nodeId: string;
}

function NodeInput(props: Props) {
  const { input, nodeId } = props;
  return (
    <div className="flex justify-start relative p-3 bg-secondary w-full">
      <NodeParamField param={input} nodeId={nodeId} />
      {!input.hideHandle && (
        <Handle
          id={input.name}
          type="target"
          position={Position.Left}
          className={cn(
            "!bg-muted-foreground !border-2 !border-background !-left-2 !w-4 !h-4"
          )}
        />
      )}
    </div>
  );
}

export default NodeInput;
