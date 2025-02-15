import { ExecutionEnvironment } from "@/types/executor";
import { AddPropertyToJsonTask } from "../task/AddPropertyToJson";

export async function AddPropertyToJsonExecutor(
  environment: ExecutionEnvironment<typeof AddPropertyToJsonTask>
): Promise<boolean> {
  try {
    const jsonData = environment.getInput("JSON");
    if (!jsonData) {
      environment.log.error("Input JSON is required");
    }
    const propertyName = environment.getInput("Property name");
    if (!propertyName) {
      environment.log.error("Input Property name is required");
    }
    const propertyValue = environment.getInput("Property value");
    if (!propertyValue) {
      environment.log.error("Input Property value is required");
    }
    const json = JSON.parse(jsonData);
    json[propertyName] = propertyValue;
    environment.setOutput("Update JSON", JSON.stringify(json));

    return true;
  } catch (e: any) {
    environment.log.error(e.message);
    return false;
  }
}
