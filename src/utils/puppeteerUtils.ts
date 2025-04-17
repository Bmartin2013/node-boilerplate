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
  await page.click(`[aria-label="${id}"]`);
}

export async function typeWithDelay(page: Page, input: string, selector: Selector): Promise<void> {
  for (const char of input) {
    const { id, time } = selector;
    await page.type(`[aria-label="${id}"]`, char);
    await wait(time);
  }
}

export async function typeMember(page: Page, member: string, search: Selector): Promise<void> {
  await clickWithWait(page, search);

  try {
    await typeWithDelay(page, member, search);
  } catch (err) {
    console.error(`⚠️ Could not add user ${member}: ${err}`);
  }
}

export async function typeWithEnter(page: Page, selector: Selector): Promise<void> {
  const { id } = selector;
    await page.type(`[aria-label="${id}"]`, " ");
}
