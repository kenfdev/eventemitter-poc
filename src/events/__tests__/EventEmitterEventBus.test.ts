import { DomainEvent } from '../DomainEvent';
import { EventEmitterEventBus } from '../EventEmitterEventBus';

class TestAlphaEvent extends DomainEvent {}

class TestBetaEvent extends DomainEvent {}

describe('EventEmitterEventBus', () => {
  describe('subscribe and publish', () => {
    test('should call the subscribed handler with the published event', async () => {
      // Arrange
      const eventBus = new EventEmitterEventBus();
      const expectedEvent = new TestAlphaEvent();
      const unrelatedEvent = new TestBetaEvent();
      const handler = jest.fn();
      eventBus.subscribe(TestAlphaEvent, handler);

      // Act
      await eventBus.publish(expectedEvent);
      await eventBus.publish(unrelatedEvent);

      // Assert
      expect(handler).toHaveBeenCalledTimes(1);
      expect(handler).toHaveBeenCalledWith(expectedEvent);
    });

    test('should call the subscribed handler 2 times if the event is published 2 times', async () => {
      // Arrange
      const eventBus = new EventEmitterEventBus();
      const expectedFirstEvent = new TestAlphaEvent();
      const expectedSecondEvent = new TestAlphaEvent();
      const handler = jest.fn();
      eventBus.subscribe(TestAlphaEvent, handler);

      // Act
      await eventBus.publish(expectedFirstEvent);
      await eventBus.publish(expectedSecondEvent);

      // Assert
      expect(handler).toHaveBeenCalledTimes(2);
      expect(handler).toHaveBeenCalledWith(expectedFirstEvent);
      expect(handler).toHaveBeenCalledWith(expectedSecondEvent);
    });

    test('should only call the subscribed handler', async () => {
      // Arrange
      const eventBus = new EventEmitterEventBus();
      const expectedAlphaEvent = new TestAlphaEvent();
      const expectedBetaEvent = new TestBetaEvent();

      const alphaHandler = jest.fn();
      const betaHandler = jest.fn();
      eventBus.subscribe(TestAlphaEvent, alphaHandler);
      eventBus.subscribe(TestBetaEvent, betaHandler);

      // Act
      await eventBus.publish(expectedAlphaEvent);

      // Assert
      expect(alphaHandler).toHaveBeenCalledTimes(1);
      expect(alphaHandler).toHaveBeenCalledWith(expectedAlphaEvent);
      expect(betaHandler).not.toHaveBeenCalled();
    });
  });

  describe('unsubscribe', () => {
    test('should not call the event handler if it is unsubscribed', async () => {
      // Arrange
      const eventBus = new EventEmitterEventBus();
      const expectedFirstEvent = new TestAlphaEvent();
      const handler = jest.fn();
      eventBus.subscribe(TestAlphaEvent, handler);
      eventBus.publish(expectedFirstEvent);
      expect(handler).toHaveBeenCalledTimes(1);

      // Act
      eventBus.unsubscribe(TestAlphaEvent, handler);
      const secondEvent = new TestAlphaEvent();
      await eventBus.publish(secondEvent);

      // Assert
      expect(handler).toHaveBeenCalledTimes(1);
    });
  });
});
