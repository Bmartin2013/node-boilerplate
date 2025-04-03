import { Request, Response } from "express";
import { EMAIL_ERROR, EMAIL_SENT } from "../config/messages";
import { BotService } from "../services/BotService";

export class BotController {
  private botService: BotService;

  constructor(botService: BotService) {
    this.botService = botService;
  }

  public async execute(req: Request, res: Response): Promise<void> {
    
    try {
      // so far we'll do all in the same instruction but the idea is to split it into steps 
      await this.botService.execute();

      res.status(201).json({ message: `✅ bot executed successfully` });
    } catch (error) {
      res.status(500).json({ error: `❌ error while executing the bot - ${error}`  });
    }
  }
}
