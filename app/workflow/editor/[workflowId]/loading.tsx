import { Loader2Icon } from "lucide-react";
import React from "react";

function Loading() {
  return (
    <div className="flex items-center h-screen">
      <Loader2Icon size={30} className="animate-spin stroke-primary" />
    </div>
  );
}

export default Loading;
