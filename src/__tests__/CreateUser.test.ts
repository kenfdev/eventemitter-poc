import { FastifyInstance } from 'fastify';
import { EventEmitterEventBus } from '../events/EventEmitterEventBus';
import { init as initServer } from '../infra/http/server';
import { User } from '../models/User';
import { MailRepository } from '../repositories/MailRepository';
import { MockedMailRepository } from '../repositories/MailRepository/MockedMailRepository';
import { UserRepository } from '../repositories/UserRepository';
import { MockedUserRepository } from '../repositories/UserRepository/MockedUserRepository';
import { CreateUser } from '../usecase/CreateUser';
import { CreateUserImpl } from '../usecase/CreateUser/CreateUserImpl';
import { SendWelcomeMail } from '../usecase/SendWelcomeMail';
import { SendWelcomeMailImpl } from '../usecase/SendWelcomeMail/SendWelcomeMailImpl';

describe('CreateUser', () => {
  let server: FastifyInstance;
  let createUser: CreateUser;
  let sendWelcomeMail: SendWelcomeMail;
  let mockedMailRepository: jest.Mocked<MailRepository>;
  let mockedUserRepository: jest.Mocked<UserRepository>;

  beforeEach(() => {
    const eventBus = new EventEmitterEventBus();

    mockedUserRepository = new MockedUserRepository();
    createUser = new CreateUserImpl(eventBus, mockedUserRepository);
    mockedMailRepository = new MockedMailRepository();
    sendWelcomeMail = new SendWelcomeMailImpl(mockedMailRepository);

    server = initServer({ eventBus, createUser, sendWelcomeMail });
  });

  describe('POST /users', () => {
    test('should create a new User and send a welcome mail', async () => {
      // Arrange
      const expectedUser = new User({
        username: 'some-user',
        email: 'user@test.test',
      });
      mockedUserRepository.create.mockResolvedValue(expectedUser);

      // Act
      const result = await server.inject({
        method: 'POST',
        url: '/users',
        payload: {
          username: expectedUser.username,
          email: expectedUser.email,
        },
      });

      // Assert
      expect(result.statusCode).toEqual(200);
      expect(mockedMailRepository.send).toHaveBeenCalled();
    });
  });
});
