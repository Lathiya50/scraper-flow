import { GetWorkflowExecutionWithPhases } from "@/actions/workflows/getWorkflowExecutionWithPhase";
import ExecutionViewer from "./ExecutionViewer";

const ExecutionViewerWrapper = async ({
  executionId,
}: {
  executionId: string;
}) => {
  const workflowExecution = await GetWorkflowExecutionWithPhases(executionId);
  if (!workflowExecution) return <div>Not found</div>;
  return <ExecutionViewer initialData={workflowExecution} />;
};

export default ExecutionViewerWrapper;
