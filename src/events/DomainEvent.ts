export abstract class DomainEvent {
  private readonly _dateTimeOccurred: Date;

  get dateTimeOccurred() {
    return this._dateTimeOccurred;
  }
  
  constructor() {
    this._dateTimeOccurred = new Date();
  }
}
