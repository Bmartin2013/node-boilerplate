import { Builder, By, Key, until, WebDriver } from "selenium-webdriver";
import { escribirLog } from "../utils/logger";
import { COMUNIDAD, DRIVER_URL } from "../config/dotenv";
import { IBotService } from "../interfaces/IBotService";

export class SeleniumBotService implements IBotService {
  private driver: WebDriver | null = null;

  async iniciarNavegador(): Promise<void> {
    this.driver = await new Builder().forBrowser("chrome").build();
    await this.driver.get(DRIVER_URL);
    await this.driver.wait(until.elementLocated(By.id("community-icon")), 2000);
    escribirLog("✅ WhatsApp Web listo.");
  }

  async buscarComunidad(): Promise<void> {
    if (!this.driver) throw new Error("Driver no inicializado.");
    escribirLog(`🔎 Abriendo comunidad: ${COMUNIDAD}`);

    await this.driver.sleep(2000);
    await this.driver.executeScript(`
      const icon = document.getElementById('community-icon');
      if (icon) icon.click();
    `);

    await this.driver.sleep(1000);

    const comunidadElemento = await this.driver.findElement(
      By.id("community-1")
    );
    await comunidadElemento.click();
    await this.driver.sleep(1000);

    const opcionesBtn = await this.driver.findElement(
      By.id("community-options")
    );
    await opcionesBtn.click();
    await this.driver.sleep(1000);

    const verMiembrosBtn = await this.driver.findElement(By.id("view-members"));
    await verMiembrosBtn.click();
    await this.driver.sleep(1000);

    const añadirMiembro = await this.driver.findElement(By.id("member-add"));
    await añadirMiembro.click();
    await this.driver.sleep(1000);

    const agregarMiembros = await this.driver.findElement(By.id("page-4"));
    await agregarMiembros.click();
    await this.driver.sleep(800);

    const numero = "1234567890"; // Cambia esto para obtener el número deseado

    const input = await this.driver.findElement(By.id("search-member"));
    await input.click();
    await input.clear();

    for (const char of numero) {
      await input.sendKeys(char);
      await this.driver.sleep(300);
    }
    await input.sendKeys(Key.RETURN);
    await this.driver.sleep(600);
    const checkbox = await this.driver.findElement(By.id("contact-checkbox"));
    await checkbox.click();
    await this.driver.sleep(1000);
    const submitButton = await this.driver.findElement(By.id("submit-member"));
    await submitButton.click();
    await this.driver.sleep(1000);
    escribirLog(`✅ Usuario ${numero} agregado.`);
    await this.driver.sleep(1000);
  }

  // async agregarUsuario(numero: string): Promise<boolean> {
  //   if (!this.driver) throw new Error("Driver no inicializado.");

  //   try {
  //     escribirLog(`➕ Agregando usuario: ${numero}`);

  //     const input = await this.driver.findElement(By.id("search-member"));
  //     await input.click();
  //     await input.clear();
  //     await input.sendKeys(numero);
  //     await input.sendKeys(Key.RETURN);

  //     const checkbox = await this.driver.findElement(By.id("contact-checkbox"));
  //     await checkbox.click();
  //     escribirLog(`✅ Usuario ${numero} seleccionado.`);

  //     const submitButton = await this.driver.findElement(
  //       By.id("submit-member")
  //     );
  //     await submitButton.click();
  //     escribirLog(`✅ Usuario ${numero} agregado.`);

  //     return true;
  //   } catch (error) {
  //     escribirLog(`⚠️ Error al agregar ${numero}: ${error}`);
  //   }

  //   await this.registrarFallido(numero);
  //   return false;
  // }

  async ejecutarBot(): Promise<void> {
    const usuarios = await this.obtenerUsuarios();
    if (usuarios.length === 0) {
      escribirLog("⚠️ No hay usuarios aprobados.");
      return;
    }

    await this.iniciarNavegador();
    await this.buscarComunidad();

    // for (const numero of usuarios) {
    //   await this.agregarUsuario(numero);
    // }

    escribirLog("🎉 Proceso finalizado.");
  }

  private async obtenerUsuarios(): Promise<string[]> {
    // Aquí va tu lógica real para obtener los usuarios aprobados
    return ["1234567890"]; // Ejemplo de prueba
  }

  private async registrarFallido(numero: string): Promise<void> {
    // Tu lógica de registro de error aquí
    escribirLog(`❌ Falló al agregar ${numero} tras varios intentos.`);
  }
}
