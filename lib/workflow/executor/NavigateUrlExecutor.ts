import { ExecutionEnvironment } from "@/types/executor";
import { ClickElementTask } from "../task/ClickElement";
import { NavigateUrlTask } from "../task/NavigateUrl";

export async function NavigateUrlExecutor(
  environment: ExecutionEnvironment<typeof NavigateUrlTask>
): Promise<boolean> {
  try {
    const url = environment.getInput("URL");
    if (!url) {
      environment.log.error("Input URL is required");
    }

    await environment.getPage()!.goto(url);
    environment.log.info(`Visited to ${url}`);
    return true;
  } catch (e: any) {
    environment.log.error(e.message);
    return false;
  }
}
