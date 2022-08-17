export abstract class DomainEvent {
  dateTimeOccurred: Date;
  constructor() {
    this.dateTimeOccurred = new Date();
  }
}
