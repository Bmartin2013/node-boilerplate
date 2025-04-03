export class BotService {
  async execute(): Promise<boolean> {
    try {
      return true;
    } catch (error) {
      return false;
      // consider this if you want to queue unsent emails
      //   await emailQueue.add(emailData, QUEUE_CONFIGURATION);
      //   throw new Error(EMAIL_SENT_TO_QUEUE);
    }
  }
}
