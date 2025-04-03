import { Request, Response } from "express";
import { EMAIL_ERROR, EMAIL_SENT } from "../config/messages";
import { EmailService } from "../services/EmailService";

export class UserController {
  private emailService: EmailService;

  constructor(emailService: EmailService) {
    this.emailService = emailService;
  }

  public async registerUser(req: Request, res: Response): Promise<void> {
    const { name, email } = req.body;
    try {
      // do something else here like saving the user to a database
      // const newUser = new User({ name, email });
      // await newUser.save();

      // send welcome email TODO: try with another provider if there is no service
      const response = await this.emailService.sendMail();

      if(!response)  throw new Error("Email service is not available");

      res.status(201).json({ message: `${EMAIL_SENT} TO ${email} - ${name}` });
    } catch (error) {
      res.status(500).json({ error: `${EMAIL_ERROR}:${error}` });
    }
  }
}
