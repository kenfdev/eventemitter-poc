import { EventBus } from './EventBus';

export const MockedEventBus = jest
  .fn<jest.Mocked<EventBus>, []>()
  .mockImplementation(() => ({
    publish: jest.fn(),
    subscribe: jest.fn(),
    unsubscribe: jest.fn(),
  }));
