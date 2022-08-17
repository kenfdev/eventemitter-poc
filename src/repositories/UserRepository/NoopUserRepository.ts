import { CreateUserInput, UserRepository } from '.';
import { User } from '../../models/User';

export class NoopUserRepository implements UserRepository {
  async create(input: CreateUserInput): Promise<User> {
    console.log('create', JSON.stringify(input, null, 2));
    return new User(input);
  }
}
