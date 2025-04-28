import { ElementHandle, Page } from "puppeteer";
import { Selector } from "../typings/Selector";
import { escribirLog } from "./logger";

export async function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function clickWithWait(
  page: Page,
  selector: Selector
): Promise<void> {
  const { id, time, type } = selector;
  await wait(time);
  await page.click(`[${type}="${id}"]`);
}

export async function typeWithDelay(
  page: Page,
  input: string,
  selector: Selector
): Promise<void> {
  for (const char of input) {
    const { id, time, type } = selector;
    await page.type(`[${type}="${id}"]`, char);
    await wait(time);
  }
}

export async function typeMember(
  page: Page,
  member: string,
  search: Selector
): Promise<void> {
  await clickWithWait(page, search);

  try {
    await typeWithDelay(page, member, search);
  } catch (err) {
    console.error(`⚠️ Could not add user ${member}: ${err}`);
  }
}

export async function typeWithEnter(
  page: Page,
  selector: Selector
): Promise<void> {
  const { id } = selector;
  await page.keyboard.press("Enter");
}

export async function selectAndClick(
  page: Page,
  checkboxSelector: Selector,
): Promise<void> {
  const { id, type } = checkboxSelector;

  escribirLog(`Seleccionando el elemento con id: ${id}`);
  await wait(1000);

  // Desactivar transiciones en la página para evitar problemas con animaciones
  await page.evaluate(() => {
    document.body.style.transition = 'none'; // Desactiva las transiciones
  });

  // Esperar a que el checkbox sea visible
  await page.waitForSelector(`[${type}="${id}"]`, { timeout: 5000 });

  escribirLog(`elemento con id ${id} seleccionado y visible`);
  await wait(500);

}

export async function clickIfExists(
  page: any,
  selector: Selector
): Promise<void> {
  await page.evaluate(
    ({ id, type }: { id: string; type: string }) => {
      const element = document.querySelector(`[${type}="${id}"]`);
      if (element) {
        (element as HTMLElement).click();
      }
    },
    { id: selector.id, type: selector.type }
  );
}
