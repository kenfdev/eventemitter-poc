import { EventBus } from '../../../events/EventBus';
import { MockedEventBus } from '../../../events/MockedEventBus';
import { UserCreated } from '../../../events/UserCreated';
import { User } from '../../../models/User';
import { UserRepository } from '../../../repositories/UserRepository';
import { MockedUserRepository } from '../../../repositories/UserRepository/MockedUserRepository';
import { CreateUserImpl } from '../CreateUserImpl';

describe('CreateUserImpl', () => {
  let createUser: CreateUserImpl;
  let mockedEventBus: jest.Mocked<EventBus>;
  let mockedUserRepository: jest.Mocked<UserRepository>;

  beforeEach(() => {
    mockedEventBus = new MockedEventBus();
    mockedUserRepository = MockedUserRepository();
    createUser = new CreateUserImpl(mockedEventBus, mockedUserRepository);
  });

  describe('execute', () => {
    it('should call create and then publish UserCreated event', async () => {
      // Arrange
      const expectedUserProps = {
        username: 'some-username',
        email: 'user@test.test',
      };
      const expectedUser = new User(expectedUserProps);
      mockedUserRepository.create.mockResolvedValue(expectedUser);

      // Act
      await createUser.execute({
        username: expectedUser.username,
        email: expectedUser.email,
      });

      // Assert
      expect(mockedUserRepository.create).toHaveBeenCalledWith(
        expectedUserProps
      );

      const actualDomainEvent = mockedEventBus.publish.mock
        .lastCall[0] as UserCreated;
      expect(actualDomainEvent.user).toEqual(expectedUser);
    });
  });
});
