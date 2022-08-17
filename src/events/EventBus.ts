import { DomainEvent } from './DomainEvent';

export interface EventBus {
  subscribe<E extends DomainEvent>(
    EventClass: new (...args: any[]) => E,
    listener: (e: E) => void
  ): this;
  unsubscribe<E extends DomainEvent>(
    EventClass: new (...args: any[]) => E,
    listener: (e: E) => void
  ): this;
  publish(event: DomainEvent): Promise<void>;
}
