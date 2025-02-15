import { Browser, Page } from "puppeteer";
import { Browser as BrowserCore, Page as PageCore } from "puppeteer-core";
import { WorkflowTask } from "./workflow";
import { LogCollector } from "./log";

export type Environment = {
  browser?: Browser | BrowserCore;
  page?: Page | PageCore;
  phases: Record<
    string,
    {
      inputs: Record<string, any>;
      outputs: Record<string, any>;
    }
  >;
};

export type ExecutionEnvironment<T extends WorkflowTask> = {
  getInput(name: T["inputs"][number]["name"]): string;
  setOutput(name: T["outputs"][number]["name"], value: any): void;

  getBrowser(): Browser | BrowserCore | undefined;
  setBrowser(browser: Browser | BrowserCore): void;

  getPage(): Page | PageCore | undefined;
  setPage(page: Page | PageCore): void;
  log: LogCollector;
};
