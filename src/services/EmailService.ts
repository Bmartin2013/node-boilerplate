export class EmailService {
  async sendMail(): Promise<boolean> {
    //try {
    return Math.random() >= 0.5; // Simulate a 50% chance of success
    // } catch (error) {
    // consider this if you want to queue unsent emails
    //   await emailQueue.add(emailData, QUEUE_CONFIGURATION);
    //   throw new Error(EMAIL_SENT_TO_QUEUE);
    // }
  }
}
