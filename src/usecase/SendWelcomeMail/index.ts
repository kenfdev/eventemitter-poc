import { User } from '../../models/User';

export interface SendWelcomeMailInput {
  user: User;
}

export interface SendWelcomeMail {
  execute(input: SendWelcomeMailInput): Promise<void>;
}
