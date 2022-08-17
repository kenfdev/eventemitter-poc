import { MailRepository } from '.';

export const MockedMailRepository = jest
  .fn<jest.Mocked<MailRepository>, []>()
  .mockImplementation(() => ({
    send: jest.fn(),
  }));
