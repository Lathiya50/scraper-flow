import { ExecutionEnvironment } from "@/types/executor";
import { DeliverViaWebhookTask } from "../task/DeliverViaWebhook";

export async function DeliverViaWebhookExecutor(
  environment: ExecutionEnvironment<typeof DeliverViaWebhookTask>
): Promise<boolean> {
  try {
    const targetUrl = environment.getInput("Target URL");
    if (!targetUrl) {
      environment.log.error("Input TargetUrl is required");
    }
    const body = environment.getInput("Body");
    if (!body) {
      environment.log.error("Input Body is required");
    }
    const resopnse = await fetch(targetUrl, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const statusCode = resopnse.status;
    if (statusCode !== 200) {
      environment.log.error(
        `Failed to deliver via webhook. Status code: ${statusCode}`
      );
      return false;
    }
    const resopnseBody = await resopnse.json();
    environment.log.info(JSON.stringify(resopnseBody, null, 4));
    return true;
  } catch (e: any) {
    environment.log.error(e.message);
    return false;
  }
}
