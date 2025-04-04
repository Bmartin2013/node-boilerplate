import express from "express";
import { BOT_EXECUTE } from "../config/endpoints";
import { BotService } from "../services/BotService";
import { BotController } from "../controllers/BotController";

const botRoutes = express.Router();
const botService = new BotService();
const botController = new BotController(botService);

botRoutes.post(BOT_EXECUTE, (req, res) => botController.execute(req, res));

// use this to test the server after deployment
botRoutes.get("/", (req, res) => {
    res.send("It works!");
});

export default botRoutes;