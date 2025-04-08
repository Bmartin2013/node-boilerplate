import { Page } from "puppeteer";
import { Selector } from "../typings/Selector";

export async function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function clickWithWait(
  page: Page,
  selector: Selector
): Promise<void> {
  const { id, time } = selector;
  await wait(time);
  await page.click(id);
}

export async function typeWithDelay(page: Page, input: string, selector: Selector): Promise<void> {
  for (const char of input) {
    const { id, time } = selector;
    await page.type(id, char);
    await wait(time);
  }
}
