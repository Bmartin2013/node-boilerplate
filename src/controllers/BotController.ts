import { Request, Response } from "express";
import { IBotService } from "../interfaces/IBotService";

export class BotController {
  private botService: IBotService;

  constructor(botService: IBotService) {
    this.botService = botService;
  }

  public async execute(req: Request, res: Response): Promise<void> {
    
    try {
      // so far we'll do all in the same instruction but the idea is to split it into steps 
      await this.botService.ejecutarBot();
      res.status(201).json({ message: `✅ bot executed successfully` });
    } catch (error) {
      res.status(500).json({ error: `❌ error while executing the bot - ${error}`  });
    }
  }
}
