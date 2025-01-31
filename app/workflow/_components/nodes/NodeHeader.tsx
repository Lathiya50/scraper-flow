"use client";
import React from "react";
import { TaskRegistry } from "@/lib/workflow/task/registry";
import { TaskType } from "@/types/TaskType";
import { CoinsIcon, GripVerticalIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Props {
  tastType: TaskType;
}
function NodeHeader(props: Props) {
  const { tastType } = props;
  const task = TaskRegistry[tastType];
  return (
    <div className="flex items-center gap-2 p-2">
      <task.icon size={20} />
      <div className="flex justify-between items-center w-full">
        <p className="text-xs font-bold uppercase text-muted-foreground">
          {task.label}
        </p>
        <div className="flex gap-1 items-center">
          {task.isEntryPoint && <Badge>Entry point</Badge>}
          <Badge className="gap-2 flex items-center text-xs">
            <CoinsIcon size={16} />
            TODO
          </Badge>
          <Button
            variant={"ghost"}
            size={"icon"}
            className="drag-handle cursor-grab"
          >
            <GripVerticalIcon size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default NodeHeader;
