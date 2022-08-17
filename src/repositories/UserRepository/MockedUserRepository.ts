import { UserRepository } from '.';
import { User } from '../../models/User';

export const MockedUserRepository = jest
  .fn<jest.Mocked<UserRepository>, []>()
  .mockImplementation(() => ({
    create: jest.fn(async (input) => {
      return new User(input);
    }),
  }));
