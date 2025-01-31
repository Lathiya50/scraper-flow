import React from "react";
interface Props {
  children: React.ReactNode;
}

function NodeInputs(props: Props) {
  const { children } = props;
  return <div className="flex flex-col divide-y gap-2">{children}</div>;
}

export default NodeInputs;
