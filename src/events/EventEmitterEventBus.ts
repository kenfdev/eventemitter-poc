import { EventEmitter } from 'events';
import { DomainEvent } from './DomainEvent';
import { EventBus } from './EventBus';

export class EventEmitterEventBus implements EventBus {
  private readonly emitter = new EventEmitter();

  unsubscribe<E extends DomainEvent>(
    EventClass: new (...args: any[]) => E,
    listener: (e: E) => void
  ): this {
    this.emitter.off(EventClass.name, listener);
    return this;
  }

  subscribe<E extends DomainEvent>(
    EventClass: new (...args: any[]) => E,
    listener: (e: E) => void
  ): this {
    this.emitter.on(EventClass.name, listener);
    return this;
  }

  publish(event: DomainEvent): Promise<void> {
    return new Promise((resolve) => {
      this.emitter.emit(event.constructor.name, event);
      resolve();
    });
  }
}
