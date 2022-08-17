import { SendWelcomeMail, SendWelcomeMailInput } from '.';
import { MailRepository } from '../../repositories/MailRepository';

export class SendWelcomeMailImpl implements SendWelcomeMail {
  private readonly mailRepository: MailRepository;

  constructor(mailRepository: MailRepository) {
    this.mailRepository = mailRepository;
  }

  async execute({ user }: SendWelcomeMailInput): Promise<void> {
    await this.mailRepository.send({
      from: 'noreply@test.test',
      to: user.email,
      subject: 'Welcome!',
      text: 'Welcome aboard!',
    });
  }
}
