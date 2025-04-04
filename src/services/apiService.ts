import axios from "axios";
import { API_URL } from "../config/dotenv";
import { escribirLog } from "../utils/logger";

export class ApiService {
    async obtenerUsuarios(): Promise<string[]> {
        try {
            const response = await axios.get(`${API_URL}/usuarios_aprobados`);
            return response.data;
        } catch (error) {
            escribirLog(`❌ Error al obtener usuarios: ${error}`);
            return [];
        }
    }

    async registrarFallido(numero: string): Promise<void> {
        try {
            await axios.post(`${API_URL}/registrar_fallido`, { numero });
            escribirLog(`❌ Registrado como fallido en la API: ${numero}`);
        } catch (error) {
            escribirLog(`⚠️ No se pudo registrar fallido en la API: ${numero}`);
        }
    }
}