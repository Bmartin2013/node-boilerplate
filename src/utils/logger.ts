import fs from "fs";
import { LOG_FILE } from "../config/dotenv";

export const escribirLog = (mensaje: string) => {
    const log = `[${new Date().toISOString()}] ${mensaje}`;
    fs.appendFileSync(LOG_FILE, log + "\n");
    console.log(log);
};