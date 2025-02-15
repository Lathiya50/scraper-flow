import { TooltipTrigger } from "@radix-ui/react-tooltip";
import React from "react";
import { Tooltip, TooltipContent, TooltipProvider } from "./ui/tooltip";

interface TooltipWrapperProps {
  children: React.ReactNode;
  content: React.ReactNode;
  side?: "top" | "bottom" | "left" | "right";
}
function TooltipWrapper(props: TooltipWrapperProps) {
  if (!props.content) return props.children;

  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>{props.children}</TooltipTrigger>
        <TooltipContent side={props.side || "top"}>
          {props.content}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

export default TooltipWrapper;
