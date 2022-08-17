import { User } from '../models/User';
import { DomainEvent } from './DomainEvent';

export class UserCreated extends DomainEvent {
  private readonly _user: User;

  get user() {
    return this._user;
  }

  constructor(user: User) {
    super();
    this._user = user;
  }
}
