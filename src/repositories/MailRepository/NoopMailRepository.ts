import { MailRepository, SendMailInput } from '.';

export class NoopMailRepository implements MailRepository {
  async send(input: SendMailInput): Promise<void> {
    console.log('send', JSON.stringify(input, null, 2));
  }
}
