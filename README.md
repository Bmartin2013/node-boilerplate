# Mailing Project

## Overview

This project is designed to handle a mailing flow in a cheap and robust way.

## Core features are:

- _Multi provider load balancer:_ You can balance the mail loading among many providers. This will allow you to connect many free samples to handle your mailing infrastructure

- _Redis MQ system:_ store unsent messages into redis to send them later if all the given providers fail.

## Setup

1. Clone the repository.
2. Install dependencies:
   ```sh
   npm install
   ```
3. add env variables in the .env file as follows

   ```env
   # Server configuration
   SERVER_PORT=

   # emailProvider 1 (mailtrap)
   EMAIL_HOST=
   EMAIL_PORT=
   EMAIL_USER=
   EMAIL_PASS=

   #emailProvider 2 (resend)
   RESEND_API_KEY=

   # redis configuration
   REDIS_HOST=
   REDIS_PORT=
   ```

4. Configure the providers in `backend/src/config/providers.ts`. The available providers are [Resend](https://resend.com) and [Mailtrap](https://mailtrap.io).

```ts
export const emailProviders = [
  new MailtrapEmailProvider(), // Mock provider this does not actually send emails
  new ResendEmailProvider(resend),
  // add here as many providers as you wish
];
```

| Provider Name | Link                            | Description                                                |
| ------------- | ------------------------------- | ---------------------------------------------------------- |
| Resend        | [Resend](https://resend.com)    | A service to send transactional emails with ease.          |
| Mailtrap      | [Mailtrap](https://mailtrap.io) | A tool for safe email testing for staging and development. |

6. Configure the email templates in `backend/src/config/email-templates/welcome.json`. This template should be in JSON format and include the following fields: `from`, `subject` and `html`.

```json
{
  "from": "Hello <onboarding@resend.dev>",
  "subject": "Welcome to your first example!",
  "html": "<h2>Thank you!</h2>"
}
```

7. configure and install redis:

- to do so, use Docker and download redis

```sh
$ docker run --name redis -p 6379:6379 -d redis
```

- to make sure that redis is working, execute the `redis-cli` command, a prompt will open, type `ping` there and you should see `PONG`

## Usage

To start the app:

```sh
npm run dev
```

To start the worker:

```sh
npm run workers
```

## How to test

### Send a single email

once you have your app and worker up and running, paste this `curl` request in a terminal

```
$ curl -X POST http://localhost:5001/user/register \
-H "Content-Type: application/json" \
-d '{"name": "John Doe", "email": "jdoe@example.com"}'
```

### Multi-Provider email loading

1. add at least two providers to your providers' list
2. paste this script in the `src` folder and adjust the number of mails you want to send

```ts
const URL = `http://localhost:5001/user/register`;
const total_len = 52;
const EMAILS = Array.from(
  { length: total_len },
  (_, i) => `hello.git+${i}@test.com`
);

const sendRequests = async () => {
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const requests = EMAILS.map(async (email, index) => {
    await delay(index * 2000); // set an interval to make it less automatic

    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          name: "Test User",
          templateName: "WELCOME",
        }),
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      console.log(`✅ Email sent to: ${email}`);
    } catch (error) {
      console.error(`❌ Error sending to ${email}:`, error.message);
    }
  });

  await Promise.all(requests);
  console.log("🚀 Stress test completed!");
};

sendRequests();
```

3. execute this script with `node <your_script_path>`
4. check your many mailboxes and logs to see how the message changes once a provider is full

### MQ & Workers

1. add a generic error in the `emailService` class (like this)

```ts
  async sendMail(emailData: EmailData): Promise<void> {
    try {
        throw new Error('an error here...')
      await this.emailProvider.sendMail(emailData);
    } catch (error) {
      await emailQueue.add(emailData, QUEUE_CONFIGURATION);
      throw new Error(EMAIL_SENT_TO_QUEUE);
    }
  }
```

this will cause that all providers fail and the queue will catch the email
2. check that the queue actually catches the email, and therefore, send the email

## Contributing

Feel free to submit issues and pull requests.

## License

This project is licensed under the MIT License.
