import puppeteer, { Browser, Page } from "puppeteer";
import { escribirLog } from "./logger";
import { Selector } from "../typings/Selector";

export class BrowserManager {
  private browser: Browser | null = null;
  private page: Page | null = null;

  async initBrowser(pageUrl:string,selector:Selector): Promise<{ browser: Browser; page: Page }> {
    this.browser = await puppeteer.launch({
      headless: false, // Cambiar a true si querés ocultar el navegador
      defaultViewport: null,
      args: ["--start-maximized"],
    });
    this.page = await this.browser.newPage();
    await this.page.goto(pageUrl);
    await this.page.waitForSelector(`[aria-label="${selector.id}"]`, { timeout: 2000 });
    escribirLog("✅ WhatsApp Web ready.");
    return { browser: this.browser, page: this.page };
  }
}
