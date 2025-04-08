import dotenv from "dotenv";
dotenv.config();

export const COMMUNITY = process.env.COMMUNITY || "Test";
export const LOG_FILE = "log_usuarios.txt";
export const DRIVER_URL = process.env.DRIVER_URL || "http://localhost:4444/wd/hub";
