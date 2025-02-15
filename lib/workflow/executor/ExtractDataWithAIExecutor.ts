import { ExecutionEnvironment } from "@/types/executor";
import { ExtractDataWithAITask } from "../task/ExtractDataWithAI";
import prisma from "@/lib/prisma";
import { symmetricDecrypt } from "@/lib/encryption";
import OpenAI from "openai";

export async function ExtractDataWithAIExecutor(
  environment: ExecutionEnvironment<typeof ExtractDataWithAITask>
): Promise<boolean> {
  try {
    const credentials = environment.getInput("Credentials");
    if (!credentials) {
      environment.log.error("Input Credentials is required");
    }
    const promt = environment.getInput("Prompt");
    if (!promt) {
      environment.log.error("Input Prompt is required");
    }
    const content = environment.getInput("Content");
    if (!content) {
      environment.log.error("Input Content is required");
    }
    const credential = await prisma.credential.findUnique({
      where: {
        id: credentials,
      },
    });
    if (!credential) {
      environment.log.error("Invalid Credentials");
      return false;
    }
    const plainCredentialValue = await symmetricDecrypt(credential.value);

    if (!plainCredentialValue) {
      environment.log.error("Cannot decrypt credential value");
      return false;
    }

    const openai = new OpenAI({ apiKey: plainCredentialValue });

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            " You are a webscraper helper that extracts data from HTML or text. You will be given a piece of text or HTML content as input and also the prompt with the data you have to extract. The response should always be only the extracted data as a JSON array or object, without any additional words or explanations. Analyze the input carefully and extract data precisely based on the prompt. If no data is found, return an empty JSON array. Work only with the provided content and ensure the output is always a valid JSON array without any surrounding text",
        },
        {
          role: "user",
          content: content,
        },
        {
          role: "user",
          content: promt,
        },
      ],
      temperature: 1,
    });
    environment.log.info(`Promt token ${response.usage?.prompt_tokens}`);
    environment.log.info(
      `Comletion token ${response.usage?.completion_tokens}`
    );

    const result = response.choices[0].message.content;
    if (result) {
      environment.log.error("empty response from AI");
      return false;
    }
    environment.setOutput("Extracted data", result);
    return true;
  } catch (e: any) {
    environment.log.error(e.message);
    return false;
  }
}
