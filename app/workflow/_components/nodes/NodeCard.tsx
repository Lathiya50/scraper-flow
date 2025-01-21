import React from "react";

interface Props {
  nodeId: string;
  children: React.ReactNode;
}
function NodeCard(props: Props) {
  const { nodeId, children } = props;
  return <div>{children}</div>;
}

export default NodeCard;
