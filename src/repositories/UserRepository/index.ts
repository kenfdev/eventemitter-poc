import { User } from '../../models/User';

export interface CreateUserInput {
  username: string;
  email: string;
}

export interface UserRepository {
  create(input: CreateUserInput): Promise<User>;
}
