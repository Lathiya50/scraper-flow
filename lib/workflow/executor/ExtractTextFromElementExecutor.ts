import { ExecutionEnvironment } from "@/types/executor";
import { ExtractTextFromElementTask } from "../task/ExtractTextFromElement";
import * as cheerio from "cheerio";

export async function ExtractTextFromElementExecutor(
  environment: ExecutionEnvironment<typeof ExtractTextFromElementTask>
): Promise<boolean> {
  try {
    const selector = environment.getInput("Selector");
    if (!selector) {
      environment.log.error("Selector not found");
      return false;
    }
    const html = environment.getInput("Html");
    if (!html) {
      environment.log.error("Html not found");
      return false;
    }
    const $ = cheerio.load(html);
    const element = $(selector);
    if (!element) {
      environment.log.error(`Element not found for selector`);
      return false;
    }
    const extractedText = $.text(element);
    if (!extractedText) {
      environment.log.error(`Extracted text not found`);
      return false;
    }
    environment.setOutput("Extracted text", extractedText);

    return true;
  } catch (e: any) {
    environment.log.error(e.message);
    return false;
  }
}
