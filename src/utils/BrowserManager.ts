import puppeteer, { Browser, Page } from "puppeteer";
import { DRIVER_URL } from "../config/dotenv";
import { escribirLog } from "./logger";

export class BrowserManager {
  private browser: Browser | null = null;
  private page: Page | null = null;

  async initBrowser(): Promise<{ browser: Browser; page: Page }> {
    this.browser = await puppeteer.launch({
      headless: false, // Cambiar a true si querés ocultar el navegador
      defaultViewport: null,
      args: ["--start-maximized"],
    });
    this.page = await this.browser.newPage();
    await this.page.goto(DRIVER_URL);
    await this.page.waitForSelector("#community-icon", { timeout: 2000 });
    escribirLog("✅ WhatsApp Web ready.");
    return { browser: this.browser, page: this.page };
  }
}
