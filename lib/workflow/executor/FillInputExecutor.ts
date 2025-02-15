import { ExecutionEnvironment } from "@/types/executor";
import { FillInputTask } from "../task/FillInput";

export async function FillInputExecutor(
  environment: ExecutionEnvironment<typeof FillInputTask>
): Promise<boolean> {
  try {
    const selector = environment.getInput("Selector");
    if (!selector) {
      environment.log.error("Input Selector is required");
    }
    const value = environment.getInput("Value");
    if (!value) {
      environment.log.error("Input Value is required");
    }
    await environment.getPage()!.type(selector, value);
    return true;
  } catch (e: any) {
    environment.log.error(e.message);
    return false;
  }
}
