import React from "react";
import { cn } from "@/lib/utils";
import { TaskParam } from "@/types/TaskType";
import { Handle, Position, useEdges } from "@xyflow/react";
import NodeParamField from "./NodeParamField";
import { ColorForHandle } from "./common";
import useFlowValidation from "@/components/hooks/useFlowValidation";

interface Props {
  input: TaskParam;
  nodeId: string;
}

function NodeInput(props: Props) {
  const { input, nodeId } = props;
  const { invalidInputs } = useFlowValidation();
  const hasErrors = invalidInputs
    .find((input) => input.nodeId === nodeId)
    ?.inputs.find((i) => i === input.name);

  const edges = useEdges();
  const isConnected = edges.some(
    (edge) => edge.target === nodeId && edge.targetHandle === input.name
  );
  return (
    <div
      className={cn(
        "flex justify-start relative p-3 bg-secondary w-full",
        hasErrors && "bg-destructive/30"
      )}
    >
      <NodeParamField param={input} nodeId={nodeId} disabled={isConnected} />
      {!input.hideHandle && (
        <Handle
          id={input.name}
          isConnectable={!isConnected}
          type="target"
          position={Position.Left}
          className={cn(
            "!bg-muted-foreground !border-2 !border-background !-left-2 !w-4 !h-4",
            ColorForHandle[input.type]
          )}
        />
      )}
    </div>
  );
}

export default NodeInput;
