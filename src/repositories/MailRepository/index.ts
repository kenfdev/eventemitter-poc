export interface SendMailInput {
  from: string;
  to: string;
  subject: string;
  text: string;
}

export interface MailRepository {
  send(input: SendMailInput): Promise<void>;
}
