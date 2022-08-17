import { CreateUser, CreateUserInput } from '.';
import { EventBus } from '../../events/EventBus';
import { UserCreated } from '../../events/UserCreated';
import { User } from '../../models/User';
import { UserRepository } from '../../repositories/UserRepository';

export class CreateUserImpl implements CreateUser {
  private readonly eventBus: EventBus;
  private readonly userRepository: UserRepository;

  constructor(eventBus: EventBus, userRepository: UserRepository) {
    this.eventBus = eventBus;
    this.userRepository = userRepository;
  }

  async execute(input: CreateUserInput): Promise<User> {
    // TODO: validation

    try {
      const user = await this.userRepository.create(input);
      this.eventBus.publish(new UserCreated(user));

      return user;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}
