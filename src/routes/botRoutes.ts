import express from "express";
import { BOT_EXECUTE } from "../config/endpoints";
import { BotController } from "../controllers/BotController";
import { PuppeteerBotService } from "../services/PuppeteerBotService";

const botRoutes = express.Router();
const puppeteerBotService = new PuppeteerBotService(); // Use PuppeteerBotService if needed
const botController = new BotController(puppeteerBotService);

botRoutes.post(BOT_EXECUTE, (req, res) => botController.execute(req, res));

// use this to test the server after deployment
botRoutes.get("/", (req, res) => {
    res.send("It works!");
});

export default botRoutes;