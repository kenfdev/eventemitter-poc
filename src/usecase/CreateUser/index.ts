import { User } from "../../models/User";

export interface CreateUserInput {
  username: string;
  email: string;
}

export interface CreateUser {
  execute(input: CreateUserInput): Promise<User>;
}
