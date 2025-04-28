import puppeteer from "puppeteer-extra";
import { Browser, Page } from "puppeteer";
import { escribirLog } from "./logger";
import { Selector } from "../typings/Selector";
import { CHROME_EXECUTABLE_PATH, USER_DATA_DIR } from "../config/dotenv";


export class BrowserManager {
  private browser: Browser | null = null;
  private page: Page | null = null;

  constructor() {
    escribirLog(`🌐 Init browser with the following paths: 
      - Chrome Executable Path: ${CHROME_EXECUTABLE_PATH}
      - User Data Directory: ${USER_DATA_DIR}`);
  }

  async initBrowser(pageUrl: string, selector: Selector): Promise<{ browser: Browser; page: Page }> {
    this.browser = await puppeteer.launch({
      headless: false,
      executablePath: CHROME_EXECUTABLE_PATH,
      userDataDir: USER_DATA_DIR,
      defaultViewport: null,
      args: ["--start-maximized"],
    });

    const pages = await this.browser.pages();
    this.page = pages.length ? pages[0] : await this.browser.newPage();

    escribirLog("🌐 Abriendo WhatsApp Web con Chrome real en macOS...");
    await this.page.goto(pageUrl, { waitUntil: "networkidle2" });

    try {
      await this.page.waitForSelector(`[${selector.type}="${selector.id}"]`, {
        timeout: 120000,
      });
      escribirLog("✅ WhatsApp Web listo con sesión persistente.");
    } catch (e) {
      escribirLog("⚠️ No se encontró la pantalla principal. ¿Escaneaste el QR?");
    }

    return { browser: this.browser, page: this.page };
  }
}
