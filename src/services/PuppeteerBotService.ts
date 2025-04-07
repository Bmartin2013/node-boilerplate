import puppeteer, { Browser, Page } from "puppeteer";
import { escribirLog } from "../utils/logger";
import { COMUNIDAD, DRIVER_URL } from "../config/dotenv";
import { IBotService } from "../interfaces/IBotService";

export class PuppeteerBotService implements IBotService {
  private browser: Browser | null = null;
  private page: Page | null = null;

  private async wait(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async iniciarNavegador(): Promise<void> {
    this.browser = await puppeteer.launch({
      headless: false, // Cambiar a true si querés ocultar el navegador
      defaultViewport: null,
      args: ["--start-maximized"],
    });
    this.page = await this.browser.newPage();
    await this.page.goto(DRIVER_URL);
    await this.page.waitForSelector("#community-icon", { timeout: 2000 });
    escribirLog("✅ WhatsApp Web listo.");
  }

  async buscarComunidad(usuarios:string[]): Promise<void> {
    if (!this.page) throw new Error("Página no inicializada.");
    escribirLog(`🔎 Abriendo comunidad: ${COMUNIDAD}`);

    await this.wait(2000);
    await this.page.evaluate(() => {
      const icon = document.getElementById("community-icon");
      if (icon) (icon as HTMLElement).click();
    });

    await this.wait(1000);
    await this.page.click("#community-1");
    await this.wait(1000);
    await this.page.click("#community-options");
    await this.wait(1000);
    await this.page.click("#view-members");
    await this.wait(1000);
    await this.page.click("#member-add");
    await this.wait(1000);
    await this.page.click("#page-4");
    await this.wait(800);

    await this.page.click("#search-member");
    await this.page.$eval("#search-member", input => (input as HTMLInputElement).value = "");

    const numero = "1234567890"; // Cambia esto para obtener el número deseado

    for (const char of numero) {
      await this.page.type("#search-member", char);
      await this.wait(300);
    }

    await this.page.keyboard.press("Enter");
    await this.wait(600);
    await this.page.click("#contact-checkbox");

    await this.page.click("#submit-member");
    await this.wait(1000);

    escribirLog(`✅ Usuario ${numero} agregado.`);
  }


  async ejecutarBot(): Promise<void> {
    const usuarios = await this.obtenerUsuarios();
    if (usuarios.length === 0) {
      escribirLog("⚠️ No hay usuarios aprobados.");
      return;
    }

    await this.iniciarNavegador();
    await this.buscarComunidad(usuarios);

    await this.wait(1000);

    escribirLog("🎉 Proceso finalizado.");
  }

  private async obtenerUsuarios(): Promise<string[]> {
    return ["1234567890", "0987654321"]; // Ejemplo de prueba
  }
}
