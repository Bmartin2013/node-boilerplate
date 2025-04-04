import dotenv from "dotenv";
dotenv.config();

export const API_URL = process.env.API_URL || "http://localhost:3000";
export const COMUNIDAD = process.env.COMUNIDAD || "Nombre de la Comunidad";
export const LOG_FILE = "log_usuarios.txt";

// Selenium webdriver selectors
export const DRIVER_URL = process.env.DRIVER_URL || "http://localhost:4444/wd/hub";
export const DRIVER_CANVAS = process.env.DRIVER_CANVAS || "fake-qr";
export const DRIVER_COMMUNITY = process.env.DRIVER_COMMUNITY || "//div[@contenteditable='true']";
export const DRIVER_ADD_PARTICIPANT= process.env.DRIVER_ADD_PARTICIPANT || "//input[@placeholder='Añadir participante']";