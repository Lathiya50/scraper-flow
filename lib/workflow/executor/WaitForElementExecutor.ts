import { ExecutionEnvironment } from "@/types/executor";
import { WaitForElementTask } from "../task/WaitForElement";

export async function WaitForElementExecutor(
  environment: ExecutionEnvironment<typeof WaitForElementTask>
): Promise<boolean> {
  try {
    const selector = environment.getInput("Selector");
    if (!selector) {
      environment.log.error("Input Selector is required");
    }
    const visibility = environment.getInput("Visibility");
    if (!visibility) {
      environment.log.error("Input Visibility is required");
    }
    await environment.getPage()!.waitForSelector(selector, {
      visible: visibility === "visible",
      hidden: visibility === "hidden",
    });
    environment.log.info(`Element ${selector} is ${visibility}`);
    return true;
  } catch (e: any) {
    environment.log.error(e.message);
    return false;
  }
}
