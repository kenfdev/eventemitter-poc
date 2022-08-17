import { EventBus } from './events/EventBus';
import { EventEmitterEventBus } from './events/EventEmitterEventBus';
import { NoopMailRepository } from './repositories/MailRepository/NoopMailRepository';
import { NoopUserRepository } from './repositories/UserRepository/NoopUserRepository';
import { CreateUser } from './usecase/CreateUser';
import { CreateUserImpl } from './usecase/CreateUser/CreateUserImpl';
import { SendWelcomeMail } from './usecase/SendWelcomeMail';
import { SendWelcomeMailImpl } from './usecase/SendWelcomeMail/SendWelcomeMailImpl';

export interface Dependencies {
  eventBus: EventBus;
  createUser: CreateUser;
  sendWelcomeMail: SendWelcomeMail;
}

export const load = (inject?: Partial<Dependencies>): Dependencies => {
  const eventBus = inject?.eventBus
    ? inject.eventBus
    : new EventEmitterEventBus();

  let createUser: CreateUser;
  if (inject?.createUser) {
    createUser = inject.createUser;
  } else {
    const mockedUserRepository = new NoopUserRepository();
    createUser = new CreateUserImpl(eventBus, mockedUserRepository);
  }

  let sendWelcomeMail: SendWelcomeMail;
  if (inject?.sendWelcomeMail) {
    sendWelcomeMail = inject.sendWelcomeMail;
  } else {
    const mockedMailRepository = new NoopMailRepository();
    sendWelcomeMail = new SendWelcomeMailImpl(mockedMailRepository);
  }

  return {
    eventBus,
    createUser,
    sendWelcomeMail,
  };
};
