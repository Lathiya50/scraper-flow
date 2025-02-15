import { waitFor } from "@/lib/helper/waitFor";
import puppeteer, { type Browser } from "puppeteer";
import puppeteerCore, { type Browser as BrowserCore } from "puppeteer-core";
import chromium from "@sparticuz/chromium-min";
import { Environment, ExecutionEnvironment } from "@/types/executor";
import { LaunchBrowserTask } from "../task/LaunchBrowser";

export async function LaunchBrowserExecutor(
  environment: ExecutionEnvironment<typeof LaunchBrowserTask>
): Promise<boolean> {
  try {
    const websiteUrl = environment.getInput("Website Url");
    let browser: Browser | BrowserCore;
    if (
      process.env.NODE_ENV === "production" ||
      process.env.VERCEL_ENV === "production"
    ) {
      // const executablePath = await chromium.executablePath(
      //   "https://github.com/Sparticuz/chromium/releases/download/v131.0.1/chromium-v131.0.3-pack.tar"
      // );
      browser = await puppeteerCore.launch({
        executablePath: await chromium.executablePath(
          "https://github.com/Sparticuz/chromium/releases/download/v131.0.1/chromium-v131.0.3-pack.tar"
        ),
        args: chromium.args,
        headless: chromium.headless,
        defaultViewport: chromium.defaultViewport,
      });
    } else {
      const localExecutablePath =
        "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
      browser = await puppeteer.launch({
        headless: true, //testing in headful modes
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
        executablePath: localExecutablePath,
      });
    }

    environment.log.info("Browser launched successfully.");
    environment.setBrowser(browser);
    const page = await browser.newPage();
    await page.setViewport({ width: 1080, height: 1024 });
    await page.goto(websiteUrl, { waitUntil: "domcontentloaded" });
    environment.setPage(page);
    environment.log.info(`Opened the website successfully. URL:${websiteUrl}`);

    return true;
  } catch (e) {
    console.log("error while puppeteer.", e);
    return false;
  }
}
