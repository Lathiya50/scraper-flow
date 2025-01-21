import { NodeProps } from "@xyflow/react";
import exp from "constants";
import NodeCard from "./NodeCard";

const NodeComponent = (props: NodeProps) => {
  return <NodeCard nodeId={props.id}>AppNode</NodeCard>;
};

export default NodeComponent;
NodeComponent.displayName = "NodeComponent";
