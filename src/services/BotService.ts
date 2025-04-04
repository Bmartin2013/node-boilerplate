import { Builder, By, Key, until, WebDriver } from "selenium-webdriver";
import { escribirLog } from "../utils/logger";
import { COMUNIDAD, DRIVER_URL, DRIVER_CANVAS, DRIVER_COMMUNITY, DRIVER_ADD_PARTICIPANT } from "../config/dotenv";

export class BotService {
  private driver: WebDriver | null = null;

  async iniciarNavegador(): Promise<void> {
    this.driver = await new Builder().forBrowser("chrome").build();
    await this.driver.get(DRIVER_URL);
    escribirLog("🔄 Esperando escaneo de QR...");
    await this.driver.wait(until.elementLocated(By.id(DRIVER_CANVAS)), 10000);
    escribirLog("✅ WhatsApp Web listo.");
  }

  async buscarComunidad(): Promise<void> {
    if (!this.driver) throw new Error("Driver no inicializado.");
    //escribirLog(`🔎 Buscando comunidad: ${COMUNIDAD}`);
    const searchBox = await this.driver.findElement(
      By.id("search-community")
    );
    await searchBox.sendKeys(COMUNIDAD, Key.ENTER);
    await this.driver.sleep(5000);
  }

  async agregarUsuario(numero: string): Promise<boolean> {
    if (!this.driver) throw new Error("Driver no inicializado.");
    for (let intento = 1; intento <= 3; intento++) {
      try {
        escribirLog(`➕ Agregando usuario: ${numero} (Intento ${intento})`);
        const addBox = await this.driver.findElement(By.id("add-participant"));
        await addBox.sendKeys(numero, Key.ENTER);
        await this.driver.sleep(4000);
        escribirLog(`✅ Usuario ${numero} agregado.`);
        return true;
      } catch (error) {
        escribirLog(`⚠️ Error al agregar ${numero}: ${error}`);
        await this.driver.sleep(5000);
      }
    }
    await this.registrarFallido(numero);
    return false;
  }

  async ejecutarBot(): Promise<void> {
    const usuarios = await this.obtenerUsuarios();
    if (usuarios.length === 0) {
      escribirLog("⚠️ No hay usuarios aprobados.");
      return;
    }

    // await this.iniciarNavegador();
    await this.buscarComunidad();

    for (const numero of usuarios) {
      await this.agregarUsuario(numero);
    }

    //escribirLog("🎉 Proceso finalizado.");
    if (this.driver) await this.driver.quit();
  }

  private async registrarFallido(numero: string): Promise<void> {
    // ...existing code for handling failed registration...
  }

  private async obtenerUsuarios(): Promise<string[]> {
    // ...existing code for fetching users...
    return [
      "+12345678901",
      "+12345678902",
      "+12345678903",
      "+12345678904",
      "+12345678905",
      "+12345678906",
      "+12345678907",
      "+12345678908",
      "+12345678909",
      "+12345678910",
      "+12345678911",
      "+12345678912",
      "+12345678913",
      "+12345678914",
      "+12345678915",
      "+12345678916",
      "+12345678917",
      "+12345678918",
      "+12345678919",
      "+12345678920"
  ];
  }
}
