import express from "express";
import { BOT_EXECUTE } from "../config/endpoints";
import { BotController } from "../controllers/BotController";
import { PuppeteerBotService } from "../services/PuppeteerBotService";
import ApiService from "../services/ApiServiceMock";
import { DEFAULT_CONFIG, OLD_DEFAULT_CONFIG } from "../config/selectorsConfig";

const botRoutes = express.Router();
const apiService = new ApiService();
const puppeteerBotService = new PuppeteerBotService(apiService, OLD_DEFAULT_CONFIG); // Use PuppeteerBotService if needed
const botController = new BotController(puppeteerBotService);

botRoutes.post(BOT_EXECUTE, (req, res) => botController.execute(req, res));

// use this to test the server after deployment
botRoutes.get("/", (req, res) => {
    res.send("It works!");
});

export default botRoutes;